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
// удар: звук и тряска (вид удара — пыль, ростки, борозда — в позе, k1nImpact: так же и в обучающем ролике)
function k1nResolve(e){if(e.sig==='red'){SFX.whoosh();shakeAll(0.02,0.2);}else{SFX.crash();shakeAll(0.04,0.28);}}
// Пробой: ладонь падает плашмя к тропе (0,4 с), там рука ложится мостом на плечо
function k1nFall(e,ob){const s=e.side||1,x1=s*K1N.lay.x,z1=K1N.lay.z,sh=K1B.cur&&K1B.cur.shoulders&&K1B.cur.shoulders[s>0?1:0];
  e.k1.fall={x0:e.pos.x,z0:e.pos.z,x1,z1,t:0,ob};if(sh)e.face=Math.atan2(x1-sh.x,z1-sh.z);e.inner.rotation.y=0;SFX.whoosh();}
function k1nFallStep(e,dt){const f=e.k1.fall;if(e.state!=='broken'||!e.alive){e.k1.fall=null;return;}
  f.t+=dt;const u=clamp(f.t/K1N.fall,0,1),q=u*u*(3-2*u);e.pos.x=f.x0+(f.x1-f.x0)*q;e.pos.z=f.z0+(f.z1-f.z0)*q;
  if(u<1)return;e.k1.fall=null;const F=K1B.fx;SFX.crash();shakeAll(0.05,0.3);if(F){F.sprouts(e.pos.x,e.pos.z,e.r+1.4);F.leaves(new V3(e.pos.x,0.4,e.pos.z),12,{up:0.7,spd:1.6,cols:[0x9acb48,0x6aa338,0x8c6644]});}
  f.ob();}
// руки врозь: своя половина поляны, ладони не ближе K1N.gap (уступает та, что не бьёт; обе свободны — расходятся поровну), привязь — как была
function k1nSpace(e,dt){const s=e.side||1;if(e.state==='broken'||e.state==='spawn'||e.k1.fall||e.k1.sweep)return;const mx=Math.max(0.05,(e.k1.back>0?9:20)*dt);
  if(e.pos.x*s<K1N.half)e.pos.x+=s*Math.min(mx,K1N.half-e.pos.x*s);
  const o=W.enemies.find(q=>q!==e&&q.k1&&q.alive);
  if(o){const d=Math.hypot(e.pos.x-o.pos.x,e.pos.z-o.pos.z);
    if(d<K1N.gap){const busy=q=>q.state==='ready'||q.state==='wind'||q.state==='strike'||q.state==='broken'||q.dazeT>0,share=busy(o)?1:busy(e)?0:0.5;
      if(share>0)e.pos.x+=s*Math.min((K1N.gap-d)*share,6*dt);}}
  const hx=e.pos.x-e.home.x,hz=e.pos.z-e.home.z,hl=Math.hypot(hx,hz),lim=e.leash-0.05;if(hl>lim){const m=Math.min(mx,hl-lim);e.pos.x-=hx/hl*m;e.pos.z-=hz/hl*m;}else e.k1.back=0;}
// ладонь увязла в корнях: окно удара (общий «открыт» — e.dazeT: враг в recover, можно бить сколько успеешь)
function k1nStuck(e){e.dazeT=K1N.stuckBy[genPath()]||K1N.stuck;e.k1.stuck=true;const F=K1B.fx;SFX.knock();K1B.emo(k1nLeshy(),'surprise',1.0);
  if(F){F.sprouts(e.pos.x,e.pos.z,e.r+0.6);}floatText(e.pos.clone().add(new V3(0,e.L.top*e.s+1.0,0)),'Открыт! Бей!','#ffe36b');}
K1N.stuckAt=k1nStuck;   // для ботов: открыть окно ладони
// окно: тёплое свечение ладони (мягкий спрайт), пульсирует, пока ладонь увязла
function k1nGlow(e,dt,on){const k1=e.k1;if(!k1.glow){if(!on||!K1B.soft)return;const m=new THREE.Sprite(new THREE.SpriteMaterial({map:K1B.soft,color:0xffb050,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false}));
    m.position.set(0,0.45,0);m.scale.setScalar(1.7);m.raycast=()=>{};m.userData.noBatch=true;e.g.add(m);k1.glow=m;}
  const g=k1.glow,a=on?0.55+0.25*Math.sin(G.time*9):0;g.material.opacity+=(a-g.material.opacity)*Math.min(1,dt*10);g.visible=g.material.opacity>0.02;}
