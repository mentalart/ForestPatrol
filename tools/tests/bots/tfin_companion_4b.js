//@@ wait=1500
// релиз final06: напарник-бот идёт путём Игрока 2 в 4-Б «Змей Горыныч»: правую голову держит он — Пелагея Совиным взором зажигает слабое место и бьёт, когда человек уже сломал соседей, от замаха — щит / кувырок, на большом вдохе — щит,
// сытую при отдыхающем взоре гасит Йоша; узду берёт вторыми клещами, идёт рядом с человеком к шее и жмёт «раз-два-три» вместе с ним. Человека (Игрок 1) играет скрипт: левая голова, жёлудь в среднюю на долгом вдохе, щит Потапа, узда.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0])+' '+String(a[1]&&a[1].stack||a[1]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.H=ZC.HERO;window.F=()=>ZC.W.flags;window.G4=ZC.FIN.gor4;window.UZ=ZC.FIN.uzda;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1)+(h.carry&&!h.carry.gone?'+'+h.carry.kind:'');
window.heads=()=>ZC.W.enemies.filter(e=>e.kind==='golova').sort((a,b)=>a.idx-b.idx);
window.awake=e=>e&&e.alive&&e.state!=='broken';
window.RESET4B=()=>{for(let t=0;t<4;t++){ZC.startFrom(ZC.LV('4-B'));ZC.G.manual=true;ZC.tick(30);if(ZC.W.levelId==='4-B')break;}ZC.FIN.boss4b.auto=false;for(let i=0;i<30&&ZC.G.cine;i++){ZC.skip();ZC.tick(10);}U.nocine();ZC.tick(5);CO.set(true);CO.skill=1;ZC.tick(20);window.H=ZC.HERO;window.S={att:0,sk:0,sw:0,it:0};return F().phase;};
// ---- человек (Игрок 1): клавиши Игрока 1 ----
window.hm=(x,z,stop)=>{const h=me(),dx=x-h.pos.x,dz=z-h.pos.z,d=Math.hypot(dx,dz),go=d>stop;ZC.hold('KeyA',go&&dx<-0.25);ZC.hold('KeyD',go&&dx>0.25);ZC.hold('KeyW',go&&dz<-0.25);ZC.hold('KeyS',go&&dz>0.25);return d;};
window.hstop=()=>['KeyA','KeyD','KeyW','KeyS','KeyG'].forEach(k=>ZC.hold(k,false));
window.hwant=kind=>{if(me().kind===kind)return true;if(ZC.G.time>S.sw){S.sw=ZC.G.time+0.4;ZC.press('KeyQ');}return false;};
window.hdef=()=>{const h=me();let did=false;for(const e of ZC.W.enemies){if(!e.alive||e.state!=='wind'||e.tgt!==h)continue;const left=e.wdur-e.t;if(e.sig==='red'){if(left<0.2&&h.rollT<=0){ZC.press('ShiftLeft');did=true;}}else if(left<0.13&&e.left===null){ZC.press('KeyG');did=true;}}
  for(const b of ZC.W.bolts)if(b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2){ZC.press('KeyG');did=true;}return did;};
window.hfight=(e)=>{const h=me();const tp={x:e.pos.x+Math.sin(e.face)*1.8,z:e.pos.z+Math.cos(e.face)*1.8+0.5};hm(tp.x,tp.z,0.5);const open=(e.state==='stagger'&&!e.openHit)||e.state==='broken'||e.open>0||e.dazeT>0;
  if(Math.hypot(h.pos.x-e.pos.x,h.pos.z-e.pos.z)<3.3&&open&&ZC.G.time>S.att){h.face=Math.atan2(e.pos.x-h.pos.x,e.pos.z-h.pos.z);S.att=ZC.G.time+0.42;ZC.press('KeyF');}};
