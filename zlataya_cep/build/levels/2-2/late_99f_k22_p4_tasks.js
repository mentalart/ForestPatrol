// ---- продолжение late_99f_k22.js (внутри build22, часть 4 из 4): задачи и подсказки, отладка — части склеиваются сборкой по имени файла ----
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>inZone(Z1,h(),0.3)&&Z1.state==='low'&&h().pos.z<-15,'прилив — через забор');
    prompt(pi,'item',()=>headOf(h()),()=>inZone(Z3,h(),0.3)&&Z3.state==='low'&&h().pos.y<1,'прилив, когда выдох');
    prompt(pi,'roll',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig==='red'&&e.help));
    prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.sig!=='red'&&e.help));
    prompt(pi,'attack',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&hd(e.pos,h().pos)<5&&(e.state==='broken'||e.open>0)));}
  prompt(0,'item',()=>headOf(active(0)),()=>!F.mast&&SLU2.held()&&inZone(ZL,active(0),0.3)&&ZL.state==='low'&&active(0).pos.x<0,'прилив — к мачте');
  prompt(0,'swap',()=>headOf(HERO.potap),()=>!SLU2.held()&&!F.mast&&HERO.proshka.active&&active(0).pos.z<-24&&active(0).pos.z>-50,'Потапа — на заслонку');
  prompt(0,'attack',()=>headOf(active(0)),()=>!F.mast&&active(0).pos.y>2.9&&hd(active(0).pos,{x:-6.5,z:-36})<1.6,'дёрни верёвку');
  prompt(0,'skill',()=>headOf(T.potap),()=>!F.jug&&T.potap.active&&hd(T.potap.pos,{x:-3.2,z:-43})<2.3&&ZL.level<0.3,'поднять кувшин');
  prompt(0,'swap',()=>headOf(T.potap),()=>!F.jug&&T.proshka.active&&hd(T.proshka.pos,{x:-3.2,z:-43})<3&&ZL.level<0.3,'Потап поднимет');
  prompt(1,'item',()=>headOf(active(1)),()=>!F.garden&&SLU2.held()&&inZone(ZR,active(1),0.3)&&ZR.state==='high'&&active(1).pos.x>0&&active(1).pos.z>-37,'отлив — к лазу');
  prompt(1,'swap',()=>headOf(T.yosha),()=>!F.garden&&T.pelageya.active&&T.pelageya.pos.z<-33&&T.pelageya.pos.z>-37.5&&T.pelageya.pos.x>0,'Йоша пролезет');
  prompt(1,'skill',()=>headOf(T.pelageya),()=>!F.pikeFree&&T.pelageya.active&&hd(T.pelageya.pos,{x:0,z:-89.6})<10&&T.pelageya.pos.y>4,'где щука?');
  prompt(0,'skill',()=>headOf(T.potap),()=>!F.pikeFree&&T.potap.active&&BUCK.some(b=>!b.tipped&&hd(b,T.potap.pos)<2.3),'поднять ведро');
  prompt(0,'swap',()=>headOf(T.potap),()=>!F.pikeFree&&T.proshka.active&&BUCK.some(b=>!b.tipped&&hd(b,T.proshka.pos)<3),'Потап поднимет');
  for(const pi of[0,1]){const h=()=>active(pi);prompt(pi,'item',()=>headOf(h()),()=>inZone(PZ,h(),1.2)&&PZ.state==='low'&&!F.pikeFree&&h().pos.y>4,'прилив — пруд наполнить');
    prompt(pi,'jump',()=>headOf(h()),()=>STV.state==='wait'&&h().groundRef!==STV.col&&hd(h().pos,STV)<4,'на печку!');
    prompt(pi,'guard',()=>headOf(h()),()=>!!STV.wave&&STV.wave.t<0&&h().groundRef===STV.col,'держись!');}
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'item',()=>headOf(h()),()=>FN.dive&&!FN.done&&lulShells.some(s=>!s.ref.off&&hd(s,h().pos)<2.2&&Math.abs(h().pos.y-8.5)<1.5),'колыбельная');
    prompt(pi,'attack',()=>headOf(h()),()=>HEROES.some(q=>q!==h()&&q.prilip&&hd(q.pos,h().pos)<2.6),'отлепи прилипалу!');
    prompt(pi,'roll',()=>headOf(h()),()=>!!h().prilip,'стряхни — два кувырка');}
  prompt(0,'skill',()=>headOf(T.potap),()=>!F.log&&T.potap.active&&hd(T.potap.pos,{x:5.4,z:32.6})<2.6,'повалить сосну');
  prompt(0,'swap',()=>headOf(T.potap),()=>!F.log&&!T.potap.active&&active(0).pos.z>26&&active(0).pos.z<36,'Потап повалит');
  prompt(0,'skill',()=>headOf(T.potap),()=>T.potap.active&&PALS.some(P=>!P.pulled&&hd(P.lp,T.potap.pos)<2.4),'выдернуть кол');
  prompt(1,'skill',()=>headOf(T.yosha),()=>T.yosha.active&&PALS.some(P=>P.pulled&&!P.healed&&Math.abs(P.lp.z-T.yosha.pos.z)<3.2),'живая вода — рана');
  prompt(0,'skill',()=>headOf(T.proshka),()=>T.proshka.active&&!BARN[2].gone&&hd(T.proshka.pos,BARN[2])<14&&T.proshka.pos.z<-238,'рогатка — жёлудь на губе');
  prompt(1,'skill',()=>headOf(T.pelageya),()=>T.pelageya.active&&!GR.done&&T.pelageya.pos.z<-304&&T.pelageya.pos.z>-356,'где грибы?');
  /* ---------- задачи ---------- */
  // кто ведёт задачу: в одиночку — тот, кем играешь (оставленные герои стоят позади, по ним задача не сдвинется), вдвоём — свой герой
  const at=pi=>G.solo?active(G.soloPi):active(pi);
  // задачи: одна карточка — одно действие, полный текст ≤ 20 слов (разбор мира 2, c09). Хоровод и дубрава — один участок, одна карточка (c28); счётчики — значками.
  const dots=(n,m)=>'<span style="letter-spacing:2px">'+'●'.repeat(Math.min(n,m))+'○'.repeat(Math.max(0,m-n))+'</span>';
  const g1=pi=>O(()=>'Двор за забором. Встань в воду, прилив '+K(pi,'item')+' — и плыви через забор.',
      ()=>at(pi).pos.z<-23.4,()=>[Z1.shell.g]);
  const tail=pi=>[O('Чудо-юдо Рыба-кит! На хвосте сыр-бор шумит.<br>Кит дышит: на вдохе гудит, на выдохе спину трясёт.',()=>at(pi).pos.z<38,()=>[]),
    // трещину можно и перепрыгнуть (Прошка, Пелагея) — задача закрывается, как только перебрался, сосна или нет
    O(()=>'Трещина в хвостовом плавнике! Потап повалит сосну '+K(0,'skill')+' — будет мостик.',()=>at(pi).pos.z<25,()=>F.log?[]:[fellP.g])];
  const fountain=pi=>O(()=>'Фонтан кита! Два пузыря лопнут — кит выдохнет.<br>Встань на дыру в спине, прилив '+K(pi,'item')+' — и до облаков!',()=>at(pi).pos.y>6.5||at(pi).pos.z<-72,()=>[bhr,bubs[0]]);
  const village=pi=>O(()=>pi?'Деревня: в каком ведре щука? Совиный взор '+K(1,'skill')+' — ведро засветится.<br>Пруд наполни приливом '+K(1,'item')+'.':
      'Деревня: в одном ведре щука — Пелагея покажет.<br>Пруд наполни приливом '+K(0,'item')+', Потап поднимет ведро '+K(0,'skill')+'.',
    ()=>!!F.pikeFree,()=>F.pikeFree?[]:BUCK.filter(b=>!b.tipped).map(b=>b.g).concat(PZ.state==='low'?[PZ.shell.g]:[]));
  const stoveO=pi=>O(()=>'Печка сама едет по хребту! Садитесь на неё оба '+K(pi,'jump')+'.<br>Раков бей '+K(pi,'attack')+', волна — щит '+K(pi,'guard')+'. Смыло — догоняй!',()=>F.stove==='done',()=>[stove.g]);
  const late=pi=>[
    O(()=>'Бока кита: прыгай с ребра на ребро, когда сойдутся.<br>Потап выдернет кол '+K(0,'skill')+', Йоша полечит рану '+K(1,'skill')+'.',
      ()=>at(pi).pos.z<-185,()=>PALS.filter(P=>!P.healed).map(P=>P.pulled?P.mist:P.stake)),
    O(()=>'Губа кита: плуги увязли в желудях — сбей их '+K(pi,'attack')+'.<br>Верхний жёлудь — рогаткой Прошки. Кит зевает — держись у плуга!',
      ()=>!!F.plough&&at(pi).pos.z<-262,()=>BARN.filter(b=>!b.gone).map(b=>b.g)),
    O(()=>!F.dance?'Между глаз хоровод: встань на камушек своего цвета, как загорится.<br>Потом — дубрава с грибами.'
        :'Дубрава: грибы видны Совиным взором '+K(1,'skill')+'. Собери боровики '+dots(GR.got,GR.need)+'<br>Мухомор не трогай — прилипала!',
      ()=>!!F.grove,()=>!F.dance?DC.stones.map(S=>S.g):MUSH.filter(m=>!m.got&&m.real&&m.seen>0).map(m=>m.g).concat(girls[0].g)),
    O(()=>LS.stage<=1?'Кит ныряет! Волна дошла до круга у ракушек — играйте '+K(pi,'item')+' обе разом.<br>Колыбельная: '+dots(LS.lines,3)
        :LS.stage===2?'Сонные звёздочки видны Совиным взором '+K(1,'skill')+'.<br>Лови их прыжком '+K(pi,'jump')+': '+dots(LS.got,4)
        :'Последний куплет — в четыре голоса! Сыграй '+K(pi,'item')+' и смени героя '+K(pi,'swap')+'.<br>Оставленный держит напев.',
      ()=>FN.done,()=>LS.stage===2?STARS.filter(S=>!S.got&&S.seen>0).map(S=>S.g):lulShells.filter(S=>!S.ref.off).map(S=>S.g)),
    O('Звено — на облаке! Бери — и в путь.',()=>false,()=>[endLink.g])];
  W.objectives[0]=tail(0).concat([g1(0),
    O(()=>'Мачта: поставь Потапа на заслонку '+K(0,'swap')+'.<br>Прилив '+K(0,'item')+' — доплыви до гнезда, дёрни верёвку '+K(0,'attack')+'.',()=>F.mast,()=>SLU2.held()?[flag]:[SLU2.g],()=>({kind:active(0).kind,action:'walk',from:new V3(-4,3.0,-33),to:new V3(-6.2,3.3,-35.6)})),
    O(()=>'Кувшин на дне — в отлив: Потап поднимет '+K(0,'skill')+'.<br>Ворота откроются, как друг пролезет в лаз.',()=>G2.open,()=>[jug,g2]),
    fountain(0),village(0),stoveO(0)],late(0));
  W.objectives[1]=tail(1).concat([g1(1),
    O(()=>'Огород: ждём Потапа на заслонке.<br>Отлив '+K(1,'item')+' у тебя — у друга прилив. Йоша — в лаз у земли.',()=>F.garden,()=>[plateG.g],()=>({kind:'yosha',action:'walk',from:new V3(5.5,0,-35),to:new V3(5.5,0,-40)})),
    O(()=>'Прилив '+K(1,'item')+' — орешек из бочки всплывёт.<br>Ворота откроются, как друг дёрнет верёвку на мачте.',()=>G2.open,()=>[barrel,g2]),
    fountain(1),village(1),stoveO(1)],late(1));
  W.tipZones.push({cond:(pi,h)=>h.grounded&&h.groundRef&&h.groundRef.water,text:pi=>'Ты плывёшь. Гусли '+K(pi,'item')+' меняют воду там, где стоишь.'},
    {cond:(pi,h)=>h.pos.y>6&&h.pos.z>-74&&h.pos.z<-50,text:pi=>'Облака! С облака на облако прыгай — и к киту на горб!'},
    {cond:(pi,h)=>STV.state==='wait'&&h.groundRef!==STV.col&&hd(h.pos,STV)<6,text:pi=>'Печка ждёт! Запрыгни на неё '+K(pi,'jump')+' — поедем, как только оба сядете.'},
    {cond:(pi,h)=>STV.state==='ride'&&h.groundRef!==STV.col&&h.pos.z<-100&&h.pos.z>-140,text:pi=>'Смыло с печки? Догоняй и запрыгивай '+K(pi,'jump')+'! А раки на дороге — бей '+K(pi,'attack')+'.'},
    {cond:(pi,h)=>h.pos.z<-146&&h.pos.z>-186&&h.pos.y<4.2,text:pi=>'Свалился в складку кожи меж рёбер — не беда: выпрыгни '+K(pi,'jump')+' на ребро, когда подойдёт.'},
    {cond:(pi,h)=>!!h.prilip,text:pi=>'Прилипала на спине! Пусть друг собьёт её ударом — или два кувырка '+K(pi,'roll')+' подряд.'});
  W.spawns=[[new V3(-3,0,41),new V3(-5,0,42)],[new V3(3,0,41),new V3(5,0,42)]];W.startAct=[0,0];
  W.pauseLine='Рыба-кит дышит: вдох гудит, выдох трясёт спину. В огороде — перелив: Потап держит заслонку, прилив у одного — отлив у другого.<br>Хвост — сыр-бор; фонтан на выдохе до облаков; щука в ведре и печка Емели; частокол в боку — Потап тянет, Йоша лечит;<br>губа — кит зевает, держись у Потапа; между глаз — хоровод; в дубраве — грибы Совиным взором; на макушке — колыбельная в три куплета: в лад с волной, сонные звёздочки, четыре голоса.';
  W.onStart=()=>{later(0.6,kitIntro);};
  // для ботов: перенос к участку и состояние
  W.dbg22=()=>({whale,sea,F,PZ,BUCK,PIKE_AT,STV,PL,stove,Z3,endLink,pathAt,WB,SEA,RIB,RB,PALS,BARN,plows,YW,DC,MUSH,GR,LUL,lulShells,FN,headEye,flankEye,fellP,LS,STARS,lullStage,lulRing});
  W.warp22=(where)=>{const order=['tail','yard','village','ride','ribs','lip','eyes','grove','head','crown'],after=w=>order.indexOf(where)>order.indexOf(w);
    if(after('tail')){F.log=true;logCol.on=true;fellP.cyl.on=false;fellP.g.position.set(0,0.15,30.4);fellP.g.rotation.x=-Math.PI/2;}
    if(after('yard')){F.mast=true;F.garden=true;G2.open=true;g2col.on=false;}
    const P={tail:[0,0,40],yard:[0,0,10],village:[0,4.5,-75],ride:[0,4.5,-97],ribs:[0,4.5,-142],lip:[0,4.5,-208],eyes:[0,4.5,-268],grove:[0,4.5,-306],head:[0,4.5,-358],crown:[0,8.5,-413]}[where];
    if(after('village')){F.pikeFree=true;BUCK.forEach(b=>{b.tipped=true;});STV.state='wait';const p=pathAt(0);stovePlace(p[0],p[1],p[2]);}
    if(after('ride')){STV.state='done';F.stove='done';STV.s=PL;const p=pathAt(PL);stovePlace(p[0],p[1],p[2]);STV.crabs=[];}
    if(after('ribs')){PALS.forEach(Pq=>{Pq.pulled=true;Pq.healed=true;Pq.col.on=false;Pq.g.visible=false;Pq.stake.visible=false;Pq.mist.visible=false;});RB.healed=3;RB.A=1.1*0.34;WB.calm=0.55;F.eyeSeen=true;flankEye.set(0.85);}
    if(after('lip')){BARN.forEach(b=>{b.gone=true;b.g.visible=false;if(b.mk)b.mk.visible=false;});F.plough=true;fenceCol.on=false;fence.position.y=-2.2;}
    if(after('eyes')){DC.done=true;F.dance=true;foreCol.on=false;fore.position.y=-2.2;}
    if(after('grove')){GR.done=true;F.grove=true;GR.got=5;curtCol.on=false;curtain.position.y=7;}
    if(where==='crown'){FN.dive=true;}
    HEROES.forEach((h,i)=>{placeOnGround(h,P[0]+(i%2?1.2:-1.2)*(i>1?2:1),P[2]+(i>1?0.8:0),P[1]);h.following=false;});for(const pi of[0,1])players[pi].cp.set(P[0],P[1],P[2]);snapCams();return W.dbg22();};
  flushDecor();};
