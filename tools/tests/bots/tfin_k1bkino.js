//@@ wait=1500
// @timeout=1800
// релиз final06: 1-Б «Леший-Путаник» — ролики по аудиту (late_99zdf_k1b_kino.js, late_99zce_k1b_tut2.js; А9, Б1–Б4): во входе нет строки «Леший ростом с ель…»,
// урок 1 начинается сразу с показа (≈ 3 с, без строки «Ну-ка, поглядим…»), урок 2 — по новым правилам (взор → следы, ложный рвёт струну, второй бросок),
// хоровод без ролика-урока: подсказки голосом по ходу, учебный первый виток; финал длиннее — Леший разводит ёлки. Все ролики целиком, ошибок нет.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
{const B=ZC.FIN.k1b;B.tut.auto=true;B.tut2.auto=true;}ZC.players.forEach(p=>{p.path='mid';});ZC.startFrom(ZC.LV('1-B'));ZC.G.manual=true;ZC.tick(2);
window.K=ZC.FIN.k1b;window.CS=[];window._lc=null;
window.probe=()=>{const c=ZC.G.cine;if(c&&c!==_lc){_lc=c;CS.push({dur:c.dur,t0:c.t,says:(c._says||[]).map(q=>String(q[3]).replace(/<[^>]*>/g,'')),def:c});}if(!c)_lc=null;};
window.run=(sec,cond)=>{let n=0;while(n<60*sec&&!(cond&&cond())){ZC.tick(1);probe();n++;}return n;};
window.need=(c,m)=>{if(!c)throw new Error('tfin_k1bkino: '+m+' | роликов '+CS.length+' '+CS.map(x=>x.dur+':'+x.says.length).join(' '));};
run(60,()=>ZC.W.flags.phase===1&&!ZC.G.cine&&!K.tut.on&&CS.length>=2);
need(CS.length>=2,'вход и урок');const I=CS[0],T=CS[1];
need(!I.says.some(s=>/ростом с ель/.test(s)),'во входе нет «Леший ростом с ель»');need(T.dur===24.8&&!T.says.some(s=>/поглядим, как вы/.test(s)),'урок без «Ну-ка, поглядим…»');
'вход: '+I.says.length+' строки · урок: начало '+T.t0.toFixed(2)+' с, строк '+T.says.length
//@@
ZC.W.bossNext();run(90,()=>ZC.W.flags.phase===2&&!ZC.G.cine&&!K.tut2.on&&CS.length>=4);
const T2=CS[3];need(T2&&T2.dur===25,'урок 2');need(T2.says.some(s=>/Совиный взор покажет следы/.test(s))&&T2.says.some(s=>/Двойник порвёт струну/.test(s))&&T2.says.some(s=>/Струну — перед настоящим/.test(s)),'урок 2 — по новым правилам');
'урок 2: '+T2.says.join(' / ')
//@@
ZC.W.bossNext();let k=0;while(k<60*30&&!(K.s3.st==='run'&&!ZC.G.cine)){ZC.tick(1);probe();k++;}
need(K.s3.st==='run'&&!ZC.FIN.lesson.on,'хоровод начался без ролика-урока');run(4);need(K.kino.hint.start===1,'подсказка голосом в начале хоровода');
const n0=CS.length;let g=0;while(!ZC.W.flags.won&&g<10){ZC.W.bossNext();run(4);g++;}run(40,()=>CS.length>n0&&!ZC.G.cine);
const E=CS.find(c=>c.says.some(s=>/путь укажу/.test(s)));need(E&&E.dur>=20,'финал длиннее — Леший показывает дорогу ('+(E&&E.dur)+')');
if(window._errs.length)throw new Error('ошибки: '+window._errs[0]);
'хоровод: подсказки '+JSON.stringify(K.kino.hint)+' · финал '+E.dur.toFixed(1)+' с · роликов '+CS.length
