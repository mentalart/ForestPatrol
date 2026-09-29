//@@
// релиз final06: звук с первого нажатия — «Нажмите любую кнопку» перед заставкой, голос заставки (Кот: «Абадзех-Лаб! Лаборатория творчества.»),
// звуки меню (гусли: у пункта своя нота; выбор — колокольчики; назад — нота вниз; на паузе приглушённо). Нажатия — настоящие (key=), как у игрока.
window.SND=[];{const A=ZC.FIN.aud;for(const k of['osc','nz','bell','thump']){const f=A[k];A[k]=function(o,p){SND.push({k,f:k==='bell'?o:o&&o.f0,lp:o&&o.lp});return f.apply(this,arguments);};}}
window.snd=()=>{const s=SND.slice();SND.length=0;return s;};
ZC.FIN.splash({gate:true});const el=document.getElementById('finSplash'),g=el.querySelector('.fs-gate');
['splashOn='+ZC.FIN.splashOn,'gating='+el.classList.contains('fs-gating'),'gate='+(g&&getComputedStyle(g).display),'text='+(g&&g.innerText.replace(/\n/g,' | ')),'audio='+ZC.FIN.audioState()].join(' ')
//@@ shot=fin_gate.png wait=300
// экран ждёт: заставка не началась, клавиши меню не срабатывают
const el=document.getElementById('finSplash');['play='+el.classList.contains('fs-play'),'title='+ZC.FIN.titleOn,'vox='+ZC.FIN.vox.cur].join(' ')
//@@ key=Space wait=1800 shot=fin_splash_voice.png
// настоящее нажатие: звук включён, заставка пошла (и это нажатие её не пропустило)
const el=document.getElementById('finSplash');const r=['audio='+ZC.FIN.audioState(),'gating='+el.classList.contains('fs-gating'),'play='+el.classList.contains('fs-play'),'splashOn='+ZC.FIN.splashOn];
if(!ZC.FIN.splashOn||!el.classList.contains('fs-play'))throw new Error('нажатие на экране «Нажмите любую кнопку» пропустило заставку: '+r.join(' '));r.join(' ')
//@@ wait=3500
// ≈1,8 с — заставка с голосом (кадр), проверка голоса — чуть позже
const r=['vox='+ZC.FIN.vox.cur,'sounds='+snd().length];if(ZC.FIN.vox.cur!=='splash_001')throw new Error('голос заставки не звучит: '+r.join(' '));r.join(' ')
//@@ wait=150
// голос договорил, заставка ушла в титул
const r=['vox='+ZC.FIN.vox.cur,'played='+ZC.FIN.vox.played,'splashOn='+ZC.FIN.splashOn,'title='+ZC.FIN.titleOn,'menu='+(ZC.FIN.menu&&ZC.FIN.menu.id)];if(ZC.FIN.splashOn)throw new Error('заставка не закончилась: '+r.join(' '));snd();window.MV=[];r.join(' ')
//@@ wait=150
// меню: вниз, вниз, вверх — у каждого пункта своя нота
window.mv=k=>{ZC.menuKey(k);const s=snd();MV.push(ZC.FIN.menu.sel+':'+(s.filter(x=>x.k==='osc').map(x=>Math.round(x.f))[0]||''));return MV.join(' → ');};mv('ArrowDown')
//@@ wait=150
mv('ArrowDown')
//@@ wait=150
mv('ArrowUp')
//@@ wait=150
const notes=MV.map(x=>x.split(':')[1]);if(notes.some(n=>!n))throw new Error('нет звука перемещения: '+MV.join(' '));if(notes[0]===notes[1]||notes[0]!==notes[2])throw new Error('ноты пунктов не различаются: '+MV.join(' '));'move '+MV.join(' → ')
//@@ wait=300
// выбор («Настройки» — подменю): колокольчики; назад: нота вниз
for(let k=0;k<8&&!/Настройки/.test(ZC.FIN.menu.items[ZC.FIN.menu.sel].label);k++)ZC.menuKey('ArrowDown');snd();ZC.menuKey('Enter');const a=snd();ZC.menuKey('Escape');const b=snd();
const r=['ok bells='+a.filter(x=>x.k==='bell').length,'back osc='+b.filter(x=>x.k==='osc').map(x=>Math.round(x.f)).join(',')];if(!a.some(x=>x.k==='bell')||!b.length)throw new Error('нет звука выбора/назад: '+r.join(' '));r.join(' ')
//@@ wait=400
// пауза: те же ноты, приглушённо (ниже срез фильтра)
ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(5);ZC.menu('pause');snd();ZC.menuKey('ArrowDown');const s=snd().filter(x=>x.k==='osc'&&x.lp);
const r=['state='+ZC.G.state,'pause lp='+s.map(x=>x.lp).join(',')];if(!s.length||s[0].lp>2000)throw new Error('на паузе звук не приглушён: '+r.join(' '));r.join(' ')
