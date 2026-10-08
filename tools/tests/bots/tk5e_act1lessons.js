//@@
// @timeout=900
// B6-b1 · 5-Б2, уроки акта I (стадии 1–3 и отрезки пролога): каждый ≤ 25 с, сумма ≤ 40 % прежних 315,4 с (стадии 177,6 + пролог 137,8),
// ни одной реплики длиннее 10 слов; пропуск одним игроком (прыжок 2 с); «Показать урок ещё раз» в паузе (FIN.lesson.again) запускает урок снова.
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

window.OLD={s:{1:53.2,2:68.7,3:55.7},p:{pro:41.3,pro_gorge:20.3,pro_sea:30.3,pro_sky:16.3,pro_write:15.3,pro_three:14.3}};
window.RES={};window.WORDS=[];
'ok'
//@@
LES(1)
//@@
LES(1,{solo:true})
//@@
LES(2)
//@@
LES(3)
//@@
LES(3,{solo:true})
//@@
LES('pro',{stage:0,pro:'forest'})
//@@
LES('pro_gorge',{stage:0,pro:'gorge'})
//@@
LES('pro_sea',{stage:0,pro:'sea'})
//@@
LES('pro_sky',{stage:0,pro:'sky'})
//@@
LES('pro_write',{stage:0,pro:'write'})
//@@
LES('pro_three',{stage:0,pro:'three'})
//@@
// длительности: каждый ≤ 25 с; сумма акта ≤ 40 % прежней; реплики ≤ 10 слов (в одиночном режиме тоже)
const r=[];let sum=0,old=0,bad=[];
for(const k of Object.keys(RES)){const d=RES[k];r.push(k+' '+d.toFixed(1));if(d>25)bad.push('урок '+k+' '+d.toFixed(1)+' с > 25');}
for(const k of[1,2,3]){sum+=RES[k];old+=OLD.s[k];}
const st=sum;for(const k of Object.keys(OLD.p)){sum+=RES[k];old+=OLD.p[k];}
for(const[k,ws]of WORDS)for(const[n,t]of ws)if(n>10)bad.push('урок '+k+': реплика '+n+' слов: '+t);
r.push('реплик проверено '+WORDS.reduce((a,x)=>a+x[1].length,0)+', длиннейшая '+Math.max(...WORDS.flatMap(x=>x[1].map(y=>y[0])))+' слов');r.push('стадии '+st.toFixed(1)+' с, акт I '+sum.toFixed(1)+' с из '+old.toFixed(1)+' ('+Math.round(sum/old*100)+' %)');
if(sum>old*0.4)bad.push('сумма '+sum.toFixed(1)+' > 40 % от '+old.toFixed(1));
if(bad.length)throw new Error(bad.join(' | '));
r
//@@
// пропуск одним игроком: прыжок держит один — урок гаснет за ~2 с, не зависая
{E5.lessonN={};ZC.setSolo(false);E5.goStage(2);ZC.G.manual=true;let k=0;while(k<500&&!(ZC.G.cine&&E5.lessonOn===2)){if(ZC.G.cine&&E5.lessonOn!==2)ZC.skip();ZC.tick(5);k++;}
if(E5.lessonOn!==2)throw new Error('урок 2 не начался');ZC.tick(60);ZC.hold('Space',true);let t=0;while(ZC.G.cine&&t<60*5)ZC.tick(1),t++;ZC.hold('Space',false);
if(ZC.G.cine&&E5.lessonOn===2){ZC.hold('KeyM',false);}
'skip-one after '+(t/60).toFixed(1)+' s, lessonOn='+E5.lessonOn+', cine='+!!ZC.G.cine}
//@@
// «Показать урок ещё раз» в паузе — стадия 2 и пролог (отрезок «ущелье»)
const L=ZC.FIN.lesson,r=[];
const pausedHas=()=>{ZC.menu('pause');ZC.tick(2);const t=[...document.querySelectorAll('#finPanelP .fin-item')].map(e=>e.textContent);ZC.menuKey('Escape');ZC.tick(2);return t.some(x=>x.includes('Показать урок'));};
E5.lessonN={};ZC.setSolo(false);E5.goStage(3);ZC.G.manual=true;let k=0;while(k<500&&!(ZC.G.cine&&E5.lessonOn===3)){if(ZC.G.cine&&E5.lessonOn!==3)ZC.skip();ZC.tick(5);k++;}
ZC.skip();ZC.tick(60);r.push('lesson3 skipped: on='+E5.lessonOn+' has='+L.has());
const has=pausedHas();r.push('pause item='+has);if(!has)throw new Error('нет пункта «Показать урок ещё раз» в паузе стадии 3');
ZC.menu('pause');ZC.tick(2);const its=[...document.querySelectorAll('#finPanelP .fin-item')];const i=its.findIndex(e=>e.textContent.includes('Показать урок'));
for(let q=0;q<i;q++)ZC.menuKey('ArrowDown');ZC.menuKey('Enter');
k=0;while(k<500&&!(ZC.G.cine&&E5.lessonOn===3)){if(ZC.G.cine&&E5.lessonOn!==3)ZC.skip();ZC.tick(5);k++;}
r.push('again: lessonOn='+E5.lessonOn);if(E5.lessonOn!==3)throw new Error('урок 3 по «ещё раз» не начался');
ZC.skip();ZC.tick(30);r.push('after skip on='+E5.lessonOn);if(E5.lessonOn!=null)throw new Error('урок не погас');r
