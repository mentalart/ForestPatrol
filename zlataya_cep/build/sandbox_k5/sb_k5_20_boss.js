/* ============================== ПОЛИГОН КОЩЕЯ · БОСС: актёр, мимика и позы, приёмы с заполняющимися телеграфами, окна, камера арены (шаг 1) ============================== */
// Бой полигона упрощён: Кощей — модель makeKoschei (≈4,9 м), удары по нему принимает невидимый «пень» (как у мороков: спесь — угольки).
// Приёмы: перст-молния, руки из-под земли, ветер, шар (отбить щитом в последний миг — оглушён), волна меча (перепрыгнуть), прыжок.
// После двух приёмов — окно: 3 удара, потом «Очухался!». Спесь сбита — этап пройден.
const K5MOOD={smug:{bz:0.05,by:0,mo:0.35,mw:1.0,hp:0},mock:{bz:0.12,by:0.01,mo:0.9,mw:1.25,hp:-0.18},angry:{bz:-0.45,by:-0.01,mo:0.5,mw:1.3,hp:0.08},
  surprise:{bz:0.25,by:0.03,mo:0.95,mw:0.7,hp:-0.1},tired:{bz:0.2,by:-0.005,mo:0.6,mw:0.9,hp:0.25},fear:{bz:0.35,by:0.025,mo:0.8,mw:0.75,hp:-0.05},
  remorse:{bz:0.3,by:-0.01,mo:0.25,mw:0.8,hp:0.35},focus:{bz:-0.2,by:0,mo:0.2,mw:1.0,hp:0.05}};
function k5Boss(o){const B={o,stage:o.stage,state:'idle',t:0,cd:2.2,n:0,hits:0,mood:o.base||'smug',moodT:0,pose:'idle',poseT:0,face:{bz:0,by:0,mo:0.3,mw:1,hp:0},spesMax:o.spes||6,done:false,yaw:0};
  const A=makeKoschei();A.g.scale.setScalar(1.15);A.g.position.copy(o.pos);A.g.position.y=o.hover||0;B.A=A;const R=A.rig||{};B.R=R;
  if(R.mouth)R.mouth.userData.hold=true;
  // удары принимает невидимый «пень» (спесь — угольки), он не ходит и не бьёт сам
  const e=makeFoe('stump',o.pos.x,o.pos.z,{harmless:true,leash:0.1});e.g.visible=false;e.shell=null;e.r=1.7;e.noMove=true;e.noKill=true;e.embers=B.spesMax;e.maxEmb=B.spesMax;
  e.onFinisher=()=>{if(!B.done)k5BossDown(B);};e.k5=B;B.e=e;
  e.guardAll=()=>!!(o.guard&&o.guard());e.guardText='не пробить';
  K5SB.tick.push(dt=>{k5BossTick(B,dt);});
  k5BossBar(B);return B;}
function k5BossBar(B){const bb=$('bossbar');if(!bb)return;bb.style.display='block';const sp=Math.max(0,B.e.embers);
  bb.innerHTML='<b>Кощей Бессмертный</b> · этап '+B.stage+' из 5 — '+(K5SB.names['s'+B.stage]||'').replace(/^Этап \d · /,'')+' <span style="letter-spacing:2px;color:#ffb060">'+'●'.repeat(sp)+'<span style="opacity:.35">'+'●'.repeat(Math.max(0,B.spesMax-sp))+'</span></span>';}
