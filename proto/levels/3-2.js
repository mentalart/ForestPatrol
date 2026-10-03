/* ============================== МИР 3 · НЕБЕСНОЕ ЦАРСТВО · 3-2 «ОБЛАЧНЫЕ ПАСТБИЩА» ============================== */
// развитие пера: тёплый свет поднимает облака · живая вода делает облако пухлым · ловушка «я сам» · барашки-мостик · грозовые тучки
function rampWay(x0,y0,z0,x1,y1,z1,w,mat){W.ramps=W.ramps||[];const dx=x1-x0,dz=z1-z0,len=Math.hypot(dx,dz);const r={x0,z0,dx:dx/len,dz:dz/len,len,w:w/2,y0,y1};W.ramps.push(r);
  const m=addMesh(new THREE.BoxGeometry(w,0.3,Math.hypot(len,y1-y0)),mat||CLOUD_TOP,(x0+x1)/2,(y0+y1)/2-0.15,(z0+z1)/2);m.rotation.order='YXZ';m.rotation.y=Math.atan2(dx,dz);m.rotation.x=-Math.atan2(y1-y0,len);
  W.puffs=W.puffs||[];for(let i=0;i<Math.round(len/2);i++){const u=i/Math.max(1,Math.round(len/2)-1);for(const s of[-1,1])W.puffs.push({x:x0+dx*u+s*(w/2)*(dz/len),y:lerp(y0,y1,u)-0.5,z:z0+dz*u-s*(w/2)*(dx/len),s:rand(0.6,0.9)});}
  return r;}
