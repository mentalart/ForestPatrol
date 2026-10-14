//@@ wait=1500
// @timeout=1500
// релиз final06: 2-1 «Гусли Садко» — спящий Китеж за воротами (late_99e_k21_p3k_kitezh.js). Вдвоём настоящими нажатиями:
// ролик у ворот «Китеж спит» → слобода: два горожанина (гусли у ракушки — проснулся, нотка к Сонным воротам), дед и бабка — разом →
// ворота поднялись → колодец у звонницы: прилив поднимает на площадку → ролик «Колокол без языка» (Садко на осетре, Водяной, Рыба-кит) → уровень пройден.
// Оба ролика — под ручной режиссурой (def.kino): ≥ 3 крупностей, ≥ 2 типов движения камеры, говорящий в кадре и лицом к камере.
// Потом одиночка: дед и бабка — сыграл у деда, сменил героя (оставленный доигрывает), сыграл у бабки — проснулись оба.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(false);ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(3);U.nocine();const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
const CI=ZC.FIN.cine,ACT=ZC.FIN.actors,V=THREE.Vector3;window.CREP=[];window.CBAD=[];window.CHK={t0:{},done:{}};
// реплика: в середине — говорящий в кадре и лицом к камере
window.SPK=(cd)=>{const S=ACT.speaker;if(!S||!S.who||S.who==='zven'||S.until<ZC.G.time)return;const k=S.who+'@'+S.until.toFixed(2);if(CHK.done[k])return;
  if(!CHK.t0[k])CHK.t0[k]=ZC.G.time;if(ZC.G.time<CHK.t0[k]+(S.until-CHK.t0[k])*0.5)return;CHK.done[k]=1;const L=CI.locate(S.who);if(!L){CBAD.push('нет в кадре: '+S.who);return;}
  const H=L.head(),P=cd.pose,dir=new V().subVectors(P.look,P.pos).normalize(),to=new V().subVectors(H,P.pos),d=to.length();to.normalize();
  const ang=Math.acos(Math.max(-1,Math.min(1,dir.dot(to))))*180/Math.PI,half=Math.atan(Math.tan(P.fov*Math.PI/360)*16/9)*180/Math.PI;
  let fw=null;if(L.hero){const r=L.obj.g.rotation.y;fw=new V(Math.sin(r),0,Math.cos(r));}else if(L.obj&&L.obj.o&&L.obj.o.g){const q=new THREE.Quaternion();L.obj.o.g.getWorldQuaternion(q);fw=new V(0,0,1).applyQuaternion(q).setY(0).normalize();}
  const back=fw?fw.dot(new V(P.pos.x-H.x,0,P.pos.z-H.z).normalize()):1;const rec=S.who+' '+ang.toFixed(0)+'°/'+half.toFixed(0)+'° d='+d.toFixed(1)+' лицо='+back.toFixed(2);CREP.push(rec);
  if(ang>half*0.95||back<-0.1)CBAD.push(cd.def.dur+'с: '+rec);};
window.PLAYC=(name,maxT)=>{let n=0;while(!ZC.G.cine&&n<(maxT||600)){ZC.tick(1);n++;}if(!ZC.G.cine)throw new Error(name+': ролик не начался '+U.st());const cd=CI.CD();
  if(!cd||!cd.def.kino)throw new Error(name+': ролик не под режиссурой kino');const sizes=new Set(cd.shots.map(s=>s.size)),moves=new Set(cd.shots.map(s=>s.p2?'spline':s.trk?'track':s.move));
  let c=0;while(ZC.G.cine&&c<60*60){ZC.tick(1);c++;const now=CI.CD();if(now)SPK(now);}
  const r=name+' '+cd.def.dur+'с шотов='+cd.shots.length+' крупн='+[...sizes].join('/')+' движ='+[...moves].join('/');if(sizes.size<3||moves.size<2)CBAD.push('мало разнообразия: '+r);CREP.push(r);return r;};
