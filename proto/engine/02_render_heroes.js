/* ============================== РЕНДЕР / СЦЕНА ============================== */
const canvas=$('c');
const renderer=new THREE.WebGLRenderer({canvas,antialias:true,powerPreference:'high-performance'});
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));
renderer.setSize(innerWidth,innerHeight,false);
renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFShadowMap; renderer.shadowMap.autoUpdate=false;
renderer.setScissorTest(true);
addEventListener('resize',()=>renderer.setSize(innerWidth,innerHeight,false));
const scene=new THREE.Scene();
const amb=new THREE.AmbientLight(0xffffff,0.6); scene.add(amb);
const sun=new THREE.DirectionalLight(0xfff1d6,0.9); sun.castShadow=true; sun.shadow.mapSize.set(1024,1024);
{const sc=sun.shadow.camera; sc.left=-20;sc.right=20;sc.top=20;sc.bottom=-20;sc.near=1;sc.far=100;} sun.shadow.bias=-0.0006; sun.shadow.normalBias=0.03;
scene.add(sun); scene.add(sun.target);
const cams=[new THREE.PerspectiveCamera(58,1,0.1,320),new THREE.PerspectiveCamera(58,1,0.1,320)];
const camS=new THREE.PerspectiveCamera(55,1,0.08,320);

function M(color,o){return new THREE.MeshLambertMaterial(Object.assign({color},o||{}));}
function MB(color,o){return new THREE.MeshBasicMaterial(Object.assign({color},o||{}));}
const MAT={dirt:M(0x6a5238),grass:M(0x86b85f),trunk:M(0x6b4a2b),stone:M(0x8a8680),dark:M(0x1b1b1b),bark:M(0x5e4128),moss:M(0x4a6a3a),
  plank:M(0xa77b4f),sand:M(0xe2c98f),hedge:M(0x2f5a36)};
Object.values(MAT).forEach(m=>{m.userData.shared=true;});
const GEO={trunk:new THREE.CylinderGeometry(0.18,0.26,1.2,7),cone1:new THREE.ConeGeometry(1.2,2.4,8),cone2:new THREE.ConeGeometry(0.85,1.9,8),needle:new THREE.ConeGeometry(0.45,1.5,6)};
function addMesh(geo,mat,x,y,z,parent){const m=new THREE.Mesh(geo,mat);m.position.set(x||0,y||0,z||0);m.castShadow=true;m.receiveShadow=true;(parent||W.group).add(m);return m;}
function part(parent,geo,mat,x,y,z){const m=new THREE.Mesh(geo,mat);m.position.set(x,y,z);m.castShadow=true;parent.add(m);return m;}
function capsule(r,len,mat){const g=new THREE.Group();part(g,new THREE.CylinderGeometry(r,r,len,14),mat,0,0,0);part(g,new THREE.SphereGeometry(r,14,10),mat,0,len/2,0);part(g,new THREE.SphereGeometry(r,14,10),mat,0,-len/2,0);return g;}
function meshesOf(o){const out=[];if(!o||!o.traverse)return out;o.traverse(c=>{if(c.isMesh)out.push(c);});return out;}

/* ============================== ГЕРОИ (осмысленные примитивы, умения по сценарию v4) ============================== */
const HERO_DEF={
 proshka:{name:'Прошка',player:0,speed:6.6,jump:10.6,radius:0.35,height:1.25,css:'#e0784a',range:1.9,shield:0.55},   // высокий прыжок · RT рогатка
 potap:{name:'Потап',player:0,speed:4.7,jump:7.8,radius:0.6,height:1.7,css:'#c08a48',range:2.2,shield:0.85},         // тяжёлый, широкий щит · RT подкидка (1-1)
 pelageya:{name:'Пелагея',player:1,speed:5.3,jump:8.6,radius:0.42,height:1.15,css:'#b67ccc',range:3.0,shield:0.55},  // планирует · RT Совиный взор (1-4)
 yosha:{name:'Йоша',player:1,speed:6.0,jump:8.0,radius:0.3,height:0.62,css:'#6cc4b8',range:1.9,shield:0.45}};         // пролезает в лазы · RT ковшик
