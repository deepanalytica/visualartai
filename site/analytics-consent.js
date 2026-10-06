/* Visual Art AI — analytics consent and Tag Manager */
(function bootAnalyticsConsent(){
  "use strict";
  var storageKey="vaa.analytics.v1";
  var gtmId="GTM-T84CRBCC";
  var loaded=false;
  function read(){try{return localStorage.getItem(storageKey)}catch(e){return null}}
  function write(value){try{localStorage.setItem(storageKey,value)}catch(e){}}
  function loadTagManager(){
    if(loaded)return;
    loaded=true;
    window.vaaAnalyticsAllowed=true;
    window.dataLayer=window.dataLayer||[];
    window.gtag=function(){window.dataLayer.push(arguments)};
    window.gtag("consent","default",{analytics_storage:"granted",ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied"});
    window.dataLayer.push({"gtm.start":Date.now(),event:"gtm.js"});
    var script=document.createElement("script");
    script.async=true;
    script.src="https://www.googletagmanager.com/gtm.js?id="+encodeURIComponent(gtmId);
    document.head.appendChild(script);
  }
  var choice=read();
  window.vaaAnalyticsAllowed=false;
  if(choice==="accepted")loadTagManager();
  function render(){
    var style=document.createElement("style");
    style.textContent="#vaa-privacy-control{position:fixed;z-index:2147483646;right:16px;bottom:16px;border:1px solid #d5dce7;border-radius:999px;background:#fff;color:#152338;padding:9px 13px;font:600 12px/1.3 system-ui,sans-serif;box-shadow:0 4px 18px #15233822;cursor:pointer}#vaa-consent-panel{position:fixed;z-index:2147483647;left:16px;right:16px;bottom:16px;max-width:540px;margin:auto;box-sizing:border-box;border:1px solid #d5dce7;border-radius:16px;background:#fff;color:#152338;padding:18px;box-shadow:0 12px 42px #15233833;font:14px/1.55 system-ui,sans-serif}#vaa-consent-panel[hidden]{display:none}#vaa-consent-panel p{margin:6px 0 14px}#vaa-consent-panel a{color:#1459a8;text-decoration:underline}#vaa-consent-actions{display:flex;gap:10px;flex-wrap:wrap}#vaa-consent-actions button{border-radius:8px;padding:9px 16px;font:600 14px system-ui,sans-serif;cursor:pointer}#vaa-consent-accept{background:#152338;color:#fff;border:1px solid #152338}#vaa-consent-reject{background:#fff;color:#152338;border:1px solid #aeb8c5}@media(max-width:600px){#vaa-consent-panel{bottom:max(12px,env(safe-area-inset-bottom));padding:16px}#vaa-privacy-control{bottom:max(12px,env(safe-area-inset-bottom))}}";
    document.head.appendChild(style);
    var control=document.createElement("button");
    control.id="vaa-privacy-control";
    control.type="button";
    control.textContent="Privacidad";
    control.setAttribute("aria-label","Cambiar preferencias de medición");
    document.body.appendChild(control);
    var panel=document.createElement("section");
    panel.id="vaa-consent-panel";
    panel.setAttribute("role","dialog");
    panel.setAttribute("aria-label","Preferencias de medición");
    panel.innerHTML="<strong>Tu privacidad</strong><p>Usamos Google Analytics para entender las visitas y mejorar este sitio. Solo se activará si aceptas. <a href=\"/aviso-de-privacidad.html\">Cómo usamos estos datos</a>.</p><div id=\"vaa-consent-actions\"><button id=\"vaa-consent-accept\" type=\"button\">Aceptar analítica</button><button id=\"vaa-consent-reject\" type=\"button\">Rechazar</button></div>";
    panel.hidden=choice!==null;
    document.body.appendChild(panel);
    control.addEventListener("click",function(){panel.hidden=false;panel.querySelector("#vaa-consent-accept").focus()});
    panel.querySelector("#vaa-consent-accept").addEventListener("click",function(){write("accepted");choice="accepted";panel.hidden=true;loadTagManager();control.focus()});
    panel.querySelector("#vaa-consent-reject").addEventListener("click",function(){var wasLoaded=loaded;write("rejected");choice="rejected";panel.hidden=true;if(wasLoaded)location.reload();else control.focus()});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",render,{once:true});else render();
})();
