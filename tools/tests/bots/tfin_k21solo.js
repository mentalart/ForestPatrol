//@@ wait=1500
// релиз final06: 2-1 «Гусли Садко» — новые участки в одиночном режиме (клавиши Игрока 1, Q — по кругу Прошка → Потап → Пелагея → Йоша):
// Переливная улица — Потап стоит на заслонке сам (оставленный), Пелагея и Прошка по очереди подымают свою воду; палаты Морского царя —
// играешь и меняешь героя: оставленный доигрывает 15 с; у трона Потап подыгрывает, пока идёт Пелагея; сад Китежа — Потап по дну,
// оставленный держит отлив, Йоша растит лесенки, подъём; «Ко мне!» — и к воротам. Проверка: всё проходится одним игроком.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(true);ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
window.H=ZC.HERO;window.B0=['KeyA','KeyD','KeyW','KeyS'];window.rel=()=>B0.forEach(k=>ZC.hold(k,false));
window.me=()=>U.act(ZC.G.soloPi);window.toKind=k=>{for(let i=0;i<16&&me().kind!==k;i++){ZC.press('KeyQ');ZC.tick(i<4?4:12);}return me().kind;};
window.go=(x,z,max,extra)=>{const n=Math.round((max||8)*60);for(let i=0;i<n;i++){const h=me(),dx=x-h.pos.x,dz=z-h.pos.z;if(Math.hypot(dx,dz)<0.45){rel();ZC.tick(1);return 't='+(i/60).toFixed(2);}
    ZC.hold(B0[0],dx<-0.25);ZC.hold(B0[1],dx>0.25);ZC.hold(B0[2],dz<-0.25);ZC.hold(B0[3],dz>0.25);if(extra)extra(h,i);ZC.tick(1);}rel();ZC.tick(1);return 'TIMEOUT';};
window.waves=(h)=>{for(const w of ZC.W.dbg21().WAV){const d=h.pos.z-w.z;if(d>0.6&&d<2.2&&h.grounded&&h.pos.y<0.8){ZC.press('Space');break;}}};
window.CLIMB=(S)=>{let n=0;for(const L of S.leaves){const c=L.col;let ok=false;for(let i=0;i<240;i++){const h=me(),dx=c.x-h.pos.x,dz=c.z-h.pos.z,d=Math.hypot(dx,dz);
    ZC.hold(B0[0],dx<-0.12);ZC.hold(B0[1],dx>0.12);ZC.hold(B0[2],dz<-0.12);ZC.hold(B0[3],dz>0.12);if(h.grounded&&h.groundRef===c&&d<0.45){ok=true;break;}if(h.grounded&&c.maxy>h.pos.y+0.2&&d<1.7)ZC.press('Space');ZC.tick(1);}
  rel();ZC.tick(2);if(!ok)return 'stuck@'+n;n++;}return 'ok';};
window.callAll=()=>{U.tap('Digit1');for(let i=0;i<60*10;i++){ZC.tick(1);if(i>60&&['proshka','potap','pelageya','yosha'].every(k=>Math.hypot(H[k].pos.x-me().pos.x,H[k].pos.z-me().pos.z)<6))break;if(i%240===239)U.tap('Digit1');}};
window.SBRAWL=function(max,list){const n=Math.round((max||30)*60);const B=['KeyA','KeyD','KeyW','KeyS'];   // бой одним героем (в одиночку обе раскладки ведут одного героя — U.brawl тут мешает сам себе)
  for(let i=0;i<n;i++){const alive=(list||ZC.W.enemies).filter(e=>e.alive);if(!alive.length){B.forEach(k=>ZC.hold(k,false));return 'cleared t='+(i/60).toFixed(1);}
    const h=me();let e=null,bd=99;for(const x of alive){const d=Math.hypot(x.pos.x-h.pos.x,x.pos.z-h.pos.z);if(d<bd){bd=d;e=x;}}
    const dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z;const far=bd>1.9+e.r&&!(e.state==='wind'&&e.tgt===h);B.forEach(b=>ZC.hold(b,false));
    if(far){const inv=Math.abs(ZC.W.camYaw)>1;ZC.hold(B[0],inv?dx>0.3:dx<-0.3);ZC.hold(B[1],inv?dx<-0.3:dx>0.3);ZC.hold(B[2],inv?dz>0.3:dz<-0.3);ZC.hold(B[3],inv?dz<-0.3:dz>0.3);}
    const bo=ZC.W.bolts.find(b=>b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2);if(bo)ZC.press('KeyG');
    const w=alive.find(x=>x.state==='wind'&&x.tgt===h);if(w){const left=w.wdur-w.t;if(w.sig==='red'){if(left<0.2)ZC.press('ShiftLeft');}else if(left<0.16&&w.left===null)ZC.press('KeyG');}
    if(!far&&((e.state==='stagger'&&!e.openHit)||e.state==='broken'||e.open>0||e.dazeT>0||(e.shell&&(i%12===0)))){h.face=Math.atan2(dx,dz);if(i%9===0)ZC.press('KeyF');}
    ZC.tick(1);}
  B.forEach(k=>ZC.hold(k,false));return 'TIMEOUT alive='+(list||ZC.W.enemies).filter(e=>e.alive).map(e=>e.kind+':'+e.state+':'+e.embers).join(',');};
