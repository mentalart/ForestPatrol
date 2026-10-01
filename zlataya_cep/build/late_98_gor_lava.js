/* ============================== РЕЛИЗ final06 · 4-Б «ЗМЕЙ ГОРЫНЫЧ»: АРЕНА ПО РЕФЕРЕНСУ, РЫК И ЛАВА, БОЛЬШОЙ ВДОХ, СЛАБОЕ МЕСТО ============================== */
// 1) Арена (референс GorinichPerebivka): круг из каменных плит с резным красным узором на скальном острове посреди лавы, кольцо
//    базальтовых глыб с огненными трещинами, лавовые жерла по краю, скала-трон под туловищем, столбы-скалы и корка в лавовом море,
//    лавопады за Горынычем. Только облик: квадратная земля, круглый пол и камни прототипа спрятаны, коллизии прежние (tfin_col).
// 2) Рык: левая и правая головы в Пробое (конец фазы 1) — ролик: боковые валятся, средняя встаёт на дыбы и рычит, по плитам бегут
//    лавовые трещины, по краю бьют огненные гейзеры, небо краснеет. Трещины, гейзеры и искры остаются до конца боя.
// 3) Большой вдох (фаза 2): «Вдо-о-ох!» звучит в 4 раза реже — только с большим вдохом (второй вдох фазы, дальше каждый четвёртый).
//    Все головы втягивают воздух (3,2 с), героев тащит к средней голове; со щитом — в 2,5 раза слабее (за широким щитом Потапа — тоже),
//    против тяги шагается вдвое медленнее; в одиночке напарника не тянет.
//    Дотащило до пасти — «Ам!»: лепесток и отлёт назад. Жёлудь Прошки в пасть средней обрывает вдох. Остальные вдохи — тихие.
// 4) Совиный взор — слабое место: Пелагея находит на голове перед собой светящуюся чешуйку (6 с, кольцо-таймер, луч, стрелка, звон);
//    удар по ней — сразу Пробой, даже сытой голове. Взор отдыхает 12 с (в одиночку — 9 с: две боковые за 12 с Пробоя успевает один). Логику прототипа модуль не переписывает: подключён заменами
//    в rep_30 (W.gor4L — части боя, FIN.gor4.roar — рык перед фазой 2, FIN.gor4.inhale — каждый вдох).
const G4={demoT:0,roared:false,mode:null,cineT:0,rv:0,revOn:false,lava:0,pull:0,pullT:0,cyc:0,big:0,geyOn:false,geyT:2,env:null,weak:[],owlSaid:false,pullTold:false,
  stats:{roar:0,pulls:0,bites:0,owl:0,weak:0,weakHits:0,inhales:0}};FIN.gor4=G4;
const G4C=new V3(0,0,-6),G4LY=-0.8;
const g4On=()=>W&&W.levelId==='4-B';
const g4Heads=()=>W.gor4L?W.gor4L.heads():[];
const g4Top=e=>{const p=new V3();(e.L&&e.L.head?e.L.head:e.g).getWorldPosition(p);return p;};
const g4Mouth=e=>{const p=g4Top(e);p.y-=0.2;p.x+=Math.sin(e.face)*1.05;p.z+=Math.cos(e.face)*1.05;return p;};
const g4Awake=e=>e&&e.alive&&e.state!=='broken'&&e.state!=='dying';
const g4K=(t,a,b)=>Math.max(0,Math.min(1,(t-a)/(b-a)));
// ---------- звук: всё синтезом, через общий регулятор «Звуки» ----------
const G4S={
  roar(){if(!AUD.ready())return;[66,73,101].forEach((f,i)=>AUD.osc({type:'sawtooth',f0:f,f1:f*1.4,glide:0.45,d:2.1,v:0.085,a:0.1,lp:600,lp1:2400,trem:23+i*6,vib:0.035,vibF:6,wet:0.5,at:i*0.02}));
    AUD.nz({f0:380,f1:1500,f2:520,d:2.2,q:1.2,v:0.17,a:0.12,wet:0.5,shape:'hold'});AUD.nz({type:'highpass',f0:2600,d:1.9,v:0.035,a:0.35,wet:0.45});AUD.thump({f0:64,f1:28,d:1.8,v:0.32});},
  rumble(){if(!AUD.ready())return;AUD.nz({type:'lowpass',f0:160,f1:520,f2:140,d:2.6,q:0.7,v:0.22,a:0.3,wet:0.35});AUD.thump({f0:90,f1:34,d:1.2,v:0.3,at:0.1});
    for(let i=0;i<7;i++)AUD.nz({f0:rand(900,2200),d:0.06,q:2,v:0.05,a:0.003,at:0.2+i*rand(0.12,0.3)});},
  slam(){if(!AUD.ready())return;AUD.thump({f0:120,f1:40,d:0.4,v:0.34});AUD.nz({type:'lowpass',f0:1800,f1:200,d:0.5,v:0.14,a:0.004,wet:0.25});},
  geyser(v){if(!AUD.ready())return;v=v||1;AUD.nz({f0:260,f1:1700,f2:420,d:1.0,q:0.8,v:0.07*v,a:0.06,wet:0.3,pan0:rand(-0.6,0.6)});AUD.thump({f0:110,f1:45,d:0.3,v:0.12*v});},
  inhaleBig(){if(!AUD.ready())return;AUD.nz({f0:220,f1:2300,d:3.6,q:1.5,v:0.13,a:2.8,wet:0.35,shape:'hold'});AUD.osc({type:'sawtooth',f0:48,f1:96,glide:3.2,d:3.6,v:0.05,a:2,lp:300,lp1:900,trem:9,wet:0.3});},
  inhaleSmall(){if(!AUD.ready())return;AUD.nz({f0:300,f1:1500,d:1.7,q:1.8,v:0.06,a:1.3,wet:0.25});},
  bite(){if(!AUD.ready())return;AUD.thump({f0:150,f1:50,d:0.28,v:0.3});AUD.nz({type:'lowpass',f0:2400,f1:300,d:0.3,v:0.14,a:0.004});AUD.osc({type:'square',f0:520,f1:160,d:0.16,v:0.05,lp:1600,at:0.05});},
  weak(){if(!AUD.ready())return;AUD.bell(1760,{v:0.06,d:1.3,wet:0.6});AUD.bell(2637,{v:0.04,d:1.1,at:0.08,wet:0.6});AUD.bell(3520,{v:0.025,d:0.9,at:0.16,wet:0.6});AUD.nz({type:'highpass',f0:5200,d:0.8,v:0.02,a:0.05,wet:0.6});},
  weakHit(){if(!AUD.ready())return;AUD.nz({type:'highpass',f0:3000,f1:900,d:0.35,v:0.16,a:0.003,wet:0.4});[2093,1568,1175,880].forEach((f,i)=>AUD.bell(f,{v:0.05,d:0.7,at:i*0.05,wet:0.5}));AUD.thump({f0:140,f1:48,d:0.3,v:0.3});},
  fade(){if(!AUD.ready())return;AUD.osc({type:'triangle',f0:900,f1:420,d:0.4,v:0.04,wet:0.3});}};
