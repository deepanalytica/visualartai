import test from "node:test";
import assert from "node:assert/strict";
import { TIERS, generateProposal } from "../src/proposal.mjs";
const lead = { business: "Ejemplo", city: "Curicó", goal: "Aumentar consultas por teléfono" };
test("precios base coinciden con el sitio actual", () => {
  assert.equal(TIERS.puesta_a_punto.startingCLP, 89000);
  assert.equal(TIERS.sprint.startingCLP, 249000);
  assert.equal(TIERS.sistema.startingCLP, 690000);
});
test("no inventa hechos ni garantiza resultados", () => {
  const text = generateProposal(lead, "sprint");
  assert.match(text, /REVISIÓN Y APROBACIÓN OBLIGATORIA/);
  assert.match(text, /No se ha constatado/);
  assert.match(text, /No se garantizan ventas/);
  assert.match(text, /\$249\.000/);
});
test("rechaza plan sin precio definido", () => assert.throws(() => generateProposal(lead, "premium_inventado")));
