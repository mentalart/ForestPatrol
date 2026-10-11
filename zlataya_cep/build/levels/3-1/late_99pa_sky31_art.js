/* ============================== РЕЛИЗ final06 · 3-1 «САД МОЛОДИЛЬНЫХ ЯБЛОК»: ЖАР-ПТИЦА И ГНЕЗДО ============================== */
// Только для 3-1 (в других уровнях Жар-птица прежняя — makeFirebird из late_17_cast2).
// Жар-птица: прежняя была «общипанной курицей» — голое розовое тело, два пёрышка. Теперь — сказочная птица тем же скелетным китом:
//   длинная S-образная шея, грудка в чешуйках-перьях, корона из трёх перьев с «глазками», крылья из маховых перьев, хвост — семь
//   длинных жар-перьев с огненными «глазками». Старая — та же птица, но выцветшая (пепельно-лиловая), хохолок поник, перья взъерошены,
//   на клюве — круглые очки, хвост — три тусклых пера. bloom(k) — молодеет: цвета разгораются, хохолок встаёт, взъерошенность уходит,
//   хвост распускается веером, свет вокруг разгорается. Совместимость с уровнем: g, body, head, crest, tail[], wings[{wp,s}], bloom(k).
// Гнездо: прежнее (nestMesh) из колец, повёрнутых вокруг двух осей, вставало дугами над птицей и «прорастало» сквозь шею.
//   Теперь — чаша из прутьев: обод ниже груди птицы, прутья уложены по кругу, внутри — пух.
const FB31={old:{body:0xb7a6bd,gold:0xeadfcd,flame:0xc89c9c,glow:0.15},young:{body:0xff7a2a,gold:0xffd24a,flame:0xff3a1c,glow:1.3}};
function buildFirebird31(){const R=castRig(1.9,73),B=WHT;
  R.bone('torso','root',0,0.78,0);R.bone('ruff','torso',0,0,0);R.bone('neck1','torso',0,0.28,0.28);R.bone('neck2','neck1',0,0.24,0.08);R.bone('head','neck2',0,0.27,0.06);
  R.bone('crest','head',0,0.24,-0.04);R.bone('beakLo','head',0,-0.08,0.25);for(const[s,n]of[[1,'L'],[-1,'R']])R.bone('w'+n,'torso',s*0.4,0.14,0.04);
  // тело и шея — набор 'body' (оттенок даёт материал: старая — пепельная, молодая — огненная)
  R.use('body');R.part('torso',hSph(0.5,10,8),B,tm(0,0,0,0,0,0,0.86,0.92,1.18));
  for(let i=0;i<6;i++)R.part('torso',KP.cone(0.11,0.34,3),B,tm((i-2.5)*0.1,0.3-Math.abs(i-2.5)*0.03,-0.36,-2.3,(i-2.5)*0.2,0,1,1,0.35),{s:-0.1});   // спинка
  R.part('neck1',KP.cyl(0.16,0.22,0.36,8),B,tm(0,0,0,0.4,0,0));R.part('neck2',KP.cyl(0.14,0.17,0.32,8),B,tm(0,0,0,0.12,0,0));
  R.part('head',hSph(0.28,10,8),B,tm(0,0.02,0.02,0,0,0,1,0.95,1.05));
  for(const s of[-1,1])for(let k=0;k<4;k++)R.part('ruff',KP.cone(0.06,0.24,3),B,tm(s*(0.3+k*0.04),0.22-k*0.12,0.1-k*0.12,0.4*s+k*0.2,0,-s*(1.1+k*0.25),1,1,0.4),{s:0.1});   // взъерошенные перья (у старой)
  // грудка, чешуйки и воротник — 'gold'
  R.use('gold');R.part('torso',hSph(0.36,8,6),B,tm(0,0.04,0.3,0,0,0,1,1.15,0.62),{s:0.25});
  for(let r=0;r<3;r++)for(let i=0;i<6;i++){const a=(i-2.5)*0.3;R.part('torso',KP.cone(0.08,0.18,3),B,tm(Math.sin(a)*0.32,0.18-r*0.16,0.42+Math.cos(a)*0.06-r*0.03,Math.PI+0.55,a,0,1,1,0.4),{s:-0.05});}
  for(let i=0;i<10;i++){const a=i/10*Math.PI*2;R.part('neck1',KP.cone(0.07,0.2,3),B,tm(Math.sin(a)*0.18,-0.1,Math.cos(a)*0.18,Math.cos(a)*0.9+0.4,0,-Math.sin(a)*0.9,1,1,0.45));}
  const bk=KP.cone(0.08,0.26,6);bk.rotateX(Math.PI/2+0.25);R.part('head',bk,B,tm(0,-0.04,0.32),{s:0.2});
  const bl=KP.cone(0.05,0.16,5);bl.rotateX(Math.PI/2+0.4);R.part('beakLo',bl,B,tm(0,-0.01,0.06),{s:0});
  // корона из трёх перьев с «глазками», кончики крыльев и подхвостье — 'flame'
  R.use('flame');for(let i=0;i<3;i++){const a=(i-1)*0.42,L=i===1?0.42:0.34;R.part('crest',KP.cyl(0.014,0.02,L,4),B,tm(Math.sin(a)*L*0.5,L*0.5,-0.02,-0.25,0,-a));
    R.part('crest',hSph(0.075,6,4),B,tm(Math.sin(a)*L,L+0.03,-0.06,-0.25,0,-a,0.75,1.35,0.4),{s:0.2});}
  for(const[s,n]of[[1,'L'],[-1,'R']]){const w='w'+n;
    R.use('body');R.part(w,hSph(0.26,7,5),B,tm(s*0.06,-0.06,-0.05,0.25,0,0,0.45,0.85,1.35));
    for(let k=0;k<5;k++){R.use(k%2?'gold':'body');R.part(w,KP.cone(0.1-k*0.008,0.78-k*0.07,4),B,tm(s*(0.08+k*0.05),-0.08-k*0.05,-0.25-k*0.02,-Math.PI/2+0.32+k*0.06,s*(0.16+k*0.1),0,1,1,0.3),{s:0.1-k*0.05});
      R.use('flame');R.part(w,KP.cone(0.065-k*0.005,0.32,4),B,tm(s*(0.1+k*0.07),-0.25-k*0.08,-0.85+k*0.06,-Math.PI/2+0.32+k*0.06,s*(0.16+k*0.1),0,1,1,0.3),{s:0});}}
  R.use('b');for(const[s,n]of[[1,'L'],[-1,'R']]){hEye(R,n,s*0.13,0.05,0.2,0.095,cc(0xffe880,0xffa820,0xc06010),{lid:cc(0xe8b890,0xc89070,0x8a6048)});
    for(let k=0;k<3;k++)R.part('head',KP.cone(0.014,0.09,3),PAL.night,tm(s*(0.19+k*0.03),0.13+k*0.012,0.19-k*0.035,0,0,-s*(0.5+k*0.35)),{s:-0.3});      // реснички
    hBrow(R,n,s*0.13,0.17,0.22,0.08,PAL.red,s*0.18);R.part('head',hSph(0.065,6,4),PAL.pink,tm(s*0.17,-0.08,0.18,0,0,0,1,0.6,0.5),{s:0.2});}
  for(const s of[-1,1]){R.part('torso',KP.cyl(0.035,0.035,0.42,5),PAL.gold,tm(s*0.17,-0.58,0.06));R.part('torso',KP.cone(0.07,0.13,4),PAL.gold,tm(s*0.17,-0.78,0.12,Math.PI/2,0,0),{s:0});}
  R.bone('mouth','head',0,-0.06,0.2);R.map.mouth.scale.y=0.32;
  return R;}
