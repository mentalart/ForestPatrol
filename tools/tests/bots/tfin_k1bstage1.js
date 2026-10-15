//@@ wait=1500
// релиз final06: 1-Б «Леший-Путаник», этап 1 — второй круг правок (late_99z_k1b_hands.js, late_99zca_k1b_stage1.js; docs/29_leshy_proposals.md, «Этап 1: что улучшить дальше»):
// ждущая рука «отдыхает» (к героям не идёт), Леший смотрит на руку, которая замахивается, у каждой руки свой звук; окно ладони — по пути (Лёгкий 2,2 с, Средний 1,5);
// после второго трофея на Среднем каждый третий замах красной — обманка; герой на мосту — вторая рука смахивает (кувырок — «Ловко!», без него — смахнуло без урона,
// мягкое падение); «держи — беги»: пока второй герой у пробитой ладони, мост держится; рука легла — камера показывает мост.
// Урон по макушке по пути: Лёгкий — 3 пункта разом, Средний — 2, Богатырский — 1.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.loadLevel(7);ZC.tick(60*2);ZC.skip();ZC.tick(60*2);window.W=ZC.W;window.K=ZC.FIN.k1b;window.N=K.hands;window.S1=K.s1;
window.hand=s=>W.enemies.find(e=>e.kind==='hand'&&e.side===s);
window.brk=s=>{const e=hand(s);e.embers=0;e.state='broken';e.t=0;e.bdur=8;};
window.reset=()=>{for(const e of W.enemies)if(e.kind==='hand'){e.state='idle';e.t=0;e.embers=e.maxEmb;e.dazeT=0;e.cd=1;e.k1.sweep=null;}for(const pi of[0,1]){const h=U.act(pi);h.pos.set(pi?2.5:-2.5,0,-3.5);h.vel.set(0,0,0);}ZC.tick(60*12);};
// замах руки s на героя pi
window.wind=(s,pi)=>{const e=hand(s);e.tgt=U.act(pi);e.state='ready';e.t=0.46;e.cd=0;};
window.calls=[];{const w=S1.wind;S1.wind=function(e){calls.push(e.sig);return w.apply(this,arguments);};}
window.ok={};'phase='+W.flags.phase+' hands='+W.enemies.filter(e=>e.kind==='hand').length
//@@
// 1, 4: красная замахивается на героя — Леший глядит на неё и кренится, ждущая жёлтая отдыхает, звук «шороха»
for(const pi of[0,1])U.act(pi).pos.set(5,0,-9);wind(1,0);let look=0,rest=0;for(let i=0;i<30;i++){ZC.tick(1);const L=K.cur.L;if(L.head.rotation.y>0.15)look++;if(hand(-1).k1.rest&&hand(-1).spMul===0)rest++;}
ok.look=look>5;ok.rest=rest>5;ok.sound=calls.includes('red');'look='+look+' rest='+rest+' calls='+calls.join(',')+' state='+hand(1).state
//@@
// 6: окно по пути — Лёгкий 2,2 с, Средний 1,5 с
reset();const e=hand(-1);ZC.players.forEach(p=>{p.path='easy';});N.stuckAt(e);const easy=e.dazeT;e.dazeT=0;ZC.players.forEach(p=>{p.path='mid';});N.stuckAt(e);const mid=e.dazeT;ZC.tick(4);const glow=!!(e.k1.glow&&e.k1.glow.visible);
ok.stuck=Math.abs(easy-2.2)<0.01&&Math.abs(mid-1.5)<0.01;ok.glow=glow;'easy='+easy+' mid='+mid+' glow='+glow
//@@
// 5: после второго трофея (Средний) каждый третий замах красной — обманка: опускает ладонь на середине замаха, удара нет
reset();W.flags.head=2;N.redN=2;for(const pi of[0,1])U.act(pi).pos.set(5,0,-9);wind(1,0);let wnd=0,str=0;for(let i=0;i<90;i++){ZC.tick(1);const s=hand(1).state;if(s==='wind')wnd++;if(s==='strike')str++;}
ok.fake=wnd>3&&str===0&&N.redN===3;W.flags.head=0;'wind='+wnd+' strike='+str+' redN='+N.redN
//@@
// «Одним махом!» по руке (идеальный щит — у мелкого морока это unravel) не убирает руку: она пробита и ложится мостом, рука от плеча на месте
reset();ZC.FIN.dbgUnravel(hand(-1));ZC.tick(40);const e=hand(-1),arm=K.cur.arms.find(a=>a.side===-1);ok.swoop=e.alive&&e.state==='broken'&&!!(e.k1bridge&&e.k1bridge.g.parent)&&arm.g.visible;
'alive='+e.alive+' state='+e.state+' bridge='+!!e.k1bridge+' arm='+arm.g.visible
//@@ shot=k1bs1_sweep.png
// 2, 8: жёлтая пробита — мост; камера показывает мост; герой поднялся — красная смахивает (без кувырка), урона нет
reset();brk(-1);ZC.tick(40);const b=hand(-1).k1bridge,mid=b.from.clone().lerp(b.to,0.5);const cam=W.camFn(),dc=Math.hypot(cam.look.x-mid.x,cam.look.z-mid.z);ok.cam=dc<4;
const r=K.cur.ramps.find(q=>q.hand===hand(-1)),rp=r.cols[0],h=U.act(0),pt=ZC.players[0].petals;U.act(1).pos.set(4,0,-6);
h.pos.set(rp.x0+rp.dx*rp.len*0.45,rp.y0+(rp.y1-rp.y0)*0.45+0.05,rp.z0+rp.dz*rp.len*0.45);h.vel.set(0,0,0);let st=0,soft=0,land=0;
for(let i=0;i<60*4;i++){h.pos.x=h.grounded&&h.groundRef===rp?rp.x0+rp.dx*rp.len*0.45:h.pos.x;ZC.tick(1);if(S1.sw.length)st=1;if(h.k1soft)soft=1;if(soft&&h.grounded&&h.pos.y<0.3)land=1;}
ok.sweep=st&&soft&&land&&ZC.players[0].petals===pt;'cam d='+dc.toFixed(1)+' sweep='+st+' soft='+soft+' land='+land+' petals '+pt+'→'+ZC.players[0].petals
//@@
// 2: новый мост — герой кувыркается вдоль моста в последний миг: «Ловко!», его не смахивает
reset();brk(-1);ZC.tick(40);const r=K.cur.ramps.find(q=>q.hand===hand(-1)),rp=r.cols[0],h=U.act(0);U.act(1).pos.set(4,0,-6);
h.pos.set(rp.x0+rp.dx*rp.len*0.45,rp.y0+(rp.y1-rp.y0)*0.45+0.05,rp.z0+rp.dz*rp.len*0.45);h.vel.set(0,0,0);let rolled=0,off=0;
for(let i=0;i<60*3;i++){const S=S1.sw[0];if(S&&!rolled&&S.t>S.dur-0.2){h.face=Math.atan2(rp.dx,rp.dz);h.rollDir.set(rp.dx,0,rp.dz);h.rollT=0.38;h.lastRoll=ZC.G.time;rolled=1;}ZC.tick(1);if(h.knockT>0.3)off=1;}
ok.dodge=rolled&&!off;'rolled='+rolled+' knocked='+off
//@@
// 3: «держи — беги» — второй герой у пробитой ладони: мост держится 15 с; отошёл — мост уходит
reset();brk(-1);ZC.tick(40);const e=hand(-1),h1=U.act(1);U.act(0).pos.set(-8,0,-4);h1.pos.set(e.pos.x+1.6,0,e.pos.z+0.6);h1.vel.set(0,0,0);
for(let i=0;i<60*15;i++){h1.pos.set(e.pos.x+1.6,0,e.pos.z+0.6);ZC.tick(1);}const held=e.state==='broken'&&K.cur.ramps.length>0;
h1.pos.set(6,0,-4);ZC.tick(60*2);const gone=e.state!=='broken'&&K.cur.ramps.length===0;ok.hold=held&&gone;
if(!Object.values(ok).every(Boolean)||_errs.length)throw new Error('этап 1: '+JSON.stringify(ok)+' errs='+_errs.join(' | '));'held='+held+' gone='+gone+' | '+JSON.stringify(ok)+' errs='+_errs.length+(Object.values(ok).every(Boolean)&&!_errs.length?' ВСЁ OK':' ЕСТЬ ОШИБКИ')
//@@
// урон по макушке — по пути ударившего: Богатырский — 1 пункт (один трофей), Средний — 2, Лёгкий — 3 (этап 1 одним ударом); полоса и трофеи — согласованно
const hb=W.hittables.find(q=>q.r===1.6&&q.push===false),h=U.act(0),lost=()=>Object.keys(K.cur.L.k1.lost).length,R=[];
const hit=(path,h0)=>{reset();ZC.players.forEach(p=>{p.path=path;});W.flags.head=h0;brk(-1);ZC.tick(40);h.pos.set(-1.5,5.6,-23);h.vel.set(0,0,0);hb.onHit(h);ZC.tick(2);R.push(path+':'+h0+'→'+W.flags.head+' lost='+lost());return W.flags.head;};
const a=hit('hard',0),la=lost(),b=hit('mid',0),lb=lost(),c=hit('easy',0),lc=lost();ZC.tick(60*3);
ok.dmg=a===1&&la===1&&b===2&&lb===2&&c===3&&lc===3&&W.flags.phase>1;
if(!ok.dmg||_errs.length)throw new Error('урон по пути: '+R.join(' ')+' phase='+W.flags.phase+' errs='+_errs.join(' | '));R.join(' ')+' phase='+W.flags.phase+' ВСЁ OK'
