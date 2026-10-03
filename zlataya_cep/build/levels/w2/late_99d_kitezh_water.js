/* ============================== РЕЛИЗ final06 · МИР 2: ГУСЛИ РАСТУТ — ПЕРЕЛИВ, ТЕЧЕНИЕ, ЗВОН · ОСТАВЛЕННЫЙ ДЕРЖИТ НАПЕВ · РОЛИ ПОД ВОДОЙ ============================== */
// Гусли — всё та же кнопка RB, а что они играют, решает раковина под ногами:
//   ракушка с лодочкой — прилив и отлив (как было); ракушка с рыбкой — течение: поток туда, куда смотрит герой (10 с);
//   ракушка с колокольчиком — звон: колокол гудит 6 с, и пока гудит, невидимый Китеж (лестницы, мостки) виден и твёрд.
// Перелив: две заводи через заслонку — воды в них одна на двоих: отлив у одного — прилив у другого. Закрыта заслонка — вода стоит.
// Оставленный держит напев: сменил героя сразу после игры у раковины течения или звона — оставленный доигрывает 15 с (нотка над ним тает).
// Роли под водой: Потап тяжёлый — в «глубокой» воде (z.heavy) не всплывает, ходит по дну и держит заслонки; живая вода Йоши растит
// водоросли-лесенки; Совиный взор Пелагеи показывает невидимый город и тайные течения; рогатка Прошки звонит в колокола издалека.
const KW={currents:[],shells:[],ghosts:[],bells:[],rafts:[],sluices:[],seeds:[],whirls:[],links:[],owlT:0,linking:false};FIN.kw=KW;
const KW_AX={x:new V3(1,0,0),z:new V3(0,0,1)};
// напев Садко (2-1 — Садко наигрывает, 2-5 — колокола Китежа поднимают ярусы по нему)
FIN.SADKO_TUNE=[67,71,74,72];
{const _ll=loadLevel;loadLevel=function(i){for(const k of['currents','shells','ghosts','bells','rafts','sluices','seeds','whirls','links'])KW[k]=[];KW.owlT=0;KW.linking=false;
  for(const h of HEROES){h.kwHold=null;h.kwLast=null;if(h.kwNote){h.kwNote.visible=false;}}_ll(i);};}
// ---------- нотка над героем, который держит напев ----------
const KW_NOTE_TEX=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const x=c.getContext('2d');x.font='bold 54px Georgia, serif';x.textAlign='center';x.textBaseline='middle';
  x.fillStyle='#fff6c8';x.strokeStyle='rgba(60,30,0,0.6)';x.lineWidth=4;x.strokeText('♪',32,34);x.fillText('♪',32,34);return new THREE.CanvasTexture(c);})();
function kwNote(h){if(!h.kwNote){const s=new THREE.Sprite(new THREE.SpriteMaterial({map:KW_NOTE_TEX,transparent:true,depthWrite:false,color:0xffe9a0}));s.scale.setScalar(0.62);s.renderOrder=9;s.raycast=()=>{};h.kwNote=s;}
  if(h.kwNote.parent!==W.group)W.group.add(h.kwNote);return h.kwNote;}
// ---------- раковины течения и звона ----------
function kwShellMesh(x,z,y,kind,ry){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=ry||0;W.group.add(g);
  addMesh(new THREE.CylinderGeometry(0.07,0.09,1.5,6),M(0xd8c8a8),0,0.75,0,g);
  const sm=M(kind==='ring'?0xf4e2b0:0xc8ecf4,{emissive:kind==='ring'?0x6a5a2a:0x2a5a6a,emissiveIntensity:0.2});const fan=new THREE.Group();fan.position.set(0,1.78,0);g.add(fan);
  for(let i=0;i<7;i++){const a=(i-3)*0.26;const r=addMesh(new THREE.BoxGeometry(0.14,0.62,0.07),sm,Math.sin(a)*0.28,Math.cos(a)*0.28-0.05,0,fan);r.rotation.z=-a;}
  addMesh(new THREE.BoxGeometry(0.32,0.14,0.1),sm,0,-0.16,0,fan);
  const gm=M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.2});const gus=gusliMesh(g,gm,0.55);gus.position.set(-0.52,1.35,0.05);
  const ico=new THREE.Group();ico.position.set(0.55,1.05,0.08);g.add(ico);
  if(kind==='ring'){const bm=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.5});addMesh(new THREE.ConeGeometry(0.17,0.26,10),bm,0,0,0,ico);addMesh(new THREE.SphereGeometry(0.05,6,5),bm,0,-0.15,0,ico);
    addMesh(new THREE.BoxGeometry(0.03,0.5,0.03),M(0x5a4a3a),0,0.36,0,g).position.set(0.55,1.4,0.08);}
  else if(kind==='dance'){const cm=M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.6});addMesh(new THREE.CylinderGeometry(0.16,0.14,0.08,8),cm,0,0,0,ico);for(let i=0;i<5;i++){const a=i/5*Math.PI*2;addMesh(new THREE.ConeGeometry(0.04,0.16,4),cm,Math.cos(a)*0.13,0.1,Math.sin(a)*0.13,ico);}}
  else{const fm=M(0xffc930,{emissive:0xc08000,emissiveIntensity:0.6});const b=addMesh(new THREE.SphereGeometry(0.12,8,6),fm,0,0,0,ico);b.scale.set(0.55,0.8,1.5);const t=addMesh(new THREE.ConeGeometry(0.1,0.16,4),fm,0,0,-0.22,ico);t.rotation.x=-Math.PI/2;}
  return {g,fan,ico,gm,sm,kind};}
