import {readFile,writeFile,readdir} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const fonts=await readFile(resolve(root,'site/styles/fonts.css'),'utf8');
const preload=['manrope-normal-400-800-latin.a30ddcd34970.woff2','instrument-serif-italic-400-latin.5a51946dfffa.woff2'];
const homepage='<!-- Local fonts: start -->\n'+preload.map(file=>'<link rel="preload" href="/fonts/'+file+'" as="font" type="font/woff2" crossorigin>').join('\n')+'\n<style>\n'+fonts+'</style>\n<!-- Local fonts: end -->';
let changed=0;
async function walk(dir){for(const entry of await readdir(dir,{withFileTypes:true})){const file=resolve(dir,entry.name);if(entry.isDirectory()){await walk(file);continue;}if(!file.endsWith('.html'))continue;let html=await readFile(file,'utf8');const previous=html;
const google=/<link\b[^>]*href=["']https:\/\/fonts.googleapis.com\/css2[^>]*>/g;
const preconnect=/<link\b[^>]*rel=["']preconnect["'][^>]*href=["']https:\/\/fonts.(googleapis|gstatic).com[^>]*>\s*/g;
if(file===resolve(root,'site/index.html')){if(html.includes('<!-- Local fonts: start -->'))html=html.replace(/<!-- Local fonts: start -->[\s\S]*?<!-- Local fonts: end -->/,homepage);else html=html.replace(google,homepage);}else html=html.replace(google,'<link rel="stylesheet" href="/styles/fonts.css?v=1">');html=html.replace(preconnect,'');html=html.replaceAll('site.js?v=12','site.js?v=13');if(html!==previous){await writeFile(file,html);changed++;}}}
await walk(resolve(root,'site'));console.log('Font loading updated in '+changed+' HTML files.');
