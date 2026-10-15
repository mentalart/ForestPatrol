/* ============================== РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: ЭТАП 1 — ЗВУК РУК, ВЗГЛЯД ЛЕШЕГО, МОСТ С НАПРЯЖЕНИЕМ, «ДЕРЖИ — БЕГИ», МЯГКОЕ ПАДЕНИЕ, КАМЕРА НА МОСТ ============================== */
// docs/29_leshy_proposals.md, «Этап 1: что улучшить дальше» (пункты 1–4, 7, 8; пункты 1, 5, 6 в руках — late_99z_k1b_hands.js). FIN.k1b.s1.
// 1. Кто бьёт — видно по Лешему: голова поворачивается к руке, которая замахивается, и Леший кренится на её сторону (ждущая рука «отдыхает» — в модуле рук).
// 2. Мост с напряжением: герой поднялся по мосту — вторая рука поднимается, тянется к мосту и проносится ладонью поперёк него (красная полоса поперёк
//    моста напротив бегущего, 1 с, на Лёгком 1,3 с): прыжок — «Перепрыгнул!», кувырок — «Ловко!», иначе героя смахивает с моста в сторону удара (без урона: мох
//    пружинит; мост держится ещё 5 с — на вторую попытку). Ударили вторую руку, пока замахивается, — «Отвлёк!»: не смахнёт, пока по ней бьют.
//    Вторая рука занята — смахнёт, как освободится. Напарник-бот (late_73g) уходит кувырком.
// 3. «Держи — беги» (вдвоём): пока один герой стоит у пробитой ладони, мост не уходит (до 25 с) — второй бежит наверх. Одним игроком — 10 с, как раньше.
// 4. Свой звук у каждой руки: «Хлоп» — три глухих удара барабана к удару, «Сгреб» — шорох листвы по нарастающей.
// 7. Мягкое падение: сорвался с моста или с плеча — падает медленнее, у земли мох подбрасывает, подсказка «Ещё раз — по руке!».
// 8. Камера на мост: рука легла — камера на 1,5 с отъезжает и показывает мост целиком до плеча (управление не отнимается).
const K1S1={look:0,lookW:0,side:1,br:null,sw:[],holdMax:25};K1B.s1=K1S1;
const k1sSm=x=>x*x*(3-2*x);
/* ---------- 4. звук замаха ---------- */
K1S1.wind=function(e){const d=Math.max(0.25,(e.wdur||0.5)/(e.slow||1));
  try{if(typeof KSND!=='undefined'&&KSND.ok()){
      if(e.sig==='red'){AUD.nz({type:'bandpass',f0:700,f1:3200,d:d+0.12,v:0.07,q:1.1,a:d*0.85,wet:0.25});AUD.nz({type:'highpass',f0:3000,f1:6500,d,v:0.025,a:d*0.9});}
      else for(const[i,u]of[[0,0],[1,0.45],[2,0.78]]){const at=d*u;AUD.osc({type:'sine',f0:120,f1:48,d:0.3,v:0.09+0.03*i,a:0.004,at});AUD.nz({type:'lowpass',f0:700,f1:180,d:0.18,v:0.05+0.015*i,at});}}
    else if(e.sig==='red'){for(let i=0;i<6;i++)tone(rand(2400,3600),0.06,'square',0.015+0.008*i,null,i*d/6);}
    else for(const u of[0,0.45,0.78])tone(110,0.22,'sine',0.25,55,u*d);}catch(err){}};