function kwShell(kind,x,z,y,ref,o){o=o||{};const m=kwShellMesh(x,z,y||0,kind,o.ry);const S=Object.assign(m,{kind,x,z,y:y||0,ref,r:o.r||2.2,label:o.label||null,say:o.say||null,dirDef:o.dirDef||0});KW.shells.push(S);return S;}
function kwShellAt(h){let best=null,bd=1e9;for(const s of KW.shells){const d=Math.hypot(h.pos.x-s.x,h.pos.z-s.z);if(d<s.r&&Math.abs(h.pos.y-s.y)<2.6&&d<bd&&!(s.ref&&s.ref.off)){bd=d;best=s;}}return best;}
FIN.kwShellAt=kwShellAt;
// ---------- течение ----------
const CUR_VS='varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}';
const CUR_FS='uniform float uT;uniform float uO;uniform float uDir;uniform vec2 uRep;varying vec2 vUv;void main(){vec2 p=vUv*uRep;float s=fract(p.y-uT*0.9*uDir);'+
  'float ch=1.0-smoothstep(0.0,0.18,abs(s-0.5-abs(fract(p.x)-0.5)*0.6));float e=smoothstep(0.0,0.12,vUv.x)*smoothstep(1.0,0.88,vUv.x)*smoothstep(0.0,0.06,vUv.y)*smoothstep(1.0,0.94,vUv.y);'+
  'gl_FragColor=vec4(vec3(0.85,1.0,1.0)*ch*e*uO,1.0);}';
function kwCurrent(rect,o){o=o||{};const ax=o.axis||'z',w=rect.maxx-rect.minx,l=rect.maxz-rect.minz;
  const m=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.ShaderMaterial({uniforms:{uT:FIN.U.time,uO:{value:0},uDir:{value:1},uRep:{value:new THREE.Vector2(1,1)}},vertexShader:CUR_VS,fragmentShader:CUR_FS,
    transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,fog:false}));
  m.rotation.x=-Math.PI/2;if(ax==='x')m.rotation.z=Math.PI/2;m.scale.set(ax==='x'?l:w,ax==='x'?w:l,1);m.material.uniforms.uRep.value.set((ax==='x'?l:w)/1.6,(ax==='x'?w:l)/1.6);
  m.position.set((rect.minx+rect.maxx)/2,0,(rect.minz+rect.maxz)/2);m.renderOrder=6;m.userData.noBatch=true;m.userData.dress=true;W.group.add(m);
  const C={rect,axis:ax,dir:0,t:0,sp:o.sp||2.4,dur:o.dur||10,zone:o.zone||null,y:o.y,hidden:!!o.hidden,name:o.name||'',fx:m,shells:[],onDir:o.onDir||null,heavyK:o.heavyK!=null?o.heavyK:0.35,by:null};
  for(const s of (o.shells||[]))C.shells.push(kwShell('current',s.x,s.z,s.y,C,{ry:s.ry,dirDef:s.dir||0}));
  KW.currents.push(C);return C;}
function kwSetCurrent(C,dir,pi,quiet){const was=C.dir;C.dir=dir;C.t=dir?C.dur:0;if(dir&&!quiet){SFX.wave();const c=C.rect;for(let i=0;i<6;i++)burst(new V3(rand(c.minx,c.maxx),kwSurfY(C)+0.2,rand(c.minz,c.maxz)),0xcff8ff,3,2,0.6);}
  if(C.onDir&&was!==dir)C.onDir(C,dir,pi);}
function kwSurfY(C){return C.zone?Math.max(C.zone.level,C.zone.floor):(C.y||0);}
function kwInCur(C,x,z,m){const r=C.rect;m=m||0;return x>r.minx-m&&x<r.maxx+m&&z>r.minz-m&&z<r.maxz+m;}
FIN.kwCurrent=kwCurrent;FIN.kwSetCurrent=kwSetCurrent;
// ---------- плот: течение несёт его вдоль русла и всех, кто на нём ----------
function kwRaft(C,x,z,w,l,o){o=o||{};const h=o.h||0.5,draft=o.draft!=null?o.draft:h*0.5;const y0=kwSurfY(C)-draft;
  const col=colBox(x-w/2,x+w/2,y0,y0+h,z-l/2,z+l/2,false);col.kwRaft=true;const g=new THREE.Group();g.position.set(x,y0,z);W.group.add(g);(o.build||boatMesh)(g,w,h,l);g.traverse(c=>{c.userData.noBatch=true;});
  const R={C,col,g,x,z,w,l,h,draft,rest:o.rest!=null?o.rest:(C.zone?C.zone.floor:y0),min:o.min,max:o.max,sp:o.sp||0.85,v:0,bob:rand(0,6),name:o.name||''};KW.rafts.push(R);return R;}
