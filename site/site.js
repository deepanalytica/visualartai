try{const saved=localStorage.getItem("visualartai-theme");document.documentElement.dataset.theme=saved||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light")}catch{}
document.getElementById("theme")?.addEventListener("click",()=>{const root=document.documentElement;const next=root.dataset.theme==="dark"?"light":"dark";root.dataset.theme=next;try{localStorage.setItem("visualartai-theme",next)}catch{}});
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
document.querySelectorAll(".section,.final-cta").forEach(el=>el.classList.add("reveal"));
if(reduce){document.querySelectorAll(".reveal").forEach(el=>el.classList.add("in"))}else{const io=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("in");io.unobserve(entry.target)}}),{threshold:.08});document.querySelectorAll(".reveal").forEach(el=>io.observe(el))}
(()=>{const menu=document.getElementById("mobileMenu"),open=document.getElementById("menuBtn"),close=document.getElementById("menuClose");if(!menu||!open||!close)return;const setOpen=value=>{menu.classList.toggle("open",value);menu.setAttribute("aria-hidden",String(!value));open.setAttribute("aria-expanded",String(value));document.body.style.overflow=value?"hidden":""};open.addEventListener("click",()=>setOpen(true));close.addEventListener("click",()=>setOpen(false));menu.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>setOpen(false)));document.addEventListener("keydown",e=>{if(e.key==="Escape")setOpen(false)})})();
(()=>{const bar=document.getElementById("mobileConvert"),diagnostic=document.getElementById("diagnostico");if(!bar||!diagnostic)return;const visible=el=>{const r=el.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0};const update=()=>bar.classList.toggle("show",scrollY>innerHeight*.72&&!visible(diagnostic));addEventListener("scroll",update,{passive:true});update()})();
document.getElementById("diagnosticForm")?.addEventListener("submit",e=>{e.preventDefault();const goal=document.getElementById("goal")?.value.trim(),situation=document.getElementById("situation")?.value.trim(),email=document.getElementById("email")?.value.trim(),interest=document.getElementById("interest")?.value||"Auditoría de presencia digital";if(!goal||!situation||!email)return;const subject=encodeURIComponent("Solicitud de auditoría de presencia digital — Visual Art AI");const body=encodeURIComponent("Interés: "+interest+"\n\nSituación principal: "+goal+"\n\nNegocio / contexto: "+situation+"\n\nEmail de contacto: "+email);location.href="mailto:contacto@deepanalytica.cl?subject="+subject+"&body="+body});
document.querySelectorAll("[data-interest]").forEach(el=>el.addEventListener("click",()=>{const input=document.getElementById("interest");if(input)input.value=el.dataset.interest||"Auditoría de presencia digital"}));
(()=>{const hero=document.querySelector(".hero"),query=document.getElementById("demoQuery");if(!hero||!query)return;const logo=document.getElementById("demoPlatformLogo"),platform=document.getElementById("demoPlatformName"),process=document.getElementById("demoProcess"),c1=document.getElementById("criterion1"),c2=document.getElementById("criterion2"),c3=document.getElementById("criterion3"),name=document.getElementById("resultName"),category=document.getElementById("resultCategory"),d1=document.getElementById("resultDetail1"),d2=document.getElementById("resultDetail2"),d3=document.getElementById("resultDetail3");
const cases=[
{p:"ChatGPT",logo:"brands/chatgpt.svg",q:"“Recomiéndame una psicóloga online especialista en trauma en el Maule.”",process:"Buscando y comparando información relevante…",criteria:["Especialidad","Ubicación","Atención online"],name:"Jessica",category:"Psicología · Trauma · EMDR",details:["Atención online","Información profesional","Sitio web disponible"]},
{p:"Google",logo:"brands/google.svg",q:"“pediatra recomendado en Talca”",process:"Buscando y comparando resultados relevantes…",criteria:["Especialidad","Ubicación","Información pública"],name:"Profesional relevante",category:"Pediatría · Talca",details:["Especialidad identificable","Ubicación disponible","Información de contacto"]},
{p:"Google Maps",logo:"brands/google-maps.svg",q:"“panadería artesanal cerca de mí”",process:"Buscando negocios cercanos con información relevante…",criteria:["Cercanía","Categoría","Información local"],name:"Negocio local relevante",category:"Panadería artesanal",details:["Ubicación disponible","Categoría clara","Canal de contacto"]},
{p:"Gemini",logo:"brands/gemini.svg",q:"“¿Qué kinesiólogo recomiendas para rehabilitación deportiva?”",process:"Buscando y comparando profesionales relevantes…",criteria:["Especialidad","Servicios","Ubicación"],name:"Profesional relevante",category:"Kinesiología · Rehabilitación",details:["Especialidad clara","Servicios disponibles","Información profesional"]},
{p:"Perplexity",logo:"brands/perplexity.svg",q:"“¿Dónde encuentro almuerzo casero en Curicó?”",process:"Buscando opciones y contrastando información disponible…",criteria:["Ubicación","Categoría","Información pública"],name:"Negocio local relevante",category:"Gastronomía · Curicó",details:["Ubicación disponible","Oferta identificable","Información de contacto"]}];
let i=0;const apply=x=>{platform.textContent=x.p;logo.src=x.logo;query.textContent=x.q;process.textContent=x.process;c1.textContent=x.criteria[0];c2.textContent=x.criteria[1];c3.textContent=x.criteria[2];name.textContent=x.name;category.textContent=x.category;d1.textContent=x.details[0];d2.textContent=x.details[1];d3.textContent=x.details[2]};const phase=p=>{hero.classList.remove("phase-search","phase-compare","phase-result");hero.classList.add("phase-"+p)};apply(cases[0]);if(reduce){phase("result");return}const cycle=()=>{phase("search");setTimeout(()=>phase("compare"),1500);setTimeout(()=>phase("result"),3700);setTimeout(()=>{i=(i+1)%cases.length;apply(cases[i]);phase("search")},8500)};cycle();setInterval(cycle,9500)})();
if(document.documentElement.classList.contains("article-page")){const updateProgress=()=>{const max=document.documentElement.scrollHeight-innerHeight;const scale=max>0?Math.min(1,Math.max(0,scrollY/max)):0;document.documentElement.style.setProperty("--article-progress-scale",String(scale))};addEventListener("scroll",updateProgress,{passive:true});updateProgress()}
document.querySelectorAll(".offer-expand").forEach(detail=>{
  detail.addEventListener("toggle",()=>{
    if(!detail.open)return;
    document.querySelectorAll(".offer-expand").forEach(other=>{if(other!==detail)other.open=false});
  });
});
const serviceData={
  local:{eyebrow:"GOOGLE + MAPS",title:"Que aparezcas cuando buscan cerca.",code:"LOCAL SIGNAL",query:"“panadería artesanal cerca de mí”",platform:"Maps",problem:"Tu ficha existe, pero categoría, servicios, web y contacto no cuentan una historia clara.",actions:["Perfil y categorías","Ubicación y servicios","Reseñas y evidencia","Ruta de contacto"],benefit:"Que una búsqueda local tenga una ruta clara desde el resultado hasta el contacto.",note:"No prometemos una posición concreta. Mejoramos claridad, consistencia y experiencia para reducir fricción.",interest:"Google y Maps"},
  ai:{eyebrow:"SEO + GEO + IA",title:"Que los sistemas entiendan qué haces.",code:"ENTITY SIGNAL",query:"“¿qué psicóloga online trabaja trauma en Maule?”",platform:"IA + Google",problem:"Tu experiencia existe, pero la información pública está dispersa o escrita de forma demasiado genérica.",actions:["Arquitectura SEO","Páginas de servicio","Entidades y contexto","FAQs verificables"],benefit:"Que una persona o sistema pueda identificar con menos ambigüedad quién eres, qué haces y cuándo eres relevante.",note:"No se puede garantizar una recomendación de ChatGPT, Gemini u otro asistente. Sí podemos mejorar las señales públicas que describen tu negocio.",interest:"SEO y visibilidad en buscadores de IA"},
  web:{eyebrow:"WEB + UX",title:"Que una persona entienda tu oferta en segundos.",code:"CLARITY SIGNAL",query:"“entré a tu web… ¿qué haces exactamente?”",platform:"Web",problem:"La web se ve correcta, pero obliga a leer demasiado o adivinar qué servicio corresponde.",actions:["Propuesta de valor","Jerarquía visual","Páginas de servicio","Responsive"],benefit:"Que el visitante entienda rápido qué haces, para quién y cuál es el siguiente paso.",note:"Diseño y copy trabajan juntos. Una animación no compensa una oferta difícil de entender.",interest:"Web o landing page"},
  trust:{eyebrow:"AUTORIDAD",title:"Que existan razones para confiar.",code:"TRUST SIGNAL",query:"“¿por qué debería elegir este negocio?”",platform:"Web + Google",problem:"Hay buenas credenciales o experiencia, pero están escondidas, dispersas o sin suficiente contexto.",actions:["Casos reales","Experiencia","Reseñas auténticas","Evidencia verificable"],benefit:"Que la confianza se construya con información concreta, no con frases grandilocuentes.",note:"No inventamos cifras, premios ni testimonios. La autoridad útil debe poder sostenerse.",interest:"Autoridad y confianza digital"},
  conversion:{eyebrow:"CONVERSIÓN",title:"Que mirar termine en una acción clara.",code:"ACTION SIGNAL",query:"“me interesa… ¿qué hago ahora?”",platform:"Web + WhatsApp",problem:"La persona entiende el servicio, pero el siguiente paso está escondido, es largo o vuelve a empezar desde cero.",actions:["CTA claros","WhatsApp","Agenda","Formularios"],benefit:"Reducir pasos innecesarios entre el interés y una consulta real.",note:"Conversión no significa presionar. Significa hacer más fácil avanzar cuando la persona ya quiere hacerlo.",interest:"Conversión y captación"},
  data:{eyebrow:"ANALÍTICA",title:"Que sepas qué está funcionando.",code:"DATA SIGNAL",query:"“¿de dónde vienen mis consultas?”",platform:"GA4 + negocio",problem:"Hay tráfico, publicaciones y campañas, pero no una lectura clara de qué genera consultas.",actions:["Eventos clave","Fuentes de tráfico","Conversiones","Prioridades"],benefit:"Tomar decisiones con señales observables en vez de depender solo de intuición.",note:"Medir más no siempre es mejor. Medimos lo necesario para decidir qué conviene cambiar.",interest:"Analítica y optimización"}
};
document.querySelectorAll(".service-tab").forEach(tab=>{
  tab.addEventListener("click",()=>{
    const data=serviceData[tab.dataset.service];if(!data)return;
    document.querySelectorAll(".service-tab").forEach(t=>{t.classList.toggle("is-active",t===tab);t.setAttribute("aria-selected",String(t===tab))});
    const set=(id,value)=>{const el=document.getElementById(id);if(el)el.textContent=value};
    set("serviceEyebrow",data.eyebrow);set("serviceTitle",data.title);set("serviceCode",data.code);set("serviceQuery",data.query);set("servicePlatform",data.platform);set("serviceProblem",data.problem);set("serviceBenefit",data.benefit);set("serviceNote",data.note);
    const actions=document.getElementById("serviceActions");if(actions)actions.innerHTML=data.actions.map(x=>"<i>"+x+"</i>").join("");
    const cta=document.getElementById("serviceCta");if(cta)cta.dataset.interest=data.interest;
  });
});

