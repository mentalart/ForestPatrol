  function openZastava(pi){G.ui='zast';let sel=0;const el=$('mapui');el.style.display='flex';G.zbest=G.zbest||{};
    const draw=()=>{el.innerHTML='<div class="tet"><h2>Застава трёх богатырей</h2><div class="step">'+ICO_GEM+' Самоцветы: '+gemsAvail()+' · испытание открывается за 2 самоцвета · успеете в богатырское время — доспех в примерочную</div>'+
      ZAST.map((z,i)=>{const b=G.zbest[z.id];return '<div class="opt'+(i===sel?' sel':'')+'" style="justify-content:space-between">'+z.b+' · «'+z.t+'»<small>'+(b?'лучшее время '+zfmt(b):G.owned[z.id]?'открыто':'2 самоцвета')+(own(z.arm)?' · доспех получен':'')+'</small></div>';}).join('')+
      '<div class="tale">Навь-изнанка — пять вывернутых уровней — выйдет обновлением</div><div class="hint">'+K(pi,'up')+K(pi,'down')+' · '+K(pi,'jump')+' в путь · '+K(pi,'guard')+' уйти</div></div>';};
    draw();bark(kuz,'kuzma','Богатыри заждались. Самоцветы — вперёд давай.',2);
    G.uiTick=()=>{for(const q of[0,1]){const n=uiNav(q);if(n.dy){sel=(sel+n.dy+ZAST.length)%ZAST.length;SFX.swap();draw();}
      if(tap(q,'guard')||pressed.has('Escape')){closePanel();return;}
      if(tap(q,'jump')){const z=ZAST[sel];if(!G.owned[z.id]){if(gemsAvail()<2){SFX.miss();tip(q,'Два самоцвета надобно — вот уговор:<br>Все звенья уровня собери — и самоцвет твой с тех пор.',2.6);return;}G.gemsSpent+=2;G.owned[z.id]=true;SFX.bell();}
        closePanel();SFX.ok();goLevel(z.id);return;}}};}

  /* ---------- Лукоморье и награды: дуб-градусник, кузня, лавка Векши, сказки Кота, украшения ---------- */
  const hubMode=mode!=='first';
  // дуб зеленеет с каждым скованным звеном; после кражи голоса сереет
  {const green=Math.min(1,G.forgedLinks/59),grey=G.flags.voiceDone?(G.flags.w2done?0.2:0.45):0;oak.traverse(o=>{if(o.isMesh&&o.geometry.type==='SphereGeometry'){const c=new THREE.Color(0x7d8a6a).lerp(new THREE.Color(0x3f9a2c),green).lerp(new THREE.Color(0x8a8a80),grey);o.material=M(c.getHex());}});}
  // скованные звенья — витком по стволу; Кот сидит на цепи ровно там, докуда она скована
  const linkRing=[];const chainPos=k=>{const a=k*0.72+0.6;return new V3(Math.cos(a)*1.62,1.0+k*0.16,-7+Math.sin(a)*1.62);};
  const addLinkRing=k=>{const p=chainPos(k);const r=new THREE.Mesh(new THREE.TorusGeometry(0.14,0.045,6,14),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.6}));r.position.copy(p);r.rotation.set(Math.PI/2,k*0.72,k%2?Math.PI/2:0);W.group.add(r);linkRing.push(r);return r;};
  if(!G.flags.w3done)for(let k=0;k<G.forgedLinks;k++)addLinkRing(k);
  else{const w4c=G.flags.w4done?4:(G.flags.w4c||0);W.scat=[];for(let k=0;k<Math.max(0,26-w4c*7);k++){const r=new THREE.Mesh(new THREE.TorusGeometry(0.14,0.045,6,14),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.4}));r.position.set(rand(-4.5,4.5),0.06,-7+rand(-1,5));r.rotation.set(Math.PI/2+rand(-0.3,0.3),rand(0,3),0);W.group.add(r);W.scat.push(r);}
    leafShow(w4c);kot.g.position.set(1.9,0,-4.9);if(w4c===0&&!G.flags.w4intro){kot.body.rotation.z=1.2;kot.lids.forEach(l=>{l.rotation.x=1.3;});}}
  const perchKot=()=>{if(!hubMode||G.forgedLinks<=0||G.flags.w3done)return;const p=chainPos(G.forgedLinks-1);kot.g.position.set(p.x*1.25,p.y-0.6,p.z+ (p.z+7)*0.25);kot.g.rotation.y=Math.atan2(p.x,p.z+7);kot.g.scale.setScalar(0.8);};
  perchKot();
  const bellsAvail=gemsAvail;   // самоцветы вместо звоночков
  const nutsAvail=()=>worldNuts(1)+worldNuts(2)+worldNuts(3)+worldNuts(4)+worldNuts(5)+(G.nutsHub||0)-G.nutsSpent;
  // Векша — белка-лавочница; тропа на Заставу
  const vek=new THREE.Group();vek.position.set(7.9,0,5.4);vek.rotation.y=-Math.PI/2;W.group.add(vek);
  {const c=M(0xd8743a),w=M(0xf4e0c0);const b=addMesh(new THREE.SphereGeometry(0.34,12,10),c,0,0.5,0,vek);b.scale.set(1,1.3,0.9);addMesh(new THREE.SphereGeometry(0.22,10,8),w,0,0.48,0.2,vek).scale.set(1,1.3,0.6);
    addMesh(new THREE.SphereGeometry(0.24,12,10),c,0,1.02,0.02,vek);for(const s of[-1,1]){addMesh(new THREE.ConeGeometry(0.07,0.22,4),c,s*0.13,1.28,0,vek);addMesh(new THREE.SphereGeometry(0.035,6,5),MAT.dark,s*0.08,1.06,0.21,vek);}
    for(let i=0;i<5;i++)addMesh(new THREE.SphereGeometry(0.22-i*0.02,10,8),M(0xc8642a),0,0.4+i*0.22,-0.35-Math.sin(i*0.6)*0.25,vek);
    addMesh(new THREE.BoxGeometry(1.4,0.8,0.6),M(0x8a5a32),0.9,0.4,0.5,vek);for(let i=0;i<5;i++)addMesh(new THREE.SphereGeometry(0.08,6,5),M(0xffc93c,{emissive:0xb07a10,emissiveIntensity:0.5}),0.4+i*0.25,0.86,0.5,vek);}
  W.cyls.push({x:7.9,z:5.4,r:0.6,miny:-1,maxy:1.6,on:true});
  {const sg=new THREE.Group();sg.position.set(-17.5,0,7);W.group.add(sg);addMesh(new THREE.CylinderGeometry(0.08,0.1,2,6),M(0x6b4a2b),0,1,0,sg);const b=addMesh(new THREE.BoxGeometry(1.6,0.4,0.08),M(0x9a7a50),0.4,1.7,0,sg);b.rotation.z=0.08;
    for(let i=0;i<6;i++)addMesh(new THREE.BoxGeometry(0.6,0.03,0.4),M(0xc8b080),-17.5-i*0.5,0.02,7.8+i*0.7);}
  const ZASTAVA=new V3(-17.5,0,7);
  // украшения из лавки
  const decorBuilt={};
  function buildDecor(id){if(decorBuilt[id])return;decorBuilt[id]=true;
    if(id==='lamps'){for(let i=0;i<9;i++){const a=i/9*Math.PI*2;const x=Math.cos(a)*3.2,z=-7+Math.sin(a)*3.2;addMesh(new THREE.CylinderGeometry(0.01,0.01,1.2,4),MAT.dark,x,6.8,z);addMesh(new THREE.SphereGeometry(0.16,8,6),M([0xff6a4a,0xffd23a,0x7ad8ff][i%3],{emissive:[0xff3000,0xffa000,0x3a90ff][i%3],emissiveIntensity:1.2}),x,6.1,z).castShadow=false;}}
    if(id==='flowers'){for(let i=0;i<14;i++){const x=-14+i*0.32,z=-1.4+Math.sin(i)*0.2;const pc=[0xff9ad0,0xfff08a,0x9ad0ff,0xffffff][i%4];addMesh(new THREE.CylinderGeometry(0.02,0.02,0.3,4),M(0x3f8a3a),x,0.15,z);addMesh(new THREE.SphereGeometry(0.09,6,5),M(pc),x,0.32,z);}
      addMesh(new THREE.BoxGeometry(4.8,0.12,0.7),M(0x6a4a2a),-11.8,0.06,-1.4);}
    if(id==='swing'){for(const dx of[-0.45,0.45])addMesh(new THREE.CylinderGeometry(0.02,0.02,4.6,4),M(0xc8b080),1.9+dx,3.7,-5.2);addMesh(new THREE.BoxGeometry(1.1,0.08,0.4),M(0x8a5a32),1.9,1.4,-5.2);}
    if(id==='flags'){for(const[x1,z1]of[[-12,-4],[12.5,-3],[11,6],[-14.2,9.2]]){for(let i=1;i<14;i++){const u=i/14,x=lerp(0,x1,u),z=lerp(-7,z1,u),y=lerp(5.4,2.9,u)-Math.sin(u*Math.PI)*0.7;
        const f=addMesh(new THREE.ConeGeometry(0.18,0.32,3),M([0xc0302a,0xffd23a,0x3a6ad0,0x3f8a45][i%4]),x,y,z);f.rotation.x=Math.PI;f.castShadow=false;}}}
    if(id==='stupa'){const st=new THREE.Group();st.position.set(-15.6,0,5.2);st.rotation.y=0.6;W.group.add(st);addMesh(new THREE.CylinderGeometry(0.5,0.36,0.8,12),M(0x8a6a44),0,0.4,0,st);addMesh(new THREE.TorusGeometry(0.5,0.04,6,16),M(0x5a4028),0,0.8,0,st).rotation.x=Math.PI/2;
      const br=addMesh(new THREE.CylinderGeometry(0.03,0.03,1.6,5),M(0x6b4a2b),0.3,1.0,0,st);br.rotation.z=-0.4;const bw=addMesh(new THREE.ConeGeometry(0.16,0.4,6),M(0xd8b86a),0.62,0.28,0,st);bw.rotation.z=-0.4;for(let i=0;i<2;i++)addMesh(new THREE.BoxGeometry(0.08,0.06,1.4),M(0x6b4a2b),(i?0.25:-0.25),0.03,0,st);}
    if(id==='samovar'){const sv=new THREE.Group();sv.position.set(4.2,0,-3.2);W.group.add(sv);addMesh(new THREE.BoxGeometry(1.1,0.7,0.8),M(0x8a5a32),0,0.35,0,sv);addMesh(new THREE.CylinderGeometry(0.28,0.22,0.55,12),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4}),0,0.98,0,sv);
      addMesh(new THREE.CylinderGeometry(0.05,0.05,0.4,6),M(0x5a5a60),0,1.45,0,sv);addMesh(new THREE.SphereGeometry(0.1,8,6),M(COL.gold),0.26,0.9,0.1,sv);for(let i=0;i<3;i++)addMesh(new THREE.CylinderGeometry(0.07,0.07,0.1,8),M(0xf4f0e8),-0.3+i*0.3,0.75,0.25,sv);}}
  for(const id of['lamps','flowers','swing','flags','samovar','stupa'])if(own(id))buildDecor(id);
  /* кузня: сдать звенья — три удара в такт с Кузьмой; в мире 1 он поправляет каждый удар */
  const FG={on:false};
  function forgeGame(){const fw=(G.flags.w4done?[5]:G.flags.w3done?[4]:[1,2,3]).find(x=>worldLinks(x)>(G.forgedW[x]||0));if(!fw)return;const pending=worldLinks(fw)-(G.forgedW[fw]||0);FG.w=fw;G.ui='forge';F.forging=true;const pr=HERO.proshka;placeOnGround(pr,7.9,1.5,0);pr.face=Math.atan2(8.6-7.9,0.6-1.5);
    FG.on=true;FG.t=-2*0.75;FG.k=-3;FG.pending=pending;FG.res=[];FG.pressed={};
    if(!FG.ring){FG.ring=new THREE.Mesh(new THREE.TorusGeometry(1,0.05,6,28),MB(COL.gold,{transparent:true,opacity:0.9}));FG.ring.rotation.x=Math.PI/2;W.group.add(FG.ring);}
    FG.ring.visible=true;banner('Кузня · звеньев мира '+fw+' к ковке: '+pending,'#ffd76a',2.2,fw===5?'звенья Буяна: бей '+K(0,'attack')+' в такт — девять звеньев терем отворят':fw===4?'на равных: Кузьма ударил — ты вослед, '+K(0,'attack')+' в такт':fw===3?'сам куёшь, Кузьма лишь держит: бей '+K(0,'attack')+' в лад':fw===2?'молот твой: бей '+K(0,'attack')+' в такт — Кузьма лишь последний удар поправит':'Кузьма ударил — ты вослед: бей '+K(0,'attack')+' в такт трижды');}
  function forgeTick(dt){const B=0.75;FG.t+=dt;const k=Math.floor(FG.t/B+1e-6);
    while(FG.k<k){FG.k++;const n=FG.k;if(n<0){tone(1760,0.05,'square',0.05);}else if(n%2===0&&n<6&&FG.w!==3){anim(0.3,q=>{kuz.arm.rotation.x=-Math.sin(q*Math.PI)*1.3;});later(0.12,()=>{SFX.hammer();burst(new V3(8.6,1.0,0.6),0xffb040,8,3);blank.material.emissiveIntensity=1.3;});}}
    const pr=HERO.proshka;const next=[1,3,5].find(b=>!FG.pressed[b]&&FG.t<b*B+0.3);
    if(next!==undefined){const u=clamp((next*B-FG.t)/B,0,1);FG.ring.position.set(8.6,0.95,0.6);FG.ring.scale.setScalar(lerp(0.3,1.6,u));FG.ring.material.color.setHex(u<0.15?0xffffff:COL.gold);}
    if(tap(0,'attack')){const b=[1,3,5].find(x=>!FG.pressed[x]&&Math.abs(FG.t-x*B)<0.45);if(b!==undefined){const ok=Math.abs(FG.t-b*B)<=0.18;FG.pressed[b]=true;const fx=FG.w===2&&b===5&&!ok;FG.res.push(ok||fx);strikeP(ok||fx,fx);}}
    for(const b of[1,3,5])if(!FG.pressed[b]&&FG.t>b*B+0.3){FG.pressed[b]=true;const fx=FG.w===2&&b===5;FG.res.push(fx);strikeP(fx,fx);}
    if(FG.t>5*B+0.9){FG.on=false;FG.ring.visible=false;G.ui=null;F.forging=false;kuz.arm.rotation.x=0;
      const before=G.forgedLinks,bw=G.forgedW[FG.w]||0;G.forgedW[FG.w]=bw+FG.pending;G.forgedLinks=(G.forgedW[1]||0)+(G.forgedW[2]||0)+(G.forgedW[3]||0)+(G.forgedW[4]||0)+(G.forgedW[5]||0);const good=FG.res.filter(x=>x).length;
      for(let i=before;i<G.forgedLinks;i++){const r=addLinkRing(i);r.scale.setScalar(0.01);later((i-before)*0.18,()=>{anim(0.4,q=>r.scale.setScalar(Math.max(0.01,q)));SFX.link();});}
      later((G.forgedLinks-before)*0.18+0.3,perchKot);
      const extra=Math.max(0,G.forgedW[FG.w]-GATE(FG.w))-Math.max(0,bw-GATE(FG.w));
      banner('Выковано звеньев: '+FG.pending,'#ffd76a',2.4,(good===3?'все три удара — звон на всю округу!':'звонких ударов: '+good+' из 3'));
      if(FG.w===1&&bw<12&&G.forgedW[1]>=12&&!G.flags.forged)later(2.6,forgeScene);else if(FG.w===2&&bw<12&&G.forgedW[2]>=12&&!G.flags.forged2)later(2.6,forgeScene2);else if(FG.w===3&&bw<12&&G.forgedW[3]>=12&&!G.flags.forged3)later(2.6,forgeScene3);else if(FG.w===4&&bw<12&&G.forgedW[4]>=12&&!G.flags.forged4)later(2.6,forgeScene4);else if(FG.w===5&&bw<9&&G.forgedW[5]>=9&&!G.flags.forged5)later(2.6,forgeScene5);
      else later(1.4,()=>bark(kuz,'kuzma',FG.w===5?(good===3?'Звенит. Как у Демьяна.':'Ровнее, мастер.'):FG.w===4?(good===3?'На равных.':'Ещё раз. Вместе.'):FG.w===3?(good===3?'Руки есть. А голова? Поглядим сперва.':'Хм.'):FG.w===2?(good===3?'Вот. Слышишь? Сам.':'Почти. Слушай металл.'):(good===3?'Руки есть. А голова? Поглядим сперва.':'Слушай металл, Прошка.'),2.2));}}
  function strikeP(ok,fixed){const pr=HERO.proshka;pr.atkT=0.28;later(0.08,()=>{if(ok){tone(2400,0.5,'triangle',0.22);SFX.hammer();burst(new V3(8.6,1.0,0.6),0xffe060,16,5);floatText(new V3(8.6,1.9,0.6),fixed?'Кузьма поправил — и звенит!':'Звон!','#ffe36b');if(fixed)anim(0.4,q=>{kuz.arm.rotation.z=Math.sin(q*Math.PI)*0.4;});}
    else{SFX.clink();floatText(new V3(8.6,1.9,0.6),'Тук…','#dddddd');if(FG.w===1){later(0.3,()=>bark(kuz,'kuzma',FG.corrected?'Послушай, как поёт металл.':'Не лупи сплеча — послушай металл.',1.6));FG.corrected=true;anim(0.4,q=>{kuz.arm.rotation.z=Math.sin(q*Math.PI)*0.4;});}}});}
  /* лавка Векши — большая витрина с примеркой: см. ниже («ЛУКОМОРЬЕ: лавка Векши с примеркой…») */
  /* сказки-лубки Кота (до финала — картинками и пантомимой) и пляска Кота на цепи — за самоцветы */
  const TALES=[{id:'yaga',lv:'1-1',name:'«Баба Яга и клубок»',lines:['В лесу дремучем Яга жила,<br>Изба на курьих ножках у ней была.','Пришли к ней четверо гостей:<br>«Повернись, избушка, к нам передом скорей!»','Потрудились — Яга клубок дала:<br>Катится, куда брошен, — нить-тропу вела.']},
    {id:'kolobok',lv:'1-3',name:'«Колобок с пружиной»',lines:['Колобок по лесу катился,<br>Песней звонкой заливался.','Встретил лису — да лиса была не та:<br>Есть не стала — вот так доброта!','«В тебе пружинка», — молвила она.<br>С тех пор Колобок катится — жизнь весела!']},
    {id:'leshy',lv:'1-4',name:'«Шапка наизнанку»',lines:['Леший путников в лесу водил,<br>Ёлками тропинки путал-кружил.','Шапку наизнанку кто наденет —<br>Того и Леший не закружит, не заденет.','Нашли его четверо друзей —<br>И стал Леший проводником путей.']},
    {id:'kiki',lv:'1-5',name:'«Кикиморина прялка»',lines:['В старом овине Кикимора пряла,<br>Чужим голосом песни вела.','Веретено звенело у ней,<br>Словно связка чёрных ключей.','Веретено отняли — и голос свой<br>Вернулся к ней. Должницей стала — вот какой!']},
    {id:'sadko',lv:'2-1',name:'«Гусли Садко»',lines:['Садко во Китеже на дне сидел,<br>Струна порвалась — он не пел.','Срастил струну ёжик мёртвою водой —<br>И гусли запели звонкой чередой.','Молвил Садко: «Вода разговоры любит —<br>Лишь в Китеже не молчите: молчанье губит».']},
    {id:'kit',lv:'2-2',name:'«Чудо-юдо Рыба-кит»',lines:['Чудо-юдо Рыба-кит<br>Поперёк моря лежит,<br>На спине — деревня с огородами,<br>С избами да хороводами.','Вода у кита на спине — одна на всех:<br>Кто прилив, кто отлив — договоритесь без помех.','А в прилив фонтан китовый бьёт —<br>До облаков тебя подбросит, вознесёт.']},
    {id:'rybka',lv:'2-3',name:'«Невод из клубков»',lines:['Жил старик у самого моря,<br>Сорок лет чинил невод — да всё в дырах, вот горе.','Четверо невод из клубков сплели,<br>Углы держали — прилив подняли.','Вытащили рыбку золотую — звено она дала,<br>А старику чинить невод не надо — вот дела!']},
    {id:'kitezh',lv:'2-5',name:'«Китеж звонит»',lines:['Колокола Китежа молчали,<br>Каждый — на своей глубине, в печали.','Звонили лишь тогда они,<br>Когда вода вставала вровень, как в былые дни.','А главный колокол от шёпота проснулся:<br>«Бом», — тихонько отозвался.']},
    {id:'pero',lv:'3-1',name:'«Перо Жар-птицы»',lines:['В саду у Жар-птицы тьма легла —<br>Перья все она растеряла.','Последние перья четверым дала:<br>Зажжёшь — светло, погасишь — мгла,<br>И у каждой темноты — свои мостки.','Постояли у серых яблонь со светом —<br>И сад ожил, как летом.']},
    {id:'barashki',lv:'3-2',name:'«Облачные барашки»',lines:['Над облаками барашки пасутся,<br>А пастуха нет — вот и не соберутся.','Облака тепло любят: под пером горящим<br>Подымаются, как пирог в печи пыхтящей.','А барашки к свету бегут гурьбой —<br>И мостком через пропасть встают собой.']},
    {id:'korabl',lv:'3-4',name:'«Летучий корабль»',lines:['У облачной пристани корабль стоял,<br>Крылья вместо вёсел он расправлял.','Перо в фонарь повесили — и вот:<br>Паруса налились светом — в полёт!','Кренился он туда, где вес тяжелей,<br>А медведь — за троих, всех грузней.']},
    {id:'gusi',lv:'3-5',name:'«Гуси-лебеди»',lines:['Гуси-лебеди бельчонка унесли —<br>Того, что колыбельную забыл вдали.','Прятали четверых печка, яблонька да речка —<br>Тех, кто угощенья не отверг, сердечно.','А Яга долг вернула сполна —<br>И снова осталась должна.']},
    {id:'kuznya',lv:'4-1',name:'«Кузня Кузьмы и Демьяна»',lines:['У огненной реки кузня стояла,<br>Кузнецов в ней каменная дрёма сковала.','Прошка клещи сковал в такт, как бил мороков,<br>А Пелагея мехи качала без лишних слов.','Горн вспыхнул — кузнецы проснулись вдруг.<br>«Сам?» — Демьян спросил, окинув круг.']},
    {id:'smorodina',lv:'4-2',name:'«Река Смородина»',lines:['Текла Смородина-река огнём —<br>Ни перепрыгнуть, ни перелететь её днём.','Йоша живую воду лил — огонь коркой застывал,<br>А клещами корку дальше каждый нёс-подавал.','У лавопада Потап промолвил вдруг:<br>«Ладно. Не „сиди тут“, мой друг».']},
    {id:'valy',lv:'4-4',name:'«Змиевы валы»',lines:['Встарь кузнецы запрягли Змея в плуг —<br>Пропахали Змиевы валы вокруг.','Четверо плуг клещами за лемех взяли —<br>И лаву бороздою повели-погнали.','Лаву не бьют — её ведут.']},
    {id:'most',lv:'4-5',name:'«Калинов мост»',lines:['Над Смородиной — мост Калинов,<br>Из калёных досок, крепок и длинен.','Мост Потап держал, пока друзья прошли,<br>И не обернулся — будто врос в земли.','«Ты держал». — «А ты чинил, не жалея сил».']},
    {id:'dance',name:'Пляска Кота на цепи',cost:1},{id:'sunduk',lv:'5-1',name:'«Сундук на дубе»',lines:['У Буяна бел-горюч камень Алатырь лежит,<br>Четыре знака по нему бегут-бежит.','На дубе — сундук на пяти цепях: четыре с замками, а пятую держит Лихо Одноглазое.','Лихо не бьют — Лихо усыпляют. Не буди лихо, пока оно тихо!']},
    {id:'zayac',lv:'5-2',name:'«Заяц»',lines:['Зайца не догнать — зайца загоняют.','Встали четверо столбами в ряд,<br>А меж ними нити клубков летят.','А придумал, как быть, — самый малый, ёж.']},
    {id:'yajco',lv:'5-4',name:'«Яйцо»',lines:['В яйце — Кощеев бальный зал,<br>Золотой, вверх дном он стал.','«Калинка» играла, и в такт, в долю,<br>Пол переворачивался поневоле.','А в клетке из чёрных ниток Звенышко сидело —<br>И Йоша успел — вот какое дело!']},
    {id:'zastava',name:'Испытанья Заставы — у знака Заставы ждут.',cost:2,locked:true}];
  function openTales(pi){G.ui='tales';let sel=0;const el=$('mapui');el.style.display='flex';const list=(skazTold().length||G.flags.skaz5?[{id:'book',name:'Наши сказки',book:true}]:[]).concat(TALES.filter(t=>!t.lv||G.done[t.lv]));
    const draw=()=>{el.innerHTML='<div class="tet"><h2>Кот Учёный · сказки-лубки</h2><div class="step">'+ICO_GEM+' Самоцветы: '+gemsAvail()+' <small style="opacity:.7">(самоцвет — за уровень, где собраны все звенья, и за каждого босса)</small></div>'+
      list.map((t,i)=>'<div class="opt'+(i===sel?' sel':'')+'" style="justify-content:space-between'+(t.locked?';opacity:.5':'')+'">'+(t.lv?'Сказка '+t.name:t.name)+'<small>'+(t.book?'читать':t.lv?(G.tales[t.id]?'смотреть снова':'1 самоцвет'):t.locked?'скоро':(t.cost+' самоцвет'))+'</small></div>').join('')+
      (list.length<3?'<div class="tale">новые сказки — за пройденные уровни мира</div>':'')+'<div class="hint">'+K(pi,'up')+K(pi,'down')+' · '+K(pi,'jump')+' · '+K(pi,'guard')+' уйти</div></div>';};
    draw();if(G.flags.kotVoice)bark(kot,'kot','Садитесь! Расскажу — словами, своими, живыми!',2);else if(!G.flags.voiceDone)bark(kot,'kot','Садитесь. Лапами расскажу — как смогу.',1.8);else bark(kot,'kot','Мяу.',1.2);
    G.uiTick=()=>{for(const q of[0,1]){const n=uiNav(q);if(n.dy){sel=(sel+n.dy+list.length)%list.length;SFX.swap();draw();}
      if(tap(q,'guard')||pressed.has('Escape')){closePanel();return;}
      if(tap(q,'jump')){const t=list[sel];if(t.book){SFX.ok();showBook(q);return;}if(t.locked){SFX.miss();return;}const cost=t.lv?(G.tales[t.id]?0:1):t.cost;if(gemsAvail()<cost){SFX.miss();tip(q,'Нужен самоцвет. А самоцвет дают тому,<br>Кто все звенья в уровне собрал — по одному.',2.6);return;}
        G.gemsSpent+=cost;SFX.bell();if(t.lv){G.tales[t.id]=true;showLubok(t);}else{closePanel();kotDance();}}}};}
  function showLubok(t){G.ui='lubok';const el=$('mapui');let i=0,tt=0;const svg=LUBOK[t.id]||'';
    const draw=()=>{el.innerHTML='<div class="lubok"><div style="font:900 22px Georgia,serif;color:#8a1a14;margin-bottom:8px">Сказка-лубок '+t.name+'</div>'+svg+'<div class="cap">'+t.lines[i]+'</div><div class="hint" style="font:600 13px system-ui;opacity:.7">'+(i+1)+' / '+t.lines.length+' · '+K(0,'jump')+' дальше</div></div>';};
    draw();babble('kot',t.lines[0]);
    G.uiTick=()=>{tt+=1/60;kot.body.rotation.z=Math.sin(G.time*3)*0.12;kot.head.rotation.y=Math.sin(G.time*2)*0.4;
      if(tt>4.2||tap(0,'jump')||tap(1,'jump')){tt=0;i++;if(i>=t.lines.length||pressed.has('Escape')){closePanel();SFX.ok();return;}draw();SFX.flower();}
      if(tap(0,'guard')||tap(1,'guard')||pressed.has('Escape'))closePanel();};}
  // «Наши сказки»: сказы, которые герои сложили сами (Сказы 1–4 и пятый — по памяти), по странице на сказ
  function showBook(pi){G.ui='lubok';const el=$('mapui');el.style.display='flex';const pages=skazTold();if(G.flags.skaz5)pages.push(5);let i=0;
    const draw=()=>{const n=pages[i];let title,body,foot;
      if(n<5){const S=SKAZ[n],t=G.flags[SKFLAG[n]],ei=skazEnding(n);title='Наша сказка · «'+S.title+'»';body=t.slice(0,3).map(l=>'<p style="margin:8px 0;line-height:1.4">'+l+'</p>').join('');foot='помощник — '+VEST[helperOf(n)][0]+(ei>=0?' · '+SKAZ_TAGS[ei]:'');}
      else{const t=G.flags.skaz5;title='Пятый Сказ · по памяти';body='<p style="margin:8px 0;line-height:1.4">'+t[0]+'…</p><p style="margin:8px 0;line-height:1.4">'+t[2]+'.</p>';foot='помощник — '+t[1];}
      el.innerHTML='<div class="tet sk"><h2>'+title+'</h2><div style="text-align:center;font-family:Georgia,serif;font-size:17px">'+body+'</div><div class="tale">'+foot+'</div><div class="hint">'+(i+1)+' / '+pages.length+' · '+K(pi,'jump')+' дальше · '+K(pi,'guard')+' закрыть</div></div>';};
    draw();
    G.uiTick=()=>{if(tap(0,'guard')||tap(1,'guard')||pressed.has('Escape')){closePanel();return;}
      if(tap(0,'jump')||tap(1,'jump')){i++;if(i>=pages.length){closePanel();SFX.ok();return;}draw();SFX.flower();}};}
  function kotDance(){SFX.ok();F.kotDance=4;banner('Кот на цепи пустился в пляс!','#ffd76a',2,'весь дуб звенит-поёт');SONG_C.forEach((l,i)=>later(i*0.26,()=>{gusli(l[0],0,0.14);}));}
  function closePanel(){G.ui=null;G.uiTick=null;$('mapui').style.display='none';}
  const nearNpc=(h,p,r)=>hd(h.pos,p)<(r||2.6)&&h.pos.y<1.5;
  if(hubMode){
    W.updates.push(dt=>{
      if(FG.on)forgeTick(dt);
      if(F.kotDance>0){F.kotDance-=dt;kot.body.rotation.y=Math.sin(G.time*10)*0.5;kot.body.position.y=Math.abs(Math.sin(G.time*8))*0.3;if(F.kotDance<=0){kot.body.rotation.y=0;kot.body.position.y=0;}}
      if(F.stage!=='free'||G.ui||G.cine)return;
      for(const pi of[0,1]){const h=active(pi);
        if(helperOf(1)==='yaga'&&((G.flags.w2intro&&!G.flags.w2done)||(G.flags.w3intro&&!G.flags.w3done))&&tap(pi,'call')&&!danceOwned()){SFX.whoosh();floatText(h.pos.clone().add(new V3(0,2,0)),'Ступа Яги!','#e08a8a');openMap(pi);break;}
        if(tap(pi,'call')&&danceOwned()&&hubDance(pi))break;
        if(!tap(pi,'attack'))continue;
        if(nearNpc(h,vek.position)){dressOpen(pi,'shop');break;}
        if(nearNpc(h,kot.g.position,3.2)){openTales(pi);break;}
        if(nearNpc(h,ZASTAVA,2.4)){openZastava(pi);break;}
        if(G.flags.w5done&&nearNpc(h,new V3(-12,0,-1.6),2.2)){retellSkaz5(pi);break;}
        if(koschH&&nearNpc(h,koschH.g.position,2.4)){bark(koschH,'koschei',['Расскажи ещё — прошу.','Молоточек почти готов — ещё чуток.','Я слушаю. Сказывай.'][Math.floor(rand(0,3))],2);break;}}});
    const lab=(pi,pos,dist,text,cond)=>prompt(pi,'label',()=>pos(),()=>F.stage==='free'&&!G.ui&&hd(active(pi).pos,pos())<dist&&(!cond||cond()),text);
    for(const pi of[0,1]){
      lab(pi,()=>new V3(10.2,3.2,-0.6),9,'Кузьма · кузня',()=>!(hd(active(pi).pos,anvil.position)<2.2));
      lab(pi,()=>new V3(7.9,2.4,5.4),9,'Векша · лавка',()=>!nearNpc(active(pi),vek.position));
      lab(pi,()=>kot.g.position.clone().add(new V3(0,2.6,0)),9,'Кот Учёный · сказки',()=>!nearNpc(active(pi),kot.g.position,3.2));
      lab(pi,()=>new V3(-17.5,2.6,7),8,'Застава · испытания богатырей');
      prompt(pi,'attack',()=>headOf(active(pi)),()=>F.stage==='free'&&!G.ui&&nearNpc(active(pi),ZASTAVA,2.4),'испытания');
      prompt(pi,'attack',()=>headOf(active(pi)),()=>F.stage==='free'&&!G.ui&&nearNpc(active(pi),vek.position),'лавка Векши');
      prompt(pi,'attack',()=>headOf(active(pi)),()=>F.stage==='free'&&!G.ui&&nearNpc(active(pi),kot.g.position,3.2),'сказки Кота');}
  }
  /* ---------- карта-рушник: выбор уровня ---------- */
  function openMap(pi){G.ui='map';let wsel=curWorld(),list=[],sel=0;const el=$('mapui');el.style.display='flex';
    const wOpen=w=>w===1||(w===2&&!!G.flags.voiceDone)||(w===3&&!!G.flags.w2done)||(w===4&&!!G.flags.w3done)||(w===5&&!!G.flags.w4done);
    // эпилог — в списке Острова Буяна последним, после финала (у него нет своего мира); открыт, как одолели Кощея
    // пролог — в списке Дремучего леса первым: открыт всегда, проходится заново, после него — снова в Лукоморье
    const isEpi=l=>l.id==='epi',isPro=l=>l.id==='p',doneL=l=>!!G.done[l.id]||(isEpi(l)&&!!G.flags.epiDone)||(isPro(l)&&!!G.flags.proDone);
    const setW=w=>{wsel=w;list=LEVELS.filter(l=>l.world===w||(w===5&&isEpi(l))||(w===1&&isPro(l)));sel=list.findIndex(l=>!isPro(l)&&!doneL(l));if(sel<0)sel=list.findIndex(l=>!isPro(l));};setW(wsel);
    const gateOK=l=>l.world===1?G.flags.forged:l.world===2?G.flags.forged2:l.world===3?G.flags.forged3:l.world===4?G.flags.forged4:l.id==='5-B2'?(!!G.done['5-B1']&&!!G.flags.bezImen):G.flags.forged5;const bossTo=w=>w===1?'к Лешему':w===2?'к Водяному':w===3?'к Соловью':w===4?'к Горынычу':'в терем';
    const open=l=>isPro(l)?true:isEpi(l)?(!!G.done['5-B2']||doneL(l)):l.boss?gateOK(l):(l===list.find(x=>!isPro(x))?wOpen(l.world):(G.done[LEVELS[LEVELS.indexOf(l)-1].id]||G.done[l.id]));
    const TAGS={'1-3':'♪ гусельный · ','2-3':'на четверых · ','2-4':'экран разделён · ','3-3':'♪ гусельный · ','3-4':'летучий корабль · ','3-5':'погоня · ','4-2':'лавопад · ','4-3':'на четверых · ','4-5':'путь Потапа · ','5-1':'Лихо · ','5-2':'на четверых · ','5-3':'полёт · ','5-4':'♪ гусельный · '};
    const draw=()=>{el.innerHTML='<div class="rush"><h2>Карта-рушник</h2><div class="worlds">'+WORLDN.map((w,i)=>'<span class="'+(i+1===wsel?'on':wOpen(i+1)?'':'off')+'">'+(i+1)+' · '+w+(wOpen(i+1)?'':' <small>скоро</small>')+'</span>').join('')+'</div>'+
      list.map((l,i)=>{const ok=open(l),got=G.got[l.id]||0,nut=(G.nutsGot&&G.nutsGot[l.id])||0;
        const tag=isPro(l)?'начало сказки · Звенышко и тетрадка Пелагеи':isEpi(l)?(ok?'вечер в штабе-сосне · театр теней · колыбельная · титры':'откроется после финала'):l.boss?(gateOK(l)?(l.id==='5-B2'?'финал':'ворота открыты'):l.id==='5-B2'?'сначала — терем':'🔗 '+(G.forgedW[l.world]||0)+' / '+GATE(l.world)+' — кузня Кузьмы'):(TAGS[l.id]||'')+'звенья '+got+' / '+l.links+(G.gems[l.id]?' '+ICO_GEM:'')+(l.nuts?' · '+ICO_NUT+' '+nut+' / '+l.nuts:'')+(G.secrets[l.id]?' · карта тайников':'');
        return '<div class="lv'+(i===sel?' sel':'')+(ok?'':' lock')+'">'+(doneL(l)?'✓ ':ok?'• ':'🔒 ')+l.name+'<small>'+tag+(l.boss&&G.gems[l.id]?' '+ICO_GEM:'')+'</small></div>';}).join('')+
      '<div class="hint">'+K(pi,'left')+K(pi,'right')+' мир · '+K(pi,'up')+K(pi,'down')+' уровень · '+K(pi,'jump')+' в путь · '+K(pi,'attack')+' вышить карту тайников (1 самоцвет) · '+K(pi,'guard')+' свернуть</div></div>';};
    draw();
    G.uiTick=()=>{for(const q of[0,1]){const n=uiNav(q);if(n.dy){sel=(sel+n.dy+list.length)%list.length;SFX.swap();draw();}
        if(n.dx){const nw=wsel+n.dx;if(nw>=1&&nw<=5&&wOpen(nw)){setW(nw);SFX.swap();draw();}else SFX.miss();}
        if(tap(q,'guard')||pressed.has('Escape')){closeMap();return;}
        if(tap(q,'attack')){const l=list[sel];const nb=gemsAvail();if(l.boss||isEpi(l)||isPro(l)||G.secrets[l.id]){SFX.miss();return;}if(nb<1){SFX.miss();tip(q,'Нужен самоцвет. А самоцвет дают тому,<br>Кто все звенья в уровне собрал — по одному.',2.6);return;}
          G.gemsSpent++;G.secrets[l.id]=true;SFX.bell();banner('Карта тайников на рушнике расшита!','#ffd76a',2,l.name+': над орешками — света столбы до небес');draw();}
        if(tap(q,'jump')){const l=list[sel];if(!open(l)){SFX.miss();tip(q,isEpi(l)?'Эпилог откроется, как Кощея одолеете.':l.boss?(l.id==='5-B2'?'Финал откроется, как терем пройдёте.':'Ворота '+bossTo(l.world)+' Кузьма откроет, как скуёте<br>'+GATE(l.world)+' звеньев этого мира — тогда и пойдёте.'):'Сперва пройдите тот уровень, что прежде.',2.4);return;}
          SFX.ok();closeMap();travelTo(l);return;}}};}
  function travelTo(l){const w=l.world||(l.id==='epi'?5:1),ic=new V3(-4.2+(w-1)*2.1,0.3,map.position.z+2.5),col=[COL.gold,0x7ad8ff,0xffe0f0,0xff8a3a,0xffd23a][w-1];
    F.rushnik=true;map.visible=true;loomSpin=7;anim(0.9,k=>{map.scale.z=Math.max(0.01,smooth(k));});const icg=icons[w-1];
    later(0.6,()=>{SFX.bell();tone(mf(74),0.6,'sine',0.14);tone(mf(79),0.6,'sine',0.1,null,0.12);anim(0.9,k=>{icg.scale.set(1+k*0.6,0.08+smooth(k)*1.6,1+k*0.6);});for(let i=0;i<5;i++)later(i*0.14,()=>ringFx(ic.clone(),col,1+i*0.6));});
    play({dur:3.0,fov:46,shots:[shot(0,[0,6.5,-11.2],[0,0,ic.z]),shot(0.8,[ic.x*0.5,3.6,ic.z+4.2],[ic.x,0.5,ic.z]),shot(1.8,[ic.x,1.4,ic.z+1.3],[ic.x,0.7,ic.z])],says:[],events:[],end:()=>{}});
    HEROES.forEach((h,i)=>{const from=h.pos.clone();later(0.35+i*0.12,()=>{anim(1.2,k=>{const s2=smooth(k),a=k*7+i*1.6,rr=(1-s2)*1.3;h.pos.set(lerp(from.x,ic.x,s2)+Math.cos(a)*rr,from.y+Math.sin(k*Math.PI)*1.8,lerp(from.z,ic.z,s2)+Math.sin(a)*rr);h.g.scale.setScalar(Math.max(0.05,1-s2*0.95));
      if(Math.random()<0.5)burst(h.pos.clone().add(new V3(0,0.5,0)),col,2,1.4);});});});
    later(2.0,()=>{ringFx(ic,col,3.4);goLevel(l.id);});}
  function closeMap(){G.ui=null;G.uiTick=null;$('mapui').style.display='none';}
  W.onLeave=()=>{closeMap();$('skaz').style.display='none';};
  /* ============ ЛУКОМОРЬЕ: лавка Векши с примеркой, примерочная, огород Дедки, курятник Рябы, пляски ============ */
  // пляски: мелодия гуслей и своё движение; выбранная пляска — на «Ко мне!» в Лукоморье
  const DANCES={barynya:{name:'Пляска «Барыня»',cost:10,notes:[74,76,78,79,78,76,74,71],st:'spin',desc:'Кружится вся честная компания!'},
    berezka:{name:'Хоровод «Берёзка»',cost:10,lv:'3-3',notes:[67,71,74,72,71,69,67,69],st:'sway',desc:'Плавно, как берёзки поутру на ветру.'},
    burlak:{name:'Пляска «Бурлацкая»',cost:12,lv:'4-3',notes:[57,60,62,60,57,55,57,62],st:'lean',desc:'Эх, ухнем! Баржу тянем — не устанем!'},
    zmeyka:{name:'Пляска «Змейка»',cost:12,lv:'5-3',notes:[72,74,76,79,76,74,72,67],st:'wave',desc:'Волной, змейкой — друг за дружкой.'},
    kalinka:{name:'Пляска «Калинка»',cost:14,lv:'5-4',notes:[76,74,72,71,69,71,72,74],st:'squat',desc:'Вприсядку! Живей, живей, веселей!'}};
  const DANCE_IC=SV('<circle cx="22" cy="18" r="7" fill="#e0784a"/><path d="M22 25 L14 44 M22 25 L32 42 M16 32 L6 26 M28 32 L40 24" stroke-width="4"/><path d="M44 12 v18 a5 5 0 1 1 -3 -4" fill="none" stroke="#c0302a" stroke-width="3"/>');
  const LUKO_GOODS=[
    {id:'lamps',name:'Фонарики на дубе',cost:8,desc:'На ветках огоньки — что звёзды-светлячки.',icon:SV('<path d="M8 12 Q32 30 56 12" fill="none"/><circle cx="16" cy="22" r="6" fill="#ff6a4a"/><circle cx="32" cy="28" r="6" fill="#ffd23a"/><circle cx="48" cy="22" r="6" fill="#7ad8ff"/>')},
    {id:'flowers',name:'Клумба у избы',cost:10,desc:'Ромашки, колокольчики, васильки — цветут у избы, у реки.',icon:SV('<rect x="6" y="46" width="52" height="10" rx="3" fill="#6a4a2a"/><circle cx="18" cy="34" r="7" fill="#ff9ad0"/><circle cx="32" cy="28" r="7" fill="#fff08a"/><circle cx="46" cy="34" r="7" fill="#9ad0ff"/>')},
    {id:'swing',name:'Качели на ветке дуба',cost:12,desc:'Качайтесь вволю — до самой зорьки!',icon:SV('<path d="M16 4 V44 M48 4 V44" stroke-width="3"/><rect x="10" y="42" width="44" height="7" rx="3" fill="#8a5a32"/>')},
    {id:'flags',name:'Флажки-ленты между избами',cost:15,desc:'Каждый день у нас — праздник!',icon:SV('<path d="M4 10 Q32 26 60 10" fill="none"/><path d="M12 14 l4 12 l4 -10Z" fill="#c0302a"/><path d="M26 19 l4 12 l4 -11Z" fill="#ffd23a"/><path d="M40 19 l4 12 l4 -12Z" fill="#3a6ad0"/>')},
    {id:'samovar',name:'Самовар у Кота',cost:20,desc:'Чай с баранками — после похода, в любую погоду.',icon:SV('<path d="M20 20 H44 L48 46 H16Z" fill="#ffd23a"/><rect x="28" y="8" width="8" height="12" fill="#6a6a70"/><rect x="14" y="46" width="36" height="8" rx="2" fill="#8a5a32"/>')},
    {id:'stupa',name:'Ступа-санки у Заставы',cost:14,lv:'3-5',desc:'Ступа Яги — кататься да смеяться.',icon:SV('<path d="M16 24 H48 L42 54 H22Z" fill="#8a6a44"/><path d="M40 6 L30 40" stroke-width="3"/><path d="M26 38 l-8 14 h12Z" fill="#d8b86a"/>')},
    {id:'lubok',name:'Фоторежим «Лубок»',cost:20,desc:'Кадр-картинка: клавиша P или Back.',icon:SV('<rect x="6" y="12" width="52" height="40" rx="4" fill="#f4ecd8"/><rect x="12" y="18" width="40" height="28" fill="#e0c89a"/><circle cx="24" cy="28" r="5" fill="#c0302a"/><path d="M12 46 L28 32 L40 42 L52 30 V46Z" fill="#3f8a45"/>')}];
  const TABS=[{id:'hat',name:'Шапки',icon:WEAR.kolpak.icon},{id:'neck',name:'На шею',icon:WEAR.bant.icon},{id:'back',name:'За спину',icon:WEAR.plashch.icon},{id:'body',name:'Наряды',icon:WEAR.pchelka.icon},{id:'dance',name:'Пляски',icon:DANCE_IC},{id:'luko',name:'Лукоморье',icon:LUKO_GOODS[0].icon}];
  const goods=tab=>tab==='dance'?Object.keys(DANCES).map(id=>Object.assign({id,kind:'dance',icon:DANCE_IC},DANCES[id])):tab==='luko'?LUKO_GOODS.map(o=>Object.assign({kind:o.id==='lubok'?'photo':'decor'},o))
    :Object.keys(WEAR).filter(id=>WEAR[id].slot===tab&&!WEAR[id].earn).map(id=>Object.assign({id,kind:'wear'},WEAR[id]));
  const lvOpen=g=>!g.lv||!!G.done[g.lv];const lvName=id=>{const l=LEVELS.find(q=>q.id===id);return l?l.name.replace(/^[^«]*/,''):id;};
  const HNAME={proshka:'Прошка',potap:'Потап',pelageya:'Пелагея',yosha:'Йоша'},HACC={proshka:'Прошку',potap:'Потапа',pelageya:'Пелагею',yosha:'Йошу'};
  /* ---------- примерочная у лавки: подиум, ширма, зеркало ---------- */
  const PODIUM=new V3(15.6,0,7.4);
  {const g=new THREE.Group();g.position.copy(PODIUM);W.group.add(g);addMesh(new THREE.CylinderGeometry(1.05,1.15,0.22,24),M(0x8a5a32),0,0.11,0,g);addMesh(new THREE.CylinderGeometry(0.95,0.95,0.02,24),M(0xc0302a),0,0.23,0,g);
    const rr=addMesh(new THREE.TorusGeometry(0.95,0.04,6,32),M(0xffd23a,{emissive:0x806010,emissiveIntensity:0.5}),0,0.24,0,g);rr.rotation.x=Math.PI/2;W.cyls.push({x:PODIUM.x,z:PODIUM.z,r:1.05,miny:-1,maxy:0.23,on:true});
    for(let i=-1;i<=1;i++){const p=new THREE.Group();p.position.set(i*1.5,0,-1.6+Math.abs(i)*0.4);p.rotation.y=-i*0.4;g.add(p);addMesh(new THREE.BoxGeometry(1.5,3.1,0.08),M(0xf4ecd8),0,1.55,0,p);
      for(const y of[0.12,3.05])addMesh(new THREE.BoxGeometry(1.52,0.14,0.1),M(0xc0302a),0,y,0,p);for(let k=0;k<3;k++){const d=addMesh(new THREE.CircleGeometry(0.2,4),M([0xc0302a,0x3f8a45,0xffd23a][(k+i+3)%3]),0,0.75+k*0.75,0.05,p);d.rotation.z=Math.PI/4;}}
    colBox(PODIUM.x-2.3,PODIUM.x+2.3,0,3,PODIUM.z-1.75,PODIUM.z-1.2,false);
    const mr=new THREE.Group();mr.position.set(-2.1,0,0.3);mr.rotation.y=0.7;g.add(mr);addMesh(new THREE.BoxGeometry(0.1,1.6,0.1),M(0x6b3f22),0,0.8,0,mr);const fr=addMesh(new THREE.TorusGeometry(0.42,0.06,8,24),M(0xffd23a,{emissive:0x806010,emissiveIntensity:0.4}),0,1.9,0,mr);
    addMesh(new THREE.CircleGeometry(0.4,24),MB(0xcfe8ff),0,1.9,0.01,mr);}
  const DZ={on:false,mode:'shop',kind:'proshka',tab:0,sel:0,row:0,saved:null,prevCam:null,preview:null,dance:0};
  let dz=document.getElementById('dress');if(!dz){dz=document.createElement('div');dz.id='dress';$('mapui').parentNode.appendChild(dz);}
