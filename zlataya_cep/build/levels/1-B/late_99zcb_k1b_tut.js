/* ============================== РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: РОЛИК-УРОК ПЕРЕД ЭТАПОМ 1 «КАК ОДОЛЕТЬ ЛЕШЕГО» ============================== */
// Ручная постановка (def.kino, docs/40_kino_pravila.md): 23 с, 7 планов — после ролика входа, перед боем с руками. Руки и герои показывают весь этап вживую:
//   1 Леший крупно — «Ну-ка, поглядим, как вы с моими руками сладите!»; 2 красная «Сгреб» заливает веер — Пелагея кувыркается, ладонь метёт мимо;
//   3 жёлтая «Хлоп» заливает круг — Прошка закрывается щитом в последний миг, ладонь увязла и светится; 4 крупно: Прошка и Потап бьют увязшую
//   ладонь — Пробой, ладонь падает к тропе, рука ложится мостом; 5 общий: Пелагея взбегает по мосту на плечо (Прошка держит ладонь);
//   6 удар по макушке — искры, Леший охает; 7 Леший крупно — «Ай! Ну, это мы ещё поглядим!». Пояснения — голосом Сказительницы (ремарки).
// Руки в ролике ведёт K1N.demo (состояние 'demo', поза e.k1.dp/dk — late_99z_k1b_hands.js); пробитая рука — настоящий Пробой (мост тот же, что в бою).
// Конец и пропуск: руки — по домам, целые; мост убран; герои — где стояли; надпись «Фаза 1 · руки» — после урока.
// Один раз за игру (G.flags.k1b[1]); «Показать урок ещё раз» в паузе — на этапе 1, пока нет моста. FIN.k1b.tut.auto=false — без урока (боты; helpers.js).
const K1T=K1B.tut={auto:true,on:false,runs:0,mute:false,D:null};
const k1tE=()=>CINE.E,k1tR=(t,a,b)=>clamp((t-a)/(b-a),0,1);
// руки урока неуязвимы: удар игрока в ролике не гасит угольков и не пробивает
{const _eo=emberOut;emberOut=function(e,n,label){if(K1N.demo&&e&&e.k1)return;return _eo.apply(this,arguments);};}
// надписи во время урока молчат (Пробой, «Рука на землю легла!», «Фаза 1» — её покажем после)
{const _b=banner;banner=function(){if((K1T.mute||K1N.demo)&&W&&W.levelId==='1-B')return;return _b.apply(this,arguments);};}
const K1T_POS={Y:new V3(-4.5,0,-14),R:new V3(4.5,0,-14),pr:new V3(-4.5,0,-11.2),pe:new V3(4.5,0,-9.8),pt:new V3(-2.2,0,-6.2),yo:new V3(2.2,0,-6.2)};
function k1tHand(s){return W.enemies.find(e=>e.kind==='hand'&&e.alive&&e.side===s);}
// руки в ролике: поза по времени ролика (dp — wind/strike/stuck/idle, dk — доля), телеграфы — те же, что в бою
function k1tHandsTick(e){const D=K1T.D;if(!D)return;const s=e.side,t=D.t,F=K1B.fx,k1=e.k1;
  if(e.state==='broken'&&!(s<0&&D.brk)){e.state='demo';e.embers=e.maxEmb;}   // Пробой в уроке — только по сценарию
  if(e.state!=='broken'){e.state='demo';e.tgt=null;e.dazeT=0;e.embers=e.maxEmb;}else e.t=0;
  if(e.state==='broken')return;
  const P=s<0?K1T_POS.Y:K1T_POS.R;e.pos.x=P.x;e.pos.z=P.z;
  const ph=s>0?[3.3,4.4,4.65]:[6.4,7.5,7.75];   // замах, удар, конец удара
  if(s>0){e.sig='red';e.face=0;}else{e.sig='yellow';e.face=Math.PI*0.02;}
  if(t<ph[0]){k1.dp=t<0.6?'idle':'idle';k1.dk=0;}
  else if(t<ph[1]){k1.dp='wind';k1.dk=k1tR(t,ph[0],ph[1]);}
  else if(t<ph[2]){k1.dp='strike';k1.dk=k1tR(t,ph[1],ph[2]);}
  else if(s<0&&t<11.4){k1.dp='stuck';k1.dk=0;}
  else{k1.dp='idle';k1.dk=0;}
  // телеграфы
  const tk=s>0?'tr':'ty';if(k1.dp==='wind'){if(!D[tk])D[tk]=s>0?F.sectorObj(e.pos.x,e.pos.z,0,K1N.fanHalf,e.r+K1N.fanExtra,'red'):F.teleObj(e.pos.x,e.pos.z,e.r+2.0,'yellow');
      if(s>0)D[tk].g.rotation.y=e.face;D[tk].set(k1.dk);}
  else if(D[tk]){D[tk].flash();D[tk]=null;}}
