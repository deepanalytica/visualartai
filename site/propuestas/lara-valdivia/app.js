import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';

const h=React.createElement;
const mockups=[
 {id:'web',label:'Landing web',category:'WEB · CAPTACIÓN',title:'Una portada preparada para inspirar confianza.',description:'Jerarquía clara, especialistas identificables, servicios explicados y llamadas a la acción. El objetivo no es impresionar con efectos: es facilitar la decisión de consultar.',markup:'<div class="mock-browser"><div class="mock-toolbar"><i></i><i></i><i></i></div><div class="mock-web"><header><span>⚖ LARA & VALDIVIA · ABOGADOS</span><small>Inicio &nbsp; Servicios &nbsp; Equipo &nbsp; Contacto</small></header><h3>Su tranquilidad merece una buena defensa.</h3><p>Derecho de familia · Civil · Laboral<br>Talca y atención remota según el caso.</p><span class="mock-cta">Solicitar orientación jurídica ↗</span></div></div>'},
 {id:'redes',label:'Redes sociales',category:'SOCIAL · CONTENIDO',title:'Piezas que educan antes de vender.',description:'Portadas por especialidad, preguntas frecuentes, carruseles y una estructura editorial repetible. El contenido se revisa con los abogados antes de publicar.',markup:'<div class="social-mock"><header>⚖ LARA & VALDIVIA / ABOGADOS</header><div><span style="color:#d0ab6a;font-size:11px;letter-spacing:.15em">DERECHO DE FAMILIA</span><h3>¿Qué considerar antes de iniciar un divorcio?</h3><p>Información general y pasos para preparar una consulta informada.</p></div><footer>GUÍA BREVE · PUBLICACIÓN CONCEPTUAL</footer></div>'},
 {id:'tarjeta',label:'Tarjeta profesional',category:'IDENTIDAD · PAPELERÍA',title:'La misma marca, fuera de la pantalla.',description:'Tarjetas de presentación, credenciales y papelería con especificaciones de impresión, legibilidad y versiones para soportes físicos y digitales.',markup:'<div class="business-card-demo"><div class="biz-card biz-front"><strong>⚖ LARA & VALDIVIA</strong><small>A B O G A D O S</small></div><div class="biz-card biz-back"><strong>Lara & Valdivia</strong><small>Asesoría y representación legal</small><small>Edificio Espacio Talca · Of. 1102</small><small>Talca, Chile</small></div></div>'},
 {id:'documento',label:'Informe jurídico',category:'DOCUMENTOS · IDENTIDAD',title:'Documentos que también transmiten rigor.',description:'Portadas de informes, propuesta de honorarios, hoja membretada, presentación institucional y firmas de correo; plantillas editables sujetas a revisión jurídica.',markup:'<div class="document-mock"><div class="document-head">⚖ Lara & Valdivia<br><small style="font-size:9px">ABOGADOS</small></div><h3>Informe jurídico ejecutivo</h3><p>Antecedentes, análisis y conclusiones.</p><div class="document-lines"><span></span><span></span><span></span><span></span></div><p style="margin-top:30px;color:#957443">TALCA · MODELO CONCEPTUAL</p></div>'}
];
function Gallery(){
 const [active,setActive]=useState(mockups[0].id);
 const item=mockups.find(x=>x.id===active)||mockups[0];
 return h(React.Fragment,null,
   h('div',{className:'tabs',role:'tablist','aria-label':'Aplicaciones del sistema de marca'},mockups.map(m=>h('button',{key:m.id,id:'tab-'+m.id,className:'tab',role:'tab','aria-selected':active===m.id,'aria-controls':'preview-panel',tabIndex:active===m.id?0:-1,onClick:()=>setActive(m.id)},m.label))),
   h('div',{id:'preview-panel',className:'preview-panel',role:'tabpanel','aria-labelledby':'tab-'+item.id},
     h('div',{className:'preview-stage',dangerouslySetInnerHTML:{__html:item.markup}}),
     h('div',{className:'preview-comment'},h('span',null,item.category),h('h4',null,item.title),h('p',null,item.description),h('p',{style:{fontSize:'11px',marginTop:'20px',color:'#7b8590'}},'Boceto de dirección artística. No representa un sitio ya publicado ni fotografías oficiales del equipo.'))
   )
 );
}
const mount=document.getElementById('brand-tabs-root');
if(mount){createRoot(mount).render(h(Gallery));}

