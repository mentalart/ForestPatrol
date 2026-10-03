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

