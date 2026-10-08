/* ============================== РЕЛИЗ · РОЛИКИ: ПРОПУСК ОДНИМ ИГРОКОМ, «ОСТАЛОСЬ N С», ПРОПУСК ИЗ ПАУЗЫ ============================== */
// По симулированному плейтесту (docs/31, этап 1.5 и 7): в паре ролик пропускают, только если оба держат прыжок секунду, — ребёнок в паре со взрослым
// (или один из двоих, кто не хочет смотреть) застревает на 53 минутах роликов. Движок (10_levels_flow_menu.js) не тронут — правка обёрткой над step.
//  • В паре ролик можно пропустить и одному: держи прыжок 2 с. Оба держат — как прежде, 1 с. Одиночный режим — как прежде (один держит 1 с).
//  • На панели пропуска — «осталось N с»; когда держит один, на ней: «Друг хочет пропустить — держи прыжок».
//  • В паузе во время ролика — пункт «Пропустить ролик» (не в ?debug, чтобы не сдвигать пункты ботам).
const CSK=FIN.cineSkip={t:0,need:2,one:false};
const cskDo=c=>{CSK.t=0;c.skip();c.t=c.dur;};
{const _st=step;step=function(dt){_st(dt);const c=G.cine;
  if(c&&c.skippable&&c.t>0.8&&!G.solo&&G.state==='play'){const a=btn(0,'jump'),b=btn(1,'jump');CSK.one=a!==b;
    if(CSK.one){CSK.t+=dt;if(CSK.t>=CSK.need)cskDo(c);}else CSK.t=Math.max(0,CSK.t-dt*2);}
  else{CSK.t=0;CSK.one=false;}};}
{const _ui=updateUI;updateUI=function(dt){_ui(dt);
  const sk=$('skip');if(!sk||sk.style.display==='none'||!G.cine)return;
  const st=sk.firstElementChild;let rem=sk._rem;if(!rem){rem=sk._rem=document.createElement('span');rem.id='skrem';rem.style.cssText='margin-left:12px;opacity:.75;font-size:.9em;white-space:nowrap';sk.appendChild(rem);}
  if(!G.solo){const stt=CSK.one?'Друг хочет пропустить — держи прыжок':'Пропуск — оба держат (или один 2 с)';if(st.textContent!==stt)st.textContent=stt;
    $('skbar').style.width=Math.round(Math.max(G.skipT,CSK.t/CSK.need)*100)+'%';}
  const left=Math.max(0,Math.ceil(G.cine.dur-G.cine.t)),t='осталось '+left+' с';if(rem._t!==t){rem._t=t;rem.textContent=t;}};}
// пауза во время ролика: «Пропустить ролик»
{const _ps=pauseScreen;pauseScreen=function(){const scr=_ps(),c=G.cine;
  if(c&&c.skippable&&(!FIN.kids.debug||FIN.kids.force))scr.items.splice(1,0,{label:'Пропустить ролик',sub:()=>G.cine?'осталось '+Math.max(0,Math.ceil(G.cine.dur-G.cine.t))+' с':'',act:()=>{const k=G.cine;hideMenu();if(k)cskDo(k);}});
  return scr;};}
