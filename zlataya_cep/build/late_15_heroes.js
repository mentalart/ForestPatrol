/* ============================== РЕЛИЗ final03 · НОВЫЕ ГЕРОИ: скелетные меши в духе Synty Simple ============================== */
// Пропорции: голова ≈ 1/2,5–1/3 роста, большие глаза с бликом и веками, короткие конечности; силуэты узнаются залитыми чёрным.
// Один SkinnedMesh на героя (одна отрисовка). Кости: таз → грудь → шея → голова (уши, брови, веки, глаза, рот) · плечо → рука → локоть → кисть ·
// бедро → колено → стопа · хвост · крылья и клюв у Пелагеи · шар у Йоши. Каждая вершина жёстко привязана к своей кости.
// Совместимость с прототипом: parts.tail · parts.legs (теперь две ноги Потапа) · parts.wings (userData.s, раскрытие по z) · parts.beak (покой rotation.x = 0.5, .visible) · parts.ball.
const HMAT=new THREE.MeshLambertMaterial({vertexColors:true,skinning:true});HMAT.userData.shared=true;HMAT.userData.kit=true;
class SkGeo extends KGeo{constructor(H,sd){super(H,sd);this.SI=[];this.vary=false;}   // final05: цвета героев без вариаций палитры
  on(bi,g,pal,m,o){const n0=this.P.length/3;this.add(g,pal,m,o);const n1=this.P.length/3;for(let i=n0;i<n1;i++)this.SI.push(bi);return this;}
  buildSk(){const g=this.build(),n=this.SI.length,si=new Uint16Array(n*4),sw=new Float32Array(n*4);for(let i=0;i<n;i++){si[i*4]=this.SI[i];sw[i*4]=1;}
    g.setAttribute('skinIndex',new THREE.BufferAttribute(si,4));g.setAttribute('skinWeight',new THREE.BufferAttribute(sw,4));return g;}}
// риг: кости в позе привязки — только смещения (оси как у модели), детали задаются в координатах своей кости
function heroRig(H,seed){const R={bones:[],map:{},bind:{},K:new SkGeo(H,seed)};const root=new THREE.Bone();root.name='root';R.bones.push(root);R.map.root=root;R.bind.root=new V3();
  R.bone=(name,parent,x,y,z)=>{const b=new THREE.Bone();b.name=name;b.position.set(x,y,z);R.map[parent].add(b);R.bones.push(b);R.map[name]=b;R.bind[name]=R.bind[parent].clone().add(b.position);return b;};
  R.part=(bone,g,pal,m,o)=>{const w=R.bind[bone],M=new THREE.Matrix4().makeTranslation(w.x,w.y,w.z);if(m)M.multiply(m);R.K.on(R.bones.indexOf(R.map[bone]),g,pal,M,Object.assign({kN:0.32,kG:0.12,kJ:0.08},o||{}));};
  R.box=(bone,w,h,d,pal,m,o)=>R.part(bone,sBoxGeo(w,h,d,{b:(o&&o.b!=null)?o.b:Math.min(w,h,d)*0.25}),pal,m,o);
  R.mesh=mat=>{const g=R.K.buildSk(),mesh=new THREE.SkinnedMesh(g,mat);mesh.add(root);mesh.updateMatrixWorld(true);mesh.bind(new THREE.Skeleton(R.bones));
    mesh.castShadow=true;mesh.receiveShadow=false;mesh.frustumCulled=false;mesh.userData.hero=true;return mesh;};return R;}
// общие детали лица и конечностей
const hSph=(r,w,h)=>KP.sph(r,w||7,h||5);
const hIco=r=>KP.ico(r,0);
function hEye(R,s,x,y,z,r,iris,o){o=o||{};const e='eye'+s,l='lid'+s;R.bone(e,'head',x,y,z);R.bone(l,'head',x,y,z);
  R.part(e,hSph(r,6,4),PAL.white,tm(0,0,0,0,0,0,1,1,0.72),{kN:0.15,kJ:0.02,s:0.5});
  R.part(e,hSph(r*0.72,5,3),iris||PAL.night,tm(0,0,r*0.36,0,0,0,1,1.06,0.5),{kN:0.1,kJ:0,s:iris?0.1:-0.2});
  if(iris)R.part(e,hIco(r*0.42),PAL.night,tm(0,0,r*0.56,0,0,0,1,1.1,0.5),{kN:0,kJ:0,s:-0.6});
  R.part(e,hIco(r*0.22),PAL.white,tm(r*0.28,r*0.3,r*0.7),{kN:0,kJ:0,s:1});R.part(e,hIco(r*0.1),PAL.white,tm(-r*0.25,-r*0.26,r*0.72),{kN:0,kJ:0,s:1});
  // веко: верхняя полусфера цвета шерсти; в покое повёрнуто назад (глаз открыт), вперёд — прикрывает
  R.part(l,new FIN.orig.Sphere(r*1.13,6,2,0,Math.PI*2,0,Math.PI/2),o.lid||PAL.fox,tm(0,0,0,0,0,0,1,1,0.8),{kN:0.3,kJ:0.04});R.map[l].rotation.x=-1.85;}
