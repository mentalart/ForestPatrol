/* ============================== РЕЛИЗ final06 · 2-Б «ВОДЯНОЙ» — ВДВОЕ ДЛИННЕЕ ============================== */
// Перед омутом — «Погоня Водяного» (сказка «Морской царь и Василиса Премудрая»): после «Бом» в 2-5 Водяной проснулся, река встаёт валом и
// гонит героев к омуту. Дуб поперёк тропы — Потап поднимет; ручей — прилив гуслями и вплавь; за скалами гребешок Василисы — Йоша польёт,
// камыш встанет стеной и задержит вал; плетень у омута — две верёвки дёрнуть разом. Догнал вал — к последней отметке. Дальше — прежний бой.
// Камера в погоне — впереди героев, лицом к ним (W.camYaw=π): видно и героев, и вал за спиной; бегут «на камеру» (вниз по экрану).
build2B=function(){
  W.zvenAway=true;W.world=2;W.bubbles=false;setTheme('whirl');sky('day');W.name='2-Б · «Водяной»';W.sub='Босс мира 2 · погоня и омут · буйная вода, а не злодей';W.camX=16;const F=W.flags;F.phase=0;F.fin=[-9,-9];
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.gusli=true;W.fallY=-8;W.waterCol=0x3a8aa0;W.waterOp=0.46;
  const C={x:0,z:-14},R=11,T=HERO,bank=M(0x7a8a6a),rock=M(0x6a6a64);
  ground(-16,16,-3,8,1,bank);ground(-16,16,-32,-25,1,bank);ground(-16,-11,-25,-3,1,bank);ground(11,16,-25,-3,1,bank);ground(-11,11,-25,-3,-2,M(0x4a5a4a));
  wall(-16.2,-16,-32,8);wall(16,16.2,-32,8);wall(-16.2,16.2,-32.2,-32);
  {const rw=new THREE.Mesh(new THREE.CylinderGeometry(R,R,3.2,48,1,true),M(0x5a6a5a,{side:THREE.BackSide}));rw.position.set(C.x,-0.5,C.z);W.group.add(rw);
    const rg=new THREE.Mesh(new THREE.RingGeometry(R,17,48),M(0x7a8a6a,{side:THREE.DoubleSide}));rg.rotation.x=-Math.PI/2;rg.position.set(C.x,1.01,C.z);rg.receiveShadow=true;W.group.add(rg);}
  for(let i=0;i<36;i++){const a=i/36*Math.PI*2;decorFir(C.x+Math.cos(a)*rand(19,26),C.z+Math.sin(a)*rand(19,26),rand(1.2,2),true,1);}
  const sea=new THREE.Mesh(new THREE.PlaneGeometry(500,500),M(0x2f6a80));sea.rotation.x=-Math.PI/2;sea.position.y=-3;W.group.add(sea);
  // высокая скала за омутом — там стоит тонкая чёрная фигура
  addMesh(new THREE.CylinderGeometry(1.6,3.4,10,8),rock,-15,5,-31);const ko=makeKoschei();ko.g.position.set(-15,10,-31);ko.g.rotation.y=0.5;ko.g.scale.setScalar(0.9);ko.g.visible=false;
  const glint=new THREE.Mesh(new THREE.SphereGeometry(0.12,8,6),MB(0xffffff));glint.visible=false;W.group.add(glint);
  const snag=addMesh(new THREE.CylinderGeometry(0.5,0.7,4,8),M(0x5a4028),0.8,-1.4,-14.6);snag.rotation.z=1.2;
  // четыре раковины по краям омута
  const zone=waterZone(-11,11,-25,-3,-2,0.8,{floor:-2,shell:false,curb:false});
  const shells=[[0,-3.4],[11.4,-14],[0,-24.6],[-11.4,-14]].map(([x,z],i)=>makeShell(x,z,1,zone,[Math.PI,-Math.PI/2,0,Math.PI/2][i]));
  zone.shell=shells[0];
  const Z=makeZven();W.zven=Z;Z.pos.set(0,3,2);W.zvenFree=true;
  const arena={x:C.x,z:C.z,r:R-2,camActive:()=>!G.cine&&F.phase>=1};W.camZones.push(arena);
  bell(0,4,1);bell(-4,80,1);bell(-4,35.6,1);
  const bb=$('bossbar');bb.style.display='none';W.onLeave=()=>{bb.style.display='none';};
  let vod=null,halves=null,bubble=null;
  const setBar=()=>{const e=vod;const hp=e&&e.alive?Math.max(0,e.embers)/e.maxEmb:0;bb.innerHTML='<b>Водяной</b> · фаза '+Math.max(1,Math.min(3,F.phase))+' / 3 <span class="seg"><i style="width:'+Math.round((F.phase===3?(F.won?0:1):hp)*100)+'%"></i></span>';};
  /* ---------- Водяной ---------- */
  function spawnVod(){vod=makeFoe('vodyanoy',C.x,C.z,{y:-2,leash:12,scale:0.9});vod.def=Object.assign({},vod.def);vod.noKill=true;vod.noMove=true;vod.embers=vod.maxEmb=8;vod.ang=0;vod.big=true;vod.slowAtk=0;
    vod.shellLock=()=>F.phase===1&&zone.level>zone.floor+1;vod.shellLockText='в воде ракушки не сбить — отлив давай!';
    vod.onFinisher=h=>{if(F.phase===1){nextPhase(2);return;}if(F.phase===2){nextPhase(3);return;}
      if(F.phase===3){F.fin[h.player]=G.time;if(G.solo)F.fin[1-h.player]=G.time;SFX.finisher();ringFx(vod.pos,COL.gold,3);floatText(vod.pos.clone().add(new V3(0,4,0)),'Мах!','#ffd76a');
        if(Math.abs(F.fin[0]-F.fin[1])<0.7){F.won=true;SFX.horn();banner('Богатырский мах!','#ffd76a',2,'вместе — вдвое сильней');G.stats.bogatyr++;shakeAll(0.08,0.6);later(1.2,ending);}
        else if(!F.finTold){F.finTold=true;for(const pi of[0,1])tip(pi,'Водяной оглушён! Ударьте '+K(pi,'attack')+' оба разом — Богатырский мах!',3);}}};
    vod.tick=(e,dt)=>{if(G.cine)return;const wet=F.phase===1?zone.level>zone.floor+1:false;e.def.ranged=e.signals[0]==='blue';
      if(F.phase===1){e.shell&&0;if(wet){e.signals=['blue'];e.ang+=dt*0.42;const tx=C.x+Math.cos(e.ang)*5.4,tz=C.z+Math.sin(e.ang)*5.4;if(e.state==='idle'||e.state==='recover'){e.pos.x=damp(e.pos.x,tx,3,dt);e.pos.z=damp(e.pos.z,tz,3,dt);}
          e.pos.y=damp(e.pos.y,zone.level-0.9,4,dt);e.swim=true;}
        else{e.signals=['yellow'];e.pos.y=damp(e.pos.y,-2,6,dt);e.swim=false;F.lowT=(F.lowT||0)+dt;
          // Водяной мутит омут: полежит на дне — и сам поднимает воду
          if(F.lowT>11&&e.state==='idle'&&zone.t>=1){F.lowT=0;setWater(zone,'high');bark({g:e.g},'vod','Буль-буль! Прилив, прилив!',1.8);for(let i=0;i<8;i++)burst(e.pos.clone().add(new V3(rand(-2,2),2,rand(-2,2))),0xcff8ff,4,4);}}
        if(wet)F.lowT=0;}
      else if(F.phase===2){e.pos.x=damp(e.pos.x,C.x,2,dt);e.pos.z=damp(e.pos.z,C.z,2,dt);const lw=halves[0].level<halves[0].floor+1,le=halves[1].level<halves[1].floor+1;e.pos.y=damp(e.pos.y,(lw&&le)?-2:-1.4,4,dt);
        F.current=halves[0].state!==halves[1].state?0:(lw&&le?1.0:2.6);e.signals=(lw||le)?['red']:['blue'];
        if(F.current===0){e.open=Math.max(e.open,0.3);if(e.state==='idle'||e.state==='ready'){e.cd=Math.max(e.cd,0.6);if(e.state==='ready')e.state='idle';}}}
      else if(F.phase===3){e.pos.x=damp(e.pos.x,C.x,2,dt);e.pos.z=damp(e.pos.z,C.z,2,dt);e.pos.y=damp(e.pos.y,-2,4,dt);if(e.state!=='broken'){e.cd=Math.max(e.cd,1);if(e.state==='ready'||e.state==='wind')e.state='idle';}}};
    vod.post=(e)=>{const hd2=e.L.head;if(e.swim){e.body.rotation.x=0.35;e.body.position.y=Math.sin(G.time*2)*0.12;}else if(F.phase===1&&e.state!=='broken'){e.body.rotation.x=-0.25;}
      if(F.phase===2&&F.current>0)e.inner.rotation.y+=0.12*F.current;if(F.phase===3&&e.state!=='broken'){e.body.rotation.x=-0.15;}
      if(hd2)hd2.rotation.z=Math.sin(G.time*3)*0.05;};
    W.onEat=(e)=>{if(!F.yum||G.time-F.yum>6){F.yum=G.time;bark({g:vod.g},'vod','Ам! Вкусные словечки, ням!',1.6);}};}
  function nextPhase(n){F.phase=n;const e=vod;SFX.brk();shakeAll(0.06,0.5);e.state='idle';e.t=0;e.cd=2;
    if(n===2){e.embers=e.maxEmb=6;e.shell=null;Object.values(e.L.plates).forEach(p=>{p.visible=false;});e.guardAll=()=>F.current>0&&e.open<=0&&!(e.state==='stagger'&&!e.openHit);e.guardText='течение крутит — сделайте воду разною!';
      // теперь у каждой половины омута — своя вода
      const lv=zone.level,st=zone.state;W.waters.splice(W.waters.indexOf(zone),1);zone.box.visible=zone.top.visible=false;zone.box.parent&&W.group.remove(zone.box,zone.top);
      halves=[waterZone(-11,0,-25,-3,-2,0.8,{floor:-2,shell:false,curb:false,start:'high'}),waterZone(0,11,-25,-3,-2,0.8,{floor:-2,shell:false,curb:false,start:'high'})];halves[0].shell=shells[3];halves[1].shell=shells[1];
      W.passiveCollect=true;say('vod','А вот я вас — воронкой закручу!',2.4);banner('Фаза 2 · течение','#7ad0a0',2.6,'сделайте воду разной: у одного прилив, у другого отлив — течение и встанет');}
    if(n===3){e.embers=e.maxEmb=1;e.guardAll=()=>e.state!=='broken';e.guardText='пузырь над головой — рогатку!';for(const z of halves){setWater(z,'low');z.noGusli=true;}F.current=0;W.passiveCollect=false;players.forEach(p=>{p.blue=1;});raiseBubble();
      say('vod','Весь омут — на вас, держитесь!',2.4);banner('Фаза 3 · замах','#7ad0a0',2.6,'Прошка — стрельни в жёлудь на пузыре · синяя полоска полна — смени героя');}}
  function raiseBubble(){if(!bubble){const g=new THREE.Group();const m=new THREE.Mesh(new THREE.SphereGeometry(3.2,22,16),M(0x5ab0c8,{transparent:true,opacity:0.55,depthWrite:false}));g.add(m);
      const mk=markMesh(1.6);mk.position.set(0,0,3.3);g.add(mk);W.group.add(g);bubble={g,m,mk,up:false,k:0};
      W.marks.push({pos:new V3(),active:()=>F.phase===3&&bubble.up&&vod.state!=='broken',onHit:()=>{burstBubble();}});bubble.markRef=W.marks[W.marks.length-1];}
    bubble.up=true;bubble.k=0;bubble.g.visible=true;SFX.wave();}
  function burstBubble(){bubble.up=false;bubble.g.visible=false;SFX.splash();SFX.crash();shakeAll(0.08,0.6);for(let i=0;i<30;i++)burst(vod.pos.clone().add(new V3(rand(-3,3),rand(3,7),rand(-3,3))),0x9ae0f0,4,6);
    vod.state='broken';vod.t=0;vod.bdur=6.5;vod.embers=0;banner('ПРОБОЙ!','#fff2b0',1.8,'смени героя '+K(0,'swap')+' / '+K(1,'swap')+' — и бейте вдвоём!');floatText(vod.pos.clone().add(new V3(0,4.5,0)),'Буль!..','#7ad0a0');}
  /* ---------- НОВОЕ «Погоня Водяного» (сказка «Морской царь и Василиса Премудрая»): вал гонится за героями к омуту ---------- */
  // После «Бом» в 2-5 Водяной проснулся: река за спиной встаёт валом и гонит героев к омуту. На тропе — дуб поперёк (Потап поднимет:
  // «Эх, дубинушка, ухнем!»), ручей (в отлив не выбраться — прилив гуслями, и вплавь), узкий проход в скалах и за ним гребешок
  // Василисы — Йоша польёт его живой водой, когда все прошли, и камыш встанет стеной, вал завязнет; у омута плетень с двумя верёвками —
  // дёрнуть разом. Догнал вал — назад к последней отметке (успехи остаются). В одиночку вал медленнее.
  ground(-7,7,46,90,1,bank);ground(-7,7,38,46,-2.6,M(0x5a5040));ground(-7,7,8,38,1,bank);
  wall(-7.4,-7,8,90);wall(7,7.4,8,90);wall(-7.4,7.4,90,90.4);wall(-16.2,-7,8,8.2);wall(7,16.2,8,8.2);
  for(let z=12;z<90;z+=rand(2.6,4.2))for(const sd of[-1,1])decorFir(sd*rand(8.6,13),z,rand(1.1,1.8),true,1);
  for(let i=0;i<22;i++){const sd=Math.random()<0.5?-1:1;addMesh(new THREE.ConeGeometry(0.05,rand(0.8,1.4),3),M(0x6a8a3a),sd*rand(5.6,6.9),1.5,rand(39,45)).castShadow=false;}   // камыш у ручья
  const STR=waterZone(-7,7,38,46,-2.6,0.9,{start:'low',floor:-2.6,shell:{x:-6.2,z:46.7,y:1},curb:false});
  // дуб поперёк тропы
  const oak=new THREE.Group();oak.position.set(0,1,58);W.group.add(oak);{const om=M(0x6a4a2a),lm=M(0x4f7a3a);const tr=addMesh(new THREE.CylinderGeometry(0.85,0.95,14,10),om,0,0.9,0,oak);tr.rotation.z=Math.PI/2;
    for(let i=0;i<6;i++){const b=addMesh(new THREE.CylinderGeometry(0.12,0.2,2.2,6),om,rand(-6,6),1.6+rand(0,0.8),rand(-0.6,0.6),oak);b.rotation.set(rand(-0.8,0.8),0,rand(-0.8,0.8));}
    for(let i=0;i<6;i++)addMesh(new THREE.SphereGeometry(rand(0.7,1.1),7,6),lm,rand(-6,6),2.4+rand(0,0.6),rand(-0.8,0.8),oak);}
  const oakCol=colBox(-7,7,1,3.8,57.1,58.9,true);
  W.lifts.push({pos:new V3(0,1,59.7),active:()=>!F.oak,onLift:h=>{F.oak=true;oakCol.on=false;SFX.toss();shakeAll(0.05,0.4);anim(1.4,k=>{oak.position.x=-k*10;oak.rotation.z=k*0.5;oak.position.y=1-k*0.8;});
    bark(h,'potap','Эх, дубинушка, ухнем!',1.8,true);}});
  // скалы и проход; гребешок Василисы за ним
  box(-7,-1.6,1,4.6,28,32,rock);box(1.6,7,1,4.6,28,32,rock);
  const comb=new THREE.Group();comb.position.set(0,1.05,26.2);W.group.add(comb);{const cm=M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.5});addMesh(new THREE.BoxGeometry(0.9,0.12,0.22),cm,0,0.06,0,comb);
    for(let i=0;i<9;i++)addMesh(new THREE.BoxGeometry(0.05,0.05,0.34),cm,-0.4+i*0.1,0.06,0.26,comb);}
  const reeds=new THREE.Group();reeds.position.set(0,1,30);reeds.visible=false;W.group.add(reeds);{const rm=M(0x6a9a3a);for(let i=0;i<34;i++){const c=addMesh(new THREE.ConeGeometry(0.08,rand(2.2,3.4),4),rm,rand(-1.5,1.5),1.4,rand(-0.9,0.9),reeds);c.rotation.z=rand(-0.15,0.15);}}
  const reedCol=colBox(-1.6,1.6,1,3.4,29,31,true);reedCol.on=false;
  W.waterTargets.push({pos:new V3(0,1,26.2),pri:1,active:()=>!F.reeds&&WV.on,onWater:()=>{F.reeds=true;F.reedT=7;reedCol.on=true;reeds.visible=true;reeds.scale.set(1,0.05,1);anim(0.9,k=>{reeds.scale.y=Math.max(0.05,k);});comb.visible=false;
    SFX.grow();burst(new V3(0,2,30),0x9affb0,20,4);banner('Гребешок — и камыш стеной!','#9affb0',2,'как у Василисы Премудрой: вал в камыше завязнет');bark(HERO.yosha,'yosha','Гребешок за спину — лес стеной!',1.8,true);}});
  // плетень у омута: две верёвки — разом
  {const wm=M(0x8a6a40);box(-7,-2,1,4.2,15.6,16.4,wm);box(2,7,1,4.2,15.6,16.4,wm);for(let x=-6.8;x<7;x+=0.5)if(Math.abs(x)>2.1)addMesh(new THREE.CylinderGeometry(0.08,0.09,3.6,5),wm,x,2.8,16.5).castShadow=false;}
  const gateG=[-1,1].map(sd=>{const g=new THREE.Group();g.position.set(sd*2,1,16);W.group.add(g);addMesh(new THREE.BoxGeometry(2,3,0.3),M(0x9a7a4a),-sd*1,1.5,0,g);return g;});
  const gateCol=colBox(-2,2,1,4.2,15.7,16.3,true);
  const RP=[-99,-99],ropes=[-1,1].map((sd,i)=>{const g=new THREE.Group();g.position.set(sd*5.2,1,17.1);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.05,0.05,2.6,5),M(0xd8c090),0,2.2,0,g);
    const b=addMesh(new THREE.ConeGeometry(0.22,0.36,10),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4}),0,0.9,0,g);return {g,b,sd};});
  ropes.forEach((R,i)=>W.hittables.push({pos:new V3(R.sd*5.2,2,17.1),r:1.1,push:false,alive:()=>!F.gate,onHit:h=>{RP[i]=G.time;if(G.solo)RP[1-i]=G.time;SFX.latch();anim(0.4,k=>{R.g.position.y=1-Math.sin(k*Math.PI)*0.4;});
    if(Math.abs(RP[0]-RP[1])<0.8){F.gate=true;gateCol.on=false;SFX.gate();gateG.forEach((g,j)=>anim(1,k=>{g.rotation.y=(j?-1:1)*k*1.6;}));banner('Плетень открыт!','#ffffff',1.6,'к омуту!');}
    else floatText(new V3(R.sd*5.2,3.6,17.1),'Разом! Вместе дёргайте!','#ffd9a0');}}));
  // вал: стена воды гонится по тропе; за ней — разлив
  const WV={z:98,on:false,hold:0,ck:82,sp:()=>G.solo?2.2:2.8,snd:0};
  const wave=new THREE.Group();W.group.add(wave);{const wm=M(0x4aa0b8,{transparent:true,opacity:0.78,emissive:0x0a4a5a,emissiveIntensity:0.4,depthWrite:false});const wb=addMesh(new THREE.BoxGeometry(14.4,4.6,2.6),wm,0,3.3,0.4,wave);wb.castShadow=false;wb.renderOrder=5;
    const fm=M(0xeafcff,{emissive:0x9ae0f0,emissiveIntensity:0.5});const crest=addMesh(new THREE.CylinderGeometry(0.7,0.7,14.4,10),fm,0,5.6,-0.6,wave);crest.rotation.z=Math.PI/2;crest.castShadow=false;
    const fl=new THREE.Mesh(new THREE.PlaneGeometry(14.4,90),M(0x3a8aa0,{transparent:true,opacity:0.6,depthWrite:false}));fl.rotation.x=-Math.PI/2;fl.position.set(0,1.5,46);fl.renderOrder=4;wave.add(fl);}
  wave.visible=false;
  const CKS=[82,56.4,36.4,25.4,13];
  function waveCaught(){SFX.splash();SFX.wave();shakeAll(0.07,0.6);banner('Вал догнал!','#cff8ff',1.8,'назад, к последней отметке — и бегом!');
    WV.z=WV.ck+13;WV.hold=1.6;HEROES.forEach((h,i)=>{placeOnGround(h,-2.4+i*1.6,WV.ck-0.6*(i%2),1);h.following=!h.active||(G.solo&&h.player!==G.soloPi);});snapCams();G.stats.falls=(G.stats.falls||0)+1;
    if(F.reeds&&!F.reedsDown&&WV.ck>31){F.reeds=false;reedCol.on=false;reeds.visible=false;comb.visible=true;}}   // камыш вырос раньше, чем все прошли — гребешок снова
  function chaseScene(){
    play({dur:8.6,fov:50,shots:[shot(0,[0,4.2,72],[0,3.6,92]),shot(4.2,[5.4,3,74],[0,1.8,82])],
      says:[[0.3,3.2,null,'<i>Река за спиной вздыбилась — встала валом до самых крон.</i>',true],[3.6,2.4,'vod','Кто звенел? Кто будил? Догоню-у-у!'],[6.2,2.2,'zven','Бежим! К омуту, скорее!']],
      events:[{t:0.4,fn:()=>{wave.visible=true;WV.z=104;anim(3.4,k=>{WV.z=104-k*8;wave.position.z=WV.z;});SFX.wave();tone(60,2.2,'sawtooth',0.16,40);shakeAll(0.05,1.4);}}],
      end:()=>{WV.on=true;WV.z=96;WV.hold=0.6;W.camYaw=Math.PI;snapCams();banner('Погоня!','#cff8ff',2.4,'вал за спиной — бегите вниз, к нам!');
        for(const pi of[0,1])tip(pi,'Вал гонится! Дуб поперёк — Потап поднимет '+K(0,'skill')+'; ручей — прилив гуслями '+K(pi,'item')+', и вплавь;<br>за скалами — гребешок: Йоша польёт его '+K(1,'skill')+', когда все прошли.',4.6);}});}
  W.updates.push(dt=>{
    if(!WV.on||G.cine||F.chaseDone)return;
    const ctl=G.solo?[G.soloPi]:[0,1];   // в одиночку — только тот, кем играешь (остальные догонят по «Ко мне!» или у омута)
    for(const c of CKS)if(c<WV.ck&&ctl.every(pi=>active(pi).pos.z<c))WV.ck=c;
    if(WV.hold>0)WV.hold-=dt;
    else if(F.reeds&&!F.reedsDown&&WV.z<=31.6){WV.z=31.6;F.reedT-=dt;reeds.rotation.x=Math.sin(G.time*9)*0.03;if(F.reedT<=0){F.reedsDown=true;reedCol.on=false;SFX.crash();anim(0.8,k=>{reeds.scale.y=Math.max(0.15,1-k);});floatText(new V3(0,4,30),'Прорвал камыш!','#cff8ff');}}
    else WV.z-=WV.sp()*dt;
    WV.z=Math.max(WV.z,9);wave.position.z=WV.z;wave.children[0].scale.y=1+Math.sin(G.time*3)*0.04;
    WV.snd-=dt;if(WV.snd<=0){WV.snd=2.2;SFX.wave();}
    if(Math.random()<dt*10)burst(new V3(rand(-6.5,6.5),5.8,WV.z-0.4),0xeafcff,2,2.4);
    const near=Math.min(...ctl.map(pi=>active(pi).pos.z>WV.z-14?WV.z-active(pi).pos.z:99));if(near<5&&Math.random()<dt*3)shakeAll(0.02,0.2);
    for(const pi of ctl){const h=active(pi);if(h.pos.z>WV.z-0.6){waveCaught();break;}}
    if(F.gate&&ctl.every(pi=>active(pi).pos.z<10.4)){F.chaseDone=true;WV.on=false;W.camYaw=0;SFX.crash();anim(1.6,k=>{wave.position.y=-k*5;wave.position.z=WV.z-k*12;});later(1.7,()=>{wave.visible=false;});later(1.2,intro);}});
  /* ---------- сюжет ---------- */
  function intro(){bb.style.display='block';HEROES.forEach((h,i)=>{placeOnGround(h,-4.5+i*3,4,1);h.face=Math.PI;});ko.g.visible=true;
    play({dur:15,fov:48,camK:2.6,shots:[shot(0,[6,6,10],[-8,5,-26]),shot(4.4,[-11,8.6,-24],[-15,11.4,-31],[-12,9.4,-25.6],[-15,11.6,-31],3),shot(9.2,[4,2.2,-6],[0.8,0,-14.6])],
      says:[[0.3,4,null,'<i>Омут. На высокой скале — фигура чёрная, тонкая,</i><br><i>Смотрит сверху; на руке перстень блестит звонкий.</i>',true],[4.6,3.6,null,'<i>Подошли герои ближе — а на скале уж никого.</i>',true],
        [9.3,3.2,null,'<i>На коряге Водяной сидит — толстый, в тине,</i><br><i>Хохочет пузырями на трясине.</i>',true],[12.4,2.4,'vod','Буль-буль-буль! Кто там звенел, кто спать мешал?']],
      events:[{t:1.6,fn:()=>{glint.visible=true;const p=new V3();ko.hand.getWorldPosition(p);glint.position.copy(p);anim(0.8,k=>{glint.scale.setScalar(1+Math.sin(k*Math.PI)*3);});later(0.9,()=>{glint.visible=false;});tone(3200,0.3,'sine',0.12);}},
        {t:7.6,fn:()=>{anim(0.8,k=>{ko.g.scale.setScalar(0.9*(1-k)+0.001);});later(0.85,()=>{ko.g.visible=false;ko.g.scale.setScalar(0.9);});SFX.keys();}},
        {t:9.2,fn:()=>{spawnVod();vod.state='idle';vod.g.position.set(0.8,-1.2,-14.6);}},{t:12.4,fn:()=>{for(let i=0;i<10;i++)later(i*0.12,()=>burst(vod.pos.clone().add(new V3(rand(-1,1),3.6,1)),0xcff8ff,3,2));for(let i=0;i<5;i++)tone(rand(160,260),0.14,'sine',0.2,rand(90,140),i*0.12);}}],
      end:()=>{if(!vod)spawnVod();vod.g.position.set(C.x,-2,C.z);F.phase=1;snag.visible=false;HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-5.2,-2);h.face=Math.PI;});W.clampR={x:C.x,z:C.z,r:R-0.7};snapCams();
        banner('Фаза 1 · омут','#7ad0a0',2.6,'прилив — волну отбивай · отлив — сбоку по ракушкам бей');}});}
  function ending(){const e=vod;
    play({dur:20,fov:48,camK:2.4,shots:[shot(0,[5,2.6,-5],[0,1.2,-14]),shot(6.8,[0,12,6],[0,0,-16]),shot(12.4,[3.6,1.6,-6.4],[T.yosha.pos.x,0.6,T.yosha.pos.z]),shot(15.6,[-10,9,-22],[-15,11.2,-31])],
      says:[[0.3,3,null,'<i>Водяной звено выплёвывает…</i>',true],[3.4,3.2,null,'<i>…и опять омут закрутить собирается. Но сверху колокола Китежа звенят —</i><br><i>Медленно, как колыбельная, звенят-звенят.</i>',true],
        [8,3.4,null,'<i>Водяной зевает, на дно опускается —</i><br><i>Засыпает, пузырями пускается.</i>',true],[12.4,2.6,'yosha','<i>(шёпотом)</i> Тише. Пусть спит, не будите.'],[15.6,3.6,null,'<i>На скале перстень блеснул — и тонкая тень ушла.</i>',true]],
      events:[{t:0.6,fn:()=>{const L=linkItem(e.pos.x,3,e.pos.z);const to=T.proshka.pos.clone();anim(1.2,k=>{L.base=3+Math.sin(k*Math.PI)*3;L.pos.x=lerp(e.pos.x,to.x,k);L.pos.z=lerp(e.pos.z,to.z,k);});later(1.3,()=>takeItem(L,T.proshka));}},
        {t:3.4,fn:()=>{for(let i=0;i<8;i++)later(i*0.9,()=>{tone(523*[1,0.84,0.75,0.84][i%4],1.6,'sine',0.22);tone(262,1.8,'sine',0.1);});lullaby(LUL1,0.55,0.4,0.12);}},
        {t:8,fn:()=>{anim(3,k=>{e.g.position.y=-2-k*0.6;e.body.rotation.x=-0.6*k;});for(let i=0;i<14;i++)later(1+i*0.5,()=>{burst(e.pos.clone().add(new V3(0,2.6,1)),0xcff8ff,3,1.5);if(i%4===0)floatText(e.pos.clone().add(new V3(0,3.4,0)),'З-з-з…','#cfe8ff');});}},
        {t:15.4,fn:()=>{ko.g.visible=true;ko.g.rotation.y=Math.PI*0.8;glint.visible=true;const p=new V3();ko.hand.getWorldPosition(p);glint.position.copy(p);anim(0.8,k=>{glint.scale.setScalar(1+Math.sin(k*Math.PI)*3);});SFX.keys();
          later(2.6,()=>{anim(0.8,k=>{ko.g.scale.setScalar(0.9*(1-k)+0.001);});glint.visible=false;});}}],
      end:()=>{F.out=true;banner('Водяной спит','#ffd76a',2.4,'колокола Китежа буйную воду убаюкали');later(2.2,finishLevel);}});}
  W.updates.push(dt=>{setBar();if(!vod||G.cine)return;
    // фаза 2: течение крутит омут — уносит искры в пасть Водяному и сносит героев; вода на краях разная — течение гаснет
    if(F.phase===2&&F.current>0){for(const s of W.sparks){const p=s.m.position,dx=vod.pos.x-p.x,dz=vod.pos.z-p.z,d=Math.hypot(dx,dz)||1;s.v.x+=(dx/d*1.6+dz/d*1.2)*F.current*dt*3;s.v.z+=(dz/d*1.6-dx/d*1.2)*F.current*dt*3;
        if(d<1.8&&vod.alive){vod.embers=Math.min(vod.maxEmb,vod.embers+1);SFX.ember();s.free=99;s.m.material.opacity=0;if(W.onEat)W.onEat(vod);}}
      for(const h of HEROES){if(h.cling||(h.active&&players[h.player].downed))continue;const dx=C.x-h.pos.x,dz=C.z-h.pos.z,d=Math.hypot(dx,dz)||1;if(d<2.6)continue;const k=F.current*0.32*dt;h.pos.x+=(dx/d*0.5+dz/d)*k;h.pos.z+=(dz/d*0.5-dx/d)*k;}
      swirlFx.visible=true;swirlFx.rotation.z+=dt*F.current;swirlFx.material.opacity=0.25+0.15*F.current;}
    else swirlFx.visible=false;
    if(F.phase===2&&halves){swirlFx.position.y=Math.max(halves[0].level,halves[1].level)+0.05;}
    if(F.phase===3&&bubble){if(bubble.up){bubble.k=Math.min(1,bubble.k+dt/1.5);bubble.g.position.set(vod.pos.x,lerp(0,7.2,smooth(bubble.k)),vod.pos.z);bubble.g.scale.setScalar(0.4+0.6*bubble.k);bubble.m.rotation.y+=dt;
        bubble.markRef.pos.set(vod.pos.x,7.2,vod.pos.z+3.3*bubble.g.scale.x);}
      else if(vod.state!=='broken'&&!F.won){F.reT=(F.reT||0)+dt;if(F.reT>3){F.reT=0;raiseBubble();say('vod','Ещё разок — весь омут на вас!',2);}}}
    if(F.phase===1||F.phase===2){if(vod.state==='broken'&&!F.brTold){F.brTold=true;}}});
  const swirlFx=new THREE.Mesh(new THREE.RingGeometry(1.5,10,40,1,0,Math.PI*1.6),MB(0xcff8ff,{transparent:true,opacity:0.3,side:THREE.DoubleSide,depthWrite:false}));swirlFx.rotation.x=-Math.PI/2;swirlFx.position.set(C.x,0.9,C.z);swirlFx.visible=false;W.group.add(swirlFx);
  /* ---------- рисунки кнопок и задачи ---------- */
  const sideOf=h=>h.pos.x<0?0:1;
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>F.phase===1&&vod&&zone.state==='high'&&Object.values(vod.shell||{}).some(x=>x),'отлив — бей ракушки');
    prompt(pi,'item',()=>headOf(h()),()=>F.phase===2&&halves&&F.current>0&&(pi===0?sideOf(h())!==sideOf(active(1)):true),'сделай воду разной');
    prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig!=='red'&&e.help)||W.bolts.some(b=>b.tgt===h()&&!b.refl&&b.eta<0.8));
    prompt(pi,'roll',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig==='red'&&e.help));
    prompt(pi,'attack',()=>headOf(h()),()=>vod&&(vod.state==='broken'||(F.phase===2&&F.current===0))&&hd(vod.pos,h().pos)<5,F.phase===3?'вместе!':'');
    prompt(pi,'swap',()=>headOf(h()),()=>F.phase===3&&players[pi].blue>=1,'богатырский выход');}
  prompt(0,'skill',()=>headOf(T.proshka),()=>F.phase===3&&bubble&&bubble.up&&T.proshka.active,'в жёлудь!');
  prompt(0,'swap',()=>headOf(T.proshka),()=>F.phase===3&&bubble&&bubble.up&&T.potap.active,'Прошка — рогатка');
  W.tipZones.push({cond:()=>F.phase===2&&F.current>0,text:pi=>'Течение омут крутит! Встаньте на половины разные:<br>У одного прилив '+K(pi,'item')+', у другого отлив — вот и все дела праздные.'},
    {cond:()=>F.phase===2&&F.current===0,text:pi=>'Течение встало — у Водяного голова кругом. Бей '+K(pi,'attack')+'!<br>Оставленные герои искры собирают — вот улов!'});
  const ph1=pi=>O(()=>'Прилив: Водяной хвостом волну бьёт — <i class="sg b"></i> отбей её назад '+K(pi,'guard')+'.<br>Отлив '+K(pi,'item')+': на дне лежит он, ракушки сбиваются сбоку '+K(pi,'attack')+' — вот так бьют.',()=>F.phase>1,()=>vod?[vod.g]:[]);
  const ph2=pi=>O(()=>'Течение искры в пасть ему уносит! Воду разной сделайте:<br>На своей половине сыграй '+K(pi,'item')+', а друг — наоборот, проверьте.',()=>F.phase>2,()=>halves?halves.map(z=>z.shell.g):[]);
  const ph3=pi=>O(pi?()=>'Водяной весь омут пузырём поднял! Прошка его рогаткой собьёт.<br>Водяной оглушён — смени на Йошу '+K(1,'swap')+', и бейте '+K(1,'attack')+' вместе — вперёд!':()=>'Водяной весь омут пузырём поднял! Из рогатки '+K(0,'skill')+' в жёлудь стрельни.<br>Водяной оглушён — смени на Потапа '+K(0,'swap')+', и бейте '+K(0,'attack')+' вместе, одни!',()=>!!F.won,()=>bubble?[bubble.g]:[]);
  const oc1=pi=>O(pi?()=>'Вал по пятам! Дуб поперёк тропы — Потап его поднимет. Беги следом!':()=>'Вал по пятам! Дуб поперёк тропы — Потап его поднимет '+K(0,'skill')+' (смени героя '+K(0,'swap')+').',()=>!!F.oak,()=>[oak]);
  const oc2=pi=>O(()=>'Ручей: в отлив из него не выбраться. Прилив гуслями '+K(pi,'item')+' у ракушки — и вплавь!',()=>active(pi).pos.z<37.6&&active(pi).pos.y>0.6,()=>[STR.shell.g]);
  const oc3=pi=>O(pi?()=>'За скалами — гребешок Василисы. Все прошли — Йоша, полей его живой водой '+K(1,'skill')+': камыш встанет стеной!':()=>'За скалами — гребешок Василисы: Йоша польёт — и камыш встанет стеной. Проходи скорей!',()=>!!F.reeds||active(pi).pos.z<20,()=>F.reeds?[]:[comb]);
  const oc4=pi=>O(()=>'Плетень на запоре: две верёвки — дёрните разом '+K(pi,'attack')+'!',()=>!!F.gate,()=>ropes.map(R=>R.g));
  for(const pi of[0,1])W.objectives[pi]=[oc1(pi),oc2(pi),oc3(pi),oc4(pi),O('К омуту!',()=>!!F.chaseDone,()=>[]),O('Омут…',()=>F.phase>=1,()=>[]),ph1(pi),ph2(pi),ph3(pi),O('Колокола Китежа…',()=>false,()=>[])];
  prompt(0,'skill',()=>headOf(T.potap),()=>!F.oak&&T.potap.active&&hd(T.potap.pos,{x:0,z:59.7})<2.3,'ухнем!');
  for(const pi of[0,1]){const h=()=>active(pi);prompt(pi,'item',()=>headOf(h()),()=>WV.on&&inZone(STR,h(),1.2)&&STR.state==='low','прилив');prompt(pi,'attack',()=>headOf(h()),()=>!F.gate&&ropes.some(R=>hd(h().pos,{x:R.sd*5.2,z:17.1})<1.8),'разом!');}
  prompt(1,'skill',()=>headOf(T.yosha),()=>!F.reeds&&WV.on&&T.yosha.active&&hd(T.yosha.pos,{x:0,z:26.2})<3,'гребешок!');
  W.tipZones.push({cond:(pi,h)=>WV.on&&h.pos.z>37.6&&h.pos.z<46.2&&h.pos.y<0.4,text:pi=>'Из ручья в отлив не выбраться. Прилив '+K(pi,'item')+' — и вверх!'});
  W.spawns=[[new V3(-1.5,1,80),new V3(-3,1,82)],[new V3(1.5,1,80),new V3(3,1,82)]];W.startAct=[0,0];
  W.pauseLine='Погоня: вал по пятам — дуб поднять, ручей переплыть, гребешок за спину, плетень дёрнуть разом.<br>Водяной: в приливе плавает, волной бьёт — отбивай;<br>В отливе на дне лежит — сбоку бей, не зевай.<br>Течение гаснет, коль вода по краям разная. Пузырь над головой — рогаткой, так и знай.';
  W.onStart=()=>{later(0.4,chaseScene);};
  W.dbg2b=()=>({F,WV,STR,oakCol,reedCol,gateCol,ropes,RP,vod,CKS,wave,halves,zone});
  W.warp2b=(where)=>{if(where==='boss'){F.oak=F.reeds=F.reedsDown=F.gate=true;oakCol.on=reedCol.on=gateCol.on=false;F.chaseDone=true;WV.on=false;wave.visible=false;W.camYaw=0;intro();}
    else{const z={oak:62,stream:52,pass:34,gate:22}[where];F.oak=true;oakCol.on=false;oak.visible=false;if(z<40)setWater(STR,'high');if(where==='gate'){F.reeds=F.reedsDown=true;}WV.ck=z;WV.z=z+14;WV.on=true;wave.visible=true;W.camYaw=Math.PI;
      HEROES.forEach((h,i)=>{placeOnGround(h,-2.4+i*1.6,z,1);h.following=false;});snapCams();}return W.dbg2b();};
  flushDecor();}
