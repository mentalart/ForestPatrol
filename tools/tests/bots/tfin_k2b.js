//@@ wait=1500
// релиз final06: 2-Б «Водяной» вдвое длиннее (late_99j_k2b.js) — вдвоём настоящими нажатиями:
// «Погоня Водяного»: ролик — река встаёт валом, камера разворачивается лицом к героям; Потап поднимает дуб; Йоша играет прилив у ручья, оба вплавь; за скалами Йоша поливает
// гребешок — камыш стеной держит вал; плетень — две верёвки разом; к омуту — прежний ролик и бой (фазы, пузырь, Богатырский мах).
// Отдельно: вал догоняет отставшего — все к последней отметке.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.KEYS=[{swap:'KeyQ'},{swap:'KeyK'}];
window.ACT=(pi,kind)=>{for(let i=0;i<3&&U.act(pi).kind!==kind;i++){U.tap(KEYS[pi].swap);ZC.tick(6);}return U.act(pi).kind===kind;};
window.CINE=(max)=>{let t=0;while(!ZC.G.cine&&t<(max||300)){ZC.tick(1);t++;}const was=!!ZC.G.cine;while(ZC.G.cine&&t<3000){ZC.tick(1);t++;}return was;};
// в погоне камера впереди, лицом к героям (W.camYaw=π): «вверх» — к валу, «вниз» — от него; WALK — как U.walkTo, но по повороту камеры
window.WALK=(pi,x,z,max,extra)=>{const inv=Math.abs(ZC.W.camYaw)>1,B=pi?['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']:['KeyA','KeyD','KeyW','KeyS'];const n=Math.round((max||6)*60);let r='TIMEOUT';
  for(let i=0;i<n;i++){const h=U.act(pi),dx=x-h.pos.x,dz=z-h.pos.z;ZC.hold(B[0],inv?dx>0.25:dx<-0.25);ZC.hold(B[1],inv?dx<-0.25:dx>0.25);ZC.hold(B[2],inv?dz>0.25:dz<-0.25);ZC.hold(B[3],inv?dz<-0.25:dz>0.25);
    if(Math.hypot(dx,dz)<0.45){r='t='+(i/60).toFixed(2);break;}if(extra)extra(h,i);ZC.tick(1);}B.forEach(k=>ZC.hold(k,false));ZC.tick(1);return r;};
