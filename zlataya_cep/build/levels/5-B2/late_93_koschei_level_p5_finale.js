// ---- продолжение late_93_koschei_level.js (внутри build5B2, часть 5 из 5): последний сказ, цепь, кнопки, отладка — части склеиваются сборкой по имени файла ----
  const ENDS=['И ушёл он — и был таков','И простили его — и прощенья он просил','И позвали его слушать — сел он в круг'],ENDK=['ushel','proshen','slushat'];
  function skaz3(){F.stage='skaz3';skazClouds({who:2,title:'Сказ про мальчишку · конец',sub:'Чем кончится сказка — решать вам. Все три конца добрые и настоящие: каким выберете, таким Кощей в сказке и останется.<br>Выбирайте вместе; выберете разное — Пелагея расскажет оба.',opts:ENDS.map((t,i)=>skOpt(t,ENDD[i]))},arr=>{F.skaz=3;F.ends=arr;
      G.flags.ending=arr.map(i=>ENDK[i]);G.flags.skaz5=[F.sk1,F.sk2,arr.map(i=>ENDS[i]).join(' — а иные сказывают: ')];
      if(arr.length>1){say('pelageya','А иные сказывают по-иному — что ж, пускай:<br>Две правды в сказке уживутся, так и знай!',7.2,true);later(7.4,chainScene);}else chainScene();});}
  function chainScene(){F.stage='chain';k5StormSet(0,true);const pe=T.pelageya,yo=T.yosha,pr=T.proshka,po=T.potap;HEROES.forEach((h,i)=>{placeOnGround(h,-3+i*1.8,-15.5,0);faceTo(h,KP.x,KP.z);});
    const KS0=new V3(-0.6,0,-19.4);KS.g.position.copy(KS0);KS.g.rotation.y=0.15;
    const keys=new THREE.Group();keys.position.set(-0.3,1.9,-19);W.group.add(keys);for(let i=0;i<5;i++){const k=blackKey(1.4);k.position.x=(i-2)*0.08;keys.add(k);}
    const thread=new THREE.Mesh(new THREE.CylinderGeometry(0.02,0.02,0.8,4),MB(COL.gold));thread.visible=false;W.group.add(thread);const ya=yagaM?yagaM.g.position.clone():new V3(-10,0,-14);const E=F.ends[0];
    const KT=kot.g.position.clone(),toKot=Math.atan2(KT.x-KS0.x,KT.z-KS0.z),toPe=Math.atan2(pe.pos.x-KS0.x,pe.pos.z-KS0.z),toYa=Math.atan2(ya.x-KS0.x,ya.z-KS0.z);
    const KH=new V3(KS0.x,4.15,KS0.z),kotH=KT.clone().add(new V3(0,1.35,0)),kotF=kot.g.rotation.y,kotToKs=Math.atan2(KS0.x-KT.x,KS0.z-KT.z),kotToPe=Math.atan2(pe.pos.x-KT.x,pe.pos.z-KT.z);
    const FyaK=k5Face(KH,toYa,0.35,3.4,-0.45),FKot=k5Face(kotH,kotToKs,0.35,2.4,0.05),FKs=k5Face(KH,toKot,-0.35,3.2,-0.45),FKotP=k5Face(kotH,kotToPe,-0.3,2.4,0.05),FKsP=k5Face(KH,toPe,0.3,3.2,-0.45);
    const dY=new V3(KS0.x-ya.x,0,KS0.z-ya.z).normalize(),pY=new V3(-dY.z,0,dY.x),YA1=ya.clone().addScaledVector(dY,-2.6).addScaledVector(pY,1.1),YA2=ya.clone().addScaledVector(dY,-2.0).addScaledVector(pY,0.9),YL=ya.clone().addScaledVector(dY,6);
    const TW=k5Two(new V3(KS0.x,2.4,KS0.z),new V3(KT.x,1.2,KT.z),Math.atan2(-0.906,0.42),7,1.0,0.6),FKsP2=k5Face(KH,toPe,0.3,3.9,-0.3);
    const FPe=k5Face(hH(pe),Math.atan2(KS0.x-pe.pos.x,KS0.z-pe.pos.z),0.35,1.9,0.08),FYo=k5Face(hH(yo),Math.atan2(KS0.x-yo.pos.x,KS0.z-yo.pos.z),-0.3,1.6,0.05);
    const tail=E===0?[[51.6,4.6,null,'<i>И ушёл он — и был таков: Кощей по воде уходит, не оглянувшись,</i><br><i>А на ветке дуба перстень его остался, блеснувши.</i>',true]]
      :E===1?[[51.6,4.6,null,'<i>И простили его — и прощенья он просил: пред Котом на колено встал, перстень отдал</i><br><i>И на дальний берег жить ушёл — там свой дом и сыскал.</i>',true]]
      :[[51.6,4.6,null,'<i>И позвали его слушать: Кощей у дуба остался, с перстнем на руке,</i><br><i>Рядом с Котом сидит — у корней, в тишине.</i>',true]];
    const endLook=E===0?[-8,2,-34]:E===1?[KT.x,1.4,KT.z]:[OAK.x+2.2,2,OAK.z+3.4];
    play({dur:57.6,fov:44,camK:2,k5:{calm:true,mood:[WARM,0.12],cues:[[10.2,()=>CINE.rimPulse(0.8)],[14.0,emAll('droop',0.12)],[22.6,()=>CINE.mood(STORY,0.14)],[26.2,()=>CINE.dollyZoom(0.07,1.2,1.0)],
        [29.4,()=>{CINE.slowmo(0.5,0.6);CINE.rimPulse(1);CINE.mood(GOLD,0.16);}],[32.4,()=>{CINE.punch(-4);FX.confettiCam(50);}],[32.6,emAll('cheer',0.08)],[39.6,()=>{CINE.hitstop(3);CINE.punch(-5);CINE.mood(GOLD,0.22);}],[45.6,()=>CINE.mood(WARM,0.16)]]},
      shots:[MV(0,[5.2,3.4,-11.4],[-0.6,2.2,-19.4],[4.4,3.0,-12.4],[-0.6,2.4,-19.4],4.6,{ease:'inOutSine',fov:46,move:'none'}),
        MV(4.6,[YA1.x,2.0,YA1.z],[YL.x,1.6,YL.z],[YA2.x,1.9,YA2.z],[YL.x,1.5,YL.z],2.0,{ease:'inOutSine',fov:44,move:'none'}),
        SH(6.6,FyaK.p,FyaK.l,{fov:40,move:'push',amp:0.8}),
        MV(10.4,TW.p,TW.l,[TW.p[0]+0.5,TW.p[1]-0.2,TW.p[2]-0.6],TW.l,3.8,{lf:()=>thread.visible?thread.position.clone().lerp(new V3(TW.l[0],TW.l[1],TW.l[2]),0.6):new V3(TW.l[0],TW.l[1],TW.l[2]),lk:4,ease:'inOutSine',fov:44,move:'none'}),
        SH(14.2,FKot.p,FKot.l,{fov:40,move:'push',amp:1}),
        SH(20.4,FKs.p,FKs.l,{fov:40,move:'push',amp:0.8}),
        SH(23.4,FKotP.p,FKotP.l,{fov:40,move:'orbit',amp:0.8}),
        SH(26.0,FKsP2.p,FKsP2.l,{fov:40,move:'push',amp:0.7}),
        SH(29.0,FPe.p,FPe.l,{fov:40,move:'push',amp:1.2}),
        SH(31.6,FYo.p,FYo.l,{fov:40,move:'push',amp:1.4}),
        SH(35.4,FKsP.p,FKsP.l,{fov:36,move:'push',amp:0.9}),
        MV(38.6,[0,4,-12],[0,4,-28],[1.6,6.5,-13.2],[0,6,-28],6.0,{ease:'inOutSine',fov:46,move:'none',tr:'soft'}),
        MV(45.4,[8,8,-14],[0,6,-28],[3,9.5,-11],[0,7,-28],5.6,{pts:[[6,9,-12]],ease:'inOutSine',fov:50,move:'none'}),
        MV(51.4,[6,4,-10],endLook,[7.5,5.5,-8],endLook,6.0,{ease:'inOutSine',fov:46,move:'none'})],
      says:[[0.3,4,null,'<i>Каков ни будь конец — а прежде вот что было:</i><br><i>Кощей вернул, что взял, и всё, что прежде скрыл он.</i>',true],[4.6,2.2,null,'<i>Яге отдаёт он связку чёрных ключей — до одного.</i>',true],[6.8,3.6,'koschei','Возьми ключи. Гусей твоих не трону я, Яга, —<br>Ни гуся, ни ворона не приманю — никогда.'],
        [10.6,3.8,null,'<i>Из кармана золотую ниточку достаёт — Коту возвращает.</i><br><i>Кот первый вдох делает — и говорит: хрипло, а словами отвечает.</i>',true],
        [14.4,6.0,'kot','Прости меня. Я всегда сказывал, что ты проиграл, —<br>Так было проще. Прости, что не переписал.'],[20.6,2.8,'koschei','Так перепиши! Скажи по-доброму, по-иному!'],[23.6,2.4,'kot','<i>(качает головой, показывает лапой на Пелагею)</i> Не я. Она уж рассказала — по-другому.'],
        [26.2,2.6,'koschei','Пелагея. Пелагея…'],[29.0,2.2,null,'<i>Над портретом Пелагеи имя её загорается — последнее из забытых.</i>',true],[31.8,3.6,'yosha','Мы вспомнили! Все имена — до одного,<br>И не забудем больше никого!'],[35.6,3.0,'koschei','<i>(тише)</i> Пелагея… Расскажи ещё, прошу, —<br>Я каждое словечко сберегу.'],
        [38.8,4.2,null,'<i>Застёжку Прошка в цепь вставляет — и цепь смыкается, звеня,</i><br><i>И дуб зелёным стал — листвой шумит, весь в свете дня.</i>',true],[45.6,5.4,null,'<i>Кот Учёный по ней кругом идёт — направо песнь заводит,</i><br><i>Налево сказку говорит. И первая сказка у него — наша, выходит.</i>',true]].concat(tail),
      events:[{t:0.2,fn:()=>KA.pose('slump',{k:60,c:11})},{t:4.4,fn:()=>{kTurn(toYa,0.6);KA.pose('offer',{antic:0.2});}},
        {t:4.7,fn:()=>{const f=keys.position.clone();anim(1.6,k=>{keys.position.lerpVectors(f,ya.clone().add(new V3(0.4,1.2,0.4)),CE.inOutSine(k));keys.position.y+=Math.sin(k*Math.PI)*1.5;keys.rotation.y+=0.2;});SFX.keys();later(1.7,()=>{FX.sparkle(ya.clone().add(new V3(0.4,1.4,0.4)),10,0xffe08a);if(yagaM){const n=ACT.npcs.find(q=>q.o===yagaM);if(n)n.em={type:'nod',t:0,d:0.7};}});}},
        {t:6.7,fn:pose('slump')},{t:10.2,fn:()=>{kTurn(toKot,0.6);KA.pose('offer',{antic:0.2});}},
        {t:10.6,fn:()=>{thread.visible=true;k5s('magic');const f=KS.hand.getWorldPosition(new V3()),to=kotH.clone();anim(1.8,k=>{thread.position.lerpVectors(f,to,CE.inOutSine(k));thread.position.y+=Math.sin(k*Math.PI)*0.6;thread.rotation.z+=0.1;});
          k5Trail(()=>thread.visible?thread.position.clone():null,0xffd060,{size:0.3,life:0.35,every:0.03,max:24});
          later(1.9,()=>{thread.visible=false;burst(to,COL.gold,16,2);k5Flash(to,0xffd060,2.4,0.5);SFX.dzin();kot.lids.forEach(l=>{l.rotation.x=-0.5;});G.flags.kotVoice=true;const n=ACT.npcs.find(q=>q.o===kot);if(n)n.em={type:'surprise',t:0,d:0.8};});}},
        {t:12.6,fn:pose('listen',{k:60,c:11})},{t:14.2,fn:()=>{kot.head.rotation.x=0.2;}},{t:20.4,fn:pose('help',{antic:0.15})},
        {t:23.4,fn:()=>{kot.g.rotation.y=kotToPe;const n=ACT.npcs.find(q=>q.o===kot);if(n)n.em={type:'nod',t:0,d:0.8};}},
        {t:26.0,fn:()=>{kTurn(toPe,0.6);KA.pose('listen');}},{t:28.8,fn:()=>{G.flags.names.pelageya=true;k5s('name');banner('Имя вернулось: Пелагея','#d7a6ec',2.6);nameBurst(pe,0xd7a6ec);ACT.emote(pe,'pride');}},
        {t:31.8,fn:()=>{anim(0.6,k=>{yo.pos.y=Math.sin(k*Math.PI)*1.2;});ACT.emote(yo,'joy');G.flags.nameless=false;}},{t:35.4,fn:()=>{KA.pose('slump',{k:50,c:10});KA.set('hRz',0.15);}},
        {t:39.0,fn:()=>{const f=ndl.g.position.clone(),to=OAK.clone().add(new V3(0,1+coilLinks.length*0.16,3.2));anim(1.4,k=>{ndl.g.position.lerpVectors(f,to,CE.inOutSine(k));});k5Trail(()=>ndl.g.parent?ndl.g.position.clone():null,0xffe08a,{size:0.4,life:0.4,every:0.03,max:30});
          later(1.5,()=>{SFX.link();SFX.horn();k5s('chainClose');for(let i=0;i<8;i++)addCoilLink();burst(to,COL.gold,30,5);ringFx(OAK.clone().add(new V3(0,2,0)),COL.gold,5);k5Flash(to,0xffe08a,6,0.7);k5Ring(OAK.clone().add(new V3(0,0.1,0)),0xffd060,1,12,1.2,0.08);k5Pillar(OAK.clone(),0xffd060,22,3.4,2.0);
            leaves.forEach((l,i)=>later(i*0.08,()=>{l.visible=true;anim(0.8,k=>l.scale.setScalar(Math.max(0.01,CE.outBack(k))));}));trunk.material.color.setHex(0x7a5a3e);later(0.3,()=>{FX.leaves(OAK.clone().add(new V3(0,6,2)),20);k5s('leaves');});});}},
        {t:45.8,fn:()=>{anim(5,k=>{const a=k*Math.PI*2;kot.g.position.set(OAK.x+Math.sin(a)*3.4,1.2+k*3,OAK.z+Math.cos(a)*3.4);kot.g.rotation.y=a+Math.PI/2;});lullaby([67,71,74,72,71,69,67],0.42,0,0.12);}},
        {t:51.6,fn:()=>{KA.pose('idle',{k:60,c:11});if(E===0){const f=KS.g.position.clone();KS.g.rotation.y=Math.PI;anim(5.6,k=>{KS.g.position.lerpVectors(f,new V3(-10,-0.3,-40),k);});addMesh(new THREE.TorusGeometry(0.1,0.03,6,12),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.8}),OAK.x+2.4,7.2,OAK.z+1);}
          else if(E===1){KS.g.position.set(KT.x+1,0,KT.z+1.4);KS.g.rotation.y=Math.atan2(-1,-1.4);KA.pose('kneel',{k:60,c:11});}
          else{KS.g.position.set(OAK.x+2.2,0,OAK.z+3.4);KS.g.rotation.y=Math.PI*0.8;KA.pose('sit',{k:60,c:11});}}}],
      tick:(t)=>{if(t>14.2&&t<23.4)kot.head.rotation.x=0.2+Math.sin(t*6)*0.05;},
      end:()=>{W.anims.length=0;KA.reset();bb.style.display='none';G.flags.names={potap:true,yosha:true,proshka:true,pelageya:true};G.flags.nameless=false;G.flags.kotVoice=true;G.flags.w5done=true;G.flags.coils=5;
        G.done['5-B2']=true;G.hub=true;banner('Златая цепь скована!','#ffd76a',3,'звено руками Прошки сковано и словом Пелагеи держится');later(2.6,()=>goLevel('epi'));}});}
  /* ---------- логика кадра ---------- */
  function freeze(){const frozen=G.cine||!K5.fight;for(const e of W.enemies){if(!e.k5||e===KB&&!K5.live)continue;if(frozen){e.cd=Math.max(e.cd,1.2);if(e.state==='ready'||e.state==='wind'){e.state='idle';e.t=0;e.tgt=null;}}}}
  W.updates.push(dt=>{freeze();k5fxTick(dt);stormTick(dt);flyFx(dt);rainTick(dt);windTick(dt);handsTick(dt);
    if(G.cine)for(const c of candles)if(!c.lit&&c.embersM)c.embersM.forEach(m=>{m.m.visible=false;});   // в роликах над погасшими свечами — без пустых угольков
    if(K5.live){KS.g.position.copy(KB.pos);KS.g.rotation.y=KB.face;}else KB.pos.copy(KS.g.position);
    aura.position.copy(KS.g.position).add(new V3(0,2.6,0));aura.intensity=K5.st>=2&&K5.st<=5?0.9+0.3*Math.sin(G.time*3):K5.st===1?0.5:0;kosAnim(dt);KA.tick(dt*CINE.timeScale());if(!G.cine&&KA.on)KA.reset();
    if(G.cine)return;if(!K5.fight){if(Math.floor(G.time*4)!==K5.bt){K5.bt=Math.floor(G.time*4);if(K5.st)setBar();}return;}
    if(K5.st===1)stage1Tick(dt);locksTick(dt);sparkTick(dt);orbTick(dt);bossTick(dt);
    try{k5HintTick(dt);}catch(e){console.error('k5 hint',e);}
    if(HEROES.length&&HEROES.every(k5Down)){banner('Все четверо — клубочки!','#ffc8d8',2.6,'сказ сбился — снова у колокольчика');stageLose();}
    if(Math.floor(G.time*4)!==K5.bt){K5.bt=Math.floor(G.time*4);setBar();}});
  // щит: отбив шара, кольцо цепей; удар: замок, наковальня; предмет: передать иглу
  W.onGuardTap=(pi,h)=>{for(const o of K5.orbs)if(o.tgt===h&&o.st!=='up'&&o.left===null)o.left=o.eta;};
  W.onAttack=(pi,h)=>{if(!K5.fight)return;if(k5Locked(h)){floatText(h.pos.clone().add(new V3(0,h.d.height+0.8,0)),'скован! смени героя','#c8a8ff');return;}
    for(const k in K5.locks){const L=K5.locks[k];if(L&&L.h!==h&&hd(L.h.pos,h.pos)<2.4)lockHitBy(L,h);}
    if(K5.st===5)forgeHit(h);};
  W.itemSign=pi=>K5.fight&&K5.st===5?(K5.needle&&K5.needle.holder===active(pi)?p=>needlePass(p):()=>{}):null;
  // кнопки над героями
  for(const pi of[0,1]){prompt(pi,'attack',()=>kosTop(),()=>K5.fight&&K5.live&&KB.state==='broken'&&K5.st!==5&&hd(active(pi).pos,KB.pos)<5,'золотая нить');
    prompt(pi,'attack',()=>{const L=nearLock(pi);return L?L.pad.getWorldPosition(new V3()).add(new V3(0,0.95,0)):new V3();},()=>K5.fight&&!!nearLock(pi)&&(!G.solo||pi===G.soloPi),'бей по замку');
    prompt(pi,'swap',()=>headOf(active(pi)),()=>K5.fight&&k5Locked(active(pi))&&(!G.solo||pi===G.soloPi),'смени героя');
    prompt(pi,'item',()=>headOf(active(pi)),()=>K5.fight&&K5.st===5&&K5.needle&&K5.needle.holder===active(pi)&&!forging()&&!G.solo,'передать иглу');}
  prompt(0,'attack',()=>ANV.clone().add(new V3(0,2.2,0)),()=>K5.fight&&K5.st===5&&forging(),'в такт');
  const objText=pi=>{const st=K5.st;if(!st)return 'Финал…';if(!K5.fight)return 'Этап '+st+' · '+K5N[st];
    if(st===1)return 'Этап 1 · Погасите все восемь свечей: синюю каплю отбей щитом '+K(pi,'guard')+' в последний миг обратно в свечу, Йоша — водой '+K(1,'skill')+', или пять ударов '+K(pi,'attack');
    if(st===2)return 'Этап 2 · Отбивайте удары Кощея '+K(pi,'guard')+' в последний миг — искорка летит к другу. Ключ — отбей щитом. Друга сковали — пять ударов по замку '+K(pi,'attack')+'; сковали тебя — смени героя '+K(pi,'swap')+'. Ветер — щит, трещина — уходи';
    if(st===3)return 'Этап 3 · Тёмный шар отбей '+K(pi,'guard')+' в последний миг — к другу; друг отбивает в небо. Ворон — кувырок '+K(pi,'roll');
    if(st===4)return 'Этап 4 · Око над тобой — держи щит '+K(pi,'guard')+'. Око над другом — заходи Кощею за спину и бей '+K(pi,'attack')+'. Волна — прыжок '+K(pi,'jump');
    return 'Этап 5 · Застёжку куёт Прошка у наковальни — в такт '+K(0,'attack')+'. Передать иглу — '+K(pi,'item')+(RG.on?'. Цепи у наковальни — разбейте все три, против ветра — щит '+K(pi,'guard'):'');};
  const objTg=pi=>{const st=K5.st;if(st===1)return candles.filter(c=>c.lit).map(c=>c.g);if(st===5)return [anvil];return K5.live?[KS.g]:[];};
  for(const pi of[0,1])W.objectives[pi]=[O(()=>objText(pi),()=>F.stage==='chain',()=>objTg(pi))];
  W.spawns=[[new V3(-3,0,4),new V3(-1,0,4)],[new V3(1,0,4),new V3(3,0,4)]];W.startAct=[0,0];
  W.pauseLine='Кощея силой не сломить —<br>С него бы спесь сначала сбить,<br>Связать бы нитью золотой<br>И досказать конец другой! Пять этапов; подсказки — на экране. Рассыпался клубком — «Смена»: второй герой цел. Этап заново, только если клубками стали все четверо.';
  // для ботов и отладки
  Object.assign(K5,{KB,KS,candles,C,ANV,RG,stageStart,stageWin,stageLose,orbThrow,keyMake,lockHero,unlock,k5Locked,nearLock,LOCK_HP,chainDemo,ravenMake,needlePass,leap,ringStart,sparkTo,setBar,forging,sword,dome});
  W.onStart=()=>{FIN.k5e.start();};

