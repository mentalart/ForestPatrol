/* ============================== МИР 5 · ОСТРОВ БУЯН: вещь по знаку, Лихо Одноглазое, овечьи шкуры, пугала, тени ============================== */
// своей чудо-вещи нет: знак на земле в круге 8 м — RB берёт эту вещь; нет знака — ничего. Две вещи рядом не встречаются
const SIGN_COL={clew:0xffd23a,gusli:0x7ad8ff,pero:0xff9a40,kleshi:0xff6a2a},SIGN_NAME={clew:'клубок',gusli:'гусли',pero:'перо',kleshi:'клещи'};
function signIcon(item,s){const g=new THREE.Group();const c=SIGN_COL[item],m=M(c,{emissive:c,emissiveIntensity:0.8});
  if(item==='clew'){addMesh(new THREE.SphereGeometry(0.3,12,10),m,0,0,0,g);for(let i=0;i<3;i++){const t=addMesh(new THREE.TorusGeometry(0.3,0.025,5,20),M(0xa07a10),0,0,0,g);t.rotation.set(i*1.05,i*0.7,0);}
    const tl=addMesh(new THREE.CylinderGeometry(0.02,0.02,0.7,4),m,0.34,-0.3,0,g);tl.rotation.z=0.8;}
  else if(item==='gusli'){const q=new THREE.Group();gusliMesh(q,m,0.8);q.rotation.x=-0.4;g.add(q);}
  else if(item==='pero'){const f=featherMesh(1.2);f.position.y=-0.32;g.add(f);f.userData.mats.forEach(q=>{q.emissiveIntensity=0.9;});}
  else{for(const sd of[-1,1]){const a=addMesh(new THREE.BoxGeometry(0.08,0.07,0.85),m,sd*0.06,0,0,g);a.rotation.y=-sd*0.16;}addMesh(new THREE.TorusGeometry(0.09,0.03,6,12),m,0,0,-0.4,g);g.rotation.x=-0.7;}
  g.scale.setScalar(s||1);return g;}
function signMark(x,y,z,item,o){o=o||{};const g=new THREE.Group();g.position.set(x,y+0.03,z);W.group.add(g);const c=SIGN_COL[item];
  const disc=new THREE.Mesh(new THREE.CircleGeometry(1.15,32),MB(0xf4ecd8,{transparent:true,opacity:0.45,depthWrite:false}));disc.rotation.x=-Math.PI/2;g.add(disc);
  const rim=new THREE.Mesh(new THREE.TorusGeometry(1.15,0.07,6,36),MB(c,{transparent:true,opacity:0.9}));rim.rotation.x=Math.PI/2;g.add(rim);
  // руна на земле: четыре луча знака
  for(let i=0;i<4;i++){const r=new THREE.Mesh(new THREE.BoxGeometry(0.12,0.02,0.7),MB(c,{transparent:true,opacity:0.8}));const a=i*Math.PI/2+Math.PI/4;r.position.set(Math.sin(a)*0.62,0.02,Math.cos(a)*0.62);r.rotation.y=a;g.add(r);}
  const ic=signIcon(item,1);ic.position.y=1.5;g.add(ic);
  let area=null;if(!o.noArea){area=new THREE.Mesh(new THREE.RingGeometry((o.r||8)-0.1,(o.r||8),72),MB(c,{transparent:true,opacity:0.12,depthWrite:false,side:THREE.DoubleSide}));area.rotation.x=-Math.PI/2;area.position.y=0.03;g.add(area);}
  const s={x,y,z,item,r:o.r||8,dy:o.dy||5,keep:o.keep||(o.r||8)+10,g,ic,rim,area,on:o.on||null,near:0,flash:0};W.signs.push(s);
  if(item==='pero')W.feat5=true;if(item==='kleshi')W.tong5=true;W.abil[item]=true;return s;}
function signNear(h){let best=null,bd=1e9;for(const s of W.signs){if(s.on&&!s.on())continue;const d=hd(h.pos,s);if(d<s.r&&Math.abs(h.pos.y-s.y)<s.dy&&d<bd){bd=d;best=s;}}return best;}
function useSign(pi){const h=active(pi),p=players[pi],s=signNear(h);if(heroCarry(h)){playTongs(pi);return;}   // горячее в клещах — положить можно где угодно
  if(!s){if(p.lockedTip<=0){p.lockedTip=3;tip(pi,'Тут знака нет. На Буяне кнопка '+K(pi,'item')+' берёт ту вещь, чей знак на земле рядом нарисован.',2.8);}SFX.miss();return;}
  s.flash=1;if(s.item==='clew')throwYarn(pi);else if(s.item==='gusli')playGusli(pi);else if(s.item==='pero')playFeather(pi);else playTongs(pi);}
function updateSigns(dt){if(!W.signs.length)return;
  for(const s of W.signs){const en=!s.on||s.on();s.g.visible=en;if(!en)continue;const near=HEROES.some(h=>h.active&&hd(h.pos,s)<s.r&&Math.abs(h.pos.y-s.y)<s.dy);s.near=damp(s.near,near?1:0,5,dt);s.flash=Math.max(0,s.flash-dt*3);
    s.ic.rotation.y+=dt*(0.8+s.near*1.5);s.ic.position.y=1.5+Math.sin(G.time*2+s.x)*0.12+s.near*0.3;s.ic.scale.setScalar(1+s.near*0.25+s.flash*0.5);s.rim.material.opacity=0.5+0.45*s.near;if(s.area)s.area.material.opacity=0.05+0.14*s.near;}
  // перо гаснет, когда уходишь далеко от его знака
  for(const h of HEROES)if(h.lit&&!W.signs.some(s=>s.item==='pero'&&(!s.on||s.on())&&hd(h.pos,s)<s.keep&&Math.abs(h.pos.y-s.y)<s.dy+4)){h.lit=false;}}
/* ---------- Лихо Одноглазое: один конус 45°, поворот 90° за 3 с; видит ближайшего, в том числе оставленного; увидел управляемого — лапа (красный зубец): кувырок или назад ---------- */
const LIKHO_HALF=Math.PI/8;
function makeLikho(){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);const fur=M(0x4a4038),fur2=M(0x6a5a48),skin=M(0x9a8672),dk=MAT.dark;
  const b=part(body,new THREE.SphereGeometry(1.6,14,12),fur,0,2.6,0);b.scale.set(1.12,1.25,1);
  for(let i=0;i<46;i++){const a=rand(0,Math.PI*2),y=rand(1.3,4.0),k=Math.max(0.15,1-Math.pow((y-2.6)/2.1,2));const r=1.72*Math.sqrt(k);const c=part(body,new THREE.ConeGeometry(0.2,0.8,4),i%2?fur:fur2,Math.cos(a)*r,y,Math.sin(a)*r*0.92);c.rotation.set(Math.sin(a)*1.3,rand(0,3),-Math.cos(a)*1.3);}
  const head=new THREE.Group();head.position.set(0,4.35,0.25);body.add(head);part(head,new THREE.SphereGeometry(1.05,14,12),fur,0,0,0).scale.set(1,0.95,0.95);
  for(let i=0;i<16;i++){const a=i/16*Math.PI*2;const c=part(head,new THREE.ConeGeometry(0.17,0.85,4),fur2,Math.cos(a)*0.85,0.55+Math.sin(i*1.7)*0.15,Math.sin(a)*0.75-0.1);c.rotation.z=-Math.cos(a)*0.9;c.rotation.x=Math.sin(a)*0.9;}
  const eye=new THREE.Group();eye.position.set(0,0.12,0.86);head.add(eye);part(eye,new THREE.SphereGeometry(0.44,16,12),M(0xfaf6e8),0,0,0);
  const iris=part(eye,new THREE.SphereGeometry(0.24,12,10),M(0xd8401a,{emissive:0xb02000,emissiveIntensity:0.9}),0,0,0.28);part(eye,new THREE.SphereGeometry(0.11,8,6),dk,0,0,0.44);
  const lid=part(eye,new THREE.SphereGeometry(0.47,14,10,0,Math.PI*2,0,Math.PI/2),fur2,0,0,0);lid.rotation.x=-1.25;
  const brow=part(head,new THREE.BoxGeometry(1.1,0.16,0.2),fur2,0,0.62,0.86);brow.rotation.x=0.3;
  const mouth=part(head,new THREE.TorusGeometry(0.36,0.06,6,14,Math.PI),dk,0,-0.5,0.84);mouth.rotation.z=Math.PI;
  for(const sd of[-1,1]){const tk=part(head,new THREE.ConeGeometry(0.06,0.22,4),M(0xf0e8d0),sd*0.2,-0.48,0.9);tk.rotation.x=Math.PI;}
  const arms=[];for(const sd of[-1,1]){const a=new THREE.Group();a.position.set(sd*1.72,3.5,0.2);body.add(a);part(a,new THREE.CylinderGeometry(0.3,0.22,2.4,8),fur,0,-1.2,0);const paw=new THREE.Group();paw.position.y=-2.5;a.add(paw);
    part(paw,new THREE.SphereGeometry(0.44,10,8),skin,0,0,0);for(let k=0;k<3;k++){const cl=part(paw,new THREE.ConeGeometry(0.07,0.38,4),M(0xd8301a,{emissive:0x801000,emissiveIntensity:0.5}),(k-1)*0.2,-0.36,0.2);cl.rotation.x=Math.PI*0.8;}
    a.rotation.z=sd*0.28;arms.push({a,paw,sd});}
  const legs=[];for(const sd of[-1,1])legs.push(part(body,new THREE.CylinderGeometry(0.38,0.44,1.3,8),fur,sd*0.72,0.65,0));
  return {g,body,head,eye,iris,lid,mouth,arms,legs};}
