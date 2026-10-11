//@@
// 3-5 «Гуси-лебеди» на клавишах (docs/40): гусь видит свет; тёмный обход по лиловым облачкам с орешком; рогатка в колокольчик — сторож отворачивается,
// со светом по мостку; печка угощает — пирожок; Потап светит из-под щита — гусь над мостком не видит.
ZC.startFrom(ZC.LV('3-5'));ZC.G.manual=true;ZC.tick(20);ZC.skip();ZC.tick(5);const W=ZC.W,H=ZC.HERO;const r=[W.name,W.geese.length];
const q=W.geese[0];U.tap('KeyR');ZC.tick(2);H.proshka.pos.set(q.fp.x,0,q.fp.z);ZC.tick(3);let t=0;while(q.state==='fly'&&t<200){H.proshka.pos.set(q.fp.x,0.3,q.fp.z);ZC.tick(1);t++;}
r.push('state='+q.state);ZC.tick(60);r.push(U.st(),'lit='+H.proshka.lit,'geese='+(ZC.G.stats.geese||0));if(q.state==='fly')throw new Error('гусь не увидел свет: '+r.join(' | '));r
//@@
// тёмный обход справа: лиловые мостки без света, орешок на облачке
const W=ZC.W,H=ZC.HERO,r=[];if(U.act(0).lit)U.tap('KeyR');ZC.tick(3);const n0=W.nuts;H.proshka.pos.set(0,0.05,-6);ZC.tick(10);
r.push(U.path(0,[[0,-18.5],[2.6,-21.6],[4.8,-23.4],[10,-23.4],[10,-28],[10,-34.6],[7.2,-37.4],[1,-41]],4),'nuts+='+(W.nuts-n0),'z='+H.proshka.pos.z.toFixed(1),'falls='+(ZC.G.stats.falls||0));
if(H.proshka.pos.z>-40||W.nuts-n0<1)throw new Error('обход не пройден: '+r.join(' | '));r
//@@
// сторож: рогатка в колокольчик (E), сторож отворачивается — со светом по мостку
const W=ZC.W,H=ZC.HERO,K=W.k35,r=[];const g0=ZC.G.stats.geese||0;const P=H.proshka;r.push(U.walkTo(0,-1,-48.6,4));P.face=Math.atan2(-4.6,-12.6);ZC.tick(2);U.tap('KeyE');ZC.tick(40);r.push('dist='+K.watch().toFixed(1));
if(!(K.watch()>1))throw new Error('рогатка не звякнула: '+r.join(' | '));U.tap('KeyR');ZC.tick(3);r.push(U.path(0,[[0,-49.6],[0,-59.6]],3));U.tap('KeyR');ZC.tick(3);r.push('z='+P.pos.z.toFixed(1),'caught='+((ZC.G.stats.geese||0)-g0));
if(P.pos.z>-59||(ZC.G.stats.geese||0)-g0)throw new Error('мосток сторожа: '+r.join(' | '));r
//@@ shot=w35a.png
ZC.tick(1);
//@@
// печка угощает первого — съесть пирожок (E)
const W=ZC.W,H=ZC.HERO,r=[];r.push(U.walkTo(0,0,-64.8,4),'pie='+!!W.flags.pie);U.tap('KeyE');ZC.tick(60);r.push('ok='+!!W.flags.stoveOK);if(!W.flags.stoveOK)throw new Error('пирожок: '+r.join(' | '));ZC.tick(150);r
//@@
// щит Потапа: перо горит, щит (G) над головой — гусь над мостком не видит; дошёл до конца мостка
const W=ZC.W,H=ZC.HERO,r=[];const g0=ZC.G.stats.geese||0;U.toKind('potap',0);const Pt=H.potap;Pt.pos.set(2.8,0.05,-70.4);ZC.tick(5);r.push(U.walkTo(0,0,-72.8,4));
U.tap('KeyR');ZC.tick(3);ZC.hold('KeyG',true);const hv=W.geese.find(g=>g.name==='hover1');let mx=0;for(let i=0;i<60*12&&Pt.pos.z>-83.4;i++){U.step(0,0,-84);mx=Math.max(mx,hv.sus||0);ZC.tick(1);}
U.rel(0);ZC.hold('KeyG',false);U.tap('KeyR');ZC.tick(3);r.push('z='+Pt.pos.z.toFixed(1),'maxSus='+mx.toFixed(2),'caught='+((ZC.G.stats.geese||0)-g0),'falls='+(ZC.G.stats.falls||0));
if(Pt.pos.z>-83||mx>0.05||(ZC.G.stats.geese||0)-g0)throw new Error('щит Потапа: '+r.join(' | '));r
//@@ shot=w35b.png
ZC.tick(1);
