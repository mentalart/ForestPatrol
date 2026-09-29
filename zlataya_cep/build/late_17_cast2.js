/* ============================== РЕЛИЗ final05 · ПЕРСОНАЖИ НА УРОВНЕ ГЕРОЕВ (2): Садко, Старик, Рыбка, Жар-птица, Сирин и Алконост, Соловей, Лихо, кузнецы, богатыри, звери, Печка, Яблонька ============================== */
// Тот же кит (late_16). Где логика перекрашивает материал (Жар-птица расцветает, у Соловья грудка, у Лиха зрачок), эти части — отдельный набор вершин
// со своим материалом: цвет вершин светлый, оттенок даёт материал. Окаменение кузнецов — цвета в вершинах плавно уходят в камень.
const WHT=cc(0xffffff,0xece6da,0xbeb4a2);   // «белая» палитра: оттенок даёт материал
function castMat(c,o){return new THREE.MeshLambertMaterial(Object.assign({color:c,vertexColors:true,skinning:true},o||{}));}

/* ---------- Садко: гусляр-купец — красный кафтан с золотом, шапка с опушкой, русая борода; гусли и капля — как у прототипа ---------- */
function buildSadko(){const R=castRig(1.8,51),KF=cc(0xe05a44,0xb02a2a,0x741a1c),GD=PAL.gold,S=PAL.skins[1],BR=cc(0xc8904a,0x9a6a3a,0x6a4424);
  R.bone('hips','root',0,0.6,0);R.bone('chest','hips',0,0.5,0);R.bone('neck','chest',0,0.25,0);R.bone('head','neck',0,0.15,0);
  R.part('hips',KP.lathe([[0,-0.6],[0.62,-0.6],[0.58,-0.3],[0.5,0],[0.44,0.2],[0,0.22]],10),KF);R.part('hips',KP.tor(0.6,0.045,3,16),GD,tm(0,-0.55,0,Math.PI/2,0,0),{kN:0.3});
  R.box('hips',0.07,0.8,0.03,GD,tm(0,-0.2,0.53,-0.13,0,0),{b:0,s:0.1});R.part('hips',KP.tor(0.45,0.04,3,14),cc(0xffe070,0xe8b030,0xa07010),tm(0,0.12,0,Math.PI/2,0,0));
  for(const s of[-1,1])R.box('hips',0.16,0.1,0.26,PAL.night,tm(s*0.18,-0.56,0.2),{s:0});
  R.part('chest',KP.lathe([[0,-0.3],[0.45,-0.28],[0.46,-0.05],[0.4,0.14],[0.24,0.25],[0,0.27]],10),KF);for(let i=0;i<4;i++)R.part('chest',hIco(0.03),GD,tm(0,-0.2+i*0.1,0.45-i*0.02),{s:0.2});
  R.part('chest',KP.tor(0.22,0.05,3,12),GD,tm(0,0.23,0,Math.PI/2,0,0),{kN:0.3});R.part('neck',KP.cyl(0.1,0.12,0.2,6),S);
  R.part('head',hSph(0.28,8,6),S,tm(0,0,0,0,0,0,1,1.05,1));const bd=KP.cone(0.25,0.5,8);bd.rotateX(Math.PI);R.part('head',bd,BR,tm(0,-0.3,0.12),{noise:0.01});
  for(const s of[-1,1]){R.part('head',KP.cone(0.05,0.22,4),BR,tm(s*0.07,-0.11,0.26,0,0,s*1.9),{s:0.1});R.part('head',hSph(0.06,5,4),cc(0xffb0a0,0xf08a78,0xc06050),tm(s*0.15,-0.06,0.22,0,0,0,1,0.7,0.5),{kN:0.1});}
  const ns=KP.cone(0.045,0.12,5);ns.rotateX(Math.PI/2);R.part('head',ns,S,tm(0,-0.02,0.3),{s:0.1});
  R.part('head',KP.cyl(0.27,0.3,0.26,10),KF,tm(0,0.28,0));R.part('head',new FIN.orig.Sphere(0.27,10,3,0,Math.PI*2,0,Math.PI/2),KF,tm(0,0.4,0),{s:0.1});R.part('head',KP.tor(0.29,0.08,4,14),cc(0x9a7a5a,0x6a4a2a,0x42301c),tm(0,0.16,0,Math.PI/2,0,0),{noise:0.01});
  for(const[s,n]of[[1,'L'],[-1,'R']]){hEye(R,n,s*0.1,0.06,0.25,0.055,cc(0x9ad0ff,0x5a90d0,0x2a5a9a),{lid:S});hBrow(R,n,s*0.105,0.14,0.26,0.08,BR,s*0.12);}
  hMouth(R,0,-0.13,0.25,0.03);
  // руки как у прототипа: плечо в точке ±0.45, 1.1, 0.1 — предплечье вперёд к гуслям
  for(const[s,n]of[[1,'L'],[-1,'R']]){R.bone('a'+n,'chest',s*0.45,0,0.1);R.part('a'+n,KP.cyl(0.09,0.08,0.55,6),KF,tm(0,-0.2,0.18,0.9,0,0));R.part('a'+n,KP.tor(0.08,0.02,3,8),GD,tm(0,-0.33,0.39,0.9+Math.PI/2,0,0),{s:0.2});R.part('a'+n,hSph(0.07,6,4),S,tm(0,-0.36,0.45));}
  return R;}
makeSadko=function(){const R=buildSadko(),o=castMake(R),B=o.rig;const gus=new THREE.Group();gus.position.set(0,0.78,0.5);gus.rotation.x=-1.1;o.body.add(gus);gusliMesh(gus,M(0xc88a3a),1.4);
  const drop=dropMesh(0x3a1a4a);drop.scale.setScalar(0.5);drop.position.set(0,1.35,0.62);o.body.add(drop);
  return castReg(Object.assign(o,{head:B.head,arms:[B.aR,B.aL],gus,drop}),{hs:1.2});};

/* ---------- Старик: рыбак — голубая рубаха с красным поясом, лысина с белым венчиком, длинная белая борода; невод как у прототипа ---------- */
function buildStarik(){const R=castRig(1.4,53),SH=cc(0x8ab0e0,0x5a7ab0,0x34507e),S=PAL.skins[1],BW=PAL.white;
  R.bone('hips','root',0,0.45,0);R.bone('chest','hips',0,0.35,0);R.bone('neck','chest',0,0.2,0);R.bone('head','neck',0,0.12,0);
  R.part('hips',KP.lathe([[0,-0.45],[0.4,-0.45],[0.42,-0.2],[0.4,0.05],[0,0.07]],9),cc(0xb0a080,0x8a7a5a,0x5a4e38));for(const s of[-1,1])R.box('hips',0.14,0.08,0.22,PAL.straw,tm(s*0.14,-0.42,0.14),{s:0});
  R.box('hips',0.14,0.14,0.02,cc(0xa0c0e0,0x7090c0,0x405a88),tm(0.18,-0.22,0.38,0,0.4,0),{b:0});   // заплатка
  R.part('chest',KP.lathe([[0,-0.3],[0.42,-0.28],[0.4,-0.02],[0.33,0.13],[0.18,0.2],[0,0.21]],9),SH);R.part('chest',KP.tor(0.4,0.045,3,14),PAL.red,tm(0,-0.26,0,Math.PI/2,0,0),{kN:0.3});
  R.part('neck',KP.cyl(0.08,0.1,0.14,6),S);R.part('head',hSph(0.24,8,6),S,tm(0,0,0,0,0,0,1,1.05,1));
  const bd=KP.cone(0.22,0.62,8);bd.rotateX(Math.PI);R.part('head',bd,BW,tm(0,-0.33,0.12,0.12,0,0),{noise:0.01});for(const s of[-1,1])R.part('head',KP.cone(0.04,0.18,4),BW,tm(s*0.07,-0.09,0.22,0,0,s*1.8),{s:0.2});
  R.part('head',KP.tor(0.2,0.06,4,12,Math.PI*1.3),BW,tm(0,0.02,-0.03,Math.PI/2,0,-Math.PI*0.15),{noise:0.01});   // венчик волос
  const ns=KP.cone(0.05,0.12,5);ns.rotateX(Math.PI/2);R.part('head',ns,cc(0xffc0a0,0xf0a080,0xc07050),tm(0,-0.02,0.25),{s:0.1});
  for(const[s,n]of[[1,'L'],[-1,'R']]){hEye(R,n,s*0.085,0.05,0.21,0.045,cc(0x9ab8d0,0x6a88a8,0x3a5878),{lid:S});hBrow(R,n,s*0.09,0.12,0.22,0.08,BW,-s*0.15);}
  hMouth(R,0,-0.12,0.22,0.025);
  for(const[s,n]of[[1,'L'],[-1,'R']]){R.bone('a'+n,'chest',s*0.38,0,0.08);R.part('a'+n,KP.cyl(0.075,0.07,0.5,6),SH,tm(0,-0.2,0.12,1.0,0,0));R.part('a'+n,hSph(0.065,6,4),S,tm(0,-0.29,0.34));}
  return R;}
