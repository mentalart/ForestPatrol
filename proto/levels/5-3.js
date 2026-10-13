/* ============================== МИР 5 · 5-3 «УТКА» — полёт на Горыныче в узде ============================== */
// у каждой головы свой хозяин: левая — Игрок 1, правая — Игрок 2, средняя — общая · итог — среднее направление; тянем вместе дольше секунды — разгон
// три отрезка ≈3,5 мин: «Море» (скалы и облачные кольца, учимся рулить; острова, корабли купцов из «Салтана», рыба-кит) → «Шторм Кощея» (молния бьёт в столб
// с предупреждением — уйти в сторону; волна встаёт стеной — подняться выше; строи воронов) → «Погоня» (утка петляет сквозь облачные арки, пролёт сквозь арку — рывок)
// камера: на туче — отъезжает, в разгоне — шире кадр (W.camFov) · после яйца — зеркальце: Кощей один в тереме (mirrorVision)
// X — огонь своей головы, B — защита от синих перьев (перо летит обратно), RT на цифрах «раз-два-три» — огонь средней головы сквозь тучу Кощея · скала — отскок без падения
function build53(){W.soloMirror=true;
  W.zvenAway=true;W.world=5;setTheme('buyan');W.name='5-3 · Утка';W.sub='Остров Буян · полёт · Горыныч в узде';W.camX=60;const F=W.flags;F.stage='intro';W.fallY=-1e4;W.readHints=true;W.vestPull=true;const T=HERO;
  const Z=makeVestZ(helperOf(4));W.zven=Z;Z.pos.set(0,-50,0);W.zvenGoal=()=>new V3(0,-50,0);
  const sea=new THREE.Mesh(new THREE.PlaneGeometry(900,1400),M(0x3a8ab8,{emissive:0x0a2a40,emissiveIntensity:0.2}));sea.rotation.x=-Math.PI/2;sea.position.set(0,0,-500);W.group.add(sea);
  const waves=[];for(let i=0;i<40;i++){const w=addMesh(new THREE.BoxGeometry(rand(3,8),0.05,0.2),MB(0xe8f4ff,{transparent:true,opacity:0.6}),rand(-60,60),0.05,rand(-900,40));w.castShadow=false;waves.push(w);}
  // остров Буян за спиной, дуб на нём
  {const isl=addMesh(new THREE.CylinderGeometry(30,36,6,20),M(0x7a9a58),0,0,60);isl.castShadow=false;addMesh(new THREE.CylinderGeometry(3,4.5,34,12),M(0x5e4c3e),-6,18,52);}
  for(let i=0;i<30;i++){const c=new THREE.Group();c.position.set(rand(-90,90),rand(24,50),rand(-900,0));W.group.add(c);for(let k=0;k<4;k++)addMesh(new THREE.SphereGeometry(rand(3,6),10,8),MB(0xffffff,{transparent:true,opacity:0.85}),rand(-5,5),rand(-1,1),rand(-3,3),c);}
  /* ---------- Горыныч и седоки ---------- */
  const gor=makeGorynych5(1.0);gor.g.rotation.y=Math.PI;const GP=new V3(0,10,20),GV={x:0,y:0,sp:10,boostT:0,agreeT:0,fight:0,bump:0};gor.g.position.copy(GP);
  const HEADS=[gor.heads[2],gor.heads[0]];   // слева на экране — левая голова Игрока 1
  const MID=gor.heads[1];const headPos=hd0=>{const p=new V3();hd0.g.getWorldPosition(p);return p;};
  const seatOf=i=>gor.g.localToWorld(new V3(...GOR_SEATS[i]));const SEATK=['proshka','potap','pelageya','yosha'];
  function seat(){gor.g.updateMatrixWorld(true);SEATK.forEach((k,i)=>{const h=T[k],s=seatOf(i);h.pos.copy(s);h.vel.set(0,0,0);h.grounded=true;h.face=Math.PI;});}
  const IN=[{x:0,y:0},{x:0,y:0}];const cam={x:0,y:10,z:20,r:6};W.camFn=()=>{const cnt=CLOUDS.some(c=>c.state==='count'||c.state==='wait2'),pb=cnt?1:0;CAMK.pb=damp(CAMK.pb,pb,2.5,1/60);   // на туче камера отъезжает — видно и цифры, и головы
    return {pos:new V3(GP.x*0.85,GP.y+7.8+CAMK.pb*3.2,GP.z+15.5+CAMK.pb*6),look:new V3(GP.x,GP.y+4.2+CAMK.pb*2,GP.z-12),roll:-(GV.x||0)*0.012,k:5};};
  const CAMK={pb:0,fov:55};W.camFov=()=>{CAMK.fov=damp(CAMK.fov,F.stage==='fly'&&(GV.agreeT>1||GV.archT>0)?64:55,3,1/60);return CAMK.fov;};
  /* ---------- коридор: скалы, облачные кольца с орешками, тучи Кощея, вороны ---------- */
  const ROCKS=[];const rockM=M(0x6a6460);
  [[-9,-70],[8,-110],[-4,-150],[10,-205],[-10,-230],[3,-290],[-8,-345],[9,-380],[-6,-470],[9,-560],[-9,-690],[8,-800],[-8,-960],[9,-1190],[-9,-1330],[8,-1460]].forEach(([x,z])=>{const r=rand(2.2,3.2),h=rand(14,24);const m=addMesh(new THREE.CylinderGeometry(r*0.7,r,h,9),rockM,x,h/2-1,z);ROCKS.push({x,z,r,h});addMesh(new THREE.ConeGeometry(r*0.7,2.4,9),M(0x4f7a3a),x,h,z);});
  const RINGS=[[-5,12,-60],[6,8,-130],[0,16,-185],[-7,11,-310],[4,18,-880]].map(([x,y,z])=>{const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);const t=addMesh(new THREE.TorusGeometry(2.2,0.18,8,30),MB(0xffffff,{transparent:true,opacity:0.85}),0,0,0,g);
    for(let k=0;k<6;k++)addMesh(new THREE.SphereGeometry(0.9,8,6),MB(0xffffff,{transparent:true,opacity:0.7}),Math.cos(k)*2.4,Math.sin(k)*2.4,0,g);const nut=nutItem(x,y,z);nut.locked=true;return {g,x,y,z,nut,got:false};});
  const CLOUDS=[-420,-1030,-1110].map((z,i)=>{const g=new THREE.Group();g.position.set(0,13,z);W.group.add(g);const cm=M(0x2a2438,{emissive:0x1a0a2a,emissiveIntensity:0.3,transparent:true,opacity:0.78,depthWrite:false});
    for(let k=0;k<26;k++)addMesh(new THREE.SphereGeometry(rand(3,5.5),10,8),cm,rand(-16,16),rand(-8,8),rand(-2,2),g);
    for(let k=0;k<5;k++){const b=addMesh(new THREE.BoxGeometry(0.2,3,0.2),MB(0xc8d8ff),rand(-12,12),rand(-6,-2),rand(0,2),g);b.rotation.z=rand(-0.5,0.5);}
    const dg=makeDigit(2.4,MB(0xffd23a));dg.position.set(0,0,6);g.add(dg);dg.visible=false;return {g,z,cm,dg,state:'wait',t:0,tries:0,press:[null,null]};});
  W.linkTotal+=4;   // три тучи и утка
  W.CLOUDS=CLOUDS;W.GP=GP;
  const crows=[];const feathers=[],fires=[];
  function makeCrow(){const g=new THREE.Group();W.group.add(g);const bk=M(0x1e1e26);part(g,new THREE.SphereGeometry(0.5,10,8),bk,0,0,0).scale.set(0.9,0.85,1.3);part(g,new THREE.SphereGeometry(0.3,10,8),bk,0,0.25,0.5);
    const bg=new THREE.ConeGeometry(0.09,0.4,6);bg.rotateX(Math.PI/2);part(g,bg,M(0x4a4a50),0,0.2,0.85);for(const s of[-1,1])part(g,new THREE.SphereGeometry(0.06,6,5),M(0x7affd0,{emissive:0x40c090,emissiveIntensity:1}),s*0.14,0.33,0.72);
    const wings=[];for(const s of[-1,1]){const w=new THREE.Group();w.position.set(s*0.4,0.1,0);g.add(w);part(w,new THREE.BoxGeometry(1.1,0.05,0.55),M(0x2e2e3a),s*0.55,0,0);wings.push({w,s});}return {g,wings};}
  const WAVES=[{z:-40,n:3},{z:-150,n:4},{z:-300,n:4},{z:-580,n:5},{z:-840,n:6},{z:-1180,n:4}];
  function spawnCrows(n){for(let i=0;i<n;i++){const m=makeCrow();const c={m,pos:new V3(rand(-10,10),rand(8,16),GP.z-70-i*6),off:new V3(rand(-9,9),rand(-3,5),-rand(16,24)),t:rand(0,1.5),throws:0,alive:true,cd:rand(1.5,3),leave:false};m.g.position.copy(c.pos);crows.push(c);}}
  function killCrow(c,by){c.alive=false;SFX.brk();burst(c.pos.clone(),0x2a2a34,16,4);for(let i=0;i<3;i++)spawnSpark(c.pos.clone().add(new V3(rand(-1,1),rand(-1,1),0)),0xffd76a);W.group.remove(c.m.g);F.crowsDown=(F.crowsDown||0)+1;
    floatText(c.pos.clone().add(new V3(0,1,0)),by==='refl'?'Перо — обратно!':'Кар-р!','#ffe0a0');}
  function throwFeather(c,pi){const f=featherMesh(1.6);f.userData.mats.forEach(m=>{m.color.setHex(0x3a6aff);m.emissive.setHex(0x2040c0);m.emissiveIntensity=0.8;});W.group.add(f);const fe={f,pos:c.pos.clone(),pi,t:0,dur:1.3,from:c.pos.clone(),refl:false,src:c,left:null};feathers.push(fe);SFX.thwip();}
  function spitFire(pi){const hp=headPos(HEADS[pi]);const m=new THREE.Mesh(new THREE.SphereGeometry(0.45,10,8),M(0xff8a30,{emissive:0xff5000,emissiveIntensity:1.2}));m.position.copy(hp);W.group.add(m);fires.push({m,pos:hp.clone(),vel:new V3((IN[pi].x)*6,IN[pi].y*3,-42),t:0,pi});SFX.whoosh();
    const hd0=HEADS[pi];anim(0.25,k=>{hd0.jaw.rotation.x=Math.sin(k*Math.PI)*0.6;});}
  /* ---------- управление: каждый ведёт свою голову ---------- */
  W.custom=(pi,h,dt,c)=>{if(c.lock||F.stage!=='fly'){IN[pi].x=0;IN[pi].y=0;return;}IN[pi].x=clamp(c.ix,-1,1);IN[pi].y=clamp(c.iz,-1,1);
    const p=players[pi];p.fireCd=Math.max(0,(p.fireCd||0)-dt);
    if(tap(pi,'attack')&&p.fireCd<=0){p.fireCd=0.45;spitFire(pi);}
    if(tap(pi,'guard')){const fe=feathers.find(q=>q.pi===pi&&!q.refl);if(fe){if(fe.dur-fe.t<=0.8){fe.refl=true;fe.t=0;SFX.parry();G.stats.parries++;floatText(headPos(HEADS[pi]).add(new V3(0,1,0)),'Отбил!',PCSS[pi]);}else floatText(headPos(HEADS[pi]).add(new V3(0,1,0)),'Рано — жди, пока перо подлетит поближе','#dddddd');}HEADS[pi].g.scale.setScalar(1.15);later(0.25,()=>HEADS[pi].g.scale.setScalar(1));}
    if(tap(pi,'skill'))rtPress(pi);};
  function rtPress(pi){const cl=CLOUDS.find(q=>q.state==='count');if(!cl){floatText(headPos(MID).add(new V3(0,1.5,0)),'Средней голове цифры нужны','#ffe0a0');return;}if(cl.press[pi]===null)cl.press[pi]=cl.t;}
  function midFire(cl){SFX.whoosh();SFX.ok();const hp=headPos(MID);for(let i=0;i<24;i++)later(i*0.03,()=>{const p=hp.clone().lerp(cl.g.position.clone(),i/24);burst(p,0xff8a30,5,3);});anim(0.8,k=>{MID.jaw.rotation.x=Math.sin(k*Math.PI)*0.7;});
    cl.state='burn';cl.t=0;later(0.8,()=>{anim(1.2,k=>{cl.cm.opacity=1-k;cl.g.scale.setScalar(1+k*0.4);});SFX.brk();banner('Туча прожжена!','#ffd76a',2,'раз-два-три — вместе, разом');giveLink(cl.g.position.clone(),active(CLOUDS.indexOf(cl)%2),cl.g.position.y,1.4);});
    bark(T.potap,'gorM','Ф-ф-ф-у-ух!',1.4);}
  /* ---------- море не пустое: острова, корабли купцов из «Салтана», рыба-кит ---------- */
  const isleM=M(0x7a9a58),sandM=M(0xe8d8a8),pineM=M(0x3a6a3a);
  for(const [x,z,r] of[[-52,-120,9],[60,-260,12],[-70,-420,14],[48,-560,8],[-58,-900,10],[66,-1250,13],[-46,-1420,9]]){addMesh(new THREE.CylinderGeometry(r,r*1.25,3,14),sandM,x,0,z).castShadow=false;addMesh(new THREE.CylinderGeometry(r*0.75,r,4,12),isleM,x,1.6,z).castShadow=false;
    for(let i=0;i<5;i++){const a=i*1.3,rr=r*0.45;addMesh(new THREE.ConeGeometry(1.1,4.5,6),pineM,x+Math.cos(a)*rr,5.4,z+Math.sin(a)*rr).castShadow=false;}}
  {const city=new THREE.Group();city.position.set(-80,0,-640);W.group.add(city);addMesh(new THREE.CylinderGeometry(22,26,3,16),sandM,0,0,0,city);   // город Леденец на дальнем острове: стены и золотые маковки
    for(let i=0;i<7;i++){const a=i/7*Math.PI*2;addMesh(new THREE.BoxGeometry(3,7,3),M(0xf4ecd8),Math.cos(a)*14,4.5,Math.sin(a)*14,city);addMesh(new THREE.SphereGeometry(1.7,10,8),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4}),Math.cos(a)*14,9,Math.sin(a)*14,city);}}
  const SHIPS=[];for(const [x,z,dir] of[[-24,-180,1],[26,-340,-1],[-28,-500,1],[24,-1300,-1]]){const g=new THREE.Group();g.position.set(x,0.2,z);W.group.add(g);
    const hull=new THREE.Mesh(new THREE.BoxGeometry(2.4,1.2,7),M(0x7a4a2a));hull.position.y=0.4;g.add(hull);const mast=new THREE.Mesh(new THREE.CylinderGeometry(0.1,0.12,6,6),M(0x5a3a1a));mast.position.y=3.6;g.add(mast);
    const sail=new THREE.Mesh(new THREE.PlaneGeometry(3.6,3.4),M(0xf8f0e0,{side:THREE.DoubleSide}));sail.position.set(0,3.8,0.1);g.add(sail);const fl=new THREE.Mesh(new THREE.PlaneGeometry(0.8,0.4),MB(0xd03030,{side:THREE.DoubleSide}));fl.position.set(0.4,6.8,0);g.add(fl);SHIPS.push({g,dir,ph:rand(0,6)});}
  const whale={g:new THREE.Group(),t:0};{const g=whale.g;g.position.set(26,-2.2,-260);W.group.add(g);const wm=M(0x4a5a78);const b=addMesh(new THREE.SphereGeometry(4,16,12),wm,0,0,0,g);b.scale.set(1,0.55,2.4);
    addMesh(new THREE.SphereGeometry(0.4,8,6),MB(0xffffff),1.6,1.4,6.2,g);const tail=addMesh(new THREE.ConeGeometry(2.2,3.4,4),wm,0,0.6,-10,g);tail.rotation.x=-Math.PI/2;whale.tail=tail;
    const sp=new THREE.Mesh(new THREE.ConeGeometry(0.9,5,10,1,true),MB(0xe8f8ff,{transparent:true,opacity:0.7,depthWrite:false}));sp.position.set(0,4.2,3);sp.rotation.x=Math.PI;g.add(sp);whale.spout=sp;}
  /* ---------- шторм Кощея: молния бьёт в столб (прежде — светящийся столб и круг на воде), волна встаёт стеной — выше её! ---------- */
  const STORM=[-520,-1080],CHASE=-1080;const inStorm=z=>z<STORM[0]&&z>STORM[1];
  const bolts=[];let boltT=3;const boltM=MB(0xc8a0ff,{transparent:true,opacity:0.32,depthWrite:false});
  function boltWarn(){const x=clamp(GP.x+rand(-3.5,3.5),-14,14),z=GP.z-Math.max(4,GV.sp)*1.5;const col=new THREE.Mesh(new THREE.CylinderGeometry(2.2,2.2,40,16,1,true),boltM.clone());col.position.set(x,18,z);W.group.add(col);
    const ring=new THREE.Mesh(new THREE.RingGeometry(1.8,2.3,24),MB(0xc8a0ff,{transparent:true,opacity:0.7,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;ring.position.set(x,0.2,z);W.group.add(ring);bolts.push({x,z,t:0,col,ring,done:false});SFX.yellow();}
  function boltTick(dt){if(F.stage==='fly'&&inStorm(GP.z)&&!CLOUDS.some(c=>c.state==='count')){boltT-=dt;if(boltT<=0){boltT=rand(3.2,4.4);boltWarn();}}
    for(const b of bolts.slice()){b.t+=dt;b.col.material.opacity=0.18+0.25*Math.abs(Math.sin(b.t*10));
      if(!b.done&&b.t>=1.5){b.done=true;const hit=Math.abs(GP.x-b.x)<3&&Math.abs(GP.z-b.z)<9;const bm=new THREE.Mesh(new THREE.CylinderGeometry(0.25,0.25,40,6),MB(0xffffff));bm.position.set(b.x,18,b.z);W.group.add(bm);later(0.15,()=>W.group.remove(bm));
        SFX.crash();$('flash').style.opacity=0.22;later(0.12,()=>{$('flash').style.opacity=0;});
        if(hit){GV.bump=0.9;F.boltHits=(F.boltHits||0)+1;shake(0,0.35,0.5);shake(1,0.35,0.5);floatText(headPos(MID).add(new V3(0,1.6,0)),'Ай! Молния','#d8c0ff');}else{F.boltMiss=(F.boltMiss||0)+1;if(!F.boltOk){F.boltOk=true;floatText(headPos(MID).add(new V3(0,1.6,0)),'Мимо! Ушли от молнии','#ffe36b');}}}
      if(b.t>1.9){W.group.remove(b.col);W.group.remove(b.ring);bolts.splice(bolts.indexOf(b),1);}}}
  const SWELLS=[-640,-760,-900,-990].map(z=>{const m=new THREE.Mesh(new THREE.BoxGeometry(34,1,2.4),M(0x2a5a88,{emissive:0x0a2040,emissiveIntensity:0.3}));m.position.set(0,-3,z);W.group.add(m);
    const foam=new THREE.Mesh(new THREE.BoxGeometry(34,0.4,2.8),MB(0xf0f8ff));W.group.add(foam);return {m,foam,z,top:0,passed:false};});
  function swellTick(dt){for(const w of SWELLS){const d=GP.z-w.z;const want=d<70&&d>-20?9:0;w.top=damp(w.top,want,1.6,dt);w.m.scale.y=Math.max(0.01,w.top+3);w.m.position.y=-3+(w.top+3)/2;w.foam.position.set(0,w.top,w.z);
      if(!w.passed&&GP.z<w.z){w.passed=true;if(GP.y+1.2<w.top+1.2){GV.bump=1;GP.z+=5;F.swellHits=(F.swellHits||0)+1;SFX.water();shake(0,0.3,0.4);shake(1,0.3,0.4);floatText(headPos(MID).add(new V3(0,1.6,0)),'Волна! Выше надо было','#9fd8ff');}
        else{F.swellOk=(F.swellOk||0)+1;floatText(headPos(MID).add(new V3(0,1.6,0)),'Над волной!','#ffe36b');}}
      if(!F.swellTold&&d<60&&d>0){F.swellTold=true;tip(0,'Волна встаёт стеной! Выше — тяните на себя оба.',3);tip(1,'Волна встаёт стеной! Выше — тяните на себя оба.',3);}}}
  /* ---------- погоня: утка петляет сквозь облачные арки; пролёт сквозь арку — рывок ---------- */
  const ARCH=[[-6,12,-1200],[7,16,-1270],[-4,10,-1340],[8,14,-1410],[-7,17,-1480],[0,12,-1550]].map(([x,y,z])=>{const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);
    addMesh(new THREE.TorusGeometry(3.4,0.35,8,28),MB(0xfff4d8,{transparent:true,opacity:0.9}),0,0,0,g);for(let k=0;k<8;k++)addMesh(new THREE.SphereGeometry(1.1,8,6),MB(0xffffff,{transparent:true,opacity:0.75}),Math.cos(k*0.8)*3.6,Math.sin(k*0.8)*3.6,0,g);return {g,x,y,z,passed:false};});
  function archTick(dt){GV.archT=Math.max(0,(GV.archT||0)-dt);for(const a of ARCH){if(a.passed||GP.z>a.z)continue;a.passed=true;const ok=Math.hypot(GP.x-a.x,GP.y+3-a.y)<4.2;
    if(ok){GV.archT=1.4;F.arches=(F.arches||0)+1;SFX.whoosh();ringFx(new V3(a.x,a.y,a.z),0xfff4d8,4);floatText(headPos(MID).add(new V3(0,1.6,0)),'Сквозь арку — рывок!','#ffe36b');}}}
  // палитра: море Буяна → шторм (лиловая тьма) → золотая заря погони
  const PAL={bg:scene.background.clone(),fog:scene.fog.color.clone(),storm:new THREE.Color(0x3a3050),gold:new THREE.Color(0xf4c890)},palC=new THREE.Color();
  function paletteTick(){const z=GP.z;let k=0,g=0;if(z<STORM[0])k=clamp((STORM[0]-z)/80,0,1);if(z<CHASE+60)k*=clamp((z-CHASE+20)/80,0,1);if(z<CHASE)g=clamp((CHASE-z)/120,0,1)*0.6;
    palC.copy(PAL.bg).lerp(PAL.storm,k).lerp(PAL.gold,g);scene.background.copy(palC);scene.fog.color.copy(palC);sea.material.color.setHex(0x3a8ab8).lerp(PAL.storm,k*0.5);}
  function segTick(){if(!F.seg2&&GP.z<STORM[0]){F.seg2=true;banner('Шторм Кощея','#d8c0ff',3,'молния — уйди от столба · волна — выше');later(1,()=>bark(T.potap,'gorM','Держитесь! Сейчас тряхнёт!',2));}
    if(!F.seg3&&GP.z<CHASE){F.seg3=true;banner('Погоня!','#ffd76a',3,'сквозь облачные арки — рывок');}}
  /* ---------- утка и финал ---------- */
  const duck=makeDuck();duck.g.scale.setScalar(1.6);duck.g.position.set(0,14,-1160);duck.g.visible=false;const DK={pos:new V3(0,14,-1160),t:0};W.DK=DK;
  function catchDuck(){F.stage='end';const pe=T.pelageya;const egg=makeEgg(1.2);egg.g.visible=false;
    play({dur:15,fov:46,camK:2.4,shots:[shot(0,[GP.x+8,GP.y+4,GP.z-10],[GP.x,GP.y+5,GP.z-4]),shot(5.2,[GP.x-6,GP.y+6,GP.z-2],[GP.x,GP.y+6,GP.z-3]),shot(9.6,[GP.x+4,GP.y+6,GP.z+4],[GP.x,GP.y+5,GP.z])],
      says:[[0.3,4.2,null,'<i>Утку догоняем над краем моря. Средняя голова осторожно, как котёнка, берёт утку зубами.</i>',true],[5.2,3.6,null,'<i>Утка яйцо роняет — Пелагея на лету его ловит.</i>',true],[9.6,2.6,'pelageya','Поймала, поймала!'],[12,2.6,'gorM','Держите крепко. В нём — игла, Кощеева смерть.']],
      events:[{t:0.3,fn:()=>{const hp=headPos(MID).add(new V3(0,0.2,-1.2));const f=duck.g.position.clone();anim(1.4,k=>{duck.g.position.lerpVectors(f,hp,smooth(k));});}},
        {t:5.4,fn:()=>{const hp=headPos(MID).add(new V3(0,-0.4,-1.2));egg.g.visible=true;egg.g.position.copy(hp);const to=pe.pos.clone().add(new V3(0,1.1,0.2));anim(1.2,k=>{egg.g.position.lerpVectors(hp,to,k);egg.g.position.y+=Math.sin(k*Math.PI)*2;});}},
        {t:9.6,fn:()=>{giveLink(pe.pos,pe,pe.pos.y+1.4,1);}}],
      tick:(t)=>{seat();duck.wings.forEach(w=>{w.w.rotation.z=w.s*Math.sin(G.time*18)*0.5;});},
      end:()=>{W.anims.length=0;flushGifts();F.out=true;banner('Яйцо — у Пелагеи!','#ffd76a',2.6,'в лавке у Векши — пляска «Змейка», загляни!');later(1.8,()=>mirrorVision({narr:'<i>Зеркальце снова потеплело. Кощей в тереме листает пустую тетрадку.</i>',line:'<i>(сам себе)</i> Сказку бы кто прочёл… Хоть одну.'},finishLevel));}});}
  function intro(){F.stage='introCine';seat();
    play({dur:13,fov:48,camK:2.4,shots:[shot(0,[14,14,34],[0,10,20]),shot(4.4,[-8,12,26],[0,11,18]),shot(8.6,[0,15,34],[0,10,0])],
      says:[[0.3,3.8,null,'<i>Утка улетает над морем. Горыныч — наш, в узде. У каждой головы свой хозяин.</i>',true],[4.4,2.2,'gorL','Левая — Прошкина.'],[6.5,2.2,'gorR','Правая — Варина!'],[8.7,3,'gorM','А средняя — общая. Тянете вместе — лечу быстрее ветра.']],
      tick:(t)=>{GP.z=20-t*2;gor.g.position.copy(GP);seat();gor.wings.forEach(w=>{w.wp.rotation.z=w.s*Math.sin(t*4)*0.4;});},
      end:()=>{W.anims.length=0;F.stage='fly';GP.set(0,10,0);gor.g.position.copy(GP);seat();snapCams();banner('Полёт в узде — держись!','#ffd76a',3,'стик иль стрелки твоей головой правят · вместе — быстрее · X — огонь · B — щит');}});}
  /* ---------- полёт ---------- */
  W.updates.push(dt=>{
    if(F.stage!=='fly'){if(F.stage==='end'){gor.wings.forEach(w=>{w.wp.rotation.z=w.s*Math.sin(G.time*4)*0.4;});}cam.x=GP.x;cam.y=GP.y;cam.z=GP.z;return;}
    if(G.cine)return;
    const a=IN[0],b=IN[1];const la=Math.hypot(a.x,a.y),lb=Math.hypot(b.x,b.y);const dot=(la>0.3&&lb>0.3)?(a.x*b.x+a.y*b.y)/(la*lb):0;
    GV.agreeT=dot>0.75?GV.agreeT+dt:0;GV.fight=dot<-0.3?GV.fight+dt:0;
    const want=(GV.agreeT>1?17:GV.fight>0.3?7:10)+(GV.archT>0?4:0);GV.sp=damp(GV.sp,want-(GV.bump>0?6:0),2.5,dt);GV.bump=Math.max(0,GV.bump-dt);
    if(GV.agreeT>1&&!GV.boostOn){GV.boostOn=true;SFX.whoosh();floatText(headPos(MID).add(new V3(0,1.6,0)),'Вместе — разгон!','#ffd76a');if(!F.boostTold){F.boostTold=true;bark(T.potap,'gorM','Вот! Вместе — вот так!',1.6);}}
    if(GV.agreeT<=1)GV.boostOn=false;
    if(GV.fight>0.3&&!GV.grumble){GV.grumble=true;bark(T.potap,Math.random()<0.5?'gorL':'gorR',['Мне налево, налево!','Мне направо, направо!','Ворчу, ворчу…','Тянут в разные стороны — ох, беда!'][Math.floor(rand(0,4))],1.4);later(3,()=>{GV.grumble=false;});}
    const mx=(a.x+b.x)/2,my=(a.y+b.y)/2;GV.x=damp(GV.x,mx*9,3,dt);GV.y=damp(GV.y,my*6,3,dt);
    GP.x=clamp(GP.x+GV.x*dt,-15,15);GP.y=clamp(GP.y+GV.y*dt,4,22);GP.z-=GV.sp*dt;
    // скала — отскок без падения
    for(const r of ROCKS){const dx=GP.x-r.x,dz=GP.z-r.z,d=Math.hypot(dx,dz);if(d<r.r+2.6&&GP.y<r.h+1.5){const k=(r.r+2.6-d);let sx=dx>=0?1:-1;/* у края коридора — отскок к середине */if(Math.abs(GP.x+sx*k*1.2)>14.5)sx=-sx;GP.x+=sx*k*1.2;GP.z+=Math.max(0,dz/(d||1))*k*0.5;GV.x=sx*9;GV.bump=0.8;if(!r.hit||G.time-r.hit>1){r.hit=G.time;SFX.crash();shake(0,0.3,0.4);shake(1,0.3,0.4);floatText(GP.clone().add(new V3(0,6,0)),'Бум! Скала','#ffd0a0');}}}
    gor.g.position.copy(GP);gor.g.rotation.z=-GV.x*0.03;gor.g.rotation.x=GV.y*0.02+(GV.agreeT>1?0.1:0);gor.wings.forEach(w=>{w.wp.rotation.z=w.s*Math.sin(G.time*(GV.agreeT>1?7:4))*0.45;});
    [0,1].forEach(pi=>{const hh=HEADS[pi];hh.g.rotation.y=-IN[pi].x*0.5;hh.g.rotation.x=-IN[pi].y*0.3;});
    seat();cam.x=GP.x;cam.y=GP.y+1;cam.z=GP.z+2;
    // облачные кольца
    for(const R of RINGS){if(!R.got&&Math.hypot(GP.x-R.x,GP.y+2.6-R.y,GP.z-R.z)<3.6){R.got=true;R.nut.locked=false;takeItem(R.nut,active(0));ringFx(new V3(R.x,R.y,R.z),0xffffff,3);}}
    // вороны
    for(const w of WAVES)if(!w.done&&GP.z<w.z+10){w.done=true;spawnCrows(w.n);if(!F.crowTold){F.crowTold=true;later(0.6,()=>sayP('…Кощеевы вороны. Синее перо — защита, и летит оно назад.',3.4));}}
    for(const c of crows){if(!c.alive)continue;c.t+=dt;const tgt=GP.clone().add(c.off);if(c.leave)tgt.set(c.pos.x+(c.off.x>0?30:-30),c.pos.y+10,GP.z-40);c.pos.lerp(tgt,1-Math.exp(-(c.leave?1:1.6)*dt));c.m.g.position.copy(c.pos);c.m.g.lookAt(GP.x,GP.y+4,GP.z);
      c.m.wings.forEach(q=>{q.w.rotation.z=q.s*Math.sin(G.time*14+c.t)*0.5;});c.cd-=dt;
      if(!c.leave&&c.cd<=0&&c.pos.distanceTo(GP)<34){c.cd=rand(2.6,3.6);throwFeather(c,c.throws%2===0?(c.pos.x<GP.x?0:1):(c.pos.x<GP.x?1:0));c.throws++;if(c.throws>=3)later(1.5,()=>{c.leave=true;});}
      if(c.leave&&c.pos.distanceTo(GP)>60){c.alive=false;W.group.remove(c.m.g);}}
    for(const fe of feathers.slice()){fe.t+=dt;if(!fe.refl){const hp=headPos(HEADS[fe.pi]);fe.pos.lerpVectors(fe.from,hp,Math.min(1,fe.t/fe.dur));fe.f.position.copy(fe.pos);fe.f.rotation.z+=dt*8;
        if(fe.t>=fe.dur){feathers.splice(feathers.indexOf(fe),1);W.group.remove(fe.f);SFX.hurt();shake(fe.pi,0.2,0.3);GV.bump=0.5;floatText(hp.clone().add(new V3(0,1,0)),'Ай! Перо','#9ab0ff');}}
      else{const src=fe.src;const to=src.alive?src.pos:fe.pos.clone().add(new V3(0,2,-6));fe.pos.lerp(to,Math.min(1,dt*6));fe.f.position.copy(fe.pos);fe.f.rotation.z-=dt*10;
        if(src.alive&&fe.pos.distanceTo(src.pos)<1.2){killCrow(src,'refl');}if(fe.t>1.2||!src.alive&&fe.t>0.6){feathers.splice(feathers.indexOf(fe),1);W.group.remove(fe.f);}}}
    for(const fr of fires.slice()){fr.t+=dt;fr.pos.addScaledVector(fr.vel,dt);fr.pos.z+=-GV.sp*dt*0.0;fr.m.position.copy(fr.pos);if(Math.random()<0.5)burst(fr.pos.clone(),0xffa040,1,1,0.4);
      const hit=crows.find(c=>c.alive&&c.pos.distanceTo(fr.pos)<2);if(hit){killCrow(hit,'fire');fr.t=9;}if(fr.t>1.4){fires.splice(fires.indexOf(fr),1);W.group.remove(fr.m);}}
    // тучи Кощея: раз-два-три — вместе RT
    for(const cl of CLOUDS){if(cl.state==='gone')continue;const dz=GP.z-cl.z;
      if(cl.state==='wait'&&dz<46){cl.state='count';cl.t=-0.3;cl.press=[null,null];cl.last=-1;if(!F.cloudTold){F.cloudTold=true;sayP('…туча Кощея. На «три» — вместе RT, разом.',3);}}
      if(cl.state==='count'){cl.t+=dt;const B=0.7,k=Math.floor(cl.t/B);cl.dg.visible=k>=0&&k<3;if(k!==cl.last&&k>=0&&k<3){cl.last=k;setDigit(cl.dg,k+1);tone(k===2?1320:880,0.12,'square',0.08);banner(['Раз…','Два…','ТРИ — вместе!'][k],k===2?'#ffd76a':'#ffe8b0',0.6);}
        const T3=2*B;const ok=pi=>cl.press[pi]!==null&&Math.abs(cl.press[pi]-T3)<0.42;
        if(cl.press[0]!==null&&cl.press[1]!==null&&ok(0)&&ok(1)){cl.dg.visible=false;midFire(cl);}
        else if(cl.t>T3+0.5){cl.dg.visible=false;cl.tries++;cl.state='wait2';SFX.miss();banner('Не вместе!','#ffd0d0',1.4,'туча отталкивает — ещё раз, на счёт «три», дружней');GP.z+=26;GV.bump=1;shake(0,0.3,0.5);shake(1,0.3,0.5);}}
      if(cl.state==='wait2'&&dz>30){cl.state='wait';}
      if(cl.state==='count'||cl.state==='wait'||cl.state==='wait2'){if(dz<12){GP.z=cl.z+12;GV.sp=Math.min(GV.sp,4);}}
      if(cl.state==='burn'){cl.t+=dt;if(cl.t>2){cl.state='gone';cl.g.visible=false;}}}
    // утка
    boltTick(dt);swellTick(dt);archTick(dt);paletteTick();segTick();
    for(const sh of SHIPS){sh.g.position.z+=sh.dir*1.2*dt;sh.g.rotation.z=Math.sin(G.time*0.8+sh.ph)*0.06;}
    whale.t+=dt;{const u=(whale.t%9)/9;whale.g.position.y=-2.2+Math.max(0,Math.sin(u*Math.PI*2))*2.4;whale.spout.visible=u>0.12&&u<0.38;whale.spout.scale.y=0.6+Math.sin(G.time*12)*0.1;whale.tail.rotation.z=Math.sin(G.time*1.5)*0.3;}
    if(!F.duck&&CLOUDS.every(c=>c.state==='gone'||c.state==='burn')&&GP.z<-1140){F.duck=true;duck.g.visible=true;DK.pos.set(GP.x,GP.y+4,GP.z-40);banner('Утка!','#ffd76a',2,'догоните — да тяните вместе');bark(T.yosha,'yosha','Вон она, вон!',1.4);}
    if(F.duck){DK.t+=dt;const gap=GP.z-DK.pos.z;DK.pos.z-=(gap>55?9:15)*dt;   // утка летит через арки: x, y — по ломаной между арками
      {const nx=ARCH.find(a=>a.z<DK.pos.z),pv=[...ARCH].reverse().find(a=>a.z>=DK.pos.z);if(nx&&pv){const u=(pv.z-DK.pos.z)/(pv.z-nx.z);DK.pos.x=lerp(pv.x,nx.x,u);DK.pos.y=lerp(pv.y,nx.y,u)+Math.sin(DK.t*3)*0.6;}else{DK.pos.x=Math.sin(DK.t*0.7)*7;DK.pos.y=13+Math.sin(DK.t*1.1)*3;}}duck.g.position.copy(DK.pos);duck.g.rotation.y=Math.PI;duck.wings.forEach(w=>{w.w.rotation.z=w.s*Math.sin(G.time*18)*0.5;});
      if(DK.pos.distanceTo(headPos(MID))<4.5)catchDuck();
      if(GP.z<DK.pos.z+3){GP.z=DK.pos.z+3;GV.sp=Math.min(GV.sp,3);}   // утку не обогнать: догнали — подруливайте к ней
      if(DK.pos.z-GP.z<-70){DK.pos.z=GP.z-45;}if(DK.pos.z<ARCH[ARCH.length-1].z-60)DK.pos.z=ARCH[ARCH.length-1].z-60;}
    waves.forEach(w=>{if(w.position.z>GP.z+40)w.position.z-=140;});sea.position.z=Math.min(-500,GP.z-300);});
  /* ---------- рисунки кнопок и задачи ---------- */
  for(const pi of[0,1]){prompt(pi,'guard',()=>headPos(HEADS[pi]).add(new V3(0,1.4,0)),()=>F.stage==='fly'&&feathers.some(f=>f.pi===pi&&!f.refl&&f.dur-f.t<0.9));
    prompt(pi,'skill',()=>headPos(MID).add(new V3(pi?0.8:-0.8,1.6,0)),()=>F.stage==='fly'&&CLOUDS.some(c=>c.state==='count'&&c.t>0.7),'на «три»');}
  const OR=(text,done,targets,ghost,read)=>{const o=O(text,done,targets,ghost);o.read=read;return o;};
  const mk=pi=>[
    OR('Полёт…',()=>F.stage!=='intro'&&F.stage!=='introCine',()=>[]),
    OR(()=>(pi?'Правая голова — твоя: ':'Левая голова — твоя: ')+MOVEK(pi)+' её ведут. Вместе тянете дольше секунды — Горыныч разгоняется.<br>Огонь — '+K(pi,'attack')+', синее перо — защита '+K(pi,'guard')+', и туча не сгустится.',()=>(F.crowsDown||0)>=3||CLOUDS[0].state==='gone',()=>[],null,'…левая — моя, правая — Варина, средняя — общая.'),
    OR(()=>'Туча Кощея! Цифры «раз-два-три»: на «три» — вместе '+K(pi,'skill')+':<br>средняя голова прожжёт тучу.',()=>CLOUDS.every(c=>c.state==='gone'||c.state==='burn'),()=>CLOUDS.filter(c=>c.state!=='gone').slice(0,1).map(c=>c.g),null,'…средней голове наш «раз-два-три» нужен.'),
    OR(()=>'Утка! Догнать можно лишь вместе — в одну сторону тяните.',()=>F.stage==='end',()=>[duck.g],null,'…утку догоняем над краем моря, над волной.'),
    O('Яйцо…',()=>false,()=>[])];
  for(const pi of[0,1])W.objectives[pi]=mk(pi);
  W.tipZones.push({cond:()=>F.stage==='fly'&&bolts.some(b=>!b.done),text:pi=>'Светится столб — сейчас молния! Уйдите в сторону.'});
  W.tipZones.push({cond:()=>F.stage==='fly'&&SWELLS.some(w=>!w.passed&&GP.z-w.z<60&&GP.z-w.z>0),text:pi=>'Волна стеной — выше! Тяните на себя оба.'});
  W.tipZones.push({cond:()=>F.stage==='fly'&&!!F.seg3&&ARCH.some(a=>!a.passed&&GP.z-a.z<50),text:pi=>'Сквозь облачную арку — рывок, утку догоните.'});
  W.k53={feathers,crows,GV,GP,bolts,SWELLS,ARCH,DK,CLOUDS};   // для бота-напарника: синие перья и вороны
  W.spawns=[[new V3(-0.6,5,20.6),new V3(0.7,5,20.2)],[new V3(-0.7,5,19),new V3(0.6,5,18.6)]];W.startAct=[0,0];
  W.pauseLine='Три отрезка: море, шторм Кощея, погоня за уткой. В шторм светящийся столб — молния, уйдите в сторону; волна стеной — выше.<br>Полёт на Горыныче в узде. Игрок первый левой головой правит, второй — правой; итог — посерёдке.<br>Вместе дольше секунды — разгон. X — огонь, B — защита от синих перьев, RT на «три» — огонь средней головы, как в сказке, чётко.';
  W.onStart=()=>{intro();};
  flushDecor();}

