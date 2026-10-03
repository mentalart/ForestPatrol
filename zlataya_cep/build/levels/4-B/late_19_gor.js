/* ============================== РЕЛИЗ final05 · ГОРЫНЫЧ И ЗВЕНЫШКО НА УРОВНЕ ГЕРОЕВ ============================== */
// Горыныч: тело, три шеи и хвост — один скелетный меш (кости: шеи, восемь звеньев хвоста — как у прототипа), крылья — перепонки на пальцах-спицах,
// головы (makeGorynych5) — у каждой свой характер: левая хитрая, средняя важная, правая добродушная; глаза с веками и бровями, рога, ноздри,
// пасть открывается (jaw — как у прототипа). Звенышко: золотое звено с большими глазами, бликами, моргает и улыбается.
function buildGor(){const R=castRig(7,91),SK=cc(0x7ac05a,0x4a8a3a,0x2e5e24),BL=cc(0xf0dc90,0xc8b060,0x8e7a3a),DK=cc(0x3a7a30,0x2a5a24,0x183a14);
  R.bone('torso','root',0,2.6,0);
  R.part('torso',hSph(2.4,10,8),SK,tm(0,0,0,0,0,0,1.2,1,1.4),{noise:0.05});R.part('torso',hSph(1.8,9,7),BL,tm(0,-0.3,1.6,0,0,0,1,1,0.6),{s:0.1});
  for(let i=0;i<6;i++)R.part('torso',KP.tor(1.45-Math.abs(i-2.5)*0.12,0.05,3,14,Math.PI),cc(0xd8c070,0xa8903a,0x7a6424),tm(0,-1.2+i*0.42,2.35-Math.abs(i-2.5)*0.12,0,0,Math.PI,1,1,0.4),{kN:0.2});
  for(let i=0;i<7;i++)R.part('torso',KP.cone(0.3,0.8,4),DK,tm(0,2.2-i*0.1,1-i*0.8,-0.3,0,0),{s:-0.1});
  for(const s of[-1,1])for(const z of[-1.2,1.2]){R.part('torso',KP.cyl(0.42,0.52,1.4,8),SK,tm(s*1.6,-1.9,z));for(let k=0;k<3;k++)R.part('torso',KP.cone(0.1,0.3,4),PAL.white,tm(s*1.6+(k-1)*0.22,-2.6,z+0.45,Math.PI/2,0,0),{s:0.2});}
  // хвост: восемь звеньев (как у прототипа), шипы
  for(let i=0;i<8;i++){R.bone('tail'+i,'root',0,1.2-i*0.1,-3-i*0.9);R.part('tail'+i,hSph(0.9-i*0.09,7,5),SK,null,{noise:0.02});R.part('tail'+i,KP.cone(0.2-i*0.02,0.5-i*0.03,4),DK,tm(0,0.8-i*0.08,0,-0.4,0,0));}
  R.part('tail7',KP.cone(0.35,0.7,4),DK,tm(0,0,-0.6,-Math.PI/2,0,0,1,0.35,1));
  // три шеи — как у прототипа (от спины вверх-вперёд к головам)
  [[-1.6,0.5],[0,0],[1.6,-0.5]].forEach(([x,a],i)=>{R.bone('neck'+i,'root',x+Math.sin(a)*-0.6,4.8,2.2);const nk=KP.cyl(0.42,0.6,3.6,9);R.part('neck'+i,nk,SK,tm(0,0,0,0.45,0,a*0.6),{noise:0.02});
    for(let k=0;k<4;k++)R.part('neck'+i,KP.cone(0.15,0.35,4),DK,tm(0,-1.2+k*0.8,-0.45+k*0.36,-0.2,0,0));R.part('neck'+i,KP.cyl(0.36,0.52,3.4,9),BL,tm(0,0,0.14,0.45,0,a*0.6,0.8,1,0.6),{s:0.1});});
  return R;}
