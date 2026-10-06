/* ============================== РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: ОБЛИК — ЛЕШИЙ С ТРОФЕЯМИ, РУКИ-КОРЯГИ, ДВОЙНИКИ В НАРЯДАХ, ЛЕШАЧАТА-ЗРИТЕЛИ ============================== */
// docs/29_leshy_proposals.md, шаг 1. Леший — тот же скелет, что у `makeLeshy` (кости голова/брови/веки/рот/плечи), но рога, шапка-гнездо и борода — отдельные
// детали на кости головы: их сбивают три удара по макушке (рог → гнездо с птенцами → борода-мох), и Леший по-своему реагирует (удивлён → обижен → смущён).
// Мимика — эмоции (хитрый, удивлён, обижен, хохочет, смущён, озорной, закружился); рот, веки и брови ведёт `castFace` + свой тик.
// Руки-коряги — настоящие руки от плеча Лешего (два звена, двухзвенный IK) к большой ладони-врагу; ладонь шевелится: замах поднимает пальцы.
// Двойники — тот же Леший в одном из пяти нарядов (венок, колпак-мухомор, корзинка, белка, бусы с бантом); настоящий — со своей тенью, дыханием и
// мох-следами, у двойников тени нет, а у ног дымок. Лешачата-зрители выглядывают из-за ёлок, ахают на удары и хлопают в конце.
// FIN.k1b: boss(scale) · double(i,n,real,round) · onHead(n) · bridge(g,from,to,len,hand) · init(ctx) · emo(o,name,hold) · cheer(kind).
const K1B={cur:null,fly:[],tick:[]};FIN.k1b=K1B;
const K1C={bark:hp(0x6a4630),barkL:hp(0x8c6644),barkD:hp(0x4a2e1c),moss:hp(0x5f8a3a),mossL:hp(0x86b552),mossD:hp(0x35542a),leaf:hp(0x9acb48),leafD:hp(0x6aa338),
  white:hp(0xf7f3ea),cream:hp(0xf2e6c0),yellow:hp(0xffd54a),orange:hp(0xf08a30),red:hp(0xd8362b),pink:hp(0xff8fb0),brown:hp(0x7a5232),straw:hp(0xdcb867),
  egg:hp(0xefe9d6),chick:hp(0xffd45c),beak:hp(0xff9a2f),night:hp(0x1a1410),green:hp(0x4cb44a),blue:hp(0x78b0ff),rowan:hp(0xe0501e)};
