//@@ wait=1500 shot=intro_luko.png
// @timeout=1500
// релиз final06: «Присказка» — вступительный ролик перед прологом (levels/p/late_96f_intro_sets.js, late_96g_intro_scenes.js; сценарий — docs/42_priskazka_intro.md).
// Новая игра с FIN.introWant: семь роликов подряд, целиком, без пропуска. Проверки: каждый — ручная постановка (def.kino), ≤ 25 с, не меньше 3 крупностей
// и 2 типов движения камеры; в середине каждой реплики в кадре (не голос за кадром) говорящий в кадре и повёрнут к камере; после — комната пролога:
// площадки убраны, уровень виден, герои на местах, свет пролога, ролик «Колыбельная» не начался. Пропуск в середине — то же состояние. Ошибок нет.
// Кадры: Лукоморье (1-2), сосна-штаб с героями (3-3), рука над цепью (5-5), русалка на дубе (1-6), головы Горыныча на Смородине (6).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(false);ZC.FIN.introWant=true;ZC.startFrom(0);ZC.G.manual=true;ZC.tick(2);
const CI=ZC.FIN.cine,ACT=ZC.FIN.actors,V=THREE.Vector3,PRK=ZC.FIN.intro;window.CREP=[];window.CBAD=[];
window.SPK=(cd)=>{const S=ACT.speaker,L=PRK.lastSay;if(!S||!S.who||!L||L.vo||L.who!==S.who||S.until<ZC.G.time)return;const k=S.who+'@'+S.until.toFixed(2);if(CHK.done[k])return;
  if(!CHK.t0[k])CHK.t0[k]=ZC.G.time;if(ZC.G.time<CHK.t0[k]+(S.until-CHK.t0[k])*0.5)return;CHK.done[k]=1;const Lc=CI.locate(S.who);if(!Lc){CBAD.push('нет говорящего '+S.who);return;}
  const H=Lc.head(),P=cd.pose,dir=new V().subVectors(P.look,P.pos).normalize(),to=new V().subVectors(H,P.pos),d=to.length();to.normalize();
  const ang=Math.acos(Math.max(-1,Math.min(1,dir.dot(to))))*180/Math.PI,half=Math.atan(Math.tan(P.fov*Math.PI/360)*16/9)*180/Math.PI;
  let fw=null;if(Lc.hero){const r=Lc.obj.g.rotation.y;fw=new V(Math.sin(r),0,Math.cos(r));}else if(Lc.obj&&Lc.obj.o&&Lc.obj.o.g){const q=new THREE.Quaternion();Lc.obj.o.g.getWorldQuaternion(q);fw=new V(0,0,1).applyQuaternion(q).setY(0).normalize();}
  const back=fw?fw.dot(new V(P.pos.x-H.x,0,P.pos.z-H.z).normalize()):1;const rec=S.who+' '+ang.toFixed(0)+'°/'+half.toFixed(0)+'° d='+d.toFixed(1)+' лицо='+back.toFixed(2);CREP.push(rec);
  if(ang>half*0.95||back<-0.1)CBAD.push('сцена '+(PRK.i+1)+': '+rec);};
window.CHK={t0:{},done:{}};
// идти по «Присказке» до сцены i (с нуля) и времени t в ней (i=7 — до конца), по пути — проверки каждой сцены и реплик
window.SEEN=new Set();window.TRACK=()=>{const c=ZC.G.cine,cd=CI.CD();if(!c||!cd||!PRK.on)return;if(!SEEN.has(c)){SEEN.add(c);const name='сцена '+(PRK.i+1);
    if(!cd.def.kino)CBAD.push(name+': не под ручной постановкой (kino)');if(cd.def.dur>25)CBAD.push(name+' дольше 25 с');
    const sizes=new Set(cd.shots.map(s=>s.size)),moves=new Set(cd.shots.map(s=>s.p2?'spline':s.trk?'track':s.move));
    const r=name+' '+cd.def.dur+'с шотов='+cd.shots.length+' крупн='+[...sizes].join('/')+' движ='+[...moves].join('/');if(sizes.size<3||moves.size<2)CBAD.push('мало разнообразия: '+r);CREP.push(r);}
  SPK(cd);};
