//@@ wait=1500
// релиз final06: 3-2 «Облачные пастбища» — Громовой Баран: эффекты, камера боя и события (late_99zd_sky32_fx.js, late_99ze_sky32_cam.js; логика — late_99o_sky32.js).
// Бой проходится так же, как в tfin_sky32boss, а по ходу проверяется:
// · шина событий: paw, lock, charge, stuck, hit, strikeWarn, stomp, scared доходят до эффектов (FIN.s32fx.stats);
// · дорожка разбега: ширина = зоне удара (2·hitR), направление = направлению разбега (раньше была зеркальной), длина = до стены/стожка, конец — по виду преграды;
// · камера боя: после «go» W.camFn — камера арены; на протяжении боя оба героя и Баран в кадре (не за краем и не под плашками), после финала — прежняя камера;
// · полоса босса: этапы, угольки, строка состояния; кольцо-таймер и звёздочки при увязании; шерсть мягчеет на свету;
// · эффекты чистятся (после финала не торчат), в консоли нет ошибок.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(false);ZC.startFrom(ZC.LV('3-2'));ZC.G.manual=true;ZC.tick(30);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
const W=ZC.W,H=ZC.HERO;ZC.FIN.tut32.auto=false;ZC.FIN.warp('boss');ZC.tick(10);for(const h of Object.values(H)){h.following=false;h.lit=false;}
U.toKind('proshka',0);U.toKind('yosha',1);U.goto(0,0,-307,5);ZC.tick(5);if(!ZC.G.cine)throw new Error('нет ролика Барана: '+U.st());
const X=ZC.FIN.s32fx,C=ZC.FIN.cam32;if(!X||!C)throw new Error('нет модулей эффектов/камеры');if(W.camFn)throw new Error('камера боя включилась до боя');
U.nocine();ZC.tick(10);
const B=W.ram32;if(B.phase!==1)throw new Error('этап не 1: '+B.phase);if(!W.camFn)throw new Error('камера боя не включилась на этапе 1');
window.VIS={n:0,bad:0,worst:0};window.SAMPLE=()=>{if(ZC.G.cine)return;let bad=false;for(const p of C.keys()){const q=C.ndc(p);const o=Math.max(Math.abs(q.x)-1,q.y-0.62,-1-q.y);if(o>0.02)bad=true;VIS.worst=Math.max(VIS.worst,o);}VIS.n++;if(bad)VIS.bad++;};
'camera ok D='+C.now().D.toFixed(1)+' keys='+C.keys().length+' hitR='+B.hitR
//@@
// этап 1: стожок + свет за ним; на разбеге проверяем дорожку, на увязании — кольцо, звёздочки, шерсть
window.WATER=(S,i)=>{const Y=ZC.HERO.yosha;if(S.puffy||S.gone>0)return true;if(U.step(1,S.x+1.4,S.z+0.8,0.4)){U.rel(1);Y.face=Math.atan2(S.x-Y.pos.x,S.z-Y.pos.z);if(i%20===0)ZC.press('KeyL');}return false;};
const W=ZC.W,H=ZC.HERO,B=W.ram32,e=B.e,SB=W.stogs.slice(-4),X=ZC.FIN.s32fx;const Pr=H.proshka,Y=H.yosha;Pr.lit=false;U.tap('KeyR');Y.lit=true;
let stucks=0,prev='',laneOk=0,ringOk=0,litSeen=0,barOk=0;const chk={};
for(let i=0;i<60*150&&B.phase===1;i++){for(const h of Object.values(H))if(h.active)h.iT=Math.max(h.iT,0.5);
  const S=SB.find(s=>s.gone<=0&&s.x<0)||SB.find(s=>s.gone<=0)||SB[0];const ready=WATER(S,i);
  if(B.ai==='paw'&&B.t>0.3&&!chk.lane&&X.lane&&X.lane.g.visible){chk.lane=1;const L=X.lane,g=L.g;g.updateMatrixWorld(true);const p0=g.position.clone(),p1=g.localToWorld(new THREE.Vector3(0,0,1)).sub(p0).setY(0).normalize();
    if(Math.abs(L.base.scale.x-2*B.hitR)>0.01)throw new Error('ширина дорожки '+L.base.scale.x+' ≠ зоне удара '+2*B.hitR);
    if(p1.dot(B.dir)<0.98)throw new Error('дорожка смотрит не туда: '+p1.x.toFixed(2)+','+p1.z.toFixed(2)+' / разбег '+B.dir.x.toFixed(2)+','+B.dir.z.toFixed(2));
    let t=0,end='wall';for(;t<32;t+=0.3){const x=e.pos.x+B.dir.x*t,z=e.pos.z+B.dir.z*t;if(Math.abs(x)>9.6||z>-305.4||z<-326.6)break;let hit=0;for(const S2 of SB){if(S2.gone>0)continue;if(Math.hypot(S2.x-x,S2.z-z)<e.r+(S2.puffy?1.05:0.75)){hit=1;end=S2.puffy?'puffy':'dry';break;}}if(hit)break;}
    if(Math.abs(L.len-t)>0.7)throw new Error('длина дорожки '+L.len.toFixed(1)+' ≠ '+t.toFixed(1));if(X.laneEnd!==end)throw new Error('конец дорожки '+X.laneEnd+' ≠ '+end);laneOk=1;}
  if(B.ai==='stuck'&&B.t>0.8&&!chk.ring){chk.ring=1;if(!(X.ring&&X.ring.g.visible))throw new Error('нет кольца-таймера при увязании');if(!(X.stars&&X.stars.g.visible))throw new Error('нет звёздочек при увязании');ringOk=1;}
  if(B.ai==='stuck'&&e.litNow&&B.t>1&&!chk.lit){chk.lit=1;if(!(X.litK>0.6))throw new Error('шерсть не мягчеет на свету: litK='+X.litK.toFixed(2));litSeen=1;}
  if(B.ai==='stuck'&&!chk.bar){chk.bar=1;const bb=document.getElementById('bossbar').innerHTML;if(!/Громовой Баран/.test(bb)||!/dots/.test(bb)||!/hp/.test(bb))throw new Error('полоса босса: '+bb.slice(0,200));barOk=1;}
  if(i%20===0)SAMPLE();
  if(B.ai==='stuck'||e.state==='broken'){if(prev!=='stuck')stucks++;U.hit(0,e,i);}
  else if(ready){U.step(0,S.x,S.z+(S.z<-316?-1.7:1.7),0.4);}
  prev=B.ai==='stuck'?'stuck':'';ZC.tick(1);}
