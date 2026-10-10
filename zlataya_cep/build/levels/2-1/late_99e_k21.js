/* ============================== РЕЛИЗ final06 · 2-1 «ГУСЛИ САДКО» — ВДВОЕ ДЛИННЕЕ ============================== */
// Начало прежнее: Садко и струна, гусли, фонтан, терем-библиотека, улица участков (причал и дом-колодец у каждого своя сторона).
// Садко теперь ещё и наигрывает свой напев — четыре звука, их Китеж вспомнит в 2-5. Новые участки:
//   Г2 «Переливная улица» — два канала, вода у них одна (перелив через заслонку на дне); тяжёлый Потап стоит на заслонке, даже
//      оставленный; прилив у одного — отлив у другого; лодкой к террасе, верёвка открывает ворота ДРУГА — надо по очереди.
//   Ж2 «Палаты Морского царя» (былина о Садко) — играют гусли у стула гусляра — царь пляшет, двери открыты, по палатам катятся
//      волны (прыгать в такт); сменил героя — оставленный доигрывает 15 с; у трона второй стул — чтобы прошёл и тот, кто играл.
//   З2 «Сад Китежа» — родник наполняет сад; ракушка на дне, в приливе дойдёт только Потап; Йоша растит водоросли-лесенки к террасе;
//      родник снова наполняет сад через 10 с — оставленный держит отлив напевом; на ростке — якорь, Потап поднимет.
// Порядок участков: сначала прилив и отлив поодиночке (улица участков, шлюзы — две ступени), потом парное (Переливная улица — за шлюзами).
// Колодец-лифт убран: «вода как лифт» уже есть в доме-колодце. Торговые ряды, две раковины и ворота — прежние. Звеньев 4.
// У каждой воды — мерная рейка (late_99q_k21_gauge.js); у ворот — ролик «Китеж просыпается».
{const L=LEVELS.find(l=>l.id==='2-1');if(L)L.nuts=12;}   // орешков на уровне стало больше — для списка уровней
WHO.king=['Морской царь','#7ad8ff'];VOICE.king={f:110,w:'triangle',sp:0.13};
// Морской царь: ростом с терем, борода из тины, венец, трезубец; пляшет вприсядку, когда играют гусли
function kingMesh21(){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);const robe=M(0x2a8a8a),trim=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4}),skin=M(0xb8d8d0),weed=M(0x3f8a4a);
  part(body,new THREE.CylinderGeometry(0.7,1.25,2.2,12),robe,0,1.1,0);for(let i=0;i<5;i++)part(body,new THREE.TorusGeometry(0.75+i*0.11,0.05,6,18),trim,0,0.3+i*0.42,0).rotation.x=Math.PI/2;
  const head=new THREE.Group();head.position.y=2.65;body.add(head);part(head,new THREE.SphereGeometry(0.5,12,10),skin,0,0,0);
  for(const s of[-1,1]){part(head,new THREE.SphereGeometry(0.07,6,5),MAT.dark,s*0.17,0.08,0.44);part(head,new THREE.BoxGeometry(0.18,0.05,0.05),M(0x2a5a4a),s*0.17,0.2,0.44).rotation.z=-s*0.25;}
  for(let i=0;i<9;i++){const a=(i-4)*0.2;const c=part(head,new THREE.ConeGeometry(0.09,0.9+Math.abs(4-i)*-0.06+0.4,4),weed,Math.sin(a)*0.38,-0.62,0.25+Math.cos(a)*0.12);c.rotation.x=Math.PI;c.rotation.z=a*0.4;}
  const crown=new THREE.Group();crown.position.y=0.45;head.add(crown);part(crown,new THREE.CylinderGeometry(0.42,0.38,0.22,12),trim,0,0,0);for(let i=0;i<7;i++){const a=i/7*Math.PI*2;part(crown,new THREE.ConeGeometry(0.07,0.32,4),trim,Math.cos(a)*0.38,0.25,Math.sin(a)*0.38);}
  const arms=[];for(const s of[-1,1]){const a=new THREE.Group();a.position.set(s*0.8,2.1,0);body.add(a);part(a,new THREE.CylinderGeometry(0.17,0.2,1.1,8),robe,0,-0.5,0.1).rotation.x=0.3;part(a,new THREE.SphereGeometry(0.18,8,6),skin,0,-1.05,0.3);arms.push(a);}
  const tri=new THREE.Group();tri.position.set(0,-1.05,0.3);arms[1].add(tri);part(tri,new THREE.CylinderGeometry(0.05,0.05,3.2,6),trim,0,0.6,0);for(const dx of[-0.22,0,0.22])part(tri,new THREE.ConeGeometry(0.06,0.4,4),trim,dx,2.3,0);part(tri,new THREE.BoxGeometry(0.5,0.06,0.06),trim,0,2.1,0);
  const K={g,body,head,arms,crown,ph:0,k:0,dance(on,dt,sp){K.k=damp(K.k,on?1:0,4,dt);K.ph+=dt*(on?7*(sp||1):1.2);const k=K.k*Math.min(1.2,sp||1);
    body.position.y=Math.abs(Math.sin(K.ph))*0.35*k;body.rotation.y=Math.sin(K.ph*0.5)*0.6*k;body.rotation.z=Math.sin(K.ph)*0.08*k+Math.sin(G.time*0.7)*0.02;
    arms[0].rotation.z=-0.3-k*(0.9+Math.sin(K.ph)*0.5);arms[1].rotation.z=0.3+k*(0.5+Math.sin(K.ph+1)*0.4);arms[0].rotation.x=Math.sin(K.ph)*0.5*k;head.rotation.z=Math.sin(K.ph)*0.12*k;}};
  if(typeof regNpc==='function')regNpc(K,'king');return K;}