// жар-перо хвоста: стебель дугой и огненный «глазок» на конце
function plume31(L,mats){const g=new THREE.Group(),[mF,mG,mD]=mats;const segs=3;let p=new V3(),a=0.25;
  for(let i=0;i<segs;i++){const l=L/segs,c=new THREE.Mesh(new THREE.CylinderGeometry(0.018,0.024,l,4),mG);const d=new V3(0,Math.sin(a),-Math.cos(a));c.position.copy(p).addScaledVector(d,l/2);
    c.quaternion.setFromUnitVectors(new V3(0,1,0),d);g.add(c);for(const sd of[-1,1]){const v=new THREE.Mesh(new THREE.ConeGeometry(0.05,l*0.9,3),mF);v.scale.z=0.25;v.position.copy(c.position).add(new V3(sd*0.05,0,0));
      v.quaternion.copy(c.quaternion);v.rotateZ(sd*0.35);g.add(v);}p.addScaledVector(d,l);a-=0.32;}
  const eye=new THREE.Group();eye.position.copy(p);g.add(eye);const e1=new THREE.Mesh(new THREE.SphereGeometry(0.16,8,6),mF);e1.scale.set(0.85,0.32,1.5);eye.add(e1);
  const e2=new THREE.Mesh(new THREE.SphereGeometry(0.09,7,5),mG);e2.scale.set(0.9,0.36,1.3);e2.position.y=0.03;eye.add(e2);const e3=new THREE.Mesh(new THREE.SphereGeometry(0.045,6,4),mD);e3.scale.set(1,0.4,1.2);e3.position.y=0.06;eye.add(e3);
  g.traverse(c=>{c.userData.noBatch=true;c.castShadow=c.isMesh;});g.userData.mats=[mF,mG];g.userData.eye=eye;return g;}
