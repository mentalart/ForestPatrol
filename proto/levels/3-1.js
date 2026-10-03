/* ============================== МИР 3 · НЕБЕСНОЕ ЦАРСТВО · 3-1 «САД МОЛОДИЛЬНЫХ ЯБЛОК» ============================== */
// ввод пера: свет и тьма · светомостки и тенемостки · чередование в прыжке · две дорожки у двоих · серые яблони · тени-мороки: окно уязвимости и роли
function bowlOf(x,z,type,y){y=y||0;const g=new THREE.Group();g.position.set(x,y,z);W.group.add(g);addMesh(new THREE.CylinderGeometry(1.05,0.75,0.35,20),M(0xd8d0e8),0,0.17,0,g);
  const inner=M(type==='light'?0x8a7040:0x3a2a60,{emissive:type==='light'?0xffa020:0x6a4ae0,emissiveIntensity:0});addMesh(new THREE.CylinderGeometry(0.88,0.88,0.05,20),inner,0,0.36,0,g);
  edgeSign(x,y,z-1.5,type);W.cyls.push({x,z,r:1.05,miny:y-1,maxy:y+0.35,on:true});
  const B={g,inner,x,y,z,type,on:false};
  B.test=()=>HEROES.some(h=>hd(h.pos,B)<1.0&&Math.abs(h.pos.y-(y+0.35))<0.6&&(type==='light'?heroLight(h):!heroLight(h)&&!litAt(x,y+0.5,z)));
  return B;}
function hedgeRow(minx,maxx,minz,maxz,h,mat){box(minx,maxx,0,h,minz,maxz,mat,{occ:false});const m0=W.group.children.length,n=Math.max(1,Math.round(Math.max(maxx-minx,maxz-minz)/1.2));
  for(let i=0;i<n;i++){const u=(i+0.5)/n;addMesh(new THREE.SphereGeometry(Math.min(maxx-minx,maxz-minz)*0.5+0.2,8,6),mat,lerp(minx,maxx,u),h,lerp(minz,maxz,u)).scale.y=0.7;}fadeable(since(m0));}
