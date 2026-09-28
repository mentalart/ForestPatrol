/* ============================== РЕЛИЗ · ТИТУЛ: «У лукоморья дуб зелёный» ============================== */
// отдельная маленькая сцена: остров у моря, дуб, златая цепь по спирали, Кот учёный ходит по цепи,
// русалка на ветвях, избушка на курьих ножках на дальнем берегу, следы невиданных зверей, закатное небо
FIN.title=(()=>{const S=new THREE.Scene(),cam=new THREE.PerspectiveCamera(40,1,0.1,420);let t0=performance.now(),T=0,intro=0;
  const C={top:new THREE.Color(0x221c52),hor:new THREE.Color(0xf4a46c),bot:new THREE.Color(0x1d3f5c)};
  S.fog=new THREE.Fog(0xe89a70,55,210);
  const sky=new THREE.Mesh(new FIN.orig.Sphere(320,32,16),new THREE.ShaderMaterial({uniforms:{top:{value:C.top},hor:{value:C.hor},bot:{value:C.bot},sunDir:{value:new V3(-0.55,0.1,-1)},sunCol:{value:new THREE.Color(1,0.82,0.52)}},
    vertexShader:skyMat.vertexShader,fragmentShader:skyMat.fragmentShader,side:THREE.BackSide,depthWrite:false,fog:false}));S.add(sky);
  const hemiT=new THREE.HemisphereLight(0xffd6b0,0x28405a,0.72);S.add(hemiT);
  const sunT=new THREE.DirectionalLight(0xffb674,1.15);sunT.position.set(-40,26,-30);sunT.castShadow=true;sunT.shadow.mapSize.set(1024,1024);{const c=sunT.shadow.camera;c.left=-18;c.right=18;c.top=18;c.bottom=-18;c.near=1;c.far=120;}sunT.shadow.bias=-0.0008;S.add(sunT);
  const fill=new THREE.DirectionalLight(0x8fb0ff,0.25);fill.position.set(30,12,30);S.add(fill);
  const L=(c,o)=>new THREE.MeshLambertMaterial(Object.assign({color:c},o||{}));
  const add=(geo,mat,x,y,z,par)=>{const m=new THREE.Mesh(geo,mat);m.position.set(x||0,y||0,z||0);m.castShadow=true;m.receiveShadow=true;(par||S).add(m);return m;};
  // солнце у горизонта
  {const s=new THREE.Mesh(new FIN.orig.Circle(14,24),new THREE.MeshBasicMaterial({color:0xfff0c0,fog:false}));s.position.set(-150,18,-250);s.lookAt(0,0,0);S.add(s);
   const h=new THREE.Mesh(new FIN.orig.Circle(30,24),new THREE.MeshBasicMaterial({color:0xffc890,fog:false,transparent:true,opacity:0.25,depthWrite:false}));h.position.set(-149,18,-249);h.lookAt(0,0,0);S.add(h);}
  // море: гранёные волны
  const seaG=new THREE.PlaneGeometry(300,300,60,60);seaG.rotateX(-Math.PI/2);const seaP=seaG.attributes.position,seaB=Float32Array.from(seaP.array);
  const sea=new THREE.Mesh(seaG,L(0x2d6c8c,{emissive:0x0a1a2a}));sea.receiveShadow=true;S.add(sea);
  // остров: трава, песок, камни
  const isl=new THREE.CylinderGeometry(10.5,12.5,3,14,2);FIN.jitter(isl,0.14);add(isl,L(0x6f9a4a),0,-0.6,0);
  const sand=new THREE.CylinderGeometry(13.6,15,1.4,16);FIN.jitter(sand,0.08);add(sand,L(0xe2c48c),0,-1.2,0);
  for(let i=0;i<14;i++){const a=i/14*Math.PI*2+0.3,r=12.8+Math.sin(i*3.1)*0.8;const k=add(new THREE.DodecahedronGeometry(0.5+((i*37)%10)/10*0.8),L(0x8a8478),Math.sin(a)*r,-0.4,Math.cos(a)*r);k.rotation.set(i,i*2,0);}
  for(let i=0;i<40;i++){const a=i*2.4,r=3+(i*53%70)/10;const g=add(new THREE.ConeGeometry(0.12,0.5,3),L(0x4f7e36),Math.sin(a)*r,1.1,Math.cos(a)*r);g.rotation.z=((i*13)%10-5)*0.05;}
  // следы невиданных зверей на песке
  for(let i=0;i<9;i++){const f=new THREE.Mesh(new FIN.orig.Circle(0.16,6),new THREE.MeshBasicMaterial({color:0x9a7a50}));f.rotation.x=-Math.PI/2;f.position.set(-6+i*0.9,-0.47,11.9+Math.sin(i*1.3)*0.5+(i%2?0.35:-0.35));f.scale.set(1,1.5,1);S.add(f);}
  // дуб
  const oak=new THREE.Group();S.add(oak);const bark=L(0x6a4a2e),leafA=L(0x4d7a2c),leafB=L(0x628f36),leafC=L(0x3f6a26);
  add(new THREE.CylinderGeometry(1.05,1.55,8.4,9),bark,0,4.2,0,oak);
  for(let i=0;i<7;i++){const a=i/7*Math.PI*2;const r=add(new THREE.ConeGeometry(0.5,2.6,5),bark,Math.sin(a)*1.7,0.5,Math.cos(a)*1.7,oak);r.rotation.x=Math.cos(a)*1.2;r.rotation.z=-Math.sin(a)*1.2;}
  const branchAt=[[1.7,6.6,0.3,-0.95,0],[-1.8,7.0,-0.4,0.95,0],[0.2,7.2,1.6,0,0.85],[0.1,7.4,-1.7,0,-0.8]];
  branchAt.forEach(([x,y,z,rz,rx])=>{const b=add(new THREE.CylinderGeometry(0.26,0.42,3.6,7),bark,x,y,z,oak);b.rotation.set(rx,0,rz);});
  [[0,10.4,0,3.9,leafA],[3.1,9.3,0.4,2.9,leafB],[-3.2,9.6,-0.3,2.9,leafA],[0.3,9.5,2.8,2.6,leafC],[0.4,9.7,-2.8,2.7,leafB],[1.7,11.8,-0.8,2.3,leafC],[-1.6,11.5,1.1,2.2,leafB]].forEach(([x,y,z,r,m])=>{const g=new FIN.orig.Icosa(r,1);FIN.jitter(g,0.16);add(g,m,x,y,z,oak);});
  // златая цепь: звенья по спирали вокруг ствола
  const gold=L(0xffc83a,{emissive:0x7a5200,emissiveIntensity:0.55});const linkG=new THREE.TorusGeometry(0.3,0.08,6,12);
  const spiral=u=>{const a=u*Math.PI*2*3.2,y=1.3+u*6.4,r=1.62-u*0.42;return new V3(Math.sin(a)*r,y,Math.cos(a)*r);};
  const NL=58;for(let i=0;i<NL;i++){const u=i/NL,p=spiral(u),q=spiral(u+0.004);const m=add(linkG,gold,p.x,p.y,p.z,oak);m.lookAt(q.x,q.y,q.z);m.rotateY(Math.PI/2);if(i%2)m.rotateX(Math.PI/2);}
  // Кот учёный: ходит по цепи — направо песнь заводит, налево сказку говорит
  const cat=new THREE.Group();oak.add(cat);const fur=L(0x7a7c86),furD=L(0x4a4c56),eyeM=new THREE.MeshBasicMaterial({color:0xffd24a});
  const bodyC=add(new THREE.CylinderGeometry(0.26,0.3,0.9,7),fur,0,0.42,0,cat);bodyC.rotation.x=Math.PI/2;
  const head=new THREE.Group();head.position.set(0,0.68,0.5);cat.add(head);add(new THREE.IcosahedronGeometry(0.3),fur,0,0,0,head);
  for(const s of[-1,1]){const e=add(new THREE.ConeGeometry(0.1,0.24,4),furD,s*0.16,0.28,-0.02,head);e.rotation.z=-s*0.2;const ey=new THREE.Mesh(new FIN.orig.Sphere(0.05,6,4),eyeM);ey.position.set(s*0.11,0.05,0.26);head.add(ey);}
  const legs=[];for(const[x,z]of[[-0.15,0.3],[0.15,0.3],[-0.15,-0.3],[0.15,-0.3]])legs.push(add(new THREE.CylinderGeometry(0.06,0.06,0.36,5),furD,x,0.18,z,cat));
  const tail=[];let tp=cat;for(let i=0;i<4;i++){const s=new THREE.Group();s.position.set(0,i?0.22:0.5,i?0:-0.45);tp.add(s);add(new THREE.CylinderGeometry(0.05,0.06,0.24,5),furD,0,0.11,0,s);s.rotation.x=-0.5;tail.push(s);tp=s;}
  // русалка на ветвях
  const mer=new THREE.Group();mer.position.set(2.9,7.55,0.35);oak.add(mer);
  add(new THREE.ConeGeometry(0.22,0.9,6),L(0x2fa89a,{emissive:0x0a3a34}),0,-0.2,0,mer).rotation.z=Math.PI*0.5;
  add(new THREE.IcosahedronGeometry(0.2),L(0xf2c8a8),0.35,0.15,0,mer);add(new THREE.ConeGeometry(0.2,0.55,6),L(0xe8b84a),0.4,0.12,-0.08,mer).rotation.z=0.3;
  const merTail=mer.children[0];
  // избушка на курьих ножках — на дальнем берегу
  {const hut=new THREE.Group();hut.position.set(34,0,-38);hut.rotation.y=-0.7;S.add(hut);const isl2=new THREE.CylinderGeometry(5,6.5,2,10);FIN.jitter(isl2,0.15);add(isl2,L(0x5f8a44),0,-0.8,0,hut);
   for(const s of[-1,1]){const l=add(new THREE.CylinderGeometry(0.14,0.2,2.2,5),L(0xd8a040),s*0.8,1.1,0,hut);l.rotation.z=s*0.18;}
   add(new THREE.BoxGeometry(2.6,1.8,2.2),L(0x7a5230),0,2.9,0,hut);const roof=add(new THREE.ConeGeometry(2.2,1.5,4),L(0x5a3a22),0,4.5,0,hut);roof.rotation.y=Math.PI/4;}
  // птицы над морем
  const birds=[];for(let i=0;i<5;i++){const b=new THREE.Group();S.add(b);const wm=new THREE.MeshBasicMaterial({color:0x2a2030,side:THREE.DoubleSide,fog:false});
    for(const s of[-1,1]){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute([0,0,0,s*0.9,0,0.2,s*0.4,0,-0.25],3));const w=new THREE.Mesh(g,wm);w.userData.s=s;b.add(w);}birds.push({b,a:i*1.3,r:32+i*5,h:16+i*2.5,sp:0.08+i*0.012});}
  // листья падают
  const leaves=[];const lg=new THREE.BufferGeometry();lg.setAttribute('position',new THREE.Float32BufferAttribute([0,0,0,0.18,0.05,0,0.06,0.2,0],3));
  for(let i=0;i<50;i++){const m=new THREE.Mesh(lg,L(i%3?0x7aa83c:0xd8a038,{side:THREE.DoubleSide}));S.add(m);leaves.push({m,ph:i*0.73,r:1+((i*29)%60)/10,sp:0.5+((i*17)%10)/12});}
  function upd(dt){T+=dt;intro=Math.min(1,intro+dt/5.5);
    for(let i=0;i<seaP.count;i++){const x=seaB[i*3],z=seaB[i*3+2];seaP.setY(i,Math.sin(x*0.18+T*0.9)*0.28+Math.cos(z*0.22+T*0.7)*0.24+Math.sin((x+z)*0.07+T*0.4)*0.4-1.1);}seaP.needsUpdate=true;
    // кот идёт по цепи то вверх, то вниз
    const ph=(T*0.018)%2,u=0.06+0.86*(ph<1?ph:2-ph),dir=ph<1?1:-1,p=spiral(u),q=spiral(u+0.01*dir);const out=new V3(p.x,0,p.z).normalize().multiplyScalar(0.28);
    cat.position.set(p.x+out.x,p.y+0.12,p.z+out.z);cat.lookAt(q.x+out.x,q.y+0.12,q.z+out.z);legs.forEach((l,i)=>{l.rotation.x=Math.sin(T*7+(i%2?Math.PI:0)+(i>1?Math.PI:0))*0.5;});
    tail.forEach((s,i)=>{s.rotation.z=Math.sin(T*2+i*0.7)*0.25;});head.rotation.y=Math.sin(T*0.7)*0.35;
    merTail.rotation.y=Math.sin(T*1.3)*0.25;
    birds.forEach(o=>{o.a+=dt*o.sp;o.b.position.set(Math.sin(o.a)*o.r,o.h+Math.sin(T+o.a)*1.5,Math.cos(o.a)*o.r-20);o.b.rotation.y=o.a+Math.PI/2;o.b.children.forEach(w=>{w.rotation.z=w.userData.s*Math.sin(T*6+o.a)*0.45;});});
    leaves.forEach(l=>{const k=((T*l.sp*0.12+l.ph)%1);l.m.position.set(Math.sin(l.ph*5+T*0.3)*(2+l.r*1.8),12-k*12.5,Math.cos(l.ph*3+T*0.25)*(2+l.r*1.8));l.m.rotation.set(T*l.sp*2+l.ph,T*l.sp+l.ph,0);l.m.visible=k<0.97;});
    // камера: плавный облёт; дуб правее центра, слева — меню; в начале — пролёт сверху
    const e=1-Math.pow(1-intro,3),ang=0.55+T*0.035,R=lerp(46,25,e),hh=lerp(24,7.4,e)+Math.sin(T*0.21)*0.8;
    cam.position.set(Math.sin(ang)*R,hh,Math.cos(ang)*R);const look=new V3(0,lerp(3,6,e),0);const right=new V3(Math.cos(ang),0,-Math.sin(ang));look.addScaledVector(right,-FIN.titleShift*e);cam.lookAt(look);}
  return {S,cam,restart(){intro=0;T=0;},render(){const now=performance.now(),dt=Math.min(0.05,(now-t0)/1000);t0=now;upd(dt);
      const Wd=innerWidth,H=innerHeight;cam.aspect=Wd/H;cam.updateProjectionMatrix();renderer.setViewport(0,0,Wd,H);renderer.setScissor(0,0,Wd,H);
      sunT.castShadow=renderer.shadowMap.enabled;renderer.shadowMap.needsUpdate=true;renderer.render(S,cam);}};})();
FIN.titleShift=5.5;FIN.titleOn=false;
