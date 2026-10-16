//@@ wait=1500
// @timeout=1200
// релиз final06: 1-Б «Леший-Путаник» — вступление «Тише, Леший спит!» (late_99zdh_k1b_intro.js): ручная постановка 31,5 с, 11 планов — герои крадутся,
// блеск в дупле, Йоша чихает, Леший просыпается и растёт, знакомит с руками «Сгрёб» и «Хлоп» (руки поднимаются из земли и бьют — Пелагея и Йоша
// кувырком, Прошка щитом), «Раз, два, три — начинаем!». Ролик целиком без пропуска: kino, ≥ 3 крупностей и ≥ 2 типов движения камеры, говорящий
// в кадре лицом к камере в середине реплики, голос у каждой строки, всё показано; после — этап 1, руки дома в обычном состоянии, герои в строю,
// Леший в полный рост. Второй прогон — с пропуском: то же состояние. Урок 1 — после ролика, как раньше (здесь выключен). Кадр на каждый план.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.V=ZC.FIN.vox;V.audio();ZC.players.forEach(p=>{p.path='mid';});ZC.startFrom(ZC.LV('1-B'));ZC.G.manual=true;ZC.tick(2);
window.K=ZC.FIN.k1b;window.CI=ZC.FIN.cine;window.ACT=ZC.FIN.actors;window.C=ZC.G.cine;window.cd=CI.CD();
if(!C||!K.intro.on)throw new Error('вступление не началось');if(!cd.def.kino)throw new Error('вступление не под ручной постановкой');
window.heard=[];window.lastV=null;window.CREP=[];window.CBAD=[];window.CHK={t0:{},done:{}};const Vc=THREE.Vector3;
// реплика: в середине — говорящий в кадре и лицом к камере (как в tfin_sky31cine)
window.SPK=(cd)=>{const S=ACT.speaker;if(!S||!S.who||S.until<ZC.G.time)return;const k=S.who+'@'+S.until.toFixed(2);if(CHK.done[k])return;
  if(!CHK.t0[k])CHK.t0[k]=ZC.G.time;if(ZC.G.time<CHK.t0[k]+(S.until-CHK.t0[k])*0.5)return;CHK.done[k]=1;const L=CI.locate(S.who);if(!L)return;
  const H=L.head(),P=cd.pose,dir=new Vc().subVectors(P.look,P.pos).normalize(),to=new Vc().subVectors(H,P.pos),d=to.length();to.normalize();
  const ang=Math.acos(Math.max(-1,Math.min(1,dir.dot(to))))*180/Math.PI,half=Math.atan(Math.tan(P.fov*Math.PI/360)*16/9)*180/Math.PI;
  let fw=null;if(L.hero){const r=L.obj.g.rotation.y;fw=new Vc(Math.sin(r),0,Math.cos(r));}else if(L.obj&&L.obj.o&&L.obj.o.g){const q=new THREE.Quaternion();L.obj.o.g.getWorldQuaternion(q);fw=new Vc(0,0,1).applyQuaternion(q).setY(0).normalize();}
  const back=fw?fw.dot(new Vc(P.pos.x-H.x,0,P.pos.z-H.z).normalize()):1;const rec=S.who+' '+ang.toFixed(0)+'°/'+half.toFixed(0)+'° d='+d.toFixed(1)+' лицо='+back.toFixed(2);CREP.push(rec);
  if(ang>half*0.95||back<-0.1)CBAD.push(C.t.toFixed(1)+'с: '+rec);};
