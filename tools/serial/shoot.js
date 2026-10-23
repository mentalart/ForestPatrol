// Съёмка серии мультсериала кадр за кадром (вертикаль 9:16) из съёмочной сборки tools/serial/out/serial.html.
//   node tools/serial/shoot.js --ep 1 [--out DIR] [--fps 24] [--size 720x1280] [--preview] [--only id,id] [--part k/n]
// Каждый сегмент серии пишется в DIR/<nn>_<id>/%05d.jpg, рядом — snd.json (звуки, музыка, голоса со временем от начала сегмента) и meta.json.
// Готовые сегменты пропускаются (съёмку можно прерывать); --only — переснять; --part k/n — каждый n-й сегмент (несколько процессов).
// --preview — 3 кадра в секунду в 360×640 (проверка постановки). Звук — tools/serial/audio.js, склейка — tools/serial/encode.sh.
const {chromium}=require('../tests/pw');const path=require('path'),fs=require('fs');
const arg=(k,d)=>{const i=process.argv.indexOf(k);return i<0?d:process.argv[i+1];};const has=k=>process.argv.includes(k);
const EP=+arg('--ep',1);const PREVIEW=has('--preview');const HTML=path.join(__dirname,'out','serial.html');
const OUT=path.resolve(arg('--out',path.join(__dirname,'out','ep'+String(EP).padStart(2,'0')+(PREVIEW?'_prev':''))));
const FPS=PREVIEW?+arg('--fps',3):+arg('--fps',24);const [VW,VH]=(PREVIEW?arg('--size','360x640'):arg('--size','720x1280')).split('x').map(Number);
const ONLY=(arg('--only','')||'').split(',').filter(Boolean);const PART=(arg('--part','0/1')).split('/').map(Number);
(async()=>{fs.mkdirSync(OUT,{recursive:true});if(!fs.existsSync(HTML))throw new Error('нет '+HTML+' — node tools/serial/build.js');
  const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});
  const page=await browser.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:PREVIEW?1:1});
  page.on('pageerror',e=>console.log('PAGEERROR',e.message));page.on('console',m=>{if(m.type()==='error')console.log('CONSOLE',m.text().slice(0,240));});
  // игровой цикл requestAnimationFrame выключен — кадры рисует съёмка
  await page.addInitScript(()=>{const raf=window.requestAnimationFrame.bind(window);window.__stopRaf=false;window.requestAnimationFrame=function(cb){if(window.__stopRaf&&cb&&cb.name==='frame')return 0;return raf(cb);};});
  await page.goto('file://'+HTML+'?debug=1&hq=1');await page.waitForTimeout(1500);
  const segs=await page.evaluate(ep=>{window.__stopRaf=true;try{ZC.FIN.vox.audio();}catch(e){}ZC.FIN.occ.fdt=1/24;if(ZC.FIN.cam)ZC.FIN.cam.fdt=1/24;
    // часы интерфейса: CSS-переходы идут по времени видео
    window.__animStep=function(ms){for(const a of document.getAnimations()){if(!a.__vt){a.__vt=true;try{a.pause();}catch(e){}a.__t=a.currentTime||0;}else a.__t+=ms;try{a.currentTime=a.__t;}catch(e){}}};
    window.__gsync=function(){const gl=ZC.FIN.occ.dbg.renderer.getContext(),b=new Uint8Array(4);gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,b);};
    const E=ZC.FIN.serial.eps[ep];return E.segs.map(s=>({id:s.id,dur:(s.to-(s.from||0))}));},EP);
  console.log('серия',EP,'сегментов',segs.length,'длина',segs.reduce((a,s)=>a+s.dur,0).toFixed(1)+' с');
  let total=0;
  for(let si=0;si<segs.length;si++){const S=segs[si];const dir=path.join(OUT,String(si).padStart(2,'0')+'_'+S.id);
    if(ONLY.length&&!ONLY.includes(S.id))continue;if(si%PART[1]!==PART[0])continue;
    if(!ONLY.length&&fs.existsSync(path.join(dir,'meta.json'))){console.log('skip',S.id);continue;}
    fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir,{recursive:true});const N=Math.round(S.dur*FPS);const t0=Date.now();
    const info=await page.evaluate(({ep,si,id,fps})=>{let q=0;for(const c of id)q=(q*31+c.charCodeAt(0))%2147483647;q=q||7;Math.random=()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};
      ZC.FIN.occ.fdt=1/fps;if(ZC.FIN.cam)ZC.FIN.cam.fdt=1/fps;return ZC.FIN.serial.seg(ep,si);},{ep:EP,si,id:S.id,fps:FPS});
    // переходы интерфейса, начатые при перемотке, — сразу к концу (иначе в первом кадре висят старые надписи)
    await page.evaluate(()=>{__animStep(0);__animStep(5000);for(let q=0;q<3;q++){ZC.FIN.occ.frame();__gsync();}});
    console.log('seg',si,S.id,info);
    for(let f=0;f<N;f++){const t=f/FPS;
      await page.evaluate(({si,t,fps,f})=>{const SER=ZC.FIN.serial;SER.frame(si,t,1/fps);__animStep(1000/fps);ZC.FIN.occ.frame();__gsync();},{si,t,fps:FPS,f});
      await page.screenshot({path:path.join(dir,String(f).padStart(5,'0')+'.jpg'),type:'jpeg',quality:PREVIEW?70:92,timeout:180000});}
    const snd=await page.evaluate(()=>ZC.FIN.serial.log.slice());
    fs.writeFileSync(path.join(dir,'snd.json'),JSON.stringify(snd));
    fs.writeFileSync(path.join(dir,'meta.json'),JSON.stringify({id:S.id,dur:S.dur,fps:FPS,frames:N,size:[VW,VH],info}));
    console.log('  done',S.id,N,'кадров',((Date.now()-t0)/1000).toFixed(0)+' с','звуков',snd.length);total+=N;}
  await browser.close();console.log('ALL',total);})();
