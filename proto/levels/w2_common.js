/* ============================== МИР 2 · ПОДВОДНЫЙ КИТЕЖ: гусли Садко, вода участков, всплывающее ============================== */
// RB — гусли: вода на участке, где стоит герой, меняется прилив ↔ отлив за 2 секунды, и всё это время герой идёт.
// Участок — кусок улицы с раковиной-отметкой; границы — бордюр из ракушек. В приливе лёгкое всплывает, в отливе ложится и открывается дно.
const SHELL_GEO=new THREE.SphereGeometry(0.16,8,5,0,Math.PI*2,0,Math.PI/2);
function waterZone(minx,maxx,minz,maxz,low,high,o){o=o||{};const st=o.start||'low';
  const z={water:true,minx,maxx,minz,maxz,low,high,floor:o.floor!==undefined?o.floor:low,level:st==='high'?high:low,state:st,from:0,to:0,t:1,dur:o.dur||2,shared:!!o.shared,req:null,
    floaters:[],lock:o.lock||null,onChange:o.onChange||null,name:o.name||'',noGusli:!!o.noGusli,ripT:0};
  const mat=M(o.color||W.waterCol||0x3fb8c8,{transparent:true,opacity:o.op||W.waterOp||0.3,depthWrite:false,emissive:0x0a5a68,emissiveIntensity:0.45});
  z.box=new THREE.Mesh(new THREE.BoxGeometry(maxx-minx,1,maxz-minz),mat);z.box.position.set((minx+maxx)/2,0,(minz+maxz)/2);z.box.renderOrder=3;W.group.add(z.box);
  z.topMat=M(0x9aeef6,{transparent:true,opacity:0.5,depthWrite:false,emissive:0x2ab0c0,emissiveIntensity:0.55,side:THREE.DoubleSide});
  z.top=new THREE.Mesh(new THREE.PlaneGeometry(maxx-minx,maxz-minz),z.topMat);z.top.rotation.x=-Math.PI/2;z.top.position.set((minx+maxx)/2,0,(minz+maxz)/2);z.top.renderOrder=4;W.group.add(z.top);
  // бордюр из ракушек по краю участка
  if(o.curb!==false){const pts=[],cy=o.curbY!==undefined?o.curbY:Math.max(z.floor,0);const edge=(x0,z0,x1,z1)=>{const L=Math.hypot(x1-x0,z1-z0),n=Math.max(1,Math.round(L/0.7));for(let i=0;i<=n;i++)pts.push([lerp(x0,x1,i/n),lerp(z0,z1,i/n)]);};
    edge(minx,minz,maxx,minz);edge(minx,maxz,maxx,maxz);edge(minx,minz,minx,maxz);edge(maxx,minz,maxx,maxz);
    const im=new THREE.InstancedMesh(SHELL_GEO,M(0xffffff),pts.length),mm=new THREE.Matrix4(),q=new THREE.Quaternion(),cc=new THREE.Color();
    pts.forEach(([x,zz],i)=>{q.setFromAxisAngle(new V3(0,1,0),rand(0,6.28));mm.compose(new V3(x,cy+0.01,zz),q,new V3(1,0.7,1.3));im.setMatrixAt(i,mm);cc.setHSL(rand(0.02,0.1),0.45,rand(0.72,0.86));im.setColorAt(i,cc);});
    im.receiveShadow=true;W.group.add(im);}
  if(o.shell!==false){const s=o.shell||{};z.shell=makeShell(s.x!==undefined?s.x:(minx+maxx)/2,s.z!==undefined?s.z:maxz-0.4,s.y!==undefined?s.y:Math.max(0,z.floor),z,s.ry||0);}
  W.waters.push(z);drawWater(z);return z;}
function drawWater(z){const h=z.level-z.floor;const on=h>0.03;z.box.visible=z.top.visible=on;z.box.scale.y=Math.max(0.01,h);z.box.position.y=z.floor+h/2;z.top.position.y=z.level+0.01;
  z.topMat.opacity=0.42+0.12*Math.sin(G.time*2.2+z.minx);}
function gusliMesh(parent,mat,s){const g=new THREE.Group();parent.add(g);g.scale.setScalar(s||1);
  const sh=new THREE.Shape();sh.moveTo(-0.34,-0.22);sh.lineTo(0.34,-0.22);sh.lineTo(0.2,0.22);sh.lineTo(-0.2,0.22);sh.lineTo(-0.34,-0.22);
  const body=new THREE.Mesh(new THREE.ExtrudeGeometry(sh,{depth:0.06,bevelEnabled:false}),mat);body.position.z=-0.03;g.add(body);
  const strM=MB(0xfff4c8);for(let i=0;i<5;i++){const x0=-0.26+i*0.13,x1=-0.15+i*0.075;const len=Math.hypot(x1-x0,0.4);const st=new THREE.Mesh(new THREE.BoxGeometry(0.012,len,0.012),strM);st.position.set((x0+x1)/2,0,0.045);st.rotation.z=-Math.atan2(x1-x0,0.4);g.add(st);}
  return g;}
