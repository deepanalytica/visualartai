import test from "node:test";
import assert from "node:assert/strict";
import { validateLead, priorityScore, diagnosisDraft, mayTransition } from "../src/domain.mjs";
const valid = { business: "Clínica Ejemplo", city: "Talca", email: "ventas@ejemplo.cl", website: "https://ejemplo.cl", goal: "Recibir más consultas desde Google", consent: true };
test("validación: solicitud legítima", () => {
  const result = validateLead(valid);
  assert.equal(result.ok, true);
  assert.equal(result.lead.email, "ventas@ejemplo.cl");
});
test("validación: rechazo sin consentimiento", () => assert.equal(validateLead({ ...valid, consent: false }).ok, false));
test("validación: honeypot", () => assert.equal(validateLead({ ...valid, company_url: "spam" }).silent, true));
test("validación: evita contenido no http(s)", () => assert.equal(validateLead({ ...valid, website: "javascript:alert(1)" }).ok, false));
test("priorización determinista nunca declara alta confianza", () => assert.ok(priorityScore(valid) <= 70));
test("diagnóstico no presenta hipótesis como hallazgo", () => {
  const report = diagnosisDraft(valid);
  assert.match(report, /NO VERIFICADO/);
  assert.match(report, /No enviar/);
});
test("máquina de estados requiere verificación humana antes del cierre", () => {
  assert.equal(mayTransition("new", "won"), false);
  assert.equal(mayTransition("proposal_sent", "won"), true);
  assert.equal(mayTransition("won", "completed"), false);
});
