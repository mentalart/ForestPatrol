//@@ wait=1500
// релиз final06 · 1-5 «Кикиморина прялка», мотовило-противовес — случаи, на которых оно раньше вставало:
//   A) с напарником-ботом, человек — Прошкой (вес 1 против Пелагеи 1, «поровну»): бот через 2,5 с бьёт мешок шерсти на площадку человека,
//      человек тяжелее — бот едет вверх, заводит мотовило клубком — человек поднимается; второй герой бота (Йоша, ведомый) веса не добавляет;
//   B) с напарником, человек — Потапом и прыгает на площадке: площадка не дёргается, бот наверху на защёлке;
//   C) в одиночку: Пелагея на правой площадке, Потап — на левую, смена на Пелагею — на полати, клубок на мотовило — Потап наверху.
// @timeout=900
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=777;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.F=()=>ZC.W.flags;window.K15=()=>ZC.W.k15;window.me=()=>U.act(0);window.bot=()=>U.act(1);
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(2)+','+h.pos.z.toFixed(1);
window.LY=()=>K15().PL.map(P=>P.y.toFixed(2)+'('+K15().weightOn(P)+')').join('/');
window.noFoes=()=>{const K=K15();K.aFoes.started=true;K.aFoes.list.forEach(e=>{e.alive=false;if(e.g)e.g.visible=false;});};
// встать на площадку P (на 0,9 м — запрыгнуть)
window.onPlat=(pi,P,max)=>{for(let i=0;i<(max||8)*60;i++){if(U.hero(pi).groundRef===P.col){U.rel(pi);return 'on t='+(i/60).toFixed(1);}
  U.step(pi,P.cx,33,0.4,q=>q.grounded&&Math.hypot(q.pos.x-P.cx,q.pos.z-33)<2.4&&q.pos.y<P.y-0.3);ZC.tick(1);}U.rel(pi);return 'TIMEOUT '+pos(U.hero(pi));};
ZC.FIN.co.set(false);ZC.setSolo(false);ZC.startFrom(ZC.LV('1-5'));ZC.G.manual=true;ZC.tick(30);ZC.FIN.co.set(true);ZC.FIN.co.skill=1;U.nocine();ZC.tick(20);noFoes();ZC.tick(30);
['stage='+F().stage,U.st(),U.obj(),'errs='+_errs.length]
//@@ shot=k15lift_eq.png
// A: человек — Прошкой на левую площадку; бот — на правую; поровну → мешок → бот вверх
const K=K15(),r=[];r.push('me='+me().kind);r.push('me '+onPlat(0,K.PL[0]));
r.push('bot on '+U.until(()=>bot().groundRef===K.PL[1].col,20),pos(bot()),'lift '+LY());
ZC.tick(60);r.push('eq='+K.LIFT.eq,'yosha='+pos(ZC.HERO.yosha)+(ZC.HERO.yosha.following?'f':''),'lift '+LY());
r.push('sack '+U.until(()=>K.SACK.on===0&&!K.SACK.fly,25),'sack.on='+K.SACK.on,'mode='+ZC.FIN.co.mode);
r.push('bot up '+U.until(()=>bot().pos.y>4.3,25),'lift '+LY(),pos(bot()));
r.push(K.SACK.on===0&&bot().pos.y>4.3?'sack ok':'FAIL sack');r
//@@
// бот сходит на полати и клубком заводит мотовило — человек (Прошка + мешок) едет вверх
const K=K15(),r=[];r.push('wound '+U.until(()=>F().wound,25),'me up '+U.until(()=>me().pos.y>4.3,20),'lift '+LY());
r.push('latch='+K.LIFT.latch,'off '+U.goto(0,K.PL[0].cx,30.2,6,0.4));ZC.tick(40);
r.push('liftDone='+!!F().liftDone,U.obj(),'errs='+_errs.length);r.push(F().liftDone&&!_errs.length?'A ok':'FAIL A');r
//@@ wait=300
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=778;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.F=()=>ZC.W.flags;window.K15=()=>ZC.W.k15;window.me=()=>U.act(0);window.bot=()=>U.act(1);
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(2)+','+h.pos.z.toFixed(1);
window.LY=()=>K15().PL.map(P=>P.y.toFixed(2)+'('+K15().weightOn(P)+')').join('/');
window.noFoes=()=>{const K=K15();K.aFoes.started=true;K.aFoes.list.forEach(e=>{e.alive=false;if(e.g)e.g.visible=false;});};
window.onPlat=(pi,P,max)=>{for(let i=0;i<(max||8)*60;i++){if(U.hero(pi).groundRef===P.col){U.rel(pi);return 'on t='+(i/60).toFixed(1);}
  U.step(pi,P.cx,33,0.4,q=>q.grounded&&Math.hypot(q.pos.x-P.cx,q.pos.z-33)<2.4&&q.pos.y<P.y-0.3);ZC.tick(1);}U.rel(pi);return 'TIMEOUT '+pos(U.hero(pi));};
