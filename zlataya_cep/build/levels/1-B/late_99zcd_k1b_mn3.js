/* ============================== РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: ЭТАП 3 — МИНЬОНЫ ХОРОВОДА: КОРНИ-ПОДНОЖКИ И СОРОКА-ТРЕЩОТКА ============================== */
// • Корни-подножки (Г) — на дорожке впереди бегущего загорается белый круг (белый = прыжок, как у скакалки), из земли встаёт корень и стоит 1,8 с. Перепрыгнул — мимо.
//   Не перепрыгнул — корень держит героя (лента не мотается, скакалка его не трогает). Выручает напарник одним ударом по корню; сам — три удара; через 4,5 с корень отпускает сам.
//   Стоящий корень можно и сломать ударом. Круг 1 — по одному, круг 2 — до двух сразу.
// • Сорока-трещотка (Д) — круг 2: кружит над поляной, пикирует к бегущему, у которого есть витки; красный круг под ним (красный = кувырок). Кувыркнулся — мимо;
//   ударил сороку на подлёте — роняет блестяшки и улетает; не успел — уносит один намотанный виток (лепесток цел), лента на стволе сматывается.
// Пока «Тяни-потяни», Богатырский мах и между кругами — корни уходят в землю, сорока кружит высоко. FIN.k1b.mn3.auto=false — без миньонов (старые боты); бот — tfin_k1bmn3.
const K1M3={auto:true,roots:[],mag:null,cd:3,magCd:5,turn:0,seen:{},st:{roots:0,jumps:0,held:0,freedBy:0,freedSelf:0,freedT:0,smash:0,dives:0,steals:0,rolls:0,swats:0}};K1B.mn3=K1M3;
const k1m3P=()=>{try{return genPath();}catch(e){return 'mid';}};
const k1m3Wr=a=>{while(a>Math.PI)a-=2*Math.PI;while(a<-Math.PI)a+=2*Math.PI;return a;};
/* ---------- корень: три коряги и комья земли ---------- */
K1M3.rootMesh=function(x,z){const g=new THREE.Group();g.position.set(x,-2.1,z);g.rotation.y=rand(0,6);g.scale.setScalar(1.35);
  fk(g,K=>{for(let i=0;i<3;i++){const a=i/3*Math.PI*2,tilt=0.35+i*0.08;K.add(KP.cone(0.2,1.5,6),i%2?K1C.barkL:K1C.bark,tm(Math.cos(a)*0.28,0.65,Math.sin(a)*0.28,Math.sin(a)*tilt,0,-Math.cos(a)*tilt),{noise:0.04});
      K.add(KP.cone(0.08,0.5,5),K1C.barkD,tm(Math.cos(a)*0.62,1.15,Math.sin(a)*0.62,Math.sin(a)*1.1,0,-Math.cos(a)*1.1),{noise:0.03});K.add(hIco(0.12),K1C.leaf,tm(Math.cos(a)*0.55,1.35,Math.sin(a)*0.55),{s:0.1});}
    K.add(KP.cyl(0.55,0.75,0.3,8),K1C.mossD,tm(0,0.1,0),{noise:0.05});},{H:1.6});
  k1Add(g);return g;};
function k1m3Root(x,z,pi){const T=K1F.teleObj(x,z,1.0,'white'),g=K1M3.rootMesh(x,z),dur=({easy:1.5,mid:1.2,hard:1.05})[k1m3P()]||1.2;
  const r={x,z,pi,st:'tele',t:0,dur,tele:T,g,held:null,taps:0,hold:0,up:({easy:1.5,mid:1.8,hard:1.9})[k1m3P()]||1.8};
  r.hit={pos:new V3(x,0,z),r:0.8,push:false,alive:()=>r.st==='up'&&!G.cine,onHit:h=>k1m3RootHit(r,h)};W.hittables.push(r.hit);
  K1M3.roots.push(r);K1M3.st.roots++;try{tone(110,0.35,'sawtooth',0.06,80);}catch(e){}
  if(!K1M3.seen.root){K1M3.seen.root=true;banner('Корни-подножки!','#fff6dc',2.4,'белый круг — прыгай');}
  return r;}
