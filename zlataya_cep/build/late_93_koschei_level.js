/* ============================== РЕЛИЗ final06 · 5-Б2: УРОВЕНЬ — арена, пять этапов, ролики между ними ============================== */
// Этапы: 1 «Чёрные свечи» (купол держат восемь свечей — погасить все вместе; цепи из земли, перст-молния),
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
  Object.assign(K5,{st:0,fight:false,live:false,spark:null,locks:{},orbs:[],adds:[],needle:null,forge:null,zones:[],mark:0,log:[],said:{},bones:false,storm:0,stormTo:0});K5FX.length=0;K5TR.length=0;
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
  const KA=k5Actor(KS);K5.KA=KA;   // Кощей-актёр: позы в роликах (late_92)
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
  // сигнал замаха — на груди Кощея и чуть впереди: над головой (5,4 м) игровая камера его не видела
  if(KB.S&&KB.S.sig)KB.S.sig.position.set(0,2.8,1.05);
  const kosTop=()=>KS.g.position.clone().add(new V3(0,4.3,0));
  /* ---------- общие ---------- */
  const inArena=(p,m)=>{const dx=p.x-C.x,dz=p.z-C.z,d=Math.hypot(dx,dz),r=R-(m||1.2);if(d>r){p.x=C.x+dx/d*r;p.z=C.z+dz/d*r;}return p;};
  function k5force(pi,kind){const p=players[pi];const i=p.heroes.findIndex(h=>h.kind===kind);if(i<0||p.act===i)return;p.act=i;p.heroes.forEach((h,k)=>{h.active=k===i;h.following=false;});}
  function k5Kill(e){if(!e)return;e.alive=false;k5Del(e.g);if(e.k5ring)k5Del(e.k5ring);const i=W.enemies.indexOf(e);if(i>=0)W.enemies.splice(i,1);const j=K5.adds.indexOf(e);if(j>=0)K5.adds.splice(j,1);}
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
  // показ для карточки «Цепи и красный круг» (late_94): три цепи вылезают перед героями и стоят, не бьют; off — уходят
  function chainDemo(on){if(K5.demo){for(const e of K5.demo){burst(e.pos.clone().add(new V3(0,0.3,0)),0x6a5a4a,8,2);k5Kill(e);}K5.demo=null;}if(!on)return;
    const P=[[1.3,-6.9],[-1.7,-8.1],[3.4,-8.9]];K5.demo=P.map(([x,z],i)=>{const e=makeFoe('cep',x,z,{leash:1});e.k5=true;e.k5demo=true;e.noMove=true;e.noKill=true;e.harmless=true;e.cd=99;e.state='k5demo';e.pos.y=-1.7;K5.adds.push(e);
      e.tick=(e,dt)=>{e.cd=99;if(e.state!=='k5demo'){e.state='k5demo';e.t=0;}};
      later(i*0.3,()=>{if(!e.alive)return;burst(new V3(x,0.4,z),0x6a5a4a,12,3);if(SFX.crash)SFX.crash();anim(0.7,k=>{e.pos.y=-1.7*(1-smooth(k))+Math.sin(k*Math.PI)*0.25;});});return e;});}
  /* ---------- этап 1: чёрные свечи и купол ---------- */
  // восемь свечей (по отзыву: четырёх было мало — гасли слишком легко): прежние четыре и ещё четыре — спереди, по бокам, сзади
  const CAND=[[-7.6,-7.4],[7.6,-7.4],[-7.2,-18.2],[7.2,-18.2],[0,-4.0],[-9.6,-12.8],[9.6,-12.8],[0,-16.6]];const candles=[];
  const relight=()=>(G.solo?30:12)+3*K5.fails[1];   // одному герою — время обежать все восемь
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
    // цепи: у каждого игрока по две (в одиночном — две); вдвое больше прежнего
    const want=G.solo?[G.soloPi]:[0,1];for(const pi of want){const mine=K5.adds.filter(e=>e.k5chain&&!e.k5demo&&e.pi===pi);if(mine.length<2){K5['cs'+pi]=(K5['cs'+pi]||1.5)-dt;if(K5['cs'+pi]<=0){K5['cs'+pi]=3;chainMake(pi);}}}
    // перст Кощея: молния в красный круг
    K5.castT=(K5.castT==null?4:K5.castT)-dt;if(K5.castT<=0){K5.castT=(G.solo?8:6.5)+K5.fails[1];const hs=k5Heroes();if(hs.length){const h=hs[Math.floor(rand(0,hs.length))];const p=inArena(h.pos.clone(),0.8);
      anim(0.5,k=>{KS.armR.rotation.x=-2.4*Math.sin(k*Math.PI);});k5s('cast');k5Zone(p,1.6,G.solo?1.6:1.35,0xff4a5a,q=>{if(!K5.fight)return;k5Bolt(q,0xd8b0ff);k5s('strike');shakeAll(0.05,0.25);FX.dust(q.clone(),12,0x6a5a7a);for(const x of k5Heroes())if(hd(x.pos,q)<1.7)k5Hurt(x,q);});}}
    dome.children[0].material.opacity=0.18+0.06*Math.sin(G.time*3);dome.rotation.y+=dt*0.2;}
  /* ---------- этап 2: ключи, замки, искорка ---------- */
  // ключ (по отзыву): появляется над головой Кощея (не пролетает сквозь него), летит к герою поверху, зависает над ним остриём вниз
  // (жёлтый кружок — щит), падает и разворачивается в путы: цепь спиралью вокруг героя и большой замок. Скован, пока друг
  // не собьёт замок — пять ударов, над замком пять шариков, как у свечей. Скованы все четверо — этап заново (у колокольчика).
  const LOCK_HP=5;const k5Locked=h=>!!(h&&K5.locks[h.kind]);
  function keyTarget(e){const ok=h=>h&&h.active&&!players[h.player].downed&&!k5Locked(h);if(G.solo){const h=active(G.soloPi);return ok(h)?h:null;}
    for(const pi of[e.pi,1-e.pi]){const h=active(pi);if(ok(h)){e.pi=pi;return h;}}return null;}
  function keyMake(h){const top=KS.g.position.clone().add(new V3(0,5.9,0));const e=makeFoe('k5key',top.x,top.z,{pi:h.player,leash:60});e.k5=true;e.noMove=true;e.state='k5fly';e.pos.y=top.y;e.k5tries=0;K5.adds.push(e);k5s('keyFly');
    FX.sparkle(top.clone(),14,0xc080ff);FX.sparks(top.clone(),10,0xd0b0ff);
    const ring=k5Prop(new THREE.Mesh(new THREE.RingGeometry(0.75,0.9,32),MB(0xc080ff,{transparent:true,opacity:0,side:THREE.DoubleSide,depthWrite:false})));ring.rotation.x=-Math.PI/2;e.k5ring=ring;
    e.k5parry=(e,h)=>{keyBreak(e,h);return true;};e.k5hitHero=(e,h)=>{keyLand(e,h);return true;};e.tick=(e,dt)=>keyTick(e,dt);return e;}
  const keyBodyPos=e=>{const p=new V3();(e.L&&e.L.body?e.L.body:e.g).getWorldPosition(p);return p;};
  function keyBreak(e,h){G.stats.parries++;SFX.parry();k5s('keyBreak');const p=keyBodyPos(e);FX.sparks(p,22,0xd0b0ff);FX.sparkle(p,10,0xffffff);FX.dust(p.clone(),8,0x6a5a8a);
    floatText(p.clone().add(new V3(0,0.6,0)),'Ключ рассыпался!','#e0c8ff');K5.log.push('keybreak');if(h&&FIN.guard)FIN.guard.hit(h,true);if(e.k5ring)k5Del(e.k5ring);k5Kill(e);}
  function keyLand(e,h){const p=h.pos.clone();if(e.k5ring)k5Del(e.k5ring);k5Kill(e);
    // удар о землю: вспышка, кольцо по земле, искры; затем ключ разворачивается в путы
    const fl=k5Prop(k5Glow(0xb070ff,4));fl.position.set(p.x,h.d.height*0.6,p.z);const sw=k5Prop(new THREE.Mesh(new THREE.RingGeometry(0.8,1,40),MB(0xc080ff,{transparent:true,opacity:0.9,side:THREE.DoubleSide,depthWrite:false})));sw.rotation.x=-Math.PI/2;sw.position.set(p.x,0.06,p.z);
    k5fx(0.6,k=>{fl.material.opacity=1-k;fl.scale.setScalar(4+k*3);sw.scale.setScalar(1+k*3.5);sw.material.opacity=0.9*(1-k);},()=>{k5Del(fl);k5Del(sw);});
    FX.sparks(p.clone().add(new V3(0,1,0)),18,0xc080ff);shake(h.player,0.06,0.3);lockHero(h);}
  function keyTick(e,dt){const L=e.L;L.gem.scale.setScalar(1+0.25*Math.sin(G.time*12));const tg=keyTarget(e);
    if(!tg){keyBreak(e,null);return;}
    const dx=tg.pos.x-e.pos.x,dz=tg.pos.z-e.pos.z,d=Math.hypot(dx,dz)||1;e.face=Math.atan2(dx,dz);e.tgt=tg;
    if(e.state==='k5fly'){// поверху: над Кощеем и над головами, к герою
      const sp=5.2*dt;e.pos.x+=dx/d*Math.min(sp,Math.max(0,d-1.0));e.pos.z+=dz/d*Math.min(sp,Math.max(0,d-1.0));e.pos.y=damp(e.pos.y,4.4,2.2,dt);
      L.body.position.lerp(new V3(0,0,0),1-Math.exp(-8*dt));L.body.rotation.x=damp(L.body.rotation.x,0,6,dt);L.body.rotation.y+=dt*4;if(d<1.5){e.state='idle';e.cd=0.25;e.t=0;}}
    else if(e.state==='k5back'){e.pos.x-=dx/d*2.5*dt;e.pos.z-=dz/d*2.5*dt;e.pos.y=damp(e.pos.y,3.2,3,dt);L.body.position.lerp(new V3(0,0,0),1-Math.exp(-5*dt));e.k5k-=dt;if(e.k5k<=0){e.state='k5fly';e.k5tries++;if(e.k5tries>=3){keyBreak(e,null);return;}}}
    else{// над героем остриём вниз; на ударе — падает
      if(d>1.3){e.pos.x+=dx/d*2.5*dt;e.pos.z+=dz/d*2.5*dt;}e.pos.y=damp(e.pos.y,0,5,dt);
      const st=e.state,strike=st==='strike',w=st==='wind'?clamp(e.t/Math.max(0.1,e.wdur||0.8),0,1):0;
      let hy=3.1+0.15*Math.sin(G.time*6)-0.5*w;if(strike)hy=lerp(2.6,0.6,clamp(e.t/0.16,0,1));
      L.body.position.lerp(new V3(0,hy-e.pos.y,d),1-Math.exp(-(strike?30:9)*dt));L.body.rotation.x=damp(L.body.rotation.x,Math.PI,8,dt);L.body.rotation.y+=dt*(4+10*w);
      if(st==='recover'&&e.t>0.1){const bp=keyBodyPos(e);e.pos.set(bp.x,bp.y,bp.z);L.body.position.set(0,0,0);e.state='k5back';e.k5k=0.8;}}
    // кружок под целью: где упадёт ключ
    const r=e.k5ring;if(r){const near=e.state!=='k5fly'&&e.state!=='k5back';r.position.set(tg.pos.x,0.07,tg.pos.z);r.material.opacity=near?0.55+0.4*Math.abs(Math.sin(G.time*10)):0;
      r.scale.setScalar(near&&e.state==='wind'?lerp(1.6,0.7,clamp(e.t/Math.max(0.1,e.wdur||0.8),0,1)):1);}}
  function lockHero(h){if(!h||k5Locked(h))return;const pi=h.player,H=h.d.height,R=Math.max(0.55,(h.d.radius||0.45)+0.28);const g=k5Prop(new THREE.Group());g.position.copy(h.pos);
    // цепь спиралью вокруг героя: звенья поочерёдно повёрнуты, тёмное железо с фиолетовым отсветом
    const lm=M(0x2e2a38,{emissive:0x5a2a9a,emissiveIntensity:0.55}),LG=new THREE.TorusGeometry(0.1,0.032,5,10);const links=[],N=24,coil=new THREE.Group();g.add(coil);
    for(let i=0;i<N;i++){const a=i*0.62,y=0.18+i*(H*0.9/N);const m=new THREE.Mesh(LG,lm);m.position.set(Math.cos(a)*R,y,Math.sin(a)*R);
      const tg=new V3(-Math.sin(a)*R*0.62,H*0.9/N,Math.cos(a)*R*0.62).normalize();m.quaternion.setFromUnitVectors(new V3(0,1,0),tg);if(i%2)m.rotateY(Math.PI/2);m.scale.set(1,1.55,1);m.scale.multiplyScalar(0.01);coil.add(m);links.push(m);}
    // большой замок с фиолетовой скважиной и пять шариков над ним
    const pad=new THREE.Group();g.add(pad);fk(pad,K=>{K.box(0.56,0.46,0.2,hp(0x3a3640),tm(0,0,0),{b:0.05});K.box(0.6,0.07,0.22,hp(0xd8a830),tm(0,0.2,0),{b:0.02});K.box(0.6,0.07,0.22,hp(0xd8a830),tm(0,-0.2,0),{b:0.02});});
    const sh=new THREE.Mesh(new FIN.orig.Torus(0.19,0.055,6,14,Math.PI),M(0x5a5660,{emissive:0x2a2440,emissiveIntensity:0.4}));sh.position.y=0.23;pad.add(sh);
    const kh=new THREE.Mesh(new THREE.SphereGeometry(0.075,8,6),MB(0xc080ff));kh.position.set(0,-0.02,0.11);pad.add(kh);
    const pips=[];for(let i=0;i<LOCK_HP;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(0.075,10,8),M(0xff7a1a,{emissive:0xff5a00,emissiveIntensity:1.1}));m.position.set((i-(LOCK_HP-1)/2)*0.19,0.52,0);pad.add(m);pips.push(m);}
    const aura=k5Glow(0x9a60ff,H*1.9);aura.position.y=H*0.5;g.add(aura);
    K5.locks[h.kind]={h,kind:h.kind,pi,hp:LOCK_HP,t:0,g,links,coil,pad,sh,kh,pips,aura,pin:h.pos.clone(),shk:0};
    k5s('lock');floatText(h.pos.clone().add(new V3(0,H+0.8,0)),'Скован!','#c8a8ff');K5.log.push('lock'+pi);h.guard=false;
    if(!K5.said.lock){K5.said.lock=true;say('zven','Друга заперли — бей по замку, открывай!',3,true);}}
  function unlock(L,by,quiet){if(!L)return;delete K5.locks[L.kind];if(quiet){k5Del(L.g);return;}
    k5s('unlock');const c=L.h.pos.clone().add(new V3(0,L.h.d.height*0.55,0));FX.sparks(c,22,0xffe08a);FX.sparkle(c,12,0xffffff);
    // путы разлетаются: звенья — в стороны и вниз, замок — вверх и раскрывается
    const v=L.links.map(m=>new V3(m.position.x*3,rand(1,3),m.position.z*3));
    k5fx(0.8,(k,dt)=>{L.links.forEach((m,i)=>{m.position.addScaledVector(v[i],dt);v[i].y-=9*dt;m.rotation.x+=dt*8;const s=Math.max(0.01,1-k);m.scale.set(s,1.55*s,s);});
      L.pad.position.y+=dt*2.2;L.sh.rotation.z=-1.2*Math.min(1,k*3);L.pad.scale.setScalar(Math.max(0.01,1-Math.max(0,k-0.5)*2));L.aura.material.opacity=1-k;},()=>k5Del(L.g));
    floatText(L.h.pos.clone().add(new V3(0,L.h.d.height+0.8,0)),by?'Свободен!':'Вырвался!','#ffe08a');L.h.iT=Math.max(L.h.iT,1);K5.log.push('unlock'+L.pi);}
  function lockHitBy(L,h){L.hp--;L.shk=1;const p=L.pad.getWorldPosition(new V3());FX.sparks(p,10,0xffe08a);SFX.clink();k5s('forge');floatText(p.clone().add(new V3(0,0.8,0)),L.hp>0?'ещё '+L.hp:'!','#ffe08a');K5.log.push('lockhit');if(L.hp<=0)unlock(L,h);}
  const camNow=()=>G.split>0.5?cams[0]:camS;
  function locksTick(dt){for(const k in K5.locks){const L=K5.locks[k],h=L.h;if(players[L.pi].downed){unlock(L,null,true);continue;}
      // скован: стоит на месте (и когда игрок сменил героя), щита нет, урона нет
      h.pos.x=L.pin.x;h.pos.z=L.pin.z;h.vel.x=0;h.vel.z=0;h.knockT=Math.max(h.knockT,0.12);h.iT=Math.max(h.iT,0.15);h.guard=false;if(!h.active)h.following=false;
      L.t+=dt;L.g.position.set(h.pos.x,h.pos.y,h.pos.z);const H=h.d.height;
      L.links.forEach((m,i)=>{const at=(L.links.length-1-i)*0.022,q=clamp((L.t-at)/0.12,0,1);const s=q<1?q*1.25:1;m.scale.set(s,1.55*s,s);});
      L.coil.rotation.y+=dt*0.6;L.aura.material.opacity=0.35+0.15*Math.sin(G.time*4);
      // замок — на груди, к камере; трясётся от ударов; шарики — сколько ещё ударить
      const cam=camNow();const fwd=cam?new V3(cam.position.x-h.pos.x,0,cam.position.z-h.pos.z).normalize():new V3(0,0,1);L.shk=Math.max(0,L.shk-dt*5);
      L.pad.position.set(fwd.x*(0.62+0.1*L.shk),H*0.55+0.04*Math.sin(G.time*3),fwd.z*(0.62+0.1*L.shk));if(cam){const lp=cam.position.clone();lp.y=L.g.position.y+L.pad.position.y;L.pad.lookAt(lp);}
      L.pad.rotation.z=Math.sin(G.time*40)*0.25*L.shk;L.kh.scale.setScalar(1+0.3*Math.sin(G.time*8));
      L.pips.forEach((m,i)=>{const on=i<L.hp;m.material.color.setHex(on?0xff7a1a:0x3a3a3a);m.material.emissive.setHex(on?0xff5a00:0x000000);m.material.emissiveIntensity=on?1+0.3*Math.sin(G.time*8+i):0;});}
    const n=Object.keys(K5.locks).length;
    if(n&&K5.live&&KB.state!=='broken'){K5.regen=(K5.regen||0)+dt;if(K5.regen>2.5){K5.regen=0;if(KB.embers<KB.maxEmb){KB.embers++;floatText(kosTop(),'Кощей копит силы','#c8a8ff');}}}
    // скованы все четверо — «пали» и снова у колокольчика: этап заново
    if(K5.fight&&HEROES.length&&HEROES.every(x=>k5Locked(x))){K5.log.push('allLocked');banner('Скованы все четверо!','#c8a8ff',2.6,'сказ сбился — снова у колокольчика');for(const x of HEROES)FX.dust(x.pos.clone(),10,0x4a3a5a);stageLose();}}
  const nearLock=pi=>{const me=active(pi);if(!me||k5Locked(me))return null;let best=null,bd=8;for(const k in K5.locks){const L=K5.locks[k];if(L.h===me)continue;const d=hd(L.h.pos,me.pos);if(d<bd){bd=d;best=L;}}return best;};
  function sparkTo(pi,from){const h=active(pi);if(!h)return;if(K5.spark)k5Del(K5.spark.m);const m=k5Prop(new THREE.Group());const s=new THREE.Mesh(new THREE.OctahedronGeometry(0.22),MB(0xfff2a0));m.add(s);
    m.add(new THREE.Mesh(new THREE.SphereGeometry(0.45,10,8),MB(0xffd76a,{transparent:true,opacity:0.3,depthWrite:false})));m.position.copy(from||h.pos).add(new V3(0,1.4,0));K5.spark={pi,t:4.5,m,fly:0};
    if(!K5.said.spark){K5.said.spark=true;say('zven','Отбил — искорка летит к другу! Отбивайте по очереди!',4.2,true);}}
  function sparkTick(dt){const S=K5.spark;if(!S)return;S.t-=dt;const h=active(S.pi);if(!h||S.t<=0){k5Del(S.m);K5.spark=null;return;}const to=headOf(h).add(new V3(0,0.2+0.1*Math.sin(G.time*6),0));S.m.position.lerp(to,1-Math.exp(-10*dt));S.m.rotation.y+=dt*5;S.m.scale.setScalar(S.t<1?S.t:1);}
  /* ---------- этап 3: шары, вороны, иглы, воронка, гроза ---------- */
  // шар (по отзыву 2: ярче): сначала копится в поднятой руке Кощея (искры стягиваются — замах), потом срывается с вспышкой и тянет светящийся шлейф
  const kHand=()=>KS.hand.getWorldPosition(new V3());
  function orbThrow(h){const o={g:k5OrbMesh(0.42),tgt:h,v:(G.solo?4.6:5.3)-0.3*K5.fails[3],st:'in',left:null,t:0,eta:9,hold:0.5};o.p=o.g.position;o.p.copy(kHand());o.g.scale.setScalar(0.01);K5.orbs.push(o);k5s('orb');
    k5Gather(()=>o.p,0xc090ff,0.5,16,2.2);anim(0.6,k=>{KS.armR.rotation.x=-2.6*Math.sin(k*Math.PI);});
    o.trail=k5Trail(o.g,()=>o.st==='in'?0xa060ff:0xffc040,{size:0.75,life:0.42,every:0.025});return o;}
  function orbTick(dt){const T0=timingOf;for(let i=K5.orbs.length-1;i>=0;i--){const o=K5.orbs[i];o.t+=dt;
    if(o.hold>0){o.hold-=dt;o.p.copy(kHand());o.g.scale.setScalar(Math.max(0.01,CE.outBack(clamp(1-o.hold/0.5,0,1))));k5OrbAnim(o.g,dt,false);o.eta=o.p.distanceTo(o.tgt.pos)/o.v+Math.max(0,o.hold);
      if(o.hold<=0){o.g.scale.setScalar(1);k5Flash(o.p.clone(),0xd0a0ff,3.2,0.3);k5Ring(o.p.clone(),0xc090ff,0.3,2.2,0.4,0.18,new THREE.Euler(0,0,0));if(SFX.whoosh)SFX.whoosh();}continue;}
    const to=o.st==='up'?KB.pos.clone().add(new V3(0,3.4,0)):o.tgt.pos.clone().add(new V3(0,heroHeight(o.tgt)*0.6,0));const dv=to.clone().sub(o.p),d=dv.length();o.eta=d/o.v;
    o.p.addScaledVector(dv.normalize(),Math.min(d,o.v*dt));o.g.rotation.y+=dt*4;o.g.children[1].scale.setScalar(0.42*4.2*(1+0.14*Math.sin(G.time*14)));k5OrbAnim(o.g,dt,o.st!=='in');
    if(Math.random()<0.35)FX.sparkle(o.p.clone(),1,o.st==='in'?0xc090ff:0xffe08a);
    if(o.t>9){k5Del(o.g);K5.orbs.splice(i,1);continue;}
    if(d>0.7)continue;
    if(o.st==='up'){k5Del(o.g);K5.orbs.splice(i,1);if(K5.live&&KB.state!=='broken'){emberOut(KB,G.solo?1:2,'Шар вернулся!');k5s('orbHit');const hp=KB.pos.clone().add(new V3(0,3.4,0));
        FX.stars(hp,16,0xffe08a);FX.sparks(hp,24,0xffd060);k5Flash(hp,0xfff0c0,5.5,0.45);k5Ring(hp,0xffd060,0.4,4.2,0.55,0.12,new THREE.Euler(Math.PI/2,0,0));k5Ring(hp,0xffffff,0.2,2.6,0.35,0.2,new THREE.Euler(0.3,0.6,0));G.hitstop=Math.max(G.hitstop||0,0.08);shakeAll(0.05,0.3);K5.dip=1.6;K5.log.push('orbhit');}continue;}
    const h=o.tgt,pi=h.player,T=T0(pi);if(players[pi].downed||!h.active){k5Del(o.g);K5.orbs.splice(i,1);continue;}
    if(o.left!==null&&o.left<=T.parry+0.08){SFX.parry();G.stats.parries++;if(FIN.guard)FIN.guard.hit(h,true);const part=active(1-pi);
      k5Flash(o.p.clone(),0xffe8a0,3.6,0.3);k5Ring(o.p.clone(),0xffd060,0.3,2.4,0.35,0.16,new THREE.Euler(0,h.face,0));FX.sparks(o.p.clone(),16,0xffd060);G.hitstop=Math.max(G.hitstop||0,0.05);
      if(o.st==='in'&&!G.solo&&part&&part.active&&!players[1-pi].downed){o.st='pass';o.tgt=part;o.v=6.2;o.left=null;o.t=0;k5s('orbPass');floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Другу!','#ffe08a');K5.log.push('orbpass');}
      else{o.st='up';o.v=13;o.t=0;floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'В небо!','#ffe08a');K5.log.push('orbup');}continue;}
    k5Del(o.g);K5.orbs.splice(i,1);FX.sparkle(o.p.clone(),8,0xb070ff);FX.sparks(o.p.clone(),14,0xb070ff);k5Flash(o.p.clone(),0xa060ff,2.6,0.3);
    if(h.guard){shieldBlock(h);floatText(h.pos.clone().add(new V3(0,h.d.height+1,0)),'в последний миг — отобьёшь!','#e0c8ff');continue;}
    damageHero(h,{kind:'enemy',ref:{pos:o.p.clone()}});if(!K5.said.orbTip){K5.said.orbTip=true;tip(pi,'Тёмный шар — нажми щит '+K(pi,'guard')+' в самый последний миг: он полетит к другу!',3);}}}
  function ravenMake(){const hs=k5Heroes();if(!hs.length)return null;const a=rand(0,6.28);const x=C.x+Math.cos(a)*9,z=C.z+Math.sin(a)*9;const pi=G.solo?G.soloPi:hs[Math.floor(rand(0,hs.length))].player;
    const e=makeFoe('k5raven',x,z,{pi,leash:60});e.k5=true;e.noMove=true;e.state='idle';e.pos.y=4;e.cd=rand(2.5,4.5);e.k5a=a;e.home=C.clone();e.tick=(e,dt)=>ravenTick(e,dt);K5.adds.push(e);k5s('raven');
    // появляется из лиловой дымки; глаза — красные огоньки (видно, куда смотрит); пикирует — красная линия на землю и шлейф
    const sp=new V3(x,4,z);k5Flash(sp,0x8a50ff,3,0.4);k5Feathers(sp,8,0.8);
    e.k5eyes=[-1,1].map(sd=>{const g=k5Glow(0xff3050,0.32);g.position.set(sd*0.09,1.2,0.6);e.L.body.add(g);return g;});
    const ln=k5Prop(new THREE.Mesh(new THREE.PlaneGeometry(0.16,1),k5Add(0xff3050,{opacity:0})));ln.raycast=()=>{};e.k5line=ln;
    e.k5trail=k5Trail(()=>e.alive&&e.g.parent?e.g.position.clone().add(new V3(0,0.9,0)):null,0xff3858,{size:0.38,life:0.3,every:0.04});e.k5trail.on=true;return e;}
  function ravenTick(e,dt){const L=e.L;const fl=e.state==='recover'&&e.dazeT>0||e.state==='broken'?0.1:1;L.wings.forEach(w=>{w.g.rotation.z=w.s*Math.sin(G.time*(e.pos.y>2?9:16))*0.7*fl;});
    if(players[e.pi].downed)e.pi=1-e.pi;if(G.solo)e.pi=G.soloPi;const h=active(e.pi);if(!h)return;const dx=h.pos.x-e.pos.x,dz=h.pos.z-e.pos.z,d=Math.hypot(dx,dz)||1;
    if(e.state==='idle'){if(e.cd>1.0||!K5.fight){e.k5a+=dt*0.7;const tx=C.x+Math.cos(e.k5a)*7,tz=C.z+Math.sin(e.k5a)*6;e.pos.x=damp(e.pos.x,tx,2,dt);e.pos.z=damp(e.pos.z,tz,2,dt);e.pos.y=damp(e.pos.y,3.8,2,dt);e.face=Math.atan2(tx-e.pos.x,tz-e.pos.z);return;}
      if(d>1.4){const s=Math.min(d-1.4,8*dt);e.pos.x+=dx/d*s;e.pos.z+=dz/d*s;}e.pos.y=damp(e.pos.y,0.9,5,dt);if(e.cd<0.95&&!e.k5cw){e.k5cw=true;k5s('raven');}}
    else if(e.state==='ready'||e.state==='wind'||e.state==='strike'){e.pos.y=damp(e.pos.y,0.9,5,dt);}
    else if(e.state==='recover'||e.state==='stagger'){if(e.dazeT>0)e.pos.y=damp(e.pos.y,0.25,8,dt);else{e.pos.y=damp(e.pos.y,4,2,dt);if(e.pos.y>3.2&&e.state==='recover'){e.state='idle';e.cd=rand(2.5,4.5);e.k5cw=false;}}}
    else if(e.state==='broken')e.pos.y=damp(e.pos.y,0.25,8,dt);
    if(e.state!=='idle'||e.cd<=1)e.face=Math.atan2(dx,dz);
    ravenFx(e,h,dt);}
  // эффекты ворона: глаза горят ярче перед пике, красная линия-прицел к герою, промах — удар о землю, пыль и звёздочки над головой
  function ravenFx(e,h,dt){const dive=e.state==='ready'||e.state==='wind'||(e.state==='idle'&&e.cd<=1&&K5.fight);const st=e.state;
    if(e.k5eyes)e.k5eyes.forEach(g=>{g.scale.setScalar(dive?0.55+0.15*Math.sin(G.time*20):0.3);});
    const ln=e.k5line;if(ln){const on=(st==='wind'||st==='ready')&&h;ln.material.opacity=damp(ln.material.opacity,on?0.55+0.35*Math.abs(Math.sin(G.time*12)):0,14,dt);
      if(h){const a=e.g.position.clone().add(new V3(0,0.9,0)),b=new V3(h.pos.x,0.15,h.pos.z),d=b.clone().sub(a),L=d.length()||0.01;ln.position.copy(a).addScaledVector(d,0.5);ln.scale.set(1,L,1);
        ln.quaternion.setFromUnitVectors(new V3(0,1,0),d.normalize());}}
    if(e.k5trail)e.k5trail.every=st==='strike'||dive?0.025:0.5;
    if(st==='strike'&&e.k5ps!=='strike'){k5Feathers(e.g.position.clone().add(new V3(0,0.9,0)),5,0.6);}
    if((st==='recover'||st==='stagger')&&e.dazeT>0&&!e.k5crash){e.k5crash=true;const p=new V3(e.pos.x,0.1,e.pos.z);FX.dust(p,12,0x8a7a6a,1.1);k5Ring(p,0xffffff,0.3,2.2,0.45,0.12);k5Feathers(p.clone().add(new V3(0,0.5,0)),10,1.1);
      const ring=k5Prop(new THREE.Group());for(let i=0;i<3;i++){const st2=new THREE.Mesh(FX.geo.star,k5Add(0xffe27a));st2.scale.setScalar(0.16);ring.add(st2);}e.k5stars=ring;}
    if(e.dazeT<=0)e.k5crash=false;
    if(e.k5stars){const R0=e.k5stars;if(e.dazeT>0&&e.alive){R0.position.set(e.pos.x,e.pos.y+1.45,e.pos.z);R0.rotation.y+=dt*6;R0.children.forEach((m,i)=>{const a=i/3*Math.PI*2;m.position.set(Math.cos(a)*0.42,0.06*Math.sin(G.time*8+i),Math.sin(a)*0.42);m.lookAt(camS.position);});}
      else{k5Del(R0);e.k5stars=null;}}
    e.k5ps=st;}
  function needleRain(n,around){k5s('needles');const hs=k5Heroes();for(let i=0;i<n;i++){const h=around?null:hs[i%Math.max(1,hs.length)];const base=around||(h?h.pos:C);const p=inArena(base.clone().add(new V3(rand(-2.4,2.4),0,rand(-2.4,2.4))),0.8);
    later(i*0.16,()=>{if(!K5.fight)return;needlePortal(p,1.55);k5Zone(p,1.3,1.55,0xff4a5a,q=>{if(!K5.fight)return;needleFall(q);for(const x of k5Heroes())if(hd(x.pos,q)<1.45)k5Hurt(x,q);});});}}
  // над красным кругом в небе раскрывается лиловый знак — оттуда и падают иглы
  function needlePortal(p,dur){const g=k5Decal(K5TEX.rune,0xc080ff,1.5,new V3(p.x,9.5,p.z),0);g.rotation.x=Math.PI/2;const gl=k5Prop(k5Glow(0x9a60ff,3.2));gl.position.set(p.x,9.5,p.z);
    k5fx(dur+0.5,k=>{const u=k*(dur+0.5),a=u<0.3?u/0.3:u>dur?Math.max(0,1-(u-dur)/0.5):1;g.material.opacity=0.9*a;g.scale.setScalar(0.4+0.6*CE.outBack(Math.min(1,u/0.35)));g.rotation.z+=0.06;gl.material.opacity=0.7*a;},()=>{k5Del(g);k5Del(gl);});}
  function needleFall(q){for(let j=0;j<4;j++){const m=k5Prop(new THREE.Mesh(new THREE.ConeGeometry(0.07,0.95,5),MB(0xf0e8ff)));m.rotation.x=Math.PI;const o=new V3(q.x+rand(-0.8,0.8),10,q.z+rand(-0.8,0.8));m.position.copy(o);
    const str=new THREE.Mesh(new THREE.PlaneGeometry(0.22,2.6),k5Add(0xd8c0ff,{map:K5TEX.beam,opacity:0.9}));str.position.y=-1.5;m.add(str);   // светящийся след за иглой
    k5fx(0.28+j*0.04,k=>{m.position.y=lerp(10,0.4,k*k);str.lookAt(camS.position.x,m.position.y-1.5,camS.position.z);},()=>{const c=new V3(o.x,0.1,o.z);FX.sparks(c.clone().add(new V3(0,0.2,0)),7,0xe8d8ff);k5Ring(c,0xe0c8ff,0.15,1.3,0.32,0.18);
      if(j===0){const cr=k5Decal(K5TEX.crack,0x9a60ff,1.4,c,0.9);k5fx(1.4,kk=>{cr.material.opacity=0.9*(1-kk);},()=>k5Del(cr));k5Flash(c.clone().add(new V3(0,0.4,0)),0xd0b0ff,2.2,0.25);}
      m.remove(str);later(0.6,()=>k5Del(m));});}k5s('strike');}
  function vortex(){const hs=k5Heroes();if(!hs.length)return;const c=inArena(hs[Math.floor(rand(0,hs.length))].pos.clone().add(new V3(rand(-2,2),0,rand(-2,2))),2);k5s('vortex');K5.log.push('vortex');
    // по отзыву 2: светящаяся спираль на земле, тёмное «око» в центре, крутящаяся воронка-конус и искры, что по спирали уходят внутрь
    const g=k5Prop(new THREE.Group());g.position.set(c.x,0.05,c.z);const sp=new THREE.Mesh(new THREE.PlaneGeometry(11,11),k5Add(0x9a60ff,{map:K5TEX.spiral,opacity:0}));sp.rotation.x=-Math.PI/2;sp.position.y=0.06;g.add(sp);
    const eyeD=new THREE.Mesh(new THREE.CircleGeometry(0.9,24),MB(0x140a24,{transparent:true,opacity:0,depthWrite:false}));eyeD.rotation.x=-Math.PI/2;eyeD.position.y=0.08;g.add(eyeD);
    const fun=new THREE.Mesh(new THREE.CylinderGeometry(2.4,0.35,4.2,24,1,true),k5Add(0x7a4ad0,{map:K5TEX.beam,opacity:0}));fun.position.y=2.1;g.add(fun);
    const rings=[];for(let i=0;i<3;i++){const m=new THREE.Mesh(new THREE.TorusGeometry(1.2+i*1.3,0.07,5,40),k5Add(0xb080ff,{opacity:0}));m.rotation.x=-Math.PI/2;m.position.y=0.12+i*0.2;g.add(m);rings.push(m);}
    const motes=[];for(let i=0;i<18;i++){const m=k5Glow(0xd0b0ff,0.35);g.add(m);motes.push({m,a:rand(0,6.28),r:rand(1,5.2),y:rand(0,0.4)});}
    k5fx(3.4,(k,dt)=>{const a=k<0.12?CE.outBack(k/0.12):k>0.85?1-(k-0.85)/0.15:1;g.rotation.y+=dt*4;sp.material.opacity=0.85*a;sp.scale.setScalar(Math.max(0.05,a));eyeD.material.opacity=0.8*a;fun.material.opacity=0.45*a;fun.rotation.y-=dt*7;
      rings.forEach((m,i)=>{m.scale.setScalar(1-0.35*((G.time*1.4+i*0.33)%1));m.material.opacity=0.7*a;});
      motes.forEach(q=>{q.a+=dt*(3+6/(q.r+0.5));q.r-=dt*2.2;q.y+=dt*0.9;if(q.r<0.25){q.r=rand(4,5.4);q.y=0;}q.m.position.set(Math.cos(q.a)*q.r,q.y,Math.sin(q.a)*q.r);q.m.material.opacity=a*Math.min(1,q.r/1.5);});
      if(!K5.fight)return;
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
    if(KB.state==='k5crash'){KB.k5k+=dt;KB.pos.y=Math.max(0,KB.pos.y-dt*9);if(KB.pos.y<=0){KB.pos.y=0;k5s('land');shakeAll(0.08,0.4);FX.dust(KB.pos.clone(),18,0x8a7a6a);kosCrash();KB.state='broken';KB.t=0;KB._b=false;K5.crash=false;}}
    if(KB.state==='idle'&&K5.live){KB.state='k5rise';KB.embers=Math.max(2,Math.ceil(KB.maxEmb/2));floatText(kosTop(),'Спесь вернулась!','#c8a8ff');k5s('flyUp');}
    const want=(G.solo?2:3);if(K5.adds.filter(e=>e.kind==='k5raven').length<want){K5.rvT=(K5.rvT==null?1:K5.rvT)-dt;if(K5.rvT<=0){K5.rvT=5;ravenMake();if(!K5.said.rav){K5.said.rav=true;bark(KS,'koschei','Вороны, ко мне!',1.7);}}}}
  // гроза: небо, туман и свет темнеют плавно (релизный рендер берёт небо из фона и тумана)
  const STORM={bg:scene.background?scene.background.clone():new THREE.Color(0x8aa0c8),fog:scene.fog?scene.fog.color.clone():null,amb:amb.intensity,sun:sun.intensity,sunC:sun.color.clone(),ambC:amb.color.clone()};
  window.k5StormSet=(v,now)=>{K5.stormTo=v;if(now)K5.storm=v;};
  let vig=document.getElementById('k5storm');if(!vig){vig=document.createElement('div');vig.id='k5storm';vig.style.cssText='position:fixed;inset:0;pointer-events:none;z-index:3;opacity:0;background:radial-gradient(ellipse at 50% 45%,rgba(40,20,70,0) 45%,rgba(40,20,70,.55) 100%),linear-gradient(rgba(60,40,110,.18),rgba(30,20,60,.18))';document.body.appendChild(vig);}
  function stormTick(dt){K5.storm=damp(K5.storm,K5.stormTo,0.8,dt);const k=K5.storm;vig.style.opacity=(G.state==='play'&&!FIN.titleOn?k:0).toFixed(3);clouds.visible=k>0.05;clouds.rotation.y+=dt*0.03;clouds.children.forEach(c=>{c.material.opacity=0.85*k;});
    const dark=new THREE.Color(0x2a2440);if(scene.background&&scene.background.isColor)scene.background.copy(STORM.bg).lerp(dark,k*0.8);if(scene.fog&&STORM.fog)scene.fog.color.copy(STORM.fog).lerp(dark,k*0.75);
    amb.intensity=STORM.amb*(1-0.45*k);sun.intensity=STORM.sun*(1-0.65*k);sun.color.copy(STORM.sunC).lerp(new THREE.Color(0xb8a8ff),k*0.5);
    if(k>0.5&&!G.cine){K5.thT=(K5.thT==null?5:K5.thT)-dt;if(K5.thT<=0){K5.thT=rand(5,9);const f=$('flash');if(f){f.style.transition='opacity .08s';f.style.opacity=0.3;setTimeout(()=>{f.style.transition='opacity .5s';f.style.opacity=0;},90);}k5s('thunder');
        // молния бьёт за краем поляны (в море) — красиво и не опасно; туча над ней вспыхивает
        const a=rand(0,6.28),bp=new V3(C.x+Math.cos(a)*rand(17,24),0,C.z+Math.sin(a)*rand(17,24));k5Bolt(bp,0xd8b0ff);const cl=clouds.children[Math.floor(rand(0,clouds.children.length))];if(cl){cl.material.color.setHex(0xb8a0ff);later(0.25,()=>cl.material.color.setHex(0x2a2438));}}}
    // тучи мерцают изнутри
    if(k>0.3&&Math.random()<dt*1.5){const cl=clouds.children[Math.floor(rand(0,clouds.children.length))];if(cl&&cl.material.color.getHex()===0x2a2438){cl.material.color.setHex(0x4a3a70);later(0.12,()=>cl.material.color.setHex(0x2a2438));}}}
  // дождь: тонкие косые струи вокруг поляны (инстансы); сила — по грозе
  const RAIN=(()=>{const N=260,m=new THREE.InstancedMesh(new THREE.BoxGeometry(0.025,0.9,0.025),k5Add(0xb8c8ff,{opacity:0.32,side:THREE.FrontSide}),N);m.frustumCulled=false;m.userData.noBatch=true;m.raycast=()=>{};
    const L=[];for(let i=0;i<N;i++)L.push(new V3(C.x+rand(-17,17),rand(0,14),C.z+rand(-17,17)));m.count=0;W.group.add(m);return {m,L,mt:new THREE.Matrix4(),q:new THREE.Quaternion().setFromEuler(new THREE.Euler(0.18,0,0.12)),s:new V3(1,1,1)};})();
  function rainTick(dt){const k=K5.storm||0,n=Math.round(RAIN.L.length*clamp((k-0.35)/0.65,0,1));RAIN.m.count=n;if(!n)return;
    for(let i=0;i<n;i++){const p=RAIN.L[i];p.y-=dt*16;p.z+=dt*2.8;p.x+=dt*1.6;if(p.y<0){p.y+=14;p.x=C.x+rand(-17,17);p.z=C.z+rand(-17,17);}RAIN.mt.compose(p,RAIN.q,RAIN.s);RAIN.m.setMatrixAt(i,RAIN.mt);}RAIN.m.instanceMatrix.needsUpdate=true;}
  function kosCrash(){const p=new V3(KB.pos.x,0.1,KB.pos.z);k5Ring(p,0xffffff,0.5,6,0.6,0.08);k5Ring(p,0xb080ff,0.3,4,0.8,0.18);k5Flash(p.clone().add(new V3(0,1,0)),0xd0b0ff,6,0.4);
    const cr=k5Decal(K5TEX.crack,0x9a60ff,3,p,1);k5fx(2.2,k=>{cr.material.opacity=1-k;},()=>k5Del(cr));FX.stars(p.clone().add(new V3(0,3.6,0)),12);G.hitstop=Math.max(G.hitstop||0,0.1);}
  // полёт: под Кощеем — светящаяся руна (видно, где он), у груди — лиловое сияние, в движении — шлейф искр
  const flyRune=k5Decal(K5TEX.rune,0xb070ff,2.4,new V3(0,0.07,0),0);const flyAura=k5Prop(k5Glow(0x9a50ff,4));flyAura.material.opacity=0;
  const kChest=()=>KS.rig.chest.getWorldPosition(new V3());let flyTrail=null;
  function flyFx(dt){const fly=K5.live&&KB.pos.y>0.6&&(K5.st===3||K5.st===5)&&!G.cine;const h=KB.pos.y;
    flyRune.material.opacity=damp(flyRune.material.opacity,fly?clamp(0.95-h*0.06,0.45,0.95):0,6,dt);flyRune.position.set(KB.pos.x,0.07,KB.pos.z);flyRune.rotation.z+=dt*0.8;flyRune.scale.setScalar(1+0.04*Math.sin(G.time*3));
    flyAura.material.opacity=damp(flyAura.material.opacity,fly?0.75+0.2*Math.sin(G.time*5):0,6,dt);if(fly)flyAura.position.copy(kChest());
    if(fly&&!flyTrail){flyTrail=k5Trail(()=>K5.live&&KB.pos.y>0.6&&(K5.st===3||K5.st===5)?kChest().add(new V3(0,-1.2,0)):null,0x8a40ff,{size:1.1,life:0.6,every:0.05});}
    if(flyTrail&&!flyTrail.on)flyTrail=null;}
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
  function boneMake(x,z){const e=makeFoe('k5bone',x,z,{leash:30});e.k5=true;e.sideOpen=true;e.state='spawn';K5.adds.push(e);burst(new V3(x,0.4,z),0xe8e0c8,14,3);SFX.crash();
    if(G.solo){e.embers=e.maxEmb=2;}e.cd=rand(1.6,4.2);   // одному — щитники слабее и нападают вразнобой
    // встаёт из треснувшей земли в столбе лилового света; в стороны — обломки костей и пыль
    const p=new V3(x,0.08,z);const cr=k5Decal(K5TEX.crack,0xa070ff,1.9,p,1);k5fx(2.6,k=>{cr.material.opacity=1-k*k;cr.rotation.z+=0.002;},()=>k5Del(cr));
    k5Pillar(p,0x9a60ff,7,0.75,1.1);k5Ring(p,0xd0b0ff,0.3,2.6,0.6,0.16);FX.dust(p,12,0x8a7a6a,1.1);
    for(let i=0;i<8;i++){const a=rand(0,6.28);fxAdd('tetra',0xe8e0c8,p.clone().add(new V3(0,0.3,0)),new V3(Math.cos(a)*rand(1.5,3.5),rand(3,6),Math.sin(a)*rand(1.5,3.5)),{s:rand(0.06,0.11),life:rand(0.6,0.9),g:13,spin:10});}
    return e;}
  // «Кости, встаньте!» — пятеро щитников кольцом вокруг героев (по отзыву 2: был один-два); короткий ролик: Кощей вскидывает меч, земля трескается, кости встают по очереди
  function bonesRise(){K5.bones=true;const hs=k5Heroes(),cen=hs.length?hs.reduce((a,h)=>a.add(h.pos),new V3()).multiplyScalar(1/hs.length):C.clone();const pts=[];
    for(let i=0;i<5;i++){let best=null;for(let t=0;t<14;t++){const a=i/5*Math.PI*2+rand(-0.35,0.35)+0.3,r=rand(5.2,6.6);const q=inArena(new V3(cen.x+Math.cos(a)*r,0,cen.z+Math.sin(a)*r),1.4);
        if(HEROES.every(h=>hd(h.pos,q)>3)&&hd(q,KB.pos)>2.4&&pts.every(o=>hd(o,q)>2.6)){best=q;break;}if(!best)best=q;}pts.push(best);}
    const kp=KB.pos.clone(),face=KB.face,head=kp.clone().add(new V3(0,4.15,0)),pr=active(0),po=active(G.solo?G.soloPi:1)||pr;
    const F1=k5Face(head,face,0.5,5.2,-0.9),mid=pts.reduce((a,q)=>a.add(q),new V3()).multiplyScalar(0.2);
    play({dur:4.6,fov:48,camK:3,skip:true,k5:{mood:['#7a5cff',0.16],cues:[[0.05,()=>{KA.pose('sword',{antic:0.18,snap:true});k5s('cast');}],[0.5,()=>{CINE.punch(-4);CINE.trauma(0.25);}],
        ...pts.map((q,i)=>[1.15+i*0.28,()=>{boneMake(q.x,q.z);CINE.trauma(0.18);}]),[1.3,()=>ACT.emoteAll('fear',null,0.08)],[2.3,()=>CINE.dutch(0.06)],[3.4,()=>{CINE.dutch(0);ACT.emoteAll('pride',null,0.1);}],[4.1,()=>KA.pose('guard')]]},
      shots:[Object.assign(shot(0,F1.p,F1.l),{x:{fov:44,fov2:40,move:'push',amp:1}}),
        Object.assign(shot(1.0,[mid.x+Math.sin(face)*1+9,8.5,mid.z+9],[mid.x,0.8,mid.z],[mid.x+6,6.5,mid.z+10],[mid.x,1,mid.z],2.3),{x:{tr:'whip',ease:'inOutSine',fov:52,move:'none'}}),
        Object.assign(shot(3.3,[cen.x+3.2,1.4,cen.z+3.6],[cen.x,1.1,cen.z],[cen.x+2.6,1.6,cen.z+4.2],[cen.x,1.2,cen.z],1.3),{x:{tr:'cut',fov:46,move:'none'}})],
      says:[[0.15,1.7,'koschei','Кости, встаньте!']],end:()=>{KA.reset();}});}
  function stage4Tick(dt){if(KB.state==='k5leap'){leapTick(dt);return;}
    if(!G.solo&&players[K5.mark].downed)K5.mark=1-K5.mark;KB.pi=G.solo?G.soloPi:K5.mark;
    const mh=active(KB.pi);if(mh){eye.visible=true;eye.position.copy(headOf(mh)).add(new V3(0,0.35+0.08*Math.sin(G.time*5),0));eye.lookAt(camS.position);}
    if(KB.state==='wind'&&K5.delayNext&&KB.t<0.05){K5.delayNext=false;KB.wdur*=1.85;floatText(kosTop(),'…','#e0c8ff');}
    if(KB.state==='recover'&&KB.t>0.12&&KB.tgt&&K5.combo&&K5.combo.length){foeWind(KB);}
    else if(KB.state==='recover'&&KB.t>0.1&&(!K5.combo||!K5.combo.length)&&!KB._sw){KB._sw=true;if(!G.solo)K5.mark=1-K5.mark;}
    if(KB.state!=='recover')KB._sw=false;
    K5.leapT=(K5.leapT==null?9:K5.leapT)-dt;if(K5.leapT<=0&&KB.state==='idle'){K5.leapT=rand(10,13)+K5.fails[4];leap();}
    if(!K5.bones&&KB.embers<=Math.ceil(KB.maxEmb/2)&&KB.state!=='k5leap'&&KB.state!=='broken'){bonesRise();}}
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
  function needlePass(pi){const N=K5.needle,h=active(pi),o=active(1-pi);if(!N||N.holder!==h||!o||players[1-pi].downed||hd(h.pos,o.pos)>13||k5Locked(o)){SFX.miss();return;}
    N.holder=null;N.fly=true;const f=ndl.g.position.clone();SFX.whoosh();anim(0.5,k=>{const t=headOf(o);ndl.g.position.lerpVectors(f,t,k);ndl.g.position.y+=Math.sin(k*Math.PI)*1.6;ndl.g.rotation.z+=0.4;if(k>=1){N.fly=false;needleHold(o);floatText(t,'Поймал!','#ffe08a');}});K5.log.push('pass');}
  function needleTick(dt){const N=K5.needle;if(!N)return;if(G.solo&&N.holder&&N.holder!==active(G.soloPi)&&!players[G.soloPi].downed)needleHold(active(G.soloPi));
    if(N.holder){const h=N.holder;if(players[h.player].downed||!h.active){needleDrop(h);return;}ndl.g.position.copy(headOf(h)).add(new V3(0,0.4+0.08*Math.sin(G.time*4),0));ndl.g.rotation.set(0,G.time*2,Math.PI/2);}
    else if(N.ground){N.t+=dt;ndl.g.position.set(N.ground.x,0.3+0.1*Math.sin(G.time*4),N.ground.z);ndl.g.rotation.set(0,G.time*2,Math.PI/2);if(N.t>0.6)for(const h of k5Heroes())if(hd(h.pos,N.ground)<1.2){needleHold(h);floatText(headOf(h),'Подобрал иглу!','#ffe08a');break;}}}
  const forging=()=>{const N=K5.needle,h=N&&N.holder;return !!(h&&h.kind==='proshka'&&hd(h.pos,ANV)<2.1&&!k5Locked(h)&&!RG.on&&!players[h.player].downed);};
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
    if(KB.state==='k5crash'){KB.pos.y=Math.max(0,KB.pos.y-dt*9);if(KB.pos.y<=0){k5s('land');shakeAll(0.07,0.35);FX.dust(KB.pos.clone(),16,0x8a7a6a);kosCrash();KB.state='broken';KB.t=0;KB._b=false;K5.crash=false;}}
    // помощники: ключи (на того, кто без иглы), вороны, иглы у наковальни
    K5.keyT=(K5.keyT==null?7:K5.keyT)-dt;if(K5.keyT<=0){K5.keyT=G.solo?16:12;const t2=G.solo?null:(hold?active(1-hold.player):active(1));if(t2&&!players[t2.player].downed&&!k5Locked(t2)&&!K5.adds.some(e=>e.kind==='k5key'))keyMake(t2);}
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
      K5.keyT=(K5.keyT==null?5:K5.keyT)-dt;const nk=K5.adds.filter(e=>e.kind==='k5key').length;if(K5.keyT<=0&&nk<(G.solo?1:2)&&KB.state!=='broken'){K5.keyT=rand(8,11)+(G.solo?3:0);const tgp=G.solo?G.soloPi:1-(KB.pi||0);const th=active(tgp);if(th&&!players[tgp].downed&&!k5Locked(th)){keyMake(th);if(!K5.said.k9){K5.said.k9=true;bark(KS,'koschei','Заприте их!',1.4);}anim(0.6,k=>{KS.armR.rotation.x=-2.2*Math.sin(k*Math.PI);});}}}
    if(K5.st===3)stage3Tick(dt);if(K5.st===4)stage4Tick(dt);if(K5.st===5)stage5Tick(dt);}
  // поза и меч: замах, удар, полёт
  function kosAnim(dt){if(!K5.live||KA.on)return;const s=KB.state;if(s!==K5.prevS){if(s==='strike'){k5s('swing');KS.armR.rotation.x=0.9;}if(s==='wind')k5s('warn');K5.prevS=s;}
    if(s==='wind'){const k=clamp(KB.t/Math.max(0.1,KB.wdur),0,1);KS.armR.rotation.x=damp(KS.armR.rotation.x,-2.6,10,dt);if(sword.visible)sword.userData.edge.material.opacity=0.5+0.5*k;}
    else if(s==='strike'){}else if(s==='k5cast'||s==='k5rise'){KS.armR.rotation.x=damp(KS.armR.rotation.x,-1.1+0.3*Math.sin(G.time*2),3,dt);}else if(s!=='k5leap')KS.armR.rotation.x=damp(KS.armR.rotation.x,0,5,dt);
    KS.g.rotation.x=damp(KS.g.rotation.x,s==='broken'?0.25:s==='k5dive'?0.4:0,5,dt);if(sword.visible&&s!=='wind')sword.userData.edge.material.opacity=0.55+0.25*Math.sin(G.time*5);}
  /* ---------- этапы: начало, проигрыш, победа ---------- */
  const PAUSE={1:'Этап 1 «Чёрные свечи». Купол держат восемь свечей: погасите все — отбей синюю каплю обратно в свечу, полей водой Йоши или ударь пять раз. Погасшая через 12 секунд (одному — через 30) горит снова. Красный круг — сюда ударит молния.',
    2:'Этап 2 «Ключ и искорка». Отбивайте удары Кощея в последний миг: над другом загорается искорка — отбил с искоркой, спесь гаснет вдвое. Ключ падает сверху — отбей его щитом. Скованного сам замок не отпустит: друг сбивает его пятью ударами (одному — переключись на другого героя). Скуют всех четверых — этап заново. Спесь сбита — оба ударьте рядом с ним.',
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
    setBar();const go=()=>{K5.fight=true;K5.t0=G.time;K5.hint0=G.time;if(K5.live&&KB.state==='k5wait')KB.state=K5.wake;setBar();if(n===1&&!K5.said.k01){K5.said.k01=true;later(0.4,()=>say('pelageya','Смотрите: купол держат чёрные свечи! Погасите все восемь!',4.4));}
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
  /* ---------- ролики (по отзыву 2 — режиссура заново) ----------
     Каждый ролик — мини-история из 4–8 шотов разной крупности (общий, средний, крупный, деталь); камера движется по сплайнам
     с easing (наезд, отъезд, проезд, кран, облёт, слежение), говорящего видно в лицо; правило 180° — камеры по одну сторону
     линии «герои — Кощей». Кощей играет позами на пружинах (замах → действие → доводка, K5POSE в late_92), герои — эмоциями
     (late_83); акценты — hit-stop, slow-mo, FOV-punch, dolly-zoom, голландский угол, вспышки, кольца, столбы света, настроение. */
  const hH=h=>new V3(h.pos.x,h.pos.y+h.d.height*0.82,h.pos.z);
  const kH=()=>KS.head.getWorldPosition(new V3());
  const SH=(t,p,l,x)=>Object.assign(shot(t,p,l),{x:x||{}});
  const MV=(t,p,l,p2,l2,dur,x)=>Object.assign(shot(t,p,l,p2,l2,dur),{x:x||{}});
  const em=(h,type)=>()=>{if(h&&h.g.visible)ACT.emote(h,type);};
  const emAll=(type,st)=>()=>ACT.emoteAll(type,null,st==null?0.09:st);
  const npcEm=(o,type)=>()=>{const n=ACT.npcs.find(q=>q.o===o);if(n)n.em={type,t:0,d:0.7};};
  const pose=(n,o)=>()=>KA.pose(n,o);
  const COLD='#6f86ff',WARM='#ffb870',GOLD='#ffd27a',STORY='#a8b0ff',DARK='#7a5cff';
  const KC=new V3(0,0,-17.5);   // где Кощей стоит в роликах между этапами (лицом к героям)
  const heroLine=(z,face)=>HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,z,0);h.face=face==null?Math.PI:face;h.vel.set(0,0,0);});
  const hWalk=(h,x,z,dur,face)=>{const f=h.pos.clone();h.face=Math.atan2(x-f.x,z-f.z);anim(dur,k=>{const e=CE.inOutSine(k);h.pos.x=lerp(f.x,x,e);h.pos.z=lerp(f.z,z,e);h.vel.set(0,0,0);if(k>=1&&face!=null)h.face=face;});};
  const kTurn=(face,dur)=>{const f=KS.g.rotation.y;let d=face-f;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;anim(dur||0.45,k=>{KS.g.rotation.y=f+d*CE.outBack(k);});};
  const kWalk=(x,z,dur,face)=>{const f=KS.g.position.clone();KS.g.rotation.y=Math.atan2(x-f.x,z-f.z);let st=0;anim(dur,k=>{const e=CE.inOutSine(k);KS.g.position.x=lerp(f.x,x,e);KS.g.position.z=lerp(f.z,z,e);const n=Math.floor(k*dur*5.2/Math.PI);if(n>st&&k<1){st=n;k5s('step');}
      KS.g.position.y=f.y+Math.abs(Math.sin(k*dur*5.2))*0.07;if(k>=1){KS.g.position.y=f.y;if(face!=null)kTurn(face,0.45);}});};
  const kFly=(to,dur,ease)=>{const f=KS.g.position.clone();anim(dur,k=>{KS.g.position.lerpVectors(f,to,(CE[ease]||CE.inOutCubic)(k));});};
  const lHand=new THREE.Object3D();lHand.position.set(0,-1.25,0.12);KS.rig.armL2.add(lHand);
  const zvenTo=(p,dur)=>{Z.mode='script';Z.vis=true;Z.shown=true;const f=Z.pos.clone();anim(dur||0.8,k=>{const e=CE.inOutCubic(k);Z.pos.lerpVectors(f,p,e);Z.pos.y+=Math.sin(Math.PI*e)*0.8;});};
  // золотые искорки сказа поднимаются вокруг рассказчика
  function storyMotes(c,dur,n,col){const parts=[];for(let i=0;i<(n||16);i++){const s=k5Prop(k5Glow(col||0xffe08a,rand(0.16,0.3)));parts.push({s,a:rand(0,6.28),r:rand(0.45,1.5),y:rand(0,2.4),v:rand(0.35,0.8),w:rand(-1.4,1.4)});}
    k5fx(dur,(k,dt)=>{const C0=typeof c==='function'?c():c;const fa=k<0.1?k/0.1:k>0.85?(1-k)/0.15:1;for(const q of parts){q.a+=q.w*dt;q.y+=q.v*dt;if(q.y>2.6){q.y=0;q.r=rand(0.45,1.5);}
      q.s.position.set(C0.x+Math.cos(q.a)*q.r,C0.y+q.y,C0.z+Math.sin(q.a)*q.r);q.s.material.opacity=Math.sin(Math.min(1,q.y/2.6)*Math.PI)*fa;}},()=>parts.forEach(q=>k5Del(q.s)));}
  // имя вернулось: столб света за героем (от камеры), кольцо, звёзды
  function nameBurst(h,col){const p=h.pos.clone(),bk=new V3(p.x-shared.pos.x,0,p.z-shared.pos.z).normalize();k5Pillar(new V3(p.x+bk.x*0.9,0,p.z+bk.z*0.9),col,6,0.32,1.1);k5Ring(new V3(p.x,0.1,p.z),col,0.3,3,0.9,0.12);k5Flash(hH(h).add(new V3(0,0.9,0)),col,1.6,0.4);FX.stars(hH(h),12,col);FX.sparkle(hH(h),12,0xffffff);}
  // золотая нить сказа обвивает Кощея: нити от героев, кольца сжимаются, вспышка
  function bindBeat(){const c=KS.g.position.clone().add(new V3(0,2.4,0));for(const h of HEROES){if(!h.g.visible)continue;k5Thread(()=>hH(h),()=>KS.g.position.clone().add(new V3(0,2.4,0)));}k5s('bind');
    k5Flash(c,0xffe08a,5,0.5);k5Ring(c,0xffd060,0.4,3.4,0.6,0.1,new THREE.Euler(Math.PI/2,0,0));FX.sparks(c,20,0xffd060);
    for(let i=0;i<3;i++)later(0.08+i*0.12,()=>{const r=k5Prop(new THREE.Mesh(new THREE.TorusGeometry(1,0.05,5,32),k5Add(0xffd060)));r.rotation.x=Math.PI/2;r.position.copy(KS.g.position).add(new V3(0,1.2+i*1.1,0));
      k5fx(0.7,k=>{r.scale.setScalar(lerp(2.2,0.55,CE.outCubic(k)));r.material.opacity=1-k*k;},()=>k5Del(r));});}
  function intro(){F.stage='introCine';heroLine(6.5);KS.g.position.set(10,0,-16.5);KS.g.rotation.y=-Math.PI/2;KS.g.visible=false;book.g.visible=false;gor.g.position.y=0.5;
    const ksA=new V3(-2.4,0,-18),PE=new V3(-4.4,0,-17.4),BK=new V3(-3.5,1.0,-19),pe=T.pelageya,pr=T.proshka,po=T.potap,yo=T.yosha;
    const cen=()=>HEROES.reduce((a,h)=>a.add(h.pos),new V3()).multiplyScalar(0.25);
    const O=new V3(0,1.8,-27.5),orb=a=>[O.x+Math.sin(a)*10.5,3.2,O.z+Math.cos(a)*10.5];
    const F8=k5Face(new V3(ksA.x,4.15,ksA.z),Math.PI*0.2,-0.3,3.4,-0.45),F8b=k5Face(new V3(ksA.x,4.15,ksA.z),Math.PI*0.2,-0.3,2.8,-0.35);
    const pd=new V3(BK.x-PE.x,0,BK.z-PE.z).normalize(),peF=Math.atan2(pd.x,pd.z),F10=k5Face(new V3(PE.x,1.1,PE.z),peF,0.5,1.9,0.08);
    const KH=new V3(KP.x,4.15,KP.z);
    play({dur:40.2,fov:46,camK:2,k5:{mood:[WARM,0.1],cues:[[3.4,()=>CINE.trauma(0.12)],[11.7,()=>CINE.mood(COLD,0.12)],[17.0,()=>CINE.mood(COLD,0.16)],[18.9,()=>{KA.shake=1.3;}],[19.3,()=>CINE.dollyZoom(0.16,1.2,0.8)],
        [26.1,()=>CINE.dutch(0.04)],[30.6,()=>CINE.dutch(0)],[31.15,()=>{CINE.hitstop(4);CINE.punch(-6);CINE.trauma(0.35);CINE.flashDip('#c8a0ff',0.35);}],[33.0,emAll('fear',0.08)],
        [36.0,()=>{CINE.mood(WARM,0.14);CINE.rimPulse(0.7);}],[36.3,emAll('pride',0.12)],[38.0,emAll('nod',0.1)]]},
      shots:[MV(0,[30,26,34],[0,10,-28],[16,11,12],[0,4,-22],3.4,{pts:[[24,19,25]],ease:'inOutSine',fov:52,fov2:46,move:'none'}),
        MV(3.4,[-3.2,4.6,-14.8],[-13,3.4,-25],[-5.0,3.6,-16.8],[-13,2.6,-25.2],3.2,{ease:'outCubic',fov:46,move:'none'}),
        MV(6.6,orb(-0.95),[O.x,1.6,O.z],orb(0.25),[O.x,1.8,O.z],2.8,{pts:[orb(-0.35)],ease:'inOutSine',fov:46,move:'none'}),
        SH(9.4,[1,1.3,-0.5],[0,0.9,4],{pf:()=>cen().add(new V3(1.0,1.3,-4.4)),lf:()=>cen().add(new V3(0,0.95,0)),lk:6,fov:42,move:'none'}),
        SH(11.6,[3.6,2.1,0.6],[10,2.4,-16.5],{lf:()=>KS.g.position.clone().add(new V3(0,2.4,0)),lk:4,fov:46,move:'push',amp:0.6}),
        SH(13.8,[6,3.4,-14],[6,3,-16],{pf:()=>KS.g.position.clone().add(new V3(-3.4,3.2,3.6)),lf:()=>lHand.getWorldPosition(new V3()).lerp(kH(),0.72),lk:5,fov:44,move:'none'}),
        SH(15.4,[-5.6,2.0,-16.6],[BK.x+0.2,1.3,BK.z],{fov:40,move:'push',amp:1}),
        MV(17.0,F8.p,F8.l,F8b.p,F8b.l,3.6,{ease:'inOutSine',fov:40,fov2:37,move:'none'}),
        SH(20.6,[PE.x-pd.x*1.2+0.39,1.45,PE.z-pd.z*1.2+0.22],[BK.x,1.05,BK.z],{fov:38,move:'push',amp:0.8}),
        SH(22.4,F10.p,F10.l,{fov:40,move:'push',amp:0.7}),
        MV(24.2,[4.2,2.6,-17.6],[-2.2,2.6,-19.6],[3.8,3.0,-21.0],[-1.8,2.8,-22.6],1.9,{lf:()=>KS.g.position.clone().add(new V3(0,2.6,0)),lk:6,fov:46,move:'none'}),
        MV(26.0,[KP.x+1.5,2.3,KP.z+4.8],[KH.x,3.85,KH.z],[KP.x+1.05,2.7,KP.z+3.9],[KH.x,3.95,KH.z],4.6,{ease:'inOutSine',fov:42,fov2:38,move:'none'}),
        MV(30.8,[KP.x+5.5,1.0,KP.z+6.5],[KP.x,2.6,KP.z],[KP.x+6.8,3.6,KP.z+8.2],[KP.x,2.8,KP.z],1.8,{ease:'outCubic',fov:50,move:'none'}),
        MV(32.6,[13,12,5],[0,0.6,-12],[5,13.5,8.5],[0,0.6,-13],2.0,{pts:[[9.5,13,7.4]],ease:'inOutSine',fov:54,move:'none',tr:'whip'}),
        SH(34.6,[1.4,1.7,0.8],[0.6,2.0,-3.4],{fov:44,move:'push',amp:0.8})],
      says:[[0.3,4.6,null,'<i>Буян, засохший дуб, рассвет. Горыныч к корням Кузьмину наковальню несёт —</i><br><i>И ложится рядом, как скала тёплая, ждёт.</i>',true],
        [6.6,4.6,null,'<i>Вокруг поляны — все, кому герои помогли.</i><br><i>Ближе всех — четверо помощников из Сказов: молчат, слушают, как могли.</i>',true],
        [11.7,4.4,null,'<i>Кощей сам приходит, с тетрадкой Пелагеи в руке.</i><br><i>Кладёт на камень: стыдно ему — но вернуть решил, налегке.</i>',true],
        [17.2,3.4,'koschei','Я дочитал. А конца у сказки нет — пусто.'],[20.7,3.4,null,'<i>Пелагея на последнюю страницу глядит: «Жил-был мальчишка…» —</i><br><i>И больше ни строчки, ни слова, ни книжки.</i>',true],
        [26.3,4.4,'koschei','Всё равно сказок не будет.<br>В них я всегда один — никто не полюбит.'],[30.8,3.4,null,'<i>Кощей поднимает руку — и вокруг него вспыхивают чёрные свечи и волшебный купол.</i>',true],
        [34.8,4.9,'zven','Сегодня мы не деремся. Защищайтесь —<br>И сказку вспоминайте, не сдавайтесь!']],
      events:[{t:0.2,fn:()=>k5s('dawn')},{t:3.4,fn:()=>{const y0=gor.g.position.y;anim(1.6,k=>{gor.g.position.y=lerp(y0,-0.6,CE.outBack(k));gor.g.scale.y=0.75*(1-0.06*Math.sin(Math.PI*Math.min(1,k*1.6)));});later(1.0,()=>{FX.dust(new V3(-13,0,-23.5),14,0x9a8a6a,1.4);if(SFX.thud)SFX.thud();});}},
        {t:6.8,fn:()=>HM.forEach((h,i)=>later(i*0.35,()=>{const n=ACT.npcs.find(q=>q.o===h.m);if(n)n.em={type:'nod',t:0,d:0.7};}))},
        {t:8.6,fn:()=>HEROES.forEach((h,i)=>hWalk(h,-3+i*2,-2.6,4.0,Math.PI))},{t:10.2,fn:em(pr,'hop')},{t:10.6,fn:em(yo,'tilt')},{t:11.0,fn:em(po,'nod')},
        {t:11.6,fn:()=>{KS.g.visible=true;book.g.visible=true;kWalk(ksA.x,ksA.z,3.8);k5s('reveal');}},{t:12.0,fn:emAll('fear',0.1)},{t:12.6,fn:()=>hWalk(yo,po.pos.x+0.4,po.pos.z+1.0,0.7,Math.PI)},
        {t:15.4,fn:()=>{kTurn(Math.atan2(BK.x-ksA.x,BK.z-ksA.z),0.4);KA.pose('offer',{antic:0.2});}},
        {t:15.9,fn:()=>{const f=book.g.position.clone();book.g.userData.free=true;anim(0.6,k=>{book.g.position.lerpVectors(f,BK,CE.inOutSine(k));book.g.position.y+=Math.sin(k*Math.PI)*0.4;});later(0.62,()=>{k5s('book');FX.dust(BK.clone(),6,0xd8c8a8,0.6);k5Flash(BK.clone().add(new V3(0,0.2,0)),0xffe0a0,1.4,0.4);});}},
        {t:16.7,fn:()=>{kTurn(Math.PI*0.2,0.5);KA.pose('slump');}},{t:20.6,fn:()=>{placeOnGround(pe,PE.x,PE.z,0);pe.face=peF;}},{t:21.0,fn:()=>FX.sparkle(BK.clone().add(new V3(0,0.3,0)),8,0xffe08a)},
        {t:22.6,fn:em(pe,'surprise')},{t:23.6,fn:em(pe,'droop')},{t:24.2,fn:()=>{KA.pose('idle');kWalk(KP.x,KP.z,1.8,0);}},{t:26.1,fn:pose('proud')},{t:28.6,fn:pose('slump')},
        {t:30.8,fn:()=>{KA.pose('cast',{antic:0.32,anticK:0.45,snap:true});k5s('cast');k5Gather(()=>KS.hand.getWorldPosition(new V3()),0xc090ff,0.35,14,2);}},
        {t:31.15,fn:()=>{dome.visible=true;dome.scale.setScalar(0.01);anim(0.9,k=>dome.scale.setScalar(Math.max(0.01,CE.outBack(k))));const p=KP.clone();p.y=0.08;const rn=k5Decal(K5TEX.rune,0xb070ff,3.6,p,1);k5fx(1.6,k=>{rn.material.opacity=1-k;rn.rotation.z+=0.04;rn.scale.setScalar(1+k*0.6);},()=>k5Del(rn));
          k5Pillar(KP.clone(),0x9a60ff,9,1.2,1.2);k5Ring(new V3(KP.x,0.1,KP.z),0xd0b0ff,0.5,6,0.7,0.1);k5s('barrier');}},
        {t:32.7,fn:()=>candles.forEach((c,i)=>later(i*0.16,()=>{candleSet(c,true);k5s('candleOn');const p=c.pos.clone().add(new V3(0,1.8,0));FX.sparkle(p,10,0xb070ff);k5Flash(p,0xb070ff,2.2,0.35);k5Ring(new V3(c.pos.x,0.1,c.pos.z),0xb070ff,0.2,1.6,0.5,0.15);}))},
        {t:34.2,fn:()=>{zvenTo(new V3(0.8,2.2,-3.4),0.9);k5s('zven');}}],
      tick:(t)=>{if(book.g.visible&&!book.g.userData.free){lHand.getWorldPosition(book.g.position);book.g.rotation.set(0,KS.g.rotation.y,0.2);}},
      end:()=>{W.anims.length=0;KA.reset();KS.g.visible=true;KS.g.position.copy(KP);KS.g.rotation.y=0;KS.armR.rotation.x=0;book.g.visible=true;book.g.userData.free=true;book.g.position.set(-3.5,1.0,-19);book.g.rotation.set(0,0,0);
        dome.visible=true;dome.scale.setScalar(1);gor.g.position.y=-0.6;gor.g.scale.y=0.75;W.clampR={x:C.x,z:C.z,r:R};Z.mode='lead';stageStart(1);}});}
  function trans1(){F.stage='t1';heroLine(-11);const po=T.potap,pr=T.proshka,yo=T.yosha,pe=T.pelageya;KS.g.position.copy(KP);KS.g.rotation.y=0;
    const KH=new V3(KP.x,4.15,KP.z),F2=k5Face(KH,0,0.35,3.3,-0.4),F2b=k5Face(KH,0,0.35,2.8,-0.35),POs=new V3(-1,0,-12.3),F5=k5Face(new V3(POs.x,1.3,POs.z),Math.PI,0.4,3.0,-0.25);
    const keys=new THREE.Group();keys.visible=false;W.group.add(keys);for(let i=0;i<4;i++){const k=blackKey(1.0);keys.add(k);}
    play({dur:15,fov:44,camK:2.4,k5:{iris:true,mood:[COLD,0.12],cues:[[0.2,()=>{CINE.hitstop(4);CINE.slowmo(0.35,0.5);CINE.trauma(0.4);CINE.punch(-5);}],[3.7,()=>CINE.dollyZoom(0.15,0.9,0.6)],
        [6.6,()=>CINE.mood(DARK,0.16)],[7.7,()=>CINE.punch(-3)],[11.5,()=>{CINE.punch(-4);CINE.trauma(0.15);}],[12.2,()=>{CINE.mood(WARM,0.14);CINE.rimPulse(0.8);}]]},
      shots:[MV(0,[KP.x+2.6,1.8,KP.z+3.8],[KP.x,2.6,KP.z],[KP.x+6.0,7.5,KP.z+9.0],[KP.x,2.0,KP.z],1.5,{ease:'outCubic',fov:44,fov2:52,move:'none'}),
        MV(1.5,F2.p,F2.l,F2b.p,F2b.l,3.6,{ease:'inOutSine',fov:42,fov2:38,move:'none'}),
        SH(5.1,[1.6,1.5,-14.8],[0,1.05,-11],{fov:44,move:'push',amp:0.8}),
        MV(6.6,[KP.x+2.2,1.6,KP.z+5.4],[KP.x,3.5,KP.z],[KP.x+1.5,1.9,KP.z+4.4],[KP.x,3.7,KP.z],4.8,{ease:'inOutSine',fov:42,fov2:37,roll:0,roll2:0.07,move:'none'}),
        MV(11.4,F5.p,F5.l,[F5.p[0]-1.0,F5.p[1]+0.05,F5.p[2]],[F5.l[0]-0.3,F5.l[1],F5.l[2]],3.6,{ease:'inOutSine',fov:42,move:'none'})],
      says:[[1.7,3.4,'koschei','Мои свечи… Вы задули мои свечи?'],[6.8,4.6,'koschei','Тогда я запру вас. Каждого — своим ключом.'],[11.9,2.8,'potap','Не запрёшь. Мы друг друга откроем!']],
      events:[{t:0.15,fn:()=>{k5s('shatter');shakeAll(0.06,0.5);KA.pose('recoil',{snap:true});const c=KP.clone().add(new V3(0,2,0));k5Flash(c,0xd0b0ff,7,0.5);k5Ring(new V3(KP.x,0.1,KP.z),0xd0b0ff,1,7,0.8,0.1);FX.sparkle(c,40,0xd0b0ff);
          for(let i=0;i<22;i++){const a=rand(0,6.28),e=rand(0.2,1.2);fxAdd('tetra',i%2?0xb080ff:0xe8d8ff,c.clone().add(new V3(Math.cos(a)*2.4,rand(-1,1.2),Math.sin(a)*2.4)),new V3(Math.cos(a)*rand(3,7),rand(2,6)*e,Math.sin(a)*rand(3,7)),{s:rand(0.09,0.18),life:rand(0.8,1.3),g:9,spin:8});}
          anim(0.6,k=>{dome.scale.setScalar(1+k*0.5);dome.children.forEach(m=>{if(m.material)m.material.opacity*=0.85;});});later(0.6,()=>{dome.visible=false;});}},
        {t:1.6,fn:()=>KA.pose('shrug',{antic:0.18})},{t:2.3,fn:()=>{KA.set('hRy',0.55);k5s('pSoft');}},{t:3.0,fn:()=>{KA.set('hRy',-0.55);k5s('pSoft');}},{t:3.7,fn:()=>KA.set('hRy',0)},{t:4.3,fn:pose('point',{antic:0.2})},
        {t:5.3,fn:()=>{pr.face=Math.atan2(po.pos.x-pr.pos.x,po.pos.z-pr.pos.z);ACT.emote(pr,'tilt');}},{t:5.6,fn:em(yo,'laugh')},{t:5.9,fn:em(pe,'pride')},{t:6.1,fn:em(po,'nod')},{t:6.4,fn:()=>{pr.face=Math.PI;}},
        {t:6.6,fn:pose('threat',{antic:0.25})},{t:7.7,fn:()=>{keys.visible=true;keys.scale.setScalar(0.01);anim(0.5,k=>keys.scale.setScalar(Math.max(0.01,CE.outBack(k))));k5s('keyFly');if(SFX.keys)SFX.keys();FX.sparkle(KS.hand.getWorldPosition(new V3()),12,0xc080ff);}},
        {t:9.2,fn:pose('castR',{antic:0.2})},{t:11.0,fn:()=>{const c=keys.position.clone();FX.sparkle(c,16,0xc080ff);k5Flash(c,0xb070ff,2.4,0.3);keys.visible=false;k5s('blink');}},
        {t:11.4,fn:()=>{ACT.emote(po,'effort');hWalk(po,POs.x,POs.z,0.5,Math.PI);later(0.5,()=>{FX.dust(new V3(POs.x,0.05,POs.z),10,0xd8c8a8,1.1);k5Ring(new V3(POs.x,0.1,POs.z),0xffe0a0,0.3,2,0.4,0.15);k5s('stomp');});}},
        {t:12.3,fn:em(po,'pride')},{t:13.3,fn:()=>[pr,pe,yo].forEach((h,i)=>ACT.emote(h,'nod',i*0.15))}],
      tick:(t)=>{if(keys.visible){const c=KS.hand.getWorldPosition(new V3()).add(new V3(0,0.5,0));keys.position.copy(c);const sp=t>9.2?9:4;keys.children.forEach((k,i)=>{const a=G.time*sp+i*Math.PI/2;k.position.set(Math.cos(a)*0.7,Math.sin(a*1.3)*0.15,Math.sin(a)*0.7);k.rotation.y=a;});}},
      end:()=>{W.anims.length=0;KA.reset();k5Del(keys);dome.visible=false;skaz1();}});}
  function skaz1(){F.stage='skaz1';skazClouds({who:1,title:'Сказ по памяти · начало',sub:'Пелагея шагает вперёд и сказывать начинает. Время останавливается. Начало — Игрок второй выбирает.',
      opts:['Жил-был мальчик — сказки сам сложить мечтал','Жил у Кота Учёного ученик','Жил-был мальчишка с молоточком деревянным']},i=>{const t=['Жил-был мальчик — сказки сам сложить мечтал','Жил у Кота Учёного ученик','Жил-был мальчишка с молоточком деревянным'][i];F.sk1=t;F.skaz=1;
      heroLine(-11);const pe=T.pelageya,po=T.potap,pr=T.proshka,yo=T.yosha;placeOnGround(po,-1,-12.3,0);po.face=Math.PI;KS.g.position.copy(KP);KS.g.rotation.y=0;KA.pose('castR',{snap:true});
      const PEs=new V3(1,0,-11.8),C1=new V3(PEs.x,1.15,PEs.z),orb=a=>[C1.x+Math.sin(a)*2.6,1.3,C1.z+Math.cos(a)*2.6],F3=k5Face(hH(pr),Math.PI,-0.35,1.8,0),F5=k5Face(new V3(po.pos.x,1.35,po.pos.z),Math.PI,0.3,2.0,-0.1);
      const two=k5Two(new V3(PEs.x,1.1,PEs.z),new V3(po.pos.x,1.3,po.pos.z),Math.PI+0.1,3.4,0.25,-0.1),F1s=k5Face(new V3(PEs.x,1.15,PEs.z),Math.PI,0.4,2.0,0.05);
      play({dur:15.2,fov:44,camK:2.4,k5:{mood:[STORY,0.16],cues:[[6.8,()=>CINE.punch(-3)],[10.6,()=>{CINE.slowmo(0.5,0.6);CINE.rimPulse(0.9);CINE.mood(GOLD,0.18);}],[13.0,emAll('cheer',0.08)]]},
        shots:[MV(0,orb(Math.PI+0.55),[C1.x,1.1,C1.z],orb(Math.PI+0.12),[C1.x,1.15,C1.z],4.2,{pts:[orb(Math.PI+0.33)],ease:'inOutSine',fov:40,move:'none'}),
          MV(4.2,[KP.x+1.4,3.0,KP.z+6.2],[KP.x,3.2,KP.z],[KP.x+1.1,3.3,KP.z+5.2],[KP.x,3.4,KP.z],2.4,{ease:'inOutSine',fov:42,move:'none'}),
          SH(6.6,F3.p,F3.l,{fov:40,move:'push',amp:1}),
          SH(8.8,F1s.p,F1s.l,{fov:40,move:'push',amp:0.8}),
          MV(10.6,two.p,two.l,[two.p[0]+0.5,two.p[1]+0.1,two.p[2]-0.3],two.l,2.0,{fov:42,move:'none'}),
          MV(12.6,[3.5,2.4,-15.2],[0,1.2,-11.6],[7,7,-20.5],[0,1,-11],2.6,{ease:'inOutSine',fov:48,move:'none'})],
        says:[[0.4,3.8,'pelageya',t+'…'],[4.3,2.4,null,'<i>Кощей руку опускает.</i>',true],[6.8,1.9,'proshka','Сказывай дальше, дальше!'],[8.9,4.2,'pelageya','…и рядом с ним стоял Потап. Он держал — не отпускал.']],
        events:[{t:0,fn:()=>{hWalk(pe,PEs.x,PEs.z,0.8,Math.PI);k5s('story');storyMotes(()=>pe.pos.clone().add(new V3(0,0.2,0)),4.4,18);}},{t:4.3,fn:()=>{KA.pose('listen',{k:60,c:11});}},
          {t:10.5,fn:()=>{G.flags.names.potap=true;k5s('name');nameBurst(po,0xe0b27a);floatText(po.pos.clone().add(new V3(0,2.6,0)),'Потап','#e0b27a');banner('Имя вернулось: Потап','#e0b27a',2.4);}},{t:10.8,fn:em(po,'joy')}],
        end:()=>{W.anims.length=0;KA.reset();stageStart(2);}});});}
  function trans2(){F.stage='t2';liveBoss(false);KS.g.position.copy(KC);KS.g.rotation.y=0;heroLine(-9);const pr=T.proshka,po=T.potap,yo=T.yosha,pe=T.pelageya;
    const KH=new V3(KC.x,4.15,KC.z),F2=k5Face(KH,0,0.3,3.3,-0.4),F2b=k5Face(KH,0,0.3,2.8,-0.35);
    play({dur:9.4,fov:44,camK:2.4,k5:{iris:true,mood:[COLD,0.12],cues:[[0.15,()=>{CINE.hitstop(3);CINE.punch(-4);CINE.flashDip('#ffe8a0',0.35);}],[4.9,()=>{CINE.flashDip('#e8e0ff',0.4);CINE.trauma(0.3);CINE.mood(DARK,0.18);}],[5.8,()=>CINE.trauma(0.2)]]},
      shots:[MV(0,[KC.x+3.2,2.6,KC.z+4.6],[KC.x,2.8,KC.z],[KC.x+3.8,2.9,KC.z+5.6],[KC.x,2.9,KC.z],1.6,{fov:44,move:'none'}),
        MV(1.6,F2.p,F2.l,F2b.p,F2b.l,2.8,{ease:'inOutSine',fov:42,fov2:38,move:'none'}),
        MV(4.4,[KC.x+4,1.0,KC.z+7],[KC.x,4,KC.z],[KC.x+4.4,1.2,KC.z+7.6],[C.x,13,C.z-6],2.2,{ease:'outCubic',fov:56,move:'none'}),
        MV(6.6,[0.8,0.9,-12.4],[0,1.35,-9],[-0.6,0.95,-12.5],[-0.3,1.35,-9],2.8,{ease:'inOutSine',fov:44,move:'none'})],
      says:[[1.8,3.0,'koschei','Ключи вам не страшны… А буря?'],[4.6,3.6,null,'<i>Небо темнеет. С моря ползут тучи.</i>',true]],
      events:[{t:0.1,fn:()=>{bindBeat();KA.pose('recoil',{snap:true});}},{t:1.7,fn:pose('proud',{antic:0.15})},{t:3.6,fn:pose('castR',{antic:0.25})},
        {t:4.4,fn:()=>{k5StormSet(1);K5.storm=Math.max(K5.storm,0.55);k5s('thunder');}},{t:4.9,fn:()=>{k5Bolt(new V3(C.x+14,0,C.z-10),0xd8b0ff);k5s('bolt');}},{t:5.8,fn:()=>{k5Bolt(new V3(C.x-15,0,C.z-6),0xd8b0ff);k5s('bolt');}},
        {t:6.8,fn:emAll('fear',0.1)},{t:7.4,fn:()=>{hWalk(po,po.pos.x+0.8,po.pos.z-0.8,0.5,Math.PI);ACT.emote(po,'effort',0.1);later(0.5,()=>k5s('stomp'));}},{t:7.6,fn:()=>hWalk(yo,po.pos.x+1.2,po.pos.z+0.6,0.6,Math.PI)}],
      end:()=>{W.anims.length=0;KA.reset();skaz2();}});}
  function skaz2(){F.stage='skaz2';const names=HM.map(h=>h.name);skazClouds({who:0,title:'Сказ по памяти · помощник',sub:'Кто мальчишке помогал? Помощник у дуба стоит. Выбирает Игрок первый.',opts:names},i=>{const h=HM[i];F.sk2=h.name;F.sk2k=h.k;F.skaz=2;
      heroLine(-8);const pe=T.pelageya,yo=T.yosha,f=h.m.g.position.clone(),hf=Math.atan2(C.x-f.x,C.z-f.z),to=f.clone().add(new V3(Math.sin(hf)*2,0,Math.cos(hf)*2));
      const hbb=new THREE.Box3().setFromObject(h.m.g),hy=h.k==='kit'?0.2:Math.max(1.0,hbb.max.y-0.6),FH=k5Face(new V3(to.x,hy,to.z),hf,f.x<0?-0.5:0.5,h.k==='kit'?6:clamp(hy*1.1+1.8,3.2,7),h.k==='kit'?0.4:-0.2),F1=k5Face(hH(pe),Math.PI,0.4,2.0,0.05),F6=k5Face(hH(yo),Math.PI,-0.3,1.6,0.05);
      const ST=new V3(-3.5,0,-20.1),KSH=new V3(ST.x,3.0,ST.z),F4=k5Face(KSH,0.4,0.45,2.6,-0.25);
      const ya=yagaM?yagaM.g.position.clone():null,yf=yagaM?yagaM.g.rotation.y:0,FY=ya?k5Face(ya.clone().add(new V3(0,1.3,0)),yf,0.35,2.6,0.1):null;
      play({dur:16.8,fov:44,camK:2.2,k5:{mood:[STORY,0.14],cues:[[6.0,()=>CINE.mood(WARM,0.14)],[13.6,()=>{CINE.slowmo(0.5,0.55);CINE.rimPulse(0.9);CINE.mood(GOLD,0.16);}],[15.2,emAll('cheer',0.08)]]},
        shots:[SH(0,F1.p,F1.l,{fov:40,move:'orbit',amp:1}),
          MV(3.6,FH.p,FH.l,[FH.p[0]*0.92+to.x*0.08,FH.p[1],FH.p[2]*0.92+to.z*0.08],FH.l,2.2,{fov:44,move:'none'}),
          MV(5.8,[-0.6,2.6,-16.4],[ST.x,2.2,ST.z],[-1.1,2.8,-17.2],[ST.x,2.4,ST.z],2.2,{fov:44,move:'none'}),
          SH(8.0,F4.p,F4.l,{fov:40,move:'push',amp:1}),
          ya?SH(10.2,FY.p,FY.l,{fov:42,move:'orbit',amp:0.8}):SH(10.2,[-1.4,2,-15.6],[ST.x,2.6,ST.z],{fov:42,move:'push'}),
          SH(13.2,F6.p,F6.l,{fov:40,move:'push',amp:1}),
          MV(15.0,[3.4,2.4,-11.8],[0,1.1,-8.4],[7,7.5,-16.5],[0,1,-8],1.8,{ease:'inOutSine',fov:48,move:'none'})],
        says:[[0.3,3.3,'pelageya','И помогал ему в том '+h.name.replace(/^./,c=>c.toLowerCase())+'.'],[5.9,4.6,null,'<i>Выбранный шаг вперёд делает. Кощей на камень садится —</i><br><i>Руки на колени кладёт и слушает, не шевелится.</i>',true],
          [10.4,4.4,null,'<i>Яга на краю поляны глаз метлой утирает —</i><br><i>Мол, от пыли это, никто не узнает.</i>',true],[13.4,3.0,'yosha','Я смогу! Держите, держите!']],
        events:[{t:0,fn:()=>{k5s('story');storyMotes(()=>pe.pos.clone().add(new V3(0,0.2,0)),3.6,16);}},
          {t:3.6,fn:()=>{if(h.k!=='kit'){anim(1.4,k=>{const e=CE.inOutSine(k);h.m.g.position.lerpVectors(f,to,e);h.m.g.position.y=Math.abs(Math.sin(k*Math.PI*3))*0.12;});later(1.5,npcEm(h.m,'hop'));}else{anim(1.6,k=>{h.m.g.position.y=-1.2+Math.sin(k*Math.PI)*1.5;});}
            HM.forEach(o=>{if(o!==h)later(0.4,npcEm(o.m,'nod'));});}},
          {t:5.8,fn:()=>{KS.g.position.copy(ST);KS.g.position.y=-0.45;KS.g.rotation.y=0.4;KA.pose('sit',{antic:0.2,k:70,c:12});}},
          {t:10.4,fn:()=>{if(yagaM){anim(2.2,k=>{yagaM.g.rotation.z=Math.sin(k*Math.PI*3)*0.12;});later(0.6,npcEm(yagaM,'nod'));}}},
          {t:13.3,fn:()=>{k5s('name');if(!G.flags.names.yosha){G.flags.names.yosha=true;banner('Имя вернулось: Йоша','#8fe0d4',2.4);}nameBurst(yo,0x8fe0d4);ACT.emote(yo,'joy');}}],
        end:()=>{W.anims.length=0;KA.reset();if(yagaM)yagaM.g.rotation.z=0;KS.g.position.copy(KP);KS.g.rotation.y=0;trans2b();}});});}
  function trans2b(){F.stage='t2b';heroLine(-8);KS.g.position.copy(KP);KS.g.rotation.y=0;const pr=T.proshka,pe=T.pelageya;
    const FLY=new V3(C.x,5.4,C.z-4),FH=FLY.clone().add(new V3(0,4.15,0)),F2=k5Face(hH(pr),Math.PI,-0.35,1.7,-0.35),two=k5Two(hH(pr),hH(pe),Math.PI+0.2,3.4,0.15,-0.1);
    const ghost=k5Prop(new THREE.Group());ghost.add(k5Glow(0xffd060,1.1));ghost.add(new THREE.Mesh(new THREE.SphereGeometry(0.16,10,8),MB(0xfff4c0)));ghost.visible=false;
    play({dur:11.8,fov:46,camK:2.2,k5:{mood:[DARK,0.14],cues:[[0.45,()=>{CINE.punch(-4);CINE.trauma(0.2);FX.speed(0.6);}],[2.8,()=>CINE.dollyZoom(0.14,0.8,0.5)],[9.4,()=>CINE.punch(-3)]]},
      shots:[MV(0,[KP.x+4.5,1.2,KP.z+7],[KP.x,2.6,KP.z],[KP.x+5.5,1.6,KP.z+9],[FLY.x,6.5,FLY.z],2.4,{lf:()=>KS.rig.chest.getWorldPosition(new V3()),lk:5,fov:50,fov2:54,move:'none'}),
        SH(2.5,F2.p,F2.l,{fov:40,move:'push',amp:0.8}),
        MV(5.6,two.p,two.l,[two.p[0]-0.5,two.p[1]+0.1,two.p[2]+0.3],two.l,3.4,{fov:42,move:'none'}),
        MV(9.1,[FLY.x+1.8,8.6,FLY.z+3.6],[FH.x,FH.y-0.1,FH.z],[FLY.x-1.4,8.8,FLY.z+3.7],[FH.x,FH.y-0.15,FH.z],2.6,{pts:[[FLY.x+0.2,8.7,FLY.z+4.1]],ease:'inOutSine',fov:42,move:'none'})],
      says:[[2.7,2.9,'proshka','Он взлетел! Как его оттуда достать?'],[5.8,3.3,'pelageya','Шар отбей другу — а друг отбивает его в небо!'],[9.3,2.4,'koschei','Попробуйте, достаньте!']],
      events:[{t:0.1,fn:()=>KA.pose('kneel',{snap:true})},
        {t:0.45,fn:()=>{KA.pose('cast',{snap:true});k5s('flyUp');kFly(FLY,2.0,'outCubic');const p=new V3(KP.x,0.1,KP.z);FX.dust(p,16,0x9a8a6a,1.3);k5Ring(p,0xd0b0ff,0.5,4.5,0.6,0.12);
          const rn=k5Decal(K5TEX.rune,0xb070ff,2.6,p,1);k5fx(1.4,k=>{rn.material.opacity=1-k;rn.rotation.z+=0.05;},()=>k5Del(rn));}},{t:2.6,fn:em(pr,'surprise')},
        {t:6.2,fn:()=>{pe.face=Math.atan2(pr.pos.x-pe.pos.x,pr.pos.z-pe.pos.z);ACT.emote(pe,'hop');}},
        {t:6.7,fn:()=>{ghost.visible=true;const a=hH(pe),b=hH(pr);anim(0.7,k=>{ghost.position.lerpVectors(a,b,k);ghost.position.y+=Math.sin(k*Math.PI)*1.2;});k5s('orbPass');later(0.7,()=>{k5s('orbHit');k5Flash(b,0xffe08a,1.6,0.3);ACT.emote(pr,'hop');
          const c=b.clone();anim(0.8,k=>{ghost.position.set(c.x,c.y+k*6,c.z);});later(0.8,()=>{FX.sparkle(ghost.position.clone(),10,0xffe08a);ghost.visible=false;});});}},
        {t:8.0,fn:()=>{pe.face=Math.PI;ACT.emote(pr,'nod');}},{t:9.3,fn:()=>{KA.pose('proud');KA.laugh=2.2;later(0.3,()=>k5s('laugh'));}}],
      end:()=>{W.anims.length=0;KA.reset();k5Del(ghost);stageStart(3);}});}
  function trans3(){F.stage='t3';liveBoss(false);KS.g.position.copy(KC);KS.g.rotation.y=0;heroLine(-9);const po=T.potap,pr=T.proshka,yo=T.yosha;
    const KH=new V3(KC.x,4.15,KC.z),hand=()=>KS.hand.getWorldPosition(new V3()),POs=new V3(po.pos.x+0.6,0,po.pos.z-1.4),F3=k5Face(hH(pr),Math.PI,0.35,1.7,0),F4=k5Face(new V3(POs.x,1.3,POs.z),Math.PI,-0.5,2.8,-0.1);
    const P2a=[KC.x+2.4,2.2,KC.z+1.6],P2b=[KC.x+1.0,3.4,KC.z+3.3],mid=new V3(0,0,(KC.z-9)/2);
    play({dur:12.6,fov:44,camK:2.4,k5:{iris:true,mood:[DARK,0.14],cues:[[0.15,()=>{CINE.hitstop(3);CINE.punch(-4);CINE.flashDip('#ffe8a0',0.3);}],[2.2,()=>{CINE.punch(-6);CINE.hitstop(3);CINE.flashDip('#c8a0ff',0.3);}],
        [6.0,()=>CINE.dollyZoom(0.2,0.8,0.6)],[8.7,()=>{CINE.punch(-4);CINE.rimPulse(0.9);CINE.mood(WARM,0.12);}]]},
      shots:[MV(0,[KC.x+3.4,2.4,KC.z+4.6],[KC.x,2.6,KC.z],[KC.x+3.9,2.7,KC.z+5.4],[KC.x,2.7,KC.z],1.4,{fov:44,move:'none'}),
        MV(1.4,P2a,[KC.x+0.3,2.0,KC.z],P2b,[KH.x,KH.y-0.1,KH.z],2.4,{lf:(t,k)=>hand().lerp(kH(),clamp(k,0,1)),lk:9,ease:'inOutCubic',fov:42,move:'none'}),
        SH(5.6,F3.p,F3.l,{fov:40,move:'push',amp:1}),
        MV(8.2,F4.p,F4.l,[F4.p[0],F4.p[1]-0.1,F4.p[2]-0.4],F4.l,2.4,{ease:'outCubic',fov:42,move:'none'}),
        MV(10.6,[mid.x+10,3.2,mid.z+2],[mid.x,1.8,mid.z],[mid.x+10.4,3.8,mid.z-1.5],[mid.x,1.9,mid.z],2.0,{ease:'inOutSine',fov:46,move:'none'})],
      says:[[2.6,2.9,'koschei','Хватит сказок. Теперь — меч.'],[5.7,2.4,'proshka','У него меч! Настоящий!'],[8.4,2.2,'potap','Все за меня! Я держу!']],
      events:[{t:0.1,fn:()=>{bindBeat();KA.pose('recoil',{snap:true});FX.dust(new V3(KC.x,0.05,KC.z),12,0x9a8a6a,1.1);}},{t:1.5,fn:pose('guard',{antic:0.25})},
        {t:2.1,fn:()=>{sword.visible=true;k5s('draw');KA.pose('sword',{snap:true});FX.sparkle(hand(),16,0xd0b0ff);k5Flash(hand(),0xb070ff,2.4,0.35);k5Trail(()=>sword.parent&&sword.visible&&G.cine?sword.userData.edge.getWorldPosition(new V3()):null,0xb070ff,{size:0.4,life:0.25,every:0.02,max:20});}},
        {t:4.4,fn:pose('threat')},{t:6.6,fn:em(pr,'fear')},{t:6.4,fn:()=>hWalk(yo,po.pos.x+0.5,po.pos.z+1.0,0.6,Math.PI)},
        {t:8.2,fn:()=>{hWalk(po,POs.x,POs.z,0.5,Math.PI);later(1.5,()=>{T.potap._demoGuard=G.time+2.4;FX.dust(new V3(POs.x,0.05,POs.z),8,0xd8c8a8,0.9);k5s('stomp');});}},{t:9.0,fn:em(po,'pride')},
        {t:10.4,fn:()=>{hWalk(pr,POs.x-1.2,POs.z+1.2,0.6,Math.PI);hWalk(T.pelageya,POs.x+1.2,POs.z+1.1,0.6,Math.PI);}}],
      end:()=>{W.anims.length=0;KA.reset();KS.armR.rotation.x=0;stageStart(4);}});}
  function trans4(){F.stage='t4';liveBoss(false);KS.g.position.copy(KC);KS.g.rotation.y=0;heroLine(-9);const pr=T.proshka,pe=T.pelageya;
    const hand=()=>KS.hand.getWorldPosition(new V3()),ZP=new V3(0.2,2.2,-11.6),F4=k5Face(hH(pr),Math.PI,-0.3,1.8,0),AF=new V3(6,1.2,-19);
    KS.g.updateMatrixWorld(true);const NW=ndl.g.getWorldPosition(new V3()),NG=new V3(NW.x+0.4,0.3,NW.z+1.2);   // куда упадёт игла
    play({dur:14.2,fov:44,camK:2.4,k5:{iris:true,mood:[DARK,0.18],cues:[[0.5,()=>{CINE.trauma(0.5);CINE.dutch(0.08);}],[2.4,()=>CINE.dutch(0)],[2.95,()=>CINE.slowmo(0.4,0.6)],[4.2,()=>CINE.mood(WARM,0.12)],
        [7.0,em(pr,'pride')],[12.4,()=>{CINE.rimPulse(0.9);CINE.punch(-3);}]]},
      shots:[MV(0,[KC.x+1.6,3.0,KC.z+4.6],[KC.x,4.4,KC.z],[KC.x+1.2,3.4,KC.z+3.8],[KC.x,5.2,KC.z],2.8,{ease:'outCubic',fov:44,fov2:40,move:'none'}),
        SH(2.8,[NG.x+0.9,0.35,NG.z+1.1],[NG.x,0.25,NG.z],{lf:()=>ndl.g.getWorldPosition(new V3()).lerp(NG,0.5),lk:8,fov:44,move:'push',amp:0.5}),
        MV(4.0,[1.4,1.4,-14.8],[0.1,1.6,-10.4],[1.0,1.5,-14.0],[0.1,1.6,-10.2],5.0,{ease:'inOutSine',fov:44,move:'none'}),
        SH(9.0,F4.p,F4.l,{fov:40,move:'push',amp:1}),
        MV(12.0,[15,6.5,-9],[AF.x,AF.y,AF.z],[13,5.5,-11.5],[AF.x,AF.y+0.1,AF.z],2.2,{tr:'whip',ease:'outCubic',fov:42,move:'none'})],
      says:[[0.6,2.2,'koschei','Бессмертного не победить!'],[4.2,4.8,'zven','Не победить — так расковать! Прошка, из иглы — застёжку!'],[9.2,2.8,'proshka','Несите мне иглу! Я к наковальне!']],
      events:[{t:0.2,fn:()=>KA.pose('cast',{antic:0.3,snap:true})},
        {t:0.5,fn:()=>{k5s('ult');k5s('whooshBig');shakeAll(0.05,0.8);kFly(KC.clone().add(new V3(0,1.2,0)),1.4,'outCubic');for(let i=0;i<3;i++)later(i*0.35,()=>{const c=KS.g.position.clone().add(new V3(0,2.4,0));k5Ring(c,0x9a50ff,0.6,5,0.7,0.1,new THREE.Euler(Math.PI/2,0,0));k5Flash(c,0x8a40ff,4,0.35);});}},
        {t:2.9,fn:()=>{const w=ndl.g.getWorldPosition(new V3());W.group.add(ndl.g);ndl.g.position.copy(w);ndl.g.scale.setScalar(1);const g0=new V3(w.x+0.4,0.15,w.z+1.2);if(SFX.dzin)SFX.dzin();
          anim(0.7,k=>{ndl.g.position.lerpVectors(w,g0,k*k);ndl.g.rotation.z+=0.35;});later(0.72,()=>{k5s('tink');k5Flash(g0.clone().add(new V3(0,0.3,0)),0xffffff,1.6,0.3);FX.sparks(g0.clone(),8,0xfff0c0);});}},
        {t:3.9,fn:()=>{zvenTo(ZP,0.8);k5s('zven');}},
        {t:5.0,fn:()=>{const w=ndl.g.position.clone(),tg=()=>headOf(active(1)).add(new V3(0,0.4,0));if(SFX.dzin)SFX.dzin();anim(1.1,k=>{ndl.g.position.lerpVectors(w,tg(),CE.inOutSine(k));ndl.g.position.y+=Math.sin(k*Math.PI)*2;ndl.g.rotation.z+=0.3;});
          k5Trail(()=>ndl.g.parent?ndl.g.position.clone():null,0xffe08a,{size:0.35,life:0.3,every:0.03,max:24});}},
        {t:6.4,fn:em(pr,'surprise')},{t:9.6,fn:()=>{pr.face=Math.atan2(AF.x-pr.pos.x,AF.z-pr.pos.z);ACT.emote(pr,'effort');}},{t:12.4,fn:()=>{k5s('magic');k5Flash(AF.clone().add(new V3(0,0.4,0)),0xffe08a,2.8,0.5);FX.sparkle(AF.clone().add(new V3(0,0.6,0)),12,0xffe08a);}}],
      end:()=>{W.anims.length=0;KA.reset();Z.mode='lead';liftScene();}});}
  function liftScene(){F.stage='lift';const pr=T.proshka;k5force(0,'proshka');placeOnGround(pr,2.2,-14.4,0);KS.g.position.set(C.x,3.2,C.z-6);KS.g.rotation.y=0;
    const AF=anvil.position.clone(),PRs=new V3(5.2,0,-17.2),F3=k5Face(new V3(PRs.x,1.05,PRs.z),0.3,-0.3,1.9,-0.1);
    play({dur:10.2,fov:44,camK:2.4,k5:{mood:[WARM,0.12],cues:[[0.2,()=>FX.speed(0.5)],[4.85,()=>{CINE.hitstop(2);CINE.trauma(0.25);CINE.punch(-3);}],[5.6,()=>CINE.rimPulse(0.8)],[7.4,em(pr,'joy')]]},
      shots:[SH(0,[5.0,1.3,-15.1],[2.2,1,-14.4],{pf:()=>pr.pos.clone().add(new V3(2.8,1.2,-0.7)),lf:()=>hH(pr),lk:7,fov:46,move:'none'}),
        MV(1.6,[9.5,2.6,-14.5],[AF.x,1.4,AF.z],[8.4,4.4,-16.6],[ANV.x,1.6,ANV.z],3.4,{lf:()=>anvil.position.clone().add(new V3(0,0.6,0)),lk:6,ease:'inOutSine',fov:48,move:'none'}),
        SH(5.0,F3.p,F3.l,{fov:40,move:'push',amp:1}),
        MV(8.8,[8,2.4,-14],[ANV.x,1.2,ANV.z],[10,5.4,-12],[ANV.x,1.2,ANV.z],1.4,{ease:'inOutSine',fov:48,move:'none'})],
      says:[[0.3,4.6,null,'<i>Прошка к наковальне бежит — и изобретение его впервые не подвело:</i><br><i>Подъёмник из клещей да цепи наковальню к самым корням подняло.</i>',true],[5.2,3.8,'proshka','Я же говорил, что штука моя работает — вот и сработала!']],
      events:[{t:0,fn:()=>hWalk(pr,PRs.x,PRs.z,1.3,Math.PI*0.8)},{t:1.2,fn:()=>ACT.emote(pr,'effort')},
        {t:1.8,fn:()=>{const f=anvil.position.clone(),to=new V3(ANV.x,0.9,ANV.z);anim(3,k=>{anvil.position.lerpVectors(f,to,CE.inOutSine(k));anvil.position.y+=Math.sin(k*Math.PI)*1.2;anvil.rotation.z=Math.sin(k*Math.PI*2)*0.06;});SFX.latch();
          later(0.6,()=>{k5s('chain');FX.sparks(anvil.position.clone().add(new V3(0,1,0)),10);});later(1.6,()=>{k5s('chain');FX.sparks(anvil.position.clone().add(new V3(0,1,0)),10);});}},
        {t:4.8,fn:()=>{anvil.rotation.z=0;const p=new V3(ANV.x,0.05,ANV.z);FX.dust(p,14,0x9a8a6a,1.2);k5Ring(p,0xffe0a0,0.4,2.6,0.5,0.14);k5s('land');k5s('anvil');}},
        {t:5.0,fn:()=>{pr.face=0.3;}},{t:5.3,fn:()=>{ACT.emote(pr,'pride');FX.sparkle(hH(pr),8,0xffd23a);}}],
      end:()=>{W.anims.length=0;anvil.position.set(ANV.x,0.9,ANV.z);anvil.rotation.z=0;anvilCyl.x=ANV.x;anvilCyl.z=ANV.z;anvilCyl.maxy=2;stageStart(5);}});}
  function finale(){F.stage='needle';liveBoss(false);const pr=T.proshka,pe=T.pelageya;k5force(0,'proshka');placeOnGround(pr,ANV.x,ANV.z+1.8,0);pr.face=Math.PI;
    const KS0=new V3(ANV.x-2.4,0,ANV.z+0.4);KS.g.position.copy(KS0);KS.g.rotation.y=Math.PI*0.4;k5StormSet(0.35);sword.visible=true;
    const PEs=new V3(ANV.x+1.4,0,ANV.z+3.6),peF=Math.atan2(KS0.x-PEs.x,KS0.z-PEs.z);placeOnGround(pe,PEs.x,PEs.z,0);pe.face=peF;
    HEROES.forEach(h=>{if(h!==pr&&h!==pe){placeOnGround(h,PEs.x+(h.kind==='potap'?1.6:-1.0),PEs.z+1.2,0);h.face=peF;}});
    const KS1=new V3(ANV.x-1.2,0,ANV.z+1.0),kf1=Math.atan2(pr.pos.x-KS1.x,pr.pos.z-KS1.z),F1=k5Face(new V3(KS0.x,3.05,KS0.z),Math.PI*0.4,-0.3,3.0,-0.2),F2=k5Face(hH(pe),peF,0.35,2.0,0.05),F5=k5Face(hH(pr),Math.PI,0.3,1.8,0);
    const good=G.flags.claspQ||0.7;
    play({dur:22.8,fov:42,camK:2.4,k5:{calm:true,mood:[COLD,0.1],cues:[[3.4,()=>{CINE.mood(WARM,0.14);CINE.rimPulse(0.6);}],[13.0,()=>{CINE.hitstop(2);CINE.punch(-2);}],[14.4,()=>{CINE.hitstop(2);CINE.punch(-2);}],[15.4,()=>{CINE.hitstop(2);CINE.punch(-3);}],
        [16.6,()=>{CINE.slowmo(0.45,0.6);CINE.rimPulse(1);CINE.mood(GOLD,0.18);FX.confettiCam(30);}],[19.6,()=>CINE.mood(GOLD,0.2)]]},
      shots:[MV(0,F1.p,F1.l,[F1.p[0]-0.25,F1.p[1],F1.p[2]-0.25],F1.l,3.0,{ease:'inOutSine',fov:40,fov2:37,move:'none'}),
        SH(3.0,F2.p,F2.l,{fov:40,move:'push',amp:0.8}),
        MV(7.6,[ANV.x+7.2,3.8,ANV.z+1.8],[ANV.x-0.9,2.5,ANV.z+1.4],[ANV.x+6.2,3.4,ANV.z+2.4],[ANV.x-0.9,2.5,ANV.z+1.4],4.6,{ease:'inOutSine',fov:44,move:'none'}),
        MV(12.2,[ANV.x+7.4,3.0,ANV.z+4.0],[ANV.x-0.8,2.6,ANV.z+1.2],[ANV.x+6.8,2.9,ANV.z+3.6],[ANV.x-0.8,2.6,ANV.z+1.2],4.2,{nofocus:true,ease:'inOutSine',fov:40,move:'none'}),
        SH(16.4,F5.p,F5.l,{fov:40,move:'push',amp:1}),
        SH(17.8,[ANV.x-2.0,3.4,ANV.z-1.0],[ANV.x,1.5,ANV.z+0.1],{fov:36,move:'push',amp:1}),
        MV(20.0,[ANV.x+4,2.2,ANV.z+5],[ANV.x-0.6,1.4,ANV.z],[ANV.x+9,7,ANV.z+11],[ANV.x-1,1.6,ANV.z-1],2.8,{ease:'inOutSine',fov:46,move:'none'})],
      says:[[0.6,2.2,'koschei','…Почему вы не бьёте?'],[3.2,4.4,'pelageya','Потому что это сказка. А в сказке можно по-другому.'],
        [7.8,4.4,null,'<i>Кощей долго смотрит на молот в лапах Прошки. Потом подходит и поправляет ему руку на застёжке.</i>',true],[12.4,4.0,'koschei','Держи. Ровней держи. Вот так, вот так.'],
        [17.9,3.6,null,good>=0.8?'<i>Узор на застёжке тонок, как у Кузьмы.</i>':'<i>Застёжка скована — Прошкиными руками.</i>',true]],
      events:[{t:0,fn:()=>KA.pose('kneel',{k:60,c:11})},
        {t:0.4,fn:()=>{const w=sword.getWorldPosition(new V3());W.group.add(sword);sword.position.copy(w);const g0=new V3(w.x+0.8,0.12,w.z+0.4);anim(0.5,k=>{sword.position.lerpVectors(w,g0,k*k);sword.rotation.z=k*1.45;});later(0.52,()=>{SFX.clink();FX.dust(g0.clone(),8,0x9a8a6a,0.8);});}},
        {t:5.6,fn:()=>HEROES.forEach((h,i)=>{if(h!==pr&&h!==pe)ACT.emote(h,'nod',i*0.12);})},
        {t:7.6,fn:()=>{KA.pose('idle',{k:70,c:12});later(0.4,()=>kWalk(KS1.x,KS1.z,2.2,kf1));}},{t:10.4,fn:pose('help',{antic:0.15})},
        {t:13.0,fn:()=>{pr.atkT=0.3;k5s('forge');k5s('anvil');FX.sparks(ANV.clone().add(new V3(0,1.3,0)),16,0xffe080);}},{t:14.4,fn:()=>{pr.atkT=0.3;k5s('forge');k5s('anvil');FX.sparks(ANV.clone().add(new V3(0,1.3,0)),16,0xffe080);}},
        {t:15.4,fn:()=>{pr.atkT=0.3;k5s('forge');k5s('anvil');FX.sparks(ANV.clone().add(new V3(0,1.3,0)),22,0xffe080);k5Flash(ANV.clone().add(new V3(0,1.4,0)),0xffe08a,2.4,0.4);}},
        {t:16.5,fn:()=>{G.flags.names.proshka=true;k5s('name');banner('Имя вернулось: Прошка','#ff9a66',2.4);nameBurst(pr,0xff9a66);ACT.emote(pr,'joy');}},
        {t:17.6,fn:()=>{k5s('magic');ndl.g.position.set(ANV.x,1.3,ANV.z);ndl.g.rotation.set(0,0,Math.PI/2);k5Flash(ANV.clone().add(new V3(0,1.4,0)),0xffd060,2,0.6);FX.sparkle(ANV.clone().add(new V3(0,1.5,0)),10,0xffe08a);}},
        {t:19.6,fn:()=>k5StormSet(0)}],
      tick:(t)=>{if(t>17.6)ndl.g.rotation.y=Math.sin(t*2)*0.15;},
      end:()=>{W.anims.length=0;KA.reset();KS.armR.rotation.x=0;KS.hand.add(sword);sword.position.set(0,-0.05,0.05);sword.rotation.set(-0.35,0,0);sword.visible=false;KS.g.position.copy(KP);KS.g.rotation.set(0,0,0);k5StormSet(0);skaz3();}});}
  const ENDS=['И ушёл он — и был таков','И простили его — и прощенья он просил','И позвали его слушать — сел он в круг'],ENDK=['ushel','proshen','slushat'];
  function skaz3(){F.stage='skaz3';skazClouds({who:2,title:'Сказ по памяти · конец',sub:'Последняя рамка осталась — чем сказка про мальчишку кончится.<br>Все три — настоящие. Наводите вместе, как хочется.',opts:ENDS},arr=>{F.skaz=3;F.ends=arr;
      G.flags.ending=arr.map(i=>ENDK[i]);G.flags.skaz5=[F.sk1,F.sk2,arr.map(i=>ENDS[i]).join(' — а иные сказывают: ')];
      if(arr.length>1){say('kot','<i>(разводит лапами)</i> А иные сказывают, что было иначе, — вот как…',3.6,true);later(3.8,chainScene);}else chainScene();});}
  function chainScene(){F.stage='chain';k5StormSet(0,true);const pe=T.pelageya,yo=T.yosha,pr=T.proshka,po=T.potap;HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*1.8,-15.5,0);faceTo(h,KP.x,KP.z);});
    const KS0=new V3(-0.6,0,-19.4);KS.g.position.copy(KS0);KS.g.rotation.y=0.15;
    const keys=new THREE.Group();keys.position.set(-0.3,1.9,-19);W.group.add(keys);for(let i=0;i<5;i++){const k=blackKey(1.4);k.position.x=(i-2)*0.08;keys.add(k);}
    const thread=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,0.8,4),MB(COL.gold));thread.visible=false;W.group.add(thread);const ya=yagaM?yagaM.g.position.clone():new V3(-10,0,-14);const E=F.ends[0];
    const KT=kot.g.position.clone(),toKot=Math.atan2(KT.x-KS0.x,KT.z-KS0.z),toPe=Math.atan2(pe.pos.x-KS0.x,pe.pos.z-KS0.z),toYa=Math.atan2(ya.x-KS0.x,ya.z-KS0.z);
    const KH=new V3(KS0.x,4.15,KS0.z),kotH=KT.clone().add(new V3(0,1.35,0)),kotF=kot.g.rotation.y,kotToKs=Math.atan2(KS0.x-KT.x,KS0.z-KT.z),kotToPe=Math.atan2(pe.pos.x-KT.x,pe.pos.z-KT.z);
    const FyaK=k5Face(KH,toYa,0.35,3.4,-0.45),FKot=k5Face(kotH,kotToKs,0.35,2.4,0.05),FKs=k5Face(KH,toKot,-0.35,3.2,-0.45),FKotP=k5Face(kotH,kotToPe,-0.3,2.4,0.05),FKsP=k5Face(KH,toPe,0.3,3.2,-0.45);
    const dY=new V3(KS0.x-ya.x,0,KS0.z-ya.z).normalize(),pY=new V3(-dY.z,0,dY.x),YA1=ya.clone().addScaledVector(dY,-2.6).addScaledVector(pY,1.1),YA2=ya.clone().addScaledVector(dY,-2.0).addScaledVector(pY,0.9),YL=ya.clone().addScaledVector(dY,6);
    const TW=k5Two(new V3(KS0.x,2.4,KS0.z),new V3(KT.x,1.2,KT.z),Math.atan2(-0.906,0.42),7,1.0,0.6),FKsP2=k5Face(KH,toPe,0.3,3.9,-0.3);
    const FPe=k5Face(hH(pe),Math.atan2(KS0.x-pe.pos.x,KS0.z-pe.pos.z),0.35,1.9,0.08),FYo=k5Face(hH(yo),Math.atan2(KS0.x-yo.pos.x,KS0.z-yo.pos.z),-0.3,1.6,0.05);
    const tail=E===0?[[51.6,4.6,null,'<i>И ушёл он — и был таков: Кощей по воде уходит, не оглянувшись,</i><br><i>А на ветке дуба перстень его остался, блеснувши.</i>',true]]
      :E===1?[[51.6,4.6,null,'<i>И простили его — и прощенья он просил: пред Котом на колено встал, перстень отдал</i><br><i>И на дальний берег жить ушёл — там свой дом и сыскал.</i>',true]]
      :[[51.6,4.6,null,'<i>И позвали его слушать: Кощей у дуба остался, с перстнем на руке,</i><br><i>Рядом с Котом сидит — у корней, в тишине.</i>',true]];
    const endLook=E===0?[-8,2,-34]:E===1?[KT.x,1.4,KT.z]:[OAK.x+2.2,2,OAK.z+3.4];
    play({dur:57.6,fov:44,camK:2,k5:{calm:true,mood:[WARM,0.12],cues:[[10.2,()=>CINE.rimPulse(0.8)],[14.0,emAll('droop',0.12)],[22.6,()=>CINE.mood(STORY,0.14)],[26.2,()=>CINE.dollyZoom(0.07,1.2,1.0)],
        [29.4,()=>{CINE.slowmo(0.5,0.6);CINE.rimPulse(1);CINE.mood(GOLD,0.16);}],[32.4,()=>{CINE.punch(-4);FX.confettiCam(50);}],[32.6,emAll('cheer',0.08)],[39.6,()=>{CINE.hitstop(3);CINE.punch(-5);CINE.mood(GOLD,0.22);}],[45.6,()=>CINE.mood(WARM,0.16)]]},
      shots:[MV(0,[5.2,3.4,-11.4],[-0.6,2.2,-19.4],[4.4,3.0,-12.4],[-0.6,2.4,-19.4],4.6,{ease:'inOutSine',fov:46,move:'none'}),
        MV(4.6,[YA1.x,2.0,YA1.z],[YL.x,1.6,YL.z],[YA2.x,1.9,YA2.z],[YL.x,1.5,YL.z],2.0,{ease:'inOutSine',fov:44,move:'none'}),
        SH(6.6,FyaK.p,FyaK.l,{fov:40,move:'push',amp:0.8}),
        MV(10.4,TW.p,TW.l,[TW.p[0]+0.5,TW.p[1]-0.2,TW.p[2]-0.6],TW.l,3.8,{lf:()=>thread.visible?thread.position.clone().lerp(new V3(TW.l[0],TW.l[1],TW.l[2]),0.6):new V3(TW.l[0],TW.l[1],TW.l[2]),lk:4,ease:'inOutSine',fov:44,move:'none'}),
        SH(14.2,FKot.p,FKot.l,{fov:40,move:'push',amp:1}),
        SH(20.4,FKs.p,FKs.l,{fov:40,move:'push',amp:0.8}),
        SH(23.4,FKotP.p,FKotP.l,{fov:40,move:'orbit',amp:0.8}),
        SH(26.0,FKsP2.p,FKsP2.l,{fov:40,move:'push',amp:0.7}),
        SH(29.0,FPe.p,FPe.l,{fov:40,move:'push',amp:1}),
        SH(31.6,FYo.p,FYo.l,{fov:40,move:'push',amp:1}),
        SH(35.4,FKsP.p,FKsP.l,{fov:36,move:'push',amp:0.6}),
        MV(38.6,[0,4,-12],[0,4,-28],[1.6,6.5,-13.2],[0,6,-28],6.0,{ease:'inOutSine',fov:46,move:'none',tr:'soft'}),
        MV(45.4,[8,8,-14],[0,6,-28],[3,9.5,-11],[0,7,-28],5.6,{pts:[[6,9,-12]],ease:'inOutSine',fov:50,move:'none'}),
        MV(51.4,[6,4,-10],endLook,[7.5,5.5,-8],endLook,6.0,{ease:'inOutSine',fov:46,move:'none'})],
      says:[[0.3,4,null,'<i>Какой бы конец ни выбрали — сперва вот что случится.</i>',true],[4.6,2.2,null,'<i>Кощей Яге связку чёрных ключей отдаёт.</i>',true],[6.8,3.6,'koschei','Больше не приманю — ни гуся, ни ворона.'],
        [10.6,3.8,null,'<i>Из кармана золотую ниточку достаёт — Коту возвращает.</i><br><i>Кот первый вдох делает — и говорит: хрипло, а словами отвечает.</i>',true],
        [14.4,6.0,'kot','Прости меня. Я всегда сказывал, что ты проиграл, —<br>Так было проще. Прости, что не переписал.'],[20.6,2.8,'koschei','Так расскажи по-другому — по-иному.'],[23.6,2.4,'kot','<i>(качает головой, показывает лапой на Пелагею)</i> Не я. Она уж сказала.'],
        [26.2,2.6,'koschei','Пелагея. Пелагея…'],[29.0,2.2,null,'<i>Над портретом Пелагеи имя её загорается — последнее из забытых.</i>',true],[31.8,3.6,'yosha','Я — Йоша! Мы все вспомнили, все!'],[35.6,3.0,'koschei','<i>(тише)</i> Пелагея… Расскажи ещё, прошу.'],
        [38.8,4.2,null,'<i>Прошка иглу в цепь застёжкой вставляет — цепь смыкается.</i>',true],[45.6,5.4,null,'<i>Кот Учёный по ней кругом идёт — направо песнь заводит,</i><br><i>Налево сказку говорит. И первая сказка у него — наша, выходит.</i>',true]].concat(tail),
      events:[{t:0.2,fn:()=>KA.pose('slump',{k:60,c:11})},{t:4.4,fn:()=>{kTurn(toYa,0.6);KA.pose('offer',{antic:0.2});}},
        {t:4.7,fn:()=>{const f=keys.position.clone();anim(1.6,k=>{keys.position.lerpVectors(f,ya.clone().add(new V3(0.4,1.2,0.4)),CE.inOutSine(k));keys.position.y+=Math.sin(k*Math.PI)*1.5;keys.rotation.y+=0.2;});SFX.keys();later(1.7,()=>{FX.sparkle(ya.clone().add(new V3(0.4,1.4,0.4)),10,0xffe08a);if(yagaM){const n=ACT.npcs.find(q=>q.o===yagaM);if(n)n.em={type:'nod',t:0,d:0.7};}});}},
        {t:6.7,fn:pose('slump')},{t:10.2,fn:()=>{kTurn(toKot,0.6);KA.pose('offer',{antic:0.2});}},
        {t:10.6,fn:()=>{thread.visible=true;k5s('magic');const f=KS.hand.getWorldPosition(new V3()),to=kotH.clone();anim(1.8,k=>{thread.position.lerpVectors(f,to,CE.inOutSine(k));thread.position.y+=Math.sin(k*Math.PI)*0.6;thread.rotation.z+=0.1;});
          k5Trail(()=>thread.visible?thread.position.clone():null,0xffd060,{size:0.3,life:0.35,every:0.03,max:24});
          later(1.9,()=>{thread.visible=false;burst(to,COL.gold,16,2);k5Flash(to,0xffd060,2.4,0.5);SFX.dzin();kot.lids.forEach(l=>{l.rotation.x=-0.5;});G.flags.kotVoice=true;const n=ACT.npcs.find(q=>q.o===kot);if(n)n.em={type:'surprise',t:0,d:0.8};});}},
        {t:12.6,fn:pose('listen',{k:60,c:11})},{t:14.2,fn:()=>{kot.head.rotation.x=0.2;}},{t:20.4,fn:pose('help',{antic:0.15})},
        {t:23.4,fn:()=>{kot.g.rotation.y=kotToPe;const n=ACT.npcs.find(q=>q.o===kot);if(n)n.em={type:'nod',t:0,d:0.8};}},
        {t:26.0,fn:()=>{kTurn(toPe,0.6);KA.pose('listen');}},{t:28.8,fn:()=>{G.flags.names.pelageya=true;k5s('name');banner('Имя вернулось: Пелагея','#d7a6ec',2.6);nameBurst(pe,0xd7a6ec);ACT.emote(pe,'pride');}},
        {t:31.8,fn:()=>{anim(0.6,k=>{yo.pos.y=Math.sin(k*Math.PI)*1.2;});ACT.emote(yo,'joy');G.flags.nameless=false;}},{t:35.4,fn:()=>{KA.pose('slump',{k:50,c:10});KA.set('hRz',0.15);}},
        {t:39.0,fn:()=>{const f=ndl.g.position.clone(),to=OAK.clone().add(new V3(0,1+coilLinks.length*0.16,3.2));anim(1.4,k=>{ndl.g.position.lerpVectors(f,to,CE.inOutSine(k));});k5Trail(()=>ndl.g.parent?ndl.g.position.clone():null,0xffe08a,{size:0.4,life:0.4,every:0.03,max:30});
          later(1.5,()=>{SFX.link();SFX.horn();k5s('chainClose');for(let i=0;i<8;i++)addCoilLink();burst(to,COL.gold,30,5);ringFx(OAK.clone().add(new V3(0,2,0)),COL.gold,5);k5Flash(to,0xffe08a,6,0.7);k5Ring(OAK.clone().add(new V3(0,0.1,0)),0xffd060,1,12,1.2,0.08);k5Pillar(OAK.clone(),0xffd060,22,3.4,2.0);
            leaves.forEach((l,i)=>later(i*0.08,()=>{l.visible=true;anim(0.8,k=>l.scale.setScalar(Math.max(0.01,CE.outBack(k))));}));trunk.material.color.setHex(0x7a5a3e);later(0.3,()=>{FX.leaves(OAK.clone().add(new V3(0,6,2)),20);k5s('leaves');});});}},
        {t:45.8,fn:()=>{anim(5,k=>{const a=k*Math.PI*2;kot.g.position.set(OAK.x+Math.sin(a)*3.4,1.2+k*3,OAK.z+Math.cos(a)*3.4);kot.g.rotation.y=a+Math.PI/2;});lullaby([67,71,74,72,71,69,67],0.42,0,0.12);}},
        {t:51.6,fn:()=>{KA.pose('idle',{k:60,c:11});if(E===0){const f=KS.g.position.clone();KS.g.rotation.y=Math.PI;anim(5.6,k=>{KS.g.position.lerpVectors(f,new V3(-10,-0.3,-40),k);});addMesh(new THREE.TorusGeometry(0.1,0.03,6,12),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.8}),OAK.x+2.4,7.2,OAK.z+1);}
          else if(E===1){KS.g.position.set(KT.x+1,0,KT.z+1.4);KS.g.rotation.y=Math.atan2(-1,-1.4);KA.pose('kneel',{k:60,c:11});}
          else{KS.g.position.set(OAK.x+2.2,0,OAK.z+3.4);KS.g.rotation.y=Math.PI*0.8;KA.pose('sit',{k:60,c:11});}}}],
      tick:(t)=>{if(t>14.2&&t<23.4)kot.head.rotation.x=0.2+Math.sin(t*6)*0.05;},
      end:()=>{W.anims.length=0;KA.reset();bb.style.display='none';G.flags.names={potap:true,yosha:true,proshka:true,pelageya:true};G.flags.nameless=false;G.flags.kotVoice=true;G.flags.w5done=true;G.flags.coils=5;
        G.done['5-B2']=true;G.hub=true;banner('Златая цепь скована!','#ffd76a',3,'звено руками Прошки сковано и словом Пелагеи держится');later(2.6,()=>goLevel('epi'));}});}
  /* ---------- логика кадра ---------- */
  function freeze(){const frozen=G.cine||!K5.fight;for(const e of W.enemies){if(!e.k5||e===KB&&!K5.live)continue;if(frozen){e.cd=Math.max(e.cd,1.2);if(e.state==='ready'||e.state==='wind'){e.state='idle';e.t=0;e.tgt=null;}}}}
  W.updates.push(dt=>{freeze();k5fxTick(dt);stormTick(dt);flyFx(dt);rainTick(dt);
    if(G.cine)for(const c of candles)if(!c.lit&&c.embersM)c.embersM.forEach(m=>{m.m.visible=false;});   // в роликах над погасшими свечами — без пустых угольков
    if(K5.live){KS.g.position.copy(KB.pos);KS.g.rotation.y=KB.face;}else KB.pos.copy(KS.g.position);
    aura.position.copy(KS.g.position).add(new V3(0,2.6,0));aura.intensity=K5.st>=2&&K5.st<=5?0.9+0.3*Math.sin(G.time*3):K5.st===1?0.5:0;kosAnim(dt);KA.tick(dt*CINE.timeScale());if(!G.cine&&KA.on)KA.reset();
    if(G.cine)return;if(!K5.fight){if(Math.floor(G.time*4)!==K5.bt){K5.bt=Math.floor(G.time*4);if(K5.st)setBar();}return;}
    if(K5.st===1)stage1Tick(dt);locksTick(dt);sparkTick(dt);orbTick(dt);bossTick(dt);
    try{k5HintTick(dt);}catch(e){console.error('k5 hint',e);}
    if(!G.solo?(players[0].downed&&players[1].downed):(players[0].downed&&players[1].downed))stageLose();
    if(Math.floor(G.time*4)!==K5.bt){K5.bt=Math.floor(G.time*4);setBar();}});
  // щит: отбив шара, кольцо цепей; удар: замок, наковальня; предмет: передать иглу
  W.onGuardTap=(pi,h)=>{for(const o of K5.orbs)if(o.tgt===h&&o.st!=='up'&&o.left===null)o.left=o.eta;if(RG.on&&RG.t>=0&&RG.press[pi]===null)RG.press[pi]=RG.t;};
  W.onAttack=(pi,h)=>{if(!K5.fight)return;if(k5Locked(h)){floatText(h.pos.clone().add(new V3(0,h.d.height+0.8,0)),'скован! смени героя','#c8a8ff');return;}
    for(const k in K5.locks){const L=K5.locks[k];if(L&&L.h!==h&&hd(L.h.pos,h.pos)<2.4)lockHitBy(L,h);}
    if(K5.st===5)forgeHit(h);};
  W.itemSign=pi=>K5.fight&&K5.st===5?(K5.needle&&K5.needle.holder===active(pi)?p=>needlePass(p):()=>{}):null;
  // кнопки над героями
  for(const pi of[0,1]){prompt(pi,'attack',()=>kosTop(),()=>K5.fight&&K5.live&&KB.state==='broken'&&K5.st!==5&&hd(active(pi).pos,KB.pos)<5,'золотая нить');
    prompt(pi,'attack',()=>{const L=nearLock(pi);return L?L.pad.getWorldPosition(new V3()).add(new V3(0,0.95,0)):new V3();},()=>K5.fight&&!!nearLock(pi)&&(!G.solo||pi===G.soloPi),'бей по замку');
    prompt(pi,'swap',()=>headOf(active(pi)),()=>K5.fight&&k5Locked(active(pi))&&(!G.solo||pi===G.soloPi),'смени героя');
    prompt(pi,'item',()=>headOf(active(pi)),()=>K5.fight&&K5.st===5&&K5.needle&&K5.needle.holder===active(pi)&&!forging()&&!G.solo,'передать иглу');}
  prompt(0,'attack',()=>ANV.clone().add(new V3(0,2.2,0)),()=>K5.fight&&K5.st===5&&forging(),'в такт');
  const objText=pi=>{const st=K5.st;if(!st)return 'Финал…';if(!K5.fight)return 'Этап '+st+' · '+K5N[st];
    if(st===1)return 'Этап 1 · Погасите все восемь свечей: синюю каплю отбей щитом '+K(pi,'guard')+' в последний миг обратно в свечу, Йоша — водой '+K(1,'skill')+', или пять ударов '+K(pi,'attack');
    if(st===2)return 'Этап 2 · Отбивайте удары Кощея '+K(pi,'guard')+' в последний миг — искорка летит к другу. Ключ — отбей щитом. Друга сковали — пять ударов по замку '+K(pi,'attack')+'; сковали тебя — смени героя '+K(pi,'swap');
    if(st===3)return 'Этап 3 · Тёмный шар отбей '+K(pi,'guard')+' в последний миг — к другу; друг отбивает в небо. Ворон — кувырок '+K(pi,'roll');
    if(st===4)return 'Этап 4 · Око над тобой — держи щит '+K(pi,'guard')+'. Око над другом — заходи Кощею за спину и бей '+K(pi,'attack')+'. Волна — прыжок '+K(pi,'jump');
    return 'Этап 5 · Застёжку куёт Прошка у наковальни — в такт '+K(0,'attack')+'. Передать иглу — '+K(pi,'item')+'. Кольцо — щиты вместе';};
  const objTg=pi=>{const st=K5.st;if(st===1)return candles.filter(c=>c.lit).map(c=>c.g);if(st===5)return [anvil];return K5.live?[KS.g]:[];};
  for(const pi of[0,1])W.objectives[pi]=[O(()=>objText(pi),()=>F.stage==='chain',()=>objTg(pi))];
  W.spawns=[[new V3(-3,0,4),new V3(-1,0,4)],[new V3(1,0,4),new V3(3,0,4)]];W.startAct=[0,0];
  W.pauseLine='Финал. Кощея не победить силой — сбейте с него спесь и свяжите золотой нитью сказа. Пять этапов; подсказки — на экране.';
  // для ботов и отладки
  Object.assign(K5,{KB,KS,candles,C,ANV,RG,stageStart,stageWin,stageLose,orbThrow,keyMake,lockHero,unlock,k5Locked,nearLock,LOCK_HP,chainDemo,ravenMake,needlePass,leap,ringStart,sparkTo,setBar,forging,sword,dome});
  W.onStart=()=>{intro();};
  flushDecor();};
