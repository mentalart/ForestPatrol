/* ============================== МИР 3 · 3-4 «ЛЕТУЧИЙ КОРАБЛЬ» ============================== */
// сочетание: перо + вес · перо в фонаре — корабль летит · крен от веса (Потап весит за троих, бочка и ворона на палубе — по одному)
// у каждого своё дело: Потап — противовес, щит и бочки; Прошка — рогатка (камни над ущельем, вороны на подлёте); Пелагея — фонарь (погасить —
// корабль ныряет под арку) и Совиный взор (камни во тьме); Йоша — мёртвой водой латает порванный парус
// участки: небо (порыв, бочки, орешки под бортом) · ущелье по нарастающей (уступ, высокий уступ, теснина, три подряд, камнепад, низкая арка)
// · крыло ломается — держаться за мачту · ветры с разных сторон · тёмные тучи (камни во тьме) · вороны на ходу (весят, утаскивают фонарь на тучу)
// · гроза (молния рвёт парус, свист Соловья, низкая туча) · гнездо; ни одной царапины за полёт — Капитанский свисток
function build34(){
  W.zvenAway=true;W.world=3;setTheme('skynight');W.name='3-4 · «Летучий корабль»';W.sub='Небесное царство · перо в фонаре, крен от веса';W.camX=14;const F=W.flags;F.stage='dock';F.bumps=0;F.torn=0;
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.pero=true;W.fallY=-14;const T=HERO;
  heavenDecor(-370,20,{xw:16,stars:1,sunCol:0xfff4d8,sunY:40,sunX:-60});if(W.duskSun)W.duskSun.scale.setScalar(0.5);   // луна
  /* ---------- корабль ---------- */
  const ship=makeShip();const S={x:0,y:0,z:-8,roll:0,rollT:0,kick:0,speed:0,lit:false,grab:0,deckY:0};W.shipS=S;
  const DECK={deck:true};const DX=2.22,DZ=5.85;
  const deckY=(x)=>S.y-Math.tan(S.roll)*(x-S.x);
  const onDeck=(p,m)=>Math.abs(p.x-S.x)<DX+(m||0)&&Math.abs(p.z-S.z)<DZ+(m||0)&&p.y>deckY(p.x)-1.3&&p.y<deckY(p.x)+4.5;
  W.surfs.push((x,z,reach)=>{const lx=x-S.x,lz=z-S.z;if(Math.abs(lx)>DX||Math.abs(lz)>DZ)return null;const y=S.y-Math.tan(S.roll)*lx;return y<=reach+0.001?{y,ref:DECK}:null;});
  const rails=[];for(const s of[-1,1])for(const[z0,z1]of[[-5.7,-1.6],[1.6,5.7]])rails.push({s,z0,z1,b:colBox(0,0,0,0,0,0,false)});
  const bowR=colBox(0,0,0,0,0,0,false),sternR=colBox(0,0,0,0,0,0,false);const mastC={x:0,z:0,r:0.26,miny:0,maxy:0,on:true};W.cyls.push(mastC);
  const lanPos=new V3(),mastP=new V3();lightSrc(lanPos,8,()=>S.lit,6);
  // дыра в парусе: порыв или молния рвут парус — корабль летит вдвое тише, пока Йоша не срастит его мёртвой водой
  const tear=new THREE.Mesh(new THREE.PlaneGeometry(1.4,1.8),MB(0x1a1830,{transparent:true,opacity:0.85,side:THREE.DoubleSide}));tear.position.set(0.7,4.3,-0.32);tear.rotation.z=0.5;tear.visible=false;ship.hull.add(tear);
  // бочки на палубе: катятся по крену, весят по одному; Потап у бочки (умение) перекидывает её к другому борту
  const BARRELS=[{lx:-1.3,lz:-3.4},{lx:1.3,lz:-4.7}].map(b=>{const g=new THREE.Group();W.group.add(g);const inner=new THREE.Group();inner.rotation.x=Math.PI/2;g.add(inner);
    addMesh(new THREE.CylinderGeometry(0.36,0.36,0.85,12),M(0x8a5a2a),0,0,0,inner);for(const y of[-0.28,0.28])addMesh(new THREE.TorusGeometry(0.37,0.035,5,16),M(0x4a3a2a),0,y,0,inner).rotation.x=Math.PI/2;
    Object.assign(b,{g,pos:g.position,fly:null,hop:0,spin:0,c:{x:0,z:0,r:0.38,miny:0,maxy:0,on:true}});W.cyls.push(b.c);return b;});
  function placeShipCols(){const ty=Math.tan(S.roll);
    for(const r of rails){const ex=S.x+r.s*2.24,ey=S.y-ty*r.s*2.24;Object.assign(r.b,{minx:ex-0.08,maxx:ex+0.08,miny:ey-0.4,maxy:ey+0.6,minz:S.z+r.z0,maxz:S.z+r.z1});}
    Object.assign(bowR,{minx:S.x-2.3,maxx:S.x+2.3,miny:S.y-1.5,maxy:S.y+0.6,minz:S.z-6.05,maxz:S.z-5.85,on:!F.landed});Object.assign(sternR,{minx:S.x-2.3,maxx:S.x+2.3,miny:S.y-1.5,maxy:S.y+0.6,minz:S.z+5.85,maxz:S.z+6.05,on:F.stage!=='dock'});
    mastC.x=S.x;mastC.z=S.z-0.5;mastC.miny=S.y;mastC.maxy=S.y+7;lanPos.set(S.x,S.y+1.6,S.z+0.05);mastP.set(S.x,S.y,S.z-0.5);
    for(const b of BARRELS){const x=S.x+b.lx;b.pos.set(x,deckY(x)+0.36+b.hop,S.z+b.lz);b.g.rotation.z=-S.roll-b.spin;Object.assign(b.c,{x,z:b.pos.z,miny:b.pos.y-0.36,maxy:b.pos.y+0.36,on:!b.fly});}}
  placeShipCols();
  /* ---------- пристань и небо ---------- */
  cloudIsle(-6,6,-2,14,0);bell(-3.5,10);
  const Z=makeZven();W.zven=Z;Z.pos.set(0,3,6);
  const L1=linkItem(3.1,4.3,-32);
  // орешки под бортом: висят ниже палубы — дотянуться можно, только накренив корабль в их сторону
  const ARCS=[{s:-1,zs:[-44,-47.5,-51]},{s:1,zs:[-207,-210.5]}];
  for(const A of ARCS){A.its=A.zs.map(z=>nutItem(A.s*2.6,2.2,z));for(const z of A.zs)W.puffs.push({x:A.s*3.4,y:0.9,z,s:0.8});}
  /* ---------- ущелье ---------- */
  const rock=M(0x4a4868),rock2=M(0x3a3858);
  for(const s of[-1,1]){box(s*10.5-2,s*10.5+2,-20,14,-176,-62,rock,{solid:false});for(let z=-64;z>-176;z-=rand(5,8))addMesh(new THREE.DodecahedronGeometry(rand(1.6,2.8)),rock2,s*rand(8.2,9.2),rand(-6,10),z);}
  // уступы: one — крен от скалы (15°), big — высокий, нужен крен круче (30°: Потап и ещё один у борта), both — теснина, держать ровно,
  // hid — камень во тьме (виден в Совином взоре или во вспышке молнии), float — летучий утёс
  const LEDGES=[{z:-74,s:1,k:'one'},{z:-92,s:-1,k:'big'},{z:-114,k:'both'},{z:-128,s:1,k:'one',trio:1},{z:-137,s:-1,k:'one',trio:2},{z:-146,s:1,k:'one',trio:3},
    {z:-204,s:-1,k:'hid'},{z:-228,s:1,k:'hid'},{z:-262,s:-1,k:'float'},{z:-278,s:1,k:'float'},{z:-318,s:-1,k:'hid',storm:true}];
  function rockLedge(x,z,s,o){o=o||{};const g=new THREE.Group();g.position.set(x,1.8,z);W.group.add(g);const sy=o.sy||1,up=(sy-1)*0.55;
    addMesh(new THREE.BoxGeometry(6.4,1.1*sy,3),rock,0,up,0,g);addMesh(new THREE.DodecahedronGeometry(1.1),rock2,-s*2.6,0.3+up*2,0,g);
    const mark=addMesh(new THREE.ConeGeometry(0.4,0.9,4),M(COL.red,{emissive:COL.red,emissiveIntensity:0.9}),-s*2.8,1.4+up*2,0,g);mark.rotation.z=s*Math.PI/2;
    if(o.float)for(let i=0;i<3;i++)addMesh(new THREE.DodecahedronGeometry(rand(0.8,1.4)),rock2,rand(-2,2),-1.2-i*0.9,rand(-1,1),g);
    return {g,mark};}
  for(const L of LEDGES){if(L.k==='both'){const a=rockLedge(-6.2,L.z,-1),b=rockLedge(6.2,L.z,1);L.g=a.g;L.gs=[a.g,b.g];L.marks=[a.mark,b.mark];continue;}
    const r=rockLedge(L.s*(L.k==='float'?6.8:6.6),L.z,L.s,{sy:L.k==='big'?2.2:1,float:L.k==='float'});L.g=r.g;L.gs=[r.g];L.marks=[r.mark];if(L.k==='hid')L.g.visible=false;}
  // камнепад: камень на карнизе над ущельем — Прошка сбивает его рогаткой, пока корабль не под ним
  const STONES=[{z:-101,s:1},{z:-156,s:-1}];
  for(const St of STONES){St.g=new THREE.Group();St.g.position.set(St.s*7.4,9.5,St.z);W.group.add(St.g);addMesh(new THREE.BoxGeometry(2.6,0.6,2.2),rock,St.s*0.9,-0.5,0,St.g);
    St.mat=M(0x6a6488,{emissive:COL.red,emissiveIntensity:0});St.m=addMesh(new THREE.DodecahedronGeometry(0.85),St.mat,0,0.35,0,St.g);St.pos=new V3(St.s*7.4,9.85,St.z);
    W.marks.push({pos:St.pos,active:()=>!St.done&&!St.fall&&S.z-St.z<20,onHit:()=>{if(St.done||St.fall)return;St.done=true;St.m.visible=false;SFX.ok();burst(St.pos.clone(),0x8a88a8,22,5);
      floatText(St.pos.clone().add(new V3(0,0.8,0)),'Сбил!','#ffe36b');F.stonesShot=(F.stonesShot||0)+1;}});}
  const n3=nutItem(0,6.2,-120);
  // низкая арка в конце ущелья и низкая грозовая туча: с горящим фонарём мачта цепляет, без света корабль ныряет
  const ARCHES=[{z:-166,k:'arch'},{z:-306,k:'cloud'}];
  for(const A of ARCHES){if(A.k==='arch'){box(-12,12,8.6,11.6,A.z-1.6,A.z+1.6,rock,{solid:false});for(let i=0;i<5;i++)addMesh(new THREE.DodecahedronGeometry(rand(0.5,0.9)),rock2,rand(-7,7),8.5,A.z+rand(-1,1));}
    else{const dm=M(0x2e2c48);for(let i=0;i<16;i++)addMesh(new THREE.SphereGeometry(rand(1.2,1.6),10,8),dm,rand(-10,10),rand(9.8,10.6),A.z+rand(-2,2));}}
  /* ---------- тёмные тучи ---------- */
  // облачка по бортам — фонарь корабля зажигает на них светомостики
  const SIDE=[{z:-192,s:1,item:'link'},{z:-216,s:-1,item:'nut'},{z:-238,s:1,item:'link'}];
  for(const C of SIDE){cloudIsle(C.s*7.2-2,C.s*7.2+2,C.z-2,C.z+2,3,{topMat:M(0x5a5680),sideMat:M(0x3a3860)});mostki('light',[[C.s*2.5,3,C.z],[C.s*5.3,3,C.z]],{w:1.8});
    C.it=C.item==='link'?linkItem(C.s*7.6,4.1,C.z):nutItem(C.s*7.6,3.6,C.z);edgeSign(C.s*8.6,3,C.z+1.4,'light');
    for(let i=0;i<5;i++)W.puffs.push({x:C.s*rand(10,16),y:rand(0,8),z:C.z+rand(-6,6),s:rand(2,3.4),far:true});}
  // тучки-насесты: сюда ворона утаскивает фонарь; к ним — тенемостки (держат только во тьме)
  const PERCH=[{z:-252,s:-1},{z:-266,s:1},{z:-283,s:-1}];
  for(const P of PERCH){P.top=2.2;cloudIsle(P.s*8.8-2.2,P.s*8.8+2.2,P.z-2.2,P.z+2.2,P.top,{topMat:M(0x3a3658),sideMat:M(0x2a2848)});edgeSign(P.s*6.9,P.top,P.z+1.5,'shadow');}
  // гроза: тёмные тучи стеной
  for(let i=0;i<40;i++)W.puffs.push({x:(Math.random()<0.5?-1:1)*rand(9,20),y:rand(2,14),z:rand(-330,-288),s:rand(2.4,4),far:true});
  const n4=nutItem(3.1,4.3,-298);
  // гнездо Гусей-лебедей: здесь корабль садится
  cloudIsle(-10,10,-362,-332,3);nestMesh(0,3,-352,3.4);for(let i=0;i<5;i++){const g=makeGoose(1);g.g.position.set(-5+i*2.5,3.4,-356+Math.sin(i)*1.5);g.g.rotation.y=Math.PI*0.9;}
  const L4=linkItem(0,4.2,-344),n5=nutItem(7.4,3.6,-358);bell(-4,-336,3);
  // тайник: чёрный ключ вороны — поймать на лету у борта
  const keyNut=nutItem(0,-60,-200);keyNut.locked=true;keyNut.g.visible=false;
  /* ---------- ветер-свистун, молния ---------- */
  const face=new THREE.Group();face.visible=false;W.group.add(face);{const fm=M(0xd8d4f0,{emissive:0x403860,emissiveIntensity:0.3});
    for(const[x,y,z,r]of[[0,0,0,1.6],[-1.2,0.6,0.3,1],[1.2,0.6,0.3,1],[0,1.1,0.2,1.1],[-1.1,-0.6,0.4,0.9],[1.1,-0.6,0.4,0.9]])addMesh(new THREE.SphereGeometry(r,12,10),fm,x,y,z,face);
    for(const s of[-1,1]){addMesh(new THREE.SphereGeometry(0.2,8,6),MAT.dark,s*0.55,0.45,1.45,face);}face.mouth=addMesh(new THREE.TorusGeometry(0.32,0.12,6,16),MAT.dark,0,-0.35,1.5,face);}
  const bolt=new THREE.Group();bolt.visible=false;W.group.add(bolt);{const bm=MB(0xeaf2ff);let x=0,y=0;for(let i=0;i<6;i++){const nx=x+rand(-0.9,0.9),ny=y-1.8;const sg=addMesh(new THREE.BoxGeometry(0.12,1.95,0.12),bm,(x+nx)/2,(y+ny)/2,0,bolt);sg.rotation.z=Math.atan2(nx-x,1.8);x=nx;y=ny;}}
  function lightning(at,strike){bolt.position.copy(at);bolt.visible=true;$('flash').style.opacity=strike?0.7:0.45;F.flashT=0.7;later(0.14,()=>{$('flash').style.opacity=0;});later(0.28,()=>{bolt.visible=false;});
    tone(70,0.9,'sawtooth',0.16,38,0.15);if(strike)SFX.crash();}
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
        tip(0,'Потап тяжёл, как трое! Встанет у борта — корабль наклонится.<br>Переводи его от борта к борту — пусть корабль ровно помчится.',4);tip(1,'Пелагея держит фонарь. Крен потянет — у мачты щит '+K(1,'guard')+' держи.<br>А за Йошу '+K(1,'swap')+' сыграешь — Пелагея и сама фонарь удержит.',3.6);}});}
  // крыло ломается: короткий ролик, потом — держаться за мачту, пока Прошка прибивает вёдра-крылья
  const buckets=[];for(let i=0;i<3;i++){const g=new THREE.Group();g.visible=false;W.group.add(g);addMesh(new THREE.CylinderGeometry(0.28,0.2,0.4,10,1,true),new THREE.MeshLambertMaterial({color:0x8a8a94,side:THREE.DoubleSide}),0,0,0,g);
    addMesh(new THREE.BoxGeometry(0.9,0.03,0.3),M(0xd8d0f0),0.5,0,0,g);buckets.push({g,st:0,lz:-2+i*1.4,y:0,x:2.5});}
  function wingScene(){F.stage='wing';const pr=T.proshka,po=T.potap,pe=T.pelageya;if(active(0)!==po)doSwap(0);if(active(1)!==pe)doSwap(1);
    placeOnGround(po,S.x+0.5,S.z+0.2,S.y+0.3);po.face=Math.PI;placeOnGround(pe,S.x-0.5,S.z+0.6,S.y+0.3);pe.face=Math.PI;placeOnGround(pr,S.x+1.7,S.z+2.4,S.y+0.3);pr.face=Math.PI/2;
    play({dur:9.6,fov:48,camK:2.6,shots:[shot(0,[7,3.4,S.z+6],[0,3,S.z]),shot(3.6,[2.6,4.4,S.z+3],[S.x+0.5,4,S.z-0.2]),shot(6.4,[6,3.4,S.z+2],[S.x+2.4,3,S.z+2.4])],
      says:[[0.3,3.4,null,'<i>Порыв — и корабль встаёт почти боком. Одно крыло сломано.</i>',true],[3.9,2.6,'potap','Держу мачту. Чини, не медли!'],
        [6.6,2.9,'proshka','Запасные крылья! Из вёдер. Я предусмотрел — я не промах!']],
      events:[{t:0.2,fn:()=>{SFX.whoosh();shakeAll(0.05,0.8);}}],
      tick:(t)=>{S.roll=damp(S.roll,0.62,2,1/60);po.guard=true;},
      end:()=>{po.guard=false;placeShipCols();aboard();F.stage='brace';F.braceT=0;F.braceHeld=0;W.noSwap=()=>F.stage==='brace';W.noSwapTip='Корабль на боку — держись за мачту, не до смены!';
        banner('Держитесь за мачту!','#ffd76a',2.6,'корабль на боку — у мачты щит '+K(0,'guard')+' держи, не то съедешь за борт');
        tip(0,'Потап — у мачты, щит '+K(0,'guard')+' держи, пока Прошка вёдра прибивает!',3.4);tip(1,'Пелагея — у мачты, щит '+K(1,'guard')+' держи: съедешь — фонарь погаснет!',3.4);}});}
  function braceTick(dt){const pr=T.proshka,po=T.potap;F.braceT+=dt;const t=F.braceT;S.roll=damp(S.roll,t<9.4?0.62:0.3,2,dt);
    if(po.active&&po.guard&&hd(po.pos,mastP)<1.9)F.braceHeld+=dt;
    buckets.forEach((b,i)=>{const t0=1.0+i*1.6,t1=6.2+i*0.8;
      if(b.st===0&&t>=t0){b.st=1;b.g.visible=true;SFX.hammer();later(0.3,()=>SFX.hammer());pr.atkT=0.3;pr.face=Math.PI/2;floatText(new V3(S.x+2.3,S.y+1.4,S.z+b.lz),'Тук-тук!','#ffd9a0');}
      if(b.st===1&&t>=t1){b.st=2;tone(1900-i*200,0.5,'triangle',0.2);floatText(new V3(S.x+2.5,S.y+1,S.z+b.lz),'Дзынь!','#c8c8d8');b.f=0;
        if(i===2)later(0.6,()=>banner('Дзынь, дзынь, дзынь!','#c8c8d8',2,'вёдра-крылья Прошки улетели вниз · Потап мачту держит'));}
      if(b.st===1){b.g.position.set(S.x+b.x,deckY(S.x+b.x)-0.3,S.z+b.lz);b.g.rotation.z=-0.4-S.roll;}
      if(b.st===2){b.f+=dt;const k=b.f/2.4;b.g.position.set(S.x+b.x+k*2,deckY(S.x+b.x)-0.3-k*k*14,S.z+b.lz+k*1.5);b.g.rotation.x+=0.2;if(k>=1){b.st=3;b.g.visible=false;}}});
    if(t>=10.4){F.stage='hold';W.noSwap=null;buckets.forEach(b=>{b.g.visible=false;});const ok=F.braceHeld>=t*0.6;
      if(ok){SFX.ok();floatText(po.pos.clone().add(new V3(0,2.4,0)),'Удержались!','#ffe36b');}
      F.gusts=0;F.gustNext=1.6;F.gustSeq=0;banner('Ветер со всех сторон!','#ffd76a',2.6,'туча с лицом дует — откуда, туда и смотри: жёлтый кружок покажет, где Потапу стать');}}
  function landScene(){F.stage='landing';F.landed=true;
    play({dur:9,fov:48,shots:[shot(0,[10,7,S.z+4],[0,3.5,S.z-8]),shot(4.4,[4,4.4,-332],[0,3.8,-344])],
      says:[[0.3,3.6,null,'<i>Звено за звеном — и корабль у гнезда Гусей-лебедей садится.</i>',true],[4.6,3.4,null,'<i>В гнезде пусто. Гуси улетели — и, видно, не одни.</i>',true]],
      end:()=>{F.stage='landed';banner('Причалили!','#ffd76a',2,'на берег — к гнезду, скорей');}});}
  /* ---------- вес и крен ---------- */
  // Потап весит 3, остальные герои, бочки и вороны на палубе — по 1; разница от 2 — крен 15°, от 4 — 30°
  let crows=[];
  const weight=()=>{let d=0;for(const h of HEROES){if(h.cling||!onDeck(h.pos))continue;const lx=h.pos.x-S.x;if(Math.abs(lx)<0.5)continue;d+=(h.kind==='potap'?3:1)*Math.sign(lx);}
    for(const b of BARRELS)if(!b.fly&&Math.abs(b.lx)>=0.5)d+=Math.sign(b.lx);
    for(const e of crows)if(e.alive&&!e.appr&&!e.flying&&onDeck(e.pos)&&Math.abs(e.pos.x-S.x)>=0.5)d+=Math.sign(e.pos.x-S.x);
    return d;};
  function throwBarrel(b,h){const s0=Math.abs(b.lx)>0.5?-Math.sign(b.lx):(Math.sin(h.face)>=0?1:-1),from=b.lx,to=s0*1.55;b.fly=true;F.throws=(F.throws||0)+1;h.atkT=0.28;SFX.toss();
    floatText(b.pos.clone().add(new V3(0,0.9,0)),'Ух!','#ffd9a0');if(!F.barrelBark){F.barrelBark=true;later(0.5,()=>bark(h,'potap','Бочка — тоже вес. Как я. Почти.',2.2,true));}
    anim(0.7,k=>{b.lx=lerp(from,to,k);b.hop=Math.sin(k*Math.PI)*1.6;b.spin+=0.25;if(k>=1){b.fly=null;b.hop=0;SFX.thud();burst(b.pos.clone(),0x8a5a2a,6,2);}});}
  for(const b of BARRELS)W.lifts.push({pos:b.pos,active:()=>!b.fly&&F.launched&&!F.landed&&!G.cine,onLift:h=>throwBarrel(b,h)});
  /* ---------- удары, парус ---------- */
  function bump(at,s,txt){SFX.crash();shakeAll(0.06,0.5);S.kick=s*0.35;S.speed*=0.4;burst(at,0x8a88a8,20,5);F.bumps++;
    floatText(at.clone().add(new V3(0,1,0)),txt+' · царапин: '+F.bumps,'#ff8a7a');
    for(const pi of[0,1]){const h=active(pi);if(onDeck(h.pos)){h.vel.y=2.6;h.vel.x=-s*1.6;h.grounded=false;h.knockT=0.3;}}}
  function tearSail(){if(F.torn>0||!F.launched||F.landed)return;F.torn=16;SFX.rip();tear.visible=true;floatText(new V3(S.x,S.y+5.6,S.z-0.4),'Парус порван!','#ff8a7a');
    if(!F.tornTip){F.tornTip=true;tip(1,'Парус порван — корабль еле ползёт! Йошей '+K(1,'swap')+' к мачте — мёртвой водой '+K(1,'skill')+' срасти.',3.6);}}
  W.waterTargets.push({pos:mastP,pri:1,active:()=>F.torn>0,onWater:h=>{if(!(F.torn>0))return;F.torn=0;tear.visible=false;SFX.ok();burst(new V3(S.x,S.y+4.3,S.z-0.4),0x7ad8ff,16,3);
    floatText(new V3(S.x,S.y+5.4,S.z-0.4),'Мёртвая вода — парус цел!','#9fe6ff');F.patched=(F.patched||0)+1;}});
  /* ---------- порывы ---------- */
  // mast — Потап у мачты со щитом; side — ветер с борта: вес к наветренному борту; lantern — ветер на фонарь: Потап со щитом между ветром и фонарём
  const GSEQ=[{k:'side',s:1},{k:'lantern',s:-1},{k:'mast'},{k:'side',s:-1},{k:'lantern',s:1}];
  const gustTxt=g=>g.k==='mast'?['Порыв ветра!','жёлтый кружок у мачты: Потап, встань туда и щитом '+K(0,'guard')+' закройся']
    :g.k==='side'?[g.why||('Ветер '+(g.s>0?'справа':'слева')+'!'),'корабль клонит — Потапа к '+(g.s>0?'правому':'левому')+' борту, в жёлтый кружок: вес против ветра']
    :['Ветер на фонарь!','задует перо! Потап, в кружок '+(g.s>0?'справа':'слева')+' от фонаря — и щитом '+K(0,'guard')+' прикрой'];
  function startGust(o){const g=F.gustA={t:0,tel:1.0,dur:2.0,k:o.k,s:o.s||(Math.random()<0.5?1:-1),why:o.why};SFX.whoosh();const tx=gustTxt(g);banner(tx[0],'#ffd76a',2.2,tx[1]);}
  const gustPos=g=>g.k==='mast'?new V3(S.x,0,S.z-0.5):g.k==='side'?new V3(S.x+g.s*1.6,0,S.z+2.6):new V3(S.x+g.s*1.0,0,S.z+0.05);
  const gustOk=g=>{const P=T.potap,rp=gustPos(g);if(g.k==='side')return weight()*g.s>=2;return P.active&&P.guard&&hd(P.pos,rp)<(g.k==='mast'?1.9:1.1);};
  function gustTick(dt){const g=F.gustA;g.t+=dt;const k=clamp((g.t-g.tel)/g.dur,0,1),rp=gustPos(g);
    face.visible=true;face.position.set(S.x+g.s*9,S.y+2.8,S.z-1);face.rotation.y=-g.s*Math.PI/2;face.scale.setScalar(1+0.12*Math.sin(G.time*12));face.mouth.scale.setScalar(0.8+0.5*k);
    if(Math.random()<dt*10)burst(face.position.clone().add(new V3(-g.s*1.8,rand(-0.6,0.6),rand(-1,1))),0xe8f0ff,2,3,0.6);
    gRing.visible=g.t>=g.tel;gRing.position.set(rp.x,deckY(rp.x)+0.15,rp.z);gRing.scale.setScalar(g.k==='mast'?lerp(3.2,0.6,k):lerp(2.2,0.5,k));gRing.material.color.setHex(k>0.85?0xffffff:COL.yellow);
    if(g.t<g.tel+g.dur)return;F.gustA=null;gRing.visible=false;face.visible=false;const P=T.potap;
    if(gustOk(g)){SFX.shield();SFX.ok();floatText(P.pos.clone().add(new V3(0,2.4,0)),g.k==='mast'?'Удержал мачту!':g.k==='side'?'Вес — против ветра!':'Фонарь укрыт!','#ffe36b');burst(P.pos.clone().add(new V3(0,1.2,0)),0xffffff,12,3);
      if(F.stage==='hold')F.gusts++;return;}
    SFX.whoosh();shakeAll(0.05,0.4);const sd=-g.s;S.kick=sd*0.45;for(const pi of[0,1]){const h=active(pi);if(onDeck(h.pos)&&!(h.kind==='potap'&&h.guard)){h.vel.x=sd*2.6;h.vel.y=2.8;h.grounded=false;h.knockT=0.35;}}
    floatText(new V3(S.x,S.y+3,S.z),'Порыв!','#ffd76a');
    if(g.k==='lantern'){let out=false;for(const h of HEROES)if(h.lit&&hd(h.pos,lanPos)<2.5){h.lit=false;out=true;}if(out){SFX.red();floatText(lanPos.clone().add(new V3(0,1,0)),'Задуло перо!','#ff8a7a');}}
    else tearSail();
    tip(0,g.k==='mast'?'Порыв ветра! Потап, в жёлтый кружок у мачты встань —<br>И щитом '+K(0,'guard')+' закройся, как стена, как грань.':g.k==='side'?'Ветер с борта! Потапа — в кружок у того борта, откуда дует:<br>вес против ветра — корабль не завалится.':'Ветер на фонарь! Потап — в кружок у фонаря, щит '+K(0,'guard')+' к ветру,<br>и перо Пелагеи не погаснет.',2.8);
    if(F.stage==='hold')F.gusts+=0.5;}
  /* ---------- вороны-мороки ---------- */
  F.wave=0;
  function spawnCrows(n){F.wave++;for(let i=0;i<n;i++){const s=i%2?1:-1,lz=-2.6+i*1.9,lx=s*1.2;
      const e=voronaFoe(S.x+s*10,S.z+lz-7,{y:S.y+3,leash:30,signals:['yellow','blue'],onDeath:crowDeath});e.state='idle';e.t=0;e.cd=99;e.noMove=true;e.flying=true;e.g.visible=false;
      e.appr={t:-i*0.8,dur:3.8,s,lx,lz};e.lanM=addMesh(new THREE.BoxGeometry(0.3,0.42,0.3),M(0xfff0c0,{emissive:0xffa040,emissiveIntensity:1.4}),0,0.3,0.45,e.g);e.lanM.visible=false;crows.push(e);
      W.marks.push({pos:e.pos,active:()=>e.alive&&!!e.appr&&e.appr.t>0.3,onHit:()=>{if(!e.alive||!e.appr)return;e.slung=true;e.appr=null;e.g.visible=true;SFX.ok();
        floatText(e.pos.clone().add(new V3(0,1.6,0)),'Сбил рогаткой!','#ffe36b');F.slung=(F.slung||0)+1;unravel(e);}});}
    banner(F.wave===1?'Вороны-мороки!':'Ещё вороны!','#c8c8d8',2.4,'у каждой на шее — чёрный ключ · хватают фонарь — гоните прочь!');
    if(F.wave===1){later(1.6,()=>say('zven','Ключи на воронах… Это Кощей их прислал, не иначе!',2.6,true));tip(0,'Вороны летят! Прошкой '+K(0,'swap')+' — рогаткой '+K(0,'skill')+' сбей на подлёте.<br>Севшая ворона весит — корабль кренит!',3.6);}}
  // ключ убитой на палубе вороны отлетает к борту и падает — поймай у фальшборта, пока не упал (тайник: орешек)
  function crowDeath(e){if(e.slung||(F.stolen&&F.stolen.c===e)||!onDeck(e.pos))return;const lx0=e.pos.x-S.x,lz=e.pos.z-S.z,sk=Math.sign(lx0)||1,y0=e.pos.y-deckY(e.pos.x)+1;
    const km=new THREE.Group();W.group.add(km);const kmat=M(0x1a1a22,{emissive:0x302848,emissiveIntensity:0.6});addMesh(new THREE.TorusGeometry(0.14,0.04,6,12),kmat,0,0.2,0,km);addMesh(new THREE.BoxGeometry(0.05,0.36,0.05),kmat,0,-0.05,0,km);
    floatText(e.pos.clone().add(new V3(0,1.4,0)),'Ключ падает — лови!','#c8c8d8');let got=false;const KY=W.k34.key={p:new V3(),got:false};
    anim(2.0,k=>{const lx=lerp(lx0,sk*3.6,k),x=S.x+lx,y=deckY(S.x+clamp(lx,-DX,DX))+y0+3*k-9*k*k,p=new V3(x,y,S.z+lz);km.position.copy(p);km.rotation.y+=0.3;KY.p.copy(p);
      if(!got&&Math.abs(lx)>1.5)for(const h of HEROES){if(h.cling||!onDeck(h.pos))continue;if(hd(h.pos,p)<1.2&&p.y-h.pos.y>-0.5&&p.y-h.pos.y<2.4){got=KY.got=true;km.visible=false;SFX.keys();
        if(!F.keyGot){F.keyGot=true;G.flags.key34=true;keyNut.locked=false;keyNut.pos.copy(h.pos);takeItem(keyNut,h);banner('Чёрный ключ пойман!','#c8c8d8',2.4,'Кощеев ключ — в котомку · за ловкость — орешек');}
        else floatText(p.clone().add(new V3(0,0.6,0)),'+ключ','#c8c8d8');break;}}
      if(k>=1)W.group.remove(km);});}
  // ворона утаскивает фонарь на тучу-насест: тенемостки к ней держат только во тьме; побить ворону — фонарь вернётся
  function startChase(c){F.chaseUsed=true;const P=PERCH.reduce((b,p)=>Math.abs(p.z-S.z)<Math.abs(b.z-S.z)?p:b),id=(F.chaseId||0)+1;F.chaseId=id;
    F.stolen={c,P,t:0,id};ship.lantern.visible=false;S.speed*=0.3;for(const h of HEROES)if(h.lit&&hd(h.pos,lanPos)<1.8)h.lit=false;
    c.noMove=true;c.flying=true;c.cd=2;c.lanM.visible=true;const f=c.pos.clone(),to=new V3(P.s*9.2,P.top,P.z);c.home.copy(to);
    anim(1.4,k=>{if(!c.alive||!F.stolen||F.stolen.c!==c)return;c.pos.set(lerp(f.x,to.x,k),lerp(f.y,to.y,k)+Math.sin(k*Math.PI)*2,lerp(f.z,to.z,k));if(k>=1)c.flying=false;});
    mostki('shadow',[[S.x+P.s*1.7,P.top,S.z-0.6],[P.s*6.9,P.top,P.z]],{w:1.6,on:()=>!!F.stolen&&F.stolen.id===id});
    SFX.red();banner('Ворона фонарь утащила!','#ff8a7a',2.6,'на тучу '+(P.s>0?'справа':'слева')+' · тенемостки держат только во тьме: перо погаси '+K(1,'item')+' — и бегом');
    later(1.6,()=>say('zven','Догоняйте! Тенемостки — по тьме, по тьме!',2.6,true));}
  function chaseTick(dt){const st=F.stolen,c=st.c;st.t+=dt;if(!c.alive||st.t>30){F.stolen=null;ship.lantern.visible=true;c.lanM.visible=false;SFX.ok();burst(lanPos.clone(),0xffe0a0,14,3);
      if(c.alive){c.noMove=false;c.flying=true;const f=c.pos.clone();anim(1.2,k=>{if(!c.alive)return;c.pos.set(lerp(f.x,S.x+1.2,k),lerp(f.y,S.y,k)+Math.sin(k*Math.PI)*2,lerp(f.z,S.z+1.5,k));if(k>=1){c.flying=false;c.home.copy(c.pos);}});
        banner('Ворона фонарь уронила!','#ffd76a',2,'звенышко принесло его назад · Пелагея, перо в фонарь '+K(1,'item'));}
      else banner('Фонарь вернули!','#ffd76a',2,'Пелагея, перо в фонарь '+K(1,'item')+' — и летим');}}
  function crowTick(dt){const lan=lanPos;
    // подлёт: ворона летит к палубе — Прошка может сбить её рогаткой
    for(const e of crows){if(!e.alive||!e.appr)continue;const a=e.appr;a.t+=dt;if(a.t<0){e.g.visible=false;continue;}e.g.visible=true;const k=smooth(clamp(a.t/a.dur,0,1)),lx=lerp(a.s*10,a.lx,k);
      e.pos.set(S.x+lx,lerp(S.y+3.2,deckY(S.x+a.lx),k)+Math.sin(k*Math.PI)*1.2,S.z+lerp(a.lz-7,a.lz,k));e.face=Math.atan2(-a.s,0.3);e.cd=99;
      if(a.t>=a.dur){e.appr=null;e.noMove=false;e.flying=false;e.cd=rand(0.8,1.6);e.home.copy(e.pos);SFX.thud();floatText(e.pos.clone().add(new V3(0,1.6,0)),'Села!','#c8c8d8');}}
    if(F.stolen)return;
    const holder=HEROES.find(h=>!h.active&&heroLight(h)&&hd(h.pos,lan)<1.8);
    if(!F.grabber&&S.lit&&holder){F.grabCd=(F.grabCd||4)-dt;if(F.grabCd<=0){const c=crows.find(e=>e.alive&&e.state==='idle'&&!e.appr);if(c){F.grabber=c;c.grabT=0;c.noMove=true;SFX.red();floatText(lan.clone().add(new V3(0,1.2,0)),'Хватает фонарь!','#ff8a7a');}F.grabCd=rand(5,8);}}
    const c=F.grabber;if(c){if(!c.alive||c.state==='stagger'||c.state==='broken'||c.state==='dying'||!S.lit){if(c.alive)c.noMove=false;F.grabber=null;if(c.alive&&(c.state==='stagger'||c.state==='broken'))floatText(lan.clone().add(new V3(0,1.2,0)),'Отогнали!','#ffe36b');return;}
      c.grabT+=dt;c.cd=Math.max(c.cd,1);if(c.state==='ready'||c.state==='wind')c.state='idle';const tx=lan.x+0.9,tz=lan.z+0.4;c.pos.x=damp(c.pos.x,tx,4,dt);c.pos.z=damp(c.pos.z,tz,4,dt);c.pos.y=damp(c.pos.y,S.y+1.2,4,dt);c.flying=true;
      c.S.sig.visible=true;c.S.sr.visible=true;c.S.sy.visible=c.S.sb.visible=false;c.S.tRing.visible=true;c.S.tRing.scale.setScalar(lerp(1.9,0.44,clamp(c.grabT/2.2,0,1)));c.S.halo.material.color.setHex(COL.red);
      if(c.grabT>=2.2){const hp=holder?players[holder.player]:null;F.grabber=null;c.noMove=false;c.flying=false;c.pos.y=deckY(c.pos.x);
        if(holder&&hp.spirit>0.45){hp.spirit-=0.45;SFX.shield();burst(holder.pos.clone().add(new V3(0,0.9,0)),0xffffff,10,3);floatText(holder.pos.clone().add(new V3(0,holder.d.height+0.6,0)),'Щит — у фонаря!','#cfe8ff');
          if(hp.spirit<0.5)tip(holder.player,'Щит у Пелагеи вот-вот устанет — гоните ворон от фонаря!',3);}
        else if(!F.chaseUsed)startChase(c);
        else{S.grab=5;if(holder)holder.lit=false;SFX.crash();floatText(lan.clone().add(new V3(0,1.2,0)),'Фонарь погас!','#ff8a7a');banner('Ворона перо выбила!','#ff8a7a',2.2,'фонарь погас — корабль падает · встань у фонаря да перо зажги опять');}}}}
  W.onFirstUnravel=()=>{later(0.5,()=>bark(T.potap,'potap','Кыш! С палубы, прочь!',1.8));};
  // Совиный взор Пелагеи: показывает камни во тьме впереди
  W.onOwl=h=>{for(const L of LEDGES){if(L.k!=='hid'||L.done||L.seen)continue;const dd=S.z-L.z;if(dd<34&&dd>-2)seeRock(L,'Совиный взор:');}};
  function seeRock(L,how){L.seen=true;L.g.visible=true;if(F.owlNeed===L)F.owlNeed=null;SFX.red();banner(how+' камень '+(L.s>0?'справа':'слева')+'!','#ff8a7a',2,'Потапа — к '+(L.s>0?'левому':'правому')+' борту: корабль наклонится, крыло над камнем пролетит');}
  /* ---------- шаг корабля ---------- */
  W.updates.push(dt=>{
    const prev={x:S.x,y:S.y,z:S.z};F.flashT=Math.max(0,(F.flashT||0)-dt);
    const holderLit=HEROES.some(h=>heroLight(h)&&hd(h.pos,lanPos)<1.8&&Math.abs(h.pos.y-deckY(h.pos.x))<1.6);S.grab=Math.max(0,S.grab-dt);S.lit=holderLit&&S.grab<=0&&!F.stolen;
    if(F.stage==='dock'&&S.lit&&!G.cine)launchScene();
    const flying=F.stage==='fly'||F.stage==='hold';
    // арка / низкая туча впереди: без света корабль не встаёт, а ныряет вниз
    const A=ARCHES.find(a=>!a.done||S.z-a.z>-5);const add=A?S.z-A.z:99,glide=!!A&&add<14&&add>-4&&flying;F.diveNow=!!A&&flying&&(A.done?add>-3:add<11);
    // скорость по участкам; без фонаря паруса висят — корабль встаёт и проседает; рваный парус — вдвое тише
    let want=0;if(flying){want=S.z>-62?3:S.z>-176?2.6:S.z>-242?2:S.z>-290?1.8:1.6;if(F.stage==='hold')want=0;
      if(S.z<-288&&!F.crowsDone){want=0;if(!F.crowWait){F.crowWait=true;banner('Вороны не пускают!','#c8c8d8',2,'прогоните всех — тогда и в грозу');}}if(S.z<=-326)want=0;
      if(!S.lit)want=glide?2:0;if(F.torn>0)want*=0.5;}
    S.speed=damp(S.speed,want,1.5,dt);S.z-=S.speed*dt;
    if(F.launched&&F.stage!=='launch'&&F.stage!=='wing'){const ty=F.stolen?2.2:S.lit||F.landed?3:glide?0.7:1.8;S.y=damp(S.y,ty,S.lit?1.2:glide?1.1:F.stolen?0.8:0.4,dt);}
    // крен от веса (кроме ролика, пристани и «держись за мачту» — там крен задан; фонарь утащен — паруса висят, корабль выравнивается к мосткам)
    if(F.stage!=='wing'&&F.stage!=='dock'&&F.stage!=='launch'&&F.stage!=='brace'&&!F.landed){const d=weight();
      S.rollT=F.stolen?0:Math.abs(d)>=4?Math.sign(d)*0.52:Math.abs(d)>=2?Math.sign(d)*0.26:0;S.kick=damp(S.kick,0,1.4,dt);S.roll=damp(S.roll,S.rollT+S.kick,1.6,dt);}
    else if(F.landed)S.roll=damp(S.roll,0,3,dt);
    if(F.stage==='brace'&&!G.cine)braceTick(dt);
    S.x=Math.sin(G.time*0.3)*0.3*(flying?1:0);
    const dx=S.x-prev.x,dy=S.y-prev.y,dz=S.z-prev.z;
    for(const h of HEROES){if(h.cling)continue;if(h.groundRef===DECK||(!h.grounded&&Math.abs(h.pos.x-prev.x)<DX+0.2&&Math.abs(h.pos.z-prev.z)<DZ+0.2&&h.pos.y>prev.y-1.3&&h.pos.y<prev.y+4.5)){h.pos.x+=dx;h.pos.z+=dz;if(h.groundRef===DECK)h.pos.y+=dy;}}
    for(const e of W.enemies){if(!e.alive||e.appr)continue;if(Math.abs(e.pos.x-S.x)<DX+0.6&&Math.abs(e.pos.z-S.z)<DZ+0.6){e.pos.x+=dx;e.pos.z+=dz;e.home.x+=dx;e.home.z+=dz;if(!e.flying&&e.state!=='spawn')e.pos.y=deckY(e.pos.x);}}
    // по крену съезжают (до края палубы — крен за борт не сбрасывает, и в проходе посередине тоже): кувырок уносит далеко; держится тот, кто у мачты со щитом
    if(Math.abs(S.roll)>0.05)for(const pi of[0,1]){const h=active(pi);if(!h.grounded||h.groundRef!==DECK)continue;if(F.stage==='brace'&&G.solo&&pi!==G.soloPi)continue;
      if(h.guard&&hd(h.pos,mastP)<1.9)continue;const lim=DX-h.d.radius*0.8;h.pos.x=clamp(h.pos.x+Math.sin(S.roll)*(h.rollT>0?7:2.2)*dt,S.x-Math.max(lim,Math.abs(h.pos.x-S.x)),S.x+Math.max(lim,Math.abs(h.pos.x-S.x)));}
    // бочки катятся по крену
    if(F.launched&&!F.landed)for(const b of BARRELS){if(b.fly)continue;if(Math.abs(S.roll)>0.1){const v=Math.sin(S.roll)*2.6,lx=clamp(b.lx+v*dt,-(DX-0.42),DX-0.42);b.spin+=(lx-b.lx)/0.36;b.lx=lx;}}
    // борта держат: на палубе у фальшборта не выпасть (кроме прохода посередине)
    for(const h of HEROES){if(h.cling)continue;const air=h.groundRef!==DECK;if(air&&!(Math.abs(h.pos.x-S.x)<DX+0.5&&Math.abs(h.pos.z-S.z)<DZ&&h.pos.y>deckY(h.pos.x)-0.4&&h.pos.y<deckY(h.pos.x)+1.2))continue;const lz=h.pos.z-S.z,r=h.d.radius;if(Math.abs(lz)>1.6)h.pos.x=clamp(h.pos.x,S.x-DX+r*0.8,S.x+DX-r*0.8);
      if(!(F.landed&&lz<0)&&!(F.stage==='dock'&&lz>0))h.pos.z=clamp(h.pos.z,S.z-DZ+r*0.8,S.z+DZ-r*0.8);}
    placeShipCols();ship.g.position.set(S.x,S.y,S.z);ship.g.rotation.z=-S.roll;ship.hull.position.y=Math.sin(G.time*1.2)*0.03;
    ship.sailMat.emissiveIntensity=damp(ship.sailMat.emissiveIntensity,S.lit?0.9:0,3,dt);ship.sail.scale.y=damp(ship.sail.scale.y,S.lit?1:0.55,3,dt);ship.sail.position.y=4.0+(1-ship.sail.scale.y)*1.6;
    ship.sail.scale.x=F.torn>0?0.85+0.08*Math.sin(G.time*9):1;
    ship.lanM.emissiveIntensity=S.lit?1.6+0.3*Math.sin(G.time*8):0.08;ship.wings.forEach(w=>{w.wp.rotation.z=w.s*Math.sin(G.time*(S.speed>0.3?4:1)+w.k)*0.35;});
    if(F.launched)setCP();
    // оставшийся далеко позади (на облаке, в пропасти) — назад на корабль
    if(F.launched&&!F.landed)for(const h of HEROES){if(h.cling||G.cine)continue;if(hd(h.pos,S)>17&&h.pos.z>S.z){const p=players[h.player],k=p.heroes.indexOf(h);placeOnGround(h,p.cp.x+(k?1.2:-0.4),p.cp.z,p.cp.y);h.iT=1;
      floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Звенышко на корабль вернуло','#ffd76a');}}
    if(G.cine)return;
    // парус: Йоша срастит, а нет — звенышко подошьёт за 16 секунд
    if(F.torn>0){F.torn-=dt;if(F.torn<=0){tear.visible=false;floatText(new V3(S.x,S.y+5.4,S.z-0.4),'Звенышко парус подшило','#ffd76a');}}
    // участки: небо
    if(F.stage==='fly'&&S.z<-18&&!F.gust1){F.gust1=true;startGust({k:'mast'});}
    if(F.stage==='fly'&&S.z<-28&&!F.barrelTip){F.barrelTip=true;banner('Бочки по палубе катятся!','#ffd76a',2.4,'бочка весит, как друг · у бочки Потапом '+K(0,'skill')+' — перекинет к другому борту');}
    for(const A2 of ARCS){if(A2.warn||S.z-A2.zs[0]>10)continue;A2.warn=true;banner('Орешки под бортом!','#ffd060',2.2,'наклони корабль '+(A2.s>0?'вправо':'влево')+' — и бери у борта');}
    // уступы
    for(const L of LEDGES){if(L.done)continue;const dd=S.z-L.z;for(const m of L.marks)m.material.emissiveIntensity=dd<16?0.6+0.6*Math.sin(G.time*10):0.3;
      if(L.k==='hid'){if(!L.seen){L.g.visible=dd<6||F.flashT>0;if(F.flashT>0&&dd<26&&dd>2)seeRock(L,'Молния осветила:');
          else if(dd<24&&!L.hint){L.hint=true;F.owlNeed=L;banner('Во тьме что-то чернеет…','#c8b0ff',2.2,'Пелагея, Совиный взор '+K(1,'skill')+' — покажет, где камень');}}}
      else if(dd<16&&!L.warn&&!(L.trio>1)){L.warn=true;SFX.red();
        if(L.trio)banner('Три уступа подряд!','#ff8a7a',2.2,'справа, слева, справа — Потапа от борта к борту · кувырок '+K(0,'roll')+' по крену — быстрее');
        else if(L.k==='big')banner('Высокий уступ '+(L.s>0?'справа':'слева')+'!','#ff8a7a',2.2,'нужен крен круче: Потапа и бочку (или друга) — к '+(L.s>0?'левому':'правому')+' борту');
        else if(L.k==='both')banner('Теснина!','#ff8a7a',2.2,'скалы с двух сторон — держи корабль ровно: Потапа в середину, вес поровну');
        else banner('Уступ '+(L.s>0?'справа':'слева')+'!','#ff8a7a',1.8,'Потапа — к '+(L.s>0?'левому':'правому')+' борту: корабль наклонится, крыло над камнем пролетит');}
      if(dd<0.3){L.done=true;if(F.owlNeed===L)F.owlNeed=null;const ok=L.k==='both'?Math.abs(S.roll)<0.14:L.k==='big'?-L.s*S.roll>0.4:-L.s*S.roll>0.18;
        if(L.k==='hid')L.g.visible=true;const sd=L.k==='both'?(Math.sign(S.roll)||1):L.s;
        if(ok){SFX.ok();floatText(new V3(S.x+(L.s||0)*3,S.y+2,S.z),'Прошли!','#ffe36b');}else bump(new V3(S.x+sd*3.4,S.y,S.z),sd,'Крыло задело!');}}
    // камнепад
    for(const St of STONES){if(St.done)continue;const dd=S.z-St.z;
      if(!St.fall&&dd<20){St.m.position.set(Math.sin(G.time*40)*0.05,0.35,Math.cos(G.time*37)*0.05);St.mat.emissiveIntensity=0.4+0.4*Math.sin(G.time*10);
        if(!St.warn){St.warn=true;SFX.red();banner('Камень над ущельем!','#ff8a7a',2.2,'Прошкой '+K(0,'swap')+' — рогаткой '+K(0,'skill')+' сбей, пока корабль не под ним');}}
      if(!St.fall&&dd<1.2){St.fall=true;const f=St.pos.clone();anim(0.6,k=>{St.m.position.set(-St.s*k*6.2,0.35-k*k*(f.y-S.y),0);if(k>=1){St.done=true;St.m.visible=false;bump(new V3(S.x+St.s*1.2,S.y+0.4,S.z),St.s,'Камнем по палубе!');}});}}
    // арка и низкая туча: проверка — мачта ниже свода
    if(A&&!A.done){if(add<18&&!A.warn){A.warn=true;SFX.red();banner(A.k==='arch'?'Низкая арка!':'Низкая туча!','#ff8a7a',2.4,'мачта не пройдёт · Пелагея, погаси перо '+K(1,'item')+' — корабль нырнёт, а за '+(A.k==='arch'?'аркой':'тучей')+' — снова зажги');
        tip(1,'Погаси перо '+K(1,'item')+' у фонаря — корабль скользнёт вниз и пройдёт под '+(A.k==='arch'?'аркой':'тучей')+'.<br>Прошли — зажигай снова, не то встанем!',3.4);}
      if(add<0.3){A.done=true;if(S.y<1.7){SFX.ok();F.dives=(F.dives||0)+1;floatText(new V3(S.x,S.y+7.5,S.z),'Нырнули!','#ffe36b');}else bump(new V3(S.x,S.y+7.5,S.z),Math.sign(S.roll)||1,'Мачта задела!');}}
    // крыло и ветры
    if(F.stage==='fly'&&S.z<-178&&!F.wingDone){F.wingDone=true;wingScene();}
    if(F.stage==='hold'){F.gustNext-=dt;if(F.gustNext<=0&&!F.gustA){startGust(GSEQ[F.gustSeq++%GSEQ.length]);F.gustNext=4.4;}
      if(F.gusts>=3&&!F.gustA){F.stage='fly';F.holdDone=true;S.kick=0;banner('Выровнялись!','#ffd76a',2,'Потап ветра унял · дальше — тёмные тучи');later(1,()=>say('zven','В тучах мостков нет. Но фонарь — это свет!',2.8,true));}}
    if(F.gustA)gustTick(dt);else{gRing.visible=false;face.visible=false;}
    // вороны: летят на ходу; не прогнали — корабль встанет перед грозой
    if(F.stage==='fly'&&S.z<-244&&F.wave===0)spawnCrows(3);
    if(F.wave===1&&crows.every(e=>!e.alive)&&!F.w2){F.w2=true;later(1.4,()=>spawnCrows(3));}
    if(F.wave>=2&&crows.every(e=>!e.alive)&&!F.crowsDone){F.crowsDone=true;SFX.ok();banner('Вороны прогнаны!','#ffd76a',2,'ключи в пропасть упали. Корабль к гнезду летит');}
    if(F.wave>0)crowTick(dt);if(F.stolen)chaseTick(dt);
    // гроза: молнии, свист Соловья, ветер на фонарь
    if(S.z<-290&&!F.landed){if(!F.storm){F.storm=true;F.boltT=1.2;banner('Гроза!','#9fd0ff',2.2,'молния парус рвёт, а во вспышке видно камни');}
      F.boltT-=dt;if(F.boltT<=0){F.boltT=rand(3.5,6);if(!F.strike&&S.z<-292){F.strike=true;lightning(new V3(S.x,S.y+16,S.z-0.5),true);tearSail();}else lightning(new V3(S.x+(Math.random()<0.5?-1:1)*rand(8,14),S.y+14,S.z-rand(4,14)));}
      if(S.z<-296&&!F.whistle&&!F.gustA){F.whistle=true;startGust({k:'side',s:1,why:'Свист Соловья-Разбойника!'});later(0.4,()=>say('zven','Это Соловей свистит! Далеко — а с ног валит!',2.6,true));}
      if(S.z<-312&&!F.lanGust&&!F.gustA){F.lanGust=true;startGust({k:'lantern',s:-1});}}
    if(F.crowsDone&&S.z<=-325.5&&!F.landed&&F.stage==='fly'&&!F.gustA)landScene();
    if(F.landed&&!F.out&&[0,1].every(pi=>active(pi).pos.z<-333.5)){F.out=true;
      if(!F.bumps){G.flags.clean34=true;SFX.horn();if(typeof WEAR!=='undefined'&&WEAR.svistok34&&!own('svistok34'))buyWard('svistok34');
        banner('Ни царапины!','#ffd76a',2.8,'чистый полёт — Капитанский свисток в примерочной, «На шею» · а у Векши — треуголка из бересты');}
      else banner('Летучий корабль','#ffd76a',2.6,'царапин за полёт: '+F.bumps+' · без единой — Капитанский свисток · у Векши — треуголка из бересты');
      later(1.8,finishLevel);}});
  const gRing=new THREE.Mesh(new THREE.TorusGeometry(1,0.07,6,40),MB(COL.yellow,{transparent:true,opacity:0.9}));gRing.rotation.x=Math.PI/2;gRing.visible=false;W.group.add(gRing);
  W.k34={LEDGES,ARCHES,STONES,BARRELS,PERCH,ARCS,crows:()=>crows,weight,mastP,lanPos,gustPos,deckY,startChase,tearSail,keyNut,kill:e=>unravel(e),wearOk:()=>typeof WEAR!=='undefined'&&!!WEAR.svistok34};   // для ботов
  /* ---------- рисунки кнопок ---------- */
  const P=T.potap,gNow=()=>F.gustA&&F.gustA.t>=F.gustA.tel?F.gustA:null;
  const slingAny=()=>W.marks.some(m=>m.active()&&hd(m.pos,T.proshka.pos)<14&&(STONES.some(St=>St.pos===m.pos)||crows.some(e=>e.pos===m.pos)));
  prompt(1,'item',()=>headOf(T.pelageya),()=>F.stage==='dock'&&T.pelageya.active&&!T.pelageya.lit&&hd(T.pelageya.pos,lanPos)<3,'зажги перо в фонаре');
  prompt(1,'label',()=>lanPos.clone().add(new V3(0,1,0)),()=>F.stage==='dock'&&!(T.pelageya.active&&hd(T.pelageya.pos,lanPos)<3),'фонарь');
  prompt(0,'guard',()=>headOf(P),()=>{const g=gNow();return !!g&&g.k!=='side'&&P.active&&hd(P.pos,gustPos(g))<(g.k==='mast'?1.9:1.1);},'держи щит');
  prompt(0,'label',()=>{const g=F.gustA,rp=g?gustPos(g):mastP;return new V3(rp.x,S.y+2.4,rp.z);},()=>{const g=gNow();return !!g&&!(g.k==='side'?weight()*g.s>=2:P.active&&hd(P.pos,gustPos(g))<(g.k==='mast'?1.9:1.1));},
    ()=>{const g=F.gustA;return !g?'':g.k==='mast'?'Потапа — к мачте!':g.k==='side'?'Потапа — к этому борту!':'Потапа — сюда, щитом к ветру!';});
  prompt(0,'swap',()=>headOf(T.proshka),()=>!!F.gustA&&T.proshka.active,'Потап');
  prompt(0,'label',()=>headOf(P),()=>P.active&&LEDGES.some(L=>!L.done&&S.z-L.z<16&&(L.k!=='hid'||L.seen)),
    (()=>{const L=LEDGES.find(L=>!L.done&&(L.k!=='hid'||L.seen));return !L?'':L.k==='both'?'↔ ровно: в середину':L.k==='big'?(L.s>0?'← к левому борту, и бочку!':'к правому борту, и бочку! →'):(L.s>0?'← к левому борту':'к правому борту →');}));
  prompt(0,'skill',()=>headOf(T.proshka),()=>T.proshka.active&&slingAny(),'рогаткой!');
  prompt(0,'label',()=>{const St=STONES.find(St=>!St.done&&!St.fall&&S.z-St.z<20);return St?St.pos.clone().add(new V3(-St.s*1.5,-2,0)):new V3();},()=>STONES.some(St=>!St.done&&!St.fall&&S.z-St.z<20)&&!T.proshka.active,'Прошкой — рогаткой!');
  prompt(0,'skill',()=>headOf(P),()=>P.active&&F.launched&&!F.landed&&!F.gustA&&BARRELS.some(b=>!b.fly&&hd(b.pos,P.pos)<2.3&&Math.abs(b.pos.y-P.pos.y)<1.6),'перекинь бочку');
  prompt(1,'item',()=>headOf(active(1)),()=>F.launched&&!S.lit&&!F.landed&&!F.diveNow&&!F.stolen&&hd(active(1).pos,lanPos)<3&&!active(1).lit,'зажги перо в фонаре');
  prompt(1,'item',()=>headOf(T.pelageya),()=>F.diveNow&&T.pelageya.active&&T.pelageya.lit&&hd(T.pelageya.pos,lanPos)<3,'погаси перо — нырнём!');
  prompt(1,'skill',()=>headOf(T.pelageya),()=>!!F.owlNeed&&T.pelageya.active,'Совиный взор');
  prompt(1,'label',()=>headOf(active(1)),()=>!!F.owlNeed&&!T.pelageya.active,'Пелагея — Совиный взор!');
  prompt(1,'skill',()=>headOf(T.yosha),()=>F.torn>0&&T.yosha.active&&hd(T.yosha.pos,mastP)<4,'срасти парус');
  prompt(1,'label',()=>new V3(S.x,S.y+5.6,S.z-0.4),()=>F.torn>0&&!(T.yosha.active&&hd(T.yosha.pos,mastP)<4),'парус порван — Йошу к мачте!');
  prompt(0,'label',()=>F.stolen?F.stolen.c.pos.clone().add(new V3(0,1.8,0)):new V3(),()=>!!F.stolen,'ворона с фонарём!');
  for(const pi of[0,1]){const h=()=>active(pi);prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig!=='red'&&e.help));
    prompt(pi,'roll',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig==='red'&&e.help));
    prompt(pi,'attack',()=>headOf(h()),()=>(!!F.grabber&&hd(F.grabber.pos,h().pos)<3.5)||(!!F.stolen&&hd(F.stolen.c.pos,h().pos)<3.5),()=>F.stolen?'отбери фонарь!':'прогони ворону!');
    prompt(pi,'guard',()=>headOf(h()),()=>F.stage==='brace'&&hd(h().pos,mastP)<1.9&&!h().guard,'держись за мачту');
    prompt(pi,'item',()=>headOf(h()),()=>!!F.stolen&&h().lit&&hd(h().pos,F.stolen.c.pos)<12,'погаси перо — тенемостки!');}
  prompt(0,'label',()=>new V3(S.x,S.y+2.6,S.z-0.5),()=>F.stage==='brace'&&!(P.active&&hd(P.pos,mastP)<1.9),'к мачте!');
  /* ---------- задачи ---------- */
  const mk=pi=>[
    O(pi?()=>'Летучий корабль. Ночью паруса его — как тряпки висят.<br>Пелагеей к фонарю у мачты иди, зажги перо '+K(1,'item')+' — фонарщицей быть, говорят.':()=>'Летучий корабль. Ночью паруса его — как тряпки висят.<br>Звенышко: «Зажгите перо в фонаре у мачты!» Все на борт — и в полёт, в закат!',()=>!!F.launched,()=>[ship.lantern]),
    O(pi?()=>'Пелагея держит фонарь, а ты за Йошу '+K(1,'swap')+' играй.<br>Порвётся парус — мёртвой водой '+K(1,'skill')+' у мачты его латай.':()=>'Корабль кренится туда, где тяжелее. Потап тяжёл, как трое, — от борта к борту веди.<br>Бочку Потапом '+K(0,'skill')+' к другому борту кидай, а орешки под бортом — накренись да бери!',
      ()=>S.z<-62,()=>[L1.g].concat(ARCS[0].its.filter(i=>!i.taken).map(i=>i.g))),
    O(pi?()=>'Ущелье! Корабль от веса кренится — помоги Прошке с Потапом: к нужному борту встань.<br>Низкая арка — Пелагеей перо '+K(1,'item')+' погаси: корабль нырнёт, а за аркой — снова зажги!':()=>'Ущелье! С одной стороны скала — Потапа '+K(0,'swap')+' к другому борту переведи.<br>Высокий уступ — Потап да бочка у борта; теснина — ровно; камень сверху — Прошкой '+K(0,'skill')+' сбей!',
      ()=>S.z<-176,()=>LEDGES.filter(L=>!L.done&&L.z>-176).map(L=>L.g).concat(STONES.filter(St=>!St.done).map(St=>St.g))),
    O(pi?()=>'Корабль боком встаёт! Пелагеей у мачты щит '+K(1,'guard')+' держи,<br>фонарь не отпускай, пока Потап ветра не уймёт.':()=>'Корабль боком встаёт! За мачту держись — щит '+K(0,'guard')+'.<br>Ветер дует с разных сторон: куда жёлтый кружок покажет — туда Потапа веди.',()=>!!F.holdDone,()=>[ship.mast]),
    O(pi?()=>'Тёмные тучи — камни во тьме не видны.<br>Пелагеей Совиный взор '+K(1,'skill')+' включи — Потапу покажи, с какой стороны!':()=>'Тёмные тучи. Фонарь корабля золотые мостки на облаках зажигает.<br>Сбегай за звеном — и назад, пока корабль не улетает!',
      ()=>S.z<-242,()=>SIDE.filter(C=>!C.it.taken).map(C=>C.it.g)),
    O(pi?()=>'Вороны хватают фонарь! Пелагея щит держит сама, да он устанет.<br>Беги Йошей к фонарю и гони ворон '+K(1,'attack')+' — пусть каждая отстанет!':()=>'Вороны летят! Прошкой '+K(0,'swap')+' на подлёте рогаткой '+K(0,'skill')+' сбивай,<br>а севших гони Потапом: жёлтый кружок <i class="sg y"></i> — щит '+K(0,'guard')+', синюю каплю — назад отбивай.',
      ()=>!!F.crowsDone,()=>crows.filter(e=>e.alive).map(e=>e.g)),
    O(pi?()=>'Гроза! Низкая туча — перо '+K(1,'item')+' погаси; парус порван — Йошей '+K(1,'skill')+' срасти.<br>Во тьме камни — Совиный взор '+K(1,'skill')+' покажет, а молния — осветит.':()=>'Гроза! Молния парус рвёт, Соловей-Разбойник издалека свистит.<br>Вес — против ветра, у фонаря — щит '+K(0,'guard')+', и к гнезду корабль долетит!',
      ()=>!!F.landed,()=>[L4.g]),
    O('Гнездо Гусей-лебедей — выходи на берег, к звену!',()=>false,()=>[L4.g])];
  for(const pi of[0,1])W.objectives[pi]=mk(pi);
  W.tipZones.push({cond:(pi,h)=>F.launched&&!S.lit&&!F.landed&&!F.diveNow&&!F.stolen,text:pi=>'Фонарь погас — корабль падает! Встань героем с пером у мачты и зажги '+K(pi,'item')+' — скорей!'},
    {cond:(pi,h)=>!!F.stolen,text:pi=>'Ворона утащила фонарь на тучу! Тенемостки держат только во тьме — перо погаси '+K(pi,'item')+', беги и бей '+K(pi,'attack')+'!'},
    {cond:(pi,h)=>h.groundRef&&h.groundRef.tile&&h.groundRef.type==='light',text:pi=>'Золотой мосток горит, пока фонарь корабля рядом. Хватай звено — и назад, скорей!'});
  W.spawns=[[new V3(-2,0,6),new V3(-3.8,0,7.4)],[new V3(2,0,6),new V3(3.8,0,7.4)]];W.startAct=[0,0];
  W.pauseLine='Летучий корабль: перо в фонаре у мачты — паруса светятся, и корабль летит; погасишь — нырнёт.<br>Потап за троих весит, бочка да ворона — по одному: крен туда, где тяжелее.<br>Ветер — Потап щитом у кружка; камень сверху — Прошка рогаткой; парус — Йоша мёртвой водой.';
  W.onStart=()=>{later(0.8,()=>say('zven','Дайте ему перо. У мачты фонарь!',2.6,true));};
  flushDecor();flushPuffs();}
