//@@ wait=1500
// релиз final06: 2-Б «Водяной» — новый бой в три этапа (late_99j_k2b.js), вдвоём настоящими нажатиями:
// 1 «Водяные кони» — Водяной скачет на волне, шары отбиваем щитом в последний миг (три попадания — свалился), бьём оглушённого, добиваем;
// 2 «Воронка» — родники: два противоположных разом (каждый игрок свой), воронка встаёт, бьём; 3 «Великий вал» — прячемся за валуны,
// три колокола Китежа разом (Прошка звонит и уступает — держит звон; Потап — второй; Пелагея — третий), бьём съёжившегося, мах вдвоём.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.K2=[{g:'KeyG',a:'KeyF',r:'ShiftLeft',i:'KeyR',s:'KeyQ',B:['KeyA','KeyD','KeyW','KeyS']},{g:'Period',a:'Comma',r:'Slash',i:'Semicolon',s:'KeyK',B:['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']}];
window.REL=pi=>K2[pi].B.forEach(k=>ZC.hold(k,false));
window.STEP=(pi,x,z,tol)=>{const h=U.act(pi),dx=x-h.pos.x,dz=z-h.pos.z,far=Math.hypot(dx,dz)>(tol||0.5),B=K2[pi].B;ZC.hold(B[0],far&&dx<-0.25);ZC.hold(B[1],far&&dx>0.25);ZC.hold(B[2],far&&dz<-0.25);ZC.hold(B[3],far&&dz>0.25);return !far;};
window.ACT=(pi,kind)=>{for(let i=0;i<3&&U.act(pi).kind!==kind;i++){U.tap(K2[pi].s);ZC.tick(8);}return U.act(pi).kind===kind;};
window.CINE=(max)=>{let t=0;while(!ZC.G.cine&&t<(max||300)){ZC.tick(1);t++;}const was=!!ZC.G.cine;while(ZC.G.cine&&t<4000){ZC.tick(1);t++;}return was;};
// за кадр: отбить шар в последний миг; рядом миньон — ударить; red-замах — кувырок
window.DEF=(pi,i)=>{const h=U.act(pi),K=K2[pi];const bo=ZC.W.bolts.find(b=>b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2);if(bo){ZC.press(K.g);return true;}
  const w=ZC.W.enemies.find(e=>e.alive&&e.tgt===h&&e.state==='wind');if(w){const left=w.wdur-w.t;if(w.sig==='red'){if(left<0.2)ZC.press(K.r);}else if(left<0.16&&w.left===null)ZC.press(K.g);return true;}
  const m=ZC.W.enemies.find(e=>e.alive&&e.kind!=='vodyanoy'&&Math.hypot(e.pos.x-h.pos.x,e.pos.z-h.pos.z)<2.2);if(m&&i%10===pi*5){h.face=Math.atan2(m.pos.x-h.pos.x,m.pos.z-h.pos.z);ZC.press(K.a);}return false;};
window.HIT=(pi,e,i)=>{const h=U.act(pi);if(STEP(pi,e.pos.x+(pi?1.6:-1.6),e.pos.z+1.6,0.7)){h.face=Math.atan2(e.pos.x-h.pos.x,e.pos.z-h.pos.z);if(i%9===pi*4)ZC.press(K2[pi].a);}};
ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
CINE(200);ZC.tick(5);const D=ZC.W.warp2b('boss');window.D=D;CINE(300);ZC.tick(30);'phase='+ZC.W.flags.phase+' ride='+D.BS.ride
//@@ shot=k2bb_1.png
// этап 1: шары — щитом в последний миг; свалился — бить
const D=ZC.W.dbg2b(),F=ZC.W.flags,e=D.vod,log=[];ACT(0,'proshka');ACT(1,'pelageya');let refl=0,falls=0,was=true;
for(let i=0;i<60*150&&F.phase===1;i++){for(const pi of[0,1]){if(DEF(pi,i))continue;if(e.dazeT>0||e.state==='broken')HIT(pi,e,i);else STEP(pi,pi?2.6:-2.6,-8.4);}
  if(was&&!D.BS.ride)falls++;was=D.BS.ride;ZC.tick(1);}
