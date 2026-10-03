/* ============================== 1-5 «КИКИМОРИНА ПРЯЛКА» ============================== */
// кульминация мира: паутинка крест-накрест (держат двое — прыгают двое) · тянущая прялка · Совиный взор: старая нить · нитяные мороки на чердаке
function holdRing(x,y,z,pi){const g=new THREE.Group();g.position.set(x,y+0.03,z);W.group.add(g);const m=MB(PCOL[pi],{transparent:true,opacity:0.8});
  const r=new THREE.Mesh(new THREE.TorusGeometry(0.7,0.07,6,28),m);r.rotation.x=Math.PI/2;g.add(r);const r2=new THREE.Mesh(new THREE.TorusGeometry(0.38,0.05,6,20),m);r2.rotation.x=Math.PI/2;g.add(r2);
  return {g,m,x,y,z,pi};}
function build15(){
  W.zvenAway=true;   // Звенышко улетает вперёд и появляется, только когда нужно
  setTheme('barn');W.name='1-5 · «Кикиморина прялка»';W.sub='Дремучий лес · старый овин · паутинка крест-накрест';W.camX=8.5;const F=W.flags;
  W.abil.clew=true;W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.threadLife=10;
  /* ---------- овин: пол, стены, галерея (4 м), чердак (8 м) ---------- */
  ground(-10,10,-34,4,0,M(0x9a7a50),M(0x6a5030));
  const wm=M(0x6a4a2a),wd=M(0x4a3218);colBox(-10.4,-10,-1,16,-34.4,4);colBox(10,10.4,-1,16,-34.4,4);colBox(-10.4,10.4,-1,16,-34.4,-34);colBox(-10.4,10.4,-1,16,4,4.4);
  {const bw=W.group.children.length;addMesh(new THREE.BoxGeometry(20.8,16,0.4),wm,0,8,-34.2);for(const s of[-1,1])addMesh(new THREE.BoxGeometry(0.4,16,38.4),wm,s*10.2,8,-15);
    for(let z=2;z>-34;z-=4)for(const s of[-1,1])addMesh(new THREE.BoxGeometry(0.5,16,0.5),wd,s*9.9,8,z);
    for(let i=0;i<5;i++){const r=addMesh(new THREE.BoxGeometry(0.4,0.4,38),wd,-8+i*4,15.4,-15);r.castShadow=false;}fadeable(since(bw));}
  const gal=W.group.children.length;box(-10,-5.5,0,3.4,-30,-6,M(0x7a5634),{occ:false});addMesh(new THREE.BoxGeometry(4.5,0.12,24),M(0x9a7a50),-7.75,3.42,-18);
  for(let z=-7;z>-30;z-=3.2)addMesh(new THREE.BoxGeometry(0.3,3.4,0.3),wd,-5.7,1.7,z);
  box(-10,5,0,7,-34,-29.5,M(0x7a5634),{occ:false});addMesh(new THREE.BoxGeometry(15,0.12,4.5),M(0x9a7a50),-2.5,7.02,-31.75);fadeable(since(gal));
  for(let i=0;i<5;i++){const h=addMesh(new THREE.BoxGeometry(1.4,0.9,1),M(0xd8b04a),rand(3,8.5),0.45,rand(-8,-2));h.rotation.y=rand(0,3);}   // сено
  lantern(-9.2,2,4);lantern(9.2,-4,0);lantern(-9.2,-20,3.4);lantern(-9.2,-32,7);
  /* ---------- эпичный овин: лучи из окон, лунное окно, пыль, нити от прялки, кудель и мотки ---------- */
  {const env=W.group.children.length;
    const rayM=MB(0xfff0c0,{transparent:true,opacity:0.07,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending});
    for(const[z,w]of[[-4,2.2],[-12,2.6],[-20,2.2],[-27,2.4]]){const win=new THREE.Mesh(new THREE.PlaneGeometry(1.4,1.1),MB(0xffe8b0));win.rotation.y=Math.PI/2;win.position.set(-9.98,12.2,z);W.group.add(win);
      const r=new THREE.Mesh(new THREE.PlaneGeometry(w,17),rayM);r.position.set(-4.5,6.6,z+0.6);r.rotation.set(0,Math.PI/2,-0.62);r.castShadow=false;W.group.add(r);}
    const moon=new THREE.Mesh(new THREE.CircleGeometry(1.6,28),MB(0xdfe8ff));moon.position.set(-2.5,12.4,-33.98);W.group.add(moon);
    const mf=addMesh(new THREE.TorusGeometry(1.65,0.14,8,30),M(0x4a3218),-2.5,12.4,-33.9);for(let i=0;i<2;i++){const b=addMesh(new THREE.BoxGeometry(i?0.12:3.3,i?3.3:0.12,0.1),M(0x4a3218),-2.5,12.4,-33.88);}
    const mr=new THREE.Mesh(new THREE.CylinderGeometry(1.4,2.6,12,16,1,true),MB(0xcfe0ff,{transparent:true,opacity:0.06,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending}));mr.position.set(-2.5,7,-30.5);mr.rotation.x=-0.5;W.group.add(mr);
    const ml=new THREE.PointLight(0xb8ccff,0.9,16,2);ml.position.set(-2.5,11,-31.5);W.group.add(ml);
    const fire=new THREE.PointLight(0xffa050,1.2,14,2);fire.position.set(5.5,3,-16);W.group.add(fire);W.barnFire=fire;
    // кудель и мотки пряжи под крышей, веретёна на стене, паутина по углам, солома
    for(let i=0;i<12;i++){const x=rand(-8,8),z=rand(-32,0);addMesh(new THREE.CylinderGeometry(0.01,0.01,1.4,4),M(0x6a4a2a),x,14.3,z);const c=addMesh(new THREE.ConeGeometry(0.32,1.2,7),M([0xd8c08a,0xc8a868][i%2]),x,13.1,z);c.rotation.x=Math.PI;}
    for(let i=0;i<10;i++){const z=-2-i*3.1;const sk=addMesh(new THREE.TorusGeometry(0.28,0.1,6,14),M([0xc0302a,0x3a6ad0,0xe0b020,0x3f8a45,0x9a4a6a][i%5]),9.85,4.4+(i%3)*1.6,z);sk.rotation.y=Math.PI/2;}
    for(let i=0;i<7;i++){const sp=new THREE.Group();sp.position.set(9.7,2+i*1.3,-8-i*2.6);W.group.add(sp);addMesh(new THREE.ConeGeometry(0.08,0.4,6),M(0xd8c8a0),0,0.2,0,sp);const c2=new THREE.ConeGeometry(0.08,0.4,6);c2.rotateX(Math.PI);addMesh(c2,M(0xd8c8a0),0,-0.2,0,sp);}
    for(const[x,y,z]of[[-9.7,14,-33.7],[9.7,14,-33.7],[-9.7,9,2],[9.7,10,3]])for(let k=0;k<4;k++){const w=new THREE.Mesh(new THREE.TorusGeometry(0.3+k*0.28,0.012,4,20,Math.PI/2),MB(0xe8e8f0,{transparent:true,opacity:0.5}));w.position.set(x,y,z);w.rotation.y=x<0?0:Math.PI;w.rotation.z=y>12?-Math.PI/2:Math.PI;W.group.add(w);}
    for(let i=0;i<70;i++){const st=addMesh(new THREE.BoxGeometry(0.5,0.02,0.04),M(0xd8b04a),rand(-9.5,9.5),0.02,rand(-33,3));st.rotation.y=rand(0,3.14);st.castShadow=false;}
    // нити от прялки расходятся по всему овину
    W.barnThreads=[];const hub=new V3(7.2,6.5,-18);for(let i=0;i<16;i++){const to=i<7?new V3(9.7,2+i*1.3,-8-i*2.6):new V3(rand(-8,8),15.2,rand(-32,1));
      const m=new THREE.Mesh(new THREE.CylinderGeometry(0.018,0.018,1,4),MB(0xd8d8e4,{transparent:true,opacity:0.55}));m.position.copy(hub).add(to).multiplyScalar(0.5);m.scale.y=hub.distanceTo(to);
      m.quaternion.setFromUnitVectors(new V3(0,1,0),to.clone().sub(hub).normalize());W.group.add(m);W.barnThreads.push(m);}
    // пыль в лучах
    const n=140,pos=new Float32Array(n*3);for(let i=0;i<n;i++){pos[i*3]=rand(-9,9);pos[i*3+1]=rand(0.5,14);pos[i*3+2]=rand(-33,2);}
    const dg=new THREE.BufferGeometry();dg.setAttribute('position',new THREE.BufferAttribute(pos,3));const dust=new THREE.Points(dg,new THREE.PointsMaterial({color:0xfff0c8,size:0.06,transparent:true,opacity:0.7}));W.group.add(dust);W.barnDust=dust;
    // проём ворот
    for(const x of[-9.6,9.6])addMesh(new THREE.BoxGeometry(0.6,16,0.6),M(0x4a3218),x,8,3.8);
  }
  bell(3,2);bell(-8.6,-10,3.4);bell(-8.6,-31,7);
  const Z=makeZven();W.zven=Z;Z.pos.set(0,2.4,0);
  /* ---------- прялка до крыши и Кикимора ---------- */
  const wheel=new THREE.Group();wheel.position.set(7.2,6.5,-18);wheel.rotation.y=Math.PI/2;W.group.add(wheel);
  {const wmat=M(0x8a5a32);const rim=new THREE.Mesh(new THREE.TorusGeometry(5,0.22,8,40),wmat);wheel.add(rim);for(let i=0;i<10;i++){const sp=new THREE.Mesh(new THREE.BoxGeometry(0.14,9.8,0.14),wmat);sp.rotation.z=i/10*Math.PI;wheel.add(sp);}
    wheel.add(new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.5,0.8,12).rotateX(Math.PI/2),M(0x5a3a1a)));}
  const stand=W.group.children.length;for(const dz of[-1,1]){const l=addMesh(new THREE.BoxGeometry(0.4,7,0.4),M(0x5a3a1a),8.4,3.3,-18+dz*2.4);l.rotation.x=dz*0.3;}fadeable(since(stand));
  W.cyls.push({x:8.2,z:-18,r:1.6,miny:-1,maxy:12,on:true});
  const kiki=makeKikimora();kiki.g.position.set(4.3,0,-18);kiki.g.rotation.y=-Math.PI/2;W.cyls.push({x:4.3,z:-18,r:0.7,miny:-1,maxy:2.2,on:true});
  const yarn=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,1,5),MB(0xd8d8e4));W.group.add(yarn);
  const keyThread=new THREE.Group();W.group.add(keyThread);keyThread.visible=false;{const kt=new THREE.Mesh(new THREE.CylinderGeometry(0.015,0.015,1.2,5),MB(0x101010));kt.position.y=0.6;keyThread.add(kt);
    const key=new THREE.Group();key.position.y=-0.05;keyThread.add(key);part(key,new THREE.TorusGeometry(0.07,0.02,6,14),M(0x303030),0,0.06,0);part(key,new THREE.BoxGeometry(0.03,0.18,0.03),M(0x303030),0,-0.06,0);}
  const spMark=new THREE.Group();W.group.add(spMark);{const mr=new THREE.Mesh(new THREE.TorusGeometry(0.34,0.05,8,24),M(COL.gold,{emissive:COL.gold,emissiveIntensity:0.9}));mr.rotation.y=Math.PI/2;spMark.add(mr);spMark.add(acornMesh(1.5));}
  spMark.visible=false;
  /* ---------- колышки: по два на стене, кольца — где встать держащим ---------- */
  const S0=[stake(-5.2,-11.9,0,{h:0.6}),stake(-5.2,-20.1,0,{h:0.6})];
  const R0=[holdRing(-1.8,0,-20.2,0),holdRing(-1.8,0,-11.8,1)];
  const S1=[stake(-9.6,-29.3,3.4,{h:0.6}),stake(-5.9,-29.3,3.4,{h:0.6})];
  const R1=[holdRing(-5.9,3.4,-25,0),holdRing(-9.6,3.4,-25,1)];
  const S2=[stake(-6,-33.7,7,{h:0.6}),stake(1,-33.7,7,{h:0.6})];
  const R2=[holdRing(1,7,-30.1,0),holdRing(-6,7,-30.1,1)];
  const rings=[R0,R1,R2];
  // подсказки контурами: кто встаёт в кольцо, куда летит клубок, кто прыгает с паутинки и куда
  const STK=[S0,S1,S2];const WEBC=[new V3(-3.5,0.26,-16),new V3(-7.75,3.66,-27.15),new V3(-2.5,7.26,-31.9)];const LAND=[new V3(-7.6,3.4,-16),new V3(-7.75,7,-31.6),null];
  const ghostOf=(kind,x,y,z,face)=>{const g=buildHeroMesh(kind,true).g;g.position.set(x,y,z);g.rotation.y=face;W.group.add(g);return g;};
  const guides=rings.map((R,i)=>R.map(r=>{const st=STK[i][r.pi],kind=r.pi?(i===1?'yosha':'pelageya'):(i===1?'potap':'proshka');
    const face=Math.atan2(st.x-r.x,st.z-r.z);const gh=ghostOf(kind,r.x,r.y,r.z,face);
    const dots=[];const L=Math.hypot(st.x-r.x,st.z-r.z);for(let k=1;k<L;k+=0.8){const d=new THREE.Mesh(new THREE.SphereGeometry(0.07,6,5),MB(PCOL[r.pi],{transparent:true,opacity:0.8}));
      d.position.set(r.x+(st.x-r.x)*k/L,r.y+0.15,r.z+(st.z-r.z)*k/L);W.group.add(d);dots.push(d);}
    const arrow=new THREE.Mesh(new THREE.ConeGeometry(0.28,0.6,4),MB(PCOL[r.pi]));arrow.rotation.x=Math.PI;W.group.add(arrow);
    return {r,gh,dots,arrow,st,floor:i};}));
  const jumpG=[0,1].map(i=>{const c=WEBC[i],t=LAND[i];const g=new THREE.Group();W.group.add(g);
    for(let k=1;k<12;k++){const u=k/12,y=lerp(c.y,t.y,u)+Math.sin(u*Math.PI)*2.4;const d=new THREE.Mesh(new THREE.SphereGeometry(0.09,6,5),MB(0xfff2b0,{transparent:true,opacity:0.85}));d.position.set(lerp(c.x,t.x,u),y,lerp(c.z,t.z,u));g.add(d);}
    const land=new THREE.Mesh(new THREE.TorusGeometry(0.7,0.08,6,26),MB(0xfff2b0,{transparent:true,opacity:0.85}));land.rotation.x=Math.PI/2;land.position.set(t.x,t.y+0.05,t.z);g.add(land);
    const jg=[ghostOf(i?'yosha':'potap',c.x+0.5,c.y,c.z+0.4,Math.atan2(t.x-c.x,t.z-c.z)),ghostOf(i?'pelageya':'proshka',c.x-0.5,c.y,c.z-0.4,Math.atan2(t.x-c.x,t.z-c.z))];jg.forEach(q=>g.add(q));
    g.visible=false;return {g,c,t,jg};});
  linkItem(-4.4,3.2,-16);linkItem(-7.75,6.6,-28.4);const highLink=linkItem(-2.5,11.8,-31.9);W.linkTotal++;   // четвёртое отдаст Кикимора
  nutItem(8.5,0.6,-3);nutItem(-8.4,4.0,-8);nutItem(4,7.6,-33);nutItem(-9.3,4.0,-28.3);nutItem(8.8,1.0,-27,{owl:true});
  /* ---------- старая сказочная нить: видна только Совиным взором, рвётся ударом ---------- */
  const hook=new V3(-5.9,4.5,-9.5),wheelHub=new V3(7.2,6.5,-18);
  const old=new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,1,6),MB(0xdfe8ff,{transparent:true,opacity:0}));W.group.add(old);
  {const mid=hook.clone().add(wheelHub).multiplyScalar(0.5);old.position.copy(mid);old.scale.y=hook.distanceTo(wheelHub);old.quaternion.setFromUnitVectors(new V3(0,1,0),wheelHub.clone().sub(hook).normalize());}
  const hookM=addMesh(new THREE.TorusGeometry(0.22,0.05,6,16),M(0x8a8a90),hook.x,hook.y,hook.z);hookM.rotation.y=Math.PI/2;
  W.hittables.push({pos:new V3(hook.x+0.4,3.4,hook.z),r:1.2,alive:()=>W.owlT>0&&!F.cut,onHit:h=>{F.cut=true;SFX.rip();burst(hook.clone(),0xdfe8ff,16,4);old.visible=false;F.pullT=0;F.warn=false;
    banner('Старая нить перерезана — прочь!','#dfe8ff',2.2,'прялка струн наших больше не утянет');bark(kiki,'kiki','Пряди… пряди?.. Что за диво…',2);}});
  /* ---------- стычки ---------- */
  const floorFoes={started:false,list:[]};
  const arena={x:-2.5,y:7,z:-31.6,r:7.5,started:false,cleared:false,hold:0,list:[]};arena.camActive=()=>arena.started&&(!arena.cleared||arena.hold>0);W.camZones.push(arena);
  F.pullT=0;F.warn=false;F.stumble=0;
  // во время боя на чердаке край закрывает перильце — с паутинок не свалиться
  const rails=[colBox(-10,5,7,8.6,-29.8,-29.4,false),colBox(4.9,5.3,7,8.6,-34,-29.4,false)];rails.forEach(r=>{r.on=false;});
  const railM=new THREE.Group();W.group.add(railM);railM.visible=false;{const rm=M(0x8a5a32);addMesh(new THREE.BoxGeometry(15,0.12,0.14),rm,-2.5,8.0,-29.6,railM);addMesh(new THREE.BoxGeometry(0.14,0.12,4.6),rm,5.1,8.0,-31.7,railM);for(let x=-9.5;x<5;x+=1.5)addMesh(new THREE.BoxGeometry(0.1,1,0.1),rm,x,7.5,-29.6,railM);}
  function tear(){let n=0;for(const t of W.threads.slice())if(t.string&&!t.sag){n++;floatText(new V3(t.sx+t.dx*t.len/2,t.y+0.8,t.sz+t.dz*t.len/2),'Прялка нить утянула!','#d8d8e4');removeThread(t);}
    if(n){SFX.rip();tip(0,'Струну утянуло, клубок воротился — бросай опять!',2.2);tip(1,'Струну утянуло, клубок воротился — бросай опять!',2.2);}}
  W.marks.push({pos:new V3(4.0,1.2,-17.5),active:()=>F.warn&&!F.done,onHit:()=>{F.warn=false;F.pullT=0;F.stumble=3;SFX.latch();SFX.keys();banner('Колесо споткнулось!','#ffd9a0',1.6,'три секунды молчит — и снова полминуты кружится');}});
  W.updates.push(dt=>{
    // прялка: каждые 20 с разгоняется, 4 с струны мигают — потом утягивает; жёлудь в веретено — пауза
    if(!F.pullOn&&HEROES.some(h=>h.pos.y>2.9)){F.pullOn=true;F.pullT=0;later(0.5,()=>bark(kiki,'kiki','<i>(замечает вас)</i> Пряди. Пряди! Прочь от прялки!',2));}   // на середине Кикимора замечает нас
    const going=F.stage==='play'&&F.pullOn&&!F.cut&&!G.cine&&!F.done;F.stumble=Math.max(0,F.stumble-dt);
    if(going&&F.stumble<=0){F.pullT+=dt;if(F.pullT>28&&!F.warn){F.warn=true;SFX.keys();banner('Прялка нити тянет-вьёт!','#d8d8e4',2,'струны мигают — в веретено из рогатки! Иль Совиным взором старую нить найди');say('kiki','Пряди. Пряди. День и ночь.',2);}
      if(F.pullT>34){F.warn=false;F.pullT=0;tear();}}
    W.blink=F.warn;spMark.visible=F.warn;
    wheel.rotation.x-=dt*(F.stumble>0?0:F.warn?5:F.done?0:0.8);kiki.body.rotation.y=Math.sin(G.time*(F.warn?9:3))*0.12;kiki.spindle.rotation.y+=dt*(F.warn?20:F.done?0:6);
    const sp=new V3();kiki.spindle.getWorldPosition(sp);spMark.position.copy(sp).add(new V3(0,0.15,0.15));
    if(!F.done){const top=new V3(7.2,6.5+Math.sin(G.time*0.8+wheel.rotation.x)*4.6,-18+Math.cos(wheel.rotation.x)*4.6),mid=top.clone().add(sp).multiplyScalar(0.5);yarn.visible=true;yarn.position.copy(mid);yarn.scale.y=top.distanceTo(sp);yarn.quaternion.setFromUnitVectors(new V3(0,1,0),top.clone().sub(sp).normalize());}
    else yarn.visible=false;
    old.material.opacity=F.cut?0:Math.min(1,W.owlT/0.4)*0.9;
    // кольца, контуры и дуги прыжка — для того этажа, где сейчас игроки
    const fl=[0,1].map(pi=>active(pi).pos.y>6.4?2:active(pi).pos.y>2.9?1:0);
    const hasStr=(pi,i)=>W.threads.some(t=>t.string&&!t.sag&&t.owner===pi&&t.stake===STK[i][pi]);
    guides.forEach((G2,i)=>G2.forEach(q=>{const pi=q.r.pi,on=fl[pi]===i&&!hasStr(pi,i)&&!(i===2&&!arena.cleared&&arena.started);q.r.g.visible=on;q.r.g.rotation.y+=dt;q.r.m.opacity=0.55+0.35*Math.sin(G.time*5);
      const inR=on&&hd(active(pi).pos,q.r)<0.9&&Math.abs(active(pi).pos.y-q.r.y)<0.8;q.gh.visible=on&&!inR;q.gh.position.y=q.r.y+Math.abs(Math.sin(G.time*2+pi))*0.1;
      q.dots.forEach((d,k)=>{d.visible=on;d.material.opacity=inR?0.9:0.35;d.scale.setScalar(1+0.4*Math.sin(G.time*6-k*0.6));});
      q.arrow.visible=on&&!inR;q.arrow.position.set(q.r.x,q.r.y+2.6+Math.sin(G.time*4+pi)*0.2,q.r.z);q.arrow.material.color.setHex(PCOL[pi]);}));
    jumpG.forEach((J,i)=>{const web=W.webs.some(w=>Math.hypot(w.x-J.c.x,w.z-J.c.z)<1.5&&Math.abs(w.y-J.c.y)<0.8);const need=[0,1].some(pi=>fl[pi]===i||players[pi].heroes.some(h=>(h.pos.y>6.4?2:h.pos.y>2.9?1:0)===i));
      J.g.visible=web&&need;J.g.children.forEach((d,k)=>{if(d.isMesh&&d.geometry.type==='SphereGeometry')d.scale.setScalar(1+0.5*Math.sin(G.time*7-k*0.5));});J.jg.forEach((q,k)=>{q.position.y=J.c.y+0.2+Math.abs(Math.sin(G.time*3+k*1.5))*0.8;});});
    if(W.barnDust){const a=W.barnDust.geometry.attributes.position;for(let i=0;i<a.count;i+=7){a.array[i*3+1]+=Math.sin(G.time+i)*0.004;}a.needsUpdate=true;W.barnDust.rotation.y=Math.sin(G.time*0.05)*0.05;}
    if(W.barnFire)W.barnFire.intensity=1.1+0.25*Math.sin(G.time*13)*Math.sin(G.time*7);
    W.barnThreads.forEach((m,i)=>{m.material.opacity=F.warn?(Math.sin(G.time*20+i)>0?0.95:0.2):0.45+0.1*Math.sin(G.time*2+i);});
    if(!floorFoes.started&&F.stage==='play'){floorFoes.started=true;floorFoes.list=[makeFoe('thread',2.5,-24,{leash:9}),makeFoe('thread',-2,-26,{leash:9})];banner('Нитяные мороки!','#d8d8e4',2,'синяя капля — щитом закройся, а в последний миг — отбей назад');}
    if(!arena.started&&[0,1].every(pi=>{const h=active(pi);return h.grounded&&h.pos.y>6.4&&h.pos.z<-30.3;})){arena.started=true;SFX.keys();say('kiki','Пряди. Пряди. День и ночь.',2);
      rails.forEach(r=>{r.on=true;});railM.visible=true;SFX.gate();
      arena.list=[[-8,-31],[-4.5,-32.5],[-1,-31],[2.5,-32.6],[4,-30.6]].map(([x,z])=>makeFoe('thread',x,z,{y:7,leash:6}));banner('Пять мороков — разом!','#d8d8e4',2.2,'с паутинки прыгни да ударь сверху — два огонька погаснут враз');}
    if(arena.started&&!arena.cleared&&arena.list.every(e=>!e.alive)){arena.cleared=true;arena.hold=1.6;F.done=true;rails.forEach(r=>{r.on=false;});SFX.ok();later(1.0,finale);}
    if(arena.cleared)arena.hold-=dt;});
  W.onWeb=h=>{if(!F.webTold){F.webTold=true;bark(h,h.kind,h.kind==='potap'?'Как Илья Муромец… на батуте, ей-ей!':'Уи-и-и!',1.8);}
    // паутинка подбрасывает прямо на следующий этаж
    const i=h.pos.y<2?0:h.pos.y<6?1:-1;if(i<0)return;const t=LAND[i],vy=h.vel.y,dy=t.y-h.pos.y,disc=vy*vy-2*GRAV*dy;if(disc<=0)return;const ft=(vy+Math.sqrt(disc))/GRAV;
    const tx=t.x+rand(-0.4,0.4),tz=t.z+rand(-0.4,0.4);h.vel.x=(tx-h.pos.x)/ft;h.vel.z=(tz-h.pos.z)/ft;h.aimT=ft+0.05;h.following=false;};
  W.onString=t=>{const ss=W.threads.filter(q=>q.string&&!q.sag);if(ss.length===1&&!F.crossTold){F.crossTold=true;tip(1-t.owner,'Струна друга уж висит. Брось свою поперёк —<br>Где скрестятся — паутинка-батут, скок!',3);}};
  function finale(){const T=HERO,pr=T.proshka;if(players[0].act!==0)doSwap(0);
    play({dur:21,fov:48,shots:[shot(0,[0,9.8,-24],[4.3,1.5,-18]),shot(4.4,[1.2,2.2,-15.2],[4.3,1.0,-18]),shot(9.2,[1.4,2.3,-16.2],[4.3,1.9,-18]),shot(15.2,[0.6,2.4,-15],[4.3,1.6,-18])],
      says:[[0.6,2.8,null,'<i>Прошка в веретено стреляет — оно наземь летит.</i>',true],[4.6,4.4,null,'<i>Из веретена выскальзывает чёрная нитка с маленьким ключом и, звеня, утягивается в щель.</i>',true],
        [9.4,3.2,'kiki','<i>(своим, ворчливым голосом)</i> Ишь, ключник… Всю ночь меня гонял.'],[15.2,4.4,'kiki','Веретено отняли — ладно. Должна буду. Кикиморы долги помнят.']],
      events:[{t:0.6,fn:()=>{SFX.thwip();debris(kiki.spindle,new V3(-1.5,2.5,0.6),0);SFX.keys();}},
        {t:4.6,fn:()=>{keyThread.visible=true;keyThread.position.set(3.6,0.1,-17.2);SFX.keys();anim(3.4,k=>{keyThread.position.set(lerp(3.6,9.6,k*k),0.1,lerp(-17.2,-25,k*k));keyThread.scale.setScalar(1-k*0.6);if(k>=1)keyThread.visible=false;});}},
        {t:9.2,fn:()=>{kiki.head.rotation.x=0.3;anim(1,k=>{kiki.head.rotation.z=Math.sin(k*Math.PI*3)*0.2;});}},
        {t:17,fn:()=>{const it=linkItem(4.3,2.2,-17.6);W.linkTotal--;const to=pr.pos.clone().add(new V3(0,1.2,0));anim(1.2,k=>{it.base=2.2;it.pos.lerpVectors(new V3(4.3,2.2,-17.6),to,smooth(k));if(k>=1)takeItem(it,pr);});}}],
      end:()=>{kiki.head.rotation.x=0;later(1.2,()=>{F.out=true;finishLevel();});}});}
  /* ---------- рисунки кнопок и задачи ---------- */
  const hasStr0=(pi,i)=>W.threads.some(t=>t.string&&!t.sag&&t.owner===pi&&t.stake===STK[i][pi]);
  const T=HERO,onFloor=(h,i)=>i===2?h.pos.y>6.4:i===1?h.pos.y>2.9&&h.pos.y<6.4:h.pos.y<2.9;
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>rings.some((R,i)=>onFloor(h(),i)&&hd(h().pos,R[pi])<0.9&&!hasStr0(pi,i)),'в колышек');
    prompt(pi,'move',()=>{const g=guides.map(G2=>G2[pi]).find(q=>q.gh.visible);return g?new V3(g.r.x,g.r.y+2.2,g.r.z):headOf(h());},()=>guides.some(G2=>G2[pi].gh.visible),'встань сюда');
    prompt(pi,'jump',()=>headOf(h()),()=>W.webs.some(w=>Math.hypot(w.x-h().pos.x,w.z-h().pos.z)<2.2&&Math.abs(w.y-h().pos.y)<1),'на серединку');
    prompt(pi,'roll',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig==='red'&&e.help));
    prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig!=='red'&&e.help));}
  prompt(0,'skill',()=>headOf(T.proshka),()=>F.warn&&!F.done,'в веретено');
  prompt(1,'skill',()=>headOf(T.pelageya),()=>F.warn&&!F.cut&&T.pelageya.active&&W.owlT<=0,'старая нить');
  const web=(pi,i,nx)=>O(()=>(!hasStr0(pi,i)?'Встань в своё кольцо — там герой твой нарисован — и клубок '+K(pi,'item')+' в колышек брось.<br>Струна друга поперёк ляжет — вот и сошлось.':!W.webs.some(w=>Math.hypot(w.x-WEBC[i].x,w.z-WEBC[i].z)<1.5)?'Твоя струна готова! Ждём струну друга — крест-накрест лечь.':'Паутинка готова! На серединку прыгни '+K(pi,'jump')+' — подкинет до '+nx+'.<br>Второго героя тоже: смени '+K(pi,'swap')+' или кликни '+K(pi,'call')+' — пусть идёт следом.'),
    ()=>players[pi].heroes.every(h=>h.pos.y>(i===0?2.9:6.4))||(i===1&&arena.started),()=>hasStr0(pi,i)?[]:[rings[i][pi].g,STK[i][pi].g]);
  for(const pi of[0,1])W.objectives[pi]=[O('Нитяные мороки! Жёлтый кружок — щит. Синяя капля — отбей назад.<br>Красный зубец — кувырок, и никаких преград.',()=>floorFoes.started&&floorFoes.list.every(e=>!e.alive),()=>floorFoes.list.map(e=>e.g)),
    web(pi,0,'галереи'),web(pi,1,'чердака'),O(()=>'Чердак, а тут пять мороков! С паутинки прыгни, в полёте ударь '+K(pi,'attack')+' —<br>Сверху гаснут сразу два огонька, будь уверен, друг.',()=>arena.cleared,()=>arena.list.filter(e=>e.alive).map(e=>e.g)),
    O('Веретено падает…',()=>false,()=>[kiki.g])];
  W.tipZones.push({cond:()=>F.warn,text:pi=>pi?'Прялка тянет нити! Совиный взор '+K(1,'skill')+' включи —<br>И старую нить ударом '+K(1,'attack')+' рассеки.':'Прялка тянет нити! Прошкой из рогатки '+K(0,'skill')+' в веретено стрельни —<br>Колесо споткнётся, как ни верти.'},
    {cond:(pi,h)=>W.owlT>0&&!F.cut,text:pi=>'Серебром старая сказочная нить светится — у крюка на галерее.<br>Разрежь её ударом '+K(pi,'attack')+' — да поскорее!'});
  W.zvenGoal=()=>{const a=HEROES.reduce((m,h)=>h.pos.y>m.pos.y?h:m);return new V3(clamp(a.pos.x,-8,4),a.pos.y+2.4,a.pos.z-2.5);};W.zvenFree=true;
  W.spawns=[[new V3(-2.5,0,2),new V3(-4.5,0,3)],[new V3(2.5,0,2),new V3(4.5,0,3)]];W.startAct=[0,0];
  W.pauseLine='Кикимора прядёт чужим голосом, как во сне.<br>Встаньте в кольца, бросьте клубки в колышки — две струны крест-накрест: паутинка вверх подкинет вполне.<br>Прялка нити тянет — жёлудь в веретено!';
  W.onStart=()=>{F.stage='intro';play({dur:13,fov:48,shots:[shot(0,[0,5,-2],[5,3,-18]),shot(4.6,[1.6,2.2,-14.6],[4.3,1.4,-18]),shot(8.6,[-1.6,3.2,-8],[-3,0.4,-16],[-0.6,2.4,-9.5],[-3,0.6,-16],3)],
    says:[[0.6,3.6,null,'<i>Кикимора прядёт в старом овине. Прялка огромная, до крыши; звенья висят высоко над колесом.</i>',true],[4.8,3,'kiki','<i>(сухим, деревянным голосом)</i> Пряди. Пряди. Не спи.'],
      [8.8,3.8,'zven','Где две струны скрестятся — паутинка. Прыгайте — подкинет до самой крыши!']],
    events:[{t:4.8,fn:()=>SFX.keys()}],end:()=>{F.stage='play';snapCams();}});};
  flushDecor();}

