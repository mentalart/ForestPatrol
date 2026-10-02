//@@
// релиз final06: 5-Б2 — пять этапов Кощея от вступления до эпилога (ролики пропускаются, этапы выигрываются через отладочные вызовы),
// кадры каждого этапа; цепи-помощники никогда не бьют невидимыми (ушедшие под землю — без атак); ключ, замок, шар, ворон, прыжок, игла.
window.K5=ZC.FIN.k5;window.H=ZC.HERO;window.A=pi=>ZC.players[pi].heroes[ZC.players[pi].act];
window.skipAll=(n)=>{for(let i=0;i<(n||6);i++){if(ZC.G.cine){ZC.skip();ZC.tick(3);}else break;}};
window.vis=o=>{let n=o;while(n){if(!n.visible)return false;n=n.parent;}return true;};
window.ERR=[];window.addEventListener('error',e=>ERR.push(String(e.message)));
ZC.startFrom(ZC.LV('5-B2'));ZC.G.manual=true;ZC.tick(20);['lvl='+ZC.W.levelId,'stage='+ZC.W.flags.stage,'cine='+!!ZC.G.cine,'k5='+!!K5].join(' ')
//@@
// вступление → карточки этапа 1 → бой
ZC.skip();ZC.tick(5);const a=['after intro st='+K5.st+' cine='+!!ZC.G.cine+' tut='+ZC.FIN.boss4b.on];skipAll();ZC.tick(5);a.push('fight='+K5.fight,'lit='+K5.candles.filter(c=>c.lit).length,'dome='+K5.dome.visible);a
//@@ shot=kosh_s1.png
// этап 1: цепи выходят, бьют, уходят под землю; ни одна «ушедшая» не атакует
for(const pi of[0,1])ZC.players[pi].petals=99;   // свечей и цепей вдвое больше — отладочный проход не должен падать, пока бот стоит
const bad=[];for(let i=0;i<30;i++){ZC.tick(20);for(const e of ZC.W.enemies){if(e.kind!=='cep')continue;const hidden=!vis(e.g);if(hidden&&['ready','wind','strike'].includes(e.state))bad.push(e.state);}}
ZC.FIN.occ.frame();const ch=ZC.W.enemies.filter(e=>e.kind==='cep');const r=['chains='+ch.length+' states='+ch.map(e=>e.state).join(','),'hiddenAttacks='+bad.length,'bolts='+ZC.W.bolts.length,'zones='+(K5.zones||[]).length];
if(bad.length)throw new Error('невидимая цепь атакует: '+bad.join(','));r
//@@
// гасим свечи (их восемь): одну — отражённой каплей (onReflect), одну — водой (onWater), остальные — ударами
const c=K5.candles;c[0].onReflect();const wt=ZC.W.waterTargets.find(w=>w.pos===c[1].pos);wt.onWater();for(const x of c.slice(2))for(let i=0;i<6&&x.lit;i++)x.k5hit(x,A(0));ZC.tick(40);
['lit='+c.filter(x=>x.lit).length,'fight='+K5.fight,'stage='+ZC.W.flags.stage,'cine='+!!ZC.G.cine].join(' ')
//@@
// ролик «свечи задули» → Сказ 1 (выбирает Игрок 2) → ролик → карточки этапа 2
skipAll();ZC.tick(5);const r=['ui='+ZC.G.ui];U.tap('KeyM');ZC.tick(5);skipAll();ZC.tick(5);r.push('names.potap='+!!ZC.G.flags.names.potap,'st='+K5.st);skipAll();ZC.tick(5);r.push('fight='+K5.fight,'live='+K5.live,'emb='+K5.KB.embers+'/'+K5.KB.maxEmb);r
//@@ shot=kosh_s2.png
// этап 2: ключ летит и запирает, друг отпирает ударами; искорка
ZC.tick(60);const kb=K5.KB;const key=K5.keyMake(A(1));ZC.tick(30);const r=['key state='+key.state];const lk=A(1).kind;K5.lockHero(A(1));ZC.tick(5);r.push('locked='+!!K5.locks[lk]);
for(let i=0;i<5;i++){const L=K5.locks[lk];if(!L)break;A(0).pos.set(L.h.pos.x+1,0,L.h.pos.z);ZC.W.onAttack(0,A(0));}ZC.tick(5);r.push('afterHits locked='+!!K5.locks[lk]);
K5.sparkTo(1,A(0).pos);ZC.tick(20);r.push('spark='+(K5.spark&&K5.spark.pi));ZC.FIN.occ.frame();r
//@@
// спесь сбита → золотая нить вдвоём → ролик → Сказ 2 (выбирает Игрок 1) → буря → карточки этапа 3
const kb=K5.KB;kb.embers=0;kb.state='broken';kb.t=0;ZC.tick(3);const r=['broken bdur='+kb.bdur];kb.k5hit(kb,A(0));ZC.tick(2);kb.k5hit(kb,A(1));ZC.tick(10);r.push('st='+K5.st+' fight='+K5.fight+' stage='+ZC.W.flags.stage);
skipAll();ZC.tick(5);r.push('ui='+ZC.G.ui);U.tap('Space');ZC.tick(5);skipAll(8);ZC.tick(5);r.push('names.yosha='+!!ZC.G.flags.names.yosha,'st='+K5.st);skipAll();ZC.tick(5);r.push('fight='+K5.fight,'flyY='+kb.pos.y.toFixed(1),'storm='+K5.storm.toFixed(2));r
//@@ shot=kosh_s3.png
// этап 3: шар — отбить другу (левый щит в срок), друг — в небо; вороны; крушение с неба
ZC.tick(90);const kb=K5.KB;const r=['ravens='+ZC.W.enemies.filter(e=>e.kind==='k5raven'&&e.alive).length,'orbs='+K5.orbs.length];
const o=K5.orbThrow(A(0));for(let i=0;i<400&&o.st==='in'&&K5.orbs.includes(o);i++){if(o.left===null&&o.eta<0.28)ZC.W.onGuardTap(0,A(0));ZC.tick(1);}r.push('after p0: st='+o.st);
for(let i=0;i<400&&o.st==='pass'&&K5.orbs.includes(o);i++){if(o.left===null&&o.eta<0.28)ZC.W.onGuardTap(1,A(1));ZC.tick(1);}r.push('after p1: st='+o.st);for(let i=0;i<120&&K5.orbs.includes(o);i++)ZC.tick(1);r.push('emb='+kb.embers+'/'+kb.maxEmb,'log='+K5.log.slice(-4).join(','));
kb.embers=0;kb.state='broken';kb.t=0;for(let i=0;i<60;i++)ZC.tick(1);r.push('crash y='+kb.pos.y.toFixed(2)+' state='+kb.state);ZC.FIN.occ.frame();r
//@@
kb=K5.KB;kb.k5hit(kb,A(0));ZC.tick(2);kb.k5hit(kb,A(1));ZC.tick(10);const r=['st='+K5.st+' stage='+ZC.W.flags.stage];skipAll();ZC.tick(5);skipAll();ZC.tick(5);r.push('st='+K5.st+' fight='+K5.fight+' sword='+K5.sword.visible);r
//@@ shot=kosh_s4.png
// этап 4: серия и око; прыжок с волной; костяные щитники при половине спеси
ZC.tick(120);const kb=K5.KB;const r=['mark='+K5.mark+' pi='+kb.pi+' state='+kb.state];K5.leap();for(let i=0;i<120;i++)ZC.tick(1);r.push('after leap state='+kb.state+' daze='+kb.dazeT.toFixed(1)+' y='+kb.pos.y.toFixed(2));
// «Кости, встаньте!» — короткий ролик, из земли встают пятеро щитников (по отзыву 2: был один-два)
kb.embers=Math.ceil(kb.maxEmb/2);ZC.tick(10);const bc=!!ZC.G.cine;for(let i=0;i<400&&ZC.G.cine;i++)ZC.tick(1);ZC.tick(60);const nb=ZC.W.enemies.filter(e=>e.kind==='k5bone'&&e.alive).length;r.push('bones cine='+bc+' bones='+nb);
if(nb!==5)throw new Error('щитников не пять: '+nb);ZC.FIN.occ.frame();r
//@@
const kb=K5.KB;kb.embers=0;kb.state='broken';kb.t=0;ZC.tick(3);kb.k5hit(kb,A(0));ZC.tick(2);kb.k5hit(kb,A(1));ZC.tick(10);const r=['st='+K5.st+' stage='+ZC.W.flags.stage];skipAll(8);ZC.tick(5);skipAll();ZC.tick(5);
r.push('st='+K5.st+' fight='+K5.fight+' holder='+(K5.needle&&K5.needle.holder&&K5.needle.holder.kind));r
//@@ shot=kosh_s5.png
// этап 5: передать иглу, ковать в такт у наковальни, «все цепи острова» — разбить три цепи
ZC.tick(60);const r=[];const hold=K5.needle.holder;K5.needlePass(hold.player);ZC.tick(40);r.push('pass → '+(K5.needle.holder&&K5.needle.holder.kind));
const pr=H.proshka;if(K5.needle.holder!==pr){ZC.players[0].act=ZC.players[0].heroes.indexOf(pr);ZC.players[0].heroes.forEach((h,k)=>{h.active=h===pr;});}pr.pos.set(K5.ANV.x,0,K5.ANV.z+1.4);K5.needle.holder=pr;ZC.tick(3);r.push('forging='+K5.forging());
let good=0;for(let i=0;i<60*10&&K5.forge.n<4;i++){const u=K5.forge.c%0.75;if(K5.forging()&&(u<0.03||u>0.72)&&ZC.G.time>(window._lt||0)){window._lt=ZC.G.time+0.3;ZC.W.onAttack(0,pr);}ZC.tick(1);if(K5.KB.state==='wind')K5.KB.state='idle';}
r.push('forge='+K5.forge.n+' ring='+K5.RG.on);
// «Все цепи острова — ко мне!» (отзыв 3): три чёрные цепи у наковальни, ветер дует от наковальни, из-под земли — руки; ковать нельзя, пока цепи целы
for(let i=0;i<60*5&&!(K5.RG.chains&&K5.RG.chains.length);i++)ZC.tick(1);const RG=K5.RG,W5=K5.nat.wind;if(!RG.chains)throw new Error('на 4-м ударе буря не началась: forge='+K5.forge.n);r.push('chains='+RG.chains.length+' wind='+(W5&&W5.mode)+' forging='+K5.forging());
if(RG.chains.length!==3)throw new Error('цепей не три: '+RG.chains.length);if(!W5||W5.mode!=='rad')throw new Error('нет ветра от наковальни');if(K5.forging())throw new Error('ковка идёт во время бури');
ZC.tick(90);const hs=K5.nat.hands.length;r.push('hands='+hs);
RG.chains.slice().forEach((e,i)=>{e.onFinisher(A(i%2));ZC.tick(30);});for(let i=0;i<60*2&&RG.on;i++)ZC.tick(1);
r.push('after gale on='+RG.on+' state='+K5.KB.state+' wind='+!!K5.nat.wind+' log='+K5.log.slice(-4).join(','));if(!K5.log.includes('ringok'))throw new Error('буря не кончилась победой');ZC.FIN.occ.frame();r
//@@
// застёжка скована → финальный ролик → Сказ 3 (оба) → «Цепь» → эпилог
K5.forge.n=9;K5.stageWin(5);ZC.tick(5);const r=['stage='+ZC.W.flags.stage];skipAll();ZC.tick(5);r.push('ui='+ZC.G.ui);U.tap('Space');U.tap('KeyM');ZC.tick(5);skipAll();ZC.tick(60);skipAll();ZC.tick(200);
r.push('names='+JSON.stringify(ZC.G.flags.names),'ending='+JSON.stringify(ZC.G.flags.ending),'done='+!!ZC.G.done['5-B2'],'lvl='+ZC.W.levelId,'errs='+ERR.length+(ERR.length?' '+ERR.slice(0,3).join(' | '):''));r