const k1h=(i,s)=>{const x=Math.sin(i*127.1+(s||0)*311.7)*43758.5453;return x-Math.floor(x);};
const k1hr=(i,s,a,b)=>a+(b-a)*k1h(i,s);
function k1G(parent,x,y,z){const g=new THREE.Group();g.position.set(x||0,y||0,z||0);parent.add(g);return g;}
function k1Dyn(o){o.traverse(c=>{c.userData.noBatch=true;c.userData.noBatchL=true;});return o;}
K1B.dyn=k1Dyn;
const K1_SOFT=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');const g=x.createRadialGradient(32,32,0,32,32,32);
  g.addColorStop(0,'rgba(255,255,255,0.9)');g.addColorStop(0.45,'rgba(255,255,255,0.35)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);return new THREE.CanvasTexture(c);})();
K1B.soft=K1_SOFT;
/* ---------- скелет Лешего: как у makeLeshy, но без рогов и бороды (они — съёмные детали), глаза и рот крупнее ---------- */
function k1Build(){const R=castRig(4.4,41),C=K1C,BK=PAL.bark,MS=PAL.moss;
  R.bone('hips','root',0,1.2,0);R.bone('chest','hips',0,1.5,0);R.bone('neck','chest',0,0.6,0);R.bone('head','neck',0,0.3,0);
  R.part('hips',KP.lathe([[0,-1.2],[1.1,-1.2],[1.0,-0.95],[0.85,-0.4],[0.75,0.3],[0.7,0.6],[0,0.62]],10),BK,null,{noise:0.04});
  for(let i=0;i<5;i++){const a=i/5*Math.PI*2+0.3;R.part('hips',KP.cone(0.28,0.7,4),BK,tm(Math.sin(a)*0.95,-1.05,Math.cos(a)*0.95,0,a,Math.PI/2-0.2,1,1,0.7),{noise:0.02});}   // корни
  R.part('chest',KP.lathe([[0,-0.9],[0.72,-0.9],[0.7,-0.3],[0.62,0.2],[0.5,0.5],[0,0.6]],10),BK,null,{noise:0.03});
  for(let i=0;i<7;i++){const a=i*1.7;R.part(i<4?'hips':'chest',hSph(0.22,6,4),MS,tm(Math.sin(a)*0.7,-0.2+i*0.12-(i<4?0:0.6),Math.cos(a)*0.66,0,0,0,1.3,0.6,0.7),{noise:0.02});}   // мох
  for(let i=0;i<3;i++)R.part('chest',hSph(0.07,6,4),PAL.bark,tm(-0.3+i*0.25,-0.4+i*0.2,0.64,0,0,0,1,1.3,0.5),{s:-0.4});   // сучки-дупла
  R.part('chest',KP.cyl(0.03,0.035,0.12,5),PAL.cream,tm(0.5,0.45,0.2));R.part('chest',hSph(0.1,6,3),PAL.mush,tm(0.5,0.52,0.2,0,0,0,1,0.55,1));   // грибок на плече
  for(let i=0;i<4;i++){const a=i*2.3+0.4;R.part('chest',hIco(0.07),i%2?PAL.pink:PAL.yellow,tm(Math.sin(a)*0.62,-0.45+i*0.2,Math.cos(a)*0.6),{s:0.1});}   // цветочки во мху
  // голова-пень: плоская макушка (на ней — гнездо), нос-сучок, усы-мох
  R.part('head',hSph(0.62,9,7),BK,tm(0,0,0,0,0,0,1,1.05,0.95),{noise:0.03});R.part('head',KP.cyl(0.55,0.6,0.2,9),BK,tm(0,0.55,0),{noise:0.02});
  R.part('head',KP.cyl(0.5,0.5,0.02,9),PAL.plank,tm(0,0.66,0),{s:0.2});
  for(const s of[-1,1]){R.part('head',KP.cone(0.13,0.55,5),MS,tm(s*0.3,-0.2,0.5,Math.PI-0.15,0,s*0.55),{noise:0.02});   // усы
    R.part('head',hSph(0.16,6,4),BK,tm(s*0.42,-0.14,0.38,0,0,0,1,0.8,0.7),{noise:0.02,s:0.15});}   // скулы
  R.part('head',KP.cone(0.1,0.3,5),BK,tm(0,-0.05,0.62,Math.PI/2+0.3,0,0),{s:0.1});   // нос-сучок
  for(const[s,n]of[[1,'L'],[-1,'R']]){hEye(R,n,s*0.24,0.14,0.52,0.165,cc(0xf0ffa0,0xc8f060,0x8ab030),{lid:BK});hBrow(R,n,s*0.25,0.36,0.55,0.3,MS,s*0.2);
    R.use('e');R.part('eye'+n,hIco(0.08),cc(0xf0ffa0,0xd8ff6a,0xa8d040),tm(0,0,0.1));R.use('b');}
  hMouth(R,0,-0.3,0.56,0.095);
  // руки-ветви (у боссов этапа 1 их закрывают настоящие руки-коряги; на этапах 2–3 — скакалка и хоровод)
  for(const[s,n]of[[1,'L'],[-1,'R']]){R.bone('sh'+n,'chest',s*0.75,0.2,0);R.part('sh'+n,KP.cyl(0.2,0.15,2.2,6),BK,tm(0,-1.1,0.2,0.18,0,0),{noise:0.02});R.part('sh'+n,hSph(0.28,6,4),MS,tm(0,-0.1,0.05,0,0,0,1.2,0.7,1));
    R.bone('hand'+n,'sh'+n,0,-2.2,0.35);for(let k=0;k<3;k++)R.part('hand'+n,KP.cone(0.1,0.9,5),BK,tm((k-1)*0.22,-0.3,0.1,0.4,0,(k-1)*0.2));R.part('hand'+n,hSph(0.22,6,4),BK,tm(0,0,0.05));}
  return R;}
/* ---------- съёмные детали головы ---------- */
// рог-ветвь: ствол, три отростка, листья на концах, цветы (прячутся до цветения); основание — в начале координат группы
function k1Horn(s){const g=new THREE.Group(),C=K1C,a=0.45,d=new V3(s*Math.sin(a),Math.cos(a),0),tips=[];
  const tine=(t,ang,len,r)=>{const p=d.clone().multiplyScalar(t),dir=new V3(s*Math.sin(ang),Math.cos(ang),0);return {p,dir,len,r,ang,tip:p.clone().addScaledVector(dir,len)};};
  const T=[tine(1.05,1.15,0.95,0.07),tine(1.45,0.12,0.85,0.055),tine(0.8,-0.55,0.6,0.05)];
  fk(g,K=>{K.add(KP.cone(0.12,1.8,5),C.bark,tm(d.x*0.9,d.y*0.9,0,0,0,-s*a),{noise:0.02});
    for(const t of T){const m=t.p.clone().addScaledVector(t.dir,t.len/2);K.add(KP.cone(t.r,t.len,5),C.bark,tm(m.x,m.y,0,0,0,-s*t.ang),{noise:0.015});}},{H:2});
  const tipA=d.clone().multiplyScalar(1.8);tips.push(tipA);T.forEach(t=>tips.push(t.tip));
  const lv=k1G(g);fk(lv,K=>{tips.forEach((p,i)=>{for(let j=0;j<3;j++)K.add(hIco(0.17),j%2?C.leafD:C.leaf,tm(p.x+k1hr(i*3+j,1,-0.18,0.18),p.y+k1hr(i*3+j,2,-0.1,0.2),k1hr(i*3+j,3,-0.15,0.15),j,j*1.3,0,1,0.6,1),{s:0.1});});},{H:2});
  const bl=k1G(g);fk(bl,K=>{tips.forEach((p,i)=>{const pal=i%3===0?C.pink:i%3===1?C.yellow:C.white;K.add(hIco(0.12),pal,tm(p.x,p.y+0.12,0.1),{s:0.2});K.add(hIco(0.05),C.orange,tm(p.x,p.y+0.2,0.17),{kN:0});});},{H:2});
  bl.visible=false;g.userData={s,lv,bl,ph:k1hr(s,5,0,6)};return g;}
// гнездо-шапка: ветки по кругу, подстилка, три птенца и яичко
function k1Nest(){const g=new THREE.Group(),C=K1C;
  fk(g,K=>{K.add(KP.tor(0.6,0.1,5,14),C.straw,tm(0,0.12,0,Math.PI/2,0,0),{noise:0.03});K.add(KP.tor(0.52,0.09,5,14),C.brown,tm(0,0.24,0,Math.PI/2,0,0),{noise:0.03});
    for(let i=0;i<16;i++){const a=i/16*Math.PI*2+k1hr(i,1,-0.1,0.1);K.box(0.07,0.07,0.78,i%3?C.brown:C.straw,tm(Math.sin(a)*0.62,0.12+k1hr(i,2,0,0.2),Math.cos(a)*0.62,0,a+Math.PI/2+k1hr(i,3,-0.3,0.3),k1hr(i,4,-0.1,0.1)),{b:0.01});}
    K.add(KP.cyl(0.52,0.46,0.16,10),C.straw,tm(0,0.12,0),{noise:0.02});},{H:1});
  const ch=[];[[-0.26,0.1,-0.08],[0.2,0.14,-0.22],[0.08,0.12,0.26]].forEach((q,i)=>{const c=k1G(g,q[0],0.34,q[2]);
    fk(c,K=>{K.add(hIco(0.19),C.chick,tm(0,0.06,0,0,0,0,1,1.1,1),{s:0.1,noise:0.01});K.add(hIco(0.1),C.cream,tm(0,-0.02,0.1),{s:0.1});for(const x of[-1,1])K.add(hIco(0.04),C.night,tm(x*0.08,0.16,0.14),{kN:0,s:-0.5});},{H:0.5});
    const bk=k1G(c,0,0.12,0.2);fk(bk,K=>{const b=KP.cone(0.06,0.17,4);b.rotateX(Math.PI/2);K.add(b,C.beak,tm(0,0,0.04),{s:0.1});},{H:0.5});c.userData={bk,ph:i*1.9,y0:0.34};ch.push(c);});
  const egg=k1G(g,-0.1,0.38,0.02);fk(egg,K=>{K.add(hIco(0.15),C.egg,tm(0,0,0,0,0,0.3,0.85,1.15,0.85),{s:0.1});for(let i=0;i<3;i++)K.add(hIco(0.03),C.brown,tm(k1hr(i,1,-0.07,0.07),k1hr(i,2,-0.08,0.1),0.12),{kN:0,s:-0.3});},{H:0.5});
  g.userData={chicks:ch,egg};return g;}
// борода-мох: три яруса прядей, покачивается; гриб и цветок воткнуты
function k1Beard(){const g=new THREE.Group(),C=K1C,tiers=[],N=[9,7,5],Wd=[0.62,0.5,0.34],Hh=[0,-0.62,-0.62];let p=g;
  for(let i=0;i<3;i++){const q=k1G(p,0,Hh[i],0);fk(q,K=>{for(let k=0;k<N[i];k++){const u=N[i]>1?(k-(N[i]-1)/2)/((N[i]-1)/2):0;
      K.add(KP.cone(0.2-i*0.04,0.95-i*0.1,6),k%3===0?C.mossD:k%3===1?C.moss:C.mossL,tm(u*Wd[i]*0.9,-0.4,-Math.abs(u)*0.14+k1hr(k+i*9,1,-0.04,0.04),Math.PI+k1hr(k+i*9,2,-0.08,0.08),0,-u*0.3),{noise:0.015,kN:0.1});}
    if(i===0){K.add(KP.cyl(0.04,0.05,0.2,5),C.cream,tm(-0.34,-0.3,0.25));K.add(hSph(0.14,6,4),C.red,tm(-0.34,-0.18,0.25,0,0,0,1,0.55,1),{s:0.1});K.add(hIco(0.05),C.white,tm(-0.38,-0.14,0.34),{kN:0});}
    if(i===1){K.add(hIco(0.1),C.pink,tm(0.3,-0.3,0.3),{s:0.2});K.add(hIco(0.04),C.yellow,tm(0.3,-0.25,0.38),{kN:0});}},{H:1.5});tiers.push(q);p=q;}
  g.userData={tiers};return g;}
// пенёк на месте сбитого рога
function k1Stub(s){const g=new THREE.Group();fk(g,K=>{K.add(KP.cone(0.13,0.34,5),K1C.barkD,tm(s*0.04,0.14,0),{noise:0.02});K.add(hIco(0.08),K1C.mossL,tm(s*0.04,0.34,0),{s:0.1});},{H:0.5});g.visible=false;return g;}
/* ---------- мимика ---------- */
const K1EMO={neutral:{bL:0.1,bR:0.1,bh:0,lid:0.05,my:0.32,mx:1,mz:0,hx:0,hz:0,ex:0,sh:0},
  sly:{bL:0.55,bR:-0.35,bh:0.02,lid:0.3,my:0.34,mx:1.25,mz:-0.22,hx:0.05,hz:0.12,ex:0.15,sh:0},
  surprise:{bL:-0.6,bR:-0.6,bh:0.16,lid:0,my:1.05,mx:0.8,mz:0,hx:-0.1,hz:0,ex:0,sh:0},
  hurt:{bL:-0.5,bR:-0.5,bh:0.04,lid:0.32,my:0.3,mx:0.8,mz:0,hx:0.2,hz:-0.12,ex:0,sh:0},
  laugh:{bL:-0.3,bR:-0.3,bh:0.1,lid:0.85,my:1.15,mx:1.5,mz:0,hx:-0.06,hz:0,ex:0,sh:1},
  sheepish:{bL:-0.45,bR:-0.45,bh:0.06,lid:0.2,my:0.34,mx:0.9,mz:0.18,hx:0.15,hz:0.2,ex:-0.35,sh:0},
  mock:{bL:0.5,bR:0.5,bh:-0.04,lid:0.15,my:0.9,mx:1.4,mz:0,hx:0.02,hz:0,ex:0,sh:0},
  dizzy:{bL:-0.3,bR:0.3,bh:0.05,lid:0.4,my:0.7,mx:1,mz:0,hx:0.1,hz:0.05,ex:0,sh:0.3}};
function k1State(emo){return {emo:emo||'sly',base:emo||'sly',hold:0,t:Math.random()*6,real:true,cur:Object.assign({},K1EMO[emo||'sly'])};}
// эмоция на hold секунд, потом — прежняя
K1B.emo=function(o,name,hold){const k=o&&o.k1;if(!k||!K1EMO[name])return;k.emo=name;k.hold=hold||0;if(!hold)k.base=name;};
function k1Tick(o,dt,talk){const k=o.k1,R=o.rig,F=o.face,c=k.cur;if(!k||!R||!R.head)return;k.t+=dt;const t=k.t;if(k.hold>0){k.hold-=dt;if(k.hold<=0)k.emo=k.base;}
  const E=K1EMO[k.emo]||K1EMO.neutral,kk=1-Math.exp(-dt*9);for(const n in E)c[n]+=(E[n]-c[n])*kk;
  // брови: наклон и высота; веки: эмоция и моргание; рот: форма и речь; голова и взгляд
  const bl=F.bt>=0?(()=>{const u=F.bt/0.17;return u<0.5?u*2:Math.max(0,2-u*2);})():0,lid=Math.min(1,Math.max(c.lid,bl));
  for(const[n,s,T]of[['L',1,c.bL],['R',-1,c.bR]]){const b=R['brow'+n],l=R['lid'+n],e=R['eye'+n];
    if(b){if(b.userData.y0==null)b.userData.y0=b.position.y;b.rotation.z=s*T;b.position.y=b.userData.y0+c.bh+talk*0.012*(1+Math.sin(G.time*5+F.ph));}
    if(l){l.userData.lidHold=true;l.rotation.x=-2.45+lid*3.7;}
    if(e){if(k.emo==='dizzy'){e.rotation.x=Math.sin(t*8)*0.3;e.rotation.y+=Math.cos(t*8)*0.3;}else e.rotation.y+=c.ex*0.5;}}
  if(R.mouth){R.mouth.userData.hold=true;const spk=talk*(0.22+0.62*Math.abs(Math.sin(G.time*13+F.ph))),lau=c.sh>0.5?Math.abs(Math.sin(t*11))*0.35*c.sh:0;
    R.mouth.scale.y+=(c.my+spk+lau-R.mouth.scale.y)*Math.min(1,dt*22);R.mouth.scale.x+=(c.mx-R.mouth.scale.x)*Math.min(1,dt*12);R.mouth.rotation.z=c.mz;}
  R.head.rotation.x=c.hx+(c.sh>0.5?Math.sin(t*11)*0.05*c.sh:0);R.head.rotation.z=c.hz;
  if(c.sh>0.2){o.body.position.y=Math.abs(Math.sin(t*11))*0.06*c.sh;}else o.body.position.y=0;
  // дыхание — только у настоящего
  if(k.real)o.body.scale.y=1+Math.sin(t*1.7)*0.014;
  // детали головы
  const D=o.parts;if(D){for(const h of[D.hornL,D.hornR])if(h&&h.visible){const u=h.userData;u.lv.rotation.z=Math.sin(t*1.7+u.ph)*0.05;u.lv.rotation.x=Math.cos(t*1.3+u.ph)*0.04;}
    if(D.beard&&D.beard.visible)D.beard.userData.tiers.forEach((q,i)=>{const w=k.real?1:0.25;q.rotation.z=Math.sin(t*1.1+i*0.8)*0.05*(1+talk*2)*w;q.rotation.x=Math.sin(t*0.9+i*1.1)*0.04*w;});
    if(D.nest&&D.nest.visible)D.nest.userData.chicks.forEach(ch=>{const u=ch.userData,p=t*3+u.ph,open=Math.max(0,Math.sin(p*1.3));ch.position.y=u.y0+Math.abs(Math.sin(p))*0.04;u.bk.rotation.x=open*0.5;ch.rotation.z=Math.sin(p*0.7)*0.12;});}}
/* ---------- Леший-босс ---------- */
K1B.boss=function(scale){const R=k1Build(),eye=new THREE.MeshLambertMaterial({vertexColors:true,skinning:true,emissive:0xc8ff40,emissiveIntensity:1.3});
  const o=castMake(R,{e:eye}),B=o.rig;o.g.scale.setScalar(scale||2.2);B.shL.rotation.z=0.3;B.shR.rotation.z=-0.3;
  const hands=[['L',1],['R',-1]].map(([n,s])=>({sh:bvis(B['sh'+n]),hand:B['hand'+n],s}));
  const D={hornL:k1Horn(1),hornR:k1Horn(-1),nest:k1Nest(),beard:k1Beard(),stubL:k1Stub(1),stubR:k1Stub(-1)};
  D.hornL.position.set(0.42,0.55,0);D.hornR.position.set(-0.42,0.55,0);D.stubL.position.set(0.42,0.55,0);D.stubR.position.set(-0.42,0.55,0);D.nest.position.set(0,0.66,0);D.beard.position.set(0,-0.38,0.4);
  for(const n in D)B.head.add(D[n]);k1Dyn(o.g);
  Object.assign(o,{head:B.head,hands,eye,parts:D,k1:k1State('sly')});o.k1.lost={};
  return castReg(o,{hs:3,tick:k1Tick});};
// цветут рога (этап 3 и финал): цветы на ветках
K1B.bloom=function(o,on){if(!o||!o.parts)return;for(const h of[o.parts.hornL,o.parts.hornR])if(h.userData.bl)h.userData.bl.visible=on!==false;};
/* ---------- обломки: летят, падают, лежат, тают ---------- */
K1B.fly.add=(m,v,o)=>{o=o||{};K1B.fly.push({m,v:v.clone(),spin:o.spin||new V3(rand(-4,4),rand(-4,4),rand(-4,4)),t:0,life:o.life||3,bounce:o.bounce==null?0.35:o.bounce,fade:o.fade!=null?o.fade:1,floor:o.floor||0,air:!!o.air,s0:m.scale.x});};
function k1Detach(g,keepVis){g.updateWorldMatrix(true,false);const wp=new V3(),wq=new THREE.Quaternion(),ws=new V3();g.matrixWorld.decompose(wp,wq,ws);if(g.parent)g.parent.remove(g);
  W.group.add(g);g.position.copy(wp);g.quaternion.copy(wq);g.scale.copy(ws);return g;}
function k1FlyTick(dt){for(let i=K1B.fly.length-1;i>=0;i--){const f=K1B.fly[i],m=f.m;f.t+=dt;if(!m.parent){K1B.fly.splice(i,1);continue;}
    if(f.air){f.v.y+=Math.sin(f.t*9+f.spin.x)*dt*5;}else f.v.y-=22*dt;m.position.addScaledVector(f.v,dt);
    if(!f.air){m.rotation.x+=f.spin.x*dt;m.rotation.y+=f.spin.y*dt;m.rotation.z+=f.spin.z*dt;if(m.position.y<f.floor+0.15&&f.v.y<0){if(f.bounce>0.05&&Math.abs(f.v.y)>2){f.v.y*=-f.bounce;f.v.x*=0.6;f.v.z*=0.6;f.spin.multiplyScalar(0.5);}else{f.v.set(0,0,0);f.spin.set(0,0,0);m.position.y=f.floor+0.15;}}}
    else{m.rotation.y=Math.atan2(f.v.x,f.v.z);m.rotation.z=Math.sin(f.t*18)*0.3;}
    const k=f.t/f.life;if(k>0.65){const s=Math.max(0.001,1-(k-0.65)/0.35);m.scale.setScalar(f.s0*s);}if(f.t>=f.life){if(m.parent)m.parent.remove(m);K1B.fly.splice(i,1);}}}
function k1Chirps(n){try{for(let i=0;i<(n||3);i++)tone(rand(1800,2600),0.07,'sine',0.05,rand(2400,3300),i*0.08);}catch(e){}}
// сбить трофей по номеру удара: 1 — рог, 2 — гнездо с птенцами, 3 — борода
K1B.lose=function(o,n){if(!o||!o.parts||o.k1.lost[n])return;const D=o.parts,s=o.g.scale.x,at=new V3();
  if(n===1){const h=D.hornL;if(!h.visible)return;D.stubL.visible=true;k1Detach(h);h.userData.bl.visible=false;K1B.fly.add(h,new V3(rand(3,5),rand(7,10),rand(2,5)),{life:3.2,spin:new V3(rand(-3,3),rand(-3,3),rand(2,5)),floor:0});
    if(K1B.fx)K1B.fx.leaves(h.position,16);}
  else if(n===2){const g=D.nest;if(!g.visible)return;const ch=g.userData.chicks.slice();g.userData.chicks=[];
    ch.forEach((c,i)=>{k1Detach(c);c.scale.multiplyScalar(1.2);const a=i/ch.length*Math.PI*2+0.6;K1B.fly.add(c,new V3(Math.cos(a)*4.5,rand(6,9),Math.sin(a)*4.5),{air:true,life:3.6,fade:1});});
    k1Detach(g);K1B.fly.add(g,new V3(rand(-3,3),rand(7,9),rand(3,5)),{life:3.4,floor:0});k1Chirps(5);if(K1B.fx)K1B.fx.leaves(g.position,10);}
  else if(n===3){const b=D.beard;if(!b.visible)return;b.updateWorldMatrix(true,false);b.getWorldPosition(at);b.visible=false;
    for(let i=0;i<18;i++){const m=new THREE.Group();k1Dyn(m);fk(m,K=>{K.add(KP.cone(0.12,0.5,5),i%2?K1C.moss:K1C.mossL,tm(0,0,0),{noise:0.02});},{H:0.5});m.scale.setScalar(s*0.55);
      m.position.copy(at).add(new V3(rand(-1,1),rand(-0.8,0.4),rand(-0.4,1.2)));W.group.add(m);K1B.fly.add(m,new V3(rand(-4,4),rand(3,8),rand(1,6)),{life:rand(2.2,3.4),spin:new V3(rand(-6,6),rand(-6,6),rand(-6,6)),bounce:0.2});}
    if(K1B.fx)K1B.fx.leaves(at,12);}
  o.k1.lost[n]=true;};
// удар по макушке (из headHit прототипа): трофей слетает, Леший по-своему реагирует
K1B.onHead=function(n){const c=K1B.cur;if(!c)return;K1B.lose(c.L,n);K1B.emo(c.L,['surprise','hurt','sheepish'][Math.min(2,n-1)],2.4);K1B.cheer('hit');};
/* ---------- руки-коряги: большая ладонь-враг ---------- */
// своё облик `hand` (FL — облики мороков): ладонь на оси `arm` — логика замаха вскидывает пальцы (rotation.x), запястье — на оси группы
FL.hand=(inner)=>{const C=K1C,arm=new THREE.Group(),Y=new V3(0,1,0),QQ=new THREE.Quaternion();arm.position.set(0,0.55,-0.5);inner.add(arm);
  // кость-палец между двумя точками (в координатах оси arm: начало — запястье, земля — y = −0.55)
  const seg=(K,p,q,r0,r1,pal,o)=>{const d=q.clone().sub(p),len=d.length();QQ.setFromUnitVectors(Y,d.clone().divideScalar(len));K.add(KP.cyl(r1,r0,len,5),pal,new THREE.Matrix4().compose(p.clone().add(q).multiplyScalar(0.5),QQ.clone(),new V3(1,1,1)),o);};
  fk(arm,K=>{K.add(hSph(0.55,9,6),C.bark,tm(0,0.02,0.52,0,0,0,1.0,0.58,1.08),{noise:0.03,kN:0.35});   // спинка-купол
    K.add(hSph(0.42,8,6),C.barkL,tm(0,0.12,0.42,0,0,0,1.0,0.4,0.95),{noise:0.02,s:0.15});
    K.add(KP.cyl(0.3,0.38,0.5,8),C.mossD,tm(0,0.08,-0.2,0.7,0,0),{noise:0.03});K.add(KP.tor(0.36,0.08,5,12),C.moss,tm(0,0.02,-0.04,Math.PI/2+0.7,0,0),{noise:0.02});   // манжета из мха
    for(let k=0;k<5;k++){const a=(k-2)*0.4,th=k===0,sc=th?0.8:k===2?1.15:1,sa=Math.sin(a),ca=Math.cos(a);
      const P0=new V3(sa*0.42,-0.12,0.55+ca*0.3),J=P0.clone().add(new V3(sa*0.5*sc,0.3,ca*0.55*sc)),T=J.clone().add(new V3(sa*0.3*sc,-(J.y+0.55),ca*0.4*sc));
      seg(K,P0,J,0.15,0.11,C.bark,{noise:0.02});seg(K,J,T,0.11,0.06,C.bark,{noise:0.02});K.add(hSph(0.15,6,4),C.barkL,tm(J.x,J.y,J.z),{noise:0.015,s:0.1});   // сустав
      K.add(KP.cone(0.07,0.24,4),C.barkD,tm(T.x,T.y+0.05,T.z+0.04,Math.PI,0,0),{s:-0.1});K.add(hIco(0.07),C.leaf,tm(T.x*1.05,T.y+0.3,T.z+0.05),{s:0.2});}   // коготь и листик
    for(let i=0;i<5;i++)K.add(hSph(0.17,6,4),i%2?C.mossL:C.moss,tm(k1hr(i,1,-0.35,0.35),0.22,k1hr(i,2,0.2,0.9),0,0,0,1.2,0.5,1),{noise:0.02});   // мох на спинке
    K.add(KP.cyl(0.035,0.04,0.2,5),C.cream,tm(0.3,0.26,0.25));K.add(hSph(0.12,6,4),C.red,tm(0.3,0.37,0.25,0,0,0,1,0.55,1),{s:0.1});K.add(hIco(0.04),C.white,tm(0.34,0.4,0.31),{kN:0});},{H:1.5});
  const wrist=k1G(inner,0,0.55,-0.5);   // точка, куда крепится рука от плеча
  return {arm,wrist,eyeY:0.9,eyeZ:0.2,top:1.15,eyeS:1.3,lid:C.bark};};
// рука от плеча Лешего к кисти: два звена из трёх-четырёх мховых полос, локоть — наружу и вверх
function k1ArmSeg(r0,r1,seed){const g=new THREE.Group(),C=K1C;fk(g,K=>{K.add(KP.cyl(r1,r0,1,8),C.bark,tm(0,0,0),{noise:0.03});
    for(let i=0;i<5;i++){const a=i*1.3+seed;K.add(hSph(0.34,6,4),i%2?C.mossL:C.moss,tm(Math.sin(a)*r0*0.95,k1hr(i,seed,-0.38,0.38),Math.cos(a)*r0*0.95,0,0,0,1.25,0.7,1.1),{noise:0.02});}
    for(let i=0;i<3;i++){const ph=i*2.4+seed;K.add(KP.cone(0.09,0.5,4),C.barkD,tm(Math.sin(ph)*r0*1.05,k1hr(i,seed+3,-0.3,0.3),Math.cos(ph)*r0*1.05,0,Math.PI/2+ph,Math.PI/2+0.3),{noise:0.01});}},{H:1.5});return g;}
function k1MakeArm(side){const g=new THREE.Group();W.group.add(g);const u=k1ArmSeg(0.85,0.68,side),f=k1ArmSeg(0.68,0.5,side+2),el=new THREE.Group();g.add(u);g.add(f);g.add(el);
  fk(el,K=>{K.add(hSph(0.78,8,6),K1C.barkL,tm(0,0,0),{noise:0.03});K.add(hSph(0.4,6,4),K1C.moss,tm(0,0.5,0.1,0,0,0,1.3,0.7,1),{noise:0.02});},{H:1.5});
  k1Dyn(g);g.visible=false;return {g,u,f,el,side};}
const K1_Y=new V3(0,1,0),K1_A=new V3(),K1_B=new V3(),K1_D=new V3(),K1_P=new V3(),K1_E=new V3(),K1_Q=new THREE.Quaternion();
function k1PlaceSeg(m,a,b){K1_D.subVectors(b,a);const len=K1_D.length()||0.001;m.position.copy(a).add(b).multiplyScalar(0.5);K1_Q.setFromUnitVectors(K1_Y,K1_D.divideScalar(len));m.quaternion.copy(K1_Q);m.scale.set(1,len,1);}
function k1UpdateArms(c){if(!c.arms)return;const F=W.flags,L=c.L;for(const A of c.arms){const e=c.hands.find(h=>h.side===A.side);
    const vis=!!(e&&e.alive&&e.L&&e.L.wrist&&F.phase===1&&!(e.k1bridge&&e.k1bridge.g.parent)&&L&&L.g.visible);A.g.visible=vis;if(!vis)continue;
    const sh=L.rig[A.side>0?'shL':'shR'];sh.getWorldPosition(K1_A);K1_A.y-=0.2;e.L.wrist.getWorldPosition(K1_B);
    const d=K1_A.distanceTo(K1_B),reach=A.reach,half=Math.min(d,reach*2-0.05)/2,h=Math.sqrt(Math.max(0,reach*reach-half*half));
    K1_D.subVectors(K1_B,K1_A).normalize();K1_P.set(A.side*0.9,1,0.5);K1_P.addScaledVector(K1_D,-K1_P.dot(K1_D)).normalize();
    K1_E.copy(K1_A).addScaledVector(K1_D,Math.min(d,reach*2-0.05)/2).addScaledVector(K1_P,h);
    k1PlaceSeg(A.u,K1_A,K1_E);k1PlaceSeg(A.f,K1_E,K1_B);A.el.position.copy(K1_E);}}
/* ---------- мост-рука на плечо: большое бревно-рука с мхом, цветами и светляками ---------- */
K1B.bridge=function(g,from,to,len,hand){const C=K1C,dir=to.clone().sub(from).normalize(),mid=from.clone().add(to).multiplyScalar(0.5);
  const lg=new THREE.Group();lg.position.copy(mid).add(new V3(0,-0.82,0));lg.quaternion.setFromUnitVectors(K1_Y,dir);g.add(lg);
  fk(lg,K=>{K.add(KP.cyl(0.78,0.98,len,9),C.bark,tm(0,0,0),{noise:0.035});for(let i=0;i<Math.ceil(len/1.5);i++){const y=-len/2+0.6+i*1.5;   // кольца-сучья по руке, мох по бокам
      K.add(KP.tor(0.88-0.2*(i/(len/1.5)),0.1,4,10),C.barkD,tm(0,y,0,Math.PI/2,0,0),{noise:0.02});
      for(const s of[-1,1])K.add(hSph(0.34,6,4),i%2?C.mossL:C.moss,tm(s*(0.9-0.15*i/(len/1.5)),y+0.2,k1hr(i,s,-0.2,0.2),0,0,0,1,0.7,1.1),{noise:0.02});}},{H:3});
  const top=k1G(g,0,0,0);top.position.copy(mid).add(new V3(0,0.04,0));top.quaternion.setFromUnitVectors(K1_Y,dir);   // дорожка мха по верху
  fk(top,K=>{K.box(1.15,len*0.97,0.1,C.mossL,tm(0,0,0.0,0,0,0),{b:0.03,amp:0.02});for(let i=0;i<Math.ceil(len/1.2);i++){const y=-len/2+0.5+i*1.2,x=k1hr(i,1,-0.45,0.45);K.add(hIco(0.1),i%3===0?C.pink:i%3===1?C.yellow:C.white,tm(x,y,0.09),{s:0.2});}},{H:3});
  top.rotation.set(0,0,0);top.quaternion.setFromUnitVectors(K1_Y,dir);
  // светляки вдоль дорожки до плеча
  const fl=[];for(let i=0;i<7;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(0.1,6,5),new THREE.MeshBasicMaterial({color:0xfff3a0}));const k=(i+0.5)/7;m.position.copy(from).lerp(to,k).add(new V3(k1hr(i,1,-0.5,0.5),1.0+k1hr(i,2,0,0.6),0));g.add(m);fl.push({m,k,ph:i*0.9});}
  k1Dyn(g);K1B.tick.push(dt=>{if(!g.parent)return false;const t=G.time;fl.forEach(f=>{f.m.position.y=from.y+(to.y-from.y)*f.k+1.0+Math.sin(t*2.2+f.ph)*0.25;f.m.scale.setScalar(0.8+0.4*Math.sin(t*5+f.ph));});return true;});
  if(hand)hand.k1bridge={g};};
