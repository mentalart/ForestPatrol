/* ============================== РЕЛИЗ final06 · 2-1: ТИШЕ БОЙ НА СРЕДНЕМ, ГЛАЗА ВОДЯНОГО, РИФ ПО КРАЮ, КУПОЛА КИТЕЖА ВДАЛИ ============================== */
// По разбору мира 2 (выбранные правки c05, c23, c22, c33):
//  1) Средний путь в 2-1: у игрока не больше двух стрелков сразу (в замахе и капель в полёте) — как Лёгкий путь в late_76_kids_fight.
//  2) Край плиты уровня (x = ±11) — не обрыв в пустоту, а риф: камни и кораллы вдоль обеих стен. Один InstancedMesh на камни и один на кораллы.
//  3) Вдали за рифом — большие тёмные силуэты храмов Китежа: город больше, чем видно с улицы.
//  4) Водяной подглядывает: в тёмной воде за рифом три пары жёлтых глаз; моргают, гаснут, когда герой подходит ближе (завязка 2-Б).
// Механику уровня (вода, задачи, коллизии) модуль не меняет: всё новое стоит за стенами уровня.
const K21C={shoot:2,eyes:[]};
{const _cw=canWind;canWind=function(e,h){if(!_cw(e,h))return false;
  if(!e.def||!e.def.ranged||!LEVELS[G.levelIdx]||LEVELS[G.levelIdx].id!=='2-1')return true;
  const p=players[h.player];if(!p||p.path!=='mid')return true;
  let n=W.bolts.filter(b=>!b.refl&&b.tgt===h).length;
  for(const o of W.enemies)if(o!==e&&o.alive&&o.def&&o.def.ranged&&(o.state==='wind'||o.state==='ready')&&o.tgt&&o.tgt.player===h.player)n++;
  return n<K21C.shoot;};}
function k21Reef(zmin,zmax){const q=new THREE.Object3D(),rocks=[],corals=[];
  for(const sd of[-1,1])for(let z=zmax;z>zmin;z-=rand(1.8,2.8)){
    rocks.push([sd*rand(11.7,13.4),rand(-0.5,0.1),z,rand(0.8,1.9),rand(0.6,1.3)]);
    if(Math.random()<0.45)rocks.push([sd*rand(13.6,15.5),rand(-0.3,0.4),z+rand(-1,1),rand(1.4,2.6),rand(0.7,1.5)]);
    if(Math.random()<0.5)corals.push([sd*rand(11.6,13),0,z+rand(-1,1),rand(0.5,1.2)]);}
  const rm=new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1,0),M(0x5a6a66),rocks.length);
  rocks.forEach((r,i)=>{q.position.set(r[0],r[1],r[2]);q.rotation.set(rand(0,3),rand(0,3),rand(0,3));q.scale.set(r[3],r[3]*r[4],r[3]);q.updateMatrix();rm.setMatrixAt(i,q.matrix);});
  const cm=new THREE.InstancedMesh(new THREE.ConeGeometry(0.22,1,5),M(0xffffff,{emissive:0x401020,emissiveIntensity:0.25}),corals.length*3);
  const pal=[0xff8a7a,0xffb04a,0xe86ab0,0xff6a5a].map(c=>new THREE.Color(c));let k=0;
  for(const c of corals){const col=pal[(Math.random()*pal.length)|0];for(let j=0;j<3;j++){const h=c[3]*rand(0.7,1.3);
    q.position.set(c[0]+rand(-0.35,0.35),h/2,c[2]+rand(-0.35,0.35));q.rotation.set(rand(-0.3,0.3),0,rand(-0.3,0.3));q.scale.set(1,h,1);q.updateMatrix();cm.setMatrixAt(k,q.matrix);cm.setColorAt(k,col);k++;}}
  for(const m of[rm,cm]){m.userData.noBatch=true;m.instanceMatrix.needsUpdate=true;W.group.add(m);}
  if(cm.instanceColor)cm.instanceColor.needsUpdate=true;}
