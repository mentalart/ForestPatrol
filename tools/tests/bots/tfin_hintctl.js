//@@
// релиз final06: управление подсказками (late_79_hints): LB — одна кнопка: подсказки на экране — убирает, ничего не видно — показывает последнюю (на 10 с, даже погасшую) и читает вслух;
// подсказка показывается один раз за уровень; «Текстовые подсказки: нет» (пауза и настройки) прячет карточки, подсказку босса, табличку Соловья. Крестовина подсказки не трогает.
// Джойстики — эмуляция Gamepad API (как в tfin_pads).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.H=ZC.FIN.hints;window.G=ZC.G;window.P=ZC.players;window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};
window.mkPad=i=>({id:'Fake pad '+i,index:i,connected:true,mapping:'standard',timestamp:0,axes:[0,0,0,0],buttons:Array.from({length:17},()=>({pressed:false,value:0}))});
window.PADSIM={list:[null,null]};ZC.FIN.padSrc=()=>PADSIM.list.slice();
window.FR=0;{const raf=window.requestAnimationFrame.bind(window);window.requestAnimationFrame=cb=>raf(t=>{FR++;cb(t);});}
window.polled=n=>new Promise(res=>{const f0=FR,t0=performance.now();const c=()=>{if(FR-f0>=n||performance.now()-t0>30000)res();else setTimeout(c,5);};c();});
window.setB=(i,b,on)=>{const p=PADSIM.list[i];p.buttons[b].pressed=on;p.buttons[b].value=on?1:0;p.timestamp++;};
window.tapB=async(i,b)=>{setB(i,b,true);await polled(2);setB(i,b,false);await polled(2);};
window.LB=4;window.DPAD_R=15;window.DPAD_L=14;
// карточки, видимые игроку: id → текст
window.vis=()=>['hint0','hint1','hintS'].filter(id=>{const e=document.getElementById(id);return e&&e.classList.contains('on')&&getComputedStyle(e).display!=='none';});
window.txt=id=>(document.getElementById(id).textContent||'').replace(/\s+/g,' ').trim();
window.tip=(pi,text)=>{P[pi].tipHTML=text;P[pi].tipT=60;};          // подсказка «висит», пока tipT > 0 (на 60 обновлений интерфейса)
window.untip=pi=>{P[pi].tipT=0;P[pi].tipHTML='';};
window.go=id=>{ZC.setSolo(false);ZC.FIN.co.set(false);ZC.startFrom(ZC.LV(id));G.manual=true;ZC.tick(20);for(let k=0;k<8;k++){if(G.cine)ZC.skip();ZC.sim(0.5);}ZC.sim(6);};
PADSIM.list=[mkPad(0),mkPad(1)];'pads on'
//@@
// 1) подсказка показывается один раз; LB убирает; LB ещё раз возвращает последнюю; крестовина не трогает
(async()=>{BAD.length=0;go('1-1');const r=[];
  untip(0);untip(1);ZC.sim(1);const base=vis().length;r.push('карточек до подсказки: '+base);
  tip(0,'Проверка первая: нажми что-нибудь волшебное, когда увидишь светлячка.');ZC.sim(1);
  chk(vis().some(id=>/Проверка первая/.test(txt(id))),'новая подсказка показалась: '+vis().map(id=>id+'='+txt(id)).join(' | '));
  // крестовина подсказки не трогает
  await tapB(0,DPAD_R);ZC.sim(0.5);await tapB(0,DPAD_L);ZC.sim(0.5);
  chk(vis().some(id=>/Проверка первая/.test(txt(id))),'крестовина подсказку не убрала: '+vis().join(','));
  // LB — убрать
  await tapB(0,LB);ZC.sim(0.5);
  chk(!vis().some(id=>/Проверка первая/.test(txt(id))),'LB убрал подсказку: '+vis().join(','));
  chk(!vis().some(id=>id==='hint0'),'карточка игрока 1 убрана');
  // LB ещё раз — вернуть
  await tapB(0,LB);ZC.sim(0.5);
  chk(vis().some(id=>/Проверка первая/.test(txt(id))),'LB ещё раз вернул последнюю: '+vis().map(id=>id+'='+txt(id)).join(' | '));
  // через 10 с возвращённая гаснет сама
  ZC.sim(11);chk(!vis().some(id=>/Проверка первая/.test(txt(id))),'возвращённая подсказка погасла через 10 с');
  // «один раз»: та же подсказка пропала и появилась снова — не показывается; другая — показывается
  untip(0);ZC.sim(1);tip(0,'Проверка первая: нажми что-нибудь волшебное, когда увидишь светлячка.');ZC.sim(1);
  chk(!vis().some(id=>/Проверка первая/.test(txt(id))),'та же подсказка второй раз не показалась: '+vis().map(id=>id+'='+txt(id)).join(' | '));
  untip(0);ZC.sim(1);tip(0,'Проверка вторая: держи щит, пока грохочет гром над крышей.');ZC.sim(1);
  chk(vis().some(id=>/Проверка вторая/.test(txt(id))),'другая подсказка показалась: '+vis().map(id=>id+'='+txt(id)).join(' | '));
  // LB, когда ничего не видно, возвращает последнюю из показанных (здесь — вторую), даже когда она уже погасла
  untip(0);ZC.sim(1);chk(!vis().some(id=>/Проверка вторая/.test(txt(id))),'вторая погасла');
  await tapB(0,LB);ZC.sim(0.5);chk(vis().some(id=>/Проверка вторая/.test(txt(id))),'LB вернул уже погасшую подсказку: '+vis().map(id=>id+'='+txt(id)).join(' | '));
  // новый уровень — подсказки снова «в первый раз»
  go('1-1');tip(0,'Проверка первая: нажми что-нибудь волшебное, когда увидишь светлячка.');ZC.sim(1);
  chk(vis().some(id=>/Проверка первая/.test(txt(id))),'в новом заходе на уровень подсказка снова показалась');
  if(BAD.length)throw new Error(BAD.join(' · '));
  r.push('once/dismiss/recall ok','errs='+_errs.length);return r;})()
