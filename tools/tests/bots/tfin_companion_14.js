//@@ wait=1500
// релиз final06: напарник-бот проходит 1-4 «Леший водит» за Игрока 2: после «Пелагею увели» Йоша ползёт под корнями и поливает ёлку-замок; ведёт обоих героев
// по тропе ёлок-ходунов; привязывает ёлки-ворота клубком у столба; на поляне Пелагея открывает Совиным взором серебряную тропу, нить ложится по серебру;
// на двух тропках держит взглядом тропку человека; ставит кольца хоровода; аукает с пня-эхо на поляне-петле; помогает с Аукой; выход.
// Человека (Игрок 1) играет скрипт: доходит до похищения, сбивает три шишки-замка рогаткой Прошки (встаёт на их следы), идёт по левой тропке, бегает к проходам петли, дерётся с Аукой.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.P=ZC.players;window.F=()=>ZC.W.flags;window.bot=()=>U.act(1);window.me=()=>U.act(0);
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1);
ZC.startFrom(ZC.LV('1-4'));ZC.G.manual=true;ZC.tick(30);CO.set(true);CO.skill=1;U.nocine();ZC.tick(30);
['stage='+F().stage,'me='+pos(me()),'bot='+pos(bot()),'mode='+CO.mode]
//@@
// человек выходит за черту z<-23.5 — «Пелагею увели» (ролик пропускаем); на кольце Пелагея, бот берёт Йошу
const r=[U.goto(0,-2,-12,12,0.6),U.goto(0,-2,-24.5,15,0.6)];const u=U.until(()=>ZC.G.cine||F().stage==='rescue',10);U.nocine();ZC.tick(60);
r.push('stage='+F().stage,'pe.inRing='+ZC.HERO.pelageya.inRing,'bot='+pos(bot()),'mode='+CO.mode);r
//@@
// Йоша поливает ёлку-замок
const u=U.until(()=>F().watered,40);['water '+u,'watered='+!!F().watered,'bot='+pos(bot()),F().watered?'water ok':'FAIL water']
//@@
// человек: Прошка встаёт на след каждой шишки-замка и бьёт из рогатки (E)
const RC={x:7.3,z:-33},RR=2.15,r=[];U.toKind('proshka');
for(const i of[3,4,5]){const a=i/8*Math.PI*2,nx=Math.cos(a),nz=Math.sin(a),f={x:RC.x+nx*RR,z:RC.z+nz*RR},sp={x:Math.max(-1,Math.min(1.4,f.x+nx*6.2)),z:f.z+nz*6.2},c={x:f.x+nx*0.5,z:f.z+nz*0.5};
  const h=me();h.pos.set(sp.x,0,sp.z);h.vel.set(0,0,0);ZC.tick(3);h.face=Math.atan2(c.x-sp.x,c.z-sp.z);ZC.tick(2);
  for(let k=0;k<4&&!ZC.W.marks.length;k++)ZC.tick(1);const n0=ZC.W.marks.filter(m=>m.active()).length;ZC.press('KeyE');ZC.tick(70);r.push('cone'+i+' '+n0+'→'+ZC.W.marks.filter(m=>m.active()).length);}
r.push('ringOpen='+!!F().ringOpen,F().ringOpen?'cones ok':'FAIL cones');r
//@@
// ёлки-ходуны: бот ведёт обоих героев по тропе к воротам и привязывает правую ёлку у столба; левую привязывает человек (встаёт спиной, поворачивается, когда ёлка у столба)
const g=ZC.W.movers.filter(q=>q.tieable),gl=g[0],gr=g[1],L=[];let last='';
for(let i=0;i<60*120&&!(gr.tied&&gl.tied);i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}
  if(bot().pos.z<-60&&!gl.tied){const h=me();if(Math.hypot(h.pos.x+2.8,h.pos.z+68.6)>0.6){h.pos.set(-2.8,0,-68.6);h.vel.set(0,0,0);}
    if(Math.hypot(gl.pos.x+3.35,gl.pos.z+71)<1.2&&Math.abs(gl.pos.x-h.pos.x)<0.5){h.face=Math.PI;if(i%40===0)ZC.press('KeyR');}else h.face=0;}}
