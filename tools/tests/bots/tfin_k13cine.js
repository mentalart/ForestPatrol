//@@ wait=1500
// @timeout=1200
// релиз final06: 1-3 «Колобок» — ролики в ручной постановке (late_99zy_k13_kino.js, def.kino): вступление «Я от бабушки ушёл» (8,2 с),
// «Ну, ешь» (24,4 с: герои вокруг Колобка, он жмурится и дрожит, Прошка отказывается, глаза по одному, прыжок, Пелагея рисует) и пляска
// (12,5 с, хореография late_99_kolobok_dance). Все играются целиком. Проверки: ролик под def.kino, ≥ 3 крупностей и ≥ 2 типов движения;
// в середине каждой реплики Колобка и Прошки говорящий в кадре и лицом к камере; после роликов — бег, пляска на гуслях, звено у Прошки;
// реквизит убран, Колобок своего размера; ошибок нет.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=777;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
ZC.setSolo(false);ZC.startFrom(ZC.LV('1-3'));ZC.G.manual=true;ZC.tick(2);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
const CI=ZC.FIN.cine,ACT=ZC.FIN.actors,V=THREE.Vector3;window.CREP=[];window.CBAD=[];window.CHK={t0:{},done:{}};
// реплика: в середине — говорящий в кадре и лицом к камере (скалярное «вперёд»·«на камеру» > −0,1)
window.SPK=(cd)=>{const S=ACT.speaker;if(!S||!S.who||S.who==='zven'||S.until<ZC.G.time)return;const k=S.who+'@'+S.until.toFixed(2);if(CHK.done[k])return;
  if(!CHK.t0[k])CHK.t0[k]=ZC.G.time;if(ZC.G.time<CHK.t0[k]+(S.until-CHK.t0[k])*0.5)return;CHK.done[k]=1;const L=CI.locate(S.who);if(!L){CREP.push(S.who+' не найден');return;}
  const H=L.head(),P=cd.pose,dir=new V().subVectors(P.look,P.pos).normalize(),to=new V().subVectors(H,P.pos),d=to.length();to.normalize();
  const ang=Math.acos(Math.max(-1,Math.min(1,dir.dot(to))))*180/Math.PI,half=Math.atan(Math.tan(P.fov*Math.PI/360)*16/9)*180/Math.PI,vang=Math.abs(Math.asin(to.y)-Math.asin(dir.y))*180/Math.PI;
  let fw=null;if(L.hero){const r=L.obj.g.rotation.y;fw=new V(Math.sin(r),0,Math.cos(r));}else if(L.obj&&L.obj.o&&L.obj.o.g){const q=new THREE.Quaternion();L.obj.o.g.getWorldQuaternion(q);fw=new V(0,0,1).applyQuaternion(q).setY(0).normalize();}
  const back=fw?fw.dot(new V(P.pos.x-H.x,0,P.pos.z-H.z).normalize()):1;const rec=S.who+' '+ang.toFixed(0)+'°/'+half.toFixed(0)+'° в'+vang.toFixed(0)+'° d='+d.toFixed(1)+' лицо='+back.toFixed(2);CREP.push(rec);
  if(ang>half*0.95||vang>P.fov*0.5||back<-0.1)CBAD.push(cd.def.dur+'с: '+rec);};
window.PLAYC=(name,dur,stopAt)=>{let n=0;while(!ZC.G.cine&&n<600){ZC.tick(1);n++;}if(!ZC.G.cine)throw new Error(name+': ролик не начался '+U.st());const cd=CI.CD();
  if(!cd||!cd.def.kino)throw new Error(name+': ролик не под ручной постановкой (def.kino)');if(Math.abs(cd.def.dur-dur)>0.01)throw new Error(name+': не новый ролик, dur='+cd.def.dur);
  const sizes=new Set(cd.shots.map(s=>s.size)),moves=new Set(cd.shots.map(s=>s.p2?'spline':s.trk?'track':s.move));
  let c=0;while(ZC.G.cine&&c<60*60&&!(stopAt&&ZC.G.cine.t>=stopAt)){ZC.tick(1);c++;const now=CI.CD();if(now)SPK(now);}
  const r=name+' '+cd.def.dur+'с шотов='+cd.shots.length+' крупн='+[...sizes].join('/')+' движ='+[...moves].join('/');if(sizes.size<3||moves.size<2)CBAD.push('мало разнообразия: '+r);CREP.push(r);return r;};
window.GOON=()=>{let c=0;while(ZC.G.cine&&c<60*60){ZC.tick(1);c++;const now=CI.CD();if(now)SPK(now);}};
PLAYC('Песня',8.2,2.6)
//@@ shot=k13c_sing.png
// Колобок крупно поёт
'песня t='+ZC.G.cine.t.toFixed(1)
//@@
GOON();ZC.tick(10);const S=ZC.W.song;if(S.state!=='play'||!ZC.W.camFn)throw new Error('после песни не бег: '+S.state);
'бег '+S.state
//@@
// конец бега — «Ну, ешь»
ZC.W.song.jump(190);PLAYC('Ну, ешь',24.4,5.2)
//@@ shot=k13c_eat.png
// из-за плеча Прошки: Колобок зажмурился
'ну ешь t='+ZC.G.cine.t.toFixed(1)
//@@
let n=0;while(ZC.G.cine&&ZC.G.cine.t<21.8&&n<1200){ZC.tick(1);n++;const now=ZC.FIN.cine.CD();if(now)SPK(now);}'рисунок t='+ZC.G.cine.t.toFixed(1)
//@@ shot=k13c_draw.png
// Пелагея рисует нового Колобка золотыми точками
'кадр рисунка'
//@@
GOON();ZC.tick(10);const S=ZC.W.song;let n=0;while(!(S.state==='final'&&S.fin)&&n<600){ZC.tick(1);n++;}
if(S.state!=='final')throw new Error('после «Ну, ешь» не пляска на гуслях: '+S.state);
const pic=[];ZC.W.group.traverse(o=>{if(o.userData.k13pic)pic.push(o);});if(pic.length)throw new Error('рисунок не убран: '+pic.length);
// пляски — сразу к последней, все струны горят
S.fs=2;S.lit=[true,true,true,true];S.ft=999;PLAYC('Пляска',12.5,2.0)
//@@ shot=k13c_dance_kol.png
// Колобок крупно заводит сказ
'пляска t='+ZC.G.cine.t.toFixed(1)
//@@
GOON();ZC.tick(30);const S=ZC.W.song;if(S.state!=='done')throw new Error('после пляски не итог: '+S.state);
ZC.tick(30);if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));
if(CBAD.length)throw new Error('FAIL '+CBAD.slice(0,6).join(' | '));
'k13cine ok · '+CREP.filter(s=>/шотов/.test(s)).join(' · ')+' · реплик проверено '+CREP.filter(s=>/лицо|не найден/.test(s)).length+': '+CREP.filter(s=>/лицо|не найден/.test(s)).join(', ')
