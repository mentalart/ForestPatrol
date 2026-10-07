/* ============================== РЕЛИЗ · КАЛИБРОВКА РИТМА ============================== */
// Ритм-уровни (1-3 «Колобок», 3-3, 4-3 «Ухнем», 3-B «Подпой», 5-4) сверяют нажатие с долей по времени уровня. Но звук доходит до игрока позже, чем игра
// его сыграла (беспроводные наушники — 150–300 мс, телевизор в «игровом» режиме и без него — 50–120 мс, колонки по HDMI), и ввод тоже запаздывает; дети
// жмут «в слышимую» долю — и получают «поздно» там, где сами не виноваты (docs/29_full_audit.md, 3.7). Настройки → «Калибровка ритма» → «Хлопни в такт»:
// десять щелчков через 0,75 с, хлопать прыжком; игра берёт середину отклонений (два первых щелчка — разминка, выбросы отбрасываются) и запоминает
// поправку в миллисекундах. Дальше ритм-уровни считают время нажатия за вычетом поправки: rT(t)=t−G.rLat (proto/engine/01_utils_input_sound.js).
// Поправку можно подвинуть и вручную (← → в настройках — по 10 мс). Щелчок, нажатия и расчёт идут в кадрах меню — так же, как нажатия и доли в уровне,
// поэтому поправка переносится на уровень без пересчёта.
const RC=FIN.rcal={lead:1.4,per:0.75,n:10,skip:2,tol:0.12,need:5,min:-200,max:400,phase:'idle',start0:null,k:-1,taps:[],res:null,msg:'',last:0,
  clock:()=>performance.now()/1000};
const rcMs=()=>Math.max(RC.min,Math.min(RC.max,Math.round(FIN.set.rLatMs||0)));
FIN.applyRLat=()=>{G.rLat=rcMs()/1000;};
{const _as=FIN.applySettings;FIN.applySettings=function(){_as();FIN.applyRLat();};}
FIN.applyRLat();
const rcSave=ms=>{FIN.set.rLatMs=Math.max(RC.min,Math.min(RC.max,Math.round(ms/10)*10));FIN.saveSettings();FIN.applySettings();};
const rcMed=a=>{const s=a.slice().sort((x,y)=>x-y),m=s.length>>1;return s.length%2?s[m]:(s[m-1]+s[m])/2;};
RC.T=k=>RC.start0+RC.lead+k*RC.per;
RC.start=()=>{RC.phase='run';RC.start0=null;RC.k=-1;RC.taps=[];RC.res=null;RC.msg='';RC.last=0;};
RC.cancel=()=>{if(RC.phase==='run'){RC.phase='idle';RC.msg='Остановлено. Нажми «Начать», когда будешь готов.';}};
// расчёт: хлопки после разминки; середина, выбросы (дальше tol от середины) отбрасываются; нужно need хороших хлопков
RC.solve=()=>{const d=RC.taps.filter(q=>q.j>=RC.skip).map(q=>q.d),n0=RC.n-RC.skip;
  if(d.length<RC.need){RC.res={ok:false,n:d.length,of:n0,why:'мало хлопков'};return RC.res;}
  const m=rcMed(d),good=d.filter(x=>Math.abs(x-m)<=RC.tol);
  if(good.length<RC.need){RC.res={ok:false,n:good.length,of:n0,why:'хлопки не в один такт'};return RC.res;}
  const off=rcMed(good),ms=Math.max(RC.min,Math.min(RC.max,Math.round(off*100)*10)),sp=Math.round(Math.max(...good.map(x=>Math.abs(x-off)))*100)*10;
  RC.res={ok:true,ms,n:good.length,of:n0,spread:sp};return RC.res;};
// кадр меню: now — время кадра (с), tapped — в этом кадре был прыжок. Возвращает true, если экран надо перерисовать
RC.step=(now,tapped)=>{if(RC.phase!=='run')return false;let redraw=false;
  if(RC.start0===null){RC.start0=now;RC.last=now;redraw=true;}
  if(now-RC.last>0.3){RC.phase='idle';RC.msg='Окно на мгновение зависло — начни заново.';return true;}
  RC.last=now;
  while(RC.k+1<RC.n&&now>=RC.T(RC.k+1)){RC.k++;try{tone(1568,0.06,'square',0.1);tone(784,0.1,'triangle',0.12);}catch(e){}redraw=true;}
  if(tapped){const j=Math.round((now-RC.start0-RC.lead)/RC.per);   // ближайший щелчок
    if(j>=0&&j<RC.n&&!RC.taps.some(q=>q.j===j)){RC.taps.push({j,d:now-RC.T(j)});redraw=true;}}
  if(RC.k>=RC.n-1&&now>RC.T(RC.n-1)+RC.per*0.6){const r=RC.solve();RC.phase='done';if(r.ok){rcSave(r.ms);RC.msg='';}redraw=true;}
  return redraw;};