function build32(){
  W.zvenAway=true;W.world=3;setTheme('heaven');W.name='3-2 · «Облачные пастбища»';W.sub='Небесное царство · тёплый свет поднимает облака';W.camX=14;const F=W.flags;F.stage='walk';
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.pero=true;W.fallY=-16;
  scene.background=new THREE.Color(0x4a4488);scene.fog=new THREE.Fog(0x4a4488,30,110);amb.intensity=0.56;
  heavenDecor(-120,20,{sunCol:0xffa070,sunY:10});const T=HERO;
  /* ---------- А. нижнее пастбище: облако любит тепло ---------- */
  cloudIsle(-9,9,-10,8,0);bell(-3,3);
  const C1=cloudLift(5,-5,0.08,6.2,{name:'c1'}),C1b=cloudLift(-5.2,-4,0.08,4.4,{name:'c1b'});
  const L1=linkItem(5,7.4,-5);const n1=nutItem(-5.2,5.6,-4);
  sheepFlock(5,{x:-3.5,y:0,z:3,r:2.6},{a:[40,0,40],b:[44,0,40]},[],{name:'deco'});
  const Z=makeZven();W.zven=Z;Z.pos.set(0,2.4,3);
  // упавший с облака — на нижний луг, дорога обратно — по облачной лестнице
  cloudIsle(-12,12,-17,-10.4,-5);rampWay(10.4,-5,-11,10.4,0,4.2,2);cloudIsle(8,12,4,7,0);
  /* ---------- Б. облачный луг выше: живая вода растит облака ---------- */
  const C2=cloudLift(0,-11.2,0.08,5.08,{name:'c2'});
  cloudIsle(-8,8,-30,-16,5);cloudIsle(-3,3,-16,-13.4,5);bell(3.5,-18,5);
  const C3=cloudLift(-5,-23,5.08,10.3,{name:'c3'});const L2=linkItem(-5,11.3,-23);const n2=nutItem(5.5,5.6,-28);
  /* ---------- В. обрыв: облако Потапа и соседнее, не политое ---------- */
  const C4=cloudLift(-2.2,-34,5.08,10.08,{name:'c4'}),C5=cloudLift(2.2,-34,5.08,10.08,{name:'c5'});cloudIsle(-4.5,4.5,-33,-30,5);cloudIsle(-4.5,4.5,-38,-35.7,10);
  cloudIsle(-12,12,-40,-30.4,-1);   // нижний луг под обрывом
  rampWay(10.6,-1,-31,10.6,5,-55,2);cloudIsle(9.4,14.6,-59,-55,5);rampWay(13.2,5,-57,13.2,10,-42,2);cloudIsle(8.6,14.4,-42,-38,10);
  const lowFlock=sheepFlock(4,{x:-4,y:-1,z:-35,r:3},{a:[60,-1,0],b:[64,-1,0]},[],{name:'low'});
  /* ---------- Г. верхнее пастбище: барашки бегут к свету и складываются мостиком ---------- */
  cloudIsle(-9,9,-56,-38,10);bell(-4,-40,10);
  addMesh(new THREE.CylinderGeometry(1.2,1.5,0.25,16),CLOUD_TOP,0,10.12,-54.2);W.cyls.push({x:0,z:-54.2,r:1.3,miny:5,maxy:10.25,on:true});edgeSign(1.8,10,-54.6,'light');
  const flock=sheepFlock(6,{x:-4,y:10,z:-46,r:3},{a:[0,9.1,-56.1],b:[0,9.1,-65.9]},[{x:0,y:10.25,z:-54.2}],{name:'bridge'});
  const n3=nutItem(7.6,10.6,-39.6);
  /* ---------- Д. грозовой луг: тучки и тени ---------- */
  cloudIsle(-11,11,-92,-66,10);wall(-11.2,-11,-92,-66);wall(11,11.2,-92,-66);bell(-3,-68,10);
  const L3=linkItem(0,11.1,-69.5);const n4=nutItem(-9.4,10.6,-90.4);
  /* ---------- Е. последнее облако — наверх ---------- */
  const C6=cloudLift(0,-93.3,10.08,15.08,{name:'c6'});
  cloudIsle(-7,7,-110,-95.6,15);bell(3,-98,15);const L4=linkItem(0,16.1,-106);const n5=nutItem(5.4,15.6,-108.6);
  /* ---------- сюжет ---------- */
  const say1=()=>later(0.8,()=>say('zven','Облака любят тепло. Дзинь!',2.4,true));
  let arena=null;
  function spawnStorm(){F.fight=true;arena=[tuchaFoe(-5,-75,{y:10}),tuchaFoe(5,-77,{y:10}),tuchaFoe(-4,-85,{y:10}),tuchaFoe(4.5,-87,{y:10}),tenFoe(0,-81,{y:10}),tenFoe(-7,-89,{y:10}),tenFoe(7.5,-71,{y:10})];
    banner('Грозовые тучки!','#9fd0ff',2.4,'тучка искрит: синяя капля-молния — щит, в последний миг отбей назад · в свете тучка мягка');later(1.4,()=>say('zven','Свет — это оружие. Круг ходит с тобой!',2.6,true));}
  function trapArm(){F.trap='armed';bark(T.potap,'potap','Йоша, давай ко мне — довезу, не бойся.',2.6);}
  function trapFall(){F.trap='fell';meltCloud(C5);F.yoshaFloat=true;bark(T.yosha,'yosha','Я сам! Не мал, не слаб!',1.6);F.noCarry={minx:-12,maxx:12,miny:-3,maxy:2.5,minz:-40,maxz:-30.4};W.noCarry.push(F.noCarry);
    later(2.5,()=>{tip(1,'Йоша внизу, на лугу. Назад путь долог — по облачной лестнице, мимо барашков.<br>Потап ждать не станет — не до шашек.',3.6);});}
  function trapRide(){F.trap='rode';later(0.4,()=>bark(T.yosha,'yosha','Ладно. На этот раз — вези.',2.4));}
  W.onPuff=(c)=>{if(!F.puffTold){F.puffTold=true;later(0.4,()=>bark(T.pelageya,'pelageya','Я поливаю — ты подымаешь!',2.2));}};
  W.updates.push(dt=>{
    if(F.stage==='walk'&&[0,1].some(pi=>active(pi).pos.z<4)){F.stage='free';}
    // ловушка «я сам»: Потап на пухлом облаке у обрыва зовёт Йошу
    const Y=T.yosha,P=T.potap;
    if(!F.trap&&P.groundRef===C4&&C4.puffy&&Y.active&&hd(Y.pos,C4)<7&&Math.abs(Y.pos.y-5)<1.2&&Y.pos.z>-33.1)trapArm();
    if(F.trap==='armed'){if(Y.groundRef===C5&&!C5.puffy)trapFall();else if(Y.groundRef===C4)trapRide();else if(Y.groundRef===C5)F.trap='own';}
    if(F.yoshaFloat){if(Y.vel.y<-3)Y.vel.y=-3;Y.extraY=0;if(Y.grounded&&Y.pos.y<0){F.yoshaFloat=false;F.yoshaLow=true;F.lowT=0;}}
    if(F.yoshaLow){F.lowT+=dt;if(Y.pos.y>9.5&&Y.pos.z<-37){F.yoshaLow=false;W.noCarry.splice(W.noCarry.indexOf(F.noCarry),1);later(0.5,()=>bark(Y,'yosha','Ну и ладно. В другой раз… подожду.',2.8));}}
    if(!F.fight&&[0,1].some(pi=>active(pi).pos.z<-67.2&&active(pi).pos.y>9))spawnStorm();
    if(F.fight&&!F.cleared&&arena.every(e=>!e.alive)){F.cleared=true;SFX.ok();banner('Гроза прошла!','#9fd0ff',2,'последнее облако — ввысь');}
    if(!F.out&&[0,1].every(pi=>active(pi).pos.y>14.5&&active(pi).pos.z<-96.5)){F.out=true;later(0.6,()=>{banner('Облачные пастбища','#ffe08a',2.4,'в лавке у Векши — тулупчик-облачко, загляни!');later(1.8,finishLevel);});}});
  flock.onBridge=()=>{if(!F.sheepTold){F.sheepTold=true;later(0.3,()=>bark(T.proshka,'proshka','Живой мост! Бегом, пока свет не погас!',2.4));}};
  /* ---------- рисунки кнопок ---------- */
  const onC=(h,c)=>h.groundRef===c;
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>!h().lit&&W.clouds.some(c=>onC(h(),c)&&c.y<c.ceil-0.5),'посвети — облако поднимется');
    prompt(pi,'jump',()=>headOf(h()),()=>W.clouds.some(c=>onC(h(),c)&&c.y>=c.ceil-0.05),'прыгай!');
    prompt(pi,'item',()=>headOf(h()),()=>!h().lit&&hd(h().pos,{x:0,z:-54.2})<1.5&&h().pos.y>9.8&&!flock.on,'посвети — барашки придут');
    prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.help)||W.bolts.some(b=>b.tgt===h()&&!b.refl&&b.eta<0.8));
    prompt(pi,'item',()=>headOf(h()),()=>!h().lit&&W.enemies.some(e=>e.alive&&!e.litNow&&hd(e.pos,h().pos)<5),'посвети');
    prompt(pi,'attack',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&hd(e.pos,h().pos)<4&&(e.state==='broken'||(e.litNow&&e.open>0))),'');}
  prompt(1,'skill',()=>headOf(T.yosha),()=>T.yosha.active&&W.waterTargets.some(w=>w.active()&&hd(w.pos,T.yosha.pos)<3),'живая вода');
  prompt(1,'label',()=>new V3(C4.x,C4.y+2.3,C4.z),()=>F.trap==='armed'&&Math.sin(G.time*8)>-0.3,'облако Потапа');
  prompt(1,'label',()=>new V3(C5.x,C5.y+2.3,C5.z),()=>F.trap==='armed'&&Math.sin(G.time*8+1.5)>-0.3,'соседнее, не полито');
  /* ---------- задачи ---------- */
  const mk=pi=>[
    O(()=>'Облачные пастбища! Звенья высоко висят.<br>Облака тепло любят: встань на облачко, зажги перо '+K(pi,'item')+' — подымет, как в сказке говорят.',()=>C1.y>3||L1.taken||active(pi).pos.z<-10.5,()=>[C1.g,L1.g],()=>({kind:active(pi).kind,action:'jump',from:new V3(3.2,0,-3.6),to:new V3(5,0.52,-5)})),
    O(pi?()=>'Облако к лугу повыше. Потап тяжёл. Смени на Йошу '+K(1,'swap')+', живой водой '+K(1,'skill')+' облако полей —<br>Станет пухлым, не растает и Потапа выдержит, ей-ей.':()=>'Облако к лугу повыше: встань да посвети.<br>Потап тяжёл — облако для него Йоша пухлым сделает в пути.',
      ()=>active(pi).pos.z<-16.3&&active(pi).pos.y>4.5,()=>[C2.g]),
    O(()=>'Высокое звено над облаком. Поднятое облако тает за пятнадцать секунд —<br>А перед тем мигает: мол, берегитесь, вот-вот капут.',()=>L2.taken||active(pi).pos.z<-31,()=>[C3.g,L2.g]),
    O(pi?()=>'Обрыв и два облака. Потап к себе зовёт. На какое облако Йоша пойдёт?':()=>'Обрыв и два облака. Потапа на пухлое облако поставь, посвети.<br>Кликни Йошу — довезёшь в пути.',()=>active(pi).pos.y>9.5&&active(pi).pos.z<-37.8,()=>[C4.g,C5.g]),
    O(()=>'Облачные барашки к свету бегут. Зажги перо '+K(pi,'item')+' на холмике у края —<br>Барашки мостиком встанут. Погасишь — разбегутся, играя.',()=>active(pi).pos.z<-66.5,()=>[flock.list[0].m.g],()=>({kind:active(pi).kind,action:'walk',from:new V3(-2,10,-50),to:new V3(0,10.25,-54.2)})),
    O(()=>'Грозовые тучки! Во тьме их не пробить — посвети '+K(pi,'item')+'.<br>Синяя молния: щитом '+K(pi,'guard')+' закройся, а в последний миг — назад отбей, не спи!',()=>F.cleared,()=>arena?arena.filter(e=>e.alive).map(e=>e.g):[]),
    O('Последнее облако — наверх, к звену!',()=>false,()=>[C6.g,L4.g])];
  for(const pi of[0,1])W.objectives[pi]=mk(pi);
  W.tipZones.push({cond:(pi,h)=>h.pos.y<-0.5&&h.pos.y>-6&&h.pos.z<-10&&h.pos.z>-17.5,text:pi=>'Нижний луг. Облачная лестница справа наверх ведёт.'},
    {cond:(pi,h)=>h.pos.y<4&&h.pos.z<-30&&h.pos.z>-60&&h.pos.x<9,text:pi=>'Ты внизу, на лугу под обрывом. Наверх — по облачной лестнице справа, вперёд.'},
    {cond:(pi,h)=>W.clouds.some(c=>h.groundRef===c&&!c.puffy&&c.meltT>9),text:pi=>'Облако мигает — сейчас растает! Прыгай иль спускайся!'});
  W.spawns=[[new V3(-2.6,0,5),new V3(-4.6,0,6)],[new V3(2.6,0,5),new V3(4.6,0,6)]];W.startAct=[0,0];
  W.pauseLine='Облачные пастбища: облако под горящим пером подымается, во тьме — опускается,<br>Поднятое за пятнадцать секунд тает. Живая вода Йоши облако пухлым делает.<br>А барашки к свету бегут — не отстают.';
  W.onStart=say1;
  flushDecor();flushPuffs();}