function gorWing(wp,s){const sh=new THREE.Shape();sh.moveTo(0,0);sh.lineTo(s*5,1.5);sh.lineTo(s*4.6,-1.4);sh.lineTo(s*3.6,-0.4);sh.lineTo(s*2.6,-1.6);sh.lineTo(s*1.8,-0.5);sh.lineTo(s*0.9,-1.5);sh.lineTo(0,-0.6);
  const K=new KGeo(3,93);K.vary=false;K.add(new THREE.ShapeGeometry(sh),cc(0x6aa050,0x3a6a2e,0x24461c),tm(0,0,0,-Math.PI/2,0,0),{kN:0.3,kJ:0.1});
  for(const[x,z]of[[5,1.5],[4.6,-1.4],[2.6,-1.6],[0.9,-1.5]]){const L=Math.hypot(x,z),a=Math.atan2(z,x*s);const c=KP.cyl(0.08,0.14,L,5);c.rotateZ(-Math.PI/2);K.add(c,cc(0x5a8a3a,0x2e5e24,0x183a14),tm(s*x/2,0.05,-z/2,0,a,0),{kN:0.3});}
  const m=new THREE.Mesh(K.build(),KMAT.vcD);m.castShadow=true;wp.add(m);return m;}
makeGorynych=function(){const R=buildGor(),o=castMake(R),B=o.rig,g=o.g;
  const wings=[];for(const s of[-1,1]){const wp=new THREE.Group();wp.position.set(s*2.4,3.6,0);g.add(wp);gorWing(wp,s);wings.push({wp,s});}
  const tail=[];for(let i=0;i<8;i++)tail.push(B['tail'+i]);return castReg(Object.assign(o,{wings,tail,necks:[B.neck0,B.neck1,B.neck2]}),{hs:4,lid:[-2.45,1.25]});};
// глаз для жёстких голов: белок, радужка, зрачок, блик, веко на шарнире, бровь
function rigidEye(parent,x,y,z,r,iris,lidC,browC,browRz){const g=new THREE.Group();g.position.set(x,y,z);parent.add(g);
  const sc=new THREE.Mesh(FE_SCL,new THREE.MeshLambertMaterial({color:0xfbf8ee}));sc.scale.set(r,r*1.1,r*0.8);g.add(sc);
  const ir=new THREE.Mesh(FE_SCL,M(iris,{emissive:iris,emissiveIntensity:0.35}));ir.scale.set(r*0.62,r*0.68,r*0.35);ir.position.z=r*0.55;g.add(ir);
  const pu=new THREE.Mesh(FE_SCL,MAT.dark);pu.scale.set(r*0.28,r*0.4,r*0.2);pu.position.z=r*0.78;g.add(pu);
  const hl=new THREE.Mesh(FE_HL,MB(0xffffff));hl.scale.setScalar(r*0.17);hl.position.set(r*0.25,r*0.3,r*0.86);g.add(hl);
  const lp=new THREE.Group();g.add(lp);lp.add(new THREE.Mesh(FE_LID,M(lidC)));lp.children[0].scale.set(r*1.12,r*1.2,r*0.92);lp.rotation.x=-2.3;
  const bw=new THREE.Mesh(sBoxGeo(r*1.5,r*0.34,r*0.4,{b:r*0.08}),M(browC));bw.position.set(0,r*1.25,r*0.35);bw.rotation.z=browRz||0;g.add(bw);return {g,lid:lp,pu};}
