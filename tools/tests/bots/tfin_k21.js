//@@ wait=1500
// релиз final06: 2-1 «Гусли Садко» вдвое длиннее (late_99e_k21.js) — новые участки вдвоём настоящими нажатиями:
// Г2 «Переливная улица» (Потап на заслонке на дне, перелив: прилив у одного = отлив у другого, лодкой к террасе, верёвка — ворота друга),
// Ж1 «Звонкая мостовая» (осётр напевает напев Садко; плиты: дзинь, дилинь — по очереди, дон-дон — вдвоём разом; стража ворот).
// Ж2 «Палаты Морского царя» (два стула перед троном — пляска в два голоса, кольца-волны прыгаем, пляс-ракушки; оставленный доигрывает),
// З2 «Сад Китежа» (Потап по дну до якоря и ракушки, отлив, оставленный держит; Йоша растит лесенки; подъём по листьям), ворота — уровень пройден.
// З3 «Рак-Отшельник» (мини-босс: гусли у ракушки-музыкалки — рак пляшет, бьём; Потап вытягивает из раковины; без домика — зажать с двух сторон).
// Плюс начало: напев Садко после подарка гуслей. Звеньев 4.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.KEYS=[{up:'KeyW',down:'KeyS',left:'KeyA',right:'KeyD',jump:'Space',attack:'KeyF',swap:'KeyQ',skill:'KeyE',item:'KeyR'},{up:'ArrowUp',down:'ArrowDown',left:'ArrowLeft',right:'ArrowRight',jump:'KeyM',attack:'Comma',swap:'KeyK',skill:'KeyL',item:'Semicolon'}];
window.ACT=(pi,kind)=>{if(U.act(pi).kind!==kind){U.tap(KEYS[pi].swap);ZC.tick(4);}return U.act(pi).kind===kind;};
// идти, перепрыгивая волны палат
window.WALKW=(pi,x,z,max)=>U.walkTo(pi,x,z,max,(h)=>{const D=ZC.W.dbg21();for(const w of D.WAV){const d=h.pos.z-w.z;if(d>0.6&&d<2.2&&h.grounded&&h.pos.y<0.8){ZC.press(KEYS[pi].jump);break;}}});
// подняться по листьям водоросли-лесенки
window.CLIMB=(pi,S)=>{const K=KEYS[pi],B=[K.left,K.right,K.up,K.down];let n=0;for(const L of S.leaves){const c=L.col;let ok=false;
  for(let i=0;i<240;i++){const h=U.act(pi),dx=c.x-h.pos.x,dz=c.z-h.pos.z,d=Math.hypot(dx,dz);ZC.hold(B[0],dx<-0.12);ZC.hold(B[1],dx>0.12);ZC.hold(B[2],dz<-0.12);ZC.hold(B[3],dz>0.12);
    if(h.grounded&&h.groundRef===c&&d<0.45){ok=true;break;}if(h.grounded&&c.maxy>h.pos.y+0.2&&d<1.7)ZC.press(K.jump);ZC.tick(1);}
  B.forEach(k=>ZC.hold(k,false));ZC.tick(2);if(!ok)return 'stuck@'+n+' '+U.act(pi).pos.toArray().map(v=>v.toFixed(2));n++;}return 'ok';};
// оба героя идут разом (каждый к своей точке); extra(pi,h) — на каждом кадре
window.WALK2=(t0,t1,max,extra)=>{const n=Math.round((max||6)*60);const T=[t0,t1];for(let i=0;i<n;i++){let done=true;for(const pi of[0,1]){const K=KEYS[pi],h=U.act(pi),t=T[pi];if(!t){continue;}const dx=t[0]-h.pos.x,dz=t[1]-h.pos.z;
      const far=Math.hypot(dx,dz)>=0.45;if(far)done=false;ZC.hold(K.left,far&&dx<-0.25);ZC.hold(K.right,far&&dx>0.25);ZC.hold(K.up,far&&dz<-0.25);ZC.hold(K.down,far&&dz>0.25);if(extra)extra(pi,h,i);}
    if(done)break;ZC.tick(1);}for(const K of KEYS)[K.left,K.right,K.up,K.down].forEach(k=>ZC.hold(k,false));ZC.tick(1);return 't='+(i=>i)(0);};