function makeShell(x,zz,y,zone,ry){const g=new THREE.Group();g.position.set(x,y,zz);g.rotation.y=ry||0;W.group.add(g);
  addMesh(new THREE.CylinderGeometry(0.07,0.09,1.5,6),M(0xd8c8a8),0,0.75,0,g);
  const sm=M(0xf4d8c8,{emissive:0x6a4a3a,emissiveIntensity:0.2});const fan=new THREE.Group();fan.position.set(0,1.78,0);g.add(fan);
  for(let i=0;i<7;i++){const a=(i-3)*0.26;const r=addMesh(new THREE.BoxGeometry(0.14,0.62,0.07),sm,Math.sin(a)*0.28,Math.cos(a)*0.28-0.05,0,fan);r.rotation.z=-a;}
  addMesh(new THREE.BoxGeometry(0.32,0.14,0.1),sm,0,-0.16,0,fan);
  addMesh(new THREE.BoxGeometry(0.05,1.2,0.05),M(0x5a4a3a),0.55,1.45,0,g);
  const boat=new THREE.Group();g.add(boat);addMesh(new THREE.BoxGeometry(0.36,0.1,0.15),M(0xc8843a),0,0,0,boat);addMesh(new THREE.BoxGeometry(0.02,0.22,0.02),M(0xf4ecd8),0,0.12,0,boat);
  addMesh(new THREE.BoxGeometry(0.14,0.14,0.01),M(0xf4ecd8),0.05,0.16,0,boat);boat.position.set(0.55,0.95,0.08);
  const gm=M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.2});const gus=gusliMesh(g,gm,0.55);gus.position.set(-0.52,1.35,0.05);
  return {g,fan,boat,gm,sm,zone};}
function inZone(z,h,m){return h.pos.x>z.minx-m&&h.pos.x<z.maxx+m&&h.pos.z>z.minz-m&&h.pos.z<z.maxz+m&&h.pos.y>z.floor-4&&h.pos.y<z.high+3;}
function zoneAt(h){let best=null,bd=1e9;for(const z of W.waters){if(z.noGusli||!inZone(z,h,1.3))continue;const cx=clamp(h.pos.x,z.minx,z.maxx),cz=clamp(h.pos.z,z.minz,z.maxz);
    const d=Math.hypot(h.pos.x-cx,h.pos.z-cz)+(h.pos.y<z.floor-0.5?2:0);if(d<bd){bd=d;best=z;}}return best;}
function setWater(z,st,pi){if(z.state===st&&z.t>=1)return false;z.from=z.level;z.to=st==='high'?z.high:z.low;z.t=0;z.state=st;SFX.wave();
  for(let i=0;i<8;i++)burst(new V3(rand(z.minx,z.maxx),z.level+0.2,rand(z.minz,z.maxz)),0xcff8ff,3,2,0.6);
  if(z.onChange)z.onChange(z,st,pi);if(W.onWater)W.onWater(z,st,pi);return true;}
function requestWater(z,pi,want){const h=active(pi);
  if(z.req){if(z.req.pi!==pi){z.req.t=Math.max(z.req.t,2);SFX.ok();floatText(h.pos.clone().add(new V3(0,h.d.height+0.7,0)),'Давай!',PCSS[pi]);}return;}
  z.req={pi,want,t:0};SFX.call();floatText(h.pos.clone().add(new V3(0,h.d.height+0.7,0)),want==='high'?'Прошу прилив!':'Прошу отлив!',PCSS[pi]);
  if(!G.flags.reqTold){G.flags.reqTold=true;tip(1-pi,'Друг '+(want==='high'?'прилив':'отлив')+' просит. Через две секунды вода сменится сама.<br>Хочешь быстрей — сыграй и ты '+K(1-pi,'item')+', вот и вся недолга.',4);}}
function playGusli(pi){const p=players[pi],h=active(pi);if(p.downed||h.hang||h.cling)return;
  if(!W.abil.gusli){if(p.lockedTip<=0){p.lockedTip=4;tip(pi,W.gusliLocked||'Гусли Садко подарит — на площади у фонтана.',2.4);}return;}
  if((p.gusCd||0)>0)return;p.gusCd=0.7;
  const z=zoneAt(h),want=z?(z.state==='high'?'low':'high'):null;gusliFx(h,want);
  if(!z){floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Тут вода не слушается — встань на участок с раковиной','#9fe6ff');return;}
  if(z.lock){const why=z.lock(pi,h,want);if(why){floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),why,'#9fe6ff');SFX.miss();return;}}
  if(z.shared){requestWater(z,pi,want);return;}
  setWater(z,want,pi);floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),want==='high'?'Прилив!':'Отлив!','#9fe6ff');}
function gusliFx(h,want){h.gusT=0.75;h.atkT=0.28;SFX.swish();ringFx(h.pos,0x7ad8ff,5);later(0.12,()=>ringFx(h.pos,0xcff8ff,3.2));
  const up=want!=='low',notes=up?[67,71,74,79]:[79,74,71,67];notes.forEach((m,i)=>gusli(m,i*0.085,0.15));tone(mf(up?55:62),0.6,'sine',0.14);
  floatText(h.pos.clone().add(new V3(rand(-0.3,0.3),h.d.height+0.3,0)),'♪','#cff8ff');}