// герои в ролике: места, кувырок, щит, удары, бег по мосту (после физики — W.updates)
function k1tHeroTick(){const D=K1T.D;if(!D)return;const t=D.t,E=k1tE(),H=HERO,pr=H.proshka,pe=H.pelageya,pt=H.potap,yo=H.yosha,Y=k1tHand(-1);
  const put=(h,x,z,y,face)=>{if(!h)return;const ox=h.pos.x,oz=h.pos.z;h.pos.set(x,y==null?0:y,z);const dt=1/60;h.vel.set((x-ox)/dt*0.2,0,(z-oz)/dt*0.2);if(face!=null)h.face=face;};
  const toward=(h,p)=>Math.atan2(p.x-h.pos.x,p.z-h.pos.z);
  // Пелагея: стоит перед красной → кувырок влево → бежит к мосту → вверх по мосту → по плечу к голове
  if(pe){const A=K1T_POS.pe,B=new V3(2.3,0,-9.6),rp=D.rp;
    if(t<4.1)put(pe,A.x,A.z,0,Math.PI);
    else if(t<4.55){const k=E.outCubic(k1tR(t,4.1,4.55));if(!D.rolled){D.rolled=1;pe.rollT=0.38;pe.lastRoll=G.time;pe.rollDir.set(-1,0,0);}put(pe,lerp(A.x,B.x,k),lerp(A.z,B.z,k),0,-Math.PI/2);}
    else if(!rp||t<11.9)put(pe,B.x,B.z,0,t<6?Math.PI:toward(pe,K1T_POS.Y));
    else{const foot=new V3(rp.x0-rp.dx*0.9,0,rp.z0-rp.dz*0.9);
      if(t<13.0){const k=E.inOutSine(k1tR(t,11.9,13.0));put(pe,lerp(B.x,foot.x,k),lerp(B.z,foot.z,k),0,toward(pe,foot));}
      else if(t<15.4){const k=E.inOutSine(k1tR(t,13.0,15.4)),d=-0.9+(rp.len+0.9)*k,u=clamp(d/rp.len,0,1);put(pe,rp.x0+rp.dx*d,rp.z0+rp.dz*d,rp.y0+(rp.y1-rp.y0)*u+0.02,Math.atan2(rp.dx,rp.dz));}
      else{const top=new V3(rp.x0+rp.dx*rp.len,0,rp.z0+rp.dz*rp.len),fp=D.fp,end=fp?new V3(fp.x0+fp.dx*fp.len*0.2,0,fp.z0+fp.dz*fp.len*0.2):top,k=E.inOutSine(k1tR(t,15.4,16.2)),hp=K1B.cur.headPos;
        put(pe,lerp(top.x,end.x,k),lerp(top.z,end.z,k),rp.y1+0.02,Math.atan2(hp.x-pe.pos.x,hp.z-pe.pos.z));
        if(t>=16.8&&!D.hit1){D.hit1=1;pe.atkT=0.28;SFX.swish();}if(t>=17.5&&!D.hit2){D.hit2=1;pe.atkT=0.28;SFX.swish();}}}}
  // Прошка: стоит под жёлтой → щит в последний миг → подходит и бьёт увязшую → держит упавшую ладонь
  if(pr){const A=K1T_POS.pr,C=new V3(-5.6,0,-12.7),Hd=new V3(-3.8,0,-10.9);
    pr.guard=t>=7.1&&t<7.85;
    if(t<9.3)put(pr,A.x,A.z,0,Math.PI);
    else if(t<9.6){const k=E.inOutSine(k1tR(t,9.3,9.6));put(pr,lerp(A.x,C.x,k),lerp(A.z,C.z,k),0,Math.PI);}
    else if(t<11.6)put(pr,C.x,C.z,0,Math.PI*0.78);
    else{const k=E.inOutSine(k1tR(t,11.6,12.1));put(pr,lerp(C.x,Hd.x,k),lerp(C.z,Hd.z,k),0,Y?toward(pr,Y.pos):Math.PI);}
    for(const[q,n]of[[9.65,'a'],[10.15,'b'],[10.65,'c']])if(t>=q&&!D['pr'+n]){D['pr'+n]=1;pr.atkT=0.28;}}
  // Потап: смотрит, потом прибегает помочь; Йоша — болеет
  if(pt){const A=K1T_POS.pt,C=new V3(-3.1,0,-12.8);
    if(t<9.7)put(pt,A.x,A.z,0,toward(pt,t<6?K1T_POS.R:K1T_POS.Y));
    else if(t<10.3){const k=E.inOutSine(k1tR(t,9.7,10.3));put(pt,lerp(A.x,C.x,k),lerp(A.z,C.z,k),0,-Math.PI/2-0.6);}
    else if(t<12.0)put(pt,C.x,C.z,0,-Math.PI/2-0.6);
    else{const k=E.inOutSine(k1tR(t,12.0,12.6)),B=new V3(-1.4,0,-10.4);put(pt,lerp(C.x,B.x,k),lerp(C.z,B.z,k),0,toward(pt,pe?pe.pos:K1T_POS.Y));}
    for(const[q,n]of[[10.4,'a'],[10.9,'b']])if(t>=q&&!D['pt'+n]){D['pt'+n]=1;pt.atkT=0.28;}}
  if(yo)put(yo,K1T_POS.yo.x,K1T_POS.yo.z,0,toward(yo,t<6?K1T_POS.R:t<12?K1T_POS.Y:(pe?pe.pos:K1T_POS.Y)));}
