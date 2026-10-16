/* ============================== РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: ВСТУПЛЕНИЕ «ТИШЕ, ЛЕШИЙ СПИТ!» ============================== */
// Было (14 с, 4 плана): камера едет по пустой тропе, Сказительница перечисляет «шапки, ленты, указатели», 4 с неподвижного кадра со спящим
// великаном, «Опять заблудились? Ну-ка, где я?» — героев в кадре нет, зачем пришли и во что играем — непонятно.
// Стало (ручная постановка def.kino, docs/40_kino_pravila.md; 31,5 с — по длине записей, 11 планов) — завязка → акцент → разрешение:
//   1 общий: четверо крадутся на цыпочках к огромному «дереву» — «Тише… Тут спит Леший — хозяин лесных троп.»;
//   2 двое спереди: Йоша замечает блеск — «Ой, там что-то блестит!»;  3 деталь: в дупле блестит (цепочка финала, late_99zdg);
//   4 Пелагея — «Тсс! Не разбуди!», сверху падает пушинка мха;  5 крупно Йоша: пушинка на нос, замах — «А… а… апчхи!», стоп-кадр;
//   6 снизу Леший: открывает глаза, вырастает, мох летит — «Ага-а! Опять заблудились?»;  7 герои отпрыгивают в кучу — Прошка: «Ой… это не дерево!»;
//   8 Леший крупно, хитро — «Кто меня разбудил — тот со мной играет!»;  9 из земли — красная рука: «Это — Сгрёб!», метёт — Пелагея и Йоша кувырком;
//   10 жёлтая: «А это — Хлоп!», хлопает — Прошка закрылся щитом;  11 общий из-за героев, плечом к плечу — «Обыграете — отдам, что блестит. Раз, два, три — начинаем!»
// Руки — настоящие (FIN.k1b.cur.spawnHands, rep_30), в ролике их ведёт K1N.demo, как в уроке (late_99zcb); удара по героям нет.
// Конец и пропуск — одинаковые: герои — в строю перед Лешим (K1I_END), руки — дома, целые, в обычном состоянии; дальше — прежний конец
// (этап 1, урок один раз за игру — late_99zcb, музыка — late_99zc). Полоска босса во время ролика скрыта.
const K1I={on:false,st:{},D:null};K1B.intro=K1I;
const K1I_DUR=31.5;
const K1I_END={potap:[-4.8,-3.2],proshka:[-2.5,-3.5],pelageya:[2.5,-3.5],yosha:[4.7,-2.9]};   // строй после ролика (и после пропуска) — там же, где герои начинали уровень: до рук бой не ближе прежнего
const K1I_HAND={'-1':[-4.2,-13.4],'1':[4.2,-13.6]};                                            // где руки показываются (дом — ±4, −17)
// время рук: [из-под земли, замах, удар]; удар — 0,25 с
const K1I_PH={'1':[21.5,21.9,22.9],'-1':[23.6,24.1,25.1]};
const k1iE=()=>CINE.E;
function k1iHO(){const c=K1B.cur,L=c&&c.L;if(!L||!L.rig||!L.rig.hips)return new V3(0.5,2,-23);L.g.updateMatrixWorld(true);return L.rig.hips.localToWorld(new V3(0.3,-0.1,0.86));}   // дупло (late_99x: a=0,42, r=0,82)
// руки в ролике: место, поза по времени, телеграфы — как в уроке
function k1iHand(e){const D=K1I.D;if(!D)return;const s=e.side>0?'1':'-1',k1=e.k1,P=K1I_HAND[s],ph=K1I_PH[s],t=D.t,F=K1B.fx;
  e.state='demo';e.tgt=null;e.dazeT=0;e.embers=e.maxEmb;e.pos.x=P[0];e.pos.z=P[1];
  e.sig=s==='1'?'red':'yellow';e.face=s==='1'?-0.5:0.45;if(e.g)e.g.visible=t>=ph[0];   // до подъёма руки нет — потом вырастает из земли (k1.ly)
  if(t<ph[0]){k1.dp='idle';k1.dk=0;k1.ly=-4;}
  else if(t<ph[1]){k1.dp='idle';k1.dk=0;}
  else if(t<ph[2]){k1.dp='wind';k1.dk=clamp((t-ph[1])/(ph[2]-ph[1]),0,1);}
  else if(t<ph[2]+0.25){k1.dp='strike';k1.dk=clamp((t-ph[2])/0.25,0,1);}
  else{k1.dp='idle';k1.dk=0;}
  const tk=s==='1'?'teleR':'teleY';
  if(k1.dp==='wind'){if(!D[tk])D[tk]=s==='1'?F.sectorObj(e.pos.x,e.pos.z,0,K1N.fanHalf,e.r+K1N.fanExtra,'red'):F.teleObj(e.pos.x,e.pos.z,e.r+2.0,'yellow');
    if(s==='1')D[tk].g.rotation.y=e.face;D[tk].set(k1.dk);}
  else if(D[tk]){D[tk].flash();D[tk]=null;}}