function updateWaters(dt){if(!W.waters.length)return;
  for(const z of W.waters){
    if(z.t<1){z.t=Math.min(1,z.t+dt/z.dur);z.level=lerp(z.from,z.to,smooth(z.t));}
    // просьба на общей раковине: значок и 2 секунды; вода не меняется, пока чей-то герой в прыжке над участком (второй закон дивана)
    if(z.req){const busy=HEROES.some(h=>!h.cling&&inZone(z,h,0.2)&&!h.grounded&&h.vel.y>-20);z.req.busy=busy;if(z.req.t<2)z.req.t+=dt;if(z.req.t>=2&&!busy){const r=z.req;z.req=null;setWater(z,r.want,r.pi);}}
    drawWater(z);
    for(const f of z.floaters){const wl=z.level-f.draft,b=Math.max(f.rest,wl);f.col.miny=b;f.col.maxy=b+f.h;f.g.position.y=b+(wl>f.rest+0.05?Math.sin(G.time*1.6+f.bob)*0.035:0);f.g.rotation.z=wl>f.rest+0.05?Math.sin(G.time*1.1+f.bob)*0.03:0;}
    if(z.shell){const S=z.shell,k=(z.level-z.low)/Math.max(0.01,z.high-z.low);S.boat.position.y=0.95+k*1.0;S.boat.rotation.z=Math.sin(G.time*2)*0.1*k;
      const near=HEROES.some(h=>h.active&&inZone(z,h,1.3));S.gm.emissiveIntensity=near?0.5+0.5*Math.sin(G.time*7):0.15;S.sm.emissiveIntensity=z.t<1||z.req?0.5+0.4*Math.sin(G.time*12):0.2;S.fan.rotation.z=z.req?Math.sin(G.time*14)*0.08:0;}
    // рябь за плывущими
    z.ripT-=dt;if(z.ripT<=0){z.ripT=0.4;for(const h of HEROES)if(h.groundRef===z&&Math.hypot(h.vel.x,h.vel.z)>0.8)ringFx(new V3(h.pos.x,z.level-0.1,h.pos.z),0xcff8ff,1.1);}}
  // кто оказался глубоко под гладью (упал в подвал, а вода пришла) — всплывает
  for(const h of HEROES){if(h.cling)continue;for(const z of W.waters){if(z.level<=z.floor+0.05)continue;if(h.pos.x<z.minx||h.pos.x>z.maxx||h.pos.z<z.minz||h.pos.z>z.maxz)continue;
    if(h.pos.y<z.level-1.4&&h.pos.y>z.floor-5){h.vel.y=Math.max(h.vel.y,6.5);h.grounded=false;h.groundRef=null;}}}}
// всплывающее: лодка, бочка, доска — в приливе поднимается вместе с водой, в отливе ложится на дно
function floater(zone,minx,maxx,minz,maxz,h,o){o=o||{};const rest=o.rest!==undefined?o.rest:zone.floor,draft=o.draft!==undefined?o.draft:h*0.5;
  const col=colBox(minx,maxx,rest,rest+h,minz,maxz,false);const g=new THREE.Group();g.position.set((minx+maxx)/2,rest,(minz+maxz)/2);W.group.add(g);
  (o.build||boatMesh)(g,maxx-minx,h,maxz-minz);const f={zone,col,g,rest,draft,h,bob:rand(0,6)};zone.floaters.push(f);return f;}
function boatMesh(g,w,h,l){const along=l>=w,L=along?l:w,Wd=along?w:l;const hull=new THREE.Group();if(!along)hull.rotation.y=Math.PI/2;g.add(hull);
  const wood=M(0x9a5a2a),dk=M(0x5a3214);addMesh(new THREE.BoxGeometry(Wd,h*0.8,L-0.6),wood,0,h*0.4,0,hull);
  const bow=new THREE.CylinderGeometry(0.02,Wd*0.5,0.9,4,1);bow.rotateX(Math.PI/2);bow.rotateZ(Math.PI/4);bow.scale(1,h*1.2,1);for(const sd of[-1,1]){const m=addMesh(bow,wood,0,h*0.45,sd*(L/2-0.2),hull);m.rotation.y=sd<0?Math.PI:0;}
  addMesh(new THREE.BoxGeometry(Wd+0.08,0.1,L-0.5),dk,0,h*0.8+0.05,0,hull);for(let i=0;i<2;i++)addMesh(new THREE.BoxGeometry(Wd-0.1,0.08,0.3),M(0xc8a070),0,h*0.82,-L*0.2+i*L*0.4,hull);
  addMesh(new THREE.CylinderGeometry(0.03,0.03,0.2,5),dk,Wd*0.45,h*0.9,0,hull);}
function boardMesh(g,w,h,l){addMesh(new THREE.BoxGeometry(w,h,l),M(0xb08050),0,h/2,0,g);for(let i=0;i<Math.max(2,Math.round(l/0.4));i++)addMesh(new THREE.BoxGeometry(w+0.02,0.02,0.04),M(0x6a4a2a),0,h+0.01,-l/2+0.2+i*0.4,g);}
function barrelMesh(g,w,h,l){const r=Math.min(w,l)*0.48;addMesh(new THREE.CylinderGeometry(r,r,h,12),M(0x9a6a3a),0,h/2,0,g);for(const y of[0.15,0.85])addMesh(new THREE.TorusGeometry(r+0.01,0.03,5,16),M(0x4a4a50),0,h*y,0,g).rotation.x=Math.PI/2;}
// предмет, который прилив поднимает вместе с водой
function floatItem(it,zone,off){it.fz=zone;it.rest=it.base;it.foff=off||0.35;return it;}
// сундук: открывается, когда герой подходит; внутри звено или орешек
function chest(x,y,z,o){o=o||{};const g=new THREE.Group();g.position.set(x,y,z);g.rotation.y=o.ry||0;W.group.add(g);
  const wood=M(0x8a5a2a),band=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4});
  addMesh(new THREE.BoxGeometry(1.0,0.55,0.7),wood,0,0.28,0,g);const lid=new THREE.Group();lid.position.set(0,0.55,-0.35);g.add(lid);addMesh(new THREE.BoxGeometry(1.0,0.22,0.7),wood,0,0.11,0.35,lid);
  for(const bx of[-0.35,0.35]){addMesh(new THREE.BoxGeometry(0.08,0.58,0.74),band,bx,0.29,0,g);addMesh(new THREE.BoxGeometry(0.08,0.24,0.74),band,bx,0.11,0.35,lid);}
  addMesh(new THREE.BoxGeometry(0.16,0.18,0.06),band,0,0.5,0.37,g);
  const it=o.kind==='nut'?nutItem(x,y+0.9,z):linkItem(x,y+0.9,z);it.locked=true;it.g.visible=false;
  const c={g,lid,pos:new V3(x,y,z),open:false,it,onOpen:o.onOpen||null};W.chests.push(c);return c;}