function kwRaftTick(R,dt){const C=R.C,ax=C.axis,r=C.rect,half=(ax==='x'?R.w:R.l)/2;let lo=(ax==='x'?r.minx:r.minz)+half,hi=(ax==='x'?r.maxx:r.maxz)-half;if(R.min!=null)lo=Math.max(lo,R.min);if(R.max!=null)hi=Math.min(hi,R.max);
  const wl=kwSurfY(C)-R.draft,floating=wl>R.rest+0.05,y=Math.max(R.rest,wl);R.v=damp(R.v,floating&&C.dir?C.dir*C.sp*R.sp:0,2.2,dt);
  const p0=ax==='x'?R.x:R.z;let p1=clamp(p0+R.v*dt,lo,hi);if(p1===lo||p1===hi)R.v=0;const d=p1-p0;
  if(ax==='x')R.x=p1;else R.z=p1;const dx=ax==='x'?d:0,dz=ax==='x'?0:d,dy=y-R.col.miny;
  R.col.minx=R.x-R.w/2;R.col.maxx=R.x+R.w/2;R.col.minz=R.z-R.l/2;R.col.maxz=R.z+R.l/2;R.col.miny=y;R.col.maxy=y+R.h;
  R.g.position.set(R.x,y+(floating?Math.sin(G.time*1.6+R.bob)*0.035:0),R.z);R.g.rotation.z=floating?Math.sin(G.time*1.1+R.bob)*0.03:0;
  if(d||dy)for(const h of HEROES)if(h.groundRef===R.col&&h.grounded&&!h.cling){h.pos.x+=dx;h.pos.z+=dz;if(dy>0)h.pos.y+=dy;}}
FIN.kwRaft=kwRaft;
// ---------- водоворот: тянет к середине и кружит ----------
function kwWhirl(x,z,r,o){o=o||{};const m=new THREE.Mesh(new THREE.RingGeometry(0.6,r,40,1,0,Math.PI*1.7),MB(0xcff8ff,{transparent:true,opacity:0,side:THREE.DoubleSide,depthWrite:false}));
  m.rotation.x=-Math.PI/2;m.renderOrder=6;m.userData.noBatch=true;W.group.add(m);const Wh={x,z,r,on:o.on||(()=>false),y:o.y||(()=>0),pull:o.pull||1.6,m,k:0,heroes:o.heroes!==false};KW.whirls.push(Wh);return Wh;}
FIN.kwWhirl=kwWhirl;
// ---------- перелив: две заводи, вода одна на двоих ----------
function kwLink(A,B,o){o=o||{};const L={a:A,b:B,open:o.open||(()=>true),via:o.via||null,fx:null,name:o.name||''};A.kwLink=B.kwLink=L;KW.links.push(L);
  for(const z of[A,B]){const l0=z.lock;z.lock=(pi,h,want)=>{if(!L.open())return o.closedText||'Заслонка закрыта — воде некуда уйти';const oz=z===A?B:A;
      if(want==='high'&&oz.state!=='high')return 'Воды нет — вся ушла к соседу';return l0?l0(pi,h,want):null;};}
  return L;}
function kwFlowFx(L,from,to){const a=new V3((from.minx+from.maxx)/2,from.level,(from.minz+from.maxz)/2),b=new V3((to.minx+to.maxx)/2,to.floor+0.3,(to.minz+to.maxz)/2),v=L.via||a.clone().lerp(b,0.5);
  const curve=new THREE.CatmullRomCurve3([a,v,b]);if(L.fx){W.group.remove(L.fx);}const m=new THREE.Mesh(new THREE.TubeGeometry(curve,24,0.45,6,false),MB(0x9fefff,{transparent:true,opacity:0.55,depthWrite:false}));
  m.renderOrder=6;m.userData.noBatch=true;W.group.add(m);L.fx=m;SFX.water();anim(2.2,k=>{m.material.opacity=0.55*Math.sin(Math.min(1,k)*Math.PI);if(k>=1){W.group.remove(m);if(L.fx===m)L.fx=null;}});
  if(FIN.sea&&FIN.sea.bub)for(let i=0;i<14;i++)later(i*0.12,()=>{const p=curve.getPoint(Math.random());FIN.sea.bub.emit(p.x,p.y,p.z,1.4,p.y+3);});
  for(let i=0;i<5;i++)later(i*0.3,()=>{const p=curve.getPoint(i/5);burst(p,0xcff8ff,4,2,0.6);});}
{const _sw=setWater;setWater=function(z,st,pi){const ok=_sw(z,st,pi);if(!ok||!z.kwLink||KW.linking)return ok;const L=z.kwLink,o=L.a===z?L.b:L.a,want=st==='high'?'low':'high';
  if(o.state!==want||o.t<1){KW.linking=true;try{_sw(o,want,pi);}finally{KW.linking=false;}kwFlowFx(L,st==='low'?z:o,st==='low'?o:z);
    if(!G.flags.kwLinkTold){G.flags.kwLinkTold=true;for(const p of[0,1])tip(p,'Перелив! Заводи через заслонку соединены — вода у них одна на двоих:<br>Отлив у одного — прилив у другого. Договаривайтесь, чей черёд.',4.2);}}
  return ok;};}
