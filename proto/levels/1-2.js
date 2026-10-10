/* ============================== 1-2 «КИКИМОРИНО БОЛОТО» ============================== */
// развитие клубка: струна на колышке · кувырок (LT) · пень-ворчун: скорлупа и красный сигнал · путь Потапа, шаг 1
function build12(){
  W.zvenAway=true;   // Звенышко улетает вперёд и появляется, только когда нужно
  setTheme('swamp');W.name='1-2 · «Кикиморино болото»';W.sub='Дремучий лес · струна на колышке';W.camX=9;const F=W.flags;
  W.abil.clew=true;W.abil.toss=true;W.abil.roll=true;W.threadLife=5;W.fallY=-2.4;W.sagY=-0.5;
  const ZE=-353;   // уровень в 3,2 раза длиннее прежнего: после толстой струны — Журавль и Цапля, огоньки, Царевна-лягушка, бесёнок Балды, стычка у ворот
  // чёрная густая топь: видимая гладь; под ней пустота (трясина) или мелкая ряска
  const bog=new THREE.Mesh(new THREE.PlaneGeometry(60,380),M(0x1f2a1c));bog.rotation.x=-Math.PI/2;bog.position.set(0,-0.45,-170);bog.receiveShadow=true;W.group.add(bog);
  for(let i=0;i<120;i++){const d=addMesh(new THREE.CircleGeometry(rand(0.3,0.9),10),M(0x4a6a2a),rand(-10,10),-0.43,rand(ZE,-4));d.rotation.x=-Math.PI/2;d.castShadow=false;}   // ряска
  ground(-11,11,-6,8);ground(-11,11,-34,-25.5);ground(-11,11,-60,-52.5);ground(-11,11,-90,-74);ground(-11,11,ZE,-310);
  wall(-11.2,-11,ZE,8);wall(11,11.2,ZE,8);wall(-11.2,11.2,8,8.2);wall(-11.2,11.2,ZE-0.2,ZE);
  edgeTrees(ZE+2,6,-11,11);
  for(const x of[-5.5,5.5]){colBox(x-4.5,x+4.5,-2,-0.55,-12.6,-6);}   // мелко: упадёшь — вылезешь на кочку
  const dead=W.group.children.length;for(let z=-7;z>-25;z-=2.2){addMesh(new THREE.CylinderGeometry(0.18,0.26,3.2,6),M(0x4a3a2a),rand(-0.3,0.3),1.2,z);const br=addMesh(new THREE.CylinderGeometry(0.06,0.08,1.4,5),M(0x4a3a2a),0.4,2.2,z);br.rotation.z=-0.9;}
  wall(-1,1,-25.5,-6);
  bell(0,2);bell(0,-28);bell(3,-55.5);bell(0,-77);
  const Z=makeZven();W.zven=Z;Z.pos.set(0,2.2,-2);
  /* ---------- колышки: над кочкой → над трясиной ---------- */
  const lanes=[-5.5,5.5];const S1=[],S2=[];
  for(const x of lanes){hummock(x,-14,1.5,0.3);S1.push(stake(x+0.5,-14.6,0.3,{h:0.55}));bell(x-0.7,-13.4,0.3);hummock(x,-24,1.5,0.3);S2.push(stake(x+0.4,-24.4,0.3,{h:0.55}));
    nutItem(x-0.7,1.0,-14.5);}
  linkItem(0,1.1,-30);
  /* ---------- высокая ветка: по пенькам наверх, с ветки струна вниз — съезжают, повиснув ---------- */
  const tr=W.group.children.length;addMesh(new THREE.CylinderGeometry(1.1,1.5,12,10),M(0x4a3a2a),-9.2,4,-41);
  for(let i=0;i<9;i++)box(-7.4,-4.2,-1,0.33*(i+1),-34.2-0.62*(i+1),-34.2-0.62*i,M(0x6b4a2b),{occ:false});
  box(-8.4,-1.6,-0.6,3.0,-43.2,-39.7,MAT.bark,{occ:false});addMesh(new THREE.BoxGeometry(6.7,0.1,3.4),MAT.moss,-5,2.96,-41.45);
  for(let i=0;i<6;i++)needle(-9+rand(-1,1),rand(4,7),-41+rand(-1.5,1.5),rand(0,6.28),rand(1.2,1.8));fadeable(since(tr));
  const S3=stake(0.6,-53.6,0,{h:0.6});nutItem(-1.5,1.6,-48.8);
  const branchMark=box(-8.4,-1.6,2.98,3.04,-43.3,-43.2,M(COL.gold,{emissive:COL.gold,emissiveIntensity:0.3}),{solid:false}).mesh;
  linkItem(4.5,1.1,-56);nutItem(-8,0.6,-57.5);
  /* ---------- толстая струна Потапа ---------- */
  const stone=pawStone(0,-58.6);const ST=stake(0,-73.6,0,{h:0.9,thick:true});
  const DEEP={z0:-63.6,z1:-73.4};   // глубокая трясина: тонкая нить дальше не тянется
  const inDeep=(x,z)=>z<DEEP.z0&&z>DEEP.z1&&Math.abs(x)<11.2;
  W.threadStop=(t,tx,tz)=>{if(t.thick)return false;if(inDeep(t.sx,t.sz))return 'kill';if(!inDeep(tx,tz))return false;
    const at=new V3(tx,-0.3,tz);SFX.splash();burst(at,0x6a8a4a,10,2.5);floatText(at.clone().add(new V3(0,1,0)),'Буль! Тонкая нить — на дно','#bfe0a0');
    tip(t.owner,'Тут глубоко — тонкая нить тонет.<br>По толстой струне Потапа только — никто не утонет.',3);return true;};
  W.noGlide=h=>h.pos.z<-60.4&&h.pos.z>-73.6;
  const mist=[];for(let i=0;i<14;i++){const m=new THREE.Mesh(new THREE.CircleGeometry(rand(1.6,2.8),14),MB(0xdfe8dc,{transparent:true,opacity:0.16,depthWrite:false}));
    m.rotation.x=-Math.PI/2;m.position.set(rand(-9,9),rand(0.15,0.9),rand(-72.5,-61.5));m.userData.ph=rand(0,6.28);W.group.add(m);mist.push(m);}
  W.updates.push(dt=>{for(const m of mist){m.userData.ph+=dt*0.4;m.position.x+=Math.sin(m.userData.ph)*dt*0.3;m.material.opacity=0.12+0.06*Math.sin(m.userData.ph*1.7);}
    for(const pi of[0,1]){const h=active(pi);if(h.kind==='pelageya'&&!h.grounded&&btn(pi,'jump')&&W.noGlide(h)&&!h.fogTold){h.fogTold=true;floatText(h.pos.clone().add(new V3(0,1.6,0)),'Туман! Крылышки намокли — не взлететь','#dfe8dc');}
      if(h.grounded)h.fogTold=false;}});
  /* ====================== IV. «Журавль и Цапля» (народная сказка): жили на болоте по разным концам — и всё сватались ====================== */
  // Журавль просит отнести Цапле сватовство. Гать из четырёх струн по кочкам — от его избушки до её. Цапля: «Пусть сам придёт!» — Журавль идёт
  // по струнам, сколько их перекинуто, и ждёт у пустого пролёта (струну позади можно смотать и перекинуть вперёд). Паутинники грызут пустые
  // струны — стой на струне или бей, пока грызёт. Дошёл — свадьба, звено, камыши у избушки Цапли расступаются.
  Object.assign(WHO,{zhuravl:['Журавль','#c8d2e0'],caplya:['Цапля','#f2f4fa'],lyagushka:['Царевна-лягушка','#9fe07a'],bes:['Бесёнок','#e0907a']});
  const dyn=g=>{g.traverse(o=>{o.userData.noBatch=true;});return g;};   // живое и подвижное — не склеивать со статикой (релиз)
  const hutAt=(x,z,col,roof,ry)=>{const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=ry||0;W.group.add(g);
    for(const[sx,sz]of[[-0.8,-0.7],[0.8,-0.7],[-0.8,0.7],[0.8,0.7]])addMesh(new THREE.CylinderGeometry(0.09,0.12,1.7,6),M(0x5a4030),sx,0.85,sz,g);
    addMesh(new THREE.BoxGeometry(2.0,1.3,1.8),M(col),0,2.35,0,g);const rf=addMesh(new THREE.ConeGeometry(1.75,1.2,4),M(roof),0,3.6,0,g);rf.rotation.y=Math.PI/4;
    addMesh(new THREE.BoxGeometry(0.5,0.62,0.06),MAT.dark,0,2.3,0.92,g);addMesh(new THREE.BoxGeometry(0.8,0.08,0.6),M(0x6b4a2b),0,1.72,1.2,g);
    colBox(x-1.15,x+1.15,0,3.6,z-1.05,z+1.05,true);return g;};
  const bird=(x,z,o)=>{const g=new THREE.Group();g.position.set(x,0,z);W.group.add(g);const body=new THREE.Group();g.add(body);const c=M(o.col),dk=M(o.dark),lg=M(0x3a3632);
    const legs=[];for(const s of[-1,1]){const l=new THREE.Group();l.position.set(s*0.13,1.22,0);body.add(l);part(l,new THREE.CylinderGeometry(0.025,0.03,1.22,5),lg,0,-0.61,0);part(l,new THREE.BoxGeometry(0.16,0.03,0.22),lg,0,-1.21,0.05);legs.push(l);}
    part(body,new THREE.SphereGeometry(0.42,12,10),c,0,1.45,0).scale.set(0.8,0.75,1.25);part(body,new THREE.ConeGeometry(0.24,0.55,6),dk,0,1.5,-0.58).rotation.x=-1.9;
    const wings=[];for(const s of[-1,1]){const w=new THREE.Group();w.position.set(s*0.3,1.6,0.05);body.add(w);part(w,new THREE.BoxGeometry(0.06,0.34,0.85),dk,s*0.04,-0.08,-0.12);wings.push(w);}
    const neck=new THREE.Group();neck.position.set(0,1.68,0.36);neck.rotation.x=0.2;body.add(neck);part(neck,new THREE.CylinderGeometry(0.05,0.075,o.neck,6),c,0,o.neck/2,0);
    const head=new THREE.Group();head.position.set(0,o.neck,0);neck.add(head);part(head,new THREE.SphereGeometry(0.13,10,8),c,0,0,0);
    part(head,new THREE.ConeGeometry(0.035,o.beak,5),M(o.beakCol),0,-0.02,o.beak/2+0.08).rotation.x=Math.PI/2;
    for(const s of[-1,1])part(head,new THREE.SphereGeometry(0.026,6,5),MAT.dark,s*0.08,0.04,0.07);
    if(o.cap)part(head,new THREE.SphereGeometry(0.075,8,6),M(0xd03030),0,0.1,-0.01);   // красная шапочка журавля
    if(o.crest)part(head,new THREE.ConeGeometry(0.03,0.38,4),dk,0,0.08,-0.17).rotation.x=-1.25;   // хохолок цапли
    dyn(g);return {g,body,legs,wings,neck,head,ph:rand(0,6),walk:0,flap:0,pos:g.position,d:{height:2.4}};};
  const birdAnim=(b,dt)=>{b.ph+=dt;const w=b.walk>0;b.walk=Math.max(0,b.walk-dt);b.legs.forEach((l,i)=>{l.rotation.x=w?Math.sin(b.ph*7+i*Math.PI)*0.5:0;});
    b.body.position.y=w?Math.abs(Math.sin(b.ph*7))*0.06:Math.sin(b.ph*1.6)*0.015;b.flap=Math.max(0,b.flap-dt);
    b.wings.forEach((wg,i)=>{wg.rotation.z=(i?-1:1)*(b.flap>0?0.5+Math.sin(b.ph*22)*0.6:0.05);});b.neck.rotation.x=0.2+(w?Math.sin(b.ph*7)*0.08:Math.max(0,Math.sin(b.ph*0.9))*0.25);};
  hutAt(-8.4,-86.4,0x8a7a5a,0x5a4a3a,0.5);hutAt(8.4,-146.2,0xc8c0a8,0x7a6a5a,0);
  const CR=bird(-6.4,-88.6,{col:0xb8bec8,dark:0x4c5260,neck:0.75,beak:0.42,beakCol:0x6a5a40,cap:true});CR.g.rotation.y=Math.PI*0.8;
  const CA=bird(6.0,-144.6,{col:0xeef1f5,dark:0x8a96a6,neck:0.9,beak:0.5,beakCol:0xd8b040,crest:true});CA.g.rotation.y=-Math.PI*0.65;
  const GK=[[-1.6,-102],[1.6,-114.5],[-1.6,-127]],GS=[];   // кочки гати; четвёртый колышек — на берегу Цапли
  for(const[x,z]of GK){hummock(x,z,1.5,0.3);GS.push(stake(x+0.3,z-0.7,0.3,{h:0.42}));}   // колышки пониже: на конец струны можно шагнуть с кочки
  GS.push(stake(0.5,-140.6,0,{h:0.4}));nutItem(3.4,1.0,-114);
  const gStr=i=>{const s=GS[i].used;return s&&s.string&&!s.sag&&!s.ret&&W.threads.includes(s)?s:null;};
  const wedLink=linkItem(3.0,1.2,-147.6);wedLink.locked=true;wedLink.g.visible=false;
  // камыши у избушки Цапли: расступаются после свадьбы
  const reeds=[];for(let x=-10.7;x<=10.75;x+=0.6){const r=new THREE.Group();r.position.set(x,0,-155.4+rand(-0.25,0.25));W.group.add(r);const h=rand(2.8,3.6);
    part(r,new THREE.CylinderGeometry(0.05,0.08,h,5),M(0x8a8a3a),0,h/2,0);if(Math.random()<0.6)part(r,new THREE.CylinderGeometry(0.09,0.09,0.42,6),M(0x6a4024),0,h-0.3,0);
    r.rotation.z=rand(-0.08,0.08);dyn(r);reeds.push(r);}
  const reedCol=colBox(-11,11,0,4.6,-155.8,-155.0,false);
  const WD={stage:'ask',seg:0,leg:'go',u:0,told:false,nag:0,cut:0,left:3};F.wed=WD;   // во флагах — только простые значения
  // Тать-Паутинник на болоте — заметный: крупнее, тёмно-фиолетовый с серебряными нитями, красные глаза, светящийся круг под ним и красный ромб над
  // головой (виден издалека); оранжевые искры над ним — сколько ударов осталось
  const tatKit=e=>{e.inner.traverse(o=>{if(!o.isMesh)return;const c=o.material.color.getHex();
      if(c===0x5a4a3a)o.material=M(0x6a2a86,{emissive:0x3a0a50,emissiveIntensity:0.55});else if(c===0x9a8660)o.material=M(0xe8e8ff,{emissive:0x9090c0,emissiveIntensity:0.7});else if(c===0x2a2018)o.material=M(0x1a1020);});
    e.eyeMat.color.setHex(0xff3030);e.eyeMat.emissive.setHex(0xff2020);
    const ring=new THREE.Mesh(new THREE.TorusGeometry(e.r*1.9,0.07,6,32),MB(0xff5a2a,{transparent:true,opacity:0.8,depthWrite:false}));ring.rotation.x=-Math.PI/2;ring.position.y=0.08;e.g.add(ring);
    const mk=new THREE.Mesh(new THREE.OctahedronGeometry(0.22),M(0xff3a2a,{emissive:0xff2a1a,emissiveIntensity:1.2}));mk.position.y=e.L.top*e.s+1.25;mk.scale.y=1.5;e.g.add(mk);
    ring.castShadow=mk.castShadow=false;e.kit={ring,mk,y:mk.position.y};e.g.traverse(o=>{o.userData.noBatch=true;});return e;};
  W.updates.push(dt=>{for(const e of W.enemies){if(!e.kit)continue;const K=e.kit;if(!e.alive){K.ring.visible=K.mk.visible=false;continue;}
    const f=e.chew?14:4;K.ring.material.opacity=0.45+0.4*Math.abs(Math.sin(G.time*f));K.ring.scale.setScalar(e.chew?1+0.12*Math.sin(G.time*f):1);
    K.mk.rotation.y+=dt*3;K.mk.position.y=K.y+Math.sin(G.time*4)*0.12;}});
  // Паутинники засели на кочках гати: грызут струны, на которых никто не стоит, и бьют подошедших. Пока хоть один на гати — Журавль не пойдёт.
  // Бьют только «жёлтым» (щит и отбив): на тесной кочке кувырок сбросил бы героя в трясину
  const GT=[],angry=e=>{const tk=e.tick;e.tick=(q,dt)=>{if(HEROES.some(h=>h.active&&hd(h.pos,q.pos)<4.5&&Math.abs(h.pos.y-q.pos.y)<1.4))q.prov=Math.max(q.prov,2.5);tk(q,dt);};return e;};
  const spawnGat=()=>{GK.forEach(([x,z])=>{GT.push(tatKit(angry(tatFoe(x-0.3,z+0.3,{y:0.3,leash:0.9,scale:1.45,signals:['yellow']}))));burst(new V3(x,0.6,z),0x9a6ad0,14,3);});SFX.splash();
    banner('Паутинники на гати!','#e0b0ff',2.8,'засели на кочках · грызут струны · победи всех — тогда Журавль пойдёт');};
  let gatHiss=0;
  const crTo=(x,z,dt,sp)=>{const dx=x-CR.pos.x,dz=z-CR.pos.z,d=Math.hypot(dx,dz);if(d<0.05)return true;const st=Math.min(d,(sp||1.7)*dt);CR.pos.x+=dx/d*st;CR.pos.z+=dz/d*st;
    CR.g.rotation.y=angDamp(CR.g.rotation.y,Math.atan2(dx,dz),8,dt);const gy=groundAt(CR.pos.x,CR.pos.z,CR.pos.y+1.2,0.1).y;
    if(gy<-1){CR.flap=0.2;CR.pos.y=lerp(CR.pos.y,0.9,1-Math.exp(-6*dt));}else CR.pos.y=lerp(CR.pos.y,gy,1-Math.exp(-10*dt));CR.walk=0.15;return false;};
  W.updates.push(dt=>{birdAnim(CR,dt);birdAnim(CA,dt);
    {const n=GT.filter(e=>e.alive).length;if(GT.length&&n<WD.left){WD.left=n;SFX.ok();banner(n?'Паутинник побеждён!':'Гать чиста!','#e0b0ff',2.0,n?'осталось '+n:'все Паутинники побеждены');}
      gatHiss-=dt;if(n&&gatHiss<=0){const e=GT.find(q=>q.alive&&!q.chew&&HEROES.some(h=>h.active&&hd(h.pos,q.pos)<10));if(e){gatHiss=rand(3,5);floatText(e.pos.clone().add(new V3(0,2.4,0)),['Ш-ш-ш! Не пущу!','Моя гать!','Ш-ш! Перегрызу!'][Math.floor(rand(0,3))],'#e0b0ff');}}}
    if(WD.stage==='ask'){if(!WD.told&&HEROES.some(h=>h.active&&h.pos.z<-80)){WD.told=true;bark(CR,'zhuravl','Ох, болото широкое — семь вёрст! Отнесите Цапле моё сватовство!',3.2);later(1.0,spawnGat);}
      if(HEROES.some(h=>h.active&&h.grounded&&h.pos.z<-140.2&&h.pos.z>-156)){WD.stage='carry';
        bark(CA,'caplya','Сватается? А пусть сам ко мне придёт — по струночке, ножек не замочив!',3.4);
        later(4.6,()=>{if(WD.left>0){WD.stage='blocked';say('zhuravl','Паутинники на гати — ноги мне запутают! Прогоните их всех — тогда пойду.',4.6);}
          else{WD.stage='walk';SFX.gate();say('zhuravl','Гать чиста! Иду-иду — свататься!',3.2);banner('Журавль идёт свататься!','#e8eef8',2.4,'держите струны — не сматывайте, пока не дойдёт');}});}}
    else if(WD.stage==='blocked'){if(WD.left===0){WD.stage='walk';SFX.gate();say('zhuravl','Гать чиста! Иду-иду — свататься!',3.2);banner('Журавль идёт свататься!','#e8eef8',2.4,'держите струны — не сматывайте, пока не дойдёт');}}
    else if(WD.stage==='walk'){
      if(WD.seg>=GS.length){if(crTo(3.0,-145.0,dt)){WD.stage='wed';WD.t=0;}}
      else{const s=gStr(WD.seg);
        if(WD.leg==='go'){if(!s){WD.nag-=dt;if(WD.nag<=0&&HEROES.some(h=>h.active&&hd(h.pos,CR.pos)<30)){WD.nag=9;bark(CR,'zhuravl',WD.seg===0?'Где же струна? С моего бережка до первой кочки перекиньте!':'Дальше пусто… Перекиньте струну — я подожду.',2.8);}return;}
          if(crTo(s.sx,s.sz,dt)){WD.leg='str';WD.u=0;}}
        else{if(!s){CR.flap=1.2;WD.leg='go';WD.cut++;bark(CR,'zhuravl','Ой-ой, перегрызли! Крылья выручили — назад!',2.4);   // струну под ним перегрызли — вспорхнул назад
            const b=WD.seg?GK[WD.seg-1]:[-1.6,-89.2];anim(0.9,k=>{CR.pos.x=lerp(CR.pos.x,b[0],k*0.3);CR.pos.z=lerp(CR.pos.z,b[1],k*0.3);CR.pos.y=0.3+Math.sin(k*Math.PI)*1.2;});return;}
          WD.u=Math.min(s.len,WD.u+1.5*dt);CR.pos.set(s.sx+s.dx*WD.u,thY(s,WD.u),s.sz+s.dz*WD.u);CR.g.rotation.y=angDamp(CR.g.rotation.y,Math.atan2(s.dx,s.dz),8,dt);CR.walk=0.15;
          if(WD.u>=s.len-0.05){WD.seg++;WD.leg='go';if(WD.seg<GS.length)floatText(CR.pos.clone().add(new V3(0,2.6,0)),'Курлы!','#e8eef8');}}}}
    else if(WD.stage==='wed'){WD.t+=dt;const k=WD.t;CA.walk=CR.walk=0.15;
      if(k<1.2){CA.pos.x=lerp(CA.pos.x,4.3,dt*2);CA.pos.z=lerp(CA.pos.z,-145.2,dt*2);}
      const a=k*2.2;CR.g.rotation.y=Math.atan2(CA.pos.x-CR.pos.x,CA.pos.z-CR.pos.z)+Math.sin(a)*0.6;CA.g.rotation.y=Math.atan2(CR.pos.x-CA.pos.x,CR.pos.z-CA.pos.z)-Math.sin(a)*0.6;
      CR.flap=CA.flap=0.1;CR.body.position.y=CA.body.position.y=Math.abs(Math.sin(a*1.5))*0.35;
      if(!WD.sang){WD.sang=true;SFX.ok();bark(CA,'caplya','Ну, раз пешком пришёл — пойду за тебя, долговязый!',3.0);later(4.2,()=>bark(CR,'zhuravl','Курлы-курлы! Спасибо, ребятки, — вот вам звено на счастье!',3.0));
        banner('Свадьба на болоте!','#ffe0f0',2.6,'Журавль и Цапля больше не ссорятся');for(let i=0;i<5;i++)later(i*0.5,()=>burst(new V3(3.6,2.2,-145.2),[0xff9ab8,0xffffff,0xffd76a][i%3],14,3));}
      if(k>3.4&&wedLink.locked){wedLink.locked=false;wedLink.g.visible=true;const p0=new V3(3.6,2.6,-145.2),p1=new V3(3.0,1.2,-147.6);anim(0.8,q=>{wedLink.pos.lerpVectors(p0,p1,q);wedLink.pos.y+=Math.sin(q*Math.PI)*1.4;});
        wedLink.base=1.2;}
      if(k>5.0){WD.stage='done';SFX.gate();reedCol.on=false;reeds.forEach((r,i)=>{const s=r.position.x<0?1:-1;anim(1.0,q=>{r.rotation.z=s*q*1.3;r.position.y=-q*0.6;});});
        floatText(new V3(0,2.6,-155.4),'Камыши расступились!','#d8f0a0');}}});
  // по струне — как по канату: на ровной струне героя мягко держит на середине (клавиатура ходит лишь в восемь сторон, а гать идёт вкось)
  W.updates.push(dt=>{for(const h of HEROES){const t=h.grounded&&h.groundRef&&h.groundRef.string&&!h.groundRef.sag?h.groundRef:null;if(!t||h.hang||Math.abs(t.y2-t.y)/Math.max(t.len,0.1)>0.14)continue;
    const lat=(h.pos.x-t.sx)*t.dz-(h.pos.z-t.sz)*t.dx,k=Math.min(1,10*dt);h.pos.x-=t.dz*lat*k;h.pos.z+=t.dx*lat*k;}});
  W.onTatCut=(t,e)=>{floatText(e.pos.clone().add(new V3(0,1.6,0)),'Перегрыз! Струну — заново, а его — бей!','#ffd0a0');};
  W.onString=t=>{const mine=W.threads.filter(q=>q.owner===t.owner&&q.string&&!q.ret);if(WD.stage!=='done'&&t.stake&&GS.includes(t.stake)&&mine.length>=3)
    tip(t.owner,'Это твоя третья струна — больше не удержать: четвёртая смотает самую старую.<br>Пусть следующую друг кинет — или смени героя.',3);};

  /* ====================== V. Огоньки-обманщики (поверье: кикиморины огни заманивают в трясину) ====================== */
  // Туман, трясина. Четыре развилки, у каждой — три огонька. Тропа из кочек утоплена; Прошка щёлкает огонёк из рогатки: ложный лопается
  // («Хи-хи!» — кикиморка), настоящий звенит и поднимает тропу. На второй и четвёртой тропе последняя кочка засохла — Йоша поливает живой водой.
  ground(-11,11,-156,-139.5);bell(-1.2,-143.2);nutItem(-7.5,0.6,-150);
  const FOGZ=[-156.2,-223.8],inFog=(x,z)=>z<FOGZ[0]&&z>FOGZ[1]&&Math.abs(x)<11.2;
  // groundAt считает опорой и саму летящую нить: без «ret» (её пропускают) нить держала сама себя, не тонула, и тумана хватало одной нити в 15 м — огоньки не нужны
  const gNoSelf=(t,x,z,reach,m)=>{const q=t.ret;t.ret=true;const g=groundAt(x,z,reach,m);t.ret=q;return g;};
  {const ts=W.threadStop;W.threadStop=(t,tx,tz)=>{if(!t.thick&&inFog(t.sx,t.sz)&&!gNoSelf(t,t.sx,t.sz,t.y+0.5,0.2).ref)return 'kill';
      if(!t.thick&&inFog(tx,tz)&&gNoSelf(t,tx,tz,t.y+0.5,0.1).y<-1){const at=new V3(tx,-0.3,tz);SFX.splash();burst(at,0x6a8a4a,8,2.5);floatText(at.clone().add(new V3(0,1,0)),'Буль! Туман — тут топко','#bfe0a0');
        if(!F.fogTold){F.fogTold=true;tip(t.owner,'Нить в тумане тонет. Прошка щёлкнет настоящий огонёк из рогатки — тропка из кочек всплывёт сама.',3.4);}return true;}
      return ts(t,tx,tz);};
    const ng=W.noGlide;W.noGlide=h=>ng(h)||inFog(h.pos.x,h.pos.z);}
  // кромки: берег Цапли, три островка поперёк тумана (глубиной 3 м), дальний берег. Тропа — три кочки через 1,8 м (по силам и Потапу);
  // без засохшей средней — 6,1 м: не перепрыгнуть и Прошке
  const ISL=[-156,-170.7,-188.4,-206.1,-223.8],TRUE=[6,-6,0,-6],DRY=[false,true,false,true],forks=[];
  for(let k=1;k<4;k++)ground(-7.5,7.5,ISL[k]-3,ISL[k]);bell(1.5,ISL[1]-1.2);nutItem(-1.2,1.3,ISL[2]-1.5);
  const aimed=p=>{const h=HERO.proshka,dx=p.x-h.pos.x,dz=p.z-h.pos.z,d=Math.hypot(dx,dz)||1;return (dx*Math.sin(h.face)+dz*Math.cos(h.face))/d>0.9;};   // щёлкнуть можно тот огонёк, на который Прошка смотрит
  const wispMat=()=>MB(0xb8f0ff,{transparent:true,opacity:0.85,depthWrite:false});
  for(let k=0;k<4;k++){const zs=k?ISL[k]-3:ISL[0],x=TRUE[k],fk={k,zs,x,open:false,lane:[],wisps:[],dry:null};forks.push(fk);
    const pts=[[x,zs-3.05],[x,zs-7.35],[x,zs-11.65]];
    pts.forEach(([px,pz],i)=>{const dry=DRY[k]&&i===1,g=new THREE.Group();g.position.set(px,-1.6,pz);W.group.add(g);
      part(g,new THREE.CylinderGeometry(1.1,1.25,1.2,12),M(dry?0x6a5a3a:0x5d6b34),0,-0.6,0);for(let j=0;j<3;j++)part(g,new THREE.ConeGeometry(0.1,0.45,4),M(dry?0x8a7a4a:0x7a8a3a),rand(-0.6,0.6),0.15,rand(-0.6,0.6));
      dyn(g);const col={x:px,z:pz,r:1.25,miny:-3,maxy:-1.6,on:false};W.cyls.push(col);fk.lane.push({g,col,dry,top:0.3,cur:-1.6});if(dry)fk.dry=fk.lane[1];});
    for(const wx of[-6,0,6]){const g=new THREE.Group();g.position.set(wx,1.9,zs-7.35);W.group.add(g);const core=part(g,new THREE.SphereGeometry(0.2,10,8),wispMat(),0,0,0);
      const halo=part(g,new THREE.SphereGeometry(0.42,10,8),MB(0x9fe8ff,{transparent:true,opacity:0.22,depthWrite:false}),0,0,0);core.castShadow=halo.castShadow=false;dyn(g);
      const w={g,core,halo,real:wx===x,gone:false,ph:rand(0,6),base:g.position.clone()};fk.wisps.push(w);
      W.marks.push({pos:g.position,active:()=>!w.gone&&!fk.open&&(k===0||forks[k-1].open)&&aimed(g.position),onHit:()=>{
        if(w.real){fk.open=true;SFX.dzin();SFX.grow();core.material.color.setHex(0xffd76a);halo.material.color.setHex(0xffd76a);floatText(g.position.clone().add(new V3(0,0.8,0)),'Дзинь! Настоящий!','#ffd76a');
          fk.wisps.forEach(o=>{if(o!==w&&!o.gone){o.gone=true;o.g.visible=false;}});later(0.3,()=>say('zven',k===0?'Дзинь! Вот она, тропка — кочки сами всплывают!':'Дзинь-дзинь! Сюда!',2.2));}
        else{w.gone=true;SFX.splash();tone(880,0.07,'square',0.08,1200);tone(1100,0.07,'square',0.08,1500,0.09);tone(990,0.08,'square',0.08,1300,0.18);
          burst(g.position.clone(),0x7ad06a,14,3);burst(new V3(wx,-0.3,zs-7.35),0x4a6a3a,10,2.5);floatText(g.position.clone().add(new V3(0,0.7,0)),'Хи-хи! Обманули!','#a8e090');g.visible=false;
          if(!F.wispTold){F.wispTold=true;later(0.5,()=>say('kiki','Хи-хи-хи! Мой огонёчек — прямо в трясинку манит!',2.6));}}}});}
    if(fk.dry){const d=fk.dry;W.waterTargets.push({pos:new V3(d.col.x,0,d.col.z),pri:1.6,active:()=>fk.open&&d.dry,onWater:()=>{d.dry=false;SFX.grow();d.top=0.3;
      d.g.children.forEach(c=>{if(c.material)c.material=M(c.geometry.type==='ConeGeometry'?0x7a8a3a:0x5d6b34);});burst(new V3(d.col.x,0.4,d.col.z),0x9fe6ff,14,4);floatText(new V3(d.col.x,1.4,d.col.z),'Кочка ожила!','#9fe6ff');}});}}
  const fogMist=[];for(let i=0;i<26;i++){const m=new THREE.Mesh(new THREE.CircleGeometry(rand(1.8,3.2),14),MB(0xdfe8dc,{transparent:true,opacity:0.16,depthWrite:false}));
    m.rotation.x=-Math.PI/2;m.position.set(rand(-9.5,9.5),rand(0.2,1.2),rand(FOGZ[1]+1,FOGZ[0]-1));m.userData.ph=rand(0,6.28);m.castShadow=false;W.group.add(m);fogMist.push(m);}
  W.updates.push(dt=>{for(const m of fogMist){m.userData.ph+=dt*0.35;m.position.x+=Math.sin(m.userData.ph)*dt*0.3;m.material.opacity=0.12+0.07*Math.sin(m.userData.ph*1.6);}
    for(const fk of forks){for(const w of fk.wisps){if(w.gone&&!(w.real&&fk.open))continue;w.ph+=dt;
        if(w.real&&fk.open){const tz=fk.zs-16.2;w.g.position.lerp(new V3(fk.x*0.5,1.6,tz),1-Math.exp(-2*dt));}else w.g.position.set(w.base.x+Math.sin(w.ph*1.3)*0.35,w.base.y+Math.sin(w.ph*2.1)*0.22,w.base.z);
        w.halo.material.opacity=0.16+0.1*Math.sin(w.ph*5);}
      for(const L of fk.lane){const want=!fk.open?-1.6:L.dry?-0.95:L.top;if(Math.abs(L.cur-want)>0.002){L.cur=lerp(L.cur,want,1-Math.exp(-3*dt));if(Math.abs(L.cur-want)<0.01)L.cur=want;}
        L.g.position.y=L.cur;L.col.maxy=L.cur;L.col.on=L.cur>-1.5&&!L.dry;}}});

  /* ====================== VI. «Царевна-лягушка»: стрела Ивана-царевича и кувшинки в лад ====================== */
  // Стрелу Ивана-царевича ветер закинул на сухую ольху. Прошка сбивает её из рогатки — Лягушка ловит стрелу и квакает в лад: кувшинки
  // всплывают по очереди (одни — на «Ква!», другие — на «Ква-ква!»). Посередине кувшинка завяла (видна, но не держит) — Йоша оживляет её живой водой. Пруд глубокий: мимо кувшинки — плюх, и снова у колокольчика.
  ground(-11,11,-240,-223.8);const pondBell=bell(-1.2,-225.8);
  // колокольчик у пруда звенит для каждого, кто вышел на берег пруда (даже мимо него): утонул в пруду — сюда, а не назад в туман
  W.updates.push(()=>{const b=pondBell;for(const pi of[0,1]){if(b.act[pi])continue;const h=active(pi);if(!(h.grounded&&h.pos.z<-227.5&&h.pos.z>-240&&h.pos.y>-0.2))continue;
    b.act[pi]=true;const p=players[pi];p.cp.set(b.x,0,b.z+1.2);p.cpBell=b;p.petals=3;SFX.bell();b.swing=1.2;b.bm.emissiveIntensity=0.5;b.bm.color.setHex(0xffd060);
    tip(pi,'Колокольчик! Коль упадёшь — сюда вернёшься, не пропадёшь.',2.4);}});
  const pondW=new THREE.Mesh(new THREE.PlaneGeometry(22,37),M(0x2a4636));pondW.rotation.x=-Math.PI/2;pondW.position.set(0,-0.44,-258.5);pondW.receiveShadow=true;W.group.add(pondW);
  W.hummocks.push({x:0,z:-238.8,y:0});   // дна у пруда нет: по воде не пропрыгать
  {const ts=W.threadStop;W.threadStop=(t,tx,tz)=>{if(!t.thick&&tz<-240&&tz>-277&&Math.abs(tx)<11.2){const at=new V3(tx,-0.3,tz);SFX.splash();burst(at,0x6a9a6a,8,2.5);
      floatText(at.clone().add(new V3(0,1,0)),'Буль! В пруду у Лягушки нить тонет','#bfe0a0');return true;}return ts(t,tx,tz);};}
  // сухая ольха со стрелой
  addMesh(new THREE.CylinderGeometry(0.28,0.45,6.4,7),M(0x5a4a3a),-8.6,3.0,-246.2);for(const[a,y]of[[0.9,4.2],[-0.8,5.0],[1.6,5.6]]){const b=addMesh(new THREE.CylinderGeometry(0.06,0.1,2.0,5),M(0x5a4a3a),-8.6+Math.sin(a)*0.8,y,-246.2+Math.cos(a)*0.5);b.rotation.z=-a*0.8;}
  colBox(-9.0,-8.2,0,6,-246.6,-245.8,true);
  const arrow=new THREE.Group();arrow.position.set(-7.7,5.15,-246.5);arrow.rotation.z=-0.35;W.group.add(arrow);part(arrow,new THREE.CylinderGeometry(0.03,0.03,1.4,5),M(0xc89a50),0,0,0).rotation.z=Math.PI/2;
  part(arrow,new THREE.ConeGeometry(0.07,0.22,5),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.6}),0.78,0,0).rotation.z=-Math.PI/2;part(arrow,new THREE.BoxGeometry(0.24,0.12,0.02),M(0xe0e0e0),-0.66,0,0);dyn(arrow);
  // Лягушка на большой кувшинке
  const lilyMesh=(r,col)=>{const g=new THREE.Group();const m=part(g,new THREE.CylinderGeometry(r,r,0.1,14,1,false,0.35,Math.PI*2-0.35),M(col),0,-0.05,0);m.receiveShadow=true;return g;};
  const bigLily=lilyMesh(1.8,0x4f8a3a);bigLily.position.set(6.0,0.06,-253);W.group.add(bigLily);W.cyls.push({x:6.0,z:-253,r:1.8,miny:-2,maxy:0.08,on:true});W.hummocks.push({x:6.0,z:-253,y:0.08});
  const FR=(()=>{const g=new THREE.Group();g.position.set(6.3,0.08,-253.4);g.rotation.y=-2.3;W.group.add(g);const body=new THREE.Group();g.add(body);const c=M(0x6ab04a),bl=M(0xd8e8a0);
    part(body,new THREE.SphereGeometry(0.42,12,10),c,0,0.34,0).scale.set(1.15,0.8,1.0);part(body,new THREE.SphereGeometry(0.3,10,8),bl,0,0.28,0.18).scale.set(1.1,0.7,0.7);
    for(const s of[-1,1]){part(body,new THREE.SphereGeometry(0.13,10,8),c,s*0.2,0.66,0.12);part(body,new THREE.SphereGeometry(0.07,8,6),M(0xfff3a0),s*0.22,0.7,0.2);part(body,new THREE.SphereGeometry(0.035,6,5),MAT.dark,s*0.23,0.71,0.26);
      part(body,new THREE.SphereGeometry(0.16,8,6),c,s*0.36,0.1,0.18).scale.set(1,0.5,1.4);}
    const crown=new THREE.Group();crown.position.set(0,0.82,0.02);body.add(crown);const gm=M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.5});
    part(crown,new THREE.CylinderGeometry(0.16,0.18,0.1,10),gm,0,0,0);for(let i=0;i<5;i++){const a=i/5*Math.PI*2;part(crown,new THREE.ConeGeometry(0.035,0.12,4),gm,Math.sin(a)*0.15,0.1,Math.cos(a)*0.15);}
    const throat=part(body,new THREE.SphereGeometry(0.16,10,8),bl,0,0.24,0.32);dyn(g);return {g,body,throat,pos:g.position,d:{height:1.0},ph:0};})();
  const PADS=[[-1.5],[0.8],[2.8],[0.8],[-1.4],[-3.6],[-1.0],[2.0],[3.4],[1.2],[-0.6]].map(([x],i)=>{const z=-243.2-3.2*i,wil=i===6,g=lilyMesh(wil?1.0:1.1,wil?0x7a6a3a:0x5a9a40);
    if(!wil&&i%3===1)part(g,new THREE.ConeGeometry(0.18,0.3,6),M(0xf4f0f8),0.3,0.12,0.2);   // цветок кувшинки
    let dead=null;if(wil){dead=new THREE.Group();g.add(dead);const dm=M(0x6a5228);   // завяла: бурая, края загнулись, цветок поник — видна на воде, но не держит
      for(let k=0;k<7;k++){const a=k/7*Math.PI*2+0.3,c=part(dead,new THREE.ConeGeometry(0.16,0.42,4),dm,Math.sin(a)*0.86,0.06,Math.cos(a)*0.86);c.rotation.set(Math.cos(a)*1.2,0,-Math.sin(a)*1.2);}
      const st=part(dead,new THREE.CylinderGeometry(0.025,0.03,0.5,5),M(0x5a4a22),0.1,0.2,0.05);st.rotation.z=0.9;part(dead,new THREE.ConeGeometry(0.14,0.22,6),M(0x8a6a3a),0.32,0.3,0.05).rotation.z=2.2;
      g.rotation.set(0.07,0,-0.05);}
    const y0=wil?-0.4:-0.8;g.position.set(x,y0,z);W.group.add(g);dyn(g);const col={x,z,r:wil?1.0:1.1,miny:-3,maxy:y0,on:!wil};W.cyls.push(col);return {g,col,i,grp:i%2,wil,cur:y0,dead};});
  const FG={sing:false,t:0,beat:-1,lily:false,told:false};F.frog=FG;
  W.marks.push({pos:arrow.position,active:()=>!FG.sing&&!FG.drop,onHit:()=>{FG.drop=true;SFX.latch();const p0=arrow.position.clone(),p1=new V3(5.6,1.2,-253.0);
    anim(1.1,k=>{arrow.position.lerpVectors(p0,p1,k);arrow.position.y+=Math.sin(k*Math.PI)*3.2;arrow.rotation.z=-0.35-k*6;if(k>=1){arrow.visible=false;FG.sing=true;FG.t=0;
      SFX.ok();burst(p1,COL.gold,16,3);bark(FR,'lyagushka','Ква! Стрела Ивана-царевича! Ну, держитесь — запою, а кувшинки в лад запляшут!',3.6);
      banner('Кувшинки в лад!','#b8f0a0',2.4,'на «Ква!» всплывают одни, на «Ква-ква!» — другие');}});}});
  W.waterTargets.push({pos:new V3(PADS[6].col.x,0,PADS[6].col.z),pri:1.5,active:()=>FG.sing&&!FG.lily,onWater:()=>{FG.lily=true;const P=PADS[6];P.wil=false;P.col.r=1.35;
    if(P.dead)P.dead.visible=false;P.g.rotation.set(0,0,0);part(P.g,new THREE.ConeGeometry(0.18,0.3,6),M(0xf4f0f8),0.3,0.12,0.2);
    P.g.scale.set(1.35,1,1.35);P.g.children[0].material=M(0x4f8a3a);SFX.grow();burst(new V3(P.col.x,0.3,P.col.z),0x9fe6ff,16,4);floatText(new V3(P.col.x,1.2,P.col.z),'Кувшинка ожила — и не тонет!','#9fe6ff');
    later(0.6,()=>bark(FR,'lyagushka','Ква-а! Живая водица — моей кувшинке водица!',2.4));}});
  W.updates.push(dt=>{FR.ph+=dt;
    // мимо кувшинки (или кувшинка ушла под воду) — плюх: пруд глубокий, сразу назад к колокольчику; по воде не пропрыгать
    for(const h of HEROES){if(h.pos.z<-240&&h.pos.z>-277&&Math.abs(h.pos.x)<11.2&&h.pos.y<-0.3&&!h.cling){const at=new V3(h.pos.x,-0.3,h.pos.z);SFX.splash();burst(at,0x6a9a6a,12,3);
      const W6=PADS[6];floatText(at.clone().add(new V3(0,1.2,0)),W6.wil&&hd(h.pos,W6.col)<1.4?'Завяла — не держит! Полей живой водой':'Плюх!','#9fd8a0');onFall(h);}}
    if(!FG.told&&HEROES.some(h=>h.active&&h.pos.z<-230)){FG.told=true;bark(FR,'lyagushka','Ква-а… Стрелу Ивана-царевича ветер на сухую ольху закинул. Без неё не поётся!',3.6);}
    const T=3.0;let beat=-1;if(FG.sing){FG.t+=dt;const s=Math.sin(FG.t*Math.PI*2/T);beat=s>0?0:1;
      if(beat!==FG.beat){FG.beat=beat;tone(beat?150:190,0.12,'square',0.1,beat?100:130);if(beat)tone(150,0.1,'square',0.09,100,0.18);FR.body.scale.set(1.1,0.85,1.1);FR.throat.scale.setScalar(1.8);
        floatText(FR.pos.clone().add(new V3(0,1.3,0)),beat?'Ква-ква!':'Ква!','#b8f0a0');}}
    FR.body.scale.lerp(new V3(1,1,1),1-Math.exp(-6*dt));FR.throat.scale.lerp(new V3(1,1,1),1-Math.exp(-5*dt));
    for(const P of PADS){let up=false;if(FG.sing){const s=Math.sin(FG.t*Math.PI*2/T);up=P.wil?false:P.i===6?true:(P.grp===0?s>-0.4:s<0.4);}
      if(P.wil){P.g.position.y=-0.4+Math.sin(G.time*1.3+P.i)*0.015;P.col.on=false;continue;}   // завядшая лежит на воде и не держит
      const want=up?0.05:-0.8;P.cur=lerp(P.cur,want,1-Math.exp(-9*dt));P.g.position.y=P.cur;P.col.maxy=P.cur;P.col.on=P.cur>-0.35;}});   // ушла под воду — не держит
  nutItem(6.2,1.1,-252.2);

  /* ====================== VII. «Сказка о попе и о работнике его Балде» (Пушкин): бесёнок, бег вокруг омута и кобыла ====================== */
  // Струны мутят омут — выскакивает бесёнок: «Обгони меня вокруг омута!» Бегом его не обогнать. Как у Балды с двумя зайцами: пока он бежит
  // кругом, «братишка» уже ждёт у финиша — перекинь струну через омут (или пусть друг заранее встанет у флажка). Потом «подними-ка кобылу»:
  // бесёнок не может, а Потап поднимает колоду-кобылу — путь открыт, бесёнок платит оброк орешками.
  ground(-11,11,-298,-277);ground(-11,-6.5,-310,-298);ground(6.5,11,-310,-298);bell(-1.5,-283.4);
  const omut=new THREE.Mesh(new THREE.PlaneGeometry(13,12),M(0x0d1a1c));omut.rotation.x=-Math.PI/2;omut.position.set(0,-0.42,-304);W.group.add(omut);
  const swirl=[];for(let i=0;i<3;i++){const m=new THREE.Mesh(new THREE.TorusGeometry(1.2+i*1.3,0.05,6,32),MB(0x4a7a7a,{transparent:true,opacity:0.35,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.set(0,-0.38,-304);W.group.add(m);dyn(m);swirl.push(m);}
  const finStake=stake(0,-311.2,0,{h:0.7});
  const flag=new THREE.Group();flag.position.set(2.4,0,-312.6);W.group.add(flag);part(flag,new THREE.CylinderGeometry(0.05,0.06,2.2,6),M(0x6b4a2b),0,1.1,0);
  part(flag,new THREE.BoxGeometry(0.02,0.4,0.6),M(0xd03030),0,1.95,0.3);
  const raceMat=new THREE.Group();raceMat.position.set(0,0.02,-294.4);W.group.add(raceMat);part(raceMat,new THREE.CylinderGeometry(0.9,0.9,0.06,16),M(0xc8a060,{emissive:0x604010,emissiveIntensity:0.3}),0,0,0);
  for(let i=0;i<6;i++)part(raceMat,new THREE.BoxGeometry(0.14,0.07,0.6),MAT.dark,-0.35+i*0.14,0.02,0).visible=i%2===0;
  const BS=(()=>{const g=new THREE.Group();g.position.set(-1.8,0,-294.8);W.group.add(g);const body=new THREE.Group();g.add(body);const c=M(0x3a2a3a),sk=M(0xd08a70);
    part(body,new THREE.SphereGeometry(0.3,12,10),c,0,0.5,0).scale.set(1,1.15,0.9);const head=new THREE.Group();head.position.set(0,0.95,0.02);body.add(head);
    part(head,new THREE.SphereGeometry(0.24,12,10),c,0,0,0);part(head,new THREE.SphereGeometry(0.1,8,6),sk,0,-0.04,0.2).scale.set(1.3,0.9,0.8);   // пятачок
    for(const s of[-1,1]){part(head,new THREE.SphereGeometry(0.06,8,6),M(0xfff3a0,{emissive:0xb0a040,emissiveIntensity:0.4}),s*0.1,0.08,0.18);part(head,new THREE.SphereGeometry(0.028,6,5),MAT.dark,s*0.1,0.08,0.23);
      const hn=part(head,new THREE.ConeGeometry(0.05,0.18,5),M(0xe0d0b0),s*0.13,0.22,0);hn.rotation.z=-s*0.3;}
    const legs=[];for(const s of[-1,1]){const l=new THREE.Group();l.position.set(s*0.13,0.32,0);body.add(l);part(l,new THREE.CylinderGeometry(0.05,0.04,0.32,6),c,0,-0.16,0);part(l,new THREE.BoxGeometry(0.1,0.05,0.12),MAT.dark,0,-0.32,0.02);legs.push(l);}
    const arms=[];for(const s of[-1,1]){const a=new THREE.Group();a.position.set(s*0.3,0.62,0);body.add(a);part(a,new THREE.CylinderGeometry(0.04,0.035,0.34,6),c,0,-0.17,0);arms.push(a);}
    const tail=part(body,new THREE.CylinderGeometry(0.02,0.02,0.6,5),c,0,0.4,-0.32);tail.rotation.x=1.0;part(body,new THREE.ConeGeometry(0.06,0.1,4),c,0,0.62,-0.58).rotation.x=1.0;
    dyn(g);return {g,body,head,legs,arms,pos:g.position,d:{height:1.2},ph:0};})();
  const RACE=[[-1.2,-294.8],[8.7,-296.6],[8.8,-311.4],[2.4,-312.4]];
  const RC={st:'idle',t:0,wp:0,won:false,tries:0,told:false,onMat:false,tip:0,lift:'no'};F.race=RC;
  let raceStarter=null;const raceHome=()=>{BS.pos.set(-1.8,0,-294.8);BS.g.rotation.y=0.6;RC.wp=0;};
  // колода-«кобыла» поперёк дальнего берега
  const LG=new THREE.Group();LG.position.set(0,0,-318);W.group.add(LG);{const lm=M(0x5a4030),rt=M(0x4a3426);const tr=part(LG,new THREE.CylinderGeometry(0.9,1.0,21.6,10),lm,0,0.95,0);tr.rotation.z=Math.PI/2;
    for(let i=0;i<9;i++){const b=part(LG,new THREE.CylinderGeometry(0.08,0.16,rand(1.4,2.6),5),rt,-9.6+i*2.4+rand(-0.4,0.4),1.6+rand(0,0.8),rand(-0.6,0.6));b.rotation.set(rand(-0.6,0.6),0,rand(-0.9,0.9));}
    for(const s of[-1,1]){const st=part(LG,new THREE.CylinderGeometry(1.15,1.25,0.25,10),M(0x8a6a4a),s*10.85,0.95,0);st.rotation.z=Math.PI/2;}dyn(LG);}
  const logCol=colBox(-11,11,0,4.4,-318.7,-317.3,false);
  const logPt=new V3(0,0,-316.9);
  W.lifts.push({pos:logPt,active:()=>RC.won&&RC.lift!=='done'&&RC.lift!=='busy',onLift:h=>{RC.lift='busy';SFX.toss();h.atkT=0.4;bark(h,'potap','Как Илья Муромец… э-э… кобылку — на плечо!',2.6);
    const p0=LG.position.clone();anim(1.6,k=>{if(k<0.45){const q=k/0.45;LG.position.set(lerp(p0.x,h.pos.x*0.3,q),q*2.4,lerp(p0.z,-317.0,q));LG.rotation.x=q*0.2;}
      else{const q=(k-0.45)/0.55;LG.position.set(lerp(h.pos.x*0.3,13.5,q),2.4+Math.sin(q*Math.PI)*1.6-q*3.4,lerp(-317.0,-322,q));LG.rotation.z=q*1.2;}
      if(k>=1){RC.lift='done';logCol.on=false;SFX.crash();burst(new V3(10,0.4,-321),0x8a6a4a,20,4);RC.nutsOut=true;
        later(2.1,()=>bark(BS,'bes','Сдаюсь, сдаюсь! Вот вам оброк — орешки за три года вперёд!',3.0));BN.forEach((n,i)=>{n.locked=false;n.g.visible=true;const a=n.pos.clone();anim(0.7,q=>{n.pos.set(lerp(BS.pos.x,a.x,q),1.0+Math.sin(q*Math.PI)*1.6,lerp(BS.pos.z,a.z,q));});});}});}});
  const BN=[nutItem(-2.0,0.9,-314.6),nutItem(2.0,0.9,-314.6)];BN.forEach(n=>{n.locked=true;n.g.visible=false;n.base=0.9;});
  W.camZones.push({x:1.5,z:-303,r:10.5,camActive:()=>RC.st==='count'||RC.st==='run'});
  const atFinish=()=>HEROES.some(h=>!(h.active&&players[h.player].downed)&&hd(h.pos,flag.position)<2.4&&h.pos.y>-0.4&&h.pos.z<-310.2);
  W.updates.push(dt=>{BS.ph+=dt;swirl.forEach((m,i)=>{m.rotation.z+=dt*(0.4+i*0.25)*(RC.st==='run'?3:1);});
    const near=HEROES.some(h=>h.active&&h.pos.z<-287&&h.pos.z>-300);if(!RC.told&&near){RC.told=true;SFX.splash();burst(new V3(0,0,-301),0x4a7a7a,16,3);
      bark(BS,'bes','Кто тут наш омут струнами морщит? Обгони меня кругом омута — тогда пропущу! Встань на кружок — и побежали!',4.2);}
    const sh=HEROES.find(h=>h.active&&hd(h.pos,raceMat.position)<1.0&&Math.abs(h.pos.y)<0.5),on=!!sh;
    if(RC.st==='idle'&&!RC.won&&RC.told&&on&&!RC.onMat){RC.st='count';RC.t=0;raceStarter=sh;raceHome();say('bes','Раз… два… ТРИ!',1.6);}
    RC.onMat=on;
    if(RC.st==='count'&&raceStarter&&hd(raceStarter.pos,raceMat.position)>1.5){RC.st='idle';RC.onMat=true;bark(BS,'bes','Чур, без жульничества! Бежим на «ТРИ»!',2.2);}   // фальстарт: кто начал, стоит на кружке до «ТРИ» (друг — где угодно, хоть у флажка)
    if(RC.st==='count'){RC.t+=dt;BS.body.position.y=Math.abs(Math.sin(BS.ph*8))*0.1;if(RC.t>1.5){RC.st='run';RC.t=0;SFX.whoosh();}}
    else if(RC.st==='run'){RC.t+=dt;const w=RACE[RC.wp+1];if(atFinish()){RC.st='won';RC.won=true;}
      else if(w){const dx=w[0]-BS.pos.x,dz=w[1]-BS.pos.z,d=Math.hypot(dx,dz),st=Math.min(d,8.5*dt);BS.pos.x+=dx/d*st;BS.pos.z+=dz/d*st;BS.g.rotation.y=Math.atan2(dx,dz);if(d<0.2)RC.wp++;
        BS.legs.forEach((l,i)=>{l.rotation.x=Math.sin(BS.ph*24+i*Math.PI)*0.9;});BS.arms.forEach((a,i)=>{a.rotation.x=-Math.sin(BS.ph*24+i*Math.PI)*0.9;});}
      else{RC.st='lost';RC.t=0;RC.tries++;BS.legs.forEach(l=>{l.rotation.x=0;});bark(BS,'bes',RC.tries>1?'Хи-хи! Опять я первый! Ногами меня не обогнать — головой думай!':'Хи-хи! Я первый! Ну, ещё разок? Встань на кружок!',2.8);
        if(RC.tries>=1){F.raceHint=true;}}}
    else if(RC.st==='lost'){RC.t+=dt;if(RC.t>2.4){RC.st='idle';raceHome();}}
    if(RC.st==='won'&&!RC.saidWon){RC.saidWon=true;SFX.ok();BS.legs.forEach(l=>{l.rotation.x=0;});
      bark(BS,'bes','Как?! Ты уже тут?! Ох, у вас, видать, братишка есть — как у того Балды…',3.4);later(4.8,()=>{BS.pos.set(-3,0,-316.3);BS.g.rotation.y=Math.PI;RC.lift='bes';
        bark(BS,'bes','Ладно! А мою кобылку-колоду поднимешь? Я вот — у-у-ух!..',3.0);});
      later(9.2,()=>{RC.lift='try';bark(BS,'bes','Не-е… тяжела. Ну-ка вы попробуйте — силач у вас есть?',2.8);});
      banner('Обогнали бесёнка!','#ffd9a0',2.4,'как Балда — с братишкой');}
    if(RC.lift==='bes'){BS.arms.forEach(a=>{a.rotation.x=-2.6;});BS.body.position.y=Math.abs(Math.sin(BS.ph*30))*0.05;LG.rotation.x=Math.sin(BS.ph*30)*0.01;}
    else if(RC.lift==='try'||RC.lift==='done'){BS.arms.forEach(a=>{a.rotation.x=lerp(a.rotation.x,0,0.1);});}
    if(RC.st!=='run'&&RC.st!=='count')BS.body.position.y=Math.sin(BS.ph*2)*0.04;
    {const P=HERO.potap;logPt.set(clamp(P.pos.x,-9.5,9.5),0,-316.9);}});
  // Звенышко ведёт Журавля: парит над ним и чуть впереди — показывает дорогу по струнам; на свадьбе плавно перелетает туда,
  // где ляжет звено, и ждёт над ним, пока звено не возьмут (раньше подсказка ставила его Журавлю в ноги, а потом оно улетало за экран)
  const zvLead={on:false,told:false};
  W.updates.push(dt=>{const Z=W.zven;if(!Z||G.cine)return;
    const guide=WD.stage==='walk'||WD.stage==='wed'||(WD.stage==='done'&&!wedLink.taken&&HEROES.some(h=>h.active&&hd(h.pos,wedLink.pos)<25));
    if(guide){if(!zvLead.on){zvLead.on=true;zvLead.prev=Z.mode;Z.mode='script';}
      Z.vis=Z.shown=true;let tgt,rate;
      if(WD.stage==='walk'){const a=CR.g.rotation.y;tgt=new V3(CR.pos.x+Math.sin(a)*1.7,CR.pos.y+3.2,CR.pos.z+Math.cos(a)*1.7);rate=3.0;}
      else{tgt=new V3(wedLink.pos.x,2.9,wedLink.pos.z);rate=1.3;}   // туда, где ляжет звено
      Z.target.copy(tgt);Z.pos.lerp(tgt,1-Math.exp(-rate*dt));
      if(WD.stage!=='walk'&&!zvLead.told&&Z.pos.distanceTo(tgt)<0.5){zvLead.told=true;floatText(Z.pos.clone().add(new V3(0,0.8,0)),'Дзинь! Звено — тут!','#ffe08a');}}
    else if(zvLead.on){zvLead.on=false;Z.mode=zvLead.prev&&zvLead.prev!=='script'?zvLead.prev:'lead';}});
  W.sw12={GS,forks,PADS,CR,CA,BS,FR,raceMat,flag,finStake,logPt,logCol,reedCol,wedLink,BN,arrow};   // для ботов
  /* ---------- стычка: пни-ворчуны и кикиморки на кочках ---------- */
  const arena={x:0,z:-336,r:9.5,started:false,cleared:false,hold:0,list:[]};arena.camActive=()=>arena.started&&(!arena.cleared||arena.hold>0);W.camZones.push(arena);
  const mounds=[[-6.5,-332],[6.5,-333],[-5,-341],[5.5,-340.5]];for(const[x,z]of mounds){addMesh(new THREE.CylinderGeometry(1.1,1.3,0.6,10),M(0x5d6b34),x,0.0,z);W.cyls.push({x,z,r:1.2,miny:-1,maxy:0.3,on:true});}
  const barrier=makeGate(-11,11,-346,'thread','arena',{h:2.6});bell(1.0,-313.6);bell(-1.0,-323.6);
  const endLink=linkItem(0,1.1,-348.5);nutItem(-7,0.6,-349.5);
  /* ---------- ряска: кто в ней — сам выбирается на ближайшую кочку ---------- */
  W.hummocks.push({x:-5.5,z:-3.5,y:0},{x:5.5,z:-3.5,y:0},{x:0,z:-27,y:0},{x:-4,z:-55,y:0},{x:4,z:-55,y:0},{x:0,z:-77,y:0},{x:-4,z:-76,y:0},{x:4,z:-76,y:0});
  W.slowZone=h=>h.pos.y<-0.3;W.wetY=-0.3;
  let yoshaThick=false;let tatS=null;const tatIdle=[0,0];
  W.onSag=(t,turned,on)=>{if(t.thick&&turned){F.sagged=true;later(0.6,()=>bark(HERO.potap,'potap','Как Илья Муромец говаривал… э-э… кто упал — тот… мокрый.',3.2));later(3.9,()=>bark(HERO.yosha,'yosha','Я бы сам дошёл — не мал!',2));}};
  W.updates.push(dt=>{
    for(const h of HEROES){if(h.grounded&&h.pos.y<-0.3&&!h.cling){h.wetT=(h.wetT||0)+dt;h.extraY=-0.25;if(h.wetT>1.4){h.wetT=0;SFX.splash();toHummock(h);}}else{h.wetT=0;h.extraY=0;}}
    // мини-стычка: струна ко второму колышку простояла пустой — из-за кочки выходит Тать-Паутинник (один на обе дорожки)
    if(!tatS)for(const pi of[0,1]){const t=W.threads.find(q=>q.string&&!q.sag&&q.stake===S2[pi]);tatIdle[pi]=t&&!standingOn(t)&&players[pi].heroes.some(h=>h.pos.z>-22.5)?tatIdle[pi]+dt:0;   // пока кому-то ещё переходить
      if(tatIdle[pi]>3){tatS=tatKit(tatFoe(lanes[pi]+0.2,-28.6,{leash:5,scale:1.3,own:pi}));banner('Тать-Паутинник!','#ffd0a0',2.2,'грызёт пустую нить · встань на струну — он и сбежит');break;}}
    const thick=W.threads.find(t=>t.thick&&t.string&&!t.sag);
    if(thick&&HERO.yosha.groundRef===thick)yoshaThick=true;
    if(yoshaThick&&!F.sagged&&!F.thanks&&HERO.yosha.pos.z<-74.2&&HERO.yosha.grounded){F.thanks=true;bark(HERO.yosha,'yosha','Потап, ты не обернулся ни разу. Спасибо, друг.',2.8);}
    if(!arena.started&&[0,1].every(pi=>active(pi).pos.z<-328)){arena.started=true;SFX.gate();
      arena.list=[makeFoe('stump',-2.5,-337,{leash:8}),makeFoe('stump',2.5,-338,{leash:8})].concat(mounds.map(([x,z],i)=>i===2?tatKit(tatFoe(x,z,{y:0.3,leash:8,scale:1.3})):makeFoe('kiki',x,z,{y:0.3,leash:3})));
      banner('Пни-ворчуны!','#e0c090',2,'у них кора со всех сторон · красный зубец — кувырком вбок');}
    if(arena.started&&!arena.cleared&&arena.list.every(e=>!e.alive)){arena.cleared=true;arena.hold=1.6;barrier.forceOpen=true;SFX.ok();banner('Отбились!','#ffffff',1.6,'Путь через болото свободен');}
    if(arena.cleared)arena.hold-=dt;
    if(arena.cleared&&!F.out&&[0,1].some(pi=>active(pi).pos.z<-351.5)){F.out=true;finishLevel();}});
  W.zvenGoal=()=>{const a=HEROES.reduce((m,h)=>h.pos.z<m.pos.z?h:m);let z=a.pos.z-4.5;const lim=[-12,-22,-50,-72,-88,-139,-155,-224,-240,-276,-297,-311,-345];for(const L of lim){if(a.pos.z>L+2){z=Math.max(z,L);break;}}
    return new V3(clamp(a.pos.x*0.5,-8,8),Math.max(a.pos.y,0)+2.2,z);};
  /* ---------- рисунки кнопок ---------- */
  const T=HERO,mine=pi=>W.threads.some(t=>t.owner===pi&&!t.ret&&!t.string);
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>!mine(pi)&&((h().pos.z<-3.5&&h().pos.z>-6.2&&h().pos.y>-0.1)||(h().pos.z<-14.6&&h().pos.z>-15.8&&h().pos.y>0.2)||(h().pos.y>2.8&&h().pos.z<-42)));
    prompt(pi,'attack',()=>headOf(h()),()=>W.enemies.some(e=>e.kind==='tat'&&e.alive&&e.chew&&hd(e.pos,h().pos)<5),'пока грызёт!');
    prompt(pi,'roll',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig==='red'&&e.help));
    prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig!=='red'&&e.help));
    prompt(pi,'attack',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&hd(e.pos,h().pos)<6&&(e.state==='broken'||e.open>0)));}
  prompt(0,'swap',()=>headOf(T.potap),()=>T.proshka.active&&hd(T.proshka.pos,stone)<4&&!W.threads.some(t=>t.thick)&&T.proshka.pos.z>-60&&hd(T.potap.pos,T.proshka.pos)<12);
  prompt(0,'call',()=>headOf(T.proshka),()=>T.proshka.active&&hd(T.proshka.pos,stone)<4&&!W.threads.some(t=>t.thick)&&hd(T.potap.pos,T.proshka.pos)>=12);
  prompt(0,'item',()=>headOf(T.potap),()=>T.potap.active&&hd(T.potap.pos,stone)<1.1&&!W.threads.some(t=>t.thick));
  prompt(1,'warn',()=>headOf(T.yosha),()=>{const t=W.threads.find(q=>q.thick&&q.string&&!q.sag);return !!t&&T.yosha.groundRef===t;},'опасно!');
  // новые участки: рогатка по огонькам и стреле, ковшик на засохшую кочку и завядшую кувшинку, Потап и колода
  const wispNear=h=>forks.some(fk=>!fk.open&&(fk.k===0||forks[fk.k-1].open)&&h.pos.z<fk.zs+3.6&&h.pos.z>fk.zs-0.6);
  const dryNear=h=>forks.some(fk=>fk.open&&fk.dry&&fk.dry.dry&&hd(h.pos,fk.dry.col)<5.5);
  const arrowNear=h=>!FG.drop&&h.pos.z<-235&&h.pos.z>-241,lilyNear=h=>FG.sing&&!FG.lily&&hd(h.pos,PADS[6].col)<5.8,logNear=h=>RC.won&&RC.lift!=='done'&&RC.lift!=='busy'&&hd(h.pos,logPt)<3.4;
  prompt(0,'skill',()=>headOf(T.proshka),()=>T.proshka.active&&wispNear(T.proshka),'по огоньку!');prompt(0,'swap',()=>headOf(T.potap),()=>T.potap.active&&wispNear(T.potap));
  prompt(1,'skill',()=>headOf(T.yosha),()=>T.yosha.active&&dryNear(T.yosha),'полей!');prompt(1,'swap',()=>headOf(T.pelageya),()=>T.pelageya.active&&dryNear(T.pelageya));
  prompt(0,'skill',()=>headOf(T.proshka),()=>T.proshka.active&&arrowNear(T.proshka),'сбей стрелу!');prompt(0,'swap',()=>headOf(T.potap),()=>T.potap.active&&arrowNear(T.potap));
  prompt(1,'skill',()=>headOf(T.yosha),()=>T.yosha.active&&lilyNear(T.yosha),'полей!');prompt(1,'swap',()=>headOf(T.pelageya),()=>T.pelageya.active&&lilyNear(T.pelageya));
  prompt(0,'skill',()=>headOf(T.potap),()=>T.potap.active&&logNear(T.potap),'подними!');prompt(0,'swap',()=>headOf(T.proshka),()=>T.proshka.active&&RC.won&&RC.lift!=='done'&&T.proshka.pos.z<-312);
  /* ---------- задачи ---------- */
  const lane=pi=>[
    O(()=>'Болото! Простая нить за пять секунд тонет.<br>Брось клубок '+K(pi,'item')+' в колышек с ленточкой — струна не утонет, пока не смотаешь, не тронет.',()=>active(pi).pos.z<-15.4,()=>[S1[pi].g],()=>({kind:active(pi).kind,action:'walk',from:new V3(lanes[pi],0,-5.8),to:new V3(lanes[pi]+0.4,0.75,-14)})),
    O(()=>'Следующий колышек — над трясиной. Брось клубок '+K(pi,'item')+' — и по струне иди.<br>Пустую струну Паутинник грызёт — стой на ней иль прогони.',()=>active(pi).pos.z<-25.6,()=>[S2[pi].g])];
  const branch=pi=>O(()=>'По пенькам на высокую ветку взберись,<br>Брось клубок '+K(pi,'item')+' к колышку — и по струне вниз катись.',()=>active(pi).pos.z<-52.6,()=>[branchMark,S3.g],()=>({kind:active(pi).kind,action:'walk',from:new V3(-5.5,0,-34),to:new V3(-5.5,3,-40)}));
  const fight=pi=>O(()=>'Пень-ворчун в коре — спереди не пробить.<br>Красный зубец <i class="sg r"></i> — кувырком '+K(pi,'roll')+' вбок, и сбоку бить!',()=>arena.cleared,()=>arena.list.map(e=>e.g));
  // чему сейчас учить игрока в тумане: 'dry' — тропа открыта, на ней неполитая засохшая кочка, а герой ещё не перешёл; 'jump' — тропа открыта, прыгать по кочкам;
  // 'wait' — Прошка ещё не щёлкнул настоящий огонёк (на берегу и на островке перед следующей развилкой). Нужно подсказке второго игрока: поливать есть что не всегда
  const fogStep=pi=>{const z=active(pi).pos.z,on=f=>f.open&&z>f.zs-13.5;return forks.some(f=>on(f)&&f.dry&&f.dry.dry)?'dry':forks.some(on)||forks.every(f=>f.open)?'jump':'wait';};
  W.sw12.fogStep=fogStep;
  const NEW=pi=>[
    O(()=>GT.length&&WD.left>0?'Паутинники засели на кочках гати — грызут струны и не пускают! Бей их '+K(pi,'attack')+': осталось '+WD.left+'.<br>Струны по кочкам кидай '+K(pi,'item')+' и стой на струне — пустую перегрызут.'
        :'Журавль сватается к Цапле — отнесите ей сватовство!<br>Струны по кочкам до её избушки перекинь '+K(pi,'item')+' — у каждого их не больше трёх.',
      ()=>WD.stage!=='ask'&&WD.left===0,()=>GT.filter(e=>e.alive).map(e=>e.g).concat(GS.filter(s=>!s.used).map(s=>s.g),[CA.g])),
    O(()=>'Журавль идёт по струнам свататься! Держите струны — не сматывайте, пока не дойдёт.<br>Пузыри у струны — болотное чудо: отойди или щит '+K(pi,'guard')+'!',()=>WD.stage==='wed'||WD.stage==='done',()=>[CR.g]),
    // у второго игрока текст по ходу: поливать есть что лишь на открытой тропе с засохшей кочкой (вторая и четвёртая), а до того Прошка ещё щёлкает огоньки
    O(pi?()=>{const st=fogStep(1);return 'Туман! Огоньки манят в трясину. Прошка щёлкнет настоящий —<br>'+(st==='dry'?'а засохшую кочку полей живой водой Йоши '+K(1,'skill')+': оживёт и удержит!':st==='jump'?'тропка всплыла — прыгай по кочкам!':'и тропка из кочек всплывёт сама. Нить тут тонет — не бросай, жди.');}:()=>'Туман! Огоньки манят в трясину — который настоящий?<br>Щёлкни огонёк из рогатки Прошки '+K(0,'skill')+': ложный лопнет, настоящий тропку поднимет.',
      ()=>active(pi).pos.z<-223.4,()=>{const d=forks.find(f=>f.open&&f.dry&&f.dry.dry);if(pi&&d)return [d.dry.g];const fk=forks.find(f=>!f.open);if(fk)return fk.wisps.filter(w=>!w.gone).map(w=>w.g);return d?[d.dry.g]:[];}),
    O(pi?()=>'Завядшую кувшинку посередине полей живой водой Йоши '+K(1,'skill')+' —<br>оживёт и не утонет. А потом — прыг по кувшинкам, в лад!':()=>'Стрела Ивана-царевича на сухой ольхе! Сбей её из рогатки Прошки '+K(0,'skill')+' —<br>Лягушка запоёт, и кувшинки в лад всплывут.',
      ()=>active(pi).pos.z<-277.5||(pi?FG.lily:FG.sing),()=>pi?[PADS[6].g]:[arrow]),
    O(()=>'Прыгай по кувшинкам в лад: на «Ква!» всплывают одни, на «Ква-ква!» — другие.<br>Пруд глубокий: промахнулся — плюх, и снова у колокольчика.',()=>active(pi).pos.z<-277.5,()=>PADS.filter(P=>P.cur>-0.3).map(P=>P.g)),
    O(()=>F.raceHint?'Ногами бесёнка не обогнать! Как Балда с двумя зайцами: перекинь струну '+K(pi,'item')+' через омут к флажку<br>(или пусть друг заранее у флажка встанет) — и снова на кружок!':'Бесёнок зовёт наперегонки вокруг омута!<br>Встань на кружок у омута — и беги к флажку на том берегу.',
      ()=>RC.won,()=>[raceMat,flag,finStake.g]),
    O(pi?()=>'Бесёнок хвастает «кобылой»-колодой. Силач у нас есть —<br>пусть Потап её поднимет!':()=>'Подними-ка «кобылу»-колоду! Смени на Потапа '+K(0,'swap')+',<br>подойди к колоде и жми '+K(0,'skill')+' — Потап её и закинет!',()=>RC.lift==='done',()=>[LG])];
  W.objectives[0]=lane(0).concat([branch(0),
    O(()=>'Дальше — трясина глубока. На Потапа смени,<br>Встань на камень с медвежьей лапой, брось клубок '+K(0,'item')+' — толстую струну натяни.',()=>W.threads.some(t=>t.thick&&t.string)||active(0).pos.z<-74,()=>[stone.g],()=>({kind:'potap',action:'walk',from:new V3(2,0,-55),to:new V3(0,0.22,-58.6)})),
    O(()=>'Потап, стой, не оборачивайся — пусть друзья пройдут!<br>Потом Прошку возьми '+K(0,'swap')+', перейди и Потапа кликни '+K(0,'call')+' — тут как тут.',()=>players[0].heroes.every(h=>h.pos.z<-74),()=>[ST.g])].concat(NEW(0),[
    fight(0),O('Бери звено — и дальше, за Звенышком, вперёд!',()=>false,()=>[endLink.g])]));
  W.objectives[1]=lane(1).concat([branch(1),
    O('Потап толстую струну натянет —<br>Пелагею и Йошу по ней переведи, не отстанет.',()=>players[1].heroes.every(h=>h.pos.z<-74),()=>[ST.g,stone.g])].concat(NEW(1),[
    fight(1),O('Бери звено — и дальше, за Звенышком, вперёд!',()=>false,()=>[endLink.g])]));
  W.tipZones.push({cond:(pi,h)=>W.enemies.some(e=>e.kind==='tat'&&e.alive&&e.chew&&hd(e.pos,h.pos)<14),text:pi=>'Паутинник грызёт нить! Встань на струну — и он удерёт.<br>Или бей его, пока грызёт.'},
    {cond:(pi,h)=>h.pos.y<-0.3,text:pi=>'Плюх! Ряска мелкая — выберешься на кочку враз.'},
    {cond:(pi,h)=>h.pos.z<-56&&h.pos.z>-60.6&&h.kind!=='potap'&&!W.threads.some(t=>t.thick&&t.string&&!t.sag),text:pi=>'Дальше трясина глубока: тонкая нить утонет,<br>В тумане не спланировать — лишь струна Потапа не потонет.'},
    {cond:(pi,h)=>h.hang,text:pi=>'Съезжаешь по струне, повиснув на лапках!'},
    {pi:1,cond:(pi,h)=>h.kind==='pelageya'&&h.pos.y>2.8,text:pi=>'Струна не пропадёт, пока не смотаешь '+K(pi,'item')+'.<br>Шагни на неё с ветки — и вниз, на лапках, вперёд!'});
  W.tipZones.push(
    {cond:(pi,h)=>WD.stage==='ask'&&h.pos.z<-88&&h.pos.z>-140,text:pi=>'Колышек на кочке — брось клубок '+K(pi,'item')+' в его ленточку: струна не утонет.<br>Струн у каждого не больше трёх — следующую пусть друг кинет.'},
    {cond:(pi,h)=>WD.stage==='walk'&&W.enemies.some(e=>e.kind==='tat'&&e.alive&&e.chew&&hd(e.pos,h.pos)<16),text:pi=>'Паутинник грызёт струну у Журавля! Встань на неё — он отскочит,<br>или бей его '+K(pi,'attack')+', пока грызёт.'},
    {cond:(pi,h)=>inFog(h.pos.x,h.pos.z)||(h.pos.z<-150&&h.pos.z>-157&&WD.stage==='done'&&!forks[0].open),text:pi=>'В тумане крылья намокли — не спланировать, и нить тонет.<br>Ищи настоящий огонёк: ложный — кикиморкин, в трясину манит.'},
    {cond:(pi,h)=>h.pos.z<-230&&h.pos.z>-241&&!FG.sing,text:pi=>'Лягушке без стрелы не поётся. Видишь стрелу на сухой ольхе?<br>'+(pi?'Прошка собьёт её из рогатки.':'Прошка, из рогатки '+K(0,'skill')+' — щёлк!')},
    {cond:(pi,h)=>h.pos.z<-286&&h.pos.z>-318&&!RC.won&&F.raceHint,text:pi=>'Бесёнок быстрее! Но Балда хитрее был: «братишка» ждал у финиша.<br>Перекинь струну '+K(pi,'item')+' через омут к колышку у флажка — и по ней!'});
  W.spawns=[[new V3(-5.5,0,4),new V3(-7.5,0,5)],[new V3(5.5,0,4),new V3(7.5,0,5)]];W.startAct=[0,0];
  W.pauseLine='Кикиморино болото: нить-тропка тонет, струна на колышке — нет.<br>Журавля к Цапле проводи, настоящий огонёк найди, Лягушке стрелу верни, бесёнка перехитри.';
  /* ====================== Живое болото: чудо болотное, камыш и кувшинки, лягушки, пузыри ====================== */
  // в трясине (без земли, кочек и струн)? — по коробкам и цилиндрам: струны не в счёт
  const bogAt=(x,z)=>{for(const b of W.boxes)if(b.on&&b.maxy>-1.2&&x>b.minx-0.3&&x<b.maxx+0.3&&z>b.minz-0.3&&z<b.maxz+0.3)return false;
    for(const c of W.cyls)if(c.on&&c.maxy>-1.2&&Math.hypot(x-c.x,z-c.z)<c.r+0.3)return false;return Math.abs(x)<10.8;};
  // где растениям не место: дорожки колышков, ветка и съезд, толстая струна, гать, тропы тумана, кувшинки, омут
  const busy=(x,z)=>(z<-5&&z>-26&&(Math.abs(x-5.6)<2.6||Math.abs(x+5.6)<2.6))||(z<-33&&z>-55&&x<2)||(z<-58&&z>-76&&Math.abs(x)<2.6)
    ||(z<-89&&z>-142&&Math.abs(x)<3.4)||(z<-155&&z>-225&&(Math.abs(x)<2||Math.abs(x-6)<2||Math.abs(x+6)<2))||(z<-239&&z>-278&&Math.abs(x)<4.8)||(z<-297&&z>-311&&Math.abs(x)<7.2);
  const inst=(geo,mat,list)=>{const m=new THREE.InstancedMesh(geo,mat,Math.max(1,list.length));const q=new THREE.Quaternion(),eu=new THREE.Euler(),mt=new THREE.Matrix4();
    list.forEach((p,i)=>{eu.set(p.rx||0,p.ry||0,p.rz||0);q.setFromEuler(eu);mt.compose(new V3(p.x,p.y,p.z),q,new V3(p.s,p.sy||p.s,p.s));m.setMatrixAt(i,mt);});
    if(!list.length)m.count=0;m.castShadow=false;m.receiveShadow=true;m.frustumCulled=false;W.group.add(m);return m;};
  {const stalk=[],head=[],sedge=[],leaf=[],flower=[];
    for(let i=0;i<900&&stalk.length<420;i++){const x=rand(-10.6,10.6),z=rand(ZE+3,-6);if(busy(x,z)||!bogAt(x,z))continue;
      const n=Math.floor(rand(2,5));for(let k=0;k<n;k++){const px=x+rand(-0.5,0.5),pz=z+rand(-0.5,0.5),h=rand(1.3,2.3),rz=rand(-0.12,0.12),rx=rand(-0.12,0.12);
        stalk.push({x:px,y:-0.45+h/2,z:pz,s:1,sy:h,rx,rz});if(Math.random()<0.7)head.push({x:px+rz*-h*0.5,y:-0.45+h*0.92,z:pz+rx*h*0.5,s:1,rx,rz});}}   // рогоз: стебель и бархатная шишка
    for(let i=0;i<1400&&sedge.length<360;i++){const x=rand(-10.8,10.8),z=rand(ZE+2,-4);if(busy(x,z))continue;const bog=bogAt(x,z);if(!bog&&Math.random()<0.75)continue;
      sedge.push({x,y:bog?-0.45:0,z,s:rand(0.7,1.3),sy:rand(0.8,1.5),ry:rand(0,6.3),rz:rand(-0.3,0.3)});}   // осока пучками
    for(let i=0;i<900&&leaf.length<170;i++){const x=rand(-10.5,10.5),z=rand(ZE+2,-6);if(busy(x,z)||!bogAt(x,z))continue;leaf.push({x,y:-0.42,z,s:rand(0.5,1.0),ry:rand(0,6.3)});
      if(Math.random()<0.16)flower.push({x:x+0.1,y:-0.36,z:z+0.05,s:rand(0.8,1.2),ry:rand(0,6.3)});}   // кувшинки на воде и белые цветы
    const cg=new THREE.CylinderGeometry(0.025,0.035,1,4);cg.translate(0,0,0);inst(cg,M(0x6a7a30),stalk);inst(new THREE.CylinderGeometry(0.065,0.065,0.3,6),M(0x5a3420),head);
    const sg=new THREE.ConeGeometry(0.16,0.7,4,1,true);sg.translate(0,0.35,0);inst(sg,M(0x5a7a2a,{side:THREE.DoubleSide}),sedge);
    const lg=new THREE.CircleGeometry(0.45,10,0.4,Math.PI*2-0.4);lg.rotateX(-Math.PI/2);inst(lg,M(0x3f7a30),leaf);
    const fg=new THREE.ConeGeometry(0.12,0.16,6);inst(fg,M(0xf4f0f8,{emissive:0x404040,emissiveIntensity:0.3}),flower);
    // коряги: сухие стволы торчат из трясины
    for(let i=0,n=0;i<300&&n<16;i++){const x=rand(-10,10),z=rand(ZE+4,-8);if(busy(x,z)||!bogAt(x,z))continue;n++;const g=new THREE.Group();g.position.set(x,-0.5,z);g.rotation.set(rand(-0.5,0.5),rand(0,6.3),rand(0.3,1.1));W.group.add(g);
      part(g,new THREE.CylinderGeometry(0.12,0.2,rand(1.6,2.8),6),M(0x4a3a2a),0,0.9,0);const br=part(g,new THREE.CylinderGeometry(0.05,0.08,0.9,5),M(0x4a3a2a),0.18,1.4,0);br.rotation.z=-1.0;}}
  // пузыри: болото дышит
  const BUB=(()=>{const N=40,m=new THREE.InstancedMesh(new THREE.SphereGeometry(0.09,8,6),MB(0x9ab07a,{transparent:true,opacity:0.7,depthWrite:false}),N);m.castShadow=false;m.frustumCulled=false;W.group.add(m);
    const L=[];for(let i=0;i<N;i++)L.push({t:9,x:0,z:0,d:0.6});return {m,L,i:0,mt:new THREE.Matrix4(),q:new THREE.Quaternion(),spawn(x,z){const b=L[this.i++%N];b.t=0;b.x=x;b.z=z;b.d=rand(0.5,0.9);}};})();
  /* ---------- чудо болотное: высовывается из трясины у гати и сталкивает со струны; пузыри и тёмный круг — знак: отойди или закройся щитом ---------- */
  const CHU=(()=>{const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);const skin=M(0x4f8a3a,{emissive:0x10280a,emissiveIntensity:0.6}),dk=M(0x2a4a1c),moss=M(0xb0d040,{emissive:0x304010,emissiveIntensity:0.5});
    part(body,new THREE.SphereGeometry(0.85,14,10),skin,0,1.0,0).scale.set(1.15,0.85,1.0);part(body,new THREE.SphereGeometry(0.62,12,8),M(0x9ab86a),0,0.85,0.35).scale.set(1.1,0.6,0.7);
    const eyes=[];for(const s of[-1,1]){eyes.push(part(body,new THREE.SphereGeometry(0.25,10,8),M(0xfff060,{emissive:0xd0b020,emissiveIntensity:1.0}),s*0.4,1.5,0.6));part(body,new THREE.SphereGeometry(0.11,8,6),MAT.dark,s*0.4,1.52,0.82);}
    part(body,new THREE.BoxGeometry(0.95,0.16,0.12),M(0x7a1a1a),0,0.86,0.86);for(const s of[-1,1])part(body,new THREE.ConeGeometry(0.05,0.16,4),M(0xe8e0c0),s*0.3,0.8,0.88).rotation.x=Math.PI;   // рот и клыки
    for(let i=0;i<11;i++){const a=(i/10-0.5)*2.6;const w=part(body,new THREE.ConeGeometry(0.09,rand(0.7,1.1),4),moss,Math.sin(a)*0.85,1.45,Math.cos(a)*0.3-0.15);w.rotation.x=Math.PI;w.rotation.z=a*0.25;}   // космы тины
    const arms=[];for(const s of[-1,1]){const a=new THREE.Group();a.position.set(s*0.95,0.55,0.25);body.add(a);part(a,new THREE.CylinderGeometry(0.13,0.17,1.3,7),skin,0,0.6,0);
      part(a,new THREE.SphereGeometry(0.27,8,6),dk,0,1.3,0).scale.set(1.4,0.5,1.1);a.rotation.z=s*0.5;arms.push(a);}
    const ring=new THREE.Mesh(new THREE.RingGeometry(0.3,2.9,32),MB(0x0a1408,{transparent:true,opacity:0,depthWrite:false}));ring.rotation.x=-Math.PI/2;ring.position.y=-0.41;W.group.add(ring);
    const rim=new THREE.Mesh(new THREE.TorusGeometry(2.9,0.08,6,44),MB(0xd8ff70,{transparent:true,opacity:0,depthWrite:false}));rim.rotation.x=-Math.PI/2;rim.position.y=-0.38;W.group.add(rim);   // светлая кромка — докуда достанет
    const wave=new THREE.Mesh(new THREE.TorusGeometry(1.4,0.06,6,30),MB(0xb8d0a0,{transparent:true,opacity:0,depthWrite:false}));wave.rotation.x=-Math.PI/2;wave.position.y=-0.4;W.group.add(wave);
    g.visible=false;g.scale.setScalar(1.45);[g,ring,rim,wave].forEach(o=>o.traverse(q=>{q.userData.noBatch=true;q.castShadow=false;}));
    return {g,body,arms,eyes,ring,rim,wave,st:'off',t:0,cd:5,x:0,z:0,y:-3.6,peek:false,face:0,pushed:0,peeks:0,ups:0,told:false};})();F.chudo={get st(){return CHU.st;},get ups(){return CHU.ups;},get pushed(){return CHU.pushed;},get peeks(){return CHU.peeks;}};
  const chuZone=z=>z<-89&&z>-142;   // гать: тут сталкивает со струны; в остальной трясине — только выглядывает
  const CHU_HID=-3.6,CHU_TOP=-0.8,CHU_PEEK=-2.0,CHU_R=2.9;   // глубина, высота над трясиной целиком и «одни глаза»; докуда достаёт
  const chuStart=(x,z,peek)=>{const C=CHU;C.st='warn';C.t=0;C.hit=[];C.x=x;C.z=z;C.peek=peek;C.g.position.set(x,CHU_HID,z);C.g.visible=false;C.ring.position.x=C.rim.position.x=C.wave.position.x=x;C.ring.position.z=C.rim.position.z=C.wave.position.z=z;
    const h=HEROES.filter(q=>q.active).sort((p,q)=>hd(p.pos,C)-hd(q.pos,C))[0];C.face=h?Math.atan2(h.pos.x-x,h.pos.z-z):0;C.g.rotation.y=C.face;
    if(!peek){tone(70,0.5,'sine',0.18,45);floatText(new V3(x,0.6,z),'Буль-буль…','#bfe0a0');if(!C.told){C.told=true;for(const pi of[0,1])tip(pi,'Пузыри у струны! Из трясины лезет болотное чудо — столкнёт в трясину, и назад к колокольчику.<br>Отойди подальше или закройся щитом '+K(pi,'guard')+'.',3.4);}}};
  const chuPick=()=>{if(F.noChudo)return;
    const on=HEROES.filter(h=>h.active&&h.grounded&&h.groundRef&&h.groundRef.string&&!h.groundRef.thick&&!h.groundRef.sag&&chuZone(h.pos.z));
    if(on.length){const h=on[Math.floor(rand(0,on.length))],t=h.groundRef,ax=t.dx,az=t.dz;for(const sd of(Math.random()<0.5?[1,-1]:[-1,1])){
      const x=h.pos.x+az*2.1*sd+ax*1.4,z=h.pos.z-ax*2.1*sd+az*1.4;if(bogAt(x,z)){chuStart(x,z,false);return;}}}
    const near=HEROES.filter(q=>q.active);if(!near.length)return;const h=near[Math.floor(rand(0,near.length))];   // выглянуть подальше от героев — болото живое
    for(let k=0;k<8;k++){const a=rand(0,6.3),r=rand(7,13),x=h.pos.x+Math.sin(a)*r,z=h.pos.z+Math.cos(a)*r;if(z<-6&&bogAt(x,z)&&!busy(x,z)&&HEROES.every(q=>hd(q.pos,{x,z})>5)){chuStart(x,z,true);return;}}};
  const chuPush=()=>{const C=CHU;for(const pi of[0,1]){const h=active(pi);if(h.cling||players[pi].downed||C.hit.includes(h))continue;const dx=h.pos.x-C.x,dz=h.pos.z-C.z,d=Math.hypot(dx,dz)||1;
      if(d>CHU_R||h.pos.y<-0.6||h.pos.y>3.2)continue;
      if(h.guard){C.hit.push(h);h.vel.x=dx/d*2.2;h.vel.z=dz/d*2.2;h.knockT=0.15;floatText(h.pos.clone().add(new V3(0,h.d.height+0.9,0)),'Устоял за щитом!','#9fe0ff');SFX.shield();continue;}
      C.hit.push(h);h.chuT=G.time;h.groundRef=null;h.grounded=false;h.hang=false;h.vel.set(dx/d*7.5,6.2,dz/d*7.5);h.knockT=0.55;C.pushed++;SFX.splash();shake(pi,0.05,0.2);
      floatText(h.pos.clone().add(new V3(0,h.d.height+0.9,0)),'Шлёп! Со струны!','#bfe0a0');}};
  W.updates.push(dt=>{const C=CHU;
    // столкнутый падает в трясину и тонет — обычное падение: назад к колокольчику своего игрока
    for(const h of HEROES)if(h.chuT&&G.time-h.chuT<2.5&&!h.grounded&&h.pos.y<-0.45){h.chuT=0;SFX.splash();burst(new V3(h.pos.x,-0.3,h.pos.z),0x4a6a3a,16,4);
      for(let k=0;k<6;k++)BUB.spawn(h.pos.x+rand(-0.7,0.7),h.pos.z+rand(-0.7,0.7));floatText(new V3(h.pos.x,0.9,h.pos.z),'Буль! Утянуло в трясину','#bfe0a0');}
    // пузыри у героев
    if(Math.random()<dt*7){const h=HEROES[Math.floor(rand(0,4))];for(let k=0;k<3;k++){const x=h.pos.x+rand(-9,9),z=h.pos.z+rand(-12,6);if(z<-6&&bogAt(x,z)){BUB.spawn(x,z);break;}}}
    if(C.st==='warn'&&!C.peek&&Math.random()<dt*30)BUB.spawn(C.x+rand(-1.2,1.2),C.z+rand(-1.2,1.2));
    BUB.L.forEach((b,i)=>{b.t+=dt;const k=b.t/b.d,s=k<1?0.4+k*0.9:0;BUB.mt.compose(new V3(b.x,-0.44+k*0.06,b.z),BUB.q,new V3(s,s*0.8,s));BUB.m.setMatrixAt(i,BUB.mt);});BUB.m.instanceMatrix.needsUpdate=true;
    // чудо
    if(C.st==='off'){C.cd-=dt;if(C.cd<=0){C.cd=rand(1.5,3);chuPick();}return;}
    C.t+=dt;const wn=C.peek?0.6:1.5;
    if(C.st==='warn'){C.ring.material.opacity=Math.min(0.75,C.t/wn*0.8)*(C.peek?0.4:1);C.ring.scale.setScalar(0.6+0.4*C.t/wn);
      C.rim.material.opacity=C.peek?0:(0.45+0.4*Math.sin(G.time*12))*Math.min(1,C.t/0.3);if(C.t>=wn){C.st='up';C.t=0;C.g.visible=true;SFX.splash();burst(new V3(C.x,-0.2,C.z),0x4a6a3a,18,4);C.wave.material.opacity=0.6;if(C.peek)C.peeks++;else C.ups++;}}
    else if(C.st==='up'){const k=Math.min(1,C.t/0.35),top=C.peek?CHU_PEEK:CHU_TOP;C.g.position.y=lerp(CHU_HID,top,k);C.arms.forEach((a,i)=>{a.visible=!C.peek;a.rotation.x=0;});
      if(k>=1){C.st='hold';C.t=0;if(!C.peek)tone(110,0.6,'sawtooth',0.12,60);}}
    else if(C.st==='hold'){const dur=C.peek?1.4:1.7;C.eyes.forEach(e=>e.scale.setScalar(1+0.15*Math.sin(G.time*10)));C.body.rotation.z=Math.sin(G.time*3)*0.08;
      if(!C.peek){const sw=Math.min(1,Math.max(0,(C.t-0.25)/0.3));C.arms.forEach((a,i)=>{a.rotation.x=-sw*1.4;a.rotation.z=(i?-1:1)*(0.5+sw*0.4);});if(C.t>0.4&&C.t<1.3)chuPush();}
      if(!C.peek)C.rim.material.opacity=C.t<1.3?0.5+0.4*Math.sin(G.time*12):Math.max(0,C.rim.material.opacity-dt*3);
      if(C.t>=dur){C.st='down';C.t=0;}}
    else if(C.st==='down'){const k=Math.min(1,C.t/0.5);C.g.position.y=lerp(C.peek?CHU_PEEK:CHU_TOP,CHU_HID,k);C.ring.material.opacity=0.75*(1-k)*(C.peek?0.4:1);C.rim.material.opacity=0;if(k>=1){C.st='off';C.g.visible=false;C.cd=C.peek?rand(3,6):rand(4,7);}}
    if(C.wave.material.opacity>0){C.wave.material.opacity=Math.max(0,C.wave.material.opacity-dt*0.6);C.wave.scale.setScalar(1+(0.6-C.wave.material.opacity)*3);}});
  /* ---------- лягушки: не нападают, просто живут на болоте — квакают, прыгают, плюхаются в воду, если подойти ---------- */
  const FROG=(()=>{const spots=[];for(const k of W.hummocks)spots.push({x:k.x,z:k.z,y:k.y});
    for(let i=0;i<500&&spots.length<70;i++){const x=rand(-10,10),z=rand(ZE+3,-6);if(!busy(x,z)&&bogAt(x,z))spots.push({x,z,y:-0.4,water:true});}
    const N=24,L=[];for(let i=0;i<N;i++){const s=spots[Math.floor(rand(0,spots.length))];L.push({x:s.x+rand(-0.5,0.5),y:s.y,z:s.z+rand(-0.5,0.5),ry:rand(0,6.3),hop:null,t:rand(0,6),next:rand(2,8),sac:0,croak:rand(2,9),water:!!s.water,sc:rand(1.3,1.9),col:i%3});}
    const mk=(geo,mat,n)=>{const m=new THREE.InstancedMesh(geo,mat,n);m.castShadow=false;m.frustumCulled=false;W.group.add(m);return m;};
    const bg=new THREE.SphereGeometry(0.17,10,8);const body=[mk(bg,M(0x5aa040),N),mk(bg,M(0x7a8a3a),N),mk(bg,M(0x4a7a5a),N)];
    const eye=mk(new THREE.SphereGeometry(0.06,8,6),M(0xf8f0b0,{emissive:0x605820,emissiveIntensity:0.4}),N*2),pup=mk(new THREE.SphereGeometry(0.032,6,5),MAT.dark,N*2),thr=mk(new THREE.SphereGeometry(0.08,8,6),M(0xe8e0a0),N);
    return {L,body,eye,pup,thr,mt:new THREE.Matrix4(),q:new THREE.Quaternion(),e:new THREE.Euler(),spots,hops:0,flee:0};})();
  const frogSet=(m,i,x,y,z,ry,sx,sy,sz)=>{FROG.e.set(0,ry,0);FROG.q.setFromEuler(FROG.e);FROG.mt.compose(new V3(x,y,z),FROG.q,new V3(sx,sy,sz));m.setMatrixAt(i,FROG.mt);};
  const frogHop=(f,tx,tz,water)=>{f.hop={fx:f.x,fy:f.y,fz:f.z,tx,tz,ty:water?-0.4:groundAt(tx,tz,1,0.1).y,t:0,d:rand(0.45,0.6),water};f.ry=Math.atan2(tx-f.x,tz-f.z);FROG.hops++;};
  W.updates.push(dt=>{const cnt=[0,0,0];
    for(let i=0;i<FROG.L.length;i++){const f=FROG.L[i];f.t+=dt;
      if(f.hop){const H=f.hop;H.t+=dt;const k=Math.min(1,H.t/H.d);f.x=lerp(H.fx,H.tx,k);f.z=lerp(H.fz,H.tz,k);f.y=lerp(H.fy,H.ty,k)+Math.sin(k*Math.PI)*0.7;
        if(k>=1){f.hop=null;f.water=H.water;f.y=H.ty;if(H.water){BUB.spawn(f.x,f.z);burst(new V3(f.x,-0.35,f.z),0x9ab07a,5,1.5,0.5);}}}
      else{const h=HEROES.find(q=>q.active&&hd(q.pos,f)<2.1);
        if(h){const a=Math.atan2(f.x-h.pos.x,f.z-h.pos.z)+rand(-0.6,0.6);for(let k=0;k<6;k++){const r=rand(1.6,2.8),tx=f.x+Math.sin(a)*r,tz=f.z+Math.cos(a)*r;const w=bogAt(tx,tz);
            if(Math.abs(tx)<10.6&&(w||groundAt(tx,tz,1,0.1).y>-0.5)){frogHop(f,tx,tz,w);FROG.flee++;if(Math.random()<0.4)floatText(new V3(f.x,0.5,f.z),'Ква!','#b8f0a0');break;}}}
        else{f.next-=dt;if(f.next<=0){f.next=rand(3,9);const a=rand(0,6.3),r=rand(0.8,2.2),tx=f.x+Math.sin(a)*r,tz=f.z+Math.cos(a)*r;const w=bogAt(tx,tz);if(Math.abs(tx)<10.6&&(w||groundAt(tx,tz,1,0.1).y>-0.5))frogHop(f,tx,tz,w);}
          f.croak-=dt;if(f.croak<=0){f.croak=rand(4,11);f.sac=1;if(HEROES.some(q=>q.active&&hd(q.pos,f)<11))tone(rand(150,210),0.09,'square',0.05,110);}}}
      f.sac=Math.max(0,f.sac-dt*2.5);const s=f.sc,br=1+Math.sin(f.t*3)*0.04,sy=f.y+(f.water&&!f.hop?-0.05:0),ry=f.ry,cs=Math.cos(ry),sn=Math.sin(ry);
      const j=cnt[f.col]++;frogSet(FROG.body[f.col],j,f.x,sy+0.1*s,f.z,ry,1.25*s,0.75*s*br,1.35*s);
      for(const sd of[-1,1]){const ox=sd*0.08*s,oz=0.1*s,ex=f.x+ox*cs+oz*sn,ez=f.z-ox*sn+oz*cs,k=i*2+(sd>0?1:0);frogSet(FROG.eye,k,ex,sy+0.2*s,ez,ry,s,s,s);
        frogSet(FROG.pup,k,ex+sn*0.04*s,sy+0.21*s,ez+cs*0.04*s,ry,s,s,s);}
      const ts=(0.6+f.sac*1.2)*s;frogSet(FROG.thr,i,f.x+sn*0.15*s,sy+0.06*s,f.z+cs*0.15*s,ry,ts,ts,ts);}
    FROG.body.forEach((m,c)=>{m.count=cnt[c];m.instanceMatrix.needsUpdate=true;});[FROG.eye,FROG.pup,FROG.thr].forEach(m=>{m.instanceMatrix.needsUpdate=true;});});
  W.sw12.CHU=CHU;W.sw12.FROG=FROG;W.sw12.GT=GT;W.sw12.bogAt=bogAt;
  // кнопки над героем: «бей Паутинника!» у кочки и «щит!», когда чудо лезет рядом
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'attack',()=>headOf(h()),()=>GT.some(e=>e.alive&&hd(e.pos,h().pos)<3.4&&Math.abs(e.pos.y-h().pos.y)<1.6),'бей Паутинника!');
    prompt(pi,'guard',()=>headOf(h()),()=>!CHU.peek&&(CHU.st==='warn'||CHU.st==='up'||(CHU.st==='hold'&&CHU.t<1.3))&&hd(CHU,h().pos)<3.4,'щит!');}
  W.tipZones.unshift(
    {cond:(pi,h)=>!CHU.peek&&CHU.st!=='off'&&CHU.st!=='down'&&hd(CHU,h.pos)<6,text:pi=>'Болотное чудо лезет из трясины — столкнёт в трясину!<br>Отойди от пузырей или закройся щитом '+K(pi,'guard')+'.'},
    {cond:(pi,h)=>GT.some(e=>e.alive&&hd(e.pos,h.pos)<10),text:pi=>'Паутинник на кочке! Пока он на гати — Журавль не пойдёт.<br>Бей его '+K(pi,'attack')+': оранжевые искры над ним — сколько ударов осталось.'});
  W.onStart=()=>{later(0.8,()=>say('zven','Болото чёрное. Тут — только струной. Дзинь!',2.6,true));};
  flushDecor();}

