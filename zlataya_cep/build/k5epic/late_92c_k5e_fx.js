/* ============================== k5epic · ОБЩИЙ НАБОР ЭФФЕКТОВ СТАДИЙ (K5X) ============================== */
// Для стадий 3–12 «Битвы с Кощеем» (docs/28): берём эффекты 2-Б (W.k2fx = true: капли, брызги, кольца, туман, столбы, телеграфы-
// заполнители, дорожки, дождь, молнии — FIN.k2fx) и добавляем то, чего у битвы не было:
//  • K5X.motes(kind, c, r, n) — частицы окружения стадии (светлячки, чернильные хлопья, искры, золото, пузырьки, снег, лепестки);
//  • K5X.fog(c, r, col, n) — слои тумана из мягких клубов, плывут у земли;
//  • K5X.rays(c, col, n) — лучи солнца сквозь тучи;
//  • K5X.shock(p, r, sp, col, o) — ударная волна по земле: кольцо бежит, кого настигло на земле — удар (прыжок/кувырок спасают);
//  • K5X.bolt(src, h, o) — снаряд с отбивом в последний миг (механика движка W.bolts), свой цвет и своя реакция на отбив;
//  • K5X.puddle(p, r, life, o) — чернильная лужа: держится и бьёт стоящего (остаточная опасность);
//  • K5X.screen(col, a, dur) — вспышка на весь экран; K5X.tint(col, a) — тон по краям экрана стадии;
//  • K5X.own(o) — объект стадии: K5X.clear() (смена стадии) убирает всё своё.
// Всё — без логики уровня; стадии берут эти кирпичи и строят из них свои приёмы.
const K5X={owned:[],ticks:[],mo:null};FIN.k5x=K5X;
{const _ll=loadLevel;loadLevel=function(i){K5X.reset();_ll(i);};}
K5X.reset=()=>{K5X.owned.length=0;K5X.ticks.length=0;K5X.mo=null;for(const id of['k5xScreen','k5xTint']){const el=document.getElementById(id);if(el)el.style.opacity=0;}};
K5X.own=o=>{K5X.owned.push(o);return o;};
K5X.clear=()=>{for(const o of K5X.owned){if(o&&o.off)try{o.off();}catch(e){}else if(o&&o.parent)o.parent.remove(o);}K5X.owned.length=0;K5X.ticks.length=0;K5X.motes(null);K5X.tint(null);};
// тик набора (вызывает p6_epic): клубы, лучи, волны, лужи, частицы
K5X.tick=dt=>{for(let i=K5X.ticks.length-1;i>=0;i--){const f=K5X.ticks[i];let keep=true;try{keep=f(dt)!==false;}catch(e){console.error('k5x',e);keep=false;}if(!keep)K5X.ticks.splice(i,1);}if(K5X.mo)K5X.moTick(dt);};
const K5X_SOFT=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');const g=x.createRadialGradient(32,32,0,32,32,32);
  g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(0.4,'rgba(255,255,255,0.45)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);return new THREE.CanvasTexture(c);})();
K5X.soft=K5X_SOFT;
const k5xAdd=o=>{o.userData.noBatch=true;o.userData.noBatchL=true;o.traverse(q=>{q.userData.noBatch=true;q.castShadow=false;q.raycast=()=>{};});W.group.add(o);return o;};
K5X.add=k5xAdd;
/* ---------- частицы окружения: одна пачка точек на стадию ---------- */
// kind: fire — светлячки (мигают), ink — чернильные хлопья (падают, кружат), ember — искры (летят вверх), gold — золотая пыль,
//       bubble — пузырьки (вверх, покачиваясь), snow — снег, petal — лепестки (розовые, кружат), leaf — сухие листья, mist — светлые пылинки
const K5X_MO={fire:{col:[0xd8ff7a,0xfff2a0],sz:0.32,vy:0.05,sway:0.9,blink:1,add:1},ink:{col:[0x2a1440,0x6a3aa0],sz:0.28,vy:-0.35,sway:0.6,blink:0,add:0},
  ember:{col:[0xffa040,0xffe080],sz:0.22,vy:1.1,sway:0.5,blink:0.6,add:1},gold:{col:[0xffd76a,0xfff2c0],sz:0.2,vy:0.15,sway:0.5,blink:0.8,add:1},
  bubble:{col:[0xbfeaff,0xffffff],sz:0.26,vy:0.9,sway:0.4,blink:0,add:1},snow:{col:[0xffffff,0xe8f0ff],sz:0.18,vy:-0.8,sway:0.7,blink:0,add:0},
  petal:{col:[0xff9ad0,0xffd0e8],sz:0.24,vy:-0.4,sway:1.2,blink:0,add:0},leaf:{col:[0xc8782a,0x8a9a3a],sz:0.3,vy:-0.55,sway:1.4,blink:0,add:0},mist:{col:[0xf0f4ff,0xd8e0ff],sz:0.16,vy:0.05,sway:0.3,blink:0.4,add:1}};
K5X.motes=(kind,c,r,n,h)=>{if(K5X.mo){const p=K5X.mo.pts;if(p.parent)p.parent.remove(p);K5X.mo=null;}if(!kind)return null;const D=K5X_MO[kind];n=Math.round((n||160)*FXQ());h=h||7;
  const pos=new Float32Array(n*3),col=new Float32Array(n*3),P=[];const ca=new THREE.Color(D.col[0]),cb=new THREE.Color(D.col[1]),cc=new THREE.Color();
  for(let i=0;i<n;i++){const a=rand(0,6.283),d=Math.sqrt(Math.random())*r;P.push({x:c.x+Math.cos(a)*d,y:rand(0.2,h),z:c.z+Math.sin(a)*d,ph:rand(0,6.28),sp:rand(0.6,1.4)});cc.copy(ca).lerp(cb,Math.random());col[i*3]=cc.r;col[i*3+1]=cc.g;col[i*3+2]=cc.b;}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('color',new THREE.BufferAttribute(col,3));
  const m=new THREE.PointsMaterial({size:D.sz,map:K5X_SOFT,vertexColors:true,transparent:true,depthWrite:false,opacity:0.9,blending:D.add?THREE.AdditiveBlending:THREE.NormalBlending,sizeAttenuation:true,fog:true});
  const pts=new THREE.Points(g,m);pts.frustumCulled=false;k5xAdd(pts);K5X.mo={pts,P,D,c:c.clone(),r,h,kind,base:col.slice()};K5X.moTick(0);return K5X.mo;};
K5X.moTick=dt=>{const M=K5X.mo;if(!M||!M.pts.parent)return;const a=M.pts.geometry.attributes.position.array,cl=M.pts.geometry.attributes.color.array,t=G.time,D=M.D;
  for(let i=0;i<M.P.length;i++){const q=M.P[i];q.y+=D.vy*q.sp*dt;if(q.y>M.h){q.y=0.2;}if(q.y<0.1){q.y=M.h;}
    const sx=Math.sin(t*0.7*q.sp+q.ph)*D.sway,sz=Math.cos(t*0.6*q.sp+q.ph*1.3)*D.sway;a[i*3]=q.x+sx;a[i*3+1]=q.y+(D.vy===0.05?Math.sin(t*1.3+q.ph)*0.4:0);a[i*3+2]=q.z+sz;
    if(D.blink){const k=0.35+0.65*Math.max(0,Math.sin(t*(1.5+q.sp*1.5)+q.ph*3));cl[i*3]=M.base[i*3]*k;cl[i*3+1]=M.base[i*3+1]*k;cl[i*3+2]=M.base[i*3+2]*k;}}
  M.pts.geometry.attributes.position.needsUpdate=true;if(D.blink)M.pts.geometry.attributes.color.needsUpdate=true;};
/* ---------- туман: мягкие клубы у земли ---------- */
K5X.fog=(c,r,col,n,o)=>{o=o||{};const g=new THREE.Group();k5xAdd(g);const L=[];n=Math.round((n||18)*Math.max(0.6,FXQ()));
  for(let i=0;i<n;i++){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:K5X_SOFT,color:col||0xd8d0f0,transparent:true,opacity:0,depthWrite:false,fog:false}));
    const a=rand(0,6.28),d=Math.sqrt(Math.random())*r,sz=rand(o.min||7,o.max||13);s.scale.set(sz,sz*0.55,1);s.position.set(c.x+Math.cos(a)*d,rand(o.y0||0.6,o.y1||2.6),c.z+Math.sin(a)*d);g.add(s);L.push({s,ph:rand(0,6.28),v:new V3(rand(-0.5,0.5),0,rand(-0.5,0.5)),c:c.clone()});}
  const F={g,L,op:o.op==null?0.5:o.op,cur:0,off(){k5Del(g);F.dead=true;},set(v){F.op=v;}};
  K5X.ticks.push(dt=>{if(F.dead)return false;F.cur+=(F.op-F.cur)*Math.min(1,dt*1.5);for(const q of L){q.s.position.addScaledVector(q.v,dt);if(hd(q.s.position,q.c)>r){q.v.multiplyScalar(-1);}q.s.material.opacity=F.cur*(0.6+0.4*Math.sin(G.time*0.4+q.ph));}});
  return K5X.own(F);};