const HB={
 proshka(body,mk){ // вытянутая капсула + узкий конус-мордочка + треугольные ушки: тонкий и быстрый
  const c=mk(0xc8643b),w=mk(0xf4e6d0),k=mk(0x1b1b1b);
  const cap=capsule(0.28,0.55,c);cap.position.y=0.62;body.add(cap);
  const bl=part(body,new THREE.SphereGeometry(0.2,10,8),w,0,0.55,0.16);bl.scale.set(1,1.4,0.6);
  const sn=new THREE.ConeGeometry(0.12,0.42,10);sn.rotateX(Math.PI/2);part(body,sn,c,0,0.98,0.34);
  part(body,new THREE.SphereGeometry(0.045,8,6),k,0,0.98,0.55);
  for(const s of[-1,1]){const e=part(body,new THREE.ConeGeometry(0.1,0.28,3),c,s*0.14,1.2,-0.02);e.rotation.z=-s*0.25;part(body,new THREE.SphereGeometry(0.04,8,6),k,s*0.1,1.05,0.24);}
  const tg=new THREE.ConeGeometry(0.13,0.55,8);tg.rotateX(-Math.PI/2);const tail=part(body,tg,c,0,0.45,-0.45);
  part(body,new THREE.SphereGeometry(0.07,8,6),w,0,0.45,-0.73);
  return {tail};},
 potap(body,mk){ // широкая приземистая капсула +40%, толстые короткие лапы: «тяжёлый»
  const c=mk(0x9a6a34),l=mk(0xd8b58a),k=mk(0x1b1b1b);
  const cap=capsule(0.55,0.4,c);cap.position.y=1.0;cap.scale.set(1,1,0.9);body.add(cap);
  const legs=[];for(const[x,z]of[[-0.3,0.22],[0.3,0.22],[-0.3,-0.22],[0.3,-0.22]])legs.push(part(body,new THREE.CylinderGeometry(0.17,0.18,0.42,10),c,x,0.21,z));
  for(const s of[-1,1]){part(body,new THREE.SphereGeometry(0.16,10,8),c,s*0.34,1.62,0);part(body,new THREE.SphereGeometry(0.05,8,6),k,s*0.16,1.32,0.46);
   const a=part(body,new THREE.CylinderGeometry(0.15,0.15,0.5,10),c,s*0.6,0.95,0.1);a.rotation.z=s*0.35;}
  const mz=part(body,new THREE.SphereGeometry(0.2,10,8),l,0,1.13,0.45);mz.scale.set(1,0.8,0.8);part(body,new THREE.SphereGeometry(0.06,8,6),k,0,1.19,0.62);
  return {legs};},
 pelageya(body,mk){ // сфероид + два плоских треугольных крыла, раскрываются при планировании
  const c=mk(0x8e5aa0),cl=mk(0xdcc6e6),w=mk(0xffffff),k=mk(0x1b1b1b),bk=mk(0xf0a830),wm=mk(0x6e3f82,true);
  const b=part(body,new THREE.SphereGeometry(0.45,16,12),c,0,0.6,0);b.scale.set(1,1.2,0.95);
  const bl=part(body,new THREE.SphereGeometry(0.32,12,10),cl,0,0.52,0.17);bl.scale.set(1,1.2,0.6);
  for(const s of[-1,1]){part(body,new THREE.SphereGeometry(0.14,12,10),w,s*0.16,0.86,0.33);part(body,new THREE.SphereGeometry(0.07,8,6),k,s*0.16,0.86,0.45);
   const t=part(body,new THREE.ConeGeometry(0.08,0.24,4),c,s*0.26,1.2,0);t.rotation.z=-s*0.4;
   part(body,new THREE.ConeGeometry(0.06,0.12,5),bk,s*0.13,0.06,0.12);}
  const bg=new THREE.ConeGeometry(0.06,0.18,6);bg.rotateX(Math.PI/2);const beak=part(body,bg,bk,0,0.72,0.46);beak.rotation.x=0.5;
  const wg=new THREE.BufferGeometry();wg.setAttribute('position',new THREE.Float32BufferAttribute([0,0,0.26,0,0,-0.3,0,-0.64,-0.06],3));wg.computeVertexNormals();
  const wings=[];for(const s of[-1,1]){const wp=new THREE.Group();wp.position.set(s*0.44,0.86,0);body.add(wp);part(wp,wg,wm,0,0,0);wp.userData.s=s;wings.push(wp);}
  return {wings,beak};},
 yosha(body,mk){ // маленькая сфера с частыми короткими иглами — самый маленький силуэт; на ходу катится шариком
  const c=mk(0x4a9a8f),sp=mk(0x2b5a55),f=mk(0xe8d6b8),k=mk(0x1b1b1b);
  const ball=new THREE.Group();ball.position.y=0.32;body.add(ball);
  const b=part(ball,new THREE.SphereGeometry(0.3,14,10),c,0,0,0);b.scale.set(1,0.92,1.1);
  const ng=new THREE.ConeGeometry(0.05,0.2,5),up=new V3(0,1,0);const N=64;
  for(let i=0;i<N;i++){const y=1-2*(i+0.5)/N,r=Math.sqrt(1-y*y),th=i*2.39996;const d=new V3(Math.cos(th)*r,y,Math.sin(th)*r);if(d.z>0.42||d.y<-0.4)continue;
   const m=part(ball,ng,sp,d.x*0.3,d.y*0.27,d.z*0.33);m.quaternion.setFromUnitVectors(up,d);m.position.addScaledVector(d,0.08);}
  const sg=new THREE.ConeGeometry(0.1,0.22,8);sg.rotateX(Math.PI/2);part(ball,sg,f,0,-0.03,0.37);part(ball,new THREE.SphereGeometry(0.04,8,6),k,0,-0.03,0.49);
  for(const s of[-1,1])part(ball,new THREE.SphereGeometry(0.035,8,6),k,s*0.1,0.08,0.3);
  return {ball};}
};
const GHOST_MAT=new THREE.MeshBasicMaterial({color:0xcfe9ff,transparent:true,opacity:0.38,depthWrite:false,side:THREE.DoubleSide});
function buildHeroMesh(kind,ghost){const g=new THREE.Group(),body=new THREE.Group();g.add(body);
  const mk=ghost?(()=>GHOST_MAT):((c,ds)=>M(c,ds?{side:THREE.DoubleSide}:{}));const parts=HB[kind](body,mk);
  if(ghost)g.traverse(o=>{o.castShadow=false;});return {g,body,parts};}
function makeHero(kind){
  const d=HERO_DEF[kind],b=buildHeroMesh(kind,false),g=b.g;
  const h={kind,d,player:d.player,g,body:b.body,parts:b.parts,pos:new V3(),vel:new V3(),face:Math.PI,grounded:false,groundRef:null,lastGroundY:0,coyote:0,
   active:false,iT:0,guard:false,atkT:0,atkCd:0,skillCd:0,glide:false,rollAng:0,following:false,stuck:0,holding:false,held:false,knockT:0,blocked:false,walkT:0,moving:false,cling:false,clingBell:null,warned:false};
  h.markerMat=MB(PCOL[d.player],{transparent:true,opacity:1});
  h.marker=new THREE.Mesh(new THREE.ConeGeometry(0.17,0.38,4),h.markerMat);h.marker.rotation.x=Math.PI;h.marker.castShadow=false;h.marker.visible=false;g.add(h.marker);h.mkT=0;h.mkA=0;h.mkIdle=0;   // ромбик «это ты»: только над своим героем, ненадолго
  h.shieldMat=MB(PCOL[d.player],{transparent:true,opacity:0.5,side:THREE.DoubleSide,depthWrite:false});
  h.shield=new THREE.Mesh(new THREE.CircleGeometry(d.shield,24),h.shieldMat);h.shield.position.set(0,d.height*0.5,d.radius+0.25);g.add(h.shield);
  const ag=new THREE.RingGeometry(0.5,d.range,20,1,-Math.PI/2-0.9,1.8);ag.rotateX(-Math.PI/2);
  h.arcMat=MB(0xffffff,{transparent:true,opacity:0.6,side:THREE.DoubleSide,depthWrite:false});h.arc=new THREE.Mesh(ag,h.arcMat);h.arc.position.y=0.5;g.add(h.arc);
  h.clingRing=new THREE.Mesh(new THREE.TorusGeometry(0.4,0.06,8,26),MB(0xffffff,{transparent:true,opacity:0.9}));h.clingRing.visible=false;g.add(h.clingRing);
  h.rollT=0;h.rollCd=0;h.rollDir=new V3(0,0,-1);h.hurtT=0;h.hang=false;h.firefly=25;h.power=null;h.hatOn=false;
  h.ffMat=M(0xfff08a,{emissive:0xffe040,emissiveIntensity:1.5});h.ff=new THREE.Mesh(new THREE.SphereGeometry(0.09,10,8),h.ffMat);h.ff.visible=false;g.add(h.ff);
  const cg=new THREE.ConeGeometry(Math.tan(Math.PI/6)*10,10,28,1,true);cg.translate(0,-5,0);cg.rotateX(-Math.PI/2);
  h.coneMat=MB(0xfff6c8,{transparent:true,opacity:0.1,depthWrite:false,side:THREE.DoubleSide});h.cone=new THREE.Mesh(cg,h.coneMat);h.cone.position.y=d.height*0.75;h.cone.visible=false;g.add(h.cone);
  h.yarn=new THREE.Group();g.add(h.yarn);h.yarn.visible=false;part(h.yarn,new THREE.SphereGeometry(0.35,12,10),M(PCOL[d.player]),0,0.35,0);
  for(let i=0;i<6;i++){const t=part(h.yarn,new THREE.TorusGeometry(0.36,0.03,5,20),M(0xffffff),0,0.35,0);t.rotation.set(rand(0,3),rand(0,3),0);}
  h.hat=new THREE.Group();h.hat.position.y=d.height+0.02;g.add(h.hat);h.hatMat=M(0x2e5a2a);part(h.hat,new THREE.ConeGeometry(0.3,0.35,8),h.hatMat,0,0.15,0);
  part(h.hat,new THREE.TorusGeometry(0.28,0.05,6,16),h.hatMat,0,0,0).rotation.x=Math.PI/2;h.hat.visible=false;
  h.aura=new THREE.Mesh(new THREE.TorusGeometry(0.9,0.06,6,30),MB(COL.gold,{transparent:true,opacity:0.8}));h.aura.rotation.x=Math.PI/2;h.aura.position.y=0.15;h.aura.visible=false;g.add(h.aura);
  scene.add(g);return h;}