function k1m3RootDown(r){if(r.st==='down')return;if(r.tele){r.tele.del();r.tele=null;}if(r.held)k1m3Release(r,null);r.st='down';r.t=0;}
function k1m3RootDel(r){const i=K1M3.roots.indexOf(r);if(i>=0)K1M3.roots.splice(i,1);const j=W.hittables.indexOf(r.hit);if(j>=0)W.hittables.splice(j,1);if(r.tele)r.tele.del();k1Del(r.g);}
function k1m3Release(r,by){const h=r.held;if(!h)return;r.held=null;h.k1root=null;h.iT=Math.max(h.iT||0,0.6);
  burst(new V3(r.x,0.9,r.z),0x8a5a32,14,4);K1F.leaves(new V3(r.x,1,r.z),8,{spd:1.6,up:0.8});try{SFX.brk();}catch(e){}
  if(by==='mate'){K1M3.st.freedBy++;floatText(h.pos.clone().add(new V3(0,2.2,0)),'Выручил!','#b8e070');K1B.cheer('hit');}
  else if(by==='self'){K1M3.st.freedSelf++;floatText(h.pos.clone().add(new V3(0,2.2,0)),'Вырвался!','#b8e070');}
  else if(by==='time'){K1M3.st.freedT++;floatText(h.pos.clone().add(new V3(0,2.2,0)),'Отпустил!','#fff3c0');}}
function k1m3RootHit(r,h){if(r.st!=='up')return;
  if(r.held){if(r.held===h){r.taps++;floatText(new V3(r.x,1.8,r.z),['Раз!','Два!','Три!'][Math.min(2,r.taps-1)],'#fff3c0');try{SFX.knock();}catch(e){}if(r.taps>=3){k1m3Release(r,'self');k1m3RootDown(r);}}
    else{k1m3Release(r,'mate');k1m3RootDown(r);}return;}
  K1M3.st.smash++;floatText(new V3(r.x,1.8,r.z),'Хрусть!','#e0c090');burst(new V3(r.x,0.9,r.z),0x8a5a32,12,4);try{SFX.crash();}catch(e){}k1m3RootDown(r);}
function k1m3Grab(r,h){r.held=h;h.k1root=r;r.hold=0;r.taps=0;r.hx=h.pos.x;r.hz=h.pos.z;K1M3.st.held++;try{SFX.knock();tone(140,0.3,'sawtooth',0.08,90);}catch(e){}
  floatText(h.pos.clone().add(new V3(0,2.2,0)),'Подножка!','#fff3c0');
  if(G.solo)tip(h.player,'Корень держит! Бей '+K(h.player,'attack')+' три раза — вырвешься.',3);
  else{tip(h.player,'Корень держит! Друг выручит ударом — или сам бей '+K(h.player,'attack')+' три раза.',3);tip(1-h.player,'Друга держит корень — ударь по корню '+K(1-h.player,'attack')+'!',3);}}
