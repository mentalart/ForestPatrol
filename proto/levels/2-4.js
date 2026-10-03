/* ============================== 2-4 «В БРЮХЕ У КИТА» — асимметричная сцена ============================== */
// общий экран · глотка → перепонки под стук сердца → желудочное озеро (ворота открывает друг, светящиеся жилки; Йоша просит) → кислые лужи и драка → сердце: клапаны-батуты, пузырь с Пелагеей, реснички вдвоём — кит чихает
function build24(){
  W.zvenAway=true;W.world=2;W.bubbles=false;setTheme('belly');W.name='2-4 · «В брюхе у кита»';W.sub='Подводный Китеж · внутри кита — целый мир';W.camX=10;const F=W.flags;F.t=0;
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.gusli=true;W.fallY=-8;W.ladleHeals=true;W.noSplit=true;
  const BG=0x4a1830;scene.background=new THREE.Color(BG);scene.fog=new THREE.Fog(BG,18,64);amb.color.set(0xffc8d8);amb.intensity=0.78;sun.color.set(0xffb8c8);sun.intensity=0.6;
  const flesh=M(0xd2707e),fleshDk=M(0xa8465e),wallM=M(0xb8506a),pale=M(0xf4e4d8),wood=M(0x8a5a30);
  const T=HERO;
  /* ---------- сердце кита бьётся: всё вокруг живёт в его такт ---------- */
  const HB={t:0,per:1.8,k:0,pulse:0,beat:0};
  const glows=[];
  /* ---------- стены, рёбра, огоньки планктона ---------- */
  wall(-10.6,-10,-120,10);wall(10,10.6,-120,10);wall(-10.6,10.6,10,10.6);wall(-10.6,10.6,-120.6,-120);
  for(const s of[-1,1]){const m=W.group.children.length;box(s*10-0.3,s*10+0.3,0,7,-120,10,wallM,{solid:false});fadeable(since(m));}
  for(let z=6;z>-118;z-=4.5){const rib=new THREE.Mesh(new THREE.TorusGeometry(10.2,0.35,6,20,Math.PI),pale);rib.position.set(0,0,z);rib.castShadow=false;W.group.add(rib);}
  for(let i=0;i<14;i++){const c=i%2?0xff9ab8:0x9affe0;const l=new THREE.PointLight(c,0.8,16,2);l.position.set(i%2?-6:6,6.5,6-i*9);W.group.add(l);glows.push({l,base:0.8});
    const m=addMesh(new THREE.SphereGeometry(0.22,10,8),MB(c),l.position.x,l.position.y,l.position.z);m.castShadow=false;}
  {const n=500,pos=new Float32Array(n*3);for(let i=0;i<n;i++){pos[i*3]=rand(-9.5,9.5);pos[i*3+1]=rand(0.4,8);pos[i*3+2]=rand(-118,8);}
    const gg=new THREE.BufferGeometry();gg.setAttribute('position',new THREE.BufferAttribute(pos,3));var plank=new THREE.Points(gg,new THREE.PointsMaterial({color:0xaaffee,size:0.09,transparent:true,opacity:0.8}));W.group.add(plank);}
  const jellies=[];for(let i=0;i<9;i++){const g=new THREE.Group();W.group.add(g);const c=[0xffb0e0,0xb0e8ff,0xd0b0ff][i%3];
    const d=new THREE.Mesh(new THREE.SphereGeometry(0.6,14,8,0,Math.PI*2,0,Math.PI/2),MB(c,{transparent:true,opacity:0.55}));g.add(d);
    for(let k=0;k<5;k++){const t=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,1.2,4),MB(c,{transparent:true,opacity:0.5}));t.position.set(Math.cos(k*1.25)*0.35,-0.6,Math.sin(k*1.25)*0.35);g.add(t);}
    g.userData={x:(i%2?1:-1)*rand(4,8.5),y:rand(3.5,6.5),z:rand(-112,2),ph:rand(0,6.28)};jellies.push(g);}
  const Z=makeZven();W.zven=Z;Z.pos.set(0,2.8,0);
  /* ---------- А. глотка: язык и зубы ---------- */
  ground(-10,10,-6,8,0,flesh);
  {const tg=addMesh(new THREE.SphereGeometry(1,18,10),M(0xe8889a),0,0,2);tg.scale.set(6,0.35,7);tg.receiveShadow=true;}
  for(let z=7;z>-5;z-=1.6)for(const s of[-1,1]){addMesh(new THREE.ConeGeometry(0.45,1.5,6),pale,s*8.8,0.75,z);addMesh(new THREE.ConeGeometry(0.45,1.5,6),pale,s*8.8,6.2,z).rotation.x=Math.PI;}
  bell(0,5);
  /* ---------- Б. перепонки сердца: раскрываются под стук, у каждой свой такт ---------- */
  ground(-10,10,-32,-6,0,flesh);
  const MEMB=[-12,-19,-26].map((z,i)=>{const g=new THREE.Group();g.position.set(0,0,z);W.group.add(g);const pm=M(0xff7a9a,{transparent:true,opacity:0.85,emissive:0xff4070,emissiveIntensity:0.3,side:THREE.DoubleSide});
    const petals=[];for(let k=0;k<10;k++){const p=new THREE.Group();p.rotation.z=k/10*Math.PI*2;g.add(p);const leaf=new THREE.Mesh(new THREE.CircleGeometry(5.6,3,-0.32,0.64),pm);leaf.position.y=0;p.add(leaf);petals.push(p);}
    g.position.y=3.6;const col=colBox(-10,10,-1,8,z-0.3,z+0.3,false);return {z,g,pm,petals,col,off:i*0.28,open:true,was:true};});
  const membOpen=m=>((HB.t/HB.per+m.off)%1)<0.52;
  const link1=linkItem(0,1.1,-30);nutItem(8.4,0.6,-15.5);bell(0,-8.5);
  /* ---------- В. желудочное озеро: два берега, каждые ворота открывает друг ---------- */
  ground(-10,10,-36,-32,0,flesh);ground(-10,-4,-64,-36,0,flesh);ground(4,10,-64,-36,0,flesh);ground(-4,4,-60,-36,-2.2,fleshDk);ground(-4,4,-64,-60,0,flesh);
  for(const x0 of[-4.0,3.2])for(let i=0;i<7;i++)box(x0,x0+0.8,-2.2,-1.886+i*0.314,-40.6+i*0.6,-40+i*0.6,fleshDk,{occ:false});   // ступени в озеро с обоих берегов
  const LAKE=waterZone(-4,4,-60,-36,-2.2,0,{floor:-2.2,start:'high',shell:{x:-4.7,z:-35.4,y:0},color:0x6ad0c0,op:0.5});
  // затонувший корабль на дне: звено в трюме — достать можно в отлив
  {const sg=new THREE.Group();sg.position.set(0,-2.2,-50);sg.rotation.y=0.3;W.group.add(sg);boatMesh(sg,2.6,1.0,6.5);const mast=addMesh(new THREE.CylinderGeometry(0.1,0.12,3.2,6),wood,0,2,0,sg);mast.rotation.z=0.4;}
  const link2=linkItem(0.2,-1.2,-51.2);
  // правый берег: больной клапан — живая вода Йоши откроет ЛЕВЫЕ ворота
  const valve=new THREE.Group();valve.position.set(9.3,1.2,-50);W.group.add(valve);const vm=M(0xff5a5a,{emissive:0xff2020,emissiveIntensity:0.7});addMesh(new THREE.SphereGeometry(0.7,14,10),vm,0,0,0,valve);
  for(let k=0;k<6;k++)addMesh(new THREE.ConeGeometry(0.12,0.5,5),vm,Math.cos(k)*0.55,Math.sin(k)*0.55,0,valve).rotation.z=k;
  // левый берег: колокол над озером — рогатка Прошки откроет ПРАВЫЕ ворота (метка — когда Йоша попросит)
  const bl=bigBell(-2.4,5.4,-47,0.6,{pitch:1.1});const bmark=markMesh(1.1);bmark.position.set(-2.4,4.5,-46.3);bmark.visible=false;W.group.add(bmark);
  const gates=[-1,1].map(s=>{const g=new THREE.Group();W.group.add(g);const gm=M(0x9a3a60,{emissive:0x400010,emissiveIntensity:0.3});
    for(let k=0;k<5;k++)addMesh(new THREE.BoxGeometry(1.8,4.2,0.5),gm,s*(1.9+k*1.8),2.1,-64,g);return {g,s,col:colBox(s<0?-10:1,s<0?-1:10,0,4.2,-64.3,-63.7,false),open:false};});
  box(-1,1,0,4.6,-64.4,-63.6,wallM);
  const openGate=i=>{const G2=gates[i];if(G2.open)return;G2.open=true;G2.col.on=false;SFX.gate();anim(1.4,k=>{G2.g.position.y=4.4*smooth(k);});};
  // светящиеся жилки: от устройства к тем воротам, что оно откроет
  const vein=(pts,col)=>{const mat=MB(col,{transparent:true,opacity:0.35});const segs=[];for(let i=0;i<pts.length-1;i++){const a=pts[i],b=pts[i+1],L=Math.hypot(b[0]-a[0],b[1]-a[1]);const m=new THREE.Mesh(new THREE.BoxGeometry(0.16,0.05,L),mat);
      m.position.set((a[0]+b[0])/2,a[2]!==undefined?a[2]:0.04,(a[1]+b[1])/2);m.rotation.y=Math.atan2(b[0]-a[0],b[1]-a[1]);W.group.add(m);segs.push(m);}return {mat,segs};};
  const vL=vein([[9.3,-50,0.05],[9.3,-62,0.05],[5,-62.6,0.05],[4.2,-62.6,0.05],[-4.2,-62.6,0.05],[-5.5,-63,0.05]],0x9affb0);   // клапан → левые ворота
  const vR=vein([[-2.4,-47,0.05],[-4.6,-47,0.05],[-4.6,-61.8,0.05],[4.6,-61.8,0.05],[5.5,-63,0.05]],0xffe08a);                  // колокол → правые ворота
  nutItem(-8.6,0.6,-58);bell(-7,-37);bell(7,-37);
  W.waterTargets.push({pos:new V3(9.3,0,-50),active:()=>!gates[0].open,onWater:()=>{vm.color.setHex(0xf4b0b8);vm.emissiveIntensity=0.1;SFX.ok();openGate(0);sighFx();
    banner('Кит облегчённо вздохнул — уф!','#ffffff',1.8,'левые ворота отворились — жилка довела');later(1,()=>bark(T.potap,'potap','Спасибо, Йоша, дружок!',1.8));}});
  W.marks.push({pos:bmark.position,active:()=>F.ask&&!gates[1].open,onHit:()=>{bmark.visible=false;bl.ring();openGate(1);banner('Динь-дон!','#ffd76a',1.6,'Йоша попросил — ворота и отворились');later(1.2,()=>bark(T.yosha,'yosha','Спасибо, Прошка, выручил!',2));}});
  function askScene(){if(F.ask)return;F.ask=true;bmark.visible=true;bl.mat.emissiveIntensity=0.6;SFX.call();
    say('yosha','Прошка! Позвони в колокол! Пожалуйста, прошу!',3.4);floatText(active(1).pos.clone().add(new V3(0,1.6,0)),'Прошка! Позвони в колокол! Пожалуйста, прошу!','#8fe0d4');
    later(0.4,()=>tip(0,'Йоша просит: позвони в колокол над озером!<br>Из рогатки Прошки '+K(0,'skill')+' стрельни — звон пойдёт по водам.',3.6));for(let i=0;i<3;i++)later(i*0.5,()=>ringFx(new V3(-2.4,4.2,-47),COL.gold,2.5));}
  W.pingCall=(pi,h)=>{if(pi===1&&!F.ask&&h.pos.x>2&&h.pos.z<-44)askScene();};
  /* ---------- Г. кислые лужи и драка у сфинктера ---------- */
  ground(-10,10,-86,-64,0,flesh);
  const ACID=[[-5.5,-69,1.4],[4.5,-72,1.6],[-2,-78,1.3],[6,-81,1.2]].map(([x,z,r])=>{const m=new THREE.Mesh(new THREE.CircleGeometry(r,20),M(0x9aff4a,{emissive:0x4aa010,emissiveIntensity:0.8,transparent:true,opacity:0.85}));m.rotation.x=-Math.PI/2;m.position.set(x,0.03,z);W.group.add(m);return {x,z,r,m};});
  const arena={started:false,cleared:false,list:[]};
  const door=new THREE.Group();door.position.set(0,0,-86);W.group.add(door);const dm=M(0xc04a6a,{emissive:0x600020,emissiveIntensity:0.3});for(let k=0;k<8;k++){const p=new THREE.Group();p.rotation.z=k/8*Math.PI*2;door.add(p);const leaf=new THREE.Mesh(new THREE.CircleGeometry(4.6,3,-0.4,0.8),dm);p.add(leaf);}door.position.y=3.6;
  const doorCol=colBox(-10,10,-1,8,-86.3,-85.7,false);
  nutItem(-8.4,0.6,-74);bell(0,-66);
  /* ---------- Д. сердце кита: клапаны-батуты, пузырь с Пелагеей, реснички ---------- */
  ground(-10,10,-120,-86,0,flesh);
  const heart=new THREE.Group();heart.position.set(-3.5,3.6,-104);W.group.add(heart);const hm=M(0xe0304a,{emissive:0x800010,emissiveIntensity:0.5});
  addMesh(new THREE.SphereGeometry(1.6,20,14),hm,-0.7,0,0,heart);addMesh(new THREE.SphereGeometry(1.6,20,14),hm,0.7,0,0,heart);const tip2=addMesh(new THREE.ConeGeometry(1.9,2.4,18),hm,0,-1.6,0,heart);tip2.rotation.z=Math.PI;
  for(let k=0;k<4;k++){const v=addMesh(new THREE.CylinderGeometry(0.12,0.16,4,6),M(0x6a2a8a),rand(-1,1),2.2,rand(-0.5,0.5),heart);v.rotation.z=rand(-0.4,0.4);}
  W.cyls.push({x:-3.5,z:-104,r:2.2,miny:-1,maxy:6,on:true});
  box(3.5,10,0,4.2,-103,-96,wallM);   // уступ у пузыря
  const pads=[[6.2,-93.2],[-7,-96]].map(([x,z])=>{const m=addMesh(new THREE.CylinderGeometry(1.0,1.15,0.35,16),M(0xff8ab0,{emissive:0xff3070,emissiveIntensity:0.4}),x,0.17,z);return {x,z,m,cd:0};});
  const bub=new THREE.Mesh(new THREE.SphereGeometry(1.5,20,16),MB(0xd8f6ff,{transparent:true,opacity:0.25,depthWrite:false}));bub.position.set(6.8,6.0,-99.5);bub.renderOrder=5;bub.visible=false;W.group.add(bub);
  const bdrop=dropMesh(0x3a1a4a);bdrop.scale.setScalar(0.45);bdrop.position.set(5.6,5.2,-99.2);bdrop.visible=false;W.group.add(bdrop);
  W.waterTargets.push({pos:new V3(6.6,0,-99.4),pri:1,active:()=>F.caught&&!F.freed&&T.yosha.pos.y>3.4,onWater:()=>freeScene()});
  const CIL=[-5,0,5].map(x=>{const g=new THREE.Group();g.position.set(x,0,-114);W.group.add(g);const cm=M(0xffd0dc,{emissive:0xff80a0,emissiveIntensity:0.2});
    const segs=[];let par=g;for(let k=0;k<5;k++){const s=new THREE.Group();s.position.y=k?0.9:0;par.add(s);addMesh(new THREE.CylinderGeometry(0.22-k*0.03,0.26-k*0.03,0.9,8),cm,0,0.45,0,s);segs.push(s);par=s;}
    const dots=[0,1].map(pi=>{const d=new THREE.Mesh(new THREE.SphereGeometry(0.18,10,8),MB(0x555555));d.position.set(pi?0.4:-0.4,5.2,0);g.add(d);return d;});
    W.cyls.push({x,z:-114,r:0.4,miny:-1,maxy:4.6,on:true});return {x,g,segs,cm,dots,hit:[-9,-9],done:false};});
  const linkFinal=linkItem(0,-40,0);linkFinal.locked=true;linkFinal.g.visible=false;
  nutItem(8.6,4.8,-100.5);bell(0,-89);
  CIL.forEach((c,i)=>W.hittables.push({pos:new V3(c.x,1.2,-114),r:1.0,push:false,alive:()=>F.freed&&!c.done,onHit:h=>{c.hit[h.player]=G.time;if(G.solo)c.hit[1-h.player]=G.time;c.dots[h.player].material.color.setHex(PCOL[h.player]);SFX.flower();
    floatText(new V3(c.x,2.6,-114),'Щекотно!','#ffd0e0');const other=c.hit[1-h.player];if(G.time-other<1.3){c.done=true;SFX.ok();burst(new V3(c.x,3,-114),0xffd0e0,18,4);floatText(new V3(c.x,4,-114),'Кит морщит нос — вот-вот!','#ffffff');
      if(CIL.every(q=>q.done))later(1,sneeze);}
    else if(!F.cilTold){F.cilTold=true;for(const pi of[0,1])tip(pi,'Реснички щекочут вдвоём: одну ресничку разом ударьте '+K(pi,'attack')+'!',3);}}}));
  function sighFx(){SFX.wave();shakeAll(0.03,0.5);for(let i=0;i<12;i++)burst(new V3(rand(-9,9),rand(1,6),active(0).pos.z+rand(-8,4)),0xffd8e0,3,2,0.6);}
  /* ---------- сюжет ---------- */
  const OUTZ=220;const outG=new THREE.Group();outG.position.set(0,0,OUTZ);W.group.add(outG);{const s=new THREE.Mesh(new THREE.PlaneGeometry(200,200),MB(0x2a7aa0));s.rotation.x=-Math.PI/2;s.position.y=-0.2;outG.add(s);
    const sb=new THREE.Mesh(new THREE.CylinderGeometry(6,7,0.6,20),M(0xe2c98f));sb.position.set(0,-0.1,6);outG.add(sb);}
  colBox(-6.5,6.5,-4,0.2,OUTZ-0.5,OUTZ+12.5);
  const wh=makeWhale(90,{awake:true});wh.g.position.set(0,-2,OUTZ-50);wh.g.rotation.y=Math.PI;
  const skyOn=on=>{if(on){scene.background=new THREE.Color(0x8fd0f0);scene.fog=new THREE.Fog(0x8fd0f0,30,160);amb.intensity=0.8;}else{scene.background=new THREE.Color(BG);scene.fog=new THREE.Fog(BG,18,64);amb.intensity=0.78;}};
  const startPos=()=>{[[T.proshka,-2.5,4],[T.potap,-4.5,5],[T.pelageya,2.5,4],[T.yosha,4.5,5]].forEach(([h,x,z])=>{placeOnGround(h,x,z,0);h.face=Math.PI;h.g.scale.setScalar(1);});};
  function intro(){skyOn(true);HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,OUTZ+6,0);h.pos.y=0.2;h.face=Math.PI;});
    play({dur:11,fov:48,camK:3,shots:[shot(0,[8,6,OUTZ+16],[0,2,OUTZ-6]),shot(3.6,[4,2.4,OUTZ+10],[0,1,OUTZ+4]),shot(6.4,[3,3,10],[0,1.4,0])],
      says:[[0.3,3.2,null,'<i>Рыба-кит зевает — и всех четверых проглатывает.</i>',true],[6.6,2.4,'potap','Держимся вместе, не разлучаемся!'],[8.8,2.2,'zven','Внутри кита — целый мир! Ищем выход — чтобы кит чихнул!']],
      events:[{t:0.8,fn:()=>{SFX.whoosh();anim(1.8,k=>{wh.mouth.scale.set(1,0.35+k*1.6,1);});}},
        {t:3.2,fn:()=>{HEROES.forEach(h=>{const from=h.pos.clone(),to=new V3(0,1.5,OUTZ-8);anim(1.4,k=>{h.pos.lerpVectors(from,to,k*k);h.g.scale.setScalar(Math.max(0.05,1-k));h.face+=0.3;});});SFX.whoosh();}},
        {t:5.2,fn:()=>{anim(0.8,k=>{wh.mouth.scale.set(1,1.95-k*1.6,1);});SFX.thud();shakeAll(0.05,0.4);}},
        {t:6.3,fn:()=>{skyOn(false);startPos();}}],
      end:()=>{W.anims.length=0;skyOn(false);wh.mouth.scale.set(1,0.35,1);startPos();players[0].cp.set(-2.5,0,4);players[1].cp.set(2.5,0,4);F.go=true;snapCams();}});}
  function bubbleScene(){F.caught=true;const pe=T.pelageya;if(players[1].act===0)doSwap(1);
    const from=pe.pos.clone();bub.visible=true;bub.position.copy(from).add(new V3(0,0.8,0));
    play({dur:6.5,fov:48,shots:[shot(0,[from.x+3,2.6,from.z+4],[from.x,1.2,from.z]),shot(3,[2,5,-90],[6.8,5.6,-99.5])],
      says:[[0.3,2.4,null,'<i>Со дна желудка пузырь огромный всплывает…</i>',true],[2.8,1.6,'pelageya','Ой!'],[4.4,2,'yosha','Пелагея! Я иду, держись!']],
      events:[{t:1.6,fn:()=>{SFX.whoosh();anim(3.5,k=>{const p=from.clone().lerp(new V3(6.8,5.2,-99.5),smooth(k));p.y+=Math.sin(k*Math.PI)*3;bub.position.copy(p).add(new V3(0,0.8,0));pe.pos.copy(p);});}}],
      end:()=>{bdrop.visible=true;banner('Пелагея в пузыре — беда!','#e7c3ff',2.2,'Йоша, тёмную каплю на пузыре полей — с уступа у сердца');}});}
  function freeScene(){F.freed=true;bdrop.visible=false;SFX.grow();burst(bdrop.position.clone(),0x9fe6ff,16,3);const pe=T.pelageya;
    anim(1.6,k=>{bub.scale.setScalar(1+0.3*k);bub.material.opacity=0.25*(1-k);pe.pos.set(6.8,5.2-k*1.0,-99.5);});
    later(1.6,()=>{bub.visible=false;placeOnGround(pe,6.6,-99.5,4.2);banner('Пелагея свободна!','#e7c3ff',2,'теперь — к ресничкам: щекочите вдвоём!');bark(pe,'pelageya','Спасибо, Йоша, мой спаситель!',2);SFX.ok();});}
  function sneeze(){F.final=true;
    play({dur:16,fov:46,camK:3,shots:[shot(0,[0,3,-104],[0,3,-116]),shot(3,[0,5,OUTZ+18],[0,5,OUTZ-4]),shot(7.4,[-1.2,2.7,OUTZ+13],[1.4,0.6,OUTZ+6])],
      says:[[0.3,1.6,null,'<i>Кит нос морщит…</i>',true],[1.9,1,null,'<i>…и — апчхи!</i>',true],[7.6,3.2,null,'<i>Потап к Йоше подбегает, рот открывает — и слов не найдёт,</i><br><i>По спине хлопает так, что тот шариком катится вперёд.</i>',true],[11.4,2.6,'yosha','Я не сам. Я попросил.']],
      events:[{t:1.9,fn:()=>{SFX.crash();SFX.whoosh();shakeAll(0.12,0.9);$('flash').style.transition='opacity .3s';$('flash').style.opacity=1;}},
        {t:2.9,fn:()=>{skyOn(true);$('flash').style.opacity=0;HEROES.forEach((h,i)=>{h.pos.set(-3+i*2,9+i,OUTZ+2);h.vel.set(0,0,0);});}},
        {t:3.0,fn:()=>{HEROES.forEach((h,i)=>{const from=h.pos.clone(),to=new V3(-3+i*2,0.2,OUTZ+6);anim(1.6+i*0.15,k=>{h.pos.lerpVectors(from,to,k);h.pos.y+=Math.sin(k*Math.PI)*3;h.face+=0.3;});});
          for(let i=0;i<6;i++)later(i*0.2,()=>burst(new V3(rand(-4,4),rand(2,8),OUTZ+rand(-2,4)),0xe8f8ff,10,5));}},
        {t:7.6,fn:()=>{const P=T.potap,Y=T.yosha;const from=P.pos.clone(),to=new V3(Y.pos.x-1.1,0.2,Y.pos.z+0.3);P.face=Math.atan2(to.x-from.x,to.z-from.z);anim(1,k=>{P.pos.lerpVectors(from,to,k);});}},
        {t:9.2,fn:()=>{const Y=T.yosha,from=Y.pos.clone();SFX.thud();anim(1.2,k=>{Y.pos.set(from.x+k*2.4,0.2+Math.abs(Math.sin(k*Math.PI*2))*0.3,from.z);});}},
        {t:11.4,fn:()=>{T.yosha.face=Math.atan2(T.potap.pos.x-T.yosha.pos.x,T.potap.pos.z-T.yosha.pos.z);}}],
      end:()=>{linkFinal.locked=false;linkFinal.g.visible=true;linkFinal.pos.copy(T.yosha.pos);takeItem(linkFinal,T.yosha);later(0.8,()=>{F.out=true;finishLevel();});}});}
  W.noSwap=pi=>pi===1&&F.caught&&!F.freed;W.noSwapTip='Пелагея в пузыре — ты сейчас за Йошу. Выручай её, выручай!';
  /* ---------- жизнь кита ---------- */
  W.updates.push(dt=>{
    HB.t+=dt;HB.justBeat=false;const beatNow=Math.floor(HB.t/HB.per);if(beatNow>HB.beat){HB.beat=beatNow;HB.pulse=1;HB.justBeat=true;tone(58,0.2,'sine',0.32,40);later(0.24,()=>{tone(52,0.18,'sine',0.26,38);HB.pulse=Math.max(HB.pulse,0.7);});}
    HB.pulse=Math.max(0,HB.pulse-dt*3);
    for(const g of glows)g.l.intensity=g.base*(1+0.7*HB.pulse);
    heart.scale.setScalar(1+0.12*HB.pulse);hm.emissiveIntensity=0.4+0.6*HB.pulse;
    for(const j of jellies){const u=j.userData;u.ph+=dt;j.position.set(u.x+Math.sin(u.ph*0.4)*0.8,u.y+Math.sin(u.ph*0.9)*0.5,u.z+Math.cos(u.ph*0.3)*0.8);j.scale.y=1+0.15*Math.sin(u.ph*3);}
    plank.position.y=Math.sin(G.time*0.3)*0.3;
    // перепонки: раскрыты — пройти можно; закрываются — застрявшего мягко выталкивает вперёд
    const camZ=G.split>0.5?Math.max(rigs[0].pos.z,rigs[1].pos.z):shared.pos.z,frontZ=Math.max(active(0).pos.z,active(1).pos.z);
    for(const m of MEMB){const op=membOpen(m),pre=((HB.t/HB.per+m.off)%1)>0.88;m.open=op;m.col.on=!op;m.pm.opacity=damp(m.pm.opacity,(camZ>m.z&&frontZ<m.z-0.4)?0.1:0.85,8,dt);
      m.petals.forEach(p=>{p.scale.setScalar(damp(p.scale.x,op?0.12:1,10,dt));});m.pm.emissiveIntensity=op?0.1:pre?0.9+0.3*Math.sin(G.time*30):0.3;
      if(m.was&&!op)for(const h of HEROES)if(Math.abs(h.pos.z-m.z)<0.7){h.pos.z=m.z-0.9;}
      m.was=op;}
    // кислые лужи: щекотно — отбрасывает
    for(const h of HEROES){if(!h.active||!h.grounded)continue;for(const a of ACID){const dx=h.pos.x-a.x,dz=h.pos.z-a.z,d=Math.hypot(dx,dz);if(d<a.r&&G.time-(h.acidT||-9)>0.8){h.acidT=G.time;const k=1/(d||1);h.vel.x=dx*k*6;h.vel.z=dz*k*6+2;h.vel.y=6;h.grounded=false;SFX.splash();
          floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Ой, щекотно! Кислый сок!','#caff8a');if(!F.acidTold){F.acidTold=true;tip(h.player,'Зелёные лужи — кислый сок: щекотно, и отбросит прочь. Обходи!',2.6);}}}}
    for(const a of ACID)a.m.material.emissiveIntensity=0.6+0.3*Math.sin(G.time*3+a.x);
    // арена
    if(!arena.started&&[0,1].some(pi=>active(pi).pos.z<-67)){arena.started=true;SFX.gate();
      arena.list=[makeFoe('tinnik',-4,-75,{leash:6}),makeFoe('tinnik',4,-76,{leash:6}),makeFoe('tinnik',0,-80,{leash:6}),puzyr(-6.5,-80,{leash:4}),puzyr(6.5,-78,{leash:4})];
      banner('Тинники да пузырники!','#caff8a',2.2,'тинники медленны — щит и бей · пузырник надувается — Прошка, в него стрельни');}
    if(arena.started&&!arena.cleared&&arena.list.every(e=>!e.alive)){arena.cleared=true;SFX.ok();doorCol.on=false;door.children.forEach(p=>anim(1.2,k=>{p.scale.setScalar(1-0.9*k);}));banner('Проход открыт!','#ffffff',1.8,'вперёд — к сердцу китовому');}
    if(arena.cleared&&!F.caught&&[0,1].some(pi=>active(pi).pos.z<-88))bubbleScene();
    // клапаны-батуты: кто стоит на клапане — на ближайший «тук» его подбросит высоко
    for(const p of pads){p.m.scale.y=1-0.35*HB.pulse;const on=HEROES.filter(h=>h.active&&h.grounded&&h.pos.y<0.6&&Math.hypot(h.pos.x-p.x,h.pos.z-p.z)<1.15);
      p.m.material.emissiveIntensity=on.length?0.9+0.3*Math.sin(G.time*20):0.4;
      if(HB.justBeat)for(const h of on){h.vel.y=15.5;h.grounded=false;SFX.toss();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Тук — и в вышину!','#ffd0e0');}}
    // пузырь с Пелагеей держит её
    if(F.caught&&!F.freed){const pe=T.pelageya;pe.pos.set(6.8,5.2+Math.sin(G.time*1.4)*0.1,-99.5);pe.vel.set(0,0,0);pe.grounded=true;pe.holding=true;bub.position.set(6.8,6.0+Math.sin(G.time*1.4)*0.1,-99.5);bdrop.position.y=5.2+Math.sin(G.time*2)*0.08;}
    // реснички качаются, сделанные — свернулись
    CIL.forEach((c,i)=>{c.segs.forEach((s,k)=>{s.rotation.z=c.done?0.35:Math.sin(G.time*2+i+k*0.6)*0.18;});c.cm.emissiveIntensity=c.done?0.8:F.freed?0.3+0.2*Math.sin(G.time*4+i):0.1;});});
  /* ---------- рисунки кнопок ---------- */
  const lab=(pi,at,cond,text)=>prompt(pi,'label',at,cond,text);
  lab(1,()=>new V3(9.3,2.6,-50),()=>!gates[0].open&&active(1).pos.z<-40,'живая вода — ворота дружка');
  lab(0,()=>new V3(-2.4,7.4,-47),()=>!gates[1].open&&active(0).pos.z<-40,()=>F.ask?'позвони — Йоше ворота':'колокол — Йоше ворота');
  prompt(1,'call',()=>headOf(active(1)),()=>!F.ask&&!gates[1].open&&active(1).pos.x>2&&active(1).pos.z<-44,'попроси Прошку');
  prompt(0,'skill',()=>headOf(T.proshka),()=>T.proshka.active&&F.ask&&!gates[1].open&&hd(T.proshka.pos,{x:-2.4,z:-47})<13,'рогатка');
  prompt(1,'skill',()=>headOf(T.yosha),()=>T.yosha.active&&W.waterTargets.some(w=>w.active()&&hd(w.pos,T.yosha.pos)<3),'ковшик');
  prompt(1,'swap',()=>headOf(T.yosha),()=>T.pelageya.active&&!gates[0].open&&hd(T.pelageya.pos,{x:9.3,z:-50})<4,'нужен Йоша');
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>inZone(LAKE,h(),1.2)&&LAKE.state==='high'&&!link2.taken,'отлив — к кораблю');
    prompt(pi,'attack',()=>headOf(h()),()=>F.freed&&CIL.some(c=>!c.done&&hd(h().pos,{x:c.x,z:-114})<2.4),'вместе!');
    prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.help));
    prompt(pi,'attack',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&hd(e.pos,h().pos)<5&&(e.state==='broken'||(e.state==='stagger'&&!e.openHit)||e.dazeT>0)),'');}
  /* ---------- задачи ---------- */
  const both=pi=>[
    O('Нас кит проглотил! Внутри — целый мир.<br>Бегите вглубь, к сердцу, — там и пир.',()=>active(pi).pos.z<-7,()=>[]),
    O(()=>'Перепонки под стук сердца «тук-тук» раскрываются.<br>Жди, как раскроется, — и беги! А пред тем она мигает, качается.',()=>active(pi).pos.z<-28,()=>MEMB.filter(m=>active(pi).pos.z>m.z).map(m=>m.g)),
    pi?O(()=>gates[0].open?(F.ask?'Прошка в колокол звонит — ворота твои откроются!':'Твои ворота (справа) колокол Прошки откроет. Попроси: нажми '+K(1,'call')+'.'):'Желудочное озеро. У каждого — свои ворота, а открывает их друг. Жёлтая жилка — от колокола к твоим.<br>Больной красный клапан живой водой Йоши '+K(1,'skill')+' полей — ворота Прошки откроются, и ты с ним.',
        ()=>gates[1].open&&gates[0].open,()=>(gates[0].open?[]:[valve])):
      O(()=>gates[1].open?'Ждём: твои ворота (слева) Йоша откроет — живой водой на клапан.':(F.ask?'Желудочное озеро. У каждого — свои ворота, а открывает их друг.<br>Йоша просит: из рогатки '+K(0,'skill')+' в колокол над озером стрельни — вот звук!':'Желудочное озеро. Колокол над озером ворота Йоши откроет, как попросит он. А твои откроет Йоша.<br>В отлив '+K(0,'item')+' к кораблю спуститься можно — там звено, и путь хороший.'),
        ()=>gates[1].open&&gates[0].open,()=>(F.ask&&!gates[1].open?[bmark]:[])),
    O(()=>'Зелёные лужи — кислый сок, обходи! Тинники медленны — щит и бей.<br>Пузырник надувается — Прошка, из рогатки в него, скорей!',()=>arena.cleared,()=>arena.list.filter(e=>e.alive).map(e=>e.g)),
    pi?O(()=>F.caught?'Пелагея в пузыре над уступом! Встань Йошей на розовый клапан, жди «тук» — на уступ подкинет.<br>Там тёмную каплю полей '+K(1,'skill')+' — пузырь и сгинет.':'Вперёд, к китову сердцу!',()=>F.freed,()=>F.caught?[bdrop]:[]):
      O(()=>F.caught?'Пузырь Пелагею унёс! Помоги Йоше: Потап подкинет его '+K(0,'skill')+' на уступ,<br>Иль Йоша на клапан встанет и «тук» подождёт — вот и весь уступ.':'Вперёд, к китову сердцу!',()=>F.freed,()=>F.caught?[bub]:[]),
    O(()=>'Реснички в носу кита! Одну вместе разом ударьте '+K(pi,'attack')+' — кит поморщится.<br>Три реснички — и чихнёт, не удержится!',()=>!!F.final,()=>CIL.filter(c=>!c.done).map(c=>c.g)),
    O('Кит чихает…',()=>false,()=>[])];
  W.objectives[0]=both(0);W.objectives[1]=both(1);
  W.tipZones.push({cond:(pi,h)=>MEMB.some(m=>Math.abs(h.pos.z-m.z)<2.2&&h.pos.z>m.z&&!m.open),text:pi=>'Перепонка закрыта. Слушай сердце: «тук-тук» —<br>Раскроется — беги сразу, друг!'},
    {cond:(pi,h)=>!gates[pi?1:0].open&&h.pos.z<-58&&h.pos.z>-64&&(pi?h.pos.x>1:h.pos.x<-1),text:pi=>pi?'Эти ворота откроет колокол Прошки — жёлтая жилка к нему ведёт.<br>Попроси друга: '+K(1,'call')+' — он тебя поймёт.':'Эти ворота Йоша откроет: зелёная жилка к красному клапану на том берегу ведёт.'},
    {cond:(pi,h)=>pads.some(p=>Math.hypot(h.pos.x-p.x,h.pos.z-p.z)<2.5),text:pi=>'Встань на розовый клапан и стой.<br>Сердце стукнет — подбросит высоко над собой.'});
  W.spawns=[[new V3(-2.5,0,4),new V3(-4.5,0,5)],[new V3(2.5,0,4),new V3(4.5,0,5)]];W.startAct=[0,0];
  W.pauseLine='В брюхе у кита — целый мир: перепонки под стук сердца раскрываются,<br>У озера ворота друг открывает, в сердце клапаны-батуты качаются.<br>Реснички щекочите вдвоём — кит и чихнёт, не удержится!';
  W.onStart=()=>{later(0.3,intro);};
  flushDecor();}

