//@@ wait=1500
// @timeout=900
// релиз final06: Лукоморье, первый приход — ролик прибытия после пролога (late_96d_luko_arrive.js). Ролик целиком, без пропуска:
// поставлен вручную (def.kino), ≥ 3 крупностей и ≥ 2 типов движения камеры; в середине каждой реплики героя или Кота говорящий в кадре
// и повёрнут к камере; Кот в начале каменный, после пробуждения — живой; после ролика: stage free, G.links=1, обрывок цепи на дубе,
// кольцо-маяк у стана, Звенышко ведёт к стану (впереди героев, ближе к морю); у кольца прыжок раскатывает рушник — маяк гаснет.
// Пропуск ролика даёт то же состояние. Кадры: Кот-камень, Кот проснулся, кран к стану.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(false);ZC.startFrom(ZC.LV('luko'));ZC.G.manual=true;ZC.tick(3);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
const CI=ZC.FIN.cine,ACT=ZC.FIN.actors,V=THREE.Vector3;window.CREP=[];window.CBAD=[];window.CHK={t0:{},done:{}};
// реплика: в середине — говорящий в кадре и лицом к камере (скалярное «вперёд»·«на камеру» > −0,1)
window.SPK=(cd)=>{const S=ACT.speaker;if(!S||!S.who||S.who==='zven'||S.until<ZC.G.time)return;const k=S.who+'@'+S.until.toFixed(2);if(CHK.done[k])return;
  if(!CHK.t0[k])CHK.t0[k]=ZC.G.time;if(ZC.G.time<CHK.t0[k]+(S.until-CHK.t0[k])*0.5)return;CHK.done[k]=1;const L=CI.locate(S.who);if(!L)return;
  const H=L.head(),P=cd.pose,dir=new V().subVectors(P.look,P.pos).normalize(),to=new V().subVectors(H,P.pos),d=to.length();to.normalize();
  const ang=Math.acos(Math.max(-1,Math.min(1,dir.dot(to))))*180/Math.PI,half=Math.atan(Math.tan(P.fov*Math.PI/360)*16/9)*180/Math.PI;
  let fw=null;if(L.hero){const r=L.obj.g.rotation.y;fw=new V(Math.sin(r),0,Math.cos(r));}else if(L.obj&&L.obj.o&&L.obj.o.g){const q=new THREE.Quaternion();L.obj.o.g.getWorldQuaternion(q);fw=new V(0,0,1).applyQuaternion(q).setY(0).normalize();}
  const back=fw?fw.dot(new V(P.pos.x-H.x,0,P.pos.z-H.z).normalize()):1;const rec=S.who+' '+ang.toFixed(0)+'°/'+half.toFixed(0)+'° d='+d.toFixed(1)+' лицо='+back.toFixed(2);CREP.push(rec);
  if(ang>half*0.95||back<-0.1)CBAD.push(rec);};
const W=ZC.W,cd=CI.CD();if(!ZC.G.cine||!cd)throw new Error('ролик не начался: '+W.flags.mode+' '+W.flags.stage);
if(W.flags.mode!=='first')throw new Error('не первый приход: '+W.flags.mode);if(!cd.def.kino)throw new Error('ролик не под ручной постановкой (kino)');
window.SZ=new Set(cd.shots.map(s=>s.size));window.MV=new Set(cd.shots.map(s=>s.p2?'spline':s.trk?'track':s.move));
// до пробуждения — каменный Кот
let c=0;while(ZC.G.cine&&ZC.G.cine.t<7.6&&c<3000){ZC.tick(1);c++;SPK(CI.CD());}
const A=ZC.FIN.lukoArrive();if(A.stone!==0)throw new Error('Кот не каменный: '+JSON.stringify(A));if(!A.frag)throw new Error('нет обрывка цепи');'камень '+ZC.G.cine.t.toFixed(1)
//@@ shot=lukoarrive_stone.png
ZC.tick(1);
//@@
let c=0;while(ZC.G.cine&&ZC.G.cine.t<11.2&&c<3000){ZC.tick(1);c++;SPK(CI.CD());}
const A=ZC.FIN.lukoArrive();if(A.stone!==null)throw new Error('Кот не ожил: '+JSON.stringify(A));'ожил '+ZC.G.cine.t.toFixed(1)
//@@ shot=lukoarrive_awake.png
ZC.tick(1);
//@@
let c=0;while(ZC.G.cine&&ZC.G.cine.t<24.4&&c<3000){ZC.tick(1);c++;SPK(CI.CD());}'кран '+ZC.G.cine.t.toFixed(1)
//@@ shot=lukoarrive_stan.png
ZC.tick(1);
//@@
let c=0;while(ZC.G.cine&&c<1200){ZC.tick(1);c++;const n=CI.CD();if(n)SPK(n);}ZC.tick(20);
const W=ZC.W,F=W.flags,A=ZC.FIN.lukoArrive(),Z=W.zven,r='стадия='+F.stage+' звенья='+ZC.G.links+' '+JSON.stringify(A)+' Звенышко='+Z.mode;
if(SZ.size<3||MV.size<2)CBAD.push('мало разнообразия: крупн='+[...SZ].join('/')+' движ='+[...MV].join('/'));
if(F.stage!=='free'||ZC.G.links!==1||!A.frag||!A.beacon||A.stone!==null||!A.lead||Z.mode!=='lead')throw new Error('после ролика: '+r);
const kot=W.kot;if(kot.lids[0].rotation.x>0)throw new Error('Кот с закрытыми глазами: '+kot.lids[0].rotation.x.toFixed(2));
// Звенышко ведёт: впереди героев, ближе к морю
ZC.tick(150);const a=U.hero(0),b=U.hero(1),mz=(a.pos.z+b.pos.z)/2;if(!(Z.pos.z<mz-2))throw new Error('Звенышко не ведёт к стану: z='+Z.pos.z.toFixed(1)+' герои z='+mz.toFixed(1));
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));if(CBAD.length)throw new Error('FAIL '+CBAD.slice(0,6).join(' | '));
r+' · крупн='+[...SZ].join('/')+' движ='+[...MV].join('/')+' · '+CREP.join(' ; ')
//@@
const dz=ZC.W.shoreDZ||0,r=[U.walkTo(0,-1.2,-18.6-dz,8),U.walkTo(1,1.2,-18.6-dz,8)];ZC.tick(30);r.join(' ')
//@@
U.tap('Space');ZC.tick(20);const F=ZC.W.flags,A=ZC.FIN.lukoArrive();if(!F.rushnik)throw new Error('рушник не раскатан у кольца');if(A.beacon)throw new Error('маяк не погас');
'рушник: cine='+!!ZC.G.cine
//@@
// пропуск ролика — то же состояние
ZC.startFrom(ZC.LV('luko'));ZC.tick(3);if(!ZC.G.cine)throw new Error('ролик не начался (2)');ZC.tick(30);ZC.skip();ZC.tick(30);
const W=ZC.W,F=W.flags,A=ZC.FIN.lukoArrive();const r='стадия='+F.stage+' звенья='+ZC.G.links+' '+JSON.stringify(A)+' Звенышко='+W.zven.mode;
if(F.stage!=='free'||ZC.G.links!==1||!A.frag||!A.beacon||A.stone!==null||!A.lead||W.zven.mode!=='lead')throw new Error('после пропуска: '+r);
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'пропуск ok · '+r
