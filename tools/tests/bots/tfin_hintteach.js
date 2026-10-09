//@@
// релиз final06: подсказки по умолчанию выключены (вне ?debug); в прологе урок #hnTeach (levels/p/late_79t_hintteach.js) учит показывать и прятать их кнопкой LB:
// «нажми LB» → нажали — подсказка видна, «ещё раз LB» → нажали — спрятана, «Получилось!» → через 5 с урок ушёл. При «Подсказки: вкл» урока нет.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.H=ZC.FIN.hints;window.G=ZC.G;window.F=ZC.FIN;window.T=F.hintTeach;window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};
window.mkPad=i=>({id:'Fake pad '+i,index:i,connected:true,mapping:'standard',timestamp:0,axes:[0,0,0,0],buttons:Array.from({length:17},()=>({pressed:false,value:0}))});
window.PADSIM={list:[mkPad(0),mkPad(1)]};F.padSrc=()=>PADSIM.list.slice();
window.FR=0;{const raf=window.requestAnimationFrame.bind(window);window.requestAnimationFrame=cb=>raf(t=>{FR++;cb(t);});}
window.polled=n=>new Promise(res=>{const f0=FR,t0=performance.now();const c=()=>{if(FR-f0>=n||performance.now()-t0>30000)res();else setTimeout(c,5);};c();});
window.tapB=async(i,b)=>{const p=PADSIM.list[i];p.buttons[b].pressed=true;p.buttons[b].value=1;await polled(2);p.buttons[b].pressed=false;p.buttons[b].value=0;await polled(2);};
window.LB=4;
window.vis=()=>['hint0','hint1','hintS'].filter(id=>{const e=document.getElementById(id);return e&&e.classList.contains('on')&&getComputedStyle(e).display!=='none';});
window.teachVis=()=>{const e=document.getElementById('hnTeach');return !!e&&e.classList.contains('on')&&getComputedStyle(e).display!=='none';};
window.load=id=>{ZC.setSolo(false);F.co.set(false);ZC.startFrom(ZC.LV(id));G.manual=true;ZC.tick(20);for(let k=0;k<6;k++){if(G.cine)ZC.skip();ZC.sim(0.5);}ZC.sim(5);};
'ready'
//@@
// 1) по умолчанию (вне ?debug, настройка не задана) — выключены; в ?debug — включены (как ждут боты)
(()=>{BAD.length=0;const h0=F.set.hints,d0=F.kids.debug;delete F.set.hints;
  chk(H.on()===true,'в ?debug по умолчанию включены');F.kids.debug=false;chk(H.on()===false,'по умолчанию подсказки выключены');
  F.kids.debug=d0;if(h0!==undefined)F.set.hints=h0;if(BAD.length)throw new Error(BAD.join(' · '));return ['default ok'];})()
//@@
// 2) урок в прологе при «выкл»
(async()=>{BAD.length=0;F.set.hints=false;F.applySettings();load('p');const r=[];
  let s=T.state();chk(s.st===1&&teachVis()&&/LB/.test(s.text)&&/спрятаны/.test(s.text),'шаг 1 — «нажми LB»: '+JSON.stringify(s));
  chk(vis().length===0,'подсказки сами не видны: '+vis().join(','));
  await tapB(0,LB);ZC.sim(0.5);s=T.state();
  chk(s.st===2&&teachVis()&&/ещё раз/.test(s.text),'шаг 2 — «ещё раз»: '+JSON.stringify(s));chk(vis().length>0,'по LB подсказка показалась');
  await tapB(0,LB);ZC.sim(0.5);s=T.state();
  chk(s.st===3&&/Получилось/.test(s.text),'шаг 3 — «Получилось»: '+JSON.stringify(s));chk(vis().length===0,'по LB подсказка спряталась: '+vis().join(','));
  ZC.sim(6);s=T.state();chk(!teachVis()&&s.st===-1,'урок ушёл: '+JSON.stringify(s));
  r.push('teach ok');
  // 3) «вкл» — урока нет
  F.set.hints=true;F.applySettings();load('p');ZC.sim(3);s=T.state();chk(!teachVis(),'при «вкл» урока нет: '+JSON.stringify(s));
  // 4) не на прологе — урока нет
  F.set.hints=false;F.applySettings();load('1-1');ZC.sim(3);chk(!teachVis(),'на 1-1 урока нет');
  delete F.set.hints;F.applySettings();
  if(BAD.length)throw new Error(BAD.join(' · '));r.push('errs='+_errs.length);if(_errs.length)throw new Error(_errs.join(' | '));return r;})()