const HERO={};['proshka','potap','pelageya','yosha'].forEach(k=>HERO[k]=makeHero(k));
const HEROES=[HERO.proshka,HERO.potap,HERO.pelageya,HERO.yosha];
// гардероб: вещи из лавки Векши и доспехи Заставы. Куплено — навсегда (хранится и между запусками), у каждого героя свой наряд
const WEAR_SLOTS=['hat','neck','back','body'],SLOT_NAME={hat:'Шапка',neck:'На шею',back:'За спину',body:'Наряд'};
const WEAR_KINDS=['proshka','potap','pelageya','yosha'];
// посадка по фигуре: где макушка, шея, спина, пояс и лапки у каждого героя
const FIT={proshka:{hat:1.08,hs:0.75,neck:[0.86,0.29],back:[0.8,-0.27],bs:0.8,waist:[0.45,0.3],feet:[0.13,0.05]},
  potap:{hat:1.64,hs:1.2,neck:[0.84,0.58],back:[1.08,-0.5],bs:1.25,waist:[0.64,0.6],feet:[0.3,0.22]},
  pelageya:{hat:1.06,hs:0.8,neck:[0.52,0.47],back:[0.72,-0.4],bs:0.9,waist:[0.45,0.47],feet:[0.13,0.12]},
  yosha:{hat:0.56,hs:0.66,neck:[0.2,0.33],back:[0.42,-0.26],bs:0.6,waist:[0.16,0.33],feet:[0.12,0.1]}};
