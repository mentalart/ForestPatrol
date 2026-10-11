//@@ wait=1500
// релиз final06: ИИ напарник в уроке (FIN.lesson) и на лестнице подсказок (FIN.help). Урок «Хоровода» в 1-Б: человек (Игрок 1) жмёт свою кнопку,
// когда карточка зовёт, бот (Игрок 2) — свою: «Скакалка» — прыжок, «Тяни-потяни» — удар сразу за человеком (вместе, ≤ 1,2 с). Урок не уходит
// в «Смотри — вот так!» (L.autos не растёт). Падения бота не запускают повтор урока для обоих (FIN.help.fall Игрока 2 в этом режиме молчит).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.L=ZC.FIN.lesson;window.HLP=ZC.FIN.help;
ZC.startFrom(ZC.LV('1-B'));ZC.G.manual=true;ZC.tick(60);U.nocine();ZC.tick(30);CO.set(true);window.W=ZC.W;window.K=ZC.FIN.k1b;K.les.auto=true;
W.bossNext();ZC.tick(60*3);U.nocine();ZC.tick(60*3);const ph2=W.flags.phase;W.bossNext();
// ролики этапа 3 пропускаем, урок — нет
let n=0;for(;n<60*30&&!L.on;n++){if(ZC.G.cine)ZC.skip();ZC.tick(1);}
['phase2='+ph2,'phase='+W.flags.phase,'lesson='+L.on+' after '+(n/60).toFixed(1)+'s','live='+CO.live(),'autos='+L.autos]
//@@
// урок: человек жмёт, когда шаг ждёт его кнопку; бот — сам
const kk=U.K[0],a0=L.autos,log=[];let n=0,pi=-1;
while(L.on&&n<60*60){const st=L.last.steps,c=ZC.G.cine,i=c?st.findIndex(s=>c.t>=s.t0&&c.t<s.t0+s.dur):-1,s=st[i];
  if(i!==pi){pi=i;if(s)log.push((n/60|0)+'s step'+i);}
  if(s&&s.wait&&s.okAt==null&&s.got&&!s.got[0]&&c.t>=s.t0+(s.at!=null?s.at:0.8)){s._w=(s._w||0)+1;if(s._w===40)ZC.press(s.wait.a==='jump'?kk.j:kk.a);}
  if(s&&s.wait&&s.got&&s.got[1]&&!s._b){s._b=true;log.push('bot '+s.wait.a+' +'+(s._w/60).toFixed(2)+'s');}
  if(s&&s.okAt!=null&&!s._ok){s._ok=true;log.push('step'+i+(s.auto?' AUTO':' ok'));}
  ZC.tick(1);n++;}
const ok=!L.on&&L.autos===a0&&K.les.ok;
log.concat(['t='+(n/60).toFixed(1),'autos='+(L.autos-a0),'les.ok='+!!K.les.ok,'mode='+CO.mode,ok?'lesson ok':'FAIL lesson'])
//@@
// падения бота: лестница подсказок его не учит и повтор урока не зовёт; падения человека — по-прежнему
const r=[],runs=L.runs;ZC.players[0].path=ZC.players[1].path='easy';HLP.fall(1);HLP.fall(1);ZC.tick(30);r.push('bot falls: lesson='+L.on+' runs+'+(L.runs-runs)+' falls='+HLP.falls.join(','));
HLP.miss(1,'jump');r.push('bot st='+JSON.stringify(HLP.st[1]||{}));
const okBot=!L.on&&L.runs===runs&&!HLP.st[1];
HLP.fall(0);HLP.fall(0);ZC.tick(30);const okMe=L.on||L.runs>runs;r.push('human falls: lesson='+L.on+' runs+'+(L.runs-runs));
U.nocine();ZC.tick(30);
r.push('errs='+_errs.length+(_errs[0]?' '+_errs[0]:''),okBot&&okMe&&!_errs.length?'help ok':'FAIL help');r
