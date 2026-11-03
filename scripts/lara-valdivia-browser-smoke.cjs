/* Lara & Valdivia proposal browser QA: runs against the same static /site artifact. */
const assert=require('node:assert/strict');
const {spawn}=require('node:child_process');
const {mkdirSync}=require('node:fs');
const {chromium}=require('playwright');
const server=spawn('python3',['-m','http.server','4184','--directory','site'],{stdio:'ignore'});
const origin='http://127.0.0.1:4184';
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
let browser;
(async()=>{
 let ready=false;for(let i=0;i<30;i++){try{const r=await fetch(origin);if(r.ok){ready=true;break}}catch{}await pause(300)}
 assert(ready,'Server not ready');mkdirSync('qa-screenshots',{recursive:true});
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 for(const width of [320,390,768,1440]){
  const page=await browser.newPage({viewport:{width,height:850}});
  const errors=[];
  page.on('pageerror',e=>errors.push(String(e)));
  await page.goto(origin+'/propuestas/lara-valdivia/',{waitUntil:'domcontentloaded',timeout:35000});
  await page.locator('h1').waitFor();
  assert.equal(await page.locator('h1').count(),1,'Exactly one H1');
  assert(await page.locator('link[href="/styles/tokens.css?v=10"]').count()===1,'Uses production VA semantic tokens');
  assert.equal(await page.locator('.brief-plans').count(),2,'Separate one-time and monthly plans');
  assert.equal(await page.locator('.brief-plans .plan').count(),6,'Six plans');
  assert.equal(await page.locator('.pack-offer').count(),0,'No duplicate price banner');
  assert(await page.locator('body').innerText().then(t=>t.includes('$99.000')&&t.includes('$199.000')&&t.includes('$499.000')),'Affordable plans visible');
  const img=page.locator('.va-brand img');
  assert.equal(await page.locator('.va-brand').getAttribute('href'),'#contenido','Brand returns to proposal');
  assert.equal(await page.locator('a[href="https://visualartai.cl/"]').count(),0,'No link to general site');
  await img.scrollIntoViewIfNeeded();
  assert(await img.evaluate(x=>x.complete&&x.naturalWidth>0),'Visual Art AI logo loaded');
  assert.equal(await page.locator('#diagnostico .brief-findings article').count(),3,'Three diagnostic findings');
  assert((await page.locator('#mensual').innerText()).includes('$349.000'),'Monthly growth price');
  await page.locator('.brief-plans details summary').first().click();
  assert(await page.locator('.brief-plans details').first().evaluate(x=>x.open),'Plan details open');
  try{
   await page.locator('#brand-tabs-root .brand-tab').first().waitFor({timeout:14000});
   await page.locator('#brand-tabs-root .brand-tab').nth(1).click();
   assert((await page.locator('.preview-info h3').innerText()).includes('redes'),'Gallery switches applications');
  }catch(e){throw new Error('Brand gallery not available: '+e.message)}
  const overflow=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));
  assert(overflow.scroll<=overflow.viewport+5,'Horizontal overflow '+JSON.stringify(overflow));
  assert.equal(errors.length,0,'Page JS errors: '+errors.join(','));
  await page.screenshot({path:'qa-screenshots/lara-valdivia-'+width+'.png',fullPage:true,animations:'disabled'});
  await page.close();console.log('Lara & Valdivia proposal QA OK',width,'px');
 }
 const report=await browser.newPage({viewport:{width:390,height:844}});
 await report.goto(origin+'/propuestas/lara-valdivia/informe.html',{waitUntil:'domcontentloaded'});
 assert(await report.locator('#download').count()===1,'Download button');
 assert((await report.locator('#report').innerText()).includes('$99.000'),'New prices in downloadable report');
 assert(await report.locator('.bar img[src="/brands/visual-art-ai-official-light.svg"]').count()===1,'Visual Art AI logo in report');
 assert.equal(await report.locator('.bar > a').getAttribute('href'),'./','Report brand returns to proposal');
 for(const section of ['resumen','introduccion','metodologia','diagnostico','competencia','maps','ia','confianza','marca','recomendaciones','implementacion','medicion','conclusiones','fuentes']) assert.equal(await report.locator('#'+section).count(),1,'Report section '+section);
 await report.close();
 await browser.close();server.kill();
})().catch(e=>{console.error(e);server.kill();if(browser)browser.close().catch(()=>{});process.exit(1)});
