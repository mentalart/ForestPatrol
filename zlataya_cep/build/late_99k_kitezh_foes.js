/* ============================== РЕЛИЗ final06 · МИР 2: ЖЕМЧУЖНИЦА И ЩУКИ, ЧТО ПЛАВАЮТ ============================== */
// Под водой рыба не лежит на дне. Щука мира 2 теперь плавает свободно: кружит над дном, а заметив героя у своей воды, подплывает на его
// глубину, держится в 4–5 м и пускает синюю каплю (отбей — «сама себя», Пробой: оглушённая, опускается к дну — бей). От воды на участке не зависит.
// А на дне живёт новый морок — Жемчужница (pearlClam): огромная ракушка. Створки закрыты — не пробить. Приоткрывается, жемчужина
// разгорается синим — и летит в героя: отбей её обратно в раскрытые створки — Пробой. Вода ушла (отлив гуслями) — Жемчужница
// ахает и раскрывается настежь — тоже Пробой. Стоит на месте — ей и положено лежать на дне.
FOE.zhemchug={r:0.85,emb:3,sig:['blue'],sp:0,look:'clam',col:[0x6f6098,0xb8a8dc,0x4e4278,0xf2ecfa],ranged:true,selfBreak:true};
// облик: чаша, створка на петле с рёбрами-веером и бахромой, перламутр изнутри, розовая мантия, жемчужина, кустики водорослей
FL.clam=(inner,def)=>{const c=def.col;const body=new THREE.Group();inner.add(body);const shM=M(c[0]),rbM=M(c[1]),dkM=M(c[2]),inM=M(0xf0a6bc),wd=M(0x4f8a4a);
  const bot=new THREE.Mesh(new THREE.SphereGeometry(1,16,6,0,Math.PI*2,Math.PI/2,Math.PI/2),shM);bot.scale.set(0.98,0.42,0.82);bot.position.y=0.44;body.add(bot);
  for(let i=0;i<7;i++){const a=(i-3)*0.36,r=new THREE.Mesh(new THREE.TorusGeometry(1,0.045,4,12,Math.PI),dkM);r.rotation.set(Math.PI,a+Math.PI/2,0);bot.add(r);}
  const mant=new THREE.Mesh(new THREE.CircleGeometry(0.86,18),inM);mant.rotation.x=-Math.PI/2;mant.scale.set(1.08,0.92,1);mant.position.y=0.42;body.add(mant);
  for(let i=0;i<12;i++){const t=i/12*Math.PI*2,f=new THREE.Mesh(new THREE.ConeGeometry(0.07,0.2,4),inM);f.position.set(Math.cos(t)*0.86,0.46,Math.sin(t)*0.72);f.rotation.z=Math.cos(t)*0.6;f.rotation.x=-Math.sin(t)*0.6;body.add(f);}
  const pearl=new THREE.Mesh(new THREE.SphereGeometry(0.22,16,12),M(0xeef8ff,{emissive:0x9fd8ff,emissiveIntensity:0.7}));pearl.position.set(0,0.62,0.12);body.add(pearl);
  const lid=new THREE.Group();lid.position.set(0,0.44,-0.8);body.add(lid);
  const top=new THREE.Mesh(new THREE.SphereGeometry(1,16,6,0,Math.PI*2,0,Math.PI/2),shM);top.scale.set(0.98,0.52,0.82);top.position.z=0.8;lid.add(top);
  // изнанка створки — перламутр (видна, когда раскрылась)
  const nac=M(0xf6e6f0,{side:THREE.BackSide,emissive:0x6a5a88,emissiveIntensity:0.25});const tin=new THREE.Mesh(new THREE.SphereGeometry(0.97,16,6,0,Math.PI*2,0,Math.PI/2),nac);top.add(tin);
  const bin=new THREE.Mesh(new THREE.SphereGeometry(0.97,16,6,0,Math.PI*2,Math.PI/2,Math.PI/2),nac);bot.add(bin);
  for(let i=0;i<7;i++){const a=(i-3)*0.36,r=new THREE.Mesh(new THREE.TorusGeometry(1,0.05,4,14,Math.PI),rbM);r.rotation.y=a+Math.PI/2;top.add(r);}
  for(let i=0;i<16;i++){const t=i/16*Math.PI*2;if(Math.sin(t)<-0.7)continue;const f=new THREE.Mesh(new THREE.ConeGeometry(0.06,0.18,4),rbM);f.position.set(Math.cos(t)*0.95,-0.03,0.8+Math.sin(t)*0.8);f.rotation.x=Math.PI;lid.add(f);}
  for(const [x,z,h] of[[-0.32,0.62,0.7],[0.18,0.42,0.9],[0.4,0.9,0.55]]){const w=new THREE.Mesh(new THREE.ConeGeometry(0.07,h,4),wd);w.position.set(x,0.46+h/2,z);w.rotation.z=x*0.5;lid.add(w);}
  return {eyeY:0.56,eyeZ:0.78,eyeX:0.3,eyeS:1.15,top:1.05,lid:hp(c[0]),clamLid:lid,pearl,fish:body,noThreads:true};};
