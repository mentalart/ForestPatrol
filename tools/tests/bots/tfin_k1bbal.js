//@@ wait=1500
// @timeout=900
// релиз final06: 1-Б «Леший-Путаник» — баланс по аудиту (late_99zde_k1b_balance.js, В1, В2, Е2–Е4, Ж3): мост держится 13 / 10 / 9 с по пути; после второго трофея
// промахнувшаяся жёлтая «Хлоп» хлопает ещё раз («Хлоп-хлоп!») и только потом увязает; оба героя рассыпались — «Ещё разок!» через 1,5 с, все лепестки, этап тот же;
// жёлудь по когтю — звезда мастерства; победа — баннер со звёздами и лучший счёт; темы этапов 1–2 громче. Ошибок нет.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.loadLevel(ZC.LV('1-B'));ZC.tick(60*2);ZC.skip();ZC.tick(60*3);window.W=ZC.W;window.K=ZC.FIN.k1b;window.B=K.bal;
window.need=(c,m)=>{if(!c)throw new Error('tfin_k1bbal: '+m+' | st='+JSON.stringify(B.st));};
window.hand=s=>W.enemies.find(e=>e.kind==='hand'&&e.alive&&e.side===s);
// Е2: мост по пути
window.rampT=path=>{ZC.players.forEach(p=>{p.path=path;});const Y=hand(-1);Y.embers=0;Y.state='broken';Y.t=0;Y.bdur=8;ZC.tick(70);const r=K.cur.ramps[0];const t=r?r.t:-1;
  Y.state='idle';Y.t=0;Y.embers=Y.maxEmb;ZC.tick(60*2);return t;};
const te=rampT('easy'),tm=rampT('mid'),th=rampT('hard');need(te>11.5&&te<=13&&tm>8.5&&tm<=10&&th>7.5&&th<=9,'мост по пути: '+[te,tm,th].map(v=>v.toFixed(1)));
'мост: Лёгкий '+te.toFixed(1)+' · Средний '+tm.toFixed(1)+' · Трудный '+th.toFixed(1)
//@@
// В2: «Хлоп-хлоп»
ZC.players.forEach(p=>{p.path='mid';});W.flags.head=2;const Y=hand(-1);Y.state='recover';Y.t=0;Y.tgt=U.act(0);Y.k1.dbl=false;B.stuck(Y);
need(Y.state==='wind'&&B.st.dbl===1&&!(Y.dazeT>0),'после второго трофея промах — сразу второй хлоп');
let n=0;while(n<60*4&&Y.state!=='recover'){ZC.tick(1);n++;}Y.tgt=U.act(0);B.stuck(Y);need(Y.dazeT>0&&Y.state!=='wind','второй промах — увязла');
'Хлоп-хлоп: второй замах '+(n/60).toFixed(2)+' с, потом окно '+Y.dazeT.toFixed(2)
//@@
// Е3: «Ещё разок!»
W.flags.head=0;ZC.players.forEach(p=>{p.downed=true;p.downT=10;p.petals=0;});ZC.tick(60*2);
need(ZC.players.every(p=>!p.downed&&p.petals===3)&&B.st.again===1&&W.flags.phase===1,'оба снова на ногах');
// Е4: звезда за жёлудь по когтю и итог
const s0=B.stars;const Y2=hand(-1);Y2.sig='yellow';Y2.state='wind';Y2.t=0;Y2.wdur=Y2.wdur||1;Y2.k1.prev='wind';ZC.tick(1);const mh=K.heroes.marks.hand.find(m=>m.active()&&m.e===Y2);need(!!mh,'цель рогатки');mh.onHit();ZC.tick(2);
need(B.stars===s0+1,'звезда мастерства');W.flags.won=true;ZC.tick(60);need(B.shown&&ZC.G.flags.k1bStars>=1&&B.winSub().includes('★ '+B.stars),'итог звёзд');W.flags.won=false;
// Ж3: темы громче
K.music('k1b2');const TR=ZC.FIN.music.TR;need(TR.k1b1.k1bl&&TR.k1b2.k1bl,'темы этапов 1–2 громче');
if(window._errs.length)throw new Error('ошибки: '+window._errs[0]);
'ещё разок ok · звёзд '+B.stars+' (лучший '+ZC.G.flags.k1bStars+') · '+JSON.stringify(B.st)