function makeFirebird31(o){o=o||{};const R=buildFirebird31(),old=o.old!==false,C0=old?FB31.old:FB31.young;
  const mat=(c,e)=>castMat(c,{emissive:e,emissiveIntensity:old?0.04:0.45});const body=mat(C0.body,0xff5a10),gold=mat(C0.gold,0xffa010),flame=mat(C0.flame,0xff2a00);
  const c=castMake(R,{body,gold,flame}),Bn=c.rig;
  // хвост — отдельные меши в группе на теле: 7 перьев; у старой видны три, тусклые и поникшие
  const tg=new THREE.Group();tg.position.set(0,0.86,-0.5);c.body.add(tg);const tail=[];
  const tF=new THREE.MeshLambertMaterial({color:C0.flame,emissive:0xff4010,emissiveIntensity:old?0.05:0.6}),tG=new THREE.MeshLambertMaterial({color:C0.gold,emissive:0xffa000,emissiveIntensity:old?0.05:0.5}),tD=new THREE.MeshLambertMaterial({color:0x2a3a8a,emissive:0x1a2a8a,emissiveIntensity:0.3});
  for(let i=0;i<7;i++){const u=(i-3)/3,f=plume31(1.55-Math.abs(u)*0.35,[tF,tG,tD]);f.userData.u=u;f.userData.spare=Math.abs(i-3)>1;tg.add(f);tail.push(f);}
  // очки на клюве у старой
  const gl=new THREE.Group();{const gm=new THREE.MeshLambertMaterial({color:0xd8b060,emissive:0x604010,emissiveIntensity:0.3}),lens=new THREE.MeshBasicMaterial({color:0xe8f4ff,transparent:true,opacity:0.28,depthWrite:false});
    for(const s of[-1,1]){const r=new THREE.Mesh(new THREE.TorusGeometry(0.09,0.013,4,14),gm);r.position.set(s*0.13,0.05,0.3);gl.add(r);const ln=new THREE.Mesh(new THREE.CircleGeometry(0.085,12),lens);ln.position.set(s*0.13,0.05,0.305);gl.add(ln);}
    const br=new THREE.Mesh(new THREE.CylinderGeometry(0.01,0.01,0.08,4),gm);br.rotation.z=Math.PI/2;br.position.set(0,0.07,0.31);gl.add(br);gl.traverse(q=>{q.userData.noBatch=true;});}
  Bn.head.add(gl);gl.visible=old;
  const glow=new THREE.PointLight(0xffa040,C0.glow,7,2);glow.position.y=1;c.g.add(glow);
  const cA=new THREE.Color(),cB=new THREE.Color();const lc=(m,a,b,k)=>{m.color.copy(cA.setHex(a)).lerp(cB.setHex(b),k);};
  const F=Object.assign(c,{head:Bn.head,crest:Bn.crest,neck:Bn.neck1,beakLo:Bn.beakLo,ruff:Bn.ruff,tailG:tg,tail,glasses:gl,wings:[{wp:Bn.wR,s:-1},{wp:Bn.wL,s:1}],gold,red:flame,bodyM:body,glow,age:old?0:1,
    // молодеет: k = 0 — старая, 1 — молодая
    bloom(k){k=clamp(k,0,1);F.age=k;const O=FB31.old,Y=FB31.young;lc(body,O.body,Y.body,k);lc(gold,O.gold,Y.gold,k);lc(flame,O.flame,Y.flame,k);lc(tF,O.flame,Y.flame,k);lc(tG,O.gold,Y.gold,k);
      body.emissiveIntensity=0.04+0.3*k;gold.emissiveIntensity=0.04+0.45*k;flame.emissiveIntensity=0.04+0.6*k;tF.emissiveIntensity=0.05+0.75*k;tG.emissiveIntensity=0.05+0.55*k;glow.intensity=O.glow+(Y.glow-O.glow)*k;
      Bn.ruff.scale.setScalar(Math.max(0.001,1-k));F.pose();}});
  // поза хвоста и хохолка по возрасту (каждый кадр — поверх анимации уровня не спорит: уровень хвост только прячет и показывает)
  F.pose=()=>{const k=F.age,t=G.time||0;Bn.crest.rotation.x=lerp(-1.0,-0.1,k)+Math.sin(t*1.7)*0.04*k;
    tail.forEach((f,i)=>{const u=f.userData.u;f.rotation.set(lerp(-0.45,0.28,k)+Math.sin(t*1.3+i)*0.03,u*lerp(0.18,0.75,k),-u*lerp(0.05,0.3,k));const s=lerp(0.82,1.08,k);f.scale.setScalar(s);
      if(f.userData.spare)f.userData.hideOld=k<0.35;});};
  F.tailShow=(on)=>{tail.forEach(f=>{f.visible=on&&!(f.userData.spare&&f.userData.hideOld);});};
  F.bloom(old?0:1);F.tailShow(true);
  return regNpc(castReg(F,{hs:1.2,tick:(o,dt,talk)=>{if(o.beakLo){const tgt=talk*0.32*Math.abs(Math.sin(G.time*14));o.beakLo.rotation.x+=(tgt-o.beakLo.rotation.x)*Math.min(1,dt*20);}F.pose();}}),'zhar');}