// герои: дорожки по ключам [t,x,z,прыжок] — между ключами плавно (inOutSine), с прыжком — дугой
function k1iTracks(){const H=HERO,T={},at=k=>{const h=H[k];return [0,h.pos.x,h.pos.z,0];},E=K1I_END;
  T.proshka=[at('proshka'),[4.2,-1.7,-8.4,0],[16.25,-1.7,-8.4,0],[16.85,-0.7,-7.1,0.55],[25.6,-0.7,-7.1,0],[27.0,E.proshka[0],E.proshka[1],0.45]];
  T.potap=[at('potap'),[4.4,-3.7,-7.8,0],[16.3,-3.7,-7.8,0],[16.9,-2.2,-6.6,0.45],[25.6,-2.2,-6.6,0],[27.0,E.potap[0],E.potap[1],0.35]];
  T.pelageya=[at('pelageya'),[4.0,1.3,-8.6,0],[16.2,1.3,-8.6,0],[16.8,0.4,-7.2,0.6],[22.9,0.4,-7.2,0],[23.35,0.1,-5.7,0],[25.6,0.1,-5.7,0],[27.0,E.pelageya[0],E.pelageya[1],0.5]];
  T.yosha=[at('yosha'),[4.0,3.0,-8.2,0],[11.75,3.0,-8.2,0],[12.15,3.2,-7.5,0.35],[16.15,3.2,-7.5,0],[16.75,1.5,-6.9,0.7],[22.9,1.5,-6.9,0],[23.35,1.3,-5.4,0],[25.6,1.3,-5.4,0],[27.0,E.yosha[0],E.yosha[1],0.6]];
  return T;}
function k1iHeroTick(){const D=K1I.D;if(!D)return;const t=D.t,E=k1iE();
  for(const k in D.tr){const h=HERO[k],K=D.tr[k];if(!h||!h.g.visible)continue;let x=K[K.length-1][1],z=K[K.length-1][2],y=0,mv=false;
    for(let i=1;i<K.length;i++)if(t<K[i][0]){const a=K[i-1],b=K[i],u=clamp((t-a[0])/(b[0]-a[0]),0,1),q=E.inOutSine(u);x=lerp(a[1],b[1],q);z=lerp(a[2],b[2],q);
      if(b[3])y=b[3]*4*u*(1-u);mv=Math.hypot(b[1]-a[1],b[2]-a[2])>0.05;break;}
    if(t<4.4&&mv)y+=0.07*Math.abs(Math.sin(t*7+k.length));   // на цыпочках — мелкие подскоки
    const ox=h.pos.x,oz=h.pos.z;h.pos.set(x,y,z);h.vel.set((x-ox)*12,0,(z-oz)*12);h.grounded=y<0.01;
    // куда смотрят: на ходу — по ходу, потом — на Лешего; Пелагея шикает на Йошу; в строю — на Лешего
    const Lp=new V3(0,0,-24.5);let f=Math.atan2(Lp.x-x,Lp.z-z);
    if(k==='pelageya'&&t>=7.2&&t<9.6){const y2=HERO.yosha;if(y2)f=Math.atan2(y2.pos.x-x,y2.pos.z-z);}
    h.face=f;}
  const pr=HERO.proshka;if(pr)pr.guard=t>=24.75&&t<25.55;
  // Йоша: замах чиха — сжаться и запрокинуться, чих — вытянуться (объём сохраняем)
  const yo=HERO.yosha;if(yo&&D.ys){let sy=1;if(t>=10.0&&t<11.7)sy=1-0.16*E.inOutSine(clamp((t-10.0)/1.7,0,1));else if(t>=11.7&&t<12.25){const u=(t-11.7)/0.55;sy=0.84+0.36*Math.sin(Math.min(1,u*2.2)*Math.PI*0.5)*(1-u)+0.16*u;}
    const sx=1/Math.sqrt(sy);yo.g.scale.set(D.ys.x*sx,D.ys.y*sy,D.ys.z*sx);}}
