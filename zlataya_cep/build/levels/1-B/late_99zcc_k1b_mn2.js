/* ============================== РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: ЭТАП 2 — МИНЬОНЫ: БЕЛКА-ШИШКОМЁТКА, МОХОНОГИ, БЕЛКА-ПЕРЕГРЫЗКА ============================== */
// Миньоны работают на механику пряток, а не просто бьют героев:
// • Белка-шишкомётка (А) — сидит на ветке ёлки у края поляны; жёлтый круг под героем — шишка летит (жёлтый = щит). Закрылся щитом — шишка отскакивает в ближайшего двойника:
//   ложный лопается шишками, настоящий охает и светится золотым обручем 2,2 с (третий способ найти его, кроме струны и взора); двойников рядом нет — шишка в саму белку: оглушена 5 с.
//   Кувырок — мимо. Не закрылся — минус лепесток. Круг 1 — одна белка, круг 2 — две (Лёгкий — одна, бросает реже).
// • Мохоноги (Б) — круг 2: лешачата-проказники бегут за ложными двойниками и топчут им ложные мох-следы (подсказка «следы у настоящего» путается). Один удар — разлетаются мхом;
//   Совиный взор их не обманет. Через 9 с из-за ёлок выбегает следующий (не больше двух, Лёгкий — один).
// • Белка-перегрызка (В) — появляется, когда натянута струна: бежит к ней и грызёт (тать-паутинник в беличьей шубке, tatFoe). Встал на струну — отскочит; пока грызёт — открыта,
//   удар гасит угольки; красный сигнал — кувырок. Круг 1 — со Среднего, круг 2 — всегда. Струн нет — убегает на ёлку.
// Во время роликов миньоны молчат; на этапе 3 — убегают. FIN.k1b.mn2.auto=false — без миньонов (старые боты, helpers.js); свой бот — tfin_k1bmn2.
const K1M2={auto:true,sq:[],mo:[],cones:[],gn:null,gnCd:3,moCd:3,round:-1,on:false,seen:{},
  st:{throws:0,hits:0,shields:0,dodges:0,pops:0,reveals:0,stuns:0,moSpawn:0,moPop:0,gnSpawn:0,gnCut:0,gnGone:0}};K1B.mn2=K1M2;
const K1M2C={fur:hp(0xc8682a),furL:hp(0xe8904a),furD:hp(0x8a4418),cone:hp(0x8a5a32),coneL:hp(0xb07a48)};
const K1M2_SQS=1.8;   // белка на ветке — крупнее: читается с камеры арены
const k1m2P=()=>{try{return genPath();}catch(e){return 'mid';}};
/* ---------- белка: туловище, голова с кисточками, пушистый хвост, лапки со шишкой ---------- */
function k1m2Squirrel(){const g=new THREE.Group(),body=k1G(g,0,0,0),C=K1M2C;
  fk(body,K=>{K.add(hSph(0.3,8,6),C.fur,tm(0,0.42,0,0,0,0,0.95,1.15,0.85),{noise:0.02});K.add(hSph(0.2,8,6),K1C.cream,tm(0,0.4,0.17,0,0,0,0.8,1.0,0.6),{noise:0.01});
    for(const s of[-1,1])K.add(hSph(0.08,6,4),C.furD,tm(s*0.14,0.1,0.12,0,0,0,1,0.6,1.5));});
  const head=k1G(body,0,0.82,0.04);fk(head,K=>{K.add(hSph(0.22,8,6),C.fur,tm(0,0,0,0,0,0,1,0.95,1),{noise:0.015});K.add(hSph(0.1,6,4),K1C.cream,tm(0,-0.07,0.15,0,0,0,1.2,0.8,0.8));
    for(const s of[-1,1]){K.add(KP.cone(0.07,0.2,4),C.fur,tm(s*0.12,0.22,-0.02,0,0,-s*0.25));K.add(KP.cone(0.03,0.1,4),C.furD,tm(s*0.145,0.35,-0.02,0,0,-s*0.25));   // уши с кисточками
      K.add(hSph(0.055,6,4),K1C.white,tm(s*0.085,0.04,0.17));K.add(hSph(0.032,6,4),K1C.night,tm(s*0.09,0.045,0.215),{kN:0});}
    K.add(hSph(0.032,5,4),K1C.night,tm(0,-0.03,0.25),{kN:0});});
  const tail=k1G(body,0,0.3,-0.25);fk(tail,K=>{[[0,0,0,0.16],[0,0.28,-0.18,0.22],[0,0.6,-0.24,0.27],[0,0.9,-0.14,0.25],[0,1.08,0.05,0.19]].forEach((p,i)=>K.add(hSph(p[3],7,5),i%2?C.fur:C.furL,tm(p[0],p[1],p[2]),{noise:0.03}));});
  const paws=k1G(body,0,0.6,0.22);fk(paws,K=>{for(const s of[-1,1])K.add(KP.cyl(0.04,0.05,0.24,5),C.furD,tm(s*0.1,0,0,0.6,0,0));});
  const cone=k1G(paws,0,0.06,0.13);fk(cone,K=>{K.add(KP.cone(0.12,0.3,7),C.cone,tm(0,0,0,Math.PI,0,0),{noise:0.02});K.add(KP.cone(0.08,0.12,6),C.coneL,tm(0,0.1,0,Math.PI,0,0));});
  k1Dyn(g);return {g,body,head,tail,paws,cone};}
