// ---- продолжение late_99e_k21.js (внутри build21, часть 4 из 4): палаты Морского царя: пляска, жемчуг, финал, задачи — части склеиваются сборкой по имени файла ----
  // ---------- палаты Морского царя: пляска в два голоса ----------
  function spawnRing(side){const geo=new THREE.CylinderGeometry(1,1,0.9,64,1,true,side>0?0:side<0?Math.PI:0,side?Math.PI:Math.PI*2);
    const m=new THREE.Mesh(geo,MB(0xe8fbff,{transparent:true,opacity:0.75,side:THREE.DoubleSide,depthWrite:false}));m.position.set(0,0.45,TZ);m.renderOrder=6;m.userData.noBatch=true;W.group.add(m);
    const R=2.4;m.scale.set(R,1,R);WAV.push({m,R,side,sp:[6,6.6,7.2][KD.round]});SFX.wave();for(let i=0;i<4;i++)burst(new V3(rand(-2,2),2.2,TZ+rand(-1,2)),[0xffd23a,0x5ab8ff,0xff7ab0,0x6ad86a][i],2,2,0.5);}
  function spawnPearl(){const a=rand(-1.2,1.2),r=rand(3.2,8.5),to=new V3(Math.sin(a)*r,0.35,TZ+Math.cos(a)*r),from=new V3(0,4.4,TZ);
    const m=new THREE.Mesh(new THREE.SphereGeometry(0.2,12,10),M(0xfff8f0,{emissive:0xd0c8ff,emissiveIntensity:0.8}));m.position.copy(from);m.userData.noBatch=true;W.group.add(m);PRL.push({m,from,to,t:0});tone(1200,0.12,'sine',0.08,1600);}
  function danceTick(dt){for(const q of SEATREF)q.hum=Math.max(0,q.hum-dt);
    const both=SEATREF[0].hum>0&&SEATREF[1].hum>0,one=!both&&(SEATREF[0].hum>0||SEATREF[1].hum>0);
    if(!F.kingMet&&!G.cine&&[0,1].some(pi=>active(pi).pos.z<K0-1&&active(pi).pos.z>K0-14)){F.kingMet=true;kingScene();}
    const live=F.kingMet&&!F.kingDone&&!G.cine;KD.on=live&&both;F.kingDance=KD.on;
    if(live&&one){KD.lonely-=dt;if(KD.lonely<=0){KD.lonely=4.5;floatText(new V3(0,6.2,TZ),'В два голоса! Один — скукота!','#9fe6ff');
      if(!F.duoTold){F.duoTold=true;bark(king,'king','В два голоса, гусляры! Один — скукота!',2.6);for(const p of[0,1])tip(p,'Играйте оба стула. Один — смени героя '+K(p,'swap')+'.',4.4);}}}
    if(KD.on)KD.meter=Math.min(1,KD.meter+dt/22);else if(live)KD.meter=Math.max(KD.round/3,KD.meter-dt/90);
    const r=KD.meter>=2/3?2:KD.meter>=1/3?1:0;
    if(r>KD.round){KD.round=r;if(r===1){banner('Колено второе — вприсядку!','#9fe6ff',2.4,'волны то слева, то справа · жемчужинки с венца ловите — пляска пойдёт шибче');bark(king,'king','Вприсядку! Эх, раздайся, море!',2.2);}
      else{banner('Колено третье — шибче, шибче!','#9fe6ff',2.4,'волны по две подряд — прыгай дважды');bark(king,'king','Шибче, гусляры, шибче!',2.2);}}
    PLS.forEach((q,i)=>{const on=KD.meter>=(i+1)/PLS.length-1e-6;q.mat.emissiveIntensity=damp(q.mat.emissiveIntensity,on?1.2:0.08,6,dt);q.g.rotation.z=on&&KD.on?Math.sin(G.time*8+i)*0.18:0;q.g.scale.setScalar(on?1.15:0.9);});
    king.dance(KD.on||(live&&one),dt,KD.on?1+0.3*KD.round:0.45);
    // рыбий хор и лучи
    const sp=KD.on?1+0.4*KD.round:0.25;for(const c of chF){c.a+=dt*sp*0.9;c.f.position.set(Math.cos(c.a)*c.r,c.y+Math.sin(c.a*3)*0.3,Math.sin(c.a)*c.r);c.f.rotation.y=-c.a;}
    RAYS.forEach((m,i)=>{m.material.opacity=damp(m.material.opacity,KD.on?0.16:0,3,dt);m.rotation.z=Math.sin(G.time*(0.8+i*0.3)+i*2)*0.5;m.rotation.x=Math.cos(G.time*(0.7+i*0.2)+i)*0.35;});
    // кольца-волны от пляски
    if(KD.on){KD.waveT-=dt;if(KD.waveT<=0){KD.waveT=[1.8,1.6,1.45][KD.round];KD.side=-KD.side;spawnRing(KD.round===1?KD.side:0);if(KD.round===2)later(0.45,()=>{if(KD.on)spawnRing(0);});}}
    for(let i=WAV.length-1;i>=0;i--){const w=WAV[i],R0=w.R;w.R+=w.sp*dt;w.m.scale.set(w.R,1+0.12*Math.sin(G.time*9+i),w.R);w.m.material.opacity=0.75*Math.min(1,(16-w.R)/3);if(w.R>16||F.kingDone){W.group.remove(w.m);WAV.splice(i,1);continue;}
      for(const h of HEROES){if(h.cling||!h.active||h.pos.y>0.85)continue;const dx=h.pos.x,dz=h.pos.z-TZ,d=Math.hypot(dx,dz)||1;if(d<R0-0.5||d>w.R+0.5)continue;if(w.side&&dx*w.side<0)continue;if(G.time-(h.waveT||-9)<0.6)continue;
        h.waveT=G.time;h.vel.x=dx/d*6.5;h.vel.z=dz/d*6.5;h.vel.y=5.2;h.grounded=false;h.groundRef=null;SFX.splash();floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'Волна! Прыгай!','#cff8ff');
        if(!F.waveTold){F.waveTold=true;for(const p of[0,1])tip(p,'Кольца-волны — прыгай '+K(p,'jump')+'! Сбило — играй снова '+K(p,'item')+'.',3.8);}}}
    // жемчужинки с венца (со второго колена)
    if(KD.on&&KD.round>=1){KD.pearlT-=dt;if(KD.pearlT<=0){KD.pearlT=2.4;spawnPearl();}}
    for(let i=PRL.length-1;i>=0;i--){const q=PRL[i];q.t+=dt;if(q.t<1){q.m.position.lerpVectors(q.from,q.to,q.t);q.m.position.y+=Math.sin(q.t*Math.PI)*2.4;}else q.m.position.y=0.35+Math.abs(Math.sin((q.t-1)*5))*0.15;
      let got=null;if(q.t>0.8)for(const h of HEROES){if(!h.active||h.cling)continue;if(hd(h.pos,q.m.position)<0.95&&Math.abs(h.pos.y-q.m.position.y)<1.6){got=h;break;}}
      if(got||q.t>8||F.kingDone){W.group.remove(q.m);PRL.splice(i,1);if(got&&!F.kingDone){KD.meter=Math.min(1,KD.meter+0.045);KD.pearls++;tone(1500,0.12,'sine',0.12,2100);burst(q.m.position.clone(),0xffffff,10,3);floatText(got.pos.clone().add(new V3(0,got.d.height+0.6,0)),'Жемчужинка! Пляска шибче!','#fff6d0');}}}
    if(live&&KD.meter>=1){F.kingDone=true;kingEnd();}
    for(const q of HD){const k=F.kingOpen?1:0;q.k=damp(q.k,k,3,dt);q.g.position.y=4.5*q.k;q.col.on=q.k<0.6;}}
  // после слов царя — показ «оставленный держит»: призрак-гусляр играет первый голос, герой сменён — оставленный играет сам (круг-таймер над ним),
  // второй идёт ко второму стулу; заиграли оба — царь пляшет. Тот же круг потом над настоящими героями (late_99d_kitezh_water.js).
  function kingScene(){const T=HERO,gh=[],RH={},sd=seats.map(s=>new V3(s.x,0,s.z+1.0));
    const ghost=(kind,p)=>{const g=buildHeroMesh(kind,true).g;g.position.copy(p);g.rotation.y=Math.PI;W.group.add(g);gh.push(g);return g;};
    play({dur:20,fov:48,shots:[shot(0,[0,4.2,K0-18],[0,2.8,TZ]),shot(4.4,[4.2,2.8,TZ+9.5],[0,1.2,TZ+6.4],[0,3.2,TZ+10.5],[0,2,TZ+3],3),shot(11.2,[0,3.6,TZ+15.5],[0,1.2,TZ+6.8])],
      says:[[0.3,3.8,null,'<i>В палатах на троне — Морской царь, борода из тины, на голове — венец.</i>',true],[4.3,4,'king','Гусли слышу! Сыграйте мне — попляшу! А не спляшу — дверей не открою!'],
        [8.4,2.8,'king','Да в два голоса, у самого трона!'],[12.4,3.4,'zven','Один у гуслей? Сыграй — и смени героя!'],[15.9,3.8,'zven','Оставленный играет сам, пока горит круг над ним!']],
      events:[{t:4.4,fn:()=>{for(const s of seats){ringFx(new V3(s.x,0.2,s.z),0xffe08a,2.2);later(0.4,()=>ringFx(new V3(s.x,0.2,s.z),0x9fe6ff,1.6));}}},{t:8.4,fn:()=>{king.arms[1].rotation.x=-0.8;}},
        {t:11.2,fn:()=>{king.arms[1].rotation.x=0;ghost('proshka',sd[0]);ghost('potap',sd[0].clone().add(new V3(1.1,0,0.4)));}},
        {t:11.8,fn:()=>{[67,71,74,79].forEach((m,k)=>gusli(m,k*0.09,0.12));floatText(new V3(sd[0].x,2.6,sd[0].z),'Первый голос!','#ffe08a');}},
        {t:12.8,fn:()=>{SFX.ok();burst(new V3(sd[0].x+1.1,1.2,sd[0].z+0.4),0xffffff,10,2);floatText(new V3(sd[0].x,3.1,sd[0].z),'Держу напев!','#ffe9a0');const R=FIN.kwRing(RH);R.s.visible=true;R.s.position.set(sd[0].x,2.3,sd[0].z);}},
        {t:15.8,fn:()=>{[72,76,79,84].forEach((m,k)=>gusli(m,k*0.09,0.12));floatText(new V3(sd[1].x,2.6,sd[1].z),'Второй голос!','#ffe08a');for(let i=0;i<8;i++)burst(new V3(rand(-2,2),2.2,TZ+rand(-1,2)),[0xffd23a,0x5ab8ff,0xff7ab0,0x6ad86a][i%4],2,2,0.5);}}],
      tick:(t)=>{king.dance(t>15.8,1/60,1);if(t<15.8)king.head.rotation.y=Math.sin(t*1.5)*0.3;for(const s of seats)s.gm.emissiveIntensity=t>4.4?0.5+0.5*Math.sin(t*7):0.2;
        if(gh[1]&&t>12.8){const k=smooth(Math.min(1,(t-12.8)/2.8));gh[1].position.lerpVectors(sd[0].clone().add(new V3(1.1,0,0.4)),sd[1],k);gh[1].position.y=Math.abs(Math.sin(t*9))*0.08*(1-k);gh[1].rotation.y=k<1?Math.PI/2:Math.PI;}
        if(RH.kwRing&&t>12.8)FIN.kwRingDraw(RH.kwRing,15-(t-12.8)*0.9,15);},
      end:()=>{king.arms[1].rotation.x=0;king.head.rotation.y=0;for(const g of gh)W.group.remove(g);if(RH.kwRing)W.group.remove(RH.kwRing.s);
        banner('Пляска Морского царя!','#9fe6ff',2.6,'играйте ОБА у стульев перед троном — царь пляшет; один — сыграй и смени героя: оставленный играет, пока горит круг');}});}
  function kingEnd(){const T=HERO;KD.on=false;for(const q of SEATREF)q.hum=0;
    const seatsAt=[[-3.6,TZ+7.6],[3.6,TZ+7.6],[-1.2,TZ+8.6],[1.2,TZ+8.6]];
    play({dur:15,fov:48,shots:[shot(0,[0,2.8,TZ+6.2],[0,2.6,TZ]),shot(3.3,[0,1.4,TZ+11],[0,24,TZ-3]),shot(7.1,[1.5,3.9,TZ+2.7],[0,3.7,TZ]),shot(9.6,[0,3.6,TZ+13],[0,2.4,K0-37],[0,3,TZ+9],[0,2.4,K0-37],3)],
      says:[[0.3,2.6,'king','Ох, уважили! Ох, наплясался!'],[3.4,3.2,'yosha','Царь-батюшка, а наверху от твоей пляски корабли качаются!'],[7.0,4.2,'king','И то правда… Заплясался я. Ступайте! Вот вам по жемчужинке — за гусли.'],
        [11.8,2.8,'zven','Вот это пляска! Дальше — в сад Китежа!']],
      events:[{t:0,fn:()=>{HEROES.forEach((h,i)=>{placeOnGround(h,seatsAt[i][0],seatsAt[i][1],0);h.face=Math.PI;});SFX.ok();for(let i=0;i<16;i++)burst(new V3(rand(-3,3),rand(2,5),TZ+rand(-1,3)),[0xffd23a,0x5ab8ff,0xff7ab0,0x6ad86a][i%4],3,3);}},
        {t:1.2,fn:()=>{anim(0.8,k=>{king.body.position.y=-0.25*k;});tone(180,0.4,'sine',0.15,90);}},
        {t:3.3,fn:()=>{SHIPS.visible=true;}},
        {t:7.4,fn:()=>{anim(1.2,k=>{king.head.rotation.x=-0.5*smooth(k);king.crown.rotation.z=0.3*smooth(k);});}},
        {t:9.5,fn:()=>{king.arms[1].rotation.x=-1.2;SFX.gate();shakeAll(0.04,0.4);F.kingOpen=true;for(const q of HD)for(let i=0;i<10;i++)burst(new V3(rand(-9,-5)+(q===HD[1]?14:0),rand(0.5,4),K0-36.6),0xfff2b0,3,3);}},
        {t:10.4,fn:()=>{for(let i=0;i<2;i++){const it=nutItem(-1+i*2,3.2,TZ+0.6);it.locked=true;const to=active(i).pos.clone();anim(1.2+i*0.2,k=>{it.pos.set(lerp(-1+i*2,to.x,k),3.2+Math.sin(k*Math.PI)*1.5,lerp(TZ+0.6,to.z,k));});later(1.5+i*0.2,()=>{it.locked=false;takeItem(it,active(i));});}SFX.ok();}},
        {t:12.4,fn:()=>{SHIPS.visible=false;}}],
      tick:(t)=>{king.dance(t<1.2,1/60,1.4);const rock=t<7.4?1:Math.max(0,1-(t-7.4)/2.5);SHIPS.children.forEach((c,i)=>{if(!c.userData.ph&&c.userData.ph!==0)return;const ph=c.userData.ph;c.rotation.z=Math.sin(t*3+ph)*0.35*rock;c.rotation.x=Math.cos(t*2.4+ph)*0.2*rock;c.position.y=22.6+Math.sin(t*2.2+ph)*0.6*rock;});},
      end:()=>{SHIPS.visible=false;king.body.position.y=0;king.head.rotation.x=0;king.crown.rotation.z=0;king.arms[1].rotation.x=0;F.kingOpen=true;for(const q of HD){q.k=1;q.col.on=false;q.g.position.y=4.5;}
        banner('Двери отворены!','#ffffff',1.8,'дальше — две раковины и сад Китежа');}});}
  W.onSelfBreak=(e)=>{if(!F.laugh){F.laugh=true;later(0.5,()=>bark(HERO.yosha,'yosha','Она сама себя — вот так лихо!',2));}};
  W.updates.push(dt=>{curtain.material.opacity=0.18+0.05*Math.sin(G.time*2);
    if(F.kingOpen)for(const q of HD){q.k=1;q.col.on=false;q.g.position.y=4.5;}
    if(F.stage==='walk'&&[0,1].some(pi=>active(pi).pos.z<-10.5))sadkoIntro();
    if(F.stage==='gusli'&&!F.book&&!G.cine&&[0,1].some(pi=>active(pi).pos.z<-31.5))bookScene();
    if(!F.pikeTold&&W.enemies.some(e=>e.kind==='shchuka'&&e.state==='wind')){F.pikeTold=true;banner('Щука-морок!','#9fd0ff',2,'плавает где хочет; синяя капля: щитом закройся, а в последний миг — отбей ей обратно в пасть');}
    if(!F.clamTold&&W.enemies.some(e=>e.kind==='zhemchug'&&e.state==='wind')){F.clamTold=true;banner('Жемчужница-морок!','#c8b8f0',2.4,'створки не пробить: жемчужину отбей обратно '+K(0,'guard')+' / '+K(1,'guard')+' в последний миг — или отлив сыграй, ахнет');}
    sadko.body.rotation.z=Math.sin(G.time*0.8)*0.02;});
  /* ---------- рисунки кнопок ---------- */
  const T=HERO,inFountain=h=>hd(h.pos,{x:0,z:-18})<4.4;
  prompt(1,'skill',()=>headOf(T.yosha),()=>F.stage==='sadko'&&T.yosha.active&&hd(T.yosha.pos,{x:-5.9,z:-14.5})<5,'мёртвая вода');
  prompt(1,'swap',()=>headOf(T.yosha),()=>F.stage==='sadko'&&T.pelageya.active&&hd(T.pelageya.pos,{x:-5.9,z:-14.5})<7,'Йоша');
  for(const pi of[0,1]){const h=()=>active(pi),d=SD[pi];
    prompt(pi,'item',()=>headOf(h()),()=>W.abil.gusli&&!fLink.taken&&inFountain(h())&&fz.state==='low','прилив');
    prompt(pi,'item',()=>headOf(h()),()=>W.abil.gusli&&inZone(d.zA,h(),0.4)&&h().pos.y<3.3&&d.zA.state==='low'&&h().pos.z<-45&&h().pos.z>-56,'прилив — лодки всплывут');
    prompt(pi,'item',()=>headOf(h()),()=>inZone(d.zB,h(),0.3)&&d.zB.state==='low'&&!d.ch.open&&h().pos.z<-62&&h().pos.z>-70,'прилив — к двери');
    prompt(pi,'item',()=>headOf(h()),()=>d.inShaft(h())&&d.lift.state==='high'&&!d.ch.open,'отлив — вниз, как лифт');
    prompt(pi,'item',()=>headOf(h()),()=>d.inShaft(h())&&d.lift.state==='low'&&d.ch.open,'прилив — наверх');
    prompt(pi,'guard',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&e.tgt===h()&&e.state==='wind'&&e.help));
    prompt(pi,'attack',()=>headOf(h()),()=>W.enemies.some(e=>e.alive&&hd(e.pos,h().pos)<5&&Math.abs(e.pos.y-h().pos.y)<2&&(e.state==='broken'||(e.state==='stagger'&&!e.openHit)||e.flop)),'');}
  /* ---------- задачи ---------- */
  const side=pi=>{const d=SD[pi];return [
    O(()=>'Причал. Сыграй прилив '+K(pi,'item')+' — лодки всплывут до крыш.<br>С лодки шагни на крышу — и дальше, мимо крыш.',()=>active(pi).pos.z<-60.3||(active(pi).pos.y>3.3&&active(pi).pos.z<-56),()=>[d.boat2.g,d.zA.shell.g],
      ()=>({kind:active(pi).kind,action:'jump',from:new V3(d.X(4.2),3.1,-54),to:new V3(d.X(4.2),3.44,-57.6)})),
    O(()=>'Дверь дома — на втором этаже. Прилив '+K(pi,'item')+' сыграй, плыви к двери.<br>Внутри — отлив: вода опустит, как лифт. Сундук на дне — бери.',()=>d.ch.open||active(pi).pos.z<-77,()=>[d.door,d.ch.g])];};
  const common=pi=>[
    O('Подводный Китеж! По дну идём в пузырях воздушных —<br>Нам на площадь, к Садко, к гуслям звучным.',()=>F.stage!=='walk',()=>[sadko.g]),
    O(pi?()=>'У Садко струна порвалась — тёмная капля над ней.<br>Смени на Йошу и полей из ковшика '+K(1,'skill')+' — мёртвая вода срастит, скорей.':'У Садко струна порвалась. Мёртвая вода у Йоши — друга у Садко подожди.',()=>W.abil.gusli,()=>[sadko.g],
      pi?()=>({kind:'yosha',action:'walk',from:new V3(-3.5,0,-11.5),to:new V3(-5.6,0,-14.1)}):null),
    O(()=>'У каждого теперь гусли! Звено — на столбе фонтана.<br>Встань у чаши, сыграй прилив '+K(pi,'item')+': доски всплывут без обмана.',()=>fLink.taken||active(pi).pos.z<-29,()=>[fLink.g,fz.shell.g]),
    O(pi?'Терем-библиотека. Прошка книгу сказок нашёл толстую…':'Терем-библиотека. Прошка, книгу сказок открой.',()=>F.book,()=>[book])];
  const late=pi=>[
    O(()=>'Шлюзы! Встань в воду и прилив '+K(pi,'item')+' сыграй — вода подымет на ступеньку.<br>Две ступеньки — и наверх, помаленьку.',()=>active(pi).pos.z<-103.5,()=>[L1,L2].filter(z=>inZone(z,active(pi),6)).map(z=>z.shell.g)),
    O(pi?()=>'Переливная улица! Вода в двух каналах одна — через заслонку на дне левого канала. Ждём: Потап её подержит.<br>Прилив у тебя '+K(1,'item')+' — отлив у друга. Лодкой — к террасе, дёрни верёвку: откроешь ворота ДРУГА.':
        ()=>'Переливная улица! Вода в двух каналах одна — через заслонку на дне левого канала.<br>Поставь на неё Потапа: он тяжёлый, не всплывёт и держит, даже оставленный. Прилив у тебя '+K(0,'item')+' — отлив у друга.<br>Лодкой — к террасе, дёрни верёвку: откроешь ворота ДРУГА.',
      ()=>active(pi).pos.z<-113+PZ,()=>{const r=[];if(!SLU.held())r.push(SLU.g);if(!ropes[pi].pulled)r.push(ropes[pi].fl);if(!PG[pi].open)r.push(PG[pi].g);return r;}),
    O(()=>'Торговые ряды! Раки щиплют красным — кувырком '+K(pi,'roll')+'.<br>Жемчужница в пруду: отлив '+K(pi,'item')+' — ахнет и раскроется, тут и бей.',()=>mkt.done,()=>mkt.list.filter(e=>e.alive).map(e=>e.g)),
    O(()=>'Звонкая мостовая! Встаньте на звонкие плиты по напеву Садко: дзинь, дилинь — по очереди,<br>а дон-дон — вдвоём, разом. Ворота сами запоют!',()=>!!F.tune,()=>TS.done?[]:TUNE.map(T=>T.g)),
    O(()=>'Палаты Морского царя! Два стула гусляра — перед троном: играйте '+K(pi,'item')+' оба — царь пляшет в два голоса.<br>Один? Сыграй и смени героя '+K(pi,'swap')+' — оставленный играет, пока горит круг над ним. Кольца-волны — прыгай '+K(pi,'jump')+'.',
      ()=>!!F.kingOpen,()=>F.kingDone?HD.map(q=>q.g):seats.map(s=>s.g)),
    O(()=>'Две раковины. На таблички гляди: левой — прилив, правой — отлив.<br>Сыграйте '+K(pi,'item')+' — каждый у своей, вот и весь мотив.',()=>!!F.grate,()=>[LZ.shell.g,RZ.shell.g]),
    O(()=>'Сад Китежа. Ракушка — на дне, у родника: в приливе дойдёт только тяжёлый Потап — отлив '+K(pi,'item')+'.<br>Йоша польёт ростки '+K(1,'skill')+' — вырастут лесенки к террасе. Родник снова наполнит сад — пусть оставленный держит напев!',
      ()=>active(pi).pos.z<-262+DG,()=>{const r=[];if(GARD.state==='high')r.push(GARD.shell.g);for(const s of KS)if(!s.grown)r.push(s.g);if(!F.anchor)r.push(anchor);return r;}),
    O(()=>'Рак-Отшельник не пускает к воротам! Раковину не пробить: сыграй '+K(pi,'item')+' у ракушки-музыкалки — заслушается, тут и бей.<br>Пробой — Потап вытянет его из раковины. Без домика удирает: зажмите с двух сторон!',
      ()=>!!F.hermitWon,()=>{const e=HB.dbg().e;return e&&e.alive?[e.g]:[HB.dbg().lureShell.g];}),
    O('Ворота Китежа — бери звено, и в путь-дорогу!',()=>false,()=>[endLink.g])];
  for(const pi of[0,1])W.objectives[pi]=common(pi).concat(side(pi),late(pi));
  W.tipZones.push({cond:(pi,h)=>h.grounded&&h.groundRef&&h.groundRef.water,text:pi=>'Ты плывёшь! Сыграй на гуслях '+K(pi,'item')+' — лодка всплывёт.'},
    {cond:(pi,h)=>h.pos.y<-1.5&&h.pos.z<-45&&h.pos.z>-52,text:pi=>'Отлив открыл подвал. На дне — орешек! Назад — по ступенькам.'},
    {cond:(pi,h)=>SD[pi]&&SD[pi].inShaft(h)&&h.pos.y<-2,text:pi=>'Со дна — прилив '+K(pi,'item')+': вода поднимет.'});
  W.spawns=[[new V3(-3.5,0,5),new V3(-5.5,0,6)],[new V3(3.5,0,5),new V3(5.5,0,6)]];W.startAct=[0,0];
  W.pauseLine='Подводный Китеж. Гусли Садко: RB воду меняет там, где стоишь, —<br>Прилив лодки подымет, отлив подвалы откроет, глядишь.<br>Переливная улица: вода одна на двоих — Потап на заслонке держит.<br>Звонкие плиты — напев Садко; Морскому царю играйте в два голоса — запляшет; сад Китежа: Потап по дну, Йоша — лесенки растит;<br>Рак-Отшельник любит музыку — а домик ему нужен новый.<br>В Китеже молчать нельзя — запомни в голове.';
  W.onStart=()=>{later(0.8,()=>say('zven','Китеж! Под водою спит он. Дзинь — за мной!',2.6,true));};
  // для ботов: перенос к участку
  W.warp21=(where)=>{F.stage='street';F.book=true;W.abil.gusli=true;const P={locks:[0,0,-78],perel:[-6,0,-78+PZ],market:[0,0,-157],tune:[0,0,-182],dance:[0,0,K0-2],shells:[0,0,-219+S1],garden:[0,0,-235.5+DG],boss:[0,0,-267+DG],gate:[0,0,-311+DG]}[where];
    const ORD=['locks','perel','market','tune','dance','shells','garden','boss','gate'],after=w=>ORD.indexOf(where)>ORD.indexOf(w);
    if(after('market')){mkt.started=true;mkt.done=true;mktGate.forceOpen=true;}
    if(after('tune')){TS.done=true;F.tune=true;F.sturg=true;tuneCol.on=false;tuneGate.position.y=4.6;}
    if(after('dance')){F.kingMet=true;F.kingDone=true;F.kingOpen=true;}
    if(after('shells')){F.grate=true;grateCol.on=false;grate.position.y=3.8;}if(after('garden')){F.gardTold=true;}
    if(where==='gate'){F.hermitWon=true;HB.dbg().weedCol.on=false;HB.skip&&HB.skip();}
    if(after('perel')){PG.forEach((q,i)=>openPG(i));F.perelTold=true;}if(where==='dance')F.kingMet=true;if(where==='tune')F.sturg=true;
    HEROES.forEach((h,i)=>{placeOnGround(h,P[0]+(i%2?1.4:-1.4)+(i>1?3:0)*(P[0]<0?1:-1),P[2]+(i>1?0.6:0),P[1]);h.following=false;});for(const pi of[0,1])players[pi].cp.set(P[0],P[1],P[2]);snapCams();
    return W.dbg21();};
  W.dbg21=()=>({CL,CR,SLU,boatL,boatR,ropes,PG,KD,SEATREF,HD,seats,WAV,PRL,king,TUNE,TS,tuneCol,GARD,KS,anchor,LZ,RZ,mkt,endLink,HB,S1,DG,K0,TZ,F});
  flushDecor();
};