function likho(o){o=o||{};const m=makeLikho();const s=o.scale||1.25;m.g.scale.setScalar(s);m.g.position.set(o.x,o.y||0,o.z);const R=o.R||20;
  const cg=new THREE.ConeGeometry(Math.tan(LIKHO_HALF)*R,R,32,1,true);cg.translate(0,-R/2,0);cg.rotateX(-Math.PI/2);
  const cone=new THREE.Mesh(cg,MB(0xffe6a8,{transparent:true,opacity:0.15,depthWrite:false,side:THREE.DoubleSide}));cone.renderOrder=4;W.group.add(cone);
  const fang=new THREE.Group();W.group.add(fang);const fm=M(COL.red,{emissive:COL.red,emissiveIntensity:1.2});part(fang,new THREE.ConeGeometry(0.22,0.6,6),fm,0,0,0).rotation.x=Math.PI;fang.visible=false;
  const L={m,g:m.g,pos:m.g.position,s,R,R0:R,yaw:o.face||0,pitch:0,cone,fang,tgt:null,seeT:[0,0],reach:null,cd:0,turn:o.turn||(Math.PI/2)/3,on:o.on||null,covers:o.covers||null,onCatch:o.onCatch||null,
    Rgeo:R,col:null,ride:null,perch:null,countEvery:o.countEvery||0,countDur:o.countDur||2.5,countT:0,counting:false,cntN:0,t:0,home:new V3(o.x,o.y||0,o.z),mode:o.mode||'watch',noCatch:!!o.noCatch,uhT:rand(2,4),walk:o.walk||null};
  L.col={x:o.x,z:o.z,r:1.9*s,miny:-10,maxy:100,on:false};W.cyls.push(L.col);W.likhos.push(L);return L;}
function likhoEye(L){const p=new V3();L.m.eye.getWorldPosition(p);return p;}
function likhoDir(L){const cp=Math.cos(L.pitch);return new V3(Math.sin(L.yaw)*cp,Math.sin(L.pitch),Math.cos(L.yaw)*cp);}
function coverBlocks(a,b,covers){if(!covers||!covers.length)return false;for(let i=1;i<14;i++){const u=i/14,x=lerp(a.x,b.x,u),y=lerp(a.y,b.y,u),z=lerp(a.z,b.z,u);
  for(const c of covers){if(c.on&&!c.on())continue;if(c.r!==undefined){if(Math.hypot(x-c.x,z-c.z)<c.r&&y>c.miny&&y<c.maxy)return true;}else if(x>c.minx&&x<c.maxx&&y>c.miny&&y<c.maxy&&z>c.minz&&z<c.maxz)return true;}}return false;}
function inBait(h){return W.baits.some(b=>hd(h.pos,b)<(b.r||1.2)&&Math.abs(h.pos.y-b.y)<1.6);}
// кольцо-приманка: кто стоит в нём, того Лихо разглядывает, но лапой не тянется
function baitRing(x,y,z){const g=new THREE.Group();g.position.set(x,y+0.04,z);W.group.add(g);const m=MB(0xffe6a8,{transparent:true,opacity:0.85});const r=new THREE.Mesh(new THREE.TorusGeometry(1.1,0.07,6,30),m);r.rotation.x=Math.PI/2;g.add(r);
  const eye=new THREE.Group();eye.position.y=2.3;g.add(eye);eye.add(new THREE.Mesh(new THREE.CircleGeometry(0.4,20),MB(0x1a2230,{transparent:true,opacity:0.75})));const w=new THREE.Mesh(new THREE.CircleGeometry(0.26,20),MB(0xfaf6e8));w.scale.y=0.6;w.position.z=0.01;eye.add(w);const ir=new THREE.Mesh(new THREE.CircleGeometry(0.12,14),MB(0xd8401a));ir.position.z=0.02;eye.add(ir);
  const b={x,y,z,r:1.2,g,eye};W.baits.push(b);W.updates.push(()=>{eye.visible=!HEROES.some(h=>inBait(h));eye.position.y=2.3+Math.sin(G.time*2)*0.1;});return b;}
function hiddenFromLikho(h){return h.cling||h.hidden||h.inFlock||(h.active&&players[h.player].downed)||h.likhoSafe;}
function likhoSees(L,h){if(hiddenFromLikho(h)||L.ride===h)return false;const e=likhoEye(L),c=h.pos.clone().add(new V3(0,h.d.height*0.55,0)),v=c.clone().sub(e),d=v.length();if(d>L.R||d<0.4)return false;
  if(v.dot(likhoDir(L))/d<Math.cos(LIKHO_HALF))return false;return !coverBlocks(e,c,L.covers||W.covers);}
// хватка: герой отлетает к началу яруса (без лепестков)
function likhoCatch(h,to){SFX.knock();burst(h.pos.clone().add(new V3(0,1,0)),0x8a6a4a,14,4);floatText(h.pos.clone().add(new V3(0,h.d.height+0.8,0)),'Лихо сцапало!','#ff9a8a');
  const from=h.pos.clone(),t=to.clone();h.vel.set(0,0,0);h.likhoSafe=true;anim(0.9,k=>{h.pos.lerpVectors(from,t,smooth(k));h.pos.y+=Math.sin(k*Math.PI)*3;if(k>=1){placeOnGround(h,t.x,t.z,t.y);h.likhoSafe=false;}});
  if(players[h.player]&&h.active)players[h.player].cp.copy(t);}