// бой двоих: каждый бьёт ближнего; капли/жемчуг — отбивает щитом в последний миг; красное — кувырок
window.FIGHT2=(list,max)=>{const n=Math.round((max||30)*60);const G2=['KeyG','Period'],R2=['ShiftLeft','Slash'];for(let i=0;i<n;i++){const alive=list.filter(e=>e.alive&&e.state!=='dying');if(!alive.length){for(const K of KEYS)[K.left,K.right,K.up,K.down].forEach(k=>ZC.hold(k,false));return 'cleared t='+(i/60).toFixed(1);}
    for(const pi of[0,1]){const K=KEYS[pi],h=U.act(pi);let e=null,bd=99;for(const x of alive){const d=Math.hypot(x.pos.x-h.pos.x,x.pos.z-h.pos.z);if(d<bd){bd=d;e=x;}}const dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z;
      const far=bd>1.6+e.r;ZC.hold(K.left,far&&dx<-0.3);ZC.hold(K.right,far&&dx>0.3);ZC.hold(K.up,far&&dz<-0.3);ZC.hold(K.down,far&&dz>0.3);
      if(ZC.W.bolts.some(b=>b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2))ZC.press(G2[pi]);const w=alive.find(x=>x.state==='wind'&&x.tgt===h);if(w){const left=w.wdur-w.t;if(w.sig==='red'){if(left<0.2)ZC.press(R2[pi]);}else if(left<0.16&&w.left===null)ZC.press(G2[pi]);}
      if(!far&&((e.state==='stagger'&&!e.openHit)||e.state==='broken'||e.open>0||e.dazeT>0)&&i%9===pi*4){h.face=Math.atan2(dx,dz);ZC.press(K.attack);}}ZC.tick(1);}
  for(const K of KEYS)[K.left,K.right,K.up,K.down].forEach(k=>ZC.hold(k,false));return 'TIMEOUT '+list.filter(e=>e.alive).map(e=>e.kind+':'+e.state).join();};
