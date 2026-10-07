//@@
// релиз: калибровка ритма (docs/29_full_audit.md, 3.7; build/late_77_rcal.js, rT() в proto/engine/01_utils_input_sound.js).
// Звук доходит до игрока позже, чем игра его сыграла, — он жмёт «в слышимую» долю и получает «поздно». Настройки → «Калибровка ритма» → «Хлопни в такт»:
// десять щелчков, хлопать прыжком; поправка (мс) запоминается, и ритм-уровни считают время нажатия за вычетом поправки.
// 1) расчёт по хлопкам с запаздыванием 0,18 с / с опережением / вразнобой / слишком мало / подвисание окна — на виртуальных часах;
// 2) экран в паузе: пункт в настройках, «Начать», хлопки через меню, результат, Esc, «Сбросить»;
// 3) в уровнях: нажатие с запаздыванием 0,30 с — «поздно» при поправке 0 и «в такт» при поправке 300 мс (3-3, 5-4: окно и авто-промах; 1-3: струна и её место).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(20);U.nocine();ZC.tick(10);
window.BAD=[];window.RES=[];window.F=ZC.FIN;window.RC=F.rcal;window.vt=1000;RC.clock=()=>vt;
window.chk=(name,ok,info)=>{RES.push(name+': '+info);if(!ok)BAD.push(name+': '+info);};
window.JIT=[0.01,-0.012,0.008,-0.006,0.011,-0.009,0.004,-0.01,0.007,-0.005];
// игрок хлопает через delay[k] после щелчка k (jit — небольшой разброс); число кадров, пока идёт расчёт
window.sim=(delayOf,only)=>{RC.start();let tt=null,fr=0,redraw=0;
  for(;RC.phase==='run'&&fr<1500;fr++){vt+=1/60;if(RC.start0!==null&&tt===null){tt=[];for(let k=0;k<RC.n;k++)if(!only||k<only)tt.push(RC.T(k)+delayOf(k)+JIT[k]);}
    const tapped=tt!==null&&tt.some(x=>x>vt-1/60+1e-9&&x<=vt+1e-9);if(RC.step(vt,tapped))redraw++;}
  return {fr,res:RC.res,phase:RC.phase,redraw};};
