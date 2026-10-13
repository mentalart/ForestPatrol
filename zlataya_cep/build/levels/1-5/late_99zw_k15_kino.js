/* ============================== РЕЛИЗ final06 · 1-5 «КИКИМОРИНА ПРЯЛКА»: РОЛИКИ ВРУЧНУЮ И ПОКАЗКИ МЕХАНИК ============================== */
// Правила — zlataya_cep/docs/40_kino_pravila.md (def.kino, ≥ 3 крупностей, говорящий — лицом в кадр). Уровень (proto/levels/1-5.js) зовёт каждый ролик
// через k15c(id, def, ctx): здесь W.k15kino[id] строит новую постановку, а события уровня (events) и конец (end) берёт прежние — состояние после ролика
// и после пропуска то же, что раньше. Показки (demoLoom, demoWeb) — новые короткие ролики: контуры героев сами показывают механику зала.
//   intro   — ночь, Кикимора прядёт во сне, в веретене — чужая чёрная нить; герои в сенях, Звенышко: «отнимем веретено»; показка мотовила
//             (контур Потапа на левой площадке опускается, Пелагея на правой поднимается на полати);
//   demoLoom — у ткацкого стана: подножка поднимает нити (зев), клубок-челнок — полоса, потом другая подножка (по очереди);
//   demoWeb  — в овине: две золотые струны из колец в колышки крест-накрест, сплетается паутинка, контур Потапа подлетает на галерею;
//   flee     — веретено вырывается у Кикиморы и улетает в дверь на чердаке;   boss — Веретенник просыпается, сверху — план боя (струны, паутинка);
//   phase2   — Веретенник крутится и снова в коконе, Кикимора из овина: «троиться станет»;   finale — рассыпался, ключ на чёрной нитке уползает, Кикимора своим голосом.
{const _b15k=build15;build15=function(){_b15k.apply(this,arguments);W.k15kino=k15Kino();};}
function k15Kino(){const K=W.k15,F=W.flags,E=CINE.E,SN=KSND,H=HERO;
  const v=(x,y,z)=>new V3(x,y,z),acts=()=>G.solo?[active(G.soloPi)]:[active(0),active(1)];
  const ctr=list=>{const c=new V3();list.forEach(h=>c.add(h.pos));return c.multiplyScalar(1/list.length);};
  const ev=(def,shift)=>(def.events||[]).map(e=>({t:shift?shift(e.t):e.t,fn:e.fn}));
  const zven=()=>W.zven;
  // контур героя (полупрозрачный, как подсказки в залах); убрать — W.group.remove
  const ghost=(kind,x,y,z,face)=>{const g=buildHeroMesh(kind,true).g;g.position.set(x,y,z);g.rotation.y=face||0;W.group.add(g);return g;};
  // золотая струна-показка от a к b, растёт за долю k
  const strand=(a,b,col)=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(0.04,0.04,1,6),MB(col||COL.gold,{transparent:true,opacity:0.95}));W.group.add(m);
    m.userData.set=k=>{const e=a.clone().lerp(b,Math.max(0.001,k));m.position.copy(a).add(e).multiplyScalar(0.5);m.scale.y=a.distanceTo(e);m.quaternion.setFromUnitVectors(new V3(0,1,0),e.clone().sub(a).normalize());};m.userData.set(0);return m;};
  const hop=(g,from,to,k,h)=>{g.position.lerpVectors(from,to,E.inOutCubic(k));g.position.y+=Math.sin(k*Math.PI)*(h||0.8);};
  const zvenScript=on=>{const Z=zven();if(!Z)return;if(on){Z._m=Z.mode;Z.mode='script';Z.vis=Z.shown=true;}else if(Z._m!==undefined){Z.mode=Z._m;delete Z._m;}};
  const zvenTo=(p,dt)=>{const Z=zven();if(Z)Z.pos.lerp(p,dt?1-Math.exp(-5*dt):1);};
  const lift=(P,y)=>{P.g.position.y=y;P.ring.position.y=y+0.04;P.g.children.forEach(c=>{if(c.userData.rope){c.scale.y=10-y;c.position.y=(10-y)/2;}});};
  const R={};
  /* ---------- вступление ---------- */
  R.intro=def=>{const kiki=K.kiki,PL=K.PL;const T0=[15.2,16.4,18.0,18.6];   // показка мотовила: выход на площадки, ход, шаг на полати
    const sp=()=>{const p=new V3();kiki.spindle.getWorldPosition(p);return p;};
    return {dur:21.4,fov:46,kino:true,mood:['#6a5cc8',0.12],
      shots:[KS(0,[-6,14,-4],[4,4,-18],{p2:[-3,9.5,-9],l2:[4.3,2,-18],dur:3.4,move:'none'}),                                   // общий: овин сверху, кран вниз к прялке
        KS(3.4,[2.4,1.95,-18],[4.3,1.9,-18],{trk:KC.fcam(kiki,1.9,0,0.1,0.18),tr:'dip'}),                                        // крупно: Кикимора спит и прядёт
        KS(6.6,[2.9,1.6,-16.9],[4.4,1.3,-18],{p2:[2.4,6,-15],l2:[4.4,11.5,-15.8],dur:2.6,move:'none'}),                          // деталь: веретено и чёрная нить — по нити вверх
        KS(9.2,[8.5,2.6,45.3],[-1,3.4,39.5],{move:'crane',amp:0.5,fov:10,tr:'whip'}),                                              // общий: сени сбоку (за плетнём камера не встанет) — герои глядят на нить под крышей
        KS(12.2,[1.0,2.0,38.0],[2.5,1.6,42],{trk:KC.fcam(H.pelageya,4.0,0.4,0.3,0.12)}),                                          // средний: Пелагея — «по нити пойдём»
        KS(14.8,[0,7.2,42],[0,2.6,33],{p2:[0,6.2,39.5],l2:[0,3.4,32],dur:4,move:'none'}),                                          // общий: мотовило — показка
        KS(18.8,[-4.2,1.8,40.6],[-4.5,1.7,43.4],{trk:KC.fcam(H.potap,2.2,-0.35,0.1,0.15)})],                                      // крупно: Потап
      says:[[0.3,3.0,null,'<i>Ночь. В старом овине Кикимора прядёт и прядёт.</i>',true],
        [3.5,3.0,'kiki','<i>(сухим, деревянным голосом)</i> Пряди. Пряди. Не спи.'],
        [6.7,2.4,null,'<i>А в веретене — чужая чёрная нить.</i>',true],
        [9.4,2.7,'zven','Кикимору заворожили! Отнимем веретено — чары спадут!'],
        [12.3,2.4,'pelageya','По нити пойдём — она к веретену ведёт.'],
        [15.0,3.4,'zven','Сперва — мотовило: тяжёлый вниз, лёгкий — вверх!'],
        [19.0,2.3,'potap','Тяжёлый — это я! Держитесь!']],
      events:ev(def).filter(e=>e.t>99).concat([{t:0,fn:()=>{F.stage='intro';zvenScript(true);const Z=zven();if(Z)Z.pos.set(0,4,30);
          HEROES.forEach(h=>{const sp0=W.spawns[h.player][players[h.player].heroes.indexOf(h)];placeOnGround(h,sp0.x,sp0.z,0);h.vel.set(0,0,0);h.face=Math.PI;});}}]),
      cues:[[0.2,()=>SN.creak(0)],[1.6,()=>SN.creak(0)],[3.6,()=>SN.menace(0)],[6.8,()=>{CINE.rimPulse&&CINE.rimPulse(0.4);FX.sparkle(sp(),6,0x8a4ac0);}],
        [9.3,()=>SN.steps(0,4,0.3)],[10.2,KC.emo('proshka','surprise')],[10.4,KC.emo('yosha','surprise')],[11.6,KC.emo('potap','tilt')],[12.4,KC.emo('pelageya','nod')],
        [15.3,()=>SN.steps(0,4,0.24)],[16.4,()=>SN.creak(0)],[17.2,()=>SN.creak(0)],[18.0,()=>{FX.sparkle(v(6,5.4,32),10,0xffd76a);SN.yay(0);}],
        [19.1,KC.emo('potap','laugh')],[19.6,KC.emo('proshka','laugh')],[20.4,KC.all('joy',0.1)]],
      tick:(t,dt)=>{const Z=zven();
        // Звенышко: в сенях — перед героями, потом к площадкам и к полатям
        if(t>9&&Z){const p=t<14.8?v(Math.sin(t*1.6)*0.6,3.4,38.6):t<18?v(lerp(-6,6,E.inOutSine(clamp((t-15)/2.8,0,1))),3.6+Math.sin(t*3)*0.2,33.2):v(6,6.6,31);zvenTo(p,dt);Z.vis=true;}
        HEROES.forEach(h=>{if(t>9.2&&t<14.8)h.face=Math.PI;});                    // смотрят под крышу, на чёрную нить
        // показка мотовила: контуры на площадках — левая (Потап) вниз, правая (Пелагея) вверх, Пелагея шагает на полати
        if(t>=T0[1]){const k=E.inOutCubic(clamp((t-T0[1])/(T0[2]-T0[1]),0,1));lift(PL[0],lerp(0.9,0.08,k));lift(PL[1],lerp(0.9,4.4,k));PL.forEach(P=>{P.gh.visible=true;});}
        if(t>=T0[3]){const k=clamp((t-T0[3])/0.7,0,1);PL[1].gh.position.z=lerp(0.2,-2.6,E.inOutCubic(k));PL[1].gh.position.y=Math.sin(k*Math.PI)*0.3;}},
      end:()=>{PL.forEach(P=>{lift(P,P.y);P.gh.position.set(0,0,0.2);});zvenScript(false);
        HEROES.forEach(h=>{const sp0=W.spawns[h.player][players[h.player].heroes.indexOf(h)];placeOnGround(h,sp0.x,sp0.z,0);h.face=Math.PI;});def.end&&def.end();}};};
  /* ---------- показка ткацкого стана ---------- */
  R.demoLoom=()=>{const sp=K.spotRing.position,gP=ghost('potap',-5.3,4.4,27.6,Math.PI),gS=ghost('proshka',sp.x,4.4,sp.z,Math.PI);
    const strip=new THREE.Mesh(new THREE.BoxGeometry(3.02,0.16,2.2),MB(0xc0302a,{transparent:true,opacity:0}));strip.position.set(0,4.36,21.3);W.group.add(strip);
    const st0=F.stage;
    play({dur:8.8,fov:46,kino:true,mood:['#ffc890',0.08],
      shots:[KS(0,[8,11,27.6],[-2,4.4,19],{move:'crane',amp:0.5}),                                              // общий: стан и провал
        KS(2.4,[-2.5,7.2,28],[-5.3,4.6,25.4],{move:'push',amp:0.5}),                                             // средний: подножки
        KS(4.6,[1.2,5.9,24.4],[0,4.75,21.3],{trk:KC.look(()=>K.shuttle.visible?K.shuttle.position:null,0.5),tr:'whip'}),   // крупно: челнок летит в зев
        KS(6.6,[-1.5,7.4,29],[-5.3,4.6,25.4],{move:'truck',amp:0.5})],                                           // средний: другая подножка
      says:[[0.2,2.2,'zven','Ткацкий стан! Мост через провал соткём.'],[2.5,2.1,'zven','Подножка поднимает нити — зев открыт!'],
        [4.7,1.8,'zven','Второй — клубок в зев. Полоса!'],[6.9,2.0,'zven','Потом — другая подножка. По очереди!']],
      events:[{t:0,fn:()=>{F.stage='demo';}}],
      cues:[[2.7,()=>SN.steps(0,3,0.2)],[3.2,()=>SN.thud(0,0.05)],[4.9,()=>{SFX.thread();}],[5.5,()=>{SFX.knot();FX.sparkle(v(0,4.7,21.3),10,0xffd76a);}],[7.2,()=>SN.thud(0,0.05)]],
      tick:t=>{const P0=v(-5.3,4.4,27.6),P1=v(K.TRX[0],4.6,25.5),P2=v(K.TRX[1],4.6,25.5);
        if(t<2.6)gP.position.copy(P0);else if(t<3.2)hop(gP,P0,P1,(t-2.6)/0.6,0.6);else if(t<6.8)gP.position.copy(P1);else if(t<7.3)hop(gP,P1,P2,(t-6.8)/0.5,0.5);else gP.position.copy(P2);
        F.demoLift=t<3.2?-1:t<7.3?0:1;
        if(t>=4.8&&t<5.5){K.shuttle.visible=true;const k=(t-4.8)/0.7;K.shuttle.position.set(lerp(-2.8,2.8,k),4.75+Math.sin(k*Math.PI)*0.3,21.3);gS.rotation.y=Math.PI+Math.sin(k*Math.PI)*0.4;}else if(t>=5.5)K.shuttle.visible=false;
        strip.material.opacity=t<5.5?0:t<7.5?0.75:Math.max(0,0.75-(t-7.5));},
      end:()=>{F.demoLift=null;K.shuttle.visible=false;[gP,gS,strip].forEach(o=>W.group.remove(o));if(F.stage==='demo')F.stage=st0==='demo'?'play':st0;snapCams();}});};
  /* ---------- показка паутинки ---------- */
  R.demoWeb=()=>{const r0=K.rings[0],s0=K.STK[0],c=K.WEBC[0],L=K.LAND[0];
    const A=[v(r0[0].x,0.3,r0[0].z),v(r0[1].x,0.3,r0[1].z)],Bp=[v(s0[0].x,0.3,s0[0].z),v(s0[1].x,0.3,s0[1].z)];
    const st=[strand(A[0],Bp[0],0xffb040),strand(A[1],Bp[1],0x7ec0ff)];
    const a1=Math.atan2(Bp[0].z-A[0].z,Bp[0].x-A[0].x),a2=Math.atan2(Bp[1].z-A[1].z,Bp[1].x-A[1].x);
    const web=new THREE.Mesh(webGeo(a1,a2,1.25),MB(0xfff2b0,{transparent:true,opacity:0,side:THREE.DoubleSide,depthWrite:false}));web.position.set(c.x,c.y+0.06,c.z);W.group.add(web);
    const g=ghost('potap',c.x+0.6,0,c.z+2.4,Math.PI),gp=()=>g.position;const st0=F.stage;
    play({dur:9,fov:46,kino:true,mood:['#ffd27a',0.08],
      shots:[KS(0,[6,9,-6],[-3.5,0.5,-16],{move:'crane',amp:0.5}),                                                  // общий: кольца, колышки, галерея
        KS(2.2,[1.5,4.2,-10.5],[-3.5,0.4,-16],{move:'push',amp:0.5}),                                               // средний: струны летят в колышки
        KS(4.6,[-3.0,3.2,-14.6],[-3.5,0.26,-16],{move:'orbit',amp:0.6,tr:'whip'}),                                  // крупно сверху: крест-накрест — паутинка
        KS(6.2,[0.5,5.2,-11],[-5,1.5,-16],{trk:KC.look(()=>gp().clone().add(v(0,0.8,0)),0.7)})],                   // средний: контур Потапа подлетает на галерею
      says:[[0.2,2.0,'zven','Смотрите! Вот как подняться наверх.'],[2.4,5.4,'zven','Где две струны крест-накрест — паутинка там,<br>Прыгните — подкинет до крыши, к облакам!']],
      events:[{t:0,fn:()=>{F.stage='demo';}}],
      cues:[[2.4,()=>SFX.thread()],[3.3,()=>SFX.thread()],[4.4,()=>{SFX.knot();FX.sparkle(c.clone().add(v(0,0.4,0)),14,0xfff2b0);SN.trill(0);}],
        [6.6,()=>{SFX.toss();}],[7.9,()=>{SN.thud(0,0.05);FX.dust(L.clone(),8,0xd8c8a0);}],[8.1,KC.all('joy',0.1)]],
      tick:t=>{st[0].userData.set(clamp((t-2.4)/0.8,0,1));st[1].userData.set(clamp((t-3.3)/0.8,0,1));
        web.material.opacity=t<4.4?0:Math.min(0.9,(t-4.4)*2);web.rotation.y=0;const b=t>6.4&&t<6.9?Math.sin((t-6.4)/0.5*Math.PI):0;web.position.y=c.y+0.06-b*0.3;
        const G0=v(c.x+0.6,0,c.z+2.4),G1=v(c.x,c.y,c.z);
        if(t<5.6)g.position.copy(G0);else if(t<6.4)hop(g,G0,G1,(t-5.6)/0.8,0.9);else if(t<7.9){const k=(t-6.4)/1.5;g.position.lerpVectors(G1,L,k);g.position.y=lerp(G1.y,L.y,k)+Math.sin(k*Math.PI)*3;g.rotation.y=Math.atan2(L.x-c.x,L.z-c.z);}else g.position.copy(L);},
      end:()=>{st.forEach(m=>W.group.remove(m));W.group.remove(web);W.group.remove(g);if(F.stage==='demo')F.stage=st0==='demo'?'play':st0;snapCams();}});};
  /* ---------- веретено удирает ---------- */
  R.flee=(def,ctx)=>{const kiki=K.kiki,fly=()=>K.flySp.position.clone();const att=()=>acts().filter(h=>h.pos.y>6);
    return {dur:8.4,fov:48,kino:true,mood:['#8a7cff',0.12],
      shots:[KS(0,[2.3,1.95,-18],[4.3,1.9,-18],{trk:KC.fcam(kiki,2.0,0.3,0.1,0.15)}),                                                        // крупно: Кикимора во сне
        KS(2.6,[0,7,-26],[1,8,-30],{trk:KC.follow(fly,v(3.2,1.4,3.6),v(0,0.6,0),0.85)}),                                                       // средний: веретено летит
        KS(4.6,[3.5,11.5,-24.5],[-2.5,8.6,-34],{move:'push',amp:0.6,tr:'whip'}),                                                                 // общий: чердак и дверь
        KS(6.8,[-1,8.9,-27],[-2,8.1,-31],{trk:(pose)=>{const a=att();if(!a.length)return;const m=ctr(a);pose.look.set(m.x,m.y+1.1,m.z);pose.pos.set(m.x+3.6,m.y+1.7,m.z-1.0);}})],   // средний: герои на чердаке
      says:[[0.3,2.4,'kiki','<i>(во сне)</i> Пряди… Стой! Веретено, стой!'],[4.7,2.9,'zven','Веретено удрало на повить! Скорей за ним!']],
      events:ev(def),
      cues:[[0.4,()=>{CINE.punch&&CINE.punch(-2);SN.poof(0);}],[2.7,()=>SN.gust(0,1.2)],[4.9,()=>SN.sting(0)],[6.9,KC.all('surprise',0.1)],[7.6,KC.emo('potap','effort')]],
      tick:(t)=>{if(t>6.8)acts().forEach(h=>{h.face=Math.atan2(-2.5-h.pos.x,-34.2-h.pos.z);});},
      end:def.end};};
  /* ---------- Веретенник просыпается ---------- */
  R.boss=def=>{const B=K.B,NZ=K.NEST.z,be=()=>B.e?B.e.pos.clone().add(v(0,2,0)):v(0,8.6,NZ);let dem=null;
    return {dur:11.2,fov:48,kino:true,mood:['#8a5cc8',0.14],
      shots:[KS(0,[0,10.6,-53.5],[0,7.8,NZ],{p2:[0,9.6,-58],l2:[0,8.4,NZ],dur:3,move:'none'}),                                  // общий: из-за спин героев — гнездо
        KS(3,[4,9.6,NZ+3.6],[0,8.8,NZ],{trk:KC.orbit(be,5.2,1.4,0.9,0.2,0)}),                                                     // средний: облёт — веретено в коконе
        KS(4.4,[0,9.3,NZ+3.4],[0,9,NZ],{move:'push',amp:0.8,tr:'whip'}),                                                            // крупно: Веретенник
        KS(6.6,[0,8.6,-59.5],[0,8,-55.4],{move:'truck',amp:0.4}),                                                                     // средний: герои — испуг
        KS(8.2,[0,20.5,-53.2],[0,7,-65.5],{move:'push',amp:0.5})],                                                                    // общий сверху: план боя
      says:[[0.3,2.7,'zven','Веретено ожило! Это Веретенник!'],[4.5,2.1,'vereten','Пряду-кручу — всех опутаю!'],[8.3,1.9,'zven','Ловите его в паутинку!']],
      events:ev(def).concat([{t:6.4,fn:()=>{HEROES.forEach(h=>{if(h.pos.z<-53)h.face=Math.PI;});}}]),
      cues:[[1.2,()=>{SN.menace(0);CINE.trauma(0.12);}],[4.5,()=>{CINE.punch&&CINE.punch(-3);SN.sting(0);}],[6.7,KC.all('surprise',0.08)],
        [8.4,()=>{const A=K.AR_G;dem=[strand(v(A[0].r.x,7.3,A[0].r.z),v(A[0].st.x,7.3,A[0].st.z),0xffb040),strand(v(A[1].r.x,7.3,A[1].r.z),v(A[1].st.x,7.3,A[1].st.z),0x7ec0ff)];SFX.thread();}],
        [9.6,()=>{SFX.knot();FX.sparkle(K.WEBA.clone().add(v(0,0.4,0)),14,0xfff2b0);}]],
      tick:t=>{if(dem){dem[0].userData.set(clamp((t-8.4)/0.6,0,1));dem[1].userData.set(clamp((t-8.9)/0.6,0,1));}
        if(t>6.6&&t<8.2)HEROES.forEach(h=>{if(h.pos.z<-53)h.face=Math.PI;});},
      end:()=>{if(dem)dem.forEach(m=>W.group.remove(m));def.end&&def.end();}};};
  /* ---------- этап 2 ---------- */
  R.phase2=(def,ctx)=>{const at=ctx.at,e=ctx.e,kiki=K.kiki,be=()=>e.pos.clone().add(v(0,2.2,0));
    return {dur:9.6,fov:48,kino:true,mood:['#8a5cc8',0.14],
      shots:[KS(0,[at.x+4.5,10,at.z+5],[at.x,9,at.z],{trk:KC.orbit(be,5.6,1.2,0.7,-0.3,0)}),                       // средний: крутится
        KS(2.6,[at.x+1.6,9.4,at.z+2.2],[at.x,8.9,at.z],{move:'push',amp:0.8}),                                        // крупно: кокон снова
        KS(3.6,[2.3,1.95,-18],[4.3,1.9,-18],{trk:KC.fcam(kiki,2.0,-0.3,0.1,0.15),tr:'dip'}),                          // крупно: Кикимора в овине — «издалека»
        KS(7.9,[0,17,-54],[0,7,-66],{move:'push',amp:0.5,tr:'whip'})],                                                 // общий: повить
      says:[[0.3,2.5,'vereten','Ой-ой! Пряду-кручу — не дамся!'],[3.7,4.1,'kiki','<i>(издалека)</i> Детки… веретено моё… троиться станет — глядите зорче!']],
      events:ev(def),
      cues:[[0.3,()=>SN.gust(0,1.4)],[3.4,()=>{SN.poof(0);CINE.trauma(0.1);}],[8,KC.all('effort',0.1)]],
      end:def.end};};
  /* ---------- финал ---------- */
  R.finale=(def,ctx)=>{const at=ctx.at,kx=ctx.kx,kz=ctx.kz,kiki=K.kiki,kt=()=>K.keyThread.position.clone();const S=def.says||[];
    const heroesC=()=>ctr(HEROES);
    return {dur:21.6,fov:48,kino:true,mood:['#ffd27a',0.1],
      shots:[KS(0,[at.x+3.4,9.4,at.z+4.4],[at.x,8,at.z],{trk:KC.orbit(()=>at.clone().add(v(0,1,0)),5,1.6,0.6,1.3,0)}),       // средний: рассыпается куделью
        KS(3.6,[at.x+2,8.6,at.z+1.5],[at.x,7.2,at.z],{trk:(pose,u)=>{const p=kt();pose.look.lerp(p,0.8);pose.pos.lerp(p.clone().add(v(-1.6,1.6,2.6)),0.06);}}),   // крупно: ключ на чёрной нитке уползает
        KS(7.8,[kx-6,12,kz+8],[kx,7.6,kz],{move:'crane',amp:0.5,tr:'dip'}),                                                      // общий: Кикимора и герои
        KS(8.8,[kx-1.9,8.95,kz],[kx,8.9,kz],{trk:KC.fcam(kiki,1.9,0.15,0.1,0.15)}),                                             // крупно: Кикимора своим голосом
        KS(13.8,[kx,9,kz+4],[kx,8.2,kz+2.8],{trk:(pose)=>{const c=heroesC(),k=kiki.g.position;pose.look.set(c.x,c.y+1.1,c.z);pose.pos.set(k.x+(k.x-c.x)*0.25+0.8,c.y+2.4,k.z+(k.z-c.z)*0.25);}}),   // средний: герои радуются (из-за плеча Кикиморы)
        KS(15.4,[kx-3,9.2,kz],[kx,8.6,kz],{trk:KC.fcam(kiki,3.1,0.55,0.25,0.1)})],                                              // средний: Кикимора благодарит, звено — Прошке
      says:[[0.4,3.0,null,S[0]?S[0][3]:'',true],[3.7,4.0,null,S[1]?S[1][3]:'',true],[8.9,4.8,'kiki',S[2]?S[2][3]:''],[15.5,6.1,'kiki',S[3]?S[3][3]:'']].filter(q=>q[3]),
      events:ev(def).concat([{t:7.85,fn:()=>{const k=kiki.g.position;HEROES.forEach(h=>{h.face=Math.atan2(k.x-h.pos.x,k.z-h.pos.z);});}}]),
      cues:[[0.3,()=>{CINE.slowmo&&CINE.slowmo(0.5,0.8);SN.poof(0);FX.sparkle(at.clone().add(v(0,2,0)),16,0xe8dcc0);}],[3.8,()=>SN.icy(0)],[6.5,()=>SN.keyFall(0)],
        [9,KC.emo('pelageya','tilt')],[13.9,KC.all('joy',0.1)],[16.1,()=>SN.yay(0)],[17.4,()=>FX.sparkle(H.proshka.pos.clone().add(v(0,1.4,0)),10,0xffd76a)],[19.5,KC.all('cheer',0.12)]],
      tick:t=>{if(t>7.85&&t<13.8){const k=kiki.g.position;HEROES.forEach(h=>{h.face=Math.atan2(k.x-h.pos.x,k.z-h.pos.z);});}},
      end:def.end};};
  return R;}
