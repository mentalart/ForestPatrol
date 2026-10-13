/* ============================== РЕЛИЗ final06 · 1-1 «ИЗБУШКА, ПОВЕРНИСЬ»: РОЛИКИ С ЯГОЙ — «ЯГА СТАВИТ ЗАДАЧУ» И «КЛУБКИ В ДАР» ============================== */
// Ручная постановка общим слоем late_86b_kino.js (def.kino), правила — docs/40_kino_pravila.md. Два ролика связаны в одну историю:
// в первом Яга показывает клубок-награду и смеряет хвастуна Прошку взглядом поверх очков, во втором — дарит клубки, а Прошке —
// последнему, тем же взглядом; его клубок выскальзывает и катится, золотая нить ложится через грядку (подсказка механики без текста).
// Ролик 1 «Яга ставит задачу» (19,2 с, 10 планов): скрипит дверь, в темноте — блик очков и пустые рамки, Яга выглядывает; сердится,
//   грозит пальцем; лужи пузырятся; клубок в поднятой руке; герои ахают; Прошка хорохорится; очки крупно — пауза; герои переглядываются;
//   лужа за спинами вскипает (замедление) — кикиморки; облёт героев. Звенышко: «Защищайтесь!»
// Ролик 2 «Клубки в дар» (22,6 с, 10 планов): кран над чистым двором — герои сбегаются к крыльцу; Яга бросает клубки трём героям, а
//   Прошкин прячет; спрыгивает с крыльца и вприскочку обходит героев — каждому шепчет на ухо (планы на двоих); Прошке — взгляд поверх
//   очков, клубок в лапы — выскользнул, нить обмотала Прошку, клубок катится через грядку; все смеются.
// Реплики и записи голоса — прежние (время — под длину записей); ремарки рассказчика — короче. Ролики зовёт прототип: замены в
// rep_31_yaga11.py отдают сцены сюда (FIN.yaga11, FIN.yaga11gift), без модуля — прежние ролики. Бот — tfin_yaga11.
FIN.y11={
  // клубок-реквизит: золотой шар в витках нити
  clew(r){r=r||0.17;const g=new THREE.Group();W.group.add(g);g.add(new THREE.Mesh(new THREE.SphereGeometry(r,12,10),M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.8})));
    for(let i=0;i<5;i++){const t=new THREE.Mesh(new THREE.TorusGeometry(r*1.02,r*0.13,5,18),M(0xffd76a,{emissive:0xc08000,emissiveIntensity:0.6}));t.rotation.set(i*0.7,i*1.3,i*0.4);g.add(t);}
    g.visible=false;return g;},
  // дверь избы на петлях (слева): k 0…1 — открыта; за ней — тёмный проём и пустые рамки (hut.inner — вровень с дверью, за брёвнами не прячется)
  door(hut,k){if(!hut.doorPiv){const d=hut.door,pv=new THREE.Group();pv.position.set(-0.475,0.8,1.56);d.parent.add(pv);pv.add(d);d.position.set(0.475,0,0);hut.doorPiv=pv;
      hut.inner.position.z=1.618;hut.inner.scale.z=0.3;}
    hut.doorPiv.rotation.y=-1.75*k;hut.inner.visible=true;},
  // кости Яги: исходные значения — чтобы вернуть после ролика
  rig(yaga){const B=yaga.rig||{},R={B,rot:{},by:{}};for(const n of['shoulderR','elbowR','shoulderL','elbowL','browL','browR'])if(B[n])R.rot[n]=B[n].rotation.clone();
    R.set=(n,x,y,z)=>{const b=B[n],r=R.rot[n];if(b&&r)b.rotation.set(r.x+(x||0),r.y+(y||0),r.z+(z||0));};
    // брови: frown — нахмурены (внутренние концы вниз), up — левая вверх (castFace держит высоту от userData.y0)
    R.brow=(frown,up)=>{for(const[n,s]of[['browL',1],['browR',-1]]){const b=B[n];if(!b)continue;R.set(n,0,0,s*frown);if(b.userData.y0!=null){if(R.by[n]==null)R.by[n]=b.userData.y0;b.userData.y0=R.by[n]+(n==='browL'?up:up*0.3);}}};
    R.reset=()=>{for(const n in R.rot)B[n].rotation.copy(R.rot[n]);for(const n in R.by)B[n].userData.y0=R.by[n];if(yaga.head)yaga.head.rotation.set(0,0,0);
      if(yaga.body){yaga.body.rotation.set(0,0,0);yaga.body.position.y=0;yaga.body.scale.set(1,1,1);}};
    R.hand=(n)=>{const b=B[n];return b?b.getWorldPosition(new V3()).add(new V3(0,-0.06,0)):yaga.g.position.clone().add(new V3(0,1.3,0.3));};
    return R;},
  bubble(puddles,n){for(const [x,z] of puddles)for(let i=0;i<(n||3);i++)later(i*0.22+Math.random()*0.3,()=>{burst(new V3(x+rand(-0.5,0.5),0.15,z+rand(-0.5,0.5)),[0x6a8a3a,0x8aa850,0x4a6a2a][i%3],3,1.6,0.5);});}};
