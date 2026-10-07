// Лаборатория: открыть патченый релиз, подключить телеметрию и персон, выполнить JS из файла; печатает результат.
//   node tools/playtest/lab.js код.js [--no-persona]
const {chromium}=require('../tests/pw');
const path=require('path'),fs=require('fs');
(async()=>{
  const codeFile=process.argv[2];
  const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  const page=await browser.newPage({viewport:{width:960,height:540}});
  const logs=[];page.on('console',m=>{if(m.type()!=='log'||!/THREE/.test(m.text()))logs.push(m.type()+': '+m.text());});page.on('pageerror',e=>logs.push('PAGEERROR: '+e.message));
  await page.route('**/three.min.js',r=>r.fulfill({path:path.join(__dirname,'..','tests','vendor/three.min.js'),contentType:'application/javascript'}));
  await page.goto('file://'+path.join(__dirname,'out','pt_build.html')+'?debug=1');
  await page.waitForTimeout(1200);
  await page.evaluate(fs.readFileSync(path.join(__dirname,'..','tests','helpers.js'),'utf8'));
  for(const f of ['pt_scope.js','pt_persona.js'])await page.evaluate(code=>{ZC.X(code);},fs.readFileSync(path.join(__dirname,f),'utf8'));
  const t0=Date.now();
  try{const r=await page.evaluate(fs.readFileSync(codeFile,'utf8'));console.log(typeof r==='string'?r:JSON.stringify(r,null,1));}catch(e){console.log('EVAL ERROR',e.message);}
  console.log('elapsed',((Date.now()-t0)/1000).toFixed(1)+'s');
  if(logs.length)console.log(logs.slice(0,12).join('\n'));
  await browser.close();
})();
