// Трейлер «Златой цепи»: кадр за кадром из релизной сборки (?debug&hq), заставка студии → стартовое меню → шоты tools/video/shots.js → титул в конце.
//   node tools/video/trailer.js [--out DIR] [--fps 24] [--preview] [--only id,id] [--html путь]
// Каждый сегмент пишется в DIR/<nn>_<id>/%05d.jpg, рядом — snd.json (звуки со временем от начала сегмента) и meta.json. Готовые сегменты
// пропускаются (можно перезапускать и переснимать отдельные шоты: --only). Склейка и звук — tools/video/audio.js и tools/video/encode.sh.
// В headless кадр рисуется программно (SwiftShader) ~2–3 с: трейлер снимается пару часов. --preview — 3 кадра в секунду, для проверки шотов.
const {chromium}=require('../tests/pw');const path=require('path'),fs=require('fs');
const arg=(k,d)=>{const i=process.argv.indexOf(k);return i<0?d:process.argv[i+1];};const has=k=>process.argv.includes(k);
const ROOT=path.join(__dirname,'..','..');const HTML=path.resolve(arg('--html',path.join(ROOT,'zlataya_cep','zlataya_cep_final05.html')));
const OUT=path.resolve(arg('--out',path.join(ROOT,'tools','video','out')));const PREVIEW=has('--preview');const FPS=PREVIEW?3:+arg('--fps',24);const ONLY=(arg('--only','')||'').split(',').filter(Boolean);
const SHOTS=require('./shots.js');
const SEG=[{id:'splash',dur:5.3,kind:'splash',music:'title'},{id:'title',dur:6.4,kind:'title',music:'title'}].concat(SHOTS.map(s=>Object.assign({kind:'shot'},s))).concat([{id:'end',dur:4.3,kind:'end',music:'title'}]);
// помощники в странице
const HELP=`
window.SETTLE=(s)=>{for(let q=0;q<Math.round(s*60);q++){ZC.tick(1);if(ZC.G.cine&&q%30===0){ZC.skip();}}};
window.L=(id)=>{ZC.setSolo(false);AP.clear();ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.tick(2);};
window.CINE=(id,t)=>{L(id);ZC.tick(Math.round(t*60));return 'cine='+!!ZC.G.cine;};
window.PLAY=(id,o)=>{o=o||{};if(o.solo){ZC.setSolo(true);}L(id);if(o.solo)ZC.setSolo(true);ZC.tick(20);for(let q=0;q<6&&ZC.G.cine;q++){ZC.skip();ZC.tick(8);}
  SETTLE(o.settle!=null?o.settle:1.5);const P=ZC.players,W=ZC.W;
  if(o.at){for(const pi of[0,1]){const h=AP.act(pi);h.pos.set(o.at[0]+(pi?1:-1),h.pos.y,o.at[1]);h.vel.set(0,0,0);}}
  if(o.apart){const a=AP.act(0),b=AP.act(1);const dx=b.pos.x-a.pos.x,dz=b.pos.z-a.pos.z,d=Math.hypot(dx,dz)||1;b.pos.x=a.pos.x+dx/d*16;b.pos.z=a.pos.z+dz/d*16;if(Math.abs(b.pos.x-a.pos.x)<1&&Math.abs(b.pos.z-a.pos.z)<1)b.pos.z=a.pos.z-16;b.pos.y=a.pos.y;}
  if(o.foes){const hs=o.apart?[AP.act(0),AP.act(1)]:[AP.act(0)];o.foes.forEach((k,i)=>{const h=hs[i%hs.length];const a=h.face+(i-0.5)*0.9;const e=ZC.FIN.dbgFoe(k,h.pos.x+Math.sin(a)*3.2,h.pos.z+Math.cos(a)*3.2-(o.apart?0:1.5),{y:h.pos.y});e.g.position.y=h.pos.y;e.state='idle';e.t=0;});}
  if(window.snapCams)snapCams();ZC.tick(2);return 'lvl='+W.levelId+' cine='+!!ZC.G.cine+' foes='+W.enemies.filter(e=>e.alive).length+' split='+(ZC.G.split>0.5);};
`;
(async()=>{fs.mkdirSync(OUT,{recursive:true});
  const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  const page=await browser.newPage({viewport:{width:1280,height:720}});
  page.on('pageerror',e=>console.log('PAGEERROR',e.message));
  // игровой цикл requestAnimationFrame выключаем — кадры рисует съёмка
  await page.addInitScript(()=>{const raf=window.requestAnimationFrame.bind(window);window.__stopRaf=false;window.requestAnimationFrame=function(cb){if(window.__stopRaf&&cb&&cb.name==='frame')return 0;return raf(cb);};});
  await page.goto('file://'+HTML+'?debug=1&hq=1');await page.waitForTimeout(1500);
  await page.evaluate(fs.readFileSync(path.join(__dirname,'autopilot.js'),'utf8'));await page.evaluate(HELP);
  await page.evaluate(()=>{window.__stopRaf=true;ZC.FIN.occ.fdt=1/24;if(ZC.FIN.cam)ZC.FIN.cam.fdt=1/24;});
  const dtMs=1000/FPS;let n0=0;
  for(let si=0;si<SEG.length;si++){const S=SEG[si];const dir=path.join(OUT,String(si).padStart(2,'0')+'_'+S.id);
    if(ONLY.length&&!ONLY.includes(S.id))continue;if(!ONLY.length&&fs.existsSync(path.join(dir,'meta.json'))){console.log('skip',S.id);continue;}
    fs.rmSync(dir,{recursive:true,force:true});fs.mkdirSync(dir,{recursive:true});const N=Math.round(S.dur*FPS);const t0=Date.now();
    let info=await page.evaluate(({S,fps})=>{window.__snd.length=0;window.__vt=0;ZC.FIN.occ.fdt=1/fps;if(ZC.FIN.cam)ZC.FIN.cam.fdt=1/fps;AP.i=0;AP.clear();
      if(S.kind==='splash'){ZC.FIN.splash();return 'splash';}
      if(S.kind==='title'||S.kind==='end'){ZC.FIN.openTitle(S.kind==='title');return 'title';}
      AP.mode=S.mode;AP.arg=S.arg||null;let r;try{r=eval(S.setup);}catch(e){r='SETUP ERROR '+e.message;}return r;},{S,fps:FPS});
    if(S.kind==='splash')await page.waitForTimeout(500);
    console.log('seg',si,S.id,info);
    for(let f=0;f<N;f++){const t=f/FPS;
      await page.evaluate(({S,t,fps,f,dtMs})=>{window.__vt=t;
        if(S.kind==='splash'){if(t<4.4)ZC.FIN.splashSeek(t);else ZC.FIN.splashSeek(4.3,Math.min(1,(t-4.4)/0.7));}
        else if(S.kind==='title'){if(Math.abs(t-2.6)<0.5/fps||Math.abs(t-3.6)<0.5/fps)ZC.menuKey('ArrowDown');if(Math.abs(t-5.0)<0.5/fps){ZC.menuKey('ArrowUp');ZC.menuKey('ArrowUp');}}
        else if(S.kind==='shot'){const k=Math.round(60/fps);for(let q=0;q<k;q++){AP.step();ZC.tick(1);}}
        if(S.kind!=='splash')__animStep(f===0?0:dtMs);ZC.FIN.occ.frame();__gsync();},{S,t,fps:FPS,f,dtMs});
      await page.screenshot({path:path.join(dir,String(f).padStart(5,'0')+'.jpg'),type:'jpeg',quality:90,timeout:180000});}
    const snd=await page.evaluate(()=>window.__snd.slice());fs.writeFileSync(path.join(dir,'snd.json'),JSON.stringify(snd));
    fs.writeFileSync(path.join(dir,'meta.json'),JSON.stringify({id:S.id,dur:S.dur,fps:FPS,frames:N,music:S.music===undefined?null:S.music,kind:S.kind,info}));
    console.log('  done',S.id,N,'frames',((Date.now()-t0)/1000).toFixed(0)+'s','snd',snd.length);n0+=N;}
  await browser.close();console.log('ALL',n0);})();
