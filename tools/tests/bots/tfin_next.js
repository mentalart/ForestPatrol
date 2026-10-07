//@@
// релиз: кнопка «Дальше» после уровня (docs/29_full_audit.md, 3.5; build/late_78_next.js). После уровня, у которого следующий открыт без ворот и без
// сцены в Лукоморье, — карточка «Дальше · <уровень> / В Лукоморье»; выбор прыжком (первые 0,8 с кнопки не читаются); прогресс сохранён до выбора.
// Карточки нет: перед боссом (ворота — ковка в Лукоморье), после 5-3 (Кот пишет на песке), после 2-3 (уровень сам ведёт в 2-4), после боссов, при выключенной
// настройке и в ?debug без FIN.next.force (боты других уровней ждут Лукоморье).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(20);U.nocine();ZC.tick(10);
window.BAD=[];window.RES=[];window.NX=ZC.FIN.next;
window.chk=(name,ok,info)=>{RES.push(name+': '+info);if(!ok)BAD.push(name+': '+info);};
window.card=()=>{const el=document.getElementById('mapui');return {ui:ZC.G.ui,shown:el.style.display==='flex',text:el.textContent.replace(/\s+/g,' ').slice(0,160),trans:!!ZC.G.trans,next:ZC.G.nextLevel};};
// пройти уровень id и посмотреть, что появилось
window.fin=id=>{ZC.loadLevel(ZC.LV(id));for(let k=0;k<4;k++){ZC.tick(20);U.nocine();}ZC.finishLevel();ZC.tick(5);return card();};
window.untilLevel=(id,max)=>{for(let i=0;i<(max||400);i++){ZC.tick(1);if(ZC.W.levelId===id&&!ZC.G.trans)return true;}return false;};
'ok'
//@@
// в ?debug карточки нет — как прежде, сразу Лукоморье
NX.force=false;let c=fin('1-1');chk('debug без force',c.ui!=='next'&&c.trans&&c.next==='luko','ui='+c.ui+' trans='+c.trans+' next='+c.next);
window.GL=untilLevel('luko');chk('→ Лукоморье',GL,'level='+ZC.W.levelId);
// карточка включена
NX.force=true;c=fin('1-1');chk('карточка после 1-1',c.ui==='next'&&c.shown&&!c.trans&&/Дальше/.test(c.text)&&/1-2/.test(c.text)&&/В Лукоморье/.test(c.text),JSON.stringify(c));
const sv=ZC.FIN.readSave();chk('прогресс сохранён до выбора',!!(sv&&sv.G&&sv.G.done&&sv.G.done['1-1']),'done[1-1]='+!!(sv&&sv.G&&sv.G.done&&sv.G.done['1-1']));
// рано — не читается; через секунду — «Дальше»
ZC.press(U.K[0].j);ZC.tick(2);c=card();chk('нажатие раньше 0,8 с игнорируется',c.ui==='next'&&!c.trans,'ui='+c.ui+' trans='+c.trans);
ZC.tick(60);ZC.press(U.K[0].j);ZC.tick(2);c=card();chk('«Дальше» → следующий уровень',c.trans&&c.next==='1-2'&&c.ui!=='next'&&!c.shown,JSON.stringify(c));
chk('1-2 загружен',untilLevel('1-2'),'level='+ZC.W.levelId);
RES.join(' · ')
//@@
// второй игрок листает вниз и выбирает «В Лукоморье»; hub на месте
let c=fin('1-2');ZC.tick(60);ZC.press(U.K[1].B[3]);ZC.tick(2);ZC.press(U.K[0].j);ZC.tick(2);c=card();
chk('«В Лукоморье»',c.trans&&c.next==='luko'&&c.ui!=='next',JSON.stringify(c));chk('→ Лукоморье',untilLevel('luko'),'level='+ZC.W.levelId);
// нет карточки: следующий — босс, 5-3 (песок), 2-3 (сам ведёт в 2-4), боссы, Застава
for(const id of['1-5','5-3','2-3','1-B','2-B','5-4','4-5']){const k=fin(id);chk('без карточки после '+id,k.ui!=='next'&&k.trans&&k.next==='luko','ui='+k.ui+' trans='+k.trans+' next='+k.next);untilLevel('luko');}
// настройка выключена — карточки нет
ZC.FIN.set.nextBtn=false;let k=fin('1-1');chk('настройка «выкл»',k.ui!=='next'&&k.trans,'ui='+k.ui+' trans='+k.trans);untilLevel('luko');ZC.FIN.set.nextBtn=true;
// следующий уровень соседнего мира — карточка есть (3-1 → 3-2)
k=fin('3-1');chk('мир 3: 3-1 → 3-2',k.ui==='next'&&/3-2/.test(k.text),JSON.stringify(k));
ZC.tick(60);ZC.press(U.K[0].j);ZC.tick(2);chk('3-2 загружается',untilLevel('3-2'),'level='+ZC.W.levelId);
NX.force=false;
if(window._errs.length)BAD.push('ошибки консоли: '+window._errs.slice(0,2).join(' | '));
if(BAD.length)throw new Error('FAIL tfin_next: '+BAD.join(' ; ')+' · '+RES.join(' · '));
'tfin_next ok · '+RES.join(' · ')
