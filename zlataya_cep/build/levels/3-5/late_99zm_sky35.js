/* ============================== РЕЛИЗ final06 · 3-5 «ГУСИ-ЛЕБЕДИ»: ТУДА — ТИХО, ОБРАТНО — ПОГОНЯ (docs/40; прежний шаг — docs/38) ============================== */
// Заменяет build35 прототипа (proto/levels/3-5.js — прежний уровень). Острова и пропасть — на прежних местах, по ним идут туда и обратно.
// Туда — стелс, у каждого участка своё понятие и свой герой:
//   А лиловый мосток под гусем — тьма безопасна; Б золотой под гусем — ждать отворота (или тёмный обход справа, орешек);
//   В пустое гнездо (пёрышко Тишки — его унесли к Яге), сторож на столбике глядит на золотой мосток не отрываясь —
//     Прошка рогаткой звякает колокольчиком-приманкой, сторож отворачивается на 4 с;
//   Г печка угощает пирожком (принять — съесть за 4 с, отказаться — уйти); Д гусь висит над мостком — Потап светит из-под щита
//     (под щитом свет гусю не виден), друзья идут рядом без света; Е спящий гусь у золотого мостка — тише;
//   Ж яблонька угощает: кислое яблочко высоко — Потап подкидывает друга, Йоша поливает; З гусь висит над мостком —
//     Йоша поливает облачко, тучка встаёт тенью над мостком; И «коса»: золотая нить и лиловая, в перехвате свет гасит лиловую;
//   К речка угощает киселём, кисельные берега вязкие (Йоша лёгкая — бежит поверху); Л пропасть — перо меняют на бегу;
//   М двор Яги: Яга дремлет (шум или свет рядом — ворочается: замри!), мышка просит кашки — горшок со стола Яги,
//     накормили — мышка садится вместо Тишки, Йоша сажает Тишку на спину. Камера разворачивается — погоня.
// Обратно — волны гусей (кто светит под волной — к колокольчику) и Яга на ступе; укрытия прячут, а кто отказался от угощения —
//   тому лишняя просьба: речка — запруда, яблонька — полить, печка — полено. Тишка за укрытия вспоминает строчки колыбельной:
//   строчка — разовый приём «Ко мне!» у того, кто везёт Тишку: волна засыпает, Яга дремлет.
// Мини-босс «Гусь-вожак» на островке печки: ныряет на свет — приманите в ловушку (кисельные лужи, устье печки — Потап захлопнет
//   заслонку), увяз — Совиный взор находит узел, Прошка сбивает рогаткой. Три узла — ключ упал, колыбельная целиком, Яга узнаёт героев.
/* ---------- гуси с подозрением: «!» растёт, пока свет в луче; ободок пятна и след «куда посмотрит»; тень щита и тучки прячет свет ---------- */
{const L=LEVELS.find(l=>l.id==='3-5');if(L)L.nuts=10;}   // орешков на уровне стало больше — для списка уровней (звеньев по-прежнему 5)
const SUS35={exM:null};
function sus35T(){if(G.solo)return 1.2;const p=genPath();return p==='easy'?1.2:p==='hard'?0.3:0.8;}
// параметр по пути: Ёжик и одиночка / обычный / Богатырь
function p35(e,m,h){if(G.solo)return e;const p=genPath();return p==='easy'?e:p==='hard'?h:m;}
function sus35Gear(q){if(q.ex)return;const g=new THREE.Group();W.group.add(g);const m=MB(0xffffff,{transparent:true,opacity:0.95,depthWrite:false});
  const bar=new THREE.Mesh(new THREE.BoxGeometry(0.16,0.5,0.08),m);bar.position.y=0.38;g.add(bar);const dot=new THREE.Mesh(new THREE.SphereGeometry(0.1,8,6),m);g.add(dot);g.renderOrder=7;g.visible=false;
  q.ex=g;q.exM=m;
  q.ring=new THREE.Mesh(new THREE.TorusGeometry(1,0.045,6,40),MB(0xffffff,{transparent:true,opacity:0.6,depthWrite:false}));q.ring.rotation.x=Math.PI/2;q.ring.renderOrder=5;W.group.add(q.ring);
  q.ghost=new THREE.Mesh(new THREE.TorusGeometry(1,0.03,4,40),MB(0xe8f4ff,{transparent:true,opacity:0.22,depthWrite:false}));q.ghost.rotation.x=Math.PI/2;q.ghost.renderOrder=5;W.group.add(q.ghost);}
function sus35Look(q,a){if(q.path){const p=q.path(a);return p;}const x=q.cx+Math.cos(a)*q.R,z=q.cz+Math.sin(a)*q.R;return {x,z,fx:-Math.sin(a)*Math.sign(q.w),fz:Math.cos(a)*Math.sign(q.w)};}
function sus35Update(dt){const T35=sus35T();
  for(const q of W.geese){const en=!q.on||q.on();sus35Gear(q);q.m.g.visible=en;const fly=en&&q.state==='fly';q.cone.visible=q.foot.visible=q.ring.visible=q.ghost.visible=fly;q.ex.visible=fly&&(q.sus||0)>0.02;
    if(!en){q.sus=0;continue;}
    if(q.state==='sleep'){const L=sus35Look(q,q.a);q.pos.set(L.x,q.y,L.z);q.m.g.position.copy(q.pos);q.m.g.rotation.y=Math.atan2(L.fx,L.fz);q.m.head.rotation.x=1.1;q.m.body.rotation.z=0;q.m.wings.forEach(w=>{w.wp.rotation.z=0;});q.sus=0;continue;}
    if(q.state==='fly'){q.a+=q.w*dt;const L=sus35Look(q,q.a),x=L.x,z=L.z,fx=L.fx,fz=L.fz;
      const y=q.y-q.lowK*3;q.pos.set(x,y,z);q.m.g.position.copy(q.pos);q.m.g.rotation.y=Math.atan2(fx,fz);q.m.body.rotation.z=q.R>0?-Math.sign(q.w)*0.25:0;
      q.fp.set(x+fx*q.ahead,q.gy,z+fz*q.ahead);const hgt=y-q.gy;q.cone.position.set((x+q.fp.x)/2,(y+q.gy)/2,(z+q.fp.z)/2);q.cone.scale.set(q.fr,hgt,q.fr);
      q.cone.quaternion.setFromUnitVectors(new V3(0,1,0),new V3(x-q.fp.x,hgt,z-q.fp.z).normalize());q.foot.position.set(q.fp.x,q.gy+0.07,q.fp.z);q.foot.scale.setScalar(q.fr);
      q.ring.position.set(q.fp.x,q.gy+0.09,q.fp.z);q.ring.scale.setScalar(q.fr);
      {const N=sus35Look(q,q.a+q.w*1.0);q.ghost.position.set(N.x+N.fx*q.ahead,q.gy+0.08,N.z+N.fz*q.ahead);q.ghost.scale.setScalar(q.fr*0.96);q.ghost.visible=fly&&!q.noGhost;}
      q.m.wings.forEach(w=>{w.wp.rotation.z=q.R>0?w.sd*Math.sin(G.time*6+q.a)*0.45:w.sd*0.12;});
      let seen=null;if(!G.cine&&!(W.gooseCalm>0))for(const h of HEROES){if(!heroLight(h))continue;if(W.veil35&&W.veil35(h))continue;if(hd(h.pos,q.fp)<q.fr&&Math.abs(h.pos.y-q.gy)<3.2){seen=h;break;}}
      if(seen){if(q.susH!==seen){q.susH=seen;}q.sus=(q.sus||0)+dt/T35;if(!q.susSnd){q.susSnd=1;tone(660,0.12,'square',0.06,880);}
        if(q.sus>=1){q.sus=0;q.susSnd=0;q.peak=0;gooseGrab(q,seen);}else q.peak=Math.max(q.peak||0,q.sus);}
      else{if(q.sus>0){q.sus=Math.max(0,q.sus-dt*1.4);if(q.sus===0){if((q.peak||0)>0.3){floatText(q.pos.clone().add(new V3(0,1.2,0)),'Показалось…','#e8f4ff');}q.peak=0;q.susSnd=0;}}}
      const k=q.sus||0;q.m.head.rotation.x=k*0.7;if(q.m.brows)q.m.brows.forEach(b=>{b.rotation.z=-b.userData.sd*k*0.7;});q.exM.color.setHex(k<0.5?0xffffff:k<0.8?0xffb040:0xff5a3a);q.ex.position.set(x,y+1.25,z);q.ex.scale.setScalar(0.6+k*0.9);q.ex.lookAt(camS.position);
      q.foot.material.color.setHex(k<0.05?0xf0f8ff:k<0.6?0xffd890:0xff9a70);q.foot.material.opacity=0.28+k*0.3;q.ring.material.color.setHex(k<0.05?0xffffff:0xffb040);}
    else if(q.state==='dive'){q.t+=dt;const h=q.prey,k=Math.min(1,q.t/0.6);q.pos.lerpVectors(q.from,h.pos.clone().add(new V3(0,h.d.height+0.3,0)),smooth(k));q.m.g.position.copy(q.pos);
      q.m.wings.forEach(w=>{w.wp.rotation.z=w.sd*0.9;});if(k>=1){q.state='carry';q.t=0;const p=players[h.player],kk=p.heroes.indexOf(h);h.lit=false;burst(h.pos.clone().add(new V3(0,0.8,0)),0xffffff,14,4);
        if(W.potDrop35)W.potDrop35(h);placeOnGround(h,p.cp.x+(kk?1.2:-0.4),p.cp.z,p.cp.y);h.iT=1.2;h.following=false;floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Гусь к колокольчику отнёс','#e8f4ff');
        if(h.active)tip(h.player,'Гусь увидел свет! Гаси, пока «!» не вырос.',3.2);G.stats.geese=(G.stats.geese||0)+1;}}
    else{q.t+=dt;const k=Math.min(1,q.t/1.2);q.m.g.position.y=lerp(q.pos.y,q.y,k);if(k>=1)q.state=q.kind==='sleep'?'sleep':'fly';}}
  if(W.gooseCalm>0)W.gooseCalm-=dt;
  // слой напряжения: чем выше «!» у какого-нибудь гуся, тем чаще глухой стук
  {let mx=0;for(const q of W.geese)if(q.state==='fly'&&(!q.on||q.on()))mx=Math.max(mx,q.sus||0);SUS35.beat=(SUS35.beat||0)-dt;if(mx>0.08&&SUS35.beat<=0){SUS35.beat=lerp(0.75,0.28,mx);tone(70+mx*30,0.16,'sine',0.05+mx*0.07,55);}}}
{const _ug=updateGeese;updateGeese=function(dt){if(!W.sus35)return _ug(dt);sus35Update(dt);};}
// «Ко мне!» у того, кто везёт Тишку, — строчка колыбельной (на погоне)
{const _dc=doCall;doCall=function(pi){if(W.sing35&&W.sing35(pi))return;return _dc(pi);};}
WHO.mysh=WHO.mysh||['Мышка-норушка','#c8c8d0'];
// мышка-норушка
function mouse35(){const g=new THREE.Group();W.group.add(g);const fur=M(0x8a8a90),pink=M(0xd8a0a8);
  const b=addMesh(new THREE.SphereGeometry(0.16,10,8),fur,0,0.14,0,g);b.scale.set(0.85,0.75,1.35);addMesh(new THREE.SphereGeometry(0.1,8,6),fur,0,0.2,0.2,g);
  for(const s of[-1,1]){addMesh(new THREE.SphereGeometry(0.06,6,5),pink,s*0.08,0.3,0.17,g);addMesh(new THREE.SphereGeometry(0.022,5,4),MAT.dark,s*0.045,0.23,0.29,g);}
  const tl=addMesh(new THREE.CylinderGeometry(0.012,0.012,0.42,4),pink,0,0.1,-0.36,g);tl.rotation.x=Math.PI/2;return {g};}