// прыжок через кольцо-волну пляски, если оно вот-вот дойдёт
window.RINGJ=(pi,h)=>{const D=ZC.W.dbg21();const d=Math.hypot(h.pos.x,h.pos.z-D.TZ);for(const w of D.WAV){if(w.side&&h.pos.x*w.side<0)continue;const gap=d-w.R;if(gap>0.3&&gap<1.3&&h.grounded&&h.pos.y<0.8){ZC.press(KEYS[pi].jump);break;}}};
ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
'links='+ZC.W.linkTotal+' nuts='+ZC.W.nutTotal
//@@
// напев Садко: после подарка гуслей — отдельная сценка с четырьмя звуками
const F=ZC.W.flags;F.stage='sadko';ZC.W.waterTargets.find(w=>w.active()).onWater();let t=0;while(ZC.G.cine&&t<3000){ZC.tick(1);t++;}ZC.tick(30);
const d1=ZC.G.cine?ZC.G.cine.dur:0;if(Math.abs(d1-8.2)>0.01)throw new Error('нет сценки «напев Садко»: '+d1);ZC.skip();ZC.tick(5);if(!ZC.W.abil.gusli)throw new Error('гуслей нет');'tune scene ok'
//@@
// Г2: Потап — на заслонку на дне левого канала (левый в отливе), Прошка играет прилив у левой ракушки
const D=ZC.W.warp21('perel');ZC.tick(20);ZC.skip();for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}ZC.tick(10);
if(!ACT(0,'potap'))throw new Error('нет Потапа');const r=[U.walkTo(0,-10.2,-80.2,5),U.walkTo(0,-10.2,-86,6),U.walkTo(0,-2.8,-95,8)];ZC.tick(20);
if(!D.SLU.held())throw new Error('Потап не встал на заслонку: '+r.join()+' '+U.act(0).pos.toArray().map(v=>v.toFixed(2)));
ACT(0,'proshka');ZC.tick(5);r.push(U.walkTo(0,-9.8,-79.4,8));U.tap('KeyR');ZC.tick(160);
if(D.CL.state!=='high'||D.CR.state!=='low')throw new Error('перелив не сработал: '+D.CL.state+'/'+D.CR.state+' '+r.join());
const py=ZC.HERO.potap.pos.y;if(py>-1.9)throw new Error('Потап всплыл: '+py.toFixed(2));'sluice ok potap y='+py.toFixed(2)+' '+r.join()
//@@ shot=k21_perel_flow.png
// Прошка: в воду, на лодку, на террасу, верёвка — открывает ворота Пелагеи
const D=ZC.W.dbg21();const r=[U.walkTo(0,-8.3,-100,8),U.walkTo(0,-8.3,-104.5,4,(h)=>{if(h.grounded&&h.groundRef&&h.groundRef.water)ZC.press('Space');})];ZC.tick(30);
r.push(U.walkTo(0,-8.3,-109.2,4,(h)=>{if(h.grounded&&h.pos.y<3.1)ZC.press('Space');}));ZC.tick(20);r.push(U.walkTo(0,-5.9,-110.4,3));ZC.tick(5);
ZC.HERO.proshka.face=Math.PI/2;U.tap('KeyF');ZC.tick(30);if(!D.ropes[0].pulled)throw new Error('левая верёвка не дёрнута: '+r.join()+' '+U.act(0).pos.toArray().map(v=>v.toFixed(2)));
if(!D.PG[1].open)throw new Error('ворота Пелагеи не открылись');'left rope ok '+r.join()
//@@
// Пелагея: прилив справа (Потап на заслонке держит — левый уходит в отлив), на лодку, на террасу, верёвка — ворота Прошки;
// в канале плавает щука — её каплю Пелагея отбивает щитом (SH)
window.SH=pi=>h=>{if(ZC.W.bolts.some(b=>b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2))ZC.press(pi?'Period':'KeyG');};
const D=ZC.W.dbg21();ACT(1,'pelageya');const r=[U.walkTo(1,9.8,-79.4,8)];U.tap('Semicolon');ZC.tick(160);if(D.CR.state!=='high'||D.CL.state!=='low')throw new Error('правый прилив не пошёл: '+D.CR.state);
r.push(U.walkTo(1,8.3,-100,8,SH(1)),U.walkTo(1,8.3,-104.5,4,(h,i)=>{SH(1)(h);if(h.grounded&&h.groundRef&&h.groundRef.water)ZC.press('KeyM');}));ZC.tick(30);
r.push(U.walkTo(1,8.3,-109.2,4,(h)=>{SH(1)(h);if(h.grounded&&h.pos.y<3.1)ZC.press('KeyM');}));ZC.tick(20);r.push(U.walkTo(1,5.9,-110.4,3,SH(1)));ZC.tick(5);ZC.HERO.pelageya.face=-Math.PI/2;U.tap('Comma');ZC.tick(30);
if(!D.ropes[1].pulled||!D.PG[0].open)throw new Error('правая верёвка/левые ворота: '+r.join()+' '+U.act(1).pos.toArray().map(v=>v.toFixed(2)));
r.push(U.walkTo(0,-6,-114,5),U.walkTo(1,6,-114,5),U.walkTo(0,-6,-117.5,4),U.walkTo(1,6,-117.5,4));if(!(U.act(0).pos.z<-113&&U.act(1).pos.z<-113))throw new Error('не прошли ворота: '+r.join());'perelivnaya ok'
//@@ shot=k21_perel_done.png
// Ж1: Звонкая мостовая — осётр пролетает и напевает; плиты: дзинь (Игрок 1), дилинь (Игрок 2), дон-дон — вдвоём разом; стража ворот — бой
const D=ZC.W.warp21('tune');ZC.W.flags.sturg=false;ZC.tick(20);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}const r=[WALK2([-2,-184],[2,-184],4)];let t=0;while(!D.F.sturg&&t<300){ZC.tick(1);t++;}ZC.tick(60*9);
const T=D.TUNE;r.push(WALK2([T[0].x,T[0].z],null,6));ZC.tick(20);r.push(WALK2(null,[T[1].x,T[1].z],6));ZC.tick(20);const s1=D.TS.step;r.push(WALK2([T[2].x,T[2].z],[T[3].x,T[3].z],7));ZC.tick(30);
if(!D.TS.done)throw new Error('напев не сложился: step='+D.TS.step+' s1='+s1+' fails='+D.TS.fails+' '+r.join());ZC.tick(120);const g=D.TS.guard||[];const f=FIGHT2(g,40);
'tune ok s1='+s1+' guard '+f
//@@ shot=k21_tune.png
// Ж2: пляска в два голоса — оба играют у стульев перед троном, прыгают через кольца-волны, подыгрывают; наплясался — ролик, двери
const D=ZC.W.warp21('dance');ZC.tick(20);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}ZC.tick(10);
const r=[WALK2([0,D.K0-6],[1,D.K0-6],4)];let t=0;while(!ZC.G.cine&&t<120){ZC.tick(1);t++;}const met=D.F.kingMet;while(ZC.G.cine&&t<2000){ZC.tick(1);t++;}
r.push(WALK2([D.seats[0].x+0.3,D.seats[0].z+0.6],[D.seats[1].x-0.3,D.seats[1].z+0.6],8));U.tap('KeyR');U.tap('Semicolon');ZC.tick(10);
let fr=0;for(let i=0;i<60*70&&!D.F.kingDone;i++){if(++fr%240===0){for(const pi of[0,1]){const h=U.act(pi),s=D.seats[pi];if(Math.hypot(h.pos.x-s.x,h.pos.z-s.z)>1.8)WALK2(pi?null:[s.x+0.3,s.z+0.6],pi?[s.x-0.3,s.z+0.6]:null,3,RINGJ);}U.tap('KeyR');U.tap('Semicolon');}
  RINGJ(0,U.act(0));RINGJ(1,U.act(1));ZC.tick(1);}
