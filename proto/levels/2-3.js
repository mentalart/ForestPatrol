/* ============================== 2-3 «НЕВОД» — на четверых ============================== */
// гусли и клубок: у камня со знаком RB берёт клубок · невод из нитей четырёх клубков всплывает в прилив · зов «Ко мне!» · экран общий
function makeStarik(){const g=new THREE.Group();W.group.add(g);const body=new THREE.Group();g.add(body);const shirt=M(0x5a7ab0),skin=M(0xe8c8a0),beard=M(0xf4f0e8);
  part(body,new THREE.CylinderGeometry(0.34,0.46,0.9,10),shirt,0,0.45,0);part(body,new THREE.TorusGeometry(0.36,0.05,6,16),M(0xc0302a),0,0.5,0).rotation.x=Math.PI/2;
  const head=new THREE.Group();head.position.y=1.12;body.add(head);part(head,new THREE.SphereGeometry(0.24,12,10),skin,0,0,0);const bd=new THREE.ConeGeometry(0.22,0.62,10);bd.rotateX(Math.PI);part(head,bd,beard,0,-0.3,0.12);
  part(head,new THREE.SphereGeometry(0.25,12,8,0,Math.PI*2,0,Math.PI*0.45),beard,0,0.04,-0.02);for(const s of[-1,1])part(head,new THREE.SphereGeometry(0.03,6,5),MAT.dark,s*0.09,0.04,0.21);
  const arms=[];for(const s of[-1,1]){const a=new THREE.Group();a.position.set(s*0.38,0.8,0.08);body.add(a);part(a,new THREE.CylinderGeometry(0.07,0.07,0.5,6),shirt,0,-0.2,0.12).rotation.x=1.0;arms.push(a);}
  const net=new THREE.Group();net.position.set(0,0.45,0.55);body.add(net);const nm=MB(0xd8c8a0);for(let i=0;i<5;i++){const a=new THREE.Mesh(new THREE.BoxGeometry(1.2,0.015,0.015),nm);a.position.z=-0.3+i*0.15;net.add(a);const b=new THREE.Mesh(new THREE.BoxGeometry(0.015,0.015,0.62),nm);b.position.x=-0.5+i*0.25;net.add(b);}
  return {g,body,head,arms,net};}
function makeRybka(){const g=new THREE.Group();W.group.add(g);const gold=M(0xffc930,{emissive:0xc08000,emissiveIntensity:0.6});const body=new THREE.Group();g.add(body);
  const b=part(body,new THREE.SphereGeometry(0.34,14,10),gold,0,0,0);b.scale.set(0.55,0.85,1.3);const t=part(body,new THREE.ConeGeometry(0.3,0.4,4),gold,0,0,-0.55);t.rotation.x=-Math.PI/2;t.scale.set(0.3,1,1);
  const crown=new THREE.Group();crown.position.set(0,0.3,0.1);body.add(crown);for(let i=0;i<5;i++){const a=i/5*Math.PI*2;part(crown,new THREE.ConeGeometry(0.03,0.12,4),M(COL.gold,{emissive:0xffb000,emissiveIntensity:1}),Math.cos(a)*0.08,0.05,Math.sin(a)*0.08);}
  for(const s of[-1,1])part(body,new THREE.SphereGeometry(0.035,6,5),MAT.dark,s*0.13,0.08,0.3);const glow=new THREE.PointLight(0xffd060,0.9,4,2);g.add(glow);return {g,body,glow};}
function yarnSign(){const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.CircleGeometry(0.42,24),MB(0x1a2230,{transparent:true,opacity:0.72})));const b=new THREE.Mesh(new THREE.SphereGeometry(0.2,12,10),M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.6}));b.position.z=0.05;g.add(b);
  for(let i=0;i<3;i++){const t=new THREE.Mesh(new THREE.TorusGeometry(0.2,0.02,5,18),MB(0xfff4c8));t.rotation.set(rand(0,2),rand(0,2),0);t.position.z=0.05;g.add(t);}g.add(new THREE.Mesh(new THREE.TorusGeometry(0.43,0.035,6,28),MB(COL.gold)));return g;}