function hBrow(R,s,x,y,z,w,pal,rz){const b='brow'+s;R.bone(b,'head',x,y,z);R.box(b,w,w*0.26,w*0.3,pal||PAL.bark,tm(0,0,0,0.2,0,rz||0),{kN:0.2,b:0});}
function hMouth(R,x,y,z,w){R.bone('mouth','head',x,y,z);R.part('mouth',hSph(w,6,4),PAL.night,tm(0,0,0,0,0,0,1.4,0.75,0.5),{kN:0,kJ:0,s:-0.3});
  R.part('mouth',hIco(w*0.62),PAL.pink,tm(0,-w*0.32,w*0.12,0,0,0,1.3,0.5,0.5),{kN:0,kJ:0,s:0});R.map.mouth.scale.y=0.32;}
function hLimb(R,side,pre,parent,sh,segs){ // segs: [[кость, длина до следующей, r0, r1, pal]…], кости идут вниз по −y
  let par=parent;segs.forEach(([name,len,r0,r1,pal,off],i)=>{const bn=name+side;const p=i===0?sh:[0,-segs[i-1][1],off||0];R.bone(bn,par,p[0],p[1],p[2]);if(len>0&&pal)R.part(bn,new FIN.orig.Cylinder(r1,r0,len,6,1,true),pal,tm(0,-len/2,0),{noise:0.004,kN:0.25});par=bn;});}
// ---------- Прошка: лис, тонкий, высокий, треугольники; длинные ноги (высокий прыжок), рогатка за поясом, пушистый хвост ----------
function buildProshka(){const R=heroRig(1.25,3);const F=PAL.fox,C=PAL.cream,D=PAL.bark;
  R.bone('hips','root',0,0.5,0);R.bone('chest','hips',0,0.2,0);R.bone('neck','chest',0,0.1,0.01);R.bone('head','neck',0,0.12,0.02);
  R.part('chest',KP.lathe([[0,-0.27],[0.11,-0.26],[0.155,-0.18],[0.15,-0.06],[0.125,0.04],[0.085,0.1],[0,0.12]],7),F,tm(0,0,0,0,0,0,1,1,0.86));
  R.part('chest',hSph(0.11,6,4),C,tm(0,-0.08,0.085,0,0,0,1,1.45,0.55),{s:0.2});
  R.part('chest',KP.tor(0.1,0.032,3,8),PAL.green,tm(0,0.09,0,Math.PI/2,0,0),{kN:0.3});R.part('chest',KP.cone(0.085,0.16,3),PAL.green,tm(0,0.02,0.1,Math.PI,0,0,1,1,0.35),{kN:0.3});
  R.part('hips',KP.tor(0.14,0.022,3,10),PAL.log,tm(0,-0.03,0,Math.PI/2,0,0),{kN:0.3});R.box('hips',0.05,0.05,0.02,PAL.gold,tm(0,-0.03,0.14),{b:0.008});
  // рогатка
  R.part('hips',KP.cyl(0.012,0.014,0.12,4),PAL.log,tm(-0.15,-0.09,0.04,0,0,0.12));for(const s of[-1,1])R.part('hips',KP.cyl(0.01,0.012,0.08,4),PAL.log,tm(-0.15+s*0.02,-0.0,0.04,0,0,-s*0.45));
  R.part('hips',KP.cyl(0.006,0.006,0.07,3),PAL.red,tm(-0.15,0.02,0.045,0,0,Math.PI/2));
  // голова
  R.part('head',hSph(0.19,8,6),F,tm(0,0,0,0,0,0,1.06,0.9,1));for(const s of[-1,1])R.part('head',hSph(0.1,6,4),C,tm(s*0.1,-0.07,0.09,0,0,0,1,0.75,0.8),{s:0.25});
  const mz=KP.cone(0.085,0.21,7);mz.rotateX(Math.PI/2);R.part('head',mz,C,tm(0,-0.05,0.2),{s:0.2});R.part('head',hIco(0.035),PAL.night,tm(0,-0.035,0.305),{s:-0.2});
  R.part('head',hIco(0.07),F,tm(0,0.1,0.08,0,0,0,1.4,0.6,1),{s:0.1});
  for(const[s,n]of[[1,'L'],[-1,'R']]){R.bone('ear'+n,'head',s*0.115,0.16,-0.02);R.part('ear'+n,KP.cone(0.075,0.24,4),F,tm(0,0.1,0,0,Math.PI/4,-s*0.22,1,1,0.55));
    R.part('ear'+n,KP.cone(0.045,0.15,4),C,tm(-s*0.01,0.07,0.03,0,Math.PI/4,-s*0.22,1,1,0.35),{s:0.3});R.part('ear'+n,KP.cone(0.034,0.07,4),PAL.night,tm(s*0.026,0.2,0,0,Math.PI/4,-s*0.22,1,1,0.55),{s:0.1});
    hEye(R,n,s*0.085,0.05,0.155,0.062,null,{lid:F});hBrow(R,n,s*0.088,0.13,0.17,0.075,D,s*0.12);}
  hMouth(R,0,-0.1,0.2,0.035);
  // руки: рыжие плечи, тёмные «носочки» и кисти
  for(const[s,n]of[[1,'L'],[-1,'R']]){hLimb(R,n,'','chest',[s*0.15,0.05,0],[['shoulder',0,0,0,null],['arm',0.16,0.042,0.036,F],['elbow',0.13,0.036,0.032,D],['hand',0,0,0,null]]);
    R.part('hand'+n,hSph(0.045,5,4),D,tm(0,-0.02,0.005),{s:-0.1});
    hLimb(R,n,'','hips',[s*0.085,-0.02,0],[['hip',0.22,0.064,0.05,F],['knee',0.21,0.045,0.038,D],['foot',0,0,0,null]]);
    R.box('foot'+n,0.1,0.07,0.19,D,tm(0,-0.005,0.035),{s:-0.05});R.box('foot'+n,0.105,0.02,0.2,PAL.log,tm(0,-0.03,0.035),{s:-0.4,b:0});}
  // хвост: три пушистых клуба, кончик белый
  R.bone('tail','hips',0,0.02,-0.13);R.bone('tailTip','tail',0,0.17,-0.25);
  R.part('tail',KP.ico(0.085,0),F,tm(0,0.02,-0.07,0,0,0,1,1,1.3),{noise:0.012});R.part('tail',KP.ico(0.125,0),F,tm(0,0.09,-0.18,0.5,0,0,1,1.1,1.25),{noise:0.015});
  R.part('tailTip',KP.ico(0.11,0),F,tm(0,0,0,0.3,0.4,0),{noise:0.012});R.part('tailTip',KP.ico(0.085,0),PAL.white,tm(0,0.06,-0.05,0.2,0,0),{noise:0.01,s:0.4});
  return R;}