// Позы — две руки, два разных движения (docs/29_leshy_proposals.md, «Этап 1: руки по-разному»):
// «Хлоп» (жёлтая) — вскидывает ладонь высоко над героем (пальцы назад, на земле растёт тень, с ладони сыплется мох), дрожит в верхней точке,
//   переворачивает ладонь вниз и падает плашмя за 0,1 с: отскок с приплюснутостью, кольцо пыли, ростки, листва.
// «Сгреб» (красная) — приседает и отводит руку низко в сторону (запястье кренится, когти скребут землю, летят комья), потом широкая дуга
//   поперёк веера: борозда по траве, красный след в воздухе, комья и листва по ходу дуги; доводка — рука медленно возвращается из конца дуги.
// Когти светятся своим цветом (жёлтые / красные; в замахе ярче); на красном веере бегут стрелки — куда пойдёт дуга, под жёлтой ладонью — тень.
const k1nLerp=(a,b,t)=>a+(b-a)*t,k1nSm=x=>{x=clamp(x,0,1);return x*x*(3-2*x);},K1N_R=1.7,K1N_TOP=3.4;
// кончики когтей — те же точки, что в FL.hand (ось arm)
const K1N_TIPS=[0,1,2,3,4].map(k=>{const a=(k-2)*0.4,sc=k===0?0.8:k===2?1.15:1,sa=Math.sin(a),ca=Math.cos(a),P0=new V3(sa*0.42,-0.12,0.55+ca*0.3),J=P0.clone().add(new V3(sa*0.5*sc,0.3,ca*0.55*sc));
  return J.clone().add(new V3(sa*0.3*sc,-(J.y+0.55)+0.08,ca*0.4*sc));});
function k1nTips(e,a){const k1=e.k1,red=e.signals[0]==='red';if(!k1.tips){if(!K1B.soft||!e.L.arm)return;
    k1.tips=K1N_TIPS.map(p=>{const m=new THREE.Sprite(new THREE.SpriteMaterial({map:K1B.soft,color:red?0xff5a30:0xffd84a,transparent:true,opacity:0.3,blending:THREE.AdditiveBlending,depthWrite:false}));
      m.position.copy(p);m.scale.setScalar(0.42);m.raycast=()=>{};m.userData.noBatch=true;e.L.arm.add(m);return m;});}
  a=clamp(a,0,1);const op=0.26+0.1*Math.sin(G.time*3+(red?1.5:0))+0.64*a,sc=0.4+0.32*a;for(const m of k1.tips){m.material.opacity=op;m.scale.setScalar(sc);}}
// тень под вскинутой жёлтой ладонью: растёт и темнеет к удару
function k1nShadow(e,a){const k1=e.k1;if(!k1.shd){if(a<=0.01)return;const m=new THREE.Mesh(K1_DISC,new THREE.MeshBasicMaterial({color:0x140e06,transparent:true,opacity:0,depthWrite:false}));
    m.rotation.x=-Math.PI/2;m.renderOrder=7;k1Add(m);k1.shd=m;}
  const m=k1.shd;m.visible=a>0.01;if(!m.visible)return;m.position.set(e.pos.x+Math.sin(e.face)*0.8,0.11,e.pos.z+Math.cos(e.face)*0.8);m.scale.setScalar(0.7+(e.r+1.1)*a);m.material.opacity=0.12+0.4*a;}