if(!D.F.kingDone)throw new Error('царь не наплясался: meter='+D.KD.meter.toFixed(2)+' round='+D.KD.round+' met='+met+' '+r.join());
t=0;while(ZC.G.cine&&t<3000){ZC.tick(1);t++;}ZC.tick(60);if(D.HD.some(q=>q.col.on)||!D.F.kingOpen)throw new Error('двери не открыты после пляски');'dance ok round='+D.KD.round+' pearls='+D.KD.pearls+' nuts='+ZC.W.nuts
//@@ shot=k21_dance.png
// З2: сад залит; Потап по дну — к якорю (поднять) и к ракушке (отлив); оставляем его — держит отлив
const D=ZC.W.warp21('garden'),G=D.DG;ZC.tick(20);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}ZC.tick(10);
if(D.GARD.state!=='high')throw new Error('сад не залит');ACT(0,'potap');const r=[U.walkTo(0,8.2,-237.6+G,5),U.walkTo(0,8.2,-243+G,6),U.walkTo(0,4,-256.8+G,8)];ZC.tick(10);
U.tap('KeyE');ZC.tick(60);if(!D.F.anchor)throw new Error('якорь не поднят: '+r.join()+' '+U.act(0).pos.toArray().map(v=>v.toFixed(2)));
r.push(U.walkTo(0,0.6,-245.6+G,6));U.tap('KeyR');ZC.tick(20);if(D.GARD.state!=='low')throw new Error('отлив в саду не сыгран: '+D.GARD.state+' '+r.join());
U.tap('KeyQ');ZC.tick(5);if(!ZC.HERO.potap.kwHold)throw new Error('оставленный Потап не держит отлив');ZC.tick(150);'garden low, potap holds '+r.join()
//@@ shot=k21_garden_low.png
// Йоша: вниз по ступеням, полить оба ростка; подъём по лесенке на террасу; через 10+15 с родник снова наполнит сад
const D=ZC.W.dbg21(),G=D.DG;ACT(1,'yosha');const r=[U.walkTo(1,8.2,-237.6+G,5),U.walkTo(1,8.2,-243+G,6),U.walkTo(1,-4,-256.6+G,8)];ZC.HERO.yosha.face=Math.PI;U.tap('KeyL');ZC.tick(60);
r.push(U.walkTo(1,4,-256.6+G,6));ZC.HERO.yosha.face=Math.PI;U.tap('KeyL');ZC.tick(90);if(!D.KS[0].grown||!D.KS[1].grown)throw new Error('ростки не выросли: '+r.join()+' '+D.KS.map(s=>s.grown));
r.push(CLIMB(1,D.KS[1]));r.push(U.walkTo(1,4,-260.4+G,3));if(!(U.act(1).pos.y>4.3))throw new Error('Йоша не на террасе: '+r.join()+' '+U.act(1).pos.toArray().map(v=>v.toFixed(2)));
'yosha up '+r.join()
//@@ shot=k21_garden_up.png
// Прошка (если сад ещё в отливе) — вниз и по другой лесенке; иначе Потап снова сыграет отлив
const D=ZC.W.dbg21(),G=D.DG;const r=[];let w=0;while(D.GARD.state==='low'&&w<2400){ZC.tick(1);w++;}r.push('waited '+(w/60).toFixed(1));ACT(0,'potap');r.push(U.walkTo(0,0.6,-245.6+G,8));U.tap('KeyR');ZC.tick(20);ACT(0,'proshka');
r.push(U.walkTo(0,-8.2,-237.6+G,6),U.walkTo(0,-8.2,-243+G,6),U.walkTo(0,-4,-256.6+G,8),CLIMB(0,D.KS[0]),U.walkTo(0,-4,-260.4+G,3));
if(!(U.act(0).pos.y>4.3))throw new Error('Прошка не на террасе: '+r.join()+' '+U.act(0).pos.toArray().map(v=>v.toFixed(2))+' gard='+D.GARD.state);'proshka up '+r.join()
//@@
// З3: Рак-Отшельник. Йоша (она уже на террасе) играет на гуслях у ракушки-музыкалки, Прошка бьёт пляшущего; Пробой — Потап вытягивает из раковины
const D=ZC.W.dbg21(),B=D.HB.dbg(),G=D.DG;const r=[U.walkTo(0,-2,-265+G,5),U.walkTo(1,2,-265+G,5),WALK2([-3,-271+G],[2,-271+G],5)];let t=0;while(!ZC.G.cine&&t<200){ZC.tick(1);t++;}while(ZC.G.cine&&t<2000){ZC.tick(1);t++;}ZC.tick(20);
if(D.HB.dbg().phase!==1)throw new Error('рак не вышел: '+D.HB.dbg().phase+' '+r.join());
const bb=document.getElementById('bossbar');if(bb.style.display!=='block'||!/^<b>Рак-Отшельник<\/b> · этап 1 \/ 2 · /.test(bb.innerHTML))throw new Error('нет полосы рака, этап 1: '+bb.style.display+' '+bb.innerHTML);
for(const id of['hint0','hint1']){const h=document.getElementById(id);if(h&&h.style.display!=='none'&&/рак|гусл/i.test(h.textContent)&&h.textContent.trim().split(/\s+/).length>10)throw new Error('подсказка длиннее 10 слов: '+h.textContent);}r.push(WALK2([-4.5,-312+G],[B.LP.x+0.7,B.LP.z+0.5],5));U.tap('Semicolon');ZC.tick(10);
const LOG=[];let hits=0;for(let i=0;i<60*90&&D.HB.dbg().phase===1;i++){const e=D.HB.dbg().e;if(i%600===0)LOG.push((i/60)+':'+(e?e.state+'/'+e.dance:'-')+' '+U.act(0).kind+' '+U.act(0).pos.toArray().map(v=>v.toFixed(1))+' e='+(e?e.pos.toArray().map(v=>v.toFixed(1)):'-')+' hum='+B.LURE.hum.toFixed(1)+' p1='+U.act(1).kind+U.act(1).pos.toArray().map(v=>v.toFixed(1)));if(i%300===0){const h1=U.act(1);if(Math.hypot(h1.pos.x-B.LP.x,h1.pos.z-B.LP.z)>1.8)WALK2(null,[B.LP.x+0.7,B.LP.z+0.5],3);U.tap('Semicolon');}
  if(!e||!e.alive){ZC.tick(1);continue;}if(e.state==='broken')ACT(0,'potap');else if(U.act(0).kind==='potap'&&e.dance)ACT(0,'proshka');
  const h=U.act(0),dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z,d=Math.hypot(dx,dz),K=KEYS[0],far=d>2.6;ZC.hold(K.left,far&&dx<-0.3);ZC.hold(K.right,far&&dx>0.3);ZC.hold(K.up,far&&dz<-0.3);ZC.hold(K.down,far&&dz>0.3);
  const w=e.state==='wind'&&e.tgt===h;if(w){const left=e.wdur-e.t;if(e.sig==='red'&&left<0.2)ZC.press('ShiftLeft');else if(e.sig!=='red'&&left<0.16&&e.left===null)ZC.press('KeyG');}
  if(!far&&(e.dance||e.state==='broken')&&i%10===0){h.face=Math.atan2(dx,dz);ZC.press('KeyF');hits++;}ZC.tick(1);}