makeGorynych5=function(s){const G5=makeGorynych(),g=G5.g;g.scale.setScalar(s||1);const SK=cc(0x7ac05a,0x4a8a3a,0x2e5e24),DK=cc(0x3a7a30,0x2a5a24,0x183a14),HR=cc(0xfff8e8,0xe8e0c8,0xb0a888);
  const lids=[];const heads=G5.necks.map((n,i)=>{const hg=new THREE.Group();const x=[-1.6,0,1.6][i];hg.position.set(x*1.12,6.5,3.1);g.add(hg);
    fk(hg,K=>{K.add(hSph(0.78,9,7),SK,tm(0,0,0,0,0,0,1,0.85,1.1),{noise:0.015});K.box(0.9,0.46,0.9,SK,tm(0,-0.14,0.72),{b:0.14});K.add(hSph(0.3,6,4),cc(0xe8e0a0,0xc8b060,0x8e7a3a),tm(0,-0.34,0.6,0,0,0,1.4,0.5,1.4),{s:0.1});
      for(const sd of[-1,1]){K.add(KP.cone(0.1,0.55,5),HR,tm(sd*0.35,0.62,-0.1,-0.3,0,-sd*0.4),{s:0.2});K.add(hIco(0.06),cc(0x1a2a14,0x0e1a0a,0x060c04),tm(sd*0.16,-0.05,1.18),{kN:0});
        K.add(KP.cone(0.14,0.34,3),DK,tm(sd*0.72,0.1,-0.1,0,0,-sd*1.4));}
      for(let k=0;k<3;k++)K.add(KP.cone(0.1,0.3,4),DK,tm(0,0.66-k*0.04,-0.2-k*0.28,-0.5,0,0));
      if(i===1){K.add(KP.cyl(0.3,0.36,0.14,8),PAL.gold,tm(0,0.72,0.05),{s:0.2});for(let k=0;k<5;k++){const a=k/5*Math.PI*2;K.add(KP.cone(0.05,0.16,4),PAL.gold,tm(Math.cos(a)*0.3,0.86,0.05+Math.sin(a)*0.3),{s:0.3});}}});   // средняя — важная, в короне
    const jaw=new THREE.Group();jaw.position.set(0,-0.36,0.3);hg.add(jaw);fk(jaw,K=>{K.box(0.8,0.16,0.9,DK,tm(0,0,0.42),{b:0.05});K.add(hSph(0.2,6,4),PAL.pink,tm(0,0.06,0.45,0,0,0,1.6,0.3,1.8),{kN:0});for(let k=0;k<4;k++)K.add(KP.cone(0.045,0.14,4),PAL.white,tm((k-1.5)*0.18,0.14,0.82),{s:0.3});});
    const ch=[[0.35,-0.3],[0.1,0],[-0.3,0.25]][i];   // брови: хитрая, важная, добрая
    for(const sd of[-1,1]){const E=rigidEye(hg,sd*0.34,0.24,0.6,0.16,0xffc020,SK[1],DK[2],sd*ch[0]);lids.push(E.lid);}
    return {g:hg,jaw,base:hg.position.clone()};});
  G5.heads=heads;const F=G5.face;F.opt.tick=(o,dt)=>{const b=F.bt>=0?Math.max(0,1-Math.abs(F.bt/0.17*2-1)):0;for(const l of lids)l.rotation.x=-2.3+b*3.3;};return G5;};
// ---------- Звенышко: большие глаза с бликами, моргание, улыбка ----------
{const _mz=makeZven;makeZven=function(){const Z=_mz.apply(this,arguments);try{const b=Z.body;for(const c of b.children.slice())if(c.isMesh&&c.material===MAT.dark)b.remove(c);
    const eyes=[];for(const s of[-1,1]){const E=rigidEye(b,s*0.075,0.19,0.07,0.045,0x6a3a10,0xf6be3e,0x8a5a10,-s*0.1);E.g.rotation.y=s*0.15;eyes.push(E);}
    const sm=new THREE.Mesh(new THREE.TorusGeometry(0.03,0.008,4,10,Math.PI),MAT.dark);sm.rotation.z=Math.PI;sm.position.set(0,0.12,0.075);b.add(sm);
    Z.face={eyes,blink:2,bt:-1};}catch(e){console.error('zven',e);}return Z;};}
{const _uz=updateZven;updateZven=function(dt){_uz(dt);const Z=W.zven;if(!Z||!Z.face)return;const F=Z.face;F.blink-=dt;if(F.blink<=0&&F.bt<0){F.bt=0;F.blink=2+Math.random()*3;}
  let l=0;if(F.bt>=0){F.bt+=dt;const u=F.bt/0.15;l=u<0.5?u*2:Math.max(0,2-u*2);if(u>=1)F.bt=-1;}for(const E of F.eyes)E.lid.rotation.x=-2.3+l*3.3;};}
Object.assign(FIN.castBuild,{gor:()=>makeGorynych5(0.5)});
