//@@ wait=1500
// @timeout=1200
// релиз final06: 1-5 «Кикиморина прялка» — режиссура роликов (levels/1-5/late_99zw_k15_kino.js): вступление, показки стана и паутинки,
// веретено удирает, Веретенник просыпается, этап 2, финал — все играются целиком (без пропуска). Проверки: ролик поставлен вручную (def.kino),
// в нём не меньше 3 крупностей и 2 типов движения камеры; говорящий герой или персонаж в середине реплики — в кадре и лицом к камере; ошибок нет;
// после роликов состояние уровня то же, что раньше (стан не открыт показкой, мороки овина появились после показки, финал завершил уровень).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(false);ZC.startFrom(ZC.LV('1-5'));ZC.G.manual=true;ZC.tick(3);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
const CI=ZC.FIN.cine,ACT=ZC.FIN.actors,V=THREE.Vector3;window.CREP=[];window.CBAD=[];
window.SPK=(cd)=>{const S=ACT.speaker;if(!S||!S.who||S.who==='zven'||S.until<ZC.G.time)return;const k=S.who+'@'+S.until.toFixed(2);if(CHK.done[k])return;
  if(!CHK.t0[k])CHK.t0[k]=ZC.G.time;if(ZC.G.time<CHK.t0[k]+(S.until-CHK.t0[k])*0.5)return;CHK.done[k]=1;const L=CI.locate(S.who);if(!L)return;
  const H=L.head(),P=cd.pose,dir=new V().subVectors(P.look,P.pos).normalize(),to=new V().subVectors(H,P.pos),d=to.length();to.normalize();
  const ang=Math.acos(Math.max(-1,Math.min(1,dir.dot(to))))*180/Math.PI,half=Math.atan(Math.tan(P.fov*Math.PI/360)*16/9)*180/Math.PI;
  let fw=null;if(L.hero){const r=L.obj.g.rotation.y;fw=new V(Math.sin(r),0,Math.cos(r));}else if(L.obj&&L.obj.o&&L.obj.o.g){const q=new THREE.Quaternion();L.obj.o.g.getWorldQuaternion(q);fw=new V(0,0,1).applyQuaternion(q).setY(0).normalize();}
  const back=fw?fw.dot(new V(P.pos.x-H.x,0,P.pos.z-H.z).normalize()):1;const rec=S.who+' '+ang.toFixed(0)+'°/'+half.toFixed(0)+'° d='+d.toFixed(1)+' лицо='+back.toFixed(2);CREP.push(rec);
  if(ang>half*0.95||back<-0.1)CBAD.push(cd.def.dur+'с: '+rec);};
window.CHK={t0:{},done:{}};
window.PLAYC=(name,maxT)=>{let n=0;while(!ZC.G.cine&&n<(maxT||600)){ZC.tick(1);n++;}if(!ZC.G.cine)throw new Error(name+': ролик не начался '+U.st());const cd=CI.CD();
  if(!cd||!cd.def.kino)throw new Error(name+': ролик не под ручной режиссурой (kino)');const sizes=new Set(cd.shots.map(s=>s.size)),moves=new Set(cd.shots.map(s=>s.p2?'spline':s.trk?'track':s.move));
  let c=0;while(ZC.G.cine&&c<60*60){ZC.tick(1);c++;const now=CI.CD();if(now)SPK(now);}
  const r=name+' '+cd.def.dur+'с шотов='+cd.shots.length+' крупн='+[...sizes].join('/')+' движ='+[...moves].join('/');if(sizes.size<3||moves.size<2)CBAD.push('мало разнообразия: '+r);CREP.push(r);return r;};
window.F=()=>ZC.W.flags;window.K15=()=>ZC.W.k15;
PLAYC('вступление',60)
//@@ shot=k15cine_intro_end.png
['stage='+F().stage,U.st(),'lift '+K15().PL.map(P=>P.g.position.y.toFixed(2)).join('/')]
//@@
// показка стана: герои в ткацкой — сама (по входу в зал)
const K=K15();K.aFoes.started=true;K.aFoes.list.forEach(e=>{e.alive=false;if(e.g)e.g.visible=false;});F().liftDone=true;
ZC.FIN.warp(0,26.5);ZC.tick(2);[0,1].forEach(pi=>{const h=U.act(pi);h.pos.set(pi?1:-1,4.45,26.5);h.vel.set(0,0,0);});
const r=PLAYC('показка стана',300);[r,'demoLift='+F().demoLift,'loom open='+K.LOOM.open,'n='+K.LOOM.n]
//@@ shot=k15cine_web.png
// показка паутинки — при входе в овин, мороки овина — после неё
const K=K15();K.LOOM.n=K.LOOM.max;F().loomDone=true;ZC.W.warp15('ovin');F().demoWeb=false;K.floorFoes.started=false;ZC.tick(2);[0,1].forEach(pi=>U.act(pi).pos.set(pi?2:-2,0,1.5));
const r=PLAYC('показка паутинки',300);ZC.tick(30);[r,'floorFoes='+K.floorFoes.started,'stage='+F().stage]
//@@
// веретено удирает: оба на чердаке
const K=K15();K.floorFoes.list.forEach(e=>{e.alive=false;if(e.g)e.g.visible=false;});F().cut=true;
[0,1].forEach(pi=>{const h=U.act(pi);h.pos.set(pi?-3:-5,7.2,-31.5);h.vel.set(0,0,0);});ZC.tick(20);
PLAYC('веретено',300)
//@@
// Веретенник: на повить — ролик входа сам
ZC.W.warp15('boss');ZC.tick(2);
PLAYC('Веретенник',300)
//@@
const B=K15().B;B.e.onFinisher(U.act(0));PLAYC('этап 2',200)
//@@ shot=k15cine_finale.png
const B=K15().B;B.mode='free';B.e.onFinisher(U.act(0));PLAYC('финал',200)
//@@
ZC.tick(240);if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));
if(ZC.W.levelId==='1-5'&&!F().out)throw new Error('FAIL: уровень не завершён после финала');
if(CBAD.length)throw new Error('FAIL '+CBAD.slice(0,6).join(' | '));
'k15cine ok · '+CREP.filter(s=>/шотов/.test(s)).length+' роликов, реплик проверено '+CREP.filter(s=>/лицо/.test(s)).length+' · '+CREP.join(' ; ')