window.saved=()=>{try{return JSON.parse(localStorage.getItem('zlatayaCep.settings.v1')||'{}');}catch(e){return {};}};
'ok'
//@@
// 1) расчёт
chk('по умолчанию 0',(F.set.rLatMs||0)===0&&ZC.G.rLat===0,'rLatMs='+F.set.rLatMs+' G.rLat='+ZC.G.rLat);
let r=sim(()=>0.18);chk('запаздывание 0,18 с',r.res&&r.res.ok&&r.res.ms>=170&&r.res.ms<=200&&r.phase==='done',JSON.stringify(r.res)+' кадров '+r.fr);
chk('поправка записана и применена',F.set.rLatMs===r.res.ms&&Math.abs(ZC.G.rLat-r.res.ms/1000)<1e-9&&saved().rLatMs===r.res.ms,'set='+F.set.rLatMs+' G.rLat='+ZC.G.rLat+' в localStorage='+saved().rLatMs);
chk('экран перерисовывался на щелчках и хлопках',r.redraw>=10,'перерисовок '+r.redraw);
const keep=F.set.rLatMs;
r=sim(k=>k%2?0.3:-0.2);chk('хлопки вразнобой — не вышло',r.res&&!r.res.ok&&r.phase==='done'&&F.set.rLatMs===keep&&ZC.G.rLat===keep/1000,JSON.stringify(r.res)+' поправка осталась '+F.set.rLatMs);
r=sim(()=>0.2,5);chk('хлопнул только 5 щелчков — мало (разминка не в счёт)',r.res&&!r.res.ok&&F.set.rLatMs===keep,JSON.stringify(r.res));
r=sim(()=>-0.05);chk('опережение −0,05 с',r.res&&r.res.ok&&r.res.ms>=-60&&r.res.ms<=-30&&Math.abs(ZC.G.rLat*1000-r.res.ms)<1e-6,JSON.stringify(r.res)+' G.rLat='+ZC.G.rLat);
// подвисание окна: кадр длиннее 0,3 с — расчёт останавливается, поправка не трогается
RC.start();vt+=1/60;RC.step(vt,false);vt+=1.2;RC.step(vt,false);chk('подвисание окна',RC.phase==='idle'&&/зависло/.test(RC.msg),'phase='+RC.phase+' msg='+RC.msg);
// два хлопка на один щелчок — второй не считается
RC.start();vt+=1/60;RC.step(vt,false);while(RC.k<3){vt+=1/60;RC.step(vt,false);}const t3=RC.T(3);while(vt<t3+0.2){vt+=1/60;RC.step(vt,vt>=t3+0.1&&vt<t3+0.1+1.2/60);}
chk('второй хлопок на тот же щелчок не считается',RC.taps.filter(q=>q.j===3).length===1,'хлопков на щелчок 3: '+RC.taps.filter(q=>q.j===3).length);RC.cancel();
// границы поправки в настройках (по 10 мс, не дальше −200 … +400)
F.set.rLatMs=395;F.saveSettings();F.applySettings();chk('G.rLat из настройки',Math.abs(ZC.G.rLat-0.395)<1e-9,'G.rLat='+ZC.G.rLat);
F.set.rLatMs=0;F.applySettings();
if(BAD.length)throw new Error('FAIL tfin_rhythmcal(1): '+BAD.join(' ; '));
RES.join(' · ')
//@@
// 2) экран в паузе: Настройки → «Калибровка ритма»
ZC.menu('pause');ZC.tick(2);
const pick=(label)=>{const m=F.menu;const i=m.items.findIndex(it=>it.label===label);let g=0;while(F.menu.sel!==i&&g++<40)ZC.menuKey('ArrowDown');return i;};
pick('Настройки');ZC.menuKey('Enter');
const head1=document.querySelector('#finPanelP .fin-head').textContent;const ci=pick('Калибровка ритма');
chk('пункт «Калибровка ритма» в настройках',head1==='Настройки'&&ci>=0&&/мс/.test(document.querySelector('#finPanelP .fin-item.fin-sel').textContent),'экран '+head1+' пункт '+ci+' «'+document.querySelector('#finPanelP .fin-item.fin-sel').textContent.slice(0,40)+'»');
// ← → — вручную по 10 мс
ZC.menuKey('ArrowRight');ZC.menuKey('ArrowRight');ZC.menuKey('ArrowRight');chk('← → двигают на 10 мс',F.set.rLatMs===30&&Math.abs(ZC.G.rLat-0.03)<1e-9,'rLatMs='+F.set.rLatMs);
for(let i=0;i<5;i++)ZC.menuKey('ArrowLeft');chk('и в минус',F.set.rLatMs===-20,'rLatMs='+F.set.rLatMs);
ZC.menuKey('Enter');
const head2=document.querySelector('#finPanelP .fin-head').textContent;chk('экран «Хлопни в такт»',head2==='Хлопни в такт'&&RC.phase==='idle'&&F.menu.rcal,head2+' phase='+RC.phase);
// «Начать»; хлопаем с запаздыванием 0,14 с через меню
ZC.menuKey('Enter');chk('«Начать» запускает щелчки',RC.phase==='run',RC.phase);
let tt=null,fr=0,tapsGiven=0;
for(;RC.phase==='run'&&fr<1500;fr++){vt+=1/60;if(RC.start0!==null&&tt===null){tt=[];for(let k=0;k<RC.n;k++)tt.push(RC.T(k)+0.14+JIT[k]);}
  const tapped=tt!==null&&tt.some(x=>x>vt-1/60+1e-9&&x<=vt+1e-9);if(tapped)tapsGiven++;ZC.menuKey(tapped?U.K[0].j:'F13');}
