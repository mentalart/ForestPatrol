//@@ wait=1500
// релиз final06: 2-3 «Невод» — новые участки в одиночном режиме (клавиши Игрока 1, Q — по кругу Прошка → Потап → Пелагея → Йоша):
// протока — Пелагея на плоту, Прошка играет течение и остаётся доигрывать, Потап прыгает на плот; у водоворота — Совиный взор,
// тайное течение с уступа, плот плывёт дальше; озеро — Потап и Йоша на камнях невода, Пелагея у восточной раковины, Прошка играет
// западное течение и остаётся, Пелагея — навстречу; ёрш пойман, рыбий суд; к Рыбе-киту — Прошка играет «Течение» и прыгает в лодку,
// рубит заросли, на отмели один щекочет все четыре уса (нижние — ударом, верхние — рогаткой), кит зевает, «Глоть!» — сразу 2-4.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(true);ZC.startFrom(ZC.LV('2-3'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(60);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
window.H=ZC.HERO;window.B0=['KeyA','KeyD','KeyW','KeyS'];window.rel=()=>B0.forEach(k=>ZC.hold(k,false));
window.me=()=>U.act(ZC.G.soloPi);window.toKind=k=>{for(let i=0;i<16&&me().kind!==k;i++){ZC.press('KeyQ');ZC.tick(i<4?4:12);}return me().kind;};
window.go=(x,z,max,extra)=>{const n=Math.round((max||8)*60);for(let i=0;i<n;i++){const h=me(),dx=x-h.pos.x,dz=z-h.pos.z;if(Math.hypot(dx,dz)<0.45){rel();ZC.tick(1);return 't='+(i/60).toFixed(2);}
    ZC.hold(B0[0],dx<-0.25);ZC.hold(B0[1],dx>0.25);ZC.hold(B0[2],dz<-0.25);ZC.hold(B0[3],dz>0.25);if(extra)extra(h,i);ZC.tick(1);}rel();ZC.tick(1);return 'TIMEOUT';};
window.jumpTo=(x,z,max)=>go(x,z,max,h=>{if(h.grounded&&Math.hypot(x-h.pos.x,z-h.pos.z)<2.2)ZC.press('Space');});
window.callAll=(near)=>{U.tap('Digit1');for(let i=0;i<60*12;i++){ZC.tick(1);if(i>60&&['proshka','potap','pelageya','yosha'].every(k=>Math.hypot(H[k].pos.x-me().pos.x,H[k].pos.z-me().pos.z)<(near||6)))return 't='+(i/60).toFixed(1);if(i%240===239)U.tap('Digit1');}return 'TIMEOUT';};
window.st=()=>U.st()+' errs='+_errs.length;
'solo='+ZC.G.solo
//@@
// протока: Пелагея на плот; Прошка — течение на юг и остаётся; Потап — на плот; у водоворота Пелагея: взор, уступ, тайное течение
const D=ZC.W.warp23('protoka');ZC.tick(20);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}toKind('pelageya');const r=[go(0.4,-37.8,6)];
toKind('proshka');r.push(go(-4.4,-34.4,6));me().face=Math.PI;U.tap('KeyR');ZC.tick(4);if(D.C1.dir!==-1)throw new Error('течение не на юг: '+D.C1.dir);toKind('potap');if(!H.proshka.kwHold)throw new Error('Прошка не доигрывает');
r.push(jumpTo(-0.4,-39,6));let t=0;while(!D.WH.met&&t<900){ZC.tick(1);t++;}if(!D.WH.met)throw new Error('плот не доплыл до водоворота: '+D.RAFT.z.toFixed(1)+' '+r.join()+' '+st());
toKind('pelageya');U.tap('KeyE');ZC.tick(20);if(!D.F.hidFound)throw new Error('тайное течение не найдено');r.push(jumpTo(2.5,-47.5,5));me().face=-Math.PI/2;U.tap('KeyR');ZC.tick(20);
if(D.WH.on)throw new Error('водоворот не распался: '+r.join()+' '+st());r.push(jumpTo(D.RAFT.x,D.RAFT.z,5));t=0;while(D.RAFT.z>-56&&t<1200){ZC.tick(1);t++;}
if(D.RAFT.z>-56)throw new Error('плот не доплыл: '+D.RAFT.z.toFixed(1)+' '+r.join());r.push(go(0,-60,6),callAll(6));'protoka solo '+r.join()
//@@
// озеро: Потап — северный камень, Йоша — южный, Пелагея — к восточной раковине; Прошка играет западное и остаётся; Пелагея — навстречу
const D=ZC.W.warp23('lake');ZC.tick(20);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}const r=[];toKind('potap');r.push(go(0,-62.9,6));toKind('yosha');r.push(go(-11,-63,6),go(-11,-83,8),go(0,-83.1,6));ZC.tick(10);
if(!D.NS.every(s=>s.hero))throw new Error('камни невода не заняты: '+r.join()+' '+st());toKind('pelageya');r.push(go(10.2,-73,12));
toKind('proshka');r.push(go(-10.2,-73,10));me().face=Math.PI/2;U.tap('KeyR');ZC.tick(4);toKind('pelageya');if(!H.proshka.kwHold)throw new Error('Прошка не доигрывает');me().face=-Math.PI/2;U.tap('KeyR');ZC.tick(4);
if(D.CW.dir!==1||D.CE.dir!==-1)throw new Error('течения не навстречу: '+D.CW.dir+'/'+D.CE.dir+' '+r.join()+' '+st());let t=0;while(!D.YR.caught&&t<900){ZC.tick(1);t++;}
if(!D.YR.caught)throw new Error('ёрш не пойман: x='+D.YR.x.toFixed(1));t=0;while(!ZC.G.cine&&t<300){ZC.tick(1);t++;}while(ZC.G.cine&&t<4000){ZC.tick(1);t++;}ZC.tick(300);'lake solo '+r.join()+' out='+!!ZC.W.flags.out
//@@
// после суда — ролик: путь к морю открыт
let t=0;while(!ZC.G.cine&&t<600){ZC.tick(1);t++;}while(ZC.G.cine&&t<4000){ZC.tick(1);t++;}ZC.tick(30);const D=ZC.W.dbg23();
if(ZC.W.flags.out)throw new Error('уровень кончился на суде');if(D.F.task!==9||D.southW.on)throw new Error('путь к морю не открыт: task='+D.F.task);'sea open solo'
//@@
// Прошка: «Течение» у ракушки на причале — и в лодку; заросли — рубить с носа
const D=ZC.W.warp23('pier');ZC.tick(20);toKind('proshka');const r=[go(-4.4,-93.6,6)];me().face=Math.PI;U.tap('KeyR');ZC.tick(4);if(D.C3.dir!==-1)throw new Error('течение не на юг: '+D.C3.dir);
r.push(jumpTo(-0.4,-99.2,6));for(let i=0;i<60*70&&D.F.task<11;i++){const kz=D.KELP.find(k=>!k.gone),h=me();
  if(!kz&&D.RAFT3.z<-130.5){if(i%120===0)r.push('shoal:'+jumpTo(0,-137,5));}else if(h.groundRef!==D.RAFT3.col){if(i%40===0)r.push('reboard:'+jumpTo(D.RAFT3.x,D.RAFT3.z,4));}
  else if(kz&&Math.abs(kz.z-h.pos.z)<4.6){h.face=Math.PI;if(i%14===0)ZC.press('KeyF');}ZC.tick(1);}
