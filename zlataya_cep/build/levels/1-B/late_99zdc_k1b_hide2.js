/* ============================== РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: ЭТАП 2 «ИЩИ-СВИЩИ» ПО АУДИТУ — ПОИСК РЕШАЕТ, СОВИНЫЙ ВЗОР — ГЛАВНЫЙ ИНСТРУМЕНТ ============================== */
// Аудит 1-Б, пункты Г1–Г6, Ж2. Раньше поиск ничего не решал: струна ловила всех (ложный лопался, настоящий падал), удар по ложному ничем не грозил,
// а настоящего и так выдавали мох-следы. Теперь:
// Г1. Ошибка стоит дорого. Ложный двойник на струне рвёт её («Пфф! Струна лопнула!»), сам идёт дальше: струну надо натянуть перед настоящим —
//     так, чтобы он дошёл до неё первым. Удар по ложному — «Ха! Ищи-свищи!»: настоящий в клубах дыма меняется местами с другим двойником,
//     на Среднем и Трудном из дыма выходит ещё один двойник (не больше 6 / 7). Ложных по-прежнему лопает шишка, отбитая щитом от белки.
// Г2. Мох-следы настоящего видны только под Совиным взором и 3 с после него (под взором — золотые). Ложные следы мохоногов видны всегда — без взора
//     они путают, под взором тускнеют («взор их не обманет»). Без взора остаются тень и дыхание настоящего — для наблюдательных и для соло.
// Г3. Взор видит сквозь дым: настоящий поменялся местами — под взором от старого места к новому тянется золотая дорожка искр.
// Г4. Взор показывает путь: перед настоящим проступают золотые точки — где он будет в ближайшие 2,5 с (туда и натянуть струну).
// Г5. Рогатка Прошки по помеченному: под взором настоящий — цель рогатки; жёлудь — и он падает, как на струне.
// Г6. Взор и в этапе 1: под взором у обманки красной руки гаснут когти, над ней — «Обманка!».
// Ж2. Задачи, подсказки и надпись паузы — под новые правила (замены в rep_30_leshy1b.py, раздел «аудит»).
// FIN.k1b.hide2: owlV() · plan() — куда натянуть струну (напарник-бот, боты) · st — счётчики.
const K1H2={owlEnd:-9,penT:-9,lastReal:null,lastRealPos:null,dots:null,tip:{},st:{snaps:0,vinePops:0,fakeHits:0,shuffles:0,added:0,slingTrips:0,trails:0,owlFakes:0}};K1B.hide2=K1H2;
K1H2.owlV=()=>W.owlT>0?1:clamp(1-(G.time-K1H2.owlEnd)/3,0,1);
const k1h2Real=()=>(W.doubles||[]).find(d=>d.real&&d.state!=='gone');
const k1h2Max=()=>({easy:4,mid:6,hard:7})[genPath()]||6;
function k1h2Tip(key,txt,dur){if(K1H2.tip[key])return;K1H2.tip[key]=1;for(const pi of[0,1])tip(pi,txt,dur||3.2);}
/* ---------- Г1: ложный рвёт струну; живая лоза Йоши (late_99zdd) держит и лопает ложного ---------- */
K1B.fakeOnString=function(d,t){const st=t.stake;
  if(st&&st.k1vine>G.time){d.state='gone';makeCones(d.pos,14);W.group.remove(d.m.g);SFX.crash();K1H2.st.vinePops++;floatText(d.pos.clone().add(new V3(0,3,0)),'Лоза держит — шишки!','#9fe6a0');return;}
  const u=clamp((d.pos.x-t.sx)*t.dx+(d.pos.z-t.sz)*t.dz,0,t.len),px=t.sx+t.dx*u,pz=t.sz+t.dz*u;removeThread(t);K1H2.st.snaps++;
  if(K1B.fx){K1B.fx.puff(px,0.6,pz,5,0xffe6a0);K1B.fx.leaves(new V3(px,0.6,pz),6,{spd:1.6,up:0.6,cols:[0xffd76a,0xffb000,0x9acb48]});}
  try{SFX.brk();tone(520,0.12,'square',0.05,180);}catch(e){}floatText(d.pos.clone().add(new V3(0,3.2,0)),'Пфф! Струна лопнула!','#ffb0a0');K1B.emo(K1B.cur.L,'laugh',1.2);
  k1h2Tip('snap','Двойник порвал струну! Совиный взор — где настоящий, струну — прямо перед ним.',3.6);};
/* ---------- Г1: удар по ложному — «Ха! Ищи-свищи!» ---------- */
function k1h2Knock(h,d){const dx=h.pos.x-d.pos.x,dz=h.pos.z-d.pos.z,dd=Math.hypot(dx,dz)||1;h.vel.x=dx/dd*6;h.vel.z=dz/dd*6;h.vel.y=4;h.grounded=false;h.knockT=0.3;SFX.knock();}
function k1h2Swap(a,b){const ka=a.k2,kb=b.k2;if(!ka||!kb)return;for(const f of['a','r','w','ring']){const v=ka[f];ka[f]=kb[f];kb[f]=v;}const C=K1B.cur.C;
  for(const x of[a,b]){x.k2.mode='ring';x.k2.t=0;x.k2.nextHide=rand(4,8);x.pos.set(C.x+Math.cos(x.k2.a)*x.k2.r,0,C.z+Math.sin(x.k2.a)*x.k2.r);if(K1B.fx)K1B.fx.puff(x.pos.x,1.2,x.pos.z,5);}}
