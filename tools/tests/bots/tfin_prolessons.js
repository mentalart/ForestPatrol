//@@ wait=1500
// @timeout=1500
// релиз final06: пролог — ролики-уроки (late_96h_prolog_lessons.js): «Прыжок» у трещины, «Двое героев» на развилке, «Ко мне!» у лесенки,
// «Бой с мороком» на поляне. Ролики играются целиком (без пропуска); проверки: ручная постановка (def.kino), не меньше 3 крупностей
// и 2 типов движения камеры; в середине реплики героя говорящий в кадре и лицом к камере; после ролика — карточка урока (#finTut);
// позиции героев возвращены (кроме «Ко мне!»: Потап поднялся к Прошке и идёт следом); второму пути «Ко мне!» — только карточка;
// мороки поляны появляются в конце ролика боя и распутываются; повтор урока из паузы с пропуском возвращает всё как было; ошибок нет.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(false);ZC.startFrom(ZC.LV('p'));ZC.G.manual=true;ZC.G.flags.proLessons=true;ZC.tick(30);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
const CI=ZC.FIN.cine,ACT=ZC.FIN.actors,V=THREE.Vector3;window.CREP=[];window.CBAD=[];window.CHK={t0:{},done:{}};
window.SPK=(cd)=>{const S=ACT.speaker;if(!S||!S.who||S.who==='zven'||S.until<ZC.G.time)return;const k=S.who+'@'+S.until.toFixed(2);if(CHK.done[k])return;
  if(!CHK.t0[k])CHK.t0[k]=ZC.G.time;if(ZC.G.time<CHK.t0[k]+(S.until-CHK.t0[k])*0.5)return;CHK.done[k]=1;const L=CI.locate(S.who);if(!L)return;
  const H=L.head(),P=cd.pose,dir=new V().subVectors(P.look,P.pos).normalize(),to=new V().subVectors(H,P.pos),d=to.length();to.normalize();
  const ang=Math.acos(Math.max(-1,Math.min(1,dir.dot(to))))*180/Math.PI,half=Math.atan(Math.tan(P.fov*Math.PI/360)*16/9)*180/Math.PI;
  let fw=null;if(L.hero){const r=L.obj.g.rotation.y;fw=new V(Math.sin(r),0,Math.cos(r));}
  const back=fw?fw.dot(new V(P.pos.x-H.x,0,P.pos.z-H.z).normalize()):1;const rec=S.who+' '+ang.toFixed(0)+'°/'+half.toFixed(0)+'° d='+d.toFixed(1)+' лицо='+back.toFixed(2);CREP.push(rec);
  if(ang>half*0.95||back<-0.1)CBAD.push(cd.def.dur+'с: '+rec);};
window.PLAYC=(name,maxT)=>{let n=0;while(!ZC.G.cine&&n<(maxT||600)){ZC.tick(1);n++;}if(!ZC.G.cine)throw new Error(name+': ролик не начался '+U.st());const cd=CI.CD();
  if(!cd||!cd.def.kino)throw new Error(name+': ролик не под ручной постановкой (kino)');const sizes=new Set(cd.shots.map(s=>s.size)),moves=new Set(cd.shots.map(s=>s.p2?'spline':s.trk?'track':s.move));
  let c=0;while(ZC.G.cine&&c<60*60){ZC.tick(1);c++;const now=CI.CD();if(now)SPK(now);}
  const r=name+' '+cd.def.dur+'с шотов='+cd.shots.length+' крупн='+[...sizes].join('/')+' движ='+[...moves].join('/');if(sizes.size<3||moves.size<2)CBAD.push('мало разнообразия: '+r);CREP.push(r);return r;};