// жемчужина вместо капли (летит та же «синяя капля»: щит держит, вовремя — назад)
{const _sb=spawnBolt;spawnBolt=function(e,h){_sb(e,h);if(!e||e.kind!=='zhemchug')return;const b=W.bolts[W.bolts.length-1];if(!b)return;W.group.remove(b.g);
  const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.SphereGeometry(0.2,14,10),M(0xf4fbff,{emissive:0x9fd8ff,emissiveIntensity:1.2})));
  g.add(new THREE.Mesh(new THREE.SphereGeometry(0.42,12,10),MB(0x9fd8ff,{transparent:true,opacity:0.28,depthWrite:false})));g.position.copy(b.p);W.group.add(g);b.g=g;b.p=g.position;};}
function pearlClam(x,z,zone,bed,o){const e=makeFoe('zhemchug',x,z,Object.assign({y:bed,leash:0.3},o||{}));e.zone=zone;e.bed=bed;e.clam=true;e.noMove=true;e.lidK=0;e.zst=zone?zone.state:null;
  e.guardAll=()=>e.state!=='broken'&&e.state!=='dying';e.guardText='Створки закрыты! Отбей жемчужину назад — или отлив сыграй: ахнет';
  e.tick=(e,dt)=>{e.spMul=0;e.pos.y=damp(e.pos.y,e.bed,8,dt);e.baseY=e.bed;
    // вода ушла — ахнула и раскрылась
    if(e.zone&&e.zone.state!==e.zst){const was=e.zst;e.zst=e.zone.state;if(was==='high'&&e.zst==='low'&&e.state!=='broken'&&e.state!=='dying'&&e.state!=='spawn'&&e.embers>0){emberOut(e,e.embers,'Ах! Воды нет —');SFX.splash();
      for(let i=0;i<8;i++)burst(e.pos.clone().add(new V3(rand(-0.6,0.6),0.8,rand(-0.6,0.6))),0xcff8ff,3,2);}}};
  e.post=(e,dt)=>{const L=e.L,st=e.state,w=st==='wind'||st==='ready',kw=st==='wind'?clamp(e.t/Math.max(0.1,e.wdur),0,1):0;
    const want=st==='broken'?1.05:st==='dying'?1.2:st==='strike'?0.8:w?0.3+0.35*kw:0.07+0.04*Math.sin(G.time*1.3+e.home.x);
    e.lidK=damp(e.lidK,want,st==='strike'?16:5,dt||0.016);L.clamLid.rotation.x=-e.lidK;
    e.body.rotation.set(0,0,0);e.body.position.set(0,0,0);e.body.scale.set(1,1,1);   // ракушка не кивает и не бросается вперёд
    L.pearl.visible=st!=='broken'&&st!=='dying'&&st!=='strike';L.pearl.material.emissiveIntensity=w?1.1+0.7*Math.abs(Math.sin(G.time*14)):0.55;
    if(w&&Math.random()<(dt||0.016)*10)burst(e.pos.clone().add(new V3(0,0.9,0.3).applyAxisAngle(new V3(0,1,0),e.face)),0x9fd8ff,1,0.8,0.4);};
  return e;}
