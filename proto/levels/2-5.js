/* ============================== 2-5 «КИТЕЖ ЗВОНИТ» — кульминация мира ============================== */
// колокола на разной глубине: каждый звонит, только когда вода стоит на его отметке · скриптованная ошибка Пелагеи · город растёт под ногами · главный колокол на четверых
function build25(){
  W.zvenAway=true;W.world=2;W.bubbles=true;setTheme('kitezh');W.name='2-5 · «Китеж звонит»';W.sub='Подводный Китеж · колокола на разной глубине';W.camX=9;const F=W.flags;F.voice='wait';F.bells=0;
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.gusli=true;W.fallY=-16;W.wideShield=true;
  kitezhDecor(-100,10,9);
  const stone=M(0xb8b4a4),pave=M(0x9aa094),wallM=M(0xe0d6c0),T=HERO;
  wall(-9.2,-9,-98,8);wall(9,9.2,-98,8);wall(-9.2,9.2,8,8.2);wall(-9.2,9.2,-98.2,-98);
  const Z=makeZven();W.zven=Z;Z.pos.set(0,2.4,2);
  // растущий город: ступени поднимаются из-под мостовой, пока по ним бегут
  function riseStairs(x0,x1,z0,y0,y1,n){const steps=[];const dz=0.42,dy=(y1-y0)/n;for(let i=0;i<n;i++){const zz=z0-dz*i,col=colBox(x0,x1,y0-4,y0,zz-dz,zz,false);const m=addMesh(new THREE.BoxGeometry(x1-x0,1,dz),stone,(x0+x1)/2,y0-0.5,zz-dz/2);
      steps.push({col,m,top:y0+dy*(i+1)});}
    return {steps,risen:false,rise(){if(this.risen)return;this.risen=true;SFX.grow();shakeAll(0.05,1.2);banner('Китеж приподнимается!','#ffd76a',2.2,'бегом вверх — город прямо под ногами растёт');
      steps.forEach((s,i)=>later(i*0.12,()=>anim(1.6,k=>{const y=lerp(y0,s.top,smooth(k));s.col.maxy=y;s.m.position.y=y-0.5;})));}};}
  /* ---------- 0. площадь над Великим колодцем ---------- */
  ground(-9,9,-8,8,0,pave);for(const x of[-7.6,7.6]){addMesh(new THREE.CylinderGeometry(0.4,0.45,4,10),stone,x,2,-6.6);W.cyls.push({x,z:-6.6,r:0.45,miny:-1,maxy:4,on:true});}
  const nut1=nutItem(8.2,0.6,5.2);bell(-3,4);
  /* ---------- 1. Великий колодец: Голосовая звонница на островке ---------- */
  ground(-9,9,-26,-8,-9,M(0x3e5250));
  for(const sd of[-1,1])for(let y=-8;y<0;y+=2.6)for(let z=-10;z>-25;z-=3.4){addMesh(new THREE.BoxGeometry(0.1,1.2,0.8),M(0x24343a),sd*8.95,y+0.9,z);addMesh(new THREE.BoxGeometry(0.12,0.12,1.1),M(0xd8b060),sd*8.94,y+1.6,z);}
  for(let i=0;i<14;i++)seaweed(rand(-8.5,8.5),rand(-25.5,-8.5),rand(1.4,3.4),-9);
  addMesh(new THREE.CylinderGeometry(2.0,2.4,9.3,14),stone,0,-4.35,-17);W.cyls.push({x:0,z:-17,r:2.0,miny:-10,maxy:0.3,on:true});
  {const bm=W.group.children.length;for(const sd of[-1,1])addMesh(new THREE.BoxGeometry(0.3,4.6,0.3),wallM,sd*1.4,2.6,-17);addMesh(new THREE.BoxGeometry(3.4,0.4,0.5),wallM,0,5.0,-17);kdome(0,-17,0.28,5.2);fadeable(since(bm));}
  const vbell=bigBell(0,4.6,-17,0.9,{tongue:false,pitch:0.8});
  const swirl=new THREE.Mesh(new THREE.TorusGeometry(3,0.12,6,40),MB(0xcff8ff,{transparent:true,opacity:0.7}));swirl.rotation.x=Math.PI/2;swirl.position.set(0,0.1,-17);swirl.visible=false;W.group.add(swirl);
  const GW=waterZone(-9,9,-26,-8,-9,0,{start:'high',floor:-9,dur:3.6,shell:{x:-7.6,z:-7.4,y:0},curb:false});
  const linkV=linkItem(-2.8,-8.4,-24.0);linkV.locked=true;linkV.g.visible=false;const nut2=nutItem(-6,-8.4,-23.5);
  const grille=new THREE.Group();W.group.add(grille);for(let x=-8.6;x<9;x+=0.7)addMesh(new THREE.BoxGeometry(0.1,3.6,0.1),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.3}),x,1.2,-26.3,grille);
  addMesh(new THREE.BoxGeometry(18,0.14,0.14),M(COL.gold),0,2.9,-26.3,grille);const grCol=colBox(-9,9,-1,3,-26.5,-26.1);
  /* ---------- 2. нижний ярус: одиночные звонницы — по одной на каждую половину ---------- */
  ground(-9,9,-30,-26,0,pave);ground(-9,9,-50,-44,0,pave);ground(-1,1,-44,-30,0,pave);ground(-9,-1,-44,-30,-3,M(0x4a6660));ground(1,9,-44,-30,-3,M(0x4a6660));
  {const dm=W.group.children.length;box(-1,1,0,5,-48,-28,M(0xd0c8b0));fadeable(since(dm));}
  for(const sd of[-1,1])for(let i=0;i<9;i++){const x0=sd<0?-2.6:1,x1=sd<0?-1:2.6;box(x0,x1,-3,-0.333*(i+1),-30-0.8*(i+1),-30-0.8*i,stone,{occ:false});}
  const L1=waterZone(-9,-1,-44,-30,-3,1.5,{start:'high',floor:-3,shell:{x:-8,z:-29.3,y:0}});
  const R1=waterZone(1,9,-44,-30,-3,1.5,{start:'low',floor:-3,shell:{x:8,z:-29.3,y:0}});
  const frame=(x,z,top)=>{const fm=W.group.children.length;for(const d of[-1.3,1.3])addMesh(new THREE.BoxGeometry(0.25,top+3.2,0.25),wallM,x+d,top/2-1.4,z);addMesh(new THREE.BoxGeometry(3,0.3,0.4),wallM,x,top+0.2,z);fadeable(since(fm));};
  frame(-5.5,-37,0.4);const bL=bigBell(-5.5,0.2,-37,0.7,{pitch:1.3});const mL=markMesh(1);mL.position.set(-5.5,-1.35,-36.4);W.group.add(mL);
  frame(5.5,-37,4.1);const bR=bigBell(5.5,3.9,-37,0.7,{pitch:1.1});
  const linkL=linkItem(-7.6,-2.5,-41.8),linkR=linkItem(7.4,2.35,-41.2);const nut3=nutItem(-3.4,-2.5,-42.4),nut4=floatItem(nutItem(4,-2.6,-42.6),R1,0.4);
  const st1=riseStairs(-2,2,-50,0,3,10);
  /* ---------- 3. средний ярус: двойная звонница — подряд, за 5 секунд ---------- */
  ground(-9,9,-56,-54.2,3,pave);ground(-9,9,-72,-68,3,pave);ground(-1,1,-68,-56,3,pave);ground(-9,-1,-68,-56,0,M(0x4a6660));ground(1,9,-68,-56,0,M(0x4a6660));
  ground(-9,-2,-54.2,-50,3,pave);ground(2,9,-54.2,-50,3,pave);
  {const dm=W.group.children.length;box(-1,1,3,8,-68,-56,M(0xd0c8b0));fadeable(since(dm));}
  for(const sd of[-1,1])for(let i=0;i<9;i++){const x0=sd<0?-2.6:1,x1=sd<0?-1:2.6;box(x0,x1,0,3-0.333*(i+1),-56-0.8*(i+1),-56-0.8*i,stone,{occ:false});}
  const DL=waterZone(-9,-1,-68,-56,0,4.5,{start:'high',floor:0,shell:{x:-8,z:-55.3,y:3}});
  const DR=waterZone(1,9,-68,-56,0,4.5,{start:'low',floor:0,shell:{x:8,z:-55.3,y:3}});
  frame(-5.5,-62,3.4);const dbL=bigBell(-5.5,3.2,-62,0.7,{pitch:1.25});const mD=markMesh(1);mD.position.set(-5.5,1.65,-61.4);W.group.add(mD);
  frame(-(-5.5),-62,8.6);const dbR=bigBell(5.5,8.4,-62,0.7,{pitch:1.5});
  const st2=riseStairs(-2,2,-72,3,6,10);
  bell(-3,-27.6);bell(3,-27.6);bell(-4,-52,3);bell(4,-52,3);
  /* ---------- 4. главный колокол: пузырники и щуки, язык колокола — на четверых ---------- */
  ground(-9,9,-78,-76.2,6,pave);ground(-9,9,-98,-88,6,pave);ground(-9,-6,-88,-78,6,pave);ground(6,9,-88,-78,6,pave);ground(-6,6,-88,-78,3,M(0x4a6660));
  ground(-9,-2,-76.2,-72,6,pave);ground(2,9,-76.2,-72,6,pave);
  for(let i=0;i<9;i++)box(4.6,6,3,6-0.333*(i+1),-78-0.9*(i+1),-78-0.9*i,stone,{occ:false});
  const MZ=waterZone(-6,6,-88,-78,3,6.3,{start:'high',floor:3,shell:{x:-6.6,z:-77.4,y:6}});
  {const fm=W.group.children.length;for(const sd of[-1,1])box(sd*7.4-0.5,sd*7.4+0.5,6,17,-83.5,-82.5,wallM);addMesh(new THREE.BoxGeometry(15.8,0.8,1.2),wallM,0,17.2,-83);kdome(0,-83,0.6,17.6);fadeable(since(fm));}
  const mainBell=bigBell(0,16.4,-83,2.4,{tongue:false,pitch:0.6});
  addMesh(new THREE.CylinderGeometry(0.12,0.12,5.2,6),M(0x4a4a50),0,9.2,-83);const tongue=addMesh(new THREE.CylinderGeometry(2.2,2.0,0.32,18),M(0x5a5a62),0,6.44,-83);
  W.cyls.push({x:0,z:-83,r:2.2,miny:6.25,maxy:6.6,on:true});
  const spots=[0,1,2,3].map(i=>{const a=Math.PI/4+i*Math.PI/2,x=Math.cos(a)*1.25,z=-83+Math.sin(a)*1.25;const rm=MB(0xffffff,{transparent:true,opacity:0.9});const ring=addMesh(new THREE.TorusGeometry(0.42,0.06,8,22),rm,x,6.64,z);ring.rotation.x=Math.PI/2;ring.castShadow=false;return {x,z,ring,rm,hero:null};});
  const link4=linkItem(0,6.9,-93.4),nut5=nutItem(8,6.6,-95);
  bell(0,-75,6);
  const arena={x:0,z:-84,r:9,started:false,cleared:false,hold:0,list:[]};arena.camActive=()=>arena.started&&(!arena.cleared||arena.hold>0);W.camZones.push(arena);
  /* ---------- сюжет ---------- */
  function sinkScene(){F.voice='sinking';const pe=T.pelageya;
    play({dur:14.4,fov:48,camK:3,shots:[shot(0,[4.6,2.6,-11.6],[0,2.2,-17]),shot(3.8,[6,5,-9],[0,0,-17],[6,1,-10],[0,-6,-18],5),shot(9.8,[3.2,1.6,-13.2],[pe.pos.x,0.8,pe.pos.z])],
      says:[[0.3,3.4,null,'<i>Колокол без языка звенит, коль в него крикнуть громко.</i><br><i>Пелагея клюв открыла — и в перья спряталась робко.</i>',true],[3.9,3.4,null,'<i>Вода у звонницы кружится —</i><br><i>И колокол на дно уходит, со звеном ложится.</i>',true],
        [7.5,2.4,null,'<i>Варя почти плачет: «Она не смогла!»</i>',true],[10.1,2.6,'proshka','Да что трудного-то — крикнуть?'],[12.8,1.6,null,'<i>Пелагея молча отворачивается.</i>',true]],
      events:[{t:3.8,fn:()=>{swirl.visible=true;SFX.wave();}},{t:4.2,fn:()=>{const a=vbell.g.position.clone(),b=new V3(-4.6,-8.0,-23.4);anim(5.4,k=>{const q=smooth(k);vbell.g.position.lerpVectors(a,b,q);vbell.g.position.x-=Math.sin(q*Math.PI)*1.6;vbell.g.rotation.z=k*1.4;vbell.g.rotation.y=k*3;});SFX.whoosh();}},
        {t:9.8,fn:()=>{swirl.visible=false;linkV.locked=false;linkV.g.visible=true;}},{t:12.8,fn:()=>{pe.face+=Math.PI;}}],
      tick:(t)=>{swirl.rotation.z+=0.08;},
      end:()=>{F.voice='sunk';swirl.visible=false;vbell.g.position.set(-4.6,-8.1,-23.4);vbell.g.rotation.set(0,0,1.4);linkV.locked=false;linkV.g.visible=true;pe.parts.beak.visible=true;pe.body.scale.set(1,1,1);
        for(const pi of[0,1])tip(pi,'Звено упало на дно. Все в колодец — и отлив '+K(pi,'item')+' сыграй:<br>Вода вас опустит через весь город, так и знай.',4);}});}
  function tryVoice(){F.voice='tried';const pe=T.pelageya;SFX.miss();floatText(pe.pos.clone().add(new V3(0,1.7,0)),'…','#e7c3ff');
    anim(0.5,k=>{pe.parts.beak.rotation.x=0.5+Math.sin(k*Math.PI)*0.6;});later(0.6,()=>{pe.parts.beak.visible=false;anim(0.5,k=>{pe.body.scale.set(1+0.14*k,1-0.16*k,1+0.14*k);});});later(1.6,sinkScene);}
  W.skillHook=(pi,h)=>{if(pi===1&&h.kind==='pelageya'&&F.voice==='ready'){tryVoice();return true;}return false;};
  function giveScene(){F.given='scene';const pr=T.proshka,pe=T.pelageya;
    play({dur:10,fov:46,shots:[shot(0,[0.6,-7.0,-18.6],[-3.4,-8.4,-22.2])],
      says:[[0.3,3,null,'<i>Всю дорогу Пелагея последней летела.</i>',true],[3.4,3.4,null,'<i>На дне Прошка ей молча звено отдаёт —</i><br><i>То, что сам достал из вод.</i>',true],[7.2,2.2,null,'<i>Она берёт — без слов.</i>',true]],
      events:[{t:0,fn:()=>{placeOnGround(pr,-2.4,-22.4,-9);placeOnGround(pe,-4.4,-21.2,-9);pr.face=Math.atan2(pe.pos.x-pr.pos.x,pe.pos.z-pr.pos.z);pe.face=Math.atan2(pr.pos.x-pe.pos.x,pr.pos.z-pe.pos.z)+1.2;}},
        {t:3.4,fn:()=>{const g=new THREE.Group();const m=new THREE.Mesh(new THREE.TorusGeometry(0.22,0.07,10,24),M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.8}));m.scale.set(1,1.45,1);g.add(m);W.group.add(g);
          const a=pr.pos.clone().add(new V3(0,0.9,0)),b=pe.pos.clone().add(new V3(0,0.8,0));anim(2.2,k=>{g.position.lerpVectors(a,b,smooth(k));g.rotation.y+=0.05;if(k>=1)W.group.remove(g);});}},
        {t:5.8,fn:()=>{pe.face=Math.atan2(pr.pos.x-pe.pos.x,pr.pos.z-pe.pos.z);}}],
      end:()=>{F.given=true;grCol.on=false;anim(1.2,k=>{grille.position.y=-4*smooth(k);});SFX.gate();for(const pi of[0,1])tip(pi,'Прилив '+K(pi,'item')+' сделай — подымешься наверх, к звонницам. Решётка открыта!',3.4);}});}
  function bomScene(){F.bom=true;const pe=T.pelageya;
    play({dur:21,fov:48,camK:2.4,shots:[shot(0,[4.8,8.4,-76.6],[0,8.2,-83]),shot(4.2,[1.6,7.4,-80.6],[pe.pos.x,pe.pos.y+0.8,pe.pos.z]),shot(8.6,[0,14,-60],[0,6,-88],[0,26,-48],[0,4,-90],7),shot(16,[-6,8,-70],[0,10,-100])],
      says:[[0.3,3.6,null,'<i>Колокол почти звенит — да голоса не хватает.</i>',true],[4.3,3.4,null,'<i>Пелагея шепчет так тихо, что слышно только на её половине экрана:</i>',true],
        [8.8,3.8,null,'<i>И этого хватает! Китеж из воды выходит весь,</i><br><i>Звонят колокола — благая весть…</i>',true],[13.4,2.6,null,'<i>…а в глубине отзывается рёв.</i>',true],[16.2,3,'zven','Водяной проснулся! Берегись!']],
      events:[{t:0.5,fn:()=>{mainBell.swing=0.8;tone(110,1.4,'sine',0.25);}},{t:6.2,fn:()=>{babble('pelageya','Бом');floatText(pe.pos.clone().add(new V3(0,1.6,0)),'Бом.','#e7c3ff');}},
        {t:7.4,fn:()=>{mainBell.ring();SFX.ok();for(const b of[vbell,bL,bR,dbL,dbR])later(rand(0.2,2.2),()=>b.ring());}},
        {t:8.6,fn:()=>{for(const z of W.waters)setWater(z,'low');const c0=new THREE.Color(0x0e4654),c1=new THREE.Color(0x9ad8f0);anim(7,k=>{scene.background.copy(c0).lerp(c1,k);scene.fog.color.copy(scene.background);});
          for(let i=0;i<8;i++)later(i*0.6,()=>{const b=[mainBell,vbell,bL,bR,dbL,dbR][i%6];b.ring();});}},
        {t:13.4,fn:()=>{tone(60,2.4,'sawtooth',0.2,40);tone(80,2.0,'sawtooth',0.14,50,0.3);shakeAll(0.08,1.6);}}],
      end:()=>{F.out=true;later(0.4,finishLevel);}});}
  W.updates.push(dt=>{
    // Голосовая звонница: Пелагея на островке — над ней загорается нотка, но звука нет (скриптованная ошибка)
    const pe=T.pelageya;if(F.voice==='wait'&&hd(pe.pos,{x:0,z:-17})<2.1&&pe.pos.y>-0.6&&!G.cine){F.voice='ready';F.vt=0;SFX.bell();floatText(pe.pos.clone().add(new V3(0,1.8,0)),'♪','#e7c3ff');}
    if(F.voice==='ready'){F.vt+=dt;if(F.vt>7&&pe.active)tryVoice();}
    if(F.voice==='sunk'&&!F.given&&linkV.taken)giveScene();
    // одиночные звонницы → ступени к среднему ярусу; двойная → к верхнему
    if(F.b1&&F.b2&&!st1.risen)st1.rise();
    if(F.dbl&&G.time-F.dbl.t>5&&!(F.dbL&&F.dbR)){F.dbl=null;F.dbL=F.dbR=false;SFX.miss();banner('Колокола замолкли','#ffd0d0',1.6,'два колокола подряд — за пять секунд успейте');}
    if(F.dbL&&F.dbR&&!F.b3){F.b3=true;SFX.ok();banner('Два колокола вместе поют!','#ffd76a',2);later(1.6,()=>st2.rise());}
    mL.visible=!F.b1&&L1.level<L1.floor+0.4;mD.visible=!F.dbL&&DL.level<DL.floor+0.4;
    // главный колокол: стычка
    if(!arena.started&&[0,1].some(pi=>active(pi).pos.z<-75.5&&active(pi).pos.y>5)){arena.started=true;SFX.gate();
      arena.list=[puzyr(-7.2,-80.5,{y:6,leash:4}),puzyr(7.2,-80.5,{y:6,leash:4}),puzyr(-7,-92,{y:6,leash:4}),puzyr(7,-92,{y:6,leash:4}),pike(-3.4,-80.5,MZ,3),pike(3.4,-86,MZ,3),tyagunFoe(-2.2,-85.6,MZ,{leash:5})];
      banner('Пузырники, щуки да тягун!','#9fd0ff',2.4,'Потап щитом закрывает, Пелагея отбивает, Прошка надутых сбивает, Йоша сытых гасит');}
    if(arena.started&&!arena.cleared&&arena.list.every(e=>!e.alive)){arena.cleared=true;arena.hold=1.6;SFX.ok();banner('Отбились!','#ffffff',1.6,'а теперь — колокол главный');}
    if(arena.cleared)arena.hold-=dt;
    // язык колокола: все четверо — и на «ТРИ» прыжок вместе, качаем колокол весом
    const used=new Set();for(const s of spots){s.hero=null;for(const h of HEROES){if(used.has(h)||h.cling)continue;if(hd(h.pos,s)<0.8&&h.pos.y>6.3&&h.pos.y<9.5){s.hero=h;used.add(h);break;}}s.rm.color.setHex(s.hero?PCOL[s.hero.player]:0xffffff);s.ring.scale.setScalar(s.hero?1.2:1);}
    const all=arena.cleared&&!F.bom&&!F.bomWait&&spots.every(s=>s.hero);const C=F.cnt||(F.cnt={t:0,beat:-1,sw:0,p:[null,null]});
    if(all){C.t+=dt;const b=Math.floor(C.t);if(b!==C.beat&&b<3){C.beat=b;SFX.beat(b);banner(['РАЗ','ДВА','ТРИ!'][b],b===2?'#ffc93c':'#ffffff',0.8,b===2?'прыгайте вместе — раскачаем!':'');}
      if(C.t>=1.8)for(const pi of[0,1])if(tap(pi,'jump')&&C.p[pi]===null){C.p[pi]=C.t;if(G.solo)C.p[1-pi]=C.t;}
      if(C.p[0]!==null&&C.p[1]!==null){C.sw++;mainBell.swing=Math.min(1.6,0.5*C.sw);tone(90+C.sw*14,1,'sine',0.3);shakeAll(0.04,0.4);floatText(new V3(0,9,-83),['Качнулся!','Сильнее!','Почти звонит…'][Math.min(2,C.sw-1)],'#ffd76a');
        C.t=-0.4;C.beat=-1;C.p=[null,null];if(C.sw>=3){F.bomWait=true;later(0.8,bomScene);}}
      else if(C.t>2+rztWindow()){C.t=-0.6;C.beat=-1;C.p=[null,null];SFX.miss();banner('Не вместе — ещё разок, дружней!','#ffd0d0',1);}}
    else{C.t=0;C.beat=-1;C.p=[null,null];}
    tongue.rotation.z=Math.sin(G.time*1.4)*0.02*(1+C.sw);});
  // колокола: низкий — рогатка в отлив; высокий — удар с воды в прилив
  W.marks.push({pos:new V3(-5.5,-1.35,-36.4),active:()=>!F.b1&&L1.level<L1.floor+0.4,onHit:()=>{F.b1=true;bL.ring();banner('Бам!','#ffd76a',1.2,'низкая звонница звенит');}});
  W.marks.push({pos:new V3(-5.5,1.65,-61.4),active:()=>!F.dbL&&!F.b3&&DL.level<DL.floor+0.4,onHit:()=>{F.dbL=true;dbL.ring();if(!F.dbl)F.dbl={t:G.time};floatText(new V3(-5.5,4,-62),F.dbR?'Вместе!':'Второй — скорей!','#ffd76a');}});
  W.hittables.push({pos:new V3(5.5,0,-37),r:1.6,push:false,alive:()=>!F.b2,onHit:h=>{if(!(R1.level>R1.high-0.3&&h.pos.y>1.1)){if(!F.b2tip){F.b2tip=true;tip(1,'Колокол высоко. Прилив '+K(1,'item')+' сделай, доплыви — и ударь!',2.6);}return;}F.b2=true;bR.ring();banner('Бом!','#ffd76a',1.2,'звонница на приливе звенит');}});
  W.hittables.push({pos:new V3(5.5,0,-62),r:1.6,push:false,alive:()=>!F.dbR&&!F.b3,onHit:h=>{if(!(DR.level>DR.high-0.3&&h.pos.y>4.1))return;F.dbR=true;dbR.ring();if(!F.dbl)F.dbl={t:G.time};floatText(new V3(5.5,9,-62),F.dbL?'Вместе!':'Второй — скорей!','#ffd76a');}});
  /* ---------- рисунки кнопок ---------- */
  prompt(1,'skill',()=>headOf(T.pelageya),()=>F.voice==='ready'&&T.pelageya.active,'крикни!');
  prompt(1,'swap',()=>headOf(T.pelageya),()=>(F.voice==='wait'||F.voice==='ready')&&T.yosha.active&&T.yosha.pos.z<-7,'Пелагея');
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>F.voice==='sunk'&&!linkV.taken&&inZone(GW,h(),0.3)&&GW.state==='high'&&h().pos.y>-1,'отлив — на дно');
    prompt(pi,'item',()=>headOf(h()),()=>F.given===true&&inZone(GW,h(),0.3)&&GW.state==='low'&&h().pos.y<-7,'прилив — наверх');
    prompt(pi,'item',()=>headOf(h()),()=>F.b3&&!F.bom&&arena.cleared&&inZone(MZ,h(),1)&&MZ.state==='low','прилив');
    prompt(pi,'item',()=>headOf(h()),()=>arena.started&&!arena.cleared&&inZone(MZ,h(),1)&&W.enemies.some(e=>e.alive&&e.kind==='tyagun'&&(MZ.state==='high'?!e.up:e.silt)),'тягун: отлив');
    prompt(pi,'jump',()=>headOf(h()),()=>spots.every(s=>s.hero)&&arena.cleared&&!F.bom&&F.cnt&&F.cnt.t>1.6,'вместе!');
    prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.help));
    prompt(pi,'attack',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&hd(e.pos,h().pos)<5&&(e.state==='broken'||(e.state==='stagger'&&!e.openHit)||e.flop)),'');}
  prompt(0,'item',()=>headOf(active(0)),()=>!F.b1&&inZone(L1,active(0),1)&&L1.state==='high','отлив');
  prompt(0,'skill',()=>headOf(T.proshka),()=>T.proshka.active&&((!F.b1&&L1.level<L1.floor+0.4&&hd(T.proshka.pos,{x:-5.5,z:-37})<10)||(!F.dbL&&DL.level<DL.floor+0.4&&hd(T.proshka.pos,{x:-5.5,z:-62})<10)),'рогатка');
  prompt(0,'item',()=>headOf(active(0)),()=>!F.b3&&F.b1&&inZone(DL,active(0),1)&&DL.state==='high','отлив');
  prompt(1,'item',()=>headOf(active(1)),()=>!F.b2&&inZone(R1,active(1),1)&&R1.state==='low','прилив');
  prompt(1,'item',()=>headOf(active(1)),()=>!F.b3&&F.b2&&inZone(DR,active(1),1)&&DR.state==='low','прилив');
  prompt(1,'attack',()=>headOf(active(1)),()=>(!F.b2&&R1.level>R1.high-0.3&&hd(active(1).pos,{x:5.5,z:-37})<2.4&&active(1).pos.y>1.1)||(!F.dbR&&!F.b3&&DR.level>DR.high-0.3&&hd(active(1).pos,{x:5.5,z:-62})<2.4&&active(1).pos.y>4.1),'ударь колокол');
  prompt(0,'skill',()=>headOf(T.proshka),()=>T.proshka.active&&W.enemies.some(e=>e.alive&&e.inf>0.2&&hd(e.pos,T.proshka.pos)<12),'сбей надутого');
  prompt(0,'guard',()=>headOf(T.potap),()=>T.potap.active&&W.bolts.some(b=>!b.refl&&b.tgt!==T.potap&&hd(b.p,T.potap.pos)<5),'широкий щит');
  /* ---------- задачи ---------- */
  const o1=pi=>O(pi?()=>'Китеж подняться хочет, да колокола молчат. Первый — на островке.<br>Язычка у него нет: крикни — и зазвенит. Пелагея ближе всех, налегке.':'Китеж подняться хочет, да колокола молчат.<br>Первый колокол — на островке посреди колодца, говорят.',
    ()=>F.voice==='sunk'||F.voice==='sinking'||!!F.given,()=>[vbell.g]);
  const o2=pi=>O(()=>'Звено упало на дно. Все в колодец — и отлив '+K(pi,'item')+' сыграй:<br>Вода вас опустит через весь город, так и знай.',()=>!!F.given,()=>[linkV.g]);
  const o3=pi=>O(()=>'Прилив '+K(pi,'item')+' сделай — и наверх, к звонницам!',()=>active(pi).pos.z<-30,()=>[GW.shell.g]);
  const o4=[O(()=>'Низкая звонница. Отлив '+K(0,'item')+' сделай — язычок повиснет в пустоте.<br>Из рогатки '+K(0,'skill')+' в него стрельни — зазвенит в высоте.',()=>!!F.b1,()=>[mL,L1.shell.g]),
    O(()=>'Звонница на воде. Прилив '+K(1,'item')+' сделай, доплыви —<br>И крылом '+K(1,'attack')+' по колоколу ударь, не щади!',()=>!!F.b2,()=>[bR.g,R1.shell.g])];
  const o5=pi=>O('Колокола звонят — Китеж растёт! Бегом вверх по ступеням!',()=>active(pi).pos.z<-55&&active(pi).pos.y>2.5,()=>st1.steps.map(s=>s.m));
  const o6=pi=>O(pi?()=>'Двойная звонница. Твой колокол — верхний: прилив '+K(1,'item')+' и удар '+K(1,'attack')+'. У друга — нижний.<br>Звоните подряд — за пять секунд успейте, не мешкайте лишне!':()=>'Двойная звонница. Твой колокол — нижний: отлив '+K(0,'item')+' и рогатка '+K(0,'skill')+'. У друга — верхний.<br>Звоните подряд — за пять секунд успейте, как на праздник первый!',
    ()=>!!F.b3,()=>pi?[dbR.g]:[mD]);
  const o7=pi=>O('Выше — к главному колоколу, выше!',()=>active(pi).pos.z<-76&&active(pi).pos.y>5,()=>st2.steps.map(s=>s.m));
  const o8=pi=>O(pi?()=>'Пузырники и щуки! Пелагея пузыри отбивает '+K(1,'guard')+', Йоша сытых живой водой '+K(1,'skill')+' гасит.<br>Тягуна под водой не достать — отлив '+K(1,'item')+' сделай, и на мели он погаснет.':()=>'Пузырники и щуки! Потап щитом '+K(0,'guard')+' закрывает всех за спиной, Прошка из рогатки '+K(0,'skill')+' надутых сбивает.<br>Тягуна под водой не достать — отлив '+K(0,'item')+' сделай, на мели он и застревает.',()=>arena.cleared,()=>arena.list.filter(e=>e.alive).map(e=>e.g));
  const o9=pi=>O(()=>'Главный колокол качают вчетвером. Прилив '+K(pi,'item')+' сделай.<br>Все четверо — на язык колокола (сменяй '+K(pi,'swap')+', кличь '+K(pi,'call')+'), на «ТРИ» — прыгайте '+K(pi,'jump')+' смело!',()=>!!F.bom,()=>[tongue]);
  for(const pi of[0,1])W.objectives[pi]=[o1(pi),o2(pi),o3(pi),o4[pi],o5(pi),o6(pi),o7(pi),o8(pi),o9(pi),O('Китеж звонит…',()=>false,()=>[])];
  W.tipZones.push({cond:(pi,h)=>arena.started&&!arena.cleared&&W.enemies.some(e=>e.alive&&e.kind==='tyagun'&&!e.up&&hd(e.pos,h.pos)<9),text:pi=>W.enemies.some(e=>e.alive&&e.kind==='tyagun'&&e.silt)?'Тягун в ил зарылся. Прилив '+K(pi,'item')+' сделай, а потом отлив опять — вылезет, не утаится.':'Тягун в воде таится. На гуслях сыграй '+K(pi,'item')+' — отлив на мель его вытащит.<br>Бей сбоку — пусть поплатится!'},
    {cond:(pi,h)=>h.grounded&&h.groundRef&&h.groundRef.water,text:pi=>'Ты плывёшь. Волна на столбе кажет, какая вода колоколу нужна:<br>Внизу — отлив, вверху — прилив. Гусли '+K(pi,'item')+' — и вся недолга.'},
    {pi:1,cond:(pi,h)=>F.voice==='ready'&&h.kind==='pelageya',text:pi=>'Над Пелагеей нотка зажглась…'});
  W.spawns=[[new V3(-3,0,5),new V3(-5,0,6)],[new V3(3,0,5),new V3(5,0,6)]];W.startAct=[0,0];
  W.pauseLine='Китеж звонит: колокол звенит, лишь когда вода на отметке его стоит.<br>С каждой звонницей город подымается ввысь.<br>А главный колокол — на четверых, держись!';
  W.onStart=()=>{later(0.8,()=>say('zven','Колокола молчат. Разбудим Китеж! Дзинь-дзинь!',2.8,true));};
  flushDecor();}

