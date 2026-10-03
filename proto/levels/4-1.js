/* ============================== МИР 4 · ОГНЕННАЯ СМОРОДИНА · 4-1 «КУЗНЯ КУЗЬМЫ И ДЕМЬЯНА» ============================== */
// ввод клещей · мир без Звенышка: подсказки читает Пелагея · ковка по станциям 1-2-3-4: мехи Пелагеи → удары Прошки → клещи сами летят в корыто → закалка Йоши → стойка
// горячее открывает двери: слиток на холодную плиту, уголь в печь подъёмника, гвоздь в щель ворот · чугунные болваны: полить, сорвать латы, бить
function ironGate(minx,maxx,z,h){const g=new THREE.Group();g.position.set((minx+maxx)/2,0,z);W.group.add(g);const im=M(0x3a3a44);const w=maxx-minx;
  for(let i=0;i<=Math.round(w/0.5);i++)addMesh(new THREE.BoxGeometry(0.09,h,0.09),im,-w/2+i*0.5,h/2,0,g);for(const y of[0.3,h/2,h-0.3])addMesh(new THREE.BoxGeometry(w,0.1,0.12),im,0,y,0,g);
  const col=colBox(minx,maxx,0,h,z-0.15,z+0.15,true);const G2={g,col,open:false,h,openIt(){if(G2.open)return;G2.open=true;col.on=false;SFX.gate();anim(1.2,k=>{g.position.y=-h*smooth(k)*0.98;});}};return G2;}