/* ---------- 1. взгляд и крен Лешего ---------- */
const k1sAct=()=>W.enemies.find(e=>e.k1&&e.alive&&(e.state==='ready'||e.state==='wind'||e.state==='strike'||e.k1.sweep||(e.state==='demo'&&(e.k1.dp==='wind'||e.k1.dp==='strike'))));
function k1sLook(dt){const L=K1B.cur.L;if(!L||!L.g.visible||!L.head||!L.body)return;const a=W.flags.phase===1?k1sAct():null;
  if(a){K1S1.side=a.side||1;const yaw=clamp(Math.atan2(a.pos.x-L.g.position.x,a.pos.z-L.g.position.z)-L.g.rotation.y,-0.75,0.75);K1S1.look+=(yaw-K1S1.look)*Math.min(1,dt*7);}
  K1S1.lookW+=((a?1:0)-K1S1.lookW)*Math.min(1,dt*5);const w=K1S1.lookW;if(w<0.005)return;
  L.head.rotation.y=lerp(L.head.rotation.y,K1S1.look,w);L.body.rotation.z=lerp(L.body.rotation.z,-K1S1.side*0.07,w);}
/* ---------- новый мост: время и место — для камеры и «держи — беги» ---------- */
function k1sNewRamps(){for(const r of K1B.cur.ramps){if(r.k1seen)continue;r.k1seen=true;r.k1t0=G.time;const b=r.hand&&r.hand.k1bridge;
    if(b&&!K1N.demo)K1S1.br={t:G.time,from:b.from.clone(),to:b.to.clone(),side:r.hand.side||1};}}
/* ---------- 2. смахивание с моста ---------- */
// Вторая рука поднимается, тянется к мосту и проносится ладонью поперёк него — изнутри поляны наружу, туда же слетает герой.
// Замах (1 с, на Лёгком 1,3): рука низко тянется к мосту, встаёт напротив бегущего и поднимается выше настила; поперёк моста заливается красная полоса —
// от руки к краю (место запирается на 75 % замаха: успел пробежать дальше — мимо). Удар (0,36 с): ладонь низко проносится над настилом,
// на середине — смахивает того, кто стоит в полосе; прыжок (ладонь ниже прыжка даже у Потапа) или кувырок — мимо. Доводка (0,5 с) —
// рука дотягивает дугу вверх, потом возвращается на свою половину. Бьют вторую руку, пока она замахивается, — «Отвлёк!»: смахивание
// сорвано, и рука не смахнёт, пока занята (по ней били меньше 1,8 с назад).
const k1sOnRamp=r=>[active(0),active(1)].filter(h=>h&&h.grounded&&h.groundRef&&r.cols.includes(h.groundRef));
const k1sU=(rp,h)=>clamp(((h.pos.x-rp.x0)*rp.dx+(h.pos.z-rp.z0)*rp.dz)/rp.len,0,1);   // доля моста напротив героя (0 — ладонь, 1 — плечо)
const K1S_BAND=2.0,K1S_SD=0.36,K1S_FD=0.5;
function k1sGeo(S){const rp=S.r.cols[0],u=S.u,P=new V3(rp.x0+rp.dx*rp.len*u,rp.y0+(rp.y1-rp.y0)*u,rp.z0+rp.dz*rp.len*u);let nx=rp.dz,nz=-rp.dx;if(nx*(S.r.hand.side||1)<0){nx=-nx;nz=-nz;}
  S.P=P;S.n=new V3(nx,0,nz);S.A=P.clone().addScaledVector(S.n,-4.6);S.B=P.clone().addScaledVector(S.n,4.2);}
// полоса поперёк моста на высоте настила: рамка и заливка от руки к краю
function k1sTele(){const mk=op=>{const m=new THREE.Mesh(new THREE.BoxGeometry(1,0.06,1),new THREE.MeshBasicMaterial({color:0xff4a3a,transparent:true,opacity:op,depthWrite:false}));m.userData.noBatch=true;m.renderOrder=5;m.raycast=()=>{};W.group.add(m);return m;};
  const fr=mk(0.24),fl=mk(0.5);
  return {set(S,k){const a=S.A,dir=S.n,len=a.distanceTo(S.B),y=S.P.y+0.14,ang=Math.atan2(dir.x,dir.z);
      for(const m of[fr,fl])m.rotation.y=ang;fr.scale.set(K1S_BAND*2,1,len);fr.position.set(a.x+dir.x*len/2,y,a.z+dir.z*len/2);
      const l=Math.max(0.01,len*k);fl.scale.set(K1S_BAND*2,1,l);fl.position.set(a.x+dir.x*l/2,y+0.01,a.z+dir.z*l/2);fl.material.opacity=0.4+0.45*k;},
    del(){for(const m of[fr,fl]){W.group.remove(m);m.geometry.dispose();m.material.dispose();}}};}
