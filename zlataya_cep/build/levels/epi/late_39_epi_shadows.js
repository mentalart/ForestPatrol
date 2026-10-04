/* ============================== РЕЛИЗ final06 · ЭПИЛОГ: «ТЕАТР ТЕНЕЙ» — КООПЕРАТИВНАЯ МИНИ-ИГРА ============================== */
// По отзыву: тени в эпилоге были плоскими картинками по кнопке второго игрока — смотреть, а не играть. Теперь — театр теней.
// Пелагея ставит фонарь на пол; у каждого героя (и у Тишки, и у Кота) — живая тень на стене сосны: проекция от фонаря на
// цилиндр стены и на пол (шейдер-двойник каждого меша героя). Ближе к фонарю — тень больше; прыгнул — тень прыгнула.
// Четыре сценки, в каждой — общее дело:
//  1) «Великаны» — дорасти тенью до двух звёзд под потолком (шагни к фонарю);
//  2) «Змей о трёх головах» — трое в золотые круги, их тени — головы Змея; строй держат, а на удар Змей дышит огнём
//     (вдвоём — оба игрока, по два раза; в одиночку — четыре удара);
//  3) «Жар-птица» — ловят «в ладошки»: от одной тени птица вспархивает и садится у тени друга, поймана — когда её
//     зажали две тени с двух сторон; три пера (в одиночку вторая ладошка — тень героя, оставленного на месте);
//  4) «Хоровод» — четверо в круги вокруг тени Кощея; на хлопок Тишки — прыжок (вдвоём — оба разом; стоящие на кругах
//     прыгают сами); три прыжка — кольца света, корона слетает, тень Кощея становится мальчишкой с молоточком,
//     тени помощников из Сказов встают в хоровод.
// Одиночная игра: смена героя (Y) оставляет прежнего на месте — героев расставляешь по одному; правила те же, кроме «разом».
// Подсказки: круги на полу показывают, куда встать именно этому герою (по его росту); долго не выходит — правило мягче,
// а через минуту-полторы сценку засчитывает Тишка. Подключение — rep_30 (конец ролика e1 → FIN.epiTh.start(W.epiL)).
const ETH={on:false,st:'',t:0,R:7,L:new V3(0.3,0.32,3.0),px:[],dec:[],marks:[],ghosts:[],said:{},log:[],ri:-1,rd:null,S:[],EL:null,save:null,
  uni:{uL:{value:new V3(0.3,0.32,3.0)},uR:{value:6.93},uA:{value:0}},jT:[-9,-9],cp:new V3(),cl:new V3(),
  stats:{giant:0,stars:0,formed:0,fires:[0,0],flees:0,catches:0,beats:0,miss:0,forced:[],rounds:[],done:false}};
FIN.epiTh=ETH;
const ETH_TXT={
  p1:'А давайте сказку тенями покажем! Я фонарик поставлю.',t1:'Ой! Тени! Ваши тени на стене!',
  p2:'Ближе к фонарю — тень больше. Достаньте до звёздочек!',t2:'Ой, великан!',t3:'До звёздочек достали!',
  p3:'Змей о трёх головах! Трое — в золотые круги, тени будут головами.',t4:'Змей! Пусть огнём дохнёт!',t5:'Улетел Змей — хи-хи!',
  p4:'Жар-птицу в ладошки ловят: тень с одной стороны, тень с другой!',t6:'Упорхнула! Хи-хи!',t7:'Три пера! Жар-птица!',
  p5:'А теперь — хоровод вокруг Кощея. Все четверо — в круги!',p6:'Раз-два-три — прыгаем вместе!',t8:'Кощей… мальчишкой стал!',p7:'Вот и сказке конец. А теперь — спать.'};
FIN.epiTxt=ETH_TXT;

/* ---------- тень: шейдер-двойник (вершина → луч от фонаря → стена-цилиндр или пол) ---------- */
// герои в релизе — скелетные модели (late_30): их тень — тоже SkinnedMesh на том же скелете (skinning-чанки three r128)
let ETH_MAT=null,ETH_MATSK=null;const ETH_GHOST=new THREE.MeshBasicMaterial({visible:false});
function ethMat(sk){if(sk?ETH_MATSK:ETH_MAT)return sk?ETH_MATSK:ETH_MAT;
  const m=new THREE.ShaderMaterial({uniforms:ETH.uni,transparent:true,depthWrite:false,side:THREE.DoubleSide,
    vertexShader:'#include <common>\n#include <skinning_pars_vertex>\nuniform vec3 uL;uniform float uR;varying float vOk;varying float vF;\n'+
      'void main(){\n#include <skinbase_vertex>\n#include <begin_vertex>\n#include <skinning_vertex>\nvec4 wp=modelMatrix*vec4(transformed,1.0);vec3 D=wp.xyz-uL;float a=D.x*D.x+D.z*D.z,b=2.0*(uL.x*D.x+uL.z*D.z),c=uL.x*uL.x+uL.z*uL.z-uR*uR;\n'+
      ' float tw=1e5;if(a>1e-7)tw=(-b+sqrt(max(b*b-4.0*a*c,0.0)))/(2.0*a);float tf=1e5;if(D.y<-1e-5)tf=(0.045-uL.y)/D.y;\n'+
      ' vOk=1.0;vF=0.0;vec3 P;if(tf<tw){P=uL+D*tf;vF=1.0;if(P.z>7.4||abs(P.x)>7.1)vOk=0.0;}else{P=uL+D*tw;if(P.z>0.05||P.y>11.0)vOk=0.0;}\n'+
      ' gl_Position=projectionMatrix*viewMatrix*vec4(P,1.0);}',
    fragmentShader:'uniform float uA;varying float vOk;varying float vF;\n'+
      'void main(){if(vOk<0.5)discard;gl_FragColor=vec4(mix(vec3(0.12,0.074,0.058),vec3(0.10,0.06,0.04),vF),uA*mix(0.93,0.55,vF));}'});
  m.userData.fx=true;if(sk){m.skinning=true;ETH_MATSK=m;}else ETH_MAT=m;return m;}
const ETH_UD={noBatch:true,noBatchL:true,batchNo:true,occEx:true};
function ethFlag(o){Object.assign(o.userData,ETH_UD);o.raycast=()=>{};return o;}
// двойники всех непрозрачных мешей root (кроме skip-веток); ghost — сам меш невидим, остаётся только тень
function ethCast(root,skip,ghost){const sk=new Set((skip||[]).filter(Boolean)),out=[];
  (function walk(o){if(sk.has(o)||o.userData.ethP)return;
    if(o.isMesh&&!o.isInstancedMesh){const m=o.material;if(!Array.isArray(m)&&m.visible!==false&&!(m.transparent&&m.opacity<0.9)&&m.blending!==THREE.AdditiveBlending&&!(m.userData&&m.userData.fx))out.push(o);}
    else if(ghost&&(o.isSprite||o.isPoints||o.isLine||o.isLight))o.visible=false;
    for(const c of o.children)walk(c);})(root);
  for(const o of out){let p;if(o.isSkinnedMesh&&o.skeleton){p=new THREE.SkinnedMesh(o.geometry,ethMat(true));p.bind(o.skeleton,o.bindMatrix);}else p=new THREE.Mesh(o.geometry,ethMat());p.userData.ethP=true;ethFlag(p);p.frustumCulled=false;p.castShadow=false;p.receiveShadow=false;p.renderOrder=4;o.add(p);ETH.px.push(p);
    if(ghost){o.material=ETH_GHOST;o.castShadow=false;o.receiveShadow=false;ethFlag(o);}}
  if(ghost)root.traverse(ethFlag);return out.length;}