function build41(){
  W.zvenAway=true;W.world=4;setTheme('forgein');W.name='4-1 · «Кузня Кузьмы и Демьяна»';W.sub='Огненная Смородина · клещи: взять горячее';W.camX=11;const F=W.flags;F.stage='walk';
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.kleshi=false;W.fallY=-8;W.kleshiLocked='Клещей пока нет — их на наковальне куют.';const T=HERO;
  const stone=M(0x5a4a44),floorM=M(0x4a3a34),wallM=M(0x6a5248),wood=M(0x6a4428);
  // в кузне тесно: любая стена или каменная глыба между камерой и героем становится полупрозрачной
  W.autoFade=o=>o.material===wallM||o.material===stone;
  /* ---------- А. берег огненной реки у входа ---------- */
  ground(-11,11,-6,10,0,M(0x5a4a40));lavaZone(11,40,-70,20,-1.2);lavaZone(-40,-11,-70,20,-1.2);for(let z=16;z>-66;z-=rand(3,5))for(const s of[-1,1])addMesh(new THREE.DodecahedronGeometry(rand(0.8,1.6)),M(0x3a2e2a),s*rand(12,16),-0.6,z);
  wall(-11.2,-11,-66,10);wall(11,11.2,-66,10);wall(-11.2,11.2,10,10.2);const n1=nutItem(9.4,0.6,6.4);
  const Z=makeVestZ(helperOf(3));W.zven=Z;Z.pos.set(0,2.4,4);bell(-3.5,6);
  /* ---------- Б. кузня: горн, мехи, наковальня, корыто, стойка для клещей, каменные кузнецы ---------- */
  const km=W.group.children.length;ground(-11,11,-60,-6,0,floorM);
  box(-11,-3,0,6,-6.4,-6,wallM);box(3,11,0,6,-6.4,-6,wallM);box(-3,3,4.2,6,-6.4,-6,wallM,{solid:false});fadeable(since(km));
  const forge=makeForge(-5.2,-15.6,0);colBox(-6.3,-4.1,0,1.1,-16.4,-14.8,true);forgeZone(-5.2,1.1,-15.6,1.3);
  const anvil=makeAnvil(0,-14,0,1.2);const blank=addMesh(new THREE.BoxGeometry(0.55,0.08,0.18),M(0xff8a3a,{emissive:0xff5010,emissiveIntensity:0.9}),0,1.3,-14);
  const trough=makeTrough(4.6,-14.2,0);const lever=new V3(-7.1,0,-13.8);{const pl=addMesh(new THREE.CylinderGeometry(0.7,0.75,0.12,16),M(0x8a5a32),lever.x,0.06,lever.z);pl.receiveShadow=true;const ic=pawIcon();ic.position.set(lever.x,2.1,lever.z);W.group.add(ic);}
  const kz=makeSmith('kuzma',true),dm=makeSmith('demyan',true);kz.g.position.set(-8.2,0,-54.5);kz.g.rotation.y=0.5;dm.g.position.set(8.2,0,-54.5);dm.g.rotation.y=-0.5;
  for(const[x,z]of[[-8.2,-54.5],[8.2,-54.5]])W.cyls.push({x,z,r:0.7,miny:-1,maxy:2.6,on:true});
  {const lb=new THREE.Mesh(new THREE.PlaneGeometry(3.2,1.6),new THREE.MeshLambertMaterial({map:lubokTex()}));lb.position.set(-10.9,2.6,-19);lb.rotation.y=Math.PI/2;W.group.add(lb);}
  for(let i=0;i<6;i++){const t=addMesh(new THREE.BoxGeometry(0.08,0.9,0.3),M(0x55555e),10.9,1.8+(i%2)*0.3,-10-i*1.6);t.rotation.z=0.3;}
  const hl=new THREE.PointLight(0xff8040,0.9,18,2);hl.position.set(0,5,-15);W.group.add(hl);
  const L1=linkItem(0,1.8,-14);L1.locked=true;L1.g.visible=false;const n2=nutItem(-9.6,0.6,-8);
  // вывески станций «что за чем»: 1 мехи → 2 наковальня → 3 корыто → 4 стойка
  const signBoard=(x,z,txt,col,ry)=>{const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=ry||0;W.group.add(g);addMesh(new THREE.CylinderGeometry(0.06,0.07,2.2,6),wood,0,1.1,0,g);
    const b=new THREE.Mesh(new THREE.PlaneGeometry(1.9,0.62),new THREE.MeshBasicMaterial({map:scratchTex(txt,420,136,'#fff4dc',col)}));b.position.set(0,2.2,0.05);g.add(b);return g;};
  signBoard(-8.8,-12.3,'1 · МЕХИ','#8a3a1a',0.5);signBoard(-1.9,-11.9,'2 · КУЁМ','#6a4a1a',0);signBoard(6.3,-12.2,'3 · ЗАКАЛКА','#1a4a6a',-0.4);signBoard(9.0,-15.0,'4 · ГОТОВО','#3a5a2a',-0.9);
  // стрелки на полу: мехи → горн → наковальня → корыто → стойка
  const arrowGeo=(()=>{const s=new THREE.Shape();s.moveTo(-0.22,-0.2);s.lineTo(0.26,0);s.lineTo(-0.22,0.2);s.lineTo(-0.1,0);s.lineTo(-0.22,-0.2);return new THREE.ShapeGeometry(s);})();
  const ARW=[[[-6.6,-14.4],[-5.8,-15.0]],[[-3.8,-15.1],[-0.9,-14.3]],[[1.1,-14.1],[3.5,-14.2]],[[5.7,-14.6],[7.6,-16.2]]].map((seg,si)=>{const out=[];const[a,b]=seg,n=si===1||si===2?3:2;
    for(let i=0;i<n;i++){const u=(i+0.5)/n,x=lerp(a[0],b[0],u),z=lerp(a[1],b[1],u);const m=new THREE.Mesh(arrowGeo,MB(0xffc860,{transparent:true,opacity:0.5,depthWrite:false}));m.rotation.x=-Math.PI/2;m.rotation.z=Math.atan2(-(b[1]-a[1]),b[0]-a[0]);m.position.set(x,0.05,z);m.renderOrder=2;W.group.add(m);out.push(m);}return out;});
  // стойка для готовых клещей: четыре крючка с тенями-силуэтами
  const rack=new THREE.Group();rack.position.set(8.2,0,-16.9);rack.rotation.y=-0.9;W.group.add(rack);for(const s of[-1,1])addMesh(new THREE.BoxGeometry(0.14,2.2,0.14),wood,s*1.1,1.1,0,rack);addMesh(new THREE.BoxGeometry(2.5,0.14,0.16),wood,0,2.0,0,rack);
  const rackSlots=[0,1,2,3].map(i=>{const g=new THREE.Group();g.position.set(-0.78+i*0.52,1.45,0.1);g.rotation.z=Math.PI/2;g.rotation.y=Math.PI/2;rack.add(g);const L=hotLook('kleshi',g);L.m.color.setHex(0x2a2a30);L.m.emissiveIntensity=0;L.m.transparent=true;L.m.opacity=0.35;return {g,m:L.m,on:false};});
  W.cyls.push({x:8.2,z:-16.9,r:1.0,miny:-1,maxy:2.2,on:true});
  // счётчик над стойкой: крупно — сколько клещей уже висит на стойке, мельче — сколько выковано и сколько ждёт в корыте
  const cntC=document.createElement('canvas');cntC.width=512;cntC.height=224;const cntT=new THREE.CanvasTexture(cntC);
  const cntM=new THREE.Mesh(new THREE.PlaneGeometry(3.0,1.32),new THREE.MeshBasicMaterial({map:cntT,transparent:true,depthWrite:false}));cntM.position.set(7.3,3.25,-15.9);cntM.renderOrder=7;W.group.add(cntM);let cntKey='';
  function cntDraw(){const all=FG.onRack>=FG.total,key=FG.onRack+'|'+FG.made+'|'+FG.done+'|'+(F.flew?1:0);if(key===cntKey)return;cntKey=key;const x=cntC.getContext('2d');x.clearRect(0,0,512,224);
    x.fillStyle='rgba(42,24,14,0.92)';x.fillRect(8,8,496,208);x.lineWidth=8;x.strokeStyle=all?'#ffd76a':'#b07838';x.strokeRect(8,8,496,208);
    x.textAlign='center';x.textBaseline='middle';x.fillStyle='#f4e2c0';x.font='bold 38px Georgia, serif';x.fillText('КЛЕЩИ НА СТОЙКЕ ЖДУТ',256,48);
    x.font='bold 100px Georgia, serif';x.fillStyle=all?'#ffd76a':'#ffffff';x.fillText(FG.onRack+' / '+FG.total,256,122);
    x.font='bold 30px Georgia, serif';x.fillStyle='#e8c89a';x.fillText(F.flew?'у каждого — клещи свои!':all?'все четыре — к героям летят!':'выковано: '+FG.made+' из '+FG.total+(FG.made>FG.done?' · в корыте: '+(FG.made-FG.done):''),256,186);cntT.needsUpdate=true;}
  // шкала жара над горном и счётчик ударов над наковальней
  const bar=(x,y,z,col)=>{const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);const bg=new THREE.Mesh(new THREE.PlaneGeometry(1.7,0.24),MB(0x1a1010,{transparent:true,opacity:0.75,depthWrite:false}));g.add(bg);
    const fl=new THREE.Mesh(new THREE.PlaneGeometry(1.6,0.16),MB(col,{depthWrite:false}));fl.position.z=0.01;g.add(fl);bg.renderOrder=5;fl.renderOrder=6;return {g,fl};};
  const heatBar=bar(-5.2,3.9,-15.6,0xff7a20);
  const pips=[];{const g=new THREE.Group();g.position.set(0,2.5,-14);W.group.add(g);for(let i=0;i<7;i++){const m=addMesh(new THREE.SphereGeometry(0.1,10,8),M(0x3a3028,{emissive:0xffc040,emissiveIntensity:0}),-0.6+i*0.2,0,0,g);pips.push(m);}}
  const stepRing=new THREE.Mesh(new THREE.TorusGeometry(1.25,0.07,6,32),MB(COL.gold,{transparent:true,opacity:0.85}));stepRing.rotation.x=Math.PI/2;stepRing.position.y=0.07;W.group.add(stepRing);stepRing.visible=false;
  /* ---------- В. двери жаром: слиток на холодную плиту, уголь в печь подъёмника, гвоздь в щель ворот ---------- */
  box(-11,-1.6,0,6,-26.2,-25.8,wallM);box(1.6,11,0,6,-26.2,-25.8,wallM);const gate1=ironGate(-1.6,1.6,-26,3.2);
  const slitok=hotItem('slitok',-6.0,1.12,-15.1,{name:'slitok'});const ugol=hotItem('ugol',-5.2,1.12,-15.4,{name:'ugol'});
  {const pl=addMesh(new THREE.BoxGeometry(1.2,0.1,1.2),M(0x6a7a8a),3,0.05,-24.6);pl.receiveShadow=true;const fi=new THREE.Mesh(new THREE.ConeGeometry(0.18,0.4,6),M(0xff6a20,{emissive:0xff3000,emissiveIntensity:0.9}));fi.position.set(3,1.6,-24.6);W.group.add(fi);
    edgeSignFire(3,-24.6);}
  hotSocket(3,0.12,-24.6,{r:1.2,keep:true,accept:it=>it.kind==='slitok',onPut:()=>{gate1.openIt();banner('Ворота открылись!','#ffb070',2,'горячий слиток — на холодной плите');F.g1=true;}});
  // подъёмник на галерею: уголь в печь — едет
  ground(-11,11,-60,-26.2,0,floorM);box(7.4,11,0,4.4,-40,-26.4,stone,{occ:false});
  const liftCol=colBox(5,7.3,0,0.3,-34.4,-31.6,false);const liftM=addMesh(new THREE.BoxGeometry(2.3,0.3,2.8),M(0x6a4a2a),6.15,0.15,-33);const liftF=addMesh(new THREE.BoxGeometry(0.9,0.9,0.9),M(0x3a3a40),4.2,0.45,-29.8);
  const liftFire=M(0x3a2a20,{emissive:0xff4000,emissiveIntensity:0});addMesh(new THREE.BoxGeometry(0.5,0.3,0.05),liftFire,4.2,0.5,-29.33);
  const LIFT={y:0,up:0};hotSocket(4.2,0.9,-29.8,{r:1.2,accept:it=>it.kind==='ugol',onPut:(it)=>{consumeHot(it);LIFT.up=20;SFX.whoosh();floatText(new V3(4.2,1.8,-29.8),'Печь горит — на подъёмник, вверх!','#ffb070');}});
  const L2=linkItem(9.4,5.5,-37.6),n3=nutItem(9.6,5,-28);
  // ворота в дальний цех: горячий гвоздь в щель — засов плавится
  box(-11,-1.6,0,6,-42.2,-41.8,wallM);box(1.6,11,0,6,-42.2,-41.8,wallM);const gate2=ironGate(-1.6,1.6,-42,3.2);
  const gvozd=hotItem('gvozd',-4.4,1.12,-15.1,{name:'gvozd'});const slot=addMesh(new THREE.BoxGeometry(0.4,0.6,0.3),M(0x2a2a30),2.3,1.2,-41.7);
  hotSocket(2.3,1.0,-41.4,{r:1.1,accept:it=>it.kind==='gvozd',onPut:(it)=>{consumeHot(it);gate2.openIt();F.g2=true;burst(new V3(2.3,1.2,-41.6),0xff8a3a,16,3);banner('Засов расплавился!','#ffb070',2,'дальний цех открыт — ступайте');}});
  bell(-3.5,-30);
  /* ---------- Г. дальний цех: чугунные болваны в раскалённых латах ---------- */
  W.linkTotal++;   // четвёртое отдаст Демьян
  const L3=linkItem(-9.4,1.1,-58),n4=nutItem(9.6,0.6,-58.6),n5=nutItem(-9.6,0.6,-44);bell(0,-44.5);
  const master=makeForge(0,-58.4,0,{});colBox(-1.1,1.1,0,1.1,-59.2,-57.6,true);master.coalM.emissiveIntensity=0.05;master.fire.intensity=0;
  hotSocket(0,1.15,-57.4,{r:1.3,active:()=>F.cleared&&!F.lit,accept:it=>it.kind==='ugol'||it.kind==='slitok',onPut:(it)=>{consumeHot(it);F.lit=true;anim(1.4,k=>{master.coalM.emissiveIntensity=k*1.2;master.fire.intensity=k*1.6;});later(1.4,startRuki);}});
  let arena=null;function spawnGolems(){F.fight=true;arena=[bolvanFoe(-4,-50),bolvanFoe(4,-51),bolvanFoe(0,-55)];banner('Чугунные болваны!','#ff9a60',2.4,'латы горячи: Йоша поливает — латы темнеют, клещами нагрудник сорви — и бей');
    later(1.4,()=>sayP('По горячим латам не бей.<br>Полей — и сними, как крышку с кастрюли, скорей.',3.6));}
  // тесный дальний цех: пока бьёмся с болванами и куём в четыре руки — камера выше и дальше, видно весь цех (стена у ворот — полупрозрачная)
  W.camZones.push({x:0,y:0,z:-52,r:8,camActive:()=>!G.cine&&(G.solo?[active(G.soloPi)]:[active(0),active(1)]).every(h=>h.pos.z<-43.5)&&((F.fight&&!F.cleared)||F.stage==='carry'||F.stage==='r4'||F.stage==='quench')});
  W.onArmorOff=(e,h)=>{if(!F.armorTold){F.armorTold=true;later(0.4,()=>bark(h,h.kind,h.kind==='proshka'?'Как крышку с кастрюли — хвать!':'Долой, долой!',1.8));}};
  /* ---------- ковка клещей: 1 мехи (Пелагея) → 2 удары в такт (Прошка) → 3 закалка (Йоша) → 4 на стойку ---------- */
  const FG={t:0,k:-1,heat:0.5,prog:0,made:0,queue:0,done:0,onRack:0,B:0.75,need:7,total:4,waitT:0,autoT:0,nagT:0};W.FG=FG;cntDraw();
  const TROUGH=new V3(4.6,0,-14.2);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(1,0.05,6,32),MB(COL.yellow,{transparent:true,opacity:0.9}));ring.rotation.x=Math.PI/2;ring.visible=false;W.group.add(ring);
  // готовые клещи: сначала летят с наковальни в корыто и шипят там, после закалки — на стойку
  const inTrough=[];for(let i=0;i<4;i++){const g=new THREE.Group();const L=hotLook('kleshi',g);g.visible=false;W.group.add(g);inTrough.push({g,m:L.m});}
  function flyToTrough(i){const q=inTrough[i];q.g.visible=true;q.m.color.setHex(0xff7a20);q.m.emissiveIntensity=1;const from=new V3(0,1.35,-14),to=new V3(4.2+(i%3)*0.35,0.66,-14.2+(i%2?0.12:-0.12));
    SFX.swish();anim(0.8,k=>{q.g.position.lerpVectors(from,to,k);q.g.position.y+=Math.sin(k*Math.PI)*1.6;q.g.rotation.y+=0.3;if(k>=1){SFX.water();burst(to.clone().add(new V3(0,0.3,0)),0xe8f4ff,8,2);floatText(to.clone().add(new V3(0,0.9,0)),'В корыто!','#ffd9a0');}});}
  function temper(auto){if(FG.queue<=0)return;const i=FG.done;FG.queue--;FG.done++;SFX.water();burst(new V3(4.6,1,-14.2),0xe8f4ff,22,4);for(let k=0;k<6;k++)later(k*0.12,()=>burst(new V3(4.6+rand(-0.5,0.5),0.9,-14.2),0xffffff,3,2,1.4));
    floatText(new V3(4.6,1.9,-14.2),(auto?'Йоша сам полил! ':'Пш-ш-ш! ')+'Клещей '+FG.done+' / '+FG.total,'#cfe8ff');const q=inTrough[i],sl=rackSlots[i];q.m.color.setHex(0x3e3c44);q.m.emissiveIntensity=0;
    const from=q.g.position.clone(),to=new V3();sl.g.getWorldPosition(to);anim(0.9,k=>{q.g.position.lerpVectors(from,to,smooth(k));q.g.position.y+=Math.sin(k*Math.PI)*1.2;if(k>=1){q.g.visible=false;sl.on=true;sl.m.color.setHex(0x55555e);sl.m.opacity=1;sl.m.transparent=false;SFX.plate();FG.onRack++;floatText(to.clone().add(new V3(0,0.8,0)),'На стойку! '+FG.onRack+' / '+FG.total,'#d8f0c0');}});FG.waitT=0;FG.autoT=0;}
  W.waterTargets.push({pos:TROUGH,pri:3,active:()=>F.stage==='forge'&&FG.queue>0,onWater:()=>temper(false)});
  function startForge(){F.stage='forge';FG.t=-2*FG.B;FG.k=-3;ring.visible=true;stepRing.visible=true;banner('Куём клещи!','#ffd76a',3,'1 · Пелагея прыгает на рычаг мехов · 2 · Прошка молотом бьёт '+K(0,'attack')+' в такт · 3 · Йоша корыто поливает '+K(1,'skill'));}
  function strike(ok){const pr=T.proshka;pr.atkT=0.28;pr.face=Math.atan2(0-pr.pos.x,-14-pr.pos.z);const hk=FG.heat>0.3?1:0.5;FG.prog+=(ok?1.3:1)*hk;
    later(0.06,()=>{SFX.hammer();tone(ok?2600:1700,ok?0.5:0.25,'triangle',ok?0.24:0.12);burst(new V3(0,1.35,-14),ok?0xffe060:0xffa040,ok?18:6,ok?5:2);blank.material.emissiveIntensity=1.6;floatText(new V3(0,2.1,-14),ok?'Дзинь!':'тук',ok?'#ffe36b':'#e0c0a0');});
    if(FG.heat<=0.3&&!FG.coldTold){FG.coldTold=true;sayP('Горн остыл — Пелагея, на рычаг мехов прыгай, раздувай!',2.8);}
    if(FG.prog>=FG.need){FG.prog=0;FG.made++;FG.queue++;SFX.ok();floatText(new V3(0,2.9,-14),'Клещи готовы — в корыто летят!','#ffd76a');flyToTrough(FG.made-1);
      if(FG.made===1)later(0.9,()=>sayP('Йоша, клещи в корыте! Живой водой полей — пш-ш-ш, и готово!',3));}}
  function forgeTick(dt){FG.t+=dt;const k=Math.floor(FG.t/FG.B+1e-6);while(FG.k<k){FG.k++;if(FG.k<0)tone(1760,0.05,'square',0.05);else tone(880,0.04,'square',0.03);}
    const u=((FG.t%FG.B)+FG.B)%FG.B/FG.B;ring.position.set(0,1.32,-14);ring.scale.setScalar(lerp(1.6,0.3,u));ring.material.color.setHex(u>0.8?0xffffff:COL.yellow);ring.visible=FG.made<FG.total;
    const pr=T.proshka;if(pr.active&&tap(0,'attack')&&hd(pr.pos,{x:0,z:-14})<2.6&&FG.made<FG.total){const d=Math.min(u,1-u)*FG.B;strike(d<=0.18+(W.ladBonus||0));}
    else if(tap(0,'attack')&&!pr.active&&hd(active(0).pos,{x:0,z:-14})<2.6)tip(0,'Куёт Прошка — его это дело. Смени на него '+K(0,'swap')+'.',2);
    // мехи: прыжок Пелагеи на рычаг; оставленная качает сама, медленнее
    const pe=T.pelageya;const onL=pe.grounded&&hd(pe.pos,lever)<0.85;if(onL&&!FG.onL){FG.heat=Math.min(1,FG.heat+0.2);SFX.whoosh();anim(0.3,q=>{forge.lever.rotation.x=-0.4*Math.sin(q*Math.PI);});burst(new V3(-5.2,1.6,-15.6),0xff8a3a,10,3);}FG.onL=onL;
    if(!ctrl(pe)&&hd(pe.pos,lever)<6)FG.heat=Math.min(1,FG.heat+dt*(G.solo&&pe.active?0.1:0.06));FG.heat=Math.max(0,FG.heat-dt*0.085);
    forge.coalM.emissiveIntensity=0.3+FG.heat*1.2;forge.fire.intensity=0.4+FG.heat*1.6;blank.material.emissiveIntensity=damp(blank.material.emissiveIntensity,0.3+FG.heat*0.8,4,dt);
    // закалка: клещи ждут в корыте; оставленный рядом Йоша польёт сам, но не сразу
    const Y=T.yosha;if(FG.queue>0){FG.waitT+=dt;if(!ctrl(Y)&&hd(Y.pos,TROUGH)<5){FG.autoT+=dt;if(FG.autoT>5)temper(true);}
      FG.nagT-=dt;if(FG.waitT>6&&FG.nagT<=0){FG.nagT=9;sayP(Y.active?'Йоша, корыто полей — клещи заждались!':'На Йошу смени — он корыто живой водой польёт!',2.8);tip(1,Y.active?'Клещи в корыте! Подойди — и полей '+K(1,'skill')+'.':'Клещи закалки ждут. Смени на Йошу '+K(1,'swap')+' — корыто полей '+K(1,'skill')+'.',3.4);}}
    for(const q of inTrough)if(q.g.visible&&q.m.emissiveIntensity>0.2){q.m.emissiveIntensity=0.7+0.3*Math.sin(G.time*8);if(Math.random()<dt*3)burst(q.g.position.clone().add(new V3(0,0.25,0)),0xffffff,1,1,1.2);}
    // что сейчас главное: корыто, мехи или наковальня — туда светит золотое кольцо и бегут стрелки
    const step=FG.queue>0?2:FG.heat<0.35?0:1;const P=[[lever.x,lever.z],[0,-14],[TROUGH.x,TROUGH.z]][step];stepRing.position.set(P[0],0.07,P[1]);stepRing.scale.setScalar(1+0.08*Math.sin(G.time*6));
    ARW.forEach((seg,si)=>seg.forEach((m,i)=>{const hot=(step===0&&si===0)||(step===1&&si===1)||(step===2&&si===2)||(si===3&&FG.done>0);m.material.opacity=hot?0.35+0.5*Math.max(0,Math.sin(G.time*6-i*1.2)):0.18;}));
    heatBar.fl.scale.x=Math.max(0.01,FG.heat);heatBar.fl.position.x=-0.8+0.8*FG.heat;heatBar.fl.material.color.setHex(FG.heat<0.35?0x8a3a2a:FG.heat<0.7?0xff7a20:0xffd23a);heatBar.g.quaternion.copy(camS.quaternion);
    const lit=Math.floor(FG.prog/FG.need*7+1e-6);pips.forEach((m,i)=>{m.material.emissiveIntensity=i<lit?1.2:0;m.material.color.setHex(i<lit?0xffd23a:0x3a3028);});
    if(FG.done>=FG.total)forgeEnd();}
  function forgeEnd(){F.stage='tongs';ring.visible=false;stepRing.visible=false;heatBar.g.visible=false;pips.forEach(m=>{m.visible=false;});ARW.forEach(s=>s.forEach(m=>{m.visible=false;}));SFX.ok();
    floatText(new V3(7.3,4.3,-15.9),'Все четыре скованы!','#ffd76a');}
  // все четыре висят на стойке — клещи сами срываются с крючков и разлетаются к героям: каждому свои
  function flyOff(){const order=[T.proshka,T.potap,T.pelageya,T.yosha];SFX.whoosh();banner('Клещи — каждому!','#ffb070',2.4,'четыре готовы — к героям летят');
    rackSlots.forEach((sl,i)=>{const h=order[i];later(i*0.3,()=>{const g=new THREE.Group();const L=hotLook('kleshi',g);L.m.color.setHex(0x8a8a94);L.m.emissive.setHex(0xffb030);L.m.emissiveIntensity=0.9;g.scale.setScalar(1.8);W.group.add(g);
      const from=new V3();sl.g.getWorldPosition(from);g.position.copy(from);sl.on=false;sl.m.transparent=true;sl.m.opacity=0.35;sl.m.color.setHex(0x2a2a30);SFX.swish();tone(880+i*160,0.12,'triangle',0.08);
      anim(1.15,k=>{const to=h.pos.clone().add(new V3(0,heroHeight(h)*0.6,0)),e=smooth(k);g.position.lerpVectors(from,to,e);g.position.y+=Math.sin(k*Math.PI)*2.6;g.rotation.y+=0.35;g.rotation.z+=0.18;
        if(Math.random()<0.8)burst(g.position.clone(),Math.random()<0.5?0xffd76a:0xffffff,2,1.2,0.9);
        if(k>=1){W.group.remove(g);ringFx(h.pos,PCOL[h.player],1.5);burst(to,COL.gold,14,3);tone(1320+i*180,0.3,'triangle',0.14);h.atkT=0.25;floatText(h.pos.clone().add(new V3(0,heroHeight(h)+0.7,0)),'Мои клещи!','#ffd9a0');}});});});
    later(4*0.3+1.3,()=>{F.flew=true;W.abil.kleshi=true;SFX.ok();L1.locked=false;L1.g.visible=true;burst(L1.pos.clone(),COL.gold,16,3);
      banner('У каждого — клещи!','#ffb070',2.8,'кнопка R или ; (на джойстике RB): взять горячее, положить, а на бегу — бросить · горячее остывает за двадцать секунд');
      later(1.2,()=>bark(T.proshka,'proshka','Сам сковал. Своими руками.',2.2));for(const pi of[0,1])tip(pi,'Клещи '+K(pi,'item')+': у горячего — взять, ещё раз — положить.<br>На бегу — на четыре шага бросить, вот как быть.',4);});}
  /* ---------- Д. «В четыре руки»: большую заготовку несут вдвоём, куют вдвоём, закаляет Йоша ---------- */
  const BIG={pos:new V3(0,1.25,-57.3),ang:0,hold:[null,null],on:false,placed:false};
  const bigM=M(0xff7a20,{emissive:0xff4a00,emissiveIntensity:0.9});let bigMesh=null;
  const ANV=new V3(0,0,-50.8),HOLD=new V3(-2.4,0,-50.8),STRIKE=new V3(1.2,0,-49.1);
  const bigAnvil=new THREE.Group();bigAnvil.position.set(ANV.x,-2.4,ANV.z);W.group.add(bigAnvil);addMesh(new THREE.BoxGeometry(1.1,1.0,1.0),M(0x5a3a1a),0,0.5,0,bigAnvil);addMesh(new THREE.BoxGeometry(2.2,0.42,0.9),M(0x3a3a44),0,1.2,0,bigAnvil);
  {const horn=new THREE.ConeGeometry(0.34,0.9,10);horn.rotateZ(Math.PI/2);addMesh(horn,M(0x3a3a44),1.55,1.2,0,bigAnvil);}
  const plate=(p,col,txt)=>{const g=new THREE.Group();g.position.set(p.x,0.06,p.z);g.visible=false;W.group.add(g);addMesh(new THREE.CylinderGeometry(0.75,0.8,0.1,20),M(col),0,0,0,g);
    const b=new THREE.Mesh(new THREE.PlaneGeometry(1.6,0.5),new THREE.MeshBasicMaterial({map:scratchTex(txt,360,112,'#fff4dc','#3a2418'),transparent:true}));b.position.set(0,2.6,0);g.add(b);g.userData.sign=b;return g;};
  const holdPlate=plate(HOLD,0x4a6a8a,'ДЕРЖАТЬ'),strikePlate=plate(STRIKE,0x8a5a2a,'БИТЬ');
  const hammer=new THREE.Group();hammer.position.set(ANV.x+0.4,3.2,ANV.z);hammer.visible=false;W.group.add(hammer);addMesh(new THREE.CylinderGeometry(0.07,0.08,1.6,8),wood,0,0.8,0,hammer);addMesh(new THREE.BoxGeometry(0.8,0.42,0.42),M(0x3a3a44),0,1.6,0,hammer);
  const R4={phase:'off',t:0,k:-1,B:0.72,prog:0,need:24,striker:[null,null],beatDone:{},turn:0};W.R4=R4;W.BIG=BIG;
  const ring4=new THREE.Mesh(new THREE.TorusGeometry(1,0.06,6,32),MB(COL.yellow,{transparent:true,opacity:0.9}));ring4.rotation.x=Math.PI/2;ring4.visible=false;W.group.add(ring4);
  function bigShape(){if(bigMesh){bigMesh.parent.remove(bigMesh);bigMesh.geometry.dispose();}const u=R4.prog/R4.need;
    const geo=u<0.02?new THREE.BoxGeometry(2.2,0.2,0.24):new THREE.TorusGeometry(lerp(0.9,0.5,u),0.12,8,28,lerp(0.9,Math.PI*2,u));bigMesh=new THREE.Mesh(geo,bigM);bigMesh.castShadow=true;
    if(u>=0.02){bigMesh.rotation.x=Math.PI/2;bigMesh.rotation.z=-lerp(0.45,Math.PI,u)+R4.turn*Math.PI/2;}W.group.add(bigMesh);}
  function startRuki(){F.stage='carry';BIG.on=true;bigShape();bigMesh.position.copy(BIG.pos);SFX.gate();anim(1.6,k=>{bigAnvil.position.y=lerp(-2.4,0,smooth(k));});holdPlate.visible=strikePlate.visible=true;
    W.cyls.push({x:ANV.x,z:ANV.z,r:1.0,miny:-1,maxy:1.4,on:true});banner('В четыре руки — дружно!','#ffd76a',3.2,G.solo?'большая заготовка тяжела — возьми клещами один конец, второй помощник подхватит, и несите на большую наковальню':'большая заготовка тяжела — клещами вдвоём, каждый за свой конец, и несите на большую наковальню');
    later(1.6,()=>sayP('Кузьма говорил: клещи в четыре руки куют.<br>И кольцо цепи — тоже, вот и весь тут труд.',3.6));}
  const bigEnds=()=>{const c=Math.cos(BIG.ang),s=Math.sin(BIG.ang);return [new V3(BIG.pos.x-1.1*c,0,BIG.pos.z+1.1*s),new V3(BIG.pos.x+1.1*c,0,BIG.pos.z-1.1*s)];};
  function grabBig(pi){const h=active(pi);if(BIG.hold[pi]){BIG.hold[pi]=null;if(G.solo)BIG.hold[1-pi]=null;SFX.latch();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Отпустил','#ffd9a0');if(!BIG.hold[1-pi]){BIG.pos.y=0.12;}return;}
    const E=bigEnds();const used=BIG.hold[1-pi]?BIG.hold[1-pi].end:-1;let best=-1,bd=1.5;E.forEach((e,i)=>{if(i===used)return;const d=hd(e,h.pos);if(d<bd){bd=d;best=i;}});if(best<0)return;
    BIG.hold[pi]={h,end:best};SFX.latch();
    // одиночный режим: второй конец подхватывает помощник — герой второго игрока
    if(G.solo&&!BIG.hold[1-pi]){const q=1-pi,hq=active(q);if(!players[q].downed&&!hq.cling){const e2=bigEnds()[1-best];placeOnGround(hq,e2.x,e2.z,0);hq.following=false;hq.vel.set(0,0,0);BIG.hold[q]={h:hq,end:1-best};
      burst(hq.pos.clone().add(new V3(0,1,0)),PCOL[q],12,3);floatText(hq.pos.clone().add(new V3(0,hq.d.height+0.9,0)),'Помогу!','#ffb070');}}floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),BIG.hold[1-pi]?'Взяли! Несём':'Тяжело! Второй нужен','#ffb070');
    if(!BIG.hold[1-pi])tip(1-pi,'Большую заготовку одному не поднять! Второй конец клещами '+K(1-pi,'item')+' возьми.',3);}
  function carryTick(dt){for(const pi of[0,1]){const H=BIG.hold[pi];if(H&&(!H.h.active||players[pi].downed))BIG.hold[pi]=null;}
    const a=BIG.hold[0],b=BIG.hold[1];
    if(a&&b){const pa=a.end===0?a.h.pos:b.h.pos,pb=a.end===0?b.h.pos:a.h.pos,d=hd(pa,pb);
      if(d>3.8){BIG.hold=[null,null];BIG.pos.y=0.12;SFX.knock();floatText(BIG.pos.clone().add(new V3(0,1,0)),'Уронили! Держитесь ближе, не расходитесь','#ffb070');return;}
      // одиночный режим: помощник держит свой конец и идёт ровно за тем, кем управляешь
      if(G.solo){const C=ctrl(a.h)?a:b,Q=C===a?b:a;const dx=Q.h.pos.x-C.h.pos.x,dz=Q.h.pos.z-C.h.pos.z,dd=Math.hypot(dx,dz)||1;const tx=C.h.pos.x+dx/dd*2.2,tz=C.h.pos.z+dz/dd*2.2;
        Q.h.pos.x=damp(Q.h.pos.x,tx,10,dt);Q.h.pos.z=damp(Q.h.pos.z,tz,10,dt);Q.h.vel.x=0;Q.h.vel.z=0;Q.h.following=false;Q.h.face=Math.atan2(C.h.pos.x-Q.h.pos.x,C.h.pos.z-Q.h.pos.z);}
      BIG.pos.set((pa.x+pb.x)/2,1.15,(pa.z+pb.z)/2);BIG.ang=Math.atan2(-(pb.z-pa.z),pb.x-pa.x);
      if(hd(BIG.pos,ANV)<1.4||(G.solo&&[a,b].some(H=>ctrl(H.h)&&hd(H.h.pos,ANV)<1.9))){BIG.hold=[null,null];BIG.placed=true;BIG.pos.set(ANV.x,1.55,ANV.z);BIG.ang=0;SFX.plate();burst(BIG.pos.clone(),0xffb040,16,4);banner('На наковальню!','#ffd76a',1.6,'теперь вдвоём куём');startR4();}}
    bigMesh.position.copy(BIG.pos);bigMesh.rotation.set(0,BIG.ang,0);bigM.emissiveIntensity=0.7+0.3*Math.sin(G.time*6);}
  // ковка вдвоём: доли 1-2-3 — удар молотом (тот, кто на плите «бить»), доля 4 — поворот клещами (тот, кто на плите «держать»); на середине меняются местами
  function startR4(){F.stage='r4';R4.phase='play';R4.t=-2*R4.B;R4.k=-3;R4.prog=0;R4.turn=0;R4.striker=[null,null];ring4.visible=true;hammer.visible=true;bigShape();bigMesh.position.set(ANV.x,1.55,ANV.z);
    if(G.solo){const q=active(1-G.soloPi);placeOnGround(q,HOLD.x,HOLD.z,0);q.following=false;q.vel.set(0,0,0);q.face=Math.atan2(ANV.x-HOLD.x,ANV.z-HOLD.z);burst(q.pos.clone().add(new V3(0,1,0)),PCOL[1-G.soloPi],10,3);
      tip(G.soloPi,'На плиту «БИТЬ» встань — удар '+K(G.soloPi,'attack')+' на раз-два-три.<br>Помощник держит и поворачивает на четыре. На середине поменяетесь — смотри.',5);}
    else for(const pi of[0,1])tip(pi,'Встаньте на плиты: «БИТЬ» — удар '+K(pi,'attack')+' на раз-два-три,<br>«ДЕРЖАТЬ» — поворот клещами '+K(pi,'item')+' на четыре, смотри.',4.4);}
  const onPlate=(p,pi)=>{const h=active(pi);return hd(h.pos,p)<1.0&&!players[pi].downed;};
  const beatOf=()=>{const k=Math.round(R4.t/R4.B);return {k,d:R4.t-k*R4.B,b:((k%4)+4)%4};};
  function r4Act(pi,kind){if(R4.phase!=='play'||R4.t<-R4.B*0.4)return false;const h=active(pi),j=beatOf();const half=R4.prog>=R4.need/2?1:0;
    const want=j.b===3?'turn':'strike';const top=h.pos.clone().add(new V3(0,h.d.height+0.6,0));
    if(kind==='strike'&&!onPlate(STRIKE,pi))return false;if(kind==='turn'&&!onPlate(HOLD,pi))return false;
    if(kind!==want){floatText(top,want==='turn'?'сейчас — поворот!':'сейчас — удар!','#dddddd');return true;}
    if(kind==='strike'&&half===1&&R4.striker[0]===pi){floatText(top,'Теперь другой бьёт — меняйтесь!','#ffd9a0');return true;}
    if(R4.beatDone[j.k]){return true;}
    if(kind==='strike'&&![0,1].some(q=>q!==pi&&onPlate(HOLD,q))){floatText(top,'Держать некому — заготовка скачет!','#ffd9a0');return true;}
    if(Math.abs(j.d)>0.22+(W.ladBonus||0)){floatText(top,j.d<0?'рано':'поздно','#dddddd');return true;}
    R4.beatDone[j.k]=true;R4.prog++;if(kind==='strike'){R4.striker[half]=pi;h.atkT=0.3;anim(0.22,q=>{hammer.rotation.z=-Math.sin(q*Math.PI)*1.1;});later(0.1,()=>{SFX.hammer();tone(2300+R4.prog*20,0.4,'triangle',0.2);burst(new V3(ANV.x,1.7,ANV.z),0xffe060,14,4);floatText(new V3(ANV.x,2.4,ANV.z),'Дзинь!','#ffe36b');});}
    else{R4.turn++;SFX.latch();floatText(top,'Поворот!','#bfe0ff');tone(1200,0.2,'sine',0.14,1600);}
    bigShape();bigMesh.position.set(ANV.x,1.55,ANV.z);
    if(R4.prog===R4.need/2){banner('Меняйтесь местами!','#ffd76a',2.2,G.solo?'помощник сам меняется с тобой: теперь ты держишь и поворачиваешь '+K(G.soloPi,'item'):'кто держал — тот бьёт, кто бил — тот держит');SFX.ok();
      if(G.solo){const c=active(G.soloPi),q=active(1-G.soloPi),pc=c.pos.clone(),pq=q.pos.clone();later(0.25,()=>{hop41(c,pq);hop41(q,pc);});}}
    if(R4.prog>=R4.need){R4.phase='quench';F.stage='quench';ring4.visible=false;hammer.visible=false;SFX.ok();banner('Кольцо цепи!','#ffd76a',2.4,'Йоша, живой водой '+K(1,'skill')+' его закали');later(0.8,()=>sayP('Йоша, кольцо полей — пусть зазвенит!',2.6));}
    return true;}
  W.itemSign=pi=>{const h=active(pi);
    if(F.stage==='carry'&&BIG.on&&!BIG.placed&&(BIG.hold[pi]||bigEnds().some(e=>hd(e,h.pos)<1.5)))return ()=>grabBig(pi);
    if(F.stage==='r4'&&onPlate(HOLD,pi))return ()=>{r4Act(pi,'turn');};return null;};
  W.onAttack=(pi,h)=>{if(F.stage==='r4')r4Act(pi,'strike');};
  // перескок на другую плиту (одиночный режим, середина ковки)
  function hop41(h,to){const fr=h.pos.clone();SFX.jump();anim(0.45,k=>{h.pos.x=lerp(fr.x,to.x,k);h.pos.z=lerp(fr.z,to.z,k);h.pos.y=Math.sin(k*Math.PI)*1.2;h.vel.set(0,0,0);h.grounded=false;if(k>=1)placeOnGround(h,to.x,to.z,0);});}
  function r4Tick(dt){R4.t+=dt;
    // одиночный режим: помощник сам бьёт или поворачивает в свою долю — смотря на какой он плите
    if(G.solo&&R4.phase==='play'){const q=1-G.soloPi,j=beatOf();if(Math.abs(j.d)<0.06&&!R4.beatDone[j.k]){if(j.b===3&&onPlate(HOLD,q))r4Act(q,'turn');else if(j.b!==3&&onPlate(STRIKE,q))r4Act(q,'strike');}}const k=Math.floor(R4.t/R4.B+1e-6);while(R4.k<k){R4.k++;const b=((R4.k%4)+4)%4;if(R4.k<0)tone(1760,0.05,'square',0.05);else tone(b===3?1320:880,0.05,'square',b===3?0.06:0.035);}
    const u=((R4.t%R4.B)+R4.B)%R4.B/R4.B,nb=((Math.round(R4.t/R4.B+0.5)%4)+4)%4;ring4.position.set(ANV.x,1.6,ANV.z);ring4.scale.setScalar(lerp(1.8,0.4,u));ring4.material.color.setHex(nb===3?0x7ad8ff:(u>0.8?0xffffff:COL.yellow));
    strikePlate.userData.sign.scale.setScalar(nb!==3?1+0.12*(1-u):1);holdPlate.userData.sign.scale.setScalar(nb===3?1+0.18*(1-u):1);
    [holdPlate,strikePlate].forEach(g=>g.userData.sign.quaternion.copy(camS.quaternion));bigM.emissiveIntensity=0.7+0.3*Math.sin(G.time*6);}
  W.waterTargets.push({pos:new V3(ANV.x,0,ANV.z),pri:3,active:()=>F.stage==='quench',onWater:()=>quench(false)});
  function quench(auto){if(F.stage!=='quench')return;F.stage='rung';bigM.color.setHex(COL.gold);bigM.emissive.setHex(0x806010);bigM.emissiveIntensity=0.5;SFX.water();burst(new V3(ANV.x,1.8,ANV.z),0xe8f4ff,26,4);
    floatText(new V3(ANV.x,2.6,ANV.z),auto?'Йоша сам полил — молодец!':'Пш-ш-ш!','#cfe8ff');later(0.6,()=>{SFX.bell();[0,4,7,12].forEach((d,i)=>tone(mf(62+d),1.4,'sine',0.16,null,i*0.12));ringFx(new V3(ANV.x,0.2,ANV.z),COL.gold,5);banner('Звон!','#ffd76a',1.8,'кольцо звенит, как колокол вечевой');});later(1.8,endScene);}
  /* ---------- сюжет ---------- */
  function intro(){F.stage='intro';const pe=T.pelageya,pr=T.proshka;
    HEROES.forEach((h,i)=>{placeOnGround(h,-2.4+i*1.6,-9,0);h.face=Math.PI;});const nb=makeNotebook();nb.g.scale.setScalar(0.9);nb.g.position.set(pe.pos.x+0.1,0.95,pe.pos.z+0.3);
    play({dur:27,fov:46,camK:2.6,shots:[shot(0,[0,3.4,-4],[0,1.6,-16]),shot(5,[-4,2.4,-44],[-8.2,1.8,-54.5],[4,2.4,-44],[8.2,1.8,-54.5],4),shot(10,[pe.pos.x+2,1.4,pe.pos.z+1.8],[pe.pos.x,0.9,pe.pos.z]),
        shot(16.4,[1.6,2,-11.6],[0,1.3,-14]),shot(20.6,[pr.pos.x-1.6,1.4,pr.pos.z+1.6],[pr.pos.x,0.9,pr.pos.z]),shot(23.4,[-7,2.2,-16],[-10.9,2.6,-19])],
      says:[[0.3,4,null,'<i>Кузня у самой огненной реки стоит —</i><br><i>Внутри жарко да красно, огонь гудит.</i>',true],[5,4.2,null,'<i>Кузьма-старший с Демьяном — каменные истуканы стоят:</i><br><i>Кощей заколдовал — и молоты молчат.</i>',true],
        [10,3.6,'pelageya','<i>(тихо, запинаясь, но вслух)</i> Кузьма говорил: клещи в четыре руки куют…'],[13.8,2.4,null,'<i>Её голос звучит там, где прозвенело бы Звенышко.</i>',true],
        [16.4,3.6,null,'<i>На наковальне клещи недоделанные лежат.</i><br><i>Прошка на них глядит — и на звенья в сумке, что рассыпаны, звенят.</i>',true],[20.6,2.6,'proshka','Три раза ковал. Докую.'],
        [23.4,3.4,null,'<i>На стене выбит старый лубок: Кот Учёный, а рядом ученик с молотом. Только лицо ученика сколото.</i>',true]],
      events:[{t:10,fn:()=>{tone(1320,0.12,'triangle',0.08);tone(1760,0.16,'sine',0.06,null,0.06);}}],
      end:()=>{W.group.remove(nb.g);placeOnGround(pr,0.2,-11.8,0);pr.face=Math.PI;placeOnGround(pe,-6.6,-12.4,0);placeOnGround(T.yosha,3.4,-12.4,0);placeOnGround(T.potap,-2.8,-9.6,0);
        if(players[0].act!==0)doSwap(0);if(players[1].act!==0)doSwap(1);snapCams();startForge();}});}
  function endScene(){F.stage='end';const pr=T.proshka;[[0,-47.6],[-2,-46.6],[2,-46.6],[0,-46]].forEach(([x,z],i)=>{placeOnGround(HEROES[i],x,z,0);HEROES[i].face=Math.PI;});
    play({dur:21,fov:46,camK:2.4,shots:[shot(0,[0,3,-45],[0,1.8,-54]),shot(5.6,[4.2,2.2,-47],[0.8,1.4,-50.2]),shot(11,[-1.4,1.3,-49.6],[0,0.9,-47.6]),shot(14,[-5.2,2,-51.4],[-8.2,1.9,-54.5]),shot(16,[0.8,1.2,-49.4],[0,0.9,-47.6])],
      says:[[0.3,3.6,null,'<i>Кольцо звенит, как колокол, —</i><br><i>И от звона того истуканы оживают вдруг.</i>',true],[5.6,3.2,'demyan','Хорошо сковано. Ладно.'],[8.8,2,'demyan','Вчетвером, говоришь?'],[11,3,null,'<i>Прошка на друзей кивает. Уши у него — красные.</i>',true],
        [14.2,1.8,'kuzst','Хм. Ученики, стало быть.'],[16,4.6,'proshka','<i>(тихо, через экран)</i> Ладно. Волшебство. Но сделанное руками.']],
      events:[{t:0.3,fn:()=>{anim(3,k=>{kz.setStone(1-k);dm.setStone(1-k);});for(let i=0;i<8;i++)later(i*0.3,()=>burst(new V3(rand(-9,9),2,-54.5),0xff9a40,6,3));}},
        {t:3.4,fn:()=>{const f=dm.g.position.clone();anim(3,k=>{dm.g.position.lerpVectors(f,new V3(pr.pos.x+1.2,0,pr.pos.z-1),smooth(k));dm.g.rotation.y=k<0.85?-1.42:-0.88;});}},
        {t:18,fn:()=>{giveLink(dm.g.position,pr,2,1.1);}}],
      end:()=>{flushGifts();F.out=true;banner('Кузня ожила','#ffb070',2.4,'в лавке у Векши — фартук кузнеца, загляни!');later(1.8,finishLevel);}});}
  W.updates.push(dt=>{
    if(F.stage==='walk'&&[0,1].some(pi=>active(pi).pos.z<-6.8))intro();
    if(F.stage==='forge'&&!G.cine)forgeTick(dt);
    cntM.quaternion.copy(camS.quaternion);cntDraw();
    if(F.stage==='tongs'&&!F.flying&&FG.onRack>=FG.total&&!G.cine){F.flying=true;later(0.5,flyOff);}
    if(F.stage==='carry'&&!G.cine)carryTick(dt);
    if(F.stage==='r4'&&!G.cine)r4Tick(dt);
    if(F.stage==='quench'){const Y=T.yosha;F.qT=(F.qT||0)+dt;if(!ctrl(Y)&&hd(Y.pos,ANV)<5&&F.qT>6)quench(true);if(bigM)bigM.emissiveIntensity=0.7+0.3*Math.sin(G.time*6);}
    // подъёмник
    // печь горит 20 с: подъёмник едет вверх, когда на нём кто-то стоит (или уже в пути); погасла — вниз, но не на голову
    const onLift=HEROES.some(h=>h.groundRef===liftCol);if(LIFT.up>0)LIFT.up-=dt;
    if(LIFT.up>0&&(onLift||LIFT.y>0.01))LIFT.y=Math.min(4.4,LIFT.y+dt*0.9);
    else if(LIFT.up<=0&&!HEROES.some(h=>h.pos.x>4.6&&h.pos.x<7.7&&h.pos.z>-34.8&&h.pos.z<-31.2&&h.pos.y<LIFT.y-0.1&&LIFT.y-h.pos.y<h.d.height+0.6))LIFT.y=Math.max(0,LIFT.y-dt*0.9);const dy=LIFT.y-(liftCol.maxy-0.3);
    liftCol.miny=LIFT.y;liftCol.maxy=LIFT.y+0.3;liftM.position.y=LIFT.y+0.15;liftFire.emissiveIntensity=LIFT.up>0?1:0.05;for(const h of HEROES)if(h.groundRef===liftCol)h.pos.y+=dy;
    if(!F.fight&&F.g2&&[0,1].some(pi=>active(pi).pos.z<-44))spawnGolems();
    if(F.fight&&!F.cleared&&arena.every(e=>!e.alive)){F.cleared=true;SFX.ok();banner('Цех чист!','#ffb070',2.2,'горячий уголь — в большой горн: большую заготовку он разогреет');later(1,()=>sayP('Большой горн кузню будит.',3));}});
  /* ---------- рисунки кнопок ---------- */
  const P=T.proshka,Y=T.yosha,Pe=T.pelageya;
  prompt(0,'attack',()=>headOf(P),()=>F.stage==='forge'&&P.active&&hd(P.pos,{x:0,z:-14})<2.6&&FG.made<FG.total,'в такт');
  prompt(0,'swap',()=>headOf(active(0)),()=>F.stage==='forge'&&!P.active&&FG.made<FG.total,'Прошка — куёт');
  prompt(1,'jump',()=>headOf(Pe),()=>F.stage==='forge'&&Pe.active&&hd(Pe.pos,lever)<2.4,'прыгай на рычаг');
  prompt(1,'skill',()=>headOf(Y),()=>F.stage==='forge'&&Y.active&&FG.queue>0&&hd(Y.pos,TROUGH)<5.5,'полей корыто');
  prompt(1,'swap',()=>headOf(Pe),()=>F.stage==='forge'&&Pe.active&&FG.queue>0,'Йоша — закалка');
  for(const pi of[0,1])prompt(pi,'label',()=>new V3(4.6,2.2,-14.2),()=>F.stage==='forge'&&FG.queue>0,'клещи ждут закалки!');
  prompt(1,'skill',()=>headOf(Y),()=>F.stage==='quench'&&Y.active,'закали кольцо');
  prompt(1,'swap',()=>headOf(Pe),()=>F.stage==='quench'&&Pe.active,'Йоша — закалка');
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>W.abil.kleshi&&F.stage!=='carry'&&F.stage!=='r4'&&!heroCarry(h())&&W.hots.some(it=>!it.gone&&!it.carrier&&it.heat>0.1&&hd(it.pos,h().pos)<1.8),'взять клещами');
    prompt(pi,'item',()=>headOf(h()),()=>{const it=heroCarry(h());return !!it&&W.sockets.some(s=>!s.item&&(!s.active||s.active())&&s.accept(it)&&hd(s.pos,h().pos)<2);},'положить');
    prompt(pi,'item',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.armor==='cool'&&hd(e.pos,h().pos)<2.2),'сорви латы');
    prompt(pi,'item',()=>headOf(h()),()=>!AUTO(pi)&&F.stage==='carry'&&!BIG.hold[pi]&&bigEnds().some(e=>hd(e,h().pos)<1.5),()=>BIG.hold[1-pi]?'второй конец!':'взять конец');
    prompt(pi,'move',()=>headOf(h()),()=>!AUTO(pi)&&F.stage==='carry'&&!!BIG.hold[pi]&&!!BIG.hold[1-pi],'к наковальне');
    prompt(pi,'attack',()=>headOf(h()),()=>!AUTO(pi)&&F.stage==='r4'&&onPlate(STRIKE,pi)&&beatOf().b!==3,'бей');
    prompt(pi,'item',()=>headOf(h()),()=>!AUTO(pi)&&F.stage==='r4'&&onPlate(HOLD,pi)&&((Math.round(R4.t/R4.B+0.5)%4)+4)%4===3,'поворот');
    prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig!=='red'&&e.help));
    prompt(pi,'roll',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig==='red'&&e.help));}
  prompt(1,'skill',()=>headOf(Y),()=>Y.active&&W.enemies.some(e=>e.alive&&e.armor==='hot'&&hd(e.pos,Y.pos)<3.2),'полить латы');
  /* ---------- задачи ---------- */
  const OR=(text,done,targets,ghost,read)=>{const o=O(text,done,targets,ghost);o.read=read;return o;};
  const forgeText=pi=>()=>{const st='Клещи '+FG.done+' / '+FG.total+'. ';
    if(FG.queue>0)return st+(pi?'Клещи в корыте! Йоша '+K(1,'swap')+' — полей корыто живой водой '+K(1,'skill'):'Клещи в корыте — ждём, пока Йоша польёт. А ты куй следующие '+K(0,'attack'));
    return st+(pi?'1 · Пелагея на рычаг мехов прыгает '+K(1,'jump')+' — жар растёт. 3 · Готовые клещи сами в корыто прилетят — тогда Йоша польёт':'2 · Прошка молотом бьёт '+K(0,'attack')+', как жёлтый кружок станет мал. Семь огоньков над наковальней — клещи готовы, час настал');};
  const mk=pi=>[
    OR('Кузня у огненной реки. Внутрь, смелей!',()=>F.stage!=='walk',()=>[anvil],null,'…кузня Кузьмы и Демьяна у самой реки стоит.'),
    OR('Кузнецы окаменели…',()=>F.stage!=='intro',()=>[anvil]),
    OR(forgeText(pi),()=>W.abil.kleshi,()=>FG.queue>0?[trough.g]:pi?[forge.bag]:[anvil],null,pi?'Мехи прыжками качают, а готовое — в воду, пусть шипит.':'…бить в такт, как по мороку, — и молот звенит.'),
    OR(()=>'Горячим двери открываются: слиток из горна клещами возьми '+K(pi,'item')+' —<br>На холодную плиту положи.',()=>F.g1,()=>[slitok.g],null,'…холодная плита горячее любит.'),
    OR(()=>'Дальние ворота засовом заперты: горячий гвоздь из горна — в щель.<br>На галерею — подъёмник: уголь в его печь — вот и вся цель.',()=>F.g2,()=>[gvozd.g,slot],null,'…засов от горячего гвоздя плавится.'),
    OR(()=>'Чугунные болваны в раскалённых латах! По горячему не бей:<br>Йоша поливает '+K(1,'skill')+', используй клещи '+K(pi,'item')+' — нагрудник сорвать, и бейте его, скорей!',()=>F.cleared,()=>arena?arena.filter(e=>e.alive).map(e=>e.g):[],null,'…не сорвали латы за десять секунд — раскалятся опять.'),
    OR(()=>'Горячий уголь иль слиток — в большой горн: он большую заготовку разогреет.',()=>F.lit,()=>[master.g],null,'…большой горн кузню будит.'),
    OR(()=>'В четыре руки! Большую заготовку лишь вдвоём подымают: каждый клещами '+K(pi,'item')+' свой конец берёт.<br>Несите её на большую наковальню — вперёд!',()=>BIG.placed,()=>bigMesh?[bigMesh]:[],null,'…одному не поднять — вдвоём берите.'),
    OR(()=>'Куём вдвоём: '+(R4.prog)+' / '+R4.need+'. Плита «БИТЬ» — удар '+K(pi,'attack')+' на раз-два-три.<br>Плита «ДЕРЖАТЬ» — клещами '+K(pi,'item')+' поворот на четыре (голубой кружок). На середине — местами меняйтесь, смотри.',()=>['quench','rung','end'].includes(F.stage),()=>[holdPlate,strikePlate],null,'…раз-два-три — удар, а четыре — поворот, смотрите.'),
    OR(()=>'Кольцо готово! Йоша '+K(1,'swap')+' — живой водой '+K(1,'skill')+' его закали.',()=>F.stage==='rung'||F.stage==='end',()=>bigMesh?[bigMesh]:[],null,'…закалённое кольцо звенит, поёт.'),
    O('Кузнецы…',()=>false,()=>[dm.g])];
  for(const pi of[0,1])W.objectives[pi]=mk(pi);
  W.tipZones.push({cond:(pi,h)=>W.abil.kleshi&&!!heroCarry(h),text:pi=>'Несёшь горячее. Жми '+K(pi,'item')+' — положишь, а на бегу — бросишь.<br>Через двадцать секунд остынет — снова в печи погрей, не просишь.'});
  W.tipZones.push({cond:(pi,h)=>F.stage==='forge'&&hd(h.pos,TROUGH)<3.5&&FG.queue===0,text:pi=>'Корыто для закалки. Готовые клещи сами сюда с наковальни прилетят —<br>Тогда Йоша их живой водой '+K(1,'skill')+' польёт, пусть шипят.'});
  W.spawns=[[new V3(-2.6,0,5),new V3(-4.6,0,6)],[new V3(2.6,0,5),new V3(4.6,0,6)]];W.startAct=[0,0];
  W.pauseLine='Кузня Кузьмы и Демьяна. Звенышка нет — Пелагея подсказки читает.<br>Ковка: мехи → наковальня → корыто → стойка; четыре готовы — клещи к героям летают.<br>Клещи (RB) горячее берут: слиток, уголь, гвоздь. Горячим двери открываются.<br>Чугунные латы — полить да сорвать. А в конце — кольцо цепи в четыре руки куётся.';
  W.onStart=()=>{later(0.8,()=>sayP('…Звенышка нет. Читать буду я — сама.',2.8));};
  flushDecor();}

function edgeSignFire(x,z){const g=new THREE.Group();g.position.set(x,0,z-0.9);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.05,0.06,1.1,6),M(0xe8e0f0),0,0.55,0,g);
  const d=new THREE.Mesh(new THREE.CircleGeometry(0.32,20),MB(0x1a1010,{side:THREE.DoubleSide}));d.position.y=1.4;g.add(d);const f=new THREE.Mesh(new THREE.ConeGeometry(0.14,0.34,6),MB(0xff7a20));f.position.set(0,1.4,0.02);g.add(f);return g;}

