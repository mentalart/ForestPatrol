//@@ wait=1500
// @timeout=1200
// релиз final06: 1-1 — ролики с Ягой в ручной постановке (late_99n_yaga11.js, def.kino): «Яга ставит задачу» (19,2 с: дверь, блик очков,
// клубок в руке, Прошка хорохорится, очки крупно, кикиморки) и «Клубки в дар» после уборки (22,6 с: герои сбегаются, клубки летят,
// шёпот на ухо каждому, Прошкин клубок катится через грядку). Оба играются целиком (без пропуска). Проверки: ролик под def.kino,
// ≥ 3 крупностей и ≥ 2 типов движения камеры; в середине каждой реплики героя или Яги говорящий в кадре и повёрнут к камере;
// после первого — бой с кикиморками, после второго — двор, клубок у героев, реквизит убран; ошибок нет. Кадры: Яга с клубком, шёпот, нить.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(false);ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(30);if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(30);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
const CI=ZC.FIN.cine,ACT=ZC.FIN.actors,V=THREE.Vector3;window.CREP=[];window.CBAD=[];window.CHK={t0:{},done:{}};
// реплика: в середине — говорящий в кадре и лицом к камере (скалярное «вперёд»·«на камеру» > −0,1)
window.SPK=(cd)=>{const S=ACT.speaker;if(!S||!S.who||S.who==='zven'||S.until<ZC.G.time)return;const k=S.who+'@'+S.until.toFixed(2);if(CHK.done[k])return;
  if(!CHK.t0[k])CHK.t0[k]=ZC.G.time;if(ZC.G.time<CHK.t0[k]+(S.until-CHK.t0[k])*0.5)return;CHK.done[k]=1;const L=CI.locate(S.who);if(!L)return;
  const H=L.head(),P=cd.pose,dir=new V().subVectors(P.look,P.pos).normalize(),to=new V().subVectors(H,P.pos),d=to.length();to.normalize();
  const ang=Math.acos(Math.max(-1,Math.min(1,dir.dot(to))))*180/Math.PI,half=Math.atan(Math.tan(P.fov*Math.PI/360)*16/9)*180/Math.PI;
  let fw=null;if(L.hero){const r=L.obj.g.rotation.y;fw=new V(Math.sin(r),0,Math.cos(r));}else if(L.obj&&L.obj.o&&L.obj.o.g){const q=new THREE.Quaternion();L.obj.o.g.getWorldQuaternion(q);fw=new V(0,0,1).applyQuaternion(q).setY(0).normalize();}
  const back=fw?fw.dot(new V(P.pos.x-H.x,0,P.pos.z-H.z).normalize()):1;const rec=S.who+' '+ang.toFixed(0)+'°/'+half.toFixed(0)+'° d='+d.toFixed(1)+' лицо='+back.toFixed(2);CREP.push(rec);
  if(ang>half*0.95||back<-0.1)CBAD.push(cd.def.dur+'с: '+rec);};
// ролик целиком: шоты, крупности, движения, реплики; snaps — {время: имя кадра} (кадры снимает следующий шаг)
window.PLAYC=(name,dur,stopAt)=>{let n=0;while(!ZC.G.cine&&n<600){ZC.tick(1);n++;}if(!ZC.G.cine)throw new Error(name+': ролик не начался '+U.st());const cd=CI.CD();
  if(!cd||!cd.def.kino)throw new Error(name+': ролик не под ручной постановкой (def.kino)');if(Math.abs(cd.def.dur-dur)>0.01)throw new Error(name+': не новый ролик, dur='+cd.def.dur);
  const sizes=new Set(cd.shots.map(s=>s.size)),moves=new Set(cd.shots.map(s=>s.p2?'spline':s.trk?'track':s.move));
  let c=0;while(ZC.G.cine&&c<60*60&&!(stopAt&&ZC.G.cine.t>=stopAt)){ZC.tick(1);c++;const now=CI.CD();if(now)SPK(now);}
  const r=name+' '+cd.def.dur+'с шотов='+cd.shots.length+' крупн='+[...sizes].join('/')+' движ='+[...moves].join('/');if(sizes.size<3||moves.size<2)CBAD.push('мало разнообразия: '+r);CREP.push(r);return r;};