RC.html=()=>{const dots=[];for(let j=0;j<RC.n;j++){const tp=RC.taps.find(q=>q.j===j),lit=RC.phase==='run'&&j===RC.k,pas=RC.phase==='run'&&j<RC.k||RC.phase==='done';
    dots.push('<span style="display:inline-block;width:'+(lit?20:15)+'px;height:'+(lit?20:15)+'px;border-radius:50%;margin:0 5px;vertical-align:middle;background:'+(tp?'#ffd76a':pas?'#8a7a52':lit?'#ffffff':'#4d4630')+';opacity:'+(j<RC.skip?0.55:1)+'"></span>');}
  const ms=rcMs(),cur='Сейчас поправка: <b>'+(ms>0?'+':'')+ms+' мс</b>'+(ms?'':' (звук и ввод считаются мгновенными)'),jk=K(0,'jump')+' / '+K(1,'jump');let t;
  if(RC.phase==='run')t='Хлопай прыжком ('+jk+') ровно в щелчок. Первые два щелчка — разминка.';
  else if(RC.phase==='done'&&RC.res&&RC.res.ok)t='Готово: поправка <b>'+(RC.res.ms>0?'+':'')+RC.res.ms+' мс</b> — записана ('+RC.res.n+' хлопков из '+RC.res.of+', разброс ±'+RC.res.spread+' мс).';
  else if(RC.phase==='done')t='Не вышло: '+RC.res.why+' (в такт — '+RC.res.n+' из '+RC.res.of+'). Хлопай по щелчку, а не по счёту. Прежняя поправка осталась.';
  else t=RC.msg||'Нажми «Начать» и хлопай прыжком в щелчки: игра поймёт, насколько твой звук (беспроводные наушники, телевизор) и ввод запаздывают, и подвинет доли в ритм-уровнях — «Колобок», «Ухнем», «Подпой», 3-3, 5-4.';
  return '<div class="fin-note"><div style="text-align:center;margin:4px 0 10px">'+dots.join('')+'</div>'+t+'<div style="margin-top:8px;opacity:.85">'+cur+(FIN.set.sfx<0.1?' · звуки выключены — щелчков не слышно':'')+'</div></div>';};
function rcalScreen(){return {head:'Хлопни в такт',rcal:true,html:()=>RC.html(),items:[
  {get label(){return RC.phase==='idle'?'Начать':'Ещё раз';},get off(){return RC.phase==='run';},act:()=>{uiAudio();RC.start();finDraw();}},
  {label:'Сбросить поправку',sub:'0 мс — звук и ввод считаются мгновенными',get off(){return RC.phase==='run';},act:()=>{rcSave(0);RC.phase='idle';RC.msg='Поправка сброшена.';finDraw();}},
  {label:'Назад',act:()=>{RC.cancel();finBack();}}],sel:0};}
// во время хлопков прыжок — хлопок, а не выбор пункта; Esc / «щит» — остановить
{const _fmi=finMenuInput;finMenuInput=function(){const scr=FIN.menu;
  if(scr&&scr.rcal&&RC.phase==='run'){uiAudio();const back=pressed.has('Escape')||tap(0,'guard')||tap(1,'guard');
    if(back){RC.cancel();finDraw();return;}
    if(RC.step(RC.clock(),tap(0,'jump')||tap(1,'jump')))finDraw();return;}
  _fmi();};}
// пункт в настройках: Enter — экран «Хлопни в такт», ← → — подвинуть на 10 мс
{const _ss=settingsScreen;settingsScreen=function(){const scr=_ss(),L=scr.items,i=L.findIndex(it=>it.label==='Графика'),save=()=>{FIN.saveSettings();FIN.applySettings();};
  const it={label:'Калибровка ритма',val:()=>{const ms=rcMs();return (ms>0?'+':'')+ms+' мс';},sub:'«Колобок», «Ухнем», «Подпой» всё время «рано» или «поздно»? Хлопни в такт — игра подвинет доли (← → — вручную)',
    side:d=>{FIN.set.rLatMs=Math.max(RC.min,Math.min(RC.max,rcMs()+d*10));save();},act:()=>{RC.phase='idle';RC.msg='';finPush(rcalScreen());}};
  L.splice(i<0?L.length-1:i,0,it);return scr;};}
