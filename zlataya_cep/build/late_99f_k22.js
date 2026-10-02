/* ============================== РЕЛИЗ final06 · 2-2 «ЧУДО-ЮДО РЫБА-КИТ» — ВТРОЕ ДЛИННЕЕ, ПО «КОНЬКУ-ГОРБУНКУ» ============================== */
// П. Ершов: «Поперёк его лежит Чудо-юдо Рыба-кит. Все бока его изрыты, частоколы в рёбра вбиты, на хвосте сыр-бор шумит,
// на спине село стоит; мужички на губе пашут, между глаз мальчишки пляшут, а в дубраве, меж усов, ищут девушки грибов».
// Кит десять лет лежит поперёк моря, проглотил что-то (корабли — в 2-4, там же язык колокола) и мается. Весь уровень кит ДЫШИТ:
// вдох гудит, море отходит, кит подымается; выдох — спина вздрагивает, всех подкидывает и качает вбок, море бьёт в бока.
//   Хвост — «на хвосте сыр-бор шумит»: сосны качаются от вздохов; трещина в хвостовом плавнике — Потап валит сосну-мостик.
//   Двор, огород и мачта, фонтан дыхания (теперь бьёт на выдохе кита), деревня и щука в ведре, печка Емели по хребту — прежние.
//   Рёбра — «бока изрыты, частоколы в рёбра вбиты»: рёбра ходят ходуном (с ребра на ребро — в такт); на рёбрах частоколы —
//      Потап выдёргивает кол, из раны сочится морок — Йоша лечит живой водой. Прилипалы. Ролик: кит открывает глаз и говорит.
//   Губа — «мужички на губе пашут»: кит зевает — тянет к пасти; держись у Потапа (он тяжёлый) или у плуга. Плуги увязли в
//      морских желудях — сбейте (один — высоко на губе, рогаткой Прошки). Чайки.
//   Между глаз — «мальчишки пляшут»: хоровод, плясовые камни загораются по кругу — прыгай в такт; наплясались — кит открывает глаза.
//   Дубрава меж усов — «ищут девушки грибов»: грибы видны Совиным взором Пелагеи; мухоморы — это прилипалы!
//   Голова — кит икает (в струйке золото) и начинает нырять: море поднимается, деревня уходит под воду; на макушке двое поют
//      киту колыбельную (две ракушки разом). Ролик-эпилог: кит открывает глаз, плачет, обещает не нырять — и фонтаном с радугой
//      подкидывает героев до облаков, к звену.
{const L=LEVELS.find(l=>l.id==='2-2');if(L)L.nuts=12;}   // орешков на уровне стало больше — для списка уровней
WHO.shchuka=['Щука','#9ad0a0'];VOICE.shchuka={f:300,w:'triangle',sp:0.09};
WHO.kit=['Рыба-кит','#8ab8e8'];VOICE.kit={f:62,w:'sine',sp:0.18};
WHO.pahar=['Мужичок-пахарь','#d8b080'];VOICE.pahar={f:130,w:'triangle',sp:0.11};
WHO.malec=['Мальчишки','#ffd080'];VOICE.malec={f:340,w:'square',sp:0.08};
WHO.devica=['Девушки','#ffb0c8'];VOICE.devica={f:380,w:'triangle',sp:0.09};
// ---------- новые мороки на ките ----------
// чайка: кружит в вышине; замах — пикирует на героя (красное — кувырок, жёлтое — щит); после клевка сидит на спине кита — бей
FOE.chaika={r:0.55,emb:3,sig:['red','yellow'],sp:2.4,look:'gull'};
// прилипала: шлёпает по спине кита и прилипает к герою — тот еле идёт; отлепить может ДРУГ (ударом) или два кувырка
FOE.prilip={r:0.48,emb:2,sig:['yellow'],sp:3.1,look:'remora'};
FL.gull=(inner)=>{const wh=M(0xf4f4f0),gr=M(0x9aa4b0),bk=M(0x2a2a30),or=M(0xffa030);const body=new THREE.Group();inner.add(body);
  const b=new THREE.Mesh(new THREE.SphereGeometry(0.32,12,9),wh);b.scale.set(0.9,0.8,1.5);b.position.y=0.55;body.add(b);
  const hd=new THREE.Mesh(new THREE.SphereGeometry(0.2,10,8),wh);hd.position.set(0,0.78,0.42);body.add(hd);
  const bc=new THREE.Mesh(new THREE.ConeGeometry(0.06,0.28,6),or);bc.rotation.x=Math.PI/2;bc.position.set(0,0.74,0.68);body.add(bc);
  const tl=new THREE.Mesh(new THREE.ConeGeometry(0.16,0.4,4),gr);tl.rotation.x=-Math.PI/2-0.2;tl.position.set(0,0.6,-0.5);tl.scale.set(1.3,1,0.3);body.add(tl);
  const wings=[];for(const s of[-1,1]){const w=new THREE.Group();w.position.set(s*0.22,0.68,0.02);body.add(w);const a=new THREE.Mesh(new THREE.BoxGeometry(0.62,0.04,0.36),gr);a.position.x=s*0.31;w.add(a);
    const t=new THREE.Mesh(new THREE.BoxGeometry(0.34,0.035,0.26),bk);t.position.x=s*0.78;w.add(t);wings.push({w,s});}
  for(const s of[-1,1]){const lg=new THREE.Mesh(new THREE.CylinderGeometry(0.025,0.025,0.32,4),or);lg.position.set(s*0.1,0.18,0.02);body.add(lg);}
  return {body,wings,eyeY:0.84,eyeZ:0.58,eyeX:0.1,eyeS:0.7,top:1.0,lid:hp(0xf4f4f0),noThreads:true};};
FL.remora=(inner)=>{const sk=M(0x6a7a6a),bl=M(0xc8d0b8),pk=M(0xff9ab0);const body=new THREE.Group();inner.add(body);
  const b=new THREE.Mesh(new THREE.SphereGeometry(0.34,12,8),sk);b.scale.set(0.9,0.55,1.7);b.position.y=0.28;body.add(b);
  const be=new THREE.Mesh(new THREE.SphereGeometry(0.3,10,6),bl);be.scale.set(0.8,0.35,1.5);be.position.y=0.18;body.add(be);
  const disc=new THREE.Mesh(new THREE.TorusGeometry(0.2,0.05,6,16),pk);disc.rotation.x=Math.PI/2;disc.scale.set(1,1.6,1);disc.position.y=0.47;body.add(disc);
  for(let i=0;i<5;i++){const r=new THREE.Mesh(new THREE.BoxGeometry(0.3,0.02,0.03),pk);r.position.set(0,0.48,-0.24+i*0.12);body.add(r);}
  const tail=new THREE.Group();tail.position.set(0,0.28,-0.55);body.add(tail);const tf=new THREE.Mesh(new THREE.ConeGeometry(0.22,0.34,4),sk);tf.rotation.x=-Math.PI/2;tf.scale.set(0.25,1,1);tail.add(tf);
  const mouth=new THREE.Mesh(new THREE.TorusGeometry(0.07,0.02,4,10,Math.PI),M(0x3a2020));mouth.position.set(0,0.22,0.56);mouth.rotation.z=Math.PI;body.add(mouth);
  return {body,tail,disc,eyeY:0.4,eyeZ:0.42,eyeX:0.12,eyeS:0.85,top:0.7,lid:hp(0x6a7a6a),noThreads:true};};
// удар кто наносит: прилипалу на своей спине не достать — нужен друг
{const _ha=heroAttack;heroAttack=function(h,range,arcDot){FIN.k22Atk=h;try{_ha(h,range,arcDot);}finally{FIN.k22Atk=null;}};}
// прилипала не кусает — прилипает
{const _hh=hitHero;hitHero=function(e,h,tip){if(e&&e.kind==='prilip'&&e.latchTo&&!h.prilip&&!h.cling){e.latchTo(h);return;}_hh(e,h,tip);};}
function chaika22(x,z,base,o){const e=makeFoe('chaika',x,z,Object.assign({y:base+3.4,leash:9},o||{}));e.noMove=true;e.base=base;e.circ=rand(0,6);e.alt=3.4;
  e.tick=(e,dt)=>{if(e.state==='spawn'||e.state==='dying')return;const h=e.tgt||foeTarget(e);const st=e.state;
    let ty=e.base+3.4,tx=null,tz=null;
    if(st==='wind'&&h){const k=clamp(e.t/Math.max(0.1,e.wdur),0,1),dx=h.pos.x-e.pos.x,dz=h.pos.z-e.pos.z,d=Math.hypot(dx,dz)||1;ty=lerp(e.base+3.4,h.pos.y+0.5,k*k);if(d>1.0){tx=h.pos.x-dx/d*1.0;tz=h.pos.z-dz/d*1.0;}}
    else if(st==='strike'||st==='recover'||st==='stagger'||st==='broken'){ty=e.base+0.05;if(st==='recover'&&e.t<0.1)e.open=Math.max(e.open,1.0);}
    else{e.circ+=dt*0.7;tx=e.home.x+Math.cos(e.circ)*3.2;tz=e.home.z+Math.sin(e.circ)*3.2;if(h&&hd(h.pos,e.pos)<9){tx=h.pos.x+Math.cos(e.circ)*3.6;tz=h.pos.z+Math.sin(e.circ)*3.6;}}
    if(tx!==null){const dx=tx-e.pos.x,dz=tz-e.pos.z,d=Math.hypot(dx,dz);if(d>0.05){const sp=st==='wind'?7:3.2;const m=Math.min(d,sp*dt);const nx=e.pos.x+dx/d*m,nz=e.pos.z+dz/d*m;if(hd(new V3(nx,0,nz),e.home)<14){e.pos.x=nx;e.pos.z=nz;}if(st!=='wind')e.face=angDamp(e.face,Math.atan2(dx,dz),5,dt);}}
    e.pos.y=damp(e.pos.y,ty,st==='wind'?9:st==='idle'||st==='ready'?2.5:6,dt);e.baseY=e.pos.y;};
  e.post=(e,dt)=>{const L=e.L,air=e.pos.y>e.base+1.2,t=G.time;L.wings.forEach(({w,s})=>{w.rotation.z=air?s*(0.2+Math.sin(t*(e.state==='wind'?22:10))*0.6):s*-0.9;});L.body.rotation.x=e.state==='wind'?0.7:0;};
  return e;}
function prilip22(x,z,base,o){const e=makeFoe('prilip',x,z,Object.assign({y:base,leash:10},o||{}));e.base=base;e.latched=null;e.slurp=0;
  e.latchTo=h=>{e.latched=h;h.prilip=e;e.noMove=true;e.ghostly=true;e.cd=99;e.state='idle';e.emb0=e.embers;SFX.splash();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Прилипла! Еле иду…','#c8e0b8');
    if(!G.flags.prilipTold){G.flags.prilipTold=true;for(const p of[0,1])tip(p,'Прилипала! Тот, к кому прилипла, еле идёт. Отлепить может только ДРУГ — ударом '+K(p,'attack')+'.<br>Или два кувырка '+K(p,'roll')+' подряд — стряхнёшь сам.',4);}};
  e.unlatch=(txt)=>{const h=e.latched;if(!h)return;h.prilip=null;e.latched=null;e.noMove=false;e.ghostly=false;e.cd=1.6;e.dazeT=2.4;e.pos.y=e.base;floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),txt||'Отлепили!','#ffe08a');burst(h.pos.clone().add(new V3(0,1,0)),0xc8e0b8,10,3);};
  e.guardAll=()=>!!e.latched&&FIN.k22Atk===e.latched;e.guardText='Сам себя по спине не достанешь — пусть друг собьёт! Или два кувырка подряд';
  e.tick=(e,dt)=>{const h=e.latched;if(!h)return;if(!e.alive||players[h.player].downed){e.unlatch('Отвалилась!');return;}
    const bx=-Math.sin(h.face)*0.35,bz=-Math.cos(h.face)*0.35;e.pos.set(h.pos.x+bx,h.pos.y+h.d.height*0.45,h.pos.z+bz);e.face=h.face;e.open=1;e.baseY=e.pos.y;
    if(e.embers<e.emb0){e.unlatch('Отлепили!');return;}
    if(h.lastRoll&&h.lastRoll!==e.rollSeen){e.rolls=(G.time-(e.rollT||-9)<2.2?(e.rolls||0):0)+1;e.rollT=G.time;e.rollSeen=h.lastRoll;if(e.rolls>=2){e.unlatch('Стряхнул!');return;}}
    e.slurp-=dt;if(e.slurp<=0){e.slurp=2.6;floatText(e.pos.clone().add(new V3(0,0.6,0)),'Чмок!','#c8e0b8');tone(500,0.08,'sine',0.06,300);}};
  e.post=(e)=>{const L=e.L;L.tail.rotation.y=Math.sin(G.time*(e.latched?14:7))*0.5;if(e.latched){e.body.rotation.x=-0.6;}};
  e.onDeath=()=>{if(e.latched)e.unlatch('Отлепили!');};
  return e;}
// ---------- народ на ките ----------
function folk22(x,y,z,o){o=o||{};const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=o.ry||0;W.group.add(g);const s=o.s||1;g.scale.setScalar(s);
  const shirt=M(o.shirt||[0xd04a3a,0x3a7ac0,0xe0c040,0x4a9a4a,0xf0f0e0][Math.floor(rand(0,5))]),skin=M(0xf0c8a0),dk=M(0x3a2a20);
  const body=new THREE.Group();g.add(body);addMesh(new THREE.ConeGeometry(0.38,1.1,8),shirt,0,0.75,0,body);addMesh(new THREE.CylinderGeometry(0.08,0.08,0.4,5),dk,-0.12,0.2,0,body);addMesh(new THREE.CylinderGeometry(0.08,0.08,0.4,5),dk,0.12,0.2,0,body);
  const head=new THREE.Group();head.position.y=1.42;body.add(head);addMesh(new THREE.SphereGeometry(0.26,10,8),skin,0,0,0,head);
  for(const sd of[-1,1])addMesh(new THREE.SphereGeometry(0.035,6,5),MAT.dark,sd*0.09,0.03,0.23,head);
  if(o.kind==='girl'){addMesh(new THREE.SphereGeometry(0.29,10,8,0,Math.PI*2,0,Math.PI/2),M(o.scarf||0xff6a8a),0,0.02,-0.02,head);addMesh(new THREE.CylinderGeometry(0.05,0.03,0.5,5),M(0xc89040),0,-0.25,-0.28,head);}
  else if(o.kind==='boy'){addMesh(new THREE.SphereGeometry(0.27,10,8,0,Math.PI*2,0,Math.PI/2.4),M(0xe8c060),0,0.05,0,head);}
  else{addMesh(new THREE.CylinderGeometry(0.2,0.26,0.24,8),M(0x6a4a2a),0,0.24,0,head);addMesh(new THREE.ConeGeometry(0.2,0.3,8),M(0xb89060),0,-0.2,0.18,head).rotation.x=Math.PI;}
  const arms=[];for(const sd of[-1,1]){const a=new THREE.Group();a.position.set(sd*0.3,1.1,0);body.add(a);addMesh(new THREE.CylinderGeometry(0.06,0.06,0.55,5),shirt,0,-0.27,0,a);addMesh(new THREE.SphereGeometry(0.07,6,5),skin,0,-0.57,0,a);arms.push(a);}
  if(o.basket){const b=new THREE.Group();b.position.set(0.32,0.6,0.15);body.add(b);addMesh(new THREE.CylinderGeometry(0.22,0.16,0.22,8),M(0xb08040),0,0,0,b);addMesh(new THREE.TorusGeometry(0.2,0.02,4,10,Math.PI),M(0x8a5a2a),0,0.12,0,b);}
  g.traverse(c=>{c.userData.noBatch=true;});const F={g,body,head,arms,ph:rand(0,6)};if(o.who&&typeof regNpc==='function')regNpc(F,o.who);return F;}
