//@@
// @timeout=300
// Битва с Кощеем: возобновление. Выход из уровня посреди стадии 6 и повторный вход — карточка «Продолжить с…», выбор → старт со стадии 6
// (пройденные 1–5 засчитаны); выбор «Начать сначала» — пролог. После победы в стадии 12 запись сброшена.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,300));_ce.apply(console,arguments);};}
window.E5=ZC.FIN.k5e;window.K5=ZC.FIN.k5;window.CHK=s=>{if(_errs.length)throw new Error(s+' — ошибки: '+_errs.slice(0,4).join(' / '));return s;};
ZC.G.flags.k5eAt=0;E5.goStage(6);ZC.G.manual=true;ZC.tick(30);
const r=['cur='+E5.cur,'flag='+ZC.G.flags.k5eAt];if(E5.cur!==6||ZC.G.flags.k5eAt!==6)throw new Error('стадия 6 не записана: '+r.join(' '));
CHK(r.join(' | '))
//@@
// выход на Лукоморье посреди стадии и новый вход (startAt=0) — карточка выбора, первый вариант → стадия 6
ZC.loadLevel(ZC.LV('luko'));ZC.tick(30);const r=['luko='+ZC.W.levelId,'flag='+ZC.G.flags.k5eAt];
ZC.loadLevel(ZC.LV('5-B2'));ZC.tick(60);r.push('ui='+ZC.G.ui,'cur='+E5.cur);
if(ZC.G.ui!=='skaz')throw new Error('нет карточки «Продолжить с…»: '+r.join(' '));
if(!/Продолжить с/.test(document.getElementById('skaz').innerHTML))throw new Error('в карточке нет «Продолжить с»');
ZC.press('Space');ZC.tick(120);r.push('после выбора cur='+E5.cur,'done='+Object.keys(E5.done).join(','));
if(E5.cur!==6||!E5.done[5]||E5.done[6])throw new Error('старт не со стадии 6: '+r.join(' '));
CHK(r.join(' | '))
//@@
// «Начать сначала»: второй вариант — пролог, запись сброшена
ZC.loadLevel(ZC.LV('luko'));ZC.tick(30);ZC.loadLevel(ZC.LV('5-B2'));ZC.tick(60);
if(ZC.G.ui!=='skaz')throw new Error('нет карточки');
ZC.press('KeyS');ZC.tick(2);ZC.press('Space');ZC.tick(60);
const r=['flag='+ZC.G.flags.k5eAt,'pro='+E5.pro.on,'cur='+E5.cur];
if(!E5.pro.on||ZC.G.flags.k5eAt)throw new Error('не пролог: '+r.join(' '));
CHK(r.join(' | '))