build35=function(){
  W.zvenAway=true;W.world=3;W.sus35=true;setTheme('heaven');W.name='3-5 · «Гуси-лебеди»';W.sub='Небесное царство · туда — тихо, обратно — погоня';W.camX=12;const F=W.flags;F.stage='walk';
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.pero=true;W.fallY=-12;const T=HERO;F.lines=0;F.songs=0;F.knots=0;
  scene.background=new THREE.Color(0x3a3474);scene.fog=new THREE.Fog(0x3a3474,26,96);
  heavenDecor(-222,20);
  const back=()=>!!F.back,zOf=pi=>active(pi).pos.z,noisy=h=>h.rollT>0||h.atkT>0.2||(!h.grounded&&h.vel.y<-6.5);
  /* ---------- А. начало: тьма безопасна ---------- */
  cloudIsle(-8,8,-8,8,0);bell(-3,4);const Z=makeZven();W.zven=Z;Z.pos.set(0,2.4,3);
  const tA=mostki('shadow',[[0,0,-8],[0,0,-18]]);edgeSign(1.4,0,-7.4,'shadow');
  goose({x:0,z:-13,R:5,y:8,w:0.7,name:'g1',on:()=>!back()});
  cloudIsle(-5,5,-26,-18,0);nutItem(4,0.6,-24.4);
  /* ---------- Б. золотой мосток под гусем — или тёмный обход справа ---------- */
  const tB=mostki('light',[[0,0,-26],[0,0,-36]]);edgeSign(1.4,0,-25.4,'light');
  goose({x:0,z:-31,R:4.5,y:8,w:0.8,a:1.2,name:'g2',on:()=>!back()});
  mostki('shadow',[[4.6,0,-23.4],[10,0,-23.4],[10,0,-34.6],[7.2,0,-37.4]]);edgeSign(4.4,0,-22.4,'shadow');cloudIsle(8.6,11.4,-29.6,-26.6,0);nutItem(10,0.6,-28);
  /* ---------- В. пустое гнездо; сторож глядит на золотой мосток — колокольчик-приманка ---------- */
  cloudIsle(-8,8,-50,-36,0);bell(-2.4,-39.4);nestMesh(0,0,-45,1.6);const fluff=featherMesh(0.7);fluff.position.set(0.3,0.5,-45);fluff.rotation.set(-1.2,0,0.4);W.group.add(fluff);
  fluff.traverse(c=>{if(c.material&&c.material.color)c.material=M(0xd88a3a);});
  const L1=linkItem(5.4,1.1,-47.4);nutItem(-6.5,0.6,-48.5,{owl:true});
  const tC=mostki('light',[[0,0,-50],[0,0,-58]],{on:()=>F.stage!=='boss'});edgeSign(1.4,0,-49.4,'light');
  const SP={x:3.4,z:-60.6},LB={x:-5.6,z:-61.2};let distT=0;
  {const post=new THREE.Group();post.position.set(SP.x,0,SP.z);W.group.add(post);addMesh(new THREE.CylinderGeometry(0.16,0.22,1.9,8),M(0x8a6a3a),0,0.95,0,post);addMesh(new THREE.CylinderGeometry(0.55,0.45,0.18,10),M(0x9a7a4a),0,1.95,0,post);
    W.cyls.push({x:SP.x,z:SP.z,r:0.3,miny:-1,maxy:2,on:true});}
  const A0=Math.atan2(0-SP.x,-54-SP.z),AL=Math.atan2(LB.x-SP.x,LB.z-SP.z);let watchG=A0;
  const watch=goose({x:SP.x,z:SP.z,R:0,y:2.5,w:1.1,fr:3.4,ahead:Math.hypot(SP.x,-54-SP.z),name:'watch',on:()=>!back(),
    path:a=>{const g=watchG+(distT>0?0:Math.sin(a)*0.2);return {x:SP.x,z:SP.z,fx:Math.sin(g),fz:Math.cos(g)};}});watch.kind='watch';watch.noGhost=true;
  // колокольчик на столбе: Прошка звякнет рогаткой — сторож отвернётся
  const lure=new THREE.Group();lure.position.set(LB.x,0,LB.z);W.group.add(lure);addMesh(new THREE.CylinderGeometry(0.07,0.09,2.2,6),M(0x8a6a3a),0,1.1,0,lure);addMesh(new THREE.BoxGeometry(0.9,0.08,0.08),M(0x8a6a3a),0.35,2.15,0,lure);
  const lureB=addMesh(new THREE.ConeGeometry(0.26,0.42,10,1,true),M(0xffd060,{emissive:0x806010,emissiveIntensity:0.4,side:THREE.DoubleSide}),0.7,1.86,0,lure);
  const lureMk=markMesh(0.7);lureMk.position.set(LB.x+0.7,2.6,LB.z);W.group.add(lureMk);
  W.marks.push({pos:new V3(LB.x+0.7,1.9,LB.z),active:()=>!back()&&distT<0.6,onHit:()=>{distT=p35(6,4,3);for(let i=0;i<4;i++)tone(1320+i*90,0.18,'triangle',0.09,null,i*0.09);lureB.rotation.z=0.6;
    floatText(new V3(LB.x,2.8,LB.z),'Дзынь!','#ffe08a');later(0.3,()=>floatText(watch.pos.clone().add(new V3(0,1.1,0)),'Га? Кто там?','#ffffff'));if(!F.lureTold){F.lureTold=true;later(0.6,()=>say('zven','Сторож отвернулся! Со светом — бегом по мостку!',2.6,true));}}});
  /* ---------- Г. печка: угощение · на обратном пути — укрытие и арена вожака ---------- */
  cloudIsle(-9,9,-74,-58,0);bell(2.4,-73);const pech=makePechka();pech.g.position.set(0,0,-68);colBox(-1.3,1.3,0,2.8,-69.2,-66.8,true);
  const zStove={x:0,z:-64.4,r:2.4};const L5=linkItem(0,1.3,-65.6);L5.locked=true;L5.g.visible=false;nutItem(0,0.6,-72.6);
  const wood=new THREE.Group();wood.position.set(-6,0,-71);W.group.add(wood);{const lg=new THREE.CylinderGeometry(0.17,0.17,1.3,8);lg.rotateZ(Math.PI/2);for(let i=0;i<3;i++)for(let j=0;j<3-i;j++)addMesh(lg,M(j%2?0x7a5230:0x8a6038),0,0.18+i*0.32,-0.36+j*0.36+i*0.18,wood);}
  colBox(-6.7,-5.3,0,0.9,-71.6,-70.4,true);
  const puddles=[{x:-5.2,z:-63.4,used:false},{x:5.2,z:-63.4,used:false}];
  for(const p of puddles){p.m=new THREE.Mesh(new THREE.CircleGeometry(1.8,28),M(0xf4c8d8,{emissive:0x806070,emissiveIntensity:0.25}));p.m.rotation.x=-Math.PI/2;p.m.position.set(p.x,0.05,p.z);p.m.visible=false;W.group.add(p.m);}
  /* ---------- Д. гусь висит над мостком — тень щита Потапа ---------- */
  const tD=mostki('light',[[0,0,-74],[0,0,-82]],{on:()=>F.stage!=='boss'});edgeSign(1.4,0,-73.4,'light');
  const hoverPath=(cx,cz)=>a=>{const g=a*0.9;return {x:cx+Math.sin(a*0.8)*0.5,z:cz+Math.cos(a*0.6)*0.4,fx:Math.sin(g),fz:Math.cos(g)};};
  const hov1=goose({x:0,z:-78,R:0,y:6,w:1,fr:4.6,ahead:0,name:'hover1',on:()=>!back(),path:hoverPath(0,-78)});hov1.noGhost=true;
  const shade=new THREE.Mesh(new THREE.CircleGeometry(1.9,28),MB(0x1a1030,{transparent:true,opacity:0.45,depthWrite:false}));shade.rotation.x=-Math.PI/2;shade.renderOrder=6;shade.visible=false;W.group.add(shade);
  /* ---------- Е. спящий гусь у золотого мостка — тише ---------- */
  cloudIsle(-5,5,-88,-82,0);bell(-2.2,-83);nutItem(-4,0.6,-86.6);nutItem(4.2,0.6,-83.4);
  const tE=mostki('light',[[0,0,-88],[0,0,-96]]);edgeSign(1.4,0,-87.4,'light');
  {const P={x:3.2,z:-86.4},A=Math.atan2(0-P.x,-92-P.z);const look=a=>{const g=A+Math.sin(a)*0.3;return {x:P.x,z:P.z,fx:Math.sin(g),fz:Math.cos(g)};};
    const q=goose({x:P.x,z:P.z,R:0,y:0.9,w:1.4,fr:3.0,ahead:Math.hypot(P.x,-92-P.z),name:'sleep',on:()=>!back(),path:look});q.kind='sleep';q.state='sleep';q.awakeT=0;q.noGhost=true;}
  /* ---------- Ж. яблонька: угощение (кислое яблочко высоко) · на обратном пути — укрытие ---------- */
  cloudIsle(-9,9,-112,-96,0);bell(-2.4,-110.6);const yab=makeYablonka();yab.g.position.set(0,0,-104);W.cyls.push({x:0,z:-104,r:0.35,miny:-1,maxy:1.6,on:true});
  const zTree={x:0,z:-104,r:3};const L3=linkItem(0,3.6,-104);L3.locked=true;L3.g.visible=false;nutItem(7.6,0.6,-110);
  const sour=addMesh(new THREE.SphereGeometry(0.2,10,8),M(0xc8e040,{emissive:0x405010,emissiveIntensity:0.4}),1.6,3.7,-103,W.group);const SOUR=new V3(1.6,3.7,-103);
  W.waterTargets.push({pos:new V3(0,0,-104),active:()=>(!back()&&F.treeAsk1&&!F.treeWater1)||(back()&&F.treeAsk&&F.treeRefused&&!F.treeWater2),onWater:()=>{if(back())F.treeWater2=true;else F.treeWater1=true;SFX.grow();burst(new V3(0,2,-104),0x7ad8ff,14,3);bark(yab,'yablonka','Ох, хорошо! Напоил, напоил!',1.8);}});
  /* ---------- З. гусь висит над мостком — тучка Йоши ---------- */
  const tH=mostki('light',[[0,0,-112],[0,0,-120]]);edgeSign(1.4,0,-111.4,'light');
  const hov2=goose({x:0,z:-116,R:0,y:6.4,w:1.1,fr:4.4,ahead:0,name:'hover2',on:()=>!back(),path:hoverPath(0,-116)});hov2.noGhost=true;
  let tuchT=0;const puff=new THREE.Group();puff.position.set(2.8,0.35,-110.6);W.group.add(puff);
  for(const[dx,dy,dz,r]of[[0,0,0,0.35],[0.3,0.08,0.1,0.26],[-0.28,0.06,-0.05,0.24]])addMesh(new THREE.SphereGeometry(r,10,8),M(0xf4f0ff,{emissive:0x6a6a8a,emissiveIntensity:0.3}),dx,dy,dz,puff);
  const tuch=new THREE.Group();tuch.position.set(0,3.4,-116);W.group.add(tuch);tuch.visible=false;
  for(const[dx,dy,dz,r]of[[0,0,0,1.5],[1.4,-0.1,0.6,1.1],[-1.4,0,-0.4,1.2],[0.4,0.5,-1.4,1.0],[-0.5,-0.2,1.5,1.0]])addMesh(new THREE.SphereGeometry(r,12,10),M(0x9a98b8,{emissive:0x2a2840,emissiveIntensity:0.3}),dx,dy,dz,tuch);
  const tshade=new THREE.Mesh(new THREE.CircleGeometry(3.7,32),MB(0x1a1030,{transparent:true,opacity:0.4,depthWrite:false}));tshade.rotation.x=-Math.PI/2;tshade.position.set(0,0.12,-116);tshade.renderOrder=6;tshade.visible=false;W.group.add(tshade);
  W.waterTargets.push({pos:new V3(2.8,0,-110.6),active:()=>tuchT<2,pri:0.5,onWater:()=>{tuchT=p35(14,10,7);SFX.grow();burst(new V3(0,3.4,-116),0xd8d8ff,18,3);floatText(new V3(0,4.8,-116),'Тучка!','#e0e0ff');
    if(!F.tuchTold){F.tuchTold=true;later(0.4,()=>bark(T.yosha,'yosha','Тучка-тень! Под ней и шагайте!',2.2,true));}}});
  /* ---------- И. «коса»: золотая нить слева, лиловая справа, в середине сходятся ---------- */
  cloudIsle(-5,5,-126,-120,0);
  mostki('light',[[-3.4,0,-126],[-3.4,0,-128.6],[-1.1,0,-130],[-3.4,0,-131.4],[-3.4,0,-134]]);edgeSign(-1.9,0,-125.4,'light');
  mostki('shadow',[[3.4,0,-126],[3.4,0,-128.6],[1.1,0,-130],[3.4,0,-131.4],[3.4,0,-134]]);edgeSign(1.9,0,-125.4,'shadow');nutItem(3.4,0.6,-132.7);
  goose({x:-3.4,z:-130,R:3,y:7,w:0.8,fr:2.4,name:'g7',on:()=>!back()});
  /* ---------- К. речка с кисельными берегами: угощение · на обратном пути — укрытие ---------- */
  cloudIsle(-10,10,-152,-134,0);bell(-2.4,-136.4);bell(2.4,-150.6);
  const milk=new THREE.Mesh(new THREE.PlaneGeometry(20,2.8),M(0xfaf6ff,{emissive:0x8a8aa0,emissiveIntensity:0.3}));milk.rotation.x=-Math.PI/2;milk.position.set(0,0.03,-142.6);W.group.add(milk);
  box(-10,10,0,0.3,-141.2,-140.4,M(0xe07aa0),{occ:false});box(-10,10,0,0.3,-145,-144,M(0xe07aa0),{occ:false});
  const inKisel=h=>Math.abs(h.pos.x)<10&&h.pos.z<-140.2&&h.pos.z>-145.2&&h.pos.y<1.2;
  const inPuddle=h=>F.stage==='boss'&&puddles.some(p=>!p.used&&hd(h.pos,p)<1.8&&h.pos.y<1);
  W.slowZone=h=>h.kind!=='yosha'&&(inKisel(h)||inPuddle(h));
  const dam=new THREE.Group();dam.position.set(7.4,0,-142.6);W.group.add(dam);for(let i=0;i<5;i++)addMesh(new THREE.CylinderGeometry(0.14,0.14,1.2,6),M(0x8a6a3a),0,0.6,-1+i*0.5,dam);
  const damMark=markMesh(0.9);damMark.position.set(7.4,1.6,-141.9);W.group.add(damMark);damMark.visible=false;
  W.marks.push({pos:new V3(7.4,1.6,-141.9),active:()=>back()&&F.riverAsk&&F.riverRefused&&!F.dam,onHit:()=>{F.dam=true;SFX.crash();damMark.visible=false;anim(0.8,k=>{dam.rotation.z=-1.2*k;dam.position.y=-0.4*k;});burst(new V3(7.4,1,-142.6),0xfaf6ff,20,4);bark({g:dam},'rechka','Спасибо! Вода ушла — под бережком место есть, полезайте.',2.4);later(2.6,()=>bark(T.proshka,'proshka','А это — не изобретение. Это меткость!',2.2,true));}});
  const hollow=new THREE.Group();hollow.position.set(0,0,-140.8);W.group.add(hollow);hollow.visible=false;addMesh(new THREE.BoxGeometry(4,0.5,0.1),MB(0x1a0a14),0,0.28,0.45,hollow);
  const zRiver={x:0,z:-139.2,r:2.4};const L2=linkItem(0,1.1,-139.6);L2.locked=true;L2.g.visible=false;nutItem(-8.5,0.6,-150,{owl:true});
  /* ---------- Л. пропасть: мостки по очереди — золотые (свет) и лиловые (тьма) ---------- */
  for(const[z0,z1]of[[-152,-156],[-162,-164],[-169,-173],[-179,-181]])cloudIsle(-1.6,1.6,z1,z0,0);
  const ABYSS=[['light',-156,-162],['shadow',-164,-169],['light',-173,-179],['shadow',-181,-188]];W.abyss35=ABYSS;
  for(const[t,z0,z1]of ABYSS){mostki(t,[[0,0,z0],[0,0,z1]],{w:1.8});edgeSign(1.5,0,z0+0.6,t);}
  {const lead=a=>{const x=Math.sin(a)*3.4,z=-167.5+Math.cos(a)*10;const fx=Math.cos(a)*3.4,fz=-Math.sin(a)*10,L=Math.hypot(fx,fz)||1;return {x,z,fx:fx/L,fz:fz/L};};
    [0,1.1,2.2].forEach((lag,i)=>{const q=goose({x:0,z:-167.5,R:10,y:10.5-i*0.4,w:0.55,a:-lag,fr:i?2.0:2.4,s:i?1.05:1.45,name:i?'fin':'lead',on:()=>!back(),path:lead});q.kind=i?'flock':'lead';});}
  /* ---------- М. двор Яги: Яга дремлет, мышка, горшок каши, Тишка на лавке ---------- */
  cloudIsle(-10,10,-212,-188,0);bell(-2.4,-190.6);nutItem(7.2,0.6,-210);
  const hut=makeHut();hut.g.position.set(0,0,-207.4);colBox(-1.6,1.6,0,4.8,-209,-205.8,true);
  const stump=addMesh(new THREE.CylinderGeometry(0.42,0.5,0.45,10),M(0x7a5634),-4.6,0.22,-202.8,W.group);W.cyls.push({x:-4.6,z:-202.8,r:0.5,miny:-1,maxy:0.45,on:true});
  const yy=makeYaga();yy.g.position.set(-4.6,0.45,-202.8);yy.g.rotation.y=0.5;yy.body.rotation.x=0.22;
  const table=new THREE.Group();table.position.set(-7,0,-205);W.group.add(table);addMesh(new THREE.BoxGeometry(1.5,0.1,0.9),M(0x8a6038),0,0.85,0,table);for(const[sx,sz]of[[-0.6,-0.35],[0.6,-0.35],[-0.6,0.35],[0.6,0.35]])addMesh(new THREE.CylinderGeometry(0.05,0.05,0.85,5),M(0x6a4a2a),sx,0.42,sz,table);
  colBox(-7.75,-6.25,0,0.9,-205.45,-204.55,true);
  const pot=new THREE.Group();W.group.add(pot);addMesh(new THREE.CylinderGeometry(0.26,0.2,0.32,12),M(0x3a3a40),0,0.16,0,pot);addMesh(new THREE.CylinderGeometry(0.24,0.24,0.04,12),M(0xf0e0b0),0,0.31,0,pot);
  const POT0=new V3(-7,0.9,-205);pot.position.copy(POT0);
  const bench=new THREE.Group();bench.position.set(4.4,0,-202.4);W.group.add(bench);addMesh(new THREE.BoxGeometry(1.8,0.1,0.5),M(0x8a6038),0,0.48,0,bench);for(const sx of[-0.75,0.75])addMesh(new THREE.BoxGeometry(0.1,0.48,0.4),M(0x6a4a2a),sx,0.24,0,bench);
  colBox(3.5,5.3,0,0.53,-202.65,-202.15,true);
  const tish=makeTishka();tish.g.position.set(4.1,0.53,-202.4);tish.g.scale.setScalar(0.85);
  const gapples=[];for(let i=0;i<3;i++)gapples.push(addMesh(new THREE.SphereGeometry(0.09,8,6),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.6}),4.6+i*0.22,0.6,-202.3,W.group));
  const mouse=mouse35();mouse.g.position.set(1.6,0,-205.2);mouse.g.rotation.y=0.4;
  goose({x:0,z:-199,R:6,y:4.4,w:0.5,fr:2.3,ahead:2,name:'yard1',on:()=>!!F.yard&&!back()});
  goose({x:0,z:-199,R:3.4,y:4.8,w:-0.75,a:2,fr:2.0,ahead:2,name:'yard2',on:()=>!!F.yard&&!back()});
  /* ---------- погоня: волна гусей, Яга на ступе ---------- */
  const yst=makeStupa();yst.g.visible=false;yst.g.position.set(-4.6,1.2,-202.8);
  const WV={on:false,z:0,zp:0,t:6,warn:false,geese:[]};
  const wave=new THREE.Group();W.group.add(wave);wave.visible=false;for(let i=0;i<7;i++){const g=makeGoose(1.05);wave.add(g.g);g.g.position.set(-7.5+i*2.5,5.6+Math.sin(i*1.7)*0.5,(i%2)*1.2);WV.geese.push(g);}
  const band=new THREE.Mesh(new THREE.PlaneGeometry(24,3.2),MB(0xe8f4ff,{transparent:true,opacity:0.22,depthWrite:false}));band.rotation.x=-Math.PI/2;band.position.y=0.14;band.renderOrder=5;W.group.add(band);band.visible=false;
  const YG={z:-204,x:0,nap:0,warnT:0};
  /* ---------- вожак (мини-босс) ---------- */
  const vz=makeGoose(1.7);vz.g.visible=false;{const crown=addMesh(new THREE.ConeGeometry(0.16,0.3,5),M(0xffc93c,{emissive:0xb07a10,emissiveIntensity:0.6}),0,0.22,0,vz.head);crown.position.y=0.22;}
  const vkey=blackKey(3.2);vz.body.add(vkey);vkey.position.set(0,-0.35,0.62);
  const knotMk=markMesh(0.7);knotMk.visible=false;W.group.add(knotMk);
  const vRing=new THREE.Mesh(new THREE.TorusGeometry(1.25,0.07,6,36),MB(0xff5a3a,{transparent:true,opacity:0.85,depthWrite:false}));vRing.rotation.x=Math.PI/2;vRing.renderOrder=6;vRing.visible=false;W.group.add(vRing);
  const VC={x:0,z:-65.5};const VZ={state:'off',t:0,a:0,pos:new V3(0,7,-65.5),from:new V3(),lock:new V3(),tgt:null,trap:null,seen:false,stuckT:0,idle:0};
  const L4=linkItem(0,2.4,-62);L4.locked=true;L4.g.visible=false;
  /* ---------- укрытия: просьба помощника → все четверо внутри ---------- */
  const faces=new THREE.Group();W.group.add(faces);faces.visible=false;const faceM=HEROES.map(h=>{const m=new THREE.Mesh(new THREE.SphereGeometry(0.2,10,8),M(0x6a6a7a));m.position.x=(HEROES.indexOf(h)-1.5)*0.55;faces.add(m);return m;});
  const dome=new THREE.Mesh(new THREE.SphereGeometry(1,20,14,0,Math.PI*2,0,Math.PI/2),MB(0xc8e8a0,{transparent:true,opacity:0.14,depthWrite:false}));dome.visible=false;W.group.add(dome);
  let SH=null;W.shelter35=()=>SH;   // для напарника-бота: идёт ли сейчас укрытие
  function giveLink35(it,to){it.locked=false;it.g.visible=true;burst(it.pos.clone(),COL.gold,14,3);const h=to||active(0),from=it.pos.clone();anim(1.0,k=>{if(it.taken)return;it.base=lerp(from.y,h.pos.y+1.1,k)+Math.sin(k*Math.PI)*1.2;it.pos.x=lerp(from.x,h.pos.x,k);it.pos.z=lerp(from.z,h.pos.z,k);if(k>=1)takeItem(it,h);});}
  const inside=(h,z0)=>hd(h.pos,z0)<z0.r&&Math.abs(h.pos.y)<1.2;
  const potapHolds=()=>{const P=T.potap;return hd(P.pos,{x:0,z:-104})<2.6&&Math.abs(P.pos.y)<1.2&&!players[P.player].downed;};
  // need — пока не выполнено, отсчёт стоит (не дольше grace): Потап у ствола, полено в печи
  function openShelter(z0,name,onDone){SH={z:z0,name,t:8,state:'count',onDone,need:name==='tree'?potapHolds:name==='stove'&&F.stoveRefused?()=>!!F.log:null,needTip:name==='tree'?'Потапа — к стволу: он ветви раздвинет!':'Потап, полено в печь!',grace:name==='tree'?12:30,waves:name==='river'?[2.6,5.4,8.2]:null,wi:0,wt:0};
    faces.visible=true;faces.position.set(z0.x,3.4,z0.z);dome.visible=true;dome.position.set(z0.x,0,z0.z);dome.scale.set(z0.r,2,z0.r);
    SFX.ok();if(name==='tree')banner('Потапа — к стволу!','#c8e8a0',2.4,'Потап раздвинет ветви — тогда все под крону');
    else if(name==='river')banner('Гуси летят волнами!','#c8e8a0',2.4,'три волны · в каждую будь под бережком');
    else if(SH.need)banner('Печка дров просит!','#c8e8a0',2.4,'Потап — полено из поленницы в печь · потом все к заслонке');
    else banner('Прячемся!','#c8e8a0',2,'все четверо — внутрь за восемь секунд · кто отстал — кликните к себе');}
  let branchK=0;
  function flyover(z0){for(let i=0;i<6;i++){const g=makeGoose(1.1);const x0=rand(-8,8),from=new V3(x0-26,7+rand(0,2),z0.z+rand(-4,4)),to=new V3(x0+26,7+rand(0,2),z0.z+rand(-4,4));g.g.rotation.y=Math.PI/2;
      anim(3.4,k=>{g.g.position.lerpVectors(from,to,k);g.wings.forEach(w=>{w.wp.rotation.z=w.sd*Math.sin(G.time*8+i)*0.5;});if(k>=1)W.group.remove(g.g);});}
    for(let i=0;i<4;i++)later(i*0.5,()=>{for(let j=0;j<3;j++)tone(rand(420,520),0.12,'square',0.08,rand(300,360),j*0.12);});}
  function tickShelter(dt){
    {const on=!!(SH&&SH.name==='tree'&&potapHolds());branchK=damp(branchK,on?1:0,5,dt);yab.g.scale.set(1+0.3*branchK,1+0.18*branchK,1+0.3*branchK);}
    if(!SH)return;const z0=SH.z;
    if(SH.need&&!SH.held&&SH.state==='count'){if(SH.need()){SH.held=true;SFX.ok();if(SH.name==='tree')bark(T.potap,'potap','Раздвинул ветки. Ныряйте!',2,true);}else{SH.grace-=dt;if(SH.grace>0)SH.t=8;else SH.held=true;}}
    if(SH.waves&&SH.state==='count'){SH.wt+=dt;SH.t=Math.max(0.01,SH.waves[SH.waves.length-1]+0.4-SH.wt);
      if(SH.wi<SH.waves.length&&SH.wt>=SH.waves[SH.wi]-1.2&&!SH.warn){SH.warn=true;for(let j=0;j<3;j++)tone(rand(420,520),0.1,'square',0.07,rand(300,360),j*0.12);floatText(new V3(0,3.6,z0.z),'Летят!','#e8f4ff');}
      if(SH.wi<SH.waves.length&&SH.wt>=SH.waves[SH.wi]){SH.wi++;SH.warn=false;flyover(z0);
        for(const h of HEROES){if(inside(h,z0))continue;if(Math.abs(h.pos.z-z0.z)>14)continue;const p=players[h.player],kk=p.heroes.indexOf(h);
          burst(h.pos.clone().add(new V3(0,1,0)),0xffffff,10,3);placeOnGround(h,p.cp.x+(kk?1.2:-0.4),p.cp.z,p.cp.y);h.iT=1;floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Гусь заметил — назад!','#e8f4ff');}
        if(SH.wi>=SH.waves.length){SH.state='pass';SH.t=1.2;}}
      HEROES.forEach((h,i)=>{faceM[i].material.color.setHex(inside(h,z0)?[0xe0784a,0xc08a48,0xb67ccc,0x6cc4b8][i]:0x5a5a6a);});faces.lookAt(G.split>0.5?cams[0].position:camS.position);return;}
    const inn=HEROES.map(h=>inside(h,z0)&&(SH.name!=='tree'||SH.held||h===T.potap));HEROES.forEach((h,i)=>{if(inn[i]&&!h.hidden){h.hidden=true;floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'спрятался','#c8e8a0');}faceM[i].material.color.setHex(inn[i]?[0xe0784a,0xc08a48,0xb67ccc,0x6cc4b8][i]:0x5a5a6a);});
    faces.lookAt(G.split>0.5?cams[0].position:camS.position);
    if(SH.state==='count'){SH.t-=dt;if(inn.every(x=>x)||SH.t<=0){HEROES.forEach((h,i)=>{if(!inn[i]){const a=i/4*Math.PI*2;placeOnGround(h,z0.x+Math.cos(a)*1.2,z0.z+Math.sin(a)*1.2,0);h.hidden=true;burst(h.pos.clone().add(new V3(0,1,0)),0xffffff,10,3);floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Гусь принёс!','#e8f4ff');}});
        SH.state='pass';SH.t=3.6;flyover(z0);if(!inn.every(x=>x)&&!F.ferryTold){F.ferryTold=true;tip(0,'Не успел спрятаться — гусь донёс.',3);}}}
    else if(SH.state==='pass'){SH.t-=dt;W.gooseCalm=0.5;if(SH.t<=0){HEROES.forEach(h=>{h.hidden=false;});faces.visible=false;dome.visible=false;const d=SH.onDone;SH=null;SFX.ok();YG.z=Math.min(YG.z,Math.min(active(0).pos.z,active(1).pos.z)-20);if(d)d();}}}
  // тень щита Потапа и тучки: свет под ними гусям не виден (мостки он всё равно держит)
  const potapVeil=()=>{const P=T.potap;return P.active&&P.guard&&!players[P.player].downed;};
  W.veil35=h=>{const P=T.potap;if(potapVeil()&&hd(h.pos,P.pos)<1.9&&Math.abs(h.pos.y-P.pos.y)<1.5)return true;
    if(tuchT>0&&Math.abs(h.pos.z+116)<3.8&&Math.abs(h.pos.x)<2.6&&h.pos.y<2.6)return true;return false;};
  W.wade=h=>h.kind==='potap'&&h.guard?1.9:1;                  // под щитом-зонтиком Потап идёт быстрее обычной защиты
  W.featherLock=(pi,h)=>F.potH===h?'С горшком в лапах перо не зажечь.':'';
  /* ---------- колыбельная по строчке ---------- */
  const LINES=['Баю-баюшки-баю, колыбельную пою…','Гуси-лебеди, летите, в облаках своих поспите…','Крылья сложите — до утра поспите!'];
  const NOTE=[64,62,60,62,64,64,64,0,62,62,62,0,64,67,67];
  const tune=n=>{NOTE.slice(0,n).forEach((m,i)=>{if(m)later(i*0.42,()=>tone(mf(m),0.4,'triangle',0.09));});const src=tish.g.getWorldPosition(new V3());for(let i=0;i<Math.ceil(n/2);i++)later(i*0.5,()=>floatText(src.clone().add(new V3(rand(-0.6,0.6),1+i*0.1,0)),i%2?'♪':'♫','#ffe9a0'));};
  function rememberLine(){F.lines++;F.songs++;const t=LINES[F.lines-1];later(0.6,()=>{tune(5);bark(tish,'tishka',t,3,true);});
    if(F.lines===1)later(3.8,()=>{banner('Строчка колыбельной!','#ffe08a',2.6,'«Ко мне!» у Йоши — Тишка споёт: волна гусей задремлет');tip(1,'Тишка споёт — жми '+K(1,'call')+' у Йоши: волна задремлет.',3.4);});}
  W.sing35=pi=>{const h=active(pi);if(!back()||F.stage==='boss'||F.stage==='end'||SH||h.kind!=='yosha')return false;
    if(F.songs<=0){floatText(h.pos.clone().add(new V3(0,1.6,0)),'Строчки ещё не вспомнил…','#ffe9a0');return false;}
    F.songs--;tune(7);bark(tish,'tishka',LINES[Math.max(0,F.lines-1)],2.6,true);YG.nap=4;
    if(WV.on){WV.on=false;wave.visible=false;band.visible=false;floatText(new V3(h.pos.x,4,WV.z),'з-з-з…','#c8d8ff');}WV.t=p35(12,9,7)+5;return true;};
  /* ---------- угощения по пути туда ---------- */
  const REFUSE={proshka:['proshka','Я не голодный, нет уж.'],pelageya:[null,'<i>Пелагея молча за крыло прячется.</i>'],potap:['potap','Я потерплю. Пусть другие поедят.'],yosha:['yosha','Я сам себе еду найду!']};
  const EAT={proshka:['proshka','<i>(с набитым ртом)</i> Ну и что это доказывает, а?'],pelageya:['pelageya','<i>(шёпотом)</i> Спасибо, спасибо…'],potap:['potap','Вкусно. Спасибо, матушка.'],yosha:['yosha','Ням! Сладкий, как мёд!']};
  const SOURL={proshka:['proshka','<i>(морщится)</i> Кислятина… Ладно уж. Съем до огрызка.'],potap:['potap','Кисло… Но — спасибо, яблонька.'],pelageya:['pelageya','<i>(морщится)</i> Ой, кисленькое… Спасибо!'],yosha:['yosha','Ух, кислое! Аж колючки дыбом!']};
  const line=(h,L)=>{if(L[0])bark(h,L[0],L[1],2.4);else say(null,L[1],2.6);};
  function pieOffer(h){F.pie={h,t:p35(6,4,3)};pech.pie.visible=true;anim(0.6,k=>{pech.door.rotation.y=-1.4*smooth(k);});bark(pech,'pechka','Съешь, дружок, мой пирожок — спрячу, сберегу.',2.6);}
  function pieEat(){const h=F.pie.h;F.pie=null;F.stoveOff=true;F.stoveOK=true;pech.pie.visible=false;SFX.ok();burst(h.pos.clone().add(new V3(0,1.2,0)),0xd0a060,10,2);later(0.4,()=>line(h,EAT[h.kind]));
    later(2.6,()=>bark(pech,'pechka','Не побрезговал — на обратном пути спрячу!',2.4,true));anim(0.6,k=>{pech.door.rotation.y=-1.4*(1-smooth(k));});}
  function pieRefuse(){const h=F.pie.h;F.pie=null;F.stoveOff=true;F.stoveRefused=true;pech.pie.visible=false;line(h,REFUSE[h.kind]);
    anim(0.5,k=>{pech.door.rotation.y=-1.4*(1-smooth(k));});later(0.6,()=>{SFX.crash();floatText(new V3(0,3,-66),'Хлоп!','#ffffff');});later(1.6,()=>bark(pech,'pechka','Ну, как знаешь… Обратно пойдёшь — дров мне принеси.',2.6,true));}
  function sourEat(h){F.appleEat=true;sour.visible=false;SFX.ok();burst(SOUR.clone(),0xc8e040,10,2);h.atkT=0.28;later(0.3,()=>line(h,SOURL[h.kind]));}
  /* ---------- сюжет ---------- */
  function yardScene(){F.stage='cine';const Y=T.yosha;
    play({dur:13,fov:48,shots:[shot(0,[7.6,1.8,-198.6],[4.2,0.7,-202.4]),shot(6.2,[-1,2.6,-196.6],[-4.6,1.4,-202.8])],
      says:[[0.3,2.6,'tishka','Йоша! Я тут, я тут!'],[3,2.4,null,'<i>Мышка на лавку садится — золотые яблочки катает, будто Тишка.</i>',true],[5.6,2.2,'yosha','Держись крепко, братец!'],
        [8,2.6,'yaga','Мышка, ты, что ли?.. Ах, озорники! Гуси-лебеди — в погоню!'],[10.8,2.2,'zven','Гуси! Погоня! Бежим!']],
      events:[{t:3,fn:()=>{Y.g.add(tish.g);tish.g.position.set(0,Y.d.height+0.12,-0.1);tish.g.rotation.set(0,0,0);tish.g.scale.setScalar(0.42);mouse.g.position.set(4.3,0.53,-202.4);SFX.ok();}},
        {t:8,fn:()=>{yy.g.visible=false;yst.g.visible=true;yst.g.position.set(-4.6,0.4,-202.8);anim(1.4,k=>{yst.g.position.y=0.4+k*1.6;yst.broom.rotation.z=Math.sin(k*18)*0.6;});}},
        {t:10.8,fn:()=>{for(let i=0;i<3;i++)tone(rand(420,520),0.12,'square',0.12,rand(300,360),i*0.13);}}],
      end:()=>{if(tish.g.parent!==Y.g){Y.g.add(tish.g);tish.g.position.set(0,Y.d.height+0.12,-0.1);tish.g.scale.setScalar(0.42);}
        mouse.g.position.set(4.3,0.53,-202.4);yy.g.visible=false;yst.g.visible=true;
        F.back=true;F.stage='back';W.camYaw=Math.PI;W.bells.forEach(b=>{b.act=[false,false];});
        YG.z=Math.min(active(0).pos.z,active(1).pos.z)-18;YG.x=0;WV.t=p35(7,5,4);snapCams();
        banner('Погоня!','#e8f4ff',2.6,'волна гусей — гаси перо · на золотом жди волну на островке · Яга на ступе — не стой');}});}
  W.onLeave=()=>{if(tish.g.parent)tish.g.parent.remove(tish.g);};
  function riverAsk(){F.riverAsk=true;if(F.riverRefused)say('rechka','Запруда мне дышать не даёт. Сбейте её — спрячу под бережком.',3);else say('rechka','Киселька отведали — спрячу! Под бережком пещерка, ищите.',3,true);
    damMark.visible=!!F.riverRefused;later(3.2,()=>say('zven','Пелагея, посмотри Совиным взором — где под берегом место?',2.8,true));}
  function treeAsk(){F.treeAsk=true;if(F.treeRefused)bark(yab,'yablonka','Не отведали яблочка — так хоть полейте меня! Тогда спрячу.',3,true);else bark(yab,'yablonka','Отведали яблочка — спрячу, сберегу! Потапушка, раздвинь ветки.',3,true);}
  function stoveAsk(){F.stoveAsk=true;if(F.stoveRefused)bark(pech,'pechka','Дровец подкинь — тогда спрячу!',2.6,true);else bark(pech,'pechka','Полезайте! Живо, живо!',1.8);
    anim(0.6,k=>{pech.door.rotation.y=-1.4*smooth(k);});later(0.4,()=>openShelter(zStove,'stove',()=>{giveLink35(L5);bossStart();}));}
  function bossStart(){F.stage='boss';yst.g.visible=false;WV.on=false;wave.visible=false;band.visible=false;puddles.forEach(p=>{p.m.visible=true;});
    VZ.state='intro';vz.g.visible=true;vz.g.position.set(0,12,-82);
    play({dur:7.4,fov:50,camK:2.4,shots:[shot(0,[0,4.6,-54],[0,4,-68]),shot(3.6,[3,2.6,-58],[0,4.4,-66])],
      says:[[0.3,3,null,'<i>Стая пролетела, а один гусь — вожак — кружит над печкой. Чует!</i>',true],[3.6,3.4,'tishka','У него на шее — чёрный ключ! Гуси ключа слушаются!']],
      events:[{t:0.3,fn:()=>{anim(3,k=>{vz.g.position.set(Math.sin(k*3)*4,lerp(12,7,k),lerp(-82,-65.5,k));});}}],
      tick:()=>{vz.wings.forEach(w=>{w.wp.rotation.z=w.sd*Math.sin(G.time*6)*0.5;});},
      end:()=>{VZ.state='circle';VZ.t=0;VZ.a=0;banner('Гусь-вожак!','#ffe08a',2.6,'он ныряет на свет · заманите в кисель или в печку · увяз — взор Пелагеи, рогатка Прошки');}});}
  function endScene(){F.stage='end';VZ.state='done';vRing.visible=false;knotMk.visible=false;const pr=T.proshka;HEROES.forEach((h,i)=>{h.hidden=false;placeOnGround(h,-3+i*2,-60.4,0);h.face=Math.PI;});
    const key=blackKey(2.4);W.group.add(key);key.visible=false;const flock=[];
    play({dur:36,fov:46,camK:2.6,shots:[shot(0,[0,4,-57],[0,3,-66]),shot(6,[3,2.4,-58.6],[0,2.2,-63.6]),shot(14.6,[-3,2.6,-57.6],[0,2.6,-63]),shot(22,[1.6,2,-58],[0,2.4,-62.4]),shot(29,[-1.6,2.2,-58.4],[0,2.2,-62.6])],
      says:[[0.3,3.4,'tishka','Баю-баюшки-баю… Вспомнил! Строчку про гусей вспомнил!'],[3.8,2.6,null,'<i>Гуси под колыбельную уснули, сели, как куры. Яга на ступе спускается.</i>',true],
        [6.6,4,'yaga','Чужим ключом моих гусей приманил, костлявый.'],[10.8,4,'yaga','Велел малыша взять — чтоб колыбельную никто не вспомнил. Ну, погоди.'],
        [15,3.2,null,'<i>Яга выдёргивает ключ и швыряет в пропасть. Потом смотрит на нас.</i>',true],[18.4,2.8,'yaga','А, это вы мне двор чистили, голубчики!'],[21.4,3.4,'yaga','Долг за мной был — считай, отдала.'],
        [25,3,'yaga','Вы ж мне в лесу избушку повернули — помню, помню. А малыш-то колыбельную вспомнил!'],[28.4,2.6,'yaga','А за этот ещё буду должна.'],[31.4,2.8,'tishka','Спасибо, Яга, бабушка!']],
      events:[{t:0.3,fn:()=>{tune(15);for(let i=0;i<6;i++){const g=makeGoose(1.0);const f=new V3(rand(-14,14),9+rand(0,3),-66+rand(-12,6)),to=new V3(-6+i*2.4,0.3,-71.5+(i%2)*0.8);flock.push(g);g.g.position.copy(f);anim(3.2,k=>{g.g.position.lerpVectors(f,to,smooth(k));g.g.position.y+=Math.sin(k*Math.PI)*2;if(k>=1)g.head.rotation.x=1.1;});}
          const vf=vz.g.position.clone();anim(2.4,k=>{vz.g.position.lerpVectors(vf,new V3(0,0.3,-62.6),smooth(k));});
          yst.g.visible=true;yst.g.position.set(0,8,-82);const from=yst.g.position.clone();later(3.6,()=>anim(2.4,k=>{yst.g.position.lerpVectors(from,new V3(3.2,0.2,-65.6),smooth(k));yst.broom.rotation.z=Math.sin(k*20)*0.6;}));}},
        {t:4,fn:()=>{key.visible=true;vkey.visible=false;key.position.set(0,1.1,-62.2);}},
        {t:15,fn:()=>{anim(0.5,k=>{yst.broom.rotation.z=-k;});const from=key.position.clone();anim(2.4,k=>{key.position.set(from.x+k*12,from.y+Math.sin(Math.min(1,k*2)*Math.PI)*3-k*k*16,from.z-k*2);key.rotation.z+=0.4;});SFX.keys();}},
        {t:22,fn:()=>{L4.locked=false;L4.g.visible=true;const from=L4.pos.clone();anim(1.2,k=>{L4.base=lerp(from.y,pr.pos.y+1.1,k);L4.pos.lerpVectors(from,pr.pos.clone().add(new V3(0,1.1,0)),smooth(k));if(k>=1)takeItem(L4,pr);});}}],
      tick:(t)=>{yst.g.rotation.y=Math.PI+Math.sin(t*0.8)*0.2;},
      end:()=>{key.visible=false;if(!L4.taken)takeItem(L4,pr);F.out=true;banner('Тишка спасён!','#ffe08a',2.4,'в лавке у Векши — ступа-санки для Лукоморья, загляни!');later(1.8,finishLevel);}});}
  W.onGooseSee=(q,h)=>{if(!F.gooseTold){F.gooseTold=true;later(1.2,()=>say('zven','Гуси видят свет! Под белым лучом — только в темноте.',2.8,true));}};
  W.onOwl=(h)=>{
    if(back()&&F.riverAsk&&!F.hollow&&h.pos.z<-132&&h.pos.z>-152){F.hollow=true;hollow.visible=true;SFX.owl();floatText(new V3(0,1.6,-140.6),'Под бережком — пещерка, полезайте!','#e7c3ff');}
    if(VZ.state==='stuck'&&!VZ.seen&&hd(h.pos,VZ.pos)<13){VZ.seen=true;floatText(VZ.pos.clone().add(new V3(0,1.6,0)),'Вот он, узел!','#e7c3ff');if(!F.knotTold){F.knotTold=true;tip(0,'Узел виден! Прошка — рогаткой '+K(0,'skill')+'!',3);}}};
  const gq=n=>W.geese.find(q=>q.name===n);
  // герой — к колокольчику (поймали волна, Яга, сон Яги)
  function potBack(){F.potH=null;pot.position.copy(POT0);}
  W.potDrop35=h=>{if(F.potH===h)potBack();};
  function catch35(h,txt){const p=players[h.player],kk=p.heroes.indexOf(h);h.lit=false;burst(h.pos.clone().add(new V3(0,0.8,0)),0xffffff,14,4);if(F.potH===h)potBack();
    placeOnGround(h,p.cp.x+(kk?1.2:-0.4),p.cp.z,p.cp.y);h.iT=1.2;h.vel.set(0,0,0);if(!h.active)h.following=false;floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),txt,'#e8f4ff');G.stats.geese=(G.stats.geese||0)+1;}
  /* ---------- двор Яги: сон Яги, мышка, горшок ---------- */
  const YS={st:'sleep',t:0,cd:0,zz:0};
  function yardTick(dt){if(!F.yard||F.back||F.stage==='cine')return;
    YS.zz-=dt;if(YS.st==='sleep'&&YS.zz<=0){YS.zz=2.4;floatText(yy.g.position.clone().add(new V3(0.2,1.9,0)),'Хр-р…','#c8d8ff');}
    yy.body.rotation.x=YS.st==='sleep'?0.22+Math.sin(G.time*1.4)*0.04:0;
    if(YS.cd>0)YS.cd-=dt;
    if(YS.st==='sleep'&&YS.cd<=0){const Yp=yy.g.position;
      const bad=HEROES.find(h=>(hd(h.pos,Yp)<7&&noisy(h))||(hd(h.pos,Yp)<8&&heroLight(h))||(F.potH===h&&!h.grounded&&hd(h.pos,Yp)<9));
      if(bad){YS.st='stir';YS.t0=0;YS.why=bad.kind+(noisy(bad)?':noise':heroLight(bad)?':light':':pot');F.stirs=(F.stirs||0)+1;YS.t=p35(3,2.6,2);SFX.miss();floatText(Yp.clone().add(new V3(0,2,0)),'Кто тут шастает?..','#ffffff');for(const pi of[0,1])tip(pi,'Замри! Яга ворочается — не шевелись!',2.4);if(!F.stirTold){F.stirTold=true;say(null,'<i>Яга заворочалась! Замрите — не шевелитесь, пока не захрапит.</i>',2.6);}}}
    else if(YS.st==='stir'){YS.t-=dt;YS.t0+=dt;const Yp=yy.g.position;yy.body.rotation.y=Math.sin(G.time*3)*0.4;
      const mover=YS.t0>0.8&&HEROES.find(h=>h.active&&hd(h.pos,Yp)<10&&(Math.hypot(h.vel.x,h.vel.z)>1.4||heroLight(h)));
      if(mover){YS.st='sleep';YS.caught=mover.kind;F.kyshes=(F.kyshes||0)+1;YS.cd=2.5;bark(yy,'yaga','А ну, кыш со двора!',1.8,true);for(const h of HEROES)if(hd(h.pos,Yp)<14){catch35(h,'Яга метлой — кыш!');}}
      else if(YS.t<=0){YS.st='sleep';YS.cd=1.5;floatText(Yp.clone().add(new V3(0,2,0)),'…почудилось. Хр-р…','#c8d8ff');}}
    // мышка просит кашки
    if(!F.mouseAsk&&HEROES.some(h=>h.active&&hd(h.pos,mouse.g.position)<4.5)){F.mouseAsk=true;bark(mouse,'mysh','Пи-пи! Кашки дайте — я вам добренькое скажу.',2.8,true);}
    if(F.potH){const h=F.potH;pot.position.set(h.pos.x,h.pos.y+heroHeight(h)+0.15,h.pos.z);
      if(hd(h.pos,mouse.g.position)<1.7){F.potH=null;F.mouseFed=true;pot.position.set(1.9,0.02,-205.6);SFX.ok();burst(mouse.g.position.clone().add(new V3(0,0.4,0)),0xf0e0b0,10,2);
        bark(mouse,'mysh','Ням! Слушайте: Яга спит вполглаза. Берите братца — а я за него на лавке посижу, яблочками покатаю!',3.6,true);
        later(1,()=>{const f=mouse.g.position.clone();anim(1.6,k=>{mouse.g.position.lerpVectors(f,new V3(5.2,0.53,-202.4),k);mouse.g.position.y=f.y+(0.53-f.y)*k+Math.sin(k*Math.PI)*0.5;});});
        later(1.4,()=>{if(!T.yosha.active)tip(1,'Смени на Йошу '+K(1,'swap')+' — к Тишке!',3.2);});}}}
  /* ---------- погоня: волны и Яга ---------- */
  function chaseTick(dt){if(!F.back||F.stage!=='back')return;const act=[0,1].map(pi=>active(pi)),busy=!!SH||!!G.cine;
    const rear=Math.min(act[0].pos.z,act[1].pos.z),front=Math.max(act[0].pos.z,act[1].pos.z);
    // Яга на ступе: догоняет того, кто сзади; поймала — к колокольчику, сама откатывается
    if(YG.nap>0)YG.nap-=dt;
    if(!busy&&YG.nap<=0){const tg=act[0].pos.z<act[1].pos.z?act[0]:act[1];YG.z=Math.min(YG.z+p35(1.2,1.8,2.4)*dt,tg.pos.z);YG.x=damp(YG.x,tg.pos.x,1.2,dt);
      if(tg.pos.z-YG.z<8&&YG.warnT<=0){YG.warnT=6;floatText(tg.pos.clone().add(new V3(0,tg.d.height+0.9,0)),'Яга близко!','#ffb0a0');}
      for(const h of act)if(Math.hypot(h.pos.x-YG.x,h.pos.z-YG.z)<2.4&&!(h.iT>0)){catch35(h,'Яга метлой — фьюить!');YG.z=Math.min(YG.z,players[h.player].cp.z)-14;}}
    if(YG.warnT>0)YG.warnT-=dt;
    yst.g.position.set(YG.x,1.2+Math.sin(G.time*1.3)*0.25,YG.z);yst.g.rotation.y=Math.atan2(0,1);yst.broom.rotation.z=Math.sin(G.time*(YG.nap>0?1:5))*0.5;if(YG.nap>0&&Math.random()<dt*0.6)floatText(yst.g.position.clone().add(new V3(0,2.4,0)),'з-з-з…','#c8d8ff');
    // волна: налетает сзади, тень-полоса впереди; кто светит под ней — к колокольчику
    if(busy){wave.visible=band.visible=false;WV.on=false;return;}
    if(!WV.on){WV.t-=dt;if(WV.t<=0){WV.on=true;WV.z=rear-p35(22,20,18);WV.zp=WV.z;WV.warn=false;wave.visible=band.visible=true;}}
    if(WV.on){WV.zp=WV.z;WV.z+=p35(7,9,10.5)*dt;wave.position.set(0,0,WV.z-2.6);band.position.set(0,0.14,WV.z);WV.geese.forEach((g,i)=>{g.wings.forEach(w=>{w.wp.rotation.z=w.sd*Math.sin(G.time*8+i)*0.5;});});
      if(!WV.warn&&rear-WV.z<14){WV.warn=true;for(let j=0;j<4;j++)tone(rand(420,520),0.12,'square',0.11,rand(300,360),j*0.12);for(const pi of[0,1])if(active(pi).pos.z-WV.z<16)floatText(active(pi).pos.clone().add(new V3(0,active(pi).d.height+0.9,0)),'Волна! Гаси перо!','#e8f4ff');}
      for(const h of HEROES){if(h.pos.z>WV.zp&&h.pos.z<=WV.z&&heroLight(h)&&!W.veil35(h)&&!(h.iT>0))catch35(h,'Волна гусей — к колокольчику!');}
      if(WV.z>front+14){WV.on=false;wave.visible=band.visible=false;WV.t=p35(12,9,7);}}}
  /* ---------- вожак ---------- */
  const onArena=h=>h.pos.z<-57.5&&h.pos.z>-74.5&&Math.abs(h.pos.x)<9.5;
  function trapAt(p){for(const pd of puddles)if(!pd.used&&hd(p,pd)<1.8)return pd;if(!VZ.stoveUsed&&hd(p,{x:0,z:-65.8})<1.6)return 'stove';return null;}
  function vzTick(dt){if(VZ.state==='off'||VZ.state==='intro'||VZ.state==='done')return;const S=VZ;S.t+=dt;vz.g.visible=true;
    const flap=k=>vz.wings.forEach(w=>{w.wp.rotation.z=w.sd*Math.sin(G.time*6)*k;});vRing.visible=S.state==='mark'||S.state==='lock';knotMk.visible=S.state==='stuck'&&S.seen;
    if(S.state==='circle'){S.a+=dt*0.9;S.pos.set(VC.x+Math.cos(S.a)*6.5,7,VC.z+Math.sin(S.a)*6.5);vz.g.position.copy(S.pos);vz.g.rotation.y=-S.a;flap(0.5);
      if(S.t>p35(2.8,2.2,1.6)&&!G.cine){const lit=HEROES.filter(h=>heroLight(h)&&onArena(h));
        if(lit.length){lit.sort((a,b)=>hd(a.pos,S.pos)-hd(b.pos,S.pos));S.tgt=lit[0];S.state='mark';S.t=0;tone(520,0.2,'square',0.1,780);floatText(S.pos.clone().add(new V3(0,1.2,0)),'Га-а!','#ffffff');}
        else{S.idle+=dt;if(S.idle>5&&!F.vzTold){F.vzTold=true;say('zven','Вожак на свет летит! Зажгите перо у ловушки — и отскочите!',3,true);}}}}
    else if(S.state==='mark'){const h=S.tgt;S.a+=dt*0.9;S.pos.set(VC.x+Math.cos(S.a)*6.5,7,VC.z+Math.sin(S.a)*6.5);vz.g.position.copy(S.pos);vz.g.rotation.y=Math.atan2(h.pos.x-S.pos.x,h.pos.z-S.pos.z);flap(0.7);
      vRing.position.set(h.pos.x,h.pos.y+0.1,h.pos.z);vRing.material.opacity=0.5+0.4*Math.sin(G.time*10);
      if(!heroLight(h)&&S.t<0.6){S.state='circle';S.t=0;}else if(S.t>p35(1.9,1.4,1.0)){S.lock.set(h.pos.x,0,h.pos.z);S.state='lock';S.t=0;}}
    else if(S.state==='lock'){vRing.position.set(S.lock.x,0.1,S.lock.z);vRing.material.opacity=0.9;flap(0.9);if(S.t>0.35){S.state='dive';S.t=0;S.from.copy(S.pos);tone(380,0.3,'sawtooth',0.1,180);}}
    else if(S.state==='dive'){const k=Math.min(1,S.t/0.5);S.pos.lerpVectors(S.from,new V3(S.lock.x,0.5,S.lock.z),k*k);vz.g.position.copy(S.pos);flap(0.95);
      if(k>=1){const tr=trapAt(S.lock);const hit=HEROES.find(h=>hd(h.pos,S.lock)<1.25&&Math.abs(h.pos.y)<1.5&&h.rollT<=0&&!(h.iT>0));
        if(hit){S.state='rise';S.t=0;hit.lit=false;placeOnGround(hit,clamp(hit.pos.x,-7,7),-59.6,0);hit.iT=1.4;burst(hit.pos.clone().add(new V3(0,1,0)),0xffffff,12,3);floatText(hit.pos.clone().add(new V3(0,hit.d.height+0.6,0)),'Вожак клюнул!','#ffb0a0');if(!F.peckTold){F.peckTold=true;tip(hit.player,'Красный круг замер — отскочи '+K(hit.player,'roll')+'!',3);}}
        else if(tr==='stove'){S.state='stove';S.t=0;VZ.stoveUsed=true;S.pos.set(0,1.0,-67.6);vz.g.position.copy(S.pos);SFX.crash();floatText(new V3(0,2.6,-66),'В печку влетел!','#ffd9a0');bark(pech,'pechka','Ой! Потапушка, заслонку!',1.8,true);}
        else if(tr){S.state='stuck';S.t=0;S.trap=tr;tr.used=true;tr.m.material.color.setHex(0xc8b8c0);S.stuckT=p35(8,6,4.5);S.seen=false;SFX.crash();burst(S.pos.clone(),0xf4c8d8,18,3);floatText(S.pos.clone().add(new V3(0,1.4,0)),'Увяз в киселе!','#ffd0e0');
          if(!F.stuckTold){F.stuckTold=true;say('zven','Увяз! Пелагея, Совиным взором — где узел? Прошка — рогаткой!',3,true);}}
        else{S.state='rise';S.t=-0.6;floatText(S.pos.clone().add(new V3(0,1.2,0)),'Мимо!','#ffffff');}}}
    else if(S.state==='stove'){flap(0.2);if(pech.door.rotation.y>-0.2){S.state='stuck';S.t=0;S.trap='stove';S.stuckT=p35(8,6,4.5);S.seen=false;S.pos.set(0.6,4.2,-68.6);vz.g.position.copy(S.pos);vz.g.rotation.y=Math.PI;floatText(new V3(0,4.6,-68),'Попался!','#ffd9a0');}
      else if(S.t>3){S.state='rise';S.t=0;anim(0.4,k=>{pech.door.rotation.y=-1.4;});floatText(new V3(0,2.6,-66),'Вылетел!','#ffffff');}}
    else if(S.state==='stuck'){flap(0.25+0.2*Math.sin(G.time*9));const kp=S.trap==='stove'?new V3(0.6,3.75,-68.4):S.pos.clone().add(new V3(0,0.7,0.6));knotMk.position.copy(kp);VKNOT.pos.copy(kp);
      if(S.t>S.stuckT){S.state='rise';S.t=0;floatText(S.pos.clone().add(new V3(0,1.4,0)),'Вырвался!','#ffffff');if(S.trap==='stove')anim(0.4,k=>{pech.door.rotation.y=-1.4*k;});}}
    else if(S.state==='rise'){const k=clamp(S.t/1.0,0,1);const to=new V3(VC.x+Math.cos(S.a)*6.5,7,VC.z+Math.sin(S.a)*6.5);S.pos.lerp(to,k*0.2);vz.g.position.copy(S.pos);flap(0.9);if(S.t>1){S.state='circle';S.t=0;S.idle=0;}}}
  const VKNOT={pos:new V3(),active:()=>VZ.state==='stuck'&&VZ.seen,onHit:()=>{F.knots++;SFX.ok();burst(VKNOT.pos.clone(),0xffe08a,14,3);floatText(VKNOT.pos.clone().add(new V3(0,0.6,0)),'Узел '+F.knots+' из 3!','#ffe08a');
    if(F.knots>=3){VZ.state='done';vRing.visible=false;knotMk.visible=false;later(0.8,endScene);return;}
    VZ.state='rise';VZ.t=0;if(VZ.trap==='stove')anim(0.4,k=>{pech.door.rotation.y=-1.4*k;});later(0.4,()=>floatText(VZ.pos.clone().add(new V3(0,1.4,0)),'Га-а-а!','#ffffff'));}};
  W.marks.push(VKNOT);
  W.k35={watch:()=>distT,tuch:()=>tuchT,wave:()=>WV,yaga:()=>YG,vz:()=>VZ,yard:()=>YS,pot:()=>F.potH,POT0,mouse:()=>mouse.g.position,tish:()=>tish.g,puddles};   // для напарника-бота и проверок
  /* ---------- ход уровня ---------- */
  W.updates.push(dt=>{
    // сторож: отвернулся к колокольчику — плавно, потом обратно
    if(distT>0){distT-=dt;watchG=angDamp(watchG,AL,6,dt);}else watchG=angDamp(watchG,A0,4,dt);lureB.rotation.z=damp(lureB.rotation.z,distT>0?Math.sin(G.time*14)*0.4:0,6,dt);lureMk.visible=!back()&&distT<0.6;
    // тучка Йоши
    if(tuchT>0)tuchT-=dt;tuch.visible=tshade.visible=tuchT>0;if(tuchT>0){const s=Math.min(1,tuchT/0.6,(p35(14,10,7)-tuchT+0.3)/0.6);tuch.scale.setScalar(Math.max(0.05,s));tshade.material.opacity=0.4*s;}puff.visible=tuchT<=0;
    // тень щита Потапа
    {const P=T.potap,on=potapVeil();shade.visible=on;if(on)shade.position.set(P.pos.x,P.pos.y+0.1,P.pos.z);
      if(on&&P.lit&&!F.shadeTold&&P.pos.z<-71&&P.pos.z>-84){F.shadeTold=true;bark(P,'potap','Под щитом мой свет гусю не виден. Держитесь рядом!',2.6,true);}}
    // кисельные берега: вязко, прыжок ниже (Йоша — поверху)
    for(const h of HEROES){const k=h.kind!=='yosha'&&(inKisel(h)||inPuddle(h));h.jumpK=k?0.6:1;}
    // спящий гусь: шум рядом — проснулся и глядит на мосток; через 7 с снова дремлет
    {const q=gq('sleep');if(q&&!back()){if(q.state==='sleep'){q.zz=(q.zz||0)-dt;if(q.zz<=0&&HEROES.some(h=>hd(h.pos,q.pos)<12)){q.zz=2.6;floatText(q.pos.clone().add(new V3(0.3,0.9,0)),'з-з-з…','#c8d8ff');}
        const nz=HEROES.find(h=>hd(h.pos,q.pos)<6&&noisy(h));
        if(nz){q.state='fly';q.awakeT=7;q.a=0;q.m.head.rotation.x=0;tone(470,0.15,'square',0.12,360);floatText(q.pos.clone().add(new V3(0,1.2,0)),'Га?!','#ffffff');if(!F.sleepTold){F.sleepTold=true;tip(nz.player,'Шумнули — гусь проснулся! Тише: без кувырков рядом.',3.4);}}}
      else if(q.state==='fly'){q.awakeT-=dt;if(q.awakeT<=0){q.state='sleep';q.sus=0;floatText(q.pos.clone().add(new V3(0,1.1,0)),'…задремал','#c8d8ff');}}}}
    if(!back()){
      // гнездо пустое
      if(!F.nest&&HEROES.some(h=>h.active&&hd(h.pos,{x:0,z:-45})<4.5)){F.nest=true;say('zven','Пусто! Только Тишкино пёрышко… Гуси его к Бабе Яге унесли — за пропасть!',3.2,true);}
      // печка угощает того, кто дошёл первым
      if(!F.stoveOff&&!F.pie){const first=HEROES.find(h=>h.active&&hd(h.pos,{x:0,z:-65.6})<3.2);if(first)pieOffer(first);}
      if(!F.stoveOff&&!F.pie&&[0,1].every(pi=>active(pi).pos.z<-76)){F.stoveOff=true;F.stoveRefused=true;bark(pech,'pechka','Ну, как знаешь… Обратно пойдёшь — дров мне принеси.',2.6,true);}
      if(F.pie){const p=F.pie;p.t-=dt;pech.pie.position.y=1.5+Math.sin(G.time*4)*0.05;if(p.t<=0||hd(p.h.pos,{x:0,z:-65.6})>6||!p.h.active)pieRefuse();}
      // яблонька угощает: яблочко подкинутым сорвать, Йоше полить
      if(!F.appleOff&&!F.treeAsk1&&HEROES.some(h=>h.active&&hd(h.pos,{x:0,z:-104})<4.5)){F.treeAsk1=true;bark(yab,'yablonka','Съешь моё кислое яблочко да полей меня — спрячу, сберегу.',3);later(3.2,()=>say('zven','Яблочко высоко — Потап подкинет! А Йоша польёт.',2.6,true));}
      if(F.treeAsk1&&!F.appleEat){sour.position.y=SOUR.y+Math.sin(G.time*2)*0.05;const h=HEROES.find(q=>!q.grounded&&q.pos.y>2.7&&Math.hypot(q.pos.x-SOUR.x,q.pos.z-SOUR.z)<1.6);if(h)sourEat(h);}
      if(F.treeAsk1&&!F.appleOff&&F.appleEat&&F.treeWater1){F.appleOff=true;F.appleOK=true;later(0.4,()=>bark(yab,'yablonka','Уважили! На обратном пути — спрячу.',2.4,true));}
      if(!F.appleOff&&[0,1].every(pi=>active(pi).pos.z<-112)){F.appleOff=true;F.treeRefused=true;bark(yab,'yablonka','Ну, как знаете… Обратно пойдёте — водицы мне дайте.',2.6,true);}
      // речка угощает киселём на бережку
      if(!F.riverOff&&!F.riverOffer&&HEROES.some(h=>h.active&&inKisel(h))){F.riverOffer=true;say('rechka','Отведайте моего киселька с молочком — спрячу, сберегу.',3,true);}
      if(!F.riverOff&&[0,1].every(pi=>active(pi).pos.z<-148)){F.riverOff=true;F.riverRefused=true;say('rechka','Ну, как знаете… Обратно пойдёте — запруду мне сбейте.',2.8,true);}
      // двор Яги
      if(!F.yard&&HEROES.some(h=>h.active&&h.pos.z<-189.5)){F.yard=true;F.stage='yard';say(null,'<i>Двор Бабы Яги. Яга на пеньке дремлет, у избушки — мышка, а на лавке Тишка яблочками играет.</i>',3.4,true);}
      yardTick(dt);
      if(F.mouseFed&&F.stage==='yard'&&T.yosha.active&&hd(T.yosha.pos,{x:4.2,z:-202.4})<2.2)yardScene();}
    else{
      chaseTick(dt);
      // речка прячет: пещерка (Совиный взор) и — если отказались от киселя — запруда
      if(F.stage==='back'&&!F.riverAsk&&HEROES.some(h=>h.active&&h.pos.z>-152&&h.pos.z<-136))riverAsk();
      if(F.riverAsk&&!F.riverDone&&F.hollow&&(!F.riverRefused||F.dam)){F.riverDone=true;openShelter(zRiver,'river',()=>{giveLink35(L2);rememberLine();});}
      // яблонька прячет: Потап раздвигает ветви, а без угощения — ещё и полить
      if(F.riverDone&&!SH&&!F.treeAsk&&HEROES.some(h=>h.active&&h.pos.z>-112&&h.pos.z<-97))treeAsk();
      if(F.treeAsk&&!F.treeDone&&(!F.treeRefused||F.treeWater2)){F.treeDone=true;openShelter(zTree,'tree',()=>{giveLink35(L3);rememberLine();});}
      // печка: укрытие (без пирожка — полено), потом вожак
      if(F.treeDone&&!SH&&!F.stoveAsk&&HEROES.some(h=>h.active&&h.pos.z>-74&&h.pos.z<-58))stoveAsk();
      vzTick(dt);}
    tickShelter(dt);
    tish.g.rotation.y=Math.sin(G.time*2)*0.2;if(!F.mouseFed)gapples.forEach((a,i)=>{a.position.x=4.6+i*0.22+Math.sin(G.time*2+i)*0.08;});yab.eyes.forEach(e=>{e.scale.y=(F.treeAsk1&&!F.appleOff)||(F.treeAsk&&!F.treeDone)?1:0.4;});
    mouse.g.rotation.y=F.mouseFed?Math.PI+Math.sin(G.time*3)*0.3:0.4+Math.sin(G.time*5)*0.2;});
  /* ---------- кнопки ---------- */
  W.skillHook=(pi,h)=>{
    if(F.pie&&F.pie.h===h&&h.active){pieEat();return true;}
    if(!back()&&F.riverOffer&&!F.riverOff&&inKisel(h)){F.riverOff=true;F.riverOK=true;h.atkT=0.28;SFX.ok();burst(h.pos.clone().add(new V3(0,1,0)),0xfaf6ff,10,2);later(0.3,()=>bark(h,h.kind,h.kind==='proshka'?'Кисель как кисель… Ладно, вкусный.':'М-м, киселёк с молочком!',2.2,true));later(2.4,()=>say('rechka','Отведали — обратно пойдёте, спрячу!',2.4,true));return true;}
    if(F.stage==='yard'&&F.mouseAsk&&!F.potH&&!F.mouseFed&&hd(h.pos,POT0)<2.0){F.potH=h;h.lit=false;SFX.ok();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Тихонько…','#ffe9a0');tip(h.player,'Неси мышке — тихо: без прыжков и кувырков.',2.6);return true;}
    if(back()&&F.stoveAsk&&F.stoveRefused&&!F.log&&h.kind==='potap'&&hd(h.pos,{x:-6,z:-71})<2.6){F.log=true;h.atkT=0.28;SFX.toss();const lg=addMesh(new THREE.CylinderGeometry(0.17,0.17,1.2,8),M(0x8a6038),-6,1,-71,W.group);lg.rotation.z=Math.PI/2;
      const f=lg.position.clone();anim(0.9,k=>{lg.position.set(lerp(f.x,0,k),f.y+Math.sin(k*Math.PI)*2.4,lerp(f.z,-66.4,k));if(k>=1){W.group.remove(lg);burst(new V3(0,1.2,-66.4),0xff8a3a,14,3);bark(pech,'pechka','Ох, жарко! Теперь полезайте!',1.8,true);}});return true;}
    if(VZ.state==='stove'&&h.kind==='potap'&&hd(h.pos,{x:0,z:-65.4})<3.2){h.atkT=0.28;SFX.crash();anim(0.3,k=>{pech.door.rotation.y=-1.4*(1-k);});return true;}
    return false;};
  const P0=T.proshka;
  prompt(0,'skill',()=>headOf(F.pie?F.pie.h:P0),()=>!!F.pie&&F.pie.h.player===0,'съесть пирожок');
  prompt(1,'skill',()=>headOf(F.pie?F.pie.h:T.pelageya),()=>!!F.pie&&F.pie.h.player===1,'съесть пирожок');
  prompt(0,'label',()=>pech.pie.getWorldPosition(new V3()).add(new V3(0,0.7,0)),()=>!!F.pie,(()=>F.pie?'пирожок · '+Math.ceil(F.pie.t)+' с':''));
  prompt(0,'label',()=>watch.pos.clone().add(new V3(0,1.6,0)),()=>distT>0&&!back(),(()=>'отвернулся · '+Math.ceil(distT)+' с'));
  prompt(1,'label',()=>new V3(0,5.2,-116),()=>tuchT>0&&!back(),(()=>'тучка · '+Math.ceil(tuchT)+' с'));
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'skill',()=>headOf(h()),()=>!back()&&F.riverOffer&&!F.riverOff&&inKisel(h()),'отпить киселька');
    prompt(pi,'skill',()=>headOf(h()),()=>F.stage==='yard'&&F.mouseAsk&&!F.potH&&!F.mouseFed&&hd(h().pos,POT0)<2.0,'взять горшок');
    prompt(pi,'item',()=>headOf(h()),()=>h().lit&&W.geese.some(q=>(!q.on||q.on())&&q.state==='fly'&&hd(q.fp,h().pos)<q.fr+3)&&!W.veil35(h()),'погаси перо!');
    prompt(pi,'call',()=>headOf(h()),()=>!!SH&&SH.state==='count'&&inside(h(),SH.z)&&!inside(other(pi),SH.z),'позови!');
    prompt(pi,'call',()=>headOf(h()),()=>back()&&F.stage==='back'&&!SH&&F.songs>0&&h().kind==='yosha'&&WV.on,'спой, Тишка!');}
  prompt(0,'skill',()=>headOf(P0),()=>!!SH&&SH.name==='stove'&&F.stoveRefused&&!F.log&&T.potap.active&&hd(T.potap.pos,{x:-6,z:-71})<2.6,'полено в печь');
  prompt(0,'skill',()=>headOf(T.potap),()=>VZ.state==='stove'&&T.potap.active,'заслонку!');
  prompt(1,'skill',()=>headOf(T.pelageya),()=>VZ.state==='stuck'&&!VZ.seen&&T.pelageya.active,'Совиный взор');
  prompt(0,'skill',()=>headOf(P0),()=>VZ.state==='stuck'&&VZ.seen&&P0.active,'по узлу!');
  prompt(0,'skill',()=>headOf(P0),()=>back()&&F.riverAsk&&F.riverRefused&&!F.dam&&P0.active&&P0.pos.z<-134,'по запруде');
  prompt(1,'skill',()=>headOf(T.pelageya),()=>back()&&F.riverAsk&&!F.hollow&&T.pelageya.active&&T.pelageya.pos.z<-134,'Совиный взор');
  prompt(1,'skill',()=>headOf(T.yosha),()=>((F.treeAsk1&&!F.treeWater1&&!F.appleOff)||(F.treeAsk&&F.treeRefused&&!F.treeWater2))&&T.yosha.active&&hd(T.yosha.pos,{x:0,z:-104})<3.2,'полить');
  prompt(1,'skill',()=>headOf(T.yosha),()=>!back()&&tuchT<=0&&T.yosha.active&&hd(T.yosha.pos,{x:2.8,z:-110.6})<3,'полить облачко');
  prompt(0,'label',()=>new V3(0,4.6,SH?SH.z.z:0),()=>!!SH&&SH.state==='count',(()=>SH?'прячемся · '+Math.ceil(SH.t)+' с':''));
  /* ---------- задачи ---------- */
  const mk=pi=>[
    O(()=>'Гуси свет видят. По лиловому мостку — без света, смело.',()=>zOf(pi)<-18.5,()=>[tA[3].m]),
    O(()=>'Золотой мосток под гусем: жди, пока отвернётся, и перо '+K(pi,'item')+'.<br>Или в обход — тёмными облачками справа.',()=>zOf(pi)<-37||F.stage!=='walk',()=>[tB[3].m]),
    O(pi?()=>'Гнездо пустое. Ждите звона: сторож глядит на мосток —<br>Прошка звякнет колокольчиком, тогда со светом беги!':()=>'Гнездо пустое. Сторож глядит на мосток —<br>Прошка, рогаткой '+K(0,'skill')+' в колокольчик: сторож отвернётся!',()=>zOf(pi)<-58.6||F.stage!=='walk',()=>[lure,tC[2].m]),
    O(()=>'Печка угощает пирожком. Съешь '+K(pi,'skill')+' — не отказывайся!',()=>!!F.stoveOff,()=>[pech.g]),
    O(pi?()=>'Гусь висит над мостком. Иди рядом с Потапом без света —<br>Он светит из-под щита.':()=>'Гусь висит над мостком. Потап: перо '+K(0,'item')+' и щит '+K(0,'guard')+' над головой —<br>Под щитом свет не виден. Друзья — рядом!',()=>zOf(pi)<-82.6||F.stage!=='walk',()=>[tD[2].m]),
    O(()=>'Спящий гусь у мостка. Тише: без кувырков, удара и разбега.',()=>zOf(pi)<-96.6||F.stage!=='walk',()=>[tE[2].m]),
    O(pi?()=>'Яблонька угощает. Встань рядом с Потапом — подкинет к яблочку.<br>Йоша — полей яблоньку '+K(1,'skill')+'.':()=>'Яблонька угощает. Яблочко высоко: Потап подкинет '+K(0,'skill')+' друга.<br>Йоша польёт яблоньку живой водой.',()=>!!F.appleOff,()=>[yab.g]),
    O(pi?()=>'Гусь висит над мостком. Йоша, полей облачко '+K(1,'skill')+' —<br>Тучка тенью укроет: под ней и иди.':()=>'Гусь висит над мостком. Йоша польёт облачко у края —<br>Под тучкой свет не виден: под ней и идите.',()=>zOf(pi)<-120.6||F.stage!=='walk',()=>[puff,tH[2].m]),
    O(()=>'Коса: золотая нить — со светом, лиловая — без.<br>В узком месте не сходитесь — свет гасит лиловую!',()=>zOf(pi)<-134.6||F.stage!=='walk',()=>[]),
    O(()=>'Речка угощает киселём. Встань на бережок и отпей '+K(pi,'skill')+'.',()=>!!F.riverOff,()=>[milk]),
    O(()=>'Через пропасть: на золотом перо '+K(pi,'item')+' гори, на лиловом — гаси.',()=>!!F.yard,()=>[]),
    O(()=>'Двор Яги. Мышка просит кашки — горшок на столе у Яги.<br>Без света и шума! '+K(pi,'skill')+' — взять горшок.',()=>!!F.mouseFed,()=>[mouse.g,pot]),
    O(pi?()=>'Йоша, к Тишке '+K(1,'swap')+' — на спину его!':()=>'Йоша сажает Тишку на спину.',()=>!!F.back,()=>[tish.g]),
    O(()=>'Погоня! Под волной гусей перо гаси '+K(pi,'item')+'.<br>Золотой мосток — после волны. Яга на ступе — не стой!',()=>!!F.riverAsk,()=>[]),
    O(pi?()=>'Речка прячет. Пелагея — Совиный взор '+K(1,'skill')+': где пещерка?':()=>F.riverRefused?'Речка сердится: Прошка, рогаткой '+K(0,'skill')+' — по запруде!':'Речка прячет — ищем пещерку под бережком.',()=>!!F.riverDone&&!SH,()=>[dam,hollow]),
    O(()=>'К яблоньке! Тишка вспомнил строчку: '+K(pi,'call')+' у Йоши — волна задремлет.',()=>!!F.treeAsk,()=>[yab.g]),
    O(pi?()=>F.treeRefused?'Яблонька пить просит: Йоша, полей '+K(1,'skill')+'. Потом все — под крону!':'Потап раздвинет ветви — все под крону!':()=>'Потап — к стволу: ветви раздвинет. Все под крону!',()=>!!F.treeDone&&!SH,()=>[yab.g]),
    O(()=>'К печке! По мосткам — между волнами.',()=>!!F.stoveAsk,()=>[pech.g]),
    O(pi?()=>'Все к заслонке — живо!':()=>F.stoveRefused?'Печка дров просит: Потап, полено '+K(0,'skill')+' — в печь!':'Все к заслонке — живо!',()=>F.stage==='boss'||F.stage==='end',()=>[pech.g,wood]),
    O(()=>'Вожак ныряет на свет: перо '+K(pi,'item')+' у ловушки — и отскочи '+K(pi,'roll')+'!<br>Увяз — Пелагея взором ищет узел, Прошка сбивает рогаткой.',()=>F.stage==='end',()=>[vz.g]),
    O('Тишка спасён!',()=>false,()=>[])];
  for(const pi of[0,1])W.objectives[pi]=mk(pi);
  W.tipZones.push({cond:(pi,h)=>h.lit&&!W.veil35(h)&&W.geese.some(q=>(!q.on||q.on())&&q.state==='fly'&&hd(q.fp,h.pos)<q.fr+4),text:pi=>'Луч гуся рядом! Перо погаси '+K(pi,'item')+' — без света гусь тебя не видит.'},
    {cond:(pi,h)=>!!SH&&SH.state==='count',text:pi=>SH&&SH.need&&!SH.held?SH.needTip:SH&&SH.waves?'Гуси летят волнами — будь под бережком!':'Все четверо — внутрь! Кто отстал — кликни к себе '+K(pi,'call')+'.'},
    {cond:(pi,h)=>F.stage==='yard'&&YS.st==='stir',text:pi=>'Замри! Яга ворочается — не шевелись!'},
    {cond:(pi,h)=>F.stage==='back'&&WV.on&&h.pos.z-WV.z<16&&h.pos.z>WV.z&&h.lit,text:pi=>'Волна гусей! Погаси перо '+K(pi,'item')+'!'},
    {cond:(pi,h)=>h.pos.z<-152&&h.pos.z>-189&&(W.abyss35||[]).some(([t,z0,z1])=>t==='shadow'&&h.lit&&(back()?h.pos.z>z1-2.4&&h.pos.z<z1:h.pos.z>z0&&h.pos.z<z0+2.4)),text:pi=>'Впереди лиловый мосток — погаси перо '+K(pi,'item')+'!'},
    {cond:(pi,h)=>h.pos.z<-152&&h.pos.z>-189&&(W.abyss35||[]).some(([t,z0,z1])=>t==='light'&&!h.lit&&(back()?h.pos.z>z1-2.4&&h.pos.z<z1:h.pos.z>z0&&h.pos.z<z0+2.4))&&!(back()&&WV.on),text:pi=>'Впереди золотой мосток — зажги перо '+K(pi,'item')+'!'},
    {cond:(pi,h)=>VZ.state==='mark'&&VZ.tgt===h,text:pi=>'Вожак целится! Стой у ловушки, а как круг замрёт — кувырок '+K(pi,'roll')+'!'});
  W.camZones.push({x:0,z:-65.5,r:9.5,camActive:()=>F.stage==='boss'});
  W.spawns=[[new V3(-2.6,0,4.6),new V3(-4.4,0,5.8)],[new V3(2.6,0,4.6),new V3(4.4,0,5.8)]];W.startAct=[0,0];
  W.pauseLine=K(0,'item')+' в луче гуся — погаси перо, пока «!» не вырос. Угощенья не отвергай — обратно спрячут.<br>'+K(0,'skill')+' приёмы: рогатка — звон, щит Потапа и тучка Йоши — тень.<br>'+K(0,'call')+' на погоне у Йоши — Тишка споёт строчку колыбельной.';
  W.onStart=()=>{play({dur:8.4,fov:48,shots:[shot(0,[0,3,8],[0,6,-13]),shot(4,[4,2,0],[0,1,-45])],
    says:[[0.3,3.6,null,'<i>Гуси-лебеди унесли бельчонка Тишку —</i><br><i>того, что колыбельную забыл.</i>',true],[4.2,3.6,'zven','Гуси видят свет. Тише… Где темно — идём смело.',true]],
    end:()=>{F.stage='walk';snapCams();later(0.6,()=>{say('zven','Тут свет нас выдаёт — гасите перья!',2.6,true);banner('Свет выдаёт!','#e8f4ff',2.4,'в луче гуся — гаси перо, пока «!» не вырос');});}});};
  flushDecor();flushPuffs();};