FIN.kwLink=kwLink;
// ---------- заслонка на дне: держит, кто стоит на круге (heavy — только Потап) ----------
function kwSluice(x,y,z,o){o=o||{};const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);const im=M(0x5a6068),gm=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.3});
  addMesh(new THREE.CylinderGeometry(0.95,1.05,0.14,16),im,0,0.07,0,g);const ring=addMesh(new THREE.TorusGeometry(0.8,0.06,6,24),gm,0,0.16,0,g);ring.rotation.x=Math.PI/2;
  const wheel=new THREE.Group();wheel.position.set(0,0.2,0);g.add(wheel);for(let i=0;i<4;i++){const s=addMesh(new THREE.BoxGeometry(1.3,0.06,0.08),im,0,0,0,wheel);s.rotation.y=i*Math.PI/4;}
  const gate=new THREE.Group();g.add(gate);if(o.gate){const G2=o.gate;gate.position.set(G2.x-x,0,G2.z-z);addMesh(new THREE.BoxGeometry(G2.w||1.6,G2.h||1.4,0.16),im,0,(G2.h||1.4)/2,0,gate).rotation.y=G2.ry||0;}
  const S={x,y,z,g,ring,wheel,gate,heavy:o.heavy!==false,hero:null,k:0,gh:o.gate?(o.gate.h||1.4):0,told:false,name:o.name||''};
  S.held=()=>!!S.hero;KW.sluices.push(S);
  W.cyls.push({x,z,r:0.2,miny:y-1,maxy:y+0.16,on:true});return S;}
FIN.kwSluice=kwSluice;
// ---------- Потап тяжёлый: в глубокой воде не всплывает ----------
function kwHeavyZone(h,x,z){if(!h||h.kind!=='potap')return null;for(const w of W.waters)if(w.heavy&&w.level>w.floor+0.05&&x>w.minx-0.12&&x<w.maxx+0.12&&z>w.minz-0.12&&z<w.maxz+0.12&&h.pos.y<w.level+0.2)return w;return null;}
{const _ga=groundAt;groundAt=function(x,z,reach,m,hh,noWater){if(!noWater&&hh&&hh.kind==='potap'&&W.world===2&&kwHeavyZone(hh,x,z))return _ga(x,z,reach,m,hh,true);return _ga(x,z,reach,m,hh,noWater);};}
{const _uw=updateWaters;updateWaters=function(dt){const P=HERO.potap,hz=W.world===2?kwHeavyZone(P,P.pos.x,P.pos.z):null;const sv=hz?{vy:P.vel.y,g:P.grounded,r:P.groundRef}:null;_uw(dt);
  if(sv){P.vel.y=sv.vy;P.grounded=sv.g;P.groundRef=sv.r;}};}
// на дне глубокой воды Потап идёт медленнее и прыгает ниже; над головой — пузырь воздуха
{const _hw=heroW2;heroW2=function(h,dt){const hz=W&&W.world===2&&h.kind==='potap'?kwHeavyZone(h,h.pos.x,h.pos.z):null;if(hz&&hz.level>h.pos.y+1.0&&!W.bubbles){W.bubbles=true;_hw(h,dt);W.bubbles=false;}else _hw(h,dt);
  h.jumpK=hz&&hz.level>h.pos.y+0.8?0.75:(h.jumpK===0.75?null:h.jumpK);};}
// ---------- звон: колокол гудит, невидимый город проступает ----------
function kwBell(x,y,z,s,o){o=o||{};const b=bigBell(x,y,z,s||1,{pitch:o.pitch||1,col:o.col,tongue:o.tongue});const K={b,x,y,z,s:s||1,hum:0,dur:o.dur||6,name:o.name||'',onRing:o.onRing||null,shells:[],pitch:o.pitch||1,by:null};
  K.ring=(by,quiet)=>{K.hum=K.dur;K.by=by||null;b.ring();if(!quiet){ringFx(new V3(x,y-1.4*K.s,z),0xfff0b0,5*K.s);later(0.25,()=>ringFx(new V3(x,y-1.4*K.s,z),0xffe08a,8*K.s));}if(K.onRing)K.onRing(K,by);};
  const mk=markMesh(1.0);mk.visible=false;W.group.add(mk);K.mk=mk;const mp=new V3(x,y-0.9*K.s,z+0.2);mk.position.copy(mp);
  if(o.mark!==false)W.marks.push({pos:mp,active:()=>K.hum<1.2&&!(o.markOn&&!o.markOn()),onHit:()=>{K.ring(null);floatText(mp.clone().add(new V3(0,0.8,0)),'Дон-н!','#ffe08a');}});
  if(o.hit)W.hittables.push({pos:new V3(x,o.hitY!=null?o.hitY:y-1.4*K.s,z),r:o.hitR||1.4,push:false,alive:()=>K.hum<1.2,onHit:h=>{if(o.hitOk&&!o.hitOk(h))return;K.ring(h);}});
  for(const sh of (o.shells||[]))K.shells.push(kwShell('ring',sh.x,sh.z,sh.y,K,{ry:sh.ry}));
  KW.bells.push(K);return K;}
