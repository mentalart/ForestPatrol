/* ============================== МИР 3 · НЕБЕСНОЕ ЦАРСТВО: перо Жар-птицы, свет и тьма ============================== */
// RB — перо: зажечь или погасить. Вокруг горящего пера — тёплый круг в 5 м, он действует на всех в круге.
// Светомостки твёрдые в свете, тенемостки — там, где света нет. Оставленный держит перо таким, каким его оставили.
const LIGHT_R=5;
function heroLight(h){return (W.world===3||W.feat5)&&!!h.lit&&!h.cling&&!h.hidden&&!(h.active&&players[h.player].downed);}
function litAt(x,y,z,r0){const R=LIGHT_R+(r0||0);
  for(const h of HEROES){if(!heroLight(h))continue;const dx=h.pos.x-x,dz=h.pos.z-z;if(dx*dx+dz*dz<R*R&&Math.abs(h.pos.y+0.5-y)<4.5)return true;}
  for(const L of W.lights){if(L.on&&!L.on())continue;const p=L.pos,r=(L.r||LIGHT_R)+(r0||0),dx=p.x-x,dz=p.z-z;if(dx*dx+dz*dz<r*r&&Math.abs(p.y-y)<(L.h||5))return true;}
  return false;}
function lightSrc(pos,r,on,h){const L={pos,r:r||LIGHT_R,on:on||null,h:h||5};W.lights.push(L);return L;}
// тёплое пятно на земле от неподвижного света (ожившая яблоня, фонарь)
function lightDisc(pos,r,on){const m=new THREE.Mesh(new THREE.CircleGeometry(r||LIGHT_R,40),MB(0xffc860,{transparent:true,opacity:0.1,depthWrite:false,blending:THREE.AdditiveBlending}));
  m.rotation.x=-Math.PI/2;m.position.copy(pos);m.position.y+=0.06;m.renderOrder=2;W.group.add(m);if(on)W.updates.push(()=>{m.visible=on();});return m;}
function playFeather(pi){const p=players[pi],h=active(pi);if(p.downed||h.cling)return;
  if(!W.abil.pero){if(p.lockedTip<=0){p.lockedTip=4;tip(pi,W.peroLocked||'Перо подарит сама Жар-птица — она в гнезде сидит.',2.4);}return;}
  if(W.featherLock){const why=W.featherLock(pi,h);if(why){if(p.lockedTip<=0){p.lockedTip=2;tip(pi,why,2.2);}SFX.miss();return;}}
  if((p.featCd||0)>0)return;p.featCd=0.16;h.lit=!h.lit;featherFx(h);G.stats.feathers=(G.stats.feathers||0)+1;if(W.onFeather)W.onFeather(pi,h,h.lit);}
function featherFx(h){h.atkT=Math.max(h.atkT,0.12);const top=h.pos.clone().add(new V3(0,h.d.height+0.6,0));
  if(h.lit){tone(660,0.18,'triangle',0.15,990);tone(1320,0.25,'sine',0.07,null,0.05);ringFx(h.pos.clone(),0xffc860,LIGHT_R);burst(top,0xffb040,10,3);floatText(top,'Свет!','#ffd76a');}
  else{tone(700,0.22,'sine',0.11,380);ringFx(h.pos.clone(),0x9a7ae0,2.2);floatText(top,'Тьма','#c8b0ff');}}
const FEATHER_GEO=(()=>{const s=new THREE.Shape();s.moveTo(0,0);s.quadraticCurveTo(0.13,0.2,0.02,0.52);s.quadraticCurveTo(-0.11,0.22,0,0);return new THREE.ShapeGeometry(s);})();
function featherMesh(scale){const g=new THREE.Group();const m1=M(0xff6a2a,{emissive:0xff5010,emissiveIntensity:0.3,side:THREE.DoubleSide}),m2=M(0xffd040,{emissive:0xffa000,emissiveIntensity:0.3,side:THREE.DoubleSide});
  g.add(new THREE.Mesh(FEATHER_GEO,m1));const f2=new THREE.Mesh(FEATHER_GEO,m2);f2.scale.set(0.55,0.82,1);f2.position.z=0.006;g.add(f2);
  const st=new THREE.Mesh(new THREE.CylinderGeometry(0.01,0.013,0.58,4),M(0xfff0c0));st.position.y=0.27;g.add(st);g.scale.setScalar(scale||1);g.userData.mats=[m1,m2];return g;}
// визуал героя в Мире 3: перо в лапе, тёплый круг и граница круга на земле, огонёк
function heroW3(h,dt){const on3=W.world===3||W.feat5;
  if(on3&&!h.lamp){h.lamp=new THREE.PointLight(0xffc070,0,LIGHT_R*2,1.3);h.lamp.position.y=h.d.height+0.9;h.g.add(h.lamp);
    h.ldisc=new THREE.Mesh(new THREE.CircleGeometry(LIGHT_R,48),MB(0xffc860,{transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}));h.ldisc.rotation.x=-Math.PI/2;h.ldisc.position.y=0.05;h.ldisc.renderOrder=2;h.g.add(h.ldisc);
    h.ledge=new THREE.Mesh(new THREE.TorusGeometry(LIGHT_R,0.045,6,72),MB(0xffe0a0,{transparent:true,opacity:0,depthWrite:false}));h.ledge.rotation.x=Math.PI/2;h.ledge.position.y=0.08;h.g.add(h.ledge);
    h.fth=featherMesh(0.9);h.fth.position.set(h.d.radius*0.85,h.d.height*0.72,0.14);h.g.add(h.fth);}
  if(!h.lamp)return;
  h.lamp.visible=on3;const lit=on3&&heroLight(h);h.litK=damp(h.litK||0,lit?1:0,12,dt);const k=h.litK;
  h.lamp.intensity=1.7*k;h.ldisc.visible=h.ledge.visible=on3&&k>0.02;h.ldisc.material.opacity=0.2*k;h.ledge.material.opacity=0.5*k;h.ledge.rotation.z+=dt*0.3;
  h.fth.visible=on3&&!!W.abil.pero&&!h.noFeather&&!(h.active&&players[h.player].downed)&&(W.world!==5||h.lit||(signNear(h)||{}).item==='pero');
  if(h.fth.visible){h.fth.rotation.z=-0.3+Math.sin(G.time*3+h.d.speed)*0.15;h.fth.userData.mats.forEach(m=>{m.emissiveIntensity=0.25+1.5*k;});h.fth.position.y=h.d.height*0.72+0.22*k;}}
/* ---------- светомостки и тенемостки ---------- */
const TILE_M={light:[M(0xffd76a,{emissive:0xffa020,emissiveIntensity:0.75,transparent:true,opacity:0.92}),MB(0xffe8a0,{transparent:true,opacity:0.08,depthWrite:false})],
  shadow:[M(0x9a7ae8,{emissive:0x4a2aa0,emissiveIntensity:0.6,transparent:true,opacity:0.82}),MB(0xc0a8ff,{transparent:true,opacity:0.07,depthWrite:false})]};
Object.values(TILE_M).forEach(a=>a.forEach(m=>{m.userData.shared=true;}));
const TILE_GEO=new THREE.BoxGeometry(1,0.16,1);
function mostok(type,x,y,z,w,l,ang,o){o=o||{};ang=ang||0;const m=new THREE.Mesh(TILE_GEO,TILE_M[type][1]);m.scale.set(w,1,l);m.position.set(x,y-0.08,z);m.rotation.y=ang;m.renderOrder=3;m.receiveShadow=true;W.group.add(m);
  const t={tile:true,type,x,y,z,w,l,ca:Math.cos(ang),sa:Math.sin(ang),m,solid:false,on:o.on||null};W.tiles.push(t);if(W.surfs.indexOf(tileSurf)<0)W.surfs.push(tileSurf);return t;}
