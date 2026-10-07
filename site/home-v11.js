/* Visual Art AI — Homepage v14: responsive motion + direct interaction */
(()=>{
  const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  const setText=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v};

  // Lightweight Canvas2D signal field. No GSAP / no Three.js / no external payload.
  const canvas=document.getElementById("v14SignalField");
  if(canvas&&!reduce&&"ResizeObserver" in window){
    const ctx=canvas.getContext("2d",{alpha:true});
    let w=0,h=0,dpr=1,raf=0,pointer={x:.72,y:.34,active:false},particles=[];
    const make=()=>Array.from({length:innerWidth<700?18:32},(_,i)=>({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.00012,vy:(Math.random()-.5)*.00012,r:Math.random()*1.7+1,a:Math.random()*.45+.15,phase:Math.random()*6.28}));
    const resize=r=>{dpr=Math.min(devicePixelRatio||1,1.75);w=Math.max(1,r.width);h=Math.max(1,r.height);canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);particles=make()};
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
    new ResizeObserver(entries=>{resize(entries[0].contentRect);if(!raf&&!document.hidden)raf=requestAnimationFrame(draw)}).observe(canvas);
    document.addEventListener("visibilitychange",()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0}else if(w&&h&&!raf){raf=requestAnimationFrame(draw)}});
  }

  // Six illustrative questions remain visible; focus advances without inventing results.
  const queryData=["Una búsqueda local necesita servicios, ubicación y una vía de contacto claros.","Una especialidad como trauma complejo debe explicarse con claridad en la web.","En arriendos por días importan disponibilidad, condiciones y una respuesta fácil.","Servicio y ciudad ayudan a encontrar a un kinesiólogo relevante.","Tratamientos, ubicación y confianza orientan la consulta a una clínica.","Una página clara puede explicar ortodoncia, ciudad y cómo pedir una hora."];
  const queryButtons=[...document.querySelectorAll("[data-query-index]")],play=document.getElementById("v11QueryPlay");
  let qi=0,timer=null,playing=false;
  const showQuery=n=>{qi=n;const result=queryData[n];if(!result)return;setText("v11ResultTitle",result);setText("v20QueryCount",String(n+1).padStart(2,"0")+" / 06");queryButtons.forEach((b,i)=>{const active=i===n;b.classList.toggle("is-active",active);b.setAttribute("aria-pressed",String(active))})};
  const syncPlay=()=>{if(!play)return;play.textContent=playing?"Pausar":"Reproducir";play.setAttribute("aria-pressed",String(playing));play.setAttribute("aria-label",playing?"Pausar la secuencia de ejemplos":"Reproducir la secuencia de ejemplos")};
  const stop=()=>{playing=false;clearInterval(timer);timer=null;syncPlay()};
  const start=()=>{if(reduce)return;playing=true;clearInterval(timer);timer=setInterval(()=>showQuery((qi+1)%queryData.length),3800);syncPlay()};
  queryButtons.forEach((b,i)=>b.addEventListener("click",()=>{showQuery(i);if(playing)start()}));
  play?.addEventListener("click",()=>playing?stop():start());
  if(!reduce)start();else if(play)play.hidden=true;

  // Three problems map to a concrete service and inquiry context.
  const problemData={"invisible":{"code":"VISIBILIDAD","title":"SEO local y Google Maps","text":"Ordenamos tu perfil y tus páginas para que expliquen qué haces y dónde atiendes.","layers":[["Perfil de Google optimizado"],["Páginas de servicio claras"],["Contacto fácil de encontrar"]],"interest":"SEO local y Google Maps","goal":"No aparezco cuando buscan mis servicios","photo":"restaurant","photoCaption":"Dueña de restaurante · imagen ilustrativa","photoAlt":"Imagen ilustrativa de la dueña de un restaurante de comida casera revisando su teléfono"},"traffic":{"code":"DISEÑO WEB","title":"Una web que facilita la consulta","text":"Diseñamos o mejoramos tu página para presentar tu servicio y llevar a la persona al contacto.","layers":[["Oferta y textos claros"],["Diseño adaptable a móviles"],["WhatsApp o formulario visible"]],"interest":"Web y conversión","goal":"Aparezco, pero recibo pocas consultas","photo":"kinesiology","photoCaption":"Kinesiólogo · imagen ilustrativa","photoAlt":"Imagen ilustrativa de un kinesiólogo en su consulta pensando frente a un computador"},"messages":{"code":"WHATSAPP","title":"Atención y seguimiento ordenados","text":"Preparamos respuestas y un recorrido de atención para que cada consulta tenga un siguiente paso.","layers":[["Preguntas y respuestas frecuentes"],["Contexto antes de cotizar"],["Seguimiento de oportunidades"]],"interest":"WhatsApp y automatización","goal":"Quiero saber qué debería mejorar primero","photo":"rental","photoCaption":"Anfitriona de arriendos · imagen ilustrativa","photoAlt":"Imagen ilustrativa de una anfitriona de arriendos por días revisando su teléfono"}};
  const problemButtons=[...document.querySelectorAll("[data-problem]")],diagnosis=document.querySelector(".v11-diagnosis"),layers=document.getElementById("v11DiagnosisLayers"),cta=document.getElementById("v11DiagnosisCta");
  let diagnosisAnimation=null;
  const applyProblem=key=>{
    const d=problemData[key];if(!d)return;
    problemButtons.forEach(b=>{const active=b.dataset.problem===key;b.classList.toggle("is-active",active);b.setAttribute("aria-pressed",String(active))});
    setText("v11DiagnosisCode",d.code);setText("v11DiagnosisTitle",d.title);setText("v11DiagnosisText",d.text);setText("v20PhotoCaption",d.photoCaption);
    const photo=document.getElementById("v20ProPhoto");if(photo){photo.dataset.photo=d.photo;photo.setAttribute("aria-label",d.photoAlt)}
    if(layers)layers.innerHTML=d.layers.map(x=>"<div><b>"+x[0]+"</b></div>").join("");
    if(cta)cta.dataset.interest=d.interest;
    const interest=document.getElementById("interest");if(interest)interest.value=d.interest;
    const goal=document.getElementById("goal");if(goal&&[...goal.options].some(o=>o.value===d.goal))goal.value=d.goal;
    if(diagnosis&&!reduce){diagnosisAnimation?.cancel();diagnosisAnimation=diagnosis.animate([{opacity:.58,transform:"translateY(8px) scale(.994)"},{opacity:1,transform:"none"}],{duration:480,easing:"cubic-bezier(.2,0,0,1)"})}
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