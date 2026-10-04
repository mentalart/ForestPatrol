/* ============================== РЕЛИЗ final06 · 2-Б «ВОДЯНОЙ»: ДЕДУШКА ВОДЯНОЙ, СОМ И ВОДЯНЫЕ КОНИ — МОДЕЛИ И МИМИКА ============================== */
// По фольклору: дедушка Водяной — лягушачье лицо, зелёная борода до пояса, пузо, корона из кувшинок; ездит на соме.
// Собраны китом (цвет в вершинах, фаски, шум); подвижные части — отдельные группы: челюсть, щёки, глаза и веки, брови, уголки рта,
// руки, ноги, борода и усы, цветы короны (облетают по одному). Мимика — эмоции (злость → обида → усталость → сон, радость, удивление)
// и позы (замах, свист, дирижёр, верхом, оглушён, «рыба на суше», рык, зевок, сон). Всё детерминировано: отражения этапа 3 — точные копии.
// FIN.k2v: boss(x,z,o) — Водяной-враг (makeFoe('vodyanoy') с новым обликом); rig(parent,o) — облик без логики; anim(R,dt);
// som() — сом-перевозчик (8 м, усы-цепочки); horse() — водяной конь из волны (белая грива-пена).
const K2V={};FIN.k2v=K2V;
const K2C={skin:hp(0x62924a),back:hp(0x46703a),belly:hp(0xd0d293),wart:hp(0x3a642e),tina:hp(0x3f7a3a),tinaD:hp(0x2c5626),tinaL:hp(0x77aa52),
  brow:hp(0xe4ecd0),mouth:hp(0x4a1418),tongue:hp(0xd8707a),pad:hp(0x4f8a3a),padD:hp(0x376626),pet:hp(0xfaf4f0),petP:hp(0xf4b0c4),gold:hp(0xffd34a),nail:hp(0xe0d6a4),
  somT:hp(0x4c4a30),somS:hp(0x6e6a46),somB:hp(0xd4cba2),somD:hp(0x2e2c1e),somW:hp(0x262418),somE:hp(0xe8cf58)};
