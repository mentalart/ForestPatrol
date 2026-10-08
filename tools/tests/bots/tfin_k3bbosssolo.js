//@@ wait=1500
// 3-Б «Соловей-Разбойник» — бой в одиночку (клавиши Игрока 1, Q — по кругу Прошка → Потап → Пелагея → Йоша), оставленный держит:
// 1 — Потап поднимает щит у дуба, Q к Йоше (Потап держит щит), Йоша — в клюв; дуб кланяется сам — за хвост; 2 — перо горит у оставленного,
// щитом зайчик в глаза; 3 — Потап у колокола (звонит сам), в вихрь — кем играешь, наклоны; 4 — Потап держит щит, Прошка — в золотой (в одиночку
// настоящий жёлудь чуть светится и без взора); мах одним засчитан. Проверка: проходится одним игроком.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,200));_ce.apply(console,arguments);};}
ZC.FIN.k3les={auto:false};ZC.setSolo(true);ZC.startFrom(ZC.LV('3-B'));ZC.G.manual=true;ZC.tick(10);U.nocine();ZC.tick(5);
window.D=ZC.W.warp3b('boss1');ZC.tick(5);U.nocine();ZC.tick(30);window.H=ZC.HERO;window.IMM=()=>Object.values(H).forEach(h=>{h.iT=Math.max(h.iT,0.5);});
window.ME=()=>U.me();window.FACE=p=>{const h=U.me();h.face=Math.atan2(p.x-h.pos.x,p.z-h.pos.z);};
window.JUMP=()=>{const h=U.me();for(const w of D.waves){if(w.kind!=='low'&&w.kind!=='dark')continue;const d=Math.hypot(h.pos.x-w.src.x,h.pos.z-w.src.z)-w.r;if(d>0.4&&d<1.4&&h.grounded){ZC.press('Space');return true;}}return false;};
window.HITSOL=(i)=>{const s=D.sol,h=U.me();if(U.step(0,s.pos.x-1.4,s.pos.z+1.6,1.0)){U.rel(0);FACE(s.pos);if(i%9===0)ZC.press('KeyF');}};
window.LOOP=(fn,max)=>{for(let i=0;i<(max||60)*60;i++){if(fn(i))return 't='+(i/60).toFixed(1);ZC.tick(1);}U.rel(0);ZC.hold('KeyG',false);return 'TIMEOUT';};
['solo='+ZC.G.solo,D.F.phase,U.toKind('potap'),_errs.length].join(' ')
//@@
// этап 1: Потап с щитом у дуба — Q к Йоше: оставленный Потап держит щит; Йоша в его тени плещет в клюв; дуб кланяется — за хвост
const r=[];let chokes=0,tails=0,held=0;
r.push(LOOP(i=>{IMM();const S1=D.S1,s=D.sol;if(D.F.phase!==1)return true;
  if(s.state==='broken'||s.dazeT>0){ZC.hold('KeyG',false);HITSOL(i);return false;}
  if(S1.sw){ZC.hold('KeyG',S1.sw.h===U.me());return false;}
  if(S1.bow&&S1.bow.k>=0.85){const p=D.tailHit.pos;ZC.hold('KeyG',false);if(U.step(0,p.x,p.z,1.2)){U.rel(0);FACE(p);if(i%9===0){ZC.press('KeyF');tails++;}}return false;}
  if(S1.bow)return false;
  const O=D.OAKS[S1.perch],a=O.a,px=Math.cos(a)*6,pz=-14+Math.sin(a)*6;const P=H.potap,Y=H.yosha;
  if(ME().kind==='potap'){ZC.hold('KeyG',true);if(U.step(0,px,pz,0.8)){U.rel(0);FACE(O.src);if(i%30===0)U.toKind('yosha');}return false;}
  if(P.guard)held++;
  if(ME().kind!=='yosha'){U.toKind('yosha');return false;}
  ZC.hold('KeyG',false);if(!JUMP())U.step(0,P.pos.x-Math.cos(a)*1.3,P.pos.z-Math.sin(a)*1.3,0.5);
  if(S1.inh&&!S1.inh.wet&&S1.inh.t>0.15&&Math.hypot(Y.pos.x-O.src.x,Y.pos.z-O.src.z)<8.5){ZC.press('KeyE');chokes++;}
  if(Math.hypot(P.pos.x-px,P.pos.z-pz)>2.5&&!S1.inh&&i%40===0)U.toKind('potap');
  return false;},240));
U.rel(0);ZC.hold('KeyG',false);r.push('chokes='+chokes,'tails='+tails,'heldShield='+held,'ph='+D.F.phase,'errs='+_errs.length+' '+_errs.slice(0,2).join(' / '));
if(D.F.phase<1.5||!held)throw new Error('этап 1 (соло): '+r.join(' | '));r.join(' | ')
//@@
// этап 2: зажечь перо (оставленный держит свет), Q к Потапу — щит, зайчик в глаза; упал — светить самому и бить
const r=[U.cine(400)];ZC.tick(20);U.nocine();ZC.tick(10);let dz=0;
r.push(U.toKind('pelageya'));if(!H.pelageya.lit)U.tap('KeyR');ZC.tick(3);r.push('lit='+H.pelageya.lit);
r.push(LOOP(i=>{IMM();const S2=D.S2,s=D.sol,P=H.potap,Pe=H.pelageya;if(D.F.phase!==2)return true;
  if(s.state==='broken'){ZC.hold('KeyG',false);if(!ME().lit&&i%20===0)ZC.press('KeyR');HITSOL(i);return false;}
  if(s.dazeT>0){dz++;ZC.hold('KeyG',false);if(!ME().lit&&i%20===0)ZC.press('KeyR');HITSOL(i);return false;}
  if(!Pe.lit){if(ME().kind!=='pelageya'){U.toKind('pelageya');return false;}if(i%15===0)ZC.press('KeyR');return false;}
  if(ME().kind!=='potap'){if(ME().kind==='pelageya'&&S2.st==='perch'){U.step(0,-14*0+0,-12,0.6);}U.toKind('potap');return false;}
  const O=D.OAKS[S2.perch];if(Math.hypot(P.pos.x-Pe.pos.x,P.pos.z-Pe.pos.z)>2.6){ZC.hold('KeyG',false);U.step(0,Pe.pos.x+0.8,Pe.pos.z+1.2,0.6);return false;}
  U.rel(0);ZC.hold('KeyG',true);FACE(O);JUMP();return false;},240));