window.RUN=(i,t)=>{let n=0;while(n<60*200){const c=ZC.G.cine;if(!PRK.on||(PRK.i>i)||(PRK.i===i&&c&&c.t>=t))break;ZC.tick(1);n++;TRACK();}return 'сцена '+(PRK.i+1)+' t='+(ZC.G.cine?ZC.G.cine.t.toFixed(1):'—');};
if(!PRK.on)throw new Error('«Присказка» не началась при новой игре');
const lv=document.getElementById('level');(lv.style.opacity==='1'?'FIN название уровня поверх ролика ':'')+RUN(0,5.2)
//@@
// постановка: точка в кадре (8 % от края — запас); русалка не торчит над Котом в 1-4 и появляется в 1-6б; хвост Кота живой (пружины);
// 2-5 — Кот и Кузьма оба в кадре; 4-4б — Кощей на своей реплике крупно; 5-5 — рука видна, пока тянется к цепи
window.INF=p=>{const V=THREE.Vector3,P=ZC.FIN.cine.CD().pose,f=new V().subVectors(P.look,P.pos).normalize(),r=new V().crossVectors(f,new V(0,1,0)).normalize(),u=new V().crossVectors(r,f),to=new V().subVectors(p,P.pos);
  const z=to.dot(f),tv=Math.tan(P.fov*Math.PI/360)*0.92;return z>0&&Math.abs(to.dot(u)/z)<tv&&Math.abs(to.dot(r)/z)<tv*16/9;};
window.WP=o=>o.getWorldPosition(new THREE.Vector3());
{const PRK=ZC.FIN.intro,L=PRK.L,bad=[];RUN(0,11.0);if(L.mer.g.visible)bad.push('1-4: русалка видна до 1-6');
  const t0=L.kot.tail.map(b=>b.position.clone());for(let i=0;i<20;i++){ZC.tick(1);TRACK();}if(!L.kot.tail.some((b,i)=>b.position.distanceTo(t0[i])>0.004))bad.push('хвост Кота неподвижен');
  if(bad.length)throw new Error('FAIL постановка: '+bad.join(', '));'постановка 1 ok'}
//@@ shot=intro_mermaid.png wait=200
// русалка на ветке дуба (1-6б): модель с лицом, руками и гребнем, в кадре
RUN(0,19.8);{const K=ZC.FIN.intro.L.kot,B=K.rig;if(K.lids[0].rotation.x!==-0.5||B.lidL.userData.lidHold||B.lidR.userData.lidHold||B.lidL.rotation.x>0.5)throw new Error('FAIL у Кота веко осталось на глазу после подмигивания: '+B.lidL.rotation.x.toFixed(2));}
{const M=ZC.FIN.intro.L.mer;if(!M||!M.anim||!M.g.visible||!M.eyes||M.eyes.length!==2||!M.comb)throw new Error('FAIL русалка без модели');if(!INF(WP(M.g)))throw new Error('FAIL 1-6б: русалки нет в кадре');}
//@@
// хвост плещет, гребень ходит, глаза моргают; 2-5 — Кот и Кузьма в кадре
{const PRK=ZC.FIN.intro,L=PRK.L,M=L.mer,bad=[];const r0=M.seg[4].rotation.x,c0=M.aR.sh.rotation.z;let bl=false;for(let i=0;i<130;i++){ZC.tick(1);TRACK();if(M.eyes[0].scale.y<0.5)bl=true;}
  if(Math.abs(M.seg[4].rotation.x-r0)<0.005&&Math.abs(M.aR.sh.rotation.z-c0)<0.005)throw new Error('FAIL русалка не двигается');if(!bl)throw new Error('FAIL русалка не моргает');
  RUN(1,10.3);if(!INF(WP(L.kot.head)))bad.push('2-5: Кота нет в кадре');if(!INF(WP(L.kuzma.head)))bad.push('2-5: Кузьмы нет в кадре');
  if(bad.length)throw new Error('FAIL постановка: '+bad.join(', '));'постановка 2 ok'}
//@@ shot=intro_patrol.png wait=200
RUN(2,7.0)
//@@
{const PRK=ZC.FIN.intro,L=PRK.L,bad=[];RUN(3,10.2);{const d=ZC.FIN.cine.CD().pose.pos.distanceTo(WP(L.ko.head));if(d>4.5||!INF(WP(L.ko.head)))bad.push('4-4б: Кощей не крупно, d='+d.toFixed(1));}
  RUN(4,14.0);if(!L.hand.visible||!INF(WP(L.hand)))bad.push('5-5: руки не видно');
  if(bad.length)throw new Error('FAIL постановка: '+bad.join(', '));'постановка 4–5 ok'}