// ---------- материалы ----------
// трещины: свечение бежит от пасти средней головы (aD — путь вдоль трещины, 0…1; uRev — докуда открылись)
const G4U={rev:{value:0},lava:{value:0}};
FIN.fxHook.g4crack=(sh)=>{sh.uniforms.uRev=G4U.rev;sh.uniforms.uTime=FIN.U.time;
  sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nattribute float aD;\nvarying float vD;').replace('#include <begin_vertex>','#include <begin_vertex>\n\tvD = aD;');
  sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nuniform float uRev;\nuniform float uTime;\nvarying float vD;').replace('vec3 totalEmissiveRadiance = emissive;',
    'if( vD > uRev ) discard;\n\tvec3 totalEmissiveRadiance = emissive * ( 0.72 + 0.3 * sin( vD * 46.0 - uTime * 3.2 ) + 1.4 * smoothstep( uRev - 0.06, uRev, vD ) * step( uRev, 0.999 ) );');};
// лавопад: полосы бегут вниз
FIN.fxHook.g4fall=(sh)=>{sh.uniforms.uTime=FIN.U.time;
  sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying float vFy;').replace('#include <begin_vertex>','#include <begin_vertex>\n\tvFy = position.y;');
  sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nuniform float uTime;\nvarying float vFy;').replace('vec3 totalEmissiveRadiance = emissive;',
    'vec3 totalEmissiveRadiance = emissive * ( 0.68 + 0.32 * sin( vFy * 2.4 + uTime * 6.5 ) + 0.16 * sin( vFy * 7.1 + uTime * 10.0 ) );');};
function g4Mat(fx,col,em,ei,o){const m=new FIN.LowPolyMat(Object.assign({color:col,emissive:em,emissiveIntensity:ei},o||{}));m.userData.fx=fx;m.userData.noOcc=true;m.userData.shared=true;return m;}
const G4M={};
function g4Mats(){if(G4M.crack)return G4M;G4M.crack=g4Mat('g4crack',0x3a0c04,0xff8a24,1.7);G4M.crackH=g4Mat('g4crack',0x3a1408,0xc83c10,0.55,{transparent:true,opacity:0.7,depthWrite:false});G4M.fall=g4Mat('g4fall',0x8a2004,0xff7a1a,1.25,{side:THREE.DoubleSide});
  G4M.blob=new THREE.MeshBasicMaterial({color:0xffffff,toneMapped:false});G4M.streak=new THREE.MeshBasicMaterial({color:0xfff2dc,transparent:true,opacity:0.68,depthWrite:false});
  G4M.ring=new THREE.MeshBasicMaterial({color:0xffe6c0,transparent:true,opacity:0.4,depthWrite:false,side:THREE.DoubleSide});
  G4M.col=new THREE.MeshBasicMaterial({color:0xffa030,transparent:true,opacity:0.85,depthWrite:false,toneMapped:false});
  G4M.weak=new THREE.MeshBasicMaterial({color:0xd9a8ff,transparent:true,opacity:0.95,depthTest:false,depthWrite:false,fog:false,toneMapped:false});
  G4M.weakC=new THREE.MeshBasicMaterial({color:0xf4e4ff,transparent:true,opacity:1,depthTest:false,depthWrite:false,fog:false,toneMapped:false});
  G4M.beam=new THREE.MeshBasicMaterial({color:0xc890ff,transparent:true,opacity:0.6,depthWrite:false,fog:false,toneMapped:false});
  G4M.glow=new THREE.MeshBasicMaterial({color:0xffb040,transparent:true,opacity:0.9,toneMapped:false});
  for(const k in G4M)G4M[k].userData.shared=true;return G4M;}
function g4Static(geo,mat,o){const m=new THREE.Mesh(geo,mat||KMAT.vc);m.receiveShadow=!(o&&o.noRecv);m.castShadow=!!(o&&o.shadow);m.userData.dress=true;m.userData.sty=true;if(o&&o.live){m.userData.noBatch=true;}W.group.add(m);return m;}
// ---------- арена ----------
function g4HideProto(){const bb=new THREE.Box3(),sz=new V3(),c=new V3();let n=0;
  for(const m of W.group.children){if(!m.isMesh||m.userData.g4)continue;bb.setFromObject(m);bb.getSize(sz);bb.getCenter(c);
    const ground=(m.userData.gtop||m.userData.gside)&&Math.abs(sz.x-30)<0.6&&Math.abs(sz.z-34)<0.6;                     // квадратная земля
    const floor=Math.abs(sz.x-25)<0.3&&Math.abs(sz.z-25)<0.3&&Math.abs(c.x)<0.1&&Math.abs(c.z+6)<0.1&&sz.y<0.6;          // круглый пол
    const skirt=m.userData.dress&&!m.isInstancedMesh&&Math.abs(sz.x-30.4)<1.2&&Math.abs(sz.z-34.2)<1.2&&c.y<1;          // обрыв-юбка вокруг квадрата
    const rock=Math.abs(Math.hypot(m.position.x-G4C.x,m.position.z-G4C.z)-13.5)<0.08&&Math.abs(m.position.y-0.3)<0.02&&sz.x<4.5; // 14 камней по краю
    const ledge=Math.abs(sz.x-16.1)<0.3&&Math.abs(sz.y-2.2)<0.2&&Math.abs(sz.z-8.6)<0.3&&Math.abs(c.z+19.75)<0.2;                // ящик-уступ под туловищем
    if(ground||floor||skirt||rock||ledge){m.visible=false;m.userData.g4hid=true;n++;}}return n;}
function g4Floor(){const R=kRng(4401),K=new KGeo(1,4401);K.vary=false;
  // плиты: кольца, в каждом — сектора с зазором (зазор — тёмный камень острова под ними)
  const rings=[[0,2.3,1],[2.3,4.6,9],[4.6,6.9,14],[6.9,9.2,20],[9.2,11.0,26],[11.0,12.6,30]];
  for(const [r0,r1,n] of rings){if(n===1){K.add(new THREE.CircleGeometry(r1-0.05,16),PAL.cliff,tm(0,0,0,-Math.PI/2,0,0),{kN:0,kG:0,kJ:0.05,s:-0.4});continue;}
    const off=R()*6.28;for(let i=0;i<n;i++){const a0=off+i/n*Math.PI*2+0.012*(12/r1),da=Math.PI*2/n-0.024*(12/r1);
      K.add(new THREE.RingGeometry(r0+0.05,r1-0.05,Math.max(2,Math.round(da*r1/1.1)),1,a0,da),PAL.cliff,tm(0,(R()-0.5)*0.012,0,-Math.PI/2,0,0),{kN:0,kG:0,kJ:0.06,s:-0.3-R()*0.4});}}
  const slabs=g4Static(K.build(),KMAT.vc);slabs.position.set(G4C.x,0.03,G4C.z);slabs.userData.g4=true;
  // резной узор: обводы колец, звезда в середине, «лепестки» между кругами
  const O=new KGeo(1,4402);O.vary=false;const red=PAL.roofR;
  for(const [r,w] of [[2.3,0.12],[2.62,0.06],[6.9,0.1],[7.22,0.06],[11.0,0.12],[11.34,0.06]])O.add(new THREE.RingGeometry(r-w/2,r+w/2,64,1),red,tm(0,0,0,-Math.PI/2,0,0),{kN:0,kG:0,kJ:0.02,s:-0.95});
  {const s=new THREE.Shape();for(let i=0;i<16;i++){const a=i/16*Math.PI*2,r=i%2?0.75:1.95;if(i)s.lineTo(Math.cos(a)*r,Math.sin(a)*r);else s.moveTo(Math.cos(a)*r,Math.sin(a)*r);}
    O.add(new THREE.ShapeGeometry(s),red,tm(0,0,0,-Math.PI/2,0,0),{kN:0,kG:0,kJ:0.02,s:-0.85});O.add(new THREE.CircleGeometry(0.42,12),PAL.cliff,tm(0,0.004,0,-Math.PI/2,0,0),{kN:0,kG:0,s:-0.1});}
  for(let i=0;i<16;i++){const a=i/16*Math.PI*2+Math.PI/16;const s=new THREE.Shape();s.moveTo(0,-0.5);s.lineTo(1.25,0);s.lineTo(0,0.5);s.lineTo(-1.25,0);s.lineTo(0,-0.5);
    const h=new THREE.Path();h.moveTo(0,-0.22);h.lineTo(-0.6,0);h.lineTo(0,0.22);h.lineTo(0.6,0);h.lineTo(0,-0.22);s.holes.push(h);
    O.add(new THREE.ShapeGeometry(s),red,tm(Math.cos(a)*9.1,0,-Math.sin(a)*9.1,-Math.PI/2,0,a),{kN:0,kG:0,kJ:0.02,s:-0.9});
    O.add(new THREE.CircleGeometry(0.16,6),red,tm(Math.cos(a+Math.PI/16)*4.75,0,-Math.sin(a+Math.PI/16)*4.75,-Math.PI/2,0,0),{kN:0,kG:0,s:-0.95});}
  const orn=g4Static(O.build(),KMAT.vc,{noRecv:false});orn.position.set(G4C.x,0.042,G4C.z);orn.userData.g4=true;}
