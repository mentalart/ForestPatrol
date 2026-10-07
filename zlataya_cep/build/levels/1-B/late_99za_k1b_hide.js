/* ============================== РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: ЭТАП 2 — «ИЩИ-СВИЩИ»: ПРЯТКИ ДВОЙНИКОВ ============================== */
// docs/29_leshy_proposals.md, шаг 4. Вместо ровного хоровода по кругу двойники играют в прятки: бегут к ёлкам, приседают и выглядывают («Ку-ку!»), а раз в 9–12 с два двойника
// присаживаются в клубах дыма и меняются местами (кольцо, радиус и ход — тоже). Круг 1 — один хоровод (7 м), круг 2 — два навстречу (внутренний 4,8 м и внешний 8,6 м): струны ловят по-разному.
// Настоящего видно и без взора: за ним остаются мох-следы (у двойников — нет), у него тень и дыхание (шаг 1). Совиный взор — золотой обруч, свет-луч и «огонёк» над настоящим.
// Ловушка с шуткой: двойник на струне — «Пфф!», клуб дыма и куча шишек; настоящий падает плашмя, над головой кружатся звёзды, лежит 6 с (было 5).
// Всё поверх уровня: движение подменяет FIN.k1b.hideStep (замена в rep_30_leshy1b.py), логика ловушек, ударов и кругов — прежняя.
const K1D={nextSwap:9,swaps:0,hides:0,lastBark:-9};K1B.hide=K1D;
function k1dBusy(d){return W.doubles.some(o=>o!==d&&o.k2&&o.state!=='gone'&&(o.k2.mode==='dash'||o.k2.mode==='peek'||o.k2.mode==='swap'));}
// слоты хороводов при появлении: круг 1 — один хоровод, круг 2 — два навстречу
K1B.hideInit=function(doubles,n,round,C){const two=round>=1,n0=Math.ceil(n/2),n1=Math.floor(n/2);K1D.nextSwap=rand(7,10);
  doubles.forEach((d,i)=>{const ring=two?i%2:0,cnt=two?(ring?n1:n0):n,idx=two?Math.floor(i/2):i;
    d.em.visible=false;   // оранжевый шарик уровня заменён обручем взора
    d.k2={ring,r:two?(ring?8.6:4.8):7,w:two?(ring?0.30:-0.42):0.32,a:idx/Math.max(1,cnt)*Math.PI*2+(ring?0.5:0),mode:'ring',t:0,nextHide:rand(3.5,8.5),spot:null,px:null,pz:null,acc:0,stars:null,halo:null,lead:false,mate:null,swapT:0};});};
// шаг двойника: вместо ровного круга (подменяет строку движения в W.updates уровня)
K1B.hideStep=function(d,dt,C){const k=d.k2,m=d.m,b=m.body;
  if(!k){d.a+=dt*0.32;d.pos.set(C.x+Math.cos(d.a)*7,0,C.z+Math.sin(d.a)*7);m.g.rotation.y=-d.a;b.rotation.z=Math.sin(G.time*5+d.a)*0.06;return;}
  k.t+=dt;k.a+=k.w*dt;const sx=C.x+Math.cos(k.a)*k.r,sz=C.z+Math.sin(k.a)*k.r;let sy=1;
  const mv=(tx,tz,sp)=>{const dx=tx-d.pos.x,dz=tz-d.pos.z,dd=Math.hypot(dx,dz);if(dd<0.001)return 0;const s=Math.min(dd,sp*dt);d.pos.x+=dx/dd*s;d.pos.z+=dz/dd*s;m.g.rotation.y=Math.atan2(dx,dz);return dd-s;};
  const ox=d.pos.x,oz=d.pos.z;
  if(k.mode==='ring'){d.pos.set(sx,0,sz);m.g.rotation.y=k.w>0?-k.a:-k.a+Math.PI;
    k.nextHide-=dt;if(k.nextHide<=0){if(k1dBusy(d))k.nextHide=1.2;else{const a=k.a;k.spot={x:C.x+Math.cos(a)*11,z:C.z+Math.sin(a)*11};k.mode='dash';k.t=0;K1D.hides++;}}}
  else if(k.mode==='dash'){if(mv(k.spot.x,k.spot.z,7.5)<0.35){k.mode='peek';k.t=0;
      if(G.time-K1D.lastBark>3.5){K1D.lastBark=G.time;try{say('leshy','Ку-ку!',0.9);}catch(e){}}}}
  else if(k.mode==='peek'){m.g.rotation.y=Math.atan2(C.x-d.pos.x,C.z-d.pos.z);sy=0.84+0.05*Math.sin(k.t*6);   // присел за ёлкой и выглядывает
    if(k.t>1.3){k.mode='back';k.t=0;}}
  else if(k.mode==='back'){if(mv(sx,sz,8.5)<0.5){k.mode='ring';k.t=0;k.nextHide=rand(5,10);}}
  else if(k.mode==='swap'){d.pos.set(sx,0,sz);sy=1-0.3*Math.sin(Math.min(1,k.swapT/0.6)*Math.PI*0.5);}   // присел в клубах дыма — вот-вот поменяются
  // настоящий оставляет мох-следы (у двойников следов нет)
  if(d.real){k.acc+=Math.hypot(d.pos.x-ox,d.pos.z-oz);if(k.acc>1.3){k.acc=0;if(K1B.fx&&k.mode!=='peek')K1B.fx.print(d.pos.x,d.pos.z);}}
  m.g.scale.set(1.35,1.35*sy,1.35);b.rotation.z=Math.sin(G.time*5+k.a)*0.06;};