makeStarik=function(){const R=buildStarik(),o=castMake(R),B=o.rig;const net=new THREE.Group();net.position.set(0,0.45,0.55);o.body.add(net);const nm=MB(0xd8c8a0);
  for(let i=0;i<5;i++){const a=new THREE.Mesh(new THREE.BoxGeometry(1.2,0.015,0.015),nm);a.position.z=-0.3+i*0.15;net.add(a);const b=new THREE.Mesh(new THREE.BoxGeometry(0.015,0.015,0.62),nm);b.position.x=-0.5+i*0.25;net.add(b);}
  return castReg(Object.assign(o,{head:B.head,arms:[B.aR,B.aL],net}),{hs:1});};

/* ---------- Золотая рыбка: пухленькая, светится, большие глаза, корона, веерный хвост и плавники ---------- */
const RYB=castMat(0xffffff,{emissive:0xc08000,emissiveIntensity:0.45});RYB.userData.shared=true;
function buildRybka(){const R=castRig(0.7,55),GO=cc(0xfff0a0,0xffc930,0xd08a10),FN=cc(0xffd890,0xffa830,0xd06a10);
  R.bone('head','root',0,0.05,0.22);R.bone('tail','root',0,0,-0.36);for(const[s,n]of[[1,'L'],[-1,'R']])R.bone('fin'+n,'root',s*0.16,-0.05,0.05);
  R.part('root',hSph(0.34,9,7),GO,tm(0,0,0,0,0,0,0.58,0.85,1.25));R.part('root',hSph(0.2,7,5),cc(0xfff8d8,0xffe8a0,0xe8b860),tm(0,-0.1,0.1,0,0,0,0.5,0.6,1),{s:0.2});
  R.part('root',KP.cone(0.12,0.2,4),FN,tm(0,0.33,-0.05,-0.3,0,0,0.3,1,1.4),{s:0.1});
  R.part('tail',KP.cone(0.28,0.42,5),FN,tm(0,0,-0.18,-Math.PI/2,0,0,0.25,1,1.1));for(const s of[-1,1])R.part('tail',KP.cone(0.16,0.34,4),FN,tm(0,s*0.12,-0.3,-Math.PI/2-s*0.5,0,0,0.2,1,1),{s:0.2});
  for(const[s,n]of[[1,'L'],[-1,'R']]){R.part('fin'+n,KP.cone(0.08,0.22,4),FN,tm(s*0.05,0,-0.08,-Math.PI/2-0.5,s*0.6,0,0.25,1,1));
    hEye(R,n,s*0.13,0.04,0.1,0.07,cc(0x8ad0ff,0x3a8ad0,0x1a4a8a),{lid:GO});}
  hMouth(R,0,-0.09,0.2,0.03);
  R.bone('crown','head',0,0.25,-0.1);R.part('crown',KP.cyl(0.085,0.075,0.05,8),GD_C);for(let i=0;i<5;i++){const a=i/5*Math.PI*2;R.part('crown',KP.cone(0.03,0.12,4),GD_C,tm(Math.cos(a)*0.08,0.07,Math.sin(a)*0.08),{s:0.3});}
  return R;}
const GD_C=cc(0xfff4b0,0xffd84a,0xd09a20);
makeRybka=function(){const R=buildRybka(),o=castMake(R,{b:RYB}),B=o.rig;const glow=new THREE.PointLight(0xffd060,0.9,4,2);o.g.add(glow);
  return castReg(Object.assign(o,{glow}),{hs:0.5,tick(o,dt){const t=G.time*6+o.face.ph;B.tail.rotation.y=Math.sin(t)*0.35;B.finL.rotation.z=0.3+Math.sin(t*1.3)*0.25;B.finR.rotation.z=-0.3-Math.sin(t*1.3)*0.25;}});};

/* ---------- Жар-птица: огненная, пышная грудь, длинная шея, хохолок-пламя, крылья перьями; расцветает (bloom) — как у прототипа ---------- */
function buildFirebird(){const R=castRig(1.9,57);
  R.bone('torso','root',0,0.8,0);R.bone('neckB','root',0,1.3,0.4);R.bone('head','root',0,1.68,0.62);R.bone('crest','head',0,0.18,0);for(const[s,n]of[[1,'L'],[-1,'R']])R.bone('w'+n,'root',s*0.42,1.0,0);
  R.use('gold');R.part('torso',hSph(0.55,9,7),WHT,tm(0,0,0,0,0,0,0.85,0.95,1.2));R.part('torso',hSph(0.34,7,5),WHT,tm(0,-0.05,0.35,0,0,0,1,1.1,0.6),{s:0.3});
  for(let i=0;i<8;i++){const a=(i-3.5)*0.32;R.part('torso',KP.cone(0.1,0.22,3),WHT,tm(Math.sin(a)*0.34,0.02-Math.abs(i-3.5)*0.03,0.45+Math.cos(a)*0.08,Math.PI+0.6,a,0,1,1,0.4),{s:-0.1});}
  R.part('neckB',KP.cyl(0.13,0.2,0.7,8),WHT,tm(0,0,0,0.5,0,0));R.part('head',hSph(0.22,8,6),WHT);
  R.use('red');for(let i=0;i<5;i++)R.part('crest',KP.cone(0.045,0.38,4),WHT,tm((i-2)*0.06,0.15,-0.05-Math.abs(i-2)*0.03,-0.3,0,(i-2)*0.25));
  for(const[s,n]of[[1,'L'],[-1,'R']]){for(let k=0;k<4;k++)R.part('w'+n,KP.cone(0.13-k*0.015,0.75-k*0.1,3),WHT,tm(s*(0.16+k*0.1),-0.2-k*0.06,-0.12+k*0.05,-Math.PI/2+0.25,0,-s*(0.55+k*0.12),1,1,0.3),{s:0.1-k*0.08});
    R.part('w'+n,hSph(0.18,6,4),WHT,tm(s*0.12,-0.05,0,0,0,0,1.3,0.5,1));}
  R.use('b');const bk=KP.cone(0.07,0.26,5);bk.rotateX(Math.PI/2);R.part('head',bk,cc(0xfff0a0,0xffe070,0xc8a030),tm(0,-0.03,0.26),{s:0.1});
  for(const[s,n]of[[1,'L'],[-1,'R']]){hEye(R,n,s*0.12,0.05,0.14,0.06,cc(0xffe880,0xffa820,0xc06010),{lid:cc(0xffd070,0xffb030,0xc07010)});hBrow(R,n,s*0.12,0.13,0.16,0.06,PAL.red,s*0.15);
    R.part('torso',KP.cyl(0.035,0.035,0.4,5),cc(0xfff0a0,0xffe070,0xc8a030),tm(s*0.18,-0.6,0.05));R.part('torso',KP.cone(0.08,0.12,4),cc(0xfff0a0,0xffe070,0xc8a030),tm(s*0.18,-0.79,0.1,Math.PI/2,0,0),{s:0});}
  R.bone('mouth','head',0,-0.06,0.2);R.map.mouth.scale.y=0.32;
  return R;}
