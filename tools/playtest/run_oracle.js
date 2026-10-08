// Прогон существующего бота уровня («оракула», идеальная игра) на патченом релизе с телеметрией.
//   node tools/playtest/run_oracle.js <бот> [выходной.json]
// Бот берётся из tools/tests/bots/<бот>.js, шаги — как в run_one.sh (mk.py). Результат: события PT.ev + итог бота.
const {chromium}=require('../tests/pw');
const path=require('path'),fs=require('fs'),cp=require('child_process');
const HERE=__dirname,TESTS=path.join(HERE,'..','tests');
(async()=>{
  const bot=process.argv[2].replace(/\.js$/,''),outFile=process.argv[3]||path.join(HERE,'out','oracle',bot+'.json');
  const stepsFile=path.join(HERE,'out','steps_'+bot+'.json');fs.mkdirSync(path.dirname(stepsFile),{recursive:true});fs.mkdirSync(path.dirname(outFile),{recursive:true});
  cp.execFileSync('python3',[path.join(TESTS,'mk.py'),path.join(TESTS,'bots',bot+'.js'),stepsFile]);
  const steps=JSON.parse(fs.readFileSync(stepsFile,'utf8'));
  const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  const page=await browser.newPage({viewport:{width:1280,height:720}});
  const logs=[];page.on('console',m=>{if(m.type()!=='log'||!/THREE/.test(m.text()))logs.push(m.type()+': '+m.text());});page.on('pageerror',e=>logs.push('PAGEERROR: '+e.message));
  await page.route('**/three.min.js',r=>r.fulfill({path:path.join(TESTS,'vendor/three.min.js'),contentType:'application/javascript'}));
  await page.goto('file://'+path.join(HERE,'out','pt_build.html')+'?debug=1');
  await page.waitForTimeout(1200);
  await page.evaluate(code=>{ZC.X(code);},fs.readFileSync(path.join(HERE,'pt_scope.js'),'utf8'));
  const res=[];const t0=Date.now();
  for(const s of steps){if(!s.code)continue;try{const r=await page.evaluate(s.code);if(r!==undefined&&r!==null)res.push(typeof r==='string'?r:JSON.stringify(r));}catch(e){res.push('EVAL ERROR '+e.message);}
    if(s.wait)await page.waitForTimeout(s.wait);}
  const ev=await page.evaluate(()=>PT.ev),clock=await page.evaluate(()=>[PT.clock,PT.cineT]);
  fs.writeFileSync(outFile,JSON.stringify({bot,wall:(Date.now()-t0)/1000,clock:clock[0],cineT:clock[1],result:res.slice(-3),errors:logs.slice(0,10),ev}));
  console.log(bot,'wall',((Date.now()-t0)/1000).toFixed(1)+'s sim',clock[0].toFixed(0)+'s cine',clock[1].toFixed(0)+'s ev',ev.length,'last:',(res[res.length-1]||'').slice(0,100));
  await browser.close();
})();