function k1m3RootTick(r,dt){r.t+=dt;const g=r.g;
  if(r.st==='tele'){r.tele.set(r.t/r.dur);g.position.y=-2.1+0.12*Math.sin(r.t*30)*(r.t/r.dur);   // земля дрожит
    if(r.t>=r.dur){r.tele.flash();r.tele=null;r.st='up';r.t=0;try{SFX.whoosh();}catch(e){}K1F.leaves(new V3(r.x,0.3,r.z),10,{spd:1.6,up:0.9,cols:[0x6a4630,0x8c6644,0x9acb48]});}}
  else if(r.st==='up'){g.position.y=-2.1+2.1*CINE.E.outBack(Math.min(1,r.t/0.22));g.rotation.z=Math.sin(G.time*7)*0.05;
    if(r.held){const h=r.held;r.hold+=dt;if(players[h.player].downed||!h.active||r.hold>(k1m3P()==='easy'?3:4.5)*(h.kind==='yosha'?1.35:1)){k1m3Release(r,'time');k1m3RootDown(r);}}
    else{for(const pi of k1sPis()){const h=active(pi);if(players[pi].downed||h.cling||h.k1root)continue;if(Math.hypot(h.pos.x-r.x,h.pos.z-r.z)>0.95)continue;
        if(h.pos.y>0.45||h.rollT>0){if(!r.jumped){r.jumped=true;K1M3.st.jumps++;spawnSpark(new V3(r.x,1.6,r.z),0xffe36b);floatText(new V3(r.x,2.2,r.z),'Перепрыгнул!','#b8e070');}continue;}
        k1m3Grab(r,h);break;}
      if(r.t>r.up)k1m3RootDown(r);}}
  else if(r.st==='down'){g.position.y=-2.1*Math.min(1,r.t/0.45);if(r.t>0.5)k1m3RootDel(r);}}
// держит: после физики — герой на месте, скакалка его не задевает
function k1m3Hold(){for(const r of K1M3.roots){const h=r.held;if(!h)continue;h.pos.x=r.hx;h.pos.z=r.hz;h.vel.x=0;h.vel.z=0;h.iT=Math.max(h.iT||0,0.15);
    h.face=Math.atan2(r.x-h.pos.x,r.z-h.pos.z)+Math.sin(G.time*14)*0.25;}}   // дёргается, вырываясь
// куда ставить корень: на дорожке впереди бегущего (≈1,3 с бега)
function k1m3Spot(h){const C=K1B.cur.C,dx=h.pos.x-C.x,dz=h.pos.z-C.z,r=Math.hypot(dx,dz),a=Math.atan2(dz,dx);if(r<3.4||r>9.8)return null;
  const om=(-Math.sin(a)*h.vel.x+Math.cos(a)*h.vel.z)/r,da=Math.max(0.45,Math.min(1.3,om*1.3)),rr=Math.max(3.8,Math.min(9.2,r)),aa=a+da;
  const x=C.x+Math.cos(aa)*rr,z=C.z+Math.sin(aa)*rr;if(K1M3.roots.some(q=>Math.hypot(q.x-x,q.z-z)<2.5))return null;return [x,z];}
/* ---------- сорока: чёрно-белая, длинный хвост, машет крыльями ---------- */
function k1m3MagMesh(){const g=new THREE.Group(),body=k1G(g,0,0,0),blk=hp(0x22262e),wht=K1C.white,blu=hp(0x2a4a8a);
  fk(body,K=>{K.add(hSph(0.32,8,6),blk,tm(0,0,0,0,0,0,0.8,0.75,1.25),{noise:0.01});K.add(hSph(0.24,8,6),wht,tm(0,-0.08,0.02,0,0,0,0.85,0.7,1.05));
    K.add(hSph(0.2,8,6),blk,tm(0,0.14,0.42),{noise:0.01});K.add(KP.cone(0.06,0.24,5),hp(0x3a3a3a),tm(0,0.12,0.66,Math.PI/2,0,0));
    for(const s of[-1,1]){K.add(hSph(0.05,6,4),wht,tm(s*0.1,0.2,0.54));K.add(hSph(0.028,5,4),K1C.night,tm(s*0.11,0.21,0.58),{kN:0});}
    K.add(KP.cyl(0.04,0.12,1.0,5),blu,tm(0,0.05,-0.8,Math.PI/2-0.15,0,0,1.4,1,0.4));});
  const wings=[-1,1].map(s=>{const w=k1G(body,s*0.22,0.08,0);fk(w,K=>{K.add(KP.cyl(0.02,0.02,0.75,4),blk,tm(s*0.36,0,0,0,0,Math.PI/2,1,1,6));K.add(KP.cyl(0.02,0.02,0.3,4),wht,tm(s*0.3,0.02,0.06,0,0,Math.PI/2,1,1,4));});return w;});
  const loot=k1G(g,0,-0.45,0.3);loot.visible=false;   // украденный виток в клюве — цветная петля
  const lm=new THREE.Mesh(new THREE.TorusGeometry(0.28,0.06,6,16),new THREE.MeshLambertMaterial({color:0xff8a3a,emissive:0xff8a3a,emissiveIntensity:0.4}));loot.add(lm);
  g.scale.setScalar(2.1);k1Add(g);k1Dyn(g);return {g,body,wings,loot,lm};}