// дорожка по точкам [[x,y,z],…]: отрезки режутся на плитки ~1,5 м; type — 'light' / 'shadow' или функция (номер плитки) → тип
function mostki(type,pts,o){o=o||{};const w=o.w||1.5,step=o.step||1.5,out=[];let n=0;
  for(let i=0;i<pts.length-1;i++){const a=pts[i],b=pts[i+1],dx=b[0]-a[0],dy=b[1]-a[1],dz=b[2]-a[2],L=Math.hypot(dx,dz),k=Math.max(1,Math.round(L/step)),ang=Math.atan2(dx,dz);
    for(let j=0;j<k;j++){const u=(j+0.5)/k,tp=typeof type==='function'?type(n,u,i):type;out.push(mostok(tp,a[0]+dx*u,a[1]+dy*u,a[2]+dz*u,w,L/k+0.03,ang,o));n++;}}
  return out;}
function tileSurf(x,z,reach){let best=null;
  for(const t of W.tiles){if(!t.solid)continue;const dx=x-t.x,dz=z-t.z,R=t.l+t.w;if(dx*dx+dz*dz>R*R)continue;const u=dx*t.sa+dz*t.ca,v=dx*t.ca-dz*t.sa;
    if(Math.abs(u)>t.l/2+0.08||Math.abs(v)>t.w/2+0.14||t.y>reach+0.001)continue;if(!best||t.y>best.y)best={y:t.y,ref:t};}
  return best;}
// знак у края: лучики — нужен свет, звёздочки — нужна темнота
function starGeo(r){const s=new THREE.Shape();for(let i=0;i<10;i++){const a=i/10*Math.PI*2+Math.PI/2,rr=i%2?r*0.42:r;const x=Math.cos(a)*rr,y=Math.sin(a)*rr;if(i)s.lineTo(x,y);else s.moveTo(x,y);}return new THREE.ShapeGeometry(s);}
function edgeSign(x,y,z,type,ry){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=ry||0;W.group.add(g);
  addMesh(new THREE.CylinderGeometry(0.05,0.06,1.1,6),M(0xe8e0f0),0,0.55,0,g);const DS={side:THREE.DoubleSide};
  const disc=new THREE.Mesh(new THREE.CircleGeometry(0.32,20),MB(0x1a1830,Object.assign({transparent:true,opacity:0.8},DS)));disc.position.y=1.4;g.add(disc);
  if(type==='light'){const sm=MB(0xffd23a,DS);const c=new THREE.Mesh(new THREE.CircleGeometry(0.11,16),sm);c.position.set(0,1.4,0.01);g.add(c);
    for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const r=new THREE.Mesh(new THREE.PlaneGeometry(0.045,0.1),sm);r.position.set(Math.cos(a)*0.2,1.4+Math.sin(a)*0.2,0.01);r.rotation.z=a-Math.PI/2;g.add(r);}}
  else{const sm=MB(0xd8c4ff,DS);for(const[dx,dy,s]of[[0,0,1],[-0.17,0.13,0.5],[0.16,-0.13,0.55]]){const st=new THREE.Mesh(starGeo(0.13*s),sm);st.position.set(dx,1.4+dy,0.01);g.add(st);}}
  const ring=new THREE.Mesh(new THREE.TorusGeometry(0.33,0.03,6,24),MB(type==='light'?0xffd23a:0xb89aff));ring.position.y=1.4;g.add(ring);return g;}
/* ---------- облачные острова ---------- */
const CLOUD_TOP=M(0xc4bce6),CLOUD_SIDE=M(0x9088c4);CLOUD_TOP.userData.shared=CLOUD_SIDE.userData.shared=true;
const PUFF_GEO=new THREE.SphereGeometry(1,10,8);
function cloudIsle(minx,maxx,minz,maxz,top,o){o=o||{};top=top||0;const c=ground(minx,maxx,minz,maxz,top,o.topMat||CLOUD_TOP,o.sideMat||CLOUD_SIDE);W.puffs=W.puffs||[];
  const Wd=maxx-minx,D=maxz-minz,per=2*(Wd+D),n=Math.max(6,Math.round(per/1.5));
  for(let i=0;i<n;i++){let u=i/n*per,x,z;if(u<Wd){x=minx+u;z=maxz;}else if((u-=Wd)<D){x=maxx;z=maxz-u;}else if((u-=D)<Wd){x=maxx-u;z=minz;}else{u-=Wd;x=minx;z=minz+u;}
    W.puffs.push({x,y:top-0.55-rand(0,1.1),z,s:rand(0.7,1.3)});}
  for(let i=0;i<Math.max(2,Math.round(Wd*D/12));i++)W.puffs.push({x:rand(minx+0.5,maxx-0.5),y:top-3.3-rand(0,1),z:rand(minz+0.5,maxz-0.5),s:rand(1.2,2.2)});
  return c;}
function flushPuffs(){if(!W.puffs||!W.puffs.length)return;const L=W.puffs,im=new THREE.InstancedMesh(PUFF_GEO,M(0xffffff),L.length),m=new THREE.Matrix4(),q=new THREE.Quaternion(),c=new THREE.Color();
  L.forEach((p,i)=>{m.compose(new V3(p.x,p.y,p.z),q,new V3(p.s,p.s*0.66,p.s));im.setMatrixAt(i,m);c.setHSL(0.7+rand(-0.03,0.04),0.3,p.far?rand(0.5,0.64):rand(0.72,0.84));im.setColorAt(i,c);});
  im.receiveShadow=true;W.group.add(im);W.puffs=[];}
// небо в сумерках: море облаков внизу, дальние облачные горы, звёзды, тусклое солнце
function heavenDecor(zmin,zmax,o){o=o||{};W.puffs=W.puffs||[];const xw=o.xw||14;
  for(let i=0;i<80;i++)W.puffs.push({x:(Math.random()<0.5?-1:1)*rand(xw,70),y:rand(-18,-7),z:rand(zmin-30,zmax+20),s:rand(3,7),far:true});
  for(let i=0;i<Math.round((zmax-zmin)/5);i++)W.puffs.push({x:rand(-xw,xw),y:rand(-24,-15),z:rand(zmin,zmax),s:rand(3,6),far:true});
  for(let i=0;i<16;i++)W.puffs.push({x:rand(-90,90),y:rand(-6,10),z:zmin-rand(40,80),s:rand(7,13),far:true});
  const n=420,pos=new Float32Array(n*3);for(let i=0;i<n;i++){const a=rand(0,Math.PI*2),e=rand(0.1,1.3),r=230;pos[i*3]=Math.cos(a)*Math.cos(e)*r;pos[i*3+1]=Math.sin(e)*r;pos[i*3+2]=Math.sin(a)*Math.cos(e)*r+(zmin+zmax)/2;}
  const gg=new THREE.BufferGeometry();gg.setAttribute('position',new THREE.BufferAttribute(pos,3));const st=new THREE.Points(gg,new THREE.PointsMaterial({color:0xfff8e0,size:1.7,sizeAttenuation:false,fog:false,transparent:true,opacity:o.stars===undefined?0.9:o.stars}));W.group.add(st);W.stars=st;
  const s=new THREE.Mesh(new THREE.CircleGeometry(10,32),MB(o.sunCol||0xff9a60,{fog:false,transparent:true,opacity:0.85}));s.position.set(o.sunX||55,o.sunY||6,zmin-170);s.lookAt(0,0,(zmin+zmax)/2);W.group.add(s);W.duskSun=s;
  // пылинки света
  const m2=150,p2=new Float32Array(m2*3);for(let i=0;i<m2;i++){p2[i*3]=rand(-xw,xw);p2[i*3+1]=rand(0,9);p2[i*3+2]=rand(zmin,zmax);}
  const g2=new THREE.BufferGeometry();g2.setAttribute('position',new THREE.BufferAttribute(p2,3));W.group.add(new THREE.Points(g2,new THREE.PointsMaterial({color:0xffe0a0,size:0.12,transparent:true,opacity:0.6})));
  W.updates.push(dt=>{const a=g2.attributes.position.array;for(let i=0;i<m2;i++){a[i*3+1]+=dt*0.25;a[i*3]+=Math.sin(G.time*0.7+i)*dt*0.15;if(a[i*3+1]>9)a[i*3+1]=0;}g2.attributes.position.needsUpdate=true;});}