function k1iClean(){const D=K1I.D;if(!D)return;K1I.D=null;K1I.on=false;if(K1N.demo&&K1N.demo.k1i)K1N.demo=null;
  const i=W.updates.indexOf(k1iHeroTick);if(i>=0)W.updates.splice(i,1);
  if(D.npc){const j=ACT.npcs.indexOf(D.npc);if(j>=0)ACT.npcs.splice(j,1);}
  if(D.teleY)D.teleY.del();if(D.teleR)D.teleR.del();k1Del(D.g);
  const yo=HERO.yosha;if(yo&&D.ys)yo.g.scale.copy(D.ys);
  try{const bb=$('bossbar');if(bb)bb.style.visibility='';}catch(e){}}
// конец и пропуск: герои в строю, руки дома — в обычном состоянии (урок, если будет, сам переведёт их в показ)
function k1iSettle(){for(const k in K1I_END){const h=HERO[k];if(!h)continue;const p=K1I_END[k];placeOnGround(h,p[0],p[1],0);h.vel.set(0,0,0);h.face=Math.PI;h.guard=false;h.atkT=0;h.rollT=0;}
  for(const e of W.enemies)if(e.k1&&e.alive&&e.kind==='hand'){if(e.g)e.g.visible=true;e.state='idle';e.t=0;e.cd=1.2;e.embers=e.maxEmb;e.dazeT=0;e.tgt=null;e.k1.dp=null;e.k1.dk=0;e.k1.ly=0;e.k1.th=0;e.k1.back=0;e.k1.sweep=null;
    e.pos.set(e.home.x,0,e.home.z);}
  K1N.atkAt=G.time;}
{const _in=K1B.cine.intro;K1B.cine.intro=function(d){d=_in(d);const c=K1B.cur,L=c&&c.L;if(!L||typeof KS!=='function')return d;
  const H=HERO,F=K1B.fx,E=k1iE();
  const g=new THREE.Group();k1Add(g);
  // блеск в дупле: золотая искра, пульсирует; пушинка мха
  const glint=addMesh(new THREE.SphereGeometry(0.12,8,6),new THREE.MeshBasicMaterial({color:0xffe27a,transparent:true,opacity:0.95}),0,0,0,g);
  const tuft=new THREE.Group();g.add(tuft);for(let i=0;i<4;i++)addMesh(new THREE.IcosahedronGeometry(0.05,0),M(0x8fd05a),Math.sin(i*1.6)*0.05,Math.cos(i*2.1)*0.03,Math.cos(i*1.6)*0.05,tuft);tuft.visible=false;
  L.g.scale.setScalar(1.75);K1B.emo(L,'sleep',0);L.g.updateMatrixWorld(true);
  const HO=k1iHO(),ha=0.42,hd=(r,dy)=>[HO.x+Math.sin(ha)*r,HO.y+(dy||0),HO.z+Math.cos(ha)*r];
  K1I.st={glint:0,sneeze:0,wake:0,red:0,yellow:0,roll:0,shield:0};
  const yo=()=>H.yosha,pe=()=>H.pelageya,pr=()=>H.proshka,head=k=>KC.head(H[k]);
  d.kino=true;d.dur=K1I_DUR;d.fov=50;d.mood=['#a8e0b0',0.05];
  d.says=[[0.2,4.0,null,'<i>Тише… Тут спит Леший — хозяин лесных троп.</i>',true],
    [4.25,2.06,'yosha','Ой, там что-то блестит!'],
    [7.35,2.06,'pelageya','Тсс! Не разбуди!'],
    [9.4,2.95,'yosha','А… а… апчхи!'],
    [12.75,3.43,'leshy','Ага-а! Опять заблудились?'],
    [16.3,2.28,'proshka','Ой… это не дерево!'],
    [18.65,2.83,'leshy','Кто меня разбудил — тот со мной играет!'],
    [21.55,1.77,'leshy','Это — Сгрёб!'],
    [23.65,1.65,'leshy','А это — Хлоп!'],
    [25.7,5.56,'leshy','Обыграете — отдам, что блестит.<br>Раз, два, три — начинаем!']];
  d.shots=[KS(0,[1.2,3.0,3.6],[0,2.6,-14],{move:'crane',amp:0.5}),                                                          // 1 общий из-за спин: крадутся к «дереву»
    KS(4.2,[3.9,1.4,-11.4],[2.2,0.7,-8.2],{trk:KC.two(head('yosha'),head('pelageya')),tr:'cut'}),                             // 2 двое спереди: «блестит!»
    KS(6.3,hd(3.4,0.4),[HO.x,HO.y,HO.z],{move:'push',amp:0.45,tr:'cut'}),                                                   // 3 деталь: дупло
    KS(7.3,[4.6,1.3,-10.6],[2.0,0.8,-8.3],{trk:KC.fcam(H.pelageya,3.3,-0.55,0.15,0.15),tr:'cut'}),                            // 4 Пелагея шикает
    KS(9.4,[3.2,0.9,-9.8],[3.2,0.5,-7.9],{trk:KC.fcam(H.yosha,1.55,0.35,0.12,0.25),tr:'cut'}),                                // 5 крупно Йоша: чих
    KS(12.4,[0.8,3.2,-15.8],[0,6,-24.5],{trk:KC.fcam(L,8.4,0.08,-2.6,0.3),tr:'whip'}),                                        // 6 снизу: Леший просыпается
    KS(16.2,[1.4,4.4,-14.2],[-0.4,0.9,-7.0],{move:'push',amp:0.4,tr:'cut'}),                                                  // 7 из-за плеча Лешего: герои в куче
    KS(18.6,[0,8.6,-16.4],[0,7.9,-24.5],{trk:KC.fcam(L,7.6,-0.12,-0.3,0.22),tr:'cut'}),                                       // 8 Леший крупно, хитро
    KS(21.5,[6.4,2.1,-3.4],[1.6,3.0,-15.5],{move:'truck',amp:0.5,tr:'whip'}),                                                 // 9 красная «Сгрёб» — и Леший за ней
    KS(23.6,[-6.4,2.1,-3.4],[-1.6,3.0,-15.5],{move:'truck',amp:0.5,tr:'whip'}),                                               // 10 жёлтая «Хлоп»
    KS(25.6,[0,2.6,3.2],[0,2.6,-16],{p2:[0,4.2,6.0],l2:[0,3.2,-16],dur:5.8,tr:'dip'})];                                      // 11 общий: плечом к плечу
  d.events=[{t:0,fn:()=>{K1B.emo(L,'sleep',0);L.g.scale.setScalar(1.75);try{FIN.music.play('');}catch(e){}}}];
  const snore=at=>()=>{try{if(KSND.ok())AUD.osc({type:'sawtooth',f0:62,f1:48,d:0.9,v:0.03,a:0.3,lp:400,at:at||0,wet:0.3});}catch(e){}if(F)F.leaves(new V3(0,6.6,-24),3,{spd:0.5,up:0.4,size:0.8});};
  const hand=s=>W.enemies.find(e=>e.kind==='hand'&&e.alive&&e.side===s);
  const rise=s=>()=>{const e=hand(s);if(!e)return;e.k1.ly=-4;const p=new V3(K1I_HAND[s][0],0.3,K1I_HAND[s][1]);burst(p,0x6a4a2a,16,5);if(F)F.leaves(p,10,{spd:1.4,up:1});try{KSND.thud(0,0.14);KSND.creak(0.1);}catch(e){}CINE.trauma(0.06);};
  d.cues=[[0.2,()=>{try{KSND.steps(0,10,0.42);}catch(e){}}],[0.5,snore(0)],[2.4,snore(0)],
    [4.25,KC.emo('yosha','surprise')],[4.8,()=>{try{KSND.trill(0);}catch(e){}}],[5.0,KC.emo('pelageya','tilt')],
    [6.4,()=>{K1I.st.glint=1;for(let i=0;i<3;i++)later(i*0.25,()=>spawnSpark(HO.clone().add(new V3(rand(-0.15,0.15),rand(0,0.25),0.2)),COL.gold));try{KSND.magic(0,784);}catch(e){}}],
    [7.35,KC.emo('pelageya','flinch')],[7.6,()=>{tuft.visible=true;}],[8.6,snore(0)],
    [9.45,KC.emo('yosha','surprise')],[10.6,KC.emo('pelageya','fear')],
    [11.7,()=>{K1I.st.sneeze=1;CINE.hitstop(3);CINE.punch(3);const y=yo();if(y&&F)F.leaves(y.pos.clone().add(new V3(0,0.5,-0.3)),8,{spd:2.2,up:0.9,size:0.4});tuft.visible=false;try{KSND.poof(0);KSND.gust(0.05,1.0);}catch(e){}}],
    [11.95,KC.emo('potap','flinch')],[12.05,KC.emo('proshka','flinch')],
    [12.4,()=>{try{KSND.creak(0);KSND.creak(0.6);}catch(e){}if(F)F.leaves(new V3(0,9.2,-24.8),20,{spd:1.5,up:0.5,size:0.8,cols:[0x9acb48,0x6aa338,0x8c6644]});}],
    [12.6,()=>{K1I.st.wake=1;K1B.emo(L,'surprise',0.9);try{KSND.menace(0);}catch(e){}CINE.trauma(0.05);shakeAll(0.03,0.6);}],
    [13.2,()=>{K1B.music('k1b1');if(F)F.leaves(new V3(0,10.2,-24.8),20,{spd:2,up:1.2,size:0.8});}],[13.5,()=>K1B.emo(L,'sly',0)],[14.8,()=>K1B.emo(L,'laugh',0.9)],
    [16.2,KC.all('fear',0.06)],[16.3,()=>{try{KSND.sting(0);}catch(e){}}],[16.95,()=>{try{KSND.thud(0,0.06);}catch(e){}}],
    [18.6,()=>K1B.emo(L,'mock',2.2)],[20.9,()=>K1B.emo(L,'laugh',0.6)],
    [21.5,rise(1)],[21.7,KC.emo('yosha','surprise')],[21.9,()=>K1S1.wind({sig:'red',wdur:1.0})],[22.1,KC.emo('pelageya','surprise')],
    [22.9,()=>{K1I.st.red=1;K1I.st.roll=1;for(const h of[pe(),yo()]){if(!h)continue;h.rollT=0.38;h.lastRoll=G.time;h.rollDir.set(0,0,1);}if(F)F.leaves(new V3(1.4,0.4,-7.6),20,{spd:2.4,up:0.5});try{KSND.gust(0,0.7);}catch(e){}}],
    [23.4,KC.emo('pelageya','joy')],[23.5,KC.emo('yosha','hop')],
    [23.6,rise(-1)],[24.1,()=>K1S1.wind({sig:'yellow',wdur:1.0})],[24.2,KC.emo('proshka','effort')],[24.6,KC.emo('potap','flinch')],
    [25.15,()=>{K1I.st.yellow=1;K1I.st.shield=1;SFX.shield();SFX.crash();CINE.trauma(0.08);const p=pr();if(p)burst(p.pos.clone().add(new V3(0,1.2,0)),0x6ad0ff,14,4);burst(new V3(K1I_HAND['-1'][0],0.3,K1I_HAND['-1'][1]+1.5),0xc8a070,14,4);}],
    [25.5,KC.emo('proshka','pride')],[25.7,KC.emo('potap','laugh')],
    [25.8,()=>K1B.emo(L,'sly',0)],[26.6,KC.all('nod',0.1)],[28.9,()=>K1B.emo(L,'mock',1.4)],[29.0,()=>{try{KSND.peep(0);}catch(e){}}],[29.6,()=>{try{KSND.peep(0);}catch(e){}}],
    [30.1,KC.all('pride',0.08)],[30.2,()=>{try{KSND.sting(0);}catch(e){}}]];
  d.tick=(t,dt)=>{const D=K1I.D;if(D)D.t=t;
    // Леший спит — дышит; просыпается — вырастает с доводкой (outBack)
    const gk=clamp((t-12.6)/1.8,0,1),sc=1.75+0.45*(gk>0?E.outBack(gk):0),br=t<12.6?1+0.018*Math.sin(t*2.6):1;L.g.scale.set(sc,sc*br,sc);
    const ho=k1iHO();glint.position.copy(ho).add(new V3(Math.sin(ha)*0.05,0.02,Math.cos(ha)*0.05));glint.scale.setScalar(0.8+0.35*Math.abs(Math.sin(t*5)));
    // пушинка мха: падает, качаясь, Йоше на нос
    if(tuft.visible){const y=yo();if(y){const u=clamp((t-7.6)/2.4,0,1),f=y.face,nose=new V3(y.pos.x+Math.sin(f)*0.16,y.pos.y+y.d.height*0.68,y.pos.z+Math.cos(f)*0.16);
      tuft.position.set(nose.x+Math.sin(t*4)*0.35*(1-u),nose.y+2.6*(1-E.outCubic(u)),nose.z+Math.cos(t*3)*0.12*(1-u));tuft.rotation.z=Math.sin(t*5)*0.6;}}
    try{const bb=$('bossbar');if(bb)bb.style.visibility='hidden';}catch(e){}};
  // старт: герои — по дорожкам, руки — в показ, Леший — актёр ролика
  d.events[0].fn=(fn0=>()=>{fn0();K1I.on=true;const D=K1I.D={t:0,g,tr:k1iTracks(),ys:H.yosha?H.yosha.g.scale.clone():null,npc:null};
    K1N.demo={hand:k1iHand,k1i:true};W.updates.push(k1iHeroTick);
    if(typeof regNpc==='function'&&!ACT.npcs.some(n=>n.o===L))D.npc=regNpc(L,'leshy')&&ACT.npcs[ACT.npcs.length-1];
    try{if(c.spawnHands)c.spawnHands();}catch(e){console.error('k1i hands',e);}})(d.events[0].fn);
  const oe=d.end;d.end=()=>{k1iClean();k1iSettle();if(!K1I.D&&g.parent)k1Del(g);if(oe)oe();};
  return d;};}
{const _ll=loadLevel;loadLevel=function(i){if(K1I.D){try{k1iClean();}catch(e){}}K1I.D=null;K1I.on=false;_ll(i);};}
// руки-коряги от плеч видны только на этапе 1 — во вступлении (этап 0) тоже, но не у руки, что ещё под землёй
{const _ua=k1UpdateArms;k1UpdateArms=function(c,dt){const D=K1I.D;if(!D||!c||W.flags.phase!==0)return _ua(c,dt);
  W.flags.phase=1;try{_ua(c,dt);}finally{W.flags.phase=0;}
  for(const A of c.arms||[])if(D.t<K1I_PH[A.side>0?'1':'-1'][0])A.g.visible=false;};}
