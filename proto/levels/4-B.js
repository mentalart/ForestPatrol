/* ============================== 4-Б «ЗМЕЙ ГОРЫНЫЧ» — босс мира 4 ============================== */
// три головы — три запала: левая сонная (медленный жёлтый), правая голодная (красный), средняя плюёт огнём (синий)
// Пробой головы держится 6 секунд: не погасили соседнюю — первая просыпается · вдох: головы втягивают искры; жёлудь на долгом вдохе средней
// сытую гасит Йоша, слабое место — Совиный взор, Потап держит щит · средняя подсматривает · узда: двумя клещами с двух сторон и «раз-два-три» вместе
function build4B(){
  W.zvenAway=true;W.world=4;setTheme('smorodina');W.name='4-Б · «Змей Горыныч»';W.sub='Босс мира 4 · три головы перессорились';W.camX=16;const F=W.flags;F.phase=0;
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.kleshi=true;W.fallY=-12;W.noLavaWater=()=>true;
  const C={x:0,z:-6},R=12,T=HERO,LY=-0.8;
  /* ---------- скала за Калиновым мостом ---------- */
  ground(-15,15,-24,10,0,M(0x5a4a40));lavaZone(-60,60,-80,30,LY);
  {const fl=new THREE.Mesh(new THREE.CylinderGeometry(R+0.5,R-0.5,0.4,40),M(0x6a564a));fl.position.set(C.x,-0.18,C.z);fl.receiveShadow=true;W.group.add(fl);}
  for(let i=0;i<14;i++){const a=i/14*Math.PI*2;addMesh(new THREE.DodecahedronGeometry(rand(1,1.8)),M(0x3e3230),C.x+Math.cos(a)*(R+1.5),0.3,C.z+Math.sin(a)*(R+1.5));}
  box(-8,8,0,2.2,-24,-15.5,M(0x4a3a34));   // уступ, где сидит туловище
  const Z=makeVestZ(helperOf(3));W.zven=Z;Z.pos.set(0,3,4);
  const arena={x:C.x,z:C.z,r:R-2,camActive:()=>!G.cine};W.camZones.push(arena);
  const bb=$('bossbar');bb.style.display='block';W.onLeave=()=>{bb.style.display='none';};
  /* ---------- Горыныч: туловище на уступе, три шеи, три головы-морока ---------- */
  const gor=makeGorynych();gor.g.position.set(0,2.2,-18.6);gor.g.scale.setScalar(1.0);
  const neckM=M(0x4a8a3a);const HP=[[-5.4,-9.6],[0,-10.8],[5.4,-9.6]];const SH=[[-2.0,5.2,-16.4],[0,5.8,-16.6],[2.0,5.2,-16.4]];
  const necks=HP.map(()=>{const segs=[];for(let i=0;i<8;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(0.85-i*0.04,10,8),neckM);m.castShadow=true;W.group.add(m);segs.push(m);}return segs;});
  let heads=[];const NAME=['левая','средняя','правая'],VO=['gorL','gorM','gorR'];
  function spawnHeads(){heads=HP.map(([x,z],i)=>{const e=makeFoe('golova',x,z,{scale:1.4,leash:0.5,pi:i===0?0:i===2?1:undefined,signals:i===0?['yellow']:i===2?['red']:['blue'],face:0});e.noMove=true;e.noKill=true;e.idx=i;e.def=Object.assign({},e.def);if(i===1)e.def.ranged=true;
      e.embers=e.maxEmb=4;e.onFinisher=h=>{floatText(e.pos.clone().add(new V3(0,3,0)),'Пробой держите — соседнюю гасите!','#ffd76a');};
      e.tick=(e,dt)=>{if(e.state==='wind'&&!e._w){e._w=true;if(e.idx===0)e.wdur*=1.6;}if(e.state!=='wind')e._w=false;
        if(e.state==='broken'&&!e._b){e._b=true;e.bdur=F.phase===2?9:6;SFX.thud();floatText(e.pos.clone().add(new V3(0,3,0)),NAME[e.idx][0].toUpperCase()+NAME[e.idx].slice(1)+' голова — в Пробое! Ещё '+Math.round(e.bdur)+' секунд','#fff2b0');}
        if(e.embers>e.maxEmb+1)e.embers=e.maxEmb+1;
        if(e.state!=='broken'&&e._b){e._b=false;if(F.phase<3&&!G.cine){floatText(e.pos.clone().add(new V3(0,3,0)),'Проснулась!','#ff9a8a');bark({g:e.g},VO[e.idx],e.idx===0?'Ы-ы… кто разбудил, кто посмел?':e.idx===2?'Я голодная, голодная!':'Полетели, полетели!',1.6);}}
        if(e.sat>0){e.guardAll=()=>e.open<=0&&e.state!=='broken';e.darkGuard=()=>e.open<=0;e.guardText='сытая — погаси живой водой иль Совиный взор: слабое место';}else{e.guardAll=null;e.darkGuard=null;}};
      e.post=(e,dt)=>{const L=e.L;const inh=F.inhale>0&&e.state!=='broken';L.jaw.rotation.x=e.state==='wind'?0.5:inh?0.7:e.state==='broken'?0.3:0.1;e.g.position.y=e.state==='broken'?-0.4:Math.sin(G.time*1.5+e.idx)*0.15;};
      if(i===1)e.pickSig=peekSig;return e;});}
  function updNecks(){heads.forEach((e,i)=>{const a=new V3(...SH[i]),b=e.pos.clone().add(new V3(0,1.5+(e.g.position.y-e.pos.y),-0.6));const segs=necks[i];segs.forEach((m,k)=>{const t=(k+1)/(segs.length+1);m.position.lerpVectors(a,b,t);m.position.y+=Math.sin(t*Math.PI)*1.6;});});}
  const setBar=()=>{const seg=heads.map(e=>'<span class="seg" style="width:60px;display:inline-block"><i style="width:'+Math.round((e.state==='broken'?0:Math.max(0,e.embers)/e.maxEmb)*100)+'%"></i></span>').join(' ');
    bb.innerHTML='<b>Змей Горыныч</b> · фаза '+Math.max(1,Math.min(3,F.phase))+' / 3 '+seg;};
  /* ---------- искры с арены и вдох голов ---------- */
  F.inhale=0;F.sparkT=2;
  const mark=markMesh(1.1);mark.visible=false;W.group.add(mark);const markPos=new V3();F.longInh=0;
  W.marks.push({pos:markPos,active:()=>F.phase===2&&F.longInh>0&&heads[1]&&heads[1].state!=='broken',onHit:()=>{const e=heads[1];F.longInh=0;mark.visible=false;tone(1600,0.4,'sine',0.2,600);floatText(e.pos.clone().add(new V3(0,3.2,0)),'Кха-кха!','#ffe08a');
    e.state='broken';e.t=0;e.embers=0;e._b=false;SFX.brk();banner('ПРОБОЙ!','#fff2b0',1.4,'средняя голова жёлудем подавилась');}});
  W.onOwl=()=>{for(const e of heads)if(e.alive&&e.sat>0){e.open=2.5;floatText(e.pos.clone().add(new V3(0,3.2,0)),'Слабое место!','#e7c3ff');}};
  /* ---------- узда: горячая, двумя клещами с двух сторон ---------- */
  const BR={g:new THREE.Group(),holders:[null,null],on:false,press:[-9,-9]};BR.g.position.set(-7,0.8,3);W.group.add(BR.g);const BL=hotLook('uzda',BR.g);BR.pos=BR.g.position;
  {const st=addMesh(new THREE.CylinderGeometry(0.7,0.8,0.8,10),M(0x5a4a44),-7,0.4,3);W.cyls.push({x:-7,z:3,r:0.8,miny:-1,maxy:0.8,on:true});}
  const neckSpot=new V3(0,1.4,-12.6);const spotM=new THREE.Mesh(new THREE.TorusGeometry(0.9,0.1,8,28),MB(0xffd76a,{transparent:true,opacity:0.9}));spotM.position.copy(neckSpot);spotM.visible=false;W.group.add(spotM);
  W.grabs.push({pos:()=>BR.pos,r:2.2,active:()=>!BR.on&&F.phase>=1,onGrab:(h)=>{const pi=h.player;if(BR.holders[pi]===h){BR.holders[pi]=null;floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Отпустил узду','#ffb070');return;}
    BR.holders[pi]=h;SFX.latch();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),BR.holders[1-pi]?'Узда — в две пары клещей, в две!':'Тяжела! Вторые клещи — с другой стороны','#ffb070');}});
  function bridleTick(dt){BL.m.emissiveIntensity=0.8+0.2*Math.sin(G.time*6);const H2=BR.holders.map((h,pi)=>h&&h===active(pi)&&!players[pi].downed?h:null);BR.holders=H2;
    if(G.solo&&H2[0]&&H2[1]){const pa=H2.find(h=>!ctrl(h));if(pa&&!pa.following){pa.following=true;pa.stuck=0;}}
    if(H2[0]&&H2[1]){if(hd(H2[0].pos,H2[1].pos)>4){const far=H2[0];BR.holders[0]=null;floatText(far.pos.clone().add(new V3(0,far.d.height+0.6,0)),'Разошлись — узда упала, эх!','#ffd0d0');return;}
      const mid=H2[0].pos.clone().add(H2[1].pos).multiplyScalar(0.5);BR.pos.x=damp(BR.pos.x,mid.x,8,dt);BR.pos.z=damp(BR.pos.z,mid.z,8,dt);BR.pos.y=damp(BR.pos.y,mid.y+1,8,dt);BR.g.rotation.y+=dt;}
    else{const g=groundAt(BR.pos.x,BR.pos.z,BR.pos.y+0.5);BR.pos.y=damp(BR.pos.y,Math.max(g.y,0)+0.05,6,dt);}
    spotM.visible=F.phase===3;if(spotM.visible){spotM.scale.setScalar(1+0.12*Math.sin(G.time*6));spotM.rotation.y+=dt;}}
  W.skillHook=(pi,h)=>{if(F.phase!==3||BR.on)return false;if(BR.holders[pi]!==h)return false;if(!(BR.holders[0]&&BR.holders[1])||hd(BR.pos,neckSpot)>3){floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Узду — вдвоём к светящемуся месту на шее','#ffd9a0');return true;}
    BR.press[pi]=G.time;if(G.solo)BR.press[1-pi]=G.time;floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),['Раз!','Два!','Три!'][Math.min(2,Math.floor(Math.random()*3))],'#ffd76a');
    if(Math.abs(BR.press[0]-BR.press[1])<0.8){BR.on=true;win();}else if(!F.rtTold){F.rtTold=true;for(const q of[0,1])tip(q,'Раз-два-три — жмите '+K(q,'skill')+' вместе, в один миг!',3);}return true;};
  /* ---------- фазы ---------- */
  function nextPhase(n){F.phase=n;SFX.brk();shakeAll(0.06,0.5);
    if(n===2){heads.forEach(e=>{e.state='idle';e.t=0;e.cd=2;e.embers=e.maxEmb=4;e._b=false;});heads[1].signals=['blue','yellow','red'];F.inhT=4;
      say('gorM','Все — вдох! Сейчас как дунем — держись!',2.4);banner('Фаза 2 · вдох','#ffb070',2.8,'головы тянут к себе искры: жёлудем стреляй, как средняя долго вдыхает · сытую Йоша тушит · слабое место — Совиным взором · Потап — щитом');}
    if(n===3){F.stun=25;heads.forEach(e=>{e.state='broken';e.t=0;e.bdur=99;e.embers=0;});
      banner('Фаза 3 · узда','#ffd76a',3,'на шее видно место для узды: горячую узду вдвоём несите — клещами '+K(0,'item')+' / '+K(1,'item')+' с двух сторон — и на «раз-два-три» нажмите '+K(0,'skill')+' вместе');
      later(1.2,()=>sayP('…Кузьма сказал: клещами возьмёте — не рукой.',3));}}
  function win(){F.phase=4;F.won=true;SFX.horn();shakeAll(0.06,0.5);const from=BR.pos.clone();anim(0.8,k=>{BR.pos.lerpVectors(from,neckSpot,smooth(k));});BR.holders=[null,null];spotM.visible=false;banner('Узда на Змее — вот так!','#ffd76a',2.2,'вдвоём — в один миг');later(1.2,ending);}
  // Ctrl+Alt+B (релиз, late_95_dev.js): следующая фаза босса — для проверки и показа; вернуть true, если перешли
  W.bossNext=()=>{if(G.cine||F.won||F.phase<1||F.phase>3)return false;if(F.phase===3)win();else nextPhase(F.phase+1);return true;};
  /* ---------- сюжет ---------- */
  function intro(){HEROES.forEach((h,i)=>{placeOnGround(h,-4.5+i*3,5,0);h.face=Math.PI;});spawnHeads();heads.forEach(e=>{e.state='idle';e.cd=99;});
    play({dur:20,fov:48,camK:2.4,shots:[shot(0,[0,6,10],[0,5,-18]),shot(5,[-7,3,-4],[-5.4,1.4,-9.6]),shot(9,[7,3,-4],[5.4,1.4,-9.6]),shot(13,[0,3.4,-3],[0,1.6,-10.8]),shot(16.6,[-5,2,4],[-7,0.8,3])],
      says:[[0.3,4.4,null,'<i>Горыныч на скале за Калиновым мостом сидит —</i><br><i>Три головы спорят, каждая своё твердит.</i>',true],[5,2.6,'gorL','Спать хочу… спать…'],[7.6,1.4,'gorL','Ы-ы-ы…'],[9,2.6,'gorR','А я — есть! Вот и обед пришёл сам!'],
        [13,2.8,'gorM','Лететь надо! Кто там звенит, кто там?'],[16.6,3.4,'pelageya','Тут написано… у каждой головы свой запал. Узда — горячая.']],
      tick:(t)=>{updNecks();},
      end:()=>{W.anims.length=0;F.phase=1;heads.forEach(e=>{e.cd=1.5;});HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-1,0);h.face=Math.PI;});W.clampR={x:C.x,z:C.z,r:R-0.7};W.wideShield=true;snapCams();
        banner('Фаза 1 · три запала','#ffe08a',2.8,'первый игрок — у левой головы (сонная, жёлтый кружок медленный), второй — у правой (голодная, красный зубец — кувырок) · средняя плюётся синим · оглушённая голова ждёт шесть секунд');}});}
  function ending(){const m=heads[1];F.phase=5;heads.forEach(e=>{e.harmless=true;e.cd=99;e.state='idle';});
    play({dur:16,fov:46,camK:2.4,shots:[shot(0,[0,4,-2],[0,2,-12]),shot(5.6,[-4,2.6,-6],[0,1.6,-11]),shot(10,[3,2.4,-5],[0,1.8,-11])],
      says:[[0.3,4,null,'<i>Головы спорить перестали. Друг на друга глядят.</i>',true],[4.6,1.4,'gorL','…'],[5.6,1.6,'gorR','…'],[7,3.4,'gorM','<i>(фыркает дымом)</i> Ну, поймали. Так и быть.'],[10.4,3.6,'gorM','Уговор есть уговор — возить буду, не тужить.']],
      events:[{t:0.3,fn:()=>{heads[0].face=0.8;heads[2].face=-0.8;}},{t:7,fn:()=>{for(let i=0;i<5;i++)later(i*0.15,()=>burst(m.pos.clone().add(new V3(rand(-0.3,0.3),2.2,0.6)),0x8a8a90,6,2));}}],
      tick:(t)=>{updNecks();heads[0].g.rotation.y=0.8*Math.min(1,t/2);heads[2].g.rotation.y=-0.8*Math.min(1,t/2);},
      end:()=>{W.anims.length=0;F.out=true;banner('Горыныч в узде!','#ffd76a',2.4,'звенья мира — ваши · на Лукоморье праздник-пир');later(2.2,finishLevel);}});}
  /* ---------- шаг боя ---------- */
  W.updates.push(dt=>{if(heads.length){setBar();updNecks();}bridleTick(dt);if(G.cine||F.phase<1||F.phase>3)return;
    const br=heads.map(e=>e.state==='broken');
    if(F.phase===1&&br[0]&&br[2])nextPhase(2);
    else if(F.phase===2&&br[0]&&br[1]&&br[2])nextPhase(3);
    if(F.phase===3){F.stun-=dt;if(F.stun<=0&&!BR.on){F.phase=2;heads.forEach(e=>{e.state='idle';e.t=0;e.embers=e.maxEmb=2;e._b=false;e.cd=1.5;});banner('Головы очнулись!','#ff9a8a',2,'ещё раз: все три головы оглушите');}}
    // фаза 2: искры с арены; вдох всех трёх; долгий вдох средней с жёлудем
    if(F.phase===2){F.sparkT-=dt;if(F.sparkT<=0){F.sparkT=2.1;const a=rand(0,6.28),r=rand(3,9);spawnSpark(new V3(C.x+Math.cos(a)*r,0.6,C.z+Math.sin(a)*r),[COL.gold,0x6ad0ff,0xff6a8a][Math.floor(rand(0,3))]);}
      F.inhT-=dt;if(F.inhT<=0&&F.inhale<=0){F.inhale=3;F.inhT=11;SFX.whoosh();say('gorM','Вдо-о-ох!',1.6);if(heads[1].state!=='broken'){F.longInh=4.2;}}
      if(F.inhale>0){F.inhale-=dt;for(const s of W.sparks){s.free=Math.max(s.free,4.2);}}
      if(F.longInh>0){F.longInh-=dt;const e=heads[1];const hp=new V3();e.L.head.getWorldPosition(hp);markPos.copy(hp).add(new V3(0,0.2,0.9));mark.position.copy(markPos);mark.visible=true;mark.lookAt(camS.position);mark.scale.setScalar(1.1+0.2*Math.sin(G.time*10));
        if(F.longInh<=0){mark.visible=false;// не прервали — средняя дует огнём по всем
          SFX.whoosh();floatText(e.pos.clone().add(new V3(0,3.4,0)),'ФУ-У-УХ!','#9fd0ff');for(const pi of[0,1]){const h=active(pi);if(!players[pi].downed&&!h.cling)spawnBolt(e,h);}if(!F.shieldTold){F.shieldTold=true;tip(0,'Средняя дует! Потап, щит '+K(0,'guard')+' — всех закроет.',3.4);}}}
      else mark.visible=false;}});
  /* ---------- рисунки кнопок и задачи ---------- */
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'attack',()=>headOf(h()),()=>heads.some(e=>(e.state==='stagger'&&!e.openHit||e.open>0)&&hd(e.pos,h().pos)<3.5),'');
    prompt(pi,'item',()=>headOf(h()),()=>F.phase===3&&!BR.holders[pi]&&hd(BR.pos,h().pos)<2.2,'узда');
    prompt(pi,'skill',()=>headOf(h()),()=>F.phase===3&&BR.holders[pi]===h()&&!!BR.holders[1-pi]&&hd(BR.pos,neckSpot)<3,'раз-два-три!');}
  prompt(0,'skill',()=>headOf(T.proshka),()=>F.phase===2&&F.longInh>0&&T.proshka.active,'в жёлудь!');
  prompt(0,'guard',()=>headOf(T.potap),()=>T.potap.active&&W.bolts.some(b=>!b.refl&&b.from===heads[1]),'широкий щит');
  prompt(1,'skill',()=>headOf(T.yosha),()=>T.yosha.active&&heads.some(e=>e.sat>0&&hd(e.pos,T.yosha.pos)<3.2),'потуши сытую');
  prompt(1,'skill',()=>headOf(T.pelageya),()=>T.pelageya.active&&heads.some(e=>e.sat>0),'слабое место');
  const OR=(text,done,targets,ghost,read)=>{const o=O(text,done,targets,ghost);o.read=read;return o;};
  const ph1=pi=>OR(()=>pi?'Правая голова — твоя: голодная, хватает <i class="sg r"></i> красным — кувырок '+K(1,'roll')+', потом в бок бей.<br>Пробой шесть секунд держится — гасите левую с правой вместе, дружней.':'Левая голова — твоя: сонная, бьёт медленно <i class="sg y"></i> жёлтым — отбей '+K(0,'guard')+' и бей.<br>Пробой шесть секунд держится — гасите левую с правой вместе, дружней.',
    ()=>F.phase>1,()=>heads.length?[heads[pi?2:0].g]:[],null,'…соседнюю не погасили — первая проснётся опять.');
  const ph2=pi=>OR(()=>pi?'Вдох! Сытую голову Йоша гасит '+K(1,'skill')+'; Пелагея — Совиный взор '+K(1,'skill')+': слабое место видать.<br>Все три — в Пробой разом, так и знать.':'Вдох! На долгом вдохе средней — жёлудь: Прошка, рогатка '+K(0,'skill')+'. Средняя дует — Потап, щит '+K(0,'guard')+'.<br>Все три — в Пробой разом, и Змей не устоит.',
    ()=>F.phase>2,()=>heads.filter(e=>e.state!=='broken').map(e=>e.g),null,'…средняя подглядывает — защиту меняйте.');
  const ph3=pi=>OR(()=>'Узда! Горяча — двумя клещами '+K(pi,'item')+' с двух сторон.<br>К светящемуся месту на шее — и «раз-два-три» '+K(pi,'skill')+' вместе, в унисон!',()=>!!F.won,()=>BR.holders[0]&&BR.holders[1]?[spotM]:[BR.g],null,'…клещами возьмёте — не рукой.');
  for(const pi of[0,1])W.objectives[pi]=[O('Скала за Калиновым мостом стоит…',()=>F.phase>=1,()=>[]),ph1(pi),ph2(pi),ph3(pi),O('Горыныч…',()=>false,()=>heads.length?[heads[1].g]:[])];
  W.tipZones.push({cond:(pi,h)=>F.phase===3&&!!BR.holders[pi]&&!BR.holders[1-pi],text:pi=>'Узда тяжела. Вторые клещи — у друга: несите к шее вдвоём.'});
  W.spawns=[[new V3(-3,0,6),new V3(-5,0,7)],[new V3(3,0,6),new V3(5,0,7)]];W.startAct=[0,0];
  W.pauseLine='Змей Горыныч: у каждой головы — свой запал. Пробой шесть секунд держится — гасите соседние вместе.<br>Вдох: жёлудь на средней, сытую — живой водой, слабое место — Совиный взор.<br>Узда — двумя клещами, и «раз-два-три» — вместе, дружный хор.';
  W.onStart=()=>{later(0.4,intro);};
  flushDecor();}