function updateLikhos(dt){for(const L of W.likhos){const en=!L.on||L.on();L.cone.visible=false;L.fang.visible=false;L.col.x=L.pos.x;L.col.z=L.pos.z;L.col.on=L.g.visible&&!L.ride&&!L.perch;if(!en||G.cine){continue;}L.t+=dt;const m=L.m;
    // где сидит: на земле, на плечах героя, на пугале
    if(L.ride){const h=L.ride;L.g.scale.setScalar(0.3);L.g.position.set(h.pos.x,h.pos.y+h.d.height*0.9,h.pos.z);L.yaw=h.face;L.pitch=-0.12;L.g.rotation.y=h.face;L.R=12;
      m.body.rotation.z=Math.sin(G.time*3)*0.12;m.arms.forEach(a=>{a.a.rotation.z=a.sd*(0.9+Math.sin(G.time*4)*0.1);a.a.rotation.x=-0.6;});}
    else if(L.perch){const p=L.perch;L.g.scale.setScalar(0.36);L.g.position.set(p.x,p.y,p.z);L.yaw+=dt*0.55;L.pitch=-0.2;L.g.rotation.y=L.yaw;L.R=15;}
    else{L.g.scale.setScalar(L.s);L.R=L.R0;if(L.walk){L.walk(L,dt);}L.g.rotation.y=L.yaw;m.head.rotation.x=-L.pitch*0.5;}
    if(L.ctrl&&L.ctrl(L,dt))continue;   // бой в 5-1: зеркальце, счёт овечек, сон — Лихо ведёт уровень
    // Лихо сбивается со счёта: окно на переход
    if(L.countEvery){L.countT+=dt;const per=L.countEvery+L.countDur,u=L.countT%per;const was=L.counting;L.counting=u>L.countEvery;
      if(L.counting&&!was){L.cntN=0;L.reach=null;floatText(L.pos.clone().add(new V3(0,L.ride?2.4:7.5*L.g.scale.y/L.s*1.1,0)),'Раз… два… пять?.. Сбилось опять!','#e8d8b0');SFX.miss();}
      if(L.counting){m.head.rotation.z=Math.sin(G.time*5)*0.25;m.lid.rotation.x=-0.3;m.arms[0].a.rotation.x=-2.4+Math.sin(G.time*6)*0.2;continue;}else{m.head.rotation.z=0;m.lid.rotation.x=-1.25;if(!L.ride)m.arms[0].a.rotation.x=0;}}
    // цель — ближайший (в том числе оставленный)
    const e=likhoEye(L);
    if(!L.ride&&!L.perch&&L.mode==='watch'){let best=null,bd=1e9;const ign=h=>hiddenFromLikho(h)||(L.ignore&&L.ignore(h)),bt=HEROES.find(h=>!ign(h)&&inBait(h)&&hd(h.pos,e)<L.R*1.5);
      if(bt)best=bt;else for(const h of HEROES){if(ign(h))continue;const d=hd(h.pos,e);if(d<bd&&d<L.R*1.5){bd=d;best=h;}}L.tgt=best;
      if(!best&&L.idleLook){const want=Math.atan2(L.idleLook.x-e.x,L.idleLook.z-e.z);let da=want-L.yaw;while(da>Math.PI)da-=2*Math.PI;while(da<-Math.PI)da+=2*Math.PI;L.yaw+=clamp(da,-L.turn*dt,L.turn*dt);L.pitch=damp(L.pitch,-0.3,2,dt);}
      if(best){const want=Math.atan2(best.pos.x-e.x,best.pos.z-e.z);let da=want-L.yaw;while(da>Math.PI)da-=2*Math.PI;while(da<-Math.PI)da+=2*Math.PI;L.yaw+=clamp(da,-L.turn*dt,L.turn*dt);
        const hp=Math.atan2(best.pos.y+best.d.height*0.5-e.y,Math.max(0.5,hd(best.pos,e)));L.pitch=damp(L.pitch,hp,3,dt);}
      else if(!L.idleLook)L.yaw+=L.turn*0.35*dt;}
    else if(L.mode==='sweep'&&!L.ride&&!L.perch){L.yaw+=L.turn*dt*(L.sweepDir||1);L.pitch=damp(L.pitch,L.sweepPitch||-0.25,2,dt);}
    L.cone.visible=true;L.cone.position.copy(e);L.cone.scale.setScalar(L.R/L.Rgeo);L.cone.lookAt(e.clone().add(likhoDir(L)));L.cone.material.opacity=L.reach?0.26:0.15;L.cone.material.color.setHex(L.reach?0xffa080:0xffe6a8);
    // ухает на оставленного
    L.uhT-=dt;if(L.uhT<0){L.uhT=rand(3,5);const q=HEROES.find(h=>!h.active&&likhoSees(L,h));if(q){floatText(q.pos.clone().add(new V3(0,q.d.height+0.9,0)),'Ух! Ух!','#e8d0a0');tone(110,0.3,'sawtooth',0.07,80);}}
    if(L.noCatch)continue;
    if(L.cd>0)L.cd-=dt;
    if(L.reach){const r=L.reach,h=r.h;r.t+=dt;L.fang.visible=true;L.fang.position.set(h.pos.x,h.pos.y+h.d.height+0.9+Math.sin(G.time*14)*0.06,h.pos.z);
      if(!L.ride&&!L.perch){const arm=m.arms[1].a;arm.rotation.x=-Math.min(1.5,r.t*2.4);}
      if(h.rollT>0&&r.t>0.15){L.reach=null;L.cd=1.4;G.stats.dodges++;floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'От Лиха увернулся!','#ffe0a0');m.arms[1].a.rotation.x=0;}
      else if((!likhoSees(L,h)||inBait(h))&&r.t>0.25){L.reach=null;L.cd=0.8;floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Не видит!','#d0f0c0');m.arms[1].a.rotation.x=0;}
      else if(r.t>=r.dur){L.reach=null;L.cd=2;m.arms[1].a.rotation.x=0;if(L.onCatch)L.onCatch(h,L);}}
    else if(L.cd<=0){for(const pi of[0,1]){const h=active(pi);if(likhoSees(L,h)&&!inBait(h)&&!(L.noReach&&L.noReach(h))){L.seeT[pi]+=dt;if(L.seeT[pi]>0.45){L.reach={h,t:0,dur:L.reachDur||1.0};L.seeT=[0,0];SFX.red();floatText(h.pos.clone().add(new V3(0,h.d.height+1.2,0)),'Лихо тянет лапу! Кувырок!','#ff8a8a');tip(pi,'Лихо тянет лапу — кувырок '+K(pi,'roll')+'!',1.6);rumble(pi,0.3,0.2);break;}}
      else L.seeT[pi]=Math.max(0,L.seeT[pi]-dt*2);}}}}
/* ---------- овечьи шкуры: внутри стада взгляд не берёт; идти не быстрее шага ---------- */
function skinMesh(h){const g=new THREE.Group();const wool=M(0xfaf8ff),dk=M(0x3a3448);const k=h.d.height/1.4;
  for(const[dx,dy,dz,s]of[[0,0.5,0,0.5],[0.28,0.55,0.16,0.36],[-0.28,0.55,0.1,0.38],[0.1,0.62,-0.28,0.38],[-0.12,0.72,0,0.36],[0,0.5,0.3,0.34]])part(g,new THREE.SphereGeometry(s,10,8),wool,dx,dy,dz);
  const head=new THREE.Group();head.position.set(0,0.62,0.5);g.add(head);part(head,new THREE.SphereGeometry(0.2,10,8),dk,0,0,0).scale.set(0.85,1,1.15);for(const s of[-1,1]){part(head,new THREE.SphereGeometry(0.045,6,5),M(0xffffff),s*0.09,0.06,0.18);const e=part(head,new THREE.BoxGeometry(0.16,0.05,0.08),dk,s*0.2,0.06,-0.02);e.rotation.z=s*0.4;}
  const bow=part(g,new THREE.TorusGeometry(0.12,0.04,6,12),MB(PCOL[h.player]),0,0.5,0.62);bow.rotation.y=Math.PI/2;   // бантик своего цвета — чтобы узнать своего
  const legs=[];for(const[x,z]of[[-0.2,0.2],[0.2,0.2],[-0.2,-0.2],[0.2,-0.2]])legs.push(part(g,new THREE.CylinderGeometry(0.05,0.05,0.34,5),dk,x,0.17,z));
  g.scale.setScalar(k);g.userData.legs=legs;return g;}
function skinOn(h){if(h.skin)return;h.skin=skinMesh(h);h.g.add(h.skin);h.body.visible=false;h.jumpK=0.55;burst(h.pos.clone().add(new V3(0,0.8,0)),0xffffff,10,2);}
function skinOff(h){if(!h.skin)return;h.g.remove(h.skin);h.skin=null;h.body.visible=true;h.jumpK=null;h.inFlock=false;burst(h.pos.clone().add(new V3(0,0.8,0)),0xffffff,10,3);}
function wade5(h){let k=1;if(h.skin)k*=0.46;if(W.likhos.some(L=>L.ride===h))k*=0.6;return k;}
function flock5(o){const F={path:o.path,y:o.y||0,r:o.r||3.3,sp:o.speed||1.15,k:0,pos:new V3(o.path[0][0],o.y||0,o.path[0][1]),list:[],moving:false,auto:!!o.auto,on:o.on||null};
  const n=o.n||9;for(let i=0;i<n;i++){const m=makeSheep();const a=i/n*Math.PI*2+rand(-0.2,0.2),rr=i===0?0:rand(1.0,F.r*0.9);F.list.push({m,off:new V3(Math.cos(a)*rr,0,Math.sin(a)*rr),ph:rand(0,6),face:rand(0,6)});}
  const ring=new THREE.Mesh(new THREE.RingGeometry(F.r-0.08,F.r,48),MB(0xffffff,{transparent:true,opacity:0.18,depthWrite:false,side:THREE.DoubleSide}));ring.rotation.x=-Math.PI/2;W.group.add(ring);F.ring=ring;
  W.flocks5.push(F);return F;}
