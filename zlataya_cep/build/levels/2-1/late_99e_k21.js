/* ============================== РЕЛИЗ final06 · 2-1 «ГУСЛИ САДКО» — ВДВОЕ ДЛИННЕЕ ============================== */
// Начало прежнее: Садко и струна, гусли, фонтан, терем-библиотека, улица участков (причал и дом-колодец у каждого своя сторона).
// Садко теперь ещё и наигрывает свой напев — четыре звука, их Китеж вспомнит в 2-5. Новые участки:
//   Г2 «Переливная улица» — два канала, вода у них одна (перелив через заслонку на дне); тяжёлый Потап стоит на заслонке, даже
//      оставленный; прилив у одного — отлив у другого; лодкой к террасе, верёвка открывает ворота ДРУГА — надо по очереди.
//   Ж2 «Палаты Морского царя» (былина о Садко) — играют гусли у стула гусляра — царь пляшет, двери открыты, по палатам катятся
//      волны (прыгать в такт); сменил героя — оставленный доигрывает 15 с; у трона второй стул — чтобы прошёл и тот, кто играл.
//   З2 «Сад Китежа» — родник наполняет сад; ракушка на дне, в приливе дойдёт только Потап; Йоша растит водоросли-лесенки к террасе;
//      родник снова наполняет сад через 10 с — оставленный держит отлив напевом; на ростке — якорь, Потап поднимет.
// Шлюзы, колодец-лифт, торговые ряды, две раковины и ворота — прежние, дальше по улице. Звеньев столько же (4), орешков больше.
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
  /* ---------- Г2. Переливная улица: вода одна на две улицы, заслонка на дне — держит тяжёлый Потап ---------- */
  // два канала через стену; вода у них одна: прилив у одного — отлив у другого, пока Потап стоит на заслонке (он в глубокой воде не всплывает).
  // В конце каждого канала — терраса: в прилив лодка подвозит к ней. Верёвка на террасе открывает ворота ДРУГОЙ стороны.
  ground(-11,11,-80,-76,0,pave);bell(0,-78);
  {const dm=W.group.children.length;box(-1.2,1.2,-2.4,5.5,-116,-80,M(0xd0c8b0));for(let z=-82;z>-116;z-=4)addMesh(new THREE.CylinderGeometry(0.25,0.3,0.9,8),goldM,0,5.95,z);fadeable(since(dm));}
  ground(-11,-1.2,-108,-80,-2.4,canM);ground(1.2,11,-108,-80,-2.4,canM);
  for(const s of[-1,1])for(let i=0;i<7;i++){const x0=s<0?-11:9.4,x1=s<0?-9.4:11;box(x0,x1,-2.4,-0.3*(i+1),-80.6-i*0.6,-80-i*0.6,stone,{occ:false});}   // ступени в канал
  // арка заслонки в стене (со стороны левого канала) — сквозь неё вода переливается
  {const ag=W.group.children.length;addMesh(new THREE.BoxGeometry(0.08,1.4,1.8),M(0x10202a),-1.25,-1.7,-95);addMesh(new THREE.BoxGeometry(0.12,0.16,2.1),goldM,-1.27,-0.94,-95);
    for(const dz of[-0.98,0.98])addMesh(new THREE.BoxGeometry(0.12,1.5,0.16),goldM,-1.27,-1.65,-95+dz);addMesh(new THREE.BoxGeometry(0.08,1.4,1.8),M(0x10202a),1.25,-1.7,-95);fadeable(since(ag));}
  const CL=waterZone(-11,-1.2,-108,-80,-2.4,2.6,{floor:-2.4,start:'low',shell:{x:-10.3,z:-79.3,y:0}});CL.heavy=true;
  const CR=waterZone(1.2,11,-108,-80,-2.4,2.6,{floor:-2.4,start:'high',shell:{x:10.3,z:-79.3,y:0}});CR.heavy=true;
  const SLU=FIN.kwSluice(-2.8,-2.4,-95,{heavy:true,gate:{x:-1.32,z:-95,w:1.6,h:1.3,ry:Math.PI/2}});
  FIN.kwLink(CL,CR,{open:()=>SLU.held(),via:new V3(0,-1.7,-95),closedText:'Заслонка на дне закрыта — воде некуда уйти. Потапа на неё поставь!'});
  const boatL=floater(CL,-9.8,-6.8,-107.8,-103.6,0.7,{rest:-2.4,draft:0.5}),boatR=floater(CR,6.8,9.8,-107.8,-103.6,0.7,{rest:-2.4,draft:0.5});
  // террасы, лестницы вниз и ворота на лестницах
  box(-11,-1.2,-2.4,3.2,-112,-108,stepM);box(1.2,11,-2.4,3.2,-112,-108,stepM);
  for(const s of[-1,1])for(let i=0;i<8;i++){const x0=s<0?-11:1.2,x1=s<0?-1.2:11;box(x0,x1,0,3.2-0.4*(i+1),-112.5-0.5*i,-112-0.5*i,stepM,{occ:false});}
  for(const[y,z]of[[3.2,-108]])for(let x=-10;x<=10;x+=2.5)if(Math.abs(x)>1.5)addMesh(new THREE.SphereGeometry(0.16,8,6),goldM,x,y+0.12,z+0.1);
  const rgate=s=>{const g=new THREE.Group();W.group.add(g);const x0=s<0?-11:1.2,x1=s<0?-1.2:11;for(let x=x0+0.4;x<x1;x+=0.7)addMesh(new THREE.BoxGeometry(0.12,3.2,0.12),goldM,x,4.8,-112.2,g);
    addMesh(new THREE.BoxGeometry(x1-x0,0.16,0.16),goldM,(x0+x1)/2,6.3,-112.2,g);addMesh(new THREE.BoxGeometry(x1-x0,0.16,0.16),goldM,(x0+x1)/2,3.6,-112.2,g);return {g,col:colBox(x0,x1,3.2,6.4,-112.4,-112.0,false),open:false};};
  const PG=[rgate(-1),rgate(1)];
  const openPG=i=>{const q=PG[i];if(q.open)return;q.open=true;q.col.on=false;SFX.gate();anim(1.4,k=>{q.g.position.y=3.4*smooth(k);});};
  const ropes=[-1,1].map(s=>{const x=s*5.2,g=new THREE.Group();g.position.set(x,3.2,-110.4);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.1,0.12,2.6,6),M(0x6a4020),0,1.3,0,g);
    const rope=addMesh(new THREE.CylinderGeometry(0.035,0.035,1.6,5),M(0xd8c090),0.3,1.6,0,g);const fl=addMesh(new THREE.BoxGeometry(0.7,0.45,0.03),M(s<0?PCOL[0]:PCOL[1]),0.42,2.4,0,g);return {g,rope,fl,pulled:false,s};});
  ropes.forEach((R,i)=>W.hittables.push({pos:new V3(R.s*5.2,4.2,-110.4),r:1.1,push:false,alive:()=>!R.pulled,onHit:h=>{if(h.pos.y<2.9)return;R.pulled=true;SFX.latch();SFX.ok();
    anim(0.7,k=>{R.rope.scale.y=1-0.5*k;R.fl.position.y=2.4-1.4*k;});openPG(1-i);banner(i?'Правая верёвка!':'Левая верёвка!','#ffffff',1.8,'открылись ворота '+(i?'левой':'правой')+' стороны — друга');}}));
  const pkR=pike(6.4,-91,CR,-2.4,{pi:1});
  const nutCanal=nutItem(-10.1,-1.9,-99.5),nutTerrace=nutItem(10.2,3.75,-111.3);
  bell(-6,-114.4,1.6);bell(6,-114.4,1.6);
  /* ---------- Д. шлюзы Китежа: три ступени воды — прилив поднимает на следующую (дальше на 40 м) ---------- */
  const D=-40;
  ground(-11,11,-80+D,-76+D,0,pave);ground(-11,11,-88+D,-80+D,0,basinM);
  box(-11,11,0,2.6,-96+D,-88+D,stepM);box(-11,11,0,5.2,-104+D,-96+D,stepM);
  for(const[y,z]of[[2.62,-92+D],[5.22,-100+D]])addMesh(new THREE.BoxGeometry(22,0.04,8),basinM,0,y,z).receiveShadow=true;
  for(const[y,z]of[[2.6,-88+D],[5.2,-96+D],[7.8,-104+D]])for(let x=-9;x<=9;x+=3)addMesh(new THREE.SphereGeometry(0.16,8,6),goldM,x,y+0.12,z+0.1);   // золотые шишечки по краю ступени
  const L1=waterZone(-11,11,-88+D,-80+D,0,2.9,{shell:{x:-9.4,z:-80.6+D,y:0}});
  const L2=waterZone(-11,11,-96+D,-88+D,2.6,5.5,{floor:2.6,shell:{x:9.4,z:-88.7+D,y:2.6}});
  const L3=waterZone(-11,11,-104+D,-96+D,5.2,8.1,{floor:5.2,shell:{x:-9.4,z:-96.7+D,y:5.2}});
  for(let i=0;i<14;i++){const z=rand(-103,-81)+D,y=z>-88+D?0:z>-96+D?2.6:5.2;const w=addMesh(new THREE.CylinderGeometry(0.05,0.08,rand(0.8,1.6),5),M(0x3f8a5a),rand(-10,10),y+0.5,z);w.rotation.z=rand(-0.3,0.3);}   // водоросли
  pike(-5,-92+D,L2,2.6,{});pike(5,-100+D,L3,5.2,{});
  nutItem(8.5,5.9,-92.5+D);nutItem(-8,8.5,-100.5+D);bell(0,-78+D);
  /* ---------- Е. колодец-лифт: отлив опускает вниз, к торговым рядам ---------- */
  box(-11,-3,0,7.8,-116+D,-104+D,stepM);box(3,11,0,7.8,-116+D,-104+D,stepM);box(-3,3,0,7.8,-110+D,-104+D,stepM);
  ground(-3,3,-116+D,-110+D,0,basinM);
  const LIFT=waterZone(-3,3,-116+D,-110+D,0,7.8,{start:'high',floor:0,shell:{x:3.7,z:-109.4+D,y:7.8},curb:false});
  {const ag=W.group.children.length;for(const sd of[-1,1])box(sd*3.3-0.3,sd*3.3+0.3,7.8,11.2,-110.6+D,-110+D,stepM,{occ:false});addMesh(new THREE.BoxGeometry(7.2,0.6,0.7),stepM,0,11.4,-110.3+D);kdome(0,-110.3+D,0.35,11.7);fadeable(since(ag));}
  bell(-6,-107+D,7.8);
  /* ---------- Ж. торговые ряды: раки и Жемчужница на дне пруда; отлив — она ахает и раскрывается ---------- */
  ground(-11,-3.5,-140+D,-116+D,0,pave);ground(3.5,11,-140+D,-116+D,0,pave);ground(-3.5,3.5,-123+D,-116+D,0,pave);ground(-3.5,3.5,-140+D,-131+D,0,pave);ground(-3.5,3.5,-131+D,-123+D,0,basinM);
  const MP=waterZone(-3.5,3.5,-131+D,-123+D,0,1.0,{floor:0,start:'high',shell:{x:-4.3,z:-122.4+D,y:0}});
  const AWN=[0xc0302a,0x3a7ac0,0xe0a020,0x3f8a45];
  for(const s of[-1,1])for(let i=0;i<3;i++){const z=-119-i*7.5+D,x=s*8.6,c=AWN[(i+(s>0?1:0))%4];const sm=W.group.children.length;
    box(x-1.4,x+1.4,0,1.0,z-1,z+1,M(0x8a5a2e),{occ:false});for(const dz of[-1,1])addMesh(new THREE.CylinderGeometry(0.06,0.06,2.4,5),M(0x6a4020),x+s*1.3,1.2,z+dz);
    const aw=addMesh(new THREE.BoxGeometry(3.2,0.1,2.6),M(c),x,2.45,z);aw.rotation.z=-s*0.18;
    for(let k=0;k<5;k++)addMesh(new THREE.SphereGeometry(0.16,8,6),M([0xff6a4a,0xffd23a,0x7ad04a,0xc05ad0][k%4]),x-0.9+k*0.45,1.15,z+rand(-0.4,0.4));fadeable(since(sm));}
  const mkt={started:false,done:false,list:[]};
  const mktGate=makeGate(-11,11,-139+D,'thread','market',{h:2.6});
  nutItem(-8.6,1.6,-134+D);
  /* ---------- Ж1. Звонкая мостовая: осётр-великан напевает напев Садко; звонкие плиты — «дзинь, дилинь» по очереди, «дон-дон» вместе ---------- */
  // дальше всё сдвинуто на 34 м: Звонкая мостовая встала между торговыми рядами и палатами Морского царя
  const S1=-34;
  ground(-11,11,-214,-180,0,M(0xa8b4a6));
  for(const x of[-9.4,9.4])for(const z of[-185,-193,-201,-209]){addMesh(new THREE.CylinderGeometry(0.4,0.48,4.6,10),stone,x,2.3,z);addMesh(new THREE.SphereGeometry(0.42,10,8),goldM,x,4.8,z);W.cyls.push({x,z,r:0.48,miny:-1,maxy:4.6,on:true});}
  const TUNE=[{x:-4.6,z:-189.5,n:67,w:'дзинь',c:0xffd23a},{x:4.6,z:-189.5,n:71,w:'дилинь',c:0x5ab8ff},{x:-4.6,z:-201,n:74,w:'дон',c:0xff7ab0},{x:4.6,z:-201,n:72,w:'дон',c:0x6ad86a}].map((t,i)=>{
    const g=new THREE.Group();g.position.set(t.x,0,t.z);W.group.add(g);const mat=M(t.c,{emissive:t.c,emissiveIntensity:0.15});
    addMesh(new THREE.CylinderGeometry(1.35,1.45,0.12,28),goldM,0,0.06,0,g);addMesh(new THREE.CylinderGeometry(1.1,1.1,0.14,28),mat,0,0.08,0,g);const rim=addMesh(new THREE.TorusGeometry(1.25,0.06,6,32),goldM,0,0.15,0,g);rim.rotation.x=Math.PI/2;
    const note=new THREE.Sprite(new THREE.SpriteMaterial({map:KW_NOTE_TEX,color:t.c,transparent:true,depthWrite:false}));note.scale.setScalar(0.9);note.position.set(0,2.0,0);note.raycast=()=>{};g.add(note);
    const word=new THREE.Sprite(new THREE.SpriteMaterial({map:k21Label(t.w,t.c),transparent:true,depthWrite:false}));word.scale.set(1.8,0.6,1);word.position.set(0,1.05,0);word.raycast=()=>{};g.add(word);
    g.traverse(c=>{c.userData.noBatch=true;});return Object.assign(t,{i,g,mat,note,on:false,fresh:false,lit:0});});
  const TS={step:0,t:0,done:false,fails:0};
  {const pl=new THREE.Mesh(new THREE.PlaneGeometry(4.2,1.7),new THREE.MeshBasicMaterial({map:K21_TUNE_TEX}));pl.position.set(0,2.6,-182.6);W.group.add(pl);for(const sx of[-1.9,1.9])addMesh(new THREE.CylinderGeometry(0.07,0.07,2.6,6),M(0x6a4020),sx,1.3,-182.7);}
  const tuneGate=new THREE.Group();W.group.add(tuneGate);for(let x=-10.6;x<=10.6;x+=0.7)addMesh(new THREE.BoxGeometry(0.12,4.2,0.12),goldM,x,2.1,-212.9,tuneGate);for(const y of[1.2,2.6,4.0])addMesh(new THREE.BoxGeometry(22,0.14,0.14),goldM,0,y,-212.9,tuneGate);
  const tgBells=[];for(let x=-9;x<=9;x+=3)tgBells.push(addMesh(new THREE.ConeGeometry(0.22,0.32,10),goldM,x,4.35,-212.9,tuneGate));
  const tuneCol=colBox(-11,11,0,4.4,-213.2,-212.6,false);
  const nutTune=nutItem(9.8,0.6,-196.6);
  const sturg=sturgeonMesh21();sturg.g.visible=false;
  /* ---------- Ж2. Палаты Морского царя: пляска в два голоса у самого трона ---------- */
  // былина о Садко: Морской царь велит играть — и пляшет так, что море ходуном ходит. Два стула гусляра — прямо перед троном:
  // царь пляшет, только когда играют оба (в два голоса); от пляски по палатам расходятся кольца-волны — играющих у трона они задевают,
  // через них прыгают. Пляс-ракушки над троном копят пляску — три колена (барыня, вприсядку, шибче); во втором колене с венца
  // сыплются жемчужинки — подбери, и пляска пойдёт быстрее. Наплясался — ролик: наверху от пляски корабли качаются; царь отворяет двери.
  const K0=-180+S1,TZ=K0-34.8;
  const hallM=M(0xc8dcd6);ground(-11,11,K0-38,K0,0,hallM);
  for(let z=K0-2;z>K0-36;z-=2.4)for(let x=-10;x<=10;x+=2.4)if(((x+z)|0)%2===0)addMesh(new THREE.BoxGeometry(2.3,0.02,2.3),M(0xe8f0ee),x,0.012,z).receiveShadow=true;   // перламутровые плиты
  for(const x of[-8.2,8.2])for(const z of[K0-6,K0-14,K0-22,K0-30]){addMesh(new THREE.CylinderGeometry(0.42,0.5,6,10),M(0xd8e8e4),x,3,z);addMesh(new THREE.TorusGeometry(0.5,0.1,6,14),goldM,x,5.6,z).rotation.x=Math.PI/2;W.cyls.push({x,z,r:0.5,miny:-1,maxy:6,on:true});}
  {const wm=W.group.children.length;box(-11,-9,0,6.4,K0-37.4,K0-36.6,wallM);box(-5,5,0,6.4,K0-37.4,K0-36.6,wallM);box(9,11,0,6.4,K0-37.4,K0-36.6,wallM);
    box(-11,11,6.4,7.0,K0-37.4,K0-36.6,wallM,{solid:false});kdome(0,K0-37,0.55,7);fadeable(since(wm));}
  const HD=[-7,7].map(x=>{const g=new THREE.Group();W.group.add(g);for(let k=0;k<6;k++)addMesh(new THREE.BoxGeometry(0.6,4.2,0.25),M(0x5aa0a0,{emissive:0x0a3a40,emissiveIntensity:0.4}),x-1.65+k*0.66,2.1,K0-37,g);
    return {g,col:colBox(x-2,x+2,0,4.4,K0-37.4,K0-36.6,false),k:0};});
  box(-3.2,3.2,0,1.2,TZ-1.8,TZ+2.2,stepM,{occ:false});
  const king=kingMesh21();king.g.position.set(0,1.2,TZ);W.cyls.push({x:0,z:TZ,r:1.1,miny:-1,maxy:4.6,on:true});
  // пляс-ракушки над троном: три колена по три ракушки
  const PLS=[];for(let i=0;i<9;i++){const a=(i-4)*0.27,g=new THREE.Group();g.position.set(Math.sin(a)*4.6,5.4+Math.cos(a)*1.2,TZ-1.4);W.group.add(g);const mat=M([0xffd23a,0x5ab8ff,0xff7ab0][Math.floor(i/3)],{emissive:[0xffb000,0x3a8aff,0xff4a8a][Math.floor(i/3)],emissiveIntensity:0.08});
    for(let k=0;k<5;k++){const r=addMesh(new THREE.BoxGeometry(0.12,0.5,0.06),mat,Math.sin((k-2)*0.3)*0.22,Math.cos((k-2)*0.3)*0.22,0,g);r.rotation.z=-(k-2)*0.3;}g.traverse(c=>{c.userData.noBatch=true;});PLS.push({g,mat});}
  // гусли — прямо перед троном: два стула, два голоса
  const SEATREF=[0,1].map(i=>({hum:0,ring(h){const was=this.hum;this.hum=6;if(was<=0)[67,71,74,79].forEach((m,k)=>gusli(m+(i?5:0),k*0.09,0.12));}}));
  const seats=[-3.6,3.6].map((x,i)=>kwShell('dance',x,TZ+6.4,0,SEATREF[i],{ry:Math.PI,say:i?'Второй голос!':'Первый голос!'}));
  for(const s of seats)box(s.x-0.55,s.x+0.55,0,0.5,s.z-0.55,s.z+0.55,M(0x8a5a2e),{occ:false});
  // рыбий хор и лучи света — пляшут вместе с царём
  const CHOIR=new THREE.Group();CHOIR.position.set(0,0,TZ);W.group.add(CHOIR);const chF=[];for(let i=0;i<12;i++){const f=new THREE.Group();const fm=M([0xffd23a,0xff7a5a,0x5ab8ff,0xe07ad8][i%4]);
    const b=addMesh(new THREE.SphereGeometry(0.2,8,6),fm,0,0,0,f);b.scale.set(0.6,0.8,1.5);const t=addMesh(new THREE.ConeGeometry(0.16,0.24,4),fm,0,0,-0.36,f);t.rotation.x=-Math.PI/2;CHOIR.add(f);chF.push({f,a:i/12*Math.PI*2,r:3.2+(i%3)*0.9,y:2+(i%4)*0.7});}
  CHOIR.traverse(c=>{c.userData.noBatch=true;});
  const RAYS=[0,1,2].map(i=>{const m=new THREE.Mesh(new THREE.ConeGeometry(2.2,14,16,1,true),MB([0xffe08a,0x9fe6ff,0xffb0d0][i],{transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending}));
    m.position.set(0,7,TZ+4);m.userData.noBatch=true;W.group.add(m);return m;});
  const WAV=[],PRL=[];const KD={on:false,meter:0,round:0,waveT:1,side:1,lonely:0,pearlT:2,pearls:0};
  const nutHall=nutItem(-9.6,0.6,K0-27);
  // корабли наверху, у самой глади — видно лишь в ролике: от пляски их качает
  const SHIPS=new THREE.Group();SHIPS.visible=false;W.group.add(SHIPS);{const sil=MB(0x15303c,{fog:false}),sky=MB(0xbff4ff,{transparent:true,opacity:0.55,fog:false,side:THREE.DoubleSide,depthWrite:false});
    const top=new THREE.Mesh(new THREE.PlaneGeometry(90,90,1,1),sky);top.rotation.x=Math.PI/2;top.position.set(0,24,TZ);SHIPS.add(top);
    for(const [x,z,s] of[[-7,TZ+2,1.1],[2,TZ-5,1.4],[9,TZ+4,0.9]]){const sh=new THREE.Group();sh.position.set(x,22.6,z);sh.scale.setScalar(s);SHIPS.add(sh);const hull=new THREE.Mesh(new THREE.BoxGeometry(4.6,1.0,1.4),sil);sh.add(hull);
      const bow=new THREE.Mesh(new THREE.ConeGeometry(0.7,1.4,4),sil);bow.rotation.z=-Math.PI/2;bow.position.x=2.9;sh.add(bow);const mast=new THREE.Mesh(new THREE.BoxGeometry(0.12,4.2,0.12),sil);mast.position.y=2.4;sh.add(mast);
      const sail=new THREE.Mesh(new THREE.PlaneGeometry(2.4,2.4),sil);sail.position.set(0,2.8,0);sh.add(sail);sh.userData.ph=Math.random()*6;}
    SHIPS.traverse(c=>{c.userData.noBatch=true;c.castShadow=false;});}
  /* ---------- З. две раковины: левой воде — прилив, правой — отлив, одновременно (дальше на 78 м) ---------- */
  const D2=-78+S1;
  ground(-11,11,-142+D2,-140+D2,0,pave);ground(-11,-1,-156+D2,-142+D2,0,basinM);ground(1,11,-156+D2,-142+D2,0,basinM);box(-1,1,0,3.2,-156+D2,-142+D2,stepM);
  const LZ=waterZone(-11,-1,-156+D2,-142+D2,0,2.4,{shell:{x:-2.1,z:-142.6+D2,y:0}});
  const RZ=waterZone(1,11,-156+D2,-142+D2,0,2.4,{start:'high',shell:{x:2.1,z:-142.6+D2,y:0}});
  const board=(x,txt,col)=>{const b=new THREE.Mesh(new THREE.PlaneGeometry(4.2,1.3),new THREE.MeshBasicMaterial({map:scratchTex(txt,512,160,'#f4ecd8',col)}));b.position.set(x,4.6,-155.6+D2);W.group.add(b);
    addMesh(new THREE.CylinderGeometry(0.07,0.07,4.6,6),M(0x6a4020),x,2.3,-155.8+D2);return b;};
  board(-6,'↑ ПРИЛИВ ↑','#1a5a8a');board(6,'↓ ОТЛИВ ↓','#8a3a1a');
  const grate=new THREE.Group();W.group.add(grate);const gm2=M(0x5a4a3a);
  for(let x=-10.5;x<=10.5;x+=0.75)addMesh(new THREE.BoxGeometry(0.14,3.6,0.14),gm2,x,1.8,-156.5+D2,grate);for(const y of[0.8,2.2,3.4])addMesh(new THREE.BoxGeometry(22,0.16,0.16),gm2,0,y,-156.5+D2,grate);
  const grateCol=colBox(-11,11,0,3.6,-156.8+D2,-156.2+D2,false);
  /* ---------- З2. Сад Китежа: родник наполняет сад; ракушка — на дне, у неё только тяжёлый Потап; водоросли-лесенки Йоши ---------- */
  // в приливе сад — глубокий пруд: до ракушки на дне дойдёт лишь Потап (не всплывает). Отлив открывает дно: Йоша поливает ростки —
  // вырастают лесенки к террасе. Родник через 10 с снова наполняет сад — если оставленный не держит напев. На одном ростке — якорь: Потап поднимет.
  const DG=S1;   // сад сдвинут вместе со всем, что дальше
  ground(-11,11,-237+DG,-234+DG,0,pave);bell(0,-235.6+DG);
  ground(-9,9,-259+DG,-237+DG,-4,M(0x4a6a5a));ground(-11,-9,-259+DG,-237+DG,0,pave);ground(9,11,-259+DG,-237+DG,0,pave);
  for(const s of[-1,1])for(let i=0;i<9;i++){const x0=s<0?-9:7.4,x1=s<0?-7.4:9;box(x0,x1,-4,-0.4*(i+1),-237.6-0.6*i+DG,-237-0.6*i+DG,stone,{occ:false});}   // ступени на дно сада
  box(-11,11,-4,4.5,-263+DG,-259+DG,stepM);for(let i=0;i<9;i++)box(-11,11,0,4.5-0.5*(i+1),-263.33-0.33*i+DG,-263-0.33*i+DG,stepM,{occ:false});
  for(let x=-10;x<=10;x+=2.5)addMesh(new THREE.SphereGeometry(0.16,8,6),goldM,x,4.62,-259.1+DG);
  const GARD=waterZone(-9,9,-259+DG,-237+DG,-4,0.8,{floor:-4,start:'high',shell:{x:0,z:-246.4+DG,y:-4}});GARD.heavy=true;GARD.kwHoldable=true;GARD.holdT=0;
  GARD.lock=(pi,h,want)=>h.pos.y>-3.2?'Ракушка сада — на дне, у родника. Дотянись до неё!':null;
  {const sp=new THREE.Group();sp.position.set(0,-4,-249.4+DG);W.group.add(sp);addMesh(new THREE.CylinderGeometry(0.9,1.2,0.6,10),stone,0,0.3,0,sp);addMesh(new THREE.SphereGeometry(0.35,10,8),M(0x9fefff,{emissive:0x3ab0c0,emissiveIntensity:0.7}),0,0.65,0,sp);W.cyls.push({x:0,z:-249.4+DG,r:1.1,miny:-5,maxy:-3.4,on:true});}
  {let sd=4242;const rr=(a,b)=>{sd=(sd*16807)%2147483647;return a+(b-a)*sd/2147483647;};   // деревца с ветками-коллизиями — места одни и те же при каждой загрузке
    for(let i=0;i<10;i++){const x=rr(-8,8),z=rr(-257,-239);if(Math.abs(x)<2&&z<-245)continue;if(Math.hypot(Math.abs(x)-4,z+256.9)<2.4)continue;appleSea21(x,-4,z+DG);}}   // у лесенок — пусто
  const KS=[FIN.kwKelp(-4,-4,-256.9+DG,8.5,{last:-Math.PI/2}),FIN.kwKelp(4,-4,-256.9+DG,8.5,{last:-Math.PI/2,active:()=>!!F.anchor})];   // винтовые лесенки: верхний лист — вровень с террасой
  const anchor=new THREE.Group();anchor.position.set(4,-4,-256.9+DG);W.group.add(anchor);{const im=M(0x5a6068);addMesh(new THREE.BoxGeometry(0.16,1.6,0.16),im,0,0.8,0,anchor).rotation.z=0.5;const t=addMesh(new THREE.TorusGeometry(0.55,0.08,6,12,Math.PI),im,0.2,0.4,0,anchor);t.rotation.z=Math.PI+0.5;
    addMesh(new THREE.TorusGeometry(0.16,0.05,6,12),im,-0.38,1.5,0,anchor);}
  W.lifts.push({pos:new V3(4,-4,-256.9+DG),active:()=>!F.anchor,onLift:h=>{F.anchor=true;SFX.toss();anim(1.0,k=>{anchor.position.set(4+k*2.4,-4+Math.sin(k*Math.PI)*1.6,-256.9+DG+k*1.2);anchor.rotation.z=k*1.4;});
    later(0.5,()=>bark(h,'potap','Якорь… как пёрышко! Ну, почти.',2,true));}});
  const nutGarden=(p=>nutItem(p.x,p.y+0.6,p.z))(KS[1].padAt(11));   // орешек над листом лесенки — по пути наверх
  /* ---------- З3. Рак-Отшельник у ворот Китежа: мини-босс в два этапа (late_99m_k21_hermit.js) ---------- */
  const HB=FIN.hermitBoss({z0:-266+DG,z1:-310+DG});
  /* ---------- И. ворота Китежа (дальше на 110 м) ---------- */
  const D3=-110+S1-44;   // ворота — за ареной Рака-Отшельника
  ground(-11,11,-172+D3,-156+D3,0,pave);
  {const gm=W.group.children.length;for(const sd of[-1,1])box(sd*3.9-0.9,sd*3.9+0.9,0,5.2,-167+D3,-165.6+D3,wallM);addMesh(new THREE.BoxGeometry(9.6,1.1,1.6),wallM,0,5.75,-166.3+D3);kdome(0,-166.3+D3,0.5,6.3);fadeable(since(gm));}
  const endLink=linkItem(0,1.1,-162.6+D3);bell(0,-158.6+D3);
  FIN.kwPrompts();
  W.updates.push(dt=>{
    if(!mkt.started&&[0,1].some(pi=>active(pi).pos.z<-118.5+D&&active(pi).pos.y<3)){mkt.started=true;SFX.gate();
      mkt.list=[crab(-6.5,-126+D,null,{leash:6}),crab(6.5,-126+D,null,{leash:6}),FIN.pearlClam(0,-127+D,MP,0,{})];
      banner('Торговые ряды!','#9fd0ff',2.2,'раки щиплют красным — кувырком · Жемчужница в пруду: отлив — ахнет и раскроется');}
    if(mkt.started&&!mkt.done&&mkt.list.every(e=>!e.alive)){mkt.done=true;mktGate.forceOpen=true;SFX.ok();banner('Отбились!','#ffffff',1.8,'дальше — палаты Морского царя');}
    if(!F.grate){const ok=LZ.state==='high'&&LZ.t>=1&&RZ.state==='low'&&RZ.t>=1;
      if(ok){F.grate=true;grateCol.on=false;SFX.gate();SFX.ok();anim(1.6,k=>{grate.position.y=3.8*smooth(k);});banner('Решётка поднялась!','#ffffff',2,'вместе получилось');}}
    // Переливная улица
    if(!F.perelTold&&[0,1].some(pi=>active(pi).pos.z<-79&&active(pi).pos.z>-82)){F.perelTold=true;perelScene();}
    // Звонкая мостовая: осётр напевает напев; плиты по напеву
    if(!F.sturg&&!G.cine&&[0,1].some(pi=>active(pi).pos.z<-182.5&&active(pi).pos.z>-213)){F.sturg=true;sturgeonPass();}
    tuneTick(dt);
    // палаты: пляска в два голоса
    danceTick(dt);
    // Сад Китежа: родник наполняет сад через 10 с отлива; напев оставленного держит отлив
    GARD.holdT=Math.max(0,(GARD.holdT||0)-dt);
    if(GARD.state==='low'&&GARD.t>=1&&!G.cine){if(GARD.holdT<=0)F.gardT=(F.gardT||0)+dt;if(F.gardT>10){F.gardT=0;setWater(GARD,'high');banner('Родник опять наполнил сад!','#9fe6ff',1.8,'Потап — на дно, к ракушке; сменишь героя — оставленный подержит отлив');}}else F.gardT=0;
    if(!F.gardTold&&[0,1].some(pi=>active(pi).pos.z<-236.5+DG&&active(pi).pos.z>-240+DG)){F.gardTold=true;say('zven','Сад Китежа! Ракушка — на дне. Глубоко — только Потапу дойти!',3,true);}
    // Переливная: подсказка про Потапа, когда вода «не идёт»
    if(!F.out&&[0,1].every(pi=>active(pi).pos.z<-158+D3)&&[0,1].some(pi=>active(pi).pos.z<-168+D3)){F.out=true;finishLevel();}});
  W.tipZones.push({cond:(pi,h)=>[L1,L2,L3].some(z=>inZone(z,h,0)&&z.state==='low'&&h.pos.y<z.floor+0.4),text:pi=>'Стенка высока — не допрыгнуть никак.<br>Сыграй прилив '+K(pi,'item')+' — вода подымет на ступеньку, вот так.'},
    {cond:(pi,h)=>inZone(LIFT,h,0)&&h.pos.y>6,text:pi=>'Колодец-лифт: сыграй отлив '+K(pi,'item')+' — вода опустит вниз.'},
    {cond:(pi,h)=>mkt.started&&!mkt.done&&MP.state==='high'&&hd(h.pos,{x:0,z:-127+D})<7,text:pi=>'Жемчужница на дне пруда — створки не пробить.<br>Сыграй отлив '+K(pi,'item')+' — ахнет и раскроется. Или жемчужину её отбей назад!'},
    {cond:(pi,h)=>!F.grate&&h.pos.z<-141+D2&&h.pos.z>-157+D2,text:pi=>'Левой воде — прилив, правой — отлив. На таблички гляди!'},
    {cond:(pi,h)=>h.pos.z<-80&&h.pos.z>-108&&!SLU.held(),text:pi=>'Вода в каналах одна на двоих — через заслонку на дне левого канала.<br>Поставь на неё Потапа '+K(0,'swap')+': он тяжёлый, в воде не всплывёт — и держит, даже оставленный.'},
    {cond:(pi,h)=>h.pos.z<-80&&h.pos.z>-108&&SLU.held(),text:pi=>'Заслонку держат! Прилив у тебя '+K(pi,'item')+' — отлив у друга.<br>Лодка в прилив подвезёт к террасе, а верёвка там откроет ворота ДРУГА.'},
    {cond:(pi,h)=>h.pos.z<K0&&h.pos.z>K0-37&&F.kingMet&&!F.kingDone,text:pi=>KD.on?'Царь пляшет! Кольца-волны — прыгай '+K(pi,'jump')+'. Сбило — вернись к стулу и сыграй '+K(pi,'item')+'.'+(KD.round>=1?'<br>Жемчужинки с венца подбирай — пляска пойдёт шибче!':''):'Два стула гусляра — прямо перед троном. Играйте '+K(pi,'item')+' ОБА — царь пляшет в два голоса.<br>В одиночку: сыграй и смени героя '+K(pi,'swap')+' — оставленный доиграет 15 с, а ты — к другому стулу.'},
    {cond:(pi,h)=>h.pos.z<-182&&h.pos.z>-212.6&&!TS.done&&F.sturg,text:pi=>'Звонкие плиты — напев Садко: дзинь (жёлтая), дилинь (синяя) — по очереди;<br>дон-дон (розовая и зелёная) — вдвоём, разом. В одиночку оставь героя на плите '+K(pi,'swap')+'.'},
    {cond:(pi,h)=>h.pos.z<-237+DG&&h.pos.z>-259+DG&&GARD.state==='high'&&h.kind!=='potap',text:pi=>pi?'Сад залит. Ракушка — на дне, у родника. Только Потап туда дойдёт.<br>Попроси друга '+K(1,'call')+'.':'Сад залит. Ракушка — на дне, у родника. Потап тяжёлый — дойдёт по дну. Смени '+K(0,'swap')+'.'},
    {cond:(pi,h)=>h.pos.z<-237+DG&&h.pos.z>-259+DG&&GARD.state==='low',text:pi=>(KS.some(s=>!s.grown)?'Дно открыто! Йоша, полей ростки живой водой '+K(1,'skill')+' — вырастут лесенки.<br>':'')+'Родник наполнит сад через '+Math.max(0,Math.ceil(10-(F.gardT||0)))+' с. Наверх — с листа на лист!'});
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>[L1,L2,L3].some(z=>inZone(z,h(),0.2)&&z.state==='low'&&h().pos.y<z.floor+0.5),'прилив — наверх');
    prompt(pi,'item',()=>headOf(h()),()=>inZone(LIFT,h(),0.2)&&LIFT.state==='high'&&h().pos.y>6,'отлив — вниз');
    prompt(pi,'item',()=>headOf(h()),()=>mkt.started&&!mkt.done&&inZone(MP,h(),1.2)&&MP.state==='high','отлив — Жемчужница ахнет');
    prompt(pi,'item',()=>headOf(h()),()=>!F.grate&&inZone(LZ,h(),0.2)&&LZ.state==='low','прилив!');
    prompt(pi,'item',()=>headOf(h()),()=>!F.grate&&inZone(RZ,h(),0.2)&&RZ.state==='high','отлив!');
    prompt(pi,'item',()=>headOf(h()),()=>SLU.held()&&hd(h().pos,pi?CR.shell.g.position:CL.shell.g.position)<2&&(pi?CR:CL).state==='low','прилив — лодку к террасе');
    prompt(pi,'attack',()=>headOf(h()),()=>!ropes[pi].pulled&&h().pos.y>2.9&&hd(h().pos,ropes[pi].g.position)<2,'дёрни верёвку');
    prompt(pi,'item',()=>headOf(h()),()=>GARD.state==='high'&&inZone(GARD,h(),0)&&h().pos.y<-3,'отлив — открой дно');}
  prompt(0,'swap',()=>headOf(HERO.potap),()=>!SLU.held()&&HERO.proshka.active&&active(0).pos.z<-78&&active(0).pos.z>-108,'Потапа — на заслонку');
  prompt(0,'skill',()=>headOf(HERO.potap),()=>!F.anchor&&HERO.potap.active&&hd(HERO.potap.pos,{x:4,z:-258.3+DG})<2.3&&HERO.potap.pos.y<-3,'поднять якорь');
  prompt(1,'skill',()=>headOf(HERO.yosha),()=>HERO.yosha.active&&KS.some(s=>!s.grown&&hd(s,HERO.yosha.pos)<3&&Math.abs(HERO.yosha.pos.y-s.y)<2.2&&(s===KS[0]||F.anchor)),'живая вода — росток');
  /* ---------- сюжет ---------- */
  function sadkoIntro(){F.stage='intro';
    play({dur:9.4,fov:48,shots:[shot(0,[-0.6,3.2,-7.6],[-6.4,1.2,-15]),shot(4.2,[-4.3,1.9,-12.2],[-6.3,1.4,-14.7])],
      says:[[0.3,3.8,null,'<i>На площади Садко сидит — струна на гуслях порвана,</i><br><i>И капля тёмная над ней горит, как проклятая.</i>',true],[4.3,2.6,'sadko','Без струны нет песни. Без песни — и Китеж молчит.'],[7.0,2.2,'zven','Йоша! Мёртвой водой полей — и струна срастётся!']],
      tick:(t)=>{sadko.head.rotation.x=0.25;sadko.drop.position.y=1.35+Math.sin(t*3)*0.04;},end:()=>{F.stage='sadko';}});}
  function giftScene(){F.stage='gift';const T=HERO,pe=T.pelageya;
    HEROES.forEach((h,i)=>{placeOnGround(h,-4.2+(i%2)*1.6,-12.6-Math.floor(i/2)*1.4,0);h.face=Math.atan2(-6.5-h.pos.x,-14.8-h.pos.z);});
    const gifts=[];
    play({dur:20.6,fov:48,shots:[shot(0,[-4.6,1.8,-12.1],[-6.4,1.3,-14.8]),shot(5.4,[-1.2,2.8,-9.6],[-5.2,1.1,-13.6]),shot(9,[-3.8,1.6,-12.2],[-6.4,1.7,-14.8]),shot(17.4,[-1.8,1.5,-10.8],[pe.pos.x,0.9,pe.pos.z])],
      says:[[0.3,2.2,null,'<i>Срастается струна — звенит.</i>',true],[2.3,3.0,'sadko','Ох, запела! Спасибо, малые, спасибо!'],[5.6,3.4,'sadko','Играйте на ходу. Вода любит, когда с нею речь ведут.'],
        [9.2,2.4,'sadko','Лишь в Китеже не молчите — говорю.'],[11.7,2.4,'sadko','Только в Китеже — не молчите.'],[14.2,3.2,'sadko','Только в Китеже не молчите: кто молчит — того вода унесёт.'],[17.6,2.8,null,'<i>Пелагея клюв в перья прячет —</i><br><i>Вслух говорить ей трудно, иначе.</i>',true]],
      events:[{t:0,fn:()=>{sadko.drop.visible=false;SFX.grow();burst(new V3(-6.1,1.4,-14.4),0x9fe6ff,16,3);}},
        {t:1.4,fn:()=>{[67,71,74,79,78,74,71,74].forEach((m,i)=>later(i*0.22,()=>{gusli(m,0,0.18);sadko.arms.forEach((a,k)=>{a.rotation.x=(i+k)%2?0.3:-0.2;});}));}},
        {t:6.0,fn:()=>{HEROES.forEach((h,i)=>{const g=new THREE.Group();gusliMesh(g,M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.8}),0.9);W.group.add(g);gifts.push(g);const a=new V3(-6.2,1.6,-14.4),to=h.pos.clone().add(new V3(0,h.d.height*0.6,0));
          anim(1.0+i*0.15,k=>{g.position.lerpVectors(a,to,k);g.position.y+=Math.sin(k*Math.PI)*1.6;g.rotation.y+=0.2;if(k>=1){W.group.remove(g);burst(to,COL.gold,10,2);SFX.knot();}});});}},
        {t:17.6,fn:()=>{pe.parts.beak.visible=false;anim(0.6,k=>{pe.body.scale.set(1+0.12*k,1-0.12*k,1+0.12*k);});}}],
      tick:(t)=>{sadko.head.rotation.x=t<9?0.1:0.2;sadko.body.rotation.z=Math.sin(t*2)*0.03;},
      end:()=>{pe.parts.beak.visible=true;pe.body.scale.set(1,1,1);W.abil.gusli=true;F.stage='gusli';later(0.3,tuneScene);}});}
  // напев Садко: четыре звука — их Китеж вспомнит в 2-5, когда колокола будут подымать ярусы
  function tuneScene(){const T=HERO,notes=[];
    play({dur:8.2,fov:46,shots:[shot(0,[-3.6,1.7,-11.4],[-6.4,1.4,-14.8]),shot(4.4,[-1.4,2.6,-9.8],[-5,1.6,-13.4])],
      says:[[0.3,3.6,'sadko','А вот вам напев мой — четыре звука. Запомните: дзинь, дилинь, дон, дон.'],[4.1,3.6,'sadko','Китеж его помнит. Как будить станете — пригодится.']],
      events:[{t:0.6,fn:()=>{FIN.SADKO_TUNE.forEach((m,i)=>later(i*0.55,()=>{gusli(m,0,0.2);sadko.arms.forEach((a,k)=>{a.rotation.x=(i+k)%2?0.35:-0.25;});
          const s=new THREE.Sprite(new THREE.SpriteMaterial({map:KW_NOTE_TEX,transparent:true,depthWrite:false,color:[0xffe08a,0x9fe6ff,0xffb0d0,0xb8ffb0][i]}));s.scale.setScalar(0.5);s.raycast=()=>{};s.position.set(-6.2,2.2,-14.4);W.group.add(s);notes.push(s);
          const to=new V3(-4.6+i*0.9,2.6+(i%2)*0.4,-12.6);anim(1.2,k=>{s.position.lerpVectors(new V3(-6.2,2.2,-14.4),to,smooth(k));});}));}},
        {t:4.4,fn:()=>{notes.forEach((s,i)=>{const h=HEROES[i],from=s.position.clone();anim(1.4,k=>{s.position.lerpVectors(from,h.pos.clone().add(new V3(0,h.d.height,0)),smooth(k));s.material.opacity=1-k*0.6;if(k>=1){W.group.remove(s);burst(h.pos.clone().add(new V3(0,h.d.height,0)),COL.gold,6,2);}});});}}],
      tick:(t)=>{sadko.head.rotation.x=0.12;sadko.body.rotation.z=Math.sin(t*2.2)*0.04;},
      end:()=>{notes.forEach(s=>W.group.remove(s));banner('Гусли Садко!','#ffd76a',2.8,'кнопка R или ; (на джойстике RB): вода подымется или опустится там, где стоишь');
        for(const pi of[0,1])tip(pi,'Ракушка с лодочкой воду кажет: лодочка вверху — прилив, внизу — отлив.<br>Играй на гуслях '+K(pi,'item')+' — вот и весь мотив.',4.2);}});}
  W.waterTargets.push({pos:new V3(-5.9,0,-14.5),active:()=>F.stage==='sadko',onWater:()=>{giftScene();}});
  function bookScene(){F.stage='book';const T=HERO,pr=T.proshka;const umb=new THREE.Group();W.group.add(umb);umb.visible=false;
    addMesh(new THREE.CylinderGeometry(0.02,0.02,0.9,5),M(0x6a4a2a),0,-0.45,0,umb);const can=addMesh(new THREE.ConeGeometry(0.75,0.35,10),M(0x4f9a3a),0,0.05,0,umb);can.scale.set(0.2,1,0.2);
    placeOnGround(pr,0,-35.25,0);pr.face=Math.PI;placeOnGround(T.potap,-1.7,-34.4,0);T.potap.face=Math.PI*0.9;placeOnGround(T.pelageya,1.6,-34.7,0);T.pelageya.face=-Math.PI*0.88;placeOnGround(T.yosha,0.9,-33.9,0);T.yosha.face=Math.PI;
    // смысловой моушн: книга сказок «дышит», щёлкает застёжка, крышка распахивается с золотым светом — сказки вот-вот встанут со страниц…
    // но страниц нет: картинки-раскладушки пустые, встают и никнут, пустая бумага рвётся и уплывает обрывками туда, где за водой звенят ключи
    const fx=new THREE.Group();W.group.add(fx);const pop=new THREE.Group();pop.position.set(0,0.07,0);book.add(pop);
    const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:K21_GLOW_TEX,color:0xffd76a,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}));glow.position.set(0,1.25,-36.5);glow.scale.setScalar(0.1);glow.raycast=()=>{};fx.add(glow);
    const cards=[[0,0.42,0.5,0],[-0.21,0.28,0.3,1],[0.21,0.28,0.3,2]].map(([x,w,hh,kind],i)=>{const c=new THREE.Group();c.position.set(x,0,-0.08+i*0.07);pop.add(c);
      const m=new THREE.Mesh(new THREE.PlaneGeometry(w,hh),new THREE.MeshBasicMaterial({map:K21_CARD_TEX[kind],transparent:true,side:THREE.DoubleSide}));m.position.y=hh/2;c.add(m);c.rotation.x=-Math.PI/2;return {c,m,w,hh};});
    const scraps=[];
    const backOut=k=>{const c1=1.9,c3=c1+1;return 1+c3*Math.pow(k-1,3)+c1*Math.pow(k-1,2);};
    play({dur:28,fov:46,camK:3.4,shots:[shot(0,[3.6,3.2,-30.2],[0,1.2,-36.5]),shot(3.1,[0.95,2.05,-34.5],[0,1.05,-36.5]),shot(7.5,[-1.35,1.28,-36.2],[-0.4,1.12,-36.5]),shot(12.6,[2.2,2.3,-33.6],[-6.4,2.2,-38.4]),
        shot(17.4,[1.9,1.9,-31.6],[0,1.9,-35.3],[1.9,1.4,-31.9],[0,5,-35.6],3),shot(23,[2.6,1.2,-32.4],[0.9,0.55,-33.9])],
      says:[[0.3,3.2,null,'<i>В библиотеке терема на подставке</i><br><i>Лежит толстая книга сказок, без закладки.</i>',true],[3.3,3.6,null,'<i>Прошка её открывает — в лапах один переплёт:</i><br><i>Все страницы вырваны — вот тебе и переворот.</i>',true],
        [7.7,2.4,null,'<i>На корешке кто-то ключом слова нацарапал.</i>',true],[10.2,2.8,'proshka','Тут нацарапано: «Не… про… меня». Кто ж так обиделся, кто заплакал?'],[13,3.2,null,'<i>За стеной воды тихо ключи звенят.</i>',true],
        [17.6,2.6,'proshka','Зонт из лопуха — от воды, от дождя!'],[20.5,2.4,null,'<i>Зонт всплывает — да без Прошки.</i>',true],[23.1,1.6,'yosha','Ха-ха-ха! Вот потеха!'],[24.9,3,null,'<i>Йоша смеётся — да на звон оглянется.</i>',true]],
      events:[{t:0,fn:()=>{spineDraw(0);front.rotation.z=0;}},
        // книга дышит, как живая
        {t:0.5,fn:()=>{anim(2.8,k=>{const b=Math.sin(k*Math.PI*4)*0.035*(1-k*0.4);book.scale.set(1-b*0.5,1+b,1-b*0.5);clasp.rotation.z=Math.sin(k*Math.PI*8)*0.12*k;});}},
        // щёлк — застёжка отскакивает
        {t:3.35,fn:()=>{SFX.latch();anim(0.35,k=>{clasp.rotation.z=-1.6*backOut(k);});burst(new V3(0.36,1.3,-36.5),COL.gold,6,1.5,0.4);}},
        // крышка распахивается справа налево, с отскоком; из книги — золотой свет
        {t:3.6,fn:()=>{SFX.flower();anim(1.0,k=>{front.rotation.z=Math.PI*0.93*backOut(k);});
          anim(1.0,k=>{glow.material.opacity=0.9*Math.min(1,k*2);glow.scale.setScalar(0.3+1.6*k);glow.position.y=1.25+0.25*k;});for(let i=0;i<10;i++)later(0.05*i,()=>burst(new V3(rand(-0.3,0.3),1.15,-36.5+rand(-0.35,0.35)),[COL.gold,0xfff2c0][i%2],2,2,0.5));}},
        // картинки-раскладушки встают — а они пустые
        {t:4.2,fn:()=>{cards.forEach((C,i)=>later(i*0.16,()=>{SFX.flower();anim(0.55,k=>{C.c.rotation.x=-Math.PI/2*(1-backOut(k));});}));}},
        {t:4.9,fn:()=>{anim(1.0,k=>{cards.forEach((C,i)=>{C.c.rotation.z=Math.sin(k*Math.PI*3+i)*0.08*(1-k);});});}},
        // свет гаснет: страниц нет — сказки не встают
        {t:5.6,fn:()=>{tone(660,0.7,'sine',0.12,330);later(0.35,()=>tone(520,0.8,'sine',0.1,260));anim(0.9,k=>{glow.material.opacity=0.9*(1-k)*(0.6+0.4*Math.abs(Math.sin(k*20)));glow.scale.setScalar(1.9-0.9*k);});
          anim(1.0,k=>{cards.forEach((C,i)=>{if(i)C.c.rotation.x=-Math.PI/2*smooth(k);else C.c.rotation.x=-0.5*smooth(k);});});}},
        // пустая картинка рвётся пополам — обрывки уплывают рыбками туда, где звенят ключи
        {t:6.5,fn:()=>{const C=cards[0];C.m.visible=false;SFX.whoosh();for(const sd of[-1,1]){const half=new THREE.Mesh(new THREE.PlaneGeometry(C.w/2,C.hh),new THREE.MeshBasicMaterial({map:K21_CARD_TEX[0],transparent:true,side:THREE.DoubleSide}));
            half.position.set(sd*C.w/4,C.hh/2+0.07,-0.08);book.add(half);scraps.push(half);anim(0.9,k=>{half.position.x=sd*(C.w/4+0.25*k);half.position.y=C.hh/2+0.07-0.12*k;half.rotation.z=sd*1.2*k;half.material.opacity=1-k;if(k>=1)book.remove(half);});}
          for(let i=0;i<12;i++){const sc=new THREE.Mesh(new THREE.PlaneGeometry(0.07,0.09),MB(0xf4ecd8,{side:THREE.DoubleSide,transparent:true}));const o=new V3(rand(-0.25,0.25),1.12,-36.5+rand(-0.3,0.3));sc.position.copy(o);fx.add(sc);scraps.push(sc);const ph=rand(0,6),dl=rand(0,0.6);
            later(dl,()=>anim(3.4,k=>{sc.position.set(o.x-k*(1.8+ph*0.2)+Math.sin(k*9+ph)*0.12,o.y+k*1.6+Math.sin(k*6+ph)*0.15,o.z-k*0.9);sc.rotation.set(Math.sin(k*12+ph),k*6+ph,Math.cos(k*10+ph)*0.6);sc.material.opacity=1-Math.max(0,k-0.6)/0.4;
              if(k>=1){fx.remove(sc);burst(sc.position.clone(),0xcff8ff,2,1,0.4);}}));}}},
        // на корешке проступает надпись — будто кто-то царапает ключом
        {t:7.7,fn:()=>{anim(2.2,k=>{spineDraw(k);});for(let i=0;i<11;i++)later(i*0.2,()=>tone(1800+Math.random()*900,0.05,'square',0.025,1300));}},
        {t:10.0,fn:()=>{spineDraw(1);}},
        // звенят ключи за водой — обрывки страниц у корешка тянутся на звон
        {t:13,fn:()=>{SFX.keys();anim(4,k=>{shadow.material.opacity=Math.sin(k*Math.PI)*0.35;shadow.position.z=-39+k*5;});anim(3.6,k=>{stubs.forEach((st,i)=>{st.rotation.y=-0.5*Math.sin(k*Math.PI)+Math.sin(k*30+i)*0.08*Math.sin(k*Math.PI);st.position.x=-0.3-0.05*Math.sin(k*Math.PI);});});}},
        {t:15.4,fn:()=>SFX.keys()},
        {t:17.7,fn:()=>{umb.visible=true;umb.position.set(pr.pos.x+0.2,pr.pos.y+1.9,pr.pos.z);anim(0.5,k=>{can.scale.set(0.2+0.8*k,1,0.2+0.8*k);});SFX.flower();}},
        {t:20.3,fn:()=>{const from=umb.position.clone();anim(6,k=>{umb.position.set(from.x+Math.sin(k*5)*0.4,from.y+k*6,from.z-k*1.2);umb.rotation.z=Math.sin(k*9)*0.3;});}},
        {t:23.1,fn:()=>{anim(1.2,k=>{T.yosha.extraY=Math.abs(Math.sin(k*Math.PI*4))*0.2;});}},{t:25,fn:()=>{T.yosha.face=Math.atan2(-6.4-T.yosha.pos.x,-38-T.yosha.pos.z);SFX.keys();}}],
      tick:(t)=>{curtain.material.opacity=0.2+0.06*Math.sin(t*3);},
      end:()=>{F.book=true;F.stage='street';T.yosha.extraY=0;W.group.remove(umb);W.group.remove(fx);book.remove(pop);for(const sc of scraps)if(sc.parent)sc.parent.remove(sc);
        book.scale.set(1,1,1);front.rotation.z=Math.PI*0.93;clasp.rotation.z=-1.6;spineDraw(1);stubs.forEach(st=>{st.rotation.y=0;st.position.x=-0.3;});}});}
  // Переливная улица: короткий показ — вода одна, заслонка на дне
  function perelScene(){const P=HERO.potap;
    play({dur:9,fov:50,shots:[shot(0,[0,7.5,-76],[0,-1,-95]),shot(4.6,[-5,2.4,-88],[-2.8,-2,-95])],
      says:[[0.3,4,'zven','Улица в два канала, а вода у них одна! Отольёшь у себя — у друга прибудет.'],[4.5,4.2,'zven','Да заслонка на дне закрыта. Тяжёлый нужен — чтоб не всплыл и держал!']],
      events:[{t:5,fn:()=>{for(let i=0;i<3;i++)later(i*0.5,()=>ringFx(new V3(-2.8,-2.3,-95),0xffd9a0,1.6));}}],
      end:()=>{later(0.5,()=>bark(P,'potap','Тяжёлый? Это я. Как положено.',2,true));}});}
  // ---------- Звонкая мостовая: осётр, плиты, ворота ----------
  function noteFly(T,from){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:KW_NOTE_TEX,color:T.c,transparent:true,depthWrite:false}));s.scale.setScalar(0.7);s.raycast=()=>{};const a=from.clone();s.position.copy(a);W.group.add(s);
    const to=new V3(T.x,1.6,T.z);anim(1.1,k=>{s.position.lerpVectors(a,to,smooth(k));s.position.y+=Math.sin(k*Math.PI)*1.2;if(k>=1){W.group.remove(s);T.lit=1;burst(to,T.c,10,3);ringFx(new V3(T.x,0.2,T.z),T.c,1.8);}});}
  function sturgeonPass(){const S=sturg;S.g.visible=true;const P0=new V3(17,7.4,-186),P1=new V3(-19,6.6,-204);const lit=[false,false,false];SFX.whoosh();
    say('proshka','Вот это осётр! С терем ростом!',2.4);
    anim(9,k=>{const p=new V3().lerpVectors(P0,P1,k);p.y-=Math.sin(k*Math.PI)*1.4;S.g.position.copy(p);S.g.rotation.y=Math.atan2(P1.x-P0.x,P1.z-P0.z)+Math.sin(k*14)*0.05;S.tail.rotation.y=Math.sin(G.time*5)*0.4;
      if(k>0.22&&!lit[0]){lit[0]=true;gusli(67,0,0.22);noteFly(TUNE[0],S.g.position);}
      if(k>0.38&&!lit[1]){lit[1]=true;gusli(71,0,0.22);noteFly(TUNE[1],S.g.position);}
      if(k>0.54&&!lit[2]){lit[2]=true;gusli(74,0,0.22);gusli(72,0,0.22);noteFly(TUNE[2],S.g.position);noteFly(TUNE[3],S.g.position);}
      if(Math.random()<0.35)burst(S.g.position.clone().add(new V3(rand(-1,1),-0.6,rand(-2,2))),0xcff8ff,1,1.2,0.6);
      for(const h of HEROES){if(!h.active||h.cling||h.sturgT)continue;if(Math.abs(h.pos.x-p.x)<3.2&&Math.abs(h.pos.z-p.z)<5){h.sturgT=1;h.vel.x-=3.2;h.vel.y=Math.max(h.vel.y,2.8);h.grounded=false;floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'Ух! Течение!','#cff8ff');}}
      if(k>=1){S.g.visible=false;for(const h of HEROES)h.sturgT=0;}});
    later(5.8,()=>say('zven','Слышали? Напев Садко! Дзинь, дилинь — по очереди, а дон-дон — вместе!',4));
    later(8.6,()=>{for(const p of[0,1])tip(p,'Звонкие плиты: встаньте на них по напеву Садко —<br>дзинь (жёлтая), дилинь (синяя), а дон-дон (розовая и зелёная) — вдвоём, разом!',4.4);});}
  function tuneDone(){TS.done=true;F.tune=true;[67,71,74,72].forEach((m,i)=>later(i*0.14,()=>gusli(m,0,0.24)));later(0.7,()=>{gusli(67,0,0.2);gusli(74,0,0.2);gusli(79,0,0.2);});
    for(const T of TUNE){T.lit=1;burst(new V3(T.x,1.4,T.z),T.c,14,4);}tuneCol.on=false;SFX.gate();SFX.ok();
    anim(2.2,k=>{tuneGate.position.y=4.6*smooth(k);tgBells.forEach((b,i)=>{b.rotation.z=Math.sin(k*30+i)*0.4*(1-k);});});
    banner('Напев Садко!','#ffd76a',2.6,'звонкие ворота сами запели — и открылись');
    later(1.4,()=>{TS.guard=[crab(-7.5,-209,null,{leash:7}),crab(7.5,-209,null,{leash:7}),puzyr(0,-206.5,{leash:6})];SFX.red();
      banner('Стража ворот!','#ffb0a0',2.2,'раки щиплют красным — кувырком · пузырник надувается: рогатка Прошки его сдует');});}
  function tuneTick(dt){if(TS.done){for(const T of TUNE){T.lit=Math.max(0.35,T.lit-dt*0.5);T.mat.emissiveIntensity=0.15+T.lit*1.2;}return;}
    for(const T of TUNE){const occ=HEROES.some(h=>(h.active||!h.following)&&!h.cling&&Math.hypot(h.pos.x-T.x,h.pos.z-T.z)<1.3&&h.pos.y<0.8&&h.pos.y>-0.5);T.fresh=occ&&!T.on;T.on=occ;
      T.lit=Math.max(T.lit-dt*1.4,occ?0.5:0);T.mat.emissiveIntensity=0.15+T.lit*1.2;T.note.position.y=2.0+Math.sin(G.time*2+T.i)*0.15+T.lit*0.4;T.note.material.opacity=0.5+0.5*Math.min(1,T.lit+0.2);}
    const ok=i=>{const T=TUNE[i];T.lit=1;gusli(T.n,0,0.22);burst(new V3(T.x,1.2,T.z),T.c,10,3);ringFx(new V3(T.x,0.2,T.z),T.c,1.6);};
    const fail=()=>{TS.step=0;TS.t=0;TS.fails++;tone(233,0.5,'sawtooth',0.07,220);tone(247,0.5,'sawtooth',0.07,230);for(const T of TUNE){T.lit=0;burst(new V3(T.x,0.6,T.z),0xff6a6a,6,2,0.5);}
      floatText(new V3(0,2.8,-195),'Фальшь! Сначала: дзинь…','#ffb0a0');
      if(TS.fails===2)for(const p of[0,1])tip(p,'Напев Садко: дзинь (жёлтая), дилинь (синяя) — по очереди,<br>а дон-дон (розовая и зелёная) — вместе, разом! В одиночку оставь героя на одной плите '+K(p,'swap')+'.',4.6);};
    if(TS.step>0){TS.t+=dt;if(TS.t>10){TS.step=0;TS.t=0;floatText(new V3(0,2.8,-195),'Напев стих — сначала!','#cfe8ff');}}
    const fr=TUNE.filter(T=>T.fresh).map(T=>T.i);
    if(TS.step===0){if(fr.includes(0)){ok(0);TS.step=1;TS.t=0;}else if(fr.length)fail();}
    else if(TS.step===1){if(fr.includes(1)){ok(1);TS.step=2;TS.t=0;}else if(fr.includes(2)||fr.includes(3))fail();}
    else if(TS.step===2){if(TUNE[2].on&&TUNE[3].on){ok(2);ok(3);tuneDone();}
      else if(fr.includes(2)||fr.includes(3)){const T=TUNE[fr.find(i=>i>=2)];gusli(T.n,0,0.12);T.lit=0.8;floatText(new V3(T.x,2.9,T.z),'дон-дон — ВМЕСТЕ!','#ffd9a0');}}}
  // ---------- палаты Морского царя: пляска в два голоса ----------
  function spawnRing(side){const geo=new THREE.CylinderGeometry(1,1,0.9,64,1,true,side>0?0:side<0?Math.PI:0,side?Math.PI:Math.PI*2);
    const m=new THREE.Mesh(geo,MB(0xe8fbff,{transparent:true,opacity:0.75,side:THREE.DoubleSide,depthWrite:false}));m.position.set(0,0.45,TZ);m.renderOrder=6;m.userData.noBatch=true;W.group.add(m);
    const R=2.4;m.scale.set(R,1,R);WAV.push({m,R,side,sp:[6,6.6,7.2][KD.round]});SFX.wave();for(let i=0;i<4;i++)burst(new V3(rand(-2,2),2.2,TZ+rand(-1,2)),[0xffd23a,0x5ab8ff,0xff7ab0,0x6ad86a][i],2,2,0.5);}
  function spawnPearl(){const a=rand(-1.2,1.2),r=rand(3.2,8.5),to=new V3(Math.sin(a)*r,0.35,TZ+Math.cos(a)*r),from=new V3(0,4.4,TZ);
    const m=new THREE.Mesh(new THREE.SphereGeometry(0.2,12,10),M(0xfff8f0,{emissive:0xd0c8ff,emissiveIntensity:0.8}));m.position.copy(from);m.userData.noBatch=true;W.group.add(m);PRL.push({m,from,to,t:0});tone(1200,0.12,'sine',0.08,1600);}
  function danceTick(dt){for(const q of SEATREF)q.hum=Math.max(0,q.hum-dt);
    const both=SEATREF[0].hum>0&&SEATREF[1].hum>0,one=!both&&(SEATREF[0].hum>0||SEATREF[1].hum>0);
    if(!F.kingMet&&!G.cine&&[0,1].some(pi=>active(pi).pos.z<K0-1&&active(pi).pos.z>K0-14)){F.kingMet=true;kingScene();}
    const live=F.kingMet&&!F.kingDone&&!G.cine;KD.on=live&&both;F.kingDance=KD.on;
    if(live&&one){KD.lonely-=dt;if(KD.lonely<=0){KD.lonely=4.5;floatText(new V3(0,6.2,TZ),'В два голоса! Один — скукота!','#9fe6ff');
      if(!F.duoTold){F.duoTold=true;bark(king,'king','В два голоса, гусляры! Один — скукота!',2.6);for(const p of[0,1])tip(p,'Царь пляшет, только когда играют ОБА стула у трона — в два голоса.<br>В одиночку: сыграй у одного стула и смени героя '+K(p,'swap')+' — оставленный доиграет, а ты беги к другому.',4.4);}}}
    if(KD.on)KD.meter=Math.min(1,KD.meter+dt/22);else if(live)KD.meter=Math.max(KD.round/3,KD.meter-dt/90);
    const r=KD.meter>=2/3?2:KD.meter>=1/3?1:0;
    if(r>KD.round){KD.round=r;if(r===1){banner('Колено второе — вприсядку!','#9fe6ff',2.4,'волны то слева, то справа · жемчужинки с венца ловите — пляска пойдёт шибче');bark(king,'king','Вприсядку! Эх, раздайся, море!',2.2);}
      else{banner('Колено третье — шибче, шибче!','#9fe6ff',2.4,'волны по две подряд — прыгай дважды');bark(king,'king','Шибче, гусляры, шибче!',2.2);}}
    PLS.forEach((q,i)=>{const on=KD.meter>=(i+1)/PLS.length-1e-6;q.mat.emissiveIntensity=damp(q.mat.emissiveIntensity,on?1.2:0.08,6,dt);q.g.rotation.z=on&&KD.on?Math.sin(G.time*8+i)*0.18:0;q.g.scale.setScalar(on?1.15:0.9);});
    king.dance(KD.on||(live&&one),dt,KD.on?1+0.3*KD.round:0.45);
    // рыбий хор и лучи
    const sp=KD.on?1+0.4*KD.round:0.25;for(const c of chF){c.a+=dt*sp*0.9;c.f.position.set(Math.cos(c.a)*c.r,c.y+Math.sin(c.a*3)*0.3,Math.sin(c.a)*c.r);c.f.rotation.y=-c.a;}
    RAYS.forEach((m,i)=>{m.material.opacity=damp(m.material.opacity,KD.on?0.16:0,3,dt);m.rotation.z=Math.sin(G.time*(0.8+i*0.3)+i*2)*0.5;m.rotation.x=Math.cos(G.time*(0.7+i*0.2)+i)*0.35;});
    // кольца-волны от пляски
    if(KD.on){KD.waveT-=dt;if(KD.waveT<=0){KD.waveT=[1.8,1.6,1.45][KD.round];KD.side=-KD.side;spawnRing(KD.round===1?KD.side:0);if(KD.round===2)later(0.45,()=>{if(KD.on)spawnRing(0);});}}
    for(let i=WAV.length-1;i>=0;i--){const w=WAV[i],R0=w.R;w.R+=w.sp*dt;w.m.scale.set(w.R,1+0.12*Math.sin(G.time*9+i),w.R);w.m.material.opacity=0.75*Math.min(1,(16-w.R)/3);if(w.R>16||F.kingDone){W.group.remove(w.m);WAV.splice(i,1);continue;}
      for(const h of HEROES){if(h.cling||!h.active||h.pos.y>0.85)continue;const dx=h.pos.x,dz=h.pos.z-TZ,d=Math.hypot(dx,dz)||1;if(d<R0-0.5||d>w.R+0.5)continue;if(w.side&&dx*w.side<0)continue;if(G.time-(h.waveT||-9)<0.6)continue;
        h.waveT=G.time;h.vel.x=dx/d*6.5;h.vel.z=dz/d*6.5;h.vel.y=5.2;h.grounded=false;h.groundRef=null;SFX.splash();floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'Волна! Прыгай!','#cff8ff');
        if(!F.waveTold){F.waveTold=true;for(const p of[0,1])tip(p,'От пляски царя по палатам кольца-волны бегут — прыгай '+K(p,'jump')+' через них!<br>Сбило со стула — вернись и снова сыграй '+K(p,'item')+'.',3.8);}}}
    // жемчужинки с венца (со второго колена)
    if(KD.on&&KD.round>=1){KD.pearlT-=dt;if(KD.pearlT<=0){KD.pearlT=2.4;spawnPearl();}}
    for(let i=PRL.length-1;i>=0;i--){const q=PRL[i];q.t+=dt;if(q.t<1){q.m.position.lerpVectors(q.from,q.to,q.t);q.m.position.y+=Math.sin(q.t*Math.PI)*2.4;}else q.m.position.y=0.35+Math.abs(Math.sin((q.t-1)*5))*0.15;
      let got=null;if(q.t>0.8)for(const h of HEROES){if(!h.active||h.cling)continue;if(hd(h.pos,q.m.position)<0.95&&Math.abs(h.pos.y-q.m.position.y)<1.6){got=h;break;}}
      if(got||q.t>8||F.kingDone){W.group.remove(q.m);PRL.splice(i,1);if(got&&!F.kingDone){KD.meter=Math.min(1,KD.meter+0.045);KD.pearls++;tone(1500,0.12,'sine',0.12,2100);burst(q.m.position.clone(),0xffffff,10,3);floatText(got.pos.clone().add(new V3(0,got.d.height+0.6,0)),'Жемчужинка! Пляска шибче!','#fff6d0');}}}
    if(live&&KD.meter>=1){F.kingDone=true;kingEnd();}
    for(const q of HD){const k=F.kingOpen?1:0;q.k=damp(q.k,k,3,dt);q.g.position.y=4.5*q.k;q.col.on=q.k<0.6;}}
  function kingScene(){const T=HERO;
    play({dur:11.2,fov:48,shots:[shot(0,[0,4.2,K0-18],[0,2.8,TZ]),shot(4.4,[4.2,2.8,TZ+9.5],[0,1.2,TZ+6.4],[0,3.2,TZ+10.5],[0,2,TZ+3],3)],
      says:[[0.3,3.8,null,'<i>В палатах на троне — Морской царь, борода из тины, на голове — венец.</i>',true],[4.3,4,'king','Гусли слышу! Сыграйте мне — попляшу! А не спляшу — дверей не открою!'],
        [8.4,2.8,'king','Да в два голоса, у самого трона!']],
      events:[{t:4.4,fn:()=>{for(const s of seats){ringFx(new V3(s.x,0.2,s.z),0xffe08a,2.2);later(0.4,()=>ringFx(new V3(s.x,0.2,s.z),0x9fe6ff,1.6));}}},{t:8.4,fn:()=>{king.arms[1].rotation.x=-0.8;}}],
      tick:(t)=>{king.dance(false,1/60);king.head.rotation.y=Math.sin(t*1.5)*0.3;for(const s of seats)s.gm.emissiveIntensity=t>4.4?0.5+0.5*Math.sin(t*7):0.2;},
      end:()=>{king.arms[1].rotation.x=0;banner('Пляска Морского царя!','#9fe6ff',2.6,'играйте ОБА у стульев перед троном — царь пляшет; волны-кольца — прыгай; пляс-ракушки над троном копят пляску');}});}
  function kingEnd(){const T=HERO;KD.on=false;for(const q of SEATREF)q.hum=0;
    const seatsAt=[[-3.6,TZ+7.6],[3.6,TZ+7.6],[-1.2,TZ+8.6],[1.2,TZ+8.6]];
    play({dur:15,fov:48,shots:[shot(0,[0,2.8,TZ+6.2],[0,2.6,TZ]),shot(3.3,[0,1.4,TZ+11],[0,24,TZ-3]),shot(7.1,[1.5,3.9,TZ+2.7],[0,3.7,TZ]),shot(9.6,[0,3.6,TZ+13],[0,2.4,K0-37],[0,3,TZ+9],[0,2.4,K0-37],3)],
      says:[[0.3,2.6,'king','Ох, уважили! Ох, наплясался!'],[3.4,3.2,'yosha','Царь-батюшка, а наверху от твоей пляски корабли качаются!'],[7.0,4.2,'king','И то правда… Заплясался я. Ступайте! Вот вам по жемчужинке — за гусли.'],
        [11.8,2.8,'zven','Вот это пляска! Дальше — в сад Китежа!']],
      events:[{t:0,fn:()=>{HEROES.forEach((h,i)=>{placeOnGround(h,seatsAt[i][0],seatsAt[i][1],0);h.face=Math.PI;});SFX.ok();for(let i=0;i<16;i++)burst(new V3(rand(-3,3),rand(2,5),TZ+rand(-1,3)),[0xffd23a,0x5ab8ff,0xff7ab0,0x6ad86a][i%4],3,3);}},
        {t:1.2,fn:()=>{anim(0.8,k=>{king.body.position.y=-0.25*k;});tone(180,0.4,'sine',0.15,90);}},
        {t:3.3,fn:()=>{SHIPS.visible=true;}},
        {t:7.4,fn:()=>{anim(1.2,k=>{king.head.rotation.x=-0.5*smooth(k);king.crown.rotation.z=0.3*smooth(k);});}},
        {t:9.5,fn:()=>{king.arms[1].rotation.x=-1.2;SFX.gate();shakeAll(0.04,0.4);F.kingOpen=true;for(const q of HD)for(let i=0;i<10;i++)burst(new V3(rand(-9,-5)+(q===HD[1]?14:0),rand(0.5,4),K0-36.6),0xfff2b0,3,3);}},
        {t:10.4,fn:()=>{for(let i=0;i<2;i++){const it=nutItem(-1+i*2,3.2,TZ+0.6);it.locked=true;const to=active(i).pos.clone();anim(1.2+i*0.2,k=>{it.pos.set(lerp(-1+i*2,to.x,k),3.2+Math.sin(k*Math.PI)*1.5,lerp(TZ+0.6,to.z,k));});later(1.5+i*0.2,()=>{it.locked=false;takeItem(it,active(i));});}SFX.ok();}},
        {t:12.4,fn:()=>{SHIPS.visible=false;}}],
      tick:(t)=>{king.dance(t<1.2,1/60,1.4);const rock=t<7.4?1:Math.max(0,1-(t-7.4)/2.5);SHIPS.children.forEach((c,i)=>{if(!c.userData.ph&&c.userData.ph!==0)return;const ph=c.userData.ph;c.rotation.z=Math.sin(t*3+ph)*0.35*rock;c.rotation.x=Math.cos(t*2.4+ph)*0.2*rock;c.position.y=22.6+Math.sin(t*2.2+ph)*0.6*rock;});},
      end:()=>{SHIPS.visible=false;king.body.position.y=0;king.head.rotation.x=0;king.crown.rotation.z=0;king.arms[1].rotation.x=0;F.kingOpen=true;for(const q of HD){q.k=1;q.col.on=false;q.g.position.y=4.5;}
        banner('Двери отворены!','#ffffff',1.8,'дальше — две раковины и сад Китежа');}});}
  W.onSelfBreak=(e)=>{if(!F.laugh){F.laugh=true;later(0.5,()=>bark(HERO.yosha,'yosha','Она сама себя — вот так лихо!',2));}};
  W.updates.push(dt=>{curtain.material.opacity=0.18+0.05*Math.sin(G.time*2);
    if(F.kingOpen)for(const q of HD){q.k=1;q.col.on=false;q.g.position.y=4.5;}
    if(F.stage==='walk'&&[0,1].some(pi=>active(pi).pos.z<-10.5))sadkoIntro();
    if(F.stage==='gusli'&&!F.book&&!G.cine&&[0,1].some(pi=>active(pi).pos.z<-31.5))bookScene();
    if(!F.pikeTold&&W.enemies.some(e=>e.kind==='shchuka'&&e.state==='wind')){F.pikeTold=true;banner('Щука-морок!','#9fd0ff',2,'плавает где хочет; синяя капля: щитом закройся, а в последний миг — отбей ей обратно в пасть');}
    if(!F.clamTold&&W.enemies.some(e=>e.kind==='zhemchug'&&e.state==='wind')){F.clamTold=true;banner('Жемчужница-морок!','#c8b8f0',2.4,'створки не пробить: жемчужину отбей обратно '+K(0,'guard')+' / '+K(1,'guard')+' в последний миг — или отлив сыграй, ахнет');}
    sadko.body.rotation.z=Math.sin(G.time*0.8)*0.02;});
  /* ---------- рисунки кнопок ---------- */
  const T=HERO,inFountain=h=>hd(h.pos,{x:0,z:-18})<4.4;
  prompt(1,'skill',()=>headOf(T.yosha),()=>F.stage==='sadko'&&T.yosha.active&&hd(T.yosha.pos,{x:-5.9,z:-14.5})<5,'мёртвая вода');
  prompt(1,'swap',()=>headOf(T.yosha),()=>F.stage==='sadko'&&T.pelageya.active&&hd(T.pelageya.pos,{x:-5.9,z:-14.5})<7,'Йоша');
  for(const pi of[0,1]){const h=()=>active(pi),d=SD[pi];
    prompt(pi,'item',()=>headOf(h()),()=>W.abil.gusli&&!fLink.taken&&inFountain(h())&&fz.state==='low','прилив');
    prompt(pi,'item',()=>headOf(h()),()=>W.abil.gusli&&inZone(d.zA,h(),0.4)&&h().pos.y<3.3&&d.zA.state==='low'&&h().pos.z<-45&&h().pos.z>-56,'прилив — лодки всплывут');
    prompt(pi,'item',()=>headOf(h()),()=>inZone(d.zB,h(),0.3)&&d.zB.state==='low'&&!d.ch.open&&h().pos.z<-62&&h().pos.z>-70,'прилив — к двери');
    prompt(pi,'item',()=>headOf(h()),()=>d.inShaft(h())&&d.lift.state==='high'&&!d.ch.open,'отлив — вниз, как лифт');
    prompt(pi,'item',()=>headOf(h()),()=>d.inShaft(h())&&d.lift.state==='low'&&d.ch.open,'прилив — наверх');
    prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.help));
    prompt(pi,'attack',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&hd(e.pos,h().pos)<5&&Math.abs(e.pos.y-h().pos.y)<2&&(e.state==='broken'||(e.state==='stagger'&&!e.openHit)||e.flop)),'');}
  /* ---------- задачи ---------- */
  const side=pi=>{const d=SD[pi];return [
    O(()=>'Причал. Сыграй прилив '+K(pi,'item')+' — лодки всплывут до крыш.<br>С лодки шагни на крышу — и дальше, мимо крыш.',()=>active(pi).pos.z<-60.3||(active(pi).pos.y>3.3&&active(pi).pos.z<-56),()=>[d.boat2.g,d.zA.shell.g],
      ()=>({kind:active(pi).kind,action:'jump',from:new V3(d.X(4.2),3.1,-54),to:new V3(d.X(4.2),3.44,-57.6)})),
    O(()=>'Дверь дома — на втором этаже. Прилив '+K(pi,'item')+' сыграй, плыви к двери.<br>Внутри — отлив: вода опустит, как лифт. Сундук на дне — бери.',()=>d.ch.open||active(pi).pos.z<-77,()=>[d.door,d.ch.g])];};
  const common=pi=>[
    O('Подводный Китеж! По дну идём в пузырях воздушных —<br>Нам на площадь, к Садко, к гуслям звучным.',()=>F.stage!=='walk',()=>[sadko.g]),
    O(pi?()=>'У Садко струна порвалась — тёмная капля над ней.<br>Смени на Йошу и полей из ковшика '+K(1,'skill')+' — мёртвая вода срастит, скорей.':'У Садко струна порвалась. Мёртвая вода у Йоши — друга у Садко подожди.',()=>W.abil.gusli,()=>[sadko.g],
      pi?()=>({kind:'yosha',action:'walk',from:new V3(-3.5,0,-11.5),to:new V3(-5.6,0,-14.1)}):null),
    O(()=>'У каждого теперь гусли! Звено — на столбе фонтана.<br>Встань у чаши, сыграй прилив '+K(pi,'item')+': доски всплывут без обмана.',()=>fLink.taken||active(pi).pos.z<-29,()=>[fLink.g,fz.shell.g]),
    O(pi?'Терем-библиотека. Прошка книгу сказок нашёл толстую…':'Терем-библиотека. Прошка, книгу сказок открой.',()=>F.book,()=>[book])];
  const late=pi=>[
    O(pi?()=>'Переливная улица! Вода в двух каналах одна — через заслонку на дне левого канала. Ждём: Потап её подержит.<br>Прилив у тебя '+K(1,'item')+' — отлив у друга. Лодкой — к террасе, дёрни верёвку: откроешь ворота ДРУГА.':
        ()=>'Переливная улица! Вода в двух каналах одна — через заслонку на дне левого канала.<br>Поставь на неё Потапа: он тяжёлый, не всплывёт и держит, даже оставленный. Прилив у тебя '+K(0,'item')+' — отлив у друга.<br>Лодкой — к террасе, дёрни верёвку: откроешь ворота ДРУГА.',
      ()=>active(pi).pos.z<-113,()=>{const r=[];if(!SLU.held())r.push(SLU.g);if(!ropes[pi].pulled)r.push(ropes[pi].fl);if(!PG[pi].open)r.push(PG[pi].g);return r;}),
    O(()=>'Шлюзы! Встань в воду и прилив '+K(pi,'item')+' сыграй — вода подымет на ступеньку.<br>Три ступеньки — и наверх, помаленьку.',()=>active(pi).pos.z<-104.2+D,()=>[L1,L2,L3].filter(z=>inZone(z,active(pi),6)).map(z=>z.shell.g)),
    O(()=>'Колодец-лифт. Встань в воду, отлив '+K(pi,'item')+' сыграй —<br>Спустишься вниз, как на лифте, так и знай.',()=>active(pi).pos.z<-116.5+D&&active(pi).pos.y<1,()=>[LIFT.shell.g]),
    O(()=>'Торговые ряды! Раки щиплют красным — кувырком '+K(pi,'roll')+'.<br>Жемчужница в пруду: отлив '+K(pi,'item')+' — ахнет и раскроется, тут и бей.',()=>mkt.done,()=>mkt.list.filter(e=>e.alive).map(e=>e.g)),
    O(()=>'Звонкая мостовая! Встаньте на звонкие плиты по напеву Садко: дзинь, дилинь — по очереди,<br>а дон-дон — вдвоём, разом. Ворота сами запоют!',()=>!!F.tune,()=>TS.done?[]:TUNE.map(T=>T.g)),
    O(()=>'Палаты Морского царя! Два стула гусляра — перед троном: играйте '+K(pi,'item')+' оба — царь пляшет в два голоса.<br>Кольца-волны от пляски — прыгай '+K(pi,'jump')+'; пляс-ракушки над троном копят пляску. Наплясается — двери отворит.',
      ()=>!!F.kingOpen,()=>F.kingDone?HD.map(q=>q.g):seats.map(s=>s.g)),
    O(()=>'Две раковины. На таблички гляди: левой — прилив, правой — отлив.<br>Сыграйте '+K(pi,'item')+' — каждый у своей, вот и весь мотив.',()=>!!F.grate,()=>[LZ.shell.g,RZ.shell.g]),
    O(()=>'Сад Китежа. Ракушка — на дне, у родника: в приливе дойдёт только тяжёлый Потап — отлив '+K(pi,'item')+'.<br>Йоша польёт ростки '+K(1,'skill')+' — вырастут лесенки к террасе. Родник снова наполнит сад — пусть оставленный держит напев!',
      ()=>active(pi).pos.z<-262+DG,()=>{const r=[];if(GARD.state==='high')r.push(GARD.shell.g);for(const s of KS)if(!s.grown)r.push(s.g);if(!F.anchor)r.push(anchor);return r;}),
    O(()=>'Рак-Отшельник не пускает к воротам! Раковину не пробить: сыграй '+K(pi,'item')+' у ракушки-музыкалки — заслушается, тут и бей.<br>Пробой — Потап вытянет его из раковины. Без домика удирает: зажмите с двух сторон!',
      ()=>!!F.hermitWon,()=>{const e=HB.dbg().e;return e&&e.alive?[e.g]:[HB.dbg().lureShell.g];}),
    O('Ворота Китежа — бери звено, и в путь-дорогу!',()=>false,()=>[endLink.g])];
  for(const pi of[0,1])W.objectives[pi]=common(pi).concat(side(pi),late(pi));
  W.tipZones.push({cond:(pi,h)=>h.grounded&&h.groundRef&&h.groundRef.water,text:pi=>'Ты плывёшь! Из воды высоко не выпрыгнуть.<br>Сыграй на гуслях '+K(pi,'item')+' — лодка всплывёт, подвезёт — не сгинуть.'},
    {cond:(pi,h)=>h.pos.y<-1.5&&h.pos.z<-45&&h.pos.z>-52,text:pi=>'Отлив открыл подвал. На дне — орешек! Назад — по ступенькам.'},
    {cond:(pi,h)=>SD[pi]&&SD[pi].inShaft(h)&&h.pos.y<-2,text:pi=>'Дно колодца. К сундуку подойди — сам откроется.<br>Наверх — прилив '+K(pi,'item')+' сыграй, и вода подымется.'});
  W.spawns=[[new V3(-3.5,0,5),new V3(-5.5,0,6)],[new V3(3.5,0,5),new V3(5.5,0,6)]];W.startAct=[0,0];
  W.pauseLine='Подводный Китеж. Гусли Садко: RB воду меняет там, где стоишь, —<br>Прилив лодки подымет, отлив подвалы откроет, глядишь.<br>Переливная улица: вода одна на двоих — Потап на заслонке держит.<br>Звонкие плиты — напев Садко; Морскому царю играйте в два голоса — запляшет; сад Китежа: Потап по дну, Йоша — лесенки растит;<br>Рак-Отшельник любит музыку — а домик ему нужен новый.<br>В Китеже молчать нельзя — запомни в голове.';
  W.onStart=()=>{later(0.8,()=>say('zven','Китеж! Под водою спит он. Дзинь — за мной!',2.6,true));};
  // для ботов: перенос к участку
  W.warp21=(where)=>{F.stage='street';F.book=true;W.abil.gusli=true;const P={perel:[-6,0,-78],locks:[0,0,-118],market:[0,0,-157],tune:[0,0,-182],dance:[0,0,K0-2],shells:[0,0,-219+S1],garden:[0,0,-235.5+DG],boss:[0,0,-267+DG],gate:[0,0,-311+DG]}[where];
    const after=w=>['perel','locks','market','tune','dance','shells','garden','boss','gate'].indexOf(where)>['perel','locks','market','tune','dance','shells','garden','boss','gate'].indexOf(w);
    if(after('market')){mkt.started=true;mkt.done=true;mktGate.forceOpen=true;}
    if(after('tune')){TS.done=true;F.tune=true;F.sturg=true;tuneCol.on=false;tuneGate.position.y=4.6;}
    if(after('dance')){F.kingMet=true;F.kingDone=true;F.kingOpen=true;}
    if(after('shells')){F.grate=true;grateCol.on=false;grate.position.y=3.8;}if(after('garden')){F.gardTold=true;}
    if(where==='gate'){F.hermitWon=true;HB.dbg().weedCol.on=false;HB.skip&&HB.skip();}
    if(where!=='perel'){PG.forEach((q,i)=>openPG(i));F.perelTold=true;}if(where==='dance')F.kingMet=true;if(where==='tune')F.sturg=true;
    HEROES.forEach((h,i)=>{placeOnGround(h,P[0]+(i%2?1.4:-1.4)+(i>1?3:0)*(P[0]<0?1:-1),P[2]+(i>1?0.6:0),P[1]);h.following=false;});for(const pi of[0,1])players[pi].cp.set(P[0],P[1],P[2]);snapCams();
    return W.dbg21();};
  W.dbg21=()=>({CL,CR,SLU,boatL,boatR,ropes,PG,KD,SEATREF,HD,seats,WAV,PRL,king,TUNE,TS,tuneCol,GARD,KS,anchor,LZ,RZ,mkt,endLink,HB,S1,DG,K0,TZ,F});
  flushDecor();
};
