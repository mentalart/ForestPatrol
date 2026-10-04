//@@
// Битва с Кощеем (сборка --k5epic): каждая стадия запускается прыжком, ролики и карточки пропускаются, 7 с боя — без ошибок
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,300));_ce.apply(console,arguments);};}
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.E5=ZC.FIN.k5e;window.RUN=(n,ticks)=>{const e0=_errs.length;E5.goStage(n);ZC.G.manual=true;ZC.tick(30);let k=0;while(ZC.G.cine&&k<60){ZC.skip();ZC.tick(5);k++;}ZC.tick(ticks||420);
  const r='st'+n+' cur='+E5.cur+' cine='+!!ZC.G.cine+' lv='+ZC.W.levelId+' errs='+(_errs.length-e0)+(_errs.length>e0?' '+_errs.slice(e0,e0+3).join(' / '):'');if(_errs.length>e0)throw new Error(r);return r;};
'ok'
//@@
RUN(1)
//@@ shot=k5e_s1.png
ZC.tick(1);
//@@
RUN(2)
//@@
RUN(3)
//@@ shot=k5e_s3.png
ZC.tick(1);
//@@
RUN(4)
