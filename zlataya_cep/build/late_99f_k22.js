/* ============================== РЕЛИЗ final06 · 2-2 «ЧУДО-ЮДО РЫБА-КИТ» — ВДВОЕ ДЛИННЕЕ ============================== */
// Начало прежнее: хвост, двор с общей водой, огород и мачта, фонтан дыхания до облаков. Дальше — новое, на горбу кита:
//   «Щука в ведре» (по щучьему велению): у пруда три ведра, в одном — щука; Совиный взор Пелагеи показывает, в каком; Потап поднимает
//      ведро и выпускает щуку — только в полный пруд (пруд общий: прилив просят вдвоём). Щука дарит слово — и печка выезжает из избы сама.
//   «Печка Емели»: оба садятся на печку — она сама едет по узкому хребту кита; раки встают поперёк дороги — печка ждёт, пока не прогоните;
//      дыхание кита гонит волну через хребет — щит или прыжок, иначе смоет назад, догоняй.
//   «Голова кита»: кит икает — «Ик!» — из дыры в голове бьёт струйка, а в ней золото: кит что-то проглотил (это язык колокола — в 2-4).
// В фонтане дыхания тоже мелькает золото. Звеньев столько же (4), орешков больше.
{const L=LEVELS.find(l=>l.id==='2-2');if(L)L.nuts=7;}   // орешков на уровне стало больше — для списка уровней
WHO.shchuka=['Щука','#9ad0a0'];VOICE.shchuka={f:300,w:'triangle',sp:0.09};
function pikeMesh22(){const g=new THREE.Group();W.group.add(g);const m=M(0x6a8a5a),bl=M(0xd8e0c0),gold=M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.7});
  const b=new THREE.Mesh(new THREE.SphereGeometry(0.4,12,8),m);b.scale.set(0.55,0.6,2.2);g.add(b);const be=new THREE.Mesh(new THREE.SphereGeometry(0.36,10,6),bl);be.scale.set(0.5,0.4,2.0);be.position.y=-0.08;g.add(be);
  const jaw=new THREE.Mesh(new THREE.ConeGeometry(0.2,0.55,6),m);jaw.rotation.x=Math.PI/2;jaw.position.z=1.0;jaw.scale.set(1,1,0.6);g.add(jaw);
  for(const s of[-1,1])part(g,new THREE.SphereGeometry(0.055,6,5),MAT.dark,s*0.17,0.1,0.62);
  const tail=new THREE.Group();tail.position.z=-0.85;g.add(tail);const tf=new THREE.Mesh(new THREE.ConeGeometry(0.32,0.5,4),m);tf.rotation.x=-Math.PI/2;tf.scale.set(0.2,1,1);tf.position.z=-0.2;tail.add(tf);
  const cr=new THREE.Group();cr.position.set(0,0.28,0.3);g.add(cr);for(let i=0;i<5;i++){const a=i/5*Math.PI*2;part(cr,new THREE.ConeGeometry(0.035,0.14,4),gold,Math.cos(a)*0.09,0.05,Math.sin(a)*0.09);}
  return {g,tail};}
// печка Емели: беленая, с устьем, трубой и глазками — сама едет
function stoveMesh22(){const g=new THREE.Group();W.group.add(g);const wh=M(0xf4efe4),red=M(0xc8503a),dk=M(0x2a1a14);
  const body=new THREE.Group();g.add(body);addMesh(new THREE.BoxGeometry(2.6,1.0,3.4),wh,0,0.5,0,body);addMesh(new THREE.BoxGeometry(2.7,0.12,3.5),red,0,1.02,0,body);
  addMesh(new THREE.BoxGeometry(1.0,0.55,0.06),dk,0,0.36,1.72,body);addMesh(new THREE.BoxGeometry(1.2,0.1,0.08),red,0,0.68,1.74,body);
  const chim=new THREE.Group();chim.position.set(0.7,1.0,-1.2);body.add(chim);addMesh(new THREE.BoxGeometry(0.6,1.4,0.6),wh,0,0.7,0,chim);addMesh(new THREE.BoxGeometry(0.7,0.12,0.7),red,0,1.42,0,chim);
  const sm=new THREE.Object3D();sm.position.set(0,1.6,0);chim.add(sm);
  const face=new THREE.Group();face.position.set(0,0.84,1.74);body.add(face);for(const s of[-1,1]){part(face,new THREE.SphereGeometry(0.12,8,6),M(0xffffff),s*0.45,0,0.02);part(face,new THREE.SphereGeometry(0.06,6,5),MAT.dark,s*0.45,0,0.1);}
  for(let i=0;i<6;i++)addMesh(new THREE.BoxGeometry(0.18,0.18,0.02),M([0x3a7ac0,0xc0302a,0xe0a020][i%3]),-1.0+i*0.4,0.12,1.71,body);   // изразцы
  g.traverse(c=>{c.userData.noBatch=true;});return {g,body,chim:sm,face};}
