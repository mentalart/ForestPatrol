/* ============================== 1-4 «ЛЕШИЙ ВОДИТ» ============================== */
// сочетание: клубок + взгляд · луч светлячка · оставленный сторожит · привязать ель у колышка · Совиный взор · лешачата: жёлтый и красный вместе
function ringFir(x,z,s){const g=new THREE.Group();g.position.set(x,0,z);W.group.add(g);const lm=M(0x2f6a3a),tm=M(0x5a3d22);
  addMesh(GEO.trunk,tm,0,0.6,0,g);addMesh(GEO.cone1,lm,0,2.0,0,g);addMesh(GEO.cone2,lm,0,3.1,0,g);
  const em=M(0xfff3a0,{emissive:0xffe070,emissiveIntensity:0.9});for(const k of[-1,1])addMesh(new THREE.SphereGeometry(0.08,8,6),em,k*0.2,1.55,0.7,g);
  g.scale.setScalar(s||0.9);const col={x,z,r:0.9,miny:-1,maxy:5,on:true};W.cyls.push(col);return {g,col,x,z,em,lm};}
function tiePost(x,z){const g=new THREE.Group();g.position.set(x,0,z);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.07,0.1,1.0,6),M(0x7a5634),0,0.5,0,g);
  const rib=M(COL.yellow,{emissive:0x806000,emissiveIntensity:0.6});addMesh(new THREE.BoxGeometry(0.05,0.34,0.14),rib,0.07,0.8,0,g).rotation.z=0.3;return g;}
function thornWall(minx,maxx,minz,maxz){colBox(minx,maxx,-1,6,minz,maxz,true);const n=Math.max(1,Math.round(Math.max(maxx-minx,maxz-minz)/1.3));
  for(let i=0;i<n;i++){const u=(i+0.5)/n;decorFir(lerp(minx,maxx,u)+rand(-0.2,0.2),lerp(minz,maxz,u)+rand(-0.2,0.2),rand(1.0,1.4),true);}}
