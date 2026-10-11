/* ============================== ЖИТЕЛИ МИРА 1 И РЕКВИЗИТ (примитивы) ============================== */
function makeHut(){ // избушка на курьих ножках: сруб на двух ногах; крыльцо спереди (локальный +z)
  const g=new THREE.Group();W.group.add(g);const house=new THREE.Group();house.position.y=2.3;g.add(house);
  const wood=M(0x9a6a3c),dark=M(0x3a2414),legM=M(0xe8a33a);
  addMesh(new THREE.BoxGeometry(3,2.4,3),wood,0,1.2,0,house);
  const lg=new THREE.CylinderGeometry(0.09,0.09,3.2,6);lg.rotateZ(Math.PI/2);for(let i=0;i<4;i++){addMesh(lg,dark,0,0.3+i*0.6,1.52,house);addMesh(lg,dark,0,0.3+i*0.6,-1.52,house);}
  const rg=new THREE.ConeGeometry(2.6,1.6,4);rg.rotateY(Math.PI/4);addMesh(rg,M(0x6b3f22),0,3.2,0,house);
  const doorMat=M(0x4a2a12,{emissive:0xffc060,emissiveIntensity:0});const door=addMesh(new THREE.BoxGeometry(0.95,1.6,0.14),doorMat,0,0.8,1.56,house);
  addMesh(new THREE.BoxGeometry(1.6,0.12,0.8),dark,0,-0.02,1.95,house);                                   // крыльцо
  for(const sx of[-1.53,1.53])addMesh(new THREE.BoxGeometry(0.1,0.6,0.6),M(0xffe08a,{emissive:0xffc040,emissiveIntensity:0.5}),sx,1.4,0,house);
  const pile=new THREE.CylinderGeometry(0.16,0.16,1.2,8);pile.rotateZ(Math.PI/2);for(let i=0;i<3;i++)for(let j=0;j<3-i;j++)addMesh(pile,M(0x7a5230),-0.6+j*0.35+i*0.17,0.18+i*0.3,-1.75,house);
  // пустые рамки портретов богатырей — внутри, за дверью
  const inner=new THREE.Group();inner.position.set(0,0.8,1.2);house.add(inner);inner.add(new THREE.Mesh(new THREE.PlaneGeometry(0.9,1.5),MB(0x1a1008)));
  for(let i=0;i<3;i++){const fr=new THREE.Mesh(new THREE.TorusGeometry(0.12,0.018,4,4),M(COL.gold,{emissive:0x604000,emissiveIntensity:0.4}));fr.rotation.z=Math.PI/4;fr.scale.set(1,1.3,1);fr.position.set(-0.28+i*0.28,0.35,0.01);inner.add(fr);}
  inner.visible=false;
  const legs=[];for(const s of[-1,1]){const leg=new THREE.Group();leg.position.set(s*0.85,2.3,0);g.add(leg);
   const th=addMesh(new THREE.CylinderGeometry(0.14,0.11,1.3,8),legM,0,-0.55,-0.18,leg);th.rotation.x=0.45;
   const sh=addMesh(new THREE.CylinderGeometry(0.1,0.08,1.2,8),legM,0,-1.65,-0.12,leg);sh.rotation.x=-0.35;
   for(const a of[-0.55,0,0.55]){const tg=new THREE.ConeGeometry(0.07,0.5,5);tg.rotateX(Math.PI/2);const t=addMesh(tg,legM,Math.sin(a)*0.25,-2.25,Math.cos(a)*0.25+0.1,leg);t.rotation.y=a;}legs.push(leg);}
  return {g,house,legs,door,doorMat,inner};}
