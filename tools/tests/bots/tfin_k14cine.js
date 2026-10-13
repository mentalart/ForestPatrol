//@@ wait=1500
// @timeout=1200
// релиз final06: 1-4 «Леший водит» — ролики в ручной постановке (late_99zx_k14_kino.js, def.kino): «Шапки из мха» (13,8 с: шапки
// каждому в свой план, Прошка бросает свою на пень, за его спиной крадётся ёлка), «Пелагею увели» (25,5 с поверх хоровода late_99b:
// Леший хохочет из-за кольца, Йоша корит Прошку, шапка на нос), Аука — знакомство (12,2 с) и дружба (13,6 с). Все играются целиком.
// Проверки: ролик под def.kino, ≥ 3 крупностей и ≥ 2 типов движения камеры; в середине каждой реплики героя, Лешего или Ауки говорящий
// в кадре и повёрнут к камере; после роликов — прежнее состояние уровня (этап, взгляд, шапки, кольцо, ворота, вырез late_88); ошибок нет.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=777;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
ZC.setSolo(false);ZC.startFrom(ZC.LV('1-4'));ZC.G.manual=true;ZC.tick(2);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
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
PLAYC('Шапки',13.8,10.3)
//@@ shot=k14c_hats_throw.png
// Прошка крупно: шапка летит на пень
'бросок t='+ZC.G.cine.t.toFixed(1)
//@@
let n=0;while(ZC.G.cine&&ZC.G.cine.t<12.7&&n<600){ZC.tick(1);n++;const now=ZC.FIN.cine.CD();if(now)SPK(now);}'ёлка t='+ZC.G.cine.t.toFixed(1)
//@@ shot=k14c_hats_fir.png
// за спиной Прошки ёлка с глазами замерла на полушаге
'кадр ёлки'
//@@
GOON();ZC.tick(10);const W=ZC.W,F=W.flags,H=ZC.HERO;
if(F.stage!=='walk'||!W.gaze)throw new Error('после шапок не ходьба со взглядом: '+F.stage+' gaze='+W.gaze);
if(!['potap','pelageya','yosha'].every(k=>H[k].hatOn==='in')||H.proshka.hatOn)throw new Error('шапки не те: '+['potap','pelageya','yosha','proshka'].map(k=>H[k].hatOn).join(','));
if(!ZC.FIN.occ.on)throw new Error('вырез late_88 не вернулся после шапок');
const eyes=[];W.group.traverse(o=>{if(o.isMesh&&o.material&&o.material.type==='MeshLambertMaterial'&&o.material.color&&o.material.color.getHex()===0xfff3a0&&o.parent&&o.parent.parent===W.group&&o.parent.userData.noBatch)eyes.push(o);});
if(eyes.length)throw new Error('ёлка ролика не убрана');'шапки ok '+F.stage
//@@
// похищение: Прошка на тропе у изгороди
U.act(0).pos.set(-2,0,-23.7);PLAYC('Пелагею увели',25.5,14.0)
//@@ shot=k14c_kid_leshy.png
// Леший встал из-за кольца и хохочет; Пелагея снизу глядит на него
const cd=ZC.FIN.cine.CD(),P=cd.pose,K=ZC.FIN.k14Dbg(),sh=K.c.shade,h=sh.head.getWorldPosition(new THREE.Vector3());'t='+ZC.G.cine.t.toFixed(1)+' голова Лешего '+[h.x,h.y,h.z].map(v=>v.toFixed(1))+' кам '+[P.pos.x,P.pos.y,P.pos.z].map(v=>v.toFixed(1))+' взгляд '+[P.look.x,P.look.y,P.look.z].map(v=>v.toFixed(1))
//@@
let n=0;while(ZC.G.cine&&ZC.G.cine.t<22.7&&n<900){ZC.tick(1);n++;const now=ZC.FIN.cine.CD();if(now)SPK(now);}'нос t='+ZC.G.cine.t.toFixed(1)
//@@ shot=k14c_kid_nose.png
// у пня: шапка Прошке на нос
'кадр шапки'
//@@
GOON();ZC.tick(10);const W=ZC.W,F=W.flags,pe=ZC.HERO.pelageya,pr=ZC.HERO.proshka;
if(F.stage!=='rescue'||!pe.inRing||pr.hatOn!=='nose')throw new Error('после похищения не то: '+F.stage+' inRing='+pe.inRing+' hat='+pr.hatOn);
if(Math.hypot(pr.pos.x-0.5,pr.pos.z+0.1)>0.3)throw new Error('Прошка не у пня');const rc=W.cyls.filter(c=>Math.abs(c.r-0.72)<1e-6&&c.on).length;if(rc!==8)throw new Error('коллизии кольца не включены: '+rc);if(!ZC.FIN.occ.on)throw new Error('вырез late_88 не вернулся после похищения');
'похищение ok '+F.stage
//@@
// Аука: знакомство (к поляне дупел — как в tfin_auka14)
ZC.FIN.warp('arena');ZC.tick(10);U.goto(0,0,-196,5);PLAYC('Аука-знакомство',12.2,6.0)
//@@ shot=k14c_auka_sigh.png
// Аука крупно: «Никто со мной не аукается…» — уши поникли
'вздох t='+ZC.G.cine.t.toFixed(1)
//@@
GOON();ZC.tick(10);const A=ZC.W.k14.auka;if(A.ph!==1)throw new Error('после знакомства не игра: ph='+A.ph);
// песенка — сразу последняя и короткая: одно верное «ау» → дружба
let n=0;while(A.st!=='play'&&n<60*20){ZC.tick(1);n++;}A.r=2;A.need=A.pos+1;const q=A.dbg().HL[A.seq[A.pos]];for(let k=0;k<600&&!U.step(0,q.mx,q.mz,0.5);k++)ZC.tick(1);U.rel(0);ZC.tick(2);ZC.press('Digit1');ZC.tick(6);
PLAYC('Аука-дружба',13.6,12.6)
//@@ shot=k14c_auka_gate.png
// через плечо Ауки: ворота открываются
'ворота t='+ZC.G.cine.t.toFixed(1)
//@@
GOON();ZC.tick(20);const A=ZC.W.k14.auka,K=ZC.W.k14;
if(A.ph!==4||!K.arena.cleared||!A.friend)throw new Error('после дружбы не то: ph='+A.ph+' cleared='+K.arena.cleared);
if(Math.abs(A.g.scale.y-1)>1e-6)throw new Error('Аука не вернулся к своему размеру');
ZC.tick(30);if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));
if(CBAD.length)throw new Error('FAIL '+CBAD.slice(0,6).join(' | '));
'k14cine ok · '+CREP.filter(s=>/шотов/.test(s)).join(' · ')+' · реплик проверено '+CREP.filter(s=>/лицо|не найден/.test(s)).length+': '+CREP.filter(s=>/лицо|не найден/.test(s)).join(', ')