const SV=(b)=>'<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke="#3a2410" stroke-width="2" stroke-linejoin="round">'+b+'</svg>';
const WEAR={
 // ---------- шапки ----------
 ushanka:{slot:'hat',name:'Шапка-ушанка',cost:8,desc:'Тёплая, с ушами — зимой в лесу не замёрзнешь.',
  icon:SV('<path d="M14 36 Q14 14 32 14 Q50 14 50 36Z" fill="#8a8a90"/><rect x="10" y="34" width="44" height="8" rx="4" fill="#e8e0d4"/><rect x="8" y="38" width="9" height="16" rx="4" fill="#e8e0d4"/><rect x="47" y="38" width="9" height="16" rx="4" fill="#e8e0d4"/>'),
  build(g){const gr=M(0x8a8a90),cr=M(0xe8e0d4);part(g,new THREE.CylinderGeometry(0.3,0.33,0.26,14),gr,0,0.13,0);part(g,new THREE.CylinderGeometry(0.34,0.34,0.09,14),cr,0,0.02,0);
   for(const s of[-1,1]){const f=part(g,new THREE.BoxGeometry(0.09,0.3,0.26),cr,s*0.35,-0.1,0);f.rotation.z=s*0.2;}}},
 kolpak:{slot:'hat',name:'Колпак звездочёта',cost:10,desc:'Синий колпак со звёздами — думается лучше.',
  icon:SV('<path d="M14 50 L32 6 L50 50Z" fill="#2a4ab0"/><circle cx="32" cy="8" r="4" fill="#ffe060"/><circle cx="27" cy="34" r="3" fill="#ffe060" stroke="none"/><circle cx="37" cy="24" r="2.5" fill="#ffe060" stroke="none"/><circle cx="36" cy="42" r="2.5" fill="#ffe060" stroke="none"/>'),
  build(g){part(g,new THREE.ConeGeometry(0.28,0.75,14),M(0x2a4ab0),0,0.37,0);const st=M(0xffe060,{emissive:0xffc000,emissiveIntensity:0.8});
   for(let i=0;i<6;i++){const t=0.15+i*0.11,a=i*2.2,r=0.28*(1-t)+0.01;part(g,new THREE.SphereGeometry(0.035,6,5),st,Math.sin(a)*r,t*0.75,Math.cos(a)*r);}part(g,new THREE.SphereGeometry(0.05,8,6),st,0,0.76,0);}},
 kokoshnik:{slot:'hat',name:'Кокошник с жемчугом',cost:14,desc:'Как у царевны: алый, с золотой каймой.',
  icon:SV('<path d="M10 46 A22 22 0 0 1 54 46Z" fill="#c0302a"/><path d="M10 46 A22 22 0 0 1 54 46" fill="none" stroke="#ffd23a" stroke-width="4"/><circle cx="32" cy="30" r="4" fill="#fff"/><circle cx="21" cy="36" r="3" fill="#fff"/><circle cx="43" cy="36" r="3" fill="#fff"/>'),
  build(g){const r=M(0xc0302a,{side:THREE.DoubleSide}),gd=M(0xffd23a,{emissive:0x806010,emissiveIntensity:0.4}),pw=M(0xffffff);const fan=part(g,new THREE.CircleGeometry(0.42,24,0,Math.PI),r,0,0.02,-0.02);
   const rim=part(g,new THREE.TorusGeometry(0.42,0.03,6,24,Math.PI),gd,0,0.02,-0.02);part(g,new THREE.CylinderGeometry(0.29,0.29,0.08,14),r,0,0.03,0.02);
   for(let i=0;i<5;i++){const a=0.35+i*0.6;part(g,new THREE.SphereGeometry(0.035,6,5),pw,Math.cos(a)*0.3,0.02+Math.sin(a)*0.3,0.0);}}},
 venok:{slot:'hat',name:'Венок из яблоневого цвета',cost:6,lv:'3-1',desc:'Из сада Жар-птицы — пахнет яблоками.',
  icon:SV('<ellipse cx="32" cy="36" rx="22" ry="9" fill="none" stroke="#3f8a3a" stroke-width="5"/><circle cx="14" cy="36" r="6" fill="#fff"/><circle cx="32" cy="45" r="6" fill="#fff"/><circle cx="50" cy="36" r="6" fill="#fff"/><circle cx="32" cy="27" r="6" fill="#7ab0ff"/><circle cx="14" cy="36" r="2" fill="#ffd23a"/><circle cx="32" cy="45" r="2" fill="#ffd23a"/><circle cx="50" cy="36" r="2" fill="#ffd23a"/>'),
  build(g){const t=part(g,new THREE.TorusGeometry(0.29,0.035,6,20),M(0x3f8a3a),0,0.04,0);t.rotation.x=Math.PI/2;
   for(let i=0;i<9;i++){const a=i/9*Math.PI*2,x=Math.cos(a)*0.29,z=Math.sin(a)*0.29;const p=part(g,new THREE.SphereGeometry(0.075,8,6),M(i%3===2?0xffb0d0:0xffffff),x,0.07,z);p.scale.y=0.45;part(g,new THREE.SphereGeometry(0.032,6,5),M(0xffd23a),x,0.1,z);}}},
 mukhomor:{slot:'hat',name:'Шапка-мухомор',cost:9,desc:'Красная в белый горошек. Есть нельзя!',
  icon:SV('<path d="M8 40 Q8 12 32 12 Q56 12 56 40Z" fill="#d8302a"/><rect x="8" y="38" width="48" height="6" rx="3" fill="#f4ecd8"/><circle cx="22" cy="26" r="4" fill="#fff" stroke="none"/><circle cx="36" cy="20" r="3.5" fill="#fff" stroke="none"/><circle cx="44" cy="31" r="3.5" fill="#fff" stroke="none"/><circle cx="29" cy="33" r="3" fill="#fff" stroke="none"/>'),
  build(g){const d=part(g,new THREE.SphereGeometry(0.38,16,10,0,Math.PI*2,0,Math.PI/2),M(0xd8302a),0,-0.02,0);d.scale.y=0.75;part(g,new THREE.CylinderGeometry(0.38,0.36,0.03,16),M(0xf4ecd8),0,-0.02,0);
   const w=M(0xffffff);for(let i=0;i<8;i++){const a=i*2.4,el=0.25+(i%3)*0.35;const x=Math.cos(a)*Math.cos(el)*0.38,z=Math.sin(a)*Math.cos(el)*0.38,y=Math.sin(el)*0.38*0.75-0.02;part(g,new THREE.SphereGeometry(0.045,6,5),w,x,y,z);}}},
 treugolka:{slot:'hat',name:'Треуголка из бересты',cost:12,lv:'3-4',desc:'Капитанская — с Летучего корабля.',
  icon:SV('<path d="M6 40 L32 18 L58 40 Q32 48 6 40Z" fill="#ece4cc"/><path d="M20 30 h6 M34 26 h8 M24 38 h10" stroke="#3a2410"/><rect x="22" y="14" width="20" height="12" rx="6" fill="#ece4cc"/>'),
  build(g){const b=M(0xece4cc),dk=M(0x3a3028);const br=part(g,new THREE.CylinderGeometry(0.46,0.46,0.07,3),b,0,0.05,0);br.rotation.y=Math.PI/6;part(g,new THREE.CylinderGeometry(0.23,0.27,0.22,12),b,0,0.16,0);
   for(let i=0;i<3;i++){const s=part(g,new THREE.BoxGeometry(0.1,0.02,0.02),dk,-0.05+i*0.05,0.12+i*0.05,0.25);s.rotation.z=0.2;}}},
 ushki:{slot:'hat',name:'Заячьи уши',cost:7,lv:'5-2',desc:'Уши торчком — всё слышно!',
  icon:SV('<ellipse cx="22" cy="24" rx="7" ry="18" fill="#fff"/><ellipse cx="42" cy="24" rx="7" ry="18" fill="#fff"/><ellipse cx="22" cy="26" rx="3" ry="12" fill="#ffb0c8" stroke="none"/><ellipse cx="42" cy="26" rx="3" ry="12" fill="#ffb0c8" stroke="none"/><path d="M10 50 Q32 36 54 50" fill="none" stroke-width="5"/>'),
  build(g){const w=M(0xffffff),pk=M(0xffb0c8);for(const s of[-1,1]){const e=new THREE.Group();e.position.set(s*0.13,0.02,0);e.rotation.z=-s*0.18;g.add(e);const o=part(e,new THREE.SphereGeometry(0.08,10,8),w,0,0.3,0);o.scale.set(1,4,0.55);const n=part(e,new THREE.SphereGeometry(0.045,8,6),pk,0,0.3,0.035);n.scale.set(1,5,0.3);}
   const hb=part(g,new THREE.TorusGeometry(0.2,0.025,6,14,Math.PI),M(0xff8ab8),0,0.0,0);hb.rotation.y=Math.PI/2;}},
 kotelok:{slot:'hat',name:'Шлем-котелок',cost:8,lv:'4-4',desc:'Котелок кузнецов, дном кверху. Звенит, если постучать.',
  icon:SV('<path d="M12 44 L16 20 H48 L52 44Z" fill="#4a4a54"/><path d="M22 20 Q32 6 42 20" fill="none" stroke-width="4"/><rect x="8" y="42" width="48" height="6" rx="3" fill="#3a3a40"/>'),
  build(g){const ir=M(0x4a4a54);part(g,new THREE.CylinderGeometry(0.27,0.31,0.3,14),ir,0,0.14,0);part(g,new THREE.TorusGeometry(0.31,0.03,6,16),M(0x3a3a40),0,0.0,0).rotation.x=Math.PI/2;
   part(g,new THREE.TorusGeometry(0.13,0.022,6,12,Math.PI),M(0x6a6a70),0,0.29,0);for(const s of[-1,1])part(g,new THREE.TorusGeometry(0.06,0.018,5,10),M(0x6a6a70),s*0.31,0.16,0).rotation.y=Math.PI/2;}},
 korona:{slot:'hat',name:'Корона Царевны-лягушки',cost:18,desc:'Золотая, с зелёным камушком.',
  icon:SV('<path d="M10 46 L12 20 L22 32 L32 14 L42 32 L52 20 L54 46Z" fill="#ffd23a"/><circle cx="32" cy="38" r="5" fill="#3fc06a"/>'),
  build(g){const gd=M(0xffd23a,{emissive:0x806010,emissiveIntensity:0.5,side:THREE.DoubleSide});part(g,new THREE.CylinderGeometry(0.28,0.28,0.14,14,1,true),gd,0,0.07,0);
   for(let i=0;i<6;i++){const a=i/6*Math.PI*2;part(g,new THREE.ConeGeometry(0.05,0.15,5),gd,Math.cos(a)*0.28,0.21,Math.sin(a)*0.28);}part(g,new THREE.SphereGeometry(0.06,8,6),M(0x3fc06a,{emissive:0x108030,emissiveIntensity:0.6}),0,0.08,0.29);}},
 shelom:{slot:'hat',name:'Богатырский шелом',cost:20,desc:'Золотой, с шишаком. Как у Ильи Муромца.',
  icon:SV('<path d="M14 44 Q14 16 32 10 Q50 16 50 44Z" fill="#ffd23a"/><line x1="32" y1="10" x2="32" y2="2" stroke-width="3"/><rect x="10" y="42" width="44" height="7" rx="3" fill="#b07a10"/><rect x="30" y="44" width="4" height="12" fill="#b07a10"/>'),
  build(g){const gd=M(0xffd23a,{emissive:0x806010,emissiveIntensity:0.4});part(g,new THREE.ConeGeometry(0.3,0.44,14),gd,0,0.22,0);part(g,new THREE.CylinderGeometry(0.015,0.015,0.26,5),gd,0,0.56,0);
   part(g,new THREE.TorusGeometry(0.3,0.035,6,18),M(0xb07a10),0,0.0,0).rotation.x=Math.PI/2;part(g,new THREE.BoxGeometry(0.04,0.18,0.03),M(0xb07a10),0,-0.06,0.3);}},
 armI:{slot:'hat',name:'Шелом Ильи Муромца',cost:0,earn:'z-i',desc:'Доспех богатыря — за богатырское время на Заставе.',
  icon:SV('<path d="M12 46 Q12 14 32 8 Q52 14 52 46Z" fill="#b8b8c8"/><circle cx="32" cy="6" r="4" fill="#ffd23a"/><rect x="8" y="44" width="48" height="6" rx="3" fill="#8a8a9a"/>'),
  build(g){part(g,new THREE.ConeGeometry(0.33,0.52,14),M(0xb8b8c8,{emissive:0x303040,emissiveIntensity:0.3}),0,0.26,0);part(g,new THREE.SphereGeometry(0.066,8,6),M(COL.gold),0,0.56,0);part(g,new THREE.TorusGeometry(0.35,0.04,6,18),M(0x8a8a9a),0,0,0).rotation.x=Math.PI/2;}},
 armD:{slot:'hat',name:'Шлем Добрыни Никитича',cost:0,earn:'z-d',desc:'Доспех богатыря — за богатырское время на Заставе.',
  icon:SV('<path d="M16 48 L32 6 L48 48Z" fill="#b8b8c8"/><rect x="29" y="40" width="6" height="16" fill="#b8b8c8"/>'),
  build(g){part(g,new THREE.ConeGeometry(0.29,0.53,12),M(0xb8b8c8,{emissive:0x303040,emissiveIntensity:0.3}),0,0.26,0);part(g,new THREE.BoxGeometry(0.066,0.26,0.05),M(0xb8b8c8),0,-0.02,0.29);}},
 armA:{slot:'hat',name:'Шапка Алёши Поповича',cost:0,earn:'z-a',desc:'Доспех богатыря — за богатырское время на Заставе.',
  icon:SV('<path d="M16 48 L32 12 L48 48Z" fill="#c03030"/><path d="M40 30 L54 6" stroke="#ffd23a" stroke-width="5"/>'),
  build(g){part(g,new THREE.ConeGeometry(0.3,0.45,12),M(0xc03030),0,0.22,0);const f=part(g,new THREE.ConeGeometry(0.037,0.5,4),M(0xffd23a,{emissive:0xffb000,emissiveIntensity:0.5}),0.17,0.47,-0.06);f.rotation.z=-0.5;}},
 // ---------- на шею ----------
 platok:{slot:'neck',name:'Платок в горошек',cost:5,desc:'Алый, завязан узелком.',
  icon:SV('<path d="M10 20 Q32 30 54 20 L32 56Z" fill="#d8302a"/><circle cx="26" cy="30" r="3" fill="#fff" stroke="none"/><circle cx="38" cy="30" r="3" fill="#fff" stroke="none"/><circle cx="32" cy="42" r="3" fill="#fff" stroke="none"/>'),
  build(g,f){const r=f.neck[1],t=f.hs,red=M(0xd8302a);const tr=part(g,new THREE.TorusGeometry(r+0.01,0.05*t,6,20),red,0,0,0);tr.rotation.x=Math.PI/2;
   const tri=part(g,new THREE.ConeGeometry(0.17*t,0.28*t,3),red,0,-0.13*t,r+0.01);tri.rotation.x=Math.PI;tri.scale.z=0.3;const w=M(0xffffff);for(let i=0;i<3;i++)part(g,new THREE.SphereGeometry(0.022*t,6,5),w,(i-1)*0.06*t,-0.08*t-(i%2)*0.06*t,r+0.05*t);}},
 busy:{slot:'neck',name:'Бусы-рябинки',cost:6,desc:'Нанизаны из красной рябины.',
  icon:SV('<path d="M12 18 Q32 52 52 18" fill="none" stroke-width="2"/><circle cx="16" cy="26" r="5" fill="#d8302a"/><circle cx="22" cy="35" r="5" fill="#d8302a"/><circle cx="32" cy="40" r="6" fill="#d8302a"/><circle cx="42" cy="35" r="5" fill="#d8302a"/><circle cx="48" cy="26" r="5" fill="#d8302a"/>'),
  build(g,f){const r=f.neck[1]+0.02,t=f.hs,m=M(0xd8302a,{emissive:0x400000,emissiveIntensity:0.3});for(let i=0;i<16;i++){const a=i/16*Math.PI*2;part(g,new THREE.SphereGeometry(0.045*t,8,6),m,Math.sin(a)*r,-Math.max(0,Math.cos(a))*0.05*t,Math.cos(a)*r);}}},
 bant:{slot:'neck',name:'Бант',cost:5,desc:'Большой, голубой, праздничный.',
  icon:SV('<path d="M32 32 L10 18 L10 46Z" fill="#4a9ae0"/><path d="M32 32 L54 18 L54 46Z" fill="#4a9ae0"/><circle cx="32" cy="32" r="6" fill="#2a6ab0"/>'),
  build(g,f){const r=f.neck[1],t=f.hs,b=M(0x4a9ae0);part(g,new THREE.SphereGeometry(0.05*t,8,6),M(0x2a6ab0),0,0,r+0.03);for(const s of[-1,1]){const c=part(g,new THREE.ConeGeometry(0.08*t,0.18*t,6),b,s*0.1*t,0,r+0.02);c.rotation.z=-s*Math.PI/2;}
   const tr=part(g,new THREE.TorusGeometry(r,0.02*t,5,20),b,0,0,0);tr.rotation.x=Math.PI/2;}},
 sharf:{slot:'neck',name:'Шарф-полосатик',cost:8,desc:'Длинный, в полоску, с кисточками.',
  icon:SV('<rect x="8" y="16" width="48" height="12" rx="6" fill="#e05a3a"/><rect x="38" y="24" width="12" height="30" fill="#e05a3a"/><rect x="38" y="32" width="12" height="6" fill="#fff" stroke="none"/><rect x="38" y="44" width="12" height="6" fill="#fff" stroke="none"/><rect x="20" y="16" width="6" height="12" fill="#fff" stroke="none"/>'),
  build(g,f){const r=f.neck[1]+0.03,t=f.hs,a1=M(0xe05a3a),a2=M(0xffffff);for(let i=0;i<14;i++){const a=i/14*Math.PI*2;const c=part(g,new THREE.CylinderGeometry(0.065*t,0.065*t,r*0.46,8),i%2?a2:a1,Math.sin(a)*r,0,Math.cos(a)*r);c.rotation.z=Math.PI/2;c.rotation.y=a;}
   for(let i=0;i<4;i++)part(g,new THREE.BoxGeometry(0.1*t,0.1*t,0.04*t),i%2?a2:a1,r*0.45,-0.08*t-i*0.1*t,r*0.85);}},
 // ---------- за спину ----------
 plashch:{slot:'back',name:'Плащ-звездочёт',cost:12,desc:'Тёмно-синий, звёзды мерцают.',
  icon:SV('<path d="M20 8 L44 8 L54 56 L10 56Z" fill="#23306a"/><circle cx="26" cy="26" r="2.5" fill="#ffe060" stroke="none"/><circle cx="38" cy="36" r="2.5" fill="#ffe060" stroke="none"/><circle cx="30" cy="46" r="2" fill="#ffe060" stroke="none"/><circle cx="32" cy="8" r="4" fill="#ffd23a"/>'),
  build(g){const c=part(g,new THREE.PlaneGeometry(0.8,1.0),M(0x23306a,{side:THREE.DoubleSide}),0,-0.46,-0.06);c.rotation.x=0.14;const st=M(0xffe060,{emissive:0xffc000,emissiveIntensity:1});
   for(let i=0;i<7;i++)part(g,new THREE.SphereGeometry(0.025,6,5),st,rand(-0.3,0.3),-0.15-rand(0,0.75),-0.1-rand(0,0.08));part(g,new THREE.SphereGeometry(0.06,8,6),M(0xffd23a),0,0,0.03);}},
 lukoshko:{slot:'back',name:'Рюкзак-лукошко',cost:10,desc:'Плетёное, а в нём — грибы.',
  icon:SV('<rect x="14" y="22" width="36" height="32" rx="8" fill="#c09050"/><path d="M14 32 H50 M14 42 H50" stroke="#8a6030"/><path d="M22 22 Q22 10 28 14" fill="#d8302a"/><circle cx="26" cy="16" r="7" fill="#d8302a"/><circle cx="40" cy="18" r="6" fill="#a86a3a"/>'),
  build(g){const w=M(0xc09050);part(g,new THREE.CylinderGeometry(0.22,0.18,0.32,12),w,0,-0.12,-0.14);part(g,new THREE.TorusGeometry(0.22,0.025,6,16),M(0x8a6030),0,0.04,-0.14).rotation.x=Math.PI/2;
   for(const[x,c]of[[-0.07,0xd8302a],[0.08,0xa86a3a]]){part(g,new THREE.CylinderGeometry(0.03,0.035,0.12,6),M(0xf4ecd8),x,0.09,-0.14);const cap=part(g,new THREE.SphereGeometry(0.08,10,6,0,Math.PI*2,0,Math.PI/2),M(c),x,0.14,-0.14);}
   for(const s of[-1,1])part(g,new THREE.BoxGeometry(0.04,0.3,0.03),M(0x8a6030),s*0.12,-0.06,0.02);}},
 krylya:{slot:'back',name:'Крылья бабочки',cost:14,desc:'Лёгкие, трепещут на ходу.',
  icon:SV('<path d="M32 30 Q10 4 6 26 Q8 40 32 34Z" fill="#ff9ad0"/><path d="M32 30 Q54 4 58 26 Q56 40 32 34Z" fill="#ff9ad0"/><path d="M32 34 Q14 56 18 44 Q22 36 32 36Z" fill="#ffb040"/><path d="M32 34 Q50 56 46 44 Q42 36 32 36Z" fill="#ffb040"/>'),
  build(g){const a=M(0xff9ad0,{transparent:true,opacity:0.85,side:THREE.DoubleSide,emissive:0x802050,emissiveIntensity:0.25}),b=M(0xffb040,{transparent:true,opacity:0.85,side:THREE.DoubleSide});const fl=[];
   for(const s of[-1,1]){const w=new THREE.Group();w.position.set(0,0,-0.08);g.add(w);const u=part(w,new THREE.CircleGeometry(0.3,14),a,s*0.28,0.12,0);u.scale.set(1,0.8,1);const l=part(w,new THREE.CircleGeometry(0.2,12),b,s*0.2,-0.16,0);w.userData.s=s;fl.push(w);}
   g.userData.flap=fl;}},
 shkura:{slot:'back',name:'Овечья шкура-плащ',cost:10,lv:'5-1',desc:'Курчавая. В ней Лихо не заметит.',
  icon:SV('<circle cx="20" cy="22" r="9" fill="#f4f0e4"/><circle cx="34" cy="18" r="10" fill="#f4f0e4"/><circle cx="46" cy="26" r="9" fill="#f4f0e4"/><circle cx="24" cy="38" r="10" fill="#f4f0e4"/><circle cx="40" cy="40" r="10" fill="#f4f0e4"/><circle cx="32" cy="52" r="8" fill="#f4f0e4"/>'),
  build(g){const w=M(0xf4f0e4);for(let r=0;r<3;r++)for(let i=0;i<4-r;i++){part(g,new THREE.SphereGeometry(0.14,8,6),w,(i-(3-r)/2)*0.2,-0.05-r*0.24,-0.1-r*0.02);}}},
 gusli:{slot:'back',name:'Гусли за спиной',cost:12,lv:'2-1',desc:'Как у Садко. Играть не умеешь? Зато красиво.',
  icon:SV('<path d="M12 50 L52 50 L42 14 L22 14Z" fill="#c88a3a"/><path d="M26 18 L20 46 M32 18 L30 46 M38 18 L40 46" stroke="#fff4c8"/>'),
  build(g){const gg=gusliMesh(g,M(0xc88a3a),0.9);gg.position.set(0,-0.18,-0.1);gg.rotation.x=0.1;gg.rotation.y=Math.PI;}},
 // ---------- наряды ----------
 lapti:{slot:'body',name:'Кушак и лапти',cost:5,desc:'Красный пояс и лапти с ленточками.',
  icon:SV('<rect x="8" y="10" width="48" height="10" rx="5" fill="#c0302a"/><path d="M12 40 h16 v10 h-16z M36 40 h16 v10 h-16z" fill="#d8b86a"/><path d="M20 20 v14 M44 20 v14" stroke="#c0302a" stroke-width="3"/>'),
  build(g,f){const[wy,r]=f.waist,t=f.hs,red=M(0xc0302a),st=M(0xd8b86a);const s=part(g,new THREE.TorusGeometry(r+0.01,0.045*t,6,20),red,0,wy,0);s.rotation.x=Math.PI/2;part(g,new THREE.BoxGeometry(0.06*t,0.24*t,0.03*t),red,r*0.4,wy-0.14*t,r*0.9);
   for(const k of[-1,1]){part(g,new THREE.BoxGeometry(0.14*t,0.1*t,0.26*t),st,k*f.feet[0],0.05,f.feet[1]);const rg=part(g,new THREE.TorusGeometry(0.08*t,0.02*t,5,12),red,k*f.feet[0],0.12*t,f.feet[1]);rg.rotation.x=Math.PI/2;}}},
 pchelka:{slot:'body',name:'Сарафан-пчёлка',cost:12,desc:'Полосатый: жужжать не обязательно.',
  icon:SV('<path d="M20 10 H44 L54 56 H10Z" fill="#f0c020"/><path d="M16 26 H48 L50 36 H14Z M12 44 H52 L54 52 H10Z" fill="#2a2a2a"/>'),
  build(g,f){const[wy,r]=f.waist,t=f.hs;for(let i=0;i<3;i++)part(g,new THREE.CylinderGeometry(r*0.98+i*0.05*t,r*1.04+i*0.05*t,0.14*t,16),M(i%2?0x2a2a2a:0xf0c020),0,wy+0.07*t-i*0.14*t,0);}},
 fartuk:{slot:'body',name:'Фартук кузнеца',cost:9,lv:'4-1',desc:'Кожаный, как у Кузьмы и Демьяна.',
  icon:SV('<path d="M18 14 H46 V56 H18Z" fill="#8a5a32"/><rect x="24" y="34" width="16" height="10" rx="2" fill="#6a4020"/><path d="M18 14 Q32 2 46 14" fill="none" stroke-width="3"/>'),
  build(g,f){const[wy,r]=f.waist,t=f.hs,lt=M(0x8a5a32,{side:THREE.DoubleSide});const ap=part(g,new THREE.PlaneGeometry(r*1.3,0.55*t),lt,0,wy-0.02*t,r*0.98+0.02);part(g,new THREE.BoxGeometry(r*0.5,0.12*t,0.02),M(0x6a4020),0,wy-0.1*t,r*0.98+0.035);
   const s=part(g,new THREE.TorusGeometry(r+0.01,0.02*t,5,20),M(0x6a4020),0,wy+0.2*t,0);s.rotation.x=Math.PI/2;}},
 poyas:{slot:'body',name:'Богатырский пояс',cost:11,lv:'4-5',desc:'Широкий, с золотой пряжкой.',
  icon:SV('<rect x="6" y="24" width="52" height="16" rx="4" fill="#7a1a14"/><rect x="24" y="22" width="16" height="20" rx="3" fill="#ffd23a"/><rect x="29" y="27" width="6" height="10" fill="#7a1a14"/>'),
  build(g,f){const[wy,r]=f.waist,t=f.hs;part(g,new THREE.CylinderGeometry(r+0.02,r+0.02,0.13*t,18,1,true),M(0x7a1a14,{side:THREE.DoubleSide}),0,wy,0);part(g,new THREE.BoxGeometry(0.15*t,0.13*t,0.03),M(0xffd23a,{emissive:0x806010,emissiveIntensity:0.4}),0,wy,r+0.035);}},
 tulup:{slot:'body',name:'Тулупчик-облачко',cost:12,lv:'3-2',desc:'Пушистый, лёгкий — как облачный барашек.',
  icon:SV('<circle cx="18" cy="30" r="10" fill="#f4f6ff"/><circle cx="32" cy="24" r="12" fill="#f4f6ff"/><circle cx="46" cy="30" r="10" fill="#f4f6ff"/><circle cx="24" cy="44" r="10" fill="#f4f6ff"/><circle cx="40" cy="44" r="10" fill="#f4f6ff"/>'),
  build(g,f){const[wy,r]=f.waist,t=f.hs,w=M(0xf4f6ff);for(let i=0;i<10;i++){const a=i/10*Math.PI*2;part(g,new THREE.SphereGeometry(0.12*t,8,6),w,Math.sin(a)*r,wy+0.06*t,Math.cos(a)*r);}
   for(let i=0;i<7;i++){const a=i/7*Math.PI*2+0.3;part(g,new THREE.SphereGeometry(0.09*t,8,6),w,Math.sin(a)*r*0.95,wy-0.1*t,Math.cos(a)*r*0.95);}}}
};
// сундук гардероба: {owned, wear[герой][слот], dance}
const WARD=(()=>{let d=null;try{d=JSON.parse(localStorage.getItem('zlatayaCep.wardrobe.v1')||'null');}catch(e){d=null;}
  d=d&&typeof d==='object'?d:{};d.owned=d.owned||{};d.wear=d.wear||{};for(const k of WEAR_KINDS)d.wear[k]=d.wear[k]||{};d.dance=d.dance||null;return d;})();
