//@@
// релиз, Ctrl+Alt+] «Все уровни открыты» → Лукоморье: Кот не встречает репликой конца игры «Садитесь — начну рассказ!»
// (rep_30_luko.py). Проверка от обратного: без флага devAll у пройденной игры реплика на месте.
// LV('luko')
localStorage.clear();'prepared'
//@@ reload=1
document.body.dispatchEvent(new KeyboardEvent('keydown',{code:'BracketRight',key:'ъ',ctrlKey:true,altKey:true,bubbles:true}));
const d=ZC.FIN.readSave();['devAll='+!!d.G.flags.devAll,'w5done='+!!d.G.flags.w5done].join(' | ')
//@@ wait=300
ZC.menuKey('ArrowDown');ZC.menuKey('ArrowDown');ZC.menuKey('Enter');
const i=ZC.FIN.menu.items.findIndex(x=>/Лукоморье/.test(x.label));ZC.FIN.menu.sel=i;ZC.menuKey('Enter');'go luko (item '+i+')'
//@@ wait=2000
ZC.tick(20);['state='+ZC.G.state,'level='+ZC.W.levelId].join(' ')
//@@
// 6 с игры: реплика звучала бы через 0,8 с после входа
window._kot=0;for(let k=0;k<24;k++){ZC.sim(0.25);if(/начну рассказ/.test(document.body.innerText))window._kot++;}
['level='+ZC.W.levelId,'state='+ZC.G.state,'devAll='+!!ZC.G.flags.devAll,'kotLine='+window._kot].join(' | ')
//@@
// от обратного: та же пройденная игра без devAll — Кот зовёт слушать сказку
ZC.G.flags.devAll=false;ZC.loadLevel(ZC.LV('luko'));window._kot2=0;for(let k=0;k<24;k++){ZC.sim(0.25);if(/начну рассказ/.test(document.body.innerText))window._kot2++;}
const ok=ZC.W.levelId==='luko'&&window._kot===0&&window._kot2>0;
['kotLineNoDev='+window._kot2,ok?'devluko ok':'FAIL devluko kot='+window._kot+' kot2='+window._kot2].join(' | ')
