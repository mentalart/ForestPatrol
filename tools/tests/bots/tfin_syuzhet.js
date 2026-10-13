//@@
// @timeout=900
// Сюжетные решения после сценарного разбора (docs/43, раздел 7): лубки мира 5 — двустишиями; Пелагея читает без «Тут написано»;
// финал — бой («В бой, друзья!»), погоня — наперерез Кощею к Лукоморью, глава 11 — строка пролога «Там русский дух» (имена не пропадают
// второй раз); вставки не слипаются (4-1: «Клещи 0 / 4. Пелагея…»); Кощей говорит в 2-Б; Потап вспоминает былину при Илье (стадия 9);
// вырванная в 5-Б1 последняя страница — в ролике «Цепь» Пелагея отдаёт её Кощею.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,300));_ce.apply(console,arguments);};}
window.CHK=s=>{if(_errs.length)throw new Error(s+' — ошибки: '+_errs.slice(0,4).join(' / '));return s;};
window.HAS=t=>[...document.scripts].some(s=>s.textContent.includes(t));
window.SUBS=()=>{const e=document.getElementById('subs');return e?e.textContent:'';};
const r=[],bad=[];
const need=["Сундук на дубе на пяти цепях висит,<br>","Лихо Одноглазое не бьют — Лихо усыпляют:<br>","Быстрей ветра заяц по поляне летит —<br>","Мал, да удал — и совет его хорош!",
  "В бой, друзья! Сбейте с Кощея спесь —<br>","Летит Кощей с тетрадкой к Лукоморью. Наперерез — на Горыныче!","Кузьма-старший — отец нашего Кузьмы","Всё вместе да вместе… Посмотрим, надолго ли."];
const gone=["Тут написано","А придумал, как быть, — самый малый, ёж.","Зайца не догнать — зайца загоняют.","Сегодня мы не деремся","Унёс Кощей тетрадку с Буяна","'11 · Без имён'","Силой его не одолеть"];
need.forEach(t=>{if(!HAS(t))bad.push('нет: '+t);});gone.forEach(t=>{if(HAS(t))bad.push('осталось: '+t);});
r.push('глава 11='+ZC.FIN.k5e.NAMES[11]);if(ZC.FIN.k5e.NAMES[11]!=='11 · Там русский дух')bad.push('глава 11');
if(bad.length)throw new Error(bad.join(' | '));CHK(r.concat('ok').join(' | '))
//@@
// 4-1: задача ковки — «Клещи N / M. » и дальше текст через пробел (раньше счёт и текст слипались в документе сценариста)
ZC.startFrom(ZC.LV('4-1'));ZC.G.manual=true;ZC.tick(10);const W=ZC.W,r=[];
const ts=[0,1].map(pi=>(W.objectives[pi]||[]).map(o=>{try{return typeof o.text==='function'?o.text():o.text;}catch(e){return '';}}).find(t=>/^Клещи \d/.test(t))||'');
r.push(...ts.map(t=>t.slice(0,40)));if(!ts.every(t=>/^Клещи \d+ \/ \d+\. [А-ЯЁ]/.test(t)))throw new Error('ковка: '+r.join(' | '));CHK(r.concat('ok').join(' | '))
//@@
// 2-Б: в ролике на скале Кощей говорит (до мира 5 у него не было ни слова на уровне)
ZC.startFrom(ZC.LV('2-B'));ZC.G.manual=true;ZC.tick(10);ZC.W.warp2b('boss');let seen='';for(let i=0;i<80&&!seen;i++){ZC.sim(0.1);if(/вместе да вместе/.test(SUBS()))seen=SUBS();}
if(!seen)throw new Error('Кощей в 2-Б молчит');CHK(seen.slice(0,60)+' | ok')
//@@
// 5-Б2, стадия 9: рог — Богатырский мах, Илья «Как я говаривал, Потап?» — Потап вспоминает былину (один раз)
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.E5=ZC.FIN.k5e;window.K5=ZC.FIN.k5;const FULL=()=>{for(const pi of[0,1])ZC.players[pi].petals=3;};
const TK=n=>{for(let i=0;i<n;i++){if(ZC.G.cine&&i%3===0)ZC.skip();if(ZC.G.ui==='skaz'&&i%20===0)ZC.press('Space');FULL();ZC.tick(1);}};
ZC.setSolo(false);FULL();E5.goStage(9);ZC.G.manual=true;ZC.tick(20);for(let i=0;i<60*90&&!(E5.cur===9&&K5.fight&&!ZC.G.cine&&!ZC.G.ui);i++)TK(1);
const ES=E5.es,L9=E5.layer[9].bot;ES.hornT=99;ES.rubT=99;const Bs=L9.banners(),H=pi=>ZC.players[pi].heroes[ZC.players[pi].act];
let potap='';for(let i=0;i<60&&!potap;i++){H(0).pos.set(Bs[0].g.position.x,0.05,Bs[0].g.position.z);H(1).pos.set(Bs[1].g.position.x,0.05,Bs[1].g.position.z);if(i===0)ES.hornT=0.01;FULL();ZC.sim(0.1);if(/во славном городе во Муроме/.test(SUBS()))potap=SUBS();}
const r=['мах='+(E5.logs||[]).includes('vitCharge'),'ilyaMet='+!!ZC.W.flags.ilyaMet];if(!potap)throw new Error('Потап не вспомнил былину: '+r.join(' | '));CHK(r.concat(potap.slice(0,50),'ok').join(' | '))
//@@
// ролик «Цепь»: Пелагея вырвала в 5-Б1 последнюю страницу — отдаёт её Кощею (ремарка и листок летит к руке Кощея)
ZC.G.flags.b1page=true;ZC.W.flags.ends=ZC.W.flags.ends||[0];ZC.G.flags.names={potap:true,yosha:true,proshka:true};const K5=ZC.FIN.k5,r=[];K5.chainScene();let seen='',page=false;
for(let i=0;i<60*40&&ZC.G.cine;i++){ZC.tick(1);if(i%30===0){ZC.sim(0.02);if(/последнюю страницу/.test(SUBS()))seen=SUBS();}
  if(!page&&ZC.G.cine&&ZC.G.cine.t>30)page=ZC.W.group.children.some(o=>o.isMesh&&o.geometry&&o.geometry.parameters&&o.geometry.parameters.width===0.42&&o.geometry.parameters.height===0.56);}
r.push('ремарка='+!!seen,'листок='+page,'имя Пелагеи='+!!ZC.G.flags.names.pelageya);if(!seen||!page)throw new Error(r.join(' | '));CHK(r.concat('ok').join(' | '))
