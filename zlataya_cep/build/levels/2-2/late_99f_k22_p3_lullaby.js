// ---- продолжение late_99f_k22.js (внутри build22, часть 3 из 4): колыбельная: куплеты, звёздочки, дыхание — части склеиваются сборкой по имени файла ----
  function eyeScene(){F.eyeSeen=true;const T=HERO;const e=flankEye;
    play({dur:17.4,fov:46,shots:[shot(0,[4,7.6,-190],[10,4.4,-196]),shot(4.2,[8.4,4.6,-193],[12.6,3.6,-196]),shot(8.8,[2,6.4,-186],[T.yosha.pos.x,5.4,T.yosha.pos.z]),shot(11.7,[8.8,4.8,-192.4],[12.6,3.6,-196])],
      says:[[0.3,3.6,null,'<i>Кит вздыхает легко, впервые за десять лет. И у самого бока открывается глаз — огромный, как пруд.</i>',true],[4.3,3.8,'kit','Ох… легче стало… Кто тут такие добрые?'],
        [8.8,2.8,'yosha','Мы — Лесной патруль! Привет, Кит!'],[11.7,5.5,'kit','Десять лет частокол в боку… Спасибо, малые. Ступайте по мне — я тихонько дышать буду.']],
      events:[{t:0.4,fn:()=>{tone(120,2.4,'sine',0.2,70);}},{t:1.4,fn:()=>{anim(2.6,k=>{e.set(smooth(k)*0.85);});}},{t:6.4,fn:()=>{anim(0.5,k=>{e.set(0.85*(1-Math.sin(k*Math.PI)));});}},{t:13.6,fn:()=>{e.cry();}}],
      end:()=>{e.set(0.85);banner('Кит проснулся!','#9fe6ff',2.2,'дышит тише — рёбра ходят спокойнее · дальше — губа, там пашут');}});}
  function hiccup(){SFX.thud();shakeAll(0.06,0.35);tone(140,0.25,'sine',0.25,60);for(const h of HEROES){if(h.grounded&&!h.cling&&h.pos.y>4){h.vel.y=Math.max(h.vel.y,4.6);h.grounded=false;}}
    floatText(new V3(0,10,active(0).pos.z-2),'Ик!','#cfe8ff');}
  function spout(H){col2.visible=true;glint.visible=true;anim(2.4,k=>{const h=Math.sin(k*Math.PI)*H;col2.scale.set(1,Math.max(0.01,h),1);col2.position.y=8.5+h/2;glint.position.set(BH2.x+Math.sin(k*9)*0.2,8.6+h*0.9,BH2.z);glint.rotation.y+=0.3;});
    later(2.5,()=>{col2.visible=false;glint.visible=false;});SFX.whoosh();}
  function diveScene(){FN.dive=true;const T=HERO;
    play({dur:20.8,fov:48,shots:[shot(0,[4,11.2,-392],[0,8.5,-416]),shot(4.6,[1.8,9.6,-409],[0,10.6,-419]),shot(8.2,[2.6,10.4,-406],[T.yosha.pos.x,9.6,T.yosha.pos.z]),shot(13,[0,14,-404],[0,0,-330],[0,18,-410],[0,0,-300],4.6)],
      says:[[0.3,2.4,null,'<i>Кит вздыхает — и вдруг: «Ик!»</i>',true],[2.8,1.6,'potap','Икает, бедный!'],[4.6,3.4,null,'<i>Из дыры в голове — струйка, а в ней что-то золотое блеснуло.</i>',true],
        [8.2,3,'yosha','Он что-то проглотил! Золотое, блестящее!'],[11.2,1.8,'zven','Вот и икает. Запомним!'],[13.2,4.9,'kit','Ох, тяжко мне… Нырну-ка я на дно — там тихо…'],[18.2,2.5,'zven','Кит ныряет! Деревня утонет!']],
      events:[{t:2.2,fn:()=>hiccup()},{t:5,fn:()=>spout(4)},{t:13.2,fn:()=>{SEA.target=-1.4;tone(60,3,'sine',0.25,40);}}],
      end:()=>{banner('Кит ныряет!','#ffb0a0',2.8,'море подымается! Скорей на макушку, к дыхалу — спойте киту колыбельную в три куплета');
        for(const p of[0,1])tip(p,'Колыбельная, куплет первый: от дыхала бежит волна. Дошла до круга у ракушек — играйте '+K(p,'item')+' обе разом!<br>В одиночку: сыграй и смени героя '+K(p,'swap')+' — оставленный держит напев, а ты — вторую в лад.',4.6);
        gullsH.push(chaika22(-6,-404,6.5,{leash:12}));if(!G.solo)gullsH.push(chaika22(6,-410,8.5,{leash:12}));}});}   // в одиночку одна чайка: играющий один у ракушки
  /* ---------- колыбельная в три куплета ---------- */
  const heldBy=i=>HEROES.some(h=>h.kwHold&&h.kwHold.ref===LUL[i]);
  const lullProg=()=>(LS.stage<=1?LS.lines/3:LS.stage===2?1+LS.got/4:2+Math.min(1,FN.lull/3))/3;
  function lullStage(n){LS.stage=n;LS.lonT=0;
    if(n===1){LS.bt=0;LS.judged=true;lulRing.visible=true;lulMark.visible=true;}
    if(n===2){LS.lonT=6;lulRing.visible=false;lulMark.visible=false;LUL[0].off=LUL[1].off=true;SFX.bell();
      banner('Первый куплет спет!','#ffe08a',2.6,'кит задрёмывает… над макушкой — сонные звёздочки');
      later(1.2,()=>say('zven','Звёздочки сонные! Пелагея, глянь Совиным взором — а ловите прыжком!',3.4));
      for(const p of[0,1])tip(p,'Сонные звёздочки видны только Совиным взором Пелагеи '+K(1,'skill')+'.<br>Пока светятся — допрыгни '+K(p,'jump')+' и поймай: звёздочка полетит киту в глаз.',4.2);}
    if(n===3){LUL.forEach(q=>{q.off=false;q.hum=0;});SFX.gate();shakeAll(0.03,0.6);lulShells.slice(2).forEach(S=>{anim(1.6,k=>{S.g.position.y=8.5-2.4*(1-smooth(k));});burst(new V3(S.x,9,S.z),0xe8fbff,12,3);});
      banner('Звёздочки — в глазах у кита!','#ffe08a',2.6,'последний куплет — в четыре голоса: подымаются ещё две ракушки');
      later(1.2,()=>say('zven','Последний куплет — в четыре голоса! Все четверо — по ракушкам!',3.2));
      for(const p of[0,1])tip(p,'Четыре ракушки — четыре голоса. Сыграй '+K(p,'item')+' и смени героя '+K(p,'swap')+' — оставленный держит напев.<br>Зазвучат все четыре разом — кит уснёт.',4.4);}}
  // строка куплета: волна дошла до круга — обе ракушки в этот миг (±0,6 с) сыграны или держатся оставленным героем
  function judgeBeat(){const tb=LS.tb,ok=[0,1].map(i=>heldBy(i)||Math.abs(LUL[i].press-tb)<=0.6),tried=[0,1].some(i=>LUL[i].press>tb-LS.per*0.6);
    const at=new V3(0,11.4,-416);
    if(ok[0]&&ok[1]){LS.lines++;SFX.bell();[60,64,67,64,60].forEach((m,k)=>later(k*0.22,()=>gusli(m+LS.lines*2,0,0.12)));SEA.target=Math.max(-3.2,SEA.target-1.8);
      say(null,'<i>'+LYR[LS.lines-1]+'</i>',3.6,true);floatText(at,'Строка '+LS.lines+' из 3!','#ffe08a');for(let i=0;i<10;i++)burst(new V3(rand(-4,4),9.4+rand(0,2),-419+rand(-3,3)),[0xffe08a,0x9fe6ff,0xffb0d0][i%3],2,1.5,0.6);
      if(LS.lines>=3)later(1.6,()=>{if(LS.stage===1&&!FN.done)lullStage(2);});}
    else if(tried){if(ok[0]||ok[1])floatText(at,'Один голос в лад — а второй? Обе разом!','#9fe6ff');else{floatText(at,'Мимо волны — кит заворочался!','#ffb0a0');hiccup();SEA.target=Math.min(7,SEA.target+0.6);}}}
  function catchStar(S,h){S.got=true;LS.got++;SFX.ok();const from=S.g.position.clone(),to=new V3(12.6,6.8,-416);
    floatText(h.pos.clone().add(new V3(0,h.d.height+0.7,0)),'Дрёма! '+LS.got+' из 4','#ffe08a');gusli(72+LS.got*2,0,0.12);
    anim(1.1,k=>{S.g.position.set(lerp(from.x,to.x,k),lerp(from.y,to.y,k)+Math.sin(k*Math.PI)*2,lerp(from.z,to.z,k));S.g.scale.setScalar(1-k*0.7);if(k>=1){S.g.visible=false;burst(to.clone(),0xfff2a0,8,2);}});
    SEA.target=Math.max(-3.2,SEA.target-0.8);}
  function lullTick(dt){if(!LS.stage)lullStage(1);
    SEA.target=Math.min(7.0,SEA.target+dt*(LS.stage===3?0.16:0.1));
    if(LS.stage===1){LS.bt+=dt;const k=LS.bt/LS.per,hit=0.7;lulRing.scale.setScalar(0.6+k/hit*3.0);lulRing.material.opacity=k<hit?0.3+0.6*k/hit:Math.max(0,0.9*(1-(k-hit)/(1-hit)));
      const near=Math.abs(k-hit)*LS.per<0.6;lulMark.material.opacity=near?0.7:0.22;lulShells.slice(0,2).forEach(S=>{S.gm.emissiveIntensity=near?1.2:0.2;});
      if(!LS.toned&&k>=hit){LS.toned=true;LS.tb=G.time;LS.judged=false;tone(392,0.45,'sine',0.12,330);}
      if(!LS.judged&&G.time>=LS.tb+0.6){LS.judged=true;judgeBeat();}
      if(LS.bt>=LS.per){LS.bt-=LS.per;LS.toned=false;}}
    else if(LS.stage===2){for(const S of STARS){if(S.got)continue;S.a+=dt*0.22;const x=BH2.x+Math.cos(S.a)*S.r,z=BH2.z+Math.sin(S.a)*S.r,y=S.y+Math.sin(G.time*1.6+S.i)*0.15;S.g.position.set(x,y,z);
        if(W.owlT>0)S.seen=6;S.seen=Math.max(0,S.seen-dt);S.g.visible=S.seen>0;S.st.rotation.y+=dt*2;S.halo.material.opacity=0.2+0.15*Math.sin(G.time*6);
        if(S.seen>0)for(const h of HEROES){if(!h.active||h.cling)continue;if(Math.hypot(h.pos.x-x,h.pos.z-z)<0.9&&h.pos.y+h.d.height+0.7>y&&h.pos.y<y+0.5){catchStar(S,h);break;}}}
      if(!F.starTold&&STARS.every(S=>S.seen<=0)){LS.lonT-=dt;if(LS.lonT<=0){LS.lonT=7;floatText(new V3(0,11.4,-416),'Где звёздочки? Совиный взор Пелагеи!','#e7c3ff');}}
      if(LS.got>=4&&!LS.next){LS.next=true;later(1.3,()=>{if(LS.stage===2&&!FN.done)lullStage(3);});}}
    else if(LS.stage===3){const on=LUL.map(q=>q.hum>0),n=on.filter(Boolean).length;lulShells.forEach((S,i)=>{S.ico.rotation.y+=dt*(on[i]?4:0.4);S.gm.emissiveIntensity=on[i]?1.0:0.2;});
      if(n===4){FN.lull+=dt;SEA.target=Math.max(-3.2,SEA.target-dt*0.8);if(Math.random()<dt*4)burst(new V3(rand(-4,4),10,-419+rand(-3,3)),[0xffe08a,0x9fe6ff,0xffb0d0][Math.floor(rand(0,3))],2,1.5,0.6);}
      else{FN.lull=Math.max(0,FN.lull-dt*0.5);if(n>0){LS.lonT-=dt;if(LS.lonT<=0){LS.lonT=3.5;floatText(new V3(0,11.4,-416),'Голосов '+n+' из 4 — нужны все четыре!','#9fe6ff');}}}
      if(FN.lull>=3){say(null,'<i>В четыре голоса — баю-бай! Не ныряй, кит, засыпай…</i>',3,true);finaleScene();}}
    headEye.set(Math.min(0.5,lullProg()*0.5));}
  function finaleScene(){FN.done=true;lulRing.visible=false;lulMark.visible=false;STARS.forEach(S=>{S.g.visible=false;});const T=HERO;const e=headEye;SEA.target=-3.2;
    const spots=[[-1.4,-417.6],[1.4,-417.6],[-1.4,-420.4],[1.4,-420.4]];const land=[[-2,-436],[2,-436],[-2,-440],[2,-440]];
    play({dur:24,fov:46,shots:[shot(0,[0,11.4,-404],[0,8.6,-416]),shot(3.6,[7.2,8.4,-411],[12.8,6.6,-416]),shot(11.2,[2.4,10,-410],[T.yosha.pos.x,9.4,-416]),shot(14.0,[8.6,8.2,-412],[12.8,6.6,-416]),
        shot(15.0,[0,12,-398],[0,12,-420],[0,26,-412],[0,22,-438],4.4),shot(21,[6,25,-430],[0,22.6,-438])],
      says:[[0.3,3.2,null,'<i>Колыбельная льётся — и кит затихает. Море ложится гладко.</i>',true],[3.6,3.6,'kit','Не нырну… Спели вы мне, как мама в детстве пела.'],
        [7.3,3.9,'kit','Болит внутри — проглотил я что-то звонкое, золотое…'],[11.3,2.7,'yosha','Мы поможем, Кит! Честное слово!'],[14.0,2.7,'kit','Тогда держитесь крепче, малые!'],
        [17.4,3.2,null,'<i>И кит дунул — фонтаном до самых облаков, а по брызгам — радуга!</i>',true],[21.2,2.6,'zven','До облаков! Вот это кит!']],
      events:[{t:0,fn:()=>{HEROES.forEach((h,i)=>{placeOnGround(h,spots[i][0],spots[i][1],8.5);h.face=Math.PI;});for(const g of gullsH){if(g.alive){g.alive=false;W.group.remove(g.g);const k=W.enemies.indexOf(g);if(k>=0)W.enemies.splice(k,1);}}
          [60,64,67,72,67,64,60].forEach((m,i)=>later(i*0.4,()=>gusli(m,0,0.12)));}},
        {t:3.8,fn:()=>{anim(2.4,k=>{e.set(smooth(k));});}},{t:8.6,fn:()=>{e.cry();}},{t:9.0,fn:()=>{hiccup();spout(3);}},
        {t:15.2,fn:()=>{tone(80,2,'sine',0.3,160);shakeAll(0.05,0.8);fountainCol.visible=true;anim(1.6,k=>{const H=14*smooth(k);fountainCol.scale.set(1,Math.max(0.01,H),1);fountainCol.position.y=8.5+H/2;});
          RAIN.visible=true;anim(2.2,k=>{RAIN.scale.setScalar(Math.max(0.01,smooth(k)));});}},
        {t:16.2,fn:()=>{SFX.whoosh();HEROES.forEach((h,i)=>{const a=h.pos.clone(),b=new V3(land[i][0],22.2,land[i][1]);h.cineHold=true;anim(3.4+i*0.15,k=>{const kk=smooth(k);h.pos.set(lerp(a.x,b.x,kk),lerp(a.y,b.y,kk)+Math.sin(k*Math.PI)*7,lerp(a.z,b.z,kk));h.vel.set(0,0,0);h.face=k*12;if(k>=1){h.cineHold=false;h.face=Math.PI;}});});
          for(let i=0;i<30;i++)later(i*0.08,()=>burst(new V3(rand(-2,2),rand(9,20),-419+rand(-2,2)),[0xe8fbff,0xffffff,COL.gold][i%3],3,4));}},
        {t:20.0,fn:()=>{anim(1.4,k=>{fountainCol.scale.y=Math.max(0.01,14*(1-k));fountainCol.position.y=8.5+7*(1-k);});later(1.4,()=>{fountainCol.visible=false;});}}],
      tick:(t)=>{for(const h of HEROES)if(h.cineHold)h.vel.set(0,0,0);},
      end:()=>{fountainCol.visible=false;HEROES.forEach((h,i)=>{h.cineHold=false;if(h.pos.y<20)placeOnGround(h,land[i][0],land[i][1],22.2);});for(const pi of[0,1])players[pi].cp.set(0,22.2,-436);
        banner('Подружились с китом!','#ffd76a',2.6,'звено — на облаке; а что кит проглотил — узнаем в «Тридцати кораблях»');}});}
  /* ---------- дыхание кита ---------- */
  function inhale(){tone(55,2.4,'sine',0.16,75);for(let i=0;i<8;i++)later(i*0.25,()=>burst(new V3(rand(-9,9),active(0).pos.y+0.2,active(0).pos.z+rand(-8,8)),0xcfe8ff,1,1.5,0.5));
    if(WB.n===0&&!F.inhTold){F.inhTold=true;for(const p of[0,1])tip(p,'Кит вдыхает — гудит! Сейчас выдохнет: спину тряхнёт, всех подкинет и качнёт вбок.',3.4);}}
  function exhale(){WB.n++;const c=WB.calm;shakeAll(0.05*c,0.7);SFX.whoosh();tone(70,1.2,'sine',0.22*c,40);WB.side=-WB.side;WB.sway=WB.side*1.8*c;
    for(const h of HEROES){if(!h.active||h.cling||!h.grounded||h.groundRef===STV.col)continue;h.vel.y=Math.max(h.vel.y,3.2*c);h.grounded=false;}
    for(const pr of WB.props)anim(0.5,k=>{pr.g.position.y=pr.y+Math.sin(k*Math.PI)*pr.h;});
    const z0=active(0).pos.z;for(let i=0;i<12;i++)burst(new V3(i%2?-10.6:10.6,1+rand(0,3),z0+rand(-24,24)),0xe8fbff,4,4);
    if(WB.n===1)banner('Кит вздохнул!','#cfe8ff',1.8,'тряхнуло всю деревню — а ему хоть бы что');
    for(const f of WB.hooks)f();}
  function breathTick(dt){if(G.cine)return;WB.t+=dt;const p=WB.per,t=WB.t%p,ph=t>p-2?'exhale':t>p-4.5?'inhale':'calm';
    if(ph!==WB.ph){WB.ph=ph;if(ph==='inhale')inhale();else if(ph==='exhale')exhale();}
    WB.k=damp(WB.k,ph==='inhale'?1:0,ph==='inhale'?1.2:3.5,dt);
    WB.sway=damp(WB.sway,0,2.5,dt);if(Math.abs(WB.sway)>0.05)for(const h of HEROES){if(!h.active||h.cling||h.groundRef===STV.col)continue;h.pos.x=clamp(h.pos.x+WB.sway*dt,-9.6,9.6);}
    for(const P of WB.pines)P.top.rotation.z=Math.sin(G.time*1.3+P.g.position.z)*0.03+WB.k*0.12*Math.sin(G.time*3+P.g.position.x);}
  /* ---------- шаг нового пути ---------- */
  W.updates.push(dt=>{breathTick(dt);
    SEA.y=damp(SEA.y,SEA.target,0.35,dt);sea.position.y=seaVis22(SEA.y)-WB.k*1.5+(WB.ph==='exhale'?1.2:0)*Math.sin(G.time*3);   // на вдохе море отходит, кит поднимается; на выдохе — волна о бока
    whale.g.position.y=WY+WB.k*0.7;whale.vis(G.time,WB.k,sea.position.y);if(ATMO.ocean)ATMO.ocean.position.y=sea.position.y+0.04;
    if(!FN.dive)SEA.target=-3.2;
    // рёбра ходят ходуном
    RB.t+=dt;for(const R of RIB){const s=Math.sin(RB.t/RB.per*Math.PI*2+R.i*Math.PI),z=R.z0+RB.A*s,y=0.3*RB.A/1.1*Math.cos(RB.t/RB.per*Math.PI*2+R.i*Math.PI);const dz=z-R.z,dy=y-R.y;R.z=z;R.y=y;
      R.g.position.set(0,y,z);const c=R.col;c.minz=z-1.5;c.maxz=z+1.5;c.miny=3.4+y;c.maxy=4.5+y;
      if(R.pal){const P=R.pal,pc=P.col;pc.minz=z-1.35;pc.maxz=z-0.85;pc.miny=4.5+y;pc.maxy=6.6+y;P.lp.set(2.6,4.5+y,z-0.6);}
      for(const h of HEROES)if(h.groundRef===c&&h.grounded&&!h.cling){h.pos.z+=dz;h.pos.y+=dy;}
        else if(!h.cling&&!h.hang&&h.pos.y<c.maxy-0.05&&h.pos.y>c.miny-1.2&&h.pos.z>c.minz-h.d.radius+0.12&&h.pos.z<c.maxz+h.d.radius-0.12){h.pos.y=c.maxy;h.vel.y=Math.max(0,h.vel.y);h.grounded=true;h.groundRef=c;}}   // ребро наехало на того, кто в складке, — подхватывает наверх
    PALS.forEach((P,i)=>{LIFTS_PAL[i].pos.copy(P.lp);WT_PAL[i].pos.set(0,P.lp.y,P.lp.z);if(P.pulled&&!P.healed){WT_PAL[i].pos.x=clamp(HERO.yosha.pos.x,-8,8);}
      if(P.pulled&&!P.healed&&P.mist.visible)P.mist.children.forEach((m,k)=>{m.position.y=5.2+Math.sin(G.time*2+k)*0.2;});});
    // губа: кит зевает — тянет к пасти; держись у Потапа или у плуга
    if(!G.cine){YW.t-=dt;if(YW.ph==='calm'&&YW.t<=0&&[0,1].some(pi=>{const z=active(pi).pos.z;return z<-210&&z>-264;})){YW.ph='warn';YW.t=1.6;tone(90,1.6,'sawtooth',0.06,140);floatText(new V3(-6,8,active(0).pos.z),'Кит зевает! Держись!','#ffb0a0');
        if(!F.yawnTold){F.yawnTold=true;for(const p of[0,1])tip(p,'Кит зевает — тянет к пасти! Держись рядом с Потапом (он тяжёлый) или у плуга.<br>Утянет — кит выплюнет назад, на край поля.',4);}}
      else if(YW.ph==='warn'&&YW.t<=0){YW.ph='suck';YW.t=3.2;SFX.whoosh();}
      else if(YW.ph==='suck'){if(Math.random()<0.5)burst(new V3(rand(-4,9),5,rand(-262,-214)),0xd8c8a8,1,2,0.4);
        for(const h of HEROES){if(!h.active||h.cling||h.kind==='potap')continue;const z=h.pos.z;if(z>-212||z<-264)continue;const P=HERO.potap;
          const held=(P.active||!P.following)&&hd(P.pos,h.pos)<1.9||plows.some(p=>hd(p,h.pos)<1.9);if(held){if(!h.heldT||G.time-h.heldT>2){h.heldT=G.time;floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'Держусь!','#ffe08a');}continue;}
          h.pos.x-=3.0*dt;if(h.pos.x<-6.9){h.pos.set(rand(-2,6),5.2,-212.5);h.vel.set(0,0,0);SFX.splash();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Ам! … Тьфу! Выплюнул!','#cfe8ff');burst(h.pos.clone(),0xcff8ff,12,3);}}
        if(YW.t<=0){YW.ph='calm';YW.t=rand(7,10);}}
      }
    // между глаз: хоровод и плясовые камни
    const inDance=pi=>{const h=active(pi);return hd(h.pos,DC)<9&&Math.abs(h.pos.z-DC.z)<10&&h.pos.y>4;};
    if(!DC.done&&!G.cine&&[0,1].some(inDance)){if(!DC.on){DC.on=true;say('malec','Эй, айда с нами в пляс! Прыг — на камушек, как загорится!',3.4);for(const p of[0,1])tip(p,'Хоровод! Камушек твоего цвета загорается по кругу — встань на него, пока горит, и прыгай '+K(p,'jump')+'!',4);}
      DC.bt-=dt;if(DC.bt<=0){DC.bt=1.15;DC.beat++;tone(DC.beat%2?440:330,0.12,'triangle',0.1,0);const ctl=[0,1].filter(pi=>!G.solo||pi===G.soloPi);
        for(const S of DC.stones)if(S.lit>=0){const pi=S.lit,h=active(pi);if(hd(h.pos,S)<1.1&&Math.abs(h.pos.y-4.6)<1.6){DC.score[pi]++;burst(new V3(S.x,5.4,S.z),PCOL[pi],8,3);floatText(new V3(S.x,6.4,S.z),'Прыг!','#ffe08a');}S.lit=-1;}
        ctl.forEach((pi,k)=>{const idx=((DC.beat+(pi?4:0))%8+8)%8;DC.stones[idx].lit=pi;});}
      DC.stones.forEach(S=>{S.mat.emissive.setHex(S.lit>=0?PCOL[S.lit]:0xffffff);S.mat.emissiveIntensity=S.lit>=0?0.8+0.3*Math.sin(G.time*12):0;});
      const ctl=[0,1].filter(pi=>!G.solo||pi===G.soloPi),tot=ctl.reduce((a,pi)=>a+DC.score[pi],0),need=DC.need*ctl.length;eyesE.forEach(e=>e.set(Math.min(0.8,tot/need)));
      if(tot>=need){DC.done=true;F.dance=true;DC.stones.forEach(S=>{S.lit=-1;S.mat.emissiveIntensity=0;});SFX.ok();foreCol.on=false;anim(1.2,k=>{fore.position.y=-2.2*k;});
        say('malec','Ух, наплясались! Глядите — кит глаза открыл! Дальше — в дубраву!',3.2);banner('Наплясались!','#ffd76a',2,'кит подмигнул — путь в дубраву открыт');eyesE.forEach(e=>{anim(0.6,k=>{e.set(0.8*(1-Math.sin(k*Math.PI)));});});}}
    DC.boys.forEach((b,i)=>{const a=G.time*(DC.on&&!DC.done?1.4:0.5)+i/6*Math.PI*2;b.g.position.set(Math.sin(a)*2,4.5+Math.abs(Math.sin(G.time*6+i))*0.25,DC.z+Math.cos(a)*2);b.g.rotation.y=a+Math.PI/2;b.arms.forEach((ar,k)=>{ar.rotation.z=(k?-1:1)*(1.3+Math.sin(G.time*6+i)*0.3);});});
    // дубрава: грибы под Совиным взором; мухоморы — прилипалы
    for(const m of MUSH){if(m.got)continue;const near=HEROES.some(h=>h.active&&hd(h.pos,m)<1.6&&Math.abs(h.pos.y-4.5)<1.5);if(W.owlT>0)m.seen=6;m.seen=Math.max(0,m.seen-dt);m.g.visible=m.seen>0||near;
      m.glow.material.opacity=m.seen>0?0.5+0.4*Math.sin(G.time*8):0;
      if(m.g.visible)for(const h of HEROES){if(!h.active||h.cling||hd(h.pos,m)>0.75||Math.abs(h.pos.y-4.5)>1.4)continue;m.got=true;m.g.visible=false;
        if(m.real){GR.got++;SFX.coin?SFX.coin():SFX.ok();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Боровик! '+GR.got+' из '+GR.need,'#ffe08a');}
        else{const e=prilip22(m.x,m.z,4.5,{leash:8});e.state='idle';e.pos.y=4.5;e.latchTo(h);floatText(h.pos.clone().add(new V3(0,h.d.height+1.0,0)),'Мухомор! Да это прилипала!','#ff9a9a');}
        break;}}
    if(!GR.done&&GR.got>=GR.need){GR.done=true;F.grove=true;say('devica','Ой, сколько грибочков! Спасибо! Кит, пусти их — усы подними!',3.4);SFX.gate();anim(2,k=>{curtain.position.y=7*smooth(k);});curtCol.on=false;banner('Грибы собраны!','#ffd76a',2,'кит поднял усы — путь к голове открыт');}
    if(!F.groveTold&&[0,1].some(pi=>active(pi).pos.z<-306&&active(pi).pos.z>-312)){F.groveTold=true;say('devica','Грибы прячутся — не видать! Совиным бы глазом поискать…',3.2);
      for(const p of[0,1])tip(p,'Грибы видны Совиным взором Пелагеи '+K(1,'skill')+' — светятся. Собери пять боровиков.<br>Красный с белыми точками — мухомор… да это прилипала!',4.4);}
    girls.forEach((g,i)=>{g.body.rotation.x=Math.sin(G.time*1.4+i)*0.25+0.2;});
    // голова: кит ныряет — море подымается; колыбельная в два голоса
    if(!FN.dive&&F.grove&&!G.cine&&[0,1].some(pi=>active(pi).pos.z<-362))diveScene();
    for(const q of LUL)q.hum=Math.max(0,q.hum-dt);
    if(FN.dive&&!FN.done&&!G.cine){lullTick(dt);
      for(const h of HEROES){if(!h.active||h.cling)continue;if(h.pos.y<SEA.y-0.15&&h.pos.z<-140){placeOnGround(h,rand(-6,6),-415,8.5);h.vel.set(0,0,0);SFX.splash();floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Кит выплеснул на макушку!','#cfe8ff');}}}
    if(!F.out&&FN.done&&!G.cine&&[0,1].every(pi=>active(pi).pos.y>20)&&(endLink.taken||F.cloudT>4)){F.out=true;finishLevel();}
    if(FN.done&&!G.cine)F.cloudT=(F.cloudT||0)+dt;
    });
  /* ---------- рисунки кнопок: просьба над раковиной видна обоим ---------- */
  const T=HERO,shellAt=z=>()=>z.shell.g.position.clone().add(new V3(0,2.6,0));
