/* ============================== РЕЛИЗ final06 · 3-2: ГРОМОВОЙ БАРАН — ЭФФЕКТЫ, ЧЕСТНЫЕ ТЕЛЕГРАФЫ, ПОЛОСА БОССА, ЧИСТЫЙ ТЕКСТ ============================== */
// Механика боя (late_99o_sky32) не менялась по сути — здесь то, что делает её читаемой. Логика боя шлёт события (W.ram32.emit: intro, go, paw, lock,
// charge, stuck, unstuck, wrench, bonk, dry, horn, toStorm, rise, strikeWarn, strikeHit, guard, stompWarn, stomp, toLamb, fall, scared, finale…),
// этот модуль на них подписан и больше ничего не знает о ходе боя.
// · Разбег (этап 1): дорожка ровно в ширину зоны удара и до первой преграды (стена, стожок); к разбегу в ней растёт яркая полоса,
//   бегут шевроны; за 0,35 с до разбега направление запирается (вспышка, «!» над головой). Бег — пыль, шлейф, искры с рогов.
// · Увяз: волна и облачная вата, оглушённые звёздочки, кольцо-таймер из чёрточек вокруг стожка (сколько ещё стоит). Свет — шерсть
//   мягчеет (грозовая тьма и искры гаснут), без света — искрит дугами.
// · Гроза (этап 2): телеграф молнии сходится к тени-кругу, вертикальный луч, потом — толстая молния от тучи, вспышка (по настройке «Вспышки»),
//   подпалина на облаке, дождь; топот — расширяющийся круг, в конце зелёный («прыгай»), волна и пыль.
// · Пушок (этап 3): Баран «в нитях» — тёмная дымка у рогов; когда Баран стоит — зелёная дорожка от Пушка к батюшке; сердечки у батюшки.
// · Полоса босса: этапы, угольки, прогресс Пушка и строка состояния («бей в свете», «посвети», «увяз 4 с»…).
// · Подписи над героями: дубли и стопки не лезут друг на друга (2,0 с на дубль, выше — друг над другом, не больше трёх в одном месте).
// FIN.s32fx: всё по уровню 3-2, чистится само при смене уровня. Для ботов: FIN.s32fx.on=false — без эффектов; FIN.s32fx.stats — счётчики.
const S32={on:true,fx:[],B:null,litK:0,flashK:0,scr:null,lane:null,trail:null,stars:null,ring:null,bang:null,arcs:null,stats:{},hp:-1,barHtml:'',emb:-1,wet:0,dz:0,txt:[],rainOn:false,thornT:0,lastDust:0,lastSpark:0,tip:null};FIN.s32fx=S32;
{const _ll=loadLevel;loadLevel=function(i){S32.reset();_ll(i);if(W&&W.levelId==='3-2'&&W.ram32)S32.attach(W.ram32);};}
S32.reset=()=>{const rain=S32.rainOn;S32.fx.length=0;S32.B=null;S32.litK=0;S32.flashK=0;S32.lane=S32.trail=S32.stars=S32.ring=S32.bang=S32.arcs=S32.tgt=S32.stomp=S32.guide=S32.glow=null;S32.stats={};S32.hp=-1;S32.barHtml='';S32.emb=-1;S32.rainOn=false;S32.txt.length=0;S32.lastDust=S32.lastSpark=0;
  if(S32.scr)S32.scr.style.opacity='0';if(rain)try{FIN.k2fx.rain(false);}catch(e){}};   // дождь общий с 2-Б (K2FX): гасим, только если сами включали