window.st=()=>U.st()+' errs='+_errs.length;
window.RJ=(h)=>{const D=ZC.W.dbg21();const d=Math.hypot(h.pos.x,h.pos.z-D.TZ);for(const w of D.WAV){if(w.side&&h.pos.x*w.side<0)continue;const gap=d-w.R;if(gap>0.3&&gap<1.3&&h.grounded&&h.pos.y<0.8){ZC.press('Space');break;}}};
'solo='+ZC.G.solo
//@@
// Переливная улица: Потап — на заслонку; Пелагея (справа прилив) — по мостовой к правому каналу, к террасе, верёвка (каплю щуки — щитом);
// Прошка — прилив слева, к террасе, верёвка
window.SH=h=>{if(ZC.W.bolts.some(b=>b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2))ZC.press('KeyG');};
const D=ZC.W.warp21('perel');ZC.tick(20);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}
toKind('potap');const r=[go(-10.2,-120.2,5),go(-10.2,-126,6),go(-2.8,-135,8)];ZC.tick(20);if(!D.SLU.held())throw new Error('Потап не на заслонке: '+r.join()+' '+st());
toKind('pelageya');r.push(go(3,-118.4,8,SH),go(8.3,-140,10,SH),go(8.3,-144.5,4,h=>{SH(h);if(h.grounded&&h.groundRef&&h.groundRef.water)ZC.press('Space');}),go(8.3,-149.2,4,h=>{SH(h);if(h.grounded&&h.pos.y<3.1)ZC.press('Space');}),go(5.9,-150.4,3,SH));
me().face=-Math.PI/2;U.tap('KeyF');ZC.tick(20);if(!D.ropes[1].pulled)throw new Error('Пелагея не дёрнула: '+r.join()+' '+st());
toKind('proshka');r.push(go(-9.8,-119.4,10));U.tap('KeyR');ZC.tick(160);if(D.CL.state!=='high')throw new Error('левый прилив не пошёл: '+D.CL.state+' '+st());
r.push(go(-8.3,-140,8),go(-8.3,-144.5,4,h=>{if(h.grounded&&h.groundRef&&h.groundRef.water)ZC.press('Space');}),go(-8.3,-149.2,4,h=>{if(h.grounded&&h.pos.y<3.1)ZC.press('Space');}),go(-5.9,-150.4,3));
me().face=Math.PI/2;U.tap('KeyF');ZC.tick(20);if(!D.ropes[0].pulled||!D.PG[0].open||!D.PG[1].open)throw new Error('ворота не открыты: '+r.join()+' '+st());
r.push(go(-6,-157.5,6));toKind('pelageya');r.push(go(6,-157.5,6));if(!(H.proshka.pos.z<-153&&H.pelageya.pos.z<-153))throw new Error('не спустились: '+r.join());'perel solo ok'
//@@
// Звонкая мостовая: Прошка — дзинь, дилинь, встаёт на розовый «дон» и остаётся; Потап — на зелёный «дон»: дон-дон разом
const D=ZC.W.warp21('tune');ZC.W.flags.sturg=false;ZC.tick(20);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}toKind('proshka');const r=[go(-2,-184,4)];let t=0;while(!D.F.sturg&&t<300){ZC.tick(1);t++;}ZC.tick(60*9);
const T=D.TUNE;r.push(go(T[0].x,T[0].z,6));ZC.tick(15);r.push(go(T[1].x,T[1].z,6));ZC.tick(15);r.push(go(T[2].x,T[2].z,6));ZC.tick(10);toKind('potap');r.push(go(0,-195,6),go(T[3].x,T[3].z,6));ZC.tick(30);
if(!D.TS.done)throw new Error('напев в одиночку не сложился: step='+D.TS.step+' fails='+D.TS.fails+' '+r.join()+' '+st());ZC.tick(60);const f=SBRAWL(30,D.TS.guard||[]);'tune solo ok '+r.join()+' '+f
//@@
// палаты: два стула перед троном — Прошка играет у левого и остаётся доигрывать; Потап — у правого; дальше по очереди подыгрывают, прыгая через кольца
const D=ZC.W.warp21('dance');ZC.tick(20);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}toKind('proshka');const r=[go(0,D.K0-6,4)];let t=0;while(!ZC.G.cine&&t<120){ZC.tick(1);t++;}while(ZC.G.cine&&t<2000){ZC.tick(1);t++;}
const S0=D.seats[0],S1=D.seats[1];r.push(go(S0.x+0.3,S0.z+0.6,8));U.tap('KeyR');ZC.tick(10);toKind('potap');if(!H.proshka.kwHold)throw new Error('Прошка не доигрывает: '+r.join()+' '+st());r.push(go(S1.x-0.3,S1.z+0.6,8,RJ));U.tap('KeyR');ZC.tick(10);
let k=0;for(let i=0;i<60*80&&!D.F.kingDone;i++){const h=me();if(i%240===120){const S=h.kind==='potap'?S1:S0;if(Math.hypot(h.pos.x-S.x,h.pos.z-S.z)>1.6)go(S.x+(S===S0?0.3:-0.3),S.z+0.6,3,RJ);U.tap('KeyR');}
  if(i%720===700){toKind(me().kind==='potap'?'proshka':'potap');const S=me().kind==='potap'?S1:S0;if(Math.hypot(me().pos.x-S.x,me().pos.z-S.z)>1.6)go(S.x+(S===S0?0.3:-0.3),S.z+0.6,3,RJ);U.tap('KeyR');k++;}
  RJ(me());ZC.tick(1);}
