//@@ wait=1500
// релиз final06: напарник-бот проходит 3-4 «Летучий корабль» за Игрока 2 (Пелагея-фонарщица): на пристани зажигает перо у фонаря — корабль взлетает; весь полёт стоит у фонаря с горящим пером
// (корабль не встаёт), бьёт ворон, что налетели; после посадки идёт к гнезду. Человека (Игрок 1) играет скрипт: стоит на корабле, а после посадки идёт на берег.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.F=()=>ZC.W.flags;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1)+(h.lit?'*':'');
window.RESET34=()=>{ZC.startFrom(ZC.LV('3-4'));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.tick(5);CO.set(true);CO.skill=1;ZC.tick(30);return 'pero='+ZC.W.abil.pero;};
RESET34();
['stage='+F().stage,'bot='+pos(bot()),CO.mode,!!CO.routes['3-4']]
//@@
// пристань: бот идёт к фонарю, зажигает перо — взлёт
if(!CO.routes['3-4'])throw new Error('нет маршрута 3-4');let i=0;for(;i<60*20&&!F().launched;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(1);}
if(!F().launched)throw new Error('корабль не взлетел: '+pos(bot())+' '+CO.mode+' stage='+F().stage);'launch ok after '+(i/60).toFixed(1)+'s '+pos(bot())
//@@
// полёт: человек стоит на палубе, бот держит фонарь; ущелье, порывы, вороны — корабль доходит до гнезда и садится; фонарь гаснет не дольше нескольких секунд за весь полёт
let dark=0;const L=[];for(let i=0;i<60*300&&!F().landed;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(1);if(ZC.W.shipS.z<-20&&!ZC.W.shipS.lit)dark++;}
if(!F().landed)throw new Error('корабль не сел: z='+ZC.W.shipS.z.toFixed(0)+' lit='+ZC.W.shipS.lit+' '+pos(bot())+' '+CO.mode+' stage='+F().stage);
if(dark>600)throw new Error('фонарь был погашен '+(dark/60).toFixed(1)+' с');if(!F().crowsDone)throw new Error('вороны не прогнаны');if(ZC.players[1].petals<=0)throw new Error('Пелагея без лепестков');
'flight ok dark='+(dark/60).toFixed(1)+'s crowsDone='+F().crowsDone+' bumps='+(F().bumps||0)+' petals='+ZC.players[1].petals
//@@
// посадка: бот идёт к гнезду, человек сходит на берег — уровень пройден
for(let i=0;i<60*40&&!F().out;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}if(i%30===0&&me().pos.z>-309)U.goto(0,0,-314,2);ZC.tick(1);}U.rel(0);
if(!F().out)throw new Error('уровень не пройден: бот '+pos(bot())+' человек '+pos(me())+' '+CO.mode);if(window._errs.length)throw new Error('ошибки: '+window._errs.slice(0,3).join(' | '));
'landing ok out='+F().out+' bot='+pos(bot())