function updateChests(dt){for(const c of W.chests){if(c.open||c.lock)continue;for(const h of HEROES){if(h.cling||(h.active&&players[h.player].downed))continue;if(hd(h.pos,c.pos)<1.35&&Math.abs(h.pos.y-c.pos.y)<1.0){c.open=true;
    SFX.latch();anim(0.5,k=>{c.lid.rotation.x=-1.9*smooth(k);});burst(c.pos.clone().add(new V3(0,0.8,0)),COL.gold,16,4);const it=c.it;
    later(0.3,()=>{it.locked=false;it.g.visible=true;const b=it.base;anim(0.5,k=>{it.base=c.pos.y+0.7+Math.sin(k*Math.PI)*0.6;});later(0.55,()=>{it.base=c.pos.y+0.9;takeItem(it,h);});});
    floatText(c.pos.clone().add(new V3(0,1.4,0)),'Сундук!','#ffe08a');if(c.onOpen)c.onOpen(h);break;}}}}
// визуал героя в Мире 2: пузырь воздуха вокруг (идём по дну, как в стеклянном шаре), гусли в лапах
function heroW2(h,dt){
  if(W.bubbles&&!h.bub){const m=new THREE.Mesh(new THREE.SphereGeometry(1,18,14),MB(0xd8f6ff,{transparent:true,opacity:0.12,depthWrite:false}));m.renderOrder=5;h.g.add(m);
    const hl=new THREE.Mesh(new THREE.SphereGeometry(0.12,8,6),MB(0xffffff,{transparent:true,opacity:0.5,depthWrite:false}));hl.position.set(-0.45,0.55,0.55);m.add(hl);h.bub=m;}
  if(h.bub){const on=!!W.bubbles&&!G.cineNoBub;h.bub.visible=on;if(on){const r=Math.max(0.75,h.d.height*0.72+0.25);const sw=h.grounded&&h.groundRef&&h.groundRef.water;h.bub.scale.set(r*(1+0.03*Math.sin(G.time*3+h.d.speed)),r,r);h.bub.position.y=h.d.height*0.52-(sw?h.d.height*0.38:0);}}
  if(h.gusT>0&&!h.gusP){const g=new THREE.Group();gusliMesh(g,M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.6}),0.9);g.position.set(0,h.d.height*0.55,h.d.radius+0.3);g.rotation.x=-0.5;h.g.add(g);h.gusP=g;}
  if(h.gusP){h.gusP.visible=h.gusT>0;if(h.gusT>0){h.gusP.rotation.z=Math.sin(G.time*30)*0.06;h.gusP.position.y=h.d.height*0.55-(h.grounded&&h.groundRef&&h.groundRef.water?h.d.height*0.38:0);}}}
// весточка помощника из Сказа 1 работает весь мир 2
const VEST={leshy:['Леший','светлячок показывает один тайник'],yaga:['Баба Яга','ступа: карта-рушник открывается где угодно на Лукоморье'],kolobok:['Колобок','пружинка: раз за уровень упавший встаёт на месте'],
  sadko:['Садко','лад: окно в долю шире'],kit:['Рыба-кит','подшивает упавшего издалека'],rybka:['Золотая рыбка','призрачный показ сразу'],
  zhar:['Жар-птица','тёплое перо: над лавой Пелагея не снижается'],demyan:['Демьян','молот: окно в долю шире — в пляске и у наковальни'],kiki4:['Кикимора','крепкая кудель: раз за уровень упавший встаёт на месте'],leshy4:['Леший','светлячок показывает один тайник'],sirin:['Сирин и Алконост','лад: окно в такт шире'],yaga3:['Баба Яга','ступа: раз за уровень упавший встаёт на месте']};
function helperOf(world){const t=world===1?G.flags.skaz:world===2?G.flags.skaz2:world===3?G.flags.skaz3:G.flags.skaz4;if(!t)return world===1?'leshy':world===3?'zhar':null;const h=t[1]||'';
  if(world===4)return /Демьян/.test(h)?'demyan':/Кикимор/.test(h)?'kiki4':'leshy4';
  if(world===3)return /Жар/.test(h)?'zhar':/Сирин|Алконост/.test(h)?'sirin':'yaga3';
  if(world===1)return /Яга/.test(h)?'yaga':/Колобок|Кикимор/.test(h)?'kolobok':'leshy';return /Садко/.test(h)?'sadko':/кит/i.test(h)?'kit':'rybka';}
function applyVest(){const v=helperOf(W.world>=5?4:W.world>=4?3:W.world===3?2:1);W.vest=v;if(W.world===3)vestW3();if(W.world===4)vestW4();if(W.world===5)vestW5();if(v==='kolobok'||v==='yaga3')W.spring=true;
  if(v==='leshy'||v==='leshy4'){const it=W.items.find(i=>i.kind==='nut'&&!i.owl&&!i.locked);if(it){const bm=new THREE.Mesh(new THREE.CylinderGeometry(0.06,0.3,16,8,1,true),MB(0xd8ff8a,{transparent:true,opacity:0.3,depthWrite:false,side:THREE.DoubleSide}));bm.position.y=8;it.g.add(bm);
    const ff=new THREE.Mesh(new THREE.SphereGeometry(0.09,8,6),M(0xf8ff9a,{emissive:0xd8ff40,emissiveIntensity:1.6}));it.g.add(ff);W.updates.push(()=>{ff.position.set(Math.sin(G.time*3)*0.6,0.6+Math.sin(G.time*5)*0.2,Math.cos(G.time*3)*0.6);});}}}
