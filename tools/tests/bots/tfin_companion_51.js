//@@ wait=1500
// релиз final06: напарник-бот проходит 5-1 «Сундук на дубе» за Игрока 2. Знак вещи рядом + кнопка вещи: гусли-волна на коршуна и добивание, щекотка Голове пером под усами, хрусталики залива, замки и клубок на ярусах дуба,
// обход Лиха, ключи клещами, побег в шкурах, бой без ударов (зеркальце, овечки, колыбельная), сундук и заяц. Человека (Игрок 1) играет скрипт: рогатка, щит Потапа, свет у первого хрусталика и т. д.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0])+' '+String(a[1]&&a[1].stack||a[1]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.H=ZC.HERO;window.F=()=>ZC.W.flags;window.D=()=>ZC.W.dbg51;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1)+(h.lit?'*':'');
window.RESET51=()=>{for(let t=0;t<4;t++){ZC.startFrom(ZC.LV('5-1'));ZC.G.manual=true;ZC.tick(30);if(ZC.W.levelId==='5-1')break;}for(let i=0;i<30&&ZC.G.cine;i++){ZC.skip();ZC.tick(10);}U.nocine();ZC.tick(5);CO.set(true);CO.skill=1;ZC.tick(20);window.H=ZC.HERO;window.S={sw:0,sk:0,att:0};return F().stage;};
// ---- человек (клавиши Игрока 1) ----
window.hm=(x,z,stop)=>{const h=me(),dx=x-h.pos.x,dz=z-h.pos.z,d=Math.hypot(dx,dz),go=d>stop;ZC.hold('KeyA',go&&dx<-0.25);ZC.hold('KeyD',go&&dx>0.25);ZC.hold('KeyW',go&&dz<-0.25);ZC.hold('KeyS',go&&dz>0.25);return d;};
window.hstop=()=>['KeyA','KeyD','KeyW','KeyS','KeyG'].forEach(k=>ZC.hold(k,false));
window.hwant=kind=>{if(me().kind===kind)return true;if(ZC.G.time>S.sw){S.sw=ZC.G.time+0.4;ZC.press('KeyQ');}return false;};
// ждём условие (кадров не больше max), человек в это время делает fn
window.UNTIL=(cond,max,fn)=>{for(let i=0;i<max;i++){if(ZC.G.cine&&i%3===0)ZC.skip();if(cond())return true;if(fn)fn(i);ZC.tick(1);}hstop();return false;};
// человек дерётся: ближайший живой морок; от замаха — щит / кувырок; бьёт, когда открыт
window.hdef=()=>{const h=me();let did=false;for(const e of ZC.W.enemies){if(!e.alive||e.state!=='wind'||e.tgt!==h)continue;const left=e.wdur-e.t;if(e.sig==='red'){if(left<0.2&&h.rollT<=0){ZC.press('ShiftLeft');did=true;}}else if(left<0.13&&e.left===null){ZC.press('KeyG');did=true;}}
  for(const b of ZC.W.bolts)if(b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2){ZC.press('KeyG');did=true;}return did;};
window.hfight=()=>{const h=me(),al=ZC.W.enemies.filter(e=>e.alive&&e.state!=='dying'&&e.state!=='spawn');if(!al.length)return false;if(hdef())return true;let e=al[0],bd=99;for(const x of al){const d=Math.hypot(x.pos.x-h.pos.x,x.pos.z-h.pos.z);if(d<bd){bd=d;e=x;}}
  hm(e.pos.x,e.pos.z+1.4,0.5);const open=(e.state==='stagger'&&!e.openHit)||e.state==='broken'||e.open>0||e.dazeT>0||(e.shell&&(S.sk++%12===0));
  if(bd<2.6&&open&&ZC.G.time>S.att){h.face=Math.atan2(e.pos.x-h.pos.x,e.pos.z-h.pos.z);S.att=ZC.G.time+0.42;ZC.press('KeyF');}return true;};
