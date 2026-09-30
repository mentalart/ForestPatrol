/* ============================== РЕЛИЗ final06 · 5-Б2: УРОВЕНЬ — арена, пять этапов, ролики между ними ============================== */
// Этапы: 1 «Чёрные свечи» (купол держат четыре свечи — погасить все вместе; цепи из земли, перст-молния),
// 2 «Ключ и искорка» (Кощей сам в бою; отбив зажигает искорку над другом — отбил с искоркой — угольков гаснет вдвое больше; летучие ключи
// запирают героя — друг отпирает ударами), 3 «Буря» (Кощей летает; тёмный шар отбить другу, друг отбивает в небо; вороны,
// иглы с неба, воронка), 4 «Меч Бессмертного» (серии, задержанный замах, прыжок с волной, «око» — кого выбрал; костяные щитники),
// 5 «Игла» (застёжку из иглы куёт Прошка у наковальни в такт, иглу передают друг другу, Кощей охотится за ней; кольцо цепей —
// щиты в такт). Спесь сбита — оба бьют рядом с ним: «золотая нить сказа». Сюжетные ролики и Сказ по памяти — из прежнего финала.
const K5N=['','Чёрные свечи','Ключ и искорка','Буря','Меч Бессмертного','Игла'];
build5B2=function(){
  W.zvenAway=false;W.world=5;setTheme('dawn');sky('dawn');W.name='5-Б2 · Кощей Бессмертный и Златая цепь';W.sub='Остров Буян · финал · пять этапов';W.camX=18;const F=W.flags;F.stage='intro';
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.noLose=false;W.noPetals=false;W.fallY=-12;const T=HERO;const C=new V3(0,0,-13),R=11;
  if(!G.flags.names)G.flags.names={};
  Object.assign(K5,{st:0,fight:false,live:false,spark:null,locks:{},orbs:[],adds:[],needle:null,forge:null,zones:[],mark:0,log:[],said:{},bones:false,storm:0,stormTo:0});K5FX.length=0;
  if(G.flags.tut5b)K5.seen=Object.assign({},G.flags.tut5b);
  /* ---------- арена (как в прежнем финале) ---------- */
  const sea=new THREE.Mesh(new THREE.PlaneGeometry(700,700),M(0x6a8ab8,{emissive:0x302030,emissiveIntensity:0.2}));sea.rotation.x=-Math.PI/2;sea.position.set(0,-0.7,0);W.group.add(sea);
  ground(-22,22,-42,16,0,M(0x6a8a58));wall(-22.2,-22,-42,16);wall(22,22.2,-42,16);wall(-22,22,-42.2,-42);wall(-22,22,16,16.2);
  for(let i=0;i<30;i++){const a=i/30*Math.PI*2;addMesh(new THREE.DodecahedronGeometry(rand(0.8,1.5)),M(0x8a8478),Math.cos(a)*24,0.2,-13+Math.sin(a)*28).rotation.set(rand(0,3),rand(0,3),0);}
  const OAK=new V3(0,0,-28);const trunk=addMesh(new THREE.CylinderGeometry(2.2,3.2,18,14),M(0x6a5a4a),OAK.x,9,OAK.z);W.cyls.push({x:OAK.x,z:OAK.z,r:3,miny:-1,maxy:18,on:true});
  for(let i=0;i<9;i++){const b=addMesh(new THREE.CylinderGeometry(0.25,0.55,rand(6,9),6),M(0x6a5a4a),OAK.x+Math.cos(i)*2,14+rand(0,4),OAK.z+Math.sin(i)*1.5);b.rotation.z=Math.cos(i*1.7)*1.1;b.rotation.x=Math.sin(i*1.3)*0.6;}
  const leaves=[];for(let i=0;i<16;i++){const l=addMesh(new THREE.SphereGeometry(rand(1.6,2.6),10,8),M(0x4f8a3a),OAK.x+rand(-6,6),rand(15,21),OAK.z+rand(-4,4));l.visible=false;l.scale.setScalar(0.01);leaves.push(l);}
  const coil=new THREE.Group();coil.position.copy(OAK);W.group.add(coil);const coilLinks=[];
  function addCoilLink(){const i=coilLinks.length;const a=i*0.42,r=3.1-i*0.012;const m=new THREE.Mesh(new THREE.TorusGeometry(0.16,0.05,6,12),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.6}));m.position.set(Math.cos(a)*r,0.8+i*0.16,Math.sin(a)*r);m.rotation.set(Math.PI/2,a,i%2?Math.PI/2:0);coil.add(m);coilLinks.push(m);return m;}
  const anvil=makeAnvil(6,-19,0,1.2);const anvilCyl=W.cyls[W.cyls.length-1];const stoneB=addMesh(new THREE.DodecahedronGeometry(0.9),M(0x9a948a),-3.5,0.5,-19);stoneB.scale.set(1.3,0.6,1);W.cyls.push({x:-3.5,z:-19,r:1,miny:-1,maxy:0.9,on:true});
  const spring=new V3(-6.5,0,-18.5);{addMesh(new THREE.CylinderGeometry(1,1.1,0.2,16),M(0x7ad8ff,{emissive:0x2a8aa0,emissiveIntensity:0.5,transparent:true,opacity:0.8}),spring.x,0.1,spring.z);for(let i=0;i<8;i++){const a=i/8*6.28;addMesh(new THREE.DodecahedronGeometry(0.3),M(0x9a948a),spring.x+Math.cos(a)*1.2,0.15,spring.z+Math.sin(a)*1.2);}}
  const gor=makeGorynych5(0.75);gor.g.position.set(-13,-0.6,-25);gor.g.rotation.y=0.8;W.cyls.push({x:-13,z:-25,r:3.4,miny:-1,maxy:4,on:true});
  const HK=helpers5();const debt=[['yaga',()=>makeYaga(),[-17,-4]],['leshy',()=>makeLeshy(1),[17,-6]],['kiki',()=>makeKikimora(),[16,0.5]]].filter(([k])=>!HK.some(h=>h===k||(k==='leshy'&&h==='leshy4')||(k==='kiki'&&h==='kiki4')||(k==='yaga'&&h==='yaga3')));
  const DB={};debt.forEach(([k,f,[x,z]])=>{const m=f();m.g.position.set(x,0,z);m.g.rotation.y=Math.atan2(C.x-x,C.z-z);DB[k]=m;W.cyls.push({x,z,r:0.8,miny:-1,maxy:2.5,on:true});});
  const HPOS=[[-5.5,-25.5],[-2.6,-31],[2.6,-31],[5.5,-25.5]];const HM=HK.map((k,i)=>{const d=HELPER5[k]||HELPER5.leshy;const m=d[1]();if(k==='kit'){m.g.position.set(-26,-1.2,-30);m.g.rotation.y=0.4;}else{m.g.position.set(HPOS[i][0],k==='zhar'||k==='sirin'?2.2:0,HPOS[i][1]);m.g.rotation.y=Math.atan2(C.x-HPOS[i][0],C.z-HPOS[i][1]);}return {k,m,name:d[0]};});
  const yagaM=DB.yaga||(HM.find(h=>h.k==='yaga'||h.k==='yaga3')||{}).m;
  const kot=makeKot();kot.g.position.set(-2,0,-22.4);kot.g.rotation.y=0.3;W.cyls.push({x:-2,z:-22.4,r:0.7,miny:-1,maxy:2,on:true});
  const KS=makeKoschei();KS.g.scale.setScalar(1.15);KS.g.position.set(20,0,-12);const KP=new V3(-1.6,0,-23.2);
  const book=makeNotebook();book.g.scale.setScalar(0.9);book.g.visible=false;const ndl=makeNeedle(1.3);KS.hand.add(ndl.g);ndl.g.position.set(0,-0.1,0.1);ndl.g.scale.setScalar(0.45);
  const sword=k5Sword();KS.hand.add(sword);sword.position.set(0,-0.05,0.05);sword.rotation.set(-0.35,0,0);sword.visible=false;
  const Z=makeZven();W.zven=Z;Z.pos.set(0,3,6);
  const bb=$('bossbar');W.onLeave=()=>{bb.style.display='none';try{k5HintHide(false);}catch(e){}k5StormSet(0,true);const v=document.getElementById('k5storm');if(v)v.style.opacity=0;};
  F.links=0;F.skaz=0;
  // купол, аура, грозовые тучи
  const dome=k5Prop(new THREE.Group());dome.position.set(KP.x,0,KP.z);{const s=new THREE.Mesh(new THREE.SphereGeometry(2.9,26,16,0,Math.PI*2,0,Math.PI/2),MB(0x9a60ff,{transparent:true,opacity:0.2,depthWrite:false,side:THREE.DoubleSide}));dome.add(s);
    const w=new THREE.Mesh(new THREE.SphereGeometry(2.92,14,8,0,Math.PI*2,0,Math.PI/2),MB(0xd0b0ff,{transparent:true,opacity:0.35,wireframe:true}));dome.add(w);const r=new THREE.Mesh(new THREE.TorusGeometry(2.9,0.08,6,40),MB(0xc090ff));r.rotation.x=Math.PI/2;r.position.y=0.05;dome.add(r);}dome.visible=false;
  const aura=new THREE.PointLight(0xa070ff,0,10,2);W.group.add(aura);
  const clouds=k5Prop(new THREE.Group());for(let i=0;i<16;i++){const a=i/16*Math.PI*2;const c=new THREE.Mesh(new THREE.SphereGeometry(rand(3,5),9,7),MB(0x2a2438,{transparent:true,opacity:0.85}));c.scale.set(1.6,0.5,1.2);c.position.set(Math.cos(a)*rand(10,16),rand(15,18),-13+Math.sin(a)*rand(10,16));clouds.add(c);}clouds.visible=false;
  /* ---------- Кощей в бою: «тело» боя (морок без облика) + его модель ---------- */
  const KB=makeFoe('k5kos',KP.x,KP.z,{leash:60});KB.k5=true;KB.noKill=true;KB.state='k5off';KB.pos.y=0;KB.g.visible=false;KB.inner.traverse(m=>{if(m.isMesh)m.visible=false;});KB.home=C.clone();K5.e=KB;
  KB.k5hit=(e,h)=>bossHit(e,h);KB.k5parryPost=(e,h)=>bossParried(e,h);KB.k5hitHero=(e,h)=>bossHitHero(e,h);
  KB.k5swoop=(e,h)=>{G.stats.mahs++;SFX.mah();G.hitstop=0.25;shake(h.player,0.05,0.3);ringFx(e.pos,COL.gold,3);floatText(h.pos.clone().add(new V3(0,h.d.height+0.7,0)),'Одним махом!','#ffd76a');e.state='stagger';e.t=0;e.openHit=false;emberOut(e,2,'Одним махом!');bossParried(e,h);};
  KB.pickSig=(e,h,s)=>pickSig(e,h,s);
  const kosTop=()=>KS.g.position.clone().add(new V3(0,4.3,0));
  /* ---------- общие ---------- */
  const inArena=(p,m)=>{const dx=p.x-C.x,dz=p.z-C.z,d=Math.hypot(dx,dz),r=R-(m||1.2);if(d>r){p.x=C.x+dx/d*r;p.z=C.z+dz/d*r;}return p;};
  function k5force(pi,kind){const p=players[pi];const i=p.heroes.findIndex(h=>h.kind===kind);if(i<0||p.act===i)return;p.act=i;p.heroes.forEach((h,k)=>{h.active=k===i;h.following=false;});}
  function k5Kill(e){if(!e)return;e.alive=false;k5Del(e.g);const i=W.enemies.indexOf(e);if(i>=0)W.enemies.splice(i,1);const j=K5.adds.indexOf(e);if(j>=0)K5.adds.splice(j,1);}
  function clearAdds(all){for(const e of K5.adds.slice())k5Kill(e);K5.adds.length=0;for(const o of K5.orbs)k5Del(o.g);K5.orbs.length=0;for(const z of (K5.zones||[]))z.userData.dead=true;
    for(const pi in K5.locks)unlock(K5.locks[pi],null,true);K5.locks={};if(K5.spark){k5Del(K5.spark.m);K5.spark=null;}RG.on=false;ringM.forEach(m=>{m.visible=false;});if(all){for(const c of candles)c.state='k5out';}}
  function heroesHome(n){const P=[[-2.6,-5.2],[2.6,-5.2]];HEROES.forEach(h=>{const pi=h.player,[x,z]=P[pi];const off=h.active?0:1.4;placeOnGround(h,x+(pi?off:-off),z+(h.active?0:0.8),0);h.face=Math.PI;h.vel.set(0,0,0);});
    for(const pi of[0,1]){const p=players[pi];p.petals=3;p.downed=false;p.downT=0;p.revT=0;p.spirit=1;p.cp=new V3(P[pi][0],0,P[pi][1]);}snapCams();}
  function liveBoss(on,fly){K5.live=on;KB.g.visible=on;if(on){KB.state=fly?'k5cast':'idle';KB.t=0;KB.cd=1.4;KB.tgt=null;KB.dazeT=0;KB._b=false;KB.pos.copy(KS.g.position);}else{KB.state='k5off';}}
  function bossCfg(emb,sig,sp){KB.maxEmb=KB.embers=Math.max(3,emb);KB.signals=sig;KB.def=Object.assign({},FOE.k5kos,{sp});}
  // золотые звенья из отбитых цепей летят к дубу (как раньше)
  function linkToOak(from,mult){const n=mult||1;for(let j=0;j<n;j++){const m=new THREE.Mesh(new THREE.TorusGeometry(0.16,0.05,6,12),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.8}));W.group.add(m);const f=from.clone().add(new V3(rand(-0.3,0.3),1.2,0)),to=OAK.clone().add(new V3(0,1+coilLinks.length*0.16,3));
    anim(0.9+j*0.1,k=>{m.position.lerpVectors(f,to,k);m.position.y+=Math.sin(k*Math.PI)*3;m.rotation.x+=0.3;if(k>=1){W.group.remove(m);addCoilLink();F.links++;SFX.link();}});}}
  /* ---------- цепи из земли: выходят рядом с героем, бьют, уходят под землю и выходят в другом месте ---------- */
  function chainPos(pi){const h=active(pi);let p=new V3();for(let t=0;t<10;t++){const a=rand(0,6.28),r=rand(3.2,4.4);p.set(h.pos.x+Math.cos(a)*r,0,h.pos.z+Math.sin(a)*r);if(hd(p,C)<R-1.2&&hd(p,KP)>4&&!candles.some(c=>hd(c.pos,p)<1.6))break;}return inArena(p,1.4);}
  function chainMake(pi){const p=chainPos(pi);const e=makeFoe('cep',p.x,p.z,{pi,leash:1});e.k5=true;e.noMove=true;e.noKill=true;e.life=0;e.k5chain=true;K5.adds.push(e);burst(new V3(p.x,0.4,p.z),0x6a5a4a,12,3);SFX.crash();
    e.k5parryPost=(e,h)=>{linkToOak(e.pos,1);};e.onFinisher=h=>{linkToOak(e.pos,2);chainSink(e);};e.tick=(e,dt)=>chainTick(e,dt);return e;}
  function chainSink(e){if(e.state==='k5sink'||e.state==='k5hide')return;e.state='k5sink';e.k5k=0;burst(e.pos.clone().add(new V3(0,0.3,0)),0x6a5a4a,8,2);}
  function chainTick(e,dt){if(e.state==='k5sink'){e.k5k+=dt;e.g.position.y=-e.k5k*2.8;if(e.k5k>0.6){e.state='k5hide';e.g.visible=false;e.k5wait=rand(2.2,3.6);}return;}
    if(e.state==='k5hide'){if(!K5.fight||K5.st!==1)return;e.k5wait-=dt;if(e.k5wait<=0){const p=chainPos(e.pi);e.pos.set(p.x,0,p.z);e.home.set(p.x,0,p.z);e.g.visible=true;e.state='spawn';e.t=0;e.life=0;e.embers=e.maxEmb;burst(new V3(p.x,0.4,p.z),0x6a5a4a,12,3);SFX.crash();}return;}
    if(e.state==='idle'||e.state==='recover'){e.life+=dt;if(e.life>9||(!K5.fight&&e.state==='idle'))chainSink(e);}}
  /* ---------- этап 1: чёрные свечи и купол ---------- */
  const CAND=[[-7.6,-7.4],[7.6,-7.4],[-7.2,-18.2],[7.2,-18.2]];const candles=[];
  const relight=()=>(G.solo?24:12)+3*K5.fails[1];   // одному герою — время обежать все четыре
  function candleMake(i){const [x,z]=CAND[i];const e=makeFoe('k5candle',x,z,{leash:0.4});e.k5=true;e.noMove=true;e.noKill=true;e.lit=true;e.idx=i;e.state='idle';e.pos.y=0;e.embers=3;
    e.k5hit=(e,h)=>{if(!e.lit||K5.st!==1||!K5.fight)return;e.embers--;e.flashT=0.15;FX.sparks(e.pos.clone().add(new V3(0,1.6,0)),8,0xc090ff);SFX.clink();if(e.embers<=0)candleOff(e,'погасла!');else floatText(e.pos.clone().add(new V3(0,2.4,0)),'ещё '+e.embers,'#e0c8ff');};
    e.onReflect=()=>{if(e.lit&&K5.st===1)candleOff(e,'капля вернулась!');};
    W.waterTargets.push({pos:e.pos,pri:0.9,active:()=>K5.st===1&&K5.fight&&e.lit,onWater:()=>{candleOff(e,'пш-ш-ш!');if(!K5.said.w){K5.said.w=true;bark(T.yosha,'yosha','Я их водичкой! Пш-ш-ш!',2.4);}}});
    candles.push(e);return e;}
  CAND.forEach((c,i)=>candleMake(i));
  function candleSet(e,on){e.lit=on;e.L.flame.visible=on;e.embers=on?5:0;e.maxEmb=5;e.state=on?'idle':'k5out';e.cd=rand(1.5,3);if(!on)e.relT=relight();}
  function candleOff(e,txt){if(!e.lit)return;candleSet(e,false);k5s('candleOff');FX.dust(e.pos.clone().add(new V3(0,1.7,0)),10,0x4a3a5a);floatText(e.pos.clone().add(new V3(0,2.5,0)),'Свеча '+txt,'#e0c8ff');K5.log.push('candle'+e.idx);
    if(K5.fight&&K5.st===1&&candles.every(c=>!c.lit))later(0.4,()=>{if(K5.st===1&&K5.fight)stageWin(1);});}
  function candleOn(e){candleSet(e,true);k5s('candleOn');FX.sparkle(e.pos.clone().add(new V3(0,1.8,0)),10,0xb070ff);if(G.time>(K5.gorT||0)){K5.gorT=G.time+14;bark(KS,'koschei','Горите!',1.4);}}
  candles.forEach(c=>candleSet(c,false));   // до начала боя свечи не горят (зажигает Кощей в конце вступления)
  function stage1Tick(dt){for(const c of candles){if(c.lit){c.L.flame.scale.set(1+0.12*Math.sin(G.time*13+c.idx),1+0.2*Math.sin(G.time*9+c.idx*2),1);}else{c.relT-=dt;if(c.relT<=0)candleOn(c);}}
    // цепи: у каждого игрока своя (в одиночном — одна)
    const want=G.solo?[G.soloPi]:[0,1];for(const pi of want){const mine=K5.adds.filter(e=>e.k5chain&&e.pi===pi);if(!mine.length){K5['cs'+pi]=(K5['cs'+pi]||1.5)-dt;if(K5['cs'+pi]<=0){K5['cs'+pi]=3;chainMake(pi);}}}
    // перст Кощея: молния в красный круг
    K5.castT=(K5.castT==null?4:K5.castT)-dt;if(K5.castT<=0){K5.castT=(G.solo?8:6.5)+K5.fails[1];const hs=k5Heroes();if(hs.length){const h=hs[Math.floor(rand(0,hs.length))];const p=inArena(h.pos.clone(),0.8);
      anim(0.5,k=>{KS.armR.rotation.x=-2.4*Math.sin(k*Math.PI);});k5s('cast');k5Zone(p,1.6,G.solo?1.6:1.35,0xff4a5a,q=>{if(!K5.fight)return;k5Beam(q,0xd8b0ff);k5s('strike');shakeAll(0.05,0.25);FX.dust(q.clone(),12,0x6a5a7a);for(const x of k5Heroes())if(hd(x.pos,q)<1.7)k5Hurt(x,q);});}}
    dome.children[0].material.opacity=0.18+0.06*Math.sin(G.time*3);dome.rotation.y+=dt*0.2;}
  /* ---------- этап 2: ключи, замки, искорка ---------- */
  function keyMake(h){const p=KS.g.position.clone();const e=makeFoe('k5key',p.x,p.z,{pi:h.player,leash:60});e.k5=true;e.noMove=true;e.state='k5fly';e.pos.y=3;e.k5tries=0;K5.adds.push(e);k5s('keyFly');
    e.k5parry=(e,h)=>{keyBreak(e,h);return true;};e.k5hitHero=(e,h)=>{lockHero(h);k5Kill(e);return true;};e.tick=(e,dt)=>keyTick(e,dt);return e;}
  function keyBreak(e,h){G.stats.parries++;SFX.parry();k5s('keyBreak');FX.sparks(e.pos.clone().add(new V3(0,1.2,0)),14,0xd0b0ff);floatText(e.pos.clone().add(new V3(0,2,0)),'Ключ рассыпался!','#e0c8ff');K5.log.push('keybreak');if(h&&FIN.guard)FIN.guard.hit(h,true);k5Kill(e);}
  function keyTick(e,dt){const h=active(e.pi);if(!h||players[e.pi].downed||K5.locks[e.pi]){e.state='k5fly';e.pi=1-e.pi;if(G.solo)e.pi=G.soloPi;}
    const L=e.L;L.body.rotation.y+=dt*3;L.body.children.forEach(()=>{});L.gem.scale.setScalar(1+0.25*Math.sin(G.time*12));
    const tg=active(e.pi);if(!tg)return;const dx=tg.pos.x-e.pos.x,dz=tg.pos.z-e.pos.z,d=Math.hypot(dx,dz)||1;
    if(e.state==='k5fly'){const sp=4.4*dt;e.pos.x+=dx/d*Math.min(sp,Math.max(0,d-1.3));e.pos.z+=dz/d*Math.min(sp,Math.max(0,d-1.3));e.pos.y=damp(e.pos.y,0.2,3,dt);if(d<1.8){e.state='idle';e.cd=0.2;e.t=0;}}
    else if(e.state==='k5back'){e.pos.x-=dx/d*3.5*dt;e.pos.z-=dz/d*3.5*dt;e.pos.y=damp(e.pos.y,1.4,3,dt);e.k5k-=dt;if(e.k5k<=0){e.state='k5fly';e.k5tries++;if(e.k5tries>=3){keyBreak(e,null);}}}
    else{if(d>1.6){e.pos.x+=dx/d*2.5*dt;e.pos.z+=dz/d*2.5*dt;}e.pos.y=damp(e.pos.y,0.2,4,dt);if(e.state==='recover'&&e.t>0.1){e.state='k5back';e.k5k=0.8;}}
    e.face=Math.atan2(dx,dz);}
  function lockHero(h){const pi=h.player;if(K5.locks[pi])return;const g=k5Prop(new THREE.Group());
    fk(g,K=>{K.box(0.5,0.42,0.18,hp(0x3a3640),tm(0,0,0),{b:0.04});K.add(new FIN.orig.Torus(0.17,0.05,5,12,Math.PI),hp(0x5a5660),tm(0,0.2,0));});const kh=new THREE.Mesh(new THREE.SphereGeometry(0.07,8,6),MB(0xc080ff));kh.position.set(0,-0.02,0.1);g.add(kh);
    const rings=[];for(let i=0;i<3;i++){const r=new THREE.Mesh(new THREE.TorusGeometry(0.7,0.05,5,18),MB(0x6a5a8a,{transparent:true,opacity:0.9}));r.rotation.x=Math.PI/2;g.add(r);rings.push(r);}
    K5.locks[pi]={h,pi,hp:G.solo?2:3,t:0,g,rings};k5s('lock');floatText(h.pos.clone().add(new V3(0,h.d.height+0.8,0)),'Заперт!','#c8a8ff');K5.log.push('lock'+pi);h.guard=false;
    if(!K5.said.lock){K5.said.lock=true;say('zven','Друга заперли — бей по замку, открывай!',3,true);}}
  function unlock(L,by,quiet){if(!L)return;k5Del(L.g);delete K5.locks[L.pi];if(quiet)return;k5s('unlock');FX.sparks(L.h.pos.clone().add(new V3(0,1.2,0)),12,0xffe08a);floatText(L.h.pos.clone().add(new V3(0,L.h.d.height+0.8,0)),by?'Открыли!':'Вырвался!','#ffe08a');L.h.iT=Math.max(L.h.iT,1);K5.log.push('unlock'+L.pi);}
  function locksTick(dt){for(const k in K5.locks){const L=K5.locks[k],h=L.h;if(!h.active||players[L.pi].downed){unlock(L,null,true);continue;}
      h.vel.x=0;h.vel.z=0;h.knockT=Math.max(h.knockT,0.12);h.iT=Math.max(h.iT,0.15);h.guard=false;L.t+=dt;L.g.position.set(h.pos.x,h.pos.y+h.d.height*0.55,h.pos.z);L.g.children[0].rotation.y=Math.sin(G.time*2)*0.3;
      L.rings.forEach((r,i)=>{r.position.y=-h.d.height*0.4+i*0.35;r.rotation.z+=dt*(i%2?2:-2);});
      if(L.t>(G.solo?3.5:7))unlock(L,null);}
    if(Object.keys(K5.locks).length&&K5.live&&KB.state!=='broken'){K5.regen=(K5.regen||0)+dt;if(K5.regen>2.5){K5.regen=0;if(KB.embers<KB.maxEmb){KB.embers++;floatText(kosTop(),'Кощей копит силы','#c8a8ff');}}}}
  function sparkTo(pi,from){const h=active(pi);if(!h)return;if(K5.spark)k5Del(K5.spark.m);const m=k5Prop(new THREE.Group());const s=new THREE.Mesh(new THREE.OctahedronGeometry(0.22),MB(0xfff2a0));m.add(s);
    m.add(new THREE.Mesh(new THREE.SphereGeometry(0.45,10,8),MB(0xffd76a,{transparent:true,opacity:0.3,depthWrite:false})));m.position.copy(from||h.pos).add(new V3(0,1.4,0));K5.spark={pi,t:4.5,m,fly:0};
    if(!K5.said.spark){K5.said.spark=true;say('zven','Отбил — искорка летит к другу! Отбивайте по очереди!',4.2,true);}}
  function sparkTick(dt){const S=K5.spark;if(!S)return;S.t-=dt;const h=active(S.pi);if(!h||S.t<=0){k5Del(S.m);K5.spark=null;return;}const to=headOf(h).add(new V3(0,0.2+0.1*Math.sin(G.time*6),0));S.m.position.lerp(to,1-Math.exp(-10*dt));S.m.rotation.y+=dt*5;S.m.scale.setScalar(S.t<1?S.t:1);}
  /* ---------- этап 3: шары, вороны, иглы, воронка, гроза ---------- */
  function orbThrow(h){const o={g:k5OrbMesh(0.42),tgt:h,v:(G.solo?4.6:5.3)-0.3*K5.fails[3],st:'in',left:null,t:0,eta:9};o.p=o.g.position;o.p.copy(KB.pos).add(new V3(0,3.6,0));K5.orbs.push(o);k5s('orb');
    anim(0.6,k=>{KS.armR.rotation.x=-2.6*Math.sin(k*Math.PI);});return o;}
  function orbTick(dt){const T0=timingOf;for(let i=K5.orbs.length-1;i>=0;i--){const o=K5.orbs[i];o.t+=dt;
    const to=o.st==='up'?KB.pos.clone().add(new V3(0,3.4,0)):o.tgt.pos.clone().add(new V3(0,heroHeight(o.tgt)*0.6,0));const dv=to.clone().sub(o.p),d=dv.length();o.eta=d/o.v;
    o.p.addScaledVector(dv.normalize(),Math.min(d,o.v*dt));o.g.rotation.y+=dt*4;o.g.children[1].scale.setScalar(1+0.12*Math.sin(G.time*14));if(Math.random()<0.25)FX.sparkle(o.p.clone(),1,o.st==='in'?0xb070ff:0xffe08a);
    if(o.st!=='in')o.g.children[0].material.color.setHex(0xd0a030);
    if(o.t>9){k5Del(o.g);K5.orbs.splice(i,1);continue;}
    if(d>0.7)continue;
    if(o.st==='up'){k5Del(o.g);K5.orbs.splice(i,1);if(K5.live&&KB.state!=='broken'){emberOut(KB,G.solo?1:2,'Шар вернулся!');k5s('orbHit');FX.stars(KB.pos.clone().add(new V3(0,3.4,0)),12,0xffe08a);K5.dip=1.6;K5.log.push('orbhit');}continue;}
    const h=o.tgt,pi=h.player,T=T0(pi);if(players[pi].downed||!h.active){k5Del(o.g);K5.orbs.splice(i,1);continue;}
    if(o.left!==null&&o.left<=T.parry+0.08){SFX.parry();G.stats.parries++;if(FIN.guard)FIN.guard.hit(h,true);const part=active(1-pi);
      if(o.st==='in'&&!G.solo&&part&&part.active&&!players[1-pi].downed){o.st='pass';o.tgt=part;o.v=6.2;o.left=null;o.t=0;k5s('orbPass');floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Другу!','#ffe08a');K5.log.push('orbpass');}
      else{o.st='up';o.v=13;o.t=0;floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'В небо!','#ffe08a');K5.log.push('orbup');}continue;}
    k5Del(o.g);K5.orbs.splice(i,1);FX.sparkle(o.p.clone(),8,0xb070ff);
    if(h.guard){shieldBlock(h);floatText(h.pos.clone().add(new V3(0,h.d.height+1,0)),'в последний миг — отобьёшь!','#e0c8ff');continue;}
    damageHero(h,{kind:'enemy',ref:{pos:o.p.clone()}});if(!K5.said.orbTip){K5.said.orbTip=true;tip(pi,'Тёмный шар — нажми щит '+K(pi,'guard')+' в самый последний миг: он полетит к другу!',3);}}}
  function ravenMake(){const hs=k5Heroes();if(!hs.length)return null;const a=rand(0,6.28);const x=C.x+Math.cos(a)*9,z=C.z+Math.sin(a)*9;const pi=G.solo?G.soloPi:hs[Math.floor(rand(0,hs.length))].player;
    const e=makeFoe('k5raven',x,z,{pi,leash:60});e.k5=true;e.noMove=true;e.state='idle';e.pos.y=4;e.cd=rand(2.5,4.5);e.k5a=a;e.home=C.clone();e.tick=(e,dt)=>ravenTick(e,dt);K5.adds.push(e);k5s('raven');return e;}
  function ravenTick(e,dt){const L=e.L;const fl=e.state==='recover'&&e.dazeT>0||e.state==='broken'?0.1:1;L.wings.forEach(w=>{w.g.rotation.z=w.s*Math.sin(G.time*(e.pos.y>2?9:16))*0.7*fl;});
    if(players[e.pi].downed)e.pi=1-e.pi;if(G.solo)e.pi=G.soloPi;const h=active(e.pi);if(!h)return;const dx=h.pos.x-e.pos.x,dz=h.pos.z-e.pos.z,d=Math.hypot(dx,dz)||1;
    if(e.state==='idle'){if(e.cd>1.0||!K5.fight){e.k5a+=dt*0.7;const tx=C.x+Math.cos(e.k5a)*7,tz=C.z+Math.sin(e.k5a)*6;e.pos.x=damp(e.pos.x,tx,2,dt);e.pos.z=damp(e.pos.z,tz,2,dt);e.pos.y=damp(e.pos.y,3.8,2,dt);e.face=Math.atan2(tx-e.pos.x,tz-e.pos.z);return;}
      if(d>1.4){const s=Math.min(d-1.4,8*dt);e.pos.x+=dx/d*s;e.pos.z+=dz/d*s;}e.pos.y=damp(e.pos.y,0.9,5,dt);if(e.cd<0.95&&!e.k5cw){e.k5cw=true;k5s('raven');}}
    else if(e.state==='ready'||e.state==='wind'||e.state==='strike'){e.pos.y=damp(e.pos.y,0.9,5,dt);}
    else if(e.state==='recover'||e.state==='stagger'){if(e.dazeT>0)e.pos.y=damp(e.pos.y,0.25,8,dt);else{e.pos.y=damp(e.pos.y,4,2,dt);if(e.pos.y>3.2&&e.state==='recover'){e.state='idle';e.cd=rand(2.5,4.5);e.k5cw=false;}}}
    else if(e.state==='broken')e.pos.y=damp(e.pos.y,0.25,8,dt);
    if(e.state!=='idle'||e.cd<=1)e.face=Math.atan2(dx,dz);}
  function needleRain(n,around){k5s('needles');const hs=k5Heroes();for(let i=0;i<n;i++){const h=around?null:hs[i%Math.max(1,hs.length)];const base=around||(h?h.pos:C);const p=inArena(base.clone().add(new V3(rand(-2.4,2.4),0,rand(-2.4,2.4))),0.8);
    later(i*0.16,()=>{if(!K5.fight)return;k5Zone(p,1.3,1.55,0xff4a5a,q=>{if(!K5.fight)return;needleFall(q);for(const x of k5Heroes())if(hd(x.pos,q)<1.45)k5Hurt(x,q);});});}}
  function needleFall(q){for(let j=0;j<4;j++){const m=k5Prop(new THREE.Mesh(new THREE.ConeGeometry(0.06,0.9,5),MB(0xd8d0f0)));m.rotation.x=Math.PI;const o=new V3(q.x+rand(-0.8,0.8),10,q.z+rand(-0.8,0.8));m.position.copy(o);
    k5fx(0.28+j*0.04,k=>{m.position.y=lerp(10,0.4,k*k);},()=>{FX.sparks(new V3(o.x,0.3,o.z),4,0xd8d0f0);later(0.6,()=>k5Del(m));});}k5s('strike');}
  function vortex(){const hs=k5Heroes();if(!hs.length)return;const c=inArena(hs[Math.floor(rand(0,hs.length))].pos.clone().add(new V3(rand(-2,2),0,rand(-2,2))),2);k5s('vortex');K5.log.push('vortex');
    const g=k5Prop(new THREE.Group());g.position.set(c.x,0.05,c.z);for(let i=0;i<3;i++){const m=new THREE.Mesh(new THREE.TorusGeometry(1.2+i*1.3,0.09,5,28),MB(0x7a4ad0,{transparent:true,opacity:0.65}));m.rotation.x=-Math.PI/2;m.position.y=0.1+i*0.25;g.add(m);}
    for(let i=0;i<6;i++){const m=new THREE.Mesh(new THREE.TorusGeometry(0.35+i*0.28,0.05,4,20),MB(0x4a3a80,{transparent:true,opacity:0.55,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.y=0.6+i*0.55;g.add(m);}   // вихрь из колец
    k5fx(3.4,(k,dt)=>{g.rotation.y+=dt*4;g.children.forEach((m,i)=>{if(i<3)m.scale.setScalar(1-0.35*((G.time*1.4+i*0.33)%1));else{m.position.x=Math.sin(G.time*5+i)*0.25*(i-2);m.material.opacity=0.55*Math.sin(k*Math.PI);}});if(!K5.fight)return;
      for(const h of k5Heroes()){const dx=c.x-h.pos.x,dz=c.z-h.pos.z,d=Math.hypot(dx,dz);if(d<5.5&&d>0.25&&h.rollT<=0){const f=(1-d/5.5)*4.8*dt;h.pos.x+=dx/d*f;h.pos.z+=dz/d*f;}if(d<0.9&&G.time>(h._vxT||0)){h._vxT=G.time+1.2;k5Hurt(h,c);}}},()=>k5Del(g));}
  function stage3Tick(dt){// полёт по кругу над поляной
    if(KB.state==='k5cast'||KB.state==='k5rise'){K5.ang=(K5.ang||0)+dt*0.28;const tx=C.x+Math.sin(K5.ang)*6,tz=C.z+Math.cos(K5.ang)*4.5;KB.pos.x=damp(KB.pos.x,tx,1.6,dt);KB.pos.z=damp(KB.pos.z,tz,1.6,dt);
      K5.dip=Math.max(0,(K5.dip||0)-dt);KB.pos.y=damp(KB.pos.y,5.4-(K5.dip>0?1.3:0)+0.3*Math.sin(G.time*1.3),KB.state==='k5rise'?1.5:3,dt);if(KB.state==='k5rise'&&KB.pos.y>4.8)KB.state='k5cast';
      const hs=k5Heroes();if(hs.length){const m=hs.reduce((a,h)=>a.add(h.pos),new V3()).multiplyScalar(1/hs.length);KB.face=Math.atan2(m.x-KB.pos.x,m.z-KB.pos.z);}
      K5.orbT=(K5.orbT==null?2.5:K5.orbT)-dt;if(K5.orbT<=0&&!K5.orbs.length&&KB.state==='k5cast'){K5.orbT=G.solo?5.2:4.2;const tg=G.solo?active(G.soloPi):active(K5.orbN=(K5.orbN||0)^1);if(tg&&!players[tg.player].downed)orbThrow(tg);else{const o=active(1-tg.player);if(o)orbThrow(o);}}
      K5.rainT=(K5.rainT==null?6:K5.rainT)-dt;if(K5.rainT<=0){K5.rainT=9.5+K5.fails[3];needleRain(G.solo?3:5);anim(0.7,k=>{KS.armR.rotation.x=-2.8*Math.sin(k*Math.PI);});}
      K5.vxT=(K5.vxT==null?12:K5.vxT)-dt;if(K5.vxT<=0){K5.vxT=16;vortex();}}
    // спесь сбита в воздухе — падает на землю
    if(KB.state==='broken'&&KB.pos.y>0.3&&!K5.crash){K5.crash=true;KB.state='k5crash';KB.k5k=0;k5s('flyUp');}
    if(KB.state==='k5crash'){KB.k5k+=dt;KB.pos.y=Math.max(0,KB.pos.y-dt*9);if(KB.pos.y<=0){KB.pos.y=0;k5s('land');shakeAll(0.08,0.4);FX.dust(KB.pos.clone(),18,0x8a7a6a);KB.state='broken';KB.t=0;KB._b=false;K5.crash=false;}}
    if(KB.state==='idle'&&K5.live){KB.state='k5rise';KB.embers=Math.max(2,Math.ceil(KB.maxEmb/2));floatText(kosTop(),'Спесь вернулась!','#c8a8ff');k5s('flyUp');}
    const want=(G.solo?2:3);if(K5.adds.filter(e=>e.kind==='k5raven').length<want){K5.rvT=(K5.rvT==null?1:K5.rvT)-dt;if(K5.rvT<=0){K5.rvT=5;ravenMake();if(!K5.said.rav){K5.said.rav=true;bark(KS,'koschei','Вороны, ко мне!',1.7);}}}}
  // гроза: небо, туман и свет темнеют плавно (релизный рендер берёт небо из фона и тумана)
  const STORM={bg:scene.background?scene.background.clone():new THREE.Color(0x8aa0c8),fog:scene.fog?scene.fog.color.clone():null,amb:amb.intensity,sun:sun.intensity,sunC:sun.color.clone(),ambC:amb.color.clone()};
  window.k5StormSet=(v,now)=>{K5.stormTo=v;if(now)K5.storm=v;};
  let vig=document.getElementById('k5storm');if(!vig){vig=document.createElement('div');vig.id='k5storm';vig.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:3;opacity:0;background:radial-gradient(ellipse at 50% 45%,rgba(40,20,70,0) 45%,rgba(40,20,70,.55) 100%),linear-gradient(rgba(60,40,110,.18),rgba(30,20,60,.18))';document.body.appendChild(vig);}
  function stormTick(dt){K5.storm=damp(K5.storm,K5.stormTo,0.8,dt);const k=K5.storm;vig.style.opacity=(G.state==='play'&&!FIN.titleOn?k:0).toFixed(3);clouds.visible=k>0.05;clouds.rotation.y+=dt*0.03;clouds.children.forEach(c=>{c.material.opacity=0.85*k;});
    const dark=new THREE.Color(0x2a2440);if(scene.background&&scene.background.isColor)scene.background.copy(STORM.bg).lerp(dark,k*0.8);if(scene.fog&&STORM.fog)scene.fog.color.copy(STORM.fog).lerp(dark,k*0.75);
    amb.intensity=STORM.amb*(1-0.45*k);sun.intensity=STORM.sun*(1-0.65*k);sun.color.copy(STORM.sunC).lerp(new THREE.Color(0xb8a8ff),k*0.5);
    if(k>0.5&&!G.cine){K5.thT=(K5.thT==null?5:K5.thT)-dt;if(K5.thT<=0){K5.thT=rand(6,11);const f=$('flash');if(f){f.style.transition='opacity .08s';f.style.opacity=0.35;setTimeout(()=>{f.style.transition='opacity .5s';f.style.opacity=0;},90);}k5s('thunder');}}}
  /* ---------- этап 4: меч, серии, прыжок с волной, око, костяные щитники ---------- */
  const COMBOS=[['yellow','yellow','red'],['yellow','delay'],['red','yellow'],['yellow','red','yellow'],['delay','red']];
  function pickSig(e,h,s){if(K5.st===4||K5.st===5){if(!K5.combo||!K5.combo.length){K5.combo=COMBOS[Math.floor(rand(0,K5.st===5?3:COMBOS.length))].slice();}const x=K5.combo.shift();if(x==='delay'){K5.delayNext=true;return 'yellow';}return x;}return s;}
  const eye=k5Prop(new THREE.Group());{const w=new THREE.Mesh(new THREE.SphereGeometry(0.26,12,8),MB(0xf4e8ff));w.scale.set(1.4,0.8,0.4);eye.add(w);const ir=new THREE.Mesh(new THREE.SphereGeometry(0.15,10,8),MB(0x8a3ad0));ir.position.z=0.08;eye.add(ir);
    const pu=new THREE.Mesh(new THREE.SphereGeometry(0.07,8,6),MB(0x1a0a2a));pu.position.z=0.15;eye.add(pu);}eye.visible=false;
  function leap(){const tg=active(K5.mark);if(!tg)return;KB.state='k5leap';KB.k5k=0;const from=KB.pos.clone(),to=inArena(tg.pos.clone(),1);K5.leapTo=to;K5.leapFrom=from;k5s('cast');K5.log.push('leap');
    k5Zone(to,1.9,1.35,0xff4a5a,null);}
  function leapTick(dt){KB.k5k+=dt;const k=KB.k5k,f=K5.leapFrom,t=K5.leapTo;if(k<0.25){KS.armR.rotation.x=-2.6*(k/0.25);return;}const u=Math.min(1,(k-0.25)/1.1);KB.pos.x=lerp(f.x,t.x,u);KB.pos.z=lerp(f.z,t.z,u);KB.pos.y=Math.sin(u*Math.PI)*4.5;KB.face=Math.atan2(t.x-f.x,t.z-f.z);
    if(u>=1){KB.pos.y=0;k5s('land');k5s('shock');shakeAll(0.09,0.45);FX.dust(KB.pos.clone(),22,0x8a7a6a);for(const h of k5Heroes())if(hd(h.pos,t)<1.9)k5Hurt(h,t);shockwave(t.clone());KB.state='recover';KB.t=-0.6;KB.dazeT=1.6;KS.armR.rotation.x=0.9;
      floatText(kosTop(),'Открыт!','#ffe36b');}}
  function shockwave(c){const m=k5Prop(new THREE.Mesh(new THREE.RingGeometry(0.8,1,48),MB(0xc090ff,{transparent:true,opacity:0.9,side:THREE.DoubleSide,depthWrite:false})));m.rotation.x=-Math.PI/2;m.position.set(c.x,0.12,c.z);const hitSet=new Set();
    k5fx(1.1,k=>{const r=0.6+k*7.5;m.scale.setScalar(r);m.material.opacity=0.9*(1-k*0.7);if(!K5.fight)return;for(const h of k5Heroes()){const d=hd(h.pos,c);if(Math.abs(d-r)<0.55&&h.pos.y<0.35&&!hitSet.has(h)){hitSet.add(h);if(h.rollT>0){floatText(h.pos.clone().add(new V3(0,2,0)),'Увернулся!','#9fe0ff');}else k5Hurt(h,c);}}},()=>k5Del(m));}
  function boneMake(x,z){const e=makeFoe('k5bone',x,z,{leash:30});e.k5=true;e.sideOpen=true;e.state='spawn';K5.adds.push(e);burst(new V3(x,0.4,z),0xe8e0c8,14,3);SFX.crash();return e;}
  function stage4Tick(dt){if(KB.state==='k5leap'){leapTick(dt);return;}
    if(!G.solo&&players[K5.mark].downed)K5.mark=1-K5.mark;KB.pi=G.solo?G.soloPi:K5.mark;
    const mh=active(KB.pi);if(mh){eye.visible=true;eye.position.copy(headOf(mh)).add(new V3(0,0.35+0.08*Math.sin(G.time*5),0));eye.lookAt(camS.position);}
    if(KB.state==='wind'&&K5.delayNext&&KB.t<0.05){K5.delayNext=false;KB.wdur*=1.85;floatText(kosTop(),'…','#e0c8ff');}
    if(KB.state==='recover'&&KB.t>0.12&&KB.tgt&&K5.combo&&K5.combo.length){foeWind(KB);}
    else if(KB.state==='recover'&&KB.t>0.1&&(!K5.combo||!K5.combo.length)&&!KB._sw){KB._sw=true;if(!G.solo)K5.mark=1-K5.mark;}
    if(KB.state!=='recover')KB._sw=false;
    K5.leapT=(K5.leapT==null?9:K5.leapT)-dt;if(K5.leapT<=0&&KB.state==='idle'){K5.leapT=rand(10,13)+K5.fails[4];leap();}
    if(!K5.bones&&KB.embers<=Math.ceil(KB.maxEmb/2)){K5.bones=true;bark(KS,'koschei','Кости, встаньте!',1.6);k5s('cast');boneMake(C.x-6.5,C.z+1.5);if(!G.solo)boneMake(C.x+6.5,C.z+1.5);}}
  /* ---------- этап 5: игла, наковальня, кольцо цепей ---------- */
  const ANV=new V3(3.6,0,-22.2);
  const ringM=[0,1].map(pi=>{const m=new THREE.Mesh(new THREE.TorusGeometry(1,0.08,6,32),MB(COL.gold,{transparent:true,opacity:0.95}));m.rotation.x=Math.PI/2;m.visible=false;W.group.add(m);return m;});
  const RG={on:false,t:0,press:[null,null],tries:0};
  const fring=k5Prop(new THREE.Mesh(new THREE.TorusGeometry(1,0.06,6,28),MB(COL.gold,{transparent:true,opacity:0.9})));fring.rotation.x=Math.PI/2;fring.visible=false;
  function ringStart(){RG.on=true;RG.t=-2.4;RG.press=[null,null];KB.state='k5cast';bark(KS,'koschei','Все цепи острова — ко мне!',2.8);k5s('ult');later(2.6,()=>{if(RG.on)say('zven','Кольцо! Щиты — вместе, в такт!',3.4,true);});K5.log.push('ring');}
  function ringTick(dt){if(!RG.on)return;RG.t+=dt;if(RG.t<0){KB.pos.y=damp(KB.pos.y,3.2,2,dt);KS.armR.rotation.x=-2.8;return;}const u=clamp(1-RG.t/1.4,0,1);
    for(const pi of[0,1]){const h=active(pi),m=ringM[pi];m.visible=!players[pi].downed;m.position.set(h.pos.x,h.pos.y+h.d.height+0.8,h.pos.z);m.scale.setScalar(0.4+u*1.6);m.material.color.setHex(u<0.12?0xffffff:COL.gold);}
    if(RG.t>=1.4+0.35){RG.on=false;ringM.forEach(m=>{m.visible=false;});const win=TIMING[genPath()].parry+0.14;const need=G.solo?[G.soloPi]:[0,1].filter(pi=>!players[pi].downed);const hit=need.map(pi=>RG.press[pi]!==null&&Math.abs(RG.press[pi]-1.4)<=win);
      if(hit.every(x=>x)||RG.tries>=2){SFX.horn();G.stats.shields++;banner(RG.tries>=2&&!hit.every(x=>x)?'Кольцо рассыпалось!':'Богатырский щит!','#ffd76a',2,'Кощей без сил — куй, Прошка!');for(const h of k5Heroes())burst(h.pos.clone().add(new V3(0,1,0)),0xffffff,14,4);RG.tries=0;
        KB.state='broken';KB.t=0;KB._b=false;K5.log.push('ringok');}
      else{RG.tries++;for(const pi of need){const h=active(pi);if(!hit[need.indexOf(pi)]){h.vel.set(-(h.pos.x-KB.pos.x)*0.5,4,-(h.pos.z-KB.pos.z)*0.3);h.grounded=false;h.knockT=0.3;floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'не в такт','#dddddd');}}
        if(K5.forge)K5.forge.n=Math.max(0,K5.forge.n-1);banner('Не вместе — ещё раз','#ffd0d0',1.8,'щиты — оба, когда кружок сожмётся');later(2.2,()=>{if(K5.fight&&K5.st===5)ringStart();});}}}
  function needleHold(h){const N=K5.needle;N.holder=h;N.ground=null;N.t=0;if(ndl.g.parent!==W.group){const w=ndl.g.getWorldPosition(new V3());W.group.add(ndl.g);ndl.g.position.copy(w);}ndl.g.scale.setScalar(1);}
  function needleDrop(h){const N=K5.needle;if(!N||N.holder!==h)return;N.holder=null;N.ground=inArena(h.pos.clone().add(new V3(rand(-1,1),0,rand(-1,1))),1);N.t=0;floatText(h.pos.clone().add(new V3(0,h.d.height+0.8,0)),'Игла упала!','#ffe08a');SFX.clink();K5.log.push('drop');}
  function needlePass(pi){const N=K5.needle,h=active(pi),o=active(1-pi);if(!N||N.holder!==h||!o||players[1-pi].downed||hd(h.pos,o.pos)>13||K5.locks[1-pi]){SFX.miss();return;}
    N.holder=null;N.fly=true;const f=ndl.g.position.clone();SFX.whoosh();anim(0.5,k=>{const t=headOf(o);ndl.g.position.lerpVectors(f,t,k);ndl.g.position.y+=Math.sin(k*Math.PI)*1.6;ndl.g.rotation.z+=0.4;if(k>=1){N.fly=false;needleHold(o);floatText(t,'Поймал!','#ffe08a');}});K5.log.push('pass');}
  function needleTick(dt){const N=K5.needle;if(!N)return;if(G.solo&&N.holder&&N.holder!==active(G.soloPi)&&!players[G.soloPi].downed)needleHold(active(G.soloPi));
    if(N.holder){const h=N.holder;if(players[h.player].downed||!h.active){needleDrop(h);return;}ndl.g.position.copy(headOf(h)).add(new V3(0,0.4+0.08*Math.sin(G.time*4),0));ndl.g.rotation.set(0,G.time*2,Math.PI/2);}
    else if(N.ground){N.t+=dt;ndl.g.position.set(N.ground.x,0.3+0.1*Math.sin(G.time*4),N.ground.z);ndl.g.rotation.set(0,G.time*2,Math.PI/2);if(N.t>0.6)for(const h of k5Heroes())if(hd(h.pos,N.ground)<1.2){needleHold(h);floatText(headOf(h),'Подобрал иглу!','#ffe08a');break;}}}
  const forging=()=>{const N=K5.needle,h=N&&N.holder;return !!(h&&h.kind==='proshka'&&hd(h.pos,ANV)<2.1&&!K5.locks[h.player]&&!RG.on&&!players[h.player].downed);};
  function forgeTick(dt){const Fg=K5.forge;if(!Fg)return;const on=forging();fring.visible=on;if(!on)return;Fg.c+=dt;const FB=0.75,u=Fg.c%FB,k=clamp(1-u/FB,0,1);fring.position.set(ANV.x,1.35,ANV.z);fring.scale.setScalar(lerp(0.3,1.6,k));fring.material.color.setHex((k<0.16||k>0.92)?0xffffff:COL.gold);
    if(Math.floor(Fg.c/FB)!==Fg.b){Fg.b=Math.floor(Fg.c/FB);tone(1760,0.04,'square',0.04);}}
  function forgeHit(h){const Fg=K5.forge;if(!Fg||!forging()||h!==K5.needle.holder)return false;const FB=0.75,u=Fg.c%FB,off=Math.min(u,FB-u);Fg.tries++;const ok=off<=0.2+(W.ladBonus||0);h.atkT=0.3;
    if(ok){Fg.n++;Fg.good++;k5s('forge');SFX.hammer?SFX.hammer():SFX.clink();FX.sparks(ANV.clone().add(new V3(0,1.3,0)),14,0xffe080);floatText(ANV.clone().add(new V3(0,2,0)),'Дзинь! '+Fg.n+' / '+Fg.need,'#ffe08a');K5.log.push('forge'+Fg.n);
      if((Fg.n===4||Fg.n===8)&&Fg.n<Fg.need&&!Fg.rings[Fg.n])later(0.6,()=>{if(K5.fight&&K5.st===5&&!RG.on){Fg.rings[Fg.n]=true;ringStart();}});
      if(Fg.n===6&&!K5.said.k24){K5.said.k24=true;later(0.4,()=>{bark(KS,'koschei','Меня никто не слушал. Никто!',3.1);later(3.3,()=>bark(T.yosha,'yosha','Мы слушаем! Мы тут!',2.4));});}
      if(Fg.n===Fg.need-2&&!K5.said.k26){K5.said.k26=true;bark(T.pelageya,'pelageya','Держись, Прошка, ещё чуть-чуть!',2.8);}
      if(Fg.n>=Fg.need){G.flags.claspQ=Fg.good/Math.max(Fg.need,Fg.tries);later(0.5,()=>{if(K5.fight)stageWin(5);});}}
    else{floatText(ANV.clone().add(new V3(0,1.8,0)),'тук — в такт!','#ffd0a0');SFX.clink();}return true;}
  function stage5Tick(dt){needleTick(dt);forgeTick(dt);ringTick(dt);if(RG.on)return;const N=K5.needle,hold=N&&N.holder;
    // Кощей: кружит над иглой и пикирует на того, у кого она
    if(KB.state==='k5cast'||KB.state==='k5rise'){const tg=hold||active(G.solo?G.soloPi:0);K5.ang=(K5.ang||0)+dt*0.6;const tx=tg.pos.x+Math.sin(K5.ang)*5,tz=tg.pos.z+Math.cos(K5.ang)*4;const p=inArena(new V3(tx,0,tz),1);
      KB.pos.x=damp(KB.pos.x,p.x,1.8,dt);KB.pos.z=damp(KB.pos.z,p.z,1.8,dt);KB.pos.y=damp(KB.pos.y,3.2+0.3*Math.sin(G.time*1.4),2,dt);if(KB.state==='k5rise'&&KB.pos.y>2.6)KB.state='k5cast';KB.face=Math.atan2(tg.pos.x-KB.pos.x,tg.pos.z-KB.pos.z);
      K5.diveT=(K5.diveT==null?2.5:K5.diveT)-dt*(forging()&&G.solo?0.6:1);if(K5.diveT<=0&&KB.state==='k5cast'){K5.diveT=(G.solo?5:3.6)+K5.fails[5]*0.5;KB.state='k5dive';KB.k5tg=tg;if(!K5.said.k23){K5.said.k23=true;bark(KS,'koschei','Отдай иглу!',1.4);}}}
    if(KB.state==='k5dive'){const tg=KB.k5tg;const dx=tg.pos.x-KB.pos.x,dz=tg.pos.z-KB.pos.z,d=Math.hypot(dx,dz)||1;const s=Math.min(Math.max(0,d-2),10*dt);KB.pos.x+=dx/d*s;KB.pos.z+=dz/d*s;KB.pos.y=Math.max(0,KB.pos.y-dt*6);KB.face=Math.atan2(dx,dz);
      if(d<2.4&&KB.pos.y<0.3){KB.pos.y=0;KB.state='ready';KB.t=0;KB.tgt=tg;KB.pi=tg.player;}}
    if(KB.state==='idle'&&K5.live){KB.state='k5rise';k5s('flyUp');}
    if(KB.state==='broken'&&KB.pos.y>0.3&&!K5.crash){K5.crash=true;KB.state='k5crash';}
    if(KB.state==='k5crash'){KB.pos.y=Math.max(0,KB.pos.y-dt*9);if(KB.pos.y<=0){k5s('land');shakeAll(0.07,0.35);FX.dust(KB.pos.clone(),16,0x8a7a6a);KB.state='broken';KB.t=0;KB._b=false;K5.crash=false;}}
    // помощники: ключи (на того, кто без иглы), вороны, иглы у наковальни
    K5.keyT=(K5.keyT==null?7:K5.keyT)-dt;if(K5.keyT<=0){K5.keyT=G.solo?16:12;const t2=G.solo?null:(hold?active(1-hold.player):active(1));if(t2&&!players[t2.player].downed&&!K5.adds.some(e=>e.kind==='k5key'))keyMake(t2);}
    if(K5.adds.filter(e=>e.kind==='k5raven').length<(G.solo?1:2)){K5.rvT=(K5.rvT==null?4:K5.rvT)-dt;if(K5.rvT<=0){K5.rvT=9;ravenMake();}}
    K5.rainT=(K5.rainT==null?8:K5.rainT)-dt;if(K5.rainT<=0){K5.rainT=11;needleRain(G.solo?3:4,forging()?ANV:null);}}
  /* ---------- Кощей: попадания, отбивы, «золотая нить» ---------- */
  function bossHit(e,h){if(!K5.fight||!K5.live)return;
    if(e.state==='broken'){if(K5.st===5){floatText(kosTop(),'Куй, пока он без сил!','#ffe08a');return;}bindTap(h);return;}
    if(e.pos.y>1.2){floatText(kosTop(),'не достать','#cfd8dc');return;}
    // окна: после отбива (шатается) и после кувырка от красного (закружился) — не больше двух ударов вдвоём / одного одному;
    // этап 4 — ещё и со спины, пока Кощей занят замахом или ударом (раз в 0,9 с)
    const side=hitSide(e,h),back=side!=='f',win=e.dazeT>0||e.state==='stagger',busy=e.state==='wind'||e.state==='strike'||e.state==='recover';
    const cap=G.solo?1:2,open=(win&&(K5.winN||0)<cap)||(K5.st===4&&back&&busy);
    if(open){if(G.time<(e._hitCd||0))return;e._hitCd=G.time+(win?0.3:0.9);if(win)K5.winN=(K5.winN||0)+1;e.flashT=0.12;shake(h.player,0.03,0.12);burst(e.pos.clone().add(new V3(0,2,0)),0xffffff,6,3);emberOut(e,1,!win?'Со спины!':'Удар!');K5.log.push('bhit');return;}
    if(win){SFX.clink();floatText(kosTop(),'опомнился — отбей следующий удар','#cfd8dc');return;}
    SFX.clink();floatText(kosTop(),back?'закрылся':'в лоб не пробить — отбей удар щитом','#cfd8dc');}
  function bossParried(e,h){K5.log.push('bparry');K5.combo=null;if(K5.st===2){const pi=h.player,sp=K5.spark;if(sp&&sp.pi===pi&&sp.t>0){emberOut(e,1,'Искорка!');FX.stars(e.pos.clone().add(new V3(0,3,0)),10,0xffe08a);K5.log.push('sparkx3');}sparkTo(G.solo?pi:1-pi,h.pos);}}
  function bossHitHero(e,h){if(K5.st===5&&K5.needle&&h===K5.needle.holder){if(h.kind==='proshka'&&!G.solo){const g=active(1-h.player);if(g&&g.guard&&!players[1-h.player].downed&&hd(g.pos,h.pos)<2.6){shieldBlock(g);floatText(g.pos.clone().add(new V3(0,g.d.height+0.8,0)),'Заслонил Прошку!','#ffe08a');K5.log.push('cover');return true;}}
      later(0,()=>needleDrop(h));}return false;}
  function bindTap(h){const pi=h.player;K5.bind=K5.bind||[-9,-9];K5.bind[pi]=G.time;k5Thread(()=>headOf(h).add(new V3(0,-0.6,0)),()=>KS.g.position.clone().add(new V3(0,2.4,0)));k5s('bind');floatText(h.pos.clone().add(new V3(0,h.d.height+0.9,0)),'Нить сказа!','#ffe08a');
    const other=1-pi,both=G.solo||players[other].downed||Math.abs(K5.bind[other]-G.time)<1.6;if(both){K5.log.push('bind'+K5.st);stageWin(K5.st);}else floatText(kosTop(),'Второй — тоже!','#ffe08a');}
  function bossTick(dt){if(!K5.live)return;
    // новое окно — снова можно ударить; после кувырка Кощей опоминается быстрее мелких мороков
    if(KB.state==='stagger'&&!K5.pStag)K5.winN=0;K5.pStag=KB.state==='stagger';if(KB.dazeT>1.6)KB.dazeT=1.6;if(KB.dazeT>(K5.pDaze||0)+0.3)K5.winN=0;K5.pDaze=KB.dazeT;
    if(KB.state==='broken'&&!KB._b){KB._b=true;KB.bdur=K5.st===5?6:(G.solo?10:9);if(K5.st!==5){banner('Спесь сбита!','#ffd76a',2.4,G.solo?'ударь рядом с ним '+K(G.soloPi,'attack')+' — золотая нить сказа':'оба — удар '+K(0,'attack')+' + '+K(1,'attack')+' рядом с ним: золотая нить сказа');
        if(!K5.said['b'+K5.st]){K5.said['b'+K5.st]=true;say('zven','Он без сил! Вместе — золотой нитью!',3.6,true);}}else banner('Кощей без сил!','#ffd76a',2,'куй, Прошка!');}
    if(KB.state!=='broken'&&KB._b){KB._b=false;if(K5.fight){KB.embers=K5.st===5?KB.maxEmb:Math.max(2,Math.ceil(KB.maxEmb/2));if(K5.st!==3)floatText(kosTop(),'Спесь вернулась!','#c8a8ff');}}
    if(K5.st===2){if(G.solo)KB.pi=G.soloPi;else if(K5.spark)KB.pi=K5.spark.pi;else if(KB.state==='recover'&&!KB._sw){KB._sw=true;KB.pi=1-(KB.pi||0);}if(KB.state!=='recover'&&K5.st===2)KB._sw=false;if(KB.pi!=null&&players[KB.pi].downed)KB.pi=1-KB.pi;
      K5.keyT=(K5.keyT==null?5:K5.keyT)-dt;const nk=K5.adds.filter(e=>e.kind==='k5key').length;if(K5.keyT<=0&&nk<(G.solo?1:2)&&KB.state!=='broken'){K5.keyT=rand(8,11)+(G.solo?3:0);const tgp=G.solo?G.soloPi:1-(KB.pi||0);const th=active(tgp);if(th&&!players[tgp].downed&&!K5.locks[tgp]){keyMake(th);if(!K5.said.k9){K5.said.k9=true;bark(KS,'koschei','Заприте их!',1.4);}anim(0.6,k=>{KS.armR.rotation.x=-2.2*Math.sin(k*Math.PI);});}}}
    if(K5.st===3)stage3Tick(dt);if(K5.st===4)stage4Tick(dt);if(K5.st===5)stage5Tick(dt);}
  // поза и меч: замах, удар, полёт
  function kosAnim(dt){if(!K5.live)return;const s=KB.state;if(s!==K5.prevS){if(s==='strike'){k5s('swing');KS.armR.rotation.x=0.9;}if(s==='wind')k5s('warn');K5.prevS=s;}
    if(s==='wind'){const k=clamp(KB.t/Math.max(0.1,KB.wdur),0,1);KS.armR.rotation.x=damp(KS.armR.rotation.x,-2.6,10,dt);if(sword.visible)sword.userData.edge.material.opacity=0.5+0.5*k;}
    else if(s==='strike'){}else if(s==='k5cast'||s==='k5rise'){KS.armR.rotation.x=damp(KS.armR.rotation.x,-1.1+0.3*Math.sin(G.time*2),3,dt);}else if(s!=='k5leap')KS.armR.rotation.x=damp(KS.armR.rotation.x,0,5,dt);
    KS.g.rotation.x=damp(KS.g.rotation.x,s==='broken'?0.25:s==='k5dive'?0.4:0,5,dt);if(sword.visible&&s!=='wind')sword.userData.edge.material.opacity=0.55+0.25*Math.sin(G.time*5);}
  /* ---------- этапы: начало, проигрыш, победа ---------- */
  const PAUSE={1:'Этап 1 «Чёрные свечи». Купол держат четыре свечи: погасите все — отбей синюю каплю обратно в свечу, полей водой Йоши или ударь пять раз. Погасшая через 12 секунд (одному — через 24) горит снова. Красный круг — сюда ударит молния.',
    2:'Этап 2 «Ключ и искорка». Отбивайте удары Кощея в последний миг: над другом загорается искорка — отбил с искоркой, спесь гаснет вдвое. Ключ отбей щитом; запертого друга отпирай ударами по замку. Спесь сбита — оба ударьте рядом с ним.',
    3:'Этап 3 «Буря». Тёмный шар отбей в последний миг — он полетит к другу; друг отбивает его в небо, в Кощея. Ворон пикирует — кувырок, застрял — бей. Красные круги — иглы, воронка тянет — выбегай.',
    4:'Этап 4 «Меч Бессмертного». Над кем горит око — того Кощей выбрал: держи щит и отбивай серию. Второй заходит со спины и бьёт. Волна по земле — прыгай. После прыжка Кощей открыт.',
    5:'Этап 5 «Игла». Иглу несёт герой со свечением — передай другу '+K(0,'item')+'. Прошка с иглой у наковальни — бей в такт. Второй встаёт рядом с Прошкой и держит щит. Кольцо цепей — щиты оба в такт.'};
  function stageStart(n,retry){K5.st=n;F.stage='s'+n;K5.fight=false;clearAdds();eye.visible=false;fring.visible=false;K5.combo=null;K5.delayNext=false;K5.bind=[-9,-9];K5.crash=false;RG.tries=0;
    ['castT','keyT','orbT','rainT','vxT','rvT','leapT','diveT','cs0','cs1'].forEach(k=>{K5[k]=null;});heroesHome(n);W.pauseLine=PAUSE[n];dome.visible=n===1;sword.visible=n>=4;
    const f=K5.fails[n];
    if(n===1){liveBoss(false);KS.g.position.copy(KP);KS.g.rotation.y=0;candles.forEach(c=>candleSet(c,true));}
    else candles.forEach(c=>{candleSet(c,false);c.relT=1e9;c.g.visible=false;});
    if(n===2){KS.g.position.set(KP.x,0,KP.z+3);liveBoss(true);bossCfg((G.solo?10:12)-2*f,['yellow','yellow','red'],2.4);sword.visible=false;KB.pi=0;}
    if(n===3){KS.g.position.set(C.x,5.4,C.z-4);liveBoss(true,true);bossCfg((G.solo?5:8)-(f?1:0)-(f>2?1:0),['yellow'],2.4);KB.pos.y=5.4;k5StormSet(1);}
    if(n===4){KS.g.position.set(C.x,0,C.z-5);liveBoss(true);bossCfg((G.solo?12:14)-2*f,['yellow','red'],3.0);sword.visible=true;K5.mark=0;K5.bones=false;k5StormSet(1);}
    if(n===5){KS.g.position.set(C.x,3.2,C.z-6);liveBoss(true,true);bossCfg(6-f,['yellow','red'],3.0);sword.visible=true;KB.pos.y=3.2;k5StormSet(1);anvil.position.set(ANV.x,0.9,ANV.z);anvilCyl.x=ANV.x;anvilCyl.z=ANV.z;anvilCyl.maxy=2;
      K5.needle={holder:null,ground:null,t:0};needleHold(G.solo?active(G.soloPi):active(1));K5.forge={n:0,need:12-2*Math.min(2,f),c:0,b:-1,good:0,tries:0,rings:{}};}
    K5.wake=K5.live?KB.state:null;if(K5.live)KB.state='k5wait';   // пока идут карточки — Кощей ждёт
    setBar();const go=()=>{K5.fight=true;K5.t0=G.time;K5.hint0=G.time;if(K5.live&&KB.state==='k5wait')KB.state=K5.wake;setBar();if(n===1&&!K5.said.k01){K5.said.k01=true;later(0.4,()=>say('pelageya','Смотрите: купол держат чёрные свечи! Погасите все четыре!',4.4));}
      if(n===4&&!G.solo&&!K5.said.k18){K5.said.k18=true;later(0.6,()=>say('zven','Кого он выбрал — тот держит щит. А второй — заходи со спины!',4.4,true));}};
    if(!K5.auto)go();else if(K5.seen[n]||retry)k5Short(n,go);else{K5.seen[n]=true;G.flags.tut5b=Object.assign({},K5.seen);k5Tut(n,go);}}
  function stageLose(){if(!K5.fight)return;K5.fight=false;K5.fails[K5.st]++;K5.log.push('lose'+K5.st);const f=$('flash');if(f){f.style.transition='opacity .6s';f.style.opacity=1;}
    say('zven','Сказ сбился… Начнём этот кусочек заново!',3.6,true);later(1.4,()=>{if(f)f.style.opacity=0;stageStart(K5.st,true);});}
  function stageWin(n){if(!K5.fight||K5.st!==n)return;K5.fight=false;clearAdds();eye.visible=false;fring.visible=false;K5.log.push('win'+n);SFX.horn();
    if(n===1)trans1();else if(n===2)trans2();else if(n===3)trans3();else if(n===4)trans4();else finale();}
  function setBar(){bb.style.display='block';bb.style.borderColor='#b58cff';const e=KB,st=K5.st;const pips=st>=2?' · спесь '+'<b style="color:#ff9a3a">'+'●'.repeat(Math.max(0,e.embers))+'</b>'+'○'.repeat(Math.max(0,e.maxEmb-e.embers)):'';
    let note='';if(st===1)note='свечи '+candles.map(c=>c.lit?'🕯':'·').join('');else if(st===2)note=K5.spark?'искорка у '+(G.solo?'тебя':'Игрока '+(K5.spark.pi+1)):'отбей — искорка другу';else if(st===3)note='шар — другу, друг — в небо';
    else if(st===4)note=G.solo?'око на тебе':'око на Игроке '+(K5.mark+1);else if(st===5&&K5.forge)note='застёжка '+K5.forge.n+' / '+K5.forge.need;
    const html='<b style="color:#d8b8ff">Кощей Бессмертный</b> · этап '+st+' из 5 — '+K5N[st]+pips+(note?' <small style="opacity:.85">· '+note+'</small>':'');if(bb.innerHTML!==html)bb.innerHTML=html;}
  /* ---------- ролики ---------- */
  function intro(){F.stage='introCine';HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,4,0);h.face=Math.PI;});
    play({dur:35,fov:46,camK:2,shots:[shot(0,[14,9,14],[0,4,-24]),shot(6.4,[-10,3,-14],[-13,1.2,-25]),shot(11.4,[0,4,-4],[0,2.2,-28]),shot(16.6,[10,3,-8],[KP.x+4,2.4,KP.z]),shot(23,[-1,2.2,-15.4],[-3.5,0.8,-19]),shot(27.4,[0,6,2],[0,1.6,-18])],
      says:[[0.3,4.6,null,'<i>Буян, засохший дуб, рассвет. Горыныч к корням Кузьмину наковальню несёт —</i><br><i>И ложится рядом, как скала тёплая, ждёт.</i>',true],
        [6.4,4.6,null,'<i>Вокруг поляны — все, кому герои помогли.</i><br><i>Ближе всех — четверо помощников из Сказов: молчат, слушают, как могли.</i>',true],
        [11.6,4.4,null,'<i>Кощей сам приходит, с тетрадкой Пелагеи в руке.</i><br><i>Кладёт на камень: стыдно ему — но вернуть решил, налегке.</i>',true],
        [16.8,2.8,'koschei','Я дочитал. А конца у сказки нет — пусто.'],[19.8,3.2,null,'<i>Пелагея на последнюю страницу глядит: «Жил-был мальчишка…» —</i><br><i>И больше ни строчки, ни слова, ни книжки.</i>',true],
        [23.4,3.8,'koschei','Всё равно сказок не будет.<br>В них я всегда один — никто не полюбит.'],[27.6,3,null,'<i>Кощей поднимает руку — и вокруг него вспыхивают чёрные свечи и волшебный купол.</i>',true],[31,3.2,'zven','Сегодня мы не деремся. Защищайтесь —<br>И сказку вспоминайте, не сдавайтесь!']],
      events:[{t:11.6,fn:()=>{const f=KS.g.position.clone();KS.g.rotation.y=-Math.PI/2;anim(4.4,k=>{KS.g.position.lerpVectors(f,new V3(-2.4,0,-18),k);});book.g.visible=true;}},
        {t:15.2,fn:()=>{book.g.position.set(-3.5,1.0,-19);KS.g.rotation.y=Math.PI*0.2;}},{t:19.8,fn:()=>{const pe=T.pelageya;placeOnGround(pe,-2.6,-17.4,0);faceTo(pe,-3.5,-19);}},
        {t:23.2,fn:()=>{const f=KS.g.position.clone();anim(1.4,k=>{KS.g.position.lerpVectors(f,KP,k);});KS.g.rotation.y=0;}},
        {t:27.6,fn:()=>{anim(1,k=>{KS.armR.rotation.x=-k*2.2;});k5s('cast');dome.visible=true;dome.scale.setScalar(0.01);anim(1.2,k=>dome.scale.setScalar(Math.max(0.01,smooth(k))));candles.forEach((c,i)=>later(0.5+i*0.35,()=>{candleSet(c,true);k5s('candleOn');FX.sparkle(c.pos.clone().add(new V3(0,1.8,0)),10,0xb070ff);}));}}],
      tick:(t)=>{if(t<6)gor.g.position.y=-0.6;},
      end:()=>{W.anims.length=0;KS.g.position.copy(KP);KS.g.rotation.y=0;KS.armR.rotation.x=0;book.g.visible=true;book.g.position.set(-3.5,1.0,-19);dome.scale.setScalar(1);
        W.clampR={x:C.x,z:C.z,r:R};Z.mode='lead';stageStart(1);}});}
  function trans1(){F.stage='t1';HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-11,0);h.face=Math.PI;});const po=T.potap;
    play({dur:12.6,fov:44,camK:2.4,shots:[shot(0,[KP.x+5,3,KP.z+7],[KP.x,2.2,KP.z]),shot(4,[KP.x-3.4,2.2,KP.z+4.6],[KP.x,2.8,KP.z]),shot(8.6,[1,2.4,-7.4],[po.pos.x,1.2,po.pos.z])],
      says:[[0.4,3.4,'koschei','Мои свечи… Вы задули мои свечи?'],[4,4.6,'koschei','Тогда я запру вас. Каждого — своим ключом.'],[8.8,2.8,'potap','Не запрёшь. Мы друг друга откроем!']],
      events:[{t:0.2,fn:()=>{k5s('barrier');shakeAll(0.06,0.5);FX.sparkle(KP.clone().add(new V3(0,2,0)),40,0xd0b0ff);anim(0.8,k=>{dome.scale.setScalar(1+k*0.4);dome.children.forEach(m=>{if(m.material)m.material.opacity*=0.9;});});later(0.8,()=>{dome.visible=false;});}},
        {t:4.2,fn:()=>{anim(1.2,k=>{KS.armR.rotation.x=-2.2*Math.sin(k*Math.PI);});if(SFX.keys)SFX.keys();}}],
      end:()=>{W.anims.length=0;dome.visible=false;skaz1();}});}
  function skaz1(){F.stage='skaz1';skazClouds({who:1,title:'Сказ по памяти · начало',sub:'Пелагея шагает вперёд и сказывать начинает. Время останавливается. Начало — Игрок второй выбирает.',
      opts:['Жил-был мальчик — сказки сам сложить мечтал','Жил у Кота Учёного ученик','Жил-был мальчишка с молоточком деревянным']},i=>{const t=['Жил-был мальчик — сказки сам сложить мечтал','Жил у Кота Учёного ученик','Жил-был мальчишка с молоточком деревянным'][i];F.sk1=t;F.skaz=1;
      const pe=T.pelageya,po=T.potap;play({dur:14,fov:44,camK:2.4,shots:[shot(0,[pe.pos.x+2,1.8,pe.pos.z+2.6],[pe.pos.x,1,pe.pos.z]),shot(4.4,[3,3,-12],[KP.x,2.4,KP.z]),shot(7.4,[po.pos.x-2,1.8,po.pos.z+2.6],[po.pos.x,1.2,po.pos.z])],
        says:[[0.3,3.8,'pelageya',t+'…'],[4.4,2.4,null,'<i>Кощей руку опускает.</i>',true],[6.8,1.8,'proshka','Сказывай дальше, дальше!'],[8.8,4,'pelageya','…и рядом с ним стоял Потап. Он держал — не отпускал.']],
        events:[{t:4.4,fn:()=>{anim(1,k=>{KS.armR.rotation.x=-2.2*(1-k);});}},{t:8.8,fn:()=>{G.flags.names.potap=true;SFX.ok();floatText(po.pos.clone().add(new V3(0,2.6,0)),'Потап','#e0b27a');banner('Имя вернулось: Потап','#e0b27a',2.4);}}],
        end:()=>{W.anims.length=0;stageStart(2);}});});}
  function trans2(){F.stage='t2';liveBoss(false);const p=KS.g.position.clone();
    play({dur:7.6,fov:44,camK:2.4,shots:[shot(0,[p.x+4,2.6,p.z+5],[p.x,2.8,p.z])],says:[[0.4,3.2,'koschei','Ключи вам не страшны… А буря?'],[3.9,3.4,null,'<i>Небо темнеет. С моря ползут тучи.</i>',true]],
      events:[{t:3.4,fn:()=>{k5StormSet(1);k5s('thunder');}}],end:()=>{W.anims.length=0;skaz2();}});}
  function skaz2(){F.stage='skaz2';const names=HM.map(h=>h.name);skazClouds({who:0,title:'Сказ по памяти · помощник',sub:'Кто мальчишке помогал? Помощник у дуба стоит. Выбирает Игрок первый.',opts:names},i=>{const h=HM[i];F.sk2=h.name;F.sk2k=h.k;F.skaz=2;
      const f=h.m.g.position.clone();play({dur:15,fov:44,camK:2.2,shots:[shot(0,[f.x+3,2.4,f.z+5],[f.x,1.2,f.z]),shot(5,[-1,1.8,-14],[-3.5,0.9,-19]),shot(10,[-12,2.2,-1],[yagaM?yagaM.g.position.x:-17,1.2,yagaM?yagaM.g.position.z:-4])],
        says:[[0.3,4,'pelageya','И помогал ему в том '+h.name.replace(/^./,c=>c.toLowerCase())+'.'],[4.6,4.6,null,'<i>Выбранный шаг вперёд делает. Кощей на камень садится —</i><br><i>Руки на колени кладёт и слушает, не шевелится.</i>',true],
          [9.8,4.4,null,'<i>Яга на краю поляны глаз метлой утирает —</i><br><i>Мол, от пыли это, никто не узнает.</i>',true]],
        events:[{t:0.3,fn:()=>{if(h.k!=='kit'){const to=f.clone().add(new V3(-f.x*0.2,0,2));anim(1.4,k=>{h.m.g.position.lerpVectors(f,to,smooth(k));});}else{anim(1.6,k=>{h.m.g.position.y=-1.2+Math.sin(k*Math.PI)*1.5;});}}},
          {t:4.8,fn:()=>{KS.g.position.set(-3.5,-0.4,-20.2);KS.g.rotation.y=0.4;}},{t:10,fn:()=>{if(yagaM)anim(2,k=>{yagaM.g.rotation.z=Math.sin(k*Math.PI*3)*0.12;});}},
          {t:12.4,fn:()=>{if(!G.flags.names.yosha){G.flags.names.yosha=true;bark(T.yosha,'yosha','Я смогу! Держите, держите!',2.2);SFX.ok();banner('Имя вернулось: Йоша','#8fe0d4',2.4);}}}],
        end:()=>{W.anims.length=0;KS.g.position.copy(KP);KS.g.rotation.y=0;trans2b();}});});}
  function trans2b(){F.stage='t2b';HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-8,0);h.face=Math.PI;});
    play({dur:10.6,fov:46,camK:2.2,shots:[shot(0,[4,2.4,-9],[KP.x,2.6,KP.z]),shot(3.6,[0,2,-4],[0,5,-18]),shot(7.4,[-3,1.8,-4],[T.pelageya.pos.x,1,T.pelageya.pos.z])],
      says:[[0.3,2.9,'proshka','Он взлетел! Как его оттуда достать?'],[3.6,3.4,'pelageya','Шар отбей другу — а друг отбивает его в небо!'],[7.4,2.4,'koschei','Попробуйте, достаньте!']],
      events:[{t:0.3,fn:()=>{k5s('flyUp');const f=KS.g.position.clone();anim(2.4,k=>{KS.g.position.set(lerp(f.x,C.x,k),smooth(k)*5.4,lerp(f.z,C.z-4,k));});}}],
      end:()=>{W.anims.length=0;stageStart(3);}});}
  function trans3(){F.stage='t3';liveBoss(false);KS.g.position.y=0;HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-6,0);h.face=Math.PI;});const p=KS.g.position.clone(),po=T.potap,pr=T.proshka;
    play({dur:11,fov:44,camK:2.4,shots:[shot(0,[p.x+3.4,2.2,p.z+4.6],[p.x,2.4,p.z]),shot(4,[pr.pos.x+1.8,1.5,pr.pos.z+2.2],[pr.pos.x,1,pr.pos.z]),shot(7,[po.pos.x-2,1.8,po.pos.z+2.6],[po.pos.x,1.2,po.pos.z])],
      says:[[0.4,3,'koschei','Хватит сказок. Теперь — меч.'],[4.2,2.6,'proshka','У него меч! Настоящий!'],[7.2,2.3,'potap','Все за меня! Я держу!']],
      events:[{t:0.9,fn:()=>{sword.visible=true;k5s('draw');FX.sparkle(KS.g.position.clone().add(new V3(0.6,2,0.4)),16,0xd0b0ff);anim(1.4,k=>{KS.armR.rotation.x=-2.4*Math.sin(k*Math.PI*0.5);});}},{t:7.2,fn:()=>{T.potap._demoGuard=G.time+2;}}],
      end:()=>{W.anims.length=0;KS.armR.rotation.x=0;stageStart(4);}});}
  function trans4(){F.stage='t4';liveBoss(false);HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-9,0);h.face=Math.PI;});const p=KS.g.position.clone(),pr=T.proshka,pe=T.pelageya;
    play({dur:13,fov:44,camK:2.4,shots:[shot(0,[p.x+4,2.2,p.z+5],[p.x,2.8,p.z]),shot(3.2,[1,2.6,-4],[p.x,2,p.z]),shot(8.4,[pr.pos.x+1.8,1.5,pr.pos.z+2.2],[pr.pos.x,1,pr.pos.z])],
      says:[[0.4,2.4,'koschei','Бессмертного не победить!'],[3.2,4.9,'zven','Не победить — так расковать! Прошка, из иглы — застёжку!'],[8.4,2.9,'proshka','Несите мне иглу! Я к наковальне!']],
      events:[{t:0.4,fn:()=>{k5s('ult');shakeAll(0.05,0.8);anim(1.4,k=>{KS.g.position.y=smooth(k)*1.2;KS.armR.rotation.x=-2.8*k;});}},
        {t:3.4,fn:()=>{const w=ndl.g.getWorldPosition(new V3());W.group.add(ndl.g);ndl.g.position.copy(w);ndl.g.scale.setScalar(1);const to=headOf(active(1)).add(new V3(0,0.4,0));SFX.dzin&&SFX.dzin();anim(1.2,k=>{ndl.g.position.lerpVectors(w,to,smooth(k));ndl.g.position.y+=Math.sin(k*Math.PI)*2;ndl.g.rotation.z+=0.3;});}}],
      end:()=>{W.anims.length=0;liftScene();}});}
  function liftScene(){F.stage='lift';const pr=T.proshka;k5force(0,'proshka');placeOnGround(pr,5,-16.6,0);
    play({dur:9,fov:44,camK:2.4,shots:[shot(0,[9,3,-13],[5,1,-20]),shot(4.6,[2,2,-15],[3.4,2,-23])],
      says:[[0.3,4,null,'<i>Прошка к наковальне бежит — и изобретение его впервые не подвело:</i><br><i>Подъёмник из клещей да цепи наковальню к самым корням подняло.</i>',true],[4.8,3.2,'proshka','Я же говорил, что штука моя работает — вот и сработала!']],
      events:[{t:1,fn:()=>{const f=anvil.position.clone(),to=new V3(ANV.x,0.9,ANV.z);anim(3,k=>{anvil.position.lerpVectors(f,to,smooth(k));anvil.position.y+=Math.sin(k*Math.PI)*1.2;});SFX.latch();}}],
      end:()=>{W.anims.length=0;anvil.position.set(ANV.x,0.9,ANV.z);anvilCyl.x=ANV.x;anvilCyl.z=ANV.z;anvilCyl.maxy=2;stageStart(5);}});}
  function finale(){F.stage='needle';liveBoss(false);const pr=T.proshka;k5force(0,'proshka');placeOnGround(pr,ANV.x,ANV.z+1.8,0);pr.face=Math.PI;KS.g.position.set(ANV.x-2.4,0,ANV.z+0.4);KS.g.rotation.y=Math.PI*0.4;k5StormSet(0.35);
    const good=G.flags.claspQ||0.7;
    play({dur:21,fov:42,camK:2.4,shots:[shot(0,[ANV.x-5,2.4,ANV.z+5],[KS.g.position.x,2.2,KS.g.position.z]),shot(3.2,[pr.pos.x+2.4,1.8,pr.pos.z+2.4],[pr.pos.x,1,pr.pos.z]),shot(7.8,[ANV.x+2.6,1.9,ANV.z+3],[ANV.x-0.6,1.4,ANV.z]),shot(16.6,[ANV.x+1.2,2.4,ANV.z+4],[ANV.x,1,ANV.z])],
      says:[[0.3,2.4,'koschei','…Почему вы не бьёте?'],[3.2,4.4,'pelageya','Потому что это сказка. А в сказке можно по-другому.'],
        [7.8,4.4,null,'<i>Кощей долго смотрит на молот в лапах Прошки. Потом подходит и поправляет ему руку на застёжке.</i>',true],[12.4,4,'koschei','Держи. Ровней держи. Вот так, вот так.'],
        [16.6,3.6,null,good>=0.8?'<i>Узор на застёжке тонок, как у Кузьмы.</i>':'<i>Застёжка скована — Прошкиными руками.</i>',true]],
      events:[{t:0.3,fn:()=>{anim(1.5,k=>{KS.g.rotation.x=0.25*k;});sword.visible=false;}},{t:7.8,fn:()=>{const f=KS.g.position.clone();anim(2.4,k=>{KS.g.position.lerpVectors(f,new V3(ANV.x-1.2,0,ANV.z+1),k);});KS.g.rotation.x=0;}},
        {t:12.4,fn:()=>{anim(1,k=>{KS.armR.rotation.x=-k*1.2;});pr.atkT=0.3;k5s('forge');FX.sparks(ANV.clone().add(new V3(0,1.3,0)),16,0xffe080);}},
        {t:14.6,fn:()=>{G.flags.names.proshka=true;SFX.ok();banner('Имя вернулось: Прошка','#ff9a66',2.4);ndl.g.position.set(ANV.x,1.3,ANV.z);ndl.g.rotation.set(0,0,Math.PI/2);}}],
      end:()=>{W.anims.length=0;KS.armR.rotation.x=0;KS.g.position.copy(KP);KS.g.rotation.set(0,0,0);k5StormSet(0);skaz3();}});}
  const ENDS=['И ушёл он — и был таков','И простили его — и прощенья он просил','И позвали его слушать — сел он в круг'],ENDK=['ushel','proshen','slushat'];
  function skaz3(){F.stage='skaz3';skazClouds({who:2,title:'Сказ по памяти · конец',sub:'Последняя рамка осталась — чем сказка про мальчишку кончится.<br>Все три — настоящие. Наводите вместе, как хочется.',opts:ENDS},arr=>{F.skaz=3;F.ends=arr;
      G.flags.ending=arr.map(i=>ENDK[i]);G.flags.skaz5=[F.sk1,F.sk2,arr.map(i=>ENDS[i]).join(' — а иные сказывают: ')];
      if(arr.length>1){say('kot','<i>(разводит лапами)</i> А иные сказывают, что было иначе, — вот как…',3.4,true);later(3.6,chainScene);}else chainScene();});}
  function chainScene(){F.stage='chain';k5StormSet(0,true);const pe=T.pelageya,yo=T.yosha,pr=T.proshka;HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*1.8,-15.5,0);faceTo(h,KP.x,KP.z);});KS.g.position.set(-0.6,0,-19.4);KS.g.rotation.y=Math.PI*0.9;
    const keys=new THREE.Group();keys.position.set(-0.3,1.9,-19);W.group.add(keys);for(let i=0;i<5;i++){const k=blackKey(1.4);k.position.x=(i-2)*0.08;keys.add(k);}
    const thread=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,0.8,4),MB(COL.gold));thread.visible=false;W.group.add(thread);const ya=yagaM?yagaM.g.position:new V3(-10,0,-14);const E=F.ends[0];
    const tail=E===0?[[43,4.6,null,'<i>И ушёл он — и был таков: Кощей по воде уходит, не оглянувшись,</i><br><i>А на ветке дуба перстень его остался, блеснувши.</i>',true]]
      :E===1?[[43,4.6,null,'<i>И простили его — и прощенья он просил: пред Котом на колено встал, перстень отдал</i><br><i>И на дальний берег жить ушёл — там свой дом и сыскал.</i>',true]]
      :[[43,4.6,null,'<i>И позвали его слушать: Кощей у дуба остался, с перстнем на руке,</i><br><i>Рядом с Котом сидит — у корней, в тишине.</i>',true]];
    play({dur:49,fov:44,camK:2,shots:[shot(0,[4,3,-12],[-0.6,2,-19.4]),shot(4.6,[ya.x+4,2.4,ya.z+3],[ya.x,1.2,ya.z]),shot(8.4,[1,2,-17],[-2,1,-22.4]),shot(12.4,[-4,1.6,-18],[-2,1.2,-22.4]),shot(19,[4.2,2.6,-11.6],[-0.6,2.8,-19.4]),
        shot(23.4,[pe.pos.x+2,1.8,pe.pos.z+2.4],[pe.pos.x,1.1,pe.pos.z]),shot(28,[yo.pos.x+2,1.4,yo.pos.z+2.2],[yo.pos.x,0.7,yo.pos.z]),shot(31.6,[0,4,-12],[0,4,-28]),shot(37,[8,8,-14],[0,6,-28]),shot(42.4,[6,4,-10],[E===0?-8:E===1?-2:-1,2,E===0?-34:-22])],
      says:[[0.3,4,null,'<i>Какой бы конец ни выбрали — сперва вот что случится.</i>',true],[4.6,2.2,null,'<i>Кощей Яге связку чёрных ключей отдаёт.</i>',true],[6.6,1.8,'koschei','Больше не приманю — ни гуся, ни ворона.'],
        [8.4,3.8,null,'<i>Из кармана золотую ниточку достаёт — Коту возвращает.</i><br><i>Кот первый вдох делает — и говорит: хрипло, а словами отвечает.</i>',true],
        [12.4,5,'kot','Прости меня. Я всегда сказывал, что ты проиграл, —<br>Так было проще. Прости, что не переписал.'],[17.6,1.6,'koschei','Так расскажи по-другому — по-иному.'],[19.4,3.4,'kot','<i>(качает головой, показывает лапой на Пелагею)</i> Не я. Она уж сказала.'],
        [23.4,2.6,'koschei','Пелагея. Пелагея…'],[26.2,1.6,null,'<i>Над портретом Пелагеи имя её загорается — последнее из забытых.</i>',true],[28,2.6,'yosha','Я — Йоша! Мы все вспомнили, все!'],[30.4,1.8,'koschei','<i>(тише)</i> Пелагея… Расскажи ещё, прошу.'],
        [32.4,4.2,null,'<i>Прошка иглу в цепь застёжкой вставляет — цепь смыкается.</i>',true],[37,5.4,null,'<i>Кот Учёный по ней кругом идёт — направо песнь заводит,</i><br><i>Налево сказку говорит. И первая сказка у него — наша, выходит.</i>',true]].concat(tail),
      events:[{t:4.6,fn:()=>{const f=keys.position.clone();anim(1.6,k=>{keys.position.lerpVectors(f,ya.clone().add(new V3(0.4,1.2,0.4)),smooth(k));keys.position.y+=Math.sin(k*Math.PI)*1.5;});SFX.keys();}},
        {t:8.6,fn:()=>{thread.visible=true;const f=new V3(-0.4,1.6,-19.2),to=kot.g.position.clone().add(new V3(0,1.3,0.3));anim(1.8,k=>{thread.position.lerpVectors(f,to,k);thread.rotation.z+=0.1;});later(1.9,()=>{thread.visible=false;burst(to,COL.gold,16,2);SFX.dzin();kot.lids.forEach(l=>{l.rotation.x=-0.5;});G.flags.kotVoice=true;});}},
        {t:12.4,fn:()=>{kot.head.rotation.x=0.2;}},{t:19.4,fn:()=>{kot.g.rotation.y=Math.atan2(pe.pos.x-kot.g.position.x,pe.pos.z-kot.g.position.z);}},
        {t:23.4,fn:()=>{KS.g.rotation.y=Math.atan2(pe.pos.x-KS.g.position.x,pe.pos.z-KS.g.position.z);}},{t:26,fn:()=>{G.flags.names.pelageya=true;SFX.ok();banner('Имя вернулось: Пелагея','#d7a6ec',2.6);}},
        {t:28,fn:()=>{anim(0.6,k=>{yo.pos.y=Math.sin(k*Math.PI)*1.2;});G.flags.nameless=false;}},
        {t:32.6,fn:()=>{const f=ndl.g.position.clone(),to=OAK.clone().add(new V3(0,1+coilLinks.length*0.16,3.2));anim(1.4,k=>{ndl.g.position.lerpVectors(f,to,k);});later(1.5,()=>{SFX.link();SFX.horn();for(let i=0;i<8;i++)addCoilLink();burst(to,COL.gold,30,5);ringFx(OAK.clone().add(new V3(0,2,0)),COL.gold,5);
          leaves.forEach((l,i)=>later(i*0.08,()=>{l.visible=true;anim(0.8,k=>l.scale.setScalar(Math.max(0.01,k)));}));trunk.material.color.setHex(0x7a5a3e);});}},
        {t:37.2,fn:()=>{anim(5,k=>{const a=k*Math.PI*2;kot.g.position.set(OAK.x+Math.sin(a)*3.4,1.2+k*3,OAK.z+Math.cos(a)*3.4);kot.g.rotation.y=a+Math.PI/2;});lullaby([67,71,74,72,71,69,67],0.42,0,0.12);}},
        {t:43,fn:()=>{if(E===0){const f=KS.g.position.clone();KS.g.rotation.y=Math.PI;anim(5,k=>{KS.g.position.lerpVectors(f,new V3(-10,-0.3,-40),k);});addMesh(new THREE.TorusGeometry(0.1,0.03,6,12),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.8}),OAK.x+2.4,7.2,OAK.z+1);}
          else if(E===1){KS.g.position.set(kot.g.position.x+1,0,kot.g.position.z+1.4);anim(1,k=>{KS.body.position.y=-k*0.9;});}
          else{KS.g.position.set(OAK.x+2.2,0,OAK.z+3.4);KS.g.rotation.y=Math.PI*0.8;}}}],
      tick:(t)=>{if(t>12.4&&t<22)kot.head.rotation.x=0.2+Math.sin(t*6)*0.05;},
      end:()=>{W.anims.length=0;bb.style.display='none';G.flags.names={potap:true,yosha:true,proshka:true,pelageya:true};G.flags.nameless=false;G.flags.kotVoice=true;G.flags.w5done=true;G.flags.coils=5;
        G.done['5-B2']=true;G.hub=true;banner('Златая цепь скована!','#ffd76a',3,'звено руками Прошки сковано и словом Пелагеи держится');later(2.6,()=>goLevel('epi'));}});}
  /* ---------- логика кадра ---------- */
  function freeze(){const frozen=G.cine||!K5.fight;for(const e of W.enemies){if(!e.k5||e===KB&&!K5.live)continue;if(frozen){e.cd=Math.max(e.cd,1.2);if(e.state==='ready'||e.state==='wind'){e.state='idle';e.t=0;e.tgt=null;}}}}
  W.updates.push(dt=>{freeze();k5fxTick(dt);stormTick(dt);
    if(K5.live){KS.g.position.copy(KB.pos);KS.g.rotation.y=KB.face;}else KB.pos.copy(KS.g.position);
    aura.position.copy(KS.g.position).add(new V3(0,2.6,0));aura.intensity=K5.st>=2&&K5.st<=5?0.9+0.3*Math.sin(G.time*3):K5.st===1?0.5:0;kosAnim(dt);
    if(G.cine)return;if(!K5.fight){if(Math.floor(G.time*4)!==K5.bt){K5.bt=Math.floor(G.time*4);if(K5.st)setBar();}return;}
    if(K5.st===1)stage1Tick(dt);locksTick(dt);sparkTick(dt);orbTick(dt);bossTick(dt);
    try{k5HintTick(dt);}catch(e){console.error('k5 hint',e);}
    if(!G.solo?(players[0].downed&&players[1].downed):(players[0].downed&&players[1].downed))stageLose();
    if(Math.floor(G.time*4)!==K5.bt){K5.bt=Math.floor(G.time*4);setBar();}});
  // щит: отбив шара, кольцо цепей; удар: замок, наковальня; предмет: передать иглу
  W.onGuardTap=(pi,h)=>{for(const o of K5.orbs)if(o.tgt===h&&o.st!=='up'&&o.left===null)o.left=o.eta;if(RG.on&&RG.t>=0&&RG.press[pi]===null)RG.press[pi]=RG.t;};
  W.onAttack=(pi,h)=>{if(!K5.fight)return;if(K5.locks[pi]&&K5.locks[pi].h===h){floatText(h.pos.clone().add(new V3(0,h.d.height+0.8,0)),'заперт!','#c8a8ff');return;}
    for(const k in K5.locks){const L=K5.locks[k];if(L.h!==h&&hd(L.h.pos,h.pos)<2.3){L.hp--;FX.sparks(L.g.position.clone(),8,0xffe08a);SFX.clink();floatText(L.g.position.clone().add(new V3(0,0.6,0)),L.hp>0?'ещё '+L.hp:'!','#ffe08a');if(L.hp<=0)unlock(L,h);}}
    if(K5.st===5)forgeHit(h);};
  W.itemSign=pi=>K5.fight&&K5.st===5?(K5.needle&&K5.needle.holder===active(pi)?p=>needlePass(p):()=>{}):null;
  // кнопки над героями
  for(const pi of[0,1]){prompt(pi,'attack',()=>kosTop(),()=>K5.fight&&K5.live&&KB.state==='broken'&&K5.st!==5&&hd(active(pi).pos,KB.pos)<5,'золотая нить');
    prompt(pi,'attack',()=>{const L=K5.locks[1-pi];return L?L.g.position.clone().add(new V3(0,0.9,0)):new V3();},()=>K5.fight&&!!K5.locks[1-pi]&&!G.solo,'открой замок');
    prompt(pi,'item',()=>headOf(active(pi)),()=>K5.fight&&K5.st===5&&K5.needle&&K5.needle.holder===active(pi)&&!forging()&&!G.solo,'передать иглу');}
  prompt(0,'attack',()=>ANV.clone().add(new V3(0,2.2,0)),()=>K5.fight&&K5.st===5&&forging(),'в такт');
  const objText=pi=>{const st=K5.st;if(!st)return 'Финал…';if(!K5.fight)return 'Этап '+st+' · '+K5N[st];
    if(st===1)return 'Этап 1 · Погасите все четыре свечи: синюю каплю отбей щитом '+K(pi,'guard')+' в последний миг обратно в свечу, Йоша — водой '+K(1,'skill')+', или пять ударов '+K(pi,'attack');
    if(st===2)return 'Этап 2 · Отбивайте удары Кощея '+K(pi,'guard')+' в последний миг — искорка летит к другу. Ключ — отбей. Друга заперли — бей по замку '+K(pi,'attack');
    if(st===3)return 'Этап 3 · Тёмный шар отбей '+K(pi,'guard')+' в последний миг — к другу; друг отбивает в небо. Ворон — кувырок '+K(pi,'roll');
    if(st===4)return 'Этап 4 · Око над тобой — держи щит '+K(pi,'guard')+'. Око над другом — заходи Кощею за спину и бей '+K(pi,'attack')+'. Волна — прыжок '+K(pi,'jump');
    return 'Этап 5 · Застёжку куёт Прошка у наковальни — в такт '+K(0,'attack')+'. Передать иглу — '+K(pi,'item')+'. Кольцо — щиты вместе';};
  const objTg=pi=>{const st=K5.st;if(st===1)return candles.filter(c=>c.lit).map(c=>c.g);if(st===5)return [anvil];return K5.live?[KS.g]:[];};
  for(const pi of[0,1])W.objectives[pi]=[O(()=>objText(pi),()=>F.stage==='chain',()=>objTg(pi))];
  W.spawns=[[new V3(-3,0,4),new V3(-1,0,4)],[new V3(1,0,4),new V3(3,0,4)]];W.startAct=[0,0];
  W.pauseLine='Финал. Кощея не победить силой — сбейте с него спесь и свяжите золотой нитью сказа. Пять этапов; подсказки — на экране.';
  // для ботов и отладки
  Object.assign(K5,{KB,KS,candles,C,ANV,RG,stageStart,stageWin,stageLose,orbThrow,keyMake,lockHero,ravenMake,needlePass,leap,ringStart,sparkTo,setBar,forging,sword,dome});
  W.onStart=()=>{intro();};
  flushDecor();};