function g4Island(){const K=new KGeo(4,4410);K.vary=false;const R0=kRng(4415);
  // остров под ареной: верх ровный (под плитами), бока — рваный базальт, внизу — у лавы светится кайма
  K.add(KP.cyl(14.6,16.4,4.4,26),PAL.basalt,tm(0,-2.21,0),{noise:0.38,flat:true,kN:0.5,kG:0.55,kJ:0.16,s:-0.3});
  const isl=g4Static(K.build(),KMAT.vc);isl.position.set(G4C.x,0,G4C.z);isl.userData.g4=true;
  // скала-трон под уступом с туловищем
  const T=new KGeo(5,4411);T.vary=false;T.box(19,5.2,10.5,PAL.basalt,tm(0,-2.6,0),{b:0.6,amp:0.4,cell:1.6,kN:0.5,kG:0.5,kJ:0.16,s:-0.35});
  T.box(16.2,2.3,8.7,PAL.basalt,tm(0,1.12,0.05),{b:0.35,amp:0.12,cell:1.2,kN:0.55,kG:0.45,kJ:0.16,s:-0.2});
  const TG=new KGeo(1,4414);TG.vary=false;for(let i=0;i<7;i++)g4GlowStrip(TG,-7+i*2.3+(R0()-0.5),0.6+R0()*1.2,4.42,0.12,0,0.12),TG.add(KP.cyl(0.06,0.08,1.5+R0(),4),PAL.lava,tm(-7+i*2.3+(R0()-0.5)*0.6,1.0,4.43,0,0,(R0()-0.5)*0.5),{kN:0,kG:0,kJ:0.1});
  const R=kRng(4412);for(let i=0;i<9;i++){const x=-9+i*2.25+(R()-0.5),s=1+R()*1.1;T.add(KP.dod(1),PAL.basalt,tm(x,1.2+R()*0.9,-4.6-R()*0.8,R(),R()*6,R(),s*1.2,s*1.5,s),{noise:0.08,kN:0.6,kJ:0.16,s:-0.1});}
  for(const sd of[-1,1])for(let k=0;k<3;k++){const s=1.1+k*0.35;T.add(KP.dod(1),PAL.basalt,tm(sd*(9.6+k*0.6),0.5+k*0.5,-2.6+k*1.6,R(),R()*6,R(),s*1.3,s*1.2,s),{noise:0.08,kN:0.6,kJ:0.16,s:-0.15});}
  const th=g4Static(T.build(),KMAT.vc,{shadow:true});th.position.set(0,0,-19.8);th.userData.g4=true;const tg=g4Static(TG.build(),KMAT.glow,{noRecv:true});tg.position.set(0,0,-19.8);tg.userData.g4=true;
  // кайма лавы у острова и у трона
  const L=new KGeo(1,4413);L.vary=false;L.add(new THREE.RingGeometry(15.4,16.8,40,1),PAL.lava,tm(0,0,0,-Math.PI/2,0,0),{kN:0,kG:0,kJ:0.08,s:0});
  const lg=g4Static(L.build(),KMAT.glow,{noRecv:true});lg.position.set(G4C.x,G4LY+0.04,G4C.z);lg.userData.g4=true;}
// трещины с огнём на камнях: тонкие полоски на верхних гранях
function g4GlowStrip(K,x,y,z,len,ry,w){K.box(len,0.08,w||0.09,PAL.lava,tm(x,y,z,0,ry,0),{b:0.01,kN:0,kG:0,kJ:0.05,s:0.25});}
function g4Rim(){const R=kRng(4420),B=new KGeo(2,4420),Gw=new KGeo(1,4421);B.vary=false;Gw.vary=false;const vents=[];
  // кольцо базальтовых глыб по краю; спереди (к камере) — ниже, чтобы не закрывать героев
  const n=26;for(let i=0;i<n;i++){const a=i/n*Math.PI*2+(R()-0.5)*0.12,x=Math.cos(a),z=Math.sin(a);if(z<-0.82)continue;   // сзади — уступ с туловищем
    const front=z>0.35,r=13.5+R()*0.8,s=front?0.6+R()*0.3:0.85+R()*0.6,px=G4C.x+x*r,pz=G4C.z+z*r;
    B.add(KP.dod(1),PAL.basalt,tm(px,s*0.45,pz,R()*0.6,R()*6,R()*0.6,s*(1.3+R()*0.5),s*(front?0.75:1.15+R()*0.4),s*(1.2+R()*0.4)),{noise:0.1,kN:0.55,kG:0.4,kJ:0.18,s:-0.45});
    for(let q=0;q<(front?1:2);q++)if(R()<0.85)g4GlowStrip(Gw,px+(R()-0.5)*0.7,s*(front?0.9:1.25)+q*0.05,pz+(R()-0.5)*0.7,0.5+R()*0.9,R()*3,0.1);
    if(R()<0.5)B.add(KP.dod(1),PAL.basalt,tm(px+x*1.2,0.15,pz+z*1.2,R(),R()*6,R(),0.5+R()*0.4,0.35,0.5+R()*0.4),{noise:0.05,kN:0.6,kJ:0.16,s:-0.1});
    if(i%2===1&&z<0.8)vents.push(new V3(G4C.x+Math.cos(a+Math.PI/n)*13.7,0.02,G4C.z+Math.sin(a+Math.PI/n)*13.7));}
  // жерла: светящиеся лужицы между глыбами
  for(const v of vents){Gw.add(new THREE.CircleGeometry(0.62,10),PAL.lava,tm(v.x,0.03,v.z,-Math.PI/2,0,0),{kN:0,kG:0,kJ:0.1,s:0.1});
    for(let k=0;k<6;k++){const a=k/6*6.28;B.add(KP.dod(0.3),PAL.basalt,tm(v.x+Math.cos(a)*0.75,0.1,v.z+Math.sin(a)*0.75,R(),R()*6,R(),1,0.6,1),{noise:0.03,kN:0.6,kJ:0.15});}}
  const rocks=g4Static(B.build(),KMAT.vc,{shadow:true});rocks.userData.g4=true;
  const gl=g4Static(Gw.build(),KMAT.glow,{noRecv:true});gl.userData.g4=true;return vents;}