function hudW2(cine){const ve=$('vest');const txt=W.vest&&W.world>=2&&!cine?'весточка · '+VEST[W.vest][0]+': '+VEST[W.vest][1]:'';if(ve._t!==txt){ve._t=txt;ve.textContent=txt;ve.style.display=txt?'block':'none';}
  const pb=$('pbub');const b=W.pbub&&!cine?W.pbub():null;pb.style.display=b?'block':'none';if(b){if(pb._t!==b.text){pb._t=b.text;pb.innerHTML=b.text+'<span><i></i></span>';}pb.querySelector('i').style.width=Math.round(b.k*100)+'%';}}
/* ---------- Китеж: купола в водорослях, терема, звонницы, водоросли, пузырьки и лучи сверху ---------- */
function kdome(x,z,s,y,o){o=o||{};const g=new THREE.Group();g.position.set(x,y||0,z);g.scale.setScalar(s||1);W.group.add(g);const wall=M(o.wall||0xe8e0cc),gold=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.35}),weed=M(0x3f7a3a);
  addMesh(new THREE.BoxGeometry(3,3.4,3),wall,0,1.7,0,g);addMesh(new THREE.CylinderGeometry(1.0,1.0,1.4,12),wall,0,4.1,0,g);
  const on=addMesh(new THREE.SphereGeometry(1.15,14,10),gold,0,5.4,0,g);on.scale.set(1,1.15,1);addMesh(new THREE.ConeGeometry(0.5,1.1,12),gold,0,6.7,0,g);addMesh(new THREE.BoxGeometry(0.06,0.7,0.06),gold,0,7.5,0,g);addMesh(new THREE.BoxGeometry(0.4,0.06,0.06),gold,0,7.6,0,g);
  for(let i=0;i<7;i++){const a=i/7*Math.PI*2;const w=addMesh(new THREE.ConeGeometry(0.08,rand(1.2,2.4),4),weed,Math.cos(a)*1.05,4.6,Math.sin(a)*1.05,g);w.rotation.x=Math.PI;}
  for(const sd of[-1,1])addMesh(new THREE.BoxGeometry(0.5,0.9,0.06),M(0x2a3a40),sd*0.7,2.2,1.52,g);addMesh(new THREE.BoxGeometry(0.9,1.4,0.06),M(0x3a2a1a),0,0.7,1.52,g);
  if(o.col)W.cyls.push({x,z,r:2.0*(s||1),miny:-1,maxy:(y||0)+3.4*(s||1),on:true,occ:true});return g;}
function terem(minx,maxx,minz,maxz,h,o){o=o||{};const m=W.group.children.length;const wood=M(o.wall||0xb07a48),roof=M(o.roof||0x3f7a5a);
  box(minx,maxx,0,h,minz,maxz,wood,{occ:true});const cx=(minx+maxx)/2,cz=(minz+maxz)/2,w=maxx-minx,d=maxz-minz;
  const rg=new THREE.ConeGeometry(Math.max(w,d)*0.72,1.8,4);rg.rotateY(Math.PI/4);const r=addMesh(rg,roof,cx,h+0.9,cz);r.scale.set(w/Math.max(w,d),1,d/Math.max(w,d));
  for(let i=0;i<Math.floor(w/1.6);i++)addMesh(new THREE.BoxGeometry(0.6,0.8,0.06),M(0x1f2f36),minx+0.8+i*1.6,h*0.62,maxz+0.03);
  addMesh(new THREE.BoxGeometry(w+0.2,0.16,0.14),M(0xd8b060),cx,h-0.1,maxz+0.06);if(o.fade!==false)fadeable(since(m));}
function seaweed(x,z,hgt,y){const g=new THREE.Group();g.position.set(x,y||0,z);W.group.add(g);const m=M(0x3f8a4a);const n=Math.max(2,Math.round(hgt/0.5));
  for(let i=0;i<n;i++){const s=new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.07,0.55,5),m);s.position.y=0.27+i*0.5;s.castShadow=false;g.add(s);}W.weeds=W.weeds||[];W.weeds.push({g,ph:rand(0,6)});return g;}