FIN.kwBell=kwBell;
// невидимая часть Китежа: твёрдая и видная, пока гудит её колокол (или o.on()); под Совиным взором — контур
const KW_GHOST_M=()=>M(0xfff4c8,{transparent:true,opacity:0,emissive:0xffd070,emissiveIntensity:0.55,depthWrite:false});
function kwGhost(minx,maxx,miny,maxy,minz,maxz,o){o=o||{};const col=colBox(minx,maxx,miny,maxy,minz,maxz,false);col.on=false;const mat=KW_GHOST_M();mat.userData.noCaus=true;
  const geo=new THREE.BoxGeometry(maxx-minx,maxy-miny,maxz-minz);const m=new THREE.Mesh(geo,mat);m.position.set((minx+maxx)/2,(miny+maxy)/2,(minz+maxz)/2);m.renderOrder=5;m.castShadow=false;m.userData.noBatch=true;W.group.add(m);
  const e=new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:0xffe9a0,transparent:true,opacity:0,depthWrite:false}));m.add(e);
  const Gh={col,m,e,mat,bells:o.bells||null,on:o.on||null,k:0,solid:false,name:o.name||''};KW.ghosts.push(Gh);return Gh;}
function kwGhostOn(Gh){if(Gh.on)return Gh.on();const L=Gh.bells||KW.bells;return L.some(b=>b.hum>0);}
function kwGhostLeft(Gh){const L=Gh.bells||KW.bells;let t=0;for(const b of L)t=Math.max(t,b.hum);return Gh.on?9:t;}
// лестница-призрак: n ступеней от (x0..x1, z0, y0) до y1, вдоль -z (dz<0) или +z
function kwGhostStairs(x0,x1,z0,y0,y1,n,o){o=o||{};const d=o.dz||-0.6,out=[];for(let i=0;i<n;i++){const zz=z0+d*i,top=y0+(y1-y0)*(i+1)/n;out.push(kwGhost(x0,x1,top-0.3,top,Math.min(zz,zz+d),Math.max(zz,zz+d),o));}return out;}
FIN.kwGhost=kwGhost;FIN.kwGhostStairs=kwGhostStairs;
// ---------- водоросли-лесенки Йоши: живой водой полить росток — вырастет лесенка из листьев ----------
function kwKelp(x,y,z,hgt,o){o=o||{};const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);const sm=M(0x7aff9a,{emissive:0x30c060,emissiveIntensity:0.8});
  const sprout=new THREE.Group();g.add(sprout);for(let i=0;i<3;i++){const c=addMesh(new THREE.ConeGeometry(0.08,0.45,4),sm,Math.cos(i*2.1)*0.08,0.2,Math.sin(i*2.1)*0.08,sprout);c.rotation.z=Math.cos(i*2.1)*0.3;}
  const ring=addMesh(new THREE.TorusGeometry(0.45,0.04,6,20),MB(0x9affb0,{transparent:true,opacity:0.6}),0,0.05,0,g);ring.rotation.x=Math.PI/2;
  // винтовая лесенка: широкие листья по кругу радиуса R на черешках, каждый на step выше (0,5 м — запрыгнет любой, даже тяжёлый Потап),
  // соседние — на dA по кругу (между краями хватает места, голова о лист выше не бьётся: виток выше роста любого героя);
  // last — куда смотрит верхний лист (к террасе): от него назад по кругу считаются остальные
  const step=o.step||0.5,dA=o.dA||0.85,R=o.R||1.45,n=Math.max(2,Math.round(hgt/step)),side=o.last!=null?o.last-(n-1)*dA:(o.side!=null?o.side:0);
  const S={x,y,z,g,sprout,ring,hgt,grown:false,leaves:[],step,dA,R,n,padR:o.padR||0.55,side,name:o.name||'',onGrow:o.onGrow||null};
  S.padAt=i=>{const a=S.side+i*S.dA;return new V3(x+Math.cos(a)*S.R,y+S.step*(i+1),z+Math.sin(a)*S.R);};KW.seeds.push(S);
  W.waterTargets.push({pos:new V3(x,y,z),active:()=>!S.grown&&(!o.active||o.active())&&Math.abs(HERO.yosha.pos.y-y)<2.2,onWater:()=>kwGrowKelp(S)});return S;}
function kwGrowKelp(S,quiet){if(S.grown)return;S.grown=true;S.sprout.visible=false;S.ring.visible=false;const km=M(0x3f9a4a),lm=M(0x5ab84a,{side:THREE.DoubleSide}),vm=M(0x4a8a3e);
  const n=S.n,stalk=new THREE.Group();S.g.add(stalk);
  const ns=Math.ceil(S.hgt/0.9),sh=S.hgt/ns;for(let i=0;i<ns;i++){const seg=addMesh(new THREE.CylinderGeometry(0.11,0.15,sh,6),km,Math.sin(i*1.3)*0.05,sh*(i+0.5),0,stalk);seg.castShadow=false;}
  for(let i=0;i<n;i++){const top=S.step*(i+1),a=S.side+i*S.dA,lx=Math.cos(a)*S.R,lz=Math.sin(a)*S.R;
    const pg=new THREE.Group();pg.position.set(0,top-0.12,0);pg.rotation.y=-a;stalk.add(pg);const pet=addMesh(new THREE.CylinderGeometry(0.045,0.07,S.R,5),vm,S.R/2,0,0,pg);pet.rotation.z=Math.PI/2;pet.castShadow=false;
    const lf=new THREE.Mesh(new THREE.CircleGeometry(S.padR+0.1,10),lm);lf.rotation.x=-Math.PI/2;lf.position.set(lx,top,lz);lf.scale.setScalar(0.05);stalk.add(lf);pg.scale.setScalar(0.05);
    const col={x:S.x+lx,z:S.z+lz,r:S.padR,miny:S.y+top-0.25,maxy:S.y+top,on:false};W.cyls.push(col);S.leaves.push({lf,col});
    later(quiet?0:0.1*i,()=>{col.on=true;if(quiet){lf.scale.setScalar(1);pg.scale.setScalar(1);return;}anim(0.35,k=>{const q=Math.max(0.05,k);lf.scale.setScalar(q);pg.scale.setScalar(q);});SFX.flower();});}
  if(!quiet){SFX.grow();burst(new V3(S.x,S.y+0.5,S.z),0x9affb0,16,3);floatText(new V3(S.x,S.y+S.hgt+0.6,S.z),'Водоросль-лесенка!','#9affb0');
    if(!G.flags.kwKelpTold){G.flags.kwKelpTold=true;for(const p of[0,1])tip(p,'Живая вода Йоши растит водоросли-лесенки: с листа на лист — и наверх!',3.2);}}
  W.updates.push(()=>{stalk.rotation.y=Math.sin(G.time*0.7+S.x)*0.012;});if(S.onGrow)S.onGrow(S);}   // чуть колышется, листья не уходят из-под ног