[0,1].forEach(REL);if(F.phase===1)throw new Error('этап 1 не пройден: hits='+D.BS.hits+' falls='+falls+' emb='+e.embers+' st='+e.state+' '+U.st());
CINE(300);ZC.tick(30);'stage1 ok falls='+falls+' → phase '+F.phase
//@@ shot=k2bb_2.png
// этап 2: Прошка — к северному роднику, Пелагея — к южному; играют; воронка встала — бить
const D=ZC.W.dbg2b(),F=ZC.W.flags,e=D.vod,S=D.SP;let stalls=0,was=false;
for(let i=0;i<60*150&&F.phase===2;i++){const st=D.BS.stall>0;if(st&&!was)stalls++;was=st;
  for(const pi of[0,1]){if(DEF(pi,i))continue;if(st||e.state==='broken'){HIT(pi,e,i);continue;}const s=S[pi?2:0];const h=U.act(pi);
    if(STEP(pi,s.x*0.8,s.z+(pi?-1.0:1.0),0.9)){REL(pi);if(s.ref.hum<0.5&&i%20===pi*10)ZC.press(K2[pi].i);}else if(h.groundRef&&h.groundRef.water&&i%30===pi*15)ZC.press(pi?'KeyM':'Space');}ZC.tick(1);}
[0,1].forEach(REL);if(F.phase===2)throw new Error('этап 2 не пройден: stalls='+stalls+' emb='+e.embers+' st='+e.state+' hum='+S.map(s=>s.ref.hum.toFixed(1)).join('/')+' '+U.st());
CINE(300);ZC.tick(30);'stage2 ok stalls='+stalls+' → phase '+F.phase
//@@ shot=k2bb_3.png
// этап 3: вал — за валун; колокола: Прошка звонит и уступает (Потап — следом), Пелагея — третий; съёжился — бить; мах — вдвоём
const D=ZC.W.dbg2b(),F=ZC.W.flags,e=D.vod,B=D.BELL,R=D.ROCKS;let stuns=0,was=false,hold=0,safe=0,hit=0;
const bellSpot=i=>[B[i].x*0.86,B[i].z+(i===2?-1:0)];
for(let i=0;i<60*180&&!F.won;i++){const st=D.BS.stun;if(st&&!was)stuns++;was=st;const V=D.BS.wave;
  for(const pi of[0,1]){const h=U.act(pi);if(DEF(pi,i))continue;
    if(st||e.state==='broken'){HIT(pi,e,i);if(e.state==='broken'&&i%9===0){ZC.press('KeyF');ZC.press('Comma');}continue;}
    // вал близко — к ближайшему валуну, с юга
    if((V&&V.z<h.pos.z+0.5&&V.z>h.pos.z-9)||(!V&&D.BS.waveT<1.4)){const r=R.slice().sort((a,b)=>Math.abs(a.x-h.pos.x)-Math.abs(b.x-h.pos.x))[0];STEP(pi,r.x+(pi?0.4:-0.4),r.z+1.6,0.4);continue;}
    if(pi===0){const want=ZC.HERO.proshka.kwHold?1:0;const [x,z]=bellSpot(want);if(STEP(0,x,z,0.9)){REL(0);if(B[want].ref.hum<0.5&&i%20===0){ZC.press(K2[0].i);ZC.tick(2);if(want===0){U.tap(K2[0].s);ZC.tick(6);hold++;}}}}
    else{const [x,z]=bellSpot(2);if(STEP(1,x,z,0.9)){REL(1);if(B[2].ref.hum<0.5&&B[0].ref.hum>0&&i%20===10)ZC.press(K2[1].i);}}}
  if(!ZC.HERO.proshka.kwHold&&U.act(0).kind==='potap'&&!st&&i%300===0){U.tap(K2[0].s);ZC.tick(6);}   // напев стих — назад к Прошке
  ZC.tick(1);}
[0,1].forEach(REL);if(!F.won)throw new Error('этап 3 не пройден: stuns='+stuns+' holds='+hold+' emb='+e.embers+' st='+e.state+' bells='+B.map(s=>s.ref.hum.toFixed(1)).join('/')+' '+U.st());
'stage3 ok stuns='+stuns+' holds='+hold
//@@
CINE(400);ZC.tick(200);if(!ZC.G.done['2-B'])throw new Error('уровень не пройден: lvl='+ZC.W.levelId);if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-B boss done errs=0'
