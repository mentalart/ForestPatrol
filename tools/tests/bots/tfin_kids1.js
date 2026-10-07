//@@ wait=900
// релиз: мир 1 для детей 7–11 (late_74_kids_start.js, late_75_kids_w1.js, late_79b_readaloud.js; правки 1-1 и 1-3). Проверки:
// «Новая игра» открывает «Кто играет?» (по умолчанию Лёгкий путь, выбрано «Начать сказку!»), режим и пути меняются стрелками, соло прячет игрока 2;
// пролог и мир 1 мягче (замах, окно, Пробой, красный знак, подсказки ×2,5), Лукоморье — как прежде; кувырок за 0,8 с до красного удара засчитывается;
// упавший игрок получает подсказку; над активным героем стрелка; калитка 1-1 остаётся открытой; задачи читаются вслух и повторяются по H.
window.ERR=[];window.addEventListener('error',e=>ERR.push(String(e.message)));{const ce=console.error;console.error=(...a)=>{ERR.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};window.KD=ZC.FIN.kids;
ZC.FIN.kids.force=true;ZC.FIN.openTitle(true);chk(ZC.FIN.menu&&ZC.FIN.menu.sel===1,'на титуле без сохранения выбрана «Новая игра»');ZC.menuKey('Enter');'new'
//@@ wait=1800
const F=ZC.FIN,M=F.menu,P=ZC.players;
chk(M&&M.head==='Кто играет?','экран «Кто играет?»: '+(M&&M.head));chk(M.items.length===7&&M.sel===5,'пунктов '+M.items.length+', выбрано '+M.sel);
chk(P[0].path==='easy'&&P[1].path==='easy','по умолчанию Лёгкий путь: '+P.map(p=>p.path));
const R=[];R.push('items='+M.items.map(i=>i.label).join('|'));
ZC.menuKey('ArrowUp');ZC.menuKey('ArrowUp');ZC.menuKey('ArrowUp');ZC.menuKey('ArrowUp');ZC.menuKey('ArrowRight');   // игрок 1: Лёгкий → Средний
chk(P[0].path==='mid'&&P[1].path==='easy','путь игрока 1 → Средний: '+P.map(p=>p.path));
ZC.menuKey('ArrowLeft');chk(P[0].path==='easy','влево — назад');
ZC.menuKey('ArrowUp');ZC.menuKey('ArrowRight');chk(ZC.G.solo===true,'«Сколько вас?» → я один');chk(M.items[2].off===true,'в соло пункт игрока 2 недоступен');
ZC.menuKey('ArrowRight');chk(ZC.G.solo===false&&F.co.on===true&&M.items[2].off===true,'дальше — с напарником-ботом (одна сложность на двоих)');
ZC.menuKey('ArrowRight');chk(ZC.G.solo===false&&F.co.on===false&&M.items[2].off===false,'обратно вдвоём');
R.push('read='+F.readAloud.can(),'status='+F.readAloud.status());
ZC.menuKey('ArrowDown');ZC.menuKey('ArrowDown');ZC.menuKey('ArrowDown');ZC.menuKey('ArrowRight');chk(F.set.readAloud===false,'«Читать задачи вслух» выключается');ZC.menuKey('ArrowRight');chk(F.set.readAloud===true,'и включается');
ZC.menuKey('ArrowDown');ZC.menuKey('ArrowRight');chk(F.set.ts===1.3,'крупный текст: '+F.set.ts);ZC.menuKey('ArrowRight');chk(F.set.ts===1,'обычный текст: '+F.set.ts);
ZC.menuKey('ArrowDown');chk(M.sel===5,'выбрано «Начать сказку!»: '+M.sel);
ZC.menuKey('Enter');R.concat(BAD)
//@@
// после затемнения — пролог, мир мягче
const T=KD.timing();[ZC.G.state,ZC.W.levelId,'kids='+ZC.W.kids,'tip='+ZC.W.tipMul,'easy='+T.easy.lead+'/'+T.easy.parry+'/'+T.easy.broken,'mid='+T.mid.lead+'/'+T.mid.broken,'hard='+T.hard.lead+'/'+T.hard.broken].join(' ')
//@@
const T=KD.timing(),W0=ZC.W;
chk(ZC.W.levelId==='p'&&ZC.W.kids===true&&ZC.W.tipMul===2.5,'пролог: kids='+ZC.W.kids+' tipMul='+ZC.W.tipMul);
chk(T.easy.lead===0.9&&T.easy.parry===0.4&&T.easy.broken===9&&T.mid.broken===5&&T.mid.lead===0.5&&T.hard.lead===0.35,'тайминги мира 1: '+JSON.stringify(T));
ZC.G.manual=true;ZC.startFrom(ZC.LV('1-1'));ZC.tick(10);for(let q=0;q<3&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}
chk(ZC.W.levelId==='1-1'&&ZC.W.kids===true,'1-1: kids');
ZC.loadLevel(ZC.LV('luko'));const L=KD.timing();chk(ZC.W.kids===false&&!ZC.W.tipMul&&L.easy.lead===0.7&&L.easy.broken===6&&L.easy.parry===0.35,'Лукоморье — как прежде: '+JSON.stringify(L.easy)+' tip='+ZC.W.tipMul);
ZC.loadLevel(ZC.LV('2-1'));chk(ZC.W.kids===true&&KD.timing().easy.lead===0.9&&ZC.W.tipMul===2.5,'мир 2 — детские настройки включены (аудит 29, 2.1; все миры — tfin_kidsw)');
ZC.loadLevel(ZC.LV('epi'));chk(ZC.W.kids===false&&KD.timing().easy.lead===0.7,'эпилог — как прежде');
ZC.loadLevel(ZC.LV('1-3'));chk(ZC.W.kids===true&&KD.timing().easy.lead===0.9,'1-3 — мир 1');
ZC.W.kids=ZC.W.kids;['kids='+ZC.W.kids].concat(BAD)
//@@
// красный знак: замах дольше, кувырок за 0,8 с засчитывается
window.redWind=(path)=>{const H=ZC.HERO,h=ZC.players[0].heroes[ZC.players[0].act];ZC.players[0].path=path;ZC.players[1].path=path;const e=ZC.FIN.dbgFoe('morok',h.pos.x+1.6,h.pos.z-1.2,{signals:['red']});e.cd=0;
  for(let i=0;i<500&&e.state!=='wind';i++)ZC.tick(1);const w=e.wdur;e.alive=false;ZC.W.enemies.splice(ZC.W.enemies.indexOf(e),1);e.g.visible=false;return {state:e.state,w};};
ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(10);for(let q=0;q<4&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(20);
const a=redWind('easy'),b=redWind('mid'),c=redWind('hard');
chk(a.state==='wind'&&Math.abs(a.w-1.35)<0.01,'красный, Лёгкий: '+JSON.stringify(a));chk(b.state==='wind'&&Math.abs(b.w-0.6)<0.01,'красный, Средний: '+JSON.stringify(b));chk(c.state==='wind'&&Math.abs(c.w-0.35)<0.01,'красный, Богатырский: '+JSON.stringify(c));
['easy '+a.w,'mid '+b.w,'hard '+c.w].concat(BAD)
//@@
// кувырок за 0,7 с до красного удара — «Увернулся!» (в прототипе — только за 0,45 с); на Богатырском — по-старому
window.rollTest=(path,ago)=>{const h=ZC.players[0].heroes[ZC.players[0].act];ZC.players[0].path=path;ZC.players[1].path=path;ZC.players[0].petals=3;h.iT=0;h.rollT=0;
  const e=ZC.FIN.dbgFoe('morok',h.pos.x+1.2,h.pos.z-0.8,{signals:['red']});e.state='wind';e.t=0;e.sig='red';e.tgt=h;e.wdur=0.3;e.left=null;e.cd=9;
  const d0=ZC.G.stats.dodges;h.lastRoll=ZC.G.time-ago;for(let i=0;i<60&&e.state==='wind';i++)ZC.tick(1);
  const r={dodged:ZC.G.stats.dodges-d0,petals:ZC.players[0].petals};e.alive=false;ZC.W.enemies.splice(ZC.W.enemies.indexOf(e),1);e.g.visible=false;return r;};
const e1=rollTest('easy',0.4),e2=rollTest('easy',0.9),e3=rollTest('hard',0.2);   // к удару (через 0,3 с) пройдёт на 0,3 с больше
chk(e1.dodged===1,'Лёгкий: кувырок за 0,7 с до удара засчитан: '+JSON.stringify(e1));chk(e2.dodged===0,'Лёгкий: кувырок за 1,2 с до удара не засчитан: '+JSON.stringify(e2));chk(e3.dodged===0,'Богатырский: за 0,5 с не засчитан (как в прототипе): '+JSON.stringify(e3));
[JSON.stringify([e1,e2,e3])].concat(BAD)
//@@
// упавший игрок получает подсказку, друг — тоже; стрелка над активным героем
const P=ZC.players,h0=P[0].heroes[P[0].act];P[0].path='easy';P[0].petals=1;P[0].tipT=0;P[1].tipT=0;P[0].downed=false;h0.iT=0;
KD.dbgHurt(h0);ZC.tick(2);
chk(P[0].downed===true,'лепестки кончились — упал');chk(/отдыхаешь/.test(P[0].tipHTML||'')&&P[0].tipT>6,'упавший получил подсказку на '+P[0].tipT+' с: '+(P[0].tipHTML||'').slice(0,40));
chk(/рассыпался/.test(P[1].tipHTML||'')&&P[1].tipT>6,'друг получил подсказку на '+P[1].tipT+' с');
P[0].downed=false;P[0].petals=3;ZC.tick(5);
const arr=h=>h.g.children.find(c=>c.userData&&c.userData.kidsArrow),act0=P[0].heroes[P[0].act],off0=P[0].heroes.find(h=>h!==act0);
chk(arr(act0)&&arr(act0).visible,'над активным героем игрока 1 стрелка');chk(arr(off0)&&!arr(off0).visible,'над неактивным героем стрелки нет');
['tip0='+P[0].tipT].concat(BAD)
//@@
// «помощь по задаче» приходит быстрее: время без успеха идёт вдвое на Лёгком, ×1,5 на Среднем, как есть на Богатырском
ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(10);for(let q=0;q<4&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(10);
const P=ZC.players;const run=path=>{P.forEach(p=>{p.path=path;p.idle=0;});ZC.tick(60*5);return P[0].idle;};
const ie=run('easy'),im=run('mid'),ih=run('hard');
chk(ie>9&&ie<11&&im>7&&im<8&&ih>4.8&&ih<5.3,'idle за 5 с: easy='+ie.toFixed(1)+' mid='+im.toFixed(1)+' hard='+ih.toFixed(1));
['idle '+ie.toFixed(1)+'/'+im.toFixed(1)+'/'+ih.toFixed(1)].concat(BAD)
//@@
// калитка 1-1: две лапки разом на секунду — и она открыта насовсем
ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(10);for(let q=0;q<4&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(10);
const C=ZC.W.clean11,H=ZC.HERO;const put=(h,x,z)=>{h.pos.set(x,0,z);h.vel.set(0,0,0);};
ZC.tick(60);chk(!C.gateOpen(),'калитка закрыта');
put(H.proshka,-5.5,-102.5);ZC.tick(20);chk(!C.gateOpen()&&!ZC.W.flags.gateKept,'одна лапка — закрыта');
put(H.pelageya,5.5,-102.5);ZC.tick(25);chk(C.gateOpen()&&!ZC.W.flags.gateKept,'две лапки — открыта, пока держат (меньше секунды)');
ZC.tick(60);chk(ZC.W.flags.gateKept===true,'секунда на двух лапках — «открыто насовсем»');
put(H.proshka,0,-90);put(H.pelageya,0,-92);ZC.tick(90);chk(C.gateOpen(),'лапки отпустили — калитка всё равно открыта');
['gateKept='+ZC.W.flags.gateKept].concat(BAD)
//@@
// задачи вслух: новая карточка читается сама, «Повтори» (H) — ещё раз; в Лукоморье — молчит
window.SAID=[];ZC.FIN.readAloud.mock=t=>SAID.push(t);ZC.FIN.set.readAloud=true;ZC.FIN.set.vox=0;   // голоса героев не мешают: иначе чтение вслух ждёт, пока договорит Звенышко (время зависит от записи)
ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(10);for(let q=0;q<4&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.sim(6);for(let i=0;i<240;i++)ZC.FIN.ui(1/60);'start'   // sim зовёт updateUI раз в 30 кадров — субтитр не успел бы погаснуть сам
//@@ wait=1200
ZC.sim(0.2);'sim1'
//@@ wait=1200
ZC.sim(0.2);'sim2'
//@@ wait=1200
ZC.sim(0.2);const n0=SAID.length;window.N0=n0;
chk(n0>=1,'задача прочитана вслух сама: '+JSON.stringify(SAID));chk(SAID.every(t=>!/<|kbd|&/.test(t)&&t.length>5&&t.length<=171),'текст без разметки: '+JSON.stringify(SAID));
// один раз за игру: счётчик в тексте не делает задачу новой, время без успеха не повторяет чтение
const RA=ZC.FIN.readAloud;chk(RA.key('В кучу у забора неси: 3 / 10. Корыто — вдвоём')===RA.key('В кучу у забора неси: 4 / 10. Корыто — вдвоём'),'ключ без цифр: счётчик не новая задача');
chk(RA.key('Брось клубок — и по нити!')!==RA.key('Калитка ждёт две лапки разом'),'разные задачи — разные ключи');
Object.keys(RA.said).forEach(k=>{RA.said[k]-=20000;});   // как будто прочитано давно: прежний код повторил бы по времени без успеха
ZC.players.forEach(p=>{p.idle=40;});ZC.sim(0.2);'idle'
//@@ wait=1200
ZC.sim(0.2);'idle1'
//@@ wait=1200
ZC.sim(0.2);chk(SAID.length===N0,'долгое «без успеха» не повторяет чтение: было '+N0+', стало '+SAID.length+' '+JSON.stringify(SAID));
// «Повтори» (H) — только по просьбе
ZC.press('KeyH');ZC.sim(0.2);chk(SAID.length>N0,'«Повтори» (H) читает ещё раз: '+SAID.length+' из '+N0);
const s1=SAID.length;ZC.FIN.set.readAloud=false;ZC.press('KeyH');ZC.sim(0.2);chk(SAID.length===s1,'выключено в настройках — молчит');ZC.FIN.set.readAloud=true;
// меню паузы: вторым пунктом «Читать задачи вслух», стрелкой выключается и включается
ZC.menu('pause');const PI=ZC.FIN.menu.items.map(i=>i.label);chk(PI[1]==='Читать задачи вслух'&&PI[0]==='Продолжить'&&PI.length===6,'пауза в мире 1: '+PI.join('|'));
ZC.menuKey('ArrowDown');ZC.menuKey('ArrowRight');chk(ZC.FIN.set.readAloud===false,'в паузе выключили: '+ZC.FIN.set.readAloud);
ZC.menuKey('ArrowRight');chk(ZC.FIN.set.readAloud===true,'в паузе включили');ZC.start();
ZC.loadLevel(ZC.LV('luko'));ZC.G.manual=true;ZC.tick(5);const s2=SAID.length;ZC.press('KeyH');ZC.sim(0.3);chk(SAID.length===s2,'Лукоморье — молчит');
ZC.menu('pause');const PL=ZC.FIN.menu.items.map(i=>i.label);chk(PL[1]==='Настройки'&&PL.length===5,'пауза в Лукоморье без нового пункта: '+PL.join('|'));ZC.start();
['said='+N0,JSON.stringify(SAID.slice(0,2))].concat(BAD)
//@@
// без ошибок в консоли и по итогам — ok
BAD.length||ERR.length?'FAIL '+BAD.join(' ; ')+' errs='+ERR.slice(0,3).join(' | '):'kids1 ok'