// ---------- Потап: медведь на двух ногах, широкий и круглый; косоворотка, кушак, онучи и лапти; большие лапы (подкидка, широкий щит) ----------
function buildPotap(){const R=heroRig(1.7,5);const B=PAL.bear,C=PAL.cream,S=PAL.red,Gd=PAL.gold;
  R.bone('hips','root',0,0.5,0);R.bone('chest','hips',0,0.36,0);R.bone('neck','chest',0,0.27,0.02);R.bone('head','neck',0,0.2,0.05);
  R.part('chest',KP.lathe([[0,-0.44],[0.3,-0.43],[0.42,-0.32],[0.46,-0.14],[0.445,0.04],[0.39,0.17],[0.27,0.27],[0,0.3]],8),S,tm(0,0,0,0,0,0,1,1,0.86));
  R.part('chest',KP.tor(0.425,0.028,3,10),Gd,tm(0,-0.4,0,Math.PI/2,0,0,1,0.86,1),{kN:0.3,s:0.1});R.part('chest',KP.tor(0.2,0.032,3,9),Gd,tm(0,0.27,0.01,Math.PI/2,0,0),{kN:0.3,s:0.1});
  R.box('chest',0.07,0.24,0.03,Gd,tm(0.13,0.15,0.35,-0.25,0.3,0),{b:0,s:0.1});
  R.part('chest',KP.tor(0.44,0.05,3,10),PAL.yellow,tm(0,-0.25,0,Math.PI/2,0,0,1,0.86,1),{kN:0.35});for(const dz of[-0.03,0.03])R.part('chest',KP.cone(0.035,0.16,4),PAL.yellow,tm(-0.34,-0.36,0.2+dz,0,0,0.15),{kN:0.3});
  // голова
  R.part('head',hSph(0.3,7,6),B,tm(0,0,0,0,0,0,1.08,0.95,1));R.part('head',hSph(0.15,6,4),C,tm(0,-0.08,0.24,0,0,0,1.15,0.82,0.9),{s:0.2});
  R.part('head',hIco(0.06),PAL.night,tm(0,-0.03,0.37,0,0,0,1.35,0.9,1),{s:-0.1});
  for(const[s,n]of[[1,'L'],[-1,'R']]){R.bone('ear'+n,'head',s*0.22,0.2,-0.02);R.part('ear'+n,hSph(0.1,6,4),B,tm(0,0.02,0,0,0,0,1,1,0.62));R.part('ear'+n,hIco(0.06),C,tm(0,0.015,0.04,0,0,0,1,1,0.5),{s:0.2});
    hEye(R,n,s*0.105,0.07,0.245,0.07,null,{lid:B});hBrow(R,n,s*0.11,0.165,0.26,0.1,PAL.log,s*0.1);}
  hMouth(R,0,-0.16,0.31,0.045);
  for(const[s,n]of[[1,'L'],[-1,'R']]){hLimb(R,n,'','chest',[s*0.37,0.17,0],[['shoulder',0,0,0,null],['arm',0.26,0.12,0.11,S],['elbow',0.2,0.105,0.1,B],['hand',0,0,0,null]]);
    R.part('elbow'+n,KP.tor(0.105,0.025,3,6),Gd,tm(0,0.0,0,Math.PI/2,0,0),{kN:0.3,s:0.1});R.part('hand'+n,hSph(0.12,6,4),B,tm(0,-0.04,0.01,0,0,0,1,1.05,0.95));R.part('hand'+n,hIco(0.065),C,tm(0,-0.05,0.08,0,0,0,1,1,0.5),{s:0.2});
    hLimb(R,n,'','hips',[s*0.17,-0.03,0],[['hip',0.2,0.15,0.135,PAL.blue],['knee',0.2,0.125,0.12,PAL.cloth],['foot',0,0,0,null]]);
    for(let i=0;i<2;i++)R.box('knee'+n,0.26,0.02,0.26,PAL.log,tm(0,-0.05-i*0.08,0,(i?0.3:-0.3),0,0),{kN:0.2,b:0});
    R.box('foot'+n,0.2,0.12,0.32,PAL.straw,tm(0,-0.01,0.05),{s:0});R.box('foot'+n,0.21,0.03,0.33,PAL.log,tm(0,-0.06,0.05),{s:-0.2,b:0});
    for(let i=0;i<2;i++)R.box('foot'+n,0.2,0.012,0.02,PAL.log,tm(0,0.045,-0.02+i*0.1),{b:0,s:-0.1});}
  R.bone('tail','hips',0,0.06,-0.36);R.part('tail',hIco(0.08),B);
  return R;}