L.push('tied L/R='+!!gl.tied+'/'+!!gr.tied,'bot='+pos(bot()),(gl.tied&&gr.tied)?'gates ok':'FAIL gates');L
//@@
// оба героя бота — за воротами, в проходе
const u=U.until(()=>ZC.HERO.yosha.pos.z<-74&&ZC.HERO.pelageya.pos.z<-74,25);const gg=ZC.W.movers.filter(q=>q.tieable);['pass '+u,'y='+pos(ZC.HERO.yosha),'p='+pos(ZC.HERO.pelageya),'act='+bot().kind,'mode='+CO.mode+' wp='+(CO.wp?CO.wp.i:'-'),'gates='+gg.map(q=>q.pos.x.toFixed(1)+(q.tied?'T':'')).join(','),u!=='TIMEOUT'?'pass ok':'FAIL pass']
//@@
// поляна Лешего: Пелагея открывает Совиным взором серебряную тропу, клубок ложится по серебру — ёлки замирают
const L=[];let last='';for(let i=0;i<60*60&&!F().silver;i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}
L.push('seenSilver='+!!F().seenSilver,'silver='+!!F().silver,'bot='+pos(bot())+' face='+bot().face.toFixed(2),'threads='+ZC.W.threads.filter(t=>t.owner===1).map(t=>'len'+t.len.toFixed(1)+' d'+t.dx.toFixed(2)+','+t.dz.toFixed(2)+' s'+t.sx.toFixed(1)+','+t.sz.toFixed(1)+(t.grow?'g':'')+(t.ret?'r':'')).join(';'),'walkers='+ZC.W.movers.filter(m=>m.noGaze).map(m=>m.pos.x.toFixed(0)+','+m.pos.z.toFixed(0)).join(' '),F().silver?'silver ok':'FAIL silver');L
//@@
// бот идёт по серебру через колючие стены; человек выходит к двум тропкам (левая), бот на правой держит взглядом его ёлки
const r=[U.until(()=>bot().pos.z<-100.5,40),'bot='+pos(bot())];me().pos.set(-5,0,-101);me().vel.set(0,0,0);
let k=0;for(let i=0;i<60*90&&me().pos.z>-127.5;i++){U.step(0,-5,-128.5,0.5);if(me().knockT>0)k++;ZC.tick(1);}U.rel(0);
const u=U.until(()=>bot().pos.z<-126,40);r.push('knocks='+k,'me='+pos(me()),'bot='+pos(bot())+' '+u,'mode='+CO.mode,me().pos.z<-127.5&&u!=='TIMEOUT'?'lanes ok':'FAIL lanes');r
//@@
// «Хоровод ёлок»: бот ставит кольца сам (смотрит на кольцо и шагает в проход) и доходит до пня; человек ждёт у входа
me().pos.set(-6,0,-131);me().vel.set(0,0,0);me().face=0;const u=U.until(()=>F().horoDone,120);
['horo '+u,'locked='+ZC.W.k14.horo.filter(q=>q.locked).length,'bot='+pos(bot())+' mode='+CO.mode,F().horoDone?'horo ok':'FAIL horo']
//@@
// «Леший водит по кругу»: бот на пне-эхо аукает, человек у проходов бежит к золотому огоньку
const KG=ZC.W.k14.KG,r=[];const t0=ZC.G.time;U.goto(0,2.5,-149,6);U.goto(0,0,-160,6);
for(let i=0;i<60*150&&!F().krugDone;i++){const h=me();if(KG.busy){ZC.tick(1);continue;}
  // замершая ёлка-ходун на пути — обойти сбоку
  const wk=ZC.W.k14.kgW.find(m=>m.pos.z<h.pos.z+0.5&&m.pos.z>h.pos.z-2.6&&Math.abs(m.pos.x-h.pos.x)<1.6);
  if(wk&&h.pos.z>-181){U.step(0,wk.pos.x>h.pos.x?wk.pos.x-2.4:wk.pos.x+2.4,h.pos.z-0.3,0.3);}
  else if(KG.lit>0){const g=KG.gaps[KG.tru];if(h.pos.z>-184.8)U.step(0,g,-185.4,0.3);else U.step(0,g,-188.5,0.3);}else U.step(0,0,-182.5,0.5);ZC.tick(1);}
