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
// ---- дальше — late_99f_k22_p2_stove.js и следующие части (сборка склеивает их по имени файла) ----