if(!D.F.kingDone)throw new Error('царь в одиночку не наплясался: meter='+D.KD.meter.toFixed(2)+' '+r.join()+' '+st());t=0;while(ZC.G.cine&&t<3000){ZC.tick(1);t++;}ZC.tick(30);if(!D.F.kingOpen)throw new Error('двери не открыты');'dance solo ok swaps='+k+' '+r.join()
//@@
// сад: Потап — якорь и отлив, оставлен; Йоша — оба ростка и наверх
const D=ZC.W.warp21('garden'),G=D.DG;ZC.tick(20);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}
toKind('potap');const r=[go(8.2,-237.6+G,5),go(8.2,-243+G,6),go(4,-256.8+G,8)];U.tap('KeyE');ZC.tick(60);if(!ZC.W.flags.anchor)throw new Error('якорь: '+r.join()+' '+st());
r.push(go(0.6,-245.6+G,6));U.tap('KeyR');ZC.tick(20);if(D.GARD.state!=='low')throw new Error('отлив не сыгран: '+st());toKind('pelageya');toKind('yosha');
r.push(go(8.2,-237.6+G,6),go(8.2,-243+G,6),go(-4,-256.6+G,8));me().face=Math.PI;U.tap('KeyE');ZC.tick(60);r.push(go(4,-256.6+G,6));me().face=Math.PI;U.tap('KeyE');ZC.tick(90);
if(!D.KS[0].grown||!D.KS[1].grown)throw new Error('ростки: '+r.join()+' '+st());r.push(CLIMB(D.KS[1]),go(4,-260.4+G,3));if(!(me().pos.y>4.3))throw new Error('Йоша не наверху: '+r.join()+' '+st());
'yosha up '+r.join()
//@@
// Рак-Отшельник в одиночку: Йоша играет у ракушки-музыкалки и остаётся доигрывать; Прошка бьёт пляшущего; Пробой — Потап тянет;
// без домика — песок отбиваем щитом в последний миг: замер — бьём
const D=ZC.W.dbg21(),G=D.DG,B=D.HB.dbg();const r=[go(0,-262+G,5),go(-3,-271+G,5)];let t=0;while(!ZC.G.cine&&t<200){ZC.tick(1);t++;}while(ZC.G.cine&&t<2000){ZC.tick(1);t++;}ZC.tick(20);
if(D.HB.dbg().phase!==1)throw new Error('рак не вышел: '+D.HB.dbg().phase+' '+r.join()+' '+st());
const lure=()=>{toKind('yosha');go(B.LP.x+0.7,B.LP.z+0.5,6);U.tap('KeyR');ZC.tick(8);toKind('proshka');if(Math.abs(me().pos.z-B.LP.z)<2.5)go(-4.5,B.LP.z-5,4);};lure();let hits=0;
for(let i=0;i<60*120&&D.HB.dbg().phase===1;i++){const e=D.HB.dbg().e;if(i%780===779)lure();if(!e||!e.alive){ZC.tick(1);continue;}
  if(e.state==='broken'&&me().kind!=='potap')toKind('potap');else if(e.state!=='broken'&&me().kind==='potap')toKind('proshka');
  const h=me(),dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z,d=Math.hypot(dx,dz),far=d>2.6;ZC.hold('KeyA',far&&dx<-0.3);ZC.hold('KeyD',far&&dx>0.3);ZC.hold('KeyW',far&&dz<-0.3);ZC.hold('KeyS',far&&dz>0.3);
  if(e.state==='wind'&&e.tgt===h){const left=e.wdur-e.t;if(e.sig==='red'&&left<0.2)ZC.press('ShiftLeft');else if(e.sig!=='red'&&left<0.16&&e.left===null)ZC.press('KeyG');}
  if(!far&&(e.dance||e.state==='broken')&&i%10===0){h.face=Math.atan2(dx,dz);ZC.press('KeyF');hits++;}ZC.tick(1);}