// ролик
function k1tPlay(then){const c=K1B.cur;if(!c){if(then)then();return;}const L=c.L,E=k1tE(),hp=c.headPos,F=K1B.fx;K1T.runs++;K1T.on=true;
  const D=K1T.D={t:0,from:new Map(HEROES.map(h=>[h,h.pos.clone()])),face:new Map(HEROES.map(h=>[h,h.face])),rp:null,fp:null,then};
  // руки — в показ; герои — по местам урока
  K1N.demo={hand:k1tHandsTick};for(const s of[-1,1]){const e=k1tHand(s);if(e){e.state='demo';e.t=0;e.k1.dp='idle';e.k1.dk=0;}}
  W.updates.push(k1tHeroTick);
  if(!ACT.npcs.some(n=>n.o===L))D.npc=regNpc(L,'leshy')&&ACT.npcs[ACT.npcs.length-1];   // Леший — актёр ролика (говорящий в кадре; кит late_83)
  const def={kino:true,dur:23,fov:50,mood:['#c8f0a0',0.06],
    says:[[0.3,2.7,'leshy','Ну-ка, поглядим, как вы с моими руками сладите!'],
      [3.2,2.9,null,'<i>Красная метёт — кувырок в сторону.</i>',true],
      [6.3,2.9,null,'<i>Жёлтая хлопнет — щит в последний миг.</i>',true],
      [9.3,2.9,null,'<i>Промахнулась — увязла. Бей её!</i>',true],
      [12.5,3.4,null,'<i>Пробитая рука ложится мостом — беги наверх!</i>',true],
      [16.3,3.1,null,'<i>По макушке! Трижды — и Леший сдастся.</i>',true],
      [19.8,2.8,'leshy','Ай! Ну, это мы ещё поглядим!']],
    shots:[KS(0,[0,8.6,-16],[0,7.9,-24.2],{trk:KC.fcam(L,8.2,0,0.1,0.25)}),                                        // 1 Леший крупно
      KS(3.0,[10.5,3.6,-6.2],[3.6,1.2,-12.2],{move:'truck',amp:0.6}),                                                 // 2 красная и Пелагея — сбоку
      KS(6.2,[-10.5,3.4,-6.6],[-4.2,1.4,-12.6],{move:'push',amp:0.6,tr:'whip'}),                                       // 3 жёлтая и Прошка — с другой стороны
      KS(9.2,[-4.3,1.8,-10.4],[-4.4,1.0,-13.6],{move:'push',amp:0.6}),                                                  // 4 крупно: бьют увязшую ладонь
      KS(12.4,[-7.5,6.5,-4.5],[-3.5,2.6,-17.5],{p2:[-6.5,8.2,-7.5],l2:[-2.8,4.4,-20],dur:4.0}),                           // 5 общий: мост, Пелагея взбегает
      KS(16.4,[-7.4,11.2,-19.6],[-1.3,7.3,-23.6],{move:'push',amp:0.5,tr:'dip'}),                                        // 6 плечо и макушка
      KS(19.6,[0,8.6,-16.5],[0,7.9,-24.2],{trk:KC.fcam(L,7.6,0.18,0.05,0.3),tr:'whip'})],                              // 7 Леший крупно
    cues:[[0.3,()=>{K1B.emo(L,'mock',2.4);KSND.creak(0);}],[1.4,()=>{F.leaves(new V3(0,9.5,-24),12,{spd:1.2,up:0.4});}],
      [3.3,()=>K1S1.wind({sig:'red',wdur:1.1})],[3.5,KC.emo('pelageya','surprise')],[4.4,()=>{SFX.whoosh();F.leaves(new V3(4.5,0.4,-10.5),8,{up:0.4,spd:1.5});}],
      [4.6,()=>floatText(HERO.pelageya.pos.clone().add(new V3(0,2.3,0)),'Увернулась!','#b8e070')],[5.0,KC.emo('pelageya','joy')],
      [6.4,()=>K1S1.wind({sig:'yellow',wdur:1.1})],[6.6,KC.emo('proshka','effort')],
      [7.5,()=>{SFX.shield();SFX.crash();CINE.trauma(0.07);const p=HERO.proshka.pos;burst(p.clone().add(new V3(0,1.2,0)),0x6ad0ff,14,4);F.sprouts(K1T_POS.Y.x,K1T_POS.Y.z,2.5);}],
      [7.8,()=>{SFX.knock();floatText(new V3(K1T_POS.Y.x,3.4,K1T_POS.Y.z),'Открыт! Бей!','#ffe36b');K1B.emo(L,'surprise',1.2);}],[8.2,KC.emo('proshka','pride')],
      [9.65,()=>{SFX.ember();spawnSpark(new V3(-4.5,1.2,-13.4),0x6ad0ff);}],[10.15,()=>{SFX.ember();spawnSpark(new V3(-4.3,1.3,-13.6),0xffd76a);}],
      [10.4,()=>{SFX.ember();spawnSpark(new V3(-3.9,1.1,-13.5),0x6ad0ff);}],[10.65,()=>{SFX.ember();spawnSpark(new V3(-4.6,1.4,-13.8),0xffd76a);}],
      [11.4,()=>{SFX.brk();CINE.punch(-3);CINE.trauma(0.08);burst(new V3(-4.5,1.4,-14),0xfff2b0,18,5);K1B.emo(L,'hurt',1.4);}],[11.6,KC.all('cheer')],
      [12.1,KC.emo('proshka','nod')],[13.0,()=>KSND.steps(0,8,0.28)],[15.6,KC.emo('pelageya','effort')],
      [16.8,()=>{SFX.finisher();CINE.trauma(0.1);CINE.punch(-4);ringFx(hp,COL.gold,3);for(let i=0;i<6;i++)spawnSpark(hp.clone(),[COL.gold,0x6ad0ff,0xff6a8a][i%3]);
          floatText(hp.clone().add(new V3(0,1,0)),'По макушке!','#ffd76a');K1B.emo(L,'surprise',1.6);}],
      [17.5,()=>{SFX.ember();spawnSpark(hp.clone(),COL.gold);}],[17.7,KC.emo('proshka','cheer')],[17.9,KC.emo('potap','cheer')],[18.1,KC.emo('yosha','joy')],
      [19.8,()=>K1B.emo(L,'hurt',1.0)],[21.0,()=>K1B.emo(L,'sly',0)],[21.4,()=>KSND.sting(0)]],
    tick:(t,dt)=>{D.t=t;
      // Пробой жёлтой на 11,4 с — настоящий: ладонь падает к тропе, рука ложится мостом
      const Y=k1tHand(-1);if(Y&&t>=11.4&&!D.brk){D.brk=1;Y.embers=0;Y.state='broken';Y.t=0;Y.bdur=99;Y.k1.dp=null;}
      if(!D.rp&&Y&&Y.k1bridge){const r=c.ramps.find(q=>q.hand===Y);if(r){D.rp=r.cols[0];D.fp=r.cols[1]||null;r.t=99;}}},
    end:()=>k1tEnd()};
  play(def);}
