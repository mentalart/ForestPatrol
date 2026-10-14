/* ============================== РЕЛИЗ final06 · «ПРИСКАЗКА» — ВСТУПИТЕЛЬНЫЙ РОЛИК ИГРЫ (1): ПЛОЩАДКИ ============================== */
// Сценарий — zlataya_cep/docs/42_priskazka_intro.md. Ролик играет при «Новой игре» перед прологом (сцены и порядок — late_96g_intro_scenes.js).
// Площадки строятся в уровне пролога, далеко от комнаты штаба (по 600 м друг от друга, туман их разделяет), и убираются после ролика:
//  · L — Лукоморье: остров у моря, дуб, златая цепь спиралью (звенья-медальоны с гравюрами миров), Кот, кузня Кузьмы с деревянным
//    молоточком на стене, слушатели (Колобок, белка, Садко, Жар-птица, русалка, Леший, Яга в ступе), костёр, книга у корней,
//    дальний утёс с Кощеем и вороном, луна и звёзды, лиловая туча, костлявая рука в перстне, искры разлетевшейся цепи;
//  · P — сосна-штаб Лесного патруля снаружи: настил, ветка-мастерская Прошки, огород Йоши, гнездо Пелагеи на макушке, окно, дверь,
//    флажок, гирлянда; лес внизу; ночью — звёздный дождь и искра, летящая к сосне;
//  · W1…W5 — пять миров на 2 секунды каждый, в каждом — босс в своём логове: лес (ели смыкаются, встаёт Леший-великан, огоньки, избушка),
//    Китеж (Водяной верхом на соме над куполами, колокол без звона), небесный сад (яблони сереют; Соловей-Разбойник свистит с гнезда на
//    семи дубах), Смородина (три головы Горыныча — лбами и огнём), Буян (сундук на цепях, Лихо Одноглазое открывает глаз).
// Свет и небо меняются по шотам (PRK.look) без пересборки уровня: фон, туман, свет, горизонт, цветокор — как у setTheme.
const PRK={on:false,root:null,boxes:[],hid:[],ups:[],L:null,P:null,Wd:[],look0:null,heroes0:null,skipped:false,i:-1,lastSay:null};FIN.intro=PRK;
const PRV=(x,y,z)=>new V3(x,y,z);
const PRO={L:PRV(600,0,0),P:PRV(600,0,600),W1:PRV(-600,0,0),W2:PRV(-600,0,600),W3:PRV(-600,0,-600),W4:PRV(0,0,600),W5:PRV(600,0,-600)};
// точка площадки → массив для KS
const prA=(o,x,y,z)=>[o.x+x,o.y+y,o.z+z],prkP=(o,x,y,z)=>PRV(o.x+x,o.y+y,o.z+z);
function prkNoBatch(o){o.traverse(c=>{c.userData.batchNo=true;c.userData.noBatchL=true;});return o;}
function prkM(col,o){return new THREE.MeshLambertMaterial(Object.assign({color:col},o||{}));}
const PRK_DARK=prkM(0x18141c);
function prkAdd(par,geo,mat,x,y,z){const m=new THREE.Mesh(geo,mat);m.position.set(x||0,y||0,z||0);m.castShadow=true;m.receiveShadow=true;par.add(m);return m;}
function prkGroup(par,x,y,z){const g=new THREE.Group();g.position.set(x||0,y||0,z||0);(par||PRK.root).add(g);return g;}
// персонаж из общих конструкторов (они кладут в W.group) — переносим в свою площадку
function prkCast(fn,par,x,y,z,s,ry){const o=fn();o.g.userData.prkCast=true;par.add(o.g);o.g.position.set(x,y,z);if(s)o.g.scale.setScalar(s);o.g.rotation.y=ry||0;return o;}
function prkTex(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.anisotropy=4;return t;}
function prkCol(x,minx,maxx,miny,maxy,minz,maxz){const c={minx:x.x+minx,maxx:x.x+maxx,miny:x.y+miny,maxy:x.y+maxy,minz:x.z+minz,maxz:x.z+maxz,on:true,occ:false};W.boxes.push(c);PRK.boxes.push(c);return c;}
const prkE={io:k=>k<0.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2,o:k=>1-Math.pow(1-k,3),i:k=>k*k*k,back:k=>{const c=1.70158;return 1+(c+1)*Math.pow(k-1,3)+c*Math.pow(k-1,2);}};
// свечение: общий холст с мягким кругом, спрайт с аддитивным смешением
const PRK_GLOW=prkTex(64,64,(x,w)=>{const g=x.createRadialGradient(w/2,w/2,0,w/2,w/2,w/2);g.addColorStop(0,'rgba(255,255,240,1)');g.addColorStop(0.25,'rgba(255,220,120,.85)');g.addColorStop(1,'rgba(255,170,40,0)');x.fillStyle=g;x.fillRect(0,0,w,w);});
function prkGlow(par,col,s,x,y,z,op){const m=new THREE.Sprite(new THREE.SpriteMaterial({map:PRK_GLOW,color:col,transparent:true,opacity:op==null?1:op,depthWrite:false,blending:THREE.AdditiveBlending,fog:false}));m.scale.setScalar(s);m.position.set(x||0,y||0,z||0);par.add(m);return m;}

/* ---------- свет и небо по шотам ---------- */
// bg — небо, fog — [цвет, ближе, дальше], amb/sun — [цвет, сила], hor — тема силуэтов горизонта, gr — цветокор (ключ GRADE), sea — цвет моря
const PRK_LOOK={
  voidk:{bg:0x1a1026,fog:[0x1a1026,0.5,7],amb:[0xffd8a0,0.7],sun:[0xffe0b0,0.6],hor:null,gr:'evening'},
  dawn:{bg:0xf2b39a,fog:[0xf4c0a4,70,300],amb:[0xffe6d4,0.66],sun:[0xffc89a,0.92],hor:'sea',gr:'dawn',sea:0x4a86a8,sunOff:[-30,16,-24]},
  day:{bg:0xf6c27e,fog:[0xf6c890,70,300],amb:[0xfff0d8,0.68],sun:[0xffe0a8,1.0],hor:'sea',gr:'sunset',sea:0x3d8cb0,sunOff:[-24,26,12]},
  sunset:{bg:0xf08a62,fog:[0xf09a70,60,280],amb:[0xffd0b8,0.62],sun:[0xffa070,0.9],hor:'sea',gr:'sunset',sea:0x4a6a98,sunOff:[-30,12,-20]},
  forestset:{bg:0xe8a07a,fog:[0xd8a48a,45,240],amb:[0xfff0e4,0.68],sun:[0xffd0a0,0.82],hor:'forest',gr:'dawn',sunOff:[-30,16,18]},
  night:{bg:0x1b2450,fog:[0x1b2450,50,260],amb:[0x8c9ad8,0.6],sun:[0xb4c4ff,0.55],hor:'sea',gr:'evening',sea:0x1a2c50,sunOff:[-14,30,-30]},
  storm:{bg:0x2c1f4c,fog:[0x30244e,30,180],amb:[0x9a88c8,0.55],sun:[0xb8a8f0,0.42],hor:'sea',gr:'evening',sea:0x1c1a3a,sunOff:[-14,30,-30]},
  forest:{bg:0x2a4a50,fog:[0x2a4a50,14,70],amb:[0xa8d0d8,0.7],sun:[0xc8dcff,0.7],hor:'forest',gr:'dark'},
  kitezh:{bg:0x0e4654,fog:[0x0e4654,8,55],amb:[0xa8e4e8,0.68],sun:[0xfff0c8,0.7],hor:null,gr:'kitezh'},
  heaven:{bg:0x5a4c96,fog:[0x6a5ca4,20,110],amb:[0xc8b8f4,0.6],sun:[0xe0d0ff,0.6],hor:'heaven',gr:'heaven'},
  smor:{bg:0x3a1a18,fog:[0x3a1a18,16,85],amb:[0xf0b098,0.56],sun:[0xffb070,0.7],hor:'smorodina',gr:'smorodina'},
  buyan:{bg:0x1e4458,fog:[0x1e4458,30,160],amb:[0x9ac8d8,0.6],sun:[0xc8e0ff,0.55],hor:'sea',gr:'evening',sea:0x16384c},
  grey:{bg:0x9a9aa4,fog:[0x9c9ca6,30,200],amb:[0xd8d8e0,0.62],sun:[0xd0d4e0,0.55],hor:'sea',gr:'dark',sea:0x52606e,sunOff:[-30,14,-20]},
  pnight:{bg:0x18204a,fog:[0x18204a,40,220],amb:[0x8a98d8,0.6],sun:[0xb0c0ff,0.5],hor:'forest',gr:'evening',sunOff:[-14,30,18]}};
PRK.look=function(k){const L=PRK_LOOK[k];if(!L)return;PRK.lookK=k;
  scene.background=new THREE.Color(L.bg);if(!scene.fog)scene.fog=new THREE.Fog(L.fog[0],L.fog[1],L.fog[2]);scene.fog.color.setHex(L.fog[0]);scene.fog.near=L.fog[1];scene.fog.far=L.fog[2];
  amb.color.setHex(L.amb[0]);amb.intensity=L.amb[1];sun.color.setHex(L.sun[0]);sun.intensity=L.sun[1];W.sunOff=L.sunOff?PRV(L.sunOff[0],L.sunOff[1],L.sunOff[2]):PRV(-14,24,10);
  const ht=L.hor;W.theme=ht||'kitezh';try{buildHorizon();}catch(e){}
  try{const g=GRADE[L.gr]||GRADE.sunset,rg=a=>'rgba('+a[0]+','+a[1]+','+a[2]+','+a[3]+')',el=$('finGrade');if(el)el.style.background='linear-gradient(180deg,'+rg(g[0])+',rgba(255,255,255,0) 45%,'+rg(g[1])+')';
    FIN.exposure=1+(g[2]-1.4)*0.55;renderer.toneMappingExposure=FIN.exposure;}catch(e){}
  if(PRK.L){const night=k==='night'||k==='storm',L0=PRK.L;L0.seaM.color.setHex(L.sea||0x3d8cb0);L0.stars.visible=night;L0.moon.visible=k==='night';L0.sunDisc.visible=k==='dawn'||k==='day'||k==='sunset';
    L0.sunDisc.material.color.setHex(k==='sunset'?0xffb070:0xfff0c0);}
  if(PRK.P){const n=k==='pnight';PRK.P.stars.visible=n;PRK.P.winM.color.setHex(n?0xffc860:0xffdca0);}};
// запомнить и вернуть свет уровня
PRK.saveLook=function(){PRK.look0={bg:scene.background&&scene.background.clone(),fc:scene.fog&&scene.fog.color.clone(),fn:scene.fog&&scene.fog.near,ff:scene.fog&&scene.fog.far,
  ac:amb.color.clone(),ai:amb.intensity,sc:sun.color.clone(),si:sun.intensity,so:W.sunOff&&W.sunOff.clone(),th:W.theme,ex:FIN.exposure,gr:($('finGrade')||{style:{}}).style.background};};
PRK.restoreLook=function(){const o=PRK.look0;if(!o)return;scene.background=o.bg;if(scene.fog&&o.fc){scene.fog.color.copy(o.fc);scene.fog.near=o.fn;scene.fog.far=o.ff;}
  amb.color.copy(o.ac);amb.intensity=o.ai;sun.color.copy(o.sc);sun.intensity=o.si;if(o.so)W.sunOff=o.so;W.theme=o.th;try{buildHorizon();}catch(e){}
  FIN.exposure=o.ex;renderer.toneMappingExposure=o.ex;const el=$('finGrade');if(el)el.style.background=o.gr;};

/* ---------- рисунки на холсте: гравюры звеньев, буквы, флажок ---------- */
function prkIcon(kind){return prkTex(128,128,(x,w)=>{x.fillStyle='#f2c454';x.beginPath();x.arc(64,64,62,0,7);x.fill();x.strokeStyle='#a8741c';x.lineWidth=6;x.beginPath();x.arc(64,64,56,0,7);x.stroke();
  x.fillStyle='#5a3410';x.strokeStyle='#5a3410';x.lineWidth=6;x.lineCap='round';
  if(kind==='hut'){x.fillRect(40,44,48,30);x.beginPath();x.moveTo(34,46);x.lineTo(64,24);x.lineTo(94,46);x.fill();x.beginPath();x.moveTo(52,74);x.lineTo(46,100);x.lineTo(38,104);x.moveTo(76,74);x.lineTo(82,100);x.lineTo(90,104);x.stroke();}
  else if(kind==='whale'){x.beginPath();x.ellipse(58,70,34,18,0,0,7);x.fill();x.beginPath();x.moveTo(88,66);x.lineTo(108,50);x.lineTo(104,70);x.lineTo(110,86);x.fill();x.beginPath();x.moveTo(44,52);x.quadraticCurveTo(40,36,50,30);x.moveTo(44,52);x.quadraticCurveTo(52,38,62,36);x.stroke();}
  else if(kind==='feather'){x.beginPath();x.moveTo(40,100);x.quadraticCurveTo(46,40,92,24);x.quadraticCurveTo(80,72,40,100);x.fill();x.strokeStyle='#f2c454';x.lineWidth=3;x.beginPath();x.moveTo(42,98);x.quadraticCurveTo(62,62,88,28);x.stroke();}
  else if(kind==='heads'){for(const[cx,cy]of[[40,44],[64,32],[88,44]]){x.beginPath();x.arc(cx,cy,11,0,7);x.fill();x.beginPath();x.moveTo(cx,cy+8);x.quadraticCurveTo(64,80,64,96);x.stroke();}x.beginPath();x.ellipse(64,98,22,10,0,0,7);x.fill();}
  else if(kind==='egg'){x.beginPath();x.ellipse(64,66,24,32,0,0,7);x.fill();x.fillStyle='#f2c454';x.fillRect(46,64,36,4);}
  else if(kind==='kolobok'){x.beginPath();x.arc(64,64,30,0,7);x.fill();x.fillStyle='#f2c454';x.beginPath();x.arc(54,58,4,0,7);x.arc(74,58,4,0,7);x.fill();x.strokeStyle='#f2c454';x.lineWidth=4;x.beginPath();x.arc(64,66,13,0.3,2.84);x.stroke();}
  else if(kind==='oak'){x.fillRect(58,62,12,38);x.beginPath();x.arc(64,52,26,0,7);x.fill();x.strokeStyle='#f2c454';x.lineWidth=4;x.beginPath();x.moveTo(44,78);x.lineTo(84,70);x.moveTo(44,88);x.lineTo(84,80);x.stroke();}});}