// шишка в полёте: тёмная шишка и жёлтый ореол (жёлтый — щит)
function k1m2ConeMesh(){const g=new THREE.Group();fk(g,K=>{K.add(KP.cone(0.16,0.42,7),K1M2C.cone,tm(0,0,0,Math.PI,0,0),{noise:0.02});K.add(KP.cone(0.11,0.16,6),K1M2C.coneL,tm(0,0.14,0,Math.PI,0,0));});
  const s=new THREE.Sprite(new THREE.SpriteMaterial({map:K1_SOFT,color:0xffe070,transparent:true,opacity:0.75,blending:THREE.AdditiveBlending,depthWrite:false}));s.scale.setScalar(1.3);g.add(s);
  k1Add(g);k1Dyn(g);return g;}
/* ---------- белка-шишкомётка на ветке ёлки ---------- */
K1M2.squirrel=function(a){const c=K1B.cur,C=c.C,R=c.R,x=C.x+Math.cos(a)*(R-2.2),z=C.z+Math.sin(a)*(R-2.2),y=2.0;   // на конце длинной ветки — не в хвое ёлки
  const m=k1m2Squirrel();m.g.position.set(x,y,z);m.g.rotation.y=Math.atan2(C.x-x,C.z-z);W.group.add(m.g);
  const br=new THREE.Group();br.position.set(x,y-0.05,z);br.rotation.y=Math.atan2(C.x-x,C.z-z);W.group.add(br);   // ветка из ствола ёлки
  fk(br,K=>{K.add(KP.cyl(0.1,0.18,3.6,6),K1C.bark,tm(0,0,-1.6,Math.PI/2,0,0),{noise:0.02});K.add(hIco(0.26),K1C.leafD,tm(0.1,0.14,-1.2),{s:0.1});K.add(hIco(0.22),K1C.leaf,tm(-0.1,0.12,-2.4),{s:0.1});});k1Dyn(br);
  m.g.scale.setScalar(0.01);K1F.anim(0.5,k=>{m.g.scale.setScalar(K1M2_SQS*CINE.E.outBack(k));});K1F.leaves(new V3(x,y+0.6,z),8,{spd:1.2,up:0.6});
  const q={a,x,y,z,m,br,st:'idle',t:0,cd:rand(2.5,4),tgt:null,tele:null,wd:1,stars:null};K1M2.sq.push(q);return q;};
function k1m2SqDel(q,run){const i=K1M2.sq.indexOf(q);if(i>=0)K1M2.sq.splice(i,1);if(q.tele){q.tele.del();q.tele=null;}if(q.stars)q.stars.forEach(s=>W.group.remove(s));
  if(run){K1F.leaves(q.m.g.position.clone(),10,{spd:1.4,up:0.8});K1F.anim(0.5,k=>{q.m.g.position.y=q.y+k*2.4;q.m.g.scale.setScalar(K1M2_SQS*(1-k));},()=>{W.group.remove(q.m.g);W.group.remove(q.br);});}
  else{W.group.remove(q.m.g);W.group.remove(q.br);}}
