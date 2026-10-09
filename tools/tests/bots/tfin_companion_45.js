//@@ wait=1500
// релиз final06: напарник-бот проходит 4-5 «Калинов мост» за Игрока 2: стройка (горячую доску клещами из горна на край моста, Йоша срастает стык), переход по второй половине (стык — мёртвой водой с края, пролёт — прыжком на плиту посадки,
// потом Пелагея по готовому; прогоревший стык срастает снова) и бег Потапа (Йоша срастает треснувшие доски перед ним). Человека (Игрок 1) играет скрипт: Прошка сбивает крюки и крутит ворот по цепи, Потап встаёт на лапу и держит мост.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0])+' '+String(a[1]&&a[1].stack||a[1]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.H=ZC.HERO;window.F=()=>ZC.W.flags;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1)+(h.carry&&!h.carry.gone?'+'+h.carry.kind:'');
window.FALLS=()=>ZC.G.stats.falls||0;
window.RESET45=()=>{for(let t=0;t<4;t++){ZC.startFrom(ZC.LV('4-5'));ZC.G.manual=true;ZC.tick(30);if(ZC.W.levelId==='4-5')break;}ZC.skip();ZC.tick(10);U.nocine();ZC.tick(5);CO.set(true);CO.skill=1;ZC.tick(20);window.H=ZC.HERO;return F().stage;};
// человек за Потапа: стик против качания, щит на синюю каплю, упереться на красную дрожь (как t45)
window.HOLD=()=>{const HD=ZC.W.HD;ZC.hold('KeyD',HD.sway>0.08);ZC.hold('KeyA',HD.sway<-0.08);ZC.hold('KeyG',HD.drops.some(d=>d.t>d.dur-0.3));if(HD.trem&&HD.trem.t>HD.trem.dur-0.45&&!HD.trem.pr){HD.trem.pr=true;ZC.press('ShiftLeft');}};
window.HOLDOFF=()=>{ZC.hold('KeyD',false);ZC.hold('KeyA',false);ZC.hold('KeyG',false);};
RESET45();
['stage='+F().stage,'bot='+pos(bot()),'me='+pos(me()),CO.mode,!!CO.routes['4-5']]
//@@
// стройка: Прошка сбивает крюки (жёлуди), дальше человек стоит, а бот один носит калёные доски на край и срастает стыки до полумоста
if(!CO.routes['4-5'])throw new Error('нет маршрута 4-5');const W=ZC.W,F2=F(),P=H.proshka;
U.walkTo(0,-1.2,-5.5,3);P.face=Math.PI;ZC.tick(2);U.tap('KeyE');ZC.tick(40);P.face=Math.PI;U.tap('KeyE');ZC.tick(60);
if(!F2.chains)throw new Error('крюки не сбиты');const L=[];let lm='';
for(let i=0;i<60*240&&!F2.half;i++){ZC.tick(1);if(CO.mode!==lm){L.push((i/60).toFixed(0)+'s '+CO.mode+' '+pos(bot()));lm=CO.mode;}}
if(!F2.half)throw new Error('полмоста не построено: '+W.SLOTS.map(q=>(q.placed?'P':'-')+(q.fused?'F':'')).join('')+' '+pos(bot())+' '+CO.mode+' '+L.slice(-5).join(' | '));
'build ok slots='+W.SLOTS.map(q=>(q.placed?'P':'-')+(q.fused?'F':'')).join('')+' stage='+F2.stage
//@@
// цепь и ворот (Прошка), Кикимора, Потап на лапу — бот ждёт
const W=ZC.W,F2=F(),P=H.proshka;
ZC.tick(120);U.path(0,[[0,-30.6],[1.4,-31.6],[1.4,-52.8],[2.4,-54]],4);U.tap('KeyR');ZC.tick(30);
if(!F2.winch)throw new Error('ворот не провернут: '+F2.stage+' '+pos(P));for(let i=0;i<60*40&&ZC.G.cine;i++){ZC.tick(1);if(i%60===59)ZC.skip();}ZC.tick(5);
if(F2.stage!=='kiki')throw new Error('нет стадии kiki: '+F2.stage);
U.walkTo(0,0,-31,4);U.tap('KeyE');ZC.tick(30);for(let i=0;i<60*40&&ZC.G.cine;i++){ZC.tick(1);if(i%60===59)ZC.skip();}ZC.tick(5);
if(F2.stage!=='hold')throw new Error('нет стадии hold: '+F2.stage+' act='+U.act(0).kind);
'hold started act='+U.act(0).kind+','+U.act(1).kind+' bot='+pos(bot())
//@@
// переход: человек держит мост (Потап), бот — Йоша стыки поливает с края, пролёты перепрыгивает на плиту, затем Пелагея идёт по готовому; оба на том берегу, мост держится сорок секунд
const W=ZC.W,F2=F(),Y=H.yosha,Pe=H.pelageya,HD=W.HD;const f0=FALLS();const L=[];let lm='';
for(let i=0;i<60*120&&F2.stage==='hold';i++){HOLD();ZC.tick(1);if(CO.mode!==lm){L.push((i/60).toFixed(0)+'s '+CO.mode+' '+pos(bot()));lm=CO.mode;}
  if(i%120===0)L.push('  '+(i/60).toFixed(0)+' Y='+pos(Y)+' Pe='+pos(Pe)+' '+W.SEC.map(S=>S.ok?'+':'-').join('')+' sp='+HD.spirit.toFixed(2)+' t='+HD.t.toFixed(0));}