window.hd2=(h,x,z)=>Math.hypot(h.pos.x-x,h.pos.z-z);
window.dg=()=>{const W=ZC.W,D=W.dbg51,B=D.B;return 'stage='+W.flags.stage+' '+['proshka','potap','pelageya','yosha'].map(k=>pos(ZC.HERO[k])).join(' ')+' well='+D.well.state+'/'+D.well.t.toFixed(1)+' refl='+B.refl+' cnt='+B.count+' sleep='+B.sleep.toFixed(2)+' claw='+B.claw+' '+CO.mode;};
window.hswap=kind=>UNTIL(()=>me().kind===kind,60*5,()=>hwant(kind));
window.hwalk=(pts,stop)=>{for(const [x,z] of pts){if(!UNTIL(()=>hd2(me(),x,z)<(stop||0.6),60*25,()=>{hm(x,z,0.3);}))return 'stuck@'+x+','+z+' '+pos(me());}hstop();return 'ok';};
RESET51();
['stage='+F().stage,'bot='+pos(bot()),'me='+pos(me()),CO.mode,!!CO.routes['5-1']]
//@@
// заводь: коршун бьёт Лебедь — рогатка Прошки, волна гуслями бота; упал — бьём вместе
if(!CO.routes['5-1'])throw new Error('нет маршрута 5-1');const W=ZC.W,F2=F();
UNTIL(()=>F2.stage==='kite',60*30,()=>{hm(-3,77,0.6);});hstop();
const P=me();let shots=0;
if(!UNTIL(()=>F2.stage!=='kite',60*90,(i)=>{hm(8,71,0.8);const mk=W.marks.find(m=>m.active());if(mk&&i%36===0){P.face=Math.atan2(mk.pos.x-P.pos.x,mk.pos.z-P.pos.z);ZC.press('KeyE');shots++;}const KT=D().KT;if(KT.st==='ground'){const dx=KT.pos.x-P.pos.x,dz=KT.pos.z-P.pos.z;if(Math.hypot(dx,dz)>2.2)hm(KT.pos.x-1.6,KT.pos.z+1,0.4);else{hstop();P.face=Math.atan2(dx,dz);if(i%24===0)ZC.press('KeyF');}}}))
  throw new Error('коршун не побеждён: KT='+D().KT.st+' emb='+D().KT.emb+' bot='+pos(bot())+' '+CO.mode);
'kite ok stage='+F2.stage+' shots='+shots
//@@
// Лебедь рассказывает; дальше Голова: Потап со щитом ведёт, Йоша (бот) за его спиной, на вдохе — под усы и пером пощекотать нос; чих — Голова откатывается
const W=ZC.W,F2=F();
if(!UNTIL(()=>F2.stage==='toHead',60*60))throw new Error('нет toHead: '+F2.stage);
if(!UNTIL(()=>F2.stage==='head',60*40,()=>{hm(1,50.5,0.5);}))throw new Error('нет головы: '+F2.stage+' me='+pos(me()));hstop();
const L=[];let lm='';
if(!UNTIL(()=>F2.stage!=='head',60*70,(i)=>{if(!hwant('potap')){hstop();return;}const po=me();ZC.hold('KeyG',true);ZC.hold('KeyW',po.pos.z>39.8);ZC.hold('KeyA',po.pos.x>1.2);ZC.hold('KeyD',po.pos.x<0.8);if(CO.mode!==lm){L.push((i/60).toFixed(0)+'s '+CO.mode+' '+pos(bot()));lm=CO.mode;}}))
  throw new Error('Голова не чихнула: tick='+D().HB.tick.toFixed(2)+' ph='+D().HB.ph+' bot='+pos(bot())+' po='+pos(me())+' '+CO.mode+' '+L.slice(-4).join(' | '));
hstop();ZC.hold('KeyG',false);
UNTIL(()=>F2.stage==='toLagoon',60*60);
'head ok stage='+F2.stage+' headDone='+F2.headDone+' '+L.join(' | ')
//@@
// хрустальный залив: человек светит у первого хрусталика; бот — на островок, поворачивает средний, на тот берег, светит у третьего; потом переходит человек; белка
const W=ZC.W,F2=F();
if(!UNTIL(()=>F2.stage==='lagoon',60*60,()=>{hm(0.8,22.5,0.6);}))throw new Error('нет залива: '+F2.stage+' me='+pos(me()));hstop();
const P=me();const CR=D().CR;const L=[];let lm='';
if(!UNTIL(()=>CR.aLit,60*20,()=>{hm(3.4,19.2,0.3);if(Math.hypot(P.pos.x-3.4,P.pos.z-19.2)<0.6&&!P.lit&&ZC.G.time>S.sk){S.sk=ZC.G.time+0.8;ZC.press('KeyR');}}))throw new Error('А не горит');
// держим свет у А, пока бот не засветит В
if(!UNTIL(()=>CR.cLit,60*60,(i)=>{hm(4.2,19.4,0.3);if(!P.lit&&ZC.G.time>S.sk){S.sk=ZC.G.time+0.8;ZC.press('KeyR');}if(CO.mode!==lm){L.push((i/60).toFixed(0)+'s '+CO.mode+' '+pos(bot()));lm=CO.mode;}}))
  throw new Error('бот не засветил В: aLit='+CR.aLit+' axisNS='+CR.axisNS+' cLit='+CR.cLit+' bot='+pos(bot())+' '+CO.mode+' '+L.slice(-5).join(' | '));