const PRK_LET='СКАЗКАЖИЛБЫЛЦАРЬЛЕСМОРЕДУБКОТЗВЕНОСЛОВО';
function prkLetterTex(ch){return prkTex(64,64,(x,w)=>{x.font='bold 50px Georgia, serif';x.textAlign='center';x.textBaseline='middle';x.shadowColor='rgba(255,200,80,.9)';x.shadowBlur=10;x.fillStyle='#ffe08a';x.fillText(ch,32,35);});}
const PRK_LETTEX={};function prkLetter(ch){if(!PRK_LETTEX[ch])PRK_LETTEX[ch]=prkLetterTex(ch);return PRK_LETTEX[ch];}
function prkStars(par,n,R,cx,cz){const pos=new Float32Array(n*3);for(let i=0;i<n;i++){const a=Math.random()*6.283,e=0.12+Math.random()*1.25;pos[i*3]=cx+Math.cos(a)*Math.cos(e)*R;pos[i*3+1]=Math.sin(e)*R;pos[i*3+2]=cz+Math.sin(a)*Math.cos(e)*R;}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));const p=new THREE.Points(g,new THREE.PointsMaterial({color:0xfff6e0,size:2.2,sizeAttenuation:false,fog:false}));p.frustumCulled=false;par.add(p);return p;}
// ель низкополигональная: три конуса
function prkFir(par,x,y,z,h,col){const g=prkGroup(par,x,y,z);const m=prkM(col||0x2f5a3a);prkAdd(g,new THREE.CylinderGeometry(h*0.05,h*0.07,h*0.3,6),prkM(0x5a3a22),0,h*0.15,0);
  for(let i=0;i<3;i++){const c=prkAdd(g,new THREE.ConeGeometry(h*(0.36-i*0.08),h*0.42,7),m,0,h*(0.36+i*0.2),0);c.rotation.y=i*0.7;}g.rotation.y=Math.random()*6;return g;}
function prkRock(par,x,y,z,s,col){const geo=new THREE.DodecahedronGeometry(s);FIN.jitter(geo,s*0.18);const m=prkAdd(par,geo,prkM(col||0x7a7468),x,y,z);m.rotation.set(Math.random()*3,Math.random()*3,0);return m;}
// море с волнами (как на титуле)
function prkSea(par,size,seg,col){const g=new THREE.PlaneGeometry(size,size,seg,seg);g.rotateX(-Math.PI/2);const p=g.attributes.position,b=Float32Array.from(p.array);
  const mat=prkM(col,{emissive:0x081a2a});const m=prkAdd(par,g,mat,0,-0.9,0);m.castShadow=false;
  PRK.ups.push(t=>{if(!m.visible)return;for(let i=0;i<p.count;i++){const x=b[i*3],z=b[i*3+2];p.setY(i,Math.sin(x*0.18+t*0.9)*0.25+Math.cos(z*0.22+t*0.7)*0.22+Math.sin((x+z)*0.07+t*0.4)*0.35);}p.needsUpdate=true;});return {m,mat};}

/* ---------- L: Лукоморье ---------- */
/* ---------- русалка (сидит на ветке дуба) ---------- */
function prkMermaid(par,x,y,z,sc){const mer=prkGroup(par,x,y,z);mer.scale.setScalar(sc||1);
  const skin=prkM(0xf6d2b8),hairM=prkM(0x2f9a84,{emissive:0x0a2a24}),hair2=prkM(0x3fb898,{emissive:0x0a3028}),tl=prkM(0x2fb0a8,{emissive:0x0a4a48}),tl2=prkM(0x249a96,{emissive:0x083e3c}),
    finM=prkM(0x7fe0d0,{emissive:0x1a6a60,side:THREE.DoubleSide}),shell=prkM(0xe8b8e0,{emissive:0x3a2038}),pearl=prkM(0xfff8f0,{emissive:0x605850}),pink=prkM(0xff9a9a),
    gold=prkM(0xffd27a,{emissive:0x806010}),white=prkM(0xffffff),iris=prkM(0x2a8ab0,{emissive:0x0a2a40});
  // хвост: шесть звеньев цепочкой — от бёдер вперёд через ветку и вниз; полоски-чешуйки, на конце плавник-«сердечко»
  const tail=prkGroup(mer,0,0.02,0.04),seg=[],base=[-1.25,0.42,0.38,0.36,0.3,0.28];let pp=tail;
  for(let i=0;i<6;i++){const sg=prkGroup(pp,0,i?-0.22:0,0);sg.rotation.x=base[i];const r=0.17-i*0.02;
    const m=prkAdd(sg,new THREE.SphereGeometry(r,10,8),i%2?tl2:tl,0,-0.11,0);m.scale.set(1,1.45,0.88);
    const bnd=prkAdd(sg,new THREE.TorusGeometry(r*0.92,0.018,4,12),i%2?tl:tl2,0,-0.03,0);bnd.rotation.x=Math.PI/2;bnd.scale.set(1,0.88,1);seg.push(sg);pp=sg;}
  {const fz=prkGroup(pp,0,-0.2,0);const sh=new THREE.Shape();sh.moveTo(0,0);sh.bezierCurveTo(0.12,-0.05,0.3,-0.12,0.34,-0.36);sh.bezierCurveTo(0.2,-0.28,0.08,-0.3,0,-0.2);
    sh.bezierCurveTo(-0.08,-0.3,-0.2,-0.28,-0.34,-0.36);sh.bezierCurveTo(-0.3,-0.12,-0.12,-0.05,0,0);prkAdd(fz,new THREE.ShapeGeometry(sh,6),finM,0,0,0).rotation.y=Math.PI/2;
    for(const s of[-1,1]){const l=prkAdd(fz,new THREE.CylinderGeometry(0.006,0.01,0.3,4),tl2,0,-0.15,s*0.1);l.rotation.x=s*0.6;}seg.fin=fz;}
  for(const s of[-1,1]){const f=prkAdd(seg[2],new THREE.ConeGeometry(0.07,0.2,4),finM,s*0.14,-0.1,0);f.rotation.z=-s*1.9;f.scale.z=0.3;}
  // пояс-чешуя на бёдрах
  for(let i=0;i<10;i++){const a=i/10*Math.PI*2;const c=prkAdd(mer,new THREE.ConeGeometry(0.05,0.12,4),tl2,Math.sin(a)*0.15,0.02,Math.cos(a)*0.13);c.rotation.set(Math.PI+Math.cos(a)*0.5,0,-Math.sin(a)*0.5);}
  // тело: стан, ракушки, жемчужное ожерелье
  const body=prkGroup(mer,0,0,0);
  prkAdd(body,new THREE.LatheGeometry([[0.001,0],[0.16,0.01],[0.14,0.12],[0.12,0.22],[0.15,0.32],[0.14,0.41],[0.08,0.47],[0.001,0.49]].map(([a,b])=>new THREE.Vector2(a,b)),10),skin,0,0,0).scale.z=0.85;
  for(const s of[-1,1]){const sh=prkAdd(body,new THREE.SphereGeometry(0.075,8,5,0,Math.PI*2,0,Math.PI/2),shell,s*0.068,0.33,0.085);sh.rotation.x=Math.PI/2-0.25;sh.scale.y=0.55;
    for(let k=0;k<3;k++){const rb=prkAdd(sh,new THREE.CylinderGeometry(0.006,0.006,0.13,3),pearl,(k-1)*0.03,0.04,0);rb.rotation.x=Math.PI/2;}}
  for(let i=0;i<9;i++){const a=(i/8-0.5)*2.2;prkAdd(body,new THREE.SphereGeometry(0.018,6,4),pearl,Math.sin(a)*0.1,0.43-Math.cos(a)*0.04+0.04,Math.cos(a)*0.09);}
  prkAdd(body,new THREE.CylinderGeometry(0.045,0.05,0.12,8),skin,0,0.52,0);
  // голова: лицо, глаза с бликами, щёки, улыбка; волосы — шапка, чёлка, пряди по спине и на плечах; венок с цветами
  const head=prkGroup(body,0,0.67,0);prkAdd(head,new THREE.SphereGeometry(0.16,14,12),skin,0,0,0).scale.set(1,1.06,0.96);
  const eyes=[];for(const s of[-1,1]){const e=prkGroup(head,s*0.058,0.0,0.128);prkAdd(e,new THREE.SphereGeometry(0.034,8,6),white,0,0,0).scale.z=0.5;
    prkAdd(e,new THREE.SphereGeometry(0.024,8,6),iris,0,-0.003,0.012).scale.z=0.5;prkAdd(e,new THREE.SphereGeometry(0.013,6,4),PRK_DARK,0,-0.003,0.019).scale.z=0.5;
    prkAdd(e,new THREE.SphereGeometry(0.007,5,4),white,s*-0.008+0.006,0.009,0.024);
    for(let k=0;k<3;k++){const l=prkAdd(e,new THREE.BoxGeometry(0.004,0.022,0.004),PRK_DARK,s*(0.016+k*0.01),0.03-k*0.003,0.012);l.rotation.z=-s*(0.5+k*0.3);}eyes.push(e);
    const ck=prkAdd(head,new THREE.SphereGeometry(0.026,6,5),pink,s*0.095,-0.05,0.115);ck.scale.z=0.35;
    const br=prkAdd(head,new THREE.BoxGeometry(0.045,0.008,0.008),hairM,s*0.06,0.052,0.142);br.rotation.z=-s*0.15;}
  prkAdd(head,new THREE.SphereGeometry(0.014,5,4),skin,0,-0.028,0.158);
  {const mo=prkAdd(head,new THREE.TorusGeometry(0.03,0.007,4,10,Math.PI),prkM(0xd85a6a),0,-0.06,0.145);mo.rotation.z=Math.PI;}
  {const cap=prkAdd(head,new THREE.SphereGeometry(0.172,14,8,0,Math.PI*2,0,Math.PI*0.5),hairM,0,0.0,-0.012);cap.rotation.x=-0.45;cap.scale.set(1.04,1.05,1.05);
    const bk=prkAdd(head,new THREE.SphereGeometry(0.17,10,8),hairM,0,-0.02,-0.05);bk.scale.set(1.04,1,0.95);
    for(let i=0;i<5;i++){const b=prkAdd(head,new THREE.SphereGeometry(0.05,6,5),i%2?hair2:hairM,(i-2)*0.055,0.11-Math.abs(i-2)*0.018,0.1-Math.abs(i-2)*0.02);b.scale.set(1.1,0.7,0.6);}}
  const strands=[];const strand=(px,py,pz,n,len,r,ry,rx,mat)=>{const root=prkGroup(head,px,py,pz);root.rotation.set(rx,ry,0);let q=root;const ch=[];
    for(let k=0;k<n;k++){const sg=prkGroup(q,0,k?-len:0,0);sg.rotation.x=k?0.12:0;const rr=r*(1-k/(n+1)*0.6);prkAdd(sg,new THREE.CylinderGeometry(rr,rr*0.82,len,6),mat,0,-len/2,0);ch.push(sg);q=sg;}
    prkAdd(q,new THREE.ConeGeometry(r*0.5,len*0.6,6),mat,0,-len-len*0.3,0).rotation.x=Math.PI;strands.push({root,ch,rx,ph:strands.length*0.9});};
  for(let i=0;i<6;i++){const a=(i-2.5)*0.22;strand(Math.sin(a)*0.14,-0.04,-0.08-Math.cos(a)*0.06,4,0.2,0.05,a*0.6,0.25,i%2?hair2:hairM);}
  for(const s of[-1,1])strand(s*0.13,-0.06,0.02,3,0.17,0.035,0,-0.12,s>0?hairM:hair2);
  {const wr=prkAdd(head,new THREE.TorusGeometry(0.162,0.02,5,18),prkM(0x5a9a48),0,0.085,-0.01);wr.rotation.x=Math.PI/2-0.35;
    for(let i=0;i<7;i++){const a=i/7*Math.PI*2+0.3,fx=Math.cos(a)*0.162,fz=Math.sin(a)*0.162;const fy=0.085+Math.sin(a)*Math.sin(0.35)*0.162*-1;const fl=prkGroup(head,fx,fy,fz-0.01);
      for(let k=0;k<5;k++){const b=k/5*Math.PI*2;prkAdd(fl,new THREE.SphereGeometry(0.018,5,4),i%3===1?prkM(0xffb0d0):white,Math.cos(b)*0.022,Math.sin(b)*0.022,0).scale.z=0.5;}
      prkAdd(fl,new THREE.SphereGeometry(0.013,5,4),prkM(0xffd23a,{emissive:0x604000}),0,0,0.006);fl.lookAt(fl.position.clone().multiplyScalar(3).add(new THREE.Vector3(0,0.2,0)));}}
  // руки: правая с гребнем расчёсывает прядь, левая опирается о ветку
  const arm=(s)=>{const sh=prkGroup(body,s*0.15,0.43,0);prkAdd(sh,new THREE.SphereGeometry(0.042,6,5),skin,0,0,0);prkAdd(sh,new THREE.CylinderGeometry(0.034,0.03,0.2,7),skin,0,-0.1,0);
    const el=prkGroup(sh,0,-0.2,0);prkAdd(el,new THREE.CylinderGeometry(0.03,0.025,0.18,7),skin,0,-0.09,0);const hd=prkGroup(el,0,-0.19,0);prkAdd(hd,new THREE.SphereGeometry(0.032,7,5),skin,0,0,0).scale.set(0.8,1.1,0.6);
    const br=prkAdd(sh,new THREE.TorusGeometry(0.033,0.008,4,10),gold,0,-0.15,0);br.rotation.x=Math.PI/2;return {sh,el,hd};};
  const aR=arm(1),aL=arm(-1);aL.sh.rotation.set(-0.15,0,-0.35);aL.el.rotation.set(-0.5,0,0);
  const comb=prkGroup(aR.hd,0,-0.02,0.03);prkAdd(comb,new THREE.BoxGeometry(0.16,0.04,0.02),gold,0,0,0);for(let k=0;k<7;k++)prkAdd(comb,new THREE.BoxGeometry(0.008,0.04,0.012),gold,(k-3)*0.02,-0.035,0);comb.rotation.z=0.3;
  const M={g:mer,tail,seg,base,body,head,eyes,strands,aR,aL,comb,blink:2.2,bt:-1};
  M.anim=(t,dt)=>{const sl=Math.sin(t*1.3);
    seg.forEach((sg,i)=>{sg.rotation.x=M.base[i]+Math.sin(t*2.2-i*0.7)*0.06*(0.4+i*0.25);sg.rotation.z=Math.sin(t*1.6-i*0.6)*0.05*(0.3+i*0.2);});if(seg.fin)seg.fin.rotation.x=Math.sin(t*2.2-4.6)*0.35;
    body.rotation.z=Math.sin(t*0.9)*0.035;body.rotation.x=Math.sin(t*0.7)*0.02;
    head.rotation.set(0.05+Math.sin(t*0.7+1)*0.05,Math.sin(t*0.45)*0.18,0.14+Math.sin(t*1.3)*0.06);
    // гребень: рука поднята к правому плечу, проводит вниз по пряди и возвращается
    const c=(1-Math.cos(t*2.4))*0.5;aR.sh.rotation.set(-0.55-c*0.35,0.2,0.75-c*0.25);aR.el.rotation.set(-1.9+c*0.7,0,0.2);aR.hd.rotation.set(0.2,0,0.1);
    strands.forEach((st,i)=>{st.root.rotation.x=st.rx+Math.sin(t*1.1+st.ph)*0.06;st.ch.forEach((q,k)=>{if(k)q.rotation.z=Math.sin(t*1.4+st.ph-k*0.8)*0.06;});});
    M.blink-=dt;if(M.blink<=0&&M.bt<0){M.bt=0;M.blink=2.4+((t*7.3)%1)*2.6;}let e=1;if(M.bt>=0){M.bt+=dt;const u=M.bt/0.16;e=u<0.5?1-u*1.9:Math.min(1,0.05+(u-0.5)*1.9);if(u>=1)M.bt=-1;}
    eyes.forEach(q=>{q.scale.y=Math.max(0.06,e);});};
  M.anim(0,0);return M;}