// цель: ближний живой герой на земле, в которого ещё не летит шишка
function k1m2Pick(q){let best=null,bd=24;for(const pi of[0,1]){const h=active(pi);if(!h||players[pi].downed||h.cling||h.pos.y>3)continue;if(K1M2.cones.some(c=>c.h===h&&c.kind==='in')||K1M2.sq.some(o=>o!==q&&o.tgt===h&&o.st==='wind'))continue;
    const d=Math.hypot(h.pos.x-q.x,h.pos.z-q.z);if(d<bd){bd=d;best=h;}}return best;}
const k1m2Cd=()=>({easy:[8,10],mid:[5.5,7.5],hard:[4.5,6]})[k1m2P()]||[5.5,7.5];
const k1m2Wd=()=>({easy:1.3,mid:1.05,hard:0.9})[k1m2P()]||1.05;
// поза белки: k — доля замаха (лапы со шишкой над головой), hop — подскок
function k1m2SqPose(q,dt){const m=q.m,t=G.time+q.a*3;let w=0;if(q.st==='wind')w=Math.min(1,q.t/q.wd);
  m.paws.rotation.x=-2.2*CINE.E.outCubic(w)+(q.st==='after'&&q.t<0.25?1.6*(1-q.t/0.25)-0.4:0);m.cone.visible=q.st==='idle'?q.cd<2.2:q.st==='wind';
  m.tail.rotation.x=Math.sin(t*2.2)*0.12-w*0.35;m.tail.rotation.z=Math.sin(t*1.3)*0.1;m.head.rotation.y=q.st==='wind'&&q.tgt?Math.max(-0.7,Math.min(0.7,Math.atan2(q.tgt.pos.x-q.x,q.tgt.pos.z-q.z)-m.g.rotation.y)):Math.sin(t*0.9)*0.35;
  m.body.position.y=q.st==='stun'?0:Math.abs(Math.sin(t*(q.st==='wind'?9:3)))*0.05;m.body.rotation.z=q.st==='stun'?0.5+Math.sin(G.time*5)*0.1:0;
  if(q.st==='stun'){if(!q.stars)q.stars=k1dStars(q);q.stars.forEach((s,i)=>{const a=G.time*4+i*2.1;s.visible=true;s.position.set(q.x+Math.cos(a)*0.8,q.y+2.3,q.z+Math.sin(a)*0.8);});}
  else if(q.stars)q.stars.forEach(s=>{s.visible=false;});}
// бросок: шишка летит к герою (самонаводится — от неё не убежать, только щит или кувырок)
K1M2.throwAt=function(q,h,o){o=o||{};const g=k1m2ConeMesh(),p0=new V3(q.x,q.y+1.8,q.z);g.position.copy(p0);
  const c={kind:'in',q,h,g,p0,t:0,dur:o.dur||0.75,tele:o.tele||null,demo:!!o.demo,onEnd:o.onEnd||null};K1M2.cones.push(c);K1M2.st.throws++;try{SFX.whoosh();}catch(e){}return c;};
function k1m2Dbl(p,maxD){let best=null,bd=maxD||14;for(const d of(W.doubles||[])){if(d.state==='gone')continue;const dd=hd(d.pos,p);if(dd<bd){bd=dd;best=d;}}return best;}
function k1m2PopFake(d){if(!d||d.state==='gone'||d.real)return;d.state='gone';makeCones(d.pos,14);W.group.remove(d.m.g);SFX.crash();floatText(d.pos.clone().add(new V3(0,3,0)),'Шишки!','#e0c090');K1M2.st.pops++;K1B.cheer('hit');}
function k1m2Reveal(d){if(!d||!d.real||d.state==='gone')return;d.k1mRev=2.2;K1M2.st.reveals++;if(d.k2&&d.state==='walk'&&d.k2.mode!=='swap'){d.k2.mode='peek';d.k2.t=0;}   // охнул и присел
  floatText(d.pos.clone().add(new V3(0,3.4,0)),'Ой! Попали!','#ffd76a');try{tone(660,0.12,'triangle',0.08,990);}catch(e){}if(K1B.fx)K1B.fx.leaves(d.pos.clone().add(new V3(0,2.5,0)),8,{spd:1.4,up:0.6});}