// фазы 1–2: Игрок 1 — левая голова; жёлудь Прошки в среднюю на долгом вдохе; щит на большом вдохе; в фазе 3 — узда
window.HUMAN=()=>{const W=ZC.W,F2=W.flags,hs=heads();if(ZC.G.cine){hstop();return;}if(!hs.length||F2.phase<1)return;const [L,M,R]=hs;
  if(F2.phase===3)return HUMAN3();
  if(hdef())return;
  if(F2.phase===2&&G4.pull>0){hstop();ZC.hold('KeyG',true);return;}ZC.hold('KeyG',false);
  if(F2.phase===2&&awake(M)&&F2.longInh>0){if(hwant('proshka')){hstop();me().face=Math.atan2(M.pos.x-me().pos.x,M.pos.z-me().pos.z);if(ZC.G.time>S.sk){S.sk=ZC.G.time+0.5;ZC.press('KeyE');}}return;}
  if(awake(L)){hwant('proshka');hfight(L);return;}
  hstop();hm(-3,-2.5,1.2);};
window.HUMAN3=()=>{const W=ZC.W,BR=W.gor4L.BR,h=me(),bp=BR.pos,Hd=BR.holders;
  if(!Hd[0]){if(!hwant('potap'))return;hm(bp.x+1.6,bp.z+0.2,0.5);if(Math.hypot(h.pos.x-bp.x,h.pos.z-bp.z)<1.9&&ZC.G.time>S.it){S.it=ZC.G.time+0.5;ZC.press('KeyR');}return;}
  if(!Hd[1]){hstop();return;}
  if(!S.path)S.path=[[-2.6,-6.5],[-2.6,-12.6],[1.0,-12.9]];const p=S.path[0];hm(p[0],p[1],0.5);if(Math.hypot(h.pos.x-p[0],h.pos.z-p[1])<0.7&&S.path.length>1)S.path.shift();
  const near=Math.hypot(bp.x-0,bp.z+12.6)<3;if(near&&S.path.length===1){hstop();if(UZ.got[1]&&!UZ.got[0]&&ZC.G.time>S.sk){S.sk=ZC.G.time+0.3;ZC.press('KeyE');}else if(!UZ.got[0]&&!UZ.got[1]&&ZC.G.time>S.sk+1.5){S.sk=ZC.G.time;ZC.press('KeyE');}}};
RESET4B();
['phase='+F().phase,'bot='+pos(bot()),'me='+pos(me()),CO.mode,!!CO.routes['4-B'],'heads='+heads().map(e=>e.state+':'+e.pi).join(',')]
//@@
// фаза 1: человек бьёт левую, бот — правую (взор, слабое место, удар после Пробоя соседа); обе в Пробое — фаза 2
if(!CO.routes['4-B'])throw new Error('нет маршрута 4-B');const W=ZC.W,F2=F();const L=[];let lm='';
for(let i=0;i<60*150&&F2.phase===1;i++){HUMAN();ZC.tick(1);if(CO.mode!==lm){L.push((i/60).toFixed(0)+'s '+CO.mode+' '+pos(bot()));lm=CO.mode;}
  if(i%420===0)L.push('  '+(i/60).toFixed(0)+' bot='+pos(bot())+' me='+pos(me())+' heads='+heads().map(e=>e.state[0]+e.embers).join(',')+' owlCd='+(ZC.players[1].owlCd||0).toFixed(1)+' weak='+G4.weak.length+' pet='+ZC.players[0].petals+','+ZC.players[1].petals);}
hstop();if(F2.phase===1)throw new Error('фаза 1 не пройдена: heads='+heads().map(e=>e.state+':'+e.embers).join(',')+' bot='+pos(bot())+' '+CO.mode+' '+L.slice(-5).join(' | '));
'phase1 ok → phase '+F2.phase+' stats='+JSON.stringify(G4.stats)
//@@
// фаза 2: вдох, сытые головы, большой вдох (щит), жёлудь Прошки в среднюю, слабое место на правой; все три в Пробое — фаза 3
const W=ZC.W,F2=F();const L=[];let lm='',pulls=0,lp=0;
for(let i=0;i<60*360&&F2.phase===2;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);continue;}HUMAN();ZC.tick(1);if(CO.mode!==lm){L.push((i/60).toFixed(0)+'s '+CO.mode+' '+pos(bot()));lm=CO.mode;}
  if(G4.pull>0&&!lp)pulls++;lp=G4.pull>0?1:0;
  if(i%600===0)L.push('  '+(i/60).toFixed(0)+' bot='+pos(bot())+' me='+pos(me())+' heads='+heads().map(e=>e.state[0]+e.embers+(e.sat>0?'S':'')).join(',')+' owlCd='+(ZC.players[1].owlCd||0).toFixed(1)+' weak='+G4.weak.length+' pull='+G4.pull.toFixed(1)+' pet='+ZC.players[0].petals+','+ZC.players[1].petals);}