// Лукоморье игры: уровень luko строится «в песочнице» (свой W, свет и интерфейс потом возвращаются), одевается как в игре
// (деревья и трава кита, обрывы, стилизация) и его группа переезжает в площадку L — дуб уровня встаёт на место дуба «Присказки».
// Свои дуб с цепью, Кот, Кузьма, кузня и слушатели — из «Присказки»: всё, что у уровня стоит на их местах, убирается.
const PRK_LK={dz:7,cut:[[0,-7,4.2],[2.3,-4.6,1.2],[10.2,-0.6,1.4],[8.6,0.6,1.2],[7.4,-3.6,3.0]]};
function prkLukoEnv(){const W0=W,bg=scene.background,fog=scene.fog?[scene.fog.color.clone(),scene.fog.near,scene.fog.far]:null,a0=[amb.color.clone(),amb.intensity],s0=[sun.color.clone(),sun.intensity],ui=[G.ui,G.uiTick];
  const dr=Object.assign({},DRESS),fk=new Set(Object.keys(G.flags));let Wl=null,g=null;   // флаги, что заведёт уровень (G.flags.lc…), потом убираются
  try{W=null;newWorld();Wl=W;W.levelId='luko';buildLukomorye();if(typeof flushDecor==='function')flushDecor();if(FIN.dressWorld)FIN.dressWorld();try{dressScatter();}catch(e){}if(FIN.styLevel)FIN.styLevel();g=W.group;}
  catch(e){console.error('prk luko',e);g=null;}
  finally{if(Wl&&Wl.group)scene.remove(Wl.group);W=W0;scene.background=bg;if(fog&&scene.fog){scene.fog.color.copy(fog[0]);scene.fog.near=fog[1];scene.fog.far=fog[2];}
    amb.color.copy(a0[0]);amb.intensity=a0[1];sun.color.copy(s0[0]);sun.intensity=s0[1];G.ui=ui[0];G.uiTick=ui[1];for(const k in DRESS)delete DRESS[k];Object.assign(DRESS,dr);for(const k of Object.keys(G.flags))if(!fk.has(k))delete G.flags[k];}
  if(!g)return null;
  // своё небо и море у «Присказки»: диски солнца и луны уровня, его плоское море и Звенышко — прочь; на местах дуба, Кота и кузни — пусто
  const kill=[],bb=new THREE.Box3(),sz=new V3(),c=new V3();
  for(const o of[Wl.oak,Wl.kot&&Wl.kot.g,Wl.zven&&Wl.zven.g])if(o&&o.parent)kill.push(o);
  g.traverse(o=>{if(!o.isMesh||o.isInstancedMesh)return;const gt=o.geometry&&o.geometry.type;if(gt==='CircleGeometry'&&o.material&&o.material.fog===false){kill.push(o);return;}
    if(o.parent!==g)return;bb.setFromObject(o);bb.getSize(sz);bb.getCenter(c);if(sz.x>250&&sz.y<2){kill.push(o);return;}
    if(sz.x<6&&sz.z<6&&PRK_LK.cut.some(([x,z,r])=>Math.hypot(c.x-x,c.z-z)<r))kill.push(o);});
  // то, что ставит на место игровой цикл уровня (желания курицы, кольца, искры), без него лежит кучкой в начале координат — в кадре 2-7 это «непонятный предмет»
  for(const o of g.children){if(o.isInstancedMesh||o.isPoints||o.userData.decor)continue;bb.setFromObject(o);if(bb.isEmpty())continue;bb.getSize(sz);bb.getCenter(c);
    if(sz.x<3&&sz.z<3&&Math.hypot(c.x,c.z)<0.05&&Math.abs(c.y)<0.6)kill.push(o);}
  kill.forEach(o=>{if(o.parent)o.parent.remove(o);});
  // деревья и трава кита (инстансы) у дуба и на месте кузни — вынуть по одному
  g.traverse(o=>{if(!o.isInstancedMesh)return;const m=new THREE.Matrix4(),z0=new THREE.Matrix4().makeScale(0,0,0),p=new V3();
    for(let i=0;i<o.count;i++){o.getMatrixAt(i,m);p.setFromMatrixPosition(m);if(PRK_LK.cut.some(([x,z,r])=>Math.hypot(p.x-x,p.z-z)<r)){o.setMatrixAt(i,z0);}}o.instanceMatrix.needsUpdate=true;});
  g.position.set(0,0,PRK_LK.dz);g.userData.prkCast=true;return {g,W:Wl};}
// ---------- лес мира 1: холмистая земля-долина и деревья кита (инстансы, как у уровней) ----------
function prkKitTo(par,items){const ims=items.length?instKit(items):[];for(const m of ims){if(m.parent)m.parent.remove(m);par.add(m);}return ims;}
// o: x0…x1, z0…z1 — участок, y — уровень земли, hill(x,z) — холмы, river(x,z) — ручей, step — шаг сетки деревьев, size(x,z,R) — масштаб дерева (0 — нет)
function prkForest(par,o){const Rn=kRng(o.seed||17),hill=o.hill||(()=>0),B={minx:o.x0,maxx:o.x1,minz:o.z0,maxz:o.z1};
  const geo=valleyGeo(B,o.y,0,o.pal||PAL.moss,o.cell||6,{flat:true,river:o.river,riverPal:PAL.shallow}),p=geo.attributes.position;
  for(let i=0;i<p.count;i++)p.setY(i,p.getY(i)+hill(p.getX(i),p.getZ(i)));geo.computeVertexNormals();geo.computeBoundingSphere();
  const gm=new THREE.Mesh(geo,KMAT.vc);gm.receiveShadow=true;par.add(gm);const items=[],mix=o.mix||TREES.forest;
  for(let x=o.x0;x<o.x1;x+=o.step)for(let z=o.z0;z<o.z1;z+=o.step){const px=x+(Rn()-0.5)*o.step*0.9,pz=z+(Rn()-0.5)*o.step*0.9;if(o.river&&o.river(px,pz))continue;
    const sc=o.size(px,pz,Rn);if(!sc)continue;items.push({name:pickW(mix,Rn()),v:0,x:px,y:o.y+hill(px,pz)-0.15,z:pz,s:sc,ry:Rn()*6.283,tint:0.78+Rn()*0.3});}
  (o.extra||[]).forEach(e=>items.push(e));return {ground:gm,trees:prkKitTo(par,items)};}