function k1m3Mag(){const C=K1B.cur.C,m=k1m3MagMesh();const o={m,st:'circle',t:0,a:-Math.PI/2,tgt:null,tele:null,from:null,pos:m.g.position};
  m.g.position.set(C.x,9,C.z-12);o.hit={pos:new V3(),r:1.1,push:false,alive:()=>o.st==='dive'&&o.t>0.75&&!G.cine,onHit:h=>k1m3Swat(o,h)};W.hittables.push(o.hit);
  K1M3.mag=o;banner('Сорока-трещотка!','#ff9a8a',2.6,'красный круг — кувырок: утащит виток');try{for(let i=0;i<5;i++)tone(rand(1600,2200),0.05,'square',0.05,null,i*0.07);}catch(e){}return o;}
function k1m3MagDel(){const o=K1M3.mag;if(!o)return;K1M3.mag=null;const i=W.hittables.indexOf(o.hit);if(i>=0)W.hittables.splice(i,1);if(o.tele)o.tele.del();k1Del(o.m.g);}
const k1m3Chat=()=>{try{for(let i=0;i<4;i++)tone(rand(1500,2300),0.05,'square',0.05,null,i*0.08);}catch(e){}};
// есть что унести: виток или больше полвитка ленты
const k1m3Loot=pi=>{const i=k1sIdx(pi);return (K1S.prog[i]||0)-(K1S.base[i]||0);};
function k1m3Swat(o,h){if(o.st!=='dive')return;K1M3.st.swats++;try{SFX.parry();}catch(e){}const p=o.pos.clone();burst(p,0x22262e,12,5);
  for(let i=0;i<3;i++)spawnSpark(p.clone().add(new V3(rand(-0.6,0.6),0,rand(-0.6,0.6))),[COL.gold,0x6ad0ff,0xff6a8a][i]);floatText(p.clone().add(new V3(0,1,0)),'Отбил! Блестяшки!','#ffd76a');
  if(o.tele){o.tele.del();o.tele=null;}o.st='away';o.t=0;o.from=p;o.loot=false;k1m3Chat();}
function k1m3Steal(o,h){const pi=h.player,i=k1sIdx(pi),lap=K1S.laps[i]>0,amt=lap?Math.PI*2:Math.min(Math.PI,Math.max(0,k1m3Loot(pi)));
  K1S.prog[i]-=amt;if(lap)K1S.laps[i]--;const rb=K1S.rb[pi];if(rb)rb.phi=Math.max(0,rb.phi-amt);K1M3.st.steals++;
  o.m.lm.material.color.setHex(K1S_COL[pi]);o.m.lm.material.emissive.setHex(K1S_COL[pi]);o.loot=true;
  K1B.fx.pulse(K1B.cur.C,K1S_COL[pi],2.4);floatText(h.pos.clone().add(new V3(0,2.4,0)),lap?'Виток унесла!':'Ленту утащила!','#ff9a8a');k1m3Chat();K1B.emo(K1B.cur.L,'laugh',0);
  tip(pi,'Сорока унесла виток! Красный круг — кувырок '+K(pi,'roll')+', или ударь её на подлёте '+K(pi,'attack')+'.',3.2);}
