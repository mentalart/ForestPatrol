//@@
// 3-Б «Соловей-Разбойник»: бой в четыре этапа вдвоём настоящими нажатиями (docs/26_solovei_boss.md)
// 1 свист: Йоша под щитом Потапа плещет в клюв, окно; второе дыхание — Богатырский щит, корни полить, за хвост; посох — отбить щитом
// 2 крик: перо Пелагеи + щит Потапа — «солнечный зайчик» в глаза; упал — в свете пера бить; звери-тени
// 3 шип: в вихрь — родео (наклоны против крена), петля — колокол на «БОМ»; шапку сорвали — окно
// 4 полный свист: выдох — за щитом Потапа, вдох — Совиный взор и рогатка в золотой жёлудь; три голоса — общий мах; песня; конец уровня
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,200));_ce.apply(console,arguments);};}
ZC.startFrom(ZC.LV('3-B'));ZC.G.manual=true;ZC.tick(10);U.nocine();ZC.tick(5);
window.D=ZC.W.warp3b('boss1');ZC.tick(5);U.nocine();ZC.tick(30);
window.H=ZC.HERO;window.IMM=()=>Object.values(H).forEach(h=>{h.iT=Math.max(h.iT,0.5);});
// одна строка защиты: прыгнуть через белую/фиолетовую волну у ног
window.JUMP=(pi)=>{const h=U.act(pi);for(const w of D.waves){if(w.kind!=='low'&&w.kind!=='dark')continue;const d=Math.hypot(h.pos.x-w.src.x,h.pos.z-w.src.z)-w.r;if(d>0.4&&d<1.4&&h.grounded){ZC.press(U.K[pi].j);return true;}}return false;};
window.NEAR=(pi,x,z,tol)=>U.step(pi,x,z,tol||0.6);
window.HITSOL=(pi,i)=>{const s=D.sol,h=U.act(pi);if(NEAR(pi,s.pos.x+(pi?1.4:-1.4),s.pos.z+1.6,1.0)){h.face=Math.atan2(s.pos.x-h.pos.x,s.pos.z-h.pos.z);if(i%9===pi*4)ZC.press(U.K[pi].a);}};
window.BOTH=(fn,max)=>{for(let i=0;i<(max||60)*60;i++){const r=fn(i);if(r)return 't='+(i/60).toFixed(1);ZC.tick(1);}U.rel(0);U.rel(1);return 'TIMEOUT';};
[D.F.phase,D.S1.st,U.toKind('potap',0),U.toKind('yosha',1),_errs.length].join(' ')
//@@
// этап 1, круг 1: Потап с щитом идёт к дубу, Йоша за ним; щёки дует — Йоша плещет в клюв
const r=[];let chokes=0,phase0=D.F.phase;
r.push(BOTH(i=>{IMM();const S1=D.S1,s=D.sol;if(D.F.phase!==1)return true;if(D.BS.half)return true;
  if(S1.st==='down'&&s.dazeT>0){ZC.hold('KeyG',false);ZC.hold('Period',false);HITSOL(0,i);HITSOL(1,i);return false;}
  if(S1.sw){const h=S1.sw.h;ZC.hold(h.player?'Period':'KeyG',true);return false;}
  const O=D.OAKS[S1.perch],a=O.a,px=Math.cos(a)*6,pz=-14+Math.sin(a)*6;const P=H.potap,Y=H.yosha;
  NEAR(0,px,pz,0.8);const bx=P.pos.x-Math.cos(a)*1.3,bz=P.pos.z-Math.sin(a)*1.3;if(!JUMP(1))NEAR(1,bx,bz,0.5);JUMP(0);
  ZC.hold('KeyG',D.F.tellHigh>0||S1.inh);if(S1.inh&&!S1.inh.wet&&S1.inh.t>0.15&&Math.hypot(Y.pos.x-O.src.x,Y.pos.z-O.src.z)<8.5){ZC.press('KeyL');chokes++;}
  return false;},90));
