/* ============================== РЕЛИЗ final06 · 1-4 «ЛЕШИЙ ВОДИТ»: РОЛИКИ В РУЧНОЙ ПОСТАНОВКЕ — ШАПКИ, «ПЕЛАГЕЮ УВЕЛИ», АУКА ============================== */
// Ручная постановка общим слоем late_86b_kino.js (def.kino), правила — docs/40_kino_pravila.md. Четыре ролика уровня — одна история:
// «в лесу деревья ходят, а Прошка не верит» → лес его наказывает → лесной дух оказывается другом.
// Ролик 1 «Шапки из мха» (13,8 с, 9 планов; было 12 с, 3 плана: герои спиной к камере, на последнем плане камера в кустах, реплика
//   Прошки обрывалась концом ролика). Кран к пню — герои сбегаются; шапки на пне «дышат»; каждому — свой план: Потап гордо, Пелагея
//   смеётся, Йоша ворчит (шапка падает сверху с пружинкой); облёт — трое в шапках глядят на Прошку, а он держит свою двумя пальцами;
//   крупно: «Лес — просто деревья» — замах, бросок, шапка по дуге шлёпается на пень; обратный план: за его спиной ёлка открывает глаза
//   и крадётся — «Деревья не ходят…» — Прошка оборачивается, ёлка замерла с поднятой ногой; крупно — ёлка невинно моргает.
// Ролик 2 «Пелагею увели» (25,5 с, 14 планов; хоровод и вихрь — late_99b_kidnap14.js, тайминги те же): Пелагея среди светлячков (облёт),
//   Прошка отвлёкся на огонёк, глаза за спиной, ёлки на цыпочках, «Ой… Прошка?!» — крупно внутри хоровода, её поднимает (замедление),
//   вихрь через изгородь (общий), приземление (тряска), Леший встаёт из-за кольца и хохочет — Пелагея снизу глядит на великана; Йоша
//   корит Прошку (план на двоих), Прошка сник; плетётся к пню, шапка на нос; Пелагея из кольца — кран вверх. Реплики — под длину записей.
// Ролики 3–4 «Аука» (12,2 с и 13,6 с; было 2 и 3 плана): кран на поляну, камера перебегает от дупла к дуплу за «Ау!», Аука вздыхает
//   крупно (уши поникли), герои переглядываются, Аука подпрыгивает с замахом — «Поаукаемся?»; в финале — «Ой… ответили!» (вытянулся
//   от удивления, прыгает от радости), Пелагея и Потап аукают каждый в свой план, общий хор с дуплами, Аука показывает выход — ворота.
// Ролики зовёт прототип и модули уровня: rep_30_leshy14.py (шапки — FIN.k14Hats; похищение — поверх FIN.k14Kid), late_99zg_auka14.js
// (FIN.k14AukaIntro / FIN.k14AukaFriend); без модуля — прежние ролики. Конец ролика (флаги, места, предметы) — прежний. Бот — tfin_k14cine.
const k14la=(a,b,k)=>a+k14Wrap(b-a)*k;
const k14ramp=(t,a,b)=>clamp((t-a)/(b-a),0,1);
const k14near=(a,b)=>Math.abs(a-b)<0.02;
// крупные планы у шапок и ёлок: вырез «в горошек» у камеры (late_88) на время ролика выключен — те же поля, что у похищения (late_99b)
const k14OccOff=on=>{const O=FIN.occ;if(!O||on===!!K14.occOff)return;if(on){K14.occWas=O.on;O.on=false;}else O.on=K14.occWas!==false;K14.occOff=on;};
const k14retime=(def,pairs)=>{for(const[a,b]of pairs){const e=def.events.find(q=>k14near(q.t,a)&&!q._k14);if(e){e.t=b;e._k14=1;}}def.events.sort((x,y)=>x.t-y.t);};
// ёлка-подглядчица: как ходячие ели уровня (walker), глаза зажигаются по сигналу; своя материя глаз — общие не трогаем
function k14SneakFir(x,z){const g=new THREE.Group();g.position.set(x,0,z);W.group.add(g);const lm=M(0x3b7a44),tm=M(0x6b4a2b);
  addMesh(GEO.trunk,tm,0,0.6,0,g);addMesh(GEO.cone1,lm,0,2.0,0,g);addMesh(GEO.cone2,lm,0,3.1,0,g);
  const em=new THREE.MeshLambertMaterial({color:0x1a2a1a,emissive:0x000000});const eyes=[];for(const s of[-1,1])eyes.push(addMesh(new THREE.SphereGeometry(0.09,8,6),em,s*0.22,1.6,0.72,g));
  const feet=[];for(const s of[-1,1]){const f=addMesh(new THREE.ConeGeometry(0.16,0.5,5),tm,s*0.28,0.2,0,g);f.rotation.x=Math.PI;feet.push(f);}
  const head=new THREE.Object3D();head.position.set(0,1.55,0.6);g.add(head);g.scale.setScalar(0.85);g.traverse(o=>{o.userData.noBatch=true;});return {g,em,eyes,feet,head,on:false};}