window.PLAY=(pi,x,z)=>{if(U.act(pi).pos.z>-356)U.goto(pi,pi?1.2:-1.2,-358,8,0.5);const g=U.goto(pi,x,z,10,0.4);ZC.press(U.K[pi].i);ZC.tick(4);return g;};   // сквозь арку — между столбами
const D=ZC.W.warp21('gate');ZC.tick(10);D.F.hermitWon+' '+U.st()
//@@
// к арке — ролик «Китеж спит»
for(let i=0;i<8*60&&!ZC.G.cine;i++){U.step(0,-0.9,-351,0.3);U.step(1,0.9,-351,0.3);ZC.tick(1);}U.rel(0);U.rel(1);
const r=PLAYC('ворота',60);if(!ZC.W.flags.gateSeen)throw new Error('нет флага gateSeen');if(ZC.W.flags.out)throw new Error('уровень кончился у ворот — а город?');r
//@@ shot=k21city_sloboda.png wait=200
// слобода: два горожанина — по одному на игрока
const K=ZC.W.dbg21k(),S=K.SLP;const r=[PLAY(0,S[0].sh.x,S[0].sh.z+0.5),PLAY(1,S[1].sh.x,S[1].sh.z+0.5)];ZC.tick(150);
if(!S[0].woke||!S[1].woke)throw new Error('горожане не проснулись: '+S.map(q=>q.woke).join(','));
if(ZC.W.flags.woke!==2)throw new Error('woke='+ZC.W.flags.woke);r.join(' ')+' lamps='+K.SLAMP.map(L=>L.lit).join('')
//@@
// дед и бабка: один сыграл — спят; оба разом — проснулись; ворота поднялись
const K=ZC.W.dbg21k(),S=K.SLP;const a=PLAY(0,S[2].sh.x,S[2].sh.z+0.5);ZC.tick(30);if(S[2].woke)throw new Error('дед проснулся один');
const b=PLAY(1,S[3].sh.x,S[3].sh.z+0.5);ZC.tick(240);if(!S[2].woke||!S[3].woke)throw new Error('дед и бабка не проснулись: '+S[2].woke+','+S[3].woke);
if(!ZC.W.flags.sleepGate||K.sgateCol.on)throw new Error('Сонные ворота не поднялись');a+' '+b+' '+U.obj()
//@@ shot=k21city_tower.png wait=200
// звонница: в колодец, прилив, на площадку — ролик
const K=ZC.W.dbg21k(),T=K.twz;const r=[U.goto(0,0,-409.5,14,0.4),U.goto(1,1.2,-409.5,14,0.4)];ZC.press(U.K[0].i);ZC.tick(200);
if(T.state!=='high')throw new Error('колодец не наполнился: '+T.state+' '+U.st());const y=U.act(0).pos.y;
r.push('y='+y.toFixed(2));for(let i=0;i<6*60&&!ZC.G.cine;i++){U.step(0,0,-416.5,0.3);ZC.tick(1);}U.rel(0);if(!ZC.G.cine)throw new Error('нет ролика на звоннице: '+U.st());r.join(' ')
//@@ shot=k21city_sadko.png
const r=PLAYC('звонница',30);ZC.tick(60);r+' lvl='+ZC.W.levelId+' out='+!!ZC.W.flags.out+' links='+ZC.W.links
//@@
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));if(CBAD.length)throw new Error('FAIL '+CBAD.slice(0,6).join(' | '));
if(!(ZC.G.done&&ZC.G.done['2-1']))throw new Error('2-1 не отмечен пройденным');'duo ok · реплик проверено '+CREP.filter(s=>/лицо/.test(s)).length
//@@
// одиночка: дед и бабка — сыграл, сменил героя (оставленный доигрывает), сыграл у второго
ZC.setSolo(true);ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(3);U.nocine();const D=ZC.W.warp21('city');ZC.tick(10);const K=ZC.W.dbg21k(),S=K.SLP;
if(ZC.W.flags.sleepGate||S.some(q=>q.woke))throw new Error('warp city: город уже проснулся');
// двое одиночных горожан — сразу (проверены вдвоём выше)
K.wake(S[0],true);K.wake(S[1],true);
U.toKind('pelageya');const held=U.playHold(0,S[2].sh,[S[2].sh.x,S[2].sh.z+0.5]);ZC.tick(20);if(S[2].woke)throw new Error('дед проснулся один (solo)');
const g=U.goto(0,S[3].sh.x,S[3].sh.z+0.5,12,0.4);ZC.press(U.K[0].i);ZC.tick(240);
if(!S[2].woke||!S[3].woke)throw new Error('solo: не проснулись held='+held+' '+g+' '+U.st());if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));
'solo pair ok held='+held+' '+g
