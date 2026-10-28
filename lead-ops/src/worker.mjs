import { validateLead, priorityScore, diagnosisDraft, mayTransition } from "./domain.mjs";

const encoder = new TextEncoder();
const asJson = (data, status = 200, extra = {}) => new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extra } });
const nowISO = () => new Date().toISOString();
const origins = env => String(env.ALLOWED_ORIGINS || "").split(",").map(x => x.trim()).filter(Boolean);
function corsFor(request, env) {
  const origin = request.headers.get("Origin");
  return origin && origins(env).includes(origin)
    ? { "Access-Control-Allow-Origin": origin, "Access-Control-Allow-Methods": "POST,OPTIONS", "Access-Control-Allow-Headers": "Content-Type", "Vary": "Origin" }
    : {};
}
async function sha(value) {
  const digest = await crypto.subtle.digest("SHA-256", encoder.encode(value));
  return [...new Uint8Array(digest)].map(x => x.toString(16).padStart(2, "0")).join("");
}
async function secureSame(a, b) {
  const first = await sha(a), second = await sha(b);
  let diff = 0;
  for (let i = 0; i < first.length; i++) diff |= first.charCodeAt(i) ^ second.charCodeAt(i);
  return diff === 0;
}
async function isAdmin(request, env) {
  const key = String(env.ADMIN_API_TOKEN || "");
  const value = request.headers.get("Authorization") || "";
  return key.length >= 32 && value.startsWith("Bearer ") && await secureSame(value.slice(7), key);
}
async function verifyTurnstile(token, remoteIP, env) {
  if (!env.TURNSTILE_SECRET || !token) return false;
  const data = new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token });
  if (remoteIP) data.append("remoteip", remoteIP);
  const result = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST", body: data,
    headers: { "content-type": "application/x-www-form-urlencoded" },
    signal: AbortSignal.timeout(7000),
  });
  if (!result.ok) return false;
  const outcome = await result.json();
  const hosts = String(env.TURNSTILE_HOSTNAMES || "").split(",").map(x => x.trim()).filter(Boolean);
  return outcome.success === true && hosts.length > 0 && hosts.includes(outcome.hostname);
}
async function leadIntake(request, env) {
  const headers = corsFor(request, env);
  const origin = request.headers.get("Origin");
  if (!origin || !origins(env).includes(origin)) return asJson({ error: "Origen no autorizado" }, 403);
  if (String(env.ENABLE_PUBLIC_INGEST) !== "true" || !env.DB || !env.TURNSTILE_SECRET || !env.IP_HASH_SALT) {
    return asJson({ error: "Formulario temporalmente no disponible" }, 503, headers);
  }
  const length = Number(request.headers.get("Content-Length") || 0);
  if (length > 5000) return asJson({ error: "Solicitud demasiado grande" }, 413, headers);
  if (!String(request.headers.get("Content-Type") || "").startsWith("application/json")) return asJson({ error: "Formato inválido" }, 415, headers);
  let data;
  try {
    const body = await request.text();
    if (body.length > 5000) return asJson({ error: "Solicitud demasiado grande" }, 413, headers);
    data = JSON.parse(body);
  } catch {
    return asJson({ error: "Datos inválidos" }, 400, headers);
  }
  const parsed = validateLead(data);
  if (parsed.silent) return asJson({ ok: true }, 202, headers);
  if (!parsed.ok) return asJson({ error: parsed.error }, 400, headers);
  const ip = request.headers.get("CF-Connecting-IP") || "";
  const date = nowISO();
  const ipHash = await sha(String(env.IP_HASH_SALT) + ":" + ip + ":" + date.slice(0, 10));
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const count = await env.DB.prepare("SELECT COUNT(*) AS n FROM leads WHERE ip_hash=? AND created_at>=?").bind(ipHash, since).first();
  if (Number(count?.n || 0) >= 5) return asJson({ error: "Demasiadas solicitudes desde esta conexión" }, 429, headers);
  let verified = false;
  try { verified = await verifyTurnstile(parsed.lead.turnstile, ip, env); } catch { verified = false; }
  if (!verified) return asJson({ error: "No pudimos validar la solicitud. Actualiza la página e inténtalo nuevamente" }, 400, headers);
  const lead = parsed.lead;
  const fingerprint = await sha(String(env.IP_HASH_SALT) + ":" + lead.email + ":" + lead.business.toLowerCase() + ":" + date.slice(0, 10));
  const existing = await env.DB.prepare("SELECT id FROM leads WHERE fingerprint=?").bind(fingerprint).first();
  if (existing) return asJson({ ok: true, message: "Solicitud recibida" }, 202, headers);
  const id = crypto.randomUUID();
  const score = priorityScore(lead);
  try {
    await env.DB.batch([
      env.DB.prepare("INSERT INTO leads(id,created_at,updated_at,business,city,email,website,goal,consent_at,ip_hash,fingerprint,score,stage,notification_status) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)")
        .bind(id, date, date, lead.business, lead.city, lead.email, lead.website, lead.goal, date, ipHash, fingerprint, score, "new", "pending"),
      env.DB.prepare("INSERT INTO lead_events(id,lead_id,at,event,detail) VALUES(?,?,?,?,?)")
        .bind(crypto.randomUUID(), id, date, "lead_received", "Registro y consentimiento recibidos")
    ]);
  } catch (error) {
    // Posible duplicado por envío simultáneo; no revelar existencia de contactos.
    const duplicate = await env.DB.prepare("SELECT id FROM leads WHERE fingerprint=?").bind(fingerprint).first();
    if (duplicate) return asJson({ ok: true, message: "Solicitud recibida" }, 202, headers);
    console.error("Lead intake storage failure");
    return asJson({ error: "No pudimos registrar tu solicitud. Utiliza WhatsApp" }, 503, headers);
  }
  return asJson({ ok: true, message: "Solicitud recibida correctamente" }, 201, headers);
}
async function sendInternalEmail(env, subject, text) {
  if (!env.RESEND_API_KEY || !env.OPS_EMAIL || !env.FROM_EMAIL) return false;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: "Bearer " + env.RESEND_API_KEY, "content-type": "application/json" },
    body: JSON.stringify({ from: env.FROM_EMAIL, to: [env.OPS_EMAIL], subject, text }),
    signal: AbortSignal.timeout(10000),
  });
  return response.ok;
}
async function deliverNotifications(env) {
  const items = await env.DB.prepare("SELECT id,business,city,email,website,goal,score FROM leads WHERE notification_status='pending' AND notification_attempts<6 ORDER BY created_at ASC LIMIT 15").all();
  for (const lead of (items.results || [])) {
    const claimed = await env.DB.prepare("UPDATE leads SET notification_status='sending',notification_attempts=notification_attempts+1 WHERE id=? AND notification_status='pending'").bind(lead.id).run();
    if (Number(claimed.meta?.changes || 0) !== 1) continue;
    let sent = false;
    try {
      const content = diagnosisDraft(lead) + "\n\nPrioridad estimada: " + lead.score + "/100\nContacto declarado: " + lead.email + "\nID: " + lead.id;
      sent = await sendInternalEmail(env, "Nueva solicitud Visual Art AI · " + lead.business.slice(0, 80).replace(/[\r\n]/g, " "), content);
    } catch { sent = false; }
    await env.DB.prepare("UPDATE leads SET notification_status=?,updated_at=? WHERE id=?").bind(sent ? "sent" : "pending", nowISO(), lead.id).run();
    if (sent) {
      await env.DB.prepare("INSERT INTO lead_events(id,lead_id,at,event,detail) VALUES(?,?,?,?,?)").bind(crypto.randomUUID(), lead.id, nowISO(), "internal_notified", "Notificación interna enviada").run();
    }
  }
}
async function deliverReminders(env) {
  const threshold = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();
  const items = await env.DB.prepare("SELECT id,business,stage,reminders_sent FROM leads WHERE stage IN ('new','qualified','diagnosis_ready','proposal_ready','proposal_sent') AND updated_at<? AND reminders_sent<2 AND (last_reminded_at IS NULL OR last_reminded_at<?) LIMIT 10").bind(threshold, threshold).all();
  for (const lead of (items.results || [])) {
    let sent = false;
    try { sent = await sendInternalEmail(env, "Seguimiento pendiente · " + lead.business.slice(0, 80).replace(/[\r\n]/g, " "), "Revisar oportunidad\nID: " + lead.id + "\nEtapa: " + lead.stage + "\nSin actividad reciente. No enviar mensajes automáticos al prospecto."); }
    catch { sent = false; }
    if (sent) {
      await env.DB.prepare("UPDATE leads SET reminders_sent=reminders_sent+1,last_reminded_at=? WHERE id=?").bind(nowISO(), lead.id).run();
    }
  }
}
async function internalRequest(request, env, pathname) {
  if (!await isAdmin(request, env)) return asJson({ error: "No autorizado" }, 401);
  if (!env.DB) return asJson({ error: "Almacenamiento no configurado" }, 503);
  if (request.method === "GET" && pathname === "/v1/internal/leads") {
    const url = new URL(request.url);
    const limit = Math.max(1, Math.min(50, Number(url.searchParams.get("limit")) || 20));
    const items = await env.DB.prepare("SELECT id,created_at,updated_at,business,city,email,website,goal,score,stage,notification_status,reminders_sent FROM leads ORDER BY created_at DESC LIMIT ?").bind(limit).all();
    return asJson({ leads: items.results || [] });
  }
  const match = pathname.match(/^\/v1\/internal\/leads\/([0-9a-f-]{36})$/i);
  if (!match) return asJson({ error: "Ruta no encontrada" }, 404);
  const id = match[1];
  if (request.method === "DELETE") {
    await env.DB.batch([
      env.DB.prepare("DELETE FROM lead_events WHERE lead_id=?").bind(id),
      env.DB.prepare("DELETE FROM leads WHERE id=?").bind(id),
    ]);
    return asJson({ ok: true });
  }
  if (request.method !== "PATCH") return asJson({ error: "Método no permitido" }, 405);
  let payload;
  try { payload = await request.json(); } catch { return asJson({ error: "Datos inválidos" }, 400); }
  const stage = payload?.stage;
  const lead = await env.DB.prepare("SELECT id,stage FROM leads WHERE id=?").bind(id).first();
  if (!lead) return asJson({ error: "No encontrado" }, 404);
  if (!mayTransition(lead.stage, stage)) return asJson({ error: "Transición no permitida" }, 409);
  const time = nowISO();
  const updated = await env.DB.prepare("UPDATE leads SET stage=?,updated_at=? WHERE id=? AND stage=?").bind(stage, time, id, lead.stage).run();
  if (!updated.meta?.changes) return asJson({ error: "Conflicto de estado" }, 409);
  await env.DB.prepare("INSERT INTO lead_events(id,lead_id,at,event,detail) VALUES(?,?,?,?,?)").bind(crypto.randomUUID(), id, time, "stage_changed", lead.stage + " → " + stage).run();
  return asJson({ ok: true, from: lead.stage, to: stage });
}
export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    if (request.method === "GET" && path === "/health") return asJson({ ok: true, service: "visualartai-lead-ops" });
    if (request.method === "OPTIONS" && path === "/v1/leads") {
      const h = corsFor(request, env);
      return Object.keys(h).length ? new Response(null, { status: 204, headers: h }) : asJson({ error: "Origen no autorizado" }, 403);
    }
    if (request.method === "POST" && path === "/v1/leads") return leadIntake(request, env);
    if (path.startsWith("/v1/internal/")) return internalRequest(request, env, path);
    return asJson({ error: "Ruta no encontrada" }, 404);
  },
  async scheduled(event, env, ctx) {
    if (!env.DB) return;
    ctx.waitUntil((async () => {
      await deliverNotifications(env);
      await deliverReminders(env);
      // 90 días de retención por defecto, configurable mediante proceso formal.
      const cutoff = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString();
      await env.DB.batch([
        env.DB.prepare("DELETE FROM lead_events WHERE lead_id IN (SELECT id FROM leads WHERE created_at<?)").bind(cutoff),
        env.DB.prepare("DELETE FROM leads WHERE created_at<?").bind(cutoff)
      ]);
    })());
  }
};
