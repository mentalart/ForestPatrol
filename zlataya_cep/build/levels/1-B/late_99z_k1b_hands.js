/* ============================== РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: ЭТАП 1 — РУКИ-КОРЯГИ: ПОЗА → УДАР → ОКНО ============================== */
// docs/29_leshy_proposals.md, шаг 3. Левая рука — «Хлоп» (жёлтая): вскидывает ладонь над головой, заливка круга растёт, удар по земле, от неё кольцо ростков — щит в последний миг.
// Правая — «Сгреб» (красная): отводит руку в сторону, заливка веера растёт и замирает (курс запирается на 60 % замаха), метёт дугой — кувырок или шаг за край веера.
// После удара, которого рука не добилась (щит, шаг в сторону), ладонь увязает в корнях 1,5 с — бейте. Руки бьют по очереди, никогда вместе, с паузой ≈ 1,2 с; после второго трофея —
// «Хлоп-хлоп»: левая, затем правая подряд (пауза 0,25 с). Рука «достаёт, докуда достаёт»: привязь 6,5 м вокруг прежнего места, рука от плеча тянется следом.
// Руки не налезают друг на друга: левая ладонь держится левой половины поляны, правая — правой (у тропы коридор, руки от плеч не перекрещиваются),
// ладони не ближе 6 м — уступает та, что сейчас не бьёт. Пробитая ладонь не лежит где попало: падает плашмя к тропе, на своё место у края поляны,
// и рука ложится длинным пологим мостом (≈ 28° вместо ≈ 42°) — по нему видно и легко взбежать на плечо к макушке.
// Этап 1, второй круг правок (docs/29_leshy_proposals.md, «Этап 1: что улучшить дальше»): ждущая рука «отдыхает» — не идёт к героям, ладонь
// опирается о землю; окно «Открыт! Бей!» — по пути (Лёгкий 2,2 с, Средний 1,5, Трудный 1,2), ладонь в окне светится тёплым и дрожит; пауза между
// ударами после первого трофея — 0,9 с; после второго на Среднем и Трудном каждый третий замах красной — обманка (вскинула и опустила).
// Звук замаха, взгляд Лешего, смахивание с моста, «держи — беги», мягкое падение и камера на мост — late_99zca_k1b_stage1.js (K1B.s1);
// показ в обучающем ролике (K1N.demo: руки ведёт ролик, состояние 'demo', поза — e.k1.dp/dk) — late_99zcb_k1b_tut.js.
// Меньше надписей: в бою всплывают только ключевые («Открыт! Бей!», «Нашли!», «Одним махом!»…); удары, угольки, искры, щит — звуком и вспышкой.
// Всё поверх общей логики мороков (e.tick / e.post, обёртки canWind, foeStrike, hitHero, floatText): угольки, отбой, Пробой, кувырок работают как везде.
const K1N={atkAt:-9,fanHalf:0.8,fanExtra:3.4,stuck:1.5,stuckBy:{easy:2.2,mid:1.5,hard:1.2},redN:0,demo:null,half:2.5,gap:6,lay:{x:5,z:-12.5},fall:0.4,quiet:/Уголёк погас|^Отбил|искра|^мимо$|^Щит!|Увернулся|^Толк|^Шишки|Запутался — шишки|закрылся|лепесток|По руке — да к плечу|Опять запутался/i};K1B.hands=K1N;
// рука встаёт на учёт при появлении (из spawnHands): своя очерёдность, позы, окна
K1B.hand=function(e){e.k1={prev:'spawn',lock:null,hit:false,stuck:false,sx:0,bob:0,fall:null};e.tick=k1nTick;e.post=k1nPost;};
function k1nLeshy(){return K1B.cur&&K1B.cur.L;}
function k1nHead(){return (W.flags&&W.flags.head)||0;}
// переходы состояний: вскинули → удар → окно
function k1nTick(e,dt){const k=e.k1,st=e.state;
  if(e.onBroken&&!e.onBroken.k1n){const ob=e.onBroken;e.onBroken=()=>k1nFall(e,ob);e.onBroken.k1n=1;}   // мост — после того, как ладонь упала на своё место
  if(k.fall)k1nFallStep(e,dt);
  if(K1N.demo){if(K1N.demo.hand)K1N.demo.hand(e,dt);return;}   // обучающий ролик ведёт руки сам
  // ждущая рука «отдыхает»: пока другая замахивается, бьёт или увязла — к героям не идёт
  const o=W.enemies.find(q=>q!==e&&q.k1&&q.alive);k.rest=!!(o&&st==='idle'&&(o.state==='ready'||o.state==='wind'||o.state==='strike'||o.state==='recover'||o.dazeT>0||o.k1.sweep));
  if(!e.chew)e.spMul=(k.rest||k.sweep)?0:1;
  if(st!==k.prev){const was=k.prev;k.prev=st;
    if(st==='wind'){k.lock=null;k.hit=false;K1B.emo(k1nLeshy(),'mock',1.4);
      k.fake=e.sig==='red'&&k1nHead()>=2&&genPath()!=='easy'&&(++K1N.redN)%3===0;if(K1B.s1)K1B.s1.wind(e);}
    if(was==='wind'&&st!=='wind')k1nResolve(e);                        // удар состоялся (в щит, в отбив, в пустоту, в героя)
    if(was==='strike'&&st==='recover'){K1N.atkAt=G.time;if(!k.hit&&e.alive&&e.embers>0)k1nStuck(e);}
    if(was==='wind'&&(st==='stagger'||st==='recover'))K1N.atkAt=G.time;
    if(st==='broken'){K1B.emo(k1nLeshy(),'hurt',1.6);k.stuck=false;}}
  if(k.stuck&&!(e.dazeT>0))k.stuck=false;
  // обманка: на середине замаха красная опускает ладонь — Леший хохочет
  if(k.fake&&st==='wind'&&e.t>=e.wdur*0.55){k.fake=false;const F=K1B.fx,T=F&&F.hT&&F.hT.get(e);if(T){T.o.del();F.hT.delete(e);}
    e.state='idle';e.t=0;e.cd=0.5;e.tgt=null;k.prev='idle';K1N.atkAt=G.time;K1B.emo(k1nLeshy(),'laugh',1.4);SFX.miss();
    floatText(e.pos.clone().add(new V3(0,e.L.top*e.s+1.0,0)),'Обманка!','#ffb0a0');return;}
  // курс красной руки запирается на 60 % замаха: веер — как заливка, не следит
  if(st==='wind'&&e.sig==='red'&&e.t>=e.wdur*0.6){if(k.lock==null)k.lock=e.face;e.face=k.lock;}}