U.rel(0);U.rel(1);if(B.phase<1.5)throw new Error('этап 1 не пройден: stucks='+stucks+' emb='+e.embers+' ai='+B.ai+' '+U.st());
if(!laneOk)throw new Error('дорожка разбега не проверена');if(!ringOk)throw new Error('увязание не проверено');
const st=X.stats;for(const k of['paw','lock','charge','stuck','hit','puff'])if(!st[k])throw new Error('нет события '+k+' '+JSON.stringify(st));
U.nocine();ZC.tick(10);'phase1 ok stucks='+stucks+' lane='+laneOk+' ring='+ringOk+' lit='+litSeen+' bar='+barOk+' vis='+VIS.bad+'/'+VIS.n+' stats='+JSON.stringify(st)
//@@ shot=sky32fx_storm.png
ZC.tick(1);
//@@
// этап 2: радуга от западной тучки — наверх; молнии и топот с эффектами
const W=ZC.W,H=ZC.HERO,B=W.ram32,e=B.e,RW=W.rains.find(r=>r.name==='rw'),X=ZC.FIN.s32fx;const Pr=H.proshka,Y=H.yosha;if(B.phase!==2)throw new Error('не этап 2: '+B.phase);
if(!W.camFn)throw new Error('камера боя пропала на этапе 2');
Pr.lit=false;Y.lit=false;let bows=0,jumps=0,presses=0,tele=0,bolt=0;const t0=ZC.G.time;
for(let i=0;i<60*150&&B.phase===2;i++){for(const h of Object.values(H))if(h.active)h.iT=Math.max(h.iT,0.5);
  if(!RW.bow.on){if(RW.rain<=0.3){if(U.step(1,RW.x-1.2,RW.z+1.0,0.4)){U.rel(1);Y.face=Math.atan2(RW.x-Y.pos.x,RW.z-Y.pos.z);if(i%20===0)ZC.press('KeyL');}}if(U.step(0,RW.x+2.2,RW.z+0.6,0.5)){U.rel(0);if(RW.rain>0.3&&!Pr.lit&&i%30===0){ZC.press('KeyR');presses++;}}}
  else{for(const pi of[0,1]){const h=U.act(pi);if(h.pos.y<27.2){U.step(pi,-2.9,-316,0.3);}else{const K=U.K[pi];if(B.stompT>0&&B.stompT<0.25&&h.grounded){ZC.press(K.j);jumps++;}else U.hit(pi,e,i);}}if(RW.bow.k>=1&&bows===0){bows=1;Pr.lit=true;Y.lit=true;}}
  if(B.strikes.some(s=>!s.done&&s.fx&&s.fx.g.parent&&s.t>0.5))tele=1;
  if(i%20===0)SAMPLE();ZC.tick(1);}