//@@ shot=intro_hand.png wait=200
RUN(4,14.2)
//@@
// Смородина (сцена 6): у Горыныча три головы (не одни шеи), и головы у оснований шей сходятся лбами
// «Пять сторон»: в каждом мире — босс в своём логове, в кадре: Леший-великан, Водяной на соме, Соловей на гнезде, (Горыныч — ниже), Лихо с открытым глазом
RUN(5,1.6);{const D=ZC.FIN.intro.Wd;if(!D.w1.lesh||D.w1.lesh.g.position.y<-1||!INF(WP(D.w1.lesh.head)))throw new Error('FAIL 6-1: Лешего нет в кадре');}
//@@ shot=intro_w1.png wait=200
RUN(5,3.3);{const D=ZC.FIN.intro.Wd;if(!D.w2.vod||!INF(WP(D.w2.vod.head||D.w2.som.s0)))throw new Error('FAIL 6-2: Водяного нет в кадре');}
//@@ shot=intro_w2.png wait=200
RUN(5,5.2);{const D=ZC.FIN.intro.Wd;if(!D.w3.sol||!INF(WP(D.w3.sol.head)))throw new Error('FAIL 6-3: Соловья нет в кадре');}
//@@ shot=intro_w3.png wait=200
RUN(5,6.75);{const G=ZC.FIN.intro.Wd.w4.gor,V3=THREE.Vector3;if(!G.heads||G.heads.length!==3)throw new Error('FAIL у Горыныча в «Присказке» нет голов');
  const hx=G.heads.map(h=>h.g.getWorldPosition(new V3()));G.necks.forEach((n,i)=>{const d=hx[i].distanceTo(n.getWorldPosition(new V3()));if(d>4)throw new Error('FAIL голова '+i+' оторвана от шеи: '+d.toFixed(1));});
  ZC.FIN.introGor=hx.map(v=>v.x.toFixed(1)).join('/');}
//@@ shot=intro_gor.png wait=200
ZC.FIN.introGor
//@@
RUN(5,9.0);{const D=ZC.FIN.intro.Wd,L=D.w5.lih;if(!L||!INF(WP(L.eye)))throw new Error('FAIL 6-5: Лиха нет в кадре');if(L.lid.rotation.x>0)throw new Error('FAIL 6-5: глаз Лиха не открылся');}
//@@ shot=intro_w5.png wait=200
RUN(9,0)
//@@
const PRK=ZC.FIN.intro,W=ZC.W,G=ZC.G;let n=0;while(G.cine&&n<300){ZC.tick(1);n++;}ZC.tick(30);
window.ROOM=()=>{const bad=[];if(PRK.on)bad.push('ролик не закончился');if(PRK.root)bad.push('площадки не убраны');if(W.levelId!=='p')bad.push('уровень '+W.levelId);
  if(W.flags.stage!=='room')bad.push('stage='+W.flags.stage);if(W.theme!=='evening')bad.push('тема '+W.theme);if(G.cine)bad.push('идёт ролик');if(PRK.att&&PRK.att.length)bad.push('реквизит на героях');
  const hid=W.group.children.filter(c=>!c.visible).length;if(hid>W.group.children.length*0.5)bad.push('скрыто '+hid+' из '+W.group.children.length);
  for(const pi of[0,1])ZC.players[pi].heroes.forEach((h,k)=>{const s=W.spawns[pi][k];if(Math.hypot(h.pos.x-s.x,h.pos.z-s.z)>0.6)bad.push(h.kind+' не на месте');});
  if(document.getElementById('prkTitle').classList.contains('on'))bad.push('титул не убран');return bad;};
const bad=ROOM();if(bad.length)throw new Error('FAIL после «Присказки»: '+bad.join(', '));
if(SEEN.size!==7)CBAD.push('сцен '+SEEN.size+' из 7');
// пропуск: заново и в середине третьей сцены
ZC.FIN.introWant=true;ZC.startFrom(0);ZC.G.manual=true;ZC.tick(2);let k=0;while(PRK.i<2&&k<60*60){ZC.tick(1);k++;}ZC.tick(120);ZC.skip();ZC.tick(40);
const bad2=ROOM();if(bad2.length)throw new Error('FAIL после пропуска: '+bad2.join(', '));
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));
if(CBAD.length)throw new Error('FAIL '+CBAD.slice(0,6).join(' | '));
'intro ok · '+CREP.filter(s=>/шотов/.test(s)).length+' роликов, реплик проверено '+CREP.filter(s=>/лицо/.test(s)).length