// человек переходит по мосткам; бот светит у В
const PT=[[2.8,19],[2.8,17],[3,12.2],[1.8,11],[2.4,9.6],[3,5],[2.8,2.6]];let pi=0;
if(!UNTIL(()=>F2.stage!=='lagoon',60*60,()=>{const t=PT[Math.min(pi,PT.length-1)];if(Math.hypot(P.pos.x-t[0],P.pos.z-t[1])<0.6&&pi<PT.length-1)pi++;hm(t[0],t[1],0.3);}))
  throw new Error('человек не прошёл залив: me='+pos(me())+' bot='+pos(bot())+' pi='+pi);hstop();
UNTIL(()=>F2.stage==='meadow',60*60);
'lagoon ok stage='+F2.stage+' '+L.join(' | ')
//@@
// луг: хамелей и пугало (общий бой), потом дупло — ролик; ярус клубка
const W=ZC.W,F2=F();
if(!UNTIL(()=>F2.meadowClear,60*150,(i)=>{if(!hfight())hm(-2,-6,0.8);}))throw new Error('луг не очищен: '+W.enemies.filter(e=>e.alive).map(e=>e.kind+':'+e.state).join(',')+' bot='+pos(bot())+' me='+pos(me())+' '+CO.mode);hstop();
if(!UNTIL(()=>F2.hollow,60*40,()=>{hm(-6,-13,0.5);}))throw new Error('дупло не открылось: me='+pos(me()));hstop();
UNTIL(()=>F2.stage==='clew',60*60);
'meadow ok stage='+F2.stage+' petals='+ZC.players[1].petals
//@@
// ярус клубка: человек — в своё кольцо, бросает клубок к своему колышку и лезет на паутинку; бот — то же
const W=ZC.W,F2=F(),D2=D();
const hu=me();
if(!UNTIL(()=>F2.stage==='clew',60*10))throw new Error('нет clew '+F2.stage);
if(!UNTIL(()=>hd2(hu,0.4,-25.4)<0.4,60*30,()=>{hm(0.4,-25.4,0.3);}))throw new Error('человек не дошёл');hstop();
hu.face=Math.atan2(-4.4-hu.pos.x,-29.8-hu.pos.z);ZC.tick(2);ZC.press('KeyR');ZC.tick(30);
const th=W.threads.map(t=>t.owner+':'+t.string).join(',');
if(!UNTIL(()=>W.webs.length>0,60*30))throw new Error('паутинки нет: thr='+th+' bot='+pos(bot())+' '+CO.mode);
// человек лезет на паутинку
if(!UNTIL(()=>me().pos.y>2.5,60*20,()=>{const w=W.webs[0];if(hd2(me(),w.x,w.z)>0.5)hm(w.x,w.z,0.2);else{hstop();ZC.press('Space');}}))throw new Error('человек не взобрался '+pos(me()));hstop();
if(!UNTIL(()=>[ZC.HERO.pelageya,ZC.HERO.yosha].every(x=>x.pos.y>2.5),60*40))throw new Error('боты не взобрались: '+pos(ZC.HERO.pelageya)+' '+pos(ZC.HERO.yosha)+' '+CO.mode);
UNTIL(()=>D2.lk1.open,60*20);
['clew ok stage='+F2.stage,'lk1='+D2.lk1.open,'bot='+pos(bot())]
//@@
// переправа 1: человек обходит слева обоими героями; бот держит приманку и сам идёт в обход; колодец, прилив, замок гуслей
const W=ZC.W,F2=F(),D2=D();const web=()=>W.webs[0];
hswap('potap');
if(!UNTIL(()=>me().pos.y>2.5,60*20,()=>{const w=web();if(!w)return;if(hd2(me(),w.x,w.z)>0.5)hm(w.x,w.z,0.2);else{hstop();ZC.press('Space');}}))throw new Error('Потап не взобрался '+pos(me()));hstop();
const D1=[[-8.3,-33],[-8.5,-36],[-8.5,-42],[-8.5,-48],[-7,-52.5],[-6,-56]];
let r1=hwalk(D1,0.8);if(r1!=='ok')throw new Error('потап: '+r1+' '+dg());
hswap('proshka');r1=hwalk(D1,0.8);if(r1!=='ok')throw new Error('прошка: '+r1+' '+dg());
if(!UNTIL(()=>D2.well.state==='high'&&D2.well.t>=1,60*60))throw new Error('прилива нет: '+dg());
['cross1/well ok '+dg()]
//@@
// после прилива: человек — на ярус пера, замок гуслей открывает бот
const W=ZC.W,F2=F(),D2=D();
const to=[[-5,-66.2]];
let r=hwalk(to,1.2);if(r!=='ok')throw new Error('прошка к ярусу: '+r+' '+dg());
hswap('potap');r=hwalk(to,1.2);if(r!=='ok')throw new Error('потап к ярусу: '+r+' '+dg());
if(!UNTIL(()=>F2.stage==='pero',60*30))throw new Error('замок гуслей не открыт: lk2='+D2.lk2.open+' '+dg());
['well done '+dg()]
//@@
// ярус пера: человек со светом — по светомосткам слева (оба героя), замок — удар; бот — тенемостки справа; корень вниз
const W=ZC.W,F2=F(),D2=D();
const L=[[-7,-69],[-7,-75],[-7,-81],[-7,-87.5]],CR=[[-6,-90],[-3,-93],[0,-99],[0,-108],[0,-115]];
let r;
for(const k of ['proshka','potap']){hswap(k);hstop();ZC.press('KeyR');ZC.tick(5);
  r=hwalk(L,0.5);if(r!=='ok')throw new Error(k+' по светомосткам: '+r+' '+dg());
  if(!D2.lk3a.open){me().face=Math.atan2(-7-me().pos.x,-89-me().pos.z);ZC.tick(2);ZC.press('KeyF');ZC.tick(20);}}
