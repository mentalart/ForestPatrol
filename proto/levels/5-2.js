/* ============================== МИР 5 · 5-2 «ЗАЯЦ» — на четверых ============================== */
// четыре героя — четыре столба: между стоящими героями ближе 10 м натягивается нить; управляемый на ходу держит нить, но она мерцает
// заяц бежит к самой длинной мерцающей нити или к дырке · три круга, каждый меньше · «Ко мне!» зовёт оставленного друга закрыть дырку · финал — подкидка
function build52(){
  W.zvenAway=true;W.world=5;setTheme('buyan');sky('buyan');W.name='5-2 · Заяц';W.sub='Остров Буян · на четверых · изгородь из нитей';W.camX=24;const F=W.flags;F.stage='intro';
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.readHints=true;W.vestPull=true;const T=HERO;
  const Z=makeVestZ(helperOf(4));W.zven=Z;Z.pos.set(0,2.4,6);
  const grassM=M(0x86a860),C=new V3(0,0,-18);
  const sea=new THREE.Mesh(new THREE.PlaneGeometry(700,700),M(0x3a8ab8));sea.rotation.x=-Math.PI/2;sea.position.set(0,-0.7,0);W.group.add(sea);
  ground(-24,24,-42,10,0,grassM);wall(-24.2,-24,-42,10);wall(24,24.2,-42,10);wall(-24,24,-42.2,-42);wall(-24,24,10,10.2);
  // поляна: кусты по кругу, капустная грядка в середине — заяц к ней всегда возвращается
  for(let i=0;i<34;i++){const a=i/34*Math.PI*2,r=rand(15,17.5);if(Math.abs(Math.sin(a/2))<0.3)continue;const b=addMesh(new THREE.SphereGeometry(rand(0.9,1.4),8,6),M(0x4f7a3a),C.x+Math.sin(a)*r,0.6,C.z+Math.cos(a)*r);b.scale.y=0.7;W.cyls.push({x:C.x+Math.sin(a)*r,z:C.z+Math.cos(a)*r,r:1.1,miny:-1,maxy:1.4,on:true});}
  for(let i=0;i<9;i++){const a=i/9*Math.PI*2,c=addMesh(new THREE.SphereGeometry(0.34,8,6),M(0x9ad070),C.x+Math.sin(a)*0.9,0.28,C.z+Math.cos(a)*0.9);c.scale.set(1,0.7,1);}
  addMesh(new THREE.CylinderGeometry(1.6,1.7,0.12,16),M(0x6a4a2a),C.x,0.06,C.z);
  const oak=addMesh(new THREE.CylinderGeometry(3,4.5,30,14),M(0x5e4c3e),-30,12,-50);oak.castShadow=false;
  const N=[nutItem(-11,0.6,-10),nutItem(11,0.6,-25),nutItem(-3,0.6,-31)];W.linkTotal+=3;   // три звена — за три круга
  bell(-6,-3);
  /* ---------- кольца трёх кругов: цифра — порядок Смены, цвет — игрок ---------- */
  const ORDER=['proshka','pelageya','potap','yosha'];const RAD=[7,5,3.2];const ANG=[-Math.PI*0.75,-Math.PI*0.25,Math.PI*0.25,Math.PI*0.75];
  const spotPos=(k,i)=>new V3(C.x+Math.sin(ANG[i])*RAD[k],0,C.z+Math.cos(ANG[i])*RAD[k]);
  const SPOTS=RAD.map((R,k)=>ORDER.map((kind,i)=>{const p=spotPos(k,i),pi=HERO_DEF[kind].player;const g=new THREE.Group();g.position.copy(p);W.group.add(g);
    const rm=MB(PCOL[pi],{transparent:true,opacity:0.9});const r=new THREE.Mesh(new THREE.TorusGeometry(0.75,0.07,6,28),rm);r.rotation.x=Math.PI/2;r.position.y=0.05;g.add(r);
    const dg=makeDigit(0.55,MB(0xffd23a));dg.position.set(0,2.4,0);g.add(dg);setDigit(dg,i+1);g.visible=false;return {g,p,kind,pi,i,k,rm,dg};}));
  let circle=0;const showCircle=k=>{SPOTS.forEach((row,j)=>row.forEach(s=>{s.g.visible=j===k;}));};
  const onSpot=(h,k)=>{const s=SPOTS[k][ORDER.indexOf(h.kind)];return hd(h.pos,s.p)<1.0;};
  /* ---------- нити изгороди ---------- */
  const thM=[0,1,2,3].map(()=>M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.8,transparent:true,opacity:1}));
  const TH=[0,1,2,3].map(i=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,1,5),thM[i]);W.group.add(m);return {m,state:'none',len:0};});
  const still=h=>!h.active||Math.hypot(h.vel.x,h.vel.z)<0.6;
  function updFence(){for(let i=0;i<4;i++){const a=T[ORDER[i]],b=T[ORDER[(i+1)%4]];const pa=a.pos.clone().add(new V3(0,0.8,0)),pb=b.pos.clone().add(new V3(0,0.8,0));const d=pa.distanceTo(pb);const t=TH[i];t.len=d;
      t.state=d>=10?'none':(still(a)&&still(b))?'solid':'weak';t.m.visible=t.state!=='none';if(!t.m.visible)continue;
      t.m.position.copy(pa).lerp(pb,0.5);t.m.scale.set(1,d,1);t.m.quaternion.setFromUnitVectors(new V3(0,1,0),pb.clone().sub(pa).normalize());
      thM[i].opacity=t.state==='solid'?1:0.35+0.5*Math.abs(Math.sin(G.time*14));thM[i].emissiveIntensity=t.state==='solid'?0.9:0.3;}}
  const edgeMid=i=>T[ORDER[i]].pos.clone().lerp(T[ORDER[(i+1)%4]].pos,0.5);
  /* ---------- заяц ---------- */
  const hare=makeHare();hare.g.scale.setScalar(1.25);const HR={pos:new V3(C.x,0,C.z),state:'free',t:0,tgt:null,edge:-1,face:0,hop:0,cd:2,escapes:0};
  // пока круг не сомкнулся — носится по всей поляне
  function hareTick(dt){HR.t+=dt;const P=HR.pos;let sp=0,to=null;
    if(HR.state==='free'){if(!HR.tgt||P.distanceTo(HR.tgt)<0.6){const a=rand(0,Math.PI*2),r=rand(2,12);HR.tgt=new V3(C.x+Math.sin(a)*r,0,C.z+Math.cos(a)*r);}to=HR.tgt;sp=6.5;}
    else if(HR.state==='center'){HR.cd-=dt;if(!HR.tgt||P.distanceTo(HR.tgt)<0.3){const a=rand(0,6.28),r=rand(0.3,1.2);HR.tgt=new V3(C.x+Math.sin(a)*r,0,C.z+Math.cos(a)*r);}to=HR.tgt;sp=1.4;
      if(HR.cd<=0&&!F.sit){// ищет дырку или самую длинную мерцающую нить
        let best=-1,bl=-1;for(let i=0;i<4;i++){const t=TH[i];if(t.state==='solid')continue;const l=t.state==='none'?99:t.len;if(l>bl){bl=l;best=i;}}
        if(best>=0){HR.state='crouch';HR.t=0;HR.edge=best;SFX.red();floatText(P.clone().add(new V3(0,1.8,0)),TH[best].state==='none'?'Дырка!':'Нить мерцает!','#ff9a8a');}else HR.cd=0.4;}}
    else if(HR.state==='crouch'){to=null;const m=edgeMid(HR.edge);HR.face=Math.atan2(m.x-P.x,m.z-P.z);if(HR.t>0.7){HR.state='dash';HR.t=0;}}
    else if(HR.state==='dash'){const m=edgeMid(HR.edge);to=m;sp=6.2;if(P.distanceTo(new V3(m.x,0,m.z))<0.7){const t=TH[HR.edge];
        if(t.state==='solid'){HR.state='center';HR.cd=rand(1.2,2);HR.tgt=null;SFX.shield();floatText(P.clone().add(new V3(0,1.8,0)),'Бум! Изгородь держит — не пройдёшь','#ffe36b');burst(P.clone().add(new V3(0,0.8,0)),COL.gold,8,3);}
        else{HR.state='out';HR.t=0;HR.escapes++;const out=P.clone().sub(C).setY(0).normalize();HR.tgt=C.clone().addScaledVector(out,12);SFX.whoosh();banner('Заяц в дырку удрал!','#ffd0d0',1.6,'сейчас заяц к капусте вернётся — держите изгородь');
          if(HR.escapes===1)later(0.8,()=>bark(T.yosha,'yosha','Видишь дырку у друга — кличь: «Ко мне!»<br>Его столб покатится закрывать — вот и ладно вполне!',3));}}}
    else if(HR.state==='out'){to=HR.tgt;sp=6.5;if(P.distanceTo(HR.tgt)<0.8){const a=Math.atan2(P.x-C.x,P.z-C.z)+0.9;HR.tgt=new V3(C.x+Math.sin(a)*12,0,C.z+Math.cos(a)*12);}
      if(HR.t>4.5){HR.state='back';HR.t=0;}}
    else if(HR.state==='back'){to=C;sp=6;if(P.distanceTo(C)<1.2){HR.state='center';HR.cd=rand(1.5,2.5);HR.tgt=null;}}
    else if(HR.state==='sit'){to=null;}
    if(to){const d=P.distanceTo(new V3(to.x,0,to.z));if(d>0.05){const k=Math.min(1,sp*dt/d);P.x+=(to.x-P.x)*k;P.z+=(to.z-P.z)*k;HR.face=Math.atan2(to.x-P.x,to.z-P.z)||HR.face;}}
    const moving=to&&sp>2;HR.hop+=dt*(moving?9:3);const back=HR.state==='back'&&HR.t<0.6;
    hare.g.position.set(P.x,(moving?Math.abs(Math.sin(HR.hop))*0.5:0)+(back?Math.sin(HR.t/0.6*Math.PI)*3:0),P.z);hare.g.rotation.y=HR.face;
    hare.ears.forEach((e,i)=>{e.rotation.x=HR.state==='sit'?Math.sin(G.time*30+i)*0.25:HR.state==='crouch'?-0.6:Math.sin(G.time*4+i)*0.1;});hare.body.position.y=HR.state==='crouch'?-0.15:0;}
  /* ---------- «Ко мне!» — оставленный друга катится на своё кольцо ---------- */
  W.pingCall=(pi,h)=>{const own=other(pi);own.following=false;if(G.solo)for(const x of players[1-pi].heroes)x.following=false;if(F.stage!=='hunt')return;const q=other(1-pi);const tgtK=Math.min(2,circle);const s=SPOTS[tgtK][ORDER.indexOf(q.kind)];
    if(hd(q.pos,s.p)<1){floatText(q.pos.clone().add(new V3(0,q.d.height+0.6,0)),'Я на месте, здесь!',PCSS[1-pi]);return;}
    const from=q.pos.clone();SFX.roll();floatText(q.pos.clone().add(new V3(0,q.d.height+0.6,0)),'Качусь!',PCSS[1-pi]);q.rolling5=true;
    anim(0.9,k=>{q.pos.lerpVectors(from,s.p,smooth(k));q.face=Math.atan2(s.p.x-from.x,s.p.z-from.z);q.body.rotation.x=k<1?k*12:0;if(k>=1){q.rolling5=false;placeOnGround(q,s.p.x,s.p.z,0);q.vel.set(0,0,0);}});
    F.calls=(F.calls||0)+1;if(F.calls===2)later(1,()=>bark(T.pelageya,'pelageya','Теперь не зовём — вслух говорим!',2.2));};
  /* ---------- ход игры ---------- */
  function intro(){F.stage='introCine';HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-3,0);h.face=Math.PI;});
    play({dur:14,fov:48,camK:2.6,shots:[shot(0,[0,7,6],[0,0.5,-18]),shot(5.4,[-3,1.6,-4.6],[-1,0.9,-3.2]),shot(9.4,[2.5,2,-5],[0,1,-3])],
      says:[[0.3,4,null,'<i>Заяц по поляне носится — в нём утка сидит,</i><br><i>Руками не поймать: быстрей ветра бежит.</i>',true],[5.6,3.2,'yosha','Зайца не догнать. Зайца загоняют.'],[9.4,2.4,'potap','Слушаем ежа.'],[11.6,2.4,'pelageya','Тут написано… изгородь из нитей.']],
      end:()=>{W.anims.length=0;F.stage='hunt';HR.state='free';showCircle(0);HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-3,0);h.face=Math.PI;});snapCams();
        banner('Изгородь из нитей-ниток','#ffd76a',3,'меж героями, что ближе десяти шагов стоят, нить натягивается · пока идёшь — нить мигает');}});}
  function closeCircle(){const k=circle;SFX.ok();ringFx(new V3(C.x,0.1,C.z),COL.gold,RAD[k]+1);burst(new V3(C.x,1,C.z),COL.gold,20,4);giveLink(new V3(C.x,1,C.z),active(k%2),1.4,1.1);
    if(k===0&&HR.state==='free'){HR.state='back';HR.t=0;}
    if(k<2){circle=k+1;showCircle(circle);banner('Круг '+(k+1)+' сомкнулся!','#ffd76a',2.4,'сменяйтесь и подходите по одному — к кольцам поближе');
      if(k===0)later(1,()=>sayP('…смена, шаг, смена, шаг.',2.6));if(k===1)later(1,()=>bark(T.potap,'potap','Последний круг — три шага, всего три.',2.2));}
    else{circle=3;F.sit=true;HR.state='sit';HR.pos.copy(C);showCircle(-1);banner('Заяц сел в середине — попался!','#ffd76a',2.8,'Потап, подкинь '+K(0,'skill')+' Прошку — сверху на зайца он и упадёт');F.stage='toss';
      later(1,()=>bark(T.proshka,'proshka','Ну… лечу, лечу.',1.6));}}
  function finale(){F.stage='end';const pr=T.proshka,po=T.potap;
    play({dur:13,fov:46,camK:2.6,shots:[shot(0,[C.x+5,3,C.z+6],[C.x,1,C.z]),shot(4.6,[C.x+3,1.4,C.z+3.4],[C.x,0.8,C.z]),shot(8.2,[C.x,2,C.z+7],[C.x,8,C.z-6])],
      says:[[0.3,3.4,null,'<i>Потап подкидкой бросает Прошку прямо сверху — в объятия зайцу.</i>',true],[4.6,2.2,null,'<i>Заяц — апчхи!</i>',true],[6.8,3.4,null,'<i>…и утка из него выпархивает — прямо в небо.</i>',true],[10.2,2.4,'proshka','Держи её! …Улетела, эх.']],
      events:[{t:0.2,fn:()=>{placeOnGround(po,C.x+2.2,C.z+2.2,0);po.face=Math.atan2(-2.2,-2.2);placeOnGround(pr,C.x+1.6,C.z+1.6,0);const f=pr.pos.clone();anim(1.2,k=>{pr.pos.lerpVectors(f,new V3(C.x,0.9,C.z),k);pr.pos.y+=Math.sin(k*Math.PI)*5;});SFX.toss();po.atkT=0.3;}},
        {t:4.8,fn:()=>{SFX.whoosh();anim(0.5,k=>{hare.g.scale.setScalar(1.25+Math.sin(k*Math.PI)*0.3);});tone(1200,0.1,'square',0.05,300);}},
        {t:6.8,fn:()=>{const d=makeDuck();d.g.position.set(C.x,1.2,C.z);F.duck=d;anim(4,k=>{d.g.position.set(C.x+k*6,1.2+k*18,C.z-k*14);d.wings.forEach(w=>{w.w.rotation.z=w.s*Math.sin(G.time*20)*0.6;});});burst(new V3(C.x,1.4,C.z),0xc8a880,16,4);
          const hp=HR.pos.clone();anim(2.6,k=>{hare.g.position.set(hp.x-k*14,Math.abs(Math.sin(k*Math.PI*6))*1.2,hp.z+k*8);hare.g.rotation.y=Math.atan2(-14,8);});}}],
      end:()=>{W.anims.length=0;flushGifts();F.out=true;banner('Утка над морем улетела!','#ffd76a',2.6,'в лавке у Векши — заячьи уши, загляни!');later(1.8,finishLevel);}});}
  W.skillHook=(pi,h)=>{if(F.stage!=='toss'||pi!==0)return false;if(h.kind!=='potap'){tip(0,'Подкидывает Потап. Смени на него '+K(0,'swap')+'.',2);return true;}finale();return true;};
  W.updates.push(dt=>{
    if(G.cine)return;updFence();if(F.stage==='hunt'||F.stage==='toss')hareTick(dt);
    if(F.stage==='hunt'&&circle<3){const all=HEROES.every(h=>onSpot(h,circle)&&!h.rolling5);F.closeT=all&&HR.state!=='out'&&HR.state!=='dash'?(F.closeT||0)+dt:0;
      if(F.closeT>0.6){F.closeT=0;closeCircle();}}});
  W.camZones.push({x:C.x,y:0,z:C.z+1,r:10,camActive:()=>F.stage==='hunt'||F.stage==='toss'});
  /* ---------- рисунки кнопок и задачи ---------- */
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'call',()=>headOf(h()),()=>F.stage==='hunt'&&!G.cine&&TH.some(t=>t.state!=='solid')&&!onSpot(other(1-pi),Math.min(2,circle)),'позови — закрой дыру');
    prompt(pi,'swap',()=>headOf(h()),()=>F.stage==='hunt'&&!G.cine&&onSpot(h(),Math.min(2,circle))&&!onSpot(other(pi),Math.min(2,circle)),'переключись');}
  prompt(0,'skill',()=>headOf(T.potap),()=>F.stage==='toss'&&!G.cine,'подкидка!');
  const OR=(text,done,targets,ghost,read)=>{const o=O(text,done,targets,ghost);o.read=read;return o;};
  const mk=pi=>[
    OR('Заяц…',()=>F.stage!=='intro'&&F.stage!=='introCine',()=>[hare.g]),
    OR(()=>'На первый круг встаньте — все четверо: цифра и цвет — чьё кольцо.<br>Меж стоящими героями нить натянется — вот и крыльцо.',()=>circle>=1,()=>SPOTS[0].filter(s=>s.pi===pi).map(s=>s.g),null,'…оставленные — столбы, стоят.'),
    OR(()=>'Смена '+K(pi,'swap')+', шаг — по одному на кольца ближе.<br>Дырка у друга — «Ко мне!» '+K(pi,'call')+': его оставленный покатится закрывать, слышишь?',()=>circle>=2,()=>SPOTS[1].filter(s=>s.pi===pi).map(s=>s.g),null,'…смена, шаг, смена, шаг.'),
    OR(()=>'Последний круг — три шага. А заяц всё дырку ищет.',()=>circle>=3,()=>SPOTS[2].filter(s=>s.pi===pi).map(s=>s.g),null,'…последний круг — три шага, три.'),
    OR(pi?()=>'Заяц сел в середине, ушами дрожит. Потап Прошку подкидывает.':()=>'Потап — подкидка '+K(0,'skill')+': Прошку — сверху прямо на зайца.',()=>F.stage==='end',()=>[hare.g]),
    O('Утка…',()=>false,()=>[])];
  for(const pi of[0,1])W.objectives[pi]=mk(pi);
  W.tipZones.push({cond:(pi,h)=>F.stage==='hunt'&&!onSpot(h,Math.min(2,circle)),text:pi=>'Твоё кольцо — с цифрой, твоего цвета. Пока идёшь — нити твои мигают,<br>А заяц это видит — и дырку примечает.'});
  W.k52={circle:()=>circle,spot:(k,kind)=>SPOTS[k][ORDER.indexOf(kind)].p};   // для бота-напарника: какой круг и где кольцо героя
  W.spawns=[[new V3(-3,0,-3),new V3(-1,0,-3)],[new V3(1,0,-3),new V3(3,0,-3)]];W.startAct=[0,0];
  W.pauseLine='Заяц. Поймать нельзя — загоняют.<br>Четыре героя — четыре столба: ближе десяти шагов меж стоящими нить встаёт, а на ходу — мерцает.<br>На кольца круга встаньте, потом по одному — ближе.<br>Дырка у друга — «Ко мне!», и заяц не выскочит, слышишь?';
  W.onStart=()=>{intro();};
  flushDecor();}

