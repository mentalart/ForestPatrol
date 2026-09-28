//@@
// релиз: сохранение после уровня, «Продолжить» после перезагрузки, открытые главы, настройки не теряются
localStorage.clear();'cleared'
//@@ reload=1
const it=[...document.querySelectorAll('#finPanel .fin-item')].map(e=>e.className.includes('fin-off')?'off':'on');['title='+ZC.FIN.titleOn,'continue='+it[0],'sel='+ZC.FIN.menu.sel].join(' ')
//@@
ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(30);ZC.W.links=4;ZC.finishLevel();const d=ZC.FIN.readSave();['saved='+!!d,'done11='+!!(d&&d.G.done['1-1']),'got='+(d&&d.G.got['1-1'])].join(' ')
//@@
// настройки: громкость музыки 70% → 40%, размер текста 130%
ZC.FIN.set.mus=0.4;ZC.FIN.set.ts=1.3;ZC.FIN.saveSettings();'set'
//@@ reload=1
const it=[...document.querySelectorAll('#finPanel .fin-item')];[it[0].className.includes('fin-off')?'continue=off':'continue=on',it[0].querySelector('small')?it[0].querySelector('small').textContent:'-','mus='+ZC.FIN.set.mus,'ts='+getComputedStyle(document.documentElement).getPropertyValue('--fts').trim()].join(' | ')
//@@
ZC.menuKey('ArrowDown');ZC.menuKey('ArrowDown');ZC.menuKey('Enter');const L=ZC.FIN.chapterList();[document.querySelector('.fin-head').textContent,L.filter(c=>c.open).map(c=>c.id).join(','),'closed13='+!L.find(c=>c.id==='1-3').open].join(' | ')
//@@ wait=1500
ZC.menuKey('Escape');ZC.menuKey('ArrowUp');ZC.menuKey('ArrowUp');ZC.menuKey('Enter');'continue'
//@@
[ZC.G.state,ZC.W.levelId,'done11='+!!ZC.G.done['1-1'],'hub='+ZC.G.hub,'title='+ZC.FIN.titleOn].join(' ')
//@@ shot=fin_continue.png
ZC.tick(1);
