//@@ wait=1500
// @timeout=1200
// релиз final06: 1-Б «Леший-Путаник» — ролик-урок «Как одолеть Лешего» перед этапом 1 (late_99zcb_k1b_tut.js, def.kino, 24,8 с, 8 планов):
// красная — Пелагея кувыркается, жёлтая — Прошка щитом, увязшую ладонь бьют — Пробой, рука ложится мостом, Пелагея взбегает; красная тянется смахнуть —
// Потап её бьёт («Отвлёк!»), второй раз — Пелагея перепрыгивает руку; удар по макушке.
// Проверки: ролик под def.kino, ≥ 3 крупностей и ≥ 2 типов движения; в середине каждой реплики Лешего он в кадре и лицом к камере; в ролике на деле
// случаются кувырок, щит, окно, Пробой и мост, смахивание (сорвано ударом Потапа, потом перепрыгнуто), Пелагея поднимается выше 4,5 м; после урока — этап 1, руки целые по домам, моста нет, трофеев не сбито,
// надпись «Фаза 1»; второй раз урок не играется (G.flags.k1b[1]), «Показать урок ещё раз» в паузе — играется; пропуск даёт то же состояние; ошибок нет.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=777;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
ZC.FIN.k1b.tut.auto=true;U.go();ZC.loadLevel(7);ZC.tick(60*2);ZC.skip();ZC.tick(2);
window.CI=ZC.FIN.cine;window.ACT=ZC.FIN.actors;window.V=THREE.Vector3;window.CREP=[];window.CBAD=[];window.CHK={t0:{},done:{}};window.K=ZC.FIN.k1b;window.W=ZC.W;
window.SPK=(cd)=>{const S=ACT.speaker;if(!S||!S.who||S.who==='zven'||S.until<ZC.G.time)return;const k=S.who+'@'+S.until.toFixed(2);if(CHK.done[k])return;
  if(!CHK.t0[k])CHK.t0[k]=ZC.G.time;if(ZC.G.time<CHK.t0[k]+(S.until-CHK.t0[k])*0.5)return;CHK.done[k]=1;const L=CI.locate(S.who);if(!L){CREP.push(S.who+' не найден');return;}
  const H=L.head(),P=cd.pose,dir=new V().subVectors(P.look,P.pos).normalize(),to=new V().subVectors(H,P.pos),d=to.length();to.normalize();
  const ang=Math.acos(Math.max(-1,Math.min(1,dir.dot(to))))*180/Math.PI,half=Math.atan(Math.tan(P.fov*Math.PI/360)*16/9)*180/Math.PI,vang=Math.abs(Math.asin(to.y)-Math.asin(dir.y))*180/Math.PI;
  let fw=null;if(L.hero){const r=L.obj.g.rotation.y;fw=new V(Math.sin(r),0,Math.cos(r));}else if(L.obj&&L.obj.o&&L.obj.o.g){const q=new THREE.Quaternion();L.obj.o.g.getWorldQuaternion(q);fw=new V(0,0,1).applyQuaternion(q).setY(0).normalize();}
  const back=fw?fw.dot(new V(P.pos.x-H.x,0,P.pos.z-H.z).normalize()):1;const rec=S.who+' '+ang.toFixed(0)+'°/'+half.toFixed(0)+'° в'+vang.toFixed(0)+'° d='+d.toFixed(1)+' лицо='+back.toFixed(2);CREP.push(rec);
  if(ang>half*0.95||vang>P.fov*0.5||back<-0.1)CBAD.push(cd.def.dur+'с: '+rec);};
window.GOON=()=>{let c=0;while(ZC.G.cine&&c<60*60){ZC.tick(1);c++;const now=CI.CD();if(now)SPK(now);}};
window.SEEN={roll:0,guard:0,stuck:0,broken:0,bridge:0,top:0,sweep:0,dis:0,jump:0};
{const d=K.s1.distract;K.s1.distract=function(o){const r=d.apply(this,arguments);if(r)SEEN.dis=1;return r;};}
window.WATCH=()=>{const pe=ZC.HERO.pelageya,pr=ZC.HERO.proshka,Y=W.enemies.find(e=>e.kind==='hand'&&e.side<0);if(pe.rollT>0)SEEN.roll=1;if(pr.guard)SEEN.guard=1;
  if(Y&&Y.k1.dp==='stuck')SEEN.stuck=1;if(Y&&Y.state==='broken')SEEN.broken=1;if(Y&&Y.k1bridge&&Y.k1bridge.g.parent)SEEN.bridge=1;SEEN.top=Math.max(SEEN.top,pe.pos.y);
  for(const S of K.s1.sw)if(S.demo){SEEN.sweep=1;if(S.hit&&!S._chk){S._chk=1;if(pe.pos.y>S.P.y+1)SEEN.jump=1;}}};
