/* ============================== 4-1 «КУЗНЯ КУЗЬМЫ И ДЕМЬЯНА»: КУЗНЯ УЗНАЁТСЯ СНАРУЖИ (docs/39, 41.4) ============================== */
// Над глухой стеной входа — двускатная крыша, труба с дымом, вывеска «КУЗНЯ»; в проёме двери — тёплый отблеск горна (мерцает);
// вдоль огненной реки по краям берега — деревянные перила. Только вид: коллизий не добавляет (перила — за краем берега).
{const _b=build41;build41=function(){_b.apply(this,arguments);
  const g=new THREE.Group();W.group.add(g);const roofM=M(0x5a2e22),stoneD=M(0x4a3c36),woodM=M(0x6a4428);
  // крыша: два ската над стеной входа
  for(const s of[-1,1]){const r=addMesh(new THREE.BoxGeometry(23,0.35,4.4),roofM,0,7.1,-6.2+s*1.5,g);r.rotation.x=s*0.62;}
  addMesh(new THREE.BoxGeometry(22.4,0.3,0.5),woodM,0,8.4,-6.2,g);
  // труба и дым
  addMesh(new THREE.BoxGeometry(1.5,4.4,1.5),stoneD,6.2,8.6,-7.2,g);addMesh(new THREE.BoxGeometry(1.8,0.35,1.8),stoneD,6.2,10.9,-7.2,g);
  const top=new V3(6.2,11.2,-7.2);let sm=0;W.updates.push(dt=>{sm-=dt;if(sm<=0&&!G.manual){sm=0.22;burst(top.clone().add(new V3(rand(-0.3,0.3),0,rand(-0.3,0.3))),Math.random()<0.5?0x5a5458:0x7a7074,2,0.8,1.8);}});
  // вывеска «КУЗНЯ»
  const c=document.createElement('canvas');c.width=512;c.height=128;const x=c.getContext('2d');x.fillStyle='#3a2416';x.fillRect(0,0,512,128);x.strokeStyle='#c89a50';x.lineWidth=8;x.strokeRect(6,6,500,116);
  x.fillStyle='#ffd27a';x.font='bold 82px Georgia, serif';x.textAlign='center';x.textBaseline='middle';x.fillText('КУЗНЯ',256,68);
  const sg=new THREE.Mesh(new THREE.PlaneGeometry(3.6,0.9),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c)}));sg.position.set(0,5.05,-5.94);g.add(sg);
  // отблеск горна в двери: тёплая плоскость в проёме и мерцающий свет за ней
  const glowM=MB(0xff8a3a,{transparent:true,opacity:0.32,depthWrite:false});const gl=addMesh(new THREE.PlaneGeometry(5.6,4),glowM,0,2.1,-6.5,g);
  const pl=new THREE.PointLight(0xff8a3a,1.2,9,2);pl.position.set(0,2,-5);g.add(pl);
  W.updates.push(()=>{const k=0.8+0.2*Math.sin(G.time*7.3)+0.1*Math.sin(G.time*13.1);pl.intensity=1.2*k;glowM.opacity=W.abil.kleshi?0.14:0.3*k;});
  // перила вдоль огненной реки
  for(const sx of[-1,1]){for(let z=9;z>=-5;z-=2)addMesh(new THREE.BoxGeometry(0.16,1,0.16),woodM,sx*10.85,0.5,z,g);
    addMesh(new THREE.BoxGeometry(0.12,0.12,14.4),woodM,sx*10.85,0.95,2,g);addMesh(new THREE.BoxGeometry(0.1,0.1,14.4),woodM,sx*10.85,0.55,2,g);}
  g.traverse(o=>{if(o.isMesh){o.castShadow=false;o.userData.dress=true;}});};}
