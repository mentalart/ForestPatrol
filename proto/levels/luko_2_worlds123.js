  function mapScene(){const T=HERO;F.stage='map';
    play({dur:12.5,fov:46,shots:[shot(0,[0,6.5,-12.5],[0,0,-18.5],[0,4.2,-15.2],[0,0,-18.6],3.2),shot(4.4,[-3.6,2.6,-15.6],[-4.2,0.2,-18.5]),shot(7.8,[0,5,-13],[-4.2,0,-18.5])],
      says:[[0.4,3.8,null,'<i>Пять миров на рушнике расшиты:</i><br><i>Лес, Китеж, Небо, Смородина, Буян — все честь по чести.</i>',true],
        [4.6,3,'zven','Первым — лес! За нити крепче держись!'],[8.2,3.2,null,'<i>Звенышко — нырь! — в вышитый лес,</i><br><i>И четверых утянуло с ним в край чудес.</i>',true]],
      events:[{t:0.2,fn:()=>{icons.forEach((g,i)=>anim(0.9,k=>{g.scale.y=lerp(0.08,1,smooth(k));}),0);SFX.grow();}},
        {t:1.2,fn:()=>{icons.forEach((g,i)=>later(i*0.35,()=>{burst(new V3(-4.2+i*2.1,0.6,-18.5),i?0xd8d0c0:0x7ee08a,8,2);SFX.flower();}));}},
        {t:4.4,fn:()=>{Z.mode='script';}},
        {t:7.6,fn:()=>{const from=Z.pos.clone(),to=new V3(-4.2,0.4,-18.5);anim(1.1,k=>{Z.pos.lerpVectors(from,to,k*k);Z.pos.y+=Math.sin(k*Math.PI)*1.6;});later(1.1,()=>{zvenRing();ringFx(to,COL.gold,3);burst(to,COL.gold,20,5);Z.vis=false;SFX.whoosh();});}},
        {t:9.0,fn:()=>{HEROES.forEach((h,i)=>{const from=h.pos.clone(),to=new V3(-4.2,0.3,-18.5);anim(1.6,k=>{const q=smooth(k);h.pos.lerpVectors(from,to,q);h.pos.y+=Math.sin(q*Math.PI)*1.2;h.g.scale.setScalar(Math.max(0.05,1-q*0.95));h.face+=0.25;});});
          for(let i=0;i<6;i++)later(i*0.2,()=>ringFx(new V3(-4.2,0.3,-18.5),[COL.gold,0x7ee08a][i%2],1.5+i*0.4));}},
        {t:10.8,fn:()=>{$('flash').style.transition='opacity .6s';$('flash').style.opacity=1;}}],
      tick:(t)=>{if(t>=4.4&&t<7.6)Z.pos.set(-4.2+Math.sin(t*2)*0.8,2.2+Math.sin(t*3)*0.2,-17.2);},
      end:()=>{G.flags.map1=true;G.hub=true;HEROES.forEach(h=>h.g.scale.setScalar(1));goLevel('1-1');setTimeout(()=>{$('flash').style.opacity=0;},700);}});}
  function hubHello(){const w=curWorld(),n=(WL[w]||W1).filter(id=>G.done[id]).length;
    if(G.flags.showFinal){G.flags.showFinal=false;later(1.2,()=>showMenu('end'));return;}
    if(G.flags.w5done){later(0.8,()=>bark(kot,'kot','Садитесь — начну рассказ! Всё могу я вам поведать —<br>Всё-всё, что было и что будет…',3));return;}
    if(G.done['5-3']&&!G.flags.sand){sandScene();return;}
    if(G.flags.w4done){if(pendingLinks()>0)later(0.8,()=>bark(kuz,'kuzma','Прошка! Звенья Буяна — к наковальне, куём!',2.4));else if(G.flags.bezImen)later(0.8,()=>say('pelageya','Я сама ему расскажу. А карта — у моря, там, где волна.',2.6));
      else if(G.flags.zvenBack)later(0.8,()=>say('zven',G.flags.forged5?'Дзинь! Терема ворота настежь — карта ждёт у моря!':'Дзинь! Я снова с вами — вот и чудо!<br>Кузьме девять звеньев Буяна — на терем, покуда!',3,true));
      else if(G.flags.w5intro)later(0.8,()=>say('pelageya','…дальше — по сказке путь, а карта у моря — не забудь.',2.6));else later(0.8,()=>say('pelageya','Горыныч проснулся — вот так весть!<br>Карта у моря — на Буян, в путь, как есть!',2.6));return;}
    if(pendingLinks()>0)later(0.8,()=>{bark(kuz,'kuzma','Прошка! Неси звенья — куём, пока горячо!',2.4);});
    else if(G.flags.w4done)later(0.8,()=>say('pelageya','Горыныч у моря дремлет сладко.<br>Дальше — Остров Буян. Скоро, ребятки.',3));
    else if(coilPending())later(0.8,()=>{bark(kuz,'kuzma','Прошка! Демьяновы клещи — цепь чинить пора!',2.6);});
    else if(G.flags.w3done&&!G.flags.w4intro)later(0.8,()=>say('pelageya','Звенышка нет… Тетрадка — при мне одна.<br>Карта у моря — туда и дорога нам.',3.2));
    else if(G.flags.w3done)later(0.8,()=>say('pelageya',n<5?'…дальше — Смородина-река огневая.<br>Карта у моря — дорога прямая.':'…Горыныч живёт за Калиновым мостом.',3));
    else if(w===2&&!G.flags.w2intro)later(0.8,()=>say('zven','Карта ждёт у моря! Второй мир — Китеж подводный, чудный!',2.6,true));
    else if(w===3&&!G.flags.w3intro)later(0.8,()=>say('zven','Карта ждёт у моря! Третий мир — Небесное царство, облачное!',2.6,true));
    else if(w===3)later(0.8,()=>say('zven',n<5?'Карта ждёт у моря — в Небесное царство путь лежит!':'Небо снова светлое — теперь к Соловью, скорей!',2.4,true));
    else later(0.8,()=>say('zven',w===1?(n<5?'Карта ждёт у моря — дальше в лес дремучий!':'Все тропы лесные пройдены — к Лешему, к нему!'):(n<5?'Карта ждёт у моря — дальше в Китеж-град!':'Китежа колокола звонят — теперь к Водяному, вниз!'),2.4,true));}
  /* ---------- кузня перед боссом: «Не лупи. Слушай металл.» ---------- */
  function forgeScene(){F.forging=true;const T=HERO,pr=T.proshka;placeOnGround(pr,7.9,1.5,0);pr.face=Math.atan2(8.6-7.9,0.6-1.5);
    const strike=(who,ok)=>{anim(0.3,k=>{(who===kuz?kuz.arm:kuz.arm).rotation.x=who===kuz?-Math.sin(k*Math.PI)*1.3:0;});if(who===pr){pr.atkT=0.28;}
      later(0.15,()=>{if(ok){SFX.hammer();burst(new V3(8.6,1.0,0.6),0xffb040,12,4);blank.material.emissiveIntensity=1.4;}else{SFX.clink();floatText(new V3(8.6,1.6,0.6),'мимо','#dddddd');}});};
    play({dur:15,fov:46,shots:[shot(0,[6.2,2.4,4.2],[8.8,0.9,0.4]),shot(6.8,[7.6,1.6,2.8],[8.4,1.1,0.8]),shot(11,[5,3,5],[9,1,-0.6])],
      says:[[0.3,3,null,'<i>Прошка держит заготовку сам</i><br><i>И стучит — раз, два, три — в лад с Кузьмой, по часам.</i>',true],[4.4,1.2,'proshka','Хэк!'],
        [5.6,3.4,null,'<i>Первый удар — мимо. Кузьма тут как тут:</i><br><i>Лапу поправил — вот так и куют.</i>',true],[7.2,2.8,'kuzma','Не лупи сплеча. Послушай, как поёт металл.'],[11.2,3,null,'<i>С ворот к Лешему цепь — долой, упала вниз.</i>',true]],
      events:[{t:3.0,fn:()=>strike(kuz,true)},{t:4.4,fn:()=>strike(pr,false)},{t:7.2,fn:()=>strike(kuz,true)},{t:8.4,fn:()=>strike(pr,true)},{t:9.4,fn:()=>strike(kuz,true)},{t:10.4,fn:()=>strike(pr,true)},
        {t:11.2,fn:()=>{SFX.gate();SFX.ok();G.flags.forged=true;banner('Отворились ворота 1-Б!','#ffd76a',2.6,'на рушнике-карте — Леший-Путаник, гляди!');}}],
      end:()=>{F.forging=false;kuz.arm.rotation.x=0;}});}
  /* ---------- Мир 2: вступление Пелагеи по тетрадке, пантомима Кота, ролик рушника — Звенышко ныряет в Китеж ---------- */
  function w2Intro(){F.stage='w2intro';const T=HERO,pe=T.pelageya,yo=T.yosha;HEROES.forEach((h,i)=>{placeOnGround(h,-2.4+i*1.6,-14.6,0);h.face=Math.atan2(2.3-h.pos.x,-4.6-h.pos.z);});
    const nb=makeNotebook();nb.g.scale.setScalar(0.9);nb.g.position.set(pe.pos.x+Math.sin(pe.face)*0.55,0.7,pe.pos.z+Math.cos(pe.face)*0.55);nb.g.rotation.y=pe.face;
    play({dur:17.4,fov:46,shots:[shot(0,[pe.pos.x+2.2,1.5,pe.pos.z+1.8],[pe.pos.x,0.9,pe.pos.z]),shot(7.2,[5.8,2.4,-1.2],[2.3,1.6,-4.6]),shot(10.8,[1,3.6,-9],[yo.pos.x,0.3,-20])],
      says:[[0.3,3.2,null,'<i>Пелагея тетрадку открывает</i><br><i>И шёпотом тихонько читает.</i>',true],[3.6,3.6,'pelageya','<i>(шёпотом)</i> …Кот говорил: под водой, в глубине,<br>Есть город, что звонить забыл во сне.'],
        [7.4,3.4,null,'<i>Кот лапой машет к морю, показывает путь:</i><br><i>Мол, поплывём — изображает как-нибудь.</i>',true],[11,1.8,'yosha','Купаться! Ура-а! Вот так чудеса!'],[13,3.4,null,'<i>Йоша понял по-своему — и к морю бегом, вприпрыжку!</i>',true]],
      events:[{t:7.4,fn:()=>{anim(3.2,k=>{kot.body.rotation.z=Math.sin(k*Math.PI*6)*0.3;kot.head.rotation.y=Math.sin(k*Math.PI*3)*0.6-0.4;});bark(kot,'kot','Мяу-мяу!',1.4);}},
        {t:11,fn:()=>{const from=yo.pos.clone();yo.face=Math.PI;anim(4,k=>{yo.pos.set(from.x,0,lerp(from.z,-23.2,smooth(k)));});later(3.6,()=>{SFX.splash();burst(new V3(yo.pos.x,0,-23.4),0xcff8ff,16,4);});}}],
      tick:(t)=>{pe.body.position.y=t>3.6&&t<7.2?Math.abs(Math.sin(t*9))*0.03:0;},
      end:()=>{W.anims.length=0;W.group.remove(nb.g);kot.body.rotation.z=0;kot.head.rotation.y=0;pe.body.position.y=0;G.flags.w2intro=true;later(0.2,mapScene2);}});}
  function mapScene2(){const Zv=W.zven;F.stage='map';F.rushnik=true;map.visible=true;map.scale.z=0.01;anim(1.2,k=>{map.scale.z=Math.max(0.01,smooth(k));});
    icons.forEach(g=>{g.scale.y=1;});HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-16.2,0);h.face=Math.PI;});Zv.mode='script';Zv.vis=true;Zv.pos.set(0,3,-15);
    play({dur:11.4,fov:46,shots:[shot(0,[0,6.5,-12.5],[0,0,-18.5]),shot(4,[-1.4,2.6,-15.6],[-2.1,0.2,-18.5])],
      says:[[0.4,3.4,null,'<i>Зелёный лес на рушнике пройден уж давно,</i><br><i>А рядом Китеж голубеет — вышит полотном.</i>',true],[4,3,'zven','Второй — Китеж! Там молчать нельзя, запомни!'],[7.6,3,null,'<i>Звенышко в вышитую воду — нырь!</i><br><i>И четверых за ним утянуло вглубь.</i>',true]],
      events:[{t:6.9,fn:()=>{const from=Zv.pos.clone(),to=new V3(-2.1,0.4,-18.5);anim(1.1,k=>{Zv.pos.lerpVectors(from,to,k*k);Zv.pos.y+=Math.sin(k*Math.PI)*1.6;});later(1.1,()=>{zvenRing();ringFx(to,0x7ad8ff,3);burst(to,0x9ae0ff,20,5);Zv.vis=false;SFX.splash();});}},
        {t:8.1,fn:()=>{HEROES.forEach(h=>{const from=h.pos.clone(),to=new V3(-2.1,0.3,-18.5);anim(1.6,k=>{const q=smooth(k);h.pos.lerpVectors(from,to,q);h.pos.y+=Math.sin(q*Math.PI)*1.2;h.g.scale.setScalar(Math.max(0.05,1-q*0.95));h.face+=0.25;});});
          for(let i=0;i<6;i++)later(i*0.2,()=>ringFx(new V3(-2.1,0.3,-18.5),[0x7ad8ff,COL.gold][i%2],1.5+i*0.4));}},{t:10,fn:()=>{$('flash').style.transition='opacity .6s';$('flash').style.opacity=1;}}],
      tick:(t)=>{if(t>=4&&t<6.9)Zv.pos.set(-2.1+Math.sin(t*2)*0.8,2.2+Math.sin(t*3)*0.2,-17.2);},
      end:()=>{G.flags.map2=true;HEROES.forEach(h=>h.g.scale.setScalar(1));goLevel('2-1');setTimeout(()=>{$('flash').style.opacity=0;},700);}});}
  /* ---------- кузня перед Водяным: Прошка держит молот сам, Кузьма поправляет только последний удар; пантомима Кота — 2 из 3 ---------- */
  function forgeScene2(){F.forging=true;const T=HERO,pr=T.proshka;placeOnGround(pr,7.9,1.5,0);pr.face=Math.atan2(8.6-7.9,0.6-1.5);placeOnGround(T.yosha,4.8,0.2,0);T.yosha.face=Math.PI*0.3;
    const strike=(ok,fix)=>{pr.atkT=0.28;if(fix)anim(0.5,q=>{kuz.arm.rotation.z=Math.sin(q*Math.PI)*0.5;});later(0.15,()=>{if(ok){SFX.hammer();tone(2400,0.5,'triangle',0.2);burst(new V3(8.6,1.0,0.6),0xffb040,12,4);blank.material.emissiveIntensity=1.4;}});};
    play({dur:18.6,fov:46,shots:[shot(0,[6.2,2.4,4.2],[8.8,0.9,0.4]),shot(6.4,[7.6,1.6,2.8],[8.4,1.1,0.8]),shot(10.6,[5.4,2.2,2.4],[2.3,1.7,-4.4]),shot(14.4,[4.2,2.6,3],[-6,1,-24])],
      says:[[0.3,3.2,null,'<i>Прошка второй раз куёт —</i><br><i>Молот сам уже берёт.</i>',true],[3.4,1,'proshka','Хэк!'],[4.6,1,'proshka','Хэк!'],[6.4,3,null,'<i>Кузьма поправит лишь последний удар.</i>',true],[8.6,2,'kuzma','Вот. Слышишь, как звенит?'],
        [10.8,3,null,'<i>Кот мяукнул и лапой на скалу у омута кажет.</i>',true],[13.8,1.2,'kot','Мяу!'],[14.9,2.4,'yosha','Там рыбалка! Ура! Удочку бы мне!'],[17.3,1.3,null,'<i>Ворота к Водяному открыты настежь.</i>',true]],
      events:[{t:3.4,fn:()=>strike(true)},{t:4.6,fn:()=>strike(true)},{t:7.4,fn:()=>strike(true,true)},
        {t:10.8,fn:()=>{anim(3,k=>{kot.body.rotation.y=-0.8*Math.sin(Math.min(1,k*2)*Math.PI/2);kot.head.rotation.y=-0.6;});}},
        {t:14.9,fn:()=>{anim(1.2,k=>{T.yosha.extraY=Math.abs(Math.sin(k*Math.PI*4))*0.3;});}},
        {t:17.3,fn:()=>{SFX.gate();SFX.ok();G.flags.forged2=true;banner('Отворились ворота 2-Б!','#ffd76a',2.6,'на рушнике-карте — Водяной, гляди!');}}],
      end:()=>{F.forging=false;kuz.arm.rotation.x=0;kuz.arm.rotation.z=0;kot.body.rotation.y=0;kot.head.rotation.y=0;T.yosha.extraY=0;G.flags.forged2=true;}});}
  /* ---------- Сказ 2 «Колокола Китежа»: Кот без голоса — Пелагея рассказывает сама, шёпотом ---------- */
  function festival2(){F.stage='fest';HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-1.6,0);h.face=Math.PI;});snapCams();
    const pa=skazAcc(1);   // эхо: Пелагея вспоминает прошлую сказку, помощник которой ещё стоит на поляне
    play({dur:pa?12:7.6,fov:48,shots:[shot(0,[0,3,5],[0,1.2,-3])].concat(pa?[shot(4.1,[-3.4,1.8,1.6],[SKAZ_HELPER_AT[0],1.1,SKAZ_HELPER_AT[1]])]:[]),says:[[0.4,3.6,null,'<i>Второй Сказ. Кот без голоса — сказывать некому.</i><br><i>Пелагея над тетрадкой сидит, думу думает…</i>',true]].concat(pa?[[4.1,4.2,'pelageya',SKAZ[2].pre+'Помнишь прошлую сказку? Про '+pa+'…']]:[],[[pa?8.5:4.1,3.2,'zven','Выбирайте: начало, помощник, конец!']]),end:()=>skaz2()});}
  function skaz2(){skazChoose(2,tell2);}
  function tell2(t){const T=HERO,pe=T.pelageya;
    skazTell(2,t,{shot0:shot(0,[pe.pos.x+1.8,1.3,pe.pos.z+1.5],[pe.pos.x,0.9,pe.pos.z]),lastShot:T0=>shot(T0,[0,4,6],[0,3.4,-7]),
      closers:[[0,2.4,null,'<i>Кот, зажмурясь, слушает и мурлычет.</i>',true],[2.6,2.4,null,'<i>Кузьма цепь на дубе выше подымает.</i>',true]],tail:3.2,
      events:[{t:0,fn:()=>{kot.lids.forEach(l=>{l.rotation.x=1.3;});for(let i=0;i<6;i++)tone(70+(i%2)*6,0.4,'sawtooth',0.05,null,i*0.35);}},
        {t:2.6,fn:()=>{const c=addCoil(Math.max(1,G.flags.coils||1),true);c.scale.setScalar(0.01);anim(1.4,k=>c.scale.setScalar(Math.max(0.01,smooth(k))));SFX.link();G.flags.coils=Math.max(2,G.flags.coils||0);}}],
      tick:(tt)=>{pe.body.position.y=tt>0.3&&tt<16?Math.abs(Math.sin(tt*7))*0.02:0;},
      end:()=>{kot.lids.forEach(l=>{l.rotation.x=-0.5;});pe.body.position.y=0;G.flags.w2done=true;F.stage='free';banner('Сказ «Колокола Китежа»','#ffd76a',2.4,'цепь на дубе длиннее стала · весточка: '+VEST[helperOf(2)][0]);later(2.6,()=>showMenu('end'));}});}

  const T=HERO;
  /* ---------- Мир 3: Пелагея читает по тетрадке, пантомима Кота (3 из 3), ролик рушника — Звенышко взлетает в вышитые облака ---------- */
  function w3Intro(){F.stage='w3intro';const pe=T.pelageya;HEROES.forEach((h,i)=>{placeOnGround(h,-2.4+i*1.6,-14.6,0);h.face=Math.atan2(2.3-h.pos.x,-4.6-h.pos.z);});
    const nb=makeNotebook();nb.g.scale.setScalar(0.9);nb.g.position.set(pe.pos.x+0.1,0.95,pe.pos.z+0.3);
    play({dur:16.4,fov:46,shots:[shot(0,[pe.pos.x+2.2,1.5,pe.pos.z+1.8],[pe.pos.x,0.9,pe.pos.z]),shot(7.4,[5.8,2.4,-1.2],[2.3,1.8,-4.6]),shot(12,[0,2.4,-10],[0,9,-26])],
      says:[[0.3,3.2,null,'<i>Пелагея тетрадку раскрывает —</i><br><i>Уж не шёпотом, а тихо читает.</i>',true],[3.6,3.6,'pelageya','…Кот говорил: над облаками — сад,<br>Где темно, как ночью, стало, говорят.'],
        [7.6,3.6,null,'<i>Кот лапами машет, будто крылами, и в небо кажет,</i><br><i>Шепчет хрипло, еле-еле, — слово скажет.</i>',true],[11.2,1.6,'kot','<i>(шёпотом)</i> …перо…'],[12.8,2.6,'potap','Птица? Большая ли, скажи?'],[15,1.4,'zven','Жар-птица, жар-птица!']],
      events:[{t:7.6,fn:()=>{anim(3.2,k=>{kot.body.rotation.z=Math.sin(k*Math.PI*6)*0.25;kot.head.rotation.x=-0.4*Math.sin(k*Math.PI);});}}],
      tick:(t)=>{pe.body.position.y=t>3.6&&t<7.2?Math.abs(Math.sin(t*9))*0.03:0;},
      end:()=>{W.anims.length=0;W.group.remove(nb.g);kot.body.rotation.z=0;kot.head.rotation.x=0;pe.body.position.y=0;G.flags.w3intro=true;later(0.2,mapScene3);}});}
  function mapScene3(){const Zv=W.zven;F.stage='map';F.rushnik=true;map.visible=true;map.scale.z=0.01;anim(1.2,k=>{map.scale.z=Math.max(0.01,smooth(k));});
    icons.forEach(g=>{g.scale.y=1;});HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-16.2,0);h.face=Math.PI;});Zv.mode='script';Zv.vis=true;Zv.pos.set(0,3,-15);
    play({dur:11.4,fov:46,shots:[shot(0,[0,6.5,-12.5],[0,0,-18.5]),shot(4,[1.4,2.4,-15.6],[0,0.4,-18.5]),shot(7.8,[0,2,-14],[0,9,-24])],
      says:[[0.4,3.4,null,'<i>Лес да Китеж на рушнике цветные,</i><br><i>А рядом облака белеют расписные.</i>',true],[4,3,'zven','Третье — Небесное царство! Держите перья крепко!'],[7.6,3,null,'<i>Звенышко взлетает ввысь —</i><br><i>Четверых за ним по облачным ступеням понесло.</i>',true]],
      events:[{t:6.9,fn:()=>{const from=Zv.pos.clone(),to=new V3(0,0.5,-18.5);anim(1.1,k=>{Zv.pos.lerpVectors(from,to,k*k);});later(1.1,()=>{zvenRing();ringFx(to,0xffe0f0,3);burst(to,0xffffff,20,5);anim(1.4,k=>{Zv.pos.set(0,0.5+k*12,-18.5);});SFX.whoosh();});}},
        {t:8.1,fn:()=>{HEROES.forEach(h=>{const from=h.pos.clone(),to=new V3(0,0.3,-18.5);anim(1.6,k=>{const q=smooth(k);h.pos.lerpVectors(from,to,q);h.pos.y+=Math.sin(q*Math.PI)*1.2+q*2;h.g.scale.setScalar(Math.max(0.05,1-q*0.95));h.face+=0.25;});});
          for(let i=0;i<6;i++)later(i*0.2,()=>ringFx(new V3(0,0.3+i*0.5,-18.5),[0xffffff,COL.gold][i%2],1.5+i*0.4));}},{t:10,fn:()=>{$('flash').style.transition='opacity .6s';$('flash').style.opacity=1;}}],
      tick:(t)=>{if(t>=4&&t<6.9)Zv.pos.set(Math.sin(t*2)*0.8,2.2+Math.sin(t*3)*0.2,-17.2);},
      end:()=>{G.flags.map3=true;HEROES.forEach(h=>h.g.scale.setScalar(1));goLevel('3-1');setTimeout(()=>{$('flash').style.opacity=0;},700);}});}
  /* ---------- кузня перед Соловьём: Прошка куёт сам, Кузьма только держит заготовку ---------- */
  function forgeScene3(){F.forging=true;const pr=T.proshka;placeOnGround(pr,7.9,1.5,0);pr.face=Math.atan2(8.6-7.9,0.6-1.5);
    const strike=()=>{pr.atkT=0.28;later(0.15,()=>{SFX.hammer();tone(2400,0.5,'triangle',0.2);burst(new V3(8.6,1.0,0.6),0xffb040,12,4);blank.material.emissiveIntensity=1.4;});};
    play({dur:17,fov:46,shots:[shot(0,[6.2,2.4,4.2],[8.8,0.9,0.4]),shot(6.6,[9.4,1.8,2.6],[10.2,1.5,-0.6]),shot(10.4,[4.6,2.2,-0.6],[2.3,1.8,-4.8])],
      says:[[0.3,3.2,null,'<i>Прошка звенья сам куёт,</i><br><i>Кузьма заготовку лишь держит, не встаёт.</i>',true],[3.2,1,'proshka','Хэк!'],[4.3,1,'proshka','Хэк!'],[5.4,1,'proshka','Хэк!'],
        [6.8,3,'kuzma','<i>(хмыкает)</i> Руки есть. А голова? Поглядим сперва.'],[10.6,3,null,'<i>Кот звон послушал — и шепчет словами,</i><br><i>Хрипло, но внятно, между делами.</i>',true],[13.4,2.2,'kot','<i>(шёпотом)</i> …к Соловью ступайте…'],[15.7,1.3,null,'<i>Ворота к Соловью отворились.</i>',true]],
      events:[{t:3.2,fn:strike},{t:4.3,fn:strike},{t:5.4,fn:strike},{t:6.8,fn:()=>{anim(0.6,k=>{kuz.head.rotation.y=Math.sin(k*Math.PI)*0.4;});}},
        {t:15.7,fn:()=>{SFX.gate();SFX.ok();G.flags.forged3=true;banner('Отворились ворота 3-Б!','#ffd76a',2.6,'на рушнике-карте — Соловей-Разбойник, гляди!');}}],
      end:()=>{F.forging=false;kuz.head.rotation.y=0;G.flags.forged3=true;}});}
  /* ---------- Сказ 3 «Соловьиная песня»: Пелагея рассказывает вполголоса; Варя — начало, я — помощника ---------- */
  function festival3(){F.stage='fest';HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*2,-1.6,0);h.face=Math.PI;});snapCams();
    const pa=skazAcc(2);
    play({dur:pa?12:7.6,fov:48,shots:[shot(0,[0,3,5],[0,1.2,-3])].concat(pa?[shot(4.1,[-3.4,1.8,1.6],[SKAZ_HELPER_AT[0],1.1,SKAZ_HELPER_AT[1]])]:[]),says:[[0.4,3.6,null,'<i>Третий Сказ. Пелагея тетрадку раскрыла —</i><br><i>Вполголоса сказывать будет, набравшись силы.</i>',true]].concat(pa?[[4.1,4.2,'pelageya',SKAZ[3].pre+'Помнишь прошлую сказку? Про '+pa+'…']]:[],[[pa?8.5:4.1,3.2,'zven','Выбирайте: начало, помощник, конец!']]),end:()=>skaz3()});}
  function skaz3(){skazChoose(3,tell3);}
  function tell3(t){const pe=T.pelageya,pr=T.proshka;
    skazTell(3,t,{shot0:shot(0,[pe.pos.x+1.8,1.3,pe.pos.z+1.5],[pe.pos.x,0.9,pe.pos.z]),lastShot:T0=>shot(T0,[pr.pos.x-1.6,1.3,pr.pos.z+1.6],[pr.pos.x,0.9,pr.pos.z]),
      closers:[[0,4,null,'<i>Прошка рядом сидит — и впервые не скучает,</i><br><i>Не зевает, а сказку слушает, внимает.</i>',true]],tail:4.4,dropHelper:true,   // на пиру свои гости: Жар-птица, Соловей, Яга
      tick:(tt)=>{pe.body.position.y=tt>0.3&&tt<16?Math.abs(Math.sin(tt*7))*0.02:0;},
      end:()=>{pe.body.position.y=0;later(0.3,feast3);}});}
  /* ---------- мнимая победа: настоящий праздник, третий виток, Кот шепчет вслух ---------- */
  let fb3=null,sv3=null,st3=null,nb3=null;
  function feast3(){F.stage='feast';const po=T.potap;fb3=makeFirebird();fb3.bloom(1);fb3.g.position.set(-22,14,-24);sv3=makeSolovei();sv3.g.position.set(-14,0,-10);st3=makeStupa();st3.g.position.set(16,6,-12);
    play({dur:26,fov:48,camK:2.4,shots:[shot(0,[0,4,7],[0,4,-7]),shot(5.4,[3.8,2.4,-0.6],[0,4,-7]),shot(10.4,[4.4,3.6,-2],[1.7,3.8,-5.6]),shot(15.6,[-5,2.6,1],[-3,1.8,-3.4]),shot(20,[0,3.4,6.4],[0,2.4,-4])],
      says:[[0.3,3.6,null,'<i>На Лукоморье пир горой — веселье!</i>',true],[3.9,3.4,null,'<i>Кузьма цепь на дубе выше вздымает —</i><br><i>Наполовину готова, сияет.</i>',true],
        [7.6,2.6,null,'<i>Жар-птица с Соловьём прилетают,</i><br><i>Яга в ступе поближе подплывает.</i>',true],[10.6,3,null,'<i>Кот на середину ствола взобрался —</i><br><i>И вслух зашептал, хрипло, но словами отозвался:</i>',true],[13.6,2.4,'kot','В некотором царстве, в некотором государстве…'],
        [16,3.4,'potap','Как во славном… во граде… э-э… жил-был богатырь удалой…'],[19.6,1.6,'potap','…почти вспомнил, ей-ей!'],[21.4,2.4,null,'<i>Все смеются — звонко, от души.</i>',true]],
      events:[{t:0.3,fn:()=>{SFX.ok();for(let i=0;i<6;i++)later(i*0.5,()=>burst(new V3(rand(-6,6),3,rand(-6,2)),[0xff9ad0,0xfff08a,0x9ad0ff][i%3],10,3));}},
        {t:4,fn:()=>{const c=addCoil(Math.max(2,G.flags.coils||2),true);c.scale.setScalar(0.01);anim(1.4,k=>c.scale.setScalar(Math.max(0.01,smooth(k))));SFX.link();G.flags.coils=Math.max(3,G.flags.coils||0);}},
        {t:7.6,fn:()=>{const f0=fb3.g.position.clone();anim(3,k=>{fb3.g.position.lerpVectors(f0,new V3(-2.9,7.4,-6.4),smooth(k));fb3.g.position.y+=Math.sin(k*Math.PI)*2;fb3.wings.forEach(w=>{w.wp.rotation.z=w.s*Math.sin(k*30)*0.6;});});
          const s0=sv3.g.position.clone();anim(2.4,k=>{sv3.g.position.lerpVectors(s0,new V3(-4.6,0,-3.2),smooth(k));sv3.g.position.y=Math.abs(Math.sin(k*Math.PI*4))*0.4;});sv3.g.rotation.y=0.9;
          const y0=st3.g.position.clone();anim(2.8,k=>{st3.g.position.lerpVectors(y0,new V3(5.4,0.9,-8.6),smooth(k));});st3.g.rotation.y=-0.9;}},
        {t:10.6,fn:()=>{const from=kot.g.position.clone();anim(2,k=>{kot.g.position.set(lerp(from.x,1.7,k),lerp(from.y,3.1,k)+Math.sin(k*Math.PI)*0.3,lerp(from.z,-5.4,k));});kot.lids.forEach(l=>{l.rotation.x=-0.5;});}},
        {t:13.6,fn:()=>{kot.head.rotation.x=-0.3;lullaby([67,71,74,72],0.4,0,0.1);}},
        {t:16,fn:()=>{anim(3.4,k=>{po.body.rotation.z=Math.sin(k*Math.PI*3)*0.1;});}},
        {t:21.4,fn:()=>{HEROES.forEach(h=>{floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Ха-ха!','#ffe36b');anim(1.2,k=>{h.extraY=Math.abs(Math.sin(k*Math.PI*4))*0.2;});});bark(sv3,'solovei','Фью-ить!',1.2);}}],
      tick:(t)=>{if(t>10)fb3.wings.forEach(w=>{w.wp.rotation.z=w.s*0.25;});},
      end:()=>{HEROES.forEach(h=>{h.extraY=0;});po.body.rotation.z=0;later(0.2,koscheiScene);}});}
  /* ---------- «Сказок не будет»: Кощей рвёт цепь и забирает Звенышко ---------- */