function inFlock5(h){if(!h.skin)return null;for(const F of W.flocks5){if(F.on&&!F.on())continue;if(hd(h.pos,F.pos)<F.r+0.2&&Math.abs(h.pos.y-F.y)<1.5)return F;}return null;}
function updateFlocks5(dt){if(!W.flocks5.length)return;
  for(const F of W.flocks5){const en=!F.on||F.on();F.ring.visible=en&&HEROES.some(h=>h.skin);const inside=[0,1].every(pi=>{if(G.solo&&pi!==G.soloPi)return true;const h=active(pi);return h.skin&&hd(h.pos,F.pos)<F.r+0.5;});   // отара ждёт, пока в ней оба управляемых (в одиночку — твой герой)
    const was=F.pos.clone();if(en&&F.k<F.path.length-1&&(inside||F.auto)){const tgt=new V3(F.path[F.k+1][0],F.y,F.path[F.k+1][1]);const d=F.pos.distanceTo(tgt),st=F.sp*dt;if(d<=st){F.pos.copy(tgt);F.k++;}else F.pos.addScaledVector(tgt.sub(F.pos).normalize(),st);}
    const mv=F.pos.distanceTo(was)>0.001;F.moving=mv;const fa=mv?Math.atan2(F.pos.x-was.x,F.pos.z-was.z):null;F.ring.position.set(F.pos.x,F.y+0.05,F.pos.z);
    F.list.forEach((s,i)=>{const w=new V3(Math.sin(G.time*0.5+s.ph)*0.3,0,Math.cos(G.time*0.4+s.ph)*0.3);const p=F.pos.clone().add(s.off).add(w);s.m.g.position.set(p.x,F.y+(mv?Math.abs(Math.sin(G.time*10+i))*0.08:0),p.z);
      if(fa!==null)s.face=angDamp(s.face,fa,3,dt);s.m.g.rotation.y=s.face;s.m.legs.forEach((l,k)=>{l.rotation.x=mv?Math.sin(G.time*12+k*Math.PI+i)*0.45:0;});s.m.head.rotation.x=mv?0:0.5+Math.sin(G.time*2+i)*0.1;});}
  for(const h of HEROES){h.inFlock=!!inFlock5(h);if(h.skin){const L=h.skin.userData.legs;const mv=Math.hypot(h.vel.x,h.vel.z)>0.3;L.forEach((l,k)=>{l.rotation.x=mv?Math.sin(G.time*12+k*Math.PI)*0.5:0;});}}}
/* ---------- пугало-страж (5-1) и пугало-морок (5-4): распутываем как обычно ---------- */
function pugaloFoe(x,z,o){const e=makeFoe('pugalo',x,z,Object.assign({leash:6},o||{}));return e;}
/* ---------- тени-двойники (5-Б1): чёрные копии героев; пять одинаковых защит — 10 секунд бьют тем, против чего она бесполезна ---------- */
let DV_KIND='proshka';
function mimicSig(e,h,s){const P=players[h.player],hard=P.path==='hard';const L=(P.defLog||[]).slice(-5);
  if(e.mimic){if(hard){const last=(P.defLog||[]).slice(-1)[0];if(last&&last!==e.mimic.def){e.mimic=null;floatText(e.pos.clone().add(new V3(0,2.4,0)),'Сбился!','#d8f0ff');return s;}}
    else if(G.time>e.mimic.until){e.mimic=null;return s;}return e.mimic.sig;}
  if(L.length>=5&&L.every(x=>x===L[0])){const sig=L[0]==='g'?'red':'yellow';if(!e.signals.includes(sig))return s;P.defLog=[];e.mimic={def:L[0],sig,until:G.time+10};floatText(e.pos.clone().add(new V3(0,2.4,0)),'Перенял!','#ff9a8a');
    if(!G.flags.mimicTold){G.flags.mimicTold=true;tip(h.player,'Тень запомнила! Пять одинаковых — '+(sig==='red'?'красный: кувыркнись '+K(h.player,'roll')+'.':'жёлтый: щит '+K(h.player,'guard')+'.'),3.6);}return sig;}
  return s;}
function dvoynikFoe(kind,x,z,o){DV_KIND=kind;const e=makeFoe('dvoynik',x,z,Object.assign({leash:9},o||{}));e.pickSig=mimicSig;e.dvKind=kind;return e;}
// хамелей: перенимает ближайший к себе знак — у клубка обычный, у гуслей плюётся каплями, у пера — тень (нужен свет рядом), у клещей раскалён (нужна вода)
const HAM_SIG={clew:['yellow'],gusli:['blue'],pero:['yellow'],kleshi:['yellow','red']};
function hameleyFoe(x,z,o){const e=makeFoe('hameley',x,z,Object.assign({leash:8},o||{}));e.def=Object.assign({},e.def);e.mode='';e.modeT=3;e.wet=false;e.litNow=false;
  const setMode=(nm,quiet)=>{e.mode=nm;e.wet=false;e.signals=HAM_SIG[nm];e.def.ranged=nm==='gusli';const c=SIGN_COL[nm];e.L.bm.color.setHex(c);e.L.bm.emissive.setHex(c);
    if(quiet)return;SFX.swap();burst(e.pos.clone().add(new V3(0,0.8,0)),c,12,2);floatText(e.pos.clone().add(new V3(0,1.8,0)),'Хамелей: '+SIGN_NAME[nm]+'!','#'+c.toString(16).padStart(6,'0'));
    if(!W.flags.hameleyTold){W.flags.hameleyTold=true;for(const pi of[0,1])tip(pi,'Хамелей на знак, что рядом, похож — и слабое место у него меняется',3.2);}};
  const nearest=()=>{let best=null,bd=1e9;for(const s of W.signs){if(s.on&&!s.on())continue;const d=hd(s,e.pos)+Math.abs(s.y-e.pos.y)*2;if(d<bd){bd=d;best=s;}}return best?best.item:'clew';};
  setMode('clew',true);   // выходит обычным — через 3 с перенимает ближайший знак (это и есть подсказка)
  const shut=()=>(e.mode==='pero'&&!e.litNow)||(e.mode==='kleshi'&&!e.wet);e.guardAll=()=>e.state!=='broken'&&shut();e.darkGuard=shut;
  e.tick=(e,dt)=>{e.litNow=litAt(e.pos.x,e.pos.y+0.8,e.pos.z);e.guardText=e.mode==='kleshi'?'раскалён — водой облей!':'во тьме насквозь — пером посвети!';
    if(e.state==='spawn'||e.state==='dying')return;e.modeT-=dt;if(e.modeT<=0){const busy=e.state==='wind'||e.state==='strike'||e.state==='broken';e.modeT=busy?0.5:3;if(!busy){const nm=nearest();if(nm!==e.mode)setMode(nm);}}};
  e.post=e=>{const m=e.L.bm,dark=e.mode==='pero'&&!e.litNow;m.color.setHex(dark?0x2a2230:SIGN_COL[e.mode]);m.emissiveIntensity=dark?0.04:e.mode==='kleshi'&&!e.wet?0.6+0.3*Math.sin(G.time*7):0.25;};
  W.waterTargets.push({pos:e.pos,pri:0,active:()=>e.alive&&e.mode==='kleshi'&&!e.wet,onWater:()=>{e.wet=true;SFX.water();burst(e.pos.clone().add(new V3(0,1,0)),0xe8f4ff,14,3);floatText(e.pos.clone().add(new V3(0,1.6,0)),'Пш-ш! Остыл, притих','#cfe8ff');}});
  return e;}