/* ---------- ролик 1: «Яга ставит задачу» ---------- */
FIN.yaga11=function(c){const {F,yaga,hut,spawnKiki,arena,puddles}=c;F.stage='yaga';const T=HERO,Y=FIN.y11,E=CINE.E,R=Y.rig(yaga);yaga.g.visible=true;
  const YP=new V3(0,1.1,-26.4),EYE=2.85,EYEP=new V3(0,EYE,-26.3),spots=[[-2.6,-19.8],[-0.9,-19.3],[0.9,-19.3],[2.6,-19.8]],PUD=new V3(0,0,-16.5);
  const from=HEROES.map(h=>h.pos.clone()),P=T.proshka,ctr=()=>new V3(0,0.6,-19.4);
  const clew=Y.clew(0.2);let clewK=0;
  const fx=(h,p)=>Math.atan2(p.x-h.pos.x,p.z-h.pos.z);
  play({dur:19.2,fov:46,kino:true,mood:['#ffc890',0.1],
    shots:[KS(0,[1.6,1.6,-15.0],[0,2.1,-26.4],{p2:[0.6,2.0,-19.2],l2:[0,2.3,-26.4],dur:3.6,move:'none'}),   // 1 общий из-за спин: наезд на дверь — скрип, блик очков, Яга выглядывает
      KS(3.6,[0.55,2.75,-23.2],[0,EYE-0.05,-26.4],{move:'push',amp:0.6}),                                     // 2 крупно, на уровне глаз: «Кикиморки весь двор мне замусорили!» — грозит пальцем
      KS(5.2,[0.5,4.2,-24.2],[0,0.2,-17.5],{tr:'whip',move:'crane',amp:0.5}),                                 // 3 с крыльца на двор: лужи булькают
      KS(6.2,[1.1,2.35,-22.7],[0,2.45,-26.4],{tr:'whip',move:'push',amp:0.8}),                                // 4 средний: «Уберёте — клубок подарю» — клубок в поднятой руке
      KS(8.1,[0.3,2.2,-24.9],[0,1.0,-19.4],{move:'truck',amp:0.5}),                                           // 5 обратный: герои ахают на клубок
      KS(9.0,[P.pos.x+1.5,1.25,P.pos.z-2.3],[P.pos.x,1.05,P.pos.z],{trk:KC.fcam(P,2.0,0.5,0.05,0.12)}),       // 6 Прошка крупно: «Да я сам верёвку сплету!»
      KS(12.8,[0.15,EYE-0.3,-24.6],[0,EYE-0.05,-26.4],{move:'push',amp:0.6,fov:-4}),                         // 7 очки очень крупно: Яга молча глядит поверх очков
      KS(14.1,[1.6,1.3,-23.6],[0,0.9,-19.5],{move:'push',amp:0.5}),                                           // 8 обратный: герои переглядываются
      KS(15.0,[0,5.0,-10.4],[0,0.4,-21],{p2:[0,4.0,-11.6],l2:[0,0.4,-19],dur:2.2,move:'none'}),               // 9 общий: лужа за спинами вскипает — кикиморки
      KS(17.2,[4.7,1.9,-16.4],[0,0.7,-19.4],{trk:KC.orbit(ctr,5.6,1.3,1.0,0.45,0.2),move:'none'})],           // 10 облёт: герои спина к спине
    says:[[0.3,3.2,null,'<i>Скрип! Выглянула Яга — сердитая-пресердитая.</i>',true],
      [3.8,5.0,'yaga','Кикиморки весь двор мне замусорили!<br>Уберёте — клубок подарю, чтоб вы не спорили.'],
      [9.1,3.6,'proshka','Клубок ниток? Да я сам верёвку сплету — и не такое могу!'],[13.0,1.6,'yaga','…'],[15.6,3.4,'zven','Кикиморки! Защищайтесь, не зевайте!']],
    events:[{t:15.2,fn:spawnKiki}],
    cues:[[0.5,()=>KSND.creak(0)],[1.3,()=>CINE.rimPulse(0.5)],[1.5,()=>{for(const s of[-1,1])FX.sparkle(EYEP.clone().add(new V3(s*0.1,0,0)),3,0xffffff);KSND.peep(0);}],
      [2.0,()=>KSND.steps(0,2,0.22)],[2.2,KC.all('surprise',0.07)],[3.9,()=>CINE.punch(-2)],[4.1,KC.emo('yosha','flinch')],
      [5.2,()=>{Y.bubble(puddles,3);SFX.splash();}],[5.7,()=>Y.bubble(puddles,2)],
      [6.55,()=>{KSND.magic(0,523);FX.sparkle(R.hand('handR'),10,0xffd23a);CINE.rimPulse(0.7);}],[8.15,KC.all('joy',0.08)],[8.25,()=>KSND.yay(0)],
      [9.3,KC.emo('proshka','pride')],[11.5,KC.emo('potap','tilt')],
      [12.9,()=>{CINE.dollyZoom(0.18,1.0,0.6);KSND.sting(0);}],[13.3,()=>FX.sparkle(EYEP.clone().add(new V3(0.1,0.02,0.12)),4,0xffffff)],
      [14.15,KC.emo('proshka','droop')],[14.3,KC.emo('potap','tilt')],[14.45,KC.emo('pelageya','tilt')],
      [15.0,()=>{Y.bubble([[0,-16.5]],5);KSND.menace(0);}],[15.25,()=>{CINE.slowmo(0.4,0.8);CINE.punch(-4);CINE.trauma(0.12);SFX.splash();FX.drops(PUD.clone().add(new V3(0,0.3,0)),14);}],
      [15.4,KC.all('fear',0.06)],[16.6,KC.all('effort',0.08)]],
    tick:(t,dt)=>{
      // герои: полукругом перед избой, лицом к Яге; на паузе — переглядываются; лужа за спиной вскипела — оборачиваются
      HEROES.forEach((h,i)=>{const k=E.inOutCubic(clamp(t/1.3,0,1)),s=spots[i];h.pos.set(lerp(from[i].x,s[0],k),lerp(from[i].y,0,k),lerp(from[i].z,s[1],k));h.vel.set(0,0,0);
        h.face=t>=15.3?fx(h,PUD):t>=14.1&&t<15?fx(h,HEROES[i^1].pos):k<1&&t<1.2?Math.atan2(s[0]-from[i].x,s[1]-from[i].z)||Math.PI:fx(h,YP);});
      // дверь: скрип — распахнулась; в темноте блик очков — Яга выглядывает с пружинкой
      Y.door(hut,E.outBack(clamp((t-0.5)/0.8,0,1)));yaga.g.position.set(0,1.1,lerp(-27.05,-26.4,E.outBack(clamp((t-1.9)/0.6,0,1))));yaga.g.rotation.y=0;
      // руки: грозит пальцем (4,0–5,9) · клубок над головой (6,5–9,5) · руки в боки на паузе
      R.reset();const wag=t>=4.0&&t<5.9,show=clamp((t-6.5)/0.5,0,1)*(1-clamp((t-9.1)/0.4,0,1));
      if(wag){R.set('shoulderR',-0.9,0,-0.08);R.set('elbowR',-0.5+Math.sin(t*14)*0.25);}
      if(show>0){const k=E.outBack(show);R.set('shoulderR',-1.95*k,0,-0.1*k);R.set('elbowR',0.1*k);}
      if(t>=12.8&&t<15)R.set('shoulderL',0,0,0.5),R.set('elbowL',-0.9),R.set('shoulderR',0,0,-0.5),R.set('elbowR',-0.9);
      clewK=show;clew.visible=show>0.02;if(clew.visible){clew.position.copy(R.hand('handR')).add(new V3(0,0.12,0.04));clew.scale.setScalar(0.3+0.7*show);clew.rotation.y+=(dt||0)*2.4;}
      // лицо: сердится (брови домиком внутрь) — с первой реплики до клубка; на паузе — левая бровь вверх, голова вниз (поверх очков)
      const peer=t>=12.9&&t<14.6;R.brow(t>=3.6&&t<6.5||peer?0.35:0,peer?0.035:0);
      if(yaga.head)yaga.head.rotation.x=peer?0.24:wag?Math.sin(t*7)*0.06:Math.sin(t*1.7)*0.04;
      if(yaga.body){yaga.body.rotation.x=wag?0.12:0;yaga.body.position.y=Math.sin(G.time*2)*0.02;}},
    end:()=>{R.reset();Y.door(hut,1);yaga.g.position.copy(YP);yaga.g.rotation.y=0;W.group.remove(clew);if(!arena.started)spawnKiki();F.stage='fight';snapCams();}});};