/* ---------- лучи солнца ---------- */
K5X.rays=(c,col,n,o)=>{o=o||{};const g=new THREE.Group();k5xAdd(g);const R=[];
  for(let i=0;i<(n||5);i++){const m=new THREE.Mesh(new THREE.CylinderGeometry(o.top||0.6,o.bot||2.6,o.h||34,10,1,true),k5Add(col||0xfff0c0,{opacity:0,map:K5TEX.beam}));
    m.position.set(c.x+rand(-1,1)*(o.spread||10),(o.h||34)/2-1,c.z+rand(-1,1)*(o.spread||10));m.rotation.set(rand(-0.25,0.25),0,rand(-0.25,0.25));g.add(m);R.push({m,ph:rand(0,6.28)});}
  const F={g,R,op:o.op==null?0.35:o.op,cur:0,off(){k5Del(g);F.dead=true;},set(v){F.op=v;}};
  K5X.ticks.push(dt=>{if(F.dead)return false;F.cur+=(F.op-F.cur)*Math.min(1,dt*1.2);for(const q of R)q.m.material.opacity=F.cur*(0.55+0.45*Math.sin(G.time*0.5+q.ph));});return K5X.own(F);};
/* ---------- ударная волна по земле ---------- */
// p — центр, r — до какого радиуса бежит, sp — м/с; кого фронт настиг на земле (не в прыжке и не в кувырке) — удар.
// o: {w ширина фронта, col, h высота гребня, onHit(h), skip(h) — кого не трогать, safe(h) — укрыт (ёлка Лешего, щит)}
K5X.shock=(p,r,sp,col,o)=>{o=o||{};col=col||0xb070ff;const w=o.w||0.7;const g=new THREE.Group();g.position.set(p.x,0.08,p.z);k5xAdd(g);
  const ring=new THREE.Mesh(new THREE.RingGeometry(0.86,1,64),k5Add(col,{opacity:0.9}));ring.rotation.x=-Math.PI/2;g.add(ring);
  const wall=new THREE.Mesh(new THREE.CylinderGeometry(1,1,o.h||0.9,64,1,true),k5Add(col,{opacity:0.45,map:K5TEX.beam}));wall.position.y=(o.h||0.9)/2;g.add(wall);
  const S={g,r:0.3,hit:new Set(),dead:false,off(){S.dead=true;k5Del(g);}};
  K5X.ticks.push(dt=>{if(S.dead)return false;S.r+=sp*dt;const k=S.r/r;ring.scale.setScalar(S.r);wall.scale.set(S.r,1,S.r);ring.material.opacity=0.9*(1-k*0.5);wall.material.opacity=0.45*(1-k);
    if(Math.random()<0.6&&FIN.k2fx){const a=rand(0,6.28);K5L.ink(new V3(p.x+Math.cos(a)*S.r,0.3,p.z+Math.sin(a)*S.r),1,0.6);}
    for(const h of k5Heroes()){if(S.hit.has(h)||(o.skip&&o.skip(h)))continue;const d=Math.hypot(h.pos.x-p.x,h.pos.z-p.z);if(Math.abs(d-S.r)>w)continue;
      if(h.pos.y>0.45||h.rollT>0||(o.safe&&o.safe(h))){S.hit.add(h);continue;}S.hit.add(h);if(o.onHit)o.onHit(h);else k5Hurt(h,p);}
    if(S.r>=r){S.off();return false;}});
  if(AUD.ready())AUD.thump({f0:110,f1:40,d:0.5,v:0.22});shakeAll(0.05,0.25);return K5X.own(S);};