function makeYaga(){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);
  part(body,new THREE.ConeGeometry(0.5,1.1,10),M(0x5a3a5a),0,0.55,0);part(body,new THREE.CylinderGeometry(0.22,0.3,0.45,10),M(0x7a4a2a),0,1.25,0);
  const head=new THREE.Group();head.position.y=1.68;body.add(head);part(head,new THREE.SphereGeometry(0.22,12,10),M(0xe0c0a0),0,0,0);
  const nose=new THREE.ConeGeometry(0.05,0.28,6);nose.rotateX(Math.PI/2);part(head,nose,M(0xd0a080),0,-0.02,0.3);
  part(head,new THREE.SphereGeometry(0.25,12,8,0,Math.PI*2,0,Math.PI*0.55),M(0xc0302a),0,0.03,-0.02);                 // платочек
  const knot=part(head,new THREE.ConeGeometry(0.08,0.2,4),M(0xc0302a),0,-0.18,0.18);knot.rotation.x=0.4;
  for(const s of[-1,1]){part(head,new THREE.TorusGeometry(0.07,0.012,5,14),MAT.dark,s*0.09,0.04,0.2);part(head,new THREE.SphereGeometry(0.025,6,5),MAT.dark,s*0.09,0.04,0.21);}  // очки
  for(const s of[-1,1]){const a=part(body,new THREE.CylinderGeometry(0.05,0.05,0.55,6),M(0x7a4a2a),s*0.3,1.1,0.08);a.rotation.z=s*0.5;}
  return {g,body,head};}
function makeKikimora(){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);const c=M(0x6a7a5a),hair=M(0x3a4a2a);
  part(body,new THREE.ConeGeometry(0.55,1.5,10),c,0,0.75,0);const head=new THREE.Group();head.position.y=1.75;body.add(head);part(head,new THREE.SphereGeometry(0.28,12,10),M(0x9aa88a),0,0,0);
  for(let i=0;i<14;i++){const a=i/14*Math.PI*2;const st=part(head,new THREE.ConeGeometry(0.05,0.9,4),hair,Math.cos(a)*0.24,-0.3,Math.sin(a)*0.24);st.rotation.x=Math.PI+Math.sin(a)*0.15;st.rotation.z=Math.cos(a)*0.15;}
  const eyes=M(0xfff3a0,{emissive:0xfff3a0,emissiveIntensity:0.8});for(const s of[-1,1])part(head,new THREE.SphereGeometry(0.05,8,6),eyes,s*0.1,0.05,0.25);
  const spindle=new THREE.Group();spindle.position.set(0.5,1.1,0.3);body.add(spindle);const sm=M(0xd8c8a0);
  part(spindle,new THREE.ConeGeometry(0.06,0.35,6),sm,0,0.17,0);const s2=new THREE.ConeGeometry(0.06,0.35,6);s2.rotateX(Math.PI);part(spindle,s2,sm,0,-0.17,0);
  return {g,body,head,spindle,eyes};}
function makeKolobok(){const g=new THREE.Group();W.group.add(g);const ball=new THREE.Group();ball.position.y=0.55;g.add(ball);
  part(ball,new THREE.SphereGeometry(0.55,16,12),M(0xf0c050),0,0,0);const lids=[];
  for(const s of[-1,1]){part(ball,new THREE.SphereGeometry(0.1,8,6),M(0xffffff),s*0.18,0.12,0.47);part(ball,new THREE.SphereGeometry(0.05,8,6),MAT.dark,s*0.18,0.12,0.56);
    const lid=part(ball,new THREE.SphereGeometry(0.11,8,6,0,Math.PI*2,0,Math.PI/2),M(0xd8a840),s*0.18,0.12,0.47);lid.rotation.x=-0.5;lids.push(lid);}
  const smile=part(ball,new THREE.TorusGeometry(0.16,0.03,5,14,Math.PI),M(0x8a3a20),0,-0.08,0.5);smile.rotation.z=Math.PI;
  for(const s of[-1,1])part(ball,new THREE.SphereGeometry(0.08,8,6),M(0xff9a7a),s*0.32,-0.02,0.4);
  return {g,ball,lids};}
