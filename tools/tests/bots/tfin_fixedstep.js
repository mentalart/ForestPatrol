//@@
// релиз: фиксированный шаг физики 1/60 с (docs/29_full_audit.md, 7.3; proto/engine/10_levels_flow_menu.js, advance). Кадр длиной 1/fps секунд
// ZC.advance(1/fps) даёт игре столько шагов по 1/60, сколько в него влезает: высота прыжка каждого героя при 20, 30, 60 и 144 кадрах в секунду
// одна и та же (раньше шаг был равен кадру: Потап 1,18 м при 120 fps и 1,03 м при 20); игровое время идёт в реальном темпе; hit-stop замедляет
// на те же доли секунды (0,1 с — 7 шагов по 0,15 от 1/60: ≈ 0,1 с игрового времени за 0,2 с кадров); одно нажатие смены героя — одна смена, даже если в кадре три шага (20 fps), и не теряется, если в кадре шага не было (144 fps).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(20);U.nocine();ZC.tick(60);
window.BAD=[];window.RES=[];window.FPS=[20,30,60,144];
window.jumpH=(kind,fps)=>{const h=ZC.HERO[kind];U.toKind(kind,h.player);ZC.tick(60);const KJ=U.K[h.player].j,y0=h.pos.y;let top=y0,jumped=false;ZC.press(KJ);
  for(let f=0;f<fps*3;f++){ZC.advance(1/fps);if(h.pos.y>top)top=h.pos.y;if(!h.grounded)jumped=true;if(jumped&&h.grounded)break;}
  return +(top-y0).toFixed(3);};
'ok'
//@@
// высота прыжка Прошки и Потапа при разной частоте кадров: отличие от 60 fps — не более 2 %
const r=[];for(const k of['proshka','potap']){const H=FPS.map(f=>jumpH(k,f)),ref=H[2];r.push(k+' '+H.join(' / '));
  H.forEach((v,i)=>{if(!(ref>0.5)||Math.abs(v-ref)/ref>0.02)BAD.push('прыжок '+k+' при '+FPS[i]+' fps: '+v+' м, при 60 fps '+ref+' м');});}
RES.push('прыжок, м (20/30/60/144 fps): '+r.join('; '));RES.join(' · ')
//@@
// то же — Пелагея и Йоша
const r=[];for(const k of['pelageya','yosha']){const H=FPS.map(f=>jumpH(k,f)),ref=H[2];r.push(k+' '+H.join(' / '));
  H.forEach((v,i)=>{if(!(ref>0.5)||Math.abs(v-ref)/ref>0.02)BAD.push('прыжок '+k+' при '+FPS[i]+' fps: '+v+' м, при 60 fps '+ref+' м');});}
RES.push(r.join('; '));RES.join(' · ')
//@@
// игровое время за две секунды кадров ≈ 2 с при любой частоте; hit-stop 0,1 с: за 0,2 с кадров ≈ 7 замедленных шагов + 5 обычных ≈ 0,10 с игрового времени
const t=[];for(const f of FPS){const t0=ZC.G.time;for(let i=0;i<f*2;i++)ZC.advance(1/f);const d=ZC.G.time-t0;t.push(d.toFixed(3));if(Math.abs(d-2)>0.035)BAD.push('время при '+f+' fps: '+d.toFixed(3)+' с за 2 с кадров');}
RES.push('время за 2 с: '+t.join('/'));
for(const f of[30,60]){ZC.G.hitstop=0.1;const t0=ZC.G.time;for(let i=0;i<f*0.2;i++)ZC.advance(1/f);const d=ZC.G.time-t0;RES.push('hit-stop '+f+' fps: '+d.toFixed(3));if(d<0.09||d>0.12)BAD.push('hit-stop при '+f+' fps: '+d.toFixed(3)+' с, нужно ≈ 0,10');}
RES.join(' · ')
//@@
// одно нажатие смены героя в одиночном режиме (смена по кругу Прошка → Потап → Пелагея → Йоша): один шаг по кругу при 20 fps (в кадре три шага) и при 144 fps
// (первый кадр без шага — нажатие переносится)
ZC.setSolo(true);ZC.tick(5);
for(const f of[20,144,60]){for(let g=0;g<12&&U.me().kind!=='proshka';g++){ZC.press(U.K[0].s);ZC.tick(30);}ZC.tick(60);
  ZC.press(U.K[0].s);for(let i=0;i<Math.max(3,f/10);i++)ZC.advance(1/f);const k=U.me().kind;RES.push('смена '+f+' fps → '+k);if(k!=='potap')BAD.push('смена героя при '+f+' fps: '+k+' (нужен potap — одна смена)');}
ZC.setSolo(false);ZC.tick(5);RES.join(' · ')
//@@
// настоящий игровой цикл (frame() на requestAnimationFrame, без ручных шагов): одно нажатие даёт один прыжок той же высоты, G.frameN растёт
(async()=>{U.toKind('proshka',0);ZC.tick(60);const h=ZC.HERO.proshka,y0=h.pos.y,f0=ZC.G.frameN|0;let top=0,jumped=false;ZC.G.manual=false;ZC.press(U.K[0].j);
  const t0=performance.now();while(performance.now()-t0<120000){await new Promise(r=>requestAnimationFrame(r));top=Math.max(top,h.pos.y-y0);if(!h.grounded)jumped=true;if(jumped&&h.grounded)break;}
  ZC.G.manual=true;ZC.tick(5);const fr=(ZC.G.frameN|0)-f0;RES.push('настоящий цикл: '+top.toFixed(3)+' м за '+fr+' кадров');
  if(!(fr>2))BAD.push('frame() не крутится: кадров '+fr);if(Math.abs(top-2.16)>0.06)BAD.push('прыжок в настоящем цикле: '+top.toFixed(3)+' м, нужно ≈ 2,16');
  if(window._errs.length)BAD.push('ошибки консоли: '+window._errs.slice(0,2).join(' | '));
  if(BAD.length)throw new Error('FAIL tfin_fixedstep: '+BAD.join(' ; ')+' · '+RES.join(' · '));
  return 'tfin_fixedstep ok · '+RES.join(' · ');})()
