/* Visual Art AI — shared production runtime v13 */
(()=>{
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const track=(name,props={})=>{try{if(window.vaaAnalyticsAllowed===true&&Array.isArray(window.dataLayer)){const placement=typeof props.placement==="string"?props.placement.slice(0,40):undefined;window.dataLayer.push(placement?{event:name,placement}:{event:name})}window.dispatchEvent(new CustomEvent("vaai:track",{detail:{name,props}}))}catch{}};
  window.VAAI={track};
  const reveal=[...document.querySelectorAll(".section,.final-cta,[data-motion-reveal]")];
  if(reduce||!("IntersectionObserver" in window))reveal.forEach(el=>el.classList.add("in"));else{reveal.forEach(el=>el.classList.add("reveal"));const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.classList.add("in");io.unobserve(entry.target)}),{threshold:.08,rootMargin:"0px 0px -5% 0px"});reveal.forEach(el=>io.observe(el))}
  const menu=document.getElementById("mobileMenu"),open=document.getElementById("menuBtn"),close=document.getElementById("menuClose");
  if(menu&&open&&close){
    let lastFocus=null;
    const focusables=()=>[...menu.querySelectorAll('a,button,[tabindex]:not([tabindex="-1"])')].filter(el=>!el.disabled);
    const setOpen=(value,restoreFocus=true)=>{
      menu.classList.toggle("open",value);
      menu.inert=!value;
      menu.setAttribute("aria-hidden",String(!value));
      open.setAttribute("aria-expanded",String(value));
      document.body.style.overflow=value?"hidden":"";
      if(value){
        lastFocus=document.activeElement;
        close.focus({preventScroll:true});
      }else if(restoreFocus&&lastFocus?.focus)lastFocus.focus({preventScroll:true});
    };
    open.addEventListener("click",()=>setOpen(true));
    close.addEventListener("click",()=>setOpen(false));
    menu.addEventListener("click",e=>{if(e.target===menu)setOpen(false)});
    menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
      const href=a.getAttribute("href")||"";
      if(href.startsWith("#")){
        setOpen(false,false);
        const target=document.querySelector(href);
        if(target){
          target.setAttribute("tabindex","-1");
          requestAnimationFrame(()=>target.focus({preventScroll:true}));
        }
      }else{
        setOpen(false);
      }
    }));
    document.addEventListener("keydown",e=>{
      if(!menu.classList.contains("open"))return;
      if(e.key==="Escape"){e.preventDefault();setOpen(false);return}
      if(e.key!=="Tab")return;
      const els=focusables();
      if(!els.length)return;
      const first=els[0],last=els[els.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}
    });
  }
  const bar=document.getElementById("mobileConvert"),diagnostic=document.getElementById("diagnostico"),hero=document.getElementById("inicio");
  if(bar&&diagnostic&&hero&&"IntersectionObserver" in window){
    let diagnosticVisible=true,ticking=false;
    const update=()=>{
      const pastHero=hero.getBoundingClientRect().bottom<=80;
      const consentOpen=Boolean(document.querySelector("#vaa-consent-panel:not([hidden])"));
      const show=matchMedia("(max-width:45rem)").matches&&pastHero&&!diagnosticVisible&&!consentOpen;
      bar.classList.toggle("show",show);bar.inert=!show;bar.setAttribute("aria-hidden",String(!show));ticking=false
    };
    const schedule=()=>{if(!ticking){ticking=true;requestAnimationFrame(update)}};
    bar.inert=true;bar.setAttribute("aria-hidden","true");
    new IntersectionObserver(entries=>{diagnosticVisible=entries[0].isIntersecting;schedule()}).observe(diagnostic);
    addEventListener("scroll",schedule,{passive:true});addEventListener("resize",schedule,{passive:true});
    const observeConsent=()=>{const panel=document.getElementById("vaa-consent-panel");if(panel)new MutationObserver(schedule).observe(panel,{attributes:true,attributeFilter:["hidden"]});schedule()};
    if(document.readyState==="complete")observeConsent();else document.addEventListener("DOMContentLoaded",observeConsent,{once:true});
    schedule();
  }
  document.querySelectorAll("[data-interest]").forEach(el=>el.addEventListener("click",()=>{
    const interest=el.dataset.interest||"Diagnóstico de presencia digital";
    const input=document.getElementById("interest");
    if(input)input.value=interest;
    const fast=document.querySelector(".v23-fast-whatsapp");
    if(fast)fast.href="https://wa.me/56958039450?text="+encodeURIComponent("Hola, quiero solicitar mi diagnóstico gratuito de Visual Art AI. Estoy consultando por: "+interest+". Mi negocio es: ");
    track("diagnostic_interest",{interest})
  }));
  const form=document.getElementById("diagnosticForm");
  const emailButton=document.getElementById("sendByEmail");
  const status=document.getElementById("formStatus");
  form?.addEventListener("focusin",()=>{if(!form.dataset.started){form.dataset.started="1";track("form_start")}});
  // GitHub Pages does not have a form backend. We only prepare a message for the
  // visitor's chosen application; never claim that the enquiry was delivered.
  const composeRequest=()=>{
    if(!form?.reportValidity())return null;
    const goal=document.getElementById("goal")?.value.trim();
    const situation=document.getElementById("situation")?.value.trim();
    const email=document.getElementById("email")?.value.trim();
    const interest=document.getElementById("interest")?.value||"Diagnóstico de presencia digital";
    if(!goal||!situation||!email)return null;
    const message="Hola, quiero solicitar mi diagnóstico gratuito de Visual Art AI.\n\n"+
      "Interés: "+interest+"\n"+
      "Situación principal: "+goal+"\n"+
      "Negocio / contexto: "+situation+"\n"+
      "Email de contacto: "+email+"\n"+
      "Origen: "+location.href;
    return {goal,interest,message};
  };
  form?.addEventListener("submit",e=>{
    e.preventDefault();
    const data=composeRequest();if(!data)return;
    track("lead_intent",{interest:data.interest,goal:data.goal,channel:"whatsapp"});
    if(status)status.textContent="Abriendo WhatsApp con tu solicitud preparada. Debes pulsar Enviar en WhatsApp para completarla.";
    location.assign("https://wa.me/56958039450?text="+encodeURIComponent(data.message));
  });
  emailButton?.addEventListener("click",()=>{
    const data=composeRequest();if(!data)return;
    track("lead_intent",{interest:data.interest,goal:data.goal,channel:"email"});
    if(status)status.textContent="Abriendo tu aplicación de correo. Revisa el mensaje y pulsa Enviar para completar tu solicitud.";
    location.href="mailto:contacto@deepanalytica.cl?subject="+encodeURIComponent("Solicitud de diagnóstico — Visual Art AI")+"&body="+encodeURIComponent(data.message);
  });
  const article=document.querySelector(".article-page article");if(article){const progress=()=>{const r=article.getBoundingClientRect(),total=Math.max(1,article.offsetHeight-innerHeight),done=Math.min(total,Math.max(0,-r.top));document.documentElement.style.setProperty("--article-progress-scale",String(done/total))};let ticking=false;addEventListener("scroll",()=>{if(!ticking){requestAnimationFrame(()=>{progress();ticking=false});ticking=true}},{passive:true});progress();const aside=document.querySelector(".article-aside"),copy=document.querySelector(".article-copy"),toc=aside?.querySelector(".article-toc");if(copy&&toc){const details=document.createElement("details");details.className="article-mobile-nav";const links=[...toc.querySelectorAll("a")].map(a=>'<a href="'+a.getAttribute("href")+'">'+a.textContent+"</a>").join("");details.innerHTML='<summary><span>EN ESTE ARTÍCULO</span><b>Ver índice</b></summary><nav>'+links+"</nav>";const note=copy.querySelector(".article-note"),firstH2=copy.querySelector("h2");if(note)note.insertAdjacentElement("afterend",details);else if(firstH2)firstH2.insertAdjacentElement("beforebegin",details);else copy.prepend(details)}}
  const filters=[...document.querySelectorAll("[data-blog-filter]")];if(filters.length){const cards=[...document.querySelectorAll(".blog-card[data-category]")];filters.forEach(btn=>btn.addEventListener("click",()=>{const filter=btn.dataset.blogFilter;filters.forEach(b=>b.classList.toggle("is-active",b===btn));cards.forEach(card=>{card.hidden=filter!=="all"&&card.dataset.category!==filter});track("blog_filter",{filter})}))}
})();