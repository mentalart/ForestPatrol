//@@ wait=1500
// @timeout=2400
// релиз final06: 1-Б «Леший-Путаник» — озвучка роликов (аудит 1-Б, пункты А5, А8, З2; late_99zdb_k1b_fix.js): все ролики боя подряд без пропуска
// (вход, урок 1, «Нате вам — четыре Лешего!», урок 2, выход на хоровод, финал): у каждой строки ролика с записью звучит голос, ни одна запись 1-Б
// не обрывается новой раньше конца (время — игровое, допуск 0,3 с); пауза посреди реплики урока не гасит голос — после паузы он звучит дальше.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.V=ZC.FIN.vox;V.audio();{const B=ZC.FIN.k1b;B.tut.auto=true;B.tut2.auto=true;}ZC.players.forEach(p=>{p.path='mid';});
ZC.startFrom(ZC.LV('1-B'));ZC.G.manual=true;ZC.tick(2);'записи 1-Б раскодируются'
//@@ wait=2500
window.LOG={cines:[],starts:[]};window._lc=null;window._lv=null;
window.probe=function(){const G=ZC.G,c=G.cine;
  if(c&&c!==_lc){_lc=c;LOG.cines.push({dur:c.dur,ids:(c._says||[]).map(q=>{const e=V.find(q[2],q[3]);return e?e.id:null;}).filter(Boolean),heard:[]});}if(!c)_lc=null;
  const v=V.cur;if(v&&v!==_lv){const e=V.lines.find(q=>q.id===v);LOG.starts.push({id:v,t:G.time,dur:e?e.dur:0});if(c&&LOG.cines.length)LOG.cines[LOG.cines.length-1].heard.push(v);}_lv=v;};
window.run=(sec,cond)=>{let n=0;while(n<60*sec&&!(cond&&cond())){ZC.tick(1);probe();n++;}return n;};
run(70,()=>ZC.G.cine&&ZC.G.cine.dur===24.8&&ZC.G.cine.t>3.6);   // урок 1 (24,8 с) — после вступления «Тише, Леший спит!» (31,5 с)
window.pid=V.cur;if(!pid)throw new Error('в уроке 1 на 3,6 с голоса нет');ZC.G.state='pause';
'урок 1, пауза на реплике '+pid
//@@ wait=600
window.paused=V.cur;ZC.G.state='play';ZC.tick(1);'на паузе голос: '+(paused||'—')+', после паузы: '+V.cur
//@@ wait=600
window.after=V.cur;if(after!==pid)throw new Error('после паузы голос не продолжился: было '+pid+', стало '+after);
run(90,()=>ZC.W.flags.phase===1&&!ZC.G.cine&&!ZC.FIN.k1b.tut.on);
// этап 1 → 2: три удара по макушке сразу (Ctrl+Alt+B) — реплика «Ну всё, довольно, хватит!» и ролик перехода
ZC.W.bossNext();let q=0;while(q<60*90&&!(ZC.W.flags.phase===2&&!ZC.G.cine&&!ZC.FIN.k1b.tut2.on&&q>60*12)){ZC.tick(1);probe();q++;}
'после паузы: '+after+' · этап '+ZC.W.flags.phase+' · роликов '+LOG.cines.length
//@@
ZC.W.bossNext();let k=0;while(k<60*90&&!(ZC.FIN.k1b.s3.st==='run'&&!ZC.G.cine&&!ZC.FIN.lesson.on)){ZC.tick(1);probe();if(k%40===0){ZC.press('Space');ZC.press('KeyF');}k++;}
let g=0;while(!ZC.W.flags.won&&g<10){ZC.W.bossNext();run(4);g++;}
run(40,()=>ZC.W.levelId!=='1-B'||(ZC.W.flags.out));
const miss=[];LOG.cines.forEach((c,i)=>c.ids.forEach(id=>{if(!c.heard.includes(id))miss.push('ролик '+i+': '+id);}));
const cut=[];for(let i=1;i<LOG.starts.length;i++){const a=LOG.starts[i-1],b=LOG.starts[i];if(a.id.startsWith('1-B_')&&b.t-a.t<a.dur-0.3)cut.push(a.id+' оборван '+b.id+' через '+(b.t-a.t).toFixed(1)+' из '+a.dur);}
if(LOG.cines.length<6)throw new Error('роликов меньше шести: '+LOG.cines.length);
if(miss.length)throw new Error('не прозвучали: '+miss.join(', '));if(cut.length)throw new Error('обрывы: '+cut.join('; '));
if(window._errs.length)throw new Error('ошибки: '+window._errs[0]);
'роликов '+LOG.cines.length+' · записей '+LOG.starts.length+' · без пропусков и обрывов · ждали голос '+ZC.FIN.k1b.fix.waitT.toFixed(1)+' с · '+LOG.starts.map(s=>s.id.replace('1-B_','')).join(' ')
