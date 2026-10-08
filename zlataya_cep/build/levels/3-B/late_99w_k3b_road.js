/* ============================== РЕЛИЗ final06 · 3-Б «СОЛОВЕЙ-РАЗБОЙНИК»: ПОДХОД «ПРЯМОЕЗЖАЯ ДОРОЖКА» (≈170 м) ============================== */
// Былина: «Заколодела дорожка прямоезжая… Соловей свистнет — травы-муравы уплетаются, лазоревы цветочки осыпаются, тёмны леса к земле приклоняются».
// Гнездо на семи дубах всё время видно впереди; раз в 8 с (в одиночку — 11) Соловей свистит: трель нарастает, по облакам катится волна.
// Кто стоит на открытом — кубарем назад на пару шагов (без потерь); за камнем, стволом, большим цветком или в тени щита Потапа — устоит.
// Свист — и помеха, и инструмент: участки построены на том, что он делает.
//  1 «Заколодела дорожка» — большая колода поперёк: Потап откатывает («Эх, ухнем!»); на свист сверху катятся колоды поменьше — прыгай;
//  2 «Травы-муравы» — на свист трава заплетается: кто в траве — вязнет; кочки и тропка, которую полил Йоша, — свободны;
//  3 «Лазоревы цветочки» — прореха в облаках, по краям цветы-колокольчики: после свиста лепестки осыпаются и плывут над прорехой — мост на 4 с;
//  4 «Леса приклоняются» — вторая прореха: на свист деревья ложатся стволами на тот берег — мост на 3 с;
//  5 «Застава дочек» — дочки-соловушки на воротах: подворотню держит Потап (круг у столба), остальные проходят; на том берегу плита — кто на ней,
//    держит ворота для Потапа. Дочки кидаются пуховыми подушками (пух на «объективе», вязнешь) — Прошка сбивает их рогаткой на лету;
//  6 «Облака рвутся» — облачные островки над пустотой: на свист облачко под ногами истончается и тает — на соседнее;
//  7 «Дуб-сторож» — подъём зигзагом по уступам перед стволом: середина уступа — за стволом (свист не достаёт), края — открыты;
//  8 «Плетёный обод» — по ветке к гнезду; калитку в ободе раздвигает Потап — ролик выхода Соловья.
// В одиночку «оставленный держит»: Потап — подворотню, плиту — тот, кто на ней стоит. Свист реже, мосты дольше.
if(typeof WHO!=='undefined'&&!WHO.dochki)WHO.dochki=['Дочки-соловушки','#f0a8b8'];
FIN.k3road=function(KR){const F=W.flags,T=HERO,C=KR.C,FX=FIN.k3fx,FX2=FIN.k2fx,SOLO=()=>!!G.solo;const RD={};F.rd=RD;
  const Y=-8;   // дорожка — облачная, ниже гнезда
  const ctl=()=>SOLO()?[active(G.soloPi)]:[active(0),active(1)];
  const live=()=>HEROES.filter(h=>h.active&&!h.cling&&!players[h.player].downed);
  const key=(p,t,c)=>(FIN.k2ft||floatText)(p.clone(),t,c||'#ffe9a0');
  const CLD=M(0xd6d0f4),CLDS=M(0xa8a0d8),BARK=M(0x6b4a2b),MOSS=M(0x6a9a4a);
  const plat=(minx,maxx,minz,maxz,top)=>cloudIsle(minx,maxx,minz,maxz,top==null?Y:top);
  /* ---------- земля по участкам (сверху вниз по z) ---------- */
  plat(-6,6,158,178);plat(-6,6,140,158);plat(-6,6,121,140);plat(-6,6,106,110);plat(-6,6,103,106);plat(-6,6,90,95);plat(-6,6,74,90);plat(-6,6,70,74);plat(-6,6,48,55);plat(-11,11,26,48);
  // заколодевший край дорожки: камни-укрытия по бокам
  const COVER=[];const rock=(x,z,r,y)=>{const g=new THREE.Group();g.position.set(x,(y==null?Y:y),z);W.group.add(g);fk(g,K=>{K.add(KP.dod(r),hp(0x8a84a0),tm(0,r*0.55,0,0.3,0.7,0.2,1,0.75,1),{noise:0.08});K.add(KP.dod(r*0.6),hp(0x9a94b0),tm(r*0.6,r*0.35,r*0.3,1.1,0.2,0.4),{noise:0.06});});
    W.cyls.push({x,z,r:r*0.95,miny:(y==null?Y:y)-1,maxy:(y==null?Y:y)+r*1.1,on:true});COVER.push({x,z,r:r*1.1});};
  for(const[x,z,r]of[[-4,170,1.1],[3.6,163,1.3],[-3.2,149,1.2],[4.2,144,1.0],[-4.5,131,1.0],[4.4,126,1.1],[-4.2,99.5,0.9],[4.3,92.5,1.0],[-3.5,86,1.0],[4,77,1.1],[-4,51,1.1],[4.2,49.5,0.9]])rock(x,z,r);
  // лес по сторонам дорожки и облака внизу
  let fi=0;for(let z=30;z<178;z+=k3hr(fi,41,5,8))for(const sd of[-1,1]){fi++;const x=sd*k3hr(fi,42,9,15),h=k3hr(fi,43,4,7);const g=new THREE.Group();g.position.set(x,Y-1,z);W.group.add(g);   // без случая: коллизии уровня одинаковы при каждой загрузке
    fk(g,K=>{K.add(KP.cyl(0.25,0.4,h,6),hp(0x5a3d22),tm(0,h/2,0),{noise:0.03});for(let k=0;k<3;k++)K.add(KP.ico(rand(1.2,1.9),1),hp(k%2?0x4f7a2c:0x5f8a34),tm(rand(-0.6,0.6),h+rand(-0.5,1),rand(-0.6,0.6)),{noise:0.15});},{mat:KMAT.wind});
    W.puffs=W.puffs||[];for(let k=0;k<5;k++)W.puffs.push({x:x+Math.cos(k*1.26)*1.8,y:Y-1.6,z:z+Math.sin(k*1.26)*1.8,s:1.1});}   // облачко под деревом — только вид
  // колокольчики-закладки
  const BELLS=[[0,157],[0,137],[0,121.6],[0,105.4],[0,89],[0,72.6],[0,47],[-7.5,26]];BELLS.forEach(([x,z],i)=>bell(x,z,i===7?0:Y));
  /* ---------- свист издалека ---------- */
  const NEST=new V3(C.x,Y,C.z);RD.whT=5;RD.wave=null;RD.on=false;RD.n=0;
  const sheltered=(h)=>{if(h.k3ride)return true;
    // широкий щит Потапа: в его тени
    const P=T.potap;if(P.active&&P.guard&&!players[0].downed&&h!==P){const ax=h.pos.x-NEST.x,az=h.pos.z-NEST.z,bx=P.pos.x-NEST.x,bz=P.pos.z-NEST.z,da=Math.hypot(ax,az),db=Math.hypot(bx,bz);if(da>db&&da-db<4&&(ax*bx+az*bz)/(da*db||1)>0.995)return true;}
    if(h===P&&h.guard)return true;
    // укрытие между героем и гнездом
    const dx=NEST.x-h.pos.x,dz=NEST.z-h.pos.z,L=Math.hypot(dx,dz)||1;for(const c of COVER){const cx=c.x-h.pos.x,cz=c.z-h.pos.z,u=(cx*dx+cz*dz)/L;if(u<0||u>3.4)continue;if(Math.abs(cx*dz-cz*dx)/L<c.r+0.25)return true;}
    // дуб-сторож: середина уступов — за стволом
    if(h.pos.z>26&&h.pos.z<44){const xl=h.pos.x*((OAKG.z-C.z)/(h.pos.z-C.z));if(Math.abs(xl)<OAKG.r)return true;}
    return false;};
  function whistle(){RD.n++;const Wv=FX.wave('white',1.4);const z0=Math.min(...ctl().map(h=>h.pos.z));RD.wave={Wv,r:Math.max(4,(z0-C.z)-26),hit:new Set()};SFX.whoosh();tone(1600,0.7,'sine',0.08,2600);FX.cl&&FX.cl.tear(0.6,0.8);
    RD.wave.trig={};}
  // что делает свист на участках — когда волна прокатывается над ними: колоды катятся, лепестки осыпаются, деревья кланяются
  const TRIG=[['logs',139,()=>{for(const L of RD.logs)if(!L.on&&live().some(h=>h.pos.z<162&&h.pos.z>136)){L.on=true;L.z=139;L.x=rand(-3.5,3.5);L.g.visible=true;}}],['pet',121.5,()=>petals(true)],['trees',104.5,()=>trees(true)]];
  RD.z1=()=>Math.min(...ctl().map(h=>h.pos.z));
  function waveTick(dt){const R=RD.wave;if(!R)return;R.r+=dt*26;R.Wv.set(NEST,R.r);R.Wv.tick(dt,NEST);for(const[k,z,fn]of TRIG)if(!R.trig[k]&&R.r>=z-C.z){R.trig[k]=1;fn();}const far=R.r-(Math.max(...ctl().map(h=>h.pos.z))-C.z);if(far>10)R.Wv.fade(Math.max(0,1-(far-10)/8));
    for(const h of live()){if(R.hit.has(h))continue;const d=Math.hypot(h.pos.x-NEST.x,h.pos.z-NEST.z);if(Math.abs(d-R.r)>1.2)continue;R.hit.add(h);
      for(const I of ISL)if(I.on&&!I.thin&&onIsle(h,I))I.thin=1.2;   // облачко под ногами тает — и за укрытием
      if(sheltered(h)||ISL.some(I=>onIsle(h,I))){FX.sparks(h.pos.clone().add(new V3(0,1.2,0)),4,0xffffff);continue;}if(inGrass(h)){h.tangleT=2.4;key(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Трава оплела!','#b8e090');continue;}if(h.pos.y>Y+1.6&&h.pos.z>26&&h.pos.z<44&&!h.grounded)continue;
      if([0.7,1.4,2.1,2.8,3.5,4.2,4.9].some(d=>groundAt(h.pos.x,h.pos.z+d,h.pos.y+0.5,0.3).y<h.pos.y-9)){{h.knockT=0.25;h.vel.x*=0.2;h.vel.z*=0.2;key(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Ух! Устоял!','#e8f2ff');continue;}}   // за спиной пропасть — не сдувает
      h.vel.z+=h.guard?4:8;h.vel.y=2.6;h.grounded=false;h.knockT=0.35;FX.down(h.pos.clone().add(new V3(0,0.8,0)),6);key(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Ух, сдуло!','#e8f2ff');
      if(!RD.pushTold){RD.pushTold=1;for(const pi of[0,1])tip(pi,'Трель! Прячься за камень или щит '+K(0,'guard')+'.',3.6);}}
    if(R.r>(Math.max(...ctl().map(h=>h.pos.z))-C.z)+22){R.Wv.del();RD.wave=null;}}
  /* ---------- 1. ЗАКОЛОДЕЛА ДОРОЖКА (z 158…140): большая колода — Потап; колоды поменьше катятся на свист ---------- */
  const LOGM=[hp(0x7a5432),hp(0x5a3d22)];const bigLog=new THREE.Group();bigLog.position.set(0,Y,151.5);W.group.add(bigLog);fk(bigLog,K=>{K.add(KP.cyl(0.75,0.8,11.6,10),LOGM[0],tm(0,0.75,0,0,0,Math.PI/2),{noise:0.04});
    for(const s of[-1,1])K.add(KP.cyl(0.62,0.62,0.06,10),hp(0xd8b07a),tm(s*5.82,0.75,0,0,0,Math.PI/2),{s:0.1});for(let k=0;k<4;k++)K.add(KP.cyl(0.08,0.12,1.4,5),LOGM[1],tm(rand(-4,4),1.4,rand(-0.3,0.3),rand(-0.6,0.6),0,rand(-0.6,0.6)));});
  const bigCol=colBox(-6,6,Y,Y+1.5,150.7,152.3,true);RD.bigLog={g:bigLog,col:bigCol,done:false};
  W.lifts.push({pos:new V3(0,Y,153.1),active:()=>!RD.bigLog.done,onLift:h=>{RD.bigLog.done=true;bigCol.on=false;SFX.brk();bark(h,'potap','Эх, дубинушка, ухнем!',2,true);
    FX.anim(1.4,k=>{bigLog.position.x=k*k*9;bigLog.rotation.x=-k*6;bigLog.position.y=Y-k*k*6;},()=>{bigLog.visible=false;});}});
  RD.logs=[0,1].map(()=>{const g=new THREE.Group();W.group.add(g);fk(g,K=>{K.add(KP.cyl(0.38,0.4,3,8),LOGM[0],tm(0,0.4,0,0,0,Math.PI/2),{noise:0.03});for(const s of[-1,1])K.add(KP.cyl(0.32,0.32,0.05,8),hp(0xd8b07a),tm(s*1.51,0.4,0,0,0,Math.PI/2),{s:0.1});});g.visible=false;return {g,on:false,x:0,z:0,hit:new Set()};});
  function logsTick(dt){for(const L of RD.logs){if(!L.on)continue;L.z+=dt*5.5;L.g.position.set(L.x,Y,L.z);L.g.rotation.x+=dt*14;
      for(const h of live()){if(L.hit.has(h))continue;if(Math.abs(h.pos.z-L.z)<0.7&&Math.abs(h.pos.x-L.x)<1.7&&h.pos.y<Y+0.5){L.hit.add(h);h.vel.z+=7;h.vel.y=3;h.knockT=0.3;key(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Ой, колода!','#e8d0a0');}}
      if(L.z>160){L.on=false;L.g.visible=false;L.hit.clear();}}}
  /* ---------- 2. ТРАВЫ-МУРАВЫ (z 140…122): на свист трава заплетается; кочки и политая тропка свободны ---------- */
  const GRASS={z0:122,z1:139.5};const grass=new THREE.Group();W.group.add(grass);fk(grass,K=>{for(let i=0;i<260;i++){const x=rand(-5.6,5.6),z=rand(GRASS.z0,GRASS.z1),h=rand(0.5,1.0);K.add(KP.cone(0.07,h,3),i%3?hp(0x6a9a3a):hp(0x8ab04a),tm(x,Y+h/2,z,rand(-0.2,0.2),rand(0,6),rand(-0.2,0.2)),{kN:0.2});}},{mat:KMAT.windD});
  const HUMS=[[-2.6,134],[2.4,129.5],[-1.4,125]].map(([x,z])=>{fk(W.group,K=>K.add(KP.cyl(0.9,1.05,0.5,9),hp(0x7a8a4a),tm(x,Y+0.25,z),{noise:0.04}));W.cyls.push({x,z,r:0.95,miny:Y-1,maxy:Y+0.5,on:true});return {x,z};});
  RD.path=false;const pathG=new THREE.Group();pathG.visible=false;W.group.add(pathG);fk(pathG,K=>{for(let i=0;i<34;i++){const z=GRASS.z0+i*0.52,x=rand(-0.6,0.6);K.add(hSph(0.16,6,4),i%2?hp(0x6ab0ff):hp(0xffffff),tm(x,Y+0.18,z,0,0,0,1,0.5,1),{kN:0.4});K.add(KP.cone(0.04,0.3,3),hp(0x4a8a3a),tm(x,Y+0.1,z));}});
  W.waterTargets.push({pos:new V3(0,Y,139),active:()=>!RD.path,onWater:()=>{RD.path=true;pathG.visible=true;SFX.ok();key(new V3(0,Y+1.4,138),'Тропка из цветов — трава расступилась!','#9fe6a0');}});
  const inGrass=h=>h.pos.z>GRASS.z0&&h.pos.z<GRASS.z1&&Math.abs(h.pos.x)<5.8&&h.pos.y<Y+0.3&&!(RD.path&&Math.abs(h.pos.x)<1.1);
  W.slowZone=h=>h.tangleT>0&&inGrass(h);
  /* ---------- 3. ЛАЗОРЕВЫ ЦВЕТОЧКИ (прореха z 119…110): после свиста лепестки — мост ---------- */
  const PET=[120.1,118.28,116.46,114.64,112.82,111].map((z,i)=>{const x=(i%2?0.7:-0.7),g=new THREE.Group();g.position.set(x,Y,z);W.group.add(g);
    fk(g,K=>{for(let k=0;k<5;k++){const a=k/5*Math.PI*2;K.add(hSph(1,8,5),hp(0x5a9ae8),tm(Math.cos(a)*0.55,-0.06,Math.sin(a)*0.55,0,-a,0).multiply(tm(0,0,0,0,0,0,0.75,0.12,0.45)),{kN:0.5});}K.add(hSph(0.25,6,4),hp(0xffe08a),tm(0,0,0),{kN:0.5});});
    g.visible=false;const col={x,z,r:1.05,miny:Y-1,maxy:Y,on:false};W.cyls.push(col);return {g,col,x,z};});
  for(const[x,z,s]of[[-5,119.5,1],[5.2,120.2,1.1],[-5.4,109.6,0.9],[5,109.4,1]]){const g=new THREE.Group();g.position.set(x,Y,z);W.group.add(g);fk(g,K=>{K.add(KP.cyl(0.18,0.24,4.2*s,6),hp(0x4a8a3a),tm(0,2.1*s,0));
      K.add(KP.lathe([[0,0],[0.4,0.1],[0.9,0.6],[1.3,1.6],[1.45,1.9],[0,1.2]],10),hp(0x5a9ae8),tm(0,4.2*s,0,Math.PI,0,0,s,s,s),{kN:0.5,s:0.1});},{mat:KMAT.windM});COVER.push({x,z,r:1.4});}
  RD.petT=0;RD.PET=PET;function petals(on){if(!on)return;if(!live().some(h=>h.pos.z<126&&h.pos.z>104))return;RD.petT=SOLO()?5.5:4;PET.forEach((P,i)=>{P.col.on=true;P.g.visible=true;P.g.position.y=Y+3;FX.anim(0.5+i*0.08,k=>{P.g.position.y=Y+3*(1-k);});});}
  function petTick(dt){if(RD.petT<=0)return;RD.petT-=dt;PET.forEach((P,i)=>{P.g.rotation.y+=dt*0.6;if(RD.petT<1)P.g.position.y=Y-(1-RD.petT)*1.2;});if(RD.petT<=0)PET.forEach(P=>{P.col.on=false;P.g.visible=false;});}
  /* ---------- 4. ЛЕСА ПРИКЛОНЯЮТСЯ (прореха z 103…95): на свист деревья ложатся мостом ---------- */
  const TREES=[[-2.4,103.4,1],[2.4,94.6,-1]].map(([x,z,dir])=>{const pv=new THREE.Group();pv.position.set(x,Y,z);W.group.add(pv);fk(pv,K=>{K.add(KP.cyl(0.42,0.55,8.6,8),hp(0x6a4a2a),tm(0,4.3,0),{noise:0.03});
      for(let k=0;k<4;k++)K.add(KP.ico(rand(1.0,1.5),1),hp(k%2?0x4f7a2c:0x5f8a34),tm(rand(-0.6,0.6),8+rand(-0.5,0.8),rand(-0.6,0.6)),{noise:0.12});});
    const col=colBox(x-0.85,x+0.85,Y-0.6,Y+0.3,Math.min(z,z-dir*8.6),Math.max(z,z-dir*8.6),false);col.on=false;return {pv,col,dir,k:0,t:0};});
  RD.TREES=TREES;function trees(on){if(!on)return;if(!live().some(h=>h.pos.z<110&&h.pos.z>88))return;for(const Tr of TREES){Tr.t=SOLO()?4.5:3;}}
  function treesTick(dt){for(const Tr of TREES){Tr.t=Math.max(0,Tr.t-dt);const tgt=Tr.t>0?1:0;Tr.k=damp(Tr.k,tgt,tgt?5:3,dt);Tr.pv.rotation.x=-Tr.dir*Tr.k*Math.PI*0.5;Tr.col.on=Tr.k>0.9;}}
  /* ---------- 5. ЗАСТАВА ДОЧЕК (z 90…74): подворотня, дочки, подушки ---------- */
  const GZ=82;{const g=new THREE.Group();g.position.set(0,Y,GZ);W.group.add(g);fk(g,K=>{for(const s of[-1,1]){K.add(KP.cyl(0.45,0.55,7.4,8),LOGM[0],tm(s*6.3,3.7,0),{noise:0.03});K.add(KP.cone(0.8,1.2,8),hp(0x9a3a2a),tm(s*6.3,8,0));}
      K.box(13.6,0.6,1.4,LOGM[1],tm(0,6.6,0),{b:0.1});K.box(13.6,0.18,2.2,LOGM[0],tm(0,7,0),{b:0.05});for(let k=0;k<8;k++)K.add(KP.cone(0.5,0.9,4),hp(0x8a4a2a),tm(-5.6+k*1.6,7.6,0,0,Math.PI/4,0));});
    colBox(-7,-6,Y,Y+8,GZ-0.6,GZ+0.6,true);colBox(6,7,Y,Y+8,GZ-0.6,GZ+0.6,true);}
  const pg=new THREE.Group();pg.position.set(0,Y,GZ);W.group.add(pg);fk(pg,K=>{for(let k=0;k<9;k++)K.add(KP.cyl(0.11,0.11,4.2,6),hp(0x4a3a2a),tm(-5.4+k*1.35,2.1,0),{s:-0.1});for(let k=0;k<3;k++)K.box(11.8,0.22,0.3,hp(0x5a4a3a),tm(0,0.8+k*1.4,0),{b:0.04});
    for(let k=0;k<9;k++)K.add(KP.cone(0.13,0.4,4),hp(0x9a9aa8),tm(-5.4+k*1.35,-0.1,0,Math.PI,0,0));});
  const pCol=colBox(-6,6,Y,Y+4.2,GZ-0.35,GZ+0.35,true);const LIFT=new V3(-4.6,Y,GZ+1.6),PLATE=new V3(4.4,Y,GZ-2.2);
  const ringMk=(p,col)=>{const m=new THREE.Mesh(new THREE.TorusGeometry(1.1,0.08,6,32),MB(col,{transparent:true,opacity:0.8}));m.rotation.x=Math.PI/2;m.position.set(p.x,Y+0.08,p.z);W.group.add(m);return m;};
  const liftRing=ringMk(LIFT,0xffd24a),plateRing=ringMk(PLATE,0x9fe6ff);fk(W.group,K=>{K.add(KP.cyl(0.95,1.0,0.16,12),hp(0x8a8494),tm(PLATE.x,Y+0.08,PLATE.z),{s:0.1});K.add(KP.cyl(0.18,0.22,1.8,7),LOGM[0],tm(LIFT.x-0.9,Y+0.9,LIFT.z+0.4));});
  RD.gate={holder:null,k:0,open:false};
  W.lifts.push({pos:LIFT,active:()=>!RD.gate.holder,onLift:h=>{RD.gate.holder=h;SFX.latch&&SFX.latch();bark(h,'potap','Держу подворотню! Проходите!',2,true);}});
  function gateTick(dt){const G2=RD.gate;if(G2.holder&&(hd(G2.holder.pos,LIFT)>2.8||players[G2.holder.player].downed))G2.holder=null;
    if(!G2.propped&&T.potap.pos.z<GZ-1.2&&T.potap.pos.y>Y-1){G2.propped=true;bark(T.potap,'potap','Подопру-ка колом — пусть все пройдут!',2,true);}   // Потап прошёл — подворотня подпёрта насовсем
    if(G2.propped){G2.k=damp(G2.k,1,4,dt);pg.position.y=Y+G2.k*4.4;pCol.on=false;liftRing.visible=plateRing.visible=false;return;}
    const plate=HEROES.some(h=>!h.cling&&hd(h.pos,PLATE)<1.2&&Math.abs(h.pos.y-Y)<0.6);G2.open=!!G2.holder||plate;G2.k=damp(G2.k,G2.open?1:0,G2.open?4:6,dt);pg.position.y=Y+G2.k*4.4;pCol.on=G2.k<0.85;
    liftRing.material.opacity=G2.holder?0.95:0.5+0.3*Math.sin(G.time*5);plateRing.material.opacity=plate?0.95:0.45+0.25*Math.sin(G.time*5);}
  // дочки-соловушки на воротах; подушки
  const DAU=[0,1,2].map(i=>{const D=FIN.k3s.daughter(i);D.g.position.set(-2.6+i*2.6,Y+7.1,GZ+0.2);return D;});W.k3daughters=DAU;RD.daughters=DAU;
  RD.pil=[];RD.pilT=2.5;RD.dauGone=false;
  function pillowStart(){const L=live().filter(h=>h.pos.z>GZ-6&&h.pos.z<GZ+14);if(!L.length)return;const h=L[Math.floor(Math.random()*L.length)];const D=DAU[Math.floor(Math.random()*3)];D.set('throw');later(0.5,()=>D.set('idle'));
    const spot=new V3(h.pos.x,Y,h.pos.z);const t=FX2.tele(spot.x,Y,spot.z,1.1,0.95,'red');const g=FIN.k3s.pillow();const from=D.g.position.clone().add(new V3(0,1,0));g.position.copy(from);
    const P={g,from,to:spot,t:0,dur:0.95,pos:g.position,dead:false,tele:t};P.mk={pos:P.pos,active:()=>!P.dead&&P.t>0.15,onHit:()=>{if(P.dead)return;P.dead=true;FX.down(P.pos.clone(),26);t.cancel();W.group.remove(g);key(P.pos.clone().add(new V3(0,0.6,0)),'Пух!','#ffffff');}};W.marks.push(P.mk);RD.pil.push(P);
    if(!RD.pilTold){RD.pilTold=1;sayD('Батюшка не велел пускать! Вот вам подушкой!');tip(0,'Подушки! Прошка, сбей рогаткой '+K(0,'skill')+'.',3.2);}}
  const sayD=t=>say('dochki',t,2.4,true);
  function pillowsTick(dt){for(let i=RD.pil.length-1;i>=0;i--){const P=RD.pil[i];P.t+=dt;if(P.dead){RD.pil.splice(i,1);const j=W.marks.indexOf(P.mk);if(j>=0)W.marks.splice(j,1);continue;}const k=Math.min(1,P.t/P.dur);
      P.g.position.lerpVectors(P.from,P.to,k);P.g.position.y+=Math.sin(k*Math.PI)*3;P.g.rotation.set(k*5,k*3,0);
      if(k>=1){P.dead=true;W.group.remove(P.g);FX.down(P.to.clone().add(new V3(0,0.4,0)),30);for(const h of live()){if(hd(h.pos,P.to)<1.3){if(ctl().includes(h))FX.fluff(1);h.slowT=1.5;key(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'В пуху!','#ffffff');}}}}
    // в пуху — вязнешь
    for(const h of HEROES)if(h.slowT>0){h.slowT-=dt;h.vel.x*=0.9;h.vel.z*=0.9;}}
  /* ---------- 6. ОБЛАКА РВУТСЯ (z 70…54): облачные островки — на свист облачко под ногами тает ---------- */
  const ISL=[[-1.4,67.2],[1.2,63.9],[-1.2,60.6],[1.4,57.3]].map(([x,z])=>{const g=new THREE.Group();g.position.set(x,Y,z);W.group.add(g);const mat=new THREE.MeshLambertMaterial({color:0xece6ff,transparent:true,opacity:1});
    for(let k=0;k<6;k++){const m=new THREE.Mesh(KP.sph(1,8,6),mat);const a=k/6*Math.PI*2;m.position.set(Math.cos(a)*0.95,-0.45,Math.sin(a)*0.95);m.scale.set(1.0,0.55,1.0);g.add(m);}const top=new THREE.Mesh(KP.cyl(1.6,1.3,0.4,12),mat);top.position.y=-0.2;g.add(top);
    const col=colBox(x-1.5,x+1.5,Y-0.8,Y,z-1.5,z+1.5,false);return {g,mat,col,x,z,on:true,thin:0,gone:0};});
  RD.ISL=ISL;const onIsle=(h,I)=>Math.abs(h.pos.x-I.x)<1.7&&Math.abs(h.pos.z-I.z)<1.7&&Math.abs(h.pos.y-Y)<0.5;
  function islesTick(dt){for(const I of ISL){if(I.thin>0){I.thin-=dt;I.mat.opacity=0.35+0.65*I.thin/1.2;I.g.scale.set(1+0.3*(1-I.thin/1.2),1,1-0.2*(1-I.thin/1.2));if(Math.random()<dt*14)FX.part(new V3(I.x+rand(-1,1),Y-0.2,I.z+rand(-1,1)),new V3(rand(-2,2),rand(0,1),rand(-2,2)),'down',0xffffff,{life:1});
        if(I.thin<=0){I.on=false;I.col.on=false;I.g.visible=false;I.gone=3;}}
      else if(!I.on){I.gone-=dt;if(I.gone<=0){I.on=true;I.col.on=true;I.g.visible=true;I.mat.opacity=1;I.g.scale.set(1,1,1);}}}}
  /* ---------- 7. ДУБ-СТОРОЖ (z 48…26): подъём зигзагом по уступам перед стволом ---------- */
  const OAKG={x:0,z:28,r:3.0};{const g=new THREE.Group();g.position.set(OAKG.x,0,OAKG.z);W.group.add(g);fk(g,K=>{K.add(KP.cyl(2.6,3.2,40,12),hp(0x5a3d22),tm(0,-6,0),{noise:0.08,kG:0.15});
      for(let k=0;k<5;k++){const a=k*1.3;K.add(KP.cyl(0.4,0.7,7,7),hp(0x6b4a2b),tm(Math.cos(a)*3,9+k*1.4,Math.sin(a)*3-1,Math.sin(a)*0.9,0,-Math.cos(a)*0.9),{noise:0.04});}
      K.add(hSph(1.1,8,6),hp(0x2a1a10),tm(-1.6,-3.5,2.3,0,0,0,0.8,1.3,0.5),{kN:0});});   // дупло
    fk(g,K=>{for(let k=0;k<9;k++)K.add(KP.ico(rand(3,4.4),1),hp(k%2?0x4f7a2c:0x5f8a34),tm(rand(-4,4),12+rand(-1,3),rand(-5,1)),{noise:0.25});},{mat:KMAT.wind});
    W.cyls.push({x:OAKG.x,z:OAKG.z,r:OAKG.r,miny:-30,maxy:14,on:true,occ:true});
    // белка Векша в дупле — машет лапкой
    const sq=new THREE.Group();sq.position.set(-1.6,-3.6,OAKG.z+2.7);W.group.add(sq);fk(sq,K=>{K.add(hSph(0.28,7,5),hp(0xc06a2a),tm(0,0.2,0));K.add(hSph(0.2,7,5),hp(0xc06a2a),tm(0,0.56,0.08));for(const s of[-1,1])K.add(KP.cone(0.06,0.18,4),hp(0xc06a2a),tm(s*0.1,0.78,0.06));K.add(hSph(0.24,6,5),hp(0xd88a4a),tm(0,0.5,-0.32,0,0,0,0.8,1.6,0.8));});RD.sq=sq;}
  // уступы: A z 42 (−8→−6) · B z 39 (−6→−4) · C z 36 (−4→−2) · D z 33 (−2→0); площадки на концах; сверху — ветка к гнезду
  W.ramps=W.ramps||[];const RAMPS=[[42,-8,-6,1],[39,-6,-4,-1],[36,-4,-2,1],[33,-2,0,-1]];
  for(const[z,y0,y1,dir]of RAMPS){const x0=-7*dir;W.ramps.push({x0,z0:z,y0,y1,dx:dir,dz:0,len:14,w:1.15});
    const g=new THREE.Group();g.position.set(0,(y0+y1)/2,z);g.rotation.z=Math.atan2(y1-y0,14)*dir;W.group.add(g);fk(g,K=>{K.box(14.6,0.5,2.4,hp(0x7a5432),tm(0,-0.25,0),{b:0.08});for(let k=0;k<10;k++)K.add(KP.cyl(0.05,0.05,2.4,4),hp(0x5a3d22),tm(-6.5+k*1.45,0.02,0,Math.PI/2,0,0));
      for(let k=0;k<5;k++)K.add(hSph(0.3,6,4),hp(0x6a9a4a),tm(rand(-6,6),0.05,rand(-1,1),0,0,0,1,0.3,1),{kN:0.4});});}
  branch(6,9.6,37.8,43.2,-6);branch(-9.6,-6,34.8,40.2,-4);branch(6,9.6,31.8,37.2,-2);branch(-10,-6,8,34.2,0);plat(-6,6,-0.6,8,0);
  /* ---------- 8. ПЛЕТЁНЫЙ ОБОД: калитку раздвигает Потап ---------- */
  W.lifts.push({pos:new V3(C.x,0,C.z+KR.R+2.2),active:()=>KR.gateCol.on,onLift:h=>{W.gateOpen(h);}});
  RD.started=false;RD.introDone=false;
  RD.tick=dt=>{if(G.cine||F.phase>=1||RD.introDone)return;
    RD.whT-=dt;if(RD.whT<=1.2&&!RD.tellOn){RD.tellOn=true;for(let i=0;i<6;i++)later(i*0.2,()=>tone(1400+i*120,0.1,'sine',0.05,2000));}
    if(RD.whT<=0){RD.tellOn=false;RD.whT=(SOLO()?11:8)-Math.min(1.5,(176-RD.z1())/90);whistle();}
    waveTick(dt);logsTick(dt);for(const h of HEROES)if(h.tangleT>0)h.tangleT-=dt;petTick(dt);treesTick(dt);gateTick(dt);islesTick(dt);
    RD.pilT-=dt;if(RD.pilT<=0){RD.pilT=2.4;if(!RD.dauGone)pillowStart();}pillowsTick(dt);DAU.forEach(D=>D.tick(dt));
    if(!RD.dauGone&&RD.z1()<GZ-3){RD.dauGone=true;sayD('Ой! Прошли! Батюшке скажем — то-то будет!');DAU.forEach((D,i)=>{D.set('flap');const p0=D.g.position.clone();FX.anim(2.4,k=>{D.g.position.set(p0.x,p0.y+k*14,p0.z-k*40);},()=>{D.g.visible=false;D.set('idle');});});}
    if(RD.sq)RD.sq.rotation.y=Math.sin(G.time*2)*0.4;
    // вошли в гнездо — ролик выхода Соловья
    if(live().some(h=>Math.hypot(h.pos.x-C.x,h.pos.z-C.z)<KR.R-0.8&&h.pos.y>-1)){RD.introDone=true;if(RD.wave){RD.wave.Wv.del();RD.wave=null;}KR.intro();}};
  W.updates.push(dt=>{try{RD.tick(dt);}catch(e){console.error('k3road',e);}});
  RD.start=()=>{const sh=[shot(0,[0,Y+4.5,182],[0,Y+3,120]),shot(4.4,[6,Y+8,150],[0,4,-14],[4,Y+9,146],[0,6,-14],4)];
    play({dur:9,fov:50,camK:2.6,shots:sh,says:[[0.3,4,null,'<i>Заколодела дорожка прямоезжая — к Соловью, на семь дубов.</i><br><i>Свистнет он — травы-муравы заплетаются, цветочки осыпаются, леса к земле клонятся.</i>',true],
        [4.6,3.6,'zven','Свист сдувает! Как запоёт трелью — прячьтесь за камни, деревья, за щит Потапа!']],events:[{t:5,fn:()=>{RD.whT=0.01;}}],end:()=>{RD.whT=3;}});};
  RD.skip=()=>{RD.introDone=true;if(RD.wave){RD.wave.Wv.del();RD.wave=null;}RD.bigLog.done=true;RD.bigLog.col.on=false;RD.bigLog.g.visible=false;RD.dauGone=true;DAU.forEach(D=>{D.g.visible=false;});W.slowZone=null;};
  const WP={logs:[0,158],grass:[0,141],petals:[0,121.6],trees:[0,105.4],gate:[0,89],clouds:[0,72.6],climb:[0,47],rim:[-7.5,24,0]};
  RD.warp=(where)=>{const p=WP[where];if(!p)throw new Error('нет участка '+where);const y=p[2]!=null?p[2]:Y;HEROES.forEach((h,i)=>{placeOnGround(h,p[0]+(i%2?1.2:-1.2)*(i>1?1.8:1),p[1]+(i>1?0.9:0),y);h.following=false;h.vel.set(0,0,0);});
    for(const pi of[0,1])players[pi].cp.set(p[0],y,p[1]);snapCams();RD.whT=4;};
  RD.spawns=[[new V3(-1.5,Y,172),new V3(-3,Y,174)],[new V3(1.5,Y,172),new V3(3,Y,174)]];
  const z1=()=>RD.z1();
  RD.objectives=[pi=>O('Прямоезжая дорожка: свист сдувает — прячься за камни и за щит Потапа.',()=>z1()<156||F.phase>=1,()=>[]),
    pi=>O(()=>'Колода поперёк дорожки: Потап, откати её '+K(0,'skill')+'. Колоды поменьше катятся — прыгай.',()=>z1()<140||F.phase>=1,()=>[new V3(0,Y,153)]),
    pi=>O(()=>'Травы-муравы: на свист трава заплетается. Стой на кочках; Йоша польёт тропку '+K(1,'skill')+' — трава расступится.',()=>z1()<121||F.phase>=1,()=>[]),
    pi=>O('Лазоревы цветочки: после свиста лепестки плывут над прорехой — беги по ним.',()=>z1()<107||F.phase>=1,()=>[]),
    pi=>O('Леса приклоняются: после свиста деревья ложатся мостом — скорей на тот берег.',()=>z1()<91||F.phase>=1,()=>[]),
    pi=>O(()=>'Застава дочек: Потап держит подворотню '+K(0,'skill')+' в жёлтом круге; за воротами — плита: кто на ней, держит для Потапа.',()=>z1()<73||F.phase>=1,()=>[LIFT]),
    pi=>O('Облака рвутся: на свист облачко под ногами тает — прыгай на соседнее.',()=>z1()<49||F.phase>=1,()=>[]),
    pi=>O('Дуб-сторож: вверх по уступам. Середина уступа — за стволом, свист не достаёт.',()=>live().some(h=>h.pos.y>-0.6&&h.pos.z<34)||F.phase>=1,()=>[]),
    pi=>O(()=>'Плетёный обод: Потап раздвинет прутья '+K(0,'skill')+' — и в гнездо.',()=>F.phase>=1||RD.introDone,()=>[new V3(C.x,0,C.z+KR.R+2)])];
  return RD;};