function build14(){
  W.zvenAway=true;   // Звенышко улетает вперёд и появляется, только когда нужно
  setTheme('dark');W.name='1-4 · «Леший водит»';W.sub='Дремучий лес · клубок и взгляд';W.camX=10;const F=W.flags;
  W.abil.clew=true;W.abil.toss=true;W.abil.roll=true;W.abil.owl=false;W.threadLife=10;
  ground(-10.5,10.5,-222,8);wall(-10.7,-10.5,-222,8);wall(10.5,10.7,-222,8);wall(-10.7,10.7,8,8.2);wall(-10.7,10.7,-222.2,-222);
  edgeTrees(-220,6,-10.5,10.5);
  for(const[x,z]of[[-8.8,3],[8.6,-45.5],[-8.6,-77]]){addMesh(new THREE.CylinderGeometry(0.07,0.08,1.8,6),M(0x6b4a2b),x,0.9,z);const b=addMesh(new THREE.BoxGeometry(1.2,0.35,0.08),M(0x9a7a50),x+0.3,1.55,z);b.rotation.z=0.12;}  // указатели со стёртыми названиями
  bell(-3,4);bell(-4,-23);bell(-3,-47);bell(-3,-77.5);bell(-3,-98.5);bell(-3,-128.5);bell(-3,-158);bell(-3,-192);
  const Z=makeZven();W.zven=Z;Z.pos.set(0,2.2,2);
  /* ---------- пень с шапками из мха ---------- */
  const stump=new THREE.Group();stump.position.set(0,0,-1.5);W.group.add(stump);addMesh(new THREE.CylinderGeometry(0.75,0.85,0.7,14),M(0x8a5a32),0,0.35,0,stump);W.cyls.push({x:0,z:-1.5,r:0.85,miny:-1,maxy:0.7,on:true});
  const hats=[];for(let i=0;i<4;i++){const a=i/4*Math.PI*2+0.4;const hm=new THREE.Group();hm.position.set(Math.cos(a)*0.38,0.7,Math.sin(a)*0.38);stump.add(hm);
    part(hm,new THREE.ConeGeometry(0.26,0.3,8),M(0x2e5a2a),0,0.15,0);part(hm,new THREE.TorusGeometry(0.24,0.045,6,14),M(0x2e5a2a),0,0,0).rotation.x=Math.PI/2;hats.push(hm);}
  /* ---------- B: ели ходят, пока на них не смотришь ---------- */
  const wB=[walker(-8.5,8.5,-11,0.9,0),walker(8.5,-8.5,-15,0.8,1.6),walker(-8.5,8.5,-19,1.0,3.1)];
  const link1=linkItem(0,1.1,-17);nutItem(9,0.6,-13);
  /* ---------- D: кольцо из елей за живой изгородью; лаз под корнями — только для Йоши ---------- */
  const RC={x:7.3,z:-33};const hedge=[];
  const hedgeBox=(a,b,c,d)=>{const col=colBox(a,b,-1,6,c,d,true);hedge.push(col);};
  hedgeBox(3.4,4.2,-38.5,-33.7);hedgeBox(3.4,4.2,-32.3,-27.5);hedgeBox(3.4,10.5,-28.3,-27.5);hedgeBox(3.4,10.5,-38.5,-37.7);
  const hedgeFirs=[];for(let z=-27.9;z>-38.4;z-=1.2){if(Math.abs(z+33)<0.8)continue;hedgeFirs.push(ringFir(3.8,z,0.95));W.cyls.pop();}
  for(let x=5;x<10.5;x+=1.3){hedgeFirs.push(ringFir(x,-27.9,0.95));W.cyls.pop();hedgeFirs.push(ringFir(x,-38.1,0.95));W.cyls.pop();}
  hedgeFirs.forEach(f=>fadeable(f.g));   // заслоняют Йошу у лаза — становятся полупрозрачными
  const roots=W.group.children.length;const tun=colBox(2.4,4.6,0.82,4,-33.7,-32.3,false);addMesh(new THREE.BoxGeometry(2.4,0.35,1.6),M(0x5a3d22),3.5,1.0,-33);
  for(let i=0;i<5;i++){const r=addMesh(new THREE.CylinderGeometry(0.08,0.12,1.4,6),M(0x4a3020),2.6+i*0.45,0.5,-33+(i%2?0.6:-0.6));r.rotation.x=(i%2?-1:1)*0.5;}
  for(const s of[-1,1])colBox(2.4,4.6,-1,4,s>0?-32.3:-34.1,s>0?-31.9:-33.7,false);fadeable(since(roots));
  // поляна кольца: мох, светящиеся грибы, лунный луч и светлячки — чтобы Пелагею было видно издалека
  {const gl=new THREE.Mesh(new THREE.CircleGeometry(3.3,28),M(0x6f9a5a));gl.rotation.x=-Math.PI/2;gl.position.set(RC.x,0.03,RC.z);W.group.add(gl);
    for(let i=0;i<14;i++){const a=i/14*Math.PI*2;const mx=RC.x+Math.cos(a)*2.95,mz=RC.z+Math.sin(a)*2.95;addMesh(new THREE.CylinderGeometry(0.03,0.04,0.16,5),M(0xe8e0d0),mx,0.08,mz);addMesh(new THREE.SphereGeometry(0.1,8,6,0,Math.PI*2,0,Math.PI/2),M(0x9ad0ff,{emissive:0x5aa0ff,emissiveIntensity:1.1}),mx,0.16,mz).castShadow=false;}
    const beam=new THREE.Mesh(new THREE.CylinderGeometry(0.5,1.7,10,20,1,true),MB(0xdfe8ff,{transparent:true,opacity:0.13,depthWrite:false,side:THREE.DoubleSide}));beam.position.set(RC.x,5,RC.z);beam.castShadow=false;W.group.add(beam);
    const ml=new THREE.PointLight(0xb8ccff,1.3,9,2);ml.position.set(RC.x,4.2,RC.z);W.group.add(ml);}
  const glowFF=[];for(let i=0;i<9;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(0.05,6,5),MB(0xfff08a));W.group.add(m);glowFF.push({m,a:rand(0,6.28),r:rand(0.8,2.4),y:rand(0.6,2.2),s:rand(0.4,0.9)});}
  const peMark=new THREE.Mesh(new THREE.TorusGeometry(0.32,0.06,8,24),MB(0xe7c3ff));peMark.rotation.x=Math.PI/2;peMark.visible=false;W.group.add(peMark);
  const RR=2.15;const ring=[];for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const f=ringFir(RC.x+Math.cos(a)*RR,RC.z+Math.sin(a)*RR,0.64);f.a=a;f.col.r=0.72;f.col.on=false;f.g.visible=false;f.g.rotation.y=-a-Math.PI/2;fadeable(f.g);ring.push(f);}
  const lockFir=ring[4];   // западная — ель-замок: смотрит в лаз
  // три замка-шишки: каждую видно и можно сбить только со своего места на тропе (светящийся след)
  const coneMesh=()=>{const g=new THREE.Group();const c=new THREE.Mesh(new THREE.ConeGeometry(0.2,0.56,8),M(0x8a5a2a));c.rotation.x=Math.PI;g.add(c);
    for(let i=0;i<4;i++){const r=new THREE.Mesh(new THREE.TorusGeometry(0.17-i*0.035,0.035,5,12),M(0x6a4020));r.rotation.x=Math.PI/2;r.position.y=0.14-i*0.11;g.add(r);}return g;};
  const locks=[3,4,5].map((i,n)=>{const f=ring[i],nx=Math.cos(f.a),nz=Math.sin(f.a);const g=new THREE.Group();g.position.set(f.x+nx*0.5,2.35,f.z+nz*0.5);W.group.add(g);
    const gr=new THREE.Mesh(new THREE.TorusGeometry(0.36,0.05,8,24),M(COL.gold,{emissive:COL.gold,emissiveIntensity:0.9}));gr.lookAt(new V3(nx,0,nz));g.add(gr);g.add(coneMesh());g.visible=false;
    const sp={x:clamp(f.x+nx*6.2,-1,1.4),z:f.z+nz*6.2};const foot=new THREE.Group();foot.position.set(sp.x,0.05,sp.z);W.group.add(foot);foot.visible=false;
    const fm=MB(PCOL[0],{transparent:true,opacity:0.8});for(const R of[0.62,0.36]){const t=new THREE.Mesh(new THREE.TorusGeometry(R,0.06,6,24),fm);t.rotation.x=Math.PI/2;foot.add(t);}
    const L={f,g,gr,n:new V3(nx,0,nz),sp,foot,hit:false,idx:n};return L;});
  const lockMark=locks[1].g;
  W.waterTargets.push({pos:new V3(lockFir.x-0.6,0,lockFir.z),active:()=>F.stage==='rescue'&&!F.watered,onWater:()=>{F.watered=true;SFX.grow();locks.forEach(L=>{L.g.visible=true;L.foot.visible=true;});
    burst(new V3(lockFir.x,1.2,lockFir.z),0x9fe6ff,16,4);banner('Ель-замок проснулась — берегись!','#9fe6ff',2.2,'на кольце три шишки-замка: сбей рогаткой каждую — со своего следа светящегося');}});
  const inSector=(L,h)=>{const dx=h.pos.x-L.f.x,dz=h.pos.z-L.f.z,d=Math.hypot(dx,dz);return d<13&&d>1&&(dx*L.n.x+dz*L.n.z)/d>0.8;};
  for(const L of locks)W.marks.push({pos:L.g.position,active:()=>F.watered&&!L.hit&&!F.ringOpen&&inSector(L,T.proshka),onHit:()=>{L.hit=true;L.g.visible=false;L.foot.visible=false;SFX.latch();
    const n=locks.filter(q=>q.hit).length;floatText(L.g.position.clone().add(new V3(0,0.8,0)),'Замок-шишка '+n+' / 3','#ffd9a0');burst(L.g.position.clone(),0x8a5a2a,14,4);
    const f=L.f,x0=f.g.position.x,z0=f.g.position.z;anim(0.6,k=>{f.g.position.set(x0+L.n.x*0.7*k,0,z0+L.n.z*0.7*k);f.g.rotation.z=Math.sin(k*Math.PI)*0.2;});
    if(n>=3)later(0.5,openRing);else banner('Замок-шишка '+n+' / 3','#ffd9a0',1.6,'следующая шишка — с другого следа на тропинке');}});
  const wD=[walker(-9,2,-29.6,0.9,0.5),walker(-2.2,-9,-33,0.85,2.2),walker(-9,2,-36.6,1.0,4.0)];   // к лазу ели не подходят
  const exitD=[];for(let x=-9.6;x<10;x+=1.35)exitD.push(ringFir(x,-44.6,0.95));const exitCol=colBox(-10.5,10.5,-1,6,-45.4,-43.8,true);
  const link2=linkItem(RC.x,-20,RC.z);   // появится, когда кольцо раскроется
  /* ---------- E: оставленный сторожит; ели-ворота — привязать у колышка ---------- */
  const wE=[walker(-9,9,-49,0.9,0),walker(9,-9,-52,0.8,1),walker(-9,9,-55,1.0,2),walker(9,-9,-58,0.9,3),walker(-9,9,-63,1.1,4),walker(9,-9,-67,1.0,5)];
  thornWall(-10.5,-2.0,-72.6,-71.4);thornWall(2.0,10.5,-72.6,-71.4);
  const posts=[{x:-3.35,z:-71},{x:3.35,z:-71}];posts.forEach(p=>tiePost(p.x+(p.x<0?0.9:-0.9),p.z+0.9));
  const gateL=walker(-0.8,-3.35,-71,0.7,0,{tieable:()=>hd(gateL.pos,posts[0])<1.2}),gateR=walker(0.8,3.35,-71,0.7,Math.PI*0.6,{tieable:()=>hd(gateR.pos,posts[1])<1.2});
  const link3=linkItem(-8.5,1.1,-65);nutItem(8.6,0.6,-60);
  /* ---------- F: поляна Лешего — всё движется; Совиный взор и нить по серебряной тропе ---------- */
  const C={x:0,z:-86};
  thornWall(-10.5,-7.2,-96.6,-95.4);thornWall(-4.8,-1.3,-96.6,-95.4);thornWall(1.3,4.2,-96.6,-95.4);thornWall(6.9,10.5,-96.6,-95.4);   // три прохода — настоящий один
  thornWall(-7.2,-4.8,-99.6,-98.6);thornWall(-1.3,1.3,-99.6,-98.6);thornWall(-7.6,-7.2,-99.6,-96.6);thornWall(-4.8,-4.4,-99.6,-96.6);thornWall(-1.7,-1.3,-99.6,-96.6);thornWall(1.3,1.7,-99.6,-96.6);
  const wF=[walker(-8,8,-80,1.3,0,{az:-83,bz:-80}),walker(8,-8,-84,1.2,1.5,{az:-84,bz:-89}),walker(-7,7,-90,1.4,3,{az:-92,bz:-87}),walker(0,6,-81,1.1,2,{az:-93,bz:-83}),
    walker(-6,3,-82,1.2,4,{az:-88,bz:-94}),walker(8,-2,-91,1.3,5,{az:-93,bz:-85})];wF.forEach(m=>{m.noGaze=true;});
  const SV={sx:2.2,sz:-78.6,ex:5.6,ez:-94.6};SV.ang=Math.atan2(SV.ex-SV.sx,SV.ez-SV.sz);SV.len=Math.hypot(SV.ex-SV.sx,SV.ez-SV.sz);
  const silver=new THREE.Group();W.group.add(silver);const svM=MB(0xdfe8ff,{transparent:true,opacity:0,depthWrite:false});
  for(let i=0;i<14;i++){const u=(i+0.5)/14;const m=new THREE.Mesh(new THREE.CircleGeometry(0.42,12),svM);m.rotation.x=-Math.PI/2;m.position.set(lerp(SV.sx,SV.ex,u),0.04,lerp(SV.sz,SV.ez,u));silver.add(m);}
  const svStart=new THREE.Mesh(new THREE.TorusGeometry(0.6,0.07,8,26),svM);svStart.rotation.x=Math.PI/2;svStart.position.set(SV.sx,0.06,SV.sz);silver.add(svStart);
  nutItem(-5,1.0,-84,{owl:true});nutItem(3.8,1.0,-90,{owl:true});
  const leshy=makeLeshy(1.35);leshy.g.position.set(-13.5,0,-88);leshy.g.rotation.y=Math.PI/2-0.3;
  W.aimSnap=(h,ang)=>{if(!F.seenSilver||Math.hypot(h.pos.x-SV.sx,h.pos.z-SV.sz)>2.6)return null;let d=ang-SV.ang;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;return Math.abs(d)<0.7?SV.ang:null;};
  /* ---------- Г: «Друг за друга» — две тропки за низкой изгородью; ёлки одной тропки держит только взгляд с другой ---------- */
  const LN={z0:-102,z1:-126.5};
  colBox(-0.45,0.45,-1,6,LN.z1,LN.z0,true);   // изгородь низкая: через неё видно, а перелезть нельзя
  for(let z=LN.z0-0.4;z>LN.z1;z-=0.95){addMesh(new THREE.SphereGeometry(rand(0.42,0.52),8,6),M(0x2f5a2a),rand(-0.08,0.08),0.42,z).scale.y=rand(0.8,1.1);
    if(Math.random()<0.45)addMesh(new THREE.ConeGeometry(0.05,0.32,4),M(0x6a4a2a),rand(-0.3,0.3),0.86,z).rotation.z=rand(-0.7,0.7);}
  for(const sd of[-1,1]){const g=new THREE.Group();g.position.set(sd*1.4,0,LN.z0+0.6);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.06,0.07,1.5,6),M(0x6b4a2b),0,0.75,0,g);   // указатель: «гляди на ту тропку»
    addMesh(new THREE.BoxGeometry(0.9,0.36,0.08),M(0x9a7a50),0,1.4,0,g);const eye=addMesh(new THREE.SphereGeometry(0.11,10,8),MB(0xffffff),sd*0.16,1.4,0.06,g);eye.scale.z=0.4;addMesh(new THREE.SphereGeometry(0.05,8,6),MAT.dark,sd*0.12,1.4,0.1,g);
    const ar=addMesh(new THREE.ConeGeometry(0.1,0.24,6),M(COL.yellow,{emissive:0x806000,emissiveIntensity:0.6}),-sd*0.3,1.4,0.06,g);ar.rotation.z=sd*Math.PI/2;}
  const laneW=[];
  for(const[sd,zs]of[[-1,[-106,-111,-116,-121]],[1,[-108.5,-113.5,-118.5,-123.5]]])zs.forEach((z,i)=>{const a=sd*9.4,b=sd*1.5;
    for(const k of[0,1]){const m=walker(k?b:a,k?a:b,z-k*1.2,0.8+i*0.07,i*0.8);m.noGaze=true;laneW.push({m,sd});}});
  nutItem(-8.9,0.6,-118.5);
  /* ---------- Д: «Хоровод ёлок» — три кольца кружат; ёлки заслоняют друг друга: под взглядом стоит ближнее кольцо ---------- */
  const HC={x:0,z:-142};const HQ=new THREE.Quaternion(),HE=new THREE.Euler(),HM=new THREE.Matrix4(),HP=new V3(),HS=new V3(),HOFF=[[0,0.6,0],[0,2.0,0],[0,3.1,0]];
  const eyeG=new THREE.SphereGeometry(0.08,8,6),gapG=new THREE.TorusGeometry(0.55,0.07,6,22);
  function firRing(R,n,a0,w,s){const lm=M(0x2f6a3a,{emissive:0x000000}),tm=M(0x5a3d22),em=M(0xfff3a0,{emissive:0xffe070,emissiveIntensity:0.9}),cnt=n-1;
    const mk=(geo,mat,c)=>{const im=new THREE.InstancedMesh(geo,mat,c);im.castShadow=true;im.receiveShadow=true;im.frustumCulled=false;im.userData.noBatch=true;W.group.add(im);return im;};
    const r={R,n,a:a0,w,s,lm,ims:[mk(GEO.trunk,tm,cnt),mk(GEO.cone1,lm,cnt),mk(GEO.cone2,lm,cnt),mk(eyeG,em,cnt*2)],cols:[],hold:0,inGap:0,locked:false,bow:0,seen:false,moving:false};
    for(let i=0;i<cnt;i++){const c={x:0,z:0,r:0.62,miny:-1,maxy:5,on:true,mover:true,dx:0,dz:0};W.cyls.push(c);r.cols.push(c);}
    r.gap=new THREE.Mesh(gapG,MB(COL.gold,{transparent:true,opacity:0.75}));r.gap.rotation.x=Math.PI/2;r.gap.castShadow=false;W.group.add(r.gap);placeRing(r);return r;}
  function placeRing(r){const cnt=r.n-1,st=Math.PI*2/r.n;
    for(let i=0;i<cnt;i++){const th=r.a+(i+1)*st,x=HC.x+Math.cos(th)*r.R,z=HC.z+Math.sin(th)*r.R,c=r.cols[i];c.dx=x-c.x;c.dz=z-c.z;c.x=x;c.z=z;
      HE.set(-r.bow*0.32,Math.atan2(-Math.cos(th),-Math.sin(th)),0,'YXZ');HQ.setFromEuler(HE);HS.setScalar(r.s);
      for(let p=0;p<3;p++){HP.set(HOFF[p][0],HOFF[p][1]*r.s,HOFF[p][2]).applyQuaternion(HQ);HP.x+=x;HP.z+=z;HM.compose(HP,HQ,HS);r.ims[p].setMatrixAt(i,HM);}
      for(let e=0;e<2;e++){HP.set((e?0.2:-0.2)*r.s,1.55*r.s,0.7*r.s).applyQuaternion(HQ);HP.x+=x;HP.z+=z;HM.compose(HP,HQ,HS);r.ims[3].setMatrixAt(i*2+e,HM);}}
    r.ims.forEach(im=>{im.instanceMatrix.needsUpdate=true;});r.gap.position.set(HC.x+Math.cos(r.a)*r.R,0.06,HC.z+Math.sin(r.a)*r.R);}
  const horo=[firRing(2.8,10,0.6,0.55,0.78),firRing(5.3,19,2.9,-0.36,0.8),firRing(7.8,28,4.8,0.25,0.82)];
  {const st=new THREE.Group();st.position.set(HC.x,0,HC.z);W.group.add(st);addMesh(new THREE.CylinderGeometry(0.6,0.7,0.5,14),M(0x8a5a32),0,0.25,0,st);   // пень посередине хоровода
    for(let i=0;i<6;i++){const a=i/6*Math.PI*2;addMesh(new THREE.SphereGeometry(0.1,8,6,0,Math.PI*2,0,Math.PI/2),M(0x9ad0ff,{emissive:0x5aa0ff,emissiveIntensity:1.1}),Math.cos(a)*0.85,0.02,Math.sin(a)*0.85,st);}}
  W.cyls.push({x:HC.x,z:HC.z,r:0.5,miny:-1,maxy:0.5,on:true});
  const link4=linkItem(HC.x,1.3,HC.z);nutItem(9.3,0.6,-152.5);
  thornWall(-10.5,-1.7,-155.6,-154.4);thornWall(1.7,10.5,-155.6,-154.4);   // выход из хоровода закрыт, пока до пня не дойдёшь
  const horoGate=colBox(-1.7,1.7,-1,6,-155.6,-154.4,true);const horoGateF=[ringFir(-0.85,-155,0.95),ringFir(0.85,-155,0.95)];W.cyls.splice(-2,2);
  /* ---------- Е: «Леший водит по кругу» — поляна-петля; настоящий выход откликается на «Ау!» ---------- */
  const KG={stump:{x:0,z:-161.5},gaps:[-7.5,-2.5,2.5,7.5],wz:-186,loop:0,tru:2,lit:0,grey:[0,0,0,0],busy:false,autoT:0,told:false};
  {const st=new THREE.Group();st.position.set(KG.stump.x,0,KG.stump.z);W.group.add(st);addMesh(new THREE.CylinderGeometry(0.8,0.95,0.42,16),M(0x7a5232),0,0.21,0,st);   // пень-эхо: дупло-рупор
    const tr=addMesh(new THREE.TorusGeometry(0.55,0.04,6,26),M(0xd2a870),0,0.43,0,st);tr.rotation.x=Math.PI/2;const horn=addMesh(new THREE.CylinderGeometry(0.32,0.12,0.6,12,1,true),M(0x5a3d22,{side:THREE.DoubleSide}),0,0.75,-0.2,st);horn.rotation.x=-0.9;
    KG.notch=[];for(let i=0;i<3;i++){const n=addMesh(new THREE.BoxGeometry(0.06,0.3,0.05),M(0xffe9a8,{emissive:0x806020,emissiveIntensity:0.5}),-0.25+i*0.25,0.3,0.92,st);n.visible=false;KG.notch.push(n);}}
  KG.ring=new THREE.Mesh(new THREE.TorusGeometry(1.05,0.06,6,28),MB(COL.gold,{transparent:true,opacity:0.7}));KG.ring.rotation.x=Math.PI/2;KG.ring.position.set(KG.stump.x,0.46,KG.stump.z);KG.ring.castShadow=false;W.group.add(KG.ring);
  W.cyls.push({x:KG.stump.x,z:KG.stump.z,r:0.95,miny:-1,maxy:0.32,on:true});   // пологий: заходят и без прыжка
  const kgWall=[],kgFirs=[];
  for(const[a,b]of[[-10.5,-8.5],[-6.5,-3.5],[-1.5,1.5],[3.5,6.5],[8.5,10.5]]){kgWall.push(colBox(a,b,-1,6,KG.wz-0.6,KG.wz+0.6,true));
    for(let x=a+0.5;x<b;x+=1.0){kgFirs.push(ringFir(x,KG.wz,0.95));W.cyls.pop();}}
  KG.lamp=KG.gaps.map(x=>{const g=new THREE.Group();g.position.set(x,0,KG.wz+0.2);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.07,0.09,0.5,6),M(0xe8e0d0),0,0.25,0,g);
    const mat=M(0x6a7a8a,{emissive:0x223040,emissiveIntensity:0.6});addMesh(new THREE.SphereGeometry(0.36,12,8,0,Math.PI*2,0,Math.PI/2),mat,0,0.5,0,g);return {g,mat};});
  const kgBack=colBox(-10.5,10.5,-1,6,-190.2,-189,true);const kgBackF=[];for(let x=-9.9;x<10.4;x+=1.3){kgBackF.push(ringFir(x,-189.6,0.95));W.cyls.pop();}
  const kgW=[walker(-9,9,-169,0.9,0),walker(9,-9,-174,1.0,1.4),walker(-9,9,-178.5,1.1,2.6)];kgW.forEach(m=>{m.az=m.bz=-300;});   // со второй поляны выходят на тропу
  const kgLeshy=makeLeshy(0.9);kgLeshy.g.position.set(-12.2,0,-183);kgLeshy.g.rotation.y=Math.PI/2+0.4;   // Леший подглядывает из-за ёлок
  /* ---------- Ж: поляна Ауки (в прототипе — лешачата прячутся за ёлками) ---------- */
  const hide=[[-6,-197],[6,-198],[-3,-203],[3.5,-204],[-6.5,-207],[6.5,-207.5]];const hideFirs=hide.map(([x,z])=>ringFir(x,z+1.0,0.9));
  const arena={x:0,z:-203,r:9.5,started:false,cleared:false,hold:0,list:[],custom:false};arena.camActive=()=>arena.started&&(!arena.cleared||arena.hold>0);W.camZones.push(arena);
  const barrier=makeGate(-10.5,10.5,-215.5,'thread','g',{h:2.6});
  nutItem(-7.5,0.6,-200);
  /* ---------- ролики ---------- */
  const T=HERO;
  function hatScene(){F.stage='hats';const pos={potap:T.potap,pelageya:T.pelageya,yosha:T.yosha};
    play({dur:12,fov:48,shots:[shot(0,[3.2,2.4,2.8],[0,0.8,-1.5]),shot(5.2,[-2.6,1.8,1.6],[0,0.9,-1.2]),shot(8.4,[1.6,1.5,0.6],[0,1.0,-0.6])],
      says:[[0.5,3.6,null,'<i>У входа в лес на пне — четыре шапки из мха.</i><br><i>Пелагея, Йоша, Потап выворачивают — вот и вся недолга.</i>',true],
        [8.6,3.2,'proshka','<i>(берёт свою шапку двумя пальцами и швыряет обратно)</i> Лес — это деревья. Деревья не ходят.']],
      events:[{t:0,fn:()=>{const P=[[1.4,0.2],[-1.3,0.3],[0.5,0.9]];['potap','pelageya','yosha'].forEach((k,i)=>{placeOnGround(T[k],P[i][0],P[i][1]-1.5+1.6,0);T[k].face=Math.atan2(-P[i][0],-1.6-P[i][1]);});
          placeOnGround(T.proshka,0.2,0.4,0);T.proshka.face=Math.PI;}},
        {t:1.6,fn:()=>{hats[0].visible=false;T.potap.hatOn='in';SFX.flower();}},{t:2.6,fn:()=>{hats[1].visible=false;T.pelageya.hatOn='in';SFX.flower();}},{t:3.6,fn:()=>{hats[2].visible=false;T.yosha.hatOn='in';SFX.flower();}},
        {t:7.8,fn:()=>{hats[3].position.y=1.3;}},{t:9.6,fn:()=>{anim(0.6,k=>{hats[3].position.set(0.38+k*0.3,1.3-k*0.6+Math.sin(k*Math.PI)*0.6,0.2);hats[3].rotation.z=k*4;});SFX.swish();}}],
      end:()=>{hats.forEach((h,i)=>{h.visible=i===3;});hats[3].position.set(0.5,0.7,0.2);hats[3].rotation.z=2.2;F.stage='walk';W.gaze=true;snapCams();
        banner('Луч взгляда','#fff6c8',2.6,'ёлки в луче стоят на месте — хоть свет от героя, что ты оставил');}});}
  function kidnap(){F.stage='kidnap';const pe=T.pelageya,pr=T.proshka,yo=T.yosha;const pp=pr.pos.clone(),yp=yo.pos.clone();
    const shade=makeLeshy(2.3);shade.g.position.set(RC.x+4.6,-8,RC.z-2.6);shade.g.rotation.y=-Math.PI/2-0.5;shade.eye.emissiveIntensity=2;   // тень Лешего за кольцом
    const eyes=on=>ring.forEach(f=>{f.em.color.setHex(on?0xfff3a0:0x1a2a1a);f.em.emissive.setHex(on?0xffe070:0x000000);});
    play({dur:25.5,fov:44,camK:3.2,
      shots:[shot(0,[RC.x-2.3,1.1,RC.z+1.5],[RC.x,1.0,RC.z],[RC.x-1.7,1.0,RC.z+1.1],[RC.x,1.05,RC.z],3),
        shot(3.0,[pp.x+1.2,1.5,pp.z+1.5],[pp.x,1.1,pp.z],[pp.x+0.8,1.4,pp.z+1.1],[pp.x,1.1,pp.z],1.8),
        shot(4.8,[RC.x-1.4,1.0,RC.z-1.4],[RC.x+2.4,1.5,RC.z+2.4],[RC.x-1.0,0.9,RC.z-1.0],[RC.x+2.4,1.6,RC.z+2.4],1.4),
        shot(6.2,[RC.x-2.6,4.3,RC.z+1.6],[RC.x,0.7,RC.z],[RC.x-1.3,4.6,RC.z-2.9],[RC.x,0.7,RC.z],3.2),
        shot(9.6,[RC.x+0.2,9,RC.z+0.4],[RC.x,0,RC.z],[RC.x+0.3,14.5,RC.z+0.6],[RC.x,0,RC.z],3.4),
        shot(13.2,[RC.x-1.9,1.2,RC.z+0.8],[RC.x,1.1,RC.z],[RC.x-1.6,1.4,RC.z+0.6],[RC.x,1.2,RC.z],2),
        shot(15.4,[yp.x+1.7,0.95,yp.z+1.7],[yp.x,0.5,yp.z]),
        shot(17.6,[1.8,2.4,3.0],[0,0.9,-1.8],[1.2,1.8,1.6],[0,1,-1.4],4),
        shot(22,[RC.x+1.7,1.5,RC.z+0.4],[RC.x-6,0.6,RC.z],[RC.x+1.2,1.3,RC.z+0.2],[RC.x-6,0.6,RC.z],3.4)],
      says:[[0.4,2.5,null,'<i>Пелагея на поляне задержалась —</i><br><i>Светлячков вокруг неё кружится стая.</i>',true],[3.1,1.6,null,'<i>Прошка на миг отвернулся — лишь на миг…</i>',true],
        [4.9,1.3,null,'<i>…а у ней за спиной — глаза раскрылись.</i>',true],[6.8,2.4,'pelageya','Ой… Прошка?! Где ты?!'],[10.2,3,'leshy','<i>(скрипучий смешок)</i> Шапочку-то не надел, умелец.'],
        [13.4,2,null,'<i>Пелагея одна в кольце из елей.</i>',true],[15.6,1.9,'yosha','Это из-за тебя.'],[17.8,3.2,null,'<i>Прошка молча к пню воротился —</i><br><i>Шапку наизнанку надел, смирился.</i>',true],
        [21.2,1.4,null,'<i>Шапка велика — на нос съезжает.</i>',true],[22.4,2.8,null,'<i>Но Пелагея смотрит сквозь щель — и её луч держит тропу.</i>',true]],
      events:[{t:0,fn:()=>{if(players[1].act===0)doSwap(1);placeOnGround(pe,RC.x,RC.z,0);pe.face=Math.PI*0.8;pe.following=false;eyes(false);
          ring.forEach(f=>{f.g.visible=true;f.g.position.set(RC.x+Math.cos(f.a)*3.4,0,RC.z+Math.sin(f.a)*3.4);});hedgeFirs.forEach(f=>{f.g.visible=false;});}},
        {t:3.0,fn:()=>{const a=Math.atan2(pp.x-RC.x,pp.z-RC.z);anim(0.8,k=>{pr.face=lerp(pr.face,a,k);});}},
        {t:4.8,fn:()=>{eyes(true);for(let i=0;i<4;i++)tone(rand(120,180),0.25,'sawtooth',0.08,rand(70,90),i*0.12);}},
        {t:6.2,fn:()=>{SFX.whoosh();anim(2.2,k=>{ring.forEach((f,i)=>{const r=lerp(3.4,RR,smooth(k))+Math.sin(k*20+i)*0.12*(1-k);f.g.position.set(RC.x+Math.cos(f.a)*r,0,RC.z+Math.sin(f.a)*r);f.g.rotation.z=Math.sin(k*18+i)*0.08*(1-k);});});}},
        {t:6.7,fn:()=>{anim(1.4,k=>{pe.face=Math.PI*0.8+k*Math.PI*2.2;});floatText(pe.pos.clone().add(new V3(0,1.7,0)),'!','#e7c3ff');}},
        {t:8.4,fn:()=>{ring.forEach(f=>{f.col.on=true;f.g.rotation.z=0;});shakeAll(0.04,0.35);SFX.gate();}},
        {t:9.6,fn:()=>{anim(2.2,k=>{shade.g.position.y=-8+8*smooth(k);});anim(2.4,k=>{shade.hands[0].sh.rotation.x=-1.4*smooth(k);});}},
        {t:10.2,fn:()=>{for(let i=0;i<7;i++)tone(rand(150,240),0.13,'sawtooth',0.12,rand(80,140),i*0.1);}},
        {t:12.6,fn:()=>{anim(1.6,k=>{shade.g.position.y=-8*smooth(k);});}},
        {t:13.2,fn:()=>{pe.face=-Math.PI/2;pe.body.rotation.x=-0.3;}},
        {t:15.4,fn:()=>{yo.face=Math.atan2(pp.x-yp.x,pp.z-yp.z);pe.body.rotation.x=0;hedgeFirs.forEach(f=>{f.g.visible=true;});}},
        {t:17.6,fn:()=>{if(players[0].act!==0)doSwap(0);const from=pr.pos.clone(),to=new V3(0.5,0,-0.1),dir=to.clone().sub(from).setY(0).normalize();pr.face=Math.atan2(dir.x,dir.z);
          anim(3.4,k=>{if(F.stage!=='kidnap')return;pr.pos.lerpVectors(from,to,smooth(k));pr.vel.set(k<1?dir.x*3:0,0,k<1?dir.z*3:0);});}},
        {t:21.1,fn:()=>{hats[3].visible=false;pr.hatOn='nose';pr.face=Math.PI;SFX.flower();floatText(pr.pos.clone().add(new V3(0,1.8,0)),'…','#ff9a66');}},
        {t:21.9,fn:()=>{pe.face=-Math.PI/2;pe.inRing=true;pe.ringLook=true;hedgeFirs.forEach(f=>{f.g.visible=false;});}}],
      end:()=>{F.stage='rescue';W.group.remove(shade.g);hedgeFirs.forEach(f=>{f.g.visible=true;});eyes(true);ring.forEach(f=>{f.col.on=true;const r=RR;f.g.position.set(RC.x+Math.cos(f.a)*r,0,RC.z+Math.sin(f.a)*r);f.g.rotation.z=0;});
        pe.inRing=true;pe.ringLook=true;pe.face=-Math.PI/2;pe.body.rotation.x=0;placeOnGround(pr,0.5,-0.1,0);pr.hatOn='nose';hats[3].visible=false;snapCams();
        banner('Пелагею увели!','#e7c3ff',2.6,'из кольца она глядит — и луч её держит ёлки на Прошкиной тропе');}});}
  function openRing(){F.ringOpen=true;SFX.latch();locks.forEach(L=>{L.g.visible=false;L.foot.visible=false;});peMark.visible=false;const pe=T.pelageya;
    anim(1.4,k=>{ring.forEach(f=>{const r=lerp(RR,4.4,smooth(k));f.g.position.set(RC.x+Math.cos(f.a)*r,0,RC.z+Math.sin(f.a)*r);f.g.scale.setScalar(0.64*(1-k*0.3));});});
    later(0.3,()=>{ring.forEach(f=>{f.col.on=false;});hedge.forEach(c=>{c.on=false;});tun.on=false;anim(1.2,k=>{hedgeFirs.forEach(f=>{f.g.position.y=-k*4.4;});});later(1.3,()=>hedgeFirs.forEach(f=>{f.g.visible=false;}));});
    later(0.6,()=>{pe.inRing=false;link2.base=1.1;exitCol.on=false;SFX.gate();anim(1.4,k=>{exitD.forEach((f,i)=>{f.g.position.x=f.x+(f.x<0?-1:1)*k*3.5;f.col.on=false;f.g.position.y=-k*3.2;});});
      banner('Кольцо раскрылось!','#ffd76a',2.2,'Пелагея на воле — экран снова вместе');bark(pe,'pelageya','Я вас видела. Всё время, всякий миг.',2.4);});}
  function spawnFight(){arena.started=true;SFX.gate();
    arena.list=hide.map(([x,z],i)=>{const e=makeFoe('leshonok',x,z,{leash:9,signals:i%3===2?['yellow','red']:i%2?['red']:['yellow']});e.state='hide';e.g.visible=false;e.g.position.y=e.baseY;e.hideUntil=G.time+0.4+i*0.9;return e;});
    banner('Лешачата!','#b8e070',2,'из-за ёлок прыгают: жёлтый кружок — щит, красный зубец — кувырком');}
  /* ---------- логика уровня ---------- */
  W.updates.push(dt=>{
    if(F.stage==='walk'&&!G.cine&&[0,1].some(pi=>active(pi).pos.z<-23.5)&&!F.kidnapped){F.kidnapped=true;kidnap();}
    glowFF.forEach(q=>{q.a+=dt*q.s;q.m.position.set(RC.x+Math.cos(q.a)*q.r,q.y+Math.sin(G.time*2+q.a)*0.25,RC.z+Math.sin(q.a)*q.r);});
    {const pe=T.pelageya;peMark.visible=pe.inRing&&!G.cine;if(peMark.visible){peMark.position.set(pe.pos.x,pe.pos.y+pe.d.height+0.9+Math.sin(G.time*3)*0.12,pe.pos.z);peMark.rotation.z+=dt*2;}}
    const pe=T.pelageya;if(pe.inRing){pe.firefly=25;if(pe.active){const d=hd(pe.pos,RC);if(d>1.1){pe.pos.x=RC.x+(pe.pos.x-RC.x)/d*1.1;pe.pos.z=RC.z+(pe.pos.z-RC.z)/d*1.1;}}}
    // Совиный взор: серебряная тропа; нить вдоль серебра — Леший двигать не может
    const k=Math.min(1,W.owlT/0.4);let sv=false;
    for(const t of W.threads){if(t.string||t.ret)continue;let d=Math.atan2(t.dx,t.dz)-SV.ang;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;
      if(Math.abs(d)<0.28&&Math.hypot(t.sx-SV.sx,t.sz-SV.sz)<2.8&&t.len>8){sv=true;break;}}
    if(sv&&!F.silver){SFX.ok();banner('Нить по серебру легла!','#dfe8ff',1.8,'нить Леший сдвинуть не может — бегите по ней всей гурьбой');bark(leshy,'leshy','Эй! Так нечестно, так не водится!',1.8);}
    F.silver=sv;wF.forEach(m=>{m.silverLock=sv;});svM.opacity=Math.max(k*0.85,sv?0.35:0);silver.children.forEach((m,i)=>{m.position.y=0.04+Math.sin(G.time*3+i)*0.02;});
    if(W.owlT>0&&hd(active(1).pos,C)<14)F.seenSilver=true;
    leshy.head.rotation.y=Math.sin(G.time*0.6)*0.6;leshy.hands.forEach((hh,i)=>{hh.sh.rotation.x=Math.sin(G.time*1.3+i*2)*0.4-0.2;});
    if(F.stage==='rescue'&&!F.leshyBark&&[0,1].some(pi=>active(pi).pos.z<-77)){F.leshyBark=true;bark(leshy,'leshy','Опять заблудились? Ну-ка, где я?',2.8);}
    if(!arena.started&&!arena.custom&&F.krugDone&&[0,1].every(pi=>active(pi).pos.z<-194)){spawnFight();}
    for(const e of arena.list)if(e.state==='idle'&&!e.g.visible)e.g.visible=true;
    if(arena.started&&!arena.cleared&&!arena.custom&&arena.list.every(e=>!e.alive)){arena.cleared=true;arena.hold=1.6;barrier.forceOpen=true;SFX.ok();banner('Лешачата распутаны!','#ffffff',1.8,'выход из леса открыт — ступайте');}
    if(arena.cleared)arena.hold-=dt;
    if(arena.cleared&&!F.out&&[0,1].some(pi=>active(pi).pos.z<-219)){F.out=true;finishLevel();}});
  /* ---------- новые участки: логика ---------- */
  const inLane=h=>h.pos.z<LN.z0+0.5&&h.pos.z>LN.z1-0.5&&Math.abs(h.pos.x)>0.4;
  function horoFinish(){if(F.horoDone)return;F.horoDone=true;SFX.gate();horo.forEach(r=>{r.locked=true;r.gap.visible=false;});
    anim(1.6,k=>{horo.forEach(r=>{r.bow=Math.max(r.bow,Math.min(1,k*2));r.R0=r.R0||r.R;r.R=r.R0+k*1.4;placeRing(r);});horoGateF.forEach((f,i)=>{f.g.position.x=f.x+(i?1:-1)*k*2.6;f.g.position.y=-k*3.4;});});
    later(0.4,()=>{horo.forEach(r=>r.cols.forEach(c=>{c.on=false;}));horoGate.on=false;});
    banner('Хоровод встал!','#ffd76a',2.2,'ёлки поклонились — проход дальше открыт');bark(T.pelageya,'pelageya','Глядите — кланяются! Вот вежливые ёлочки.',2.4);}
  function lockRing(r){if(r.locked)return;r.locked=true;r.gap.material.opacity=0.35;SFX.latch();anim(0.6,k=>{r.bow=k*0.6;placeRing(r);});r.lm.emissive.setHex(0x806020);r.lm.emissiveIntensity=0.25;
    const n=horo.filter(q=>q.locked).length;floatText(new V3(r.gap.position.x,2.4,r.gap.position.z),'Кольцо встало! '+n+' / 3','#ffd76a');}
  const kgFade=(fn)=>{const fd=$('fade');KG.busy=true;anim(0.3,k=>{fd.style.opacity=k;});later(0.32,()=>{fn();snapCams();anim(0.35,k=>{fd.style.opacity=1-k;});later(0.4,()=>{fd.style.opacity=0;KG.busy=false;});});};
  function kgBackToStart(){HEROES.forEach((q,i)=>{if(!q.active&&!q.following&&hd(q.pos,KG.stump)<2.5)return;placeOnGround(q,[-3,-1.2,1.2,3][i],-159.2,0);q.face=Math.PI;q.vel.set(0,0,0);q.knockT=0;});
    for(const t of W.threads.slice())if(t.sz<-157&&!t.string)removeThread(t);}
  function kgShow(){KG.notch.forEach((n,i)=>{n.visible=i<KG.loop;});kgW.forEach((m,i)=>{const on=i<KG.loop+(KG.loop>=2?1:0);m.az=m.bz=on?[-169,-174,-178.5][i]:-300;});
    kgLeshy.g.position.x=KG.loop%2?12.2:-12.2;kgLeshy.g.rotation.y=KG.loop%2?-Math.PI/2-0.4:Math.PI/2+0.4;}
  function kgRoll(){let n=KG.tru;while(n===KG.tru)n=Math.floor(Math.random()*4);KG.tru=n;}
  function krugFinish(){if(F.krugDone)return;F.krugDone=true;SFX.gate();kgWall.forEach(c=>{c.on=false;});kgBack.on=false;kgW.forEach(m=>{m.az=m.bz=-300;});
    anim(1.4,k=>{kgFirs.concat(kgBackF).forEach(f=>{f.g.position.y=-k*4.2;});});later(1.5,()=>kgFirs.concat(kgBackF).forEach(f=>{f.g.visible=false;}));
    banner('Вышли из круга!','#ffd76a',2.4,'Леший водить устал — тропа сама ведёт вперёд');bark(kgLeshy,'leshy','Ишь, аукаются! Ну и идите, идите…',2.4);}
  function kgPass(h){const gi=KG.gaps.reduce((b,x,i)=>Math.abs(h.pos.x-x)<Math.abs(h.pos.x-KG.gaps[b])?i:b,0),ok=gi===KG.tru&&KG.lit>0;
    if(ok&&KG.loop>=2){KG.loop=3;KG.notch.forEach(n=>{n.visible=true;});krugFinish();return;}
    if(ok){KG.loop++;kgFade(()=>{kgBackToStart();kgRoll();KG.lit=0;kgShow();banner('Поляна '+(KG.loop+1)+' / 3','#ffe9a8',2.2,KG.loop===1?'вышли… а поляна та же! Только зарубка на пне — значит, ведём счёт':'ещё круг — и Леший отстанет');});return;}
    kgFade(()=>{kgBackToStart();kgRoll();KG.lit=0;KG.grey.fill(0);floatText(new V3(0,2.4,-162),'Опять тут?!','#c8e0a0');SFX.miss();});
    bark(kgLeshy,'leshy',['Хе-хе! Опять тут?','Кругом да около!','Леший водит, не отпустит!'][Math.floor(Math.random()*3)],2);}
  function krugCall(h){if(F.krugDone||KG.busy||G.cine||hd(h.pos,KG.stump)>1.6)return;KG.lit=4;KG.grey.fill(0);SFX.bell();
    const L=KG.lamp[KG.tru];ringFx(L.g.position.clone().setY(0.6),COL.gold,2.2);floatText(L.g.position.clone().add(new V3(0,1.6,0)),'Ау!','#ffd76a');
    if(KG.loop>=1){const del=KG.loop>=2?0:1.0;KG.gaps.forEach((x,i)=>{if(i===KG.tru||(KG.loop===1&&i===(KG.tru+2)%4))return;later(del,()=>{if(F.krugDone)return;KG.grey[i]=1.6;floatText(KG.lamp[i].g.position.clone().add(new V3(0,1.6,0)),'ау…','#aab4c0');});});}
    if(!KG.told){KG.told=true;for(const pi of[0,1])tip(pi,'Золотой огонёк — настоящий выход! Беги, пока горит.',3.2);}}
  {const prev=W.pingCall;W.pingCall=(pi,h)=>{if(prev)prev(pi,h);krugCall(h);};}
  W.updates.push(dt=>{
    // Г: ёлки тропки держит взгляд только с другой тропки
    if(W.gaze){const src=gazeSources();for(const L of laneW){const cs=src.filter(s=>s.x*L.sd<-0.3&&s.z<LN.z0+3&&s.z>LN.z1-3);L.m.silverLock=gazeCovers(L.m.pos,cs);}
      for(const pi of[0,1]){const h=active(pi);if(!inLane(h)||F['ln'+pi]>G.time)continue;const sd=Math.sign(h.pos.x),s=[{x:h.pos.x,z:h.pos.z,fx:Math.sin(h.face),fz:Math.cos(h.face)}];
        if(laneW.some(L=>L.sd===sd&&!L.m.silverLock&&gazeCovers(L.m.pos,s)&&hd(L.m.pos,h.pos)<5.5)){F['ln'+pi]=G.time+16;tip(pi,'Свою тропку не удержишь! Ёлки держит взгляд с другой тропки.',3.4);}}
      if(!G.solo&&!F.lnTogether&&[0,1].every(pi=>inLane(active(pi))&&active(pi).pos.z<LN.z0-3)&&Math.sign(active(0).pos.x)===Math.sign(active(1).pos.x)){F.lnTogether=true;for(const pi of[0,1])tip(pi,'Разойдитесь по разным тропкам — и глядите друг на друга!',3.4);}}
    if(!F.lnIn&&[0,1].some(pi=>active(pi).pos.z<LN.z0+1.5)&&F.ringOpen){F.lnIn=true;banner('Друг за друга','#fff6c8',2.6,'ёлки своей тропки не удержишь — держи тропку друга');}
    // Д: хоровод — в луче стоит ближнее (не заслонённое) кольцо; кто встал в проход замершего кольца — кольцо встаёт насовсем
    if(!F.horoDone){const src=gazeSources();horo.forEach(r=>{r.seen=false;});
      for(const s of src){const rs=Math.hypot(s.x-HC.x,s.z-HC.z);if(rs>13)continue;let best=null,bd=99;
        for(const r of horo){if(r.locked)continue;const d=Math.abs(r.R-rs);if(d>=bd)continue;if(r.cols.some(c=>gazeCovers(c,[s]))){best=r;bd=d;}}if(best)best.seen=true;}
      for(const r of horo){if(r.locked){r.moving=false;continue;}r.hold=r.seen?0.9:r.hold-dt;const fz=r.hold>0;r.moving=!fz;r.lm.emissive.setHex(fz?0x8fb8ff:0x000000);r.lm.emissiveIntensity=fz?0.35:0;
        if(!fz){r.a+=r.w*dt;placeRing(r);}else r.cols.forEach(c=>{c.dx=0;c.dz=0;});
        let inG=false;for(const pi of[0,1]){const h=active(pi);const dx=h.pos.x-HC.x,dz=h.pos.z-HC.z,rh=Math.hypot(dx,dz);if(Math.abs(rh-r.R)>0.95)continue;let da=Math.atan2(dz,dx)-r.a;while(da>Math.PI)da-=2*Math.PI;while(da<-Math.PI)da+=2*Math.PI;
          if(Math.abs(da)*r.R<1.1)inG=true;
          else if(!fz&&h.knockT<=0&&!players[pi].downed)for(const c of r.cols){const ex=h.pos.x-c.x,ez=h.pos.z-c.z,d=Math.hypot(ex,ez);if(d<c.r+h.d.radius+0.12&&h.pos.y<3){const n=d>0.01?1/d:0;h.vel.x=ex*n*5.5;h.vel.z=ez*n*5.5;h.vel.y=4.5;h.grounded=false;h.knockT=0.4;SFX.knock();floatText(h.pos.clone().add(new V3(0,1.8,0)),'Хоровод толкнул!','#bfe8ff');break;}}}
        r.inGap=fz&&inG?r.inGap+dt:0;if(r.inGap>0.45)lockRing(r);}
      if([0,1].some(pi=>hd(active(pi).pos,HC)<1.9))horoFinish();
      if(!F.horoIn&&[0,1].some(pi=>active(pi).pos.z<-131.5)){F.horoIn=true;banner('Хоровод ёлок','#fff6c8',2.8,'глядишь — стоит ближнее кольцо; встань в его проход — и оно встанет насовсем');}}
    // Е: поляна-петля
    if(!F.krugDone){KG.lit=Math.max(0,KG.lit-dt);for(let i=0;i<4;i++)KG.grey[i]=Math.max(0,KG.grey[i]-dt);
      KG.lamp.forEach((L,i)=>{const g=KG.lit>0&&i===KG.tru,gr=KG.grey[i]>0;L.mat.color.setHex(g?0xffd76a:gr?0xb8c0c8:0x6a7a8a);L.mat.emissive.setHex(g?0xffb000:gr?0x606870:0x223040);L.mat.emissiveIntensity=g?1.3:0.6;L.g.scale.setScalar(g?1.25+0.1*Math.sin(G.time*10):1);});
      KG.ring.visible=!G.cine;KG.ring.scale.setScalar(1+0.08*Math.sin(G.time*4));
      // оставленный на пне герой аукает сам — так проходят поляну и в одиночку
      KG.autoT-=dt;const keeper=HEROES.find(q=>!q.active&&!q.following&&hd(q.pos,KG.stump)<1.6);
      if(keeper&&KG.autoT<=0&&!KG.busy&&[0,1].some(pi=>active(pi).pos.z<-163)){KG.autoT=4.4;floatText(keeper.pos.clone().add(new V3(0,keeper.d.height+0.7,0)),'Ау!',PCSS[keeper.player]);krugCall(keeper);}
      if(!KG.busy&&!G.cine)for(const pi of[0,1]){const h=active(pi);if(h.pos.z<KG.wz-0.8&&h.pos.z>-189){kgPass(h);break;}}
      if(!F.krugIn&&[0,1].some(pi=>active(pi).pos.z<-158.5)){F.krugIn=true;kgShow();banner('Леший водит по кругу','#fff6c8',2.8,'встань на пень-эхо и аукни — настоящий выход откликнется');}}
  });
  // переход к участкам — для ботов и отладки (FIN.warp('lanes'|'horo'|'krug'|'arena'))
  W.warp14=where=>{const P={lanes:[0,-100.5],horo:[0,-130],krug:[0,-159.2],arena:[0,-192]}[where];if(!P)throw new Error('warp14: '+where);
    F.kidnapped=true;F.stage='rescue';W.gaze=true;hats.forEach(h=>{h.visible=false;});T.pelageya.inRing=false;T.pelageya.ringLook=false;if(!F.ringOpen){F.watered=true;openRing();}
    W.abil.owl=true;F.seenSilver=true;F.leshyBark=true;if(where==='krug'||where==='arena')horoFinish();if(where==='arena')krugFinish();
    HEROES.forEach((h,i)=>{placeOnGround(h,P[0]+[-1.2,1.2,-3,3][i],P[1]+(i>1?0.9:0),0);h.following=false;h.vel.set(0,0,0);h.firefly=25;});for(const pi of[0,1])players[pi].cp.set(P[0],0,P[1]);snapCams();};
  W.k14={arena,barrier,hide,hideFirs,horo,HC,KG,LN,laneW,kgW,link4,horoFinish,krugFinish,krugCall,lockRing};
  W.zvenGoal=()=>{const a=HEROES.reduce((m,h)=>h.pos.z<m.pos.z?h:m);let z=a.pos.z-4.5;
    if(F.stage==='rescue'&&!F.ringOpen)z=Math.max(z,-42.5);if(!F.horoDone)z=Math.max(z,-150);else if(!F.krugDone)z=Math.max(z,-184);if(!arena.cleared)z=Math.max(z,-213.5);
    return new V3(clamp(a.pos.x*0.5,-8,8),Math.max(a.pos.y,0)+2.2,z);};
  /* ---------- рисунки кнопок ---------- */
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'swap',()=>headOf(h()),()=>F.ringOpen&&h().pos.z<-45.5&&h().pos.z>-48.5&&hd(other(pi).pos,h().pos)<4,'пусть смотрит');
    prompt(pi,'item',()=>headOf(h()),()=>h().pos.z<-68&&h().pos.z>-71.4&&!W.threads.some(t=>t.owner===pi&&!t.ret)&&(gateL.tied===null||gateR.tied===null)&&[gateL,gateR].some(g=>!g.tied&&g.tieable()));
    prompt(pi,'roll',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig==='red'&&e.help));
    prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig!=='red'&&e.help));}
  prompt(1,'skill',()=>headOf(T.yosha),()=>F.stage==='rescue'&&!F.watered&&T.yosha.active&&hd(T.yosha.pos,lockFir)<3.2);
  prompt(0,'skill',()=>headOf(T.proshka),()=>F.watered&&!F.ringOpen&&T.proshka.active&&locks.some(L=>!L.hit&&inSector(L,T.proshka)),'шишка-замок');
  prompt(1,'skill',()=>headOf(T.pelageya),()=>F.ringOpen&&W.abil.owl&&!F.seenSilver&&T.pelageya.active&&T.pelageya.pos.z<-76&&T.pelageya.pos.z>-82,'Совиный взор');
  prompt(1,'swap',()=>headOf(T.yosha),()=>F.ringOpen&&!F.seenSilver&&T.yosha.active&&T.yosha.pos.z<-76&&T.yosha.pos.z>-82);
  prompt(0,'item',()=>headOf(active(0)),()=>F.seenSilver&&!F.silver&&Math.hypot(active(0).pos.x-SV.sx,active(0).pos.z-SV.sz)<2.6);
  prompt(1,'item',()=>headOf(active(1)),()=>F.seenSilver&&!F.silver&&Math.hypot(active(1).pos.x-SV.sx,active(1).pos.z-SV.sz)<2.6);
  for(const pi of[0,1]){const h=()=>active(pi);prompt(pi,'call',()=>headOf(h()),()=>!F.krugDone&&!KG.busy&&KG.lit<=0&&hd(h().pos,KG.stump)<1.6,'Ау!');}
  /* ---------- задачи ---------- */
  const gaze=pi=>O('Ёлки ходят, когда на них не глядят!<br>Светлячок светит, куда герой смотрит, — в луче ёлки стоят.',()=>F.stage==='kidnap'||F.stage==='rescue',()=>wB.map(m=>m.g));
  const guard=pi=>O(()=>'Поставь героя к тропе лицом и смени '+K(pi,'swap')+' — светить он будет, пока светлячок горит.<br>Ёлку-ворота клубком '+K(pi,'item')+' у колышка привяжи — пусть стоит.',
    ()=>active(pi).pos.z<-73,()=>[gateL.g,gateR.g],()=>({kind:active(pi).kind,action:'walk',from:new V3(0,0,-46.5),to:new V3(0,0,-60)}));
  const glade=pi=>O(pi?()=>'Поляна Лешего — всё тут ходит. Совиный взор '+K(1,'skill')+' — четыре секунды тропа видна.<br>Брось клубок '+K(1,'item')+' вдоль серебряной тропы — вот и дорога одна.':()=>'Поляна Лешего — всё тут ходит. Пелагея серебряную тропу покажет.<br>Брось клубок '+K(0,'item')+' вдоль неё: нить Леший не сдвинет — ни на пядь, ни даже.',
    ()=>active(pi).pos.z<-98,()=>[svStart],()=>({kind:active(pi).kind,action:'walk',from:new V3(SV.sx,0,SV.sz),to:new V3(SV.ex,0,SV.ez)}));
  const lanes=pi=>O(()=>'Две тропки за изгородью. Свою тропку не удержишь — ёлки держит взгляд с другой.<br>'+(G.solo?'Оставь героя лицом к другой тропке '+K(pi,'swap')+' — пусть держит, а ты беги.':'Разойдитесь и глядите друг на друга: один держит — другой бежит.'),
    ()=>active(pi).pos.z<LN.z1-0.5,()=>laneW.filter(L=>Math.abs(L.m.pos.z-active(pi).pos.z)<7).map(L=>L.m.g));
  const horoO=pi=>O(()=>'Хоровод ёлок! Глядишь — стоит ближнее кольцо, а дальние за ним кружат.<br>Встань в проход замершего кольца — встанет насовсем ('+horo.filter(r=>r.locked).length+' / 3). Дойди до пня!',
    ()=>!!F.horoDone,()=>horo.filter(r=>!r.locked).slice(-1).map(r=>r.gap));
  const krugO=pi=>O(()=>'Леший водит по кругу! Встань на пень-эхо и аукни '+K(pi,'call')+'.<br>Золотой огонёк — настоящий выход: беги туда, пока горит (поляна '+Math.min(3,KG.loop+1)+' / 3).',
    ()=>!!F.krugDone,()=>KG.lit>0?[KG.lamp[KG.tru].g]:[KG.ring]);
  const fight=pi=>O(()=>'Лешачата! Жёлтый кружок <i class="sg y"></i> — щитом '+K(pi,'guard')+' закройся,<br>Красный зубец <i class="sg r"></i> — кувыркнись '+K(pi,'roll')+', не бойся!',()=>arena.cleared,()=>arena.list.filter(e=>e.alive).map(e=>e.g));
  W.objectives[0]=[O('Шапки из мха на пне лежат…',()=>F.stage!=='hats',()=>[stump]),gaze(0),O('Пелагею увели…',()=>F.stage==='rescue',()=>[]),
    O(()=>'Пелагея в кольце из ёлок — её луч держит ёлки на твоей тропе.<br>Веди Прошку к изгороди. А Йоша под корнями пролезет — ёлку-замок полить на себе.',()=>F.watered,()=>[lockFir.g]),
    O(()=>'Сбей три шишки-замка ('+locks.filter(L=>L.hit).length+' / 3): встань Прошкой на след светящийся<br>И из рогатки стреляй '+K(0,'skill')+' — не промахнёшься, не смутишься.',()=>F.ringOpen,()=>locks.filter(L=>!L.hit).map(L=>L.foot)),
    guard(0),glade(0),lanes(0),horoO(0),krugO(0),fight(0),O('Прочь из леса — за Звенышком!',()=>false,()=>[barrier.g])];
  W.objectives[1]=[O('Шапки из мха на пне лежат…',()=>F.stage!=='hats',()=>[stump]),gaze(1),O('Пелагею увели…',()=>F.stage==='rescue',()=>[]),
    O(()=>'Йоша, пролезь под корнями к кольцу — лаз этот лишь для тебя.<br>Ёлку-замок живой водой '+K(1,'skill')+' полей, любя.',()=>F.watered,()=>[lockFir.g],()=>({kind:'yosha',action:'walk',from:new V3(1.6,0,-33),to:new V3(4.9,0,-33)})),
    O(()=>'Шишки-замки проснулись ('+locks.filter(L=>L.hit).length+' / 3) — Прошка сбивает рогаткой.<br>Пелагея, на тропу гляди — держи ёлки украдкой!',()=>F.ringOpen,()=>[lockMark]),
    guard(1),glade(1),lanes(1),horoO(1),krugO(1),fight(1),O('Прочь из леса — за Звенышком!',()=>false,()=>[barrier.g])];
  W.tipZones.push({cond:(pi,h)=>h.inRing,text:pi=>'Пелагея в кольце из ёлок. Гляди сквозь щель на тропу — луч твой ёлки держит.<br>Потом на Йошу смени '+K(pi,'swap')+' — он дело довершит.'},
    {cond:(pi,h)=>W.gaze&&!other(pi).inRing&&other(pi).firefly>0&&other(pi).firefly<5,text:pi=>'У оставленного героя светлячок гаснет — скоро ёлки пойдут.<br>Вернись к нему иль привяжи ёлки клубком — вот и всё тут.'});
  W.onOwl=()=>{if(hd(active(1).pos,C)<14)F.seenSilver=true;};
  W.fadeTargets=()=>T.pelageya.inRing?[T.pelageya]:[];
  W.spawns=[[new V3(-2.5,0,5),new V3(-4.5,0,6)],[new V3(2.5,0,5),new V3(4.5,0,6)]];W.startAct=[0,0];
  W.pauseLine='Леший водит: ёлки ходят, пока не глядишь.<br>Луч светлячка их держит — хоть у оставленного, глядишь.<br>А Пелагея Совиный взор открыла — видишь?<br>Хоровод держи взглядом, а заблудишься — аукни: настоящий выход откликнется.';
  W.onStart=()=>hatScene();
  // Совиный взор открывается, как только Пелагея свободна
  W.updates.push(()=>{if(F.ringOpen&&!W.abil.owl){W.abil.owl=true;later(2.8,()=>{banner('Совиный взор!','#e7c3ff',2.6,'кнопка L (на джойстике RT): четыре секунды видно спрятанное — и тропу, и тайники');});}});
  flushDecor();}