/* ---------- обруч Совиного взора и звёзды над упавшим ---------- */
function k1dHalo(d){const g=new THREE.Group();g.position.set(0,6.5,0);const ring=new THREE.Mesh(new THREE.TorusGeometry(1.0,0.09,6,28),new THREE.MeshBasicMaterial({color:0xffd76a,transparent:true,opacity:0.95,depthWrite:false}));ring.rotation.x=Math.PI/2;g.add(ring);
  const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:K1_SOFT,color:0xffe8a0,transparent:true,opacity:0.8,blending:THREE.AdditiveBlending,depthWrite:false}));glow.scale.setScalar(4.4);g.add(glow);
  const beam=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.95,6.5,16,1,true),new THREE.MeshBasicMaterial({color:0xffe8a0,transparent:true,opacity:0.2,blending:THREE.AdditiveBlending,depthWrite:false,side:THREE.DoubleSide}));beam.position.y=-3.25;g.add(beam);
  g.visible=false;d.m.g.add(g);k1Dyn(g);return {g,ring,glow,beam};}
function k1dStars(d){const a=[];for(let i=0;i<3;i++){const m=new THREE.Mesh(new THREE.OctahedronGeometry(0.22,0),new THREE.MeshBasicMaterial({color:i%2?0xffe36b:0xfff6c0}));m.visible=false;m.userData.noBatch=true;m.userData.noBatchL=true;W.group.add(m);a.push(m);}return a;}
function k1dTick(dt){const t=G.time,ds=W.doubles.filter(d=>d.k2&&d.state!=='gone');
  // обмен местами: раз в 9–12 с два двойника в клубах дыма меняются слотами
  K1D.nextSwap-=dt;if(K1D.nextSwap<=0){const ring=ds.filter(d=>d.state==='walk'&&d.k2.mode==='ring');
    if(ring.length>=2&&!ds.some(d=>d.k2.mode==='swap')){const a=ring[Math.floor(Math.random()*ring.length)];let b=ring.filter(o=>o!==a);b=b[Math.floor(Math.random()*b.length)];
      for(const d of[a,b]){d.k2.mode='swap';d.k2.swapT=0;if(K1B.fx)K1B.fx.puff(d.pos.x,1.2,d.pos.z,4);}a.k2.lead=true;a.k2.mate=b;b.k2.mate=a;}
    K1D.nextSwap=rand(9,12);}
  for(const d of ds){const k=d.k2;
    if(k.mode==='swap'){k.swapT+=dt;if(!k.lead&&k.swapT>1.6){k.mode='ring';k.t=0;}   // напарника запутали по пути — не застревать в приседе
      if(k.lead&&k.swapT>=0.6){const o=k.mate,q=o.k2;for(const f of['a','r','w','ring']){const v=k[f];k[f]=q[f];q[f]=v;}   // слоты обменяны: кольцо, радиус и ход — тоже
        for(const x of[d,o]){x.k2.mode='ring';x.k2.t=0;x.k2.lead=false;x.k2.nextHide=rand(5,10);const C=K1B.cur.C;x.pos.set(C.x+Math.cos(x.k2.a)*x.k2.r,0,C.z+Math.sin(x.k2.a)*x.k2.r);if(K1B.fx)K1B.fx.puff(x.pos.x,1.2,x.pos.z,4);}
        K1D.swaps++;try{SFX.whoosh();}catch(e){}}}
    // золотой обруч над настоящим, пока горит Совиный взор
    if(d.real){const on=W.owlT>0&&d.state!=='gone';if(on&&!k.halo)k.halo=k1dHalo(d);if(k.halo){const h=k.halo,v=on?Math.min(1,W.owlT/0.45,(4.2-W.owlT)/0.25+0.0001):0;h.g.visible=v>0.02;if(h.g.visible){h.ring.rotation.z+=dt*2.2;h.g.position.y=6.5+Math.sin(t*3)*0.2;h.ring.material.opacity=0.95*v;h.glow.material.opacity=0.8*v;h.beam.material.opacity=0.2*v;}}}
    // звёзды над упавшим настоящим
    if(d.real&&d.state==='fallen'){if(!k.stars)k.stars=k1dStars(d);k.stars.forEach((s,i)=>{s.visible=true;const a=t*4+i*2.1;s.position.set(d.pos.x+Math.cos(a)*1.4,1.5+Math.sin(t*5+i)*0.15,d.pos.z+Math.sin(a)*1.4);s.rotation.y=a*2;});}
    else if(k.stars)k.stars.forEach(s=>{s.visible=false;});}}
// клуб дыма и «Пфф!» на любых шишках (ловушка, удар по двойнику): шишки сыплет прежний код уровня
{const _mc=makeCones;makeCones=function(p,n){_mc(p,n);if(W&&W.levelId==='1-B'&&K1B.cur&&K1B.fx&&W.flags.phase===2)K1B.fx.puff(p.x,0.9,p.z,5,0xb8d8a8);};}
{const _ll=loadLevel;loadLevel=function(i){K1D.nextSwap=9;_ll(i);};}
{const _st=step;step=function(dt){_st(dt);const c=K1B.cur;if(!c||!W||W.levelId!=='1-B'||W.flags.phase!==2||G.cine)return;try{k1dTick(dt);}catch(e){console.error('k1d',e);}};}