makeFirebird=function(o){o=o||{};const R=buildFirebird(),gold=castMat(0xffb030,{emissive:0xff7010,emissiveIntensity:0.5}),red=castMat(0xff4a20,{emissive:0xc02000,emissiveIntensity:0.5});
  const c=castMake(R,{gold,red}),B=c.rig;const tail=[];const nT=o.bald?2:9;
  for(let i=0;i<nT;i++){const a=(i-(nT-1)/2)*(o.bald?0.3:0.18);const f=featherMesh(2.6);f.position.set(Math.sin(a)*0.25,0.7,-0.55);f.rotation.set(-2.2+Math.abs(a)*0.3,a,0);c.body.add(f);tail.push(f);if(o.bald)f.userData.mats.forEach(m=>{m.color.setHex(0xb08a60);m.emissiveIntensity=0.05;});}
  if(o.bald){gold.color.setHex(0xc8a070);gold.emissiveIntensity=0.1;red.color.setHex(0xa0604a);red.emissiveIntensity=0.1;}
  const glow=new THREE.PointLight(0xffa040,o.bald?0.2:1.1,7,2);glow.position.y=1;c.g.add(glow);
  const F=Object.assign(c,{head:B.head,crest:B.crest,tail,wings:[{wp:B.wR,s:-1},{wp:B.wL,s:1}],gold,red,glow,
    bloom(k){gold.color.lerpColors(new THREE.Color(0xc8a070),new THREE.Color(0xffb030),k);gold.emissiveIntensity=0.1+0.5*k;red.color.lerpColors(new THREE.Color(0xa0604a),new THREE.Color(0xff4a20),k);red.emissiveIntensity=0.1+0.4*k;glow.intensity=0.2+1.0*k;}});
  return castReg(F,{hs:1.2});};

/* ---------- Сирин и Алконост: птицы-девы — оперение, девичье лицо, кокошник с каменьями; Сирин грустная (синяя), Алконост весёлая (рыжая) ---------- */
function buildSirin(al){const R=castRig(1.8,al?59:61),PL=al?cc(0xffc070,0xff9a30,0xc06010):cc(0x8a8ae0,0x4a4aa0,0x2a2a68),DK=al?cc(0xf08a40,0xd05a1a,0x902e0a):cc(0x5a5ab8,0x2a2a70,0x16163e),S=PAL.skins[0],HR=al?cc(0xc06030,0x8a3a10,0x5a2008):cc(0x5a3a30,0x2a1a14,0x140c08),GD=PAL.gold,GEM=al?cc(0xff8a8a,0xff4040,0xb01818):cc(0xb0e0ff,0x60b0ff,0x2070c0);
  R.bone('torso','root',0,0.75,0);R.bone('neck','root',0,1.3,0.12);R.bone('head','root',0,1.55,0.18);for(const[s,n]of[[1,'L'],[-1,'R']])R.bone('w'+n,'root',s*0.45,1.05,-0.05);
  R.part('torso',hSph(0.55,9,7),PL,tm(0,0,0,0,0,0,0.9,1.05,1.1));R.part('torso',hSph(0.34,7,5),cc(0xfff4e0,0xf0dcc0,0xc8b090),tm(0,0.05,0.34,0,0,0,1,1.2,0.5),{s:0.2});
  for(let r=0;r<3;r++)for(let i=0;i<7;i++){const a=(i-3)*0.3;R.part('torso',KP.cone(0.08,0.2,3),r%2?DK:PL,tm(Math.sin(a)*0.45,-0.1-r*0.16,0.32+Math.cos(a)*0.1-r*0.04,Math.PI+0.5,a,0,1,1,0.35),{s:-0.1});}
  for(let i=0;i<5;i++)R.part('torso',KP.cone(0.1,1.0,3),i%2?DK:PL,tm((i-2)*0.1,-0.25,-0.85,-2.0,(i-2)*0.2,0,1,1,0.3));
  R.part('neck',KP.cyl(0.07,0.09,0.24,6),S);R.part('head',hSph(0.26,8,7),S,tm(0,0,0,0,0,0,0.95,1.05,0.95));
  R.part('head',new FIN.orig.Sphere(0.28,9,4,0,Math.PI*2,0,Math.PI*0.52),HR,tm(0,0.03,-0.03),{kN:0.3});R.part('head',KP.cone(0.12,0.7,5),HR,tm(0,-0.2,-0.2,0.2,0,0),{s:-0.1});   // коса
  for(const s of[-1,1])R.part('head',hSph(0.05,5,4),cc(0xffb8b0,0xf09088,0xc06058),tm(s*0.14,-0.06,0.2,0,0,0,1,0.7,0.5),{kN:0.1});
  R.bone('kok','head',0,0.2,0);R.part('kok',new FIN.orig.Cylinder(0.3,0.26,0.28,14,1,true,-1.3,2.6),GD,tm(0,0.08,0),{kN:0.2,s:0.1});R.part('kok',new FIN.orig.Cylinder(0.3,0.26,0.28,14,1,true,-1.3,2.6),GD,tm(0,0.08,0,0,0,0,0.97,1,0.97),{kN:0.2,s:-0.3});
  for(let i=0;i<5;i++)R.part('kok',hIco(0.04),GEM,tm(Math.sin((i-2)*0.45)*0.3,0.12,Math.cos((i-2)*0.45)*0.3),{s:0.3});
  for(const[s,n]of[[1,'L'],[-1,'R']]){hEye(R,n,s*0.09,0.03,0.21,0.05,al?cc(0xa0d890,0x5aa050,0x2a6a2a):cc(0x9ab0f0,0x5a70c8,0x2a3a88),{lid:S});hBrow(R,n,s*0.09,0.1,0.23,0.065,HR,s*(al?-0.25:0.3));
    for(let k=0;k<3;k++)R.part('w'+n,KP.cone(0.16,0.9-k*0.18,3),k%2?DK:PL,tm(s*(0.14+k*0.12),-0.22-k*0.08,-0.1+k*0.05,-Math.PI/2+0.3,0,-s*(0.6+k*0.1),1,1,0.28),{s:0.05-k*0.05});
    R.part('torso',KP.cyl(0.03,0.03,0.35,5),GD,tm(s*0.16,-0.65,0.05));}
  hMouth(R,0,-0.1,0.22,0.03);return R;}
makeSirin=function(kind){const al=kind==='alkonost',R=buildSirin(al),o=castMake(R),B=o.rig;
  return castReg(Object.assign(o,{head:B.head,wings:[{wp:B.wR,s:-1},{wp:B.wL,s:1}],mouth:mouthProxy(B.mouth)}),{hs:1.1});};