// ---------- Пелагея: сова-яйцо, сиреневая; лицевой диск и огромные золотые глаза (Совиный взор), кисточки, крылья-руки (планирование), обруч-кокошник ----------
function buildPelageya(){const R=heroRig(1.15,7);const O=PAL.owl,C=PAL.cream,Gd=PAL.gold;
  R.bone('hips','root',0,0.22,0);R.bone('chest','hips',0,0.3,0);R.bone('neck','chest',0,0.18,0);R.bone('head','neck',0,0.12,0.02);
  R.part('chest',KP.lathe([[0,-0.38],[0.22,-0.35],[0.34,-0.22],[0.37,-0.06],[0.34,0.1],[0.27,0.2],[0.15,0.26],[0,0.27]],8),O,tm(0,0,0,0,0,0,1,1,0.92));
  R.part('chest',hSph(0.25,7,5),C,tm(0,-0.09,0.2,0,0,0,0.95,1.15,0.45),{s:0.1});
  for(let i=0;i<7;i++){const row=i<4?0:1,x=(i<4?(i-1.5)*0.09:(i-5)*0.09),y=-0.02-row*0.1;R.part('chest',KP.cone(0.03,0.05,3),O,tm(x,y,0.3-row*0.01,Math.PI+0.3,0,0,1,1,0.4),{s:-0.2,kN:0});}
  R.part('head',hSph(0.27,8,6),O,tm(0,0,0,0,0,0,1.1,0.88,0.95));
  for(const s of[-1,1])R.part('head',hSph(0.14,7,5),C,tm(s*0.105,0.0,0.17,0,0,0,1,1.08,0.42),{s:0.35});
  // кокошник-обруч с бусинами
  R.part('head',KP.tor(0.2,0.018,3,12,Math.PI),Gd,tm(0,0.1,0.02,-0.5,0,0),{kN:0.3,s:0.2});for(let i=0;i<3;i++)R.part('head',hIco(0.022),PAL.red,tm((i-1)*0.1,0.2+(i===1?0.03:0),0.1-Math.abs(i-1)*0.03),{s:0.2});
  R.bone('beak','head',0,-0.035,0.245);const bk=KP.cone(0.048,0.13,5);bk.rotateX(Math.PI/2);R.part('beak',bk,Gd,tm(0,0,0.03),{s:-0.1});
  for(const[s,n]of[[1,'L'],[-1,'R']]){R.bone('ear'+n,'head',s*0.17,0.17,-0.02);R.part('ear'+n,KP.cone(0.06,0.2,4),O,tm(0,0.08,0,0,Math.PI/4,-s*0.4,1,1,0.5),{s:-0.1});
    hEye(R,n,s*0.105,0.025,0.21,0.092,Gd,{lid:O});hBrow(R,n,s*0.11,0.13,0.23,0.085,PAL.night,-s*0.18);}
  R.map.mouth=R.map.beak;
  // крылья-руки: висят вдоль тела, раскрываются вбок по rotation.z (как в прототипе), кончики — перья-«пальцы»
  for(const[s,n]of[[1,'L'],[-1,'R']]){R.bone('wing'+n,'chest',s*0.33,0.14,-0.01);R.part('wing'+n,hSph(0.18,6,4),O,tm(s*0.02,-0.2,-0.01,0,0,0,0.3,1.45,0.95),{s:-0.1});
    for(let i=0;i<3;i++)R.part('wing'+n,KP.cone(0.05,0.2,3),O,tm(s*0.02,-0.44,-0.08+i*0.08,Math.PI,0,0,0.5,1,1),{s:0.25-i*0.1,kN:0.1});R.map['wing'+n].userData.s=s;
    hLimb(R,n,'','hips',[s*0.12,-0.04,0],[['hip',0.08,0.075,0.065,C],['knee',0.08,0.06,0.05,C],['foot',0,0,0,null]]);
    for(let i=0;i<3;i++)R.part('foot'+n,KP.cone(0.022,0.09,4),Gd,tm((i-1)*0.035,-0.012,0.05,Math.PI/2,0,(i-1)*0.3),{s:0.1});}
  R.bone('tail','hips',0,0.04,-0.3);for(let i=0;i<3;i++)R.part('tail',KP.cone(0.06,0.2,3),O,tm((i-1)*0.06,-0.05,-0.04,-2.2,0,(i-1)*0.3,1,1,0.4),{s:-0.1});
  return R;}