function prkBuildL(){const O=PRO.L,g=prkGroup(PRK.root,O.x,O.y,O.z),L={g};PRK.L=L;
  const sea=prkSea(g,460,64,0x3d8cb0);L.seaM=sea.mat;
  // Лукоморье игры (prkLukoEnv); не собралось — прежний остров: трава, песок, камни
  const grassM=prkM(0x6f9a4a);L.grassM=grassM;const env=prkLukoEnv();L.env=env&&env.g;
  if(env){g.add(env.g);L.envW=env.W;}
  else{{const isl=new THREE.CylinderGeometry(15,17.5,3,18,2);FIN.jitter(isl,0.2);prkAdd(g,isl,grassM,0,-1.5,0);}
  {const sand=new THREE.CylinderGeometry(19,21,1.6,20);FIN.jitter(sand,0.12);prkAdd(g,sand,prkM(0xe2c48c),0,-1.4,0);}
  for(let i=0;i<16;i++){const a=i/16*6.283+0.3,r=16.8+Math.sin(i*3.1)*1.1;prkRock(g,Math.sin(a)*r,-0.6,Math.cos(a)*r,0.6+((i*37)%10)/10,0x8a8478);}
  for(let i=0;i<60;i++){const a=i*2.4,r=4+(i*53%100)/10;const t=prkAdd(g,new THREE.ConeGeometry(0.12,0.5,3),prkM(0x4f7e36),Math.sin(a)*r,0.2,Math.cos(a)*r);t.rotation.z=((i*13)%10-5)*0.05;}}
  // за морем — лесной берег мира 1: туда летит камера в конце сцены 2 (к Лесному патрулю)
  {const F=prkGroup(g,0,0,0);F.userData.prkCast=true;L.coast=F;const hl=(x,z)=>Math.max(-0.3,Math.min(1,(z-150)/26)*3.5+Math.max(0,z-210)*0.07+Math.sin(x*0.031)*Math.cos(z*0.043)*2.6);
    prkForest(F,{x0:-300,x1:300,z0:142,z1:440,y:-0.5,cell:7,step:5.2,hill:hl,seed:5,pal:PAL.moss,size:(x,z,Rn)=>z<158?0:Rn()<0.6?2.4+Rn()*1.5:0});}
  // дуб
  const bark=prkM(0x6a4a2e),oak=prkGroup(g,0,0,0);L.oak=oak;
  prkAdd(oak,new THREE.CylinderGeometry(1.55,2.3,13,10),bark,0,6.5,0);
  for(let i=0;i<8;i++){const a=i/8*6.283;const r=prkAdd(oak,new THREE.ConeGeometry(0.7,3.2,5),bark,Math.sin(a)*2.1,0.5,Math.cos(a)*2.1);r.rotation.x=Math.cos(a)*1.25;r.rotation.z=-Math.sin(a)*1.25;}
  const brs=[[2.4,9.4,0.4,-0.95,0],[-2.6,9.9,-0.5,0.95,0],[0.3,10.4,2.4,0,0.85],[0.1,10.6,-2.5,0,-0.8],[-2.2,7.6,1.4,0.9,0.5],[2.0,12,-1.4,-0.8,-0.4]];
  L.branches=brs.map(([x,y,z,rz,rx])=>{const b=prkAdd(oak,new THREE.CylinderGeometry(0.3,0.5,5,7),bark,x,y,z);b.rotation.set(rx,0,rz);return b;});
  // низкая ветка — сюда садится Кот (2-1), и ветка русалки
  {const b=prkAdd(oak,new THREE.CylinderGeometry(0.28,0.42,4.6,7),bark,3.2,4.3,0.3);b.rotation.z=-1.35;}
  {const b=prkAdd(oak,new THREE.CylinderGeometry(0.26,0.4,4.6,7),bark,-3.4,7.0,0.6);b.rotation.z=1.3;}
  const crown=prkGroup(oak,0,0,0);L.crown=crown;const leafs=[prkM(0x4d7a2c),prkM(0x628f36),prkM(0x3f6a26)];L.leafs=leafs;
  [[0,15.2,0,5.2,0],[3.8,13.4,0.6,3.8,1],[-4,13.8,-0.4,3.9,0],[0.5,13.6,3.6,3.5,2],[0.4,14,-3.6,3.6,1],[2.2,16.8,-1,3,2],[-2,16.4,1.4,2.9,1],[4.6,11.6,-2,2.6,0],[-4.6,11.8,2.2,2.5,2]].forEach(([x,y,z,r,k])=>{
    const geo=new FIN.orig.Icosa(r,1);FIN.jitter(geo,0.22);prkAdd(crown,geo,leafs[k],x,y,z);});
  // златая цепь: звенья по спирали; каждое двенадцатое — медальон с гравюрой мира
  const spiral=u=>{const a=u*Math.PI*2*3,y=1.0+u*10.6,r=2.62-u*0.62;return PRV(Math.sin(a)*r,y,Math.cos(a)*r);};L.spiral=spiral;
  const gold=prkM(0xffc83a,{emissive:0x8a5a00,emissiveIntensity:0.55});L.goldM=gold;const linkG=new THREE.TorusGeometry(0.27,0.075,6,12);
  const chain=prkGroup(oak,0,0,0);L.chain=chain;L.links=[];const icons=['hut','whale','feather','heads','egg','kolobok'];let ic=0;
  const NL=78;for(let i=0;i<NL;i++){const u=i/NL,p=spiral(u),q=spiral(u+0.004);
    if(i%13===6&&ic<icons.length){const md=prkGroup(chain,p.x,p.y,p.z);md.lookAt(O.x+p.x*3,p.y,O.z+p.z*3);
      const disc=new THREE.Mesh(new FIN.orig.Circle(0.38,20),new THREE.MeshLambertMaterial({map:prkIcon(icons[ic]),emissive:0x5a3a00,emissiveIntensity:0.35,side:THREE.DoubleSide}));disc.position.z=0.02;md.add(disc);
      prkAdd(md,new THREE.TorusGeometry(0.42,0.07,6,18),gold,0,0,0);L.links.push({m:md,u,med:true,i:ic});ic++;continue;}
    const m=prkAdd(chain,linkG,gold,p.x,p.y,p.z);m.lookAt(O.x+q.x,q.y,O.z+q.z);m.rotateY(Math.PI/2);if(i%2)m.rotateX(Math.PI/2);L.links.push({m,u});}
  // Кот Учёный (сидячая модель — по цепи «идёт» шажками)
  L.kot=prkCast(makeKot,g,0,0,0,0.55,0);L.kotS=0.55;
  // русалка на ветке: сидит, хвост свешивается за ветку, правой рукой расчёсывает волосы гребнем; L.mer.anim — плеск хвоста, гребень, моргание
  L.mer=prkMermaid(g,-4.9,7.75,0.9,1.6);
  // Леший выглядывает из-за ствола
  L.leshy=prkCast(()=>makeLeshy(0.5),g,-1.4,0,-2.9,0,0.4);
  // слушатели
  L.kolo=prkCast(makeKolobok,g,-2.3,0,7.4,1,Math.PI);L.belka=prkCast(makeBelka5,g,2.4,0,7.8,1.05,Math.PI);
  L.sadko=prkCast(makeSadko,g,-4.6,0.25,8.6,0.95,Math.PI*0.8);prkRock(g,-4.6,-0.3,8.6,0.6,0x8a8478);
  L.zhar=prkCast(()=>makeFirebird({}),g,5.3,4.72,0.3,0.7,-0.2);
  L.stupa=prkCast(makeStupa,g,0,14,-20,0.9,0);
  // кузня Кузьмы: горн, наковальня, навес с инструментом и деревянный молоточек
  {const fg=prkGroup(g,7.4,0,3.4);fg.rotation.y=-0.9;L.forge=fg;const st=prkM(0x6a5a52),wood=prkM(0x7a5230);
    prkAdd(fg,new THREE.BoxGeometry(1.6,1.0,1.2),st,0,0.5,-1.2);const coal=prkAdd(fg,new THREE.BoxGeometry(1.2,0.2,0.8),prkM(0xff8a30,{emissive:0xff5a10,emissiveIntensity:0.9}),0,1.05,-1.2);L.coal=coal;
    prkAdd(fg,new THREE.CylinderGeometry(0.22,0.3,2.4,6),st,0.5,2.0,-1.5);
    const anv=prkGroup(fg,0.2,0,0.6);prkAdd(anv,new THREE.CylinderGeometry(0.28,0.36,0.6,7),wood,0,0.3,0);prkAdd(anv,new THREE.BoxGeometry(0.75,0.28,0.38),prkM(0x3a3a44),0,0.74,0);
    const horn=prkAdd(anv,new THREE.ConeGeometry(0.16,0.4,6),prkM(0x3a3a44),0.5,0.74,0);horn.rotation.z=-Math.PI/2;L.anvilTop=prkP(O,0,0,0);
    // навес: два столба, перекладина, клещи, молоты и детский деревянный молоточек в паутинке
    const rack=prkGroup(fg,1.6,0,-0.4);rack.rotation.y=-1.1;L.rack=rack;for(const s of[-1,1])prkAdd(rack,new THREE.CylinderGeometry(0.07,0.08,2.4,6),wood,s*0.9,1.2,0);
    prkAdd(rack,new THREE.BoxGeometry(2.0,0.12,0.14),wood,0,2.3,0);prkAdd(rack,new THREE.BoxGeometry(1.9,0.9,0.06),prkM(0x5a3a20),0,1.65,-0.07);
    const tool=(x,len,head,col)=>{const t=prkGroup(rack,x,2.15,0.05);prkAdd(t,new THREE.CylinderGeometry(0.025,0.025,len,5),wood,0,-len/2,0);prkAdd(t,new THREE.BoxGeometry(head,0.1,0.1),prkM(col),0,-len,0);return t;};
    tool(-0.6,0.8,0.26,0x4a4a54);tool(-0.25,0.65,0.2,0x4a4a54);
    const kid=tool(0.35,0.42,0.17,0xd8b070);L.hamMats=kid.children.map(c=>{c.material=prkM(0xd8b070,{emissive:0xffa020,emissiveIntensity:0});return c.material;});L.kidHammer=kid;
    L.ham0={p:kid.position.clone(),r:kid.rotation.clone(),s:kid.scale.clone()};
    // волшебство молоточка: тёплое свечение, кольцо рун вокруг бойка, искорки — их зажигает сцена 2
    L.hamGlow=prkGlow(kid,0xffd070,0.5,0,-0.42,0,0);L.hamRune=prkAdd(kid,new THREE.TorusGeometry(0.13,0.01,4,26),prkM(0xffe08a,{emissive:0xffc040,emissiveIntensity:1}),0,-0.42,0);L.hamRune.castShadow=false;L.hamRune.visible=false;
    const web=new THREE.LineBasicMaterial({color:0xf0f0f0,transparent:true,opacity:0.55});L.web=[];for(let i=0;i<4;i++){const gg=new THREE.BufferGeometry().setFromPoints([PRV(0.2,2.24,0.08),PRV(0.48+i*0.04,2.05-i*0.12,0.08)]);const ln=new THREE.Line(gg,web);rack.add(ln);L.web.push(ln);}

    L.newLink=prkAdd(fg,new THREE.TorusGeometry(0.27,0.075,6,12),prkM(0xffd060,{emissive:0xff8a20,emissiveIntensity:1}),0.2,0.95,0.6);L.newLink.visible=false;L.fg=fg;}
  L.kuzma=prkCast(makeKuzma,g,6.35,0,3.53,1,0.6);   // у наковальни (не в группе кузни — KC.fcam берёт поворот g)
  // книга у корней
  {const bk=prkGroup(g,-1.9,0.12,3.0);bk.rotation.y=0.3;const pg=prkM(0xf4ead0),cv=prkM(0x8a2a22);L.book=bk;
    prkAdd(bk,new THREE.BoxGeometry(1.1,0.08,0.8),cv,0,0,0);const lp=prkGroup(bk,0,0.06,0),rp=prkGroup(bk,0,0.06,0);prkAdd(lp,new THREE.BoxGeometry(0.52,0.05,0.74),pg,-0.27,0,0);prkAdd(rp,new THREE.BoxGeometry(0.52,0.05,0.74),pg,0.27,0,0);
    L.bookL=lp;L.bookR=rp;lp.rotation.z=-1.4;rp.rotation.z=1.4;}
  // костёр
  {const f=prkGroup(g,0,0,5.2);L.fire=f;for(let i=0;i<4;i++){const lg=prkAdd(f,new THREE.CylinderGeometry(0.1,0.12,1.2,6),prkM(0x5a3a22),0,0.12,0);lg.rotation.set(Math.PI/2,i*0.8,0);}
    L.flames=[0,1,2].map(i=>{const m=prkAdd(f,new THREE.ConeGeometry(0.32-i*0.07,1.0-i*0.15,6),prkM(i?0xffd060:0xff7a20,{emissive:i?0xffa020:0xff4a00,emissiveIntensity:1}),Math.sin(i*2)*0.12,0.5,Math.cos(i*2)*0.12);m.castShadow=false;return m;});
    L.fireGlow=prkGlow(f,0xffa040,4,0,0.8,0,0.55);f.visible=false;}
  // дальний утёс, Кощей, ворон, иней
  {const c=prkGroup(g,-6,0,-70);L.cliff=c;for(let i=0;i<9;i++){const a=i*0.8;prkRock(c,Math.sin(a)*2.4,i*0.75-0.4,Math.cos(a)*1.6,2.1-i*0.13,0x3a3448);}
    prkRock(c,0,6.2,0,1.3,0x3a3448);L.ko=prkCast(makeKoschei,c,0,6.9,0,1,0);
    {const rg=new THREE.Group();L.ko.ring.add(rg);prkAdd(rg,new THREE.TorusGeometry(0.06,0.022,5,10),prkM(0xffc83a,{emissive:0x8a5a00,emissiveIntensity:0.9}),0,0,0);prkAdd(rg,new THREE.OctahedronGeometry(0.045),prkM(0xd02030,{emissive:0xb00010,emissiveIntensity:1}),0,0.03,0.05);L.koGem=prkGlow(rg,0xff4050,0.5,0,0.03,0.06,0.6);}
    L.koEyes=['eyeL','eyeR'].map(n=>L.ko.rig&&L.ko.rig[n]?prkGlow(L.ko.rig[n],0x8affa8,0.32,0,0,0.04,0):null).filter(Boolean);
    const rv=makeRaven();L.ko.g.add(rv.g);rv.g.position.set(0.42,2.25,-0.05);rv.g.scale.setScalar(0.45);rv.g.rotation.y=0.4;L.raven=rv;
    L.frost=[];const fm=new THREE.MeshBasicMaterial({color:0xd8f0ff,transparent:true,opacity:0.7,depthWrite:false});
    for(let i=0;i<7;i++){const d=new THREE.Mesh(new FIN.orig.Circle(0.6+i*0.25,10),fm);d.rotation.x=-Math.PI/2;d.position.set(Math.sin(i*2.1)*1.2,6.95+i*0.002,Math.cos(i*2.1)*1.0);d.scale.setScalar(0.01);c.add(d);L.frost.push(d);}}
  // небо: луна, солнце, звёзды
  L.moon=new THREE.Mesh(new FIN.orig.Circle(9,24),new THREE.MeshBasicMaterial({color:0xfff2c8,fog:false}));L.moon.position.set(-14,46,-250);L.moon.lookAt(O.x,0,O.z);g.add(L.moon);
  L.moonHalo=prkGlow(L.moon,0xfff0c0,40,0,0,0.5,0.4);
  L.sunDisc=new THREE.Mesh(new FIN.orig.Circle(14,24),new THREE.MeshBasicMaterial({color:0xfff0c0,fog:false}));L.sunDisc.position.set(-160,24,-260);L.sunDisc.lookAt(O.x,0,O.z);g.add(L.sunDisc);
  L.stars=prkStars(g,520,280,0,-20);
  // лиловая туча: клубы у утёса — поднимутся и поползут к дубу
  {const cg=prkGroup(g,-6,6,-96);L.cloud=cg;L.cloudBlobs=[];const cm=[prkM(0x4a3a7a,{emissive:0x1a1030}),prkM(0x5a4a8e,{emissive:0x201438}),prkM(0x3a2e66,{emissive:0x140c28})];
    for(let i=0;i<34;i++){const geo=new FIN.orig.Icosa(2.4+Math.random()*2.6,1);FIN.jitter(geo,0.3);const b=prkAdd(cg,geo,cm[i%3],(Math.random()-0.5)*30,Math.random()*9,(Math.random()-0.5)*12);b.castShadow=false;b.userData.p0=b.position.clone();b.userData.ph=Math.random()*6;b.scale.setScalar(0.01);L.cloudBlobs.push(b);}}
  // костлявая рука в перстне: рукав, ладонь, пальцы на шарнирах (сгибаются), перстень
  {const hg=prkGroup(g,0,40,0);L.hand=hg;hg.visible=false;const bone=prkM(0xd8d6c6),sl=prkM(0x2a1f3a);
    prkAdd(hg,new THREE.CylinderGeometry(0.7,0.95,16,8),sl,0,8.6,0);prkAdd(hg,new THREE.CylinderGeometry(0.62,0.7,0.5,8),prkM(0x4a3a5a),0,0.6,0);
    prkAdd(hg,new THREE.BoxGeometry(1.2,0.9,0.38),bone,0,0,0);L.fingers=[];
    for(let i=0;i<4;i++){const x=-0.45+i*0.3,p=prkGroup(hg,x,-0.45,0);prkAdd(p,new THREE.CylinderGeometry(0.08,0.1,0.7,6),bone,0,-0.35,0);const d=prkGroup(p,0,-0.7,0);prkAdd(d,new THREE.CylinderGeometry(0.06,0.08,0.6,6),bone,0,-0.3,0);
      prkAdd(d,new THREE.ConeGeometry(0.06,0.18,5),bone,0,-0.66,0).rotation.x=Math.PI;L.fingers.push({p,d});
      if(i===2){const ring=prkAdd(p,new THREE.TorusGeometry(0.13,0.05,6,12),prkM(0xffc83a,{emissive:0x8a5a00,emissiveIntensity:0.8}),0,-0.18,0);ring.rotation.x=Math.PI/2;
        const gem=prkAdd(p,new THREE.OctahedronGeometry(0.1),prkM(0xd02030,{emissive:0x900010,emissiveIntensity:1}),0,-0.18,0.15);L.ringGem=gem;}}
    const th=prkGroup(hg,0.65,-0.15,0.1);prkAdd(th,new THREE.CylinderGeometry(0.08,0.1,0.65,6),bone,0,-0.3,0);th.rotation.z=0.6;L.thumb=th;}
  // золотые буквы-искры (2-1, 2-2), пепел букв (6-6)
  L.letters=[];for(let i=0;i<22;i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:prkLetter(PRK_LET[i%PRK_LET.length]),transparent:true,depthWrite:false,fog:false}));s.scale.setScalar(0.42);s.visible=false;g.add(s);L.letters.push(s);}
  // искры разлетевшейся цепи
  L.sparks=[];for(let i=0;i<110;i++){const s=prkGlow(g,i%4?0xffd060:0xffffff,0.9+Math.random()*1.0,0,0,0,1);s.visible=false;L.sparks.push({s,v:PRV(0,0,0),life:0});}
  L.big=[];for(let i=0;i<5;i++){const s=prkGroup(g,0,0,0);prkGlow(s,0xffd060,2.6,0,0,0,1);prkAdd(s,new THREE.TorusGeometry(0.4,0.11,6,12),prkM(0xffd060,{emissive:0xffa020,emissiveIntensity:1}),0,0,0);s.visible=false;L.big.push(s);}
  // звено в темноте (1-1): сквозь него камера входит в сказку; гравюра дуба внутри
  {const hg=prkGroup(PRK.root,O.x,8,O.z+26);hg.scale.setScalar(0.55);prkAdd(hg,new THREE.TorusGeometry(0.9,0.22,8,24),gold,0,0,0);
    hg.add(new THREE.Mesh(new FIN.orig.Circle(0.62,20),new THREE.MeshLambertMaterial({map:prkIcon('oak'),emissive:0x5a3a00,emissiveIntensity:0.5,side:THREE.DoubleSide})));prkGlow(hg,0xffd070,3.2,0,0,-0.3,0.5);hg.visible=false;L.hero=hg;}
  // ступа летает кругами, русалка плещет, костёр дрожит, туча клубится
  PRK.ups.push((t,dt)=>{if(!g.visible)return;const st=L.stupa.g;if(st.visible){const a=t*0.32;st.position.set(Math.sin(a)*24,13+Math.sin(t*0.9)*1.2,Math.cos(a)*24-6);st.rotation.y=a+Math.PI/2;}
    if(L.mer.g.visible)L.mer.anim(t,dt);
    if(L.fire.visible)L.flames.forEach((f,i)=>{f.scale.set(1+Math.sin(t*13+i)*0.12,1+Math.sin(t*9+i*2)*0.22,1);});
    L.cloudBlobs.forEach(b=>{if(b.scale.x>0.05){b.position.y=b.userData.p0.y+Math.sin(t*0.7+b.userData.ph)*0.5;b.rotation.y+=dt*0.05;}});
    L.links.forEach(o=>{if(o.med)o.m.rotation.z=Math.sin(t*0.8+o.u*20)*0.08;});
    L.sparks.forEach(p=>{if(p.life>0){p.life-=dt;p.s.position.addScaledVector(p.v,dt);p.v.multiplyScalar(1-dt*0.25);p.s.material.opacity=Math.min(1,p.life/0.8);if(p.life<=0)p.s.visible=false;}});});
  return L;}

