/* ============================== РЕЛИЗ final06 · 2-3 «НЕВОД» — ВДВОЕ ДЛИННЕЕ ============================== */
// Начало прежнее: сундук в неводе, невод-мост через течение, золотая рыбка в неводе на четверых. Рыбка теперь не только отдаёт звено:
// за свободу дарит вторую струну — напев «Течение» — и подсказывает, что язык колокола Китежа у Рыбы-кита в брюхе. Дальше — новое:
//   «Протока»: завал на скале раздвигается; между утёсами — протока с плотом. Раковина с рыбкой: вода бежит туда, куда смотришь —
//      плот плывёт; сменил героя — оставленный доигрывает. На середине водоворот держит плот: «Кто-то воду крутит!» (Водяной — в 2-Б).
//      Тайное течение видно только Совиным взором Пелагеи — сыграй его с уступа, и водоворот распадётся.
//   «Ёрш Ершович»: озорник в озере. Невод поперёк озера держат двое на камнях; двое у раковин пускают течения навстречу —
//      одно течение ёрш проскочит, два — зажмут посредине, и невод возьмёт. Потом рыбий суд: Сом, Лещ и Ёрш (по сказке «Ёрш Ершович»).
//   «К Рыбе-киту» — переход в 2-4: Сом велит Ершу вину искупить — проводить к Рыбе-киту; завал у моря рассыпается. Лодка старика
//      по «Течению» идёт протоком, поперёк — заросли водорослей (рубить с лодки). Отмель у спящего кита: пасть закрыта; четыре уса
//      щекотать разом (нижние — ударом, верхние — рогаткой Прошки), кит храпит — дуновение сдувает с отмели. Кит зевает — затягивает
//      всех в пасть, «Глоть!» — и сразу 2-4 «В брюхе у кита», без Лукоморья.
{const L=LEVELS.find(l=>l.id==='2-3');if(L)L.nuts=5;}   // орешков на уровне стало больше — для списка уровней
WHO.som=['Сом-судья','#a8b0c8'];WHO.leshch=['Лещ','#d8d0b0'];WHO.yorsh=['Ёрш','#e0a060'];VOICE.som={f:90,w:'triangle',sp:0.14};VOICE.leshch={f:260,w:'sine',sp:0.1};VOICE.yorsh={f:620,w:'square',sp:0.06};
function yorshMesh23(){const g=new THREE.Group();W.group.add(g);const m=M(0xb8904a),dk=M(0x6a5030);const b=new THREE.Mesh(new THREE.SphereGeometry(0.3,10,8),m);b.scale.set(0.7,0.8,1.4);g.add(b);
  for(let i=0;i<7;i++){const c=part(g,new THREE.ConeGeometry(0.04,0.3,4),dk,0,0.22+Math.sin(i*0.45)*0.03,-0.3+i*0.1);c.rotation.x=-0.3;}
  for(const s of[-1,1]){part(g,new THREE.SphereGeometry(0.06,6,5),M(0xffffff),s*0.13,0.08,0.3);part(g,new THREE.SphereGeometry(0.03,5,4),MAT.dark,s*0.15,0.08,0.34);}
  const tail=new THREE.Group();tail.position.z=-0.42;g.add(tail);const t=part(tail,new THREE.ConeGeometry(0.2,0.3,4),m,0,0,-0.1);t.rotation.x=-Math.PI/2;t.scale.set(0.25,1,1);return {g,tail};}
function somMesh23(){const g=new THREE.Group();W.group.add(g);const m=M(0x4a5468),bl=M(0xb8b8a8);const b=new THREE.Mesh(new THREE.SphereGeometry(1,12,8),m);b.scale.set(0.9,0.6,2.2);g.add(b);
  const be=new THREE.Mesh(new THREE.SphereGeometry(0.9,10,6),bl);be.scale.set(0.8,0.4,2);be.position.y=-0.2;g.add(be);for(const s of[-1,1])part(g,new THREE.SphereGeometry(0.1,6,5),MAT.dark,s*0.5,0.25,1.7);
  const wh=[];for(const s of[-1,1])for(const k of[0,1]){const w=new THREE.Group();w.position.set(s*0.4,-0.05-k*0.15,1.9);g.add(w);const c=part(w,new THREE.CylinderGeometry(0.025,0.01,1.4,4),m,s*0.5,-0.3,0);c.rotation.z=s*1.1;wh.push(w);}
  const cr=new THREE.Group();cr.position.set(0,0.62,0.9);g.add(cr);const gm=M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.6});part(cr,new THREE.CylinderGeometry(0.3,0.26,0.16,10),gm,0,0,0);for(let i=0;i<5;i++){const a=i/5*Math.PI*2;part(cr,new THREE.ConeGeometry(0.05,0.2,4),gm,Math.cos(a)*0.26,0.16,Math.sin(a)*0.26);}
  if(typeof regNpc==='function')regNpc({g,body:g,head:cr},'som');return {g,wh};}
function leshMesh23(){const g=new THREE.Group();W.group.add(g);const m=M(0xd0c8a8);const b=new THREE.Mesh(new THREE.SphereGeometry(0.7,12,8),m);b.scale.set(0.3,1,1.3);g.add(b);
  for(const s of[-1,1])part(g,new THREE.SphereGeometry(0.07,6,5),MAT.dark,s*0.17,0.25,0.75);const t=part(g,new THREE.ConeGeometry(0.4,0.5,4),m,0,0,-1.0);t.rotation.x=-Math.PI/2;t.scale.set(0.2,1,1);
  if(typeof regNpc==='function')regNpc({g,body:g},'leshch');return {g};}
