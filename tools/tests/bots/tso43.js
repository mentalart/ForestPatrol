//@@
// 4-3 «Эй, ухнем» в одиночном режиме (клавиши Игрока 1, Q — по кругу): лямка на четверых — «ух-нем» одной кнопкой за всех;
// брёвна — сменить на героя у бревна и прыгнуть; в гору — уголь клещами в топку, а лямку тянут на «ух-нем».
window._errs=[];window.FAILS=[];window.FAILE=m=>{FAILS.push(String(m).slice(0,400));return new Error(m);};window.addEventListener('error',e=>FAILS.push(String(e.message).slice(0,300)));{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
ZC.setSolo(true);ZC.startFrom(ZC.LV('4-3'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(5);U.nocine();
window.H=ZC.HERO;window.st=()=>U.st()+' errs='+_errs.length+' '+_errs.join(' | ');
window.lastK=-1;window.pullTick=()=>{const S=ZC.W.song;if(!S)return;const u=S.u,k=S.k;if(S.wait&&S.k!==window._ck){window._ck=S.k;ZC.press('KeyE');}if(u>1.2&&u<1.5&&k!==lastK){lastK=k;ZC.press('KeyE');}};
'solo='+ZC.G.solo+' '+ZC.W.flags.stage+' me='+U.me().kind+' rings='+ZC.W.RINGS.map(r=>r.hero?r.hero.kind:'-').join(',')
//@@
// по берегу: все четверо — в кольца (Q по кругу), «ух-нем» одной кнопкой за всех; на мели — два «Рывка» подряд
const W=ZC.W,F=W.flags;const b0=W.BARGE.z,R=W.RINGS;
for(const [kind,ri] of [['proshka',2],['yosha',3]]){const r=U.toKind(kind)===kind?ri:-1;if(r<0)throw FAILE('не взять '+kind);U.walkTo(U.me().player,R[ri].x,R[ri].z,4);ZC.tick(5);}
if(!R.every(r=>r.hero))throw FAILE('не все в кольцах: '+R.map(r=>r.hero?r.hero.kind:'-')+' '+st());
for(let i=0;i<60*60;i++){if(!W.song)break;pullTick();ZC.tick(1);if(W.RINGS.some(r=>r.blocked))break;}
if(!(W.BARGE.z<b0-4))throw FAILE('баржа не идёт: '+b0+'→'+W.BARGE.z.toFixed(1)+' '+st());
if(!F.shoalOk)throw FAILE('мель не пройдена: B='+W.BARGE.z.toFixed(1)+' n='+F.shoalN+' '+st());
'pull solo B='+W.BARGE.z.toFixed(1)+' links='+W.links+' shoal='+F.shoalOk+' k='+W.song.k
//@@
// брёвна: у кольца бревно — сменить на его героя (Q) и прыгнуть на «ух-нем»
const W=ZC.W,F=W.flags;const log=[];lastK=-1;
for(let i=0;i<60*120;i++){const S=W.song;if(!S)break;const u=S.u,k=S.k;
  const near=W.RINGS.filter(r=>r.hero&&(r.blocked||W.LOGS.some(L=>r.z>L.z+0.25&&r.z<L.z+0.9)));
  if(near.length&&u<0.9){const want=near[0].hero.kind;if(U.me().kind!==want){U.toKind(want);log.push('Q'+want[0]);continue;}}
  if(u>1.05&&u<1.4&&k!==lastK){lastK=k;if(near.some(r=>r.hero===U.me()))ZC.press('Space');ZC.tick(1);ZC.press('KeyE');log.push(k+':'+near.map(r=>r.i+r.hero.kind[0]).join(''));}
  ZC.tick(1);if(W.RINGS.every(r=>r.z<W.LOGS[2].z-0.6))break;}
if(!W.RINGS.every(r=>r.z<W.LOGS[2].z-0.6))throw FAILE('брёвна не пройдены: '+log.slice(-12).join(' ')+' '+W.RINGS.map(r=>r.i+':'+(r.hero?r.hero.kind:'-')+'@'+r.z.toFixed(1)).join(' ')+' '+st());
'logs solo '+log.slice(-10).join(' ')+' B='+W.BARGE.z.toFixed(1)
//@@
// в гору: Прошка носит уголь, лямку тянут на «ух-нем» той же кнопкой
const W=ZC.W,F=W.flags;const P=H.proshka;U.toKind('proshka');const log=[];
function goTick(x,z,max){const B=['KeyA','KeyD','KeyW','KeyS'];const n=Math.round((max||6)*60);for(let i=0;i<n;i++){const h=U.me();const dx=x-h.pos.x,dz=z-h.pos.z;ZC.hold(B[0],dx<-0.25);ZC.hold(B[1],dx>0.25);ZC.hold(B[2],dz<-0.25);ZC.hold(B[3],dz>0.25);if(Math.hypot(dx,dz)<0.45)break;pullTick();ZC.tick(1);}B.forEach(k=>ZC.hold(k,false));ZC.tick(1);}
for(let i=0;i<60*20&&F.stage!=='hill';i++){pullTick();ZC.tick(1);}
for(let t=0;t<8&&F.stage!=='end';t++){const pile=W.BARGE.z<-44?[-5.4,-56]:[-5.4,-44];
  goTick(pile[0]+1.2,pile[1],8);P.face=-Math.PI/2;ZC.tick(2);U.tap('KeyR');ZC.tick(3);const got=!!P.carry;
  const sz=W.FIRESOCK.pos.z;goTick(1.1,sz,8);P.face=Math.PI/2;P.vel.set(0,0,0);ZC.tick(2);U.tap('KeyR');for(let i=0;i<30;i++){pullTick();ZC.tick(1);}
  log.push('trip'+t+':'+got+' fire='+W.FIRE.t.toFixed(1)+' B='+W.BARGE.z.toFixed(1));
  for(let i=0;i<60*6;i++){pullTick();ZC.tick(1);if(F.stage==='end')break;}}
if(F.stage!=='end')throw FAILE('баржа не в гору: '+log.join(' | ')+' '+st());
'hill solo '+log.join(' | ')
//@@
ZC.tick(300);ZC.tick(300);ZC.skip();ZC.tick(300);ZC.skip();ZC.tick(300);
const ok=ZC.G.done['4-3']&&!_errs.length&&!FAILS.length;(ok?'tso43 ok ':'FAIL tso43 '+FAILS.join(' || ')+' ')+[ZC.W.levelId,ZC.G.done['4-3'],ZC.G.got['4-3'],'errs='+_errs.length]