function makeKuzma(){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);const c=M(0x7a7a80);
  const cap=capsule(0.42,0.5,c);cap.position.y=0.8;body.add(cap);part(body,new THREE.BoxGeometry(0.7,0.8,0.1),M(0x6a4020),0,0.75,0.4);    // фартук
  const head=new THREE.Group();head.position.y=1.55;body.add(head);part(head,new THREE.SphereGeometry(0.3,12,10),M(0xeeeeee),0,0,0);
  for(const s of[-1,1])part(head,new THREE.BoxGeometry(0.1,0.12,0.5),MAT.dark,s*0.12,0.06,0.04);                                           // полосы барсука
  part(head,new THREE.SphereGeometry(0.06,8,6),MAT.dark,0,-0.05,0.3);const arm=new THREE.Group();arm.position.set(0.45,1.1,0.1);body.add(arm);
  part(arm,new THREE.CylinderGeometry(0.08,0.08,0.6,6),c,0,-0.25,0);const ham=new THREE.Group();ham.position.set(0,-0.55,0.1);arm.add(ham);
  part(ham,new THREE.CylinderGeometry(0.03,0.03,0.6,5),M(0x7a5634),0,0,0.25).rotation.x=Math.PI/2;part(ham,new THREE.BoxGeometry(0.2,0.15,0.15),M(0x555560),0,0,0.55);
  return {g,body,head,arm};}
function makeLeshy(scale){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);const moss=M(0x3d5a2a),bark=M(0x5a4028),eye=M(0xd8ff6a,{emissive:0xc8ff40,emissiveIntensity:1.3});
  part(body,new THREE.CylinderGeometry(0.55,1.05,3.2,10),moss,0,1.6,0);const head=new THREE.Group();head.position.y=3.6;body.add(head);part(head,new THREE.SphereGeometry(0.62,12,10),bark,0,0,0);
  const bd=new THREE.ConeGeometry(0.55,1.4,8);bd.rotateX(Math.PI);part(head,bd,M(0x2e4420),0,-0.75,0.32);
  for(const s of[-1,1]){part(head,new THREE.SphereGeometry(0.12,8,6),eye,s*0.22,0.1,0.52);const a=part(head,new THREE.ConeGeometry(0.08,1.5,5),bark,s*0.45,0.9,0);a.rotation.z=-s*0.5;
    const a2=part(head,new THREE.ConeGeometry(0.05,0.8,5),bark,s*0.8,1.1,0);a2.rotation.z=-s*1.1;}
  const hands=[];for(const s of[-1,1]){const sh=new THREE.Group();sh.position.set(s*0.75,2.9,0);body.add(sh);const arm=part(sh,new THREE.CylinderGeometry(0.14,0.11,2.2,6),moss,0,-1.1,0.2);
    const hand=new THREE.Group();hand.position.set(0,-2.2,0.35);sh.add(hand);for(let k=0;k<3;k++){const f=part(hand,new THREE.ConeGeometry(0.08,0.8,5),bark,(k-1)*0.18,-0.3,0.1);f.rotation.x=0.4;}
    hands.push({sh,hand,s});}
  g.scale.setScalar(scale||1.3);return {g,body,head,hands,eye};}
function makeKoschei(){ // высокий, сухой, в чёрном кафтане и короне; звенит, как связка ключей
  const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);const kaf=M(0x16121c),trim=M(0x3a2a4a),skin=M(0xcfc7b0),gold=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4});
  part(body,new THREE.ConeGeometry(0.62,2.8,12),kaf,0,1.4,0);part(body,new THREE.CylinderGeometry(0.22,0.3,0.9,10),kaf,0,2.9,0);
  for(let i=0;i<5;i++)part(body,new THREE.BoxGeometry(0.2,0.04,0.06),trim,0,1.2+i*0.35,0.4-i*0.03);
  const head=new THREE.Group();head.position.y=3.65;body.add(head);const sk=part(head,new THREE.SphereGeometry(0.25,12,10),skin,0,0,0);sk.scale.set(0.85,1.25,0.9);
  const ey=M(0x9affb0,{emissive:0x6aff90,emissiveIntensity:1.2});for(const s of[-1,1]){part(head,new THREE.SphereGeometry(0.06,8,6),MAT.dark,s*0.08,0.05,0.19);part(head,new THREE.SphereGeometry(0.025,6,5),ey,s*0.08,0.05,0.235);}
  const crown=new THREE.Group();crown.position.y=0.3;head.add(crown);part(crown,new THREE.TorusGeometry(0.2,0.03,5,18),gold,0,0,0).rotation.x=Math.PI/2;
  for(let i=0;i<7;i++){const a=i/7*Math.PI*2;part(crown,new THREE.ConeGeometry(0.035,0.2,4),gold,Math.cos(a)*0.2,0.1,Math.sin(a)*0.2);}
  const armR=new THREE.Group();armR.position.set(0.3,3.1,0);body.add(armR);part(armR,new THREE.CylinderGeometry(0.06,0.05,1.2,6),kaf,0,-0.6,0);
  const hand=new THREE.Group();hand.position.set(0,-1.2,0);armR.add(hand);part(hand,new THREE.SphereGeometry(0.07,8,6),skin,0,0,0);
  const ring=part(hand,new THREE.TorusGeometry(0.045,0.018,6,12),gold,0.02,-0.02,0.05);part(hand,new THREE.SphereGeometry(0.03,6,5),M(0x7a1030,{emissive:0x400010,emissiveIntensity:0.5}),0.02,0.02,0.07);   // перстень
  const keys=new THREE.Group();keys.position.set(-0.25,1.9,0.3);body.add(keys);for(let i=0;i<4;i++){const k=part(keys,new THREE.BoxGeometry(0.03,0.18,0.02),MAT.dark,(i-1.5)*0.06,-0.1,0);k.rotation.z=(i-1.5)*0.2;}
  return {g,body,head,armR,hand,ring};}

