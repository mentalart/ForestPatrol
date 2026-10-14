/* ============================== РЕЛИЗ final06 · МИР 2: СОХРАНЕНИЕ НА КОЛОКОЛЬЧИКАХ В ДЛИННЫХ УРОВНЯХ 2-1 И 2-2 ============================== */
// По разбору мира 2 (выбранная правка c11): 2-1 (≈ 330 м) и 2-2 (≈ 450 м) — самые длинные уровни мира. Позвонил в колокольчик — игра
// запоминает участок (по именам W.warp21 / W.warp22, тем же, что у ботов), собранные звенья и орешки. Вышел из уровня и вошёл снова —
// карточка «Продолжить с колокольчика?»: прыжок — продолжить с участка (звенья и орешки на месте, собранные позади исчезли),
// щит — сначала (через 10 с — тоже сначала). Пройден уровень — запись стирается. Хранится в G.resume (поле сохранения игры).
// Боты (G.manual) карточку не видят; продолжить за них — FIN.kwRes.apply('2-1').
// Участок — самый дальний, что начинается не дальше колокольчика; с участка ворот/финала (gate, crown) не продолжают.
const KWRES={
  '2-1':{warp:'warp21',secs:()=>{const D=W.dbg21?W.dbg21():{};return[['locks',-78],['market',-157],['tune',-182],['dance',(D.K0||-196)-2],['shells',-219+(D.S1||0)],['garden',-235.5+(D.DG||0)],['boss',-267+(D.DG||0)],['city',-362],['tower',-401]];}},
  '2-2':{warp:'warp22',secs:()=>[['yard',10],['village',-75],['ride',-97],['ribs',-142],['lip',-208],['eyes',-268],['grove',-306],['head',-358]]}};
if(typeof SAVE_FIELDS!=='undefined'&&SAVE_FIELDS.indexOf('resume')<0)SAVE_FIELDS.push('resume');
function kwresMark(b,secs){const id=W&&W.levelId;if(!KWRES[id]||!b)return;let sec=null;for(const[n,z]of secs)if(z>=b.z-2)sec=n;if(!sec)return;
  G.resume=G.resume||{};const old=G.resume[id],idx=secs.findIndex(s=>s[0]===sec);if(old&&secs.findIndex(s=>s[0]===old.sec)>idx)return;
  G.resume[id]={sec,links:W.links,nuts:W.nuts,taken:W.items.map((it,i)=>it.taken?i:-1).filter(i=>i>=0)};}
function kwresApply(id){const R=KWRES[id],S=G.resume&&G.resume[id];if(!R||!S||typeof W[R.warp]!=='function')return false;
  if(G.cine&&G.cine.skip){G.cine.skip();G.cine.t=G.cine.dur;}
  W[R.warp](S.sec);W.links=S.links||0;W.nuts=S.nuts||0;(S.taken||[]).forEach(i=>{const it=W.items[i];if(it&&!it.taken){it.taken=true;W.group.remove(it.g);}});
  banner('С колокольчика!','#ffd76a',2.4,'звенья и орешки — при вас');return true;}
FIN.kwRes={table:KWRES,mark:kwresMark,apply:kwresApply};
{const _fl=finishLevel;finishLevel=function(){const id=W&&W.levelId;if(KWRES[id]&&G.resume&&G.resume[id])delete G.resume[id];_fl();};}
{const _ll=loadLevel;loadLevel=function(i){_ll(i);const id=W&&W.levelId,R=KWRES[id];if(!R)return;
  // колокольчики этого захода: первый звон каждого запоминает участок
  let secs=null;const seen=new Set();W.updates.push(()=>{for(const b of W.bells){if(seen.has(b))continue;if(b.act[0]||b.act[1]){seen.add(b);try{kwresMark(b,secs||(secs=R.secs()));}catch(e){}}}});
  const S=G.resume&&G.resume[id];if(!S||G.manual)return;
  // карточка выбора: прыжок — продолжить, щит — сначала
  const C={t:10,done:false};const el=document.createElement('div');el.style.cssText='position:fixed;left:50%;top:22%;transform:translateX(-50%);z-index:60;background:rgba(20,18,40,.88);color:#fff6dc;border:2px solid #ffd76a;border-radius:14px;padding:14px 22px;font:600 calc(16px * var(--fts,1))/1.4 system-ui,sans-serif;text-align:center;pointer-events:none';
  el.innerHTML='Продолжить с колокольчика?<br><span style="font-weight:500">прыжок — продолжить · щит — сначала</span>';document.body.appendChild(el);
  const end=go=>{if(C.done)return;C.done=true;el.remove();if(go)kwresApply(id);else delete G.resume[id];};
  W.updates.push(dt=>{if(C.done)return;if(W.levelId!==id){C.done=true;el.remove();return;}C.t-=dt;
    for(const pi of[0,1]){if(tap(pi,'jump')){end(true);return;}if(tap(pi,'guard')){end(false);return;}}if(C.t<=0)end(false);});};}