/* ---------- двойники: пять нарядов ---------- */
function k1Costume(o,idx){const B=o.rig,C=K1C,add=(bone,g)=>{bone.add(g);k1Dyn(g);return g;};
  if(idx===0){const g=new THREE.Group();g.position.set(0,0.68,0);fk(g,K=>{K.add(KP.tor(0.5,0.06,4,14),C.leafD,tm(0,0,0,Math.PI/2,0,0),{noise:0.02});for(let i=0;i<9;i++){const a=i/9*Math.PI*2;
        for(let j=0;j<6;j++)K.add(hIco(0.075),C.white,tm(Math.sin(a)*0.5+Math.sin(a+Math.PI/2)*Math.sin(j*1.05)*0.09,0.05,Math.cos(a)*0.5+Math.cos(a+Math.PI/2)*Math.sin(j*1.05)*0.09,0,0,0,1,0.4,1),{s:0.3});
        K.add(hIco(0.07),C.yellow,tm(Math.sin(a)*0.5,0.08,Math.cos(a)*0.5),{s:0.2,kN:0});}
      for(const s of[-1,1]){K.add(KP.cone(0.05,0.9,4),C.pink,tm(s*0.42,-0.4,-0.3,0,0,s*0.2),{kN:0.1});}},{H:1});add(B.head,g);}   // венок из ромашек и две ленты
  else if(idx===1){const g=new THREE.Group();g.position.set(0,0.64,0);fk(g,K=>{K.add(hSph(0.85,10,6),C.red,tm(0,0.1,0,0,0,0,1,0.55,1),{noise:0.015});K.add(KP.cyl(0.56,0.62,0.12,10),C.cream,tm(0,0.02,0));
      for(let i=0;i<10;i++){const a=i*2.3,y=0.2+k1hr(i,1,0.12,0.42);K.add(hIco(0.1),C.white,tm(Math.sin(a)*0.72*(1-y*0.6),y+0.05,Math.cos(a)*0.72*(1-y*0.6)),{kN:0,s:0.3});}},{H:1});add(B.head,g);}   // колпак-мухомор
  else if(idx===2){const g=new THREE.Group();g.position.set(0.05,-0.55,0.2);fk(g,K=>{K.add(KP.cyl(0.46,0.34,0.5,10),C.straw,tm(0,0,0),{noise:0.02});K.add(KP.tor(0.46,0.05,4,12),C.brown,tm(0,0.25,0,Math.PI/2,0,0));
      for(let i=0;i<8;i++)K.box(0.05,0.5,0.03,C.brown,tm(Math.sin(i/8*6.28)*0.4,0,Math.cos(i/8*6.28)*0.4,0,i/8*6.28,0),{b:0.005});K.add(KP.tor(0.38,0.04,4,10,Math.PI),C.brown,tm(0,0.25,0,0,Math.PI/2,0,1,1.3,1));
      for(let i=0;i<3;i++){K.add(KP.cyl(0.04,0.05,0.2,5),C.cream,tm(-0.2+i*0.2,0.38,0.05));K.add(hSph(0.13,6,4),i===1?C.red:C.brown,tm(-0.2+i*0.2,0.5,0.05,0,0,0,1,0.55,1),{s:0.1});}
      for(let i=0;i<5;i++)K.add(hIco(0.06),C.rowan,tm(k1hr(i,1,-0.3,0.3),0.34,k1hr(i,2,-0.2,0.2)),{s:0.2});},{H:1});add(B.handR,g);}   // корзинка с грибами и рябиной
  else if(idx===3){const g=new THREE.Group();g.position.set(0.85,0.5,0.15);fk(g,K=>{K.add(hIco(0.3),C.orange,tm(0,0,0,0.5,0,0,0.8,1.1,1),{noise:0.01,s:0.1});K.add(hIco(0.2),C.orange,tm(0,0.38,0.14),{s:0.1});K.add(hIco(0.12),C.cream,tm(0,0.28,0.26),{s:0.1});
      for(const s of[-1,1]){K.add(KP.cone(0.06,0.2,4),C.orange,tm(s*0.1,0.62,0.12,0,0,-s*0.2));K.add(hIco(0.025),C.night,tm(s*0.09,0.43,0.31),{kN:0,s:-0.5});}
      for(let i=0;i<5;i++)K.add(hIco(0.22-i*0.025),i%2?C.orange:C.yellow,tm(0,0.1+i*0.25,-0.3-Math.sin(i*0.7)*0.26+i*0.02,0,0,0,1,1.1,1),{noise:0.01,s:0.1});   // хвост дугой
      K.add(hIco(0.08),C.brown,tm(0.1,0.1,0.34),{s:0.1});},{H:1});add(B.chest,g);}   // белка на плече с жёлудем
  else{const g=new THREE.Group();g.position.set(0,0.35,0);fk(g,K=>{for(let i=0;i<16;i++){const a=i/16*Math.PI*2;K.add(KP.cone(0.07,0.2,5),C.brown,tm(Math.sin(a)*0.78,-0.25-Math.abs(Math.sin(a))*0.05,Math.cos(a)*0.62,Math.PI*0.5,0,0,1,1,1),{noise:0.01,s:0.1});K.add(hIco(0.1),C.brown,tm(Math.sin(a)*0.74,-0.1,Math.cos(a)*0.6),{s:0.1});}
      K.add(hIco(0.2),C.pink,tm(0,-0.1,0.78),{s:0.2});for(const s of[-1,1]){K.add(KP.cone(0.2,0.42,4),C.pink,tm(s*0.28,-0.1,0.78,0,0,s*Math.PI/2),{s:0.2});}
      K.add(KP.cone(0.06,0.7,4),C.yellow,tm(0.12,0.26,0.7,0,0,0.3));K.add(KP.cone(0.06,0.7,4),C.blue,tm(-0.12,0.26,0.7,0,0,-0.3));},{H:1});add(B.chest,g);}   // бусы из шишек и бант
}
// дымок у ног двойника: мягкие облачка вокруг подола
function k1Smoke(g,scale){const sp=[];for(let i=0;i<6;i++){const m=new THREE.Sprite(new THREE.SpriteMaterial({map:K1_SOFT,color:0xb8e0b0,transparent:true,opacity:0.5,depthWrite:false}));m.userData.noBatch=true;const a=i/6*Math.PI*2;
    m.position.set(Math.sin(a)*1.9,0.4,Math.cos(a)*1.9);m.scale.setScalar(2.6);g.add(m);sp.push({m,a,ph:i*1.1});}
  K1B.tick.push(dt=>{if(!g.parent)return false;const t=G.time;sp.forEach(s=>{s.m.position.y=0.4+((t*0.5+s.ph)%1)*1.2;s.m.material.opacity=0.45*(1-((t*0.5+s.ph)%1));s.m.position.x=Math.sin(s.a+t*0.3)*1.9;s.m.position.z=Math.cos(s.a+t*0.3)*1.9;});return true;});}