// золотой обруч над настоящим (как у Совиного взора): v — яркость 0…1 (ставится после k1dTick уровня)
K1M2.halo=function(d,v){const k=d&&d.k2;if(!k)return;if(!k.halo)k.halo=k1dHalo(d);const h=k.halo;h.g.visible=v>0.02;if(!h.g.visible)return;
  h.ring.rotation.z+=0.04;h.g.position.y=6.5+Math.sin(G.time*3)*0.2;h.ring.material.opacity=0.95*v;h.glow.material.opacity=0.8*v;h.beam.material.opacity=0.2*v;};
function k1m2ConeTick(c,dt){c.t+=dt;const k=Math.min(1,c.t/c.dur),g=c.g;g.rotation.x+=dt*9;g.rotation.z+=dt*5;
  if(c.kind==='in'){const h=c.h,to=new V3(h.pos.x,h.pos.y+1.1,h.pos.z);g.position.lerpVectors(c.p0,to,k);g.position.y+=2.2*Math.sin(Math.PI*k);
    if(c.tele){c.tele.g.position.x=h.pos.x;c.tele.g.position.z=h.pos.z;c.tele.set(0.55+0.45*k);}
    if(k<1)return false;if(c.tele){c.tele.flash();c.tele=null;}
    const pw=h.power&&h.power.t>0&&h.kind==='potap';
    if(!c.demo&&(!h.active||players[h.player].downed)){k1Del(g);return true;}
    if(h.guard||pw||c.forceGuard){   // щит: шишка отскакивает в ближнего двойника, нет его — в белку
      K1M2.st.shields++;try{SFX.parry();}catch(e){}burst(to.clone(),COL.yellow,12,5);floatText(h.pos.clone().add(new V3(0,(h.d?h.d.height:1.6)+0.6,0)),'Отбил шишку!','#ffe36b');
      const d=c.to||k1m2Dbl(h.pos);c.kind='out';c.t=0;c.p0=to.clone();c.dur=d?0.55:0.7;c.d=d;return false;}
    if(h.rollT>0||G.time-(h.lastRoll||-9)<0.35||c.forceMiss){K1M2.st.dodges++;floatText(h.pos.clone().add(new V3(0,1.8,0)),'Мимо!','#b8e070');burst(to.clone().setY(0.3),0x8a5a32,8,3);k1Del(g);return true;}
    if(!c.demo&&damageHero(h,{kind:'hazard',ref:{pos:new V3(c.q.x,0,c.q.z)}})){K1M2.st.hits++;floatText(h.pos.clone().add(new V3(0,2.2,0)),'Шишкой!','#e0c090');}
    burst(to.clone(),0x8a5a32,10,4);k1Del(g);if(c.onEnd)c.onEnd('hit');return true;}
  // отскок: к двойнику (или назад в белку)
  const d=c.d,q=c.q,to=d?new V3(d.pos.x,2.4,d.pos.z):new V3(q.x,q.y+0.9,q.z);g.position.lerpVectors(c.p0,to,k);g.position.y+=1.2*Math.sin(Math.PI*k);
  if(k<1)return false;k1Del(g);
  if(d){if(c.demo){if(c.onEnd)c.onEnd(d.real?'real':'fake',d);return true;}if(d.real)k1m2Reveal(d);else k1m2PopFake(d);}
  else if(q&&K1M2.sq.includes(q)){q.st='stun';q.t=0;q.tele&&q.tele.del();q.tele=null;q.tgt=null;K1M2.st.stuns++;try{SFX.knock();}catch(e){}floatText(new V3(q.x,q.y+2.2,q.z),'Ой! Сама попалась!','#ffd76a');}
  if(c.onEnd)c.onEnd('back');return true;}
