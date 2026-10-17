#!/usr/bin/env node
/**
 * Revisión editorial estática del sitio público, orientada a español de Chile.
 * No intenta detectar autores humanos ni «porcentaje de IA».
 * Bloquea contenido roto, afirmaciones de prueba inventadas y plantillas repetidas.
 */
import {readdirSync,readFileSync} from "node:fs";
import {join,relative} from "node:path";
import assert from "node:assert/strict";

const root=join(process.cwd(),"site");
function collect(dir){
  return readdirSync(dir,{withFileTypes:true}).flatMap(x=>{
    const p=join(dir,x.name);
    return x.isDirectory()?collect(p):(x.isFile()&&p.endsWith(".html")?[p]:[]);
  });
}
const files=collect(root).sort();
const articles=files.filter(x=>x.includes("/articulos/"));
const services=files.filter(x=>x.includes("/servicios/")&&!x.endsWith("/servicios/index.html"));
const strip=x=>x.replace(/<[^>]+>/g," ").replace(/&(?:nbsp|amp|quot|hellip);/g," ").replace(/\s+/g," ").trim();
const warnings=[],issues=[],intros=[];
const safe=(condition,message)=>{if(!condition)issues.push(message)};
for(const path of files){
  const name=relative(root,path),html=readFileSync(path,"utf8");
  const h1=[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  safe(h1.length===1,`${name}: se requiere exactamente un H1 (encontrados ${h1.length})`);
  const heads=strip(h1[0]?.[1]||"");
  safe(heads.length>=12,`${name}: el titular no describe el contenido`);
  safe(/<meta name="description" content="[^"]{50,}/.test(html),`${name}: falta metadescripción útil`);
  safe(/<link rel="canonical" href="https:\/\/visualartai\.cl\//.test(html),`${name}: canonical ausente`);
  safe(!/\blorem ipsum\b|\btexto de ejemplo\b|\[needs number\]/i.test(html),`${name}: existe contenido provisional`);
  if(name.startsWith("articulos/")){
    const opening=html.match(/<header class="w">[\s\S]*?<\/div><\/div><p>([\s\S]*?)<\/p><\/header>/);
    const intro=strip(opening?.[1]||"");
    safe(intro.length>115,`${name}: falta introducción específica`);
    intros.push({name,intro});
    safe(!html.includes('<div class="article-note">'),`${name}: aviso genérico duplicado`);
    safe(html.includes('PRUEBA CON TU NEGOCIO'),`${name}: falta comprobación práctica`);
    safe(!html.includes('CÓMO ENTRA VISUAL ART AI'),`${name}: bloque promocional de plantilla`);
    safe(html.includes('"dateModified":"2026-10-17"'),`${name}: fecha editorial desactualizada`);
  }
  if(name.startsWith("servicios/")&&!name.endsWith("/index.html")){
    safe(!html.includes("Estas son señales de que esta capa merece atención"),`${name}: texto de plantilla`);
    safe(!html.includes("Sin humo. <em>Sin garantías inventadas."),`${name}: titular de plantilla`);
  }
  const main=html.match(/<main\b[^>]*>[\s\S]*?<\/main>/i)?.[0]||html;
  const editorial=strip(main);
  const patterns=[
    [/\b(?:soluciones integrales|llevamos tu negocio al siguiente nivel|transformamos tu negocio)\b/ig,"frase comercial vacía"],
    [/\b(?:fricción|recorrido|capa|sistema|prioridad)\b/ig,"jerga repetible: revisar contexto"]
  ];
  for(const [rx,label] of patterns){
    const found=[...editorial.matchAll(rx)];
    if(found.length>10)warnings.push(`${name}: ${found.length} coincidencias de ${label}`);
  }
}
safe(files.length>=35,`El inventario público bajó de 35 páginas a ${files.length}`);
safe(articles.length===20,`Se esperaban 20 artículos; hay ${articles.length}`);
safe(services.length===6,`Se esperaban 6 páginas de servicio; hay ${services.length}`);
const countIntros=new Set(intros.map(x=>x.intro)).size;
safe(countIntros===articles.length,`Introducciones repetidas: ${articles.length-countIntros}`);
const home=readFileSync(join(root,"index.html"),"utf8");
safe(home.includes("¿Es fácil escribirte y pedirte una cotización?"),"El titular del inicio no fue actualizado");
safe(home.includes("¿Cuánto cuesta mejorar tu presencia digital?"),"Falta encabezado claro de precios");
safe(home.includes('id="diagnosticForm"'),"El formulario principal desapareció");
safe(home.includes('id="sendByEmail"'),"Falta alternativa de correo");
console.log(`Páginas públicas: ${files.length}; servicios: ${services.length}; artículos: ${articles.length}`);
console.log(`Introducciones de artículos diferentes: ${countIntros}/${articles.length}`);
for(const msg of warnings.slice(0,20))console.log("ADVERTENCIA:",msg);
if(issues.length){issues.forEach(x=>console.error("ERROR:",x));process.exit(1)}
console.log("OK: estructura, honestidad editorial, etiquetas y contenido mínimo verificados.");
