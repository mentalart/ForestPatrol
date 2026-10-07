//@@
// @timeout=900
// Битва с Кощеем (сборка --k5epic): обучающие катсцены вместо подсказок. Дверь на страницу, «репка» финала, полёты домой (ступа, кит, Горыныч), пролог.
// Каждый урок: идёт после основного ролика стадии, кадры не выводят героев за экран (E.lessonWarn пуст — вдвоём), на экране нет ни карточки
// «finTut», ни подсказки боя, ни кнопок над героями; пропуск (ZC.skip) возвращает героев и Кощея на места, урок гаснет, стадия играется
// (7 с боя без ошибок). Один раз урок досматривается до конца сам (не пропуская). Одиночный режим — урок идёт и пропускается без ошибок.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,300));_ce.apply(console,arguments);};}
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.E5=ZC.FIN.k5e;
// запустить урок key: stage — стадия (по умолчанию key), home — после стадии идёт поездка домой, pro — отрезок пролога, repka — «репка» финала;
// solo — один игрок; full — досмотреть до конца без пропуска. Возвращает строку-отчёт; любая ошибка страницы или кадра — исключение.
window.LES=(key,o)=>{o=o||{};const e0=_errs.length,n=o.stage!=null?o.stage:(typeof key==='number'?key:4);E5.lessonN={};E5.saidPage={};ZC.setSolo(!!o.solo);E5.goStage(n);ZC.G.manual=true;
  if(o.home)E5.pageHome(n,()=>{});
  if(o.repka)E5.repka(()=>{});
  if(o.pro){ZC.tick(20);const P=E5.pro,D=P.dbg();for(let k=0;k<400&&(ZC.G.cine||P.leg==='intro');k++){if(ZC.G.cine)ZC.skip();ZC.tick(3);}
    ({gorge:()=>{P.leg='forest';D.GP.z=D.GZ[0]-1;},sea:()=>{P.leg='gorge';D.GP.z=D.GZ[1]-1;},sky:()=>{P.leg='sea';P.wave=99;D.crows.length=0;D.GP.z=D.GZ[1]-700;},
      write:()=>{P.leg='sky';P.vi=P.VQ.length;P.vT=0;D.orbs.length=0;},three:()=>{P.leg='write';P.wi=P.WQ.length;D.letters.length=0;},forest:()=>{}})[o.pro]();}
  let k=0;while(k<500&&!(ZC.G.cine&&E5.lessonOn===key)){
    if(E5.es&&E5.es.step==='walk'&&E5.pages&&E5.cur>=4&&E5.cur<=7&&!ZC.G.cine){const P=E5.pages[E5.cur-3];[0,1].forEach((pi,j)=>{const pl=ZC.players[pi],h=pl.heroes[pl.act];h.pos.set(P.pos.x-0.5+j,0.05,P.pos.z);h.vel.set(0,0,0);});}
    if(ZC.G.cine&&E5.lessonOn!==key)ZC.skip();ZC.tick(5);k++;}
  if(!(ZC.G.cine&&E5.lessonOn===key))throw new Error('урок '+key+' не начался (cur='+E5.cur+')');
  const dur=ZC.G.cine.dur,warn=(E5.lessonWarn||[]).slice();
  if(!o.solo&&warn.length)throw new Error('урок '+key+': кадры — '+warn.slice(0,3).join(' | '));
  ZC.tick(120);ZC.sim(1/60);
  const tut=document.getElementById('finTut');if(tut&&tut.classList.contains('on'))throw new Error('урок '+key+': на экране карточка');
  for(const b of document.querySelectorAll('.bub'))if(b.style.display!=='none'&&/[А-Яа-яЁё]{3,}/.test(b.textContent))throw new Error('урок '+key+': кнопка-подсказка над героем: '+b.textContent.slice(0,40));
  if(o.full){let g=0;while(ZC.G.cine&&E5.lessonOn===key&&g<400){ZC.tick(60);g++;}if(E5.lessonOn===key)throw new Error('урок '+key+' не закончился сам за '+g+' с');}
  else{ZC.skip();ZC.tick(10);}
  if(E5.lessonOn!=null)throw new Error('урок '+key+': после пропуска lessonOn='+E5.lessonOn);
  ZC.tick(420);if(_errs.length>e0)throw new Error('урок '+key+' — ошибки: '+_errs.slice(e0,e0+3).join(' / '));
  return 'урок '+key+(o.solo?' (один)':'')+' '+dur.toFixed(1)+' с, кадры: '+warn.length+(o.full?', досмотрен':'');};
'ok'
//@@
LES('door',{stage:4})
//@@
LES('door',{stage:4,solo:true})
//@@
LES('repka',{stage:12,repka:true})
//@@
LES('fly_stupa',{stage:4,home:true})
//@@
LES('fly_stupa',{stage:4,home:true,solo:true})
//@@
LES('ride',{stage:5,home:true})
//@@
LES('fly_gor',{stage:7,home:true})
//@@
LES('fly_gor',{stage:7,home:true,solo:true})
//@@
LES('pro',{stage:0,pro:'forest'})
//@@
LES('pro',{stage:0,pro:'forest',solo:true})
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
LES('pro_sea',{stage:0,pro:'sea',solo:true})
//@@
LES('pro_three',{stage:0,pro:'three',full:true})