// ---------- Йоша: ёжик-шарик, бирюзовые иглы пучками, сливочная мордочка с румянцем, крошечные лапки, ковшик на боку ----------
function buildYosha(){const R=heroRig(0.62,11);const T=PAL.hedge,C=PAL.cream,D=PAL.bark;
  R.bone('ball','root',0,0.31,0);R.bone('head','ball',0,0.02,0.05);
  R.part('ball',hSph(0.29,8,6),T,tm(0,0,0,0,0,0,1,0.93,1.08),{s:-0.75});
  const up=new V3(0,1,0),q=new THREE.Quaternion(),N=40;for(let i=0;i<N;i++){const y=1-2*(i+0.5)/N,r=Math.sqrt(1-y*y),th=i*2.39996;const d=new V3(Math.cos(th)*r,y,Math.sin(th)*r);if(d.z>0.3||d.y<-0.45)continue;
    q.setFromUnitVectors(up,d);const m=new THREE.Matrix4().compose(new V3(d.x*0.27,d.y*0.25,d.z*0.3).addScaledVector(d,0.06),q,new V3(1,1,1));const big=i%3===0;
    R.part('ball',KP.cone(big?0.07:0.055,big?0.22:0.17,3),T,m,{kN:0.4,kG:0.5,s:big?0.25:(i%2?-0.15:0.05)});}
  R.part('head',hSph(0.2,7,5),C,tm(0,-0.03,0.13,0,0,0,1.02,0.9,0.78),{s:0.2});const sn=KP.cone(0.08,0.17,7);sn.rotateX(Math.PI/2);R.part('head',sn,C,tm(0,-0.06,0.27),{s:0.2});
  R.part('head',hSph(0.027,6,4),PAL.night,tm(0,-0.055,0.355),{s:-0.2});for(const s of[-1,1])R.part('head',hIco(0.04),PAL.pink,tm(s*0.12,-0.08,0.22,0,0,0,1,0.6,0.4),{s:0.2});
  for(const[s,n]of[[1,'L'],[-1,'R']]){R.bone('ear'+n,'head',s*0.13,0.13,0.1);R.part('ear'+n,hIco(0.045),C,tm(0,0.01,0,0,0,0,1,1,0.6),{s:0.1});
    hEye(R,n,s*0.08,0.04,0.2,0.058,null,{lid:C});hBrow(R,n,s*0.082,0.115,0.215,0.06,D,s*0.15);
    hLimb(R,n,'','ball',[s*0.21,-0.07,0.1],[['shoulder',0,0,0,null],['arm',0.06,0.035,0.032,D],['elbow',0.05,0.032,0.03,D],['hand',0,0,0,null]]);R.part('hand'+n,hIco(0.04),D);
    hLimb(R,n,'','ball',[s*0.11,-0.2,0.03],[['hip',0.05,0.045,0.04,D],['knee',0.05,0.04,0.035,D],['foot',0,0,0,null]]);R.box('foot'+n,0.075,0.05,0.11,D,tm(0,0.005,0.03),{s:-0.1});}
  hMouth(R,0,-0.1,0.25,0.028);
  // ковшик для живой воды — на боку, на ремешке
  R.part('ball',KP.lathe([[0,-0.05],[0.05,-0.045],[0.07,-0.01],[0.07,0.0],[0,0.0]],7),PAL.plank,tm(-0.29,-0.1,0.02,0,0,-0.4),{kN:0.3});R.part('ball',KP.cyl(0.012,0.012,0.16,4),PAL.plank,tm(-0.25,-0.02,0.02,0,0,-0.4));
  return R;}