// осётр-великан: длинный, с костяными жучками по спине, усики под рылом, хвост с длинной верхней лопастью
function sturgeonMesh21(){const g=new THREE.Group();W.group.add(g);const body=M(0x6a7a7e),belly=M(0xd8d0c0),sc=M(0xe8e0c8);
  const b=new THREE.Mesh(new THREE.SphereGeometry(1,16,10),body);b.scale.set(1.0,0.9,5.2);g.add(b);const be=new THREE.Mesh(new THREE.SphereGeometry(0.95,14,8),belly);be.scale.set(0.9,0.6,4.8);be.position.y=-0.32;g.add(be);
  const sn=new THREE.Mesh(new THREE.ConeGeometry(0.62,2.6,12),body);sn.rotation.x=Math.PI/2;sn.position.set(0,-0.15,5.8);sn.scale.set(1,0.75,1);g.add(sn);
  for(let i=0;i<4;i++)addMesh(new THREE.CylinderGeometry(0.03,0.03,0.6,5),belly,(i-1.5)*0.18,-0.65,5.5,g);
  for(const s of[-1,1]){addMesh(new THREE.SphereGeometry(0.17,8,6),M(0xfff3c0,{emissive:0x806020,emissiveIntensity:0.4}),s*0.6,0.24,4.2,g);addMesh(new THREE.SphereGeometry(0.08,6,5),MAT.dark,s*0.66,0.26,4.3,g);}
  for(let i=0;i<11;i++){const z=4-i*0.85,r=Math.sqrt(Math.max(0,1-(z/5.2)**2));addMesh(new THREE.ConeGeometry(0.16,0.34,4),sc,0,0.9*r+0.12,z,g);for(const s of[-1,1]){const c=addMesh(new THREE.ConeGeometry(0.12,0.26,4),sc,s*0.95*r,0.05,z,g);c.rotation.z=-s*Math.PI/2;}}
  const tail=new THREE.Group();tail.position.z=-5;g.add(tail);const up=new THREE.Mesh(new THREE.ConeGeometry(0.8,3.0,4),body);up.rotation.x=-Math.PI/2-0.5;up.scale.set(0.15,1,1);up.position.set(0,0.7,-1.2);tail.add(up);
  const lo=new THREE.Mesh(new THREE.ConeGeometry(0.6,1.8,4),body);lo.rotation.x=-Math.PI/2+0.6;lo.scale.set(0.15,1,1);lo.position.set(0,-0.5,-0.8);tail.add(lo);
  for(const s of[-1,1]){const f=new THREE.Mesh(new THREE.ConeGeometry(0.5,1.4,4),body);f.scale.set(0.12,1,1);f.position.set(s*0.9,-0.4,2.6);f.rotation.set(-1.2,0,s*0.8);g.add(f);}
  g.scale.setScalar(1.2);g.traverse(c=>{c.userData.noBatch=true;});return {g,tail};}
// подписи звонких плит и табличка напева
function k21Label(text,col){const c=document.createElement('canvas');c.width=256;c.height=86;const x=c.getContext('2d');x.font='bold 54px Georgia, serif';x.textAlign='center';x.textBaseline='middle';
  x.lineWidth=8;x.strokeStyle='rgba(20,30,40,0.85)';x.strokeText(text,128,46);x.fillStyle='#'+col.toString(16).padStart(6,'0');x.fillText(text,128,46);return new THREE.CanvasTexture(c);}