const k2h=(i,s)=>{const x=Math.sin(i*127.1+(s||0)*311.7)*43758.5453;return x-Math.floor(x);};   // детерминированный «случай»: копии одинаковы
const k2hr=(i,s,a,b)=>a+(b-a)*k2h(i,s);
function k2Dyn(o){o.traverse(c=>{c.userData.noBatch=true;c.userData.noBatchL=true;});return o;}
K2V.dyn=k2Dyn;
function k2G(parent,x,y,z){const g=new THREE.Group();g.position.set(x||0,y||0,z||0);parent.add(g);return g;}
/* ---------- облик Водяного ---------- */
function k2vRig(parent,o){o=o||{};const C=K2C,R={g:k2G(parent),flowers:[],brow:[],lid:[],lidLo:[],eye:[],pu:[],ir:[],cheek:[],corn:[],arm:[],el:[],hand:[],leg:[],beard:[],must:[],
    P:{},cur:null,st:{pose:'idle',emo:'neutral',k:0,t:k2h(o.seed||1,3)*6,talk:0,blink:2,bt:-1,look:[0,0]}};
  const eyeMat=o.eyeMat||M(0xfff3a0,{emissive:0xfff3a0,emissiveIntensity:1});R.eyeMat=eyeMat;
  // ноги: короткие, толстые, перепончатые ступни
  for(const s of[-1,1]){const L=k2G(R.g,s*0.66,0.95,0.05);fk(L,K=>{K.add(KP.cyl(0.4,0.46,0.95,8),C.skin,tm(0,-0.38,0),{noise:0.02});
      K.add(hSph(0.52,9,6),C.skin,tm(0,-0.82,0.34,0,0,0,1,0.34,1.35),{s:-0.05});for(let k=0;k<3;k++)K.add(KP.cone(0.12,0.46,4),C.skin,tm((k-1)*0.24,-0.86,0.86,Math.PI/2,0,(k-1)*0.2),{s:0.08});
      for(let k=0;k<3;k++)K.add(hSph(0.07,5,4),C.nail,tm((k-1)*0.27,-0.86,1.1),{kN:0.2});});R.leg.push(L);}
  // туловище: пузо грушей, светлое брюхо, бородавки и тина на спине
  const B=R.body=k2G(R.g,0,0.8,0);
  fk(B,K=>{K.add(KP.lathe([[0,0],[0.92,0.04],[1.3,0.42],[1.38,0.95],[1.26,1.45],[1.04,1.86],[0.86,2.06],[0,2.12]],12),C.skin,tm(0,0,0,0,0,0,1,1,0.94),{noise:0.04,kG:0.2});
    K.add(hSph(1.02,11,8),C.belly,tm(0,0.86,0.56,0,0,0,1.06,1.02,0.76),{s:0.12,noise:0.015,kN:0.25});
    for(let i=0;i<5;i++)K.add(KP.tor(0.62-i*0.04,0.025,3,14,Math.PI),C.belly,tm(0,0.42+i*0.3,1.12-Math.abs(i-2)*0.06,0,0,0,1.2,1,0.7),{s:-0.35,kN:0});   // складки брюха
    for(let i=0;i<22;i++){const a=k2hr(i,1,0.9,5.4),y=k2hr(i,2,0.3,1.9),r=1.18+Math.sin(y)*0.12;K.add(KP.ico(k2hr(i,3,0.07,0.14)),C.wart,tm(Math.sin(a)*r,y,Math.cos(a)*r*0.92),{kN:0.2});}
    for(let i=0;i<14;i++){const a=Math.PI+(i-6.5)*0.2,y=k2hr(i,4,1.5,1.95);K.add(KP.cone(0.08,k2hr(i,5,0.7,1.2),3),i%3?C.tina:C.tinaD,tm(Math.sin(a)*1.1,y-0.4,Math.cos(a)*0.98,Math.cos(a)*0.25,0,-Math.sin(a)*0.25+Math.PI),{kN:0.1});}});
  // голова: широкая лягушачья, глаза на макушке; челюсть, щёки, ноздри
  const H=R.head=k2G(B,0,2.0,0.1);
  fk(H,K=>{K.add(hSph(1,12,9),C.skin,tm(0,0.42,0.12,0,0,0,1.28,0.74,1.02),{noise:0.025});K.add(hSph(1,11,7),C.skin,tm(0,0.26,0.5,0,0,0,1.18,0.44,0.94),{s:0.05});
    K.add(hSph(0.95,10,7),C.back,tm(0,0.6,-0.25,0,0,0,1.15,0.62,0.86),{s:0.05});   // тёмная спинка головы
    for(const s of[-1,1]){K.add(hSph(0.42,9,6),C.skin,tm(s*0.52,0.98,0.34),{noise:0.01});K.add(hSph(0.065,5,4),hp(0x1c3418),tm(s*0.17,0.55,1.34),{kN:0});}   // глазные бугры, ноздри
    K.add(hSph(0.9,10,7),C.mouth,tm(0,0.12,0.42,0,0,0,1.12,0.36,0.98),{kN:0,s:-0.2});   // рот изнутри
    for(let i=0;i<9;i++)K.add(KP.ico(k2hr(i,6,0.06,0.11)),C.wart,tm(k2hr(i,7,-0.9,0.9),k2hr(i,8,0.7,0.95),k2hr(i,9,-0.4,0.1)),{kN:0.2});});
  const J=R.jaw=k2G(H,0,0.14,-0.12);
  fk(J,K=>{K.add(hSph(1,11,7),C.skin,tm(0,-0.08,0.62,0,0,0,1.16,0.4,0.92),{noise:0.015});K.add(hSph(1,10,6),C.belly,tm(0,-0.17,0.66,0,0,0,1.0,0.3,0.82),{s:0.15,kN:0.2});
    K.add(hSph(0.6,9,6),C.tongue,tm(0,0.04,0.62,0,0,0,1.1,0.24,1),{kN:0.1});});
  fk(H,K=>{K.add(KP.tor(1.0,0.045,4,22,Math.PI*0.86),hp(0x24401c),tm(0,0.13,0.42,Math.PI/2,0,Math.PI*0.07,1.12,0.98,1),{kN:0});});   // шов рта
  for(const s of[-1,1]){const ch=k2G(H,s*0.98,0.22,0.36);fk(ch,K=>K.add(hSph(0.36,9,6),C.skin,tm(0,0,0,0,0,0,0.9,0.85,1),{s:0.1}));R.cheek.push(ch);
    const cr=k2G(H,s*1.12,0.13,0.5);fk(cr,K=>K.add(KP.cyl(0.035,0.035,0.34,5),C.mouth,tm(s*0.1,0,0,0,0,Math.PI/2),{kN:0}));R.corn.push(cr);}
  // глаза: белок, радужка (цвет знака удара), зрачок-щёлка, блик; верхнее и нижнее веко; брови-пучки
  for(const s of[-1,1]){const g=k2G(H,s*0.52,1.04,0.42);const sc=new THREE.Mesh(FE_SCL,new THREE.MeshLambertMaterial({color:0xfbf8ee}));sc.scale.setScalar(0.34);g.add(sc);
    const ir=new THREE.Mesh(FE_SCL,eyeMat);ir.scale.set(0.2,0.2,0.1);ir.position.z=0.27;g.add(ir);const pu=new THREE.Mesh(FE_SCL,MAT.dark);pu.scale.set(0.12,0.055,0.05);pu.position.z=0.34;g.add(pu);
    const hl=new THREE.Mesh(FE_HL,MB(0xffffff));hl.scale.setScalar(0.05);hl.position.set(0.08,0.1,0.33);g.add(hl);
    const lm=new THREE.MeshLambertMaterial({color:C.skin[1]});const lu=k2G(g);const l1=new THREE.Mesh(FE_LID,lm);l1.scale.set(0.37,0.38,0.37);lu.add(l1);lu.rotation.x=-2.2;
    const ll=k2G(g);const l2=new THREE.Mesh(FE_LID,lm);l2.scale.set(0.36,0.37,0.36);ll.add(l2);ll.rotation.x=Math.PI+0.9;
    const bw=k2G(H,s*0.52,1.4,0.55);fk(bw,K=>{for(let k=0;k<7;k++){const u=(k-3)/3;K.add(hSph(0.13,6,4),C.brow,tm(u*0.27,0.03-u*u*0.07+k2hr(k,11,-0.02,0.02),k2hr(k,12,-0.03,0.03),0,0,0,1.25,0.8,0.9),{kN:0.3,noise:0.01});}
      for(let k=0;k<5;k++){const u=(k-2)/2;K.add(KP.cone(0.06,0.3,3),C.brow,tm(u*0.26+s*0.08,0.06-u*u*0.05,0.04,0.3,0,-s*(0.9+u*0.25)),{kN:0.3});}});
    R.eye.push(g);R.ir.push(ir);R.pu.push(pu);R.lid.push(lu);R.lidLo.push(ll);R.brow.push(bw);}
  // усы: тина свисает с губы, по три звена
  for(const s of[-1,1]){let p=k2G(H,s*0.62,0.18,1.0);const ch=[];for(let i=0;i<3;i++){const q=k2G(p,0,i?-0.4:0,0);fk(q,K=>K.add(KP.cone(0.11-i*0.025,0.48,4),i%2?C.tinaD:C.tina,tm(0,-0.2,0,Math.PI,0,0),{kN:0.1}));ch.push(q);p=q;}
    ch[0].rotation.z=s*0.9;R.must.push(ch);}
  // борода до пояса: на челюсти, четыре звена — покачивается
  {let p=k2G(J,0,-0.32,1.1);const BW=[1.35,1.05,0.7,0.34],BN=[9,7,5,3];for(let i=0;i<4;i++){const q=k2G(p,0,i?-0.62:0,0),w=BW[i];fk(q,K=>{for(let k=0;k<BN[i];k++){const u=BN[i]>1?(k-(BN[i]-1)/2)/((BN[i]-1)/2):0;
      K.add(KP.cone(0.2-i*0.03,0.86,5),k%3===0?C.tinaD:k%3===1?C.tina:C.tinaL,tm(u*w*0.5,-0.32,-Math.abs(u)*0.1+k2hr(k+i*9,13,-0.04,0.04),Math.PI+k2hr(k+i*9,14,-0.08,0.08),0,-u*0.28),{kN:0.1,noise:0.015});}});
    R.beard.push(q);p=q;}}
  // руки: плечо, локоть, кисть — три пальца с перепонкой
  for(const s of[-1,1]){const sh=k2G(B,s*1.2,1.72,0.05);fk(sh,K=>{K.add(hSph(0.42,8,6),C.skin,tm(0,0,0));K.add(KP.cyl(0.3,0.26,1.0,7),C.skin,tm(0,-0.5,0),{noise:0.015});
      for(let k=0;k<4;k++)K.add(KP.cone(0.06,0.6,3),C.tina,tm(s*0.2,-0.3-k*0.15,-0.18,Math.PI,0,-s*0.2),{kN:0.1});});
    const el=k2G(sh,0,-0.98,0);fk(el,K=>{K.add(hSph(0.28,7,5),C.skin,tm(0,0,0));K.add(KP.cyl(0.26,0.22,0.9,7),C.skin,tm(0,-0.45,0),{noise:0.015});});
    const hd=k2G(el,0,-0.95,0);fk(hd,K=>{K.add(hSph(0.3,8,6),C.skin,tm(0,-0.12,0.04,0,0,0,1.05,0.7,1.1));
      for(let k=0;k<3;k++){const a=(k-1)*0.42;K.add(KP.cone(0.08,0.52,4),C.skin,tm(Math.sin(a)*0.22,-0.42,0.1+Math.cos(a)*0.06,0,0,a),{s:0.05});K.add(hSph(0.07,5,4),C.nail,tm(Math.sin(a)*0.4,-0.68,0.12),{kN:0.2});}
      K.add(KP.tri([-0.24,-0.55,0.08],[0,-0.3,0.12],[0.24,-0.55,0.08]),C.belly,null,{s:-0.1,kN:0});K.add(KP.tri([0.24,-0.55,0.08],[0,-0.3,0.12],[-0.24,-0.55,0.08]),C.belly,null,{s:-0.1,kN:0});
      K.add(KP.cone(0.08,0.4,4),C.skin,tm(-s*0.3,-0.2,0.15,0,0,s*0.9));});
    R.arm.push(sh);R.el.push(el);R.hand.push(hd);}
  // корона из кувшинок: шесть листьев-блинов и шесть цветков (облетают по одному)
  const CR=R.crown=k2G(H,0,1.16,-0.28);
  fk(CR,K=>{for(let i=0;i<6;i++){const a=i/6*Math.PI*2+0.26;K.add(new FIN.orig.Cylinder(0.46,0.46,0.06,14,1,false,0.4,Math.PI*2-0.4),i%2?C.pad:C.padD,tm(Math.sin(a)*0.62,0.04,Math.cos(a)*0.62,0,a+Math.PI,0.0).multiply(tm(0,0,0,0.55,0,0)),{kN:0.5});}
    K.add(KP.cyl(0.62,0.7,0.24,12),C.padD,tm(0,-0.04,0),{s:-0.1});});
  for(let i=0;i<6;i++){const a=i/6*Math.PI*2,c=i===5;const fl=k2G(CR,c?0:Math.sin(a)*0.5,c?0.28:0.2,c?0:Math.cos(a)*0.5);const sz=c?1.25:0.9;
    fk(fl,K=>{for(let k=0;k<8;k++){const b=k/8*Math.PI*2;K.add(hSph(0.2*sz,6,4),C.pet,tm(Math.sin(b)*0.16*sz,0.12*sz,Math.cos(b)*0.16*sz,0,b,0).multiply(tm(0,0,0,0.95,0,0,0.42,1,0.16)),{kN:0.45});}
      for(let k=0;k<6;k++){const b=k/6*Math.PI*2+0.3;K.add(hSph(0.15*sz,6,4),C.petP,tm(Math.sin(b)*0.08*sz,0.16*sz,Math.cos(b)*0.08*sz,0,b,0).multiply(tm(0,0,0,0.45,0,0,0.42,1,0.16)),{kN:0.45});}
      K.add(hSph(0.08*sz,6,4),C.gold,tm(0,0.2*sz,0),{kN:0.5});});fl.userData.k2a=a;R.flowers.push(fl);}
  k2Dyn(R.g);R.top=4.7;R.eyeY=3.7;
  R.cur={jaw:0.05,puff:0,brow:0,browH:0,lid:0.12,lidLo:0,corner:0,hx:0,hy:0,hz:0,lean:0,bob:0,aL:[-0.1,-0.35,-0.8],aR:[-0.1,0.35,-0.8],legs:0,beard:1};
  return R;}
