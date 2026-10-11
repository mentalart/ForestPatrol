/* ============================== РЕЛИЗ final06 · 3-4 «ЛЕТУЧИЙ КОРАБЛЬ»: ЭКИПАЖ, СКАЛЫ, ПРОРЕХИ, ВЕТРИЛО, ВОРОНА-КЛЮЧНИЦА (docs/38) ============================== */
// Заменяет build34 прототипа (proto/levels/3-4.js — прежний уровень; путь корабля, участки и позиции те же, напарник-бот late_73s держит фонарь).
// Посты экипажа: фонарь (свет — ход), руль на корме (кто у руля — ведёт корабль вбок мимо скал в ущелье), балласт — Потап (крен у уступов),
// заплатки — Йоша (в тёмных тучах парус рвётся, свет утекает; живая вода затягивает прореху). Каждый участок спрашивает два поста сразу.
// Крыло ломается — уже не ролик: Прошка прибивает вёдра в такт (кольцо сжалось — удар), Потап держит мачту; вёдра всё равно улетают.
// В тучах прилетает Ветер-Ветрило из 3-2: кто со светом на корме — тому он дует в паруса. Вторая волна ворон — мини-босс Ворона-Ключница:
// цепляет корабль цепью за борт и кренит (Потап — противовесом к другому борту, звенья цепи — бить), потом сама рвётся к фонарю (щит — отбить, бей),
// роняет чёрный ключ в пропасть. Указатель высоты, метки уступов «пройдёт / заденет», камера с креном и взглядом к опасному борту. В гнезде — клок шёрстки Тишки.
build34=function(){
  W.zvenAway=true;W.world=3;setTheme('skynight');W.name='3-4 · «Летучий корабль»';W.sub='Небесное царство · перо в фонаре, крен от веса';W.camX=14;const F=W.flags;F.stage='dock';
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.pero=true;W.fallY=-14;const T=HERO;
  heavenDecor(-340,20,{xw:16,stars:1,sunCol:0xfff4d8,sunY:40,sunX:-60});if(W.duskSun)W.duskSun.scale.setScalar(0.5);   // луна
  /* ---------- корабль ---------- */
  const ship=makeShip();const S={x:0,y:0,z:-8,roll:0,rollT:0,kick:0,speed:0,lit:false,grab:0,deckY:0,lat:0,holeK:1,windB:0,pull:0,chained:false};W.shipS=S;
  const DECK={deck:true};const DX=2.22,DZ=5.85;
  const deckY=(x)=>S.y-Math.tan(S.roll)*(x-S.x);
  const onDeck=(p,m)=>Math.abs(p.x-S.x)<DX+(m||0)&&Math.abs(p.z-S.z)<DZ+(m||0)&&p.y>deckY(p.x)-1.3&&p.y<deckY(p.x)+4.5;
  W.surfs.push((x,z,reach)=>{const lx=x-S.x,lz=z-S.z;if(Math.abs(lx)>DX||Math.abs(lz)>DZ)return null;const y=S.y-Math.tan(S.roll)*lx;return y<=reach+0.001?{y,ref:DECK}:null;});
  const rails=[];for(const s of[-1,1])for(const[z0,z1]of[[-5.7,-1.6],[1.6,5.7]])rails.push({s,z0,z1,b:colBox(0,0,0,0,0,0,false)});
  const bowR=colBox(0,0,0,0,0,0,false),sternR=colBox(0,0,0,0,0,0,false);const mastC={x:0,z:0,r:0.26,miny:0,maxy:0,on:true};W.cyls.push(mastC);
  const lanPos=new V3();lightSrc(lanPos,8,()=>S.lit,6);
  function placeShipCols(){const ty=Math.tan(S.roll);
    for(const r of rails){const ex=S.x+r.s*2.24,ey=S.y-ty*r.s*2.24;Object.assign(r.b,{minx:ex-0.08,maxx:ex+0.08,miny:ey-0.4,maxy:ey+0.6,minz:S.z+r.z0,maxz:S.z+r.z1});}
    Object.assign(bowR,{minx:S.x-2.3,maxx:S.x+2.3,miny:S.y-1.5,maxy:S.y+0.6,minz:S.z-6.05,maxz:S.z-5.85,on:!F.landed});Object.assign(sternR,{minx:S.x-2.3,maxx:S.x+2.3,miny:S.y-1.5,maxy:S.y+0.6,minz:S.z+5.85,maxz:S.z+6.05,on:F.stage!=='dock'});
    mastC.x=S.x-Math.sin(S.roll)*0;mastC.z=S.z-0.5;mastC.miny=S.y;mastC.maxy=S.y+7;lanPos.set(S.x,S.y+1.6,S.z+0.05);}
  placeShipCols();
  /* ---------- пристань и мир вокруг ---------- */
  cloudIsle(-6,6,-2,14,0);bell(-3.5,10);
  const Z=makeZven();W.zven=Z;Z.pos.set(0,3,6);
  // висящие в воздухе звенья и орешки — у борта, их берут на лету
  const L1=linkItem(3.1,4.3,-32),n1=nutItem(-3.1,4.3,-46);
  // ущелье: скалы по бортам, уступы на высоте крыла
  const rock=M(0x4a4868),rock2=M(0x3a3858);
  for(const s of[-1,1]){box(s*10.5-2,s*10.5+2,-20,14,-150,-58,rock,{solid:false});for(let z=-60;z>-150;z-=rand(5,8))addMesh(new THREE.DodecahedronGeometry(rand(1.6,2.8)),rock2,s*rand(8.2,9.2),rand(-6,10),z);}
  const LEDGES=[{z:-76,s:1},{z:-93,s:-1},{z:-109,s:1},{z:-125,s:-1}];
  for(const L of LEDGES){L.g=new THREE.Group();L.g.position.set(L.s*6.6,1.8,L.z);W.group.add(L.g);addMesh(new THREE.BoxGeometry(6.4,1.1,3),rock,0,0,0,L.g);addMesh(new THREE.DodecahedronGeometry(1.1),rock2,-L.s*2.6,0.3,0,L.g);
    L.mark=addMesh(new THREE.ConeGeometry(0.4,0.9,4),M(COL.red,{emissive:COL.red,emissiveIntensity:0.9}),-L.s*2.8,1.4,0,L.g);L.mark.rotation.z=L.s*Math.PI/2;}
  const n3=nutItem(0,6.2,-100);
  // тёмные тучи: облачка по бортам — фонарь корабля зажигает на них светомостики
  const SIDE=[{z:-166,s:1,item:'link'},{z:-190,s:-1,item:'nut'},{z:-213,s:1,item:'link'}];
  for(const C of SIDE){cloudIsle(C.s*7.2-2,C.s*7.2+2,C.z-2,C.z+2,3,{topMat:M(0x5a5680),sideMat:M(0x3a3860)});mostki('light',[[C.s*2.5,3,C.z],[C.s*5.3,3,C.z]],{w:1.8});
    C.it=C.item==='link'?linkItem(C.s*7.6,4.1,C.z):nutItem(C.s*7.6,3.6,C.z);edgeSign(C.s*8.6,3,C.z+1.4,'light');
    for(let i=0;i<5;i++)W.puffs.push({x:C.s*rand(10,16),y:rand(0,8),z:C.z+rand(-6,6),s:rand(2,3.4),far:true});}
  const n4=nutItem(3.1,4.3,-262);
  // гнездо Гусей-лебедей: здесь корабль садится
  cloudIsle(-10,10,-336,-306,3);nestMesh(0,3,-326,3.4);for(let i=0;i<5;i++){const g=makeGoose(1);g.g.position.set(-5+i*2.5,3.4,-330+Math.sin(i)*1.5);g.g.rotation.y=Math.PI*0.9;}
  const L4=linkItem(0,4.2,-318),n5=nutItem(7.4,3.6,-332);bell(-4,-310,3);
  /* ---------- сюжет ---------- */
  const setCP=()=>{for(const pi of[0,1]){const p=players[pi];p.cp.set(S.x+(pi?0.9:-0.9),deckY(S.x+(pi?0.9:-0.9))+0.02,S.z+3.8);p.cpBell=null;}};
  const aboard=()=>{for(const h of HEROES){if(h.cling)continue;if(Math.abs(h.pos.x-S.x)<DX+0.3&&Math.abs(h.pos.z-S.z)<DZ+0.3){placeOnGround(h,h.pos.x,h.pos.z,S.y+0.4);}}};
  function launchScene(){F.stage='launch';const hold=HEROES.find(h=>heroLight(h)&&hd(h.pos,lanPos)<1.8)||T.pelageya;const spots=[[-1.2,3],[1.2,3.4],[-0.9,1.4],[1.0,2]];let n=0;
    HEROES.forEach((h,i)=>{if(h===hold)return;const sp=spots[n++];placeOnGround(h,S.x+sp[0],S.z+sp[1],S.y+0.3);h.face=Math.PI;});
    play({dur:12.4,fov:48,camK:2.4,shots:[shot(0,[6,3,S.z+8],[0,3.6,S.z]),shot(4.6,[3.6,2.4,S.z+2],[0,4,S.z-0.4]),shot(8.4,[9,6,S.z+10],[0,3,S.z-4])],
      says:[[0.3,3.6,null,'<i>Перо Пелагеи — в фонаре. Паруса светом полны.</i>',true],[4,2.6,null,'<i>Варя: «Она у меня фонарщица!»</i>',true],[7,2.6,'zven','Полетели! Дзинь-дзинь-дзинь!'],[9.8,2.4,'potap','Держитесь. Я… тяжёлый, увы.']],
      events:[{t:0.3,fn:()=>{SFX.grow();for(let i=0;i<10;i++)later(i*0.12,()=>burst(new V3(S.x+rand(-1.8,1.8),S.y+rand(2.5,6),S.z-0.4),0xffe0a0,4,2));}}],
      tick:(t)=>{S.y=smooth(clamp((t-4)/7,0,1))*3;ship.sailMat.emissiveIntensity=Math.min(1,t/3)*0.9;},
      end:()=>{S.y=3;placeShipCols();aboard();F.stage='fly';F.launched=true;S.speed=0;banner('Летучий корабль!','#ffd76a',2.6,'перо в фонаре горит — летим · корабль кренится, где тяжелее');
        tip(0,'Потап тяжёл: где он — туда крен.',4);say('zven','Потап тяжёл, как трое: где он встанет — туда и крен!',2.8,true);tip(1,'Смени на Йошу '+K(1,'swap')+': Пелагея светит.',3.4);}});}
  // крыло ломается: Прошка прибивает вёдра в такт (кольцо у борта сжалось — удар), Потап держит мачту; вёдра всё равно улетают
  const WG={on:false,t:0,n:0,ring:null,buckets:[],idle:0};
  function wingScene(){F.stage='wing';WG.on=true;WG.t=0;WG.n=0;WG.idle=0;SFX.whoosh();shakeAll(0.05,0.8);S.kick=0.55;
    banner('Крыло сломалось!','#ffd76a',2.6,'Прошка — к правому борту, вёдра прибивай '+K(0,'attack')+' в такт · Потап — держи мачту');
    say('potap','Держу мачту. Чини, не медли!',2.4);later(2.6,()=>say('proshka','Запасные крылья! Из вёдер. Я предусмотрел — я не промах!',3.4));
    if(!WG.ring){WG.ring=new THREE.Mesh(new THREE.TorusGeometry(1,0.06,6,32),MB(COL.yellow,{transparent:true,opacity:0.9}));WG.ring.rotation.x=Math.PI/2;W.group.add(WG.ring);
      for(let i=0;i<3;i++){const g=new THREE.Group();g.visible=false;W.group.add(g);addMesh(new THREE.CylinderGeometry(0.28,0.2,0.4,10,1,true),new THREE.MeshLambertMaterial({color:0x8a8a94,side:THREE.DoubleSide}),0,0,0,g);
        addMesh(new THREE.BoxGeometry(0.9,0.03,0.3),M(0xd8d0f0),0.5,0,0,g);WG.buckets.push(g);}}}
  const wingSpot=()=>new V3(S.x+1.9,deckY(S.x+1.9),S.z+2.4);
  function wingTick(dt){if(!WG.on||G.cine)return;WG.t+=dt;WG.idle+=dt;const sp=wingSpot(),u=(WG.t%1.1)/1.1;S.roll=damp(S.roll,0.62,2,dt);
    WG.ring.visible=true;WG.ring.position.set(sp.x,sp.y+0.12,sp.z);WG.ring.scale.setScalar(lerp(1.8,0.45,u));WG.ring.material.color.setHex(u>0.72?0xffffff:COL.yellow);
    for(const pi of[0,1]){const h=active(pi);if(hd(h.pos,sp)<1.6&&h.atkT>0.2&&!h._wgHit){h._wgHit=true;if(u>0.62||u<0.08){const b=WG.buckets[WG.n++];b.visible=true;b.position.set(S.x+2.5,S.y-0.3,S.z-2+WG.n*1.4);b.rotation.z=-0.4;SFX.hammer();WG.idle=0;
          floatText(sp.clone().add(new V3(0,1.6,0)),['Раз!','Два!','Три!'][WG.n-1],'#ffe36b');}else{SFX.miss&&SFX.miss();floatText(sp.clone().add(new V3(0,1.6,0)),'Мимо такта!','#ffd0a0');}}if(h.atkT<0.1)h._wgHit=false;}
    WG.buckets.forEach((b,i)=>{if(b.visible&&!b.falling)b.position.set(S.x+2.5,S.y-0.3,S.z-2+(i+1)*1.4);});
    if(WG.idle>16&&WG.n<3){WG.idle=0;const b=WG.buckets[WG.n++];b.visible=true;SFX.hammer();floatText(sp.clone().add(new V3(0,1.6,0)),'Звенышко помогло!','#ffe36b');}
    if(WG.n>=3)wingEnd();}
  function wingEnd(){WG.on=false;WG.ring.visible=false;const pr=T.proshka,po=T.potap;
    play({dur:8.6,fov:48,camK:2.6,shots:[shot(0,[6,3.4,S.z+2],[S.x+2.4,3,S.z+2.4]),shot(4.4,[2.4,4.6,S.z+4.6],[S.x+0.5,4.2,S.z-0.2])],
      says:[[0.3,3.6,null,'<i>…и вёдра вниз летят одно за другим: дзынь, дзынь, дзынь.</i>',true],[4.4,3.6,null,'<i>Потап мачту держит и не оборачивается.</i>',true]],
      events:[{t:0.4,fn:()=>{WG.buckets.forEach((b,i)=>later(i*0.9,()=>{b.falling=true;tone(1900-i*200,0.5,'triangle',0.2);const f=b.position.clone();anim(2.4,k=>{b.position.set(f.x+k*2,f.y-k*k*14,f.z+k*1.5);b.rotation.x+=0.2;});}));}},
        {t:4.4,fn:()=>{pr.face=Math.atan2(po.pos.x-pr.pos.x,po.pos.z-pr.pos.z);}}],
      tick:(t)=>{po.guard=true;},
      end:()=>{WG.buckets.forEach(b=>{b.visible=false;});po.guard=false;S.kick=0;S.roll=0.3;placeShipCols();aboard();F.stage='hold';F.gusts=0;F.gustNext=1.2;banner('Держи мачту!','#ffd76a',2.4,'порыв ветра: жёлтый кружок у мачты — Потап, встань туда и щитом '+K(0,'guard')+' закройся');}});}
  function landScene(){F.stage='landing';F.landed=true;
    play({dur:9,fov:48,shots:[shot(0,[10,7,S.z+4],[0,3.5,S.z-8]),shot(4.4,[4,4.4,-306],[0,3.8,-318])],
      says:[[0.3,3.6,null,'<i>Звено за звеном — и корабль у гнезда Гусей-лебедей садится.</i>',true],[4.6,3.4,null,'<i>В гнезде пусто. Гуси улетели — и, видно, не одни.</i>',true]],
      end:()=>{F.stage='landed';banner('Причалили!','#ffd76a',2,'на берег — к гнезду, скорей');}});}
  /* ---------- вороны-мороки ---------- */
  let crows=[];F.wave=0;
  function spawnCrows(n){F.wave++;for(let i=0;i<n;i++){const x=S.x+(i%2?1.2:-1.2),z=S.z-3+i*2.4;const e=voronaFoe(x,z,{y:deckY(x),leash:30,signals:['yellow','blue']});e.flying=true;later(0.9,()=>{e.flying=false;});crows.push(e);}
    banner(F.wave===1?'Вороны-мороки!':'Ещё вороны!','#c8c8d8',2.4,'у каждой на шее — чёрный ключ · хватают фонарь — гоните прочь!');if(F.wave===1)later(1.6,()=>say('zven','Ключи на воронах… Это Кощей их прислал, не иначе!',2.6,true));}
  function crowTick(dt){const lan=lanPos;const holder=HEROES.find(h=>!h.active&&heroLight(h)&&hd(h.pos,lan)<1.8);
    if(!F.grabber&&S.lit&&holder){F.grabCd=(F.grabCd||4)-dt;if(F.grabCd<=0){const c=crows.find(e=>e.alive&&e.state==='idle');if(c){F.grabber=c;c.grabT=0;c.noMove=true;SFX.red();floatText(lan.clone().add(new V3(0,1.2,0)),'Хватает фонарь!','#ff8a7a');}F.grabCd=rand(5,8);}}
    const c=F.grabber;if(c){if(!c.alive||c.state==='stagger'||c.state==='broken'||c.state==='dying'||!S.lit){if(c.alive)c.noMove=false;F.grabber=null;if(c.alive&&(c.state==='stagger'||c.state==='broken'))floatText(lan.clone().add(new V3(0,1.2,0)),'Отогнали!','#ffe36b');return;}
      c.grabT+=dt;c.cd=Math.max(c.cd,1);if(c.state==='ready'||c.state==='wind')c.state='idle';const tx=lan.x+0.9,tz=lan.z+0.4;c.pos.x=damp(c.pos.x,tx,4,dt);c.pos.z=damp(c.pos.z,tz,4,dt);c.pos.y=damp(c.pos.y,S.y+1.2,4,dt);c.flying=true;
      c.S.sig.visible=true;c.S.sr.visible=true;c.S.sy.visible=c.S.sb.visible=false;c.S.tRing.visible=true;c.S.tRing.scale.setScalar(lerp(1.9,0.44,clamp(c.grabT/2.2,0,1)));c.S.halo.material.color.setHex(COL.red);
      if(c.grabT>=2.2){const hp=holder?players[holder.player]:null;F.grabber=null;c.noMove=false;c.flying=false;c.pos.y=deckY(c.pos.x);
        if(holder&&hp.spirit>0.45){hp.spirit-=0.45;SFX.shield();burst(holder.pos.clone().add(new V3(0,0.9,0)),0xffffff,10,3);floatText(holder.pos.clone().add(new V3(0,holder.d.height+0.6,0)),'Щит — у фонаря!','#cfe8ff');
          if(hp.spirit<0.5)tip(holder.player,'Гоните ворон от фонаря!',3);}
        else{S.grab=5;if(holder)holder.lit=false;SFX.crash();floatText(lan.clone().add(new V3(0,1.2,0)),'Фонарь погас!','#ff8a7a');banner('Ворона перо выбила!','#ff8a7a',2.2,'фонарь погас — корабль падает · встань у фонаря да перо зажги опять');}}}}
  W.onFirstUnravel=()=>{later(0.5,()=>bark(T.potap,'potap','Кыш! С палубы, прочь!',1.8));};
  /* ---------- шаг корабля ---------- */
  W.updates.push(dt=>{
    const prev={x:S.x,y:S.y,z:S.z};
    const holderLit=HEROES.some(h=>heroLight(h)&&hd(h.pos,lanPos)<1.8&&Math.abs(h.pos.y-deckY(h.pos.x))<1.6);S.grab=Math.max(0,S.grab-dt);S.lit=holderLit&&S.grab<=0;
    if(F.stage==='dock'&&S.lit&&!G.cine)launchScene();
    const flying=F.stage==='fly'||F.stage==='hold';
    // скорость по участкам; без фонаря паруса висят — корабль встаёт и проседает
    let want=0;if(flying){want=S.z>-60?3:S.z>-142?3.2:S.z>-230?2:1.6;if(F.stage==='hold')want=0;if(S.z<-228&&S.z>-300&&crows.some(e=>e.alive))want=Math.min(want,S.z<-290?0:1.2);if(S.z<=-300)want=0;if(!S.lit)want=0;want=want*S.holeK+(want>0?S.windB:0);if(F.boss&&!F.kDone)want=0;}
    S.speed=damp(S.speed,want,1.5,dt);S.z-=S.speed*dt;if(F.launched&&F.stage!=='launch'&&F.stage!=='wing')S.y=damp(S.y,(S.lit&&!S.chained)||F.landed?3:1.8,S.lit&&!S.chained?1.2:0.4,dt);
    // крен от веса: Потап весит 3, остальные по 1; разница от 2 — 15°, от 4 — 30°
    if(F.stage!=='wing'&&F.stage!=='dock'&&F.stage!=='launch'&&!F.landed){let d=S.pullW||0;   /* цепь Ключницы тянет, как ещё один Потап */for(const h of HEROES){if(h.cling||!onDeck(h.pos))continue;const lx=h.pos.x-S.x;if(Math.abs(lx)<0.5)continue;d+=(h.kind==='potap'?3:1)*Math.sign(lx);}
      S.rollT=Math.abs(d)>=4?Math.sign(d)*0.52:Math.abs(d)>=2?Math.sign(d)*0.26:0;S.kick=damp(S.kick,0,1.4,dt);S.roll=damp(S.roll,S.rollT+S.kick+S.pull,1.6,dt);}
    else if(F.landed)S.roll=damp(S.roll,0,3,dt);
    S.x=S.lat+Math.sin(G.time*0.3)*0.3*(flying?1:0);
    const dx=S.x-prev.x,dy=S.y-prev.y,dz=S.z-prev.z;
    for(const h of HEROES){if(h.cling)continue;if(h.groundRef===DECK||(!h.grounded&&Math.abs(h.pos.x-prev.x)<DX+0.2&&Math.abs(h.pos.z-prev.z)<DZ+0.2&&h.pos.y>prev.y-1.3&&h.pos.y<prev.y+4.5)){h.pos.x+=dx;h.pos.z+=dz;if(h.groundRef===DECK)h.pos.y+=dy;}}
    for(const e of W.enemies){if(!e.alive)continue;if(Math.abs(e.pos.x-S.x)<DX+0.6&&Math.abs(e.pos.z-S.z)<DZ+0.6){e.pos.x+=dx;e.pos.z+=dz;e.home.x+=dx;e.home.z+=dz;if(!e.flying&&e.state!=='spawn')e.pos.y=deckY(e.pos.x);}}
    // по крену съезжают: кувырок уносит далеко; держится только Потап у мачты
    if(Math.abs(S.roll)>0.05)for(const pi of[0,1]){const h=active(pi);if(!h.grounded||h.groundRef!==DECK)continue;if(h.kind==='potap'&&h.guard&&hd(h.pos,{x:S.x,z:S.z-0.5})<1.9)continue;h.pos.x+=Math.sin(S.roll)*(h.rollT>0?7:2.2)*dt;}
    // борта держат: на палубе у фальшборта не выпасть (кроме прохода посередине)
    for(const h of HEROES){if(h.cling)continue;const air=h.groundRef!==DECK;if(air&&!(Math.abs(h.pos.x-S.x)<DX+0.5&&Math.abs(h.pos.z-S.z)<DZ&&h.pos.y>deckY(h.pos.x)-0.4&&h.pos.y<deckY(h.pos.x)+1.2))continue;const lz=h.pos.z-S.z,r=h.d.radius;if(Math.abs(lz)>1.6)h.pos.x=clamp(h.pos.x,S.x-DX+r*0.8,S.x+DX-r*0.8);
      if(!(F.landed&&lz<0)&&!(F.stage==='dock'&&lz>0))h.pos.z=clamp(h.pos.z,S.z-DZ+r*0.8,S.z+DZ-r*0.8);}
    placeShipCols();ship.g.position.set(S.x,S.y,S.z);ship.g.rotation.z=-S.roll;ship.hull.position.y=Math.sin(G.time*1.2)*0.03;
    ship.sailMat.emissiveIntensity=damp(ship.sailMat.emissiveIntensity,S.lit?0.9:0,3,dt);ship.sail.scale.y=damp(ship.sail.scale.y,S.lit?1:0.55,3,dt);ship.sail.position.y=4.0+(1-ship.sail.scale.y)*1.6;
    ship.lanM.emissiveIntensity=S.lit?1.6+0.3*Math.sin(G.time*8):0.08;ship.wings.forEach(w=>{w.wp.rotation.z=w.s*Math.sin(G.time*(S.speed>0.3?4:1)+w.k)*0.35;});
    if(F.launched)setCP();
    // оставшийся далеко позади (на облаке, в пропасти) — назад на корабль
    if(F.launched&&!F.landed)for(const h of HEROES){if(h.cling||G.cine)continue;if(hd(h.pos,S)>17&&h.pos.z>S.z){const p=players[h.player],k=p.heroes.indexOf(h);placeOnGround(h,p.cp.x+(k?1.2:-0.4),p.cp.z,p.cp.y);h.iT=1;
      floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Звенышко на корабль вернуло','#ffd76a');}}
    // участки
    if(F.stage==='fly'&&S.z<-35&&!F.gust1){F.gust1=true;F.gustA={t:0,dur:1.8};banner('Порыв ветра!','#ffd76a',2,'жёлтый кружок у мачты: Потап, встань туда и щитом '+K(0,'guard')+' закройся');}
    for(const L of LEDGES){if(L.done)continue;const dd=S.z-L.z;L.mark.material.emissiveIntensity=dd<16?0.6+0.6*Math.sin(G.time*10):0.3;
      if(dd<16&&!L.warn){L.warn=true;SFX.red();banner('Уступ '+(L.s>0?'справа':'слева')+'!','#ff8a7a',1.8,'Потапа — к '+(L.s>0?'левому':'правому')+' борту: корабль наклонится, крыло над камнем пролетит');}
      if(dd<0.3){L.done=true;const ok=-L.s*S.roll>0.18;if(ok){SFX.ok();floatText(new V3(S.x+L.s*3,S.y+2,S.z),'Прошли!','#ffe36b');}
        else{SFX.crash();shakeAll(0.06,0.5);S.kick=L.s*0.35;S.speed*=0.4;burst(new V3(S.x+L.s*3.4,S.y,S.z),0x8a88a8,20,5);floatText(new V3(S.x+L.s*3,S.y+2,S.z),'Крыло задело!','#ff8a7a');
          for(const pi of[0,1]){const h=active(pi);if(onDeck(h.pos)){h.vel.y=2.6;h.vel.x=-L.s*1.6;h.grounded=false;h.knockT=0.3;}}F.bumps=(F.bumps||0)+1;}}}
    if(F.stage==='fly'&&S.z<-142&&!F.wingDone){F.wingDone=true;wingScene();}
    if(F.stage==='hold'&&!G.cine){F.gustNext-=dt;if(F.gustNext<=0&&!F.gustA){F.gustA={t:0,dur:1.6};F.gustNext=2.2;}if(F.gusts>=3&&!F.gustA){F.stage='fly';F.holdDone=true;S.kick=0;banner('Выровнялись!','#ffd76a',2,'Потап удержал мачту · дальше — тёмные тучи');later(1,()=>say('zven','В тучах мостков нет. Но фонарь — это свет!',2.8,true));}}
    // порыв: жёлтый кружок сжимается у мачты — Потап у мачты держит защиту
    if(F.gustA&&!G.cine){const g=F.gustA;g.t+=dt;gRing.visible=true;gRing.position.set(S.x,deckY(S.x)+0.15,S.z-0.5);gRing.scale.setScalar(lerp(3.2,0.6,clamp(g.t/g.dur,0,1)));gRing.material.color.setHex(g.t/g.dur>0.85?0xffffff:COL.yellow);
      if(g.t>=g.dur){F.gustA=null;gRing.visible=false;const P=T.potap,ok=P.active&&P.guard&&hd(P.pos,{x:S.x,z:S.z-0.5})<1.9;
        if(ok){SFX.shield();SFX.ok();floatText(P.pos.clone().add(new V3(0,2.4,0)),'Удержал мачту!','#ffe36b');burst(P.pos.clone().add(new V3(0,1.2,0)),0xffffff,12,3);if(F.stage==='hold')F.gusts++;}
        else{SFX.whoosh();shakeAll(0.05,0.4);const sd=Math.random()<0.5?-1:1;S.kick=sd*0.45;for(const pi of[0,1]){const h=active(pi);if(onDeck(h.pos)&&!(h.kind==='potap'&&h.guard)){h.vel.x=sd*2.6;h.vel.y=2.8;h.grounded=false;h.knockT=0.35;}}
          floatText(new V3(S.x,S.y+3,S.z),'Порыв!','#ffd76a');tip(0,'Потап — в кружок, щит '+K(0,'guard')+'!',2.6);if(F.stage==='hold')F.gusts+=0.5;}}}
    else gRing.visible=false;
    if(F.stage==='fly'&&S.z<-232&&F.wave===0)spawnCrows(3);
    if(F.wave===1&&crows.every(e=>!e.alive)&&!F.w2){F.w2=true;later(1.4,()=>K34.start());}
    if(F.kDone&&crows.every(e=>!e.alive)&&!F.crowsDone){F.crowsDone=true;SFX.ok();banner('Вороны прогнаны!','#ffd76a',2,'ключи в пропасть упали. Корабль к гнезду летит');}
    if(F.wave>0)crowTick(dt);
    if(F.crowsDone&&S.z<=-299.5&&!F.landed&&F.stage==='fly')landScene();
    if(F.landed&&!F.out&&[0,1].every(pi=>active(pi).pos.z<-307.5)){F.out=true;banner('Летучий корабль','#ffd76a',2.4,'в лавке у Векши — треуголка из бересты, загляни!');later(1.8,finishLevel);}});
  const gRing=new THREE.Mesh(new THREE.TorusGeometry(1,0.07,6,40),MB(COL.yellow,{transparent:true,opacity:0.9}));gRing.rotation.x=Math.PI/2;gRing.visible=false;W.group.add(gRing);
  /* ---------- рисунки кнопок ---------- */
  const P=T.potap,atMast=()=>hd(P.pos,{x:S.x,z:S.z-0.5})<1.9;
  prompt(1,'item',()=>headOf(T.pelageya),()=>F.stage==='dock'&&T.pelageya.active&&!T.pelageya.lit&&hd(T.pelageya.pos,lanPos)<3,'зажги перо в фонаре');
  prompt(1,'label',()=>lanPos.clone().add(new V3(0,1,0)),()=>F.stage==='dock'&&!(T.pelageya.active&&hd(T.pelageya.pos,lanPos)<3),'фонарь');
  prompt(0,'guard',()=>headOf(P),()=>!!F.gustA&&P.active&&atMast(),'держи мачту');
  prompt(0,'label',()=>new V3(S.x,S.y+2.4,S.z-0.5),()=>!!F.gustA&&!(P.active&&atMast()),'Потапа — к мачте!');
  prompt(0,'swap',()=>headOf(T.proshka),()=>!!F.gustA&&T.proshka.active,'Потап');
  prompt(0,'label',()=>headOf(P),()=>LEDGES.some(L=>!L.done&&S.z-L.z<16)&&P.active,(()=>{const L=LEDGES.find(L=>!L.done);return L?(L.s>0?'← к левому борту':'к правому борту →'):'';}));
  prompt(1,'item',()=>headOf(active(1)),()=>F.launched&&!S.lit&&!F.landed&&hd(active(1).pos,lanPos)<3&&!active(1).lit,'зажги перо в фонаре');
  for(const pi of[0,1]){const h=()=>active(pi);prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig!=='red'&&e.help));
    prompt(pi,'roll',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig==='red'&&e.help));
    prompt(pi,'attack',()=>headOf(h()),()=>!!F.grabber&&hd(F.grabber.pos,h().pos)<3.5,'прогони ворону!');}
  /* ---------- задачи ---------- */
  const mk=pi=>[
    O(pi?()=>'Летучий корабль. Ночью паруса его — как тряпки висят.<br>Пелагеей к фонарю у мачты иди, зажги перо '+K(1,'item')+' — фонарщицей быть, говорят.':()=>'Летучий корабль. Ночью паруса его — как тряпки висят.<br>Звенышко: «Зажгите перо в фонаре у мачты!» Все на борт — и в полёт, в закат!',()=>!!F.launched,()=>[ship.lantern]),
    O(pi?()=>'Пелагея держит фонарь, а ты за Йошу '+K(1,'swap')+' играй.<br>Корабль кренится туда, где тяжелее, — так и знай.':()=>'Корабль кренится туда, где тяжелее. Потап тяжёл, как трое, — от борта к борту веди.<br>Звено у правого борта — на лету хватай, не упусти!',()=>S.z<-60,()=>[L1.g]),
    O(pi?()=>'Ущелье! Кто у руля на корме — веди корабль мимо скал.':()=>'Ущелье! Потапа '+K(0,'swap')+' — к борту против уступа: крыло пролетит.<br>А у руля на корме — мимо скал веди!',()=>S.z<-140,()=>LEDGES.filter(L=>!L.done).map(L=>L.g)),
    O(()=>'Корабль боком встаёт! Потап мачту держит: в жёлтый кружок встань, щитом '+K(0,'guard')+' закройся.',()=>!!F.holdDone,()=>[ship.mast]),
    O(()=>'Тёмные тучи: звенья — по золотым мосткам и назад.<br>Прореха в парусе — Йоша, полей; со светом на корме — Ветрило подует!',()=>S.z<-230,()=>SIDE.filter(C=>!C.it.taken).map(C=>C.it.g)),
    O(()=>F.boss?'Ворона-Ключница! Бейте золотые звенья цепи '+K(pi,'attack')+', Потап — к другому борту.':'Вороны хватают фонарь! Гоните их '+K(pi,'attack')+': жёлтый — щит, красный — кувырок.',
      ()=>!!F.crowsDone,()=>crows.filter(e=>e.alive).map(e=>e.g)),
    O('Гнездо Гусей-лебедей — выходи на берег, к звену!',()=>false,()=>[L4.g])];
  for(const pi of[0,1])W.objectives[pi]=mk(pi);
  W.tipZones.push({cond:(pi,h)=>F.launched&&!S.lit&&!F.landed,text:pi=>'Фонарь погас — корабль падает! Встань героем с пером у мачты и зажги '+K(pi,'item')+' — скорей!'},
    {cond:(pi,h)=>h.groundRef&&h.groundRef.tile,text:pi=>'Золотой мосток горит, пока фонарь корабля рядом. Хватай звено — и назад, скорей!'});
  W.spawns=[[new V3(-2,0,6),new V3(-3.8,0,7.4)],[new V3(2,0,6),new V3(3.8,0,7.4)]];W.startAct=[0,0];
  W.pauseLine=K(1,'item')+' перо в фонаре — летим · у руля — мимо скал.<br>'+K(0,'swap')+' Потап к борту — крен у уступов · '+K(0,'guard')+' порыв — щит у мачты.<br>'+K(1,'skill')+' прореха — Йоша поливает · '+K(0,'attack')+' цепь — бейте звенья.';
  W.onStart=()=>{later(0.8,()=>say('zven','Дайте ему перо. У мачты фонарь!',2.6,true));};

  /* ==================== РЕЛИЗ: посты экипажа, скалы, прорехи, Ветрило, Ключница, высота, камера ==================== */
  // тёплое пятно фонаря на палубе (цветовой ключ 3-4 — лунная ночь и тёплый свет), скрип досок по крену, гул ветра по скорости
  const lanDisc=lightDisc(new V3(),3.4,()=>S.lit&&!F.landed);lanDisc.material.opacity=0.16;let creakT=0,windT=0,rollPrev=0;
  // руль на корме: кто у руля — ведёт корабль вбок (влево-вправо); без рулевого корабль медленно идёт посередине
  const HELM={lx:0,lz:3.3};{const g=new THREE.Group();g.position.set(HELM.lx,0,HELM.lz);ship.g.add(g);addMesh(new THREE.CylinderGeometry(0.1,0.12,1.1,8),M(0x5a3a1a),0,0.55,0,g);
    const wh=new THREE.Group();wh.position.set(0,1.15,0);g.add(wh);addMesh(new THREE.TorusGeometry(0.42,0.05,6,20),M(0x8a5a2a),0,0,0,wh);for(let i=0;i<4;i++){const sp=addMesh(new THREE.BoxGeometry(0.06,0.95,0.06),M(0x6a4a2a),0,0,0,wh);sp.rotation.z=i*Math.PI/4;}HELM.wh=wh;}
  const helmPos=()=>({x:S.x+HELM.lx,z:S.z+HELM.lz});
  const helmsman=()=>{for(const h of HEROES){if(!h.active||h.cling||!onDeck(h.pos))continue;if(hd(h.pos,helmPos())<1.1)return h;}return null;};
  // скалы-зубья в ущелье — между уступами: рулём уйти в другую сторону
  const PIL=[{z:-84,x:-1.9},{z:-101,x:1.9},{z:-117,x:-1.9},{z:-133,x:1.9}];
  for(const P of PIL){P.g=new THREE.Group();P.g.position.set(P.x,0,P.z);W.group.add(P.g);addMesh(new THREE.CylinderGeometry(0.9,1.3,30,8),rock,0,-12,0,P.g);addMesh(new THREE.ConeGeometry(1.0,2.4,7),rock2,0,4,0,P.g);
    P.glow=addMesh(new THREE.SphereGeometry(0.35,8,6),M(COL.red,{emissive:COL.red,emissiveIntensity:0.9}),0,5.4,0,P.g);}
  // прорехи в парусе (тёмные тучи): свет утекает — корабль медленнее; Йоша — живой водой у мачты; сами затягиваются за 18 с
  const HOLES=[];const holeM=MB(0x2a2440,{transparent:true,opacity:0.85,side:THREE.DoubleSide});
  function tearSail(){if(HOLES.length>=2)return;const k=HOLES.length,lx=k?-0.8:0.9,m=new THREE.Mesh(new THREE.CircleGeometry(0.42,10),holeM);m.position.set(lx,3.2-k*0.5,-0.33);ship.hull.add(m);
    const H={m,lx,t:18,done:false};HOLES.push(H);SFX.crash();shakeAll(0.03,0.4);floatText(new V3(S.x+lx,S.y+3.6,S.z-0.3),'Парус порвался!','#ffd0a0');
    if(!F.holeTold){F.holeTold=true;banner('Прореха в парусе!','#ffd76a',2.4,'свет утекает — корабль медленнее · Йоша, полей у мачты '+K(1,'skill'));}
    W.waterTargets.push({pos:new V3(),pri:1.2,active:()=>!H.done&&T.yosha.active,onWater:()=>{closeHole(H,'Живая вода — как новый!');}});H.wt=W.waterTargets[W.waterTargets.length-1];}
  function closeHole(H,txt){if(H.done)return;H.done=true;ship.hull.remove(H.m);SFX.grow();burst(new V3(S.x+H.lx,S.y+3,S.z-0.3),0x7ad8ff,12,3);floatText(new V3(S.x+H.lx,S.y+3.6,S.z-0.3),txt,'#9fe6ff');}
  // Ветер-Ветрило из 3-2: за кормой; кто со светом на корме — тому он дует в паруса
  let VET=null;const sternPos=()=>({x:S.x,z:S.z+5.2});
  // Ворона-Ключница: цепь за борт (крен и просадка), звенья бить; потом сама к фонарю — щитом отбить, бить
  const K34={st:'off',s:1,t:0,links:[],e:null,chain:[]};W.k34=K34;
  const linkM=M(0x3a3448,{emissive:0x000000}),weakM=M(0xffc93c,{emissive:0xb07a10,emissiveIntensity:0.6});
  K34.start=()=>{F.wave=2;F.boss=true;K34.st='chain';K34.t=0;K34.s=Math.random()<0.5?-1:1;const s0=K34.s;
    const e=voronaFoe(S.x+s0*7,S.z-1.5,{y:S.y+3.6,leash:40,scale:2.1,signals:['yellow','red']});e.embers=e.maxEmb=6;e.flying=true;e.noMove=true;e.cd=99;K34.e=e;crows.push(e);
    for(let i=0;i<9;i++){const m=addMesh(new THREE.TorusGeometry(0.16,0.05,5,10),linkM,0,0,0);m.rotation.y=i%2?Math.PI/2:0;K34.chain.push(m);}
    K34.links=[0,1,2].map(i=>{const m=addMesh(new THREE.TorusGeometry(0.3,0.09,6,14),weakM,0,0,0);m.rotation.x=Math.PI/2;const L={m,i,alive:true,lx:s0*(1.95-i*0.45),lz:-1.5};
      L.mk={pos:new V3(),active:()=>L.alive&&K34.st==='chain',onHit:()=>breakLink(L)};W.marks.push(L.mk);return L;});
    SFX.red();shakeAll(0.06,0.6);banner('Ворона-Ключница!','#c8c8d8',2.8,'цепью тянет корабль вниз · бейте золотые звенья '+K(0,'attack')+' · Потап — к другому борту');
    later(1.2,()=>say('zven','Ключница! Связка чёрных ключей — Кощеева!',2.6,true));};
  function breakLink(L){if(!L.alive)return;L.alive=false;L.m.visible=false;SFX.brk();burst(L.m.position.clone(),0xffc93c,14,3);floatText(L.m.position.clone().add(new V3(0,0.8,0)),'Дзынь!','#ffe36b');
    if(K34.links.every(q=>!q.alive))chainOff('Цепь лопнула!');}
  function chainOff(txt){K34.st='fight';S.pullW=0;S.chained=false;K34.chain.forEach(m=>{const f=m.position.clone();anim(1.6,k=>{m.position.set(f.x,f.y-k*k*20,f.z);});});
    const e=K34.e;e.noMove=false;e.cd=1.6;const to=new V3(S.x-K34.s*0.9,deckY(S.x-K34.s*0.9),S.z-2.6);const from=e.pos.clone();anim(0.9,k=>{e.pos.lerpVectors(from,to,smooth(k));e.pos.y+=Math.sin(k*Math.PI)*1.5;},()=>{e.flying=false;});
    SFX.ok();banner(txt,'#ffd76a',2.2,'Ключница на палубе! Жёлтый — щит, красный — кувырок, бей');later(1,()=>say('potap','Кыш с моего корабля!',1.8,true));}
  // высота корабля
  let ALT=document.getElementById('k34alt');if(!ALT){ALT=document.createElement('div');ALT.id='k34alt';ALT.style.cssText='position:fixed;right:14px;top:34%;width:18px;height:150px;border-radius:9px;background:rgba(20,18,40,.55);border:2px solid rgba(255,230,160,.6);z-index:30;pointer-events:none;display:none';
    ALT.innerHTML='<div style="position:absolute;left:-2px;right:-2px;height:14px;border-radius:7px;background:#ffd76a"></div><div style="position:absolute;top:100%;left:50%;transform:translateX(-50%);font:600 12px system-ui;color:#ffe9a0;margin-top:4px">высота</div>';document.body.appendChild(ALT);}
  W.onLeave=(()=>{const o=W.onLeave;return()=>{ALT.style.display='none';if(o)o();};})();
  // камера полёта: сзади-сверху, взгляд чуть к борту, где опасность; лёгкий крен вместе с кораблём
  const CAM34={pos:new V3(),look:new V3(),k:3,roll:0};let bias=0;
  function cam34(){return CAM34;}
  // клок шёрстки Тишки в гнезде
  {const g=new THREE.Group();g.position.set(1.1,3.45,-325.6);W.group.add(g);for(let i=0;i<5;i++)addMesh(new THREE.SphereGeometry(0.12,6,5),M(0xd8783a),Math.sin(i*1.7)*0.18,i*0.03,Math.cos(i*1.3)*0.18,g);}
  W.updates.push(dt=>{
    const flyingNow=F.launched&&!F.landed;
    // руль
    {const h=flyingNow&&(F.stage==='fly'||F.stage==='hold')?helmsman():null;HELM.h=h;
      if(h){const steer=clamp(h.vel.x/3.2,-1,1);S.lat=clamp(S.lat+steer*2.8*dt,-3,3);h.pos.x=clamp(h.pos.x,helmPos().x-0.45,helmPos().x+0.45);HELM.wh.rotation.z=-S.lat*0.9;
        if(!F.helmTold){F.helmTold=true;tip(h.player,'У руля! Влево-вправо — корабль за тобой.',3);}}
      else if(flyingNow)S.lat=damp(S.lat,0,0.35,dt);}
    // скалы
    for(const P of PIL){if(P.done||!flyingNow)continue;const dd=S.z-P.z;P.glow.material.emissiveIntensity=dd<18?0.6+0.6*Math.sin(G.time*10):0.3;
      if(dd<18&&!P.warn){P.warn=true;SFX.red();const side=P.x<0?'слева':'справа',to=P.x<0?'вправо':'влево';banner('Скала '+side+'!','#ff8a7a',1.8,'у руля — '+to+' · Потап — к борту против уступа');}
      if(dd<0.3){P.done=true;if(Math.abs(S.x-P.x)<3.2){SFX.crash();shakeAll(0.06,0.5);S.speed*=0.4;const sd=Math.sign(S.lat-P.x)||1;const l0=S.lat,l1=clamp(P.x+sd*3.3,-3.3,3.3);anim(0.4,k=>{S.lat=lerp(l0,l1,k);});
          floatText(new V3(S.x,S.y+2.5,S.z-5),'Бортом о скалу!','#ff8a7a');F.pbumps=(F.pbumps||0)+1;for(const pi of[0,1]){const h=active(pi);if(onDeck(h.pos)){h.vel.y=2.4;h.knockT=0.3;}}}
        else{SFX.ok();floatText(new V3(S.x,S.y+2.5,S.z-5),'Мимо скалы!','#ffe36b');}}}
    // прорехи
    if(flyingNow&&F.stage==='fly'){if(S.z<-160&&!F.tear1){F.tear1=true;tearSail();}if(S.z<-195&&!F.tear2){F.tear2=true;tearSail();}}
    let open=0;for(const H of HOLES){if(H.done)continue;open++;H.t-=dt;H.wt.pos.set(S.x+H.lx*0.6,S.y,S.z-0.9);if(Math.random()<dt*6)FX&&FX.sparkle?FX.sparkle(new V3(S.x+H.lx,S.y+3,S.z-0.2),2,0xffc860):burst(new V3(S.x+H.lx,S.y+3,S.z-0.2),0xffc860,2,1);if(H.t<=0)closeHole(H,'Звенышко залатало');}
    S.holeK=Math.pow(0.65,open);
    // Ветер-Ветрило
    if(flyingNow&&S.z<-150&&S.z>-232&&!VET&&typeof makeVeter32==='function'){VET=makeVeter32();VET.g.scale.setScalar(0.8);say('veter','Ветер-Ветрило! Друзьям Пушка — попутный ветер! Посветите на корме!',3.2,true);
      banner('Ветер-Ветрило!','#bfe4ff',2.4,'встань со светом на корме — он дунет в паруса');}
    S.windB=0;if(VET){const vis=flyingNow&&S.z>-236&&!F.boss;VET.g.visible=vis;if(vis){VET.g.position.set(S.x,S.y+2.6,S.z+11);VET.g.rotation.y=Math.PI;
        const blow=HEROES.some(h=>heroLight(h)&&onDeck(h.pos)&&hd(h.pos,sternPos())<1.6);VET.cheeks&&VET.cheeks.forEach(c=>c.scale.setScalar(blow?1.3:1));if(blow){S.windB=1.1;if(Math.random()<dt*8)burst(new V3(S.x+rand(-1.5,1.5),S.y+3,S.z+7),0xeef4ff,2,4);if(!F.windTold){F.windTold=true;floatText(new V3(S.x,S.y+4,S.z+5),'Попутный ветер!','#bfe4ff');}}}}
    // Ворона-Ключница
    if(K34.st==='chain'){const e=K34.e,s0=K34.s;K34.t+=dt;S.chained=true;S.pullW=s0*3;const anchor=new V3(S.x+s0*2.2,deckY(S.x+s0*2.2)+0.4,S.z-1.5);
      e.pos.set(S.x+s0*6.5+Math.sin(G.time*1.4)*0.4,S.y+3.4+Math.sin(G.time*2.1)*0.3,S.z-1.5);e.face=Math.atan2(-s0,0);
      const claw=e.pos.clone().add(new V3(0,-0.8,0));K34.chain.forEach((m,i)=>{const k=i/(K34.chain.length-1);m.position.lerpVectors(claw,anchor,k);m.position.y-=Math.sin(k*Math.PI)*0.6;});
      K34.links.forEach(L=>{const x=S.x+L.lx;L.m.position.set(x,deckY(x)+0.25,S.z+L.lz);L.mk.pos.copy(L.m.position);L.m.material=L.alive?weakM:linkM;
        if(!L.alive)return;for(const h of HEROES){if(!h.active||!onDeck(h.pos))continue;if(hd(h.pos,L.m.position)<1.25&&h.atkT>0.2&&!h['_k34'+L.i]){h['_k34'+L.i]=1;breakLink(L);}if(h.atkT<0.1)h['_k34'+L.i]=0;}});
      if(K34.t>45)chainOff('Цепь соскользнула!');}
    if(K34.st==='fight'&&K34.e&&!K34.e.alive&&!F.kDone){F.kDone=true;K34.st='done';const p=K34.e.pos.clone();const key=blackKey(1.4);W.group.add(key);key.position.copy(p).add(new V3(0,1,0));SFX.keys&&SFX.keys();
      anim(2.6,k=>{key.position.set(p.x+K34.s*k*6,p.y+1+Math.sin(Math.min(1,k*2)*Math.PI)*2-k*k*18,p.z);key.rotation.z+=0.35;},()=>W.group.remove(key));
      banner('Ключница улетела!','#ffd76a',2.4,'чёрный ключ — в пропасть');later(0.8,()=>say('zven','Ключ — в пропасть! Кощею не достанется.',2.4,true));}
    // высота
    if(flyingNow&&!G.cine&&G.state==='play'){ALT.style.display='block';const k=clamp((S.y-1.6)/1.6,0,1);const m=ALT.firstChild;m.style.bottom=(k*136)+'px';m.style.background=k<0.45?'#ff8a7a':'#ffd76a';}else ALT.style.display='none';
    // метки уступов: зелёная — крыло пройдёт, красная — заденет
    for(const L of LEDGES){if(L.done)continue;const ok=-L.s*S.roll>0.18;L.mark.material.color.setHex(ok?0x5ad88a:COL.red);L.mark.material.emissive.setHex(ok?0x2a8a4a:COL.red);}
    // камера полёта
    if(flyingNow){let side=0,best=99;for(const L of LEDGES){const dd=S.z-L.z;if(!L.done&&dd>0&&dd<20&&dd<best){best=dd;side=L.s;}}for(const P of PIL){const dd=S.z-P.z;if(!P.done&&dd>0&&dd<20&&dd<best){best=dd;side=Math.sign(P.x);}}
      bias=damp(bias,side*1.6,1.5,dt);CAM34.pos.set(S.x+bias*0.4,S.y+8.6,S.z+12.6);CAM34.look.set(S.x+bias,S.y+1.2,S.z-2.6);CAM34.roll=-S.roll*0.25;W.camFn=cam34;}
    else if(W.camFn===cam34)W.camFn=null;
    // шёрстка Тишки
    if(F.landed&&!F.furTold&&HEROES.some(h=>h.active&&hd(h.pos,{x:1.1,z:-325.6})<3.2)){F.furTold=true;say('yosha','Это ж Тишкина шёрстка! Гуси его унесли…',2.8,true);}
    lanDisc.position.set(S.x,deckY(S.x)+0.08,S.z+0.05);lanDisc.rotation.z=0;
    if(flyingNow&&!G.cine){const dr=Math.abs(S.roll-rollPrev);rollPrev=S.roll;creakT-=dt;if(dr>0.004&&creakT<=0){creakT=0.35+Math.random()*0.3;tone(90+Math.abs(S.roll)*120,0.18,'sawtooth',0.025+Math.min(0.04,dr*3),70);}
      windT-=dt;if(S.speed>0.4&&windT<=0){windT=1.6;tone(180+S.speed*40,1.4,'sine',0.012+S.speed*0.006,140+S.speed*30);}}
    wingTick(dt);});
  prompt(0,'label',()=>new V3(S.x+HELM.lx,S.y+2.2,S.z+HELM.lz),()=>F.launched&&!F.landed&&PIL.some(P=>!P.done&&S.z-P.z<18)&&!HELM.h,'руль!');
  for(const pi of[0,1]){prompt(pi,'label',()=>headOf(active(pi)),()=>HELM.h===active(pi)&&PIL.some(P=>!P.done&&S.z-P.z<18),(()=>{const P=PIL.find(P=>!P.done);return P?(P.x<0?'руль вправо →':'← руль влево'):'';}));
    prompt(pi,'attack',()=>headOf(active(pi)),()=>K34.st==='chain'&&K34.links.some(L=>L.alive&&hd(L.m.position,active(pi).pos)<1.6),'бей звено!');
    prompt(pi,'attack',()=>headOf(active(pi)),()=>WG.on&&hd(active(pi).pos,wingSpot())<1.8,'в такт!');}
  for(const L of LEDGES)prompt(0,'label',()=>L.g.position.clone().add(new V3(0,2.4,0)),()=>!L.done&&S.z-L.z<16&&S.z-L.z>0,(()=>-L.s*S.roll>0.18?'пройдёт':'заденет'));
  flushDecor();flushPuffs();};
