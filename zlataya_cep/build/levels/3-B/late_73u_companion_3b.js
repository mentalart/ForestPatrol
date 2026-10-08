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
// этап 3: уйти от падающего пера, красной полосы пике, не наступить на змея
function k3bHaz(K,h,D){const S3=D.S3;
  const away=(px,pz)=>{const dx=h.pos.x-px,dz=h.pos.z-pz,l=Math.hypot(dx,dz)||1;cmpGoto(h,h.pos.x+dx/l*3,h.pos.z+dz/l*3,0.1);};
  for(const q of S3.darts){if(q.hit)continue;if(hd(q.spot,h.pos)<1.9){away(q.spot.x,q.spot.z);return true;}}
  const dv=S3.dive;if(dv&&dv.t<dv.d+0.9){const ax=h.pos.x-dv.P0.x,az=h.pos.z-dv.P0.z,bx=dv.P1.x-dv.P0.x,bz=dv.P1.z-dv.P0.z,u=clamp((ax*bx+az*bz)/(bx*bx+bz*bz),0,1),px=ax-bx*u,pz=az-bz*u,ds=Math.hypot(px,pz);
    if(ds<2.7){const l=ds||1;cmpGoto(h,h.pos.x+(ds<0.05?1:px/l)*3,h.pos.z+(ds<0.05?0:pz/l)*3,0.1);return true;}}
  for(const S of S3.snakes){const hp=S.segs[0].position;if(hd(hp,h.pos)<3.4&&h.grounded)k3bTap(K,'jt',0.5,'jump');}
  return false;}
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
    if(W.gateOn3b&&W.gateOn3b()){cmpGoto(h,0,2.8,0.5);return;}cmpGoto(h,0,-6,0.6);}},
  // ===== БОЙ =====
  // этап 1 «Свист»: Йоша у дуба с Соловьём — на вдох плеснуть в клюв; Богатырский щит в долю; корни и хвост; упал — бить; посох — щитом
  {id:'b1',first:true,done:()=>W.flags.phase>=1.5,run:h=>{const K=k3b(),D=k3bD();if(!D||D.F.phase!==1||G.cine||!D.sol)return 'follow';if(!cmpWant('yosha'))return;
    const S1=D.S1,sol=D.sol,O=D.OAKS[S1.perch],B=S1.bow;
    if(D.cring.on){k3bDef(K,h,D);return;}
    if(S1.sw&&S1.sw.h===h){cmpKey('guard',true);return;}
    if(sol.state==='broken'||(S1.st==='down'&&sol.dazeT>0)){k3bStrike(K,h,sol);k3bDef(K,h,D,true);return;}
    if(B&&B.t>=1.8){const rt=B.O.root;
      if(!B.wet){if(hd(h.pos,rt)>1.7)cmpGoto(h,rt.x,rt.z,1.2);else k3bTap(K,'sk',0.7,'skill');return;}
      if(B.k>=0.85){const p=D.tailHit.pos;cmpGoto(h,p.x,p.z,0.9);if(hd(h.pos,p)<1.7){h.face=Math.atan2(p.x-h.pos.x,p.z-h.pos.z);k3bTap(K,'at',0.4,'attack');}return;}
      cmpGoto(h,rt.x,rt.z,1.4);return;}
    const sp=[K3B_C.x+Math.cos(O.a)*6.4,K3B_C.z+Math.sin(O.a)*6.4],I=S1.inh,waitSplash=!!I&&!I.wet&&I.t<0.9;
    if(I&&!I.wet&&I.t>0.15&&hd(h.pos,O.src)<8.3)k3bTap(K,'sk',0.6,'skill');
    k3bDef(K,h,D,waitSplash);if(hd(h.pos,{x:sp[0],z:sp[1]})>0.6)cmpGoto(h,sp[0],sp[1],0.4);}},
  // этап 2 «Крик»: Йоша зажигает перо в центре гнезда, Пелагея рядом щитом «зайчик» на дуб с Соловьём; упал — Йоша (в свете) бьёт
  {id:'b2',first:true,done:()=>W.flags.phase>=2.5,run:h=>{const K=k3b(),D=k3bD();if(!D||D.F.phase!==2||G.cine||!D.sol)return 'follow';
    const S2=D.S2,sol=D.sol,Ye=HERO.yosha,Pe=HERO.pelageya,PL={x:1.2,z:K3B_C.z},PS={x:-0.9,z:K3B_C.z};
    if(sol.state==='broken'||(S2.st==='down'&&sol.dazeT>0)){if(!cmpWant('yosha'))return;k3bStrike(K,h,sol);return;}
    if(!Ye.lit||hd(Ye.pos,PL)>0.9){if(!cmpWant('yosha'))return;if(hd(h.pos,PL)>0.5)cmpGoto(h,PL.x,PL.z,0.35);else w3Lit(h,true);return;}
    if(!cmpWant('pelageya')){Ye.following=false;return;}
    Ye.following=false;const O=D.OAKS[S2.perch];
    if(D.waves.length||D.cring.on){if(k3bDef(K,h,D))return;}
    if(hd(h.pos,PS)>0.6){cmpGoto(h,PS.x,PS.z,0.4);return;}
    h.face=Math.atan2(O.x-h.pos.x,O.z-h.pos.z);cmpKey('guard',true);}},
  // этап 3 «Шип»: Пелагея в вихрь и верхом (наклон против крена); упал — бить; на полу уходит от пера, пике и змея
  {id:'b3',first:true,done:()=>W.flags.phase>=3.5,run:h=>{const K=k3b(),D=k3bD();if(!D||D.F.phase!==3||G.cine||!D.sol)return 'follow';if(!cmpWant('pelageya'))return;
    const S3=D.S3,sol=D.sol,Rd=S3.ride;
    if(Rd&&Rd.h===h){if(Rd.bank)cmpKey(Rd.bank.dir<0?'left':'right',true);return;}
    if(S3.lift||S3.st==='come')return;
    if(sol.state==='broken'||(S3.st==='down'&&sol.dazeT>0)){k3bStrike(K,h,sol);return;}
    if(k3bHaz(K,h,D))return;
    if(D.cring.on||D.waves.length){if(k3bDef(K,h,D))return;}
    cmpGoto(h,K3B_C.x,K3B_C.z,0.3);}},
  // этап 4 «Полный свист»: вдох — Совиный взор (Прошка стреляет); выдох — щит (ветер вполсилы), прыжок через трель; сдулся — бить вместе
  {id:'b4',first:true,done:()=>W.flags.phase>=5||!!W.flags.won,run:h=>{const K=k3b(),D=k3bD();if(!D||G.cine||!D.sol)return 'follow';const ph=D.F.phase;if(ph<4||ph>=5)return 'follow';if(!cmpWant('pelageya'))return;
    const S4=D.S4,sol=D.sol;
    if(ph===4.5){k3bStrike(K,h,sol);return;}
    if(S4.st==='inhale'){if(W.owlT<=0&&players[1].owlCd<=0)k3bTap(K,'sk',0.8,'skill');return;}
    k3bDef(K,h,D);cmpKey('guard',true);if(hd(h.pos,K3B_C)>1.5)cmpGoto(h,K3B_C.x,K3B_C.z,1.0);}},
  // песня: Пелагея прыгает в долю (провалить нельзя)
  {id:'song',first:true,done:()=>!!W.flags.out,run:h=>{const K=k3b(),S=W.song;if(!S||G.cine)return 'follow';if(!cmpWant('pelageya'))return;
    if(K.sgS!==S){K.sgS=S;K.sg={};}for(let k=0;k<8;k++){if(K.sg[k])continue;if(S.t>=k*S.B-0.02){K.sg[k]=1;if(h.grounded)cmpTap('jump');}}}}
]);