// удар: ладонь бьёт по земле (жёлтая) или метёт дугой (красная)
function k1nResolve(e){const F=K1B.fx,s=e.side||1,fx=e.pos.x+Math.sin(e.face)*e.r*1.2,fz=e.pos.z+Math.cos(e.face)*e.r*1.2;
  if(e.sig==='red'){SFX.whoosh();shakeAll(0.02,0.2);if(F)for(let i=0;i<6;i++){const a=e.face+(i/5-0.5)*K1N.fanHalf*2*-s,rr=e.r+2.4;F.leaves(new V3(e.pos.x+Math.sin(a)*rr,0.3,e.pos.z+Math.cos(a)*rr),3,{up:0.3,spd:1.4,size:0.9});}}
  else{SFX.crash();shakeAll(0.04,0.28);if(F){F.sprouts(fx,fz,e.r+1.2);F.leaves(new V3(fx,0.4,fz),10,{up:0.6,spd:1.5,cols:[0x9acb48,0x6aa338,0x8c6644]});}}}
// Пробой: ладонь падает плашмя к тропе (0,4 с), там рука ложится мостом на плечо
function k1nFall(e,ob){const s=e.side||1,x1=s*K1N.lay.x,z1=K1N.lay.z,sh=K1B.cur&&K1B.cur.shoulders&&K1B.cur.shoulders[s>0?1:0];
  e.k1.fall={x0:e.pos.x,z0:e.pos.z,x1,z1,t:0,ob};if(sh)e.face=Math.atan2(x1-sh.x,z1-sh.z);e.inner.rotation.y=0;SFX.whoosh();}