/* ---------- P: сосна-штаб снаружи ---------- */
function prkBuildP(){const O=PRO.P,g=prkGroup(PRK.root,O.x,O.y,O.z),P={g};PRK.P=P;const bark=prkM(0x7a4a2c),plank=prkM(0xa0703e),dk=prkM(0x5a3a1e),pine=[prkM(0x2e5a3a),prkM(0x3a6a40),prkM(0x264c32)];
  prkAdd(g,new THREE.CylinderGeometry(3.2,3.9,64,14),bark,0,-10,0);prkAdd(g,new THREE.CylinderGeometry(1.0,3.2,16,12),bark,0,30,0);
  for(let i=0;i<6;i++){const c=prkAdd(g,new THREE.ConeGeometry(7-i*0.9,6,9),pine[i%3],0,21+i*3.4,0);c.rotation.y=i*0.6;}
  // настил перед дверью, ветки-мастерская и огород, перила
  prkAdd(g,new THREE.BoxGeometry(14,0.5,6.8),plank,0,-0.25,5.6);prkCol(O,-7,7,-1,0,2.4,9.0);
  for(let x=-6.5;x<=6.6;x+=1)prkAdd(g,new THREE.BoxGeometry(0.05,0.02,6.6),dk,x,0.01,5.6);
  prkAdd(g,new THREE.BoxGeometry(7,0.5,3.6),plank,-10.5,-0.25,4.8);prkCol(O,-14,-7,-1,0,3.0,6.6);prkAdd(g,new THREE.CylinderGeometry(0.5,0.8,9,7),bark,-10.5,-1.1,4.8).rotation.z=Math.PI/2;
  prkAdd(g,new THREE.BoxGeometry(7,0.5,3.6),plank,10.5,-0.25,4.8);prkCol(O,7,14,-1,0,3.0,6.6);prkAdd(g,new THREE.CylinderGeometry(0.5,0.8,9,7),bark,10.5,-1.1,4.8).rotation.z=Math.PI/2;
  const rail=prkM(0x6b4424);prkAdd(g,new THREE.BoxGeometry(14,0.1,0.12),rail,0,0.95,9.0);for(let x=-7;x<=7.01;x+=1.4)prkAdd(g,new THREE.CylinderGeometry(0.06,0.07,0.95,6),rail,x,0.47,9.0);
  // дверь и окно в стволе
  const door=prkGroup(g,Math.sin(-0.42)*3.62,0,Math.cos(-0.42)*3.62);door.rotation.y=-0.42;P.door=door;prkAdd(door,new THREE.BoxGeometry(1.7,2.6,0.2),prkM(0x6b3f22),0,1.3,0);
  for(let x=-0.6;x<=0.61;x+=0.4)prkAdd(door,new THREE.BoxGeometry(0.05,2.4,0.24),dk,x,1.25,0.02);prkAdd(door,new THREE.SphereGeometry(0.09,8,6),prkM(COL.gold),0.6,1.25,0.15);P.doorPos=prkP(O,Math.sin(-0.42)*4.6,0,Math.cos(-0.42)*4.6);
  const win=prkGroup(g,Math.sin(0.4)*3.5,3.3,Math.cos(0.4)*3.5);win.rotation.y=0.4;P.win=win;P.winPos=prkP(O,Math.sin(0.4)*3.5,3.3,Math.cos(0.4)*3.5);
  prkAdd(win,new THREE.TorusGeometry(0.95,0.14,8,28),prkM(0x5a3a20),0,0,0.05);P.winM=new THREE.MeshBasicMaterial({color:0xffdca0});win.add(new THREE.Mesh(new FIN.orig.Circle(0.93,24),P.winM));
  {const fr=prkM(0x5a3a20);prkAdd(win,new THREE.BoxGeometry(1.8,0.07,0.06),fr,0,0,0.06);prkAdd(win,new THREE.BoxGeometry(0.07,1.8,0.06),fr,0,0,0.06);}
  P.winGlow=prkGlow(win,0xffc070,4.2,0,0,0.3,0.45);
  // гирлянда огоньков от двери к окну и флажок на гнезде
  P.bulbs=[];for(let i=0;i<12;i++){const u=i/11,x=lerp(P.door.position.x,win.position.x,u),z=lerp(P.door.position.z+0.3,win.position.z+0.3,u),y=2.9+Math.sin(u*Math.PI)*-0.5+u*0.6;
    const b=prkAdd(g,new THREE.SphereGeometry(0.08,6,5),new THREE.MeshBasicMaterial({color:[0xffd060,0xff7a7a,0x8ad0ff,0x9aff8a][i%4]}),x,y,z+0.15);b.castShadow=false;P.bulbs.push(b);}
  // гнездо Пелагеи на макушке (на ветке), верёвочная лестница
  const nest=prkGroup(g,1.6,11,5.6);P.nest=nest;prkAdd(nest,new THREE.CylinderGeometry(1.5,1.2,0.5,12),plank,0,-0.25,0);prkCol(O,0.1,3.1,10,11,4.1,7.1);
  prkAdd(g,new THREE.CylinderGeometry(0.35,0.6,4.2,7),bark,1.2,10.6,3.6).rotation.x=Math.PI/2;
  for(let i=0;i<10;i++){const a=i/10*6.283;prkAdd(nest,new THREE.CylinderGeometry(0.05,0.05,0.7,5),rail,Math.sin(a)*1.35,0.35,Math.cos(a)*1.35);}
  {const pole=prkAdd(nest,new THREE.CylinderGeometry(0.05,0.05,3,5),rail,-1.0,1.5,-0.7);P.flag=prkGroup(nest,-1.0,2.6,-0.7);
    const fl=new THREE.Mesh(new THREE.PlaneGeometry(1.2,0.7,6,1),new THREE.MeshLambertMaterial({side:THREE.DoubleSide,map:prkTex(128,80,(x,w,h)=>{x.fillStyle='#2f7a3a';x.fillRect(0,0,w,h);x.strokeStyle='#ffd24a';x.lineWidth=6;x.strokeRect(4,4,w-8,h-8);
      x.fillStyle='#ffd24a';x.font='bold 40px Georgia, serif';x.textAlign='center';x.textBaseline='middle';x.fillText('ЛП',w/2,h/2+2);})}));fl.position.x=0.62;P.flag.add(fl);P.flagM=fl;}
  {const rope=prkM(0xc8a070);for(const s of[-1,1])prkAdd(g,new THREE.CylinderGeometry(0.03,0.03,11,4),rope,3.6+s*0.3,5.2,4.6);for(let y=0.6;y<10.6;y+=0.6)prkAdd(g,new THREE.BoxGeometry(0.66,0.06,0.08),rope,3.6,y,4.6);}
  // мастерская Прошки: верстак, самокат, пружина; огород Йоши: бочки, росток
  prkAdd(g,new THREE.BoxGeometry(1.6,0.8,0.8),plank,-12.2,0.4,4.2);P.sc=makeScooter();P.sc.g.userData.prkCast=true;g.add(P.sc.g);P.sc.g.position.set(-11.6,0,5.6);P.sc.g.rotation.y=1.2;
  // на верстаке — чертёж и шестерёнки
  {const bp=new THREE.Mesh(new THREE.PlaneGeometry(0.9,0.6),new THREE.MeshLambertMaterial({map:prkTex(128,90,(x,w,h)=>{x.fillStyle='#2a5a9a';x.fillRect(0,0,w,h);x.strokeStyle='#d8ecff';x.lineWidth=2;
      x.beginPath();x.arc(36,52,18,0,7);x.stroke();x.beginPath();x.moveTo(36,52);x.lineTo(96,22);x.stroke();x.strokeRect(20,66,90,14);for(let i=0;i<5;i++){x.beginPath();x.arc(36,52,6+i*3,0,7);x.stroke();}
      x.font='bold 12px Georgia';x.fillStyle='#d8ecff';x.fillText('ПЛАН',78,62);})}));bp.rotation.x=-Math.PI/2;bp.rotation.z=0.2;bp.position.set(-12.2,0.81,4.2);g.add(bp);}
  // катапульта-«подавалка» Прошки: основание, две шестерни, пружина, рычаг с ложкой, ручка спуска; P.cat.fire(k) — выстрел (0…1)
  {const c=prkGroup(g,-8.4,0,5.0);c.rotation.y=0;c.scale.setScalar(1.35);P.cat=c;const wd=prkM(0xc48e56),ir=prkM(0x9aa2b0),rd=prkM(0xd84a30),gd=prkM(0xf6be3e,{emissive:0x5a3a00,emissiveIntensity:0.3});
    prkAdd(c,new THREE.BoxGeometry(0.95,0.22,0.6),wd,0,0.11,0);for(const z of[-0.22,0.22])prkAdd(c,new THREE.BoxGeometry(0.12,0.5,0.08),wd,0,0.42,z);
    P.gears=[[0.32,0.42,0.33,0.2,gd],[0.12,0.3,0.33,0.13,ir]].map(([x,y,z,r,m])=>{const ge=prkGroup(c,x,y,z);prkAdd(ge,new THREE.CylinderGeometry(r,r,0.05,12),m,0,0,0).rotation.x=Math.PI/2;
      for(let i=0;i<8;i++){const a=i/8*6.283;prkAdd(ge,new THREE.BoxGeometry(0.06,0.06,0.05),m,Math.cos(a)*(r+0.025),Math.sin(a)*(r+0.025),0).rotation.z=a;}prkAdd(ge,new THREE.CylinderGeometry(0.03,0.03,0.08,6),rd,0,0,0).rotation.x=Math.PI/2;return ge;});
    P.coil=prkGroup(c,-0.18,0.22,0);for(let i=0;i<6;i++)prkAdd(P.coil,new THREE.TorusGeometry(0.1,0.022,5,12),prkM(0xc8d0d8),0,i*0.045,0).rotation.x=Math.PI/2;
    const arm=prkGroup(c,0,0.62,0);P.catArm=arm;prkAdd(arm,new THREE.BoxGeometry(0.95,0.07,0.09),wd,-0.47,0,0);const cup=prkGroup(arm,-0.95,0.06,0);prkAdd(cup,new THREE.CylinderGeometry(0.17,0.09,0.1,10,1,true),prkM(0xd8a050,{side:THREE.DoubleSide}),0,0,0);
    prkAdd(cup,new THREE.CylinderGeometry(0.09,0.09,0.02,10),prkM(0xd8a050),0,-0.05,0);P.cup=cup;arm.rotation.z=0.25;
    const lv=prkGroup(c,0.42,0.22,-0.2);P.lever=lv;prkAdd(lv,new THREE.CylinderGeometry(0.025,0.025,0.5,5),ir,0,0.25,0);prkAdd(lv,new THREE.SphereGeometry(0.06,8,6),rd,0,0.52,0);lv.rotation.z=0.5;}
  // яблоко — летит из катапульты Потапу в лапы
  P.apple=prkGroup(g,0,0,0);prkAdd(P.apple,new THREE.SphereGeometry(0.15,10,8),prkM(0xe0302a,{emissive:0x400000,emissiveIntensity:0.3}),0,0,0).scale.set(1,0.9,1);
  prkAdd(P.apple,new THREE.CylinderGeometry(0.012,0.012,0.08,4),prkM(0x5a3a1e),0,0.15,0);{const lf=prkAdd(P.apple,new THREE.SphereGeometry(0.05,5,3),prkM(0x5aa040),0.04,0.16,0);lf.scale.set(1,0.3,0.6);}
  // гаечный ключ Прошки (в лапе)
  P.wrench=new THREE.Group();{const wm=prkM(0xd8dee8,{emissive:0x303840,emissiveIntensity:0.4});prkAdd(P.wrench,new THREE.BoxGeometry(0.05,0.4,0.06),wm,0,-0.12,0);for(const x of[-0.055,0.055])prkAdd(P.wrench,new THREE.BoxGeometry(0.04,0.11,0.06),wm,x,-0.36,0);}prkNoBatch(P.wrench);
  P.barrels=[];for(const[x,z]of[[9.2,3.8],[11.6,3.9],[13.0,3.9]]){const b=prkGroup(g,x,0,z);b.scale.setScalar(0.62);prkAdd(b,new THREE.CylinderGeometry(0.55,0.5,0.9,10),prkM(0x8a5a30),0,0.45,0);prkAdd(b,new THREE.CylinderGeometry(0.5,0.5,0.06,10),prkM(0x4a2e18),0,0.9,0);
    for(let i=0;i<3;i++)prkAdd(b,new THREE.ConeGeometry(0.1,0.3,4),prkM(0x5aa040),Math.sin(i*2)*0.25,1.05,Math.cos(i*2)*0.25);P.barrels.push(b);}
  {const b=prkGroup(g,10.5,0,6.45);prkAdd(b,new THREE.CylinderGeometry(0.34,0.28,0.36,10),prkM(0x9a5a3a),0,0.18,0);prkAdd(b,new THREE.CylinderGeometry(0.3,0.3,0.04,10),prkM(0x4a2e18),0,0.36,0);}
  // засохший цветок в горшке: стебель поник, листья бурые, бутон закрыт; P.bloom(k) — оживает от воды Йоши (0…1)
  {const f=prkGroup(g,10.5,0.36,6.45);P.flw=f;const sm=prkM(0x8a7a50),lm=prkM(0x8a7048),pm=prkM(0x9a8070),cm=prkM(0x7a6040);P.flwM={sm,lm,pm,cm};
    const st=prkGroup(f,0,0,0);P.stem=st;prkAdd(st,new THREE.CylinderGeometry(0.025,0.035,0.55,5),sm,0,0.27,0);
    P.leaves=[1,-1].map((sg,i)=>{const l=prkGroup(st,0,0.16+i*0.12,0);const m=prkAdd(l,new THREE.SphereGeometry(0.09,6,4),lm,sg*0.09,0,0);m.scale.set(1,0.25,0.5);l.rotation.z=-sg*0.9;return l;});
    const hd=prkGroup(st,0,0.56,0);P.flwHead=hd;prkAdd(hd,new THREE.SphereGeometry(0.07,8,6),cm,0,0,0);
    P.petals=[];for(let i=0;i<8;i++){const pv=prkGroup(hd,0,0,0);pv.rotation.y=i/8*6.283;const pt=prkAdd(pv,new THREE.SphereGeometry(0.075,6,4),pm,0,0,0.1);pt.scale.set(0.7,0.22,1.25);pv.userData.pt=pt;P.petals.push(pv);}
    P.bloom=k=>{const e=prkE.back(clamp(k,0,1)),c=clamp(k*1.4,0,1);st.rotation.z=lerp(1.25,0,e);hd.rotation.z=lerp(0.6,0,e);P.leaves.forEach((l,i)=>{l.rotation.z=(i?-1:1)*lerp(-0.9,0.5,e);});
      sm.color.setHex(0x8a7a50).lerp(new THREE.Color(0x4cb44a),c);lm.color.setHex(0x8a7048).lerp(new THREE.Color(0x6ac04a),c);pm.color.setHex(0x9a8070).lerp(new THREE.Color(0xff7ea4),c);cm.color.setHex(0x7a6040).lerp(new THREE.Color(0xf8d03c),c);
      const op=CINE.E.outElastic?CINE.E.outElastic(clamp((k-0.35)/0.65,0,1)):prkE.back(clamp((k-0.35)/0.65,0,1));P.petals.forEach(pv=>{pv.rotation.x=lerp(-1.3,0.15,op);});hd.scale.setScalar(lerp(0.8,1.35,prkE.back(clamp((k-0.3)/0.7,0,1))));};
    P.bloom(0);}
  // лейка Йоши (в лапе)
  P.can=new THREE.Group();{const cm=prkM(0x4a9ad8);prkAdd(P.can,new THREE.CylinderGeometry(0.09,0.1,0.15,10),cm,0,0,0);const sp=prkAdd(P.can,new THREE.CylinderGeometry(0.012,0.025,0.2,6),cm,0,0.03,0.13);sp.rotation.x=Math.PI/2-0.6;
    prkAdd(P.can,new THREE.TorusGeometry(0.06,0.012,4,10,Math.PI),cm,0,0.08,-0.04).rotation.y=Math.PI/2;P.canTip=new THREE.Object3D();P.canTip.position.set(0,0.09,0.22);P.can.add(P.canTip);}prkNoBatch(P.can);
  P.drops=[];for(let i=0;i<14;i++){const d=prkAdd(g,new THREE.SphereGeometry(0.03,5,4),new THREE.MeshBasicMaterial({color:0x8ad8ff}),0,0,0);d.castShadow=false;d.visible=false;P.drops.push(d);}
  // Тишка: ночной колпак с помпоном (на голове, по кости), подушка в обнимку, «z-z-z» над головой
  P.tish=prkCast(makeTishka,g,0,0,0,1,0);{const T=P.tish,hb=T.rig&&T.rig.head||T.g,cp=new THREE.Group(),bm=prkM(0x5a8ae0),wm=prkM(0xfff8e8);P.cap=cp;
    prkAdd(cp,new THREE.TorusGeometry(0.13,0.035,5,14),wm,0,0,0).rotation.x=Math.PI/2;prkAdd(cp,new THREE.ConeGeometry(0.13,0.2,9),bm,0,0.1,0);
    const tip=prkGroup(cp,0,0.19,0);tip.rotation.z=-1.0;prkAdd(tip,new THREE.ConeGeometry(0.07,0.2,8),bm,0,0.09,0);prkAdd(tip,new THREE.SphereGeometry(0.045,8,6),wm,0,0.2,0);P.capTip=tip;
    cp.position.set(0,0.11,-0.02);cp.rotation.set(-0.15,0,-0.3);hb.add(cp);
    const pl=new THREE.Group();P.pillow=pl;const pm=prkAdd(pl,new THREE.SphereGeometry(0.17,10,6),prkM(0xf6f0e4),0,0,0);pm.scale.set(1.25,0.85,0.45);
    for(const s of[-1,1])prkAdd(pl,new THREE.SphereGeometry(0.035,5,4),prkM(0xf6f0e4),s*0.2,s*0.1,0);(T.rig&&T.rig.hips||T.g).add(pl);pl.position.set(0,0.0,0.19);
    P.zzz=[0,1,2].map(i=>{const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:prkLetter('z'),color:0xb8d8ff,transparent:true,depthWrite:false,fog:false,opacity:0}));sp.scale.setScalar(0.22+i*0.06);g.add(sp);return sp;});
    prkNoBatch(T.g);}
  // подзорная труба и тетрадка Пелагеи
  P.glass=new THREE.Group();prkAdd(P.glass,new THREE.CylinderGeometry(0.06,0.09,0.6,8),prkM(0xc89a3a,{emissive:0x402a00}),0,0,0).rotation.x=Math.PI/2;
  // тетрадь Пелагеи: раскрытая, на правой странице сказка пишется буква за буквой (P.page(n, зачёркнуто)), на левой — рисунок царства; перо водит по строке
  P.book=new THREE.Group();{const cv=prkM(0x8a2a22);prkAdd(P.book,new THREE.BoxGeometry(0.62,0.03,0.42),cv,0,-0.02,0);
    const mk=(draw)=>{const c=document.createElement('canvas');c.width=256;c.height=176;const t=new THREE.CanvasTexture(c);t.anisotropy=4;draw(c.getContext('2d'),256,176);return {c,t};};
    const paper=(x,w,h)=>{x.fillStyle='#fbf6e6';x.fillRect(0,0,w,h);x.strokeStyle='rgba(90,120,200,.35)';x.lineWidth=1.5;for(let y=34;y<h;y+=26){x.beginPath();x.moveTo(8,y);x.lineTo(w-8,y);x.stroke();}};
    const L0=mk((x,w,h)=>{paper(x,w,h);x.strokeStyle='#5a3a8a';x.lineWidth=3;x.beginPath();x.moveTo(60,140);x.lineTo(60,80);x.lineTo(90,55);x.lineTo(120,80);x.lineTo(120,140);x.closePath();x.stroke();
      x.beginPath();x.moveTo(120,140);x.lineTo(120,95);x.lineTo(150,70);x.lineTo(180,95);x.lineTo(180,140);x.stroke();x.beginPath();x.arc(200,40,14,0,7);x.stroke();x.fillStyle='#f6be3e';x.beginPath();x.arc(90,45,6,0,7);x.fill();});
    const R0=mk(paper);P.pageTex=R0;const TXT=['В некотором','царстве,','в некотором','государстве…'];
    P.page=(n,cross)=>{const k=Math.floor(n),key=k+'|'+cross;if(P.page.k===key)return;P.page.k=key;const x=R0.c.getContext('2d');paper(x,256,176);x.fillStyle='#3a2a6a';x.font='italic 22px Georgia, serif';let left=k;
      TXT.forEach((ln,i)=>{if(left<=0)return;const s=ln.slice(0,left);left-=ln.length;x.fillText(s,14,30+i*26);});
      if(cross>0){x.strokeStyle='#c0302a';x.lineWidth=4;x.beginPath();for(let i=0;i<4;i++){const y=22+i*26,len=Math.min(1,cross*4-i);if(len<=0)break;x.moveTo(12,y);x.lineTo(12+220*len,y+(i%2?4:-3));}x.stroke();}R0.t.needsUpdate=true;};
    // страницы — к зрителю (тетрадь развёрнута к камере, Пелагея пишет «вверх ногами» — как в мультфильме): верх строк — к −z, рисунок — слева (−x)
    for(const[sx,T]of[[-1,L0],[1,R0]]){const pg=new THREE.Mesh(new THREE.PlaneGeometry(0.29,0.4),new THREE.MeshLambertMaterial({map:T.t}));pg.rotation.set(-Math.PI/2,sx*0.08,0);pg.position.set(sx*0.152,0.003,0);P.book.add(pg);}
    // точка на правой странице: строка i (0…3), доля строки u (0…1)
    P.pageAt=(i,u)=>PRV(0.152+(lerp(0.06,0.92,u)-0.5)*0.29,0.01,-0.2+(30+i*26-6)/176*0.4);
    P.page(0,0);
    const q=new THREE.Group();P.quill=q;const fm=prkM(0xfff4f8);const vane=prkAdd(q,new THREE.SphereGeometry(0.05,6,4),fm,0,0.17,0);vane.scale.set(0.5,2.6,0.18);
    prkAdd(q,new THREE.CylinderGeometry(0.006,0.008,0.3,4),prkM(0xd8c8a0),0,0.12,0);prkAdd(q,new THREE.ConeGeometry(0.01,0.04,4),prkM(0x2a2a40),0,-0.03,0).rotation.x=Math.PI;q.rotation.set(0.5,0,-0.45);P.book.add(q);
    P.ball=prkAdd(g,new THREE.IcosahedronGeometry(0.07,0),prkM(0xfbf6e6),0,0,0);P.ball.visible=false;}prkNoBatch(P.book);
  // лес мира 1 внизу: холмистая долина с ручьём, ели и сосны кита до горизонта (верхушки у ствола — ниже настила), корни сосны, сосны-соседки
  {const F=prkGroup(g,0,0,0);F.userData.prkCast=true;P.forest=F;const riv=(x,z)=>Math.abs(x-58-Math.sin(z*0.013)*36)<4.5&&Math.hypot(x,z)>20;
    const hl=(x,z)=>{const r=Math.hypot(x,z);return Math.sin(x*0.021)*Math.cos(z*0.017)*2.5+Math.max(0,(r-110)/150)**2*28;};
    const near=[[-34,-24,7.2],[40,-30,6.6],[-48,22,6.2],[30,36,6.8],[8,-56,7.4],[-20,48,6.0]].map(([x,z,sc])=>({name:'firTall',v:0,x,y:-21+hl(x,z)-0.2,z,s:sc*1.15,ry:x,tint:0.95}));
    prkForest(F,{x0:-270,x1:270,z0:-270,z1:270,y:-21,cell:6.5,step:5.0,hill:hl,river:riv,seed:11,pal:PAL.moss,extra:near,
      size:(x,z,Rn)=>{const r=Math.hypot(x,z);if(r<5.4)return 0;if(r>70&&Rn()>Math.max(0.2,1-(r-70)/170))return 0;return r<16?2.6+Rn()*0.6:r<70?3.0+Rn()*0.8:3.3+Rn()*1.3;}});
    for(let i=0;i<9;i++){const a=i/9*6.283+0.2;const r=prkAdd(g,new THREE.ConeGeometry(1.1,5.5,5),bark,Math.sin(a)*3.9,-20,Math.cos(a)*3.9);r.rotation.x=Math.cos(a)*1.15;r.rotation.z=-Math.sin(a)*1.15;}}
  // ночь: звёзды, звёздный дождь, искра к сосне, ворон за ней
  P.stars=prkStars(g,480,260,0,0);P.stars.visible=false;P.star=prkGlow(g,0xfff2c0,3,-8,34,-60,0);
  P.rain=[];for(let i=0;i<26;i++){const s=prkGroup(g,0,0,0);prkGlow(s,0xffe080,0.9,0,0,0,1);const tr=prkAdd(s,new THREE.CylinderGeometry(0.02,0.11,4,5),new THREE.MeshBasicMaterial({color:0xffe9a0,transparent:true,opacity:0.6,fog:false}),0,0,0);tr.castShadow=false;
    s.visible=false;P.rain.push({s,tr,p0:PRV(0,0,0),v:PRV(0,0,0),t:-1});}
  P.zv=prkGroup(g,0,0,0);prkGlow(P.zv,0xffd060,2.2,0,0,0,1);prkAdd(P.zv,new THREE.TorusGeometry(0.22,0.06,6,12),prkM(0xffd060,{emissive:0xffa020,emissiveIntensity:1}),0,0,0);P.zv.visible=false;
  P.rv=makeRaven();P.rv.g.userData.prkCast=true;g.add(P.rv.g);P.rv.g.scale.setScalar(0.6);P.rv.g.visible=false;
  {const cg=prkGroup(g,0,30,-80);P.cloud=cg;const cm=prkM(0x3a2e66,{emissive:0x140c28});for(let i=0;i<16;i++){const geo=new FIN.orig.Icosa(5+Math.random()*4,1);FIN.jitter(geo,0.4);const b=prkAdd(cg,geo,cm,(Math.random()-0.5)*60,Math.random()*10,(Math.random()-0.5)*20);b.castShadow=false;}cg.visible=false;}
  PRK.ups.push((t,dt)=>{if(!g.visible)return;P.flagM.rotation.y=Math.sin(t*2.4)*0.25;P.bulbs.forEach((b,i)=>{b.visible=Math.sin(t*3+i*1.7)>-0.6;});
    P.rain.forEach(r=>{if(r.t>=0){r.t+=dt;r.s.position.addScaledVector(r.v,dt);if(r.t>2.6){r.t=-1;r.s.visible=false;}}});});
  return P;}