const S32_Q=()=>typeof FXQ==='function'?FXQ():1;
const S32_C1=new THREE.Color(),S32_C2=new THREE.Color();
const S32_UP=new V3(0,1,0);
const stat32=k=>{S32.stats[k]=(S32.stats[k]||0)+1;};
/* ---------- рисунки ---------- */
const S32_CV=(w,h,draw)=>{const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new THREE.CanvasTexture(c);t.wrapS=t.wrapT=THREE.RepeatWrapping;return t;};
const S32_SOFT=S32_CV(64,64,x=>{const g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(0.35,'rgba(255,255,255,0.5)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,64,64);});
// дорожка: поперёк — яркая каёмка и прозрачная середина
const S32_LANE=S32_CV(64,4,(x,w,h)=>{const g=x.createLinearGradient(0,0,w,0);g.addColorStop(0,'rgba(255,255,255,0.95)');g.addColorStop(0.1,'rgba(255,255,255,0.6)');g.addColorStop(0.3,'rgba(255,255,255,0.28)');g.addColorStop(0.7,'rgba(255,255,255,0.28)');g.addColorStop(0.9,'rgba(255,255,255,0.6)');g.addColorStop(1,'rgba(255,255,255,0.95)');x.fillStyle=g;x.fillRect(0,0,w,h);});
// шеврон «V» остриём вниз (после поворота плоскости — в сторону бега)
const S32_CHEV=S32_CV(64,128,(x,w,h)=>{x.clearRect(0,0,w,h);x.strokeStyle='#fff';x.lineWidth=12;x.lineCap='round';x.lineJoin='round';x.beginPath();x.moveTo(10,28);x.lineTo(32,62);x.lineTo(54,28);x.stroke();});
// шлейф: ярко у головы (v = 0 — у Барана), к хвосту гаснет
const S32_TRAIL=S32_CV(8,64,(x,w,h)=>{const g=x.createLinearGradient(0,h,0,0);g.addColorStop(0,'rgba(255,255,255,0.9)');g.addColorStop(0.5,'rgba(255,255,255,0.3)');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.fillRect(0,0,w,h);});
const S32_STAR=S32_CV(64,64,x=>{x.translate(32,32);x.fillStyle='#ffe27a';x.strokeStyle='#fff6c0';x.lineWidth=3;x.beginPath();for(let i=0;i<10;i++){const a=i/10*Math.PI*2-Math.PI/2,r=i%2?11:28;i?x.lineTo(Math.cos(a)*r,Math.sin(a)*r):x.moveTo(Math.cos(a)*r,Math.sin(a)*r);}x.closePath();x.fill();x.stroke();});
const S32_EXC=S32_CV(64,64,x=>{x.fillStyle='#ff3a2a';x.strokeStyle='#fff';x.lineWidth=4;x.beginPath();x.arc(32,32,26,0,Math.PI*2);x.fill();x.stroke();x.fillStyle='#fff';x.font='900 40px system-ui,sans-serif';x.textAlign='center';x.textBaseline='middle';x.fillText('!',32,35);});
const S32_HEART=S32_CV(64,64,x=>{x.fillStyle='#ff7a9a';x.strokeStyle='#fff';x.lineWidth=3;x.beginPath();x.moveTo(32,54);x.bezierCurveTo(4,34,10,8,32,22);x.bezierCurveTo(54,8,60,34,32,54);x.fill();x.stroke();});
const S32_PL=(()=>{const g=new THREE.PlaneGeometry(1,1);g.rotateX(-Math.PI/2);return g;})();
const S32_RING=(()=>{const g=new THREE.RingGeometry(0.86,1,56);g.rotateX(-Math.PI/2);return g;})();
const S32_DISC=(()=>{const g=new FIN.orig.Circle(1,40);g.rotateX(-Math.PI/2);return g;})();
const S32_CYL=new FIN.orig.Cylinder(1,1,1,10,1,true);
const S32_BOX=new THREE.BoxGeometry(1,1,1);
const s32Mat=(col,op,o)=>new THREE.MeshBasicMaterial(Object.assign({color:col,transparent:true,opacity:op,depthWrite:false,side:THREE.DoubleSide},o||{}));
const s32Add=(col,op,o)=>s32Mat(col,op,Object.assign({blending:THREE.AdditiveBlending},o||{}));
function s32Mesh(geo,mat,order){const m=new THREE.Mesh(geo,mat);m.userData.s32own=true;m.renderOrder=order||6;m.castShadow=false;m.receiveShadow=false;return m;}
function s32Put(o){o.traverse(c=>{c.userData.noBatch=true;c.userData.noBatchL=true;c.raycast=()=>{};});W.group.add(o);return o;}   // лучи (укрытия, окклюзия) эффекты не трогают
function s32Kill(o){if(!o)return;if(o.parent)o.parent.remove(o);o.traverse(c=>{if(c.userData.s32own&&c.material)c.material.dispose();});}
function s32Spr(tex,col,op,add){const m=new THREE.SpriteMaterial({map:tex,color:col,transparent:true,opacity:op,depthWrite:false,blending:add?THREE.AdditiveBlending:THREE.NormalBlending});const s=new THREE.Sprite(m);s.userData.s32own=true;s.renderOrder=8;return s;}
/* ---------- маленький аниматор: переживает ролики, идёт и в замедлении боя ---------- */
S32.run=(dur,fn,end)=>{const a={t:0,dur,fn,end,dead:false,cancel(){a.dead=true;}};S32.fx.push(a);return a;};
S32.after=(t,fn)=>S32.run(t,null,fn);
function s32Tick(dt){for(let i=S32.fx.length-1;i>=0;i--){const a=S32.fx[i];if(a.dead){S32.fx.splice(i,1);continue;}a.t+=dt;const k=a.dur>0?Math.min(1,a.t/a.dur):1;if(a.fn){try{a.fn(k,dt);}catch(e){console.error('s32 fx',e);a.dead=true;}}
    if(k>=1||a.dead){S32.fx.splice(i,1);if(!a.dead&&a.end){try{a.end();}catch(e){console.error('s32 end',e);}}}}}
/* ---------- вспышка экрана (по настройке «Вспышки»), гром ---------- */
function s32Scr(){if(S32.scr&&S32.scr.isConnected)return S32.scr;const d=document.createElement('div');d.id='s32flash';
  d.style.cssText='position:fixed;inset:0;pointer-events:none;opacity:0;z-index:4;background:radial-gradient(ellipse at 50% 38%,rgba(232,242,255,0.95),rgba(170,200,255,0.55) 55%,rgba(120,150,255,0.22));mix-blend-mode:screen';document.body.appendChild(d);S32.scr=d;return d;}
S32.flash=a=>{const k=FIN.flashK?FIN.flashK():1;S32.flashK=Math.max(S32.flashK,clamp(a,0,1)*Math.min(1,k));};
S32.thunder=(delay,v)=>{S32.after(delay||0.3,()=>{try{if(FIN.aud&&FIN.aud.ready&&FIN.aud.ready()){FIN.aud.nz({type:'lowpass',f0:420,f1:130,f2:60,d:2.2,v:(v||0.2),a:0.02,q:0.5,wet:0.5});FIN.aud.thump({f0:68,f1:30,d:1.1,v:(v||0.2)*1.1});}else tone(52,1.4,'sawtooth',0.1*(v||0.2)*5,30);}catch(e){}});};
/* ---------- кирпичики: волна, облачная вата, молния ---------- */
S32.shock=(x,y,z,r,dur,col,a)=>{a=a||0.8;const m=s32Mesh(S32_RING,s32Add(col||0xcfe8ff,a));m.position.set(x,y+0.09,z);s32Put(m);
  S32.run(dur,k=>{const e=1-(1-k)*(1-k);m.scale.setScalar(0.3+r*e);m.material.opacity=a*(1-k);},()=>s32Kill(m));};
S32.cotton=(p,n,size,o)=>{o=o||{};n=Math.max(1,Math.round(n*S32_Q()));for(let i=0;i<n;i++){const s=s32Spr(S32_SOFT,o.col||0xffffff,o.a||0.7,false);s.position.set(p.x+rand(-0.5,0.5)*(o.spread||1),p.y+rand(0,0.4),p.z+rand(-0.5,0.5)*(o.spread||1));
    const sz=size*rand(0.6,1.15),a=rand(0,Math.PI*2),sp=(o.v||1.6)*rand(0.5,1),vx=Math.cos(a)*sp,vz=Math.sin(a)*sp,vy=(o.up||1.0)*rand(0.4,1);s.scale.setScalar(sz*0.5);s32Put(s);
    S32.run((o.life||0.9)*rand(0.8,1.2),(k,dt)=>{s.position.x+=vx*dt*(1-k);s.position.z+=vz*dt*(1-k);s.position.y+=vy*dt*(1-k*0.6);s.scale.setScalar(sz*(0.5+k*1.3));s.material.opacity=(o.a||0.7)*(1-k)*(1-k);},()=>s32Kill(s));}};
// толстая молния: ломаная из плоских балок (белая сердцевина + голубое свечение), ветки; fade — сколько живёт
S32.bolt=(from,to,o)=>{o=o||{};const pts=[from.clone()],N=o.n||8;for(let i=1;i<N;i++){const k=i/N;const p=from.clone().lerp(to,k);const j=(1-k*0.6)*(o.jit||1.1);p.x+=rand(-j,j);p.z+=rand(-j,j);pts.push(p);}pts.push(to.clone());
  const g=new THREE.Group(),core=s32Mat(0xffffff,1,{blending:THREE.AdditiveBlending}),glow=s32Mat(o.col||0x6a96ff,0.4,{blending:THREE.AdditiveBlending});
  const seg=(a,b,w)=>{const d=b.clone().sub(a),len=d.length();if(len<0.01)return;const c=s32Mesh(S32_BOX,core,9);c.scale.set(w,len,w);c.position.copy(a).addScaledVector(d,0.5);c.quaternion.setFromUnitVectors(S32_UP,d.normalize());g.add(c);
    const h=new THREE.Mesh(S32_BOX,glow);h.userData.s32shared=true;h.renderOrder=8;h.scale.set(w*3,len,w*3);h.position.copy(c.position);h.quaternion.copy(c.quaternion);g.add(h);};
  for(let i=0;i<pts.length-1;i++)seg(pts[i],pts[i+1],o.w||0.1);
  for(let b=0;b<(o.branches==null?2:o.branches);b++){const i=1+Math.floor(Math.random()*(N-3)),a=pts[i];let q=a.clone();for(let j=0;j<3;j++){const n=q.clone().add(new V3(rand(-1.4,1.4),-rand(0.8,1.6),rand(-1.4,1.4)));seg(q,n,(o.w||0.1)*0.5);q=n;}}
  g.userData.s32mats=[core,glow];s32Put(g);const life=o.life||0.38;
  S32.run(life,k=>{const f=k<0.25?1:Math.max(0,1-(k-0.25)/0.75),fl=Math.sin(k*70)>-0.35?1:0.45;core.opacity=f*fl;glow.opacity=0.4*f*fl;},()=>{core.dispose();glow.dispose();s32Kill(g);});return g;};
// подпалина: тёмное пятно с мягким краем, медленно тает
S32.scorch=(x,y,z,r,life)=>{const m=s32Mesh(S32_PL,s32Mat(0x0c1030,0.55,{map:S32_SOFT}),3);m.position.set(x,y+0.045,z);m.scale.set(r*2.4,1,r*2.4);m.rotation.y=rand(0,6);s32Put(m);
  S32.run(life||6,k=>{m.material.opacity=0.55*(1-k)*(k<0.05?k/0.05:1);},()=>s32Kill(m));};
/* ---------- события, которые нужны нескольким: звёздочки, сердечки ---------- */
function s32Pop(tex,p,s0,life,col,rise){const sp=s32Spr(tex,col||0xffffff,1,false);sp.position.copy(p);sp.scale.setScalar(0.01);s32Put(sp);
  S32.run(life,k=>{const pop=k<0.18?(k/0.18)*(1+0.3*Math.sin(k/0.18*Math.PI)):1;sp.scale.setScalar(s0*pop);sp.position.y=p.y+(rise||0.6)*k;sp.material.opacity=k>0.7?(1-k)/0.3:1;},()=>s32Kill(sp));return sp;}
S32.hit=(e)=>{const p=e.pos.clone();p.y+=e.L?e.L.top*e.s*0.55:1.6;S32.shock(e.pos.x,e.pos.y,e.pos.z,3.6,0.35,0xffd76a,0.7);if(FX.stars)FX.stars(p,7);if(FX.sparks)FX.sparks(p,8,0xfff0b0);stat32('hit');};
/* ============================ ДОРОЖКА РАЗБЕГА ============================ */
function s32LaneMk(){const g=new THREE.Group();g.visible=false;const L={g,fillK:0};
  L.base=s32Mat(0xe0301c,0.3,{map:S32_LANE});L.base=s32Mesh(S32_PL,L.base,5);L.fill=s32Mesh(S32_PL,s32Mat(0xff4a1c,0.5,{map:S32_LANE}),6);L.chev=s32Mesh(S32_PL,s32Mat(0xfff0c8,0.8,{map:S32_CHEV}),7);
  L.e1=s32Mesh(S32_PL,s32Mat(0xfff6d8,0.9),7);L.e2=s32Mesh(S32_PL,s32Mat(0xfff6d8,0.9),7);L.end=s32Mesh(S32_RING,s32Mat(0xe0301c,0.9),7);L.endD=s32Mesh(S32_DISC,s32Mat(0xe0301c,0.3),6);
  for(const m of[L.base,L.fill,L.chev,L.e1,L.e2,L.end,L.endD])g.add(m);L.base.position.y=0.02;L.fill.position.y=0.04;L.chev.position.y=0.06;L.e1.position.y=L.e2.position.y=0.07;L.end.position.y=0.08;L.endD.position.y=0.05;
  s32Put(g);return L;}
// длина дорожки: до стены арены или первого стожка на пути (так же считает сам разбег)
function s32LaneLen(p,d){const B=S32.B,e=B.e;let t=0;S32.laneEnd='wall';while(t<32){t+=0.3;const x=p.x+d.x*t,z=p.z+d.z*t;if(Math.abs(x)>9.6||z>-305.4||z<-326.6)return Math.max(2,t);
    for(const S of B.SB){if(S.gone>0)continue;if(Math.hypot(S.x-x,S.z-z)<e.r+(S.puffy?1.05:0.75)){S32.laneEnd=S.puffy?'puffy':'dry';return Math.max(2,t);}}}return 32;}
function s32Lane(on){const B=S32.B;if(!B||!B.e)return;let L=S32.lane;if(!L||!L.g.parent)L=S32.lane=s32LaneMk();L.g.visible=!!on&&S32.on;if(!on||!S32.on){if(B.lane)B.lane.visible=false;return;}
  if(B.lane)B.lane.visible=false;const e=B.e,d=B.dir,len=s32LaneLen(e.pos,d),w=B.hitR*2,k=clamp(B.t/B.dur,0,1),lock=B.locked,t=G.time;
  L.g.position.set(e.pos.x,B.AY+0.05,e.pos.z);L.g.rotation.y=Math.atan2(d.x,d.z);L.len=len;
  L.base.scale.set(w,1,len);L.base.position.z=len/2;
  const fk=lock?1:smooth(k),fl=Math.max(0.05,len*fk);L.fill.scale.set(w,1,fl);L.fill.position.z=fl/2;
  const dtl=clamp(G.time-(S32.laneT==null?G.time:S32.laneT),0,0.1);S32.laneT=G.time;S32_CHEV.repeat.set(1,len/3.4);S32_CHEV.offset.y=(S32_CHEV.offset.y+(0.9+k*3.2)*dtl)%1;L.chev.scale.set(w*0.78,1,len);L.chev.position.z=len/2;L.chev.material.opacity=lock?0.95:0.45+0.3*k;
  for(const[m,s]of[[L.e1,-1],[L.e2,1]]){m.scale.set(lock?0.3:0.16,1,len);m.position.x=s*w/2;m.position.z=len/2;m.material.opacity=lock?0.95:0.55+0.4*Math.abs(Math.sin(t*(6+k*14)));}
  S32_C1.setHex(0xf08a2a).lerp(S32_C2.setHex(0xe0200f),lock?1:k);L.base.material.color.copy(S32_C1);L.fill.material.color.copy(S32_C1);L.end.material.color.copy(S32_C1);L.endD.material.color.copy(S32_C1);
  if(lock){L.e1.material.color.setHex(0xffffff);L.e2.material.color.setHex(0xffffff);}else{L.e1.material.color.setHex(0xfff0b8);L.e2.material.color.setHex(0xfff0b8);}
  L.base.material.opacity=0.22+0.28*k+(lock?0.12*Math.abs(Math.sin(t*40)):0);const ek=S32.laneEnd,ec=ek==='puffy'?0x2ec060:ek==='dry'?0xf0a020:0xe0301c;L.end.material.color.setHex(ec);L.endD.material.color.setHex(ec);L.endD.material.opacity=ek==='puffy'?0.4:0.28;L.end.position.z=len;L.endD.position.z=len;const ps=1.3+0.2*Math.sin(t*10);L.end.scale.setScalar(ps*(lock?1.15:1));L.endD.scale.setScalar(1.15);}
/* ============================ БАРАН: шерсть, дуги, разбег, увяз ============================ */
function s32Arcs(){const A=[];const m=new THREE.LineBasicMaterial({color:0xcfe4ff,transparent:true,opacity:0.95,blending:THREE.AdditiveBlending,depthWrite:false});
  for(let i=0;i<5;i++){const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(new Float32Array(18),3));const l=new THREE.Line(g,m);l.frustumCulled=false;l.renderOrder=9;l.visible=false;l.userData.noBatch=true;l.userData.noBatchL=true;l.raycast=()=>{};W.group.add(l);A.push(l);}
  return {A,m,t:0};}
function s32ArcsUpd(e,dt,amt){let R=S32.arcs;if(!R||!R.A[0].parent)R=S32.arcs=s32Arcs();R.t-=dt;if(R.t>0)return;R.t=rand(0.06,0.13);const sc=(e.s||1),n=Math.round(R.A.length*amt*Math.max(0.5,S32_Q()));
  R.A.forEach((l,i)=>{if(i>=n){l.visible=false;return;}l.visible=true;const P=l.geometry.attributes.position.array;let x=e.pos.x+rand(-1,1)*1.1*sc,y=e.pos.y+rand(0.9,2.6)*sc,z=e.pos.z+rand(-1,1)*1.1*sc;
    for(let j=0;j<6;j++){P[j*3]=x;P[j*3+1]=y;P[j*3+2]=z;x+=rand(-0.35,0.35)*sc;y+=rand(-0.45,0.25)*sc;z+=rand(-0.35,0.35)*sc;}l.geometry.attributes.position.needsUpdate=true;});}
function s32Wool(e){const L=e.L,k=S32.litK;if(!L||!L.stormM)return;S32_C1.setHex(0x3a3e5a).lerp(S32_C2.setHex(0xcdd6f4),k*0.9);L.stormM.color.copy(S32_C1);S32_C1.setHex(0x2a4ad0).lerp(S32_C2.setHex(0xa8bcff),k);L.stormM.emissive.copy(S32_C1);L.stormM.emissiveIntensity*=1-0.75*k;
  if(L.storm)L.storm.forEach(m=>{if(m.visible)m.scale.multiplyScalar(1-0.3*k);});if(L.sparks)L.sparks.forEach(b=>{if(k>0.45)b.visible=false;});}
function s32Horn(e,k){const h=e.L&&e.L.horns&&e.L.horns[k];if(!h)return null;const p=new V3();h.children[1]?h.children[1].getWorldPosition(p):h.getWorldPosition(p);return p;}
function s32BossTick(dt){const B=S32.B,e=B.e;if(!e||!e.alive||!e.L)return;const L=e.L,ph=B.phase;
  // свет: шерсть мягчеет, пока на Барана светит перо (сама окраска — s32Wool, в post Барана)
  const lit=((e.litNow&&!G.cine)||ph===3||ph>=4)?1:0;S32.litK=damp(S32.litK,lit,7,dt);const k=S32.litK;
  if(ph<3&&(1-k)>0.3&&!(B.ai==='stuck'&&k>0.5))s32ArcsUpd(e,dt,(ph===2?1:0.7)*(B.ai==='charge'||B.ai==='paw'?1:0.5));else if(S32.arcs)S32.arcs.A.forEach(l=>{l.visible=false;});
  // разбег: пыль из-под копыт и искры с рогов
  if(B.ai==='paw'){if(G.time-S32.lastDust>0.16){S32.lastDust=G.time;const f=new V3(Math.sin(e.face),0,Math.cos(e.face));if(FX.dust)FX.dust(e.pos.clone().addScaledVector(f,1.3).setY(B.AY+0.05),3,0xf0eaff,0.9);}
    if(G.time-S32.lastSpark>0.1){S32.lastSpark=G.time;for(let i=0;i<2;i++){const p=s32Horn(e,i);if(p&&FX.sparks)FX.sparks(p,2,i?0xfff0b0:0xffd878);}}}
  if(B.ai==='charge'){const T=S32.trail;if(G.time-S32.lastDust>0.05){S32.lastDust=G.time;const g=new V3(e.pos.x,B.AY+0.1,e.pos.z);S32.cotton(g.clone().addScaledVector(B.dir,-1.2),1,1.9,{a:0.5,life:0.7,up:0.5,v:0.6});if(FX.dust&&Math.random()<0.5)FX.dust(g,2,0xe8e0ff,1);}
    if(T){T.on=true;T.m.visible=true;const d=e.pos.clone().sub(T.from).setY(0),len=Math.max(0.1,d.length());T.m.position.set((e.pos.x+T.from.x)/2,B.AY+0.08,(e.pos.z+T.from.z)/2);T.m.rotation.y=Math.atan2(d.x,d.z);T.m.scale.set(2.6,1,Math.min(len,9));
      if(len>9){T.m.position.set(e.pos.x-B.dir.x*4.5,B.AY+0.08,e.pos.z-B.dir.z*4.5);}T.m.material.opacity=0.65;}}
  else if(S32.trail&&S32.trail.on){const T=S32.trail;T.m.material.opacity-=dt*2.4;if(T.m.material.opacity<=0.02){T.m.visible=false;T.on=false;}}
  // увяз: звёздочки по кругу, кольцо-таймер
  const stuck=B.ai==='stuck'&&ph===1||B.ai==='stuck'&&ph===3,S=S32.stars;
  if(stuck&&e.state!=='dying'){if(!S||!S.g.parent)s32Stars(e);const R=S32.stars;R.g.visible=true;R.g.position.set(e.pos.x,e.pos.y+(L.top||2.7)*(e.s||1)+0.5,e.pos.z);R.g.children.forEach((sp,i)=>{const a=G.time*3.2+i/R.g.children.length*Math.PI*2;sp.position.set(Math.cos(a)*1.4,Math.sin(G.time*5+i)*0.14,Math.sin(a)*1.4);sp.scale.setScalar(0.5+0.08*Math.sin(G.time*8+i));});
    s32RingTick(e);}
  else{if(S&&S.g.parent)S.g.visible=false;if(S32.ring&&S32.ring.g)S32.ring.g.visible=false;}
  // угольки: обратная связь на каждый удар
  if(S32.emb<0)S32.emb=e.embers;if(e.embers<S32.emb&&e.state!=='dying')S32.hit(e);S32.emb=e.embers;}
function s32Stars(e){const g=new THREE.Group();for(let i=0;i<5;i++){const sp=s32Spr(S32_STAR,0xffffff,1,false);sp.scale.setScalar(0.5);g.add(sp);}s32Put(g);S32.stars={g};}
// кольцо-таймер: 28 чёрточек вокруг стожка, гаснут по мере того, как Баран выбирается
function s32RingTick(e){let R=S32.ring;const B=S32.B;if(!R||!R.g.parent){const g=new THREE.Group(),tk=[];const m=s32Mat(0xf0a000,0.95);for(let i=0;i<28;i++){const t=s32Mesh(S32_PL,m,7);const a=i/28*Math.PI*2;t.position.set(Math.cos(a)*3.1,0.1,Math.sin(a)*3.1);t.rotation.y=-a+Math.PI/2;t.scale.set(0.62,1,0.24);g.add(t);tk.push(t);}s32Put(g);R=S32.ring={g,tk,m,tot:S32.hold||6};}
  R.g.visible=true;R.g.position.set(e.pos.x,B.AY,e.pos.z);R.tot=S32.hold||R.tot;const left=Math.max(0,e.dazeT||0),tot=Math.max(1,R.tot),n=Math.ceil(28*clamp(left/tot,0,1));R.tk.forEach((t,i)=>{t.visible=i<n;});
  S32_C1.setHex(S32.litK>0.5?0xf0a000:0xe0501a);R.m.color.copy(S32_C1);R.m.opacity=0.6+0.35*Math.abs(Math.sin(G.time*(left<1.5?14:4)));}
// красное кольцо под тем, на кого нацелился Баран (пока дорожка не заперта — она ходит за ним)
function s32TgtTick(B){const on=B.ai==='paw'&&B.tgt&&B.phase!==2&&!G.cine;let R=S32.tgt;if(!R||!R.g.parent){const g=s32Mesh(S32_RING,s32Mat(0xe0301c,0.8),7);s32Put(g);R=S32.tgt={g};}
  R.g.visible=on;if(!on)return;const h=B.tgt;R.g.position.set(h.pos.x,h.pos.y+0.1,h.pos.z);R.g.scale.setScalar((B.locked?1.0:1.2)+0.12*Math.sin(G.time*14));R.g.material.opacity=0.55+0.4*Math.abs(Math.sin(G.time*(B.locked?20:10)));R.g.material.color.setHex(B.locked?0xff1a0a:0xe05a1a);}
// пухлый стожок виден издалека: мягкое сияние; в момент, когда польют, — кольцо и вата
function s32StogTick(B,dt){if(!S32.glow||!S32.glow[0]||!S32.glow[0].parent)S32.glow=B.SB.map(S=>{const sp=s32Spr(S32_SOFT,0x9fc8ff,0,true);sp.scale.setScalar(4.2);sp.position.set(S.x,S.y+0.9,S.z);s32Put(sp);return sp;});
  B.SB.forEach((S,i)=>{const sp=S32.glow[i],on=S.puffy&&S.gone<=0;if(on&&!S.fxPuffy){S.fxPuffy=true;S32.shock(S.x,S.y,S.z,3.2,0.45,0xbfe0ff,0.85);S32.cotton(new V3(S.x,S.y+1,S.z),6,1.8,{a:0.6,life:0.8,v:2.2,up:1.4,spread:1.6});if(FX.sparkle)FX.sparkle(new V3(S.x,S.y+1.3,S.z),8,0xdff0ff);stat32('puff');}
    else if(!on)S.fxPuffy=false;sp.material.opacity=damp(sp.material.opacity,on?0.55+0.12*Math.sin(G.time*3+i):0,6,dt);sp.visible=sp.material.opacity>0.02;});}
/* ============================ ГРОЗА: молнии, топот, дождь, облако ============================ */
function s32StrikeMk(s,B){const g=new THREE.Group();g.position.set(s.at.x,B.AY+0.06,s.at.z);
  const fill=s32Mesh(S32_DISC,s32Mat(0x14246a,0.3),6),rim=s32Mesh(S32_RING,s32Mat(0x8fd0ff,0.9),7),conv=s32Mesh(S32_RING,s32Mat(0xffffff,0.55),7),beam=s32Mesh(S32_CYL,s32Add(0xcfe4ff,0.0,{side:THREE.DoubleSide}),7),halo=s32Mesh(S32_PL,s32Mat(0x2a46c0,0.0,{map:S32_SOFT}),5);
  rim.scale.setScalar(1.5);fill.scale.setScalar(0.01);halo.scale.set(5,1,5);beam.scale.set(0.14,14,0.14);beam.position.y=7;halo.position.y=0.02;for(const m of[fill,rim,conv,beam,halo])g.add(m);s32Put(g);s.fx={g,fill,rim,conv,beam,halo};
  if(s.disc)s.disc.visible=false;if(s.ring)s.ring.visible=false;}
function s32StrikeTick(B,dt){for(const s of B.strikes){if(!s.fx)s32StrikeMk(s,B);const F=s.fx;if(!F||!F.g.parent)continue;
    if(!s.done){const k=clamp(s.t/s.dur,0,1),t=G.time;F.fill.scale.setScalar(Math.max(0.02,1.5*k));F.fill.material.opacity=0.22+0.42*k;F.conv.scale.setScalar(1.5+2.2*(1-k));F.conv.material.opacity=0.2+0.6*k;
      S32_C1.setHex(0x8fd0ff).lerp(S32_C2.setHex(0xffd23a),smooth(clamp((k-0.55)/0.45,0,1)));F.rim.material.color.copy(S32_C1);F.fill.material.color.setHex(0x14246a).lerp(S32_C2.setHex(0x6a4a10),smooth(clamp((k-0.55)/0.45,0,1)));F.rim.material.opacity=0.55+0.4*Math.abs(Math.sin(t*(8+k*18)));
      F.beam.material.opacity=0.55*smooth(clamp((k-0.45)/0.5,0,1))*(0.7+0.3*Math.sin(t*50));F.beam.scale.x=F.beam.scale.z=0.1+0.12*k;F.halo.material.opacity=0.25+0.4*k;
      if(Math.random()<dt*10*S32_Q()&&FX.sparks)FX.sparks(new V3(s.at.x+rand(-1.2,1.2),B.AY+0.2,s.at.z+rand(-1.2,1.2)),2,0x9fc8ff);}
    else if(!s.fxDone){s.fxDone=true;const F2=s.fx;S32.run(0.2,k=>{F2.fill.material.opacity*=0.8;F2.beam.material.opacity=0;F2.conv.material.opacity=0;F2.rim.material.opacity=0.9*(1-k);F2.halo.material.opacity=0.6*(1-k);},()=>s32Kill(F2.g));}
    if(s.bolt)s.bolt.visible=false;}}
function s32Strike(s,at,B){const top=new V3(at.x+rand(-1.2,1.2),B.AY+15,at.z+rand(-1,1)),g=new V3(at.x,B.AY+0.05,at.z);S32.bolt(top,g,{w:0.09,n:10,jit:0.9,branches:3});S32.bolt(top.clone().add(new V3(0.4,0,0.2)),g.clone().add(new V3(rand(-0.4,0.4),0,rand(-0.4,0.4))),{w:0.045,n:8,jit:1.3,branches:0,life:0.26,col:0xcfe0ff});
  S32.flash(0.7);S32.thunder(0.25+Math.random()*0.2,0.22);S32.shock(at.x,B.AY,at.z,4.2,0.5,0xdbe9ff,0.85);S32.shock(at.x,B.AY,at.z,2.4,0.32,0xfff2b0,0.9);S32.scorch(at.x,B.AY,at.z,1.5,6.5);S32.cotton(new V3(at.x,B.AY+0.2,at.z),5,1.6,{a:0.5,life:0.8,v:2.2,up:1.4,spread:2});
  if(FX.sparks)FX.sparks(new V3(at.x,B.AY+0.3,at.z),12,0xcfe4ff);if(FX.dust)FX.dust(new V3(at.x,B.AY+0.05,at.z),8,0xdad4f4,1.4);
  if(B.topM){const m=B.topM;m.emissiveIntensity=1.4;S32.run(0.4,k=>{m.emissiveIntensity=1.4-1.05*k;},()=>{m.emissiveIntensity=0.35;});}stat32('strike');}
function s32StompMk(B){const g=new THREE.Group(),fill=s32Mesh(S32_DISC,s32Mat(0x3a6ae0,0.2),6),rim=s32Mesh(S32_RING,s32Mat(0xffffff,0.85),7),edge=s32Mesh(S32_RING,s32Mat(0xffffff,0.5),7);edge.scale.setScalar(3.5);
  for(const m of[fill,rim,edge])g.add(m);g.position.set(B.ARC.x,B.TOP.y+0.12,B.ARC.z);g.visible=false;s32Put(g);return S32.stomp={g,fill,rim,edge};}
function s32StompTick(B,dt){const R=S32.stomp&&S32.stomp.g.parent?S32.stomp:s32StompMk(B);if(B.stompRing)B.stompRing.visible=false;
  const on=B.phase===2&&B.stompT>0&&B.stompT<1.1;R.g.visible=on;if(!on)return;const k=1-B.stompT/1.1,jump=B.stompT<0.55;
  R.rim.scale.setScalar(0.6+k*2.9);R.fill.scale.setScalar(0.6+k*2.9);R.fill.material.opacity=0.16+0.2*k;R.rim.material.opacity=0.6+0.4*Math.abs(Math.sin(G.time*(10+k*14)));
  R.rim.material.color.setHex(jump?0x5af078:0xffffff);R.fill.material.color.setHex(jump?0x2aa050:0x3a6ae0);R.edge.material.color.setHex(jump?0x5af078:0xffffff);R.edge.material.opacity=jump?0.85:0.35;}
function s32Stomp(B,onTop){const c=new V3(B.ARC.x,B.TOP.y+0.1,B.ARC.z);S32.shock(c.x,c.y,c.z,6.2,0.55,0xdff2ff,0.9);S32.shock(c.x,c.y,c.z,3.8,0.4,0xffffff,0.8);S32.cotton(c.clone().setY(c.y+0.1),8,2.2,{a:0.55,life:0.9,v:3.6,up:0.8,spread:3});
  if(FX.dust)FX.dust(c,12,0xe8e4ff,1.7);S32.flash(0.2);stat32('stomp');}
function s32Rain(on){if(S32.rainOn===on)return;S32.rainOn=on;try{const K=FIN.k2fx;if(K&&K.rain)K.rain(on,{c:new V3(0,S32.B.AY+2.5,-316),box:[12,11,12]});}catch(e){}}
/* ============================ ПУШОК: дорожка к батюшке, сердечки ============================ */
function s32GuideTick(B,dt){const LB=B.LB||W.lamb32,e=B.e;const want=B.phase===3&&LB&&LB.mode==='free'&&e&&e.alive&&(B.ai==='stuck'||B.ai==='bonk')&&!LB.hop&&LB.scared<=0&&!G.cine;
  let R=S32.guide;if(!R||!R.g.parent){const gt=S32_CHEV.clone();gt.needsUpdate=true;const g=new THREE.Group(),ch=s32Mesh(S32_PL,s32Mat(0x14983e,0.8,{map:gt}),7),ba=s32Mesh(S32_PL,s32Mat(0x2ec060,0.25,{map:S32_LANE}),6);g.add(ba);g.add(ch);g.visible=false;s32Put(g);R=S32.guide={g,ch,ba,k:0,tex:gt};}
  R.k=damp(R.k,want?1:0,want?8:6,dt);R.g.visible=R.k>0.03;if(!R.g.visible)return;
  const a=LB.pos,b=e.pos,d=new V3(b.x-a.x,0,b.z-a.z),len=Math.max(0.5,d.length()-e.r*0.9);R.g.position.set(a.x,B.AY+0.06,a.z);R.g.rotation.y=Math.atan2(d.x,d.z);
  R.ba.scale.set(1.5,1,len);R.ba.position.z=len/2;R.ch.scale.set(1.2,1,len);R.ch.position.z=len/2;R.tex.repeat.set(1,len/3.4);R.tex.offset.y=(G.time*1.6)%1;R.ba.material.opacity=0.25*R.k;R.ch.material.opacity=0.8*R.k*(0.7+0.3*Math.sin(G.time*8));
  if(Math.random()<dt*2.5&&hd(LB.pos,e.pos)<4.5)s32Pop(S32_HEART,e.pos.clone().add(new V3(rand(-0.6,0.6),(e.L?e.L.top*e.s:3)+0.6,rand(-0.6,0.6))),0.9,1.4,0xffffff,1.2);}
/* ============================ ПОЛОСА БОССА ============================ */
function s32Css(){if(document.getElementById('s32css'))return;const st=document.createElement('style');st.id='s32css';st.textContent=
  '#bossbar.s32b{padding:5px 14px 6px;text-align:center;min-width:340px;border-color:#9fd0ff;background:rgba(14,18,40,.72);color:#e8f0ff}'+
  '#bossbar.s32b .r1{display:flex;align-items:center;justify-content:center;gap:10px;font:800 14px system-ui}#bossbar.s32b .r1 b{letter-spacing:.02em}'+
  '#bossbar.s32b .r1 em{font-style:normal;font-weight:700;opacity:.8;font-size:13px}'+
  '#bossbar.s32b .dots{display:inline-flex;gap:4px}#bossbar.s32b .dots i{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.35)}#bossbar.s32b .dots i.on{background:#9fd0ff;border-color:#e8f6ff;box-shadow:0 0 6px #9fd0ff}#bossbar.s32b .dots i.dn{background:#8fe0a0;border-color:#8fe0a0}'+
  '#bossbar.s32b .r2{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:3px;font:700 13px system-ui}'+
  '#bossbar.s32b .hp{display:inline-flex;gap:3px}#bossbar.s32b .hp u{width:15px;height:9px;border-radius:3px;background:rgba(255,255,255,.14);text-decoration:none}#bossbar.s32b .hp u.on{background:#ffb060;box-shadow:0 0 5px #ff9a40}'+
  '#bossbar.s32b .pr{display:inline-block;width:120px;height:9px;border-radius:5px;background:rgba(255,255,255,.14);overflow:hidden;vertical-align:middle}#bossbar.s32b .pr i{display:block;height:100%;background:linear-gradient(90deg,#ff8aa8,#ffd0dc)}'+
  '#bossbar.s32b .chip{padding:1px 10px;border-radius:999px;white-space:nowrap}#bossbar.s32b .chip.ok{background:#3c7a48;color:#eaffee}#bossbar.s32b .chip.warn{background:#8a6a1c;color:#fff4cc}#bossbar.s32b .chip.bad{background:#8a2a2a;color:#ffe4e0;animation:s32pulse .6s ease-in-out infinite alternate}#bossbar.s32b .chip.info{background:rgba(255,255,255,.14);color:#e8f0ff}'+
  '@keyframes s32pulse{from{transform:scale(1)}to{transform:scale(1.06)}}';document.head.appendChild(st);}
function s32Chip(B){const e=B.e,ph=Math.floor(B.phase),LB=B.LB||W.lamb32,solo=G.solo;const puffy=B.SB.some(s=>s.puffy&&s.gone<=0),dry=B.SB.some(s=>!s.puffy&&s.gone<=0);const hl=HEROES.some(h=>heroLight(h));
  if(B.phase<1||B.phase===1.5||B.phase===2.5)return['info','…'];
  if(ph===1){if(B.ai==='paw')return['bad','Разбег! Уйди в сторону'];if(B.ai==='charge')return['bad','Беги в сторону!'];
    if(B.ai==='stuck'){const t=Math.ceil(e.dazeT||0);return e.litNow?['ok','Бей в свете! · '+t+' с']:['warn','Посвети на него пером · '+t+' с'];}
    if(e.state==='broken')return['ok','Пробой — добей его!'];
    if(!puffy&&dry)return['warn','Йоша: полей стожок'];if(!hl)return['info','Зажги перо — заманить Барана'];return['info','Свети за пухлым стожком'];}
  if(ph===2){const onTop=HEROES.some(h=>h.active&&h.pos.y>B.TOP.y-0.6&&hd(h.pos,B.ARC)<3.8);const bow=[B.RW,B.RE].some(R=>R&&R.bow.on),rain=[B.RW,B.RE].some(R=>R&&R.rain>0&&!R.bow.on);
    if(B.stompT>0&&B.stompT<1.1&&onTop)return['bad','Прыгай!'];if(B.strikes.some(s=>!s.done&&HEROES.some(h=>h.active&&hd(h.pos,s.at)<2.2)))return['bad','Молния! Уйди или щит'];
    if(onTop)return e.litNow?['ok','Бей, пока светит перо']:['warn','Посвети на Барана'];if(bow)return['ok','Радуга! Бегом наверх'];if(rain)return['warn','Дождик идёт — зажги перо у тучки'];return['info','Полей или выжми тучку — радуга'];}
  if(ph===3){if(LB&&LB.scared>0)return['warn','Пушок испугался'];if(B.ai==='stuck'||B.ai==='bonk')return['ok','Скорей! Веди Пушка к батюшке'];if(!puffy&&dry)return['warn','Йоша: полей стожок'];return['info','Баран бежит — прячьтесь, Пушка не пускайте'];}
  return['info',''];}
// в роликах и карточках полоса не мешает кадру
function s32Bar(bb){const B=S32.B;if(!B||B.phase<1||B.phase>=4||!B.e||G.cine){bb.style.display='none';return;}s32Css();const e=B.e,ph=Math.min(3,Math.max(1,Math.floor(B.phase))),nm=['','Таран','Гроза','Пушок'][ph],LB=B.LB||W.lamb32;
  const hint=T4&&T4.hint&&T4.hint.classList.contains('on');let r2;
  if(ph===3){const pr=LB&&LB.mode==='free'?clamp(1-hd(LB.pos,e.pos)/14,0.04,1):0.04;r2='<span class="pr"><i style="width:'+Math.round(pr*100)+'%"></i></span>';}
  else{const tot=Math.max(1,e.maxEmb||6),n=Math.max(0,Math.min(tot,e.state==='broken'?0:e.embers));let p='';for(let i=0;i<tot;i++)p+='<u'+(i<n?' class="on"':'')+'></u>';r2='<span class="hp">'+p+'</span>';}
  const c=s32Chip(B);const dots=[1,2,3].map(i=>'<i class="'+(i===ph?'on':i<ph?'dn':'')+'"></i>').join('');
  const html='<div class="r1"><b>Громовой Баран</b><span class="dots">'+dots+'</span><em>'+nm+'</em></div><div class="r2">'+r2+(hint?'':'<span class="chip '+c[0]+'">'+c[1]+'</span>')+'</div>';
  bb.className='s32b';bb.style.display='block';if(html!==S32.barHtml){S32.barHtml=html;bb.innerHTML=html;}}
/* ============================ ПОДПИСИ НАД ГЕРОЯМИ: без дублей и стопок ============================ */
const S32_MINOR=new Set(['Свет!','Живая вода!','Пухлый стожок!','Выжал тучку! Дождик!','Заплакала тучка — дождик!']),S32_SKIP=new Set(['Разбегается!']);   // S32_SKIP — то же самое уже говорят «!» над Бараном и дорожка
{const _ft=floatText;floatText=function(pos,text,color){if(S32.on&&W&&W.levelId==='3-2'&&S32.B&&S32.B.phase>=1&&S32.B.phase<4&&pos){if(S32_SKIP.has(String(text))){stat32('txtSkip');return;}const t=G.time,T=S32.txt;for(let i=T.length-1;i>=0;i--)if(t-T[i].t>2.6)T.splice(i,1);const s=String(text);
      if(T.some(q=>q.s===s&&t-q.t<2.0)){stat32('txtDup');return;}const near=T.filter(q=>t-q.t<1.3&&q.p.distanceTo(pos)<3.4).length;if(near>=3||near>=1&&S32_MINOR.has(s)){stat32('txtDrop');return;}
      const p=pos.clone();p.y+=0.75*near;T.push({t,s,p:p.clone()});return _ft.call(this,p,text,color);}return _ft.apply(this,arguments);};}
/* ============================ ПОДПИСКА НА СОБЫТИЯ БОЯ ============================ */
S32.attach=B=>{S32.B=B;B.fxLane=s32Lane;B.fxBar=s32Bar;s32Css();{const _ol=W.onLeave;W.onLeave=()=>{S32.reset();if(_ol)_ol();};}   // ушли с уровня — вспышка и дождь не остаются на меню
  B.on('intro',d=>{const e=d.e,_p=e.post;e.post=function(en,dt,k){_p.call(this,en,dt,k);if(S32.on)s32Wool(en);};
    const m=s32Mesh(S32_PL,s32Add(0x9fc8ff,0.0,{map:S32_TRAIL}),3);S32.trail={m,from:new V3(),on:false};m.scale.set(2.6,1,6);m.visible=false;s32Put(m);});
  B.on('roar',d=>{S32.flash(0.5);S32.shock(d.e.pos.x,B.AY,d.e.pos.z,6,0.7,0xcfe4ff,0.8);S32.thunder(0.1,0.25);stat32('roar');});
  B.on('paw',d=>{const e=B.e;if(S32.bang)s32Kill(S32.bang);S32.bang=s32Pop(S32_EXC,e.pos.clone().add(new V3(0,(e.L?e.L.top*e.s:3.2)+0.9,0)),1.5,B.dur,0xffffff,0);stat32('paw');});
  B.on('lock',()=>{const e=B.e;tone(1568,0.07,'square',0.08,1760);tone(1976,0.08,'square',0.07,null,0.08);S32.flash(0.12);S32.shock(e.pos.x,B.AY,e.pos.z,4,0.3,0xfff2c0,0.8);stat32('lock');});
  B.on('charge',d=>{const e=B.e;if(S32.trail){S32.trail.from.copy(e.pos);S32.trail.m.visible=true;}S32.shock(e.pos.x,B.AY,e.pos.z,5,0.4,0xffffff,0.7);S32.cotton(new V3(e.pos.x,B.AY+0.2,e.pos.z),6,2.2,{a:0.55,life:0.8,v:3,up:0.8,spread:2});if(FX.dust)FX.dust(new V3(e.pos.x,B.AY+0.05,e.pos.z),10,0xe8e0ff,1.6);
    if(FIN.cam32)FIN.cam32.kick('charge');stat32('charge');});
  B.on('stuck',d=>{const e=B.e,S=d.stog;S32.hold=d.dur;const p=new V3(S?S.x:e.pos.x,B.AY,S?S.z:e.pos.z);S32.shock(p.x,p.y,p.z,6,0.55,0xffffff,0.85);S32.shock(p.x,p.y,p.z,3.4,0.4,0xcfe4ff,0.8);S32.cotton(p.clone().setY(B.AY+0.8),10,2.4,{a:0.7,life:1.1,v:3.2,up:1.8,spread:2.4});
    if(FX.dust)FX.dust(p.clone().setY(B.AY+0.2),12,0xffffff,1.8);if(FX.stars)FX.stars(p.clone().setY(B.AY+3),8);G.hitstop=Math.max(G.hitstop||0,0.1);if(FIN.cam32)FIN.cam32.kick('stuck');stat32('stuck');});
  B.on('unstuck',d=>{const S=d.stog;if(S)S32.cotton(new V3(S.x,B.AY+1,S.z),8,2.2,{a:0.6,life:0.9,v:3,up:1.6,spread:2.4});if(S32.ring&&S32.ring.g)S32.ring.g.visible=false;});
  B.on('wrench',()=>{const e=B.e;S32.shock(e.pos.x,B.AY,e.pos.z,5,0.4,0xff9a7a,0.8);if(FX.sparks)FX.sparks(e.pos.clone().add(new V3(0,2,0)),12,0xffb08a);});
  B.on('bonk',()=>{const e=B.e;S32.cotton(new V3(e.pos.x,B.AY+0.4,e.pos.z),6,1.8,{a:0.6,life:0.8,v:2.4,up:1.2,spread:1.6});if(FX.stars)FX.stars(e.pos.clone().add(new V3(0,(e.L?e.L.top*e.s:3)+0.2,0)),6);S32.shock(e.pos.x,B.AY,e.pos.z,3.4,0.35,0xffffff,0.7);if(FIN.cam32)FIN.cam32.kick('bonk');stat32('bonk');});
  B.on('dry',d=>{const S=d.stog;if(S)S32.cotton(new V3(S.x,B.AY+1,S.z),10,2,{a:0.7,life:0.9,v:3.4,up:1.4,spread:2});});
  B.on('horn',()=>{const e=B.e;S32.shock(e.pos.x,B.AY,e.pos.z,3.2,0.3,0xffd9a0,0.8);if(FX.stars)FX.stars(e.pos.clone().add(new V3(0,(e.L?e.L.top*e.s:3),0)),6,0xffd9a0);});
  B.on('toStorm',()=>{S32.flash(0.65);S32.thunder(0.2,0.28);S32.cotton(B.e.pos.clone().add(new V3(0,1.4,0)),12,3,{a:0.7,life:1.4,v:4,up:1.2,spread:3});stat32('toStorm');});
  B.on('rise',()=>{S32.flash(0.5);S32.thunder(0.15,0.3);S32.shock(B.e.pos.x,B.AY,B.e.pos.z,8,0.7,0xcfe4ff,0.8);});
  B.on('go',d=>{if(d.n===2){s32Rain(true);}else s32Rain(false);S32.barHtml='';});
  B.on('toLamb',()=>{s32Rain(false);S32.flash(0.35);S32.thunder(0.1,0.18);});
  B.on('fall',()=>{S32.cotton(new V3(0,B.AY+0.5,-318),12,3,{a:0.7,life:1.2,v:4.5,up:1.6,spread:3});S32.shock(0,B.AY,-318,8,0.6,0xffffff,0.8);});
  B.on('snap',d=>{S32.flash(0.6);S32.shock(d.e.pos.x,B.AY,d.e.pos.z,7,0.7,0xfff0c0,0.9);});
  B.on('strikeWarn',d=>{s32StrikeMk(d.s,B);const e=B.e,hp=e&&s32Horn(e,Math.random()<0.5?0:1),at=d.s.at;if(hp)S32.bolt(hp,new V3(at.x,B.AY+15,at.z),{w:0.05,n:7,jit:0.8,branches:0,life:0.4,col:0xbfd8ff});stat32('strikeWarn');});
  B.on('strikeHit',d=>{s32Strike(d.s,d.at,B);});
  B.on('guard',d=>{const h=d.h;S32.shock(h.pos.x,h.pos.y,h.pos.z,2.6,0.4,0x9fd0ff,0.9);if(FX.sparks)FX.sparks(headOf(h),12,0x9fd0ff);stat32('guard');});
  B.on('stompWarn',()=>{stat32('stompWarn');});
  B.on('stomp',d=>{s32Stomp(B,d.onTop);if(FIN.cam32)FIN.cam32.kick('stomp');});
  B.on('scared',()=>{const LB=B.LB||W.lamb32;if(LB&&FX.drops)FX.drops(LB.pos.clone().add(new V3(0,0.9,0)),8);if(LB)s32Pop(S32_EXC,LB.pos.clone().add(new V3(0,1.5,0)),1.0,1.2,0xffffff,0.4);stat32('scared');});
  B.on('finale',()=>{S32.flash(0.3);s32Rain(false);s32HideAll();});};
function s32HideAll(){for(const o of[S32.lane&&S32.lane.g,S32.stars&&S32.stars.g,S32.ring&&S32.ring.g,S32.tgt&&S32.tgt.g,S32.stomp&&S32.stomp.g,S32.guide&&S32.guide.g,S32.trail&&S32.trail.m])if(o)o.visible=false;
  if(S32.arcs)S32.arcs.A.forEach(l=>{l.visible=false;});if(S32.glow)S32.glow.forEach(sp=>{sp.visible=false;sp.material.opacity=0;});}
/* ============================ ГЛАВНЫЙ ШАГ ============================ */
{const _r=render;render=function(){_r();if(S32.scr&&S32.scr.style.opacity!=='0'&&G.state!=='play'){S32.flashK=0;S32.scr.style.opacity='0';}};}   // пауза и меню — без вспышки поверх
{const _step=step;step=function(dt){_step(dt);if(!W||W.levelId!=='3-2'||!S32.on)return;const B=S32.B;if(!B)return;try{s32Tick(dt);
    if(S32.scr||S32.flashK>0.01){const d=s32Scr();S32.flashK=Math.max(0,S32.flashK-dt*4.2);d.style.opacity=(S32.flashK*0.5).toFixed(3);}
    if(B.e&&B.phase<4){s32BossTick(dt);s32StrikeTick(B,dt);s32StompTick(B,dt);s32GuideTick(B,dt);s32TgtTick(B);s32StogTick(B,dt);
      if(B.phase===2&&B.topM&&Math.random()<dt*0.9&&!S32.flashHold){B.topM.emissiveIntensity=0.9;S32.run(0.25,k=>{B.topM.emissiveIntensity=0.9-0.55*k;});}}
    else if(S32.guide&&S32.guide.g.parent)S32.guide.g.visible=false;
  }catch(err){console.error('s32 step',err);}};}
