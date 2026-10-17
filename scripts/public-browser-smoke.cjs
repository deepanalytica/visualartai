/* Visual Art AI — public visual and flow smoke tests (GitHub Actions).
   Runs against the exact /site artifact deployed by GitHub Pages. */
const assert = require("node:assert/strict");
const { spawn } = require("node:child_process");
const { mkdirSync } = require("node:fs");
const { chromium } = require("playwright");

const server = spawn("python3", ["-m","http.server","4173","--directory","site"], { stdio:"ignore" });
const origin = "http://127.0.0.1:4173";
const sizes = [{width:320,height:730},{width:390,height:844},{width:768,height:1024},{width:1024,height:768},{width:1440,height:900}];
const wait = ms=>new Promise(res=>setTimeout(res,ms));
let browser;
(async()=>{
  let up=false;
  for(let n=0;n<30;n++){try{const r=await fetch(origin);if(r.ok){up=true;break}}catch{}await wait(400)}
  assert(up,"Servidor estático no inició");
  mkdirSync("qa-screenshots",{recursive:true});
  browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
  for(const size of sizes){
    const page=await browser.newPage({viewport:size,deviceScaleFactor:1});
    const errors=[];
    page.on("pageerror",e=>errors.push(String(e)));
    await page.goto(origin,{waitUntil:"load",timeout:30000});
    await page.evaluate(()=>document.fonts.ready);
    await page.locator(".vaa-footer-identity img").evaluate(async img=>{img.loading="eager";await img.decode()});
    const info=await page.evaluate(()=>({
      title:document.title,
      h1:document.querySelectorAll("h1").length,
      fullWidth:document.documentElement.scrollWidth,
      viewport:window.innerWidth,
      brand:document.querySelectorAll(".vaa-official-brand img").length,
      brandLoaded:[...document.querySelectorAll(".vaa-official-brand img")].every(img=>img.complete&&img.naturalWidth>0),
      brandSource:document.querySelector(".topbar .vaa-official-brand img")?.currentSrc,
      footerLogoLoaded:document.querySelector(".vaa-footer-identity img")?.naturalWidth>0,
      script:typeof window.VAAI?.track==="function",
      backdrop:getComputedStyle(document.body).backgroundColor,
    }));
    assert.equal(info.h1,1,"Falta H1 único");
    assert.equal(info.brand,2,"La marca oficial debe estar presente en cabecera y menú");
    assert(info.brandLoaded,"Los SVG oficiales no cargaron");
    assert(info.footerLogoLoaded,"Versión oscura en footer no cargó");
    assert(info.brandSource.includes(size.width<=720?"official-compact.svg":"official-light.svg"),"El tamaño debe elegir el logo oficial adecuado");
    assert(info.script,"No se inicializó site.js");
    assert(info.fullWidth<=info.viewport+5,`Overflow horizontal a ${size.width}px: ${info.fullWidth}px`);
    assert.equal(errors.length,0,`Errores JS en ${size.width}px: ${errors.join("; ")}`);
    assert.equal(await page.locator("#problema .v21-service-card").count(),6,"La primera sección debe contener seis servicios legibles");
    assert.equal(await page.locator("#problema h2").innerText(),size.width<=720?"¿Qué te está pasando con tu negocio?":"¿Qué necesitas mejorar en tu negocio?","Mensaje claro inmediatamente después del héro");
    assert(await page.locator('#problema .v21-service-card a[href^="servicios/"]').count()===6,"Enlaces a los seis servicios");
    for(const id of ["busquedas","voces","por-que","empezar"])assert.equal(await page.locator("#"+id).count(),1,"Sección faltante: "+id);
    assert.equal(await page.locator(".v27-voices-grid blockquote").count(),5,"Cinco situaciones del comprador");
    assert.equal(await page.locator(".v27-search-grid .v27-search-panel").count(),2,"Búsqueda e IA explicadas por separado");
    assert.equal(await page.locator(".v27-start-steps li").count(),3,"Tres pasos de diagnóstico");
    assert.equal(await page.locator(".v27-close-cta").count(),1,"Solo un CTA final");
    assert((await page.locator(".v27-close-cta").getAttribute("href")).startsWith("https://wa.me/"),"El cierre debe abrir contacto directo");
    if(size.width===390){
      assert(await page.locator(".v27-search-grid").isHidden(),"No presentar grandes ejemplos antes de la venta móvil");
      assert(await page.locator(".v27-voices-grid").isHidden(),"Las voces no pueden sobrecargar la pantalla");
      const disclosure=page.locator(".v27-mobile-search-details");
      assert(await disclosure.isVisible(),"Las búsquedas deben poder consultarse en móvil");
      await disclosure.locator("summary").click();
      assert(await disclosure.getAttribute("open")!==null,"Los ejemplos se expanden de forma accesible");
      await disclosure.locator("summary").click();
    }
    assert(await page.locator("#diagnosticForm").count()===1,"Formulario de diagnóstico ausente");
    assert.equal(await page.locator("#preguntas .v20-assurance-answers details").count(),8,"Ocho dudas respondidas sin formulario");
    assert.equal(await page.locator("#caso-real .v26-source-link").getAttribute("href"),"https://www.jessicaarriagadapsicologa.cl/","El caso debe permitir comprobar la web real");
    if(size.width===390){
      assert(await page.locator(".v26-research-links").isVisible(),"Rutas para visitantes que aún comparan");
      assert.equal(await page.locator(".v26-research-links a").count(),2,"Dos enlaces discretos a pruebas y FAQ");
      assert((await page.locator(".v26-research-links a").first().getAttribute("href"))==="#caso-real","El ejemplo debe abrir la prueba");
    }
    assert.equal(await page.locator(".v23-fast-whatsapp").count(),1,"Una salida directa a WhatsApp");
    assert((await page.locator(".v23-fast-whatsapp").getAttribute("href")).startsWith("https://wa.me/"),"Diagnóstico directo con mensaje preparado");
    assert.equal(await page.locator(".v23-optional-brief").count(),1,"Formulario adicional opcional");
    assert.equal(await page.locator(".v23-optional-brief").getAttribute("open"),null,"El formulario detallado empieza plegado");
    assert.equal(await page.locator("#caso-real a.v11-link").getAttribute("href"),"casos/jessica-arriagada-presencia-digital.html","El caso debe llevar a la ficha real");
    assert(await page.locator("#diagnostico").evaluate(el=>Boolean(el.compareDocumentPosition(document.getElementById("ideas")) & Node.DOCUMENT_POSITION_FOLLOWING)),"El blog debe aparecer después de la solicitud");
    if(size.width===390){
      assert.equal(await page.locator(".v22-mobile-services>a").count(),4,"Tres servicios rápidos más enlace a catálogo");
      assert((await page.locator(".v22-mobile-services>a").first().innerText()).includes("Me llegan pocas consultas"),"Primero problema real, luego herramienta");
      assert(await page.locator(".v22-mobile-primary").isVisible(),"CTA del héro debe ser visible");
      assert(await page.locator(".v22-desktop-primary").isHidden(),"Evitar CTA duplicado en el héro");
      assert(await page.locator(".v11-search-scene").isVisible(),"La búsqueda visual debe mantenerse en la experiencia móvil");
      assert.equal(await page.locator(".v29-platform img").count(),5,"Cinco plataformas identificables en el buscador");
      const heroAction=await page.locator(".v22-mobile-primary").boundingBox();
      const heroDemo=await page.locator(".v11-search-scene").boundingBox();
      assert(heroAction&&heroDemo&&heroAction.y<heroDemo.y,"El CTA debe aparecer antes de la demostración móvil");
      assert(await page.locator(".v16-service-strip").isHidden(),"Chips redundantes ocultos en móvil");
      assert(await page.locator("#recorrido").isVisible(),"Los cuatro beneficios deben leerse en móvil");
      assert(await page.locator("#recorrido .v19-service").first().isHidden(),"Las demos largas permanecen ocultas en móvil");
      assert.equal(await page.locator(".v27-method-grid>div").count(),4,"Cuatro resultados de búsqueda a consulta");
      assert(await page.locator(".v21-service-grid").isHidden(),"No cargar seis tarjetas largas en móvil");
      assert(await page.locator(".topbar-actions>.button").isHidden(),"Un solo CTA a la vez en móvil");
      assert.equal(await page.locator("#mobileConvert a").count(),1,"La barra fija debe tener una sola acción");
      assert(await page.locator(".v22-mobile-primary").getAttribute("href").then(u=>u.startsWith("https://wa.me/")),"Ruta móvil directa a WhatsApp");
      assert(await page.locator("#vaa-privacy-control").evaluate(el=>Boolean(el.closest("footer"))),"Privacidad no debe flotar sobre la pantalla");
      assert(await page.locator("#vaa-consent-panel").isVisible(),"La opción de consentimiento inicial debe conservarse");
      const beforePrivacy=await page.evaluate(()=>scrollY);
      await page.locator("#vaa-consent-reject").click();
      const afterPrivacy=await page.evaluate(()=>scrollY);
      assert(Math.abs(afterPrivacy-beforePrivacy)<60,"La decisión de privacidad no debe desplazar la pantalla");
      assert(await page.locator("#vaa-consent-panel").isHidden(),"Se respetó la elección de privacidad");
      const q=page.locator("#preguntas .v20-assurance-answers details").last();
      await q.locator("summary").click();
      assert(await q.getAttribute("open")!==null,"El visitante puede ver cómo se miden resultados");
      await q.locator("summary").click();
      await page.locator("#caso-real").scrollIntoViewIfNeeded();
      await page.waitForTimeout(550);
      const funnelState=await page.evaluate(()=>({
        heroBottom:document.getElementById("inicio").getBoundingClientRect().bottom,
        consentHidden:document.getElementById("vaa-consent-panel").hidden,
        diagnosticTop:document.getElementById("diagnostico").getBoundingClientRect().top,
        scroll:window.scrollY,barHidden:document.getElementById("mobileConvert").getAttribute("aria-hidden"),
      }));
      console.log("Mobile funnel state",funnelState);
      assert(await page.locator("#mobileConvert").getAttribute("aria-hidden").then(v=>v==="false"),"Un CTA fijo después del héro");
      assert(await page.locator("#mobileConvert a").isVisible(),"CTA fijo debe mostrarse después del héro");
    }
    assert(await page.locator("#sendByEmail").count()===1,"Falta alternativa de correo");
    if(await page.locator("#vaa-consent-panel").isVisible())await page.locator("#vaa-consent-reject").click();
    await page.evaluate(()=>window.scrollTo({top:0,behavior:"instant"}));
    await page.waitForTimeout(200);
    await page.screenshot({path:`qa-screenshots/public-${size.width}.png`,fullPage:true,animations:"disabled"});
    if(size.width===390){
      const menu=page.locator("#menuBtn");
      await menu.click();
      assert.equal(await menu.getAttribute("aria-expanded"),"true","Menú no abre");
      const menuSheet=await page.locator(".mobile-menu-panel").boundingBox();
      assert(menuSheet&&menuSheet.height<size.height-120,"El menú ocupa demasiada altura en móvil");
      assert.equal(await page.locator("#mobileMenu nav a").count(),4,"Navegación reducida a cuatro enlaces");
      assert.deepEqual(await page.locator("#mobileMenu nav a").allTextContents(),["Servicios","Caso real","Precios","Preguntas frecuentes"]);
      assert.equal(await page.locator("#mobileMenu .v24-menu-cta").count(),1,"Único CTA comercial en el menú");
      assert((await page.locator("#mobileMenu .v24-menu-cta").getAttribute("href")).startsWith("https://wa.me/"),"El CTA del menú abre WhatsApp");
      assert.equal(await page.locator("#mobileMenu").getAttribute("aria-hidden"),"false","Diálogo expuesto al abrir");
      await page.keyboard.press("Escape");
      assert.equal(await menu.getAttribute("aria-expanded"),"false","Menú no cierra con Escape");
      assert.equal(await page.locator("#mobileMenu").getAttribute("aria-hidden"),"true","Diálogo oculto al cerrar");
      await menu.click();
      await page.locator("#mobileMenu nav a").first().click();
      assert.equal(await menu.getAttribute("aria-expanded"),"false","El menú cierra tras elegir sección");
      assert.equal(new URL(page.url()).hash,"#problema","La sección elegida debe abrirse");
      await menu.click();
      await page.locator("#mobileMenu").click({position:{x:4,y:size.height-4}});
      assert.equal(await menu.getAttribute("aria-expanded"),"false","El menú debe cerrar tocando el fondo");
      const play=page.locator("#v11QueryPlay");
      assert.equal(await play.getAttribute("aria-pressed"),"false","Los ejemplos no deben iniciar en autoplay");
      assert(await page.locator(".v23-mobile-prices").isVisible(),"Mostrar precios resumidos en móvil");
      assert.equal(await page.locator(".v23-mobile-prices details").count(),3,"Tres opciones de precio");
      assert(await page.locator("#caso-real .v11-compare").isHidden(),"No obligar a usar deslizadores ilustrativos en móvil");
      await page.locator(".v23-mobile-prices details").first().locator("summary").click();
      await page.locator(".v23-mobile-prices details").first().locator("a").click();
      const consultLink=await page.locator(".v23-fast-whatsapp").getAttribute("href");
      assert(decodeURIComponent(consultLink).includes("Puesta a punto desde 89000 CLP"),"Al consultar un plan se conserva el contexto comercial");
      await page.locator(".v23-optional-brief summary").click();
      assert(await page.locator("#diagnosticForm").isVisible(),"Se puede ampliar el formulario sin cambiar de página");
      const cta=page.locator("#diagnosticForm button[type=submit]");
      await cta.click();
      const invalid=await page.locator("#diagnosticForm :invalid").count();
      assert(invalid>0,"Formulario vacío debió rechazar envío");
      await page.locator("#goal").selectOption({index:1});
      await page.locator("#situation").fill("Estudio contable en Talca, necesito nuevas consultas.");
      await page.locator("#email").fill("persona@example.com");
      // Intercept the external WhatsApp navigation; do not transmit test data.
      let destination="";
      await page.route("https://wa.me/**",route=>{
        destination=route.request().url();
        return route.fulfill({status:200,contentType:"text/html",body:"<!doctype html><title>Intercepción QA</title>"});
      });
      await cta.click();
      await page.waitForTimeout(450);
      assert(destination.includes("text="),"No se preparó contacto en WhatsApp");
      const msg=new URL(destination).searchParams.get("text")||"";
      assert(msg.includes("Estudio contable en Talca"),"Faltan datos del negocio en la solicitud");
      assert(msg.includes("persona@example.com"),"Falta email en la solicitud");
    }
    console.log(`OK ${size.width}px: responsive, identidad, JS, formulario`);
    await page.close();
  }
  const resources=await browser.newPage({viewport:{width:390,height:844}});
  await resources.goto(origin+"/recursos/",{waitUntil:"load"});
  assert.equal(await resources.locator(".resource-card").count(),12,"12 guías públicas");
  assert.equal(await resources.locator(".resource-card:visible").count(),12,"Todas las guías al iniciar");
  await resources.locator('button[data-filter="whatsapp"]').click();
  assert.equal(await resources.locator(".resource-card:visible").count(),2,"Filtrar WhatsApp");
  assert.equal(await resources.locator('button[data-filter="whatsapp"]').getAttribute("aria-pressed"),"true","Estado de filtro accesible");
  await resources.locator('button[data-filter="all"]').click();
  assert.equal(await resources.locator(".resource-card:visible").count(),12,"Restaurar catálogo");
  const rw=await resources.evaluate(()=>document.documentElement.scrollWidth);
  assert(rw<=390+5,"Overflow horizontal en recursos: "+rw);
  await resources.screenshot({path:"qa-screenshots/resources-390.png",fullPage:true});
  await resources.close();
  const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:"reduce"});
  const reduced=await context.newPage();
  await reduced.goto(origin,{waitUntil:"load"});
  assert.equal(await reduced.locator("#v11QueryPlay").isDisabled(),true,"Movimiento reducido debe desactivar autoplay");
  await context.close();
  console.log("✓ QA navegador realizado en 5 breakpoints; reduced motion verificado");
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();server.kill()});