function k1tEnd(){const D=K1T.D;if(!D)return;K1T.D=null;K1T.on=false;K1N.demo=null;const c=K1B.cur;
  const i=W.updates.indexOf(k1tHeroTick);if(i>=0)W.updates.splice(i,1);
  if(D.npc){const j=ACT.npcs.indexOf(D.npc);if(j>=0)ACT.npcs.splice(j,1);}
  if(D.ty)D.ty.del();if(D.tr)D.tr.del();
  for(const h of HEROES){const p=D.from.get(h);if(p){placeOnGround(h,p.x,p.z,0);h.face=D.face.get(h);}h.vel.set(0,0,0);h.guard=false;h.atkT=0;h.rollT=0;}
  for(const e of W.enemies)if(e.k1&&e.alive){e.state='idle';e.t=0;e.cd=1.2;e.embers=e.maxEmb;e.dazeT=0;e.tgt=null;e.k1.dp=null;e.k1.dk=0;e.k1.fall=null;e.k1.prev='idle';e.k1.stuck=false;
    e.pos.set(e.home.x,0,e.home.z);e.k1bridge=null;}
  if(c&&c.ramps)for(const r of c.ramps.slice()){r.t=0;}   // мост урока: рука уже не в Пробое — W.updates уберёт его в этот же кадр
  K1N.atkAt=G.time;snapCams();K1T.mute=false;
  banner('Фаза 1 · руки','#b8e070',2.6,'жёлтая — щит, как от кикиморок · красная — кувырок, как от пня');
  const th=D.then;if(th)th();}
