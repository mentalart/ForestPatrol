/* ============================== РЕЛИЗ final06 · 5-Б2: УРОВЕНЬ — арена, пять этапов, ролики между ними ============================== */
// Этапы: 1 «Чёрные свечи» (купол держат восемь свечей — погасить все вместе; цепи из земли, перст-молния),
// 2 «Ключ и искорка» (Кощей сам в бою; отбив зажигает искорку над другом — отбил с искоркой — угольков гаснет вдвое больше; летучие ключи
// запирают героя — друг отпирает ударами; Кощей повелевает природой: ветер слева или справа сдувает героев, молнии в красный круг,
// земля трясётся — из трещин хватают костлявые руки), 3 «Буря» (Кощей летает; тёмный шар отбить другу, друг отбивает в небо; вороны,
// иглы с неба, воронка), 4 «Меч Бессмертного» (серии, задержанный замах, прыжок с волной, «око» — кого выбрал; костяные щитники),
// 5 «Игла» (застёжку из иглы куёт Прошка у наковальни в такт, иглу передают друг другу, Кощей охотится за ней; «Все цепи острова —
// ко мне!» — три чёрные цепи у наковальни, ветер дует от наковальни, из-под земли лезут руки; три цепи разбиты — Кощей без сил). Спесь сбита — оба бьют рядом с ним: «золотая нить сказа». Сюжетные ролики и Сказ по памяти — из прежнего финала.
const K5N=['','Чёрные свечи','Ключ и искорка','Буря','Меч Бессмертного','Игла'];   // прежние этапы: в битве — стадии 1, 2, 8, 9, 12
/* Ролик под голос (отзыв 3: реплики в стихах длиннее прежних). Перед запуском ролика с полем k5 время ролика растягивается
   там, где запись реплики не успевает до следующей реплики: в точку перед следующей склейкой (если она во второй половине
   реплики) или перед следующей репликой вставляется пауза нужной длины — шоты, акценты, события и реплики после неё сдвигаются,
   шот, который её накрывает, движется дольше, tick получает исходное время. Длины берутся из каталога озвучки. */
function k5Fit(def){if(!def||def._fit)return def;def._fit=1;const vf=FIN.vox&&FIN.vox.find;if(!vf)return def;
  const ss=(def.says||[]).slice().sort((a,b)=>a[0]-b[0]),sh=(def.shots||[]).slice().sort((a,b)=>a.t-b.t),ins=[];
  ss.forEach((q,i)=>{if(!q[2]||q[4])return;const e=vf(q[2],q[3]);if(!e||!e.dur)return;const nx=ss[i+1]?ss[i+1][0]:def.dur,slot=nx-q[0];
    const cut=sh.find(s=>s.t>q[0]+slot*0.5&&s.t<nx),at=cut?cut.t:nx,end=q[0]+e.dur;
    const need=Math.max(end+0.1-at,end+0.3-nx);if(need>0.02)ins.push([at,+need.toFixed(2)]);});
  if(!ins.length)return def;ins.sort((a,b)=>a[0]-b[0]);def._ins=ins;
  const f=t=>{let o=t;for(const [a,d] of ins)if(t>=a-1e-6)o+=d;return o;};
  const g=t=>{let c=0;for(const [a,d] of ins){if(t<a+c)break;if(t<a+c+d)return a;c+=d;}return t-c;};
  for(const s of def.shots||[]){const t0=s.t,x=s.x||{};s.t=f(t0);
    if(x.mdur){const e0=t0+x.mdur;x.mdur=f(e0-1e-3)-s.t+1e-3;}if(s.dur&&s.p2){const e0=t0+s.dur;s.dur=Math.max(0.05,f(e0-1e-3)-s.t+1e-3);}}
  for(const q of def.says||[])q[0]=f(q[0]);
  for(const c of (def.k5&&def.k5.cues)||[])c[0]=f(c[0]);
  for(const ev of def.events||[])ev.t=f(ev.t);
  if(def.tick){const tk=def.tick;def.tick=(t,...a)=>tk(g(t),...a);}
  def.dur+=ins.reduce((n,q)=>n+q[1],0);return def;}
{const _play=play;play=function(def){if(def&&def.k5)k5Fit(def);_play(def);};}
build5B2=function(){
  W.zvenAway=false;W.world=5;setTheme('dawn');sky('dawn');W.name='5-Б2 · Кощей Бессмертный и Златая цепь';W.sub='Лукоморье · финал · двенадцать стадий';W.camX=18;const F=W.flags;F.stage='intro';
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.noLose=false;W.noPetals=false;W.fallY=-12;const T=HERO;const C=new V3(0,0,-13),R=11;
  if(!G.flags.names)G.flags.names={};
  Object.assign(K5,{st:0,fight:false,live:false,spark:null,locks:{},orbs:[],adds:[],needle:null,forge:null,zones:[],mark:0,log:[],said:{},bones:false,storm:0,stormTo:0});K5FX.length=0;K5TR.length=0;
  K5.seen={};   // карточки «как победить» — перед каждым этапом при каждой игре уровня (отзыв 4); после «Сбился сказ» — короткая карточка
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
    W.waterTargets.push({pos:e.pos,pri:0.9,active:()=>K5.st===1&&K5.fight&&e.lit,onWater:()=>{candleOff(e,'пш-ш-ш!');if(!K5.said.w){K5.said.w=true;bark(T.yosha,'yosha','Пш-ш-ш! Водицею полью —<br>Свечку чёрную залью!',2.4);}}});
    candles.push(e);return e;}
  CAND.forEach((c,i)=>candleMake(i));
  function candleSet(e,on){e.lit=on;e.L.flame.visible=on;e.embers=on?5:0;e.maxEmb=5;e.state=on?'idle':'k5out';e.cd=rand(1.5,3);if(!on)e.relT=relight();}
  function candleOff(e,txt){if(!e.lit)return;candleSet(e,false);k5s('candleOff');FX.dust(e.pos.clone().add(new V3(0,1.7,0)),10,0x4a3a5a);floatText(e.pos.clone().add(new V3(0,2.5,0)),'Свеча '+txt,'#e0c8ff');K5.log.push('candle'+e.idx);
    if(K5.fight&&K5.st===1&&candles.every(c=>!c.lit))later(0.4,()=>{if(K5.st===1&&K5.fight)stageWin(1);});}
  function candleOn(e){candleSet(e,true);k5s('candleOn');FX.sparkle(e.pos.clone().add(new V3(0,1.8,0)),10,0xb070ff);if(G.time>(K5.gorT||0)){K5.gorT=G.time+14;say('koschei','Горите вновь, огни мои!',1.4);}}
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
    if(!K5.said.lock){K5.said.lock=true;say('zven','Друг в цепях — не зевай:<br>По замку бей, выручай!',3,true);}}
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
    if(!K5.said.spark){K5.said.spark=true;say('zven','Отбил — и искра к другу мчит!<br>По очереди — спесь слетит!',4.2,true);}}
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
// ---- дальше — late_93_koschei_level_p2_storm.js и следующие части (сборка склеивает их по имени файла) ----
