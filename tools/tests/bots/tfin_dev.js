//@@
// релиз, клавиши разработчика: Ctrl+Alt+] открывает все уровни, Ctrl+Alt+[ стирает все данные игры и перезапускает её как в первый раз
localStorage.clear();
// «игрок» уже что-то купил в лавке и поменял настройки
localStorage.setItem('zlatayaCep.wardrobe.v1',JSON.stringify({owned:{fartuk:true},wear:{proshka:{body:'fartuk'}},dance:null}));
localStorage.setItem('zlatayaCep.settings.v1',JSON.stringify({mus:0.3,ts:1.3}));'prepared'
//@@ reload=1
const it=[...document.querySelectorAll('#finPanel .fin-item')];['title='+ZC.FIN.titleOn,'continue='+(it[0].className.includes('fin-off')?'off':'on'),'mus='+ZC.FIN.set.mus,'open='+ZC.FIN.chapterList().filter(c=>c.open).map(c=>c.id).join(',')].join(' | ')
//@@ wait=400 shot=fin_dev_unlock.png
document.body.dispatchEvent(new KeyboardEvent('keydown',{code:'BracketRight',key:'ъ',ctrlKey:true,altKey:true,bubbles:true}));
const d=ZC.FIN.readSave(),L=ZC.FIN.chapterList(),it=[...document.querySelectorAll('#finPanel .fin-item')];
['saved='+!!d,'w5done='+!!(d&&d.G.flags.w5done),'done='+Object.keys(d.G.done).length,'chapters='+L.length,'closed='+L.filter(c=>!c.open).length,'zast='+L.filter(c=>c.id.startsWith('z-')).length,
 'continue='+(it[0].className.includes('fin-off')?'off':'on'),'toast='+document.getElementById('finDev').textContent,'mus='+ZC.FIN.set.mus].join(' | ')
//@@ wait=300 shot=fin_dev_chapters.png
ZC.menuKey('ArrowDown');ZC.menuKey('ArrowDown');ZC.menuKey('Enter');[document.querySelector('.fin-head').textContent,ZC.FIN.menu.items.filter(i=>!i.off).length+' открыто из '+ZC.FIN.menu.items.length].join(' | ')
//@@ wait=2000
// переход на закрытый раньше уровень прямо из «Глав»
const i=ZC.FIN.menu.items.findIndex(x=>/^4-3/.test(x.label));ZC.FIN.menu.sel=i;ZC.menuKey('Enter');'go 4-3 (item '+i+')'
//@@
ZC.tick(20);const p=ZC.players[0];['state='+ZC.G.state,'level='+ZC.W.levelId,'hub='+ZC.G.hub,'title='+ZC.FIN.titleOn].join(' ')
//@@
// повторное нажатие посреди уровня: уровень идёт дальше, выбранный герой не меняется
ZC.press('KeyQ');ZC.tick(2);const a0=ZC.players[0].act;
document.body.dispatchEvent(new KeyboardEvent('keydown',{code:'BracketRight',key:']',ctrlKey:true,altKey:true,bubbles:true}));ZC.tick(10);
['level='+ZC.W.levelId,'actKept='+(ZC.players[0].act===a0),'state='+ZC.G.state].join(' ')
//@@
// «Новая игра» снимает отметку вместе со старым прогрессом: после первого нового сохранения «Главы» снова обычные
ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(30);ZC.W.links=4;ZC.finishLevel();const L=ZC.FIN.chapterList(),d=ZC.FIN.readSave();
['devAll='+!!d.G.flags.devAll,'open='+L.filter(c=>c.open).map(c=>c.id).join(','),'zast='+L.filter(c=>c.id.startsWith('z-')).length].join(' | ')
//@@
document.body.dispatchEvent(new KeyboardEvent('keydown',{code:'BracketRight',key:']',ctrlKey:true,altKey:true,bubbles:true}));ZC.tick(5);
const L=ZC.FIN.chapterList();['again: chapters='+L.length,'closed='+L.filter(c=>!c.open).length,'got11='+ZC.FIN.readSave().G.got['1-1']].join(' | ')
//@@ shot=fin_dev_wipe.png
document.body.dispatchEvent(new KeyboardEvent('keydown',{code:'BracketLeft',key:'х',ctrlKey:true,altKey:true,bubbles:true}));
// до перезапуска игра уже ничего не может записать обратно
ZC.G.hub=true;ZC.FIN.saveGame();ZC.FIN.saveSettings();localStorage.setItem('zlatayaCep.wardrobe.v1','{}');
['keys='+Object.keys(localStorage).filter(k=>k.startsWith('zlatayaCep.')).join(','),'toast='+document.getElementById('finDev').textContent].join(' | ')
//@@ wait=7000
'waiting for reload'
//@@ shot=fin_dev_clean.png
// перезагрузка после стирания — ждём, пока игра снова загрузится и покажет меню (раньше это время давал снимок кадра; в CI снимков нет)
(async()=>{const t0=Date.now();while(!(window.ZC&&ZC.FIN&&document.querySelector('#finPanel .fin-item'))&&Date.now()-t0<60000)await new Promise(r=>setTimeout(r,100));
const it=[...document.querySelectorAll('#finPanel .fin-item')];
return ['keys='+Object.keys(localStorage).filter(k=>k.startsWith('zlatayaCep.')).join(','),'save='+ZC.FIN.readSave(),'continue='+(it[0].className.includes('fin-off')?'off':'on'),
 'mus='+ZC.FIN.set.mus,'open='+ZC.FIN.chapterList().filter(c=>c.open).map(c=>c.id).join(','),'title='+ZC.FIN.titleOn].join(' | ');})()
