/* ============================== 2-2 «ЧУДО-ЮДО РЫБА-КИТ» ============================== */
// развитие гуслей: одна вода на двоих (просьба: значок и 2 секунды) · дыхание кита: фонтан в прилив — до облаков · раки-щипачи: красная хватка
function makeWhale(len,o){o=o||{};const g=new THREE.Group();W.group.add(g);const skin=M(o.col||0x5a6a86),belly=M(0xc8d0d8),dk=M(0x2a3040);
  const b=new THREE.Mesh(new THREE.SphereGeometry(1,28,18),skin);b.scale.set(len*0.24,len*0.1,len*0.5);g.add(b);
  const bl=new THREE.Mesh(new THREE.SphereGeometry(1,24,14),belly);bl.scale.set(len*0.2,len*0.07,len*0.46);bl.position.set(0,-len*0.035,0);g.add(bl);
  const tail=new THREE.Group();tail.position.set(0,0,len*0.5);g.add(tail);for(const s of[-1,1]){const f=new THREE.Mesh(new THREE.SphereGeometry(1,12,8),skin);f.scale.set(len*0.13,len*0.012,len*0.05);f.position.set(s*len*0.1,len*0.02,len*0.06);f.rotation.y=s*0.5;tail.add(f);}
  const eyes=[];for(const s of[-1,1]){const e=new THREE.Mesh(new THREE.SphereGeometry(len*0.018,12,10),M(0xf4f0e8));e.position.set(s*len*0.2,len*0.02,-len*0.4);g.add(e);
    const lid=new THREE.Mesh(new THREE.SphereGeometry(len*0.019,12,8,0,Math.PI*2,0,Math.PI/2),skin);lid.position.copy(e.position);lid.rotation.x=o.awake?-0.4:1.2;g.add(lid);eyes.push(lid);}
  const mouth=new THREE.Mesh(new THREE.TorusGeometry(len*0.17,len*0.008,6,30,Math.PI),dk);mouth.rotation.set(0,Math.PI/2,Math.PI);mouth.position.set(0,-len*0.03,-len*0.42);mouth.scale.set(1,0.35,1);g.add(mouth);
  return {g,body:b,tail,eyes,mouth};}
