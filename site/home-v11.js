/* Visual Art AI — Homepage v14: responsive motion + direct interaction */
(()=>{
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const setText=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v};

  // Lightweight Canvas2D signal field. No GSAP / no Three.js / no external payload.
  const canvas=document.getElementById("v14SignalField");
  if(canvas&&!reduce){
    const ctx=canvas.getContext("2d",{alpha:true});
    let w=0,h=0,dpr=1,raf=0,pointer={x:.72,y:.34,active:false},particles=[];
    const make=()=>Array.from({length:innerWidth<700?18:32},(_,i)=>({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.00012,vy:(Math.random()-.5)*.00012,r:Math.random()*1.7+1,a:Math.random()*.45+.15,phase:Math.random()*6.28}));
    const resize=()=>{const r=canvas.getBoundingClientRect();dpr=Math.min(devicePixelRatio||1,1.75);w=Math.max(1,r.width);h=Math.max(1,r.height);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);particles=make()};
    const draw=t=>{
      ctx.clearRect(0,0,w,h);
      const time=t*.001;
      for(const p of particles){
        p.x+=p.vx*(1+Math.sin(time+p.phase)*.35);p.y+=p.vy*(1+Math.cos(time+p.phase)*.35);
        if(p.x<0)p.x=1;if(p.x>1)p.x=0;if(p.y<0)p.y=1;if(p.y>1)p.y=0;
        if(pointer.active){const dx=pointer.x-p.x,dy=pointer.y-p.y,dist=Math.hypot(dx,dy);if(dist<.22){p.x-=dx*.0007;p.y-=dy*.0007}}
      }
      for(let i=0;i<particles.length;i++){
        const a=particles[i],ax=a.x*w,ay=a.y*h;
        for(let j=i+1;j<particles.length;j++){
          const b=particles[j],bx=b.x*w,by=b.y*h,dist=Math.hypot(ax-bx,ay-by);
          if(dist<130){ctx.strokeStyle="rgba(47,107,255,"+(0.07*(1-dist/130))+")";ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(ax,ay);ctx.lineTo(bx,by);ctx.stroke()}
        }
        const pulse=1+Math.sin(time*1.4+a.phase)*.28;
        ctx.fillStyle=i%7===0?"rgba(242,77,93,"+a.a+")":"rgba(47,107,255,"+a.a+")";ctx.beginPath();ctx.arc(ax,ay,a.r*pulse,0,Math.PI*2);ctx.fill();
      }
      raf=requestAnimationFrame(draw);
    };
    const hero=document.querySelector(".v11-hero");
    hero?.addEventListener("pointermove",e=>{const r=hero.getBoundingClientRect();pointer.x=(e.clientX-r.left)/r.width;pointer.y=(e.clientY-r.top)/r.height;pointer.active=true});
    hero?.addEventListener("pointerleave",()=>pointer.active=false);
    addEventListener("resize",resize,{passive:true});resize();raf=requestAnimationFrame(draw);
    document.addEventListener("visibilitychange",()=>{if(document.hidden){cancelAnimationFrame(raf)}else{raf=requestAnimationFrame(draw)}});
  }

  // Search stories: autoplay on normal motion, explicit pause control always available.
  const queryData=[
    {logo:"brands/google.svg",query:"psicóloga trauma online en Maule",entity:"Psicología · Trauma · Online",label:"QUÉ QUEREMOS LOGRAR",result:"Que una búsqueda correcta termine en una consulta."},
    {logo:"brands/google-maps.svg",query:"kinesiólogo deportivo cerca de mí",entity:"Kinesiología · Deporte · Cercanía",label:"QUÉ QUEREMOS LOGRAR",result:"Que te encuentren por servicio y cercanía y puedan agendar."},
    {logo:"brands/google.svg",query:"clínica estética Talca",entity:"Clínica estética · Talca",label:"QUÉ QUEREMOS LOGRAR",result:"Que entiendan tratamientos, confíen y reserven."},
    {logo:"brands/google-maps.svg",query:"almuerzo casero cerca",entity:"Gastronomía · Menú · Ubicación",label:"QUÉ QUEREMOS LOGRAR",result:"Que vean menú, horario y puedan pedir sin fricción."},
    {logo:"brands/chatgpt.svg",query:"arriendo amoblado mensual en Iquique",entity:"Arriendo · Mensual · Iquique",label:"QUÉ QUEREMOS LOGRAR",result:"Que entiendan disponibilidad, condiciones y puedan reservar."}
  ];
  const queryButtons=[...document.querySelectorAll("[data-query-index]")],play=document.getElementById("v11QueryPlay");
  let qi=0,timer=null,playing=false;
  const showQuery=n=>{
    qi=n;const d=queryData[n];if(!d)return;
    const logo=document.getElementById("v11QueryLogo");if(logo)logo.src=d.logo;
    setText("v11QueryText",d.query);setText("v11SignalEntity",d.entity);setText("v11ResultLabel",d.label);setText("v11ResultTitle",d.result);
    queryButtons.forEach((b,i)=>{const active=i===n;b.classList.toggle("is-active",active);b.setAttribute("aria-pressed",String(active))});
    const scene=document.querySelector(".v11-search-window");
    if(scene&&!reduce)scene.animate([{opacity:.58,transform:"translateY(8px) scale(.992)"},{opacity:1,transform:"none"}],{duration:520,easing:"cubic-bezier(.16,1,.3,1)"});
  };
  const syncPlay=()=>{if(!play)return;play.setAttribute("aria-pressed",String(playing));play.innerHTML=playing?"<svg aria-hidden=\"true\" viewBox=\"0 0 12 12\" width=\"10\" height=\"10\"><path fill=\"currentColor\" d=\"M2 1h3v10H2zM7 1h3v10H7z\"/></svg> Pausar":"<svg aria-hidden=\"true\" viewBox=\"0 0 12 12\" width=\"10\" height=\"10\"><path fill=\"currentColor\" d=\"M2 1l9 5-9 5z\"/></svg> Reproducir";play.setAttribute("aria-label",playing?"Pausar ejemplos automáticos":"Reproducir ejemplos automáticamente")};
  const stop=()=>{playing=false;clearInterval(timer);timer=null;syncPlay()};
  const start=()=>{if(reduce)return;playing=true;clearInterval(timer);timer=setInterval(()=>showQuery((qi+1)%queryData.length),5200);syncPlay()};
  queryButtons.forEach((b,i)=>b.addEventListener("click",()=>{showQuery(i);if(playing)start()}));
  play?.addEventListener("click",()=>playing?stop():start());
  if(!reduce)start();else syncPlay();

  // Problem selector drives both diagnosis and control room.
  const problemData={
    invisible:{code:"VISIBILIDAD",title:"Hay personas buscando tu servicio, pero tu negocio no está apareciendo con suficiente claridad.",text:"Revisamos Google Business, Maps, SEO, contenido y tu web para mejorar dónde apareces y cómo una persona llega a contactarte.",layers:[["Google y Maps","Perfil, categorías, ubicación, servicios y reputación."],["SEO, contenido e IA","Páginas, preguntas reales, entidades y contexto."],["Web y conversión","Landing, CTA, WhatsApp, agenda o formulario."]],first:"Revisar primero cómo te encuentran y dónde se corta la consulta.",interest:"Encontrabilidad",goal:"No aparezco cuando buscan mis servicios",status:"PRIORIDAD: VISIBILIDAD",control:["Google + Maps + SEO","Web + contenido + IA","WhatsApp + agenda + formularios"]},
    traffic:{code:"CONVERSIÓN",title:"La gente llega, pero tu web o tu oferta no están convirtiendo suficiente interés en consultas.",text:"Revisamos mensaje, landing, confianza, CTA y medición para convertir más visitas en oportunidades reales.",layers:[["Oferta y mensaje","Qué vendes, para quién y por qué elegirte."],["Web o landing","Jerarquía, prueba, velocidad y claridad."],["Conversión","CTA, formulario, WhatsApp y medición."]],first:"Arreglar la ruta que recibe el tráfico antes de comprar más.",interest:"Conversión",goal:"Aparezco, pero recibo pocas consultas",status:"PRIORIDAD: CONVERSIÓN",control:["Ads + demanda","Landing + oferta","CTA + medición"]},
    messages:{code:"WHATSAPP / OPERACIÓN",title:"WhatsApp está haciendo trabajo que tu web y tus automatizaciones podrían resolver antes.",text:"Ordenamos la información, capturamos contexto y automatizamos solo lo repetitivo para que las conversaciones humanas lleguen mejor preparadas.",layers:[["Información pública","Precios, horarios, cobertura, condiciones."],["Entrada a WhatsApp","Contexto antes de escribir."],["Automatización","Solo lo estable y repetitivo."]],first:"Reducir preguntas repetidas antes de instalar un bot complejo.",interest:"WhatsApp y automatización",goal:"Quiero saber qué debería mejorar primero",status:"PRIORIDAD: OPERACIÓN",control:["Web + información","WhatsApp + automatización","Seguimiento + datos"]},
    premium:{code:"PERCEPCIÓN Y CONFIANZA",title:"Tu negocio puede ser bueno, pero la web y la marca todavía no lo comunican con suficiente confianza.",text:"Mejoramos diseño, mensaje, jerarquía, casos y señales de autoridad para que la experiencia esté a la altura del servicio.",layers:[["Mensaje","¿La propuesta suena específica y propia?"],["Experiencia","¿La interfaz transmite criterio y orden?"],["Autoridad","¿Hay razones verificables para confiar?"]],first:"Alinear percepción, contenido y experiencia antes de rediseñar por gusto.",interest:"Marca, UX y autoridad",goal:"Mi presencia digital no refleja la calidad de mi trabajo",status:"PRIORIDAD: PERCEPCIÓN",control:["Marca + mensaje","Web + UX","Prueba + contacto"]},
    ai:{code:"GOOGLE / IA",title:"Google y los buscadores de IA todavía tienen pocas señales claras sobre qué haces y cuándo eres relevante.",text:"Trabajamos SEO, contenido, entidades, páginas de servicio y consistencia pública para que tu negocio sea más fácil de entender por buscadores y asistentes de IA.",layers:[["Entidades","Negocio, servicio, persona, ubicación."],["Contenido","Preguntas y páginas con contexto real."],["Consistencia","Web, perfiles y fuentes alineadas."]],first:"Mejorar las señales públicas que sí controlas.",interest:"SEO, GEO y buscadores de IA",goal:"No sé qué información encuentran los asistentes de IA sobre mi negocio",status:"PRIORIDAD: COMPRENSIÓN",control:["SEO + fuentes públicas","Contenido + contexto","Web + contacto"]}
  };
  const problemButtons=[...document.querySelectorAll("[data-problem]")],diagnosis=document.querySelector(".v11-diagnosis"),layers=document.getElementById("v11DiagnosisLayers"),cta=document.getElementById("v11DiagnosisCta");
  const applyProblem=key=>{
    const d=problemData[key];if(!d)return;
    problemButtons.forEach(b=>{const active=b.dataset.problem===key;b.classList.toggle("is-active",active);b.setAttribute("aria-pressed",String(active))});
    setText("v11DiagnosisCode",d.code);setText("v11DiagnosisTitle",d.title);setText("v11DiagnosisText",d.text);setText("v11DiagnosisFirst",d.first);setText("v11ControlStatus",d.status);
    if(layers)layers.innerHTML=d.layers.map((x,i)=>"<div><span>0"+(i+1)+"</span><b>"+x[0]+"</b><small>"+x[1]+"</small></div>").join("");
    if(cta)cta.dataset.interest=d.interest;
    setText("v11ControlA",d.control[0]);setText("v11ControlB",d.control[1]);setText("v11ControlC",d.control[2]);
    const interest=document.getElementById("interest");if(interest)interest.value=d.interest;
    const goal=document.getElementById("goal");if(goal&&[...goal.options].some(o=>o.value===d.goal))goal.value=d.goal;
    if(diagnosis&&!reduce){diagnosis.classList.remove("v14-pop");void diagnosis.offsetWidth;diagnosis.classList.add("v14-pop")}
    document.querySelector(".v14-live-room")?.animate([{filter:"brightness(.92)"},{filter:"brightness(1)"}],{duration:520,easing:"ease-out"});
  };
  problemButtons.forEach(b=>b.addEventListener("click",()=>applyProblem(b.dataset.problem)));

  // Before / after direct manipulation.
  const range=document.getElementById("v11CompareRange"),compare=document.querySelector(".v11-compare");
  if(range&&compare){const update=()=>compare.style.setProperty("--split",range.value+"%");range.addEventListener("input",update);update()}

  // Animate report meters only when they enter view.
  const report=document.querySelector(".v14-report-live");
  if(report){
    if(reduce)report.classList.add("v14-inview");
    else new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("v14-inview")}}),{threshold:.35}).observe(report);
  }

  // Subtle 3D response on pointer devices; disabled on touch/reduced motion.
  if(!reduce&&matchMedia("(hover:hover) and (pointer:fine)").matches){
    document.querySelectorAll(".v11-search-scene,.v11-diagnosis,.v11-compare").forEach(card=>{
      card.addEventListener("pointermove",e=>{const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;card.style.transform="perspective(1100px) rotateX("+(-y*1.25)+"deg) rotateY("+(x*1.5)+"deg) translateY(-2px)"});
      card.addEventListener("pointerleave",()=>card.style.transform="");
    });
  }
  // Record intent only; a click does not confirm a message or a sale.
  document.querySelectorAll("[data-whatsapp]").forEach(link=>link.addEventListener("click",()=>window.VAAI?.track("whatsapp_click")));
})();