function g4Far(){const R=kRng(4430),K=new KGeo(9,4430),Gl=new KGeo(1,4431),Cr=new KGeo(1,4432);K.vary=false;Gl.vary=false;Cr.vary=false;
  // столбы-скалы в лавовом море (за ареной и по бокам, не перед камерой)
  const spots=[[-24,-30],[-34,-18],[-20,-46],[-40,-38],[26,-28],[36,-14],[22,-48],[42,-40],[-30,0],[32,2],[-8,-58],[10,-60],[-48,-8],[50,-6]];
  for(const [x,z] of spots){const h0=4+R()*9,r0=2.2+R()*2.4;let y=G4LY-0.6;const segs=3+Math.floor(R()*2);
    for(let i=0;i<segs;i++){const h=h0/segs*(0.8+R()*0.4),r=r0*(1-i*0.14);K.add(KP.cyl(r*0.9,r,h,6+(i%2)),PAL.basalt,tm(x+(R()-0.5)*0.4,y+h/2,z+(R()-0.5)*0.4,0,R()*6,0),{noise:0.22,kN:0.55,kG:0.45,kJ:0.16,s:i%2?-0.55:-0.35});y+=h;}
    for(let q=0;q<2;q++){const a=R()*6.28;g4GlowStrip(Gl,x+Math.cos(a)*r0*0.9,G4LY+0.3+R()*h0*0.7,z+Math.sin(a)*r0*0.9,0.12,0,0.12);Gl.add(KP.cyl(0.09,0.12,h0*0.5,4),PAL.lava,tm(x+Math.cos(a)*r0*0.92,G4LY+h0*0.3,z+Math.sin(a)*r0*0.92),{kN:0,kG:0,kJ:0.1,s:0});}
    Gl.add(new THREE.RingGeometry(r0*1.02,r0*1.35,12,1),PAL.lava,tm(x,G4LY+0.05,z,-Math.PI/2,0,0),{kN:0,kG:0,kJ:0.1,s:-0.15});}
  // корка на лаве: тёмные плиты
  for(let i=0;i<46;i++){const a=R()*6.28,r=19+R()*38,x=G4C.x+Math.cos(a)*r,z=G4C.z+Math.sin(a)*r*0.9;if(z>12)continue;const s=1+R()*2.6;
    Cr.add(KP.cyl(s,s*1.1,0.2,5+Math.floor(R()*3)),PAL.basalt,tm(x,G4LY+0.06,z,0,R()*6,0,1,1,0.6+R()*0.5),{noise:0.12,flat:true,kN:0.4,kJ:0.2,s:-0.6});}
  // утёсы с лавопадами за Горынычем
  const falls=[];for(const [x,z,w,h] of [[-19,-42,12,15],[0,-50,14,19],[19,-42,12,15]]){let y=G4LY-1;for(let i=0;i<3;i++){const hh=h/3*(0.9+R()*0.2);K.box(w*(1-i*0.12),hh,6,PAL.basalt,tm(x+(R()-0.5),y+hh/2,z-i*0.6),{b:0.5,amp:0.35,cell:1.4,kN:0.55,kG:0.5,kJ:0.16,s:-0.45});y+=hh;}
    for(let k=0;k<2;k++)falls.push({x:x+(k?1:-1)*w*0.22+(R()-0.5),z:z+3.05,h:h*(0.82+R()*0.12),w:1.3+R()*0.8});}
  const st=g4Static(K.build(),KMAT.vc);st.userData.g4=true;g4Static(Gl.build(),KMAT.glow,{noRecv:true}).userData.g4=true;g4Static(Cr.build(),KMAT.vc).userData.g4=true;
  const M4=g4Mats();for(const f of falls){const g=new THREE.PlaneGeometry(f.w,f.h,1,12);const m=g4Static(g,M4.fall,{live:true,noRecv:true});m.position.set(f.x,G4LY+f.h/2-0.2,f.z);m.userData.g4=true;
    const pool=new KGeo(1,4433);pool.vary=false;pool.add(new THREE.CircleGeometry(f.w*1.4,10),PAL.lava,tm(0,0,0,-Math.PI/2,0,0),{kN:0,kG:0,s:0.6});const pm=g4Static(pool.build(),KMAT.glow,{noRecv:true});pm.position.set(f.x,G4LY+0.07,f.z+0.8);pm.userData.g4=true;}}
// лавовые трещины по плитам — от пасти средней головы к краю (спрятаны до рыка)
function g4Cracks(){const R=kRng(4440),P=[],D=[],start=new V3(0,0,-9.4),Lmax=22;
  const seg=(a,b,d0,d1,w)=>{const dx=b.x-a.x,dz=b.z-a.z,l=Math.hypot(dx,dz)||1,nx=-dz/l*w/2,nz=dx/l*w/2,y=0.05;
    P.push(a.x+nx,y,a.z+nz,b.x+nx,y,b.z+nz,b.x-nx,y,b.z-nz, a.x+nx,y,a.z+nz,b.x-nx,y,b.z-nz,a.x-nx,y,a.z-nz);D.push(d0,d1,d1,d0,d1,d0);};
  const walk=(p,ang,d,w,depth)=>{let q=p.clone(),a=ang,dd=d;for(let i=0;i<40;i++){const st=0.7+R()*0.6;a+=(R()-0.5)*0.42;const n=new V3(q.x+Math.sin(a)*st,0,q.z+Math.cos(a)*st);
      if(Math.hypot(n.x-G4C.x,n.z-G4C.z)>12.3)break;seg(q,n,dd/Lmax,(dd+st)/Lmax,w);dd+=st;q=n;if(depth<1&&R()<0.1)walk(q,a+(R()<0.5?-1:1)*(0.5+R()*0.5),dd,w*0.55,depth+1);}};
  for(let i=0;i<8;i++){const ang=-1.3+i/7*2.6+(R()-0.5)*0.2;walk(start,ang,0,0.3,0);}
  // круговая трещина по среднему кругу
  {let prev=null;for(let i=0;i<=56;i++){const a=i/56*Math.PI*2,r=7.05+Math.sin(i*1.7)*0.18,q=new V3(G4C.x+Math.cos(a)*r,0,G4C.z+Math.sin(a)*r);if(prev&&R()<0.8)seg(prev,q,0.45+Math.abs(Math.sin(a/2))*0.4,0.45+Math.abs(Math.sin((a+0.11)/2))*0.4,0.16);prev=q;}}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setAttribute('aD',new THREE.Float32BufferAttribute(D,1));g.computeVertexNormals();g.computeBoundingSphere();
  const m=g4Static(g,g4Mats().crack,{live:true,noRecv:true});m.userData.g4=true;m.renderOrder=1;
  // ореол: та же сетка шире (по нормали в плоскости) — тусклое свечение вокруг трещин
  const P2=P.slice();for(let i=0;i<P2.length;i+=18){const ax=P2[i],az=P2[i+2],bx=P2[i+3],bz=P2[i+5],cx=P2[i+6],cz=P2[i+8],fx=P2[i+15],fz=P2[i+17];const mx=(ax+fx)/2,mz=(az+fz)/2,nx=(ax-fx)/2,nz=(az-fz)/2,kx=(bx+cx)/2,kz=(bz+cz)/2,ox=(bx-cx)/2,oz=(bz-cz)/2,W2=3.2;
    P2[i]=mx+nx*W2;P2[i+2]=mz+nz*W2;P2[i+15]=mx-nx*W2;P2[i+17]=mz-nz*W2;P2[i+9]=mx+nx*W2;P2[i+11]=mz+nz*W2;P2[i+3]=kx+ox*W2;P2[i+5]=kz+oz*W2;P2[i+6]=kx-ox*W2;P2[i+8]=kz-oz*W2;P2[i+12]=kx-ox*W2;P2[i+14]=kz-oz*W2;
    for(let k=1;k<18;k+=3)P2[i+k]=0.044;}
  const g2=new THREE.BufferGeometry();g2.setAttribute('position',new THREE.Float32BufferAttribute(P2,3));g2.setAttribute('aD',new THREE.Float32BufferAttribute(D,1));g2.computeVertexNormals();g2.computeBoundingSphere();
  const h=g4Static(g2,g4Mats().crackH,{live:true,noRecv:true});h.userData.g4=true;return m;}