function build31(){
  W.zvenAway=true;W.world=3;setTheme('heaven');W.name='3-1 · «Сад молодильных яблок»';W.sub='Небесное царство · перо Жар-птицы: свет и тьма';W.camX=12;const F=W.flags;F.stage='walk';
  W.abil.toss=true;W.abil.roll=true;W.abil.owl=true;W.abil.gusli=false;W.abil.pero=false;W.fallY=-12;
  heavenDecor(-190,20);const T=HERO;
  /* ---------- А. облачный остров: гнездо Жар-птицы ---------- */
  cloudIsle(-8,8,-8,8,0);
  addMesh(new THREE.CylinderGeometry(1.9,2.3,0.3,18),CLOUD_TOP,0,0.15,-4.5);W.cyls.push({x:0,z:-4.5,r:2.1,miny:-1,maxy:0.3,on:true});
  const nest=nestMesh(0,0.28,-4.5,1.5);const fb=makeFirebird({bald:true});fb.g.position.set(0,0.42,-4.7);fb.g.scale.setScalar(0.95);
  const key=blackKey(1.6);key.position.set(0.6,0.57,-4.1);key.rotation.z=1.4;W.group.add(key);for(let i=0;i<6;i++){const sh=addMesh(new THREE.SphereGeometry(0.1,8,6,0,Math.PI*2,0,Math.PI/2),M(0xf4ecd8),rand(-0.8,0.8),0.44,-4.5+rand(-0.7,0.7));sh.rotation.x=rand(-1,1);}
  appleTree(-5.5,4.5,0,{s:0.9});appleTree(5.8,3.8,0,{s:0.95});bell(-3,2);
  const Z=makeZven();W.zven=Z;Z.pos.set(0,2.4,3);
  // облачные ступеньки снизу (ролик-вход)
  const steps=[];for(let i=0;i<7;i++){const st=new THREE.Group();st.position.set(Math.sin(i*0.9)*2.4,-7.5+i*1.1,17-i*1.6);W.group.add(st);for(let k=0;k<3;k++){const p=new THREE.Mesh(PUFF_GEO,CLOUD_TOP);p.position.set(k*0.6-0.6,0,rand(-0.2,0.2));p.scale.set(0.8,0.35,0.8);st.add(p);}steps.push(st);}
  /* ---------- Б. светомостик и тенемостик ---------- */
  mostki('light',[[0,0,-8],[0,0,-20]]);edgeSign(1.4,0,-7.4,'light');
  cloudIsle(-4,4,-28,-20,0);const n1=nutItem(3.1,0.6,-26.6);
  mostki('shadow',[[0,0,-28],[0,0,-38]]);edgeSign(1.4,0,-27.4,'shadow');
  cloudIsle(-4,4,-46,-38,0);bell(-2.6,-40.5);
  /* ---------- В. три шага по золотому, три по лиловому ---------- */
  mostki(n=>Math.floor(n/3)%2?'shadow':'light',[[0,0,-46],[0,0,-66]]);edgeSign(1.4,0,-45.4,'light');edgeSign(-1.4,0,-45.4,'shadow');
  cloudIsle(-6,6,-78,-66,0);const L1=linkItem(0,1.1,-68.2);bell(3.2,-67.6);
  /* ---------- Г. первая яблоня: ожила — открывает кусок сада ---------- */
  const T1=appleTree(-3.4,-72.6,0,{lr:6,onRevive:()=>{banner('Яблоня ожила!','#ffe08a',2.2,'сад светлеет — и новый край открывает');SFX.ok();}});
  mostki('light',[[-6,0,-73],[-9.5,0,-73]],{on:()=>T1.revived});cloudIsle(-13.5,-9.5,-76,-70,0);const L2=linkItem(-11.5,1.1,-72);const n2=nutItem(-12.6,0.6,-75);
  /* ---------- Д. две дорожки: свет у одного, тьма у другого; перекрёсток — по очереди ---------- */
  mostki('light',[[-5,0,-78],[-5,0,-84],[5,0,-96],[5,0,-104]],{w:2});mostki('shadow',[[5,0,-78],[5,0,-84],[-5,0,-96],[-5,0,-104]],{w:2});
  edgeSign(-6.4,0,-77.4,'light');edgeSign(6.4,0,-77.4,'shadow');const n3=nutItem(5,1.9,-81.5);
  cloudIsle(-9,9,-114,-104,0);bell(0,-105.5);
  const bowls=[bowlOf(6,-109,'light'),bowlOf(-6,-109,'shadow')];
  const L3=linkItem(0,1.3,-110.5);L3.locked=true;L3.g.visible=false;
  // ворота сада: светомостик горит, когда открыты
  for(const x of[-1.6,1.6])for(const z of[-113.6,-124.4]){lantern(x,z,0);}
  lightSrc(new V3(0,0.8,-114),6,()=>F.gateOpen);lightSrc(new V3(0,0.8,-124),6,()=>F.gateOpen);
  mostki('light',[[0,0,-114],[0,0,-124]],{on:()=>F.gateOpen});
  /* ---------- Е. тёмные аллеи: тени-мороки ---------- */
  cloudIsle(-11,11,-152,-124,0);wall(-11.2,-11,-152,-124);wall(11,11.2,-152,-124);
  const hedgeM=M(0x6a6a7c);hedgeRow(-1,1,-147,-129,1.6,hedgeM);for(const sd of[-1,1]){hedgeRow(sd*10.6-0.4,sd*10.6+0.4,-150,-126,1.6,hedgeM);}
  hedgeRow(-7.5,-4.5,-138,-137,1.4,hedgeM);hedgeRow(4.5,7.5,-138,-137,1.4,hedgeM);bell(0,-126);
  const n4=nutItem(-9.2,0.6,-148.5);
  const T2=appleTree(-6,-149.2,0,{}),T3=appleTree(6,-149.2,0,{});
  /* ---------- Ж. сад ожил: ворота и звено ---------- */
  mostki('light',[[0,0,-152],[0,0,-162]],{on:()=>F.garden});
  cloudIsle(-9,9,-180,-162,0);bell(0,-164);
  {const gm=W.group.children.length;for(const sd of[-1,1]){box(sd*3-0.35,sd*3+0.35,0,3.8,-170.4,-169.6,M(0xe8e0f0));addMesh(new THREE.SphereGeometry(0.4,10,8),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.5}),sd*3,4.1,-170);}
    const arch=new THREE.TorusGeometry(3,0.28,8,24,Math.PI);addMesh(arch,M(0xe8e0f0),0,3.8,-170);fadeable(since(gm));}
  appleTree(-6,-166,0,{s:1.1,revived:false});appleTree(6.2,-167,0,{s:1.05});appleTree(-5.4,-176,0,{s:1.2});appleTree(5.6,-175,0,{s:1.1});
  const n5=nutItem(6.4,0.6,-178.2);const L4=linkItem(0,1.1,-174.5);
  /* ---------- сюжет ---------- */
  function intro(){F.stage='intro';const hs=HEROES;
    play({dur:6.4,fov:50,shots:[shot(0,[7,1.5,20],[0,-2,12],[5,3,12],[0,0.5,4],4.4),shot(4.4,[0,3.4,11],[0,1,-2])],
      says:[[0.3,3.4,null,'<i>Звенышко поднимает нас на небо по облачным ступенькам.</i>',true],[3.9,2.2,'zven','Дзинь! Небесное царство — чудо из чудес!']],
      events:[{t:0,fn:()=>{hs.forEach((h,i)=>{h.pos.copy(steps[0].position).add(new V3(i-1.5,0.4,0));h.vel.set(0,0,0);});}}],
      tick:(t)=>{for(let i=0;i<4;i++){const h=hs[i],k=clamp((t-i*0.25)/4.2,0,1),f=k*6.99,a=Math.floor(f),u=f-a;const s0=steps[a].position,s1=steps[Math.min(6,a+1)].position;
          const sp=W.spawns[h.player][h===players[h.player].heroes[0]?0:1];const p=a>=6?new V3(sp.x,0,sp.z):new V3(lerp(s0.x,s1.x,u)+(i-1.5)*0.9,lerp(s0.y,s1.y,u)+0.35+Math.sin(u*Math.PI)*0.8,lerp(s0.z,s1.z,u));
          if(k>=1){p.set(sp.x,0,sp.z);}h.pos.copy(p);h.vel.set(0,0,0);h.face=Math.PI;}
        steps.forEach((s,i)=>{s.position.y+=Math.sin(G.time*2+i)*0.002;});},
      end:()=>{HEROES.forEach((h,i)=>{const sp=W.spawns[h.player][players[h.player].heroes.indexOf(h)];placeOnGround(h,sp.x,sp.z,0);h.face=Math.PI;});F.stage='walk';snapCams();}});}
  function giftScene(){F.stage='gift';const pr=T.proshka;HEROES.forEach((h,i)=>{placeOnGround(h,-2.4+i*1.6,-1.2,0);h.face=Math.atan2(0-h.pos.x,-4.7-h.pos.z);});
    const gifts=[];
    play({dur:24.6,fov:46,shots:[shot(0,[3.6,2.4,1.6],[0,1.1,-4.7]),shot(7,[-2.4,1.6,-1.6],[0,1.3,-4.6]),shot(13,[1.6,1.6,-2.2],[0.6,0.7,-4.1]),shot(17,[2.2,1.4,-1.8],[pr.pos.x,0.9,pr.pos.z]),shot(19.2,[3.4,1.2,-6],[3,-4,-12])],
      says:[[0.3,3.4,null,'<i>Сад Жар-птицы в сумерках стоит, яблони серы.</i><br><i>В гнезде Жар-птица сидит — облезла, грустна без меры.</i>',true],[3.9,2.8,'zhar','Темно у меня… Перья я растеряла.'],
        [7.1,3.4,null,'<i>Последние перья из хвоста выдёргивает —</i><br><i>И каждому по перу протягивает.</i>',true],[10.6,2.4,'zhar','Верните саду свет, прошу.'],
        [13.2,3.6,null,'<i>Под нею, средь скорлупок, чёрный ключ лежит —</i><br><i>Такой же, как на нитке у Кикиморы, блестит.</i>',true],[17.1,2.1,'proshka','Ключ! Холодный, как лёд зимой…'],
        [19.3,3.2,null,'<i>Ключ сам из лапы выскользнул — и в пропасть упал.</i>',true],[22.6,1.6,'yosha','Ой.']],
      events:[{t:7.2,fn:()=>{fb.tail.forEach(f=>{f.visible=false;});HEROES.forEach((h,i)=>{const fm=featherMesh(1.4);W.group.add(fm);gifts.push(fm);const a=new V3(0,1.2,-5.2),to=h.pos.clone().add(new V3(0,h.d.height*0.8,0));
          later(i*0.35,()=>{SFX.flower();anim(1.1,k=>{fm.position.lerpVectors(a,to,smooth(k));fm.position.y+=Math.sin(k*Math.PI)*1.2;fm.rotation.z=k*6;if(k>=1){W.group.remove(fm);burst(to,0xffb040,10,2);tone(1320,0.2,'sine',0.1);}});});});
          anim(1.4,k=>{fb.body.rotation.x=-Math.sin(k*Math.PI)*0.3;});}},
        {t:14.8,fn:()=>{placeOnGround(pr,0.9,-2.7,0.3);pr.face=Math.PI;const kp=key.position.clone();anim(1.2,k=>{key.position.lerpVectors(kp,pr.pos.clone().add(new V3(0.25,0.9,0.1)),smooth(k));});}},
        {t:17.1,fn:()=>{tone(2600,0.4,'sine',0.08,1800);burst(key.position.clone(),0xcfe8ff,8,1.5,0.6);}},
        {t:19.3,fn:()=>{const kp=key.position.clone();anim(3.2,k=>{key.position.set(kp.x+k*3,kp.y+Math.sin(Math.min(1,k*3)*Math.PI)*0.5-k*k*14,kp.z-k*7);key.rotation.z+=0.3;});SFX.keys();}},
        {t:22.6,fn:()=>{T.yosha.face=Math.atan2(3-T.yosha.pos.x,-12-T.yosha.pos.z);}}],
      tick:(t)=>{fb.head.rotation.x=t<7?0.3:0.1;fb.body.position.y=Math.sin(t*2)*0.02;},
      end:()=>{key.visible=false;W.anims.length=0;gifts.forEach(g=>W.group.remove(g));placeOnGround(pr,0.9,-2.2,0.3);W.abil.pero=true;F.stage='pero';
        banner('Перо Жар-птицы — жар-перо!','#ffb040',2.8,'кнопка R или ; (на джойстике RB) — зажечь иль погасить · свет помогает всем, кто рядом');
        for(const pi of[0,1])tip(pi,'У каждого героя — своё перо. Золотые мостки лишь в свете видны —<br>Зажги перо '+K(pi,'item')+', и дорожки открыты, как днём, ясны.',4.2);}});}
  function endScene(){F.stage='end';HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-166.5,0);h.face=Math.PI;});
    play({dur:12,fov:48,shots:[shot(0,[5,3,-160],[0,3,-170]),shot(5.4,[2.6,1.8,-164],[0,3.6,-170])],
      says:[[0.3,3.4,null,'<i>Сад светлеет. Над воротами Жар-птица садится —</i><br><i>И перья снова горят, и жар-свет струится.</i>',true],[4,3,'zhar','Светло! Как прежде. Спасибо, малые, спасибо!'],[7.4,3.6,'zhar','А ключ… Ключ не мой. Кто-то подбросил, видно.<br>Держитесь от него подальше — ох, недоброе в нём, обидно.']],
      events:[{t:0,fn:()=>{fb.g.position.set(-10,12,-150);fb.tail.forEach(f=>{f.visible=true;f.userData.mats.forEach(m=>{m.color.setHex(0xff6a2a);m.emissiveIntensity=0.9;});});const from=fb.g.position.clone(),to=new V3(0,4.3,-170);
          anim(3.4,k=>{fb.g.position.lerpVectors(from,to,smooth(k));fb.g.position.y+=Math.sin(k*Math.PI)*2;fb.bloom(k);fb.wings.forEach(w=>{w.wp.rotation.z=w.s*Math.sin(k*30)*0.6;});});SFX.grow();}},
        {t:3.6,fn:()=>{burst(new V3(0,4.6,-170),0xffb040,30,5);ringFx(new V3(0,0,-170),0xffc860,8);SFX.ok();fb.g.rotation.y=0;}}],
      end:()=>{F.out=true;banner('Сад Жар-птицы светится!','#ffb040',2.4,'в лавке у Векши — венок из яблоневого цвета, загляни!');later(1.8,finishLevel);}});}
  // серые ворота сада: две чаши — солнце и звёзды
  function openGate(){F.gateOpen=true;SFX.gate();SFX.ok();banner('Ворота сада отворились!','#ffe08a',2.4,'свет и тьма вместе — золотой мосток горит сам');
    L3.locked=false;L3.g.visible=true;burst(L3.pos.clone(),COL.gold,16,3);if(!F.bowlBark){F.bowlBark=true;later(0.8,()=>bark(T.pelageya,'pelageya','Как выключатель — щёлк, и свет!',2));}}
  // тёмные аллеи
  let arena=null;
  function spawnAlleys(){F.fight=true;arena=[tenFoe(-6,-133),tenFoe(-8.4,-141),tenFoe(-4.6,-145.5),tenFoe(6,-133),tenFoe(8.4,-141),tenFoe(4.6,-145.5),motylekFoe(0,-127.4,{leash:6})];
    banner('Тени-мороки!','#c8b0ff',2.4,'во тьме удар насквозь проходит — посвети пером и бей');
    later(1.2,()=>say('zven','Свет у одного, меч у другого!',2.4,true));}
  W.onFirstUnravel=()=>{later(0.6,()=>bark(T.proshka,'proshka','Бумажная, а кусается — вот те раз!',2));};
  W.updates.push(dt=>{
    if(F.stage==='walk'&&[0,1].some(pi=>active(pi).pos.z<-0.4&&active(pi).pos.z>-8))giftScene();
    for(const B of bowls){const on=B.test();if(on!==B.on){B.on=on;if(on){SFX.plate();floatText(new V3(B.x,1.4,B.z),B.type==='light'?'Солнце!':'Звёзды!',B.type==='light'?'#ffd76a':'#c8b0ff');}}B.inner.emissiveIntensity=B.on?0.9+0.3*Math.sin(G.time*8):0.08;}
    if(!F.gateOpen&&bowls.every(b=>b.on))openGate();
    if(!F.fight&&F.gateOpen&&[0,1].some(pi=>active(pi).pos.z<-125.4&&active(pi).pos.z>-152))spawnAlleys();
    if(F.fight&&!F.cleared&&arena.every(e=>!e.alive)){F.cleared=true;SFX.ok();banner('Аллеи чисты!','#ffe08a',2,'две яблони у выхода — обе оживите');}
    if(!F.garden&&T2.revived&&T3.revived){F.garden=true;SFX.grow();banner('Сад ожил!','#ffe08a',2.4,'светомосток к воротам');hedgeM.color.setHex(0x4f8a3a);}
    // сад светлеет с каждой ожившей яблоней
    {const k=W.trees.filter(t=>t.revived).length/W.trees.length;scene.background.lerpColors(new THREE.Color(0x3a3470),new THREE.Color(0x7a78c0),k);scene.fog.color.copy(scene.background);amb.intensity=0.52+0.2*k;}
    if(F.stage!=='end'&&F.stage!=='gift'&&!F.out&&[0,1].every(pi=>active(pi).pos.z<-165.5&&active(pi).pos.z>-181))endScene();
    fb.wings.forEach(w=>{if(F.stage!=='end')w.wp.rotation.z=w.s*(0.2+Math.sin(G.time*1.5)*0.05);});});
  /* ---------- рисунки кнопок ---------- */
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>W.abil.pero&&!h().lit&&h().pos.z<-4&&h().pos.z>-9,'зажечь перо');
    prompt(pi,'item',()=>headOf(h()),()=>W.abil.pero&&h().lit&&h().pos.z<-24&&h().pos.z>-28.2&&Math.abs(h().pos.x)<2.5,'погасить');
    prompt(pi,'item',()=>headOf(h()),()=>{const z=h().pos.z;if(z>-46||z<-66||h().grounded)return false;const n=Math.floor((-46-z)/(20/13));return (Math.floor(n/3)%2?'shadow':'light')!==(h().lit?'light':'shadow');},'в прыжке!');
    prompt(pi,'item',()=>headOf(h()),()=>!T1.revived&&!h().lit&&hd(h().pos,T1.pos)<4,'посвети у яблони');
    prompt(pi,'item',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.kind==='ten'&&!e.litNow&&hd(e.pos,h().pos)<4)&&!h().lit,'посвети');
    prompt(pi,'item',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.kind==='motylek'&&!e.both&&hd(e.pos,h().pos)<5)&&!h().lit,'зажгите вместе!');
    prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.help)||W.bolts.some(b=>b.tgt===h()&&!b.refl&&b.eta<0.8));
    prompt(pi,'attack',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&hd(e.pos,h().pos)<4&&(e.state==='broken'||(e.litNow&&e.state==='stagger'&&!e.openHit))),'');}
  /* ---------- задачи ---------- */
  const nearT=(T)=>()=>[T.g];
  const mk=pi=>[
    O('Небесное царство! Звенышко к гнезду Жар-птицы ведёт.',()=>F.stage!=='walk'&&F.stage!=='intro',()=>[fb.g]),
    O('Жар-птица…',()=>W.abil.pero,()=>[fb.g]),
    O(()=>'Золотые мостки лишь в свете видны. Зажги перо '+K(pi,'item')+' —<br>И по золотой дорожке ступай вперёд.',()=>active(pi).pos.z<-20.5,()=>[W.tiles[3].m],()=>({kind:active(pi).kind,action:'walk',from:new V3(0,0,-7),to:new V3(0,0,-19)})),
    O(()=>'Лиловые мостки лишь во тьме видны. Погаси перо '+K(pi,'item')+'.',()=>active(pi).pos.z<-38.5,()=>[W.tiles[12].m]),
    O(()=>'Три шага по золоту, три — по лиловому. Где сменяются — прыгни '+K(pi,'jump')+',<br>И в прыжке перо '+K(pi,'item')+' жми — не оступишься, не сникнешь.',()=>active(pi).pos.z<-66.5,()=>[L1.g],()=>({kind:active(pi).kind,action:'jump',from:new V3(0,0,-50),to:new V3(0,0,-54)})),
    O(()=>'Серая яблоня. С горящим пером три секунды постой —<br>Засияют яблоки золотой красой.',()=>T1.revived||active(pi).pos.z<-78.5,nearT(T1)),
    O(pi?()=>'Две дорожки: одному нужен свет, другому — тьма. На перекрёстке — по очереди ступай.<br>На острове две чаши: в солнце — со светом, в звёзды — без света, так и знай.':()=>'Две дорожки: золотая да лиловая. Идите рядом — у одного свет, у другого тьма.<br>Встаньте в чаши вдвоём — вот и вся кутерьма.',
      ()=>F.gateOpen,()=>bowls.map(b=>b.g)),
    O(()=>'Тёмные аллеи, тут тени-мороки. Во тьме удар насквозь — посвети пером '+K(pi,'item')+' и бей '+K(pi,'attack')+'.<br>Мотылёк раскроется, лишь коль оба перья зажжёте рядом — вдвоём, без робей.',()=>F.cleared,()=>arena?arena.filter(e=>e.alive).map(e=>e.g):[]),
    O('У выхода две яблони — оживите обе: с горящим пером постойте рядом.',()=>F.garden,()=>[T2.g,T3.g]),
    O('Сад ожил! К воротам ступай — там звено, награда.',()=>false,()=>[L4.g])];
  for(const pi of[0,1])W.objectives[pi]=mk(pi);
  W.tipZones.push({cond:(pi,h)=>W.abil.pero&&h.pos.z<-46&&h.pos.z>-66&&h.pos.y>-1,text:pi=>'Коль перо сменишь стоя — провалишься! Прыгни '+K(pi,'jump')+' и жми '+K(pi,'item')+' в прыжке —<br>Приземлишься на нужный мосток, на верной дощечке.'},
    {cond:(pi,h)=>h.pos.z<-78&&h.pos.z>-104&&Math.abs(h.pos.x)<3,text:pi=>'Перекрёсток: свет друга лиловые мостки рядом гасит.<br>Пропусти друга — потом ступай сам, всё и сладится.'},
    {cond:(pi,h)=>W.enemies.some(e=>e.alive&&e.kind==='motylek'&&!e.both&&hd(e.pos,h.pos)<8),text:pi=>'Мотылёк раскроется, лишь коль оба перья '+K(pi,'item')+' рядом зажжёте.'},
    {cond:(pi,h)=>W.enemies.some(e=>e.alive&&e.kind==='ten'&&hd(e.pos,h.pos)<6)&&!h.lit,text:pi=>'Тень плоская — удар насквозь идёт. Зажги перо '+K(pi,'item')+':<br>В свете тень настоящей станет — бей её, вперёд!'});
  W.spawns=[[new V3(-2.6,0,4.4),new V3(-4.4,0,5.6)],[new V3(2.6,0,4.4),new V3(4.4,0,5.6)]];W.startAct=[0,0];
  W.pauseLine='Небесное царство. Перо Жар-птицы: RB зажигает и гасит.<br>Светомостки в свете тверды, тенемостки — во тьме, пока та не погаснет.<br>Серые яблони от света оживают, а тени-мороки уязвимы лишь в свете, в огне.';
  W.onStart=()=>{later(0.1,intro);};
  flushDecor();flushPuffs();}