function k5Mood(B,m,dur){if(!k5on('face'))return;B.mood=m;B.moodT=dur||1.4;}
function k5Pose(B,p,dur){B.pose=p;B.poseT=dur||0.9;}
function k5BossTick(B,dt){const A=B.A,R=B.R,e=B.e;if(!A.g.parent)return true;B.t+=dt;
  // повернуться к ближайшему герою
  const h=k5Near(A.g.position);if(h){const a=Math.atan2(h.pos.x-A.g.position.x,h.pos.z-A.g.position.z);B.yaw=angDamp(B.yaw,a,4,dt);A.g.rotation.y=B.yaw;}
  e.pos.x=A.g.position.x;e.pos.z=A.g.position.z;e.pos.y=0;e.cd=99;e.state=e.state==='broken'?'broken':(e.open>0?'idle':'idle');
  // лицо: цель — настроение (без «Мимики» — нейтрально)
  B.moodT-=dt;const base=k5on('face')?(B.moodT>0?B.mood:(B.state==='window'?'tired':o_base(B))):'smug';const F=K5MOOD[base]||K5MOOD.smug,f=B.face,k=Math.min(1,dt*8);
  for(const q of ['bz','by','mo','mw','hp'])f[q]+=(F[q]-f[q])*k;
  for(const [s,sg] of [['L',1],['R',-1]]){const b=R['brow'+s];if(b){b.rotation.z=f.bz*sg;if(b.userData.y0==null)b.userData.y0=b.position.y;b.position.y=b.userData.y0+f.by;}}
  if(R.mouth){const talk=base==='mock'?0.5+0.5*Math.abs(Math.sin(G.time*14)):1;R.mouth.scale.y=f.mo*talk;R.mouth.scale.x=f.mw;}
  if(R.head)R.head.rotation.x=f.hp+(base==='mock'?Math.sin(G.time*14)*0.05:0);
  // позы: замах читается до удара
  B.poseT-=dt;const P=k5on('face')?(B.poseT>0?B.pose:(B.state==='window'?'tired':'idle')):'idle';const br=Math.sin(G.time*1.6)*0.04;
  const T={armR:[0,0,0.15],armL2:[0,0,-0.08],chest:[0,0,0],hips:[0,0,0]};
  if(P==='bolt')T.armR=[-2.6,0,0.2];else if(P==='hands'){T.armR=[0.9,0,0.4];T.armL2=[0.9,0,-0.4];T.chest=[0.45,0,0];}
  else if(P==='wind'){T.armR=[0,0,1.5];T.armL2=[0,0,-1.5];}else if(P==='orb'){T.armR=[-1.4,0,0.6];T.chest=[-0.15,0,0];}
  else if(P==='sword'){T.armR=[-2.9,0,-0.4];T.chest=[-0.25,0.4,0];}else if(P==='leap'){T.chest=[0.5,0,0];T.hips=[0,0,0];}
  else if(P==='tired'){T.chest=[0.55,0,0];T.armR=[0.4,0,0.1];T.armL2=[0.4,0,-0.1];}else if(P==='down'){T.chest=[0.8,0,0];T.armR=[0.9,0,0.2];T.armL2=[0.9,0,-0.2];}
  for(const nm in T){const bn=R[nm];if(!bn)continue;if(!bn.userData.r0)bn.userData.r0=bn.rotation.clone();const r0=bn.userData.r0,t=T[nm];
    bn.rotation.x+=((r0.x+t[0]+(nm==='chest'?br:0))-bn.rotation.x)*Math.min(1,dt*7);bn.rotation.y+=((r0.y+t[1])-bn.rotation.y)*Math.min(1,dt*7);bn.rotation.z+=((r0.z+t[2])-bn.rotation.z)*Math.min(1,dt*7);}
  A.g.position.y=(B.o.hover||0)+(B.o.hover?Math.sin(G.time*1.3)*0.3:0)-(P==='leap'?0.4:0);
  if(B.done||G.cine)return;
  // окно: открыт до трёх ударов
  if(B.state==='window'){B.wt-=dt;e.open=Math.max(e.open,0.2);
    if(B.e.embers<B.emb0){B.hits+=B.emb0-B.e.embers;B.emb0=B.e.embers;k5Mood(B,'angry',0.8);k5BossBar(B);}
    if(B.hits>=3||B.wt<=0){B.state='idle';B.cd=1.6;e.open=0;k5Say(A.g.position.clone().add(new V3(0,5.2,0)),'Очухался!','#ffd0e0');}return;}
  e.open=0;if(B.o.guard&&B.o.guard()){B.cd=Math.max(B.cd,0.6);}
  if(B.state!=='idle')return;B.cd-=dt;if(B.cd>0)return;
  const L=B.o.attacks||['bolt'];if(B.n>=2&&!(B.o.guard&&B.o.guard())){B.n=0;k5Window(B,3.6);return;}
  const atk=L[Math.floor(Math.random()*L.length)];B.n++;B.state='atk';k5Attack(B,atk,()=>{B.state='idle';B.cd=rand(1.0,1.6);});}
function o_base(B){return B.o.base||'smug';}
function k5Near(p){let b=null,bd=1e9;for(const pi of [0,1]){if(G.solo&&pi===1)continue;const h=active(pi);if(players[pi].downed)continue;const d=hd(h.pos,p);if(d<bd){bd=d;b=h;}}return b||active(0);}
function k5Window(B,t){B.state='window';B.wt=t;B.hits=0;B.emb0=B.e.embers;B.e.open=t;k5Mood(B,'tired',t);k5Pose(B,'tired',t);k5Say(B.A.g.position.clone().add(new V3(0,5.2,0)),'Окно! Бей!','#ffe36b');}
function k5BossDown(B){B.done=true;B.state='down';k5Pose(B,'down',99);k5Mood(B,B.stage>=5?'remorse':'fear',99);k5BossBar(B);
  banner('Спесь сбита!','#ffd76a',2.2,'этап '+B.stage+' пройден · N — следующая сцена');if(B.o.onDone)B.o.onDone();}