// начать смахивание: r — мост, o — вторая рука; demo — в обучающем ролике (место u и замах dur задаёт ролик, без удара по героям)
function k1sStart(r,o,demo,u,dur){const S={r,o,t:0,dur:dur||(genPath()==='easy'?1.3:1.0),demo:!!demo,u:u==null?0.5:u,o0:o.pos.clone(),tel:k1sTele()};
  const hs=demo?[]:k1sOnRamp(r);if(hs.length){const h=hs.sort((a,b)=>b.pos.y-a.pos.y)[0];S.u=k1sU(r.cols[0],h);}k1sGeo(S);
  r.k1sw=S;K1S1.sw.push(S);o.k1.sweep='wind';o.k1.swS=S;o.cd=99;o.tgt=null;K1B.emo(K1B.cur.L,'mock',1.4);K1S1.wind({sig:'red',wdur:S.dur});return S;}
function k1sSwEnd(S,keep){const o=S.o;if(o&&o.k1){o.k1.sweep=null;o.k1.swS=null;o.k1.back=1;o.k1.ly=o.body.position.y;if(o.state==='idle')o.cd=1.0;}if(S.tel)S.tel.del();S.tel=null;K1N.atkAt=G.time;
  const i=K1S1.sw.indexOf(S);if(i>=0)K1S1.sw.splice(i,1);if(!keep&&S.r.k1sw===S)S.r.k1sw=null;}
// «Отвлёк!»: по руке ударили, пока она замахивалась — смахивание сорвано
K1S1.distract=function(o){const S=o.k1&&o.k1.swS;if(!S||S.t>=S.dur)return false;S.r.k1sw=null;k1sSwEnd(S,true);o.k1.busyT=G.time;SFX.knock();K1B.emo(K1B.cur.L,'hurt',1.2);
  floatText(o.pos.clone().add(new V3(0,o.body.position.y+3.4,0)),'Отвлёк!','#ffd76a');if(K1B.fx)K1B.fx.leaves(o.pos.clone().add(new V3(0,o.body.position.y+1,0)),8,{up:0.5,spd:1.4});return true;};
// поза и место руки на каждом кадре смахивания
function k1sPlace(S){const o=S.o,b=o.body,L=o.L,t=S.t,s=S.r.hand.side||1,sm=k1sSm,cl=x=>clamp(x,0,1);let p,lift,ax,rz=0,yaw=0;
  if(t<S.dur){const kw=t/S.dur,kt=sm(cl(kw/0.55)),cock=S.A.clone().addScaledVector(S.n,-1.2);p=S.o0.clone().lerp(cock,kt);
    lift=0.5*sm(cl(kw/0.3))+(S.P.y+2.1)*sm(cl((kw-0.42)/0.38))+(kw>0.8?Math.sin(G.time*44)*0.05:0);ax=-1.1*sm(cl((kw-0.3)/0.5));rz=s*0.25*kt;}
  else if(t<S.dur+K1S_SD){const u=(t-S.dur)/K1S_SD,q=u<0.5?2*u*u:1-2*(1-u)*(1-u),a=S.A.clone().addScaledVector(S.n,-1.2),c=S.B.clone().addScaledVector(S.n,0.5);p=a.lerp(c,q);
    lift=S.P.y-1.3+3.9*Math.pow(2*q-1,2);ax=0.35;rz=-s*0.2;yaw=-s*0.25*(1-2*q);}
  else{const u=cl((t-S.dur-K1S_SD)/K1S_FD),q=1-(1-u)*(1-u);p=S.B.clone().addScaledVector(S.n,0.5+1.2*q);lift=S.P.y+2.6+0.6*q;ax=0.35-0.6*q;rz=-s*0.2*(1-q);}
  o.pos.x=p.x;o.pos.z=p.z;o.face=Math.atan2(S.n.x,S.n.z);o.g.rotation.y=o.face;b.position.set(0,lift,0);b.rotation.set(0,0,rz);o.inner.rotation.y=yaw;L.arm.rotation.x=ax;o.k1.ly=lift;}