// после ролика входа: урок (один раз за игру), потом бой
{const _in=K1B.cine.intro;K1B.cine.intro=function(d){d=_in(d);const oe=d.end;d.end=()=>{const go=K1T.auto&&!FIN.lesson.seen('k1b',1);if(go)K1T.mute=true;oe();K1T.mute=false;
    if(go){FIN.lesson.mark('k1b',1);K1T.mute=true;later(0.05,()=>{if(K1B.cur&&W.flags.phase===1)k1tPlay();else K1T.mute=false;});}};return d;};}
K1T.play=k1tPlay;
// «Показать урок ещё раз» (пауза): на этапе 1, пока нет моста; на хороводе — урок хоровода, как раньше
{const LK=FIN.lesson,prev=LK.reg['1-B'];const can1=()=>!!K1B.cur&&W.flags.phase===1&&!G.cine&&!K1T.on&&!(K1B.cur.ramps&&K1B.cur.ramps.length)&&!W.enemies.some(e=>e.k1&&e.state==='broken');
  LK.regLevel('1-B',()=>{if(can1()){K1T.mute=true;k1tPlay();}else if(prev)prev.fn();},()=>can1()||(prev?prev.can():false));}
{const _ll=loadLevel;loadLevel=function(i){if(K1T.D){K1T.D=null;K1N.demo=null;}K1T.on=false;K1T.mute=false;_ll(i);};}
