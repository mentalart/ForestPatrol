/* ============================== РЕЛИЗ · РОЛИКИ: ПРОПУСК ОДНИМ ИГРОКОМ, ПЛАШКА ПРОПУСКА БЕЗ ТЕКСТА (7 С ПОСЛЕ НАЖАТИЯ), ПРОПУСК ИЗ ПАУЗЫ ============================== */
// По симулированному плейтесту (docs/31, этап 1.5 и 7): в паре ролик пропускают, только если оба держат прыжок секунду, — ребёнок в паре со взрослым
// (или один из двоих, кто не хочет смотреть) застревает на 53 минутах роликов. Движок (10_levels_flow_menu.js) не тронут — правка обёрткой над step.
//  • В паре ролик можно пропустить и одному: держи прыжок 2 с. Оба держат — как прежде, 1 с. Одиночный режим — как прежде (один держит 1 с).
//  • Плашка пропуска (#skip) — без слов: только кнопки игроков, кружки «держит» и полоска. Правый нижний угол. Её нет, пока не нажали прыжок в ролике;
//    после нажатия (и пока держат) она видна, через CSK.vis = 7 с после последнего нажатия пропадает совсем, до следующего нажатия.
//  • В паузе во время ролика — пункт «Пропустить ролик» (не в ?debug, чтобы не сдвигать пункты ботам).
const CSK=FIN.cineSkip={t:0,need:2,one:false,show:0,vis:7};
const cskDo=c=>{CSK.t=0;c.skip();c.t=c.dur;};
{const _st=step;step=function(dt){_st(dt);const c=G.cine;
  if(c&&c.skippable&&c.t>0.8&&G.state==='play'){const a=btn(0,'jump'),b=btn(1,'jump');
    CSK.show=(G.solo?btn(G.soloPi,'jump'):a||b)?CSK.vis:Math.max(0,CSK.show-dt);
    if(!G.solo){CSK.one=a!==b;
      if(CSK.one){CSK.t+=dt;if(CSK.t>=CSK.need)cskDo(c);}else CSK.t=Math.max(0,CSK.t-dt*2);}}
  else{CSK.t=0;CSK.one=false;CSK.show=0;}};}
{const _ui=updateUI;updateUI=function(dt){_ui(dt);
  const sk=$('skip');if(!sk)return;
  if(!sk._bare){sk._bare=true;sk.firstElementChild.style.display='none';}   // подпись движка («Пропуск — оба держат») не показываем
  if(sk.style.display==='none')return;
  if(!G.cine||CSK.show<=0){sk.style.display='none';return;}
  if(!G.solo)$('skbar').style.width=Math.round(Math.max(G.skipT,CSK.t/CSK.need)*100)+'%';};}
// пауза во время ролика: «Пропустить ролик»
{const _ps=pauseScreen;pauseScreen=function(){const scr=_ps(),c=G.cine;
  if(c&&c.skippable&&(!FIN.kids.debug||FIN.kids.force))scr.items.splice(1,0,{label:'Пропустить ролик',sub:()=>G.cine?'осталось '+Math.max(0,Math.ceil(G.cine.dur-G.cine.t))+' с':'',act:()=>{const k=G.cine;hideMenu();if(k)cskDo(k);}});
  return scr;};}
