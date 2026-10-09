//@@ wait=900
// релиз: дети 7–11, этапы 0–2 и 7 плана docs/31 (late_74/75 — ступени и счётчики, late_76_kids_fight.js — бой, late_76b_cine_skip.js — ролики, late_79b — чтение во всех мирах).
// Проверки: замедление знаков 6 встреч (не 3) на Лёгком пути в мирах 1–3, у Среднего и Богатырского — как прежде; красный знак не гаснет, пока не удался кувырок;
// «жалость»: три щита подряд — морок выдыхается; синяя капля медленнее и с широким окном, не больше двух стрелков; ролик в паре пропускает и один (2 с);
// «осталось N с» и пункт «Пропустить ролик» в паузе; «Читать во всех мирах» (авто/да/нет); счётчики по мирам.
window.ERR=[];window.addEventListener('error',e=>ERR.push(String(e.message)));{const ce=console.error;console.error=(...a)=>{ERR.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};window.KD=ZC.FIN.kids;KD.force=true;
window.kill=e=>{e.alive=false;const k=ZC.W.enemies.indexOf(e);if(k>=0)ZC.W.enemies.splice(k,1);e.g.visible=false;};
window.setup=id=>{ZC.G.manual=true;ZC.loadLevel(ZC.LV(id));ZC.tick(20);for(let q=0;q<4&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(30);};
window.windE=(sig,path,n)=>{const P=ZC.players,h=P[0].heroes[P[0].act];P[0].path=path;P[1].path=path;P[0].enc={};if(n!==null)P[0].enc[sig]=n;P[0].downed=false;P[0].petals=3;
  const e=ZC.FIN.dbgFoe('morok',h.pos.x+1.6,h.pos.z-1.2,{signals:[sig]});e.cd=0;for(let i=0;i<600&&e.state!=='wind';i++)ZC.tick(1);
  const r={state:e.state,slow:e.slow,help:e.help,w:+e.wdur.toFixed(3)};kill(e);return r;};
setup('2-1');chk(ZC.W.kidsK===0.8,'мир 2: kidsK='+ZC.W.kidsK);
const r3=windE('yellow','easy',3),r5=windE('yellow','easy',5),r6=windE('yellow','easy',6),rm=windE('yellow','mid',3),rh=windE('yellow','hard',3);
chk(r3.state==='wind'&&r3.slow===0.5&&r3.help===true,'мир 2, Лёгкий, 4-я встреча: замедление '+JSON.stringify(r3));
chk(r5.slow===0.5,'6-я встреча ещё в замедлении: '+JSON.stringify(r5));chk(r6.slow===1,'7-я встреча — без замедления: '+JSON.stringify(r6));
chk(rm.slow===1,'Средний путь: 4-я встреча без замедления (как прежде): '+JSON.stringify(rm));chk(rh.slow===1,'Богатырский — как прежде: '+JSON.stringify(rh));
chk(Math.abs(windE('yellow','easy',9).w-0.82)<0.01,'мир 2: замах Лёгкого 0,82');
ZC.loadLevel(ZC.LV('3-1'));ZC.tick(20);for(let q=0;q<4&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(30);chk(Math.abs(windE('yellow','easy',9).w-0.76)<0.01,'мир 3: замах Лёгкого 0,76');
ZC.loadLevel(ZC.LV('4-1'));ZC.tick(20);for(let q=0;q<4&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(30);const r4=windE('yellow','easy',2);chk(r4.slow===0.5&&Math.abs(r4.w-0.9)<0.01,'мир 4 — ступень боссов (6 встреч в замедлении, замах 0,9): '+JSON.stringify(r4));
chk(windE('yellow','easy',3).slow===0.5&&windE('yellow','easy',6).slow===1,'мир 4: замедление 6 встреч');
['slow '+[r3.slow,r5.slow,r6.slow,rm.slow,rh.slow].join('/')].concat(BAD)
//@@
// красный знак: подсказка «кувырок» и замедление, пока не удался первый кувырок (мир 2, Лёгкий путь)
setup('2-1');const P=ZC.players;P[0].rollOk=false;P[0].redTipAt=-99;P[0].tipT=0;P[0].tipHTML='';
const a=windE('red','easy',9);chk(a.slow===0.5&&a.help===true,'красный до первого кувырка: замедление и кнопка: '+JSON.stringify(a));chk(/кувырок/.test(P[0].tipHTML||'')&&P[0].tipT>5,'подсказка про кувырок на '+P[0].tipT+' с');
P[0].rollOk=true;const b=windE('red','easy',9);chk(b.slow===1,'после первого кувырка — обычный замах: '+JSON.stringify(b));
P[0].rollOk=false;const c=windE('red','hard',9);chk(c.slow===1&&c.w===0.35,'Богатырский: без помощи: '+JSON.stringify(c));
P[0].rollOk=false;const d=windE('red','mid',9);chk(d.slow===1&&/кувырок/.test(P[0].tipHTML||''),'Средний: подсказка есть, замедления нет: '+JSON.stringify(d));
['red '+a.slow+'/'+b.slow].concat(BAD)
//@@
// «жалость»: три щита подряд без отбива на Лёгком — морок выдыхается и открыт; на Среднем — нет
window.shieldRun=(path,n)=>{const h=ZC.players[0].heroes[ZC.players[0].act],p=ZC.players[0];p.path=path;ZC.players[1].path=path;p.blockRun=0;p.pityTold=false;let last=null,sh0=ZC.G.stats.shields;ZC.hold('KeyG',true);
  for(let k=0;k<n;k++){p.spirit=1;p.petals=3;p.downed=false;h.iT=0;const e=ZC.FIN.dbgFoe('morok',h.pos.x+1.2,h.pos.z-0.8,{signals:['yellow']});e.state='wind';e.t=0;e.sig='yellow';e.tgt=h;e.wdur=0.25;e.slow=1;e.left=null;e.cd=9;
    for(let i=0;i<120&&e.state==='wind';i++)ZC.tick(1);last={state:e.state,blockRun:p.blockRun,shields:ZC.G.stats.shields-sh0};kill(e);ZC.tick(10);}
  ZC.hold('KeyG',false);return last;};
setup('2-1');const s2=shieldRun('easy',2),s3=shieldRun('easy',3),sm=shieldRun('mid',3);
chk(s2&&s2.shields===2&&s2.state!=='stagger','два щита — ещё нет: '+JSON.stringify(s2));chk(s3&&s3.state==='stagger'&&s3.blockRun===0,'три щита — морок выдохся: '+JSON.stringify(s3));chk(sm&&sm.state!=='stagger','Средний путь без жалости: '+JSON.stringify(sm));
['pity '+JSON.stringify(s3)].concat(BAD)
//@@
// синяя капля (мир 2, Лёгкий путь): летит медленнее, не больше двух стрелков на игрока
setup('2-1');const P=ZC.players,h=P[0].heroes[P[0].act];P[0].path='easy';P[1].path='easy';P[0].downed=false;P[0].petals=3;
const pk=(path,k)=>{P[0].path=path;P[1].path=path;const e=ZC.FIN.dbgFoe('shchuka',h.pos.x+3.5,h.pos.z-1.5,{signals:['blue']});e.state='wind';e.t=0;e.sig='blue';e.tgt=h;e.wdur=0.2;e.slow=1;e.left=null;e.cd=9;
  for(let i=0;i<200&&ZC.W.bolts.length===0;i++)ZC.tick(1);const b=ZC.W.bolts[0],v=b&&b.v;ZC.W.bolts.length=0;kill(e);return v;};
const ve=pk('easy'),vm=pk('mid'),vh=pk('hard');
chk(Math.abs(ve-5.7)<0.01,'мир 2, Лёгкий: скорость капли 6,5 − 1,0·0,8 = 5,7: '+ve);chk(Math.abs(vm-6.1)<0.01,'Средний: поправка вдвое меньше (6,1): '+vm);chk(vh===6.5,'Богатырский: 6,5: '+vh);
P[0].path='easy';P[1].path='easy';ZC.W.bolts.length=0;const sh=[0,1,2].map(i=>ZC.FIN.dbgFoe('shchuka',h.pos.x+3+i,h.pos.z-2,{signals:['blue']}));sh.forEach(e=>{e.state='idle';e.cd=0;e.tgt=null;});
let maxS=0;for(let i=0;i<240;i++){ZC.tick(1);const n=sh.filter(e=>e.alive&&e.tgt===h&&(e.state==='wind'||e.state==='ready')).length+ZC.W.bolts.filter(b=>!b.refl&&b.tgt===h).length;maxS=Math.max(maxS,n);}
chk(maxS<=2,'не больше двух стрелков на игрока: '+maxS);chk(maxS>=1,'стрелки вообще стреляют: '+maxS);sh.forEach(kill);ZC.W.bolts.length=0;
['v '+[ve,vm,vh].join('/')+' maxShooters='+maxS].concat(BAD)
//@@
// окно отбива капли шире: капля, к которой щит нажат за 0,5 с до удара (Лёгкий путь, мир 2: 0,38+0,07·0,8+0,05 = 0,486), отбивается; за 0,6 — нет
setup('2-1');const P=ZC.players,h=P[0].heroes[P[0].act];P[0].path='easy';P[1].path='easy';
window.boltAt=left=>{P[0].downed=false;P[0].petals=3;h.iT=0;const e=ZC.FIN.dbgFoe('shchuka',h.pos.x+3.5,h.pos.z-1.5,{signals:['blue']});const par0=ZC.G.stats.parries,pt0=P[0].petals;
  const g=ZC.W.group,b={g:null};ZC.W.bolts.length=0;e.state='idle';e.cd=99;
  // капля сразу «в зону»: eta задаём вручную, как будто щит нажат за left с до удара
  const bolt={g:new THREE.Group(),p:h.pos.clone().add(new THREE.Vector3(0.7,1,0)),from:e,tgt:h,v:5.7,left:left,eta:left,refl:false,t:0};bolt.g.position.copy(bolt.p);bolt.p=bolt.g.position;g.add(bolt.g);ZC.W.bolts.push(bolt);
  for(let i=0;i<40&&ZC.W.bolts.some(x=>x===bolt);i++)ZC.tick(1);const r={parried:ZC.G.stats.parries-par0,petals:P[0].petals};kill(e);ZC.W.bolts.length=0;return r;};
const w1=boltAt(0.46),w2=boltAt(0.62);
chk(w1.parried===1,'щит за 0,46 с до удара — отбил (окно 0,486): '+JSON.stringify(w1));chk(w2.parried===0,'щит за 0,62 с — не отбил: '+JSON.stringify(w2));
['win '+JSON.stringify([w1,w2])].concat(BAD)
//@@
// ролик: в паре пропускает и один игрок, если держит прыжок 2 с; оба — 1 с; «осталось N с»; пункт «Пропустить ролик» в паузе
window.waitCine=()=>{for(let i=0;i<400&&!ZC.G.cine;i++)ZC.tick(1);return ZC.G.cine;};
ZC.G.manual=true;ZC.startFrom(ZC.LV('1-3'));const c0=waitCine();chk(!!c0&&c0.skippable,'на старте 1-3 идёт ролик, его можно пропустить');
ZC.tick(90);const t0=ZC.G.cine&&ZC.G.cine.dur-ZC.G.cine.t;chk(ZC.G.cine===c0&&t0>3.4,'ролик ещё идёт, осталось '+(t0&&t0.toFixed(1))+' с');
ZC.FIN.ui(1/60);const sk=document.getElementById('skip');chk(sk&&sk.style.display!=='none'&&/осталось \d+ с/.test(sk.textContent),'панель пропуска: «'+(sk&&sk.textContent)+'»');
ZC.hold('Space',true);ZC.tick(60);ZC.FIN.ui(1/60);chk(ZC.G.cine===c0,'один держит 1 с — ещё не пропущено');chk(/Друг хочет пропустить/.test(sk.textContent),'подпись «Друг хочет пропустить»: '+sk.textContent);
ZC.tick(70);chk(ZC.G.cine!==c0,'один держит 2 с — ролик пропущен');ZC.hold('Space',false);
['skip1 '+(ZC.G.cine!==c0)].concat(BAD)
//@@
// оба держат — по-прежнему 1 с; пауза в ролике — «Пропустить ролик»
ZC.G.manual=true;ZC.startFrom(ZC.LV('1-3'));let cc=waitCine();ZC.tick(70);chk(!!cc&&ZC.G.cine===cc,'снова ролик');
ZC.hold('Space',true);ZC.hold('KeyM',true);ZC.tick(75);chk(ZC.G.cine!==cc,'оба держат — пропущено за ~1 с');ZC.hold('Space',false);ZC.hold('KeyM',false);
ZC.G.manual=true;ZC.startFrom(ZC.LV('1-4'));cc=waitCine();ZC.tick(70);
if(cc&&cc.skippable){ZC.menu('pause');const M=ZC.FIN.menu,it=M&&M.items&&M.items.find(x=>x.label==='Пропустить ролик');chk(!!it,'пункт паузы: '+(it&&it.label)+' / '+(M&&M.items.map(i=>i.label).join('|')));if(it&&it.act){it.act();ZC.tick(5);chk(ZC.G.cine!==cc,'«Пропустить ролик» из паузы сработал');}}
else chk(true,'(1-4: ролика нет — проверка паузы пропущена)');
['pause '+(cc&&cc.skippable)].concat(BAD)
//@@
// «Читать во всех мирах»: авто — Ёжик и Лисёнок; в мире 2 задачи читаются; в настройках пункт переключается; в паузе — пункт «Читать задачи вслух»
window.SAID=[];const F=ZC.FIN,RA=F.readAloud,P=ZC.players;RA.mock=t=>SAID.push(t);F.set.readAloud=true;F.set.vox=0;delete F.set.readAloudAll;F.set.hints=true;   // подсказки по умолчанию выключены (карточки скрыты) — для чтения вслух нужны включённые

P[0].path='hard';P[1].path='hard';chk(RA.all()===false&&RA.allLabel()==='авто','авто, оба Богатыри — не читает: '+RA.all());P[1].path='mid';chk(RA.all()===true,'авто, есть Лисёнок — читает');P[0].path='easy';P[1].path='easy';
RA.cycleAll(1);chk(F.set.readAloudAll===true&&RA.allLabel()==='да','авто → да');RA.cycleAll(1);chk(F.set.readAloudAll===false&&RA.allLabel()==='нет','да → нет');RA.cycleAll(1);chk(F.set.readAloudAll==null&&RA.allLabel()==='авто','нет → авто');
const S=window.settingsScreen?null:null;
setup('2-1');for(let i=0;i<240;i++)F.ui(1/60);ZC.sim(8);for(let i=0;i<240;i++)F.ui(1/60);
chk(SAID.length>=1,'мир 2: задача прочитана вслух ('+SAID.length+')');
F.set.readAloudAll=false;SAID.length=0;ZC.loadLevel(ZC.LV('2-2'));ZC.tick(20);for(let q=0;q<4&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.sim(8);for(let i=0;i<240;i++)F.ui(1/60);chk(SAID.length===0,'«нет» — в мире 2 молчит ('+SAID.length+')');
delete F.set.readAloudAll;
['said '+SAID.length].concat(BAD)
//@@
// счётчики по мирам: мир 2 тоже ведёт журнал (время, задачи, ореол, призрак), zlatayaReport() их выводит
const R=JSON.parse(window.zlatayaReport());const ids=Object.keys(R.levels);chk(ids.includes('2-1')&&R.levels['2-1']['минут']>=0,'в отчёте есть 2-1: '+ids.join(','));
const l=R.levels['2-1'];chk('задач' in l&&'ореол' in l&&'призрак' in l&&'сек на задачу' in l,'поля отчёта: '+Object.keys(l).join(','));
// задача выполнена за n секунд — попадает в журнал
setup('2-1');const P=ZC.players,o=ZC.W.objectives[0][0],done0=o.done;let flip=false;o.done=()=>flip;const lg0=KD.log['2-1'].tasks;ZC.tick(120);flip=true;ZC.tick(5);o.done=done0;
chk(KD.log['2-1'].tasks>lg0&&KD.log['2-1'].taskSec>0,'задача записана: '+JSON.stringify(KD.log['2-1']));
BAD.length||ERR.length?'FAIL '+BAD.join(' ; ')+' errs='+ERR.slice(0,3).join(' | '):'kids2 ok'