// приёмы: поза (0,6–0,9 с) → телеграф заполняется → удар
function k5Attack(B,a,done){const A=B.A,p=A.g.position.clone();const tgt=()=>k5Near(p);const hand=new V3();
  const say=(t)=>{if(!k5on('fewText'))k5Say(p.clone().add(new V3(0,5.4,0)),t,'#d8b8ff');};
  k5Pose(B,a,a==='leap'?1.4:1.0);
  if(a==='bolt'){say('Перст-молния!');later(0.7,()=>{const hs=[0,1].filter(pi=>!(G.solo&&pi===1)).map(pi=>active(pi));let left=hs.length;
      for(const h of hs){const q=h.pos.clone();k5Tele(q,1.6,1.1,0xff4a3a,T=>{k5sBolt(T.pos.clone());if(k5sHurt(T.pos,1.6))k5Mood(B,'mock',1.2);if(--left<=0)done();});}});return;}
  if(a==='hands'){say('Руки из-под земли!');later(0.7,()=>{let left=3;for(let i=0;i<3;i++){const h=tgt(),q=h.pos.clone().add(new V3(rand(-2.5,2.5),0,rand(-2.5,2.5)));
      k5Tele(q,1.3,1.3,0xff6a3a,T=>{k5HandPop(T.pos);if(k5sHurt(T.pos,1.3))k5Mood(B,'mock',1.2);if(--left<=0)done();});}});return;}
  if(a==='wind'){say('Ветер буйный, налетай!');const dir=Math.random()<0.5?-1:1;k5Wind(B,dir,2.6,done);return;}
  if(a==='orb'){say('Шар тьмы!');later(0.8,()=>k5Orb(B,tgt(),done));return;}
  if(a==='sword'){say('Меч Бессмертного!');later(0.9,()=>k5Wave(B,done));return;}
  if(a==='leap'){say('Прыжок!');const h=tgt(),q=h.pos.clone();k5Tele(q,2.4,1.4,0xff3030,T=>{A.g.position.set(T.pos.x,0,T.pos.z);shakeAll(0.12,0.4);if(FIN.fx)FIN.fx.dust(T.pos.clone(),18,0x8a7a6a,1.6);
      AUD.ready()&&AUD.osc({f0:120,f1:35,d:0.5,v:0.4});if(k5sHurt(T.pos,2.4))k5Mood(B,'mock',1.2);done();k5Window(B,3.2);});return;}
  done();}
function k5HandPop(p){const g=new THREE.Group();g.position.copy(p);W.group.add(g);const m=M(0xe8e0cc);
  k5noRay(addMesh(new THREE.CylinderGeometry(0.12,0.16,1.4,6),m,0,0.7,0,g));for(let i=0;i<5;i++){const c=k5noRay(addMesh(new THREE.ConeGeometry(0.05,0.5,4),m,Math.cos(i/5*6.28)*0.18,1.55,Math.sin(i/5*6.28)*0.18,g));c.rotation.z=Math.cos(i)*0.4;}
  if(FIN.fx)FIN.fx.dust(p.clone(),12,0x6a5a4a,1.2);g.scale.set(1,0.01,1);anim(0.25,k=>g.scale.set(1,Math.max(0.01,k),1));later(1.2,()=>anim(0.4,k=>{g.scale.set(1,Math.max(0.01,1-k),1);if(k>=1)W.group.remove(g);}));}
function k5Wind(B,dir,dur,done){const t0={t:0};k5Say(new V3(dir*-9,3,0),dir>0?'Ветер →':'← Ветер','#e0f0ff');SFX.whoosh&&SFX.whoosh();
  K5SB.tick.push(dt=>{t0.t+=dt;if(K5SB.windStop>0){done();return true;}for(const pi of [0,1]){const h=active(pi);if(!h.grounded||h.guard)continue;h.vel.x+=dir*14*dt;}
    if(Math.random()<0.6)burst(new V3(-dir*12,rand(0.3,3),rand(-8,8)),0xffffff,1,8,0.5);if(t0.t>dur){done();return true;}});}
