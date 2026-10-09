//@@ wait=1500
// релиз final06: напарник-бот проходит 4-4 «Змиевы валы» за Игрока 2: плуг — если человек не берёт его несколько секунд, бот пашет сам (поле А — к чаше, Б — к двери), а когда плуг ведёт человек, Пелагея подсказывает Совиным взором;
// арена: от замаха — щит, болван (Йоша поливает, срывает остывшее клещами, бьёт), змеёныши на суше — общий бой, в лаве — не трогает, печник (клещами уголь из жаровни, бить, пока горит). Дверь вышибает человек — Потапом.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0])+' '+String(a[1]&&a[1].stack||a[1]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.H=ZC.HERO;window.F=()=>ZC.W.flags;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1)+(h.carry&&!h.carry.gone?'+'+h.carry.kind:'');
window.RESET44=()=>{for(let t=0;t<4;t++){ZC.startFrom(ZC.LV('4-4'));ZC.G.manual=true;ZC.tick(30);if(ZC.W.levelId==='4-4')break;}ZC.skip();ZC.tick(10);U.nocine();ZC.tick(5);CO.set(true);CO.skill=1;ZC.tick(20);window.H=ZC.HERO;return F().stage;};
// все четверо на месте (через настоящий переход стадии: плуг переезжает сам)
window.PUTALL=(z)=>{for(const k of Object.keys(H)){H[k].pos.set(k==='proshka'?-2:k==='potap'?-3:k==='pelageya'?-4:-1,0,z);H[k].vel.set(0,0,0);H[k].following=false;}};
RESET44();
['stage='+F().stage,'bot='+pos(bot()),'me='+pos(me()),CO.mode,!!CO.routes['4-4']]
//@@
// поле А: человек стоит — бот берёт плуг клещами и сам пашет от жерла через арку мостков к чаше; лава доходит, ворота отворяются
if(!CO.routes['4-4'])throw new Error('нет маршрута 4-4');RESET44();const W=ZC.W,F2=F();const L=[];let lm='';
for(let i=0;i<60*80&&!F2.bowlA;i++){ZC.tick(1);if(CO.mode!==lm){L.push((i/60).toFixed(0)+'s '+CO.mode+' '+pos(bot()));lm=CO.mode;}}
if(!F2.bowlA)throw new Error('лава не дошла до чаши А: '+pos(bot())+' '+CO.mode+' plowBy='+(W.plowBy()?W.plowBy().kind:'-')+' '+L.slice(-5).join(' | '));
'A ok plowed='+F2.plowed+' bowlA='+F2.bowlA
//@@
// поле А, пашет человек (Прошка): бот не отбирает плуг, Пелагея подсказывает Совиным взором
RESET44();const W=ZC.W,F2=F(),P=H.proshka;let owl=0;
U.walkTo(0,-3,-3.2,3);P.face=0;ZC.tick(2);U.tap('KeyR');ZC.tick(3);
if(W.plowBy()!==P)throw new Error('человек не взял плуг: '+(W.plowBy()?W.plowBy().kind:'-'));
const pts=[[-4.2,-4.5],[-5.2,-6.5],[-5.2,-9],[-3,-12],[-1.5,-15.5],[-1.2,-17.5],[2.5,-17.5],[4.5,-20],[6,-22.8],[6,-26]];
for(const p of pts){for(let i=0;i<60*6&&Math.hypot(P.pos.x-p[0],P.pos.z-p[1])>0.5;i++){U.step(0,p[0],p[1],0.4);ZC.tick(1);owl=Math.max(owl,W.owlT||0);}}
U.rel(0);ZC.tick(30);U.tap('KeyR');
for(let i=0;i<60*30&&!F2.bowlA;i++){ZC.tick(1);owl=Math.max(owl,W.owlT||0);}
if(!F2.bowlA)throw new Error('человек: лава не дошла до чаши');if(!(owl>0))throw new Error('Совиный взор не подсказан');if(W.plowBy()&&W.plowBy().player===1)throw new Error('бот отобрал плуг');
'A human ok owl='+owl.toFixed(1)
//@@
// поле Б: человек стоит — бот пашет от жерла справа через арку к двери; она раскаляется, Потап (человек) вышибает плечом
RESET44();const W=ZC.W,F2=F();F2.stage='A';F2.bowlA=true;F2.plowed=true;PUTALL(-32.5);ZC.tick(20);
if(F2.stage!=='B')throw new Error('нет стадии B: '+F2.stage);const L=[];let lm='';
for(let i=0;i<60*90&&F2.doorHeat<1;i++){ZC.tick(1);if(CO.mode!==lm){L.push((i/60).toFixed(0)+'s '+CO.mode+' '+pos(bot()));lm=CO.mode;}}
if(F2.doorHeat<1)throw new Error('дверь не раскалилась: heat='+F2.doorHeat.toFixed(2)+' '+pos(bot())+' '+CO.mode+' '+L.slice(-5).join(' | '));
const Po=H.potap;if(U.act(0)!==Po){U.tap('KeyQ');ZC.tick(3);}Po.pos.set(0,0,-55.8);Po.vel.set(0,0,0);ZC.tick(3);Po.face=Math.PI;U.tap('KeyF');ZC.tick(40);
if(!F2.doorOpen)throw new Error('Потап не вышиб дверь');
'B ok heat='+F2.doorHeat.toFixed(2)+' door='+F2.doorOpen
//@@
// арена: человек бессмертен и стоит, бот один — болван, змеёныши, печник; ни одного упавшего лепестка не нужно, достаточно победы
RESET44();const W=ZC.W,F2=F();F2.stage='B';F2.bowlA=true;F2.bowlB=true;F2.plowed=true;F2.doorOpen=true;PUTALL(-60.5);ZC.tick(20);
if(F2.stage!=='C'||!F2.fight)throw new Error('нет арены: '+F2.stage);const L=[];let lm='';
for(let i=0;i<60*150&&!F2.cleared;i++){ZC.tick(1);for(const n of['proshka','potap'])H[n].iT=99;if(CO.mode!==lm){L.push((i/60).toFixed(0)+'s '+CO.mode+' '+pos(bot()));lm=CO.mode;}}
if(!F2.cleared)throw new Error('арена не очищена: '+W.enemies.filter(e=>e.alive).map(e=>e.kind+':'+e.state+(e.hot?'H':'')).join(',')+' '+pos(bot())+' '+CO.mode+' '+L.slice(-5).join(' | '));
'arena ok pet='+ZC.players[1].petals
//@@
// финал: ролик, звено от светлячков, уровень пройден; ошибок в консоли нет
const F3=F();for(let i=0;i<60*60&&!F3.out;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(1);}
if(!F3.out)throw new Error('уровень не завершён: stage='+F3.stage+' '+pos(bot())+' '+CO.mode);if(window._errs.length)throw new Error('ошибки: '+window._errs.slice(0,3).join(' | '));
'end ok out='+F3.out
