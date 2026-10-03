/* ============================== МИР 2 · ПОДВОДНЫЙ КИТЕЖ · 2-1 «ГУСЛИ САДКО» ============================== */
// ввод гуслей: прилив и отлив на своём участке · лодки до крыш, подвалы с орешками, дом-колодец «как лифт» · щуки-мороки: синий сигнал
function build21(){
  W.zvenAway=true;W.world=2;W.bubbles=true;setTheme('kitezh');W.name='2-1 · «Гусли Садко»';W.sub='Подводный Китеж · прилив и отлив';W.camX=10;const F=W.flags;F.stage='walk';
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.gusli=false;W.fallY=-14;W.gusliLocked='Гусли Садко — у Садко на площади ждут.';
  kitezhDecor(-172,10);
  const stone=M(0xb8b4a4),pave=M(0x9aa094),wallM=M(0xe0d6c0);
  wall(-11.2,-11,-172,9);wall(11,11.2,-172,9);wall(-11.2,11.2,9,9.2);wall(-11.2,11.2,-172.2,-172);
  /* ---------- А. дно у въезда ---------- */
  ground(-11,11,-8,9,0,pave);
  for(const[x,z]of[[-8.4,-2],[8.4,-4]]){addMesh(new THREE.CylinderGeometry(0.45,0.55,3.4,10),stone,x,1.7,z);W.cyls.push({x,z,r:0.55,miny:-1,maxy:3.4,on:true});}
  nutItem(9.6,0.6,-5.4);
  bell(0,4);
  const Z=makeZven();W.zven=Z;Z.pos.set(0,2.2,-2);
  /* ---------- Б. площадь: Садко и фонтан ---------- */
  ground(-11,-2.4,-28,-8,0,pave);ground(2.4,11,-28,-8,0,pave);ground(-2.4,2.4,-15.6,-8,0,pave);ground(-2.4,2.4,-28,-20.4,0,pave);
  ground(-2.4,2.4,-20.4,-15.6,-2.2,M(0x5a7a74));
  for(const[a,b,c,d]of[[-2.7,2.7,-15.6,-15.3],[-2.7,2.7,-20.7,-20.4],[-2.7,-2.4,-20.4,-15.6],[2.4,2.7,-20.4,-15.6]])box(a,b,0,0.3,c,d,stone,{occ:false});
  for(let i=0;i<7;i++)box(1.5,2.4,-2.2,-1.886+i*0.314,-16.8-i*0.6,-16.2-i*0.6,stone,{occ:false});   // ступеньки из чаши
  addMesh(new THREE.CylinderGeometry(0.45,0.55,2.9,10),stone,0,-0.75,-18);W.cyls.push({x:0,z:-18,r:0.5,miny:-3,maxy:0.7,on:true});
  {const f=new THREE.Group();f.position.set(0,0.7,-18);W.group.add(f);const fm=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4});const b=addMesh(new THREE.SphereGeometry(0.3,10,8),fm,0,0.3,0,f);b.scale.set(0.6,0.8,1.4);
    const t=addMesh(new THREE.ConeGeometry(0.22,0.35,4),fm,0,0.55,-0.4,f);t.rotation.x=-1.2;}
  const fz=waterZone(-2.4,2.4,-20.4,-15.6,-2.2,0.25,{floor:-2.2,shell:{x:-3.1,z:-15.0,y:0},curb:false});
  floater(fz,-2.3,-0.62,-19.3,-16.7,0.3,{rest:-2.2,draft:0.15,build:boardMesh});floater(fz,-1.1,1.3,-20.3,-19.4,0.3,{rest:-2.2,draft:0.15,build:boardMesh});
  const fLink=linkItem(0,1.4,-18);
  box(-7.8,-5.2,0,0.45,-15.4,-14.1,stone,{occ:false});
  const sadko=makeSadko();sadko.g.position.set(-6.5,0.45,-14.8);sadko.g.rotation.y=1.15;W.cyls.push({x:-6.5,z:-14.8,r:0.6,miny:-1,maxy:2.2,on:true});
  for(const[x,z]of[[-9.5,-10],[9.5,-10],[-9.5,-26],[9.5,-26]]){addMesh(new THREE.CylinderGeometry(0.35,0.4,4.4,10),stone,x,2.2,z);W.cyls.push({x,z,r:0.42,miny:-1,maxy:4.4,on:true});}
  bell(-4.2,-9.4);
  /* ---------- В. терем-библиотека: книга без страниц ---------- */
  ground(-11,11,-44,-28,0,pave);
  const tm=W.group.children.length;box(-11,-6.5,0,5.2,-43,-30,wallM);box(6.5,11,0,5.2,-43,-30,wallM);
  addMesh(new THREE.BoxGeometry(14,0.4,14),M(0x3f7a5a),0,5.4,-36.5).castShadow=false;fadeable(since(tm));
  for(const x of[-5,5])for(const z of[-31,-35,-39,-42.5]){addMesh(new THREE.CylinderGeometry(0.3,0.36,5.2,10),M(0xd8b060),x,2.6,z);W.cyls.push({x,z,r:0.36,miny:-1,maxy:5.2,on:true});}
  for(let i=0;i<20;i++)addMesh(new THREE.BoxGeometry(0.3,rand(0.5,0.8),0.16),M([0xa03a2a,0x3a6a8a,0x6a8a3a,0xc0902a][i%4]),6.35,1+Math.floor(i/10)*1.3,-31+(i%10)*1.15);
  const curtain=new THREE.Mesh(new THREE.PlaneGeometry(11.5,4.4),MB(0x7ad8ff,{transparent:true,opacity:0.2,side:THREE.DoubleSide,depthWrite:false}));curtain.rotation.y=Math.PI/2;curtain.position.set(-6.4,2.6,-36.5);W.group.add(curtain);
  const shadow=new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.55,3.4,10),MB(0x0a1a20,{transparent:true,opacity:0,depthWrite:false}));shadow.position.set(-7.6,1.7,-39);W.group.add(shadow);
  box(-0.45,0.45,0,1.0,-36.95,-36.05,M(0x6a4a2a),{occ:false});
  const book=new THREE.Group();book.position.set(0,1.0,-36.5);W.group.add(book);const cov=M(0x6a2a1a);
  addMesh(new THREE.BoxGeometry(0.72,0.06,0.95),cov,0,0.03,0,book);const front=new THREE.Group();front.position.set(-0.36,0.3,0);book.add(front);addMesh(new THREE.BoxGeometry(0.72,0.06,0.95),cov,0.36,0,0,front);
  addMesh(new THREE.BoxGeometry(0.06,0.3,0.95),cov,-0.37,0.15,0,book);
  const spine=new THREE.Mesh(new THREE.PlaneGeometry(0.95,0.3),new THREE.MeshBasicMaterial({map:scratchTex('Не про меня',512,160,'#e8d8b0','#5a2a1a')}));spine.rotation.y=-Math.PI/2;spine.position.set(-0.405,0.15,0);book.add(spine);
  for(let i=0;i<5;i++)addMesh(new THREE.BoxGeometry(0.06,0.02,0.2),M(0xf4ecd8),-0.3,0.07+i*0.004,-0.35+i*0.18,book);   // обрывки страниц у корешка
  bell(0,-29.6);
  /* ---------- Г. улица участков: у каждого — своя сторона ---------- */
  {const dm=W.group.children.length;box(-1.2,1.2,0,5.5,-76,-44,M(0xd0c8b0));for(let z=-46;z>-76;z-=4)addMesh(new THREE.CylinderGeometry(0.25,0.3,0.9,8),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.3}),0,5.95,z);fadeable(since(dm));}
  const SD=[];
  for(const s of[-1,1]){const pi=s<0?0:1,X=x=>s*x,BX=(a,b)=>s>0?[a,b]:[-b,-a];
    const gnd=(a,b,c,d,top,mat)=>{const q=BX(a,b);return ground(q[0],q[1],c,d,top,mat);},bx=(a,b,y0,y1,c,d,mat,o)=>{const q=BX(a,b);return box(q[0],q[1],y0,y1,c,d,mat,o);};
    // участок А — причал: лодки у стены домов, подвал с орешком и щукой
    gnd(1.2,11,-46.5,-44,0,pave);gnd(1.2,11,-56,-51.5,0,pave);gnd(1.2,5,-51.5,-46.5,0,pave);gnd(9.6,11,-51.5,-46.5,0,pave);gnd(5,9.6,-51.5,-46.5,-2.2,M(0x4a6660));
    for(let i=0;i<6;i++)bx(5+i*0.6,5.6+i*0.6,-2.2,-0.314-i*0.314,-51.5,-50.4,stone,{occ:false});
    const nutPit=nutItem(X(9.0),-1.7,-48);
    const zA=waterZone(...BX(1.2,11),-56,-44,0,2.8,{shell:{x:X(2.0),z:-44.7,y:0}});
    floater(zA,...BX(2.1,4.3),-51.2,-46.9,0.7,{rest:0,draft:0.4});const boat2=floater(zA,...BX(3.0,5.4),-55.95,-52.0,0.7,{rest:0,draft:0.4});
    const hm=W.group.children.length;bx(1.2,11,0,3.44,-60,-56,wallM,{occ:true});bx(1.2,11,3.44,3.5,-60,-56,M(0x8a4a3a),{solid:false});
    for(let i=0;i<4;i++){bx(2+i*2.3,2.7+i*2.3,1.1,2.3,-56.08,-56.0,M(0x24343a),{solid:false});}bx(7.6,8.2,3.44,4.4,-59.8,-59.2,M(0x8a4a3a),{occ:false});fadeable(since(hm));
    const nutRoof=nutItem(X(4.4),3.95,-58.4);
    // участок Б — канал у дома-колодца; дверь на втором этаже, сундук на дне
    gnd(1.2,5.95,-76,-60,0,pave);gnd(5.95,11,-63,-60,0,pave);gnd(5.95,11,-76,-69,0,pave);gnd(10,11,-69,-63,0,pave);
    const tw=W.group.children.length,twM=M(0xd8cfb8);
    bx(5.6,10,-3,6.2,-63.4,-63,twM);bx(5.6,10,-3,6.2,-69,-68.6,twM);bx(9.6,10,-3,6.2,-68.6,-63.4,twM);
    bx(5.6,6.0,-3,6.2,-65,-63.4,twM);bx(5.6,6.0,-3,6.2,-68.6,-67,twM);bx(5.6,6.0,-3,2.0,-67,-65,twM);bx(5.6,6.0,5.2,6.2,-67,-65,twM);fadeable(since(tw));
    gnd(6.0,9.6,-68.6,-63.4,-3,M(0x3e5250));kdome(X(7.8),-66,0.7,6.2);
    const door=new THREE.Group();door.position.set(X(5.52),0,-66);W.group.add(door);const dg=M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.6});
    for(const dz of[-1.05,1.05])addMesh(new THREE.BoxGeometry(0.1,3.2,0.12),dg,0,3.6,dz,door);addMesh(new THREE.BoxGeometry(0.1,0.12,2.2),dg,0,5.2,0,door);addMesh(new THREE.BoxGeometry(0.1,0.12,2.2),dg,0,2.0,0,door);
    const zB=waterZone(...BX(1.2,5.95),-76,-60,0,2.8,{shell:{x:X(1.9),z:-60.7,y:0}});
    const lift=waterZone(...BX(5.95,9.6),-68.6,-63.4,-3,2.8,{start:'high',floor:-3,shell:{x:X(9.15),z:-63.9,y:-3},curb:false});
    const ch=chest(X(8.5),-3,-67.7,{ry:s>0?-Math.PI/2:Math.PI/2});
    const pk=[pike(X(7.2),-48.8,zA,-2.2,{pi}),pike(X(7.8),-65.6,lift,-3,{pi})];
    bell(X(3.2),-45.2);bell(X(2.6),-61.6);
    SD.push({pi,s,X,zA,zB,lift,ch,boat2,door,pk,nutPit,nutRoof,inShaft:h=>h.pos.x*s>5.95&&h.pos.x*s<9.6&&h.pos.z<-63.4&&h.pos.z>-68.6});}
  /* ---------- Д. шлюзы Китежа: три ступени воды — прилив поднимает на следующую ---------- */
  const basinM=M(0x3e5e5a),stepM=M(0xd2c8ae),goldM=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4});
  ground(-11,11,-80,-76,0,pave);ground(-11,11,-88,-80,0,basinM);
  box(-11,11,0,2.6,-96,-88,stepM);box(-11,11,0,5.2,-104,-96,stepM);
  for(const[y,z]of[[2.62,-92],[5.22,-100]])addMesh(new THREE.BoxGeometry(22,0.04,8),basinM,0,y,z).receiveShadow=true;
  for(const[y,z]of[[2.6,-88],[5.2,-96],[7.8,-104]])for(let x=-9;x<=9;x+=3)addMesh(new THREE.SphereGeometry(0.16,8,6),goldM,x,y+0.12,z+0.1);   // золотые шишечки по краю ступени
  const L1=waterZone(-11,11,-88,-80,0,2.9,{shell:{x:-9.4,z:-80.6,y:0}});
  const L2=waterZone(-11,11,-96,-88,2.6,5.5,{floor:2.6,shell:{x:9.4,z:-88.7,y:2.6}});
  const L3=waterZone(-11,11,-104,-96,5.2,8.1,{floor:5.2,shell:{x:-9.4,z:-96.7,y:5.2}});
  for(let i=0;i<14;i++){const z=rand(-103,-81),y=z>-88?0:z>-96?2.6:5.2;const w=addMesh(new THREE.CylinderGeometry(0.05,0.08,rand(0.8,1.6),5),M(0x3f8a5a),rand(-10,10),y+0.5,z);w.rotation.z=rand(-0.3,0.3);}   // водоросли
  pike(-5,-92,L2,2.6,{});pike(5,-100,L3,5.2,{});
  nutItem(8.5,5.9,-92.5);nutItem(-8,8.5,-100.5);bell(0,-78);
  /* ---------- Е. колодец-лифт: отлив опускает вниз, к торговым рядам ---------- */
  box(-11,-3,0,7.8,-116,-104,stepM);box(3,11,0,7.8,-116,-104,stepM);box(-3,3,0,7.8,-110,-104,stepM);
  ground(-3,3,-116,-110,0,basinM);
  const LIFT=waterZone(-3,3,-116,-110,0,7.8,{start:'high',floor:0,shell:{x:3.7,z:-109.4,y:7.8},curb:false});
  {const ag=W.group.children.length;for(const sd of[-1,1])box(sd*3.3-0.3,sd*3.3+0.3,7.8,11.2,-110.6,-110,stepM,{occ:false});addMesh(new THREE.BoxGeometry(7.2,0.6,0.7),stepM,0,11.4,-110.3);kdome(0,-110.3,0.35,11.7);fadeable(since(ag));}
  bell(-6,-107,7.8);
  /* ---------- Ж. торговые ряды: раки и щука в пруду; отлив сажает щуку на мель ---------- */
  ground(-11,-3.5,-140,-116,0,pave);ground(3.5,11,-140,-116,0,pave);ground(-3.5,3.5,-123,-116,0,pave);ground(-3.5,3.5,-140,-131,0,pave);ground(-3.5,3.5,-131,-123,0,basinM);
  const MP=waterZone(-3.5,3.5,-131,-123,0,1.0,{floor:0,start:'high',shell:{x:-4.3,z:-122.4,y:0}});
  const AWN=[0xc0302a,0x3a7ac0,0xe0a020,0x3f8a45];
  for(const s of[-1,1])for(let i=0;i<3;i++){const z=-119-i*7.5,x=s*8.6,c=AWN[(i+(s>0?1:0))%4];const sm=W.group.children.length;
    box(x-1.4,x+1.4,0,1.0,z-1,z+1,M(0x8a5a2e),{occ:false});for(const dz of[-1,1])addMesh(new THREE.CylinderGeometry(0.06,0.06,2.4,5),M(0x6a4020),x+s*1.3,1.2,z+dz);
    const aw=addMesh(new THREE.BoxGeometry(3.2,0.1,2.6),M(c),x,2.45,z);aw.rotation.z=-s*0.18;
    for(let k=0;k<5;k++)addMesh(new THREE.SphereGeometry(0.16,8,6),M([0xff6a4a,0xffd23a,0x7ad04a,0xc05ad0][k%4]),x-0.9+k*0.45,1.15,z+rand(-0.4,0.4));fadeable(since(sm));}
  const mkt={started:false,done:false,list:[]};
  const mktGate=makeGate(-11,11,-139,'thread','market',{h:2.6});
  nutItem(-8.6,1.6,-134);
  /* ---------- З. две раковины: левой воде — прилив, правой — отлив, одновременно ---------- */
  ground(-11,11,-142,-140,0,pave);ground(-11,-1,-156,-142,0,basinM);ground(1,11,-156,-142,0,basinM);box(-1,1,0,3.2,-156,-142,stepM);
  const LZ=waterZone(-11,-1,-156,-142,0,2.4,{shell:{x:-2.1,z:-142.6,y:0}});
  const RZ=waterZone(1,11,-156,-142,0,2.4,{start:'high',shell:{x:2.1,z:-142.6,y:0}});
  const board=(x,txt,col)=>{const b=new THREE.Mesh(new THREE.PlaneGeometry(4.2,1.3),new THREE.MeshBasicMaterial({map:scratchTex(txt,512,160,'#f4ecd8',col)}));b.position.set(x,4.6,-155.6);W.group.add(b);
    addMesh(new THREE.CylinderGeometry(0.07,0.07,4.6,6),M(0x6a4020),x,2.3,-155.8);return b;};
  board(-6,'↑ ПРИЛИВ ↑','#1a5a8a');board(6,'↓ ОТЛИВ ↓','#8a3a1a');
  const grate=new THREE.Group();W.group.add(grate);const gm2=M(0x5a4a3a);
  for(let x=-10.5;x<=10.5;x+=0.75)addMesh(new THREE.BoxGeometry(0.14,3.6,0.14),gm2,x,1.8,-156.5,grate);for(const y of[0.8,2.2,3.4])addMesh(new THREE.BoxGeometry(22,0.16,0.16),gm2,0,y,-156.5,grate);
  const grateCol=colBox(-11,11,0,3.6,-156.8,-156.2,false);
  /* ---------- И. ворота Китежа ---------- */
  ground(-11,11,-172,-156,0,pave);
  {const gm=W.group.children.length;for(const sd of[-1,1])box(sd*3.9-0.9,sd*3.9+0.9,0,5.2,-167,-165.6,wallM);addMesh(new THREE.BoxGeometry(9.6,1.1,1.6),wallM,0,5.75,-166.3);kdome(0,-166.3,0.5,6.3);fadeable(since(gm));}
  const endLink=linkItem(0,1.1,-162.6);bell(0,-158.6);
  W.updates.push(dt=>{
    if(!mkt.started&&[0,1].some(pi=>active(pi).pos.z<-118.5&&active(pi).pos.y<3)){mkt.started=true;SFX.gate();
      mkt.list=[crab(-6.5,-126,null,{leash:6}),crab(6.5,-126,null,{leash:6}),pike(0,-127,MP,0,{leash:2.6})];
      banner('Торговые ряды!','#9fd0ff',2.2,'раки щиплют красным — кувырком · щуку в пруду отливом посади на мель');}
    if(mkt.started&&!mkt.done&&mkt.list.every(e=>!e.alive)){mkt.done=true;mktGate.forceOpen=true;SFX.ok();banner('Отбились!','#ffffff',1.8,'дальше — раковины две');}
    if(!F.grate){const ok=LZ.state==='high'&&LZ.t>=1&&RZ.state==='low'&&RZ.t>=1;
      if(ok){F.grate=true;grateCol.on=false;SFX.gate();SFX.ok();anim(1.6,k=>{grate.position.y=3.8*smooth(k);});banner('Решётка поднялась!','#ffffff',2,'вместе получилось');}}});
  W.tipZones.push({cond:(pi,h)=>[L1,L2,L3].some(z=>inZone(z,h,0)&&z.state==='low'&&h.pos.y<z.floor+0.4),text:pi=>'Стенка высока — не допрыгнуть никак.<br>Сыграй прилив '+K(pi,'item')+' — вода подымет на ступеньку, вот так.'},
    {cond:(pi,h)=>inZone(LIFT,h,0)&&h.pos.y>6,text:pi=>'Колодец-лифт: сыграй отлив '+K(pi,'item')+' — вода опустит вниз.'},
    {cond:(pi,h)=>mkt.started&&!mkt.done&&MP.state==='high'&&hd(h.pos,{x:0,z:-127})<7,text:pi=>'Щука в пруду. Сыграй отлив '+K(pi,'item')+' — на мели окажется,<br>Тут её и бей — пусть не кажется!'},
    {cond:(pi,h)=>!F.grate&&h.pos.z<-141&&h.pos.z>-157,text:pi=>'Левой воде — прилив, правой — отлив. На таблички гляди!'});
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>[L1,L2,L3].some(z=>inZone(z,h(),0.2)&&z.state==='low'&&h().pos.y<z.floor+0.5),'прилив — наверх');
    prompt(pi,'item',()=>headOf(h()),()=>inZone(LIFT,h(),0.2)&&LIFT.state==='high'&&h().pos.y>6,'отлив — вниз');
    prompt(pi,'item',()=>headOf(h()),()=>mkt.started&&!mkt.done&&inZone(MP,h(),1.2)&&MP.state==='high','отлив — щуку на мель');
    prompt(pi,'item',()=>headOf(h()),()=>!F.grate&&inZone(LZ,h(),0.2)&&LZ.state==='low','прилив!');
    prompt(pi,'item',()=>headOf(h()),()=>!F.grate&&inZone(RZ,h(),0.2)&&RZ.state==='high','отлив!');}
  /* ---------- сюжет ---------- */
  function sadkoIntro(){F.stage='intro';
    play({dur:9.4,fov:48,shots:[shot(0,[-0.6,3.2,-7.6],[-6.4,1.2,-15]),shot(4.2,[-4.3,1.9,-12.2],[-6.3,1.4,-14.7])],
      says:[[0.3,3.8,null,'<i>На площади Садко сидит — струна на гуслях порвана,</i><br><i>И капля тёмная над ней горит, как проклятая.</i>',true],[4.3,2.6,'sadko','Без струны нет песни. Без песни — и Китеж молчит.'],[7.0,2.2,'zven','Йоша! Мёртвая вода срастит!']],
      tick:(t)=>{sadko.head.rotation.x=0.25;sadko.drop.position.y=1.35+Math.sin(t*3)*0.04;},end:()=>{F.stage='sadko';}});}
  function giftScene(){F.stage='gift';const T=HERO,pe=T.pelageya;
    HEROES.forEach((h,i)=>{placeOnGround(h,-4.2+(i%2)*1.6,-12.6-Math.floor(i/2)*1.4,0);h.face=Math.atan2(-6.5-h.pos.x,-14.8-h.pos.z);});
    const gifts=[];
    play({dur:20.6,fov:48,shots:[shot(0,[-4.6,1.8,-12.1],[-6.4,1.3,-14.8]),shot(5.4,[-1.2,2.8,-9.6],[-5.2,1.1,-13.6]),shot(9,[-3.8,1.6,-12.2],[-6.4,1.7,-14.8]),shot(17.4,[-1.8,1.5,-10.8],[pe.pos.x,0.9,pe.pos.z])],
      says:[[0.3,2.2,null,'<i>Срастается струна — звенит.</i>',true],[2.3,3.0,'sadko','Ох, запела! Спасибо, малые, спасибо!'],[5.6,3.4,'sadko','Играйте на ходу. Вода любит, когда с нею речь ведут.'],
        [9.2,2.4,'sadko','Лишь в Китеже не молчите — говорю.'],[11.7,2.4,'sadko','Только в Китеже — не молчите.'],[14.2,3.2,'sadko','Только в Китеже не молчите. Кто молчит, того вода забирает.'],[17.6,2.8,null,'<i>Пелагея прячет клюв в перья.</i>',true]],
      events:[{t:0,fn:()=>{sadko.drop.visible=false;SFX.grow();burst(new V3(-6.1,1.4,-14.4),0x9fe6ff,16,3);}},
        {t:1.4,fn:()=>{[67,71,74,79,78,74,71,74].forEach((m,i)=>later(i*0.22,()=>{gusli(m,0,0.18);sadko.arms.forEach((a,k)=>{a.rotation.x=(i+k)%2?0.3:-0.2;});}));}},
        {t:6.0,fn:()=>{HEROES.forEach((h,i)=>{const g=new THREE.Group();gusliMesh(g,M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.8}),0.9);W.group.add(g);gifts.push(g);const a=new V3(-6.2,1.6,-14.4),to=h.pos.clone().add(new V3(0,h.d.height*0.6,0));
          anim(1.0+i*0.15,k=>{g.position.lerpVectors(a,to,k);g.position.y+=Math.sin(k*Math.PI)*1.6;g.rotation.y+=0.2;if(k>=1){W.group.remove(g);burst(to,COL.gold,10,2);SFX.knot();}});});}},
        {t:17.6,fn:()=>{pe.parts.beak.visible=false;anim(0.6,k=>{pe.body.scale.set(1+0.12*k,1-0.12*k,1+0.12*k);});}}],
      tick:(t)=>{sadko.head.rotation.x=t<9?0.1:0.2;sadko.body.rotation.z=Math.sin(t*2)*0.03;},
      end:()=>{pe.parts.beak.visible=true;pe.body.scale.set(1,1,1);W.abil.gusli=true;F.stage='gusli';banner('Гусли Садко!','#ffd76a',2.8,'кнопка R или ; (на джойстике RB): вода подымется или опустится там, где стоишь');
        for(const pi of[0,1])tip(pi,'Ракушка с лодочкой воду кажет: лодочка вверху — прилив, внизу — отлив.<br>Играй на гуслях '+K(pi,'item')+' — вот и весь мотив.',4.2);}});}
  W.waterTargets.push({pos:new V3(-5.9,0,-14.5),active:()=>F.stage==='sadko',onWater:()=>{giftScene();}});
  function bookScene(){F.stage='book';const T=HERO,pr=T.proshka;const umb=new THREE.Group();W.group.add(umb);umb.visible=false;
    addMesh(new THREE.CylinderGeometry(0.02,0.02,0.9,5),M(0x6a4a2a),0,-0.45,0,umb);const can=addMesh(new THREE.ConeGeometry(0.75,0.35,10),M(0x4f9a3a),0,0.05,0,umb);can.scale.set(0.2,1,0.2);
    placeOnGround(pr,0,-35.25,0);pr.face=Math.PI;placeOnGround(T.potap,-1.7,-34.4,0);T.potap.face=Math.PI*0.9;placeOnGround(T.pelageya,1.6,-34.7,0);T.pelageya.face=-Math.PI*0.88;placeOnGround(T.yosha,0.9,-33.9,0);T.yosha.face=Math.PI;
    play({dur:28,fov:46,camK:3.4,shots:[shot(0,[3.6,3.2,-30.2],[0,1.2,-36.5]),shot(3.1,[0.95,2.05,-34.5],[0,1.05,-36.5]),shot(7.5,[-1.35,1.28,-36.2],[-0.4,1.12,-36.5]),shot(12.6,[2.2,2.3,-33.6],[-6.4,2.2,-38.4]),
        shot(17.4,[1.9,1.9,-31.6],[0,1.9,-35.3],[1.9,1.4,-31.9],[0,5,-35.6],3),shot(23,[2.6,1.2,-32.4],[0.9,0.55,-33.9])],
      says:[[0.3,3.2,null,'<i>В библиотеке терема на подставке</i><br><i>Лежит толстая книга сказок, без закладки.</i>',true],[3.3,3.6,null,'<i>Прошка её открывает — в лапах один переплёт:</i><br><i>Все страницы вырваны — вот тебе и переворот.</i>',true],
        [7.7,2.4,null,'<i>На корешке кто-то ключом слова нацарапал.</i>',true],[10.2,2.8,'proshka','Не… про… меня.'],[13,3.2,null,'<i>За стеной воды тихо ключи звенят.</i>',true],
        [17.6,2.6,'proshka','Зонт из лопуха — от воды, от дождя!'],[20.5,2.4,null,'<i>Зонт всплывает — да без Прошки.</i>',true],[23.1,1.6,'yosha','Ха-ха-ха! Вот потеха!'],[24.9,3,null,'<i>Йоша смеётся — да на звон оглянется.</i>',true]],
      events:[{t:3.6,fn:()=>{SFX.flower();anim(1.1,k=>{front.rotation.z=-Math.PI*smooth(k);});}},{t:13,fn:()=>{SFX.keys();anim(4,k=>{shadow.material.opacity=Math.sin(k*Math.PI)*0.35;shadow.position.z=-39+k*5;});}},{t:15.4,fn:()=>SFX.keys()},
        {t:17.7,fn:()=>{umb.visible=true;umb.position.set(pr.pos.x+0.2,pr.pos.y+1.9,pr.pos.z);anim(0.5,k=>{can.scale.set(0.2+0.8*k,1,0.2+0.8*k);});SFX.flower();}},
        {t:20.3,fn:()=>{const from=umb.position.clone();anim(6,k=>{umb.position.set(from.x+Math.sin(k*5)*0.4,from.y+k*6,from.z-k*1.2);umb.rotation.z=Math.sin(k*9)*0.3;});}},
        {t:23.1,fn:()=>{anim(1.2,k=>{T.yosha.extraY=Math.abs(Math.sin(k*Math.PI*4))*0.2;});}},{t:25,fn:()=>{T.yosha.face=Math.atan2(-6.4-T.yosha.pos.x,-38-T.yosha.pos.z);SFX.keys();}}],
      tick:(t)=>{curtain.material.opacity=0.2+0.06*Math.sin(t*3);},end:()=>{F.book=true;F.stage='street';T.yosha.extraY=0;W.group.remove(umb);}});}
  W.onSelfBreak=(e)=>{if(!F.laugh){F.laugh=true;later(0.5,()=>bark(HERO.yosha,'yosha','Она сама себя — вот так лихо!',2));}};
  W.updates.push(dt=>{curtain.material.opacity=0.18+0.05*Math.sin(G.time*2);
    if(F.stage==='walk'&&[0,1].some(pi=>active(pi).pos.z<-10.5))sadkoIntro();
    if(F.stage==='gusli'&&!F.book&&[0,1].some(pi=>active(pi).pos.z<-31.5))bookScene();
    if(!F.pikeTold&&W.enemies.some(e=>e.kind==='shchuka'&&e.state==='wind')){F.pikeTold=true;banner('Щука-морок!','#9fd0ff',2,'синяя капля: щитом закройся, а в последний миг — отбей ей обратно в пасть');}
    if(!F.out&&[0,1].every(pi=>active(pi).pos.z<-158)&&[0,1].some(pi=>active(pi).pos.z<-168)){F.out=true;finishLevel();}
    sadko.body.rotation.z=Math.sin(G.time*0.8)*0.02;});
  /* ---------- рисунки кнопок ---------- */
  const T=HERO,inFountain=h=>hd(h.pos,{x:0,z:-18})<4.4;
  prompt(1,'skill',()=>headOf(T.yosha),()=>F.stage==='sadko'&&T.yosha.active&&hd(T.yosha.pos,{x:-5.9,z:-14.5})<5,'мёртвая вода');
  prompt(1,'swap',()=>headOf(T.yosha),()=>F.stage==='sadko'&&T.pelageya.active&&hd(T.pelageya.pos,{x:-5.9,z:-14.5})<7,'Йоша');
  for(const pi of[0,1]){const h=()=>active(pi),d=SD[pi];
    prompt(pi,'item',()=>headOf(h()),()=>W.abil.gusli&&!fLink.taken&&inFountain(h())&&fz.state==='low','прилив');
    prompt(pi,'item',()=>headOf(h()),()=>W.abil.gusli&&inZone(d.zA,h(),0.4)&&h().pos.y<3.3&&d.zA.state==='low'&&h().pos.z<-45,'прилив — лодки всплывут');
    prompt(pi,'item',()=>headOf(h()),()=>inZone(d.zB,h(),0.3)&&d.zB.state==='low'&&!d.ch.open&&h().pos.z<-62&&h().pos.z>-70,'прилив — к двери');
    prompt(pi,'item',()=>headOf(h()),()=>d.inShaft(h())&&d.lift.state==='high'&&!d.ch.open,'отлив — вниз, как лифт');
    prompt(pi,'item',()=>headOf(h()),()=>d.inShaft(h())&&d.lift.state==='low'&&d.ch.open,'прилив — наверх');
    prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.help));
    prompt(pi,'attack',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&hd(e.pos,h().pos)<5&&Math.abs(e.pos.y-h().pos.y)<2&&(e.state==='broken'||(e.state==='stagger'&&!e.openHit)||e.flop)),'');}
  /* ---------- задачи ---------- */
  const side=pi=>{const d=SD[pi];return [
    O(()=>'Причал. Сыграй прилив '+K(pi,'item')+' — лодки всплывут до крыш.<br>С лодки шагни на крышу — и дальше, мимо крыш.',()=>active(pi).pos.z<-60.3||(active(pi).pos.y>3.3&&active(pi).pos.z<-56),()=>[d.boat2.g,d.zA.shell.g],
      ()=>({kind:active(pi).kind,action:'jump',from:new V3(d.X(4.2),3.1,-54),to:new V3(d.X(4.2),3.44,-57.6)})),
    O(()=>'Дверь дома — на втором этаже. Прилив '+K(pi,'item')+' сыграй, плыви к двери.<br>Внутри — отлив: вода опустит, как лифт. Сундук на дне — бери.',()=>d.ch.open||active(pi).pos.z<-77,()=>[d.door,d.ch.g])];};
  const common=pi=>[
    O('Подводный Китеж! По дну идём в пузырях воздушных —<br>Нам на площадь, к Садко, к гуслям звучным.',()=>F.stage!=='walk',()=>[sadko.g]),
    O(pi?()=>'У Садко струна порвалась — тёмная капля над ней.<br>Смени на Йошу и полей из ковшика '+K(1,'skill')+' — мёртвая вода срастит, скорей.':'У Садко струна порвалась. Мёртвая вода у Йоши — друга у Садко подожди.',()=>W.abil.gusli,()=>[sadko.g],
      pi?()=>({kind:'yosha',action:'walk',from:new V3(-3.5,0,-11.5),to:new V3(-5.6,0,-14.1)}):null),
    O(()=>'У каждого теперь гусли! Звено — на столбе фонтана.<br>Встань у чаши, сыграй прилив '+K(pi,'item')+': доски всплывут без обмана.',()=>fLink.taken||active(pi).pos.z<-29,()=>[fLink.g,fz.shell.g]),
    O(pi?'Терем-библиотека. Прошка книгу сказок нашёл толстую…':'Терем-библиотека. Прошка, книгу сказок открой.',()=>F.book,()=>[book])];
  const late=pi=>[
    O(()=>'Шлюзы! Встань в воду и прилив '+K(pi,'item')+' сыграй — вода подымет на ступеньку.<br>Три ступеньки — и наверх, помаленьку.',()=>active(pi).pos.z<-104.2,()=>[L1,L2,L3].filter(z=>inZone(z,active(pi),6)).map(z=>z.shell.g)),
    O(()=>'Колодец-лифт. Встань в воду, отлив '+K(pi,'item')+' сыграй —<br>Спустишься вниз, как на лифте, так и знай.',()=>active(pi).pos.z<-116.5&&active(pi).pos.y<1,()=>[LIFT.shell.g]),
    O(()=>'Торговые ряды! Раки щиплют красным — кувырком '+K(pi,'roll')+'.<br>Щуку в пруду — на мель: отлив '+K(pi,'item')+' сыграй — и бегом.',()=>mkt.done,()=>mkt.list.filter(e=>e.alive).map(e=>e.g)),
    O(()=>'Две раковины. На таблички гляди: левой — прилив, правой — отлив.<br>Сыграйте '+K(pi,'item')+' — каждый у своей, вот и весь мотив.',()=>!!F.grate,()=>[LZ.shell.g,RZ.shell.g]),
    O('Ворота Китежа — бери звено, и в путь-дорогу!',()=>false,()=>[endLink.g])];
  for(const pi of[0,1])W.objectives[pi]=common(pi).concat(side(pi),late(pi));
  W.tipZones.push({cond:(pi,h)=>h.grounded&&h.groundRef&&h.groundRef.water,text:pi=>'Ты плывёшь! Из воды высоко не выпрыгнуть.<br>Сыграй на гуслях '+K(pi,'item')+' — лодка всплывёт, подвезёт — не сгинуть.'},
    {cond:(pi,h)=>h.pos.y<-1.5&&h.pos.z<-45&&h.pos.z>-52,text:pi=>'Отлив открыл подвал. На дне — орешек! Назад — по ступенькам.'},
    {cond:(pi,h)=>SD[pi]&&SD[pi].inShaft(h)&&h.pos.y<-2,text:pi=>'Дно колодца. К сундуку подойди — сам откроется.<br>Наверх — прилив '+K(pi,'item')+' сыграй, и вода подымется.'});
  W.spawns=[[new V3(-3.5,0,5),new V3(-5.5,0,6)],[new V3(3.5,0,5),new V3(5.5,0,6)]];W.startAct=[0,0];
  W.pauseLine='Подводный Китеж. Гусли Садко: RB воду меняет там, где стоишь, —<br>Прилив лодки подымет, отлив подвалы откроет, глядишь.<br>Дальше — шлюзы, колодец-лифт, торговые ряды, раковины две.<br>В Китеже молчать нельзя — запомни в голове.';
  W.onStart=()=>{later(0.8,()=>say('zven','Китеж! Под водою спит он. Дзинь — за мной!',2.6,true));};
  flushDecor();}