build23=function(){
  W.zvenAway=true;W.world=2;W.bubbles=false;setTheme('sea');sky('day');W.name='2-3 · «Невод»';W.sub='Подводный Китеж · на четверых · невод из клубков · напев «Течение» · к Рыбе-киту';W.camX=12;const F=W.flags;F.task=1;
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.gusli=true;W.abil.clew=false;W.fallY=-7;W.waterCol=0x2f86c8;W.waterOp=0.42;
  const sand=M(0xe2c98f),rock=M(0x8a8680),dark=M(0x3a4a50);
  const sea=new THREE.Mesh(new THREE.PlaneGeometry(600,600),M(0x3a90c0));sea.rotation.x=-Math.PI/2;sea.position.set(0,-2.6,-90);W.group.add(sea);
  wall(-12.2,-12,-152,8);wall(12,12.2,-152,8);wall(-12.2,12.2,8,8.2);const southW=wall(-12.2,12.2,-92.2,-92);
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
  const cam={x:0,z:-12,r:10,camActive:()=>!G.cine&&F.task<5};W.camZones.push(cam);
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
  /* ---------- 4. Протока: напев «Течение» — плот плывёт; на середине кто-то крутит воду ---------- */
  // завал на краю скалы раздвигается, когда рыбка подарит напев. Протока — между утёсами, течение своё — к нашему берегу.
  // Раковина с рыбкой на причале: течение туда, куда смотришь — плот поплывёт. На середине водоворот держит плот: «Кто-то воду крутит!»
  // Тайное течение видно только Совиным взором Пелагеи — сыграй его с уступа, и водоворот распадётся.
  const sandD=M(0xd8bd85);
  const pass=new THREE.Group();W.group.add(pass);for(let i=0;i<7;i++){const r=addMesh(new THREE.DodecahedronGeometry(rand(0.9,1.4)),rock,-9+i*3+rand(-0.4,0.4),rand(0.6,1.2),-32.3,pass);r.rotation.set(rand(0,3),rand(0,3),0);}
  const passCol=colBox(-12,12,0,3.4,-32.8,-32,false);
  ground(-12,12,-36,-32,0,sandD,M(0xb89a6a));bell(-6,-34);
  ground(-3,3,-58,-36,-3,dark);box(-12,-3,-3,4.5,-58,-36,rock);box(3,12,-3,4.5,-58,-36,rock);
  for(let i=0;i<10;i++){const sd=i%2?1:-1;const r=addMesh(new THREE.DodecahedronGeometry(rand(0.8,1.6)),rock,sd*rand(4,10),4.5+rand(0,0.6),rand(-56,-38));r.rotation.set(rand(0,3),rand(0,3),0);}
  const CH=waterZone(-3,3,-58,-36,-3,-0.3,{start:'high',floor:-3,noGusli:true,shell:false,curb:false,op:0.5});
  const C1=FIN.kwCurrent({minx:-3,maxx:3,minz:-58,maxz:-36},{axis:'z',zone:CH,sp:2.6,shells:[{x:-4.4,z:-35.2,y:0,dir:-1}]});
  const RAFT=FIN.kwRaft(C1,0,-38.2,2.6,3.2,{h:0.5,draft:0.25,build:boardMesh,max:-38.2});
  box(2.1,3,-3,0.2,-48.6,-46.4,rock,{occ:false});   // уступ в стене протоки — там тайная раковина
  const C2=FIN.kwCurrent({minx:-3,maxx:3,minz:-50,maxz:-45},{axis:'x',zone:CH,hidden:true,sp:1.2,dur:4,shells:[{x:2.6,z:-47.5,y:0.2,dir:-1}],onDir:(c,d,pi)=>{if(d&&WH.on){breakWhirl();FIN.kwSetCurrent(C1,-1,pi);C1.t=Math.max(C1.t,8);}}});C2.off=true;   // тайное течение разбивает водоворот и гонит плот дальше
  const WH={on:true,met:false};const whirl=FIN.kwWhirl(0,-47.5,2.8,{on:()=>WH.on&&F.task>=5,y:()=>CH.level,pull:2.2});
  function breakWhirl(){WH.on=false;F.task=Math.max(F.task,6);SFX.ok();SFX.splash();for(let i=0;i<14;i++)burst(new V3(rand(-2,2),CH.level+0.3,-47.5+rand(-2,2)),0xcff8ff,3,3);
    banner('Водоворот распался!','#9fe6ff',2,'а в глубине кто-то ворчит: «Буль… помешали…»');for(let i=0;i<5;i++)tone(rand(160,240),0.14,'sine',0.2,rand(90,130),i*0.13);}
  ground(-12,12,-62,-58,0,sandD,M(0xb89a6a));bell(6,-60.2);
  /* ---------- 5. Ёрш Ершович: озеро, невод поперёк, течения навстречу ---------- */
  // «Ёрш Ершович, сын Щетинников» — озорник всех в озере обижает. Невод — поперёк озера: держат его двое на камнях (и оставленные держат).
  // Двое у раковин пускают течения навстречу: одно течение — ёрш проскочит невод и уйдёт; два — зажмут его посредине, и невод возьмёт.
  ground(-12,-10,-84,-62,0,sandD);ground(10,12,-84,-62,0,sandD);ground(-10,10,-64,-62,0,sandD);ground(-12,12,-92,-82,0,sandD,M(0xb89a6a));
  ground(-10,10,-82,-64,-2.5,dark);const LAKE=waterZone(-10,10,-82,-64,-2.5,-0.2,{start:'high',floor:-2.5,noGusli:true,shell:false});
  for(let i=0;i<12;i++)seaweed(rand(-9.5,9.5),rand(-81.5,-64.5),rand(0.8,1.8),-2.5);
  const CW=FIN.kwCurrent({minx:-10,maxx:0,minz:-82,maxz:-64},{axis:'x',zone:LAKE,sp:2.4,shells:[{x:-11,z:-73,y:0,dir:1,ry:Math.PI/2}]});
  const CE=FIN.kwCurrent({minx:0,maxx:10,minz:-82,maxz:-64},{axis:'x',zone:LAKE,sp:2.4,shells:[{x:11,z:-73,y:0,dir:-1,ry:-Math.PI/2}]});
  const NS=[[0,-62.9],[0,-83.1]].map(([x,z])=>{const g=new THREE.Group();g.position.set(x,0,z);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.8,0.9,0.25,10),rock,0,0.12,0,g);W.cyls.push({x,z,r:0.85,miny:-1,maxy:0.25,on:true});
    const rm=MB(0xffffff,{transparent:true,opacity:0.85});const ring=addMesh(new THREE.TorusGeometry(0.6,0.07,8,26),rm,0,0.3,0,g);ring.rotation.x=Math.PI/2;return {x,z,y:0.25,g,ring,rm,hero:null};});
  const netG=new THREE.Group();W.group.add(netG);{const nm=M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.7});for(let i=0;i<=8;i++){const a=new THREE.Mesh(new THREE.BoxGeometry(0.05,0.05,19.6),nm);a.position.set(-1.5+i*0.375,0,-73);netG.add(a);}
    for(let i=0;i<=12;i++){const b=new THREE.Mesh(new THREE.BoxGeometry(3,0.05,0.05),nm);b.position.set(0,0,-82.8+i*1.64);netG.add(b);}}
  const yorsh=yorshMesh23();const YR={x:-6,z:-72,tx:-6,tz:-72,t:0,mid:0,caught:false,esc:0};yorsh.g.position.set(-6,-0.6,-72);
  /* ---------- рыбий суд ---------- */
  const som=somMesh23(),lesh=leshMesh23();som.g.visible=false;lesh.g.visible=false;
  const nutsCourt=[nutItem(-3,0.6,-86),nutItem(3,0.6,-86)];nutsCourt.forEach(n=>{n.locked=true;n.g.visible=false;});
  /* ---------- сюжет ---------- */
  function intro(){const T=HERO;
    play({dur:12,fov:48,shots:[shot(0,[-5.4,2.2,7.4],[-8.2,1.0,3.6]),shot(4.4,[4.4,2.0,-2.4],[7,-1.4,-8]),shot(8.4,[0,9,6],[0,0,-10])],
      says:[[0.3,4,null,'<i>У самого синего моря старик сидит —</i><br><i>Невод чинит, а в неводе — дыра на дыре, только нить.</i>',true],[4.5,3.4,'rybka','Вытащите меня — звено отдам вам, право!'],[8.4,3.4,'zven','Видите четыре камня со знаком клубка?<br>Встань у камня, брось клубок — пусть летит издалека!']],
      tick:(t)=>{st.arms.forEach((a,i)=>{a.rotation.x=Math.sin(t*4+i)*0.3;});fish.g.position.y=-2.0+Math.sin(t*2)*0.1;}});}
  function fishEnd(){const T=HERO;F.task=4;N3.done=true;
    play({dur:20.4,fov:46,shots:[shot(0,[2.4,2.8,-1.6],[7,0.2,-8]),shot(6.2,[-5,2.2,7],[-8.2,1,3.6]),shot(9.6,[0,6,4],[0,0,-8])],
      says:[[0.3,3,'rybka','Спасибо! Звено — ваше, берите.'],[3.4,2.8,'rybka','А невод из ваших ниток — крепче всех, скажу вам вправду.'],[6.4,2.8,'starik','Ну вот. И чинить не надо, старуха не заругает.'],[9.6,3,null,'<i>Звено — в копилку. Кит у берега ждёт.</i>',true],[12.8,3.8,'rybka','А за свободу — вторая струна вам: напев «Течение». Ракушка с рыбкой — и вода побежит, куда скажете.'],[16.8,3.4,'rybka','А язык колокола Китежа Рыба-кит проглотил — у него в брюхе и ищите.']],
      events:[{t:1.0,fn:()=>{const L=link3;L.locked=false;L.g.visible=true;anim(0.8,k=>{L.base=0.6+k*0.6;});later(1.4,()=>takeItem(L,HERO.pelageya));}},{t:3.6,fn:()=>{anim(2,k=>{fish.g.position.y=0.2-k*2.6;});}}],
      tick:(t)=>{st.arms.forEach((a,i)=>{a.rotation.x=0.4+Math.sin(t*3+i)*0.2;});},end:()=>{openSouth();}});}
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
    else if(ch.open&&F.task===1){F.task=2;later(1,()=>say('zven','Второе дело: из невода мостик через течение сделайте!',2.6,true));}
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
  // напев «Течение» и юг: протока, водоворот, ёрш
  function openSouth(){F.task=5;W.abil.current=true;SFX.gate();anim(1.6,k=>{pass.position.y=-3.6*smooth(k);});later(1.6,()=>{passCol.on=false;});
    banner('Напев «Течение»!','#9fe6ff',2.8,'ракушка с рыбкой: вода побежит туда, куда смотришь · завал на скале разошёлся — на юг, к протоке');}
  function courtScene(){F.task=8;const T=HERO;som.g.visible=true;lesh.g.visible=true;som.g.position.set(-3.4,-2.6,-76);lesh.g.position.set(3.2,-2.6,-75);
    play({dur:22,fov:48,shots:[shot(0,[0,4.2,-62.6],[0,0,-75]),shot(5.2,[-1.8,1.8,-70],[-3.4,0.8,-76]),shot(9.6,[1.6,1.6,-70.4],[0,0.4,-73]),shot(15,[2.6,1.8,-70],[3.2,0.6,-75]),shot(18.6,[0,3.6,-64],[0,0,-80])],
      says:[[0.3,4.2,null,'<i>Из глубины всплывают Сом-судья и Лещ — по рыбьему делу, по озёрному.</i>',true],[4.8,4.4,'som','Ёрш Ершович, сын Щетинников! Всех в озере обижаешь, воду мутишь!'],
        [9.4,4.4,'yorsh','Не я это! Это Водяной воду крутит — я только рядом плаваю!'],[14,3.8,'leshch','А кто у старика с невода жемчуг утащил?'],[18,3.6,'yorsh','Ну… я. Нате, берите! Только в невод больше не надо!']],
      events:[{t:0.4,fn:()=>{anim(2.2,k=>{som.g.position.y=-2.6+k*2.6;lesh.g.position.y=-2.6+k*2.5;});SFX.splash();}},{t:18.4,fn:()=>{nutsCourt.forEach((n,i)=>{n.locked=false;n.g.visible=true;const to=active(i).pos.clone();
          anim(1.2,k=>{n.pos.set(lerp(0,to.x,k),0.6+Math.sin(k*Math.PI)*2,lerp(-73,to.z,k));});later(1.3,()=>takeItem(n,active(i)));});}}],
      tick:(t)=>{som.g.rotation.y=0.3+Math.sin(t*0.8)*0.1;som.wh.forEach((w,i)=>{w.rotation.z=Math.sin(t*2+i)*0.2;});lesh.g.rotation.y=-0.4+Math.sin(t)*0.1;yorsh.g.position.set(0,0.1+Math.abs(Math.sin(t*3))*0.25,-73);yorsh.g.rotation.y=t<9?0:Math.sin(t*6)*0.5;},
      end:()=>{later(0.4,()=>say('zven','Водяной воду крутит… Запомним!',2.4,true));later(3.0,seaScene);}});}
  W.updates.push(dt=>{
    C2.off=!(KW.owlT>0||F.hidFound);if(KW.owlT>0&&F.task>=5&&WH.on&&!F.hidFound&&[0,1].some(pi=>hd(active(pi).pos,{x:0,z:-47})<12)){F.hidFound=true;floatText(new V3(2.6,2.2,-47.5),'Тайное течение!','#e7c3ff');}
    for(const S of C2.shells)S.g.visible=!C2.off;
    // протока: своё течение — к нашему берегу; водоворот держит плот и выплёвывает пловцов
    for(const h of HEROES){if(h.groundRef!==CH||C1.dir)continue;h.pos.z=Math.min(-36.2,h.pos.z+2.2*dt);}
    if(WH.on&&F.task>=5){if(RAFT.z<-45.2){RAFT.z=-45.2;RAFT.v=0;}if(RAFT.z<-44.6&&C1.dir){RAFT.g.rotation.y+=dt*1.2;if(!WH.met){WH.met=true;SFX.wave();banner('Кто-то воду крутит!','#cfe8ff',2.4,'плот не пускает водоворот · Совиный взор покажет тайное течение');
        for(let i=0;i<5;i++)later(i*0.4,()=>burst(new V3(rand(-1,1),CH.level+0.2,-47.5+rand(-1,1)),0xcff8ff,4,2));}}
      for(const h of HEROES){if(h.groundRef===CH&&Math.hypot(h.pos.x,h.pos.z+47.5)<1.0){h.pos.z=-41;h.vel.y=6;h.grounded=false;floatText(h.pos.clone().add(new V3(0,1.6,0)),'Выбросило!','#cfe8ff');}}}
    else RAFT.g.rotation.y=damp(RAFT.g.rotation.y,0,3,dt);
    // озеро: камни невода
    for(const S of NS){S.hero=HEROES.find(h=>!h.cling&&hd(h.pos,S)<1.0&&Math.abs(h.pos.y-S.y)<0.6)||null;S.rm.color.setHex(S.hero?PCOL[S.hero.player]:0xffffff);S.ring.scale.setScalar(S.hero?1.15+0.05*Math.sin(G.time*6):1);}
    const held=NS.every(S=>S.hero);netG.position.y=damp(netG.position.y,held?LAKE.level-0.1:LAKE.floor+0.1,held?6:2.5,dt);
    // ёрш: гуляет, от героев удирает; течения его несут; зажали посредине при натянутом неводе — попался
    if(!YR.caught&&F.task>=6){YR.t-=dt;if(YR.t<=0){YR.t=rand(1.6,3);YR.tx=rand(-9,9);YR.tz=rand(-81,-65);}
      let vx=YR.tx-YR.x,vz=YR.tz-YR.z;const vl=Math.hypot(vx,vz)||1;vx=vx/vl*2.2;vz=vz/vl*2.2;
      for(const h of HEROES){const dx=YR.x-h.pos.x,dz=YR.z-h.pos.z,d=Math.hypot(dx,dz);if(d<3&&h.groundRef===LAKE){vx+=dx/d*4;vz+=dz/d*4;}}
      if(CW.dir===1&&YR.x<0.3)vx+=CW.sp*1.6;if(CE.dir===-1&&YR.x>-0.3)vx-=CE.sp*1.6;if(CW.dir===-1&&YR.x<0)vx-=CW.sp;if(CE.dir===1&&YR.x>0)vx+=CE.sp;
      const both=CW.dir===1&&CE.dir===-1;if(both){vx+=-YR.x*2.5;}
      YR.x=clamp(YR.x+vx*dt,-9.4,9.4);YR.z=clamp(YR.z+vz*dt,-81.4,-64.6);
      if(Math.abs(YR.x)<1.6){YR.mid+=dt;if(YR.mid>1.4&&held&&both){YR.caught=true;F.task=7;SFX.ok();banner('Попался, Ёрш Ершович!','#ffd76a',2.2,'невод взял озорника');later(1.6,courtScene);}
        else if(YR.mid>0.4&&!both&&YR.esc<=0){YR.esc=3;floatText(new V3(YR.x,0.8,YR.z),held?'Проскочил!':'Невода нет — ушёл!','#ffd0d0');if(!F.yTold){F.yTold=true;for(const p of[0,1])tip(p,'Одно течение ерша не удержит — проскочит. Пустите течения навстречу, с двух ракушек разом!',3.6);}}}
      else YR.mid=0;YR.esc=Math.max(0,YR.esc-dt);
      yorsh.g.position.set(YR.x,LAKE.level-0.35+Math.sin(G.time*5)*0.08,YR.z);yorsh.g.rotation.y=Math.atan2(vx,vz);yorsh.tail.rotation.y=Math.sin(G.time*16)*0.5;}
    else if(YR.caught&&!G.cine&&F.task<9){yorsh.g.position.set(0,netG.position.y+0.3,-73);}
    if(F.task>=6&&!F.lakeTold&&[0,1].some(pi=>active(pi).pos.z<-61)){F.lakeTold=true;say('zven','Ёрш Ершович! Озорник всех в озере обижает. Ловите — да вчетвером!',3.2,true);}});
  {const b=new THREE.Mesh(new THREE.PlaneGeometry(5.6,1.5),new THREE.MeshBasicMaterial({map:scratchTex('1 → 2 → 3 → 4 · потом прилив',640,170,'#fff4d0','#8a4a10')}));b.position.set(6.8,2.6,-11.6);W.group.add(b);
    for(const x of[4.4,9.2])addMesh(new THREE.CylinderGeometry(0.08,0.08,2.6,6),M(0x6a4020),x,1.3,-11.7);}
  let fishTalk=5;W.updates.push(dt=>{if(F.task!==3||N3.done)return;fishTalk-=dt;const near=[0,1].some(pi=>hd(active(pi).pos,{x:6.8,z:-6})<9);
    if(near&&fishTalk<=0){fishTalk=9;const set=N3.corners.filter(c=>c.set).length,held=N3.corners.filter(c=>c.hero).length;
      bark(fish,'rybka',set<4?'Кольцо «'+N3.next+'»! Встаньте на него — и клубок бросайте!':held<4?'Все вчетвером на кольца! Ещё '+(4-held)+', ещё!':'Прилив! Играйте прилив, не зевайте!',2.6);}});
  W.tipZones.push({cond:(pi,h)=>F.task===3&&!N3.done&&h.pos.x>2.5&&h.pos.z>-6&&h.pos.z<-2,text:pi=>{const set=N3.corners.filter(c=>c.set).length;return set<4?'Кольца по порядку, слева направо: 1, 2, 3, 4. Следующее — «'+N3.next+'»':'Все четыре кольца героями заняты? Тогда — прилив '+K(pi,'item')+'!';}});
  const link2=linkItem(0,0.6,-21);const link3=linkItem(7,0.6,-7.4);link3.locked=true;link3.g.visible=false;const n1=nutItem(0,3.5,-16.5),n2=nutItem(-9.4,0.6,-30.4),n3=nutItem(-11,0.6,6.4);
  /* ---------- 6. К Рыбе-киту: проток, лодка старика, водоросли; отмель у спящего кита — щекотать усы, кит зевает ---------- */
  // язык колокола Китежа — у кита в брюхе (сказала рыбка); Ёрш вину искупает — провожает. Дальше — 2-4 «В брюхе у кита», сразу.
  const pass2=new THREE.Group();W.group.add(pass2);for(let i=0;i<8;i++){const r=addMesh(new THREE.DodecahedronGeometry(rand(0.9,1.4)),rock,-10.5+i*3+rand(-0.4,0.4),rand(0.6,1.3),-92.6,pass2);r.rotation.set(rand(0,3),rand(0,3),0);}
  pass2.traverse(c=>{c.userData.noBatch=true;});
  ground(-12,12,-96,-92.2,0,sandD,M(0xb89a6a));bell(6,-94);
  ground(-3,3,-134,-96,-3,dark);box(-12,-3,-3,4.5,-134,-96,rock);box(3,12,-3,4.5,-134,-96,rock);
  for(let i=0;i<12;i++){const sd=i%2?1:-1;const r=addMesh(new THREE.DodecahedronGeometry(rand(0.8,1.6)),rock,sd*rand(4,10),4.5+rand(0,0.6),rand(-132,-98));r.rotation.set(rand(0,3),rand(0,3),0);}
  const CH3=waterZone(-3,3,-134,-96,-3,-0.3,{start:'high',floor:-3,noGusli:true,shell:false,curb:false,op:0.5});
  const C3=FIN.kwCurrent({minx:-3,maxx:3,minz:-134,maxz:-96},{axis:'z',zone:CH3,sp:2.6,dur:9999,shells:[{x:-4.4,z:-94.6,y:0,dir:-1}]});
  const RAFT3=FIN.kwRaft(C3,0,-98.2,2.6,3.2,{h:0.5,draft:0.25,max:-98.2,min:-131.6});
  // заросли водорослей поперёк протока: лодку не пускают, вплавь не пролезть — рубить с лодки
  const KELP=[-106,-116,-125].map((z,i)=>{const g=new THREE.Group();g.position.set(0,0,z);W.group.add(g);const km=M([0x2a8a4a,0x3a9a5a,0x2a7a5a][i]);
    for(let k=0;k<11;k++){const h=rand(2.6,3.6);const st=addMesh(new THREE.CylinderGeometry(0.07,0.12,h,5),km,-2.7+k*0.54+rand(-0.1,0.1),-3+h/2+0.6,rand(-0.25,0.25),g);st.rotation.z=rand(-0.15,0.15);}
    g.traverse(c=>{c.userData.noBatch=true;});const col=colBox(-3,3,-3,1.6,z-0.35,z+0.35,false);
    const K={z,g,col,hp:2,gone:false};W.hittables.push({pos:new V3(0,0.8,z),r:2.0,push:false,alive:()=>!K.gone&&F.task>=9,onHit:h=>{K.hp--;SFX.knock();for(let q=0;q<4;q++)burst(new V3(rand(-2.5,2.5),0.6,z),0x3a9a5a,4,2);
      floatText(new V3(h.pos.x,1.8,z+0.6),K.hp>0?'Вжик!':'Прорубили!','#bff0c8');if(K.hp<=0)cutKelp(K);}});return K;});
  function cutKelp(K){if(K.gone)return;K.gone=true;K.col.on=false;SFX.brk();anim(0.9,k=>{K.g.position.y=-3.4*smooth(k);});later(0.9,()=>{K.g.visible=false;});
    if(!F.kelpTold&&KELP.some(q=>!q.gone)){F.kelpTold=true;later(0.6,()=>bark({pos:yorsh.g.position},'yorsh','Плывём, плывём! Там ещё заросли — рубите!',2.4,true));}}
  // отмель и спящий кит: голова — к отмели; пасть закрыта
  ground(-12,12,-150,-134,0,sand,M(0xb89a6a));
  for(let i=0;i<10;i++)seaweed((i%2?1:-1)*rand(9,11.6),rand(-148,-136),rand(0.6,1.2),0);
  const kit=makeWhale(60,{awake:false});kit.g.position.set(0,1.5,-180);kit.g.rotation.y=Math.PI;kit.g.traverse(c=>{c.userData.noBatch=true;});
  colBox(-14,14,-4,9,-210,-150,false);
  const maw=new THREE.Mesh(new THREE.CircleGeometry(1,24),MB(0x3a0a1a));maw.position.set(0,1.0,-149.55);maw.scale.set(0.01,0.01,1);maw.visible=false;W.group.add(maw);
  const tongue=new THREE.Mesh(new THREE.SphereGeometry(1,12,8),M(0xd2707e));tongue.scale.set(2.6,0.5,1.6);tongue.position.set(0,-0.2,-150.4);tongue.visible=false;W.group.add(tongue);
  // усы: от морды к кончикам; кончик светится, когда пощекотан
  const WK={win:G.solo?8:6,yawn:false,yawnT:0,snore:5,warn:false,in:new Set(),done:false};
  const WHI=[[-6,1.4,-146.4,0],[6,1.4,-146.4,0],[-9.6,4.4,-147.2,1],[9.6,4.4,-147.2,1]].map(([x,y,z,hi],i)=>{const g=new THREE.Group();W.group.add(g);const root=new V3(x<0?-3.2:3.2,hi?3.4:2.0,-150.3),tip=new V3(x,y,z);
    const d=tip.clone().sub(root),L=d.length();const tube=addMesh(new THREE.CylinderGeometry(0.06,0.14,L,6),M(0x3a4458),0,0,0,g);tube.position.copy(root).addScaledVector(d,0.5);tube.quaternion.setFromUnitVectors(new V3(0,1,0),d.clone().normalize());
    const tm=MB(0xfff0b0,{transparent:true,opacity:0.35});const ball=addMesh(new THREE.SphereGeometry(0.32,10,8),tm,x,y,z,g);g.traverse(c=>{c.userData.noBatch=true;});
    const S={i,hi:!!hi,x,y,z,g,ball,tm,t:0,pos:new V3(x,y,z)};
    if(hi){const mk=markMesh(0.9);mk.position.set(x,y+0.9,z);W.group.add(mk);mk.visible=false;S.mk=mk;W.marks.push({pos:S.pos,active:()=>F.task===11&&!WK.yawn&&S.t<=0,onHit:()=>tickle(S)});}
    else W.hittables.push({pos:new V3(x,0.6,z),r:1.1,push:false,alive:()=>F.task===11&&!WK.yawn&&S.t<=0,onHit:()=>tickle(S)});
    return S;});
  function tickle(S){S.t=WK.win;SFX.ok();tone(880+S.i*120,0.12,'sine',0.18,1200);floatText(S.pos.clone().add(new V3(0,0.9,0)),'Хи-хи!','#ffe08a');
    anim(0.6,k=>{S.g.rotation.z=Math.sin(k*Math.PI*4)*0.02;});
    const n=WHI.filter(q=>q.t>0).length;if(n<4)floatText(new V3(0,6.4,-148),'Ус '+n+' из 4','#ffffff');
    if(WHI.every(q=>q.t>0))yawn();}
  function yawn(){WK.yawn=true;WK.yawnT=0;F.task=12;SFX.whoosh();tone(70,2.6,'sine',0.3,50);shakeAll(0.05,0.8);WHI.forEach(q=>{if(q.mk)q.mk.visible=false;});
    maw.visible=true;tongue.visible=true;anim(1.6,k=>{const kk=smooth(k);maw.scale.set(5.2*kk+0.01,3.0*kk+0.01,1);kit.eyes.forEach(e=>{e.rotation.x=1.2-0.8*kk;});});
    banner('Кит зевает!','#ffd76a',2.6,'а-а-ах… — пасть настежь, тянет внутрь · все — в пасть, за языком колокола!');
    later(0.6,()=>say('zven','Кит зевает — прыгайте в пасть! Все вместе!',2.8,true));}
  function swallowed(){if(WK.done)return;WK.done=true;F.task=13;SFX.thud();shakeAll(0.06,0.5);HEROES.forEach(h=>{h.g.visible=false;h.cineHold=true;});
    anim(0.8,k=>{maw.scale.set(5.2*(1-k)+0.01,3.0*(1-k)+0.01,1);});later(0.8,()=>{maw.visible=false;tongue.visible=false;});
    banner('Глоть!','#ffd76a',2.2,'тепло, темно, где-то стучит огромное сердце… вы — в брюхе у кита');
    later(2.4,()=>{if(F.out)return;F.out=true;HEROES.forEach(h=>{h.g.visible=true;h.cineHold=false;});finishLevel();if(G.trans)G.nextLevel='2-4';});}   // глава продолжается: сразу в брюхо (сохранение — в finishLevel)
  function seaScene(){const T=HERO;yorsh.g.position.set(0,0.1,-73);
    play({dur:14.4,fov:48,shots:[shot(0,[0,3.6,-63],[0,0.4,-75]),shot(7.4,[4,4.2,-80],[0,0.8,-93]),shot(11,[0,7,-84],[0,0,-110])],
      says:[[0.3,3.6,'som','Вину искупишь, Ёрш Ершович: гостей к Рыбе-киту проводишь.'],[4.0,3.4,'yorsh','Да знаю я, где кит! За озером, в море спит — пасть на замке.'],
        [7.6,3.2,'zven','Язык колокола — у кита в брюхе. Айда за ершом!'],[11.0,3.2,null,'<i>Сом-судья ударил хвостом — завал у моря рассыпался.</i>',true]],
      events:[{t:11.2,fn:()=>{SFX.gate();shakeAll(0.04,0.6);anim(1.6,k=>{pass2.position.y=-3.6*smooth(k);});southW.on=false;}}],
      tick:(t)=>{som.g.rotation.y=0.3+Math.sin(t*0.8)*0.1;yorsh.g.position.set(Math.sin(t*2)*0.6,0.1+Math.abs(Math.sin(t*3))*0.2,lerp(-73,-90,clamp((t-4)/8,0,1)));},
      end:()=>{F.task=9;southW.on=false;pass2.position.y=-3.6;pass2.visible=false;
        banner('Путь к морю открыт!','#9fe6ff',2.6,'лодка старика у причала · «Течение» понесёт к Рыбе-киту');}});}
  W.updates.push(dt=>{if(F.task<9)return;
    // проводник: ёрш плывёт перед лодкой, у отмели ждёт
    const yz=F.task>=11?-133:Math.min(-97,RAFT3.z-4.5);yorsh.g.position.set(Math.sin(G.time*1.6)*0.9,(F.task>=10?CH3.level:LAKE.level)-0.35+Math.sin(G.time*5)*0.08,F.task>=10?yz:-95.5);yorsh.g.rotation.y=Math.PI;yorsh.tail.rotation.y=Math.sin(G.time*16)*0.5;
    // лодка: заросли не пускают — упирается в первую неразрубленную
    const kz=KELP.find(K=>!K.gone);RAFT3.min=kz?kz.z+2.6:-131.6;
    if(F.task===9&&RAFT3.z<-100.5){F.task=10;}
    if(F.task===10&&!F.kelpMet&&kz&&RAFT3.z<kz.z+3.2){F.kelpMet=true;banner('Заросли!','#bff0c8',1.8,'лодку не пускают — руби с носа');}
    if(F.task===10&&KELP.every(K=>K.gone)&&HEROES.some(h=>h.active&&h.pos.z<-134.4&&h.pos.y>-0.6)){F.task=11;
      later(0.3,()=>bark({pos:yorsh.g.position},'yorsh','Тс-с! Вот он, кит. Пасть на замке. Пощекочите ему усы — все четыре разом — зевнёт!',3.6,true));
      for(const p of[0,1])tip(p,'Усы кита: нижние — щекочи ударом '+K(p,'attack')+', верхние — рогаткой Прошки '+K(0,'skill')+'.<br>Все четыре разом — и кит зевнёт. Храпнёт — отходи в сторону!',4.4);}
    // усы: щекотка тает; кит храпит — дуновение перед пастью
    for(const S of WHI){const was=S.t>0;S.t=Math.max(0,S.t-dt);S.tm.opacity=S.t>0?0.7+0.3*Math.sin(G.time*10):0.35;S.tm.color.setHex(S.t>0?0xffd040:0xfff0b0);S.ball.scale.setScalar(S.t>0?1.25:1);
      if(S.mk)S.mk.visible=F.task===11&&!WK.yawn&&S.t<=0;
      if(was&&S.t<=0&&!WK.yawn&&F.task===11){floatText(S.pos.clone().add(new V3(0,0.9,0)),'Почесался…','#cfe8ff');if(!F.wTold){F.wTold=true;for(const p of[0,1])tip(p,'Пощекотанный ус ненадолго светится — все четыре надо разом, пока не погасли!',3.2);}}}
    if(F.task===11&&!WK.yawn){WK.snore-=dt;if(WK.snore<1.4&&!WK.warn){WK.warn=true;floatText(new V3(0,4.6,-148.6),'Хр-р-р…','#cfe8ff');tone(60,1.2,'sine',0.2,90);for(let i=0;i<6;i++)later(i*0.2,()=>burst(new V3(rand(-2,2),1.4,-149.4),0xe8fbff,2,1.5,0.5));}
      if(WK.snore<=0){WK.snore=rand(6.5,8);WK.warn=false;SFX.whoosh();for(let i=0;i<10;i++)burst(new V3(rand(-4,4),1.2,-149),0xe8fbff,3,4);
        for(const h of HEROES){if(h.cling||Math.abs(h.pos.x)>4.6||h.pos.z>-136||h.pos.z<-150)continue;h.vel.z=7.5;h.vel.y=Math.max(h.vel.y,3.4);h.grounded=false;h.groundRef=null;floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Фу-у!','#cfe8ff');}}}
    // зевок: тянет к пасти; кто дошёл — проглочен; дошли все, кем играют, — «Глоть!»
    if(WK.yawn&&!WK.done&&!G.cine){WK.yawnT+=dt;for(const h of HEROES){if(WK.in.has(h)||h.cling)continue;const dx=-h.pos.x,dz=-148.6-h.pos.z,d=Math.hypot(dx,dz)||1;
        const sp=WK.yawnT>9?9:h.active&&!(G.solo&&h!==active(G.soloPi))?1.4:3.2;   // кем играешь — тянет слегка (иди сам), прочих — сильнее
        if(h.pos.z<-134||WK.yawnT>9){const m=Math.min(d,sp*dt);h.pos.x+=dx/d*m;h.pos.z+=dz/d*m;}
        if(Math.abs(h.pos.x)<4.6&&h.pos.z<-147.6&&h.pos.y<3.5){WK.in.add(h);h.sp=h.pos.clone();h.g.visible=false;h.cineHold=true;h.vel.set(0,0,0);SFX.splash();floatText(new V3(h.pos.x,2.6,-148),'Ам!','#ffe08a');}}
      if([0,1].every(pi=>WK.in.has(active(pi)))||WK.yawnT>12){HEROES.forEach(h=>{if(!WK.in.has(h)){WK.in.add(h);h.sp=h.pos.clone();h.g.visible=false;h.cineHold=true;}});swallowed();}
      tongue.position.y=-0.2+Math.sin(G.time*3)*0.08;}
    for(const h of WK.in)if(h.cineHold){h.vel.set(0,0,0);if(h.sp)h.pos.copy(h.sp);}});
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
  const tP=pi=>O(()=>'Рыбка подарила напев «Течение»! Протока — на юге, за скалой.<br>Ракушка с рыбкой на причале: сыграй '+K(pi,'item')+' — вода побежит, куда смотришь, и плот поплывёт. Сменишь героя — оставленный доиграет.',
      ()=>WH.met||F.task>=6,()=>[RAFT.g].concat(C1.shells.map(s=>s.g)));
  const tW=pi=>O(pi?()=>'Водоворот держит плот! Кто-то воду крутит. Совиный взор '+K(1,'skill')+' покажет тайное течение — на уступе у стены.<br>Сыграй его '+K(1,'item')+' — водоворот распадётся.':
      ()=>'Водоворот держит плот! Кто-то воду крутит. Пелагея Совиным взором покажет тайное течение — на уступе у стены.<br>Сыграй его '+K(0,'item')+' — водоворот распадётся.',()=>F.task>=6,()=>C2.off?[whirl.m]:C2.shells.map(s=>s.g));
  const tY=pi=>O(()=>'Ёрш Ершович в озере озорует! Невод поперёк озера держат двое на камнях — и оставленные держат.<br>Двое у раковин — течения навстречу '+K(pi,'item')+': одно течение ёрш проскочит, два — зажмут его посредине.',()=>F.task>=7,()=>NS.filter(s=>!s.hero).map(s=>s.g).concat([yorsh.g]));
  const tR=pi=>O(()=>'Ёрш проводит к Рыбе-киту! Лодка старика — у причала: все в лодку '+K(pi,'jump')+'.<br>Ракушка с рыбкой на причале: сыграй «Течение» '+K(pi,'item')+' — и запрыгивай, пока лодка не уплыла. Сменишь героя — оставленный доиграет.',
      ()=>F.task>=10,()=>[RAFT3.g].concat(C3.shells.map(s=>s.g)));
  const tK=pi=>O(()=>'Заросли водорослей поперёк протока — лодку не пускают, вплавь не пролезть.<br>Руби '+K(pi,'attack')+' с носа лодки — и течение понесёт дальше, к отмели.',()=>F.task>=11,()=>KELP.filter(K=>!K.gone).map(K=>K.g).concat([RAFT3.g]));
  const tT=pi=>O(()=>'Рыба-кит спит, пасть на замке, — а язык колокола у него в брюхе. Ёрш шепчет: зевнёт, коль усы пощекотать!<br>Все четыре разом: нижние — удар '+K(pi,'attack')+', верхние — рогатка Прошки '+K(0,'skill')+'. Храпнёт — отходи в сторону!',
      ()=>F.task>=12,()=>WHI.filter(S=>S.t<=0).map(S=>S.ball));
  const tM=pi=>O(()=>'Кит зевает! Все — в пасть, за языком колокола!',()=>false,()=>[maw]);
  for(const pi of[0,1])W.objectives[pi]=[t1(pi),t1b(pi),t1c(pi),t2(pi),t3(pi),tP(pi),tW(pi),tY(pi),O('Рыбий суд…',()=>F.task>=9,()=>[]),tR(pi),tK(pi),tT(pi),tM(pi)];
  W.tipZones.push({cond:(pi,h)=>!!onStone(h)&&onStone(h).set,text:pi=>'Ты на камне стоишь — угол невода держишь.<br>И оставленный герой держит тоже — не отбежишь.'},
    {cond:(pi,h)=>h.pos.y<-1&&h.pos.z<-17&&h.pos.z>-25,text:pi=>'Пропасть! Справа горка — по ней наверх и выйдешь.'},
    {cond:(pi,h)=>h.groundRef===CH&&!C1.dir,text:pi=>'Протока своё течение гонит — к нашему берегу. Сыграй течение у ракушки на причале '+K(pi,'item')+' — и плыви с ним.'},
    {cond:(pi,h)=>h.pos.z<-62&&!YR.caught&&F.task>=6,text:pi=>'Невод держат двое на камнях. Течения — навстречу с двух ракушек: западная гонит на восток, восточная — на запад.<br>Встань у ракушки лицом к середине озера '+K(pi,'item')+'.'});
  W.spawns=[[new V3(-3,0,4),new V3(-5,0,5)],[new V3(3,0,4),new V3(5,0,5)]];W.startAct=[0,0];
  W.pauseLine='Напев «Течение»: ракушка с рыбкой — вода бежит, куда смотришь. Протока с плотом, водоворот — Совиный взор видит тайное течение. Ёрш — два течения навстречу.<br>После суда Ёрш ведёт к Рыбе-киту: лодка по «Течению», заросли руби с лодки; усы кита щекочи все четыре разом (верхние — рогаткой) — зевнёт, и все в пасть.<br>Невод на четверых: у камня со знаком клубка RB клубок берёт.<br>Нити четырёх клубков — невод; держит его, кто на камнях встаёт.<br>Прилив подымет невод со всем, что в нём, — вот!';
  W.onStart=()=>{later(0.5,intro);};
  FIN.kwPrompts();prompt(1,'skill',()=>headOf(HERO.pelageya),()=>WH.on&&WH.met&&!F.hidFound&&HERO.pelageya.active&&hd(HERO.pelageya.pos,{x:0,z:-46})<10,'тайное течение?');
  for(const pi of[0,1]){const h=()=>active(pi);prompt(pi,'jump',()=>headOf(h()),()=>F.task>=5&&C1.dir===0&&h().groundRef!==RAFT.col&&hd(h().pos,{x:RAFT.x,z:RAFT.z})<3.4&&RAFT.z>-39,'на плот');
    prompt(pi,'jump',()=>headOf(h()),()=>F.task>=9&&F.task<11&&h().groundRef!==RAFT3.col&&hd(h().pos,{x:RAFT3.x,z:RAFT3.z})<3.6,'в лодку');
    prompt(pi,'attack',()=>headOf(h()),()=>F.task===10&&h().groundRef===RAFT3.col&&KELP.some(K=>!K.gone&&Math.abs(K.z-h().pos.z)<4.2),'руби заросли');}
  // для ботов: перенос к участку и состояние
  W.dbg23=()=>({F,C1,C2,CW,CE,RAFT,WH,whirl,NS,YR,LAKE,CH,N3,stones,link3,pass,passCol,fishEnd,C3,CH3,RAFT3,KELP,WHI,WK,kit,maw,southW,seaScene});
  W.warp23=(where)=>{F.task=Math.max(F.task,5);passCol.on=false;pass.position.y=-3.6;cam.camActive=()=>false;const P={protoka:[0,0,-33.6],lake:[0,0,-60],pier:[0,0,-94.4],shoal:[0,0,-138]}[where];if(where==='lake'){F.task=6;WH.on=false;}
    if(where==='pier'||where==='shoal'){F.task=9;WH.on=false;YR.caught=true;southW.on=false;pass2.visible=false;}if(where==='shoal'){KELP.forEach(cutKelp);F.task=10;const p=-131.6;RAFT3.min=p;}
    HEROES.forEach((h,i)=>{placeOnGround(h,P[0]+(i%2?1.4:-1.4)*(i>1?2:1),P[2]+(i>1?0.8:0),P[1]);h.following=false;});for(const pi of[0,1])players[pi].cp.set(P[0],P[1],P[2]);snapCams();return W.dbg23();};
  flushDecor();};
