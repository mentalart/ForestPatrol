//@@ wait=400
// релиз: общий шаблон урока FIN.lesson (F-8): шаг ждёт кнопку, 8 с — показ, пропуск одним (2 с), «Показать урок ещё раз» в паузе
{const st=document.createElement('style');st.textContent='#finTut,#finBossHint{transition:none!important}';document.head.appendChild(st);}
window.L=ZC.FIN.lesson;window.B=[{attack:'KeyF',guard:'KeyG'},{attack:'Comma',guard:'Period'}];
window.card=()=>{const c=document.getElementById('finTut');return c&&c.classList.contains('on')?c:null;};
window.cardSt=()=>{const c=card();if(!c)return '-';const g=c.querySelector('.ft-go');return (c.querySelector('.ft-head')||{}).innerText.slice(0,40)+(g?' ['+g.innerText+']':'');};
window.mk=(w,voice)=>[{dur:30,p:[0,7.8,10],l:[0,2.4,-9.5],card:{tag:'Урок',title:'Щит',icon:'heads',text:'Нажми <b>щит</b>',keys:[{pi:0,a:'guard',wait:true}]},wait:w,voice:voice,done:(s,a)=>{window._done=a?'auto':'tap';}}];
ZC.startFrom(ZC.LV('4-B'));ZC.G.manual=true;ZC.FIN.boss4b.auto=false;ZC.tick(60);ZC.skip();ZC.tick(3);
ZC.W.flags.phase=0;const r=['lesson='+(typeof L.run),'has0='+L.has(),'cine='+!!ZC.G.cine];
window.ps=()=>{ZC.menu('pause');ZC.tick(2);const t=[...document.querySelectorAll('#finPanelP .fin-item')].map(e=>e.textContent);ZC.menuKey('Escape');ZC.tick(2);return t.some(x=>x.includes('Показать урок'));};
r.push('pause0='+ps());r
//@@ wait=400
// шаг ждёт кнопку: без нажатия карточка стоит, не заканчивается за 7 с
window._done=null;L.run(mk({who:0,a:'guard'}));ZC.tick(5);const r=['on='+L.on,'step='+L.steps];let n=0;
while(n<60*7&&!(card()&&card().querySelector('.ft-go')))n++,ZC.tick(1);
r.push('wait='+cardSt());ZC.tick(60*4);r.push('still='+cardSt(),'done='+window._done,'cine='+!!ZC.G.cine);
// нажали — «Получилось!», шаг доигрывается
ZC.press(B[0].guard);ZC.tick(3);r.push('tap='+cardSt(),'done='+window._done);r
//@@ wait=400
// конец урока (досмотр ~2,6 с) и снова: не нажали за 8 с — герои показывают сами
let n=0;while(ZC.G.cine&&n<60*30)ZC.tick(1),n++;const r=['ended on='+L.on];
window._done=null;L.run(mk({who:0,a:'guard'}));ZC.tick(5);let t=0;while(!window._done&&t<60*12)ZC.tick(1),t++;
r.push('auto after '+(t/60).toFixed(1)+'s','done='+window._done,'text='+cardSt(),'autos='+L.autos);r
//@@ wait=400
// пропуск одним игроком: держит прыжок 2 с
let n=0;while(ZC.G.cine&&n<60*30)ZC.tick(1),n++;const r=[];
L.run(mk({who:0,a:'guard'}));ZC.tick(70);ZC.hold('KeyM',true);let t=0;while(ZC.G.cine&&t<60*4)ZC.tick(1),t++;ZC.hold('KeyM',false);
r.push('skip after '+(t/60).toFixed(1)+'s','on='+L.on,'card='+cardSt());r
//@@ wait=400
// озвучка по id: несуществующий id не ломает шаг; повтор сокращённо
L.run(mk({who:0,a:'guard'},'нет_такой_реплики'));ZC.tick(10);const r=['voice-miss ok='+(L.on)];ZC.skip();ZC.tick(3);
r.push('seen0='+L.seen('tut4b',1));L.reminder({dur:9,p:[0,7.8,10],l:[0,2.4,-9.5],card:{title:'Щит',icon:'heads',text:'Щит!'}});ZC.tick(5);r.push(cardSt());let n=0;while(ZC.G.cine&&n<60*8)ZC.tick(1),n++;r.push('reminder '+(n/60).toFixed(1)+'s');r
//@@ wait=400
// «Показать урок ещё раз» в паузе: у 4-Б в бою (этап 1) пункт есть, нажатие запускает полный урок этапа
let n=0;while(ZC.G.cine&&n<60*30)ZC.tick(1),n++;ZC.W.flags.phase=1;ZC.tick(2);const r=['has='+L.has(),'pause='+ps()];
ZC.menu('pause');ZC.tick(2);const its=[...document.querySelectorAll('#finPanelP .fin-item')];const i=its.findIndex(e=>e.textContent.includes('Показать урок'));
for(let k=0;k<i;k++)ZC.menuKey('ArrowDown');ZC.menuKey('Enter');ZC.tick(5);r.push('idx='+i+'/'+its.length,'state='+ZC.G.state,'lesson on='+L.on,'card='+cardSt());
ZC.skip();ZC.tick(3);r.push('after skip on='+L.on,'again after end='+L.again());r