function k1m2SqTick(q,dt){q.t+=dt;
  if(q.st==='idle'){q.cd-=dt;if(q.cd<=0&&!q.demo){const h=k1m2Pick(q);if(h&&(W.doubles||[]).some(d=>d.state!=='gone')){q.st='wind';q.t=0;q.tgt=h;q.wd=k1m2Wd();q.tele=K1F.teleObj(h.pos.x,h.pos.z,1.15,'yellow');try{SFX.yellow();}catch(e){}}else q.cd=1;}}
  else if(q.st==='wind'){const h=q.tgt;if(!h||players[h.player].downed){if(q.tele)q.tele.del();q.tele=null;q.st='idle';q.cd=1.5;return;}
    if(q.tele){q.tele.g.position.x=h.pos.x;q.tele.g.position.z=h.pos.z;q.tele.set(0.55*q.t/q.wd);}
    if(q.t>=q.wd){K1M2.throwAt(q,h,{tele:q.tele});q.tele=null;q.st='after';q.t=0;}}
  else if(q.st==='after'){if(q.t>0.6){q.st='idle';q.tgt=null;const r=k1m2Cd();q.cd=rand(r[0],r[1]);}}
  else if(q.st==='stun'){if(q.t>5){q.st='idle';q.cd=1.5;}}}
/* ---------- мохоноги: лешачата-проказники топчут ложные мох-следы за двойниками ---------- */
function k1m2Mo(x,z){const g=new THREE.Group();g.position.set(x,0,z);W.group.add(g);const inner=new THREE.Group();inner.scale.setScalar(1.7);g.add(inner);
  const L=foeLook('leshonok',inner,FOE.leshonok),em=M(0xfff3a0,{emissive:0xfff3a0,emissiveIntensity:1});
  for(const sd of[-1,1]){part(inner,new THREE.SphereGeometry(0.1,10,8),em,sd*0.16,L.eyeY,L.eyeZ);part(inner,new THREE.SphereGeometry(0.045,8,6),MAT.dark,sd*0.16,L.eyeY,L.eyeZ+0.09);}
  fk(inner,K=>{for(const s of[-1,1])K.add(hSph(0.15,6,4),K1C.mossL,tm(s*0.15,0.06,0.05,0,0,0,1.1,0.6,1.6),{noise:0.03});});   // моховые лапти
  k1Dyn(g);const o={g,inner,L,pos:g.position,alive:true,d:null,lp:null,acc:0,t:0,flee:0};
  o.hit={pos:o.pos,r:0.85,push:false,alive:()=>o.alive&&W.flags.phase===2&&!G.cine,onHit:h=>k1m2MoPop(o,h)};W.hittables.push(o.hit);
  K1F.puff(x,0.8,z,5,0xb8d8a8);K1M2.mo.push(o);K1M2.st.moSpawn++;return o;}
function k1m2MoDel(o){o.alive=false;const i=W.hittables.indexOf(o.hit);if(i>=0)W.hittables.splice(i,1);const j=K1M2.mo.indexOf(o);if(j>=0)K1M2.mo.splice(j,1);W.group.remove(o.g);}
function k1m2MoPop(o,h){if(!o.alive)return;K1M2.st.moPop++;const p=o.pos.clone();k1m2MoDel(o);K1F.puff(p.x,0.7,p.z,6,0x9acb48);K1F.leaves(p.clone().add(new V3(0,0.8,0)),14,{spd:1.8,up:1,cols:[0x9acb48,0x6aa338,0x86b552]});
  try{SFX.knock();tone(300,0.14,'sine',0.07,520);}catch(e){}floatText(p.clone().add(new V3(0,1.9,0)),'Мох-мох!','#b8e070');K1B.cheer('hit');K1M2.moCd=9;}
