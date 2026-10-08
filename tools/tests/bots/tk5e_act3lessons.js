//@@
// @timeout=900
// B6-b3 · 5-Б2, уроки акта III (стадии 8–12, «репка»): каждый ≤ 25 с, сумма ≤ 40 % прежних 267,0 с,
// ни одной реплики длиннее 10 слов; пропуск одним игроком (прыжок 2 с); «Показать урок ещё раз» в паузе (FIN.lesson.again) запускает урок стадии 8 снова.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,300));_ce.apply(console,arguments);};}
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.E5=ZC.FIN.k5e;
// запустить урок key: stage — стадия (по умолчанию key), home — после стадии идёт поездка домой, pro — отрезок пролога, repka — «репка» финала;
// solo — один игрок; full — досмотреть до конца без пропуска. Возвращает строку-отчёт; любая ошибка страницы или кадра — исключение.
window.LES=(key,o)=>{o=o||{};const e0=_errs.length,n=o.stage!=null?o.stage:(typeof key==='number'?key:4);E5.lessonN={};E5.saidPage={};ZC.setSolo(!!o.solo);E5.goStage(n);ZC.G.manual=true;
  if(o.home)E5.pageHome(n,()=>{});
  if(o.repka)E5.repka(()=>{});
  if(o.pro){ZC.tick(20);const P=E5.pro,D=P.dbg();for(let k=0;k<400&&(ZC.G.cine||P.leg==='intro');k++){if(o.pro==='forest'&&E5.lessonOn==='pro')break;if(ZC.G.cine)ZC.skip();ZC.tick(3);}
    ({gorge:()=>{P.leg='forest';D.GP.z=D.GZ[0]-1;},sea:()=>{P.leg='gorge';D.GP.z=D.GZ[1]-1;},sky:()=>{P.leg='sea';P.wave=99;D.crows.length=0;D.GP.z=D.GZ[1]-700;},
      write:()=>{P.leg='sky';P.vi=P.VQ.length;P.vT=0;D.orbs.length=0;},three:()=>{P.leg='write';P.wi=P.WQ.length;D.letters.length=0;},forest:()=>{}})[o.pro]();}
  let k=0;while(k<500&&!(ZC.G.cine&&E5.lessonOn===key)){
    if(E5.es&&E5.es.step==='walk'&&E5.pages&&E5.cur>=4&&E5.cur<=7&&!ZC.G.cine){const P=E5.pages[E5.cur-3];[0,1].forEach((pi,j)=>{const pl=ZC.players[pi],h=pl.heroes[pl.act];h.pos.set(P.pos.x-0.5+j,0.05,P.pos.z);h.vel.set(0,0,0);});}
    if(ZC.G.cine&&E5.lessonOn!==key)ZC.skip();ZC.tick(5);k++;}
  if(!(ZC.G.cine&&E5.lessonOn===key))throw new Error('урок '+key+' не начался (cur='+E5.cur+')');
  const dur=ZC.G.cine.dur,warn=(E5.lessonWarn||[]).slice();RES[key]=dur;{const ws=[];for(const q of E5.lessonSays||[]){const t=String(q[3]).replace(/<[^>]*>/g,' ');ws.push([t.split(/\s+/).filter(x=>/[А-Яа-яЁёA-Za-z0-9]/.test(x)).length,t.slice(0,50)]);}WORDS.push([key,ws]);}
  if(!o.solo&&warn.length)throw new Error('урок '+key+': кадры — '+warn.slice(0,3).join(' | '));
  ZC.tick(120);ZC.sim(1/60);
  const tut=document.getElementById('finTut');if(tut&&tut.classList.contains('on'))throw new Error('урок '+key+': на экране карточка');
  for(const b of document.querySelectorAll('.bub'))if(b.style.display!=='none'&&/[А-Яа-яЁё]{3,}/.test(b.textContent))throw new Error('урок '+key+': кнопка-подсказка над героем: '+b.textContent.slice(0,40));
  if(o.full){let g=0;while(ZC.G.cine&&E5.lessonOn===key&&g<400){ZC.tick(60);g++;}if(E5.lessonOn===key)throw new Error('урок '+key+' не закончился сам за '+g+' с');}
  else{ZC.skip();ZC.tick(10);}
  if(E5.lessonOn!=null)throw new Error('урок '+key+': после пропуска lessonOn='+E5.lessonOn);
  ZC.tick(420);if(_errs.length>e0)throw new Error('урок '+key+' — ошибки: '+_errs.slice(e0,e0+3).join(' / '));
  return 'урок '+key+(o.solo?' (один)':'')+' '+dur.toFixed(1)+' с, кадры: '+warn.length+(o.full?', досмотрен':'');};

