/* ============================== РЕЛИЗ final06 · 2-1: МЕРНЫЕ РЕЙКИ У ВОДЫ — ГДЕ ПРИЛИВ, ГДЕ ОТЛИВ, КАКУЮ ВОДУ МЕНЯЮТ ГУСЛИ ============================== */
// У каждой воды уровня (рядом с её ракушкой) — мерная рейка: синяя метка вверху — прилив, песочная внизу — отлив, поплавок держится
// на нынешней глади. Вода, которую сейчас поменяют гусли героя (та, что под ним), подсвечена: рейка мигает золотом, поплавок крупнее.
// У Переливной улицы рейки двух каналов ходят наоборот — видно, что вода одна. Только 2-1; механику воды модуль не меняет.
const K21G={list:[]};
function k21GaugeMesh(z){const s=z.shell.g.position,cx=(z.minx+z.maxx)/2;
  let x=clamp(s.x,z.minx+0.3,z.maxx-0.3),zz=clamp(s.z,z.minz+0.3,z.maxz-0.3);if(Math.hypot(x-s.x,zz-s.z)<0.6)x+=x<cx?0.9:-0.9;
  const g=new THREE.Group();g.position.set(x,0,zz);W.group.add(g);
  const y0=z.floor,y1=z.high+0.5,poleM=M(0xf2ead6,{emissive:0x806010,emissiveIntensity:0});
  const pole=addMesh(new THREE.BoxGeometry(0.12,y1-y0,0.12),poleM,0,(y0+y1)/2,0,g);
  for(let y=Math.ceil(y0*2)/2;y<y1;y+=0.5)addMesh(new THREE.BoxGeometry(0.2,0.025,0.2),M(0x6a5a40),0,y,0,g);   // риски через полметра
  const hiM=M(0x3a9aff,{emissive:0x1a5aff,emissiveIntensity:0.3}),loM=M(0xe8b860,{emissive:0x8a5a10,emissiveIntensity:0.3});
  const hi=addMesh(new THREE.BoxGeometry(0.3,0.16,0.3),hiM,0,z.high,0,g),lo=addMesh(new THREE.BoxGeometry(0.3,0.16,0.3),loM,0,Math.max(z.low,y0+0.08),0,g);
  addMesh(new THREE.ConeGeometry(0.16,0.26,4),hiM,0,y1+0.15,0,g);                                                                  // синяя стрелка вверх — прилив
  const fl=new THREE.Group();g.add(fl);addMesh(new THREE.SphereGeometry(0.17,10,8),M(0xff5a3a,{emissive:0x801a0a,emissiveIntensity:0.4}),0,0,0,fl).scale.y=0.7;
  addMesh(new THREE.CylinderGeometry(0.03,0.03,0.3,5),M(0xffffff),0,0.18,0,fl);                                                   // поплавок
  g.traverse(c=>{c.userData.noBatch=true;});
  return {z,g,pole,poleM,hi,lo,hiM,loM,fl,glow:0};}
function k21Gauges(){K21G.list=[];
  for(const z of W.waters){if(!z.shell||z.noGusli||z.noGauge)continue;K21G.list.push(k21GaugeMesh(z));}
  W.updates.push(dt=>{const mine=new Set();if(W.abil.gusli)for(const pi of[0,1]){const h=active(pi);if(!h||players[pi].downed)continue;const z=zoneAt(h);if(z)mine.add(z);}
    for(const Gq of K21G.list){const z=Gq.z,hiOn=z.state==='high',k=Math.min(1,z.t);
      Gq.fl.position.y=z.level+0.05+Math.sin(G.time*2.4+Gq.g.position.z)*0.04;Gq.fl.rotation.z=Math.sin(G.time*1.7+Gq.g.position.x)*0.15;
      Gq.hiM.emissiveIntensity=hiOn?0.3+0.9*k:0.15;Gq.loM.emissiveIntensity=hiOn?0.15:0.3+0.9*k;
      Gq.glow=damp(Gq.glow,mine.has(z)?1:0,6,dt);Gq.poleM.emissiveIntensity=Gq.glow*(0.45+0.35*Math.sin(G.time*6));Gq.fl.scale.setScalar(1+0.45*Gq.glow);}});}
FIN.k21Gauges=K21G;
{const _b=build21;build21=function(){_b();try{k21Gauges();}catch(err){console.error('k21 gauge',err);}};}