U.rel(0);U.rel(1);if(B.phase<2.5)throw new Error('этап 2 не пройден: bows='+bows+' presses='+presses+' lit='+Pr.lit+' emb='+e.embers+' st='+e.state+' '+U.st());
const st=X.stats;for(const k of['toStorm','strikeWarn','strike','stomp'])if(!st[k])throw new Error('нет события '+k+' '+JSON.stringify(st));if(!tele)throw new Error('телеграф молнии не нарисован');
U.nocine();ZC.tick(10);'phase2 ok jumps='+jumps+' t='+(ZC.G.time-t0).toFixed(0)+' vis='+VIS.bad+'/'+VIS.n
//@@
// этап 3: Пушок; дорожка к батюшке, пока он стоит
const W=ZC.W,H=ZC.HERO,B=W.ram32,e=B.e,LB=W.lamb32,SB=W.stogs.slice(-4),F=W.flags,X=ZC.FIN.s32fx;const Pr=H.proshka,Y=H.yosha;if(B.phase!==3)throw new Error('не этап 3: '+B.phase);
Pr.lit=true;Y.lit=false;const t0=ZC.G.time;let scares=0,was=0,guide=0;
for(let i=0;i<60*120&&!F.won;i++){for(const h of Object.values(H))if(h.active)h.iT=Math.max(h.iT,0.5);
  const S=SB.find(s=>s.gone<=0&&s.x<0)||SB.find(s=>s.gone<=0)||SB[0];const ready=WATER(S,i);
  if(B.ai==='stuck'||B.ai==='bonk'){U.step(0,e.pos.x+1.2,e.pos.z+2.2,0.4);if(X.guide&&X.guide.g.visible&&X.guide.k>0.5)guide=1;}else if(ready)U.step(0,S.x,S.z+(S.z<-316?-1.7:1.7),0.4);
  if(LB.scared>0&&!was)scares++;was=LB.scared>0;if(i%20===0)SAMPLE();ZC.tick(1);}
U.rel(0);U.rel(1);if(!F.won)throw new Error('этап 3 не пройден: ai='+B.ai+' lamb='+LB.pos.x.toFixed(1)+','+LB.pos.z.toFixed(1)+' ram='+e.pos.x.toFixed(1)+','+e.pos.z.toFixed(1)+' scares='+scares+' '+U.st());
if(!X.stats.scared&&scares)throw new Error('нет события scared');
'phase3 ok scares='+scares+' guide='+guide+' t='+(ZC.G.time-t0).toFixed(0)+' vis='+VIS.bad+'/'+VIS.n+' worst='+VIS.worst.toFixed(2)
//@@ shot=sky32fx_finale.png wait=300
ZC.tick(400);
//@@
const W=ZC.W,F=W.flags,X=ZC.FIN.s32fx;U.nocine();ZC.tick(20);
if(W.camFn)throw new Error('камера боя осталась после финала');
for(const o of[X.lane&&X.lane.g,X.stars&&X.stars.g,X.ring&&X.ring.g,X.tgt&&X.tgt.g,X.stomp&&X.stomp.g])if(o&&o.visible)throw new Error('эффект боя остался после финала');
if(document.getElementById('bossbar').style.display!=='none')throw new Error('полоса босса осталась после финала');
if(VIS.n<30)throw new Error('мало замеров кадра: '+VIS.n);if(VIS.bad>VIS.n*0.15)throw new Error('герои/Баран выходят из кадра: '+VIS.bad+' из '+VIS.n+', хуже всего '+VIS.worst.toFixed(2));
const L4=W.items.filter(i=>i.kind==='link').pop();const r=[U.goto(0,L4.pos.x,L4.pos.z,6)];ZC.tick(240);
if(ZC.W.levelId==='3-2'&&!ZC.G.done['3-2'])throw new Error('уровень не пройден: link='+L4.taken+' stage='+F.stage+' '+U.st());
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'3-2 boss fx done '+r+' errs=0 vis='+VIS.bad+'/'+VIS.n+' lvl='+ZC.W.levelId
