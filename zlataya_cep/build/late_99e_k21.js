/* ============================== РЕЛИЗ final06 · 2-1 «ГУСЛИ САДКО» — ВДВОЕ ДЛИННЕЕ ============================== */
// Начало прежнее: Садко и струна, гусли, фонтан, терем-библиотека, улица участков (причал и дом-колодец у каждого своя сторона).
// Садко теперь ещё и наигрывает свой напев — четыре звука, их Китеж вспомнит в 2-5. Новые участки:
//   Г2 «Переливная улица» — два канала, вода у них одна (перелив через заслонку на дне); тяжёлый Потап стоит на заслонке, даже
//      оставленный; прилив у одного — отлив у другого; лодкой к террасе, верёвка открывает ворота ДРУГА — надо по очереди.
//   Ж2 «Палаты Морского царя» (былина о Садко) — играют гусли у стула гусляра — царь пляшет, двери открыты, по палатам катятся
//      волны (прыгать в такт); сменил героя — оставленный доигрывает 15 с; у трона второй стул — чтобы прошёл и тот, кто играл.
//   З2 «Сад Китежа» — родник наполняет сад; ракушка на дне, в приливе дойдёт только Потап; Йоша растит водоросли-лесенки к террасе;
//      родник снова наполняет сад через 10 с — оставленный держит отлив напевом; на ростке — якорь, Потап поднимет.
// Шлюзы, колодец-лифт, торговые ряды, две раковины и ворота — прежние, дальше по улице. Звеньев столько же (4), орешков больше.
{const L=LEVELS.find(l=>l.id==='2-1');if(L)L.nuts=12;}   // орешков на уровне стало больше — для списка уровней
WHO.king=['Морской царь','#7ad8ff'];VOICE.king={f:110,w:'triangle',sp:0.13};
// Морской царь: ростом с терем, борода из тины, венец, трезубец; пляшет вприсядку, когда играют гусли
function kingMesh21(){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);const robe=M(0x2a8a8a),trim=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4}),skin=M(0xb8d8d0),weed=M(0x3f8a4a);
  part(body,new THREE.CylinderGeometry(0.7,1.25,2.2,12),robe,0,1.1,0);for(let i=0;i<5;i++)part(body,new THREE.TorusGeometry(0.75+i*0.11,0.05,6,18),trim,0,0.3+i*0.42,0).rotation.x=Math.PI/2;
  const head=new THREE.Group();head.position.y=2.65;body.add(head);part(head,new THREE.SphereGeometry(0.5,12,10),skin,0,0,0);
  for(const s of[-1,1]){part(head,new THREE.SphereGeometry(0.07,6,5),MAT.dark,s*0.17,0.08,0.44);part(head,new THREE.BoxGeometry(0.18,0.05,0.05),M(0x2a5a4a),s*0.17,0.2,0.44).rotation.z=-s*0.25;}
  for(let i=0;i<9;i++){const a=(i-4)*0.2;const c=part(head,new THREE.ConeGeometry(0.09,0.9+Math.abs(4-i)*-0.06+0.4,4),weed,Math.sin(a)*0.38,-0.62,0.25+Math.cos(a)*0.12);c.rotation.x=Math.PI;c.rotation.z=a*0.4;}
  const crown=new THREE.Group();crown.position.y=0.45;head.add(crown);part(crown,new THREE.CylinderGeometry(0.42,0.38,0.22,12),trim,0,0,0);for(let i=0;i<7;i++){const a=i/7*Math.PI*2;part(crown,new THREE.ConeGeometry(0.07,0.32,4),trim,Math.cos(a)*0.38,0.25,Math.sin(a)*0.38);}
  const arms=[];for(const s of[-1,1]){const a=new THREE.Group();a.position.set(s*0.8,2.1,0);body.add(a);part(a,new THREE.CylinderGeometry(0.17,0.2,1.1,8),robe,0,-0.5,0.1).rotation.x=0.3;part(a,new THREE.SphereGeometry(0.18,8,6),skin,0,-1.05,0.3);arms.push(a);}
  const tri=new THREE.Group();tri.position.set(0,-1.05,0.3);arms[1].add(tri);part(tri,new THREE.CylinderGeometry(0.05,0.05,3.2,6),trim,0,0.6,0);for(const dx of[-0.22,0,0.22])part(tri,new THREE.ConeGeometry(0.06,0.4,4),trim,dx,2.3,0);part(tri,new THREE.BoxGeometry(0.5,0.06,0.06),trim,0,2.1,0);
  const K={g,body,head,arms,crown,ph:0,k:0,dance(on,dt){K.k=damp(K.k,on?1:0,4,dt);K.ph+=dt*(on?7:1.2);const k=K.k;
    body.position.y=Math.abs(Math.sin(K.ph))*0.35*k;body.rotation.y=Math.sin(K.ph*0.5)*0.6*k;body.rotation.z=Math.sin(K.ph)*0.08*k+Math.sin(G.time*0.7)*0.02;
    arms[0].rotation.z=-0.3-k*(0.9+Math.sin(K.ph)*0.5);arms[1].rotation.z=0.3+k*(0.5+Math.sin(K.ph+1)*0.4);arms[0].rotation.x=Math.sin(K.ph)*0.5*k;head.rotation.z=Math.sin(K.ph)*0.12*k;}};
  if(typeof regNpc==='function')regNpc(K,'king');return K;}
// сад Китежа: коралловые деревца с жемчугом вместо яблок
function appleSea21(x,y,z){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=rand(0,6);W.group.add(g);const c=M([0xff8a8a,0xffb07a,0xd08ae0][Math.floor(rand(0,3))]),p=M(0xfff4e8,{emissive:0x6a6050,emissiveIntensity:0.4});
  const br=(px,py,pz,l,a,d)=>{const m=addMesh(new THREE.CylinderGeometry(0.05,0.08,l,5),c,px+Math.sin(a)*l/2,py+Math.cos(a)*l*0.5,pz,g);m.rotation.z=-a;m.castShadow=false;
    if(d>0){br(px+Math.sin(a)*l,py+Math.cos(a)*l,pz,l*0.75,a+0.5,d-1);br(px+Math.sin(a)*l,py+Math.cos(a)*l,pz,l*0.75,a-0.6,d-1);}else addMesh(new THREE.SphereGeometry(0.09,6,5),p,px+Math.sin(a)*l,py+Math.cos(a)*l,pz,g);};
  br(0,0,0,0.7,0,2);W.cyls.push({x,z,r:0.25,miny:y-1,maxy:y+1.4,on:true});return g;}