function k1m3MagTick(o,dt,calm){const C=K1B.cur.C,m=o.m,g=m.g;o.t+=dt;const flap=o.st==='dive'?Math.sin(G.time*8)*0.3:Math.sin(G.time*16)*0.7;m.wings.forEach((w,i)=>{w.rotation.z=(i?-1:1)*flap;});
  m.loot.visible=!!o.loot&&o.st==='away';
  if(o.st==='circle'){o.a+=dt*0.45;const x=C.x+Math.cos(o.a)*9,z=C.z+Math.sin(o.a)*9,y=7+Math.sin(G.time*1.3)*0.4;g.position.x+=(x-g.position.x)*Math.min(1,dt*2);g.position.y+=(y-g.position.y)*Math.min(1,dt*2);g.position.z+=(z-g.position.z)*Math.min(1,dt*2);
    g.rotation.y=Math.atan2(-Math.sin(o.a),Math.cos(o.a));g.rotation.z=0.25;
    if(calm)return;K1M3.magCd-=dt;if(K1M3.magCd>0)return;
    const pis=k1sPis().filter(pi=>{const h=active(pi);return !players[pi].downed&&!h.cling&&!h.k1root&&k1m3Loot(pi)>0.8;});if(!pis.length){K1M3.magCd=1;return;}
    const pi=pis[Math.floor(Math.random()*pis.length)],h=active(pi);o.st='dive';o.t=0;o.tgt=h;o.from=g.position.clone();o.loot=false;K1M3.st.dives++;
    o.tele=K1F.teleObj(h.pos.x,h.pos.z,1.15,'red');try{SFX.red();}catch(e){}k1m3Chat();return;}
  if(o.st==='dive'){const h=o.tgt,D=({easy:1.5,mid:1.25,hard:1.1})[k1m3P()]||1.25,k=Math.min(1,o.t/D),e=k*k;
    if(o.tele){o.tele.g.position.x=h.pos.x;o.tele.g.position.z=h.pos.z;o.tele.set(k);}
    const to=new V3(h.pos.x,h.pos.y+1.6,h.pos.z);g.position.lerpVectors(o.from,to,e);g.position.y+=Math.sin(Math.PI*k)*1.5;g.lookAt(to.x,g.position.y,to.z);g.rotation.z=0;o.hit.pos.set(g.position.x,0,g.position.z);
    if(calm){if(o.tele){o.tele.del();o.tele=null;}o.st='away';o.t=0;o.from=g.position.clone();return;}
    if(k<1)return;if(o.tele){o.tele.flash();o.tele=null;}
    if(h.rollT>0||G.time-(h.lastRoll||-9)<0.35||players[h.player].downed){K1M3.st.rolls++;floatText(h.pos.clone().add(new V3(0,2,0)),'Мимо!','#b8e070');}
    else k1m3Steal(o,h);
    o.st='away';o.t=0;o.from=g.position.clone();return;}
  if(o.st==='away'){const k=Math.min(1,o.t/1.4),aw=o.from.clone().sub(new V3(C.x,0,C.z)).setY(0).normalize();
    g.position.set(o.from.x+aw.x*6*k,o.from.y+5*CINE.E.outCubic(k),o.from.z+aw.z*6*k);g.rotation.y=Math.atan2(aw.x,aw.z);g.rotation.z=o.loot?0:Math.sin(o.t*12)*0.5;
    if(k>=1){o.st='circle';o.t=0;o.loot=false;o.a=Math.atan2(g.position.z-C.z,g.position.x-C.x);const r=({easy:[9,11],mid:[6,8],hard:[5,6.5]})[k1m3P()]||[6,8];K1M3.magCd=rand(r[0],r[1]);}}}