K2V.rig=k2vRig;
/* ---------- мимика и позы ---------- */
const K2EMO={neutral:{brow:0,browH:0,lid:0.12,corner:0.1},angry:{brow:-1,browH:-0.25,lid:0.38,corner:-0.7},hurt:{brow:0.95,browH:0.25,lid:0.22,corner:-1},
  tired:{brow:0.45,browH:-0.1,lid:0.62,corner:-0.35},sleep:{brow:0.3,browH:-0.1,lid:1,corner:0.2},happy:{brow:0.3,browH:0.12,lid:0.4,corner:1},surprise:{brow:0.55,browH:0.55,lid:0,corner:0}};
K2V.say=(R,dur)=>{R.st.talk=Math.max(R.st.talk,dur||1.2);};
K2V.set=(R,pose,emo)=>{if(pose&&R.st.pose!==pose){R.st.pose=pose;R.st.k=0;}if(emo)R.st.emo=emo;};
function k2vAnim(R,dt){const S=R.st,c=R.cur,E=K2EMO[S.emo]||K2EMO.neutral;S.t+=dt;S.k+=dt;S.talk=Math.max(0,S.talk-dt);const t=S.t,P=S.pose;
  const T={jaw:0.06,puff:0,brow:E.brow,browH:E.browH,lid:E.lid,lidLo:0,corner:E.corner,hx:Math.sin(t*0.9)*0.04,hy:Math.sin(t*0.5)*0.08,hz:Math.sin(t*0.7)*0.04,lean:0,bob:Math.sin(t*1.6)*0.03,
    aL:[-0.1,-0.35,-0.8],aR:[-0.1,0.35,-0.8],legs:0,beard:1};
  if(S.emo==='angry')T.hx=0.12;if(S.emo==='hurt'){T.hx=0.18;T.jaw=0.12;}if(S.emo==='tired'){T.hx=0.22;T.jaw=0.2;}
  if(P==='throw'){const k=Math.min(1,S.k/0.9),rel=k>=1;T.aR=rel?[-1.4,-0.3,-0.2]:[-2.7*Math.min(1,S.k*2),-0.35,-1.0];T.lean=rel?0.2:-0.18;T.puff=rel?0:0.5;T.jaw=rel?0.5:0.1;T.hx=rel?0.15:-0.12;}
  else if(P==='whistle'){T.puff=1;T.jaw=0.02;T.aL=[-2.8,-0.4,-0.2];T.aR=[-2.8,0.4,-0.2];T.hx=-0.2;T.corner=-0.2;T.lean=-0.1;}
  else if(P==='conduct'){const w=Math.sin(t*4.2);T.aL=[-1.5+w*0.6,-0.5,-0.6-w*0.4];T.aR=[-1.5-w*0.6,0.5,-0.6+w*0.4];T.hz=Math.sin(t*2.1)*0.12;T.hx=Math.sin(t*4.2)*0.08;T.bob=Math.abs(Math.sin(t*4.2))*0.08;T.jaw=0.18;}
  else if(P==='ride'){T.legs=-1.1;T.aL=[-0.9,0.25,-0.9];T.aR=[-0.9,-0.25,-0.9];T.lean=0.25;T.bob=Math.abs(Math.sin(t*5))*0.08;T.hx=-0.05;}
  else if(P==='dazed'){T.hz=Math.sin(t*5)*0.25;T.hy=Math.cos(t*5)*0.2;T.jaw=0.32+Math.sin(t*3)*0.06;T.aL=[0.1,-1.25,-0.2];T.aR=[0.1,1.25,-0.2];T.lean=0.12;T.lid=0.3;T.brow=0.6;T.browH=0.4;T.corner=-0.4;}
  else if(P==='fish'){T.jaw=0.15+Math.abs(Math.sin(t*7))*0.6;T.lid=0;T.brow=0.6;T.browH=0.5;T.aL=[-0.3,-1.3-Math.sin(t*9)*0.3,-0.2];T.aR=[-0.3,1.3+Math.sin(t*9)*0.3,-0.2];T.lean=-0.5;T.legs=-0.8;T.corner=-0.6;}
  else if(P==='roar'){T.jaw=0.9;T.aL=[-2.2,-1.0,-0.3];T.aR=[-2.2,1.0,-0.3];T.lean=0.18;T.hx=-0.15;T.brow=-1;T.lid=0.3;T.corner=-0.5;T.puff=0.2;}
  else if(P==='yawn'){const k=Math.min(1,S.k/1.4);T.jaw=0.15+0.85*Math.sin(Math.min(1,k)*Math.PI);T.lid=0.95;T.aL=[-2.9*Math.sin(k*Math.PI),-0.5,-0.3];T.aR=[-2.9*Math.sin(k*Math.PI),0.5,-0.3];T.hx=-0.3*Math.sin(k*Math.PI);T.lean=-0.1;}
  else if(P==='sleep'){T.lid=1;T.jaw=0.1+Math.max(0,Math.sin(t*1.4))*0.12;T.hx=0.32;T.hz=0.12;T.lean=-0.2;T.aL=[-0.6,0.15,-1.4];T.aR=[-0.6,-0.15,-1.4];T.bob=Math.sin(t*1.4)*0.06;T.corner=0.3;}
  else if(P==='grab'){T.aL=[-1.3,0.2,-0.4];T.aR=[-1.3,-0.2,-0.4];T.lean=0.3;T.jaw=0.35;}
  if(S.talk>0)T.jaw=Math.max(T.jaw,0.12+Math.abs(Math.sin(t*13))*0.32);
  // моргание
  S.blink-=dt;if(S.blink<=0&&S.bt<0){S.bt=0;S.blink=2+k2h(Math.floor(t),9)*3;}let bl=0;if(S.bt>=0){S.bt+=dt;const u=S.bt/0.18;bl=u<0.5?u*2:Math.max(0,2-u*2);if(u>=1)S.bt=-1;}
  const kk=1-Math.exp(-dt*10),k2=1-Math.exp(-dt*6);
  for(const n of['jaw','puff','brow','browH','lid','lidLo','corner','hx','hy','hz','lean','bob','legs','beard'])c[n]+=(T[n]-c[n])*(n==='jaw'?1-Math.exp(-dt*16):kk);
  for(const a of['aL','aR'])for(let i=0;i<3;i++)c[a][i]+=(T[a][i]-c[a][i])*k2;
  R.jaw.rotation.x=c.jaw*0.62;R.head.rotation.set(c.hx,c.hy,c.hz);R.body.rotation.x=c.lean;R.body.position.y=0.8+c.bob;R.body.scale.set(1,1+Math.sin(t*1.6)*0.015,1);
  R.cheek.forEach(ch=>ch.scale.setScalar(1+c.puff*0.95));R.corn.forEach((q,i)=>{q.rotation.z=(i?1:-1)*c.corner*0.55;});
  const lid=Math.min(1,Math.max(c.lid,bl));R.lid.forEach(l=>{l.rotation.x=-2.2+lid*3.25;});R.lidLo.forEach(l=>{l.rotation.x=Math.PI+0.9-c.lidLo*1.9;});
  R.brow.forEach((b,i)=>{const s=i?1:-1;b.rotation.z=-s*c.brow*0.5;b.position.y=1.4+c.browH*0.18;});
  const lx=S.look[0],ly=S.look[1],dz=S.pose==='dazed'||S.pose==='fish';R.pu.forEach((p,i)=>{const sx=dz?Math.cos(t*8+i)*0.1:lx*0.09,sy=dz?Math.sin(t*8+i)*0.08:ly*0.07;p.position.x=sx;p.position.y=sy;R.ir[i].position.x=sx*0.7;R.ir[i].position.y=sy*0.7;});
  [[R.arm[0],R.el[0],c.aL,-1],[R.arm[1],R.el[1],c.aR,1]].forEach(([a,e,v,s])=>{a.rotation.set(v[0],0,v[1]);e.rotation.x=v[2];});
  R.leg.forEach(l=>{l.rotation.x=c.legs;});
  R.beard.forEach((q,i)=>{q.rotation.z=Math.sin(t*1.3+i*0.7)*0.07*(1+i*0.3);q.rotation.x=(i===0?-0.8:0.3)-c.lean*0.4+Math.sin(t*1.1+i)*0.03-c.jaw*(i===0?0.5:0);});
  R.must.forEach((ch,s)=>ch.forEach((q,i)=>{q.rotation.x=Math.sin(t*1.7+i+s)*0.12;if(i)q.rotation.z=(s?1:-1)*0.18*Math.sin(t*1.2+i);}));
  R.flowers.forEach((f,i)=>{if(!f.visible)return;f.rotation.z=Math.sin(t*1.5+i)*0.05;});}
