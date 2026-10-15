//@@ wait=1500
// @timeout=1200
// релиз final06: 1-Б «Леший-Путаник» — ролик-урок «Ищи-свищи» перед этапом 2 (late_99zce_k1b_tut2.js, def.kino, 25 с, 9 планов):
// четверо Лешего в ряд, мох-следы за настоящим, Совиный взор — обруч, клубок в колышек — струна, двойник лопается, настоящий падает, его бьют, белка кидает шишку — щит — в двойника.
// Проверки: ролик под def.kino, ≥ 3 крупностей и ≥ 2 типов движения; в середине каждой реплики Лешего он в кадре и лицом к камере; в ролике на деле есть следы, обруч, падение,
// щит Потапа и отскок шишки в двойника; после урока — этап 2, двойники на местах хоровода (все видны, никто не лежит), герои где стояли, надпись «Фаза 2»;
// второй раз урок не играется (G.flags.k1b[2]); «Показать урок ещё раз» в паузе — играется; пропуск даёт то же состояние; ошибок нет.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=777;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.K=ZC.FIN.k1b;K.tut2.auto=true;U.go();ZC.loadLevel(7);ZC.tick(60*2);ZC.skip();ZC.tick(60*4);window.W=ZC.W;
window.CI=ZC.FIN.cine;window.ACT=ZC.FIN.actors;window.V=THREE.Vector3;window.CREP=[];window.CBAD=[];window.CHK={t0:{},done:{}};
window.SPK=(cd)=>{const S=ACT.speaker;if(!S||!S.who||S.who==='zven'||S.until<ZC.G.time)return;const k=S.who+'@'+S.until.toFixed(2);if(CHK.done[k])return;
  if(!CHK.t0[k])CHK.t0[k]=ZC.G.time;if(ZC.G.time<CHK.t0[k]+(S.until-CHK.t0[k])*0.5)return;CHK.done[k]=1;const L=CI.locate(S.who);if(!L){CREP.push(S.who+' не найден');return;}
  const H=L.head(),P=cd.pose,dir=new V().subVectors(P.look,P.pos).normalize(),to=new V().subVectors(H,P.pos),d=to.length();to.normalize();
  const ang=Math.acos(Math.max(-1,Math.min(1,dir.dot(to))))*180/Math.PI,half=Math.atan(Math.tan(P.fov*Math.PI/360)*16/9)*180/Math.PI,vang=Math.abs(Math.asin(to.y)-Math.asin(dir.y))*180/Math.PI;
  let fw=null;if(L.hero){const r=L.obj.g.rotation.y;fw=new V(Math.sin(r),0,Math.cos(r));}else if(L.obj&&L.obj.o&&L.obj.o.g){const q=new THREE.Quaternion();L.obj.o.g.getWorldQuaternion(q);fw=new V(0,0,1).applyQuaternion(q).setY(0).normalize();}
  const back=fw?fw.dot(new V(P.pos.x-H.x,0,P.pos.z-H.z).normalize()):1;const rec=S.who+' '+ang.toFixed(0)+'°/'+half.toFixed(0)+'° в'+vang.toFixed(0)+'° d='+d.toFixed(1)+' лицо='+back.toFixed(2);CREP.push(rec);
  if(ang>half*0.95||vang>P.fov*0.5||back<-0.1)CBAD.push(cd.def.dur+'с: '+rec);};
window.GOON=()=>{let c=0;while(ZC.G.cine&&c<60*60){ZC.tick(1);c++;WATCH();const now=CI.CD();if(now)SPK(now);}};
window.SEEN={prints:0,halo:0,fell:0,guard:0,popped:0,thrown:0};
window.WATCH=()=>{const D=K.tut2.D;if(!D)return;const pr=ZC.FIN.k1b.fx.prints;if(pr)SEEN.prints=Math.max(SEEN.prints,pr.list.filter(q=>q.t<99).length);const h=D.real.k2&&D.real.k2.halo;if(h&&h.g.visible)SEEN.halo=1;
  if(D.fell)SEEN.fell=1;if(ZC.HERO.potap.guard)SEEN.guard=1;SEEN.popped=Math.max(SEEN.popped,D.hid.length);if(D.thrown)SEEN.thrown=1;};
