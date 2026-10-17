#!/usr/bin/env node
/**
 * SEO discovery audit for the static public website.
 * No claims about actual indexing, traffic or AI recommendations.
 */
import {readFileSync, existsSync, readdirSync} from "node:fs";
import {join} from "node:path";
import assert from "node:assert/strict";
const root=join(process.cwd(),"site"),read=p=>readFileSync(join(root,p),"utf8");
const slugs=[
"google-maps-gratis-que-cobra-agencia",
"psicologa-online-google-maps-requisitos",
"medir-consultas-google-whatsapp-anuncios",
"conseguir-clientes-negocio-chile-sin-publicidad",
"comprobar-web-google-search-console",
"cuanto-cuesta-marketing-digital-chile"
];
const articles=readdirSync(join(root,"articulos")).filter(x=>x.endsWith(".html"));
assert.equal(articles.length,26,"El blog debe contener 26 guías publicadas");
const blog=read("blog/index.html"),sitemap=read("sitemap.xml"),rss=read("feed.xml"),home=read("index.html"),maps=read("servicios/seo-google-maps.html"),robots=read("robots.txt");
const jsonData=s=>{const found=[...s.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];assert(found.length>0,"Faltan datos JSON-LD");return found.map(x=>JSON.parse(x[1]));};
const blogData=jsonData(blog)[0];
const entries=blogData["@graph"].find(x=>x["@type"]==="ItemList").itemListElement;
assert.equal(entries.length,26,"El ItemList del blog debe incluir 26 artículos");
assert.equal(new Set(entries.map(x=>x.url)).size,26,"No duplicar URLs en el ItemList");
const listed=entries.map(x=>x.url);
assert.equal((blog.match(/class="blog-card"/g)||[]).length,26,"Todas las guías necesitan una tarjeta navegable");
assert.match(blog,/26 guías/i,"Falta actualizar el contador del blog");
assert.match(rss,/<rss version="2\.0">/,"Feed RSS debe ser legible");
assert.equal((rss.match(/<item>/g)||[]).length,26,"RSS necesita todos los artículos");
assert.match(sitemap,/<urlset\b/,"Sitemap debe ser XML reconocible");
assert.match(robots,/Sitemap: https:\/\/visualartai\.cl\/sitemap\.xml/);
const mapFaq=jsonData(maps)[0]["@graph"].find(x=>x["@type"]==="FAQPage").mainEntity;
assert(mapFaq.some(q=>q.name.includes("exclusivamente online")&&q.acceptedAnswer.text.includes("no")),"No ofrecer Maps a negocios exclusivamente online");
assert(mapFaq.some(q=>q.name.includes("gratis")),"Informar que la ficha es gratuita");
assert(maps.includes("No cobramos por el derecho a aparecer en Maps"),"Falta transparencia comercial");
for(const slug of slugs){
  const path="articulos/"+slug+".html",url="https://visualartai.cl/"+path;
  assert(existsSync(join(root,path)),"Artículo no publicado: "+slug);
  const html=read(path),structured=jsonData(html)[0]["@graph"];
  const post=structured.find(x=>x["@type"]==="BlogPosting");
  assert(post,"Falta BlogPosting en "+path);
  assert.equal(post.mainEntityOfPage["@id"],url,"Schema inconsistente: "+path);
  assert.equal(post.datePublished,"2026-10-17");
  assert.equal(post.dateModified,"2026-10-17");
  assert.equal(post.author.name,"Visual Art AI");
  assert.equal((html.match(/<h1\b/g)||[]).length,1,"Un solo H1: "+path);
  assert(html.includes('<link rel="canonical" href="'+url+'"'),"Canonical erróneo: "+path);
  assert(html.includes('name="description"'),"Metadescripción ausente: "+path);
  assert(html.includes('class="source-list"'),"Referencias necesarias: "+path);
  assert(html.includes('PRUEBA CON TU NEGOCIO'),"Falta ejercicio práctico: "+path);
  assert(html.includes('href="../index.html#diagnostico"'),"Falta CTA: "+path);
  assert(listed.includes(url),"No aparece en el índice semántico: "+path);
  assert(blog.includes('href="../'+path+'"'),"No aparece en el blog: "+path);
  assert(sitemap.includes('<loc>'+url+'</loc>'),"No aparece en sitemap: "+path);
  assert(rss.includes('<link>'+url+'</link>'),"No aparece en RSS: "+path);
  assert((html.match(/<h2\b/g)||[]).length>=7,"Artículo insuficientemente desarrollado: "+path);
}
const siteSchema=jsonData(home)[0]["@graph"];
const org=siteSchema.find(x=>x["@type"]==="Organization");
const web=siteSchema.find(x=>x["@type"]==="WebSite");
const service=siteSchema.find(x=>x["@type"]==="Service");
assert(org&&web&&service,"La portada debe describir empresa, web y servicio");
assert.equal(org["@id"],"https://visualartai.cl/#organization");
assert(org.description.includes("pymes y profesionales de Chile"),"La organización debe indicar público atendido");
assert(service.description.includes("WhatsApp"),"El servicio debe explicar canales reales");
assert(!/garantiza(?:mos)? (?:estar|salir|aparecer) (?:primero|en ChatGPT)/i.test(org.description),"Sin promesas de IA");
console.log("✓ SEO Discovery: 26 artículos; 6 nuevos; blog, RSS, sitemap, JSON-LD, políticas de Maps y enlaces internos verificados.");