function build23(){
  W.zvenAway=true;W.world=2;W.bubbles=false;setTheme('sea');sky('day');W.name='2-3 · «Невод»';W.sub='Подводный Китеж · на четверых · невод из клубков';W.camX=12;const F=W.flags;F.task=1;
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.gusli=true;W.abil.clew=false;W.fallY=-7;W.waterCol=0x2f86c8;W.waterOp=0.42;
  const sand=M(0xe2c98f),rock=M(0x8a8680),dark=M(0x3a4a50);
  const sea=new THREE.Mesh(new THREE.PlaneGeometry(600,600),M(0x3a90c0));sea.rotation.x=-Math.PI/2;sea.position.set(0,-2.6,-90);W.group.add(sea);
  wall(-12.2,-12,-32,8);wall(12,12.2,-32,8);wall(-12.2,12.2,8,8.2);wall(-12.2,12.2,-32.2,-32);
  ground(-12,12,-5.2,8,0,sand,M(0xb89a6a));ground(-12,-9.8,-10.8,-5.2,0,sand);ground(-4.2,4.2,-10.8,-5.2,0,sand);ground(9.8,12,-10.8,-5.2,0,sand);ground(-12,12,-17.4,-10.8,0,sand);
  ground(-9.8,-4.2,-10.8,-5.2,-2.4,M(0xc8b080));ground(4.2,9.8,-10.8,-5.2,-2.4,M(0x6a8a5a));
  ground(-12,12,-24.6,-17.4,-3,dark);ground(-12,12,-32,-24.6,0,rock,M(0x6a6660));
  for(let i=0;i<30;i++)decorFir((Math.random()<0.5?-1:1)*rand(13.5,20),rand(-30,6),rand(1,1.8),false);
  for(let i=0;i<16;i++)seaweed(rand(4.6,9.4),rand(-10.4,-5.6),rand(0.8,1.8),-2.4);
  for(const x0 of[-5.0,4.2])for(let i=0;i<7;i++)box(x0,x0+0.8,-2.4,-2.057+i*0.343,-10.6+i*0.77,-9.83+i*0.77,rock,{occ:false});   // ступени из заводей
  // утёс для Пелагеи: ступени и вершина у самого края пропасти
  box(-1,1,0,1.0,-14.6,-13.6,rock,{occ:false});box(-1,1,0,2.0,-15.6,-14.6,rock,{occ:false});box(-1,1,0,3.0,-17.4,-15.6,rock,{occ:false});
  // пандус из пропасти (упал — выберешься)
  W.ramps=[{x0:10.8,z0:-23.9,y0:-3,y1:0,dx:0,dz:1,len:6.5,w:0.9}];{const rp=addMesh(new THREE.BoxGeometry(1.8,0.3,7.2),rock,10.8,-1.6,-20.65);rp.rotation.x=Math.atan2(3,6.5);}
  const Z=makeZven();W.zven=Z;Z.pos.set(0,2.4,2);
  const cam={x:0,z:-12,r:10,camActive:()=>!G.cine};W.camZones.push(cam);
  bell(-2.5,4);bell(0,-12.6);bell(-6,-26.4);
  /* ---------- жители ---------- */
  const st=makeStarik();st.g.position.set(-8.2,0.35,3.6);st.g.rotation.y=0.6;addMesh(new THREE.CylinderGeometry(0.3,0.3,1.8,8),M(0x7a5634),-8.2,0.2,3.6).rotation.z=Math.PI/2;W.cyls.push({x:-8.2,z:3.6,r:0.8,miny:-1,maxy:1.6,on:true});
  const fish=makeRybka();fish.g.position.set(7,-2.0,-8);
  /* ---------- невода: камни со знаком клубка по углам ---------- */
  const nets=[],stones=[];
  function makeNet(corners,zone,rect,o){const N={corners:[],zone,rect,need:o.need||3,all:o.all||4,y:zone.floor,laid:false,formed:false,fusedNeed:!!o.fuse,fused:!o.fuse,order:!!o.order,next:1,tight:false,held:0,id:o.id,perm:false};
    const cx=(rect.minx+rect.maxx)/2,cz=(rect.minz+rect.maxz)/2;N.c=new V3(cx,0,cz);
    corners.forEach(([x,z],i)=>{const g=new THREE.Group();g.position.set(x,0,z);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.8,0.9,0.25,10),rock,0,0.12,0,g);W.cyls.push({x,z,r:0.85,miny:-1,maxy:0.25,on:true});
      const sg=yarnSign();sg.position.y=2.3;g.add(sg);const rm=MB(0xffffff,{transparent:true,opacity:0.85});const ring=addMesh(new THREE.TorusGeometry(0.6,0.07,8,26),rm,0,0.3,0,g);ring.rotation.x=Math.PI/2;ring.castShadow=false;
      let dg=null;if(o.order){dg=makeDigit(0.8,MB(0xffd23a));dg.position.set(0,3.2,0);g.add(dg);setDigit(dg,i+1);}
      const th=new THREE.Mesh(THREAD_GEO,M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.9}));th.visible=false;W.group.add(th);
      const S={net:N,x,z,y:0.25,g,sg,ring,rm,dg,num:i+1,set:false,thread:th,hero:null};N.corners.push(S);stones.push(S);});
    const grid=new THREE.Group();W.group.add(grid);const gm=M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.7});const w=rect.maxx-rect.minx,d=rect.maxz-rect.minz;
    for(let i=0;i<=6;i++){const a=new THREE.Mesh(new THREE.BoxGeometry(w,0.05,0.05),gm);a.position.set(0,0,-d/2+i*d/6);grid.add(a);const b=new THREE.Mesh(new THREE.BoxGeometry(0.05,0.05,d),gm);b.position.set(-w/2+i*w/6,0,0);grid.add(b);}
    grid.position.set(cx,zone.floor+0.05,cz);grid.visible=false;N.grid=grid;nets.push(N);return N;}
  const z1=waterZone(-9.8,-4.2,-10.8,-5.2,-2.4,-0.15,{floor:-2.4,shell:{x:-7,z:-4.4,y:0}});
  const z3=waterZone(4.2,9.8,-10.8,-5.2,-2.4,-0.15,{floor:-2.4,shell:{x:11.2,z:-4.6,y:0}});
  const z2=waterZone(-12,12,-24.6,-17.4,-3,-0.15,{floor:-3,shell:{x:6,z:-16.7,y:0},op:0.42});
  const N1=makeNet([[-10.5,-4.5],[-3.5,-4.5],[-10.5,-11.5],[-3.5,-11.5]],z1,{minx:-9.8,maxx:-4.2,minz:-10.8,maxz:-5.2},{need:3,fuse:true,id:1});
  const N2=makeNet([[-3.4,-16.7],[3.4,-16.7],[-3.4,-25.3],[3.4,-25.3]],z2,{minx:-3.4,maxx:3.4,minz:-25,maxz:-17},{need:3,id:2});
  const N3=makeNet([[3.9,-4.1],[5.8,-4.1],[7.7,-4.1],[9.6,-4.1]],z3,{minx:4.2,maxx:9.8,minz:-10.8,maxz:-5.2},{need:4,order:true,id:3});
  // улов: сундук на дне первой заводи; золотая рыбка — в водорослях третьей
  const ch=chest(-6.4,-2.4,-8,{});ch.g.position.y=-2.4;ch.lock=true;let hauled=false;
  const netRef={net:true};const chasmNC={minx:-12,maxx:12,miny:-10,maxy:12,minz:-24.6,maxz:-17.4};W.noCarry.push(chasmNC);   // через пропасть «Звенышко подтянуло» не переносит
  W.surfs.push((x,z)=>{const N=N2;if(!(N.tight||N.perm)||N.y<N.zone.floor+0.6)return null;if(x<N.rect.minx||x>N.rect.maxx||z<N.rect.minz-0.6||z>N.rect.maxz+0.6)return null;return {y:N.y+0.06,ref:netRef};});
  // RB у камня: клубок (свой угол), если угол уже поставлен — гусли
  W.itemSign=pi=>{const h=active(pi);const S=stones.find(s=>hd(s,h.pos)<1.2&&Math.abs(h.pos.y-s.y)<0.7);if(!S||S.set)return null;
    return ()=>{const N=S.net;if(N.order&&S.num!==N.next){SFX.miss();floatText(h.pos.clone().add(new V3(0,h.d.height+0.7,0)),'Не по порядку! Сперва кольцо «'+N.next+'»','#ffd0d0');return;}
      S.set=true;N.next++;SFX.thread();floatText(h.pos.clone().add(new V3(0,h.d.height+0.7,0)),'Клубок — к серёдке!','#ffd76a');
      const th=S.thread;th.visible=true;const from=new V3(S.x,0.3,S.z),to=new V3(N.c.x,N.zone.floor+0.1,N.c.z),len=from.distanceTo(to);th.position.copy(from);th.lookAt(to);th.scale.set(1,1,0.01);anim(0.4,k=>{th.scale.z=Math.max(0.01,len*k);});
      const n=N.corners.filter(c=>c.set).length;if(n>=(N.id===2?3:4)&&!N.laid){N.laid=true;later(0.45,()=>{if(N.fusedNeed){banner('Нити встретились!','#ffd76a',1.8,'Йоша мёртвой водой польёт — нити срастутся в сеть');}else formNet(N);});}};};
  function formNet(N){N.formed=true;N.grid.visible=true;SFX.knot();SFX.grow();burst(new V3(N.c.x,N.y+0.4,N.c.z),COL.gold,20,4);banner('Невод из клубков — вот так невод!','#ffd76a',2,N.id===3?'все четверо углы держат — теперь прилив давай':'держите углы — и прилив давайте');}
  W.waterTargets.push({pos:new V3(-7,0,-8),active:()=>N1.laid&&!N1.formed,onWater:()=>{formNet(N1);later(0.6,()=>bark(HERO.yosha,'yosha','Срослись, срослись!',1.6));}});
  // зов «Ко мне!»: колокольчик цвета игрока над героем
  const pings=[0,1].map(pi=>{const g=new THREE.Group();const m=M(PCOL[pi],{emissive:PCOL[pi],emissiveIntensity:0.7});addMesh(new THREE.ConeGeometry(0.3,0.45,10),m,0,0,0,g);addMesh(new THREE.SphereGeometry(0.08,8,6),m,0,-0.25,0,g);g.visible=false;W.group.add(g);return {g,t:0};});
  W.pingCall=(pi,h)=>{pings[pi].t=3;SFX.bell();if(!F.pingTold){F.pingTold=true;tip(1-pi,'Друг зовёт! Над его героем колокольчик его цвета звенит.',3);}};
  /* ---------- сюжет ---------- */
  function intro(){const T=HERO;
    play({dur:12,fov:48,shots:[shot(0,[-5.4,2.2,7.4],[-8.2,1.0,3.6]),shot(4.4,[4.4,2.0,-2.4],[7,-1.4,-8]),shot(8.4,[0,9,6],[0,0,-10])],
      says:[[0.3,4,null,'<i>У самого синего моря старик сидит —</i><br><i>Невод чинит, а в неводе — дыра на дыре, только нить.</i>',true],[4.5,3.4,'rybka','Вытащите меня — звено отдам вам, право!'],[8.4,3.4,'zven','Четыре камня со знаком клубка. RB у камня — клубок!']],
      tick:(t)=>{st.arms.forEach((a,i)=>{a.rotation.x=Math.sin(t*4+i)*0.3;});fish.g.position.y=-2.0+Math.sin(t*2)*0.1;}});}
  function fishEnd(){const T=HERO;F.task=4;N3.done=true;
    play({dur:13,fov:46,shots:[shot(0,[2.4,2.8,-1.6],[7,0.2,-8]),shot(6.2,[-5,2.2,7],[-8.2,1,3.6]),shot(9.6,[0,6,4],[0,0,-8])],
      says:[[0.3,3,'rybka','Спасибо! Звено — ваше, берите.'],[3.4,2.8,'rybka','А невод из ваших ниток — крепче всех, скажу вам вправду.'],[6.4,2.8,'starik','Ну вот. И чинить не надо, старуха не заругает.'],[9.6,3,null,'<i>Звено — в копилку. Кит у берега ждёт.</i>',true]],
      events:[{t:1.0,fn:()=>{const L=link3;L.locked=false;L.g.visible=true;anim(0.8,k=>{L.base=0.6+k*0.6;});later(1.4,()=>takeItem(L,HERO.pelageya));}},{t:3.6,fn:()=>{anim(2,k=>{fish.g.position.y=0.2-k*2.6;});}}],
      tick:(t)=>{st.arms.forEach((a,i)=>{a.rotation.x=0.4+Math.sin(t*3+i)*0.2;});},end:()=>{F.out=true;later(0.6,finishLevel);}});}
  W.updates.push(dt=>{
    // кто держит углы: стоит на камне — держит, и оставленный тоже
    for(const S of stones){S.hero=HEROES.find(h=>!h.cling&&!(h.active&&players[h.player].downed)&&hd(h.pos,S)<1.0&&Math.abs(h.pos.y-S.y)<0.6)||null;
      S.rm.color.setHex(S.hero?PCOL[S.hero.player]:(S.set?COL.gold:0xffffff));S.ring.scale.setScalar(S.hero?1.15+0.05*Math.sin(G.time*6):1);S.sg.visible=!S.set;
      if(S.dg){const next=S.net.next===S.num&&!S.set;S.dg.visible=!S.set;S.dg.scale.setScalar(next?1+0.15*Math.sin(G.time*8):0.8);S.dg.rotation.y=Math.sin(G.time*1.5+S.x)*0.6;}
      if(S.set&&S.thread.visible){const to=new V3(S.net.c.x,S.net.y+0.1,S.net.c.z),from=new V3(S.x,0.3,S.z);S.thread.position.copy(from);S.thread.lookAt(to);S.thread.scale.z=from.distanceTo(to);}}
    for(const N of nets){N.held=N.corners.filter(c=>c.set&&c.hero).length;N.tight=N.formed&&N.held>=N.need;const want=(N.tight||N.perm)?Math.max(N.zone.level,N.zone.floor):N.zone.floor;
      const was=N.y;N.y=damp(N.y,want,N.tight||N.perm?6:2.5,dt);N.grid.position.y=N.y+0.05;N.grid.scale.y=1;N.grid.children.forEach((c,i)=>{c.position.y=(N.tight||N.perm)?0:Math.sin(i*1.3+G.time)*0.08;});
      if(N.formed&&!N.done&&N.zone.state==='high'&&!(N.tight||N.perm)&&N.zone.t>=1&&!N.sagTold){N.sagTold=true;banner('Невод провисает!','#ffd0d0',1.8,N.id===3?'рыбку подымет лишь невод, что держат все четверо':'углов меньше трёх — невод провиснет, и улов уйдёт на дно');}
      if(N.zone.state==='low')N.sagTold=false;}
    // улов 1: сундук поднимается в неводе и едет на берег
    if(!hauled){ch.g.position.y=N1.y;ch.pos.y=N1.y;if(N1.y>-0.55){hauled=true;N1.done=true;SFX.ok();banner('Сундук в неводе — улов!','#ffd76a',1.6,'тянем на берег, тянем');const from=ch.g.position.clone(),to=new V3(-7,0,-3.4);
      anim(1.6,k=>{ch.g.position.lerpVectors(from,to,smooth(k));ch.g.position.y+=Math.sin(k*Math.PI)*0.8;ch.pos.copy(ch.g.position);if(k>=1)ch.lock=false;});}}
    else if(ch.open&&F.task===1){F.task=2;later(1,()=>say('zven','Второе дело: невод-мост над течением!',2.6,true));}
    // течение в пропасти: плывущего сносит обратно к нашему берегу
    for(const h of HEROES)if(h.groundRef===z2){h.pos.z+=5.6*dt;if(!h.curTold&&h.active){h.curTold=true;tip(h.player,'Течение сносит! Через пропасть — лишь по неводу путь.',2.6);}}
    // улов 2: звено на дальней скале; после — старик крепит невод, чтобы все вернулись
    if(F.task===2&&link2.taken){F.task=3;N2.perm=true;N2.done=true;W.noCarry.splice(W.noCarry.indexOf(chasmNC),1);N2.formed=true;N2.grid.visible=true;if(z2.state!=='high')setWater(z2,'high');bark(st,'starik','Держите, ребятки, — закреплю, не сомневайтесь!',2.2);later(2.4,()=>say('zven','Третье — золотая рыбка! Пред ней четыре кольца:<br>Встаньте по порядку — 1, 2, 3, 4 — все вчетвером, до конца!',3.4,true));}
    // улов 3: золотая рыбка — только в неводе, натянутом всеми четырьмя
    if(F.task===3&&N3.formed){const want=N3.tight?Math.max(N3.y+0.25,-2.0):-2.0;fish.g.position.y=damp(fish.g.position.y,Math.min(want,0.2),4,dt);if(fish.g.position.y>-0.4&&N3.tight&&z3.state==='high'&&z3.t>=1)fishEnd();}
    else if(F.task<4){fish.g.position.y=-2.0+Math.sin(G.time*2)*0.1;}
    fish.g.rotation.y=Math.sin(G.time*0.8)*1.2;fish.body.rotation.z=Math.sin(G.time*6)*0.1;
    pings.forEach((p,pi)=>{p.t=Math.max(0,p.t-dt);p.g.visible=p.t>0;if(p.t>0){const h=active(pi);p.g.position.set(h.pos.x,h.pos.y+h.d.height+1.3+Math.sin(G.time*6)*0.1,h.pos.z);p.g.rotation.z=Math.sin(G.time*14)*0.4;}});
    st.arms.forEach((a,i)=>{a.rotation.x=0.8+Math.sin(G.time*3+i*1.4)*0.25;});});
  {const b=new THREE.Mesh(new THREE.PlaneGeometry(5.6,1.5),new THREE.MeshBasicMaterial({map:scratchTex('1 → 2 → 3 → 4 · потом прилив',640,170,'#fff4d0','#8a4a10')}));b.position.set(6.8,2.6,-11.6);W.group.add(b);
    for(const x of[4.4,9.2])addMesh(new THREE.CylinderGeometry(0.08,0.08,2.6,6),M(0x6a4020),x,1.3,-11.7);}
  let fishTalk=5;W.updates.push(dt=>{if(F.task!==3||N3.done)return;fishTalk-=dt;const near=[0,1].some(pi=>hd(active(pi).pos,{x:6.8,z:-6})<9);
    if(near&&fishTalk<=0){fishTalk=9;const set=N3.corners.filter(c=>c.set).length,held=N3.corners.filter(c=>c.hero).length;
      bark(fish,'rybka',set<4?'Кольцо «'+N3.next+'»! Встаньте на него — и клубок бросайте!':held<4?'Все вчетвером на кольца! Ещё '+(4-held)+', ещё!':'Прилив! Играйте прилив, не зевайте!',2.6);}});
  W.tipZones.push({cond:(pi,h)=>F.task===3&&!N3.done&&h.pos.x>2.5&&h.pos.z>-6&&h.pos.z<-2,text:pi=>{const set=N3.corners.filter(c=>c.set).length;return set<4?'Кольца по порядку, слева направо: 1, 2, 3, 4. Следующее — «'+N3.next+'»':'Все четыре кольца героями заняты? Тогда — прилив '+K(pi,'item')+'!';}});
  const link2=linkItem(0,0.6,-21);const link3=linkItem(7,0.6,-7.4);link3.locked=true;link3.g.visible=false;const n1=nutItem(0,3.5,-16.5),n2=nutItem(-9.4,0.6,-30.4),n3=nutItem(-11,0.6,6.4);
  /* ---------- рисунки кнопок ---------- */
  const T=HERO,onStone=h=>stones.find(s=>hd(s,h.pos)<1.2&&Math.abs(h.pos.y-s.y)<0.7);
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>{const S=onStone(h());return !!S&&!S.set&&(!S.net.order||S.net.next===S.num);},'клубок к серединке');
    prompt(pi,'swap',()=>headOf(other(pi)),()=>{const S=onStone(h());return !!S&&S.set&&!onStone(other(pi))&&!(F.task===2&&pi===1&&T.yosha.active);},'второй — на другой камень');
    prompt(pi,'item',()=>headOf(h()),()=>{const S=onStone(h());return !!S&&S.set&&S.net.formed&&S.net.zone.state==='low'&&S.net.held>=S.net.need;},'прилив!');
    prompt(pi,'call',()=>headOf(h()),()=>{const S=onStone(h());return !!S&&S.set&&S.net===N3&&N3.corners.filter(c=>c.set).length<4&&!players[1-pi].heroes.some(q=>onStone(q));},'позови друга');}
  prompt(1,'skill',()=>headOf(T.yosha),()=>N1.laid&&!N1.formed&&T.yosha.active&&hd(T.yosha.pos,{x:-7,z:-8})<4.5,'мёртвая вода');
  prompt(1,'swap',()=>headOf(T.yosha),()=>N1.laid&&!N1.formed&&T.pelageya.active,'Йоша');
  prompt(1,'jumpHold',()=>headOf(T.pelageya),()=>F.task===2&&T.pelageya.active&&T.pelageya.pos.y>2.8&&!N2.corners[2].set&&!N2.corners[3].set,'лети за пропасть');
  /* ---------- задачи ---------- */
  const t1=pi=>O(()=>'Первое дело — сундук на дне. Видишь четыре камня со знаком клубка?<br>Встань на камень, брось клубок '+K(pi,'item')+' к середине. У каждого — два героя: сменяй '+K(pi,'swap')+' слегка.',()=>N1.laid,()=>N1.corners.filter(c=>!c.set).map(c=>c.g));
  const t1b=pi=>O(pi?()=>'Нити встретились! Йоша, мёртвой водой '+K(1,'skill')+' серёдку полей —<br>Нити срастутся в сеть, скорей!':'Нити встретились! Сейчас Йоша их мёртвой водой срастит…',()=>N1.formed,()=>[ch.g]);
  const t1c=pi=>O(()=>'Держите углы невода (хоть три) и прилив '+K(pi,'item')+' — вот и всё:<br>Невод всплывёт, и сундук с собой унесёт.',()=>ch.open||F.task>1,()=>[z1.shell.g,ch.g]);
  const t2=pi=>O(pi?()=>'Второе: звено над течением висит. Пелагеей на утёс, прыгни, держи '+K(1,'jump')+' — к дальнему камню перелетишь.<br>Три угла да прилив — невод станет мостом, и к звену Йоша дойдёт, глядишь.':()=>'Второе: звено над течением висит. Героев на ближние камни поставь, клубки '+K(0,'item')+' бросай.<br>Три угла да прилив — невод станет мостом, так и знай.',
    ()=>F.task>2,()=>N2.corners.filter(c=>!c.set).map(c=>c.g).concat([link2.g]));
  const t3=pi=>O(()=>{const set=N3.corners.filter(c=>c.set).length,held=N3.corners.filter(c=>c.hero).length;
    if(set<4)return 'Золотая рыбка! Пред ней четыре кольца в ряд.<br>Встань на кольцо «'+N3.next+'», брось клубок '+K(pi,'item')+'. По порядку: 1, 2, 3, 4 — как велят.';
    if(held<4)return 'Невод готов! Все четыре героя — на кольца: '+held+' / 4.<br>Смени '+K(pi,'swap')+' — веди второго героя на свободное кольцо, как по струнке.';
    return 'Все четверо на кольцах! Прилив '+K(pi,'item')+' сыграй —<br>Невод рыбку подымет, так и знай!';},()=>F.task>3,()=>N3.corners.filter(c=>!c.set||!c.hero).map(c=>c.g).concat([fish.g]));
  for(const pi of[0,1])W.objectives[pi]=[t1(pi),t1b(pi),t1c(pi),t2(pi),t3(pi),O('Рыбка благодарит…',()=>false,()=>[])];
  W.tipZones.push({cond:(pi,h)=>!!onStone(h)&&onStone(h).set,text:pi=>'Ты на камне стоишь — угол невода держишь.<br>И оставленный герой держит тоже — не отбежишь.'},
    {cond:(pi,h)=>h.pos.y<-1&&h.pos.z<-17,text:pi=>'Пропасть! Справа горка — по ней наверх и выйдешь.'});
  W.spawns=[[new V3(-3,0,4),new V3(-5,0,5)],[new V3(3,0,4),new V3(5,0,5)]];W.startAct=[0,0];
  W.pauseLine='Невод на четверых: у камня со знаком клубка RB клубок берёт.<br>Нити четырёх клубков — невод; держит его, кто на камнях встаёт.<br>Прилив подымет невод со всем, что в нём, — вот!';
  W.onStart=()=>{later(0.5,intro);};
  flushDecor();}