const HERO_BUILD={proshka:buildProshka,potap:buildPotap,pelageya:buildPelageya,yosha:buildYosha};FIN.heroBuild=HERO_BUILD;
// HB[вид](body, mk): mk выдаёт один материал на всё (призрак-подсказка, двойник) → рисуется этим материалом (skinning у обычных мешей ни на что не влияет)
function heroMesh(kind,body,mk){const a=mk(0x123456),b=mk(0x654321),solid=a===b?a:null;if(solid)solid.skinning=true;const R=HERO_BUILD[kind]();const mesh=R.mesh(solid||HMAT);body.add(mesh);const B=R.map;
  const parts={rig:B,mesh,bind:R.bind};if(kind==='proshka')parts.tail=B.tail;if(kind==='potap')parts.legs=[B.hipL,B.hipR];
  if(kind==='pelageya'){parts.wings=[B.wingL,B.wingR];parts.beak=B.beak;B.beak.rotation.x=0.5;const bk=B.beak;
    Object.defineProperty(bk,'visible',{get(){return this._vis!==false;},set(v){this._vis=!!v;this.scale.setScalar(v?1:0.001);},configurable:true});}
  if(kind==='yosha')parts.ball=B.ball;return parts;}
for(const k of['proshka','potap','pelageya','yosha'])HB[k]=(body,mk)=>heroMesh(k,body,mk);
FIN.hb=(k,body,mk)=>HB[k](body,mk);
// ---------- пересобрать героев на месте (h.body — тот же объект: на него ссылается логика) ----------
for(const k in WEARMESH){const g=WEARMESH[k];if(g.parent)g.parent.remove(g);delete WEARMESH[k];}
for(const h of HEROES){for(const c of h.body.children.slice())h.body.remove(c);const p=HB[h.kind](h.body,c=>M(c));Object.assign(h.parts,p);if(h.kind==='potap')h.parts.legs=p.legs;h.rig=p.rig;h.rigBind=p.bind;h.eyes=[p.rig.eyeL,p.rig.eyeR];}
// посадка вещей гардероба под новые фигуры; шапка — на кости головы, шея и спина — на груди (двигаются вместе с ними)
Object.assign(FIT,{proshka:{hat:1.07,hs:0.74,neck:[0.8,0.12],back:[0.72,-0.14],bs:0.72,waist:[0.47,0.15],feet:[0.1,0.04]},
  potap:{hat:1.6,hs:1.18,neck:[1.12,0.22],back:[0.95,-0.4],bs:1.2,waist:[0.61,0.45],feet:[0.17,0.05]},
  pelageya:{hat:1.02,hs:0.85,neck:[0.72,0.2],back:[0.6,-0.34],bs:0.9,waist:[0.36,0.36],feet:[0.12,0.05]},
  yosha:{hat:0.57,hs:0.62,neck:[0.24,0.31],back:[0.38,-0.3],bs:0.6,waist:[0.2,0.31],feet:[0.11,0.06]}});
{const _wm=wearMesh;wearMesh=function(kind,id){const key=kind+':'+id,had=!!WEARMESH[key];const g=_wm(kind,id);const h=HERO[kind];
  if(!had&&g&&h&&h.rig&&kind!=='yosha'){const it=WEAR[id],bn=it.slot==='hat'?'head':it.slot==='neck'||it.slot==='back'?'chest':null;
    if(bn&&h.rig[bn]){const w=h.rigBind[bn];h.rig[bn].add(g);g.position.x-=w.x;g.position.y-=w.y;g.position.z-=w.z;}}return g;};}