function k1sSweep(dt,demo){const R=K1B.cur.ramps,L=K1B.cur.L;
  if(!demo)for(const r of R){if(r.k1sw||r.k1swDone)continue;const b=r.hand&&r.hand.k1bridge;if(!b)continue;
    if(!k1sOnRamp(r).some(h=>h.pos.y>1.4))continue;
    const o=W.enemies.find(q=>q.k1&&q.alive&&q!==r.hand&&q.state==='idle'&&!(q.dazeT>0)&&!q.k1.sweep&&G.time-(q.k1.busyT==null?-9:q.k1.busyT)>1.8);if(!o)continue;k1sStart(r,o);}
  for(const S of K1S1.sw.slice()){const r=S.r,o=S.o;S.t+=dt;
    if(!R.includes(r)||!o.alive||(o.state!=='idle'&&!(S.demo&&o.state==='demo'))||(W.flags.phase!==1&&!S.demo)){if(!S.demo)r.k1swDone=true;k1sSwEnd(S);continue;}
    if(S.t<S.dur){const kw=S.t/S.dur;if(kw<0.75&&!S.demo){const hs=k1sOnRamp(r);if(hs.length){const h=hs.sort((a,b)=>b.pos.y-a.pos.y)[0];S.u+=(k1sU(r.cols[0],h)-S.u)*Math.min(1,dt*6);k1sGeo(S);}}   // полоса — напротив бегущего, пока не заперта
      S.tel.set(S,kw);o.k1.sweep='wind';}
    else{if(S.tel){S.tel.del();S.tel=null;SFX.whoosh();}o.k1.sweep='strike';
      if(!S.hit&&S.t>=S.dur+K1S_SD*0.5){S.hit=true;if(!S.demo){r.k1swDone=true;k1sSwHit(S);}else if(S.onHit)S.onHit();}}
    k1sPlace(S);if(S.t>=S.dur+K1S_SD+K1S_FD)k1sSwEnd(S,true);}
  if(K1S1.sw.length&&typeof k1UpdateArms==='function')k1UpdateArms(K1B.cur,1e-6);}   // рука от плеча — вслед за кистью в этом же кадре
function k1sSwHit(S){const r=S.r,rp=r.cols[0],F=K1B.fx,P=S.P,n=S.n;shakeAll(0.03,0.2);
  if(F)for(let i=-2;i<=2;i++){const p=P.clone().addScaledVector(n,i*1.1);F.leaves(new V3(p.x,P.y+0.6,p.z),3,{up:0.4,spd:1.6,size:0.9});}
  for(const h of [active(0),active(1)]){if(!h||players[h.player].downed)continue;const u=k1sU(rp,h),along=Math.abs(u-S.u)*rp.len,at=h.pos.clone().add(new V3(0,2.2,0));if(along>K1S_BAND)continue;
    const side=Math.abs((h.pos.x-rp.x0)*n.x+(h.pos.z-rp.z0)*n.z),surf=rp.y0+(rp.y1-rp.y0)*u;
    if(h.grounded&&h.groundRef&&r.cols.includes(h.groundRef)){if(h.pos.y<0.6)continue;
      if(h.rollT>0||G.time-(h.lastRoll||-9)<0.45){floatText(at,'Ловко!','#b8e070');continue;}
      h.vel.set(n.x*5.5,4.5,n.z*5.5);h.grounded=false;h.groundRef=null;h.knockT=0.45;h.k1soft=true;SFX.knock();floatText(at,'Смахнула!','#ffb0a0');
      r.t=Math.max(r.t,5);const e=r.hand;if(e.state==='broken')e.t=Math.min(e.t,Math.max(0,e.bdur-5));}   // смахнуло — мост держится ещё 5 с: хватит на вторую попытку
    else if(!h.grounded&&side<1.8&&h.pos.y>surf+0.3)floatText(at,'Перепрыгнул!','#b8e070');}}