/* ---------- пять миров ---------- */
function prkFall(par,col){const s=prkGroup(par,0,0,0);prkGlow(s,col||0xffd060,2.2,0,0,0,1);prkAdd(s,new THREE.TorusGeometry(0.24,0.07,6,12),prkM(0xffd060,{emissive:0xffa020,emissiveIntensity:1}),0,0,0);
  const tr=prkAdd(s,new THREE.CylinderGeometry(0.02,0.14,3,5),new THREE.MeshBasicMaterial({color:0xffe9a0,transparent:true,opacity:0.55,fog:false}),0,1.5,0);tr.castShadow=false;s.userData.tr=tr;s.visible=false;return s;}
function prkBuildW(){const D=PRK.Wd={};
  // 1 · Дремучий лес (1-Б): ели смыкаются, из чащи встаёт Леший-Путаник выше елей, болотные огоньки, избушка поворачивается, клубок в траве
  {const O=PRO.W1,g=prkGroup(PRK.root,O.x,O.y,O.z),w={g};D.w1=w;const gm=prkM(0x2e4a2a);prkAdd(g,new THREE.CylinderGeometry(34,34,1,20),gm,0,-0.5,0);
    for(let i=0;i<46;i++){const a=i*2.399,r=10+(i*29%26),x=Math.sin(a)*r,z=Math.cos(a)*r-6;if(Math.abs(x)<6&&z>-17)continue;prkFir(g,x,0,z,7+(i%4)*1.5,[0x1f4030,0x2a5038,0x1a3a2a][i%3]);}
    w.walk=[[-7.5,-3],[7.2,-3.4],[-6.2,-11],[6.6,-11.6]].map(([x,z])=>{const f=prkFir(g,x,0,z,7.5,0x2a5038);f.userData.p0=f.position.clone();return f;});
    w.lesh=prkCast(()=>makeLeshy(3.4),g,0.4,-12,-15,0,0);w.lesh.g.userData.y0=0;   // встаёт из-под земли (tick сцены 6)
    w.wisp=[];for(let i=0;i<9;i++){const s=prkGlow(g,[0x8af0ff,0xb8ff8a,0x6ad8ff][i%3],0.9,0,0,0,0.9);s.userData={a:i*0.7,r:3.5+(i%4)*1.6,h:0.8+(i%3)*1.1,sp:0.5+(i%3)*0.25};w.wisp.push(s);}
    PRK.ups.push(t=>{if(!g.visible)return;w.wisp.forEach(s=>{const u=s.userData,a=t*u.sp+u.a;s.position.set(Math.sin(a)*u.r,u.h+Math.sin(t*2+u.a)*0.4,Math.cos(a)*u.r*0.6-7);});});
    w.hut=makeHut();w.hut.g.userData.prkCast=true;g.add(w.hut.g);(w.hut.g||w.hut).position.set(4.6,0,-7);(w.hut.g||w.hut).rotation.y=-0.4;
    const clew=prkAdd(g,new THREE.SphereGeometry(0.32,8,6),prkM(0xd03030),1.4,0.32,-3.4);for(let i=0;i<3;i++)prkAdd(g,new THREE.TorusGeometry(0.33,0.02,4,12),prkM(0xf06060),1.4,0.32,-3.4).rotation.set(i,i*1.3,0);
    w.sp=prkFall(g);}
  // 2 · Подводный Китеж (2-Б): купола, Водяной верхом на соме кружит над городом, колокол без звона, гусли со струной, рыбы, пузыри, лучи сверху
  {const O=PRO.W2,g=prkGroup(PRK.root,O.x,O.y,O.z),w={g};D.w2=w;prkAdd(g,new THREE.CylinderGeometry(34,34,1,20),prkM(0xb8b08a),0,-0.5,0);
    const wall=prkM(0xf0ece0),dome=prkM(0xffc83a,{emissive:0x6a4a00,emissiveIntensity:0.5});
    for(const[x,z,s]of[[-7,-16,1.3],[0,-22,1.7],[8,-17,1.2],[14,-26,1.0],[-14,-25,1.1]]){const c=prkGroup(g,x,0,z);c.scale.setScalar(s);prkAdd(c,new THREE.BoxGeometry(3,4,3),wall,0,2,0);prkAdd(c,new THREE.CylinderGeometry(0.9,0.9,1.6,10),wall,0,4.8,0);
      prkAdd(c,new THREE.SphereGeometry(1.05,10,8),dome,0,6.0,0);prkAdd(c,new THREE.ConeGeometry(0.5,1.2,8),dome,0,7.2,0);}
    const bel=prkGroup(g,4.2,0,-7);for(const s of[-1,1])prkAdd(bel,new THREE.BoxGeometry(0.4,4,0.4),wall,s*1.3,2,0);prkAdd(bel,new THREE.BoxGeometry(3.1,0.4,0.6),wall,0,4.1,0);
    w.bell=prkGroup(bel,0,3.9,0);prkAdd(w.bell,new THREE.CylinderGeometry(0.35,0.85,1.3,12,1,true),prkM(0xc89a3a,{side:THREE.DoubleSide}),0,-0.7,0);
    const gus=prkGroup(g,-1.4,0.25,-4.2);gus.rotation.y=0.4;prkAdd(gus,new THREE.BoxGeometry(1.6,0.18,0.9),prkM(0x9a6a3c),0,0,0);w.str=[];for(let i=0;i<5;i++){const s=prkAdd(gus,new THREE.BoxGeometry(1.5,0.02,0.02),prkM(0xf0e0b0),0,0.11,-0.32+i*0.16);w.str.push(s);}
    w.fish=[];for(let i=0;i<9;i++){const f=prkGroup(g,0,0,0);prkAdd(f,new THREE.SphereGeometry(0.3,7,5),prkM([0xf08a3a,0x8ac8f0,0xf0d040][i%3]),0,0,0).scale.set(1.6,0.8,0.5);prkAdd(f,new THREE.ConeGeometry(0.2,0.35,4),prkM(0xf0a050),-0.55,0,0).rotation.z=Math.PI/2;
      f.userData={r:4+i*1.4,h:2+(i%4)*1.3,ph:i*0.9,sp:0.4+(i%3)*0.15};w.fish.push(f);}
    w.bub=[];for(let i=0;i<24;i++){const b=prkAdd(g,new THREE.SphereGeometry(0.08+Math.random()*0.08,6,4),new THREE.MeshBasicMaterial({color:0xd8f8ff,transparent:true,opacity:0.6}),(Math.random()-0.5)*14,Math.random()*10,(Math.random()-0.5)*12-4);b.castShadow=false;w.bub.push(b);}
    w.som=FIN.k2v.som();w.som.g.userData.prkCast=true;g.add(w.som.g);w.som.g.scale.setScalar(1.15);w.vod=FIN.k2v.rig(w.som.saddle,{seed:1});FIN.k2v.set(w.vod,'ride','angry');
    for(let i=0;i<6;i++){const r=prkAdd(g,new THREE.CylinderGeometry(0.5,2.2,26,8,1,true),new THREE.MeshBasicMaterial({color:0xc8f8ff,transparent:true,opacity:0.07,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,fog:false}),-12+i*5,12,-14+(i%3)*4);r.rotation.z=0.25;r.castShadow=false;}
    w.somAt=a=>{const S=w.som;S.g.position.set(Math.sin(a)*6,1.9+Math.sin(a*2)*0.3,Math.cos(a)*3.5-10);S.g.rotation.y=a+Math.PI/2;};w.somAt(-0.6);
    w.sp=prkFall(g);PRK.ups.push((t,dt)=>{if(!g.visible)return;try{w.som.tick(dt);FIN.k2v.anim(w.vod,dt);}catch(e){}w.fish.forEach(f=>{const u=f.userData,a=t*u.sp+u.ph;f.position.set(Math.sin(a)*u.r,u.h,Math.cos(a)*u.r-6);f.rotation.y=a+Math.PI;});w.bub.forEach(b=>{b.position.y+=dt*1.2;if(b.position.y>11)b.position.y=0;});});}
  // 3 · Небесный сад (3-Б): облака под ногами, яблони сереют, Жар-птица тускнеет, перо падает; за садом — гнездо на семи дубах, Соловей-Разбойник свистит
  {const O=PRO.W3,g=prkGroup(PRK.root,O.x,O.y,O.z),w={g};D.w3=w;const cl=prkM(0xf4f0ff,{emissive:0x302a50});
    for(let i=0;i<40;i++){const geo=new FIN.orig.Icosa(2+Math.random()*2.5,1);FIN.jitter(geo,0.3);const b=prkAdd(g,geo,cl,(Math.random()-0.5)*40,-1.2+Math.random()*0.6,(Math.random()-0.5)*30-6);b.scale.y=0.45;}
    for(let i=0;i<14;i++){const geo=new FIN.orig.Icosa(2+Math.random()*2,1);FIN.jitter(geo,0.3);const b=prkAdd(g,geo,cl,(Math.random()-0.5)*20,-7-Math.random()*3,(Math.random()-0.5)*16);b.scale.y=0.5;}
    w.leaf=prkM(0x5ab04a);w.trees=[[-4,-6],[3.5,-7.5],[-1,-11],[6,-12]].map(([x,z])=>{const t=prkGroup(g,x,0,z);prkAdd(t,new THREE.CylinderGeometry(0.22,0.32,2,7),prkM(0x6b4a2b),0,1,0);
      const geo=new FIN.orig.Icosa(1.5,1);FIN.jitter(geo,0.2);prkAdd(t,geo,w.leaf,0,2.6,0);for(let i=0;i<5;i++)prkAdd(t,new THREE.SphereGeometry(0.17,6,4),prkM(0xf0c040,{emissive:0x806000}),Math.sin(i*1.3)*1.2,2.4+Math.cos(i*2)*0.5,Math.cos(i*1.3)*1.2);return t;});
    w.fb=prkCast(()=>makeFirebird({}),g,-1,2.2,-6.4,0.8,0.3);w.fb.g.traverse(c=>{if(c.material&&c.material.emissive){c.userData.e0=c.material.emissiveIntensity;c.userData.c0=c.material.color.clone();}});
    {const N=prkGroup(g,2,-2.6,-15),oak=prkM(0x5a3d22),crown=prkM(0x4f7a2c);
      for(let i=0;i<7;i++){const a=i/7*6.283+0.2,x=Math.cos(a)*4.2,z=Math.sin(a)*2.6;prkAdd(N,new THREE.CylinderGeometry(0.6,0.9,9,8),oak,x,1.5,z);
        for(let k=0;k<2;k++){const geo=new FIN.orig.Icosa(1.9+k*0.4,1);FIN.jitter(geo,0.25);prkAdd(N,geo,crown,x*1.15+(k-0.5)*1.2,8.4+k*1.3,z*1.15-2.4);}}
      prkAdd(N,new THREE.CylinderGeometry(4.6,3.4,1.0,18),prkM(0x8a6a40),0,5.4,0);for(let i=0;i<4;i++){const t=prkAdd(N,new THREE.TorusGeometry(4.4-i*0.9,0.16,5,30),prkM(i%2?0x9a7a48:0x6a4a2a),0,5.95,0);t.rotation.x=Math.PI/2;}
      w.sol=prkCast(()=>makeSolovei(),N,0,5.9,2.4,2.1,0);   // лицом к зрителю (камера сада — со стороны +z)
      w.gust=[];for(let i=0;i<10;i++){const m=prkAdd(N,new THREE.TorusGeometry(1.2+i*0.35,0.05,4,20,2.2),new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0,depthWrite:false,fog:false}),0,8,2);m.castShadow=false;m.userData.ph=i/10;w.gust.push(m);}}
    w.feather=prkAdd(g,new THREE.ConeGeometry(0.14,0.7,4),prkM(0xff9a30,{emissive:0xff5a00,emissiveIntensity:0.9}),-1,3,-6);w.feather.visible=false;w.sp=prkFall(g);}
  // 4 · Огненная Смородина (4-Б): лавовая река, Калинов мост, три головы Горыныча из пара — лбами и огнём в небо, искры, клещи на наковальне
  {const O=PRO.W4,g=prkGroup(PRK.root,O.x,O.y,O.z),w={g};D.w4=w;
    const lava=prkAdd(g,new THREE.PlaneGeometry(80,9,20,2),prkM(0xff7a20,{emissive:0xff4a00,emissiveIntensity:0.9}),0,-0.6,-8);lava.rotation.x=-Math.PI/2;lava.castShadow=false;
    for(const s of[-1,1]){const b=prkAdd(g,new THREE.BoxGeometry(80,2,14),prkM(0x3a2a26),0,-1,-8+s*11.5);b.receiveShadow=true;}
    const br=prkGroup(g,0,0,-8);for(let i=0;i<12;i++){const u=i/11,z=-4.8+u*9.6;prkAdd(br,new THREE.BoxGeometry(3,0.2,0.75),prkM(0x8a4a2a),0,0.2+Math.sin(u*Math.PI)*1.6,z);}
    for(const s of[-1,1])for(const z of[-4.6,0,4.6])prkAdd(br,new THREE.CylinderGeometry(0.1,0.12,2.2,5),prkM(0x6a3a1e),s*1.5,1+(z===0?1.4:0),z);
    w.gor=prkCast(()=>makeGorynych5(1),g,2,-6,-13,1.25,Math.PI*0.05);   // с головами: у makeGorynych — только шеи
    {const G=w.gor,v=new THREE.Vector3();G.g.updateMatrixWorld(true);G.piv=G.necks.map(n=>n?G.g.worldToLocal(n.getWorldPosition(v.clone())):null);}
    w.steam=[];for(let i=0;i<8;i++){const s=prkAdd(g,new THREE.SphereGeometry(0.9,7,5),new THREE.MeshBasicMaterial({color:0xf0d8c8,transparent:true,opacity:0.3,depthWrite:false}),(Math.random()-0.5)*20,Math.random()*5,-8+(Math.random()-0.5)*6);s.castShadow=false;w.steam.push(s);}
    const an=prkGroup(g,-5,0,-1.5);prkAdd(an,new THREE.BoxGeometry(0.8,0.6,0.5),prkM(0x3a3a44),0,0.6,0);prkAdd(an,new THREE.CylinderGeometry(0.3,0.4,0.4,6),prkM(0x5a3a1a),0,0.2,0);
    const tg=prkGroup(an,0,0.96,0);for(const s of[-1,1]){const j=prkAdd(tg,new THREE.BoxGeometry(1.1,0.06,0.07),prkM(0x6a6a74),0,0,s*0.05);j.rotation.y=s*0.12;}
    w.fire=[0,1,2].map(i=>{const f=prkGroup(g,0,0,0);for(let k=0;k<6;k++){const s=prkGlow(f,[0xffd060,0xff8a20,0xff4a10][k%3],1.2+k*0.55,0,0,0,0.9);s.position.y=k*0.9;}f.visible=false;return f;});
    w.emb=[];for(let i=0;i<30;i++){const s=prkGlow(g,0xffa040,0.35,(Math.random()-0.5)*30,Math.random()*12,-8+(Math.random()-0.5)*14,0.9);s.userData.v=0.8+Math.random()*1.6;w.emb.push(s);}
    w.sp=prkFall(g);PRK.ups.push((t,dt)=>{if(!g.visible)return;w.emb.forEach(s=>{s.position.y+=dt*s.userData.v;s.position.x+=Math.sin(t*2+s.userData.v*5)*dt*0.5;if(s.position.y>14)s.position.y=0;});w.steam.forEach((s,i)=>{s.position.y+=dt*(0.8+i%3*0.3);if(s.position.y>7)s.position.y=0;s.scale.setScalar(0.6+s.position.y*0.2);});});}
  // 5 · Буян (5-1): остров, дуб, сундук на цепях; у дуба спит Лихо Одноглазое — и открывает свой глаз
  {const O=PRO.W5,g=prkGroup(PRK.root,O.x,O.y,O.z),w={g};D.w5=w;prkSea(g,260,30,0x16384c);
    {const isl=new THREE.CylinderGeometry(11,13,2.4,14);FIN.jitter(isl,0.2);prkAdd(g,isl,prkM(0xd8c08a),0,-1.1,0);}
    const ok=prkGroup(g,0,0,-3);prkAdd(ok,new THREE.CylinderGeometry(1.2,1.9,9,9),prkM(0x5a4028),0,4.5,0);const br=prkAdd(ok,new THREE.CylinderGeometry(0.3,0.5,5,7),prkM(0x5a4028),1.9,7.4,0.4);br.rotation.z=-1.2;
    for(let i=0;i<5;i++){const geo=new FIN.orig.Icosa(2.4,1);FIN.jitter(geo,0.25);prkAdd(ok,geo,prkM(0x3a5a2a),Math.sin(i*1.3)*2.4,10+Math.cos(i*2)*0.8,Math.cos(i*1.3)*2.2);}
    w.lih=prkCast(()=>makeLikho(),g,-3.6,0,1.2,1.15,0.35);w.lih.lid.userData.lidHold=true;
    w.eyeGlow=prkGlow(w.lih.eye,0xff4a20,2.4,0,0,0.4,0);
    for(let i=0;i<6;i++)prkRock(g,(i-2.5)*3.4,0.2,6+(i%2)*2,0.6+(i%3)*0.3,0x8a7a62);
    w.chest=prkGroup(ok,3.6,5.2,0.6);const ch=makeChest5();ch.g.userData.prkCast=true;w.chest.add(ch.g||ch);(ch.g||ch).position.set(0,0,0);
    for(const[x,z]of[[-0.4,-0.3],[0.4,-0.3],[-0.4,0.3],[0.4,0.3]])prkAdd(w.chest,new THREE.CylinderGeometry(0.03,0.03,2.4,4),prkM(0x8a8a94),x,1.9,z);
    w.sp=prkFall(g);}}

