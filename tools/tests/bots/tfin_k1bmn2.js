//@@ wait=1500
// @timeout=1200
// релиз final06: 1-Б «Леший-Путаник» — миньоны этапа 2 «Ищи-свищи» (late_99zcc_k1b_mn2.js): белка-шишкомётка, белка-перегрызка, мохоноги.
// Проверки: на этапе 2 на ветке сидит белка; шишка в героя под жёлтым кругом — щит отбивает её в двойника (ложный лопается, настоящий светится), без щита — минус лепесток,
// кувырок — мимо; натянули струну — прибегает белка-перегрызка и грызёт её, перегрызает; удары по грызущей — распутана; круг 2 — две белки и мохоноги топчут ложные следы,
// удар — разлетаются мхом; на этапе 3 миньоны уходят; ошибок нет. Строка «//@@ shot=…» относится к шагу под ней: кадр снимается после него.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=4242;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.K=ZC.FIN.k1b;window.MN=K.mn2;MN.auto=true;U.go();ZC.loadLevel(7);ZC.tick(60*2);ZC.skip();ZC.tick(60*2);window.W=ZC.W;
W.bossNext();ZC.tick(60*3);ZC.skip();ZC.tick(60*2);
'phase='+W.flags.phase+' белок='+MN.sq.length+' path='+ZC.players[0].path
//@@ shot=k1bm2_wind.png
// белка замахнулась: жёлтый круг под героем
if(W.flags.phase!==2||MN.sq.length!==1)throw new Error('нет белки на этапе 2: '+MN.sq.length);
window.q=MN.sq[0];q.cd=0;let n=0;while(q.st!=='wind'&&n<120){ZC.tick(1);n++;}ZC.tick(Math.round(60*q.wd*0.7));'wind tgt='+(q.tgt&&q.tgt.kind)+' tele='+!!q.tele
//@@ shot=k1bm2_bounce.png
// щит: держим, пока шишка не прилетит — она отскакивает в двойника
window.waitCone=()=>{let n=0;while(!MN.cones.some(c=>c.kind==='in')&&n<200){ZC.tick(1);n++;}return MN.cones.find(c=>c.kind==='in');};
const c=waitCone();if(!c)throw new Error('шишка не полетела');const pi=c.h.player,G0=U.K[U.pk(pi)].g;ZC.hold(G0,true);let k=0;while(c.kind==='in'&&MN.cones.includes(c)&&k<120){ZC.tick(1);k++;}ZC.hold(G0,false);
ZC.tick(10);'shields='+MN.st.shields+' летит в '+(c.d?(c.d.real?'настоящего':'двойника'):'белку')
//@@
ZC.tick(60);if(MN.st.shields<1||MN.st.pops+MN.st.reveals+MN.st.stuns<1)throw new Error('отбитая шишка никуда не попала '+JSON.stringify(MN.st));
// без щита — минус лепесток
q.st='idle';q.cd=0;const c2=waitCone();const p=ZC.players[c2.h.player],pet=p.petals;let k=0;while(MN.cones.includes(c2)&&k<120){ZC.tick(1);k++;}
if(MN.st.hits<1||p.petals>=pet)throw new Error('шишка без щита не ранила: '+JSON.stringify(MN.st)+' petals '+pet+'→'+p.petals);
// кувырок — мимо
ZC.tick(60*1.5);q.st='idle';q.cd=0;const c3=waitCone();const R=U.K[U.pk(c3.h.player)].r;while(MN.cones.includes(c3)&&c3.t<c3.dur-0.15)ZC.tick(1);ZC.press(R);let j=0;while(MN.cones.includes(c3)&&j<60){ZC.tick(1);j++;}
if(MN.st.dodges<1)throw new Error('кувырок не увёл от шишки '+JSON.stringify(MN.st));
MN.sq.forEach(o=>{o.cd=999;});'шишки: '+JSON.stringify(MN.st)
//@@ shot=k1bm2_gnaw.png
// струна: Игрок 1 бросает клубок в колышек — прибегает белка-перегрызка и грызёт
window.mkString=function(){const st=W.stakes.find(s=>!s.used);st.k1vine=ZC.G.time+999;   // лоза (аудит 1-Б): ложный двойник не порвёт струну, пока её грызёт белка
 const h=U.act(0);U.walkTo(0,st.x*0.25,-14+(st.z+14)*0.25,5);h.face=Math.atan2(st.x-h.pos.x,st.z-h.pos.z);ZC.tick(1);ZC.press('KeyR');ZC.tick(40);
  return W.threads.filter(t=>t.string&&!t.sag).length;};