/* ---------- снаряд с отбивом (механика движка: щит в последний миг — летит назад) ---------- */
// src: {pos:V3, onReflect(b)} — откуда и что делать, когда отбитый снаряд вернулся; o: {col, speed, mesh}
K5X.bolt=(src,h,o)=>{o=o||{};const col=o.col||0x8a40ff;const g=new THREE.Group();const core=new THREE.Mesh(new THREE.SphereGeometry(0.34,12,10),M(0x1c1028,{emissive:col,emissiveIntensity:0.9}));g.add(core);
  const halo=new THREE.Mesh(new THREE.SphereGeometry(0.62,12,10),k5Add(col,{opacity:0.3}));g.add(halo);const from=src.pos.clone().add(new V3(0,o.y||1.8,0));g.position.copy(from);W.group.add(g);
  const ent={pos:src.pos,alive:true,def:{},onReflect:b=>{if(src.onReflect)src.onReflect(b);}};
  const b={g,p:g.position,from:ent,tgt:h,v:o.speed||6.5,left:null,eta:9,refl:false,t:0};W.bolts.push(b);if(o.trail!==false&&typeof k5Trail==='function')k5Trail(g,col,{life:0.4,size:0.4});return b;};
/* ---------- лужа чернил: держится, бьёт стоящего ---------- */
K5X.puddle=(p,r,life,o)=>{o=o||{};const g=new THREE.Group();g.position.set(p.x,0.06,p.z);k5xAdd(g);
  const d=new THREE.Mesh(new THREE.CircleGeometry(1,40),new THREE.MeshBasicMaterial({color:o.col||0x1c0a2e,transparent:true,opacity:0,depthWrite:false}));d.rotation.x=-Math.PI/2;d.scale.setScalar(r);g.add(d);
  const rim=new THREE.Mesh(new THREE.RingGeometry(0.9,1,40),k5Add(o.rim||0x9a50ff,{opacity:0}));rim.rotation.x=-Math.PI/2;rim.position.y=0.01;rim.scale.setScalar(r);g.add(rim);
  const P={g,t:0,dead:false,cd:new Map(),off(){P.dead=true;k5Del(g);}};
  K5X.ticks.push(dt=>{if(P.dead)return false;P.t+=dt;const k=P.t<0.4?P.t/0.4:P.t>life-0.6?Math.max(0,(life-P.t)/0.6):1;d.material.opacity=0.8*k;rim.material.opacity=(0.4+0.3*Math.sin(G.time*6))*k;
    if(Math.random()<dt*3)K5L.ink(new V3(p.x+rand(-r,r)*0.7,0.2,p.z+rand(-r,r)*0.7),1,0.4);
    if(P.t>0.5&&k>0.5&&o.hurt!==false)for(const h of k5Heroes()){if(h.pos.y>0.4||Math.hypot(h.pos.x-p.x,h.pos.z-p.z)>r)continue;if((P.cd.get(h)||-9)>G.time-1.2)continue;P.cd.set(h,G.time);if(o.onHit)o.onHit(h);else k5Hurt(h,p);}
    if(P.t>=life){P.off();return false;}});return K5X.own(P);};