/* ====================== Живое болото мира 1 (1-1 и 1-2): чудо болотное, камыш и кувшинки, лягушки, пузыри ====================== */
// o: zA…zB — вдоль трясины (zB — ближний к началу край), busy(x,z) — где растениям не место, onRope(h) — на чём стоящего чудо сталкивает,
// n — сколько чего (по умолчанию — как на большом болоте 1-2), chuTip — первая подсказка о чуде. Трясина — гладь на высоте −0,45.
function swampLife(o){const zA=o.zA,zB=o.zB,busy=o.busy,onRope=o.onRope,N=Object.assign({stalk:420,sedge:360,leaf:170,snag:16,spots:70,frog:24},o.n||{});
  // в трясине (без земли, кочек и струн)? — по коробкам и цилиндрам: струны не в счёт
  const bogAt=(x,z)=>{for(const b of W.boxes)if(b.on&&b.maxy>-1.2&&x>b.minx-0.3&&x<b.maxx+0.3&&z>b.minz-0.3&&z<b.maxz+0.3)return false;
    for(const c of W.cyls)if(c.on&&c.maxy>-1.2&&Math.hypot(x-c.x,z-c.z)<c.r+0.3)return false;return Math.abs(x)<10.8&&z>zA-1&&z<zB+1;};   // только своя трясина: в другом провале уровня (молочная речка 1-1) чуду не место
  // где растениям не место: дорожки колышков, ветка и съезд, толстая струна, гать, тропы тумана, кувшинки, омут
  const inst=(geo,mat,list)=>{const m=new THREE.InstancedMesh(geo,mat,Math.max(1,list.length));const q=new THREE.Quaternion(),eu=new THREE.Euler(),mt=new THREE.Matrix4();
    list.forEach((p,i)=>{eu.set(p.rx||0,p.ry||0,p.rz||0);q.setFromEuler(eu);mt.compose(new V3(p.x,p.y,p.z),q,new V3(p.s,p.sy||p.s,p.s));m.setMatrixAt(i,mt);});
    if(!list.length)m.count=0;m.castShadow=false;m.receiveShadow=true;m.frustumCulled=false;W.group.add(m);return m;};
  {const stalk=[],head=[],sedge=[],leaf=[],flower=[];
    for(let i=0;i<900&&stalk.length<N.stalk;i++){const x=rand(-10.6,10.6),z=rand(zA+3,zB);if(busy(x,z)||!bogAt(x,z))continue;
      const n=Math.floor(rand(2,5));for(let k=0;k<n;k++){const px=x+rand(-0.5,0.5),pz=z+rand(-0.5,0.5),h=rand(1.3,2.3),rz=rand(-0.12,0.12),rx=rand(-0.12,0.12);
        stalk.push({x:px,y:-0.45+h/2,z:pz,s:1,sy:h,rx,rz});if(Math.random()<0.7)head.push({x:px+rz*-h*0.5,y:-0.45+h*0.92,z:pz+rx*h*0.5,s:1,rx,rz});}}   // рогоз: стебель и бархатная шишка
    for(let i=0;i<1400&&sedge.length<N.sedge;i++){const x=rand(-10.8,10.8),z=rand(zA+2,zB+2);if(busy(x,z))continue;const bog=bogAt(x,z);if(!bog&&Math.random()<0.75)continue;
      sedge.push({x,y:bog?-0.45:0,z,s:rand(0.7,1.3),sy:rand(0.8,1.5),ry:rand(0,6.3),rz:rand(-0.3,0.3)});}   // осока пучками
    for(let i=0;i<900&&leaf.length<N.leaf;i++){const x=rand(-10.5,10.5),z=rand(zA+2,zB);if(busy(x,z)||!bogAt(x,z))continue;leaf.push({x,y:-0.42,z,s:rand(0.5,1.0),ry:rand(0,6.3)});
      if(Math.random()<0.16)flower.push({x:x+0.1,y:-0.36,z:z+0.05,s:rand(0.8,1.2),ry:rand(0,6.3)});}   // кувшинки на воде и белые цветы
    const cg=new THREE.CylinderGeometry(0.025,0.035,1,4);cg.translate(0,0,0);inst(cg,M(0x6a7a30),stalk);inst(new THREE.CylinderGeometry(0.065,0.065,0.3,6),M(0x5a3420),head);
    const sg=new THREE.ConeGeometry(0.16,0.7,4,1,true);sg.translate(0,0.35,0);inst(sg,M(0x5a7a2a,{side:THREE.DoubleSide}),sedge);
    const lg=new THREE.CircleGeometry(0.45,10,0.4,Math.PI*2-0.4);lg.rotateX(-Math.PI/2);inst(lg,M(0x3f7a30),leaf);
    const fg=new THREE.ConeGeometry(0.12,0.16,6);inst(fg,M(0xf4f0f8,{emissive:0x404040,emissiveIntensity:0.3}),flower);
    // коряги: сухие стволы торчат из трясины
    for(let i=0,n=0;i<300&&n<N.snag;i++){const x=rand(-10,10),z=rand(zA+4,zB-2);if(busy(x,z)||!bogAt(x,z))continue;n++;const g=new THREE.Group();g.position.set(x,-0.5,z);g.rotation.set(rand(-0.5,0.5),rand(0,6.3),rand(0.3,1.1));W.group.add(g);
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
    return {g,body,arms,eyes,ring,rim,wave,st:'off',t:0,cd:5,x:0,z:0,y:-3.6,peek:false,face:0,pushed:0,peeks:0,ups:0,told:false};})();W.flags.chudo={get st(){return CHU.st;},get ups(){return CHU.ups;},get pushed(){return CHU.pushed;},get peeks(){return CHU.peeks;}};
  const CHU_HID=-3.6,CHU_TOP=-0.8,CHU_PEEK=-2.0,CHU_R=2.9;   // глубина, высота над трясиной целиком и «одни глаза»; докуда достаёт
  const chuStart=(x,z,peek)=>{const C=CHU;C.st='warn';C.t=0;C.hit=[];C.x=x;C.z=z;C.peek=peek;C.g.position.set(x,CHU_HID,z);C.g.visible=false;C.ring.position.x=C.rim.position.x=C.wave.position.x=x;C.ring.position.z=C.rim.position.z=C.wave.position.z=z;
    const h=HEROES.filter(q=>q.active).sort((p,q)=>hd(p.pos,C)-hd(q.pos,C))[0];C.face=h?Math.atan2(h.pos.x-x,h.pos.z-z):0;C.g.rotation.y=C.face;
    if(!peek){tone(70,0.5,'sine',0.18,45);floatText(new V3(x,0.6,z),'Буль-буль…','#bfe0a0');if(!C.told){C.told=true;for(const pi of[0,1])tip(pi,o.chuTip?o.chuTip(pi):'Пузыри у струны! Из трясины лезет болотное чудо — столкнёт в трясину, и назад к колокольчику.<br>Отойди подальше или закройся щитом '+K(pi,'guard')+'.',3.4);}}};
  const chuPick=()=>{if(W.flags.noChudo)return;
    const on=HEROES.filter(h=>h.active&&h.grounded&&h.groundRef&&onRope(h));
    if(on.length){const h=on[Math.floor(rand(0,on.length))],t=h.groundRef,ax=t.dx,az=t.dz;for(const sd of(Math.random()<0.5?[1,-1]:[-1,1])){
      const x=h.pos.x+az*2.1*sd+ax*1.4,z=h.pos.z-ax*2.1*sd+az*1.4;if(bogAt(x,z)){chuStart(x,z,false);return;}}}
    const near=HEROES.filter(q=>q.active);if(!near.length)return;const h=near[Math.floor(rand(0,near.length))];   // выглянуть подальше от героев — болото живое
    for(let k=0;k<8;k++){const a=rand(0,6.3),r=rand(7,13),x=h.pos.x+Math.sin(a)*r,z=h.pos.z+Math.cos(a)*r;if(z<zB&&bogAt(x,z)&&!busy(x,z)&&HEROES.every(q=>hd(q.pos,{x,z})>5)){chuStart(x,z,true);return;}}};
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
    if(Math.random()<dt*7){const h=HEROES[Math.floor(rand(0,4))];for(let k=0;k<3;k++){const x=h.pos.x+rand(-9,9),z=h.pos.z+rand(-12,6);if(z<zB&&bogAt(x,z)){BUB.spawn(x,z);break;}}}
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
    for(let i=0;i<500&&spots.length<N.spots;i++){const x=rand(-10,10),z=rand(zA+3,zB);if(!busy(x,z)&&bogAt(x,z))spots.push({x,z,y:-0.4,water:true});}
    const NF=N.frog,L=[];for(let i=0;i<NF;i++){const s=spots[Math.floor(rand(0,spots.length))];L.push({x:s.x+rand(-0.5,0.5),y:s.y,z:s.z+rand(-0.5,0.5),ry:rand(0,6.3),hop:null,t:rand(0,6),next:rand(2,8),sac:0,croak:rand(2,9),water:!!s.water,sc:rand(1.3,1.9),col:i%3});}
    const mk=(geo,mat,n)=>{const m=new THREE.InstancedMesh(geo,mat,n);m.castShadow=false;m.frustumCulled=false;W.group.add(m);return m;};
    const bg=new THREE.SphereGeometry(0.17,10,8);const body=[mk(bg,M(0x5aa040),NF),mk(bg,M(0x7a8a3a),NF),mk(bg,M(0x4a7a5a),NF)];
    const eye=mk(new THREE.SphereGeometry(0.06,8,6),M(0xf8f0b0,{emissive:0x605820,emissiveIntensity:0.4}),NF*2),pup=mk(new THREE.SphereGeometry(0.032,6,5),MAT.dark,NF*2),thr=mk(new THREE.SphereGeometry(0.08,8,6),M(0xe8e0a0),NF);
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
  return {bogAt,BUB,CHU,FROG};}
