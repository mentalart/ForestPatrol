// ---- продолжение build5B2 (k5epic, часть 14): АКТ III — стадии 8 (буря), 9 (витязи), 10 (Цепной великан) ----
  /* ================= стадия 8 «Колдун несёт богатыря»: прежняя буря + гроза, похищение, друзья в бурю ================= */
  // Буря прежняя (полёт, тёмные шары другу и в небо, вороны, иглы, воронка, щитники) — и сверху: ливень и тучи кругом (эффекты 2-Б
  // и 3-Б), молнии в красные круги. Кощей пикирует и уносит героя (лиловый круг — кувырок спасает): схваченный висит в кулаке, над ним
  // тает кольцо-таймер; удары схваченного — вырывается (таймер быстрее). Спасти: тёмный шар другу — тот отбивает Кощею в лицо;
  // Жар-птица (если свободна) — встань в её золотой круг: клюнет кулак. Не успели — бросит с высоты. Друзья в бурю: Яга на ступе
  // метлой сметает круги игл, Водяной открывает родник живой воды (лепесток), Горыныч жжёт воронов, колокол Соловья сдувает Кощея.
  // Атлас: grab + rescue (co-op), mash-to-escape, marked-area-strike (молнии), ally assists (cleanse, heal), environment. Бот — tk5e_s8.
  const gorFly=makeGorynych5(1);gorFly.g.scale.setScalar(0.9);gorFly.g.visible=false;K5L.noRay(gorFly.g);
  const grabRing=k5Prop(new THREE.Mesh(new THREE.TorusGeometry(0.7,0.07,6,40),k5Add(0xc080ff,{opacity:0})));grabRing.raycast=()=>{};
  const zhCircle=k5Prop(new THREE.Mesh(new THREE.RingGeometry(1.2,1.45,40),k5Add(0xffc040,{opacity:0})));zhCircle.rotation.x=-Math.PI/2;zhCircle.raycast=()=>{};
  const spring8=k5Prop(new THREE.Group());{const d=new THREE.Mesh(new THREE.CircleGeometry(1.3,32),k5Add(0x7ad8ff,{opacity:0.5}));d.rotation.x=-Math.PI/2;spring8.add(d);
    const r=new THREE.Mesh(new THREE.RingGeometry(1.25,1.45,32),k5Add(0xcff8ff,{opacity:0.9}));r.rotation.x=-Math.PI/2;r.position.y=0.02;spring8.add(r);spring8.visible=false;}
  const stupa8=makeStupa();stupa8.g.visible=false;K5L.noRay(stupa8.g);
  function grabTry(){const hs=k5Heroes();if(!hs.length||ES.grab||ES.gz)return;ES.gz=true;const h=hs[Math.floor(rand(0,hs.length))];const p=h.pos.clone();barkS(KS,'koschei','А этого — в тучи! Через леса, через моря!',1.6,true);
    k5Zone(p,1.7,G.solo?1.9:1.4,0xc040ff,q=>{ES.gz=false;if(E.cur!==8||!K5.fight||ES.grab)return;const t=k5Heroes().find(x=>hd(x.pos,q)<1.8&&x.rollT<=0&&G.time-(x.lastRoll||-9)>0.3);if(!t){floatText(q.clone().add(new V3(0,2,0)),'Увернулся!','#9fe0ff');return;}
      const lim=G.solo?6.5:9;ES.grab={h:t,t:0,lim,mash:0};E.log('grab');k5s('flyUp');floatText(t.pos.clone().add(new V3(0,2,0)),'Унёс!','#c8a8ff');grabRing.material.opacity=0.9;
      
      if(E.free.zhar){const o=k5Heroes().find(x=>x!==t)||null;ES.zh={t:0,on:0,p:inArena(C.clone().add(new V3(rand(-4,4),0,rand(1,5))),1.5)};zhCircle.position.set(ES.zh.p.x,0.08,ES.zh.p.z);}
      const other=k5Heroes().find(x=>x!==t);if(other&&!K5.orbs.length)later(1.2,()=>{if(ES.grab&&K5.fight)orbThrow(other);});});}
  function grabTick(dt){const G0=ES.grab;if(!G0)return;G0.t+=dt;const h=G0.h,hand=KB.pos.clone().add(new V3(0.8,2.2,0.6));h.pos.copy(hand);h.vel.set(0,0,0);h.grounded=false;
    const left=Math.max(0,1-(G0.t+G0.mash)/G0.lim);grabRing.position.copy(hand).add(new V3(0,1.9,0));grabRing.scale.setScalar(0.4+left);grabRing.rotation.x=Math.PI/2;grabRing.material.color.set(left<0.3?0xff4060:0xc080ff);
    if(K5.log.length&&K5.log[K5.log.length-1]==='orbhit'&&K5.log.length!==G0.lg){G0.lg=K5.log.length;release(true,'Кощею в лицо!');return;}
    if(G0.mash>=G0.lim*0.5){release(true,'Вырвался!');return;}
    // Жар-птица: друг в золотом круге — клюёт кулак (одному — сама, через 3,5 с)
    const Z=ES.zh;if(Z){Z.t+=dt;const on=G.solo?Z.t>3.5:k5Heroes().some(x=>x!==h&&hd(x.pos,Z.p)<1.4);Z.on=on?Z.on+dt:Math.max(0,Z.on-dt);zhCircle.material.opacity=0.55+0.4*Math.sin(G.time*8);
      const zh=FR.zhar.m;zh.g.visible=true;const tgt=on?hand.clone().lerp(new V3(Z.p.x,6,Z.p.z),1-Math.min(1,Z.on/1.2)):new V3(Z.p.x,6+Math.sin(G.time*2)*0.4,Z.p.z);zh.g.position.lerp(tgt,Math.min(1,dt*4));
      if(Z.on>=1.2){release(true,'Жар-птица клюнула!');E.log('zhPeck');return;}}
    if(G0.t+G0.mash>G0.lim||players[h.player].downed){release(false);}}
  function release(caught,txt){const h=ES.grab.h;ES.grab=null;ES.zh=null;grabRing.material.opacity=0;zhCircle.material.opacity=0;if(FR.zhar.free)anim(0.8,k=>{FR.zhar.m.g.position.y+=k*0.2;});
    if(caught){floatText(h.pos.clone().add(new V3(0,1.6,0)),(txt?txt+' ':'')+'Жар-птица поймала!','#ffd060');const f=h.pos.clone(),to=new V3(C.x+rand(-3,3),0,C.z+4);K5L.gold(f,14);
      anim(1.0,k=>{h.pos.lerpVectors(f,to,CE.inOutSine(k));h.pos.y=f.y*(1-k)+Math.sin(k*Math.PI)*1.5;h.vel.set(0,0,0);});later(1.02,()=>placeOnGround(h,to.x,to.z,0));E.log('caught');
      if(K5.live&&KB.state!=='broken'){K5.dip=1.6;emberOut(KB,1,'Выпустил!');}}
    else{damageHero(h,{kind:'hazard',ref:{pos:h.pos.clone().add(new V3(0,1,0))}});placeOnGround(h,h.pos.x,h.pos.z,0);floatText(h.pos.clone().add(new V3(0,1.6,0)),'Бросил!','#ff9ab8');E.log('dropped');}}
  // молния в красный круг
  function bolt8(){const hs=k5Heroes().filter(h=>h!==(ES.grab&&ES.grab.h));if(!hs.length)return;const h=hs[Math.floor(rand(0,hs.length))];const at=inArena(new V3(h.pos.x+h.vel.x*0.3,0,h.pos.z+h.vel.z*0.3),1);
    if(FIN.k2fx)FIN.k2fx.tele(at.x,0.02,at.z,1.5,1.3,'red');later(1.3,()=>{if(E.cur!==8||!K5.fight)return;if(FIN.k2fx){FIN.k2fx.lightning(at.clone());FIN.k2fx.flash(0.8);}k5s('thunder');shakeAll(0.06,0.3);
      FX.sparks(at.clone().add(new V3(0,0.4,0)),18,0xcfe0ff);for(const q of k5Heroes())if(hd(q.pos,at)<1.6&&q.rollT<=0&&q!==(ES.grab&&ES.grab.h))k5Hurt(q,at);E.log('bolt8');});}
  // Яга на ступе: пролетает и метлой сметает круги игл
  function yagaSweep(){const zs=(K5.zones||[]).filter(z=>z.userData&&!z.userData.dead);ES.yagaT=G.solo?12:15;const a=rand(0,6.28),f=new V3(C.x+Math.cos(a)*16,3.4,C.z+Math.sin(a)*12),to=new V3(C.x-Math.cos(a)*16,3.4,C.z-Math.sin(a)*12);
    stupa8.g.visible=true;stupa8.g.position.copy(f);stupa8.g.rotation.y=Math.atan2(to.x-f.x,to.z-f.z);barkS(stupa8,'yaga','Кыш, иглы! Метлой вас!',1.6,true);E.log('yaga8');
    k5fx(2.2,k=>{stupa8.g.position.lerpVectors(f,to,k);stupa8.g.position.y=3.4+Math.sin(k*Math.PI)*0.8;if(Math.random()<0.5)FX.dust(stupa8.g.position.clone().add(new V3(0,-1,0)),2,0xd8c8a8);
      for(const z of K5.zones||[]){if(z.userData.dead)continue;const d=Math.hypot(z.position.x-stupa8.g.position.x,z.position.z-stupa8.g.position.z);if(d<5){z.userData.dead=true;z.visible=false;K5L.gold(z.position.clone().add(new V3(0,0.4,0)),6);}}},()=>{stupa8.g.visible=false;});}
  function springOpen(){ES.spT=G.solo?13:16;const p=inArena(C.clone().add(new V3(rand(-6,6),0,rand(-1,6))),1.5);spring8.position.set(p.x,0.06,p.z);spring8.visible=true;ES.sp={p,t:0,used:new Set()};
    if(FIN.k2fx)FIN.k2fx.column(p.x,0,p.z,3,1,0.9);E.log('spring8');}
  E.layer[8]={start(){ES.grabT=G.solo?18:14;ES.grab=null;ES.gz=false;ES.zh=null;ES.dark=true;ES.boltT=6;ES.yagaT=9;ES.spT=12;ES.sp=null;gorFly.g.visible=E.free.gor;gor.g.visible=!E.free.gor;spring8.visible=false;
      if(FIN.k2fx){FIN.k2fx.rain(true,{c:new V3(C.x,0,C.z)});}const W3=FIN.k3fx;if(W3){if(W3.cloudRing&&!W3.cl)W3.cloudRing(new V3(C.x,0,C.z),{r0:16,r1:26,y0:2,y1:9,n:22});if(W3.windOn){W3.windOn(new V3(C.x,0,C.z),12);W3.windSet('swirl',0.35);}}
      K5X.motes('ink',new V3(C.x,0,C.z),13,90,7);
      E.onWhistle=()=>{if(E.cur===8&&K5.live&&KB.state!=='broken'){K5.dip=2.5;emberOut(KB,1,'Сдуло!');k5StormSet(Math.max(0.4,K5.storm-0.2));if(FIN.k3fx&&FIN.k3fx.cl)FIN.k3fx.cl.tear(0.8,1.5);}};},
    tick(dt){if(!K5.fight)return;grabTick(dt);if(!ES.grab&&KB.state==='k5cast'){ES.grabT-=dt;if(ES.grabT<=0){ES.grabT=G.solo?20:17;grabTry();}}
      if(FIN.k3fx&&FIN.k3fx.windSet)FIN.k3fx.windSet('swirl',0.25+0.5*K5.storm);
      if(K5.storm>0.5&&KB.state!=='broken'){ES.boltT-=dt;if(ES.boltT<=0){ES.boltT=G.solo?7.5:5.5;bolt8();}}
      if(E.free.yaga){ES.yagaT-=dt;if(ES.yagaT<=0&&(K5.zones||[]).length)yagaSweep();}
      if(E.free.vod){ES.spT-=dt;if(ES.spT<=0&&!ES.sp)springOpen();const P=ES.sp;if(P){P.t+=dt;spring8.rotation.y+=dt;spring8.children[1].scale.setScalar(1+0.08*Math.sin(G.time*6));
          for(const h of k5Heroes())if(!P.used.has(h)&&hd(h.pos,P.p)<1.35){P.used.add(h);const pl=players[h.player];if(pl.petals<3){pl.petals++;floatText(h.pos.clone().add(new V3(0,2.2,0)),'+лепесток','#9fe8ff');}K5L.gold(h.pos.clone().add(new V3(0,1,0)),8);}
          if(P.t>5){ES.sp=null;spring8.visible=false;}}}
      if(E.free.gor){const a=G.time*0.35;gorFly.g.position.set(C.x+Math.cos(a)*14,11,C.z+Math.sin(a)*10);gorFly.g.rotation.y=-a;ES.burnT=(ES.burnT||6)-dt;
        if(ES.burnT<=0){ES.burnT=G.solo?6:8;const r=K5.adds.find(e=>e.kind==='k5raven'&&e.alive);if(r){const p=r.pos.clone();k5Pillar(p.clone().setY(0),0xff8a30,8,0.6,0.6);FX.sparks(p.clone().add(new V3(0,1,0)),16,0xff8a30);k5Kill(r);floatText(p.clone().add(new V3(0,2,0)),'Горыныч!','#ffb060');}}}},
    attack(h){if(E.cur!==8||!ES.grab||ES.grab.h!==h)return;ES.grab.mash+=G.solo?0.6:0.55;shakeAll(0.03,0.12);FX.sparks(h.pos.clone().add(new V3(0,1.2,0)),6,0xffffff);floatText(h.pos.clone().add(new V3(rand(-0.4,0.4),2.2,0)),'Пусти!','#ffe08a');},
    end(){if(ES.grab)release(false);gorFly.g.visible=false;gor.g.visible=true;E.onWhistle=null;spring8.visible=false;stupa8.g.visible=false;grabRing.material.opacity=0;zhCircle.material.opacity=0;
      if(FIN.k2fx)FIN.k2fx.rain(false);if(FIN.k3fx&&FIN.k3fx.windSet)FIN.k3fx.windSet('swirl',0);}};
  /* ---------- обучающая катсцена стадии 8: шар другу и в небо, красные круги, вороны, унёс — выручай, друзья, нить ---------- */
  E.LES[8]=L=>{const po=T.potap,pr=T.proshka,pe=T.pelageya,yo=T.yosha,H=(x,z)=>[x,0.9,z],kp=()=>KS.g.position.clone().add(new V3(0,2.4,0)),pips=L.pips(6);pips.g.visible=false;
    const KFace=h=>{KS.g.rotation.y=Math.atan2(h.pos.x-KS.g.position.x,h.pos.z-KS.g.position.z);};
    L.on(()=>{grabRing.material.opacity=0;zhCircle.material.opacity=0;spring8.visible=false;stupa8.g.visible=false;FR.zhar.m.g.visible=false;gorFly.g.visible=E.free.gor;});
    L.put(po,-3,-8.4);L.put(pr,-1,-8);L.put(pe,1,-8);L.put(yo,3,-8.4);KS.g.visible=true;KS.g.position.set(C.x,5.4,C.z-4);
    L.beat(3.6,{cam:[[0,11.5,6],[0,3.2,-12],[0,10,3],[0,3.2,-12]],need:[H(-3,-8.4),H(3,-8.4),[0,6,-17]],says:[['zven','Кощей в тучах — шаром не достать!',0.2,3.0]],ev:[[1.0,()=>L.pose('cast',{antic:0.3})],[2.2,()=>{k5Flash(kp(),0xc080ff,5,0.6);}]]});
    // шар другу, друг — в небо
    L.beat(7.4,{cam:[[0,10.5,5],[0,3.2,-12]],need:[H(-3.4,-9.6),H(3.4,-9.6),[0,6,-17]],says:[['zven','Щит '+kbd('guard')+' — в последний миг!',0.2,2.8],['zven','Друг отбивает шар — в Кощея!',3.4,3.2]],
      ev:[[0,()=>{pips.g.visible=true;L.put(po,-3.4,-9.6);L.put(pe,3.4,-9.6);KFace(po);}],[0.4,()=>L.pose('castR',{antic:0.25})],
        ...L.parry(0.8,po,kp(),{dur:2.2,back:0.01,col:0x7a30c8,then:()=>{}}).slice(0,2),
        [3.0,()=>{L.guard(po,0.8);SFX.parry();FX.sparks(hH(po).add(new V3(0,0.2,0.3)),14,0xffe08a);L.orb(hH(po),hH(pe),1.1,{col:0xffe08a,r:0.3,dark:false,arc:1.4,on:()=>{}});}],
        [3.9,()=>{L.look(pe,po.pos);L.guard(pe,0.8);}],[4.1,()=>{SFX.parry();FX.sparks(hH(pe).add(new V3(0,0.2,0.3)),14,0xffe08a);L.orb(hH(pe),kp(),1.2,{col:0xffe08a,r:0.34,dark:false,arc:2.2,on:p=>{L.pose('recoil',{snap:true});k5Flash(p,0xffe08a,4,0.4);FX.sparks(p,14,0xffd76a);pips.out();SFX.brk();}});}],[6.8,()=>{L.pose('idle');}]]});
    L.beat(2.6,{cam:[[0,10.5,5],[0,2.4,-11]],need:[H(0,-8)],says:[['zven','Понятно? Тогда — в бой!',0.2,2.2]],ev:[[0.2,()=>{L.pose('idle');pips.g.visible=false;[po,pe].forEach(h=>L.emo(h,'cheer'));}]]});
  };
  /* ================= стадия 9 «И тридцать витязей прекрасных»: прежний меч + витязи из моря, знамёна Заставы ================= */
  // Прежний меч (серии, «око», прыжок с волной, костяные щитники). Сверху: на заре из моря выходят тридцать витязей — ряды встают из
  // волн с пеной и идут по берегу в строй по флангам; строй ведут Илья, Добрыня и Алёша, с ними дядька морской — Водяной. Знамёна
  // Заставы: трубит рог — у каждого знамени герой (одному — у одного): Богатырский мах — золотая волна сметает костяных щитников и
  // рубак, Кощей теряет уголёк. Кости-рубаки лезут из трещин к знамёнам и рубят древко (замах — красный круг): удар — рассыпались;
  // знамя упало — подними (предмет у знамени); лежит знамя — строй не пойдёт. Водяной (если свободен) после маха пускает вал.
  // Атлас: defend-objective, summon (рубаки), telegraph, co-op positions, ally charge, environment. Бот — tk5e_s9.
  const BAN=[new V3(-8.6,0,-12.5),new V3(8.6,0,-12.5)];
  const banners=BAN.map((p,i)=>{const g=k5Prop(new THREE.Group());g.position.copy(p);const pole=new THREE.Group();g.add(pole);addMesh(new THREE.CylinderGeometry(0.07,0.07,3.4,6),M(0x6a4a2a),0,1.7,0,pole);
    const fl=addMesh(new THREE.PlaneGeometry(1.4,1.0,6,1),M(i?0x2a5ab8:0xb83a2a,{side:THREE.DoubleSide,emissive:i?0x0a1a40:0x400a0a}),0.72,2.9,0,pole);addMesh(new THREE.SphereGeometry(0.12,8,6),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.5}),0,3.45,0,pole);
    const sun=addMesh(new THREE.CircleGeometry(0.28,16),MB(0xffd76a,{side:THREE.DoubleSide}),0.72,2.9,0.01,pole);
    const r=new THREE.Mesh(new THREE.RingGeometry(1.4,1.7,32),k5Add(0xffd76a,{opacity:0.5}));r.rotation.x=-Math.PI/2;r.position.y=0.06;g.add(r);g.visible=false;K5L.noRay(g);
    return {g,pole,fl,r,i,hp:3,down:false};});
  const VIT=[];{const kinds=['i','d','a'];for(let i=0;i<9;i++){const b=makeBogatyr(kinds[i%3]);b.g.scale.setScalar(i<3?1.15:0.9);b.g.visible=false;K5L.noRay(b.g);VIT.push(b);}}
  // ещё двадцать один витязь — строем по флангам (облик попроще)
  const KN=[];{const mail=M(0x9aa4b0),gold=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.3}),red=M(0xb83a2a),wood=M(0x6a4a2a);const bodyG=new THREE.CylinderGeometry(0.34,0.42,1.3,8),headG=new THREE.SphereGeometry(0.24,8,6),helmG=new THREE.ConeGeometry(0.27,0.55,8),shG=new THREE.CircleGeometry(0.5,12),spG=new THREE.CylinderGeometry(0.03,0.03,2.6,5);
    for(let i=0;i<21;i++){const g=k5Prop(new THREE.Group());addMesh(bodyG,mail,0,0.85,0,g);addMesh(headG,M(0xe8c8a8),0,1.72,0,g);addMesh(helmG,gold,0,2.0,0,g);const sh=addMesh(shG,red,0,1.0,0.42,g);sh.material=new THREE.MeshLambertMaterial({color:0xb83a2a,side:THREE.DoubleSide});
      addMesh(spG,wood,0.45,1.4,0.1,g);addMesh(new THREE.ConeGeometry(0.07,0.3,4),M(0xd8d8e0),0.45,2.8,0.1,g);g.visible=false;K5L.noRay(g);KN.push({g,home:null,sea:null});}}
  function vitLine(on){VIT.forEach((b,i)=>{b.g.visible=on;const s=i%2?1:-1,k=Math.floor(i/2),x=s*(12.6+(k%2)*1.4),z=-9+k*2.6;b.home=new V3(x,0,z);b.g.position.set(x,0,z);b.g.rotation.y=s>0?-Math.PI/2:Math.PI/2;});
    KN.forEach((n,i)=>{const s=i%2?1:-1,k=Math.floor(i/2),row=k%3,col=Math.floor(k/3);n.home=new V3(s*(15.2+row*1.5),0,-21+col*3.2);n.sea=new V3(s*(27+row*1.5),-2.2,-21+col*3.2);n.g.visible=on;n.g.rotation.y=s>0?-Math.PI/2:Math.PI/2;});}
  // выход из моря: ряды встают из волн с пеной и идут в строй
  function vitEnter(){KN.forEach((n,i)=>{n.g.position.copy(n.sea);const d=0.25*(i%7);later(d,()=>{if(E.cur!==9)return;if(FIN.k2fx)FIN.k2fx.crown(new V3(n.sea.x,-0.5,n.sea.z),0.8);
      anim(2.6,k=>{n.g.position.lerpVectors(n.sea,n.home,CE.outCubic(k));n.g.position.y=lerp(-2.2,0,Math.min(1,k*2));});});});
    VIT.forEach((b,i)=>{const s=i%2?1:-1,f=new V3(s*26,-2,b.home.z);b.g.position.copy(f);later(0.4+0.2*i,()=>{if(E.cur!==9)return;if(FIN.k2fx)FIN.k2fx.crown(new V3(f.x,-0.5,f.z),1);anim(2.4,k=>{b.g.position.lerpVectors(f,b.home,CE.outCubic(k));b.g.position.y=lerp(-2,0,Math.min(1,k*2));});});});
    }
  function vitCharge(){E.log('vitCharge');SFX.horn&&SFX.horn();say('ilya','За Лукоморье! Богатырским махом — разом!',2.2,true);
    VIT.forEach((b,i)=>{const f=b.home.clone(),to=new V3(C.x+(i-4)*1.6,0,C.z+1);anim(0.9,k=>{b.g.position.lerpVectors(f,to,CE.inOutSine(k));});later(1.0,()=>{anim(1.2,k=>{b.g.position.lerpVectors(to,f,CE.inOutSine(k));});});});
    KN.forEach(n=>{const f=n.home.clone(),to=f.clone().lerp(new V3(C.x,0,f.z),0.35);anim(0.8,k=>{n.g.position.lerpVectors(f,to,CE.inOutSine(k));});later(1.0,()=>{anim(1.0,k=>{n.g.position.lerpVectors(to,f,CE.inOutSine(k));});});});
    later(0.9,()=>{shakeAll(0.08,0.4);for(const b of banners)K5X.shock(b.g.position,14,11,0xffd76a,{h:1.4,onHit:()=>{}});for(const e of K5.adds.slice())if(e.kind==='k5bone'&&e.alive){FX.dust(e.pos.clone(),10,0xe8e0c8);k5Kill(e);}
      ES.rub.slice().forEach(R=>rubPop(R,true));if(K5.live&&KB.state!=='broken')emberOut(KB,1,'Витязи!');});
    if(E.free.vod)later(1.6,()=>{if(E.cur!==9||!FIN.k2fx||!FIN.k2fx.val)return;if(!ES.val){ES.val=FIN.k2fx.val(26,2.8,{alpha:0.85,debris:false});}const VA=ES.val;VA.root.visible=true;VA.set(C.x,-0.2,C.z+16,Math.PI);
      say('vod','А ну, волна — подсоби витязям!',1.6,true);k5s('gale');k5fx(1.8,(k,dt)=>{VA.root.position.z=C.z+16-k*34;VA.tick(dt||1/60);},()=>{VA.root.visible=false;});E.log('vodWave');});}
  // кости-рубаки: лезут к знамени и рубят древко
  function rubMake(bi){const B=banners[bi],a=rand(0,6.28),p=B.g.position.clone().add(new V3(Math.cos(a)*7,0,Math.sin(a)*5));p.x=clamp(p.x,-10,10);const g=k5Prop(new THREE.Group());g.position.copy(p);
    const bone=M(0xe8e0c8),dk=MB(0x1a1018);part(g,new THREE.SphereGeometry(0.26,8,6),bone,0,1.75,0);for(const s of[-1,1])part(g,new THREE.SphereGeometry(0.05,5,4),MB(0xff4060),s*0.09,1.78,0.22);
    for(let k=0;k<4;k++)part(g,new THREE.TorusGeometry(0.24-k*0.02,0.03,4,10),bone,0,1.4-k*0.15,0).rotation.x=Math.PI/2;part(g,new THREE.CylinderGeometry(0.04,0.04,1.1,5),bone,0,1.0,0);
    const arm=new THREE.Group();arm.position.set(0.3,1.45,0);g.add(arm);part(arm,new THREE.CylinderGeometry(0.035,0.035,0.7,5),bone,0,-0.3,0);const ax=part(arm,new THREE.BoxGeometry(0.06,0.5,0.3),dk,0,-0.7,0.12);
    for(const s of[-1,1])part(g,new THREE.CylinderGeometry(0.04,0.04,0.9,5),bone,s*0.12,0.45,0);K5L.noRay(g);k5Pillar(p,0x9a60ff,5,0.6,0.8);FX.dust(p.clone(),10,0x8a7a6a);
    const R={g,arm,bi,st:'walk',t:0,hp:G.solo?1:2};ES.rub.push(R);E.log('rub');return R;}
  function rubPop(R,swept){FX.dust(R.g.position.clone(),12,0xe8e0c8);for(let i=0;i<6;i++){const a=rand(0,6.28);fxAdd('tetra',0xe8e0c8,R.g.position.clone().add(new V3(0,1,0)),new V3(Math.cos(a)*3,rand(3,5),Math.sin(a)*3),{s:0.09,life:0.8,g:13,spin:10});}
    k5Del(R.g);if(R.tele)R.tele.userData.dead=true;const i=ES.rub.indexOf(R);if(i>=0)ES.rub.splice(i,1);E.log(swept?'rubSwept':'rubPop');}
  function banFall(B){B.down=true;B.hp=0;k5s('stomp');FX.dust(B.g.position.clone(),16,0x8a7a6a);const s=B.i?-1:1;anim(0.6,k=>{B.pole.rotation.z=s*1.45*CE.outCubic(k);});
    floatText(B.g.position.clone().add(new V3(0,2.4,0)),'Знамя упало!','#ff9ab8');E.log('banFall');}
  function banRaise(B){B.down=false;B.hp=3;const s=B.pole.rotation.z;anim(0.6,k=>{B.pole.rotation.z=s*(1-CE.outBack(k));});later(0.62,()=>{B.pole.rotation.z=0;});K5L.gold(B.g.position.clone().add(new V3(0,2,0)),12);
    floatText(B.g.position.clone().add(new V3(0,3.2,0)),'Знамя поднято!','#ffe08a');E.log('banRaise');}
  E.layer[9]={start(){ES.hornT=12;ES.warn=false;ES.rub=[];ES.rubT=6;banners.forEach(b=>{b.g.visible=true;b.down=false;b.hp=3;b.pole.rotation.z=0;});vitLine(true);vitEnter();
      if(E.free.vod){FR.vod.m.g.visible=true;FR.vod.m.g.position.set(-10,0,9.5);}K5X.rays(new V3(C.x,0,C.z),0xffe0b0,6,{spread:12,op:0.22});K5X.motes('gold',new V3(C.x,0,C.z),13,100,6);
      },
    tick(dt){if(!K5.fight)return;
      banners.forEach((b,i)=>{b.fl.rotation.y=Math.sin(G.time*3+i)*0.3;const at=k5Heroes().some(h=>hd(h.pos,BAN[i])<1.8);b.r.visible=false;});
      ES.hornT-=dt;const warnT=3.2;if(ES.hornT<warnT&&!ES.warn){ES.warn=true;SFX.horn&&SFX.horn();BAN.forEach(p=>floatText(p.clone().add(new V3(0,4,0)),'Рог! К знамёнам!','#ffd76a'));}
      if(ES.hornT<=0){ES.hornT=G.solo?16:13;ES.warn=false;const need=G.solo?1:2,got=banners.filter(b=>!b.down&&k5Heroes().some(h=>hd(h.pos,b.g.position)<1.8)).length;
        if(got>=need&&!banners.some(b=>b.down))vitCharge();else{floatText(C.clone().add(new V3(0,4,4)),banners.some(b=>b.down)?'Знамя лежит — строй не пойдёт!':'Строй отходит!','#ff9ab8');if(K5.adds.filter(e=>e.kind==='k5bone'&&e.alive).length<4)boneMake(C.x+rand(-5,5),C.z+rand(-3,4));}}
      // рубаки
      ES.rubT-=dt;if(ES.rubT<=0){ES.rubT=G.solo?9:6;const up=banners.filter(b=>!b.down);if(up.length&&ES.rub.length<(G.solo?2:3))rubMake(up[Math.floor(rand(0,up.length))].i);}
      for(const R of ES.rub.slice()){R.t+=dt;const B=banners[R.bi],p=R.g.position,bp=B.g.position;const dx=bp.x-p.x,dz=bp.z-p.z,d=Math.hypot(dx,dz)||1;R.g.rotation.y=Math.atan2(dx,dz);
        if(B.down){R.st='walk';const up=banners.find(b=>!b.down);if(up)R.bi=up.i;else{R.arm.rotation.x=Math.sin(G.time*8)*0.3;continue;}}
        if(R.st==='walk'){R.arm.rotation.x=Math.sin(G.time*8)*0.4;if(d>1.3){p.x+=dx/d*(G.solo?1.8:2.2)*dt;p.z+=dz/d*(G.solo?1.8:2.2)*dt;}else{R.st='wind';R.t=0;R.tele=k5Zone(bp.clone(),1.3,1.1,0xff4a3a,()=>{});}}
        else if(R.st==='wind'){R.arm.rotation.x=-2.4*Math.min(1,R.t/1.0);if(R.t>=1.1){R.st='walk';R.t=0;R.arm.rotation.x=0.6;k5s('hit');FX.sparks(bp.clone().add(new V3(0,1.2,0)),8,0xd8c8a8);
            for(const h of k5Heroes())if(hd(h.pos,bp)<1.3&&h.rollT<=0)k5Hurt(h,p);B.hp--;floatText(bp.clone().add(new V3(0,3.4,0)),B.hp>0?'Рубят древко!':'','#ff9ab8');if(B.hp<=0)banFall(B);}}}},
    attack(h){if(E.cur!==9)return;for(const R of ES.rub.slice()){if(hd(h.pos,R.g.position)>2.2)continue;R.hp--;burst(R.g.position.clone().add(new V3(0,1.2,0)),0xe8e0c8,8,2);if(R.hp<=0)rubPop(R,false);else{R.st='walk';R.t=0;if(R.tele)R.tele.userData.dead=true;}return;}},
    item(pi){if(E.cur!==9)return null;const h=active(pi);const B=banners.find(b=>b.down&&hd(h.pos,b.g.position)<2.2);if(!B)return null;return ()=>banRaise(B);},
    end(){banners.forEach(b=>{b.g.visible=false;});vitLine(false);(ES.rub||[]).forEach(R=>k5Del(R.g));ES.rub=[];if(ES.val)ES.val.root.visible=false;}};
  E.layer[9].bot={kn:()=>KN,rub:bi=>rubMake(bi),horn:()=>{ES.hornT=0.01;},banners:()=>banners,rubs:()=>ES.rub,fall:bi=>banFall(banners[bi])};
  /* ---------- обучающая катсцена стадии 9: меч и око, серия, волна и прыжок, щитники, рог и знамёна, рубаки ---------- */
  E.LES[9]=L=>{const po=T.potap,pr=T.proshka,pe=T.pelageya,yo=T.yosha,H=(x,z)=>[x,0.9,z],pips=L.pips(6);pips.g.visible=false;let bonesL=[];
    const kface=h=>{KS.g.rotation.y=Math.atan2(h.pos.x-KS.g.position.x,h.pos.z-KS.g.position.z);};
    L.on(()=>{eye.visible=false;banners.forEach(b=>{b.down=false;b.hp=3;b.pole.rotation.z=0;});for(const R of ES.rub||[])k5Del(R.g);ES.rub=[];bonesL.forEach(k5Del);bonesL=[];
      // выход витязей из моря начался вместе со стадией: пропуск урока обрывает его на полпути — ставим всех в строй
      KN.forEach(n=>{if(n.home)n.g.position.copy(n.home);});VIT.forEach(b=>{if(b.home)b.g.position.copy(b.home);});});
    L.put(po,-2.6,-6.2);L.put(pr,-1,-5.8);L.put(pe,1,-5.8);L.put(yo,2.6,-6.2);KS.g.visible=true;KS.g.position.set(C.x,0,C.z-5);KS.g.rotation.y=0;
    const swing=(t0,h,sig)=>[[t0,()=>{kface(h);L.sig(sig||'yellow',1.5);L.pose('sword',{antic:0.2});k5s('warn');}],[t0+1.1,()=>L.guard(h,0.7)],[t0+1.45,()=>{L.pose('idle',{snap:true});k5s('swing');SFX.parry();FX.sparks(hH(h).add(new V3(0,0.2,0.3)),14,0xffe08a);k5Flash(hH(h),0xffe08a,2.4,0.3);CINE.punch(-3);}]];
    L.beat(6.6,{cam:[[-5,5.5,-1],[-1,1.6,-10.5]],need:[H(-2.6,-9),[-0.4,2.4,-12.4]],says:[['zven','Око выбрало героя — щит держи!',0.3,2.8],['zven','Второй — бей со спины!',3.5,2.6]],
      ev:[[0,()=>{L.put(po,-2.6,-9.6);L.put(pe,2.4,-9.6);KS.g.position.set(-1,0,-12.2);kface(po);pips.g.visible=true;eye.visible=true;eye.position.copy(headOf(po)).add(new V3(0,0.35,0));eye.lookAt(camS.position);const fx=k5fx(10,()=>{eye.position.copy(headOf(po)).add(new V3(0,0.35+0.08*Math.sin(G.time*5),0));eye.lookAt(camS.position);},()=>{});L.on(()=>{fx.t=fx.dur;eye.visible=false;});}],
        ...swing(0.6,po),[2.0,()=>{pips.out();L.pose('recoil',{snap:true});}],[2.6,()=>{L.walk(pe,-1.4,-14.6,1.0);}],...swing(3.0,po),[4.3,()=>{L.look(pe,KS.g.position);L.hit(pe,KS.g.position);FX.sparks(KS.g.position.clone().add(new V3(0,2,0)),10,0xffd76a);pips.out();pips.out();}]]});
    L.beat(2.6,{cam:[[0,6,-2],[0,1.2,-12]],need:[H(-2,-9)],says:[['zven','Понятно? Тогда — в бой!',0.2,2.2]],ev:[[0.2,()=>{L.pose('idle');[po,pe].forEach(h=>L.emo(h,'cheer'));}]]});
  };
  /* ================= стадия 10 «Там царь Кащей над златом чахнет» (новая): Цепной великан ================= */
  // Кощей стягивает всё золото — звенья цепи, сокровища — в великана. Великан сгорбился над златом у дуба. Кулак бьёт в красный круг и
  // лежит 6 с — по руке можно взбежать на плечо; с неба сыплются монеты сходящимися кольцами. Колени держат заклёпки-замки: встань у
  // ноги — Леший подымет корни, нога замрёт — бей заклёпку. Обе — великан падает на колено (волна Водяного). Тогда — на плечо (по руке или
  // Горыныч поднимет по «Ко мне!»), и вдвоём — удар в замок на груди. Внутри — детский деревянный молоточек.
  // Глубже: великан с плечами, двумя руками и лиловым ядром за звеньями; вокруг — груды злата (монеты, сундуки, кубки), золотая дымка.
  // Левая рука — размах низом по сектору (красная дуга заполняется — прыжок или кувырок). Цепь-аркан: красная дорожка к герою — не ушёл,
  // захлестнуло и тянет к ногам великана: друг рубит цепь (одному — вырывайся ударами). Кольца монет, сойдясь, оставляют груду —
  // «злато тянет»: в ней вязнешь. Атлас: wide-swing (sweep), tether-pull + rescue, lingering slow, slam + ramp, weak-point. Бот — tk5e_s10.
  const GC=new V3(0,0,-19);const GLINK=new THREE.TorusGeometry(0.42,0.11,6,12),GLM=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.45});
  const giant=new THREE.Group();giant.position.copy(GC);k5Prop(giant);giant.visible=false;const glinks=[];
  function gChain(par,a,b,n){for(let i=0;i<n;i++){const m=new THREE.Mesh(GLINK,GLM);m.position.lerpVectors(a,b,(i+0.5)/n);m.lookAt(b);m.rotateY(Math.PI/2);if(i%2)m.rotateX(Math.PI/2);par.add(m);glinks.push(m);}}
  const legs=[-1,1].map(s=>{const g=new THREE.Group();g.position.set(s*2.2,0,0);giant.add(g);gChain(g,new V3(0,0,0),new V3(-s*0.2,6.5,0),9);return g;});
  for(let y=6.5;y<=11.5;y+=1.25)for(let i=0;i<10;i++){const a=i/10*Math.PI*2;const m=new THREE.Mesh(GLINK,GLM);m.position.set(Math.cos(a)*2.6,y,Math.sin(a)*1.6);m.rotation.y=-a;giant.add(m);glinks.push(m);}
  const gHead=new THREE.Mesh(new THREE.DodecahedronGeometry(1.6,0),M(0x2a2230,{emissive:0x2a0a3a}));gHead.position.set(0,13.6,0);giant.add(gHead);for(const s of[-1,1]){const e=new THREE.Mesh(new THREE.SphereGeometry(0.25,8,6),MB(0xb070ff));e.position.set(s*0.6,13.9,1.35);giant.add(e);}
  const crown=new THREE.Mesh(new THREE.CylinderGeometry(1.2,1.5,0.9,8,1,true),M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.6,side:THREE.DoubleSide}));crown.position.set(0,15.3,0);giant.add(crown);
  const gArmL=new THREE.Group();gArmL.position.set(-3.2,10.5,0);giant.add(gArmL);gChain(gArmL,new V3(0,0,0),new V3(0,-9.4,0),11);const fistL=new THREE.Mesh(new THREE.DodecahedronGeometry(1.0,0),GLM);fistL.position.set(0,-9.8,0);gArmL.add(fistL);
  for(const sx of[-3.2,3.2])for(let i=0;i<8;i++){const a=i/8*Math.PI*2;const m=new THREE.Mesh(GLINK,GLM);m.position.set(sx+Math.cos(a)*0.9,10.9+Math.sin(a)*0.7,Math.sin(a*2)*0.4);m.rotation.set(a,a*0.5,0);giant.add(m);glinks.push(m);}
  const core=new THREE.Mesh(new THREE.SphereGeometry(1.5,16,12),k5Add(0x9a40ff,{opacity:0.55}));core.position.set(0,9,0);giant.add(core);const coreGl=k5Glow(0xb060ff,7);coreGl.position.set(0,9,0);giant.add(coreGl);
  const jaw=new THREE.Mesh(new THREE.BoxGeometry(1.6,0.4,1),M(0x2a2230,{emissive:0x2a0a3a}));jaw.position.set(0,12.6,0.5);giant.add(jaw);
  const gArm=new THREE.Group();gArm.position.set(3.2,10.5,0);giant.add(gArm);gChain(gArm,new V3(0,0,0),new V3(0,-10,0),12);const fist=new THREE.Mesh(new THREE.DodecahedronGeometry(1.1,0),GLM);fist.position.set(0,-10.4,0);gArm.add(fist);
  const heart=new THREE.Group();heart.position.set(0,8.8,1.7);giant.add(heart);const heartLock=K5L.lock();heartLock.scale.setScalar(2.2);heart.add(heartLock);const hammer=new THREE.Group();heart.add(hammer);hammer.visible=false;
  addMesh(new THREE.CylinderGeometry(0.06,0.06,0.9,6),M(0x9a6a3a),0,-0.2,0,hammer);addMesh(new THREE.BoxGeometry(0.5,0.25,0.25),M(0xb88a50),0,0.3,0,hammer);
  const kneeR=[-1,1].map(s=>{const r=K5L.lock();r.scale.setScalar(1.3);r.position.set(s*2.2,3.1,0.6);giant.add(r);return r;});
  K5L.noRay(giant);
  // груды злата вокруг великана: монеты, сундуки, кубки
  const hoard=k5Prop(new THREE.Group());hoard.visible=false;{const gm=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4});const n=420,im=new THREE.InstancedMesh(new THREE.CylinderGeometry(0.16,0.16,0.04,10),gm,n),mm=new THREE.Matrix4(),q=new THREE.Quaternion(),e=new THREE.Euler();
    for(let i=0;i<n;i++){const a=rand(0,6.28),r=Math.random()<0.6?rand(3.5,8):rand(8,13);e.set(rand(-0.5,0.5),rand(0,6),rand(-0.5,0.5));q.setFromEuler(e);mm.compose(new V3(GC.x+Math.cos(a)*r,0.03+rand(0,0.08),GC.z+Math.sin(a)*r*0.7),q,new V3(1,1,1));im.setMatrixAt(i,mm);}hoard.add(im);
    for(const [x,z,s] of[[-5,-3,1.6],[4.6,-2.4,1.3],[-7.4,1.5,1],[7,1.8,1.2],[-2.6,4,0.9],[3,4.2,0.8]]){const c=new THREE.Mesh(new THREE.ConeGeometry(1.2*s,1.1*s,10),gm);c.position.set(GC.x+x,0.55*s,GC.z+z);hoard.add(c);}
    for(const [x,z,ry] of[[-6.2,-0.4,0.5],[6.4,-0.8,-0.4],[-4,5.2,0.2]]){const g=new THREE.Group();g.position.set(GC.x+x,0,GC.z+z);g.rotation.y=ry;hoard.add(g);addMesh(new THREE.BoxGeometry(1.2,0.7,0.8),M(0x6a3a1a),0,0.35,0,g);
      const lid=addMesh(new THREE.BoxGeometry(1.2,0.18,0.8),M(0x7a4a2a),0,0.85,-0.3,g);lid.rotation.x=-0.8;addMesh(new THREE.BoxGeometry(1.0,0.2,0.6),gm,0,0.72,0,g);}
    for(const [x,z] of[[-3.4,2.2],[2.2,3.2],[5.2,-4.6]]){const g=new THREE.Group();g.position.set(GC.x+x,0,GC.z+z);hoard.add(g);addMesh(new THREE.CylinderGeometry(0.22,0.12,0.4,8),gm,0,0.5,0,g);addMesh(new THREE.CylinderGeometry(0.05,0.05,0.3,6),gm,0,0.15,0,g);addMesh(new THREE.CylinderGeometry(0.18,0.2,0.04,8),gm,0,0.02,0,g);}}
  K5L.noRay(hoard);
  // размах левой рукой: сектор-дуга на земле
  const swArc=k5Prop(new THREE.Mesh(new THREE.RingGeometry(3.5,11.5,40,1,0,Math.PI),k5Add(0xff3030,{opacity:0})));swArc.rotation.x=-Math.PI/2;swArc.position.set(GC.x,0.08,GC.z);swArc.raycast=()=>{};
  // цепь-аркан
  const lasso=k5Prop(new THREE.Mesh(new THREE.CylinderGeometry(0.09,0.09,1,6),GLM));lasso.visible=false;lasso.raycast=()=>{};
  const SHW=new V3(GC.x+3.2,10.5,GC.z);const shPlat={minx:SHW.x-1.7,maxx:SHW.x+1.7,miny:SHW.y-0.6,maxy:SHW.y,minz:SHW.z-1.4,maxz:SHW.z+1.8,on:false,occ:false};W.boxes.push(shPlat);
  const gCyls=[-1,1].map(s=>{const c={x:GC.x+s*2.2,z:GC.z,r:1.0,miny:-1,maxy:6,on:false};W.cyls.push(c);return c;});
  // рука лежит — по ней можно идти: поверхность по отрезку кулак → плечо
  W.surfs.push((x,z,reach)=>{const Rm=ES.ramp;if(E.cur!==10||!Rm)return null;const dx=Rm.b.x-Rm.a.x,dz=Rm.b.z-Rm.a.z,L2=dx*dx+dz*dz;let t=((x-Rm.a.x)*dx+(z-Rm.a.z)*dz)/L2;if(t<-0.05||t>1.02)return null;t=clamp(t,0,1);
    const px=Rm.a.x+dx*t,pz=Rm.a.z+dz*t;if(Math.hypot(x-px,z-pz)>1.3)return null;const y=Rm.a.y+(Rm.b.y-Rm.a.y)*t;if(y>reach+0.001)return null;return {y};});
  const rootsM=k5Prop(new THREE.Group());for(let i=0;i<6;i++){const c=addMesh(new THREE.CylinderGeometry(0.1,0.18,3,5),M(0x5a3a1a),Math.cos(i)*0.8,1.2,Math.sin(i)*0.8,rootsM);c.rotation.z=0.5*Math.cos(i*2);}rootsM.visible=false;K5L.noRay(rootsM);
  function kneeW(i){const p=new V3();kneeR[i].getWorldPosition(p);return p;}
  W.hittables.push({pos:new V3(),r:1.3,alive:()=>E.cur===10&&ES.fight&&ES.ph==='knees'&&ES.root!=null&&!ES.knee[ES.root],onHit:h=>{const i=ES.root;ES.kHp[i]-=(h.kind==='potap'?2:1);SFX.clink();FX.sparks(kneeW(i),10,0xffd060);
      if(ES.kHp[i]<=0){ES.knee[i]=true;kneeR[i].visible=false;ES.root=null;ES.rootT=0;rootsM.visible=false;K5L.gold(kneeW(i),16);floatText(kneeW(i).add(new V3(0,1,0)),'Заклёпка долой!','#ffe08a');E.log('knee'+i);if(ES.knee[0]&&ES.knee[1])kneel();}
      else floatText(kneeW(i).add(new V3(0,1,0)),'ещё!','#ffe08a');}});
  const kneeHt=W.hittables[W.hittables.length-1];
  W.hittables.push({pos:new V3(),r:1.6,alive:()=>E.cur===10&&ES.fight&&ES.ph==='heart',onHit:h=>{const pi=h.player;if(h.pos.y<SHW.y-1)return;ES.hb[pi]=G.time;const both=G.solo||Math.abs(ES.hb[0]-ES.hb[1])<1.2;FX.sparks(heart.getWorldPosition(new V3()),12,0xffd060);
      if(both)heartBreak();else floatText(heart.getWorldPosition(new V3()).add(new V3(0,1.2,0)),'Вдвоём — разом!','#ffe08a');}});
  const heartHt=W.hittables[W.hittables.length-1];
  function pileMake(c){if(E.cur!==10||!ES.fight)return;const g=k5Prop(new THREE.Group());g.position.set(c.x,0,c.z);const gm=M(COL.gold,{emissive:0x806010,emissiveIntensity:0.5});
    const m=new THREE.Mesh(new THREE.ConeGeometry(1.5,0.7,12),gm);m.position.y=0.35;g.add(m);const r=new THREE.Mesh(new THREE.RingGeometry(1.5,1.65,32),k5Add(0xffd060,{opacity:0.7}));r.rotation.x=-Math.PI/2;r.position.y=0.05;g.add(r);
    g.scale.setScalar(0.01);anim(0.4,k=>g.scale.setScalar(Math.max(0.01,CE.outBack(k))));ES.piles.push({g,t:0});E.log('pile');}
  // ---- три пробоя (по отзыву: великана слишком легко победить) ----
  // 1) колени (заклёпки, корни Лешего) → на колене → пробой; 2) оковы на правой руке: кулак лежит — бей замок на запястье и, взбежав
  // по руке, на локте → на колене → пробой; 3) глаза метут землю двумя лучами (прыжок), Леший держит корнями ОБЕ ноги разом → пробой.
  // На колене — на плечо: «Ко мне!» — Горыныч поднимет (или по лежащей руке), и вдвоём удар в сердце. Три замка над сердцем — сколько осталось.
  const wristL=[[0,-9.4,0.7],[0,-4.8,0.7]].map(([x,y,z])=>{const g=K5L.lock();g.scale.setScalar(1.2);g.position.set(x,y,z);gArm.add(g);g.visible=false;return g;});
  const wristHt=wristL.map((L,i)=>{const t={pos:new V3(),r:1.3,alive:()=>E.cur===10&&ES.fight&&ES.ph==='wrists'&&ES.arm==='down'&&ES.wHp[i]>0,onHit:h=>{const p=L.getWorldPosition(new V3());
      if(Math.abs(h.pos.y-p.y)>2.6)return;ES.wHp[i]-=(h.kind==='potap'?2:1);SFX.clink();FX.sparks(p,10,0xffd060);
      if(ES.wHp[i]<=0){L.visible=false;K5L.gold(p,16);E.log('wrist'+i);if(ES.wHp.every(v=>v<=0))kneel();}}};W.hittables.push(t);return t;});
  const eyeBeams=[0,1].map(()=>{const m=k5Prop(new THREE.Mesh(new THREE.BoxGeometry(0.5,0.12,11),k5Add(0xff3030,{opacity:0.85})));m.visible=false;m.raycast=()=>{};return m;});
  const legRings=[-1,1].map(sx=>{const m=k5Prop(new THREE.Mesh(new THREE.RingGeometry(1.8,2.2,32),k5Add(0x9fe070,{opacity:0.8})));m.rotation.x=-Math.PI/2;m.position.set(GC.x+sx*2.2,0.09,GC.z+1.2);m.visible=false;return m;});
  function heartBreak(){ES.breaks=(ES.breaks||0)+1;E.log('heart'+ES.breaks);const hp=heart.getWorldPosition(new V3());K5L.gold(hp,22);k5Flash(hp,0xffe0a0,5,0.5);k5s('shatter');shakeAll(0.1,0.5);
    if(ES.breaks>=3){ES.ph='open';heartOpen();return;}
    ES.ph='rise';shPlat.on=false;ES.ramp=null;for(const h of HEROES)if(h.pos.y>1.5)placeOnGround(h,h.pos.x,h.pos.z+4,0);barkS(KS,'koschei',ES.breaks===1?'Треснуло?! Ещё не всё — оковы мои, держите!':'Глаза мои — всё вижу! Ни шагу!',2.4,true);
    const y0=giant.position.y;anim(1.0,k=>{giant.position.y=y0*(1-CE.outBack(k));});later(1.2,()=>{if(E.cur!==10)return;SHW.y=10.5;shPlat.miny=9.9;shPlat.maxy=10.5;shPlat.on=true;if(ES.breaks===1)wristsStart();else eyesStart();});}
  function wristsStart(){ES.ph='wrists';ES.wHp=[G.solo?2:3,G.solo?2:3];wristL.forEach(L=>{L.visible=true;});ES.at=1;E.log('wrists');}
  function eyesStart(){ES.ph='eyes';ES.r2=[0,0];ES.r2w=[0,0];ES.eyeA=0;eyeBeams.forEach(m=>{m.visible=true;});legRings.forEach(m=>{m.visible=true;});E.log('eyes');}
  function kneel(){ES.ph='heart';ES.prog=0.3+0.3*(ES.breaks||0);eyeBeams.forEach(m=>{m.visible=false;});legRings.forEach(m=>{m.visible=false;});rootsM.visible=false;barkS(FR.vod.m,'vod','Волна — под колено!',1.4,true);const wv=k5Prop(new THREE.Mesh(new THREE.BoxGeometry(22,3,1),k5eMB(0x7ad8ff,{opacity:0.6})));wv.position.set(0,1.5,8);
    k5fx(1.2,k=>{wv.position.z=8-k*24;},()=>k5Del(wv));later(0.9,()=>{const y0=giant.position.y;anim(0.8,k=>{giant.position.y=y0-3*CE.outBack(k);});shakeAll(0.1,0.5);k5s('stomp');SHW.y=7.5;shPlat.miny=6.9;shPlat.maxy=7.5;shPlat.on=true;
      });}
  function heartOpen(){heartLock.visible=false;hammer.visible=true;K5L.gold(heart.getWorldPosition(new V3()),30);k5Flash(heart.getWorldPosition(new V3()),0xffe0a0,6,0.6);k5s('reveal');
    later(0.4,()=>say('pelageya','Это же… его молоточек. Детский. Деревянный.',3,true));later(3.2,()=>{giantFall();});}
  function giantFall(){E.log('giantFall');shPlat.on=false;ES.ramp=null;shakeAll(0.15,1.0);k5s('shatter');const parts=glinks.map(m=>{const p=new V3();m.getWorldPosition(p);const q=new THREE.Quaternion();m.getWorldQuaternion(q);W.group.attach(m);return {m,v:new V3(rand(-4,4),rand(2,7),rand(-4,4))};});
    k5fx(2.2,(k,dt)=>{for(const P of parts){if(P.m.position.y>0.3){P.v.y-=12*dt;P.m.position.addScaledVector(P.v,dt);P.m.rotation.x+=dt*3;}else P.m.position.y=0.3;}});
    later(2.2,()=>{for(const P of parts){const f=P.m.position.clone(),to=OAK.clone().add(new V3(rand(-2,2),rand(1,8),rand(-2,2)));k5fx(1.2+rand(0,0.6),k=>{P.m.position.lerpVectors(f,to,k);P.m.position.y+=Math.sin(k*Math.PI)*4;},()=>{k5Del(P.m);});}glinks.length=0;});
    for(const h of HEROES)if(h.pos.y>1.5)placeOnGround(h,h.pos.x,h.pos.z+3,0);later(3.6,()=>{giant.visible=false;E.won(10);});}
  E.stage[10]={start(o){E.hub(10);K5L.themeTo('sunset',1);K5.fight=false;liveBoss(false);KS.g.visible=false;dome.visible=false;candles.forEach(c=>{c.g.visible=false;});heroesHome(10);W.clampR={x:C.x,z:C.z-1,r:12.5};E.arenaCam(true,9);
      if(!glinks.length)return E.go(11);giant.visible=true;giant.position.copy(GC);SHW.y=10.5;shPlat.miny=9.9;shPlat.maxy=10.5;shPlat.on=true;gCyls.forEach(c=>{c.on=true;});kneeR.forEach(r=>{r.visible=true;});heartLock.visible=true;hammer.visible=false;
      Object.assign(ES,{ph:'knees',knee:[false,false],kHp:[G.solo?3:4,G.solo?3:4],root:null,rootT:0,arm:'rest',at:2.5,coinT:5,hb:[-9,-9],ramp:null,prog:0,spes:null,fight:false});gArm.quaternion.identity();gArm.scale.set(1,1,1);gArmL.rotation.set(0,0,0);hoard.visible=true;Object.assign(ES,{sw:'rest',swT:7,las:null,lasT:9,piles:[]});Object.assign(ES,{breaks:0,wHp:[0,0],r2:[0,0],r2w:[0,0],eyeA:0});wristL.forEach(L=>{L.visible=false;});eyeBeams.forEach(m=>{m.visible=false;});legRings.forEach(m=>{m.visible=false;});K5X.motes('gold',new V3(GC.x,0,GC.z+6),12,140,6);K5X.fog(new V3(GC.x,0,GC.z+5),12,0xffc870,14,{op:0.18,y0:0.2,y1:1.6});
      E.lesson(10,()=>{ES.fight=true;});},
    tick(dt){if(!ES.fight)return;giant.position.y=(ES.ph==='knees'?0:giant.position.y)+(ES.ph==='knees'?Math.sin(G.time*1.1)*0.12:0);gHead.rotation.y=Math.sin(G.time*0.6)*0.3;kneeHt.pos.copy(ES.root!=null?kneeW(ES.root):new V3(0,-99,0));heartHt.pos.copy(heart.getWorldPosition(new V3()));
      if(E.free.zhar){const a=G.time*0.9,t=ES.ph==='knees'&&ES.root!=null?kneeW(ES.root):heart.getWorldPosition(new V3());FR.zhar.m.g.position.set(t.x+Math.cos(a)*2,t.y+2,t.z+Math.sin(a)*2);}
      ES.prog=ES.ph==='knees'?(ES.knee[0]+ES.knee[1])*0.12:ES.ph==='wrists'?0.33+0.2*(ES.wHp.filter(v=>v<=0).length/2):ES.ph==='eyes'?0.66:ES.ph==='open'?0.97:0.3+0.3*(ES.breaks||0);
      wristHt.forEach((t,i)=>{wristL[i].getWorldPosition(t.pos);});
      // глаза: два луча метут землю (прыжок); корни Лешего держат ногу 6 с — обе разом: на колено
      if(ES.ph==='eyes'){ES.eyeA+=dt*(G.solo?0.42:0.55);eyeBeams.forEach((m,q)=>{const a=ES.eyeA*(q?-1:1)+q*Math.PI;m.position.set(GC.x+Math.sin(a)*6.5,0.08,GC.z+Math.cos(a)*6.5);m.rotation.y=a;m.material.opacity=0.6+0.3*Math.sin(G.time*12);
          for(const h of k5Heroes()){const dx=h.pos.x-GC.x,dz=h.pos.z-GC.z,along=dx*Math.sin(a)+dz*Math.cos(a),side=Math.abs(dx*Math.cos(a)-dz*Math.sin(a));if(along>1&&along<12&&side<0.55&&h.pos.y<0.7&&h.rollT<=0&&(ES.eyeCd||0)<G.time){ES.eyeCd=G.time+0.8;k5Hurt(h,GC);}}});
        for(let i=0;i<2;i++){const lp=legRings[i].position;if(ES.r2[i]>0){ES.r2[i]-=dt;legRings[i].material.color.set(0x7ad84a);}else{legRings[i].material.color.set(0xffd76a);if(k5Heroes().some(h=>hd(h.pos,lp)<2.2)){ES.r2w[i]+=dt;if(ES.r2w[i]>0.8){ES.r2[i]=G.solo?8:6;ES.r2w[i]=0;barkS(FR.leshy.m,'leshy','Корни, держите!',1.0,true);E.log('root2'+i);}}else ES.r2w[i]=0;}}
        if(ES.r2[0]>0&&ES.r2[1]>0){E.log('rootsBoth');kneel();}}
      // Леший: встал у ноги на секунду — корни держат её 7 с
      if(ES.ph==='knees'){if(ES.root!=null){ES.rootT-=dt;if(ES.rootT<=0){ES.root=null;rootsM.visible=false;}}
        else for(let i=0;i<2;i++){if(ES.knee[i])continue;const p=new V3(GC.x+(i?2.2:-2.2),0,GC.z);if(k5Heroes().some(h=>hd(h.pos,p)<2.4)){ES.rootW=(ES.rootW||0)+dt;if(ES.rootW>0.8){ES.rootW=0;ES.root=i;ES.rootT=7;rootsM.visible=true;rootsM.position.copy(p);
              barkS(FR.leshy.m,'leshy','Корни, держите!',1.2,true);floatText(p.clone().add(new V3(0,4,0)),'Нога замерла — бей заклёпку!','#b8e070');E.log('root'+i);}break;}}}
      // кулак: замах (красный круг) → удар → рука лежит 6 с (по ней — на плечо) → подъём
      const st=ES.arm;ES.at-=dt;const Q0=new THREE.Quaternion(),sh=new V3(GC.x+3.2,giant.position.y+10.5,GC.z);
      if(st==='rest'&&ES.at<=0&&ES.ph!=='open'){const h=nearH(GC);if(h){let dx=h.pos.x-sh.x,dz=h.pos.z-sh.z;const L=Math.hypot(dx,dz)||1;if(L>10){dx*=10/L;dz*=10/L;}ES.F=new V3(sh.x+dx,0,sh.z+dz);ES.arm='raise';ES.at=G.solo?1.7:1.3;
          k5Zone(ES.F.clone(),2.3,ES.at,0xff3030,()=>{});}}
      else if(st==='raise'){gArm.quaternion.slerp(new THREE.Quaternion().setFromUnitVectors(new V3(0,-1,0),new V3(0,0.75,-0.66).normalize()),Math.min(1,dt*3));
        if(ES.at<=0){const dir=ES.F.clone().add(new V3(0,0.6,0)).sub(sh);gArm.quaternion.setFromUnitVectors(new V3(0,-1,0),dir.clone().normalize());gArm.scale.set(1,dir.length()/10.4,1);
          ES.arm='down';ES.at=6;ES.ramp={a:new V3(ES.F.x,0.6,ES.F.z),b:sh.clone()};shakeAll(0.12,0.4);FX.dust(ES.F.clone().setY(0.2),20,0x8a7a6a,2);k5s('stomp');for(const h of k5Heroes())if(hd(h.pos,ES.F)<2.3&&h.pos.y<1.5)k5Hurt(h,ES.F);}}
      else if(st==='down'){if(ES.at<=0){ES.arm='up';ES.at=1;ES.ramp=null;}}
      else if(st==='up'){gArm.quaternion.slerp(Q0,Math.min(1,dt*4));gArm.scale.y+=(1-gArm.scale.y)*Math.min(1,dt*4);if(ES.at<=0){gArm.quaternion.copy(Q0);gArm.scale.y=1;ES.arm='rest';ES.at=G.solo?3.4:2.4;}}
      // монеты: сходящиеся кольца
      ES.coinT-=dt;if(ES.coinT<=0&&ES.ph!=='open'){ES.coinT=G.solo?9:7;const h=nearH(GC)||active(0);const c=h.pos.clone();c.y=0;const ring=k5Prop(new THREE.Mesh(new THREE.RingGeometry(0.8,1,48),k5Add(0xffd060,{opacity:0.9})));ring.rotation.x=-Math.PI/2;ring.position.set(c.x,0.1,c.z);
        const S0={r:9,hit:new Set()};k5fx(2.6,(k,dt2)=>{S0.r=9*(1-k)+0.6;ring.scale.setScalar(S0.r);if(Math.random()<0.5)FX.sparkle(new V3(c.x+Math.cos(G.time*7)*S0.r,2,c.z+Math.sin(G.time*7)*S0.r),1,0xffd060);
          for(const x of k5Heroes()){if(S0.hit.has(x))continue;if(Math.abs(hd(x.pos,c)-S0.r)<0.5&&x.pos.y<0.6){S0.hit.add(x);k5Hurt(x,c);}}},()=>{k5Del(ring);pileMake(c);});}
      // груды злата: вязнешь
      for(const P of ES.piles.slice()){P.t+=dt;if(Math.random()<dt*4)FX.sparkle(P.g.position.clone().add(new V3(rand(-1,1),0.5,rand(-1,1))),1,0xffd060);for(const h of k5Heroes())if(hd(h.pos,P.g.position)<1.6&&h.pos.y<0.8&&h.grounded){h.vel.x*=0.82;h.vel.z*=0.82;}
        if(P.t>8){const g=P.g;anim(0.5,k=>{g.scale.setScalar(1-k);});later(0.5,()=>k5Del(g));ES.piles.splice(ES.piles.indexOf(P),1);}}
      // левая рука: размах низом по дуге
      if(ES.ph!=='open'){if(ES.sw==='rest'){ES.swT-=dt;if(ES.swT<=0&&ES.arm!=='raise'){ES.sw='wind';ES.swT=G.solo?1.9:1.5;const side=Math.random()<0.5?1:-1;ES.swS=side;swArc.rotation.z=side>0?0:Math.PI;
            barkS(KS,'koschei','Р-размахнусь!',1.0,true);E.log('sweepWind');}}
        else if(ES.sw==='wind'){ES.swT-=dt;const k=1-ES.swT/(G.solo?1.9:1.5);swArc.material.opacity=0.15+0.45*k*(0.6+0.4*Math.sin(G.time*20));gArmL.rotation.z=-0.9*k;gArmL.rotation.x=0.4*k;
          if(ES.swT<=0){ES.sw='sweep';ES.swT=0.6;ES.swHit=new Set();k5s('whoosh');}}
        else if(ES.sw==='sweep'){ES.swT-=dt;const k=1-ES.swT/0.6;gArmL.rotation.z=-0.9+0.9*k;gArmL.rotation.x=0.4+1.2*Math.sin(k*Math.PI);swArc.material.opacity=0.6*(1-k);
          for(const h of k5Heroes()){if(ES.swHit.has(h))continue;const d=hd(h.pos,GC);if(d<3.5||d>11.5)continue;const inSide=ES.swS>0?(h.pos.z>GC.z-0.5):(h.pos.z<GC.z+0.5);if(!inSide)continue;
            if(h.pos.y>0.7||h.rollT>0){ES.swHit.add(h);floatText(h.pos.clone().add(new V3(0,2,0)),'Перепрыгнул!','#9fe0ff');continue;}ES.swHit.add(h);k5Hurt(h,GC);const dx=h.pos.x-GC.x,dz=h.pos.z-GC.z,dd=Math.hypot(dx,dz)||1;h.vel.x+=dx/dd*6;h.vel.z+=dz/dd*6;h.knockT=0.35;}
          if(ES.swT<=0){ES.sw='rest';ES.swT=G.solo?9:7;gArmL.rotation.set(0,0,0);swArc.material.opacity=0;shakeAll(0.05,0.25);}}}
      // цепь-аркан: красная дорожка к герою; не ушёл — тянет к ногам, друг рубит
      if(ES.ph!=='open'){const L=ES.las;if(!L){ES.lasT-=dt;if(ES.lasT<=0){const hs=k5Heroes().filter(h=>h.pos.y<1.5);if(hs.length){const h=hs[Math.floor(rand(0,hs.length))];const a=new V3(GC.x,0.5,GC.z+2.2),to=new V3(h.pos.x,0.5,h.pos.z);
              if(FIN.k2fx)FIN.k2fx.lane(a.clone().setY(0.05),to.clone().setY(0.05),1.3,G.solo?1.4:1.1,'red');ES.las={st:'aim',t:0,a,to,h};E.log('lassoAim');}else ES.lasT=2;}}
        else if(L.st==='aim'){L.t+=dt;if(L.t>=(G.solo?1.4:1.1)){const tgt=k5Heroes().find(x=>{const ab=L.to.clone().sub(L.a),ap=x.pos.clone().sub(L.a);ap.y=0;ab.y=0;const t=clamp(ap.dot(ab)/ab.lengthSq(),0,1);return hd(x.pos,L.a.clone().addScaledVector(ab,t))<0.9&&x.rollT<=0&&x.pos.y<1.2;});
            if(tgt){L.st='tied';L.h=tgt;L.hp=G.solo?3:2;lasso.visible=true;k5s('chain');floatText(tgt.pos.clone().add(new V3(0,2.2,0)),'Аркан!','#ff9ab8');E.log('lasso');}else{ES.las=null;ES.lasT=G.solo?11:9;}}}
        else if(L.st==='tied'){const h=L.h,dx=L.a.x-h.pos.x,dz=L.a.z-h.pos.z,d=Math.hypot(dx,dz)||1;h.pos.x+=dx/d*1.3*dt;h.pos.z+=dz/d*1.3*dt;h.vel.x*=0.5;h.vel.z*=0.5;
          const m=L.a.clone().lerp(h.pos.clone().add(new V3(0,1,0)),0.5);lasso.position.copy(m);lasso.scale.y=L.a.distanceTo(h.pos.clone().add(new V3(0,1,0)));lasso.quaternion.setFromUnitVectors(new V3(0,1,0),h.pos.clone().add(new V3(0,1,0)).sub(L.a).normalize());
          if(d<1.8){k5Hurt(h,L.a);lasso.visible=false;ES.las=null;ES.lasT=G.solo?12:9;floatText(h.pos.clone().add(new V3(0,2.2,0)),'Подтянул!','#ff9ab8');E.log('lassoPull');}}}},
    end(){giant.visible=false;shPlat.on=false;gCyls.forEach(c=>{c.on=false;});ES.ramp=null;rootsM.visible=false;W.camFn=null;hoard.visible=false;swArc.material.opacity=0;lasso.visible=false;wristL.forEach(L=>{L.visible=false;});eyeBeams.concat(legRings).forEach(m=>{m.visible=false;});(ES.piles||[]).forEach(P=>k5Del(P.g));ES.piles=[];ES.las=null;},
    attack(h){if(E.cur!==10)return;const L=ES.las;if(!L||L.st!=='tied')return;const mid=L.a.clone().lerp(L.h.pos,0.5);
      if(h===L.h){L.hp-=G.solo?0.6:0.25;floatText(h.pos.clone().add(new V3(0,2.2,0)),'Пусти!','#ffe08a');}else if(hd(h.pos,mid)<2.6||hd(h.pos,L.h.pos)<2.2){L.hp-=1;FX.sparks(mid,10,0xffd060);SFX.clink();}
      if(L.hp<=0){lasso.visible=false;floatText(L.h.pos.clone().add(new V3(0,2.2,0)),'Цепь разрублена!','#ffe08a');K5L.gold(mid,10);ES.las=null;ES.lasT=G.solo?13:10;E.log('lassoCut');}}};
  // «Ко мне!» в стадии 10: Горыныч поднимает героя на плечо великана
  {const _pc=W.pingCall;W.pingCall=(pi,h)=>{if(E.cur===10&&ES.fight&&ES.ph==='heart'&&E.free.gor&&h.pos.y<2){const f=h.pos.clone(),to=SHW.clone().add(new V3(rand(-0.6,0.6),0.1,rand(-0.3,0.6)));
      gorFly.g.visible=true;anim(1.2,k=>{h.pos.lerpVectors(f,to,CE.inOutSine(k));h.pos.y+=Math.sin(k*Math.PI)*4;h.vel.set(0,0,0);gorFly.g.position.copy(h.pos).add(new V3(0,1.6,0));});later(1.25,()=>{gorFly.g.visible=false;h.pos.copy(to);h.vel.set(0,0,0);});E.log('gorLift');return;}
    if(_pc)_pc(pi,h);};}
  /* ---------- обучающая катсцена стадии 10: великан, кулак и рука, размах и аркан, заклёпки и колено, сердце, три пробоя ---------- */
  E.LES[10]=L=>{const po=T.potap,pr=T.proshka,pe=T.pelageya,yo=T.yosha,H=(x,z)=>[x,0.9,z];
    const Q0=new THREE.Quaternion(),sh=()=>new V3(GC.x+3.2,giant.position.y+10.5,GC.z),hp=()=>heart.getWorldPosition(new V3());
    L.on(()=>{giant.position.copy(GC);gArm.quaternion.identity();gArm.scale.set(1,1,1);gArmL.rotation.set(0,0,0);heartLock.visible=true;hammer.visible=false;kneeR.forEach(r=>{r.visible=true;});wristL.forEach(l=>{l.visible=false;});
      eyeBeams.forEach(m=>{m.visible=false;});legRings.forEach(m=>{m.visible=false;});rootsM.visible=false;swArc.material.opacity=0;lasso.visible=false;});
    L.put(po,-3,-12.4);L.put(pr,-1,-12);L.put(pe,1,-12);L.put(yo,3,-12.4);KS.g.visible=false;
    L.beat(3.8,{cam:[[0,13,8],[0,3.5,-19],[0,12,6],[0,4,-19]],need:[H(-3,-12.4),[0,12,-19],[3.2,10,-19]],says:[['zven','Расколи замок на груди великана!',0.2,3.2]],ev:[[1.2,()=>{k5Flash(hp(),0xffe0a0,6,0.8);}],[2.8,()=>{K5L.gold(hp(),16);}]]});
    // кулак
    L.beat(7.8,{cam:[[0,10,2],[0,3.4,-13]],need:[H(-2,-10),[3.2,8,-19]],says:[['zven','Кулак — красный круг: кувырок '+kbd('roll')+'!',0.2,3.0],['zven','Рука легла — взбеги на плечо!',3.6,3.2]],
      ev:[[0,()=>{L.put(po,-2,-10);L.put(pe,2.4,-10.6);}],[0.4,()=>{const F=new V3(-2,0,-10),s=sh();L.tele(F,2.3,1.5,0xff3030,()=>{});anim(1.5,k=>{gArm.quaternion.slerp(new THREE.Quaternion().setFromUnitVectors(new V3(0,-1,0),new V3(0,0.75,-0.66).normalize()),Math.min(1,k*0.2+0.04));});
          L.later(1.5,()=>{const dir=F.clone().add(new V3(0,0.6,0)).sub(s);gArm.quaternion.setFromUnitVectors(new V3(0,-1,0),dir.clone().normalize());gArm.scale.set(1,dir.length()/10.4,1);shakeAll(0.12,0.4);FX.dust(F.clone().setY(0.2),20,0x8a7a6a,2);k5s('stomp');});}],
        [1.4,()=>L.roll(po,-2.8,-0.2,0.4)],[4.6,()=>{const a=new V3(-2,0.6,-10),b=sh(),f=pe.pos.clone();L.put(pe,-2.2,-9.2);const q=pe.pos.clone();anim(2.4,k=>{pe.pos.lerpVectors(q,b.clone().add(new V3(0,0.3,0)),CE.inOutSine(k));pe.vel.set(0,0,0);pe.grounded=true;});}],[7.2,()=>{L.ok(pe);}]]});
    L.beat(2.6,{cam:[[0,10,2],[0,3.4,-13]],need:[H(-2,-10)],says:[['zven','Понятно? Тогда — в бой!',0.2,2.2]],ev:[[0.2,()=>{L.pose('idle');[po,pe].forEach(h=>L.emo(h,'cheer'));}]]});
  };
  /* ---------- ролики акта III ---------- */
  // после стадии 9: «над златом чахнет» — Кощей стягивает золото, из звеньев встаёт великан
  E.cine.gold=done=>{heroLine(-4.5);KS.g.visible=true;KS.g.position.set(GC.x,0,GC.z+2);KS.g.rotation.y=0;sword.visible=false;giant.visible=false;
    play({dur:10,fov:48,camK:2.2,k5:{mood:[GOLD,0.14],cues:[[5.6,()=>{CINE.trauma(0.3);CINE.punch(-5);}]]},
      shots:[SH(0,[GC.x+3,2.6,GC.z+8],[GC.x,2.4,GC.z+2],{fov:42}),MV(4.6,[0,6,10],[0,6,-19],[0,9,16],[0,8,-19],5.4,{ease:'outCubic',fov:56})],
      says:[[0.4,3.4,'koschei','Не взять меня ни мечом, ни сказкой?<br>Так возьму я всё золото — и сам стану великаном!'],[5.8,3.4,null,'<i>Там царь Кащей над златом чахнет… Встал из звеньев великан — выше дуба.</i>',true]],
      events:[{t:1,fn:()=>{KA.pose('cast',{antic:0.3,snap:true});k5s('cast');k5Gather(()=>KS.g.position.clone().add(new V3(0,3,0)),0xffd060,1.2,30,6);}},
        {t:5.4,fn:()=>{K5L.ink(KS.g.position.clone().add(new V3(0,2,0)),20);KS.g.visible=false;giant.visible=true;giant.scale.setScalar(0.01);anim(1.2,k=>giant.scale.setScalar(Math.max(0.01,CE.outBack(k))));k5s('reveal');shakeAll(0.12,0.8);}}],
      end:()=>{W.anims.length=0;KA.reset();giant.scale.setScalar(1);done();}});};
  // после стадии 10: ложная смерть — тишина, победа… и чернила снова
  E.cine.falseDeath=done=>{heroLine(-6);KS.g.visible=true;KS.g.position.set(GC.x,0,GC.z+2);KS.g.rotation.set(-1.3,0,0);KS.g.position.y=0.4;
    play({dur:13,fov:46,camK:2.2,k5:{mood:[WARM,0.12],cues:[[7.2,()=>CINE.mood(DARK,0.2)],[9.6,()=>{CINE.trauma(0.3);CINE.dutch(0.05);}],[12,()=>CINE.dutch(0)]]},
      shots:[SH(0,[GC.x+2.4,1.6,GC.z+6],[GC.x,0.6,GC.z+2],{fov:40}),SH(3.6,[0,4,4],[0,1,-8],{fov:50}),MV(7,[GC.x+1.6,1.2,GC.z+5],[GC.x,1,GC.z+2],[GC.x+1.2,2.4,GC.z+6],[GC.x,2.6,GC.z+2],6,{ease:'inOutSine',fov:38})],
      says:[[0.6,3,null,'<i>Рассыпался великан. Лежит Кощей — не шелохнётся.</i>',true],[3.8,2.6,'proshka','Победили?.. Победили!'],[7.4,2.4,null,'<i>…А из тетрадки тихо течёт чернило.</i>',true],[9.8,3,'koschei','Бессмертный я. Забыли?']],
      events:[{t:3.6,fn:()=>{K5L.music('gold',E.freeCount());emAll('cheer',0.08)();}},{t:7.0,fn:()=>{if(FIN.music)FIN.music.play(null);K5L.ink(KS.g.position.clone().add(new V3(0,0.6,0)),30);K5L.pool(KS.g.position,3,6);}},
        {t:9.4,fn:()=>{anim(1.2,k=>{KS.g.rotation.x=-1.3*(1-k);KS.g.position.y=0.4*(1-k);});KA.pose('threat',{antic:0.3});k5s('reveal');}},{t:9.6,fn:emAll('fear',0.08)}],
      end:()=>{W.anims.length=0;KA.reset();KS.g.rotation.set(0,0,0);KS.g.position.y=0;done();}});};
