/* ============================== 2-Б «ВОДЯНОЙ» — босс мира 2 ============================== */
// гусли в бою: вода арены · течение уносит искры · прерывание рогаткой · Богатырский мах · Кощей на скале — молчаливый визит 3
function build2B(){
  W.zvenAway=true;W.world=2;W.bubbles=false;setTheme('whirl');sky('day');W.name='2-Б · «Водяной»';W.sub='Босс мира 2 · буйная вода, а не злодей';W.camX=16;const F=W.flags;F.phase=0;F.fin=[-9,-9];
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.gusli=true;W.fallY=-8;W.waterCol=0x3a8aa0;W.waterOp=0.46;
  const C={x:0,z:-14},R=11,T=HERO,bank=M(0x7a8a6a),rock=M(0x6a6a64);
  ground(-16,16,-3,8,1,bank);ground(-16,16,-32,-25,1,bank);ground(-16,-11,-25,-3,1,bank);ground(11,16,-25,-3,1,bank);ground(-11,11,-25,-3,-2,M(0x4a5a4a));
  wall(-16.2,-16,-32,8);wall(16,16.2,-32,8);wall(-16.2,16.2,8,8.2);wall(-16.2,16.2,-32.2,-32);
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
  const arena={x:C.x,z:C.z,r:R-2,camActive:()=>!G.cine};W.camZones.push(arena);
  bell(0,4,1);
  const bb=$('bossbar');bb.style.display='block';W.onLeave=()=>{bb.style.display='none';};
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
  /* ---------- сюжет ---------- */
  function intro(){HEROES.forEach((h,i)=>{placeOnGround(h,-4.5+i*3,4,1);h.face=Math.PI;});ko.g.visible=true;
    play({dur:15,fov:48,camK:2.6,shots:[shot(0,[6,6,10],[-8,5,-26]),shot(4.4,[-11,8.6,-24],[-15,11.4,-31],[-12,9.4,-25.6],[-15,11.6,-31],3),shot(9.2,[4,2.2,-6],[0.8,0,-14.6])],
      says:[[0.3,4,null,'<i>Омут. На высокой скале — фигура чёрная, тонкая,</i><br><i>Смотрит сверху; на руке перстень блестит звонкий.</i>',true],[4.6,3.6,null,'<i>Когда мы подходим, её уже нет.</i>',true],
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
  for(const pi of[0,1])W.objectives[pi]=[O('Омут…',()=>F.phase>=1,()=>[]),ph1(pi),ph2(pi),ph3(pi),O('Колокола Китежа…',()=>false,()=>[])];
  W.spawns=[[new V3(-3,1,4),new V3(-5,1,5)],[new V3(3,1,4),new V3(5,1,5)]];W.startAct=[0,0];
  W.pauseLine='Водяной: в приливе плавает, волной бьёт — отбивай;<br>В отливе на дне лежит — сбоку бей, не зевай.<br>Течение гаснет, коль вода по краям разная. Пузырь над головой — рогаткой, так и знай.';
  W.onStart=()=>{later(0.4,intro);};
  flushDecor();}

