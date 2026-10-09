//@@
// @timeout=1800
// релиз final06: управление подсказками (late_79_hints): LB — одна кнопка: подсказки на экране — убирает, ничего не видно — показывает нужную сейчас или последнюю и читает вслух;
// показанное уходит само за время чтения восьмилетнего (H.readT); подсказка показывается один раз за уровень; «Подсказки: выкл» (пауза — вторым пунктом, настройки):
// сами не появляются, LB показывает нужную сейчас и убирает. Крестовина подсказки не трогает.
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
  // возвращённая гаснет сама за время чтения
  ZC.sim(H.readT('Проверка первая: нажми что-нибудь волшебное, когда увидишь светлячка.')+1);chk(!vis().some(id=>/Проверка первая/.test(txt(id))),'возвращённая подсказка погасла за время чтения');
  // «один раз»: та же подсказка пропала и появилась снова — не показывается; другая — показывается
  untip(0);ZC.sim(1);tip(0,'Проверка первая: нажми что-нибудь волшебное, когда увидишь светлячка.');ZC.sim(1);
  chk(!vis().some(id=>/Проверка первая/.test(txt(id))),'та же подсказка второй раз не показалась: '+vis().map(id=>id+'='+txt(id)).join(' | '));
  untip(0);ZC.sim(1);tip(0,'Проверка вторая: держи щит, пока грохочет гром над крышей.');ZC.sim(1);
  chk(vis().some(id=>/Проверка вторая/.test(txt(id))),'другая подсказка показалась: '+vis().map(id=>id+'='+txt(id)).join(' | '));
  // подсказка уходит сама, когда её успеешь прочитать (время — от числа слов: 5–20 с); раньше — висит
  const RT=H.readT('Проверка вторая: держи щит, пока грохочет гром над крышей.');chk(RT>=5&&RT<=20,'время чтения '+RT);
  ZC.sim(RT-2);chk(vis().some(id=>/Проверка вторая/.test(txt(id))),'за '+(RT-1).toFixed(1)+' с подсказка ещё на экране');
  ZC.sim(2);chk(!vis().some(id=>/Проверка вторая/.test(txt(id))),'за время чтения подсказка ушла сама: '+vis().map(id=>id+'='+txt(id)).join(' | '));
  chk(H.readT('Да.')===5&&H.readT('слово '.repeat(60))===20,'время чтения в пределах 5–20 с');
  // LB, когда ничего не видно, показывает нужное сейчас: подсказка ещё висит у игры (tipT) — её
  await tapB(0,LB);ZC.sim(0.5);chk(vis().some(id=>/Проверка вторая/.test(txt(id))),'LB показал ушедшую подсказку: '+vis().map(id=>id+'='+txt(id)).join(' | '));
  // игра подсказку сняла — LB показывает задачу или последнюю виденную, но что-то показывает
  await tapB(0,LB);ZC.sim(0.5);untip(0);ZC.sim(1);await tapB(0,LB);ZC.sim(0.5);chk(vis().length>0,'LB, когда подсказка погасла, что-то показал');
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
// 4) «Подсказки: выкл»: настройка, пункты в паузе (вторым) и в Настройках (на первом экране списка); сами не появляются, LB показывает и убирает; надписи у кнопок скрыты, значки кнопок остаются, LB подсказки не трогает
(async()=>{BAD.length=0;go('1-1');const r=[],F=ZC.FIN;untip(0);untip(1);tip(0,'Первому: поймай светлячка за средний хвостик и держи.');ZC.sim(1);
  chk(H.on()&&vis().length>0&&!document.body.classList.contains('fin-nohints'),'по умолчанию подсказки включены');
  F.kids.force=true;ZC.menu('pause');
  let L=F.menu.items.map(i=>i.label),k=L.indexOf('Подсказки');
  chk(k===1&&L[0]==='Продолжить','пункт в паузе вторым, после «Продолжить»: '+L.join('|'));
  const it=F.menu.items[k];chk(it.val()==='вкл'&&/LB/.test(it.sub()),'значение «вкл», подсказка про LB: '+it.val()+' / '+it.sub());
  it.side(1);chk(it.val()==='выкл'&&F.set.hints===false&&document.body.classList.contains('fin-nohints'),'выключили: '+it.val()+' hints='+F.set.hints);
  chk(/не появляются/.test(it.sub())&&/LB/.test(it.sub()),'пояснение при «выкл»: '+it.sub());
  chk(JSON.parse(localStorage.getItem('zlatayaCep.settings.v1')).hints===false,'настройка запомнилась');
  F.menu.items.find(i=>i.label==='Настройки').act();
  const st=F.menu.items.map(i=>i.label),ks=st.indexOf('Подсказки');chk(ks>=0&&ks<8&&st[ks-1]==='Размер текста','пункт в настройках на первом экране, после «Размер текста»: '+ks+' '+st.join('|'));
  F.menu.items[ks].side(1);chk(H.on()&&!document.body.classList.contains('fin-nohints'),'включили из настроек');
  F.menu.items[ks].side(1);
  F.kids.force=false;ZC.start();ZC.sim(1);
  // выключено: всё скрыто, LB подсказки не трогает
  // выкл: подсказки игрока сами не появляются; LB показывает нужную сейчас, ещё раз — убирает; показанная уходит сама за время чтения
  const MID=/средний хвостик/;ZC.sim(0.5);chk(vis().length===0,'выкл: карточки скрыты: '+vis().join(','));
  await tapB(0,LB);ZC.sim(0.5);chk(vis().some(id=>MID.test(txt(id))),'выкл: LB показал нужную подсказку: '+vis().map(id=>id+'='+txt(id)).join(' | '));
  await tapB(0,LB);ZC.sim(0.5);chk(vis().length===0,'выкл: LB ещё раз убрал: '+vis().join(','));
  await tapB(0,LB);ZC.sim(0.5);chk(vis().some(id=>MID.test(txt(id))),'выкл: LB снова показал');
  ZC.sim(H.readT('Первому: поймай светлячка за средний хвостик и держи.')+1);chk(!vis().some(id=>MID.test(txt(id))),'выкл: показанная LB ушла сама: '+vis().join(','));
  ZC.sim(20);chk(vis().length===0,'выкл: всё показанное LB (и общая задача) ушло само: '+vis().join(','));
  untip(0);ZC.sim(0.5);tip(0,'Первому: новая подсказка, пока подсказки выключены.');ZC.sim(1);chk(!vis().some(id=>/пока подсказки выключены/.test(txt(id))),'выкл: следующая подсказка сама не появилась: '+vis().map(id=>id+'='+txt(id)).join(' | '));
  // слои других модулей (подсказка босса — она глушит подсказки игроков, табличка Соловья, урок 4-Б): сами не появляются, LB показывает и убирает босса
  const mk=id=>{let d=document.getElementById(id);if(!d){d=document.createElement('div');d.id=id;document.body.appendChild(d);}return d;};
  const bh=mk('finBossHint');bh.textContent='Бей!';bh.classList.add('on');const ss=mk('solsign');ss.textContent='Табличка';ss.style.display='block';const tu=mk('finTut');tu.textContent='Урок';tu.classList.add('on');ZC.sim(0.5);
  chk(['finBossHint','solsign','finTut'].every(id=>getComputedStyle(document.getElementById(id)).display==='none'),'выкл: босс/табличка/урок сами не появились');
  await tapB(0,LB);ZC.sim(0.5);chk(getComputedStyle(bh).display!=='none'&&getComputedStyle(ss).display!=='none','выкл: LB показал подсказку босса и табличку');
  await tapB(0,LB);ZC.sim(0.5);chk(getComputedStyle(bh).display==='none'&&getComputedStyle(ss).display==='none','выкл: LB убрал подсказку босса и табличку');
  // надписи у кнопок в мире: значок остаётся, текст прячется
  const bubs=document.getElementById('bubs');const b1=document.createElement('div');b1.className='bub';b1.style.display='block';b1.innerHTML='<div class="inner"><span class="pb A">A</span><small>держи в полёте</small></div>';bubs.appendChild(b1);
  const b2=document.createElement('div');b2.className='bub';b2.style.display='block';b2.innerHTML='<div class="inner"><small>просто подпись</small></div>';bubs.appendChild(b2);
  chk(getComputedStyle(b1.querySelector('small')).display==='none'&&getComputedStyle(b1).display!=='none','значок кнопки остался, надпись скрыта');
  chk(getComputedStyle(b2).display==='none','пузырь только с надписью скрыт');
  b1.remove();b2.remove();
  // включили обратно — подсказка босса вернулась; убрали босса — вернулась и текущая подсказка игрока
  H.toggle();ZC.sim(1);chk(H.on()&&getComputedStyle(bh).display!=='none','включили: подсказка босса вернулась');
  bh.remove();ss.remove();tu.remove();ZC.sim(1);chk(vis().some(id=>/пока подсказки выключены/.test(txt(id))),'включили: текущая подсказка вернулась: '+vis().map(id=>id+'='+txt(id)).join(' | '));
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
  chk(vis().some(id=>/Проверка голоса/.test(txt(id)))&&SAID.length>n0&&SAID.slice(n0).concat(R.q).some(t=>/Проверка голоса/.test(t)),'LB показал подсказку и прочитал вслух (общая карточка задачи — первой, подсказка — в очереди): '+JSON.stringify(SAID.slice(n0).concat(R.q)));
  R.mock=null;
  if(BAD.length)throw new Error(BAD.join(' · '));
  return ['voice ok','errs='+_errs.length];})()
//@@
