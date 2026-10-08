//@@ wait=1500
// релиз final06: лестница подсказок FIN.help (late_79d_help.js; docs/33 п. 4) на образце 1-Б — щит (guard) и кувырок (roll).
// Бот нарочно не защищается: 1-й промах — кнопка мигает; 2-й — карточка ≤ 7 слов + стрелка; 3-й — показ приёма (призрак) и поблажка
// (замах враг дольше, окно шире); на «Богатыре» ступень 3 не включается; успех сбрасывает счёт; два падения — вызов onLesson.
window.ERR=[];window.addEventListener("error",e=>ERR.push(String(e.message)));{const ce=console.error;console.error=(...a)=>{ERR.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};
window.H=ZC.FIN.help;window.W=null;
window.setup=function(p0,p1){U.go();ZC.loadLevel(7);ZC.tick(60*2);ZC.skip();ZC.tick(60*2);window.W=ZC.W;ZC.players[0].path=p0;ZC.players[1].path=p1||p0;H.reset();
  for(const pi of[0,1]){ZC.players[pi].petals=99;}};
window.words=h=>String(h).replace(/<[^>]*>/g,' ').replace(/[^\wа-яё ]/gi,' ').split(/\s+/).filter(w=>w.length>0&&!/^[A-Z;.,\/]$/.test(w)).length;
// рука бьёт по герою: ставим героя вплотную к руке нужного знака и не защищаемся
window.hand=sig=>W.enemies.find(e=>e.kind==='hand'&&e.alive&&e.signals.includes(sig));
window.takeHit=function(pi,key,sig,max){const n0=H.st[pi]&&H.st[pi][key]?H.st[pi][key].miss:0,e=hand(sig),h=U.act(pi);let i=0;
  for(;i<60*(max||20);i++){const e2=hand(sig);if(!e2)break;h.pos.set(e2.pos.x+Math.sin(e2.face)*1.2,e2.pos.y,e2.pos.z+Math.cos(e2.face)*1.2);h.vel.set(0,0,0);ZC.hold('KeyG',false);ZC.tick(1);
    const s=H.st[pi]&&H.st[pi][key];if(s&&s.miss>n0)break;}
  return (H.st[pi][key]||{}).miss|0;};
setup('easy');
const m1=takeHit(0,'guard','yellow',30);
const s=H.st[0].guard;'miss='+m1+' stage='+(s&&s.stage)+' log='+H.log.join(',')
//@@
// 1-й промах: ступень 1 — кнопка мигает
const s=H.st[0].guard;chk(s.stage>=1,'нет ступени 1');const b=document.getElementById('finHelpBtn');
ZC.sim(0.2);chk(b&&getComputedStyle(b).display!=='none',(b?'кнопка скрыта':'нет кнопки'));chk(b&&/<kbd>|G/.test(b.innerHTML),'на кнопке нет клавиши: '+(b&&b.innerHTML));
chk(s.stage<2,'карточка раньше 2-го промаха');
'stage='+s.stage+' btn='+(b&&b.innerHTML.replace(/<[^>]*>/g,''))
//@@ shot=help_s1.png
// 2-й промах: ступень 2 — карточка ≤ 7 слов + стрелка
const m=takeHit(0,'guard','yellow',30);const s=H.st[0].guard;ZC.sim(0.2);
const tipH=ZC.players[0].tipHTML||'';chk(s.stage>=2,'нет ступени 2, miss='+m);chk(/Щит/.test(tipH),'карточка не про щит: '+tipH);chk(words(tipH)<=7,'карточка длиннее 7 слов: '+words(tipH)+' '+tipH);
const ar=document.getElementById('finHelpArr');chk(H.arrow&&ar&&getComputedStyle(ar).display!=='none','нет стрелки');
chk(s.stage<3,'показ раньше 3-го промаха');
'G='+ZC.G.state+' cine='+!!ZC.G.cine+' ui='+ZC.G.ui+' trans='+!!ZC.G.trans+' miss='+m+' stage='+s.stage+' words='+words(tipH)+' tip='+tipH.replace(/<[^>]*>/g,'')
//@@ shot=help_s2.png
// 3-й промах: ступень 3 — показ приёма (призрак) и поблажка; враг этого игрока медленнее
const m=takeHit(0,'guard','yellow',30);const s=H.st[0].guard;ZC.sim(0.2);
chk(s.stage>=3,'нет ступени 3, miss='+m);chk(H.demo[0]>0&&H.demo[0]<=8,'показ не идёт или длиннее 8 с: '+H.demo[0]);chk(H.slow[0]>0&&H.slow[0]<=20,'нет поблажки: '+H.slow[0]);
const T=H.timing().easy;chk(Math.abs(T.parry/H.base.easy.parry-1.3)<0.01,'окно не ×1,3: '+T.parry+'/'+H.base.easy.parry);
'miss='+m+' stage='+s.stage+' demo='+H.demo[0].toFixed(1)+' slow='+H.slow[0].toFixed(1)+' parry='+T.parry.toFixed(3)
//@@
// поблажка не залипает: через 20 с окно прежнее; успех (щит) сбрасывает счёт
for(let i=0;i<45&&H.slow[0]>0;i++)ZC.tick(60);const T=H.timing().easy;chk(H.slow[0]===0,'поблажка не кончилась: '+H.slow[0]);chk(Math.abs(T.parry-0.4)<0.001,'окно не вернулось: '+T.parry);
H.ok(0,'guard');chk(H.st[0].guard.miss===0&&H.st[0].guard.stage===0,'успех не сбросил счёт');
'parry='+T.parry+' after ok miss='+H.st[0].guard.miss
//@@
// таймер «без успеха»: 12 с — карточка, 20 с — показ
H.reset();let t=0;const s=()=>H.st[1]&&H.st[1].roll||{stage:0};
for(let i=0;i<60*11.5;i++){H.want(1,'roll');ZC.tick(1);}chk(s().stage===0,'ступень раньше 12 с: '+s().stage);
for(let i=0;i<60*1.5;i++){H.want(1,'roll');ZC.tick(1);}chk(s().stage===2,'нет карточки на 12 с: '+s().stage);
for(let i=0;i<60*8;i++){H.want(1,'roll');ZC.tick(1);}chk(s().stage===3,'нет показа на 20 с: '+s().stage);
'stage='+s().stage+' t='+s().t.toFixed(1)
//@@
// два падения без успеха — повтор урока (точка подключения onLesson)
H.reset();let got=null;H.onLesson=o=>{got=o;};H.miss(0,'guard');H.fall(0);chk(!got,'урок после одного падения');H.fall(0);chk(got&&got.pi===0&&got.key==='guard','нет вызова onLesson: '+JSON.stringify(got));
got=null;H.fall(0);H.ok(0,'guard');H.fall(0);chk(!got,'успех не сбросил падения');H.onLesson=null;
'lesson='+JSON.stringify(got)
//@@
// «Богатырь»: ступень 3 неактивна (без поблажек и показа), ступени 1–2 работают
setup('hard');const m=takeHit(0,'guard','yellow',30);takeHit(0,'guard','yellow',30);takeHit(0,'guard','yellow',30);const s=H.st[0].guard;ZC.sim(0.2);
chk(s.miss>=3,'мало промахов: '+s.miss);chk(s.stage===2,'на Богатыре ступень '+s.stage);chk(!(H.slow[0]>0),'поблажка на Богатыре');chk(!(H.demo[0]>0),'показ на Богатыре');
const T=H.timing().hard;chk(T.parry===0.15,'окно изменилось: '+T.parry);
let lesson=null;H.onLesson=o=>{lesson=o;};H.fall(0);H.fall(0);H.onLesson=null;chk(!lesson,'урок на Богатыре');
'hard miss='+s.miss+' stage='+s.stage
//@@
// «Лисёнок»: вдвое слабее (замах ×0,85, окно ×1,15)
setup('mid');for(let i=0;i<3;i++)takeHit(0,'guard','yellow',30);const s=H.st[0].guard;ZC.sim(0.2);
chk(s.stage===3,'на Лисёнке ступень '+s.stage);chk(Math.abs(H.k[0]-0.5)<1e-6,'k='+H.k[0]);const T=H.timing().mid;chk(Math.abs(T.parry/H.base.mid.parry-1.15)<0.01,'окно не ×1,15: '+T.parry);
'mid stage='+s.stage+' parry='+T.parry
//@@
// ошибок нет
chk(!(window.ERR&&window.ERR.length),'ошибки: '+(window.ERR||[]).join(' | '));
['замечаний '+BAD.length].concat(BAD)