const ns=mkString();if(!ns)throw new Error('струна не натянулась');let n=0;while(!(MN.gn&&MN.gn.chew)&&n<60*14){ZC.tick(1);n++;}if(!MN.gn||!MN.gn.chew)throw new Error('белка-перегрызка не грызёт струну: gn='+!!MN.gn+' cd='+MN.gnCd.toFixed(1));
ZC.tick(30);'грызёт через '+(n/60).toFixed(1)+'с'
//@@
let n=0;while(MN.st.gnCut<1&&n<60*6){ZC.tick(1);n++;}if(MN.st.gnCut<1)throw new Error('не перегрызла');'перегрызла через '+(n/60).toFixed(1)+'с, струн='+W.threads.filter(t=>t.string&&!t.sag).length
//@@
// снова струна — Игрок 1 бьёт грызущую: распутана
ZC.tick(60);mkString();let n=0;while(!(MN.gn&&MN.gn.chew)&&n<60*16){ZC.tick(1);n++;}if(!MN.gn)throw new Error('вторая белка не пришла');
const e=MN.gn;const br=U.brawl(25);   // оба героя: на красный — кувырок, открытую — бить
ZC.tick(30);if(e.alive)throw new Error('грызущую не распутали: '+br+' state='+e.state+' emb='+e.embers);'распутана: '+br+', gnGone='+MN.st.gnGone
//@@ shot=k1bm2_mo.png
// круг 2: настоящего нашли — две белки, мохоноги бегут за двойниками и топчут следы
window.find=()=>{const real=W.doubles.find(d=>d.real),dh=W.hittables.find(q=>q.r===20);real.state='fallen';U.act(0).pos.set(real.pos.x+1,0,real.pos.z);dh.onHit({d:{range:2},pos:U.act(0).pos,player:0});return real;};
find();let n=0;while(MN.round<1&&n<60*6){ZC.tick(1);n++;}MN.sq.forEach(o=>{o.cd=999;});let k=0;while(MN.mo.length<2&&k<60*12){ZC.tick(1);k++;}ZC.tick(60*2.5);
if(MN.sq.length!==2)throw new Error('круг 2 — белок не две: '+MN.sq.length+' auto='+MN.auto+' phase='+W.flags.phase+' round='+W.flags.round+'/'+MN.round+' errs='+_errs.join(' | '));if(MN.mo.length<1)throw new Error('мохоногов нет');
const pr=K.fx.prints?K.fx.prints.list.filter(q=>q.t<99).length:0;'круг '+MN.round+' белок='+MN.sq.length+' мохоногов='+MN.mo.length+' следов='+pr+' за '+MN.mo.map(o=>o.d&&!o.d.real?'двойником':'-').join(',')
//@@
// удар по мохоногу — разлетается мхом
const o=MN.mo[0],a=U.act(0);a.pos.set(o.pos.x-0.8,0,o.pos.z);a.vel.set(0,0,0);a.face=Math.atan2(o.pos.x-a.pos.x,o.pos.z-a.pos.z);ZC.tick(1);ZC.press('KeyF');ZC.tick(20);
if(MN.st.moPop<1)throw new Error('мохоног не лопнул: '+JSON.stringify(MN.st));'moPop='+MN.st.moPop
//@@
// этап 3 — миньоны уходят
find();let n=0;while(W.flags.phase<3&&n<60*8){ZC.tick(1);n++;}ZC.skip();ZC.tick(60);
if(W.flags.phase!==3||MN.sq.length||MN.mo.length||MN.gn||MN.cones.length)throw new Error('на этапе 3 миньоны остались: phase='+W.flags.phase+' '+MN.sq.length+'/'+MN.mo.length+'/'+!!MN.gn);
if(_errs.length)throw new Error('ошибки: '+_errs.join(' | '));'этап 3 чисто · '+JSON.stringify(MN.st)