// силуэт храма: сруб, барабан, луковица, шпиль с крестом — тёмный, туманом не гасится, полупрозрачный
function k21Temple(x,z,s,mat){const g=new THREE.Group();g.position.set(x,-1,z);g.scale.setScalar(s);g.rotation.y=rand(-0.4,0.4);W.group.add(g);
  addMesh(new THREE.BoxGeometry(3,4,3),mat,0,2,0,g);addMesh(new THREE.CylinderGeometry(0.9,0.9,1.6,10),mat,0,4.8,0,g);
  const on=addMesh(new THREE.SphereGeometry(1.1,12,8),mat,0,6.2,0,g);on.scale.set(1,1.25,1);addMesh(new THREE.ConeGeometry(0.4,1.2,8),mat,0,7.7,0,g);
  addMesh(new THREE.BoxGeometry(0.08,1,0.08),mat,0,8.7,0,g);addMesh(new THREE.BoxGeometry(0.5,0.08,0.08),mat,0,8.8,0,g);
  for(const sd of[-1,1]){addMesh(new THREE.CylinderGeometry(0.45,0.45,0.9,8),mat,sd*1.1,4.3,1.1,g);const o2=addMesh(new THREE.SphereGeometry(0.55,10,7),mat,sd*1.1,5.1,1.1,g);o2.scale.y=1.3;}
  return g;}
function k21Skyline(zmin,zmax){const mat=MB(0x183848,{fog:false,transparent:true,opacity:0.42,depthWrite:false});
  for(let z=zmax-10;z>zmin;z-=rand(34,46))for(const sd of[-1,1])k21Temple(sd*rand(34,48),z+rand(-8,8),rand(2.6,4.2),mat);
  for(let i=0;i<5;i++)k21Temple(rand(-30,30),zmin-rand(40,60),rand(3.2,5),mat);}
// глаза Водяного: две жёлтые точки и тусклое «зеркало» воды вокруг; моргание и уход, когда герой рядом
function k21Eyes(x,y,z){const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=x>0?-Math.PI/2:Math.PI/2;W.group.add(g);
  const em=MB(0xffe04a,{transparent:true,opacity:0,fog:false,depthWrite:false}),pu=MB(0x10200a,{transparent:true,opacity:0,fog:false,depthWrite:false});
  const eyes=[-0.32,0.32].map(dx=>{const e=new THREE.Mesh(new THREE.SphereGeometry(0.16,10,8),em);e.scale.set(1.3,0.8,0.4);e.position.set(dx,0,0);g.add(e);
    const p=new THREE.Mesh(new THREE.SphereGeometry(0.06,8,6),pu);p.scale.set(0.5,1.2,0.5);p.position.set(dx,0,0.06);g.add(p);return e;});
  g.traverse(c=>{c.userData.noBatch=true;});
  return {g,em,pu,eyes,vis:0,blink:rand(2,5),bt:0,away:0};}
function k21Calm(){K21C.eyes=[];
  k21Reef(-358,8);k21Skyline(-360,8);
  for(const[x,y,z]of[[-16.4,1.4,-40],[16.4,2.2,-150],[-16.4,1.8,-262]])K21C.eyes.push(k21Eyes(x,y,z));
  W.updates.push(dt=>vodEyesTick(K21C.eyes,dt));}
// общий шаг глаз Водяного (2-1, 2-3, 2-4): видны, когда герой в 7…32 м по z; подошёл ближе — нырнул на 4 с; моргают
function vodEyesTick(list,dt){for(const E of list){let near=99;for(const pi of[0,1]){const h=active(pi);if(h)near=Math.min(near,Math.abs(h.pos.z-E.g.position.z));}
    if(near<7)E.away=4;E.away=Math.max(0,E.away-dt);
    const want=near<32&&E.away<=0?1:0;E.vis=damp(E.vis,want,want?0.8:5,dt);
    E.bt-=dt;if(E.bt<=0){E.blink-=dt;if(E.blink<=0){E.bt=0.16;E.blink=rand(2.5,6);}}
    const open=E.bt>0?0.12:1;for(const e of E.eyes)e.scale.y=0.8*open;
    E.em.opacity=E.vis*(0.75+0.25*Math.sin(G.time*1.3));E.pu.opacity=E.vis;E.g.position.y+=Math.sin(G.time*0.7+E.g.position.z)*0.002;}}
FIN.k21Calm=K21C;
{const _b=build21;build21=function(){_b();try{k21Calm();}catch(err){console.error('k21 calm',err);}};}
