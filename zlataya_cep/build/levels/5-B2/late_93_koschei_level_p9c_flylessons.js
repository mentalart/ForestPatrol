// ---- продолжение build5B2 (k5epic, часть 9c): ОБУЧАЮЩИЕ КАТСЦЕНЫ ПОЛЁТОВ ДОМОЙ — ступа (после стадии 4) и Горыныч (после стадии 7) ----
  // Идут сразу после ролика «почему летим» (p9b) и перед самим полётом: Звенышко показывает на настоящей ступе / Горыныче, как рулить, какие
  // буквы ловить, что облетать, кого бить и что делать в конце. Реквизит — те же ели, столбы, мыши, туча и Чудо-юдо, что в полёте, но без
  // счёта и без урона (состояние полёта не меняется). Правила общего движка — в p6b (E.lesson, L.beat…).
  const kboth=a=>G.solo?K(0,a):K(0,a)+' и '+K(1,a);   // клавиши обоих игроков: «F и ,»
  function flyLesson(L,gor){const F=FL5,R0=RIDE_X,spd=gor?26:24,two=!G.solo,H=(dx,dz)=>[R0+dx,1.0,dz],pis=flyPis();
    const vp0=F.v.position.clone(),spd0=F.spd;F.spd=spd;
    // мир едет под транспортом, транспорт покачивается
    const run=k5fx(999,(k,dt)=>{decorTick(dt);F.v.position.y=Math.sin(G.time*1.7)*0.22;if(!gor){F.m.broom.rotation.x=Math.sin(G.time*5)*0.25;if(Math.random()<dt*24)FX.sparkle(new V3(R0+F.v.position.x+rand(-1.4,1.4),rand(-1,0.5),rand(1.5,3.5)),1,0xfff0a0);}
      else{F.m.wings.forEach(w=>{w.wp.rotation.z=Math.sin(G.time*3.4)*0.55*w.s;});}},()=>{});
    L.on(()=>{run.t=run.dur;F.v.position.copy(vp0);F.v.rotation.z=0;F.spd=spd0;F.x=0;});
    // перелёт вбок: транспорт кренится по ходу
    const sway=(x,dur)=>{const x0=F.v.position.x,x1=R0+x;anim(dur,k=>{F.v.position.x=x0+(x1-x0)*CE.inOutSine(k);F.v.rotation.z=-(x1-x0)/dur*0.035*Math.sin(k*Math.PI);});};
    const vx=()=>F.v.position.x-R0;
    const sparkSync=sec=>k5fx(sec,(k,dt)=>{if(Math.random()<dt*30)FX.sparkle(new V3(R0+vx()+rand(-2,2),rand(0,2.4),rand(0,2)),1,0xfff4c0);});
    // выстрел игрока pi по цели o; then — что сделать на месте
    const shoot=(pi,o,then)=>{const col=gor?0xff8a2a:flyCol(pi),h=active(pi),from=gor?headW(pi):h.pos.clone().add(new V3(0,1.6,-0.4));if(!gor)L.hit(h,o.g.position);headFire(pi,o.g.position);k5s('whoosh');shotFx(from,o,col,then);};
    const burst=p=>{K5L.ink(p,12);K5L.gold(p,8);k5s('orbHit');};
    // золотая дорожка: буквы подлетают, транспорт ловит их, ведя по изгибам
    const ribbonRun=sec=>{const items=[];const pts=[{t:0,x:vx()}];for(let i=0;i<8;i++){const z=-26-i*13,x=ribbon(1.2+i*0.95);const o=mkGold(x,z);L.on(()=>obsDel(o));items.push({o,z0:z,x,got:false});pts.push({t:-z/spd,x});}
      anim(sec,k=>{const t=k*sec;let j=0;while(j<pts.length-2&&t>=pts[j+1].t)j++;const a=pts[j],b=pts[Math.min(j+1,pts.length-1)],u=b.t>a.t?clamp((t-a.t)/(b.t-a.t),0,1):1;
        F.v.position.x=R0+a.x+(b.x-a.x)*CE.inOutSine(u);F.v.rotation.z=-(b.x-a.x)*0.012;
        for(const it of items){if(it.o.dead)continue;const z=it.z0+spd*t;it.o.z=z;it.o.g.position.set(R0+it.x,1.5+Math.sin(G.time*3+it.x)*0.2,z);it.o.ring.rotation.z+=0.1;
          if(z>-0.6&&!it.got){it.got=true;K5L.gold(it.o.g.position.clone(),8);k5s('tink');obsDel(it.o);}}});};
    // ель / огненный столб на пути: красный круг виден заранее, транспорт обходит
    const hazardRun=sec=>{const o=(gor?mkPillar:mkTree)(0,-78);L.on(()=>obsDel(o));o.w.visible=true;const z0=-78;
      anim(sec,k=>{const t=k*sec,z=z0+spd*t;o.z=z;const px=R0;
        if(gor){o.g.position.set(px,-8.8,z);o.g.userData.disc.material.opacity=0.45+0.35*Math.sin(G.time*14);if(!o.up&&z>-62){o.up=true;o.g.userData.col.forEach(c=>{c.visible=true;c.scale.y=0.01;});k5s('quake');}
          if(o.up)o.g.userData.col.forEach((c,i)=>{c.scale.y=Math.min(1,c.scale.y+0.06);c.position.y=15*c.scale.y;c.material.opacity=0.7+0.25*Math.sin(G.time*20+i);});}
        else{const kk=clamp((z+105)/45,0,1);o.g.position.set(px,-16+13.5*(kk*kk*(3-2*kk)),z);}
        o.w.position.set(px,0.15,z);o.w.material.opacity=0.45+0.4*Math.sin(G.time*10);if(z>14)obsDel(o);});
      L.later(0.4,()=>sway(5.6,1.5));L.later(sec-1.6,()=>sway(0,1.4));};
    // пара врагов: у каждого кольцо цвета своего игрока
    const foes=()=>{const arr=[];for(const pi of pis){const side=G.solo?-1:(pi?1:-1);const o=mkFoe(pi,side);o.z=-11;o.g.position.set(R0+side*3.6,2.6,-11);o.x=side*3.6;L.on(()=>obsDel(o));arr.push({o,pi});}
      const fl=k5fx(999,()=>{for(const a of arr){if(a.o.dead)continue;const w=a.o.g.userData.wings;if(w)w.forEach((q,j)=>{q.rotation.z=Math.sin(G.time*16)*0.7*(j?1:-1);});a.o.ring.rotation.z+=0.06;a.o.g.position.y=2.6+Math.sin(G.time*4+a.o.side)*0.3;a.o.g.rotation.y=Math.PI;}},()=>{});L.on(()=>{fl.t=fl.dur;});
      return arr;};
    return {sway,vx,sparkSync,shoot,burst,ribbonRun,hazardRun,foes,R0,H,two,pis};}
  E.LES.fly_stupa=L=>{const X=flyLesson(L,false),R0=X.R0,H=X.H,two=X.two,pis=X.pis;let arr=null;
    L.beat(null,{cam:[[R0+9,3.4,8],[R0,0.6,-3]],need:[[R0,1,0.8]],says:[['zven','Ступа летит сама — вы ею рулите.',0.3]]});
    L.beat(7.0,{cam:[[R0,6.8,11.5],[R0,0.8,-8]],need:[H(-5,0.8),H(5,0.8)],says:[['zven','Влево — '+kbd('left')+', вправо — '+kbd('right')+'.',0.2,3.4],two?['zven','Вдвоём в одну сторону — быстрее!',4.0,2.6]:['zven','Ступа слушается сразу.',4.0,2.4]],
      ev:[[0.5,()=>X.sway(-5,1.3)],[2.4,()=>X.sway(5,1.5)],[4.3,()=>X.sway(0,1.0)],[4.6,()=>{if(two)X.sparkSync(2.2);}]]});
    L.beat(6.8,{cam:[[R0,6.5,11],[R0,-1,-14]],need:[H(0,0.8)],says:[['zven','Золотые буквы — ловите! Летите по золотой дорожке.',0.2,4.8]],ev:[[0.2,()=>X.ribbonRun(6.0)]]});
    L.beat(7.0,{cam:[[R0,6.5,11],[R0,-1,-14]],need:[H(0,0.8)],says:[['zven','Чёрные ели — облетайте. Красный круг виден заранее.',0.2,4.6]],ev:[[0.2,()=>X.hazardRun(4.6)]]});
    L.beat(10.0,{cam:[[R0+3,5.4,8.5],[R0,0.4,-8]],need:[[R0-3.6,2.6,-11],[R0+3.6,2.6,-11],H(0,0.8)],
      says:[['zven',two?'Мышь с кольцом вашего цвета — ваша.':'Мышь с кольцом — твоя.',0.2,3.4],['zven',(two?'Каждый жмёт свой удар — '+kboth('attack')+'. ':'Нажми '+kbd('attack')+'. ')+'Выстрел долетит сам.',3.8,3.8]],
      ev:[[0.1,()=>{arr=X.foes();}],[6.0,()=>{for(const a of arr)X.shoot(a.pi,a.o,()=>{X.burst(a.o.g.position.clone());obsDel(a.o);L.ok(active(a.pi));});}]]});
    L.beat(8.4,{cam:[[R0+2,7,13],[R0,1.8,-6]],need:[[R0,3,-14],H(0,0.8)],
      says:[['zven','В конце — туча-паутина.',0.2,2.6],['zven',two?'Бейте разом — '+kboth('attack')+' в один миг!':'Бей: '+kbd('attack')+'!',3.0,3.6]],
      ev:[[0.1,()=>{const B=mkWeb();B.hp=99;L.on(()=>obsDel(B));B.z=-60;B.g.position.set(R0,0,-60);anim(2.4,k=>{B.g.position.z=-60+46*CE.outCubic(k);});
        L.later(5.4,()=>{for(const pi of pis){const h=active(pi);L.hit(h,B.g.position);}bigHit(B);});}]]});
    L.beat(4.6,{cam:[[R0+7,3.2,8],[R0,0.8,0]],need:[[R0,1,0.8]],says:[['zven','Проиграть нельзя: заденете — выпадет буква. Летим!',0.2,4.2]],ev:[[0.2,()=>{for(const pi of pis)L.ok(active(pi));}]]});
    return L;};
  E.LES.fly_gor=L=>{const X=flyLesson(L,true),R0=X.R0,H=X.H,two=X.two,pis=X.pis;let arr=null;
    L.beat(null,{cam:[[R0+14,-1,14],[R0,-3,-2]],need:[[R0,-1,0.8]],says:[['zven','Горыныч летит сам — вы им рулите.',0.3]]});
    L.beat(7.6,{cam:[[R0,7.6,15],[R0,-1,-8]],need:[H(-5,0.8),H(5,0.8)],says:[['zven','Влево — '+kbd('left')+', вправо — '+kbd('right')+'.',0.2,3.4],two?['zven','Вдвоём в одну сторону — быстрее!',4.0,2.6]:['zven','Горыныч слушается сразу.',4.0,2.6]],
      ev:[[0.5,()=>X.sway(-5,1.3)],[2.4,()=>X.sway(5,1.5)],[4.3,()=>X.sway(0,1.0)],[4.6,()=>{if(two)X.sparkSync(2.4);}]]});
    L.beat(7.0,{cam:[[R0+9,4,12],[R0,-1,-3]],need:[[R0,0,0.5]],
      says:[[ 'zven',two?'Левая голова — Игрока 1, правая — Игрока 2.':'У Горыныча три головы.',0.2,4.0],['zven','Средняя дышит огнём, когда бьёте разом.',4.4,2.4]],
      ev:[[1.0,()=>{const h=flHead(0);k5Flash(headW(0),flyCol(0),4,0.6);}],[2.4,()=>{if(two)k5Flash(headW(1),flyCol(1),4,0.6);}],[4.8,()=>{k5Flash(headW(null),0xffd76a,4,0.6);}]]});
    L.beat(6.8,{cam:[[R0,11,17],[R0,-4,-12]],need:[[R0,0,0.5]],says:[['zven','Золотые буквы — ловите! Летите по золотой дорожке.',0.2,4.8]],ev:[[0.2,()=>X.ribbonRun(6.0)]]});
    L.beat(7.0,{cam:[[R0,11,17],[R0,-4,-12]],need:[[R0,0,0.5]],says:[['zven','Огненные столбы — облетайте. Красный круг виден заранее.',0.2,4.8]],ev:[[0.2,()=>X.hazardRun(4.8)]]});
    L.beat(10.0,{cam:[[R0,11,17],[R0,-4,-12]],need:[[R0-3.6,2.6,-11],[R0+3.6,2.6,-11],[R0,0,0.5]],
      says:[['zven',two?'Змей-коршун с кольцом вашего цвета — ваш.':'Змей-коршун — твой.',0.2,3.8],['zven',(two?'Каждый жмёт свой удар — '+kboth('attack')+'. ':'Нажми '+kbd('attack')+'. ')+'Голова плюнет огнём.',4.2,3.8]],
      ev:[[0.1,()=>{arr=X.foes();}],[6.2,()=>{for(const a of arr)X.shoot(a.pi,a.o,()=>{X.burst(a.o.g.position.clone());obsDel(a.o);});}]]});
    L.beat(8.0,{cam:[[R0,13,20],[R0,-3,-14]],need:[[R0,4,-35],[R0,0,0.5]],
      says:[['zven','Ворота Кощея — бейте разом.',0.2,2.6],['zven','Средняя голова дохнёт огнём!',3.2,2.6]],
      ev:[[0.1,()=>{const B=mkGate();L.on(()=>obsDel(B));B.z=-90;B.g.position.set(R0,0,-90);anim(3.2,k=>{B.g.position.z=-90+55*CE.outCubic(k);});
        L.later(4.4,()=>{const from=headW(null),to=B.g.position.clone().add(new V3(0,3,0)),h=flHead(null);h.jaw.rotation.x=0.8;h.g.lookAt(to);h.lookT=0.9;L.later(0.8,()=>{h.jaw.rotation.x=0;});
          for(let i=0;i<7;i++)L.later(i*0.07,()=>shotFx(from.clone(),{g:{position:to}},i%2?0xffe080:0xff7a20,null));
          L.later(0.6,()=>{FX.sparks(to,24,0xffa040);k5Flash(to,0xffa040,5,0.4);K5L.ink(to,30);anim(0.6,k=>{B.g.scale.set(1,Math.max(0.01,1-k),1);B.g.position.y=-k*4;});});});}]]});
    L.beat(13.0,{cam:[[R0+7,9,9],[R0,4,-24]],need:[[R0,6,-24]],
      says:[['zven','В конце — Чудо-юдо.',0.2,2.4],['zven',two?'Гасите глаза своего цвета —':'Гаси оба глаза —',2.8,2.8],['zven','потом бейте разом в пасть!',6.2,2.8]],
      ev:[[0.1,()=>{const S=mkSerp();L.on(()=>{S.dead=true;obsDel(S);for(const e of S.eyes)e.dead=true;});S.g.position.set(R0,0,-120);S.hd.rotation.y=0;anim(2.4,k=>{S.g.position.z=-120+96*CE.outCubic(k);});
        L.later(3.4,()=>{S.eyes.forEach((e,i)=>{const pi=e.owner,hits=(two?2:1);for(let j=0;j<hits;j++)L.later(j*0.9+i*0.35,()=>{const tp=e.m.getWorldPosition(new V3());shoot2(pi,tp,()=>{if(j===hits-1)eyeShut(e);else FX.sparks(tp,10,0xffd060);});});});});
        L.later(8.0,()=>{S.jaw.rotation.x=0.6;S.mouth.material.opacity=0.85;k5s('reveal');});
        L.later(9.6,()=>{const from=headW(null),to=S.mouth.getWorldPosition(new V3()),h=flHead(null);h.jaw.rotation.x=0.8;h.g.lookAt(to);h.lookT=0.9;L.later(0.8,()=>{h.jaw.rotation.x=0;});
          for(let i=0;i<7;i++)L.later(i*0.07,()=>shotFx(from.clone(),{g:{position:to}},i%2?0xffe080:0xff7a20,null));
          L.later(0.6,()=>{FX.sparks(to,24,0xffa040);k5Flash(to,0xffa040,5,0.4);K5L.ink(to,40);anim(1.0,k=>{S.g.position.y=-k*14;});});});}]]});
    L.beat(4.6,{cam:[[R0+14,-1,14],[R0,-3,-2]],need:[[R0,-1,0.8]],says:[['zven','Проиграть нельзя: заденете — выпадет буква. Летим!',0.2,4.2]],ev:[[0.2,()=>{for(const pi of pis)L.ok(active(pi));}]]});
    function shoot2(pi,tp,then){const h=flHead(pi);h.jaw.rotation.x=0.7;L.later(0.35,()=>{h.jaw.rotation.x=0;});h.g.lookAt(tp);h.lookT=0.5;k5s('whoosh');shotFx(headW(pi),{g:{position:tp}},0xff8a2a,then);}
    return L;};
  // ---------- поездка на ките и на гусях (три дорожки): E.LES.ride вызывает rideStart (p9_pages) ----------
  E.LES.ride=L=>{const R=RIDE,R0=RIDE_X,kind=R.kind,two=!G.solo,pis=two?[0,1]:[0],lx=l=>R0+RLANES[l],H=(dx,dz)=>[R0+dx,1,dz],COLS=[COL.p1,COL.p2];
    R.mk.forEach((m,pi)=>{m.position.set(lx(R.lane[pi]),-0.4,-12);m.visible=!(G.solo&&pi===1);});
    const run=k5fx(999,(k,dt)=>{for(const m of R.dec){m.position.z+=dt*26;if(m.position.z>30){m.position.z-=290;m.position.x=R0+rand(-40,40);}}R.v.position.y=Math.sin(G.time*1.6)*0.25;},()=>{});L.on(()=>{run.t=run.dur;R.v.position.y=0;});
    const mkTo=(pi,lane,sec)=>{const m=R.mk[pi],x0=m.position.x,x1=lx(lane);anim(sec,k=>{m.position.x=x0+(x1-x0)*CE.inOutSine(k);});};
    const thr=(tp,lane,z)=>{const g=L.add(new THREE.Group());g.position.set(lx(lane),tp==='B'?2.2:1.0,z);
      if(tp==='L')g.add(K5L.textSpr('Ж',1.6,{w:128,h:128,col:'#ffd76a',glow:'#ffb030',weight:'italic 700 '}));
      else if(tp==='A'){addMesh(new THREE.SphereGeometry(0.5,8,6),K5L.INKM,0,0,0,g);const wg=new THREE.Group();g.add(wg);addMesh(new THREE.BoxGeometry(2.2,0.08,0.6),M(0x101014),0,0.1,0,wg);g.userData.w=wg;}
      else{for(let i=0;i<4;i++)addMesh(new THREE.SphereGeometry(rand(0.9,1.5),8,6),new THREE.MeshLambertMaterial({color:0x3a3448,emissive:0x1a0a2a}),rand(-1.2,1.2),rand(-0.4,0.6),rand(-0.8,0.8),g);}
      K5L.noRay(g);return g;};
    const mv=(g,z0,z1,sec,done)=>anim(sec,k=>{g.position.z=z0+(z1-z0)*k;if(g.userData.w)g.userData.w.rotation.z=Math.sin(G.time*16)*0.6;if(k>=1&&done)done();});
    const fire=(pi,lane,z1,done)=>{const b=L.add(new THREE.Mesh(new THREE.SphereGeometry(0.5,8,6),k5Add(COLS[pi],{opacity:0.95})));b.position.set(lx(lane),0.6,-3);L.hit(active(pi));k5s('whoosh');anim(0.5,k=>{b.position.z=-3+(z1+3)*k;if(k>=1){b.visible=false;if(done)done();}});};
    const kill=g=>{g.visible=false;K5L.ink(g.position.clone(),8);K5L.gold(g.position.clone(),6);k5s('orbHit');};
    const CAM=[[R0,3.8,6],[R0,0.8,-10]];
    L.beat(null,{cam:[[R0+7,3.6,8],[R0,0.4,-4]],need:[H(0,0)],says:[['zven',kind==='kit'?'Кит несёт нас домой — мир летит навстречу.':'Гуси-лебеди несут нас домой — мир летит навстречу.',0.3]]});
    L.beat(8.4,{cam:CAM,need:[[lx(0),0,-12],[lx(2),0,-12],H(0,0)],
      says:[['zven',two?'Ваши круги стоят на дорожках — по кругу у каждого.':'Твой круг стоит на одной из трёх дорожек.',0.2,3.8],['zven','Влево — '+kbd('left')+', вправо — '+kbd('right')+': круг идёт на другую дорожку.',4.2,4.0]],
      ev:[[4.8,()=>{mkTo(0,1,0.4);if(two)mkTo(1,1,0.4);}],[6.0,()=>{mkTo(0,2,0.4);if(two)mkTo(1,0,0.4);}],[7.2,()=>{mkTo(0,0,0.4);if(two)mkTo(1,2,0.4);}]]});
    L.beat(8.0,{cam:CAM,need:[[lx(0),0,-12],[lx(2),0,-12],H(0,0)],
      says:[['zven','Золотые буквы — ловите: встаньте кругом на их дорожку.',0.2,5.0]],
      ev:[[0.1,()=>{const g=thr('L',1,-34);mv(g,-34,2,2.2,()=>{g.visible=false;K5L.gold(new V3(lx(1),1,0),10);k5s('tink');});L.later(0.4,()=>mkTo(0,1,0.8));}],[3.8,()=>{const g=thr('L',2,-34);mv(g,-34,2,2.2,()=>{g.visible=false;K5L.gold(new V3(lx(2),1,0),10);k5s('tink');});L.later(0.4,()=>mkTo(0,2,0.8));}]]});
    // тёмное летит по дорожке; выстрел игрока pi сбивает его на полпути
    const wave=(tp,lane,pi,t0)=>L.later(t0,()=>{const g=thr(tp,lane,-34);mv(g,-34,2,2.2);L.later(0.45,()=>fire(pi,lane,-18,()=>kill(g)));});
    L.beat(11.4,{cam:CAM,need:[[lx(0),0,-12],[lx(2),0,-12],H(0,0)],
      says:[['zven',two?'Тёмных летучек сбивает Игрок 1: '+K(0,'attack')+',':'Тёмных летучек и тучи — бей '+K(0,'attack')+':',0.2,3.6],two?['zven','тёмные тучи — Игрок 2: '+K(1,'attack')+'.',3.9,3.2]:['zven','выстрел летит по дорожке твоего круга.',3.9,3.4],['zven','Выстрел летит по дорожке круга.',7.6,3.0]],
      ev:[[0.1,()=>{mkTo(0,0,0.4);if(two)mkTo(1,2,0.4);}],[0.5,()=>wave('A',0,0,0)],[5.0,()=>wave('B',two?2:0,two?1:0,0)]]});
    L.beat(4.6,{cam:[[R0+6,3.6,8],[R0,0.6,-2]],need:[H(0,0)],says:[['zven','Проиграть нельзя — не уберегли, потеряли лепесток. Вперёд!',0.2,4.2]],ev:[[0.2,()=>{for(const pi of pis)L.ok(active(pi));}]]});
    return L;};