// тень точки p (как в шейдере): {x,y,z,u — дуга по стене от середины, k — увеличение, f — на полу}
const _eD=new V3(),_eV=new V3();
function ethProj(p,o){const L=ETH.L,R=ETH.uni.uR.value;_eD.subVectors(p,L);const a=_eD.x*_eD.x+_eD.z*_eD.z,b=2*(L.x*_eD.x+L.z*_eD.z),c=L.x*L.x+L.z*L.z-R*R;
  let tw=1e5;if(a>1e-7)tw=(-b+Math.sqrt(Math.max(0,b*b-4*a*c)))/(2*a);let tf=1e5;if(_eD.y<-1e-5)tf=(0.045-L.y)/_eD.y;const t=Math.min(tw,tf);
  o.f=tf<tw;o.k=t;o.x=L.x+_eD.x*t;o.y=L.y+_eD.y*t;o.z=L.z+_eD.z*t;o.u=Math.atan2(o.x,-o.z)*ETH.R;return o;}
// тень героя — столбик от пола стены до макушки: u, top, ширина w; ok — тень на стене
function ethShadow(h){const o={};_eV.set(h.pos.x,h.pos.y+heroHeight(h),h.pos.z);ethProj(_eV,o);
  return {h,u:o.u,top:o.y,k:o.k,w:Math.max(0.28,(h.d.radius||0.4)*o.k*0.95),ok:!o.f&&o.z<=0.05&&o.k>0.95};}
// точка стены по (u,y) — для искр, всплывающих надписей
function ethWall(u,y,off){const a=u/ETH.R,r=ETH.R-(off||0.15);return new V3(Math.sin(a)*r,y,-Math.cos(a)*r);}
// где встать герою ростом H, чтобы макушка тени пришлась в (u,y)
function ethIdeal(H,u,y,out){const a=u/ETH.R,r=ETH.uni.uR.value,L=ETH.L,wx=Math.sin(a)*r,wz=-Math.cos(a)*r,s=clamp((H-L.y)/Math.max(0.2,y-L.y),0.05,0.98);
  return out.set(L.x+(wx-L.x)*s,0,L.z+(wz-L.z)*s);}