if(!UNTIL(()=>F2.stage==='crown'||F2.stage==='cross2',60*40))throw new Error('ворота не открылись: lk3a='+D2.lk3a.open+' lk3b='+D2.lk3b.open+' '+dg());
for(const k of ['potap','proshka']){hswap(k);r=hwalk(CR,0.9);if(r!=='ok')throw new Error(k+' крона: '+r+' '+dg());}
if(!UNTIL(()=>F2.stage==='cross2',60*30))throw new Error('нет cross2: '+dg());
['pero/crown ok '+dg()]
//@@
// переправа 2: бот оставляет приманку у щели и идёт по южной кромке; человек — тем же путём
const W=ZC.W,F2=F(),D2=D();
const S=[[-1,-120],[-1,-135],[0,-145],[10,-145],[20,-144.6],[24,-141]];
let r;
for(const k of ['proshka','potap']){hswap(k);r=hwalk(S,1.0);if(r!=='ok')throw new Error(k+' южная кромка: '+r+' '+dg());}
if(!UNTIL(()=>F2.stage==='forge',60*60,()=>{}))throw new Error('нет forge: '+dg());
['cross2 ok '+dg()]
//@@
// горн: пугала — общий бой (бот и человек), потом по ключу в свою скважину
const W=ZC.W,F2=F(),D2=D();
if(!UNTIL(()=>F2.forgeClear,60*120,()=>{if(!hfight())hm(26,-124,1.0);}))throw new Error('пугала не распутаны: '+W.enemies.filter(e=>e.alive).map(e=>e.kind+':'+e.state+'@'+e.pos.x.toFixed(1)+','+e.pos.z.toFixed(1)).join(',')+' '+dg());hstop();
const keys=()=>W.hots.filter(i=>i.kind==='kluch'&&!i.gone&&!i.carrier&&!i.socket);
let did=0;
if(!UNTIL(()=>F2.stage!=='forge',60*90,(i)=>{const h=me();const car=h.carry&&!h.carry.gone?h.carry:null;
  if(!car){const k=keys().sort((a,b)=>hd2(h,a.pos.x,a.pos.z)-hd2(h,b.pos.x,b.pos.z))[0];if(!k)return;if(hd2(h,k.pos.x,k.pos.z+1.0)>0.5)hm(k.pos.x,k.pos.z+1.0,0.3);else{hstop();h.face=Math.atan2(k.pos.x-h.pos.x,k.pos.z-h.pos.z);if(i%20===0){ZC.press('KeyR');did++;}}}
  else{if(hd2(h,24.9,-131.4)>0.4)hm(24.9,-131.4,0.2);else{hstop();h.face=Math.PI;if(i%20===0)ZC.press('KeyR');}}}))throw new Error('ключи не вставлены: '+dg()+' sockets='+W.sockets.filter(q=>Math.abs(q.pos.x-25.5)<0.8).map(q=>!!q.item).join(','));