/* ---------- серые яблони: постоять с горящим пером три секунды — оживают ---------- */
function appleTree(x,z,y,o){o=o||{};y=y||0;const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);const s=o.s||1;g.scale.setScalar(s);
  const bark=M(0x7a7480),leafM=M(0x8a8a9a);addMesh(new THREE.CylinderGeometry(0.22,0.32,1.8,8),bark,0,0.9,0,g);
  for(const[dx,dy,dz,r]of[[0,2.4,0,1.2],[0.75,2.1,0.3,0.8],[-0.72,2.2,-0.2,0.85],[0.1,2.95,-0.4,0.8]])addMesh(new THREE.SphereGeometry(r,12,10),leafM,dx,dy,dz,g);
  const am=M(0x9a98a4,{emissive:0x000000});for(let i=0;i<10;i++){const a=i/10*Math.PI*2;addMesh(new THREE.SphereGeometry(0.13,8,6),am,Math.cos(a)*1.05,1.95+Math.sin(i*1.9)*0.45,Math.sin(a)*1.05,g);}
  W.cyls.push({x,z,r:0.35*s,miny:y-1,maxy:y+1.8*s,on:true});
  const orb=[];for(let i=0;i<8;i++){const m=new THREE.Mesh(new THREE.OctahedronGeometry(0.11),MB(0xffd76a,{transparent:true,opacity:0.95}));m.visible=false;W.group.add(m);orb.push(m);}
  const T={g,pos:new V3(x,y,z),leafM,am,bark,orb,prog:0,revived:false,onRevive:o.onRevive||null,light:null,r:o.lr||LIGHT_R,s};W.trees.push(T);if(o.revived)reviveTree(T,true);return T;}
function reviveTree(T,quiet){T.revived=true;T.prog=1;T.leafM.color.setHex(0x4f9a3a);T.bark.color.setHex(0x6b4a2b);T.am.color.setHex(0xffc840);T.am.emissive.setHex(0xff9a10);T.am.emissiveIntensity=0.9;
  T.orb.forEach(m=>{m.visible=false;});T.light=lightSrc(T.pos.clone().add(new V3(0,1,0)),T.r);lightDisc(T.pos,T.r);
  if(!quiet){SFX.grow();burst(T.pos.clone().add(new V3(0,2.4*T.s,0)),0xffd76a,26,5);ringFx(T.pos,0xffc860,T.r);floatText(T.pos.clone().add(new V3(0,3.6*T.s,0)),'Яблоня ожила!','#ffe08a');}
  if(T.onRevive)T.onRevive(T);}
function updateTrees(dt){for(const T of W.trees){if(T.revived)continue;const near=HEROES.some(h=>heroLight(h)&&hd(h.pos,T.pos)<2.7*T.s+0.4&&Math.abs(h.pos.y-T.pos.y)<1.8);
    T.prog=clamp(T.prog+(near?dt/3:-dt*0.6),0,1);const n=Math.floor(T.prog*8+0.001);
    T.orb.forEach((m,i)=>{m.visible=i<n;if(m.visible){const a=G.time*2+i/8*Math.PI*2;m.position.set(T.pos.x+Math.cos(a)*1.3*T.s,T.pos.y+3.6*T.s+Math.sin(G.time*4+i)*0.15,T.pos.z+Math.sin(a)*1.3*T.s);m.rotation.y+=dt*4;}});
    if(near&&Math.random()<dt*6)burst(T.pos.clone().add(new V3(rand(-1,1),2+rand(0,1.4),rand(-1,1))),0xffd76a,2,1.2,0.6);
    if(T.prog>=1)reviveTree(T);}}
/* ---------- облака-лифты (3-2): тёплый свет поднимает, в темноте опускается; поднятое тает за 15 с; живая вода делает пухлым ---------- */
function cloudLift(x,z,base,ceil,o){o=o||{};const r=o.r||1.6;const g=new THREE.Group();g.position.set(x,base,z);W.group.add(g);
  const mat=M(0xf4f0ff,{transparent:true,opacity:0.95,emissive:0x4a3a80,emissiveIntensity:0.15});
  for(const[dx,dy,dz,s]of[[0,-0.2,0,1],[0.7,-0.18,0.3,0.72],[-0.7,-0.2,-0.2,0.74],[0.2,-0.18,-0.7,0.7],[-0.3,-0.18,0.7,0.7]]){const p=new THREE.Mesh(PUFF_GEO,mat);p.position.set(dx*r,dy,dz*r);p.scale.set(s*r*0.82,s*0.5,s*r*0.82);p.castShadow=true;p.receiveShadow=true;g.add(p);}
  const c={cloud:true,x,z,r,base,ceil,y:base,puffy:false,meltT:0,gone:0,g,mat,rate:o.rate||1,noMelt:!!o.noMelt,name:o.name||''};W.clouds.push(c);if(W.surfs.indexOf(cloudSurf)<0)W.surfs.push(cloudSurf);
  if(o.puffy)puffUp(c,true);
  const wt={pos:new V3(x,0,z),active:()=>{if(c.puffy||c.gone>0||o.noWater||Math.abs(HERO.yosha.pos.y-c.y)>2.6)return false;const Y=HERO.yosha.pos,dx=Y.x-c.x,dz=Y.z-c.z,d=Math.hypot(dx,dz)||1,k=Math.min(d,c.r-0.2)/d;wt.pos.set(c.x+dx*k,c.y,c.z+dz*k);return true;},onWater:()=>puffUp(c)};W.waterTargets.push(wt);
  return c;}
function puffUp(c,quiet){c.puffy=true;c.meltT=0;c.g.scale.set(1.35,1.25,1.35);c.mat.color.setHex(0xffffff);if(!quiet){SFX.water();SFX.grow();burst(new V3(c.x,c.y+0.4,c.z),0xffffff,16,3);floatText(new V3(c.x,c.y+1.4,c.z),'Пухлое! Не тает, не тает','#e8f4ff');}if(W.onPuff)W.onPuff(c);}
function cloudSurf(x,z,reach,hh){let best=null;
  for(const c of W.clouds){if(c.gone>0)continue;if(!c.puffy&&hh&&hh.kind==='potap')continue;const R=c.r*(c.puffy?1.3:1),dx=x-c.x,dz=z-c.z;if(dx*dx+dz*dz>R*R)continue;const y=c.y+0.22;if(y>reach+0.001)continue;if(!best||y>best.y)best={y,ref:c};}
  return best;}
// облако теплеет только под горящим пером: кто со светом стоит на нём (или прыгнул над ним), а также неподвижный свет рядом
function cloudWarm(c){const R=c.r*(c.puffy?1.3:1);for(const h of HEROES){if(!heroLight(h))continue;if(h.groundRef===c)return true;if(!h.grounded&&hd(h.pos,c)<R&&h.pos.y>c.y&&h.pos.y<c.y+2.6)return true;}
  for(const L of W.lights){if(L.on&&!L.on())continue;if(hd(L.pos,c)<(L.r||LIGHT_R)*0.5&&Math.abs(L.pos.y-c.y)<3)return true;}return false;}