function kitezhDecor(zmin,zmax,xw){xw=xw||12;
  for(let z=zmax;z>zmin;z-=rand(7,11)){for(const sd of[-1,1]){if(Math.random()<0.8)kdome(sd*rand(xw+5,xw+14),z+rand(-2,2),rand(0.9,1.6),0);}}
  for(let i=0;i<14;i++)kdome(rand(-40,40),zmin-rand(8,30),rand(1.2,2.4),0);
  for(let i=0;i<60;i++)seaweed((Math.random()<0.5?-1:1)*rand(xw-0.8,xw+4),rand(zmin,zmax),rand(1,3.4));
  // лучи сверху
  for(let i=0;i<8;i++){const c=new THREE.Mesh(new THREE.CylinderGeometry(0.6,rand(2,3.4),40,10,1,true),MB(0xcff8ff,{transparent:true,opacity:0.05,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending}));
    c.position.set(rand(-14,14),14,rand(zmin,zmax));c.rotation.z=rand(-0.25,0.25);W.group.add(c);}
  // пузырьки поднимаются к свету
  const n=260,pos=new Float32Array(n*3);for(let i=0;i<n;i++){pos[i*3]=rand(-22,22);pos[i*3+1]=rand(0,24);pos[i*3+2]=rand(zmin,zmax);}
  const gg=new THREE.BufferGeometry();gg.setAttribute('position',new THREE.BufferAttribute(pos,3));const pts=new THREE.Points(gg,new THREE.PointsMaterial({color:0xe8fcff,size:0.16,transparent:true,opacity:0.7}));W.group.add(pts);
  // рыбки кругами
  const fish=[];for(let i=0;i<10;i++){const g=new THREE.Group();const c=[0xffa040,0xe8e8f0,0x80c0ff][i%3];const b=new THREE.Mesh(new THREE.SphereGeometry(0.22,8,6),M(c));b.scale.set(0.6,0.8,1.6);g.add(b);
    const t=new THREE.Mesh(new THREE.ConeGeometry(0.2,0.3,4),M(c));t.rotation.x=-Math.PI/2;t.position.z=-0.45;g.add(t);W.group.add(g);fish.push({g,r:rand(4,12),y:rand(4,12),z:rand(zmin+10,zmax-5),x:rand(-10,10),sp:rand(0.3,0.7)*(Math.random()<0.5?-1:1),a:rand(0,6)});}
  W.updates.push(dt=>{const a=gg.attributes.position.array;for(let i=0;i<n;i++){a[i*3+1]+=dt*rand(0.6,1.4);a[i*3]+=Math.sin(G.time+i)*dt*0.2;if(a[i*3+1]>24)a[i*3+1]=0;}gg.attributes.position.needsUpdate=true;
    for(const f of fish){f.a+=dt*f.sp;f.g.position.set(f.x+Math.cos(f.a)*f.r,f.y+Math.sin(f.a*2)*0.4,f.z+Math.sin(f.a)*f.r);f.g.rotation.y=f.a*(f.sp>0?-1:1)+(f.sp>0?Math.PI:0);}
    if(W.weeds)for(const w of W.weeds)w.g.rotation.z=Math.sin(G.time*1.2+w.ph)*0.15;});}
// надпись для текстур (корешок книги «Не про меня» и т. п.) — нацарапано
function scratchTex(txt,w,h,col,bg){const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.fillStyle=bg||'#5a2a1a';x.fillRect(0,0,w,h);
  x.strokeStyle='rgba(0,0,0,.25)';for(let i=0;i<30;i++){x.beginPath();x.moveTo(rand(0,w),rand(0,h));x.lineTo(rand(0,w),rand(0,h));x.stroke();}
  x.font='bold '+Math.round(h*0.42)+'px Georgia, serif';x.textAlign='center';x.textBaseline='middle';x.fillStyle=col||'#e8d8b0';for(let k=0;k<3;k++){x.globalAlpha=0.55;x.fillText(txt,w/2+rand(-1.5,1.5),h/2+rand(-1.5,1.5));}x.globalAlpha=1;
  const t=new THREE.CanvasTexture(c);return t;}
/* ---------- жители Мира 2 ---------- */
function makeSadko(){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);const kaf=M(0xb02a2a),trim=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.3}),skin=M(0xe8c8a0);
  part(body,new THREE.CylinderGeometry(0.42,0.62,1.2,12),kaf,0,0.6,0);for(let i=0;i<4;i++)part(body,new THREE.BoxGeometry(0.18,0.04,0.05),trim,0,0.4+i*0.22,0.5-i*0.03);
  part(body,new THREE.TorusGeometry(0.5,0.05,6,18),trim,0,0.12,0).rotation.x=Math.PI/2;
  const head=new THREE.Group();head.position.y=1.5;body.add(head);part(head,new THREE.SphereGeometry(0.28,12,10),skin,0,0,0);
  const bd=new THREE.ConeGeometry(0.24,0.55,10);bd.rotateX(Math.PI);part(head,bd,M(0x9a6a3a),0,-0.28,0.14);for(const s of[-1,1])part(head,new THREE.SphereGeometry(0.035,6,5),MAT.dark,s*0.1,0.05,0.25);
  part(head,new THREE.CylinderGeometry(0.26,0.3,0.28,12),kaf,0,0.26,0);part(head,new THREE.TorusGeometry(0.29,0.07,6,16),M(0x6a4a2a),0,0.14,0).rotation.x=Math.PI/2;
  const arms=[];for(const s of[-1,1]){const a=new THREE.Group();a.position.set(s*0.45,1.1,0.1);body.add(a);part(a,new THREE.CylinderGeometry(0.08,0.08,0.55,6),kaf,0,-0.22,0.12).rotation.x=0.9;arms.push(a);}
  const gus=new THREE.Group();gus.position.set(0,0.78,0.5);gus.rotation.x=-1.1;body.add(gus);gusliMesh(gus,M(0xc88a3a),1.4);
  const drop=dropMesh(0x3a1a4a);drop.scale.setScalar(0.5);drop.position.set(0,1.35,0.62);body.add(drop);
  return {g,body,head,arms,gus,drop};}
/* ---------- мороки Мира 2: щука, рак, пузырник ---------- */
function markMesh(s){const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.TorusGeometry(0.28,0.04,8,24),M(COL.gold,{emissive:COL.gold,emissiveIntensity:0.8})));
  g.add(new THREE.Mesh(new THREE.CircleGeometry(0.26,20),MB(0x2a2014,{transparent:true,opacity:0.6,side:THREE.DoubleSide})));const ac=acornMesh(1.4);ac.position.z=0.04;g.add(ac);g.scale.setScalar(s||1);return g;}