const txt=document.querySelector('#finPanelP').textContent;
chk('результат через меню',RC.phase==='done'&&RC.res&&RC.res.ok&&RC.res.ms>=130&&RC.res.ms<=160&&F.set.rLatMs===RC.res.ms,'phase='+RC.phase+' '+JSON.stringify(RC.res)+' хлопков '+tapsGiven);
chk('экран показывает результат',/Готово/.test(txt)&&txt.indexOf(String(RC.res.ms))>=0&&/Ещё раз/.test(txt),txt.replace(/\s+/g,' ').slice(0,140));
// прыжок на экране после расчёта — не хлопок, а выбор пункта («Ещё раз»)
ZC.menuKey(U.K[0].j);chk('после расчёта прыжок выбирает пункт',RC.phase==='run','phase='+RC.phase);
// во время хлопков Esc останавливает, но не закрывает экран; Назад — в настройки
vt+=1/60;ZC.menuKey('F13');ZC.menuKey('Escape');chk('Esc останавливает',RC.phase==='idle'&&document.querySelector('#finPanelP .fin-head').textContent==='Хлопни в такт','phase='+RC.phase);
ZC.menuKey('Escape');chk('Esc — назад в настройки',document.querySelector('#finPanelP .fin-head').textContent==='Настройки','экран '+document.querySelector('#finPanelP .fin-head').textContent);
// «Сбросить»
pick('Калибровка ритма');ZC.menuKey('Enter');pick('Сбросить поправку');ZC.menuKey('Enter');chk('сброс',F.set.rLatMs===0&&ZC.G.rLat===0&&saved().rLatMs===0,'rLatMs='+F.set.rLatMs+' G.rLat='+ZC.G.rLat);
ZC.menuKey('Escape');ZC.menuKey('Escape');ZC.menuKey('Escape');
if(BAD.length)throw new Error('FAIL tfin_rhythmcal(2): '+BAD.join(' ; ')+' · '+RES.join(' · '));
RES.slice(-9).join(' · ')
//@@
// 3а) 3-3: нажатие с запаздыванием 0,30 с — при поправке 0 «поздно» (окно ±0,1–0,2 с и авто-промах до нажатия: мостик гаснет, герой подпрыгивает — на этих
// долях жать уже нечем, поэтому исход считаем по любой доле), при 300 мс — «в такт» (здесь нужен герой на земле: берём только доли, на которых он стоял)
window.run=(delay,n)=>{const S=ZC.W.song,pi=ZC.G.soloPi,res=[];const evOf=q=>S.ev?S.ev(pi,q):S.act(pi,q);let kPrev=S.lastK+2;
  for(let c=0;c<n;c++){let k=-1;
    for(let g=0;g<3000&&k<0;g++){ZC.tick(1);if(S.state!=='play')return res;for(let q=Math.max(kPrev+3,S.lastK+1);q<=S.lastK+4&&q<S.NB;q++){if(evOf(q)==='jump'&&!S.judged[pi][q]&&!(S.typ&&S.typ(q)==='solo')){k=q;break;}}}
    if(k<0)break;kPrev=k;
    for(let g=0;g<600&&S.t<S.bt[k]+delay-1/120;g++)ZC.tick(1);
    const gr=U.act(pi).grounded;if(gr)ZC.press('Space');ZC.tick(2);
    for(let g=0;g<120&&!S.judged[pi][k];g++)ZC.tick(1);
    res.push({k,gr,j:S.judged[pi][k]});
    for(let g=0;g<120&&!U.act(pi).grounded;g++)ZC.tick(1);}
  return res;};
