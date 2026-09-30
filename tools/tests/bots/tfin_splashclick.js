//@@
// релиз final06: заставка после щелчка мышью. Экран «Нажмите любую кнопку» ловит pointerdown, а следом приходит click того же нажатия —
// раньше он попадал в пропуск заставки (щелчок по заставке её пропускает), и с мыши заставка не проигрывалась (с клавиатуры и джойстика — да).
// Проверка: щелчок по экрану ожидания — заставка идёт; следующий щелчок — пропускает её, как и раньше.
window.clickAt=el=>{const r=el.getBoundingClientRect(),o={bubbles:true,cancelable:true,composed:true,clientX:r.left+r.width/2,clientY:r.top+r.height/2,button:0,pointerType:'mouse',isPrimary:true};
  el.dispatchEvent(new PointerEvent('pointerdown',o));el.dispatchEvent(new MouseEvent('mousedown',o));el.dispatchEvent(new PointerEvent('pointerup',o));el.dispatchEvent(new MouseEvent('mouseup',o));el.dispatchEvent(new MouseEvent('click',o));};
ZC.FIN.splash({gate:true});const el=document.getElementById('finSplash');['splashOn='+ZC.FIN.splashOn,'gating='+el.classList.contains('fs-gating')].join(' ')
//@@ wait=600
// щелчок по экрану ожидания: pointerdown открывает заставку, click того же нажатия её не пропускает
const el=document.getElementById('finSplash');clickAt(el.querySelector('.fs-gate')||el);'click'
//@@ wait=1200
const el=document.getElementById('finSplash');const r=['splashOn='+ZC.FIN.splashOn,'play='+el.classList.contains('fs-play'),'gating='+el.classList.contains('fs-gating'),'spl='+JSON.stringify(ZC.FIN.splDbg())];
if(!ZC.FIN.splashOn||!el.classList.contains('fs-play'))throw new Error('щелчок мышью по «Нажмите любую кнопку» пропустил заставку: '+r.join(' '));r.join(' ')
//@@ wait=1500
// следующий щелчок — пропуск заставки, как и раньше
const el=document.getElementById('finSplash');clickAt(el);const r=['splashOn='+ZC.FIN.splashOn,'title='+ZC.FIN.titleOn];if(ZC.FIN.splashOn)throw new Error('щелчок по идущей заставке больше не пропускает её: '+r.join(' '));r.join(' ')
