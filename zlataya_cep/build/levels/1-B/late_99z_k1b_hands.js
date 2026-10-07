/* ============================== РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: ЭТАП 1 — РУКИ-КОРЯГИ: ПОЗА → УДАР → ОКНО ============================== */
// docs/29_leshy_proposals.md, шаг 3. Левая рука — «Хлоп» (жёлтая): вскидывает ладонь над головой, заливка круга растёт, удар по земле, от неё кольцо ростков — щит в последний миг.
// Правая — «Сгреб» (красная): отводит руку в сторону, заливка веера растёт и замирает (курс запирается на 60 % замаха), метёт дугой — кувырок или шаг за край веера.
// После удара, которого рука не добилась (щит, шаг в сторону), ладонь увязает в корнях 1,5 с — бейте. Руки бьют по очереди, никогда вместе, с паузой ≈ 1,2 с; после второго трофея —
// «Хлоп-хлоп»: левая, затем правая подряд (пауза 0,25 с). Рука «достаёт, докуда достаёт»: привязь 6,5 м вокруг прежнего места, рука от плеча тянется следом.
// Меньше надписей: в бою всплывают только ключевые («Открыт! Бей!», «Нашли!», «Одним махом!»…); удары, угольки, искры, щит — звуком и вспышкой.
// Всё поверх общей логики мороков (e.tick / e.post, обёртки canWind, foeStrike, hitHero, floatText): угольки, отбой, Пробой, кувырок работают как везде.
const K1N={atkAt:-9,fanHalf:0.8,fanExtra:3.4,stuck:1.5,quiet:/Уголёк погас|^Отбил|искра|^мимо$|^Щит!|Увернулся|^Толк|^Шишки|Запутался — шишки|закрылся|лепесток|По руке — да к плечу|Опять запутался/i};K1B.hands=K1N;
// рука встаёт на учёт при появлении (из spawnHands): своя очерёдность, позы, окна
K1B.hand=function(e){e.k1={prev:'spawn',lock:null,hit:false,stuck:false,sx:0,bob:0};e.tick=k1nTick;e.post=k1nPost;};
function k1nLeshy(){return K1B.cur&&K1B.cur.L;}
function k1nHead(){return (W.flags&&W.flags.head)||0;}
// переходы состояний: вскинули → удар → окно
function k1nTick(e,dt){const k=e.k1,st=e.state;
  if(st!==k.prev){const was=k.prev;k.prev=st;
    if(st==='wind'){k.lock=null;k.hit=false;K1B.emo(k1nLeshy(),'mock',1.4);}
    if(was==='wind'&&st!=='wind')k1nResolve(e);                        // удар состоялся (в щит, в отбив, в пустоту, в героя)
    if(was==='strike'&&st==='recover'){K1N.atkAt=G.time;if(!k.hit&&e.alive&&e.embers>0)k1nStuck(e);}
    if(was==='wind'&&(st==='stagger'||st==='recover'))K1N.atkAt=G.time;
    if(st==='broken'){K1B.emo(k1nLeshy(),'hurt',1.6);k.stuck=false;}}
  if(k.stuck&&!(e.dazeT>0))k.stuck=false;
  // курс красной руки запирается на 60 % замаха: веер — как заливка, не следит
  if(st==='wind'&&e.sig==='red'&&e.t>=e.wdur*0.6){if(k.lock==null)k.lock=e.face;e.face=k.lock;}}
