/* ============================== РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: ЭТАП 1 — ЗВУК РУК, ВЗГЛЯД ЛЕШЕГО, МОСТ С НАПРЯЖЕНИЕМ, «ДЕРЖИ — БЕГИ», МЯГКОЕ ПАДЕНИЕ, КАМЕРА НА МОСТ ============================== */
// docs/29_leshy_proposals.md, «Этап 1: что улучшить дальше» (пункты 1–4, 7, 8; пункты 1, 5, 6 в руках — late_99z_k1b_hands.js). FIN.k1b.s1.
// 1. Кто бьёт — видно по Лешему: голова поворачивается к руке, которая замахивается, и Леший кренится на её сторону (ждущая рука «отдыхает» — в модуле рук).
// 2. Мост с напряжением: герой поднялся по мосту — вторая рука один раз сметает по нему (красная полоса заливается вдоль руки 1 с, на Лёгком 1,3 с):
//    прыжок или кувырок — «Ловко!», иначе героя смахивает с моста (без урона: мох пружинит; мост держится ещё 5 с — на вторую попытку). Вторая рука занята — смахнёт,
//    как освободится. Напарник-бот (late_73g) уходит кувырком.
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
const k1sOnRamp=r=>[active(0),active(1)].filter(h=>h&&h.grounded&&h.groundRef&&r.cols.includes(h.groundRef));
// красная полоса вдоль моста: рамка и заливка от ладони к плечу
function k1sTele(b){const a=new V3(b.from.x,0.16,b.from.z),c=b.to.clone().add(new V3(0,0.16,0)),dir=c.clone().sub(a),len=dir.length();dir.normalize();
  const q=new THREE.Quaternion().setFromUnitVectors(new V3(0,0,1),dir);
  const mk=op=>{const m=new THREE.Mesh(new THREE.BoxGeometry(1.7,0.05,1),new THREE.MeshBasicMaterial({color:0xff4a3a,transparent:true,opacity:op,depthWrite:false}));m.quaternion.copy(q);m.userData.noBatch=true;m.renderOrder=5;W.group.add(m);return m;};
  const fr=mk(0.22),fl=mk(0.5);fr.scale.z=len;fr.position.copy(a).addScaledVector(dir,len/2);
  return {set(k){const l=Math.max(0.01,len*k);fl.scale.z=l;fl.position.copy(a).addScaledVector(dir,l/2);fl.material.opacity=0.45+0.4*k;},
    del(){for(const m of[fr,fl]){W.group.remove(m);m.geometry.dispose();m.material.dispose();}}};}
function k1sSwEnd(S){const o=S.o;if(o&&o.k1){o.k1.sweep=null;o.k1.dk=0;if(o.state==='idle')o.cd=1.0;}if(S.tel)S.tel.del();S.tel=null;K1N.atkAt=G.time;K1S1.sw.splice(K1S1.sw.indexOf(S),1);}
function k1sSweep(dt){const R=K1B.cur.ramps,L=K1B.cur.L;
  for(const r of R){if(r.k1sw||r.k1swDone)continue;const b=r.hand&&r.hand.k1bridge;if(!b)continue;
    if(!k1sOnRamp(r).some(h=>h.pos.y>1.4))continue;
    const o=W.enemies.find(q=>q.k1&&q.alive&&q!==r.hand&&q.state==='idle'&&!(q.dazeT>0)&&!q.k1.sweep);if(!o)continue;
    const S={r,o,t:0,dur:genPath()==='easy'?1.3:1.0,tel:k1sTele(b)};r.k1sw=S;K1S1.sw.push(S);o.k1.sweep='wind';o.k1.dk=0;o.cd=99;o.tgt=null;
    K1B.emo(L,'mock',1.4);K1S1.wind({sig:'red',wdur:S.dur});}
  for(const S of K1S1.sw.slice()){const r=S.r,o=S.o;S.t+=dt;
    if(!R.includes(r)||!o.alive||o.state!=='idle'||W.flags.phase!==1){r.k1swDone=true;k1sSwEnd(S);continue;}
    if(S.t<S.dur){o.k1.dk=S.t/S.dur;S.tel.set(o.k1.dk);continue;}
    if(!S.hit){S.hit=true;r.k1swDone=true;o.k1.sweep='strike';S.tel.del();S.tel=null;k1sSwHit(r);}
    o.k1.dk=clamp((S.t-S.dur)/0.25,0,1);if(S.t>=S.dur+0.3)k1sSwEnd(S);}}
function k1sSwHit(r){const b=r.hand.k1bridge,F=K1B.fx,s=r.hand.side||1;SFX.whoosh();shakeAll(0.03,0.2);
  if(F)for(let i=1;i<=5;i++){const p=b.from.clone().lerp(b.to,i/6);F.leaves(new V3(p.x,p.y+0.6,p.z),3,{up:0.4,spd:1.6,size:0.9});}
  const dir=new V3(b.to.x-b.from.x,0,b.to.z-b.from.z).normalize();let px=dir.z,pz=-dir.x;if(px*s<0){px=-px;pz=-pz;}
  for(const h of k1sOnRamp(r)){if(h.pos.y<0.6)continue;const at=h.pos.clone().add(new V3(0,2.2,0));
    if(h.rollT>0||G.time-(h.lastRoll||-9)<0.45){floatText(at,'Ловко!','#b8e070');continue;}
    h.vel.set(px*5.5,4.5,pz*5.5);h.grounded=false;h.groundRef=null;h.knockT=0.45;h.k1soft=true;SFX.knock();floatText(at,'Смахнула!','#ffb0a0');
    r.t=Math.max(r.t,5);const e=r.hand;if(e.state==='broken')e.t=Math.min(e.t,Math.max(0,e.bdur-5));}}   // смахнуло — мост держится ещё 5 с: хватит на вторую попытку
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
{const _ll=loadLevel;loadLevel=function(i){K1S1.br=null;K1S1.sw.length=0;K1S1.look=0;K1S1.lookW=0;_ll(i);};}
{const _st=step;step=function(dt){_st(dt);const c=K1B.cur;if(!c||!W||W.levelId!=='1-B')return;try{k1sLook(dt);
    if(W.flags.phase===1&&c.ramps&&!K1N.demo){k1sNewRamps();k1sSweep(dt);k1sHold();k1sSoft();}}catch(err){console.error('k1s1',err);}};}
