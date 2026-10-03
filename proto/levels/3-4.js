/* ============================== МИР 3 · 3-4 «ЛЕТУЧИЙ КОРАБЛЬ» ============================== */
// сочетание: перо + вес · перо в фонаре — корабль летит · крен от веса (Потап весит за троих) · порывы ветра — Потап держит мачту
// ущелье: уступ с одного борта — крен на другой · тёмные тучи: фонарь зажигает светомостики на облаках · вороны-мороки хватают фонарь
function build34(){
  W.zvenAway=true;W.world=3;setTheme('skynight');W.name='3-4 · «Летучий корабль»';W.sub='Небесное царство · перо в фонаре, крен от веса';W.camX=14;const F=W.flags;F.stage='dock';
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.pero=true;W.fallY=-14;const T=HERO;
  heavenDecor(-340,20,{xw:16,stars:1,sunCol:0xfff4d8,sunY:40,sunX:-60});if(W.duskSun)W.duskSun.scale.setScalar(0.5);   // луна
  /* ---------- корабль ---------- */
  const ship=makeShip();const S={x:0,y:0,z:-8,roll:0,rollT:0,kick:0,speed:0,lit:false,grab:0,deckY:0};W.shipS=S;
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
        tip(0,'Потап тяжёл, как трое! Встанет у борта — корабль наклонится.<br>Переводи его от борта к борту — пусть корабль ровно помчится.',4);tip(1,'Пелагея держит фонарь. А ты за Йошу играй '+K(1,'swap')+' — так и знай.',3.4);}});}
  function wingScene(){F.stage='wing';const pr=T.proshka,po=T.potap;const ms=new V3(S.x,S.y,S.z-0.5);
    placeOnGround(po,S.x+0.5,S.z-0.2,S.y+0.3);po.face=Math.PI;placeOnGround(pr,S.x+1.7,S.z+2.4,S.y+0.3);pr.face=Math.PI/2;
    const buckets=[];for(let i=0;i<3;i++){const g=new THREE.Group();g.visible=false;W.group.add(g);addMesh(new THREE.CylinderGeometry(0.28,0.2,0.4,10,1,true),new THREE.MeshLambertMaterial({color:0x8a8a94,side:THREE.DoubleSide}),0,0,0,g);
      addMesh(new THREE.BoxGeometry(0.9,0.03,0.3),M(0xd8d0f0),0.5,0,0,g);buckets.push(g);}
    play({dur:21,fov:48,camK:2.6,shots:[shot(0,[7,3.4,S.z+6],[0,3,S.z]),shot(4.2,[2.6,4.4,S.z+3],[S.x+0.5,4,S.z-0.2]),shot(9,[6,3.4,S.z+2],[S.x+2.4,3,S.z+2.4]),shot(15,[2.4,4.6,S.z+4.6],[S.x+0.5,4.2,S.z-0.2])],
      says:[[0.3,3.4,null,'<i>Порыв — и корабль встаёт почти боком. Одно крыло сломано.</i>',true],[3.9,2.6,'potap','Держу мачту. Чини, не медли!'],
        [6.8,3.6,'proshka','Запасные крылья! Из вёдер. Я предусмотрел — я не промах!'],[10.6,2.4,null,'<i>Прошка вёдра к борту прибивает. Корабль кренится сильней…</i>',true],
        [13.2,3.6,null,'<i>…и вёдра вниз летят одно за другим: дзынь, дзынь, дзынь.</i>',true],[17,3.6,null,'<i>Потап мачту держит и не оборачивается.</i>',true]],
      events:[{t:0.2,fn:()=>{SFX.whoosh();shakeAll(0.05,0.8);}},{t:10.6,fn:()=>{buckets.forEach((b,i)=>{b.visible=true;b.position.set(S.x+2.5,S.y-0.3,S.z-2+i*1.4);b.rotation.z=-0.4;});for(let i=0;i<4;i++)later(i*0.4,()=>SFX.hammer());}},
        {t:13.4,fn:()=>{buckets.forEach((b,i)=>later(i*0.9,()=>{tone(1900-i*200,0.5,'triangle',0.2);const f=b.position.clone();anim(2.4,k=>{b.position.set(f.x+k*2,f.y-k*k*14,f.z+k*1.5);b.rotation.x+=0.2;});}));}},
        {t:17,fn:()=>{pr.face=Math.atan2(po.pos.x-pr.pos.x,po.pos.z-pr.pos.z);}}],
      tick:(t)=>{S.roll=damp(S.roll,t<19?0.62:0,2,1/60);po.guard=true;},
      end:()=>{buckets.forEach(b=>W.group.remove(b));W.anims.length=0;po.guard=false;S.roll=0.3;placeShipCols();aboard();F.stage='hold';F.gusts=0;F.gustNext=1.2;banner('Держи мачту!','#ffd76a',2.4,'порыв ветра: жёлтый кружок у мачты — Потап, встань туда и щитом '+K(0,'guard')+' закройся');}});}
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
          if(hp.spirit<0.5)tip(holder.player,'Щит у Пелагеи вот-вот устанет — гоните ворон от фонаря!',3);}
        else{S.grab=5;if(holder)holder.lit=false;SFX.crash();floatText(lan.clone().add(new V3(0,1.2,0)),'Фонарь погас!','#ff8a7a');banner('Ворона перо выбила!','#ff8a7a',2.2,'фонарь погас — корабль падает · встань у фонаря да перо зажги опять');}}}}
  W.onFirstUnravel=()=>{later(0.5,()=>bark(T.potap,'potap','Кыш! С палубы, прочь!',1.8));};
  /* ---------- шаг корабля ---------- */
  W.updates.push(dt=>{
    const prev={x:S.x,y:S.y,z:S.z};
    const holderLit=HEROES.some(h=>heroLight(h)&&hd(h.pos,lanPos)<1.8&&Math.abs(h.pos.y-deckY(h.pos.x))<1.6);S.grab=Math.max(0,S.grab-dt);S.lit=holderLit&&S.grab<=0;
    if(F.stage==='dock'&&S.lit&&!G.cine)launchScene();
    const flying=F.stage==='fly'||F.stage==='hold';
    // скорость по участкам; без фонаря паруса висят — корабль встаёт и проседает
    let want=0;if(flying){want=S.z>-60?3:S.z>-142?3.2:S.z>-230?2:1.6;if(F.stage==='hold')want=0;if(S.z<-228&&S.z>-300&&crows.some(e=>e.alive))want=Math.min(want,S.z<-290?0:1.2);if(S.z<=-300)want=0;if(!S.lit)want=0;}
    S.speed=damp(S.speed,want,1.5,dt);S.z-=S.speed*dt;if(F.launched&&F.stage!=='launch'&&F.stage!=='wing')S.y=damp(S.y,S.lit||F.landed?3:1.8,S.lit?1.2:0.4,dt);
    // крен от веса: Потап весит 3, остальные по 1; разница от 2 — 15°, от 4 — 30°
    if(F.stage!=='wing'&&F.stage!=='dock'&&F.stage!=='launch'&&!F.landed){let d=0;for(const h of HEROES){if(h.cling||!onDeck(h.pos))continue;const lx=h.pos.x-S.x;if(Math.abs(lx)<0.5)continue;d+=(h.kind==='potap'?3:1)*Math.sign(lx);}
      S.rollT=Math.abs(d)>=4?Math.sign(d)*0.52:Math.abs(d)>=2?Math.sign(d)*0.26:0;S.kick=damp(S.kick,0,1.4,dt);S.roll=damp(S.roll,S.rollT+S.kick,1.6,dt);}
    else if(F.landed)S.roll=damp(S.roll,0,3,dt);
    S.x=Math.sin(G.time*0.3)*0.3*(flying?1:0);
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
          floatText(new V3(S.x,S.y+3,S.z),'Порыв!','#ffd76a');tip(0,'Порыв ветра! Потап, в жёлтый кружок у мачты встань —<br>И щитом '+K(0,'guard')+' закройся, как стена, как грань.',2.6);if(F.stage==='hold')F.gusts+=0.5;}}}
    else gRing.visible=false;
    if(F.stage==='fly'&&S.z<-232&&F.wave===0)spawnCrows(3);
    if(F.wave===1&&crows.every(e=>!e.alive)&&!F.w2){F.w2=true;later(1.4,()=>spawnCrows(3));}
    if(F.wave>=2&&crows.every(e=>!e.alive)&&!F.crowsDone){F.crowsDone=true;SFX.ok();banner('Вороны прогнаны!','#ffd76a',2,'ключи в пропасть упали. Корабль к гнезду летит');}
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
    O(pi?()=>'Ущелье! Корабль от веса кренится — помоги Прошке с Потапом: к нужному борту встань.':()=>'Ущелье! С одной стороны скала — Потапа '+K(0,'swap')+' к другому борту переведи:<br>Корабль наклонится — и крыло над камнем пролетит, погляди!',()=>S.z<-140,()=>LEDGES.filter(L=>!L.done).map(L=>L.g)),
    O(()=>'Корабль боком встаёт! Потап мачту держит: в жёлтый кружок встань, щитом '+K(0,'guard')+' закройся.',()=>!!F.holdDone,()=>[ship.mast]),
    O(()=>'Тёмные тучи. Фонарь корабля золотые мостки на облаках зажигает.<br>Сбегай за звеном — и назад, пока корабль не улетает!',()=>S.z<-230,()=>SIDE.filter(C=>!C.it.taken).map(C=>C.it.g)),
    O(pi?()=>'Вороны хватают фонарь! Пелагея щит держит сама, да он устанет.<br>Беги Йошей к фонарю и гони ворон '+K(1,'attack')+' — пусть каждая отстанет!':()=>'Вороны хватают фонарь! Гони их Потапом. Жёлтый кружок <i class="sg y"></i> — щитом '+K(0,'guard')+' закройся.<br>Синяя капля — отбей назад, не бойся.',
      ()=>!!F.crowsDone,()=>crows.filter(e=>e.alive).map(e=>e.g)),
    O('Гнездо Гусей-лебедей — выходи на берег, к звену!',()=>false,()=>[L4.g])];
  for(const pi of[0,1])W.objectives[pi]=mk(pi);
  W.tipZones.push({cond:(pi,h)=>F.launched&&!S.lit&&!F.landed,text:pi=>'Фонарь погас — корабль падает! Встань героем с пером у мачты и зажги '+K(pi,'item')+' — скорей!'},
    {cond:(pi,h)=>h.groundRef&&h.groundRef.tile,text:pi=>'Золотой мосток горит, пока фонарь корабля рядом. Хватай звено — и назад, скорей!'});
  W.spawns=[[new V3(-2,0,6),new V3(-3.8,0,7.4)],[new V3(2,0,6),new V3(3.8,0,7.4)]];W.startAct=[0,0];
  W.pauseLine='Летучий корабль: перо в фонаре у мачты — паруса светятся, и корабль летит.<br>Потап за троих весит: крен туда, где тяжелее, — туда и кренит.<br>Порыв — Потап у мачты щит держит, как гранит.';
  W.onStart=()=>{later(0.8,()=>say('zven','Дайте ему перо. У мачты фонарь!',2.6,true));};
  flushDecor();flushPuffs();}

