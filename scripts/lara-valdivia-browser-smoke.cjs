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
  assert.equal(await page.locator('.plans .plan').count(),3,'Three commercial plans');
  assert(await page.locator('body').innerText().then(t=>t.includes('$99.000')&&t.includes('$199.000')&&t.includes('$499.000')),'Affordable plans visible');
  const img=page.locator('.case-brand img');
  await img.scrollIntoViewIfNeeded();
  assert(await img.evaluate(x=>x.complete&&x.naturalWidth>0),'Visual Art AI logo loaded');
  await page.locator('.query-tab[data-query="laboral"]').click();
  assert((await page.locator('#query-text').innerText()).includes('laboral'),'Search query switches');
  await page.locator('.dash-tab[data-target="panel-competencia"]').click();
  assert(await page.locator('#panel-competencia').isVisible(),'Competitor dashboard works');
  await page.locator('.dash-tab[data-target="panel-brecha"]').click();
  assert(await page.locator('#panel-brecha').isVisible(),'Gap dashboard works');
  await page.locator('.dash-tab[data-target="panel-alcance"]').click();
  assert(await page.locator('#panel-alcance').isVisible(),'Presence dashboard works');
  try{
   await page.locator('#brand-tabs-root .brand-tab').first().waitFor({timeout:14000});
   await page.locator('#brand-tabs-root .brand-tab').nth(1).click();
   assert((await page.locator('.preview-info h3').innerText()).includes('Contenido'),'React gallery works');
  }catch(e){throw new Error('React brand gallery not available: '+e.message)}
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
 await report.close();
 await browser.close();server.kill();
})().catch(e=>{console.error(e);server.kill();if(browser)browser.close().catch(()=>{});process.exit(1)});