window.RUN=(until)=>{let c=0;while(ZC.G.cine&&ZC.G.cine.t<until&&c<60*30){ZC.tick(1);c++;WATCH();const now=CI.CD();if(now)SPK(now);}return 't='+(ZC.G.cine?ZC.G.cine.t.toFixed(1):'end');};
// этап 1 — до ролика «Нате вам — четыре Лешего», дальше — урок
W.bossNext();let n=0;while(!ZC.G.cine&&n<200){ZC.tick(1);n++;}let m=0;while(ZC.G.cine&&CI.CD()&&CI.CD().def.dur!==25&&m<60*12){ZC.tick(1);m++;}
'phase='+W.flags.phase+' cine='+!!ZC.G.cine+' tut2='+K.tut2.on
//@@ shot=k1bt2_line.png
n=0;while(!ZC.G.cine&&n<120){ZC.tick(1);n++;}const cd=CI.CD();if(!cd||!cd.def.kino||cd.def.dur!==25)throw new Error('урок не начался: '+(cd&&cd.def.dur)+' phase='+W.flags.phase);
window.SIZES=new Set(cd.shots.map(s=>s.size));window.MOVES=new Set(cd.shots.map(s=>s.p2?'spline':s.trk?'track':s.move));RUN(1.8)
//@@ shot=k1bt2_prints.png
RUN(6.0)
//@@ shot=k1bt2_halo.png
RUN(9.4)
//@@ shot=k1bt2_string.png
RUN(12.2)
//@@ shot=k1bt2_trip.png
RUN(15.8)
//@@ shot=k1bt2_squirrel.png
RUN(19.3)
//@@ shot=k1bt2_bounce.png
RUN(21.0)
//@@
GOON();ZC.tick(30);const ds=W.doubles.filter(d=>d.state!=='gone');
const st='phase='+W.flags.phase+' doubles='+ds.map(d=>d.state+(d.m.g.visible?'':'(скрыт)')+'@'+d.pos.x.toFixed(1)+','+d.pos.z.toFixed(1)+(d.k2?' '+d.k2.mode:'')).join(' ');
if(!(SEEN.prints>=3&&SEEN.halo&&SEEN.fell&&SEEN.guard&&SEEN.popped>=2&&SEEN.thrown))throw new Error('в уроке не всё показано: '+JSON.stringify(SEEN));
if(!(W.flags.phase===2&&ds.length===4&&ds.every(d=>d.state==='walk'&&d.m.g.visible&&d.m.body.rotation.x===0)&&!K.tut2.on&&ZC.G.flags.k1b&&ZC.G.flags.k1b[2]))throw new Error('после урока не то: '+st);
if(SIZES.size<3||MOVES.size<2)throw new Error('мало разнообразия: '+[...SIZES]+' / '+[...MOVES]);if(CBAD.length)throw new Error('кадры: '+CBAD.join(' | '));
'урок ok '+JSON.stringify(SEEN)+' крупн='+[...SIZES].join('/')+' движ='+[...MOVES].join('/')+' '+CREP.join(' | ')
//@@
// прятки идут: двойники двигаются; второй раз урок не начинается
const p0=W.doubles.map(d=>d.pos.clone());ZC.tick(60*3);const moved=W.doubles.filter((d,i)=>d.pos.distanceTo(p0[i])>0.5).length;if(moved<3)throw new Error('двойники стоят после урока: '+moved);
ZC.loadLevel(7);ZC.tick(60*2);ZC.skip();ZC.tick(30);ZC.W.bossNext();let c=0;while(c<60*12){ZC.tick(1);c++;if(ZC.G.cine&&CI.CD()&&CI.CD().def.dur===25)throw new Error('урок повторился');if(!ZC.G.cine&&ZC.W.flags.phase===2&&c>60*8)break;}
'прятки после урока: двигались '+moved+' · повтор не играется'
//@@
// «Показать урок ещё раз» (пауза) — играется; пропуск — то же состояние
const LK=ZC.FIN.lesson,W2=ZC.W;U.nocine();ZC.tick(30);if(!LK.reg['1-B'].can())throw new Error('повтор недоступен на этапе 2');LK.again();ZC.tick(2);let q=0;while(!ZC.G.cine&&q<60){ZC.tick(1);q++;}
if(!ZC.G.cine||!CI.CD()||CI.CD().def.dur!==25)throw new Error('повтор не начался');let r=0;while(ZC.G.cine&&ZC.G.cine.t<16&&r<60*18){ZC.tick(1);r++;}
const midFell=K.tut2.D&&K.tut2.D.fell;ZC.skip();ZC.tick(30);const ds=W2.doubles.filter(d=>d.state!=='gone');
if(!midFell||K.tut2.on||!ds.every(d=>d.state==='walk'&&d.m.g.visible&&d.m.body.rotation.x===0))throw new Error('после пропуска не то: упал в уроке='+midFell+' '+ds.map(d=>d.state+'/'+d.m.g.visible).join(','));
if(_errs.length)throw new Error('ошибки: '+_errs.join(' | '));'повтор и пропуск ok'
