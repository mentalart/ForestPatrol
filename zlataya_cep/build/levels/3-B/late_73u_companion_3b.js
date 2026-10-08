/* ============================== РЕЛИЗ final06 · 3-Б «СОЛОВЕЙ-РАЗБОЙНИК»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Бот ведёт героев Игрока 2: Йоша (живая вода, плеск в клюв, окна — бить) и Пелагея (щит-«зайчик», вихрь-родео, Совиный взор, песня). Состояние боя — W.dbg3b(), подход — W.flags.rd.
// Подход (положения — из late_99w_k3b_road.js, z убывает к гнезду): колоду откатывает Потап (бот ждёт за ней); Йоша поливает тропку; лепестки и деревья — мосты после свиста: ждёт у края и бежит, пока мост держится;
// подворотню держит Потап — бот проходит и встаёт на плиту, пока Потап не пройдёт; островки — прыжками, зигзаг по уступам дуба — в паузах между свистами; калитку в ободе раздвигает Потап.
// Бой: защита — прыжок через белую/фиолетовую волну, щит на синюю, Богатырский щит вдвоём в долю; этап 1 — плеск в клюв, корни, хвост, окна; этап 2 — Йоша светит в центре гнезда, Пелагея щитом ловит «зайчик»
// на дуб с Соловьём (сам по себе, без Потапа), упал — Йоша в свете бьёт; этап 3 — в вихрь, родео (наклон против крена), упал — бьёт; этап 4 — Совиный взор во вдох; общий мах; песня Пелагеи.
// Потап (откатить колоду, держать подворотню и калитку, звонить в колокол), Прошка (рогатка по золотому жёлудю) — дело человека.
const K3B={w:null};
CMP.k3b=K3B;
const k3b=()=>{if(K3B.w!==W){Object.assign(K3B,{w:W,jt:0,at:0,sk:0,gd:0,ci:0,gw:0,gt:0,tr:0,rg:0,sg:{},sf:0,s2:0});}return K3B;};
const k3bRD=()=>W.flags.rd;
const k3bD=()=>W.dbg3b&&W.dbg3b();
const k3bTap=(K,k,gap,act)=>{if(!(K[k]>G.time-gap)){K[k]=G.time;cmpTap(act);return true;}return false;};
const K3B_C={x:0,z:-14};
// подойти и бить Соловья, когда достаёшь
function k3bStrike(K,h,e){const [tx,tz]=cmpPos(e,h),bd=hd(e.pos,h.pos);cmpGoto(h,tx,tz,0.3);
  if(bd<=h.d.range*0.9+(e.r||1.2)+0.2){h.face=Math.atan2(e.pos.x-h.pos.x,e.pos.z-h.pos.z);k3bTap(K,'at',0.42,'attack');}}
// защита героя на арене: прыжок через белую/фиолетовую волну у ног, щит на синюю, Богатырский щит в долю; true — кадр занят (стоять)
function k3bDef(K,h,D,noGuard){let jump=false,guard=false;
  for(const w of D.waves){if(w.hit.has(h))continue;const d=Math.hypot(h.pos.x-w.src.x,h.pos.z-w.src.z)-w.r;
    if((w.kind==='low'||w.kind==='dark')&&d>0.25&&d<1.5)jump=true;if(w.kind==='high'&&d>-0.4&&d<7)guard=true;}
  if(D.cring.on){if(D.cring.t>=1.27&&D.cring.press[1]===null)k3bTap(K,'rg',0.3,'guard');return true;}
  if(jump&&h.grounded)k3bTap(K,'jt',0.45,'jump');
  if(guard&&!noGuard)cmpKey('guard',true);
  return false;}
// ступени подъёма по дубу-сторожу: [x, z, ждать ли свиста]
const K3B_OAK=[[-7.2,44.4],[-6.6,42.2],[0,42,1],[7.4,42],[7.6,39],[0,39,1],[-7.4,39],[-7.6,36],[0,36,1],[7.4,36],[7.6,33],[0,33,1],[-7.4,33],[-8,30],[-8,10]];
const K3B_ISL=[[-1.4,67.2],[1.2,63.9],[-1.2,60.6],[1.4,57.3]];
CMP.route('3-B',[
  // колода поперёк дорожки: откатывает Потап (человек); бот ждёт у колоды
  {id:'log',done:()=>{const R=k3bRD();return !R||R.bigLog.done||active(1).pos.z<149;},run:h=>{k3b();if(!cmpWant('yosha'))return;cmpGoto(h,0,156,0.6);}},
  // травы-муравы: Йоша поливает тропку, идёт по ней
  {id:'grass',done:()=>{const R=k3bRD();return !R||(R.path&&active(1).pos.z<124)||active(1).pos.z<121;},run:h=>{const K=k3b(),R=k3bRD();if(!cmpWant('yosha'))return;
    if(!R.path){if(hd(h.pos,{x:0,z:141.2})>0.6){cmpGoto(h,0,141.2,0.4);return;}h.face=Math.PI;k3bTap(K,'sk',1.0,'skill');return;}cmpGoto(h,0,123,0.4);}},
  // лепестки: у края ждёт свиста, лепестки легли — бежит
  {id:'petals',done:()=>active(1).pos.z<109,run:h=>{k3b();const R=k3bRD();if(!cmpWant('yosha'))return;
    if(h.pos.z<120.4||R.petT>2.6){cmpGoto(h,0,107.5,0.4);return;}cmpGoto(h,0,122.4,0.4);}},
  // деревья: ждёт у первого ствола, упали — бежит по нему
  {id:'trees',done:()=>active(1).pos.z<94.6,run:h=>{const K=k3b(),R=k3bRD(),T0=R.TREES[0];if(!cmpWant('yosha'))return;
    if(h.pos.z<103.2){cmpGoto(h,-2.4,93.4,0.4);return;}
    if(T0.col.on&&T0.t>1.9){cmpGoto(h,-2.4,93.4,0.4);return;}cmpGoto(h,-2.4,104.4,0.4);}},
  // застава: ждёт, пока Потап откроет подворотню, проходит и встаёт на плиту — держит для Потапа, пока он не пройдёт; подушки обходит
  {id:'gate',done:()=>active(1).pos.z<77,run:h=>{const K=k3b(),R=k3bRD(),G2=R.gate;if(!cmpWant('yosha'))return;
    for(const P of R.pil){if(P.dead||P.t>P.dur)continue;const d=hd(P.to,h.pos);if(d<2.0){const dx=h.pos.x-P.to.x,dz=h.pos.z-P.to.z,l=Math.hypot(dx,dz)||1;cmpGoto(h,h.pos.x+dx/l*3,h.pos.z+dz/l*3,0.1);return;}}
    if(h.pos.z>88){cmpGoto(h,0,87,0.5);return;}
    if(h.pos.z>82.8){if(G2.propped||G2.k>0.85){cmpGoto(h,4.4,79.6,0.4);K.gt=0;}else cmpGoto(h,0,86.4,0.5);return;}
    if(!K.gt)K.gt=G.time;
    if(!G2.propped&&HERO.potap.pos.z>81&&G.time-K.gt<30){cmpGoto(h,4.4,79.8,0.25);return;}
    cmpGoto(h,0,75.5,0.5);}},
  // облачные островки: прыжками с одного на другой; растаявший — подождать
  {id:'clouds',done:()=>active(1).pos.z<56&&active(1).pos.y>-8.6,run:h=>{const K=k3b(),R=k3bRD();if(!cmpWant('yosha'))return;
    const nx=R.ISL.findIndex(I=>I.z<h.pos.z-0.6);
    if(nx<0){cmpGoto(h,0,51,0.5);if(h.grounded&&h.pos.z<57.4)k3bTap(K,'jt',0.5,'jump');return;}
    const I=R.ISL[nx];if(!I.on){if(h.pos.z>70.5)cmpGoto(h,0,71,0.5);return;}
    const d=hd(h.pos,I);cmpGoto(h,I.x,I.z,0.35);if(h.grounded&&d<3.8&&d>1.7)k3bTap(K,'jt',0.5,'jump');}},
  // дуб-сторож: зигзагом по уступам; у середины уступа (за стволом) пережидает свист
  {id:'climb',done:()=>active(1).pos.z<10.6&&active(1).pos.y>-0.6,run:h=>{const K=k3b(),R=k3bRD();if(!cmpWant('yosha'))return;
    if(h.pos.y<-7.6&&K.ci>2&&h.pos.z<44.5)K.ci=0;                                                    // сорвалась с уступа — заново с первого
    const P=K3B_OAK[Math.min(K.ci,K3B_OAK.length-1)];
    if(hd(h.pos,{x:P[0],z:P[1]})<0.5){if(P[2]){const md=Math.hypot(h.pos.x-K3B_C.x,h.pos.z-K3B_C.z);if(R.tellOn||(R.wave&&R.wave.r<md+1)||R.whT<2.8)return;}K.ci=Math.min(K.ci+1,K3B_OAK.length-1);return;}
    cmpGoto(h,P[0],P[1],0.45);}},
  // обод: ждёт у калитки, пока Потап её раздвинет, входит — ролик
  {id:'rim',first:false,done:()=>{const R=k3bRD();return !R||R.introDone||W.flags.phase>=1;},run:h=>{k3b();if(!cmpWant('yosha'))return;
    // уступ-ветка (x −10…−6, z ≥ 8) и площадка у гнезда (x ≥ −6, z ≤ 8) сходятся углом (−6, 8): по ветке вниз до (−8, 10), потом по диагонали z + x = 2 — через угол
    if(h.pos.x<-5.8&&h.pos.z>8.0){if(h.pos.z>10.3&&h.pos.x<-7){cmpGoto(h,-8,10,0.1);return;}const tx=h.pos.x+1.0;cmpGoto(h,tx,2-tx,0.02);return;}
    if(W.gateOn3b&&W.gateOn3b()){cmpGoto(h,0,2.8,0.5);return;}cmpGoto(h,0,-6,0.6);}}
]);