function horse22(x,y,z,ry){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=ry||0;W.group.add(g);const c=M(0x8a5a3a),dk=M(0x3a2a1a);
  addMesh(new THREE.BoxGeometry(0.7,0.7,1.7),c,0,1.1,0,g);for(const[sx,sz]of[[-0.25,0.65],[0.25,0.65],[-0.25,-0.65],[0.25,-0.65]])addMesh(new THREE.CylinderGeometry(0.09,0.08,0.8,5),c,sx,0.4,sz,g);
  const nk=new THREE.Group();nk.position.set(0,1.35,0.8);g.add(nk);addMesh(new THREE.BoxGeometry(0.36,0.8,0.4),c,0,0.3,0.1,nk).rotation.x=0.5;addMesh(new THREE.BoxGeometry(0.32,0.32,0.62),c,0,0.65,0.4,nk);addMesh(new THREE.BoxGeometry(0.08,0.5,0.5),dk,0,0.55,0,nk);
  addMesh(new THREE.ConeGeometry(0.12,0.6,5),dk,0,1.0,-0.95,g).rotation.x=-0.9;g.traverse(c2=>{c2.userData.noBatch=true;});return {g,nk};}
function plough22(x,y,z,ry){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=ry||0;W.group.add(g);const wd=M(0x8a6040),ir=M(0x6a6a70);
  addMesh(new THREE.BoxGeometry(0.12,0.12,1.8),wd,0,0.5,0,g).rotation.x=-0.25;for(const s of[-1,1])addMesh(new THREE.BoxGeometry(0.08,0.08,0.7),wd,s*0.25,0.85,-0.75,g).rotation.x=0.4;
  addMesh(new THREE.ConeGeometry(0.16,0.45,4),ir,0,0.12,0.75,g).rotation.x=Math.PI/2+0.6;g.traverse(c=>{c.userData.noBatch=true;});return g;}
function pine22(x,y,z,s){const g=new THREE.Group();g.position.set(x,y,z);g.scale.setScalar(s||1);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.2,0.3,2.2,6),M(0x6a4a2a),0,1.1,0,g);
  const ndl=M([0x2f6a3a,0x3a7a40,0x2a5a34][Math.floor(rand(0,3))]);const top=new THREE.Group();top.position.y=1.6;g.add(top);for(let i=0;i<4;i++)addMesh(new THREE.ConeGeometry(1.5-i*0.3,1.6,7),ndl,0,0.5+i*0.95,0,top);
  const cyl={x,z,r:0.35*(s||1),miny:y-1,maxy:y+4*(s||1),on:true};W.cyls.push(cyl);return {g,top,cyl};}
function oak22(x,y,z,s){const g=new THREE.Group();g.position.set(x,y,z);g.scale.setScalar(s||1);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.35,0.55,2.4,7),M(0x5a3e26),0,1.2,0,g);
  const lf=M([0x3f7a34,0x4a8a3a,0x356a2e][Math.floor(rand(0,3))]);const top=new THREE.Group();top.position.y=2.6;g.add(top);for(let i=0;i<5;i++)addMesh(new THREE.SphereGeometry(rand(0.9,1.3),8,6),lf,rand(-0.9,0.9),rand(0,1.2),rand(-0.9,0.9),top);
  W.cyls.push({x,z,r:0.55*(s||1),miny:y-1,maxy:y+3*(s||1),on:true});return {g,top};}
// ус кита: длинная гибкая трубка дугой над дубравой
function whisker22(pts){const c=new THREE.CatmullRomCurve3(pts.map(p=>new V3(p[0],p[1],p[2])));const m=new THREE.Mesh(new THREE.TubeGeometry(c,40,0.22,6,false),M(0x2a3448));m.userData.noBatch=true;W.group.add(m);return m;}
// глаз кита: белок, радужка, веко-полусфера (закрыто/открыто), ресницы
function eye22(x,y,z,r,side){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=side>0?-Math.PI/2:Math.PI/2;W.group.add(g);
  addMesh(new THREE.SphereGeometry(r*1.25,16,12,0,Math.PI*2,0,Math.PI/2),M(0x5a6a86),0,-r*0.2,0,g).scale.set(1,0.55,1);
  const ball=new THREE.Mesh(new THREE.SphereGeometry(r,16,12),M(0xf6f2e8));g.add(ball);const iris=new THREE.Mesh(new THREE.CircleGeometry(r*0.45,18),M(0x3a6aa0,{emissive:0x1a3a60,emissiveIntensity:0.4}));iris.position.z=r*0.995;g.add(iris);
  const pup=new THREE.Mesh(new THREE.CircleGeometry(r*0.22,14),MAT.dark);pup.position.z=r*1.0;g.add(pup);const shine=new THREE.Mesh(new THREE.CircleGeometry(r*0.08,10),MB(0xffffff));shine.position.set(r*0.15,r*0.18,r*1.005);g.add(shine);
  const lid=new THREE.Group();g.add(lid);const lm=new THREE.Mesh(new THREE.SphereGeometry(r*1.05,16,10,0,Math.PI*2,0,Math.PI/2),M(0x5a6a86));lm.rotation.x=Math.PI/2;lid.add(lm);
  for(let i=0;i<7;i++){const a=(i-3)*0.28,l=new THREE.Mesh(new THREE.ConeGeometry(r*0.05,r*0.45,4),MAT.dark);l.position.set(Math.sin(a)*r*1.02,-Math.cos(a)*r*0.2,r*0.95);l.rotation.x=1.2;l.rotation.z=a;lid.add(l);}
  const tear=new THREE.Mesh(new THREE.SphereGeometry(r*0.12,10,8),MB(0x9fe6ff,{transparent:true,opacity:0.85}));tear.visible=false;g.add(tear);
  g.traverse(c=>{c.userData.noBatch=true;});const E={g,lid,iris,pup,tear,r,open:0,set(k){E.open=k;lid.rotation.x=-k*1.6;},cry(){tear.visible=true;tear.position.set(r*0.3,-r*0.1,r*0.95);anim(2.4,q=>{tear.position.y=-r*0.1-q*r*1.6;tear.scale.setScalar(1-q*0.3);if(q>=1)tear.visible=false;});}};E.set(0);return E;}
// радуга: семь дуг
function rainbow22(x,y,z,R){const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);[0xff4a4a,0xff9a3a,0xffe04a,0x5ad05a,0x4ab8ff,0x5a6aff,0xb05aff].forEach((c,i)=>{const t=new THREE.Mesh(new THREE.TorusGeometry(R-i*0.55,0.28,6,48,Math.PI),MB(c,{transparent:true,opacity:0.75,fog:false,depthWrite:false}));g.add(t);});
  g.traverse(c=>{c.userData.noBatch=true;c.castShadow=false;});return g;}

function pikeMesh22(){const g=new THREE.Group();W.group.add(g);const m=M(0x6a8a5a),bl=M(0xd8e0c0),gold=M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.7});
  const b=new THREE.Mesh(new THREE.SphereGeometry(0.4,12,8),m);b.scale.set(0.55,0.6,2.2);g.add(b);const be=new THREE.Mesh(new THREE.SphereGeometry(0.36,10,6),bl);be.scale.set(0.5,0.4,2.0);be.position.y=-0.08;g.add(be);
  const jaw=new THREE.Mesh(new THREE.ConeGeometry(0.2,0.55,6),m);jaw.rotation.x=Math.PI/2;jaw.position.z=1.0;jaw.scale.set(1,1,0.6);g.add(jaw);
  for(const s of[-1,1])part(g,new THREE.SphereGeometry(0.055,6,5),MAT.dark,s*0.17,0.1,0.62);
  const tail=new THREE.Group();tail.position.z=-0.85;g.add(tail);const tf=new THREE.Mesh(new THREE.ConeGeometry(0.32,0.5,4),m);tf.rotation.x=-Math.PI/2;tf.scale.set(0.2,1,1);tf.position.z=-0.2;tail.add(tf);
  const cr=new THREE.Group();cr.position.set(0,0.28,0.3);g.add(cr);for(let i=0;i<5;i++){const a=i/5*Math.PI*2;part(cr,new THREE.ConeGeometry(0.035,0.14,4),gold,Math.cos(a)*0.09,0.05,Math.sin(a)*0.09);}
  return {g,tail};}
// печка Емели: беленая, с устьем, трубой и глазками — сама едет
function stoveMesh22(){const g=new THREE.Group();W.group.add(g);const wh=M(0xf4efe4),red=M(0xc8503a),dk=M(0x2a1a14);
  const body=new THREE.Group();g.add(body);addMesh(new THREE.BoxGeometry(2.6,1.0,3.4),wh,0,0.5,0,body);addMesh(new THREE.BoxGeometry(2.7,0.12,3.5),red,0,1.02,0,body);
  addMesh(new THREE.BoxGeometry(1.0,0.55,0.06),dk,0,0.36,1.72,body);addMesh(new THREE.BoxGeometry(1.2,0.1,0.08),red,0,0.68,1.74,body);
  const chim=new THREE.Group();chim.position.set(0.7,1.0,-1.2);body.add(chim);addMesh(new THREE.BoxGeometry(0.6,1.4,0.6),wh,0,0.7,0,chim);addMesh(new THREE.BoxGeometry(0.7,0.12,0.7),red,0,1.42,0,chim);
  const sm=new THREE.Object3D();sm.position.set(0,1.6,0);chim.add(sm);
  const face=new THREE.Group();face.position.set(0,0.84,1.74);body.add(face);for(const s of[-1,1]){part(face,new THREE.SphereGeometry(0.12,8,6),M(0xffffff),s*0.45,0,0.02);part(face,new THREE.SphereGeometry(0.06,6,5),MAT.dark,s*0.45,0,0.1);}
  for(let i=0;i<6;i++)addMesh(new THREE.BoxGeometry(0.18,0.18,0.02),M([0x3a7ac0,0xc0302a,0xe0a020][i%3]),-1.0+i*0.4,0.12,1.71,body);   // изразцы
  g.traverse(c=>{c.userData.noBatch=true;});return {g,body,chim:sm,face};}