K1B.double=function(i,n,real,round){const R=k1Build(),eye=new THREE.MeshLambertMaterial({vertexColors:true,skinning:true,emissive:0xc8ff40,emissiveIntensity:1.3});
  const o=castMake(R,{e:eye}),B=o.rig;o.g.scale.setScalar(1.35);B.shL.rotation.z=0.3;B.shR.rotation.z=-0.3;   // двойники крупнее прежних (×1,05), чтобы читались наряды
  const hands=[['L',1],['R',-1]].map(([nn,s])=>({sh:B['sh'+nn],hand:B['hand'+nn],s}));
  const D={hornL:k1Horn(1),hornR:k1Horn(-1),nest:null,beard:k1Beard()};D.hornL.position.set(0.42,0.55,0);D.hornR.position.set(-0.42,0.55,0);D.beard.position.set(0,-0.38,0.4);
  for(const k in D)if(D[k])B.head.add(D[k]);k1Costume(o,((i||0)+(round||0)*2)%5);k1Dyn(o.g);
  // настоящий — со своей тенью; у двойников теней нет, у ног дымок
  o.g.traverse(c=>{if(c.isMesh||c.isSkinnedMesh)c.castShadow=!!real;});if(!real)k1Smoke(o.g,1);
  Object.assign(o,{head:B.head,hands,eye,parts:D,k1:k1State('sly')});o.k1.real=!!real;o.k1.lost={};o.k1.t=k1hr(i||0,7,0,6);
  return castReg(o,{hs:3,tick:k1Tick});};