/* ---------- модели Буяна ---------- */
function makeAlatyr(x,z){const g=new THREE.Group();g.position.set(x,0,z);W.group.add(g);const st=M(0xf4f0e6,{emissive:0x302a20,emissiveIntensity:0.15});
  const b=addMesh(new THREE.DodecahedronGeometry(1.6,1),st,0,1.0,0,g);b.scale.set(1.5,0.8,1.1);const runes=[];
  ['clew','gusli','pero','kleshi'].forEach((it,i)=>{const r=signIcon(it,0.6);r.position.set(-1.35+i*0.9,1.6,0.9+Math.sin(i)*0.1);r.rotation.x=-0.6;g.add(r);r.traverse(o=>{if(o.isMesh){o.material=o.material.clone();o.material.emissiveIntensity=0.05;}});runes.push(r);});
  W.cyls.push({x,z,r:2.2,miny:-1,maxy:1.8,on:true});return {g,runes};}
function makeChest5(){const g=new THREE.Group();W.group.add(g);const wood=M(0x6b3f22),gold=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4}),iron=M(0x3a3a44);
  addMesh(new THREE.BoxGeometry(1.8,1.1,1.2),wood,0,0.55,0,g);const lid=new THREE.Group();lid.position.set(0,1.1,-0.6);g.add(lid);const lg=new THREE.CylinderGeometry(0.6,0.6,1.8,12,1,false,0,Math.PI);lg.rotateZ(Math.PI/2);addMesh(lg,wood,0,0,0.6,lid);
  for(const x of[-0.7,0,0.7])addMesh(new THREE.BoxGeometry(0.1,1.14,1.24),iron,x,0.55,0,g);addMesh(new THREE.BoxGeometry(0.3,0.3,0.08),gold,0,0.8,0.62,g);return {g,lid};}
function makeHare(){const g=new THREE.Group();W.group.add(g);const fur=M(0xc8b8a0),wh=M(0xf4f0e8),dk=MAT.dark;const body=new THREE.Group();g.add(body);
  const b=part(body,new THREE.SphereGeometry(0.45,12,10),fur,0,0.5,0);b.scale.set(0.85,0.9,1.25);part(body,new THREE.SphereGeometry(0.2,8,6),wh,0,0.55,-0.6);
  const head=new THREE.Group();head.position.set(0,0.95,0.45);body.add(head);part(head,new THREE.SphereGeometry(0.3,12,10),fur,0,0,0);for(const s of[-1,1]){part(head,new THREE.SphereGeometry(0.06,8,6),dk,s*0.14,0.06,0.24);}
  part(head,new THREE.SphereGeometry(0.05,6,5),M(0xe08a8a),0,-0.04,0.3);const ears=[];for(const s of[-1,1]){const e=new THREE.Group();e.position.set(s*0.12,0.22,-0.05);head.add(e);part(e,new THREE.CylinderGeometry(0.07,0.09,0.7,6),fur,0,0.35,0);part(e,new THREE.CylinderGeometry(0.04,0.05,0.55,6),M(0xf0c0c0),0,0.36,0.04);ears.push(e);}
  const legs=[];for(const[x,z]of[[-0.2,0.3],[0.2,0.3],[-0.24,-0.25],[0.24,-0.25]])legs.push(part(body,new THREE.CylinderGeometry(0.07,0.08,0.4,6),fur,x,0.2,z));
  return {g,body,head,ears,legs};}
function makeDuck(){const g=new THREE.Group();W.group.add(g);const fe=M(0x8a6a4a),gr=M(0x2a7a4a),bk=M(0xf0a020);const body=new THREE.Group();g.add(body);
  const b=part(body,new THREE.SphereGeometry(0.4,12,10),fe,0,0,0);b.scale.set(0.9,0.8,1.3);const head=new THREE.Group();head.position.set(0,0.35,0.45);body.add(head);part(head,new THREE.SphereGeometry(0.2,10,8),gr,0,0,0);
  const bg=new THREE.BoxGeometry(0.16,0.05,0.22);part(head,bg,bk,0,-0.04,0.22);for(const s of[-1,1])part(head,new THREE.SphereGeometry(0.035,6,5),MAT.dark,s*0.1,0.05,0.13);
  const wings=[];for(const s of[-1,1]){const w=new THREE.Group();w.position.set(s*0.3,0.1,0);body.add(w);part(w,new THREE.BoxGeometry(0.6,0.05,0.4),fe,s*0.3,0,0);wings.push({w,s});}return {g,body,head,wings};}
function makeEgg(s){const g=new THREE.Group();W.group.add(g);const e=addMesh(new THREE.SphereGeometry(0.3,16,12),M(0xf8f0e0,{emissive:0x806040,emissiveIntensity:0.15}),0,0.3,0,g);e.scale.set(0.85,1.15,0.85);
  for(let i=0;i<3;i++){const b=addMesh(new THREE.TorusGeometry(0.26-Math.abs(i-1)*0.06,0.02,5,20),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.5}),0,0.18+i*0.12,0,g);b.rotation.x=Math.PI/2;}g.scale.setScalar(s||1);return {g,shell:e};}
function makeNeedle(s){const g=new THREE.Group();W.group.add(g);const m=M(0xf0f4ff,{emissive:0xa0c8ff,emissiveIntensity:0.6});const n=addMesh(new THREE.CylinderGeometry(0.012,0.03,0.9,6),m,0,0.45,0,g);addMesh(new THREE.TorusGeometry(0.035,0.01,4,10),m,0,0.86,0,g);
  const glow=addMesh(new THREE.SphereGeometry(0.16,10,8),MB(0xd8e8ff,{transparent:true,opacity:0.25,depthWrite:false}),0,0.45,0,g);glow.scale.set(0.6,3.2,0.6);g.scale.setScalar(s||1);return {g,m,glow};}
function makeKidBook(){const g=new THREE.Group();W.group.add(g);const pg=M(0xf4ecd8),cv=M(0x5a7a9a);addMesh(new THREE.BoxGeometry(0.5,0.04,0.36),cv,0,0.02,0,g);
  for(const s of[-1,1]){const p=addMesh(new THREE.BoxGeometry(0.24,0.02,0.34),pg,s*0.125,0.05,0,g);p.rotation.z=-s*0.08;}
  for(let i=0;i<3;i++){const l=addMesh(new THREE.BoxGeometry(0.16,0.005,0.012),MB(0x3a3a6a),-0.13,0.066,-0.1+i*0.05,g);l.rotation.y=rand(-0.2,0.2);}return {g};}
function makeToys(){const g=new THREE.Group();W.group.add(g);const wood=M(0xc89a5a),dk=M(0x6a4a2a);   // деревянный молоточек, свистулька, наковаленка размером с орех
  const ham=new THREE.Group();ham.position.set(-0.4,0.05,0.1);g.add(ham);addMesh(new THREE.CylinderGeometry(0.025,0.025,0.4,6),wood,0,0.03,0,ham).rotation.z=Math.PI/2;addMesh(new THREE.BoxGeometry(0.1,0.1,0.14),dk,0.2,0.05,0,ham);
  const wh=new THREE.Group();wh.position.set(0.05,0.08,0.25);g.add(wh);addMesh(new THREE.SphereGeometry(0.08,8,6),M(0xd86a4a),0,0,0,wh).scale.set(1.3,1,1);addMesh(new THREE.CylinderGeometry(0.02,0.025,0.12,6),M(0xd86a4a),0.12,0.02,0,wh).rotation.z=Math.PI/2;
  const an=new THREE.Group();an.position.set(0.4,0,-0.05);g.add(an);addMesh(new THREE.BoxGeometry(0.1,0.06,0.07),M(0x5a5a64),0,0.09,0,an);addMesh(new THREE.BoxGeometry(0.05,0.06,0.05),M(0x5a5a64),0,0.03,0,an);
  const sack=addMesh(new THREE.SphereGeometry(0.34,10,8),M(0x9a8060),-0.1,0.25,-0.45,g);sack.scale.set(1,0.8,0.9);return {g,ham,wh,an};}
// «пустые рамки»: имена героев пропадают после терема и возвращаются по одному
const HERO_KINDS5=['proshka','potap','pelageya','yosha'];
function heroName(kind){const n=WHO[kind]?WHO[kind][0]:'';if(!G.flags.nameless)return n;return (G.flags.names&&G.flags.names[kind])?n:'';}
function faceTo(h,x,z){h.face=Math.atan2(x-h.pos.x,z-h.pos.z);}
function vestW5(){const v=W.vest;if(v==='demyan')W.ladBonus=0.04;if(v==='kiki4')W.spring=true;}

