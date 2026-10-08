//@@ wait=900
// релиз: краткие формулировки задач (late_79c_taskshort.js ← tools/playtest/task_short.py; карточка — late_79_hints.js, голос — late_79b_readaloud.js).
// Проверки: во всех уровнях таблицы короткие строки легли на свои задачи (охрана «первые 9 знаков» не сработала), ≤ 12 слов, метки кнопок подставлены;
// карточка показывает короткую строку крупно (hn-short) над полным текстом; чтение вслух читает короткую; в одиночном режиме и в паре — одно и то же.
window.ERR=[];window.addEventListener('error',e=>ERR.push(String(e.message)));{const ce=console.error;console.error=(...a)=>{ERR.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};window.F=ZC.FIN;window.TS=F.taskShort;
window.ld=id=>{if(ZC.G.state!=='play')ZC.startFrom(ZC.LV(id));else ZC.loadLevel(ZC.LV(id));ZC.G.manual=true;ZC.tick(6);for(let q=0;q<6&&ZC.G.cine;q++){ZC.skip();ZC.tick(3);}};
const ids=Object.keys(TS.table),rep=[];
for(const id of ids){ld(id);const rows=TS.table[id].length;chk(TS.applied>=rows&&TS.skipped.length===0,id+': применено '+TS.applied+' из '+rows+' строк'+(TS.skipped.length?', не легли: '+TS.skipped.join(','):''));
  for(const [idx,g,s] of TS.table[id]){const hit=[0,1].map(pi=>ZC.W.objectives[pi].find(o=>o&&o.short&&TS.guard(typeof o.text==='function'?o.text():o.text)===g)).filter(Boolean);
    if(!hit.length){chk(false,id+'#'+idx+': нет short у задачи «'+g+'»');continue;}
    for(const pi of[0,1]){const o=ZC.W.objectives[pi].find(x=>x&&x.short&&TS.guard(typeof x.text==='function'?x.text():x.text)===g);if(!o)continue;const t=o.short(pi);
      const words=t.replace(/<kbd>[\s\S]*?<\/kbd>|<span class="pb [^"]*">[\s\S]*?<\/span>/g,' ').replace(/<[^>]*>/g,' ').split(/\s+/).filter(w=>/[A-Za-zА-Яа-яЁё0-9]/.test(w)).length;
      chk(words<=12&&!/\{\w+\}/.test(t)&&/<kbd>|<span class="pb /.test(t)===/\{\w+\}/.test(s),id+'#'+idx+' p'+pi+': '+words+' слов / метки: '+t);}}
  rep.push(id+':'+TS.applied+'/'+rows);}
rep.join(' ')
//@@
// игрок 1 на 2-1 задаче 2 — карточка с короткой строкой; кнопки игроков разные
ld('2-1');const P=ZC.players,W=ZC.W;P[0].path='easy';P[1].path='easy';ZC.G.solo=false;P[0].obj=2;P[1].obj=2;ZC.sim(6);for(let i=0;i<240;i++)F.ui(1/60);
const st=F.hints.state(),html=st.html.join(' | ');chk(/hn-short/.test(html)&&/Встань у чаши фонтана/.test(html),'карточка: короткая строка: '+html.slice(0,300));
chk(/hn-head hn-short hn-rd"[^>]*>[^<]*<span class="hn-k2"/.test(html)||/hn-short hn-rd[^|]*hn-k2/.test(html),'общая карточка: кнопки обоих игроков парой «R / ;»: '+html.slice(0,260));
chk(/hn-rd/.test(html),'полный текст — тот же, что под короткой: голос читает короткую');chk(/играй прилив/i.test(html),'«Играй прилив» в карточке');
P[1].obj=3;ZC.sim(2);for(let i=0;i<240;i++)F.ui(1/60);const st2=F.hints.state();chk(st2.html[0]&&/Встань у чаши/.test(st2.html[0])&&/Прошка/.test(st2.html[1]+st2.html[2]),'у игроков разные задачи — у каждого своя карточка: '+st2.html.join(' | ').slice(0,300));
['card ok'].concat(BAD)
//@@
// чтение вслух читает короткую строку; отключение таблицы — полный текст как прежде
window.SAID=[];F.readAloud.mock=t=>SAID.push(t);F.set.readAloud=true;F.set.vox=0;delete F.set.readAloudAll;const P=ZC.players;P[0].path='easy';P[1].path='easy';
ld('2-1');P[0].obj=2;P[1].obj=2;ZC.tick(30);ZC.sim(5);for(let i=0;i<300;i++)F.ui(1/60);
chk(SAID.length>=1&&/Встань у чаши фонтана/.test(SAID.join(' '))&&!/Звено — на столбе/.test(SAID.join(' ')),'вслух — короткая строка: '+JSON.stringify(SAID));
TS.off=true;window.SAID.length=0;F.readAloud.said={};P[0].obj=1;P[1].obj=1;ZC.tick(30);P[0].obj=2;P[1].obj=2;for(let i=0;i<300;i++)F.ui(1/60);
chk(!/hn-short/.test(F.hints.state().html.join(' ')),'таблица выключена — карточки без короткой строки');TS.off=false;
BAD.length||ERR.length?'FAIL '+BAD.join(' ; ')+' errs='+ERR.slice(0,3).join(' | '):'taskshort ok'
