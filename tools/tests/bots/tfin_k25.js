//@@ wait=1500
// релиз final06: 2-5 «Китеж звонит» вдвое длиннее (late_99i_k25.js) — новые участки вдвоём настоящими нажатиями:
// площадка над провалом — ролик «Третья струна — Звон»; мосты-призраки: Прошка звонит у ближнего колокола — проступает ПРАВЫЙ мост,
// Пелагея идёт; за провалом она звонит — проступает ЛЕВЫЙ, идёт Прошка. Светлояр: без Феврониина камня отражения нет; Прошка на
// камне — Пелагея идёт по невидимым камням, потом наоборот. Напев Садко: не тот звук — «фальшь»; по порядку слева-справа — ворота с
// нотами уходят. Главный колокол: стычка, Потап вешает язык колокола, вчетвером на «ТРИ» — «Бом»: Китеж выходит из воды.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.NOCINE=()=>{for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}};
window.CINE=(max)=>{let t=0;while(!ZC.G.cine&&t<(max||300)){ZC.tick(1);t++;}const was=!!ZC.G.cine;while(ZC.G.cine&&t<3000){ZC.tick(1);t++;}return was;};
// идти и звонить: пока второй идёт, первый играет у ракушки каждые 1,5 с
window.RING=pi=>(h,i)=>{if(i%90===0)ZC.press(pi?'Semicolon':'KeyR');};
ZC.startFrom(ZC.LV('2-5'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(60);NOCINE();ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
'links='+ZC.W.linkTotal+' nuts='+ZC.W.nutTotal
//@@
// площадка над провалом: ролик «Звон» — третья струна; после него мостов не видно
const D=ZC.W.warp25('ghost');ZC.tick(5);if(!CINE(200))throw new Error('нет ролика «Звон»');ZC.tick(30);
if(!D.F.zvon)throw new Error('нет флага zvon');if(D.brL.solid||D.brR.solid)throw new Error('мосты видны без звона');'zvon ok'
//@@
// мосты-призраки: Пелагея — к правому мосту; Прошка звонит у ближнего колокола (и звонит, пока она идёт)
const D=ZC.W.dbg25();const r=[U.walkTo(1,4.6,-79.4,6),U.walkTo(0,-6.4,-77.6,6)];U.tap('KeyR');ZC.tick(10);if(!D.brR.solid||D.brL.solid)throw new Error('ближний колокол не кажет правый мост: '+D.brR.solid+' '+D.brL.solid);
r.push(U.walkTo(1,4.6,-99.6,10,RING(0)));if(!(U.act(1).pos.z<-98.6&&U.act(1).pos.y>5))throw new Error('Пелагея не перешла: '+r.join()+' '+U.st());'right bridge '+r.join()
//@@ shot=k25_bridge.png
// за провалом Пелагея звонит в дальний — проступает левый; Прошка идёт по нему
const D=ZC.W.dbg25();ZC.tick(240);if(D.brL.solid||D.brR.solid)throw new Error('мосты не погасли');const r=[U.walkTo(1,6.4,-100.8,6)];U.tap('Semicolon');ZC.tick(10);if(!D.brL.solid)throw new Error('дальний колокол не кажет левый мост');
r.push(U.walkTo(0,-4.6,-80.4,4,RING(1)),U.walkTo(0,-4.6,-99.6,10,RING(1)));if(!(U.act(0).pos.z<-98.6&&U.act(0).pos.y>5))throw new Error('Прошка не перешёл: '+r.join()+' '+U.st());
'left bridge '+r.join()+' nut='+(ZC.W.nuts)
//@@
// Светлояр: без Феврониина камня отражения нет; Прошка на камне — отражение; Пелагея идёт по невидимым камням
const D=ZC.W.dbg25();ZC.tick(60);if(D.F.look||D.STN[0].rf.material.opacity>0.05)throw new Error('отражение без камня');const r=[U.walkTo(0,-6.6,-100.6,6)];ZC.tick(60);
if(!D.F.look||!(D.STN[0].rf.material.opacity>0.2))throw new Error('Прошка на камне — отражения нет: '+D.F.look+' '+D.STN[0].rf.material.opacity);
const pts=D.STN.filter(s=>!s.side).map(s=>[s.x,s.z]).concat([[1.6,-121]]);r.push(U.walkTo(1,-1.5,-101.6,6),U.path(1,pts,4));if(!(U.act(1).pos.z<-120.2&&U.act(1).pos.y>5))throw new Error('Пелагея не прошла Светлояр: '+r.join()+' '+U.st());'lake P2 '+r.join()
//@@ shot=k25_lake.png
// Пелагея на дальнем камне — Прошка идёт; потом оба в палату
const D=ZC.W.dbg25();const r=[U.walkTo(1,6.6,-121.6,6)];ZC.tick(30);if(!D.F.look)throw new Error('дальний камень не кажет отражение');
const pts=D.STN.filter(s=>!s.side).map(s=>[s.x,s.z]).concat([[1.6,-121]]);r.push(U.walkTo(0,-1.5,-101.6,6),U.path(0,pts,4));if(!(U.act(0).pos.z<-120.2&&U.act(0).pos.y>5))throw new Error('Прошка не прошёл Светлояр: '+r.join()+' '+U.st());'lake P1 '+r.join()
//@@
// напев Садко: Пелагея звонит не тот (синий первым) — «фальшь»; потом по порядку: жёлтый (слева), синий (справа), розовый (слева), зелёный (справа)
const D=ZC.W.dbg25();const r=[U.walkTo(0,-5,-125,6),U.walkTo(0,-5,-137.3,6),U.walkTo(1,5,-125,6),U.walkTo(1,5,-137.3,6)];
U.tap('Semicolon');ZC.tick(10);if(D.TN.i!==0||!D.F.tuneTold)throw new Error('не тот звук не сбросил напев: '+D.TN.i);ZC.tick(60);
U.tap('KeyR');ZC.tick(20);if(D.TN.i!==1)throw new Error('жёлтый не лёг: '+D.TN.i);U.tap('Semicolon');ZC.tick(20);if(D.TN.i!==2)throw new Error('синий не лёг: '+D.TN.i);
r.push(U.walkTo(0,-5,-127.3,4));U.tap('KeyR');ZC.tick(10);if(D.TN.i!==3)throw new Error('розовый не лёг: '+D.TN.i+' '+r.join());r.push(U.walkTo(1,5,-127.3,4));U.tap('Semicolon');ZC.tick(10);
if(!D.F.tune)throw new Error('напев не сложился: '+D.TN.i+' '+r.join());if(!CINE(120))throw new Error('нет ролика напева');ZC.tick(20);if(D.mosC.on)throw new Error('ворота с нотами не ушли');'tune '+r.join()
//@@ shot=k25_tune.png
ZC.tick(2);
//@@
// главный колокол: стычка (мороков — долой), Потап вешает язык; вчетвером на «ТРИ» — «Бом», Китеж выходит из воды
const D=ZC.W.dbg25(),F=D.F,H=ZC.HERO;const r=[U.walkTo(0,-2,-146.4,8),U.walkTo(1,2,-146.4,8)];ZC.tick(30);if(!D.arena.started)throw new Error('стычка не началась: '+r.join()+' '+U.st());
r.push(U.brawl(20));ZC.W.enemies.forEach(e=>{if(e.alive){e.alive=false;ZC.W.group.remove(e.g);}});ZC.tick(60);if(!CINE(300))throw new Error('нет ролика с языком');ZC.tick(20);if(!F.tongueIn)throw new Error('язык не повешен');
const sp=[[0.88,-150.12],[-0.88,-150.12],[-0.88,-151.88],[0.88,-151.88]];[H.proshka,H.potap,H.pelageya,H.yosha].forEach((h,i)=>{h.pos.set(sp[i][0],6.7,sp[i][1]);h.vel.set(0,0,0);});ZC.tick(20);
for(let s=0;s<3;s++){for(let i=0;i<300;i++){ZC.tick(1);if(F.cnt&&F.cnt.t>2.05&&F.cnt.t<2.2&&F.cnt.p[0]===null){ZC.press('Space');ZC.press('KeyM');ZC.tick(1);break;}}r.push('sw='+(F.cnt&&F.cnt.sw));ZC.tick(80);
  [H.proshka,H.potap,H.pelageya,H.yosha].forEach((h,i)=>{h.pos.set(sp[i][0],6.7,sp[i][1]);h.vel.set(0,0,0);});ZC.tick(10);}
if(!F.bomWait)throw new Error('не раскачали: '+r.join());ZC.tick(80);if(!ZC.G.cine)throw new Error('нет «Бом»');ZC.tick(60*10);if(!ZC.W.seaOff)throw new Error('Китеж не вышел из воды');'bell '+r.join()
//@@ shot=k25_bom.png
ZC.tick(2);
//@@
ZC.tick(60*12);ZC.skip();ZC.tick(100);if(ZC.W.levelId==='2-5'&&!ZC.G.done['2-5'])throw new Error('уровень не пройден: '+U.st());if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-5 done errs=0'