/* ---------- лешачата-зрители ---------- */
K1B.crowd=function(C,R,n){const list=[];
  for(let i=0;i<n;i++){const ang=-Math.PI/2+(i-(n-1)/2)*0.49+(i%2?0.06:-0.05),rr=R+0.1+(i%3)*0.3,x=C.x+Math.cos(ang)*rr,z=C.z+Math.sin(ang)*rr;   // дуга по краю поляны у ёлок, юг — проход героев
    const g=new THREE.Group();g.position.set(x,0,z);W.group.add(g);const inner=new THREE.Group();inner.scale.setScalar(1.7);g.add(inner);
    const L=foeLook('leshonok',inner,FOE.leshonok),em=M(0xfff3a0,{emissive:0xfff3a0,emissiveIntensity:1});
    for(const sd of[-1,1]){part(inner,new THREE.SphereGeometry(0.1,10,8),em,sd*0.16,L.eyeY,L.eyeZ);part(inner,new THREE.SphereGeometry(0.045,8,6),MAT.dark,sd*0.16,L.eyeY,L.eyeZ+0.09);}
    g.rotation.y=Math.atan2(C.x-x,C.z-z);k1Dyn(g);list.push({g,inner,L,x,z,ph:i*1.7,react:null,hide:0,base:g.rotation.y});}
  K1B.crowdL=list;return list;};