function saveWard(){try{localStorage.setItem('zlatayaCep.wardrobe.v1',JSON.stringify(WARD));}catch(e){}}
const own=id=>!!(WARD.owned[id]||(G.owned&&G.owned[id]));
function buyWard(id){WARD.owned[id]=true;saveWard();}
function putOn(kind,id){const it=WEAR[id];if(!it)return;WARD.wear[kind][it.slot]=id;saveWard();applyWear();}
const WEARMESH={};let WEAR_PREVIEW=null;
function wearMesh(kind,id){const k=kind+':'+id;if(WEARMESH[k])return WEARMESH[k];const it=WEAR[id],f=FIT[kind],g=new THREE.Group();
  if(it.slot==='hat'){g.position.y=f.hat;g.scale.setScalar(f.hs);}else if(it.slot==='back'){g.position.set(0,f.back[0],f.back[1]);g.scale.setScalar(f.bs);}else if(it.slot==='neck')g.position.y=f.neck[0];
  it.build(g,f);g.visible=false;HERO[kind].body.add(g);WEARMESH[k]=g;return g;}
// что надето: у каждого героя по вещи на слот; примерка в лавке показывает вещь поверх
function applyWear(){for(const kind of WEAR_KINDS){for(const k in WEARMESH)if(k.startsWith(kind+':'))WEARMESH[k].visible=false;
  for(const slot of WEAR_SLOTS){let id=WARD.wear[kind][slot];if(WEAR_PREVIEW&&WEAR_PREVIEW.kind===kind&&WEAR_PREVIEW.slot===slot)id=WEAR_PREVIEW.id;else if(id&&!own(id))id=null;if(id&&WEAR[id])wearMesh(kind,id).visible=true;}}}
