//@@
// релиз final06: 5-Б2, отзыв 4. Перед каждым этапом — полные интерактивные карточки «как победить» при каждой игре уровня (даже если
// сохранение помнит, что их уже показывали), после «Сбился сказ» — короткая карточка «Ещё раз». «Сбился сказ» — только когда выбыли все
// четверо: рассыпались оба играющих героя, но вторые целы — бой идёт. Этап 3: воронов до четырёх, на половине спеси встают три
// костяных щитника. Этап 4: молнии за краем поляны бьют втрое чаще, чем на этапе 3.
window.K5=ZC.FIN.k5;window.CN=ZC.FIN.cine;window.H=ZC.HERO;window.A=pi=>ZC.players[pi].heroes[ZC.players[pi].act];window.ERR=[];window.addEventListener('error',e=>ERR.push(String(e.message)));
{const ce=console.error;console.error=(...a)=>{ERR.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.hideUI=()=>{for(const id of['banner','bubs','floats','subs','subsb','tip0','tip1','obj0','obj1','level','skip','bossbar'])if(document.getElementById(id))document.getElementById(id).style.visibility='hidden';};
window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};
window.CINES=[];CN.on('start',d=>{if(d&&d.def)CINES.push({dur:d.def.dur,k5:!!d.def.k5,shots:(d.def.shots||[]).length,stage:ZC.W.flags.stage});});
window.skipAll=n=>{for(let i=0;i<(n||6);i++){if(ZC.G.cine){ZC.skip();ZC.tick(3);}}};
// карточки этапа: запустить этап, поймать ролик-карточки (без пропуска), вернуть его длину и число шагов
window.tut=(n,retry)=>{const c0=CINES.length;K5.stageStart(n,retry);ZC.tick(3);const c=CINES.slice(c0).find(x=>!x.k5);for(let i=0;i<10&&ZC.G.cine;i++){ZC.skip();ZC.tick(3);}ZC.tick(5);return c||{dur:0,shots:0};};
// сохранение «помнит», что карточки уже были (как у того, кто проходил бой раньше)
ZC.G.flags.tut5b={1:true,2:true,3:true,4:true,5:true};
ZC.startFrom(ZC.LV('5-B2'));ZC.G.manual=true;ZC.tick(20);skipAll(12);ZC.tick(5);skipAll(12);ZC.tick(5);K5.auto=true;
window._c1=CINES.find(x=>!x.k5)||{dur:0,shots:0};['lvl='+ZC.W.levelId,'auto='+K5.auto,'этап 1 после вступления: '+_c1.shots+' карт, '+_c1.dur.toFixed(1)+' с']
//@@
// полные карточки перед каждым этапом
const r=['1: '+_c1.shots+' карт, '+_c1.dur.toFixed(1)+' с'];chk(_c1.shots>=3,'этап 1: нет полных карточек ('+_c1.shots+')');for(const n of[2,3,4,5]){const c=tut(n);r.push(n+': '+c.shots+' карт, '+c.dur.toFixed(1)+' с');chk(c.shots>=3,'этап '+n+': нет полных карточек ('+c.shots+')');}
for(const pi of[0,1])ZC.players[pi].petals=99;r
//@@
// этап 2: оба играющих героя рассыпались клубками — вторые целы, бой идёт; выбыли все четверо — «Сбился сказ», затем короткая карточка
const r=[];tut(2);for(const pi of[0,1])ZC.players[pi].petals=99;ZC.tick(30);chk(K5.st===2&&K5.fight,'не этап 2');
for(const pi of[0,1]){const p=ZC.players[pi];p.petals=0;p.downed=true;p.downT=10;p.revT=0;}ZC.tick(20);
r.push('оба играющих рассыпались: fight='+K5.fight+' lose='+K5.log.includes('lose2'));chk(K5.fight&&!K5.log.includes('lose2'),'«Сбился сказ», хотя вторые герои целы');
const others=[0,1].map(pi=>ZC.players[pi].heroes.find(h=>!h.active));for(const h of others)h._down={t:10,rev:0,cp:null};
const c0=CINES.length;ZC.tick(10);r.push('все четверо: lose='+K5.log.includes('lose2'));chk(K5.log.includes('lose2'),'выбыли все четверо, а этап не начат заново');
for(let i=0;i<200&&!(CINES.length>c0&&!ZC.G.cine&&K5.fight);i++){if(ZC.G.cine&&CINES.length>c0){ZC.skip();}ZC.tick(1);}
const c=CINES.slice(c0).find(x=>!x.k5);r.push('после проигрыша: '+(c?c.shots+' карт, '+c.dur.toFixed(1)+' с':'нет карточки'));chk(c&&c.shots===1,'после «Сбился сказ» нет короткой карточки');
for(const h of others)h._down=null;for(const pi of[0,1]){const p=ZC.players[pi];p.downed=false;p.petals=99;}r
//@@
// этап 3: воронов до четырёх; на половине спеси — «Кости, встаньте!» и трое щитников
tut(3);for(const pi of[0,1])ZC.players[pi].petals=99;const r=[];let mx=0;for(let i=0;i<60*24;i++){ZC.tick(1);if(ZC.G.cine){ZC.skip();ZC.tick(2);}mx=Math.max(mx,K5.adds.filter(e=>e.kind==='k5raven'&&e.alive).length);if(mx>=4&&i>60*3)break;for(const pi of[0,1])ZC.players[pi].petals=99;}
r.push('воронов max='+mx);chk(mx===4,'воронов не четыре: '+mx);
const kb=K5.KB;for(let i=0;i<300&&kb.state!=='k5cast';i++)ZC.tick(1);const c0=CINES.length;kb.embers=Math.ceil(kb.maxEmb/2);ZC.tick(5);const cine=!!ZC.G.cine;ZC.tick(80);hideUI();
r.push('ролик='+cine+' щитников пока '+ZC.W.enemies.filter(e=>e.kind==='k5bone'&&e.alive).length);r
//@@ shot=krule_bones3.png
for(let i=0;i<400&&ZC.G.cine;i++)ZC.tick(1);ZC.tick(30);const nb=ZC.W.enemies.filter(e=>e.kind==='k5bone'&&e.alive).length;chk(nb===3,'на этапе 3 щитников не трое: '+nb);
// гроза этапа 3: сколько раз ударила молния за 30 с
window.thunder=sec=>{let n=0,prev=K5.thT;for(let i=0;i<60*sec;i++){ZC.tick(1);if(ZC.G.cine){ZC.skip();ZC.tick(2);}const t=K5.thT;if(t!=null&&prev!=null&&t>prev+0.5)n++;prev=t;for(const pi of[0,1])ZC.players[pi].petals=99;}return n;};
window._t3=thunder(30);['щитников='+nb,'молний за 30 с на этапе 3: '+_t3]
//@@
// этап 4: молнии втрое чаще; щитников по-прежнему пятеро
tut(4);for(const pi of[0,1])ZC.players[pi].petals=99;const t4=thunder(30);chk(t4>=_t3*2.2&&t4>=8,'на этапе 4 молний не втрое больше: '+t4+' против '+_t3);hideUI();
const kb=K5.KB;kb.embers=Math.ceil(kb.maxEmb/2);ZC.tick(10);for(let i=0;i<500&&ZC.G.cine;i++)ZC.tick(1);ZC.tick(60);const nb=ZC.W.enemies.filter(e=>e.kind==='k5bone'&&e.alive).length;chk(nb===5,'на этапе 4 щитников не пятеро: '+nb);
['молний за 30 с на этапе 4: '+t4+' (этап 3: '+_t3+')','щитников='+nb]
//@@ shot=krule_s4.png
['errs='+ERR.length+(ERR[0]?' '+ERR[0]:''),'замечания: '+(BAD.join('; ')||'нет'),BAD.length===0&&ERR.length===0?'ok':'FAIL']