if(D.F.task<11)throw new Error('не доплыли: task='+D.F.task+' raft='+D.RAFT3.z.toFixed(1)+' '+r.slice(-5).join()+' '+st());'raft solo '+r.slice(-3).join()
//@@
// отмель: Прошка один — нижние усы ударом, верхние рогаткой (8 с на все четыре); зевок — в пасть; «Глоть!» — 2-4
const D=ZC.W.dbg23();toKind('proshka');const r=[];
for(let i=0;i<60*60&&D.F.task<12;i++){const W=D.WHI,lo=[W[0],W[1]].find(q=>q.t<=0),h=me();
  if(lo){const tx=lo.x*0.92,tz=-145.4;if(Math.hypot(h.pos.x-tx,h.pos.z-tz)>0.6){const dx=tx-h.pos.x,dz=tz-h.pos.z;ZC.hold(B0[0],dx<-0.25);ZC.hold(B0[1],dx>0.25);ZC.hold(B0[2],dz<-0.25);ZC.hold(B0[3],dz>0.25);}else{rel();if(i%10===0)ZC.press('KeyF');}}
  else{const dx=0-h.pos.x,dz=-140-h.pos.z;if(Math.hypot(dx,dz)>2.5){ZC.hold(B0[0],dx<-0.25);ZC.hold(B0[1],dx>0.25);ZC.hold(B0[2],dz<-0.25);ZC.hold(B0[3],dz>0.25);}else rel();h.face=Math.PI;if(i%20===0)ZC.press('KeyE');}ZC.tick(1);}
rel();if(D.F.task<12)throw new Error('кит не зевнул: усы='+D.WHI.map(q=>q.t.toFixed(1)).join('/')+' '+st());
for(let i=0;i<60*14&&D.F.task<13;i++){const h=me(),dx=0-h.pos.x,dz=-149-h.pos.z;ZC.hold(B0[0],dx<-0.3);ZC.hold(B0[1],dx>0.3);ZC.hold(B0[2],dz<-0.3);ZC.hold(B0[3],dz>0.3);ZC.tick(1);}rel();
if(D.F.task<13)throw new Error('не проглотил: in='+D.WK.in.size+' '+st());let t=0;while(ZC.W.levelId!=='2-4'&&t<60*12){ZC.tick(1);t++;}
if(ZC.W.levelId!=='2-4')throw new Error('после «Глоть!» не 2-4: '+ZC.W.levelId);if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'kit solo ok → '+ZC.W.levelId+' errs=0'