ZC.FIN.co.set(false);ZC.setSolo(false);ZC.startFrom(ZC.LV('1-5'));ZC.G.manual=true;ZC.tick(30);ZC.FIN.co.set(true);ZC.FIN.co.skill=1;U.nocine();ZC.tick(20);noFoes();ZC.tick(30);
// B: человек — Потапом; бот встаёт первым, Потап — на левую; Потап прыгает на площадке, пока бот едет
const K=K15(),r=[];r.push(U.toKind('potap',0));r.push('bot on '+U.until(()=>K.PL.some(P=>bot().groundRef===P.col),20));
const mine=K.PL.find(P=>bot().groundRef!==P.col);r.push('me '+onPlat(0,mine));
let jumps=0,dips=0,prev=null,top=0;const oth=K.PL.find(P=>P!==mine);
for(let i=0;i<300;i++){if(i%40===0&&me().grounded){ZC.press('Space');jumps++;}ZC.tick(1);const b=bot();if(b.groundRef===oth.col){if(prev!==null&&b.pos.y<prev-0.02)dips++;prev=b.pos.y;top=Math.max(top,b.pos.y);}}
r.push('jumps='+jumps,'lift '+LY(),pos(bot()),'top='+top.toFixed(2));
r.push(dips===0&&top>4.3?'B ok':'FAIL B dips='+dips+' top='+top.toFixed(2));r
//@@
const r=[];r.push('off '+U.goto(0,me().pos.x,30.2,6,0.4));r.push('liftDone '+U.until(()=>F().liftDone,40),'lift '+LY(),U.st(),'errs='+_errs.length);r.push(F().liftDone&&!_errs.length?'B done ok':'FAIL B done');r
//@@ wait=300
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.F=()=>ZC.W.flags;window.K15=()=>ZC.W.k15;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(2)+','+h.pos.z.toFixed(1);
window.LY=()=>K15().PL.map(P=>P.y.toFixed(2)+'('+K15().weightOn(P)+')').join('/');
window.noFoes=()=>{const K=K15();K.aFoes.started=true;K.aFoes.list.forEach(e=>{e.alive=false;if(e.g)e.g.visible=false;});};
window.onPlat=(pi,P,max)=>{for(let i=0;i<(max||8)*60;i++){if(U.hero(pi).groundRef===P.col){U.rel(pi);return 'on t='+(i/60).toFixed(1);}
  U.step(pi,P.cx,33,0.4,q=>q.grounded&&Math.hypot(q.pos.x-P.cx,q.pos.z-33)<2.4&&q.pos.y<P.y-0.3);ZC.tick(1);}U.rel(pi);return 'TIMEOUT '+pos(U.hero(pi));};
ZC.FIN.co.set(false);ZC.setSolo(true);ZC.startFrom(ZC.LV('1-5'));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.tick(20);noFoes();ZC.tick(30);
// C: одиночка
const K=K15(),r=[];r.push(U.toKind('pelageya'),onPlat(0,K.PL[1]));r.push(U.toKind('potap'),onPlat(0,K.PL[0]));
r.push('up '+U.until(()=>K.PL[1].y>4.3,8),'lift '+LY());r.push(U.toKind('pelageya'),'polati '+U.goto(0,6,30.2,6,0.4),U.goto(0,1.4,29.6,6,0.4));
U.me().face=-Math.PI/2;ZC.press('KeyR');ZC.tick(2);r.push('wound='+!!F().wound,'potap up '+U.until(()=>K.PL[0].y>4.3,8),'lift '+LY());
ZC.tick(30);r.push('liftDone='+!!F().liftDone,U.st(),'errs='+_errs.length);r.push(F().liftDone&&K.PL[0].y>4.3&&!_errs.length?'C ok':'FAIL C');r