/* ---------- вороны Кощея (1-1): чёрные, глаза жёлтые, крылья машут (wings[i].rotation.z) ---------- */
function makeRaven(){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);const bk=M(0x23232e),bk2=M(0x34344a);
  part(body,new THREE.SphereGeometry(0.42,10,8),bk,0,0,0).scale.set(0.8,0.75,1.35);const head=part(body,new THREE.SphereGeometry(0.26,10,8),bk,0,0.18,0.52);
  part(body,new THREE.ConeGeometry(0.09,0.36,6),M(0x55555e),0,0.12,0.84).rotation.x=Math.PI/2;
  for(const s of[-1,1]){part(body,new THREE.SphereGeometry(0.075,8,6),M(0xffe060,{emissive:0xc09010,emissiveIntensity:0.9}),s*0.13,0.25,0.66);part(body,new THREE.SphereGeometry(0.035,6,5),MAT.dark,s*0.15,0.26,0.72);
    part(body,new THREE.CylinderGeometry(0.025,0.025,0.26,4),M(0x3a3a40),s*0.12,-0.38,0.05);}
  for(let i=0;i<3;i++){const f=part(body,new THREE.BoxGeometry(0.12,0.05,0.5),bk2,(i-1)*0.11,0.03,-0.7);f.rotation.set(-0.25,(i-1)*0.25,0);}   // хвост веером
  const wings=[];for(const s of[-1,1]){const w=new THREE.Group();w.position.set(s*0.28,0.12,0);body.add(w);part(w,new THREE.BoxGeometry(1.0,0.05,0.55),bk2,s*0.5,0,0);
    for(let i=0;i<3;i++)part(w,new THREE.BoxGeometry(0.12,0.04,0.3),bk,s*(0.75+i*0.11),0,-0.3-i*0.04);w.userData.s=s;wings.push(w);}   // маховые перья
  g.scale.setScalar(1.4);g.traverse(q=>{q.castShadow=false;q.userData.noBatch=true;});return {g,body,head,wings};}
