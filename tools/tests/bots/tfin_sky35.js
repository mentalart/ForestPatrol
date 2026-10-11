//@@
// 3-5 «Гуси-лебеди» (late_99zm_sky35, docs/38): подозрение вместо мгновенного захвата, ободок и след пятна, гусь-сторож, спящий гусь,
// укрытия-задачи (яблонька — Потап у ствола, речка — волны), переправа «золотой — со светом, лиловый — без», колыбельная Тишки.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,200));_ce.apply(console,arguments);};}
ZC.startFrom(ZC.LV('3-5'));ZC.G.manual=true;ZC.tick(20);ZC.skip();ZC.tick(60);window.W=ZC.W;window.H=ZC.HERO;window.F=W.flags;
window.lit=(h,on)=>{h.lit=on;};
const r=['sus35='+!!W.sus35,'geese='+W.geese.length,'watch='+!!W.geese.find(q=>q.name==='watch'),'sleep='+!!W.geese.find(q=>q.name==='sleep'),'lead='+!!W.geese.find(q=>q.name==='lead')];
if(!W.sus35||!W.geese.find(q=>q.name==='watch')||!W.geese.find(q=>q.name==='sleep'))throw new Error('нет новых гусей: '+r.join(' | '));r.join(' | ')
//@@
// подозрение: свет в пятне гуся 1 — «!» растёт, гусь не хватает сразу; погасил до 1 — «Показалось…», не поймал; держал — поймал
const q=W.geese[0],P=H.proshka,g0=ZC.G.stats.geese||0;lit(P,true);const r=[];
for(let i=0;i<20;i++){P.pos.set(q.fp.x,0.05,q.fp.z);ZC.tick(1);}r.push('sus20='+(q.sus||0).toFixed(2),'st='+q.state,'ex='+q.ex.visible,'ring='+q.ring.visible,'ghost='+q.ghost.visible);
if(q.state!=='fly'||!(q.sus>0.2))throw new Error('подозрение не растёт или поймал сразу: '+r.join(' | '));
lit(P,false);ZC.tick(80);r.push('after='+(q.sus||0).toFixed(2),'caught='+((ZC.G.stats.geese||0)-g0));if((ZC.G.stats.geese||0)!==g0)throw new Error('поймал после того, как погасили: '+r.join(' | '));
lit(P,true);let t=0;while(q.state==='fly'&&t<240){P.pos.set(q.fp.x,0.05,q.fp.z);ZC.tick(1);t++;}r.push('grabT='+(t/60).toFixed(2),'st='+q.state);ZC.tick(120);lit(P,false);
if(t/60<0.5||t/60>1.6)throw new Error('время подозрения не то: '+r.join(' | '));r.join(' | ')
//@@
// сторож и спящий гусь: сторож смотрит то на мосток, то в сторону; спящий не видит, пока не шумнули рядом (кувырок)
F.chase=true;F.stage='chase';ZC.tick(5);const w=W.geese.find(q=>q.name==='watch'),s=W.geese.find(q=>q.name==='sleep');const r=[];const seen=new Set();
for(let i=0;i<60*7;i++){ZC.tick(1);if(i%10===0)seen.add(Math.round(Math.hypot(w.fp.x-0,w.fp.z+79.8))>2?'away':'bridge');}r.push('watch='+[...seen].join('+'));
if(seen.size<2)throw new Error('сторож не поворачивается: '+r.join(' | '));
r.push('sleep0='+s.state);const Y=H.yosha;U.toKind('yosha',1);Y.pos.set(1.5,0,-121.5);Y.vel.set(0,0,0);ZC.tick(10);r.push('quiet='+s.state);if(s.state!=='sleep')throw new Error('проснулся без шума: '+r.join(' | '));
Y.rollT=0.3;ZC.tick(3);r.push('noise='+s.state,'aw='+(s.awakeT||0).toFixed(1));if(s.state!=='fly')throw new Error('шум не будит: '+r.join(' | '));
ZC.tick(60*8);r.push('later='+s.state);if(s.state!=='sleep')throw new Error('не задремал снова: '+r.join(' | '));r.join(' | ')
//@@
// яблонька: укрытие ждёт Потапа у ствола; Потап у ствола — все под кроной, звено
const r=[];F.ate=true;F.treeAsk=true;F.treeEat=true;F.treeWater=true;const L0=W.links;ZC.tick(5);r.push('sh='+(W.shelter35()&&W.shelter35().name));
H.proshka.pos.set(1.5,0,-102.5);H.yosha.pos.set(-1.5,0,-102.5);H.pelageya.pos.set(0.5,0,-101.5);H.potap.pos.set(0,0,-96);ZC.tick(60*3);const S=W.shelter35();r.push('held='+(S&&S.held),'t='+(S&&S.t.toFixed(1)));
if(!S||S.held||S.t<7.9)throw new Error('без Потапа отсчёт пошёл: '+r.join(' | '));
H.potap.pos.set(0,0,-102.4);ZC.tick(60*12);r.push('done='+!!F.treeDone,'sh2='+!!W.shelter35(),'links='+(W.links-L0));if(W.shelter35()||W.links-L0<1)throw new Error('яблонька не спрятала: '+r.join(' | '));r.join(' | ')
//@@
// речка: три волны гусей — кто снаружи в волну, того назад; укрытие кончается после третьей
const r=[];F.riverAsk=true;F.dam=true;F.hollow=true;ZC.tick(3);const S=W.shelter35();r.push('waves='+(S&&S.waves&&S.waves.length));
H.proshka.pos.set(0,0,-139);H.potap.pos.set(-1,0,-139.5);H.yosha.pos.set(1,0,-139.2);H.pelageya.pos.set(4,0,-145);ZC.tick(60*3);r.push('wi='+(S&&S.wi),'pel.z='+H.pelageya.pos.z.toFixed(1));
if(!(H.pelageya.pos.z>-142))throw new Error('волна не отнесла того, кто снаружи: '+r.join(' | '));
H.pelageya.pos.set(0.5,0,-138.4);ZC.tick(60*8);r.push('rdone='+!!F.riverDone,'sh='+!!W.shelter35());if(W.shelter35())throw new Error('речка не кончилась: '+r.join(' | '));r.join(' | ')
//@@
// переправа: на лиловом со светом — проваливается мосток; со светом по золотому, без — по лиловому; колыбельная на последнем островке
const r=[];ZC.skip();F.final=true;F.stage='final';ZC.tick(5);W.gooseCalm=0;
const tileAt=z=>W.tiles.find(t=>Math.abs(t.z-z)<0.8&&Math.abs(t.x)<0.5);
const P=H.proshka;U.toKind('proshka',0);H.potap.pos.set(-6,0,-196);H.yosha.pos.set(-5,0,-196);H.pelageya.pos.set(-4,0,-196);
P.pos.set(0,0,-163);lit(P,true);ZC.tick(3);const sh=tileAt(-166);if(!sh||sh.type!=='shadow')throw new Error('нет лилового мостка');const sl=sh.solid;lit(P,false);ZC.tick(3);const sd=sh.solid;r.push('shadowLit='+sl,'shadowDark='+sd);
if(sl||!sd)throw new Error('лиловый мосток не по правилу: '+r.join(' | '));
const g=tileAt(-159);P.pos.set(0,0,-154);lit(P,true);ZC.tick(3);r.push('goldLit='+(g&&g.solid));if(!g||!g.solid)throw new Error('золотой мосток не держит со светом: '+r.join(' | '));
P.pos.set(0,0,-180);ZC.tick(3);r.push('lull='+!!F.lullaby,'calm='+(W.gooseCalm>100));lit(P,false);if(!F.lullaby)throw new Error('колыбельная не прозвучала: '+r.join(' | '));
ZC.tick(60*4);r.push('errs='+_errs.length+' '+_errs.slice(0,2).join(' / '));if(_errs.length)throw new Error(r.join(' | '));'3-5 sky35 ok '+r.join(' | ')