['forge ok '+dg()]
//@@
// ролики: пятая цепь, ловушка; потом побег в шкурах к корням
const W=ZC.W,F2=F(),D2=D(),H=ZC.HERO;
for(let i=0;i<30&&(ZC.G.cine||F2.stage==='chainCine'||F2.stage==='skinsCine');i++){ZC.skip();ZC.tick(10);}
if(F2.stage!=='escape')throw new Error('нет escape: '+dg());
const FA=D2.flockA,FB=D2.flockB,L=D2.likho2;let ph='A',log=[],resets=0;
const KK=['KeyA','KeyD','KeyW','KeyS'];
const steer=(tx,tz)=>{const h=me(),dx=tx-h.pos.x,dz=tz-h.pos.z;ZC.hold(KK[0],dx<-0.3);ZC.hold(KK[1],dx>0.3);ZC.hold(KK[2],dz<-0.3);ZC.hold(KK[3],dz>0.3);};
for(let i=0;i<60*90;i++){
  if(ph==='A'){steer(FA.pos.x-0.66,FA.pos.z-0.55);if(FA.k>=FA.path.length-1&&L.counting){ph='gap';log.push('gap@'+(i/60).toFixed(1));}}
  else if(ph==='gap'){steer(FB.pos.x-0.66,FB.pos.z);if(hd2(me(),FB.pos.x,FB.pos.z)<FB.r-0.5)ph='B';}
  else steer(FB.pos.x-0.55,FB.pos.z+0.5);
  if(me().pos.x>23.5&&ph!=='A'){ph='A';resets++;log.push('reset@'+(i/60).toFixed(1));}
  if(F2.stage!=='escape')break;ZC.tick(1);}
KK.forEach(k=>ZC.hold(k,false));
if(F2.stage==='escape')throw new Error('побег не закончен ph='+ph+' '+log.join(',')+' '+dg());
['escape ok resets='+resets+' '+log.join(',')+' '+dg()]
//@@
for(let i=0;i<30&&(ZC.G.cine||F().stage==='bossCine');i++){ZC.skip();ZC.tick(10);}
if(F().stage!=='boss1')throw new Error('нет boss1: '+dg());
// бой, фаза 1: Потап (человек) — в кольцо-приманку, зеркальце — у бота на линии взгляда
const W=ZC.W,F2=F(),D2=D();
hswap('potap');
let r=hwalk([[-3.5,-125.4]],0.4);if(r!=='ok')throw new Error('потап в кольцо: '+r);
let log=[],lr=-1;
if(!UNTIL(()=>F2.stage!=='boss1',60*140,(i)=>{hstop();if(D2.B.refl!==lr){lr=D2.B.refl;log.push('refl='+lr+'@'+(i/60).toFixed(0)+'s');}}))throw new Error('зеркальце не сработало: '+log.join(',')+' holder='+(D2.MR.holder&&D2.MR.holder.kind)+' tgt='+(D2.likho2.tgt&&D2.likho2.tgt.kind)+' '+dg());
['boss1 ok '+log.join(',')+' '+dg()]
//@@
// фаза 2: овечки прыгают через бревно по очереди
const W=ZC.W,F2=F(),D2=D();
for(let i=0;i<30&&(ZC.G.cine||F2.stage==='boss12');i++){ZC.skip();ZC.tick(10);}
if(F2.stage!=='boss2')throw new Error('нет boss2: '+dg());
const B=D2.B,LOGZ=D2.LOGZ;
const botH=()=>U.act(1);
window.hjump=()=>{const h=me(),north=h.pos.z>LOGZ;ZC.hold(north?'KeyW':'KeyS',true);ZC.tick(4);ZC.press('Space');ZC.tick(34);ZC.hold('KeyW',false);ZC.hold('KeyS',false);ZC.tick(40);};
let jumps=0;const t0=ZC.G.time;
if(!UNTIL(()=>F2.stage!=='boss2',60*160,(i)=>{const h=me(),side=h.pos.z>LOGZ?1:-1;hm(-5,LOGZ+side*1.3,0.3);
    if(B.lastBy&&B.lastBy.player===1&&ZC.G.time-B.lastT>0.9&&hd2(h,-5,LOGZ+side*1.3)<0.7){hstop();hjump();jumps++;}
  else if(!B.lastBy&&ZC.G.time-B.lastT>4.5&&hd2(h,-5,LOGZ+side*1.3)<0.7){hstop();hjump();jumps++;}}))throw new Error('овечки не сосчитаны: cnt='+B.count+' jumps='+jumps+' '+dg());