U.rel(0);ZC.hold('KeyG',false);r.push('dz='+dz,'ph='+D.F.phase,'errs='+_errs.length+' '+_errs.slice(0,2).join(' / '));if(D.F.phase<2.5)throw new Error('этап 2 (соло): '+r.join(' | '));r.join(' | ')
//@@
// этап 3: Потап к колоколу (оставленный звонит сам), Q — Пелагея в вихрь; наклоны против крена
const r=[U.cine(400)];ZC.tick(20);U.nocine();ZC.tick(10);let rides=0,banks=0,last=null,bells=0;const B=D.BELL;
r.push(U.toKind('potap'));r.push(U.goto(0,B.x-1.6,B.z+0.6,10,0.6));r.push(U.toKind('pelageya'));
r.push(LOOP(i=>{IMM();const S3=D.S3,s=D.sol;if(D.F.phase!==3)return true;if(S3.ride&&S3.ride!==last){last=S3.ride;rides++;}
  if(s.state==='broken'||s.dazeT>0){ZC.hold('KeyA',false);ZC.hold('KeyD',false);HITSOL(i);return false;}
  const Rd=S3.ride;if(Rd){ZC.hold('KeyA',!!(Rd.bank&&Rd.bank.dir<0));ZC.hold('KeyD',!!(Rd.bank&&Rd.bank.dir>0));if(Rd.bank&&Rd.bank.t<0.02)banks++;return false;}
  if(ME().kind!=='pelageya'&&ME().kind!=='yosha'){U.toKind('pelageya');return false;}
  if(!S3.lift&&S3.st==='fly'){if(!JUMP())U.step(0,0,-14,0.3);}return false;},240));
U.rel(0);r.push('rides='+rides,'banks='+banks,'bells='+(D.BS.bells||0),'ph='+D.F.phase,'errs='+_errs.length+' '+_errs.slice(0,2).join(' / '));if(D.F.phase<3.5)throw new Error('этап 3 (соло): '+r.join(' | '));r.join(' | ')
//@@
// этап 4: Потап щит на выдохе (оставленный держит), Прошка на вдохе — в золотой; мах одним
const r=[U.cine(400)];ZC.tick(20);U.nocine();ZC.tick(10);let shots=0;const src=D.OAKS[3].src;
r.push(U.toKind('potap'));ZC.hold('KeyG',true);r.push(U.goto(0,src.x*0.5,(src.z+14)*0.5-14,8,0.8));ZC.tick(20);r.push(U.toKind('proshka'));
r.push(LOOP(i=>{IMM();const S4=D.S4,s=D.sol;if(D.F.phase!==4)return true;const h=ME(),P=H.potap;
  if(S4.st==='exhale'){const dx=P.pos.x-src.x,dz=P.pos.z-src.z,d=Math.hypot(dx,dz)||1;if(!JUMP())U.step(0,P.pos.x+dx/d*1.3,P.pos.z+dz/d*1.3,0.4);return false;}
  if(S4.st==='inhale'&&h.kind==='proshka'&&h.skillCd<=0){let best=null,bd=1e9;for(const A of D.acorns){if(!A.g.visible)continue;const dd=A.pos.distanceTo(h.pos);if(dd<bd){bd=dd;best=A;}}if(best&&best.i===S4.real){ZC.press('KeyE');shots++;}}return false;},240));
r.push('shots='+shots,'voices='+D.S4.voices,'held='+H.potap.guard);ZC.hold('KeyG',false);
r.push(LOOP(i=>{const s=D.sol;if(D.F.phase!==4.5)return true;HITSOL(i);return false;},20));
r.push('won='+!!D.F.won,'errs='+_errs.length+' '+_errs.slice(0,2).join(' / '));if(!D.F.won)throw new Error('этап 4 (соло): '+r.join(' | '));r.join(' | ')
//@@
// финал: песня (Пелагея прыгает в такт), конец уровня
const r=[];U.cine(400);ZC.tick(30);r.push('song='+!!ZC.W.song);for(let i=0;i<60*12&&ZC.W.song;i++){if(i%43===0)ZC.press('Space');ZC.tick(1);}U.cine(600);ZC.tick(60*5);
r.push('done='+!!ZC.G.done['3-B'],'errs='+_errs.length+' '+_errs.slice(0,3).join(' / '));if(!ZC.G.done['3-B']||_errs.length)throw new Error('финал (соло): '+r.join(' | '));'3-B boss solo done '+r.join(' | ')