window.RUN=(until)=>{let c=0;while(ZC.G.cine&&ZC.G.cine.t<until&&c<60*30){ZC.tick(1);c++;WATCH();const now=CI.CD();if(now)SPK(now);}return 't='+(ZC.G.cine?ZC.G.cine.t.toFixed(1):'end');};
window.HEAD0=JSON.stringify(K.cur.L.k1.lost);
'phase='+W.flags.phase+' cine='+!!ZC.G.cine+' tut='+K.tut.on
//@@ shot=k1bt_roll.png
// ролик начался сразу после входа; первые 3 с — Леший крупно
let n=0;while(!ZC.G.cine&&n<120){ZC.tick(1);n++;}const cd=CI.CD();if(!cd||!cd.def.kino||cd.def.dur!==24.8)throw new Error('урок не начался: '+(cd&&cd.def.dur));
window.SIZES=new Set(cd.shots.map(s=>s.size));window.MOVES=new Set(cd.shots.map(s=>s.p2?'spline':s.trk?'track':s.move));RUN(4.2)
//@@ shot=k1bt_guard.png
// красная метёт — Пелагея в кувырке
RUN(7.25)
//@@ shot=k1bt_hit.png
// жёлтая хлопнула — Прошка под щитом
RUN(9.6)
//@@ shot=k1bt_bridge.png
// увязшую ладонь бьют Прошка и Потап
RUN(13.2)
//@@ shot=k1bt_jump.png
// рука легла мостом, Пелагея бежит наверх; красная тянется смахнуть — Потап её отвлекает
RUN(16.78)
//@@ shot=k1bt_head.png
// красная проносится поперёк моста — Пелагея перепрыгивает
RUN(18.9)
//@@
// удар по макушке
RUN(19.5)
//@@
GOON();ZC.tick(30);const Hs=W.enemies.filter(e=>e.kind==='hand');
const st='phase='+W.flags.phase+' head='+(W.flags.head||0)+' hands='+Hs.map(e=>e.state+'@'+e.pos.x.toFixed(1)+','+e.pos.z.toFixed(1)+' emb='+e.embers).join(' ')+' ramps='+(W.ramps||[]).length+' demo='+!!ZC.FIN.k1b.hands.demo;
const ok=SEEN.roll&&SEEN.guard&&SEEN.sweep&&SEEN.dis&&SEEN.jump&&SEEN.stuck&&SEEN.broken&&SEEN.bridge&&SEEN.top>4.5&&W.flags.phase===1&&!(W.flags.head>0)&&Hs.length===2&&Hs.every(e=>e.state==='idle'&&e.embers===e.maxEmb&&Math.hypot(e.pos.x-e.home.x,e.pos.z-e.home.z)<0.1)&&(W.ramps||[]).length===0&&JSON.stringify(K.cur.L.k1.lost)===HEAD0&&ZC.G.flags.k1b&&ZC.G.flags.k1b[1];
if(!ok)throw new Error('после урока не то: '+JSON.stringify(SEEN)+' '+st);
if(SIZES.size<3||MOVES.size<2)throw new Error('мало разнообразия: '+[...SIZES]+' / '+[...MOVES]);if(CBAD.length)throw new Error('кадры: '+CBAD.join(' | '));
'урок ok '+JSON.stringify(SEEN)+' крупн='+[...SIZES].join('/')+' движ='+[...MOVES].join('/')+' '+CREP.join(' | ')
//@@
// бой идёт: руки бьют (за 15 с драки — замахи), второй раз урок не начинается
let w=0;for(let i=0;i<60*15;i++){U.brawl(1/60);if(W.enemies.some(e=>e.kind==='hand'&&e.state==='wind'))w++;}if(!w)throw new Error('руки не бьют после урока');
ZC.loadLevel(7);ZC.tick(60*2);ZC.skip();ZC.tick(30);if(ZC.G.cine&&CI.CD()&&CI.CD().def.dur===24.8)throw new Error('урок повторился');
'бой после урока: кадров с замахом '+w+' · повтор не играется'
//@@
// «Показать урок ещё раз» (пауза) — играется; пропуск — то же состояние (мир после перезагрузки — ZC.W)
const LK=ZC.FIN.lesson,W2=ZC.W;U.nocine();ZC.tick(30);if(!LK.reg['1-B'].can())throw new Error('повтор недоступен на этапе 1');LK.again();ZC.tick(2);let m=0;while(!ZC.G.cine&&m<60){ZC.tick(1);m++;}
if(!ZC.G.cine||!CI.CD()||CI.CD().def.dur!==24.8)throw new Error('повтор не начался');let q=0;while(ZC.G.cine&&ZC.G.cine.t<12.5&&q<60*14){ZC.tick(1);q++;}
const mid=(W2.ramps||[]).length;ZC.skip();ZC.tick(30);const Hs=W2.enemies.filter(e=>e.kind==='hand');
if(!mid||K.hands.demo||(W2.ramps||[]).length||!Hs.every(e=>e.state==='idle'&&e.embers===e.maxEmb))throw new Error('после пропуска не то: мост в уроке='+mid+' ramps='+(W2.ramps||[]).length+' '+Hs.map(e=>e.state).join(','));
if(_errs.length)throw new Error('ошибки: '+_errs.join(' | '));'повтор и пропуск ok'