//@@
// 2) у каждого игрока свой джойстик: LB второго убирает карточку второго, но не первого
(async()=>{BAD.length=0;go('1-1');const r=[];untip(0);untip(1);
  tip(0,'Первому: поймай светлячка за правый хвостик и держи.');tip(1,'Второму: звякни колокольчиком возле старого колодца.');ZC.sim(1);
  chk(vis().includes('hint0')&&vis().includes('hint1'),'обе подсказки на экране: '+vis().map(id=>id+'='+txt(id)).join(' | '));
  await tapB(1,LB);ZC.sim(0.5);
  chk(vis().includes('hint0')&&!vis().includes('hint1'),'джойстик 2 убрал только карточку второго: '+vis().join(','));
  await tapB(1,LB);ZC.sim(0.5);
  chk(vis().includes('hint1')&&vis().includes('hint0'),'и вернул её: '+vis().join(','));
  await tapB(0,LB);ZC.sim(0.5);
  chk(!vis().includes('hint0'),'джойстик 1 убрал карточку первого: '+vis().join(','));
  // нажатия, пока открыто меню, подсказки не трогают
  untip(0);untip(1);tip(0,'Первому: поймай светлячка за левый хвостик и держи.');ZC.sim(1);const before=vis().join(',');
  ZC.menu('pause');await tapB(0,LB);ZC.start();ZC.sim(0.5);
  chk(vis().join(',')===before,'LB в паузе подсказку не убрал: до '+before+', после '+vis().join(','));
  if(BAD.length)throw new Error(BAD.join(' · '));
  r.push('per-player ok','errs='+_errs.length);return r;})()
//@@
// 3) подсказка босса и табличка Соловья (слои других модулей): LB прячет, погасла или сменила текст — слой возвращается к обычной жизни
(async()=>{BAD.length=0;go('1-1');const r=[];const mk=id=>{let d=document.getElementById(id);if(!d){d=document.createElement('div');d.id=id;document.body.appendChild(d);}return d;};
  const bh=mk('finBossHint');bh.innerHTML='<div class="fh-text">Бей по знаку!</div>';bh.classList.add('on');
  const ss=mk('solsign');ss.textContent='Табличка';ss.style.display='block';ZC.sim(1);
  await tapB(0,LB);ZC.sim(0.5);
  chk(bh.classList.contains('hn-gone')&&getComputedStyle(bh).display==='none','подсказка босса спрятана LB');
  chk(ss.classList.contains('hn-gone')&&getComputedStyle(ss).display==='none','табличка Соловья спрятана LB');
  bh.innerHTML='<div class="fh-text">Другая подсказка босса</div>';ZC.sim(1);
  chk(!bh.classList.contains('hn-gone'),'новый текст подсказки босса возвращается');
  bh.classList.remove('on');ss.style.display='none';ZC.sim(1);chk(!ss.classList.contains('hn-gone'),'погасшая табличка вернулась к обычной жизни');
  bh.remove();ss.remove();
  if(BAD.length)throw new Error(BAD.join(' · '));
  r.push('layers ok','errs='+_errs.length);return r;})()