build21=function(){
  W.zvenAway=true;W.world=2;W.bubbles=true;setTheme('kitezh');W.name='2-1 · «Гусли Садко»';W.sub='Подводный Китеж · прилив и отлив, перелив, пляска Морского царя';W.camX=10;const F=W.flags;F.stage='walk';
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.gusli=false;W.fallY=-14;W.gusliLocked='Гусли Садко — у Садко на площади ждут.';
  kitezhDecor(-282,10);
  const stone=M(0xb8b4a4),pave=M(0x9aa094),wallM=M(0xe0d6c0);
  wall(-11.2,-11,-282,9);wall(11,11.2,-282,9);wall(-11.2,11.2,9,9.2);wall(-11.2,11.2,-282.2,-282);
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
    // участок А — причал: лодки у стены домов, подвал с орешком и Жемчужницей (щука плавает у дома-колодца)
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
    const pk=[FIN.pearlClam(X(7.2),-48.8,zA,-2.2,{pi}),pike(X(7.8),-65.6,lift,-3,{pi})];
    bell(X(3.2),-45.2);bell(X(2.6),-61.6);
    SD.push({pi,s,X,zA,zB,lift,ch,boat2,door,pk,nutPit,nutRoof,inShaft:h=>h.pos.x*s>5.95&&h.pos.x*s<9.6&&h.pos.z<-63.4&&h.pos.z>-68.6});}
  const basinM=M(0x3e5e5a),stepM=M(0xd2c8ae),goldM=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4}),canM=M(0x3e5250);
  /* ---------- Г2. Переливная улица: вода одна на две улицы, заслонка на дне — держит тяжёлый Потап ---------- */
  // два канала через стену; вода у них одна: прилив у одного — отлив у другого, пока Потап стоит на заслонке (он в глубокой воде не всплывает).
  // В конце каждого канала — терраса: в прилив лодка подвозит к ней. Верёвка на террасе открывает ворота ДРУГОЙ стороны.
  ground(-11,11,-80,-76,0,pave);bell(0,-78);
  {const dm=W.group.children.length;box(-1.2,1.2,-2.4,5.5,-116,-80,M(0xd0c8b0));for(let z=-82;z>-116;z-=4)addMesh(new THREE.CylinderGeometry(0.25,0.3,0.9,8),goldM,0,5.95,z);fadeable(since(dm));}
  ground(-11,-1.2,-108,-80,-2.4,canM);ground(1.2,11,-108,-80,-2.4,canM);
  for(const s of[-1,1])for(let i=0;i<7;i++){const x0=s<0?-11:9.4,x1=s<0?-9.4:11;box(x0,x1,-2.4,-0.3*(i+1),-80.6-i*0.6,-80-i*0.6,stone,{occ:false});}   // ступени в канал
  // арка заслонки в стене (со стороны левого канала) — сквозь неё вода переливается
  {const ag=W.group.children.length;addMesh(new THREE.BoxGeometry(0.08,1.4,1.8),M(0x10202a),-1.25,-1.7,-95);addMesh(new THREE.BoxGeometry(0.12,0.16,2.1),goldM,-1.27,-0.94,-95);
    for(const dz of[-0.98,0.98])addMesh(new THREE.BoxGeometry(0.12,1.5,0.16),goldM,-1.27,-1.65,-95+dz);addMesh(new THREE.BoxGeometry(0.08,1.4,1.8),M(0x10202a),1.25,-1.7,-95);fadeable(since(ag));}
  const CL=waterZone(-11,-1.2,-108,-80,-2.4,2.6,{floor:-2.4,start:'low',shell:{x:-10.3,z:-79.3,y:0}});CL.heavy=true;
  const CR=waterZone(1.2,11,-108,-80,-2.4,2.6,{floor:-2.4,start:'high',shell:{x:10.3,z:-79.3,y:0}});CR.heavy=true;
  const SLU=FIN.kwSluice(-2.8,-2.4,-95,{heavy:true,gate:{x:-1.32,z:-95,w:1.6,h:1.3,ry:Math.PI/2}});
  FIN.kwLink(CL,CR,{open:()=>SLU.held(),via:new V3(0,-1.7,-95),closedText:'Заслонка на дне закрыта — воде некуда уйти. Потапа на неё поставь!'});
  const boatL=floater(CL,-9.8,-6.8,-107.8,-103.6,0.7,{rest:-2.4,draft:0.5}),boatR=floater(CR,6.8,9.8,-107.8,-103.6,0.7,{rest:-2.4,draft:0.5});
  // террасы, лестницы вниз и ворота на лестницах
  box(-11,-1.2,-2.4,3.2,-112,-108,stepM);box(1.2,11,-2.4,3.2,-112,-108,stepM);
  for(const s of[-1,1])for(let i=0;i<8;i++){const x0=s<0?-11:1.2,x1=s<0?-1.2:11;box(x0,x1,0,3.2-0.4*(i+1),-112.5-0.5*i,-112-0.5*i,stepM,{occ:false});}
  for(const[y,z]of[[3.2,-108]])for(let x=-10;x<=10;x+=2.5)if(Math.abs(x)>1.5)addMesh(new THREE.SphereGeometry(0.16,8,6),goldM,x,y+0.12,z+0.1);
  const rgate=s=>{const g=new THREE.Group();W.group.add(g);const x0=s<0?-11:1.2,x1=s<0?-1.2:11;for(let x=x0+0.4;x<x1;x+=0.7)addMesh(new THREE.BoxGeometry(0.12,3.2,0.12),goldM,x,4.8,-112.2,g);
    addMesh(new THREE.BoxGeometry(x1-x0,0.16,0.16),goldM,(x0+x1)/2,6.3,-112.2,g);addMesh(new THREE.BoxGeometry(x1-x0,0.16,0.16),goldM,(x0+x1)/2,3.6,-112.2,g);return {g,col:colBox(x0,x1,3.2,6.4,-112.4,-112.0,false),open:false};};
  const PG=[rgate(-1),rgate(1)];
  const openPG=i=>{const q=PG[i];if(q.open)return;q.open=true;q.col.on=false;SFX.gate();anim(1.4,k=>{q.g.position.y=3.4*smooth(k);});};
  const ropes=[-1,1].map(s=>{const x=s*5.2,g=new THREE.Group();g.position.set(x,3.2,-110.4);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.1,0.12,2.6,6),M(0x6a4020),0,1.3,0,g);
    const rope=addMesh(new THREE.CylinderGeometry(0.035,0.035,1.6,5),M(0xd8c090),0.3,1.6,0,g);const fl=addMesh(new THREE.BoxGeometry(0.7,0.45,0.03),M(s<0?PCOL[0]:PCOL[1]),0.42,2.4,0,g);return {g,rope,fl,pulled:false,s};});
  ropes.forEach((R,i)=>W.hittables.push({pos:new V3(R.s*5.2,4.2,-110.4),r:1.1,push:false,alive:()=>!R.pulled,onHit:h=>{if(h.pos.y<2.9)return;R.pulled=true;SFX.latch();SFX.ok();
    anim(0.7,k=>{R.rope.scale.y=1-0.5*k;R.fl.position.y=2.4-1.4*k;});openPG(1-i);banner(i?'Правая верёвка!':'Левая верёвка!','#ffffff',1.8,'открылись ворота '+(i?'левой':'правой')+' стороны — друга');}}));
  const pkR=pike(6.4,-91,CR,-2.4,{pi:1});
  const nutCanal=nutItem(-10.1,-1.9,-99.5),nutTerrace=nutItem(10.2,3.75,-111.3);
  bell(-6,-114.4,1.6);bell(6,-114.4,1.6);
  /* ---------- Д. шлюзы Китежа: три ступени воды — прилив поднимает на следующую (дальше на 40 м) ---------- */
  const D=-40;
  ground(-11,11,-80+D,-76+D,0,pave);ground(-11,11,-88+D,-80+D,0,basinM);
  box(-11,11,0,2.6,-96+D,-88+D,stepM);box(-11,11,0,5.2,-104+D,-96+D,stepM);
  for(const[y,z]of[[2.62,-92+D],[5.22,-100+D]])addMesh(new THREE.BoxGeometry(22,0.04,8),basinM,0,y,z).receiveShadow=true;
  for(const[y,z]of[[2.6,-88+D],[5.2,-96+D],[7.8,-104+D]])for(let x=-9;x<=9;x+=3)addMesh(new THREE.SphereGeometry(0.16,8,6),goldM,x,y+0.12,z+0.1);   // золотые шишечки по краю ступени
  const L1=waterZone(-11,11,-88+D,-80+D,0,2.9,{shell:{x:-9.4,z:-80.6+D,y:0}});
  const L2=waterZone(-11,11,-96+D,-88+D,2.6,5.5,{floor:2.6,shell:{x:9.4,z:-88.7+D,y:2.6}});
  const L3=waterZone(-11,11,-104+D,-96+D,5.2,8.1,{floor:5.2,shell:{x:-9.4,z:-96.7+D,y:5.2}});
  for(let i=0;i<14;i++){const z=rand(-103,-81)+D,y=z>-88+D?0:z>-96+D?2.6:5.2;const w=addMesh(new THREE.CylinderGeometry(0.05,0.08,rand(0.8,1.6),5),M(0x3f8a5a),rand(-10,10),y+0.5,z);w.rotation.z=rand(-0.3,0.3);}   // водоросли
  pike(-5,-92+D,L2,2.6,{});pike(5,-100+D,L3,5.2,{});
  nutItem(8.5,5.9,-92.5+D);nutItem(-8,8.5,-100.5+D);bell(0,-78+D);
  /* ---------- Е. колодец-лифт: отлив опускает вниз, к торговым рядам ---------- */
  box(-11,-3,0,7.8,-116+D,-104+D,stepM);box(3,11,0,7.8,-116+D,-104+D,stepM);box(-3,3,0,7.8,-110+D,-104+D,stepM);
  ground(-3,3,-116+D,-110+D,0,basinM);
  const LIFT=waterZone(-3,3,-116+D,-110+D,0,7.8,{start:'high',floor:0,shell:{x:3.7,z:-109.4+D,y:7.8},curb:false});
  {const ag=W.group.children.length;for(const sd of[-1,1])box(sd*3.3-0.3,sd*3.3+0.3,7.8,11.2,-110.6+D,-110+D,stepM,{occ:false});addMesh(new THREE.BoxGeometry(7.2,0.6,0.7),stepM,0,11.4,-110.3+D);kdome(0,-110.3+D,0.35,11.7);fadeable(since(ag));}
  bell(-6,-107+D,7.8);
  /* ---------- Ж. торговые ряды: раки и Жемчужница на дне пруда; отлив — она ахает и раскрывается ---------- */
  ground(-11,-3.5,-140+D,-116+D,0,pave);ground(3.5,11,-140+D,-116+D,0,pave);ground(-3.5,3.5,-123+D,-116+D,0,pave);ground(-3.5,3.5,-140+D,-131+D,0,pave);ground(-3.5,3.5,-131+D,-123+D,0,basinM);
  const MP=waterZone(-3.5,3.5,-131+D,-123+D,0,1.0,{floor:0,start:'high',shell:{x:-4.3,z:-122.4+D,y:0}});
  const AWN=[0xc0302a,0x3a7ac0,0xe0a020,0x3f8a45];
  for(const s of[-1,1])for(let i=0;i<3;i++){const z=-119-i*7.5+D,x=s*8.6,c=AWN[(i+(s>0?1:0))%4];const sm=W.group.children.length;
    box(x-1.4,x+1.4,0,1.0,z-1,z+1,M(0x8a5a2e),{occ:false});for(const dz of[-1,1])addMesh(new THREE.CylinderGeometry(0.06,0.06,2.4,5),M(0x6a4020),x+s*1.3,1.2,z+dz);
    const aw=addMesh(new THREE.BoxGeometry(3.2,0.1,2.6),M(c),x,2.45,z);aw.rotation.z=-s*0.18;
    for(let k=0;k<5;k++)addMesh(new THREE.SphereGeometry(0.16,8,6),M([0xff6a4a,0xffd23a,0x7ad04a,0xc05ad0][k%4]),x-0.9+k*0.45,1.15,z+rand(-0.4,0.4));fadeable(since(sm));}
  const mkt={started:false,done:false,list:[]};
  const mktGate=makeGate(-11,11,-139+D,'thread','market',{h:2.6});
  nutItem(-8.6,1.6,-134+D);
  /* ---------- Ж2. Палаты Морского царя: играют гусли — царь пляшет, по палатам катятся волны; двери открыты, пока пляшет ---------- */
  // былина о Садко: Морской царь велит играть — и пляшет так, что море ходуном ходит. Один играет (или оставленный доигрывает),
  // остальные бегут через палаты и прыгают через волны; у трона — второй стул гусляра, чтобы прошёл и тот, кто играл.
  const hallM=M(0xc8dcd6);ground(-11,11,-218,-180,0,hallM);
  for(let z=-182;z>-216;z-=2.4)for(let x=-10;x<=10;x+=2.4)if(((x+z)|0)%2===0)addMesh(new THREE.BoxGeometry(2.3,0.02,2.3),M(0xe8f0ee),x,0.012,z).receiveShadow=true;   // перламутровые плиты
  for(const x of[-8.2,8.2])for(const z of[-186,-194,-202,-210]){addMesh(new THREE.CylinderGeometry(0.42,0.5,6,10),M(0xd8e8e4),x,3,z);addMesh(new THREE.TorusGeometry(0.5,0.1,6,14),goldM,x,5.6,z).rotation.x=Math.PI/2;W.cyls.push({x,z,r:0.5,miny:-1,maxy:6,on:true});}
  {const wm=W.group.children.length;box(-11,-9,0,6.4,-217.4,-216.6,wallM);box(-5,5,0,6.4,-217.4,-216.6,wallM);box(9,11,0,6.4,-217.4,-216.6,wallM);
    box(-11,11,6.4,7.0,-217.4,-216.6,wallM,{solid:false});kdome(0,-217,0.55,7);fadeable(since(wm));}
  const HD=[-7,7].map(x=>{const g=new THREE.Group();W.group.add(g);for(let k=0;k<6;k++)addMesh(new THREE.BoxGeometry(0.6,4.2,0.25),M(0x5aa0a0,{emissive:0x0a3a40,emissiveIntensity:0.4}),x-1.65+k*0.66,2.1,-217,g);
    return {g,col:colBox(x-2,x+2,0,4.4,-217.4,-216.6,false),k:0};});
  box(-3.2,3.2,0,1.2,-216.6,-212.6,stepM,{occ:false});
  const king=kingMesh21();king.g.position.set(0,1.2,-214.8);W.cyls.push({x:0,z:-214.8,r:1.1,miny:-1,maxy:4.6,on:true});
  const KING={hum:0,dur:6,ring(by){const was=KING.hum;KING.hum=KING.dur;if(was<=0){SFX.ok();floatText(new V3(0,5.4,-214.4),'Эх, пляшу!','#9fe6ff');}[67,71,74,79].forEach((m,i)=>gusli(m,i*0.11,0.12));}};
  const seats=[kwShell('dance',-8.6,-182.6,0,KING,{ry:0}),kwShell('dance',8.6,-212.2,0,KING,{ry:Math.PI})];
  for(const s of seats)box(s.x-0.55,s.x+0.55,0,0.5,s.z-0.55,s.z+0.55,M(0x8a5a2e),{occ:false});
  const WAV=[];const waveM=MB(0xe8fbff,{transparent:true,opacity:0.7,depthWrite:false});
  const nutHall=nutItem(-9.6,0.6,-207);
  /* ---------- З. две раковины: левой воде — прилив, правой — отлив, одновременно (дальше на 78 м) ---------- */
  const D2=-78;
  ground(-11,11,-142+D2,-140+D2,0,pave);ground(-11,-1,-156+D2,-142+D2,0,basinM);ground(1,11,-156+D2,-142+D2,0,basinM);box(-1,1,0,3.2,-156+D2,-142+D2,stepM);
  const LZ=waterZone(-11,-1,-156+D2,-142+D2,0,2.4,{shell:{x:-2.1,z:-142.6+D2,y:0}});
  const RZ=waterZone(1,11,-156+D2,-142+D2,0,2.4,{start:'high',shell:{x:2.1,z:-142.6+D2,y:0}});
  const board=(x,txt,col)=>{const b=new THREE.Mesh(new THREE.PlaneGeometry(4.2,1.3),new THREE.MeshBasicMaterial({map:scratchTex(txt,512,160,'#f4ecd8',col)}));b.position.set(x,4.6,-155.6+D2);W.group.add(b);
    addMesh(new THREE.CylinderGeometry(0.07,0.07,4.6,6),M(0x6a4020),x,2.3,-155.8+D2);return b;};
  board(-6,'↑ ПРИЛИВ ↑','#1a5a8a');board(6,'↓ ОТЛИВ ↓','#8a3a1a');
  const grate=new THREE.Group();W.group.add(grate);const gm2=M(0x5a4a3a);
  for(let x=-10.5;x<=10.5;x+=0.75)addMesh(new THREE.BoxGeometry(0.14,3.6,0.14),gm2,x,1.8,-156.5+D2,grate);for(const y of[0.8,2.2,3.4])addMesh(new THREE.BoxGeometry(22,0.16,0.16),gm2,0,y,-156.5+D2,grate);
  const grateCol=colBox(-11,11,0,3.6,-156.8+D2,-156.2+D2,false);
  /* ---------- З2. Сад Китежа: родник наполняет сад; ракушка — на дне, у неё только тяжёлый Потап; водоросли-лесенки Йоши ---------- */
  // в приливе сад — глубокий пруд: до ракушки на дне дойдёт лишь Потап (не всплывает). Отлив открывает дно: Йоша поливает ростки —
  // вырастают лесенки к террасе. Родник через 10 с снова наполняет сад — если оставленный не держит напев. На одном ростке — якорь: Потап поднимет.
  ground(-11,11,-237,-234,0,pave);bell(0,-235.6);
  ground(-9,9,-259,-237,-4,M(0x4a6a5a));ground(-11,-9,-259,-237,0,pave);ground(9,11,-259,-237,0,pave);
  for(const s of[-1,1])for(let i=0;i<9;i++){const x0=s<0?-9:7.4,x1=s<0?-7.4:9;box(x0,x1,-4,-0.4*(i+1),-237.6-0.6*i,-237-0.6*i,stone,{occ:false});}   // ступени на дно сада
  box(-11,11,-4,4.5,-263,-259,stepM);for(let i=0;i<9;i++)box(-11,11,0,4.5-0.5*(i+1),-263.33-0.33*i,-263-0.33*i,stepM,{occ:false});
  for(let x=-10;x<=10;x+=2.5)addMesh(new THREE.SphereGeometry(0.16,8,6),goldM,x,4.62,-259.1);
  const GARD=waterZone(-9,9,-259,-237,-4,0.8,{floor:-4,start:'high',shell:{x:0,z:-246.4,y:-4}});GARD.heavy=true;GARD.kwHoldable=true;GARD.holdT=0;
  GARD.lock=(pi,h,want)=>h.pos.y>-3.2?'Ракушка сада — на дне, у родника. Дотянись до неё!':null;
  {const sp=new THREE.Group();sp.position.set(0,-4,-249.4);W.group.add(sp);addMesh(new THREE.CylinderGeometry(0.9,1.2,0.6,10),stone,0,0.3,0,sp);addMesh(new THREE.SphereGeometry(0.35,10,8),M(0x9fefff,{emissive:0x3ab0c0,emissiveIntensity:0.7}),0,0.65,0,sp);W.cyls.push({x:0,z:-249.4,r:1.1,miny:-5,maxy:-3.4,on:true});}
  {let sd=4242;const rr=(a,b)=>{sd=(sd*16807)%2147483647;return a+(b-a)*sd/2147483647;};   // деревца с ветками-коллизиями — места одни и те же при каждой загрузке
    for(let i=0;i<10;i++){const x=rr(-8,8),z=rr(-257,-239);if(Math.abs(x)<2&&z<-245)continue;if(Math.hypot(Math.abs(x)-4,z+256.9)<2.4)continue;appleSea21(x,-4,z);}}   // у лесенок — пусто
  const KS=[FIN.kwKelp(-4,-4,-256.9,8.5,{last:-Math.PI/2}),FIN.kwKelp(4,-4,-256.9,8.5,{last:-Math.PI/2,active:()=>!!F.anchor})];   // винтовые лесенки: верхний лист — вровень с террасой
  const anchor=new THREE.Group();anchor.position.set(4,-4,-256.9);W.group.add(anchor);{const im=M(0x5a6068);addMesh(new THREE.BoxGeometry(0.16,1.6,0.16),im,0,0.8,0,anchor).rotation.z=0.5;const t=addMesh(new THREE.TorusGeometry(0.55,0.08,6,12,Math.PI),im,0.2,0.4,0,anchor);t.rotation.z=Math.PI+0.5;
    addMesh(new THREE.TorusGeometry(0.16,0.05,6,12),im,-0.38,1.5,0,anchor);}
  W.lifts.push({pos:new V3(4,-4,-256.9),active:()=>!F.anchor,onLift:h=>{F.anchor=true;SFX.toss();anim(1.0,k=>{anchor.position.set(4+k*2.4,-4+Math.sin(k*Math.PI)*1.6,-256.9+k*1.2);anchor.rotation.z=k*1.4;});
    later(0.5,()=>bark(h,'potap','Якорь… как пёрышко! Ну, почти.',2,true));}});
  const nutGarden=(p=>nutItem(p.x,p.y+0.6,p.z))(KS[1].padAt(11));   // орешек над листом лесенки — по пути наверх
  /* ---------- И. ворота Китежа (дальше на 110 м) ---------- */
  const D3=-110;
  ground(-11,11,-172+D3,-156+D3,0,pave);
  {const gm=W.group.children.length;for(const sd of[-1,1])box(sd*3.9-0.9,sd*3.9+0.9,0,5.2,-167+D3,-165.6+D3,wallM);addMesh(new THREE.BoxGeometry(9.6,1.1,1.6),wallM,0,5.75,-166.3+D3);kdome(0,-166.3+D3,0.5,6.3);fadeable(since(gm));}
  const endLink=linkItem(0,1.1,-162.6+D3);bell(0,-158.6+D3);
  FIN.kwPrompts();
  W.updates.push(dt=>{
    if(!mkt.started&&[0,1].some(pi=>active(pi).pos.z<-118.5+D&&active(pi).pos.y<3)){mkt.started=true;SFX.gate();
      mkt.list=[crab(-6.5,-126+D,null,{leash:6}),crab(6.5,-126+D,null,{leash:6}),FIN.pearlClam(0,-127+D,MP,0,{})];
      banner('Торговые ряды!','#9fd0ff',2.2,'раки щиплют красным — кувырком · Жемчужница в пруду: отлив — ахнет и раскроется');}
    if(mkt.started&&!mkt.done&&mkt.list.every(e=>!e.alive)){mkt.done=true;mktGate.forceOpen=true;SFX.ok();banner('Отбились!','#ffffff',1.8,'дальше — палаты Морского царя');}
    if(!F.grate){const ok=LZ.state==='high'&&LZ.t>=1&&RZ.state==='low'&&RZ.t>=1;
      if(ok){F.grate=true;grateCol.on=false;SFX.gate();SFX.ok();anim(1.6,k=>{grate.position.y=3.8*smooth(k);});banner('Решётка поднялась!','#ffffff',2,'вместе получилось');}}
    // Переливная улица
    if(!F.perelTold&&[0,1].some(pi=>active(pi).pos.z<-79&&active(pi).pos.z>-82)){F.perelTold=true;perelScene();}
    // палаты: царь пляшет, пока звучат гусли; волны каждые 1,4 с; двери открыты, пока пляшет
    KING.hum=Math.max(0,KING.hum-dt);const dancing=KING.hum>0;F.kingDance=dancing;
    if(!F.kingMet&&[0,1].some(pi=>active(pi).pos.z<-181&&active(pi).pos.z>-190)){F.kingMet=true;kingScene();}
    for(const q of HD){q.k=damp(q.k,dancing?1:0,dancing?6:3,dt);q.g.position.y=4.5*q.k;q.col.on=q.k<0.6;}
    if(dancing&&!F.kingDone){F.waveT=(F.waveT||0)-dt;if(F.waveT<=0){F.waveT=1.4;const m=new THREE.Mesh(new THREE.BoxGeometry(21.6,0.85,0.7),waveM);m.position.set(0,0.42,-209.4);m.renderOrder=6;W.group.add(m);
        const fo=addMesh(new THREE.BoxGeometry(21.6,0.12,0.9),MB(0xffffff,{transparent:true,opacity:0.85}),0,0.88,0,m);fo.castShadow=false;WAV.push({m,z:-209.4});SFX.wave();}}
    for(let i=WAV.length-1;i>=0;i--){const w=WAV[i];w.z+=6.2*dt;w.m.position.z=w.z;w.m.scale.y=1+0.1*Math.sin(G.time*8+i);if(w.z>-184.5){w.m.material.opacity=0.7;W.group.remove(w.m);WAV.splice(i,1);continue;}
      for(const h of HEROES){if(h.cling||!h.active||h.pos.y>0.8||Math.abs(h.pos.z-w.z)>0.55)continue;if(G.time-(h.waveT||-9)<0.7)continue;h.waveT=G.time;h.vel.z=7;h.vel.y=5.5;h.grounded=false;SFX.splash();
        floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'Волна! Прыгай!','#cff8ff');if(!F.waveTold){F.waveTold=true;for(const p of[0,1])tip(p,'Волны от пляски катятся — прыгай через них '+K(p,'jump')+' в такт!',3);}}}
    king.dance(dancing,dt);
    if(!F.kingDone&&[0,1].every(pi=>active(pi).pos.z<-217.6)){F.kingDone=true;kingEnd();}
    // Сад Китежа: родник наполняет сад через 10 с отлива; напев оставленного держит отлив
    GARD.holdT=Math.max(0,(GARD.holdT||0)-dt);
    if(GARD.state==='low'&&GARD.t>=1&&!G.cine){if(GARD.holdT<=0)F.gardT=(F.gardT||0)+dt;if(F.gardT>10){F.gardT=0;setWater(GARD,'high');banner('Родник опять наполнил сад!','#9fe6ff',1.8,'Потап — на дно, к ракушке; сменишь героя — оставленный подержит отлив');}}else F.gardT=0;
    if(!F.gardTold&&[0,1].some(pi=>active(pi).pos.z<-236.5&&active(pi).pos.z>-240)){F.gardTold=true;say('zven','Сад Китежа! Ракушка — на дне. Глубоко — только Потапу дойти!',3,true);}
    // Переливная: подсказка про Потапа, когда вода «не идёт»
    if(!F.out&&[0,1].every(pi=>active(pi).pos.z<-158+D3)&&[0,1].some(pi=>active(pi).pos.z<-168+D3)){F.out=true;finishLevel();}});
  W.tipZones.push({cond:(pi,h)=>[L1,L2,L3].some(z=>inZone(z,h,0)&&z.state==='low'&&h.pos.y<z.floor+0.4),text:pi=>'Стенка высока — не допрыгнуть никак.<br>Сыграй прилив '+K(pi,'item')+' — вода подымет на ступеньку, вот так.'},
    {cond:(pi,h)=>inZone(LIFT,h,0)&&h.pos.y>6,text:pi=>'Колодец-лифт: сыграй отлив '+K(pi,'item')+' — вода опустит вниз.'},
    {cond:(pi,h)=>mkt.started&&!mkt.done&&MP.state==='high'&&hd(h.pos,{x:0,z:-127+D})<7,text:pi=>'Жемчужница на дне пруда — створки не пробить.<br>Сыграй отлив '+K(pi,'item')+' — ахнет и раскроется. Или жемчужину её отбей назад!'},
    {cond:(pi,h)=>!F.grate&&h.pos.z<-141+D2&&h.pos.z>-157+D2,text:pi=>'Левой воде — прилив, правой — отлив. На таблички гляди!'},
    {cond:(pi,h)=>h.pos.z<-80&&h.pos.z>-108&&!SLU.held(),text:pi=>'Вода в каналах одна на двоих — через заслонку на дне левого канала.<br>Поставь на неё Потапа '+K(0,'swap')+': он тяжёлый, в воде не всплывёт — и держит, даже оставленный.'},
    {cond:(pi,h)=>h.pos.z<-80&&h.pos.z>-108&&SLU.held(),text:pi=>'Заслонку держат! Прилив у тебя '+K(pi,'item')+' — отлив у друга.<br>Лодка в прилив подвезёт к террасе, а верёвка там откроет ворота ДРУГА.'},
    {cond:(pi,h)=>h.pos.z<-180&&h.pos.z>-217&&!F.kingDone,text:pi=>KING.hum>0?'Царь пляшет — двери открыты! Беги, через волны прыгай '+K(pi,'jump')+'.':'Сыграй '+K(pi,'item')+' у стула гусляра — царь запляшет.<br>Сменишь героя '+K(pi,'swap')+' — оставленный доиграет, а ты беги к дверям.'},
    {cond:(pi,h)=>h.pos.z<-237&&h.pos.z>-259&&GARD.state==='high'&&h.kind!=='potap',text:pi=>pi?'Сад залит. Ракушка — на дне, у родника. Только Потап туда дойдёт.<br>Попроси друга '+K(1,'call')+'.':'Сад залит. Ракушка — на дне, у родника. Потап тяжёлый — дойдёт по дну. Смени '+K(0,'swap')+'.'},
    {cond:(pi,h)=>h.pos.z<-237&&h.pos.z>-259&&GARD.state==='low',text:pi=>(KS.some(s=>!s.grown)?'Дно открыто! Йоша, полей ростки живой водой '+K(1,'skill')+' — вырастут лесенки.<br>':'')+'Родник наполнит сад через '+Math.max(0,Math.ceil(10-(F.gardT||0)))+' с. Наверх — с листа на лист!'});
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>[L1,L2,L3].some(z=>inZone(z,h(),0.2)&&z.state==='low'&&h().pos.y<z.floor+0.5),'прилив — наверх');
    prompt(pi,'item',()=>headOf(h()),()=>inZone(LIFT,h(),0.2)&&LIFT.state==='high'&&h().pos.y>6,'отлив — вниз');
    prompt(pi,'item',()=>headOf(h()),()=>mkt.started&&!mkt.done&&inZone(MP,h(),1.2)&&MP.state==='high','отлив — Жемчужница ахнет');
    prompt(pi,'item',()=>headOf(h()),()=>!F.grate&&inZone(LZ,h(),0.2)&&LZ.state==='low','прилив!');
    prompt(pi,'item',()=>headOf(h()),()=>!F.grate&&inZone(RZ,h(),0.2)&&RZ.state==='high','отлив!');
    prompt(pi,'item',()=>headOf(h()),()=>SLU.held()&&hd(h().pos,pi?CR.shell.g.position:CL.shell.g.position)<2&&(pi?CR:CL).state==='low','прилив — лодку к террасе');
    prompt(pi,'attack',()=>headOf(h()),()=>!ropes[pi].pulled&&h().pos.y>2.9&&hd(h().pos,ropes[pi].g.position)<2,'дёрни верёвку');
    prompt(pi,'item',()=>headOf(h()),()=>GARD.state==='high'&&inZone(GARD,h(),0)&&h().pos.y<-3,'отлив — открой дно');}
  prompt(0,'swap',()=>headOf(HERO.potap),()=>!SLU.held()&&HERO.proshka.active&&active(0).pos.z<-78&&active(0).pos.z>-108,'Потапа — на заслонку');
  prompt(0,'skill',()=>headOf(HERO.potap),()=>!F.anchor&&HERO.potap.active&&hd(HERO.potap.pos,{x:4,z:-258.3})<2.3&&HERO.potap.pos.y<-3,'поднять якорь');
  prompt(1,'skill',()=>headOf(HERO.yosha),()=>HERO.yosha.active&&KS.some(s=>!s.grown&&hd(s,HERO.yosha.pos)<3&&Math.abs(HERO.yosha.pos.y-s.y)<2.2&&(s===KS[0]||F.anchor)),'живая вода — росток');
  /* ---------- сюжет ---------- */
  function sadkoIntro(){F.stage='intro';
    play({dur:9.4,fov:48,shots:[shot(0,[-0.6,3.2,-7.6],[-6.4,1.2,-15]),shot(4.2,[-4.3,1.9,-12.2],[-6.3,1.4,-14.7])],
      says:[[0.3,3.8,null,'<i>На площади Садко сидит — струна на гуслях порвана,</i><br><i>И капля тёмная над ней горит, как проклятая.</i>',true],[4.3,2.6,'sadko','Без струны нет песни. Без песни — и Китеж молчит.'],[7.0,2.2,'zven','Йоша! Мёртвой водой полей — и струна срастётся!']],
      tick:(t)=>{sadko.head.rotation.x=0.25;sadko.drop.position.y=1.35+Math.sin(t*3)*0.04;},end:()=>{F.stage='sadko';}});}
  function giftScene(){F.stage='gift';const T=HERO,pe=T.pelageya;
    HEROES.forEach((h,i)=>{placeOnGround(h,-4.2+(i%2)*1.6,-12.6-Math.floor(i/2)*1.4,0);h.face=Math.atan2(-6.5-h.pos.x,-14.8-h.pos.z);});
    const gifts=[];
    play({dur:20.6,fov:48,shots:[shot(0,[-4.6,1.8,-12.1],[-6.4,1.3,-14.8]),shot(5.4,[-1.2,2.8,-9.6],[-5.2,1.1,-13.6]),shot(9,[-3.8,1.6,-12.2],[-6.4,1.7,-14.8]),shot(17.4,[-1.8,1.5,-10.8],[pe.pos.x,0.9,pe.pos.z])],
      says:[[0.3,2.2,null,'<i>Срастается струна — звенит.</i>',true],[2.3,3.0,'sadko','Ох, запела! Спасибо, малые, спасибо!'],[5.6,3.4,'sadko','Играйте на ходу. Вода любит, когда с нею речь ведут.'],
        [9.2,2.4,'sadko','Лишь в Китеже не молчите — говорю.'],[11.7,2.4,'sadko','Только в Китеже — не молчите.'],[14.2,3.2,'sadko','Только в Китеже не молчите: кто молчит — того вода унесёт.'],[17.6,2.8,null,'<i>Пелагея клюв в перья прячет —</i><br><i>Вслух говорить ей трудно, иначе.</i>',true]],
      events:[{t:0,fn:()=>{sadko.drop.visible=false;SFX.grow();burst(new V3(-6.1,1.4,-14.4),0x9fe6ff,16,3);}},
        {t:1.4,fn:()=>{[67,71,74,79,78,74,71,74].forEach((m,i)=>later(i*0.22,()=>{gusli(m,0,0.18);sadko.arms.forEach((a,k)=>{a.rotation.x=(i+k)%2?0.3:-0.2;});}));}},
        {t:6.0,fn:()=>{HEROES.forEach((h,i)=>{const g=new THREE.Group();gusliMesh(g,M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.8}),0.9);W.group.add(g);gifts.push(g);const a=new V3(-6.2,1.6,-14.4),to=h.pos.clone().add(new V3(0,h.d.height*0.6,0));
          anim(1.0+i*0.15,k=>{g.position.lerpVectors(a,to,k);g.position.y+=Math.sin(k*Math.PI)*1.6;g.rotation.y+=0.2;if(k>=1){W.group.remove(g);burst(to,COL.gold,10,2);SFX.knot();}});});}},
        {t:17.6,fn:()=>{pe.parts.beak.visible=false;anim(0.6,k=>{pe.body.scale.set(1+0.12*k,1-0.12*k,1+0.12*k);});}}],
      tick:(t)=>{sadko.head.rotation.x=t<9?0.1:0.2;sadko.body.rotation.z=Math.sin(t*2)*0.03;},
      end:()=>{pe.parts.beak.visible=true;pe.body.scale.set(1,1,1);W.abil.gusli=true;F.stage='gusli';later(0.3,tuneScene);}});}
  // напев Садко: четыре звука — их Китеж вспомнит в 2-5, когда колокола будут подымать ярусы
  function tuneScene(){const T=HERO,notes=[];
    play({dur:8.2,fov:46,shots:[shot(0,[-3.6,1.7,-11.4],[-6.4,1.4,-14.8]),shot(4.4,[-1.4,2.6,-9.8],[-5,1.6,-13.4])],
      says:[[0.3,3.6,'sadko','А вот вам напев мой — четыре звука. Запомните: дзинь, дилинь, дон, дон.'],[4.1,3.6,'sadko','Китеж его помнит. Как будить станете — пригодится.']],
      events:[{t:0.6,fn:()=>{FIN.SADKO_TUNE.forEach((m,i)=>later(i*0.55,()=>{gusli(m,0,0.2);sadko.arms.forEach((a,k)=>{a.rotation.x=(i+k)%2?0.35:-0.25;});
          const s=new THREE.Sprite(new THREE.SpriteMaterial({map:KW_NOTE_TEX,transparent:true,depthWrite:false,color:[0xffe08a,0x9fe6ff,0xffb0d0,0xb8ffb0][i]}));s.scale.setScalar(0.5);s.raycast=()=>{};s.position.set(-6.2,2.2,-14.4);W.group.add(s);notes.push(s);
          const to=new V3(-4.6+i*0.9,2.6+(i%2)*0.4,-12.6);anim(1.2,k=>{s.position.lerpVectors(new V3(-6.2,2.2,-14.4),to,smooth(k));});}));}},
        {t:4.4,fn:()=>{notes.forEach((s,i)=>{const h=HEROES[i],from=s.position.clone();anim(1.4,k=>{s.position.lerpVectors(from,h.pos.clone().add(new V3(0,h.d.height,0)),smooth(k));s.material.opacity=1-k*0.6;if(k>=1){W.group.remove(s);burst(h.pos.clone().add(new V3(0,h.d.height,0)),COL.gold,6,2);}});});}}],
      tick:(t)=>{sadko.head.rotation.x=0.12;sadko.body.rotation.z=Math.sin(t*2.2)*0.04;},
      end:()=>{notes.forEach(s=>W.group.remove(s));banner('Гусли Садко!','#ffd76a',2.8,'кнопка R или ; (на джойстике RB): вода подымется или опустится там, где стоишь');
        for(const pi of[0,1])tip(pi,'Ракушка с лодочкой воду кажет: лодочка вверху — прилив, внизу — отлив.<br>Играй на гуслях '+K(pi,'item')+' — вот и весь мотив.',4.2);}});}
  W.waterTargets.push({pos:new V3(-5.9,0,-14.5),active:()=>F.stage==='sadko',onWater:()=>{giftScene();}});
  function bookScene(){F.stage='book';const T=HERO,pr=T.proshka;const umb=new THREE.Group();W.group.add(umb);umb.visible=false;
    addMesh(new THREE.CylinderGeometry(0.02,0.02,0.9,5),M(0x6a4a2a),0,-0.45,0,umb);const can=addMesh(new THREE.ConeGeometry(0.75,0.35,10),M(0x4f9a3a),0,0.05,0,umb);can.scale.set(0.2,1,0.2);
    placeOnGround(pr,0,-35.25,0);pr.face=Math.PI;placeOnGround(T.potap,-1.7,-34.4,0);T.potap.face=Math.PI*0.9;placeOnGround(T.pelageya,1.6,-34.7,0);T.pelageya.face=-Math.PI*0.88;placeOnGround(T.yosha,0.9,-33.9,0);T.yosha.face=Math.PI;
    play({dur:28,fov:46,camK:3.4,shots:[shot(0,[3.6,3.2,-30.2],[0,1.2,-36.5]),shot(3.1,[0.95,2.05,-34.5],[0,1.05,-36.5]),shot(7.5,[-1.35,1.28,-36.2],[-0.4,1.12,-36.5]),shot(12.6,[2.2,2.3,-33.6],[-6.4,2.2,-38.4]),
        shot(17.4,[1.9,1.9,-31.6],[0,1.9,-35.3],[1.9,1.4,-31.9],[0,5,-35.6],3),shot(23,[2.6,1.2,-32.4],[0.9,0.55,-33.9])],
      says:[[0.3,3.2,null,'<i>В библиотеке терема на подставке</i><br><i>Лежит толстая книга сказок, без закладки.</i>',true],[3.3,3.6,null,'<i>Прошка её открывает — в лапах один переплёт:</i><br><i>Все страницы вырваны — вот тебе и переворот.</i>',true],
        [7.7,2.4,null,'<i>На корешке кто-то ключом слова нацарапал.</i>',true],[10.2,2.8,'proshka','Тут нацарапано: «Не… про… меня». Кто ж так обиделся, кто заплакал?'],[13,3.2,null,'<i>За стеной воды тихо ключи звенят.</i>',true],
        [17.6,2.6,'proshka','Зонт из лопуха — от воды, от дождя!'],[20.5,2.4,null,'<i>Зонт всплывает — да без Прошки.</i>',true],[23.1,1.6,'yosha','Ха-ха-ха! Вот потеха!'],[24.9,3,null,'<i>Йоша смеётся — да на звон оглянется.</i>',true]],
      events:[{t:3.6,fn:()=>{SFX.flower();anim(1.1,k=>{front.rotation.z=-Math.PI*smooth(k);});}},{t:13,fn:()=>{SFX.keys();anim(4,k=>{shadow.material.opacity=Math.sin(k*Math.PI)*0.35;shadow.position.z=-39+k*5;});}},{t:15.4,fn:()=>SFX.keys()},
        {t:17.7,fn:()=>{umb.visible=true;umb.position.set(pr.pos.x+0.2,pr.pos.y+1.9,pr.pos.z);anim(0.5,k=>{can.scale.set(0.2+0.8*k,1,0.2+0.8*k);});SFX.flower();}},
        {t:20.3,fn:()=>{const from=umb.position.clone();anim(6,k=>{umb.position.set(from.x+Math.sin(k*5)*0.4,from.y+k*6,from.z-k*1.2);umb.rotation.z=Math.sin(k*9)*0.3;});}},
        {t:23.1,fn:()=>{anim(1.2,k=>{T.yosha.extraY=Math.abs(Math.sin(k*Math.PI*4))*0.2;});}},{t:25,fn:()=>{T.yosha.face=Math.atan2(-6.4-T.yosha.pos.x,-38-T.yosha.pos.z);SFX.keys();}}],
      tick:(t)=>{curtain.material.opacity=0.2+0.06*Math.sin(t*3);},end:()=>{F.book=true;F.stage='street';T.yosha.extraY=0;W.group.remove(umb);}});}
  // Переливная улица: короткий показ — вода одна, заслонка на дне
  function perelScene(){const P=HERO.potap;
    play({dur:9,fov:50,shots:[shot(0,[0,7.5,-76],[0,-1,-95]),shot(4.6,[-5,2.4,-88],[-2.8,-2,-95])],
      says:[[0.3,4,'zven','Улица в два канала, а вода у них одна! Отольёшь у себя — у друга прибудет.'],[4.5,4.2,'zven','Да заслонка на дне закрыта. Тяжёлый нужен — чтоб не всплыл и держал!']],
      events:[{t:5,fn:()=>{for(let i=0;i<3;i++)later(i*0.5,()=>ringFx(new V3(-2.8,-2.3,-95),0xffd9a0,1.6));}}],
      end:()=>{later(0.5,()=>bark(P,'potap','Тяжёлый? Это я. Как положено.',2,true));}});}
  // палаты Морского царя
  function kingScene(){
    play({dur:8.6,fov:48,shots:[shot(0,[0,4.2,-196],[0,2.8,-214.8]),shot(4.2,[2.4,3.2,-209],[0,3.2,-214.8])],
      says:[[0.3,3.8,null,'<i>В палатах на троне — Морской царь, борода из тины, на голове — венец.</i>',true],[4.3,4,'king','Гусли слышу! Сыграйте мне — попляшу! А не спляшу — дверей не открою!']],
      tick:(t)=>{king.dance(false,1/60);king.head.rotation.y=Math.sin(t*1.5)*0.3;}});}
  function kingEnd(){const T=HERO;KING.hum=0;
    play({dur:11,fov:48,shots:[shot(0,[0,3.6,-205],[0,3,-214.8]),shot(5.6,[4,2.4,-220],[0,1.2,-218])],
      says:[[0.3,2.6,'king','Ох, уважили! Ох, наплясался!'],[3.0,3.2,'yosha','Царь-батюшка, а наверху от твоей пляски корабли качаются!'],[6.4,4.2,'king','И то правда… Заплясался я. Ступайте! Вот вам по жемчужинке — за гусли.']],
      events:[{t:7,fn:()=>{for(let i=0;i<2;i++){const it=nutItem(-1+i*2,3.2,-214);it.locked=true;const to=active(i).pos.clone();anim(1.2+i*0.2,k=>{it.pos.set(lerp(-1+i*2,to.x,k),3.2+Math.sin(k*Math.PI)*1.5,lerp(-214,to.z,k));});later(1.5+i*0.2,()=>{it.locked=false;takeItem(it,active(i));});}SFX.ok();}}],
      tick:(t)=>{king.dance(t<3,1/60);},end:()=>{for(const q of HD){q.k=1;q.col.on=false;q.g.position.y=4.5;}F.kingOpen=true;}});}
  W.onSelfBreak=(e)=>{if(!F.laugh){F.laugh=true;later(0.5,()=>bark(HERO.yosha,'yosha','Она сама себя — вот так лихо!',2));}};
  W.updates.push(dt=>{curtain.material.opacity=0.18+0.05*Math.sin(G.time*2);
    if(F.kingOpen)for(const q of HD){q.k=1;q.col.on=false;q.g.position.y=4.5;}
    if(F.stage==='walk'&&[0,1].some(pi=>active(pi).pos.z<-10.5))sadkoIntro();
    if(F.stage==='gusli'&&!F.book&&!G.cine&&[0,1].some(pi=>active(pi).pos.z<-31.5))bookScene();
    if(!F.pikeTold&&W.enemies.some(e=>e.kind==='shchuka'&&e.state==='wind')){F.pikeTold=true;banner('Щука-морок!','#9fd0ff',2,'плавает где хочет; синяя капля: щитом закройся, а в последний миг — отбей ей обратно в пасть');}
    if(!F.clamTold&&W.enemies.some(e=>e.kind==='zhemchug'&&e.state==='wind')){F.clamTold=true;banner('Жемчужница-морок!','#c8b8f0',2.4,'створки не пробить: жемчужину отбей обратно '+K(0,'guard')+' / '+K(1,'guard')+' в последний миг — или отлив сыграй, ахнет');}
    sadko.body.rotation.z=Math.sin(G.time*0.8)*0.02;});
  /* ---------- рисунки кнопок ---------- */
  const T=HERO,inFountain=h=>hd(h.pos,{x:0,z:-18})<4.4;
  prompt(1,'skill',()=>headOf(T.yosha),()=>F.stage==='sadko'&&T.yosha.active&&hd(T.yosha.pos,{x:-5.9,z:-14.5})<5,'мёртвая вода');
  prompt(1,'swap',()=>headOf(T.yosha),()=>F.stage==='sadko'&&T.pelageya.active&&hd(T.pelageya.pos,{x:-5.9,z:-14.5})<7,'Йоша');
  for(const pi of[0,1]){const h=()=>active(pi),d=SD[pi];
    prompt(pi,'item',()=>headOf(h()),()=>W.abil.gusli&&!fLink.taken&&inFountain(h())&&fz.state==='low','прилив');
    prompt(pi,'item',()=>headOf(h()),()=>W.abil.gusli&&inZone(d.zA,h(),0.4)&&h().pos.y<3.3&&d.zA.state==='low'&&h().pos.z<-45&&h().pos.z>-56,'прилив — лодки всплывут');
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
    O(pi?()=>'Переливная улица! Вода в двух каналах одна — через заслонку на дне левого канала. Ждём: Потап её подержит.<br>Прилив у тебя '+K(1,'item')+' — отлив у друга. Лодкой — к террасе, дёрни верёвку: откроешь ворота ДРУГА.':
        ()=>'Переливная улица! Вода в двух каналах одна — через заслонку на дне левого канала.<br>Поставь на неё Потапа: он тяжёлый, не всплывёт и держит, даже оставленный. Прилив у тебя '+K(0,'item')+' — отлив у друга.<br>Лодкой — к террасе, дёрни верёвку: откроешь ворота ДРУГА.',
      ()=>active(pi).pos.z<-113,()=>{const r=[];if(!SLU.held())r.push(SLU.g);if(!ropes[pi].pulled)r.push(ropes[pi].fl);if(!PG[pi].open)r.push(PG[pi].g);return r;}),
    O(()=>'Шлюзы! Встань в воду и прилив '+K(pi,'item')+' сыграй — вода подымет на ступеньку.<br>Три ступеньки — и наверх, помаленьку.',()=>active(pi).pos.z<-104.2+D,()=>[L1,L2,L3].filter(z=>inZone(z,active(pi),6)).map(z=>z.shell.g)),
    O(()=>'Колодец-лифт. Встань в воду, отлив '+K(pi,'item')+' сыграй —<br>Спустишься вниз, как на лифте, так и знай.',()=>active(pi).pos.z<-116.5+D&&active(pi).pos.y<1,()=>[LIFT.shell.g]),
    O(()=>'Торговые ряды! Раки щиплют красным — кувырком '+K(pi,'roll')+'.<br>Жемчужница в пруду: отлив '+K(pi,'item')+' — ахнет и раскроется, тут и бей.',()=>mkt.done,()=>mkt.list.filter(e=>e.alive).map(e=>e.g)),
    O(()=>'Палаты Морского царя! Сыграй '+K(pi,'item')+' у стула гусляра — царь запляшет, двери откроются.<br>Сменишь героя '+K(pi,'swap')+' — оставленный доиграет 15 с. Через волны прыгай '+K(pi,'jump')+'. У трона — второй стул: сыграй — пройдёт и друг.',
      ()=>!!F.kingDone,()=>KING.hum>0?HD.map(q=>q.g):seats.map(s=>s.g)),
    O(()=>'Две раковины. На таблички гляди: левой — прилив, правой — отлив.<br>Сыграйте '+K(pi,'item')+' — каждый у своей, вот и весь мотив.',()=>!!F.grate,()=>[LZ.shell.g,RZ.shell.g]),
    O(()=>'Сад Китежа. Ракушка — на дне, у родника: в приливе дойдёт только тяжёлый Потап — отлив '+K(pi,'item')+'.<br>Йоша польёт ростки '+K(1,'skill')+' — вырастут лесенки к террасе. Родник снова наполнит сад — пусть оставленный держит напев!',
      ()=>active(pi).pos.z<-262,()=>{const r=[];if(GARD.state==='high')r.push(GARD.shell.g);for(const s of KS)if(!s.grown)r.push(s.g);if(!F.anchor)r.push(anchor);return r;}),
    O('Ворота Китежа — бери звено, и в путь-дорогу!',()=>false,()=>[endLink.g])];
  for(const pi of[0,1])W.objectives[pi]=common(pi).concat(side(pi),late(pi));
  W.tipZones.push({cond:(pi,h)=>h.grounded&&h.groundRef&&h.groundRef.water,text:pi=>'Ты плывёшь! Из воды высоко не выпрыгнуть.<br>Сыграй на гуслях '+K(pi,'item')+' — лодка всплывёт, подвезёт — не сгинуть.'},
    {cond:(pi,h)=>h.pos.y<-1.5&&h.pos.z<-45&&h.pos.z>-52,text:pi=>'Отлив открыл подвал. На дне — орешек! Назад — по ступенькам.'},
    {cond:(pi,h)=>SD[pi]&&SD[pi].inShaft(h)&&h.pos.y<-2,text:pi=>'Дно колодца. К сундуку подойди — сам откроется.<br>Наверх — прилив '+K(pi,'item')+' сыграй, и вода подымется.'});
  W.spawns=[[new V3(-3.5,0,5),new V3(-5.5,0,6)],[new V3(3.5,0,5),new V3(5.5,0,6)]];W.startAct=[0,0];
  W.pauseLine='Подводный Китеж. Гусли Садко: RB воду меняет там, где стоишь, —<br>Прилив лодки подымет, отлив подвалы откроет, глядишь.<br>Переливная улица: вода одна на двоих — Потап на заслонке держит.<br>Морскому царю сыграй — запляшет; сад Китежа: Потап по дну, Йоша — лесенки растит.<br>В Китеже молчать нельзя — запомни в голове.';
  W.onStart=()=>{later(0.8,()=>say('zven','Китеж! Под водою спит он. Дзинь — за мной!',2.6,true));};
  // для ботов: перенос к участку
  W.warp21=(where)=>{F.stage='street';F.book=true;W.abil.gusli=true;const P={perel:[-6,0,-78],locks:[0,0,-118],market:[0,0,-157],dance:[0,0,-182],shells:[0,0,-219],garden:[0,0,-235.5],gate:[0,0,-267]}[where];
    if(where==='dance'||where==='shells'||where==='garden'||where==='gate'){mkt.started=true;mkt.done=true;mktGate.forceOpen=true;}if(where==='shells'||where==='garden'||where==='gate'){F.kingMet=true;F.kingDone=true;F.kingOpen=true;}
    if(where==='garden'||where==='gate'){F.grate=true;grateCol.on=false;grate.position.y=3.8;}if(where==='gate'){F.gardTold=true;}
    if(where!=='perel'){PG.forEach((q,i)=>openPG(i));F.perelTold=true;}if(where==='dance')F.kingMet=true;
    HEROES.forEach((h,i)=>{placeOnGround(h,P[0]+(i%2?1.4:-1.4)+(i>1?3:0)*(P[0]<0?1:-1),P[2]+(i>1?0.6:0),P[1]);h.following=false;});for(const pi of[0,1])players[pi].cp.set(P[0],P[1],P[2]);snapCams();
    return W.dbg21();};
  W.dbg21=()=>({CL,CR,SLU,boatL,boatR,ropes,PG,KING,HD,seats,WAV,king,GARD,KS,anchor,LZ,RZ,mkt,endLink,F});
  flushDecor();
};