/* ---------- Соловей-Разбойник: круглый пёстрый разбойник — шляпа с перьями, мохнатые брови, надувные щёки, борода, посох ---------- */
soloveiBody=function(inner){const R=castRig(3.9,63),BRN=cc(0xb08a64,0x8a6a4a,0x5a4430),DK=cc(0x7a5a40,0x5a4030,0x3a281c),SK=cc(0xf0d0a8,0xd8b890,0xa8885e),BK=cc(0xfff0a0,0xe0b060,0xa07830);
  R.bone('torso','root',0,1.4,0);R.bone('chest','root',0,1.35,0.72);R.bone('head','root',0,2.75,0.1);R.bone('beak','head',0,-0.05,0.78);for(const[s,n]of[[1,'L'],[-1,'R']]){R.bone('cheek'+n,'head',s*0.42,-0.14,0.36);R.bone('w'+n,'root',s*0.95,1.9,0);}
  R.bone('staff','root',1.1,1.2,0.3);
  R.part('torso',hSph(1.0,10,8),BRN,tm(0,0,0,0,0,0,1.05,1.15,0.95),{noise:0.02});for(let i=0;i<10;i++){const a=i*0.63;R.part('torso',KP.cone(0.15,0.4,3),i%2?DK:BRN,tm(Math.sin(a)*0.95,-0.5+Math.cos(i*1.3)*0.3,Math.cos(a)*0.85-0.1,Math.PI+0.6,a,0,1,1,0.4),{s:-0.1});}
  R.use('c');R.part('chest',hSph(0.62,8,6),WHT,tm(0,0,0,0,0,0,1,1.1,0.45));R.use('b');
  for(let i=0;i<9;i++)R.part('chest',hIco(0.09),[cc(0xff9a80,0xff5a3a,0xc02a10),cc(0x9ad8ff,0x3ab0ff,0x1070c0),cc(0xfff09a,0xffe040,0xc0a010)][i%3],tm(Math.cos(i*2.1)*0.35,Math.sin(i*1.7)*0.4,0.26),{s:0.2});
  R.part('head',hSph(0.62,9,7),BRN,null,{noise:0.02});
  for(const n of['L','R'])R.part('cheek'+n,hSph(0.28,7,5),SK,null,{s:0.1});
  const bg=KP.cone(0.16,0.55,6);bg.rotateX(Math.PI/2);R.part('beak',bg,BK);
  for(const[s,n]of[[1,'L'],[-1,'R']]){hEye(R,n,s*0.2,0.14,0.52,0.09,cc(0xa0d0ff,0x5a8ad0,0x2a4a8a),{lid:BRN});hBrow(R,n,s*0.2,0.3,0.55,0.24,DK,s*0.45);}
  R.part('head',KP.cyl(0.36,0.52,0.4,10),cc(0x5a4a6a,0x3a2a4a,0x201628),tm(0,0.55,0));R.part('head',KP.cyl(0.62,0.62,0.06,12),cc(0x5a4a6a,0x3a2a4a,0x201628),tm(0,0.37,0),{s:-0.1});
  R.part('head',KP.tor(0.44,0.04,3,14),PAL.red,tm(0,0.45,0,Math.PI/2,0,0),{kN:0.3});
  for(let i=0;i<3;i++)R.part('head',KP.cone(0.06,0.7,4),[PAL.red,PAL.blue,PAL.yellow][i],tm((i-1)*0.14,0.95,-0.1,-0.2,0,(i-1)*0.3),{s:0.1});
  const bd=KP.cone(0.38,0.8,8);bd.rotateX(Math.PI);R.part('head',bd,DK,tm(0,-0.64,0.36,0.2,0,0),{noise:0.02});R.bone('mouth','head',0,-0.3,0.66);R.map.mouth.scale.y=0.32;
  for(const[s,n]of[[1,'L'],[-1,'R']]){for(let k=0;k<3;k++)R.part('w'+n,KP.cone(0.3-k*0.04,1.1-k*0.15,3),k%2?BRN:DK,tm(s*(0.3+k*0.22),-0.3-k*0.08,0,-Math.PI/2+0.2,0,-s*(1.3+k*0.1),1,1,0.35),{s:0.05-k*0.05});
    R.part('torso',KP.cyl(0.08,0.08,0.5,6),BK,tm(s*0.35,-1.15,0.1));R.part('torso',KP.cone(0.16,0.22,4),BK,tm(s*0.35,-1.37,0.2,Math.PI/2,0,0),{s:0});}
  R.part('staff',KP.cyl(0.06,0.07,2.6,6),PAL.log);R.part('staff',KP.ico(0.18,0),PAL.bark,tm(0,1.3,0),{noise:0.02});R.part('staff',KP.tor(0.08,0.02,3,8),PAL.gold,tm(0,1.05,0,Math.PI/2,0,0),{s:0.2});
  const chestM=castMat(0xc88a4a,{emissive:0x000000});const meshes=R.build(inner,{c:chestM});const B=R.map;
  const o={head:B.head,cheeks:[B.cheekR,B.cheekL],beak:B.beak,chest:B.chest,chestM,wings:[{wp:B.wR,s:-1},{wp:B.wL,s:1}],staff:B.staff,rig:B,meshes};
  inner.userData.castSol=o;return o;};
makeSolovei=function(){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);const L=soloveiBody(body);body.scale.setScalar(0.75);const o=Object.assign({g,body},L);return castReg(o,{hs:2.4});};