/* ---------- экран: вспышка и тон по краям ---------- */
const k5xDom=(id,css)=>{let el=document.getElementById(id);if(!el){el=document.createElement('div');el.id=id;el.style.cssText='position:fixed;inset:0;pointer-events:none;opacity:0;'+css;document.body.appendChild(el);}return el;};
K5X.screen=(col,a,dur)=>{const el=k5xDom('k5xScreen','z-index:27;transition:none');el.style.background=col||'#fff';el.style.transition='none';el.style.opacity=a==null?0.6:a;
  requestAnimationFrame(()=>{el.style.transition='opacity '+(dur||0.5)+'s ease-out';el.style.opacity=0;});};
K5X.tint=(col,a)=>{const el=k5xDom('k5xTint','z-index:3;transition:opacity 1.2s');if(!col){el.style.opacity=0;return;}
  el.style.background='radial-gradient(ellipse at 50% 50%,rgba(0,0,0,0) 50%,'+col+' 100%)';el.style.opacity=a==null?0.6:a;};
/* ---------- чернильная тень по земле (на кого бежит — видно заранее) ---------- */
K5X.shadow=(r,col)=>{const m=new THREE.Mesh(new THREE.CircleGeometry(1,32),new THREE.MeshBasicMaterial({color:col||0x140820,transparent:true,opacity:0.45,depthWrite:false}));m.rotation.x=-Math.PI/2;m.scale.setScalar(r||1);m.position.y=0.05;k5xAdd(m);return K5X.own(m);};