function applyOutfits(){applyWear();}
// крылья трепещут; шапка прячется, когда герой надел шапку Лешего наизнанку
function wearTick(dt){for(const kind of WEAR_KINDS){const h=HERO[kind];
  for(const slot of WEAR_SLOTS){let id=WARD.wear[kind][slot];if(WEAR_PREVIEW&&WEAR_PREVIEW.kind===kind&&WEAR_PREVIEW.slot===slot)id=WEAR_PREVIEW.id;else if(id&&!own(id))id=null;
    const m=id&&WEARMESH[kind+':'+id];if(!m)continue;if(slot==='hat')m.visible=!h.hatOn;
    if(m.userData.flap){const sp=Math.hypot(h.vel.x,h.vel.z);m.userData.flap.forEach(w=>{w.rotation.y=w.userData.s*(0.35+Math.sin(G.time*(sp>0.5?16:4))*(sp>0.5?0.45:0.2));});}}}}
// значки валют: звено, орешек, самоцвет
const ICO_NUT='<svg class="ico" viewBox="0 0 20 20"><ellipse cx="10" cy="12" rx="6" ry="7" fill="#e8a84a" stroke="#6a3a10" stroke-width="1.5"/><path d="M3 9 Q10 1 17 9Z" fill="#8a5a2a" stroke="#6a3a10" stroke-width="1.5"/><line x1="10" y1="2" x2="10" y2="5" stroke="#6a3a10" stroke-width="2"/></svg>';
const ICO_GEM='<svg class="ico" viewBox="0 0 20 20"><path d="M5 3 H15 L19 8 L10 18 L1 8Z" fill="#7ad8ff" stroke="#1a4a8a" stroke-width="1.5"/><path d="M1 8 H19 M7 3 L6 8 L10 18 M13 3 L14 8 L10 18" fill="none" stroke="#1a4a8a" stroke-width="1"/></svg>';
const ICO_LINK='<svg class="ico" viewBox="0 0 20 20"><ellipse cx="10" cy="10" rx="5" ry="7.5" fill="none" stroke="#ffd23a" stroke-width="3"/></svg>';
function togglePhoto(){if(!own('lubok'))return;document.body.classList.toggle('photo');SFX.plate();}
const players=[0,1].map(i=>({i,heroes:i?[HERO.pelageya,HERO.yosha]:[HERO.proshka,HERO.potap],act:0,petals:3,path:'mid',cp:new V3(),cpBell:null,
  obj:0,idle:0,pulsed:[],tipT:0,tipHTML:'',spirit:1,spiritLock:0,enc:{},falls:[],clingOffer:false,lockedTip:0,shieldTaught:false,closedTaught:false,staggerSeen:0,
  blue:0,downed:false,downT:0,revT:0,yarnCd:0,owlCd:0,chain:0}));
const active=pi=>players[pi].heroes[players[pi].act];
const other=pi=>players[pi].heroes[1-players[pi].act];
const heroHeight=h=>h.d.height;
const headOf=h=>new V3(h.pos.x,h.pos.y+heroHeight(h)+1.0,h.pos.z);