function k1CrowdTick(dt){const l=K1B.crowdL;if(!l)return;const t=G.time;for(const q of l){if(!q.g.parent){K1B.crowdL=null;return;}
    let y=Math.abs(Math.sin(t*1.3+q.ph))*0.05,r=q.react;if(r){r.t+=dt;if(r.kind==='hit'){y+=Math.abs(Math.sin(r.t*9))*0.6*Math.max(0,1-r.t/1.1);q.L.hat&&(q.L.hat.rotation.z=Math.sin(r.t*14)*0.3*Math.max(0,1-r.t/1.1));if(r.t>1.1)q.react=null;}
      else if(r.kind==='clap'){y+=Math.abs(Math.sin(r.t*7+q.ph))*0.45;q.g.rotation.y=q.base+Math.sin(r.t*5+q.ph)*0.25;if(r.t>r.len)q.react=null;}
      else if(r.kind==='duck'){y-=0.55*Math.min(1,r.t*5)*(r.t<r.len?1:Math.max(0,1-(r.t-r.len)*3));if(r.t>r.len+0.4)q.react=null;}}
    q.g.position.y=y;if(!r||r.kind!=='clap')q.g.rotation.y=q.base+Math.sin(t*0.6+q.ph)*0.12;}}
K1B.cheer=function(kind,len){if(!K1B.crowdL)return;K1B.crowdL.forEach((q,i)=>{const d=kind==='hit'?i*0.05:0;later(d,()=>{q.react={kind,t:0,len:len||1.2};});});};
/* ---------- запуск уровня: Леший, руки, зрители ---------- */
K1B.init=function(ctx){K1B.cur=ctx;K1B.fly.length=0;K1B.tick.length=0;ctx.arms=[1,-1].map(s=>{const A=k1MakeArm(s);A.reach=5.4;return A;});
  K1B.crowd(ctx.C,ctx.R,10);if(K1B.fx&&K1B.fx.init)K1B.fx.init(ctx);};
{const _ll=loadLevel;loadLevel=function(i){K1B.cur=null;K1B.crowdL=null;K1B.fly.length=0;K1B.tick.length=0;_ll(i);};}
{const _st=step;step=function(dt){_st(dt);const c=K1B.cur;if(!c||!W||W.levelId!=='1-B')return;try{
    c.hands=W.enemies.filter(e=>e.kind==='hand');c.hands.forEach(e=>{e.side=e.side||(e.home.x<0?-1:1);});k1UpdateArms(c);k1FlyTick(dt);k1CrowdTick(dt);
    for(let i=K1B.tick.length-1;i>=0;i--){if(K1B.tick[i](dt)===false)K1B.tick.splice(i,1);}}catch(e){console.error('k1b',e);K1B.cur=null;}};}