function meltCloud(c){c.gone=2.4;c.meltT=0;SFX.splash();for(let i=0;i<8;i++)burst(new V3(c.x+rand(-1,1),c.y,c.z+rand(-1,1)),0xf4f0ff,3,2,1.2);floatText(new V3(c.x,c.y+1,c.z),'Растаяло!','#e8f4ff');if(W.onMelt)W.onMelt(c);}
function updateClouds(dt){for(const c of W.clouds){
    if(c.gone>0){c.gone-=dt;c.g.visible=false;if(c.gone<=0){c.y=c.base;c.meltT=0;c.g.visible=true;c.g.position.y=c.y;anim(0.5,k=>{c.g.scale.setScalar(Math.max(0.05,k)*(c.puffy?1.3:1));});}continue;}
    const lit=cloudWarm(c);c.lit=lit;if(lit)c.y=Math.min(c.ceil,c.y+c.rate*dt);else c.y=Math.max(c.base,c.y-c.rate*dt);
    const raised=c.y>c.base+0.25;if(raised&&!c.puffy&&!c.noMelt){c.meltT+=dt;if(c.meltT>15){meltCloud(c);continue;}}else if(!raised)c.meltT=0;
    c.g.position.y=c.y+Math.sin(G.time*1.3+c.x)*0.04;c.mat.emissive.setHex(lit?0xff9040:0x4a3a80);c.mat.emissiveIntensity=lit?0.32:0.14;
    c.mat.opacity=!c.puffy&&c.meltT>11?(Math.sin(G.time*16)>0?0.95:0.35):0.95;
    const P=HERO.potap;if(!c.puffy&&!P.cling&&hd(P.pos,c)<c.r&&P.pos.y<c.y+0.4&&P.pos.y>c.y-1.2&&P.vel.y<0&&!(W.flags.potapThru>0)){W.flags.potapThru=6;floatText(P.pos.clone().add(new V3(0,2.2,0)),'Провалился!','#e0b27a');
      tip(P.player,'Облачко Потапа не держит — Йоша, полей его!',3);}}
  if(W.flags.potapThru>0)W.flags.potapThru-=dt;}
/* ---------- облачные барашки: бегут к ближайшему свету; горящее перо на холме — стадо складывается мостиком ---------- */
function makeSheep(){const g=new THREE.Group();W.group.add(g);const wool=M(0xfaf8ff),dk=M(0x3a3448);
  for(const[dx,dy,dz,s]of[[0,0.62,0,0.5],[0.28,0.66,0.18,0.34],[-0.28,0.66,0.12,0.36],[0.1,0.72,-0.28,0.36],[-0.14,0.8,0.02,0.34],[0,0.6,0.3,0.32]])part(g,new THREE.SphereGeometry(s,10,8),wool,dx,dy,dz);
  const head=new THREE.Group();head.position.set(0,0.66,0.5);g.add(head);part(head,new THREE.SphereGeometry(0.2,10,8),dk,0,0,0).scale.set(0.85,1,1.15);
  for(const s of[-1,1]){part(head,new THREE.SphereGeometry(0.045,6,5),M(0xffffff),s*0.09,0.06,0.18);const e=part(head,new THREE.BoxGeometry(0.16,0.05,0.08),dk,s*0.2,0.06,-0.02);e.rotation.z=s*0.4;}
  part(head,new THREE.SphereGeometry(0.13,8,6),wool,0,0.17,-0.03);const legs=[];for(const[x,z]of[[-0.2,0.2],[0.2,0.2],[-0.2,-0.2],[0.2,-0.2]])legs.push(part(g,new THREE.CylinderGeometry(0.05,0.05,0.4,5),dk,x,0.2,z));
  return {g,head,legs};}
function sheepFlock(n,home,bridge,hills,o){o=o||{};const F={n,home,bridge,hills,on:false,list:[],surfY:bridge.a[1],name:o.name||''};
  for(let i=0;i<n;i++){const m=makeSheep();const p=new V3(home.x+rand(-home.r,home.r),home.y,home.z+rand(-home.r,home.r));m.g.position.copy(p);F.list.push({m,pos:p,tgt:p.clone(),at:false,wander:rand(0,4),face:rand(0,6)});}
  W.flocks.push(F);if(W.surfs.indexOf(sheepSurf)<0)W.surfs.push(sheepSurf);return F;}
function sheepSlot(F,i){const a=F.bridge.a,b=F.bridge.b,u=(i+0.5)/F.n;return new V3(lerp(a[0],b[0],u),lerp(a[1],b[1],u),lerp(a[2],b[2],u));}
function onSheepBridge(F,h){const a=F.bridge.a,b=F.bridge.b,dx=b[0]-a[0],dz=b[2]-a[2],L=Math.hypot(dx,dz),u=((h.pos.x-a[0])*dx+(h.pos.z-a[2])*dz)/L,v=Math.abs((h.pos.x-a[0])*dz-(h.pos.z-a[2])*dx)/L;return u>-0.8&&u<L+0.8&&v<1.4&&Math.abs(h.pos.y-a[1])<2.2;}
function sheepSurf(x,z,reach){let best=null;for(const F of W.flocks){if(!F.on)continue;for(const s of F.list){if(!s.at)continue;const dx=x-s.pos.x,dz=z-s.pos.z;if(dx*dx+dz*dz>1.02)continue;const y=s.pos.y+0.95;if(y>reach+0.001)continue;if(!best||y>best.y)best={y,ref:s};}}return best;}
function updateFlocks(dt){for(const F of W.flocks){
    const onHill=F.hills.some(hl=>HEROES.some(h=>heroLight(h)&&hd(h.pos,hl)<1.9&&Math.abs(h.pos.y-hl.y)<1.6));
    const keep=F.on&&HEROES.some(h=>heroLight(h)&&onSheepBridge(F,h));const want=onHill||keep;
    if(want!==F.on){F.on=want;if(want){SFX.ok();floatText(new V3(F.home.x,F.home.y+1.6,F.home.z),'Бе-е!','#ffffff');if(F.onBridge)F.onBridge();}else{SFX.miss();floatText(sheepSlot(F,2).add(new V3(0,1.6,0)),'Разбежались!','#ffffff');F.list.forEach(s=>{s.at=false;});if(F.onScatter)F.onScatter();}}
    // без моста барашки трусят к ближайшему свету в 12 м, иначе пасутся
    let lamp=null;if(!F.on){let bd=12;for(const h of HEROES){if(!heroLight(h))continue;const d=Math.hypot(h.pos.x-F.home.x,h.pos.z-F.home.z);if(d<bd&&Math.abs(h.pos.y-F.home.y)<3){bd=d;lamp=h;}}}
    F.list.forEach((s,i)=>{let tgt;if(F.on)tgt=sheepSlot(F,i);else if(lamp){const a=i/F.n*Math.PI*2;tgt=new V3(lamp.pos.x+Math.cos(a)*1.8,F.home.y,lamp.pos.z+Math.sin(a)*1.8);}
      else{s.wander-=dt;if(s.wander<=0){s.wander=rand(2,5);s.tgt.set(F.home.x+rand(-F.home.r,F.home.r),F.home.y,F.home.z+rand(-F.home.r,F.home.r));}tgt=s.tgt;}
      const d=s.pos.distanceTo(tgt),sp=F.on?6:lamp?4:1.2;if(d>0.05){const k=Math.min(1,sp*dt/d);s.pos.lerp(tgt,k);s.face=angDamp(s.face,Math.atan2(tgt.x-s.pos.x,tgt.z-s.pos.z),6,dt);}
      s.at=F.on&&d<0.3;s.m.g.position.set(s.pos.x,s.pos.y+(d>0.1?Math.abs(Math.sin(G.time*12+i))*0.12:0),s.pos.z);s.m.g.rotation.y=F.on&&s.at?Math.atan2(F.bridge.b[0]-F.bridge.a[0],F.bridge.b[2]-F.bridge.a[2])+Math.PI/2:s.face;
      s.m.legs.forEach((l,k)=>{l.rotation.x=d>0.1?Math.sin(G.time*14+k*Math.PI)*0.5:0;});s.m.head.rotation.x=!F.on&&!lamp&&d<0.1?0.5+Math.sin(G.time*2+i)*0.1:0;});}}