// щука-морок: в приливе плавает кругами и пускает пузырь-каплю (синий), в отливе бьётся на дне — беззащитна сбоку
function pike(x,z,zone,bed,o){const wet0=zone.level>zone.floor+0.6;const e=makeFoe('shchuka',x,z,Object.assign({y:wet0?zone.level:bed,leash:3.4},o||{}));e.zone=zone;e.bed=bed;
  e.tick=(e,dt)=>{const zz=e.zone,wet=zz.level>zz.floor+0.6;e.flop=!wet;e.sideOpen=!wet;e.spMul=wet?1:0;if(e.state==='spawn')return;if(!wet&&e.state!=='broken'&&e.state!=='dying')e.open=Math.max(e.open,0.25);
    const ty=wet?zz.level:e.bed;e.pos.y=damp(e.pos.y,ty,wet?5:9,dt);e.baseY=ty;
    if(!wet&&(e.state==='idle'||e.state==='ready')){e.cd=Math.max(e.cd,0.6);if(e.state==='ready')e.state='idle';}
    if(wet&&e.state==='idle'){const h=foeTarget(e);if(!h||hd(h.pos,e.pos)>7){e.circ=(e.circ||rand(0,6))+dt*0.9;const tx=e.home.x+Math.cos(e.circ)*1.6,tz=e.home.z+Math.sin(e.circ)*1.6,dx=tx-e.pos.x,dz=tz-e.pos.z,d=Math.hypot(dx,dz);
      if(d>0.1)mMove(e,dx/d,dz/d,1.5,dt);e.face=angDamp(e.face,Math.atan2(dx,dz),4,dt);}}};
  e.post=(e)=>{const L=e.L;if(e.flop&&e.state!=='broken'&&e.state!=='dying'){e.body.rotation.z=1.35+Math.sin(G.time*14)*0.18;e.body.position.y=0.05+Math.abs(Math.sin(G.time*7))*0.2;L.tail.rotation.y=Math.sin(G.time*20)*0.6;L.fish.position.y=0.4;}
    else{L.tail.rotation.y=Math.sin(G.time*6)*0.35;L.fish.position.y=e.flop?0.4:0.12;}L.jaw.rotation.x=e.state==='wind'?0.5:0.05;};
  return e;}
// рак-щипач: красная хватка; в отливе вязнет в грядках, под водой дремлет на дне
function crab(x,z,zone,o){const e=makeFoe('rak',x,z,Object.assign({leash:5},o||{}));e.zone=zone;e.bottom=true;
  e.tick=(e,dt)=>{const zz=e.zone,low=!zz||zz.level<=zz.floor+0.3,bed=!!(e.beds&&e.beds(e));e.stuck=low&&bed;e.spMul=low?(bed?0.35:1):0;
    if(!low){e.cd=Math.max(e.cd,0.8);if(e.state==='ready')e.state='idle';}if(e.state==='wind'&&e.stuck)e.slow=Math.min(e.slow,0.7);};
  e.post=(e)=>{if(e.stuck&&(e.state==='idle'||e.state==='recover'))e.body.rotation.z=Math.sin(G.time*9)*0.12;};
  return e;}
// тягун: угорь колодца — в приливе под гладью неуязвим и смирный; отлив — на мели: бьётся, хватает и тянет к себе, бей сбоку. Не добили за окно — зарылся в ил до новой воды
function tyagunFoe(x,z,zone,o){const low0=zone.level<=zone.floor+0.4;const e=makeFoe('tyagun',x,z,Object.assign({y:low0?zone.floor:Math.max(zone.floor,zone.level-0.75),leash:5},o||{}));
  e.zone=zone;e.up=false;e.silt=false;e.upT=0;e.circ=rand(0,6);
  e.guardAll=()=>!e.up&&e.state!=='broken';e.darkGuard=()=>!e.up;e.guardText='под воду ушёл — нужен отлив!';
  e.tick=(e,dt)=>{const zz=e.zone,low=zz.level<=zz.floor+0.4;e.guardText=e.silt?'в ил зарылся — прилив, и снова отлив!':'под воду ушёл — нужен отлив!';
    if(low){if(!e.up&&!e.silt){e.up=true;e.upT=genPath()==='easy'?8:6;SFX.splash();burst(e.pos.clone().add(new V3(0,0.5,0)),0xcff8ff,14,3);floatText(e.pos.clone().add(new V3(0,1.6,0)),'Тягун на мели — бей!','#9fe6ff');e.cd=Math.min(e.cd,0.6);}
      if(e.up&&e.state!=='stagger'&&e.state!=='broken'&&e.state!=='dying'){e.upT-=dt;if(e.upT<=0){e.up=false;e.silt=true;SFX.water();burst(e.pos.clone().add(new V3(0,0.3,0)),0x6a5a3a,12,2);floatText(e.pos.clone().add(new V3(0,1.4,0)),'В ил зарылся!','#c8b890');}}}
    else if(e.up||e.silt){if(e.up){SFX.water();floatText(e.pos.clone().add(new V3(0,1.4,0)),'Под воду ушёл','#9fe6ff');}e.up=false;e.silt=false;}
    e.sideOpen=e.up;e.spMul=e.up?1:0;if(e.state==='spawn'||e.state==='dying')return;
    const ty=e.up?zz.floor:e.silt?zz.floor-0.3:Math.max(zz.floor,zz.level-0.75);e.pos.y=damp(e.pos.y,ty,6,dt);e.baseY=ty;
    if(!e.up){e.cd=Math.max(e.cd,0.8);if(e.state==='ready')e.state='idle';
      if(!e.silt&&e.state==='idle'){e.circ+=dt*0.8;const tx=clamp(e.home.x+Math.cos(e.circ)*1.8,zz.minx+0.6,zz.maxx-0.6),tz=clamp(e.home.z+Math.sin(e.circ)*1.8,zz.minz+0.6,zz.maxz-0.6),dx=tx-e.pos.x,dz=tz-e.pos.z;
        e.pos.x+=dx*Math.min(1,dt*1.5);e.pos.z+=dz*Math.min(1,dt*1.5);e.face=angDamp(e.face,Math.atan2(dx,dz),4,dt);}}};
  e.post=e=>{const L=e.L;L.segs.forEach((sg,i)=>{sg.position.x=Math.sin(G.time*(e.up?9:4)-i*0.9)*0.05*i;});L.fish.rotation.z=e.up&&(e.state==='idle'||e.state==='recover')?Math.sin(G.time*10)*0.25:0;L.fish.position.y=e.silt?0.1:0.4;};
  return e;}