K2V.anim=k2vAnim;
// цветок короны облетел: возвращает мировую точку — лепестки сыплет уровень
K2V.dropFlower=(R)=>{const f=R.flowers.filter(x=>x.visible);if(!f.length)return null;const q=f[f.length-1];q.visible=false;const p=new V3();q.getWorldPosition(p);return p;};
K2V.flowersLeft=R=>R.flowers.filter(x=>x.visible).length;
K2V.resetFlowers=R=>R.flowers.forEach(f=>{f.visible=true;});
// призрачный материал отражений (Совиный взор): по меню — прозрачная вода
K2V.ghost=(R,on)=>{on=!!on;if(!!R.ghostOn===on)return;if(!R.ghostM){R.ghostM=new THREE.MeshLambertMaterial({color:0x8fe0f0,transparent:true,opacity:0.32,depthWrite:false,emissive:0x2a8aa0,emissiveIntensity:0.6});R.ghostM.userData.noOcc=true;}
  R.g.traverse(c=>{if(!c.isMesh)return;if(on){if(!c.userData.k2m)c.userData.k2m=c.material;c.material=R.ghostM;}else if(c.userData.k2m){c.material=c.userData.k2m;}});R.ghostOn=on;};
/* ---------- Водяной-враг: makeFoe('vodyanoy') + новый облик (старые части прототипа убраны) ---------- */
K2V.boss=(x,z,o)=>{o=o||{};const e=makeFoe('vodyanoy',x,z,{y:o.y||0,leash:30,scale:1});for(const c of e.inner.children.slice())e.inner.remove(c);
  const R=k2vRig(e.inner,{eyeMat:e.eyeMat,seed:1});e.k2=R;e.ff=null;e.shell=null;e.L={top:R.top,head:R.head,eyeY:R.eyeY,eyeZ:0.8,castLook:true,k2:true};
  e.S.sig.visible=false;e.spin.position.y=R.top+0.3;e.br.visible=false;e.noKill=true;e.noMove=true;e.big=true;
  e.setScale=s=>{e.s=s;e.inner.scale.setScalar(s);e.r=FOE.vodyanoy.r*s;e.spin.position.y=(R.top+0.3)*s;e.spin.scale.setScalar(Math.max(1,s*0.8));};e.setScale(o.scale||1);
  const _post=e.post;e.post=(q,dt,k)=>{q.S.sig.visible=false;q.embersM.forEach(m=>{m.m.visible=false;});q.br.visible=false;q.satRim.visible=false;
    q.body.position.set(0,0,0);q.body.rotation.set(0,0,0);q.body.scale.set(1,1,1);k2vAnim(R,dt);if(q.k2post)q.k2post(q,dt);};
  return e;};