function k1nFallStep(e,dt){const f=e.k1.fall;if(e.state!=='broken'||!e.alive){e.k1.fall=null;return;}
  f.t+=dt;const u=clamp(f.t/K1N.fall,0,1),q=u*u*(3-2*u);e.pos.x=f.x0+(f.x1-f.x0)*q;e.pos.z=f.z0+(f.z1-f.z0)*q;
  if(u<1)return;e.k1.fall=null;const F=K1B.fx;SFX.crash();shakeAll(0.05,0.3);if(F){F.sprouts(e.pos.x,e.pos.z,e.r+1.4);F.leaves(new V3(e.pos.x,0.4,e.pos.z),12,{up:0.7,spd:1.6,cols:[0x9acb48,0x6aa338,0x8c6644]});}
  f.ob();}
// руки врозь: своя половина поляны, ладони не ближе K1N.gap (уступает та, что не бьёт; обе свободны — расходятся поровну), привязь — как была
function k1nSpace(e,dt){const s=e.side||1;if(e.state==='broken'||e.state==='spawn'||e.k1.fall)return;
  if(e.pos.x*s<K1N.half)e.pos.x=s*K1N.half;
  const o=W.enemies.find(q=>q!==e&&q.k1&&q.alive);
  if(o){const d=Math.hypot(e.pos.x-o.pos.x,e.pos.z-o.pos.z);
    if(d<K1N.gap){const busy=q=>q.state==='ready'||q.state==='wind'||q.state==='strike'||q.state==='broken'||q.dazeT>0,share=busy(o)?1:busy(e)?0:0.5;
      if(share>0)e.pos.x+=s*Math.min((K1N.gap-d)*share,6*dt);}}
  const hx=e.pos.x-e.home.x,hz=e.pos.z-e.home.z,hl=Math.hypot(hx,hz),lim=e.leash-0.05;if(hl>lim){e.pos.x=e.home.x+hx/hl*lim;e.pos.z=e.home.z+hz/hl*lim;}}
// ладонь увязла в корнях: окно удара (общий «открыт» — e.dazeT: враг в recover, можно бить сколько успеешь)
function k1nStuck(e){e.dazeT=K1N.stuckBy[genPath()]||K1N.stuck;e.k1.stuck=true;const F=K1B.fx;SFX.knock();K1B.emo(k1nLeshy(),'surprise',1.0);
  if(F){F.sprouts(e.pos.x,e.pos.z,e.r+0.6);}floatText(e.pos.clone().add(new V3(0,e.L.top*e.s+1.0,0)),'Открыт! Бей!','#ffe36b');}
K1N.stuckAt=k1nStuck;   // для ботов: открыть окно ладони
// окно: тёплое свечение ладони (мягкий спрайт), пульсирует, пока ладонь увязла
function k1nGlow(e,dt,on){const k1=e.k1;if(!k1.glow){if(!on||!K1B.soft)return;const m=new THREE.Sprite(new THREE.SpriteMaterial({map:K1B.soft,color:0xffb050,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false}));
    m.position.set(0,0.45,0);m.scale.setScalar(1.7);m.raycast=()=>{};m.userData.noBatch=true;e.g.add(m);k1.glow=m;}
  const g=k1.glow,a=on?0.55+0.25*Math.sin(G.time*9):0;g.material.opacity+=(a-g.material.opacity)*Math.min(1,dt*10);g.visible=g.material.opacity>0.02;}