// ---------- капли лавы, искры, струи воздуха — свои пулы (по одной отрисовке) ----------
const G4P={blobs:null,bl:[],emb:null,em:[],str:null,st:[],M:new THREE.Matrix4(),Q:new THREE.Quaternion(),S:new V3(),C:new THREE.Color(),Z:new V3(0,0,1)};
function g4Pools(){const M4=g4Mats();
  G4P.blobs=new THREE.InstancedMesh(new FIN.orig.Icosa(1,0),M4.blob,180);G4P.blobs.frustumCulled=false;G4P.blobs.userData.noBatch=true;G4P.blobs.userData.g4=true;G4P.bl=[];
  G4P.emb=new THREE.InstancedMesh(new THREE.TetrahedronGeometry(1,0),M4.blob,90);G4P.emb.frustumCulled=false;G4P.emb.userData.noBatch=true;G4P.emb.userData.g4=true;G4P.em=[];
  G4P.str=new THREE.InstancedMesh(new THREE.BoxGeometry(0.09,0.09,1),M4.streak,90);G4P.str.frustumCulled=false;G4P.str.userData.noBatch=true;G4P.str.userData.g4=true;G4P.st=[];
  for(const im of[G4P.blobs,G4P.emb,G4P.str]){G4P.S.set(0,0,0);G4P.M.compose(new V3(0,-50,0),G4P.Q.identity(),G4P.S);for(let i=0;i<im.count;i++){im.setMatrixAt(i,G4P.M);if(im!==G4P.str)im.setColorAt(i,G4P.C.set(0xff8020));}
    im.instanceMatrix.needsUpdate=true;if(im.instanceColor)im.instanceColor.needsUpdate=true;W.group.add(im);}}
function g4Blob(p,v,s,life,col){if(!G4P.blobs||G4P.bl.length>=G4P.blobs.count)return;G4P.bl.push({p:p.clone(),v:v.clone(),s,life,t:0,col:col||(Math.random()<0.5?0xffd050:0xff6a14)});}
function g4Ember(p){if(!G4P.emb||G4P.em.length>=G4P.emb.count)return;G4P.em.push({p:p.clone(),v:new V3(rand(-0.3,0.3),rand(1.2,2.6),rand(-0.3,0.3)),s:rand(0.04,0.08),life:rand(1.6,3),t:0,ph:rand(0,6),col:Math.random()<0.6?0xffb040:0xff5a14});}
function g4Streak(p,tgt){if(!G4P.str||G4P.st.length>=G4P.str.count)return;G4P.st.push({p:p.clone(),v:new V3(),tgt,t:0,life:2.2});}
function g4PoolsTick(dt){const M=G4P.M,Q=G4P.Q,S=G4P.S,C=G4P.C,Z=G4P.Z;
  if(G4P.blobs){const im=G4P.blobs,L=G4P.bl;for(let i=L.length-1;i>=0;i--){const b=L[i];b.t+=dt;b.v.y-=13*dt;b.p.addScaledVector(b.v,dt);if(b.t>b.life||b.p.y<G4LY-0.2||(b.p.y<0.05&&b.v.y<0&&Math.hypot(b.p.x-G4C.x,b.p.z-G4C.z)<14.8)){L.splice(i,1);}}
    for(let i=0;i<im.count;i++){const b=L[i];if(b){const k=1-b.t/b.life;S.setScalar(b.s*(0.5+0.5*k));M.compose(b.p,Q.identity(),S);im.setColorAt(i,C.set(b.col));}else{S.setScalar(0);M.compose(V0(),Q.identity(),S);}im.setMatrixAt(i,M);}
    im.instanceMatrix.needsUpdate=true;if(im.instanceColor)im.instanceColor.needsUpdate=true;}
  if(G4P.emb){const im=G4P.emb,L=G4P.em;for(let i=L.length-1;i>=0;i--){const e=L[i];e.t+=dt;e.p.addScaledVector(e.v,dt);e.p.x+=Math.sin(G.time*2+e.ph)*dt*0.4;if(e.t>e.life)L.splice(i,1);}
    for(let i=0;i<im.count;i++){const e=L[i];if(e){const k=Math.min(1,e.t/0.3)*(1-e.t/e.life);S.setScalar(e.s*k);Q.setFromAxisAngle(Z,G.time*3+e.ph);M.compose(e.p,Q,S);im.setColorAt(i,C.set(e.col));}else{S.setScalar(0);M.compose(V0(),Q.identity(),S);}im.setMatrixAt(i,M);}
    im.instanceMatrix.needsUpdate=true;if(im.instanceColor)im.instanceColor.needsUpdate=true;}
  if(G4P.str){const im=G4P.str,L=G4P.st,tmp=new V3();for(let i=L.length-1;i>=0;i--){const s=L[i];s.t+=dt;const to=tmp.copy(s.tgt).sub(s.p),d=to.length();if(d<0.5||s.t>s.life){L.splice(i,1);continue;}
      s.v.lerp(to.multiplyScalar(Math.min(16,4+14/Math.max(d,0.6))/d),1-Math.exp(-5*dt));s.p.addScaledVector(s.v,dt);}
    for(let i=0;i<im.count;i++){const s=L[i];if(s){const sp=s.v.length();Q.setFromUnitVectors(Z,tmp.copy(s.v).divideScalar(sp||1));S.set(1,1,Math.min(1.6,0.2+sp*0.09)*Math.min(1,s.t/0.25));M.compose(s.p,Q,S);}else{S.setScalar(0);M.compose(V0(),Q.identity(),S);}im.setMatrixAt(i,M);}
    im.instanceMatrix.needsUpdate=true;}}
const G4V0=new V3(0,-50,0);const V0=()=>G4V0;
// ---------- гейзеры у жерл ----------
function g4Geyser(i,big){const E=G4.env;if(!E||!E.vents.length)return;const v=E.vents[(i==null?Math.floor(Math.random()*E.vents.length):i)%E.vents.length],k=big?1.3:0.8+Math.random()*0.4;
  const n=Math.round((big?34:18)*FXQ());for(let j=0;j<n;j++){const a=rand(0,6.28),sp=rand(0.4,2);g4Blob(v.clone().add(new V3(Math.cos(a)*0.3,0.2,Math.sin(a)*0.3)),new V3(Math.cos(a)*sp,rand(8,14)*k,Math.sin(a)*sp),rand(0.14,0.32),rand(1.3,2.1));}
  const c=E.cols[E.vents.indexOf(v)];if(c){c.t=0;c.h=(big?9:5.5)*k;c.m.visible=true;}G4S.geyser(big?1.2:0.7);}