const caseButtons=[...document.querySelectorAll("[data-case-mode]")];
caseButtons.forEach(btn=>btn.addEventListener("click",()=>{
  const mode=btn.dataset.caseMode;
  caseButtons.forEach(b=>{const active=b===btn;b.classList.toggle("is-active",active);b.setAttribute("aria-pressed",String(active))});
  document.querySelectorAll(".case-view").forEach(view=>view.classList.toggle("is-active",view.classList.contains(mode+"-view")));
}));

(()=>{
  const path=document.getElementById("opportunityPath"),bar=document.getElementById("pathProgress");
  if(!path||!bar)return;
  const steps=[...path.querySelectorAll("[data-path-step]")];let i=0;
  const activate=n=>{steps.forEach((s,idx)=>s.classList.toggle("is-active",idx===n));bar.style.width=((n+1)/steps.length*100)+"%"};
  activate(0);
  if(reduce)return;
  setInterval(()=>{i=(i+1)%steps.length;activate(i)},2200);
})();

(()=>{
  const q=document.getElementById("pulseQuery"),s=document.getElementById("pulseSource");if(!q||!s)return;
  const items=[
    ["“psicóloga trauma online en Maule”","ChatGPT"],
    ["“panadería artesanal cerca de mí”","Google Maps"],
    ["“kinesiólogo rehabilitación deportiva Talca”","Google"],
    ["“arriendo amoblado mensual en Iquique”","Gemini"],
    ["“almuerzo casero en Curicó”","Perplexity"]
  ];
  let i=0;if(reduce)return;
  setInterval(()=>{i=(i+1)%items.length;q.animate([{opacity:.15,transform:"translateY(5px)"},{opacity:1,transform:"none"}],{duration:320,easing:"ease-out"});q.textContent=items[i][0];s.textContent=items[i][1]},2800);
})();