/* ---------- Лихо одноглазое: мохнатое, огромное, один большой глаз (зрачок светится), клыки, лапищи; веко и глаз — как у прототипа ---------- */
function buildLikho(){const R=castRig(5,65),FU=cc(0x6a5e52,0x4a4038,0x2e2822),FU2=cc(0x8a7a64,0x6a5a48,0x463a2c),SK=cc(0xb8a48e,0x9a8672,0x6a5a4a);
  R.bone('torso','root',0,2.6,0);R.bone('head','root',0,4.35,0.25);R.bone('eye','head',0,0.12,0.86);R.bone('lid','eye',0,0,0);
  for(const[s,n]of[[1,'L'],[-1,'R']]){R.bone('a'+n,'root',s*1.72,3.5,0.2);R.bone('paw'+n,'a'+n,0,-2.5,0);R.bone('leg'+n,'root',s*0.72,0.65,0);}
  R.part('torso',hSph(1.6,10,8),FU,tm(0,0,0,0,0,0,1.12,1.25,1),{noise:0.05});
  for(let i=0;i<40;i++){const a=i*2.4,y=-1.2+(i%10)*0.26,k=Math.max(0.15,1-Math.pow(y/2.1,2)),r=1.72*Math.sqrt(k);R.part('torso',KP.cone(0.2,0.7,3),i%2?FU:FU2,tm(Math.cos(a)*r,y,Math.sin(a)*r*0.92,Math.sin(a)*1.3,0,-Math.cos(a)*1.3),{kN:0.2});}
  R.part('head',hSph(1.05,10,8),FU,tm(0,0,0,0,0,0,1,0.95,0.95),{noise:0.04});
  for(let i=0;i<14;i++){const a=i/14*Math.PI*2;R.part('head',KP.cone(0.17,0.8,3),FU2,tm(Math.cos(a)*0.85,0.55+Math.sin(i*1.7)*0.15,Math.sin(a)*0.75-0.1,Math.sin(a)*0.9,0,-Math.cos(a)*0.9));}
  for(const s of[-1,1])R.part('head',KP.cone(0.14,0.5,5),cc(0xf4ecd8,0xe0d4b8,0xa89878),tm(s*0.55,0.95,0,0,0,-s*0.5),{s:0.1});   // рожки
  R.part('eye',hSph(0.44,10,8),PAL.white,tm(0,0,0,0,0,0,1,1,0.8),{kN:0.15,kJ:0.02});R.part('eye',hIco(0.11),PAL.night,tm(0,0,0.45),{kN:0,s:-0.5});
  R.part('eye',hIco(0.09),PAL.white,tm(0.12,0.12,0.4),{kN:0,s:1});R.part('eye',hIco(0.045),PAL.white,tm(-0.1,-0.1,0.42),{kN:0,s:1});
  R.use('i');R.part('eye',hSph(0.25,8,6),WHT,tm(0,0,0.25,0,0,0,1,1,0.6),{kN:0.1});R.use('b');
  R.part('lid',new FIN.orig.Sphere(0.48,10,4,0,Math.PI*2,0,Math.PI/2),FU2,tm(0,0,0,0,0,0,1,1,0.85),{kN:0.3});
  R.box('head',1.1,0.18,0.24,FU2,tm(0,0.64,0.84,0.3,0,0),{b:0.05});
  R.bone('mouth','head',0,-0.5,0.84);R.part('mouth',hSph(0.36,8,4),PAL.night,tm(0,0,0,0,0,0,1.2,0.6,0.4),{kN:0});R.part('mouth',hSph(0.2,6,4),PAL.pink,tm(0,-0.08,0.05,0,0,0,1.3,0.5,0.4),{kN:0});R.map.mouth.scale.y=0.5;
  for(const s of[-1,1])R.part('head',KP.cone(0.08,0.26,4),cc(0xfffcf0,0xf0e8d0,0xc8bca0),tm(s*0.22,-0.46,0.96,Math.PI,0,0),{s:0.2});
  for(const[s,n]of[[1,'L'],[-1,'R']]){R.part('a'+n,KP.cyl(0.32,0.24,2.4,7),FU,tm(0,-1.2,0),{noise:0.03});R.part('paw'+n,hSph(0.46,8,6),SK);
    for(let k=0;k<3;k++)R.part('paw'+n,KP.cone(0.08,0.36,4),cc(0xfff0e0,0xe8d8c0,0xb0a088),tm((k-1)*0.2,-0.34,0.2,Math.PI*0.8,0,0),{s:0.1});
    R.part('leg'+n,KP.cyl(0.4,0.46,1.3,8),FU,null,{noise:0.03});R.part('leg'+n,hSph(0.45,7,4),SK,tm(0,-0.6,0.25,0,0,0,1,0.45,1.4),{s:-0.1});}
  return R;}
makeLikho=function(){const R=buildLikho(),iris=castMat(0xd8401a,{emissive:0xb02000,emissiveIntensity:0.9}),o=castMake(R,{i:iris}),B=o.rig;B.lid.rotation.x=-1.25;B.aL.rotation.z=0.28;B.aR.rotation.z=-0.28;
  // старые имена: eye — группа глаза, iris — у прототипа меш, здесь — объект с материалом зрачка
  const mouth=B.mouth;return castReg(Object.assign(o,{head:B.head,eye:B.eye,iris:{material:iris,isProxy:true},lid:B.lid,mouth,arms:[{a:B.aR,paw:B.pawR,sd:-1},{a:B.aL,paw:B.pawL,sd:1}],legs:[B.legR,B.legL]}),{hs:3.5});};

/* ---------- кузнецы Кузьма и Демьян: могучие, в фартуках, с бородами; окаменение — цвета в вершинах уходят в камень ---------- */
function buildSmith(dem){const R=castRig(2.6,dem?67:69),SH=dem?cc(0xe07050,0xb0402a,0x78281a):cc(0x8a9ac0,0x5a6a8a,0x3a4660),AP=cc(0xa0704a,0x6a4020,0x42281a),S=PAL.skins[2],BD=dem?cc(0xe08a4a,0xc0602a,0x8a3a14):cc(0xf0f0e8,0xd8d8d0,0xa8a8a0);
  R.bone('hips','root',0,0.75,0);R.bone('chest','hips',0,0.75,0);R.bone('neck','chest',0,0.4,0);R.bone('head','neck',0,0.2,0);
  R.part('hips',KP.lathe([[0,-0.1],[0.46,-0.08],[0.5,0.2],[0.48,0.45],[0,0.47]],9),SH);for(const s of[-1,1]){R.part('hips',KP.cyl(0.16,0.17,0.6,7),PAL.night,tm(s*0.22,-0.4,0));R.box('hips',0.22,0.14,0.34,cc(0x6a4a30,0x4a3020,0x2e1e14),tm(s*0.22,-0.7,0.05),{s:0});}
  R.part('chest',KP.lathe([[0,-0.3],[0.52,-0.28],[0.56,0.0],[0.5,0.26],[0.3,0.4],[0,0.42]],10),SH);
  R.box('chest',0.78,1.1,0.08,AP,tm(0,-0.35,0.48,-0.06,0,0),{b:0.02});R.part('hips',KP.tor(0.48,0.04,3,14),AP,tm(0,0.3,0,Math.PI/2,0,0));
  R.part('neck',KP.cyl(0.14,0.17,0.2,7),S);R.part('head',hSph(0.34,8,6),S);R.part('head',KP.tor(0.33,0.035,3,14),PAL.red,tm(0,0.12,0,Math.PI/2-0.1,0,0),{kN:0.3});
  const bd=KP.cone(0.3,0.72,8);bd.rotateX(Math.PI);R.part('head',bd,BD,tm(0,-0.38,0.16),{noise:0.02});R.part('head',new FIN.orig.Sphere(0.36,9,4,0,Math.PI*2,0,Math.PI*0.45),BD,tm(0,0.05,-0.04),{kN:0.3});
  for(const s of[-1,1])R.part('head',KP.cone(0.06,0.24,4),BD,tm(s*0.09,-0.13,0.3,0,0,s*1.8),{s:0.1});const ns=KP.cone(0.07,0.14,5);ns.rotateX(Math.PI/2);R.part('head',ns,S,tm(0,-0.03,0.34),{s:0.1});
  for(const[s,n]of[[1,'L'],[-1,'R']]){hEye(R,n,s*0.12,0.06,0.28,0.06,cc(0xa8c8e0,0x6a90b0,0x3a5878),{lid:S});hBrow(R,n,s*0.12,0.15,0.3,0.12,BD,s*0.1);}
  hMouth(R,0,-0.15,0.31,0.035);
  R.bone('arm','chest',0.55,0.15,0.05);R.part('arm',KP.cyl(0.14,0.12,0.8,7),SH,tm(0,-0.35,0));R.part('arm',hSph(0.12,6,4),S,tm(0,-0.75,0.05));
  R.part('arm',KP.cyl(0.04,0.04,0.8,5),PAL.log,tm(0,-0.75,0.4,Math.PI/2,0,0));R.box('arm',0.3,0.22,0.22,PAL.iron,tm(0,-0.75,0.8),{b:0.04});
  R.bone('armL','chest',-0.55,0.15,0.05);R.part('armL',KP.cyl(0.14,0.12,0.8,7),SH,tm(0,-0.35,0));R.part('armL',hSph(0.12,6,4),S,tm(0,-0.75,0.05));
  return R;}
