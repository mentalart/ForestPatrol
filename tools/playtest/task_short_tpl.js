/* ============================== РЕЛИЗ · КРАТКИЕ ФОРМУЛИРОВКИ ЗАДАЧ (≤ 12 слов, крупной строкой) ============================== */
// Создан генератором tools/playtest/task_short.py (таблица — там; здесь не править). По симулированному плейтесту (docs/31, этап 3): задачи длинные (в среднем 16,6 слова,
// 94 из 287 — длиннее 20) и озвучены не все; ребёнку 7–9 лет нужна одна мысль в строке.
//  • У задач из таблицы TSH появляется o.short(pi): карточка (late_79_hints.js) показывает её крупно, полный текст — мельче под ней; чтение вслух (late_79b) читает короткую.
//  • Кнопки в строке — метки {item} {skill} {attack} {guard} {roll} {jump} {swap} {call}: подставляются кнопки того игрока, кому показана карточка.
//  • Охрана от сдвига: запись = [номер задачи, первые 7 слов полного текста без кнопок и знаков, строка]; задача ищется по охране (сперва по номеру) у каждого игрока — у второго игрока список задач бывает другим; если текст стал другим, строка не применяется (FIN.taskShort.skipped).
/*TABLE*/
const TS_PLAIN=h=>String(h==null?'':h).replace(/<br\s*\/?>/g,' ').replace(/<kbd>[\s\S]*?<\/kbd>|<span class="pb [^"]*">[\s\S]*?<\/span>/g,' ').replace(/<[^>]*>/g,'').replace(/\s+/g,' ').trim();
const TS_GUARD=h=>TS_PLAIN(h).split(' ').map(w=>w.replace(/[^A-Za-zА-Яа-яЁё0-9]/g,'').toLowerCase()).filter(w=>w&&!/^[a-z]$/.test(w)&&w!=='пробел'&&w!=='shift'&&w!=='enter').slice(0,7).join(' ');
const TS_FILL=(s,pi)=>s.replace(/\{(\w+)\}/g,(m,a)=>BIND[0][a]?K(pi,a):m);
FIN.taskShort={table:TSH,applied:0,skipped:[],off:false,guard:TS_GUARD};
const tsText=o=>{try{return TS_GUARD(typeof o.text==='function'?o.text():o.text);}catch(e){return '';}};
function tsApply(){const L=TSH[W.levelId];FIN.taskShort.applied=0;FIN.taskShort.skipped=[];if(!L||!W.objectives)return;
  for(const [idx,g,s] of L){let hit=0;
    for(const pi of[0,1]){const list=W.objectives[pi]||[];let o=list[idx];if(!o||tsText(o)!==g)o=list.find(x=>x&&tsText(x)===g);
      if(!o||o.short)continue;o.short=q=>FIN.taskShort.off?'':TS_FILL(s,q===undefined?pi:q);hit++;}
    if(hit)FIN.taskShort.applied+=hit;else FIN.taskShort.skipped.push(W.levelId+'#'+idx);}}
{const _ll=loadLevel;loadLevel=function(i){_ll(i);try{tsApply();}catch(e){console.error('taskshort',e);}};}