//@@
// 4) «Текстовые подсказки: нет»: настройка, пункты в паузе и в Настройках (в Настройках — на первом экране списка), карточки/босс/табличка/надписи у кнопок скрыты, значки кнопок остаются, LB подсказки не трогает
(async()=>{BAD.length=0;go('1-1');const r=[],F=ZC.FIN;untip(0);untip(1);tip(0,'Первому: поймай светлячка за средний хвостик и держи.');ZC.sim(1);
  chk(H.on()&&vis().length>0&&!document.body.classList.contains('fin-nohints'),'по умолчанию подсказки включены');
  F.kids.force=true;ZC.menu('pause');
  let L=F.menu.items.map(i=>i.label),k=L.indexOf('Текстовые подсказки');
  chk(k>=0&&L[k-1]==='Читать задачи вслух','пункт в паузе после «Читать задачи вслух»: '+L.join('|'));
  const it=F.menu.items[k];chk(it.val()==='да'&&/LB/.test(it.sub()),'значение «да», подсказка про LB: '+it.val()+' / '+it.sub());
  it.side(1);chk(it.val()==='нет'&&F.set.hints===false&&document.body.classList.contains('fin-nohints'),'выключили: '+it.val()+' hints='+F.set.hints);
  chk(/скрыты/.test(it.sub())&&/вслух/.test(it.sub()),'пояснение при «нет»: '+it.sub());
  chk(JSON.parse(localStorage.getItem('zlatayaCep.settings.v1')).hints===false,'настройка запомнилась');
  F.menu.items.find(i=>i.label==='Настройки').act();
  const st=F.menu.items.map(i=>i.label),ks=st.indexOf('Текстовые подсказки');chk(ks>=0&&ks<8&&st[ks-1]==='Размер текста','пункт в настройках на первом экране, после «Размер текста»: '+ks+' '+st.join('|'));
  F.menu.items[ks].side(1);chk(H.on()&&!document.body.classList.contains('fin-nohints'),'включили из настроек');
  F.menu.items[ks].side(1);
  F.kids.force=false;ZC.start();ZC.sim(1);
  // выключено: всё скрыто, LB подсказки не трогает
  const ids=['hint0','hint1','hintS','finBossHint','finTut','solsign'];
  const mk=id=>{let d=document.getElementById(id);if(!d){d=document.createElement('div');d.id=id;document.body.appendChild(d);}return d;};
  const bh=mk('finBossHint');bh.textContent='Бей!';bh.classList.add('on');const ss=mk('solsign');ss.textContent='Табличка';ss.style.display='block';const tu=mk('finTut');tu.textContent='Урок';tu.classList.add('on');
  chk(vis().length===0,'карточки скрыты: '+vis().join(','));
  chk(['finBossHint','solsign','finTut'].every(id=>getComputedStyle(document.getElementById(id)).display==='none'),'босс/табличка/урок скрыты');
  ZC.sim(0.5);const pv0=H.gate.pv.join(),td0=H.gate.td.join();await tapB(0,LB);ZC.sim(0.5);chk(H.gate.pv.join()===pv0&&H.gate.td.join()===td0&&!bh.classList.contains('hn-gone'),'при «нет» LB подсказки не трогает');
  // надписи у кнопок в мире: значок остаётся, текст прячется
  const bubs=document.getElementById('bubs');const b1=document.createElement('div');b1.className='bub';b1.style.display='block';b1.innerHTML='<div class="inner"><span class="pb A">A</span><small>держи в полёте</small></div>';bubs.appendChild(b1);
  const b2=document.createElement('div');b2.className='bub';b2.style.display='block';b2.innerHTML='<div class="inner"><small>просто подпись</small></div>';bubs.appendChild(b2);
  chk(getComputedStyle(b1.querySelector('small')).display==='none'&&getComputedStyle(b1).display!=='none','значок кнопки остался, надпись скрыта');
  chk(getComputedStyle(b2).display==='none','пузырь только с надписью скрыт');
  b1.remove();b2.remove();
  // читаются вслух по-прежнему (отдельный пункт): карточка «есть», только не видна
  chk(H.state().shown.some(Boolean),'карточки в слое есть (для чтения вслух), но скрыты стилем');
  // включили обратно — всё вернулось
  H.toggle();ZC.sim(1);chk(H.on()&&vis().length>0&&getComputedStyle(document.getElementById('finBossHint')).display!=='none','включили: карточки и босс вернулись');
  bh.remove();ss.remove();tu.remove();
  if(BAD.length)throw new Error(BAD.join(' · '));
  r.push('toggle ok','errs='+_errs.length);return r;})()
