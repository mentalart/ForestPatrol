/* ============================== РЕЛИЗ final06 · МИР 3: СОХРАНЕНИЕ НА КОЛОКОЛЬЧИКАХ В ДЛИННЫХ УРОВНЯХ 3-1 И 3-2 (docs/38, w-save) ============================== */
// 3-1 и 3-2 — самые длинные уровни мира (≈ 500 и 340 м). Позвонил в колокольчик — игра запоминает участок (по именам W.warp31 / W.warp32,
// тем же, что у ботов), собранные звенья и орешки. Вышел из уровня и вошёл снова — карточка «Продолжить с колокольчика?»:
// прыжок — продолжить с участка (звенья и орешки на месте, собранные позади исчезли), щит — сначала (через 10 с — тоже сначала).
// Пройден уровень — запись стирается. Хранится в G.resume (в сохранении игры, поле добавлено в SAVE_FIELDS). Боты (G.manual) карточку не видят.
const W3RES={'3-1':{warp:'warp31',secs:[['gardener',-172],['bridge',-199],['pass',-236],['oak',-268],['guards',-304],['steps',-358],['thieves',-374],['boss',-441.6]]},
  '3-2':{warp:'warp32',secs:[['lamb',-99],['cliff',-116],['wind',-140],['rainbow',-194],['rainbow2',-219],['pen',-259],['boss',-300.5]]}};
if(typeof SAVE_FIELDS!=='undefined'&&SAVE_FIELDS.indexOf('resume')<0)SAVE_FIELDS.push('resume');
FIN.w3res=W3RES;
// колокольчик: участок — самый дальний, что начинается не дальше колокольчика
function w3resMark(b){const id=W&&W.levelId,R=W3RES[id];if(!R||!b)return;let sec=null;for(const[n,z]of R.secs)if(z>=b.z-2)sec=n;if(!sec)return;
  G.resume=G.resume||{};const old=G.resume[id];const idx=R.secs.findIndex(s=>s[0]===sec);if(old&&R.secs.findIndex(s=>s[0]===old.sec)>idx)return;
  G.resume[id]={sec,links:W.links,nuts:W.nuts,taken:W.items.map((it,i)=>it.taken?i:-1).filter(i=>i>=0)};}
{const _fl=finishLevel;finishLevel=function(){const id=W&&W.levelId;if(G.resume&&id&&G.resume[id])delete G.resume[id];_fl();};}
function w3resApply(id){const R=W3RES[id],S=G.resume&&G.resume[id];if(!R||!S||typeof W[R.warp]!=='function')return false;
  if(G.cine&&G.cine.skip){G.cine.skip();G.cine.t=G.cine.dur;}
  W[R.warp](S.sec);W.links=S.links||0;W.nuts=S.nuts||0;(S.taken||[]).forEach(i=>{const it=W.items[i];if(it&&!it.taken){it.taken=true;W.group.remove(it.g);}});
  banner('С колокольчика!','#ffd76a',2.4,'звенья и орешки — при вас');return true;}
{const _ll=loadLevel;loadLevel=function(i){_ll(i);const id=W&&W.levelId,R=W3RES[id];if(!R)return;
  // следим за колокольчиками этого захода
  const seen=new Set();W.updates.push(()=>{for(const b of W.bells){if(seen.has(b))continue;if(b.act[0]||b.act[1]){seen.add(b);w3resMark(b);}}});
  const S=G.resume&&G.resume[id];if(!S||G.manual)return;
  // карточка выбора: прыжок — продолжить, щит — сначала
  const C={t:10,done:false};const el=document.createElement('div');el.style.cssText='position:fixed;left:50%;top:22%;transform:translateX(-50%);z-index:60;background:rgba(20,18,40,.88);color:#fff6dc;border:2px solid #ffd76a;border-radius:14px;padding:14px 22px;font:600 calc(16px * var(--fts,1))/1.4 system-ui,sans-serif;text-align:center;pointer-events:none';
  el.innerHTML='Продолжить с колокольчика?<br><span style="font-weight:500">прыжок — продолжить · щит — сначала</span>';document.body.appendChild(el);
  const end=(go)=>{if(C.done)return;C.done=true;el.remove();if(go)w3resApply(id);else{delete G.resume[id];}};
  W.updates.push(dt=>{if(C.done)return;if(W.levelId!==id){C.done=true;el.remove();return;}C.t-=dt;
    for(const pi of[0,1]){if(tap(pi,'jump')){end(true);return;}if(tap(pi,'guard')){end(false);return;}}if(C.t<=0)end(false);});};}