window.toT=t=>{let k=0;while(ZC.G.cine===C&&C.t<t&&k<60*40){ZC.tick(1);const v=V.cur;if(v&&v!==lastV)heard.push(v);lastV=v;const now=CI.CD();if(now)SPK(now);k++;}return C.t.toFixed(1);};
const sizes=new Set(cd.shots.map(s=>s.size)),moves=new Set(cd.shots.map(s=>s.p2?'spline':s.trk?'track':s.move));
if(sizes.size<3||moves.size<2)throw new Error('мало разнообразия: крупн='+[...sizes].join('/')+' движ='+[...moves].join('/'));
'вступление: dur='+C.dur+' шотов='+cd.shots.length+' крупн='+[...sizes].join('/')+' движ='+[...moves].join('/')
//@@ shot=k1bin_01.png
toT(1.6)
//@@ shot=k1bin_02.png
toT(5.2)
//@@ shot=k1bin_03.png
toT(6.8)
//@@ shot=k1bin_04.png
toT(8.4)
//@@ shot=k1bin_05.png
toT(11.75)
//@@ shot=k1bin_06.png
toT(14.5)
//@@ shot=k1bin_07.png
toT(17.4)
//@@ shot=k1bin_08.png
toT(20.0)
//@@ shot=k1bin_09.png
toT(22.95)
//@@ shot=k1bin_10.png
toT(25.15)
//@@ shot=k1bin_11.png
toT(29.0)
//@@
const st=Object.assign({},K.intro.st);toT(60);let n=0;while(n<60*3&&(ZC.G.cine||!ZC.W.flags.phase)){ZC.tick(1);n++;}
const want=['1-B_i01','1-B_i02','1-B_i03','1-B_i04','1-B_i05','1-B_i06','1-B_i07','1-B_i08','1-B_i09','1-B_i10'],miss=want.filter(i=>!heard.includes(i));
if(miss.length)throw new Error('не прозвучали: '+miss.join(',')+' | слышно '+heard.join(','));
for(const k of['glint','sneeze','wake','red','yellow','roll','shield'])if(!st[k])throw new Error('не показано: '+k+' '+JSON.stringify(st));
if(CBAD.length)throw new Error('говорящий не в кадре: '+CBAD.join(' | ')+' || '+CREP.join(' | '));
window.state=()=>{const W=ZC.W,H=ZC.HERO,hs=W.enemies.filter(e=>e.kind==='hand'&&e.alive);
  return {ph:W.flags.phase,cine:!!ZC.G.cine,demo:!!K.intro.D,hands:hs.map(e=>e.side+':'+e.state+'@'+e.pos.x.toFixed(1)+','+e.pos.z.toFixed(1)).sort().join(' '),
    heroes:['potap','proshka','pelageya','yosha'].map(k=>H[k].pos.x.toFixed(1)+','+H[k].pos.z.toFixed(1)).join(' '),sc:K.cur.L.g.scale.x.toFixed(2),ysc:H.yosha.g.scale.y.toFixed(2),on:K.intro.on};};
window.S1=state();if(S1.ph!==1||S1.cine||S1.on||S1.sc!=='2.20'||S1.ysc!=='1.00')throw new Error('после ролика: '+JSON.stringify(S1));
if(S1.hands!=='-1:idle@-4.0,-17.0 1:idle@4.0,-17.0')throw new Error('руки после ролика: '+S1.hands);
if(window._errs.length)throw new Error('ошибки: '+window._errs[0]);
'целиком ok · голоса '+heard.filter(i=>i.startsWith('1-B')).join(' ')+' · '+JSON.stringify(S1)+' · '+CREP.slice(0,12).join(' | ')
//@@
ZC.startFrom(ZC.LV('1-B'));ZC.G.manual=true;ZC.tick(2);ZC.tick(60*6);ZC.skip();let m=0;while(m<60*3&&(ZC.G.cine||!ZC.W.flags.phase)){ZC.tick(1);m++;}
const S2=state();if(S2.ph!==1||S2.cine||S2.on||S2.hands!==S1.hands||S2.heroes!==S1.heroes||S2.sc!==S1.sc||S2.ysc!=='1.00')throw new Error('пропуск даёт другое: '+JSON.stringify(S2)+' против '+JSON.stringify(S1));
ZC.tick(60*4);if(window._errs.length)throw new Error('ошибки: '+window._errs[0]);
'пропуск ok · '+JSON.stringify(S2)