/* ---------- гуси-лебеди (3-5): конус взгляда на земле; свет в конусе — гусь ныряет и относит героя к укрытию ---------- */
function makeGoose(s){const g=new THREE.Group();W.group.add(g);const w=M(0xf8f8fa),bk=M(0xf08a20),dk=MAT.dark;const body=new THREE.Group();g.add(body);
  part(body,new THREE.SphereGeometry(0.5,12,10),w,0,0,0).scale.set(0.8,0.7,1.35);const neck=part(body,new THREE.CylinderGeometry(0.09,0.12,0.9,8),w,0,0.35,0.75);neck.rotation.x=0.9;
  const head=new THREE.Group();head.position.set(0,0.68,1.12);body.add(head);part(head,new THREE.SphereGeometry(0.16,10,8),w,0,0,0);const bg=new THREE.ConeGeometry(0.07,0.3,6);bg.rotateX(Math.PI/2);part(head,bg,bk,0,-0.03,0.22);
  for(const sd of[-1,1])part(head,new THREE.SphereGeometry(0.03,6,5),dk,sd*0.1,0.04,0.08);part(body,new THREE.ConeGeometry(0.2,0.4,6),w,0,0.05,-0.75).rotation.x=-1.6;
  const wings=[];for(const sd of[-1,1]){const wp=new THREE.Group();wp.position.set(sd*0.3,0.15,0);body.add(wp);const wm=part(wp,new THREE.BoxGeometry(1.3,0.05,0.62),w,sd*0.65,0,0);wm.rotation.y=sd*0.15;
    part(wp,new THREE.BoxGeometry(0.5,0.04,0.3),M(0xd8d8e0),sd*1.2,0,-0.15);wings.push({wp,sd});}
  g.scale.setScalar(s||1);return {g,body,head,wings};}
function goose(o){const m=makeGoose(o.s||1.1);const cone=new THREE.Mesh(new THREE.CylinderGeometry(0.15,1,1,24,1,true),MB(0xe8f4ff,{transparent:true,opacity:0.13,depthWrite:false,side:THREE.DoubleSide}));cone.renderOrder=4;W.group.add(cone);
  const foot=new THREE.Mesh(new THREE.CircleGeometry(1,32),MB(0xf0f8ff,{transparent:true,opacity:0.28,depthWrite:false}));foot.rotation.x=-Math.PI/2;foot.renderOrder=4;W.group.add(foot);
  const q={m,cone,foot,cx:o.x,cz:o.z,R:o.R||6,y:o.y||8,gy:o.gy||0,w:o.w||0.7,a:o.a||0,fr:o.fr||3,ahead:o.ahead===undefined?2.5:o.ahead,state:'fly',t:0,pos:new V3(),fp:new V3(),on:o.on||null,path:o.path||null,name:o.name||'',lowK:0};
  W.geese.push(q);return q;}
function gooseGrab(q,h){q.state='dive';q.t=0;q.prey=h;q.from=q.pos.clone();SFX.miss();for(let i=0;i<3;i++)tone(rand(420,520),0.12,'square',0.14,rand(300,360),i*0.13);
  floatText(q.pos.clone().add(new V3(0,1,0)),'Га-га-га!','#ffffff');if(W.onGooseSee)W.onGooseSee(q,h);}
function updateGeese(dt){for(const q of W.geese){const en=!q.on||q.on();q.m.g.visible=en;q.cone.visible=q.foot.visible=en&&q.state==='fly';if(!en)continue;
    if(q.state==='fly'){q.a+=q.w*dt;let x,z,fx,fz;if(q.path){const p=q.path(q.a);x=p.x;z=p.z;fx=p.fx;fz=p.fz;}else{x=q.cx+Math.cos(q.a)*q.R;z=q.cz+Math.sin(q.a)*q.R;fx=-Math.sin(q.a)*Math.sign(q.w);fz=Math.cos(q.a)*Math.sign(q.w);}
      const y=q.y-q.lowK*3;q.pos.set(x,y,z);q.m.g.position.copy(q.pos);q.m.g.rotation.y=Math.atan2(fx,fz);q.m.body.rotation.z=-Math.sign(q.w)*0.25;
      q.fp.set(x+fx*q.ahead,q.gy,z+fz*q.ahead);const hgt=y-q.gy;q.cone.position.set((x+q.fp.x)/2,(y+q.gy)/2,(z+q.fp.z)/2);q.cone.scale.set(q.fr,hgt,q.fr);
      q.cone.quaternion.setFromUnitVectors(new V3(0,1,0),new V3(x-q.fp.x,hgt,z-q.fp.z).normalize());q.foot.position.set(q.fp.x,q.gy+0.07,q.fp.z);q.foot.scale.setScalar(q.fr);
      q.m.wings.forEach(w=>{w.wp.rotation.z=w.sd*Math.sin(G.time*6+q.a)*0.45;});
      if(!G.cine&&!(W.gooseCalm>0))for(const h of HEROES){if(!heroLight(h))continue;if(hd(h.pos,q.fp)<q.fr&&Math.abs(h.pos.y-q.gy)<3.2){gooseGrab(q,h);break;}}}
    else if(q.state==='dive'){q.t+=dt;const h=q.prey,k=Math.min(1,q.t/0.6);q.pos.lerpVectors(q.from,h.pos.clone().add(new V3(0,h.d.height+0.3,0)),smooth(k));q.m.g.position.copy(q.pos);
      q.m.wings.forEach(w=>{w.wp.rotation.z=w.sd*0.9;});if(k>=1){q.state='carry';q.t=0;const p=players[h.player],kk=p.heroes.indexOf(h);h.lit=false;burst(h.pos.clone().add(new V3(0,0.8,0)),0xffffff,14,4);
        placeOnGround(h,p.cp.x+(kk?1.2:-0.4),p.cp.z,p.cp.y);h.iT=1.2;h.following=false;floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Гусь к укрытию отнёс','#e8f4ff');
        if(h.active)tip(h.player,'Гусь увидит свет! Жди, пока отвернётся.',3.2);G.stats.geese=(G.stats.geese||0)+1;}}
    else{q.t+=dt;const k=Math.min(1,q.t/1.2);q.m.g.position.y=lerp(q.pos.y,q.y,k);if(k>=1)q.state='fly';}}
  if(W.gooseCalm>0)W.gooseCalm-=dt;}
/* ---------- шаг мира 3: свет, мостки, облака, барашки, гуси, яблони ---------- */
function updateLight(dt){if(W.world!==3&&!W.feat5)return;
  for(const t of W.tiles){const en=!t.on||t.on();const lit=en&&(t.beam?t.beam():litAt(t.x,t.y,t.z));const s=en&&(t.type==='light'?lit:!lit);if(s!==t.solid){t.solid=s;t.m.material=TILE_M[t.type][s?0:1];}t.m.visible=en;}
  updateClouds(dt);updateFlocks(dt);}
function updateW3(dt){if(W.world!==3&&!W.feat5)return;updateTrees(dt);updateGeese(dt);}
/* ---------- мороки Мира 3: тень, грозовая тучка, ворона ---------- */
// тень: плоская, как вырезанная из бумаги; в темноте удар проходит насквозь, в свете — объёмная; к краю круга оставленного со светом тянется сама
function tenFoe(x,z,o){const e=makeFoe('ten',x,z,Object.assign({leash:12},o||{}));e.flatK=1;e.home0=e.home.clone();e.darkGuard=()=>!e.litNow;e.guardAll=e.darkGuard;e.guardText='насквозь! Тень плоская — свет нужен';
  e.tick=(e,dt)=>{e.litNow=litAt(e.pos.x,e.pos.y+0.8,e.pos.z);let L=null,bd=12;
    if(!foeTarget(e))for(const h of HEROES){if(h.active||!heroLight(h))continue;const d=hd(h.pos,e.home0);if(d<bd&&Math.abs(h.pos.y-e.pos.y)<2){bd=d;L=h;}}
    if(L){const dx=e.pos.x-L.pos.x,dz=e.pos.z-L.pos.z,d=Math.hypot(dx,dz)||1;e.home.set(L.pos.x+dx/d*(LIGHT_R-0.9),e.home0.y,L.pos.z+dz/d*(LIGHT_R-0.9));}else e.home.copy(e.home0);};
  e.post=(e,dt)=>{e.flatK=damp(e.flatK,e.litNow?0:1,7,dt);e.body.scale.z*=lerp(1,0.1,e.flatK);e.L.mat.color.setHex(e.litNow?0x5a4a8a:0x1a1428);e.L.mat.emissiveIntensity=e.litNow?0.25:0.05;};
  return e;}