// пузырник: надувается три секунды — рогатка Прошки прерывает; не успели — три капли подряд
function puzyr(x,z,o){const e=makeFoe('puzyr',x,z,Object.assign({leash:5},o||{}));e.inf=0;e.infCd=rand(4,7);const mp=new V3(),mk=markMesh(0.9);mk.visible=false;W.group.add(mk);
  W.marks.push({pos:mp,active:()=>e.alive&&e.inf>0.2&&e.state!=='broken',onHit:()=>{if(!e.alive)return;e.inf=0;e.infCd=rand(6,9);tone(900,0.3,'sine',0.25,200);burst(mp.clone(),0xffe0a0,14,4);
    floatText(mp.clone().add(new V3(0,0.6,0)),'Сдулся!','#ffd9a0');emberOut(e,2,'Рогатка!');if(e.state!=='broken'&&e.alive){e.state='stagger';e.t=0;e.openHit=false;}}});
  e.tick=(e,dt)=>{mp.set(e.pos.x,e.pos.y+1.25+e.inf*0.35,e.pos.z);mk.position.copy(mp);mk.visible=e.alive&&e.inf>0.2;if(mk.visible){mk.lookAt(G.split>0.5?cams[0].position:camS.position);mk.scale.setScalar(0.9+0.15*Math.sin(G.time*10));}
    if(e.state==='broken'||e.state==='stagger'||e.state==='dying'||e.state==='spawn'){e.inf=0;return;}
    if(e.inf>0){e.inf+=dt/3;e.cd=Math.max(e.cd,0.5);if(e.state==='ready'||e.state==='wind'){}if(e.inf>=1){e.inf=0;e.infCd=rand(7,10);const h=foeTarget(e);SFX.blue();floatText(e.pos.clone().add(new V3(0,2.2,0)),'Пшш!','#9fd0ff');
        if(h)for(let i=0;i<3;i++)later(i*0.3,()=>{if(e.alive)spawnBolt(e,h);});}}
    else if(e.state==='idle'&&foeTarget(e)){e.infCd-=dt;if(e.infCd<=0){e.inf=0.001;tone(300,1.2,'sine',0.12,700);floatText(e.pos.clone().add(new V3(0,2.2,0)),'Надувается!','#ffd0a0');}}};
  e.post=(e)=>{e.L.puff.scale.setScalar(1+e.inf*0.7);};
  e.onDeath=()=>{mk.visible=false;};return e;}
// колокол Китежа: язык, звон, колыхание
function bigBell(x,y,z,s,o){o=o||{};const g=new THREE.Group();g.position.set(x,y,z);g.scale.setScalar(s||1);W.group.add(g);const piv=new THREE.Group();g.add(piv);
  const bm=M(o.col||0xc89a40,{emissive:0x604010,emissiveIntensity:0.2});const pts=[];for(let i=0;i<=10;i++){const t=i/10;pts.push(new THREE.Vector2(0.18+Math.pow(t,1.6)*0.82+(t>0.9?(t-0.9)*1.2:0),-t*1.6));}
  const shell=new THREE.Mesh(new THREE.LatheGeometry(pts,20),new THREE.MeshLambertMaterial({color:o.col||0xc89a40,emissive:0x604010,emissiveIntensity:0.2,side:THREE.DoubleSide}));shell.castShadow=true;piv.add(shell);
  part(piv,new THREE.SphereGeometry(0.2,10,8),bm,0,0,0);const tongue=new THREE.Group();tongue.position.y=-0.1;piv.add(tongue);
  if(o.tongue!==false){part(tongue,new THREE.CylinderGeometry(0.04,0.04,1.3,6),M(0x4a4a50),0,-0.65,0);part(tongue,new THREE.SphereGeometry(0.16,10,8),M(0x4a4a50),0,-1.35,0);}
  const b={g,piv,shell,tongue,mat:shell.material,swing:0,ring(){b.swing=1.6;SFX.bell();tone(330*(o.pitch||1),1.6,'sine',0.3);tone(495*(o.pitch||1),1.4,'sine',0.14,null,0.03);ringFx(g.position.clone().add(new V3(0,-1.4*(s||1),0)),COL.gold,3*(s||1));}};
  W.updates.push(dt=>{b.swing=Math.max(0,b.swing-dt*0.6);piv.rotation.z=Math.sin(G.time*5)*0.35*b.swing;tongue.rotation.z=Math.sin(G.time*5-0.8)*0.5*b.swing;b.mat.emissiveIntensity=0.2+b.swing*0.4;});
  return b;}