// ---------- поза по состоянию: ходьба, прыжок, щит, удар, струна, кувырок ----------
const HP={};
function hDamp(o,prop,v,k,dt){o[prop]+= (v-o[prop])*(1-Math.exp(-k*dt));}
FIN.heroWalk=function(h,w,f){const B=h.rig;if(!B||!B.hipL)return;const A=h.kind==='potap'?0.45:h.kind==='yosha'?0.7:0.62;
  for(const[n,ph]of[['L',0],['R',Math.PI]]){const s=Math.sin(w+ph);B['hip'+n].rotation.x=s*A*f;B['knee'+n].rotation.x=Math.max(0,Math.sin(w+ph+1.4))*0.9*f;if(B['foot'+n])B['foot'+n].rotation.x=-s*0.25*f;
    if(B['arm'+n]){B['arm'+n].rotation.x=-s*(h.kind==='potap'?0.38:0.55)*f;B['elbow'+n].rotation.x=-(0.2+Math.max(0,-s)*0.35)*f;}}};
function heroPose(h,dt){const B=h.rig;if(!B||!B.hipL)return;const sp=Math.hypot(h.vel.x,h.vel.z),f=Math.min(1,sp/3.2),air=!h.grounded&&!h.cling&&!h.hang&&!(h.rollT>0);
  const st=HP[h.kind]||(HP[h.kind]={air:0});st.air+=((air?1:0)-st.air)*(1-Math.exp(-10*dt));const a=st.air,K=16;
  // ноги
  for(const[n,ph,sg]of[['L',0,1],['R',Math.PI,-1]]){const s=Math.sin(h.walkT+ph),A=h.kind==='potap'?0.45:h.kind==='yosha'?0.7:0.62;
    let hip=s*A*f*(1-a)+(-0.55+sg*0.12)*a,knee=Math.max(0,Math.sin(h.walkT+ph+1.4))*0.9*f*(1-a)+1.0*a,foot=-s*0.25*f*(1-a)+0.3*a;
    if(h.rollT>0){hip=-1.3;knee=1.9;foot=0.6;}if(h.hang){hip=-0.25+sg*0.2;knee=0.5;foot=0.2;}if(h.cling){hip=-0.6;knee=1.2;}
    const sk=h._skT!=null?G.time-h._skT:9;if(h.kind==='potap'&&sk<0.35){knee=Math.max(knee,0.7*Math.sin(Math.min(1,sk/0.35)*Math.PI));hip=-0.45*Math.sin(Math.min(1,sk/0.35)*Math.PI);hDamp(B['hip'+n].rotation,'x',hip,K,dt);}
    else if(h.kind==='potap'&&!(h.rollT>0)&&!h.hang&&!h.cling&&a<0.05){}else hDamp(B['hip'+n].rotation,'x',hip,K,dt);
    hDamp(B['knee'+n].rotation,'x',knee,K,dt);if(B['foot'+n])hDamp(B['foot'+n].rotation,'x',foot,K,dt);}
  if(!B.armL)return;
  // руки: мах в ходьбе, в прыжке — в стороны, щит — вперёд, удар — правой, струна — вверх
  const atk=h.atkT>0?Math.sin((1-h.atkT/0.28)*Math.PI):0,up=(h._armUp||0),fw=(h._armF||0);
  for(const[n,ph,sg]of[['L',0,1],['R',Math.PI,-1]]){const s=Math.sin(h.walkT+ph);let arm=-s*(h.kind==='potap'?0.38:0.55)*f*(1-a)-0.35*a,el=-(0.2+Math.max(0,-s)*0.35*f),sh=sg*(0.1+0.9*a+up*1.9);
    if(h.guard||h._demoGuard>G.time){arm=-1.25;el=-0.5;sh=sg*0.25;}if(n==='R'&&atk>0){arm=-0.4-2.0*atk;el=-0.2;sh=-0.25;}if(h.hang){arm=-2.95;el=-0.1;sh=sg*0.15;}if(h.cling||h.holding){arm=-1.35;el=-0.35;sh=sg*0.2;}
    if(h.rollT>0){arm=-1.1;el=-1.2;sh=sg*0.2;}arm+=-fw*1.1;
    // умение читается в позе: Прошка целится из рогатки, Потап приседает и вскидывает лапы (подкидка), Йоша поливает из ковшика
    const sk=h._skT!=null?G.time-h._skT:9;if(sk<0.6){const u=sk/0.6,w=u<0.18?u/0.18:u>0.72?(1-u)/0.28:1;let ta=arm,te=el,ts=sh;
      if(h.kind==='proshka'){ta=n==='R'?-1.62:-1.3;te=n==='R'?-0.12:-0.5;ts=n==='R'?-0.12:0.15;}
      else if(h.kind==='potap'){if(u<0.28){ta=0.45;te=-0.3;ts=sg*0.2;}else{ta=-2.75;te=-0.1;ts=sg*0.32;}}
      else if(h.kind==='yosha'&&n==='R'){ta=-1.45;te=-0.6;ts=-0.1;}
      arm+=(ta-arm)*w;el+=(te-el)*w;sh+=(ts-sh)*w;}
    hDamp(B['shoulder'+n].rotation,'z',sh,K,dt);hDamp(B['arm'+n].rotation,'x',arm,K,dt);hDamp(B['elbow'+n].rotation,'x',el,K,dt);}}
{const _anim=animHero;animHero=function(h,dt){_anim(h,dt);try{heroPose(h,dt);}catch(e){console.error(e);}
  if(h._demoGuard>G.time){h.shield.visible=true;h.shieldMat.opacity=0.55;}};}   // щит для обучающих роликов (final04)
{const _ds=doSkill;doSkill=function(pi,h){const c0=h&&h.skillCd||0;_ds(pi,h);if(h&&(h.skillCd||0)>c0+0.01)h._skT=G.time;};}
// ---------- NPC-жители: генератор вариаций (рост, одежда, шапка, борода) ----------
function villagerGeo(v){const Rn=kRng(900+v*37),K=new KGeo(1.6,v*11+900);const shirt=[PAL.red,PAL.blue,PAL.green,PAL.yellow,PAL.cloth][v%5],pants=[PAL.night,PAL.bark,PAL.blue][v%3],skin=PAL.skin,girl=v%2===1;
  const s=0.85+Rn()*0.25;K.add(KP.lathe(girl?[[0,0],[0.3,0],[0.26,0.4],[0.18,0.75],[0.12,0.9],[0,0.92]]:[[0,0.35],[0.2,0.36],[0.24,0.6],[0.2,0.85],[0.12,0.92],[0,0.93]],8),shirt,tm(0,0,0,0,0,0,s,s,s*0.85),{kN:0.3});
  if(!girl)for(const x of[-0.09,0.09]){K.add(KP.cyl(0.07,0.07,0.36,6),pants,tm(x*s,0.18*s,0,0,0,0,s,s,s));K.box(0.12*s,0.07*s,0.18*s,PAL.log,tm(x*s,0.035*s,0.03*s));}
  K.add(KP.tor(0.21*s,0.025*s,3,10),girl?PAL.gold:PAL.yellow,tm(0,0.6*s,0,Math.PI/2,0,0,1,1,0.85),{kN:0.3});
  K.add(hSph(0.19*s,8,6),skin,tm(0,1.08*s,0.02),{kN:0.3});for(const x of[-0.065,0.065]){K.add(hSph(0.035*s,6,4),PAL.night,tm(x*s,1.1*s,0.19*s),{kN:0,s:-0.3});K.add(hSph(0.012*s,4,3),PAL.white,tm(x*s+0.01,1.115*s,0.22*s),{kN:0,s:1});}
  K.add(hSph(0.035*s,5,4),PAL.pink,tm(0,1.05*s,0.2*s),{kN:0.2});
  if(girl){K.add(KP.tor(0.17*s,0.05*s,4,10,Math.PI),PAL.red,tm(0,1.16*s,-0.02,-0.3,0,0),{kN:0.3});K.add(KP.cyl(0.035,0.02,0.45*s,5),PAL.straw,tm(0,0.95*s,-0.18*s,0.25,0,0),{kN:0.2});}
  else{const hat=v%3;if(hat===0)K.add(KP.cyl(0.17*s,0.2*s,0.18*s,8),PAL.night,tm(0,1.28*s,0),{kN:0.3});else if(hat===1)K.add(KP.cone(0.2*s,0.3*s,7),PAL.red,tm(0,1.33*s,-0.02,-0.2,0,0),{kN:0.3});
    if(v%4<2)K.add(KP.cone(0.13*s,0.26*s,6),PAL.white,tm(0,0.92*s,0.14*s,Math.PI+0.3,0,0,1,1,0.6),{kN:0.2});}
  for(const x of[-1,1])K.add(KP.cyl(0.05*s,0.045*s,0.4*s,5),shirt,tm(x*0.25*s,0.68*s,0,0,0,x*0.25),{kN:0.3});
  return K.build();}
