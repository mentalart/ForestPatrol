//@@ key=KeyX
// релиз final06, 4-Б «Змей Горыныч» в одиночном режиме — бой целиком настоящими нажатиями одного игрока (клавиши Игрока 1), без отладочных побед.
// Фаза 1: Пелагея — Совиный взор на левую, удар по чешуйке, через 9 с взор на правую, удар (обе в Пробое за 12 с) → ролик рыка.
// Фаза 2: взор — на боковую голову, Прошка — жёлудь в пасть средней на её вдохе, взор — на третью; на большом вдохе — щит.
// Фаза 3: узда — Потап клещами, затем Пелагея клещами с другой стороны (Потап идёт следом), к кольцу на шее и «раз-два-три».
// Удары голов отбиваются щитом в последний миг, от красного — кувырок. Ролики и обучение пропускаются (как может игрок). Проверка: босс проходится одним.
Math.random=(()=>{let q=777;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
ZC.setSolo(true);window.G4=ZC.FIN.gor4;window.KY={u:'KeyW',d:'KeyS',l:'KeyA',r:'KeyD',a:'KeyF',g:'KeyG',sw:'KeyQ',ro:'ShiftLeft',sk:'KeyE',it:'KeyR'};
window.me=()=>{const p=ZC.players[ZC.G.soloPi];return p.heroes[p.act];};window.heads=()=>ZC.W.enemies.filter(e=>e.kind==='golova').sort((a,b)=>a.idx-b.idx);
window.hdist=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);window.awake=e=>e&&e.alive&&e.state!=='broken';
window.moveTo=(x,z,stop)=>{const h=me(),dx=x-h.pos.x,dz=z-h.pos.z,d=Math.hypot(dx,dz),go=d>(stop||1.2);ZC.hold(KY.l,go&&dx<-0.25);ZC.hold(KY.r,go&&dx>0.25);ZC.hold(KY.u,go&&dz<-0.25);ZC.hold(KY.d,go&&dz>0.25);return d;};
window.stopMove=()=>[KY.l,KY.r,KY.u,KY.d].forEach(k=>ZC.hold(k,false));
window.S={att:0,sw:0,sk:0,it:0,log:[],downs:0,prevDown:false,owls:0,acorns:0,path:null,pi:0,ph:-1,t0:0,grab:0};
window.lg=s=>{S.log.push((ZC.G.time-S.t0).toFixed(0)+'s '+s);};
window.face=p=>{const h=me();h.face=Math.atan2(p.x-h.pos.x,p.z-h.pos.z);};
window.hitAt=p=>{face(p);if(ZC.G.time>S.att){S.att=ZC.G.time+0.42;ZC.press(KY.a);}};
window.want=kind=>{if(me().kind===kind)return true;if(ZC.G.time>S.sw){S.sw=ZC.G.time+0.35;ZC.press(KY.sw);}return false;};
window.defend=()=>{const h=me();let did=false;
  for(const e of ZC.W.enemies){if(!e.alive||e.state!=='wind'||e.tgt!==h)continue;const left=e.wdur-e.t;if(e.sig==='red'){if(left<0.2&&h.rollT<=0){ZC.press(KY.ro);did=true;}}else if(left<0.13&&e.left===null){ZC.press(KY.g);did=true;}}
  for(const b of ZC.W.bolts)if(b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2){ZC.press(KY.g);did=true;}return did;};
window.owlAt=e=>{if(!want('pelageya'))return false;face(e.pos);if(ZC.players[1].owlCd<=0&&ZC.G.time>S.sk){S.sk=ZC.G.time+0.5;ZC.press(KY.sk);S.owls++;lg('взор → '+['левая','средняя','правая'][e.idx]);}return true;};
window.stepAI=()=>{const G=ZC.G,W=ZC.W,F=W.flags,h=me();
  if(G.cine){stopMove();ZC.hold(KY.g,false);ZC.skip();return;}if(G.state!=='play'||W.levelId!=='4-B')return;
  const down=ZC.players[G.soloPi].downed;if(down&&!S.prevDown)S.downs++;S.prevDown=down;if(down){stopMove();return;}
  if(F.phase!==S.ph){lg('фаза '+F.phase);S.ph=F.phase;}
  const hs=heads();if(!hs.length)return;const [L,M,R]=hs;
  // большой вдох — держим щит (жёлудь можно и со щитом)
  const pulling=G4.pull>0&&F.phase===2;ZC.hold(KY.g,pulling);if(pulling){stopMove();if(me().kind==='proshka'&&F.longInh>0&&awake(M)){face(M.pos);if(G.time>S.sk){S.sk=G.time+0.5;ZC.press(KY.sk);S.acorns++;}}return;}
  if(defend())return;
  if(F.phase===1||F.phase===2){
    // чешуйка горит — бьём её
    const w=G4.weak[0];if(w&&awake(w.e)){const e=w.e,tp={x:e.pos.x+Math.sin(e.face)*1.6,z:e.pos.z+Math.cos(e.face)*1.6+0.6};const d=moveTo(tp.x,tp.z,0.5);if(hdist(h.pos,e.pos)<3.4)hitAt(e.pos);return;}
    if(F.phase===2&&awake(M)&&F.longInh>0){if(want('proshka')){stopMove();face(M.pos);if(G.time>S.sk){S.sk=G.time+0.5;ZC.press(KY.sk);S.acorns++;lg('жёлудь');}}return;}
    const side=[L,R].filter(e=>awake(e)),cand=F.phase===1?side:side.concat(awake(M)&&F.longInh<=0&&F.inhT>6?[M]:[]);
    if(cand.length&&ZC.players[1].owlCd<=0){const e=cand[0];const d=moveTo(e.pos.x,e.pos.z+5.5,1.5);if(d<3.5)owlAt(e);else want('pelageya');return;}
    // ждём: стоим перед головами, на средней — подальше от плевков
    if(F.phase===2&&awake(M)&&(F.inhT<3||F.longInh>0))want('proshka');else want('pelageya');moveTo(0,-2.5,1.4);return;}
  if(F.phase===3){const BR=W.gor4L.BR,bp=BR.pos,H=BR.holders;
    if(!H[0]){if(!want('potap'))return;const d=moveTo(bp.x+1.6,bp.z+0.2,0.5);if(hdist(h.pos,bp)<1.9&&G.time>S.it){S.it=G.time+0.5;ZC.press(KY.it);lg('узда: Потап взял');}return;}
    if(!H[1]){if(!want('pelageya'))return;const d=moveTo(bp.x+0.2,bp.z+1.8,0.5);if(hdist(h.pos,bp)<1.9&&G.time>S.it){S.it=G.time+0.5;ZC.press(KY.it);lg('узда: Пелагея взяла');}return;}
    // несём к шее: между левой и средней головой, за них
    if(!S.path)S.path=[[-2.6,-6.5],[-2.6,-12.6],[1.0,-12.9]];const p=S.path[0];const d=moveTo(p[0],p[1],0.5);if(d<0.6&&S.path.length>1)S.path.shift();
    const near=hdist(bp,{x:0,z:-12.6})<3;if(near&&S.path.length===1){stopMove();if(G.time>S.sk){S.sk=G.time+0.6;ZC.press(KY.sk);lg('раз-два-три');}}return;}};
ZC.startFrom(ZC.LV('4-B'));ZC.G.manual=true;ZC.G.flags.tut4b=null;ZC.tick(30);S.t0=ZC.G.time;['solo='+ZC.G.solo,ZC.W.name]
//@@
// бой: до 6 минут игрового времени
const t0=ZC.G.time;let n=0;while(n<60*360){window.stepAI();ZC.tick(1);n++;if(ZC.W.flags.won||ZC.W.levelId!=='4-B')break;}
const F=ZC.W.flags;['won='+!!F.won,'phase='+F.phase,'sec='+(n/60).toFixed(0),'downs='+S.downs,'owls='+S.owls,'acorns='+S.acorns,'stats='+JSON.stringify(G4.stats),'log='+S.log.slice(-30).join(' | ')]
//@@
// концовка: ролик и выход на Лукоморье
let n=0;while(n<60*60&&ZC.W.levelId==='4-B'){if(ZC.G.cine)ZC.skip();ZC.tick(2);n++;}ZC.setSolo(false);[ZC.W.levelId,'done='+!!(ZC.G.done&&ZC.G.done['4-B'])]
