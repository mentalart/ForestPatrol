//@@
// @timeout=600
// Битва с Кощеем (сборка --k5epic), стадия 1 «У лукоморья дуб зелёный» — прежняя, без подсказок совсем (E.NOHINT, p6): нет карточек,
// значков цели, кнопок и стрелок над героями и целями, значков и слов во всплывашках, подсветки целей; Кощей бьёт как прежде, свечи
// гаснут, все восемь — стадия пройдена. Правила — в обучающих катсценах (tk5e_lesson), в бою подсказок нет ни на одной стадии.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,300));_ce.apply(console,arguments);};}
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.E5=ZC.FIN.k5e;window.K5=ZC.FIN.k5;
window.CHK=s=>{if(_errs.length)throw new Error(s+' — ошибки: '+_errs.slice(0,4).join(' / '));return s;};
window.CYR=s=>/[А-Яа-яЁё]/.test(s||'');window.N={bub:0,flt:0,card:0,ui:0,goal:0,tg:0};
// подсказки на экране: кнопки над героями, всплывашки со словами, карточка, значки цели, цели для подсветки
window.SEE=()=>{for(const b of document.querySelectorAll('#bubs .bub'))if(b.style.display!=='none')N.bub++;for(const f of document.querySelectorAll('.float'))if(f.style.display!=='none'&&CYR(f.textContent))N.flt++;
  const c=document.getElementById('finTut');if(c&&c.classList.contains('on'))N.card++;if(ZC.G.ui)N.ui++;};
window.TK=n=>{for(let i=0;i<n;i++){if(ZC.G.cine&&i%3===0)ZC.skip();ZC.tick(1);if(i%5===0)SEE();}};
window.PUT=(h,x,z)=>{h.pos.set(x,0.05,z);h.vel.set(0,0,0);};
window.H=pi=>ZC.players[pi].heroes[ZC.players[pi].act];
window.GO1=solo=>{ZC.setSolo(!!solo);for(const pi of[0,1])ZC.players[pi].petals=3;E5.goStage(1);ZC.G.manual=true;ZC.tick(20);let i=0;for(;i<60*90&&!(E5.cur===1&&K5.fight&&!ZC.G.cine&&!ZC.G.ui);i++)TK(1);
  window.D=ZC.W.dbg5e();return i;};
GO1(false);CHK('cur='+E5.cur+' fight='+K5.fight+' карточек='+N.card+' окон='+N.ui)
//@@
// 25 с боя у свечей: Кощей бьёт (цепи, капли, круги), а подсказок нет ни одной
const C0=D.candles[0],C1=D.candles[1];let adds=0,bolts=0,zones=0;
for(let i=0;i<60*25;i++){PUT(H(0),C0.pos.x+2.6,C0.pos.z+1.2);PUT(H(1),C1.pos.x-2.6,C1.pos.z+1.2);TK(1);for(const pi of[0,1])ZC.players[pi].petals=3;
  adds=Math.max(adds,K5.adds.filter(e=>e.k5chain&&!e.k5demo&&e.alive).length);bolts=Math.max(bolts,ZC.W.bolts.length);zones=Math.max(zones,(K5.zones||[]).length);}
window.R=['цепей '+adds+' капель '+bolts+' кругов '+zones+' | подсказки: кнопок '+N.bub+' всплывашек со словами '+N.flt+' карточек '+N.card+' значков цели '+N.goal+' целей подсветки '+N.tg];
if(!adds||!bolts||!zones)throw new Error('Кощей не бьёт: '+R.join(' | '));if(N.bub||N.flt||N.card||N.goal||N.tg)throw new Error('есть подсказки: '+R.join(' | '));CHK(R.join(' | '))
//@@ shot=k5e_s1_nohint.png
ZC.tick(1);
//@@
// свечи гаснут по-прежнему (пять ударов), все восемь — стадия пройдена
for(const c of D.candles){for(let k=0;k<6&&c.lit;k++)c.k5hit(c,H(0));}let i=0;for(;i<60*20&&!E5.done[1];i++)TK(1);
R.push('все свечи погашены — стадия 1 пройдена='+!!E5.done[1]+' | кнопок '+N.bub+' всплывашек '+N.flt);if(!E5.done[1]||N.bub||N.flt)throw new Error(R.join(' | '));CHK(R.join(' | '))
//@@
// стадия 2 — подсказок тоже нет
for(let i=0;i<60*120&&!(E5.cur===2&&K5.fight&&!ZC.G.cine&&!ZC.G.ui);i++){if(ZC.G.ui&&i%10===0)ZC.press('Space');TK(1);}
R.push('стадия 2: cur='+E5.cur+' кнопок '+N.bub+' всплывашек '+N.flt);if(E5.cur!==2||N.bub||N.flt)throw new Error(R.join(' | '));CHK(R.join(' | '))
//@@
// одним игроком — так же без подсказок
N.bub=N.flt=N.card=N.goal=N.tg=0;GO1(true);const sp=ZC.G.soloPi,c=D.candles[0];for(let i=0;i<60*12;i++){PUT(H(sp),c.pos.x+2.6,c.pos.z+1.2);TK(1);ZC.players[sp].petals=3;}
R.push('одному: кнопок '+N.bub+' всплывашек '+N.flt+' карточек '+N.card+' значков цели '+N.goal);if(N.bub||N.flt||N.card||N.goal)throw new Error(R.join(' | '));ZC.setSolo(false);CHK(R.join(' | '))
