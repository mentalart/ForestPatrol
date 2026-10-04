/* ============================== РЕЛИЗ final06 · 3-Б «СОЛОВЕЙ-РАЗБОЙНИК»: СОЛОВЕЙ, ДОЧКИ-СОЛОВУШКИ, ЗВЕРИ-ТЕНИ — МОДЕЛИ И МИМИКА ============================== */
// По былине: Соловей «свистит по-соловьиному, кричит по-звериному, шипит по-змеиному». Птица-разбойник: круглая голова с клювом-носом,
// брови-пучки, усы «с присвистом», шапка-мурмолка с пером, кафтан из перьев с кушаком, крылья-рукава с пальцами, посох-свистулька;
// хвост из трёх длинных перьев трёх голосов: белое — соловьиный, фиолетовое — звериный, зелёное — змеиный (на этапе 4 их выбивают по одному).
// Собран китом (цвет в вершинах, фаски, шум). Подвижные части — отдельные группы: клюв (челюсть), щёки, зоб, глаза и веки, брови, усы,
// шапка (сбивают на этапе 3), руки-крылья (перья раскрываются в крыло), ноги, хвост и три пера.
// Мимика — эмоции (дерзость, злость, обида, испуг, грусть, радость, удивление) и позы, которые читаются до удара: трель, вдох, свист, рык,
// шип, перескок, полёт, пике, поперхнулся, ослеп, оглушён, «сдулся», висит на дубу, замах посохом, смех, песня.
// FIN.k3s: boss(x,z,o) — Соловей-враг (makeFoe('solovei') с новым обликом); rig(parent,o); set(R,pose,emo); say(R,dur); anim(R,dt);
// voice(R,i,on) — перо голоса; hat(R,on); daughter(kind) — дочка-соловушка; pillow() — пуховая подушка; beast(kind) — зверь-тень.
const K3S={};FIN.k3s=K3S;
const K3C={fe:hp(0x9a6a3e),feD:hp(0x6a4428),rust:hp(0xb8582a),cream:hp(0xf2dfb4),face:hp(0xe8c89a),beak:hp(0xf0b040),beakD:hp(0xc07820),
  leg:hp(0xe8902a),claw:hp(0x3a2a20),brow:hp(0x4e3420),must:hp(0x5a3a22),hat:hp(0x6a2a4a),fur:hp(0x8a6a4a),plume:hp(0xd8402e),belt:hp(0xc4302a),
  wood:hp(0x8a5a2a),woodD:hp(0x4a2e16),gold:hp(0xffd34a),vw:hp(0xf4f6ff),vp:hp(0x9a6ae0),vg:hp(0x4ac07a),scarf:[hp(0xd84040),hp(0x3a8ad8),hp(0x4ab060)],apron:hp(0xfaf2e0)};
const K3VOX=[0xf4f6ff,0xb08aff,0x5ad88a];K3S.VOX=K3VOX;   // цвета трёх голосов: соловьиный, звериный, змеиный
const k3h=(i,s)=>{const x=Math.sin(i*127.1+(s||0)*311.7)*43758.5453;return x-Math.floor(x);};
const k3hr=(i,s,a,b)=>a+(b-a)*k3h(i,s);
function k3G(parent,x,y,z){const g=new THREE.Group();g.position.set(x||0,y||0,z||0);parent.add(g);return g;}
function k3Dyn(o){o.traverse(c=>{c.userData.noBatch=true;c.userData.noBatchL=true;});return o;}
K3S.dyn=k3Dyn;K3S.G=k3G;
// перо: стержень и опахало; o.eye — «глазок» на конце
function k3Feather(K,pal,len,w,m,o){o=o||{};K.add(KP.cyl(0.018,0.026,len,4),hp(0xf6efd8),tm(0,len/2,0).premultiply(m),{kN:0.2});
  K.add(hSph(1,7,5),pal,tm(0,len*0.58,0,0,0,0,w,len*0.46,w*0.18).premultiply(m),{kN:0.35,s:0.05});
  if(o.eye)K.add(hSph(1,6,4),o.eye,tm(0,len*0.86,0.012,0,0,0,w*0.5,w*0.62,w*0.12).premultiply(m),{kN:0.5,s:0.2});}
