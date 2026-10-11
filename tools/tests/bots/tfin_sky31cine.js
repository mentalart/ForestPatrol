//@@ wait=1500
// @timeout=1500
// релиз final06: 3-1 «Сад молодильных яблок» — режиссура роликов (late_99pb_sky31_cine.js, сцены — late_99p_sky31.js): все 8 роликов
// играются целиком (без пропуска). Проверки: ролик поставлен вручную (def.d31), в нём не меньше 3 крупностей (общий, средний, крупный) и 2 типов движения камеры;
// говорящий в кадре и повёрнут к камере (лицо видно, а не затылок) — в середине каждой реплики героя или персонажа; ошибок нет.
// Кадры: гнездо (Жар-птица), садовник-молодец, финал (Жар-птица молодая).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(false);ZC.startFrom(ZC.LV('3-1'));ZC.G.manual=true;ZC.tick(3);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
const CI=ZC.FIN.cine,ACT=ZC.FIN.actors,V=THREE.Vector3;window.CREP=[];window.CBAD=[];
// реплика: в середине — говорящий в кадре и лицом к камере (скалярное «вперёд»·«на камеру» > −0,1)
window.SPK=(cd)=>{const S=ACT.speaker;if(!S||!S.who||S.who==='zven'||S.until<ZC.G.time)return;const k=S.who+'@'+S.until.toFixed(2);if(CHK.done[k])return;
  if(!CHK.t0[k])CHK.t0[k]=ZC.G.time;if(ZC.G.time<CHK.t0[k]+(S.until-CHK.t0[k])*0.5)return;CHK.done[k]=1;const L=CI.locate(S.who);if(!L)return;
  const H=L.head(),P=cd.pose,dir=new V().subVectors(P.look,P.pos).normalize(),to=new V().subVectors(H,P.pos),d=to.length();to.normalize();
  const ang=Math.acos(Math.max(-1,Math.min(1,dir.dot(to))))*180/Math.PI,half=Math.atan(Math.tan(P.fov*Math.PI/360)*16/9)*180/Math.PI;
  let fw=null;if(L.hero){const r=L.obj.g.rotation.y;fw=new V(Math.sin(r),0,Math.cos(r));}else if(L.obj&&L.obj.o&&L.obj.o.g){const q=new THREE.Quaternion();L.obj.o.g.getWorldQuaternion(q);fw=new V(0,0,1).applyQuaternion(q).setY(0).normalize();}
  const back=fw?fw.dot(new V(P.pos.x-H.x,0,P.pos.z-H.z).normalize()):1;const rec=S.who+' '+ang.toFixed(0)+'°/'+half.toFixed(0)+'° d='+d.toFixed(1)+' лицо='+back.toFixed(2);CREP.push(rec);
  if(ang>half*0.95||back<-0.1)CBAD.push(cd.def.dur+'с: '+rec);};
window.CHK={t0:{},done:{}};
// ролик целиком: шоты, крупности, движения, реплики
window.PLAYC=(name,maxT)=>{let n=0;while(!ZC.G.cine&&n<(maxT||600)){ZC.tick(1);n++;}if(!ZC.G.cine)throw new Error(name+': ролик не начался '+U.st());const cd=CI.CD();
  if(!cd||!cd.def.d31)throw new Error(name+': ролик не под режиссурой d31');const sizes=new Set(cd.shots.map(s=>s.size)),moves=new Set(cd.shots.map(s=>s.p2?'spline':s.trk?'track':s.move));
  let c=0;while(ZC.G.cine&&c<60*60){ZC.tick(1);c++;const now=CI.CD();if(now)SPK(now);}
  const r=name+' '+cd.def.dur+'с шотов='+cd.shots.length+' крупн='+[...sizes].join('/')+' движ='+[...moves].join('/');if(sizes.size<3||moves.size<2)CBAD.push('мало разнообразия: '+r);CREP.push(r);return r;};
PLAYC('вступление',60);
//@@
const h=U.hero(0);h.pos.set(0,0,-1);ZC.tick(2);
//@@ shot=sky31cine_nest.png wait=200
const r=PLAYC('гнездо',600);r
//@@
const W=ZC.W;W.warp31('gardener');ZC.tick(5);W.flags.metGardener=false;W.flags.young=false;U.nocine();for(const pi of[0,1])U.goto(pi,pi?1:-1,-182,6);PLAYC('садовник',600)
//@@ wait=200
const W=ZC.W;W.agers31[0].onApple();ZC.tick(80);
//@@ shot=sky31cine_young.png
PLAYC('молодец',300)
//@@
const W=ZC.W,H=ZC.HERO;W.warp31('boss');ZC.tick(10);for(const h of Object.values(H)){h.following=false;h.lit=false;}U.toKind('proshka',0);U.toKind('pelageya',1);U.goto(0,0,-445,5);PLAYC('Ворон',300)
//@@
const W=ZC.W,VB=W.voron31;VB.e.onFinisher();PLAYC('Царь-яблоко',120)
//@@
const W=ZC.W,VB=W.voron31,e=VB.e;VB.hits=2;VB.ai='recover';e.dazeT=1;W.onAppleFly31({pos:e.pos.clone().add(new THREE.Vector3(0,1.2,0)),king:false,state:'fly'});PLAYC('воронёнок',200)
//@@
const W=ZC.W;W.agers31[W.agers31.length-1].onApple();ZC.tick(60);
//@@ shot=sky31cine_finale.png
PLAYC('финал',200)
//@@
ZC.tick(30);if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));
const fb=ZC.W.fb31;if(!fb||fb.age<0.99)throw new Error('Жар-птица не помолодела: '+(fb&&fb.age));
if(CBAD.length)throw new Error('FAIL '+CBAD.slice(0,6).join(' | '));
'cine31 ok · '+CREP.filter(s=>/шотов/.test(s)).length+' роликов, реплик проверено '+CREP.filter(s=>/лицо/.test(s)).length
