//@@ wait=1500 shot=intro_luko.png
// @timeout=1500
// релиз final06: «Присказка» — вступительный ролик перед прологом (levels/p/late_96f_intro_sets.js, late_96g_intro_scenes.js; сценарий — docs/42_priskazka_intro.md).
// Новая игра с FIN.introWant: семь роликов подряд, целиком, без пропуска. Проверки: каждый — ручная постановка (def.kino), ≤ 25 с, не меньше 3 крупностей
// и 2 типов движения камеры; в середине каждой реплики в кадре (не голос за кадром) говорящий в кадре и повёрнут к камере; после — комната пролога:
// площадки убраны, уровень виден, герои на местах, свет пролога, ролик «Колыбельная» не начался. Пропуск в середине — то же состояние. Ошибок нет.
// Кадры: Лукоморье (1-2), сосна-штаб с героями (3-3), рука над цепью (5-5), головы Горыныча на Смородине (6).
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
//@@ shot=intro_patrol.png wait=200
RUN(2,7.0)
//@@ shot=intro_hand.png wait=200
RUN(4,14.2)
//@@
// Смородина (сцена 6): у Горыныча три головы (не одни шеи), и головы у оснований шей сходятся лбами
RUN(5,6.75);{const G=ZC.FIN.intro.Wd.w4.gor,V3=THREE.Vector3;if(!G.heads||G.heads.length!==3)throw new Error('FAIL у Горыныча в «Присказке» нет голов');
  const hx=G.heads.map(h=>h.g.getWorldPosition(new V3()));G.necks.forEach((n,i)=>{const d=hx[i].distanceTo(n.getWorldPosition(new V3()));if(d>4)throw new Error('FAIL голова '+i+' оторвана от шеи: '+d.toFixed(1));});
  ZC.FIN.introGor=hx.map(v=>v.x.toFixed(1)).join('/');}
//@@ shot=intro_gor.png wait=200
ZC.FIN.introGor
//@@
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
