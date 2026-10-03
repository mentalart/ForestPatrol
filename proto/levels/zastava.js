/* ============================== ЗАСТАВА ТРЁХ БОГАТЫРЕЙ — испытания на время для старших ============================== */
// за 2 самоцвета · одна цель: богатырское время — доспех богатыря в примерочную
// Илья Муромец: крен Калинова моста на время (сила и вес: Потап весит за троих) · Добрыня Никитич: семерых одним махом · Алёша Попович: колокольная перекличка
function makeBogatyr(kind){const g=new THREE.Group();W.group.add(g);const C={i:[0x8a8a9a,0xd8d8d8,0x6a3a2a],d:[0x6a6a7a,0x2a1a10,0x2a4a8a],a:[0x9a9aaa,0xc89a4a,0x8a2a2a]}[kind];
  const mail=M(C[0]),beard=M(C[1]),cloak=M(C[2]),skin=M(0xe8c8a8),gold=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4});
  part(g,new THREE.CylinderGeometry(0.55,0.75,1.8,12),mail,0,1.2,0);part(g,new THREE.CylinderGeometry(0.62,0.8,1.2,12,1,true),cloak,0,1.1,-0.08);
  const head=new THREE.Group();head.position.y=2.45;g.add(head);part(head,new THREE.SphereGeometry(0.36,12,10),skin,0,0,0);part(head,new THREE.ConeGeometry(0.4,0.7,12),mail,0,0.42,0);part(head,new THREE.SphereGeometry(0.06,6,5),gold,0,0.8,0);
  const bd=new THREE.ConeGeometry(0.28,kind==='a'?0.3:0.6,10);bd.rotateX(Math.PI);part(head,bd,beard,0,-0.36,0.18);for(const s of[-1,1])part(head,new THREE.SphereGeometry(0.05,6,5),MAT.dark,s*0.12,0.06,0.32);
  const sh=part(g,new THREE.CylinderGeometry(0.5,0.5,0.08,16),cloak,-0.7,1.3,0.3);sh.rotation.z=Math.PI/2;sh.rotation.y=0.3;part(g,new THREE.SphereGeometry(0.1,8,6),gold,-0.76,1.3,0.32);
  if(kind==='d'){const sw=part(g,new THREE.BoxGeometry(0.08,1.4,0.03),M(0xd8d8e0),0.7,1.4,0.3);sw.rotation.z=-0.2;}if(kind==='i'){part(g,new THREE.CylinderGeometry(0.07,0.07,1.6,6),M(0x6a4a2a),0.7,1.2,0.3);part(g,new THREE.SphereGeometry(0.22,8,6),M(0x5a5a64),0.7,2.0,0.3);}
  if(kind==='a'){const gs=new THREE.Group();gusliMesh(gs,M(0xc89a4a),0.7);gs.position.set(0.6,1.3,0.4);gs.rotation.set(-0.6,0,0.4);g.add(gs);}
  for(const s of[-1,1])part(g,new THREE.CylinderGeometry(0.18,0.2,0.6,8),M(0x4a3a2a),s*0.28,0.3,0);return {g,head};}
