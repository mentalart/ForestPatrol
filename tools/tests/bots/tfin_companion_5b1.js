//@@ wait=1500
// релиз final06: напарник-бот проходит 5-Б1 «Кощей в тереме» (бой «выстоять») за Игрока 2: тени своих героев бьёт общим боем, во второй части носит золотые слитки клещами в горн, в третьей — стоит у Пелагеи.
// Человека (Игрок 1) играет скрипт: бессмертный и на месте (Кощея не победить — лишь выстоять; жёлудь в длинный мах и слитки — дело человека).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0])+' '+String(a[1]&&a[1].stack||a[1]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.H=ZC.HERO;window.F=()=>ZC.W.flags;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1)+(h.carry&&!h.carry.gone?'+'+(h.carry.gold?'gold':h.carry.kind):'');
window.RESET5B1=()=>{for(let t=0;t<4;t++){ZC.startFrom(ZC.LV('5-B1'));ZC.G.manual=true;ZC.tick(30);if(ZC.W.levelId==='5-B1')break;}for(let i=0;i<30&&ZC.G.cine;i++){ZC.skip();ZC.tick(10);}U.nocine();ZC.tick(5);CO.set(true);CO.skill=1;ZC.tick(20);window.H=ZC.HERO;return F().stage;};
RESET5B1();
['stage='+F().stage,'bot='+pos(bot()),'me='+pos(me()),CO.mode,!!CO.routes['5-B1'],'foes='+ZC.W.enemies.map(e=>e.kind+':'+e.pi).join(',')]
//@@
// первая часть: тени-двойники; бот держится, до второй части (75 с) доходит на ногах
if(!CO.routes['5-B1'])throw new Error('нет маршрута 5-Б1');const W=ZC.W,F2=F();const L=[];let lm='';
for(let i=0;i<60*120&&!F2.phase2;i++){for(const n of['proshka','potap'])H[n].iT=99;ZC.tick(1);if(CO.mode!==lm){L.push((i/60).toFixed(0)+'s '+CO.mode+' '+pos(bot()));lm=CO.mode;}}
if(!F2.phase2)throw new Error('нет второй части: t='+F2.t.toFixed(0)+' '+pos(bot())+' '+CO.mode);
'phase1 ok t='+F2.t.toFixed(0)+' petals='+ZC.players[1].petals+' downed='+ZC.players[1].downed
//@@
// вторая часть: слитки золота (искры не собрали) — бот носит в горн, пока нет врагов рядом
const W=ZC.W,F2=F();const L=[];let lm='';
for(let i=0;i<60*80&&!F2.phase3;i++){for(const n of['proshka','potap'])H[n].iT=99;ZC.tick(1);if(CO.mode!==lm){L.push((i/60).toFixed(0)+'s '+CO.mode+' '+pos(bot()));lm=CO.mode;}}
if(!F2.phase3)throw new Error('нет третьей части: t='+F2.t.toFixed(0));
if(!(F2.goldBack>0))throw new Error('слитки в горн не носит: goldBack='+(F2.goldBack||0)+' '+pos(bot())+' '+L.slice(-6).join(' | '));
'phase2 ok goldBack='+F2.goldBack+' cut='+(F2.cut||0)
//@@
// третья часть и финал: тетрадку забирает Кощей, уровень пройден; ошибок в консоли нет
const F3=F();for(let i=0;i<60*120&&!F3.out;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}for(const n of['proshka','potap'])H[n].iT=99;ZC.tick(1);}
if(!F3.out)throw new Error('уровень не завершён: stage='+F3.stage+' t='+F3.t.toFixed(0)+' '+CO.mode);if(window._errs.length)throw new Error('ошибки: '+window._errs.slice(0,3).join(' | '));
'end ok out='+F3.out