const K21_TUNE_TEX=(()=>{const c=document.createElement('canvas');c.width=512;c.height=208;const x=c.getContext('2d');x.fillStyle='#f4ecd8';x.fillRect(0,0,512,208);x.strokeStyle='#8a6a3a';x.lineWidth=8;x.strokeRect(6,6,500,196);
  x.font='bold 40px Georgia, serif';x.textAlign='center';x.fillStyle='#5a3a1a';x.fillText('Напев Садко',256,52);
  const dot=(cx,col,txt)=>{x.fillStyle=col;x.beginPath();x.arc(cx,118,26,0,Math.PI*2);x.fill();x.font='bold 24px Georgia, serif';x.fillStyle='#3a2a1a';x.fillText(txt,cx,178);};
  dot(70,'#ffd23a','дзинь');dot(180,'#5ab8ff','дилинь');dot(330,'#ff7ab0','дон');dot(440,'#6ad86a','дон');x.font='bold 40px Georgia, serif';x.fillStyle='#5a3a1a';x.fillText('+',385,132);
  x.font='bold 30px Georgia, serif';x.fillText('→',125,128);x.fillText('→',255,128);return new THREE.CanvasTexture(c);})();
// сад Китежа: коралловые деревца с жемчугом вместо яблок
function appleSea21(x,y,z){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=rand(0,6);W.group.add(g);const c=M([0xff8a8a,0xffb07a,0xd08ae0][Math.floor(rand(0,3))]),p=M(0xfff4e8,{emissive:0x6a6050,emissiveIntensity:0.4});
  const br=(px,py,pz,l,a,d)=>{const m=addMesh(new THREE.CylinderGeometry(0.05,0.08,l,5),c,px+Math.sin(a)*l/2,py+Math.cos(a)*l*0.5,pz,g);m.rotation.z=-a;m.castShadow=false;
    if(d>0){br(px+Math.sin(a)*l,py+Math.cos(a)*l,pz,l*0.75,a+0.5,d-1);br(px+Math.sin(a)*l,py+Math.cos(a)*l,pz,l*0.75,a-0.6,d-1);}else addMesh(new THREE.SphereGeometry(0.09,6,5),p,px+Math.sin(a)*l,py+Math.cos(a)*l,pz,g);};
  br(0,0,0,0.7,0,2);W.cyls.push({x,z,r:0.25,miny:y-1,maxy:y+1.4,on:true});return g;}
const K21_GLOW_TEX=(()=>{const c=document.createElement('canvas');c.width=c.height=128;const x=c.getContext('2d');const g=x.createRadialGradient(64,64,4,64,64,62);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(0.35,'rgba(255,230,150,0.6)');g.addColorStop(1,'rgba(255,200,80,0)');x.fillStyle=g;x.fillRect(0,0,128,128);return new THREE.CanvasTexture(c);})();
const K21_CARD_TEX=[0,1,2].map(kind=>{const c=document.createElement('canvas');c.width=256;c.height=kind?184:300;const x=c.getContext('2d');x.fillStyle='#f6efdc';x.fillRect(0,0,c.width,c.height);
  x.strokeStyle='rgba(150,120,80,0.75)';x.lineWidth=5;x.setLineDash([14,10]);x.strokeRect(14,14,c.width-28,c.height-28);
  if(kind===0){x.beginPath();x.moveTo(40,250);x.lineTo(40,170);x.arc(128,170,88,Math.PI,0);x.lineTo(216,250);x.stroke();x.beginPath();x.arc(128,118,30,Math.PI,0);x.stroke();x.beginPath();x.moveTo(128,88);x.lineTo(128,52);x.stroke();
    x.setLineDash([]);x.font='bold 64px Georgia, serif';x.textAlign='center';x.fillStyle='rgba(150,120,80,0.6)';x.fillText('?',128,222);}
  else{x.beginPath();x.arc(128,100,40,0,Math.PI*2);x.stroke();}
  return new THREE.CanvasTexture(c);});