// ---------- облик боя: позы голов поверх post прототипа ----------
function g4Pose(e,dt){const L=e.L;if(!L||!L.head)return;const t=G4.cineT;
  if(!e._g4j){e._g4j=true;const mg=new THREE.Mesh(new FIN.orig.Sphere(0.24,8,6),g4Mats().glow);mg.scale.set(1.3,0.5,1.4);mg.position.set(0,-0.36,0.72);mg.visible=false;L.head.add(mg);e._g4mouth=mg;}
  let open=0;const ctl=G4.mode==='roar'||((G4.pull>0||G4.demoT>0)&&g4Awake(e));if(ctl||e._g4ctl){L.head.rotation.x=0;L.head.rotation.z=0;}e._g4ctl=ctl;
  if(G4.mode==='roar'){
    if(e.idx!==1){const k=smooth(g4K(t,0,0.35))*(1-smooth(g4K(t,4.9,5.7)));e.g.position.y-=0.3*k;L.head.rotation.x=0.42*k;}
    else{const rear=smooth(g4K(t,0.55,1.05))*(1-smooth(g4K(t,5.1,5.9)));open=Math.max(0.35*smooth(g4K(t,0.6,0.8)),smooth(g4K(t,1.3,1.45)))*(1-smooth(g4K(t,3.9,4.4)));
      e.g.position.y+=1.7*rear;L.head.rotation.x=-0.55*rear+Math.sin(t*38)*0.03*open;L.head.rotation.z=Math.sin(t*31)*0.05*open;if(L.jaw)L.jaw.rotation.x=0.1+1.05*open;}}
  else if((G4.pull>0||G4.demoT>0)&&g4Awake(e)){const k=G4.pull>0?Math.min(1,G4.pullT/0.5)*Math.min(1,G4.pull/0.4):Math.min(1,G4.demoT/0.4);open=k;L.head.rotation.x=-0.22*k;e.g.position.y+=0.35*k;if(L.jaw)L.jaw.rotation.x=0.1+0.95*k;}
  if(e._g4mouth){e._g4mouth.visible=open>0.3&&(e.idx===1||G4.pull>0||G4.demoT>0);if(e._g4mouth.visible){const q=0.75+0.3*open+0.08*Math.sin(G.time*20);e._g4mouth.scale.set(1.3*q,0.5*q,1.4*q);}}}
// ---------- рык ----------
G4.roar=(done)=>{const L=W.gor4L;if(!L||G4.roared||!g4On()){done();return;}G4.roared=true;G4.stats.roar++;const hs=L.heads();hs.forEach(e=>{e.cd=99;});const Mi=hs[1];
  G4.mode='roar';G4.cineT=0;
  const fire=()=>{const p=g4Mouth(Mi);for(let j=0;j<Math.round(36*FXQ());j++)g4Blob(p,new V3(rand(-1.5,1.5)+Math.sin(Mi.face)*3,rand(5,9),rand(-1.5,1.5)+Math.cos(Mi.face)*3),rand(0.08,0.2),rand(0.8,1.4),j%3?0xffb040:0xfff0a0);};
  play({dur:6.8,fov:50,camK:3.2,shots:[shot(0,[0,12.5,13.5],[0,2.2,-10],[0,10.2,9.6],[0,2.8,-10.5],2.9),shot(2.9,[3.4,1.3,-2.4],[0,3.8,-11],[2.2,1.5,-3.4],[0,4,-11],1.7),shot(4.6,[0,9.6,8.4],[0,1.2,-8],[0,12.2,12.6],[0,1,-7],2.2)],
    says:[[0.6,2.4,'gorM','Р-Р-Р-РА-А-А-АХ!']],   // в записи: «р-р-р» ~0,9 с, затем крик — на него рык, пламя и тряска
    events:[{t:0,fn:()=>{G4S.slam();for(const e of[hs[0],hs[2]]){FX.dust(e.pos.clone().add(new V3(0,0.2,0.6)),14,0x8a7a6a,1.4);}shakeAll(0.05,0.4);}},
      {t:1.45,fn:()=>{G4S.roar();shakeAll(0.13,1.7);if(CINE.punch)CINE.punch(-6);if(CINE.moodFlash)CINE.moodFlash('#ff5a1a',0.24,1.8);fire();later(0.35,fire);later(0.7,fire);}},
      {t:1.9,fn:()=>{G4.revOn=true;G4S.rumble();}},
      ...[0,1,2,3,4,5,6,7].map(k=>({t:2.5+k*0.27,fn:()=>g4Geyser(k*2+1,true)})),
      {t:4.7,fn:()=>{g4Geyser(null,true);g4Geyser(null,false);}}],
    tick:(t)=>{G4.cineT=t;L.updNecks();hs.forEach(e=>{if(e.idx!==1&&e.state==='broken')e.t=0;});},
    end:()=>{G4.mode=null;G4.rv=1;G4.revOn=false;G4.lava=1;G4.geyOn=true;hs.forEach(e=>{if(e.L&&e.L.head){e.L.head.rotation.x=0;e.L.head.rotation.z=0;}});done();}});};
function g4LavaNow(){G4.roared=true;G4.rv=1;G4.lava=1;G4.geyOn=true;}
// ---------- вдох ----------
G4.inhale=(F,heads)=>{G4.stats.inhales++;G4.cyc++;const Mi=heads[1];
  const big=F.phase===2&&g4Awake(Mi)&&G4.cyc>=(G4.big?4:2);
  if(big){G4.cyc=0;G4.big++;G4.stats.pulls++;F.inhale=3.6;G4.pull=3.2;G4.pullT=0;G4.bitten=new Set();say('gorM','Вдо-о-ох!',1.6);G4S.inhaleBig();
    floatText(g4Top(Mi).add(new V3(0,1.6,0)),'ВДО-О-ОХ! Тянет!','#ffd0a0');shakeAll(0.03,3);
    if(!G4.pullTold){G4.pullTold=true;later(0.9,()=>{if(G4.pull>0)say('potap','Тянет! Щит держите — устоим!',2.6);});}}
  else{G4S.inhaleSmall();if(g4Awake(Mi))floatText(g4Top(Mi).add(new V3(0,1.4,0)),'хш-ш-ш…','#ffe0c0');}};
function g4Shielded(h,M){if(h.guard)return true;
  const P=HERO.potap;if(P&&P!==h&&P.active&&P.guard&&!players[P.player].downed){const ax=M.x-P.pos.x,az=M.z-P.pos.z,al=Math.hypot(ax,az)||1,vx=h.pos.x-P.pos.x,vz=h.pos.z-P.pos.z;
    if(Math.hypot(vx,vz)<2.8&&(vx*ax+vz*az)/al<0.2)return true;}   // за широким щитом Потапа
  return false;}
