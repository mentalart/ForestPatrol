//@@ wait=700
// релиз: заставка студии «АбадзехLAB · Лаборатория творчества» — логотип кодом, моушн, выход «пузырём» в титул, пропуск клавишей
ZC.FIN.splash();const el=document.getElementById('finSplash');['on='+ZC.FIN.splashOn,'shown='+!el.classList.contains('fin-hide'),'letters='+el.querySelectorAll('.fs-name span').length+'+'+el.querySelectorAll('.fs-sub span').length].join(' ')
//@@ wait=350 shot=fin_splash_mid.png
// середина: «А» выпрыгнула, пузырьки летят, буквы названия выпрыгивают
const el=document.getElementById('finSplash');['play='+el.classList.contains('fs-play'),'font='+(document.fonts.check('600 40px ZCComfortaa')&&document.fonts.check('300 40px ZCComfortaa')),'seek='+ZC.FIN.splashSeek(2.2)].join(' ')
//@@
const n=[...document.querySelectorAll('#finSplash .fs-bub circle.fs-solid')].filter(c=>+c.getAttribute('r')>0).length;'t=2.2 bubbles='+n+' liquid='+(document.querySelector('#finSplash .fs-liq').getAttribute('d').length>40)+' A='+(+getComputedStyle(document.querySelector('#finSplash .fs-a')).opacity>0.5)
//@@ wait=350 shot=fin_splash_logo.png
// итоговый кадр — как логотип: колба, «А», волна, 5 пузырьков, название
ZC.FIN.splashSeek(4.3);'seek 4.3'
//@@
const cs=[...document.querySelectorAll('#finSplash .fs-bub circle.fs-solid')];const lab=getComputedStyle(document.querySelector('#finSplash .fs-lab')).color;
['bubbles='+cs.filter(c=>+c.getAttribute('r')>0).length,'glass='+getComputedStyle(document.querySelector('#finSplash .fs-glass')).strokeDashoffset,'A='+getComputedStyle(document.querySelector('#finSplash .fs-a')).opacity,'labWhite='+(lab==='rgb(253, 248, 239)')].join(' ')
//@@ wait=350 shot=fin_splash_exit.png
// выход: пузырь из колбы раскрывает титул
ZC.FIN.splashSeek(4.3,0.45);'exit'
//@@
const s=document.getElementById('finSplash').style;['on='+ZC.FIN.splashOn,'title='+ZC.FIN.titleOn,'mask='+/radial-gradient/.test(s.maskImage||s.webkitMaskImage)].join(' ')
//@@ wait=500
ZC.FIN.splashSeek(4.3,1);'finish'
//@@ wait=1300
// пропуск клавишей сразу после старта
const hid=document.getElementById('finSplash').classList.contains('fin-hide');ZC.FIN.splash();ZC.menuKey('Enter');['hiddenAfterExit='+hid,'skip on='+ZC.FIN.splashOn,'title='+ZC.FIN.titleOn].join(' ')
//@@
'hiddenAfterSkip='+document.getElementById('finSplash').classList.contains('fin-hide')