makeSmith=function(kind,stone){const dem=kind==='demyan',R=buildSmith(dem),o=castMake(R),B=o.rig;const m=o.meshes.b,ca=m.geometry.attributes.color,orig=ca.array.slice(),st=new Float32Array(orig.length);
  for(let i=0;i<orig.length;i+=3){const l=orig[i]*0.3+orig[i+1]*0.55+orig[i+2]*0.15,k=0.55+l*0.5;st[i]=0.54*k;st[i+1]=0.52*k;st[i+2]=0.5*k;}
  const S=Object.assign(o,{head:B.head,arm:B.arm,armL:B.armL,mats:[],orig:[],stoneK:0,setStone(k){S.stoneK=k;const a=ca.array;for(let i=0;i<a.length;i++)a[i]=orig[i]+(st[i]-orig[i])*k;ca.needsUpdate=true;}});
  if(stone)S.setStone(1);return castReg(S,{hs:1.6});};

/* ---------- богатыри: Илья (палица, седая борода), Добрыня (меч, тёмная борода), Алёша (гусли, молодой) — кольчуга, шлем-шишак, плащ, щит ---------- */
function buildBogatyr(kind){const C={i:[cc(0xb8b8c8,0x8a8a9a,0x5a5a6a),cc(0xffffff,0xd8d8d8,0xa8a8a8),cc(0xa05a44,0x6a3a2a,0x42241a)],d:[cc(0x9a9aaa,0x6a6a7a,0x42424e),cc(0x5a3a2a,0x2a1a10,0x140c08),cc(0x4a70b0,0x2a4a8a,0x18305a)],a:[cc(0xc8c8d8,0x9a9aaa,0x6a6a7a),cc(0xf0c870,0xc89a4a,0x8a6a2a),cc(0xc04a4a,0x8a2a2a,0x5a1818)]}[kind];
  const R=castRig(2.8,71+kind.charCodeAt(0)),S=PAL.skins[kind==='d'?3:1],GD=PAL.gold;
  R.bone('hips','root',0,0.8,0);R.bone('chest','hips',0,0.7,0);R.bone('neck','chest',0,0.5,0);R.bone('head','neck',0,0.45,0);
  R.part('hips',KP.lathe([[0,-0.3],[0.62,-0.28],[0.68,0.1],[0.6,0.4],[0,0.42]],10),C[0],null,{noise:0.01});R.part('hips',KP.tor(0.62,0.06,3,14),PAL.log,tm(0,0.35,0,Math.PI/2,0,0));R.box('hips',0.14,0.12,0.05,GD,tm(0,0.35,0.64),{b:0.02});
  for(const s of[-1,1]){R.part('hips',KP.cyl(0.19,0.2,0.55,7),cc(0x9a6a4a,0x6a4a2a,0x42301c),tm(s*0.26,-0.55,0));R.box('hips',0.26,0.16,0.4,PAL.night,tm(s*0.26,-0.76,0.06),{s:0});}
  R.part('chest',KP.lathe([[0,-0.3],[0.62,-0.28],[0.66,0.05],[0.56,0.32],[0.3,0.48],[0,0.5]],10),C[0],null,{noise:0.01});
  R.part('chest',new FIN.orig.Cylinder(0.66,0.8,1.3,12,1,true,Math.PI*0.6,Math.PI*0.8),C[2],tm(0,-0.35,-0.06),{kN:0.2});   // плащ
  R.part('neck',KP.cyl(0.15,0.18,0.2,7),S);R.part('head',hSph(0.36,8,6),S);
  R.part('head',KP.cone(0.42,0.72,10),C[0],tm(0,0.42,0),{kN:0.3});R.part('head',KP.tor(0.37,0.05,3,14),GD,tm(0,0.1,0,Math.PI/2,0,0),{s:0.2});R.part('head',hIco(0.07),GD,tm(0,0.8,0),{s:0.3});
  R.box('head',0.06,0.28,0.06,C[0],tm(0,0.02,0.36),{b:0.01});   // наносник
  const bl=kind==='a'?0.3:0.62;const bd=KP.cone(0.3,bl,8);bd.rotateX(Math.PI);R.part('head',bd,C[1],tm(0,-0.2-bl/2,0.18),{noise:0.01});for(const s of[-1,1])R.part('head',KP.cone(0.05,0.22,4),C[1],tm(s*0.08,-0.12,0.33,0,0,s*1.8),{s:0.1});
  for(const[s,n]of[[1,'L'],[-1,'R']]){hEye(R,n,s*0.12,0.03,0.31,0.058,cc(0x9ac0e8,0x5a8ac0,0x2a5a90),{lid:S});hBrow(R,n,s*0.12,0.12,0.33,0.11,C[1],s*0.1);}
  hMouth(R,0,-0.14,0.33,0.03);
  for(const[s,n]of[[1,'L'],[-1,'R']]){cArm(R,n,'chest',[s*0.66,0.25,0],0.5,0.45,0.15,0.13,C[0]);R.part('hand'+n,hSph(0.13,6,4),cc(0x9a6a4a,0x6a4a2a,0x42301c));}
  // щит — на левой руке, оружие — в правой
  R.part('handL',KP.cyl(0.5,0.5,0.08,12),C[2],tm(0.12,0.05,0.1,0,0,Math.PI/2));R.part('handL',KP.tor(0.5,0.04,3,14),GD,tm(0.17,0.05,0.1,0,Math.PI/2,0));R.part('handL',hIco(0.1),GD,tm(0.18,0.05,0.1),{s:0.2});
  if(kind==='d'){R.box('handR',0.08,1.4,0.03,cc(0xf0f0f8,0xd8d8e0,0xa0a0b0),tm(0,0.55,0.1),{b:0});R.box('handR',0.34,0.06,0.08,GD,tm(0,-0.1,0.1),{b:0.01});}
  if(kind==='i'){R.part('handR',KP.cyl(0.06,0.06,1.4,6),PAL.log,tm(0,0.5,0.1));R.part('handR',KP.ico(0.24,0),PAL.iron,tm(0,1.2,0.1),{noise:0.02});for(let k=0;k<6;k++){const a=k*1.05;R.part('handR',KP.cone(0.06,0.18,4),PAL.iron,tm(Math.cos(a)*0.24,1.2,0.1+Math.sin(a)*0.24,0,0,Math.PI/2-a));}}
  return R;}
makeBogatyr=function(kind){const R=buildBogatyr(kind),o=castMake(R),B=o.rig;B.armL.rotation.x=-0.6;B.elbowL.rotation.x=-0.6;B.armR.rotation.x=-0.3;B.elbowR.rotation.x=-0.7;
  if(kind==='a'){const gs=new THREE.Group();gusliMesh(gs,M(0xc89a4a),0.7);gs.position.set(0.6,1.3,0.4);gs.rotation.set(-0.6,0,0.4);o.g.add(gs);}
  return castReg(Object.assign(o,{head:B.head}),{hs:1.7});};

