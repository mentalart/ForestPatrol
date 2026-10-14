// ---- продолжение late_99e_k21.js (внутри build21, часть 3к): спящий Китеж за воротами — слобода, Сонные ворота, звонница без языка — части склеиваются сборкой по имени файла ----
  /* ---------- К. спящий Китеж (за воротами, z −360…−432): история 2-1 доходит до конца и задаёт цель всего мира ---------- */
  // Город тот же, что проснётся в 2-5: белые терема, луковки тёмные. Ролик у ворот — «Китеж спит» (тихо, ни звона, ни огонька).
  // Слобода: у каждого спящего горожанина — ракушка; сыграл гусли — проснулся, окно загорелось, нотка напева Садко летит к Сонным
  // воротам. Дед и бабка через улицу просыпаются только разом (двое играют, или один играет и меняет героя — оставленный доигрывает).
  // Четыре нотки — ворота поднимаются. На площади — главная звонница: колодец перед ней — прилив поднимает на площадку, там звено
  // и колокол БЕЗ ЯЗЫКА. Ролик «Колокол без языка»: Садко на осетре — язык сорвал Водяной, а Рыба-кит проглотил; на осетре — к киту (2-2).
  const CZ=-360,CE=-432;
  ground(-11,11,CE,CZ,0,pave);
  const roofM=M(0x2f5a66),winM=M(0x1c2a33),benchM=M(0x8a6a4a);
  const house=(x0,x1,z0,z1,h,dome)=>{const m=W.group.children.length;box(x0,x1,0,h,z0,z1,wallM,{occ:true});
    const cx=(x0+x1)/2,cz=(z0+z1)/2,w=x1-x0,d=z1-z0,rg=new THREE.ConeGeometry(Math.max(w,d)*0.72,1.6,4);rg.rotateY(Math.PI/4);const r=addMesh(rg,roofM,cx,h+0.8,cz);r.scale.set(w/Math.max(w,d),1,d/Math.max(w,d));
    const sx=cx<0?x1+0.02:x0-0.02;for(const wz of[cz-d*0.25,cz+d*0.25]){const wm=addMesh(new THREE.BoxGeometry(0.06,0.9,0.7),winM,sx,2.5,wz);wm.castShadow=false;}   // тёмные окна на улицу
    if(dome)kdome(cx,cz,0.4,h);fadeable(since(m));};
  // слобода: по четыре терема с каждой стороны улицы, между ними — проулки
  const HZ=[[-362,-369],[-371,-378.5],[-380.5,-388],[-390,-396]];
  HZ.forEach(([a,b],i)=>{house(-11,-6.4,b,a,[4.2,3.8,4.6,4.0][i],i%2===0);house(6.4,11,b,a,[3.9,4.5,3.8,4.4][i],i%2===1);});
  for(const sd of[-1,1])for(const z of[-370,-379.5,-389])addMesh(new THREE.CylinderGeometry(0.12,0.14,2.6,6),M(0x6a5a40),sd*6.0,1.3,z);   // столбы-фонари в проулках (потухшие)
  // спящие горожане: сидят на лавках у дверей, голова набок, над ними «з-з-з»
  const ZZ_TEX=k21Label('з-з-з',0xcfe8ff);
  function sleeper21(x,z,side,o){o=o||{};const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=side<0?Math.PI/2:-Math.PI/2;W.group.add(g);
    const shirt=M(o.shirt||0x3a7ac0),skin=M(0xf0c8a0),dk=M(0x3a2a20);
    addMesh(new THREE.BoxGeometry(1.5,0.12,0.5),benchM,0,0.55,-0.2,g);for(const sx of[-0.6,0.6])addMesh(new THREE.BoxGeometry(0.1,0.55,0.4),benchM,sx,0.27,-0.2,g);
    const body=new THREE.Group();body.position.y=0.6;g.add(body);addMesh(new THREE.ConeGeometry(0.4,1.0,8),shirt,0,0.45,0,body);
    for(const sx of[-0.14,0.14]){const l=addMesh(new THREE.CylinderGeometry(0.08,0.08,0.5,5),dk,sx,0.02,0.22,body);l.rotation.x=Math.PI/2;addMesh(new THREE.CylinderGeometry(0.08,0.08,0.5,5),dk,sx,-0.25,0.45,body);}
    const head=new THREE.Group();head.position.y=1.12;body.add(head);addMesh(new THREE.SphereGeometry(0.27,10,8),skin,0,0,0,head);
    const eyes=[-1,1].map(sx=>addMesh(new THREE.BoxGeometry(0.08,0.02,0.02),MAT.dark,sx*0.1,0.03,0.25,head));   // глаза закрыты — чёрточки
    if(o.kind==='babka'){addMesh(new THREE.SphereGeometry(0.3,10,8,0,Math.PI*2,0,Math.PI/2),M(0xd04a6a),0,0.02,-0.02,head);addMesh(new THREE.ConeGeometry(0.12,0.2,4),M(0xd04a6a),0,-0.12,-0.28,head).rotation.x=0.4;}
    else{const cap=new THREE.Group();cap.position.set(0,0.18,0);head.add(cap);const c=addMesh(new THREE.ConeGeometry(0.24,0.7,10),M(o.cap||0xc84a3a),0,0.3,-0.1,cap);c.rotation.x=-0.7;
      addMesh(new THREE.SphereGeometry(0.08,8,6),M(0xf4ecd8),0,0.48,-0.42,cap);
      if(o.kind==='ded'){const bd=new THREE.ConeGeometry(0.2,0.5,8);bd.rotateX(Math.PI);addMesh(bd,M(0xe8e4dc),0,-0.3,0.14,head);}}
    const arms=[];for(const sx of[-1,1]){const a=new THREE.Group();a.position.set(sx*0.32,0.78,0);body.add(a);addMesh(new THREE.CylinderGeometry(0.07,0.07,0.5,5),shirt,0,-0.24,0.05,a);arms.push(a);}
    const zz=new THREE.Sprite(new THREE.SpriteMaterial({map:ZZ_TEX,transparent:true,depthWrite:false}));zz.scale.set(1.1,0.37,1);zz.raycast=()=>{};zz.position.set(0,2.4,0);g.add(zz);
    g.traverse(c=>{c.userData.noBatch=true;});W.cyls.push({x,z,r:0.55,miny:-1,maxy:1.8,on:true});
    return {g,body,head,eyes,arms,zz,ph:rand(0,6),awake:0};}
  // окно над спящим: гаснет и загорается вместе с ним
  const litWin=(x,z)=>{const m=M(0x1c2a33,{emissive:0xffc040,emissiveIntensity:0});const w=addMesh(new THREE.BoxGeometry(0.07,1.0,0.8),m,x,2.6,z);w.castShadow=false;w.userData.noBatch=true;return m;};
  const SAY_W=['Ох… звонят, что ли?','Кто тут на гуслях играет?','Слышу, бабка, слышу!','Дед, проснись — напев!'];
  const SLP=[{x:-5.6,z:-365.5,side:-1,shirt:0x3a7ac0,cap:0xc84a3a},{x:5.6,z:-374.5,side:1,shirt:0x4a9a4a,cap:0x3a5ac8},
    {x:-5.6,z:-384,side:-1,pair:true,kind:'ded',shirt:0x8a5a3a},{x:5.6,z:-384,side:1,pair:true,kind:'babka',shirt:0xe0c040}].map((q,i)=>{
    const m=sleeper21(q.x,q.z,q.side,q),win=litWin(q.side*6.36,q.z-1.6);
    const ref={hum:0,off:false,ring(h){const was=this.hum;this.hum=6;if(was<=0)[67,71].forEach((n,k)=>gusli(n+(i%2?5:0),k*0.1,0.12));if(!q.pair)wake(S,false);}};
    const sh=kwShell('dance',q.side*3.4,q.z,0,ref,{say:q.pair?(q.kind==='ded'?'Дед, вставай!':'Бабушка, вставай!'):'Просыпайся!',r:2.0});sh.pnote='сыграй — разбуди';
    const S=Object.assign(q,{i,m,win,ref,sh,woke:false});return S;});
  // Сонные ворота: золотая решётка, четыре нотки-лампы — по одной на каждого разбуженного
  const sgate=new THREE.Group();W.group.add(sgate);for(let x=-10.6;x<=10.6;x+=0.7)addMesh(new THREE.BoxGeometry(0.12,4.2,0.12),goldM,x,2.1,-398,sgate);
  for(const y of[1.2,2.6,4.0])addMesh(new THREE.BoxGeometry(22,0.14,0.14),goldM,0,y,-398,sgate);
  const SLAMP=[-4.5,-1.5,1.5,4.5].map((x,i)=>{const m=M([0xffd23a,0x5ab8ff,0xff9ad0,0x9affb0][i],{emissive:[0xffd23a,0x5ab8ff,0xff9ad0,0x9affb0][i],emissiveIntensity:0.05});
    const s=addMesh(new THREE.SphereGeometry(0.34,12,10),m,x,3.3,-397.8,sgate);return {m,s,x,lit:0};});
  sgate.traverse(c=>{c.userData.noBatch=true;});const sgateCol=colBox(-11,11,0,4.4,-398.3,-397.7,false);
  function wakeNote(S){const L=SLAMP[S.i],s=new THREE.Sprite(new THREE.SpriteMaterial({map:KW_NOTE_TEX,color:[0xffd23a,0x5ab8ff,0xff9ad0,0x9affb0][S.i],transparent:true,depthWrite:false}));
    s.scale.setScalar(0.7);s.raycast=()=>{};const a=new V3(S.x,2.6,S.z),to=new V3(L.x,3.3,-397.6);s.position.copy(a);W.group.add(s);
    anim(1.4,k=>{s.position.lerpVectors(a,to,smooth(k));s.position.y+=Math.sin(k*Math.PI)*1.6;if(k>=1){W.group.remove(s);L.lit=1;burst(to,0xffe08a,10,3);gusli(FIN.SADKO_TUNE[S.i],0,0.2);}});}
  function wake(S,quiet){if(S.woke)return;S.woke=true;S.ref.off=true;S.m.awake=0.01;F.woke=(F.woke||0)+1;
    if(quiet){S.m.awake=1;S.win.emissiveIntensity=1.1;SLAMP[S.i].lit=1;}
    else{SFX.ok();burst(new V3(S.x,1.8,S.z),0xffe08a,14,3);floatText(new V3(S.x,2.6,S.z),SAY_W[S.i],'#ffe9a0');anim(1.2,k=>{S.win.emissiveIntensity=1.1*k;});later(0.5,()=>wakeNote(S));}
    if(F.woke>=4&&!F.sleepGate)later(quiet?0:2.2,()=>openSleepGate(quiet));}
  function openSleepGate(quiet){if(F.sleepGate)return;F.sleepGate=true;sgateCol.on=false;
    if(quiet){sgate.position.y=4.6;return;}
    SFX.gate();[67,71,74,72].forEach((m,i)=>later(i*0.3,()=>gusli(m,0,0.24)));later(1.3,()=>{gusli(67,0,0.2);gusli(74,0,0.2);});
    anim(2.2,k=>{sgate.position.y=4.6*smooth(k);});banner('Слобода проснулась!','#ffd76a',2.6,'Сонные ворота допели напев — дальше, к звоннице');}
  W.updates.push(dt=>{
    for(const S of SLP){const m=S.m;S.ref.hum=Math.max(0,S.ref.hum-dt);
      if(!S.woke){m.head.rotation.z=0.45+Math.sin(G.time*1.1+m.ph)*0.06;m.head.rotation.x=0.25;m.body.scale.y=1+Math.sin(G.time*1.6+m.ph)*0.025;   // сопит
        m.zz.position.y=2.3+((G.time*0.4+m.ph)%1)*0.5;m.zz.material.opacity=0.85-((G.time*0.4+m.ph)%1)*0.6;continue;}
      if(m.awake<1){m.awake=Math.min(1,m.awake+dt/1.1);const k=smooth(m.awake);m.head.rotation.z=0.45*(1-k);m.head.rotation.x=0.25*(1-k);m.zz.visible=k<0.5;
        m.arms.forEach((a,j)=>{a.rotation.z=(j?-1:1)*Math.sin(k*Math.PI)*2.4;});for(const e of m.eyes)e.scale.set(k>0.6?0.5:1,k>0.6?5:1,1);}
      else{m.zz.visible=false;m.head.rotation.y=Math.sin(G.time*0.7+m.ph)*0.35;}}
    for(const L of SLAMP)L.m.emissiveIntensity=L.lit?0.8+0.3*Math.sin(G.time*4+L.x):0.05;
    // дед и бабка — только разом: оба напева гудят одновременно
    const P=SLP.filter(S=>S.pair&&!S.woke);
    if(P.length===2){if(P[0].ref.hum>0&&P[1].ref.hum>0){wake(P[0],false);later(0.4,()=>wake(P[1],false));}
      else if(P.some(S=>S.ref.hum>0)){F.pairNagT=(F.pairNagT||0)-dt;if(F.pairNagT<=0){F.pairNagT=4.5;const Q=P.find(S=>S.ref.hum<=0);floatText(new V3(Q.x,2.8,Q.z),'Хр-р… Крепко спит — будите разом!','#cfe8ff');
        if(!F.pairTold){F.pairTold=true;for(const p of[0,1])tip(p,'Дед и бабка просыпаются только разом: сыграйте оба.<br>Один? Сыграй и смени героя — оставленный доиграет.',4.2);}}}}});
  bell(-2.5,-363);nutItem(-8.7,0.6,-379.5);
  /* ---------- главная звонница: колодец-лифт перед ней, площадка с колоколом без языка ---------- */
  const TW={z0:-414,z1:-424,top:6.0};
  {const m=W.group.children.length;box(-4.5,4.5,0,TW.top,TW.z1,TW.z0,stone,{occ:true});
    box(-3.1,-2.7,0,6.6,TW.z0,-408.4,stone,{occ:false});box(2.7,3.1,0,6.6,TW.z0,-408.4,stone,{occ:false});   // стенки колодца, спереди открыт
    for(const[a,b,c,d]of[[-4.5,4.5,TW.z1,TW.z1+0.4],[-4.5,-4.1,TW.z1,TW.z0],[4.1,4.5,TW.z1,TW.z0]])box(a,b,TW.top,TW.top+0.6,c,d,goldM,{occ:false});   // перила площадки
    fadeable(since(m));}
  const pillar=(x,z)=>{addMesh(new THREE.CylinderGeometry(0.32,0.36,5.4,10),wallM,x,TW.top+2.7,z);W.cyls.push({x,z,r:0.36,miny:TW.top-0.5,maxy:TW.top+5.4,on:true});};
  for(const[x,z]of[[-4.0,-414.6],[4.0,-414.6],[-4.0,-423.4],[4.0,-423.4],[-4.0,-419],[4.0,-419]])pillar(x,z);
  box(-4.7,4.7,11.4,12.0,-424.3,-413.7,wallM,{solid:false});addMesh(new THREE.BoxGeometry(8.4,0.3,0.3),M(0x6a4a2a),0,11.2,-419);   // кровля и балка
  const towerDome=M(0x4a3a18,{emissive:0xffb000,emissiveIntensity:0});
  {const on=addMesh(new THREE.SphereGeometry(2.4,16,12),towerDome,0,13.9,-419);on.scale.set(1,1.2,1);addMesh(new THREE.ConeGeometry(0.9,2.2,12),towerDome,0,16.7,-419);addMesh(new THREE.BoxGeometry(0.1,1.2,0.1),towerDome,0,18.2,-419);}
  // колокол: юбка, макушка, ухо на балке; внутри — обрывок ремня, где висел язык
  const BELL=new THREE.Group();BELL.position.set(0,10.5,-419);W.group.add(BELL);
  {const bm=M(0xb08a3a,{emissive:0x403010,emissiveIntensity:0.3,side:THREE.DoubleSide});const sk=new THREE.Mesh(new THREE.CylinderGeometry(0.9,1.7,2.4,24,1,true),bm);sk.position.y=-1.6;BELL.add(sk);
    const cap=new THREE.Mesh(new THREE.SphereGeometry(0.92,20,10,0,Math.PI*2,0,Math.PI/2),bm);cap.position.y=-0.4;BELL.add(cap);addMesh(new THREE.TorusGeometry(1.72,0.1,6,24),bm,0,-2.8,0,BELL).rotation.x=Math.PI/2;
    addMesh(new THREE.TorusGeometry(0.25,0.07,6,12),bm,0,0.6,0,BELL);const strap=addMesh(new THREE.CylinderGeometry(0.06,0.04,0.55,6),M(0x5a3a1a),0,-0.75,0,BELL);strap.rotation.z=0.25;}
  BELL.traverse(c=>{c.userData.noBatch=true;});
  const twz=waterZone(-2.7,2.7,TW.z0,-408.4,0,6.6,{shell:{x:-2.0,z:-408.9,y:0}});
  bell(0,-401);nutItem(3.4,6.6,-422.6);
  // тень Рыбы-кита высоко над городом: туша, хвост, плавники — тёмный силуэт против света сверху
  const WHALE=new THREE.Group();WHALE.position.set(20,30,-436);WHALE.rotation.y=0.5;W.group.add(WHALE);
  {const sm=MB(0x0c2230,{transparent:true,opacity:0.55,depthWrite:false,fog:false});const b=new THREE.Mesh(new THREE.SphereGeometry(1,20,12),sm);b.scale.set(7,4.5,24);WHALE.add(b);
    for(const s of[-1,1]){const fl=new THREE.Mesh(new THREE.ConeGeometry(3.2,11,4),sm);fl.scale.set(1,1,0.15);fl.rotation.set(Math.PI/2,0,s*1.2);fl.position.set(s*9,-1.5,-27);WHALE.add(fl);
      const fn=new THREE.Mesh(new THREE.ConeGeometry(1.6,7,4),sm);fn.scale.set(1,1,0.15);fn.rotation.set(1.2,0,s*1.6);fn.position.set(s*7,-2.5,6);WHALE.add(fn);}
    WHALE.traverse(c=>{c.userData.noBatch=true;c.castShadow=false;});}
  W.updates.push(dt=>{WHALE.position.x=20+Math.sin(G.time*0.05)*3;WHALE.rotation.z=Math.sin(G.time*0.3)*0.03;BELL.rotation.z=Math.sin(G.time*0.6)*0.012;
    if(!F.towerSeen&&!F.out&&!G.cine&&F.sleepGate&&(endLink.taken||[0,1].some(pi=>{const h=active(pi);return h.pos.y>TW.top-0.5&&h.pos.z<TW.z0-0.3&&Math.abs(h.pos.x)<4.5;}))){F.towerSeen=true;towerScene();}});
  W.tipZones.push({cond:(pi,h)=>h.pos.z<-401&&h.pos.z>TW.z0-0.5&&Math.abs(h.pos.x)<2.7&&twz.state==='low'&&h.pos.y<1,text:pi=>'Колодец у звонницы: прилив '+K(pi,'item')+' — вода поднимет к колоколу.'});
  for(const pi of[0,1]){const h=()=>active(pi);prompt(pi,'item',()=>headOf(h()),()=>inZone(twz,h(),0)&&twz.state==='low'&&h().pos.y<1,'прилив — к колоколу');}
  // ---------- ролик у ворот: Китеж спит ----------
  // шот ручной постановки — как KS() из late_86b_kino.js (имя KS внутри build21 занято ростками сада)
  const KSH=(t,p,l,o)=>{o=o||{};return {t,p,l,p2:o.p2,l2:o.l2,dur:o.dur,cut:o.cut,xk:o};};
  function gateScene(){const T=HERO,E=CINE.E,fx=(h,p)=>Math.atan2(p.x-h.pos.x,p.z-h.pos.z);
    const row=[[-2.6,-348.6],[-0.9,-349.2],[0.9,-349.2],[2.6,-348.6]],from=HEROES.map(h=>h.pos.clone()),ARCH=new V3(0,1.4,-356);
    play({dur:11.6,fov:50,kino:true,mood:['#7aa8d8',0.12],
      shots:[KSH(0,[0,4.6,-342.6],[0,2.6,-372],{p2:[0,3.0,-345.6],l2:[0,2.4,-376],dur:3.4,move:'none'}),        // 1 общий из-за спин: водоросли ушли — за аркой тёмный город
        KSH(3.4,[0.6,1.9,-353.2],[0,1.3,-349],{move:'truck',amp:0.5}),                                             // 2 обратный: лица героев — тихо, ни огонька
        KSH(6.0,[-0.9,1.3,-351],[-0.9,1.1,-349.2],{trk:KC.fcam(T.proshka,1.9,0.35,0.05,0.12)}),                   // 3 Прошка крупно: «Эй, Китеж! Подъём!»
        KSH(8.6,[0,4.2,-352],[0,1.2,-368],{p2:[0,8.5,-358],l2:[0,0.8,-376],dur:3,move:'none'})],                  // 4 кран над аркой: спящие на лавках, «з-з-з»
      says:[[0.3,3.0,null,'<i>Расступились водоросли — а за воротами спит Китеж-град.</i>',true],[3.5,2.4,'zven','Тихо-то как… Ни звона, ни огонька.'],
        [6.1,2.4,'proshka','Эй, Китеж! Подъём! …Спят, что ли?'],[8.8,2.7,'zven','Напев Садко помните? Им и будите!']],
      events:[{t:0,fn:()=>{F.gateOpen=true;}}],
      cues:[[0.2,()=>SFX.gate()],[1.6,()=>CINE.rimPulse(0.4)],[3.6,KC.all('surprise',0.08)],[6.3,()=>CINE.punch(-3)],[6.4,KC.emo('proshka','cheer')],
        [7.6,()=>{KSND.puff(0);floatText(new V3(-5.6,2.6,-365.5),'Хр-р-р…','#cfe8ff');}],[8.0,KC.emo('proshka','droop')],[8.1,KC.emo('yosha','laugh')],
        [9.4,()=>{FIN.SADKO_TUNE.forEach((m,i)=>later(i*0.45,()=>gusli(m,0,0.14)));}],[10.6,KC.all('nod',0.1)]],
      tick:(t)=>{HEROES.forEach((h,i)=>{const k=E.inOutCubic(clamp(t/1.2,0,1)),s=row[i];h.pos.set(lerp(from[i].x,s[0],k),lerp(from[i].y,0,k),lerp(from[i].z,s[1],k));h.vel.set(0,0,0);
        h.face=t>=7.9&&t<8.6&&h.kind!=='proshka'?fx(h,T.proshka.pos):fx(h,ARCH);});},
      end:()=>{HEROES.forEach((h,i)=>{placeOnGround(h,row[i][0],row[i][1],0);h.face=Math.PI;});snapCams();}});}
  // ---------- финал: колокол без языка, Садко на осетре, к киту ----------
  function towerScene(){const T=HERO,E=CINE.E,fx=(h,p)=>Math.atan2(p.x-h.pos.x,p.z-h.pos.z),S=sturg,Y=TW.top;
    const spots=[[-2.4,-416.4],[-0.8,-416.8],[0.8,-416.8],[2.4,-416.4]],from=HEROES.map(h=>h.pos.clone()),BP=new V3(0,8.4,-419);
    const sad=makeSadko();sad.drop.visible=false;sad.g.visible=false;
    const HOV=new V3(8.6,5.0,-419),P0=new V3(28,15,-396),UP=new V3(16,22,-438);
    const seat=[[-0.3,1.0,0.9],[0.3,1.0,-0.4],[-0.3,1.0,-1.7],[0.3,1.0,-3.0]],SAD_L=new V3(0,1.0,2.6);
    const fishAt=t=>{if(t<6.8)return null;if(t<9.0){const k=E.inOutCubic((t-6.8)/2.2);const p=new V3().lerpVectors(P0,HOV,k);p.y+=Math.sin(k*Math.PI)*2.2;return p;}
      if(t<20.9)return HOV.clone().add(new V3(0,Math.sin(t*1.3)*0.12,0));const k=E.inOutSine(clamp((t-20.9)/3.1,0,1));return new V3().lerpVectors(HOV,UP,k);};
    const heroAt=(i,t)=>{const s=spots[i],j0=20.9+i*0.12;const ground=new V3(s[0],Y,s[1]);if(t<j0)return ground;const back=S.g.localToWorld(new V3(...seat[i]));
      if(t>=j0+0.6)return back;const k=E.outBack(clamp((t-j0)/0.6,0,1)),p=new V3().lerpVectors(ground,back,Math.min(1,k));p.y+=Math.sin(Math.min(1,k)*Math.PI)*1.4;return p;};
    play({dur:24.2,fov:50,kino:true,mood:['#8ab0e0',0.12],
      shots:[KSH(0,[1.4,2.0,-401.5],[0,9.5,-419],{p2:[0.4,4.4,-404],l2:[0,8.6,-419],dur:2.8,move:'none'}),            // 1 общий снизу: звонница, герои наверху, колокол тёмный
        KSH(2.8,[0.35,7.5,-418.3],[0,10,-419.3],{move:'push',amp:0.4}),                                                  // 2 деталь: в колоколе пусто, обрывок ремня
        KSH(4.8,[-0.8,Y+1.3,-418],[-0.8,Y+1.1,-416.8],{trk:KC.fcam(T.pelageya,1.6,0.3,0.05,0.15)}),                       // 3 Пелагея крупно: «Бом…» — тишина
        KSH(6.8,[-3.2,Y+3.6,-410.5],[8,Y,-416],{trk:KC.look(()=>S.g.position,0.75),move:'none'}),                          // 4 общий: осётр с Садко подплывает
        KSH(9.0,[7,Y+1.6,-419],[8.6,Y+1.4,-419],{trk:KC.fcam(sad,2.6,-0.25,0.05,0.12)}),                                  // 5 Садко крупно: «Колокол без языка…»
        KSH(11.4,[7,Y+1.2,-419],[8.6,Y+1.4,-419],{trk:KC.fcam(sad,2.4,0.3,-0.15,0.2),tr:'whip'}),                       // 6 Садко ниже и ближе: «Водяной язык сорвал…»
        KSH(14.0,[7.5,Y-2,-404],[20,30,-436],{move:'push',amp:0.5}),                                                // 7 вверх: тень кита над Китежем
        KSH(16.4,[1.5,Y+1.4,-416.8],[0,Y+1.2,-416.8],{trk:KC.fcam(T.potap,2.0,0.25,0.05,0.12)}),                          // 8 Потап крупно: «Достанем!»
        KSH(18.4,[5,Y+2.2,-417],[8.6,Y+1.6,-419],{trk:KC.fcam(sad,3.8,0.45,0.35,0.1)}),                                   // 9 Садко средний: «Садитесь на осетра»
        KSH(20.6,[0.6,Y+3,-408],[8.6,Y+1,-419],{trk:KC.follow(()=>S.g.position,new V3(-8,3,11),new V3(0,0.8,0),1),move:'none'})],   // 10 общий за осетром: прыжок на спину и ввысь, к киту
      says:[[0.2,2.5,null,'<i>Наверху — главный колокол. А языка в нём нет.</i>',true],[2.9,1.8,'zven','Пусто! Чем же ему звонить?'],
        [5.0,1.6,'pelageya','Бом…'],[6.9,1.9,'zven','Глядите — Садко! На осетре!'],
        [9.2,2.1,'sadko','Колокол без языка — вот Китеж и спит.'],[11.5,2.4,'sadko','Водяной язык сорвал — а Рыба-кит проглотил.'],
        [14.1,2.2,'zven','Вон он, кит! Над самым Китежем плывёт!'],[16.5,1.8,'potap','Достанем. Как положено!'],[18.5,2.0,'sadko','Садитесь на осетра — к киту домчит!']],
      events:[{t:0,fn:()=>{if(!endLink.taken)takeItem(endLink,active(0));}}],
      cues:[[0.3,()=>CINE.rimPulse(0.4)],[3.0,()=>{KSND.icy(0);CINE.punch(-2);}],[3.4,KC.all('surprise',0.08)],
        [5.2,()=>{floatText(new V3(-0.8,Y+2.2,-417),'бом…','#e7c3ff');}],[6.3,KC.emo('pelageya','droop')],
        [6.9,()=>{SFX.whoosh();KSND.gust(0,1.6);}],[7.4,KC.all('surprise',0.07)],[8.6,()=>{for(let i=0;i<10;i++)burst(S.g.position.clone().add(new V3(rand(-2,2),rand(0,1),rand(-5,5))),0xcff8ff,2,2,0.6);}],
        [9.0,KC.all('joy',0.08)],[11.5,()=>{KSND.menace(0);CINE.dutch(0.1);}],[11.7,KC.all('fear',0.07)],
        [14.0,()=>CINE.dutch(0)],[14.1,()=>{KSND.thunder(0,false);CINE.dollyZoom(0.12,1.6,0.5);}],[16.6,KC.emo('potap','pride')],[16.9,KC.all('nod',0.09)],
        [19.0,()=>KSND.yay(0)],[21.0,KC.all('hop',0.12)],[21.6,()=>{SFX.splash();CINE.punch(-3);}],[22.2,()=>KSND.fanfare(0)]],
      tick:(t)=>{const fp=fishAt(t);S.g.visible=!!fp;sad.g.visible=!!fp;
        if(fp){S.g.position.copy(fp);let ry=-2.45;if(t>=7.6)ry=lerp(-2.45,-Math.PI,E.inOutCubic(clamp((t-7.6)/1.6,0,1)));S.g.rotation.set(t>20.9?0.45*E.inOutSine(clamp((t-20.9)/1.5,0,1)):0,ry,0);
          S.tail.rotation.y=Math.sin(G.time*(t>20.9?6:2.5))*0.35;S.g.updateMatrixWorld(true);
          sad.g.position.copy(S.g.localToWorld(SAD_L.clone()));sad.g.rotation.set(0,t<20.9?-Math.PI/2:-Math.PI,0);
          sad.arms.forEach((a,k)=>{a.rotation.x=t>9&&t<20.5?(k?0.4:-0.2)+Math.sin(t*3+k)*0.15:0;});sad.head.rotation.x=0.05;}
        HEROES.forEach((h,i)=>{if(t<1.2){const k=E.inOutCubic(clamp(t/1.2,0,1)),s=spots[i];h.pos.set(lerp(from[i].x,s[0],k),lerp(from[i].y,Y,k),lerp(from[i].z,s[1],k));}
          else h.pos.copy(heroAt(i,t));h.vel.set(0,0,0);
          h.face=t>=20.9+i*0.12?Math.PI:t>=6.8?fx(h,S.g.position):fx(h,BP);});},
      end:()=>{S.g.visible=false;W.group.remove(sad.g);F.out=true;finishLevel();}});}
  W.dbg21k=()=>({SLP,SLAMP,sgateCol,TW,twz,BELL,WHALE,wake,openSleepGate});
