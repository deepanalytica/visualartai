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

assert.ok(html.includes('href="styles/experience-v1.css?v=12"'), "Falta stylesheet incremental");
assert.equal((html.match(/vaa-official-brand"/g)||[]).length,2,"Logotipo oficial en cabecera y menú");
assert.ok(html.includes('src="/brands/visual-art-ai-official-light.svg?v=3"'),"Falta versión oficial clara");
assert.ok(html.includes('src="/brands/visual-art-ai-official-dark.svg?v=3"'),"Falta versión oficial sobre fondo oscuro");
assert.ok(html.includes('srcset="/brands/visual-art-ai-official-compact.svg?v=3"'),"Falta variante compacta móvil");
assert.ok(html.includes('href="/brands/visual-art-ai-logo.svg?v=20261017v2"'),"Favicon debe usar isotipo oficial");
const identitySvg=read("site/brands/visual-art-ai-official-light.svg");
const identityDark=read("site/brands/visual-art-ai-official-dark.svg");
const iconSvg=read("site/brands/visual-art-ai-logo.svg");
const serviceBrand=read("site/brands/visual-art-ai-brand.svg");
for(const [label,asset] of [["claro",identitySvg],["oscuro",identityDark],["isotipo",iconSvg],["secundarias",serviceBrand]]) {
 assert.ok(asset.includes("<svg")&&asset.includes('fill="#2563FF"'),"SVG oficial inconsistente: "+label);
 assert.ok(!asset.includes("vaa-signal-arc")&&!asset.includes("circle cx=\"18\""),"Marca circular antigua en: "+label);
}
assert.ok(identitySvg.includes("VISIBILIDAD")&&identityDark.includes("QUE GENERA"),"Falta lema del manual");
assert.ok(style.includes(".vaa-footer-identity"),"La versión oscura debe tener reglas de pie");
assert.ok(identitySvg.includes("Visual Art AI")&&html.includes("vaa-official-brand"), "El logotipo oficial debe ser protagonista, no texto reconstruido en HTML");
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

assert.ok(html.includes('id="preguntas"'),"Falta bloque de objeciones comerciales");
assert.ok(html.includes("¿Qué necesitas mejorar en tu negocio?"),"La primera sección debe explicar los servicios claramente");
assert.equal((html.match(/class="v21-service-card"/g)||[]).length,6,"Se esperan seis servicios visibles sin interacción");
assert.ok(["seo-google-maps","visibilidad-ia","web-landing-pages","google-meta-ads","whatsapp-automatizacion","contenido-analitica"].every(slug=>html.includes(`href="servicios/${slug}.html"`)),"Falta enlace directo a alguno de los seis servicios");
assert.ok(html.indexOf('v21-service-overview')<html.indexOf('id="recorrido"'),"Los servicios deben preceder a los ejemplos");
assert.ok(!html.includes('data-problem='),"No reintroducir diagnósticos ocultos después del héro");
assert.ok(!hero.includes('const problemData='),"Eliminar el JavaScript de la interacción descartada");
assert.equal((html.match(/class="v20-assurance-answers"/g)||[]).length,1,"Falta un único bloque de preguntas");
assert.equal((html.match(/<section class="v20-assurance"/g)||[]).length,1,"Duplicación de módulo comercial");
assert.ok(html.includes("qué corregiríamos primero y por qué"),"La oferta gratuita debe ser específica");
assert.ok(html.includes("posiciones garantizadas"),"El caso no debe prometer resultados medidos");
assert.equal((html.match(/<h1\b/g)||[]).length,1,"La portada debe conservar un solo H1");
const approvedHero="Hay personas buscando lo que vendes en Google y ChatGPT. Y mientras tú no apareces, están llamando a tu competencia.";
const currentHero=html.match(/<h1 class="v19-hero-title"[\s\S]*?<\/h1>/)?.[0]?.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
assert.equal(currentHero,approvedHero,"Mantener íntegra la frase del héro");
assert.ok(html.includes('class="button button-primary v22-mobile-primary"'),"Falta CTA móvil de contacto inmediato");
assert.ok(html.includes('class="v22-sticky-diagnostic"'),"Falta barra móvil de una sola acción");
assert.ok(html.includes('class="v22-mobile-services"'),"Falta resumen móvil de servicios");
assert.ok(style.includes(".home-v11 .v11-search-scene"),"No ocultar demo ornamental en móvil");
const consent=read("site/analytics-consent.js");
assert.ok(consent.includes('document.querySelector("footer.footer")||document.body'),"Los ajustes de privacidad deben mantenerse accesibles sin tapar la pantalla");
assert.ok(html.includes('class="v23-fast-whatsapp"')||html.includes('v23-fast-whatsapp"'),"Falta diagnóstico directo sin formulario");
assert.ok(html.includes('class="v23-optional-brief"'),"Formulario no puede ser obligatorio para solicitar diagnóstico");
assert.ok(html.indexOf('id="diagnostico"')<html.indexOf('id="ideas"'),"El blog debe aparecer después del CTA comercial");
assert.ok(html.includes('casos/jessica-arriagada-presencia-digital.html'),"El caso debe enlazar a su ficha real");
assert.ok(html.includes("MENSAJE GENÉRICO")&&html.includes("MENSAJE ESPECÍFICO"),"No presentar esquemas ficticios como antes y después medidos");
assert.ok(html.includes('class="v23-mobile-prices"'),"Precios deben resumirse para móviles");
assert.ok(html.includes('role="dialog" aria-modal="true" aria-label="Menú de navegación"'),"El menú debe ser un diálogo accesible");
const navStart=html.indexOf('<nav aria-label="Secciones de la página">');
const navEnd=html.indexOf('</nav>',navStart);
assert.ok(navStart>=0&&navEnd>navStart,"No existe navegación móvil acotada");
const menuLinks=[...html.slice(navStart,navEnd).matchAll(/<a href="([^"]+)">([^<]+)<\/a>/g)];
assert.deepEqual(menuLinks.map(x=>x[2]),["Servicios","Caso real","Precios","Preguntas frecuentes"],"Solo cuatro rutas esenciales en el menú");
assert.ok(html.includes('class="button button-primary v24-menu-cta"'),"El menú debe ofrecer un solo CTA de diagnóstico");
assert.ok(html.includes('data-whatsapp="mobile-menu"'),"CTA del menú debe enlazar directo a WhatsApp");
assert.ok(style.includes(".home-v11 .mobile-menu-panel")&&style.includes("min-height:0"),"Menú no debe ocupar toda la altura del teléfono");
assert.ok(runtime.includes('menu.addEventListener("click"'),"El menú debe cerrar al tocar el fondo");
assert.ok(html.includes('class="v26-research-links"'),"Falta ruta accesible para visitantes que aún comparan");
assert.ok(html.includes('href="#caso-real">Ver un trabajo publicado'),"Falta enlace a prueba verificable");
assert.ok(html.includes('href="#preguntas">Resolver mis dudas'),"Falta acceso simple a preguntas frecuentes");
assert.ok(html.includes('href="https://www.jessicaarriagadapsicologa.cl/"'),"Falta acceso al sitio real del caso");
assert.ok(html.includes("¿Por qué importan las reseñas y los videos si ya tengo una web?"),"Debe explicar el valor de la prueba multicanal");
assert.ok(html.includes("¿Cómo sé si los cambios están dando resultado?"),"Debe explicar la diferencia entre clic y consulta");
assert.ok(style.includes(".v26-research-links a:focus-visible"),"Los enlaces de comprobación necesitan foco visible");
const buyerArticle=read("site/articulos/contenido-preguntas-clientes-seo-ia.html");
assert.ok(buyerArticle.includes('id="s9"')&&buyerArticle.includes('id="s10"'),"Faltan las lecciones sobre confianza y datos de producto");
assert.ok(buyerArticle.includes("no para estimar cuántos clientes"),"No extrapolar retail internacional a servicios chilenos");
assert.ok(html.includes("Pago publicidad, pero no sé si vendo más."),"El problema de anuncios sin ventas debe estar descrito para compradores");
assert.ok(html.includes("Mi web recibe visitas, pero no consultas."),"El problema de conversión debe ser visible");
assert.ok(html.includes("Me llegan pocas consultas"),"Servicios móviles deben empezar por el problema del comprador");
for(const id of ["busquedas","voces","por-que","empezar"]){
  assert.ok(html.includes('id="'+id+'"'),"Falta capítulo "+id);
}
assert.ok(html.includes("Ejemplos ilustrativos de preguntas"),"Las búsquedas no se pueden presentar como resultados reales");
assert.ok(html.includes("no son testimonios reales"),"Las voces ficticias deben estar claramente identificadas");
assert.ok(html.includes('class="v27-mobile-search-details"'),"En móvil los ejemplos se deben mostrar bajo demanda");
assert.ok(html.includes('class="v27-mobile-voice-details"'),"En móvil las voces se deben mostrar bajo demanda");
assert.equal((html.match(/class="v27-method-grid"/g)||[]).length,1,"Debe haber cuatro resultados conectados");
assert.ok(html.includes('Que sepas qué funciona.'),"Debe hablar de consultas verificables");
assert.ok(html.includes('class="v27-start-steps"'),"Faltan los tres pasos del diagnóstico");
assert.ok(html.includes('v27-close-cta"'),"Falta el último CTA visible");
assert.equal((html.match(/<details>/g)||[]).length>=8,true,"El FAQ debe cubrir ocho objeciones");
assert.ok(html.includes('Respuesta en 24 h hábiles'),"La política comercial de respuesta debe ser visible");
assert.ok(html.includes('data-whatsapp="quick-hero-desktop"'),"El CTA desktop debe abrir WhatsApp directamente");
assert.ok(["v29-float-search","v29-float-visibility","v29-float-clients"].every(x=>html.includes(x)),"El nuevo motivo visual debe conectar búsqueda, visibilidad y contacto");
const resources=read("site/recursos/index.html");
const resourcesCss=read("site/recursos/recursos.css");
const resourcesJs=read("site/recursos/recursos.js");
assert.ok(html.includes('class="v28-resource-teaser"'),"Portada debe anunciar recursos gratuitos");
assert.ok(html.includes('href="recursos/"'),"Portada necesita enlace al centro de guías");
assert.ok(resources.includes('href="https://visualartai.cl/recursos/"'),"Falta canonical de recursos");
assert.equal((resources.match(/class="resource-card"/g)||[]).length,12,"Deben haber 12 recursos no repetidos");
assert.ok(resources.includes('data-filter="local"')&&resources.includes('data-filter="whatsapp"'),"Filtros de investigación de cliente");
assert.ok(resourcesJs.includes("aria-pressed"),"Los filtros deben exponer estado accesible");
assert.ok(resourcesCss.includes("max-width:640px"),"Los recursos necesitan estilo móvil");
const links=[...resources.matchAll(/href="\.\.\/articulos\/([^"]+\.html)"/g)].map(x=>x[1]);
assert.equal(links.length,12,"Doce guías navegables");
assert.equal(new Set(links).size,12,"No repetir los mismos enlaces");
for(const slug of links)assert.ok(existsSync(join(root,"site/articulos",slug)),"Guía inexistente: "+slug);
assert.ok(read("site/sitemap.xml").includes("https://visualartai.cl/recursos/"),"El centro de recursos debe estar en sitemap");
assert.ok(read("site/styles/entity-pages.css").includes(".service-evidence-grid"),"Las seis páginas de servicio necesitan entregables claros");
for(const slug of ["seo-google-maps","visibilidad-ia","web-landing-pages","google-meta-ads","whatsapp-automatizacion","contenido-analitica"]){
 const service=read("site/servicios/"+slug+".html");
 assert.ok(service.includes('class="service-evidence-grid"'),"Faltan entregables en: "+slug);
 assert.ok(service.includes('href="https://wa.me/56958039450?text='),"CTA directo de servicio: "+slug);
}
console.log("✓ Contratos del diseño público validados. Falta QA visual en dispositivos.");