// грозовая тучка: темнеет, искрит — синяя капля-молния вниз; в свете светлеет и становится мягкой (бей)
function tuchaFoe(x,z,o){const e=makeFoe('tucha',x,z,Object.assign({leash:6},o||{}));e.darkGuard=()=>!e.litNow;e.guardAll=e.darkGuard;e.guardText='тучку во тьме не пробить — пером посвети!';
  e.tick=(e,dt)=>{e.litNow=litAt(e.pos.x,e.pos.y+2,e.pos.z,0.5);if(e.litNow&&e.state!=='broken'&&e.state!=='dying')e.open=Math.max(e.open,0.25);};
  e.post=(e,dt)=>{const w=e.state==='wind';e.L.cloud.position.y=2.1+Math.sin(G.time*1.6+e.home.x)*0.15;e.L.mat.color.setHex(e.litNow?0xe8e4f4:w?0x3a3850:0x6a6680);
    e.L.bolt.visible=w&&Math.sin(G.time*40)>0;e.L.mat.emissive.setHex(w?0x3a6aff:0x000000);e.L.mat.emissiveIntensity=w?0.4:0;};
  return e;}
// двусветный мотылёк: раскрывается, только когда оба героя горят пером рядом с ним; держится между двумя
function motylekFoe(x,z,o){const e=makeFoe('motylek',x,z,Object.assign({leash:7},o||{}));e.both=false;e.lp=[false,false];e.wasOpen=false;
  e.guardAll=()=>!e.both&&e.state!=='broken';e.darkGuard=()=>!e.both;e.guardText='свет обоих нужен разом!';
  e.tick=(e,dt)=>{const R=genPath()==='easy'?5:4,a=[active(0),active(1)];
    e.lp=a.map((h,i)=>heroLight(h)&&!players[i].downed&&hd(h.pos,e.pos)<R&&Math.abs(h.pos.y-e.pos.y)<3);e.both=e.lp[0]&&e.lp[1];
    if(e.both&&!e.wasOpen&&e.state!=='dying'){SFX.flower();floatText(e.pos.clone().add(new V3(0,1.9,0)),'Раскрылся!','#ffe08a');burst(e.pos.clone().add(new V3(0,1.1,0)),0xffe08a,10,2);}e.wasOpen=e.both;
    if(e.both&&e.state!=='broken'&&e.state!=='dying'&&e.state!=='spawn')e.open=Math.max(e.open,0.2);   // пока оба света держатся — удары проходят
    const nb=a.filter((h,i)=>!players[i].downed&&hd(h.pos,e.pos)<12&&Math.abs(h.pos.y-e.pos.y)<3);
    if(nb.length===2&&e.state==='idle'){e.spMul=0;const mx=(nb[0].pos.x+nb[1].pos.x)/2+Math.sin(G.time*1.3+e.home.x)*0.8,mz=(nb[0].pos.z+nb[1].pos.z)/2+Math.cos(G.time*1.7)*0.8,d=Math.hypot(mx-e.pos.x,mz-e.pos.z);
      if(d>0.3)mMove(e,(mx-e.pos.x)/d,(mz-e.pos.z)/d,e.def.sp*Math.min(1,d),dt);}else e.spMul=1;};   // порхает между двумя
  e.post=e=>{const L=e.L,op=e.both;L.wings.forEach(w=>{w.wp.rotation.z=w.s*(0.25+Math.sin(G.time*(op?4:12))*(op?0.15:0.55));});
    L.spots.forEach((m,i)=>{m.emissiveIntensity=e.lp[i]?1.3:0.12;});e.eyeMat.emissiveIntensity=op?1.4+0.4*Math.sin(G.time*10):1;};
  return e;}
// ворона-морок: чёрный ключ на нитке; красная хватка
function voronaFoe(x,z,o){const e=makeFoe('vorona',x,z,Object.assign({leash:9},o||{}));e.post=(e)=>{const fl=e.state==='spawn'||e.flying;e.L.wings.forEach(w=>{w.wp.rotation.z=w.sd*(fl?Math.sin(G.time*18)*0.8:0.15);});e.L.key.rotation.z=Math.sin(G.time*4)*0.3;};return e;}
// весточка помощника из Сказа 2 работает весь мир 3
function vestW3(){const v=W.vest;if(v==='sadko')W.ladBonus=0.03;}

/* ---------- жители Мира 3: Жар-птица, Сирин и Алконост, Соловей, печка, Яга в ступе, Летучий корабль ---------- */
function makeFirebird(o){o=o||{};const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);
  const gold=M(0xffb030,{emissive:0xff7010,emissiveIntensity:0.5}),red=M(0xff4a20,{emissive:0xc02000,emissiveIntensity:0.5}),dull=M(0x9a8a78),beak=M(0xffe070);
  const mats=[gold,red];const b=part(body,new THREE.SphereGeometry(0.55,14,12),gold,0,0.8,0);b.scale.set(0.85,0.95,1.2);
  const neck=part(body,new THREE.CylinderGeometry(0.14,0.2,0.7,8),gold,0,1.3,0.4);neck.rotation.x=0.5;
  const head=new THREE.Group();head.position.set(0,1.68,0.62);body.add(head);part(head,new THREE.SphereGeometry(0.22,12,10),gold,0,0,0);
  const bk=new THREE.ConeGeometry(0.07,0.26,6);bk.rotateX(Math.PI/2);part(head,bk,beak,0,-0.03,0.26);
  for(const s of[-1,1]){part(head,new THREE.SphereGeometry(0.05,8,6),M(0xffffff),s*0.12,0.05,0.13);part(head,new THREE.SphereGeometry(0.028,6,5),MAT.dark,s*0.13,0.05,0.17);}
  const crest=new THREE.Group();crest.position.y=0.18;head.add(crest);for(let i=0;i<5;i++){const c=part(crest,new THREE.ConeGeometry(0.04,0.35,5),red,(i-2)*0.06,0.14,-0.05-Math.abs(i-2)*0.03);c.rotation.x=-0.3;c.rotation.z=(i-2)*0.25;}
  const tail=[];const nT=o.bald?2:9;for(let i=0;i<nT;i++){const a=(i-(nT-1)/2)*(o.bald?0.3:0.18);const f=featherMesh(2.6);f.position.set(Math.sin(a)*0.25,0.7,-0.55);f.rotation.set(-2.2+Math.abs(a)*0.3,a,0);body.add(f);tail.push(f);if(o.bald)f.userData.mats.forEach(m=>{m.color.setHex(0xb08a60);m.emissiveIntensity=0.05;});}
  const wings=[];for(const s of[-1,1]){const wp=new THREE.Group();wp.position.set(s*0.42,1.0,0);body.add(wp);const wm=part(wp,new THREE.BoxGeometry(0.9,0.06,0.62),o.bald?dull:red,s*0.4,-0.05,-0.1);wm.rotation.z=-s*0.5;wings.push({wp,s});}
  for(const s of[-1,1])part(body,new THREE.CylinderGeometry(0.035,0.035,0.4,5),beak,s*0.18,0.2,0.05);
  if(o.bald){gold.color.setHex(0xc8a070);gold.emissiveIntensity=0.1;red.color.setHex(0xa0604a);red.emissiveIntensity=0.1;}
  const glow=new THREE.PointLight(0xffa040,o.bald?0.2:1.1,7,2);glow.position.y=1;g.add(glow);
  const F={g,body,head,crest,tail,wings,gold,red,glow,
    bloom(k){gold.color.lerpColors(new THREE.Color(0xc8a070),new THREE.Color(0xffb030),k);gold.emissiveIntensity=0.1+0.5*k;red.color.lerpColors(new THREE.Color(0xa0604a),new THREE.Color(0xff4a20),k);red.emissiveIntensity=0.1+0.4*k;glow.intensity=0.2+1.0*k;}};
  return F;}
