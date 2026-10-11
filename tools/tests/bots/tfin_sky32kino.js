//@@ wait=1500
// @timeout=1500
// релиз final06: 3-2 «Облачные пастбища» — режиссура роликов (общий слой late_86b_kino.js, сцены — late_99o_sky32.js; правила —
// docs/40_kino_pravila.md): все 7 роликов играются целиком (без пропуска). Проверки как у tfin_sky31cine: ролик поставлен вручную
// (def.kino), не меньше 3 крупностей и 2 типов движения камеры; в середине каждой реплики героя или персонажа (Пушок, Ветер, Баран)
// говорящий в кадре и повёрнут к камере; ошибок нет. Кадры: Пушок, Ветер у кошары, финал.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(false);ZC.startFrom(ZC.LV('3-2'));ZC.G.manual=true;ZC.tick(30);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
if(ZC.FIN.tut32)ZC.FIN.tut32.auto=false;U.nocine();
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
  if(!cd||!(cd.def.kino||cd.def.d31))throw new Error(name+': ролик не под ручной постановкой (kino)');const sizes=new Set(cd.shots.map(s=>s.size)),moves=new Set(cd.shots.map(s=>s.p2?'spline':s.trk?'track':s.move));
  let c=0;while(ZC.G.cine&&c<60*60){ZC.tick(1);c++;const now=CI.CD();if(now)SPK(now);}
  const r=name+' '+cd.def.dur+'с шотов='+cd.shots.length+' крупн='+[...sizes].join('/')+' движ='+[...moves].join('/');if(sizes.size<3||moves.size<2)CBAD.push('мало разнообразия: '+r);CREP.push(r);return r;};
const W=ZC.W,H=ZC.HERO;W.warp32('lamb');ZC.tick(10);for(const h of Object.values(H))h.following=false;
const a=U.hero(0),b=U.hero(1);a.pos.set(-1,15,-104.4);b.pos.set(1,15,-104.4);a.lit=true;b.lit=true;'go'
//@@ shot=sky32kino_lamb.png wait=200
PLAYC('Пушок',300)
//@@
const W=ZC.W;ZC.tick(5);W.warp32('cliff');ZC.tick(10);U.hero(0).pos.set(0,19.2,-146.2);PLAYC('Ветер',300)
//@@
const W=ZC.W;W.warp32('pen');ZC.tick(10);W.herd32.forEach(s=>{s.penned=true;});ZC.tick(5);
//@@ shot=sky32kino_veter.png wait=200
PLAYC('кошара',300)
//@@
const W=ZC.W,H=ZC.HERO;W.warp32('boss');ZC.tick(10);for(const h of Object.values(H)){h.following=false;h.lit=false;}U.goto(0,0,-307,5);PLAYC('Баран',300)
//@@
const B=ZC.W.ram32;B.e.onFinisher(U.hero(0));PLAYC('туча',120)
//@@
const B=ZC.W.ram32;B.e.onFinisher(U.hero(0));PLAYC('падение',120)
//@@
const W=ZC.W,B=W.ram32,e=B.e,LB=W.lamb32;B.ai='graze';LB.mode='free';LB.hop=null;LB.scared=0;LB.pos.set(e.pos.x+1.2,e.pos.y,e.pos.z+0.6);ZC.tick(2);
//@@ shot=sky32kino_finale.png
PLAYC('финал',200)
//@@
ZC.tick(30);if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));
if(CBAD.length)throw new Error('FAIL '+CBAD.slice(0,6).join(' | '));
'kino32 ok · '+CREP.filter(s=>/шотов/.test(s)).length+' роликов, реплик проверено '+CREP.filter(s=>/лицо/.test(s)).length