window.OLD={8:50.5,9:42.2,10:50.3,11:39.3,12:51.7,repka:32.9};
window.RES={};window.WORDS=[];
'ok'
//@@
LES(8)
//@@
LES(8,{solo:true})
//@@
LES(9)
//@@
LES(10)
//@@
LES(11)
//@@
LES(12)
//@@
LES(12,{solo:true})
//@@
LES('repka',{stage:12,repka:true})
//@@
// длительности: каждый ≤ 25 с; сумма акта ≤ 40 % прежней; реплики ≤ 10 слов
const r=[];let sum=0,old=0,bad=[];
for(const k of Object.keys(OLD)){const d=RES[k];if(d==null){bad.push('урок '+k+' не измерен');continue;}r.push(k+' '+d.toFixed(1));if(d>25)bad.push('урок '+k+' '+d.toFixed(1)+' с > 25');sum+=d;old+=OLD[k];}
for(const[k,ws]of WORDS)for(const[n,t]of ws)if(n>10)bad.push('урок '+k+': реплика '+n+' слов: '+t);
r.push('реплик проверено '+WORDS.reduce((a,x)=>a+x[1].length,0)+', длиннейшая '+Math.max(...WORDS.flatMap(x=>x[1].map(y=>y[0])))+' слов');r.push('акт III '+sum.toFixed(1)+' с из '+old.toFixed(1)+' ('+(sum/old*100).toFixed(0)+' %)');
if(sum>old*0.4)bad.push('сумма '+sum.toFixed(1)+' > 40 % от '+old.toFixed(1));
if(bad.length)throw new Error(bad.join(' | '));
r
//@@
// пропуск одним игроком: прыжок держит один — урок гаснет за ~2 с, не зависая
{E5.lessonN={};ZC.setSolo(false);E5.goStage(8);ZC.G.manual=true;let k=0;while(k<500&&!(ZC.G.cine&&E5.lessonOn===8)){if(ZC.G.cine&&E5.lessonOn!==8)ZC.skip();ZC.tick(5);k++;}
if(E5.lessonOn!==8)throw new Error('урок 8 не начался');ZC.tick(60);ZC.hold('Space',true);let t=0;while(ZC.G.cine&&t<60*5)ZC.tick(1),t++;ZC.hold('Space',false);
if(ZC.G.cine&&E5.lessonOn===8){ZC.hold('KeyM',false);}
if(E5.lessonOn===8)throw new Error('урок 8 не погас за 5 с');
'skip-one after '+(t/60).toFixed(1)+' s, lessonOn='+E5.lessonOn+', cine='+!!ZC.G.cine}
//@@
// «Показать урок ещё раз» в паузе — стадия 9 (после пропуска: пункт есть, по Enter урок идёт снова)
const L=ZC.FIN.lesson,r=[];
E5.lessonN={};ZC.setSolo(false);E5.goStage(9);ZC.G.manual=true;let k=0;
while(k<500&&!(ZC.G.cine&&E5.lessonOn===9)){if(ZC.G.cine&&E5.lessonOn!==9)ZC.skip();ZC.tick(5);k++;}
if(E5.lessonOn!==9)throw new Error('урок 9 не начался');
ZC.skip();ZC.tick(60);r.push('lesson9 skipped: on='+E5.lessonOn+' has='+L.has());
ZC.menu('pause');ZC.tick(2);let its=[...document.querySelectorAll('#finPanelP .fin-item')];const i=its.findIndex(e=>e.textContent.includes('Показать урок'));
if(i<0)throw new Error('нет пункта «Показать урок ещё раз» в паузе стадии 9');r.push('pause item='+i);
for(let q=0;q<i;q++)ZC.menuKey('ArrowDown');ZC.menuKey('Enter');
k=0;while(k<600&&!(ZC.G.cine&&E5.lessonOn===9)){if(ZC.G.cine&&E5.lessonOn!==9)ZC.skip();ZC.tick(5);k++;}
r.push('again: lessonOn='+E5.lessonOn);if(E5.lessonOn!==9)throw new Error('урок 9 по «ещё раз» не начался');
ZC.skip();ZC.tick(30);r.push('after skip on='+E5.lessonOn);if(E5.lessonOn!=null)throw new Error('урок не погас');r