/* ---------- облик Соловья ---------- */
function k3sRig(parent,o){o=o||{};const C=K3C,R={g:k3G(parent),brow:[],lid:[],lidLo:[],eye:[],pu:[],ir:[],cheek:[],arm:[],el:[],hand:[],leg:[],must:[],voice:[],prim:[],
    cur:null,st:{pose:'idle',emo:'neutral',k:0,t:k3h(o.seed||1,3)*6,talk:0,blink:2,bt:-1,look:[0,0],roll:0}};
  const eyeMat=o.eyeMat||M(0xfff3a0,{emissive:0xfff3a0,emissiveIntensity:1});R.eyeMat=eyeMat;
  // ноги: штаны-перья, оранжевая цевка, три пальца вперёд и один назад с когтями
  for(const s of[-1,1]){const L=k3G(R.g,s*0.38,0.86,0.04);fk(L,K=>{K.add(hSph(0.3,8,6),C.fe,tm(0,0,0,0,0,0,1,1.15,1),{noise:0.02});
      for(let k=0;k<5;k++){const a=k/5*Math.PI*2;K.add(KP.cone(0.08,0.32,3),k%2?C.feD:C.fe,tm(Math.cos(a)*0.22,-0.22,Math.sin(a)*0.22,Math.PI,0,0),{kN:0.1});}
      K.add(KP.cyl(0.07,0.06,0.6,6),C.leg,tm(0,-0.55,0),{s:0.05});
      for(let k=0;k<3;k++){const a=(k-1)*0.5;K.add(KP.cyl(0.05,0.035,0.34,5),C.leg,tm(Math.sin(a)*0.15,-0.84,0.1+Math.cos(a)*0.12,Math.PI/2-0.1,0,-a),{s:0.05});
        K.add(KP.cone(0.035,0.12,4),C.claw,tm(Math.sin(a)*0.3,-0.86,0.26+Math.cos(a)*0.1,Math.PI/2,0,-a),{kN:0.1});}
      K.add(KP.cyl(0.045,0.03,0.24,5),C.leg,tm(0,-0.84,-0.12,-Math.PI/2+0.2,0,0),{s:0.05});});R.leg.push(L);}
  // туловище: груша в перьевом кафтане, светлое пёстрое брюхо, кушак с кистями, пушистый ворот
  const B=R.body=k3G(R.g,0,0.8,0);
  fk(B,K=>{K.add(KP.lathe([[0,0],[0.7,0.05],[0.95,0.38],[1.02,0.82],[0.92,1.24],[0.64,1.52],[0,1.6]],12),C.fe,tm(0,0,0,0,0,0,1,1,0.92),{noise:0.03,kG:0.2});
    K.add(hSph(1,11,8),C.cream,tm(0,0.78,0.42,0,0,0,0.74,0.78,0.56),{s:0.12,noise:0.012,kN:0.25});
    for(let r=0;r<3;r++)for(let i=0;i<14;i++){const a=i/14*Math.PI*2+r*0.22,y=0.1+r*0.16,rr=0.98-r*0.02;
      K.add(KP.cone(0.17,0.5,3),(i+r)%3?C.fe:C.feD,tm(Math.sin(a)*rr,y,Math.cos(a)*rr*0.92,0,a,0).multiply(tm(0,0,0,Math.PI-0.35,0,0,1,1,0.35)),{kN:0.15,s:-r*0.04});}   // подол из перьев
    K.add(KP.tor(0.99,0.07,4,22),C.belt,tm(0,0.6,0,Math.PI/2,0,0,1,0.92,1),{kN:0.3});   // кушак
    for(const s of[-1,1]){K.add(KP.cyl(0.03,0.03,0.36,4),C.belt,tm(s*0.2,0.42,0.92,0.15),{kN:0.2});K.add(KP.cone(0.08,0.22,6),C.gold,tm(s*0.2,0.2,0.94,Math.PI),{kN:0.3});}
    for(let i=0;i<16;i++){const a=i/16*Math.PI*2;K.add(KP.cone(0.13,0.36,3),i%2?C.cream:C.fe,tm(Math.sin(a)*0.6,1.46,Math.cos(a)*0.56,0,a,0).multiply(tm(0,0,0,Math.PI/2+0.5,0,0,1,1,0.4)),{kN:0.3});}});   // ворот
  // пёстрые пятна на груди — свой материал: в свете пера горят (этап 2: «пёстрый»)
  const chestM=new THREE.MeshLambertMaterial({vertexColors:true,emissive:0x000000});R.chestM=chestM;
  R.chest=fk(B,K=>{const cols=[hp(0xe8503a),hp(0x3aa0e8),hp(0xf2c838),hp(0x4ab05a)];for(let i=0;i<14;i++){const a=k3hr(i,31,-0.9,0.9),y=k3hr(i,32,0.35,1.15);
      K.add(hSph(k3hr(i,33,0.06,0.1),6,4),cols[i%4],tm(Math.sin(a)*0.72,y,0.55+Math.cos(a)*0.4,0,0,0,1,1,0.4),{kN:0.3});}},{mat:chestM});
  // хвост: веер мелких перьев и три длинных пера голосов
  const TL=R.tail=k3G(B,0,0.42,-0.78);
  fk(TL,K=>{for(let i=0;i<7;i++){const a=(i-3)*0.26;k3Feather(K,i%2?C.feD:C.fe,0.95,0.2,tm(0,0,0,-1.25,0,a));}});
  for(let i=0;i<3;i++){const v=k3G(TL,0,0,0);v.rotation.set(-0.95,0,(i-1)*0.42);fk(v,K=>k3Feather(K,[C.vw,C.vp,C.vg][i],2.1,0.3,tm(),{eye:i===0?hp(0xc8d8ff):i===1?hp(0x5a2aa0):hp(0x1a7a3a)}));
    const gl=new THREE.Mesh(KP.sph(1,8,6),new THREE.MeshBasicMaterial({color:K3VOX[i],transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}));gl.scale.set(0.38,1.1,0.2);gl.position.y=1.2;v.add(gl);v.userData.glow=gl;
    R.voice.push(v);}
  // руки-крылья: плечо, предплечье с маховыми перьями, кисть с тремя пальцами; в правой — посох-свистулька
  for(const s of[-1,1]){const sh=k3G(B,s*0.92,1.3,0);fk(sh,K=>{K.add(hSph(0.34,8,6),C.fe,tm(0,0,0),{noise:0.015});K.add(KP.cyl(0.25,0.21,0.76,7),C.fe,tm(0,-0.38,0),{noise:0.015});
      for(let k=0;k<4;k++)K.add(KP.cone(0.1,0.42,3),k%2?C.feD:C.fe,tm(s*0.08,-0.2-k*0.15,-0.16,Math.PI+0.3,0,-s*0.15),{kN:0.1});});
    const el=k3G(sh,0,-0.76,0);fk(el,K=>{K.add(hSph(0.22,7,5),C.fe,tm(0,0,0));K.add(KP.cyl(0.21,0.17,0.66,7),C.feD,tm(0,-0.33,0),{noise:0.015});
      K.add(KP.tor(0.18,0.045,3,10),C.rust,tm(0,-0.6,0,Math.PI/2,0,0),{kN:0.3});});
    // маховые перья: на предплечье, раскрываются веером (R.prim)
    const pr=k3G(el,0,-0.2,-0.12);for(let k=0;k<6;k++){const f=k3G(pr,0,-k*0.08,0);fk(f,K=>k3Feather(K,k%2?C.feD:C.fe,1.05-k*0.06,0.17,tm(0,0,0,Math.PI,0,0)));f.userData.k=k;R.prim.push({f,s,k});}
    const hd=k3G(el,0,-0.68,0);fk(hd,K=>{K.add(hSph(0.19,7,5),C.face,tm(0,-0.08,0.03,0,0,0,1,0.85,1.1));
      for(let k=0;k<3;k++){const a=(k-1)*0.4;K.add(KP.cone(0.06,0.3,4),C.face,tm(Math.sin(a)*0.13,-0.28,0.05+Math.cos(a)*0.04,0,0,a),{s:0.05});K.add(KP.cone(0.035,0.1,4),C.claw,tm(Math.sin(a)*0.22,-0.44,0.06,0,0,a+Math.PI));}});
    R.arm.push(sh);R.el.push(el);R.hand.push(hd);}
  {const st=R.staff=k3G(R.hand[1],0,-0.18,0.1);fk(st,K=>{K.add(KP.cyl(0.07,0.08,2.3,7),C.wood,tm(0,0.2,0),{noise:0.01});
      for(let k=0;k<5;k++)K.add(hSph(0.035,5,4),C.woodD,tm(0,0.45+k*0.2,0.07),{kN:0});
      K.add(KP.cone(0.18,0.34,8),C.wood,tm(0,1.48,0),{s:0.1});K.add(KP.tor(0.1,0.025,3,9),C.gold,tm(0,1.22,0,Math.PI/2,0,0),{s:0.3});K.add(KP.tor(0.09,0.025,3,9),C.gold,tm(0,-0.7,0,Math.PI/2,0,0),{s:0.3});
      K.add(KP.cyl(0.03,0.03,0.28,4),C.belt,tm(0.08,1.05,0,0,0,0.4),{kN:0.2});});st.rotation.x=-0.25;}
  // голова: круглая, светлая «маска» у глаз, клюв-нос с крючком, нижний клюв (челюсть), щёки, глаза, брови-пучки, усы, шапка с пером
  const H=R.head=k3G(B,0,1.62,0.05);
  fk(H,K=>{K.add(hSph(0.64,12,9),C.fe,tm(0,0.2,0),{noise:0.02});K.add(hSph(1,10,7),C.face,tm(0,0.12,0.36,0,0,0,0.52,0.44,0.3),{s:0.08,noise:0.008});
    for(let i=0;i<5;i++)K.add(KP.cone(0.07,0.32,3),C.feD,tm((i-2)*0.08,0.5,-0.42,-1.1,0,(i-2)*0.15),{kN:0.1});   // хохолок на затылке
    const bk=KP.cone(0.2,0.6,8);bk.rotateX(Math.PI/2);K.add(bk,C.beak,tm(0,0.02,0.82,0.12),{s:0.1});
    const hk=KP.cone(0.07,0.18,5);hk.rotateX(Math.PI);K.add(hk,C.beakD,tm(0,-0.08,1.08),{s:0});
    for(const s of[-1,1])K.add(hSph(0.03,4,3),hp(0x3a2410),tm(s*0.06,0.1,0.96),{kN:0});});   // ноздри
  const J=R.jaw=k3G(H,0,-0.08,0.58);fk(J,K=>{const lb=KP.cone(0.15,0.42,7);lb.rotateX(Math.PI/2);K.add(lb,C.beakD,tm(0,-0.04,0.2),{s:0});K.add(hSph(0.1,6,4),hp(0xd84a5a),tm(0,0.0,0.08,0,0,0,1,0.4,1.4),{kN:0});});
  for(const s of[-1,1]){const ch=k3G(H,s*0.38,-0.06,0.4);fk(ch,K=>K.add(hSph(0.22,9,6),hp(0xf0b8a0),tm(0,0,0,0,0,0,0.9,0.85,0.9),{s:0.1}));R.cheek.push(ch);}
  for(const s of[-1,1]){const g=k3G(H,s*0.23,0.2,0.48);const sc=new THREE.Mesh(FE_SCL,new THREE.MeshLambertMaterial({color:0xfbf8ee}));sc.scale.setScalar(0.17);g.add(sc);
    const ir=new THREE.Mesh(FE_SCL,eyeMat);ir.scale.set(0.11,0.11,0.05);ir.position.z=0.13;g.add(ir);const pu=new THREE.Mesh(FE_SCL,MAT.dark);pu.scale.set(0.065,0.065,0.03);pu.position.z=0.165;g.add(pu);
    const hl=new THREE.Mesh(FE_HL,MB(0xffffff));hl.scale.setScalar(0.025);hl.position.set(0.04,0.05,0.17);g.add(hl);
    const lm=new THREE.MeshLambertMaterial({color:C.face[1]});const lu=k3G(g);const l1=new THREE.Mesh(FE_LID,lm);l1.scale.setScalar(0.185);lu.add(l1);lu.rotation.x=-2.2;
    const ll=k3G(g);const l2=new THREE.Mesh(FE_LID,lm);l2.scale.setScalar(0.18);ll.add(l2);ll.rotation.x=Math.PI+0.9;
    const bw=k3G(H,s*0.25,0.4,0.5);fk(bw,K=>{for(let k=0;k<6;k++){const u=(k-2.5)/2.5;K.add(hSph(0.07,6,4),C.brow,tm(u*0.15,0.02-u*u*0.04,0,0,0,0,1.3,0.8,0.9),{kN:0.3,noise:0.008});}
      for(let k=0;k<4;k++){const u=(k-1.5)/1.5;K.add(KP.cone(0.035,0.2,3),C.brow,tm(u*0.14+s*0.05,0.04,0.02,0.3,0,-s*(0.9+u*0.3)),{kN:0.3});}});
    R.eye.push(g);R.ir.push(ir);R.pu.push(pu);R.lid.push(lu);R.lidLo.push(ll);R.brow.push(bw);}
  // усы «с присвистом»: из-под клюва в стороны, три звена, кончик завит вверх
  for(const s of[-1,1]){let p=k3G(H,s*0.14,-0.14,0.72);const ch=[];for(let i=0;i<3;i++){const q=k3G(p,i?s*0.26:0,0,0);fk(q,K=>K.add(KP.cone(0.07-i*0.017,0.3,5),C.must,tm(s*0.13,0,0,0,0,-s*Math.PI/2),{kN:0.2}));ch.push(q);p=q;}
    ch[0].rotation.z=-s*0.35;ch[1].rotation.z=-s*0.25;ch[2].rotation.z=s*0.7;R.must.push(ch);}
  // шапка-мурмолка: меховой околыш, бархатный верх, перо (сбивают на этапе 3)
  const HT=R.hat=k3G(H,0,0.68,-0.04);
  fk(HT,K=>{K.add(KP.cyl(0.42,0.5,0.56,10),C.hat,tm(0,0.2,0,-0.12),{noise:0.01});K.add(KP.tor(0.52,0.13,5,14),C.fur,tm(0,0,0,Math.PI/2-0.12,0,0),{noise:0.02,kN:0.3});
    K.add(hSph(0.12,6,5),C.gold,tm(0,0.52,-0.05),{s:0.2});k3Feather(K,C.plume,1.0,0.16,tm(0.12,0.3,-0.25,-0.7,0,-0.35));k3Feather(K,C.gold,0.7,0.1,tm(0.2,0.3,-0.22,-0.5,0,-0.6));});
  k3Dyn(R.g);R.top=3.4;R.eyeY=2.62;
  R.cur={jaw:0.05,puff:0,chest:0,brow:0,browH:0,lid:0.12,hx:0,hy:0,hz:0,neck:0,lean:0,roll:0,bob:0,crouch:0,aL:[0.1,-0.25,-0.3],aR:[0.1,0.25,-0.3],wing:0,fan:0.3,tailUp:0,tuck:0,hatOff:0};
  return R;}