function build22(){
  W.zvenAway=true;W.world=2;W.bubbles=false;setTheme('sea');sky('day');W.name='2-2 · «Чудо-юдо Рыба-кит»';W.sub='Подводный Китеж · одна вода на двоих';W.camX=10;const F=W.flags;
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.gusli=true;W.fallY=-5;W.waterCol=0x2f86c8;W.waterOp=0.42;
  const grass=M(0x7ab060),skinSide=M(0x5a6a86),soil=M(0x6a4a2a),wood=M(0x9a6a3c);
  // море и облака
  const sea=new THREE.Mesh(new THREE.PlaneGeometry(700,700),M(0x3a90c0,{transparent:true,opacity:0.92}));sea.rotation.x=-Math.PI/2;sea.position.set(0,-3.2,-40);W.group.add(sea);
  for(let i=0;i<22;i++){const c=new THREE.Group();c.position.set(rand(-80,80),rand(14,30),rand(-160,20));for(let k=0;k<4;k++)addMesh(new THREE.SphereGeometry(rand(2,4),10,8),MB(0xffffff,{transparent:true,opacity:0.85}),rand(-4,4),rand(-1,1),rand(-2,2),c).castShadow=false;W.group.add(c);}
  const whale=makeWhale(210);whale.g.position.set(0,-21.4,-40);   // спина кита — чуть ниже земли деревни: с облаков видно героев и облака
  wall(-10.2,-10,-98,12);wall(10,10.2,-98,12);wall(-10.2,10.2,12,12.2);wall(-10.2,10.2,-98.2,-98);
  const Z=makeZven();W.zven=Z;Z.pos.set(0,2.2,-2);
  const hut=(minx,maxx,minz,maxz,top,roof)=>{const m=W.group.children.length;box(minx,maxx,0,top,minz,maxz,wood,{occ:false});const w=maxx-minx,d=maxz-minz;const rg=new THREE.ConeGeometry(Math.max(w,d)*0.62,1.1,4);rg.rotateY(Math.PI/4);
    const r=addMesh(rg,M(roof||0xc8a04a),(minx+maxx)/2,top+0.55,(minz+maxz)/2);r.scale.set(w/Math.max(w,d),0.35,d/Math.max(w,d));fadeable(since(m));};
  const beds=(minx,maxx,minz,maxz)=>{for(let z=maxz-0.5;z>minz;z-=1.1){addMesh(new THREE.BoxGeometry(maxx-minx,0.16,0.6),soil,(minx+maxx)/2,0.08,z).receiveShadow=true;for(let x=minx+0.4;x<maxx;x+=0.7)addMesh(new THREE.ConeGeometry(0.12,0.35,5),M(0x4f9a3a),x,0.3,z);}};
  /* ---------- начало: хвост кита ---------- */
  ground(-10,10,-6,12,0,grass,skinSide);bell(0,6);
  for(let i=0;i<5;i++){addMesh(new THREE.CylinderGeometry(0.06,0.08,1.2,5),wood,-9.5+i*0.9,0.6,-5.6);}
  /* ---------- 1. двор: общая вода, мешать нечем ---------- */
  ground(-10,10,-24,-15,0,grass,skinSide);ground(-10,-8.5,-15,-6,0,grass,skinSide);ground(-4.5,10,-15,-6,0,grass,skinSide);ground(-8.5,-4.5,-11,-6,0,grass,skinSide);ground(-8.5,-4.5,-15,-11,-1.8,soil);
  for(let i=0;i<6;i++)box(-4.5-(i+1)*0.55,-4.5-i*0.55,-1.8,-0.26-i*0.26,-15,-14.1,M(0x8a6a4a),{occ:false});   // ступеньки погреба
  const n1=nutItem(-7.6,-1.3,-12);
  hut(-9.6,-5,-21.6,-17.5,2.9,0xc86a4a);hut(5,9.6,-13.6,-10,2.9,0xc8a04a);const n2=nutItem(7.3,3.4,-11.8);
  box(-10,10,0,2.3,-23.2,-22.2,wood,{occ:false});for(let x=-9.6;x<10;x+=0.8)addMesh(new THREE.ConeGeometry(0.1,0.3,4),wood,x,2.45,-22.7);
  const Z1=waterZone(-10,10,-22.2,-7,0,2.6,{shared:true,shell:{x:0,z:-7.6,y:0}});
  bell(0,-24.8);
  /* ---------- 2. огород и мачта: нужен порядок ---------- */
  ground(-10,10,-52,-24,0,grass,skinSide);
  box(-0.5,0.5,0,3.6,-50,-26,wood,{occ:false});
  // Игроку 1: мачта затонувшего корабля — в прилив доплыть до гнезда; в отлив — кувшин на дне и раки в грядках
  box(-9,-4,0,1.0,-45,-40,M(0x7a4a2a),{occ:false});addMesh(new THREE.BoxGeometry(5.4,0.5,1),M(0x5a3214),-6.5,0.8,-39.8).rotation.x=0.3;
  addMesh(new THREE.CylinderGeometry(0.16,0.2,4.2,8),M(0x6a4a2a),-6.5,1.9,-36);W.cyls.push({x:-6.5,z:-36,r:0.2,miny:-1,maxy:3.1,on:true});
  addMesh(new THREE.CylinderGeometry(0.9,0.8,0.25,12),M(0x8a5a2a),-6.5,3.18,-36);W.cyls.push({x:-6.5,z:-36,r:0.95,miny:3.0,maxy:3.3,on:true});
  const rope=addMesh(new THREE.CylinderGeometry(0.03,0.03,1.6,5),M(0xd8c090),-6.0,4.2,-36.4);const flag=addMesh(new THREE.BoxGeometry(0.8,0.5,0.03),M(0xc0302a),-6.1,5.3,-36);
  addMesh(new THREE.CylinderGeometry(0.05,0.05,2.4,5),M(0x6a4a2a),-6.5,4.4,-36);
  const mastLink=linkItem(-6.5,3.95,-35.3);
  beds(-9.5,-2,-33,-27.5);beds(-9.4,-1.5,-49.5,-46);
  const jug=new THREE.Group();jug.position.set(-3.2,0,-43);W.group.add(jug);addMesh(new THREE.CylinderGeometry(0.32,0.42,0.9,12),M(0xb8703a),0,0.45,0,jug);addMesh(new THREE.CylinderGeometry(0.2,0.28,0.3,12),M(0xb8703a),0,1.05,0,jug);
  const jugNut=nutItem(-3.2,0.5,-43);jugNut.locked=true;jugNut.g.visible=false;
  W.lifts.push({pos:new V3(-3.2,0,-43),active:()=>!F.jug&&Z2.level<=Z2.floor+0.3,onLift:(h)=>{F.jug=true;SFX.toss();anim(0.8,k=>{jug.position.y=Math.sin(k*Math.PI)*1.6;jug.rotation.z=k*2.4;jug.position.x=-3.2+k*1.2;});
    later(0.4,()=>{jugNut.locked=false;jugNut.g.visible=true;});bark(h,'potap','Тяжёлый! Как… э-э… как положено.',2);}});
  // Игроку 2: стена огорода — лаз у самой земли (в отлив Йоша пролезет), за стеной калитка; бочка, из которой прилив поднимет орешек
  box(1.2,5,0,3.6,-38,-37,wood);box(6,10,0,3.6,-38,-37,wood);box(5,6,0.8,3.6,-38,-37,wood);
  const wgate=makeGate(6.4,9.6,-37.5,'own','wicket',{h:3.2});
  beds(1.8,9.6,-48,-40);const plateG=plate(8,-45.5,'wicket');plateG.once=true;
  const gardenLink=linkItem(4,1.1,-48.8);
  const barrel=new THREE.Group();barrel.position.set(4.2,0,-30.5);W.group.add(barrel);barrelMesh(barrel,1.6,1.8,1.6);W.cyls.push({x:4.2,z:-30.5,r:0.8,miny:-1,maxy:1.8,on:true});
  hut(7,9.6,-33,-28,3.3,0xc86a4a);
  const Z2=waterZone(-10,10,-50,-25.5,0,3.0,{shared:true,shell:{x:0,z:-25.2,y:0}});
  const barrelNut=floatItem(nutItem(4.2,0.5,-30.5),Z2,0.45);
  const G2={open:false};const gm=W.group.children.length;const g2col=colBox(-10,10,0,3.4,-51.2,-50.4);const g2=new THREE.Group();W.group.add(g2);
  for(let x=-9.5;x<10;x+=1.0)addMesh(new THREE.BoxGeometry(0.8,3.2,0.3),wood,x,1.6,-50.8,g2);addMesh(new THREE.BoxGeometry(20,0.2,0.4),M(0x5a3214),0,2.6,-50.8,g2);fadeable(g2);
  const crabs=[crab(-7,-30,Z2,{pi:0}),crab(-3.8,-31.5,Z2,{pi:0}),crab(-6,-47.5,Z2,{pi:0}),crab(6,-42,Z2,{pi:1}),crab(3.2,-45.5,Z2,{pi:1})];
  const inBeds=e=>(e.pos.x>-9.6&&e.pos.x<-1.9&&((e.pos.z<-27.4&&e.pos.z>-33.1)||(e.pos.z<-45.9&&e.pos.z>-49.6)))||(e.pos.x>1.7&&e.pos.z<-39.9&&e.pos.z>-48.1);
  crabs.forEach(e=>{e.beds=inBeds;});
  bell(-3,-26.6);bell(3,-26.6);
  /* ---------- 3. дыхание кита: фонтан в прилив — до облаков ---------- */
  ground(-10,10,-72,-52,0,grass,skinSide);bell(0,-52.8);
  hut(-9.6,-6.4,-60,-56.5,2.9,0xc8a04a);hut(6.4,9.6,-66,-62.5,2.9,0xc86a4a);const n5=nutItem(8,3.45,-64.2);
  const Z3=waterZone(-10,10,-68,-54,0,2.6,{shared:true,shell:{x:0,z:-53.7,y:0}});
  const BH={x:0,z:-61};addMesh(new THREE.CylinderGeometry(1.2,1.4,0.12,18),M(0x2a3040),BH.x,0.03,BH.z).receiveShadow=true;const bhr=addMesh(new THREE.TorusGeometry(1.35,0.12,8,24),skinSide,BH.x,0.1,BH.z);bhr.rotation.x=Math.PI/2;
  const col=new THREE.Mesh(new THREE.CylinderGeometry(0.9,1.3,1,16,1,true),MB(0xe8f8ff,{transparent:true,opacity:0.55,side:THREE.DoubleSide,depthWrite:false}));col.position.set(BH.x,0,BH.z);col.visible=false;W.group.add(col);
  const bubs=[0,1].map(i=>{const m=new THREE.Mesh(new THREE.SphereGeometry(0.5,14,10),MB(0xe8fcff,{transparent:true,opacity:0.6,depthWrite:false}));m.position.set(BH.x-0.8+i*1.6,6.4+i*0.5,BH.z);W.group.add(m);return m;});
  const cloud=(minx,maxx,top,minz,maxz)=>{box(minx,maxx,top-0.4,top,minz,maxz,MB(0xffffff),{occ:false});for(let i=0;i<5;i++)addMesh(new THREE.SphereGeometry(rand(0.8,1.3),10,8),MB(0xffffff),rand(minx+0.5,maxx-0.5),top-0.2,rand(minz+0.5,maxz-0.5)).castShadow=false;};
  cloud(-2.6,2.6,7.9,-66.2,-62.4);cloud(0.8,5.2,7.0,-71.6,-67.6);const cloudLink=linkItem(0,8.6,-64.6);
  /* ---------- 4. голова кита ---------- */
  ground(-10,10,-98,-72,4.5,M(0x6a7a96),skinSide);const endLink=linkItem(0,5.6,-86);bell(0,-76,4.5);
  for(let i=0;i<8;i++)addMesh(new THREE.CylinderGeometry(0.04,0.04,2.4,5),M(0x3a4050),rand(-9,9),5.5,rand(-96,-90)).rotation.z=rand(-0.5,0.5);   // усы кита
  /* ---------- сюжет и дыхание ---------- */
  const B={t:0,popped:[false,false]};
  function bylina(){const T=HERO;
    play({dur:12.4,fov:48,shots:[shot(0,[2.6,1.9,3.2],[T.potap.pos.x,1.3,T.potap.pos.z]),shot(6,[0,4,10],[0,1,0]),shot(8.2,[1.8,1.8,2.2],[T.potap.pos.x,1.4,T.potap.pos.z])],
      says:[[0.3,2.6,'potap','Как говаривал Илья…'],[3.1,2.4,'potap','Илья… какой Илья?'],[5.8,2.4,null,'<i>Потап молчит — долго, тяжело.</i>',true],[8.3,2.8,'potap','Забыл. Совсем забыл, как она начинается.'],[11.1,1.4,null,'<i>Никто не смеётся.</i>',true]],
      events:[{t:0,fn:()=>{T.potap.face=Math.PI*0.2;}},{t:5.8,fn:()=>{T.potap.face=Math.PI;}}],end:()=>{later(0.6,()=>say('zven','Рыба-кит. Тише — он спит. Вода тут общая!',2.8,true));}});}
  W.onWater=(z,st)=>{if(z===Z2&&st==='high'&&!F.hiTold){F.hiTold=true;bark(HERO.pelageya,'pelageya','Погоди, я пройду… Всё, давай, твой черёд!',2.4);}};
  W.updates.push(dt=>{
    // ворота к фонтану: открываются, когда оба сделали своё
    if(!G2.open&&F.mast&&F.garden){G2.open=true;SFX.gate();SFX.ok();g2col.on=false;anim(1.2,k=>{g2.position.y=-3.4*smooth(k);});banner('Ворота открыты!','#ffffff',1.8,'договорились — и прошли вдвоём');}
    if(plateG.done&&!F.garden){F.garden=true;wgate.latched=true;SFX.ok();floatText(new V3(8,1.8,-45.5),'Калитка открыта!','#ffffff');}
    // дыхание кита: цикл 10 с — два пузыря-отсчёта, выдох 3 с
    B.t=(B.t+dt)%10;const t=B.t,hi=Z3.level>Z3.floor+1.2,wl=Math.max(0,Z3.level);
    bubs.forEach((m,i)=>{const pop=4.5+i;const vis=t<pop;if(vis&&B.popped[i]&&t<1)B.popped[i]=false;m.visible=vis;if(vis)m.scale.setScalar(Math.min(1,t/1.2)*(1+0.06*Math.sin(G.time*6)));
      if(!vis&&!B.popped[i]){B.popped[i]=true;tone(1400-i*300,0.12,'sine',0.25,500);burst(m.position.clone(),0xe8fcff,10,3);}});
    const ex=t>6.5&&t<9.5;col.visible=ex;if(ex){const H=hi?6.4:1.2,k=Math.min(1,(t-6.5)/0.3)*(t>9.2?(9.5-t)/0.3:1);col.scale.set(1,Math.max(0.01,H*k),1);col.position.y=wl+H*k/2;
      if(!B.sfx){B.sfx=true;SFX.whoosh();SFX.splash();}
      for(const h of HEROES){if(h.cling||(h.launchT&&G.time-h.launchT<1.2))continue;if(hd(h.pos,BH)<1.5&&h.pos.y<wl+0.6&&h.grounded){h.launchT=G.time;h.vel.y=Math.sqrt(2*GRAV*(hi?6.2:1.1));h.vel.z=hi?-(-62.4-1.4-h.pos.z)/-1.05:0;h.vel.x=-h.pos.x*0.9;h.grounded=false;h.groundRef=null;h.tossT=1.4;h.aimT=hi?1.1:0;h.following=false;
        floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),hi?'До облаков!':'Плюх…',hi?'#ffffff':'#cfe8ff');if(!hi&&!F.lowTold){F.lowTold=true;tip(h.player,'В отлив фонтан еле плещет. Прилив сыграйте, как кит выдыхает!',3);}}}}
    else B.sfx=false;
    if(!F.out&&[0,1].every(pi=>active(pi).pos.z<-80&&active(pi).pos.y>4)&&[0,1].some(pi=>active(pi).pos.z<-88)){F.out=true;finishLevel();}
    whale.tail.rotation.x=Math.sin(G.time*0.5)*0.05;sea.position.y=-3.2+Math.sin(G.time*0.6)*0.1;flag.rotation.y=Math.sin(G.time*2)*0.3;});
  W.hittables.push({pos:new V3(-6.5,3.3,-36),r:1.0,push:false,alive:()=>!F.mast,onHit:h=>{if(h.pos.y<2.9)return;F.mast=true;SFX.latch();SFX.ok();anim(0.8,k=>{rope.scale.y=1-0.5*k;flag.position.y=5.3-2*k;});
    banner('Сходни опущены!','#ffffff',1.6,'верёвку дёрнули — ворота наполовину открыты');}});
  /* ---------- рисунки кнопок: просьба над раковиной видна обоим ---------- */
  const T=HERO,shellAt=z=>()=>z.shell.g.position.clone().add(new V3(0,2.6,0));
  const reqNote=z=>()=>{const r=z.req;if(!r)return '';return '<b style="color:'+PCSS[r.pi]+'">'+active(r.pi).d.name+'</b> просит '+(r.want==='high'?'прилив':'отлив')+(r.busy?' · ждём, пока все приземлятся':'')+'<span class="rq"><i style="width:'+Math.round(Math.min(1,r.t/2)*100)+'%"></i></span>';};
  for(const z of[Z1,Z2,Z3])for(const v of[0,1])prompt(v,'label',shellAt(z),()=>!!z.req,reqNote(z));
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>inZone(Z1,h(),0.3)&&Z1.state==='low'&&!Z1.req&&h().pos.z<-15,'прилив — через забор');
    prompt(pi,'item',()=>headOf(h()),()=>inZone(Z3,h(),0.3)&&Z3.state==='low'&&!Z3.req&&h().pos.y<1,'прилив, когда выдох');
    prompt(pi,'roll',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig==='red'&&e.help));
    prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig!=='red'&&e.help));
    prompt(pi,'attack',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&hd(e.pos,h().pos)<5&&(e.state==='broken'||e.open>0)));}
  prompt(0,'item',()=>headOf(active(0)),()=>!F.mast&&inZone(Z2,active(0),0.3)&&Z2.state==='low'&&!Z2.req&&active(0).pos.x<0,'прилив — к мачте');
  prompt(0,'attack',()=>headOf(active(0)),()=>!F.mast&&active(0).pos.y>2.9&&hd(active(0).pos,{x:-6.5,z:-36})<1.6,'дёрни верёвку');
  prompt(0,'skill',()=>headOf(T.potap),()=>!F.jug&&T.potap.active&&hd(T.potap.pos,{x:-3.2,z:-43})<2.3&&Z2.level<0.3,'поднять кувшин');
  prompt(0,'swap',()=>headOf(T.potap),()=>!F.jug&&T.proshka.active&&hd(T.proshka.pos,{x:-3.2,z:-43})<3&&Z2.level<0.3,'Потап поднимет');
  prompt(1,'item',()=>headOf(active(1)),()=>!F.garden&&inZone(Z2,active(1),0.3)&&Z2.state==='high'&&!Z2.req&&active(1).pos.x>0&&active(1).pos.z>-37,'отлив — к лазу');
  prompt(1,'swap',()=>headOf(T.yosha),()=>!F.garden&&T.pelageya.active&&T.pelageya.pos.z<-33&&T.pelageya.pos.z>-37.5&&T.pelageya.pos.x>0,'Йоша пролезет');
  /* ---------- задачи ---------- */
  const g1=pi=>O(()=>'Вода тут одна на двоих! У ракушки посерёдке сыграй '+K(pi,'item')+' — над ней просьба твоя встанет.<br>Через две секунды вода у обоих сменится. Прилив — и через забор плыви, пока не отстанет.',
      ()=>active(pi).pos.z<-23.4,()=>[Z1.shell.g]);
  W.objectives[0]=[O('Рыба-кит поперёк моря спит.<br>На спине у него — деревня с огородами стоит.',()=>active(0).pos.z<-7,()=>[]),g1(0),
    O(()=>'Мачта из воды торчит. В прилив до гнезда доплыви, верёвку дёрни '+K(0,'attack')+'.<br>А другу нужен отлив — договоритесь, кто первый, мой друг.',()=>F.mast,()=>[flag],()=>({kind:active(0).kind,action:'walk',from:new V3(-4,3.0,-33),to:new V3(-6.2,3.3,-35.6)})),
    O(()=>'Пока у друга отлив — на дне кувшин, Потап его поднимет '+K(0,'skill')+'. В грядках — раки, берегись!<br>Ворота откроются, как оба своё сделают, — не торопись.',()=>G2.open,()=>[jug,g2]),
    O(()=>'Фонтан кита! Лопнут два пузыря — кит выдохнет.<br>Встаньте на дыру в спине, прилив '+K(0,'item')+' — до облаков подкинет, как вздохнет.',()=>active(0).pos.y>6.5||active(0).pos.z<-72,()=>[bhr,bubs[0]]),
    O('Голова кита. Бери звено — и дальше в путь!',()=>false,()=>[endLink.g])];
  W.objectives[1]=[O('Рыба-кит поперёк моря спит.<br>На спине у него — деревня с огородами стоит.',()=>active(1).pos.z<-7,()=>[]),g1(1),
    O(()=>'Огород за стеной. Отлив '+K(1,'item')+' сделай — Йоша в лаз у земли пролезет.<br>За стеной — плита-калитка, она путь отрежет да и отверзет.',()=>F.garden,()=>[plateG.g],()=>({kind:'yosha',action:'walk',from:new V3(5.5,0,-35),to:new V3(5.5,0,-40)})),
    O(()=>'Сделай прилив — вода орешек из бочки подымет. Забери.<br>Ворота откроются, как оба своё сделают, — смотри.',()=>G2.open,()=>[barrel,g2]),
    O(()=>'Фонтан кита! Лопнут два пузыря — кит выдохнет.<br>Встаньте на дыру в спине, прилив '+K(1,'item')+' — до облаков подкинет, как вздохнет.',()=>active(1).pos.y>6.5||active(1).pos.z<-72,()=>[bhr,bubs[0]]),
    O('Голова кита. Бери звено — и дальше в путь!',()=>false,()=>[endLink.g])];
  W.tipZones.push({cond:(pi,h)=>h.grounded&&h.groundRef&&h.groundRef.water,text:pi=>'Ты плывёшь. Вода общая — сменить её можно лишь вместе.<br>Попроси друга: сыграй '+K(pi,'item')+' — и будет честь по чести.'},
    {cond:(pi,h)=>h.pos.y>6,text:pi=>'Облака! С облака на облако прыгай — и к киту на голову!'});
  W.spawns=[[new V3(-3,0,6),new V3(-5,0,7)],[new V3(3,0,6),new V3(5,0,7)]];W.startAct=[0,0];
  W.pauseLine='Рыба-кит: одна вода на двоих. Раковина посерёдке — общая:<br>Гусли просьбу кладут — через две секунды вода меняется у обоих, сообща.<br>А фонтан кита в прилив до облаков подкинет!';
  W.onStart=()=>{later(0.6,bylina);};
  flushDecor();}

