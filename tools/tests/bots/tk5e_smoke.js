//@@
// Битва с Кощеем (сборка --k5epic): каждая стадия запускается прыжком, ролики и карточки пропускаются, 7 с боя — без ошибок
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,300));_ce.apply(console,arguments);};}
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.E5=ZC.FIN.k5e;window.RUN=(n,ticks)=>{const e0=_errs.length;E5.goStage(n);ZC.G.manual=true;ZC.tick(30);let k=0;while(ZC.G.cine&&k<60){ZC.skip();ZC.tick(5);k++;}ZC.tick(ticks||420);
  const r='st'+n+' cur='+E5.cur+' cine='+!!ZC.G.cine+' lv='+ZC.W.levelId+' errs='+(_errs.length-e0)+(_errs.length>e0?' '+_errs.slice(e0,e0+3).join(' / '):'');if(_errs.length>e0)throw new Error(r);return r;};
'ok'
//@@
RUN(0,300)
//@@
RUN(1)
//@@
RUN(2)
//@@
RUN(3)
//@@
RUN(4)
//@@
RUN(5)
//@@
RUN(6)
//@@
RUN(7)
//@@
RUN(8)
//@@
RUN(9)
//@@
RUN(10)
//@@ shot=k5e_s10.png
ZC.tick(1);
//@@
RUN(11)
//@@ shot=k5e_s11.png
ZC.tick(1);
//@@
RUN(12)
//@@
// подсказки текстом — только в начале стадии: на 5-й секунде (после заставки) карточка задачи видна, через 12 с нет ни её, ни карточки боя
const r=[];for(const n of [3,10,2]){E5.goStage(n);ZC.G.manual=true;ZC.tick(30);let k=0;while((ZC.G.cine||ZC.G.ui)&&k<200){ZC.skip();ZC.press('Space');ZC.tick(5);k++;}ZC.tick(300);ZC.sim(1/60);   // sim — шаг с обновлением интерфейса (tick его не обновляет)
  const a=ZC.FIN.hints.state().shown.some(Boolean);ZC.tick(60*12);ZC.sim(1/60);const s=ZC.FIN.hints.state().shown.some(Boolean),bh=document.getElementById('finBossHint'),b=!!(bh&&bh.classList.contains('on'));
  r.push('st'+n+' в начале='+a+' потом='+s+' карточка боя='+b+' пауза='+(ZC.W.pauseLine.length>80));if(!a||s||b)throw new Error(r.join(' | '));}r.join(' | ')
