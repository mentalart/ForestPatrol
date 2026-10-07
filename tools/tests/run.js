// Прогон одного сценария: node run.js <index.html> <steps.json>
// шаги: [{code:"...", wait:мс, shot:"имя.png", reload:1, mouse:"x,y", key:"Код"}] (reload — перезагрузить страницу перед шагом, например проверить сохранения); относительные кадры пишутся в tools/tests/shots/ (или в каталог из переменной SHOTS)
const {chromium}=require('./pw');
const path=require('path'),fs=require('fs');
const SHOTS=process.env.SHOTS||path.join(__dirname,'shots');
(async()=>{
  const [,,html,stepsFile]=process.argv;const steps=JSON.parse(fs.readFileSync(stepsFile,'utf8'));
  // final07 рисует через WebGPU: в headless — программный адаптер SwiftShader (Vulkan); ?webgl в URLQ — запасной путь WebGL2
  const gpu=/final0[7-9]|final[1-9]\d/.test(html)||process.env.WEBGPU==='1';
  const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'].concat(gpu?['--enable-unsafe-webgpu','--enable-features=Vulkan','--use-webgpu-adapter=swiftshader']:[])});
  const page=await browser.newPage({viewport:{width:1280,height:720}});
  const logs=[];page.on('console',m=>{if(m.type()!=='log'||!/THREE/.test(m.text()))logs.push(m.type()+': '+m.text());});page.on('pageerror',e=>logs.push('PAGEERROR: '+e.message+'\n'+e.stack));
  // Three.js r128 берётся из vendor/, а не с CDN — тесты работают без интернета
  await page.route('**/three.min.js',r=>r.fulfill({path:path.join(__dirname,'vendor/three.min.js'),contentType:'application/javascript'}));
  // ?debug включает отладочный объект window.ZC (в релизной сборке он есть только с этим параметром)
  // final07 в headless: показ кадра WebGPU на холсте здесь не работает (SwiftShader теряет устройство), поэтому по умолчанию —
  // настоящий WebGPU с кадром в текстуре (&offscreen), перед снимком кадр переносится на холст-подложку (FIN_GPU.blit);
  // бот, которому нужен синхронный WebGL-контекст (gl.readPixels), пишет в заголовке //@@ gpu=gl — для него запасной WebGL2 (медленнее)
  const wantGL=steps.some(s=>s.gpu==='gl'||/readPixels|getContext\(\)/.test(s.code||''))||process.env.WEBGPU==='0';   // боты, читающие пиксели синхронно (gl.readPixels), — сами
  const gq=gpu?(wantGL?'&webgl':'&offscreen'):'';
  await page.goto('file://'+path.resolve(html)+'?debug=1'+gq+(process.env.URLQ||''));   // URLQ='&hq=1' — высокая графика в релизной сборке
  await page.waitForTimeout(1200);
  // STEP_TIMES=1 — время каждого шага: код, ожидание, снимок (что ускорять в долгом боте)
  const ST=process.env.STEP_TIMES==='1';let si=0;
  for(const s of steps){si++;const t0=Date.now();let t1=t0,t2=t0;if(s.reload){await page.reload({waitUntil:'load'});await page.waitForTimeout(1200);}
    if(s.mouse){const [mx,my]=String(s.mouse).split(',').map(Number);await page.mouse.move(mx,my);}   // mouse=x,y — курсор в точку перед шагом (наведение мыши)
    if(s.key){await page.keyboard.press(String(s.key));}   // key=Код — настоящее нажатие клавиши перед шагом (жест пользователя: браузер разрешает звук)
    // gc=1 — перед шагом собрать мусор (CDP) и записать занятую память JS в window.__heap (байты): иначе usedJSHeapSize шумит на десятки МБ (замер утечек)
    if(s.gc){try{const cdp=await page.context().newCDPSession(page);await cdp.send('HeapProfiler.collectGarbage');await cdp.send('HeapProfiler.collectGarbage');const u=await cdp.send('Runtime.getHeapUsage');await page.evaluate(h=>{window.__heap=h;},u.usedSize);await cdp.detach();}catch(e){console.log('GC ERROR',e.message);}}
    if(s.code){try{const r=await page.evaluate(s.code);if(r!==undefined&&r!==null)console.log('>',typeof r==='string'?r:JSON.stringify(r));}catch(e){console.log('EVAL ERROR',e.message);}}
    t1=Date.now();if(s.wait)await page.waitForTimeout(s.wait);t2=Date.now();
    // final07: перед снимком — свежий кадр (под автоматизацией кадры рисуются, только когда GPU закончил предыдущий); в &offscreen — ещё и перенос на холст-подложку
    if(s.shot&&gq&&process.env.NOSHOTS!=='1'){try{await page.evaluate(()=>!window.FIN_GPU||!FIN_GPU.fresh?0:FIN_GPU.offscreen?FIN_GPU.blit():FIN_GPU.fresh());}catch(e){console.log('BLIT ERROR',e.message);}}
    // NOSHOTS=1 — без снимков (CI): снимок — материал для разбора, не проверка, а в программной графике он стоит 20–45 с
    if(s.shot&&process.env.NOSHOTS!=='1'){const p=path.isAbsolute(s.shot)?s.shot:path.join(SHOTS,s.shot);fs.mkdirSync(path.dirname(p),{recursive:true});
      // снимок — материал для разбора, не проверка: на медленной машине (CI, программная графика) не успел — предупреждение, бот идёт дальше
      try{await page.screenshot({path:p,timeout:+(process.env.SHOT_TIMEOUT||45000)});}catch(e){console.log('SHOT SKIPPED '+s.shot+': '+String(e.message).split('\n')[0]);}}
    if(ST)console.log('@step '+si+' code='+((t1-t0)/1000).toFixed(1)+'s wait='+((t2-t1)/1000).toFixed(1)+'s shot='+((Date.now()-t2)/1000).toFixed(1)+'s');}
  if(logs.length)console.log(logs.join('\n'));
  await browser.close();
})();