/* ---------- 3. «держи — беги» ---------- */
function k1sHold(){if(G.solo)return;for(const r of K1B.cur.ramps){const e=r.hand;if(!e||!e.alive||e.state!=='broken'||e.k1.fall||!e.k1bridge)continue;
    const hs=[active(0),active(1)].filter(h=>h&&!players[h.player].downed),holder=hs.find(h=>h.pos.y<1&&hd(h.pos,e.pos)<e.r+1.8),runner=hs.find(h=>h!==holder);
    if(holder&&G.time-(r.k1t0||G.time)<K1S1.holdMax){e.t=Math.min(e.t,Math.max(0,e.bdur-0.6));r.t=Math.max(r.t,1.2);
      if(!r.k1hold){r.k1hold=true;SFX.knock();floatText(holder.pos.clone().add(new V3(0,2.4,0)),'Держу!','#ffd76a');if(runner&&runner.pos.y<1)tip(runner.player,'Беги по руке — держат!',2.4);}}
    else r.k1hold=false;}}
/* ---------- 7. мягкое падение с моста ---------- */
function k1sSoft(){const cols=new Set();K1B.cur.ramps.forEach(r=>r.cols.forEach(c=>cols.add(c)));
  for(const pi of[0,1]){const h=active(pi);if(!h)continue;
    if(h.grounded&&h.groundRef&&cols.has(h.groundRef)){h.k1br=G.time;h.k1soft=false;continue;}
    if(!h.grounded&&h.pos.y>1.2&&G.time-(h.k1br||-9)<0.6&&h.vel.y<1)h.k1soft=true;
    if(!h.k1soft)continue;
    if(!h.grounded){if(h.vel.y<-6)h.vel.y=-6;continue;}
    h.k1soft=false;h.vel.y=3.4;h.grounded=false;const F=K1B.fx;if(F)F.leaves(new V3(h.pos.x,0.4,h.pos.z),8,{up:0.6,spd:1.4,cols:[0x9acb48,0x6aa338]});
    try{tone(180,0.18,'sine',0.2,420);}catch(err){}if(K1B.cur.ramps.length)tip(pi,'Ещё раз — по руке!',2);}}
/* ---------- 8. камера на мост ---------- */
{const _cam=K1B.fx.cam;K1B.fx.cam=function(){const base=_cam();const B=K1S1.br;if(!base||!B||W.flags.phase!==1)return base;const t=G.time-B.t;if(t<0||t>1.9)return base;
  const w=t<0.4?k1sSm(t/0.4):t>1.45?1-k1sSm((t-1.45)/0.45):1,look=B.from.clone().lerp(B.to,0.5);look.y=2.4;const pos=look.clone().add(new V3(B.side*9,5.5,12));
  base.look.lerp(look,w);base.pos.lerp(pos,w);return base;};}
// бьют вторую руку, пока она замахивается смахнуть, — «Отвлёк!»; любой удар по руке — она занята 1,8 с
{const _eh=enemyHit;enemyHit=function(e,h){if(e&&e.k1&&W&&W.levelId==='1-B'&&e.alive&&e.state!=='broken'){e.k1.busyT=G.time;if(e.k1.swS)K1S1.distract(e);}return _eh.apply(this,arguments);};}
K1S1.start=k1sStart;K1S1.step=k1sSweep;
{const _ll=loadLevel;loadLevel=function(i){K1S1.br=null;K1S1.sw.length=0;K1S1.look=0;K1S1.lookW=0;_ll(i);};}
{const _st=step;step=function(dt){_st(dt);const c=K1B.cur;if(!c||!W||W.levelId!=='1-B')return;try{k1sLook(dt);
    if(W.flags.phase===1&&c.ramps&&!K1N.demo){k1sNewRamps();k1sSweep(dt);k1sHold();k1sSoft();}}catch(err){console.error('k1s1',err);}};}