U.rel(0);U.rel(1);ZC.hold('KeyG',false);ZC.hold('Period',false);
r.push('chokes='+chokes,'emb='+D.sol.embers,'half='+D.BS.half,'ph='+D.F.phase,'zap='+D.BS.zap.toFixed(2),'errs='+_errs.length);r.join(' | ')
//@@ shot=k3bb_1.png
ZC.tick(1);
//@@
// этап 1, второе дыхание: Богатырский щит, корни, хвост
const r=[];let shields=0,roots=0,tails=0;const st0=ZC.G.stats.shields;
r.push(BOTH(i=>{IMM();const S1=D.S1,s=D.sol;if(D.F.phase!==1)return true;
  if(s.state==='broken'){HITSOL(0,i);return false;}
  if(S1.st==='down'&&s.dazeT>0){HITSOL(0,i);HITSOL(1,i);return false;}
  if(D.cring.on){const t=D.cring.t;if(t>1.22&&t<1.3){if(D.cring.press[0]===null)ZC.press('KeyG');if(D.cring.press[1]===null)ZC.press('Period');}return false;}
  if(S1.sw){const h=S1.sw.h;ZC.hold(h.player?'Period':'KeyG',true);return false;}else{ZC.hold('Period',false);}
  if(S1.bow){const B=S1.bow,O=B.O;if(!B.wet){if(NEAR(1,O.root.x,O.root.z,2.2)&&i%20===0){ZC.press('KeyL');roots++;}}
    if(B.k>=0.85){const p=D.tailHit;if(p&&NEAR(0,p.pos.x,p.pos.z,1.2)&&i%9===0){U.act(0).face=Math.atan2(p.pos.x-U.act(0).pos.x,p.pos.z-U.act(0).pos.z);ZC.press('KeyF');tails++;}}else NEAR(0,O.root.x*0.7,(O.root.z+14)*0.7-14,1);return false;}
  const O=D.OAKS[S1.perch],a=O.a,px=Math.cos(a)*6,pz=-14+Math.sin(a)*6;const P=H.potap,Y=H.yosha;NEAR(0,px,pz,0.8);if(!JUMP(1))NEAR(1,P.pos.x-Math.cos(a)*1.3,P.pos.z-Math.sin(a)*1.3,0.5);JUMP(0);
  ZC.hold('KeyG',D.F.tellHigh>0||!!S1.inh);   // во втором круге воду в клюв не льём — ждём поклона дуба
  return false;},150));
U.rel(0);U.rel(1);ZC.hold('KeyG',false);ZC.hold('Period',false);
r.push('shields+='+(ZC.G.stats.shields-st0),'roots='+roots,'tails='+tails,'ph='+D.F.phase,'errs='+_errs.length+' '+_errs.slice(0,2).join(' / '));
if(D.F.phase<1.5||!roots||!tails)throw new Error('этап 1 не пройден: '+r.join(' | '));r.join(' | ')
//@@
// этап 2: ночь; Пелагея светит, Потап щитом пускает «зайчик» в глаза; упал — в свете пера бить
const r=[U.cine(400)];ZC.tick(20);U.nocine();ZC.tick(10);r.push('ph='+D.F.phase,U.toKind('pelageya',1));let dz=0,beasts=0,relit=0;
r.push(BOTH(i=>{IMM();const S2=D.S2,s=D.sol,P=H.potap,Pe=H.pelageya;if(D.F.phase!==2)return true;if(!Pe.lit&&i%15===0){ZC.press('Semicolon');relit++;}
  beasts=Math.max(beasts,S2.beasts.filter(b=>b.alive).length);
  if(s.state==='broken'){ZC.hold('KeyG',false);HITSOL(0,i);NEAR(1,s.pos.x+1.2,s.pos.z+1.2,1);return false;}
  if(s.dazeT>0){ZC.hold('KeyG',false);NEAR(1,s.pos.x+1.0,s.pos.z+1.4,0.8);HITSOL(0,i);if(s.litNow&&i%9===4)ZC.press('Comma');return false;}
  if(S2.st==='down'||S2.st==='fall'){dz++;return false;}
  const O=D.OAKS[S2.perch];ZC.hold('KeyG',true);const tx=O.x*0.25,tz=-14+(O.z+14)*0.25;U.step(0,O.x,O.z,0.3);if(Math.hypot(P.pos.x-tx,P.pos.z-tz)<1.5)U.rel(0);
  if(!JUMP(1))NEAR(1,P.pos.x-Math.sin(P.face)*1.2,P.pos.z-Math.cos(P.face)*1.2,0.5);JUMP(0);return false;},180));
U.rel(0);U.rel(1);ZC.hold('KeyG',false);
const S2=D.S2;r.push('dz='+dz,'beasts='+beasts,'relit='+relit,'ph='+D.F.phase,'S2='+[S2.st,S2.perch,S2.spotOak,S2.spotK.toFixed(2),S2.hopCd.toFixed(1),S2.tilt.toFixed(1),D.sol.embers].join('/'),U.st(),'errs='+_errs.length+' '+_errs.slice(0,2).join(' / '));if(D.F.phase<2.5)throw new Error('этап 2 не пройден: '+r.join(' | '));r.join(' | ')
//@@ shot=k3bb_2.png
ZC.tick(1);
//@@
// этап 3: Пелагея — в вихрь, верхом: наклоны против крена; Потап у колокола — на «БОМ»
const r=[U.cine(400)];ZC.tick(20);U.nocine();ZC.tick(10);r.push('ph='+D.F.phase);let rides=0,banks=0,bells=0,hats=0,lastRide=null;
r.push(BOTH(i=>{IMM();const S3=D.S3,s=D.sol,B=D.BELL;if(D.F.phase!==3)return true;
  if(S3.ride&&S3.ride!==lastRide){lastRide=S3.ride;rides++;}
  if(s.state==='broken'){HITSOL(0,i);HITSOL(1,i);return false;}
  if(s.dazeT>0){HITSOL(0,i);HITSOL(1,i);return false;}
  const Rd=S3.ride;ZC.hold('ArrowLeft',!!(Rd&&Rd.bank&&Rd.bank.dir<0));ZC.hold('ArrowRight',!!(Rd&&Rd.bank&&Rd.bank.dir>0));if(Rd&&Rd.bank&&Rd.bank.t<0.02)banks++;
  if(!Rd&&!S3.lift&&S3.st==='fly'){if(!JUMP(1))NEAR(1,-14*0+0,-14,0.3);}
  if(NEAR(0,B.x-1.6,B.z+0.6,0.6)){const h=U.act(0);h.face=Math.atan2(B.x-h.pos.x,B.z-h.pos.z);if(Rd&&Rd.loop&&!Rd.loop.done&&Rd.loop.t>=Rd.loop.dur-0.04){ZC.press('KeyF');bells++;}}else JUMP(0);
  if(s.k3.cur.hatOff>0.5&&!s._hatSeen){s._hatSeen=1;hats++;}if(s.k3.cur.hatOff<0.5)s._hatSeen=0;
  return false;},200));