[KEYS[0].left,KEYS[0].right,KEYS[0].up,KEYS[0].down].forEach(k=>ZC.hold(k,false));
if(!(D.HB.dbg().phase>=1.5))throw new Error('рака не вытянули: phase='+D.HB.dbg().phase+' hits='+hits+' emb='+(D.HB.dbg().e&&D.HB.dbg().e.embers)+' | '+LOG.join(' | '));t=0;while(ZC.G.cine&&t<2000){ZC.tick(1);t++;}ZC.tick(10);
'phase1 ok hits='+hits+' phase='+D.HB.dbg().phase
//@@ shot=k21_hermit2.png
// этап 2: рак без домика удирает — зажимаем с двух сторон, бьём, пока замер; песок отбиваем
const D=ZC.W.dbg21();{const bb=document.getElementById('bossbar');if(bb.style.display!=='block'||!/этап 2 \/ 2 · /.test(bb.innerHTML))throw new Error('нет полосы рака, этап 2: '+bb.style.display+' '+bb.innerHTML);}let st=0;for(let i=0;i<60*90&&D.HB.dbg().phase===2;i++){const e=D.HB.dbg().e;if(!e||!e.alive){ZC.tick(1);continue;}
  for(const pi of[0,1]){const K=KEYS[pi],h=U.act(pi),sx=pi?2.3:-2.3,tx=e.pos.x+sx,tz=e.pos.z,dx=tx-h.pos.x,dz=tz-h.pos.z,far=Math.hypot(dx,dz)>0.5;
    ZC.hold(K.left,far&&dx<-0.25);ZC.hold(K.right,far&&dx>0.25);ZC.hold(K.up,far&&dz<-0.25);ZC.hold(K.down,far&&dz>0.25);
    if(ZC.W.bolts.some(b=>b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2))ZC.press(pi?'Period':'KeyG');
    if((e.dazeT>0||e.state==='broken')&&i%9===pi*4){h.face=Math.atan2(e.pos.x-h.pos.x,e.pos.z-h.pos.z);ZC.press(K.attack);}}
  if(e.dazeT>0)st++;ZC.tick(1);}