function k1m2MoTick(o,dt){const C=K1B.cur.C,t=(o.t+=dt);
  if(!o.d||o.d.state==='gone'||o.d.real){const fakes=(W.doubles||[]).filter(d=>!d.real&&d.state!=='gone'&&!K1M2.mo.some(q=>q!==o&&q.d===d));o.d=fakes[Math.floor(Math.random()*fakes.length)]||null;o.lp=null;}
  let tx=null,tz=null,sp=5;
  const hh=[0,1].map(pi=>active(pi)).filter(h=>h&&!players[h.player].downed).sort((a,b)=>hd(a.pos,o.pos)-hd(b.pos,o.pos))[0];
  if(hh&&hd(hh.pos,o.pos)<2.6){o.flee=0.5;}
  if(o.flee>0&&hh){o.flee-=dt;const dx=o.pos.x-hh.pos.x,dz=o.pos.z-hh.pos.z,dd=Math.hypot(dx,dz)||1;tx=o.pos.x+dx/dd*2;tz=o.pos.z+dz/dd*2;sp=3.6;}   // увёртывается от героя
  else if(o.d){const d=o.d,lp=o.lp||d.pos.clone();const vx=d.pos.x-lp.x,vz=d.pos.z-lp.z,vl=Math.hypot(vx,vz);o.lp=d.pos.clone();
    if(vl>0.001){o.bx=vx/vl;o.bz=vz/vl;}tx=d.pos.x-(o.bx||0)*1.4;tz=d.pos.z-(o.bz||0)*1.4;}   // за двойником, след в след
  if(tx!=null){const dx=tx-o.pos.x,dz=tz-o.pos.z,dd=Math.hypot(dx,dz);if(dd>0.25){const s=Math.min(dd,sp*dt);o.pos.x+=dx/dd*s;o.pos.z+=dz/dd*s;o.g.rotation.y=Math.atan2(dx,dz);o.acc+=s;
      if(o.acc>1.3){o.acc=0;K1F.print(o.pos.x,o.pos.z);}}}   // ложный мох-след — такой же, как у настоящего
  const rr=Math.hypot(o.pos.x-C.x,o.pos.z-C.z);if(rr>10.6){o.pos.x=C.x+(o.pos.x-C.x)/rr*10.6;o.pos.z=C.z+(o.pos.z-C.z)/rr*10.6;}
  o.inner.position.y=Math.abs(Math.sin(t*12))*0.12;o.inner.rotation.z=Math.sin(t*12)*0.08;if(o.L.hat)o.L.hat.rotation.z=Math.sin(t*6)*0.15;}
function k1m2MoSpawn(){const c=K1B.cur,C=c.C,cl=K1B.crowdL||[],q=cl[Math.floor(Math.random()*cl.length)];let x,z;
  if(q){const dx=C.x-q.x,dz=C.z-q.z,d=Math.hypot(dx,dz)||1;x=q.x+dx/d*1.4;z=q.z+dz/d*1.4;}else{const a=-Math.PI/2+rand(-1,1);x=C.x+Math.cos(a)*10;z=C.z+Math.sin(a)*10;}
  const o=k1m2Mo(x,z);if(!K1M2.seen.mo){K1M2.seen.mo=true;banner('Мохоноги!','#b8e070',2.6,'топчут ложные мох-следы — бей их');for(const pi of[0,1])tip(pi,'Лешачата топчут ложные следы! Удар '+K(pi,'attack')+' — разлетятся мхом.',3.4);}return o;}
/* ---------- белка-перегрызка: тать-паутинник в беличьей шубке ---------- */
FOE.k1belka=Object.assign({},FOE.tat,{look:'k1belka',emb:2,sig:['red']});
FL.k1belka=(inner)=>{const C=K1M2C;fk(inner,K=>{K.add(hSph(0.3,8,6),C.fur,tm(0,0.38,-0.05,0.35,0,0,0.9,1.0,1.1),{noise:0.02});K.add(hSph(0.18,6,4),K1C.cream,tm(0,0.36,0.13,0,0,0,0.8,0.9,0.6));
    K.add(hSph(0.23,8,6),C.fur,tm(0,0.72,0.16),{noise:0.015});K.add(hSph(0.1,6,4),K1C.cream,tm(0,0.64,0.33,0,0,0,1.2,0.8,0.8));
    for(const s of[-1,1]){K.add(KP.cone(0.07,0.2,4),C.fur,tm(s*0.12,0.94,0.12,0,0,-s*0.25));K.add(KP.cone(0.03,0.1,4),C.furD,tm(s*0.145,1.07,0.12,0,0,-s*0.25));
      K.add(hSph(0.08,6,4),C.furD,tm(s*0.15,0.08,0.1,0,0,0,1,0.6,1.5));K.add(hSph(0.07,6,4),C.furD,tm(s*0.14,0.42,0.25,0,0,0,0.8,1.2,0.8));}
    K.add(hSph(0.032,5,4),K1C.night,tm(0,0.7,0.39),{kN:0});});
  const tail=fk(inner,K=>{[[0,0.3,-0.35,0.17],[0,0.6,-0.55,0.23],[0,0.92,-0.6,0.27],[0,1.2,-0.48,0.24],[0,1.36,-0.28,0.17]].forEach((p,i)=>K.add(hSph(p[3],7,5),i%2?C.fur:C.furL,tm(p[0],p[1],p[2]),{noise:0.03}));},{shadow:false});
  const jaw=[-1,1].map(sd=>{const g=k1G(inner,sd*0.035,0.6,0.37);fk(g,K=>{K.add(KP.cone(0.035,0.09,4),K1C.white,tm(0,-0.03,0,Math.PI,0,0));},{shadow:false});return g;});   // два зуба-резца: щёлкают, пока грызёт (tatFoe → L.jaw)
  return {eyeY:0.76,eyeZ:0.32,top:1.45,eyeS:0.85,lid:C.fur,tail,jaw};};