/* ---------- звери: заяц, утка, гусь-лебедь, овечка ---------- */
function buildHare(){const R=castRig(1.4,73),F=cc(0xe0d4c0,0xc8b8a0,0x948470),Wh=PAL.white;
  R.bone('torso','root',0,0.5,0);R.bone('head','root',0,0.95,0.45);for(const[s,n]of[[1,'L'],[-1,'R']])R.bone('ear'+n,'head',s*0.12,0.22,-0.05);
  const L=[[-0.2,0.3],[0.2,0.3],[-0.24,-0.25],[0.24,-0.25]];L.forEach(([x,z],i)=>R.bone('leg'+i,'root',x,0.4,z));
  R.part('torso',hSph(0.45,8,6),F,tm(0,0,0,0,0,0,0.85,0.9,1.25));R.part('torso',hSph(0.3,6,4),Wh,tm(0,-0.12,0.22,0,0,0,0.8,0.8,1),{s:0.1});R.part('torso',KP.ico(0.18,0),Wh,tm(0,0.1,-0.58),{s:0.2});
  R.part('head',hSph(0.3,8,6),F,tm(0,0,0,0,0,0,1,0.95,1.05));R.part('head',hSph(0.14,6,4),Wh,tm(0,-0.1,0.22,0,0,0,1.3,0.8,0.8),{s:0.2});R.part('head',hIco(0.045),PAL.pink,tm(0,-0.04,0.33),{s:0.1});
  R.box('head',0.07,0.07,0.02,PAL.white,tm(0,-0.17,0.31),{b:0.005,s:0.5});
  for(const[s,n]of[[1,'L'],[-1,'R']]){R.part('ear'+n,KP.cyl(0.07,0.09,0.7,6),F,tm(0,0.35,0,0,0,0,1,1,0.6));R.part('ear'+n,KP.cyl(0.04,0.05,0.55,6),PAL.pink,tm(0,0.36,0.035,0,0,0,1,1,0.4),{s:0.1});
    hEye(R,n,s*0.14,0.06,0.23,0.07,cc(0xb8905a,0x8a6030,0x5a3818),{lid:F});hBrow(R,n,s*0.14,0.15,0.25,0.06,cc(0x948470,0x746454,0x4a3e34),s*0.1);}
  hMouth(R,0,-0.13,0.28,0.025);L.forEach((_,i)=>R.part('leg'+i,KP.cyl(0.07,0.08,0.4,6),F,tm(0,-0.2,0)));
  return R;}
makeHare=function(){const R=buildHare(),o=castMake(R),B=o.rig;return castReg(Object.assign(o,{head:B.head,ears:[B.earR,B.earL],legs:[B.leg0,B.leg1,B.leg2,B.leg3]}),{hs:0.8});};
function buildDuck(){const R=castRig(0.9,75),FE=cc(0xb09070,0x8a6a4a,0x5a4430),GR=cc(0x5ab080,0x2a7a4a,0x164a2c),BK=cc(0xffd070,0xf0a020,0xb07010);
  R.bone('torso','root',0,0,0);R.bone('head','root',0,0.35,0.45);for(const[s,n]of[[1,'L'],[-1,'R']])R.bone('w'+n,'root',s*0.3,0.1,0);
  R.part('torso',hSph(0.4,8,6),FE,tm(0,0,0,0,0,0,0.9,0.8,1.3));R.part('torso',hSph(0.26,6,4),cc(0xe0d0c0,0xc8b8a0,0x988870),tm(0,-0.12,0.2,0,0,0,1,0.7,1.1),{s:0.1});R.part('torso',KP.cone(0.12,0.25,4),FE,tm(0,0.1,-0.5,-1.9,0,0),{s:-0.1});
  R.part('head',hSph(0.2,7,5),GR);R.part('head',KP.tor(0.12,0.03,3,10),PAL.white,tm(0,-0.17,-0.03,Math.PI/2,0,0));R.box('head',0.16,0.05,0.22,BK,tm(0,-0.05,0.22),{b:0.02});
  for(const[s,n]of[[1,'L'],[-1,'R']]){hEye(R,n,s*0.1,0.05,0.14,0.045,null,{lid:GR});R.part('w'+n,KP.cone(0.2,0.6,3),FE,tm(s*0.28,0,0,-Math.PI/2,0,-s*1.45,1,1,0.3),{s:0.1});}
  R.bone('mouth','head',0,-0.05,0.3);R.map.mouth.scale.y=0.32;return R;}
makeDuck=function(){const R=buildDuck(),o=castMake(R),B=o.rig;return castReg(Object.assign(o,{head:B.head,wings:[{w:B.wR,s:-1},{w:B.wL,s:1}]}),{hs:0.6});};
function buildGoose(){const R=castRig(1.3,77),Wh=cc(0xffffff,0xf4f4f6,0xc8c8d4),GY=cc(0xe0e0e8,0xc0c0cc,0x8a8a9a),BK=cc(0xffb060,0xf08a20,0xb05a10);
  R.bone('torso','root',0,0,0);R.bone('neck','root',0,0.35,0.75);R.bone('head','root',0,0.68,1.12);for(const[s,n]of[[1,'L'],[-1,'R']])R.bone('w'+n,'root',s*0.3,0.15,0);
  R.part('torso',hSph(0.5,9,7),Wh,tm(0,0,0,0,0,0,0.8,0.7,1.35));R.part('torso',KP.cone(0.22,0.45,4),Wh,tm(0,0.05,-0.75,-1.6,0,0),{s:-0.05});
  R.part('neck',KP.cyl(0.09,0.12,0.9,7),Wh,tm(0,0,0,0.9,0,0));R.part('head',hSph(0.17,7,5),Wh);
  const bg=KP.cone(0.075,0.32,5);bg.rotateX(Math.PI/2);R.part('head',bg,BK,tm(0,-0.03,0.22),{s:0.1});R.part('head',hIco(0.06),BK,tm(0,0.02,0.12),{s:0});
  for(const[s,n]of[[1,'L'],[-1,'R']]){hEye(R,n,s*0.09,0.05,0.1,0.045,cc(0x9ad0ff,0x4a90d0,0x2a5a9a),{lid:Wh});hBrow(R,n,s*0.09,0.1,0.12,0.05,GY,-s*0.35);
    for(let k=0;k<4;k++)R.part('w'+n,KP.cone(0.2-k*0.02,1.1-k*0.15,3),k>1?GY:Wh,tm(s*(0.3+k*0.22),0,-0.1+k*0.04,-Math.PI/2+0.1,0,-s*1.5,1,1,0.25),{s:0.1-k*0.05});}
  R.bone('mouth','head',0,-0.05,0.3);R.map.mouth.scale.y=0.32;
  for(const s of[-1,1]){R.part('torso',KP.cyl(0.035,0.035,0.4,5),BK,tm(s*0.15,-0.45,0.05));R.part('torso',KP.cone(0.09,0.12,4),BK,tm(s*0.15,-0.64,0.12,Math.PI/2,0,0));}
  return R;}
makeGoose=function(s){const R=buildGoose(),o=castMake(R),B=o.rig;o.g.scale.setScalar(s||1);return castReg(Object.assign(o,{head:B.head,wings:[{wp:B.wR,sd:-1},{wp:B.wL,sd:1}]}),{hs:0.8});};
function buildSheep(){const R=castRig(1.1,79),WL=cc(0xffffff,0xfaf8ff,0xd0cce0),DK=cc(0x5a5468,0x3a3448,0x22202c);
  R.bone('torso','root',0,0.62,0);R.bone('head','root',0,0.66,0.5);const L=[[-0.2,0.2],[0.2,0.2],[-0.2,-0.2],[0.2,-0.2]];L.forEach(([x,z],i)=>R.bone('leg'+i,'root',x,0.4,z));
  for(const[dx,dy,dz,s]of[[0,0,0,0.5],[0.28,0.04,0.18,0.34],[-0.28,0.04,0.12,0.36],[0.1,0.1,-0.28,0.36],[-0.14,0.18,0.02,0.34],[0,-0.02,0.3,0.32],[0.2,0.16,-0.1,0.3],[-0.22,0.1,-0.24,0.3]])R.part('torso',KP.ico(s,1),WL,tm(dx,dy,dz),{noise:0.015,kN:0.3});
  R.part('head',hSph(0.2,7,5),DK,tm(0,0,0,0,0,0,0.85,1,1.15));R.part('head',KP.ico(0.13,1),WL,tm(0,0.17,-0.03),{noise:0.01});
  for(const[s,n]of[[1,'L'],[-1,'R']]){hEye(R,n,s*0.09,0.06,0.17,0.05,cc(0xd8c070,0xb09040,0x7a6020),{lid:DK});R.box('head',0.16,0.05,0.08,DK,tm(s*0.2,0.06,-0.02,0,0,s*0.4),{b:0.01});}
  L.forEach((_,i)=>R.part('leg'+i,KP.cyl(0.05,0.05,0.4,5),DK,tm(0,-0.2,0)));return R;}
