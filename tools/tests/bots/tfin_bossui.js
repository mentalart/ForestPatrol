//@@
// релиз final06, интерфейс боссов (аудит боссов F-2a): шрифт карточек подсказок ≥ 3 % высоты окна (заголовок ≥ 4 %) на 1280×720
// и 1920×1080, плашка пропуска не налезает на субтитры, баннер не налезает на видимые карточки. Окно в ботах — 1280×720:
// для 1080p правило из fin.css считается подстановкой vh (1 % = 10,8 px).
window.ERR=[];window.addEventListener('error',e=>ERR.push(String(e.message)));{const ce=console.error;console.error=(...a)=>{ERR.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};
// прозрачность — по заданной (переход в браузере без экрана не идёт)
window.R=id=>{const e=document.getElementById(id);if(!e)return null;const cs=getComputedStyle(e);if(cs.display==='none'||cs.visibility==='hidden'||+(e.style.opacity!==''?e.style.opacity:e.classList.contains('hn-card')?1:cs.opacity)<0.05)return null;return e.getBoundingClientRect();};
window.area=(r,q)=>!r||!q?0:Math.max(0,Math.min(r.right,q.right)-Math.max(r.left,q.left))*Math.max(0,Math.min(r.bottom,q.bottom)-Math.max(r.top,q.top));
window.cardsOn=()=>['hint0','hint1','hintS'].filter(id=>{const e=document.getElementById(id);return e&&e.classList.contains('on')&&!e.classList.contains('hn-yield')&&R(id);});
// размер шрифта (px) на высоте окна h: правило .hn-card / .hn-head.hn-short из fin.css с подстановкой vh
window.fontAt=(sel,h)=>{const probe=document.createElement('div');document.body.appendChild(probe);let out=0;
  for(const sh of document.styleSheets){let rules;try{rules=sh.cssRules;}catch(e){continue;}for(const r of rules)if(r.selectorText===sel){const v=r.style.getPropertyValue('font-size')||r.style.getPropertyValue('--hnf')||r.cssText.match(/font:[^;]*?calc\(([^;]*)\)\/[\d.]+/)?.[1]||'';
    if(!v)continue;probe.style.fontSize=v.replace(/([\d.]+)vh/g,(m,n)=>(n*h/100)+'px');out=parseFloat(getComputedStyle(probe).fontSize);}}
  probe.remove();return out;};
window.tipOn=()=>{const W=ZC.W;for(const pi of[0,1])ZC.players[pi].tipT=0;W.tipZones.unshift({cond:()=>true,text:pi=>'Невод держат двое на камнях. Встань у ракушки лицом к середине озера '+(pi?'<kbd>;</kbd>':'<kbd>R</kbd>')+'.'});ZC.sim(0.5);for(let i=0;i<6&&!cardsOn().length;i++)ZC.sim(0.5);};
window.go=id=>{ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.tick(20);for(let k=0;k<8;k++){if(ZC.G.cine)ZC.skip();ZC.sim(0.5);}};
window.hnf=h=>{const probe=document.createElement('div');probe.className='hn-card';document.body.appendChild(probe);const v=getComputedStyle(probe).getPropertyValue('--hnf');probe.remove();return v;};
['ok']
//@@
// шрифт карточек: при 720p — по вычисленным стилям, при 1080p — по правилу
go('2-3');tipOn();const C=cardsOn();chk(C.length>0,'нет видимых карточек подсказок');
const H=innerHeight;let min=1e9;for(const id of C){const e=document.getElementById(id);for(const n of e.querySelectorAll('.hn-body,.hn-head')){const px=parseFloat(getComputedStyle(n).fontSize);min=Math.min(min,px/H);
  chk(px/H>=0.03-1e-3,id+' '+n.className+': '+px.toFixed(1)+' px = '+(100*px/H).toFixed(2)+' % высоты');if(n.classList.contains('hn-short'))chk(px/H>=0.04-1e-3,id+' заголовок '+(100*px/H).toFixed(2)+' % < 4 %');}}
// 1080p: подстановка высоты в clamp() из fin.css — карточка (--hnf) и крупная строка (.hn-short)
let css='';for(const sh of document.styleSheets){try{for(const r of sh.cssRules)css+=r.cssText+'\n';}catch(e){}}
const m1=/--hnf:\s*clamp\(([\d.]+)px,\s*([\d.]+)vh,\s*([\d.]+)px\)/.exec(css),m2=/\.hn-head\.hn-short\s*\{[^}]*clamp\(([\d.]+)px,\s*([\d.]+)vh,\s*([\d.]+)px\)/.exec(css);
chk(!!m1&&!!m2,'в fin.css нет clamp() по vh для карточки и заголовка');
if(m1&&m2){for(const h of[720,1080]){const b=Math.min(Math.max(+m1[1],+m1[2]*h/100),+m1[3]),t=Math.min(Math.max(+m2[1],+m2[2]*h/100),+m2[3]);
  chk(b/h>=0.03-1e-3,'карточка при '+h+'p: '+b.toFixed(1)+' px = '+(100*b/h).toFixed(2)+' %');chk(t/h>=0.04-1e-3,'заголовок при '+h+'p: '+t.toFixed(1)+' px = '+(100*t/h).toFixed(2)+' %');}}
['min %='+(100*min).toFixed(2),'cards='+C.join(','),'замечания: '+(BAD.join('; ')||'нет')]
//@@ shot=bossui_banner.png
// баннер события: видимые карточки не налезают на баннер (карточка, что задета, уступает — hn-yield)
go('2-3');tipOn();const b=document.getElementById('banner');b.innerHTML='Вал догнал!<small>Беги вместе — держись правее</small>';b.style.opacity=1;ZC.FIN.hints.layout();
const B=R('banner');const over=cardsOn().filter(id=>area(R(id),B)>6);chk(!!B,'баннер не виден');chk(over.length===0,'карточки под баннером: '+over);
['cards='+cardsOn(),'over='+over.join(','),'замечания: '+(BAD.join('; ')||'нет')]
//@@ shot=bossui_bossbanner.png
// F-2d: баннер и подсказка босса (#finBossHint) не перекрываются — подсказка встаёт под баннер и возвращается, когда он погас
go('2-3');let fb=document.getElementById('finBossHint');if(!fb){fb=document.createElement('div');fb.id='finBossHint';document.body.appendChild(fb);}const bn=document.getElementById('banner');
fb.innerHTML='<div class="fh-title">Громовой Баран</div><div class="fh-text">Таран бежит на свет пера — замани его на камень</div>';fb.classList.add('on');
bn.innerHTML='Увяз!<small>Бейте в свете! Потап — за рога! Шерсть мягкая — не бейте мимо</small>';bn.style.opacity=1;ZC.FIN.hints.layout();
const FB=R('finBossHint'),BN=R('banner');chk(!!FB&&!!BN,'подсказка босса или баннер не видны');
const ob=area(FB,BN);chk(ob===0,'баннер × подсказка босса: '+ob.toFixed(0)+' px²');chk(FB&&FB.height/innerHeight>0.03,'подсказка босса ниже 3 % высоты');
bn.style.opacity=0;ZC.FIN.hints.layout();const back=fb.style.top==='';chk(back,'подсказка босса не вернулась на место после баннера');fb.classList.remove('on');
['banner×finBossHint px²='+ob.toFixed(0),'вернулась='+back,'замечания: '+(BAD.join('; ')||'нет')]
//@@ shot=bossui_bossbar_vest.png
// F-2e: полоса босса, «весточка» (#vest) и карточка обучения 4-Б (#finTut) не перекрываются; полоса остаётся видимой
for(const id of['2-1','4-B','5-1']){go(id);const bb=document.getElementById('bossbar'),vs=document.getElementById('vest'),ft=document.getElementById('finTut')||(()=>{const d=document.createElement('div');d.id='finTut';document.body.appendChild(d);return d;})();
  bb.innerHTML='<b>Лихо Одноглазое</b> · стадия 3 / 12 · <span class="seg"><i style="width:60%"></i></span>';bb.style.display='block';
  vs.textContent='Весточка: Пелагея принесла вести — держитесь вместе, лес рядом, ягоды на пне';vs.style.display='block';
  ft.innerHTML='<div class="ft-head">Урок: щит</div><div class="ft-body">Держи щит против огня и не стой в луже, пока Горыныч дышит</div>';ft.classList.add('on');ZC.FIN.hints.layout();
  const B=R('bossbar'),V=R('vest'),F=R('finTut');chk(!!B,id+': полоса босса не видна');const W=innerWidth*innerHeight;
  chk(!V||area(B,V)===0,id+': полоса × весточка '+area(B,V).toFixed(0)+' px²');chk(!F||area(B,F)===0,id+': полоса × урок '+area(B,F).toFixed(0)+' px²');chk(!V||!F||area(V,F)===0,id+': весточка × урок');
  bb.style.display='none';vs.style.display='none';ft.classList.remove('on');ZC.FIN.hints.layout();}
// окно бота 1280×720; на 1080p полоса и «весточка» — в px, карточка урока — по vh, расчёт hnLayout тот же
['замечания: '+(BAD.join('; ')||'нет'),'errs='+ERR.length+(ERR[0]?' '+ERR[0]:''),BAD.length===0&&ERR.length===0?'ok':'FAIL']
//@@ shot=bossui_subs.png
// плашка пропуска и субтитры: короткая и длинная (три строки) реплика
go('2-3');const sb=document.getElementById('subs'),sk=document.getElementById('skip');let worst=0;
for(const t of['<b>Звенышек:</b> Прыгай!','<b>Звенышек:</b> Слушай внимательно, Ёжик: когда Леший поднимает руку — прыгай через скакалку, а когда замахнётся вторая — береги бубенец и держись друга, вместе справитесь, ведь один в поле не воин!']){
  sb.innerHTML=t;sb.style.display='block';sk.style.display='flex';ZC.FIN.hints.layout();const S=R('subs'),K=R('skip');chk(!!S&&!!K,'субтитры или плашка не видны');
  if(S&&K){const a=area(S,K);worst=Math.max(worst,a);chk(a===0,'плашка пропуска × субтитры: '+a.toFixed(0)+' px²');chk(K.bottom<=S.top,'плашка не над субтитрами');}}
sb.style.display='none';sk.style.display='none';
['skip×subs px²='+worst.toFixed(0),'замечания: '+(BAD.join('; ')||'нет'),'errs='+ERR.length+(ERR[0]?' '+ERR[0]:''),BAD.length===0&&ERR.length===0?'ok':'FAIL']