function k1m2Gn(x,z){const sv=FOE.tat;let e;FOE.tat=FOE.k1belka;try{e=tatFoe(x,z,{leash:16,scale:1.5});}finally{FOE.tat=sv;}
  e.k1gn=true;e.idleT=0;K1M2.gn=e;K1M2.st.gnSpawn++;K1F.leaves(new V3(x,1.5,z),10,{spd:1.4,up:0.8});
  W.onTatCut=(t,q)=>{if(q&&q.k1gn){K1M2.st.gnCut++;K1B.cheer('duck',0.6);}};
  if(!K1M2.seen.gn){K1M2.seen.gn=true;banner('Белка-перегрызка!','#ffd0a0',2.6,'грызёт струну — отгони ударом');for(const pi of[0,1])tip(pi,'Белка грызёт струну! Встань на струну или бей '+K(pi,'attack')+', пока грызёт.',3.4);}
  return e;}
function k1m2GnDel(e,run){if(!e)return;if(K1M2.gn===e)K1M2.gn=null;if(e.alive){e.alive=false;const i=W.enemies.indexOf(e);if(i>=0)W.enemies.splice(i,1);
    if(run){K1F.puff(e.pos.x,0.8,e.pos.z,5,0xd8c0a0);K1F.leaves(e.pos.clone().add(new V3(0,1,0)),8,{spd:1.4,up:0.8});}W.group.remove(e.g);}}
function k1m2GnTick(dt){const F=W.flags,P=k1m2P(),C=K1B.cur.C,e=K1M2.gn;
  const strs=W.threads.filter(t=>t.string&&!t.sag&&!t.ret);
  if(e){if(!e.alive){K1M2.gn=null;K1M2.gnCd=10;K1M2.st.gnGone++;return;}   // распутана ударом
    e.idleT=(!e.chew&&!strs.length&&e.state==='idle')?e.idleT+dt:0;if(e.idleT>3){k1m2GnDel(e,true);K1M2.gnCd=4;}return;}
  if(!(F.round>=1||P!=='easy'))return;   // круг 1 на Лёгком — без неё
  K1M2.gnCd-=dt;if(K1M2.gnCd>0||!strs.length)return;
  const t=strs[0],ex=t.sx+t.dx*t.len,ez=t.sz+t.dz*t.len,end=Math.hypot(t.sx-C.x,t.sz-C.z)>Math.hypot(ex-C.x,ez-C.z)?[t.sx,t.sz]:[ex,ez];
  const a=Math.atan2(end[1]-C.z,end[0]-C.x),r=Math.min(11.2,K1B.cur.R-0.8);k1m2Gn(C.x+Math.cos(a)*r,C.z+Math.sin(a)*r);}
/* ---------- ход этапа: круги, появление и уход ---------- */
function k1m2Clear(run){K1M2.sq.slice().forEach(q=>k1m2SqDel(q,run));K1M2.cones.forEach(c=>{k1Del(c.g);if(c.tele)c.tele.del();});K1M2.cones.length=0;
  K1M2.mo.slice().forEach(o=>{if(run)K1F.puff(o.pos.x,0.7,o.pos.z,4,0xb8d8a8);k1m2MoDel(o);});k1m2GnDel(K1M2.gn,run);K1M2.gn=null;}
