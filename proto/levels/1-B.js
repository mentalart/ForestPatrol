/* ============================== 1-Б «ЛЕШИЙ-ПУТАНИК» — босс мира 1 ============================== */
// клубок в бою: связать двойников · босс ест искры · Богатырский щит, богатырский выход и Богатырский мах · экран общий
function makeCones(p,n){for(let i=0;i<(n||14);i++){const m=new THREE.Mesh(new THREE.ConeGeometry(0.14,0.34,6),M(0x8a5a32));m.position.copy(p).add(new V3(rand(-0.5,0.5),rand(0.5,2.5),rand(-0.5,0.5)));
  debris(m,new V3(rand(-4,4),rand(2,6),rand(-4,4)),0);}}
function build1B(){
  W.zvenAway=true;   // Звенышко улетает вперёд и появляется, только когда нужно
  setTheme('dark');W.name='1-Б · «Леший-Путаник»';W.sub='Босс мира 1 · Опять заблудились? Ну-ка, где я?';W.camX=13;const F=W.flags;
  W.abil.clew=true;W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.threadLife=10;
  const C={x:0,z:-14},R=12;
  ground(-15,15,-30,8);wall(-15.2,-15,-30,8);wall(15,15.2,-30,8);wall(-15.2,15.2,8,8.2);wall(-15.2,15.2,-30.2,-30);
  // круглая поляна: по краю ели (коллайдеры — кольцом)
  for(let i=0;i<30;i++){const a=i/30*Math.PI*2;const x=C.x+Math.cos(a)*(R+1.2),z=C.z+Math.sin(a)*(R+1.2);if(z>C.z+R-2&&Math.abs(x)<2.2)continue;decorFir(x,z,rand(1.3,1.9),true);W.cyls.push({x,z,r:1.25,miny:-1,maxy:6,on:true});}
  edgeTrees(-29,6,-15,15);for(let i=0;i<40;i++)decorFir(rand(-15,15),rand(-30,-27),rand(1.4,2.2),true);
  const carousel=new THREE.Group();carousel.position.set(C.x,0,C.z);W.group.add(carousel);
  for(let i=0;i<14;i++){const a=i/14*Math.PI*2;const f=new THREE.Group();f.position.set(Math.cos(a)*(R-0.6),0,Math.sin(a)*(R-0.6));carousel.add(f);addMesh(GEO.trunk,M(0x5a3d22),0,0.6,0,f);addMesh(GEO.cone1,M(0x2f5a34),0,2.0,0,f);addMesh(GEO.cone2,M(0x2f5a34),0,3.1,0,f);f.scale.setScalar(0.8);}
  carousel.visible=false;
  bell(0,-2.2);
  const Z=makeZven();W.zven=Z;Z.pos.set(0,2.4,3);W.zvenFree=true;
  const arena={x:C.x,z:C.z,r:R-1.5,camActive:()=>true};W.camZones.push(arena);
  // босс-полоса
  const bb=$('bossbar');bb.style.display='block';
  const setBar=()=>{const ph=F.phase||1,hp=F.phase===1?3-(F.head||0):F.phase===2?2-(F.round||0):F.phase===3?(boss3&&boss3.alive?Math.max(1,boss3.embers)/boss3.maxEmb:0):0;
    bb.innerHTML='<b>Леший-Путаник</b> · фаза '+Math.min(3,ph)+' / 3 <span class="seg">'+(F.phase===3?'<i style="width:'+Math.round(hp*100)+'%"></i>':[0,1,2].slice(0,F.phase===1?3:2).map(i=>'<u class="'+(i<hp?'on':'')+'"></u>').join(''))+'</span>';};
  W.onLeave=()=>{bb.style.display='none';};
  /* ---------- Леший ростом с ель ---------- */
  const L=makeLeshy(2.2);L.g.position.set(0,0,-24.5);L.hands.forEach(hh=>{hh.sh.visible=false;});
  W.cyls.push({x:0,z:-24.5,r:2.4,miny:-1,maxy:9,on:true});
  const shoulders=[-1,1].map(s=>{const x=s*2.4,z=-23.3,y=5.6;const c={on:false};const m=addMesh(new THREE.BoxGeometry(1.8,0.3,1.8),MAT.moss,x,y-0.15,z);m.visible=false;return {x,y,z,c,m,s};});
  const headPos=new V3(0,7.4,-24.2);
  // руки-коряги: левая — жёлтая, правая — красная
  const ramps=[];   // по мосту на руку: пробиты обе — легли оба моста
  function makeRamp(hand){dropRamp(hand);const sh=shoulders[hand.side>0?1:0],from=new V3(hand.pos.x,0,hand.pos.z),to=new V3(sh.x,sh.y,sh.z+0.4);
    const n=18,cols=[],g=new THREE.Group();W.group.add(g);const len=from.distanceTo(to);
    const arm=new THREE.Mesh(new THREE.CylinderGeometry(0.55,0.75,len,8),M(0x3d5a2a));arm.position.copy(from).add(to).multiplyScalar(0.5);arm.quaternion.setFromUnitVectors(new V3(0,1,0),to.clone().sub(from).normalize());g.add(arm);
    const top=new THREE.Mesh(new THREE.BoxGeometry(1.1,0.1,len),MAT.moss);top.position.copy(arm.position).add(new V3(0,0.55,0));top.lookAt(to.clone().add(new V3(0,0.55,0)));g.add(top);
    const rp={x0:from.x,z0:from.z,y0:0.02,y1:to.y,dx:(to.x-from.x)/Math.hypot(to.x-from.x,to.z-from.z),dz:(to.z-from.z)/Math.hypot(to.x-from.x,to.z-from.z),len:Math.hypot(to.x-from.x,to.z-from.z),w:0.75};W.ramps=W.ramps||[];W.ramps.push(rp);cols.push(rp);
    {const fx=sh.x*0.55,fz=sh.z-0.9,fl=Math.hypot(fx-to.x,fz-to.z);const fp={x0:to.x,z0:to.z,y0:to.y,y1:to.y,dx:(fx-to.x)/fl,dz:(fz-to.z)/fl,len:fl,w:0.9};W.ramps.push(fp);cols.push(fp);}   // площадка на плече
    sh.c.on=true;sh.m.visible=true;ramps.push({g,cols,sh,hand,t:9});banner('Рука на землю легла!','#b8e070',2,'беги по руке — бей по макушке!');}
  function dropRamp(hand){for(const r of ramps.slice()){if(hand&&r.hand!==hand)continue;r.cols.forEach(c=>{const i=W.ramps.indexOf(c);if(i>=0)W.ramps.splice(i,1);for(const q of HEROES)if(q.groundRef===c){q.groundRef=null;q.grounded=false;}});r.sh.c.on=false;r.sh.m.visible=false;W.group.remove(r.g);ramps.splice(ramps.indexOf(r),1);}}
  const hands=[];
  function spawnHands(){for(const s of[-1,1]){const e=makeFoe('hand',s*4,-17,{leash:10,signals:[s<0?'yellow':'red'],scale:1});e.side=s;e.noKill=true;e.home.set(s*4,0,-17);
      e.onBroken=()=>{makeRamp(e);};e.onFinisher=(h)=>{floatText(e.pos.clone().add(new V3(0,2,0)),'По руке — да к плечу!','#b8e070');};hands.push(e);}}
  /* ---------- фаза 2: двойники ---------- */
  const doubles=[];let stakes2=[];W.doubles=doubles;
  function spawnDoubles(n){doubles.forEach(d=>W.group.remove(d.m.g));doubles.length=0;const real=Math.floor(rand(0,n));
    for(let i=0;i<n;i++){const m=makeLeshy(1.05);const em=new THREE.Mesh(new THREE.SphereGeometry(0.22,10,8),MB(0xff7a1a,{transparent:true,opacity:0}));em.position.set(0,2.6,0.6);m.g.add(em);
      doubles.push({m,em,a:i/n*Math.PI*2,real:i===real,state:'walk',t:0,pos:m.g.position});}
    smokePuff();}
  function smokePuff(){for(let i=0;i<10;i++)burst(new V3(C.x+rand(-6,6),1,C.z+rand(-6,6)),0x6a8a5a,6,3);SFX.whoosh();}
  function addStakes(n){for(const t of W.threads.slice())if(t.string)removeThread(t);stakes2.forEach(s=>{W.group.remove(s.g);W.stakes.splice(W.stakes.indexOf(s),1);});stakes2=[];
    for(let i=0;i<n;i++){const a=(i+0.5)/n*Math.PI*2;stakes2.push(stake(C.x+Math.cos(a)*(R-1.4),C.z+Math.sin(a)*(R-1.4),0,{h:0.7}));}}
  const segDist=(p,t)=>{const L=t.len,px=p.x-t.sx,pz=p.z-t.sz,u=clamp(px*t.dx+pz*t.dz,0,L);return Math.hypot(px-t.dx*u,pz-t.dz*u);};
  const dblHit={pos:new V3(),r:1.2,push:false,alive:()=>F.phase===2&&doubles.some(d=>d.state!=='gone'),onHit:h=>{let best=null,bd=h.d.range+1.3;
    for(const d of doubles){if(d.state==='gone')continue;const dd=hd(d.pos,h.pos);if(dd<bd){bd=dd;best=d;}}if(!best)return;
    if(!best.real){best.state='gone';makeCones(best.pos,14);W.group.remove(best.m.g);SFX.crash();floatText(best.pos.clone().add(new V3(0,3,0)),'Шишки!','#e0c090');}
    else if(best.state==='fallen'){best.state='gone';F.round=(F.round||0)+1;SFX.finisher();G.hitstop=0.14;shakeAll(0.05,0.35);ringFx(best.pos,COL.gold,3.5);floatText(best.pos.clone().add(new V3(0,3.4,0)),'Нашли!','#ffd76a');
      for(let i=0;i<8;i++)spawnSpark(best.pos.clone().add(new V3(0,2,0)),[COL.gold,0x6ad0ff,0xff6a8a][i%3]);bark(best.m,'leshy',F.round<2?'Ай! Ну, это случайно, по оплошке.':'Ай! Нашли меня, ишь…',2);
      later(1.0,()=>{doubles.forEach(d=>{if(d.state!=='gone'||d===best){makeCones(d.pos,8);W.group.remove(d.m.g);d.state='gone';}});if(F.round<2){later(1.4,()=>{spawnDoubles(5);addStakes(6);banner('Ещё круг!','#b8e070',2,'двойников и колышков больше');});}else later(1.2,startPhase3);});}
    else{const dx=h.pos.x-best.pos.x,dz=h.pos.z-best.pos.z,dd=Math.hypot(dx,dz)||1;h.vel.x=dx/dd*6;h.vel.z=dz/dd*6;h.vel.y=4;h.grounded=false;h.knockT=0.3;SFX.knock();floatText(best.pos.clone().add(new V3(0,3.2,0)),'Ха! Ищи-свищи!','#b8e070');}}};
  W.hittables.push(dblHit);
  W.hittables.push({pos:new V3(headPos.x,0,headPos.z),r:1.6,push:false,alive:()=>F.phase===1&&ramps.length>0,onHit:h=>{if(h.pos.y>4.5&&!G.cine)headHit(h);}});   // макушка — только с плеча
  /* ---------- фаза 3: вместе ---------- */
  let boss3=null;const ringFxM=[0,1].map(()=>{const m=new THREE.Mesh(new THREE.TorusGeometry(1,0.08,6,32),MB(COL.yellow,{transparent:true,opacity:0.9}));m.visible=false;W.group.add(m);return m;});
  const ringSun=[0,1].map(()=>{const m=new THREE.Mesh(new THREE.SphereGeometry(0.24,12,10),M(COL.yellow,{emissive:COL.yellow,emissiveIntensity:1.3}));m.visible=false;W.group.add(m);return m;});
  const cring={on:false,t:0,next:6,press:[null,null]};W.cring=cring;
  W.onGuardTap=(pi,h)=>{if(cring.on&&cring.press[pi]===null)cring.press[pi]=cring.t;};
  function startPhase3(){F.phase=3;doubles.forEach(d=>{W.group.remove(d.m.g);d.state='gone';});carousel.visible=true;smokePuff();L.g.visible=false;boss3=makeFoe('leshyBoss',C.x,C.z-1,{leash:0.6});boss3.needBoth=true;boss3.onDeath=()=>{F.won=true;later(1.4,ending);};
    for(const t of W.threads.slice())if(t.string)removeThread(t);stakes2.forEach(s=>{W.group.remove(s.g);W.stakes.splice(W.stakes.indexOf(s),1);});stakes2=[];
    banner('Леший лес каруселью крутит!','#b8e070',2.6,'над обоими один кружок — щитом закройтесь вместе, в такт: Богатырский щит');say('leshy','А ну-ка, закружу, заверчу!',2.2);cring.next=4;}
  function ringStrike(){const win=TIMING[genPath()].parry;const hit=[0,1].map(pi=>cring.press[pi]!==null&&Math.abs(cring.press[pi]-1.3)<=win);
    if(hit[0]&&hit[1]){G.stats.shields++;SFX.horn();banner('Богатырский щит!','#ffd76a',1.8,'вместе, в лад');for(const pi of[0,1]){const h=active(pi);burst(h.pos.clone().add(new V3(0,1,0)),0xffffff,14,4);
        for(let i=0;i<4;i++)spawnSpark(h.pos.clone().add(new V3(rand(-1,1),1.4,rand(-1,1))),0x6ad0ff);}if(boss3&&boss3.alive)emberOut(boss3,2,'Богатырский щит!');}
    else for(const pi of[0,1]){const h=active(pi);if(players[pi].downed||h.cling)continue;if(cring.press[pi]!==null||h.guard)shieldBlock(h);else damageHero(h,{kind:'enemy',ref:boss3});
      if(!hit[pi])tip(pi,'Удар по кругу! Щитом '+K(pi,'guard')+' — вместе!',2.6);}
    shakeAll(0.05,0.3);SFX.whoosh();}
  // Ctrl+Alt+B (релиз, late_95_dev.js): следующая фаза босса — для проверки и показа; вернуть true, если перешли
  W.bossNext=()=>{if(G.cine||F.won||F.phase<1)return false;
    if(F.phase===1){F.head=2;headHit(null);return true;}
    if(F.phase===2){doubles.forEach(d=>{if(d.state!=='gone'){W.group.remove(d.m.g);d.state='gone';}});startPhase3();return true;}
    if(F.phase===3&&boss3&&boss3.alive){unravel(boss3);return true;}return false;};
  /* ---------- сюжет ---------- */
  function intro(){F.phase=0;play({dur:9,fov:50,shots:[shot(0,[0,3,2],[0,5,-24]),shot(4,[3,6,-12],[0,7,-24],[1.6,4.2,-16],[0,7.2,-24],3)],
      says:[[0.5,3.2,null,'<i>Леший ростом с ель, вместо рук — коряги.</i>',true],[4.2,3,'leshy','Опять заблудились? Ну-ка, где я?']],
      events:[{t:4,fn:()=>{for(let i=0;i<6;i++)tone(rand(140,220),0.14,'sawtooth',0.12,rand(80,120),i*0.1);}}],
      end:()=>{F.phase=1;F.head=0;spawnHands();snapCams();banner('Фаза 1 · руки','#b8e070',2.4,'жёлтая — щит · красная — кувырок');}});}
  function headHit(h){F.head++;SFX.finisher();G.hitstop=0.16;shakeAll(0.06,0.4);ringFx(headPos,COL.gold,3);floatText(headPos.clone().add(new V3(0,1,0)),'По макушке!','#ffd76a');
    for(let i=0;i<6;i++)spawnSpark(headPos.clone(),[COL.gold,0x6ad0ff,0xff6a8a][i%3]);bark(L,'leshy',['Ай!','Ой-ой! Макушка моя!','Ну всё, довольно, хватит!'][Math.min(2,F.head-1)],1.8);
    for(const q of HEROES)if(q.pos.y>4.5&&hd(q.pos,headPos)<5){q.vel.set(q.pos.x<0?-5:5,6,5);q.grounded=false;q.knockT=0.5;}
    dropRamp();hands.forEach(e=>{if(e.alive){e.state='idle';e.embers=e.maxEmb;e.t=0;}});
    if(F.head>=3){F.phase=1.5;hands.forEach(e=>unravel(e));later(1.2,()=>{play({dur:6,fov:50,shots:[shot(0,[0,4,0],[0,5,-22])],says:[[0.4,3,'leshy','Ах так? Нате вам — четыре Лешего, не счесть!']],
      events:[{t:3,fn:()=>{smokePuff();L.g.visible=false;}}],end:()=>{F.phase=2;F.round=0;spawnDoubles(4);addStakes(4);snapCams();
        banner('Фаза 2 · двойники','#b8e070',2.6,'у настоящего тень и мох-следы');}});});}}
  function ending(){const T=HERO;dropRamp();carousel.visible=false;const lz=makeLeshy(1.3);lz.g.position.set(0,0.7,-16);lz.g.rotation.y=0;
    const st=addMesh(new THREE.CylinderGeometry(1.1,1.2,0.7,12),M(0x8a5a32),0,0.35,-16.1);
    play({dur:16,fov:48,shots:[shot(0,[0,3.4,-8],[0,3,-16]),shot(7.4,[2.4,2.2,-11],[0,3.6,-16]),shot(12,[-2,1.8,-8.6],[T.proshka.pos.x,1,T.proshka.pos.z])],
      says:[[0.8,6.2,'leshy','<i>(садится на пень, чешет мох на голове)</i> Нашли. Спор проигран. Раз нашли — буду вам дорогу показывать, таков уговор.'],
        [12.2,3.2,'proshka','<i>(тихо)</i> Шапка работает, между прочим.']],
      events:[{t:0,fn:()=>{HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-9.5,0);h.face=Math.PI;});T.proshka.hatOn='nose';}},{t:2,fn:()=>{anim(3,k=>{lz.hands[0].sh.rotation.x=-1.8-Math.sin(k*Math.PI*6)*0.2;});}},
        {t:12,fn:()=>{T.proshka.face=Math.PI*0.8;}}],
      tick:t=>{lz.head.rotation.z=t>2&&t<5?Math.sin(t*9)*0.1:0;},
      end:()=>{banner('Леший-Путаник распутан — вот так диво!','#ffd76a',2.4,'теперь он нам должен — и путь укажет');later(2.2,()=>{F.out=true;finishLevel();});}});}
  W.updates.push(dt=>{
    setBar();
    // руки: пока рука в Пробое — лежит мостком; вернулась — мостик убран
    for(const r of ramps.slice()){r.t-=dt;if(r.t<=0||!(r.hand.alive&&r.hand.state==='broken')){if(r.t<=0||!HEROES.some(q=>q.pos.y>1&&q.groundRef&&r.cols.includes(q.groundRef)))dropRamp(r.hand);}}
    for(const e of hands){if(e.alive&&e.state==='broken'&&!e.rampDone){e.rampDone=true;e.bdur=Math.max(e.bdur,8);if(e.onBroken)e.onBroken();}if(e.state!=='broken')e.rampDone=false;}
    // удар по макушке — с плеча
    L.head.rotation.y=Math.sin(G.time*0.7)*0.3;L.body.rotation.z=Math.sin(G.time*0.5)*0.03;
    // фаза 2: двойники ходят кругом; струна по ногам — путаются
    if(F.phase===2){for(const d of doubles){if(d.state==='gone')continue;d.t+=dt;
        if(d.state==='walk'){d.a+=dt*0.32;d.pos.set(C.x+Math.cos(d.a)*7,0,C.z+Math.sin(d.a)*7);d.m.g.rotation.y=-d.a;d.m.body.rotation.z=Math.sin(G.time*5+d.a)*0.06;
          for(const t of W.threads){if(!t.string||t.sag)continue;if(segDist(d.pos,t)<0.9){if(d.real){d.state='fallen';d.t=0;SFX.brk();banner('Настоящий запутался!','#ffd76a',1.6,'бей его — добивай!');d.m.body.rotation.x=-1.3;d.m.g.position.y=0.3;}
              else{d.state='gone';makeCones(d.pos,14);W.group.remove(d.m.g);SFX.crash();floatText(d.pos.clone().add(new V3(0,3,0)),'Запутался — шишки!','#e0c090');}break;}}
          for(const pi of[0,1]){const h=active(pi);if(d.state!=='walk'||h.knockT>0)continue;const dx=h.pos.x-d.pos.x,dz=h.pos.z-d.pos.z,dd=Math.hypot(dx,dz);
            if(dd<1.4&&h.pos.y<3){h.vel.x=dx/(dd||1)*6;h.vel.z=dz/(dd||1)*6;h.vel.y=4;h.grounded=false;h.knockT=0.35;SFX.knock();floatText(h.pos.clone().add(new V3(0,1.8,0)),'Толк!','#b8e070');}}}
        else if(d.state==='fallen'&&d.t>5){d.state='walk';d.m.body.rotation.x=0;d.m.g.position.y=0;floatText(d.pos.clone().add(new V3(0,3,0)),'Выпутался!','#b8e070');}
        d.em.material.opacity=d.real&&W.owlT>0?1:0;}
      dblHit.pos.set(C.x,0,C.z);dblHit.r=20;}
    // фаза 3: карусель и круговой удар
    if(F.phase===3){carousel.rotation.y+=dt*0.35;if(boss3&&boss3.alive&&boss3.state!=='broken'&&!G.cine){
        if(!cring.on){cring.next-=dt;if(cring.next<=0){cring.on=true;cring.t=0;cring.press=[null,null];SFX.yellow();}}
        else{cring.t+=dt;const k=clamp(cring.t/1.3,0,1);for(const pi of[0,1]){const h=active(pi),m=ringFxM[pi],s=ringSun[pi];m.visible=s.visible=true;
            m.position.set(h.pos.x,h.pos.y+heroHeight(h)+1.2,h.pos.z);m.rotation.x=Math.PI/2;m.scale.setScalar(lerp(2.2,0.45,k));m.material.color.setHex(k>0.9?0xffffff:COL.yellow);s.position.copy(m.position);}
          if(cring.t>=1.3){cring.on=false;cring.next=rand(6,8);ringFxM.forEach(m=>{m.visible=false;});ringSun.forEach(m=>{m.visible=false;});ringStrike();}}}
      else{ringFxM.forEach(m=>{m.visible=false;});ringSun.forEach(m=>{m.visible=false;});cring.on=false;}}});
  W.onEat=(e)=>{if(!F.yum||G.time-F.yum>6){F.yum=G.time;bark(L,'leshy','Вкусно! Ох, объеденье!',1.4);}};
  /* ---------- рисунки кнопок и задачи ---------- */
  const T=HERO;
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig!=='red'&&e.help)||(cring.on&&cring.t>0.7&&cring.press[pi]===null),cring.on?'вместе!':null);
    prompt(pi,'roll',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig==='red'&&e.help));
    prompt(pi,'attack',()=>headOf(h()),()=>ramps.length>0&&h().pos.y>5&&hd(h().pos,headPos)<3.2,'по макушке');
    prompt(pi,'item',()=>headOf(h()),()=>F.phase===2&&!W.threads.some(t=>t.owner===pi&&!t.ret&&!t.string)&&stakes2.some(s=>!s.used&&hd(s,h().pos)<9&&hd(s,h().pos)>2));}
  prompt(1,'skill',()=>headOf(T.pelageya),()=>F.phase===2&&T.pelageya.active&&W.owlT<=0&&players[1].owlCd<=0,'кто настоящий?');
  W.tipZones.push({cond:()=>F.phase===1&&ramps.length>0,text:pi=>'Беги по руке на плечо — бей '+K(pi,'attack')+' по макушке!'},
    {cond:()=>F.phase===2,text:pi=>'Натяни струну между колышками '+K(pi,'item')+'.'});
  const ph1=pi=>O(()=>'Отбей <i class="sg y"></i> щитом '+K(pi,'guard')+', <i class="sg r"></i> — кувырок '+K(pi,'roll')+'.',()=>F.phase>1,()=>hands.filter(e=>e.alive).map(e=>e.g));
  const ph2=pi=>O(pi?()=>'Найди настоящего: Совиный взор '+K(1,'skill')+'. Клубок '+K(1,'item')+' — в колышек.':()=>'Брось клубок '+K(0,'item')+' в колышек. Упавшего бей '+K(0,'attack')+'!',
    ()=>F.phase>=3,()=>stakes2.map(s=>s.g));
  const ph3=pi=>O(()=>'Вместе! Кружок над обоими — щитом '+K(pi,'guard')+' в такт закройтесь. Кору бей сбоку.<br>Синяя полоска полна — богатырский выход включится сам. Леший оглушён — бейте '+K(pi,'attack')+' вдвоём, без проволочек, без сроку.',()=>!!F.won,()=>boss3?[boss3.g]:[]);
  for(const pi of[0,1])W.objectives[pi]=[O('Леший-Путаник…',()=>F.phase>=1,()=>[L.g]),ph1(pi),ph2(pi),ph3(pi),O('Леший на пень садится…',()=>false,()=>[])];
  W.spawns=[[new V3(-2.5,0,-3.5),new V3(-4.5,0,-2.5)],[new V3(2.5,0,-3.5),new V3(4.5,0,-2.5)]];W.startAct=[0,0];
  W.pauseLine='Леший-Путаник: руки-коряги, четыре двойника да карусель.<br>Настоящего Совиный взор покажет, а двойников струна запутает в кудель.';
  W.onStart=()=>intro();
  flushDecor();}