/* ---------- картинки на стене: холст → текстура; большая — гнутая по стене, малая — плоская на шарнире у центра ---------- */
function ethTex(w,h,fn){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');fn(x,w,h);const t=new THREE.CanvasTexture(c);t.anisotropy=4;return t;}
const ETX={};
function ethTexs(){if(ETX.glow)return ETX;
  ETX.glow=ethTex(128,128,x=>{const g=x.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(0.45,'rgba(255,255,255,0.42)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,128,128);});
  ETX.ring=ethTex(256,256,x=>{x.translate(128,128);x.shadowColor='rgba(255,170,40,0.95)';x.shadowBlur=16;x.strokeStyle='#ffe08a';x.lineWidth=10;x.setLineDash([26,14]);x.beginPath();x.arc(0,0,102,0,Math.PI*2);x.stroke();});
  ETX.solid=ethTex(256,256,x=>{x.translate(128,128);x.shadowColor='rgba(255,190,60,1)';x.shadowBlur=22;x.strokeStyle='#fff4c0';x.lineWidth=14;x.beginPath();x.arc(0,0,100,0,Math.PI*2);x.stroke();});
  ETX.head=ethTex(256,256,x=>{x.translate(128,140);x.shadowColor='rgba(255,170,40,0.95)';x.shadowBlur=14;x.strokeStyle='#ffe08a';x.fillStyle='#ffe08a';x.lineWidth=9;x.setLineDash([22,12]);
    x.beginPath();x.arc(0,0,88,0,Math.PI*2);x.stroke();x.setLineDash([]);
    for(const s of[-1,1]){x.beginPath();x.moveTo(s*34,-78);x.lineTo(s*66,-130);x.lineTo(s*62,-66);x.closePath();x.fill();x.beginPath();x.arc(s*30,-12,10,0,Math.PI*2);x.fill();}});
  const star=(x,r0,r1)=>{x.beginPath();for(let i=0;i<10;i++){const r=i%2?r0:r1,a=-Math.PI/2+i*Math.PI/5;x.lineTo(Math.cos(a)*r,Math.sin(a)*r);}x.closePath();};
  ETX.star=ethTex(256,256,x=>{x.translate(128,132);x.shadowColor='rgba(255,200,80,1)';x.shadowBlur=26;x.fillStyle='#fff2b0';star(x,44,104);x.fill();});
  ETX.starO=ethTex(256,256,x=>{x.translate(128,132);x.shadowColor='rgba(255,170,40,0.9)';x.shadowBlur=12;x.strokeStyle='#ffd76a';x.lineWidth=9;x.setLineDash([20,12]);star(x,44,104);x.stroke();});
  ETX.flame=ethTex(128,128,x=>{const g=x.createRadialGradient(64,64,2,64,64,62);g.addColorStop(0,'rgba(255,250,210,1)');g.addColorStop(0.3,'rgba(255,200,80,0.95)');g.addColorStop(0.65,'rgba(255,90,20,0.6)');g.addColorStop(1,'rgba(200,30,0,0)');x.fillStyle=g;x.fillRect(0,0,128,128);});
  ETX.feather=ethTex(128,256,x=>{x.translate(64,128);const g=x.createLinearGradient(0,-120,0,120);g.addColorStop(0,'#fff6b0');g.addColorStop(0.5,'#ffb030');g.addColorStop(1,'#ff5020');x.fillStyle=g;x.shadowColor='#ffa020';x.shadowBlur=12;
    x.beginPath();x.moveTo(0,-118);x.bezierCurveTo(48,-60,40,40,0,112);x.bezierCurveTo(-40,40,-48,-60,0,-118);x.fill();x.shadowBlur=0;x.strokeStyle='rgba(140,50,0,0.8)';x.lineWidth=4;x.beginPath();x.moveTo(0,-108);x.lineTo(0,124);x.stroke();});
  ETX.bird=ethTex(256,256,x=>{x.translate(128,128);x.shadowColor='#ff9020';x.shadowBlur=22;const g=x.createRadialGradient(18,-6,4,0,0,130);g.addColorStop(0,'#fffbe0');g.addColorStop(0.3,'#ffd858');g.addColorStop(0.7,'#ff8a24');g.addColorStop(1,'#ff4a18');x.fillStyle=g;
    for(const [a,l] of[[0.2,116],[0.55,124],[0.9,108]]){x.beginPath();x.moveTo(-6,8);x.quadraticCurveTo(-56,24+a*50,-l,30+a*72);x.quadraticCurveTo(-58,8+a*36,-6,-2);x.fill();}
    x.beginPath();x.ellipse(12,0,40,24,-0.2,0,Math.PI*2);x.fill();x.beginPath();x.arc(50,-26,17,0,Math.PI*2);x.fill();
    x.beginPath();x.moveTo(64,-30);x.lineTo(86,-22);x.lineTo(64,-18);x.fill();
    for(let i=0;i<3;i++){x.beginPath();x.moveTo(44,-38);x.lineTo(34+i*11,-70+i*5);x.lineTo(52,-40);x.fill();}
    x.beginPath();x.moveTo(-4,-8);x.quadraticCurveTo(-20,-86,32,-108);x.quadraticCurveTo(18,-50,34,-14);x.fill();
    x.shadowBlur=0;x.fillStyle='#3a1000';x.beginPath();x.arc(55,-29,3.5,0,Math.PI*2);x.fill();});
  // Змей: тело с лапами и хвостом (столбики-шеи — тени героев) и крылья отдельно — чтобы махали. 150 px на метр, низ — пол стены
  const S=150,X=u=>512+u*S,Y=y=>512-y*S;
  ETX.dragon=ethTex(1024,512,x=>{x.fillStyle='#fff';x.beginPath();x.ellipse(X(0.1),Y(0.78),1.55*S,0.72*S,0,0,Math.PI*2);x.fill();
    for(const u of[-0.8,0.95]){x.fillRect(X(u-0.22),Y(0.6),0.44*S,0.6*S);for(let c=0;c<3;c++){x.beginPath();x.moveTo(X(u-0.26+c*0.18),Y(0.0));x.lineTo(X(u-0.16+c*0.18),Y(-0.02));x.lineTo(X(u-0.2+c*0.18),Y(0.12));x.fill();}}
    x.lineCap='round';x.strokeStyle='#fff';x.lineWidth=0.36*S;x.beginPath();x.moveTo(X(1.4),Y(0.7));x.quadraticCurveTo(X(2.6),Y(0.05),X(3.05),Y(0.45));x.stroke();
    x.beginPath();x.moveTo(X(3.0),Y(0.5));x.lineTo(X(3.45),Y(0.95));x.lineTo(X(3.3),Y(0.35));x.lineTo(X(3.05),Y(0.2));x.fill();
    x.lineWidth=0.42*S;for(const [u0,u1] of[[-0.9,-2.05],[0,0],[0.9,2.05]]){x.beginPath();x.moveTo(X(u0*0.7),Y(1.1));x.quadraticCurveTo(X(u1*0.8),Y(1.5),X(u1),Y(1.9));x.stroke();}
    for(let i=0;i<9;i++){const u=-1.1+i*0.28;x.beginPath();x.moveTo(X(u-0.1),Y(1.38+Math.sin(i)*0.05));x.lineTo(X(u),Y(1.62));x.lineTo(X(u+0.1),Y(1.38));x.fill();}});
  ETX.wings=ethTex(1024,256,x=>{const s=150,X=u=>512+u*s,Y=y=>128-y*s;x.fillStyle='#fff';
    for(const sg of[-1,1]){x.beginPath();x.moveTo(X(sg*0.8),Y(-0.25));x.quadraticCurveTo(X(sg*1.8),Y(0.75),X(sg*3.35),Y(0.72));
      for(let i=0;i<4;i++){const u0=sg*(3.35-i*0.62),u1=sg*(3.35-(i+1)*0.62);x.quadraticCurveTo(X((u0+u1)/2),Y(-0.05-i*0.04),X(u1),Y(0.2-i*0.12));}
      x.lineTo(X(sg*0.8),Y(-0.25));x.fill();}});
  ETX.link=ethTex(256,128,x=>{x.translate(128,64);x.shadowColor='rgba(255,190,60,1)';x.shadowBlur=14;x.strokeStyle='#fff0b0';x.lineWidth=14;x.beginPath();x.ellipse(-44,0,58,30,0,0,Math.PI*2);x.stroke();x.beginPath();x.ellipse(44,0,58,30,0,0,Math.PI*2);x.stroke();});
  return ETX;}
function ethWallGeo(w,h,off){const r=ETH.R-off,g=new THREE.PlaneGeometry(w,h,Math.max(2,Math.ceil(w/0.3)),1),p=g.attributes.position;
  for(let i=0;i<p.count;i++){const a=p.getX(i)/ETH.R;p.setXYZ(i,Math.sin(a)*r,p.getY(i),-Math.cos(a)*r);}return g;}
function ethMB(map,col,add,op){return new THREE.MeshBasicMaterial({map,color:col==null?0xffffff:col,transparent:true,depthWrite:false,opacity:op==null?1:op,blending:add?THREE.AdditiveBlending:THREE.NormalBlending,side:THREE.DoubleSide,fog:false});}
// большая — гнутая по стене (двигать только по высоте/поворотом), центр в (u,y)
function ethBig(w,h,mat,off,u,y,ro){const m=ethFlag(new THREE.Mesh(ethWallGeo(w,h,off),mat));m.rotation.y=-u/ETH.R;m.position.y=y;m.frustumCulled=false;m.renderOrder=ro||5;W.group.add(m);ETH.dec.push(m);return m;}
// малая — плоская на шарнире: piv крутится вокруг оси комнаты, m — по высоте/масштаб/поворот
function ethSmall(w,h,mat,off,u,y,ro){const piv=ethFlag(new THREE.Group());const m=ethFlag(new THREE.Mesh(new THREE.PlaneGeometry(w,h),mat));m.position.set(0,y||0,-(ETH.R-off));m.frustumCulled=false;m.renderOrder=ro||6;piv.add(m);W.group.add(piv);ETH.dec.push(piv);
  const d={piv,m,u:u||0,y:y||0,set(u2,y2){this.u=u2;this.y=y2;piv.rotation.y=-u2/ETH.R;m.position.y=y2;return this;}};d.set(d.u,d.y);return d;}
// круг на полу — куда встать
function ethMark(col){const g=ethFlag(new THREE.Group());const r=ethFlag(new THREE.Mesh(new THREE.RingGeometry(0.4,0.54,36),ethMB(null,col||0xffd76a,false,0.9)));r.rotation.x=-Math.PI/2;g.add(r);
  const d=ethFlag(new THREE.Mesh(new THREE.CircleGeometry(0.4,28),ethMB(ETX.glow,col||0xffd76a,true,0.5)));d.rotation.x=-Math.PI/2;d.position.y=0.005;g.add(d);g.position.y=0.06;g.visible=false;g.renderOrder=7;W.group.add(g);ETH.marks.push(g);
  return {g,r,d,p:new V3(),on:false};}

/* ---------- сцена: фонарь, свет, камера ---------- */
function ethLantern(){const L=ETH.L,g=ethFlag(new THREE.Group());g.position.set(L.x,0,L.z);W.group.add(g);const wood=M(0x5a3a20),brass=M(0xc8a050,{emissive:0x403010,emissiveIntensity:0.3});
  const P=(geo,mat,x,y,z)=>{const m=ethFlag(part(g,geo,mat,x,y,z));m.castShadow=false;return m;};
  P(new THREE.CylinderGeometry(0.2,0.24,0.07,10),wood,0,0.035,0);const glass=P(new THREE.CylinderGeometry(0.12,0.12,0.26,10),M(0xffe6a0,{emissive:0xffb040,emissiveIntensity:1.3}),0,0.2,0);
  for(let i=0;i<4;i++){const a=i/4*Math.PI*2+Math.PI/4;P(new THREE.BoxGeometry(0.03,0.3,0.03),brass,Math.cos(a)*0.14,0.2,Math.sin(a)*0.14);}
  P(new THREE.ConeGeometry(0.2,0.14,10),wood,0,0.4,0);const hd=P(new THREE.TorusGeometry(0.08,0.014,6,14,Math.PI),brass,0,0.47,0);hd.rotation.z=0;
  const halo=ethFlag(new THREE.Mesh(new THREE.PlaneGeometry(1.4,1.4),ethMB(ethTexs().glow,0xffb050,true,0.55)));halo.position.y=0.22;g.add(halo);
  W.cyls.push({x:L.x,z:L.z,r:0.42,miny:-1,maxy:0.5,on:true});return {g,glass,halo};}
function ethLights(on){const EL=ETH.EL,sv=ETH.save;if(!EL||!EL.room)return;const lamp=EL.room.lampL,bulb=EL.room.lampG.children.find(c=>c.geometry&&c.geometry.type==='SphereGeometry');
  if(on){sv.amb=amb.intensity;sv.sun=sun.intensity;sv.lp=lamp.position.clone();sv.li=lamp.intensity;sv.ld=lamp.distance;sv.be=bulb?bulb.material.emissiveIntensity:1;
    const a0=amb.intensity,s0=sun.intensity,i0=lamp.intensity,p0=lamp.position.clone();
    anim(1.4,k=>{amb.intensity=lerp(a0,a0*0.17,k);sun.intensity=lerp(s0,s0*0.1,k);lamp.position.lerpVectors(p0,new V3(ETH.L.x,0.62,ETH.L.z+0.05),k);lamp.intensity=lerp(i0,1.05,k);lamp.distance=lerp(18,24,k);if(bulb)bulb.material.emissiveIntensity=lerp(sv.be,0.15,k);});}
  else{if(sv.amb==null)return;const a0=amb.intensity,s0=sun.intensity,i0=lamp.intensity,p0=lamp.position.clone();
    anim(1.2,k=>{amb.intensity=lerp(a0,sv.amb,k);sun.intensity=lerp(s0,sv.sun,k);lamp.position.lerpVectors(p0,sv.lp,k);lamp.intensity=lerp(i0,sv.li,k);lamp.distance=lerp(24,sv.ld,k);if(bulb)bulb.material.emissiveIntensity=lerp(0.15,sv.be,k);});}}
function ethCam(){let mx=0;for(const h of HEROES)mx+=h.pos.x;mx/=HEROES.length;mx=clamp(mx,-3,3);ETH.cp.set(0.3+mx*0.15,2.9,9.1);ETH.cl.set(0.3+mx*0.12,1.85,-3.0);return {pos:ETH.cp,look:ETH.cl,k:2.4};}
function ethSay(who,key,dur){if(ETH.said[key])return;ETH.said[key]=true;say(who,ETH_TXT[key],dur||3);}
function ethTish(n){const t=ETH.EL&&ETH.EL.tish;if(!t)return;const y0=0.35;anim(0.42*(n||2),k=>{t.g.position.y=y0+Math.abs(Math.sin(k*Math.PI*(n||2)))*0.28;t.tail.rotation.x=Math.sin(k*Math.PI*(n||2)*2)*0.4;});}
function ethCheer(big){SFX.flower();lullaby(big?[72,76,79,84,88]:[72,76,79,84],0.11,0,0.12);try{FX.confettiCam(big?70:34);ACT.emoteAll('cheer',ETH.cl,0.08);}catch(e){}ethTish(3);}
function ethSpark(u,y,n,col){try{FX.sparkle(ethWall(u,y,0.4),n||8,col);}catch(e){}}

/* ---------- круги-цели на стене (слоты) с подсказкой на полу ---------- */
function ethSlots(defs,tex){return defs.map((d,i)=>{const dec=ethSmall(d.sz||1.7,d.sz||1.7,ethMB(tex||ETX.ring,0xffe08a,false,0.85),0.14,d.u,d.y,7);
  return Object.assign({i,held:null,hT:0,lost:0,dec,mk:ethMark(),tex0:tex||ETX.ring},d);});}
function ethSlotsTick(slots,S,dt,showMarks){const used=new Set(),pairs=[];
  for(const sl of slots)for(const s of S){if(!s.ok)continue;const du=Math.abs(s.u-sl.u),dy=Math.abs(s.top-sl.y),air=!s.h.grounded&&s.top>sl.y-sl.dy;if(du<sl.du&&(dy<sl.dy||air))pairs.push({sl,s,d:du+(air?0:dy*0.7)});}
  pairs.sort((a,b)=>a.d-b.d);const got=new Map();for(const p of pairs){if(got.has(p.sl)||used.has(p.s.h))continue;got.set(p.sl,p.s);used.add(p.s.h);}
  for(const sl of slots){const s=got.get(sl)||null,was=!!sl.held;sl.held=s;if(s){sl.hT+=dt;sl.lost=0;}else{sl.hT=0;sl.lost+=dt;}
    if(s&&!was){SFX.plate();ethSpark(sl.u,sl.y,6);}
    // подсказка на полу — для героя этого круга: держит — он; иначе ближайший свободный (управляемый — в первую очередь)
    let g=s?s.h:null;if(!g){let best=1e9;for(const q of S){if(used.has(q.h))continue;const d=Math.abs(q.u-sl.u)+(q.h.active?-2.5:0);if(d<best){best=d;g=q.h;}}}
    const mk=sl.mk;ethIdeal(g?heroHeight(g):1.25,sl.u,sl.y,_eV);if(!mk.on){mk.p.copy(_eV);mk.on=true;}else mk.p.lerp(_eV,1-Math.exp(-6*dt));mk.g.position.set(mk.p.x,0.06,mk.p.z);
    mk.g.visible=showMarks!==false&&!s;const pz=1+Math.sin(G.time*5+sl.i)*0.08;mk.g.scale.set(pz,1,pz);
    // «теплее»: чем ближе макушка тени к кругу, тем ярче; держит — сплошной и белеет
    let near=0;for(const q of S){if(!q.ok)continue;near=Math.max(near,1-Math.min(1,(Math.abs(q.u-sl.u)+Math.abs(q.top-sl.y))/3));}
    const m=sl.dec.m;m.material.map=s?ETX.solid:sl.tex0;m.material.color.setHex(s?0xfff6d0:0xffd060);m.material.opacity=s?1:0.55+near*0.4;
    const sc=s?1.06+Math.sin(G.time*9)*0.05:1+Math.sin(G.time*3+sl.i)*0.04;m.scale.set(sc,sc,1);}
  return slots.every(sl=>sl.held);}
function ethSlotsOff(slots){for(const sl of slots){sl.dec.piv.visible=false;sl.mk.g.visible=false;}}

/* ---------- сценки ---------- */
const ETH_RD=[
 {id:'giant',name:'Сценка первая · Великаны',sub:'ближе к фонарю — тень выше',limit:50,
  init(R){R.stars=[-2.7,2.7].map((u,i)=>{const d=ethSmall(1.8,1.8,ethMB(ETX.starO,0xffe08a,false,0.9),0.14,u,3.75,7);return {u,y:3.75,d,lit:false,i,mk:ethMark()};});ethSay('pelageya','p2',4.5);},
  tick(R,S,dt){for(const st of R.stars){const m=st.d.m;
      if(!st.lit){for(const s of S){if(s.ok&&Math.abs(s.u-st.u)<s.w+0.3&&s.top>st.y-0.2){st.lit=true;ETH.stats.stars++;m.material=ethMB(ETX.star,0xffffff,true,1);SFX.dzin();ethSpark(st.u,st.y,14);floatText(ethWall(st.u,st.y+0.5),'Достали!','#fff2b0');ethTish(1);break;}}}
      if(st.lit){const sc=1.1+Math.sin(G.time*4+st.i)*0.08;m.scale.set(sc,sc,1);m.rotation.z+=dt*0.6;st.mk.g.visible=false;}
      else{m.scale.setScalar(1+Math.sin(G.time*4+st.i)*0.06);let g=null,best=1e9;for(const s of S){const d=Math.abs(s.u-st.u)+(s.h.active?-2:0);if(d<best){best=d;g=s.h;}}
        ethIdeal(g?heroHeight(g):1.25,st.u,st.y,_eV);st.mk.p.lerp(_eV,st.mk.on?1-Math.exp(-6*dt):1);st.mk.on=true;st.mk.g.position.set(st.mk.p.x,0.06,st.mk.p.z);st.mk.g.visible=true;}}
    for(const s of S)if(s.ok&&s.k>4.4&&s.top>3.9&&!ETH.said.t2){ETH.stats.giant++;ethSay('tishka','t2',2.8);try{ACT.emote(s.h,'pride',0.1);}catch(e){}ethTish(2);}
    return R.stars.every(s=>s.lit);},
  force(R){for(const st of R.stars)if(!st.lit){st.lit=true;st.d.m.material=ethMB(ETX.star,0xffffff,true,1);ethSpark(st.u,st.y,10);}},
  done(R){ethSay('tishka','t3',2.4);},
  obj(R,pi){return 'Тенью — до звёздочки под потолком: шагни ближе к фонарю — тень вырастет';},
  off(R){for(const st of R.stars){st.mk.g.visible=false;anim(1.2,k=>{st.d.m.material.opacity=1-k;});}}},

 {id:'zmei',name:'Сценка вторая · Змей о трёх головах',sub:'трое — в золотые круги; тени — головы Змея',limit:110,
  init(R){R.body=ethBig(1024/150,512/150,ethMB(ETX.dragon,0x1f130f,false,0),0.09,0,256/150,3);R.wings=ethBig(1024/150,256/150,ethMB(ETX.wings,0x1f130f,false,0),0.1,0,1.62,3);
    R.slots=ethSlots([{u:-2.1,y:3.05,du:0.62,dy:0.68,tex0:ETX.head},{u:0,y:3.4,du:0.62,dy:0.68,tex0:ETX.head},{u:2.1,y:3.05,du:0.62,dy:0.68,tex0:ETX.head}],ETX.head);
    R.eyes=[0,1,2].map(()=>{const e=ethSmall(0.5,0.22,ethMB(ETX.link,0xff8030,true,0),0.18,0,0,8);return e;});
    R.formed=false;R.fT=0;R.fire=[0,0];R.flames=[];R.fly=-1;R.a=0;anim(1.2,k=>{R.a=k;});ethSay('pelageya','p3',5.3);},
  tick(R,S,dt){const all=ethSlotsTick(R.slots,S,dt,!R.formed);const A=ETH.uni.uA.value*R.a;
    for(const fl of R.flames){fl.t+=dt;const k=fl.t/0.8;fl.f.set(fl.u+fl.dir*k*2.2,fl.y+(fl.dir?0.35:1.5)*k);fl.f.m.scale.setScalar(0.7+k*2.6);fl.f.m.material.opacity=Math.max(0,1-k*k);if(k>=1)fl.f.piv.visible=false;}
    R.flames=R.flames.filter(f=>f.t<0.8);
    if(R.fly>=0){R.fly+=dt;const k=Math.min(1,R.fly/2.2);R.body.position.y=256/150+k*k*5;R.wings.position.y=1.62+k*k*5;R.wings.scale.y=1+Math.sin(G.time*16)*0.35;R.body.material.opacity=R.wings.material.opacity=0.92*A*(1-k);for(const e of R.eyes)e.m.material.opacity=0;ethSlotsOff(R.slots);return k>=1;}
    R.body.material.opacity=R.wings.material.opacity=0.92*A;
    if(all)R.fT+=dt;else R.fT=0;
    if(!R.formed&&R.fT>0.5){R.formed=true;ETH.stats.formed++;SFX.horn();CINE&&CINE.punch&&CINE.punch(0.25);banner('Змей ожил!','#ffb050',1.8,'огнём — '+K(0,'attack')+(G.solo?'':' и '+K(1,'attack'))+'; строй держите');ethSay('tishka','t4',2.6);ethTish(2);}
    if(R.formed&&R.slots.some(sl=>sl.lost>0.9)){R.formed=false;tip(0,'Строй рассыпался — встаньте в круги снова!',2);if(!G.solo)tip(1,'Строй рассыпался — встаньте в круги снова!',2);}
    R.wings.scale.y=R.formed?1+Math.sin(G.time*7)*0.22:1;
    R.slots.forEach((sl,i)=>{const e=R.eyes[i];if(R.formed&&sl.held){e.set(sl.held.u,sl.held.top-0.32*Math.min(2.5,sl.held.k/2.2));e.m.material.opacity=0.85+Math.sin(G.time*10+i)*0.15;e.m.scale.setScalar(Math.min(1.6,0.6+sl.held.k*0.2));}else e.m.material.opacity=0;});
    if(R.formed)for(const pi of(G.solo?[G.soloPi]:[0,1]))if(tap(pi,'attack')){R.fire[G.solo?0:pi]++;ETH.stats.fires[G.solo?0:pi]++;SFX.ember();SFX.whoosh();
      R.slots.forEach((sl,i)=>{if(!sl.held)return;const dir=i===0?-1:i===2?1:0;for(let q=0;q<2;q++){const f=ethSmall(1.2,1.2,ethMB(ETX.flame,q?0xffd060:0xff8030,true,1),0.2+q*0.01,sl.held.u,sl.held.top-0.2,9);R.flames.push({f,t:-q*0.12,u:sl.held.u,y:sl.held.top-0.2,dir});f.m.scale.setScalar(0.01);}ethSpark(sl.held.u+dir*0.6,sl.held.top,6,0xffa040);});}
    const need=G.solo?R.fire[0]>=4:R.fire[0]>=2&&R.fire[1]>=2;if(R.formed&&need&&R.fly<0){R.fly=0;SFX.horn();ethSay('tishka','t5',2.4);floatText(ethWall(0,3.6),'Полетел!','#ffb050');}
    return false;},
  force(R){if(R.fly<0){R.fly=0;SFX.horn();}},
  done(R){},
  obj(R,pi){if(R.formed)return 'Змей ожил! Огнём — '+K(pi,'attack')+(G.solo?' (четыре раза)':' — оба, по два раза')+'. Строй держите';
    return G.solo?'Трое — в золотые круги: тени станут головами Змея. '+K(0,'swap')+' — другой герой, прежний стоит':'Трое — в золотые круги: тени станут головами Змея. Смена героя '+K(pi,'swap')+' — прежний стоит';},
  off(R){ethSlotsOff(R.slots);for(const e of R.eyes)e.piv.visible=false;for(const f of R.flames)f.f.piv.visible=false;R.flames.length=0;}},

 {id:'bird',name:'Сценка третья · Жар-птица',sub:'в ладошки: тень с одной стороны, тень с другой',limit:120,
  init(R){R.B={d:ethSmall(1.6,1.6,ethMB(ETX.bird,0xffffff,true,1),0.2,-6,4,9),u:-6,y:4.4,st:'wait',t:0.6,calm:0,startle:0,fl:0,per:0,from:{u:0,y:0},to:{u:0,y:0},dur:1,face:1};
    R.n=0;R.feath=[-0.9,0,0.9].map(u=>ethSmall(0.46,0.92,ethMB(ETX.feather,0xffffff,false,0.22),0.16,u,4.3,7));R.big=null;R.glow=ethSmall(2.8,2.8,ethMB(ETX.glow,0xffa030,true,0.5),0.21,-6,4,8);ethSay('pelageya','p4',4.8);},
  tick(R,S,dt){const B=R.B;
    const go=(u,y,dur)=>{B.from={u:B.u,y:B.y};B.to={u:clamp(u,-3.9,3.9),y:clamp(y,0.95,3.1)};B.face=B.to.u>=B.u?1:-1;B.st='fly';B.t=0;B.dur=dur||0.8;};
    // свободное место: подальше от far и не в досягаемости чужих теней (иначе поймается сама)
    const free=(u,y)=>S.every(s=>!s.ok||s.top<y-0.5||Math.abs(s.u-u)>s.w+1.15);
    const spot=far=>{let best=null,bs=-1;for(let i=0;i<24;i++){const u=rand(-3.7,3.7),y=rand(1.1,2.9),d=far==null?3:Math.abs(u-far);const sc=(free(u,y)?10:0)+Math.min(d,4)+Math.random();if(sc>bs){bs=sc;best={u,y};}}return best;};
    if(R.big){R.big.t+=dt;const k=Math.min(1,R.big.t/3.2),u=lerp(-6.5,6.5,k),y=2.4+Math.sin(k*Math.PI)*1.2;R.big.d.set(u,y);R.big.d.m.scale.set(3.2,3.2*(1+Math.sin(G.time*14)*0.12),1);if(Math.random()<0.5)ethSpark(u-1,y,3,0xffc040);return k>=1;}
    if(B.st==='wait'){B.t-=dt;if(B.t<=0){B.u=Math.random()<0.5?-5.5:5.5;B.y=4.3;const s=spot(B.u);go(s.u,s.y,1.1);}}
    else if(B.st==='fly'){B.t+=dt;const k=Math.min(1,B.t/B.dur),e=k*k*(3-2*k);B.u=lerp(B.from.u,B.to.u,e);B.y=lerp(B.from.y,B.to.y,e)+Math.sin(k*Math.PI)*0.7;if(Math.random()<0.35)ethSpark(B.u,B.y,2,0xffc040);if(k>=1){B.st='perch';B.calm=0.9;B.per=0;B.startle=0;}}
    else if(B.st==='perch'){B.calm-=dt;B.per+=dt;
      // в ладошки: две разные тени рядом с птицей — одна слева (или накрыла), другая справа (или накрыла)
      const tired=B.fl>=7;let touch=null;const Ls=[],Rs=[];
      for(const s of S){if(!s.ok)continue;const du=s.u-B.u,tall=s.top>B.y-0.4;if(!tall)continue;if(Math.abs(du)<s.w+0.15&&s.top>B.y-0.15&&!touch)touch=s;
        if(Math.abs(du)<s.w+0.9){if(du<=0.2)Ls.push(s);if(du>=-0.2)Rs.push(s);}}
      const flank=Ls.some(a=>Rs.some(b=>b.h!==a.h)),left=Ls[0],right=Rs.find(b=>b!==left)||Rs[0];
      if(flank||(touch&&tired)){B.st='caught';B.t=0;R.n++;ETH.stats.catches++;SFX.flower();SFX.dzin();ethSpark(B.u,B.y,18,0xffd050);CINE&&CINE.punch&&CINE.punch(0.2);floatText(ethWall(B.u,B.y+0.6),'Поймали!','#ffd050');ethTish(2);
        const f=R.feath[R.n-1],u0=B.u,y0=B.y;anim(0.8,k=>{f.set(lerp(u0,[-0.9,0,0.9][R.n-1],k),lerp(y0,4.3,k));f.m.material.opacity=0.3+k*0.7;f.m.rotation.z=(1-k)*4;});
        try{for(const s of[left,right,touch])if(s)ACT.emote(s.h,'joy',0.05);}catch(e){}}
      else if(touch&&B.calm<=0){B.startle+=dt;if(B.startle>0.2){B.fl++;ETH.stats.flees++;SFX.swish();if(B.fl===1)ethSay('tishka','t6',2.6);
        // вспархивает от тени и садится у тени друга — с той стороны, откуда гонят
        let o=null;for(const s of S){if(!s.ok||s.h===touch.h||s.top<1.3)continue;if(!o||Math.abs(s.u-touch.u)>Math.abs(o.u-touch.u))o=s;}
        if(o){const dir=Math.sign(touch.u-o.u)||1;let u=o.u+dir*(o.w+0.5);if(Math.abs(u)>3.9)u=o.u-dir*(o.w+0.5);go(u,Math.min(o.top-0.35,rand(1.2,2.6)),0.75);}else{const s=spot(touch.u);go(s.u,s.y,0.75);}}}
      else B.startle=0;
      if(B.st==='perch'&&B.per>4.5){const s=spot(B.u);go(s.u,s.y,0.9);}}
    else if(B.st==='caught'){B.t+=dt;B.d.m.material.opacity=Math.max(0,1-B.t*3);if(B.t>1.1){B.d.m.material.opacity=1;B.fl=0;if(R.n>=3){B.d.piv.visible=false;R.glow.piv.visible=false;
        R.big={t:0,d:ethSmall(1,1,ethMB(ETX.bird,0xffffff,true,1),0.2,-6.5,2.4,9)};SFX.horn();ethSay('tishka','t7',2.6);}else{B.st='wait';B.t=0.4;}}}
    const fl=Math.sin(G.time*(B.st==='fly'?22:6));B.d.set(B.u,B.y);B.d.m.scale.set(B.face*1.1,1.1*(1+fl*0.12),1);R.glow.set(B.u,B.y);R.glow.m.material.opacity=0.45+fl*0.1;
    return false;},
  force(R){if(!R.big){R.n=3;R.B.d.piv.visible=false;R.glow.piv.visible=false;R.feath.forEach(f=>f.m.material.opacity=1);R.big={t:0,d:ethSmall(1,1,ethMB(ETX.bird,0xffffff,true,1),0.2,-6.5,2.4,9)};}},
  done(R){},
  obj(R,pi){return G.solo?'Жар-птица — в ладошки: оставь героя ('+K(0,'swap')+'), гони птицу к его тени — и с двух сторон!':'Жар-птица — в ладошки: подведите тени с двух сторон — и хлоп! Перьев: '+R.n+' / 3';},
  off(R){for(const f of R.feath)anim(1,k=>{f.m.material.opacity=1-k;});if(R.big)R.big.d.piv.visible=false;}},

 {id:'horo',name:'Сценка четвёртая · Хоровод',sub:'все четверо — вокруг Кощея; на хлопок — прыжок',limit:120,
  init(R){const EL=ETH.EL;const k=makeKoschei();R.K=k;k.g.position.set(0.3,0,-5.2);k.g.scale.setScalar(0.01);ethCast(k.g,[],true);ETH.ghosts.push(k.g);
    R.crown=k.head.children.find(c=>c.isGroup)||null;anim(1.0,q=>{k.g.scale.setScalar(0.01+q*0.67);});SFX.keys&&SFX.keys();
    _eV.set(0.3,2.65,-5.2);const o=ethProj(_eV,{});R.ku=o.u;R.ky=o.y;
    R.slots=ethSlots([{u:R.ku-3.35,y:2.45,du:0.62,dy:0.8},{u:R.ku-1.75,y:2.7,du:0.62,dy:0.8},{u:R.ku+1.75,y:2.7,du:0.62,dy:0.8},{u:R.ku+3.35,y:2.45,du:0.62,dy:0.8}]);
    R.links=[0,1,2,3].map(()=>ethSmall(0.62,0.31,ethMB(ETX.link,0xffe08a,true,0.25),0.13,0,1.45,8));
    R.beat=ethSmall(1.0,1.0,ethMB(ETX.solid,0xffe08a,true,0.0),0.13,R.ku,4.15,8);R.appr=ethSmall(1.0,1.0,ethMB(ETX.ring,0xffffff,true,0.0),0.12,R.ku,4.15,8);
    R.rings=[0,1,2].map(i=>ethSmall(2.4+i*0.75,(2.4+i*0.75)*1.3,ethMB(ETX.ring,0xffc850,true,0),0.12,R.ku,1.75,8));
    R.ph='form';R.fT=0;R.next=0;R.per=1.3;R.win=0.42;R.n=0;R.miss=0;R.tr=-1;R.help=[];ethSay('pelageya','p5',4.7);},
  tick(R,S,dt){const k=R.K;
    if(R.tr>=0)return ethHoroTrans(R,dt);
    const all=ethSlotsTick(R.slots,S,dt,true);
    // руки: звенья между соседними тенями (Кощей — посередине) горят, когда оба соседа на месте
    const col=[R.slots[0].held,R.slots[1].held,{u:R.ku,top:R.ky},R.slots[2].held,R.slots[3].held];
    R.links.forEach((l,i)=>{const a=col[i+(i>=2?1:0)],b=col[i+(i>=2?2:1)];const ua=a?a.u:[R.slots[0].u,R.slots[1].u,R.ku,R.slots[2].u,R.slots[3].u][i+(i>=2?1:0)],ub=b?b.u:[R.slots[0].u,R.slots[1].u,R.ku,R.slots[2].u,R.slots[3].u][i+(i>=2?2:1)];
      l.set((ua+ub)/2,1.45+Math.sin(G.time*3+i)*0.04);const on=!!(a&&b);l.m.material.opacity=on?0.95:0.22;l.m.scale.setScalar(on?1.15:0.9);});
    k.body.rotation.z=Math.sin(G.time*1.3)*0.04;
    if(R.ph==='form'){if(all)R.fT+=dt;else R.fT=0;R.beat.m.material.opacity=0;R.appr.m.material.opacity=0;
      if(R.fT>0.6){R.ph='beat';R.next=G.time+1.7;ethSay('pelageya','p6',2.6);}}
    else if(R.ph==='beat'){if(R.slots.some(sl=>sl.lost>1.0)){R.ph='form';R.fT=0;tip(0,'Хоровод разомкнулся — все в круги!',2);if(!G.solo)tip(1,'Хоровод разомкнулся — все в круги!',2);return false;}
      for(const pi of[0,1])if(tap(pi,'jump'))ETH.jT[G.solo?G.soloPi:pi]=G.time;if(G.solo)ETH.jT[1-G.soloPi]=ETH.jT[G.soloPi];
      const dtb=R.next-G.time;R.beat.m.material.opacity=0.55+Math.max(0,1-Math.abs(dtb)*5)*0.45;R.appr.m.material.opacity=dtb>0?Math.min(1,1.3-dtb/R.per):0;R.appr.m.scale.setScalar(1+Math.max(0,dtb)/R.per*1.8);
      if(dtb<=0&&!R.clap){R.clap=true;tone(1180,0.05,'square',0.16);tone(780,0.07,'triangle',0.14,0,0.02);ethTish(1);floatText(ethWall(R.ku,4.6),'Хлоп!','#ffe08a');}
      const W2=R.miss>=3?0.62:R.win;
      if(G.time>R.next+W2){const ok=pi=>Math.abs(ETH.jT[pi]-R.next)<=W2;const one=G.solo||R.miss>=6;const good=one?(ok(0)||ok(1)):(ok(0)&&ok(1));
        // промах считается, только если кто-то прыгал (ждущие хлопки — не промах); после трёх — окно шире, после шести — хватит одного
        const tried=[0,1].some(pi=>Math.abs(ETH.jT[pi]-R.next)<=R.per*0.6);
        if(good){R.n++;ETH.stats.beats++;ethHoroHop(R);}else if(tried){R.miss++;ETH.stats.miss++;if(R.miss===3)tip(0,'Тишка хлопает медленнее — прыгайте на хлопок!',2.4);
          if(ok(0)!==ok(1)&&!G.solo){const late=ok(0)?1:0;tip(late,'Вместе с другом — на хлопок!',1.8);}}
        R.clap=false;R.next=G.time+R.per+(R.miss>=3?0.25:0)-W2;if(R.n>=3){R.tr=0;R.beat.piv.visible=false;R.appr.piv.visible=false;}}}
    return false;},
  force(R){if(R.tr<0){while(R.n<3){R.n++;ethHoroHop(R);}R.tr=0;R.beat.piv.visible=false;R.appr.piv.visible=false;}},
  done(R){},
  obj(R,pi){if(R.tr>=0)return 'Хоровод!';if(R.ph==='beat')return 'На хлопок — прыжок '+K(pi,'jump')+(G.solo?'':' — вместе!')+' Раз-два-три: '+R.n+' / 3';
    return G.solo?'Хоровод: все четверо — в круги вокруг Кощея ('+K(0,'swap')+' — следующий герой)':'Хоровод: все четверо — в круги вокруг Кощея (смена героя — '+K(pi,'swap')+')';},
  off(R){ethSlotsOff(R.slots);for(const l of R.links)l.piv.visible=false;}}];
// удачный прыжок хоровода: прыгают все на кругах, вокруг тени Кощея загорается кольцо, сам Кощей ёжится
function ethHoroHop(R){for(const sl of R.slots){const h=sl.held&&sl.held.h;if(h&&h.grounded&&!h.active){h.vel.y=h.d.jump*0.8;h.grounded=false;}}
  SFX.link();SFX.jump();const r=R.rings[R.n-1];if(r)anim(0.5,k=>{r.m.material.opacity=k*0.7;r.m.scale.setScalar(1.4-k*0.4);});
  ethSpark(R.ku,R.ky,10);floatText(ethWall(R.ku,3.9),['Раз!','Два!','Три!'][R.n-1]||'Ух!','#ffe08a');const s0=R.K.g.scale.x;anim(0.3,k=>{R.K.g.scale.set(s0*(1-0.06*Math.sin(k*Math.PI)),s0*(1-0.08*k),s0);});}
// превращение: корона слетает, Кощей — мальчишка с молоточком, помощники встают в хоровод
function ethHoroTrans(R,dt){const t0=R.tr;R.tr+=dt;const t=R.tr,k=R.K,EL=ETH.EL,at=x=>t0<x&&t>=x;
  R.rings.forEach((r,i)=>{r.m.rotation.z+=dt*(i%2?-0.7:0.9);});
  if(at(0.05)){SFX.dzin();CINE&&CINE.punch&&CINE.punch(0.3);ethSpark(R.ku,R.ky,24);if(R.crown){const c=R.crown,p0=c.position.clone();anim(1.4,q=>{c.position.set(p0.x+q*0.6,p0.y+q*2.4+Math.sin(q*Math.PI)*0.8,p0.z);c.rotation.z=q*7;});}}
  if(at(0.7)){const s=k.g.scale.clone();anim(0.9,q=>{k.g.scale.set(lerp(s.x,0.52,q),lerp(s.y,0.42,q),lerp(s.z,0.52,q));});
    const hm=new THREE.Group();k.hand.add(hm);part(hm,new THREE.CylinderGeometry(0.05,0.05,0.7,6),MAT.dark,0,-0.2,0.1);part(hm,new THREE.BoxGeometry(0.4,0.22,0.22),MAT.dark,0,-0.55,0.1);ethCast(hm,[],true);}
  if(at(1.7)){const y0=k.g.position.y;anim(1.0,q=>{k.g.position.y=y0+Math.abs(Math.sin(q*Math.PI*2))*0.45;});anim(1.6,q=>{k.armR.rotation.z=Math.sin(q*Math.PI*4)*0.9*Math.min(1,q*3);});
    ethSay('tishka','t8',2.8);ethCheer(true);for(const r of R.rings)anim(0.8,q=>{r.m.material.color.setHex(0xfff2b0);});
    // помощники из Сказов — тенями в хоровод, по краям
    const SH=(EL&&EL.SH||[]).filter(s=>s.k!=='koschei').slice(0,4);SH.forEach((s,i)=>{later(0.25*i,()=>{let m;try{m=s.make();}catch(e){return;}const bb=new THREE.Box3().setFromObject(m.g),hgt=Math.max(0.5,bb.max.y-bb.min.y,(bb.max.x-bb.min.x)*0.6);
      const u=[R.ku-5.0,R.ku-4.3,R.ku+4.3,R.ku+5.0][i],tw=ethWall(u,0,0.07);const p=new V3(ETH.L.x+(tw.x-ETH.L.x)*0.86,0,ETH.L.z+(tw.z-ETH.L.z)*0.86);
      m.g.position.copy(p);m.g.rotation.y=Math.atan2(ETH.L.x-p.x,ETH.L.z-p.z);ethCast(m.g,[],true);ETH.ghosts.push(m.g);const sc=2.1/hgt;m.g.scale.setScalar(0.01);anim(0.5,q=>{m.g.scale.setScalar(0.01+sc*q*(1+Math.sin(q*Math.PI)*0.25));});const y0=m.g.position.y;later(0.6,()=>anim(1.2,q=>{m.g.position.y=y0+Math.abs(Math.sin(q*Math.PI*2))*0.35;}));SFX.flower();ethSpark(u,1.2,8);});});
    banner('Хоровод!','#ffe08a',2.6,'Кощей — снова мальчишка с молоточком: сказку слушать пришёл');}
  if(at(4.2))ethSay('pelageya','p7',3.2);
  return t>=7.4;}

/* ---------- ход: старт, сценки, конец ---------- */
ETH.start=function(EL){if(!EL||!W||W.levelId!=='epi')return false;ethTexs();
  ETH.on=true;ETH.EL=EL;ETH.st='intro';ETH.t=0;ETH.ri=-1;ETH.rd=null;ETH.said={};ETH.log=[];ETH.px.length=0;ETH.dec.length=0;ETH.marks.length=0;ETH.ghosts.length=0;ETH.save={custom:W.custom};
  Object.assign(ETH.stats,{giant:0,stars:0,formed:0,fires:[0,0],flees:0,catches:0,beats:0,miss:0,forced:[],rounds:[],done:false});ETH.uni.uL.value.copy(ETH.L);ETH.uni.uA.value=0;
  const F=EL.F;F.stage='theatre';W.custom=null;
  for(const h of HEROES)ethCast(h.g,[h.marker,h.shield,h.arc,h.clingRing,h.cone,h.aura,h.yarn,h._xr]);
  if(EL.tish)ethCast(EL.tish.g);if(EL.kot)ethCast(EL.kot.g);
  ETH.lan=ethLantern();ETH.lan.g.visible=false;ETH.pool=ethBig(10.5,5.6,ethMB(ETX.glow,0xffb060,true,0),0.03,0,2.0,2);
  const yo=HERO.yosha,pe=HERO.pelageya;W.camFn=ethCam;
  // висячую лампу — под потолок, Звенышко — в сторону: на стене им не место
  {const lg=EL.room.lampG,z=W.zven;ETH.save.lampY=lg.position.y;ETH.save.zp=z?z.pos.clone():null;const zp=z?z.pos.clone():null;
    later(2.8,()=>{anim(1.4,k=>{lg.position.y=ETH.save.lampY+k*2.8;if(z)z.pos.lerpVectors(zp,new V3(-4.4,3.1,-2.4),k);});});}
  for(const pi of[0,1]){W.objectives[pi]=[O(()=>ETH.obj(pi),()=>!ETH.on,()=>[]),O('…',()=>false,()=>[])];players[pi].obj=0;}
  // подсказки-кнопки над героями: огонь Змея, прыжок на хлопок; в одиночку — «смени героя», когда этот уже на круге
  const RD=()=>ETH.rd,hp=pi=>()=>{const h=active(pi);return h.pos.clone().add(new V3(0,heroHeight(h)+0.9,0));},me=pi=>!G.solo||pi===G.soloPi;
  for(const pi of[0,1]){prompt(pi,'attack',hp(pi),()=>ETH.on&&me(pi)&&RD()&&RD().def.id==='zmei'&&RD().formed&&RD().fly<0,'огнём!');
    prompt(pi,'jump',hp(pi),()=>ETH.on&&me(pi)&&RD()&&RD().def.id==='horo'&&RD().ph==='beat'&&RD().tr<0,'на хлопок');
    prompt(pi,'swap',hp(pi),()=>{const R=RD();if(!ETH.on||!me(pi)||!R||!R.slots||R.formed||R.ph==='beat'||!G.solo&&R.def.id!=='horo'&&R.def.id!=='zmei')return false;const h=active(pi);return R.slots.some(sl=>sl.held&&sl.held.h===h)&&R.slots.some(sl=>!sl.held);},'другой герой');}
  W.pauseLine='Эпилог. Театр теней.<br>Ближе к фонарю — тень больше; прыгнул — и тень прыгнула.<br>Змей о трёх головах, Жар-птица в ладошки, хоровод вокруг Кощея.<br>В одиночку: смена героя — прежний стоит на месте.';
  play({dur:9.6,fov:46,camK:2.2,shots:[shot(0,[1.2,2.0,4.6],[-0.4,1.1,-1.6]),shot(3.2,[0.3,3.1,8.4],[0.3,1.8,-3.4],[0.3,2.9,9.1],[0.3,1.85,-3.0],5)],
    says:[[0.4,3.9,'pelageya',ETH_TXT.p1],[5.6,3.4,'tishka',ETH_TXT.t1]],
    events:[{t:0.1,fn:()=>{anim(0.7,k=>{yo.body.rotation.z=1.3*(1-k);});try{ACT.emote(yo,'surprise',0.6);ACT.emote(pe,'nod',0.2);}catch(e){}}},
      {t:1.6,fn:()=>{const lg=ETH.lan.g,p0=pe.pos.clone().add(new V3(0,0.9,0.3));lg.visible=true;anim(1.1,k=>{lg.position.set(lerp(p0.x,ETH.L.x,k),p0.y*(1-k)+Math.sin(k*Math.PI)*0.5,lerp(p0.z,ETH.L.z,k));});SFX.latch&&SFX.latch();}},
      {t:2.8,fn:()=>{ethLights(true);anim(1.4,k=>{ETH.uni.uA.value=k;ETH.pool.material.opacity=k*0.6;});SFX.whoosh();}},
      {t:5.4,fn:()=>{ethTish(2);}}],
    end:()=>{ETH.lan.g.visible=true;later(0.2,()=>ETH.round(0));}});   // после пропуска ролика голос гасится — первую реплику сценки чуть позже
  ETH.log.push('start');return true;};
ETH.round=function(i){const prev=ETH.rd;if(prev&&prev.def.off)prev.def.off(prev);
  if(i>=ETH_RD.length){ETH.finish();return;}const def=ETH_RD[i];const R={def,t:0,i,fin:-1};ETH.ri=i;ETH.rd=R;ETH.st=def.id;def.init(R);ETH.log.push('round:'+def.id);
  banner(def.name,'#ffe0a0',2.8,def.sub);SFX.bell();};
ETH.obj=function(pi){const R=ETH.rd;if(ETH.st==='intro')return 'Смотрим на стену — Пелагея фонарь ставит';if(!R)return '…';return R.def.obj(R,pi);};
ETH.tick=function(dt){if(!ETH.on)return;ETH.t+=dt;const A=ETH.uni.uA.value;
  if(ETH.pool)ETH.pool.material.opacity=0.6*A*(0.92+Math.sin(G.time*7.3)*0.04+Math.sin(G.time*2.1)*0.04);
  if(ETH.lan){ETH.lan.halo.lookAt(shared.pos);ETH.lan.halo.material.opacity=0.45+Math.sin(G.time*9)*0.08;}
  const R=ETH.rd;if(!R||G.cine||G.ui)return;R.t+=dt;const S=HEROES.map(ethShadow);ETH.S=S;
  if(R.fin>=0){R.fin+=dt;if(R.fin>2.6){ETH.stats.rounds.push(R.def.id);ETH.round(R.i+1);}return;}
  let done=R.def.tick(R,S,dt);
  if(!done&&R.t>R.def.limit&&!R.forced){R.forced=true;ETH.stats.forced.push(R.def.id);R.def.force(R);banner('Тишка в ладоши хлопает','#ffe0a0',2,'и так — загляденье!');}
  if(R.forced&&!done&&R.t>R.def.limit+8)done=true;
  if(done){R.fin=0;R.def.done(R);ethCheer(R.i===ETH_RD.length-1);ETH.log.push('done:'+R.def.id);}};
// конец: тени гаснут, свет как был, герои — по местам, дальше колыбельная Тишки (e2)
ETH.finish=function(){if(ETH.st==='end')return;ETH.st='end';bannerT=0;$('banner').style.opacity=0;ETH.rd=null;ETH.stats.done=true;ETH.log.push('finish');const EL=ETH.EL;
  ethLights(false);{const lg=EL&&EL.room.lampG,z=W.zven,y0=lg?lg.position.y:0,zp=z?z.pos.clone():null;anim(1.0,k=>{ETH.uni.uA.value=1-k;if(ETH.pool)ETH.pool.material.opacity=0.6*(1-k);if(lg&&ETH.save.lampY!=null)lg.position.y=lerp(y0,ETH.save.lampY,k);if(z&&ETH.save.zp)z.pos.lerpVectors(zp,ETH.save.zp,k);});}
  later(1.1,()=>{for(const d of ETH.dec)d.visible=false;for(const m of ETH.marks)m.visible=false;ethUncast();for(const g of ETH.ghosts)g.visible=false;
    W.camFn=null;W.custom=ETH.save.custom;ETH.on=false;if(!EL)return;EL.place();const yo=HERO.yosha;yo.body.rotation.z=1.3;EL.F.stage='e2pre';EL.e2();});};
// для ботов: тень героя, где встать, принудительно закончить сценку
ETH.dbg={lights:()=>({amb,sun}),shadow:k=>ethShadow(HERO[k]),ideal:(k,u,y)=>ethIdeal(heroHeight(HERO[k]),u,y,new V3()),proj:p=>ethProj(p,{}),force:()=>{const R=ETH.rd;if(R&&R.fin<0){R.t=R.def.limit+1;}},rd:()=>ETH.rd,RD:ETH_RD};
{const _step=step;step=function(dt){_step(dt);if(!W||W.levelId!=='epi'||!ETH.on)return;try{ETH.tick(dt);}catch(e){console.error(e);}};}
// тени-двойники висят на мешах героев, а герои живут между уровнями — снимаем их при конце театра и при любой смене уровня
function ethUncast(){for(const p of ETH.px)if(p.parent)p.parent.remove(p);ETH.px.length=0;ETH.uni.uA.value=0;}
{const _ll=loadLevel;loadLevel=function(i){ethUncast();ETH.on=false;ETH.rd=null;ETH.st='';ETH.EL=null;ETH.dec.length=0;ETH.marks.length=0;ETH.ghosts.length=0;_ll(i);};}
