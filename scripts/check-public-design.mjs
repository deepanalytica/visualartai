#!/usr/bin/env node
/**
 * Static contract checks for Visual Art AI public website.
 * No third-party dependencies. This intentionally does not replace a browser QA pass.
 */
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const html = read("site/index.html");
const style = read("site/styles/experience-v1.css");
const tokens = read("site/styles/tokens.css");
const runtime = read("site/site.js");
const hero = read("site/home-v11.js");

for (const file of [
  "site/home-core.css",
  "site/styles/experience-v1.css",
  "site/site.js",
  "site/home-v11.js",
  "site/aviso-de-privacidad.html",
]) assert.ok(existsSync(join(root,file)), `Falta recurso: ${file}`);

assert.ok(html.includes('href="styles/experience-v1.css?v=1"'), "Falta stylesheet incremental");
assert.equal((html.match(/class="vaa-wordmark"/g)||[]).length,2,"Marca tipográfica en desktop y móvil");
assert.ok(html.includes("<strong>Visual</strong><small>ART AI</small>"), "Visual debe ser protagonista");
assert.ok(html.includes('id="diagnosticForm"'),"Formulario no encontrado");
assert.ok(html.includes('id="sendByEmail"'),"Falta alternativa de email");
assert.ok(html.includes('type="submit">Preparar solicitud por WhatsApp'),"CTA principal debe ser explícito");
assert.ok(html.includes('aviso-de-privacidad.html'),"Falta enlace a privacidad");
assert.ok(runtime.includes('form?.reportValidity()'),"Falta validación de datos");
assert.ok(runtime.includes("https://wa.me/56958039450?text="),"Falta salida real a WhatsApp");
assert.ok(runtime.includes("mailto:contacto@deepanalytica.cl"),"Falta salida por correo");
assert.ok(runtime.includes("Debes pulsar Enviar"),"No afirmar entrega automática del mensaje");
assert.ok(hero.includes("navigator.connection?.saveData"),"Respetar ahorro de datos");
assert.ok(hero.includes('matchMedia("(max-width: 767px)")'),"No ejecutar canvas pesado en móvil");
assert.ok(hero.includes("inViewport"),"Pausar campo visual fuera del hero");
assert.ok(hero.includes("syncPlay();"),"Controles de animación preparados");
assert.ok(!hero.includes("if(!reduce)start();else syncPlay();"),"No activar autoplay al iniciar");
assert.ok(style.includes("prefers-reduced-motion"),"Respetar movimiento reducido");
assert.ok(style.includes("--font-sans"),"Utilizar tipografía del sistema");
assert.ok(tokens.includes("--color-action-primary"),"Falta token semántico");

const cssHex = style.match(/#[0-9a-f]{3,8}\b/gi)||[];
assert.deepEqual(cssHex,[],"La capa incremental no debe tener colores hardcodeados");

for (const id of ["inicio","problema","recorrido","caso-real","precios","diagnostico"]) {
  assert.ok(html.includes(`id="${id}"`),`Falta sección ${id}`);
}

console.log("✓ Contratos del diseño público validados. Falta QA visual en dispositivos.");