// позы: «Хлоп» — над головой, «Сгреб» — в сторону, «увязла» — вниз и в корни; шаги по земле — подпрыгивает на пальцах
const k1nLerp=(a,b,t)=>a+(b-a)*t;
function k1nPost(e,dt,k){const k1=e.k1,L=e.L,b=e.body,s=e.side||1,dm=e.state==='demo',st=dm?(k1.dp||'idle'):k1.sweep||e.state;if(dm||k1.sweep)k=k1.dk||0;
  const red=!!k1.sweep||(e.sig==='red'&&(st==='wind'||st==='strike'))||(st==='ready'&&e.signals[0]==='red'),
    w=st==='wind',kk=w?k:st==='ready'?clamp(e.t/0.45,0,1)*0.35:0;
  if(!dm)k1nSpace(e,dt);
  k1nGlow(e,dt,st==='stuck'||(e.dazeT>0&&k1.stuck));
  if(!L.arm)return;
  if(st==='ready'||w){if(red){e.inner.rotation.y=k1nLerp(e.inner.rotation.y,s*0.9*kk,0.3);L.arm.rotation.x=-0.3*kk;b.position.y+=0.3*kk;}
    else{e.inner.rotation.y*=0.7;b.position.y+=1.5*kk;L.arm.rotation.x=-1.5*kk;}}
  else if(st==='strike'){const u=dm||k1.sweep?k:clamp(e.t/0.25,0,1);if(red){e.inner.rotation.y=k1nLerp(s*0.9,-s*0.9,u);L.arm.rotation.x=0.5;}else{e.inner.rotation.y*=0.7;L.arm.rotation.x=0.9;b.position.y+=1.5*(1-u)*(1-u);}}
  else if(e.dazeT>0||st==='stuck'){e.inner.rotation.y*=0.7;b.position.y=-0.22;b.position.x=Math.sin(G.time*38)*0.035;L.arm.rotation.x=0.6+Math.sin(G.time*14)*0.06;}
  else{e.inner.rotation.y*=0.8;b.position.x*=0.5;k1.restK=(k1.restK||0)+((k1.rest?1:0)-(k1.restK||0))*Math.min(1,dt*5);if(k1.restK>0.01){b.position.y-=0.2*k1.restK;L.arm.rotation.x=0.35*k1.restK;}}
  // шаги по земле
  const mv=Math.hypot(e.pos.x-(k1.px==null?e.pos.x:k1.px),e.pos.z-(k1.pz==null?e.pos.z:k1.pz))/Math.max(dt,0.001);k1.px=e.pos.x;k1.pz=e.pos.z;k1.bob+=(Math.min(1,mv/2)-k1.bob)*0.2;
  if(k1.bob>0.05&&!w&&st!=='strike'&&!(e.dazeT>0))b.position.y+=Math.abs(Math.sin(G.time*14))*0.14*k1.bob;}
/* ---------- обёртки над общей логикой ---------- */
// очерёдность: руки бьют по очереди; пауза между ударами — 1,2 с, после второго трофея 0,25 («Хлоп-хлоп»)
{const _cw=canWind;canWind=function(e,h){if(e.k1&&W&&W.levelId==='1-B'){
    if(W.enemies.some(o=>o!==e&&o.k1&&o.alive&&(o.state==='ready'||o.state==='wind'||o.state==='strike')))return false;
    if(G.time-K1N.atkAt<(k1nHead()>=2?0.25:k1nHead()>=1?0.9:1.2))return false;}
  return _cw(e,h);};}
// красный удар — веер перед ладонью (курс заперт): в веере и без кувырка — удар, за краем веера — мимо; кувырок засчитывается откуда угодно, как раньше
{const _fs=foeStrike;foeStrike=function(e){if(e.k1)K1N.atkAt=G.time;   // пауза до следующей руки — от самого удара (в тот же кадр вторая рука ещё не начнёт)
    if(e.k1&&e.kind==='hand'&&e.sig==='red'&&e.tgt){const h=e.tgt,pi=h.player;
      if(h.rollT>0||G.time-(h.lastRoll||-9)<0.45){foeDodge(e,h);return;}
      const dx=h.pos.x-e.pos.x,dz=h.pos.z-e.pos.z,d=Math.hypot(dx,dz);let a=Math.atan2(dx,dz)-e.face;while(a>Math.PI)a-=2*Math.PI;while(a<-Math.PI)a+=2*Math.PI;
      if(d>e.r+K1N.fanExtra||Math.abs(a)>K1N.fanHalf||Math.abs(h.pos.y-e.pos.y)>1.6||h.cling||players[pi].downed)return;
      hitHero(e,h,'<i class="sg r"></i> Красный зубец — кувырок '+K(pi,'roll')+' или шаг за край веера!');return;}
    return _fs(e);};}
// был ли удар по герою — иначе рука увязнет
{const _hh=hitHero;hitHero=function(e,h,t){if(e&&e.k1)e.k1.hit=true;return _hh(e,h,t);};}
// меньше надписей: удары, угольки, искры, щит — звуком и вспышкой; ключевые остаются
{const _ft=floatText;floatText=function(p,t,c){if(W&&W.levelId==='1-B'&&K1B.cur&&typeof t==='string'&&K1N.quiet.test(t))return;return _ft.apply(this,arguments);};}
