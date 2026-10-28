// Reglas deterministas: no inventar auditorías ni resultados comerciales.
export const STAGES = Object.freeze(["new", "qualified", "diagnosis_ready", "proposal_ready", "proposal_sent", "won", "lost", "delivering", "completed"]);
const transitions = {
  new: ["qualified", "lost"],
  qualified: ["diagnosis_ready", "lost"],
  diagnosis_ready: ["proposal_ready", "lost"],
  proposal_ready: ["proposal_sent", "lost"],
  proposal_sent: ["won", "lost"],
  won: ["delivering"],
  lost: ["qualified"],
  delivering: ["completed"],
  completed: [],
};
export function mayTransition(from, to) {
  return Boolean(transitions[from]?.includes(to));
}
export function trimText(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
export function validateLead(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { ok: false, error: "Datos inválidos" };
  const lead = {
    business: trimText(input.business, 120),
    city: trimText(input.city, 90),
    email: trimText(input.email, 254).toLowerCase(),
    website: trimText(input.website, 240),
    goal: trimText(input.goal, 240),
    consent: input.consent === true,
    honeypot: trimText(input.company_url, 120),
    turnstile: trimText(input.turnstile, 2048),
  };
  if (lead.honeypot) return { ok: false, silent: true, error: "Solicitud recibida" };
  if (lead.business.length < 2 || lead.city.length < 2 || lead.goal.length < 8) return { ok: false, error: "Completa el negocio, ciudad y objetivo" };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) return { ok: false, error: "Correo no válido" };
  if (lead.website && !/^https?:\/\/[^\s]+$/i.test(lead.website)) return { ok: false, error: "Usa una dirección web http(s)" };
  if (!lead.consent) return { ok: false, error: "Necesitamos tu autorización para responder a la solicitud" };
  return { ok: true, lead };
}
export function priorityScore(lead) {
  // Solo señales declaradas; no presupone facturación, resultados o posicionamiento.
  let score = 25;
  if (lead.website) score += 10;
  const city = lead.city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  if (["curico", "talca", "san javier", "linares", "maule", "villa alegre"].some(x => city.includes(x))) score += 15;
  const goal = lead.goal.toLowerCase();
  if (/consulta|client|contact|reserva|venta|agenda|cotiz|google|maps|whatsapp|visible/.test(goal)) score += 15;
  if (lead.goal.length >= 70) score += 5;
  return Math.min(score, 70); // No inferir prioridad máxima sin revisión humana.
}
export function diagnosisDraft(lead) {
  return [
    "DIAGNÓSTICO PRELIMINAR — NO VERIFICADO",
    "Negocio: " + lead.business,
    "Ciudad: " + lead.city,
    "Sitio declarado: " + (lead.website || "No indicado"),
    "Objetivo declarado: " + lead.goal,
    "",
    "Verificar manualmente: ficha de Google, información pública, llamada a la acción, versión móvil y vías reales de contacto.",
    "Investigar anuncios públicos relevantes con Ad Lab, sin inferir rendimiento ni conversiones de la antigüedad.",
    "Definir una intervención pequeña, medible y con alcance escrito; no prometer ventas ni posiciones.",
    "Ofertas vigentes: consultar precios publicados en visualartai.cl antes de proponer.",
    "No enviar este borrador directamente al prospecto sin verificar la evidencia."
  ].join("\n");
}
