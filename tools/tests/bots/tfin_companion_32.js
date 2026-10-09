//@@ wait=1500
// релиз final06: напарник-бот проходит 3-2 «Облачные пастбища» за Игрока 2 (Йоша: живая вода и перо): облака-лифты, барашки-мостик, грозовой луг, последнее облако, Пушок в нити,
// уступ с Пушком-пружинкой (человек прыгает первым), Ветер-Ветрило (от стожка к стожку), радуги 1–3 (третью выжимает человек), овчарня, Громовой Баран (три этапа) и звено. Человека (Игрок 1) играет скрипт.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.H=ZC.HERO;window.F=()=>ZC.W.flags;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1)+(h.lit?'*':'');
window.FALLS=()=>ZC.G.stats.falls||0;
window.RESET32=()=>{ZC.startFrom(ZC.LV('3-2'));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.tick(5);ZC.FIN.tut32.auto=false;CO.set(true);CO.skill=1;ZC.tick(30);window.H=ZC.HERO;return 'pero='+ZC.W.abil.pero;};
// на участок: бот и человек там, флаги пройденного (гроза прошла) — как будто дошли сами
window.WARP=where=>{ZC.FIN.warp(where);F().fight=true;F().cleared=true;ZC.tick(20);U.nocine();ZC.tick(20);};
window.RUN=(max,until,log)=>{const L=[];let last='';for(let i=0;i<60*max&&!until();i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(1);const m=CO.mode;if(m!==last||i%900===0){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}return L;};
RESET32();
['pero='+ZC.W.abil.pero,'stage='+F().stage,'bot='+pos(bot()),CO.mode,!!CO.routes['3-2']]
//@@
// от входа до Пушка: бот один (человек стоит), поливает облака и поднимается, перо на холмике — барашки мостиком, грозовой луг (перо горит), последнее облако, два пера — нить тает; ни одного падения
if(!CO.routes['3-2'])throw new Error('нет маршрута 3-2');const f0=FALLS();const L=RUN(200,()=>F().lambFree);
if(!F().lambFree)throw new Error('Пушок не освобождён: '+pos(bot())+' '+CO.mode+' '+L.slice(-8).join(' | '));if(FALLS()-f0)throw new Error('падения: '+(FALLS()-f0)+' '+L.join(' | '));
'start→lamb ok '+pos(bot())+' falls=0'
//@@
// уступ 4,2 м: человек (Потап) внизу — бот поливает Пушка и ждёт, пока он прыгнет первым; потом прыгает сам. Оба наверху, без падений
RESET32();WARP('cliff');U.toKind('potap',0);const P=H.potap,LB=ZC.W.lamb32;P.pos.set(-1.5,15,-118);P.vel.set(0,0,0);ZC.tick(10);const f0=FALLS();let jumped=0;
for(let i=0;i<60*70&&!(bot().pos.y>18.5&&bot().pos.z<-128.5&&P.pos.y>18.5);i++){ZC.tick(1);
  if(P.pos.y<17){if(LB.puffT>3){const d=Math.hypot(P.pos.x-LB.pos.x,P.pos.z-LB.pos.z);if(d>0.6)U.step(0,LB.pos.x,LB.pos.z,0.3);else{U.rel(0);if(P.grounded){ZC.press('Space');jumped++;}}}else U.rel(0);}
  if(!P.grounded&&P.pos.y>15.4&&P.pos.y<19)U.step(0,0,-134,0.3);else if(P.pos.y>=18.5)U.rel(0);}
U.rel(0);if(!(bot().pos.y>18.5&&P.pos.y>18.5))throw new Error('не оба наверху: бот '+pos(bot())+' Потап '+pos(P)+' puff='+LB.puffT.toFixed(1)+' прыжков='+jumped+' '+CO.mode);if(FALLS()-f0)throw new Error('падения: '+(FALLS()-f0));
'ledge ok bot '+pos(bot())+' potap '+pos(P)+' jumps='+jumped
//@@
// Ветер-Ветрило и радуги: бот один идёт от стожка к стожку между порывами (перо не гаснет, мостки держат), радуги 1 и 2 — сам; у третьей ждёт, человек (Потап) выжимает тучку — бот переходит
RESET32();WARP('wind');const f0=FALLS();let sq=0;const L=[];let last='';
for(let i=0;i<60*140&&bot().pos.z>-257;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(1);
  if(!sq&&CO.mode==='route:rain3'&&hdist()<1.2&&i>60*5){sq=i;U.toKind('potap',0);const P=H.potap;P.pos.set(-1.0,19.2,-241.0);P.vel.set(0,0,0);ZC.tick(10);ZC.press('KeyE');L.push('squeeze '+pos(P));}
  if(CO.mode!==last){L.push((i/60).toFixed(0)+'s '+CO.mode+' '+pos(bot()));last=CO.mode;}}
function hdist(){const R=ZC.W.rains.find(q=>q.name==='r3');return Math.hypot(bot().pos.x-0.3,bot().pos.z+240.6);}
if(bot().pos.z>-257)throw new Error('бот не прошёл радуги: '+pos(bot())+' '+L.join(' | '));if(!sq)throw new Error('бот не дошёл до третьей радуги '+L.join(' | '));if(FALLS()-f0)throw new Error('падения: '+(FALLS()-f0)+' '+L.join(' | '));
'wind+rainbows ok '+pos(bot())+' falls=0'
//@@
// овчарня: девять барашков бегут к свету пера — бот ведёт кучки в кошару, ролик Ветра, лестница на вершину, Баран просыпается
RESET32();WARP('pen');const f0=FALLS();const L=RUN(160,()=>F().boss);
if(!F().boss)throw new Error('не дошёл до Барана: pen='+(F().penCount||0)+'/9 '+pos(bot())+' '+L.slice(-8).join(' | '));if(!F().penned)throw new Error('не все в кошаре');if(FALLS()-f0)throw new Error('падения: '+(FALLS()-f0));
'pen ok count='+F().penCount+' boss='+F().boss
//@@
// Громовой Баран: бот один (человек стоит у входа) — этап 1 (стожок и свет), этап 2 (радуга на тучу, кольцо топота), этап 3 (подвести Пушка), звено; Йоша жива
RESET32();WARP('boss');const f0=FALLS();let ph=[];let last=-1;
for(let i=0;i<60*240&&!F().out;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(1);const B=ZC.W.ram32;if(B&&B.phase!==last){ph.push((i/60).toFixed(0)+'s ph'+B.phase);last=B.phase;}}
if(!F().won)throw new Error('Баран не побеждён: '+ph.join(' ')+' '+pos(bot())+' '+CO.mode);if(!F().out)throw new Error('звено не взято: '+pos(bot())+' '+CO.mode);if(FALLS()-f0)throw new Error('падения: '+(FALLS()-f0));
if(window._errs.length)throw new Error('ошибки: '+window._errs.slice(0,3).join(' | '));
'boss ok '+ph.join(' ')+' out='+F().out+' petals='+ZC.players[1].petals