// стрелки на красном веере: бегут туда, куда пойдёт дуга
const K1N_CHEV=(()=>{const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute([0,0,0.55,-0.42,0,-0.3,0,0,-0.05,0.42,0,-0.3],3));g.setIndex([0,1,2,0,2,3]);return g;})();
function k1nChev(e,T,k){if(!T||!T.g||!T.r)return;const s=e.side||1;
  if(!T.chev){T.chev=[];for(let i=0;i<4;i++)for(const rr of[0.5,0.82]){const ph=s*K1N.fanHalf*(0.75-i*0.5),R=T.r*rr,m=new THREE.Mesh(K1N_CHEV,new THREE.MeshBasicMaterial({color:0xfff0e0,transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide}));
      m.position.set(Math.sin(ph)*R,0.04,Math.cos(ph)*R);m.rotation.y=Math.atan2(-s*Math.cos(ph),s*Math.sin(ph));m.scale.setScalar(0.8+0.6*rr);m.renderOrder=7;m.raycast=()=>{};T.g.add(m);T.chev.push({m,i});}}
  for(const c of T.chev){const f=((G.time*2.6-c.i*0.22)%1+1)%1;c.m.material.opacity=(0.12+0.78*Math.max(0,1-f*2.6))*(0.45+0.55*k);}}
// хлоп: кольцо пыли, ростки, листва
function k1nDust(x,z,r){const F=K1B.fx;if(!F)return;const m=new THREE.Mesh(new THREE.RingGeometry(0.55,1,40),new THREE.MeshBasicMaterial({color:0xd9c39a,transparent:true,opacity:0.75,depthWrite:false,side:THREE.DoubleSide}));
  m.rotation.x=-Math.PI/2;m.position.set(x,0.14,z);m.renderOrder=6;k1Add(m);
  F.anim(0.6,k=>{m.scale.setScalar(r*(0.4+1.1*(1-(1-k)*(1-k))));m.material.opacity=0.75*(1-k);},()=>{k1Del(m);m.geometry.dispose();m.material.dispose();});
  for(let i=0;i<10;i++){const a=i/10*Math.PI*2;F.leaves(new V3(x+Math.cos(a)*r*0.6,0.25,z+Math.sin(a)*r*0.6),1,{up:0.25,spd:0.9,size:1.3,cols:[0xcbb48a,0xa8916a,0xe0d2b0]});}}
function k1nSlam(e){const F=K1B.fx,x=e.pos.x+Math.sin(e.face)*0.8,z=e.pos.z+Math.cos(e.face)*0.8;if(!F)return;
  k1nDust(x,z,e.r+2.2);F.sprouts(x,z,e.r+1.2);F.leaves(new V3(x,0.4,z),10,{up:0.6,spd:1.5,cols:[0x9acb48,0x6aa338,0x8c6644]});}
// сгреб: борозда по траве и красный след в воздухе — кусками, по ходу дуги (T — время дуги); комья и листва вбок
function k1nFurrow(e,T){const F=K1B.fx;if(!F)return;const s=e.side||1,rf=e.r+K1N.fanExtra-0.7,h=K1N.fanHalf+0.2,N=9,da=h*2/N,g=new THREE.Group(),P=[],px=e.pos.x,pz=e.pos.z,fc=e.face;
  g.position.set(px,0.12,pz);g.rotation.y=fc;k1Add(g);
  const mat=(c,add)=>new THREE.MeshBasicMaterial({color:c,transparent:true,opacity:0,depthWrite:false,side:THREE.DoubleSide,blending:add?THREE.AdditiveBlending:THREE.NormalBlending});
  for(let i=0;i<N;i++){const ph=s*h-s*(i+0.5)*da,th=-Math.PI/2+ph-da/2;   // курс ph (как у героев) → угол кольца −π/2+ph
    const f=new THREE.Mesh(new THREE.RingGeometry(rf-0.45,rf+0.45,4,1,th,da*1.05),mat(0x3e2a16,false)),a=new THREE.Mesh(new THREE.RingGeometry(rf-1.4,rf+0.1,4,1,th,da*1.05),mat(0xff6a3a,true));
    f.rotation.x=a.rotation.x=-Math.PI/2;a.position.y=1.0;f.renderOrder=a.renderOrder=6;g.add(f);g.add(a);P.push({f,a,ph});}
  const L=T+2.6;F.anim(L,k=>{const t=k*L;for(let i=0;i<N;i++){const q=P[i],u=t-T*i/N;if(u<0)continue;
      if(!q.lv){q.lv=1;const a=fc+q.ph;F.leaves(new V3(px+Math.sin(a)*rf,0.3,pz+Math.cos(a)*rf),2,{up:0.35,spd:1.4,size:0.9,cols:i%2?[0x9acb48,0x6aa338,0xf6bc4c]:[0x6a4a2a,0x8c6644,0x9acb48]});}
      q.f.material.opacity=0.72*clamp(L-0.8-t,0,1);q.a.material.opacity=0.6*Math.max(0,1-u/0.35);q.a.visible=u<0.35;}},
    ()=>{k1Del(g);g.traverse(m=>{if(m.geometry){m.geometry.dispose();m.material.dispose();}});});}