K1M2.reset=function(){K1M2.sq.length=0;K1M2.mo.length=0;K1M2.cones.length=0;K1M2.gn=null;K1M2.gnCd=3;K1M2.moCd=3;K1M2.round=-1;K1M2.on=false;K1M2.seen={};for(const k in K1M2.st)K1M2.st[k]=0;};
// раскладка белок: круг 1 — одна (восток), круг 2 — две (и запад): по бокам поляны их видно с камеры арены; Лёгкий — всегда одна
K1M2.A=[-0.35,Math.PI+0.35];
K1M2.arm=function(round){const P=k1m2P(),want=round>=1&&P!=='easy'?2:1,A=K1M2.A;
  for(let i=K1M2.sq.length;i<want;i++){const q=K1M2.squirrel(A[i]);q.cd=rand(3,4.5)+i*2;}
  if(!K1M2.seen.sq){K1M2.seen.sq=true;later(0.6,()=>{if(W.flags.phase!==2||!K1M2.sq.length)return;banner('Белка-шишкомётка!','#ffd76a',2.6,'жёлтый круг — щит: шишка отскочит в двойника');});}};
function k1m2Tick(dt){const F=W.flags;
  if(F.phase!==2){if(K1M2.on){K1M2.on=false;k1m2Clear(true);}return;}
  if(!K1M2.on){K1M2.on=true;K1M2.round=-1;}
  if(K1M2.round!==(F.round||0)){K1M2.round=F.round||0;K1M2.arm(K1M2.round);K1M2.moCd=4;}
  const alive=(W.doubles||[]).some(d=>d.state!=='gone');
  for(const q of K1M2.sq.slice()){if(alive||q.st!=='idle')k1m2SqTick(q,dt);}
  // мохоноги — со второго круга
  if(F.round>=1&&alive){const max=k1m2P()==='easy'?1:2;K1M2.moCd-=dt;if(K1M2.mo.length<max&&K1M2.moCd<=0&&(W.doubles||[]).some(d=>!d.real&&d.state!=='gone')){k1m2MoSpawn();K1M2.moCd=K1M2.mo.length<max?4:9;}}
  for(const o of K1M2.mo.slice())k1m2MoTick(o,dt);
  k1m2GnTick(dt);}
// каждый кадр: шишки летят и в роликах-показах (demo), поза белок и обруч «попали» — всегда; ход боя — только в игре
{const _st=step;step=function(dt){_st(dt);const c=K1B.cur;if(!c||!W||W.levelId!=='1-B')return;
  try{for(let i=K1M2.cones.length-1;i>=0;i--){if(k1m2ConeTick(K1M2.cones[i],dt))K1M2.cones.splice(i,1);}
    for(const q of K1M2.sq)k1m2SqPose(q,dt);
    for(const d of(W.doubles||[])){if(d.k1mRev>0){d.k1mRev-=dt;K1M2.halo(d,d.state==='gone'?0:Math.min(1,d.k1mRev/0.3));}}
    if(K1M2.auto&&!G.cine&&G.state==='play'&&!(K1B.tut2&&K1B.tut2.on))k1m2Tick(dt);
    else if(!K1M2.auto&&K1M2.on){K1M2.on=false;k1m2Clear(false);}}
  catch(e){console.error('k1m2',e);K1M2.auto=false;}};}
{const _ll=loadLevel;loadLevel=function(i){K1M2.reset();_ll(i);};}
// подсказки: шишка летит в героя — «щит»; белка грызёт рядом — «бей»
K1M2.prompts=function(){for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'guard',()=>headOf(h()),()=>W.flags.phase===2&&(K1M2.cones.some(c=>c.kind==='in'&&c.h===h()&&c.t>c.dur*0.35)||K1M2.sq.some(q=>q.st==='wind'&&q.tgt===h()&&q.t>q.wd*0.5)),'шишка!');
    prompt(pi,'attack',()=>headOf(h()),()=>W.flags.phase===2&&!!K1M2.gn&&K1M2.gn.alive&&!!K1M2.gn.chew&&hd(K1M2.gn.pos,h().pos)<5,'гони белку!');}};
{const _in=K1B.init;K1B.init=function(ctx){_in(ctx);try{K1M2.prompts();}catch(e){console.error('k1m2 prompts',e);}};}
// напарник-бот (late_73g_companion_1b.js): шишка летит в него — щит
K1M2.cmp=function(h){const c=K1M2.cones.find(q=>q.kind==='in'&&q.h===h&&q.t>q.dur-0.35);if(c){cmpKey('guard',true);return true;}return false;};
