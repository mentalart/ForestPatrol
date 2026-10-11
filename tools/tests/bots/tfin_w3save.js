//@@
// мир 3 (late_99zq_w3save, docs/38 w-save): 3-2 — колокольчик на участке «ветер» запоминает участок и собранное; заново вошёл — карточка,
// прыжок — продолжить с участка (звенья на месте), щит — сначала; уровень пройден — запись стёрта.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,200));_ce.apply(console,arguments);};}
ZC.startFrom(ZC.LV('3-2'));ZC.G.manual=true;ZC.tick(20);U.nocine();ZC.tick(5);ZC.FIN.warp('wind');ZC.tick(10);
const W=ZC.W;W.links=2;W.nuts=3;W.items.find(it=>it.kind==='nut'&&!it.taken).taken=true;
// ближайший колокольчик к участку — позвонить
const b=W.bells.slice().sort((a,c)=>Math.abs(a.z+140)-Math.abs(c.z+140))[0];const h=U.act(0);h.pos.set(b.x+0.6,b.y||h.pos.y,b.z);ZC.tick(20);
const R=ZC.G.resume&&ZC.G.resume['3-2'];const r=['bell='+b.z.toFixed(0),'resume='+JSON.stringify(R&&{sec:R.sec,links:R.links,nuts:R.nuts,taken:R.taken.length})];
if(!R||!R.sec)throw new Error('колокольчик не запомнил участок: '+r.join(' | '));r.join(' | ')
//@@
// заново в 3-2 (как человек: без G.manual) — карточка; прыжок — продолжить
ZC.G.manual=false;ZC.startFrom(ZC.LV('3-2'));ZC.tick(30);const card=[...document.body.children].some(e=>/Продолжить с колокольчика/.test(e.textContent||''));ZC.press('Space');ZC.tick(30);
const W=ZC.W,R=ZC.G.resume['3-2'];const r=['card='+card,'z='+U.act(0).pos.z.toFixed(0),'links='+W.links,'nuts='+W.nuts];
if(!card)throw new Error('нет карточки: '+r.join(' | '));if(!(U.act(0).pos.z<-100)||W.links!==2||W.nuts!==3)throw new Error('не продолжили с участка: '+r.join(' | '));r.join(' | ')
//@@
// ещё раз — щит: сначала (запись стёрта)
ZC.startFrom(ZC.LV('3-2'));ZC.tick(30);ZC.press('KeyG');ZC.tick(30);const r=['z='+U.act(0).pos.z.toFixed(0),'resume='+!!(ZC.G.resume&&ZC.G.resume['3-2'])];
if(U.act(0).pos.z<-60||(ZC.G.resume&&ZC.G.resume['3-2']))throw new Error('щит не начал сначала: '+r.join(' | '));
ZC.G.manual=true;r.push('errs='+_errs.length+' '+_errs.slice(0,2).join(' / '));if(_errs.length)throw new Error(r.join(' | '));'w3save ok '+r.join(' | ')
