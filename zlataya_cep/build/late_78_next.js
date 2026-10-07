/* ============================== РЕЛИЗ · КНОПКА «ДАЛЬШЕ» ПОСЛЕ УРОВНЯ ============================== */
// Раньше после каждого из 30 уровней мира герои возвращались в Лукоморье (finishLevel → goLevel('luko')), даже когда ждать там нечего: дорога
// до карты, раскатать рушник, выбрать следующий уровень (docs/29_full_audit.md, 3.5). Теперь на карточке «Уровень пройден» — выбор:
// «Дальше · <следующий уровень>» или «В Лукоморье». Сохранение уже сделано (late_50: finishLevel → saveGame), звенья, орешки и самоцвет
// записаны; кузня, лавка и огород никуда не деваются — в Лукоморье можно зайти позже.
// Карточка — только там, где следующий уровень открыт на карте без ворот и без сцены в Лукоморье:
//   • следующий уровень — того же мира и не босс (ворота босса открывает ковка в Лукоморье, 12 звеньев мира);
//   • не 5-3: в Лукоморье Кот пишет на песке «В тереме — не победить» (sandScene) до яйца 5-4;
//   • не 2-3: уровень сам продолжает главу и ведёт в 2-4 (late_99g_k23.js);
//   • не босс, не Застава, не пролог и не финал.
// Включается в «Настройки → Дальше после уровня». В ?debug карточки нет (боты ждут Лукоморье после уровня); FIN.next.force — показать.
const NXT=FIN.next={force:false,debug:/[?&]debug/.test(location.search),fin:false,t:0};
NXT.on=()=>FIN.set.nextBtn!==false&&(!NXT.debug||NXT.force);
NXT.hold=['5-3','2-3'];
NXT.target=()=>{const L=LEVELS[G.levelIdx],N=LEVELS[G.levelIdx+1];
  if(!L||!N||!L.world||L.boss||L.final||L.zast||N.zast||N.boss||N.world!==L.world||NXT.hold.includes(L.id))return null;
  return N;};
function nxtClose(){const el=$('mapui');el.style.display='none';el.innerHTML='';G.ui=null;G.uiTick=null;}
function nxtCard(N){G.ui='next';NXT.t=0;let sel=0;const el=$('mapui');el.style.display='flex';
  const W0=W,got=W0.links||0,tot=W0.linkTotal||0,L=LEVELS[G.levelIdx];
  const draw=()=>{el.innerHTML='<div class="rush"><h2>Уровень пройден!</h2>'+(tot?'<div style="text-align:center;margin-bottom:8px">Звеньев в этот раз: '+got+' из '+tot+'</div>':'')+
    '<div class="lv'+(sel===0?' sel':'')+'"><span>Дальше</span><small>'+N.name+'</small></div>'+
    '<div class="lv'+(sel===1?' sel':'')+'"><span>В Лукоморье</span><small>кузня, лавка, огород</small></div>'+
    '<div class="hint">'+K(0,'up')+K(0,'down')+' · '+K(0,'jump')+' — выбрать</div></div>';};
  draw();SFX.bell();
  G.uiTick=()=>{NXT.t+=1/60;for(const q of[0,1]){const n=uiNav(q);if(n.dy){sel=(sel+n.dy+2)%2;SFX.swap();draw();}
    // первые 0,8 с кнопки не читаем: нажатия последнего боя и сбора звена не должны выбрать за игроков
    if(NXT.t>0.8&&tap(q,'jump')){SFX.bell();nxtClose();NXT.pass=true;try{goLevel(sel===0?N.id:'luko');}finally{NXT.pass=false;}return;}}};}
{const _fl=finishLevel;finishLevel=function(){NXT.fin=true;try{_fl();}finally{NXT.fin=false;}};}
{const _gl=goLevel;goLevel=function(id){if(NXT.fin&&id==='luko'&&!NXT.pass&&NXT.on()&&!G.ui){const N=NXT.target();if(N){nxtCard(N);return;}}_gl(id);};}
// выход из уровня другим путём (меню, загрузка) — карточка не должна остаться на экране
{const _ll=loadLevel;loadLevel=function(i){if(G.ui==='next')nxtClose();_ll(i);};}