FIN.kwKelp=kwKelp;FIN.kwGrowKelp=kwGrowKelp;
// ---------- гусли: раковина течения или звона рядом — играет она ----------
function kwPlay(pi,h,S){gusliFx(h,'high');h.kwLast={kind:S.kind,ref:S.ref,shell:S,t:G.time,x:h.pos.x,z:h.pos.z};
  if(S.kind==='current'){const C=S.ref,v=KW_AX[C.axis],f=new V3(Math.sin(h.face),0,Math.cos(h.face));let d=f.dot(v);
    let dir=Math.abs(d)<0.35?(S.dirDef||(((C.axis==='x'?(C.rect.minx+C.rect.maxx)/2-S.x:(C.rect.minz+C.rect.maxz)/2-S.z)>0)?1:-1)):Math.sign(d);
    if(C.lock){const why=C.lock(pi,h,dir);if(why){floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),why,'#9fe6ff');SFX.miss();return;}}
    kwSetCurrent(C,dir,pi);C.by=h;h.kwLast.dir=dir;floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Течение!','#9fe6ff');
    if(!G.flags.kwCurTold){G.flags.kwCurTold=true;tip(pi,'Раковина с рыбкой — течение: вода побежит туда, куда смотришь.<br>Сменишь героя сразу — оставленный доиграет напев, 15 секунд держит.',4);}}
  else if(S.kind==='ring'||S.kind==='dance'){const K=S.ref;if(K.lock){const why=K.lock(pi,h);if(why){floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),why,'#ffe08a');SFX.miss();return;}}
    K.ring(h);floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),S.say||(S.kind==='dance'?'Пляши, царь!':'Звон!'),'#ffe08a');if(S.kind==='dance')return;
    if(!G.flags.kwRingTold){G.flags.kwRingTold=true;tip(pi,'Раковина с колокольчиком — звон: пока колокол гудит, невидимый Китеж виден и твёрд.<br>Сменишь героя сразу — оставленный доиграет, 15 секунд звенит.',4.2);}}}
{const _pg=playGusli;playGusli=function(pi){const p=players[pi],h=active(pi);
  if(W&&W.world===2&&W.abil.gusli&&!p.downed&&!h.hang&&!h.cling&&!((p.gusCd||0)>0)){const S=kwShellAt(h);if(S){p.gusCd=0.7;kwPlay(pi,h,S);return;}}
  const z0=W&&W.world===2?zoneAt(h):null,lv0=z0&&z0.state;_pg(pi);if(z0&&z0.state!==lv0)h.kwLast={kind:'tide',ref:z0,t:G.time,x:h.pos.x,z:h.pos.z};};}