/* ---------- ролик 2: «Клубки в дар» — после уборки двора ---------- */
FIN.yaga11gift=function(c){const {F,yaga,hut,HEAP,porchLink}=c;F.stage='gift';const T=HERO,Y=FIN.y11,E=CINE.E,R=Y.rig(yaga);yaga.g.visible=true;Y.door(hut,1);
  const ORD=[T.potap,T.pelageya,T.yosha,T.proshka],LX=[-4.0,-2.2,2.2,4.0],LZ=-23.2,YZ=-22.6,   // ряд — по обе стороны крыльца: изба не загораживает дорогу на север
    from=ORD.map(h=>h.pos.clone());
  const POR=new V3(0,1.1,-26.2),yAt=i=>new V3(LX[i]+0.9,0,YZ),heap=HEAP||new V3(-8.9,0,-25.6);
  // Яга: на крыльце → прыжок к Потапу → вприскочку к Пелагее, Йоше, Прошке
  const HOPS=[[5.6,0.6,-1,0],[10.75,0.35,0,1],[14.0,0.45,1,2],[15.95,0.3,2,3]];
  const yagaAt=t=>{let p=POR.clone(),at=-1,land=-9;for(const [t0,d,a,b] of HOPS){if(t<t0)break;const A=a<0?POR:yAt(a),k=clamp((t-t0)/d,0,1);
      p=new V3().lerpVectors(A,yAt(b),E.inOutSine(k));p.y+=Math.sin(k*Math.PI)*(a<0?0.9:0.45);at=k<1?-2:b;land=t0+d;}return {p,at,land};};
  // камера «на двоих»: от крыльца — герой лицом к нам, Яга за его плечом склонилась к уху, лицо вполоборота
  const wCam=(i,t)=>{const x=LX[i],hh=ORD[i].d.height,lo=hh<0.8,y=(hh*0.8+1.55)/2-(lo?0.32:0);return KS(t,[x+0.15,y+(lo?0.2:-0.12),-26.0],[x+0.15,y,-23.0],{move:'push',amp:0.4,fov:8});};   // по высоте — между головами (к Йоше — пониже и сверху)
  // клубки: три — в полёт к героям, Прошкин — Яга прячет, потом отдаёт; он выскальзывает и катится через грядку
  const CL=ORD.map(()=>Y.clew(0.16)),TOSS=[4.1,4.5,4.9],FLY=0.55;
  const PATH=[new V3(LX[3],0,-23.0),new V3(4.3,0,-27.5),new V3(3.8,0,-35.5),new V3(3.4,0,-44.5)],SEG=[];let PL=0;
  for(let i=0;i<PATH.length-1;i++){const m=new THREE.Mesh(new THREE.CylinderGeometry(0.035,0.035,1,6),M(0xffd76a,{emissive:0xffb000,emissiveIntensity:0.9}));m.visible=false;W.group.add(m);
    const l=PATH[i].distanceTo(PATH[i+1]);SEG.push({m,a:PATH[i],b:PATH[i+1],l,s0:PL});PL+=l;}
  const onBed=z=>z<-38;
  const pathAt=s=>{for(const g of SEG)if(s<=g.s0+g.l||g===SEG[SEG.length-1]){const k=clamp((s-g.s0)/g.l,0,1),p=new V3().lerpVectors(g.a,g.b,k);p.y=onBed(p.z)?0.3:0.06;return p;}};
  const thread=s=>{for(const g of SEG){const L=clamp(s-g.s0,0,g.l);g.m.visible=L>0.02;if(!g.m.visible)continue;const a=g.a.clone(),b=new V3().lerpVectors(g.a,g.b,L/g.l);a.y=onBed(a.z)?0.3:0.06;b.y=onBed(b.z)?0.3:0.06;
      const d=new V3().subVectors(b,a);g.m.position.copy(a).addScaledVector(d,0.5);g.m.scale.set(1,d.length(),1);g.m.quaternion.setFromUnitVectors(new V3(0,1,0),d.normalize());}};
  const RINGS=[0.3,0.55,0.8].map((y,i)=>{const r=new THREE.Mesh(new THREE.TorusGeometry(0.42-i*0.06,0.035,5,20),M(0xffd76a,{emissive:0xffb000,emissiveIntensity:0.9}));r.visible=false;W.group.add(r);return {r,y};});
  const ROLL0=18.2,ROLL=2.4,ball=()=>CL[3].position;
  const chest=h=>h.pos.clone().add(new V3(Math.sin(h.face)*0.3,h.d.height*0.38,Math.cos(h.face)*0.3));
  const arc=(a,b,k,hgt)=>{const p=new V3().lerpVectors(a,b,k);p.y+=Math.sin(k*Math.PI)*hgt;return p;};
  const props=[...CL,...SEG.map(g=>g.m),...RINGS.map(q=>q.r)],Z=W.zven,zm=Z&&Z.mode,LK=porchLink&&porchLink.g,lk0=LK&&LK.visible;   // звено цепи у крыльца — на время ролика спрятать (стоит между камерой и героями)
  play({dur:22.6,fov:46,kino:true,mood:['#ffc890',0.12],
    shots:[KS(0,[-6.5,6.5,-17.5],[heap.x,0.6,heap.z],{p2:[-2.5,3.6,-15.5],l2:[0,1.6,-25],dur:2.6,move:'none'}),   // 1 общий, кран: чистый двор, куча у забора искрит — герои сбегаются к крыльцу
      KS(2.6,[0.6,2.6,-22.6],[0,2.5,-26.2],{move:'push',amp:0.6}),                                                  // 2 Яга: «Вот это двор — любо-дорого глядеть!» — в руках клубки
      KS(4.0,[7.5,2.6,-19.5],[-0.5,1.3,-24.2],{tr:'whip',move:'truck',amp:0.6}),                                   // 3 общий сбоку: клубки летят — ловят! Прошке не досталось; Яга — с крыльца
      wCam(0,6.3),                                                                                                  // 4 на двоих: Потапу на ухо
      KS(9.3,[LX[0]+0.5,1.3,-25.0],[LX[0],1.0,-23.2],{trk:KC.fcam(T.potap,1.7,0.35,0.05,0.12)}),                          // 5 Потап крупно: понял, кивает
      wCam(1,11.1),                                                                                                 // 6 на двоих: Пелагее
      wCam(2,14.3),                                                                                                 // 7 на двоих: Йоше — иголки дыбом
      KS(16.2,[LX[3]+0.15,1.33,-26.0],[LX[3]+0.15,1.35,-23.0],{move:'push',amp:0.9,fov:-3}),                                    // 8 Прошка и Яга: взгляд поверх очков, клубок в лапы — выскользнул!
      KS(18.4,[6.4,1.6,-20.4],[4.2,0.3,-26],{trk:KC.follow(()=>ball().clone(),new V3(2.1,1.5,3.4),new V3(0,0,-2.5),1)}),   // 9 за клубком: нить через грядку
      KS(20.7,[1.4,2.4,-26.2],[2.8,0.9,-23.0],{move:'pull',amp:0.6})],                                               // 10 все смеются: Прошка в нитках
    says:[[0.5,5.4,'yaga','Вот это двор — любо-дорого глядеть!<br>Каждому по клубку, помощнички, — владеть!'],
      [6.3,4.6,'yaga','<i>(Потапу, на ухо)</i> В лесу у Лешего шапку наизнанку наденьте —<br>А не то заблудитесь, не отвертитесь.'],
      [11.1,3.2,'yaga','<i>(Пелагее)</i> У Лешего в лесу — шапку наизнанку, душенька…'],[14.5,1.6,'yaga','<i>(Йоше)</i> …а не то заплутаете.'],
      [16.3,2.6,null,'<i>Прошка глаза закатил: в приметы он не верит.</i>',true]],
    cues:[[0.2,()=>{FX.sparkle(heap.clone().add(new V3(0,1.2,0)),10,0xfff0a0);KSND.yay(0);}],[0.4,()=>KSND.steps(0,6,0.25)],
      [3.2,()=>{KSND.magic(0,587);FX.sparkle(R.hand('handR'),10,0xffd23a);CINE.rimPulse(0.6);}],[3.4,KC.all('surprise',0.07)],
      ...TOSS.map(t=>[t,()=>KSND.puff(0)]),...TOSS.map((t,i)=>[t+FLY,()=>{KSND.catchF(0);FX.sparkle(chest(ORD[i]),5,0xffd23a);}]),
      [4.7,KC.emo('potap','joy')],[5.1,KC.emo('pelageya','hop')],[5.5,KC.emo('yosha','joy')],[5.35,KC.emo('proshka','surprise')],[5.8,KC.emo('proshka','droop')],
      [6.2,()=>{KSND.thud(0,0.08);FX.dust(yAt(0),8);CINE.trauma(0.08);}],[8.0,KC.emo('potap','nod')],[9.6,KC.emo('potap','nod')],[10.2,KC.emo('potap','pride')],
      ...HOPS.slice(1).map(([t0,d])=>[t0+d,()=>KSND.thud(0,0.04)]),[12.6,KC.emo('pelageya','tilt')],[13.6,KC.emo('pelageya','nod')],
      [15.1,KC.emo('yosha','fear')],[15.5,KC.emo('yosha','hop')],
      [16.4,()=>{CINE.dollyZoom(0.16,0.9,0.5);KSND.sting(0);}],[16.7,()=>{KC.emo('proshka','pride')();floatText(T.proshka.pos.clone().add(new V3(0,1.8,0)),'Ну-ну…','#ff9a66');}],
      [17.4,()=>KSND.magic(0,659)],[17.95,()=>{KSND.snap(0);CINE.punch(-3);}],[18.0,KC.emo('proshka','flinch')],[18.3,KC.all('surprise',0.06)],
      [18.6,()=>KSND.steps(0,6,0.18)],[20.2,()=>{KSND.trill(0);FX.sparkle(ball().clone().add(new V3(0,0.3,0)),10,0xffd23a);}],
      [20.8,KC.all('laugh',0.1)],[20.9,KC.emo('yaga','laugh')],[21.0,()=>KSND.yay(0)]],
    tick:(t,dt)=>{if(LK)LK.visible=false;if(Z&&Z.pos){Z.mode='script';Z.vis=true;Z.pos.lerp(new V3(Math.sin(t*0.8)*1.2,3.6+Math.sin(t*2)*0.12,-20.4),dt?1-Math.exp(-3*dt):0);}
      // герои сбегаются к крыльцу в ряд, лицом к избе; кому шепчут — ухом к Яге; Прошка крутится в нитках; в конце все — на Прошку
      ORD.forEach((h,i)=>{const k=E.inOutSine(clamp((t-0.2)/2.2,0,1)),s=new V3(LX[i],0,LZ);h.pos.set(lerp(from[i].x,s.x,k),lerp(from[i].y,0,k),lerp(from[i].z,s.z,k));h.vel.set(0,0,0);
        let f=k<1&&t<2.3?Math.atan2(s.x-from[i].x,s.z-from[i].z):Math.PI;const ya=yagaAt(t);if(ya.at===i)f=Math.PI-0.25;
        if(h===T.proshka&&t>=18&&t<19.2)f=Math.PI+E.outCubic(clamp((t-18)/1.2,0,1))*Math.PI*4;else if(t>=20.7&&h!==T.proshka)f=Math.atan2(LX[3]-h.pos.x,0.01);h.face=f;});
      // Яга: прыжки; за плечом героя — к его уху, лицом вполоборота к камере, наклон; рука у рта — шепчет
      const ya=yagaAt(t);yaga.g.position.copy(ya.p);const near=ya.at>=0?ORD[ya.at]:null;R.reset();
      if(ya.at===-2){const nx=HOPS.find(([t0,d])=>t>=t0&&t<t0+d),to=yAt(nx[3]);yaga.g.rotation.y=Math.atan2(to.x-yaga.g.position.x,to.z-yaga.g.position.z);}
      else if(near){yaga.g.rotation.y=Math.atan2(-0.6,-0.8);
        const ld=clamp((t-ya.land)/0.2,0,1);if(yaga.body){const lo=1.7-near.d.height;yaga.body.rotation.x=0.15*ld;yaga.body.rotation.z=-(0.1+lo*0.12)*ld;yaga.body.scale.y=(1-lo*0.2*ld)*(1-0.15*Math.sin(clamp((t-ya.land)/0.18,0,1)*Math.PI));}
        if(yaga.head)yaga.head.rotation.y=0.3*ld;
        const whisper=near!==T.proshka||t<16.4;if(whisper&&ld>0){R.set('shoulderL',-1.2*ld);R.set('elbowL',-1.6*ld);}}
      else yaga.g.rotation.y=0;
      // клубки в руках (3,2) → броски Потапу, Пелагее, Йоше (замах — бросок); Прошкин — за спину (5,3)
      const inH=t>=3.2&&t<4.1,held=clamp((t-3.2)/0.3,0,1);if(inH){R.set('shoulderR',-1.1*held);R.set('elbowR',-0.5*held);R.set('shoulderL',-1.1*held);R.set('elbowL',-0.5*held);}
      for(const t0 of TOSS){const u=t-t0;if(u>-0.25&&u<0.35)R.set('shoulderR',u<0?0.6*(u+0.25)/0.25:lerp(0.6,-1.5,E.outCubic(clamp(u/0.2,0,1))));}
      const hR=R.hand('handR'),hL=R.hand('handL');
      CL.forEach((g,i)=>{g.rotation.y+=(dt||0)*2.4;g.scale.setScalar(t<3.5?E.outBack(clamp((t-3.2)/0.3,0,1)):1);g.visible=t>=3.2;
        if(i<3){const t0=TOSS[i];if(t<t0)g.position.copy(i%2?hL:hR).add(new V3(i*0.06-0.06,0.08,0.05));else if(t<t0+FLY)g.position.copy(arc(hR,chest(ORD[i]),E.inOutSine((t-t0)/FLY),1.4));else g.position.copy(chest(ORD[i]));return;}
        // Прошкин клубок: в руке → спрятан за спину (5,3–17,2) → в лапы (17,4) → выскользнул и покатился (18,2), нить — следом
        if(t<5.3)g.position.copy(hL).add(new V3(0.06,0.08,0.05));
        else if(t<17.2){g.visible=false;}
        else if(t<17.4){g.position.copy(hR);if(near)R.set('shoulderR',-1.2);}
        else if(t<17.75){R.set('shoulderR',-1.2);g.position.copy(arc(hR,chest(T.proshka),E.inOutSine((t-17.4)/0.35),0.3));}
        else if(t<17.95)g.position.copy(chest(T.proshka));
        else if(t<ROLL0){const p=chest(T.proshka);g.position.copy(arc(p,PATH[0].clone().setY(0.16),(t-17.95)/(ROLL0-17.95),0.25));}
        else{const k=E.outCubic(clamp((t-ROLL0)/ROLL,0,1)),s=k*PL,p=pathAt(s);g.position.copy(p).add(new V3(0,0.12+Math.abs(Math.sin(s*2.2))*0.12,0));g.rotation.x-=(dt||0)*12*(1-k);thread(s);}});
      // нитки на Прошке: виток за витком
      RINGS.forEach((q,i)=>{const k=clamp((t-18.05-i*0.12)/0.3,0,1);q.r.visible=k>0;if(!k)return;const h=T.proshka;q.r.position.set(h.pos.x,h.pos.y+h.d.height*q.y,h.pos.z);q.r.rotation.set(Math.PI/2+Math.sin(t*3+i)*0.25,0,i*0.6);q.r.scale.setScalar(E.outBack(k));});
      R.brow(t>=16.3&&t<17.4?0.2:0,t>=16.3&&t<17.4?0.035:0);if(yaga.head&&t>=16.3&&t<17.4)yaga.head.rotation.x=0.24;
      if(yaga.body&&!near&&ya.at!==-2)yaga.body.position.y=Math.sin(G.time*2)*0.02;},
    end:()=>{R.reset();props.forEach(o=>W.group.remove(o));if(Z&&Z.pos)Z.mode=zm;if(LK)LK.visible=lk0&&!porchLink.taken;F.stage='yard';W.abil.clew=true;W.abil.toss=true;yaga.g.position.set(-1.1,1.1,-26.1);yaga.g.rotation.y=0;snapCams();
      banner('Клубок-путеводитель!','#ffd76a',2.6,'кнопка R (у второго игрока ;, на джойстике RB): клубок покатится — золотую нить потянет');}});};