/* ---------- звери теремка (1-1): мышка-норушка, лягушка-квакушка, зайчик-побегайчик, лисичка-сестричка, волчок — серый бочок ---------- */
function makeTeremBeast(kind){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);
  const C={mysh:[0x9a9aa6,0xf2c0c8],kvak:[0x5aa040,0xe8e0a0],zayka:[0xeeeef4,0xf4b8c4],lisa:[0xe0702a,0xfff4ea],volk:[0x7a8490,0xd8dce0]}[kind],fur=M(C[0]),pale=M(C[1]);
  part(body,new THREE.SphereGeometry(0.4,10,8),fur,0,0.45,0).scale.set(0.9,kind==='kvak'?0.7:1.0,1.0);part(body,new THREE.SphereGeometry(0.27,10,8),pale,0,0.42,0.2).scale.set(0.9,1,0.6);
  const head=new THREE.Group();head.position.set(0,kind==='kvak'?0.78:0.95,0.05);body.add(head);part(head,new THREE.SphereGeometry(0.3,10,8),fur,0,0,0).scale.set(1,kind==='kvak'?0.75:1,1);
  const eyeY=kind==='kvak'?0.2:0.06;for(const s of[-1,1]){if(kind==='kvak')part(head,new THREE.SphereGeometry(0.11,8,6),M(0xffffff),s*0.14,eyeY,0.14);part(head,new THREE.SphereGeometry(0.055,6,5),MAT.dark,s*(kind==='kvak'?0.14:0.11),eyeY,kind==='kvak'?0.23:0.26);}
  if(kind==='lisa'||kind==='volk'){part(head,new THREE.ConeGeometry(0.13,0.34,6),pale,0,-0.06,0.34).rotation.x=Math.PI/2;part(head,new THREE.SphereGeometry(0.05,6,5),MAT.dark,0,-0.05,0.51);}
  else if(kind==='kvak')part(head,new THREE.TorusGeometry(0.16,0.02,4,12,Math.PI),M(0x2a4a1c),0,-0.06,0.24).rotation.z=Math.PI;
  else part(head,new THREE.SphereGeometry(0.05,6,5),M(0xd06070),0,-0.04,0.3);
  for(const s of[-1,1]){if(kind==='mysh')part(head,new THREE.SphereGeometry(0.16,8,6),pale,s*0.24,0.24,0).scale.set(1,1,0.3);
    else if(kind==='zayka'){const e=part(head,new THREE.SphereGeometry(0.08,8,6),fur,s*0.11,0.42,-0.02);e.scale.set(1,3.2,0.6);e.rotation.z=-s*0.15;}
    else if(kind!=='kvak'){const e=part(head,new THREE.ConeGeometry(0.1,0.24,4),fur,s*0.16,0.3,0);e.rotation.z=-s*0.25;}}
  if(kind==='mysh'){const t=part(body,new THREE.CylinderGeometry(0.025,0.015,0.7,4),pale,0,0.25,-0.5);t.rotation.x=1.2;}
  else if(kind==='zayka')part(body,new THREE.SphereGeometry(0.12,8,6),pale,0,0.35,-0.38);
  else if(kind==='lisa'||kind==='volk'){const t=part(body,new THREE.SphereGeometry(0.17,8,6),fur,0,0.4,-0.5);t.scale.set(1,1,2.4);t.rotation.x=0.6;if(kind==='lisa')part(body,new THREE.SphereGeometry(0.1,8,6),pale,0,0.6,-0.85);}
  g.scale.setScalar({mysh:0.75,kvak:0.8,zayka:0.95,lisa:1.05,volk:1.2}[kind]);return {g,body,head,kind};}