/* ---------- ход: только пока бегут хоровод ---------- */
function k1m3Clear(){K1M3.roots.slice().forEach(r=>{if(r.held)k1m3Release(r,null);k1m3RootDel(r);});k1m3MagDel();}
K1M3.reset=function(){K1M3.roots.length=0;K1M3.mag=null;K1M3.cd=3;K1M3.magCd=5;K1M3.turn=0;K1M3.seen={};for(const k in K1M3.st)K1M3.st[k]=0;};
function k1m3Tick(dt){if(!K1S.on||W.flags.phase!==3){if(K1M3.roots.length||K1M3.mag)k1m3Clear();return;}
  const run=K1S.st==='run';
  for(const r of K1M3.roots.slice()){if(!run&&r.st!=='down')k1m3RootDown(r);k1m3RootTick(r,dt);}
  if(run){const max=K1S.round>=2&&k1m3P()!=='easy'?2:1,live=K1M3.roots.filter(r=>r.st!=='down').length;K1M3.cd-=dt;
    if(live<max&&K1M3.cd<=0){const pis=k1sPis(),pi=pis[K1M3.turn++%pis.length],h=active(pi);
      const sp=!players[pi].downed&&!h.cling&&!h.k1root&&h.grounded!==false?k1m3Spot(h):null;
      if(sp){k1m3Root(sp[0],sp[1],pi);const r=({easy:[8,10],mid:[5,6.5],hard:[4,5.5]})[k1m3P()]||[5,6.5];K1M3.cd=rand(r[0],r[1])*(max>1?0.75:1);}else K1M3.cd=0.6;}}
  if(K1S.round>=2&&!K1M3.mag&&run)k1m3Mag();
  if(K1M3.mag)k1m3MagTick(K1M3.mag,dt,!run);}
{const _st=step;step=function(dt){_st(dt);const c=K1B.cur;if(!c||!W||W.levelId!=='1-B')return;
  try{if(K1M3.auto&&!G.cine&&G.state==='play')k1m3Tick(dt);else if(!K1M3.auto&&(K1M3.roots.length||K1M3.mag))k1m3Clear();k1m3Hold();}
  catch(e){console.error('k1m3',e);K1M3.auto=false;k1m3Clear();}};}
{const _ll=loadLevel;loadLevel=function(i){K1M3.reset();_ll(i);};}
// подсказки над героем: белый круг впереди — прыжок, красный под ним — кувырок, друга держит корень — удар
{const _in=K1B.init;K1B.init=function(ctx){_in(ctx);try{for(const pi of[0,1]){const h=()=>active(pi);
      prompt(pi,'jump',()=>headOf(h()),()=>W.flags.phase===3&&K1M3.roots.some(r=>r.st!=='down'&&!r.held&&Math.hypot(h().pos.x-r.x,h().pos.z-r.z)<2.6),'корень!');
      prompt(pi,'roll',()=>headOf(h()),()=>W.flags.phase===3&&!!K1M3.mag&&K1M3.mag.st==='dive'&&K1M3.mag.tgt===h()&&K1M3.mag.t>0.5,'сорока!');
      prompt(pi,'attack',()=>headOf(h()),()=>W.flags.phase===3&&K1M3.roots.some(r=>r.held&&(r.held===h()||Math.hypot(h().pos.x-r.x,h().pos.z-r.z)<3)),'по корню!');}}
    catch(e){console.error('k1m3 prompts',e);}};}
// напарник-бот (late_73g_companion_1b.js): корень впереди — прыжок, держит — бьёт, сорока — кувырок
K1M3.cmp=function(h){if(h.k1root){if(!(K1M3.cmpT>G.time-0.3)){K1M3.cmpT=G.time;cmpTap('attack');}return true;}
  const o=K1M3.mag;if(o&&o.st==='dive'&&o.tgt===h&&o.t>(({easy:1.5,mid:1.25,hard:1.1})[k1m3P()]||1.25)-0.3){cmpTap('roll');return true;}
  const r=K1M3.roots.find(q=>q.st!=='down'&&!q.held&&Math.hypot(h.pos.x-q.x,h.pos.z-q.z)<1.9);if(r&&h.grounded&&r.st==='up'){cmpTap('jump');}
  const m=K1M3.roots.find(q=>q.held&&q.held!==h&&Math.hypot(h.pos.x-q.x,h.pos.z-q.z)<3.5);if(m){h.face=Math.atan2(m.x-h.pos.x,m.z-h.pos.z);if(!(K1M3.cmpT>G.time-0.3)){K1M3.cmpT=G.time;cmpTap('attack');}return true;}
  return false;};