const k14Head=h=>new V3(h.pos.x,h.pos.y+(h.extraY||0)+h.d.height*0.9,h.pos.z);
// камера у лица (кадр ещё не знает, куда герой повернётся): исходная поза на расстоянии d — для крупности
const k14Near=(v,d,y)=>[[v.x+d*0.6,y||1.2,v.z-d*0.8],[v.x,1.0,v.z]];
/* ---------- ролик 1: «Шапки из мха» ---------- */
FIN.k14Hats=function(def,c){try{const hats=c.hats,T=HERO,E=CINE.E,P=T.proshka,ST=new V3(0,0,-1.5);
  if(!def.says||def.says.length!==2||hats.length!==4)return def;
  const SP={pelageya:new V3(-1.32,0,-0.92),proshka:new V3(-0.5,0,-0.1),yosha:new V3(0.55,0,-0.08),potap:new V3(1.38,0,-0.86)};
  const from=new Map(HEROES.map(h=>[h,h.pos.clone()]));
  const H3=hats[3],h3p=H3.position.clone(),h3r=H3.rotation.z,H3E=new V3(0.5,0.7,0.2),F0=new V3(-4.6,0,3.2),F1=new V3(-2.4,0,2.2);let fir=null;
  def.kino=true;def.dur=13.8;def.mood=['#ffd9a0',0.07];
  def.says[0][0]=0.4;def.says[0][1]=3.3;def.says[1][0]=8.9;def.says[1][1]=4.6;   // реплика Прошки (запись 4,2 с) — целиком, до конца ролика
  // события: расстановка и бросок шапки — в tick; шапки надеваются каждая в свой план
  def.events=def.events.filter(e=>!(k14near(e.t,0)||k14near(e.t,7.8)||k14near(e.t,9.6)));k14retime(def,[[1.6,3.15],[2.6,4.25],[3.6,5.35]]);
  def.events.unshift({t:0,fn:()=>{if(!fir){fir=k14SneakFir(F0.x,F0.z);fir.g.rotation.y=Math.atan2(SP.proshka.x-F0.x,SP.proshka.z-F0.z);}}});
  const n=k14Near;
  def.shots=[KS(0,[0.4,6.8,9.6],[0,0.6,-1.5],{p2:[1.1,2.5,3.3],l2:[0,0.75,-1.3],dur:2.3,move:'none'}),   // 1 общий: кран к пню — герои сбегаются
    KS(2.3,[0.85,1.4,-0.5],[0,0.8,-1.5],{move:'push',amp:0.7}),                                            // 2 деталь: четыре шапки на пне «дышат»
    KS(3.0,...n(SP.potap,2.1),{trk:KC.fcam(T.potap,2.1,0.35,0.05,0.15)}),                                 // 3 Потап: шапка — гордо
    KS(4.1,...n(SP.pelageya,1.8),{trk:KC.fcam(T.pelageya,1.8,-0.35,0.05,0.15),tr:'whip'}),               // 4 Пелагея: смеётся
    KS(5.2,...n(SP.yosha,1.5,0.8),{trk:KC.fcam(T.yosha,1.5,0.3,0.1,0.15),tr:'whip'}),                     // 5 Йоша: ворчит
    KS(6.4,[2.7,1.55,0.7],[-0.5,0.85,-0.2],{move:'orbit',amp:0.5}),                                        // 6 из-за плеча Потапа: трое в шапках глядят на Прошку, он показывает свою двумя пальцами
    KS(8.8,...n(SP.proshka,1.9),{trk:KC.fcam(P,1.9,0.5,0.05,0.15)}),                                      // 7 Прошка крупно: «Лес — просто деревья» — бросок
    KS(11.1,[1.4,1.3,-2.0],[-2.0,1.0,2.4],{move:'truck',amp:0.4}),                                       // 8 обратный: за его спиной крадётся ёлка
    KS(13.0,[-0.6,1.3,0.6],[-2.4,1.3,2.2],{trk:(pose,k)=>{if(fir)KC.fcam({g:fir.g,head:fir.head},2.7,0.75,-0.1,0.2)(pose,k);},fov:-4})];                              // 9 ёлка крупно: замерла, моргает
  const hh=h=>k14Head(h);
  def.cues=[[0.35,()=>KSND.steps(0,6,0.22)],[2.35,()=>{FX.sparkle(new V3(0,1.0,-1.5),6,0x9fe08a);KSND.puff(0);}],
    [3.15,()=>{KSND.poof(0);FX.sparkle(hh(T.potap),5,0x9fe08a);}],[3.3,KC.emo('potap','pride')],
    [4.25,()=>{KSND.poof(0);FX.sparkle(hh(T.pelageya),5,0x9fe08a);}],[4.4,KC.emo('pelageya','laugh')],
    [5.35,()=>{KSND.poof(0);FX.sparkle(hh(T.yosha),5,0x9fe08a);}],[5.5,KC.emo('yosha','nod')],
    [6.45,KC.emo('proshka','tilt')],[6.6,()=>KSND.peep(0)],[7.3,KC.emo('pelageya','laugh')],[7.6,KC.emo('potap','laugh')],[7.9,KC.emo('yosha','tilt')],
    [9.7,KC.emo('proshka','effort')],[10.0,()=>{SFX.swish();CINE.punch(-2);}],
    [10.55,()=>{KSND.thud(0,0.07);FX.dust(new V3(0.5,0.75,-1.3),8,0x6a8a4a);CINE.trauma(0.06);}],[10.6,KC.emo('yosha','flinch')],
    [11.2,()=>{if(KSND.ok())tone(140,0.22,'sawtooth',0.05,80);}],[11.4,()=>{KSND.creak(0);KSND.steps(0,3,0.36);}],
    [11.75,KC.emo('pelageya','surprise')],[11.95,KC.emo('yosha','fear')],[12.15,KC.emo('potap','surprise')],
    [12.5,()=>{KSND.sting(0);CINE.punch(-3);}],[12.95,KC.emo('proshka','nod')],[13.05,()=>CINE.dollyZoom(0.16,0.6,0.2)],[13.25,()=>KSND.peep(0)]];
  def.tick=(t,dt)=>{k14OccOff(t<def.dur-0.02);
    // герои: сбегаются к пню полукругом; в шапках — глядят на Прошку; ёлка за его спиной — на неё; Прошка оборачивается последним
    for(const h of HEROES){const s=SP[h.kind];if(!s)continue;const f=from.get(h)||s,k=E.inOutCubic(k14ramp(t,0.15,2.0)),mv=k>0&&k<1&&hd(f,s)>0.3;
      h.pos.set(lerp(f.x,s.x,k),lerp(f.y,0,k),lerp(f.z,s.z,k));h.vel.set(mv?(s.x-f.x)/1.85:0,0,mv?(s.z-f.z)/1.85:0);
      const to=p=>Math.atan2(p.x-h.pos.x,p.z-h.pos.z);let a=mv?Math.atan2(s.x-f.x,s.z-f.z):to(ST);
      if(h!==P&&t>=6.5)a=to(P.pos);if(h!==P&&t>=11.6&&fir)a=to(fir.g.position);
      if(h===P&&t>=6.4&&t<9.4)a=k14la(to(ST),to(T.potap.pos),k14ramp(t,6.4,6.8)*(1-k14ramp(t,9.0,9.4)));
      if(h===P&&t>=12.55&&fir)a=k14la(to(ST),to(fir.g.position),E.outBack(k14ramp(t,12.55,12.85)));h.face=a;}
    // шапки на пне «дышат»
    hats.forEach((q,i)=>{if(i<3&&q.visible)q.scale.set(1,1+0.07*Math.sin(t*6+i*2),1);});
    // шапка Прошки: двумя пальцами с пня — покачивается — замах — по дуге на пень, шлёп с отскоком
    const hand=pull=>{const a=P.face-0.95;return new V3(P.pos.x+Math.sin(a)*0.42-Math.sin(P.face)*0.2*pull,P.pos.y+P.d.height*0.55+0.15*pull,P.pos.z+Math.cos(a)*0.42-Math.cos(P.face)*0.2*pull).sub(ST);};
    H3.scale.set(1,1,1);
    if(t<6.4){H3.position.copy(h3p);H3.rotation.z=h3r;}
    else if(t<6.9){const k=E.outCubic(k14ramp(t,6.4,6.9));H3.position.lerpVectors(h3p,hand(0),k);H3.position.y+=Math.sin(k*Math.PI)*0.35;H3.rotation.z=h3r*(1-k);}
    else if(t<10.0){const pull=E.inOutCubic(k14ramp(t,9.6,9.95));H3.position.copy(hand(pull));H3.position.y+=Math.sin(t*5)*0.02;H3.rotation.z=Math.sin(t*4.2)*0.25-pull*0.5;}
    else if(t<10.55){const k=k14ramp(t,10.0,10.55);H3.position.lerpVectors(hand(1),H3E,E.outCubic(k));H3.position.y+=Math.sin(k*Math.PI)*0.7;H3.rotation.z=lerp(-0.5,2.2+Math.PI*2,k);}
    else{const g=t-10.55,b=g<0.4?Math.abs(Math.sin(g*16))*0.07*(1-g/0.4):0,sq=g<0.25?Math.sin(g/0.25*Math.PI)*0.25:0;H3.position.copy(H3E);H3.position.y+=b;H3.rotation.z=2.2;H3.scale.set(1+sq,1-sq,1+sq);}
    // ёлка: стоит деревом → открыла глаза → три шага на цыпочках → замерла с поднятой ногой → моргает
    if(fir){const g=fir.g,wk=k14ramp(t,11.35,12.45),st=wk*3,ph=st%1,on=wk>0&&wk<1,p=new V3().lerpVectors(F0,F1,E.inOutSine(wk));
      g.position.set(p.x,on?Math.abs(Math.sin(ph*Math.PI))*0.18:0,p.z);g.rotation.z=on?0.08*Math.sin(st*Math.PI):0;
      fir.feet.forEach((f,i)=>{f.position.y=0.2+(on&&(Math.floor(st)+i)%2===0?Math.sin(ph*Math.PI)*0.25:0);});
      if(t>=12.45){const fr=E.outBack(k14ramp(t,12.45,12.6));fir.feet[0].position.y=0.2+0.3*fr;g.rotation.z=0.12*fr;g.position.y=0.06*fr;}
      const eo=t>=11.2;if(eo!==fir.on){fir.on=eo;fir.em.color.setHex(eo?0xfff3a0:0x1a2a1a);fir.em.emissive.setHex(eo?0xffe070:0);fir.em.emissiveIntensity=eo?1.2:0;}
      const bl=(t>=13.25&&t<13.4)||(t>=13.55&&t<13.65);fir.eyes.forEach(e=>e.scale.set(1,bl?0.15:1,1));}};
  const en=def.end;def.end=()=>{k14OccOff(false);try{hats.forEach(q=>q.scale.set(1,1,1));if(fir){W.group.remove(fir.g);fir=null;}
      for(const h of HEROES){const s=SP[h.kind];if(s){placeOnGround(h,s.x,s.z,0);h.vel.set(0,0,0);}}}catch(e){console.error(e);}en();};
  return def;}catch(e){console.error(e);return def;}};