U.rel(0);r.push('loop='+KG.loop,'t='+(ZC.G.time-t0).toFixed(0),'bot='+pos(bot())+' mode='+CO.mode,F().krugDone?'krug ok':'FAIL krug');r
//@@
// Аука: человек дерётся (отбивает «ау-шары», бьёт открытого, прыгает от кольца, на «АУ» встаёт на пень-эхо и аукает); бот — свои дела
window.A=()=>ZC.W.k14.auka;const r=[];const t0=ZC.G.time;U.goto(0,0,-196,8);U.nocine();ZC.tick(5);
for(let i=0;i<60*360&&!(ZC.W.k14.arena.cleared);i++){for(const h of Object.values(ZC.HERO))if(h.active)h.iT=Math.max(h.iT||0,0.5);if(ZC.G.cine){ZC.skip();ZC.tick(5);continue;}
  const a=A(),e=a.e,D=a.dbg(),h=me();if(!e){ZC.tick(1);continue;}
  if(D.ring&&h.grounded){const d=Math.hypot(h.pos.x,h.pos.z+205);if(d-D.ring.r>0.2&&d-D.ring.r<0.9)ZC.press('Space');}
  const bo=ZC.W.bolts.find(b=>b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.18);if(bo)ZC.press('KeyG');
  {const w=ZC.W.enemies.find(q=>q.alive&&q.state==='wind'&&q.tgt===h);if(w){const left=w.wdur-w.t;if(w.sig==='red'){if(left<0.2)ZC.press('ShiftLeft');}else if(left<0.16&&w.left===null)ZC.press('KeyG');}}
  if(a.ph===1&&e.state==='hide'){const m=D.HL.find(q=>q.markT>0);if(m)U.step(0,m.mx,m.mz,0.6);else{U.rel(0);if(i%120===0)ZC.press('Digit1');}}
  else if(a.ph===3&&a.windT>0){const s=D.ES.find(q=>Math.hypot(q.x-h.pos.x,q.z-h.pos.z)<Math.hypot(q.x-bot().pos.x,q.z-bot().pos.z))||D.ES[0];if(U.step(0,s.x,s.z,0.5)&&i%20===0)ZC.press('Digit1');}
  else{const al=ZC.W.enemies.filter(q=>q.alive&&q.state!=='hide'&&q.state!=='spawn'&&q.g.visible!==false);let t=null,bd=99;for(const q of al){const d=Math.hypot(q.pos.x-h.pos.x,q.pos.z-h.pos.z);if(d<bd){bd=d;t=q;}}
    if(!U.def(0,i)){if(t)U.hit(0,t,i);else U.rel(0);}}
  ZC.tick(1);}
U.rel(0);ZC.tick(5);U.nocine();r.push('ph='+A().ph,'t='+(ZC.G.time-t0).toFixed(0),'bot='+pos(bot())+' mode='+CO.mode,ZC.W.k14.arena.cleared?'auka ok':'FAIL auka ph='+A().ph+' emb='+(A().e&&A().e.embers));r
//@@
// выход: ворота открыты — бот к выходу, уровень пройден
const u=U.until(()=>F().out||ZC.W.levelId!=='1-4',40);
['out '+u,'out='+!!F().out,'bot='+pos(bot())+' mode='+CO.mode,'me='+pos(me()),'links='+ZC.W.items.filter(q=>q.kind==='link'&&q.taken).length+'/'+ZC.W.linkTotal,'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''),(F().out&&!_errs.length)?'1-4 ok':'FAIL 1-4']
