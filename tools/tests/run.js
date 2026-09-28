// Прогон одного сценария: node run.js <index.html> <steps.json>
// шаги: [{code:"...", wait:мс, shot:"имя.png"}]; относительные кадры пишутся в tools/tests/shots/ (или в каталог из переменной SHOTS)
const {chromium}=require('./pw');
const path=require('path'),fs=require('fs');
const SHOTS=process.env.SHOTS||path.join(__dirname,'shots');
(async()=>{
  const [,,html,stepsFile]=process.argv;const steps=JSON.parse(fs.readFileSync(stepsFile,'utf8'));
  const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  const page=await browser.newPage({viewport:{width:1280,height:720}});
  const logs=[];page.on('console',m=>{if(m.type()!=='log'||!/THREE/.test(m.text()))logs.push(m.type()+': '+m.text());});page.on('pageerror',e=>logs.push('PAGEERROR: '+e.message+'\n'+e.stack));
  // Three.js r128 берётся из vendor/, а не с CDN — тесты работают без интернета
  await page.route('**/three.min.js',r=>r.fulfill({path:path.join(__dirname,'vendor/three.min.js'),contentType:'application/javascript'}));
  await page.goto('file://'+path.resolve(html));await page.waitForTimeout(1200);
  for(const s of steps){if(s.code){try{const r=await page.evaluate(s.code);if(r!==undefined&&r!==null)console.log('>',typeof r==='string'?r:JSON.stringify(r));}catch(e){console.log('EVAL ERROR',e.message);}}
    if(s.wait)await page.waitForTimeout(s.wait);
    if(s.shot){const p=path.isAbsolute(s.shot)?s.shot:path.join(SHOTS,s.shot);fs.mkdirSync(path.dirname(p),{recursive:true});await page.screenshot({path:p});}}
  if(logs.length)console.log(logs.join('\n'));
  await browser.close();
})();