U.rel(0);U.rel(1);ZC.hold('ArrowLeft',false);ZC.hold('ArrowRight',false);
r.push('rides='+rides,'banks='+banks,'bells='+(D.BS.bells||0),'hats='+hats,'ph='+D.F.phase,'errs='+_errs.length+' '+_errs.slice(0,2).join(' / '));if(D.F.phase<3.5||!rides||!hats)throw new Error('этап 3 не пройден: '+r.join(' | '));r.join(' | ')
//@@ shot=k3bb_3.png
ZC.tick(1);
//@@
// этап 4: выдох — за щит Потапа; вдох — Прошка, Совиный взор, рогатка в золотой жёлудь; три голоса — общий мах
const r=[U.cine(400)];ZC.tick(20);U.nocine();ZC.tick(10);r.push('ph='+D.F.phase);let shots=0,owls=0,miss=0;const ex=[];
r.push(BOTH(i=>{IMM();const S4=D.S4,s=D.sol;if(D.F.phase!==4)return true;const src=D.OAKS[3].src;
  if(S4.st==='exhale'){if(U.act(0).kind!=='potap'&&i%10===0)ZC.press('KeyQ');ZC.hold('KeyG',U.act(0).kind==='potap');const P=H.potap;
    if(S4.t<0.05){const d=Math.hypot(H.pelageya.pos.x-src.x,H.pelageya.pos.z-src.z);ex.push(d.toFixed(1));}
    NEAR(0,src.x*0.5,(src.z+14)*0.5-14,0.8);if(!JUMP(1)){const dx=P.pos.x-src.x,dz=P.pos.z-src.z,d=Math.hypot(dx,dz)||1;NEAR(1,P.pos.x+dx/d*1.4,P.pos.z+dz/d*1.4,0.4);}return false;}
  if(S4.st==='inhale'){ZC.hold('KeyG',false);U.rel(0);U.rel(1);if(U.act(0).kind!=='proshka'&&i%8===0)ZC.press('KeyQ');if(U.act(1).kind==='pelageya'&&ZC.W.owlT<=0&&ZC.players[1].owlCd<=0){ZC.press('KeyL');owls++;}
    const h=U.act(0);if(h.kind==='proshka'&&h.skillCd<=0&&ZC.W.owlT>0){let best=null,bd=1e9;for(const A of D.acorns){if(!A.g.visible)continue;const d=A.pos.distanceTo(h.pos);if(d<bd){bd=d;best=A;}}if(best&&best.i===S4.real){ZC.press('KeyE');shots++;}}return false;}
  return false;},200));
ZC.hold('KeyG',false);U.rel(0);U.rel(1);
r.push('shots='+shots,'owls='+owls,'voices='+D.S4.voices,'ph='+D.F.phase,'exD='+ex.slice(0,4).join(','));
// общий мах: оба рядом и разом
r.push(BOTH(i=>{const s=D.sol;if(D.F.phase!==4.5)return true;const a=NEAR(0,s.pos.x-1.4,s.pos.z+1.6,0.8),b=NEAR(1,s.pos.x+1.4,s.pos.z+1.6,0.8);
  if(a&&b&&i%20===0){for(const pi of[0,1]){const h=U.act(pi);h.face=Math.atan2(s.pos.x-h.pos.x,s.pos.z-h.pos.z);}ZC.press('KeyF');ZC.press('Comma');}return false;},20));
U.rel(0);U.rel(1);r.push('won='+!!D.F.won,'errs='+_errs.length+' '+_errs.slice(0,2).join(' / '));if(!D.F.won)throw new Error('этап 4 не пройден: '+r.join(' | '));r.join(' | ')
//@@ shot=k3bb_4.png
ZC.tick(1);
//@@
// финал: ролик, песня (Пелагея прыгает в такт), ролик, конец уровня
const r=[];U.cine(400);ZC.tick(30);r.push('song='+!!ZC.W.song);for(let i=0;i<60*12&&ZC.W.song;i++){if(i%43===0)ZC.press('KeyM');ZC.tick(1);}U.cine(600);ZC.tick(60*5);
r.push('done='+!!ZC.G.done['3-B'],'state='+ZC.G.state,'errs='+_errs.length+' '+_errs.slice(0,3).join(' / '));if(!ZC.G.done['3-B']||_errs.length)throw new Error('финал: '+r.join(' | '));'3-B boss done '+r.join(' | ')