FIN.pearlClam=pearlClam;
// щука мира 2 плавает свободно: над дном, на глубине героя, держит дистанцию; оглушённая опускается к дну
{const _pk=pike;pike=function(x,z,zone,bed,o){if(!W||W.world!==2)return _pk(x,z,zone,bed,o);
  const g0=groundAt(x,z,(bed||0)+4).y,fl0=g0>-1e8?g0:(bed||0);
  const e=makeFoe('shchuka',x,z,Object.assign({y:fl0+1.3,leash:7},o||{}));e.zone=zone;e.bed=bed;e.swim=true;e.flop=false;e.sideOpen=false;e.noMove=true;e.ph=rand(0,6);e.circ=rand(0,6);
  // своя вода — участок с запасом 1,5 м: за стенку соседнего канала щука не стреляет
  const atWater=h=>!zone||(h.pos.x>zone.minx-1.5&&h.pos.x<zone.maxx+1.5&&h.pos.z>zone.minz-1.5&&h.pos.z<zone.maxz+1.5);
  const swimTo=(e,dx,dz,sp,dt)=>{const nx=e.pos.x+dx*sp*dt,nz=e.pos.z+dz*sp*dt;if(hd(new V3(nx,0,nz),e.home)>e.leash)return;const r=collideXZ(nx,nz,e.r,e.pos.y,e.pos.y+0.9,true);e.pos.x=r.x;e.pos.z=r.z;};
  e.tick=(e,dt)=>{e.spMul=1;e.flop=false;if(e.state==='spawn'||e.state==='dying')return;
    const gy=groundAt(e.pos.x,e.pos.z,e.pos.y+1.2).y,floor=gy>-1e8?gy:fl0;const h=foeTarget(e),own=h&&atWater(h),near=own&&hd(h.pos,e.pos)<11;
    if(h&&!own&&(e.state==='idle'||e.state==='recover'))e.cd=Math.max(e.cd,0.6);   // герой не у её воды (за стеной, на берегу) — не стреляет
    let ty=floor+1.3;if(e.state==='broken')ty=floor+0.45;else if(near)ty=Math.max(floor+0.5,h.pos.y+0.55);ty+=Math.sin(G.time*1.6+e.ph)*0.15;
    e.pos.y=damp(e.pos.y,ty,e.state==='broken'?3:2.2,dt);e.baseY=e.pos.y;
    if(e.state==='idle'||e.state==='recover'){
      if(near){const dx=h.pos.x-e.pos.x,dz=h.pos.z-e.pos.z,d=Math.hypot(dx,dz)||1;e.circ+=dt*0.5;
        // держит дистанцию 4–5 м и обходит сбоку
        const k=d>5.2?1:d<3.6?-0.8:0,sx=-dz/d,sz=dx/d,sd=Math.sin(e.circ)>0?1:-1;swimTo(e,dx/d*k+sx*0.35*sd,dz/d*k+sz*0.35*sd,1.9,dt);e.face=angDamp(e.face,Math.atan2(dx,dz),5,dt);}
      else{e.circ+=dt*0.55;const tx=e.home.x+Math.cos(e.circ)*2.8,tz=e.home.z+Math.sin(e.circ)*2.8,dx=tx-e.pos.x,dz=tz-e.pos.z,d=Math.hypot(dx,dz);
        if(d>0.1)swimTo(e,dx/d,dz/d,1.5,dt);e.face=angDamp(e.face,Math.atan2(dx,dz),3,dt);}}};
  e.post=(e,dt)=>{const L=e.L,st=e.state;if(L.tail)L.tail.rotation.y=Math.sin(G.time*(st==='broken'?3:8)+e.ph)*(st==='broken'?0.15:0.38);
    if(L.jaw)L.jaw.rotation.x=st==='wind'?0.5:0.05;if(st!=='broken'&&st!=='stagger'){e.body.rotation.x=0;e.body.rotation.z=Math.sin(G.time*1.8+e.ph)*0.07;}
    if(L.fish)L.fish.position.y=0.12;};
  return e;};}