window.SWIM=(h)=>{if(h.grounded&&h.groundRef&&h.groundRef.water)ZC.press(h.player?'KeyM':'Space');};
ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
if(!CINE(200))throw new Error('нет ролика погони');ZC.tick(5);const D=ZC.W.dbg2b();if(!D.WV.on)throw new Error('вал не пошёл');if(Math.abs(ZC.W.camYaw-Math.PI)>0.01)throw new Error('камера не развернулась');'chase on wave='+D.WV.z.toFixed(1)
//@@ shot=k2b_wave.png
// дуб: Потап поднимает; Йоша — следом
const D=ZC.W.dbg2b();const r=[ACT(0,'potap'),ACT(1,'yosha')];r.push(WALK(0,0,59.8,6),WALK(1,1.6,61,6));U.tap('KeyE');ZC.tick(20);if(!D.F.oak)throw new Error('дуб не поднят: '+r.join()+' '+U.st());
'oak '+r.join()+' wave='+D.WV.z.toFixed(1)
//@@
// ручей: Йоша — прилив у ракушки; оба вплавь и на берег
const D=ZC.W.dbg2b();const r=[WALK(1,-6.2,46.6,6),WALK(0,-3,47.2,6)];U.tap('Semicolon');ZC.tick(130);if(D.STR.state!=='high')throw new Error('ручей не в приливе: '+r.join()+' '+U.st());
r.push(WALK(0,-2,36.4,8,SWIM),WALK(1,0,36.4,8,SWIM));if(!(U.act(0).pos.z<37.6&&U.act(1).pos.z<37.6&&U.act(0).pos.y>0.6))throw new Error('не переплыли: '+r.join()+' '+U.st());'stream '+r.join()+' wave='+D.WV.z.toFixed(1)
//@@
// проход: оба за скалы; Йоша поливает гребешок — камыш держит вал
const D=ZC.W.dbg2b();const r=[WALK(0,0,33,5),WALK(0,-1.4,24.4,6),WALK(1,0,33,5),WALK(1,0.6,24.6,6)];ZC.HERO.yosha.face=0;U.tap('KeyL');ZC.tick(40);
if(!D.F.reeds)throw new Error('камыш не вырос: '+r.join()+' '+U.st());'reeds '+r.join()+' wave='+D.WV.z.toFixed(1)
//@@ shot=k2b_reeds.png
// плетень: две верёвки разом
const D=ZC.W.dbg2b(),H=ZC.HERO;const r=[WALK(0,-5.2,18.2,6),WALK(1,5.2,18.2,6)];U.act(0).face=Math.PI;U.act(1).face=Math.PI;ZC.press('KeyF');ZC.press('Comma');ZC.tick(20);
if(!D.F.gate)throw new Error('плетень не открылся: '+r.join()+' RP='+D.RP.map(v=>v.toFixed(2))+' '+U.st());r.push(WALK(0,-1,9.6,6),WALK(1,1,9.6,6));ZC.tick(20);if(!D.F.chaseDone)throw new Error('погоня не кончилась: '+r.join()+' '+U.st());if(ZC.W.camYaw!==0)throw new Error('камера не вернулась');
'gate '+r.join()+' wave='+D.WV.z.toFixed(1)
//@@
// прежний бой: ролик у омута, фазы 1–2 в драке, пузырь — рогатка Прошки, Богатырский мах
if(!CINE(200))throw new Error('нет ролика у омута');ZC.tick(30);const F=ZC.W.flags;if(F.phase!==1)throw new Error('бой не начался: '+F.phase);ACT(0,'proshka');ACT(1,'pelageya');const e=ZC.W.enemies.find(q=>q.kind==='vodyanoy');
const log=[];let ph=F.phase;for(let k=0;k<60&&F.phase<3;k++){U.brawl(1.5);if(F.phase!==ph){log.push('t='+k*1.5+' phase '+ph+'->'+F.phase);ph=F.phase;}}
if(F.phase<3)throw new Error('не дошли до третьей фазы: '+F.phase+' '+log.join());ZC.tick(120);
const H=ZC.HERO;H.proshka.face=Math.atan2(e.pos.x-H.proshka.pos.x,e.pos.z-H.proshka.pos.z);U.tap('KeyE');ZC.tick(60);log.push('st='+e.state);
log.push(U.walkTo(0,e.pos.x-2.4,e.pos.z+1.2,4),U.walkTo(1,e.pos.x+2.4,e.pos.z+1.2,4));
H.proshka.face=Math.atan2(e.pos.x-H.proshka.pos.x,e.pos.z-H.proshka.pos.z);H.pelageya.face=Math.atan2(e.pos.x-H.pelageya.pos.x,e.pos.z-H.pelageya.pos.z);
ZC.press('KeyF');ZC.press('Comma');ZC.tick(20);if(!F.won)throw new Error('мах не вышел: '+log.join());'boss '+log.join()
//@@
ZC.tick(60*21);ZC.skip();ZC.tick(200);if(!ZC.G.done['2-B'])throw new Error('уровень не пройден');'2-B done'
//@@
// вал догоняет отставшего: Прошка стоит — вал накрывает, все к отметке, вал позади
ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);CINE(200);ZC.tick(5);const D=ZC.W.dbg2b();let t=0;while(!(ZC.W.flags.caughtSeen)&&t<60*30){if(D.WV.hold>1.0){ZC.W.flags.caughtSeen=true;break;}ZC.tick(1);t++;}
if(!ZC.W.flags.caughtSeen)throw new Error('вал не догнал');const a=U.act(0).pos.z;if(!(D.WV.z>a+10&&Math.abs(a-82)<2))throw new Error('не к отметке: '+a.toFixed(1)+' wave='+D.WV.z.toFixed(1));
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'caught → ck '+a.toFixed(1)+' wave='+D.WV.z.toFixed(1)+' errs=0'
