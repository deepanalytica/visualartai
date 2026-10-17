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
    const info=await page.evaluate(()=>({
      title:document.title,
      h1:document.querySelectorAll("h1").length,
      fullWidth:document.documentElement.scrollWidth,
      viewport:window.innerWidth,
      brand:document.querySelectorAll(".vaa-wordmark strong").length,
      script:typeof window.VAAI?.track==="function",
      backdrop:getComputedStyle(document.body).backgroundColor,
    }));
    assert.equal(info.h1,1,"Falta H1 único");
    assert.equal(info.brand,2,"La marca debe estar presente en desktop y móvil");
    assert(info.script,"No se inicializó site.js");
    assert(info.fullWidth<=info.viewport+5,`Overflow horizontal a ${size.width}px: ${info.fullWidth}px`);
    assert.equal(errors.length,0,`Errores JS en ${size.width}px: ${errors.join("; ")}`);
    assert.equal(await page.locator("#problema .v21-service-card").count(),6,"La primera sección debe contener seis servicios legibles");
    assert.equal(await page.locator("#problema h2").innerText(),size.width<=720?"¿En qué te ayudamos?":"¿Qué hacemos en Visual Art AI?","Mensaje claro inmediatamente después del héro");
    assert(await page.locator('#problema .v21-service-card a[href^="servicios/"]').count()===6,"Enlaces a los seis servicios");
    assert(await page.locator("#diagnosticForm").count()===1,"Formulario de diagnóstico ausente");
    if(size.width===390){
      assert.equal(await page.locator(".v22-mobile-services>a").count(),4,"Tres servicios rápidos más enlace a catálogo");
      assert(await page.locator(".v22-mobile-primary").isVisible(),"CTA del héro debe ser visible");
      assert(await page.locator(".v22-desktop-primary").isHidden(),"Evitar CTA duplicado en el héro");
      assert(await page.locator(".v11-search-scene").isHidden(),"La demostración no puede retrasar la conversión móvil");
      assert(await page.locator(".v16-service-strip").isHidden(),"Chips redundantes ocultos en móvil");
      assert(await page.locator("#recorrido").isHidden(),"No duplicar ejemplos en el embudo móvil");
      assert(await page.locator(".v21-service-grid").isHidden(),"No cargar seis tarjetas largas en móvil");
      assert(await page.locator(".topbar-actions>.button").isHidden(),"Un solo CTA a la vez en móvil");
      assert.equal(await page.locator("#mobileConvert a").count(),1,"La barra fija debe tener una sola acción");
      assert(await page.locator(".v22-mobile-primary").getAttribute("href").then(u=>u.startsWith("https://wa.me/")),"Ruta móvil directa a WhatsApp");
      assert(await page.locator("#vaa-privacy-control").evaluate(el=>Boolean(el.closest("footer"))),"Privacidad no debe flotar sobre la pantalla");
      assert(await page.locator("#vaa-consent-panel").isVisible(),"La opción de consentimiento inicial debe conservarse");
      await page.locator("#vaa-consent-reject").click();
      const y=await page.evaluate(()=>scrollY);
      assert(y<50,"La decisión de privacidad no debe desplazar la pantalla al pie de página");
      assert(await page.locator("#vaa-consent-panel").isHidden(),"Se respetó la elección de privacidad");
      await page.locator("#problema").scrollIntoViewIfNeeded();
      await page.waitForTimeout(450);
      assert(await page.locator("#mobileConvert").getAttribute("aria-hidden").then(v=>v==="false"),"Un CTA fijo después del héro");
      assert(await page.locator("#mobileConvert a").isVisible(),"CTA fijo debe mostrarse después del héro");
    }
    assert(await page.locator("#sendByEmail").count()===1,"Falta alternativa de correo");
    await page.screenshot({path:`qa-screenshots/public-${size.width}.png`,fullPage:true,animations:"disabled"});
    if(size.width===390){
      const menu=page.locator("#menuBtn");
      await menu.click();
      assert.equal(await menu.getAttribute("aria-expanded"),"true","Menú no abre");
      await page.keyboard.press("Escape");
      assert.equal(await menu.getAttribute("aria-expanded"),"false","Menú no cierra con Escape");
      const play=page.locator("#v11QueryPlay");
      assert.equal(await play.getAttribute("aria-pressed"),"false","Los ejemplos no deben iniciar en autoplay");
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
  const context=await browser.newContext({viewport:{width:390,height:844},reducedMotion:"reduce"});
  const reduced=await context.newPage();
  await reduced.goto(origin,{waitUntil:"load"});
  assert.equal(await reduced.locator("#v11QueryPlay").isDisabled(),true,"Movimiento reducido debe desactivar autoplay");
  await context.close();
  console.log("✓ QA navegador realizado en 5 breakpoints; reduced motion verificado");
})().catch(e=>{console.error(e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();server.kill()});