K3S.rig=k3sRig;
/* ---------- мимика и позы ---------- */
const K3EMO={neutral:{brow:0,browH:0,lid:0.12},cocky:{brow:0.3,browH:0.12,lid:0.38},angry:{brow:-1,browH:-0.2,lid:0.36},hurt:{brow:0.95,browH:0.2,lid:0.25},
  scared:{brow:1,browH:0.5,lid:0},sad:{brow:0.8,browH:-0.05,lid:0.55},happy:{brow:0.3,browH:0.12,lid:0.45},surprise:{brow:0.55,browH:0.55,lid:0}};
K3S.say=(R,dur)=>{R.st.talk=Math.max(R.st.talk,dur||1.2);};
K3S.set=(R,pose,emo)=>{if(pose&&R.st.pose!==pose){R.st.pose=pose;R.st.k=0;}if(emo)R.st.emo=emo;};
function k3sAnim(R,dt){const S=R.st,c=R.cur,E=K3EMO[S.emo]||K3EMO.neutral;S.t+=dt;S.k+=dt;S.talk=Math.max(0,S.talk-dt);const t=S.t,P=S.pose,k=S.k;
  const T={jaw:0.05,puff:0,chest:0,brow:E.brow,browH:E.browH,lid:E.lid,hx:Math.sin(t*0.9)*0.05,hy:Math.sin(t*0.55)*0.12,hz:Math.sin(t*0.7)*0.04,neck:0,lean:0,roll:S.roll||0,
    bob:Math.sin(t*1.8)*0.03,crouch:0,aL:[0.1,-0.25,-0.3],aR:[0.1,0.25,-0.3],wing:0,fan:0.3,tailUp:0,tuck:0,hatOff:c.hatOff};
  if(S.emo==='cocky'){T.hx=-0.12;T.hz=Math.sin(t*1.3)*0.08;}if(S.emo==='sad'){T.hx=0.3;T.lean=0.12;}if(S.emo==='scared')T.crouch=0.25;
  if(P==='trill'){T.hx=0.32;T.fan=1;T.tailUp=0.5;T.jaw=0.12+Math.abs(Math.sin(t*30))*0.22;T.puff=0.3;T.aL=[0.3,-0.6,-0.5];T.aR=[0.3,0.6,-0.5];T.lean=0.12;}
  else if(P==='inhale'){const u=Math.min(1,k/0.9);T.puff=u;T.chest=u;T.hx=-0.35*u;T.aL=[0.6,-0.9,-0.4];T.aR=[0.6,0.9,-0.4];T.wing=0.5*u;T.lean=-0.15*u;T.jaw=0.04;T.fan=0.6;}
  else if(P==='whistle'){T.jaw=0.75;T.puff=0.25;T.hx=-0.08;T.neck=0.25;T.aL=[0.7,-1.2,-0.2];T.aR=[0.7,1.2,-0.2];T.wing=0.8;T.lean=0.22;T.fan=1;T.tailUp=0.6;}
  else if(P==='roar'){T.jaw=1;T.aL=[-0.4,-1.65,-0.15];T.aR=[-0.4,1.65,-0.15];T.wing=1;T.lean=0.1;T.hx=-0.22;T.brow=-1;T.lid=0.3;T.puff=0.1;T.fan=1;T.tailUp=0.8;T.chest=0.6;}
  else if(P==='hiss'){T.neck=0.5;T.hx=0.28;T.jaw=0.3+Math.abs(Math.sin(t*20))*0.08;T.crouch=0.45;T.wing=0.55;T.aL=[0.2,-1.0,-0.6];T.aR=[0.2,1.0,-0.6];T.fan=1;T.tailUp=0.9;T.brow=-0.8;T.lid=0.5;}
  else if(P==='hop'){const u=Math.min(1,k/0.5);T.crouch=u<1?u:0.2;T.wing=1;T.aL=[-0.6,-1.4,-0.2];T.aR=[-0.6,1.4,-0.2];T.fan=0.8;}
  else if(P==='fly'){const w=Math.sin(t*9);T.wing=1;T.aL=[0.1,-1.3-w*0.65,-0.15];T.aR=[0.1,1.3+w*0.65,-0.15];T.tuck=1;T.lean=0.45;T.hx=-0.3;T.fan=0.9;T.tailUp=0.3;T.bob=w*0.12;}
  else if(P==='glide'){T.wing=1;T.aL=[0.1,-1.45,-0.1];T.aR=[0.1,1.45,-0.1];T.tuck=1;T.lean=0.5;T.hx=-0.35;T.fan=1;}
  else if(P==='dive'){T.wing=0.2;T.aL=[0.9,-0.35,-0.2];T.aR=[0.9,0.35,-0.2];T.tuck=1;T.lean=1.1;T.neck=0.3;T.hx=-0.6;T.brow=-1;T.fan=0.1;}
  else if(P==='choke'){T.hx=0.2+Math.sin(t*14)*0.22;T.jaw=0.35+Math.abs(Math.sin(t*9))*0.45;T.puff=0;T.lid=0.55;T.brow=0.9;T.browH=0.35;T.aL=[-1.2,-0.3,-1.5];T.aR=[-1.2,0.3,-1.5];T.lean=0.3+Math.sin(t*14)*0.08;T.crouch=0.3;}
  else if(P==='blind'){T.aR=[-2.5,0.55,-1.7];T.aL=[-0.3,-1.1,-0.4];T.hx=0.22;T.hz=Math.sin(t*4)*0.15;T.brow=1;T.browH=0.4;T.lid=1;T.jaw=0.3;T.lean=0.15;T.crouch=0.2;}
  else if(P==='dazed'){T.hz=Math.sin(t*5)*0.26;T.hy=Math.cos(t*5)*0.22;T.jaw=0.3+Math.sin(t*3)*0.06;T.aL=[0.1,-1.0,-0.2];T.aR=[0.1,1.0,-0.2];T.lean=0.15;T.lid=0.4;T.brow=0.6;T.browH=0.4;T.crouch=0.35;T.fan=0;}
  else if(P==='deflated'){T.crouch=1;T.lean=0.55;T.aL=[0.2,-0.5,-0.1];T.aR=[0.2,0.5,-0.1];T.lid=0.6;T.brow=1;T.browH=-0.05;T.hx=0.45;T.chest=-0.5;T.fan=0;T.tailUp=-0.4;T.jaw=0.12;}
  else if(P==='cling'){T.aL=[-2.9,-0.35,-0.7];T.aR=[-2.9,0.35,-0.7];T.brow=1;T.browH=0.5;T.lid=0;T.jaw=0.3+Math.abs(Math.sin(t*8))*0.1;T.lean=-0.15;T.fan=1;T.tailUp=-0.6;T.bob=Math.sin(t*3)*0.06;}
  else if(P==='swing'){const rel=k>=0.8;T.aR=rel?[-0.5,0.3,-0.1]:[-2.9*Math.min(1,k*2),0.35,-0.5];T.lean=rel?0.28:-0.18;T.jaw=rel?0.6:0.1;T.brow=-1;T.crouch=rel?0.3:0;}
  else if(P==='laugh'){T.jaw=0.2+Math.abs(Math.sin(t*12))*0.4;T.hx=-0.25+Math.sin(t*12)*0.1;T.aL=[-0.6,-0.2,-1.6];T.aR=[-0.6,0.2,-1.6];T.bob=Math.abs(Math.sin(t*12))*0.08;T.lid=0.55;T.fan=0.8;}
  else if(P==='sing'){T.jaw=0.25+Math.max(0,Math.sin(t*4))*0.25;T.lid=0.75;T.hx=-0.2;T.puff=0.2+Math.max(0,Math.sin(t*4))*0.2;T.aL=[-0.4,-0.7,-0.6];T.aR=[-0.4,0.7,-0.6];T.hz=Math.sin(t*1.5)*0.1;T.fan=0.7;T.tailUp=0.3;}
  else if(P==='sit'){T.crouch=0.8;T.lean=0.25;T.aL=[0,-0.45,-0.6];T.aR=[0,0.45,-0.6];T.hx=0.25;T.fan=0.2;}
  if(S.talk>0)T.jaw=Math.max(T.jaw,0.12+Math.abs(Math.sin(t*13))*0.3);
  S.blink-=dt;if(S.blink<=0&&S.bt<0){S.bt=0;S.blink=2+k3h(Math.floor(t),9)*3;}let bl=0;if(S.bt>=0){S.bt+=dt;const u=S.bt/0.16;bl=u<0.5?u*2:Math.max(0,2-u*2);if(u>=1)S.bt=-1;}
  const kk=1-Math.exp(-dt*10),k2=1-Math.exp(-dt*(P==='fly'?14:7));
  for(const n of['jaw','puff','chest','brow','browH','lid','hx','hy','hz','neck','lean','roll','bob','crouch','wing','fan','tailUp','tuck','hatOff'])c[n]+=(T[n]-c[n])*(n==='jaw'?1-Math.exp(-dt*16):kk);
  for(const a of['aL','aR'])for(let i=0;i<3;i++)c[a][i]+=(T[a][i]-c[a][i])*k2;
  const cr=c.crouch;R.body.position.set(0,0.8-cr*0.32+c.bob,0);R.body.rotation.set(c.lean,0,c.roll);const cs=1+c.chest*0.14;R.body.scale.set(cs,1+Math.sin(t*1.8)*0.012+c.chest*0.05,cs);
  R.leg.forEach((l,i)=>{l.rotation.x=c.tuck*1.2+cr*0.3;l.position.y=0.86-cr*0.3;l.scale.y=1-cr*0.25;});
  R.jaw.rotation.x=c.jaw*0.7;R.head.rotation.set(c.hx,c.hy,c.hz);R.head.position.set(0,1.62,0.05+c.neck*0.42);
  R.cheek.forEach(ch=>ch.scale.setScalar(1+c.puff*1.0));
  const lid=Math.min(1,Math.max(c.lid,bl));R.lid.forEach(l=>{l.rotation.x=-2.2+lid*3.25;});R.lidLo.forEach(l=>{l.rotation.x=Math.PI+0.9;});
  R.brow.forEach((b,i)=>{const s=i?1:-1;b.rotation.z=-s*c.brow*0.45;b.position.y=0.4+c.browH*0.12;});
  const lx=S.look[0],ly=S.look[1],dz=P==='dazed'||P==='choke';R.pu.forEach((p,i)=>{const sx=dz?Math.cos(t*8+i)*0.05:lx*0.05,sy=dz?Math.sin(t*8+i)*0.04:ly*0.04;p.position.x=sx;p.position.y=sy;R.ir[i].position.x=sx*0.7;R.ir[i].position.y=sy*0.7;});
  [[R.arm[0],R.el[0],c.aL],[R.arm[1],R.el[1],c.aR]].forEach(([a,e,v])=>{a.rotation.set(v[0],0,v[1]);e.rotation.x=v[2];});
  for(const q of R.prim){const sp=c.wing;q.f.rotation.set(-0.15-q.k*0.14*sp,0,q.s*(0.1+q.k*0.17*sp));}
  R.tail.rotation.x=0.05+c.tailUp*0.5;R.voice.forEach((v,i)=>{v.rotation.z=(i-1)*(0.18+c.fan*0.32)+Math.sin(t*2+i)*0.04;});
  R.must.forEach((ch,s)=>ch.forEach((q,i)=>{q.rotation.x=Math.sin(t*1.7+i+s)*0.08;}));
  R.hat.visible=c.hatOff<0.5;}
