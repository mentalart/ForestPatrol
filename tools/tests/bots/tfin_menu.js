//@@ wait=6500 shot=fin_title.png
// релиз: титул и главное меню (в режиме ?debug заставка пропускается и меню открывается сразу)
const F=ZC.FIN;[ 'title='+F.titleOn,'state='+ZC.G.state,[...document.querySelectorAll('#finPanel .fin-item')].map(e=>e.textContent.replace(/‹.*›/,'').split(/[a-zа-я]{2,}$/)[0].slice(0,11)).join(','),'sel='+F.menu.sel].join(' | ')
//@@
// заставка: любая клавиша пропускает её и открывает титул
ZC.FIN.splash();const on=!document.getElementById('finSplash').classList.contains('fin-hide');ZC.menuKey('Enter');['splash='+on,'after='+ZC.FIN.splashOn,'title='+ZC.FIN.titleOn].join(' ')
//@@
// режим меняется стрелками прямо в меню
ZC.menuKey('ArrowDown');ZC.menuKey('ArrowDown');const a=ZC.G.solo;ZC.menuKey('ArrowRight');const b=ZC.G.solo;ZC.menuKey('ArrowLeft');['solo '+a+'→'+b+'→'+ZC.G.solo].join(' ')
//@@ wait=1500
// новая игра: затемнение и пролог
ZC.menuKey('ArrowUp');ZC.menuKey('ArrowUp');ZC.menuKey('Enter');'new'
//@@
[ZC.G.state,ZC.W.levelId,'title='+ZC.FIN.titleOn,'ui='+getComputedStyle(document.getElementById('ui')).display].join(' ')
//@@ wait=400 shot=fin_pause.png
ZC.menu('pause');[ZC.G.state,!document.getElementById('finPause').classList.contains('fin-hide'),document.querySelectorAll('#finPanelP .fin-item').length].join(' ')
//@@
ZC.menuKey('ArrowDown');ZC.menuKey('Enter');const h=document.querySelector('#finPanelP .fin-head').textContent;ZC.menuKey('Escape');[h,'back='+(!document.querySelector('#finPanelP .fin-head'))].join(' ')
//@@ wait=1500
// выход в главное меню
ZC.menuKey('ArrowDown');ZC.menuKey('ArrowDown');ZC.menuKey('ArrowDown');ZC.menuKey('Enter');'exit'
//@@
[ZC.G.state,'title='+ZC.FIN.titleOn,'ui='+getComputedStyle(document.getElementById('ui')).display].join(' ')