/* ---------- Мир 5: общие модели — Горыныч с головами, пугало на шесте, цепь-линия ---------- */
function makeGorynych5(s){const G5=makeGorynych();const g=G5.g;g.scale.setScalar(s||1);const sk=M(0x4a8a3a),dk=M(0x2a5a24),ey=M(0xffe060,{emissive:0xffb000,emissiveIntensity:0.9});
  const heads=G5.necks.map((n,i)=>{const hg=new THREE.Group();const x=[-1.6,0,1.6][i];hg.position.set(x*1.12,6.5,3.1);g.add(hg);
    part(hg,new THREE.SphereGeometry(0.78,14,10),sk,0,0,0).scale.set(1,0.85,1.1);const sn=part(hg,new THREE.BoxGeometry(0.9,0.46,0.9),sk,0,-0.14,0.72);
    const jaw=new THREE.Group();jaw.position.set(0,-0.36,0.3);hg.add(jaw);part(jaw,new THREE.BoxGeometry(0.8,0.16,0.9),dk,0,0,0.42);
    for(const sd of[-1,1]){part(hg,new THREE.SphereGeometry(0.13,8,6),ey,sd*0.34,0.24,0.6);part(hg,new THREE.SphereGeometry(0.06,6,5),MAT.dark,sd*0.34,0.24,0.72);const hr=part(hg,new THREE.ConeGeometry(0.1,0.5,5),M(0xe8e0c8),sd*0.35,0.62,-0.1);hr.rotation.z=-sd*0.4;}
    for(const sd of[-1,1])part(hg,new THREE.SphereGeometry(0.05,6,5),MAT.dark,sd*0.16,-0.05,1.18);
    return {g:hg,jaw,base:hg.position.clone()};});
  G5.heads=heads;return G5;}
// где сидят герои на спине Горыныча (в его системе координат)
const GOR_SEATS=[[-0.6,5.0,0.6],[0.7,5.0,0.2],[-0.7,5.0,-1.0],[0.6,5.0,-1.4]];
function chainLine(a,b,col){const g=new THREE.Group();W.group.add(g);const d=b.clone().sub(a),L=d.length(),n=Math.max(2,Math.round(L/0.34));const m=M(col||COL.gold,{emissive:0x806010,emissiveIntensity:0.35});
  const q=new THREE.Quaternion().setFromUnitVectors(new V3(0,1,0),d.clone().normalize());const geo=new THREE.TorusGeometry(0.13,0.04,5,10);
  const im=new THREE.InstancedMesh(geo,m,n),mm=new THREE.Matrix4();for(let i=0;i<n;i++){const p=a.clone().addScaledVector(d,(i+0.5)/n);const qq=q.clone().multiply(new THREE.Quaternion().setFromAxisAngle(new V3(0,1,0),i%2?Math.PI/2:0));mm.compose(p,qq,new V3(1,1.4,1));im.setMatrixAt(i,mm);}
  g.add(im);return g;}
function scarecrowPole(x,z,y){const g=new THREE.Group();g.position.set(x,y||0,z);W.group.add(g);const wood=M(0x7a5634),straw=M(0xd8b860),shirt=M(0x6a5a8a);
  addMesh(new THREE.CylinderGeometry(0.08,0.1,2.6,6),wood,0,1.3,0,g);addMesh(new THREE.BoxGeometry(1.8,0.1,0.1),wood,0,2.0,0,g);addMesh(new THREE.CylinderGeometry(0.3,0.38,0.8,8),shirt,0,1.7,0,g);
  addMesh(new THREE.SphereGeometry(0.28,10,8),M(0xc8b090),0,2.4,0,g);addMesh(new THREE.ConeGeometry(0.36,0.45,10),M(0x5a4a3a),0,2.8,0,g);for(const sd of[-1,1])for(let k=0;k<4;k++){const t=addMesh(new THREE.ConeGeometry(0.04,0.3,4),straw,sd*(0.95+k*0.01),2.0+(k-1.5)*0.04,0,g);t.rotation.z=-sd*Math.PI/2;}
  W.cyls.push({x,z,r:0.3,miny:-1,maxy:(y||0)+2.9,on:true});return {g,top:new V3(x,(y||0)+3.05,z)};}
// четверо, кого выбирали помощниками в Сказах 1–4, — они стоят у дуба в финале
const HELPER5={leshy:['Леший со светлячком',()=>makeLeshy(1)],yaga:['Баба Яга с клубком',()=>makeYaga()],kolobok:['Колобок с пружиной',()=>makeKolobok()],
  sadko:['Садко с гуслями',()=>makeSadko()],kit:['Рыба-кит',()=>makeWhale(12)],rybka:['Золотая рыбка',()=>makeRybka()],
  zhar:['Жар-птица',()=>makeFirebird()],sirin:['Сирин и Алконост',()=>makeSirin('sirin')],yaga3:['Баба Яга со ступой',()=>makeStupa()],
  demyan:['Демьян с молотом',()=>makeSmith('demyan',false)],kiki4:['Кикимора с крепкой куделью',()=>makeKikimora()],leshy4:['Леший со светлячками',()=>makeLeshy(1)]};
function helpers5(){return [1,2,3,4].map(w=>helperOf(w)||['leshy','kit','zhar','demyan'][w-1]);}
// облачка-воспоминания: Сказ по памяти (вместо разворота тетрадки)
function skazClouds(step,cb){G.ui='skaz';const el=$('skaz');el.style.display='flex';let sel=0;const both=[0,1].map(()=>0),ok=[false,false];let diffT=0;
  const cloud=(o,i,on,marks)=>'<div style="margin:8px 0;padding:12px 20px;border-radius:40px;background:'+(on?'#fffbe8':'rgba(244,248,255,.86)')+';box-shadow:0 0 0 3px '+(on?'#ffd76a':'transparent')+',0 6px 18px rgba(0,0,0,.25);font:700 18px Georgia,serif;color:#2a2238;display:flex;gap:8px;align-items:center">'+(marks||'')+'☁ '+o+'</div>';
  const draw=()=>{el.innerHTML='<div style="min-width:min(640px,94vw);padding:20px 26px;border-radius:26px;background:rgba(40,46,80,.72);color:#fff;text-align:center"><div style="font:900 24px Georgia,serif;color:#ffd76a">'+step.title+'</div><div style="opacity:.85;margin:6px 0 10px;font:600 14px system-ui">'+step.sub+'</div>'+
      step.opts.map((o,i)=>cloud(o,i,step.who<2?sel===i:false,step.who===2?[0,1].map(q=>both[q]===i?'<b style="color:'+PCSS[q]+'">'+(ok[q]?'●':'○')+'</b>':'<b style="opacity:0">○</b>').join(''):'')).join('')+
      '<div style="margin-top:10px;font:600 13px system-ui;opacity:.8">'+(step.who===2?'оба: '+K(0,'up')+K(0,'down')+' / '+K(1,'up')+K(1,'down')+' · '+K(0,'jump')+' + '+K(1,'jump')+(diffT>0?' · <b style="color:#ffd76a">Кот ждёт… '+Math.ceil(10-diffT)+'</b>':''):K(step.who,'up')+K(step.who,'down')+' · '+K(step.who,'jump'))+'</div></div>';};
  draw();const n=step.opts.length;
  G.uiTick=()=>{if(step.who<2){const q=UW(step.who),nv=uiNav(q);if(nv.dy||nv.dx){sel=(sel+(nv.dy||nv.dx)+n)%n;SFX.swap();draw();}if(tap(q,'jump')){SFX.ok();G.ui=null;G.uiTick=null;el.style.display='none';cb(sel);}return;}
    for(const q of[0,1]){const nv=uiNav(q);if(nv.dy||nv.dx){both[q]=(both[q]+(nv.dy||nv.dx)+n)%n;ok[q]=false;diffT=0;SFX.swap();draw();}if(tap(q,'jump')){ok[q]=true;if(G.solo){ok[1-q]=true;both[1-q]=both[q];}SFX.plate();draw();}}
    if(ok[0]&&ok[1]){if(both[0]===both[1]){SFX.ok();G.ui=null;G.uiTick=null;el.style.display='none';cb([both[0]]);}
      else{const was=Math.ceil(10-diffT);diffT+=1/60;if(Math.ceil(10-diffT)!==was)draw();if(diffT>=10){SFX.ok();G.ui=null;G.uiTick=null;el.style.display='none';cb([both[0],both[1]]);}}}};}

