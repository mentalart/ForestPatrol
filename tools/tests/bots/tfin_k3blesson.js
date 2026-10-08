//@@ wait=400
// 3-Б: уроки этапов 1–2 (одна механика — один урок): ≤ 25 с, шаг ждёт кнопку, пропуск одним игроком, повтор не показывается
{const st=document.createElement('style');st.textContent='#finTut,#finBossHint{transition:none!important}';document.head.appendChild(st);}
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));
window.L=ZC.FIN.lesson;
window.cardT=()=>{const c=document.getElementById('finTut');return c&&c.classList.contains('on')?(c.querySelector('.ft-head')||{}).innerText:'-';};
window.RUN=(max)=>{let n=0;while(ZC.G.cine&&n<60*(max||40))ZC.tick(1),n++;return n/60;};
ZC.startFrom(ZC.LV('3-B'));ZC.G.manual=true;ZC.tick(10);U.nocine();ZC.tick(5);
window.D=ZC.W.warp3b('boss');ZC.tick(5);for(let i=0;i<20&&ZC.G.cine&&!L.on;i++){ZC.skip();ZC.tick(2);}
// вход в бой: этап 1 запустил урок «Синяя волна»
const r=['phase='+D.F.phase];
let n=0;while(!L.on&&n<200)ZC.tick(1),n++;
r.push('on='+L.on,'card='+cardT());if(!L.on)throw new Error('урок этапа 1 не начался: '+r.join(' | '));
// не нажимаем: 8 с — показ, потом следующий урок цепочки; общая длина первого ≤ 25 с
let t=0;const tt=[];
while(L.on&&t<60*30)ZC.tick(1),t++;r.push('урок1 '+(t/60).toFixed(1)+' с');if(t/60>25)throw new Error('урок1 длиннее 25 с');
r.push('autos='+L.autos);r.join(' | ')
//@@ wait=400
// второй урок цепочки («Вода в клюв») — нажимаем кнопку Йоши; пропуск третьего
let n=0;while(!L.on&&n<120)ZC.tick(1),n++;const r=['card='+cardT()];
ZC.press('KeyL');ZC.tick(3);r.push('нажали, card='+(document.getElementById('finTut').innerText||'').replace(/\s+/g,' ').slice(-30));
let t=0;while(L.on&&t<60*30)ZC.tick(1),t++;r.push('урок2 '+(t/60).toFixed(1)+' с');if(t/60>25)throw new Error('урок2 длиннее 25 с');
for(let i=0;i<200&&ZC.G.cine;i++)ZC.tick(1);
r.push('seen wave='+L.seen('k3b','wave'),'seen water='+L.seen('k3b','water'),'phase='+D.F.phase,'errs='+_errs.length);r.join(' | ')
//@@ wait=400
// этап 2: урок «зайчик» из двух шагов (перо, щит) ≤ 25 с; пропуск одним игроком (2 с)
D.F.phase=0;ZC.W.warp3b('boss2');ZC.tick(5);let n=0;while(!L.on&&n<200)ZC.tick(1),n++;const r=['on='+L.on];
if(!L.on)throw new Error('урок этапа 2 не начался');
let t=0;while(L.on&&t<60*30)ZC.tick(1),t++;r.push('урок «зайчик» '+(t/60).toFixed(1)+' с');if(t/60>25)throw new Error('зайчик длиннее 25 с');
r.push('seen spot='+L.seen('k3b','spot'),'errs='+_errs.length);r.join(' | ')
//@@ wait=400
// пропуск: повторный урок (регистрация «Показать урок ещё раз») держим прыжок 2 с
for(let i=0;i<400&&ZC.G.cine;i++)ZC.tick(1);const r=['has='+L.has()];
L.again();ZC.tick(70);r.push('again on='+L.on);ZC.hold('KeyM',true);let t=0;while(ZC.G.cine&&t<60*4)ZC.tick(1),t++;ZC.hold('KeyM',false);
r.push('skip after '+(t/60).toFixed(1)+' с','on='+L.on,'errs='+_errs.length);if(L.on)throw new Error('пропуск не сработал');r.join(' | ')
//@@ wait=400
// этап 3: уроки «вихрь» и «родео» — каждый ≤ 25 с, цепочка продолжается после нажатия
D.F.phase=0;ZC.W.warp3b('boss3');ZC.tick(5);let n=0;while(!L.on&&n<200)ZC.tick(1),n++;const r=['on='+L.on,'card='+cardT()];
if(!L.on)throw new Error('урок этапа 3 не начался');
let t=0;while(L.on&&t<60*30)ZC.tick(1),t++;r.push('этап 3: уроки '+(t/60).toFixed(1)+' с');if(t/60>50)throw new Error('уроки этапа 3 длиннее 2×25 с');
r.push('seen vortex='+L.seen('k3b','vortex'),'errs='+_errs.length);r.join(' | ')
//@@ wait=400
// этап 4: «выдох» и «вдох» (два шага: взор, рогатка)
D.F.phase=0;ZC.W.warp3b('boss4');ZC.tick(5);let n=0;while(!L.on&&n<200)ZC.tick(1),n++;const r=['on='+L.on,'card='+cardT()];
if(!L.on)throw new Error('урок этапа 4 не начался');
let t=0;while(L.on&&t<60*40)ZC.tick(1),t++;r.push('этап 4: уроки '+(t/60).toFixed(1)+' с');if(t/60>50)throw new Error('уроки этапа 4 длиннее 2×25 с');
r.push('seen exhale='+L.seen('k3b','exhale'),'seen inhale='+L.seen('k3b','inhale'),'errs='+_errs.length);r.join(' | ')