function k1h2Add(at){const ds=W.doubles,n=ds.length+1,round=W.flags.round||0,src=ds.filter(d=>d.state==='walk'&&d.k2)[0];if(!src)return null;
  const m=K1B.double(ds.length,n,false,round),em=new THREE.Mesh(new THREE.SphereGeometry(0.22,10,8),MB(0xff7a1a,{transparent:true,opacity:0}));em.position.set(0,2.6,0.6);m.g.add(em);em.visible=false;
  m.g.position.set(at.x,0,at.z);const C=K1B.cur.C,a=Math.atan2(at.z-C.z,at.x-C.x);
  const d={m,em,a,real:false,state:'walk',t:0,pos:m.g.position};
  d.k2={ring:src.k2.ring,r:src.k2.r,w:src.k2.w,a,mode:'back',t:0,nextHide:rand(5,9),spot:null,px:null,pz:null,acc:0,stars:null,halo:null,lead:false,mate:null,swapT:0};
  ds.push(d);K1H2.st.added++;if(K1B.fx)K1B.fx.puff(at.x,1.2,at.z,7);return d;}
K1B.fakeHit=function(d,h){if(h)k1h2Knock(h,d);floatText(d.pos.clone().add(new V3(0,3.2,0)),'Ха! Ищи-свищи!','#b8e070');K1B.emo(K1B.cur.L,'laugh',1.4);
  if(G.time-K1H2.penT<1.5)return;K1H2.penT=G.time;K1H2.st.fakeHits++;
  const r=k1h2Real(),walk=(W.doubles||[]).filter(q=>q!==r&&q.state==='walk'&&q.k2&&q.k2.mode!=='swap');
  if(r&&r.state==='walk'&&r.k2&&walk.length){k1h2Swap(r,walk[Math.floor(Math.random()*walk.length)]);K1H2.st.shuffles++;SFX.whoosh();}
  if(genPath()!=='easy'&&(W.doubles||[]).filter(q=>q.state!=='gone').length<k1h2Max()){const nd=k1h2Add(d.pos);if(nd)floatText(d.pos.clone().add(new V3(0,4,0)),'Ещё один!','#ffb0a0');}
  k1h2Tip('hit','Мимо — это двойник! Настоящего покажет Совиный взор, свалит струна или жёлудь.',3.6);};
/* ---------- Г2: мох-следы настоящего — только под взором ---------- */
{const _hs=K1B.hideStep;K1B.hideStep=function(d){K1H2.inReal=!!d.real;try{return _hs.apply(this,arguments);}finally{K1H2.inReal=false;}};}
{const _pr=K1B.fx.print;K1B.fx.print=function(x,z){_pr.apply(this,arguments);const P=K1B.fx.prints;if(P){const q=P.list[(P.i-1)%P.list.length];if(q){q.real=!!K1H2.inReal;q.c0=q.c0||q.m.material.color.getHex();}}};}
function k1h2Prints(){const P=K1B.fx.prints;if(!P)return;const v=G.cine?1:K1H2.owlV();
  for(const q of P.list){if(q.t>=99||!q.c0)continue;const m=q.m.material;
    if(q.real){m.opacity*=v;m.color.setHex(v>0.05?(q.c0===0x8fd05a?0xffe27a:0xf0c040):q.c0);q.m.visible=v>0.02;}
    else m.color.setHex(v>0.3?0x7a6a50:q.c0);}}   // ложные (мохоноги): под взором — тусклые
/* ---------- Г3–Г4: дорожка за настоящим и точки пути ---------- */
function k1h2Trail(a,b){K1H2.st.trails++;const n=9;for(let i=0;i<=n;i++){const k=i/n;later(k*0.35,()=>{const p=new V3(lerp(a.x,b.x,k),1.2+Math.sin(k*Math.PI)*1.6,lerp(a.z,b.z,k));spawnSpark(p,COL.gold);});}
  floatText(new V3(b.x,3.6,b.z),'Туда!','#ffd76a');}
function k1h2Dots(r,v){if(!K1H2.dots){K1H2.dots=[];for(let i=0;i<10;i++){const m=new THREE.Mesh(new THREE.CircleGeometry(0.22,10),new THREE.MeshBasicMaterial({color:0xffd76a,transparent:true,opacity:0,depthWrite:false}));
    m.rotation.x=-Math.PI/2;m.renderOrder=5;m.raycast=()=>{};m.userData.noBatch=true;W.group.add(m);K1H2.dots.push(m);}}
  const C=K1B.cur.C,k=r&&r.k2,on=v>0.05&&r&&r.state==='walk'&&k&&k.mode==='ring';
  K1H2.dots.forEach((m,i)=>{if(!on){m.visible=false;return;}const tau=0.25*(i+1),a=k.a+k.w*tau;m.visible=true;m.position.set(C.x+Math.cos(a)*k.r,0.08,C.z+Math.sin(a)*k.r);
    m.material.opacity=v*(0.9-0.07*i)*(0.75+0.25*Math.sin(G.time*6-i*0.7));m.scale.setScalar(1.15-0.05*i);});}
