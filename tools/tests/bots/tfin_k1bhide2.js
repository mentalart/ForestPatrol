//@@ wait=1500
// @timeout=1500
// релиз final06: 1-Б «Леший-Путаник», этап 2 «Ищи-свищи» по аудиту (late_99zdc_k1b_hide2.js, пункты Г1–Г5, Д5): мох-следы настоящего видны только под
// Совиным взором (под взором — точки пути); удар по ложному — «Ха! Ищи-свищи!», настоящий меняется местами, на Среднем — ещё двойник; ложный на струне
// рвёт её; жёлудь Прошки в помеченного — настоящий падает; живая вода на колышек — лоза: ложный на ней лопается. Два круга ловушкой «струна перед
// настоящим» (U.k1bTrap) — этап 3. Ошибок нет.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.players.forEach(p=>{p.path='mid';});ZC.loadLevel(ZC.LV('1-B'));ZC.tick(60*2);ZC.skip();ZC.tick(60*2);window.W=ZC.W;window.K=ZC.FIN.k1b;window.H2=K.hide2;
W.bossNext();ZC.tick(60*3);ZC.skip();ZC.tick(60*3);ZC.skip();ZC.tick(30);
window.need=(c,m)=>{if(!c)throw new Error('tfin_k1bhide2: '+m+' | phase='+W.flags.phase+' round='+W.flags.round+' st='+JSON.stringify(H2.st));};
need(W.flags.phase===2&&W.doubles.length===4,'этап 2, четыре двойника');
window.realPr=()=>K.fx.prints?K.fx.prints.list.filter(q=>q.real&&q.m.visible&&q.m.material.opacity>0.02).length:0;
W.owlT=0;H2.owlEnd=-99;ZC.tick(60*6);const p0=realPr();need(p0===0,'без взора следов настоящего не видно ('+p0+')');
W.owlT=4;ZC.tick(40);const p1=realPr(),dots=H2.dots?H2.dots.filter(m=>m.visible).length:0;need(p1>0,'под взором следы настоящего видны');
'без взора следов '+p0+' · под взором '+p1+' · точек пути '+dots
//@@ shot=k1bh2_owl.png
'кадр: взор — золотые следы и точки пути'
//@@
// Г1: удар по ложному
const fake=W.doubles.find(d=>!d.real&&d.state==='walk');window.real=W.doubles.find(d=>d.real);const rp=real.pos.clone(),dh=W.hittables.find(q=>q.r===20),a=U.act(0);
a.pos.set(fake.pos.x+1,0,fake.pos.z);dh.onHit({d:{range:2},pos:a.pos,vel:a.vel,player:0,knockT:0});ZC.tick(2);
need(fake.state!=='gone','ложный от удара не лопается');need(H2.st.fakeHits===1&&H2.st.shuffles===1,'«Ха! Ищи-свищи!» — настоящий поменялся местами');
need(W.doubles.filter(d=>d.state!=='gone').length===5,'на Среднем из дыма — ещё двойник');
'удар по ложному: двойников '+W.doubles.filter(d=>d.state!=='gone').length+' · настоящий сдвинулся на '+real.pos.distanceTo(rp).toFixed(1)+' м'
//@@
// Г5: жёлудь в помеченного
W.owlT=4;ZC.tick(2);const mk=W.marks.find(m=>m.onHit&&m.active&&m.active()&&Math.abs(m.pos.x-real.pos.x)<0.01);need(!!mk,'настоящий под взором — цель рогатки');mk.onHit();ZC.tick(2);
need(real.state==='fallen'&&H2.st.slingTrips===1,'жёлудь — настоящий упал');ZC.tick(60*7);need(real.state==='walk','встал через 6 с');
// Д5 + Г1: лоза Йоши и ложный на струне
const T=W.waterTargets.find(q=>q.s&&q.active());need(!!T,'колышек — цель живой воды');T.onWater();const sv=T.s;need(sv.k1vine>ZC.G.time,'лоза');
const f2=W.doubles.find(d=>!d.real&&d.state==='walk');K.fakeOnString(f2,{stake:sv,sx:0,sz:0,dx:1,dz:0,len:1});need(f2.state==='gone'&&H2.st.vinePops===1,'ложный на лозе — шишки');
'рогатка, лоза: '+JSON.stringify(H2.st)
//@@
W.doubles.forEach(d=>{if(d.state==='fallen'){d.state='walk';d.m.body.rotation.x=0;d.m.g.position.y=0;}});W.owlT=0;
const r1=U.k1bTrap(0,120);need((W.flags.round||0)===1,'круг 1 ловушкой «струна перед настоящим»: '+r1);r1
//@@
ZC.tick(60*3);const r2=U.k1bTrap(0,150);ZC.tick(60*3);need(W.flags.phase===3,'этап 3 после второго круга: '+r2);
if(window._errs.length)throw new Error('ошибки: '+window._errs[0]);
r2+' · этап '+W.flags.phase+' · '+JSON.stringify(H2.st)