hstop();ZC.hold('KeyG',false);if(F2.phase===2)throw new Error('фаза 2 не пройдена: heads='+heads().map(e=>e.state+':'+e.embers+(e.sat>0?'S':'')).join(',')+' bot='+pos(bot())+' '+CO.mode+' '+L.slice(-6).join(' | '));
'phase2 ok → phase '+F2.phase+' pulls='+pulls+' stats='+JSON.stringify(G4.stats)
//@@
// фаза 3: человек берёт узду (Потап), бот — вторые клещи (Пелагея), несут к шее вместе, три счёта «раз-два-три»; Змей в узде
const W=ZC.W,F2=F();const L=[];let lm='';
for(let i=0;i<60*240&&!F2.won;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);continue;}HUMAN();ZC.tick(1);if(CO.mode!==lm){L.push((i/60).toFixed(0)+'s '+CO.mode+' '+pos(bot()));lm=CO.mode;}
  if(i%300===0)L.push('  '+(i/60).toFixed(0)+' bot='+pos(bot())+' me='+pos(me())+' holders='+W.gor4L.BR.holders.map(h=>h?h.kind:'-').join('/')+' beat='+UZ.beat+' ph='+F2.phase);}
hstop();if(!F2.won)throw new Error('узда не надета: phase='+F2.phase+' beat='+UZ.beat+' holders='+W.gor4L.BR.holders.map(h=>h?h.kind:'-').join('/')+' bot='+pos(bot())+' me='+pos(me())+' '+CO.mode+' '+L.slice(-6).join(' | '));
'phase3 ok won='+F2.won+' stats='+JSON.stringify(UZ.stats)
//@@
// финал: ролик, Лукоморье; ошибок в консоли нет
let n=0;while(n<60*90&&ZC.W.levelId==='4-B'){if(ZC.G.cine)ZC.skip();ZC.tick(2);n++;}
if(ZC.W.levelId==='4-B')throw new Error('уровень не завершён: '+F().phase+' '+CO.mode);if(window._errs.length)throw new Error('ошибки: '+window._errs.slice(0,3).join(' | '));
'end ok level='+ZC.W.levelId+' done='+!!(ZC.G.done&&ZC.G.done['4-B'])
//@@
// большой вдох: человек жёлудь не стреляет — вдохи идут один за другим; бот и человек держат щит, до пасти не дотягивает (ни одного «Ам!»)
RESET4B();const W=ZC.W,F2=F();W.bossNext();for(let i=0;i<60*30&&F2.phase<2;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(1);}
if(F2.phase!==2)throw new Error('нет фазы 2: '+F2.phase);for(let i=0;i<60*20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}
let pulls=0,lp=0,guardT=0,pullT=0;const pet0=ZC.players[1].petals;
for(let i=0;i<60*140&&pulls<2;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);continue;}
  // человек: левая голова и щит на тяге, без жёлудя
  const hs=heads();if(G4.pull>0){hstop();ZC.hold('KeyG',true);}else{ZC.hold('KeyG',false);if(!hdef()&&awake(hs[0])){hwant('proshka');hfight(hs[0]);}else hstop();}
  ZC.tick(1);for(const n of['proshka','potap'])H[n].iT=99;
  if(G4.pull>0&&!lp)pulls++;lp=G4.pull>0?1:0;if(G4.pull>0){pullT++;if(bot().guard)guardT++;}}
hstop();ZC.hold('KeyG',false);
if(pulls<1)throw new Error('большой вдох не случился: '+JSON.stringify(G4.stats)+' heads='+heads().map(e=>e.state).join(','));
if(guardT<pullT*0.6)throw new Error('бот не держит щит на тяге: '+guardT+'/'+pullT);if(ZC.players[1].petals<pet0)throw new Error('бота укусила средняя: лепестки '+pet0+' → '+ZC.players[1].petals);
'pull ok pulls='+pulls+' guard='+guardT+'/'+pullT+' petals='+ZC.players[1].petals+' bot='+pos(bot())
