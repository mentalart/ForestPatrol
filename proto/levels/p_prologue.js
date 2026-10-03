/* ============================== УРОВЕНЬ: ПРОЛОГ «ЗВЕНЫШКО» ============================== */
function buildPrologue(){
  setTheme('evening');sky('evening');W.name='Пролог · «Звенышко»';W.sub='вечер в штабе-сосне Лесного патруля';W.camX=8;
  const F=W.flags;F.stage='room';F.spot=[false,false];const R=7;
  /* ---------- А. Штаб-сосна: ствол в разрезе, как кукольный домик ---------- */
  colBox(-7.2,7.2,-4,0,-7.2,7.5,false);
  addMesh(new THREE.CylinderGeometry(R,R,0.3,48,1,false,Math.PI/2,Math.PI),MAT.plank,0,-0.15,0);addMesh(new THREE.BoxGeometry(2*R+0.4,0.3,7.5),MAT.plank,0,-0.15,3.75);
  for(let x=-6.5;x<=6.51;x+=1.0){const z0=-Math.sqrt(R*R-x*x)+0.1,z1=7.4;addMesh(new THREE.BoxGeometry(0.04,0.02,z1-z0),M(0x7a5634),x,0.01,(z0+z1)/2).castShadow=false;}
  addMesh(new THREE.CylinderGeometry(7.3,8.6,14,32),MAT.bark,0,-7.3,0);                                 // ствол ниже штаба
  const wallM=M(0x8a5a36,{side:THREE.DoubleSide}),gap=0.33;
  const walls=[];for(const[a0,a1]of[[Math.PI/2,Math.PI-gap],[Math.PI+gap,Math.PI*1.5]])walls.push(addMesh(new THREE.CylinderGeometry(R,R,4.2,28,1,true,a0,a1-a0),wallM,0,2.1,0));
  walls.push(addMesh(new THREE.CylinderGeometry(R,R,1.45,8,1,true,Math.PI-gap,2*gap),wallM,0,3.475,0));
  walls.push(addMesh(new THREE.CylinderGeometry(R*0.9,R,24,28,1,true,Math.PI/2,Math.PI),M(0x5e4128,{side:THREE.DoubleSide}),0,16.2,0));  // сосна тянется вверх
  walls.forEach(w=>{w.receiveShadow=false;});
  {const rim=addMesh(new THREE.TorusGeometry(R,0.16,6,40,Math.PI),M(0x5a3a1e),0,4.2,0);rim.rotation.x=-Math.PI/2;walls.push(rim);}
  for(let a=Math.PI/2;a<=Math.PI*1.5+1e-3;a+=0.085){if(Math.abs(a-Math.PI)<gap-0.03)continue;W.cyls.push({x:Math.sin(a)*(R+0.35),z:Math.cos(a)*(R+0.35),r:0.6,miny:-1,maxy:4.2,on:true});}
  colBox(-7.3,7.3,0,1.1,7.3,7.6);colBox(-7.5,-7.2,0,1.1,0,7.6);colBox(7.2,7.5,0,1.1,0,7.6);
  {const rail=M(0x6b4424);addMesh(new THREE.BoxGeometry(14.7,0.1,0.12),rail,0,0.95,7.45);for(let x=-7.2;x<=7.21;x+=1.2)addMesh(new THREE.CylinderGeometry(0.06,0.07,0.95,6),rail,x,0.47,7.45);
   for(const s of[-1,1]){addMesh(new THREE.BoxGeometry(0.12,0.1,7.4),rail,s*7.3,0.95,3.75);for(let z=0.6;z<7.4;z+=1.2)addMesh(new THREE.CylinderGeometry(0.06,0.07,0.95,6),rail,s*7.3,0.47,z);}}
  // дверь на ветку (закрыта до ролика)
  const door=new THREE.Group();door.position.set(-2.3,0,-6.72);W.group.add(door);
  addMesh(new THREE.BoxGeometry(4.6,2.75,0.16),M(0x6b3f22),2.3,1.375,0,door);for(let x=0.45;x<4.5;x+=0.55)addMesh(new THREE.BoxGeometry(0.06,2.6,0.2),M(0x4a2a14),x,1.35,0.02,door);
  addMesh(new THREE.SphereGeometry(0.1,8,6),M(COL.gold),4.05,1.3,0.14,door);for(const s of[-1,1])walls.push(addMesh(new THREE.BoxGeometry(0.3,2.9,0.4),M(0x4a2a14),s*2.42,1.45,-6.65));walls.push(door);
  const doorCol=colBox(-2.45,2.45,0,2.9,-7.1,-6.35,false);
  // круглое окно-диорама: ночь, луна; по луне проползёт длинная тень
  const wa=Math.PI-0.85,win=new THREE.Group();win.position.set(Math.sin(wa)*(R-0.1),2.55,Math.cos(wa)*(R-0.1));win.lookAt(0,2.55,0);W.group.add(win);walls.push(win);
  addMesh(new THREE.TorusGeometry(0.95,0.12,8,32),M(0x5a3a20),0,0,0,win);win.add(new THREE.Mesh(new THREE.CircleGeometry(0.93,32),MB(0x1c2750)));
  {const md=new THREE.Mesh(new THREE.CircleGeometry(0.3,24),MB(0xfff2c0));md.position.set(0.2,0.24,0.01);win.add(md);
   for(let i=0;i<9;i++){const s=new THREE.Mesh(new THREE.CircleGeometry(0.018,6),MB(0xffffff));s.position.set(rand(-0.75,0.75),rand(-0.6,0.75),0.005);if(s.position.length()<0.86)win.add(s);}
   const lf=MB(0x0c1224);for(const[x,y,r]of[[-0.6,-0.5,0.9],[0.55,-0.6,-0.5],[-0.68,0.3,1.3],[0.1,-0.75,0]]){const c=new THREE.Mesh(new THREE.ConeGeometry(0.17,0.55,5),lf);c.position.set(x,y,0.015);c.rotation.z=r;win.add(c);}}
  const shadow=new THREE.Group();shadow.position.set(-0.75,0.2,0.02);win.add(shadow);{const sm=MB(0x04060c);shadow.add(new THREE.Mesh(new THREE.PlaneGeometry(0.13,0.6),sm));
   for(const x of[-0.045,0,0.045]){const c=new THREE.Mesh(new THREE.ConeGeometry(0.022,0.08,4),sm);c.position.set(x,0.33,0);shadow.add(c);}
   const arm=new THREE.Mesh(new THREE.PlaneGeometry(0.28,0.03),sm);arm.position.set(0.12,0.06,0);arm.rotation.z=-0.35;shadow.add(arm);}shadow.visible=false;
  const winPos=new V3();win.getWorldPosition(winPos);
  // лампа
  const lampG=new THREE.Group();lampG.position.set(0.3,3.5,-1.0);W.group.add(lampG);addMesh(new THREE.CylinderGeometry(0.012,0.012,2.4,4),MAT.dark,0,1.2,0,lampG);
  addMesh(new THREE.SphereGeometry(0.22,12,10),M(0xffe0a0,{emissive:0xffc060,emissiveIntensity:1}),0,0,0,lampG).castShadow=false;addMesh(new THREE.ConeGeometry(0.32,0.22,10),M(0x5a3a20),0,0.2,0,lampG);
  const lampL=new THREE.PointLight(0xffc27a,1.3,18,1.5);lampL.position.set(0.3,3.2,-1.0);W.group.add(lampL);
  // уют: коврик, стол с тетрадкой, верстак Прошки, лесенка Тишки, лежанка, знамя патруля
  {const rug=addMesh(new THREE.CylinderGeometry(2.3,2.3,0.03,32),M(0xa8483a),0.2,0.015,0.8);rug.castShadow=false;for(const r of[1.7,1.1]){const t=addMesh(new THREE.TorusGeometry(r,0.05,4,32),M(0xe8b050),0.2,0.035,0.8);t.rotation.x=Math.PI/2;t.castShadow=false;}}
  addMesh(new THREE.CylinderGeometry(0.58,0.58,0.06,20),M(0x9a6a3c),2.9,0.6,-2.1);addMesh(new THREE.CylinderGeometry(0.08,0.12,0.6,8),M(0x6b4424),2.9,0.3,-2.1);W.cyls.push({x:2.9,z:-2.1,r:0.6,miny:0,maxy:0.63,on:true});
  box(-6.4,-5.2,0,0.75,-1.6,0.0,M(0x8a5a32));addMesh(new THREE.BoxGeometry(0.3,0.2,0.4),M(0x777777),-5.8,0.85,-1.1);addMesh(new THREE.CylinderGeometry(0.03,0.03,0.5,5),M(0x5a3a1a),-5.6,0.8,-0.4).rotation.z=1.4;
  for(let i=0;i<3;i++)box(-5.4,-3.8,0,0.32*(i+1),-3.4-0.6*(i+1),-3.4-0.6*i,M(0x9a6a3c));
  box(5.0,6.6,0,0.5,0.6,3.2,M(0x7a5232));addMesh(new THREE.BoxGeometry(1.5,0.12,2.2),M(0x4f7fb0),5.8,0.56,2.0);addMesh(new THREE.BoxGeometry(0.9,0.18,0.5),M(0xf0e8d8),5.8,0.62,0.95);
  {const ba=Math.PI+0.62,fl=new THREE.Group();fl.position.set(Math.sin(ba)*(R-0.12),2.4,Math.cos(ba)*(R-0.12));fl.lookAt(0,2.4,0);W.group.add(fl);walls.push(fl);
   fl.add(new THREE.Mesh(new THREE.PlaneGeometry(1.1,1.5),M(0x3f7a44,{side:THREE.DoubleSide})));const pw=pawIcon();pw.scale.setScalar(1.1);pw.position.set(0,0.1,0.02);fl.add(pw);
   const b2=new THREE.Mesh(new THREE.PlaneGeometry(1.1,0.12),MB(COL.gold));b2.position.set(0,-0.8,0.01);fl.add(b2);}
  fadeable(walls);   // стена штаба с дверью, окном и знаменем: заслонит героев — станет полупрозрачной
  // еловые лапы растут из ствола наружу (верхушка конуса — от ствола; основание — у коры, выше стен штаба): внутрь комнаты не лезут;
  // над выходом хвои нет — дорога к трещине видна
  for(let i=0;i<22;i++){const a=rand(Math.PI*0.45,Math.PI*1.55),s=rand(1.1,1.8),r=R+0.3+0.9*s,nx=Math.sin(a)*r,nz=Math.cos(a)*r,ny=rand(4.9,6.6);if(Math.abs(nx)<3.6&&nz<0)continue;needle(nx,ny,nz,a+Math.PI/2,s);}
  const spots=[[-2.0,1.4],[2.2,1.4]].map(([x,z])=>{const g=new THREE.Group();g.position.set(x,0,z);W.group.add(g);const m=M(COL.yellow,{emissive:COL.yellow,emissiveIntensity:0.5});
    const disc=addMesh(new THREE.CylinderGeometry(0.85,0.85,0.04,28),m,0,0.03,0,g);disc.castShadow=false;const r=addMesh(new THREE.TorusGeometry(0.95,0.05,6,28),MB(0xffffff,{transparent:true,opacity:0.8}),0,0.07,0,g);r.rotation.x=Math.PI/2;return {x,z,g,m,r};});
  const tish=makeTishka();tish.g.position.set(-4.6,0.64,-4.3);tish.g.rotation.y=0.5;
  const nb=makeNotebook();const NB_TABLE=new V3(2.9,0.63,-2.1),NB_WING=new V3(4.25,0.75,-3.2);nb.g.position.copy(NB_TABLE);nb.g.rotation.y=0.25;
  const sc=makeScooter();sc.g.position.set(-4.7,0,-0.8);sc.g.rotation.y=0.3;
  const roomZone={x:0,z:0.6,r:6.2};roomZone.camActive=()=>F.stage==='room';W.camZones.push(roomZone);
  const Z=makeZven();W.zven=Z;Z.mode='script';Z.vis=false;Z.pos.set(2.9,9,-2.1);

  /* ---------- Б. Ветки: трещина, развилка, уступ (Прошка) / овраг (Пелагея) и лаз в корне (Йоша) ---------- */
  const CRK0=-15.4,CRK1=-17.0;   // первая трещина (первый прыжок игры): ближний край CRK0, дальний CRK1 — в 8,7 м от двери, чтобы у края ничего не заслоняло вид
  branch(-2.4,2.4,CRK0,-6.5);branch(-2.4,2.4,-18,CRK1);branch(-8.6,8.6,-21,-18);
  const crackMark=box(-2.4,2.4,-0.05,0.03,CRK0-0.1,CRK0,M(COL.gold,{emissive:COL.gold,emissiveIntensity:0.25}),{solid:false}).mesh;
  // трещина видна сразу: тёмная пропасть внизу, щепки по краям, золотая кромка на обоих краях
  {const pit=addMesh(new THREE.BoxGeometry(4.8,0.1,CRK0-CRK1),M(0x140c08),0,-2.4,(CRK0+CRK1)/2);pit.castShadow=false;pit.receiveShadow=false;
   const far=addMesh(new THREE.BoxGeometry(4.8,0.08,0.1),M(COL.gold,{emissive:COL.gold,emissiveIntensity:0.25}),0,-0.01,CRK1+0.05);far.castShadow=false;
   const sp=M(0xb98a52);for(const[z0,dir]of[[CRK0,-1],[CRK1,1]])for(let i=0;i<7;i++){const c=addMesh(new THREE.ConeGeometry(0.07,0.42,4),sp,-2.1+i*0.7+rand(-0.15,0.15),-0.12,z0+dir*0.1);c.rotation.x=dir*Math.PI/2*0.85;c.rotation.z=rand(-0.4,0.4);c.castShadow=false;}}
  // подсказка первого прыжка: над трещиной — светящаяся дуга-стрелка (по ней бегут огоньки), на том краю — кольцо «сюда!»
  const jArc=new THREE.Group();jArc.position.set(0,0,(CRK0+CRK1)/2);W.group.add(jArc);
  {const am=MB(0xfff2b0,{transparent:true,opacity:0.85,depthWrite:false}),pt=u=>new V3(0,0.4+Math.sin(u*Math.PI)*1.4,(0.5-u)*3.0);
   for(let i=0;i<10;i++){const seg=new THREE.TubeGeometry(new THREE.LineCurve3(pt(i/10),pt((i+0.82)/10)),2,0.07,6,false);jArc.add(new THREE.Mesh(seg,am.clone()));}
   const tp=new THREE.Mesh(new THREE.ConeGeometry(0.3,0.6,8),am.clone());tp.position.copy(pt(1));tp.position.y+=0.15;tp.rotation.x=-Math.PI*0.68;jArc.add(tp);}
  const jRing=new THREE.Mesh(new THREE.TorusGeometry(0.8,0.07,8,32),MB(0xfff2b0,{transparent:true,opacity:0.9}));jRing.rotation.x=Math.PI/2;jRing.position.set(0,0.06,CRK1-0.9);W.group.add(jRing);
  const JH={done:[false,false],told:[false,false],fell:[false,false],brake:[0,0]};F.jump1=JH;
  branch(-8.6,-1.4,-25.02,-21);
  const ledge=box(-8.6,-1.4,-3,1.92,-36,-25,MAT.bark,{occ:false}).mesh;addMesh(new THREE.BoxGeometry(7.08,0.1,10.94),MAT.moss,-5,1.88,-30.5);
  branch(1.4,8.6,-23,-21);branch(1.4,8.6,-36,-28.2);colBox(6.4,7.8,-1.2,0,-28.2,-23);
  W.noCarry.push({minx:1.2,maxx:6.3,miny:-6,maxy:8,minz:-28.3,maxz:-22.9});   // через овраг Йошу не переносит — у него свой лаз
  const ravineMark=box(1.4,6.2,-0.05,0.03,-23.1,-23,M(COL.gold,{emissive:COL.gold,emissiveIntensity:0.25}),{solid:false}).mesh;
  // корень-труба через овраг: внутри пол, сверху тело корня от 0,72 м — пролезет только Йоша
  const logMark=W.group.children.length;const logM=M(0x6a4a2c,{side:THREE.DoubleSide});{const lg=new THREE.CylinderGeometry(1.08,1.12,6.1,16,1,true);lg.rotateX(Math.PI/2);var logMesh=addMesh(lg,logM,7.1,1.02,-25.6);}
  for(const z of[-22.55,-28.65])addMesh(new THREE.TorusGeometry(1.1,0.15,8,24),M(0x4a3018),7.1,1.02,z);
  addMesh(new THREE.BoxGeometry(1.4,0.06,6.1),M(0x3a2818),7.1,0.02,-25.6);
  for(let i=0;i<5;i++){const r=addMesh(new THREE.ConeGeometry(0.16,1.4,5),M(0x5a3d22),7.1+rand(-0.6,0.9),1.9,-23.2-i*1.25);r.rotation.z=rand(-1.2,1.2);r.rotation.x=rand(-0.4,0.4);}
  colBox(6.2,8.5,0.72,2.2,-28.65,-22.55);colBox(6.2,6.4,-1.2,0.72,-28.2,-23);colBox(7.8,8.5,-1.2,0.72,-28.2,-23);fadeable(since(logMark));
  // лесенка, которую скинет Прошка с уступа
  const ladderBtn=plate(-6.9,-27.6,'ladder',1.92);ladderBtn.once=true;   // кнопка на уступе: встанет Прошка — скинет лесенку
  const ladder=new THREE.Group();W.group.add(ladder);const steps=[];
  for(let i=0;i<6;i++){const top=0.32*(i+1),z1=-21-i*0.66,z0=z1-0.66;const m=addMesh(new THREE.BoxGeometry(1.5,0.1,0.5),M(0x9a6a3c),-7.75,top-0.05,(z0+z1)/2,ladder);m.scale.set(0.01,1,1);const col=colBox(-8.5,-7.0,-1.2,top,z0,z1);col.on=false;steps.push({m,col});}
  const ropes=[-8.45,-7.05].map(x=>{const r=addMesh(new THREE.CylinderGeometry(0.03,0.03,4.0,5),M(0xc8a878),x,1.11,-23.13,ladder);r.rotation.x=-1.153;r.scale.y=0.01;return r;});
  // стены-перила (свалиться можно только в трещину и в овраг)
  wall(-2.6,-2.4,-18,-6.5);wall(2.4,2.6,-18,-6.5);wall(-8.8,-8.6,-36,-18);wall(8.6,8.8,-36,-18);wall(-8.8,-2.4,-17.9,-17.7);wall(2.4,8.8,-17.9,-17.7);wall(-1.4,-1.2,-36,-21);wall(1.2,1.4,-36,-21);
  fadeable(addMesh(new THREE.CylinderGeometry(0.8,1.2,26,10),MAT.bark,0,-0.5,-29.5));W.cyls.push({x:0,z:-29.5,r:1.1,miny:-13,maxy:13,on:true,occ:true});
  for(let z=-7.5;z>-18;z-=1.1){needle(-2.9,-0.25,z,0,rand(0.9,1.3));needle(2.9,-0.25,z,Math.PI,rand(0.9,1.3));}
  for(let z=-18.5;z>-36;z-=1.2){needle(-9.1,-0.25,z,0,rand(1,1.5));needle(9.1,-0.25,z,Math.PI,rand(1,1.5));if(z<-21.5){needle(-1.0,z<-25?1.6:-0.25,z,Math.PI,0.8);needle(1.0,-0.25,z,0,0.8);}}
  for(const[x,z,y]of[[-2.1,-8.2],[2.1,-8.2],[-2.1,CRK0+2.8],[2.1,CRK0+2.8],[-8.2,-19.2],[8.2,-19.2],[-8.2,-33.5,1.92],[8.2,-34.5],[-9.1,-38.2],[9.1,-38.2]])lantern(x,z,y);
  for(let i=0;i<80;i++){const s=Math.random()<0.5?-1:1;decorFir(s*rand(11.5,36),rand(-70,14),rand(3.6,6),true,-13);}
  for(let i=0;i<12;i++)decorFir(rand(-9,9),rand(-34,-8),rand(2.2,3.1),true,-13);
  bell(0,-9.2);bell(-5,-19.4);bell(5,-19.4);

  /* ---------- В. Холм и старая калитка: рогатка Прошки / ковшик Йоши ---------- */
  ground(-9.6,9.6,-41,-36);ground(-9.6,1.8,-49,-41);ground(-9.6,9.6,-112,-49);
  wall(-9.8,-9.6,-112,-36);wall(9.6,9.8,-112,-36);wall(-9.8,9.8,-112.2,-112);
  edgeTrees(-110,-37,-9.6,9.6);
  {const wt=new THREE.Mesh(new THREE.PlaneGeometry(7.8,8),MB(0x2a4f86));wt.rotation.x=-Math.PI/2;wt.position.set(5.7,-1.35,-45);W.group.add(wt);
   for(let i=0;i<7;i++){const st=addMesh(new THREE.IcosahedronGeometry(rand(0.3,0.6),0),MAT.stone,rand(2.2,9.2),-1.1,rand(-48.5,-41.5));st.rotation.set(rand(0,3),rand(0,3),0);}}
  const fenceMark=W.group.children.length;const fm=M(0x7a5634);
  for(let x=-9.4;x<=-6.45;x+=0.34){addMesh(new THREE.CylinderGeometry(0.13,0.15,3.0,6),fm,x,1.5,-42);addMesh(new THREE.ConeGeometry(0.15,0.4,6),fm,x,3.2,-42);}
  for(let x=-3.25;x<=1.7;x+=0.34){addMesh(new THREE.CylinderGeometry(0.13,0.15,3.0,6),fm,x,1.5,-42);addMesh(new THREE.ConeGeometry(0.15,0.4,6),fm,x,3.2,-42);}
  for(const y of[0.8,2.2]){addMesh(new THREE.BoxGeometry(3.2,0.12,0.1),M(0x5a3a1a),-7.9,y,-41.82);addMesh(new THREE.BoxGeometry(5.1,0.12,0.1),M(0x5a3a1a),-0.8,y,-41.82);}
  for(const x of[-6.2,-3.4])addMesh(new THREE.CylinderGeometry(0.2,0.22,3.3,8),M(0x4a3020),x,1.65,-42);
  colBox(-9.6,-6.3,0,3.4,-42.3,-41.7);colBox(-3.3,1.8,0,3.4,-42.3,-41.7);fadeable(since(fenceMark));
  const cal=new THREE.Group();cal.position.set(-6.1,0,-42);W.group.add(cal);
  for(let i=0;i<6;i++)addMesh(new THREE.BoxGeometry(0.42,2.5,0.12),M(0x8a6038),0.25+i*0.46,1.3,0,cal);
  for(const y of[0.6,2.0])addMesh(new THREE.BoxGeometry(2.7,0.14,0.16),M(0x5a3a1a),1.4,y,0.02,cal);
  const calCol=colBox(-6.2,-3.4,0,3.4,-42.3,-41.7);fadeable(cal);
  const latch=new THREE.Group();latch.position.set(-3.6,2.45,-41.76);W.group.add(latch);addMesh(new THREE.BoxGeometry(0.7,0.1,0.1),M(0x3a3a40),-0.2,0,0,latch);addMesh(new THREE.BoxGeometry(0.12,0.26,0.12),M(0x3a3a40),0.12,0,0,latch);
  const mark=new THREE.Group();mark.position.set(-3.45,3.1,-41.66);W.group.add(mark);const markRing=new THREE.Mesh(new THREE.TorusGeometry(0.28,0.04,8,24),M(COL.gold,{emissive:COL.gold,emissiveIntensity:0.8}));mark.add(markRing);
  mark.add(new THREE.Mesh(new THREE.CircleGeometry(0.26,20),MB(0x2a2014,{transparent:true,opacity:0.6})));{const ac=acornMesh(1.4);ac.position.z=0.04;mark.add(ac);}
  W.marks.push({pos:new V3(-3.45,3.1,-41.55),active:()=>!F.latch,onHit:()=>{F.latch=true;SFX.latch();mark.visible=false;
    anim(0.55,k=>{latch.position.y=2.45-2.35*k*k;latch.rotation.z=k*2.5;});later(0.35,()=>{SFX.gate();calCol.on=false;anim(0.9,k=>{cal.rotation.y=smooth(k)*1.75;});});
    banner('Щеколда упала!','#ffd9a0',1.4,'Калитка открыта');}});
  // засохший корень у ручья: живая вода — и он вырастает мостком
  const dry=new THREE.Group();dry.position.set(5.6,0,-40.9);W.group.add(dry);{const dm=M(0x7a7266);const seg=(x,y,z,rx,rz,len,r)=>{const m=addMesh(new THREE.CylinderGeometry(r*0.8,r,len,7),dm,x,y,z,dry);m.rotation.x=rx;m.rotation.z=rz;};
   seg(0,0.12,0.45,1.35,0,1.3,0.3);seg(0.1,-0.15,-0.45,1.95,0.2,1.0,0.22);seg(0.28,-0.55,-0.85,2.5,0.4,0.8,0.15);seg(-0.4,0.05,0.2,1.2,-0.9,0.7,0.1);seg(0.5,0.08,0.1,1.4,0.9,0.6,0.09);}
  const bridge=new THREE.Group();bridge.position.set(5.6,0,-40.8);W.group.add(bridge);
  {const bl=new THREE.CylinderGeometry(0.62,0.7,8.6,12);bl.rotateX(Math.PI/2);bl.translate(0,0,-4.3);addMesh(bl,M(0x7a5a34),0,-0.62,0,bridge);
   const tp=new THREE.BoxGeometry(1.8,0.1,8.5);tp.translate(0,0,-4.25);addMesh(tp,MAT.moss,0,-0.04,0,bridge);
   for(let i=0;i<9;i++){const s=i%2?1:-1;const lf=addMesh(new THREE.ConeGeometry(0.14,0.5,5),M(0x6ab04a),s*0.95,0.1,-0.6-i*0.9,bridge);lf.rotation.z=-s*0.9;}}
  bridge.scale.set(1,1,0.01);bridge.visible=false;const bridgeCol=colBox(4.65,6.55,-1.2,0,-49.3,-40.8);bridgeCol.on=false;
  W.waterTargets.push({pos:new V3(5.6,0,-40.5),active:()=>!F.rootGrown&&!F.rootGrowing,onWater:()=>{F.rootGrowing=true;SFX.grow();dry.visible=false;bridge.visible=true;burst(new V3(5.6,0.4,-40.8),0x9fe6ff,14,4);
    anim(1.6,k=>{bridge.scale.z=Math.max(0.01,smooth(k));});later(1.6,()=>{F.rootGrown=true;bridgeCol.on=true;banner('Корень ожил!','#9fe6ff',1.5,'Корень вырос — вот те раз! —<br>Через ручей мосток для нас!');});}});
  // тропинки расходятся вокруг чащи — экран делится; через десять шагов сходятся — черта тает
  colBox(-3.6,3.6,0,3.6,-61,-50,true);const thMark=W.group.children.length;
  for(let i=0;i<9;i++){const b=addMesh(new THREE.IcosahedronGeometry(rand(0.9,1.4),0),MAT.stone,rand(-2.6,2.6),rand(0.4,0.9),rand(-60,-51));b.rotation.set(rand(0,3),rand(0,3),0);}
  for(let i=0;i<14;i++)addMesh(new THREE.SphereGeometry(rand(0.7,1.0),8,6),M(0x3f7a44),rand(-3.2,3.2),rand(1.0,1.6),rand(-60.3,-50.7));
  fadeable(since(thMark));decorFir(-1.2,-53,1.1,true);decorFir(1.4,-55.5,1.0,true);
  for(const[x,z]of[[-8.8,-52],[-8.8,-59],[8.8,-52],[8.8,-59]])lantern(x,z);
  bell(-5,-38.6);bell(5,-38.6);
  const ff=new THREE.Group();W.group.add(ff);addMesh(new THREE.SphereGeometry(0.1,10,8),M(0xfff08a,{emissive:0xffe040,emissiveIntensity:1.6}),0,0,0,ff).castShadow=false;
  ff.add(new THREE.Mesh(new THREE.SphereGeometry(0.32,10,8),MB(0xfff08a,{transparent:true,opacity:0.25,depthWrite:false})));const ffL=new THREE.PointLight(0xfff08a,0,5,2);ff.add(ffL);ff.visible=false;ff.position.set(5.6,1.3,-49.5);

  /* ---------- Г. Жёлтые плиты с лапкой: «оставленный держит» ---------- */
  {const hm=W.group.children.length;box(-0.45,0.45,0,3.2,-76,-63,MAT.hedge,{occ:true});for(let z=-63.6;z>-76;z-=1.3)addMesh(new THREE.SphereGeometry(0.62,8,6),M(0x3f7a44),0,3.2,z);fadeable(since(hm));}
  wall(-6.4,-6.2,-76,-63);wall(6.2,6.4,-76,-63);
  for(const s of[-1,1])for(let z=-63.4;z>-76;z-=1.4){addMesh(new THREE.SphereGeometry(rand(0.9,1.3),8,6),M(0x2f6a3a),s*7.3,0.7,z);if(Math.random()<0.5)decorFir(s*rand(7.8,9.2),z,rand(1,1.6),true);}
  const La=plate(-3.2,-65.2,'L'),Lb=plate(-3.2,-71,'L'),Ra=plate(3.2,-65.2,'R'),Rb=plate(3.2,-71,'R');
  const gL=makeGate(-6.2,-0.45,-68,'own','L',{latchIf:()=>players[0].heroes.every(h=>h.pos.z<-68.9)});
  const gR=makeGate(0.45,6.2,-68,'own','R',{latchIf:()=>players[1].heroes.every(h=>h.pos.z<-68.9)});
  const onP=(h,p)=>hd(h.pos,p)<p.r&&Math.abs(h.pos.y-0.14)<0.5,allThru=pi=>players[pi].heroes.every(h=>h.pos.z<-68.9);

  /* ---------- Д. Первый морок ---------- */
  bell(-4.5,-77.6);bell(4.5,-77.6);
  const arena={x:0,z:-85,r:8.5,started:false,cleared:false,hold:0,list:[]};arena.camActive=()=>arena.started&&(!arena.cleared||arena.hold>0);W.camZones.push(arena);
  const barrier=makeGate(-9.6,9.6,-94,'thread','arena',{h:2.6});
  for(const[x,z]of[[-7.5,-80],[7.5,-81],[-7,-90],[7.2,-89.5]]){addMesh(new THREE.CylinderGeometry(0.7,0.85,0.5,12),M(0x8a5a32),x,0.25,z);W.cyls.push({x,z,r:0.8,miny:-1,maxy:0.5,on:true});}
  W.onFirstUnravel=()=>{later(0.45,()=>{lullaby(LUL2,0.46,0,0.2);say(null,'♪ …серый волк живёт… ♪',3.4,true);});later(4.1,()=>say('tishka','<i>(издалека)</i> Ой, беда!',2));};

  /* ---------- Е. Светящееся дупло ---------- */
  const ht=hollowTree(0,-106);

  /* ---------- Звенышко ведёт: впереди Прошки/Потапа («налево — за Звенышком»), не дальше закрытого ---------- */
  W.zvenGoal=()=>{if(F.stage==='hollow')return new V3(0,1.7,-101.4);if(F.stage==='arena')return new V3(0,3.4,-86);
    const a=players[0].heroes.reduce((m,h)=>h.pos.z<m.pos.z?h:m);const lim=(!F.latch&&a.pos.z>-41.8)?-41.2:((!gL.latched&&a.pos.z>-68)?-66.4:-79);const z=Math.max(a.pos.z-4.5,lim);return new V3(clamp(a.pos.x*0.8,-8,8),Math.max(a.pos.y,0)+2.1,z);};

  /* ---------- ролик «Колыбельная» (≈ 40 с, в движке) ---------- */
  function lullabyScene(){F.stage='lullaby';const T=HERO;const faceTo=(h,x,z)=>{h.face=Math.atan2(x-h.pos.x,z-h.pos.z);};
    const setup=()=>{placeOnGround(T.potap,spots[0].x,spots[0].z,0);placeOnGround(T.yosha,spots[1].x,spots[1].z,0);placeOnGround(T.proshka,-4.0,0.3,0);placeOnGround(T.pelageya,3.8,-2.9,0);
      HEROES.forEach(h=>{h.following=false;faceTo(h,-4.6,-4.3);});faceTo(T.pelageya,2.9,-2.1);};
    let beakT=-1,bounceT=-1,droop=0;
    play({dur:39,fov:48,
     shots:[shot(0,[0,6.2,12.5],[0,1.2,-1.8]),shot(1.2,[-2.6,1.7,-1.0],[-4.6,1.0,-4.3],[-3.0,1.5,-1.6],null,3),shot(8.2,[1.5,1.7,-0.2],[3.6,0.9,-2.6]),
       shot(11.4,[-2.9,1.45,-1.9],[-4.1,0.95,0.4]),shot(16.4,[0.2,4.6,6.0],[-1.0,0.9,-0.6]),shot(18.6,[2.5,2.3,-1.9],[winPos.x,winPos.y,winPos.z],[3.0,2.45,-2.6],null,5.4),
       shot(24.2,[1.3,1.5,0.9],[2.9,6.8,-2.1],[1.5,1.9,0.6],[2.9,0.9,-2.1],2.1),shot(26.8,[3.05,1.78,-1.5],[3.12,0.64,-2.08]),
       shot(32.4,[1.5,1.9,0.6],[2.9,1.1,-2.1]),shot(34.6,[1.8,2.1,-0.6],[winPos.x,winPos.y,winPos.z]),shot(36.3,[0.4,2.8,2.6],[0,1.4,-8])],
     says:[[0.6,3.8,'tishka','Баю-баю, за рекою…',true],[5.4,2.6,'tishka','Дальше слов не помню я…'],[11.6,2.4,'proshka','Колыбельные — для малых,<br>Не для нас, для удалых!'],
       [14.1,2.3,'proshka','Хочешь — дам самокат, дружок?<br>Он получше всяких строк!'],[16.7,1.6,'yosha','Ха-ха-ха! Вот так дела!'],[32.6,2.3,'zven','Дзинь-дзинь! За мной — бегом!']],
     events:[{t:0,fn:setup},{t:0.6,fn:()=>lullaby(LUL1,0.42)},{t:4.4,fn:()=>{droop=1;}},
       {t:8.6,fn:()=>{beakT=0;floatText(T.pelageya.pos.clone().add(new V3(0,1.6,0)),'…','#e7c3ff');}},
       {t:9.8,fn:()=>{const a=nb.g.position.clone();anim(0.6,k=>{nb.g.position.lerpVectors(a,NB_WING,smooth(k));nb.g.rotation.x=-1.2*smooth(k);});}},
       {t:14.3,fn:()=>{faceTo(T.proshka,-4.7,-0.8);const a=sc.g.position.clone();anim(0.7,k=>{sc.g.position.lerpVectors(a,new V3(-4.3,0.55,-0.3),smooth(k));});}},
       {t:16.3,fn:()=>{SFX.crash();sc.parts.slice().forEach(m=>debris(m,new V3(rand(-2.5,2.5),rand(2,4.5),rand(-2.5,2.5)),0));floatText(T.proshka.pos.clone().add(new V3(0,1.9,0)),'Э-э…','#ff9a66');}},
       {t:16.7,fn:()=>{bounceT=0;}},
       {t:18.8,fn:()=>{shadow.visible=true;}},{t:19.4,fn:SFX.keys},{t:20.9,fn:SFX.keys},{t:22.4,fn:SFX.keys},
       {t:23.9,fn:()=>{shadow.visible=false;HEROES.forEach(h=>faceTo(h,winPos.x,winPos.z));}},
       {t:24.0,fn:()=>{const a=nb.g.position.clone(),r=nb.g.rotation.x;anim(0.5,k=>{nb.g.position.lerpVectors(a,NB_TABLE,smooth(k));nb.g.rotation.x=r*(1-smooth(k));});Z.vis=true;Z.scale=0.8;
         for(let i=0;i<8;i++){const m=new THREE.Mesh(new THREE.ConeGeometry(0.08,0.2,4),MB(0x3f7a44,{transparent:true}));m.position.set(2.9+rand(-1,1),rand(6,9),-2.1+rand(-1,1));W.group.add(m);W.fx.push({m,v:new V3(rand(-0.4,0.4),-1.4,rand(-0.4,0.4)),t:0,life:4});}}},
       {t:26.2,fn:()=>{SFX.dzin();nb.pg.emissiveIntensity=0.7;$('flash').style.opacity=0.35;later(0.25,()=>{$('flash').style.opacity=0;});}},
       {t:27.4,fn:()=>anim(0.6,k=>nb.parts.trunk.scale.setScalar(Math.max(0.001,k)))},{t:27.7,fn:()=>anim(0.6,k=>nb.parts.crown.scale.setScalar(Math.max(0.001,k)))},
       {t:28.5,fn:()=>anim(0.8,k=>{nb.parts.chainL.scale.setScalar(Math.max(0.001,k));nb.parts.chainR.scale.setScalar(Math.max(0.001,k));})},
       {t:29.6,fn:()=>anim(0.8,k=>nb.parts.hand.scale.setScalar(Math.max(0.001,k)))},
       {t:30.9,fn:()=>{SFX.rip();anim(0.5,k=>{nb.parts.chainR.position.set(0.02*k,0,0.025*k);nb.parts.chainR.rotation.y=-0.35*k;});}},
       {t:32.4,fn:()=>{zvenRing();nb.pg.emissiveIntensity=0.15;}},
       {t:35.7,fn:()=>{SFX.whoosh();$('flash').style.opacity=0.25;later(0.2,()=>{$('flash').style.opacity=0;});}},
       {t:36.3,fn:()=>{SFX.gate();anim(0.6,k=>{door.rotation.y=smooth(k)*1.9;});doorCol.on=false;HEROES.forEach(h=>{h.face=Math.PI;});}},
       {t:37.4,fn:()=>{SFX.dzin();}}],
     tick:(t,dt)=>{
       // Тишка поёт и покачивается; забыл — поникает
       tish.body.rotation.z=t<4.3?Math.sin(t*2.6)*0.12:0;tish.head.rotation.x=droop?damp(tish.head.rotation.x,0.45,4,dt||1):0;tish.tail.rotation.x=droop?damp(tish.tail.rotation.x,0.5,3,dt||1):0;
       if(beakT>=0&&beakT<1.2){beakT+=dt;T.pelageya.parts.beak.rotation.x=0.5+Math.abs(Math.sin(beakT*16))*0.35;}else T.pelageya.parts.beak.rotation.x=0.5;
       if(bounceT>=0&&bounceT<1.6){bounceT+=dt;T.yosha.extraY=Math.abs(Math.sin(bounceT*12))*0.25;}else T.yosha.extraY=0;
       if(t>18.8&&t<23.9)shadow.position.x=lerp(-0.75,0.75,(t-18.8)/5.1);
       lampL.intensity=t>18.6&&t<24.4?0.55+0.3*Math.sin(t*23)*Math.sin(t*7.3):1.3;
       // звено падает сквозь листву в тетрадку, светится, подпрыгивает и улетает в дверь
       if(t>=24.2&&t<26.2){const k=smooth((t-24.2)/2);Z.pos.set(2.9,lerp(8.5,0.8,k),-2.1);Z.spinRate=1;}
       else if(t>=26.2&&t<32.4){Z.pos.set(2.72,0.8+Math.sin(t*3)*0.02,-2.02);Z.scale=0.6;Z.body.rotation.x=-1.1;Z.spinRate=0;}
       else if(t>=32.4&&t<34.6){const k=smooth((t-32.4)/0.6);Z.pos.set(lerp(2.72,2.9,k),lerp(0.8,1.7,k),lerp(-2.02,-2.1,k));Z.scale=lerp(0.6,1,k);Z.body.rotation.x=-1.1*(1-k);Z.spinRate=6;}
       else if(t>=34.6&&t<35.8){const k=smooth((t-34.6)/1.1);Z.pos.lerpVectors(new V3(2.9,1.7,-2.1),winPos,k);Z.spinRate=3;Z.scale=lerp(1,0.25,k);Z.body.rotation.x=0;}
       else if(t>=35.8){Z.pos.set(0,1.9,-11.5);Z.scale=1;Z.spinRate=2;Z.body.rotation.x=0;}},
     end:()=>{F.stage='chase';doorCol.on=false;door.rotation.y=1.9;Z.mode='lead';Z.vis=true;Z.scale=1;
       placeOnGround(T.potap,-1.3,-4.6,0);placeOnGround(T.proshka,-2.7,-4.0,0);placeOnGround(T.yosha,1.3,-4.6,0);placeOnGround(T.pelageya,2.7,-4.0,0);
       HEROES.forEach(h=>{h.face=Math.PI;h.following=false;});HEROES.forEach(h=>{h.extraY=0;});snapCams();banner('За Звенышком!','#ffd76a',2,'По веткам — вперёд, бегом!');}});}

  /* ---------- логика уровня ---------- */
  let barkDone=false;
  W.updates.push(dt=>{
    if(F.stage==='room'){for(const pi of[0,1]){const s=spots[pi];if(!F.spot[pi]&&hd(active(pi).pos,s)<0.95){F.spot[pi]=true;SFX.plate();ringFx(new V3(s.x,0,s.z),PCOL[pi],1.4);}
        s.m.emissiveIntensity=F.spot[pi]?0.9:0.4+0.3*Math.sin(G.time*4);s.r.scale.setScalar(F.spot[pi]?1:1+0.12*Math.sin(G.time*4));}
      HERO.proshka.extraY=HERO.proshka.active?0:Math.abs(Math.sin(G.time*5))*0.06;                        // Прошка возится с самокатом
      tish.body.rotation.z=Math.sin(G.time*1.3)*0.05;
      if(F.spot[0]&&F.spot[1]&&!F.lulQueued){F.lulQueued=true;later(0.7,lullabyScene);}}
    if(F.stage!=='room'&&F.stage!=='lullaby')spots.forEach(s=>{s.g.visible=false;});
    // Прошка на уступе — скидывает лесенку для Потапа
    if(!F.ladder&&ladderBtn.done){F.ladder=true;bark(HERO.proshka,'proshka','Щас подкручу механизм —<br>Держи лесенку, дружок!',2.4);
      steps.forEach((s,i)=>later((5-i)*0.12,()=>{SFX.clink();anim(0.25,k=>{s.m.scale.x=Math.max(0.01,k);});s.col.on=true;}));ropes.forEach(r=>anim(0.8,k=>{r.scale.y=Math.max(0.01,k);}));}
    // «Стой там, я тебя подниму!» — «Я сам!»
    if(!barkDone&&HERO.yosha.active&&hd(HERO.yosha.pos,{x:7.1,z:-22.3})<3.2){barkDone=true;bark(HERO.potap,'potap','Стой, не бойся ничего —<br>Подниму тебя легко!',2.2);later(2.1,()=>bark(HERO.yosha,'yosha','Сам управлюсь — я не мал!',1.6));}
    markRing.scale.setScalar(1+0.12*Math.sin(G.time*6));
    // первый прыжок: подсказка у края; пока игрок ни разу не перепрыгнул, его герой у края не соскользнёт — только прыжком
    if(F.stage==='chase'){const all=JH.done[0]&&JH.done[1];jArc.visible=jRing.visible=!all;
      if(!all){jRing.scale.setScalar(1+0.15*Math.sin(G.time*5));jArc.children.forEach((d,i)=>{d.material.opacity=0.4+0.55*Math.max(0,Math.sin(G.time*7-i*0.7));});}
      for(const pi of[0,1]){const h=active(pi);if(players[pi].downed||JH.done[pi])continue;
        if(h.pos.z<CRK1-0.2&&h.grounded&&h.pos.y>-0.3){JH.done[pi]=true;SFX.ok();burst(h.pos.clone().add(new V3(0,1,0)),COL.gold,12,3);floatText(h.pos.clone().add(new V3(0,h.d.height+0.7,0)),'Прыжок! Молодец!','#ffe08a');continue;}
        if(!ctrl(h))continue;const onNear=Math.abs(h.pos.x)<2.45&&h.pos.z>CRK0-0.4&&h.pos.z<CRK0+2.6&&h.pos.y>-0.2;
        if(onNear&&!JH.told[pi]){JH.told[pi]=true;tip(pi,'Трещина! Подойди к самому краю и прыгни '+K(pi,'jump')+' —<br>Дуга покажет, куда лететь, кольцо — где встать.',4);}
        if(onNear&&h.grounded&&h.pos.z<CRK0+0.3){h.pos.z=CRK0+0.3;if(h.vel.z<0)h.vel.z=0;
          if(JH.brake[pi]===0){JH.brake[pi]=1;floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Стоп, край! Прыгай!','#fff2b0');}}
        if(h.pos.y<-1.5&&Math.abs(h.pos.z-(CRK0+CRK1)/2)<2.5&&!JH.fell[pi]){JH.fell[pi]=true;tip(pi,'Упал — не беда, колокольчик вернёт!<br>Прыгай '+K(pi,'jump')+' у самого края — и долетишь.',3.5);}}}
    // камера у первой трещины: герои вышли за дверь — она поднимается над кроной и смотрит вперёд, трещина видна целиком
    {const a=G.solo?active(G.soloPi):active(0),b=G.solo?a:active(1),mz=(a.pos.z+b.pos.z)/2,mx=(a.pos.x+b.pos.x)/2;
     const on=F.stage==='chase'&&!G.cine&&mz<-8.6&&mz>CRK1-1.6&&Math.abs(mx)<3&&hd(a.pos,b.pos)<8;
     if(on&&!W.camFn)W.camFn=jumpCam;else if(!on&&W.camFn===jumpCam)W.camFn=null;}
    // светлячок ведёт Пелагею и Йошу направо
    if(F.rootGrown&&!F.ffDone){ff.visible=true;ffL.intensity=0.8;const h=active(1);const tz=clamp(Math.min(h.pos.z-3.5,-49.5),-62,-49.5);ff.position.lerp(new V3(6.6+Math.sin(G.time*2)*0.4,1.3+Math.sin(G.time*3)*0.2,tz),1-Math.exp(-2.5*dt));
      if(h.pos.z<-61.5){F.ffDone=true;anim(0.6,k=>{ff.scale.setScalar(Math.max(0.01,1-k));ffL.intensity=0.8*(1-k);});}}
    // поляна морока
    if(!arena.started&&[0,1].every(pi=>active(pi).pos.z<-79)){arena.started=true;F.stage='arena';arena.list=[makeFoe('morok',-3,-86,{pi:0,harmless:true,tutorial:true}),makeFoe('morok',3,-86,{pi:1,harmless:true,tutorial:true})];SFX.gate();banner('Морок!','#e7b0ff',2,'Ниток спутанных клубок,<br>Колюч, как ёжиков бок!');}
    if(arena.started&&!arena.cleared&&arena.list.every(e=>!e.alive)){arena.cleared=true;arena.hold=2.4;barrier.forceOpen=true;F.stage='hollow';SFX.ok();banner('Распутали!','#ffffff',1.8,'Звенышко в дупло зовёт —<br>Там нас новый путь ждёт!');}
    if(arena.cleared)arena.hold-=dt;
    ht.hole.material.color.setHSL(0.13,1,0.78+0.08*Math.sin(G.time*3));
    if(F.stage==='hollow'&&!F.inHollow&&[0,1].every(pi=>hd(active(pi).pos,{x:0,z:-102})<3.4)){F.inHollow=true;SFX.whoosh();G.flags.proDone=true;completeLevel();}});

  const jumpCam=()=>{const a=G.solo?active(G.soloPi):active(0),b=G.solo?a:active(1),mz=(a.pos.z+b.pos.z)/2,mx=(a.pos.x+b.pos.x)/2;
    return {pos:new V3(mx*0.5,8.6,Math.min(mz+5.2,-7.8)),look:new V3(mx*0.6,0.2,Math.min(mz-1.8,(mz+CRK0)/2-0.8)),k:3};};
  /* ---------- рисунки кнопок над героями ---------- */
  const T=HERO;
  for(const pi of[0,1]){
    prompt(pi,'move',()=>headOf(active(pi)),()=>F.stage==='room'&&!F.spot[pi]);
    prompt(pi,'jump',()=>headOf(active(pi)),()=>F.stage==='chase'&&active(pi).pos.z<CRK0+2.8&&active(pi).pos.z>CRK0-0.4&&active(pi).grounded&&Math.abs(active(pi).pos.x)<2.5,()=>F.jump1.done[pi]?'':'прыжок!');
    prompt(pi,'jump',()=>headOf(active(pi)),()=>players[pi].clingOffer&&active(pi).grounded,'за друга');
    prompt(pi,'guard',()=>headOf(active(pi)),()=>W.enemies.some(e=>e.alive&&e.pi===pi&&e.state==='wind'&&(e.slow<1||players[pi].path==='easy')));
    prompt(pi,'attack',()=>headOf(active(pi)),()=>W.enemies.some(e=>e.alive&&((e.state==='broken'&&hd(e.pos,active(pi).pos)<6)||(e.pi===pi&&e.state==='stagger'&&!e.openHit&&players[pi].staggerSeen<=3))));}
  prompt(0,'swap',()=>headOf(T.proshka),()=>F.stage==='chase'&&T.potap.active&&!F.ladder&&T.potap.pos.x<-1&&T.potap.pos.z<-20.4&&T.potap.pos.z>-25.6&&T.potap.pos.y<1&&hd(T.proshka.pos,T.potap.pos)<12);
  prompt(0,'call',()=>headOf(T.potap),()=>F.stage==='chase'&&T.potap.active&&!F.ladder&&T.potap.pos.x<-1&&T.potap.pos.z<-20.4&&T.potap.pos.z>-25.6&&hd(T.proshka.pos,T.potap.pos)>=12);
  prompt(0,'jump',()=>headOf(T.proshka),()=>F.stage==='chase'&&T.proshka.active&&!F.ladder&&T.proshka.pos.x<-1&&T.proshka.pos.z<-21.6&&T.proshka.pos.z>-25.6&&T.proshka.pos.y<0.5);
  prompt(1,'swap',()=>headOf(T.pelageya),()=>F.stage==='chase'&&T.yosha.active&&T.pelageya.pos.z>-23&&T.yosha.pos.x>1.3&&T.yosha.pos.x<6&&T.yosha.pos.z<-20.4&&T.yosha.pos.z>-23.3&&hd(T.pelageya.pos,T.yosha.pos)<12);
  prompt(1,'call',()=>headOf(T.yosha),()=>F.stage==='chase'&&T.yosha.active&&T.pelageya.pos.z>-23&&T.yosha.pos.x>1.3&&T.yosha.pos.x<6&&T.yosha.pos.z<-20.4&&T.yosha.pos.z>-23.3&&hd(T.pelageya.pos,T.yosha.pos)>=12);
  prompt(1,'jumpHold',()=>headOf(T.pelageya),()=>F.stage==='chase'&&T.pelageya.active&&T.pelageya.pos.x>1.3&&T.pelageya.pos.z<-20.4&&T.pelageya.pos.z>-23.3);
  prompt(1,'swap',()=>headOf(T.yosha),()=>F.stage==='chase'&&T.pelageya.active&&T.pelageya.pos.z<-28.4&&T.yosha.pos.z>-23&&T.pelageya.pos.z>-37);
  prompt(0,'swap',()=>headOf(T.proshka),()=>!F.latch&&T.potap.active&&hd(T.potap.pos,{x:-4.8,z:-41.4})<7&&hd(T.proshka.pos,T.potap.pos)<14);
  prompt(0,'call',()=>headOf(T.potap),()=>!F.latch&&T.potap.active&&hd(T.potap.pos,{x:-4.8,z:-41.4})<7&&hd(T.proshka.pos,T.potap.pos)>=14);
  prompt(0,'skill',()=>headOf(T.proshka),()=>!F.latch&&T.proshka.active&&T.proshka.pos.z>-41.6&&T.proshka.pos.z<-34&&hd(T.proshka.pos,{x:-3.45,z:-41.6})<12);
  prompt(1,'swap',()=>headOf(T.yosha),()=>!F.rootGrown&&!F.rootGrowing&&T.pelageya.active&&hd(T.pelageya.pos,{x:5.6,z:-40.5})<6&&hd(T.yosha.pos,T.pelageya.pos)<14);
  prompt(1,'call',()=>headOf(T.pelageya),()=>!F.rootGrown&&!F.rootGrowing&&T.pelageya.active&&hd(T.pelageya.pos,{x:5.6,z:-40.5})<6&&hd(T.yosha.pos,T.pelageya.pos)>=14);
  prompt(1,'skill',()=>headOf(T.yosha),()=>!F.rootGrown&&!F.rootGrowing&&T.yosha.active&&hd(T.yosha.pos,{x:5.6,z:-40.5})<4.2);
  for(const[pi,pa,pb,g]of[[0,La,Lb,gL],[1,Ra,Rb,gR]]){
    prompt(pi,'swap',()=>headOf(other(pi)),()=>!g.latched&&(onP(active(pi),pa)||onP(active(pi),pb))&&((active(pi).pos.z>g.z)!==(other(pi).pos.z>g.z))&&hd(other(pi).pos,active(pi).pos)<14);
    prompt(pi,'call',()=>headOf(active(pi)),()=>!g.latched&&(onP(active(pi),pa)||onP(active(pi),pb))&&hd(other(pi).pos,active(pi).pos)>=14);}

  /* ---------- задачи (внизу экрана) ---------- */
  const inRoom=pi=>F.stage==='room';
  const crack=pi=>O(()=>'За Звенышком беги скорей,<br>Трещину прыжком '+K(pi,'jump')+' одолей!',()=>active(pi).pos.z<CRK1-0.4,()=>[crackMark],()=>({kind:active(pi).kind,action:'jump',from:new V3(pi?0.9:-0.9,0,CRK0+0.8),to:new V3(pi?0.9:-0.9,0,CRK1-1.0)}));
  const plates=(pi,pa,pb,g,xs)=>[
    O(()=>'Жёлтая плита с лапкой — встань на неё,<br>И ворота откроются — вот и всё!',()=>pa.pressed||pb.pressed||g.latched||players[pi].heroes.some(h=>h.pos.z<-68.9),()=>[pa.g],()=>({kind:active(pi).kind,action:'walk',from:new V3(xs,0,-62.8),to:new V3(xs,0,-65.2)})),
    O(()=>'Смени героя '+K(pi,'swap')+' — ступай в ворота смело:<br>Первый на плите стоит — ворота не закроются.',()=>g.latched||players[pi].heroes.some(h=>h.pos.z<-68.9),()=>[g.g],()=>({kind:other(pi).kind,action:'walk',from:new V3(xs+(xs<0?-1.6:1.6),0,-66),to:new V3(xs+(xs<0?-1.6:1.6),0,-70)})),
    O(()=>'За воротами — такая ж плита, гляди:<br>Встань — теперь ворота держишь ты один.',()=>g.latched||pb.pressed||allThru(pi),()=>[pb.g]),
    O(()=>'Второго героя проведи теперь:<br>Смени '+K(pi,'swap')+' или позови к себе '+K(pi,'call')+' — пройдёт он в дверь.',()=>g.latched||allThru(pi),()=>[other(pi).g])];
  const fight=pi=>O(()=>arena.started?'Солнышко <i class="sg y"></i> над мороком — щитом '+K(pi,'guard')+' закройся,<br>Огоньки <i class="sg e"></i> погасли — бей '+K(pi,'attack')+', не бойся!':'Впереди поляна. Постой —<br>Подождём друга с тобой.',()=>arena.cleared,()=>arena.list.map(e=>e.g));
  const hollow=O('В дупло светящееся прыгай смело —<br>За Звенышком! Вот и всё дело.',()=>false,()=>[ht.hole]);
  W.objectives[0]=[
    O(()=>'К жёлтому пятну ступай: '+MOVEK(0),()=>F.spot[0]||!inRoom(),()=>[spots[0].g],()=>({kind:active(0).kind,action:'walk',from:active(0).pos.clone(),to:new V3(spots[0].x,0,spots[0].z)})),
    O('Подождём, пока дойдёт<br>Друг до пятнышка — вот-вот!',()=>!inRoom(),()=>[spots[1].g]),
    crack(0),
    O(()=>'Уступ высок — Потапу не допрыгнуть,<br>Прошку бери '+K(0,'swap')+': он выше всех умеет прыгнуть!',()=>F.ladder||active(0).pos.z<-36.5,()=>[ledge],()=>({kind:'proshka',action:'jump',from:new V3(-4.4,0,-23.8),to:new V3(-4.4,1.92,-26.4)})),
    O('Прошка наверху! На кнопку с лапкой встань —<br>Для Потапа лесенка слетит, ты только глянь!',()=>F.ladder||active(0).pos.z<-37.6,()=>[ladderBtn.g],()=>({kind:'proshka',action:'walk',from:new V3(-5,1.92,-26.2),to:new V3(-6.9,1.92,-27.6)})),
    O(()=>'Упала лесенка! Кликни Потапа '+K(0,'call')+' — и в путь:<br>За Звенышком вперёд, не отставать ничуть!',()=>active(0).pos.z<-37.6,()=>[ladder]),
    O(()=>'Щеколда высоко — рукой не достать.<br>Метку-жёлудь видишь? Из рогатки '+K(0,'skill')+' — стрелять!',()=>F.latch||active(0).pos.z<-43,()=>[mark],()=>({kind:'proshka',action:'press',from:new V3(-4.6,0,-38.8)})),
    O('Тропинка надвое бежит —<br>Тебе налево: там Звенышко звенит.',()=>active(0).pos.z<-62.4,()=>[]),
    ...plates(0,La,Lb,gL,-3.2),fight(0),hollow];
  W.objectives[1]=[
    O(()=>'К жёлтому пятну ступай: '+MOVEK(1),()=>F.spot[1]||!inRoom(),()=>[spots[1].g],()=>({kind:active(1).kind,action:'walk',from:active(1).pos.clone(),to:new V3(spots[1].x,0,spots[1].z)})),
    O('Подождём, пока дойдёт<br>Друг до пятнышка — вот-вот!',()=>!inRoom(),()=>[spots[0].g]),
    crack(1),
    O(()=>'Глубок овраг! Смени '+K(1,'swap')+' — Пелагея нужна:<br>Прыгни, держи '+K(1,'jump')+' — перелетит на крылышках она.',()=>(T.pelageya.pos.z<-28.4&&T.pelageya.pos.y>-1)||active(1).pos.z<-36.5,()=>[ravineMark],()=>({kind:'pelageya',action:'glide',from:new V3(3.8,0,-22.4),to:new V3(3.8,0,-29.6)})),
    O(()=>'А Йоша мал — пролезет под корнем, как мышь!<br>Смени '+K(1,'swap')+' на него — и вмиг проскользишь.',()=>T.yosha.pos.z<-28.4||active(1).pos.z<-36.5,()=>[logMesh],()=>({kind:'yosha',action:'walk',from:new V3(7.1,0,-21.8),to:new V3(7.1,0,-29.4)})),
    O(()=>'Корень засох — беда невелика:<br>Полей живой водой из Йошиного ковшика '+K(1,'skill')+'!',()=>F.rootGrown||F.rootGrowing||active(1).pos.z<-49.5,()=>[dry],()=>({kind:'yosha',action:'press',from:new V3(5.6,0,-39.3)})),
    O('Тропинка надвое бежит —<br>Тебе направо: светлячок манит.',()=>active(1).pos.z<-62.4,()=>[]),
    ...plates(1,Ra,Rb,gR,3.2),fight(1),hollow];
  W.tipZones.push(
    {pi:0,cond:(pi,h)=>F.stage==='chase'&&h.kind==='potap'&&!F.ladder&&h.pos.z<-24&&h.pos.z>-25.6&&h.pos.x<-1,text:pi=>'Потапу на уступ не влезть никак —<br>Тут нужен Прошка, ловкий наш смельчак!'},
    {pi:1,cond:(pi,h)=>F.stage==='chase'&&h.kind==='yosha'&&h.pos.x<6&&h.pos.x>1.3&&h.pos.z<-21.5&&h.pos.z>-23.3,text:pi=>'Йоше овраг не перепрыгнуть враз,<br>Зато под корнем — видишь? — лаз!'},
    {cond:(pi,h)=>h.pos.z<-63&&h.pos.z>-76&&other(pi).held&&!h.held,text:pi=>'Пока герой стоит на плите — ворота открыты.'});
  W.spawns=[[new V3(-4.0,0,0.3),new V3(-3.2,0,4.6)],[new V3(3.8,0,-2.9),new V3(3.5,0,4.6)]];W.startAct=[1,1];
  W.spawnFace=[[Math.atan2(-0.7,-1.1),Math.PI],[Math.atan2(-0.9,0.8),Math.PI]];
  W.pauseLine='За Звенышком бежим скорей —<br>которое упало в тетрадку Пелагеи.<br>Кто-то цепь златую рвёт —<br>Сказки забывает народ.';
  flushDecor();}