// Сирин (печальная, тёмно-синяя) и Алконост (радостная, золотая): птицы с девичьими лицами
function makeSirin(kind){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);const al=kind==='alkonost';
  const plume=M(al?0xff9a30:0x4a4aa0,{emissive:al?0xa04000:0x1a1a50,emissiveIntensity:0.3}),dk=M(al?0xd05a1a:0x2a2a70),skin=M(0xf0d8c0),gold=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4});
  part(body,new THREE.SphereGeometry(0.55,14,12),plume,0,0.75,0).scale.set(0.9,1.05,1.1);
  const head=new THREE.Group();head.position.set(0,1.55,0.18);body.add(head);part(head,new THREE.SphereGeometry(0.26,14,12),skin,0,0,0);
  for(const s of[-1,1]){part(head,new THREE.SphereGeometry(0.035,6,5),MAT.dark,s*0.09,0.03,0.23);const br=part(head,new THREE.BoxGeometry(0.08,0.015,0.01),MAT.dark,s*0.09,0.1+(al?0.01:-0.005),0.235);br.rotation.z=s*(al?-0.25:0.3);}
  const mouth=part(head,new THREE.TorusGeometry(0.05,0.012,5,10,Math.PI),M(0xc04a4a),0,-0.09,0.23);mouth.rotation.z=al?Math.PI:0;
  part(head,new THREE.SphereGeometry(0.28,12,8,0,Math.PI*2,0,Math.PI*0.5),M(al?0x8a3a10:0x2a1a14),0,0.03,-0.03);   // волосы
  const kok=new THREE.Group();kok.position.set(0,0.2,0);head.add(kok);const kg=new THREE.CylinderGeometry(0.3,0.26,0.26,16,1,true,-1.3,2.6);part(kok,kg,gold,0,0.08,0).material.side=THREE.DoubleSide;
  for(let i=0;i<5;i++)part(kok,new THREE.SphereGeometry(0.035,6,5),M(al?0xff4040:0x80c0ff,{emissive:al?0xa02020:0x2060a0,emissiveIntensity:0.6}),Math.sin((i-2)*0.45)*0.29,0.12,Math.cos((i-2)*0.45)*0.29);
  const wings=[];for(const s of[-1,1]){const wp=new THREE.Group();wp.position.set(s*0.45,1.05,-0.05);body.add(wp);for(let k=0;k<3;k++){const f=part(wp,new THREE.BoxGeometry(0.34,0.05,0.9-k*0.18),k%2?dk:plume,s*(0.18+k*0.26),-0.1*k,-0.1);f.rotation.z=-s*0.35;}wings.push({wp,s});}
  for(let i=0;i<5;i++){const t=part(body,new THREE.BoxGeometry(0.12,0.04,1.0),i%2?dk:plume,(i-2)*0.1,0.5,-0.85);t.rotation.set(0.5,(i-2)*0.2,0);}
  for(const s of[-1,1])part(body,new THREE.CylinderGeometry(0.03,0.03,0.35,5),gold,s*0.16,0.1,0.05);
  return {g,body,head,wings,mouth};}
// Соловей-Разбойник: пёстрая грудь, щёки надуваются, посох; общий для босса и для праздника
function soloveiBody(inner){const brown=M(0x8a6a4a),dk=M(0x5a4030),chestM=M(0xc88a4a,{emissive:0x000000}),beakM=M(0xe0b060),skin=M(0xd8b890);
  part(inner,new THREE.SphereGeometry(1.0,16,12),brown,0,1.4,0).scale.set(1.05,1.15,0.95);
  const chest=new THREE.Group();chest.position.set(0,1.35,0.72);inner.add(chest);const cs=part(chest,new THREE.SphereGeometry(0.62,14,10),chestM,0,0,0);cs.scale.set(1,1.1,0.45);
  for(let i=0;i<9;i++)part(chest,new THREE.SphereGeometry(0.09,6,5),M([0xff5a3a,0x3ab0ff,0xffe040][i%3],{emissive:[0x802010,0x105080,0x807010][i%3],emissiveIntensity:0}),Math.cos(i*2.1)*0.35,Math.sin(i*1.7)*0.4,0.26);
  const head=new THREE.Group();head.position.set(0,2.75,0.1);inner.add(head);part(head,new THREE.SphereGeometry(0.62,14,12),brown,0,0,0);
  const cheeks=[];for(const s of[-1,1])cheeks.push(part(head,new THREE.SphereGeometry(0.28,12,10),skin,s*0.42,-0.14,0.36));
  const bg=new THREE.ConeGeometry(0.16,0.55,8);bg.rotateX(Math.PI/2);const beak=part(head,bg,beakM,0,-0.05,0.78);
  for(const s of[-1,1]){part(head,new THREE.SphereGeometry(0.07,8,6),M(0xffffff),s*0.2,0.14,0.52);part(head,new THREE.SphereGeometry(0.04,6,5),MAT.dark,s*0.2,0.14,0.58);const br=part(head,new THREE.BoxGeometry(0.2,0.05,0.05),dk,s*0.2,0.27,0.54);br.rotation.z=s*0.4;}
  const hat=part(head,new THREE.CylinderGeometry(0.35,0.5,0.4,12),M(0x3a2a4a),0,0.55,0);for(let i=0;i<3;i++){const f=part(head,new THREE.ConeGeometry(0.05,0.6,5),M([0xff5a3a,0x3ab0ff,0xffe040][i]),(i-1)*0.12,0.95,-0.1);f.rotation.z=(i-1)*0.3;}
  const bd=new THREE.ConeGeometry(0.35,0.7,8);bd.rotateX(Math.PI);part(head,bd,dk,0,-0.62,0.38);
  const wings=[];for(const s of[-1,1]){const wp=new THREE.Group();wp.position.set(s*0.95,1.9,0);inner.add(wp);const w=part(wp,new THREE.BoxGeometry(1.1,0.1,0.8),dk,s*0.45,-0.35,0);w.rotation.z=-s*1.0;wings.push({wp,s});}
  const staff=new THREE.Group();staff.position.set(1.1,1.2,0.3);inner.add(staff);part(staff,new THREE.CylinderGeometry(0.06,0.07,2.6,6),M(0x6a4a2a),0,0,0);part(staff,new THREE.SphereGeometry(0.16,8,6),M(0x4a3a2a),0,1.3,0);
  for(const s of[-1,1])part(inner,new THREE.CylinderGeometry(0.08,0.08,0.5,6),beakM,s*0.35,0.25,0.1);
  return {head,cheeks,beak,chest,chestM,wings,staff};}