HOLDOFF();
if(F2.stage==='hold')throw new Error('не перешли: Y='+pos(Y)+' Pe='+pos(Pe)+' '+W.SEC.map(S=>S.ok?'+':'-').join('')+' '+CO.mode+' '+L.slice(-6).join(' | '));
'cross ok stage='+F2.stage+' falls='+(FALLS()-f0)+' spirit='+HD.spirit.toFixed(2)+' '+L.slice(-4).join(' | ')
//@@
// бег Потапа: мост рушится за спиной, две доски впереди треснули — Йоша срастает их от дальнего берега к Потапу; Потап (человек) бежит сразу
const W=ZC.W,F2=F(),Y=H.yosha,Po=H.potap;const L=['cracked='+W.SEC.map(S=>S.ok?'+':'-').join('')];let lm='',fx='';const f0=FALLS();
for(let i=0;i<60*60&&F2.stage==='run';i++){U.step(0,0,-50,0.3);ZC.tick(1);if(CO.mode!==lm){L.push((i/60).toFixed(0)+'s '+CO.mode+' '+pos(bot()));lm=CO.mode;}
  const s=W.SEC.map(S=>S.ok?'+':S.gone?'x':'-').join('');if(s!==fx){fx=s;L.push((i/60).toFixed(1)+' '+s+' Po='+pos(Po)+' Y='+pos(Y));}}
U.rel(0);
if(F2.stage==='run')throw new Error('Потап не добежал: Po='+pos(Po)+' Y='+pos(Y)+' '+W.SEC.map(S=>S.ok?'+':S.gone?'x':'-').join('')+' '+CO.mode+' '+L.slice(-6).join(' | '));
'run ok stage='+F2.stage+' falls='+(FALLS()-f0)+' '+L.slice(-5).join(' | ')
//@@
// финал: лоза, ролик, уровень пройден; ошибок в консоли нет
const F3=F();for(let i=0;i<60*80&&!F3.out;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(1);}
if(!F3.out)throw new Error('уровень не завершён: stage='+F3.stage+' '+pos(bot())+' '+CO.mode);if(window._errs.length)throw new Error('ошибки: '+window._errs.slice(0,3).join(' | '));
'end ok out='+F3.out