/* ---------- M-4b (docs/34): подсказки боя с Ягой — ≤ 7 слов, кнопки в карточке не мельче текста (≥ 3 % высоты окна) ---------- */
// Тексты общего движка и 1-2 в других уровнях прежние; озвучки у этих подсказок нет (озвучены только реплики ролика).
FIN.yaga11Tip=html=>{let m;
  if(m=/^Не попасть! Отбей (.*?), потом бей (.*?)\.$/.exec(html))return 'Отбей удар '+m[1]+' — потом бей '+m[2]+'!';
  if(/^Колокольчик! Коль упадёшь/.test(html))return 'Колокольчик — упадёшь, сюда вернёшься.';
  return html;};
{const _tp=tip;tip=function(pi,html,dur){if(W&&W.levelId==='1-1'&&typeof html==='string')html=FIN.yaga11Tip(html);return _tp(pi,html,dur);};}
{const st=document.createElement('style');st.textContent='body.fin-y11 .hn-card kbd,body.fin-y11 .hn-card .pb{font-size:calc(var(--hnf)*var(--fts))}';document.head.appendChild(st);
 const _ui=updateUI;updateUI=function(dt){_ui(dt);try{document.body.classList.toggle('fin-y11',!!(W&&W.levelId==='1-1'));}catch(e){}};}