// удар: ладонь бьёт по земле (жёлтая) или метёт дугой (красная)
function k1nResolve(e){const F=K1B.fx,s=e.side||1,fx=e.pos.x+Math.sin(e.face)*e.r*1.2,fz=e.pos.z+Math.cos(e.face)*e.r*1.2;
  if(e.sig==='red'){SFX.whoosh();shakeAll(0.02,0.2);if(F)for(let i=0;i<6;i++){const a=e.face+(i/5-0.5)*K1N.fanHalf*2*-s,rr=e.r+2.4;F.leaves(new V3(e.pos.x+Math.sin(a)*rr,0.3,e.pos.z+Math.cos(a)*rr),3,{up:0.3,spd:1.4,size:0.9});}}
  else{SFX.crash();shakeAll(0.04,0.28);if(F){F.sprouts(fx,fz,e.r+1.2);F.leaves(new V3(fx,0.4,fz),10,{up:0.6,spd:1.5,cols:[0x9acb48,0x6aa338,0x8c6644]});}}}
// ладонь увязла в корнях: окно удара (общий «открыт» — e.dazeT: враг в recover, можно бить сколько успеешь)
function k1nStuck(e){e.dazeT=K1N.stuck;e.k1.stuck=true;const F=K1B.fx;SFX.knock();K1B.emo(k1nLeshy(),'surprise',1.0);
  if(F){F.sprouts(e.pos.x,e.pos.z,e.r+0.6);}floatText(e.pos.clone().add(new V3(0,e.L.top*e.s+1.0,0)),'Открыт! Бей!','#ffe36b');}
// позы: «Хлоп» — над головой, «Сгреб» — в сторону, «увязла» — вниз и в корни; шаги по земле — подпрыгивает на пальцах
const k1nLerp=(a,b,t)=>a+(b-a)*t;
function k1nPost(e,dt,k){const k1=e.k1,L=e.L,b=e.body,s=e.side||1,st=e.state,red=(e.sig==='red'&&(st==='wind'||st==='strike'))||(st==='ready'&&e.signals[0]==='red'),
    w=st==='wind',kk=w?k:st==='ready'?clamp(e.t/0.45,0,1)*0.35:0;
  if(!L.arm)return;
  if(st==='ready'||w){if(red){e.inner.rotation.y=k1nLerp(e.inner.rotation.y,s*0.9*kk,0.3);L.arm.rotation.x=-0.3*kk;b.position.y+=0.3*kk;}
    else{e.inner.rotation.y*=0.7;b.position.y+=1.5*kk;L.arm.rotation.x=-1.5*kk;}}
  else if(st==='strike'){const u=clamp(e.t/0.25,0,1);if(e.sig==='red'){e.inner.rotation.y=k1nLerp(s*0.9,-s*0.9,u);L.arm.rotation.x=0.5;}else{e.inner.rotation.y*=0.7;L.arm.rotation.x=0.9;b.position.y+=1.5*(1-u)*(1-u);}}
  else if(e.dazeT>0){e.inner.rotation.y*=0.7;b.position.y=-0.22;L.arm.rotation.x=0.6+Math.sin(G.time*14)*0.04;}
  else e.inner.rotation.y*=0.8;
  // шаги по земле
  const mv=Math.hypot(e.pos.x-(k1.px==null?e.pos.x:k1.px),e.pos.z-(k1.pz==null?e.pos.z:k1.pz))/Math.max(dt,0.001);k1.px=e.pos.x;k1.pz=e.pos.z;k1.bob+=(Math.min(1,mv/2)-k1.bob)*0.2;
  if(k1.bob>0.05&&!w&&st!=='strike'&&!(e.dazeT>0))b.position.y+=Math.abs(Math.sin(G.time*14))*0.14*k1.bob;}
/* ---------- обёртки над общей логикой ---------- */
// очерёдность: руки бьют по очереди; пауза между ударами — 1,2 с, после второго трофея 0,25 («Хлоп-хлоп»)
{const _cw=canWind;canWind=function(e,h){if(e.k1&&W&&W.levelId==='1-B'){
    if(W.enemies.some(o=>o!==e&&o.k1&&o.alive&&(o.state==='ready'||o.state==='wind'||o.state==='strike')))return false;
    if(G.time-K1N.atkAt<(k1nHead()>=2?0.25:1.2))return false;}
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
