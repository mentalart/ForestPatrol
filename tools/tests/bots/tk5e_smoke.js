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
// подсказки без текста (отзыв: ребёнок 7 лет не читает): карточки начала стадии — значки и кнопка, ни одной буквы; в бою текстовых
// карточек нет; подписи над героями — значки; в паузе — только название стадии и строка пролога
window.CYR=s=>/[А-Яа-яЁё]{3,}/.test(s||'');
const r=[];for(const n of [3,10,2]){E5.goStage(n);ZC.G.manual=true;ZC.tick(30);let cardTxt=0,cards=0;
  for(let k=0;k<600&&(ZC.G.cine||ZC.G.ui);k++){const c=document.getElementById('finTut');if(c&&c.classList.contains('on')){cards++;if(CYR(c.textContent))cardTxt++;}if(k%40===39){ZC.press('KeyF');ZC.press('Comma');ZC.press('KeyG');ZC.press('Period');ZC.press('KeyR');ZC.press('Semicolon');}if(k>300)ZC.skip();ZC.sim(1/60);ZC.tick(3);}
  ZC.tick(300);ZC.sim(1/60);const a=ZC.FIN.hints.state().shown.some(Boolean);let bubTxt=0,objTxt=0;for(let k=0;k<60*12;k++){ZC.tick(1);if(k%30===0){ZC.sim(1/60);for(const b of document.querySelectorAll('.bub'))if(b.style.display!=='none'&&CYR(b.textContent))bubTxt++;for(const id of['obj0','obj1','vest']){const e=document.getElementById(id);if(e&&e.style.display!=='none'&&CYR(e.textContent))objTxt++;}}}
  const bh=document.getElementById('finBossHint'),b=!!(bh&&bh.classList.contains('on'));
  r.push('st'+n+' карточек='+cards+' с буквами='+cardTxt+' текст цели='+a+' карточка боя='+b+' подписей с буквами='+bubTxt+' цель/весточка с буквами='+objTxt);if(cardTxt||a||b||bubTxt||objTxt)throw new Error(r.join(' | '));}r.join(' | ')