build21=function(){
  W.zvenAway=true;W.world=2;W.bubbles=true;setTheme('kitezh');W.name='2-1 · «Гусли Садко»';W.sub='Подводный Китеж · прилив и отлив, перелив, пляска Морского царя';W.camX=10;const F=W.flags;F.stage='walk';
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.gusli=false;W.fallY=-14;W.gusliLocked='Гусли Садко — у Садко на площади ждут.';
  kitezhDecor(-360,10);
  const stone=M(0xb8b4a4),pave=M(0x9aa094),wallM=M(0xe0d6c0);
  wall(-11.2,-11,-360,9);wall(11,11.2,-360,9);wall(-11.2,11.2,9,9.2);wall(-11.2,11.2,-360.2,-360);
  /* ---------- А. дно у въезда ---------- */
  ground(-11,11,-8,9,0,pave);
  for(const[x,z]of[[-8.4,-2],[8.4,-4]]){addMesh(new THREE.CylinderGeometry(0.45,0.55,3.4,10),stone,x,1.7,z);W.cyls.push({x,z,r:0.55,miny:-1,maxy:3.4,on:true});}
  nutItem(9.6,0.6,-5.4);
  bell(0,4);
  const Z=makeZven();W.zven=Z;Z.pos.set(0,2.2,-2);
  /* ---------- Б. площадь: Садко и фонтан ---------- */
  ground(-11,-2.4,-28,-8,0,pave);ground(2.4,11,-28,-8,0,pave);ground(-2.4,2.4,-15.6,-8,0,pave);ground(-2.4,2.4,-28,-20.4,0,pave);
  ground(-2.4,2.4,-20.4,-15.6,-2.2,M(0x5a7a74));
  for(const[a,b,c,d]of[[-2.7,2.7,-15.6,-15.3],[-2.7,2.7,-20.7,-20.4],[-2.7,-2.4,-20.4,-15.6],[2.4,2.7,-20.4,-15.6]])box(a,b,0,0.3,c,d,stone,{occ:false});
  for(let i=0;i<7;i++)box(1.5,2.4,-2.2,-1.886+i*0.314,-16.8-i*0.6,-16.2-i*0.6,stone,{occ:false});   // ступеньки из чаши
  addMesh(new THREE.CylinderGeometry(0.45,0.55,2.9,10),stone,0,-0.75,-18);W.cyls.push({x:0,z:-18,r:0.5,miny:-3,maxy:0.7,on:true});
  {const f=new THREE.Group();f.position.set(0,0.7,-18);W.group.add(f);const fm=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4});const b=addMesh(new THREE.SphereGeometry(0.3,10,8),fm,0,0.3,0,f);b.scale.set(0.6,0.8,1.4);
    const t=addMesh(new THREE.ConeGeometry(0.22,0.35,4),fm,0,0.55,-0.4,f);t.rotation.x=-1.2;}
  const fz=waterZone(-2.4,2.4,-20.4,-15.6,-2.2,0.25,{floor:-2.2,shell:{x:-3.1,z:-15.0,y:0},curb:false});
  floater(fz,-2.3,-0.62,-19.3,-16.7,0.3,{rest:-2.2,draft:0.15,build:boardMesh});floater(fz,-1.1,1.3,-20.3,-19.4,0.3,{rest:-2.2,draft:0.15,build:boardMesh});
  const fLink=linkItem(0,1.4,-18);
  box(-7.8,-5.2,0,0.45,-15.4,-14.1,stone,{occ:false});
  const sadko=makeSadko();sadko.g.position.set(-6.5,0.45,-14.8);sadko.g.rotation.y=1.15;W.cyls.push({x:-6.5,z:-14.8,r:0.6,miny:-1,maxy:2.2,on:true});
  for(const[x,z]of[[-9.5,-10],[9.5,-10],[-9.5,-26],[9.5,-26]]){addMesh(new THREE.CylinderGeometry(0.35,0.4,4.4,10),stone,x,2.2,z);W.cyls.push({x,z,r:0.42,miny:-1,maxy:4.4,on:true});}
  bell(-4.2,-9.4);
  /* ---------- В. терем-библиотека: книга без страниц ---------- */
  ground(-11,11,-44,-28,0,pave);
  const tm=W.group.children.length;box(-11,-6.5,0,5.2,-43,-30,wallM);box(6.5,11,0,5.2,-43,-30,wallM);
  for(const sx of[-8.75,8.75]){addMesh(new THREE.BoxGeometry(4.7,0.3,13.4),M(0x3f7a5a),sx,5.35,-36.5).castShadow=false;for(let z=-30.6;z>-43;z-=1.6)addMesh(new THREE.ConeGeometry(0.16,0.4,4),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.3}),sx+(sx<0?2.2:-2.2),5.7,z);}
  fadeable(since(tm));   // потолка над книгой нет — обзор открыт; по верху стен резной карниз
  for(const x of[-5,5])for(const z of[-31,-35,-39,-42.5]){addMesh(new THREE.CylinderGeometry(0.3,0.36,5.2,10),M(0xd8b060),x,2.6,z);W.cyls.push({x,z,r:0.36,miny:-1,maxy:5.2,on:true});}
  for(let i=0;i<20;i++)addMesh(new THREE.BoxGeometry(0.3,rand(0.5,0.8),0.16),M([0xa03a2a,0x3a6a8a,0x6a8a3a,0xc0902a][i%4]),6.35,1+Math.floor(i/10)*1.3,-31+(i%10)*1.15);
  const curtain=new THREE.Mesh(new THREE.PlaneGeometry(11.5,4.4),MB(0x7ad8ff,{transparent:true,opacity:0.2,side:THREE.DoubleSide,depthWrite:false}));curtain.rotation.y=Math.PI/2;curtain.position.set(-6.4,2.6,-36.5);W.group.add(curtain);
  const shadow=new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.55,3.4,10),MB(0x0a1a20,{transparent:true,opacity:0,depthWrite:false}));shadow.position.set(-7.6,1.7,-39);W.group.add(shadow);
  box(-0.45,0.45,0,1.0,-36.95,-36.05,M(0x6a4a2a),{occ:false});
  const book=new THREE.Group();book.position.set(0,1.0,-36.5);W.group.add(book);const cov=M(0x6a2a1a),gilt=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.5});
  addMesh(new THREE.BoxGeometry(0.72,0.06,0.95),cov,0,0.03,0,book);
  // крышка — на петле у корешка (слева): открывается справа налево, вверх и через корешок
  const front=new THREE.Group();front.position.set(-0.36,0.3,0);book.add(front);addMesh(new THREE.BoxGeometry(0.72,0.06,0.95),cov,0.36,0,0,front);
  for(const dz of[-0.42,0.42])addMesh(new THREE.BoxGeometry(0.14,0.066,0.14),gilt,0.64,0,dz,front);
  const clasp=new THREE.Group();clasp.position.set(0.72,0,0);front.add(clasp);addMesh(new THREE.BoxGeometry(0.06,0.24,0.12),gilt,0.02,-0.1,0,clasp);   // застёжка по торцу
  const emb=new THREE.Mesh(new THREE.CircleGeometry(0.17,18),MB(0xffd76a,{transparent:true,opacity:0.85}));emb.rotation.x=-Math.PI/2;emb.position.set(0.36,0.034,0);front.add(emb);   // тиснёный купол Китежа
  for(let i=0;i<3;i++){const d=addMesh(new THREE.ConeGeometry(0.05,0.12,6),gilt,0.28+i*0.08,0.06,0,front);d.scale.y=0.4;}
  addMesh(new THREE.BoxGeometry(0.06,0.3,0.95),cov,-0.37,0.15,0,book);
  // корешок: «Не про меня» — в ролике проступает, будто кто-то царапает ключом
  const spC=document.createElement('canvas');spC.width=512;spC.height=160;const spX=spC.getContext('2d');const spT=new THREE.CanvasTexture(spC);
  const spineDraw=k=>{spX.fillStyle='#5a2a1a';spX.fillRect(0,0,512,160);spX.fillStyle='#b88a3a';spX.fillRect(0,12,512,7);spX.fillRect(0,141,512,7);
    if(k>0){spX.save();spX.beginPath();spX.rect(36,0,440*Math.min(1,k),160);spX.clip();spX.font='italic bold 62px Georgia, serif';spX.textAlign='center';spX.textBaseline='middle';
      spX.lineWidth=2;spX.strokeStyle='rgba(240,226,190,0.95)';for(let j=0;j<3;j++){spX.save();spX.translate(j*1.5-1.5,(j%2)*1.4-0.7);spX.strokeText('Не про меня',256,82);spX.restore();}spX.restore();
      if(k<1){spX.fillStyle='rgba(255,240,200,0.9)';spX.beginPath();spX.arc(36+440*k,82+Math.sin(k*40)*14,6,0,Math.PI*2);spX.fill();}}
    spT.needsUpdate=true;};spineDraw(1);
  const spine=new THREE.Mesh(new THREE.PlaneGeometry(0.95,0.3),new THREE.MeshBasicMaterial({map:spT}));spine.rotation.y=-Math.PI/2;spine.position.set(-0.405,0.15,0);book.add(spine);
  const stubs=[];for(let i=0;i<5;i++)stubs.push(addMesh(new THREE.BoxGeometry(0.06,0.02,0.2),M(0xf4ecd8),-0.3,0.07+i*0.004,-0.35+i*0.18,book));   // обрывки страниц у корешка
  bell(0,-29.6);
  /* ---------- Г. улица участков: у каждого — своя сторона ---------- */
  {const dm=W.group.children.length;box(-1.2,1.2,0,5.5,-76,-44,M(0xd0c8b0));for(let z=-46;z>-76;z-=4)addMesh(new THREE.CylinderGeometry(0.25,0.3,0.9,8),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.3}),0,5.95,z);fadeable(since(dm));}
  const SD=[];
  for(const s of[-1,1]){const pi=s<0?0:1,X=x=>s*x,BX=(a,b)=>s>0?[a,b]:[-b,-a];
    const gnd=(a,b,c,d,top,mat)=>{const q=BX(a,b);return ground(q[0],q[1],c,d,top,mat);},bx=(a,b,y0,y1,c,d,mat,o)=>{const q=BX(a,b);return box(q[0],q[1],y0,y1,c,d,mat,o);};
    // участок А — причал: лодки у стены домов, подвал с орешком и Жемчужницей (щука плавает у дома-колодца)
    gnd(1.2,11,-46.5,-44,0,pave);gnd(1.2,11,-56,-51.5,0,pave);gnd(1.2,5,-51.5,-46.5,0,pave);gnd(9.6,11,-51.5,-46.5,0,pave);gnd(5,9.6,-51.5,-46.5,-2.2,M(0x4a6660));
    for(let i=0;i<6;i++)bx(5+i*0.6,5.6+i*0.6,-2.2,-0.314-i*0.314,-51.5,-50.4,stone,{occ:false});
    const nutPit=nutItem(X(9.0),-1.7,-48);
    const zA=waterZone(...BX(1.2,11),-56,-44,0,2.8,{shell:{x:X(2.0),z:-44.7,y:0}});
    floater(zA,...BX(2.1,4.3),-51.2,-46.9,0.7,{rest:0,draft:0.4});const boat2=floater(zA,...BX(3.0,5.4),-55.95,-52.0,0.7,{rest:0,draft:0.4});
    const hm=W.group.children.length;bx(1.2,11,0,3.44,-60,-56,wallM,{occ:true});bx(1.2,11,3.44,3.5,-60,-56,M(0x8a4a3a),{solid:false});
    for(let i=0;i<4;i++){bx(2+i*2.3,2.7+i*2.3,1.1,2.3,-56.08,-56.0,M(0x24343a),{solid:false});}bx(7.6,8.2,3.44,4.4,-59.8,-59.2,M(0x8a4a3a),{occ:false});fadeable(since(hm));
    const nutRoof=nutItem(X(4.4),3.95,-58.4);
    // участок Б — канал у дома-колодца; дверь на втором этаже, сундук на дне
    gnd(1.2,5.95,-76,-60,0,pave);gnd(5.95,11,-63,-60,0,pave);gnd(5.95,11,-76,-69,0,pave);gnd(10,11,-69,-63,0,pave);
    const tw=W.group.children.length,twM=M(0xd8cfb8);
    bx(5.6,10,-3,6.2,-63.4,-63,twM);bx(5.6,10,-3,6.2,-69,-68.6,twM);bx(9.6,10,-3,6.2,-68.6,-63.4,twM);
    bx(5.6,6.0,-3,6.2,-65,-63.4,twM);bx(5.6,6.0,-3,6.2,-68.6,-67,twM);bx(5.6,6.0,-3,2.0,-67,-65,twM);bx(5.6,6.0,5.2,6.2,-67,-65,twM);fadeable(since(tw));
    gnd(6.0,9.6,-68.6,-63.4,-3,M(0x3e5250));kdome(X(7.8),-66,0.7,6.2);
    const door=new THREE.Group();door.position.set(X(5.52),0,-66);W.group.add(door);const dg=M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.6});
    for(const dz of[-1.05,1.05])addMesh(new THREE.BoxGeometry(0.1,3.2,0.12),dg,0,3.6,dz,door);addMesh(new THREE.BoxGeometry(0.1,0.12,2.2),dg,0,5.2,0,door);addMesh(new THREE.BoxGeometry(0.1,0.12,2.2),dg,0,2.0,0,door);
    const zB=waterZone(...BX(1.2,5.95),-76,-60,0,2.8,{shell:{x:X(1.9),z:-60.7,y:0}});
    const lift=waterZone(...BX(5.95,9.6),-68.6,-63.4,-3,2.8,{start:'high',floor:-3,shell:{x:X(9.15),z:-63.9,y:-3},curb:false});
    const ch=chest(X(8.5),-3,-67.7,{ry:s>0?-Math.PI/2:Math.PI/2});
    const pk=[FIN.pearlClam(X(7.2),-48.8,zA,-2.2,{pi}),pike(X(7.8),-65.6,lift,-3,{pi})];
    bell(X(3.2),-45.2);bell(X(2.6),-61.6);
    SD.push({pi,s,X,zA,zB,lift,ch,boat2,door,pk,nutPit,nutRoof,inShaft:h=>h.pos.x*s>5.95&&h.pos.x*s<9.6&&h.pos.z<-63.4&&h.pos.z>-68.6});}
  const basinM=M(0x3e5e5a),stepM=M(0xd2c8ae),goldM=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4}),canM=M(0x3e5250);
  /* ---------- Д. шлюзы Китежа: две ступени воды — прилив поднимает на следующую; сверху — лестница вниз ---------- */
  // Шлюзы теперь сразу за улицей участков: прилив — одному, без друга. Третья ступень и колодец-лифт убраны (лифт уже был в доме-колодце):
  // с верха шлюзов — простая лестница к Переливной улице.
  ground(-11,11,-80,-76,0,pave);ground(-11,11,-88,-80,0,basinM);
  box(-11,11,0,2.6,-96,-88,stepM);box(-11,11,0,5.2,-104,-96,stepM);
  addMesh(new THREE.BoxGeometry(22,0.04,8),basinM,0,2.62,-92).receiveShadow=true;
  for(const[y,z]of[[2.6,-88],[5.2,-96]])for(let x=-9;x<=9;x+=3)addMesh(new THREE.SphereGeometry(0.16,8,6),goldM,x,y+0.12,z+0.1);   // золотые шишечки по краю ступени
  const L1=waterZone(-11,11,-88,-80,0,2.9,{shell:{x:-9.4,z:-80.6,y:0}});
  const L2=waterZone(-11,11,-96,-88,2.6,5.5,{floor:2.6,shell:{x:9.4,z:-88.7,y:2.6}});
  for(let i=0;i<10;i++){const z=rand(-95,-81),y=z>-88?0:2.6;const w=addMesh(new THREE.CylinderGeometry(0.05,0.08,rand(0.8,1.6),5),M(0x3f8a5a),rand(-10,10),y+0.5,z);w.rotation.z=rand(-0.3,0.3);}   // водоросли
  pike(-5,-92,L2,2.6,{});
  nutItem(8.5,5.9,-92.5);nutItem(-8,5.8,-100.5);bell(0,-78);
  for(let i=0;i<12;i++)box(-11,11,0,4.8-0.4*i,-104.9-0.9*i,-104-0.9*i,stepM,{occ:false});   // лестница вниз с верха шлюзов
  ground(-11,11,-116,-114.8,0,pave);
  /* ---------- Г2. Переливная улица: вода одна на две улицы, заслонка на дне — держит тяжёлый Потап (за шлюзами, на 40 м дальше) ---------- */
  // два канала через стену; вода у них одна: прилив у одного — отлив у другого, пока Потап стоит на заслонке (он в глубокой воде не всплывает).
  // В конце каждого канала — терраса: в прилив лодка подвозит к ней. Верёвка на террасе открывает ворота ДРУГОЙ стороны.
  const PZ=-40;
  ground(-11,11,-80+PZ,-76+PZ,0,pave);bell(0,-78+PZ);
  {const dm=W.group.children.length;box(-1.2,1.2,-2.4,5.5,-116+PZ,-80+PZ,M(0xd0c8b0));for(let z=-82;z>-116;z-=4)addMesh(new THREE.CylinderGeometry(0.25,0.3,0.9,8),goldM,0,5.95,z+PZ);fadeable(since(dm));}
  ground(-11,-1.2,-108+PZ,-80+PZ,-2.4,canM);ground(1.2,11,-108+PZ,-80+PZ,-2.4,canM);
  for(const s of[-1,1])for(let i=0;i<7;i++){const x0=s<0?-11:9.4,x1=s<0?-9.4:11;box(x0,x1,-2.4,-0.3*(i+1),-80.6-i*0.6+PZ,-80-i*0.6+PZ,stone,{occ:false});}   // ступени в канал
  // арка заслонки в стене (со стороны левого канала) — сквозь неё вода переливается
  {const ag=W.group.children.length;addMesh(new THREE.BoxGeometry(0.08,1.4,1.8),M(0x10202a),-1.25,-1.7,-95+PZ);addMesh(new THREE.BoxGeometry(0.12,0.16,2.1),goldM,-1.27,-0.94,-95+PZ);
    for(const dz of[-0.98,0.98])addMesh(new THREE.BoxGeometry(0.12,1.5,0.16),goldM,-1.27,-1.65,-95+dz+PZ);addMesh(new THREE.BoxGeometry(0.08,1.4,1.8),M(0x10202a),1.25,-1.7,-95+PZ);fadeable(since(ag));}
  const CL=waterZone(-11,-1.2,-108+PZ,-80+PZ,-2.4,2.6,{floor:-2.4,start:'low',shell:{x:-10.3,z:-79.3+PZ,y:0}});CL.heavy=true;
  const CR=waterZone(1.2,11,-108+PZ,-80+PZ,-2.4,2.6,{floor:-2.4,start:'high',shell:{x:10.3,z:-79.3+PZ,y:0}});CR.heavy=true;
  const SLU=FIN.kwSluice(-2.8,-2.4,-95+PZ,{heavy:true,gate:{x:-1.32,z:-95+PZ,w:1.6,h:1.3,ry:Math.PI/2}});
  FIN.kwLink(CL,CR,{open:()=>SLU.held(),via:new V3(0,-1.7,-95+PZ),closedText:'Заслонка на дне закрыта — воде некуда уйти. Потапа на неё поставь!'});
  const boatL=floater(CL,-9.8,-6.8,-107.8+PZ,-103.6+PZ,0.7,{rest:-2.4,draft:0.5}),boatR=floater(CR,6.8,9.8,-107.8+PZ,-103.6+PZ,0.7,{rest:-2.4,draft:0.5});
  // террасы, лестницы вниз и ворота на лестницах
  box(-11,-1.2,-2.4,3.2,-112+PZ,-108+PZ,stepM);box(1.2,11,-2.4,3.2,-112+PZ,-108+PZ,stepM);
  for(const s of[-1,1])for(let i=0;i<8;i++){const x0=s<0?-11:1.2,x1=s<0?-1.2:11;box(x0,x1,0,3.2-0.4*(i+1),-112.5-0.5*i+PZ,-112-0.5*i+PZ,stepM,{occ:false});}
  for(const[y,z]of[[3.2,-108+PZ]])for(let x=-10;x<=10;x+=2.5)if(Math.abs(x)>1.5)addMesh(new THREE.SphereGeometry(0.16,8,6),goldM,x,y+0.12,z+0.1);
  const rgate=s=>{const g=new THREE.Group();W.group.add(g);const x0=s<0?-11:1.2,x1=s<0?-1.2:11;for(let x=x0+0.4;x<x1;x+=0.7)addMesh(new THREE.BoxGeometry(0.12,3.2,0.12),goldM,x,4.8,-112.2+PZ,g);
    addMesh(new THREE.BoxGeometry(x1-x0,0.16,0.16),goldM,(x0+x1)/2,6.3,-112.2+PZ,g);addMesh(new THREE.BoxGeometry(x1-x0,0.16,0.16),goldM,(x0+x1)/2,3.6,-112.2+PZ,g);return {g,col:colBox(x0,x1,3.2,6.4,-112.4+PZ,-112.0+PZ,false),open:false};};
  const PG=[rgate(-1),rgate(1)];
  const openPG=i=>{const q=PG[i];if(q.open)return;q.open=true;q.col.on=false;SFX.gate();anim(1.4,k=>{q.g.position.y=3.4*smooth(k);});};
  const ropes=[-1,1].map(s=>{const x=s*5.2,g=new THREE.Group();g.position.set(x,3.2,-110.4+PZ);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.1,0.12,2.6,6),M(0x6a4020),0,1.3,0,g);
    const rope=addMesh(new THREE.CylinderGeometry(0.035,0.035,1.6,5),M(0xd8c090),0.3,1.6,0,g);const fl=addMesh(new THREE.BoxGeometry(0.7,0.45,0.03),M(s<0?PCOL[0]:PCOL[1]),0.42,2.4,0,g);return {g,rope,fl,pulled:false,s};});
  ropes.forEach((R,i)=>W.hittables.push({pos:new V3(R.s*5.2,4.2,-110.4+PZ),r:1.1,push:false,alive:()=>!R.pulled,onHit:h=>{if(h.pos.y<2.9)return;R.pulled=true;SFX.latch();SFX.ok();
    anim(0.7,k=>{R.rope.scale.y=1-0.5*k;R.fl.position.y=2.4-1.4*k;});openPG(1-i);banner(i?'Правая верёвка!':'Левая верёвка!','#ffffff',1.8,'открылись ворота '+(i?'левой':'правой')+' стороны — друга');}}));
  const pkR=pike(6.4,-91+PZ,CR,-2.4,{});   // канал общий: охотится на любого героя в своей воде (с {pi:1} Прошку в одиночной игре не трогала)
  const nutCanal=nutItem(-10.1,-1.9,-99.5+PZ),nutTerrace=nutItem(10.2,3.75,-111.3+PZ);
  bell(-6,-114.4+PZ,1.6);bell(6,-114.4+PZ,1.6);
  const D=-40;   // торговые ряды и всё, что дальше, — на прежних местах
  /* ---------- Ж. торговые ряды: раки и Жемчужница на дне пруда; отлив — она ахает и раскрывается ---------- */
  ground(-11,-3.5,-140+D,-116+D,0,pave);ground(3.5,11,-140+D,-116+D,0,pave);ground(-3.5,3.5,-123+D,-116+D,0,pave);ground(-3.5,3.5,-140+D,-131+D,0,pave);ground(-3.5,3.5,-131+D,-123+D,0,basinM);
  const MP=waterZone(-3.5,3.5,-131+D,-123+D,0,1.0,{floor:0,start:'high',shell:{x:-4.3,z:-122.4+D,y:0}});
  const AWN=[0xc0302a,0x3a7ac0,0xe0a020,0x3f8a45];
  for(const s of[-1,1])for(let i=0;i<3;i++){const z=-119-i*7.5+D,x=s*8.6,c=AWN[(i+(s>0?1:0))%4];const sm=W.group.children.length;
    box(x-1.4,x+1.4,0,1.0,z-1,z+1,M(0x8a5a2e),{occ:false});for(const dz of[-1,1])addMesh(new THREE.CylinderGeometry(0.06,0.06,2.4,5),M(0x6a4020),x+s*1.3,1.2,z+dz);
    const aw=addMesh(new THREE.BoxGeometry(3.2,0.1,2.6),M(c),x,2.45,z);aw.rotation.z=-s*0.18;
    for(let k=0;k<5;k++)addMesh(new THREE.SphereGeometry(0.16,8,6),M([0xff6a4a,0xffd23a,0x7ad04a,0xc05ad0][k%4]),x-0.9+k*0.45,1.15,z+rand(-0.4,0.4));fadeable(since(sm));}
// ---- дальше — late_99e_k21_p2_market.js и следующие части (сборка склеивает их по имени файла) ----