/* ---------- Г5: рогатка по помеченному ---------- */
const K1H2_MARK={pos:new V3(),active:()=>W.flags.phase===2&&!G.cine&&K1H2.owlV()>0.2&&!!k1h2Real()&&k1h2Real().state==='walk',
  onHit:()=>{const d=k1h2Real();if(!d||d.state!=='walk')return;d.state='fallen';d.t=0;SFX.brk();d.m.body.rotation.x=-1.3;d.m.g.position.y=0.3;K1H2.st.slingTrips++;
    floatText(d.pos.clone().add(new V3(0,3.4,0)),'Жёлудем — да в лоб!','#ffd76a');banner('Настоящий споткнулся!','#ffd76a',1.6,'бей его — добивай!');K1B.emo(K1B.cur.L,'surprise',1.2);}};
/* ---------- Г6: обманка руки под взором ---------- */
function k1h2OwlFake(){for(const e of W.enemies){if(e.kind!=='hand'||!e.alive||!e.k1)continue;const k=e.k1;if(e.state!=='wind'){k.owlSeen=false;continue;}
    if(k.fake&&W.owlT>0){if(k.tips)k.tips.forEach(m=>{m.material.opacity=0.05;});
      if(!k.owlSeen){k.owlSeen=true;K1H2.st.owlFakes++;floatText(e.pos.clone().add(new V3(0,(e.L.top||1.2)*e.s+1.2,0)),'Обманка!','#e7c3ff');try{SFX.owl();}catch(err){}}}}}
/* ---------- куда натянуть струну: стоять на радиусе 3,5 м у колышка, бросить в колышек — настоящий дойдёт до струны первым ---------- */
K1H2.plan=function(lead){const C=K1B.cur.C,ds=(W.doubles||[]).filter(d=>d.state==='walk'&&d.k2&&d.k2.mode==='ring'),r=ds.find(d=>d.real);if(!r)return null;lead=lead||1.2;let best=null;
  for(const s of W.stakes){if(s.used)continue;const th=Math.atan2(s.z-C.z,s.x-C.x);
    const arr=d=>{let g=(th-d.k2.a)*Math.sign(d.k2.w||1);g=((g%(2*Math.PI))+2*Math.PI)%(2*Math.PI);return g/Math.max(0.05,Math.abs(d.k2.w));};
    const tr=arr(r);if(tr<lead||tr>lead+5)continue;if(ds.some(d=>d!==r&&arr(d)<tr+0.4))continue;
    if(!best||tr<best.t)best={s,t:tr,x:C.x+Math.cos(th)*3.5,z:C.z+Math.sin(th)*3.5};}
  return best;};
/* ---------- каждый кадр ---------- */
function k1h2Tick(dt){const F=W.flags;
  if(K1H2.owlPrev>0&&!(W.owlT>0))K1H2.owlEnd=G.time;K1H2.owlPrev=W.owlT||0;
  if(F.phase===1)k1h2OwlFake();
  const r=F.phase===2?k1h2Real():null,v=K1H2.owlV();k1h2Prints();
  if(r){if(K1H2.lastReal===r&&K1H2.lastRealPos&&hd(K1H2.lastRealPos,r.pos)>2.5&&v>0.05)k1h2Trail(K1H2.lastRealPos.clone(),r.pos.clone());
    K1H2.lastReal=r;K1H2.lastRealPos=(K1H2.lastRealPos||new V3()).copy(r.pos);K1H2_MARK.pos.set(r.pos.x,2.6,r.pos.z);}
  else{K1H2.lastReal=null;}
  if(!G.cine)k1h2Dots(r,v);else if(K1H2.dots)K1H2.dots.forEach(m=>{m.visible=false;});}
{const _in=K1B.init;K1B.init=function(ctx){_in(ctx);K1H2.dots=null;K1H2.tip={};K1H2.owlEnd=-9;K1H2.penT=-9;for(const k in K1H2.st)K1H2.st[k]=0;W.marks.push(K1H2_MARK);
  for(const pi of[0,1]){const h=()=>active(pi);prompt(pi,'skill',()=>headOf(h()),()=>h().kind==='proshka'&&K1H2_MARK.active()&&hd(h().pos,K1H2_MARK.pos)<14,'жёлудем!');}};}
{const _st=step;step=function(dt){_st(dt);if(!K1B.cur||!W||W.levelId!=='1-B')return;try{k1h2Tick(dt);}catch(err){console.error('k1h2',err);}};}
{const _ll=loadLevel;loadLevel=function(i){K1H2.dots=null;K1H2.lastReal=null;_ll(i);};}