function makeSolovei(){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);const L=soloveiBody(body);body.scale.setScalar(0.75);return Object.assign({g,body},L);}
// печка: белёная, с заслонкой-ртом и глазами; протягивает ржаной пирожок
function makePechka(){const g=new THREE.Group();W.group.add(g);const wh=M(0xf4efe4),red=M(0xc0302a),dk=M(0x2a1a14);
  addMesh(new THREE.BoxGeometry(2.6,1.9,2.4),wh,0,0.95,0,g);addMesh(new THREE.BoxGeometry(2.0,0.9,1.9),wh,0,2.35,-0.2,g);addMesh(new THREE.BoxGeometry(0.6,1.4,0.6),wh,0.6,3.4,-0.6,g);
  addMesh(new THREE.BoxGeometry(2.64,0.1,2.44),red,0,1.9,0,g);for(let i=0;i<5;i++)addMesh(new THREE.BoxGeometry(0.3,0.05,0.02),M([0x3a6ad0,0xc0302a,0x3f8a45][i%3]),-1+i*0.5,0.5,1.21,g);
  const mouth=addMesh(new THREE.BoxGeometry(1.2,0.8,0.1),dk,0,1.05,1.2,g);const door=new THREE.Group();door.position.set(-0.62,1.05,1.26);g.add(door);addMesh(new THREE.BoxGeometry(1.24,0.84,0.06),M(0x3a3a40),0.62,0,0,door);addMesh(new THREE.SphereGeometry(0.06,6,5),M(0x8a8a90),1.1,0,0.05,door);
  const eyes=[];for(const s of[-1,1]){addMesh(new THREE.SphereGeometry(0.16,10,8),M(0xffffff),s*0.5,1.62,1.2,g);eyes.push(addMesh(new THREE.SphereGeometry(0.08,8,6),dk,s*0.5,1.62,1.3,g));}
  const glow=addMesh(new THREE.BoxGeometry(1.0,0.5,0.05),MB(0xff8a3a,{transparent:true,opacity:0.8}),0,0.95,1.22,g);
  const pie=new THREE.Group();pie.position.set(0,1.5,1.6);g.add(pie);const pm=addMesh(new THREE.SphereGeometry(0.22,12,8),M(0xb0702a,{emissive:0x603010,emissiveIntensity:0.3}),0,0,0,pie);pm.scale.set(1.3,0.55,0.9);
  addMesh(new THREE.BoxGeometry(0.9,0.04,0.3),M(0x9a6a3a),0,-0.12,0,pie);pie.visible=false;
  return {g,door,eyes,glow,pie,mouth};}
// Баба Яга в ступе, с метлой
function makeStupa(){const y=makeYaga();const g=new THREE.Group();W.group.add(g);g.add(y.g);y.g.position.set(0,0.45,0);
  const st=new THREE.Group();g.add(st);const wood=M(0x7a5634);const lg=new THREE.CylinderGeometry(0.62,0.45,1.3,14,1,true);const s=new THREE.Mesh(lg,new THREE.MeshLambertMaterial({color:0x7a5634,side:THREE.DoubleSide}));s.position.y=0.65;s.castShadow=true;st.add(s);
  part(st,new THREE.TorusGeometry(0.62,0.06,6,18),M(0x5a3a1a),0,1.3,0).rotation.x=Math.PI/2;part(st,new THREE.CylinderGeometry(0.45,0.4,0.12,14),wood,0,0.06,0);
  const broom=new THREE.Group();broom.position.set(0.55,1.4,0.1);g.add(broom);part(broom,new THREE.CylinderGeometry(0.03,0.03,1.8,5),M(0x8a6a3a),0,0,0);const bb=part(broom,new THREE.ConeGeometry(0.2,0.6,8),M(0xc8a860),0,-1.1,0);bb.rotation.x=Math.PI;
  return {g,yaga:y,stupa:st,broom};}
// Летучий корабль: деревянный, с крыльями вместо вёсел; паруса из солнечного света
function makeShip(){const g=new THREE.Group();W.group.add(g);const hull=new THREE.Group();g.add(hull);const wood=M(0x9a6a3a),dk=M(0x5a3a1a),light=M(0x8a6a4a);
  addMesh(new THREE.BoxGeometry(4.6,1.1,12),wood,0,-0.55,0,hull);addMesh(new THREE.BoxGeometry(3.4,0.8,10.6),dk,0,-1.45,0,hull);
  const bow=new THREE.CylinderGeometry(0.02,2.3,2.6,4,1);bow.rotateX(Math.PI/2);bow.rotateZ(Math.PI/4);bow.scale(1,0.45,1);addMesh(bow,wood,0,-0.7,-7.2,hull);
  const st=new THREE.CylinderGeometry(0.02,2.3,1.6,4,1);st.rotateX(-Math.PI/2);st.rotateZ(Math.PI/4);st.scale(1,0.45,1);addMesh(st,wood,0,-0.7,6.7,hull);
  addMesh(new THREE.BoxGeometry(4.5,0.08,11.8),light,0,0.01,0,hull);for(let i=0;i<12;i++)addMesh(new THREE.BoxGeometry(4.4,0.02,0.04),dk,0,0.06,-5.5+i,hull);
  const neckG=new THREE.CylinderGeometry(0.18,0.28,1.8,8);const neck=addMesh(neckG,wood,0,0.6,-7.9,hull);neck.rotation.x=0.6;addMesh(new THREE.SphereGeometry(0.34,10,8),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4}),0,1.4,-8.4,hull);  // конская голова на носу
  const mast=addMesh(new THREE.CylinderGeometry(0.16,0.2,7,10),dk,0,3.5,-0.5,hull);const yard=addMesh(new THREE.CylinderGeometry(0.08,0.08,4.2,6),dk,0,6.2,-0.5,hull);yard.rotation.z=Math.PI/2;
  const sailMat=M(0xfff0c0,{emissive:0xffb040,emissiveIntensity:0,transparent:true,opacity:0.9,side:THREE.DoubleSide});const sail=new THREE.Mesh(new THREE.PlaneGeometry(3.9,4.2,6,6),sailMat);sail.position.set(0,4.0,-0.35);hull.add(sail);
  const lantern=new THREE.Group();lantern.position.set(0,1.6,0.05);hull.add(lantern);const lanM=M(0xfff0c0,{emissive:0xffa040,emissiveIntensity:0.1,transparent:true,opacity:0.75});
  addMesh(new THREE.BoxGeometry(0.36,0.5,0.36),lanM,0,0,0,lantern);addMesh(new THREE.ConeGeometry(0.3,0.2,4),dk,0,0.35,0,lantern).rotation.y=Math.PI/4;addMesh(new THREE.BoxGeometry(0.4,0.04,0.4),dk,0,-0.27,0,lantern);
  const wings=[];for(const s of[-1,1])for(let k=0;k<3;k++){const wp=new THREE.Group();wp.position.set(s*2.3,-0.5,-3+k*3);hull.add(wp);
    for(let i=0;i<4;i++){const f=addMesh(new THREE.BoxGeometry(1.6-i*0.25,0.05,0.5),M(i%2?0xf4f0ff:0xd8d0f0),s*(0.8+i*0.3),0,-0.2+i*0.1,wp);f.rotation.y=s*0.12*i;}wings.push({wp,s,k});}
  const rails=[];for(const s of[-1,1]){for(const[z0,z1]of[[-5.6,-1.6],[1.6,5.6]]){addMesh(new THREE.BoxGeometry(0.12,0.55,z1-z0),dk,s*2.24,0.3,(z0+z1)/2,hull);}}
  return {g,hull,sail,sailMat,lantern,lanM,wings,mast};}
// гнездо: кольцо из прутьев
function nestMesh(x,y,z,r,parent){const g=new THREE.Group();g.position.set(x,y,z);(parent||W.group).add(g);const tw=M(0x8a6a40),tw2=M(0x6a4a2a);
  for(let i=0;i<5;i++){const t=addMesh(new THREE.TorusGeometry(r-i*0.06,0.13,6,24),i%2?tw:tw2,0,0.12+i*0.09,0,g);t.rotation.x=Math.PI/2+rand(-0.08,0.08);t.rotation.y=rand(0,3);}
  addMesh(new THREE.CylinderGeometry(r*0.9,r*0.6,0.3,16),tw2,0,0.05,0,g);return g;}
// ключ на нитке (у ворон, у гуся): чёрный ключ Кощея
function blackKey(s){const g=new THREE.Group();const km=M(0x1a1a20,{emissive:0x10301a,emissiveIntensity:0.4});part(g,new THREE.TorusGeometry(0.07,0.022,5,12),km,0,0,0);part(g,new THREE.BoxGeometry(0.03,0.22,0.03),km,0,-0.16,0);part(g,new THREE.BoxGeometry(0.07,0.03,0.03),km,0.03,-0.24,0);g.scale.setScalar(s||1);return g;}