['boss2 ok jumps='+jumps+' '+dg()]
//@@
// фаза 3: бот — колыбельная у головы, человек — щекочет лапу пером; когда Лихо приоткрывает глаз — оба замирают
const W=ZC.W,F2=F(),D2=D(),B=D2.B;
for(let i=0;i<30&&(ZC.G.cine||F2.stage==='boss2done'||F2.stage==='boss23');i++){ZC.skip();ZC.tick(10);}
if(F2.stage!=='boss3')throw new Error('нет boss3: '+dg());
const ps=W.signs.find(s=>s.item==='pero'&&s.on&&s.on()&&s.z<-130);
if(!ps)throw new Error('нет знака щекотки');
hswap('potap');let log=[],wakes=0,lastSt='';
if(!UNTIL(()=>F2.stage==='end'||F2.stage==='chest'||F2.stage==='bossEnd',60*400,(i)=>{
  if(F2.stage==='bossWake'){hstop();return;}
  if(B.warn>0||B.peek>0){hstop();return;}
  const h=me();if(hd2(h,ps.x,ps.z)>0.6)hm(ps.x,ps.z,0.3);else{hstop();if(!h.lit&&i%30===0)ZC.press('KeyR');}
  if(F2.stage!==lastSt){if(F2.stage==='bossWake')wakes++;lastSt=F2.stage;}
  if(i%600===0)log.push('s'+B.sleep.toFixed(2)+'c'+B.claw);}))throw new Error('Лихо не уснуло: claw='+B.claw+' sleep='+B.sleep.toFixed(2)+' wakes='+wakes+' '+log.join(' ')+' '+dg());
['boss3 ok wakes='+wakes+' '+log.join(' ')+' '+dg()]
//@@
// сундук: оба бьют у крышки — «Раз-два — взяли!»
const W=ZC.W,F2=F(),D2=D();
for(let i=0;i<30&&(ZC.G.cine||F2.stage==='bossEnd'||F2.stage==='end');i++){ZC.skip();ZC.tick(10);}
if(F2.stage!=='chest')throw new Error('нет chest: '+dg());
const C=D2.CHEST_REST;hswap('proshka');
if(!UNTIL(()=>hd2(me(),C.x-1.4,C.z+1.3)<0.5,60*30,()=>{hm(C.x-1.4,C.z+1.3,0.3);}))throw new Error('человек не дошёл до сундука '+dg());hstop();
if(!UNTIL(()=>hd2(U.act(1),C.x+1.4,C.z+1.3)<0.8,60*40))throw new Error('бот не у сундука '+dg()+' '+pos(U.act(1)));
me().face=Math.atan2(C.x-me().pos.x,C.z-me().pos.z);ZC.tick(2);ZC.press('KeyF');
if(!UNTIL(()=>F2.stage==='hareCine',60*10))throw new Error('крышка не поднялась: '+dg());
['chest ok '+dg()]
//@@
// заяц выскочил; уровень доигран, ошибок в консоли нет
const F2=F();ZC.skip();ZC.tick(300);
if(window._errs.length)throw new Error('ошибки: '+window._errs.slice(0,3).join(' | '));
['end ok lv='+ZC.W.levelId]