makeSheep=function(){const R=buildSheep(),o=castMake(R),B=o.rig;
  return castReg(Object.assign(o,{head:B.head,legs:[B.leg0,B.leg1,B.leg2,B.leg3]}),{hs:0.6});};

/* ---------- Печка: белёная, с лицом — глаза, брови, заслонка-рот с огоньком; дверца и пирожок — как у прототипа ---------- */
function buildPechka(){const R=castRig(3.8,81),WHt=PAL.plaster,RD=PAL.red;
  R.bone('base','root',0,0,0);R.bone('head','root',0,1.62,1.2);
  R.box('base',2.6,1.9,2.4,WHt,tm(0,0.95,0),{b:0.12,cell:0.6});R.box('base',2.0,0.9,1.9,WHt,tm(0,2.35,-0.2),{b:0.1});R.box('base',0.6,1.4,0.6,WHt,tm(0.6,3.4,-0.6),{b:0.06});R.box('base',0.72,0.12,0.72,RD,tm(0.6,4.1,-0.6),{b:0.03});
  R.box('base',2.66,0.12,2.46,RD,tm(0,1.9,0),{b:0.03});for(let i=0;i<5;i++)R.part('base',KP.ico(0.1,0),[PAL.blue,PAL.red,PAL.green][i%3],tm(-1+i*0.5,0.5,1.21,0,0,0,1.2,1.2,0.3),{s:0.2});   // роспись
  R.box('base',1.3,0.9,0.1,PAL.night,tm(0,1.05,1.2),{b:0.03});R.box('base',1.46,0.1,0.14,cc(0x8a6a4a,0x6a4a2a,0x42301c),tm(0,0.56,1.22),{b:0.02});
  for(const[s,n]of[[1,'L'],[-1,'R']]){hEye(R,n,s*0.5,0,0,0.19,cc(0x6a4a2a,0x4a2a14,0x2a1408),{lid:WHt});hBrow(R,n,s*0.5,0.28,0.05,0.34,cc(0x5a3a2a,0x3a2418,0x1e120c),s*0.12);
    R.part('head',hSph(0.14,6,4),cc(0xffb0a0,0xff8a78,0xd06050),tm(s*0.82,-0.25,0.02,0,0,0,1,0.6,0.3),{kN:0.1});}
  return R;}
makePechka=function(){const R=buildPechka(),o=castMake(R),B=o.rig,g=o.g;
  const mouth=addMesh(new THREE.BoxGeometry(1.2,0.8,0.02),MAT.dark,0,1.05,1.22,g);const door=new THREE.Group();door.position.set(-0.62,1.05,1.28);g.add(door);addMesh(new THREE.BoxGeometry(1.24,0.84,0.06),M(0x3a3a40),0.62,0,0,door);addMesh(new THREE.SphereGeometry(0.06,6,5),M(0x8a8a90),1.1,0,0.05,door);
  const glow=addMesh(new THREE.BoxGeometry(1.0,0.5,0.05),MB(0xff8a3a,{transparent:true,opacity:0.8}),0,0.95,1.23,g);
  const pie=new THREE.Group();pie.position.set(0,1.5,1.6);g.add(pie);const pm=addMesh(new THREE.SphereGeometry(0.22,12,8),M(0xb0702a,{emissive:0x603010,emissiveIntensity:0.3}),0,0,0,pie);pm.scale.set(1.3,0.55,0.9);
  addMesh(new THREE.BoxGeometry(0.9,0.04,0.3),M(0x9a6a3a),0,-0.12,0,pie);pie.visible=false;
  return castReg(Object.assign(o,{door,eyes:[B.eyeR,B.eyeL],glow,pie,mouth}),{hs:2});};

/* ---------- Яблонька: добрая яблоня с лицом на стволе, пышная крона; яблоки — отдельные (их срывают) ---------- */
function buildYablonka(){const R=castRig(3.3,83),BK=PAL.bark,LF=cc(0x9ad060,0x5a9a3a,0x346828);
  R.bone('trunk','root',0,0,0);R.bone('crown','root',0,2.2,0);R.bone('head','root',0,1.2,0.26);
  R.part('trunk',KP.lathe([[0,0],[0.34,0],[0.26,0.2],[0.21,0.9],[0.2,1.6],[0,1.62]],8),BK,null,{noise:0.02});for(const s of[-1,1])R.part('trunk',KP.cone(0.1,0.9,5),BK,tm(s*0.35,1.55,0,0,0,-s*0.7),{noise:0.01});
  for(const[dx,dy,dz,r]of[[0,0,0,1.3],[0.8,-0.3,0.3,0.9],[-0.8,-0.2,-0.2,0.9],[0.1,0.6,-0.3,0.85],[-0.4,0.3,0.6,0.7],[0.5,0.4,-0.6,0.7]])R.part('crown',KP.ico(r,1),LF,tm(dx,dy,dz),{noise:0.06,kN:0.5});
  for(let i=0;i<6;i++){const a=i*1.05;R.part('crown',hIco(0.1),PAL.white,tm(Math.cos(a)*1.1,0.5+Math.sin(i*1.7)*0.3,Math.sin(a)*1.1),{s:0.3});}   // цветки
  for(const[s,n]of[[1,'L'],[-1,'R']]){hEye(R,n,s*0.11,0,0,0.095,cc(0x7a5a3a,0x5a3a20,0x3a2410),{lid:BK});hBrow(R,n,s*0.11,0.13,0.03,0.1,cc(0x5a3a20,0x3a2410,0x201408),s*0.15);}
  R.part('head',hSph(0.06,5,4),cc(0xffb0a0,0xf08a78,0xc06050),tm(0.17,-0.1,-0.01,0,0,0,1,0.6,0.3),{kN:0.1});R.part('head',hSph(0.06,5,4),cc(0xffb0a0,0xf08a78,0xc06050),tm(-0.17,-0.1,-0.01,0,0,0,1,0.6,0.3),{kN:0.1});
  hMouth(R,0,-0.15,0.01,0.035);return R;}
makeYablonka=function(){const R=buildYablonka(),o=castMake(R),B=o.rig,g=o.g;const apples=[];
  for(let i=0;i<8;i++){const a=i/8*Math.PI*2;apples.push(addMesh(new THREE.SphereGeometry(0.12,8,6),M(i%3?0x9ac040:0xd04a2a),Math.cos(a)*1.1,1.8+Math.sin(i*1.9)*0.4,Math.sin(a)*1.1,g));}
  return castReg(Object.assign(o,{apples,eyes:[B.eyeR,B.eyeL]}),{hs:1});};
Object.assign(FIN.castBuild,{sadko:()=>makeSadko(),starik:()=>makeStarik(),rybka:()=>makeRybka(),zhar:()=>makeFirebird(),sirin:()=>makeSirin('sirin'),alkonost:()=>makeSirin('alkonost'),
  solovei:()=>makeSolovei(),likho:()=>makeLikho(),kuzst:()=>makeSmith('kuzma'),demyan:()=>makeSmith('demyan'),bogI:()=>makeBogatyr('i'),bogD:()=>makeBogatyr('d'),bogA:()=>makeBogatyr('a'),
  hare:()=>makeHare(),duck:()=>makeDuck(),goose:()=>makeGoose(),sheep:()=>makeSheep(),pechka:()=>makePechka(),yablonka:()=>makeYablonka()});