function k1nPost(e,dt,k){const k1=e.k1,L=e.L,b=e.body,s=e.side||1,dm=e.state==='demo',st=dm?(k1.dp||'idle'):e.state,red=e.signals[0]==='red';if(dm)k=k1.dk||0;
  if(!dm)k1nSpace(e,dt);
  k1nGlow(e,dt,st==='stuck'||(e.dazeT>0&&k1.stuck));
  if(!L.arm)return;
  if(k1.sweep){k1nTips(e,1);k1nShadow(e,0);return;}   // смахивание с моста: позу ставит late_99zca_k1b_stage1.js
  const w=st==='wind',kk=st==='ready'?clamp(e.t/0.45,0,1):0,forced=st==='ready'||w||st==='strike';let lift=0,th=0,ax=0,rx=0,rz=0,glow=0,shd=0;
  if(st!==k1.pst){if(st==='strike'){k1.imp=false;if(red)k1nFurrow(e,0.22);}k1.pst=st;}
  if(!red){   // «Хлоп»
    if(st==='ready'){lift=0.5*k1nSm(kk);ax=-0.5*kk;glow=0.3*kk;shd=0.15*kk;}
    else if(w){const e1=k1nSm(k/0.6),e2=k1nSm((k-0.6)/0.4),e3=k1nSm((k-0.72)/0.28);lift=K1N_TOP*e1+0.3*e2;ax=-1.35*e1+1.25*e3;rx=-0.15*e1;glow=0.4+0.6*k;shd=k;
      if(k>0.7)b.position.x+=Math.sin(G.time*47)*0.06*e3;   // дрожит в верхней точке — вот-вот
      k1.top=lift;k1.mossT=(k1.mossT||0)-dt;if(k>0.3&&k1.mossT<=0&&K1B.fx){k1.mossT=0.14;K1B.fx.leaves(new V3(e.pos.x+Math.sin(e.face)*0.8,lift+0.6,e.pos.z+Math.cos(e.face)*0.8),1,{up:0.05,spd:0.25,size:0.8,cols:[0x6aa338,0x9acb48,0x8c6644]});}}
    else if(st==='strike'){const uf=dm?clamp(k/0.4,0,1):clamp(e.t/0.1,0,1),top=k1.top||K1N_TOP;lift=top*(1-uf*uf);ax=k1nLerp(-0.1,0.12,uf);glow=1;shd=1-uf*0.3;
      if(uf>=1&&!k1.imp){k1.imp=true;k1.impT=G.time;k1nSlam(e);}}}
  else{       // «Сгреб»
    if(st==='ready'){th=s*0.35*k1nSm(kk);lift=-0.08*kk;rz=-s*0.15*kk;ax=0.2*kk;glow=0.3*kk;}
    else if(w){const e1=k1nSm(k/0.7);th=s*0.95*e1;lift=-0.22*e1;rz=-s*0.38*e1;ax=0.45*e1;glow=0.4+0.6*k;
      if(k>0.45){b.position.x+=Math.sin(G.time*39)*0.04;k1.dirtT=(k1.dirtT||0)-dt;   // когти скребут землю — летят комья
        if(k1.dirtT<=0&&K1B.fx){k1.dirtT=0.12;const a=e.face+th,rr=K1N_R+2.6;K1B.fx.leaves(new V3(e.pos.x+Math.sin(a)*rr,0.2,e.pos.z+Math.cos(a)*rr),1,{up:0.2,spd:0.5,size:0.8,cols:[0x6a4a2a,0x8c6644]});}}}
    else if(st==='strike'){const u=dm?clamp(k,0,1):clamp(e.t/0.22,0,1),q=1-(1-u)*(1-u)*(1-u);th=s*0.95-s*2.05*q;lift=-0.15;rz=s*0.3*(q-0.3);ax=0.55;glow=1;}}
  if(forced){k1.th=th;k1.ly=lift;b.rotation.x=rx;L.arm.rotation.x=ax;}
  else{k1.th=(k1.th||0)*(1-Math.min(1,dt*3));k1.ly=(k1.ly||0)*(1-Math.min(1,dt*(k1.back>0?2.5:6)));}   // доводка: из конца дуги и с высоты — плавно
  if(red){b.position.x+=K1N_R*Math.sin(k1.th);b.position.z=K1N_R*(Math.cos(k1.th)-1);e.inner.rotation.y=k1.th*1.05;}else e.inner.rotation.y*=0.7;
  b.position.y+=k1.ly;b.rotation.z+=rz;
  // хлоп: отскок и приплюснутость
  const tb=G.time-(k1.impT==null?-9:k1.impT);if(!red&&tb<0.8){const sq=Math.exp(-tb*14);b.position.y+=0.55*Math.abs(Math.sin(tb*Math.PI/0.3))*Math.exp(-tb*5);b.scale.x*=1+0.22*sq;b.scale.z*=1+0.22*sq;b.scale.y*=1-0.3*sq;}
  k1nTips(e,glow);k1nShadow(e,shd);
  if(!dm){const T=K1B.fx&&K1B.fx.hT.get(e);if(T&&T.red)k1nChev(e,T.o,k);}else if(red&&w&&K1B.tut&&K1B.tut.D)k1nChev(e,K1B.tut.D.tr,k);
  if(!forced&&(e.dazeT>0||st==='stuck')){b.position.y=-0.22;b.position.x+=Math.sin(G.time*38)*0.035;L.arm.rotation.x=0.6+Math.sin(G.time*14)*0.06;}
  else if(!forced){k1.restK=(k1.restK||0)+((k1.rest?1:0)-(k1.restK||0))*Math.min(1,dt*5);if(k1.restK>0.01){b.position.y-=0.2*k1.restK;L.arm.rotation.x=0.35*k1.restK;}}
  // шаги по земле
  const mv=Math.hypot(e.pos.x-(k1.px==null?e.pos.x:k1.px),e.pos.z-(k1.pz==null?e.pos.z:k1.pz))/Math.max(dt,0.001);k1.px=e.pos.x;k1.pz=e.pos.z;k1.bob+=(Math.min(1,mv/2)-k1.bob)*0.2;
  if(k1.bob>0.05&&!forced&&!(e.dazeT>0))b.position.y+=Math.abs(Math.sin(G.time*14))*0.14*k1.bob;}
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
// рука Лешего не «распускается» на этапе 1: «Одним махом!» (щит в идеальный миг — для мелкого морока это unravel) и любой другой путь к unravel
// пробивают её сразу — ладонь падает к тропе, рука ложится мостом (раньше рука исчезала вместе с рукой от плеча). Конец этапа (три трофея) распускает руки, как прежде.
{const _ur=unravel;unravel=function(e){if(e&&e.k1&&e.kind==='hand'&&e.alive&&W&&W.levelId==='1-B'&&W.flags.phase===1){if(e.state!=='broken')emberOut(e,Math.max(1,e.embers),'Одним махом!');return;}return _ur.apply(this,arguments);};}
// был ли удар по герою — иначе рука увязнет
{const _hh=hitHero;hitHero=function(e,h,t){if(e&&e.k1)e.k1.hit=true;return _hh(e,h,t);};}
// меньше надписей: удары, угольки, искры, щит — звуком и вспышкой; ключевые остаются
{const _ft=floatText;floatText=function(p,t,c){if(W&&W.levelId==='1-B'&&K1B.cur&&typeof t==='string'&&K1N.quiet.test(t))return;return _ft.apply(this,arguments);};}