/* ---------- ролик 2: «Пелагею увели» — поверх хоровода и вихря late_99b ---------- */
function k14KinoKid(def,c){const E=CINE.E,RC=c.RC,S=K14_S,PR=K14_PR,PRo=K14.PR||PR,pe=c.pe,pr=c.pr,yo=c.yo,sh=c.shade;
  if(!def.says||def.says.length!==10||!sh)return;   // ролик изменился — прежняя постановка
  def.kino=true;def.mood=['#a8c0ff',0.1];
  // реплики: голос Пелагеи, Лешего и Йоши — целиком (записи 2,5 / 3,2 / 2,1 с); Леший — когда встанет из-за кольца
  const SAY=[[0.3,2.6],[3.0,1.7],[4.8,1.7],[6.7,2.9],[12.75,3.6],[9.7,2.6],[16.1,2.5],[18.9,2.9],[22.0,1.25],[23.3,2.2]];
  def.says.forEach((s,i)=>{s[0]=SAY[i][0];s[1]=SAY[i][1];});def.says.sort((a,b)=>a[0]-b[0]);
  // события: тень Лешего и путь Прошки к пню — в tick; шапка на нос и взгляд Пелагеи — позже
  // (по содержимому: в 12,6 с стоит и событие хоровода late_99b — ёлки встают кольцом)
  const src=e=>String(e.fn),old=e=>(k14near(e.t,9.6)||k14near(e.t,12.6))&&/shade\.g\.position/.test(src(e))||k14near(e.t,10.2)&&/tone\(/.test(src(e))||k14near(e.t,17.6)&&/doSwap\(0\)/.test(src(e));
  def.events=def.events.filter(e=>!old(e));k14retime(def,[[21.1,22.0],[21.55,22.45],[21.9,23.2]]);
  const Y0=new V3(clamp(PRo.x-1.5,-9,3),0,PRo.z+0.7),B0=new V3(1.9,0,-3.6),B1=new V3(0.5,0,-0.1),dS=new V3(B1.x-PRo.x,0,B1.z-PRo.z).normalize(),A1=PRo.clone().addScaledVector(dS,2.2);
  def.events.push({t:13.0,fn:()=>{placeOnGround(yo,Y0.x,Y0.z,0);yo.vel.set(0,0,0);yo.face=Math.atan2(PRo.x-Y0.x,PRo.z-Y0.z);}},{t:18.9,fn:()=>{if(players[0].act!==0)doSwap(0);}});
  def.events.sort((a,b)=>a.t-b.t);
  const SH=sh.g.position.clone().setY(0),shY=t=>t<11.8?-8:t<12.9?-8+8*E.outBack(k14ramp(t,11.8,12.9)):t<16?0:t<17?-8*E.inOutCubic(k14ramp(t,16,17)):-8;
  const A=v=>[v.x,v.y,v.z],P=(v,x,y,z)=>[v.x+x,y,v.z+z],dir=new V3(PR.x-S.x,0,PR.z-S.z).normalize(),bk=dir.clone().negate(),side=new V3(-dir.z,0,dir.x);
  const at=(v,d,y)=>S.clone().addScaledVector(v,d).setY(y),toPR=Math.atan2(PR.x-S.x,PR.z-S.z),peH=()=>k14Head(pe);
  const u=new V3(RC.x-SH.x,0,RC.z-SH.z).normalize(),C1=new V3(SH.x,9.4,SH.z).addScaledVector(u,6.8);
  // план на двоих: Йоша говорит (лицо в кадр), Прошка рядом
  const yoTwo=(pose,k)=>{const a=yo.face+1.05,H=k14Head(yo),Q=k14Head(pr),d=2.6*(1-0.1*E.inOutSine(k));pose.pos.set(H.x+Math.sin(a)*d,H.y+0.25,H.z+Math.cos(a)*d);pose.look.copy(H).lerp(Q,0.5);};
  def.shots=[KS(0,A(at(dir,2.4,1.3)),P(S,0,0.95,0),{trk:KC.orbit(()=>new V3(S.x,0.95,S.z),2.5,0.3,toPR-0.6,toPR+0.25,0.02),move:'none'}),   // 1 Пелагея и светлячки — облёт
    KS(3.0,P(PRo,1.3,1.5,1.4),P(PRo,0,1.1,0),{move:'push',amp:0.5}),                                     // 2 Прошка отвлёкся на огонёк
    KS(4.8,A(at(dir,1.6,0.5).addScaledVector(side,0.95)),A(at(bk,2.8,1.5)),{move:'push',amp:0.7,fov:-3}),                          // 3 снизу: глаза за её спиной
    KS(5.4,A(at(side,6.2,3.4)),P(S,0,0.9,0),{move:'truck',amp:0.6}),                                      // 4 сбоку: ёлки на цыпочках обступают
    KS(6.6,A(at(dir,3.0,2.7)),P(S,0,1.0,0),{tr:'whip',move:'push',amp:0.5,trk:pose=>{pose.look.copy(peH());pose.pos.y+=(pe.extraY||0)*0.7;}}),   // 5 над хороводом: «Ой… Прошка?!» — ёлки кружат под камерой
    KS(9.5,[-6.0,5.6,-20.0],P(S,0,1.4,0),{p2:[-3.6,6.2,-25.5],dur:2.5,move:'none',trk:(pose,k,t)=>{const C=k14Center(t,RC);pose.look.set(C.x,1.3+k14Hop(t)*0.9,C.z);}}),   // 6 общий: вихрь через изгородь
    KS(12.0,P(RC,-1.4,6.4,2.4),P(RC,0,0.4,0),{p2:P(RC,-1.0,4.4,1.9),dur:0.7,move:'none'}),                  // 7 приземление: ёлки встают кольцом
    KS(12.7,A(C1),[SH.x,8,SH.z],{trk:(pose,k)=>{KC.fcam(sh,6.8,0.25,0.9,0.15)(pose,k);pose.look.y+=1.0;},fov:4}),                                 // 8 Леший встал над лесом и хохочет — лицом
    KS(14.9,[SH.x,9,SH.z],P(RC,0,1,0),{move:'push',amp:0.5,trk:pose=>{const h=KC.head(sh)();if(!h)return;pose.pos.copy(h).add(u.clone().multiplyScalar(3.2));pose.pos.y+=0.9;pose.look.copy(peH());}}),   // 8б его глазами: Пелагея внизу в кольце
    KS(16.0,P(Y0,1.6,1.0,1.8),P(Y0,0,0.6,0),{trk:yoTwo}),                                                  // 9 Йоша корит Прошку — на двоих
    KS(17.7,P(PRo,1.0,1.2,1.2),P(PRo,0,1.0,0),{trk:KC.fcam(pr,1.7,-0.35,0.05,0.12)}),                   // 10 Прошка сник
    KS(18.9,P(PRo,dS.x*3,1.6,dS.z*3),P(PRo,0,0.9,0),{trk:KC.follow(()=>pr.pos,new V3(dS.x*3.0-dS.z*0.9,1.5,dS.z*3.0+dS.x*0.9),new V3(0,0.85,0),1)}),   // 11 плетётся к пню
    KS(20.3,[-1.2,1.3,2.4],[0.9,0.95,-1.4],{move:'none',trk:KC.look(KC.head(pr),0.7)}),                    // 12 у пня: дошёл
    KS(21.7,[-0.6,1.5,-2.8],[0.5,0.95,-0.1],{move:'push',amp:0.6}),                                       // 13 шапка на нос
    KS(23.2,[RC.x-2.3,2.9,RC.z-0.2],[RC.x,1.15,RC.z],{p2:[RC.x-4.1,5.2,RC.z+2.4],l2:[RC.x-0.7,0.8,RC.z+1.0],dur:2.3,move:'none'})];   // 14 Пелагея в кольце — кран вверх
  const laugh=()=>{if(KSND.ok())for(let i=0;i<7;i++)tone(rand(150,240),0.13,'sawtooth',0.12,rand(80,140),i*0.1);};
  def.cues=[[0.6,()=>{if(KSND.ok())for(let i=0;i<3;i++)AUD.bell(1568+i*220,{v:0.02,d:0.8,at:i*0.35,wet:0.6});}],[1.0,KC.emo('pelageya','joy')],
    [3.1,()=>{FX.sparkle(new V3(-3.6,1.6,-20.6),6,0xfff08a);KSND.peep(0);}],[3.3,KC.emo('proshka','tilt')],
    [4.85,()=>{KSND.sting(0);CINE.dollyZoom(0.2,0.5,0.4);}],[5.8,KC.emo('pelageya','surprise')],
    [6.6,()=>{CINE.mood('#a8c0ff',0.16);CINE.punch(3);}],[6.8,KC.emo('pelageya','fear')],[8.7,()=>CINE.slowmo(0.45,0.7)],
    [9.6,()=>CINE.dutch(-0.07)],[11.6,()=>CINE.dutch(0)],[12.6,()=>{CINE.hitstop(3);CINE.trauma(0.12);}],
    [12.8,()=>{laugh();CINE.dutch(-0.06);}],[13.3,KC.emo('pelageya','fear')],[14.6,laugh],[15.8,()=>CINE.dutch(0)],
    [16.3,KC.emo('yosha','effort')],[17.75,KC.emo('proshka','droop')],[19.0,()=>{CINE.mood('#c8c0d8',0.1);KSND.steps(0,4,0.45);}],[20.4,()=>KSND.steps(0,3,0.45)],
    [22.0,()=>KSND.poof(0)],[22.5,KC.emo('proshka','flinch')],[23.3,()=>{CINE.mood('#ffd890',0.08);CINE.rimPulse(0.7);FX.sparkle(peH(),8,0xfff08a);KSND.magic(0,659);}]];
  const tk=def.tick;def.tick=(t,dt)=>{if(tk)tk(t,dt);
    // Пелагея: зовёт Прошку лицом к нему; в кольце — глядит вверх на Лешего, потом — на тропу
    if(t>=6.9&&t<8.8){const w=k14ramp(t,6.9,7.2)*(1-k14ramp(t,8.5,8.8));pe.face=k14la(pe.face,toPR+0.3*Math.sin(t*6),w);}
    if(t>=12.7&&t<16)pe.face=Math.atan2(SH.x-pe.pos.x,SH.z-pe.pos.z);else if(t>=16&&t<23.2)pe.face=-Math.PI/2;
    // Леший: встаёт из-за кольца с пружинкой, хохочет и машет, уходит под землю
    sh.g.position.y=shY(t)+(t>=12.9&&t<16?Math.abs(Math.sin(t*10))*0.15:0);sh.g.rotation.y=Math.atan2(RC.x-SH.x,RC.z-SH.z);
    if(sh.hands){const up=t<11.8?0:t<16?E.outBack(k14ramp(t,11.8,12.6)):1-k14ramp(t,16,16.8);sh.hands.forEach((q,i)=>{if(q.sh)q.sh.rotation.x=-(i?0.9:1.4)*up+(t>=12.9&&t<16?0.25*Math.sin(t*9+i*2):0);});}
    // Прошка: глядит на Йошу; плетётся к пню (за склейкой — уже у пня), встаёт лицом к пню
    if(t>=15.9&&t<18.9)pr.face=Math.atan2(Y0.x-pr.pos.x,Y0.z-pr.pos.z);
    if(t>=18.9&&t<21.6){const B=t<20.3,k=B?E.inOutSine(k14ramp(t,18.9,20.3)):E.inOutSine(k14ramp(t,20.3,21.6)),a=B?PRo:B0,b=B?A1:B1,d=new V3(b.x-a.x,0,b.z-a.z),L=d.length()||1;
      pr.pos.set(lerp(a.x,b.x,k),0,lerp(a.z,b.z,k));pr.vel.set(d.x/L*1.7,0,d.z/L*1.7);pr.face=Math.atan2(d.x,d.z);}
    else if(t>=21.6){if(t<22)pr.pos.set(B1.x,0,B1.z);pr.vel.set(0,pr.vel.y,0);pr.face=Math.PI;}};}
{const _kid=FIN.k14Kid;FIN.k14Kid=function(def,c){def=_kid(def,c);try{k14KinoKid(def,c);}catch(e){console.error(e);}return def;};}
/* ---------- ролики 3–4: Аука ---------- */
// c: {A,ag,L,hd,HL,CS,z0} — из late_99zg_auka14.js. Аука смотрит на героев (A.look=null), говорит — рот и щёки (A.sing), уши и ручки — свои повороты
function k14AukaLife(c,t,talk,sad){const A=c.A,L=c.L;A.look=null;if(talk)A.sing=Math.max(A.sing,Math.sin(t*15)>-0.2?0.05:0);
  L.ears.forEach((l,i)=>{const s=i?1:-1;l.rotation.z=-s*(1.1+(sad||0)*0.9);});L.cheeks.forEach(q=>q.scale.multiplyScalar(1-(sad||0)*0.25));}
function k14AukaReset(c){c.L.ears.forEach((l,i)=>{l.rotation.z=-(i?1:-1)*1.1;});c.L.arms.forEach((a,i)=>{a.rotation.z=(i?1:-1)*0.5;});}
FIN.k14AukaIntro=function(def,c){try{if(!def.says||def.says.length!==3)return def;const E=CINE.E,A=c.A,HL=c.HL,CS=c.CS,au={g:c.ag,head:c.hd};
  def.kino=true;def.dur=12.2;def.mood=['#d8f0a0',0.08];
  def.says[0][0]=0.3;def.says[0][1]=3.0;def.says[1][0]=3.6;def.says[1][1]=3.95;def.says[2][0]=8.7;def.says[2][1]=3.1;
  k14retime(def,[[1.0,1.7],[7.2,8.75]]);   // дупла поют по очереди (1,7 + 0,4·i); Аука подпрыгивает — после замаха
  const HC=new V3(0,0,-198);const look=(pose,k,t)=>{const x=(t-1.7)/0.4,i=clamp(Math.floor(x),0,3),j=Math.min(3,i+1),f=x<0?0:x>=3?0:E.outCubic(clamp(x-i,0,1));
    const a=HL[i],b=HL[j];pose.look.set(lerp(a.x,b.x,f),2.0,lerp(a.z,b.z,f));};
  const hc=()=>{const h=HEROES.filter(q=>q.g.visible);const p=new V3();h.forEach(q=>p.add(q.pos));return p.multiplyScalar(1/Math.max(1,h.length)).setY(0.9);};
  const ac=()=>new V3(CS.x,1.3,CS.z);
  def.shots=[KS(0,[0,6.8,-186.5],[0,1.2,-203],{p2:[2.4,4.2,-191.0],l2:[0,1.2,-204],dur:1.7,move:'none'}),   // 1 общий: кран на поляну дупел
    KS(1.7,[0,5.4,-191.8],[HL[0].x,2,HL[0].z],{trk:look,move:'none',tr:'whip'}),                           // 2 камера перебегает к дуплу, что поёт
    KS(3.4,[1.1,1.9,-200.8],[CS.x,1.3,CS.z],{move:'push',amp:0.6}),                                         // 3 Аука один на пне — вздыхает
    KS(5.3,[0.6,1.6,-203.1],[CS.x,1.45,CS.z],{trk:KC.fcam(au,1.9,0.25,0.05,0.15)}),                       // 4 крупно: «Никто со мной не аукается…»
    KS(7.6,[0.8,1.4,-203.6],[0,0.9,-196],{move:'truck',amp:0.5,trk:KC.look(hc,0.8)}),                     // 5 обратный: герои переглядываются
    KS(8.6,[1.6,1.5,-202.5],[CS.x,1.3,CS.z],{trk:KC.orbit(ac,3.0,0.25,0.6,-0.4,0.1),move:'none'})];       // 6 облёт: «Поаукаемся?» — прыжок
  def.cues=[[0.4,()=>KSND.steps(0,4,0.25)],[3.5,()=>{if(KSND.ok())AUD.osc({type:'triangle',f0:420,f1:260,d:0.9,v:0.04,a:0.08,vib:0.03,vibF:5,wet:0.3});}],
    [7.7,KC.emo('pelageya','tilt')],[7.85,KC.emo('potap','tilt')],[8.1,KC.emo('proshka','nod')],[8.25,KC.emo('yosha','nod')],
    [8.75,()=>{KSND.yay(0);CINE.punch(-3);FX.leaves(new V3(CS.x,1.4,CS.z),8);}],[10.2,()=>FX.sparkle(new V3(CS.x,2.0,CS.z),8,0xc8e070)],[11.5,KC.all('joy',0.09)]];
  const tk=def.tick;def.tick=(t,dt)=>{if(tk)tk(t,dt);const L=c.L;
    // грустит (уши поникли, щёки сдулись) → замах (присел) → прыжок с ручками вверх
    const sad=t<3.4?0:t<8.4?1:1-k14ramp(t,8.4,8.8);k14AukaLife(c,t,(t>=3.6&&t<7.5)||(t>=8.7&&t<11.7),sad);
    const crouch=t>=8.45&&t<8.75?Math.sin(k14ramp(t,8.45,8.75)*Math.PI):0;c.ag.scale.set(1+crouch*0.18,1-crouch*0.22+(t>=3.4&&t<7.5?-0.05*Math.sin(t*1.6)**2:0),1+crouch*0.18);
    L.arms.forEach((a,i)=>{const s=i?1:-1;a.rotation.z=s*(0.5+(t>=8.75&&t<11.8?1.2+0.3*Math.sin(t*8+i):sad*-0.3));});
    // герои — лицом к Ауке
    if(t>=3.0)HEROES.forEach(h=>{if(hd(h.pos,CS)<16)h.face=Math.atan2(CS.x-h.pos.x,CS.z-h.pos.z);});};
  const en=def.end;def.end=()=>{c.ag.scale.set(1,1,1);k14AukaReset(c);en();};
  return def;}catch(e){console.error(e);return def;}};
FIN.k14AukaFriend=function(def,c){try{if(!def.says||def.says.length!==4)return def;const E=CINE.E,A=c.A,CS=c.CS,T=HERO,au={g:c.ag,head:c.hd},ac=()=>new V3(CS.x,1.3,CS.z);
  def.kino=true;def.dur=13.6;def.mood=['#ffe0a0',0.09];
  const SAY=[[0.3,3.75],[4.2,1.5],[5.8,1.4],[9.5,4.0]];def.says.forEach((s,i)=>{s[0]=SAY[i][0];s[1]=SAY[i][1];});
  k14retime(def,[[3.4,7.3],[8.4,11.6]]);   // общий хор — после Пелагеи и Потапа; ворота — под «выход покажу»
  def.shots=[KS(0,[0.5,1.6,-203.2],[CS.x,1.45,CS.z],{trk:KC.fcam(au,1.9,0.2,0.1,0.15)}),                  // 1 крупно: «Ой… ответили!» — вытянулся
    KS(1.7,[3.0,0.9,-202.6],[CS.x,1.3,CS.z],{trk:KC.orbit(ac,3.9,-0.35,0.6,-0.3,0.25),move:'none'}),      // 2 снизу, облёт: прыгает от радости
    KS(4.1,[-1.2,1.3,-204.2],[-2.2,1.0,-203.2],{trk:KC.fcam(T.pelageya,1.7,0.35,0.05,0.15),tr:'whip'}),  // 3 Пелагея: «Ау, Аука!»
    KS(5.7,[1.2,1.5,-204.2],[2.2,1.2,-203.2],{trk:KC.fcam(T.potap,2.2,-0.35,0.05,0.15),tr:'whip'}),      // 4 Потап: «Ау-у!»
    KS(7.2,[0,2.2,-209.2],[0,1.2,-200],{p2:[0.6,6.4,-212.2],l2:[0,1.0,-201],dur:2.2,move:'none'}),      // 5 общий: хор с дуплами — кран вверх
    KS(9.4,[1.4,1.7,-201.6],[CS.x,1.4,CS.z],{trk:KC.fcam(au,3.4,0.35,0.15,0.12)}),                       // 6 Аука: «Пойдёмте, я выход покажу»
    KS(11.6,[2.6,2.4,-202.6],[0,1.4,-215.5],{move:'push',amp:0.5})];                                    // 7 через плечо Ауки — ворота открываются
  def.cues=[[0.1,()=>{CINE.punch(-3);KSND.peep(0);}],[1.8,()=>{KSND.yay(0);FX.leaves(new V3(CS.x,1.6,CS.z),10);}],[2.6,()=>FX.confetti(new V3(CS.x,2.2,CS.z),24,1.2)],
    [4.2,KC.emo('pelageya','cheer')],[5.8,KC.emo('potap','cheer')],[7.3,()=>{KC.all('joy',0.08)();CINE.rimPulse(0.8);}],[7.8,()=>FX.confettiCam(30)],
    [11.65,()=>{CINE.trauma(0.05);FX.dust(new V3(0,0.2,-215.5),14,0x8a7a5a);}],[12.4,()=>KSND.fanfare(0)]];
  const tk=def.tick;def.tick=(t,dt)=>{if(tk)tk(t,dt);const L=c.L;
    // удивление: вытянулся вверх (0–0,6), потом прыгает (A.hop из события), говорит; на «выход покажу» — ручкой к воротам
    const sur=t<0.7?Math.sin(k14ramp(t,0,0.7)*Math.PI):0;c.ag.scale.set(1-sur*0.12,1+sur*0.22,1-sur*0.12);
    k14AukaLife(c,t,(t>=0.3&&t<3.7)||(t>=9.5&&t<13.2),0);
    L.arms.forEach((a,i)=>{const s=i?1:-1;a.rotation.z=s*(0.5+(t>=9.6&&i===0?1.4+0.15*Math.sin(t*6):t<4?1.0+0.3*Math.sin(t*9+i):0));});
    HEROES.forEach(h=>{if(hd(h.pos,CS)<6)h.face=Math.atan2(CS.x-h.pos.x,CS.z-h.pos.z);});};
  const en=def.end;def.end=()=>{c.ag.scale.set(1,1,1);k14AukaReset(c);en();};
  return def;}catch(e){console.error(e);return def;}};