/* ---------- сборка, кадр, уборка ---------- */
PRK.build=function(){if(PRK.root)return;PRK.root=new THREE.Group();W.group.add(PRK.root);PRK.ups=[];PRK.boxes=[];
  prkBuildL();prkBuildP();prkBuildW();prkNoBatch(PRK.root);PRK.t=0;
  // без «горошка» у камеры (late_88) — только у своих мешей: материалы готовых моделей общие, их не трогаем
  {const walk=o=>{if(o.userData.prkCast)return;if(o.isMesh&&o.material&&!Array.isArray(o.material)&&!o.isSkinnedMesh){o.material.userData.noFade=true;if(typeof occNo==='function')o.material=occNo(o.material);}o.children.forEach(walk);};walk(PRK.root);}
  W.updates.push(PRK.upd=dt=>{if(!PRK.root)return;PRK.t+=dt;for(const f of PRK.ups){try{f(PRK.t,dt);}catch(e){console.error(e);}}});};
PRK.dispose=function(){if(!PRK.root)return;W.group.remove(PRK.root);const k=W.updates.indexOf(PRK.upd);if(k>=0)W.updates.splice(k,1);
  PRK.boxes.forEach(c=>{c.on=false;const i=W.boxes.indexOf(c);if(i>=0)W.boxes.splice(i,1);});PRK.boxes=[];
  PRK.root.traverse(o=>{if(o.geometry)o.geometry.dispose();});PRK.root=null;PRK.L=PRK.P=null;PRK.Wd=[];PRK.ups=[];};
// показать только одну площадку (остальные и комната пролога скрыты — меньше отрисовок)
PRK.only=function(k){if(!PRK.root)return;for(const g of[PRK.L&&PRK.L.g,PRK.P&&PRK.P.g,...Object.values(PRK.Wd).map(w=>w.g)])if(g)g.visible=false;
  const g=k==='L'?PRK.L.g:k==='P'?PRK.P.g:PRK.Wd[k]?PRK.Wd[k].g:null;if(g)g.visible=true;};
PRK.hideLevel=function(){PRK.hid=[];for(const c of W.group.children)if(c!==PRK.root){PRK.hid.push([c,c.visible]);c.visible=false;}};
PRK.showLevel=function(){for(const[c,v]of PRK.hid)c.visible=v;PRK.hid=[];};