build22=function(){
  W.zvenAway=true;W.world=2;W.bubbles=false;setTheme('sea');sky('day');W.name='2-2 · «Чудо-юдо Рыба-кит»';W.sub='Подводный Китеж · кит дышит · одна вода на двоих · по щучьему велению';W.camX=10;const F=W.flags;W.k22=true;W.wade=h=>h.prilip?0.55:1;
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.gusli=true;W.fallY=-5;W.waterCol=0x2f86c8;W.waterOp=0.42;
  const grass=M(0x7ab060),skinSide=M(0x5a6a86),soil=M(0x6a4a2a),wood=M(0x9a6a3c);
  // море и облака
  const sea=new THREE.Mesh(new THREE.PlaneGeometry(900,900),M(0x3a90c0,{transparent:true,opacity:0.92}));sea.rotation.x=-Math.PI/2;sea.position.set(0,-3.2,-200);W.group.add(sea);const SEA={y:-3.2,target:-3.2};
  for(let i=0;i<34;i++){const c=new THREE.Group();c.position.set(rand(-90,90),rand(14,32),rand(-470,60));for(let k=0;k<4;k++)addMesh(new THREE.SphereGeometry(rand(2,4),10,8),MB(0xffffff,{transparent:true,opacity:0.85}),rand(-4,4),rand(-1,1),rand(-2,2),c).castShadow=false;W.group.add(c);}
  const whale=makeWhale(560);const WY=-56.8;whale.g.position.set(0,WY,-200);   // кит длиной во весь уровень: спина — сразу под землёй деревни
  wall(-10.2,-10,-100,46);wall(10,10.2,-100,46);wall(-10.2,10.2,46,46.2);wall(-10.2,-3.6,-100.2,-100);wall(3.6,10.2,-100.2,-100);wall(-10.2,-10,-424,-140);wall(10,10.2,-424,-140);wall(-10.2,10.2,-424.2,-424);
  const Z=makeZven();W.zven=Z;Z.pos.set(0,2.2,36);
  const hut=(minx,maxx,minz,maxz,top,roof)=>{const m=W.group.children.length;box(minx,maxx,0,top,minz,maxz,wood,{occ:false});const w=maxx-minx,d=maxz-minz;const rg=new THREE.ConeGeometry(Math.max(w,d)*0.62,1.1,4);rg.rotateY(Math.PI/4);
    const r=addMesh(rg,M(roof||0xc8a04a),(minx+maxx)/2,top+0.55,(minz+maxz)/2);r.scale.set(w/Math.max(w,d),0.35,d/Math.max(w,d));fadeable(since(m));};
  const beds=(minx,maxx,minz,maxz)=>{for(let z=maxz-0.5;z>minz;z-=1.1){addMesh(new THREE.BoxGeometry(maxx-minx,0.16,0.6),soil,(minx+maxx)/2,0.08,z).receiveShadow=true;for(let x=minx+0.4;x<maxx;x+=0.7)addMesh(new THREE.ConeGeometry(0.12,0.35,5),M(0x4f9a3a),x,0.3,z);}};
  // дыхание кита: вдох гудит (море отходит, кит подымается), выдох — спину тряхнёт, всех подкинет и качнёт вбок, брызги в бока
  const WB={t:3,per:14,ph:'calm',k:0,side:1,sway:0,n:0,props:[],pines:[],hooks:[],calm:1};
  /* ---------- 0. хвост: «на хвосте сыр-бор шумит»; трещина в хвостовом плавнике — Потап валит сосну-мостик ---------- */
  ground(-10,10,29.6,46,0,grass,skinSide);ground(-10,10,12,26,0,grass,skinSide);
  for(let x=-9.5;x<=9.5;x+=1.4)addMesh(new THREE.ConeGeometry(0.3,0.6,4),skinSide,x,-0.2,27.8+rand(-0.4,0.4)).rotation.x=rand(-0.5,0.5);   // края трещины
  {let sd=1717;const rr=(a,b)=>{sd=(sd*16807)%2147483647;return a+(b-a)*sd/2147483647;};
    for(let i=0;i<26;i++){const x=rr(-9.4,9.4),z=i<16?rr(31,45):rr(13,25);if(Math.abs(x)<2.6)continue;if(z>31&&z<35&&x>3.5&&x<7.5)continue;WB.pines.push(pine22(x,0,z,rr(0.8,1.25)));}}
  bell(0,42);
  const fellP=pine22(5.4,0,32.6,1.15);   // эту сосну Потап повалит через трещину
  const logCol=colBox(-0.9,0.9,-0.4,0.3,25.6,30.0,false);logCol.on=false;
  W.lifts.push({pos:new V3(5.4,0,32.6),active:()=>!F.log,onLift:h=>{F.log=true;fellP.cyl.on=false;SFX.toss();shakeAll(0.04,0.3);const g=fellP.g;
    anim(1.3,k=>{const kk=smooth(k);g.position.set(lerp(5.4,0,kk),lerp(0,0.15,kk),lerp(32.6,30.4,kk));g.rotation.x=-Math.PI/2*kk;g.rotation.y=0;});
    later(1.3,()=>{logCol.on=true;SFX.thud();burst(new V3(0,0.4,27.8),0x7a5a3a,16,3);});later(0.5,()=>bark(h,'potap','Эх… прости, сосенка. Мостиком послужишь!',2.4));}});
  bell(0,20);
  const gullsT=[chaika22(-5,22,0,{leash:10}),chaika22(5,16,0,{leash:10})];
  /* ---------- начало: хвост кита — тут прежний двор ---------- */
  ground(-10,10,-6,12,0,grass,skinSide);bell(0,6);
  for(let i=0;i<5;i++){addMesh(new THREE.CylinderGeometry(0.06,0.08,1.2,5),wood,-9.5+i*0.9,0.6,-5.6);}
  /* ---------- 1. двор: общая вода, мешать нечем ---------- */
  ground(-10,10,-24,-15,0,grass,skinSide);ground(-10,-8.5,-15,-6,0,grass,skinSide);ground(-4.5,10,-15,-6,0,grass,skinSide);ground(-8.5,-4.5,-11,-6,0,grass,skinSide);ground(-8.5,-4.5,-15,-11,-1.8,soil);
  for(let i=0;i<6;i++)box(-4.5-(i+1)*0.55,-4.5-i*0.55,-1.8,-0.26-i*0.26,-15,-14.1,M(0x8a6a4a),{occ:false});   // ступеньки погреба
  const n1=nutItem(-7.6,-1.3,-12);
  hut(-9.6,-5,-21.6,-17.5,2.9,0xc86a4a);hut(5,9.6,-13.6,-10,2.9,0xc8a04a);const n2=nutItem(7.3,3.4,-11.8);
  box(-10,10,0,2.3,-23.2,-22.2,wood,{occ:false});for(let x=-9.6;x<10;x+=0.8)addMesh(new THREE.ConeGeometry(0.1,0.3,4),wood,x,2.45,-22.7);
  const Z1=waterZone(-10,10,-22.2,-7,0,2.6,{shared:true,shell:{x:0,z:-7.6,y:0}});
  bell(0,-24.8);
  /* ---------- 2. огород и мачта: нужен порядок ---------- */
  ground(-10,10,-52,-24,0,grass,skinSide);
  box(-0.5,0.5,0,3.6,-50,-26,wood,{occ:false});
  // Игроку 1: мачта затонувшего корабля — в прилив доплыть до гнезда; в отлив — кувшин на дне и раки в грядках
  box(-9,-4,0,1.0,-45,-40,M(0x7a4a2a),{occ:false});addMesh(new THREE.BoxGeometry(5.4,0.5,1),M(0x5a3214),-6.5,0.8,-39.8).rotation.x=0.3;
  addMesh(new THREE.CylinderGeometry(0.16,0.2,4.2,8),M(0x6a4a2a),-6.5,1.9,-36);W.cyls.push({x:-6.5,z:-36,r:0.2,miny:-1,maxy:3.1,on:true});
  addMesh(new THREE.CylinderGeometry(0.9,0.8,0.25,12),M(0x8a5a2a),-6.5,3.18,-36);W.cyls.push({x:-6.5,z:-36,r:0.95,miny:3.0,maxy:3.3,on:true});
  const rope=addMesh(new THREE.CylinderGeometry(0.03,0.03,1.6,5),M(0xd8c090),-6.0,4.2,-36.4);const flag=addMesh(new THREE.BoxGeometry(0.8,0.5,0.03),M(0xc0302a),-6.1,5.3,-36);
  addMesh(new THREE.CylinderGeometry(0.05,0.05,2.4,5),M(0x6a4a2a),-6.5,4.4,-36);
  const mastLink=linkItem(-6.5,3.95,-35.3);
  beds(-9.5,-2,-33,-27.5);beds(-9.4,-1.5,-49.5,-46);
  const jug=new THREE.Group();jug.position.set(-3.2,0,-43);W.group.add(jug);addMesh(new THREE.CylinderGeometry(0.32,0.42,0.9,12),M(0xb8703a),0,0.45,0,jug);addMesh(new THREE.CylinderGeometry(0.2,0.28,0.3,12),M(0xb8703a),0,1.05,0,jug);
  const jugNut=nutItem(-3.2,0.5,-43);jugNut.locked=true;jugNut.g.visible=false;
  W.lifts.push({pos:new V3(-3.2,0,-43),active:()=>!F.jug&&Z2.level<=Z2.floor+0.3,onLift:(h)=>{F.jug=true;SFX.toss();anim(0.8,k=>{jug.position.y=Math.sin(k*Math.PI)*1.6;jug.rotation.z=k*2.4;jug.position.x=-3.2+k*1.2;});
    later(0.4,()=>{jugNut.locked=false;jugNut.g.visible=true;});bark(h,'potap','Тяжёлый! Как… э-э… как положено.',2);}});
  // Игроку 2: стена огорода — лаз у самой земли (в отлив Йоша пролезет), за стеной калитка; бочка, из которой прилив поднимет орешек
  box(1.2,5,0,3.6,-38,-37,wood);box(6,10,0,3.6,-38,-37,wood);box(5,6,0.8,3.6,-38,-37,wood);
  const wgate=makeGate(6.4,9.6,-37.5,'own','wicket',{h:3.2});
  beds(1.8,9.6,-48,-40);const plateG=plate(8,-45.5,'wicket');plateG.once=true;
  const gardenLink=linkItem(4,1.1,-48.8);
  const barrel=new THREE.Group();barrel.position.set(4.2,0,-30.5);W.group.add(barrel);barrelMesh(barrel,1.6,1.8,1.6);W.cyls.push({x:4.2,z:-30.5,r:0.8,miny:-1,maxy:1.8,on:true});
  hut(7,9.6,-33,-28,3.3,0xc86a4a);
  const Z2=waterZone(-10,10,-50,-25.5,0,3.0,{shared:true,shell:{x:0,z:-25.2,y:0}});
  const barrelNut=floatItem(nutItem(4.2,0.5,-30.5),Z2,0.45);
  const G2={open:false};const gm=W.group.children.length;const g2col=colBox(-10,10,0,3.4,-51.2,-50.4);const g2=new THREE.Group();W.group.add(g2);
  for(let x=-9.5;x<10;x+=1.0)addMesh(new THREE.BoxGeometry(0.8,3.2,0.3),wood,x,1.6,-50.8,g2);addMesh(new THREE.BoxGeometry(20,0.2,0.4),M(0x5a3214),0,2.6,-50.8,g2);fadeable(g2);
  const crabs=[crab(-7,-30,Z2,{pi:0}),crab(-3.8,-31.5,Z2,{pi:0}),crab(-6,-47.5,Z2,{pi:0}),crab(6,-42,Z2,{pi:1}),crab(3.2,-45.5,Z2,{pi:1})];
  const inBeds=e=>(e.pos.x>-9.6&&e.pos.x<-1.9&&((e.pos.z<-27.4&&e.pos.z>-33.1)||(e.pos.z<-45.9&&e.pos.z>-49.6)))||(e.pos.x>1.7&&e.pos.z<-39.9&&e.pos.z>-48.1);
  crabs.forEach(e=>{e.beds=inBeds;});
  bell(-3,-26.6);bell(3,-26.6);
  /* ---------- 3. дыхание кита: фонтан в прилив — до облаков ---------- */
  ground(-10,10,-72,-52,0,grass,skinSide);bell(0,-52.8);
  hut(-9.6,-6.4,-60,-56.5,2.9,0xc8a04a);hut(6.4,9.6,-66,-62.5,2.9,0xc86a4a);const n5=nutItem(8,3.45,-64.2);
  const Z3=waterZone(-10,10,-68,-54,0,2.6,{shared:true,shell:{x:0,z:-53.7,y:0}});
  const BH={x:0,z:-61};addMesh(new THREE.CylinderGeometry(1.2,1.4,0.12,18),M(0x2a3040),BH.x,0.03,BH.z).receiveShadow=true;const bhr=addMesh(new THREE.TorusGeometry(1.35,0.12,8,24),skinSide,BH.x,0.1,BH.z);bhr.rotation.x=Math.PI/2;
  const col=new THREE.Mesh(new THREE.CylinderGeometry(0.9,1.3,1,16,1,true),MB(0xe8f8ff,{transparent:true,opacity:0.55,side:THREE.DoubleSide,depthWrite:false}));col.position.set(BH.x,0,BH.z);col.visible=false;W.group.add(col);
  const bubs=[0,1].map(i=>{const m=new THREE.Mesh(new THREE.SphereGeometry(0.5,14,10),MB(0xe8fcff,{transparent:true,opacity:0.6,depthWrite:false}));m.position.set(BH.x-0.8+i*1.6,6.4+i*0.5,BH.z);W.group.add(m);return m;});
  const cloud=(minx,maxx,top,minz,maxz)=>{box(minx,maxx,top-0.4,top,minz,maxz,MB(0xffffff),{occ:false});for(let i=0;i<5;i++)addMesh(new THREE.SphereGeometry(rand(0.8,1.3),10,8),MB(0xffffff),rand(minx+0.5,maxx-0.5),top-0.2,rand(minz+0.5,maxz-0.5)).castShadow=false;};
  cloud(-2.6,2.6,7.9,-66.2,-62.4);cloud(0.8,5.2,7.0,-71.6,-67.6);const cloudLink=linkItem(0,8.6,-64.6);
  /* ---------- 4. деревня на горбу кита: пруд и щука (по щучьему велению) ---------- */
  // у пруда три ведра, в одном — щука. Совиный взор Пелагеи покажет, в каком; Потап поднимет ведро и выпустит щуку — только в полный
  // пруд (он общий: прилив просят вдвоём). Щука за свободу дарит слово: «По щучьему велению…» — и печка сама выезжает из избы.
  const hump=M(0x7ab060);
  ground(-10,10,-85,-72,4.5,hump,skinSide);ground(-10,10,-100,-95,4.5,hump,skinSide);ground(-10,-4,-95,-85,4.5,hump,skinSide);ground(4,10,-95,-85,4.5,hump,skinSide);ground(-4,4,-95,-85,2.4,soil);
  for(let i=0;i<5;i++)box(-4,-2.6,2.4,2.4+0.42*(i+1),-94.4+i*0.6,-93.8+i*0.6,wood,{occ:false});   // мостки из пруда
  bell(0,-76,4.5);
  const hut2=(minx,maxx,minz,maxz,top,roof)=>{const m=W.group.children.length;box(minx,maxx,4.5,4.5+top,minz,maxz,wood,{occ:false});const w=maxx-minx,d=maxz-minz;const rg=new THREE.ConeGeometry(Math.max(w,d)*0.62,1.1,4);rg.rotateY(Math.PI/4);
    const r=addMesh(rg,M(roof||0xc8a04a),(minx+maxx)/2,4.5+top+0.55,(minz+maxz)/2);r.scale.set(w/Math.max(w,d),0.35,d/Math.max(w,d));fadeable(since(m));};
  hut2(-9.8,-5.8,-84,-79,3.0,0xc86a4a);addMesh(new THREE.BoxGeometry(1.6,2.2,0.08),M(0x3a2a1a),-7.8,5.6,-84.05);   // изба Емели: дверь
  hut2(6,9.6,-99,-95.4,2.8,0xc8a04a);const nutHut=nutItem(7.8,8.1,-97.2);
  const PZ=waterZone(-4,4,-95,-85,2.4,4.3,{shared:true,floor:2.4,shell:{x:0,z:-84.4,y:4.5}});
  const LILY=[];for(let i=0;i<6;i++){const lp=addMesh(new THREE.CylinderGeometry(rand(0.35,0.55),rand(0.35,0.55),0.04,10),M(0x4f9a3a),rand(-1.6,3.4),2.45,rand(-90.6,-85.6));lp.castShadow=false;lp.userData.noBatch=true;LILY.push(lp);}   // кувшинки
  const PIKE_AT=Math.floor(Math.random()*3);
  const BUCK=[[-6.6,-87.6],[-6.6,-91.8],[6.6,-89.8]].map(([x,z],i)=>{const g=new THREE.Group();g.position.set(x,4.5,z);W.group.add(g);const wd=M(0x9a6a3c),ir=M(0x5a5a62);
    addMesh(new THREE.CylinderGeometry(0.5,0.42,0.9,12),wd,0,0.45,0,g);for(const y of[0.15,0.75])addMesh(new THREE.TorusGeometry(0.47,0.035,5,16),ir,0,y,0,g).rotation.x=Math.PI/2;
    addMesh(new THREE.CylinderGeometry(0.45,0.45,0.02,12),M(0x4aa0c8,{transparent:true,opacity:0.8}),0,0.84,0,g);const hdl=addMesh(new THREE.TorusGeometry(0.5,0.025,4,16,Math.PI),ir,0,0.9,0,g);
    const glow=addMesh(new THREE.TorusGeometry(0.62,0.06,6,20),MB(0xffe08a,{transparent:true,opacity:0}),0,0.95,0,g);glow.rotation.x=Math.PI/2;W.cyls.push({x,z,r:0.5,miny:3.5,maxy:5.4,on:true});
    return {g,x,z,pike:i===PIKE_AT,tipped:false,glow};});
  const pikeFish=pikeMesh22();pikeFish.g.visible=false;
  BUCK.forEach(b=>W.lifts.push({pos:new V3(b.x,4.5,b.z),active:()=>!F.pikeFree&&!b.tipped,onLift:h=>{
    if(!b.pike){b.tipped=true;SFX.splash();anim(0.6,k=>{b.g.rotation.z=1.4*smooth(k);});const f=new THREE.Group();f.position.set(b.x,5.2,b.z);W.group.add(f);const fm=M(0x9ab06a);addMesh(new THREE.SphereGeometry(0.16,8,6),fm,0,0,0,f).scale.set(0.6,0.8,1.6);
      anim(1.6,k=>{f.position.set(b.x+k*1.4,5.2+Math.abs(Math.sin(k*Math.PI*3))*0.6*(1-k),b.z);f.rotation.z=Math.sin(k*30)*0.6;if(k>=1)W.group.remove(f);});
      bark(h,'potap',['Окунь! Не та рыба.','Ёрш! Колючий, вредный.'][F.wrong=(F.wrong||0)+1,F.wrong%2],2,true);if(!F.owlHint){F.owlHint=true;tip(1,'Какое ведро? Совиный взор Пелагеи '+K(1,'skill')+' покажет — щука светится.',3.4);}return;}
    if(PZ.level<PZ.floor+1.4){floatText(new V3(b.x,6.6,b.z),'Пруд мелкий — щуке тесно! Сперва прилив','#9fe6ff');SFX.miss();if(!F.pondTold){F.pondTold=true;for(const p of[0,1])tip(p,'Пруд общий: просите прилив у ракушки '+K(p,'item')+' — вода прибудет у обоих.',3);}return;}
    pikeScene(b,h);}}));
  /* ---------- 5. печка Емели: по щучьему велению сама везёт по хребту кита ---------- */
  // садитесь на печку оба — и поехали. Раки встают поперёк дороги — печка стоит, пока не прогоните; дыхание кита гонит волну через
  // хребет — держись: щит или прыжок, иначе смоет назад, догоняй. Хребет узкий, по бокам — море.
  ground(-3.5,3.5,-140,-100,4.5,hump,skinSide);
  for(let z=-102;z>-140;z-=3.2)for(const s of[-1,1])addMesh(new THREE.ConeGeometry(0.28,0.9,5),skinSide,s*3.2,4.9,z+rand(-0.6,0.6)).rotation.z=-s*0.4;   // наросты по краю хребта
  const stove=stoveMesh22();const STV={g:stove.g,x:-7.8,z:-85.6,s:0,state:'home',col:colBox(-9.1,-6.5,4.5,5.5,-87.3,-83.9,false),wave:null,waveT:3.5,crabs:[],stopT:0,smoke:0};
  const PATH=[[0,-100.5],[0.9,-110],[-0.9,-120],[0.7,-130],[0,-137.5]],SEG=[];let PL=0;for(let i=0;i<PATH.length-1;i++){const a=PATH[i],b=PATH[i+1],L=Math.hypot(b[0]-a[0],b[1]-a[1]);SEG.push({a,b,L,s0:PL});PL+=L;}
  const pathAt=s=>{s=clamp(s,0,PL);for(const q of SEG)if(s<=q.s0+q.L){const k=(s-q.s0)/q.L;return [lerp(q.a[0],q.b[0],k),lerp(q.a[1],q.b[1],k),Math.atan2(q.b[0]-q.a[0],q.b[1]-q.a[1])];}const q=SEG[SEG.length-1];return [q.b[0],q.b[1],Math.atan2(q.b[0]-q.a[0],q.b[1]-q.a[1])];};
  const stovePlace=(x,z,ry)=>{const dx=x-STV.x,dz=z-STV.z;STV.x=x;STV.z=z;stove.g.position.set(x,4.5,z);stove.g.rotation.y=ry+Math.PI;
    const c=STV.col;c.minx=x-1.3;c.maxx=x+1.3;c.minz=z-1.7;c.maxz=z+1.7;if(dx||dz)for(const h of HEROES)if(h.groundRef===c&&h.grounded&&!h.cling){h.pos.x+=dx;h.pos.z+=dz;}};
  stovePlace(-7.8,-85.6,0);
  const nutSpine=nutItem(-2.6,5.2,-125);
  /* ---------- 6. бока: «все бока его изрыты, частоколы в рёбра вбиты» ---------- */
  // рёбра ходят ходуном (соседние — навстречу друг другу): с ребра на ребро прыгай, когда сошлись. На трёх рёбрах — частокол:
  // Потап выдёргивает кол, из раны сочится морок — Йоша лечит живой водой. Вылечили все три — кит открывает глаз (ролик).
  const ribSkin=M(0x7a8aa6),foldM=M(0x4a5a74);
  ground(-10,10,-146,-140,4.5,hump,skinSide);ground(-10,10,-186,-146,3.7,foldM,skinSide);ground(-10,10,-212,-186,4.5,hump,skinSide);   // складка между рёбрами (3.7): из неё на ребро выпрыгнет и Потап
  for(let x=-9;x<=9;x+=3)WB.props.push({g:addMesh(new THREE.ConeGeometry(0.3,0.6,5),M(0xdad8c8),x,4.8,-143.5),y:4.8,h:0.4});
  const RIB=[];for(let i=0;i<6;i++){const z0=-149.5-i*6.2,g=new THREE.Group();g.position.set(0,0,z0);W.group.add(g);
    addMesh(new THREE.BoxGeometry(20,1.1,3.0),ribSkin,0,3.95,0,g);addMesh(new THREE.BoxGeometry(20.2,0.12,3.1),M(0x95a5c0),0,4.5,0,g);
    for(let k=0;k<6;k++)addMesh(new THREE.ConeGeometry(0.2,0.45,5),M(0xdad8c8),-8.5+k*3.4,4.7,rand(-1,1),g);
    g.traverse(c=>{c.userData.noBatch=true;});RIB.push({i,z0,g,col:colBox(-10,10,3.4,4.5,z0-1.5,z0+1.5,false),z:z0,y:0,pal:null});}
  const RB={A:1.1,per:4.2,t:0,healed:0};
  const PALS=[1,3,5].map((ri,n)=>{const R=RIB[ri],g=new THREE.Group();R.g.add(g);const pw=M(0x8a6a44);for(let x=-9.6;x<=9.6;x+=0.6){const p=addMesh(new THREE.CylinderGeometry(0.1,0.12,1.9,5),pw,x,5.4,-1.1,g);addMesh(new THREE.ConeGeometry(0.11,0.3,5),pw,x,6.5,-1.1,g);}
    addMesh(new THREE.BoxGeometry(19.4,0.12,0.12),pw,0,5.9,-1.1,g);const stake=new THREE.Group();stake.position.set(2.6,4.5,-0.6);R.g.add(stake);addMesh(new THREE.CylinderGeometry(0.24,0.3,2.8,7),M(0x6a4a2a),0,1.0,0,stake);addMesh(new THREE.ConeGeometry(0.3,0.5,7),M(0x6a4a2a),0,2.6,0,stake);
    const mist=new THREE.Group();mist.visible=false;R.g.add(mist);const mm=MB(0x3a1450,{transparent:true,opacity:0.55,depthWrite:false});for(let k=0;k<14;k++)addMesh(new THREE.SphereGeometry(rand(0.5,0.9),8,6),mm,-9+k*1.4,5.2+rand(-0.3,0.3),-1.1,mist);
    const P={n,R,g,stake,mist,col:colBox(-10,10,4.5,6.6,R.z0-1.35,R.z0-0.85,false),pulled:false,healed:false};R.pal=P;g.traverse(c=>{c.userData.noBatch=true;});stake.traverse(c=>{c.userData.noBatch=true;});return P;});
  PALS.forEach(P=>{W.lifts.push({pos:new V3(),active:()=>!P.pulled&&hd(P.lp,HERO.potap.pos)<2.4,onLift:h=>pullStake(P,h)});P.lp=new V3();
    W.waterTargets.push({pos:new V3(),active:()=>P.pulled&&!P.healed,onWater:h=>healWound(P,h),pri:1});});
  const LIFTS_PAL=W.lifts.slice(-3),WT_PAL=W.waterTargets.slice(-3);
  function pullStake(P,h){if(P.pulled)return;P.pulled=true;SFX.toss();shakeAll(0.05,0.4);tone(90,0.8,'sine',0.25,50);floatText(new V3(P.lp.x,7,P.lp.z),'О-ох!','#cfe8ff');
    anim(1.0,k=>{P.stake.position.y=4.5+k*2.2;P.stake.rotation.z=k*1.4;P.stake.position.x=2.6+k*2;});later(1.0,()=>{P.stake.visible=false;});
    anim(1.2,k=>{P.g.rotation.x=-1.4*smooth(k);P.g.position.y=-k*1.6;});later(1.2,()=>{P.g.visible=false;});P.mist.visible=true;
    later(0.4,()=>bark(h,'potap','Ух! Вот так занозища!',1.8,true));
    if(!F.woundTold){F.woundTold=true;for(const p of[0,1])tip(p,'Из раны сочится морок — не пройти. Йоша, полей живой водой '+K(1,'skill')+' — заживёт!',3.4);}}
  function healWound(P,h){if(P.healed)return;P.healed=true;P.col.on=false;SFX.grow();RB.healed++;RB.A=1.1*(1-0.22*RB.healed);WB.calm=Math.max(0.55,1-0.15*RB.healed);
    anim(1.2,k=>{P.mist.scale.setScalar(1-k*0.9);P.mist.children.forEach(c=>{c.material.opacity=0.55*(1-k);});});later(1.2,()=>{P.mist.visible=false;});
    for(let i=0;i<14;i++)burst(new V3(rand(-9,9),5,P.R.z),[0x9fe6ff,COL.gold][i%2],3,3);tone(160,1.4,'sine',0.2,110);floatText(new V3(P.lp.x,7,P.lp.z),'Ах-х… полегчало…','#9fe6ff');
    if(RB.healed===3)later(1.2,eyeScene);}
  const flankEye=eye22(12.6,3.6,-196,1.9,1);
  const nutRib=nutItem(-9.2,5.1,-208);
  const remR=[prilip22(-4,-161.9,4.5,{leash:8}),prilip22(5,-174.3,4.5,{leash:8})];
  /* ---------- 7. губа: «мужички на губе пашут»; кит зевает — тянет к пасти ---------- */
  const fieldM=M(0x7a5a3a);ground(-7.4,10,-266,-212,4.5,fieldM,skinSide);ground(-10,-7.4,-266,-212,4.5,hump,skinSide);
  for(let x=-6;x<=9;x+=1.5){addMesh(new THREE.BoxGeometry(0.7,0.18,53),M(0x5a3e26),x,4.59,-239).receiveShadow=true;}   // борозды
  {const lip=new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.5,54,10,1,false,0,Math.PI),M(0xc87a8a));lip.rotation.set(Math.PI/2,0,Math.PI/2);lip.position.set(-9.6,4.6,-239);W.group.add(lip);}
  box(-10,-8.4,4.5,6.2,-266,-212,M(0xb8707a),{occ:false});   // губа кита — валиком у левого края; за ней пасть
  const plows=[{x:-2.5,z:-226},{x:4.5,z:-242}].map((p,i)=>{const H=horse22(p.x,4.5,p.z-2.6,Math.PI);const pl=plough22(p.x,4.5,p.z,Math.PI);const man=folk22(p.x+0.5,4.5,p.z+1.3,{kind:'man',ry:Math.PI,who:'pahar',shirt:[0xf0f0e0,0xd04a3a][i]});
    W.cyls.push({x:p.x,z:p.z-1.3,r:1.2,miny:3,maxy:6.5,on:true});return Object.assign(p,{H,pl,man,free:false});});
  const BARN=[{x:-2.5,y:4.5,z:-229.6,hp:3},{x:4.5,y:4.5,z:-245.6,hp:3},{x:-8.9,y:6.3,z:-252,hp:1,high:true}].map(b=>{const g=new THREE.Group();g.position.set(b.x,b.y,b.z);W.group.add(g);const bm=M(0xe0dcc8),dk=M(0x5a5048);
    for(let k=0;k<7;k++){const c=addMesh(new THREE.CylinderGeometry(0.16,0.26,0.36,6),bm,rand(-0.5,0.5),0.18,rand(-0.5,0.5),g);addMesh(new THREE.CylinderGeometry(0.06,0.06,0.04,6),dk,c.position.x,0.37,c.position.z,g);}
    g.traverse(c=>{c.userData.noBatch=true;});const B=Object.assign(b,{g,gone:false});
    if(b.high){const mk=markMesh(0.9);mk.position.set(b.x,b.y+1.0,b.z);W.group.add(mk);B.mk=mk;W.marks.push({pos:new V3(b.x,b.y+0.5,b.z),active:()=>!B.gone,onHit:()=>knockBarn(B)});}
    else W.hittables.push({pos:new V3(b.x,b.y+0.4,b.z),r:1.0,push:false,alive:()=>!B.gone,onHit:h=>{B.hp--;SFX.knock();burst(new V3(b.x,b.y+0.5,b.z),0xe0dcc8,6,2);floatText(new V3(b.x,b.y+1.4,b.z),B.hp>0?'Тук!':'','#ffffff');if(B.hp<=0)knockBarn(B);}});
    return B;});
  function knockBarn(B){if(B.gone)return;B.gone=true;SFX.brk();anim(0.6,k=>{B.g.scale.setScalar(1-k);B.g.position.y=B.y+k*0.6;});later(0.6,()=>{B.g.visible=false;if(B.mk)B.mk.visible=false;});for(let i=0;i<10;i++)burst(new V3(B.x,B.y+0.5,B.z),0xe0dcc8,3,3);
    floatText(new V3(B.x,B.y+1.6,B.z),'Морской жёлудь — долой!','#ffe08a');
    if(BARN.every(b=>b.gone)&&!F.plough){F.plough=true;later(0.6,()=>{say('pahar','Ай да детки! Пошла соха, пошла родимая! Проходите, путь открыт!',3.4);SFX.gate();anim(1.4,k=>{fence.position.y=-2.2*k;});fenceCol.on=false;
      plows.forEach(p=>{anim(5,k=>{p.H.g.position.z=p.z-2.6-k*3;p.pl.position.z=p.z-k*3;p.man.g.position.z=p.z+1.3-k*3;});});});}
    else if(!B.high){const p=plows.find(q=>Math.abs(q.x-B.x)<0.1);if(p){p.free=true;anim(1.2,k=>{p.H.nk.rotation.x=Math.sin(k*Math.PI*4)*0.3;});}}}
  const fence=new THREE.Group();W.group.add(fence);for(let x=-7.2;x<=9.6;x+=0.55)addMesh(new THREE.CylinderGeometry(0.06,0.07,1.6,5),M(0x8a6a44),x,5.3,-263.6,fence);for(const y of[4.9,5.6])addMesh(new THREE.BoxGeometry(17,0.08,0.1),M(0x8a6a44),1.2,y,-263.6,fence);
  const fenceCol=colBox(-7.4,10,4.5,6.4,-263.9,-263.3,false);
  const YW={t:5,ph:'calm'};const gullsL=[chaika22(2,-222,4.5,{leash:12}),chaika22(-3,-250,4.5,{leash:12})];
  const nutField=nutItem(9.2,5.1,-255);
  /* ---------- 8. «между глаз мальчишки пляшут»: хоровод, плясовые камни — прыгай в такт ---------- */
  ground(-10,10,-304,-266,4.5,hump,skinSide);
  const eyesE=[eye22(-11.6,4.4,-284,2.0,-1),eye22(11.6,4.4,-284,2.0,1)];
  const DC={x:0,z:-284,beat:0,bt:1.15,score:[0,0],need:6,done:false,on:false,stones:[],boys:[]};
  for(let i=0;i<8;i++){const a=i/8*Math.PI*2,x=Math.sin(a)*5.4,z=DC.z+Math.cos(a)*5.4;const g=new THREE.Group();g.position.set(x,4.5,z);W.group.add(g);const mat=M(0xd8c8a8,{emissive:0xffffff,emissiveIntensity:0});
    addMesh(new THREE.CylinderGeometry(0.85,0.95,0.16,14),mat,0,0.08,0,g);g.traverse(c=>{c.userData.noBatch=true;});DC.stones.push({i,x,z,g,mat,lit:-1});}
  for(let i=0;i<6;i++){const a=i/6*Math.PI*2;DC.boys.push(folk22(Math.sin(a)*2.0,4.5,DC.z+Math.cos(a)*2.0,{kind:'boy',s:0.75,who:i===0?'malec':null,ry:a+Math.PI/2}));}
  const foreCol=colBox(-10,10,4.5,6.6,-303.6,-303,false);const fore=new THREE.Group();W.group.add(fore);for(let x=-9.6;x<=9.6;x+=0.8){addMesh(new THREE.CylinderGeometry(0.05,0.05,1.5,5),M(0xd8b050),x,5.25,-303.3,fore);}
  for(const y of[5.0,5.8])addMesh(new THREE.BoxGeometry(19.6,0.06,0.06),M(0xd03a3a),0,y,-303.3,fore);
  /* ---------- 9. «а в дубраве, меж усов, ищут девушки грибов» ---------- */
  ground(-10,10,-356,-304,4.5,M(0x6aa060),skinSide);
  {let sd=3131;const rr=(a,b)=>{sd=(sd*16807)%2147483647;return a+(b-a)*sd/2147483647;};for(let i=0;i<12;i++){const x=rr(-9,9),z=rr(-352,-308);if(Math.abs(x)<2.4)continue;oak22(x,4.5,z,rr(0.8,1.15));}}
  for(let i=0;i<5;i++){const z=-310-i*9;whisker22([[-13,4,z+2],[-6,9.5+i%2,z],[0,10.6,z-1.5],[6,9.6,z-0.5],[13,4.2,z+1.5]]);}
  const girls=[folk22(-4,4.5,-314,{kind:'girl',basket:true,who:'devica',scarf:0xff6a8a,ry:0.6}),folk22(5,4.5,-326,{kind:'girl',basket:true,scarf:0xffd040,ry:-0.8}),folk22(-3,4.5,-340,{kind:'girl',basket:true,scarf:0x8ad0ff,ry:0.3})];
  const MUSH=[[-7,-312,1],[6.5,-317,1],[-2,-321,0],[8,-330,1],[-8,-333,1],[3,-338,0],[-5.5,-345,1],[7.5,-346,1],[0.5,-349,0]].map(([x,z,real])=>{const g=new THREE.Group();g.position.set(x,4.5,z);W.group.add(g);g.visible=false;
    addMesh(new THREE.CylinderGeometry(0.1,0.13,0.35,7),M(0xf0e8d8),0,0.17,0,g);const cap=addMesh(new THREE.SphereGeometry(0.32,10,8,0,Math.PI*2,0,Math.PI/2),M(real?0x9a5a2a:0xe02a2a),0,0.32,0,g);cap.scale.y=0.7;
    if(!real)for(let k=0;k<5;k++)addMesh(new THREE.SphereGeometry(0.05,5,4),M(0xffffff),Math.cos(k*1.3)*0.18,0.48,Math.sin(k*1.3)*0.18,g);
    const glow=addMesh(new THREE.TorusGeometry(0.5,0.05,6,16),MB(real?0xffe08a:0xff5a5a,{transparent:true,opacity:0}),0,0.06,0,g);glow.rotation.x=Math.PI/2;g.traverse(c=>{c.userData.noBatch=true;});
    return {x,z,real:!!real,g,glow,got:false,seen:0};});
  const GR={got:0,need:5,done:false};
  const curtain=new THREE.Group();W.group.add(curtain);for(let x=-9.6;x<=9.6;x+=0.45){const h=rand(3.6,5.4);addMesh(new THREE.CylinderGeometry(0.06,0.03,h,4),M(0x2a3448),x,4.5+h/2,-355.4+rand(-0.2,0.2),curtain);}
  const curtCol=colBox(-10,10,4.5,10,-355.8,-355,false);
  const nutGrove=nutItem(-9.2,5.1,-330);
  /* ---------- 10. голова: кит икает — и ныряет; на макушке — колыбельная в два голоса ---------- */
  ground(-10,10,-394,-356,4.5,M(0x6a7a96),skinSide);box(-10,10,4.5,5.5,-400,-394,M(0x6a7a96));box(-10,10,4.5,6.5,-406,-400,M(0x6a7a96));box(-10,10,4.5,7.5,-412,-406,M(0x6a7a96));box(-10,10,4.5,8.5,-424,-412,M(0x6a7a96));
  colBox(-10.6,-10,-12,30,-430,-350,false);colBox(10,10.6,-12,30,-430,-350,false);colBox(-10.6,10.6,-12,12.5,-424.6,-424,false);   // на макушке стены выше: с 8.5 м через обычные не перешагнуть
  for(let i=0;i<10;i++)addMesh(new THREE.CylinderGeometry(0.04,0.04,2.4,5),M(0x3a4050),rand(-9,9),5.5,rand(-392,-370)).rotation.z=rand(-0.5,0.5);   // щетинки
  const BH2={x:0,z:-419};addMesh(new THREE.CylinderGeometry(0.9,1.1,0.12,16),M(0x2a3040),BH2.x,8.53,BH2.z).receiveShadow=true;
  const col2=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.9,1,14,1,true),MB(0xe8f8ff,{transparent:true,opacity:0.5,side:THREE.DoubleSide,depthWrite:false}));col2.position.set(BH2.x,8.5,BH2.z);col2.visible=false;W.group.add(col2);
  const glint=new THREE.Mesh(new THREE.OctahedronGeometry(0.22),MB(0xffe08a));glint.visible=false;W.group.add(glint);
  const LUL=[0,1].map(i=>({hum:0,ring(h){const was=this.hum;this.hum=6;if(was<=0)[60,64,67,72].forEach((m,k)=>gusli(m+(i?-5:0),k*0.18,0.1));}}));
  const lulShells=[-3.6,3.6].map((x,i)=>kwShell('dance',x,-414,8.5,LUL[i],{ry:Math.PI,say:i?'Баю-бай, кит…':'Спи, кит, спи…'}));
  const headEye=eye22(12.8,6.6,-416,2.2,1);
  const gullsH=[];const FN={dive:false,lull:0,done:false};
  // облако над головой — сюда фонтан донесёт героев; там звено
  const cloudG=new THREE.Group();W.group.add(cloudG);for(let i=0;i<14;i++)addMesh(new THREE.SphereGeometry(rand(1.4,2.4),10,8),MB(0xffffff,{transparent:true,opacity:0.95}),rand(-5,5),21.4+rand(-0.4,0.3),-438+rand(-5,5),cloudG).castShadow=false;
  colBox(-6,6,21,22,-444,-432,false);{const cm=MB(0xffffff,{transparent:true,opacity:0.96});for(let x=-5.2;x<=5.2;x+=1.7)for(let z=-443.2;z<=-432.8;z+=1.7){const r=rand(1.0,1.5);addMesh(new THREE.SphereGeometry(r,10,8),cm,x+rand(-0.4,0.4),22-r+rand(0.15,0.45),z+rand(-0.4,0.4),cloudG).castShadow=false;}}   /* облако: невидимая опора, сверху — пушистые клубы */const endLink=linkItem(0,23.2,-438);const nutCloud=nutItem(4.2,22.6,-441);
  const RAIN=rainbow22(0,8.5,-428,13);RAIN.visible=false;RAIN.scale.setScalar(0.01);
  const fountainCol=new THREE.Mesh(new THREE.CylinderGeometry(1.2,1.6,1,18,1,true),MB(0xe8f8ff,{transparent:true,opacity:0.6,side:THREE.DoubleSide,depthWrite:false}));fountainCol.visible=false;fountainCol.position.set(BH2.x,8.5,BH2.z);W.group.add(fountainCol);
  const B={t:0,popped:[false,false]};const fglint=new THREE.Mesh(new THREE.OctahedronGeometry(0.16),MB(0xffe08a));fglint.visible=false;W.group.add(fglint);   // в фонтане мелькает золото
  function bylina(){const T=HERO;
    play({dur:12.4,fov:48,shots:[shot(0,[2.6,1.9,3.2],[T.potap.pos.x,1.3,T.potap.pos.z]),shot(6,[0,4,10],[0,1,0]),shot(8.2,[1.8,1.8,2.2],[T.potap.pos.x,1.4,T.potap.pos.z])],
      says:[[0.3,2.6,'potap','Как говаривал Илья…'],[3.1,2.4,'potap','Илья… какой Илья?'],[5.8,2.4,null,'<i>Потап молчит — долго, тяжело.</i>',true],[8.3,2.8,'potap','Забыл. Совсем забыл, как сказка эта начинается…'],[11.1,1.4,null,'<i>Никто не смеётся. Грустно всем немножко.</i>',true]],
      events:[{t:0,fn:()=>{T.potap.face=Math.PI*0.2;}},{t:5.8,fn:()=>{T.potap.face=Math.PI;}}],end:()=>{later(0.6,()=>say('zven','Рыба-кит! Тише — спит он. Вода тут одна на всех!',2.8,true));}});}
  W.onWater=(z,st)=>{if(z===Z2&&st==='high'&&!F.hiTold){F.hiTold=true;bark(HERO.pelageya,'pelageya','Погоди, я пройду… Всё, давай, твой черёд!',2.4);}};
  W.updates.push(dt=>{
    // ворота к фонтану: открываются, когда оба сделали своё
    if(!G2.open&&F.mast&&F.garden){G2.open=true;SFX.gate();SFX.ok();g2col.on=false;anim(1.2,k=>{g2.position.y=-3.4*smooth(k);});banner('Ворота открыты!','#ffffff',1.8,'договорились — и прошли вдвоём');}
    if(plateG.done&&!F.garden){F.garden=true;wgate.latched=true;SFX.ok();floatText(new V3(8,1.8,-45.5),'Калитка открыта!','#ffffff');}
    // фонтан дыхания — в лад с китом: два пузыря-отсчёта лопаются перед выдохом, на выдохе бьёт фонтан
    const t=((WB.t-(WB.per-7.5))%WB.per+WB.per)%WB.per,hi=Z3.level>Z3.floor+1.2,wl=Math.max(0,Z3.level);
    bubs.forEach((m,i)=>{const pop=3.5+i;const vis=t<pop;if(vis&&B.popped[i]&&t<1)B.popped[i]=false;m.visible=vis;if(vis)m.scale.setScalar(Math.min(1,t/1.2)*(1+0.06*Math.sin(G.time*6)));
      if(!vis&&!B.popped[i]){B.popped[i]=true;tone(1400-i*300,0.12,'sine',0.25,500);burst(m.position.clone(),0xe8fcff,10,3);}});
    const ex=t>5.5&&t<8.5;col.visible=ex;fglint.visible=ex&&hi;if(ex){const H=hi?6.4:1.2,k=Math.min(1,(t-5.5)/0.3)*(t>8.2?(8.5-t)/0.3:1);col.scale.set(1,Math.max(0.01,H*k),1);col.position.y=wl+H*k/2;fglint.position.set(BH.x+Math.sin(G.time*5)*0.3,wl+H*k*0.75,BH.z);fglint.rotation.y+=0.2;
      if(!B.sfx){B.sfx=true;SFX.whoosh();SFX.splash();}
      for(const h of HEROES){if(h.cling||(h.launchT&&G.time-h.launchT<1.2))continue;if(hd(h.pos,BH)<1.5&&h.pos.y<wl+0.6&&h.grounded){h.launchT=G.time;h.vel.y=Math.sqrt(2*GRAV*(hi?6.2:1.1));h.vel.z=hi?-(-62.4-1.4-h.pos.z)/-1.05:0;h.vel.x=-h.pos.x*0.9;h.grounded=false;h.groundRef=null;h.tossT=1.4;h.aimT=hi?1.1:0;h.following=false;
        floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),hi?'До облаков!':'Плюх…',hi?'#ffffff':'#cfe8ff');if(!hi&&!F.lowTold){F.lowTold=true;tip(h.player,'В отлив фонтан еле плещет. Прилив сыграйте, как кит выдыхает!',3);}}}}
    else B.sfx=false;
    flag.rotation.y=Math.sin(G.time*2)*0.3;});
  W.hittables.push({pos:new V3(-6.5,3.3,-36),r:1.0,push:false,alive:()=>!F.mast,onHit:h=>{if(h.pos.y<2.9)return;F.mast=true;SFX.latch();SFX.ok();anim(0.8,k=>{rope.scale.y=1-0.5*k;flag.position.y=5.3-2*k;});
    banner('Сходни опущены!','#ffffff',1.6,'верёвку дёрнули — ворота наполовину открыты');}});
  /* ---------- щука, печка, икота ---------- */
  function pikeScene(b,h){F.pikeFree=true;const P=HERO.potap;
    play({dur:12.6,fov:48,shots:[shot(0,[b.x+2.6,6.6,b.z+3.2],[b.x,5.2,b.z]),shot(3.6,[3.4,6.4,-82.6],[0,3.6,-90]),shot(8.4,[-3.6,6.4,-80.8],[-7.8,5.6,-85])],
      says:[[0.3,3,null,'<i>Потап ведро поднимает — а в нём щука, зубастая, с венчиком.</i>',true],[3.6,4.4,'shchuka','Отпусти меня в пруд! Слово тебе дам: скажешь «По щучьему велению, по моему хотению» — всё сделается.'],
        [8.3,3.8,'potap','По щучьему велению, по моему хотению — ступай, печка, сама к голове кита!']],
      events:[{t:0.5,fn:()=>{anim(1.2,k=>{b.g.position.y=4.5+Math.sin(k*Math.PI)*0.8;b.g.rotation.z=k*1.1*(b.x<0?-1:1);});}},
        {t:1.6,fn:()=>{pikeFish.g.visible=true;const a=new V3(b.x,5.6,b.z),to=new V3(0,PZ.level,-90);anim(1.3,k=>{pikeFish.g.position.lerpVectors(a,to,k);pikeFish.g.position.y+=Math.sin(k*Math.PI)*2.2;pikeFish.g.rotation.x=k*3;});
          later(1.3,()=>{SFX.splash();for(let i=0;i<10;i++)burst(new V3(rand(-1,1),PZ.level+0.3,-90+rand(-1,1)),0xcff8ff,3,3);pikeFish.g.rotation.x=0;});}},
        {t:3.4,fn:()=>{anim(0.8,k=>{pikeFish.g.position.y=PZ.level+0.3+k*0.5;});}},
        {t:9.4,fn:()=>{SFX.ok();STV.state='out';}}],
      tick:(t)=>{if(t>3.4){pikeFish.g.rotation.z=Math.sin(t*3)*0.12;pikeFish.tail.rotation.y=Math.sin(t*9)*0.4;}},
      end:()=>{STV.state=STV.state==='home'?'out':STV.state;anim(1.2,k=>{pikeFish.g.position.y=PZ.level+0.8-k*1.6;});later(1.3,()=>{pikeFish.g.visible=false;});
        banner('По щучьему велению!','#9fe6ff',2.6,'печка сама едет к хребту — садитесь на неё оба');}});}
  W.updates.push(dt=>{
    for(const lp of LILY)lp.position.y=Math.max(2.45,PZ.level+0.02);
    // ведро со щукой светится под Совиным взором
    for(const b of BUCK){b.glow.material.opacity=b.pike&&W.owlT>0&&!F.pikeFree?0.6+0.35*Math.sin(G.time*8):0;if(b.pike&&W.owlT>0&&!F.pikeFree&&Math.random()<dt*8)burst(new V3(b.x,5.6,b.z),0xffe08a,2,1.2,0.5);}
    // печка
    if(STV.state==='out'){const to=pathAt(0);const dx=to[0]-STV.x,dz=to[1]-STV.z,d=Math.hypot(dx,dz);if(d<0.05){STV.state='wait';}else{const st=Math.min(d,3.4*dt);stovePlace(STV.x+dx/d*st,STV.z+dz/d*st,Math.atan2(dx,dz));}}
    const ctl=[0,1].filter(pi=>!G.solo||pi===G.soloPi).map(pi=>active(pi));const aboard=h=>h.groundRef===STV.col;
    if(STV.state==='wait'&&ctl.every(aboard)){STV.state='ride';SFX.ok();banner('Печка, поезжай!','#ffd9a0',1.8,'раки на дороге — гоните их; волна — щит '+K(0,'guard')+' / '+K(1,'guard')+' или прыжок');
      STV.crabs=[crab(-1.6,-111,null,{y:4.5,leash:2.4}),crab(1.4,-127,null,{y:4.5,leash:2.4})];for(const e of STV.crabs)e.stove=true;}
    if(STV.state==='ride'){const p0=pathAt(STV.s);const block=STV.crabs.find(e=>e.alive&&Math.hypot(e.pos.x-p0[0],e.pos.z-p0[1])<3.6&&e.pos.z<p0[1]+0.5);
      if(block){if(STV.stopT<=0)floatText(new V3(p0[0],7.4,p0[1]),'Рак дорогу загородил!','#ffb0a0');STV.stopT=1;}else STV.stopT=Math.max(0,STV.stopT-dt);
      if(!block)STV.s=Math.min(PL,STV.s+2.3*dt);const p=pathAt(STV.s);stovePlace(p[0],p[1],p[2]);
      // волна дыхания кита: знак за 1,2 с, потом гребень поперёк печки
      STV.waveT-=dt;if(STV.waveT<=0&&!STV.wave&&STV.s<PL-3){STV.waveT=5.2;const sd=Math.random()<0.5?-1:1;const m=new THREE.Mesh(new THREE.BoxGeometry(0.8,0.9,3.8),MB(0xe8fbff,{transparent:true,opacity:0}));m.renderOrder=6;W.group.add(m);
        STV.wave={sd,t:-1.2,m};SFX.wave();floatText(new V3(p[0]+sd*2.6,7.6,p[1]),'Волна! Держись!','#cff8ff');}
      if(STV.wave){const w=STV.wave;w.t+=dt;const x=p[0]+w.sd*(4.2-w.t*7.5);w.m.position.set(x,5.95,p[1]);w.m.material.opacity=w.t<0?0.25+0.2*Math.sin(G.time*16):0.75;
        if(w.t>=0)for(const h of HEROES){if(!aboard(h)||h.cling||h.guard)continue;if(Math.abs(h.pos.x-x)<0.65&&h.pos.y<5.5+0.85){h.vel.z=6.5;h.vel.y=5;h.vel.x=0;h.grounded=false;h.groundRef=null;SFX.splash();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Смыло! Догоняй!','#cff8ff');}}
        if(w.t>1.2){W.group.remove(w.m);STV.wave=null;}}
      STV.smoke-=dt;if(STV.smoke<=0){STV.smoke=0.25;burst(stove.chim.getWorldPosition(new V3()),0xd8d8d8,2,1.2,0.9);}
      if(STV.s>=PL&&!STV.crabs.some(e=>e.alive)){STV.state='done';F.stove='done';SFX.ok();banner('Приехали!','#ffd9a0',1.8,'дальше — бока кита: частокол в рёбрах');if(STV.wave){W.group.remove(STV.wave.m);STV.wave=null;}}}
    stove.face.rotation.z=STV.state==='ride'?Math.sin(G.time*6)*0.05:0;});
  W.onOwl=h=>{if(hd(h.pos,{x:0,z:-330})<26&&!GR.done)for(const m of MUSH)if(!m.got)m.seen=6;if(!F.pikeFree&&hd(h.pos,{x:0,z:-89})<14)later(0.3,()=>floatText(new V3(BUCK[PIKE_AT].x,6.4,BUCK[PIKE_AT].z),'Тут щука!','#e7c3ff'));};
  /* ---------- ролики нового пути ---------- */
  function kitIntro(){const T=HERO;
    play({dur:12.6,fov:50,shots:[shot(0,[34,26,-60],[0,2,-120],[-30,30,-210],[0,2,-280],7),shot(7,[6,9,52],[0,2,30])],
      says:[[0.3,6.4,null,'<i>Поперёк моря лежит Чудо-юдо Рыба-кит: все бока его изрыты, частоколы в рёбра вбиты,</i><br><i>на хвосте сыр-бор шумит, на спине село стоит, мужички на губе пашут, между глаз мальчишки пляшут…</i>',true],
        [7,4.6,null,'<i>…а в дубраве, меж усов, ищут девушки грибов. Десять лет лежит кит — и дышит тяжко.</i>',true]],
      events:[{t:2.5,fn:()=>{WB.t=WB.per-4.5;}}],end:()=>{later(0.4,bylina);}});}
  function eyeScene(){F.eyeSeen=true;const T=HERO;const e=flankEye;
    play({dur:17.4,fov:46,shots:[shot(0,[4,7.6,-190],[10,4.4,-196]),shot(4.2,[8.4,4.6,-193],[12.6,3.6,-196]),shot(8.8,[2,6.4,-186],[T.yosha.pos.x,5.4,T.yosha.pos.z]),shot(11.7,[8.8,4.8,-192.4],[12.6,3.6,-196])],
      says:[[0.3,3.6,null,'<i>Кит вздыхает легко, впервые за десять лет. И у самого бока открывается глаз — огромный, как пруд.</i>',true],[4.3,3.8,'kit','Ох… легче стало… Кто тут такие добрые?'],
        [8.8,2.8,'yosha','Мы — Лесной патруль! Привет, Кит!'],[11.7,5.5,'kit','Десять лет частокол в боку… Спасибо, малые. Ступайте по мне — я тихонько дышать буду.']],
      events:[{t:0.4,fn:()=>{tone(120,2.4,'sine',0.2,70);}},{t:1.4,fn:()=>{anim(2.6,k=>{e.set(smooth(k)*0.85);});}},{t:6.4,fn:()=>{anim(0.5,k=>{e.set(0.85*(1-Math.sin(k*Math.PI)));});}},{t:13.6,fn:()=>{e.cry();}}],
      end:()=>{e.set(0.85);banner('Кит проснулся!','#9fe6ff',2.2,'дышит тише — рёбра ходят спокойнее · дальше — губа, там пашут');}});}
  function hiccup(){SFX.thud();shakeAll(0.06,0.35);tone(140,0.25,'sine',0.25,60);for(const h of HEROES){if(h.grounded&&!h.cling&&h.pos.y>4){h.vel.y=Math.max(h.vel.y,4.6);h.grounded=false;}}
    floatText(new V3(0,10,active(0).pos.z-2),'Ик!','#cfe8ff');}
  function spout(H){col2.visible=true;glint.visible=true;anim(2.4,k=>{const h=Math.sin(k*Math.PI)*H;col2.scale.set(1,Math.max(0.01,h),1);col2.position.y=8.5+h/2;glint.position.set(BH2.x+Math.sin(k*9)*0.2,8.6+h*0.9,BH2.z);glint.rotation.y+=0.3;});
    later(2.5,()=>{col2.visible=false;glint.visible=false;});SFX.whoosh();}
  function diveScene(){FN.dive=true;const T=HERO;
    play({dur:20.8,fov:48,shots:[shot(0,[4,11.2,-392],[0,8.5,-416]),shot(4.6,[1.8,9.6,-409],[0,10.6,-419]),shot(8.2,[2.6,10.4,-406],[T.yosha.pos.x,9.6,T.yosha.pos.z]),shot(13,[0,14,-404],[0,0,-330],[0,18,-410],[0,0,-300],4.6)],
      says:[[0.3,2.4,null,'<i>Кит вздыхает — и вдруг: «Ик!»</i>',true],[2.8,1.6,'potap','Икает, бедный!'],[4.6,3.4,null,'<i>Из дыры в голове — струйка, а в ней что-то золотое блеснуло.</i>',true],
        [8.2,3,'yosha','Он что-то проглотил! Золотое, блестящее!'],[11.2,1.8,'zven','Вот и икает. Запомним!'],[13.2,4.9,'kit','Ох, тяжко мне… Нырну-ка я на дно — там тихо…'],[18.2,2.5,'zven','Кит ныряет! Деревня утонет!']],
      events:[{t:2.2,fn:()=>hiccup()},{t:5,fn:()=>spout(4)},{t:13.2,fn:()=>{SEA.target=-1.4;tone(60,3,'sine',0.25,40);}}],
      end:()=>{banner('Кит ныряет!','#ffb0a0',2.8,'море подымается! Скорей на макушку, к дыхалу — спойте киту колыбельную вдвоём');
        for(const p of[0,1])tip(p,'Колыбельная: две ракушки на макушке — сыграйте '+K(p,'item')+' обе разом, в два голоса.<br>В одиночку: сыграй и смени героя '+K(p,'swap')+' — оставленный допоёт.',4.4);
        gullsH.push(chaika22(-6,-404,6.5,{leash:12}));if(!G.solo)gullsH.push(chaika22(6,-410,8.5,{leash:12}));}});}   // в одиночку одна чайка: играющий один у ракушки
  function finaleScene(){FN.done=true;const T=HERO;const e=headEye;SEA.target=-3.2;
    const spots=[[-1.4,-417.6],[1.4,-417.6],[-1.4,-420.4],[1.4,-420.4]];const land=[[-2,-436],[2,-436],[-2,-440],[2,-440]];
    play({dur:24,fov:46,shots:[shot(0,[0,11.4,-404],[0,8.6,-416]),shot(3.6,[7.2,8.4,-411],[12.8,6.6,-416]),shot(11.2,[2.4,10,-410],[T.yosha.pos.x,9.4,-416]),shot(14.0,[8.6,8.2,-412],[12.8,6.6,-416]),
        shot(15.0,[0,12,-398],[0,12,-420],[0,26,-412],[0,22,-438],4.4),shot(21,[6,25,-430],[0,22.6,-438])],
      says:[[0.3,3.2,null,'<i>Колыбельная льётся — и кит затихает. Море ложится гладко.</i>',true],[3.6,3.6,'kit','Не нырну… Спели вы мне, как мама в детстве пела.'],
        [7.3,3.9,'kit','Болит внутри — проглотил я что-то звонкое, золотое…'],[11.3,2.7,'yosha','Мы поможем, Кит! Честное слово!'],[14.0,2.7,'kit','Тогда держитесь крепче, малые!'],
        [17.4,3.2,null,'<i>И кит дунул — фонтаном до самых облаков, а по брызгам — радуга!</i>',true],[21.2,2.6,'zven','До облаков! Вот это кит!']],
      events:[{t:0,fn:()=>{HEROES.forEach((h,i)=>{placeOnGround(h,spots[i][0],spots[i][1],8.5);h.face=Math.PI;});for(const g of gullsH){if(g.alive){g.alive=false;W.group.remove(g.g);const k=W.enemies.indexOf(g);if(k>=0)W.enemies.splice(k,1);}}
          [60,64,67,72,67,64,60].forEach((m,i)=>later(i*0.4,()=>gusli(m,0,0.12)));}},
        {t:3.8,fn:()=>{anim(2.4,k=>{e.set(smooth(k));});}},{t:8.6,fn:()=>{e.cry();}},{t:9.0,fn:()=>{hiccup();spout(3);}},
        {t:15.2,fn:()=>{tone(80,2,'sine',0.3,160);shakeAll(0.05,0.8);fountainCol.visible=true;anim(1.6,k=>{const H=14*smooth(k);fountainCol.scale.set(1,Math.max(0.01,H),1);fountainCol.position.y=8.5+H/2;});
          RAIN.visible=true;anim(2.2,k=>{RAIN.scale.setScalar(Math.max(0.01,smooth(k)));});}},
        {t:16.2,fn:()=>{SFX.whoosh();HEROES.forEach((h,i)=>{const a=h.pos.clone(),b=new V3(land[i][0],22.2,land[i][1]);h.cineHold=true;anim(3.4+i*0.15,k=>{const kk=smooth(k);h.pos.set(lerp(a.x,b.x,kk),lerp(a.y,b.y,kk)+Math.sin(k*Math.PI)*7,lerp(a.z,b.z,kk));h.vel.set(0,0,0);h.face=k*12;if(k>=1){h.cineHold=false;h.face=Math.PI;}});});
          for(let i=0;i<30;i++)later(i*0.08,()=>burst(new V3(rand(-2,2),rand(9,20),-419+rand(-2,2)),[0xe8fbff,0xffffff,COL.gold][i%3],3,4));}},
        {t:20.0,fn:()=>{anim(1.4,k=>{fountainCol.scale.y=Math.max(0.01,14*(1-k));fountainCol.position.y=8.5+7*(1-k);});later(1.4,()=>{fountainCol.visible=false;});}}],
      tick:(t)=>{for(const h of HEROES)if(h.cineHold)h.vel.set(0,0,0);},
      end:()=>{fountainCol.visible=false;HEROES.forEach((h,i)=>{h.cineHold=false;if(h.pos.y<20)placeOnGround(h,land[i][0],land[i][1],22.2);});for(const pi of[0,1])players[pi].cp.set(0,22.2,-436);
        banner('Подружились с китом!','#ffd76a',2.6,'звено — на облаке; а что кит проглотил — узнаем в «Тридцати кораблях»');}});}
  /* ---------- дыхание кита ---------- */
  function inhale(){tone(55,2.4,'sine',0.16,75);for(let i=0;i<8;i++)later(i*0.25,()=>burst(new V3(rand(-9,9),active(0).pos.y+0.2,active(0).pos.z+rand(-8,8)),0xcfe8ff,1,1.5,0.5));
    if(WB.n===0&&!F.inhTold){F.inhTold=true;for(const p of[0,1])tip(p,'Кит вдыхает — гудит! Сейчас выдохнет: спину тряхнёт, всех подкинет и качнёт вбок.',3.4);}}
  function exhale(){WB.n++;const c=WB.calm;shakeAll(0.05*c,0.7);SFX.whoosh();tone(70,1.2,'sine',0.22*c,40);WB.side=-WB.side;WB.sway=WB.side*1.8*c;
    for(const h of HEROES){if(!h.active||h.cling||!h.grounded||h.groundRef===STV.col)continue;h.vel.y=Math.max(h.vel.y,3.2*c);h.grounded=false;}
    for(const pr of WB.props)anim(0.5,k=>{pr.g.position.y=pr.y+Math.sin(k*Math.PI)*pr.h;});
    const z0=active(0).pos.z;for(let i=0;i<12;i++)burst(new V3(i%2?-10.6:10.6,1+rand(0,3),z0+rand(-24,24)),0xe8fbff,4,4);
    if(WB.n===1)banner('Кит вздохнул!','#cfe8ff',1.8,'тряхнуло всю деревню — а ему хоть бы что');
    for(const f of WB.hooks)f();}
  function breathTick(dt){if(G.cine)return;WB.t+=dt;const p=WB.per,t=WB.t%p,ph=t>p-2?'exhale':t>p-4.5?'inhale':'calm';
    if(ph!==WB.ph){WB.ph=ph;if(ph==='inhale')inhale();else if(ph==='exhale')exhale();}
    WB.k=damp(WB.k,ph==='inhale'?1:0,ph==='inhale'?1.2:3.5,dt);whale.g.position.y=WY+WB.k*0.9;
    WB.sway=damp(WB.sway,0,2.5,dt);if(Math.abs(WB.sway)>0.05)for(const h of HEROES){if(!h.active||h.cling||h.groundRef===STV.col)continue;h.pos.x=clamp(h.pos.x+WB.sway*dt,-9.6,9.6);}
    for(const P of WB.pines)P.top.rotation.z=Math.sin(G.time*1.3+P.g.position.z)*0.03+WB.k*0.12*Math.sin(G.time*3+P.g.position.x);}
  /* ---------- шаг нового пути ---------- */
  W.updates.push(dt=>{breathTick(dt);
    SEA.y=damp(SEA.y,SEA.target,0.35,dt);sea.position.y=SEA.y-WB.k*0.5+(WB.ph==='exhale'?0.5:0)*Math.sin(G.time*3);
    if(!FN.dive)SEA.target=-3.2;
    // рёбра ходят ходуном
    RB.t+=dt;for(const R of RIB){const s=Math.sin(RB.t/RB.per*Math.PI*2+R.i*Math.PI),z=R.z0+RB.A*s,y=0.3*RB.A/1.1*Math.cos(RB.t/RB.per*Math.PI*2+R.i*Math.PI);const dz=z-R.z,dy=y-R.y;R.z=z;R.y=y;
      R.g.position.set(0,y,z);const c=R.col;c.minz=z-1.5;c.maxz=z+1.5;c.miny=3.4+y;c.maxy=4.5+y;
      if(R.pal){const P=R.pal,pc=P.col;pc.minz=z-1.35;pc.maxz=z-0.85;pc.miny=4.5+y;pc.maxy=6.6+y;P.lp.set(2.6,4.5+y,z-0.6);}
      for(const h of HEROES)if(h.groundRef===c&&h.grounded&&!h.cling){h.pos.z+=dz;h.pos.y+=dy;}
        else if(!h.cling&&!h.hang&&h.pos.y<c.maxy-0.05&&h.pos.y>c.miny-1.2&&h.pos.z>c.minz-h.d.radius+0.12&&h.pos.z<c.maxz+h.d.radius-0.12){h.pos.y=c.maxy;h.vel.y=Math.max(0,h.vel.y);h.grounded=true;h.groundRef=c;}}   // ребро наехало на того, кто в складке, — подхватывает наверх
    PALS.forEach((P,i)=>{LIFTS_PAL[i].pos.copy(P.lp);WT_PAL[i].pos.set(0,P.lp.y,P.lp.z);if(P.pulled&&!P.healed){WT_PAL[i].pos.x=clamp(HERO.yosha.pos.x,-8,8);}
      if(P.pulled&&!P.healed&&P.mist.visible)P.mist.children.forEach((m,k)=>{m.position.y=5.2+Math.sin(G.time*2+k)*0.2;});});
    // губа: кит зевает — тянет к пасти; держись у Потапа или у плуга
    if(!G.cine){YW.t-=dt;if(YW.ph==='calm'&&YW.t<=0&&[0,1].some(pi=>{const z=active(pi).pos.z;return z<-210&&z>-264;})){YW.ph='warn';YW.t=1.6;tone(90,1.6,'sawtooth',0.06,140);floatText(new V3(-6,8,active(0).pos.z),'Кит зевает! Держись!','#ffb0a0');
        if(!F.yawnTold){F.yawnTold=true;for(const p of[0,1])tip(p,'Кит зевает — тянет к пасти! Держись рядом с Потапом (он тяжёлый) или у плуга.<br>Утянет — кит выплюнет назад, на край поля.',4);}}
      else if(YW.ph==='warn'&&YW.t<=0){YW.ph='suck';YW.t=3.2;SFX.whoosh();}
      else if(YW.ph==='suck'){if(Math.random()<0.5)burst(new V3(rand(-4,9),5,rand(-262,-214)),0xd8c8a8,1,2,0.4);
        for(const h of HEROES){if(!h.active||h.cling||h.kind==='potap')continue;const z=h.pos.z;if(z>-212||z<-264)continue;const P=HERO.potap;
          const held=(P.active||!P.following)&&hd(P.pos,h.pos)<1.9||plows.some(p=>hd(p,h.pos)<1.9);if(held){if(!h.heldT||G.time-h.heldT>2){h.heldT=G.time;floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'Держусь!','#ffe08a');}continue;}
          h.pos.x-=3.0*dt;if(h.pos.x<-6.9){h.pos.set(rand(-2,6),5.2,-212.5);h.vel.set(0,0,0);SFX.splash();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Ам! … Тьфу! Выплюнул!','#cfe8ff');burst(h.pos.clone(),0xcff8ff,12,3);}}
        if(YW.t<=0){YW.ph='calm';YW.t=rand(7,10);}}
      }
    // между глаз: хоровод и плясовые камни
    const inDance=pi=>{const h=active(pi);return hd(h.pos,DC)<9&&Math.abs(h.pos.z-DC.z)<10&&h.pos.y>4;};
    if(!DC.done&&!G.cine&&[0,1].some(inDance)){if(!DC.on){DC.on=true;say('malec','Эй, айда с нами в пляс! Прыг — на камушек, как загорится!',3.4);for(const p of[0,1])tip(p,'Хоровод! Камушек твоего цвета загорается по кругу — встань на него, пока горит, и прыгай '+K(p,'jump')+'!',4);}
      DC.bt-=dt;if(DC.bt<=0){DC.bt=1.15;DC.beat++;tone(DC.beat%2?440:330,0.12,'triangle',0.1,0);const ctl=[0,1].filter(pi=>!G.solo||pi===G.soloPi);
        for(const S of DC.stones)if(S.lit>=0){const pi=S.lit,h=active(pi);if(hd(h.pos,S)<1.1&&Math.abs(h.pos.y-4.6)<1.6){DC.score[pi]++;burst(new V3(S.x,5.4,S.z),PCOL[pi],8,3);floatText(new V3(S.x,6.4,S.z),'Прыг!','#ffe08a');}S.lit=-1;}
        ctl.forEach((pi,k)=>{const idx=((DC.beat+(pi?4:0))%8+8)%8;DC.stones[idx].lit=pi;});}
      DC.stones.forEach(S=>{S.mat.emissive.setHex(S.lit>=0?PCOL[S.lit]:0xffffff);S.mat.emissiveIntensity=S.lit>=0?0.8+0.3*Math.sin(G.time*12):0;});
      const ctl=[0,1].filter(pi=>!G.solo||pi===G.soloPi),tot=ctl.reduce((a,pi)=>a+DC.score[pi],0),need=DC.need*ctl.length;eyesE.forEach(e=>e.set(Math.min(0.8,tot/need)));
      if(tot>=need){DC.done=true;F.dance=true;DC.stones.forEach(S=>{S.lit=-1;S.mat.emissiveIntensity=0;});SFX.ok();foreCol.on=false;anim(1.2,k=>{fore.position.y=-2.2*k;});
        say('malec','Ух, наплясались! Глядите — кит глаза открыл! Дальше — в дубраву!',3.2);banner('Наплясались!','#ffd76a',2,'кит подмигнул — путь в дубраву открыт');eyesE.forEach(e=>{anim(0.6,k=>{e.set(0.8*(1-Math.sin(k*Math.PI)));});});}}
    DC.boys.forEach((b,i)=>{const a=G.time*(DC.on&&!DC.done?1.4:0.5)+i/6*Math.PI*2;b.g.position.set(Math.sin(a)*2,4.5+Math.abs(Math.sin(G.time*6+i))*0.25,DC.z+Math.cos(a)*2);b.g.rotation.y=a+Math.PI/2;b.arms.forEach((ar,k)=>{ar.rotation.z=(k?-1:1)*(1.3+Math.sin(G.time*6+i)*0.3);});});
    // дубрава: грибы под Совиным взором; мухоморы — прилипалы
    for(const m of MUSH){if(m.got)continue;const near=HEROES.some(h=>h.active&&hd(h.pos,m)<1.6&&Math.abs(h.pos.y-4.5)<1.5);if(W.owlT>0)m.seen=6;m.seen=Math.max(0,m.seen-dt);m.g.visible=m.seen>0||near;
      m.glow.material.opacity=m.seen>0?0.5+0.4*Math.sin(G.time*8):0;
      if(m.g.visible)for(const h of HEROES){if(!h.active||h.cling||hd(h.pos,m)>0.75||Math.abs(h.pos.y-4.5)>1.4)continue;m.got=true;m.g.visible=false;
        if(m.real){GR.got++;SFX.coin?SFX.coin():SFX.ok();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Боровик! '+GR.got+' из '+GR.need,'#ffe08a');}
        else{const e=prilip22(m.x,m.z,4.5,{leash:8});e.state='idle';e.pos.y=4.5;e.latchTo(h);floatText(h.pos.clone().add(new V3(0,h.d.height+1.0,0)),'Мухомор! Да это прилипала!','#ff9a9a');}
        break;}}
    if(!GR.done&&GR.got>=GR.need){GR.done=true;F.grove=true;say('devica','Ой, сколько грибочков! Спасибо! Кит, пусти их — усы подними!',3.4);SFX.gate();anim(2,k=>{curtain.position.y=7*smooth(k);});curtCol.on=false;banner('Грибы собраны!','#ffd76a',2,'кит поднял усы — путь к голове открыт');}
    if(!F.groveTold&&[0,1].some(pi=>active(pi).pos.z<-306&&active(pi).pos.z>-312)){F.groveTold=true;say('devica','Грибы прячутся — не видать! Совиным бы глазом поискать…',3.2);
      for(const p of[0,1])tip(p,'Грибы видны Совиным взором Пелагеи '+K(1,'skill')+' — светятся. Собери пять боровиков.<br>Красный с белыми точками — мухомор… да это прилипала!',4.4);}
    girls.forEach((g,i)=>{g.body.rotation.x=Math.sin(G.time*1.4+i)*0.25+0.2;});
    // голова: кит ныряет — море подымается; колыбельная в два голоса
    if(!FN.dive&&F.grove&&!G.cine&&[0,1].some(pi=>active(pi).pos.z<-362))diveScene();
    for(const q of LUL)q.hum=Math.max(0,q.hum-dt);
    if(FN.dive&&!FN.done&&!G.cine){const both=LUL[0].hum>0&&LUL[1].hum>0;
      if(both){FN.lull+=dt;SEA.target=Math.max(-3.2,SEA.target-dt*0.5);if(Math.random()<dt*3)burst(new V3(rand(-4,4),10,-414),[0xffe08a,0x9fe6ff,0xffb0d0][Math.floor(rand(0,3))],2,1.5,0.6);}
      else{SEA.target=Math.min(7.0,SEA.target+dt*0.18);if(LUL[0].hum>0||LUL[1].hum>0){F.lonT=(F.lonT||0)-dt;if(F.lonT<=0){F.lonT=4;floatText(new V3(0,11,-414),'В два голоса! Одному кит не верит…','#9fe6ff');}}}
      headEye.set(Math.min(0.5,FN.lull/12*0.5));
      if(FN.lull>=12)finaleScene();
      for(const h of HEROES){if(!h.active||h.cling)continue;if(h.pos.y<SEA.y-0.15&&h.pos.z<-140){placeOnGround(h,rand(-6,6),-415,8.5);h.vel.set(0,0,0);SFX.splash();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Кит выплеснул на макушку!','#cfe8ff');}}}
    if(!F.out&&FN.done&&!G.cine&&[0,1].every(pi=>active(pi).pos.y>20)&&(endLink.taken||F.cloudT>4)){F.out=true;finishLevel();}
    if(FN.done&&!G.cine)F.cloudT=(F.cloudT||0)+dt;
    whale.tail.rotation.x=Math.sin(G.time*0.5)*0.05+WB.k*0.08;});
  /* ---------- рисунки кнопок: просьба над раковиной видна обоим ---------- */
  const T=HERO,shellAt=z=>()=>z.shell.g.position.clone().add(new V3(0,2.6,0));
  const reqNote=z=>()=>{const r=z.req;if(!r)return '';return '<b style="color:'+PCSS[r.pi]+'">'+active(r.pi).d.name+'</b> просит '+(r.want==='high'?'прилив':'отлив')+(r.busy?' · ждём, пока все приземлятся':'')+'<span class="rq"><i style="width:'+Math.round(Math.min(1,r.t/2)*100)+'%"></i></span>';};
  for(const z of[Z1,Z2,Z3,PZ])for(const v of[0,1])prompt(v,'label',shellAt(z),()=>!!z.req,reqNote(z));
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>inZone(Z1,h(),0.3)&&Z1.state==='low'&&!Z1.req&&h().pos.z<-15,'прилив — через забор');
    prompt(pi,'item',()=>headOf(h()),()=>inZone(Z3,h(),0.3)&&Z3.state==='low'&&!Z3.req&&h().pos.y<1,'прилив, когда выдох');
    prompt(pi,'roll',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig==='red'&&e.help));
    prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig!=='red'&&e.help));
    prompt(pi,'attack',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&hd(e.pos,h().pos)<5&&(e.state==='broken'||e.open>0)));}
  prompt(0,'item',()=>headOf(active(0)),()=>!F.mast&&inZone(Z2,active(0),0.3)&&Z2.state==='low'&&!Z2.req&&active(0).pos.x<0,'прилив — к мачте');
  prompt(0,'attack',()=>headOf(active(0)),()=>!F.mast&&active(0).pos.y>2.9&&hd(active(0).pos,{x:-6.5,z:-36})<1.6,'дёрни верёвку');
  prompt(0,'skill',()=>headOf(T.potap),()=>!F.jug&&T.potap.active&&hd(T.potap.pos,{x:-3.2,z:-43})<2.3&&Z2.level<0.3,'поднять кувшин');
  prompt(0,'swap',()=>headOf(T.potap),()=>!F.jug&&T.proshka.active&&hd(T.proshka.pos,{x:-3.2,z:-43})<3&&Z2.level<0.3,'Потап поднимет');
  prompt(1,'item',()=>headOf(active(1)),()=>!F.garden&&inZone(Z2,active(1),0.3)&&Z2.state==='high'&&!Z2.req&&active(1).pos.x>0&&active(1).pos.z>-37,'отлив — к лазу');
  prompt(1,'swap',()=>headOf(T.yosha),()=>!F.garden&&T.pelageya.active&&T.pelageya.pos.z<-33&&T.pelageya.pos.z>-37.5&&T.pelageya.pos.x>0,'Йоша пролезет');
  prompt(1,'skill',()=>headOf(T.pelageya),()=>!F.pikeFree&&T.pelageya.active&&hd(T.pelageya.pos,{x:0,z:-89.6})<10&&T.pelageya.pos.y>4,'где щука?');
  prompt(0,'skill',()=>headOf(T.potap),()=>!F.pikeFree&&T.potap.active&&BUCK.some(b=>!b.tipped&&hd(b,T.potap.pos)<2.3),'поднять ведро');
  prompt(0,'swap',()=>headOf(T.potap),()=>!F.pikeFree&&T.proshka.active&&BUCK.some(b=>!b.tipped&&hd(b,T.proshka.pos)<3),'Потап поднимет');
  for(const pi of[0,1]){const h=()=>active(pi);prompt(pi,'item',()=>headOf(h()),()=>inZone(PZ,h(),1.2)&&PZ.state==='low'&&!PZ.req&&!F.pikeFree&&h().pos.y>4,'прилив — пруд наполнить');
    prompt(pi,'jump',()=>headOf(h()),()=>STV.state==='wait'&&h().groundRef!==STV.col&&hd(h().pos,STV)<4,'на печку!');
    prompt(pi,'guard',()=>headOf(h()),()=>!!STV.wave&&STV.wave.t<0&&h().groundRef===STV.col,'держись!');}
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>FN.dive&&!FN.done&&lulShells.some(s=>hd(s,h().pos)<2.2&&Math.abs(h().pos.y-8.5)<1.5),'колыбельная');
    prompt(pi,'attack',()=>headOf(h()),()=>HEROES.some(q=>q!==h()&&q.prilip&&hd(q.pos,h().pos)<2.6),'отлепи прилипалу!');
    prompt(pi,'roll',()=>headOf(h()),()=>!!h().prilip,'стряхни — два кувырка');}
  prompt(0,'skill',()=>headOf(T.potap),()=>!F.log&&T.potap.active&&hd(T.potap.pos,{x:5.4,z:32.6})<2.6,'повалить сосну');
  prompt(0,'swap',()=>headOf(T.potap),()=>!F.log&&!T.potap.active&&active(0).pos.z>26&&active(0).pos.z<36,'Потап повалит');
  prompt(0,'skill',()=>headOf(T.potap),()=>T.potap.active&&PALS.some(P=>!P.pulled&&hd(P.lp,T.potap.pos)<2.4),'выдернуть кол');
  prompt(1,'skill',()=>headOf(T.yosha),()=>T.yosha.active&&PALS.some(P=>P.pulled&&!P.healed&&Math.abs(P.lp.z-T.yosha.pos.z)<3.2),'живая вода — рана');
  prompt(0,'skill',()=>headOf(T.proshka),()=>T.proshka.active&&!BARN[2].gone&&hd(T.proshka.pos,BARN[2])<14&&T.proshka.pos.z<-238,'рогатка — жёлудь на губе');
  prompt(1,'skill',()=>headOf(T.pelageya),()=>T.pelageya.active&&!GR.done&&T.pelageya.pos.z<-304&&T.pelageya.pos.z>-356,'где грибы?');
  /* ---------- задачи ---------- */
  const g1=pi=>O(()=>'Вода тут одна на двоих! У ракушки посерёдке сыграй '+K(pi,'item')+' — над ней просьба твоя встанет.<br>Через две секунды вода у обоих сменится. Прилив — и через забор плыви, пока не отстанет.',
      ()=>active(pi).pos.z<-23.4,()=>[Z1.shell.g]);
  const tail=pi=>[O('Чудо-юдо Рыба-кит! На хвосте у него сыр-бор шумит — а кит дышит:<br>на вдохе гудит, на выдохе всю спину трясёт.',()=>active(pi).pos.z<38,()=>[]),
    O(()=>'Трещина в хвостовом плавнике! Потап повалит сосну '+K(0,'skill')+' — будет мостик.',()=>F.log&&active(pi).pos.z<25,()=>F.log?[]:[fellP.g])];
  const fountain=pi=>O(()=>'Фонтан кита! Лопнут два пузыря — кит выдохнет.<br>Встаньте на дыру в спине, прилив '+K(pi,'item')+' — до облаков подкинет, как вздохнет.',()=>active(pi).pos.y>6.5||active(pi).pos.z<-72,()=>[bhr,bubs[0]]);
  const village=pi=>O(()=>pi?'Деревня на горбу кита. У пруда три ведра, в одном — щука. Совиным взором '+K(1,'skill')+' посмотри, в каком: светится!<br>Потап поднимет ведро — да пруд сперва наполните: прилив '+K(1,'item')+'.':
      'Деревня на горбу кита. У пруда три ведра, в одном — щука; Пелагея Совиным взором покажет, в каком.<br>Потап поднимет ведро '+K(0,'skill')+' — да пруд сперва наполните: прилив '+K(0,'item')+'.',
    ()=>!!F.pikeFree,()=>F.pikeFree?[]:BUCK.filter(b=>!b.tipped).map(b=>b.g).concat(PZ.state==='low'?[PZ.shell.g]:[]));
  const stoveO=pi=>O(()=>'По щучьему велению — печка сама едет по хребту! Садитесь на печку оба '+K(pi,'jump')+'.<br>Раки на дороге — гоните их '+K(pi,'attack')+'; волна — щит '+K(pi,'guard')+' или прыжок. Смыло — догоняй!',()=>F.stove==='done',()=>[stove.g]);
  const late=pi=>[
    O(()=>'Бока кита: рёбра ходят ходуном — прыгай с ребра на ребро, когда сойдутся.<br>Частоколы в рёбра вбиты: Потап выдернет кол '+K(0,'skill')+', а Йоша полечит рану живой водой '+K(1,'skill')+'.',
      ()=>active(pi).pos.z<-185,()=>PALS.filter(P=>!P.healed).map(P=>P.pulled?P.mist:P.stake)),
    O(()=>'Губа кита — мужички пашут, да плуги увязли в морских желудях: собьёте '+K(pi,'attack')+' — пойдёт соха.<br>Один жёлудь — высоко на губе: рогатка Прошки. Кит зевает — держись у Потапа или у плуга!',
      ()=>!!F.plough&&active(pi).pos.z<-262,()=>BARN.filter(b=>!b.gone).map(b=>b.g)),
    O(()=>'Между глаз мальчишки пляшут! Камушек твоего цвета загорается по кругу — успей на него встать.<br>Наплясаться надо вволю — тогда кит глаза откроет.',()=>!!F.dance,()=>DC.stones.map(S=>S.g)),
    O(()=>'Дубрава меж усов: девушки грибы ищут — да не видать. Совиный взор Пелагеи '+K(1,'skill')+' покажет.<br>Собери пять боровиков. Мухомор не трогай — это прилипала!',()=>!!F.grove,()=>MUSH.filter(m=>!m.got&&m.real&&m.seen>0).map(m=>m.g).concat(girls[0].g)),
    O(()=>'Кит ныряет — море подымается! Скорей на макушку: две ракушки у дыхала.<br>Играйте '+K(pi,'item')+' обе разом — колыбельная в два голоса успокоит кита.',()=>FN.done,()=>lulShells.map(s=>s.g)),
    O('Звено — на облаке! Бери — и в путь.',()=>false,()=>[endLink.g])];
  W.objectives[0]=tail(0).concat([g1(0),
    O(()=>'Мачта из воды торчит. В прилив до гнезда доплыви, верёвку дёрни '+K(0,'attack')+'.<br>А другу нужен отлив — договоритесь, кто первый, мой друг.',()=>F.mast,()=>[flag],()=>({kind:active(0).kind,action:'walk',from:new V3(-4,3.0,-33),to:new V3(-6.2,3.3,-35.6)})),
    O(()=>'Пока у друга отлив — на дне кувшин, Потап его поднимет '+K(0,'skill')+'. В грядках — раки, берегись!<br>Ворота откроются, как оба своё сделают, — не торопись.',()=>G2.open,()=>[jug,g2]),
    fountain(0),village(0),stoveO(0)],late(0));
  W.objectives[1]=tail(1).concat([g1(1),
    O(()=>'Огород за стеной. Отлив '+K(1,'item')+' сделай — Йоша в лаз у земли пролезет.<br>За стеной — плита-калитка, она путь отрежет да и отверзет.',()=>F.garden,()=>[plateG.g],()=>({kind:'yosha',action:'walk',from:new V3(5.5,0,-35),to:new V3(5.5,0,-40)})),
    O(()=>'Сделай прилив — вода орешек из бочки подымет. Забери.<br>Ворота откроются, как оба своё сделают, — смотри.',()=>G2.open,()=>[barrel,g2]),
    fountain(1),village(1),stoveO(1)],late(1));
  W.tipZones.push({cond:(pi,h)=>h.grounded&&h.groundRef&&h.groundRef.water,text:pi=>'Ты плывёшь. Вода общая — сменить её можно лишь вместе.<br>Попроси друга: сыграй '+K(pi,'item')+' — и будет честь по чести.'},
    {cond:(pi,h)=>h.pos.y>6&&h.pos.z>-74&&h.pos.z<-50,text:pi=>'Облака! С облака на облако прыгай — и к киту на горб!'},
    {cond:(pi,h)=>STV.state==='wait'&&h.groundRef!==STV.col&&hd(h.pos,STV)<6,text:pi=>'Печка ждёт! Запрыгни на неё '+K(pi,'jump')+' — поедем, как только оба сядете.'},
    {cond:(pi,h)=>STV.state==='ride'&&h.groundRef!==STV.col&&h.pos.z<-100&&h.pos.z>-140,text:pi=>'Смыло с печки? Догоняй и запрыгивай '+K(pi,'jump')+'! А раки на дороге — бей '+K(pi,'attack')+'.'},
    {cond:(pi,h)=>h.pos.z<-146&&h.pos.z>-186&&h.pos.y<4.2,text:pi=>'Свалился в складку кожи меж рёбер — не беда: выпрыгни '+K(pi,'jump')+' на ребро, когда подойдёт.'},
    {cond:(pi,h)=>!!h.prilip,text:pi=>'Прилипала на спине! Пусть друг собьёт её ударом — или два кувырка '+K(pi,'roll')+' подряд.'});
  W.spawns=[[new V3(-3,0,41),new V3(-5,0,42)],[new V3(3,0,41),new V3(5,0,42)]];W.startAct=[0,0];
  W.pauseLine='Рыба-кит дышит: вдох гудит, выдох трясёт спину. Вода одна на двоих — раковина посерёдке общая.<br>Хвост — сыр-бор; фонтан на выдохе до облаков; щука в ведре и печка Емели; частокол в боку — Потап тянет, Йоша лечит;<br>губа — кит зевает, держись у Потапа; между глаз — хоровод; в дубраве — грибы Совиным взором; на макушке — колыбельная вдвоём.';
  W.onStart=()=>{later(0.6,kitIntro);};
  // для ботов: перенос к участку и состояние
  W.dbg22=()=>({F,PZ,BUCK,PIKE_AT,STV,PL,stove,Z3,endLink,pathAt,WB,SEA,RIB,RB,PALS,BARN,plows,YW,DC,MUSH,GR,LUL,lulShells,FN,headEye,flankEye,fellP});
  W.warp22=(where)=>{const order=['tail','yard','village','ride','ribs','lip','eyes','grove','head','crown'],after=w=>order.indexOf(where)>order.indexOf(w);
    if(after('tail')){F.log=true;logCol.on=true;fellP.cyl.on=false;fellP.g.position.set(0,0.15,30.4);fellP.g.rotation.x=-Math.PI/2;}
    if(after('yard')){F.mast=true;F.garden=true;G2.open=true;g2col.on=false;}
    const P={tail:[0,0,40],yard:[0,0,10],village:[0,4.5,-75],ride:[0,4.5,-97],ribs:[0,4.5,-142],lip:[0,4.5,-208],eyes:[0,4.5,-268],grove:[0,4.5,-306],head:[0,4.5,-358],crown:[0,8.5,-413]}[where];
    if(after('village')){F.pikeFree=true;BUCK.forEach(b=>{b.tipped=true;});STV.state='wait';const p=pathAt(0);stovePlace(p[0],p[1],p[2]);}
    if(after('ride')){STV.state='done';F.stove='done';STV.s=PL;const p=pathAt(PL);stovePlace(p[0],p[1],p[2]);STV.crabs=[];}
    if(after('ribs')){PALS.forEach(Pq=>{Pq.pulled=true;Pq.healed=true;Pq.col.on=false;Pq.g.visible=false;Pq.stake.visible=false;Pq.mist.visible=false;});RB.healed=3;RB.A=1.1*0.34;WB.calm=0.55;F.eyeSeen=true;flankEye.set(0.85);}
    if(after('lip')){BARN.forEach(b=>{b.gone=true;b.g.visible=false;if(b.mk)b.mk.visible=false;});F.plough=true;fenceCol.on=false;fence.position.y=-2.2;}
    if(after('eyes')){DC.done=true;F.dance=true;foreCol.on=false;fore.position.y=-2.2;}
    if(after('grove')){GR.done=true;F.grove=true;GR.got=5;curtCol.on=false;curtain.position.y=7;}
    if(where==='crown'){FN.dive=true;}
    HEROES.forEach((h,i)=>{placeOnGround(h,P[0]+(i%2?1.2:-1.2)*(i>1?2:1),P[2]+(i>1?0.8:0),P[1]);h.following=false;});for(const pi of[0,1])players[pi].cp.set(P[0],P[1],P[2]);snapCams();return W.dbg22();};
  flushDecor();};
