/* ============================== РЕЛИЗ final06 · 2-Б «ВОДЯНОЙ»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Погоня (человек — Прошка/Потап): колесо мельницы держит Потап, бот (любой герой) по лопастям уходит на тормозную плиту; кувшинки — бот играет у раковины, когда человек подошёл, и бежит
// по ним следом; ручей — прилив гуслями и вплавь; развилка — бот ждёт в русле у заслонки (вода понесёт), а если человек тоже полез в русло — идёт на уступ и бьёт рычаг;
// камыш — бот становится Йошей у гребешка и поливает его, когда все прошли скалы; лодка — гребёт гуслями (рулит человек); плетень — рвёт верёвку, когда человек у другой.
// Бой: этап 1 — щит на шары, в сторону от красной дорожки, в окне — бьёт; этап 2 — играет у раковины на мели ближе к человеку (конь замирает — садится человек), а конь, которого
// сыграл человек, — его: запрыгивает, на острове бьёт по короне; этап 3 — Йоша поливает бутон, Пелагея на кувшинку-плот с человеком: Совиный взор, в окне — бьёт, из круга гейзера — вбок;
// этап 4 — у своего колокола, удар на «БОМ!»; общий удар — вместе с человеком. Положения — из late_99j_k2b.js (бой) и late_99s_k2b_chase.js (погоня).
const K2B={w:null};CMP.k2b=K2B;                                                // состояние маршрута — для ботов-проверок
const k2b=()=>{if(K2B.w!==W){Object.assign(K2B,{w:W,t:0,jt:0,ow:0,at:0,hc:0,wt:0,fk:null,rp:null,sh:null,tel:[],lx:null,lz:0});}
  const h=active(1);if(K2B.lx!=null&&Math.hypot(h.pos.x-K2B.lx,h.pos.z-K2B.lz)>4)CMP.wp=null;K2B.lx=h.pos.x;K2B.lz=h.pos.z;   // вал догнал / «плюх» / смена героя — бросило далеко: путь с начала
  const FX=FIN.k2fx;if(FX&&!FX._cmw){FX._cmw=1;const _t=FX.tele;FX.tele=function(x,y,z,r,dur,kind,o){const T=_t.apply(this,arguments);   // круги гейзеров (красные, малые, на месте) — чтобы бот видел, откуда уходить
    if(kind==='red'&&r<2.2&&!(o&&o.follow))K2B.tel.push({x,z,r,t:G.time,dur});return T;};}
  return K2B;};
const k2bCh=()=>W.flags.ch;
const k2bOn=()=>{const C=k2bCh();return !!C&&C.WV.on&&!G.cine&&!W.flags.chaseDone;};
const k2bTap=(K,k,gap,act)=>{if(!(K[k]>G.time-gap)){K[k]=G.time;cmpTap(act);return true;}return false;};
const k2bT=()=>TIMING[players[1].path]||TIMING.mid;
const K2_ARENA={x:0,z:-14};
// точки погони: из late_99s_k2b_chase.js (MZ=152, LZ0=140, LZ1=126, FZ0=98, FZ1=80, RZ=70, BZ0=63)
const K2_MILL=[[0,155.2],[0,154],[0,149.6],[2.6,149.1]];                    // по лопастям на тормозную плиту
const K2_LILY=[[-4.8,139.4],[-4.8,126.6],[-4.6,124.6]];                     // по кувшинкам у левой стенки: пруд сплошной полосой
const K2_FK_IN=[[4,100],[4,95],[4,90.7]], K2_FK_GO=[[4,98.5],[4,90],[3.5,77]];
const K2_FK_L=[[-4.1,99.2],[-4.1,93.5],[-4.1,89.5],[-2.8,87.4]], K2_FK_LC=[[4,99.6],[-4.1,99.2],[-4.1,93.5],[-4.1,89.5],[-2.8,87.4]];
const K2_FK_LD=[[-4.1,85.8],[-4.1,80.8],[-1,77.5]];
const K2_REED=[[0,74],[0,67.5],[0.6,64.6]];
const K2_DOCK=[[0.7,66],[0.7,63.8],[0.7,61]];
const K2_ROPE=[-5.2,5.2];
// отрезок «шары/красная дорожка»: расстояние от точки до отрезка a→b+u*ext
const k2bSeg=(px,pz,ax,az,bx,bz,ext)=>{const dx=bx-ax,dz=bz-az,L=Math.hypot(dx,dz)||1,ux=dx/L,uz=dz/L,t=clamp((px-ax)*ux+(pz-az)*uz,0,L+ext),qx=ax+ux*t,qz=az+uz*t;return {d:Math.hypot(px-qx,pz-qz),qx,qz,ux,uz};};
// ударить врага e в окне: подойти и бить (Водяной «очухивается» за окно — бьём без пауз)
const k2bStrike=(K,h,e,gap)=>{const [tx,tz]=cmpPos(e,h),bd=hd(e.pos,h.pos);cmpGoto(h,tx,tz,0.3);
  if(bd<=h.d.range*0.9+e.r){h.face=Math.atan2(e.pos.x-h.pos.x,e.pos.z-h.pos.z);k2bTap(K,'at',gap||0.45,'attack');}};
const k2bOpen=e=>!!e&&e.alive&&(e.dazeT>0||e.state==='broken');
// человек упал клубком — подойти и подшить (на коне, острове и плоту некогда)
const k2bRevive=(h,hh)=>{if(!players[0].downed||hh.cling||h.k2ride||h.pos.y>2.5)return false;cmpGoto(h,hh.pos.x,hh.pos.z,0.7);return true;};
// ближайший красный круг гейзера, под которым стоит герой
const k2bGey=h=>{const K=k2b();K.tel=K.tel.filter(g=>G.time-g.t<g.dur+0.6);for(const g of K.tel){const left=g.t+g.dur-G.time;if(left>0&&hd(h.pos,g)<g.r+0.5)return {g,left};}return null;};

CMP.route('2-B',[
  // ---------- погоня ----------
  // мельница: Потап (человек) держит колесо у ступицы — лопасти встают ступенями; бот бежит по ним на тормозную плиту и держит колесо для Потапа
  {id:'mill',done:()=>{const C=k2bCh();return !!(C&&C.millDone);},run:h=>{const C=k2bCh(),K=k2b();if(!k2bOn()||!W.flags.oak)return 'follow';const M=C.mill,MZ=C.MZ;
    if(h.pos.z<MZ-2.2){cmpGoto(h,2.6,MZ-2.9,0.3);return;}                     // уже на том берегу — на плиту
    if(!M.potap||h.pos.z>MZ+9)return 'follow';
    cmpPath(h,K2_MILL,0.3,0.8);if(h.grounded&&h.blocked)k2bTap(K,'jt',0.4,'jump');}},
  // кувшинки: бот у раковины ждёт, пока человек подойдёт к пруду, играет и бежит по всплывшим рядам (напев девять секунд)
  {id:'lily',done:()=>{const C=k2bCh();return !!(C&&C.lilyDone);},run:(h,hh)=>{const C=k2bCh(),K=k2b();if(!k2bOn()||!C.millDone)return 'follow';const z=h.pos.z;
    if(z<C.LZ1-0.2)return;                                                     // на том берегу — ждёт человека
    if(z<C.LZ0-0.2||C.lily.hum>0.8){cmpPath(h,K2_LILY,0.4,0.8);return;}
    if(hd(h.pos,{x:-5,z:142.4})>0.7){cmpGoto(h,-5,142.4,0.35);return;}
    if(hh.pos.z<C.LZ0+6.5&&hh.pos.z>C.LZ1)k2bTap(K,'ow',1.0,'item');}},
  // ручей: в отлив не выбраться — прилив гуслями у ракушки, дождаться, пока вода встанет, и вплавь (прыжки на воде) до берега
  {id:'stream',done:()=>{const C=k2bCh();return !!(C&&C.streamDone);},run:h=>{const C=k2bCh(),K=k2b();if(!k2bOn()||!C.lilyDone)return 'follow';const S=C.STR;
    if(h.pos.z<103.8&&h.pos.y>0.6)return;                                       // на том берегу — ждёт человека
    if(S.state!=='high'){if(h.pos.z>112.2&&hd(h.pos,{x:-6,z:112.8})>0.8){cmpGoto(h,-6,112.8,0.4);return;}k2bTap(K,'ow',1.0,'item');return;}
    if(S.t<1){if(h.pos.z>112.3)cmpGoto(h,-6,112.8,0.4);return;}
    cmpGoto(h,0,102.4,0.4);if(h.grounded&&h.groundRef&&h.groundRef.water)k2bTap(K,'jt',0.33,'jump');}},
  // развилка: бот ждёт в русле у заслонки (шлюз откроют — вода понесёт); если человек тоже в русле — бот на уступ, бить рычаг
  {id:'fork',done:()=>{const C=k2bCh();return !!(C&&C.forkDone);},run:(h,hh,dt)=>{const C=k2bCh(),K=k2b(),F=W.flags;if(!k2bOn()||!C.streamDone)return 'follow';
    if(h.pos.z<C.FZ1-0.2)return;                                                // за развилкой — ждёт человека
    const inCh=q=>q.pos.x>1.4&&q.pos.z<C.FZ0-1&&q.pos.z>C.FZ1-1;
    if(!F.sluice){K.hc=inCh(hh)?K.hc+dt:0;if(K.hc>1.2)K.fk='lever';}
    if(F.sluice){if(h.pos.x<0)cmpPath(h,K2_FK_LD,0.4,0.9);else cmpPath(h,K2_FK_GO,0.4,0.9);return;}
    if(K.fk==='lever'){if(hd(h.pos,{x:-2.8,z:87.4})>0.8||h.pos.y<2.4){cmpPath(h,h.pos.x>0?K2_FK_LC:K2_FK_L,0.35,0.9);return;}
      h.face=Math.atan2(-1.9-h.pos.x,87-h.pos.z);k2bTap(K,'at',0.7,'attack');return;}
    cmpPath(h,K2_FK_IN,0.4,0.9);}},
  // камыш: гребешок Василисы за скалами; Йоша поливает его, когда все прошли (раньше — камыш заткнёт проход своим)
  {id:'reeds',done:()=>{const C=k2bCh(),F=W.flags;return !!(F.reeds||F.reedsDown||F.boat||(C&&C.boat.on));},run:(h,hh,dt)=>{const C=k2bCh(),K=k2b();if(!k2bOn()||!C.forkDone)return 'follow';const RZ=C.RZ;
    if(!cmpWant('yosha'))return;
    if(hd(h.pos,{x:0.6,z:64.6})>0.8){cmpPath(h,K2_REED,0.4,0.9);K.wt=0;return;}
    const past=q=>q.pos.z<RZ-1.2,all=HEROES.every(past),act=past(hh);
    if(act&&!all)K.wt+=dt;
    if(!(all||K.wt>4))return;
    h.face=Math.atan2(0-h.pos.x,RZ-3.8-h.pos.z);k2bTap(K,'ow',0.6,'skill');}},
  // лодка Садко: бот садится и гребёт гуслями (гребок — каждые 0,4 с), рулит человек
  {id:'boat',done:()=>W.flags.boat===2,run:h=>{const C=k2bCh(),K=k2b(),F=W.flags,B=C&&C.boat;if(!C||!C.WV.on)return 'follow';
    if(B.on){if(!B.fly)k2bTap(K,'ow',0.4,'item');return;}
    if(!k2bOn()||!(F.reeds||F.reedsDown))return 'follow';
    cmpPath(h,K2_DOCK,0.3,0.8);}},
  // плетень у омута: две верёвки разом — бот у верёвки, дальше от человека; рвёт, когда человек у другой (или уже дёрнул)
  {id:'fence',done:()=>!!W.flags.chaseDone,run:(h,hh)=>{const C=k2bCh(),K=k2b(),F=W.flags;if(!C||!C.WV.on||F.boat!==2||G.cine)return 'follow';
    if(F.gate){cmpGoto(h,1,9.6,0.5);return;}
    if(K.rp==null)K.rp=hh.pos.x>0?0:1;
    const rope=i=>({x:K2_ROPE[i],z:17.1});
    if(hd(hh.pos,rope(K.rp))<2.5)K.rp=1-K.rp;                                    // человек пришёл к той же верёвке — бот к другой
    const o=1-K.rp;
    if(hd(h.pos,{x:K2_ROPE[K.rp],z:18.2})>0.6){cmpGoto(h,K2_ROPE[K.rp],18.2,0.35);return;}
    h.face=Math.PI;
    if(hd(hh.pos,rope(o))<3.2||G.time-C.RP[o]<0.6)k2bTap(K,'at',0.5,'attack');}},
  // ---------- бой ----------
  // этап 1 «Сом-перевозчик»: щит на шары, в сторону от красной дорожки (сом бросается на мель); в окне — бить Водяного
  {id:'s1',first:true,done:()=>W.flags.phase>=1.5,run:(h,hh)=>{const F=W.flags;if(F.phase!==1||G.cine)return 'follow';const D=W.dbg2b(),e=D.vod,S=D.S1,K=k2b();if(!e||!e.alive)return 'follow';
    cmpBolts(h,k2bT());
    if(k2bOpen(e)){k2bStrike(K,h,e);return;}
    if(k2bRevive(h,hh))return;
    if((S.st==='tele'||S.st==='lunge')&&S.a&&S.b){const q=k2bSeg(h.pos.x,h.pos.z,S.a.x,S.a.z,S.b.x,S.b.z,2.6);
      if(q.d<3.6){const side=((h.pos.x-q.qx)*(-q.uz)+(h.pos.z-q.qz)*q.ux)>=0?1:-1;cmpGoto(h,q.qx-q.uz*side*5.4,q.qz+q.ux*side*5.4,0.3);return;}}
    cmpGoto(h,2.5,-6,0.5);}},
  // этап 2 «Водяные кони»: бот — «играющий»: раковина на мели, ближней к человеку (конь замирает у мели — садится человек); конь, которого сыграл человек, — бота: запрыгнуть;
  // на острове — по короне
  {id:'s2',first:true,done:()=>W.flags.phase>=2.5,run:(h,hh)=>{const F=W.flags;if(F.phase!==2||G.cine)return 'follow';const D=W.dbg2b(),e=D.vod,S2=D.S2,K=k2b(),C=K2_ARENA;if(!e||!e.alive)return 'follow';
    cmpBolts(h,k2bT());
    if(h.k2ride)return;                                                          // везёт конь
    const open=k2bOpen(e);
    if(h.pos.y>2.5){if(open)k2bStrike(K,h,e);return;}                            // на острове: окно — бить по короне
    if(open&&e.pos.y<0){k2bStrike(K,h,e);return;}                                // Водяной свалился в воду (запал погас) — бьём
    if(k2bRevive(h,hh))return;
    const hw=S2.horses.find(H=>(H.state==='wait'||H.state==='come')&&H.by&&H.by.player===0&&H.ref);
    if(hw&&!S2.horses.some(H=>H.state==='ride')){                                // человек сыграл — конь бота: к мели и прыжок
      const S=D.SHOAL[hw.ref.i],ux=(C.x-S.x)/8.6,uz=(C.z-S.z)/8.6,ex=S.x+ux*1.6,ez=S.z+uz*1.6;
      if(hd(h.pos,{x:ex,z:ez})>0.7){cmpGoto(h,ex,ez,0.35);return;}
      if(hw.state==='wait')k2bTap(K,'jt',0.3,'jump');return;}
    const near=j=>hd(hh.pos,D.SHOAL[j]);let b=0;for(let j=1;j<4;j++)if(near(j)<near(b))b=j;
    if(K.sh==null||(b!==K.sh&&near(K.sh)-near(b)>3.5))K.sh=b;
    const S=D.SHOAL[K.sh],ux=(C.x-S.x)/8.6,uz=(C.z-S.z)/8.6,px=S.x-ux*0.5,pz=S.z-uz*0.5;
    if(hd(h.pos,{x:px,z:pz})>0.7){cmpGoto(h,px,pz,0.35);return;}
    const busy=S2.onIsl||S2.horses.some(H=>H.state==='come'||H.state==='wait'||H.state==='ride');   // напев на мели не затихает сам — ждём не по нему, а по коням
    if(!busy)k2bTap(K,'ow',1.5,'item');}},
  // этап 3 «Омут-зеркало»: плота нет — Йоша поливает бутон; есть — Пелагея на плот: Совиный взор, в окне бить; из круга гейзера — вбок
  {id:'s3',first:true,done:()=>W.flags.phase>=3.5,run:(h,hh)=>{const F=W.flags;if(F.phase!==3||G.cine)return 'follow';const D=W.dbg2b(),e=D.vod,S3=D.S3,K=k2b(),C=K2_ARENA;if(!e||!e.alive)return 'follow';
    cmpBolts(h,k2bT());
    const o=other(1);if(o)o.following=false;                                    // второй герой не бродит за нами на плот: плот уезжает с первым, кто встал
    const rf=S3.rafts.find(r=>r.st!=='sink'),onR=!!rf&&h.groundRef===rf.col,oAb=!!rf&&!!o&&o.groundRef===rf.col&&o.grounded;
    const gy=k2bGey(h);
    if(gy){const g=gy.g;let dx=h.pos.x-g.x,dz=h.pos.z-g.z,d=Math.hypot(dx,dz);if(d<0.2){dx=h.pos.x-C.x;dz=h.pos.z-C.z;d=Math.hypot(dx,dz)||1;}
      let tx=g.x+dx/d*(g.r+1.2),tz=g.z+dz/d*(g.r+1.2);
      if(onR){const rx=rf.col.x-g.x,rz=rf.col.z-g.z,rd=Math.hypot(rx,rz);if(Math.hypot(tx-rf.col.x,tz-rf.col.z)>rf.col.r-0.3){if(rd>0.3){tx=rf.col.x+rx/rd*1.2;tz=rf.col.z+rz/rd*1.2;}else{tx=rf.col.x+dx/d*1.2;tz=rf.col.z+dz/d*1.2;}}}
      cmpGoto(h,tx,tz,0.15);if(!onR&&gy.left<0.3)k2bTap(K,'jt',0.6,'roll');return;}
    if(!rf){
      if(k2bRevive(h,hh))return;
      if(!cmpWant('yosha'))return;
      let B=null,bd=1e9;for(const q of D.BUDS){if(!q.g.visible||q.cool>0)continue;const dd=hd(hh.pos,q);if(dd<bd){bd=dd;B=q;}}
      if(!B)return;
      const px=C.x+Math.cos(B.a)*10.2,pz=C.z+Math.sin(B.a)*10.2;               // вне плота (он вырастет вокруг бутона радиусом 1,8), но в трёх шагах от бутона
      if(hd(h.pos,{x:px,z:pz})>0.8){cmpGoto(h,px,pz,0.4);return;}
      h.face=Math.atan2(B.x-h.pos.x,B.z-h.pos.z);k2bTap(K,'ow',0.7,'skill');return;}
    if(!cmpWant(oAb&&!onR?o.kind:'pelageya'))return;                             // …а если плот уже уехал со вторым героем бота — управляем им
    if(!onR){cmpGoto(h,rf.col.x,rf.col.z,0.3);return;}
    if(k2bOpen(e)){const bd=hd(e.pos,h.pos);if(bd<=h.d.range*0.9+e.r){h.face=Math.atan2(e.pos.x-h.pos.x,e.pos.z-h.pos.z);k2bTap(K,'at',0.45,'attack');}return;}
    if(S3.owl<=0&&h.kind==='pelageya')k2bTap(K,'ow',0.7,'skill');}},
  // этап 4 «Великий вал»: Игрок 2 — правый колокол; удар на «БОМ!» (круг у колокола сходится с кольцом)
  {id:'s4',first:true,done:()=>W.flags.phase>=4.5,run:(h,hh)=>{const F=W.flags;if(F.phase!==4||G.cine)return 'follow';const D=W.dbg2b(),S=D.S4,Bl=D.BELL4[1],K=k2b(),px=Bl.x+0.6,pz=Bl.z+1.4;
    cmpGoto(h,px,pz,0.3);if(hd(h.pos,Bl)>2.6)return;                             // у колокола (упёрлась в раму — не страшно: бьёт, пока достаёт)
    h.face=Math.atan2(Bl.x-h.pos.x,Bl.z-h.pos.z);
    if((S.st==='come'||S.st==='strike')&&S.hit[1]==null){const left=S.strikeAt-G.time;if(left<0.06&&left>-0.2)k2bTap(K,'at',0.25,'attack');}}},
  // общий удар: Водяной на дне — бить вместе с человеком (хватит удара человека в пределах секунды от удара бота)
  {id:'fin',first:true,done:()=>!!W.flags.won,run:(h)=>{const F=W.flags;if(F.phase!==4.5||G.cine)return 'follow';const D=W.dbg2b(),e=D.vod,K=k2b();if(!e||!e.alive)return 'follow';k2bStrike(K,h,e,0.5);}}
]);