function g4PullTick(dt,F,hs){const Mi=hs[1];if(G4.pull<=0||G.cine)return;
  if(F.phase!==2){G4.pull=0;return;}
  if(!g4Awake(Mi)){floatText(g4Top(Mi).add(new V3(0,1.6,0)),'Кха! Вдох сорвался!','#ffe08a');G4.pull=0;return;}   // жёлудь в пасть — вдох обрывается
  G4.pull-=dt;G4.pullT+=dt;const ramp=Math.min(1,G4.pullT/0.5)*Math.min(1,Math.max(0,G4.pull)/0.4);const M=g4Mouth(Mi);M.y=0;
  for(const pi of[0,1]){const h=active(pi);if(players[pi].downed||h.cling||h.likhoSafe||G4.bitten.has(h)||(G.solo&&!ctrl(h)))continue;   // в одиночку друга не тянет — держится сам
    const dx=M.x-h.pos.x,dz=M.z-h.pos.z,d=Math.hypot(dx,dz)||1,ux=dx/d,uz=dz/d;
    const sh=g4Shielded(h,M),P=(sh?2.0:5.0)*ramp*(d<6?1.15:1);h.pos.x+=ux*P*dt;h.pos.z+=uz*P*dt;   // щит — в 2,5 раза слабее
    const away=-(h.vel.x*ux+h.vel.z*uz);if(away>0){h.pos.x+=ux*away*0.5*dt;h.pos.z+=uz*away*0.5*dt;}   // против тяги шагается вдвое медленнее
    h._g4dust=(h._g4dust||0)-dt;if(h._g4dust<=0&&h.grounded){h._g4dust=sh?0.35:0.18;FX.dust(h.pos.clone().add(new V3(-ux*0.3,0.05,-uz*0.3)),sh?3:5,0xd8c4a8,0.6);}
    if(d<2.35){G4.bitten.add(h);G4.stats.bites++;G4S.bite();damageHero(h,{kind:'enemy',ref:Mi});h.vel.x=-ux*11;h.vel.z=-uz*11;h.vel.y=7;h.grounded=false;h.knockT=0.55;
      floatText(h.pos.clone().add(new V3(0,h.d.height+1,0)),'Ам! Тьфу!','#ffb0a0');FX.dust(h.pos.clone(),10,0xe8d8c0,1);shake(pi,0.06,0.3);}}
  // струи воздуха и искры к пастям всех голов
  const n=G.time*60|0;if(n%2===0)for(const e of hs){if(!g4Awake(e))continue;const tg=g4Mouth(e);const a=rand(0,6.28),r=rand(3,12.5);g4Streak(new V3(G4C.x+Math.cos(a)*r,rand(0.3,2.6),G4C.z+Math.sin(a)*r*0.8+2),tg);}}
// ---------- Совиный взор — слабое место ----------
function g4WeakMake(e){const M4=g4Mats(),g=new THREE.Group();g.userData.noBatch=true;g.userData.g4=true;
  const cr=new THREE.Mesh(new THREE.OctahedronGeometry(0.34,0),M4.weakC);cr.scale.set(1,1.4,0.6);cr.renderOrder=11;g.add(cr);
  const ring=new THREE.Mesh(new FIN.orig.Torus(0.7,0.06,6,36),M4.weak);ring.renderOrder=10;g.add(ring);
  const tmr=new THREE.Mesh(new FIN.orig.Torus(1.05,0.05,4,40,Math.PI*2),M4.weak);tmr.renderOrder=10;g.add(tmr);
  const arr=new THREE.Mesh(new FIN.orig.Cone(0.3,0.6,4),M4.weak);arr.rotation.x=Math.PI;arr.position.y=1.5;arr.renderOrder=10;g.add(arr);g.scale.setScalar(1.45);
  // столб света над головой — видно с любого края арены
  const pil=new THREE.Mesh(new FIN.orig.Cylinder(0.22,0.4,7,8,1,true),g4Mats().beam);pil.userData.noBatch=true;pil.userData.g4=true;W.group.add(pil);
  W.group.add(g);return {g,cr,ring,tmr,arr,pil};}
// показ в обучающем ролике: взор находит чешуйку, через миг — удар (сам)
G4.weakDemo=(e,pe)=>{if(!e)return;e._weak=1.3;const V=g4WeakMake(e);G4.weak.push({e,V,t:0,max:1.3,demo:true});G4S.weak();FX.sparkle(g4Top(e).add(new V3(0,0.6,0.4)),14,0xe7c3ff);
  floatText(g4Top(e).add(new V3(0,1.7,0)),'Слабое место — бей сюда!','#e7c3ff');};
function g4Owl(h){const F=W.flags,hs=g4Heads();players[h.player].owlCd=G.solo?9:12;   // вдвоём одну голову бьют по-обычному, в одиночку — взор чаще
  G4.stats.owl++;
  if(F.phase<1||F.phase>2||!hs.length){floatText(h.pos.clone().add(new V3(0,h.d.height+1.1,0)),F.phase===3?'Головы без сил — узду несите!':'Тут слабых мест нет','#e7c3ff');return;}
  const fx=Math.sin(h.face),fz=Math.cos(h.face);let best=null,bs=-1e9;
  for(const e of hs){if(!g4Awake(e)||(F.phase===1&&e.idx===1)||e._weak>0)continue;const dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z,d=Math.hypot(dx,dz)||1;const sc=(dx*fx+dz*fz)/d*6-d*0.35;if(sc>bs){bs=sc;best=e;}}
  if(!best){floatText(h.pos.clone().add(new V3(0,h.d.height+1.1,0)),'Все в Пробое — бейте!','#e7c3ff');return;}
  best._weak=6;G4.stats.weak++;const V=g4WeakMake(best);G4.weak.push({e:best,V,t:0,max:6});G4S.weak();
  // луч от Пелагеи к чешуйке
  const from=h.pos.clone().add(new V3(0,h.d.height*0.85,0)),to=g4Top(best).add(new V3(0,0.55,0.4)),len=from.distanceTo(to);
  const beam=new THREE.Mesh(new FIN.orig.Cylinder(0.06,0.14,1,6,1,true),g4Mats().beam.clone());beam.userData.noBatch=true;beam.scale.set(1,len,1);beam.position.copy(from).add(to).multiplyScalar(0.5);
  beam.quaternion.setFromUnitVectors(new V3(0,1,0),to.clone().sub(from).normalize());W.group.add(beam);anim(0.7,k=>{beam.material.opacity=0.65*(1-k);if(k>=1){W.group.remove(beam);}});
  FX.sparkle(to,14,0xe7c3ff);floatText(to.clone().add(new V3(0,1.2,0)),'Слабое место — бей сюда!','#e7c3ff');
  if(best.L&&best.L.head){const hd0=best.L.head;anim(0.4,k=>{hd0.rotation.z=Math.sin(k*Math.PI*6)*0.12*(1-k);});}
  if(!G4.owlSaid){G4.owlSaid=true;say('pelageya','Вот оно, слабое место! Бейте — с одного удара!',3.8);}}
function g4WeakHit(e,h){const w=G4.weak.find(q=>q.e===e);const p=g4Top(e).add(new V3(0,0.5,0.4));e._weak=0;if(w)g4WeakDrop(w);
  e.state='broken';e.t=0;e.embers=0;e._b=false;e.open=0;if(FIN.boss4b&&FIN.boss4b.on){e.bdur=99;e._b=true;}   // в обучающем ролике — как t4Broken
  G4.stats.weakHits++;G4S.weakHit();G.hitstop=Math.max(G.hitstop||0,0.12);shakeAll(0.06,0.35);
  FX.sparkle(p,22,0xe7c3ff);FX.stars(p,10,0xf4e4ff);if(typeof ringFx==='function')ringFx(e.pos,0xc890ff,3.2);floatText(p.clone().add(new V3(0,1.3,0)),'В слабое место! ПРОБОЙ!','#f0d8ff');
  if(!G4.weakBanner&&!(FIN.boss4b&&FIN.boss4b.on)){G4.weakBanner=true;banner('Слабое место!','#e7c3ff',1.6,'Совиный взор Пелагеи — и один удар: голова сразу в Пробое');}}