/* ---------- 5-1: Лебедь, коршун-морок, Голова, белка и хрустальный дом, хрусталики, зеркальце Кощея, живая пятая цепь ---------- */
// Лебедь («Сказка о царе Салтане»): белая, с золотым венцом, во лбу горит звезда
function makeSwan5(){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);const wh=M(0xfbfbff),gr=M(0xe4e6f0),bk=M(0xf08a30),dk=MAT.dark,gold=M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.6});
  const b=part(body,new THREE.SphereGeometry(0.55,14,10),wh,0,0.42,0);b.scale.set(0.85,0.62,1.3);
  const tl=part(body,new THREE.ConeGeometry(0.2,0.45,8),wh,0,0.58,-0.72);tl.rotation.x=-2.1;
  const curve=new THREE.CatmullRomCurve3([new V3(0,0.5,0.38),new V3(0,0.85,0.62),new V3(0,1.25,0.5),new V3(0,1.55,0.4),new V3(0,1.7,0.56)]);
  const neck=part(body,new THREE.TubeGeometry(curve,16,0.085,8,false),wh,0,0,0);part(body,new THREE.SphereGeometry(0.13,10,8),wh,0,0.52,0.4);
  const head=new THREE.Group();head.position.set(0,1.72,0.62);body.add(head);part(head,new THREE.SphereGeometry(0.13,12,10),wh,0,0,0).scale.set(0.9,0.95,1.25);
  const beak=part(head,new THREE.ConeGeometry(0.05,0.24,8),bk,0,-0.035,0.24);beak.rotation.x=Math.PI/2;part(head,new THREE.SphereGeometry(0.045,8,6),dk,0,0.005,0.13);
  for(const s of[-1,1])part(head,new THREE.SphereGeometry(0.026,6,5),dk,s*0.08,0.04,0.05);
  const crown=new THREE.Group();crown.position.set(0,0.12,-0.02);head.add(crown);part(crown,new THREE.CylinderGeometry(0.1,0.115,0.06,10,1,true),gold,0,0,0);
  for(let i=0;i<5;i++){const a=i/5*Math.PI*2;part(crown,new THREE.ConeGeometry(0.024,0.09,4),gold,Math.cos(a)*0.1,0.07,Math.sin(a)*0.1);}
  const star=new THREE.Mesh(starGeo(0.06),MB(0xfff4b0));star.position.set(0,0.06,0.125);star.rotation.x=-0.35;head.add(star);
  const wings=[];for(const s of[-1,1]){const w=new THREE.Group();w.position.set(s*0.36,0.5,0.05);body.add(w);const f=part(w,new THREE.SphereGeometry(0.4,10,8),gr,s*0.12,0,-0.12);f.scale.set(0.32,0.45,1.25);wings.push({w,s});}
  return {g,body,head,neck,wings,star};}
// коршун: нитяной морок Кощея в облике хищной птицы (распутывается, как все мороки)
function makeKite5(){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);const fe=M(0x3a2a24),fe2=M(0x5a3a2a),th=M(0x6a3a8a,{emissive:0x3a1060,emissiveIntensity:0.5}),bk=M(0xe0b040),ey=M(0xffd040,{emissive:0xffa000,emissiveIntensity:1});
  const b=part(body,new THREE.SphereGeometry(0.5,12,10),fe,0,0,0);b.scale.set(0.8,0.7,1.5);
  const head=new THREE.Group();head.position.set(0,0.22,0.78);body.add(head);part(head,new THREE.SphereGeometry(0.3,10,8),fe2,0,0,0);const bk1=part(head,new THREE.ConeGeometry(0.1,0.36,6),bk,0,-0.1,0.3);bk1.rotation.x=Math.PI/2+0.5;
  for(const s of[-1,1])part(head,new THREE.SphereGeometry(0.065,6,5),ey,s*0.15,0.08,0.2);
  part(body,new THREE.BoxGeometry(0.55,0.06,0.75),fe2,0,0.02,-0.98);
  const wings=[];for(const s of[-1,1]){const w=new THREE.Group();w.position.set(s*0.35,0.1,0.1);body.add(w);part(w,new THREE.BoxGeometry(1.6,0.07,0.75),fe,s*0.8,0,0);const c=part(w,new THREE.BoxGeometry(0.95,0.05,0.5),fe2,s*1.95,0,-0.12);c.rotation.y=s*0.22;
    for(let k=0;k<3;k++){const t=part(w,new THREE.CylinderGeometry(0.016,0.016,0.9,4),th,s*(0.5+k*0.65),-0.05,0.3);t.rotation.x=Math.PI/2;}
    wings.push({w,s});}
  for(const s of[-1,1]){const t=part(body,new THREE.ConeGeometry(0.06,0.3,4),bk,s*0.18,-0.42,0.2);t.rotation.x=Math.PI;}
  return {g,body,head,wings};}
// Голова («Руслан и Людмила»): богатырская голова в шлеме, спит и дует; лицом к +z. Веки: rotation.x 1.05 — закрыты, -0.9 — открыты
function makeGolova5(){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);const skin=M(0xd8b48c),skinD=M(0xc49a72),hair=M(0x8a6a3a),steel=M(0x9aa4b0,{emissive:0x202830,emissiveIntensity:0.2}),brass=M(0xc8a040,{emissive:0x604010,emissiveIntensity:0.2}),dk=MAT.dark,wh=M(0xf4f0e6);
  const hd=part(body,new THREE.SphereGeometry(3.2,22,16),skin,0,3.0,0);hd.scale.set(1,1.05,0.95);
  part(body,new THREE.SphereGeometry(3.32,22,10,0,Math.PI*2,0,Math.PI*0.4),steel,0,3.35,-0.08);
  part(body,new THREE.ConeGeometry(1.25,2.8,16),steel,0,7.55,-0.2);part(body,new THREE.SphereGeometry(0.28,10,8),brass,0,9.0,-0.2);
  const band=part(body,new THREE.TorusGeometry(3.08,0.22,8,36),brass,0,4.95,-0.12);band.rotation.x=Math.PI/2+0.08;
  const nasal=part(body,new THREE.BoxGeometry(0.34,1.5,0.3),steel,0,4.55,3.05);nasal.rotation.x=-0.25;
  const brows=[],lids=[];for(const s of[-1,1]){const br=part(body,new THREE.BoxGeometry(1.45,0.36,0.55),hair,s*1.1,4.25,2.72);br.rotation.z=-s*0.16;brows.push(br);
    const e=new THREE.Group();e.position.set(s*1.08,3.7,2.72);body.add(e);part(e,new THREE.SphereGeometry(0.5,12,10),wh,0,0,0);part(e,new THREE.SphereGeometry(0.22,10,8),dk,0,0,0.38);
    const lid=part(e,new THREE.SphereGeometry(0.55,12,8,0,Math.PI*2,0,Math.PI*0.62),skinD,0,0,0);lid.rotation.x=1.05;lids.push(lid);}
  const nose=part(body,new THREE.SphereGeometry(0.75,12,10),skinD,0,2.5,3.12);nose.scale.set(0.9,1.1,1.1);
  for(const s of[-1,1])part(body,new THREE.SphereGeometry(0.19,8,6),dk,s*0.3,2.05,3.66);
  const cheeks=[];for(const s of[-1,1])cheeks.push(part(body,new THREE.SphereGeometry(0.9,12,10),skin,s*1.55,2.35,2.45));
  const mouth=part(body,new THREE.SphereGeometry(0.6,12,8),M(0x4a2020),0,1.2,3.0);mouth.scale.set(1.3,0.3,0.5);
  const must=[];for(const s of[-1,1])for(let i=0;i<7;i++){const t=i/6;const m=part(body,new THREE.SphereGeometry(0.4-t*0.16,10,8),hair,s*(0.38+t*2.25),1.5-t*t*0.8,3.72-t*0.95);m.scale.set(1.35,0.72,0.9);must.push({m,s,t,y:m.position.y});}
  for(const s of[-1,1])for(let i=0;i<5;i++){const b=part(body,new THREE.SphereGeometry(0.58,10,8),hair,s*(1.15+i*0.24),0.6+i*0.13,3.0-i*0.36);b.scale.set(1,1.3,0.9);}
  for(let i=0;i<14;i++){const a=i/14*Math.PI*2;const t=part(body,new THREE.ConeGeometry(0.28,rand(0.7,1.2),5),M(0x7a9a58),Math.cos(a)*3.1,0.3,Math.sin(a)*3.0);t.rotation.z=Math.cos(a)*0.3;}
  const face=new THREE.Object3D();face.position.set(0,2.9,3.1);body.add(face);
  return {g,body,face,brows,lids,nose,cheeks,mouth,must};}