//@@
// 5) экран «Управление»: строка про H и LB
(async()=>{BAD.length=0;const F=ZC.FIN;F.kids.force=true;ZC.menu('pause');F.menu.items.find(i=>i.label==='Управление').act();
  const h=F.menu.html();const ok=/Убрать подсказку/.test(h)&&/>LB</.test(h)&&/<kbd>H<\/kbd>/.test(h)&&!/✚→/.test(h);F.kids.force=false;ZC.start();
  if(!ok)throw new Error('в «Управлении» нет строки про LB: '+h.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').slice(0,400));
  return ['controls ok','errs='+_errs.length];})()
//@@
// 5б) клавиатурный H — то же действие: убирает, ещё раз — показывает последнюю; ZC.press('KeyH') (боты читалки) подсказки не трогает
(async()=>{BAD.length=0;go('1-1');const r=[];untip(0);untip(1);tip(0,'Клавиатуре: нажми клавишу H, когда увидишь эту подсказку.');ZC.sim(1);
  chk(vis().some(id=>/Клавиатуре/.test(txt(id))),'подсказка на экране');
  ZC.press('KeyH');ZC.sim(0.5);chk(vis().some(id=>/Клавиатуре/.test(txt(id))),'ZC.press(KeyH) подсказку не убрал');
  return ['h-bot ok','errs='+_errs.length].concat(BAD.length?[BAD.join(' · ')]:[]);})()
//@@ key=KeyH
(async()=>{BAD.length=0;ZC.sim(0.5);
  chk(!vis().some(id=>/Клавиатуре/.test(txt(id))),'настоящее нажатие H убрало подсказку: '+vis().join(','));
  return ['h-real hide '+(BAD.length?'FAIL '+BAD.join(' · '):'ok')];})()
//@@ key=KeyH
(async()=>{BAD.length=0;ZC.sim(0.5);
  chk(vis().some(id=>/Клавиатуре/.test(txt(id))),'второе нажатие H показало последнюю: '+vis().join(','));
  if(BAD.length)throw new Error(BAD.join(' · '));
  return ['h-real show ok','errs='+_errs.length];})()
//@@
// 6) читалка вслух (late_79b): LB убирает подсказку и голос замолкает; LB ещё раз показывает и читает её
(async()=>{BAD.length=0;go('1-1');const F=ZC.FIN,R=F.readAloud;window.SAID=[];R.mock=t=>SAID.push(t);F.set.readAloud=true;F.set.vox=0;F.set.readAloudAll=true;
  untip(0);untip(1);tip(0,'Проверка голоса: позови друга колокольчиком возле старого колодца.');ZC.sim(2);
  chk(vis().some(id=>/Проверка голоса/.test(txt(id))),'подсказка на экране');   // сама ли прочиталась — зависит от реплик героев на старте (читалка ждёт тишины); здесь проверяем LB
  const n0=SAID.length;await tapB(0,LB);ZC.sim(0.5);
  chk(!vis().some(id=>/Проверка голоса/.test(txt(id)))&&SAID.length===n0,'LB убрал подсказку и ничего не прочитал: '+vis().join(',')+' '+(SAID.length-n0));
  await tapB(0,LB);ZC.sim(1);
  chk(vis().some(id=>/Проверка голоса/.test(txt(id)))&&SAID.length>n0&&/Проверка голоса/.test(SAID[SAID.length-1]),'LB показал подсказку и прочитал вслух: '+JSON.stringify(SAID.slice(n0)));
  R.mock=null;
  if(BAD.length)throw new Error(BAD.join(' · '));
  return ['voice ok','errs='+_errs.length];})()
//@@