window.GOON=()=>{let c=0;while(ZC.G.cine&&c<60*60){ZC.tick(1);c++;const now=CI.CD();if(now)SPK(now);}};
// раз-два-три у избушки — сразу к повороту; ролик Яги начинается после поворота
const W=ZC.W;W.rzt.state='done';W.rzt.onDone();PLAYC('Яга ставит задачу',19.2,7.4)
//@@ shot=y11_clew.png
// «Уберёте — клубок подарю»: Яга в кадре, клубок в поднятой руке
'план клубка t='+ZC.G.cine.t.toFixed(1)
//@@
GOON();ZC.tick(10);const W=ZC.W;
if(W.flags.stage!=='fight')throw new Error('после ролика не бой: '+W.flags.stage);if(!W.enemies.some(e=>e.alive&&e.kind==='kiki'))throw new Error('кикиморок нет');
'бой stage='+W.flags.stage+' kiki='+W.enemies.filter(e=>e.alive).length
//@@
// бой и уборка — коротко: кикиморки убежали, мусор в куче (сама уборка — в t11)
const W=ZC.W;W.enemies.forEach(e=>{e.alive=false;if(e.g)e.g.visible=false;});let n=0;while(W.flags.stage!=='clean'&&n<600){ZC.tick(1);n++;}if(W.flags.stage!=='clean')throw new Error('уборка не началась: '+W.flags.stage);
const C=W.clean11;C.TR.forEach(t=>{t.state='done';t.g.visible=false;});C.TRB.state='done';C.TRB.g.visible=false;PLAYC('Клубки в дар',22.6,9.0)
//@@ shot=y11_whisper.png
// Потапу на ухо: оба в кадре, Яга склонилась
'план шёпота t='+ZC.G.cine.t.toFixed(1)
//@@
let n=0;while(ZC.G.cine&&ZC.G.cine.t<19.6&&n<900){ZC.tick(1);n++;const now=ZC.FIN.cine.CD();if(now)SPK(now);}'нить t='+ZC.G.cine.t.toFixed(1)
//@@ shot=y11_thread.png
// клубок катится через грядку, за ним — золотая нить
'кадр нити t='+ZC.G.cine.t.toFixed(1)
//@@
GOON();ZC.tick(20);const W=ZC.W;
if(W.flags.stage!=='yard'||!W.abil.clew)throw new Error('после ролика не двор с клубком: '+W.flags.stage+' clew='+W.abil.clew);
const gold=[];W.group.traverse(o=>{if(o.isMesh&&o.geometry&&o.geometry.type==='TorusGeometry'&&o.material&&o.material.color&&o.material.color.getHex()===0xffd76a&&o.parent===W.group)gold.push(o);});
if(gold.length)throw new Error('реквизит ролика не убран: '+gold.length);
ZC.tick(30);if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));
if(CBAD.length)throw new Error('FAIL '+CBAD.slice(0,6).join(' | '));
'yaga11 ok · '+CREP.filter(s=>/шотов/.test(s)).join(' · ')+' · реплик проверено '+CREP.filter(s=>/лицо/.test(s)).length+': '+CREP.filter(s=>/лицо/.test(s)).join(', ')
//@@
// M-4b: подсказки боя с Ягой — не длиннее 7 слов (жёстко 10); озвучки у них нет (озвучены только реплики ролика)
const words=h=>String(h).replace(/<[^>]*>/g,' ').split(/\s+/).filter(w=>/[A-Za-zА-Яа-яЁё0-9]/.test(w)).length;
const seen=['Не попасть! Отбей G, потом бей F.','Колокольчик! Коль упадёшь — сюда вернёшься, не пропадёшь.','Солнышко вспыхнуло — защиту G жми!'].map(ZC.FIN.yaga11Tip);
if(seen.some(x=>words(x)>7))throw new Error('подсказки Яги длиннее 7 слов: '+JSON.stringify(seen.map(words)));
'yaga11 tips ok '+seen.map(words).join('/')