function setupCharts(){
 if(!window.Chart){const charts=document.querySelectorAll('.chart-box');charts.forEach(e=>{const p=document.createElement('p');p.textContent='Datos: 218 seguidores, 420 seguidos y 1 publicación. Señales auditadas: 3 verificadas y 3 pendientes.';p.className='chart-footnote';e.appendChild(p)});return;}
 const common={responsive:true,maintainAspectRatio:false,animation:{duration:850},plugins:{legend:{display:false},tooltip:{backgroundColor:'#0b1f39',padding:13,bodyFont:{family:'Manrope'},titleFont:{family:'Manrope',weight:'bold'}}}};
 const social=document.getElementById('chart-social');
 if(social)new window.Chart(social,{type:'bar',data:{labels:['Seguidores','Seguidos','Publicaciones'],datasets:[{label:'Conteo verificado',data:[218,420,1],backgroundColor:['#16314f','#b89561','#798897'],borderRadius:8,maxBarThickness:75}]},options:{...common,scales:{y:{beginAtZero:true,suggestedMax:450,grid:{color:'#e9e8e5'},ticks:{color:'#78818a'}},x:{grid:{display:false},ticks:{color:'#53606b',font:{size:11}}}}}});
 const evidence=document.getElementById('chart-evidence');
 if(evidence)new window.Chart(evidence,{type:'doughnut',data:{labels:['Señales verificadas','Pendientes de validación'],datasets:[{data:[3,3],backgroundColor:['#0b1f39','#d2b17a'],borderColor:['#fff','#fff'],borderWidth:5,hoverOffset:7}]},options:{...common,cutout:'73%',plugins:{...common.plugins,legend:{display:true,position:'bottom',labels:{color:'#525e69',font:{family:'Manrope',size:11},padding:20,usePointStyle:true}}}}});
}
if(document.readyState==='complete'){setupCharts()}else{window.addEventListener('load',setupCharts,{once:true})}

const menu=document.getElementById('menu-toggle'),mobileNav=document.getElementById('mobile-nav');
if(menu&&mobileNav){
 menu.addEventListener('click',()=>{const expanded=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!expanded));mobileNav.hidden=expanded;});
 mobileNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobileNav.hidden=true;menu.setAttribute('aria-expanded','false')}));
}
const progress=document.getElementById('reading-progress');
function updateProgress(){if(!progress)return;const max=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=(max>0?100*window.scrollY/max:0)+'%'}
window.addEventListener('scroll',updateProgress,{passive:true});updateProgress();

if(!matchMedia('(prefers-reduced-motion: reduce)').matches && window.gsap){
 try{
  window.gsap.registerPlugin(window.ScrollTrigger);
  document.body.classList.add('motion-ready');
  window.gsap.utils.toArray('.reveal').forEach(el=>{
   window.gsap.fromTo(el,{opacity:0,y:18},{opacity:1,y:0,duration:.8,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 95%',once:true}});
  });
 }catch(e){document.body.classList.remove('motion-ready')}
}

async function initThree(){
 const canvas=document.getElementById('three-canvas');
 if(!canvas || matchMedia('(prefers-reduced-motion: reduce)').matches || innerWidth<760)return;
 let THREE,renderer;
 try{
  THREE=await import('https://esm.sh/three@0.170.0');
  renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  const parent=canvas.parentElement,scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(42,1,.1,100);camera.position.z=10;
  const group=new THREE.Group();
  const geometry=new THREE.TorusGeometry(3.3,.012,5,150),material=new THREE.MeshBasicMaterial({color:0xdbbb81,transparent:true,opacity:.4});
  for(let i=0;i<4;i++){const mesh=new THREE.Mesh(geometry,material);mesh.rotation.x=i*.38+.6;mesh.rotation.y=i*.48;group.add(mesh)}
  const points=new THREE.Points(new THREE.BufferGeometry(),new THREE.PointsMaterial({color:0xd6b47b,size:.065,transparent:true,opacity:.72}));
  const coords=[];for(let i=0;i<65;i++){const a=i*2.39996;const radius=2.1+Math.sqrt(i/65)*2.1;coords.push(Math.cos(a)*radius,Math.sin(a)*radius,Math.sin(i*2.7)*.8)}
  points.geometry.setAttribute('position',new THREE.Float32BufferAttribute(coords,3));group.add(points);scene.add(group);
  function resize(){const w=parent.clientWidth,h=parent.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;camera.updateProjectionMatrix()}resize();
  const observer=new ResizeObserver(resize);observer.observe(parent);
  let raf=0;const render=()=>{if(document.hidden){raf=requestAnimationFrame(render);return;}group.rotation.y+=.0006;group.rotation.z+=.00025;renderer.render(scene,camera);raf=requestAnimationFrame(render)};render();
  window.addEventListener('pagehide',()=>{cancelAnimationFrame(raf);observer.disconnect();renderer.dispose()},{once:true});
 }catch(e){if(renderer)renderer.dispose();}
}
if('requestIdleCallback' in window){window.requestIdleCallback(initThree,{timeout:1400})}else{setTimeout(initThree,1000)}