// белка из хрустального дома: рыжая, с золотым орешком в лапках
function makeBelka5(){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);const c=M(0xd8743a),w=M(0xf4e0c0),gold=M(0xffc93c,{emissive:0xb07a10,emissiveIntensity:0.6});
  const b=part(body,new THREE.SphereGeometry(0.3,12,10),c,0,0.42,0);b.scale.set(1,1.3,0.9);part(body,new THREE.SphereGeometry(0.19,10,8),w,0,0.4,0.17).scale.set(1,1.3,0.6);
  const head=new THREE.Group();head.position.set(0,0.88,0.02);body.add(head);part(head,new THREE.SphereGeometry(0.21,12,10),c,0,0,0);
  for(const s of[-1,1]){part(head,new THREE.ConeGeometry(0.06,0.2,4),c,s*0.11,0.22,0);part(head,new THREE.SphereGeometry(0.032,6,5),MAT.dark,s*0.07,0.04,0.18);}
  part(head,new THREE.SphereGeometry(0.03,6,5),M(0x5a2a1a),0,-0.02,0.21);
  const tail=new THREE.Group();tail.position.set(0,0.3,-0.25);body.add(tail);for(let i=0;i<5;i++)part(tail,new THREE.SphereGeometry(0.19-i*0.015,10,8),M(0xc8642a),0,0.1+i*0.19,-Math.sin(i*0.6)*0.22);
  const nut=new THREE.Group();nut.position.set(0,0.62,0.24);body.add(nut);part(nut,new THREE.SphereGeometry(0.07,8,6),gold,0,0,0).scale.set(1,1.2,1);
  return {g,body,head,tail,nut};}
// хрустальный дом под елью: гранёные стены, золотая крыша; в темноте — тусклый
function makeCrystalHouse5(){const g=new THREE.Group();W.group.add(g);const glass=M(0xbfe8ff,{transparent:true,opacity:0.5,emissive:0x406080,emissiveIntensity:0.1}),gold=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.3});
  addMesh(new THREE.CylinderGeometry(1.25,1.35,0.25,6),M(0x8a8478),0,0.12,0,g);addMesh(new THREE.CylinderGeometry(1.1,1.2,1.7,6),glass,0,1.1,0,g);
  const roof=addMesh(new THREE.ConeGeometry(1.4,1.2,6),gold,0,2.55,0,g);addMesh(new THREE.SphereGeometry(0.13,8,6),gold,0,3.2,0,g);
  const glow=addMesh(new THREE.SphereGeometry(1.0,12,8),MB(0xfff0b0,{transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}),0,1.1,0,g);glow.renderOrder=3;
  return {g,glass,gold,glow};}
// хрусталик на камне: гранёный кристалл и две грани-стрелки — куда пойдёт свет (ось)
function makeCrystal5(x,y,z){const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.35,0.48,0.5,6),M(0x8a8478),0,0.25,0,g);
  const piv=new THREE.Group();piv.position.y=1.25;g.add(piv);const mat=M(0xcfefff,{transparent:true,opacity:0.85,emissive:0x60a0c0,emissiveIntensity:0.12});
  const c=addMesh(new THREE.OctahedronGeometry(0.55,0),mat,0,0,0,piv);c.scale.set(0.8,1.3,0.8);
  const ax=new THREE.Group();piv.add(ax);for(const s of[-1,1]){const t=addMesh(new THREE.ConeGeometry(0.13,0.42,4),mat,0,0,s*0.62,ax);t.rotation.x=s*Math.PI/2;}
  W.cyls.push({x,z,r:0.45,miny:-1,maxy:y+1.8,on:true});return {g,piv,ax,mat,pos:new V3(x,y+1.25,z)};}
// зеркальце Кощея: круглое, в медной оправе, с ручкой; отражающая сторона — +z группы face
function makeMirror5(){const g=new THREE.Group();W.group.add(g);const rim=M(0xc88a3a,{emissive:0x604010,emissiveIntensity:0.3}),glass=M(0xe8f4ff,{emissive:0x8ab0d0,emissiveIntensity:0.55});
  const face=new THREE.Group();g.add(face);addMesh(new THREE.TorusGeometry(0.32,0.06,8,24),rim,0,0,0,face);addMesh(new THREE.CircleGeometry(0.3,24),glass,0,0,0.012,face);
  const back=addMesh(new THREE.CircleGeometry(0.31,24),rim,0,0,-0.012,face);back.rotation.y=Math.PI;addMesh(new THREE.CylinderGeometry(0.04,0.05,0.34,6),rim,0,-0.5,0,face);
  const glow=addMesh(new THREE.SphereGeometry(0.5,12,8),MB(0xfff4c0,{transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending}),0,0,0,face);glow.renderOrder=4;
  g.traverse(o=>{o.userData.noBatch=true;});return {g,face,glow};}
// луч: тонкий светящийся цилиндр между двумя точками (хрусталики, зеркальце)
function beamMesh(col,r){const m=new THREE.Mesh(new THREE.CylinderGeometry(r||0.07,r||0.07,1,8,1,true),MB(col||0xfff2b0,{transparent:true,opacity:0.7,depthWrite:false,blending:THREE.AdditiveBlending}));m.renderOrder=4;m.visible=false;m.userData.noBatch=true;W.group.add(m);
  const d=new V3(),Y=new V3(0,1,0);m.set=(a,b)=>{d.subVectors(b,a);const L=d.length();if(L<1e-4){m.visible=false;return;}m.position.copy(a).addScaledVector(d,0.5);m.scale.set(1,L,1);m.quaternion.setFromUnitVectors(Y,d.multiplyScalar(1/L));m.visible=true;};return m;}
// пятая цепь: чёрные звенья по провисающей линии a→b, пересчитываются каждый кадр (один InstancedMesh)
// pts — точки ломаной (конец у лапы, блок на суку, сук над сундуком); на каждом отрезке — провис sag
function chainLive(n){const m=M(0x3e3a46,{emissive:0x14121c,emissiveIntensity:0.3});const im=new THREE.InstancedMesh(new THREE.TorusGeometry(0.13,0.045,5,10),m,n);im.frustumCulled=false;W.group.add(im);
  const mm=new THREE.Matrix4(),q=new THREE.Quaternion(),tw=new THREE.Quaternion(),Y=new V3(0,1,0),p=new V3(),p2=new V3(),d=new V3(),S=new V3(1,1.4,1),L=[];
  const at=(pts,u,out,sag)=>{let acc=0;for(let k=0;k<pts.length-1;k++){const l=L[k];if(u<=acc+l||k===pts.length-2){const t=clamp((u-acc)/(l||1),0,1);out.lerpVectors(pts[k],pts[k+1],t);out.y-=sag*Math.min(1,l/12)*4*t*(1-t);return;}acc+=l;}};
  return {im,set(pts,sag){L.length=0;let tot=0;for(let k=0;k<pts.length-1;k++){const l=pts[k].distanceTo(pts[k+1]);L.push(l);tot+=l;}const step=tot/n;
    for(let i=0;i<n;i++){at(pts,(i+0.5)*step,p,sag);at(pts,Math.min(tot,(i+1)*step),p2,sag);d.subVectors(p2,p);if(d.lengthSq()<1e-8)d.set(0,1,0);d.normalize();
      q.setFromUnitVectors(Y,d);tw.setFromAxisAngle(Y,i%2?Math.PI/2:0);q.multiply(tw);mm.compose(p,q,S);im.setMatrixAt(i,mm);}im.instanceMatrix.needsUpdate=true;im.visible=true;}};}