/* ---------- сом-перевозчик: голова, три звена тела, хвост; рот, глаза, усы-цепочки (кончик уса — цель рогатки) ---------- */
K2V.som=()=>{const C=K2C,S={g:new THREE.Group(),seg:[],wh:[],tips:[],t:0,amp:1,sp:1,open:0,thrash:0,roll:0,whUp:0};W.group.add(S.g);
  const s0=k2G(S.g);fk(s0,K=>{K.add(hSph(1,12,8),C.somT,tm(0,0.1,0.9,0,0,0,1.2,0.62,1.5),{noise:0.03});K.add(hSph(1,11,7),C.somB,tm(0,-0.18,0.9,0,0,0,1.1,0.42,1.4),{s:0.1,kN:0.2});
    K.add(hSph(1,11,7),C.somS,tm(0,0.02,-0.7,0,0,0,1.05,0.75,1.3),{noise:0.03});K.add(hSph(0.8,10,6),C.somB,tm(0,-0.3,-0.7,0,0,0,1.15,0.45,1.3),{s:0.1,kN:0.2});
    for(let i=0;i<12;i++)K.add(hSph(k2hr(i,21,0.12,0.24),6,4),C.somD,tm(k2hr(i,22,-0.8,0.8),k2hr(i,23,0.5,0.66),k2hr(i,24,-1.4,1.6),0,0,0,1,0.3,1),{kN:0.1});
    for(const s of[-1,1]){K.add(hSph(0.15,7,5),C.somE,tm(s*0.86,0.34,1.55),{kN:0.5});K.add(hSph(0.08,6,4),C.somW,tm(s*0.95,0.36,1.62),{kN:0});
      const fin=KP.cone(0.45,1.1,4);K.add(fin,C.somS,tm(s*1.1,-0.35,-0.2,0.3,0,s*2.2,1,1,0.3),{s:-0.1});}
    K.add(KP.tor(0.95,0.06,3,14,Math.PI),C.somW,tm(0,-0.05,1.55,0,0,Math.PI,1.05,0.5,1),{kN:0});});
  const jaw=S.jaw=k2G(s0,0,-0.12,1.0);fk(jaw,K=>{K.add(hSph(1,10,6),C.somB,tm(0,-0.1,0.7,0,0,0,1.1,0.28,0.95),{s:0.05});K.add(hSph(0.7,8,5),hp(0x6a2228),tm(0,0.02,0.6,0,0,0,1.1,0.12,0.9),{kN:0});
    for(let i=0;i<4;i++){const a=(i-1.5)*0.35;K.add(KP.cone(0.04,0.55,3),C.somW,tm(Math.sin(a)*0.6,-0.25,1.3+Math.cos(a)*0.1,Math.PI*0.85,0,a*0.3),{kN:0});}});   // короткие нижние усики
  // длинные усы: по семь звеньев
  for(const s of[-1,1]){let p=k2G(s0,s*0.95,0.0,1.8);const ch=[];for(let i=0;i<7;i++){const q=k2G(p,0,0,i?0.44:0);fk(q,K=>K.add(KP.cyl(0.06-i*0.006,0.07-i*0.006,0.46,5),C.somW,tm(0,0,0.22,Math.PI/2,0,0),{kN:0.1}));ch.push(q);p=q;}
    const tip=k2G(p,0,0,0.46);S.wh.push(ch);S.tips.push(tip);}
  let par=s0;const segL=[1.65,1.75,1.55];for(let i=0;i<3;i++){const q=k2G(par,0,0,i?-segL[i-1]:-1.55);const r0=0.78-i*0.2,r1=0.6-i*0.2;
    fk(q,K=>{K.add(KP.cyl(r0,r1,segL[i]+0.2,10),C.somS,tm(0,0,-segL[i]/2,Math.PI/2,0,0,1,1,0.9),{noise:0.025});K.add(hSph(1,9,6),C.somT,tm(0,r0*0.42,-segL[i]/2,0,0,0,r0*0.9,r0*0.45,segL[i]*0.55),{s:0});
      K.add(hSph(1,9,6),C.somB,tm(0,-r0*0.5,-segL[i]/2,0,0,0,r0*0.8,r0*0.3,segL[i]*0.5),{s:0.1,kN:0.2});
      for(let k=0;k<5;k++)K.add(hSph(k2hr(k+i*9,31,0.1,0.2),6,4),C.somD,tm(k2hr(k+i*9,32,-r0*0.6,r0*0.6),r0*0.72,-k2hr(k+i*9,33,0.2,segL[i]),0,0,0,1,0.3,1),{kN:0.1});
      if(i===0)K.add(KP.cone(0.5,0.8,3),C.somT,tm(0,r0+0.2,-0.8,0,0,0,0.25,1,1.6),{s:-0.1});
      if(i===2){K.add(KP.cone(0.95,1.7,4),C.somS,tm(0,0,-segL[i]-0.8,Math.PI/2,0,0,0.2,1,1.3),{s:-0.05});K.add(KP.cone(0.4,1.0,4),C.somS,tm(0,-0.35,-0.9,Math.PI*0.75,0,0,0.25,1,1),{s:-0.1});}});
    S.seg.push(q);par=q;}
  S.s0=s0;S.saddle=k2G(s0,0,0.42,-0.55);k2Dyn(S.g);
  S.tick=(dt)=>{S.t+=dt*S.sp;const t=S.t,a=S.amp*(1+S.thrash*2.2),f=S.thrash>0?11:4.2;S.seg.forEach((q,i)=>{q.rotation.y=Math.sin(t*f-i*0.9)*0.16*a*(i+1)/2;q.rotation.x=S.thrash*Math.sin(t*9+i)*0.06;});
    S.s0.rotation.y=Math.sin(t*f+0.6)*0.05*a;S.s0.rotation.z=S.roll+S.thrash*Math.sin(t*13)*0.12;S.jaw.rotation.x=S.open*0.55+Math.max(0,Math.sin(t*2.2))*0.06;
    S.wh.forEach((ch,s)=>ch.forEach((q,i)=>{const sd=s?1:-1;q.rotation.y=sd*(i===0?0.55:0.12)+Math.sin(t*2.4+i*0.8+s)*0.12*(1+S.thrash);q.rotation.x=((i===0?0.25:0.1)*(1-S.whUp)-S.whUp*(i===0?0.2:0.08))+Math.sin(t*1.9+i*0.6)*0.05;}));};
  S.tipPos=(i,out)=>{S.g.updateMatrixWorld(true);return S.tips[i].getWorldPosition(out||new V3());};
  return S;};
