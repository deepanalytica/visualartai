#!/usr/bin/env node
// CLI local para gestionar el pipeline. Nunca poner ADMIN_API_TOKEN en frontend o repositorio.
const args = process.argv.slice(2);
const action = args[0];
const api = String(process.env.LEAD_OPS_URL || "").replace(/\/$/, "");
const token = process.env.ADMIN_API_TOKEN;
const actions = "Uso: node lead-ops/bin/ops-cli.mjs [list|metrics|proposal <id> <puesta_a_punto|sprint|sistema>|stage <id> <stage>|delete <id>]";
if (!api.startsWith("https://") || !token || token.length < 32) {
  console.error("Faltan LEAD_OPS_URL (HTTPS) y ADMIN_API_TOKEN (secreto de 32+ caracteres) en el entorno.");
  process.exitCode = 2;
} else {
  const encoded = id => {
    if (!/^[0-9a-f-]{36}$/i.test(id || "")) throw new Error("ID de solicitud inválido");
    return id;
  };
  const request = async (path, method = "GET", body) => {
    const response = await fetch(api + path, {
      method,
      headers: { Authorization: "Bearer " + token, "content-type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(12000),
    });
    const payload = await response.json();
    if (!response.ok) throw new Error(payload.error || "HTTP " + response.status);
    return payload;
  };
  try {
    let output;
    switch(action) {
      case "list": output = await request("/v1/internal/leads"); break;
      case "metrics": output = await request("/v1/internal/metrics"); break;
      case "proposal": output = await request("/v1/internal/leads/" + encoded(args[1]) + "/proposal?tier=" + encodeURIComponent(args[2] || "sprint")); break;
      case "stage":
        if (!args[2]) throw new Error(actions);
        output = await request("/v1/internal/leads/" + encoded(args[1]), "PATCH", { stage: args[2] });
        break;
      case "delete":
        if (args[2] !== "--confirm") throw new Error("El borrado es irreversible: repetir con --confirm");
        output = await request("/v1/internal/leads/" + encoded(args[1]), "DELETE");
        break;
      default: throw new Error(actions);
    }
    if (action === "proposal") console.log(output.proposal);
    else console.log(JSON.stringify(output, null, 2));
  } catch(error) {
    console.error("Lead Ops:", error.message);
    process.exitCode = 1;
  }
}