// ---------- оставленный держит напев ----------
function kwLeave(h){const L=h.kwLast;if(!L||G.time-L.t>4||Math.hypot(h.pos.x-L.x,h.pos.z-L.z)>1.6)return;if(L.kind!=='current'&&L.kind!=='ring'&&L.kind!=='dance'&&!(L.kind==='tide'&&L.ref&&L.ref.kwHoldable))return;
  h.kwHold={kind:L.kind,ref:L.ref,dir:L.dir||0,t:15,x:h.pos.x,z:h.pos.z};SFX.ok();floatText(h.pos.clone().add(new V3(0,h.d.height+0.9,0)),'Держу напев!','#ffe9a0');
  if(!G.flags.kwHoldTold){G.flags.kwHoldTold=true;for(const p of[0,1])tip(p,'Оставленный герой держит напев 15 секунд — нотка над ним тает. Успевай!',3.4);}}
{const _ds=doSwap;doSwap=function(pi){const h=active(pi);_ds(pi);if(W&&W.world===2&&active(pi)!==h)kwLeave(h);};}
{const _ss=soloSwap;soloSwap=function(){const h=active(G.soloPi);_ss();if(W&&W.world===2&&active(G.soloPi)!==h&&h.active)kwLeave(h);};}
function kwControlled(h){return h.active&&(!G.solo||h.player===G.soloPi);}
// ---------- совиный взор: невидимый город и тайные течения ----------
{const _os=owlSight;owlSight=function(h){_os(h);if(W&&W.world===2){KW.owlT=4.5;if(KW.ghosts.length||KW.currents.some(c=>c.hidden))floatText(h.pos.clone().add(new V3(0,h.d.height+1.0,0)),'Вижу невидимое!','#e7c3ff');}};}
// ---------- шаг ----------
function kwTick(dt){if(!W||W.world!==2)return;KW.owlT=Math.max(0,KW.owlT-dt);
  // напев оставленных
  for(const h of HEROES){const H=h.kwHold;const n=h.kwNote;if(!H){if(n)n.visible=false;continue;}
    if(kwControlled(h)||h.following||Math.hypot(h.pos.x-H.x,h.pos.z-H.z)>1.6||(h.active&&players[h.player].downed)){h.kwHold=null;if(n)n.visible=false;continue;}
    H.t-=dt;if(H.t<=0){h.kwHold=null;if(n)n.visible=false;floatText(h.pos.clone().add(new V3(0,h.d.height+0.8,0)),'Напев стих','#cfe8ff');continue;}
    if(H.kind==='current'){const C=H.ref;if(C.dir!==H.dir&&C.t<=0)kwSetCurrent(C,H.dir,h.player,true);if(C.dir===H.dir)C.t=Math.max(C.t,0.4);}
    else if(H.kind==='ring'||H.kind==='dance')H.ref.hum=Math.max(H.ref.hum,0.4);
    else if(H.kind==='tide')H.ref.holdT=0.4;
    h.kwNoteT=(h.kwNoteT||0)-dt;if(h.kwNoteT<=0){h.kwNoteT=1.4;gusli(H.kind==='ring'?79:74,0,0.05);}
    const s=kwNote(h);s.visible=true;s.material.opacity=0.35+0.65*Math.min(1,H.t/15);s.position.set(h.pos.x+Math.sin(G.time*2)*0.12,h.pos.y+h.d.height+0.75+Math.sin(G.time*3)*0.08,h.pos.z);s.scale.setScalar(0.4+0.3*Math.min(1,H.t/15));}
  // течения
  for(const C of KW.currents){if(C.dir){C.t-=dt;if(C.t<=0){kwSetCurrent(C,0,null,true);floatText(new V3((C.rect.minx+C.rect.maxx)/2,kwSurfY(C)+1,(C.rect.minz+C.rect.maxz)/2),'Течение стихло','#cfe8ff');}}
    const on=C.dir!==0,y=kwSurfY(C);C.fx.position.y=y+0.06;const tgt=on?(C.hidden&&KW.owlT<=0?0.0:0.42):(C.hidden&&KW.owlT>0?0.18:0);const u=C.fx.material.uniforms;u.uO.value=damp(u.uO.value,tgt,5,dt);u.uDir.value=C.dir||1;
    C.fx.visible=u.uO.value>0.01;
    for(const S of C.shells){S.ico.position.y=1.05+Math.sin(G.time*3)*0.05;S.ico.rotation.y=on?(C.axis==='x'?Math.PI/2*C.dir:(C.dir>0?0:Math.PI)):S.ico.rotation.y+dt*1.5;S.sm.emissiveIntensity=on?0.45+0.3*Math.sin(G.time*8):0.2;
      const near=HEROES.some(h=>h.active&&Math.hypot(h.pos.x-S.x,h.pos.z-S.z)<S.r);S.gm.emissiveIntensity=near?0.5+0.5*Math.sin(G.time*7):0.15;}
    if(!on)continue;const ax=C.axis,v=C.dir*C.sp*dt;
    for(const h of HEROES){if(h.cling||h.groundRef&&h.groundRef.kwRaft)continue;if(!kwInCur(C,h.pos.x,h.pos.z,0))continue;
      const sw=h.groundRef&&h.groundRef.water&&(!C.zone||h.groundRef===C.zone),deep=C.zone&&h.pos.y<C.zone.level-0.3&&h.pos.y>C.zone.floor-0.6;if(!sw&&!deep&&C.zone)continue;
      const k=(deep&&h.kind==='potap'&&C.zone.heavy)?C.heavyK:1;const nx=h.pos.x+(ax==='x'?v*k:0),nz=h.pos.z+(ax==='z'?v*k:0);const r=collideXZ(nx,nz,h.d.radius,h.pos.y,h.pos.y+heroHeight(h));h.pos.x=r.x;h.pos.z=r.z;}
    for(const e of W.enemies){if(!e.alive||!kwInCur(C,e.pos.x,e.pos.z,0)||e.noCurrent)continue;if(C.zone&&!(e.zone===C.zone||e.kwDrift))continue;const nx=e.pos.x+(ax==='x'?v*0.8:0),nz=e.pos.z+(ax==='z'?v*0.8:0);
      if(kwInCur(C,nx,nz,-0.4)){e.pos.x=nx;e.pos.z=nz;}}
    for(const it of W.items){if(it.taken||it.locked||!it.fz||it.fz!==C.zone||!kwInCur(C,it.pos.x,it.pos.z,0))continue;const nx=it.pos.x+(ax==='x'?v*0.7:0),nz=it.pos.z+(ax==='z'?v*0.7:0);if(kwInCur(C,nx,nz,-0.3)){it.pos.x=nx;it.pos.z=nz;}}
    if(FIN.sea&&FIN.sea.bub&&Math.random()<dt*10){const r=C.rect;FIN.sea.bub.emit(rand(r.minx,r.maxx),y-0.3,rand(r.minz,r.maxz),0.6,y+0.4);}}
  for(const R of KW.rafts)kwRaftTick(R,dt);
  // водовороты
  for(const Wh of KW.whirls){const on=Wh.on();Wh.k=damp(Wh.k,on?1:0,3,dt);Wh.m.visible=Wh.k>0.02;Wh.m.material.opacity=0.38*Wh.k;Wh.m.rotation.z+=dt*2.2*Wh.k;Wh.m.position.set(Wh.x,Wh.y()+0.08,Wh.z);
    if(!on||!Wh.heroes)continue;for(const h of HEROES){if(h.cling||!(h.groundRef&&h.groundRef.water))continue;const dx=Wh.x-h.pos.x,dz=Wh.z-h.pos.z,d=Math.hypot(dx,dz)||1;if(d>Wh.r||d<0.5)continue;
      const k=Wh.pull*dt;const r=collideXZ(h.pos.x+(dx/d*0.6+dz/d)*k,h.pos.z+(dz/d*0.6-dx/d)*k,h.d.radius,h.pos.y,h.pos.y+heroHeight(h));h.pos.x=r.x;h.pos.z=r.z;}}
  // колокола и невидимый город
  for(const K of KW.bells){K.hum=Math.max(0,K.hum-dt);if(K.hum>0)K.b.swing=Math.max(K.b.swing,0.35+0.25*Math.sin(G.time*3));K.mk.visible=K.hum<1.2&&HERO.proshka.active&&hd(HERO.proshka.pos,K)<14;
    if(K.mk.visible){K.mk.lookAt(G.split>0.5?cams[0].position:camS.position);}
    for(const S of K.shells){S.ico.rotation.z=K.hum>0?Math.sin(G.time*9)*0.4:0;S.sm.emissiveIntensity=K.hum>0?0.5+0.3*Math.sin(G.time*8):0.2;const near=HEROES.some(h=>h.active&&Math.hypot(h.pos.x-S.x,h.pos.z-S.z)<S.r);S.gm.emissiveIntensity=near?0.5+0.5*Math.sin(G.time*7):0.15;}}
  for(const Gh of KW.ghosts){const on=kwGhostOn(Gh),left=kwGhostLeft(Gh);Gh.solid=on;Gh.col.on=on;const blink=on&&left<1.5?(Math.sin(G.time*18)>0?1:0.35):1;
    const tgt=on?0.62*blink:KW.owlT>0?0.14:0;Gh.k=damp(Gh.k,tgt,on?10:6,dt);Gh.mat.opacity=Gh.k;Gh.e.material.opacity=on?0.9*blink:KW.owlT>0?0.8:0;Gh.m.visible=Gh.k>0.01||Gh.e.material.opacity>0.01;}
  // заслонки: держит тот, кто стоит на круге (на дне)
  for(const S of KW.sluices){let who=null;for(const h of HEROES){if(h.cling||(S.heavy&&h.kind!=='potap'))continue;if(Math.hypot(h.pos.x-S.x,h.pos.z-S.z)<1.05&&Math.abs(h.pos.y-S.y-0.16)<0.7&&h.grounded){who=h;break;}}
    if(who&&!S.hero){SFX.latch();floatText(who.pos.clone().add(new V3(0,who.d.height+0.7,0)),'Держу заслонку!','#ffd9a0');if(!S.told&&who.kind==='potap'){S.told=true;later(0.4,()=>bark(who,'potap','Тяжёлый я — меня вода не подымет. Держу!',2.2,true));}}
    if(!who&&S.hero){SFX.thud();}S.hero=who;S.k=damp(S.k,who?1:0,6,dt);S.wheel.rotation.y+=dt*2.5*S.k;S.gate.position.y=S.k*S.gh;S.ring.material.emissiveIntensity=who?0.8:0.3;}}
{const _step=step;step=function(dt){_step(dt);try{kwTick(dt);}catch(e){console.error('kitezh water',e);}};}
// ---------- рисунки кнопок у раковин ----------
FIN.kwPrompts=function(){for(const pi of[0,1]){const h=()=>active(pi);
  prompt(pi,'item',()=>headOf(h()),()=>{if(!W.abil.gusli)return false;const S=kwShellAt(h());return !!S&&S.kind==='current'&&!S.ref.dir;},'течение — куда смотришь');
  prompt(pi,'item',()=>headOf(h()),()=>{if(!W.abil.gusli)return false;const S=kwShellAt(h());return !!S&&S.kind==='ring'&&S.ref.hum<1.2;},'звон');
  prompt(pi,'item',()=>headOf(h()),()=>{if(!W.abil.gusli)return false;const S=kwShellAt(h());return !!S&&S.kind==='dance'&&S.ref.hum<1.2;},'сыграй — царь пляшет');
  prompt(pi,'swap',()=>headOf(h()),()=>{const L=h().kwLast;return !!L&&G.time-L.t<3.5&&(L.kind==='current'||L.kind==='ring'||L.kind==='dance'||(L.kind==='tide'&&L.ref&&L.ref.kwHoldable))&&Math.hypot(h().pos.x-L.x,h().pos.z-L.z)<1.2;},'оставь — доиграет');}};
// для ботов: собрать испытательную площадку из тех же деталей
FIN.kwTest=()=>({ground,waterZone,M,boardMesh,setWater,playGusli,zoneAt,KW});