/* ---------- водяной конь: перед — конь из волны, зад — пенный гребень; белая грива-пена ---------- */
const K2_HORSE_M=()=>{const m=new THREE.MeshLambertMaterial({color:0x6ccbe2,transparent:true,opacity:0.78,emissive:0x1d6f8c,emissiveIntensity:0.55,depthWrite:true});m.userData.noOcc=true;return m;};
K2V.horse=()=>{const H={g:new THREE.Group(),t:Math.random()*6,legs:[],gallop:1,frozen:0};W.group.add(H.g);const wm=K2_HORSE_M(),fm=new THREE.MeshLambertMaterial({color:0xf4fdff,emissive:0x9adcf0,emissiveIntensity:0.35});
  H.wm=wm;const add=(geo,mat,x,y,z,p)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);(p||H.g).add(m);return m;};
  // туловище и грудь
  const body=H.body=k2G(H.g,0,1.15,0);add(new THREE.SphereGeometry(0.8,12,9),wm,0,0,0.05,body).scale.set(0.78,0.82,1.25);add(new THREE.SphereGeometry(0.6,10,8),wm,0,0.08,0.8,body).scale.set(0.95,1.05,0.9);
  // шея дугой вперёд и голова книзу
  const neck=H.neck=k2G(body,0,0.35,0.95);add(new THREE.CylinderGeometry(0.3,0.5,1.15,10),wm,0,0.45,0.22,neck).rotation.x=0.75;
  const head=H.head=k2G(neck,0,0.9,0.68);add(new THREE.SphereGeometry(0.34,10,8),wm,0,0,0,head).scale.set(0.9,1,1.05);
  add(new THREE.CylinderGeometry(0.2,0.3,0.85,9),wm,0,-0.22,0.38,head).rotation.x=2.0;add(new THREE.SphereGeometry(0.22,9,7),wm,0,-0.38,0.72,head).scale.set(1,0.8,1);
  for(const s of[-1,1]){add(new THREE.ConeGeometry(0.09,0.32,5),wm,s*0.16,0.34,-0.06,head).rotation.z=-s*0.25;
    add(new THREE.SphereGeometry(0.08,7,5),MB(0xffffff),s*0.24,0.06,0.2,head);add(new THREE.SphereGeometry(0.04,6,5),MB(0x0a3a4a),s*0.27,0.07,0.25,head);
    add(new THREE.SphereGeometry(0.04,6,5),MB(0x0a3a4a),s*0.08,-0.42,0.92,head);}
  // грива-пена по шее и чёлка
  H.mane=[];for(let i=0;i<10;i++){const c=add(new THREE.ConeGeometry(0.14,0.62,5),fm,(i%2?1:-1)*0.07,0.2+i*0.1,-0.25-i*0.03,neck);c.rotation.x=-1.9+i*0.06;H.mane.push(c);}
  add(new THREE.ConeGeometry(0.1,0.4,5),fm,0,0.3,0.1,head).rotation.x=0.6;
  // передние ноги вскачь; копыта — пена
  for(const s of[-1,1]){const L=k2G(body,s*0.3,-0.15,0.7);add(new THREE.CylinderGeometry(0.15,0.11,0.6,6),wm,0,-0.3,0,L);const lo=k2G(L,0,-0.6,0);add(new THREE.CylinderGeometry(0.1,0.08,0.55,6),wm,0,-0.27,0,lo);
    add(new THREE.SphereGeometry(0.16,7,5),fm,0,-0.56,0.04,lo).scale.set(1,0.6,1.2);H.legs.push({L,lo,s});}
  // зад — гребень волны: изогнутый вал, пенный завиток, брызги
  const cr=H.crest=k2G(H.g,0,0.55,-0.75);const arc=add(new THREE.TorusGeometry(0.8,0.55,8,16,Math.PI),wm,0,0.35,-0.1,cr);arc.rotation.y=Math.PI/2;
  const curl=add(new THREE.TorusGeometry(0.55,0.17,6,14,Math.PI*1.4),fm,0,1.0,0.1,cr);curl.rotation.y=Math.PI/2;curl.rotation.z=0.9;
  H.foam=[];for(let i=0;i<9;i++){const f=add(new THREE.SphereGeometry(k2hr(i,41,0.16,0.3),7,5),fm,k2hr(i,42,-0.55,0.55),k2hr(i,43,0.1,1.2),k2hr(i,44,-1.2,0.2),cr);H.foam.push(f);}
  k2Dyn(H.g);H.g.traverse(c=>{if(c.isMesh){c.castShadow=false;c.renderOrder=4;}});
  H.tick=(dt)=>{const run=H.frozen>0?0:H.gallop;H.t+=dt*(0.6+run*1.4);const t=H.t*6.5;H.legs.forEach((q,i)=>{const ph=t+i*1.1;q.L.rotation.x=run?-0.6+Math.sin(ph)*0.75:-0.9;q.lo.rotation.x=run?Math.max(0,Math.cos(ph))*1.3:1.2;});
    H.body.rotation.x=run?Math.sin(t)*0.12-0.08:-0.25+Math.sin(H.t*2)*0.03;H.body.position.y=1.15+(run?Math.abs(Math.sin(t))*0.28:0.15+Math.sin(H.t*2)*0.05);H.neck.rotation.x=run?-Math.sin(t+0.6)*0.16:-0.25;H.head.rotation.x=run?Math.sin(t+1.2)*0.14:0.1;
    H.mane.forEach((c,i)=>{c.rotation.z=(i%2?1:-1)*(0.2+0.15*Math.sin(H.t*9+i));});H.foam.forEach((f,i)=>{f.scale.setScalar(0.8+0.3*Math.sin(H.t*7+i*1.7));});H.crest.rotation.x=Math.sin(H.t*3)*0.08;
    wm.emissiveIntensity=H.frozen>0?0.95+0.3*Math.sin(H.t*8):0.55;wm.opacity=H.frozen>0?0.9:0.8;};
  return H;};
// для ботов и разработки: неподвижный кадр (ролик-«смотрелка») на точку
K2V.view=(pos,look,dur,fov)=>play({dur:dur||30,fov:fov||46,shots:[shot(0,pos,look)],says:[],events:[]});