function buildZast(kind){
  const Z5={i:{id:'z-i',b:'Илья Муромец',t:'Крен Калинова моста',arm:'armI',hero:'Потапу',gold:45,silver:80,line:'Сила — не только поднять, мой свет.<br>Знать, куда встать, — вот и весь секрет.'},
    d:{id:'z-d',b:'Добрыня Никитич',t:'Семерых одним махом',arm:'armD',hero:'Прошке',gold:80,silver:130,line:'Семерых — одним махом? Посмотрим, поглядим.'},
    a:{id:'z-a',b:'Алёша Попович',t:'Колокольная перекличка',arm:'armA',hero:'Пелагее',gold:90,silver:140,line:'Колокола перекликаются. Запомните — и повторите за ним.'}}[kind];
  setTheme('sunset');sky('sunset');W.name='Застава · '+Z5.b;W.sub='«'+Z5.t+'» · испытание на время';W.camX=16;const F=W.flags;F.stage='intro';F.t=0;W.zast=kind;
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.fallY=-6;const T=HERO;
  const bog=makeBogatyr(kind);bog.g.position.set(-9,0,-2);bog.g.rotation.y=0.9;W.cyls.push({x:-9,z:-2,r:0.9,miny:-1,maxy:3,on:true});
  const tower=(x,z)=>{box(x-1.2,x+1.2,0,5,z-1.2,z+1.2,M(0x9a7a50),{occ:true});const rg=new THREE.ConeGeometry(2,1.6,4);rg.rotateY(Math.PI/4);addMesh(rg,M(0x6b3f22),x,5.8,z);};
  const bb=$('bossbar');W.onLeave=()=>{bb.style.display='none';};
  const fmt=t=>{const m=Math.floor(t/60),s=Math.floor(t%60);return (m?m+':':'')+(s<10&&m?'0':'')+s+' с';};
  function setBar(){bb.style.display='block';bb.style.borderColor='#ffd76a';const t=F.t;bb.innerHTML='<b style="color:#ffd76a">'+fmt(t)+'</b> · <span style="color:'+(t<=Z5.gold?'#ffd76a':'#888')+'">богатырское время — '+Z5.gold+' с · доспех</span>'+(F.extra?' <small>'+F.extra()+'</small>':'');}
  function done(){if(F.stage==='done')return;F.stage='done';const t=F.t;const m=t<=Z5.gold?'gold':'done';G.zbest=G.zbest||{};if(!G.zbest[Z5.id]||t<G.zbest[Z5.id])G.zbest[Z5.id]=t;
    const kind={armI:'potap',armD:'proshka',armA:'pelageya'}[Z5.arm];if(m==='gold'&&!own(Z5.arm)){buyWard(Z5.arm);putOn(kind,Z5.arm);}SFX.horn();SFX.ok();setBar();
    banner(m==='gold'?'Богатырское время!':'Дошли!','#ffd76a',3,fmt(t)+(m==='gold'?' · доспех '+Z5.b.split(' ')[0]+'а — в примерочной':' · доспех — за '+Z5.gold+' с'));
    later(0.6,()=>bark(bog,'kuzma',m==='gold'?'Богатырское дело — вот это да!':t<=Z5.silver?'Крепко. Ещё бы чуток — и было бы в самый раз.':'Дошли — уже сила, так и знай.',2.2));later(3.4,()=>{bb.style.display='none';goLevel('luko');});}
  function intro(extra){HEROES.forEach(h=>{const k=players[h.player].heroes.indexOf(h),s=W.spawns[h.player][k];placeOnGround(h,s.x,s.z,0);h.face=Math.PI;});
    play({dur:7,fov:46,shots:[shot(0,[-6,2.4,2],[-9,2.2,-2])],says:[[0.3,3.2,null,'<i>'+Z5.b+' у Заставы встречает — богатырь удалой.</i>',true],[3.4,3.4,null,'«'+Z5.line+'»',true]],end:()=>{W.anims.length=0;F.stage='run';F.t=0;snapCams();setBar();banner(Z5.t,'#ffd76a',3,extra);}});}
  W.updates.push(dt=>{if(F.stage==='run'&&!G.cine){F.t+=dt;setBar();}});
  /* ---------- Илья: сундук-качели на цепях — Потап весит за троих ---------- */
  if(kind==='i'){ground(-14,14,-2,8,0);ground(-14,14,-44,-32,0,M(0x8ab04a));tower(-9,-38);tower(9,-38);bell(-6,5);
    for(let i=0;i<14;i++)addMesh(new THREE.DodecahedronGeometry(rand(1,2)),M(0x6a6460),rand(-10,10),-6,rand(-30,-4));
    const B={th:0,tipT:0};const HW=2.6,Z0=-2,Z1=-32;const bridge=new THREE.Group();bridge.position.set(0,0,(Z0+Z1)/2);W.group.add(bridge);
    for(let z=Z0;z>Z1;z-=1.2){const p=addMesh(new THREE.BoxGeometry(HW*2,0.2,1.1),M(z%2.4<1.2?0x8a5a32:0x7a4a28),0,-0.1,z-0.6-(Z0+Z1)/2,bridge);p.castShadow=false;}
    for(const s of[-1,1]){addMesh(new THREE.BoxGeometry(0.12,0.12,Z0-Z1),M(0x5a3a1a),s*HW,0.5,0,bridge);bridge.add(chainLine(new V3(s*HW,0.5,(Z0-Z1)/2),new V3(s*HW*1.6,5,(Z0-Z1)/2+2)));bridge.add(chainLine(new V3(s*HW,0.5,-(Z0-Z1)/2),new V3(s*HW*1.6,5,-(Z0-Z1)/2-2)));}
    const surf=(x,z,reach)=>{if(Math.abs(x)>HW||z>Z0||z<Z1)return null;const y=-x*Math.tan(B.th);if(y>reach+0.001)return null;return {y,ref:B};};W.surfs.push(surf);
    W.noCarry.push({minx:-14,maxx:14,miny:-8,maxy:8,minz:-44,maxz:-2.5});
    const WEIGHT={potap:3,proshka:1,pelageya:1,yosha:1},TMAX=0.42;
    function tip(){F.tips=(F.tips||0)+1;SFX.crash();banner('Мост перевернулся!','#ffd0d0',1.8,'все, кто был на мосту, — назад к колокольчику · не давайте мосту крениться: Потап тяжёл, как трое');for(const h of HEROES)if(h.groundRef===B){h.pos.x+=Math.sign(B.th||1)*(HW+1);h.groundRef=null;h.grounded=false;h.vel.y=2;}B.tipT=1.2;}
    // порывы ветра над Смородиной: кренят мост — перенеси вес навстречу
    const GU={t:4,dir:0,left:0};W.gust=()=>GU.left>0?GU.dir:0;const gm=MB(0xffffff,{transparent:true,opacity:0.5});
    W.updates.push(dt=>{if(F.stage!=='run')return;GU.t-=dt;if(GU.left>0){GU.left-=dt;if(Math.random()<0.4){const p=new V3(-GU.dir*8,rand(0.5,3),rand(-30,-4));burst(p,0xffffff,1,6,0.6);}}
      if(GU.t<=0){GU.t=rand(5,7);GU.dir=Math.random()<0.5?-1:1;GU.left=2.6;SFX.whoosh();banner(GU.dir>0?'Ветер слева!  →':'←  Ветер справа!','#e0f0ff',1.4,'на другую сторону перейдите — '+(GU.dir>0?'влево':'вправо'));}});
    W.updates.push(dt=>{let tq=0,n=0;for(const h of HEROES){if(h.groundRef===B){tq+=WEIGHT[h.kind]*h.pos.x;n++;}}if(n&&W.gust())tq+=W.gust()*6;if(B.tipT>0){B.tipT-=dt;B.th=damp(B.th,0,4,dt);}else{const want=clamp(tq*0.06,-0.5,0.5);B.th=damp(B.th,want,1.6,dt);if(Math.abs(B.th)>TMAX)tip();}
      bridge.rotation.z=-B.th;for(const h of HEROES)if(h.groundRef===B&&h.grounded){h.vel.x+=Math.sin(B.th)*7*dt;}
      if(F.stage==='run'&&HEROES.every(h=>h.pos.z<Z1-0.5&&h.pos.y>-0.5))done();});
    F.extra=()=>'крен '+Math.round(Math.abs(B.th)/TMAX*100)+'% · на том берегу: '+HEROES.filter(h=>h.pos.z<Z1-0.5).length+' / 4'+(F.tips?' · переворотов: '+F.tips:'');
    W.spawns=[[new V3(-1.6,0,3),new V3(-3.6,0,4)],[new V3(1.6,0,3),new V3(3.6,0,4)]];
    for(let pi=0;pi<2;pi++)W.objectives[pi]=[O(()=>'Все четверо — на тот берег по Калинову мосту. Мост кренится туда, где тяжелей.<br>Потап тяжёл, как трое. До края наклонится — перевернётся, не жалей.',()=>F.stage==='done',()=>[]),O('…',()=>false,()=>[])];
    W.pauseLine='Застава · Илья Муромец. Калинов мост кренится туда, где вес, а Потап — за троих.<br>Все четверо — на тот берег, на время. Сильный крен — перевернётся мост в тот же миг.';
    W.onStart=()=>intro('все четверо — на тот берег · крен держите: Потап за троих весит');}
  /* ---------- Добрыня: семерых одним махом ---------- */
  if(kind==='d'){const C=new V3(0,0,-8),R=10;ground(-16,16,-22,8,0);for(let i=0;i<24;i++){const a=i/24*Math.PI*2;addMesh(new THREE.CylinderGeometry(0.16,0.2,1.6,6),M(0x7a5634),C.x+Math.cos(a)*R,0.8,C.z+Math.sin(a)*R);}
    const WAVES=[[['morok',-3,-12],['leshonok',3,-12]],[['kiki',-5,-6],['rak',5,-6]],[['thread',0,-14],['vorona',-4,-10],['stump',4,-9]]];let wi=-1,list=[];
    function wave(){wi++;if(wi>=WAVES.length){done();return;}list=WAVES[wi].map(([k,x,z])=>makeFoe(k,x,z,{leash:9}));banner('Волна '+(wi+1)+' из 3','#ffd76a',1.6,'мороков: '+list.length);}
    F.extra=()=>'распутано: '+(W.enemies.filter(e=>!e.alive).length)+' / 7';
    W.updates.push(dt=>{if(F.stage==='run'){if(wi<0)wave();else if(list.every(e=>!e.alive))wave();}});
    W.spawns=[[new V3(-2,0,-1),new V3(-4,0,0)],[new V3(2,0,-1),new V3(4,0,0)]];W.clampR={x:C.x,z:C.z,r:R-0.6};
    for(let pi=0;pi<2;pi++)W.objectives[pi]=[O(()=>'Семерых одним махом! Щитом '+K(pi,'guard')+' закрывайся в самый последний миг пред ударом —<br>Так быстрее всего, не даром.',()=>F.stage==='done',()=>W.enemies.filter(e=>e.alive).map(e=>e.g)),O('…',()=>false,()=>[])];
    W.pauseLine='Застава · Добрыня Никитич. Три волны, семь мороков — на время.<br>Отбив в самый миг угольки быстрее гасит — вот и всё умение.';
    W.onStart=()=>intro('три волны, семь мороков · «Одним махом» — быстрей всего');}
  /* ---------- Алёша: колокольная перекличка ---------- */
  if(kind==='a'){ground(-16,16,-24,8,0);tower(-7,-16);tower(7,-16);
    const BP=[[-8,-6,0],[-3,-9,0],[3,-9,0],[8,-6,0],[-7,-16,5.4],[7,-16,5.4]];const NOTE=[67,69,71,72,74,76];
    const BELLS=BP.map(([x,z,y],i)=>{const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);if(!y){addMesh(new THREE.CylinderGeometry(0.1,0.12,2.6,6),M(0x6b4a2b),0,1.3,0,g);addMesh(new THREE.BoxGeometry(1,0.1,0.1),M(0x6b4a2b),0,2.6,0,g);}
      const bm=M(0xb89a50,{emissive:0xffc040,emissiveIntensity:0});const piv=new THREE.Group();piv.position.set(0,y?0.6:2.5,0);g.add(piv);addMesh(new THREE.ConeGeometry(y?0.55:0.4,y?0.8:0.6,12),bm,0,-0.35,0,piv);
      const dg=makeDigit(0.4,MB(0xffd23a));dg.position.set(0,y?1.8:3.4,0);g.add(dg);dg.visible=false;if(!y)W.cyls.push({x,z,r:0.3,miny:-1,maxy:2.7,on:true});
      const b={i,g,piv,bm,dg,pos:new V3(x,(y||0)+(y?0.5:2.2),z),high:!!y,swing:0};return b;});
    const SEQ=[];for(let i=0;i<6;i++)SEQ.push(Math.floor(rand(0,6)));const LENS=[3,4,5,6];let round=0,shown=-1,input=[],state='show',st=0;
    function ring(b,byPlayer){b.swing=1;b.bm.emissiveIntensity=1.2;gusli(NOTE[b.i],0,0.2);tone(mf(NOTE[b.i]+12),0.5,'sine',0.08);later(0.35,()=>{b.bm.emissiveIntensity=0;});
      if(!byPlayer||state!=='input')return;const want=SEQ[input.length];if(b.i===want){input.push(b.i);floatText(b.pos.clone().add(new V3(0,1,0)),(input.length)+'','#ffe36b');
        if(input.length>=LENS[round]){round++;SFX.ok();if(round>=LENS.length){done();return;}banner('Перекличка '+round+' из 4 — верно, верно!','#ffd76a',1.6,'дальше — длиннее');state='wait';st=0;}}
      else{SFX.miss();F.pen=(F.pen||0)+5;F.t+=5;banner('Сбились! +5 с','#ffd0d0',1.6,'колокола послушайте ещё раз');state='wait';st=0;}}
    W.marks.push(...BELLS.filter(b=>b.high).map(b=>({pos:b.pos,active:()=>state==='input',onHit:()=>ring(b,true)})));
    W.onAttack=(pi,h)=>{if(state!=='input')return;const b=BELLS.find(q=>!q.high&&hd(q.pos,h.pos)<2.2);if(b)ring(b,true);};
    W.updates.push(dt=>{BELLS.forEach(b=>{b.swing=Math.max(0,b.swing-dt*1.5);b.piv.rotation.z=Math.sin(G.time*14)*0.5*b.swing;});if(F.stage!=='run')return;st+=dt;
      if(state==='wait'&&st>1.4){state='show';st=0;shown=-1;input=[];}
      if(state==='show'){const k=Math.floor(st/0.75);if(k!==shown&&k<LENS[round]){shown=k;ring(BELLS[SEQ[k]],false);BELLS.forEach(b=>{b.dg.visible=false;});BELLS[SEQ[k]].dg.visible=true;setDigit(BELLS[SEQ[k]].dg,k+1);}
        if(st>LENS[round]*0.75+0.4){state='input';BELLS.forEach(b=>{b.dg.visible=false;});banner('Ваша очередь!','#ffe36b',1.2,'низкий колокол — ударь '+K(0,'attack')+', на башне — из рогатки Прошки стрельни '+K(0,'skill'));}}});
    W.ZA={BELLS,SEQ,LENS,get state(){return state;},get round(){return round;},get input(){return input;}};
    F.extra=()=>'перекличка '+Math.min(4,round+1)+' / 4'+(F.pen?' · штраф '+F.pen+' с':'');
    W.spawns=[[new V3(-2,0,2),new V3(-4,0,3)],[new V3(2,0,2),new V3(4,0,3)]];
    for(const pi of[0,1])prompt(pi,'attack',()=>headOf(active(pi)),()=>state==='input'&&BELLS.some(q=>!q.high&&hd(q.pos,active(pi).pos)<2.2),'позвонить');
    prompt(0,'skill',()=>headOf(T.proshka),()=>state==='input'&&T.proshka.active,'рогатка — в колокол на башне');
    for(let pi=0;pi<2;pi++)W.objectives[pi]=[O(()=>'Колокола по очереди звонят. Запомните порядок и повторите.<br>Низкий колокол — ударь '+K(pi,'attack')+', на башне — из рогатки Прошки стрельните.',()=>F.stage==='done',()=>BELLS.map(b=>b.g)),O('…',()=>false,()=>[])];
    W.pauseLine='Застава · Алёша Попович. Колокола по порядку звонят — повторите:<br>Низкие — ударом, на башнях — рогаткой. Ошибка — пять секунд штрафа, учтите.';
    W.onStart=()=>intro('запомните порядок и повторите · четыре переклички подряд');}
  W.startAct=[0,0];flushDecor();}