function k5Orb(B,h,done){const o=new THREE.Mesh(new THREE.SphereGeometry(0.45,10,8),new THREE.MeshBasicMaterial({color:0x6a2aff}));k5noRay(o);const p=B.A.g.position.clone().add(new V3(0,3.6,0));o.position.copy(p);W.group.add(o);
  const tg=new THREE.Mesh(new THREE.RingGeometry(0.7,0.9,24),new THREE.MeshBasicMaterial({color:0x2f7bff,transparent:true,opacity:0.8,depthWrite:false}));tg.rotation.x=-Math.PI/2;k5noRay(tg);W.group.add(tg);
  const S={t:0,back:false};K5SB.tick.push(dt=>{S.t+=dt;const to=S.back?B.A.g.position.clone().add(new V3(0,3.4,0)):h.pos.clone().add(new V3(0,1,0));tg.position.set(h.pos.x,h.pos.y+0.06,h.pos.z);tg.visible=!S.back;
    const d=o.position.distanceTo(to),sp=S.back?16:9;o.position.add(to.clone().sub(o.position).normalize().multiplyScalar(Math.min(d,sp*dt)));
    if(!S.back&&d<1.1){if(h.guard){S.back=true;SFX.parry&&SFX.parry();k5Mood(B,'surprise',1.6);k5Say(h.pos.clone().add(new V3(0,2,0)),'Отбил!','#9fd0ff');}
      else{W.group.remove(o);W.group.remove(tg);if(damageHero(h,{kind:'enemy',ref:{pos:o.position.clone()}}))k5Mood(B,'mock',1.2);done();return true;}}
    if(S.back&&d<1.4){W.group.remove(o);W.group.remove(tg);ringFx(B.A.g.position.clone(),0x6a2aff,3);done();k5Window(B,4.2);return true;}
    if(S.t>6){W.group.remove(o);W.group.remove(tg);done();return true;}});}
function k5Wave(B,done){const c=B.A.g.position.clone();const m=new THREE.Mesh(new THREE.TorusGeometry(1,0.18,6,48),new THREE.MeshBasicMaterial({color:0xb070ff,transparent:true,opacity:0.9}));k5noRay(m);m.rotation.x=Math.PI/2;m.position.set(c.x,0.4,c.z);W.group.add(m);
  AUD.ready()&&AUD.nz({f0:300,f1:2400,d:0.6,v:0.14,q:1.2});const S={r:1,hit:[false,false]};
  K5SB.tick.push(dt=>{S.r+=dt*7;m.scale.setScalar(S.r);m.material.opacity=Math.max(0,0.9-S.r/16);
    for(const pi of [0,1]){const h=active(pi);if(S.hit[pi]||players[pi].downed)continue;const d=hd(h.pos,c);if(Math.abs(d-S.r)<0.5&&h.pos.y<0.6&&h.rollT<=0){S.hit[pi]=true;damageHero(h,{kind:'hazard',ref:{pos:c}});k5Mood(B,'mock',1);}}
    if(S.r>15){W.group.remove(m);done();return true;}});}

/* ---------- камера арены (шаг 1): ниже и ближе, Кощей нависает; окно — наезд; начало этапа — крупно лицо ---------- */
function k5ArenaCam(B,extra){if(!k5on('cam')){W.camFn=null;return;}const T0=G.time;
  W.camFn=()=>{const a=G.solo?active(G.soloPi):active(0),b=G.solo?a:active(1),mid=new V3((a.pos.x+b.pos.x)/2,(a.pos.y+b.pos.y)/2,(a.pos.z+b.pos.z)/2);const K=B.A.g.position;
    const kh=(B.o.hover||0)+3.2;if(G.time-T0<2.2){const f=new V3(Math.sin(B.yaw),0,Math.cos(B.yaw));return {pos:K.clone().add(f.multiplyScalar(5.5)).add(new V3(0,kh+0.8,0)),look:K.clone().add(new V3(0,kh+1,0)),k:6};}
    const dir=mid.clone().sub(K);dir.y=0;const L=dir.length()||1;dir.divideScalar(L);const spread=hd(a.pos,b.pos);const win=B.state==='window';
    const dist=(win?8:11)+spread*0.45+(extra&&extra.dist||0),hgt=(win?3.6:5)+(extra&&extra.h||0);
    const pos=mid.clone().add(dir.clone().multiplyScalar(dist)).add(new V3(0,hgt,0));const look=mid.clone().lerp(new V3(K.x,kh*0.75,K.z),0.45);return {pos,look,k:3.5};};}