// гнездо-чаша: обод ниже груди птицы, прутья по кругу, пух внутри
function nest31(x,y,z,r){const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);const nm=c=>{const m=M(c).clone();m.userData.noOcc=true;return m;},tw=nm(0x8a6a40),tw2=nm(0x6a4a2a),tw3=nm(0xa07a48),down=nm(0xf4ecd8);   // без «просвечивания» (FIN.occ): гнездо низкое, героев не загораживает
  const bowl=new THREE.LatheGeometry([[0.01,0],[r*0.7,0.02],[r*0.92,0.14],[r,0.3],[r*0.94,0.42],[r*0.8,0.4],[r*0.66,0.26],[r*0.4,0.17],[0.01,0.15]].map(p=>new THREE.Vector2(p[0],p[1])),14);
  addMesh(bowl,tw2,0,0,0,g);const up=new V3(0,1,0);
  for(let i=0;i<46;i++){const a=i/46*Math.PI*2+rand(-0.06,0.06),rr=r*rand(0.8,1.0),h=rand(0.18,0.42),L=rand(0.55,0.95);
    const m=addMesh(new THREE.CylinderGeometry(0.03,0.04,L,4),i%3===0?tw:i%3===1?tw3:tw2,Math.cos(a)*rr,h,Math.sin(a)*rr,g);m.quaternion.setFromUnitVectors(up,new V3(-Math.sin(a),rand(-0.25,0.25),Math.cos(a)).normalize());}
  for(let i=0;i<9;i++){const a=i/9*Math.PI*2+rand(-0.3,0.3),rr=r*rand(0.86,1.06);const m=addMesh(new THREE.CylinderGeometry(0.02,0.03,rand(0.35,0.6),4),tw,Math.cos(a)*rr,rand(0.3,0.44),Math.sin(a)*rr,g);
    m.quaternion.setFromUnitVectors(up,new V3(Math.cos(a)*0.8,rand(0.4,0.9),Math.sin(a)*0.8).normalize());}   // торчащие прутики
  for(let i=0;i<7;i++){const a=i/7*Math.PI*2,m=addMesh(new THREE.SphereGeometry(0.2,7,5),down,Math.cos(a)*r*0.5,0.24,Math.sin(a)*r*0.5,g);m.scale.set(1,0.45,1);}
  g.traverse(c=>{c.userData.noBatch=true;});return g;}