build22=function(){
  W.zvenAway=true;W.world=2;W.bubbles=false;setTheme('sea');sky('day');W.name='2-2 · «Чудо-юдо Рыба-кит»';W.sub='Подводный Китеж · одна вода на двоих · по щучьему велению';W.camX=10;const F=W.flags;
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.gusli=true;W.fallY=-5;W.waterCol=0x2f86c8;W.waterOp=0.42;
  const grass=M(0x7ab060),skinSide=M(0x5a6a86),soil=M(0x6a4a2a),wood=M(0x9a6a3c);
  // море и облака
  const sea=new THREE.Mesh(new THREE.PlaneGeometry(700,700),M(0x3a90c0,{transparent:true,opacity:0.92}));sea.rotation.x=-Math.PI/2;sea.position.set(0,-3.2,-40);W.group.add(sea);
  for(let i=0;i<22;i++){const c=new THREE.Group();c.position.set(rand(-80,80),rand(14,30),rand(-160,20));for(let k=0;k<4;k++)addMesh(new THREE.SphereGeometry(rand(2,4),10,8),MB(0xffffff,{transparent:true,opacity:0.85}),rand(-4,4),rand(-1,1),rand(-2,2),c).castShadow=false;W.group.add(c);}
  const whale=makeWhale(210);whale.g.position.set(0,-21.4,-70);   // спина кита — чуть ниже земли деревни: с облаков видно героев и облака
  wall(-10.2,-10,-100,12);wall(10,10.2,-100,12);wall(-10.2,10.2,12,12.2);wall(-10.2,-3.6,-100.2,-100);wall(3.6,10.2,-100.2,-100);wall(-10.2,-10,-168,-140);wall(10,10.2,-168,-140);wall(-10.2,10.2,-168.2,-168);
  const Z=makeZven();W.zven=Z;Z.pos.set(0,2.2,-2);
  const hut=(minx,maxx,minz,maxz,top,roof)=>{const m=W.group.children.length;box(minx,maxx,0,top,minz,maxz,wood,{occ:false});const w=maxx-minx,d=maxz-minz;const rg=new THREE.ConeGeometry(Math.max(w,d)*0.62,1.1,4);rg.rotateY(Math.PI/4);
    const r=addMesh(rg,M(roof||0xc8a04a),(minx+maxx)/2,top+0.55,(minz+maxz)/2);r.scale.set(w/Math.max(w,d),0.35,d/Math.max(w,d));fadeable(since(m));};
  const beds=(minx,maxx,minz,maxz)=>{for(let z=maxz-0.5;z>minz;z-=1.1){addMesh(new THREE.BoxGeometry(maxx-minx,0.16,0.6),soil,(minx+maxx)/2,0.08,z).receiveShadow=true;for(let x=minx+0.4;x<maxx;x+=0.7)addMesh(new THREE.ConeGeometry(0.12,0.35,5),M(0x4f9a3a),x,0.3,z);}};
  /* ---------- начало: хвост кита ---------- */
  ground(-10,10,-6,12,0,grass,skinSide);bell(0,6);
  for(let i=0;i<5;i++){addMesh(new THREE.CylinderGeometry(0.06,0.08,1.2,5),wood,-9.5+i*0.9,0.6,-5.6);}
  /* ---------- 1. двор: общая вода, мешать нечем ---------- */
  ground(-10,10,-24,-15,0,grass,skinSide);ground(-10,-8.5,-15,-6,0,grass,skinSide);ground(-4.5,10,-15,-6,0,grass,skinSide);ground(-8.5,-4.5,-11,-6,0,grass,skinSide);ground(-8.5,-4.5,-15,-11,-1.8,soil);
  for(let i=0;i<6;i++)box(-4.5-(i+1)*0.55,-4.5-i*0.55,-1.8,-0.26-i*0.26,-15,-14.1,M(0x8a6a4a),{occ:false});   // ступеньки погреба
  const n1=nutItem(-7.6,-1.3,-12);
  hut(-9.6,-5,-21.6,-17.5,2.9,0xc86a4a);hut(5,9.6,-13.6,-10,2.9,0xc8a04a);const n2=nutItem(7.3,3.4,-11.8);
  box(-10,10,0,2.3,-23.2,-22.2,wood,{occ:false});for(let x=-9.6;x<10;x+=0.8)addMesh(new THREE.ConeGeometry(0.1,0.3,4),wood,x,2.45,-22.7);
  const Z1=waterZone(-10,10,-22.2,-7,0,2.6,{shared:true,shell:{x:0,z:-7.6,y:0}});
  bell(0,-24.8);
  /* ---------- 2. огород и мачта: нужен порядок ---------- */
  ground(-10,10,-52,-24,0,grass,skinSide);
  box(-0.5,0.5,0,3.6,-50,-26,wood,{occ:false});
  // Игроку 1: мачта затонувшего корабля — в прилив доплыть до гнезда; в отлив — кувшин на дне и раки в грядках
  box(-9,-4,0,1.0,-45,-40,M(0x7a4a2a),{occ:false});addMesh(new THREE.BoxGeometry(5.4,0.5,1),M(0x5a3214),-6.5,0.8,-39.8).rotation.x=0.3;
  addMesh(new THREE.CylinderGeometry(0.16,0.2,4.2,8),M(0x6a4a2a),-6.5,1.9,-36);W.cyls.push({x:-6.5,z:-36,r:0.2,miny:-1,maxy:3.1,on:true});
  addMesh(new THREE.CylinderGeometry(0.9,0.8,0.25,12),M(0x8a5a2a),-6.5,3.18,-36);W.cyls.push({x:-6.5,z:-36,r:0.95,miny:3.0,maxy:3.3,on:true});
  const rope=addMesh(new THREE.CylinderGeometry(0.03,0.03,1.6,5),M(0xd8c090),-6.0,4.2,-36.4);const flag=addMesh(new THREE.BoxGeometry(0.8,0.5,0.03),M(0xc0302a),-6.1,5.3,-36);
  addMesh(new THREE.CylinderGeometry(0.05,0.05,2.4,5),M(0x6a4a2a),-6.5,4.4,-36);
  const mastLink=linkItem(-6.5,3.95,-35.3);
  beds(-9.5,-2,-33,-27.5);beds(-9.4,-1.5,-49.5,-46);
  const jug=new THREE.Group();jug.position.set(-3.2,0,-43);W.group.add(jug);addMesh(new THREE.CylinderGeometry(0.32,0.42,0.9,12),M(0xb8703a),0,0.45,0,jug);addMesh(new THREE.CylinderGeometry(0.2,0.28,0.3,12),M(0xb8703a),0,1.05,0,jug);
  const jugNut=nutItem(-3.2,0.5,-43);jugNut.locked=true;jugNut.g.visible=false;
  W.lifts.push({pos:new V3(-3.2,0,-43),active:()=>!F.jug&&Z2.level<=Z2.floor+0.3,onLift:(h)=>{F.jug=true;SFX.toss();anim(0.8,k=>{jug.position.y=Math.sin(k*Math.PI)*1.6;jug.rotation.z=k*2.4;jug.position.x=-3.2+k*1.2;});
    later(0.4,()=>{jugNut.locked=false;jugNut.g.visible=true;});bark(h,'potap','Тяжёлый! Как… э-э… как положено.',2);}});
  // Игроку 2: стена огорода — лаз у самой земли (в отлив Йоша пролезет), за стеной калитка; бочка, из которой прилив поднимет орешек
  box(1.2,5,0,3.6,-38,-37,wood);box(6,10,0,3.6,-38,-37,wood);box(5,6,0.8,3.6,-38,-37,wood);
  const wgate=makeGate(6.4,9.6,-37.5,'own','wicket',{h:3.2});
  beds(1.8,9.6,-48,-40);const plateG=plate(8,-45.5,'wicket');plateG.once=true;
  const gardenLink=linkItem(4,1.1,-48.8);
  const barrel=new THREE.Group();barrel.position.set(4.2,0,-30.5);W.group.add(barrel);barrelMesh(barrel,1.6,1.8,1.6);W.cyls.push({x:4.2,z:-30.5,r:0.8,miny:-1,maxy:1.8,on:true});
  hut(7,9.6,-33,-28,3.3,0xc86a4a);
  const Z2=waterZone(-10,10,-50,-25.5,0,3.0,{shared:true,shell:{x:0,z:-25.2,y:0}});
  const barrelNut=floatItem(nutItem(4.2,0.5,-30.5),Z2,0.45);
  const G2={open:false};const gm=W.group.children.length;const g2col=colBox(-10,10,0,3.4,-51.2,-50.4);const g2=new THREE.Group();W.group.add(g2);
  for(let x=-9.5;x<10;x+=1.0)addMesh(new THREE.BoxGeometry(0.8,3.2,0.3),wood,x,1.6,-50.8,g2);addMesh(new THREE.BoxGeometry(20,0.2,0.4),M(0x5a3214),0,2.6,-50.8,g2);fadeable(g2);
  const crabs=[crab(-7,-30,Z2,{pi:0}),crab(-3.8,-31.5,Z2,{pi:0}),crab(-6,-47.5,Z2,{pi:0}),crab(6,-42,Z2,{pi:1}),crab(3.2,-45.5,Z2,{pi:1})];
  const inBeds=e=>(e.pos.x>-9.6&&e.pos.x<-1.9&&((e.pos.z<-27.4&&e.pos.z>-33.1)||(e.pos.z<-45.9&&e.pos.z>-49.6)))||(e.pos.x>1.7&&e.pos.z<-39.9&&e.pos.z>-48.1);
  crabs.forEach(e=>{e.beds=inBeds;});
  bell(-3,-26.6);bell(3,-26.6);
  /* ---------- 3. дыхание кита: фонтан в прилив — до облаков ---------- */
  ground(-10,10,-72,-52,0,grass,skinSide);bell(0,-52.8);
  hut(-9.6,-6.4,-60,-56.5,2.9,0xc8a04a);hut(6.4,9.6,-66,-62.5,2.9,0xc86a4a);const n5=nutItem(8,3.45,-64.2);
  const Z3=waterZone(-10,10,-68,-54,0,2.6,{shared:true,shell:{x:0,z:-53.7,y:0}});
  const BH={x:0,z:-61};addMesh(new THREE.CylinderGeometry(1.2,1.4,0.12,18),M(0x2a3040),BH.x,0.03,BH.z).receiveShadow=true;const bhr=addMesh(new THREE.TorusGeometry(1.35,0.12,8,24),skinSide,BH.x,0.1,BH.z);bhr.rotation.x=Math.PI/2;
  const col=new THREE.Mesh(new THREE.CylinderGeometry(0.9,1.3,1,16,1,true),MB(0xe8f8ff,{transparent:true,opacity:0.55,side:THREE.DoubleSide,depthWrite:false}));col.position.set(BH.x,0,BH.z);col.visible=false;W.group.add(col);
  const bubs=[0,1].map(i=>{const m=new THREE.Mesh(new THREE.SphereGeometry(0.5,14,10),MB(0xe8fcff,{transparent:true,opacity:0.6,depthWrite:false}));m.position.set(BH.x-0.8+i*1.6,6.4+i*0.5,BH.z);W.group.add(m);return m;});
  const cloud=(minx,maxx,top,minz,maxz)=>{box(minx,maxx,top-0.4,top,minz,maxz,MB(0xffffff),{occ:false});for(let i=0;i<5;i++)addMesh(new THREE.SphereGeometry(rand(0.8,1.3),10,8),MB(0xffffff),rand(minx+0.5,maxx-0.5),top-0.2,rand(minz+0.5,maxz-0.5)).castShadow=false;};
  cloud(-2.6,2.6,7.9,-66.2,-62.4);cloud(0.8,5.2,7.0,-71.6,-67.6);const cloudLink=linkItem(0,8.6,-64.6);
  /* ---------- 4. деревня на горбу кита: пруд и щука (по щучьему велению) ---------- */
  // у пруда три ведра, в одном — щука. Совиный взор Пелагеи покажет, в каком; Потап поднимет ведро и выпустит щуку — только в полный
  // пруд (он общий: прилив просят вдвоём). Щука за свободу дарит слово: «По щучьему велению…» — и печка сама выезжает из избы.
  const hump=M(0x7ab060);
  ground(-10,10,-85,-72,4.5,hump,skinSide);ground(-10,10,-100,-95,4.5,hump,skinSide);ground(-10,-4,-95,-85,4.5,hump,skinSide);ground(4,10,-95,-85,4.5,hump,skinSide);ground(-4,4,-95,-85,2.4,soil);
  for(let i=0;i<5;i++)box(-4,-2.6,2.4,2.4+0.42*(i+1),-94.4+i*0.6,-93.8+i*0.6,wood,{occ:false});   // мостки из пруда
  bell(0,-76,4.5);
  const hut2=(minx,maxx,minz,maxz,top,roof)=>{const m=W.group.children.length;box(minx,maxx,4.5,4.5+top,minz,maxz,wood,{occ:false});const w=maxx-minx,d=maxz-minz;const rg=new THREE.ConeGeometry(Math.max(w,d)*0.62,1.1,4);rg.rotateY(Math.PI/4);
    const r=addMesh(rg,M(roof||0xc8a04a),(minx+maxx)/2,4.5+top+0.55,(minz+maxz)/2);r.scale.set(w/Math.max(w,d),0.35,d/Math.max(w,d));fadeable(since(m));};
  hut2(-9.8,-5.8,-84,-79,3.0,0xc86a4a);addMesh(new THREE.BoxGeometry(1.6,2.2,0.08),M(0x3a2a1a),-7.8,5.6,-84.05);   // изба Емели: дверь
  hut2(6,9.6,-99,-95.4,2.8,0xc8a04a);const nutHut=nutItem(7.8,8.1,-97.2);
  const PZ=waterZone(-4,4,-95,-85,2.4,4.3,{shared:true,floor:2.4,shell:{x:0,z:-84.4,y:4.5}});
  const LILY=[];for(let i=0;i<6;i++){const lp=addMesh(new THREE.CylinderGeometry(rand(0.35,0.55),rand(0.35,0.55),0.04,10),M(0x4f9a3a),rand(-1.6,3.4),2.45,rand(-90.6,-85.6));lp.castShadow=false;lp.userData.noBatch=true;LILY.push(lp);}   // кувшинки
  const PIKE_AT=Math.floor(Math.random()*3);
  const BUCK=[[-6.6,-87.6],[-6.6,-91.8],[6.6,-89.8]].map(([x,z],i)=>{const g=new THREE.Group();g.position.set(x,4.5,z);W.group.add(g);const wd=M(0x9a6a3c),ir=M(0x5a5a62);
    addMesh(new THREE.CylinderGeometry(0.5,0.42,0.9,12),wd,0,0.45,0,g);for(const y of[0.15,0.75])addMesh(new THREE.TorusGeometry(0.47,0.035,5,16),ir,0,y,0,g).rotation.x=Math.PI/2;
    addMesh(new THREE.CylinderGeometry(0.45,0.45,0.02,12),M(0x4aa0c8,{transparent:true,opacity:0.8}),0,0.84,0,g);const hdl=addMesh(new THREE.TorusGeometry(0.5,0.025,4,16,Math.PI),ir,0,0.9,0,g);
    const glow=addMesh(new THREE.TorusGeometry(0.62,0.06,6,20),MB(0xffe08a,{transparent:true,opacity:0}),0,0.95,0,g);glow.rotation.x=Math.PI/2;W.cyls.push({x,z,r:0.5,miny:3.5,maxy:5.4,on:true});
    return {g,x,z,pike:i===PIKE_AT,tipped:false,glow};});
  const pikeFish=pikeMesh22();pikeFish.g.visible=false;
  BUCK.forEach(b=>W.lifts.push({pos:new V3(b.x,4.5,b.z),active:()=>!F.pikeFree&&!b.tipped,onLift:h=>{
    if(!b.pike){b.tipped=true;SFX.splash();anim(0.6,k=>{b.g.rotation.z=1.4*smooth(k);});const f=new THREE.Group();f.position.set(b.x,5.2,b.z);W.group.add(f);const fm=M(0x9ab06a);addMesh(new THREE.SphereGeometry(0.16,8,6),fm,0,0,0,f).scale.set(0.6,0.8,1.6);
      anim(1.6,k=>{f.position.set(b.x+k*1.4,5.2+Math.abs(Math.sin(k*Math.PI*3))*0.6*(1-k),b.z);f.rotation.z=Math.sin(k*30)*0.6;if(k>=1)W.group.remove(f);});
      bark(h,'potap',['Окунь! Не та рыба.','Ёрш! Колючий, вредный.'][F.wrong=(F.wrong||0)+1,F.wrong%2],2,true);if(!F.owlHint){F.owlHint=true;tip(1,'Какое ведро? Совиный взор Пелагеи '+K(1,'skill')+' покажет — щука светится.',3.4);}return;}
    if(PZ.level<PZ.floor+1.4){floatText(new V3(b.x,6.6,b.z),'Пруд мелкий — щуке тесно! Сперва прилив','#9fe6ff');SFX.miss();if(!F.pondTold){F.pondTold=true;for(const p of[0,1])tip(p,'Пруд общий: просите прилив у ракушки '+K(p,'item')+' — вода прибудет у обоих.',3);}return;}
    pikeScene(b,h);}}));
  /* ---------- 5. печка Емели: по щучьему велению сама везёт по хребту кита ---------- */
  // садитесь на печку оба — и поехали. Раки встают поперёк дороги — печка стоит, пока не прогоните; дыхание кита гонит волну через
  // хребет — держись: щит или прыжок, иначе смоет назад, догоняй. Хребет узкий, по бокам — море.
  ground(-3.5,3.5,-140,-100,4.5,hump,skinSide);
  for(let z=-102;z>-140;z-=3.2)for(const s of[-1,1])addMesh(new THREE.ConeGeometry(0.28,0.9,5),skinSide,s*3.2,4.9,z+rand(-0.6,0.6)).rotation.z=-s*0.4;   // наросты по краю хребта
  const stove=stoveMesh22();const STV={g:stove.g,x:-7.8,z:-85.6,s:0,state:'home',col:colBox(-9.1,-6.5,4.5,5.5,-87.3,-83.9,false),wave:null,waveT:3.5,crabs:[],stopT:0,smoke:0};
  const PATH=[[0,-100.5],[0.9,-110],[-0.9,-120],[0.7,-130],[0,-137.5]],SEG=[];let PL=0;for(let i=0;i<PATH.length-1;i++){const a=PATH[i],b=PATH[i+1],L=Math.hypot(b[0]-a[0],b[1]-a[1]);SEG.push({a,b,L,s0:PL});PL+=L;}
  const pathAt=s=>{s=clamp(s,0,PL);for(const q of SEG)if(s<=q.s0+q.L){const k=(s-q.s0)/q.L;return [lerp(q.a[0],q.b[0],k),lerp(q.a[1],q.b[1],k),Math.atan2(q.b[0]-q.a[0],q.b[1]-q.a[1])];}const q=SEG[SEG.length-1];return [q.b[0],q.b[1],Math.atan2(q.b[0]-q.a[0],q.b[1]-q.a[1])];};
  const stovePlace=(x,z,ry)=>{const dx=x-STV.x,dz=z-STV.z;STV.x=x;STV.z=z;stove.g.position.set(x,4.5,z);stove.g.rotation.y=ry+Math.PI;
    const c=STV.col;c.minx=x-1.3;c.maxx=x+1.3;c.minz=z-1.7;c.maxz=z+1.7;if(dx||dz)for(const h of HEROES)if(h.groundRef===c&&h.grounded&&!h.cling){h.pos.x+=dx;h.pos.z+=dz;}};
  stovePlace(-7.8,-85.6,0);
  const nutSpine=nutItem(-2.6,5.2,-125);
  /* ---------- 6. голова кита: кит икает — внутри что-то золотое ---------- */
  ground(-10,10,-168,-140,4.5,M(0x6a7a96),skinSide);const endLink=linkItem(0,5.6,-156);bell(0,-142,4.5);
  for(let i=0;i<8;i++)addMesh(new THREE.CylinderGeometry(0.04,0.04,2.4,5),M(0x3a4050),rand(-9,9),5.5,rand(-166,-160)).rotation.z=rand(-0.5,0.5);   // усы кита
  const BH2={x:0,z:-149};addMesh(new THREE.CylinderGeometry(0.9,1.1,0.12,16),M(0x2a3040),BH2.x,4.53,BH2.z).receiveShadow=true;
  const col2=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.9,1,14,1,true),MB(0xe8f8ff,{transparent:true,opacity:0.5,side:THREE.DoubleSide,depthWrite:false}));col2.position.set(BH2.x,4.5,BH2.z);col2.visible=false;W.group.add(col2);
  const glint=new THREE.Mesh(new THREE.OctahedronGeometry(0.22),MB(0xffe08a));glint.visible=false;W.group.add(glint);
  /* ---------- сюжет и дыхание ---------- */
  const B={t:0,popped:[false,false]};const fglint=new THREE.Mesh(new THREE.OctahedronGeometry(0.16),MB(0xffe08a));fglint.visible=false;W.group.add(fglint);   // в фонтане мелькает золото
  function bylina(){const T=HERO;
    play({dur:12.4,fov:48,shots:[shot(0,[2.6,1.9,3.2],[T.potap.pos.x,1.3,T.potap.pos.z]),shot(6,[0,4,10],[0,1,0]),shot(8.2,[1.8,1.8,2.2],[T.potap.pos.x,1.4,T.potap.pos.z])],
      says:[[0.3,2.6,'potap','Как говаривал Илья…'],[3.1,2.4,'potap','Илья… какой Илья?'],[5.8,2.4,null,'<i>Потап молчит — долго, тяжело.</i>',true],[8.3,2.8,'potap','Забыл. Совсем забыл, как сказка эта начинается…'],[11.1,1.4,null,'<i>Никто не смеётся. Грустно всем немножко.</i>',true]],
      events:[{t:0,fn:()=>{T.potap.face=Math.PI*0.2;}},{t:5.8,fn:()=>{T.potap.face=Math.PI;}}],end:()=>{later(0.6,()=>say('zven','Рыба-кит! Тише — спит он. Вода тут одна на всех!',2.8,true));}});}
  W.onWater=(z,st)=>{if(z===Z2&&st==='high'&&!F.hiTold){F.hiTold=true;bark(HERO.pelageya,'pelageya','Погоди, я пройду… Всё, давай, твой черёд!',2.4);}};
  W.updates.push(dt=>{
    // ворота к фонтану: открываются, когда оба сделали своё
    if(!G2.open&&F.mast&&F.garden){G2.open=true;SFX.gate();SFX.ok();g2col.on=false;anim(1.2,k=>{g2.position.y=-3.4*smooth(k);});banner('Ворота открыты!','#ffffff',1.8,'договорились — и прошли вдвоём');}
    if(plateG.done&&!F.garden){F.garden=true;wgate.latched=true;SFX.ok();floatText(new V3(8,1.8,-45.5),'Калитка открыта!','#ffffff');}
    // дыхание кита: цикл 10 с — два пузыря-отсчёта, выдох 3 с
    B.t=(B.t+dt)%10;const t=B.t,hi=Z3.level>Z3.floor+1.2,wl=Math.max(0,Z3.level);
    bubs.forEach((m,i)=>{const pop=4.5+i;const vis=t<pop;if(vis&&B.popped[i]&&t<1)B.popped[i]=false;m.visible=vis;if(vis)m.scale.setScalar(Math.min(1,t/1.2)*(1+0.06*Math.sin(G.time*6)));
      if(!vis&&!B.popped[i]){B.popped[i]=true;tone(1400-i*300,0.12,'sine',0.25,500);burst(m.position.clone(),0xe8fcff,10,3);}});
    const ex=t>6.5&&t<9.5;col.visible=ex;fglint.visible=ex&&hi;if(ex){const H=hi?6.4:1.2,k=Math.min(1,(t-6.5)/0.3)*(t>9.2?(9.5-t)/0.3:1);col.scale.set(1,Math.max(0.01,H*k),1);col.position.y=wl+H*k/2;fglint.position.set(BH.x+Math.sin(G.time*5)*0.3,wl+H*k*0.75,BH.z);fglint.rotation.y+=0.2;
      if(!B.sfx){B.sfx=true;SFX.whoosh();SFX.splash();}
      for(const h of HEROES){if(h.cling||(h.launchT&&G.time-h.launchT<1.2))continue;if(hd(h.pos,BH)<1.5&&h.pos.y<wl+0.6&&h.grounded){h.launchT=G.time;h.vel.y=Math.sqrt(2*GRAV*(hi?6.2:1.1));h.vel.z=hi?-(-62.4-1.4-h.pos.z)/-1.05:0;h.vel.x=-h.pos.x*0.9;h.grounded=false;h.groundRef=null;h.tossT=1.4;h.aimT=hi?1.1:0;h.following=false;
        floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),hi?'До облаков!':'Плюх…',hi?'#ffffff':'#cfe8ff');if(!hi&&!F.lowTold){F.lowTold=true;tip(h.player,'В отлив фонтан еле плещет. Прилив сыграйте, как кит выдыхает!',3);}}}}
    else B.sfx=false;
    if(!F.out&&F.headSeen&&!G.cine&&[0,1].every(pi=>active(pi).pos.z<-150&&active(pi).pos.y>4)&&[0,1].some(pi=>active(pi).pos.z<-160)){F.out=true;finishLevel();}
    whale.tail.rotation.x=Math.sin(G.time*0.5)*0.05;sea.position.y=-3.2+Math.sin(G.time*0.6)*0.1;flag.rotation.y=Math.sin(G.time*2)*0.3;});
  W.hittables.push({pos:new V3(-6.5,3.3,-36),r:1.0,push:false,alive:()=>!F.mast,onHit:h=>{if(h.pos.y<2.9)return;F.mast=true;SFX.latch();SFX.ok();anim(0.8,k=>{rope.scale.y=1-0.5*k;flag.position.y=5.3-2*k;});
    banner('Сходни опущены!','#ffffff',1.6,'верёвку дёрнули — ворота наполовину открыты');}});
  /* ---------- щука, печка, икота ---------- */
  function pikeScene(b,h){F.pikeFree=true;const P=HERO.potap;
    play({dur:12.6,fov:48,shots:[shot(0,[b.x+2.6,6.6,b.z+3.2],[b.x,5.2,b.z]),shot(3.6,[3.4,6.4,-82.6],[0,3.6,-90]),shot(8.4,[-3.6,6.4,-80.8],[-7.8,5.6,-85])],
      says:[[0.3,3,null,'<i>Потап ведро поднимает — а в нём щука, зубастая, с венчиком.</i>',true],[3.6,4.4,'shchuka','Отпусти меня в пруд! Слово тебе дам: скажешь «По щучьему велению, по моему хотению» — всё сделается.'],
        [8.3,3.8,'potap','По щучьему велению, по моему хотению — ступай, печка, сама к голове кита!']],
      events:[{t:0.5,fn:()=>{anim(1.2,k=>{b.g.position.y=4.5+Math.sin(k*Math.PI)*0.8;b.g.rotation.z=k*1.1*(b.x<0?-1:1);});}},
        {t:1.6,fn:()=>{pikeFish.g.visible=true;const a=new V3(b.x,5.6,b.z),to=new V3(0,PZ.level,-90);anim(1.3,k=>{pikeFish.g.position.lerpVectors(a,to,k);pikeFish.g.position.y+=Math.sin(k*Math.PI)*2.2;pikeFish.g.rotation.x=k*3;});
          later(1.3,()=>{SFX.splash();for(let i=0;i<10;i++)burst(new V3(rand(-1,1),PZ.level+0.3,-90+rand(-1,1)),0xcff8ff,3,3);pikeFish.g.rotation.x=0;});}},
        {t:3.4,fn:()=>{anim(0.8,k=>{pikeFish.g.position.y=PZ.level+0.3+k*0.5;});}},
        {t:9.4,fn:()=>{SFX.ok();STV.state='out';}}],
      tick:(t)=>{if(t>3.4){pikeFish.g.rotation.z=Math.sin(t*3)*0.12;pikeFish.tail.rotation.y=Math.sin(t*9)*0.4;}},
      end:()=>{STV.state=STV.state==='home'?'out':STV.state;anim(1.2,k=>{pikeFish.g.position.y=PZ.level+0.8-k*1.6;});later(1.3,()=>{pikeFish.g.visible=false;});
        banner('По щучьему велению!','#9fe6ff',2.6,'печка сама едет к хребту — садитесь на неё оба');}});}
  function headScene(){F.headSeen=true;const T=HERO;
    play({dur:13,fov:48,shots:[shot(0,[4,7.2,-140],[0,5,-150]),shot(4.6,[1.8,5.6,-145],[0,6.6,-149]),shot(8.4,[-2.4,6,-144],[T.yosha.pos.x,5.2,T.yosha.pos.z])],
      says:[[0.3,2.4,null,'<i>Кит вздыхает — и вдруг: «Ик!»</i>',true],[3.0,1.6,'potap','Икает, бедный!'],[4.8,3.4,null,'<i>Из дыры в голове — струйка, а в ней что-то золотое блеснуло.</i>',true],
        [8.4,3,'yosha','Он что-то проглотил! Золотое, блестящее!'],[11.0,1.8,'zven','Вот и икает. Запомним!']],
      events:[{t:2.2,fn:()=>hiccup()},{t:5,fn:()=>{col2.visible=true;glint.visible=true;anim(2.4,k=>{const H=Math.sin(k*Math.PI)*4;col2.scale.set(1,Math.max(0.01,H),1);col2.position.y=4.5+H/2;glint.position.set(BH2.x+Math.sin(k*9)*0.2,4.6+H*0.9,BH2.z);glint.rotation.y+=0.3;});
          later(2.5,()=>{col2.visible=false;glint.visible=false;});SFX.whoosh();}}]});}
  function hiccup(){SFX.thud();shakeAll(0.06,0.35);tone(140,0.25,'sine',0.25,60);for(const h of HEROES){if(h.grounded&&!h.cling&&h.pos.y>4){h.vel.y=Math.max(h.vel.y,4.6);h.grounded=false;}}
    floatText(new V3(0,8,active(0).pos.z-2),'Ик!','#cfe8ff');}
  W.updates.push(dt=>{
    for(const lp of LILY)lp.position.y=Math.max(2.45,PZ.level+0.02);
    // ведро со щукой светится под Совиным взором
    for(const b of BUCK){b.glow.material.opacity=b.pike&&W.owlT>0&&!F.pikeFree?0.6+0.35*Math.sin(G.time*8):0;if(b.pike&&W.owlT>0&&!F.pikeFree&&Math.random()<dt*8)burst(new V3(b.x,5.6,b.z),0xffe08a,2,1.2,0.5);}
    // печка
    if(STV.state==='out'){const to=pathAt(0);const dx=to[0]-STV.x,dz=to[1]-STV.z,d=Math.hypot(dx,dz);if(d<0.05){STV.state='wait';}else{const st=Math.min(d,3.4*dt);stovePlace(STV.x+dx/d*st,STV.z+dz/d*st,Math.atan2(dx,dz));}}
    const ctl=[0,1].filter(pi=>!G.solo||pi===G.soloPi).map(pi=>active(pi));const aboard=h=>h.groundRef===STV.col;
    if(STV.state==='wait'&&ctl.every(aboard)){STV.state='ride';SFX.ok();banner('Печка, поезжай!','#ffd9a0',1.8,'раки на дороге — гоните их; волна — щит '+K(0,'guard')+' / '+K(1,'guard')+' или прыжок');
      STV.crabs=[crab(-1.6,-111,null,{y:4.5,leash:2.4}),crab(1.4,-127,null,{y:4.5,leash:2.4})];for(const e of STV.crabs)e.stove=true;}
    if(STV.state==='ride'){const p0=pathAt(STV.s);const block=STV.crabs.find(e=>e.alive&&Math.hypot(e.pos.x-p0[0],e.pos.z-p0[1])<3.6&&e.pos.z<p0[1]+0.5);
      if(block){if(STV.stopT<=0)floatText(new V3(p0[0],7.4,p0[1]),'Рак дорогу загородил!','#ffb0a0');STV.stopT=1;}else STV.stopT=Math.max(0,STV.stopT-dt);
      if(!block)STV.s=Math.min(PL,STV.s+2.3*dt);const p=pathAt(STV.s);stovePlace(p[0],p[1],p[2]);
      // волна дыхания кита: знак за 1,2 с, потом гребень поперёк печки
      STV.waveT-=dt;if(STV.waveT<=0&&!STV.wave&&STV.s<PL-3){STV.waveT=5.2;const sd=Math.random()<0.5?-1:1;const m=new THREE.Mesh(new THREE.BoxGeometry(0.8,0.9,3.8),MB(0xe8fbff,{transparent:true,opacity:0}));m.renderOrder=6;W.group.add(m);
        STV.wave={sd,t:-1.2,m};SFX.wave();floatText(new V3(p[0]+sd*2.6,7.6,p[1]),'Волна! Держись!','#cff8ff');}
      if(STV.wave){const w=STV.wave;w.t+=dt;const x=p[0]+w.sd*(4.2-w.t*7.5);w.m.position.set(x,5.95,p[1]);w.m.material.opacity=w.t<0?0.25+0.2*Math.sin(G.time*16):0.75;
        if(w.t>=0)for(const h of HEROES){if(!aboard(h)||h.cling||h.guard)continue;if(Math.abs(h.pos.x-x)<0.65&&h.pos.y<5.5+0.85){h.vel.z=6.5;h.vel.y=5;h.vel.x=0;h.grounded=false;h.groundRef=null;SFX.splash();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Смыло! Догоняй!','#cff8ff');}}
        if(w.t>1.2){W.group.remove(w.m);STV.wave=null;}}
      STV.smoke-=dt;if(STV.smoke<=0){STV.smoke=0.25;burst(stove.chim.getWorldPosition(new V3()),0xd8d8d8,2,1.2,0.9);}
      if(STV.s>=PL&&!STV.crabs.some(e=>e.alive)){STV.state='done';F.stove='done';SFX.ok();banner('Приехали!','#ffd9a0',1.8,'голова кита — вон она');if(STV.wave){W.group.remove(STV.wave.m);STV.wave=null;}}}
    stove.face.rotation.z=STV.state==='ride'?Math.sin(G.time*6)*0.05:0;
    // голова: кит икает
    if(!F.headSeen&&F.stove==='done'&&[0,1].some(pi=>active(pi).pos.z<-143&&active(pi).pos.y>4))headScene();
    if(F.headSeen&&!G.cine){F.hicT=(F.hicT||7)-dt;if(F.hicT<=0){F.hicT=7+Math.random()*3;hiccup();}}});
  W.onOwl=h=>{if(!F.pikeFree&&hd(h.pos,{x:0,z:-89})<14)later(0.3,()=>floatText(new V3(BUCK[PIKE_AT].x,6.4,BUCK[PIKE_AT].z),'Тут щука!','#e7c3ff'));};
  /* ---------- рисунки кнопок: просьба над раковиной видна обоим ---------- */
  const T=HERO,shellAt=z=>()=>z.shell.g.position.clone().add(new V3(0,2.6,0));
  const reqNote=z=>()=>{const r=z.req;if(!r)return '';return '<b style="color:'+PCSS[r.pi]+'">'+active(r.pi).d.name+'</b> просит '+(r.want==='high'?'прилив':'отлив')+(r.busy?' · ждём, пока все приземлятся':'')+'<span class="rq"><i style="width:'+Math.round(Math.min(1,r.t/2)*100)+'%"></i></span>';};
  for(const z of[Z1,Z2,Z3,PZ])for(const v of[0,1])prompt(v,'label',shellAt(z),()=>!!z.req,reqNote(z));
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>inZone(Z1,h(),0.3)&&Z1.state==='low'&&!Z1.req&&h().pos.z<-15,'прилив — через забор');
    prompt(pi,'item',()=>headOf(h()),()=>inZone(Z3,h(),0.3)&&Z3.state==='low'&&!Z3.req&&h().pos.y<1,'прилив, когда выдох');
    prompt(pi,'roll',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig==='red'&&e.help));
    prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig!=='red'&&e.help));
    prompt(pi,'attack',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&hd(e.pos,h().pos)<5&&(e.state==='broken'||e.open>0)));}
  prompt(0,'item',()=>headOf(active(0)),()=>!F.mast&&inZone(Z2,active(0),0.3)&&Z2.state==='low'&&!Z2.req&&active(0).pos.x<0,'прилив — к мачте');
  prompt(0,'attack',()=>headOf(active(0)),()=>!F.mast&&active(0).pos.y>2.9&&hd(active(0).pos,{x:-6.5,z:-36})<1.6,'дёрни верёвку');
  prompt(0,'skill',()=>headOf(T.potap),()=>!F.jug&&T.potap.active&&hd(T.potap.pos,{x:-3.2,z:-43})<2.3&&Z2.level<0.3,'поднять кувшин');
  prompt(0,'swap',()=>headOf(T.potap),()=>!F.jug&&T.proshka.active&&hd(T.proshka.pos,{x:-3.2,z:-43})<3&&Z2.level<0.3,'Потап поднимет');
  prompt(1,'item',()=>headOf(active(1)),()=>!F.garden&&inZone(Z2,active(1),0.3)&&Z2.state==='high'&&!Z2.req&&active(1).pos.x>0&&active(1).pos.z>-37,'отлив — к лазу');
  prompt(1,'swap',()=>headOf(T.yosha),()=>!F.garden&&T.pelageya.active&&T.pelageya.pos.z<-33&&T.pelageya.pos.z>-37.5&&T.pelageya.pos.x>0,'Йоша пролезет');
  prompt(1,'skill',()=>headOf(T.pelageya),()=>!F.pikeFree&&T.pelageya.active&&hd(T.pelageya.pos,{x:0,z:-89.6})<10&&T.pelageya.pos.y>4,'где щука?');
  prompt(0,'skill',()=>headOf(T.potap),()=>!F.pikeFree&&T.potap.active&&BUCK.some(b=>!b.tipped&&hd(b,T.potap.pos)<2.3),'поднять ведро');
  prompt(0,'swap',()=>headOf(T.potap),()=>!F.pikeFree&&T.proshka.active&&BUCK.some(b=>!b.tipped&&hd(b,T.proshka.pos)<3),'Потап поднимет');
  for(const pi of[0,1]){const h=()=>active(pi);prompt(pi,'item',()=>headOf(h()),()=>inZone(PZ,h(),1.2)&&PZ.state==='low'&&!PZ.req&&!F.pikeFree&&h().pos.y>4,'прилив — пруд наполнить');
    prompt(pi,'jump',()=>headOf(h()),()=>STV.state==='wait'&&h().groundRef!==STV.col&&hd(h().pos,STV)<4,'на печку!');
    prompt(pi,'guard',()=>headOf(h()),()=>!!STV.wave&&STV.wave.t<0&&h().groundRef===STV.col,'держись!');}
  /* ---------- задачи ---------- */
  const g1=pi=>O(()=>'Вода тут одна на двоих! У ракушки посерёдке сыграй '+K(pi,'item')+' — над ней просьба твоя встанет.<br>Через две секунды вода у обоих сменится. Прилив — и через забор плыви, пока не отстанет.',
      ()=>active(pi).pos.z<-23.4,()=>[Z1.shell.g]);
  W.objectives[0]=[O('Рыба-кит поперёк моря спит.<br>На спине у него — деревня с огородами стоит.',()=>active(0).pos.z<-7,()=>[]),g1(0),
    O(()=>'Мачта из воды торчит. В прилив до гнезда доплыви, верёвку дёрни '+K(0,'attack')+'.<br>А другу нужен отлив — договоритесь, кто первый, мой друг.',()=>F.mast,()=>[flag],()=>({kind:active(0).kind,action:'walk',from:new V3(-4,3.0,-33),to:new V3(-6.2,3.3,-35.6)})),
    O(()=>'Пока у друга отлив — на дне кувшин, Потап его поднимет '+K(0,'skill')+'. В грядках — раки, берегись!<br>Ворота откроются, как оба своё сделают, — не торопись.',()=>G2.open,()=>[jug,g2]),
    O(()=>'Фонтан кита! Лопнут два пузыря — кит выдохнет.<br>Встаньте на дыру в спине, прилив '+K(0,'item')+' — до облаков подкинет, как вздохнет.',()=>active(0).pos.y>6.5||active(0).pos.z<-72,()=>[bhr,bubs[0]]),
    O(()=>'Деревня на горбу кита. У пруда три ведра, в одном — щука; Пелагея Совиным взором покажет, в каком.<br>Потап поднимет ведро '+K(0,'skill')+' — да пруд сперва наполните: прилив '+K(0,'item')+'.',
      ()=>!!F.pikeFree,()=>F.pikeFree?[]:BUCK.filter(b=>!b.tipped).map(b=>b.g).concat(PZ.state==='low'?[PZ.shell.g]:[])),
    O(()=>'По щучьему велению — печка сама едет к голове кита! Садитесь на печку оба '+K(0,'jump')+'.<br>Раки на дороге — гоните их '+K(0,'attack')+'; волна — щит '+K(0,'guard')+' или прыжок. Смыло — догоняй!',()=>F.stove==='done',()=>[stove.g]),
    O('Голова кита. Бери звено — и дальше в путь!',()=>false,()=>[endLink.g])];
  W.objectives[1]=[O('Рыба-кит поперёк моря спит.<br>На спине у него — деревня с огородами стоит.',()=>active(1).pos.z<-7,()=>[]),g1(1),
    O(()=>'Огород за стеной. Отлив '+K(1,'item')+' сделай — Йоша в лаз у земли пролезет.<br>За стеной — плита-калитка, она путь отрежет да и отверзет.',()=>F.garden,()=>[plateG.g],()=>({kind:'yosha',action:'walk',from:new V3(5.5,0,-35),to:new V3(5.5,0,-40)})),
    O(()=>'Сделай прилив — вода орешек из бочки подымет. Забери.<br>Ворота откроются, как оба своё сделают, — смотри.',()=>G2.open,()=>[barrel,g2]),
    O(()=>'Фонтан кита! Лопнут два пузыря — кит выдохнет.<br>Встаньте на дыру в спине, прилив '+K(1,'item')+' — до облаков подкинет, как вздохнет.',()=>active(1).pos.y>6.5||active(1).pos.z<-72,()=>[bhr,bubs[0]]),
    O(()=>'Деревня на горбу кита. У пруда три ведра, в одном — щука. Совиным взором '+K(1,'skill')+' посмотри, в каком: светится!<br>Потап поднимет ведро — да пруд сперва наполните: прилив '+K(1,'item')+'.',
      ()=>!!F.pikeFree,()=>F.pikeFree?[]:BUCK.filter(b=>!b.tipped).map(b=>b.g).concat(PZ.state==='low'?[PZ.shell.g]:[])),
    O(()=>'По щучьему велению — печка сама едет к голове кита! Садитесь на печку оба '+K(1,'jump')+'.<br>Раки на дороге — гоните их '+K(1,'attack')+'; волна — щит '+K(1,'guard')+' или прыжок. Смыло — догоняй!',()=>F.stove==='done',()=>[stove.g]),
    O('Голова кита. Бери звено — и дальше в путь!',()=>false,()=>[endLink.g])];
  W.tipZones.push({cond:(pi,h)=>h.grounded&&h.groundRef&&h.groundRef.water,text:pi=>'Ты плывёшь. Вода общая — сменить её можно лишь вместе.<br>Попроси друга: сыграй '+K(pi,'item')+' — и будет честь по чести.'},
    {cond:(pi,h)=>h.pos.y>6&&h.pos.z>-74,text:pi=>'Облака! С облака на облако прыгай — и к киту на горб!'},
    {cond:(pi,h)=>STV.state==='wait'&&h.groundRef!==STV.col&&hd(h.pos,STV)<6,text:pi=>'Печка ждёт! Запрыгни на неё '+K(pi,'jump')+' — поедем, как только оба сядете.'},
    {cond:(pi,h)=>STV.state==='ride'&&h.groundRef!==STV.col&&h.pos.z<-100,text:pi=>'Смыло с печки? Догоняй и запрыгивай '+K(pi,'jump')+'! А раки на дороге — бей '+K(pi,'attack')+'.'});
  W.spawns=[[new V3(-3,0,6),new V3(-5,0,7)],[new V3(3,0,6),new V3(5,0,7)]];W.startAct=[0,0];
  W.pauseLine='Рыба-кит: одна вода на двоих. Раковина посерёдке — общая:<br>Гусли просьбу кладут — через две секунды вода меняется у обоих, сообща.<br>Фонтан кита в прилив до облаков подкинет, а на горбу — щука в ведре:<br>по щучьему велению печка сама довезёт к голове кита!';
  W.onStart=()=>{later(0.6,bylina);};
  // для ботов: перенос к участку и состояние
  W.dbg22=()=>({F,PZ,BUCK,PIKE_AT,STV,PL,stove,Z3,endLink,pathAt});
  W.warp22=(where)=>{F.mast=true;F.garden=true;G2.open=true;g2col.on=false;const P={village:[0,4.5,-75],ride:[0,4.5,-97],head:[0,4.5,-141]}[where];
    if(where!=='village'){F.pikeFree=true;BUCK.forEach(b=>{b.tipped=true;});STV.state='wait';const p=pathAt(0);stovePlace(p[0],p[1],p[2]);}
    if(where==='head'){STV.state='done';F.stove='done';STV.s=PL;const p=pathAt(PL);stovePlace(p[0],p[1],p[2]);STV.crabs=[];}
    HEROES.forEach((h,i)=>{placeOnGround(h,P[0]+(i%2?1.2:-1.2)*(i>1?2:1),P[2]+(i>1?0.8:0),P[1]);h.following=false;});for(const pi of[0,1])players[pi].cp.set(P[0],P[1],P[2]);snapCams();return W.dbg22();};
  flushDecor();};