K3S.anim=k3sAnim;
// перо голоса: on=false — выбито (улетает уровнем), glow — свечение
K3S.voice=(R,i,on)=>{R.voice[i].visible=!!on;};
K3S.voiceGlow=(R,k)=>{R.voice.forEach((v,i)=>{v.userData.glow.material.opacity=v.visible?k*(0.35+0.2*Math.sin(R.st.t*6+i*2)):0;});};
K3S.hat=(R,on)=>{R.cur.hatOff=on?0:1;R.hat.visible=!!on;};
K3S.pestry=(R,k)=>{R.chestM.emissive.setRGB(0.9*k,0.75*k,0.4*k);};   // в свете пера пятна горят
/* ---------- Соловей-враг: makeFoe('solovei') + новый облик ---------- */
K3S.boss=(x,z,o)=>{o=o||{};const e=makeFoe('solovei',x,z,{y:o.y||0,leash:40,scale:1});for(const c of e.inner.children.slice())e.inner.remove(c);
  const R=k3sRig(e.inner,{eyeMat:e.eyeMat,seed:1});e.k3=R;e.L={top:R.top,head:R.head,eyeY:R.eyeY,eyeZ:0.7,castLook:true,k3:true};
  e.S.sig.visible=false;e.spin.position.y=R.top+0.3;e.br.visible=false;e.noKill=true;e.noMove=true;e.big=true;
  e.setScale=s=>{e.s=s;e.inner.scale.setScalar(s);e.r=FOE.solovei.r*s*0.8;e.spin.position.y=(R.top+0.3)*s;e.spin.scale.setScalar(Math.max(1,s*0.8));};e.setScale(o.scale||1);
  e.post=(q,dt)=>{q.S.sig.visible=false;q.embersM.forEach(m=>{m.m.visible=false;});q.br.visible=false;q.satRim.visible=false;
    q.body.position.set(0,0,0);q.body.rotation.set(0,0,0);q.body.scale.set(1,1,1);k3sAnim(R,dt);if(q.k3post)q.k3post(q,dt);};
  return e;};