window.valid=a=>a.filter(x=>x.gr);
ZC.setSolo(true);ZC.startFrom(ZC.LV('3-3'));ZC.G.manual=true;ZC.tick(20);ZC.skip();ZC.tick(5);
F.set.rLatMs=0;F.applySettings();
const a0=run(0.30,3);chk('3-3, поправка 0: нажатие через 0,30 — мимо',a0.length>=1&&a0.every(x=>x.j==='miss'),JSON.stringify(a0));
F.set.rLatMs=300;F.applySettings();
const a3=valid(run(0.30,3));chk('3-3, поправка 300 мс: то же нажатие — в такт',a3.length>=1&&a3.every(x=>x.j==='hit'),JSON.stringify(a3));
F.set.rLatMs=0;F.applySettings();
if(BAD.length)throw new Error('FAIL tfin_rhythmcal(3a): '+BAD.join(' ; ')+' · '+RES.join(' · '));
RES.slice(-2).join(' · ')
//@@
// 3б) 5-4: то же
ZC.startFrom(ZC.LV('5-4'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(5);
F.set.rLatMs=0;F.applySettings();
const b0=run(0.30,3);chk('5-4, поправка 0: нажатие через 0,30 — мимо',b0.length>=1&&b0.every(x=>x.j==='miss'),JSON.stringify(b0));
F.set.rLatMs=300;F.applySettings();
const b3=valid(run(0.30,3));chk('5-4, поправка 300 мс: то же нажатие — в такт',b3.length>=1&&b3.every(x=>x.j==='hit'),JSON.stringify(b3));
F.set.rLatMs=0;F.applySettings();
if(BAD.length)throw new Error('FAIL tfin_rhythmcal(3b): '+BAD.join(' ; ')+' · '+RES.join(' · '));
RES.slice(-2).join(' · ')
//@@
// 3в) 1-3: прыжок на струну через 0,30 после доли — герой уже на (скорость × 0,3) м дальше струны: при поправке 0 мимо, при 300 мс — в такт (s.ok)
window.strRun=(delay,n)=>{const S=ZC.W.song,pi=0,out=[];
  for(let c=0;c<n;c++){let s=null;
    for(let g=0;g<3600&&!s;g++){ZC.tick(1);if(S.state==='stop')break;s=S.strings.find(q=>q.pi===pi&&!q.used&&q.k>S.lastK+1);}
    if(!s)break;S.lane[pi]=s.lanes[0];
    for(let g=0;g<600&&S.t<S.BT[s.k]+delay-1/120;g++){S.lane[pi]=s.lanes[0];ZC.tick(1);}
    const gr=U.act(pi).grounded&&!(S.fly[pi]>S.t);if(gr)ZC.press('Space');ZC.tick(2);
    for(let g=0;g<90&&!s.used;g++)ZC.tick(1);
    out.push({k:s.k,gr,ok:!!s.ok,used:!!s.used});
    for(let g=0;g<90&&!U.act(pi).grounded;g++)ZC.tick(1);}
  return out;};
ZC.setSolo(false);ZC.startFrom(ZC.LV('1-3'));ZC.G.manual=true;ZC.tick(10);ZC.skip();ZC.tick(30);
F.set.rLatMs=0;F.applySettings();
const c0=valid(strRun(0.30,3));chk('1-3, поправка 0: струна через 0,30 — мимо',c0.length>=1&&c0.every(x=>!x.ok&&x.used),JSON.stringify(c0));
F.set.rLatMs=300;F.applySettings();
const c3=valid(strRun(0.30,3));chk('1-3, поправка 300 мс: та же струна — в такт',c3.length>=1&&c3.every(x=>x.ok),JSON.stringify(c3));
F.set.rLatMs=0;F.applySettings();
if(window._errs.length)BAD.push('ошибки консоли: '+window._errs.slice(0,2).join(' | '));
if(BAD.length)throw new Error('FAIL tfin_rhythmcal: '+BAD.join(' ; ')+' · '+RES.join(' · '));
'tfin_rhythmcal ok · '+RES.slice(-3).join(' · ')