rel();if(!(D.HB.dbg().phase>=1.5))throw new Error('рака не вытянули в одиночку: phase='+D.HB.dbg().phase+' hits='+hits+' '+st());t=0;while(ZC.G.cine&&t<2000){ZC.tick(1);t++;}ZC.tick(10);
toKind('proshka');let st2=0;for(let i=0;i<60*120&&D.HB.dbg().phase===2;i++){const e=D.HB.dbg().e;if(!e||!e.alive){ZC.tick(1);continue;}const h=me(),dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z,d=Math.hypot(dx,dz),far=d>(e.dazeT>0?1.8:4.2);
  ZC.hold('KeyA',far&&dx<-0.3);ZC.hold('KeyD',far&&dx>0.3);ZC.hold('KeyW',far&&dz<-0.3);ZC.hold('KeyS',far&&dz>0.3);if(ZC.W.bolts.some(b=>b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2))ZC.press('KeyG');
  if(e.dazeT>0){st2++;if(!far&&i%9===0){h.face=Math.atan2(dx,dz);ZC.press('KeyF');}}if(e.state==='broken'&&d<2.4&&i%9===0){h.face=Math.atan2(dx,dz);ZC.press('KeyF');}
  if(e.dug&&i%200===0){toKind('pelageya');U.tap('KeyE');ZC.tick(2);toKind('proshka');}ZC.tick(1);}
rel();if(D.HB.dbg().phase<3)throw new Error('рака в одиночку не поймали: phase='+D.HB.dbg().phase+' stun='+st2+' '+st());t=0;while(ZC.G.cine&&t<3000){ZC.tick(1);t++;}ZC.tick(20);
if(!D.F.hermitWon)throw new Error('нет победы над раком');'hermit solo ok hits='+hits+' stun='+st2
//@@
const D=ZC.W.dbg21(),G=D.DG;const r=[];r.push(go(0,-312+G,8));callAll();r.push(go(0,-323+G,6));ZC.tick(60);callAll();r.push(go(0,-324+G,4));ZC.tick(120);let tg=0;while(ZC.W.levelId==='2-1'&&!ZC.W.flags.out&&tg<1500){ZC.tick(1);tg++;}'end '+r.join()+' lvl='+ZC.W.levelId+' out='+!!ZC.W.flags.out
//@@
if(ZC.W.levelId==='2-1'&&!ZC.W.flags.out)throw new Error('уровень не пройден: '+st());if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-1 solo done errs=0'