/* ---------- дочка-соловушка: пухлая птаха в платочке и фартуке ---------- */
K3S.daughter=(i)=>{const C=K3C,g=new THREE.Group();W.group.add(g);const D={g,st:{pose:'idle',t:i*1.7,k:0},wing:[],i};
  const B=D.body=k3G(g,0,0.12,0);fk(B,K=>{K.add(hSph(0.46,10,8),C.fe,tm(0,0.42,0,0,0,0,1,1.05,0.95),{noise:0.015});K.add(hSph(0.36,9,6),C.cream,tm(0,0.4,0.18,0,0,0,1,1.05,0.8),{s:0.1});
    K.add(KP.cyl(0.3,0.42,0.42,10),C.apron,tm(0,0.28,0.12,0,0,0,1,1,0.7),{s:0.1});K.add(KP.tor(0.34,0.03,3,12),C.scarf[i%3],tm(0,0.5,0.06,Math.PI/2,0,0,1,0.8,1),{kN:0.2});
    for(const s of[-1,1])K.add(KP.cyl(0.04,0.035,0.2,5),C.leg,tm(s*0.16,-0.04,0.02),{s:0.05});
    for(let k=0;k<5;k++)k3Feather(K,k%2?C.feD:C.fe,0.42,0.1,tm(0,0.3,-0.38,-1.6,0,(k-2)*0.3));});
  const H=D.head=k3G(B,0,0.94,0.04);fk(H,K=>{K.add(hSph(0.3,10,8),C.fe,tm(0,0,0),{noise:0.01});K.add(hSph(1,8,6),C.face,tm(0,-0.02,0.17,0,0,0,0.22,0.2,0.14),{s:0.1});
    const bk=KP.cone(0.08,0.24,6);bk.rotateX(Math.PI/2);K.add(bk,C.beak,tm(0,-0.04,0.34),{s:0.1});
    for(const s of[-1,1]){K.add(hSph(0.065,6,5),hp(0xfbf8ee),tm(s*0.11,0.05,0.24),{kN:0});K.add(hSph(0.035,5,4),hp(0x201814),tm(s*0.115,0.05,0.29),{kN:0});K.add(hSph(0.05,5,4),hp(0xf0a0a0),tm(s*0.17,-0.06,0.22),{s:0.1});}
    // платочек: шапочка, концы сзади и узелок под клювом
    const sc=C.scarf[i%3];K.add(new FIN.orig.Sphere(0.33,10,6,0,Math.PI*2,0,Math.PI*0.55),sc,tm(0,0.02,-0.02,-0.25),{kN:0.3});
    K.add(KP.cone(0.16,0.34,3),sc,tm(0,-0.12,-0.3,2.4,0,0,1,1,0.3),{kN:0.2});for(const s of[-1,1])K.add(hSph(0.06,5,4),sc,tm(s*0.08,-0.24,0.12),{kN:0.2});
    for(let k=0;k<6;k++)K.add(hSph(0.025,4,3),C.apron,tm(Math.sin(k*1.1)*0.26,0.14+Math.cos(k*1.7)*0.08,Math.cos(k*1.1)*0.2-0.04),{kN:0.5});});
  for(const s of[-1,1]){const w=k3G(B,s*0.42,0.55,0);fk(w,K=>{for(let k=0;k<3;k++)k3Feather(K,k%2?C.feD:C.fe,0.48-k*0.06,0.13,tm(0,0,0,Math.PI+0.2,0,s*(0.2+k*0.2)));});D.wing.push(w);}
  k3Dyn(g);
  D.set=(p)=>{if(D.st.pose!==p){D.st.pose=p;D.st.k=0;}};
  D.tick=(dt)=>{const S=D.st;S.t+=dt;S.k+=dt;const t=S.t,P=S.pose;let fl=Math.sin(t*2)*0.15,by=Math.abs(Math.sin(t*2.2))*0.04,hx=Math.sin(t*1.3)*0.08,hz=0;
    if(P==='flap'){fl=Math.sin(t*16)*0.9;by=0.06+Math.abs(Math.sin(t*16))*0.05;}else if(P==='throw'){fl=S.k<0.35?-1.2:0.9;hx=S.k<0.35?-0.3:0.25;}
    else if(P==='sing'){fl=Math.sin(t*4)*0.4;hz=Math.sin(t*2)*0.18;hx=-0.2;by=Math.abs(Math.sin(t*4))*0.05;}else if(P==='cheer'){fl=Math.sin(t*12)*0.7;by=Math.abs(Math.sin(t*6))*0.2;}
    D.wing.forEach((w,i)=>{w.rotation.z=(i?1:-1)*(0.2+fl);});B.position.y=0.12+by;H.rotation.set(hx,Math.sin(t*0.7)*0.2,hz);};
  return D;};
