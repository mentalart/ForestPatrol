/* ============================== РЕЛИЗ final06 · 4-Б «ЗМЕЙ ГОРЫНЫЧ»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Положения — из proto/levels/4-B.js и late_98 (W.gor4L: головы, узда, шея; FIN.gor4: тяга большого вдоха и «слабое место»; FIN.uzda: счёт «раз-два-три»).
// Бот держит правую голову (голодную, красное — кувырок): Пелагея Совиным взором зажигает слабое место, и бот бьёт по нему, когда человек уже сломал соседей
// (иначе Пробой кончится раньше); от замаха — щит / кувырок; на большом вдохе — щит; сытую голову, если взор отдыхает, гасит Йоша живой водой.
// Узда: бот берёт вторые клещи, идёт рядом с человеком к шее и жмёт «раз-два-три» вместе с ним. Левую (Прошка), жёлудь в среднюю, щит Потапа — человек.
const K4B={w:null,t:{},wait:0,beatT:0};
CMP.k4b=K4B;
const k4b=()=>{if(K4B.w!==W){K4B.w=W;K4B.t={};K4B.wait=0;K4B.beatT=0;}return K4B;};
const k4bTap=(K,k,gap,act)=>{if(!(K.t[k]>G.time-gap)){K.t[k]=G.time;cmpTap(act);return true;}return false;};
const k4bHeads=()=>W.gor4L?W.gor4L.heads():[];
const k4bAwake=e=>!!e&&e.alive&&e.state!=='broken'&&e.state!=='dying';
const k4bSpd=h=>Math.hypot(h.vel.x,h.vel.z);
// головы — только этим шагом (общий бой к ним не подходит)
{const _ig=CMP.ignore;CMP.ignore=e=>(_ig&&_ig(e))||e.kind==='golova';}
CMP.route('4-B',[
  {id:'boss',first:true,done:()=>W.flags.phase>=4||!!W.flags.out,run:(h,hh,dt)=>{const K=k4b(),F=W.flags,ph=F.phase;if(G.cine||ph<1||ph>3||!W.gor4L)return 'follow';
    const hs=k4bHeads();if(hs.length<3)return 'follow';const [L,M,R]=hs,G4=FIN.gor4,T=TIMING[players[1].path]||TIMING.mid;
    h.following=false;cmpBolts(h,T);
    // ---- защита: от замаха головы на себя — щит / кувырок на месте ----
    const wind=hs.filter(e=>e.state==='wind'&&e.tgt===h&&hd(e.pos,h.pos)<10);
    if(wind.length){cmpFight(h,hh,wind,T);return 'x';}
    // ---- большой вдох тянет героев к средней голове: щит держим, не шагаем против тяги ----
    const safe={x:3,z:0.8};                                                          // от пасти средней ≥ 10 м: щитом тяга 2 м/с × 3,2 с — не дотянет
    if(ph===2&&G4.pull>0){cmpKey('guard',true);cmpGoto(h,safe.x,safe.z,0.4);return 'x';}
    if(ph===2&&k4bAwake(M)&&F.inhale<=0&&F.inhT<5&&G4.cyc+1>=(G4.big?4:2)){cmpGoto(h,safe.x,safe.z,0.4);return;}   // следующий вдох — большой: заранее отойти
    // ---------- фаза 3: узда ----------
    if(ph===3){const BR=W.gor4L.BR,UZ=FIN.uzda,neck=W.gor4L.neckSpot,hold=BR.holders,hum=hold[0];
      if(BR.on)return;
      if(!hold[1]||hold[1]!==h){
        if(hold[1]&&hold[1]!==h)return;                                              // держит другой герой Игрока 2 — оставим как есть
        const side=hum?(hum.pos.x<BR.pos.x?1:-1):1,gx=BR.pos.x+side*1.3,gz=BR.pos.z+1.5;
        if(hd(h.pos,BR.pos)>1.8){cmpGoto(h,gx,gz,0.3);return;}
        h.face=Math.atan2(BR.pos.x-h.pos.x,BR.pos.z-h.pos.z);k4bTap(K,'grab',0.6,'item');return;}
      if(!hum)return;                                                                 // ждём, пока человек возьмёт вторые клещи
      const near=hd(BR.pos,neck)<=3;
      if(near){                                                                       // раз-два-три: на каждый счёт — умение вместе с другом
        cmpGoto(h,hum.pos.x+(h.pos.x<hum.pos.x?-1.5:1.5),hum.pos.z,0.5);
        if(UZ.got[1])return;if(UZ.got[0]){if(G.time-K.beatT>0.3){K.beatT=G.time;cmpTap('skill');}return;}
        K.wait+=dt||1/60;if(K.wait>1.2&&G.time-K.beatT>0.9){K.wait=0;K.beatT=G.time;cmpTap('skill');}return;}
      K.wait=0;
      // несём вместе: держимся рядом с человеком на своей стороне
      const sx=h.pos.x<hum.pos.x?-1.6:1.6;const tx=hum.pos.x+sx,tz=hum.pos.z;if(hd(h.pos,{x:tx,z:tz})>0.5)cmpGoto(h,tx,tz,0.3);return;}
    // ---------- фазы 1–2: правая голова; сытых (фаза 2) гасит Йоша ----------
    const others=ph===1?[L]:[L,M],othersBroken=others.every(e=>!e.alive||e.state==='broken');
    const weak=G4.weak.find(q=>q.e===R),owlCd=players[1].owlCd||0;
    const tp={x:R.pos.x+Math.sin(R.face)*1.6,z:R.pos.z+Math.cos(R.face)*1.6+0.6};
    if(weak&&k4bAwake(R)&&(othersBroken||weak.max-weak.t<1.6)){                          // слабое место на правой, соседи сломаны — удар
      if(hd(h.pos,R.pos)>3.0){cmpGoto(h,tp.x,tp.z,0.4);return;}
      h.face=Math.atan2(R.pos.x-h.pos.x,R.pos.z-h.pos.z);k4bTap(K,'hit',0.45,'attack');return;}
    if(ph===2){                                                                         // сытая голова неуязвима: левую, среднюю, потом правую (если взор отдыхает) — живой водой
      const sated=[L,M,R].filter(e=>k4bAwake(e)&&e.sat>0&&!(e===R&&(owlCd<=0||weak)));
      const e=sated[0];
      if(e){if(!cmpWant('yosha'))return;
        const sp={x:e.pos.x,z:e.pos.z+2.3};if(hd(h.pos,sp)>0.6&&hd(h.pos,e.pos)>2.7){cmpGoto(h,sp.x,sp.z,0.4);return;}
        h.face=Math.atan2(e.pos.x-h.pos.x,e.pos.z-h.pos.z);if(h.skillCd<=0)k4bTap(K,'water',0.9,'skill');return;}}
    if(!k4bAwake(R)){                                                                  // правая в Пробое — не мешать, ровное место перед головами
      const spot={x:3,z:-2.5};if(hd(h.pos,spot)>1.2)cmpGoto(h,spot.x,spot.z,0.5);return;}
    if(weak){const wp={x:R.pos.x,z:R.pos.z+5.5};if(hd(h.pos,wp)>1.2)cmpGoto(h,wp.x,wp.z,0.5);return;}   // слабое место горит — ждём, пока человек сломает соседей
    if(owlCd<=0){                                                                       // Совиный взор на правую
      if(!cmpWant('pelageya'))return;
      const wp={x:R.pos.x,z:R.pos.z+5.5};if(hd(h.pos,wp)>1.3||k4bSpd(h)>1.2){cmpGoto(h,wp.x,wp.z,0.4);return;}
      h.face=Math.PI;k4bTap(K,'owl',0.8,'skill');return;}
    // взор отдыхает: обычный бой с правой, если она не сытая и соседи уже сломаны
    if(othersBroken&&R.sat<=0){cmpFight(h,hh,[R],T);return 'x';}
    const wp={x:R.pos.x,z:R.pos.z+5.5};if(hd(h.pos,wp)>1.6)cmpGoto(h,wp.x,wp.z,0.5);}}
]);
