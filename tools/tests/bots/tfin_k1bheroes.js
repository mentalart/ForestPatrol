//@@ wait=1500
// @timeout=1200
// релиз final06: 1-Б «Леший-Путаник» — у каждого героя своя роль (аудит 1-Б, late_99zdd_k1b_heroes.js, Д1, Д3–Д5, Д8, Г6): Потап держит пробитую ладонь своим
// весом дольше 8 с и подкидывает друга прямо на плечо Лешего; жёлудь Прошки в вскинутую жёлтую ладонь — она увязает; живая вода Йоши на увязшую ладонь —
// окно дольше; Пелагея, спланировав на ладонь, — «Сова села!»: рука замирает; под Совиным взором у обманки красной руки — «Обманка!». Ошибок нет.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.players.forEach(p=>{p.path='mid';});ZC.loadLevel(ZC.LV('1-B'));ZC.tick(60*2);ZC.skip();ZC.tick(60*3);window.W=ZC.W;window.K=ZC.FIN.k1b;window.HE=K.heroes;window.H=ZC.HERO;
window.need=(c,m)=>{if(!c)throw new Error('tfin_k1bheroes: '+m+' | st='+JSON.stringify(HE.st));};
window.hand=s=>W.enemies.find(e=>e.kind==='hand'&&e.alive&&e.side===s);
need(W.flags.phase===1&&hand(-1)&&hand(1),'этап 1, две руки');
// пробить жёлтую — мост
window.Y=hand(-1);Y.embers=0;Y.state='broken';Y.t=0;Y.bdur=8;ZC.tick(90);need(K.cur.ramps.length===1,'мост лёг');
window.rp=K.cur.ramps[0].cols[0];
// Д3: Потап у основания моста, Прошка рядом — подкидка на плечо
H.potap.pos.set(rp.x0-rp.dx*1.5+0.8,0,rp.z0-rp.dz*1.5);H.proshka.pos.set(rp.x0-rp.dx*1.5-0.6,0,rp.z0-rp.dz*1.5);H.potap.skillCd=0;ZC.tick(2);
need(HE.toss(0,H.potap),'подкидка на плечо сработала');ZC.tick(80);
'подкидка: Прошка на высоте '+H.proshka.pos.y.toFixed(2)+' · '+JSON.stringify(HE.st)
//@@ shot=k1bhe_toss.png
need(H.proshka.pos.y>4,'Прошка на плече (y='+H.proshka.pos.y.toFixed(2)+')');
// Д1: Потап держит ладонь — мост дольше 8 с
H.potap.pos.set(Y.pos.x+0.8,0,Y.pos.z+1.2);let n=0;while(n<60*12&&K.cur.ramps.length){H.potap.pos.set(Y.pos.x+0.8,0,Y.pos.z+1.2);H.potap.vel.set(0,0,0);ZC.tick(1);n++;}
need(n>=60*11&&HE.st.holdPotap>=1,'Потап держит мост дольше 8 с ('+(n/60).toFixed(1)+' с)');
'Потап держит: мост '+(n/60).toFixed(1)+' с'
//@@
// Д4: жёлудь в вскинутую жёлтую ладонь
Y.state='idle';Y.t=0;Y.embers=Y.maxEmb;Y.cd=0.3;ZC.tick(60*3);H.potap.pos.set(-1,0,-6);H.proshka.pos.set(-3,0,-9);
let w=0;while(w<60*20&&!(Y.state==='wind'&&Y.t<Y.wdur*0.5)){ZC.tick(1);w++;}need(Y.state==='wind','жёлтая вскинула ладонь');
const mh=HE.marks.hand.find(m=>m.active()&&m.e===Y);need(!!mh,'жёлтая в замахе — цель рогатки');mh.onHit();ZC.tick(1);
need(Y.state!=='wind'&&Y.dazeT>0&&HE.st.slingHand===1,'жёлудь: ладонь упала и увязла');
// Д5: живая вода на увязшую ладонь
const d0=Y.dazeT,wt=HE.marks.water.find(T=>T.active()&&T.e===Y);need(!!wt,'увязшая ладонь — цель живой воды');wt.onWater();need(Y.dazeT>d0+0.4&&HE.st.waterHand===1,'окно стало дольше');
'рогатка и ковшик: окно '+d0.toFixed(2)+' → '+Y.dazeT.toFixed(2)
//@@
// Д8: Пелагея спланировала на правую ладонь
window.R=hand(1);ZC.tick(60*3);let g=0;while(g<60*10&&!(R.state==='idle'&&!(R.dazeT>0)&&!R.k1.sweep)){ZC.tick(1);g++;}
const pe=H.pelageya;pe.k1hi=ZC.G.time;pe.pos.set(R.pos.x,2.2,R.pos.z);pe.vel.set(0,-2,0);pe.grounded=false;ZC.tick(1);
need(HE.st.perch===1&&R.dazeT>0,'«Сова села!» — рука замерла: R='+R.state+' daze='+R.dazeT+' g='+g+' pe='+pe.pos.y.toFixed(2)+' gr='+pe.grounded+' phase='+W.flags.phase+' d='+Math.hypot(pe.pos.x-R.pos.x,pe.pos.z-R.pos.z).toFixed(2));
// Г6: обманка под взором
ZC.tick(60*2);R.dazeT=0;R.k1.stuck=false;R.state='wind';R.t=0;R.wdur=R.wdur||1;R.k1.prev='wind';R.k1.fake=true;W.owlT=4;ZC.tick(1);need(K.hide2.st.owlFakes===1,'обманка видна под взором');
if(window._errs.length)throw new Error('ошибки: '+window._errs[0]);
'роли героев: '+JSON.stringify(HE.st)+' · обманок под взором '+K.hide2.st.owlFakes
