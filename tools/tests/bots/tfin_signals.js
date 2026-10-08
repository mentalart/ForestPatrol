// релиз final06: словарь сигналов боссов (late_78_signals.js, docs/33 п. 3) и линтер цветов телеграфов (docs/34 X-6, задача F-1).
// Что проверяет: (1) FIN.signals совпадает с таблицей стандарта; (2) таблицы цветов помощников (K1COL, K2COL, K3FX.COL) — имя цвета = оттенок словаря;
// (3) в вызовах телеграфов (tele/sector/teleObj/sectorObj/lane/wave) и цветах заливки скакалки нет «золотого» опасности, нет цветов вне словаря
// (фиолетовый, зелёный, розовый; только вызовы помощников `.tele/.wave/…` — локальные функции вроде `wave()` 5-Б1 (победный порыв Соловья) не в счёте), а у волны (форма «волна» в словаре — только «прыжок», белая) нет синего. Бот читает исходник страницы.
// Старые нарушения зафиксированы списком-эталоном ниже («храповик»): бот падает только на НОВЫЕ. Уровни не перекрашены — решение по цветам владельца
// ещё не принято; когда B1-b / B3-a уберут нарушение, строку из списка нужно удалить (бот напомнит: «эталон можно сократить»).
const BASELINE={
  // ключ: правило | помощник | цвет  → сколько вызовов сегодня
  'золото-опасность|hex|gold':1,      // 1-Б, late_99y_k1b_fx.js:97 — сектор скакалки залит золотым 0xffc83a (должен быть цвет «прыжка»: белая полоса поперёк; задача B1-b)
  'золото-опасность|wave|gold':1,     // 3-Б, late_99v_k3b.js:147 — волна «big» (ringStrike и др.) золотая (задача B3-a)
  'вне-словаря|wave|purple':1,        // 3-Б, late_99v_k3b.js:147 — «тёмная» волна фиолетовая (задача B3-a)
  'волна-не-белая|wave|blue':1        // 3-Б, late_99v_k3b.js:147 — синяя волна «встань в тень Потапа»: в словаре это купол, не волна (задача B3-a)
  // Не ловится построчно (смысл, не цвет), помнить для B3-a: красные «дорожки» змея late_99v_k3b.js:341,358 значат «прыгай», а красный = кувырок.
};
const SIG=ZC.FIN.signals,T=SIG&&SIG.table,bad=[],info=[];
if(!SIG)throw new Error('нет FIN.signals');
// (1) таблица стандарта п. 3
const WANT={shield:['yellow',1],roll:['red',1],parry:['blue',1],jump:['white',1],dome:['blue',1],together:['gold',0],target:['gold',0],window:['gold',0]};
for(const a in WANT){const t=T[a];if(!t||t.color!==WANT[a][0]||!!t.danger!==!!WANT[a][1]||!t.shape||!t.sound)bad.push('словарь: '+a);}
if(SIG.isDangerColor('gold'))bad.push('словарь: золото годится для опасности');
for(const a in T)if(T[a].danger&&SIG.family(T[a].hex)!==(T[a].color==='gold'?'yellow':T[a].color))bad.push('словарь: hex '+a+' не того оттенка');
// (2)+(3) исходник страницы
const src=[...document.scripts].map(s=>s.textContent||'').join('\n');
const FAM={red:'red',yellow:'yellow',gold:'yellow',blue:'blue',white:'white',purple:'purple',green:'green'};
const tables=[];
for(const m of src.matchAll(/\b(K1COL|K2COL|K3FX\.COL)\s*=\s*\{([^}]*)\}/g)){
  for(const p of m[2].matchAll(/(\w+)\s*:\s*0x([0-9a-fA-F]{6})/g)){tables.push(m[1]+'.'+p[1]);
    if(FAM[p[1]]&&SIG.family(parseInt(p[2],16))!==FAM[p[1]])bad.push('таблица '+m[1]+': цвет «'+p[1]+'» = 0x'+p[2]+' другого оттенка');}}
if(tables.length<12)bad.push('таблиц цветов найдено мало: '+tables.length+' (ожидалось K1COL, K2COL, K3FX.COL)');
const found={};const add=(rule,helper,col)=>{const k=rule+'|'+helper+'|'+col;found[k]=(found[k]||0)+1;};
const COLS=['red','yellow','blue','white','gold','purple','green','pink'];
let calls=0;
for(const m of src.matchAll(/(\.(?:tele|sector|teleObj|sectorObj|wave)|\b(?:tele|sector|teleObj|sectorObj|lane))\(/g)){
  const i=m.index+m[0].length,pre=src.slice(Math.max(0,m.index-1),m.index+m[0].length);
  // определения (X.tele=function / X.wave=(kind,h)=>) и вызовы без цвета — пропуск; аргументы — до парной скобки (не дальше 500 знаков)
  let d=1,j=i;while(j<src.length&&d>0&&j-i<500){const c=src[j];if(c==='(')d++;else if(c===')')d--;j++;}
  if(d>0)continue;                                  // скобка не закрылась в пределах 500 знаков — это тело функции, не вызов
  const args=src.slice(i,j-1).split('=>')[0];   // тело обратного вызова (=>) — не цвет телеграфа
  if(/^\s*(=|=>|\{)/.test(src.slice(j,j+4)))continue;
  const nm=m[1].replace('.','');const h=nm==='teleObj'?'tele':nm==='sectorObj'?'sector':nm;
  const lits=[...args.matchAll(/'(red|yellow|blue|white|gold|purple|green|pink)'/g)].map(x=>x[1]);
  if(!lits.length&&!/^[\w.]*$/.test(args.split(',')[0]||''))continue;
  calls++;
  for(const c of lits){
    if(c==='gold')add('золото-опасность',h,c);
    else if(c==='purple'||c==='green'||c==='pink')add('вне-словаря',h,c);
    else if(h==='wave'&&c!=='white')add('волна-не-белая',h,c);}}
for(const m of src.matchAll(/k1TeleMats\(0x([0-9a-fA-F]{6})/g)){
  const f=SIG.family(parseInt(m[1],16)),hx=m[1].toLowerCase();calls++;
  if(hx==='ffc83a')add('золото-опасность','hex','gold');         // 0xffc83a — «gold» в K1COL: заливка золотом
  else if(f==='purple')add('вне-словаря','hex',f);}      // зелёное кольцо «листья» (0xb8e070) — не телеграф опасности, не считаем
if(calls<15)bad.push('вызовов телеграфов найдено мало: '+calls);
const fresh=[],gone=[];
for(const k in found)if(found[k]>(BASELINE[k]||0))fresh.push(k+' ×'+found[k]+' (в эталоне '+(BASELINE[k]||0)+')');
for(const k in BASELINE)if((found[k]||0)<BASELINE[k])gone.push(k);
if(fresh.length)bad.push('НОВЫЕ нарушения: '+fresh.join('; '));
const res='calls='+calls+' таблицы='+tables.length+' нарушений сейчас='+Object.values(found).reduce((a,b)=>a+b,0)+' эталон='+Object.values(BASELINE).reduce((a,b)=>a+b,0)+(gone.length?' · эталон можно сократить: '+gone.join(', '):'');
if(bad.length)throw new Error('FAIL '+bad.join(' | ')+' · '+res);
res+' · ok'
