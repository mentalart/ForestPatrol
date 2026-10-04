//@@ wait=1500
// релиз final06: 3-2 «Облачные пастбища» — мини-босс Громовой Баран вдвоём (late_99o_sky32.js):
// 1 «Таран» — Йоша поливает стожок, Прошка со светом стоит за ним: Баран бежит на свет и вязнет; в свете бьём, Потап — за рога;
// 2 «Гроза» — Йоша поливает западную тучку, Прошка зажигает перо (клавишей) ПЕРЕД тучкой, со стороны арены: радуга на тучу; Прошка и Йоша наверху бьют в свете, от топота прыгают;
// 3 «Пушок» — снова стожок; Баран увяз — Прошка со светом подводит Пушка к батюшке; ролик, звено с радуги, уровень пройден.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(false);ZC.startFrom(ZC.LV('3-2'));ZC.G.manual=true;ZC.tick(30);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
const W=ZC.W,H=ZC.HERO;ZC.FIN.tut32.auto=false;ZC.FIN.warp('boss');ZC.tick(10);for(const h of Object.values(H)){h.following=false;h.lit=false;}
U.toKind('proshka',0);U.toKind('yosha',1);U.goto(0,0,-307,5);ZC.tick(5);if(!ZC.G.cine)throw new Error('нет ролика Барана: '+U.st());U.nocine();ZC.tick(10);
const B=W.ram32;if(B.phase!==1)throw new Error('этап не 1: '+B.phase);'boss phase='+B.phase+' e='+!!B.e
//@@
// этап 1: стожок + свет за ним; увяз — бить в свете
window.WATER=(S,i)=>{const Y=ZC.HERO.yosha;if(S.puffy||S.gone>0)return true;if(U.step(1,S.x+1.4,S.z+0.8,0.4)){U.rel(1);Y.face=Math.atan2(S.x-Y.pos.x,S.z-Y.pos.z);if(i%20===0)ZC.press('KeyL');}return false;};
const W=ZC.W,H=ZC.HERO,B=W.ram32,e=B.e,SB=W.stogs.slice(-4);const Pr=H.proshka,Y=H.yosha;Pr.lit=false;U.tap('KeyR');Y.lit=true;
let stucks=0,horns=0,prev='';const t0=ZC.G.time;
for(let i=0;i<60*120&&B.phase===1;i++){for(const h of Object.values(H))if(h.active)h.iT=Math.max(h.iT,0.5);
  const S=SB.find(s=>s.gone<=0&&s.x<0)||SB.find(s=>s.gone<=0)||SB[0];const ready=WATER(S,i);
  if(B.ai==='stuck'||e.state==='broken'){if(prev!=='stuck')stucks++;U.hit(0,e,i);if(B.ai==='stuck'&&i%30===0){}}
  else if(ready){U.step(0,S.x,S.z+(S.z<-316?-1.7:1.7),0.4);}
  prev=B.ai==='stuck'?'stuck':'';ZC.tick(1);}
U.rel(0);U.rel(1);if(B.phase<1.5)throw new Error('этап 1 не пройден: stucks='+stucks+' emb='+e.embers+' ai='+B.ai+' '+U.st());U.nocine();ZC.tick(10);
'phase1 ok stucks='+stucks+' t='+(ZC.G.time-t0).toFixed(0)+' phase='+B.phase
//@@ shot=sky32_storm.png
ZC.tick(1);
//@@
// этап 2: радуга от западной тучки — наверх; бить в свете, от топота прыгать
const W=ZC.W,H=ZC.HERO,B=W.ram32,e=B.e,RW=W.rains.find(r=>r.name==='rw');const Pr=H.proshka,Y=H.yosha;if(B.phase!==2)throw new Error('не этап 2: '+B.phase);
Pr.lit=false;Y.lit=false;let bows=0,jumps=0,top=0,presses=0;const t0=ZC.G.time;
for(let i=0;i<60*150&&B.phase===2;i++){for(const h of Object.values(H))if(h.active)h.iT=Math.max(h.iT,0.5);
  if(!RW.bow.on){if(RW.rain<=0.3){if(U.step(1,RW.x-1.2,RW.z+1.0,0.4)){U.rel(1);Y.face=Math.atan2(RW.x-Y.pos.x,RW.z-Y.pos.z);if(i%20===0)ZC.press('KeyL');}}if(U.step(0,RW.x+2.2,RW.z+0.6,0.5)){U.rel(0);if(RW.rain>0.3&&!Pr.lit&&i%30===0){ZC.press('KeyR');presses++;}}}
  else{for(const pi of[0,1]){const h=U.act(pi);if(h.pos.y<27.2){U.step(pi,-2.9,-316,0.3);}else{const K=U.K[pi];if(B.stompT>0&&B.stompT<0.25&&h.grounded){ZC.press(K.j);jumps++;}else U.hit(pi,e,i);}}if(RW.bow.k>=1&&bows===0){bows=1;Pr.lit=true;Y.lit=true;}}
  ZC.tick(1);}
U.rel(0);U.rel(1);if(B.phase<2.5)throw new Error('этап 2 не пройден: bows='+bows+' presses='+presses+' lit='+Pr.lit+' emb='+e.embers+' st='+e.state+' '+U.st());U.nocine();ZC.tick(10);
'phase2 ok jumps='+jumps+' t='+(ZC.G.time-t0).toFixed(0)
//@@
// этап 3: стожок — увяз; Прошка со светом подводит Пушка
const W=ZC.W,H=ZC.HERO,B=W.ram32,e=B.e,LB=W.lamb32,SB=W.stogs.slice(-4),F=W.flags;const Pr=H.proshka,Y=H.yosha;if(B.phase!==3)throw new Error('не этап 3: '+B.phase);
Pr.lit=true;Y.lit=false;const t0=ZC.G.time;let scares=0,was=0;
for(let i=0;i<60*120&&!F.won;i++){for(const h of Object.values(H))if(h.active)h.iT=Math.max(h.iT,0.5);
  const S=SB.find(s=>s.gone<=0&&s.x<0)||SB.find(s=>s.gone<=0)||SB[0];const ready=WATER(S,i);
  if(B.ai==='stuck'||B.ai==='bonk'){U.step(0,e.pos.x+1.2,e.pos.z+2.2,0.4);}else if(ready)U.step(0,S.x,S.z+(S.z<-316?-1.7:1.7),0.4);
  if(LB.scared>0&&!was)scares++;was=LB.scared>0;ZC.tick(1);}
U.rel(0);U.rel(1);if(!F.won)throw new Error('этап 3 не пройден: ai='+B.ai+' lamb='+LB.pos.x.toFixed(1)+','+LB.pos.z.toFixed(1)+' ram='+e.pos.x.toFixed(1)+','+e.pos.z.toFixed(1)+' scares='+scares+' '+U.st());
'phase3 ok scares='+scares+' t='+(ZC.G.time-t0).toFixed(0)
//@@ shot=sky32_finale.png wait=300
ZC.tick(400);
//@@
const W=ZC.W,F=W.flags;U.nocine();ZC.tick(20);const L4=W.items.filter(i=>i.kind==='link').pop();const r=[U.goto(0,L4.pos.x,L4.pos.z,6)];ZC.tick(240);
if(ZC.W.levelId==='3-2'&&!ZC.G.done['3-2'])throw new Error('уровень не пройден: link='+L4.taken+' stage='+F.stage+' '+U.st());
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'3-2 boss coop done '+r+' errs=0 lvl='+ZC.W.levelId
