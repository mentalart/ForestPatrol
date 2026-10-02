/* ============================== РЕЛИЗ final06 · 2-5 «КИТЕЖ ЗВОНИТ» — ВДВОЕ ДЛИННЕЕ ============================== */
// Начало прежнее: Голосовая звонница и колодец (Пелагея теряет голос), нижний ярус, двойная звонница. Новое:
//   площадка над провалом — третья струна гуслей «Звон» (ракушка с колокольчиком: колокол гудит — невидимый Китеж проступает);
//   «Невидимый Китеж» — мосты-призраки над бездной: колокол на этом краю кажет ДРУГОЙ мост; звенит недолго — один звонит, другой идёт;
//   «Светлояр» — камни через озеро невидимы, их кажет отражение в воде, пока кто-то стоит на Феврониином камне у берега;
//   «Напев Садко» — четыре колокола за решёткой (по два у каждого), напев из 2-1 по нотам на воротах: слева, справа, слева, справа;
//   главный колокол — прежняя стычка; Потап вешает язык колокола, что достали из кита в 2-4; качают вчетвером; на «Бом» Китеж
//   выходит из воды — подводный вид гаснет. Звеньев столько же (4), орешков 8.
{const L=LEVELS.find(l=>l.id==='2-5');if(L)L.nuts=8;}
build25=function(){
  W.zvenAway=true;W.world=2;W.bubbles=true;setTheme('kitezh');W.name='2-5 · «Китеж звонит»';W.sub='Подводный Китеж · колокола, мосты-призраки, Светлояр, напев Садко';W.camX=9;const F=W.flags;F.voice='wait';F.bells=0;
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.gusli=true;W.fallY=-16;W.wideShield=true;
  kitezhDecor(-168,10,9);
  const stone=M(0xb8b4a4),pave=M(0x9aa094),wallM=M(0xe0d6c0),T=HERO;
  wall(-9.2,-9,-166,8);wall(9,9.2,-166,8);wall(-9.2,9.2,8,8.2);wall(-9.2,9.2,-166.2,-166);
  const Z=makeZven();W.zven=Z;Z.pos.set(0,2.4,2);
  // растущий город: ступени поднимаются из-под мостовой, пока по ним бегут
  function riseStairs(x0,x1,z0,y0,y1,n){const steps=[];const dz=0.42,dy=(y1-y0)/n;for(let i=0;i<n;i++){const zz=z0-dz*i,col=colBox(x0,x1,y0-4,y0,zz-dz,zz,false);const m=addMesh(new THREE.BoxGeometry(x1-x0,1,dz),stone,(x0+x1)/2,y0-0.5,zz-dz/2);
      steps.push({col,m,top:y0+dy*(i+1)});}
    return {steps,risen:false,rise(){if(this.risen)return;this.risen=true;SFX.grow();shakeAll(0.05,1.2);banner('Китеж приподнимается!','#ffd76a',2.2,'бегом вверх — город прямо под ногами растёт');
      steps.forEach((s,i)=>later(i*0.12,()=>anim(1.6,k=>{const y=lerp(y0,s.top,smooth(k));s.col.maxy=y;s.m.position.y=y-0.5;})));}};}
  /* ---------- 0. площадь над Великим колодцем ---------- */
  ground(-9,9,-8,8,0,pave);for(const x of[-7.6,7.6]){addMesh(new THREE.CylinderGeometry(0.4,0.45,4,10),stone,x,2,-6.6);W.cyls.push({x,z:-6.6,r:0.45,miny:-1,maxy:4,on:true});}
  const nut1=nutItem(8.2,0.6,5.2);bell(-3,4);
  /* ---------- 1. Великий колодец: Голосовая звонница на островке ---------- */
  ground(-9,9,-26,-8,-9,M(0x3e5250));
  for(const sd of[-1,1])for(let y=-8;y<0;y+=2.6)for(let z=-10;z>-25;z-=3.4){addMesh(new THREE.BoxGeometry(0.1,1.2,0.8),M(0x24343a),sd*8.95,y+0.9,z);addMesh(new THREE.BoxGeometry(0.12,0.12,1.1),M(0xd8b060),sd*8.94,y+1.6,z);}
  for(let i=0;i<14;i++)seaweed(rand(-8.5,8.5),rand(-25.5,-8.5),rand(1.4,3.4),-9);
  addMesh(new THREE.CylinderGeometry(2.0,2.4,9.3,14),stone,0,-4.35,-17);W.cyls.push({x:0,z:-17,r:2.0,miny:-10,maxy:0.3,on:true});
  {const bm=W.group.children.length;for(const sd of[-1,1])addMesh(new THREE.BoxGeometry(0.3,4.6,0.3),wallM,sd*1.4,2.6,-17);addMesh(new THREE.BoxGeometry(3.4,0.4,0.5),wallM,0,5.0,-17);kdome(0,-17,0.28,5.2);fadeable(since(bm));}
  const vbell=bigBell(0,4.6,-17,0.9,{tongue:false,pitch:0.8});
  const swirl=new THREE.Mesh(new THREE.TorusGeometry(3,0.12,6,40),MB(0xcff8ff,{transparent:true,opacity:0.7}));swirl.rotation.x=Math.PI/2;swirl.position.set(0,0.1,-17);swirl.visible=false;W.group.add(swirl);
  const GW=waterZone(-9,9,-26,-8,-9,0,{start:'high',floor:-9,dur:3.6,shell:{x:-7.6,z:-7.4,y:0},curb:false});
  const linkV=linkItem(-2.8,-8.4,-24.0);linkV.locked=true;linkV.g.visible=false;const nut2=nutItem(-6,-8.4,-23.5);
  const grille=new THREE.Group();W.group.add(grille);for(let x=-8.6;x<9;x+=0.7)addMesh(new THREE.BoxGeometry(0.1,3.6,0.1),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.3}),x,1.2,-26.3,grille);
  addMesh(new THREE.BoxGeometry(18,0.14,0.14),M(COL.gold),0,2.9,-26.3,grille);const grCol=colBox(-9,9,-1,3,-26.5,-26.1);
  /* ---------- 2. нижний ярус: одиночные звонницы — по одной на каждую половину ---------- */
  ground(-9,9,-30,-26,0,pave);ground(-9,9,-50,-44,0,pave);ground(-1,1,-44,-30,0,pave);ground(-9,-1,-44,-30,-3,M(0x4a6660));ground(1,9,-44,-30,-3,M(0x4a6660));
  {const dm=W.group.children.length;box(-1,1,0,5,-48,-28,M(0xd0c8b0));fadeable(since(dm));}
  for(const sd of[-1,1])for(let i=0;i<9;i++){const x0=sd<0?-2.6:1,x1=sd<0?-1:2.6;box(x0,x1,-3,-0.333*(i+1),-30-0.8*(i+1),-30-0.8*i,stone,{occ:false});}
  const L1=waterZone(-9,-1,-44,-30,-3,1.5,{start:'high',floor:-3,shell:{x:-8,z:-29.3,y:0}});
  const R1=waterZone(1,9,-44,-30,-3,1.5,{start:'low',floor:-3,shell:{x:8,z:-29.3,y:0}});
  const frame=(x,z,top)=>{const fm=W.group.children.length;for(const d of[-1.3,1.3])addMesh(new THREE.BoxGeometry(0.25,top+3.2,0.25),wallM,x+d,top/2-1.4,z);addMesh(new THREE.BoxGeometry(3,0.3,0.4),wallM,x,top+0.2,z);fadeable(since(fm));};
  frame(-5.5,-37,0.4);const bL=bigBell(-5.5,0.2,-37,0.7,{pitch:1.3});const mL=markMesh(1);mL.position.set(-5.5,-1.35,-36.4);W.group.add(mL);
  frame(5.5,-37,4.1);const bR=bigBell(5.5,3.9,-37,0.7,{pitch:1.1});
  const linkL=linkItem(-7.6,-2.5,-41.8),linkR=linkItem(7.4,2.35,-41.2);const nut3=nutItem(-3.4,-2.5,-42.4),nut4=floatItem(nutItem(4,-2.6,-42.6),R1,0.4);
  const st1=riseStairs(-2,2,-50,0,3,10);
  /* ---------- 3. средний ярус: двойная звонница — подряд, за 5 секунд ---------- */
  ground(-9,9,-56,-54.2,3,pave);ground(-9,9,-72,-68,3,pave);ground(-1,1,-68,-56,3,pave);ground(-9,-1,-68,-56,0,M(0x4a6660));ground(1,9,-68,-56,0,M(0x4a6660));
  ground(-9,-2,-54.2,-50,3,pave);ground(2,9,-54.2,-50,3,pave);
  {const dm=W.group.children.length;box(-1,1,3,8,-68,-56,M(0xd0c8b0));fadeable(since(dm));}
  for(const sd of[-1,1])for(let i=0;i<9;i++){const x0=sd<0?-2.6:1,x1=sd<0?-1:2.6;box(x0,x1,0,3-0.333*(i+1),-56-0.8*(i+1),-56-0.8*i,stone,{occ:false});}
  const DL=waterZone(-9,-1,-68,-56,0,4.5,{start:'high',floor:0,shell:{x:-8,z:-55.3,y:3}});
  const DR=waterZone(1,9,-68,-56,0,4.5,{start:'low',floor:0,shell:{x:8,z:-55.3,y:3}});
  frame(-5.5,-62,3.4);const dbL=bigBell(-5.5,3.2,-62,0.7,{pitch:1.25});const mD=markMesh(1);mD.position.set(-5.5,1.65,-61.4);W.group.add(mD);
  frame(-(-5.5),-62,8.6);const dbR=bigBell(5.5,8.4,-62,0.7,{pitch:1.5});
  const st2=riseStairs(-2,2,-72,3,6,10);
  bell(-3,-27.6);bell(3,-27.6);bell(-4,-52,3);bell(4,-52,3);
  /* ---------- 4. площадка над провалом (закладка) ---------- */
  ground(-9,-2,-76.2,-72,6,pave);ground(2,9,-76.2,-72,6,pave);ground(-9,9,-78,-76.2,6,pave);bell(0,-75,6);
  /* ---------- 5. НОВОЕ «Невидимый Китеж»: мосты-призраки над провалом (Сказание о невидимом граде Китеже) ---------- */
  // Город невидим — проступает лишь под звон. Колокол на ЭТОМ краю звоном кажет ДРУГОЙ мост (правый), колокол за провалом —
  // левый. Звенит недолго — сам не добежишь: один звонит, другой идёт; за провалом — наоборот. Сменил героя сразу после звона —
  // оставленный доигрывает 15 с (так и в одиночку). Прошка может звонить из рогатки; Совиный взор кажет контур мостов.
  ground(-9,9,-80,-78,6,pave);ground(-9,9,-102,-98,6,pave);
  {const ab=addMesh(new THREE.PlaneGeometry(18,18),M(0x041c26),0,-15.8,-89);ab.rotation.x=-Math.PI/2;ab.castShadow=false;
    for(const [x,z,s] of[[-5.2,-85,0.9],[4.6,-92,1.1],[0.4,-87.6,0.7],[-2,-95,0.8],[6.4,-83.4,0.6]])kdome(x,z,s,-15.6);}   // утонувшие маковки в бездне
  const frame6=(x,z,top)=>{const fm=W.group.children.length;for(const d of[-1.3,1.3])addMesh(new THREE.BoxGeometry(0.25,top-5.6,0.25),wallM,x+d,top/2+3.2,z);addMesh(new THREE.BoxGeometry(3,0.3,0.4),wallM,x,top+0.2,z);fadeable(since(fm));};
  frame6(-6.4,-79,10.8);frame6(6.4,-99.4,10.8);
  const BA=FIN.kwBell(-6.4,10.6,-79,0.8,{pitch:1.2,dur:3.5,shells:[{x:-6.4,z:-77.6,y:6}],name:'ближний'});
  const BB=FIN.kwBell(6.4,10.6,-99.4,0.8,{pitch:1.05,dur:3.5,shells:[{x:6.4,z:-100.8,y:6}],name:'дальний'});
  const brR=FIN.kwGhost(3,6.2,5.7,6,-98,-80,{bells:[BA],name:'правый мост'}),brL=FIN.kwGhost(-6.2,-3,5.7,6,-98,-80,{bells:[BB],name:'левый мост'});
  const nutBr=nutItem(-4.6,6.7,-89);bell(-1.2,-100.4,6);
  /* ---------- 6. НОВОЕ «Светлояр»: камни-невидимки, а в воде — отражение ---------- */
  // В тихом Светлояре, говорят, видно отражение невидимого Китежа. Камни через озеро невидимы — их кажет только отражение,
  // а оно проступает, лишь когда кто-то стоит на Феврониином камне у берега и смотрит в воду. Один смотрит — другой идёт;
  // на том берегу — свой камень. Упал — плыви к ступеням у левой стены. Совиный взор Пелагеи ненадолго кажет и камни.
  ground(-9,9,-120,-102,-4,M(0x1c3a46));
  const LAKE=waterZone(-9,9,-120,-102,-4,3,{start:'high',floor:-4,shell:false,noGusli:true,curb:false,op:0.42});
  for(let i=0;i<9;i++){const z1=-102-0.9*i;box(-9,-7.4,-4,6-0.3*(i+1),z1-0.9,z1,stone,{occ:false});}
  const STN=[[-1.5,-103.0],[0.2,-104.6],[1.9,-106],[1,-107.8],[-0.8,-109],[-2.6,-110.4],[-1.6,-112.2],[0.2,-113.4],[2,-114.8],[3.2,-116.6],[2.4,-118.3],[1.6,-119.7],[-5,-109.4,1]].map(([x,z,side])=>{
    const col=colBox(x-0.8,x+0.8,5.4,6,z-0.8,z+0.8,false);
    const rf=new THREE.Mesh(new THREE.PlaneGeometry(1.5,1.5),MB(0xffe6a0,{transparent:true,opacity:0,depthWrite:false}));rf.rotation.x=-Math.PI/2;rf.position.set(x,LAKE.level+0.04,z);rf.renderOrder=5;W.group.add(rf);
    const e=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.6,0.5,1.6)),new THREE.LineBasicMaterial({color:0xffe9a0,transparent:true,opacity:0.8,depthWrite:false}));e.position.set(x,5.75,z);e.visible=false;W.group.add(e);
    return {x,z,col,rf,e,side:!!side};});
  const RFC=new THREE.Group();W.group.add(RFC);for(const [x,s] of[[-6.2,0.55],[6.4,0.5],[-0.6,0.42]]){const g=kdome(x,-119.2,s,LAKE.level-0.06);g.rotation.x=Math.PI;W.group.remove(g);RFC.add(g);}RFC.visible=false;   // отражение града
  const LOOK=[[-6.6,-100.6,1],[6.6,-121.6,-1]].map(([x,z,sd])=>{const g=new THREE.Group();g.position.set(x,6,z);W.group.add(g);
    addMesh(new THREE.CylinderGeometry(0.85,0.95,0.12,16),M(0xd8d0bc),0,0.06,0,g);addMesh(new THREE.BoxGeometry(0.6,1.3,0.25),M(0xe0d6c0),0,0.65,sd*1.1,g);addMesh(new THREE.ConeGeometry(0.16,0.3,4),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4}),0,1.45,sd*1.1,g);
    const rm=MB(0xbfe8ff,{transparent:true,opacity:0.8});const ring=addMesh(new THREE.TorusGeometry(0.7,0.05,8,26),rm,0,0.14,0,g);ring.rotation.x=Math.PI/2;ring.castShadow=false;return {x,z,g,ring,rm,hero:null};});
  const nutLake=nutItem(-5,6.6,-109.4);bell(-6,-122.6,6);let LKk=0;
  /* ---------- 7. НОВОЕ «Напев Садко»: четыре колокола — четыре звука ---------- */
  // Палата разделена золотой решёткой: слева два колокола, справа два. Китеж просыпается от напева Садко (его наиграл Садко в 2-1):
  // дзинь, дилинь, дон, дон — жёлтый, синий, розовый, зелёный. Ноты на воротах — порядок, лента на колоколе — его нота.
  // Звук за звуком — слева, справа, слева, справа, не дольше 4,5 с между ними (в одиночку — 7 с: расставь героев у раковин и меняй).
  ground(-9,9,-124,-120,6,pave);ground(-9,9,-144,-124,6,pave);
  const grilleC=colBox(-0.3,0.3,6,11.5,-144,-124,true);{const gg=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.35});for(let z=-124.3;z>-144;z-=0.7)addMesh(new THREE.BoxGeometry(0.1,5.4,0.1),gg,0,8.7,z).castShadow=false;
    for(const y of[6.3,9,11.4])addMesh(new THREE.BoxGeometry(0.14,0.14,20),gg,0,y,-134).castShadow=false;}
  const TUNE=FIN.SADKO_TUNE,TCOL=[0xffe08a,0x9fe6ff,0xffb0d0,0xb8ffb0],TN={i:0,t:0};
  const TB=[[0,-5,-139,1.0],[1,5,-139,0.86],[2,-5,-129,0.62],[3,5,-129,0.72]].map(([n,x,z,s])=>{frame6(x,z,11.2);
    const K=FIN.kwBell(x,11,z,s,{pitch:mf(TUNE[n])/330,dur:3,mark:false,shells:[{x,z:z+1.7,y:6}],onRing:(K,by)=>tuneRing(K,by)});K.note=n;
    const band=part(K.b.piv,new THREE.TorusGeometry(1.08,0.09,6,24),M(TCOL[n],{emissive:TCOL[n],emissiveIntensity:0.5}),0,-1.5,0);band.rotation.x=Math.PI/2;band.castShadow=false;
    for(const S of K.shells)addMesh(new THREE.BoxGeometry(0.5,0.14,0.05),M(TCOL[n],{emissive:TCOL[n],emissiveIntensity:0.6}),0,1.2,0.1,S.g);return K;});
  const mosaic=new THREE.Group();W.group.add(mosaic);const mosC=colBox(-9,9,6,12.5,-144.6,-144,true);addMesh(new THREE.BoxGeometry(18,6.4,0.5),M(0xe0d6c0),0,9.2,-144.3,mosaic);
  const PAN=TUNE.map((m,i)=>{const x=-6.75+i*4.5,pm=M(0x2a4a5a,{emissive:TCOL[i],emissiveIntensity:0.08});addMesh(new THREE.BoxGeometry(3.6,5.2,0.2),pm,x,9.1,-144,mosaic);
    const s=new THREE.Sprite(new THREE.SpriteMaterial({map:KW_NOTE_TEX,transparent:true,depthWrite:false,color:TCOL[i]}));s.raycast=()=>{};s.scale.setScalar(1.5);s.position.set(x,7.6+(m-67)*0.5,-143.75);mosaic.add(s);return {pm,s};});
  const nutHall=nutItem(-8.2,6.6,-142.6);
  function tuneSet(i){TN.i=i;PAN.forEach((P,k)=>{P.pm.emissiveIntensity=k<i?0.9:0.08;});}
  function tuneRing(K,by){if(F.tune)return;gusli(TUNE[K.note],0.05,0.22);const at=new V3(K.x,6+2.4,K.z+1.7);
    if(K.note===TN.i){tuneSet(TN.i+1);TN.t=G.solo?7:4.5;floatText(at,['Дзинь!','Дилинь!','Дон!','Дон!'][K.note],'#'+TCOL[K.note].toString(16).padStart(6,'0'));if(TN.i>=4){F.tune=true;later(0.6,tuneScene5);}}
    else{SFX.miss();shakeAll(0.02,0.25);floatText(at,TN.i?'Фальшь! Сначала.':'Не тот звук — сначала жёлтый.','#ffb0a0');tuneSet(0);
      if(!F.tuneTold){F.tuneTold=true;for(const pi of[0,1])tip(pi,'Ноты на воротах — по порядку: жёлтая, синяя, розовая, зелёная. Лента на колоколе — его нота.<br>Звоните друг за другом: слева, справа, слева, справа.',4.2);}}}
  function tuneScene5(){
    play({dur:9,fov:48,shots:[shot(0,[0,9.6,-121.6],[0,9,-136]),shot(4.6,[0,8.4,-131],[0,9.4,-144])],
      says:[[0.3,3,'zven','Дзинь, дилинь, дон, дон! Напев Садко!'],[3.4,3.2,null,'<i>Китеж вспомнил напев — и ворота с нотами уходят в мостовую.</i>',true],[6.8,2,'yosha','Сыграли, как Садко! Все вместе!']],
      events:[{t:0.6,fn:()=>{TB.forEach((K,i)=>later(i*0.5,()=>{K.b.ring();gusli(TUNE[K.note],0,0.2);ringFx(new V3(K.x,6.2,K.z),TCOL[K.note],4);}));}},
        {t:4.6,fn:()=>{SFX.gate();shakeAll(0.04,1.2);mosC.on=false;anim(2.4,k=>{mosaic.position.y=-6.6*smooth(k);});}}],
      end:()=>{mosC.on=false;mosaic.position.y=-6.6;banner('Китеж вспомнил!','#ffd76a',2.2,'дальше — главный колокол');}});}
  // третья струна гуслей — Звон: на площадке над провалом
  function zvonScene(){F.zvon=true;const notes=[];
    play({dur:10,fov:48,shots:[shot(0,[0,10.4,-71],[0,6,-90]),shot(5.4,[-2.6,8.6,-74.4],[-6.4,9.6,-79])],
      says:[[0.3,3.2,'zven','Слышите? Колокол звякнул — и мост проступил! И снова пропал…'],[3.7,3.6,null,'<i>Звон колоколов свивается в золотую нить — третья струна гуслей: Звон.</i>',true],[7.4,2.4,'proshka','Звон — и невидимое видно. Понял!']],
      events:[{t:0.8,fn:()=>{BA.ring(null);}},{t:2.2,fn:()=>{BB.ring(null);}},
        {t:5.4,fn:()=>{HEROES.forEach((h,i)=>{const s=new THREE.Sprite(new THREE.SpriteMaterial({map:KW_NOTE_TEX,transparent:true,depthWrite:false,color:0xffe08a}));s.raycast=()=>{};s.scale.setScalar(0.5);s.visible=false;W.group.add(s);notes.push(s);
          const a=new V3(-6.4,9.4,-79);later(i*0.25,()=>{s.visible=true;const b=h.pos.clone().add(new V3(0,h.d.height,0));anim(1.4,k=>{s.position.lerpVectors(a,b,smooth(k));s.position.y+=Math.sin(k*Math.PI)*1.2;if(k>=1){s.visible=false;burst(b,COL.gold,6,2);}});});});}}],
      end:()=>{notes.forEach(s=>W.group.remove(s));banner('Третья струна — Звон!','#ffd76a',2.6,'ракушка с колокольчиком: гусли '+K(0,'item')+' / '+K(1,'item')+' — колокол гудит, невидимое проступает');
        later(2.8,()=>{for(const pi of[0,1])tip(pi,'Колокол на этом краю кажет ДРУГОЙ мост, а звенит недолго.<br>Один звонит '+K(pi,'item')+' — и звонит ещё, пока другой идёт. Сменишь героя сразу после звона — оставленный доиграет 15 секунд.',4.8);});}});}
  // язык колокола: тот, что Потап поднял со дна кита (2-4), — на место
  function tongueScene(){F.tongueSc=true;const P=T.potap;const tg=new THREE.Group();W.group.add(tg);tg.visible=false;
    {const tm=M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.6});addMesh(new THREE.CylinderGeometry(0.14,0.14,2.2,8),tm,0,0,0,tg);addMesh(new THREE.SphereGeometry(0.45,12,10),tm,0,-1.25,0,tg);addMesh(new THREE.TorusGeometry(0.22,0.07,6,12),tm,0,1.2,0,tg);}
    play({dur:10,fov:48,shots:[shot(0,[P.pos.x+3,P.pos.y+2.4,P.pos.z+4],[P.pos.x,P.pos.y+1.4,P.pos.z]),shot(4.2,[4.6,10.4,-143.6],[0,13.6,-151])],
      says:[[0.3,3.4,'potap','Язык колокола — тот, что кит проглотил. Донёс!'],[3.9,2.6,'yosha','Вешай, Потапушка, на место!'],[6.8,3,'zven','Колокол тяжёлый — раскачать его только вчетвером!']],
      events:[{t:0.4,fn:()=>{tg.visible=true;tg.position.copy(P.pos).add(new V3(0,2.4,0));SFX.toss();}},
        {t:4.2,fn:()=>{const a=tg.position.clone(),b=new V3(0,13.4,-151);anim(2,k=>{tg.position.lerpVectors(a,b,smooth(k));tg.position.y+=Math.sin(k*Math.PI)*2;tg.rotation.y+=0.08;});}},
        {t:6.3,fn:()=>{W.group.remove(tg);const tm=M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.6});part(mainBell.tongue,new THREE.CylinderGeometry(0.04,0.04,1.3,6),tm,0,-0.65,0);part(mainBell.tongue,new THREE.SphereGeometry(0.16,10,8),tm,0,-1.35,0);
          SFX.latch();mainBell.swing=0.5;tone(110,1,'sine',0.2);burst(new V3(0,13.4,-151),COL.gold,14,3);}}],
      end:()=>{F.tongueIn=true;W.group.remove(tg);for(const pi of[0,1])tip(pi,'Все четверо — на круг под колоколом (сменяй '+K(pi,'swap')+', кличь '+K(pi,'call')+'), на «ТРИ» — прыжок '+K(pi,'jump')+'!',3.6);}});}
  /* ---------- 8. главный колокол (прежний, дальше по городу): пузырники и щуки, язык колокола — на четверых ---------- */
  ground(-9,9,-146,-144,6,pave);ground(-9,9,-166,-156,6,pave);ground(-9,-6,-156,-146,6,pave);ground(6,9,-156,-146,6,pave);ground(-6,6,-156,-146,3,M(0x4a6660));
  for(let i=0;i<9;i++)box(4.6,6,3,6-0.333*(i+1),-146-0.9*(i+1),-146-0.9*i,stone,{occ:false});
  const MZ=waterZone(-6,6,-156,-146,3,6.3,{start:'high',floor:3,shell:{x:-6.6,z:-145.4,y:6}});
  {const fm=W.group.children.length;for(const sd of[-1,1])box(sd*7.4-0.5,sd*7.4+0.5,6,17,-151.5,-150.5,wallM);addMesh(new THREE.BoxGeometry(15.8,0.8,1.2),wallM,0,17.2,-151);kdome(0,-151,0.6,17.6);fadeable(since(fm));}
  const mainBell=bigBell(0,16.4,-151,2.4,{tongue:false,pitch:0.6});
  addMesh(new THREE.CylinderGeometry(0.12,0.12,5.2,6),M(0x4a4a50),0,9.2,-151);const tongue=addMesh(new THREE.CylinderGeometry(2.2,2.0,0.32,18),M(0x5a5a62),0,6.44,-151);
  W.cyls.push({x:0,z:-151,r:2.2,miny:6.25,maxy:6.6,on:true});
  const spots=[0,1,2,3].map(i=>{const a=Math.PI/4+i*Math.PI/2,x=Math.cos(a)*1.25,z=-151+Math.sin(a)*1.25;const rm=MB(0xffffff,{transparent:true,opacity:0.9});const ring=addMesh(new THREE.TorusGeometry(0.42,0.06,8,22),rm,x,6.64,z);ring.rotation.x=Math.PI/2;ring.castShadow=false;return {x,z,ring,rm,hero:null};});
  const link4=linkItem(0,6.9,-161.4),nut5=nutItem(8,6.6,-163);
  bell(-2.4,-145,6);
  const arena={x:0,z:-152,r:9,started:false,cleared:false,hold:0,list:[]};arena.camActive=()=>arena.started&&(!arena.cleared||arena.hold>0);W.camZones.push(arena);
  /* ---------- сюжет ---------- */
  function sinkScene(){F.voice='sinking';const pe=T.pelageya;
    play({dur:14.4,fov:48,camK:3,shots:[shot(0,[4.6,2.6,-11.6],[0,2.2,-17]),shot(3.8,[6,5,-9],[0,0,-17],[6,1,-10],[0,-6,-18],5),shot(9.8,[3.2,1.6,-13.2],[pe.pos.x,0.8,pe.pos.z])],
      says:[[0.3,3.4,null,'<i>Колокол без языка звенит, коль в него крикнуть громко.</i><br><i>Пелагея клюв открыла — и в перья спряталась робко.</i>',true],[3.9,3.4,null,'<i>Вода у звонницы кружится —</i><br><i>И колокол на дно уходит, со звеном ложится.</i>',true],
        [7.5,2.4,null,'<i>Йоша чуть не плачет: «Пелагея не смогла!»</i>',true],[10.1,2.6,'proshka','Да что ж тут трудного — крикнуть, и дело с концом?'],[12.8,1.6,null,'<i>Пелагея молча отворачивается.</i>',true]],
      events:[{t:3.8,fn:()=>{swirl.visible=true;SFX.wave();}},{t:4.2,fn:()=>{const a=vbell.g.position.clone(),b=new V3(-4.6,-8.0,-23.4);anim(5.4,k=>{const q=smooth(k);vbell.g.position.lerpVectors(a,b,q);vbell.g.position.x-=Math.sin(q*Math.PI)*1.6;vbell.g.rotation.z=k*1.4;vbell.g.rotation.y=k*3;});SFX.whoosh();}},
        {t:9.8,fn:()=>{swirl.visible=false;linkV.locked=false;linkV.g.visible=true;}},{t:12.8,fn:()=>{pe.face+=Math.PI;}}],
      tick:(t)=>{swirl.rotation.z+=0.08;},
      end:()=>{F.voice='sunk';swirl.visible=false;vbell.g.position.set(-4.6,-8.1,-23.4);vbell.g.rotation.set(0,0,1.4);linkV.locked=false;linkV.g.visible=true;pe.parts.beak.visible=true;pe.body.scale.set(1,1,1);
        for(const pi of[0,1])tip(pi,'Звено упало на дно. Все в колодец — и отлив '+K(pi,'item')+' сыграй:<br>Вода вас опустит через весь город, так и знай.',4);}});}
  function tryVoice(){F.voice='tried';const pe=T.pelageya;SFX.miss();floatText(pe.pos.clone().add(new V3(0,1.7,0)),'…','#e7c3ff');
    anim(0.5,k=>{pe.parts.beak.rotation.x=0.5+Math.sin(k*Math.PI)*0.6;});later(0.6,()=>{pe.parts.beak.visible=false;anim(0.5,k=>{pe.body.scale.set(1+0.14*k,1-0.16*k,1+0.14*k);});});later(1.6,sinkScene);}
  W.skillHook=(pi,h)=>{if(pi===1&&h.kind==='pelageya'&&F.voice==='ready'){tryVoice();return true;}return false;};
  function giveScene(){F.given='scene';const pr=T.proshka,pe=T.pelageya;
    play({dur:10,fov:46,shots:[shot(0,[0.6,-7.0,-18.6],[-3.4,-8.4,-22.2])],
      says:[[0.3,3,null,'<i>Всю дорогу Пелагея последней летела.</i>',true],[3.4,3.4,null,'<i>На дне Прошка ей молча звено отдаёт —</i><br><i>То, что сам достал из вод.</i>',true],[7.2,2.2,null,'<i>Она берёт — без слов.</i>',true]],
      events:[{t:0,fn:()=>{placeOnGround(pr,-2.4,-22.4,-9);placeOnGround(pe,-4.4,-21.2,-9);pr.face=Math.atan2(pe.pos.x-pr.pos.x,pe.pos.z-pr.pos.z);pe.face=Math.atan2(pr.pos.x-pe.pos.x,pr.pos.z-pe.pos.z)+1.2;}},
        {t:3.4,fn:()=>{const g=new THREE.Group();const m=new THREE.Mesh(new THREE.TorusGeometry(0.22,0.07,10,24),M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.8}));m.scale.set(1,1.45,1);g.add(m);W.group.add(g);
          const a=pr.pos.clone().add(new V3(0,0.9,0)),b=pe.pos.clone().add(new V3(0,0.8,0));anim(2.2,k=>{g.position.lerpVectors(a,b,smooth(k));g.rotation.y+=0.05;if(k>=1)W.group.remove(g);});}},
        {t:5.8,fn:()=>{pe.face=Math.atan2(pr.pos.x-pe.pos.x,pr.pos.z-pe.pos.z);}}],
      end:()=>{F.given=true;grCol.on=false;anim(1.2,k=>{grille.position.y=-4*smooth(k);});SFX.gate();for(const pi of[0,1])tip(pi,'Прилив '+K(pi,'item')+' сделай — подымешься наверх, к звонницам. Решётка открыта!',3.4);}});}
  function bomScene(){F.bom=true;const pe=T.pelageya;
    play({dur:21,fov:48,camK:2.4,shots:[shot(0,[4.8,8.4,-144.6],[0,8.2,-151]),shot(4.2,[1.6,7.4,-148.6],[pe.pos.x,pe.pos.y+0.8,pe.pos.z]),shot(8.6,[0,14,-128],[0,6,-156],[0,26,-96],[0,4,-158],7),shot(16,[-6,8,-138],[0,10,-168])],
      says:[[0.3,3.6,null,'<i>Колокол почти звенит — да голоса не хватает.</i>',true],[4.3,3.4,null,'<i>Пелагея шепчет — тихо-тихо, еле-еле:</i>',true],
        [8.8,3.8,null,'<i>И этого хватает! Китеж из воды выходит весь,</i><br><i>Звонят колокола — благая весть…</i>',true],[13.4,2.6,null,'<i>…а в глубине отзывается рёв.</i>',true],[16.2,3,'zven','Водяной проснулся! Берегись!']],
      events:[{t:0.5,fn:()=>{mainBell.swing=0.8;tone(110,1.4,'sine',0.25);}},{t:6.2,fn:()=>{babble('pelageya','Бом');floatText(pe.pos.clone().add(new V3(0,1.6,0)),'Бом.','#e7c3ff');}},
        {t:7.4,fn:()=>{mainBell.ring();SFX.ok();for(const b of[vbell,bL,bR,dbL,dbR])later(rand(0.2,2.2),()=>b.ring());}},
        {t:8.6,fn:()=>{W.seaOff=true;W.bubbles=false;anim(7,k=>{scene.fog.near=lerp(3,22,k);scene.fog.far=lerp(42,150,k);});TB.forEach((K,i)=>later(0.8+i*0.55,()=>{K.b.ring();gusli(TUNE[K.note],0,0.2);}));for(const z of W.waters)setWater(z,'low');const c0=new THREE.Color(0x0e4654),c1=new THREE.Color(0x9ad8f0);anim(7,k=>{scene.background.copy(c0).lerp(c1,k);scene.fog.color.copy(scene.background);});
          for(let i=0;i<8;i++)later(i*0.6,()=>{const b=[mainBell,vbell,bL,bR,dbL,dbR][i%6];b.ring();});}},
        {t:13.4,fn:()=>{tone(60,2.4,'sawtooth',0.2,40);tone(80,2.0,'sawtooth',0.14,50,0.3);shakeAll(0.08,1.6);}}],
      end:()=>{F.out=true;later(0.4,finishLevel);}});}
  W.updates.push(dt=>{
    // Голосовая звонница: Пелагея на островке — над ней загорается нотка, но звука нет (скриптованная ошибка)
    const pe=T.pelageya;if(F.voice==='wait'&&hd(pe.pos,{x:0,z:-17})<2.1&&pe.pos.y>-0.6&&!G.cine){F.voice='ready';F.vt=0;SFX.bell();floatText(pe.pos.clone().add(new V3(0,1.8,0)),'♪','#e7c3ff');}
    if(F.voice==='ready'){F.vt+=dt;if(F.vt>7&&pe.active)tryVoice();}
    if(F.voice==='sunk'&&!F.given&&linkV.taken)giveScene();
    // одиночные звонницы → ступени к среднему ярусу; двойная → к верхнему
    if(F.b1&&F.b2&&!st1.risen)st1.rise();
    if(F.dbl&&G.time-F.dbl.t>5&&!(F.dbL&&F.dbR)){F.dbl=null;F.dbL=F.dbR=false;SFX.miss();banner('Колокола замолкли','#ffd0d0',1.6,'два колокола подряд — за пять секунд успейте');}
    if(F.dbL&&F.dbR&&!F.b3){F.b3=true;SFX.ok();banner('Два колокола вместе поют!','#ffd76a',2);later(1.6,()=>st2.rise());}
    // третья струна — Звон: на площадке над провалом
    if(F.b3&&!F.zvon&&!G.cine&&[0,1].some(pi=>active(pi).pos.z<-72.8&&active(pi).pos.y>5.5))zvonScene();
    // Светлояр: кто-то стоит на Феврониином камне — в воде отражение пути; Совиный взор — ненадолго тоже
    let look=false;for(const L of LOOK){L.hero=null;for(const h of HEROES){if(h.cling)continue;if(hd(h.pos,L)<0.85&&Math.abs(h.pos.y-6)<0.6&&h.grounded){L.hero=h;break;}}L.rm.color.setHex(L.hero?PCOL[L.hero.player]:0xbfe8ff);L.ring.scale.setScalar(L.hero?1.15:1);if(L.hero)look=true;}
    if(look&&!F.look){SFX.flower();if(!F.lookTold){F.lookTold=true;floatText(new V3(0,7.4,-110),'В воде — отражение!','#ffe9a0');}}F.look=look;
    LKk=damp(LKk,look?1:KW.owlT>0?0.7:0,4,dt);for(const s of STN){s.rf.visible=LKk>0.01&&LAKE.level>1;s.rf.material.opacity=0.6*LKk*(0.8+0.2*Math.sin(G.time*2+s.x));s.rf.position.y=LAKE.level+0.04;s.e.visible=KW.owlT>0;
      if(Math.random()<dt*1.5&&HEROES.some(h=>h.groundRef===s.col))ringFx(new V3(s.x,LAKE.level-0.1,s.z),0xcff8ff,1.2);}
    RFC.visible=LKk>0.05;RFC.position.y=LAKE.level-3;
    // напев Садко: звук за звуком, не мешкая
    if(!F.tune&&TN.i>0){TN.t-=dt;if(TN.t<=0){tuneSet(0);SFX.miss();banner('Напев рассыпался','#ffd0d0',1.4,'звук за звуком — не мешкайте');}}
    // язык колокола — после стычки
    if(arena.cleared&&arena.hold<=0&&!F.tongueSc&&!G.cine)tongueScene();
    mL.visible=!F.b1&&L1.level<L1.floor+0.4;mD.visible=!F.dbL&&DL.level<DL.floor+0.4;
    // главный колокол: стычка
    if(!arena.started&&[0,1].some(pi=>active(pi).pos.z<-144.8&&active(pi).pos.y>5)){arena.started=true;SFX.gate();
      arena.list=[puzyr(-7.2,-148.5,{y:6,leash:4}),puzyr(7.2,-148.5,{y:6,leash:4}),puzyr(-7,-160,{y:6,leash:4}),puzyr(7,-160,{y:6,leash:4}),pike(-3.4,-148.5,MZ,3),pike(3.4,-154,MZ,3),tyagunFoe(-2.2,-153.6,MZ,{leash:5})];
      banner('Пузырники, щуки да тягун!','#9fd0ff',2.4,'Потап щитом закрывает, Пелагея отбивает, Прошка надутых сбивает, Йоша сытых гасит');}
    if(arena.started&&!arena.cleared&&arena.list.every(e=>!e.alive)){arena.cleared=true;arena.hold=1.6;SFX.ok();banner('Отбились!','#ffffff',1.6,'а теперь — колокол главный');}
    if(arena.cleared)arena.hold-=dt;
    // язык колокола: все четверо — и на «ТРИ» прыжок вместе, качаем колокол весом
    const used=new Set();for(const s of spots){s.hero=null;for(const h of HEROES){if(used.has(h)||h.cling)continue;if(hd(h.pos,s)<0.8&&h.pos.y>6.3&&h.pos.y<9.5){s.hero=h;used.add(h);break;}}s.rm.color.setHex(s.hero?PCOL[s.hero.player]:0xffffff);s.ring.scale.setScalar(s.hero?1.2:1);}
    const all=arena.cleared&&F.tongueIn&&!F.bom&&!F.bomWait&&spots.every(s=>s.hero);const C=F.cnt||(F.cnt={t:0,beat:-1,sw:0,p:[null,null]});
    if(all){C.t+=dt;const b=Math.floor(C.t);if(b!==C.beat&&b<3){C.beat=b;SFX.beat(b);banner(['РАЗ','ДВА','ТРИ!'][b],b===2?'#ffc93c':'#ffffff',0.8,b===2?'прыгайте вместе — раскачаем!':'');}
      if(C.t>=1.8)for(const pi of[0,1])if(tap(pi,'jump')&&C.p[pi]===null){C.p[pi]=C.t;if(G.solo)C.p[1-pi]=C.t;}
      if(C.p[0]!==null&&C.p[1]!==null){C.sw++;mainBell.swing=Math.min(1.6,0.5*C.sw);tone(90+C.sw*14,1,'sine',0.3);shakeAll(0.04,0.4);floatText(new V3(0,9,-151),['Качнулся!','Сильнее!','Почти звонит…'][Math.min(2,C.sw-1)],'#ffd76a');
        C.t=-0.4;C.beat=-1;C.p=[null,null];if(C.sw>=3){F.bomWait=true;later(0.8,bomScene);}}
      else if(C.t>2+rztWindow()){C.t=-0.6;C.beat=-1;C.p=[null,null];SFX.miss();banner('Не вместе — ещё разок, дружней!','#ffd0d0',1);}}
    else{C.t=0;C.beat=-1;C.p=[null,null];}
    tongue.rotation.z=Math.sin(G.time*1.4)*0.02*(1+C.sw);});
  // колокола: низкий — рогатка в отлив; высокий — удар с воды в прилив
  W.marks.push({pos:new V3(-5.5,-1.35,-36.4),active:()=>!F.b1&&L1.level<L1.floor+0.4,onHit:()=>{F.b1=true;bL.ring();banner('Бам!','#ffd76a',1.2,'низкая звонница звенит');}});
  W.marks.push({pos:new V3(-5.5,1.65,-61.4),active:()=>!F.dbL&&!F.b3&&DL.level<DL.floor+0.4,onHit:()=>{F.dbL=true;dbL.ring();if(!F.dbl)F.dbl={t:G.time};floatText(new V3(-5.5,4,-62),F.dbR?'Вместе!':'Второй — скорей!','#ffd76a');}});
  W.hittables.push({pos:new V3(5.5,0,-37),r:1.6,push:false,alive:()=>!F.b2,onHit:h=>{if(!(R1.level>R1.high-0.3&&h.pos.y>1.1)){if(!F.b2tip){F.b2tip=true;tip(1,'Колокол высоко. Прилив '+K(1,'item')+' сделай, доплыви — и ударь!',2.6);}return;}F.b2=true;bR.ring();banner('Бом!','#ffd76a',1.2,'звонница на приливе звенит');}});
  W.hittables.push({pos:new V3(5.5,0,-62),r:1.6,push:false,alive:()=>!F.dbR&&!F.b3,onHit:h=>{if(!(DR.level>DR.high-0.3&&h.pos.y>4.1))return;F.dbR=true;dbR.ring();if(!F.dbl)F.dbl={t:G.time};floatText(new V3(5.5,9,-62),F.dbL?'Вместе!':'Второй — скорей!','#ffd76a');}});
  /* ---------- рисунки кнопок ---------- */
  prompt(1,'skill',()=>headOf(T.pelageya),()=>F.voice==='ready'&&T.pelageya.active,'крикни!');
  prompt(1,'swap',()=>headOf(T.pelageya),()=>(F.voice==='wait'||F.voice==='ready')&&T.yosha.active&&T.yosha.pos.z<-7,'Пелагея');
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>F.voice==='sunk'&&!linkV.taken&&inZone(GW,h(),0.3)&&GW.state==='high'&&h().pos.y>-1,'отлив — на дно');
    prompt(pi,'item',()=>headOf(h()),()=>F.given===true&&inZone(GW,h(),0.3)&&GW.state==='low'&&h().pos.y<-7,'прилив — наверх');
    prompt(pi,'item',()=>headOf(h()),()=>F.b3&&!F.bom&&arena.cleared&&inZone(MZ,h(),1)&&MZ.state==='low','прилив');
    prompt(pi,'item',()=>headOf(h()),()=>arena.started&&!arena.cleared&&inZone(MZ,h(),1)&&W.enemies.some(e=>e.alive&&e.kind==='tyagun'&&(MZ.state==='high'?!e.up:e.silt)),'тягун: отлив');
    prompt(pi,'jump',()=>headOf(h()),()=>spots.every(s=>s.hero)&&arena.cleared&&F.tongueIn&&!F.bom&&F.cnt&&F.cnt.t>1.6,'вместе!');
    prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.help));
    prompt(pi,'attack',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&hd(e.pos,h().pos)<5&&(e.state==='broken'||(e.state==='stagger'&&!e.openHit)||e.flop)),'');}
  prompt(0,'item',()=>headOf(active(0)),()=>!F.b1&&inZone(L1,active(0),1)&&L1.state==='high','отлив');
  prompt(0,'skill',()=>headOf(T.proshka),()=>T.proshka.active&&((!F.b1&&L1.level<L1.floor+0.4&&hd(T.proshka.pos,{x:-5.5,z:-37})<10)||(!F.dbL&&DL.level<DL.floor+0.4&&hd(T.proshka.pos,{x:-5.5,z:-62})<10)),'рогатка');
  prompt(0,'item',()=>headOf(active(0)),()=>!F.b3&&F.b1&&inZone(DL,active(0),1)&&DL.state==='high','отлив');
  prompt(1,'item',()=>headOf(active(1)),()=>!F.b2&&inZone(R1,active(1),1)&&R1.state==='low','прилив');
  prompt(1,'item',()=>headOf(active(1)),()=>!F.b3&&F.b2&&inZone(DR,active(1),1)&&DR.state==='low','прилив');
  prompt(1,'attack',()=>headOf(active(1)),()=>(!F.b2&&R1.level>R1.high-0.3&&hd(active(1).pos,{x:5.5,z:-37})<2.4&&active(1).pos.y>1.1)||(!F.dbR&&!F.b3&&DR.level>DR.high-0.3&&hd(active(1).pos,{x:5.5,z:-62})<2.4&&active(1).pos.y>4.1),'ударь колокол');
  prompt(0,'skill',()=>headOf(T.proshka),()=>T.proshka.active&&W.enemies.some(e=>e.alive&&e.inf>0.2&&hd(e.pos,T.proshka.pos)<12),'сбей надутого');
  prompt(0,'guard',()=>headOf(T.potap),()=>T.potap.active&&W.bolts.some(b=>!b.refl&&b.tgt!==T.potap&&hd(b.p,T.potap.pos)<5),'широкий щит');
  /* ---------- задачи ---------- */
  const o1=pi=>O(pi?()=>'Китеж подняться хочет, да колокола молчат. Первый — на островке.<br>Язычка у него нет: крикни — и зазвенит. Пелагея ближе всех, налегке.':'Китеж подняться хочет, да колокола молчат.<br>Первый колокол — на островке посреди колодца, говорят.',
    ()=>F.voice==='sunk'||F.voice==='sinking'||!!F.given,()=>[vbell.g]);
  const o2=pi=>O(()=>'Звено упало на дно. Все в колодец — и отлив '+K(pi,'item')+' сыграй:<br>Вода вас опустит через весь город, так и знай.',()=>!!F.given,()=>[linkV.g]);
  const o3=pi=>O(()=>'Прилив '+K(pi,'item')+' сделай — и наверх, к звонницам!',()=>active(pi).pos.z<-30,()=>[GW.shell.g]);
  const o4=[O(()=>'Низкая звонница. Отлив '+K(0,'item')+' сделай — язычок повиснет в пустоте.<br>Из рогатки '+K(0,'skill')+' в него стрельни — зазвенит в высоте.',()=>!!F.b1,()=>[mL,L1.shell.g]),
    O(()=>'Звонница на воде. Прилив '+K(1,'item')+' сделай, доплыви —<br>И крылом '+K(1,'attack')+' по колоколу ударь, не щади!',()=>!!F.b2,()=>[bR.g,R1.shell.g])];
  const o5=pi=>O('Колокола звонят — Китеж растёт! Бегом вверх по ступеням!',()=>active(pi).pos.z<-55&&active(pi).pos.y>2.5,()=>st1.steps.map(s=>s.m));
  const o6=pi=>O(pi?()=>'Двойная звонница. Твой колокол — верхний: прилив '+K(1,'item')+' и удар '+K(1,'attack')+'. У друга — нижний.<br>Звоните подряд — за пять секунд успейте, не мешкайте лишне!':()=>'Двойная звонница. Твой колокол — нижний: отлив '+K(0,'item')+' и рогатка '+K(0,'skill')+'. У друга — верхний.<br>Звоните подряд — за пять секунд успейте, как на праздник первый!',
    ()=>!!F.b3,()=>pi?[dbR.g]:[mD]);
  const o7=pi=>O('Выше — на площадку над провалом!',()=>active(pi).pos.z<-73&&active(pi).pos.y>5,()=>st2.steps.map(s=>s.m));
  const oA=pi=>O(()=>'Невидимый Китеж: мост виден и твёрд, пока звенит колокол. Колокол на этом краю кажет ДРУГОЙ мост.<br>Ракушка с колокольчиком — гусли '+K(pi,'item')+'. Один звонит — другой идёт; за провалом — наоборот.',
    ()=>active(pi).pos.z<-98.6&&active(pi).pos.y>5,()=>[...BA.shells,...BB.shells].map(S=>S.g));
  const oB=pi=>O(()=>'Светлояр: камни через озеро невидимы, их кажет лишь отражение в воде —<br>пока кто-то стоит на Феврониином камне у берега. Один смотрит — другой идёт.',()=>active(pi).pos.z<-120.2&&active(pi).pos.y>5,()=>LOOK.filter(L=>!L.hero).map(L=>L.g));
  const oC=pi=>O(()=>'Напев Садко: дзинь, дилинь, дон, дон. Ноты на воротах — по порядку, лента на колоколе — его нота.<br>Звоните гуслями '+K(pi,'item')+' у ракушек друг за другом: слева, справа, слева, справа.',()=>!!F.tune,()=>F.tune?[]:[TB.find(K=>K.note===TN.i).b.g]);
  const o8=pi=>O(pi?()=>'Пузырники и щуки! Пелагея пузыри отбивает '+K(1,'guard')+', Йоша сытых живой водой '+K(1,'skill')+' гасит.<br>Тягуна под водой не достать — отлив '+K(1,'item')+' сделай, и на мели он погаснет.':()=>'Пузырники и щуки! Потап щитом '+K(0,'guard')+' закрывает всех за спиной, Прошка из рогатки '+K(0,'skill')+' надутых сбивает.<br>Тягуна под водой не достать — отлив '+K(0,'item')+' сделай, на мели он и застревает.',()=>arena.cleared,()=>arena.list.filter(e=>e.alive).map(e=>e.g));
  const o9=pi=>O(()=>'Главный колокол качают вчетвером. Прилив '+K(pi,'item')+' сделай.<br>Все четверо — на круг под колоколом (сменяй '+K(pi,'swap')+', кличь '+K(pi,'call')+'), на «ТРИ» — прыгайте '+K(pi,'jump')+' смело!',()=>!!F.bom,()=>F.tongueIn?[tongue]:[]);
  for(const pi of[0,1])W.objectives[pi]=[o1(pi),o2(pi),o3(pi),o4[pi],o5(pi),o6(pi),o7(pi),oA(pi),oB(pi),oC(pi),o8(pi),o9(pi),O('Китеж звонит…',()=>false,()=>[])];
  W.tipZones.push({cond:(pi,h)=>inZone(LAKE,h,0)&&h.pos.y<5,text:pi=>'Упал в Светлояр? Плыви к ступеням у левой стены — и снова на берег.'},
    {cond:(pi,h)=>h.pos.z<-98.4&&h.pos.z>-102.2&&h.pos.y>5&&!F.look,text:pi=>'Камней не видно. Встань на Феврониин камень (круг у берега) — в воде проступит отражение пути.'},
    {cond:(pi,h)=>F.zvon&&h.pos.z<-76.4&&h.pos.z>-80.2&&h.pos.y>5&&!brR.solid&&!brL.solid,text:pi=>'Мостов не видно. Сыграй у ракушки с колокольчиком '+K(pi,'item')+' — проступит мост на той стороне.'},
    {cond:(pi,h)=>!F.tune&&h.pos.z<-124&&h.pos.z>-144&&h.pos.y>5,text:pi=>'Ноты на воротах: жёлтая, синяя, розовая, зелёная. Звоните по очереди — у каждой ракушки колокол своей ноты.'});
  W.tipZones.push({cond:(pi,h)=>arena.started&&!arena.cleared&&W.enemies.some(e=>e.alive&&e.kind==='tyagun'&&!e.up&&hd(e.pos,h.pos)<9),text:pi=>W.enemies.some(e=>e.alive&&e.kind==='tyagun'&&e.silt)?'Тягун в ил зарылся. Прилив '+K(pi,'item')+' сделай, а потом отлив опять — вылезет, не утаится.':'Тягун в воде таится. На гуслях сыграй '+K(pi,'item')+' — отлив на мель его вытащит.<br>Бей сбоку — пусть поплатится!'},
    {cond:(pi,h)=>h.grounded&&h.groundRef&&h.groundRef.water,text:pi=>'Ты плывёшь. Волна на столбе кажет, какая вода колоколу нужна:<br>Внизу — отлив, вверху — прилив. Гусли '+K(pi,'item')+' — и вся недолга.'},
    {pi:1,cond:(pi,h)=>F.voice==='ready'&&h.kind==='pelageya',text:pi=>'Над Пелагеей нотка зажглась…'});
  W.spawns=[[new V3(-3,0,5),new V3(-5,0,6)],[new V3(3,0,5),new V3(5,0,6)]];W.startAct=[0,0];
  W.pauseLine='Китеж звонит: колокол звенит, лишь когда вода на отметке его стоит.<br>Мост-призрак виден, пока звенит колокол; в Светлояре путь кажет отражение;<br>напев Садко — по нотам на воротах. А главный колокол — на четверых, держись!';
  FIN.kwPrompts();
  W.dbg25=()=>({F,BA,BB,brL,brR,LAKE,STN,LOOK,TB,TN,PAN,mosC,mosaic,arena,spots,mainBell,MZ,st1,st2,grCol});
  W.warp25=(where)=>{F.voice='sunk';F.given=true;grCol.on=false;grille.position.y=-4;F.b1=F.b2=F.dbL=F.dbR=F.b3=true;st1.rise();st2.rise();if(where!=='ghost')F.zvon=true;
    if(where==='bell'){F.tune=true;tuneSet(4);mosC.on=false;mosaic.position.y=-6.6;}
    const P={ghost:[0,6,-76.8],lake:[0,6,-100],tune:[0,6,-122],bell:[0,6,-145]}[where];
    HEROES.forEach((h,i)=>{placeOnGround(h,P[0]+(i%2?1.2:-1.2)*(i>1?2:1),P[2]+(i>1?0.8:0),P[1]);h.following=false;});for(const pi of[0,1])players[pi].cp.set(P[0],P[1],P[2]);snapCams();return W.dbg25();};
  W.onStart=()=>{later(0.8,()=>say('zven','Колокола молчат. Разбудим Китеж! Дзинь-дзинь!',2.8,true));};
  flushDecor();}