for(const K of KEYS)[K.left,K.right,K.up,K.down].forEach(k=>ZC.hold(k,false));if(D.HB.dbg().phase<3)throw new Error('рака не поймали: phase='+D.HB.dbg().phase+' stunF='+st);
let t=0;while(ZC.G.cine&&t<3000){ZC.tick(1);t++;}ZC.tick(30);if(!D.F.hermitWon||D.HB.dbg().weedCol.on)throw new Error('ворота не открыты после рака');if(document.getElementById('bossbar').style.display!=='none')throw new Error('полоса рака не скрыта после боя');'hermit friends stunF='+st
//@@ shot=k21_hermit_home.png
// ворота: звено и конец уровня
const D=ZC.W.dbg21(),G=D.DG;const r=[WALK2([-0.5,-314+G],[2,-314+G],8),WALK2([-0.5,-320.6+G],[2,-318+G],6),WALK2([-1,-327+G],[2,-327+G],5)];ZC.tick(120);
'links='+ZC.W.links+' nuts='+ZC.W.nuts+' out='+!!ZC.W.flags.out+' state='+ZC.G.state+' lvl='+ZC.W.levelId+' '+r.join()
//@@
if(!ZC.W.flags.out&&ZC.W.levelId==='2-1')throw new Error('уровень не пройден');if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-1 done errs=0'