/* ---------- пуховая подушка (дочки кидаются): лопается облаком пуха ---------- */
K3S.pillow=()=>{const g=new THREE.Group();W.group.add(g);fk(g,K=>{K.box(0.9,0.32,0.62,hp(0xf4f0ff),tm(),{b:0.12});for(let k=0;k<3;k++)K.add(KP.cyl(0.012,0.012,0.63,4),hp(0x8aa8e0),tm(-0.25+k*0.25,0.165,0,Math.PI/2,0,0),{kN:0});
    for(const[x,z]of[[-0.45,-0.31],[0.45,-0.31],[-0.45,0.31],[0.45,0.31]])K.add(KP.cone(0.05,0.16,4),hp(0xd8404a),tm(x*1.08,0,z*1.12,0,0,x>0?-1.2:1.2),{s:0.1});});k3Dyn(g);return g;};
/* ---------- звери-тени: волк, медведь, рысь — из тьмы, глаза горят; в свете пера тают ---------- */
const K3_SHADE=new THREE.MeshBasicMaterial({color:0x221a38,transparent:true,opacity:0.92});K3_SHADE.userData.shared=true;
const K3_SHADE_E=new THREE.MeshBasicMaterial({color:0xd8ff6a});K3_SHADE_E.userData.shared=true;
K3S.beast=(kind)=>{const g=new THREE.Group();W.group.add(g);const B={g,kind,legs:[],t:Math.random()*6,mat:K3_SHADE.clone()};const m=B.mat;const add=(geo,x,y,z,rx,ry,rz,sx,sy,sz,par)=>{const q=new THREE.Mesh(geo,m);q.position.set(x,y,z);q.rotation.set(rx||0,ry||0,rz||0);q.scale.set(sx||1,sy||1,sz||1);(par||g).add(q);return q;};
  const S=kind==='bear'?1.25:kind==='lynx'?0.8:1;const body=k3G(g,0,0.62*S,0);B.body=body;const SPH=KP.sph(1,8,6),CON=KP.cone(1,1,5),CYL=KP.cyl(1,0.8,1,5);
  if(kind==='bear'){add(SPH,0,0.12,0,0,0,0,0.62,0.55,0.95,body);add(SPH,0,0.2,0.8,0,0,0,0.38,0.36,0.36,body);add(SPH,0,0.12,1.12,0,0,0,0.17,0.15,0.2,body);for(const s of[-1,1])add(SPH,s*0.24,0.5,0.75,0,0,0,0.1,0.1,0.06,body);}
  else{const L=kind==='lynx'?0.75:1;add(SPH,0,0.1,0,0,0,0,0.36,0.34,0.8*L,body);add(SPH,0,0.32,0.78*L,0,0,0,0.26,0.24,0.28,body);add(CON,0,0.24,1.12*L,Math.PI/2,0,0,0.11,0.32,0.11,body);
    for(const s of[-1,1]){add(CON,s*0.12,0.6,0.72*L,-0.2,0,s*0.2,0.07,0.22,0.05,body);if(kind==='lynx')add(CON,s*0.13,0.84,0.7*L,0,0,s*0.1,0.015,0.12,0.015,body);}
    add(CON,0,0.25,-0.86*L,-2.0,0,0,0.09,kind==='lynx'?0.25:0.6,0.09,body);}
  const eyes=[];for(const s of[-1,1]){const q=new THREE.Mesh(KP.sph(1,6,4),K3_SHADE_E);q.scale.setScalar(0.055*S);q.position.set(s*0.11,kind==='bear'?0.3:0.4,kind==='bear'?1.05:kind==='lynx'?0.78:0.98);body.add(q);eyes.push(q);}
  for(const[x,z]of[[-0.2,0.45],[0.2,0.45],[-0.2,-0.45],[0.2,-0.45]]){const lg=k3G(g,x*S,0.62*S,z*S*(kind==='lynx'?0.8:1));add(CYL,0,-0.3*S,0,0,0,0,0.07*S,0.6*S,0.07*S,lg);B.legs.push(lg);}
  g.scale.setScalar(S>1?1.1:1);g.traverse(c=>{c.userData.noBatch=true;c.userData.noBatchL=true;c.castShadow=false;});
  B.tick=(dt,sp)=>{B.t+=dt*(1+sp*1.6);const w=Math.sin(B.t*6);B.legs.forEach((l,i)=>{l.rotation.x=(i===0||i===3?w:-w)*0.6*Math.min(1,sp);});body.position.y=0.62*S+Math.abs(w)*0.06*Math.min(1,sp);body.rotation.x=Math.sin(B.t*3)*0.04;};
  B.fade=(k)=>{m.opacity=0.92*k;eyes.forEach(q=>{q.visible=k>0.2;});};
  return B;};
