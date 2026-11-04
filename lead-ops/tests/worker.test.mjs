import test from "node:test";
import assert from "node:assert/strict";
import worker from "../src/worker.mjs";
const env = { ALLOWED_ORIGINS: "https://visualartai.cl", ENABLE_PUBLIC_INGEST: "false" };
test("health no expone secretos", async () => {
  const res = await worker.fetch(new Request("https://test.example/health"), env);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true, service: "visualartai-lead-ops" });
});
test("rechaza origen no permitido", async () => {
  const res = await worker.fetch(new Request("https://test.example/v1/leads", { method: "POST", headers: { Origin: "https://evil.invalid", "content-type": "application/json" }, body: "{}" }), env);
  assert.equal(res.status, 403);
});
test("sin infraestructura no captura PII", async () => {
  const res = await worker.fetch(new Request("https://test.example/v1/leads", { method: "POST", headers: { Origin: "https://visualartai.cl", "content-type": "application/json" }, body: "{}" }), env);
  assert.equal(res.status, 503);
});
test("CORS restrictivo", async () => {
  const ok = await worker.fetch(new Request("https://test.example/v1/leads", { method: "OPTIONS", headers: { Origin: "https://visualartai.cl" } }), env);
  const no = await worker.fetch(new Request("https://test.example/v1/leads", { method: "OPTIONS", headers: { Origin: "https://evil.invalid" } }), env);
  assert.equal(ok.status, 204);
  assert.equal(no.status, 403);
});
test("administración exige token", async () => {
  const res = await worker.fetch(new Request("https://test.example/v1/internal/leads"), env);
  assert.equal(res.status, 401);
});