function g4WeakDrop(w){if(w.V.g.parent)w.V.g.parent.remove(w.V.g);if(w.V.pil.parent)w.V.pil.parent.remove(w.V.pil);const i=G4.weak.indexOf(w);if(i>=0)G4.weak.splice(i,1);}
function g4WeakTick(dt){for(const w of G4.weak.slice()){const e=w.e;w.t+=dt;e._weak=Math.max(0,w.max-w.t);
    if(w.demo&&e._weak<=0&&g4Awake(e)){g4WeakHit(e,null);continue;}
    if(!g4Awake(e)||e._weak<=0||W.flags.phase>2){if(e._weak<=0&&g4Awake(e)){floatText(g4Top(e).add(new V3(0,1.5,0)),'Затянулось…','#cdb8e8');G4S.fade();}e._weak=0;g4WeakDrop(w);continue;}
    const V=w.V,p=g4Top(e),f=e.face;V.g.position.set(p.x+Math.sin(f)*0.75,p.y+0.5,p.z+Math.cos(f)*0.75);V.g.lookAt(camS.position);const k=e._weak/w.max;
    V.cr.rotation.z=G.time*2;V.cr.scale.set(1,1.4,0.6).multiplyScalar(1+0.18*Math.sin(G.time*10));V.ring.scale.setScalar(1+0.12*Math.sin(G.time*7));
    V.tmr.geometry.dispose();V.tmr.geometry=new FIN.orig.Torus(1.05,0.05,4,40,Math.PI*2*Math.max(0.02,k));V.arr.position.y=1.5+0.2*Math.abs(Math.sin(G.time*5));
    V.g.visible=k>0.25||Math.sin(G.time*18)>-0.2;V.pil.position.set(p.x,p.y+4,p.z);V.pil.visible=V.g.visible;V.pil.scale.set(1+0.15*Math.sin(G.time*6),1,1+0.15*Math.sin(G.time*6));}}
{const _eh=enemyHit;enemyHit=function(e,h,air){if(e&&e._weak>0&&e.kind==='golova'&&g4On()&&g4Awake(e)&&!G.cine){g4WeakHit(e,h);return;}return _eh.apply(this,arguments);};}
// ---------- сборка арены и подключение к уровню ----------
function g4Setup(){const F=W.flags;Object.assign(G4,{roared:false,mode:null,cineT:0,rv:0,revOn:false,lava:0,pull:0,pullT:0,cyc:0,big:0,geyOn:false,geyT:2,weak:[],owlSaid:false,pullTold:false,weakBanner:false,bitten:new Set()});
  for(const k in G4.stats)G4.stats[k]=0;G4U.rev.value=0;
  const hid=g4HideProto();g4Floor();g4Island();const vents=g4Rim();g4Far();const crack=g4Cracks();g4Pools();
  const cols=vents.map(v=>{const m=new THREE.Mesh(new FIN.orig.Cylinder(0.3,0.8,1,8,1,true),g4Mats().col);m.position.copy(v);m.visible=false;m.userData.noBatch=true;m.userData.g4=true;W.group.add(m);return {m,t:9,h:4};});
  const light=new THREE.PointLight(0xff5a1c,0,30,1.6);light.position.set(G4C.x,2.4,G4C.z-1);W.group.add(light);
  // шеи: обрубки шей туловища (они смотрят вверх) убраны, между шарами-позвонками — промежуточные: шея цельная, как у референса
  const L4=W.gor4L,mids=[];if(L4){if(L4.gor&&L4.gor.necks)L4.gor.necks.forEach(b=>{if(b&&b.scale)b.scale.setScalar(0.02);});
    for(const segs of (L4.necks||[]))for(let k=0;k+1<segs.length;k++){const a=segs[k],b=segs[k+1];const r=((a.geometry.parameters&&a.geometry.parameters.radius)||0.8)*0.97;
      const m=new THREE.Mesh(new THREE.SphereGeometry(r,10,8),a.material);m.castShadow=true;m.userData.noBatch=true;m.userData.g4=true;W.group.add(m);mids.push({m,a,b});}}
  G4.env={vents,cols,crack,light,hid,mids};
  W.onOwl=g4Owl;
  for(const pi of[0,1])prompt(pi,'guard',()=>headOf(active(pi)),()=>G4.pull>0&&!active(pi).guard&&!players[pi].downed&&(!G.solo||pi===G.soloPi),'держи щит!');
  for(const pi of[0,1])prompt(pi,'attack',()=>headOf(active(pi)),()=>G4.weak.some(w=>hd(w.e.pos,active(pi).pos)<4.2)&&(!G.solo||pi===G.soloPi),'в слабое место!');
  prompt(1,'skill',()=>headOf(HERO.pelageya),()=>HERO.pelageya.active&&players[1].owlCd<=0&&F.phase>=1&&F.phase<=2&&!G4.weak.length&&!g4Heads().some(e=>e.sat>0),'слабое место');
  W.updates.push(g4Tick);}
function g4Tick(dt){if(!g4On())return;const F=W.flags,hs=g4Heads(),E=G4.env;if(!E)return;
  for(const q of E.mids)q.m.position.lerpVectors(q.a.position,q.b.position,0.5);
  for(const e of hs){if(!e._g4post&&e.post){e._g4post=true;const p0=e.post;e.post=(e,dt,k)=>{p0(e,dt,k);g4Pose(e,dt);};}}
  if(F.phase>=2&&!G4.roared&&!G.cine)g4LavaNow();   // фазу выставили напрямую (боты) — лава как после рыка
  if(G4.revOn)G4.rv=Math.min(1,G4.rv+dt/1.8);G4U.rev.value=G4.rv*1.03;
  const lv=G4.roared?Math.min(1,G4.lava+(G4.mode==='roar'?g4K(G4.cineT,1.6,3.8):0)):0;E.light.intensity=lv*(1.15+0.25*Math.sin(G.time*3.1)+0.15*Math.sin(G.time*7.3));
  // гейзеры после рыка
  if(G4.geyOn&&F.phase<5){G4.geyT-=dt;if(G4.geyT<=0){G4.geyT=rand(1.4,3.2);g4Geyser(null,Math.random()<0.25);}}
  for(const c of E.cols){if(!c.m.visible)continue;c.t+=dt;const k=c.t<0.25?c.t/0.25:Math.max(0,1-(c.t-0.25)/0.9);c.m.scale.set(1+0.3*Math.sin(G.time*20),Math.max(0.01,c.h*k),1);c.m.position.y=c.h*k/2;if(k<=0)c.m.visible=false;}
  // искры над трещинами
  if(G4.rv>0.2){const rate=(G4.mode==='roar'?60:14)*FXQ();let n=rate*dt;while(n>0){if(Math.random()<n){const a=rand(0,6.28),r=rand(0.5,12);g4Ember(new V3(G4C.x+Math.cos(a)*r,0.1,G4C.z+Math.sin(a)*r));}n-=1;}}
  if(F.phase===2)g4PullTick(dt,F,hs);else G4.pull=0;
  if(G4.demoT>0){G4.demoT-=dt;if((G.time*60|0)%2===0)for(const e of hs){if(!g4Awake(e))continue;const a=rand(0,6.28),r=rand(3,11);g4Streak(new V3(G4C.x+Math.cos(a)*r,rand(0.3,2.4),G4C.z+Math.sin(a)*r*0.8+2),g4Mouth(e));}}
  g4WeakTick(dt);g4PoolsTick(dt);}
{const _b=build4B;build4B=function(){_b();try{G4.env=null;W.gor4Pend=true;}catch(err){console.error('gor4',err);}};}
{const _ll=loadLevel;loadLevel=function(i){_ll(i);if(W&&W.levelId==='4-B'&&W.gor4Pend){W.gor4Pend=false;try{g4Setup();}catch(err){console.error('gor4 setup',err);}}};}
FIN.gor4Debug=()=>({roared:G4.roared,rv:G4.rv,pull:G4.pull,cyc:G4.cyc,big:G4.big,weak:G4.weak.map(w=>w.e.idx+':'+w.e._weak.toFixed(1)),stats:Object.assign({},G4.stats),hid:G4.env&&G4.env.hid});