window.HS=()=>['proshka','potap','pelageya','yosha'].map(k=>ZC.HERO[k]);
window.POS=()=>HS().map(h=>h.pos.clone());
window.SAME=(a,name)=>{const b=POS();a.forEach((p,i)=>{if(p.distanceTo(b[i])>0.3)CBAD.push(name+': герой '+HS()[i].kind+' не на месте '+p.z.toFixed(1)+'→'+b[i].z.toFixed(1));});};
window.CARD=(n,name)=>{const L=ZC.FIN.proLes;ZC.tick(3);const el=document.getElementById('finTut');if(L.card!==n||!el||!el.classList.contains('on'))CBAD.push(name+': нет карточки урока '+n+' (card='+L.card+')');};
// комната → «Колыбельная» (пропуск) → погоня
const H=ZC.HERO;U.act(0).pos.set(-2,0,1.4);U.act(1).pos.set(2.2,0,1.4);U.until(()=>ZC.G.cine,4);ZC.skip();ZC.tick(30);
if(ZC.W.flags.stage!=='chase')throw new Error('нет погони: '+ZC.W.flags.stage);ZC.W.flags.stage
//@@
// 1. Прыжок — у трещины
const C=ZC.FIN.proLes.ctx;U.act(0).pos.set(-0.6,0.05,C.CRK0+5);U.act(1).pos.set(0.8,0.05,C.CRK0+6);ZC.tick(10);window.P0=null;
for(let i=0;i<300&&!ZC.G.cine;i++){U.step(0,-0.6,C.CRK0+2.2);window.P0=POS();ZC.tick(1);}U.rel(0);
const r=PLAYC('прыжок',60);if(window.P0)SAME(window.P0,'прыжок');CARD(1,'прыжок');r
//@@ shot=prolessons_jump.png
// 2. Двое героев — оба перепрыгнули (ставим на тот берег), один на развилке
const C=ZC.FIN.proLes.ctx;U.act(0).pos.set(-1,0.05,C.CRK1-0.8);U.act(1).pos.set(1,0.05,C.CRK1-0.8);ZC.tick(20);
const JH=C.JH;if(!JH.done[0]||!JH.done[1])throw new Error('прыжок не засчитан '+JSON.stringify(JH.done));
U.act(0).pos.set(-1.5,0.05,-19.2);window.P1=POS();ZC.tick(2);const r=PLAYC('двое',120);SAME(window.P1,'двое');CARD(2,'двое');r
//@@
// 3. «Ко мне!» — Прошка на уступе жмёт кнопку лесенки, Потап внизу
U.toKind('proshka',0);const H=ZC.HERO;H.potap.pos.set(-4,0.05,-20);H.proshka.pos.set(-6.9,2.0,-27.6);ZC.tick(30);
if(!ZC.W.flags.ladder)throw new Error('лесенка не упала '+U.st());const r=PLAYC('ко мне',400);
if(!(H.potap.pos.y>1.5&&H.potap.pos.z<-24.5))CBAD.push('Потап не поднялся к Прошке: '+U.st());if(!H.potap.following)CBAD.push('Потап не идёт следом');
CARD(3,'ко мне');r+' · '+U.st()
//@@ shot=prolessons_call.png
// второй путь: Пелагея у засохшего корня, Йоша далеко — ролика нет, только карточка
const H=ZC.HERO,L=ZC.FIN.proLes;ZC.tick(500);U.toKind('pelageya',1);H.pelageya.pos.set(5.0,0.05,-39.0);H.yosha.pos.set(6.6,0.05,-31.2);ZC.tick(20);
if(ZC.G.cine)CBAD.push('второй ролик «Ко мне!»');if(!L.other3||L.card!==3)CBAD.push('второму пути нет карточки «Ко мне!» card='+L.card);ZC.tick(500);'other3='+L.other3
//@@
// 4. Бой с мороком — оба на поляну
const H=ZC.HERO;for(const h of HS())h.following=false;U.act(0).pos.set(-1,0.05,-78.5);U.act(1).pos.set(1,0.05,-78.5);H.potap.pos.set(-2.5,0.05,-77);H.yosha.pos.set(2.5,0.05,-77);ZC.tick(5);
U.act(0).pos.set(-1,0.05,-80);U.act(1).pos.set(1,0.05,-80);window.P4=POS();if(ZC.G.cine)throw new Error('ролик боя раньше времени');
const r=PLAYC('бой',200);SAME(window.P4,'бой');const al=ZC.W.enemies.filter(e=>e.alive&&e.kind==='morok');
if(al.length!==2)CBAD.push('мороков поляны после ролика: '+al.length);CARD(4,'бой');r
//@@ shot=prolessons_fight.png
const res=U.brawl(40);if(ZC.W.flags.stage!=='hollow')CBAD.push('поляна не распутана: '+res+' stage='+ZC.W.flags.stage);res
//@@
// повтор последнего урока из паузы и пропуск — всё как было
ZC.tick(200);const L=ZC.FIN.lesson,P=POS(),n=ZC.W.enemies.length;if(!L.has())throw new Error('нет «Показать урок ещё раз»');L.again();ZC.tick(70);if(!ZC.G.cine)throw new Error('повтор не начался');
ZC.skip();ZC.tick(1);SAME(P,'повтор');ZC.tick(10);if(ZC.W.enemies.length!==n)CBAD.push('повтор добавил врагов');if(ZC.W.flags.stage!=='hollow')CBAD.push('повтор сменил стадию');
ZC.tick(30);if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));if(CBAD.length)throw new Error('FAIL '+CBAD.slice(0,6).join(' | '));
'prolessons ok · '+CREP.filter(s=>/шотов/.test(s)).join(' ; ')+' · реплик проверено '+CREP.filter(s=>/лицо/.test(s)).length+' · '+ZC.FIN.proLes.log.join(',')
