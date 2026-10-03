/* ============================== МИР 4 · 4-3 «ЭЙ, УХНЕМ» — на четверых ============================== */
// огненная баржа с углём для Кузьмы · Потап запевает «Эй, ухнем» · на «ух-нем» все жмут RT вместе: каждый попавший герой — сила, все четверо — рывок
// лямку держит оставленный · брёвна: кольцо у бревна пройдёт, только если его герой прыгнул · топка: три угля — 30 секунд помощи, в гору без огня не идёт
function build43(){
  W.zvenAway=true;W.world=4;setTheme('smorodina');W.name='4-3 · «Эй, ухнем»';W.sub='Огненная Смородина · на четверых · лямка и топка';W.camX=12;const F=W.flags;F.stage='intro';
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.kleshi=true;W.fallY=-12;const T=HERO,LY=-0.45;W.noLavaWater=()=>true;W.tipMul=3;   // корки здесь не встают: огонь слишком силён · подсказки держатся втрое дольше
  const bankM=M(0x6a5646),rockM=M(0x3e3230),logM=M(0x7a5030),stoneM=M(0x5a4c46);
  const Z=makeVestZ(helperOf(3));W.zven=Z;Z.pos.set(-2,2.4,8);
  const H0=-40,H1=-58,HT=4;const hillY=z=>z>H0?0:z<H1?HT:(H0-z)/(H0-H1)*HT;
  /* ---------- берег, горка, ворота Кузьмы ---------- */
  ground(-7,1.5,H0,16,0,bankM);ground(-7,1.5,-92,H1,HT,bankM);W.ramps=[{x0:-2.75,z0:H0,y0:0,y1:HT,dx:0,dz:-1,len:H0-H1,w:4.25}];
  {const L=H0-H1,len=Math.hypot(L,HT);const rp=addMesh(new THREE.BoxGeometry(8.5,0.5,len),bankM,-2.75,HT/2-0.25,(H0+H1)/2);rp.rotation.x=Math.atan2(HT,L);}
  wall(-7.2,-7,-92,16);wall(-7.2,1.7,16,16.2);
  // низкий каменный парапет у огня (сквозь него летит брошенный уголь)
  for(let z=16;z>-92;z-=2){const y=hillY(z-1);const c=colBox(1.5,1.9,y-1,y+0.7,z-2,z,false);c.pass=true;addMesh(new THREE.BoxGeometry(0.4,0.7,2),stoneM,1.7,y+0.35,z-1).castShadow=false;}
  lavaZone(1.9,40,H0,24,LY);lavaZone(1.9,40,-100,H1,LY+HT);{const L=H0-H1,len=Math.hypot(L,HT);const sl=new THREE.Mesh(new THREE.PlaneGeometry(38,len),LAVA_M);sl.rotation.x=-Math.PI/2+Math.atan2(HT,L);sl.position.set(21,LY+HT/2,(H0+H1)/2);W.group.add(sl);}
  for(let z=20;z>-100;z-=rand(3,5))addMesh(new THREE.DodecahedronGeometry(rand(0.9,1.8)),rockM,-rand(8.5,13),hillY(z)+0.2,z).rotation.set(rand(0,3),rand(0,3),0);
  for(let z=20;z>-100;z-=rand(4,6))addMesh(new THREE.DodecahedronGeometry(rand(1,2)),rockM,rand(13,22),LY+hillY(z)-0.3,z);
  bell(-4.5,6);bell(-4.5,-24);bell(-4.5,-66,HT);
  {const path=new THREE.Mesh(new THREE.PlaneGeometry(3.2,H0-16-0.1),M(0x8a6a4a));path.rotation.x=-Math.PI/2;path.position.set(-1.4,0.02,(16+H0)/2);path.receiveShadow=true;W.group.add(path);   // бечевник — тропа бурлаков
    for(let z=12;z>H0;z-=rand(1.2,2.2))addMesh(new THREE.BoxGeometry(rand(0.2,0.5),0.03,rand(0.15,0.3)),M(0x6a4e36),-1.4+rand(-1.3,1.3),0.04,z).castShadow=false;
    for(let z=10;z>-90;z-=8){const y=hillY(z);const t=new THREE.Group();t.position.set(1.05,y,z);W.group.add(t);addMesh(new THREE.CylinderGeometry(0.22,0.26,0.9,10),M(0x3a3028),0,0.45,0,t);   // тумбы с кольцами
      const rg=addMesh(new THREE.TorusGeometry(0.16,0.04,6,12),M(0x8a8a90),0,0.62,-0.24,t);}
    // стан бурлаков у начала: шатёр, костёр, бочки, бухты каната, лодка кверху дном
    const camp=new THREE.Group();camp.position.set(-5,0,12.4);W.group.add(camp);addMesh(new THREE.ConeGeometry(1.4,2.2,6),M(0xb89a6a),0,1.1,0,camp);addMesh(new THREE.ConeGeometry(0.4,0.8,6),M(0x5a3a1a),0,0.4,1.0,camp);
    const fire=new THREE.Group();fire.position.set(-3.2,0,9.2);W.group.add(fire);for(let i=0;i<5;i++){const l=addMesh(new THREE.CylinderGeometry(0.06,0.07,0.9,5),M(0x5a3a1a),0,0.1,0,fire);l.rotation.z=1.3;l.rotation.y=i*1.26;}
    const flame=addMesh(new THREE.ConeGeometry(0.28,0.7,7),MB(0xffa030),0,0.45,0,fire);const fl=new THREE.PointLight(0xff9a40,1,8,2);fl.position.set(-3.2,1.2,9.2);W.group.add(fl);
    for(const[x,z]of[[-6.2,7.4],[-6.3,6.6],[-5.6,7.0]])addMesh(new THREE.CylinderGeometry(0.3,0.3,0.7,10),M(0x7a5030),x,0.35,z);
    for(const[x,z]of[[-4.4,6.2],[-6.2,3.6]]){const c=addMesh(new THREE.TorusGeometry(0.34,0.1,6,14),M(0xc8a060),x,0.1,z);c.rotation.x=Math.PI/2;}
    {const bt=addMesh(new THREE.CylinderGeometry(0.02,0.7,3.2,4,1),M(0x6a4428),-6.1,0.35,1.2);bt.rotation.z=Math.PI/2;bt.rotation.y=Math.PI/2;bt.scale.set(1,1,0.5);}
    // фонари вдоль тропы
    for(let z=4;z>-90;z-=14){const y=hillY(z);addMesh(new THREE.CylinderGeometry(0.05,0.06,2.2,6),M(0x3a3028),-6.3,y+1.1,z);addMesh(new THREE.BoxGeometry(0.3,0.36,0.3),M(0xffd070,{emissive:0xffa030,emissiveIntensity:1}),-6.3,y+2.3,z);}
    // указатель «К кузне»
    {const g=new THREE.Group();g.position.set(-5.6,0,-37);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.06,0.07,2,6),M(0x5a3a1a),0,1,0,g);const b=new THREE.Mesh(new THREE.PlaneGeometry(1.6,0.45),new THREE.MeshBasicMaterial({map:scratchTex('К КУЗНЕ ↑',360,100,'#fff4dc','#5a3a1a')}));b.position.set(0,1.9,0.05);g.add(b);}
    // кузня на горе за воротами: сруб, красные окна, дым из трубы
    const sm=new THREE.Group();sm.position.set(-2.75,HT,-84);W.group.add(sm);addMesh(new THREE.BoxGeometry(7,3.4,5),M(0x6a4428),0,1.7,0,sm);const rf=new THREE.ConeGeometry(5.2,2.4,4);rf.rotateY(Math.PI/4);addMesh(rf,M(0x4a2a1a),0,4.6,0,sm);
    addMesh(new THREE.BoxGeometry(0.9,2.6,0.9),M(0x5a4a44),2,5.4,0,sm);for(const x of[-2,0,2])addMesh(new THREE.BoxGeometry(0.8,0.7,0.05),M(0xff8030,{emissive:0xff5010,emissiveIntensity:1}),x,1.8,2.52,sm);
    W.updates.push(dt=>{flame.scale.y=1+0.25*Math.sin(G.time*11);fl.intensity=0.9+0.2*Math.sin(G.time*13);if(Math.random()<dt*3)burst(new V3(-0.75,HT+8.2,-84),0x5a5a60,2,1.2,1.4);
      if(Math.random()<dt*10){const z=rand(-96,20);burst(new V3(rand(3,20),LY+hillY(z)+0.2,z),0xffb040,1,2.4,0.7);}});}
  // ворота кузни на горе
  const gate=new THREE.Group();gate.position.set(-2.75,HT,-74);W.group.add(gate);for(const s of[-1,1])addMesh(new THREE.BoxGeometry(0.6,4.4,0.6),M(0x4a3a30),s*4.2,2.2,0,gate);addMesh(new THREE.BoxGeometry(9,0.6,0.7),M(0x4a3a30),0,4.5,0,gate);
  const kz=makeSmith('kuzma',false);kz.g.position.set(-1.2,HT,-72.6);const hat=new THREE.Group();hat.position.y=0.3;kz.head.add(hat);addMesh(new THREE.CylinderGeometry(0.36,0.4,0.28,12),M(0x3a3028),0,0.08,0,hat);addMesh(new THREE.CylinderGeometry(0.5,0.5,0.05,14),M(0x3a3028),0,-0.04,0,hat);
  const n1=nutItem(-6.2,0.6,2),n2=nutItem(-6.3,0.6,-22),n3=nutItem(-6.3,hillY(-52)+0.6,-52);
  /* ---------- баржа, лямка, четыре кольца ---------- */
  const bg=makeBarge();const BX=6.8;const B={z:4,tz:4,y:0};
  {const sail=new THREE.Mesh(new THREE.PlaneGeometry(3.6,2.6),new THREE.MeshLambertMaterial({map:scratchTex('☀',256,190,'#ffc840','#b83a20'),side:THREE.DoubleSide}));sail.position.set(0,3.9,-2.2);sail.rotation.y=Math.PI/2;bg.g.add(sail);
    const flag=new THREE.Mesh(new THREE.PlaneGeometry(0.9,0.5),MB(0xffd23a,{side:THREE.DoubleSide}));flag.position.set(0,6.1,-2.0);flag.rotation.y=Math.PI/2;bg.g.add(flag);W.updates.push(()=>{flag.rotation.z=Math.sin(G.time*4)*0.2;sail.rotation.x=Math.sin(G.time*1.3)*0.04;});
    for(let i=0;i<10;i++)addMesh(new THREE.DodecahedronGeometry(rand(0.2,0.35)),M(0xff6a20,{emissive:0xff3000,emissiveIntensity:0.7}),rand(-1.5,1.5),1.7+rand(0,0.3),rand(-3.6,1.6),bg.g);}
  const door=new THREE.Group();bg.g.add(door);door.position.set(-2.55,1.1,3.4);const doorM=M(0x3a2418,{emissive:0xff4000,emissiveIntensity:0.05});addMesh(new THREE.BoxGeometry(0.12,0.7,0.9),doorM,0,0,0,door);
  const topka=new THREE.Group();topka.position.set(-1.7,0,-4.4);bg.g.add(topka);addMesh(new THREE.BoxGeometry(1.4,1.5,1.5),M(0x4a4a50),0,1.6,0,topka);addMesh(new THREE.CylinderGeometry(0.26,0.3,1.8,10),M(0x3a3a40),0.2,3.1,0.3,topka);
  const topM=M(0x5a2a1a,{emissive:0xff4000,emissiveIntensity:0.05});addMesh(new THREE.BoxGeometry(0.08,0.7,0.9),topM,-0.72,1.5,0,topka);
  const topSign=new THREE.Group();W.group.add(topSign);{const b=new THREE.Mesh(new THREE.PlaneGeometry(1.8,0.6),new THREE.MeshBasicMaterial({map:scratchTex('ТОПКА',360,120,'#fff4dc','#8a2a10'),transparent:true,depthTest:false}));b.renderOrder=6;topSign.add(b);
    const ar=new THREE.Mesh(new THREE.ConeGeometry(0.28,0.6,4),MB(0xffb040,{depthTest:false}));ar.rotation.x=Math.PI;ar.position.y=-0.7;ar.renderOrder=6;topSign.add(ar);}topSign.visible=false;
  const FIRE={t:0};const fireSock=hotSocket(BX-2.6,1.2,B.z-4.4,{r:2.5,accept:it=>it.kind==='ugol',onPut:(it)=>{consumeHot(it);FIRE.t=Math.min(30,FIRE.t+10);SFX.whoosh();burst(fireSock.pos.clone(),0xff8a30,16,3);floatText(fireSock.pos.clone().add(new V3(0,1,0)),'Топка: '+Math.round(FIRE.t)+' с','#ffb070');if(!F.fireTold){F.fireTold=true;later(0.5,()=>sayP('Горит! Баржа подсобляет!',2.2));}}});
  const RINGS=[0,1,2,3].map(i=>{const g=new THREE.Group();W.group.add(g);const rm=MB(0xffffff,{transparent:true,opacity:0.85});const ring=addMesh(new THREE.TorusGeometry(0.62,0.07,8,26),rm,0,0.12,0,g);ring.rotation.x=Math.PI/2;ring.castShadow=false;
    const dg=makeDigit(0.7,MB(0xffd23a));dg.position.set(0,2.8,0);g.add(dg);setDigit(dg,i+1);return {i,g,rm,dg,dx:i%2?-2.3:-0.5,dz:-9-i*2.1,hero:null,x:0,z:0,y:0,blocked:false,flash:0};});
  const ropeM=M(0xc8a060);const rope=[0,1,2,3].map(()=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,1,5),ropeM);W.group.add(m);return m;});
  function segTo(m,a,b){const d=b.clone().sub(a),l=d.length();m.position.copy(a).addScaledVector(d,0.5);m.scale.set(1,l,1);m.quaternion.setFromUnitVectors(new V3(0,1,0),d.normalize());}
  function placeBarge(){B.y=LY-0.25+hillY(B.z);bg.g.position.set(BX,B.y,B.z);bg.g.rotation.x=B.z<H0+6&&B.z>H1-6?-Math.atan2(HT,H0-H1)*0.8:0;{const tp=new V3();topka.getWorldPosition(tp);fireSock.pos.set(tp.x-0.9,tp.y+1.3,tp.z);topSign.position.set(tp.x-0.6,tp.y+3.9,tp.z);topSign.quaternion.copy(camS.quaternion);}
    for(const r of RINGS){r.x=r.dx;r.z=B.z+r.dz;r.y=hillY(r.z);r.g.position.set(r.x,r.y,r.z);}
    const bow=new V3(BX-1.2,B.y+1.3,B.z-7.4);let prev=bow;RINGS.forEach((r,k)=>{const p=new V3(r.x,r.y+0.9,r.z);segTo(rope[k],prev,p);prev=p;});}
  placeBarge();W.RINGS=RINGS;W.BARGE=B;W.FIRE=FIRE;W.FIRESOCK=fireSock;
  // брёвна поперёк берега
  const LOGS=[-30,-35,-40].map(z=>{const y=hillY(z);const c=colBox(-6.8,1.5,y-1,y+0.5,z-0.35,z+0.35,false);const m=addMesh(new THREE.CylinderGeometry(0.33,0.33,8.2,10),logM,-2.65,y+0.28,z);m.rotation.z=Math.PI/2;return {z,top:y+0.5,c,m,gone:false};});W.LOGS=LOGS;
  const L2=linkItem(-6.3,1.1,-33);W.linkTotal+=2;   // ещё два: за первый рывок и от Кузьмы
  // горячая куча угля на берегу у подножия горки и наверху
  const piles=[[-5.4,-44],[-5.4,-56]].map(([x,z])=>{const y=hillY(z);const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);for(let i=0;i<8;i++)addMesh(new THREE.DodecahedronGeometry(rand(0.2,0.34)),M(0xff7a20,{emissive:0xff4000,emissiveIntensity:0.9}),rand(-0.6,0.6),0.15,rand(-0.5,0.5),g);forgeZone(x,y,z,1.3);return {x,z,y};});
  const coals=[];piles.forEach(p=>{for(let i=0;i<2;i++)coals.push(hotItem('ugol',p.x+(i?0.5:-0.3),p.y,p.z+(i?-0.4:0.3),{name:'ugol'}));});
  /* ---------- песня: «Эй, ухнем» — цикл 2,6 с: «Эй» — «ух-нем» (окно 1 с) ---------- */
  const SG={on:false,t:0,C:2.6,k:-1,hit:[false,false],res:false,verse:0,rush:0};
  const LINES=[['Эй, ухнем!','Эй, ухнем!','Ещё разик, ещё да раз!','Эй, ухнем!'],['Разовьём мы берёзу…','Разовьём мы кудряву…','Ай-да, да ай-да!','Эй, ухнем!'],['Мы по бережку идём…','Песню солнышку поём…','Эй, ухнем!','Эй, ухнем!'],['Ай-да, да ай-да, ай-да, да ай-да!','Ещё разик, ещё да раз!','Эй, ухнем!','Эй, ухнем!']];
  function startSong(){SG.on=true;SG.t=-1.2;SG.k=-1;W.song={t:0,B:SG.C/2,show:true,state:'play',pulse:0};}
  const inWin=()=>{const u=((SG.t%SG.C)+SG.C)%SG.C;return u>=1.0&&u<2.0;};
  W.skillHook=(pi,h)=>{if(!SG.on||G.cine)return false;const mine=RINGS.filter(r=>r.hero&&r.hero.player===pi);if(!mine.length)return false;
    if(inWin()){if(!SG.hit[pi]){SG.hit[pi]=true;mine.forEach(r=>{r.flash=1;});if(G.solo&&!SG.hit[1-pi]){const ot=RINGS.filter(r=>r.hero&&r.hero.player===1-pi);if(ot.length){SG.hit[1-pi]=true;ot.forEach(r=>{r.flash=1;});}}floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Ух-нем!','#ffd76a');h.atkT=0.3;}}
    else{SFX.miss();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Рано — «ух-нем» подожди','#ffd0d0');}return true;};
  function songTick(dt){SG.t+=dt;W.song.t=SG.t;W.song.pulse=Math.max(0,(W.song.pulse||0)-dt*4);const k=Math.floor(SG.t/SG.C);const u=SG.t-k*SG.C;
    if(k>SG.k){SG.k=k;SG.res=false;SG.hit=[false,false];const V=LINES[Math.min(LINES.length-1,SG.verse)];floatText(T.potap.pos.clone().add(new V3(0,T.potap.d.height+1.1,0)),'♪ '+V[k%4],'#ffe7a0');tone(mf(45),0.5,'triangle',0.16);tone(mf(57),0.3,'sine',0.05);W.song.pulse=1;}
    if(u>=1.0&&!SG.w1){SG.w1=true;tone(mf(50),0.35,'triangle',0.18);tone(mf(62),0.25,'sine',0.06);W.song.pulse=1;}
    if(u>=1.5&&!SG.w2){SG.w2=true;tone(mf(50),0.45,'triangle',0.18);W.song.pulse=1;}
    if(u<1.0){SG.w1=false;SG.w2=false;}
    if(u>=2.0&&!SG.res){SG.res=true;resolvePull();}}
  function resolvePull(){let n=0;for(const r of RINGS)if(r.hero&&SG.hit[r.hero.player])n++;
    let mv=[0,0.5,1.0,1.6,3.2][n];if(n===4){SFX.ok();banner('Рывок!','#ffd76a',0.9,'все четверо — «ух-нем», разом!');SG.rush++;if(!F.l1){F.l1=true;const it=linkItem(-1.4,1.3,B.z-15);W.linkTotal--;anim(1,k=>{it.base=B.y+2.6-k*0.4;});}}
    const fire=FIRE.t>0;if(fire)mv*=1.4;
    if(B.z<H0+4&&!fire&&mv>0){mv=0;floatText(new V3(BX,B.y+3,B.z),'Без огня в гору не идёт — никак!','#ffb070');if(!F.hillTold){F.hillTold=true;sayP('…топка! Три уголька — полминуты подмоги.',3.2);}}
    // бревно: кольцо проходит, только если его герой прыгнул
    let blockAt=null;for(const r of RINGS)for(const L of LOGS){if(r.hero&&r.z>L.z+0.3&&r.z-mv<L.z+0.3){const h=r.hero;const jumped=h&&(!h.grounded||G.time-(h.airT||-9)<1.1||h.pos.y>L.top-0.05);
        if(!jumped){const lim=r.z-(L.z+0.6);if(blockAt===null||lim<blockAt.lim)blockAt={lim,r};}}}
    if(blockAt){mv=Math.max(0,Math.min(mv,blockAt.lim));blockAt.r.blocked=true;if(G.time-(F.logTipT||-9)>4){F.logTipT=G.time;const r=blockAt.r;const who=r.hero?(r.hero.active?'прыгай':'смени героя и прыгай'):'встаньте в кольцо';
      floatText(new V3(r.x,r.y+2,r.z),'У кольца '+(r.i+1)+' — бревно!','#ffd76a');for(const pi of[0,1])tip(pi,'Бревно у кольца '+(r.i+1)+': этот герой на «ух-нем» прыгает '+K(pi,'jump')+'.<br>Оставленный сам не прыгнет — '+who,3);}}
    if(n>0&&mv>0){B.tz=B.z-mv;}else if(n===0&&SG.k>1&&!F.soloTold){F.soloTold=true;for(const pi of[0,1])tip(pi,'В кольца на лямке встаньте и на «ух-нем» жмите '+K(pi,'skill')+'.<br>Оставленный герой лямку держит сам — не отпустит.',3.4);}}
  // герои в кольцах: оставленный держит лямку и идёт с ней
  function ringTick(dt){const prevZ=B.z;if(B.tz<B.z){B.z=Math.max(B.tz,B.z-dt*4.2);}const dz=B.z-prevZ;placeBarge();
    for(const r of RINGS){let best=null,bd=0.8;const keep=r.hero&&Math.hypot(r.hero.pos.x-r.x,r.hero.pos.z-r.z)<1.25&&Math.abs(r.hero.pos.y-r.y)<3;   // кто в кольце — держит, даже в прыжке
      if(keep)best=r.hero;else for(const h of HEROES){if(h.active&&players[h.player].downed)continue;const d=Math.hypot(h.pos.x-r.x,h.pos.z-r.z);if(d<bd&&Math.abs(h.pos.y-r.y)<1.3&&!RINGS.some(q=>q!==r&&q.hero===h)){bd=d;best=h;}}r.hero=best;
      if(best&&dz<0){best.pos.z+=dz;if(!best.active){best.pos.x=damp(best.pos.x,r.x,6,dt);best.face=Math.PI;}
        for(const L of LOGS)if(best.pos.z>L.z-0.3&&best.pos.z<L.z+1.15&&best.pos.y<L.top+0.02){best.pos.y=L.top+0.02;best.vel.y=Math.max(best.vel.y,2.6);best.grounded=false;best.groundRef=null;}}   // прыгнувший перемахивает бревно вместе с лямкой
      r.flash=Math.max(0,r.flash-dt*2);if(dz<0)r.blocked=false;const c=r.blocked&&Math.sin(G.time*10)>0?0xff5a3a:r.flash>0?0xffd76a:best?PCOL[best.player]:0xffffff;r.rm.color.setHex(c);r.dg.visible=r.blocked||!best||(r.flash>0);}
    for(const h of HEROES)if(!h.grounded)h.airT=G.time;
    for(const L of LOGS)if(!L.gone&&RINGS.every(r=>r.z<L.z-0.9)){L.gone=true;L.c.on=false;SFX.whoosh();const m=L.m,y0=m.position.y;anim(1.4,k=>{m.position.x=-2.65+k*12;m.position.y=y0-Math.max(0,k-0.6)*2.2;m.rotation.x-=0.3;});later(0.6,()=>floatText(new V3(0,L.top+1,L.z),'Лямка бревно столкнула!','#ffd9a0'));}
    topSign.visible=F.stage==='hill';if(topSign.visible)topSign.children[1].position.y=-0.7-0.15*Math.abs(Math.sin(G.time*5));topM.emissiveIntensity=FIRE.t>0?1+0.2*Math.sin(G.time*9):0.05;
    if(FIRE.t>0){FIRE.t-=dt;doorM.emissiveIntensity=0.9+0.2*Math.sin(G.time*9);bg.fireM.emissiveIntensity=1.2;bg.fl.intensity=1.4;if(Math.random()<dt*6)burst(new V3(BX+0.5,B.y+3.6,B.z+4.4),0x6a6a70,2,1.5,0.8);}else{doorM.emissiveIntensity=0.05;bg.fireM.emissiveIntensity=0;bg.fl.intensity=0;}}
  /* ---------- камера: общий экран на лямку и баржу ---------- */
  const cam={x:0,y:0,z:0,r:9.5,camActive:()=>!G.cine&&F.stage!=='intro'};W.camZones.push(cam);
  /* ---------- сюжет ---------- */
  function intro(){const po=T.potap,pr=T.proshka,pe=T.pelageya,yo=T.yosha;HEROES.forEach((h,i)=>{placeOnGround(h,-4+i*1.2,-1.5,0);h.face=Math.PI*0.8;});
    play({dur:23,fov:46,camK:2.4,shots:[shot(0,[-6,4,14],[BX,1,2]),shot(5,[-5,2,-2],[0,1.2,-6]),shot(9.6,[po.pos.x-1.8,1.5,po.pos.z-2],[po.pos.x,1.1,po.pos.z]),shot(15,[-2,6,4],[0,0,-12]),shot(19.4,[pe.pos.x+1.6,1.3,pe.pos.z-1.4],[pe.pos.x,0.9,pe.pos.z])],
      says:[[0.3,4.4,null,'<i>На берегу Смородины стоит тяжёлая огненная баржа с углём для Кузьмы. Бурлаки ушли.</i>',true],[5,2.4,'potap','<i>(берёт лямку)</i> Ну-ка, ну-ка…'],
        [7.6,2,null,'<i>…и сам удивившись, запевает басом.</i>',true],[9.6,3,'potap','Эй, ухнем! Эй, ухнем! Ещё разик, ещё да раз!'],[12.8,2,'proshka','Ты слова-то помнишь?!'],[14.8,2,'potap','Эту — помню, эту — да.'],
        [17,2.4,null,'<i>Четыре кольца на лямке. Берёмся вчетвером.</i>',true],[19.4,3.4,'pelageya','…на «ух-нем» — все вместе, разом.']],
      events:[{t:9.6,fn:()=>{tone(mf(45),0.6,'triangle',0.18);later(0.9,()=>{tone(mf(50),0.4,'triangle',0.18);tone(mf(50),0.5,'triangle',0.18,null,0.45);});}}],
      end:()=>{W.anims.length=0;F.stage='pull';RINGS.forEach((r,i)=>{if(i<4){}});placeOnGround(po,RINGS[0].x,RINGS[0].z,0);po.face=Math.PI;placeOnGround(pr,RINGS[2].x+0.6,RINGS[2].z+1.4,0);placeOnGround(pe,RINGS[1].x,RINGS[1].z,0);pe.face=Math.PI;placeOnGround(yo,RINGS[3].x+0.6,RINGS[3].z+1.2,0);
        if(players[0].act!==0)doSwap(0);if(players[1].act!==1)doSwap(1);snapCams();startSong();
        for(const pi of[0,1])tip(pi,'Лямка на четверых: в кольца встаньте (оставленный держит сам).<br>На «ух-нем» — жмите '+K(pi,'skill')+' вместе, по часам!',4);}});}
  function endScene(){F.stage='end';SG.on=false;W.song=null;W.skillHook=null;const po=T.potap,pr=T.proshka;
    [[-3.6,-66],[-2.6,-65],[-4.6,-65],[-1.6,-66]].forEach(([x,z],i)=>{placeOnGround(HEROES[i],x,z,HT);HEROES[i].face=Math.PI;});
    play({dur:18,fov:46,camK:2.4,shots:[shot(0,[-8,HT+4,-54],[BX,HT,-60]),shot(5,[-1,HT+1.6,-68.6],[-1.2,HT+1.8,-72.6]),shot(10.4,[-5,HT+2,-62],[-2.8,HT+1,-66]),shot(14.4,[po.pos.x-1.2,HT+1.4,-67.6],[po.pos.x,HT+1,-65])],
      says:[[0.3,4.2,null,'<i>Под последний куплет баржа в гору вползает.</i>',true],[5,3,null,'<i>Кузьма у ворот баржу встречает — и шапку снимает.</i>',true],[8.2,2,'kuzst','Эх… Как в старину, как встарь.'],
        [10.4,3.4,null,'<i>Звено — из угольного мешка: Кузьма его Потапу отдаёт.</i>',true],[14.4,3.2,'potap','<i>(тихо)</i> Песню я не забыл.<br>Значит, и остальное вспомню — хватит сил.']],
      events:[{t:5.6,fn:()=>{const f=hat.position.clone();anim(1.2,k=>{hat.position.set(0.3*k,0.3+Math.sin(k*Math.PI)*0.3-k*0.6,0.35*k);hat.rotation.x=k*1.2;kz.armL.rotation.x=-k*1.6;});}},
        {t:10.4,fn:()=>{giveLink(kz.g.position,po,HT+2,1.4);}}],
      end:()=>{W.anims.length=0;flushGifts();F.out=true;banner('Баржа у кузни!','#ffb070',2.4,'в лавке у Векши — пляска «Бурлацкая», загляни!');later(1.8,finishLevel);}});}
  W.updates.push(dt=>{
    if(F.stage==='pull'||F.stage==='hill'){if(!G.cine)songTick(dt);ringTick(dt);
      const rz=(RINGS[0].z+RINGS[3].z)/2;cam.x=1.2;cam.z=rz+1.6;cam.y=hillY(rz);
      if(F.stage==='pull'&&B.z<H0+6){F.stage='hill';SG.verse=2;banner('В гору!','#ffb070',2,'баржа в гору едет, лишь коль огонь горит: неси уголь клещами '+K(0,'item')+' в топку на носу баржи');
        const D=2.4;let pu=0;anim(1.6,k=>{const u=smooth(k),du=u-pu;pu=u;B.z-=D*du;B.tz-=D*du;RINGS.forEach(r=>{r.dz+=D*du;});});SFX.whoosh();floatText(new V3(BX,B.y+3.4,B.z-4),'Баржа подтянулась!','#ffd9a0');}
      if(F.stage==='hill'){const tp=fireSock.pos;cam.z=(rz+1.6+tp.z)/2;cam.x=0.6;cam.r=11.2;}
      if(F.stage==='pull'){SG.verse=B.z<-14?1:0;}
      if(F.stage==='hill'&&B.z<H0-4)SG.verse=3;
      if(B.z<=-50&&!G.cine)endScene();}});
  const arcDots=[];for(let i=0;i<9;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(0.07,6,5),MB(0xffc860,{transparent:true,opacity:0.8,depthWrite:false}));m.visible=false;W.group.add(m);arcDots.push(m);}
  W.updates.push(()=>{let hh=null;for(const pi of[0,1]){const h=active(pi),it=heroCarry(h);if(it&&it.kind==='ugol'&&hd(h.pos,fireSock.pos)<9){hh=h;break;}}
    arcDots.forEach((m,i)=>{m.visible=!!hh&&F.stage==='hill';if(!m.visible)return;const u=(i+1)/10,a=hh.pos,b=fireSock.pos;m.position.set(lerp(a.x,b.x,u),lerp(a.y+1,b.y,u)+Math.sin(u*Math.PI)*1.6,lerp(a.z,b.z,u));m.material.opacity=0.4+0.4*Math.sin(G.time*8-i);});});
  /* ---------- рисунки кнопок ---------- */
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'skill',()=>headOf(h()),()=>SG.on&&RINGS.some(r=>r.hero&&r.hero.player===pi)&&inWin()&&!SG.hit[pi],'ух-нем!');
    prompt(pi,'jump',()=>headOf(h()),()=>RINGS.some(r=>r.hero===h()&&r.blocked),'прыгай через бревно');
    prompt(pi,'item',()=>headOf(h()),()=>{const it=heroCarry(h());return !!it&&hd(fireSock.pos,h().pos)<4.5;},'в печку');}
  /* ---------- задачи ---------- */
  const OR=(text,done,targets,ghost,read)=>{const o=O(text,done,targets,ghost);o.read=read;return o;};
  const mk=pi=>[
    OR(()=>'Лямка на четверых: в кольца встаньте — оставленный держит сам.<br>На «ух-нем» жмите '+K(pi,'skill')+' вместе: все четверо — рывок, по часам!',()=>B.z<-24,()=>RINGS.filter(r=>!r.hero).map(r=>r.g),null,'…на «ух-нем» — все вместе, разом.'),
    OR(()=>'Брёвна на берегу: кольцо у бревна пройдёт, лишь коль его герой на «ух-нем» прыгнет '+K(pi,'jump')+'.<br>Оставленного — смени и прыгай. Кто перепрыгнул — «Ко мне!» '+K(pi,'call')+' кликни.',()=>RINGS.every(r=>r.z<LOGS[2].z-0.5),()=>RINGS.filter(r=>r.blocked).map(r=>r.g),null,'…бревно — прыжком, а лямку не бросать.'),
    OR(()=>'В гору! Топка на носу баржи (над ней вывеска «ТОПКА» горит): уголь из горячей кучи клещами '+K(pi,'item')+' — туда (можно на ходу бросить).<br>Три уголька — тридцать секунд. Двое держат лямку, двое бегают — не спросят.',()=>F.stage==='end',()=>FIRE.t>0?[bg.g]:[door],null,'…топка горит — баржа подсобляет.'),
    O('Кузьма у ворот ждёт…',()=>false,()=>[kz.g])];
  for(const pi of[0,1])W.objectives[pi]=mk(pi);
  W.tipZones.push({cond:(pi,h)=>F.stage==='hill'&&!heroCarry(h)&&piles.some(p=>hd(h.pos,p)<2.2),text:pi=>'Горячий уголь: клещами '+K(pi,'item')+' возьми — и в печку баржи.<br>На бегу на четыре шага бросить можно — не страшно.'});
  W.spawns=[[new V3(-4.4,0,10),new V3(-5.6,0,11)],[new V3(-1.4,0,10),new V3(-0.2,0,11)]];W.startAct=[1,0];
  W.pauseLine='Эй, ухнем. В кольца на лямке встаньте (оставленный держит сам) —<br>И на «ух-нем» жмите RT вместе, по часам.<br>Брёвна — прыжок героя из кольца. В гору — лишь с огнём:<br>Уголь клещами в топку баржи — и пойдём!';
  W.onStart=()=>{later(0.4,intro);};
  flushDecor();}

