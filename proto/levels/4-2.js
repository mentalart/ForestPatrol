/* ============================== МИР 4 · 4-2 «РЕКА СМОРОДИНА» ============================== */
// развитие клещей: живая вода по лаве — корка; клещи несут корку ступенькой; корка на струе — плот; паровые столбы; жар-ящерки на сваях
// лавопад в три яруса: Йоша спускается первым (Потап ловит, Прошка прикрывает рогаткой) и гасит затвор жёлоба; огненная завеса — подкидка Потапа и живая вода; запруда — рогатка и живая вода
function build42(){
  W.zvenAway=true;W.world=4;setTheme('smorodina');W.name='4-2 · «Река Смородина»';W.sub='Огненная Смородина · у каждого своё дело: Йоша гасит, Прошка прикрывает, Потап подкидывает';W.camX=11;const F=W.flags;F.stage='a';
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.kleshi=true;W.fallY=-12;const T=HERO,LY=-0.45;
  // никого не переносит через огонь издалека: оставленного героя переводят сами (корка, плот, подкидка); рядом — перепрыгнет
  W.pullMax=4.5;W.leftTip=(pi,o)=>o.kind==='yosha'||o.kind==='pelageya'?'Второй герой на том берегу остался. Смени '+K(pi,'swap')+' и переведи его:<br>Корка Йоши, плот иль подкидка Потапа — вот и всё тут.':'Второй герой на том берегу остался. Попроси Йошу корку-мосток ему сделать —<br>И смени '+K(pi,'swap')+', чтоб дело доделать.';
  const bankM=M(0x5a4a40),rockM=M(0x3e3230),darkM=M(0x2a2024);
  const Z=makeVestZ(helperOf(3));W.zven=Z;Z.pos.set(0,2.4,6);
  const bubM=M(0xff7418,{emissive:0xff4a00,emissiveIntensity:0.85});bubM.userData.shared=true;
  /* ---------- лава: особые участки (бурлящая струя, течение), каскад спуска, общая гладь ---------- */
  const chan=lavaZone(-30,30,-20,-13,LY+0.02,{noCrust:true,mat:bubM});
  const spill=lavaZone(-30,30,-42,-26,LY+0.01,{flow:{x:0,z:-1.4}});
  const CAS=[[-52,-53.5,-0.95],[-53.5,-55,-1.45],[-55,-56.5,-1.95]];   // три ступени огненного каскада — спуск Йоши
  for(const[z0,z1,y]of CAS){lavaZone(-9,3.2,z1,z0,y);const sh=new THREE.Mesh(new THREE.PlaneGeometry(12.2,0.5),LAVA_M);sh.position.set(-2.9,y+0.25,z0);W.group.add(sh);}
  lavaZone(-60,60,-52,24,LY);lavaZone(-60,60,-120,-52,LY-6.2);
  const decorRock=(x,z,y,s)=>{const r=addMesh(new THREE.DodecahedronGeometry(s),rockM,x,y,z);r.rotation.set(rand(0,3),rand(0,3),0);return r;};
  for(let z=20;z>-110;z-=rand(3,5))for(const sd of[-1,1])decorRock(sd*rand(13,20),z,LY-0.2,rand(1,2.2));
  /* ---------- ящерки-плевуньи: плюют огнём в Йошу, когда он на лаве; Прошка сбивает их рогаткой ---------- */
  const spitters=[];const lizM=M(0xe0602a,{emissive:0x802000,emissiveIntensity:0.4});
  function spitter(x,z,y,cond){const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.42,0.6,3,8),rockM,0,-1.5,0,g);
    const liz=new THREE.Group();liz.position.y=0.05;g.add(liz);const bd=part(liz,new THREE.SphereGeometry(0.3,10,8),lizM,0,0.25,0);bd.scale.set(0.8,0.6,1.4);part(liz,new THREE.SphereGeometry(0.2,10,8),lizM,0,0.4,0.4);
    for(const s of[-1,1])part(liz,new THREE.SphereGeometry(0.06,6,5),MB(0xfff3a0),s*0.09,0.5,0.55);const tl=new THREE.ConeGeometry(0.1,0.7,6);tl.rotateX(-Math.PI/2);part(liz,tl,lizM,0,0.2,-0.6);
    const mk=markMesh(0.9);mk.position.set(x,y+1.3,z);W.group.add(mk);
    const S={g,liz,x,y,z,cond,cd:rand(2.4,3.6),down:0,mk,glow:0};S.mark={pos:new V3(x,y+0.5,z),active:()=>S.down<=0&&cond(),onHit:()=>{S.down=12;SFX.splash();burst(new V3(x,y+0.4,z),0xff6a20,14,3);floatText(new V3(x,y+1.6,z),'Бултых! Сбил!','#ffb070');
      const f0=liz.position.clone();anim(0.6,k=>{liz.position.set(k*0.8,f0.y+Math.sin(k*Math.PI)*0.8-k*1.6,0);liz.rotation.z=k*3;});if(!F.spitTold){F.spitTold=true;later(0.4,()=>bark(T.proshka,'proshka','Прикрываю, Йоша, не бойся!',1.8));}}};
    W.marks.push(S.mark);spitters.push(S);return S;}
  const onLava=()=>{const Y=T.yosha;const L=lavaAt(Y.pos.x,Y.pos.z);return !!L&&Y.pos.y<L.y+1.2;};
  function spitTick(dt){const Y=T.yosha;for(const S of spitters){S.mk.visible=S.down<=0&&S.cond();if(S.mk.visible){S.mk.lookAt(camS.position);S.mk.scale.setScalar(0.9+0.1*Math.sin(G.time*8));}
      if(S.down>0){S.down-=dt;if(S.down<=0){S.liz.position.set(0,0.05,0);S.liz.rotation.z=0;burst(new V3(S.x,S.y+0.4,S.z),0xff8a30,8,2);}continue;}
      lizM.emissiveIntensity=0.4;if(!S.cond()||!onLava()||hd(Y.pos,S)>9){S.cd=Math.max(S.cd,1.6);continue;}
      S.liz.rotation.y=Math.atan2(Y.pos.x-S.x,Y.pos.z-S.z);S.cd-=dt;if(S.cd<0.9)S.liz.scale.setScalar(1+0.25*Math.sin(G.time*30));else S.liz.scale.setScalar(1);
      if(S.cd<=0){S.cd=rand(3.2,4.4);const from=new V3(S.x,S.y+0.6,S.z),to=Y.pos.clone().add(new V3(0,0.6,0));const b=new THREE.Mesh(new THREE.SphereGeometry(0.2,8,6),MB(0xffa030));W.group.add(b);SFX.whoosh();
        anim(0.9,k=>{b.position.lerpVectors(from,to,k);b.position.y+=Math.sin(k*Math.PI)*1.4;if(k>=1){W.group.remove(b);burst(to.clone(),0xff8a30,12,3);
          if(hd(Y.pos,to)<1.2&&!G.cine){const dx=Y.pos.x-S.x,dz=Y.pos.z-S.z,dd=Math.hypot(dx,dz)||1;Y.vel.x=dx/dd*3.2;Y.vel.z=dz/dd*3.2;Y.vel.y=4;Y.grounded=false;Y.knockT=0.25;SFX.knock();floatText(Y.pos.clone().add(new V3(0,Y.d.height+0.6,0)),'Горячо!','#ffb070');
            const c=Y.groundRef&&Y.groundRef.crust?Y.groundRef:null;if(c)c.t=Math.max(0.5,c.t-3);if(!F.spitHitTold){F.spitHitTold=true;tip(0,'Ящерки плюют в Йошу! Прикрой его: рогатка '+K(0,'skill')+' по ящерке — бей!',3.4);}}}});}}}
  W.updates.push(dt=>{if(!G.cine)spitTick(dt);});
  /* ---------- А. берег и первый ручей: живая вода по лаве — корка; ящерки плюют, Прошка прикрывает ---------- */
  ground(-7,7,-2,14,0,bankM);bell(0,8);const n1=nutItem(6,0.6,11);
  box(-5.7,-4.3,LY-1,0,-4.9,-3.5,rockM);const L1=linkItem(-5,1.1,-4.2);
  const spot1=new V3(0,LY,-3.6);
  spitter(4.6,-4.4,LY+0.2,()=>F.stage==='a'||F.stage==='b');spitter(-2.6,-5.6,LY+0.2,()=>F.stage==='a'||F.stage==='b');
  /* ---------- Б. бурлящая струя: корку делают в тихой заводи и несут клещами ---------- */
  ground(-7,3,-13,-6.2,0,bankM);ground(3,7,-13,-11,0,bankM);ground(3,7,-8,-6.2,0,bankM);bell(-3,-9.5);const n2=nutItem(6.2,0.6,-12.2);
  const pool=new V3(5,LY,-9.5);{const rim=new THREE.Mesh(new THREE.TorusGeometry(1.6,0.08,6,24),MB(0x8ad8ff,{transparent:true,opacity:0.5}));rim.rotation.x=Math.PI/2;rim.position.set(5,LY+0.06,-9.5);W.group.add(rim);}
  W.updates.push(dt=>{if(Math.random()<dt*14)burst(new V3(rand(-8,8),LY+0.1,rand(-19.6,-13.4)),0xffb040,2,2,0.6);});
  /* ---------- В. берег у разлива: горячая осыпь, паровой лифт на скалу ---------- */
  ground(-7,7,-26,-20,0,bankM);bell(-3,-22.4);
  const pile=new THREE.Group();pile.position.set(-5.6,0,-24.2);W.group.add(pile);for(let i=0;i<7;i++)addMesh(new THREE.DodecahedronGeometry(rand(0.2,0.34)),M(0xff7a20,{emissive:0xff4000,emissiveIntensity:0.9}),rand(-0.6,0.6),0.15,rand(-0.5,0.5),pile);
  forgeZone(-5.6,0,-24.2,1.2);const kamen=hotItem('kamen',-5.4,0,-24,{name:'kamen'});
  const lift=steamVent(-8.7,-23,LY-0.05,{top:5.6,r:1.15});
  box(-12,-9.45,LY-1,5.2,-25.2,-20.8,rockM);const L2b=linkItem(-10.8,6.3,-23),n3=nutItem(-11.2,5.8,-21.6);
  /* ---------- Г. широкий разлив: корка на струе — плот; паровые столбы поперёк реки; ящерки на сваях ---------- */
  box(7,9.5,LY-1,2.6,-42,-26,rockM);box(-9.5,-7,LY-1,2.6,-42,-26,rockM);
  const vents=[-4.6,0,4.6].map(x=>steamVent(x,-34,LY-0.05,{r:1.5,mid:3.2}));
  box(-0.7,0.7,LY-1,0,-39.7,-38.3,rockM);const L3=linkItem(0,1.1,-39);
  const chunks=[];for(let i=0;i<14;i++){const c=addMesh(new THREE.BoxGeometry(rand(0.3,0.7),0.12,rand(0.3,0.6)),darkM,rand(-6.5,6.5),LY+0.04,rand(-42,-26));c.castShadow=false;chunks.push(c);}
  W.updates.push(dt=>{for(const c of chunks){c.position.z-=1.4*dt;if(c.position.z<-42)c.position.z+=16;}});
  const lizards=[lizardFoe(-5.6,-16.6,0.3),lizardFoe(5.6,-16.2,0.3),lizardFoe(-6.1,-30,0.3),lizardFoe(6.1,-31.5,0.3),lizardFoe(-6.1,-38.4,0.3),lizardFoe(6.1,-37.8,0.3)];
  W.onLizard=()=>{if(!F.lizTold){F.lizTold=true;later(0.6,()=>sayP('…отбитый огонёк ящерку в огонь сбивает.',3));}};
  /* ---------- Д. берег у лавопада ---------- */
  ground(-7,7,-52,-42,0,bankM);bell(0,-45);const n4=nutItem(-6.2,0.6,-50.6);
  box(9,12,-7,2.6,-78,-42,rockM);box(-12,-9,-7,2.6,-78,-42,rockM);
  /* ---------- Е. спуск в три яруса: каскад Йоши и затвор → огненная завеса и подкидка Потапа → запруда: рогатка и живая вода ---------- */
  const edge={x:0.8,z:-51.3};
  // жёлоб справа: по нему течёт огненный ручей, пока Йоша снизу не остудит затвор
  W.ramps=W.ramps||[];const chute={x0:5.1,z0:-52,y0:0,y1:-2.2,dx:0,dz:-1,len:4.5,w:1.9};W.ramps.push(chute);
  {const L=Math.hypot(4.5,2.2);const rp=addMesh(new THREE.BoxGeometry(3.8,0.4,L),rockM,5.1,-1.1-0.2,-54.25);rp.rotation.x=Math.atan2(2.2,4.5);}
  box(7,9,-7,0,-56.5,-52,rockM,{occ:false});
  const streamM=M(0xff7418,{emissive:0xff4a00,emissiveIntensity:0.9,transparent:true,opacity:0.95});const stream=new THREE.Mesh(new THREE.PlaneGeometry(2.6,Math.hypot(4.5,2.2)),streamM);stream.rotation.x=-Math.PI/2+Math.atan2(2.2,4.5);stream.position.set(5.1,-1.1+0.03,-54.25);W.group.add(stream);
  // ярус 1
  ground(-9,9,-60,-56.5,-2.2,bankM);bell(-6.4,-58.2,-2.2);
  const valve=new THREE.Group();valve.position.set(3.9,-2.2,-57.6);W.group.add(valve);addMesh(new THREE.CylinderGeometry(0.2,0.24,1.2,8),rockM,0,0.6,0,valve);
  const wheelM=M(0xff6a20,{emissive:0xff3000,emissiveIntensity:0.8});const wheel=addMesh(new THREE.TorusGeometry(0.55,0.1,8,20),wheelM,0,1.35,0,valve);wheel.rotation.x=Math.PI/2.4;for(let i=0;i<3;i++){const sp=addMesh(new THREE.BoxGeometry(1.0,0.07,0.07),wheelM,0,1.35,0,valve);sp.rotation.set(Math.PI/2.4,0,i*Math.PI/3);}
  W.cyls.push({x:3.9,z:-57.6,r:0.45,miny:-3,maxy:-0.6,on:true});
  // завеса: огонь льётся со скалы между ярусами
  const rampMid={x0:0,z0:-60,y0:-2.2,y1:-4.2,dx:0,dz:-1,len:2,w:9};W.ramps.push(rampMid);{const rp=addMesh(new THREE.BoxGeometry(18,0.4,Math.hypot(2,2)),bankM,0,-3.2-0.2,-61);rp.rotation.x=Math.atan2(2,2);}
  const curtM=M(0xff7418,{emissive:0xff4a00,emissiveIntensity:1,transparent:true,opacity:0.9,side:THREE.DoubleSide});const curtain=new THREE.Mesh(new THREE.PlaneGeometry(18,4.0,8,4),curtM);curtain.position.set(0,-1.4,-60.95);W.group.add(curtain);
  {const crack=addMesh(new THREE.BoxGeometry(18,0.06,0.5),MB(0xffa030),0,-3.18,-60.95);crack.castShadow=false;}
  const curtCol=colBox(-9,9,-4.6,0.6,-61.2,-60.7,true);const CUR={frozen:0};
  // ярус 2
  ground(-9,9,-65.5,-62,-4.2,bankM);bell(-6.4,-63.6,-4.2);
  // запруда: каменная плита висит на цепи над протокой; щеколда — Прошке рогаткой; горячую плиту Йоша остужает — и огонь уходит
  lavaZone(-9,9,-70.1,-65.5,-5.6);
  const damG=new THREE.Group();damG.position.set(-4.2,1.6,-67.8);W.group.add(damG);const damM=M(0x4a3e3a,{emissive:0xff3000,emissiveIntensity:0});addMesh(new THREE.BoxGeometry(3.4,1.4,2.2),damM,0,0,0,damG);
  const chain=addMesh(new THREE.CylinderGeometry(0.05,0.05,3,6),M(0x8a8a90),-4.2,3.8,-67.8);const latchMk=markMesh(1.1);latchMk.position.set(-4.2,5.4,-67.4);W.group.add(latchMk);
  addMesh(new THREE.BoxGeometry(0.6,0.4,0.6),M(0x3a3a40),-4.2,5.4,-67.8);box(-9,-6.4,-7,5.8,-69.4,-66.2,rockM,{occ:false});
  const DAM={state:'up',t:0};const stairs=[];for(let i=0;i<4;i++){const s=addMesh(new THREE.BoxGeometry(12.6,0.3,1.1),M(0x2a2226,{emissive:0xff4a00,emissiveIntensity:0.2}),1.2,-4.4-i*0.45,-66.05-i*1.1);s.visible=false;stairs.push(s);}
  const stairCols=[];
  W.marks.push({pos:new V3(-4.2,5.4,-67.8),active:()=>F.stage==='dam'&&DAM.state==='up',onHit:()=>dropDam()});
  function dropDam(){DAM.state='fall';SFX.latch();floatText(new V3(-4.2,5.8,-67.8),'Щёлк! Щеколда!','#ffd9a0');chain.visible=false;const f0=damG.position.clone(),to=new V3(-3.6,-5.2,-67.8);
    anim(0.8,k=>{damG.position.lerpVectors(f0,to,k*k);damG.rotation.z=k*0.3;});later(0.82,()=>{DAM.state='hot';DAM.t=6;damM.emissiveIntensity=1;SFX.splash();SFX.thud();burst(to.clone().add(new V3(0,0.8,0)),0xff8a30,20,4);shakeAll(0.04,0.3);
      banner('Плита в протоке — остуди!','#ffb070',2,'раскалилась она — Йоша, скорей живой водой остуди!');});}
  W.waterTargets.push({pos:new V3(-3.6,-5.2,-67.8),pri:3.5,active:()=>DAM.state==='hot',onWater:()=>{DAM.state='done';damM.emissiveIntensity=0;SFX.water();burst(new V3(-3.6,-4.2,-67.8),0xe8f4ff,26,4);banner('Запруда застыла!','#ffd76a',2.2,'огонь ушёл — вниз, по застывшим ступеням, вниз');
      for(let i=0;i<4;i++)later(0.3+i*0.25,()=>{stairs[i].visible=true;SFX.plate();const s=stairs[i];stairCols.push(colBox(-5.1,7.5,s.position.y-0.15,s.position.y+0.15,s.position.z-0.55,s.position.z+0.55,false));});F.stage='down';}});
  // низ лавопада
  ground(-9,9,-88,-70.1,-6,bankM);bell(-5,-72.4,-6);const L4=linkItem(-7.4,-4.9,-76);
  for(let i=0;i<5;i++)decorRock(rand(-8,8),-84+rand(-1,1),-5.4,rand(0.8,1.4));
  const n5=nutItem(7.4,-3.6,-63.2);
  /* ---------- сюжет ---------- */
  function intro(){F.stage='intro';const pe=T.pelageya,yo=T.yosha;
    play({dur:15,fov:48,camK:2.6,shots:[shot(0,[0,6,12],[0,0,-14],[0,7,-8],[0,-2,-40],6),shot(6.4,[-2,3,-58],[0,-3,-52],[2,-2,-70],[0,-4,-58],3.4),shot(10,[pe.pos.x+2,1.4,pe.pos.z-1.8],[pe.pos.x,0.9,pe.pos.z])],
      says:[[0.3,4,null,'<i>Смородина-река огнём течёт —</i><br><i>Ни перепрыгнуть, ни перелететь её, вот.</i>',true],[6.4,3.4,null,'<i>А дальше — огненный водопад гремит.</i>',true],
        [10,3.4,'pelageya','<i>(по тетрадке)</i> Огонь живой воды боится…'],[13.2,1.8,'yosha','Проверим, что ж.']],
      events:[{t:10,fn:()=>{tone(1320,0.12,'triangle',0.08);tone(1760,0.16,'sine',0.06,null,0.06);}}],
      end:()=>{F.stage='a';snapCams();
        tip(1,'Смени на Йошу '+K(1,'swap')+', живой водой '+K(1,'skill')+' лаву полей — корка встанет.<br>На ней восемь секунд стоять можно — пока не растает.',4);
        tip(0,'Ящерки на камнях огнём в Йошу плюют! Прикрой его: рогатка '+K(0,'skill')+' —<br>В ящерку с золотым колечком целься, не робей, дружок.',4.4);}});}
  W.onCrust=c=>{if(!F.crustTold){F.crustTold=true;later(0.5,()=>bark(T.yosha,'yosha','Застыло! Держит, держит!',1.8));}};
  W.onNoCrust=()=>{if(!F.noCrustTold){F.noCrustTold=true;later(0.4,()=>sayP('…на бурлящем не встанет. В тихой заводи сделай —<br>И перенеси, куда надо, смело.',3.4));}};
  W.onPick=(h,it)=>{if(it.kind==='korka'&&!F.carryTold){F.carryTold=true;later(0.3,()=>bark(h,h.kind,h.kind==='proshka'?'Йоша делает — я несу, вот так!':'Несу ступеньку — берегись!',1.8));}};
  W.onVentCalm=()=>{if(!F.ventTold){F.ventTold=true;later(0.3,()=>sayP('Полил — стихает. Проезжайте, живо!',2.2));}};
  // лавопад: «Сиди тут»
  function fallScene(){F.stage='cut1';const po=T.potap,yo=T.yosha,pr=T.proshka,pe=T.pelageya;
    placeOnGround(po,0.6,-49.4,0);placeOnGround(yo,-0.6,-48.6,0);placeOnGround(pr,2.6,-48.2,0);placeOnGround(pe,-2.8,-48.4,0);HEROES.forEach(h=>h.face=Math.PI);
    play({dur:24,fov:46,camK:2.4,shots:[shot(0,[-5,3.4,-46],[0,-2.4,-60]),shot(4.6,[-1.8,1.6,-46.6],[0,1,-50]),shot(8.4,[4,2.6,-47],[0,0.8,-51]),shot(12.6,[yo.pos.x-1.6,1.3,yo.pos.z-1.6],[yo.pos.x,0.9,yo.pos.z]),shot(18.4,[po.pos.x+1.4,1.5,po.pos.z-1.8],[po.pos.x,1.1,po.pos.z])],
      says:[[0.3,4,null,'<i>Самое красивое место реки — водопад огня. Жёлоб справа залит огнём, внизу — огненная завеса.</i>',true],[4.6,3.4,'potap','<i>(загораживает Йошу)</i> Сиди тут. Я сам обход найду, не лезь.'],
        [8.4,3.8,null,'<i>Обхода нет. Потап вдоль края топчется.</i>',true],[12.6,1.8,null,'<i>Йоша не прыгает молча. Он поворачивается к Потапу.</i>',true],[14.6,3.6,'yosha','Потап, смотри на меня. Я пойду. Если что — ловишь.'],
        [18.4,3.4,null,'<i>Потап рот открывает. Закрывает.</i>',true],[21.6,2.2,'potap','…Ловлю. Ловлю, не бойся.']],
      events:[{t:4.4,fn:()=>{const f=po.pos.clone();anim(0.8,k=>{po.pos.lerpVectors(f,new V3(-0.3,0,-49.6),k);});po.face=0.4;}},
        {t:8.4,fn:()=>{placeOnGround(po,-3,-51,0);po.face=Math.PI;anim(3.6,k=>{po.pos.x=-3+Math.sin(k*Math.PI*1.5)*4;po.face=Math.cos(k*Math.PI*1.5)>0?Math.PI/2:-Math.PI/2;});}},
        {t:12.4,fn:()=>{placeOnGround(po,edge.x+0.6,-50.2,0);po.face=-Math.PI/2;yo.face=Math.PI/2;}}],
      end:()=>{W.anims.length=0;placeOnGround(po,edge.x-1.4,edge.z,0);po.face=Math.PI;placeOnGround(yo,-1.2,-51.4,0);yo.face=Math.PI;placeOnGround(pr,1.6,-50.6,0);pr.face=Math.PI;placeOnGround(pe,-3,-49,0);
        if(active(0)!==pr)doSwap(0);if(active(1)!==yo)doSwap(1);F.stage='fall';F.cnt=0;F.cntT=0;W.noSwap=()=>F.stage==='fall';W.noSwapTip='Потап на краю страхует. Сейчас Йоша идёт, Прошка рогаткой его прикрывает.';snapCams();
        tip(0,'Йоша по огненному каскаду спускается. Прикрой его: ящерки огнём плюют — рогатка '+K(0,'skill')+'.<br>Потап на краю поймает, если Йоша оступится, — не бойся ни чуточки.',4.4);
        tip(1,'Йоша идёт сам: живой водой '+K(1,'skill')+' полей — корка под лапами встанет.<br>Внизу затвор жёлоба горит — остуди, и друзья спустятся, не отстанут.',4.4);}});}
  spitter(-7.4,-54.2,-0.4,()=>F.stage==='fall');spitter(2.2,-55.8,-1.2,()=>F.stage==='fall');
  const NUM=['Раз.','Два.','Три.','Четыре.','Пять.','Шесть.','Семь.','Восемь.','Девять.','Десять.','Одиннадцать.','Двенадцать.','Тринадцать.','Четырнадцать.','Пятнадцать.','Шестнадцать.','Семнадцать.','Восемнадцать.','Девятнадцать.','Двадцать.','Двадцать одна…','Двадцать две…','Двадцать три…','Двадцать четыре…'];
  W.fallHook=h=>{if(F.stage!=='fall'||h!==T.yosha)return false;const po=T.potap;placeOnGround(h,po.pos.x+0.9,po.pos.z+0.3,po.pos.y);h.iT=1.2;h.vel.set(0,0,0);ringFx(po.pos,0xc08a48,1.6);SFX.toss();
    floatText(po.pos.clone().add(new V3(0,po.d.height+0.6,0)),'Поймал!','#ffd9a0');bark(po,'potap',F.caught?'Ещё раз. Я тут, я рядом.':'Поймал! Давай снова, смелее!',2);F.caught=true;return true;};
  // затвор остужен — ручей в жёлобе застывает, остальные спускаются
  W.waterTargets.push({pos:new V3(3.9,-2.2,-57.6),pri:2.5,active:()=>!F.valve&&T.yosha.pos.y<-1.6&&T.yosha.pos.z<-56.3,onWater:()=>{F.valve=true;wheelM.color.setHex(0x3e3c44);wheelM.emissiveIntensity=0;SFX.water();SFX.gate();burst(new V3(3.9,-0.8,-57.6),0xe8f4ff,20,4);
      anim(1.4,k=>{streamM.color.lerpColors(new THREE.Color(0xff7418),new THREE.Color(0x2a2226),k);streamM.emissiveIntensity=0.9*(1-k)+0.1;});banner('Затвор остыл!','#ffd76a',2.4,'огненный ручей в жёлобе застыл — по жёлобу справа спускайтесь');
      F.stage='tier1';W.noSwap=null;later(0.6,()=>bark(T.yosha,'yosha','Спускайтесь! Я держу, держу!',1.8));
      tip(0,'Жёлоб застыл! Справа по нему спускайся. И Потап — смени '+K(0,'swap')+'.',3.6);}});
  // огненная завеса: Потап подкидывает друзей через неё; Йоша с той стороны остужает завесу, чтобы прошёл Потап
  W.waterTargets.push({pos:new V3(0,-4.2,-61.6),pri:2.5,active:()=>{const Y=T.yosha;return CUR.frozen<=0&&Y.pos.z<-61.3&&Y.pos.y<-3.4&&Math.abs(Y.pos.x)<9;},onWater:()=>{CUR.frozen=8;SFX.water();burst(new V3(T.yosha.pos.x,-2.8,-61),0xe8f4ff,22,4);floatText(new V3(T.yosha.pos.x,-1.6,-61),'Завеса застыла на восемь секунд!','#cfe8ff');
      if(!F.curTold){F.curTold=true;later(0.3,()=>bark(T.yosha,'yosha','Потап, иди! Скорее, скорее!',1.8));}}});
  function bottomScene(){F.stage='cut2';const po=T.potap,yo=T.yosha,pr=T.proshka,pe=T.pelageya;placeOnGround(yo,-0.4,-73.4,-6);yo.face=Math.PI*0.9;placeOnGround(pr,3.2,-74.4,-6);pr.face=-2.4;placeOnGround(po,1.4,-73.2,-6);placeOnGround(pe,-2.6,-74.6,-6);pe.face=0.4;
    play({dur:20,fov:46,camK:2.4,shots:[shot(0,[yo.pos.x-2,-4.6,yo.pos.z-2.2],[yo.pos.x,-5.4,yo.pos.z]),shot(4.4,[2.6,-4.8,-76.4],[0.2,-5.3,-73.3]),shot(10.4,[po.pos.x+1.2,-4.8,-75],[0.8,-5.2,-73.2]),shot(15.4,[-2.6,-4.4,-76.6],[0.2,-5.2,-73.3])],
      says:[[0.3,4,null,'<i>Внизу Йоша садится и тяжело дышит.</i><br><i>Потап рядом садится. Долго молчит — лишь тишина слышит.</i>',true],[4.4,4,null,'<i>Спускались все: Йоша — первым, Прошка его прикрывал,</i><br><i>Потап подкидывал и ловил — никто не отставал.</i>',true],
        [10.4,3.6,'potap','Ладно. Не «сиди тут».'],[15.4,3.6,null,'<i>Варя (шёпотом): «Он у меня самый главный».</i>',true]],
      events:[{t:0.2,fn:()=>{yo.body.scale.y=0.8;}},{t:4.4,fn:()=>{po.face=-Math.PI/2;po.body.scale.y=0.85;}},{t:16,fn:()=>{if(!L4.taken)takeItem(L4,yo);}}],
      end:()=>{W.anims.length=0;yo.body.scale.y=1;po.body.scale.y=1;F.out=true;banner('Река Смородина позади!','#ffb070',2.4,'дальше — баржа у кузни ждёт');later(1.8,finishLevel);}});}
  W.updates.push(dt=>{const ah=[0,1].map(active);
    if(F.stage==='a'&&ah.some(h=>h.pos.z<-7&&h.pos.y>-0.2))F.stage='b';
    if(F.stage==='b'&&ah.some(h=>h.pos.z<-20.4&&h.pos.y>-0.2))F.stage='c';
    if(F.stage==='c'&&ah.some(h=>h.pos.z<-42.4&&h.pos.y>-0.2))F.stage='d';
    if(F.stage==='d'&&ah.some(h=>h.pos.z<-47.5&&h.pos.y>-0.2))fallScene();
    // Йоша на том берегу, остальные — нет: подсказка «помоги с той стороны»
    if((F.stage==='a'||F.stage==='b')&&!G.cine){const Y=T.yosha,other=[T.proshka,T.potap,T.pelageya].filter(h=>h.pos.z>-2.2&&h.pos.y>-0.3);
      if(Y.active&&Y.pos.z<-6.4&&Y.pos.y>-0.2&&other.length){F.helpT=(F.helpT||0)-dt;if(F.helpT<=0){F.helpT=12;tip(1,'Ты на том берегу, а друзья — нет. Встань у края, лаву полей '+K(1,'skill')+' —<br>Корка мостиком для них станет, скорей.',3.6);tip(0,'Йоша на том берегу. Жди его корку у края — и прыгай '+K(0,'jump')+' на неё.',3.2);}}}
    // жёлоб: пока ручей течёт — горячо, отбрасывает наверх
    if(!F.valve)for(const h of HEROES){if(h.pos.x>3.1&&h.pos.x<7.1&&h.pos.z<-52.2&&h.pos.z>-56.4&&h.groundRef===chute){h.vel.z=5;h.vel.y=5;h.grounded=false;h.groundRef=null;h.knockT=0.35;SFX.knock();if(h.active)floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Огненный ручей! Жди, пока Йоша затвор остудит','#ffb070');}}
    streamM.map=null;if(!F.valve){streamM.emissiveIntensity=0.8+0.2*Math.sin(G.time*7);if(Math.random()<dt*6)burst(new V3(5.1+rand(-1,1),rand(-2,0),rand(-56,-52.4)),0xffb040,2,2,0.6);}
    if(F.stage==='fall'){const yo=T.yosha;
      // Потап считает вслух, чтобы не бояться
      if(yo.pos.z<-52&&yo.pos.y>-2){F.cntT+=dt;if(F.cntT>1.15&&F.cnt<NUM.length){F.cntT=0;bark(T.potap,'potap',NUM[F.cnt++],1);}}
      if(yo.grounded&&yo.pos.y<-1.9&&yo.pos.z<-56.4&&!F.t1told){F.t1told=true;SFX.ok();bark(yo,'yosha','Я внизу! Сейчас затвор, сейчас!',1.8);}}
    // завеса
    if(CUR.frozen>0){CUR.frozen-=dt;curtCol.on=false;curtM.color.setHex(0x3a3034);curtM.emissiveIntensity=CUR.frozen<2.5&&Math.sin(G.time*14)>0?0.8:0.1;if(CUR.frozen<=0){SFX.whoosh();floatText(new V3(0,-1.2,-61),'Завеса снова льётся — берегись!','#ffb070');}}
    else{curtCol.on=true;curtM.color.setHex(0xff7418);curtM.emissiveIntensity=0.85+0.15*Math.sin(G.time*9);const pa=curtain.geometry.attributes.position;if(pa){for(let i=0;i<pa.count;i++){const x=pa.getX(i),y=pa.getY(i);pa.setZ(i,Math.sin(G.time*6+x*0.8+y*1.3)*0.08);}pa.needsUpdate=true;}}
    // подкинутого Потапом над завесой несёт вперёд — через огонь
    for(const h of HEROES)if(h.tossT>0&&h.pos.y>-1.2&&h.pos.z>-62&&h.pos.z<-58.6&&Math.abs(h.pos.x)<9)h.pos.z-=2.8*dt;
    for(const h of HEROES){if(curtCol.on&&Math.abs(h.pos.z-(-60.95))<0.9&&h.pos.y<0.6&&h.pos.y>-4.6&&Math.abs(h.pos.x)<9&&!h.tossT){if(h.active&&G.time-(h.curT||-9)>2.5){h.curT=G.time;floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Огненная завеса! Пусть Потап '+'через неё подкинет','#ffb070');}}}
    if(F.stage==='tier1'&&ah.some(h=>h.pos.z<-61.4&&h.pos.y<-3.4)){F.stage='dam';banner('Запруда','#ffb070',2.6,'Прошка — рогатка '+K(0,'skill')+' по щеколде на скале · Йоша — упавшую плиту остуди '+K(1,'skill'));}
    if(DAM.state==='hot'){DAM.t-=dt;damM.emissiveIntensity=0.8+0.2*Math.sin(G.time*10);if(DAM.t<=0){DAM.state='sink';SFX.splash();floatText(new V3(-3.6,-3.6,-67.8),'Плита расплавилась…','#ffb070');const f0=damG.position.clone();
        anim(1.2,k=>{damG.position.y=f0.y-k*1.4;});later(2.4,()=>{damG.position.set(-4.2,1.6,-67.8);damG.rotation.z=0;chain.visible=true;damM.emissiveIntensity=0;DAM.state='up';floatText(new V3(-4.2,3,-67.8),'Цепь новую плиту подняла','#ffd9a0');});
        tip(1,'Плита расплавилась — Йоша не успел. Прошка новую собьёт,<br>А ты у протоки стой и сразу поливай '+K(1,'skill')+' — вот и весь расчёт.',3.4);}}
    if(F.stage==='down'&&ah.every(h=>h.pos.y<-5.5&&h.pos.z<-70.4)&&!G.cine)bottomScene();});
  /* ---------- рисунки кнопок ---------- */
  const Y=T.yosha,Po=T.potap,Pr=T.proshka;
  prompt(1,'skill',()=>headOf(Y),()=>Y.active&&W.waterTargets.some(w=>w.lava&&w.active()),'корка');
  prompt(1,'skill',()=>headOf(Y),()=>Y.active&&W.vents.some(v=>!v.fixed&&v.mode==='mid'&&hd(v,Y.pos)<3.2),'сейчас стихнет');
  prompt(1,'skill',()=>headOf(Y),()=>Y.active&&!F.valve&&Y.pos.y<-1.6&&hd(Y.pos,{x:3.9,z:-57.6})<5,'остуди затвор');
  prompt(1,'skill',()=>headOf(Y),()=>Y.active&&CUR.frozen<=0&&Y.pos.z<-61.3&&Y.pos.y<-3.4&&[Po,Pr,T.pelageya].some(h=>h.pos.z>-60.6&&h.pos.y>-2.6),'остуди завесу');
  prompt(1,'skill',()=>headOf(Y),()=>Y.active&&DAM.state==='hot','остуди плиту!');
  prompt(0,'skill',()=>headOf(Pr),()=>Pr.active&&spitters.some(s=>s.down<=0&&s.cond()&&onLava()),'рогатка — по ящерке');
  prompt(0,'skill',()=>headOf(Pr),()=>Pr.active&&F.stage==='dam'&&DAM.state==='up','по щеколде');
  prompt(0,'swap',()=>headOf(Po),()=>Po.active&&F.stage==='dam'&&DAM.state==='up','Прошка — рогатка');
  prompt(0,'skill',()=>headOf(Po),()=>Po.active&&F.stage==='tier1'&&Po.pos.z>-60.6&&Po.pos.y>-2.6&&HEROES.some(h=>h!==Po&&hd(h.pos,Po.pos)<2.4&&h.pos.z>-60.6),'подкинь через завесу');
  prompt(0,'swap',()=>headOf(Pr),()=>Pr.active&&F.stage==='tier1'&&Pr.pos.z>-60.6&&Pr.pos.y>-2.6,'Потап — подкидка');
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>!heroCarry(h())&&!!crustNear(h()),'взять корку');
    prompt(pi,'item',()=>headOf(h()),()=>{const it=heroCarry(h());return !!it&&it.kind==='korka';},'положить');
    prompt(pi,'item',()=>headOf(h()),()=>{const it=heroCarry(h());return !!it&&it.kind==='kamen'&&W.vents.some(v=>!v.fixed&&hd(v,h().pos)<5);},'в дыру с паром');
    prompt(pi,'guard',()=>headOf(h()),()=>W.bolts.some(b=>b.tgt===h()&&!b.refl&&b.eta<0.6));
    prompt(pi,'up',()=>headOf(h()),()=>h().tossT>0&&h().pos.z>-62&&h().pos.z<-58.6,'вперёд, через огонь!');
    prompt(pi,'label',()=>headOf(h()),()=>F.stage==='tier1'&&h()!==Po&&h().pos.z>-60.6&&h().pos.y>-2.6&&h().pos.y<-1.6&&hd(h().pos,Po.pos)<3.4,'стой рядом с Потапом');}
  /* ---------- задачи ---------- */
  const OR=(text,done,targets,ghost,read)=>{const o=O(text,done,targets,ghost);o.read=read;return o;};
  const mk=pi=>[
    OR(()=>pi?'Река огня. Йоша '+K(1,'swap')+' — живую воду '+K(1,'skill')+' на лаву: застынет корка.<br>Перейдёшь — корку-мосток друзьям сделай с того бока.':'Река огня. Корку Йоша делает. Ящерки огнём в него плюют — прикрой: рогатка '+K(0,'skill')+' по ящерке.<br>Потом на корку Йоши прыгай — не мешкай ни капельки.',()=>F.stage!=='a'&&F.stage!=='intro',()=>pi?[spot1]:spitters.filter(s=>s.down<=0&&s.cond()).map(s=>s.g),null,'Огонь живой воды боится…'),
    OR(()=>'Бурлящая струя: корка там не встаёт. Йоша в тихой заводи делает, клещи '+K(pi,'item')+' несут да кладут на струю.<br>Стоишь на одной — заднюю вперёд переложи, как по краю.',()=>['c','d','cut1','fall','tier1','dam','down','cut2'].includes(F.stage),()=>[pool],null,'…Йоша творит, а Прошка носит.'),
    OR(()=>'Широкий разлив: корка на струе плотом плывёт. Паровые столбы бьют — Йоша поливает '+K(1,'skill')+', и стихают.<br>Второй герой на плот запрыгнет, коль рядом стоит, — не отстаёт.',()=>['d','cut1','fall','tier1','dam','down','cut2'].includes(F.stage),()=>[vents[1].g],null,'…горячий камень в жерло — столб выше встанет; полил — и стихнет, отстанет.'),
    OR(()=>'Лавопад…',()=>['fall','tier1','dam','down','cut2'].includes(F.stage),()=>[new V3(0,0,-51.5)]),
    OR(()=>pi?'Йоша первым спускается: живая вода '+K(1,'skill')+' — корка на каждой ступени.<br>Внизу — горящий затвор жёлоба: остуди, и друзья спустятся без промедленья.':'Прикрой Йошу: ящерки огнём плюют — рогатка '+K(0,'skill')+' по ящеркам.<br>Потап на краю поймает, коль Йоша оступится, — не бойся нимало.',()=>['tier1','dam','down','cut2'].includes(F.stage),()=>pi?[valve]:spitters.filter(s=>s.down<=0&&s.cond()).map(s=>s.g),null,pi?'…не сиди тут — ступай.':'…кто прикрывает — тот тоже идёт, так и знай.'),
    OR(()=>(pi?'Огненная завеса! Потап через огонь подкинет, кто рядом стоит.':'Огненная завеса! Потап '+K(0,'swap')+' подкинет '+K(0,'skill')+', кто рядом стоит, — через огонь.')+'<br>Потом Йоша с той стороны завесу польёт '+K(1,'skill')+(pi?': на восемь секунд застынет — Потап пройдёт, не сгорит.':': на восемь секунд застынет — Потапа не тронь.'),()=>['dam','down','cut2'].includes(F.stage),()=>[curtain],null,'…один подкидывает, другой гасит — вот и лад.'),
    OR(()=>pi?'Запруда: как Прошка плиту собьёт — у протоки стой, сразу поливай '+K(1,'skill')+':<br>Шесть секунд у тебя — не зевай!':'Запруда: рогаткой '+K(0,'skill')+' щеколду на скале сбей — плита в протоку упадёт.<br>Йоша её сразу остудит — и путь вперёд.',()=>['down','cut2'].includes(F.stage),()=>DAM.state==='up'?[latchMk]:[damG],null,'…вдвоём — и огонь уходит назад.'),
    OR(()=>'Огонь ушёл! Вниз по застывшим ступеням — все вместе!',()=>F.stage==='cut2',()=>[new V3(0,-6,-72)]),
    O('Внизу…',()=>false,()=>[T.yosha.g])];
  for(const pi of[0,1])W.objectives[pi]=mk(pi);
  W.tipZones.push({cond:(pi,h)=>!heroCarry(h)&&hd(h.pos,{x:-5.6,z:-24.2})<2.4&&F.stage!=='fall',text:pi=>'Горячий камень! Клещами '+K(pi,'item')+' возьми — в дыру с паром брось.<br>Столб выше станет — как лифт на скалу, вот и сбылось.'});
  W.tipZones.push({cond:(pi,h)=>{const it=heroCarry(h);return !!it&&it.kind==='korka';},text:pi=>'Несёшь корку. Стоя жми '+K(pi,'item')+' — на лаву пред собой положишь, на бегу — на четыре шага бросишь.<br>На течении она поплывёт — не упросишь.'});
  W.tipZones.push({cond:(pi,h)=>F.stage==='tier1'&&h.pos.z>-60.6&&h.pos.y>-2.6&&h.pos.y<-1.6,text:pi=>'Огненная завеса. Встань рядом с Потапом — через огонь подкинет ('+K(0,'skill')+' у Потапа).<br>Пелагея в полёте прыжок держать может — планирует, как лапа.'});
  W.spawns=[[new V3(-2.6,0,9),new V3(-4.6,0,10)],[new V3(2.6,0,9),new V3(4.6,0,10)]];W.startAct=[0,1];
  W.pauseLine='Река Смородина. Йоша корку живой водой творит — и друзьям с того берега помогает.<br>Прошка рогаткой его прикрывает и корку клещами таскает.<br>Лавопад: Йоша первым спускается, затвор жёлоба гасит; Потап через огненную завесу подкидывает, Йоша её гасит;<br>Запруда — рогаткой по щеколде да живой водой на плиту — вот и сказ весь.';
  W.onStart=()=>{later(0.4,intro);};
  flushDecor();}

