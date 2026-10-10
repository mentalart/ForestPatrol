/* ============================== РЕЛИЗ final06 · 1-4 «ЛЕШИЙ ВОДИТ»: МИНИ-БОСС «АУКА-ПЕРЕКЛИЧКА» ============================== */
// В конце леса, после поляны-петли, живёт Аука — пузатый лесной дух во мху, щёки-мешки, шапка-мухомор. Он откликается на голоса и
// заводит в чащу; не злодей — ему просто не с кем перекликаться. В прототипе здесь лешачата; модуль ставит вместо них Ауку (W.k14 —
// из build14: арена, ворота, ёлки-прятки).
//   Этап 1 «Где я?» (обманки, лист-бумеранг, отбить «ау»): Аука прячется в одном из четырёх дупел, из всех слышно «Ау!». Аукни
//      (кнопка зова) — настоящее дупло отвечает сразу, золотом; пустые — эхом, поздно и серым. Подошёл к настоящему — выскочил и
//      дерётся: синий «ау-шар» отбить щитом в последний миг (вернулся — Аука оглушён, бей), красный лист летит по дорожке туда и
//      обратно — сойди с неё. Через 11 с снова прячется.
//   Этап 2 «Подголоски» (призыв, сходящиеся стены): Аука на пне, зовёт трёх лешачат; с боков сходятся две стены ходячих ёлок — стоят,
//      пока на них смотрят. Один держит стену взглядом, другой распутывает лешачат; все распутаны — Аука растерялся: бей.
//   Этап 3 «Большое АУ!» (замах с перебиванием, топот-волна, за щит): Аука топает — по земле бежит белое кольцо (прыгай); потом
//      надувает щёки. Перебить: оба героя на двух пнях-эхо по краям аукают разом — два эха сталкиваются, Аука запутался (в одиночку
//      оставь героя на одном пне — он аукнет сам). Не успели — «АУУУ!»: спасает только Широкий щит Потапа (стоять за его спиной).
//   Конец: Аука всхлипывает — никто с ним не перекликался; герои хором отвечают «Ау!», он смеётся и ведёт к выходу из леса.
// Сигналы — по словарю docs/33: синий — отбить, красный — сойти с дорожки, белое кольцо — прыжок, синий купол — за щит Потапа,
// золотые кольца — «вместе»; цель — золото.
WHO.auka=['Аука','#c8e070'];VOICE.auka={f:300,w:'triangle',sp:0.085};
FOE.auka={r:0.85,emb:6,sig:['blue'],sp:0.01,look:'auka',big:true,ranged:true};
FL.auka=(inner)=>{const moss=M(0x7a9a46),dk=M(0x4a6a2a),bel=M(0xb8c87a),cap=M(0xd8402a),dot=M(0xfff4e0),wood=M(0x6a4a2a);
  const body=new THREE.Group();inner.add(body);
  const belly=new THREE.Mesh(new THREE.SphereGeometry(0.62,14,11),moss);belly.scale.set(1,0.92,0.95);belly.position.y=0.66;body.add(belly);
  const pad=new THREE.Mesh(new THREE.SphereGeometry(0.42,12,9),bel);pad.scale.set(1,1.05,0.5);pad.position.set(0,0.6,0.38);body.add(pad);
  for(let i=0;i<9;i++){const t=new THREE.Mesh(new THREE.ConeGeometry(0.07,0.24,4),dk);const a=i/9*Math.PI*2;t.position.set(Math.cos(a)*0.5,0.95+Math.sin(i*1.7)*0.05,Math.sin(a)*0.5);t.rotation.set(Math.sin(a)*0.6,0,-Math.cos(a)*0.6);body.add(t);}   // моховые вихры
  const cheeks=[];for(const s of[-1,1]){const c=new THREE.Mesh(new THREE.SphereGeometry(0.17,10,8),M(0xd8a070));c.position.set(s*0.34,0.82,0.42);body.add(c);cheeks.push(c);}
  const mouth=new THREE.Mesh(new THREE.SphereGeometry(0.1,10,8),MAT.dark);mouth.scale.set(1.2,0.5,0.4);mouth.position.set(0,0.72,0.55);body.add(mouth);
  const hat=new THREE.Group();hat.position.y=1.2;body.add(hat);const hc=new THREE.Mesh(new THREE.SphereGeometry(0.46,14,8,0,Math.PI*2,0,Math.PI/2),cap);hc.scale.y=0.7;hat.add(hc);
  for(let i=0;i<6;i++){const a=i/6*Math.PI*2+0.3;const d=new THREE.Mesh(new THREE.SphereGeometry(0.06,6,5),dot);d.position.set(Math.cos(a)*0.3,0.2,Math.sin(a)*0.3);hat.add(d);}
  const stem=new THREE.Mesh(new THREE.CylinderGeometry(0.2,0.24,0.1,10),dot);stem.position.y=-0.02;hat.add(stem);
  const ears=[];for(const s of[-1,1]){const l=new THREE.Mesh(new THREE.ConeGeometry(0.1,0.42,5),M(0x8ab04a));l.position.set(s*0.6,0.95,0);l.rotation.z=-s*1.1;body.add(l);ears.push(l);}
  const arms=[];for(const s of[-1,1]){const a=new THREE.Group();a.position.set(s*0.58,0.66,0.08);body.add(a);const m=new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.06,0.42,6),wood);m.position.y=-0.18;a.add(m);a.rotation.z=s*0.5;arms.push(a);}
  const legs=[];for(const s of[-1,1]){const l=new THREE.Mesh(new THREE.CylinderGeometry(0.08,0.1,0.26,6),wood);l.position.set(s*0.24,0.12,0.04);body.add(l);legs.push(l);}
  return {body,belly,cheeks,mouth,hat,ears,arms,legs,eyeY:0.98,eyeZ:0.5,eyeX:0.2,eyeS:1.2,top:1.6,lid:hp(0x7a9a46)};};
// дупло: толстый пень-дуплянка, дыра смотрит на середину арены
function auka14Hollow(x,z,face){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=face;W.group.add(g);const bark=M(0x5a4028),moss=M(0x5a7a34);
  addMesh(new THREE.CylinderGeometry(0.85,1.05,3.0,12),bark,0,1.5,0,g);addMesh(new THREE.CylinderGeometry(0.9,0.9,0.3,12),moss,0,3.0,0,g);
  const hole=addMesh(new THREE.CircleGeometry(0.42,16),MB(0x140c06),0,1.25,0.87,g);hole.scale.y=1.35;
  const rim=addMesh(new THREE.TorusGeometry(0.44,0.07,6,18),M(0x3a2a18),0,1.25,0.86,g);rim.scale.y=1.35;
  for(let i=0;i<3;i++){const r=addMesh(new THREE.CylinderGeometry(0.1,0.18,1.2,5),bark,Math.cos(i*2.1)*0.95,0.2,Math.sin(i*2.1)*0.95,g);r.rotation.set(Math.sin(i*2.1)*0.7,0,-Math.cos(i*2.1)*0.7);}
  const mark=new THREE.Mesh(new THREE.TorusGeometry(0.5,0.07,8,24),MB(COL.gold,{transparent:true,opacity:0.85}));mark.rotation.x=Math.PI/2;mark.position.set(x,3.6,z);mark.visible=false;mark.castShadow=false;W.group.add(mark);
  W.cyls.push({x,z,r:1.0,miny:-1,maxy:3.2,on:true});
  return {x,z,g,mark,mx:x-Math.sin(face)*-1.6,mz:z-Math.cos(face)*-1.6,cool:0,markT:0};}
// пень-эхо: низкий пень с рупором и золотым кольцом
function auka14Echo(x,z){const g=new THREE.Group();g.position.set(x,0,z);W.group.add(g);addMesh(new THREE.CylinderGeometry(0.72,0.85,0.4,14),M(0x7a5232),0,0.2,0,g);
  const horn=addMesh(new THREE.CylinderGeometry(0.28,0.1,0.5,10,1,true),M(0x5a3d22,{side:THREE.DoubleSide}),0,0.65,0,g);horn.rotation.x=-0.9;horn.rotation.order='YXZ';horn.rotation.y=x<0?Math.PI/2:-Math.PI/2;
  const ring=new THREE.Mesh(new THREE.TorusGeometry(0.95,0.07,6,26),MB(COL.gold,{transparent:true,opacity:0.75}));ring.rotation.x=Math.PI/2;ring.position.set(x,0.45,z);ring.castShadow=false;ring.visible=false;W.group.add(ring);
  W.cyls.push({x,z,r:0.8,miny:-1,maxy:0.3,on:true});return {x,z,g,ring,call:-9};}
function auka14Setup(){const K14=W.k14;if(!K14||W.levelId!=='1-4')return;const F=W.flags,AR=K14.arena,T=HERO,z0=-191,mid=-203,CS={x:0,z:-205};
  AR.custom=true;K14.hideFirs.forEach(f=>{f.g.visible=false;f.col.on=false;});
  const HL=[[-6.8,-196.5],[6.8,-196.5],[-6.8,-210],[6.8,-210]].map(([x,z])=>auka14Hollow(x,z,Math.atan2(CS.x-x,CS.z-z)));
  const ES=[auka14Echo(-8.6,-203),auka14Echo(8.6,-203)];
  const pulpit=new THREE.Group();pulpit.position.set(CS.x,0,CS.z);W.group.add(pulpit);addMesh(new THREE.CylinderGeometry(1.0,1.15,0.55,16),M(0x8a5a32),0,0.27,0,pulpit);
  {const tr=addMesh(new THREE.TorusGeometry(0.7,0.04,6,24),M(0xd2a870),0,0.56,0,pulpit);tr.rotation.x=Math.PI/2;}W.cyls.push({x:CS.x,z:CS.z,r:1.1,miny:-1,maxy:0.55,on:true});
  // стены ходячих ёлок (этап 2): по четыре с каждой стороны, ведёт их модуль
  const WALLZ=[-198.5,-201.8,-205.1,-208.4],walls=[-1,1].map(sd=>({sd,x:sd*9.6,hold:0,firs:WALLZ.map(z=>{const m=walker(sd*9.6,sd*9.6,-300,0,0);m.noGaze=true;m.speed=0;m.az=m.bz=-300;return {m,z};})}));
  const A={ph:0,e:null,hid:-1,real:0,outT:0,tauntT:3,callT:-9,leaf:null,leafCd:4,lsh:[],wave:0,ring:null,shout:null,stompN:0,cyc:0,windT:0,windDur:3.2,help:0,dome:null,friend:null,lastHide:-1};
  const dome=new THREE.Mesh(new THREE.SphereGeometry(1.5,16,8,0,Math.PI*2,0,Math.PI/2),MB(0x3a8aff,{transparent:true,opacity:0.22,depthWrite:false}));dome.visible=false;dome.castShadow=false;W.group.add(dome);
  const domeRim=new THREE.Mesh(new THREE.TorusGeometry(1.5,0.06,6,28),MB(0x6ab0ff,{transparent:true,opacity:0.8}));domeRim.rotation.x=Math.PI/2;domeRim.visible=false;domeRim.castShadow=false;W.group.add(domeRim);
  const ringM=MB(0xffffff,{transparent:true,opacity:0.9});
  const T3=()=>TIMING[genPath()]||TIMING.mid,easy=()=>genPath()==='easy';
  const live=()=>HEROES.filter(q=>q.active&&!players[q.player].downed&&!q.cling);
  const nearest=p=>{let b=null,bd=99;for(const q of live()){const d=hd(q.pos,p);if(d<bd){bd=d;b=q;}}return b;};
  const foeSay=(t,c)=>floatText(A.e.pos.clone().add(new V3(0,2.4,0)),t,c||'#e8f8a0');
  // ---- Аука ----
  function spawnAuka(){const e=makeFoe('auka',CS.x,CS.z,{leash:30});A.e=e;e.noKill=true;e.noMove=true;e.dazeT=0;
    e.guardAll=()=>!(e.dazeT>0)&&e.state!=='broken'&&e.state!=='dying';
    Object.defineProperty(e,'guardText',{get:()=>A.ph===1?'Не достать! Отбей «ау-шар» назад':A.ph===2?'Не достать! Распутай подголосков':'Не достать! Аукните вдвоём с пней',configurable:true});
    e.onReflect=b=>{if(A.ph!==1||!e.alive||e.state==='hide')return;e.dazeT=easy()?6:5;A.outT=Math.max(A.outT,e.dazeT+1);foeSay('Своё «ау» в ухо!','#9fd0ff');SFX.ok();if(!F.a14rf){F.a14rf=true;for(const p of[0,1])tip(p,'Оглушён! Бей '+K(p,'attack')+'!',3);}};
    e.onFinisher=h=>{if(A.ph===1)toPhase2();else if(A.ph===2)toPhase3();else if(A.ph===3)friendScene();};
    // окно: не больше трёх ударов, потом «Очухался!» (docs/33 п. 2)
    e.tick=(e,dt)=>{if(A.ph!==1)e.cd=Math.max(e.cd,1);if(e.dazeT>0){if(A.emb0===undefined){A.emb0=e.embers;}if(A.emb0-e.embers>=3&&e.embers>0){e.dazeT=0;e.state='idle';e.t=0;e.cd=1.6;foeSay('Очухался!','#ffffff');if(A.ph===1)later(0.5,()=>{if(A.ph===1&&e.state!=='broken'&&e.state!=='hide')hideAuka(false);});}}else A.emb0=undefined;if(e.state==='broken'&&!e.bset){e.bset=true;e.bdur=Math.max(e.bdur,easy()?10:7);}if(e.state!=='broken')e.bset=false;};
    e.post=(e,dt,k)=>{const L=e.L,t=G.time;if(!L.cheeks)return;const wind=A.ph===3&&A.windT>0,puff=wind?1+1.1*clamp(1-A.windT/A.windDur,0,1):e.dazeT>0?0.8:1;
      L.cheeks.forEach(c=>{c.scale.setScalar(puff+(wind?Math.sin(t*20)*0.05:0));});L.mouth.scale.set(1.2,wind?0.25:e.state==='wind'||A.leaf&&A.leaf.st==='tele'?1.3:0.5,0.4);
      L.ears.forEach((l,i)=>{l.rotation.x=Math.sin(t*3+i)*0.2;});L.hat.rotation.z=e.dazeT>0?Math.sin(t*9)*0.25:Math.sin(t*1.5)*0.05;
      L.arms.forEach((a,i)=>{a.rotation.x=A.leaf&&A.leaf.st==='tele'&&i===1?-2.2:e.state==='wind'?-1.2:Math.sin(t*2+i)*0.2;});
      L.legs.forEach((l,i)=>{l.position.y=0.12+(A.ph===3&&A.stompPose>0&&i===0?0.25:0);});
      if(A.leaf&&A.leaf.st==='tele'){e.S.sig.visible=true;e.S.sr.visible=true;e.S.sy.visible=false;e.S.sb.visible=false;e.S.sr.rotation.y+=dt*9;}};
    return e;}
  function placeAuka(x,z,y){const e=A.e;e.pos.set(x,y||0,z);e.baseY=y||0;e.home.set(x,y||0,z);e.face=Math.atan2(CS.x-x,CS.z-z);}
  // ---- этап 1: прятки по дуплам ----
  function hideAuka(first){const e=A.e;if(!e)return;let n=A.hid;while(n===A.hid)n=Math.floor(Math.random()*4);A.hid=n;A.real=n;
    if(!first){burst(e.pos.clone().add(new V3(0,1,0)),0x8ab04a,16,3);foeSay('Ищи-свищи!');SFX.whoosh();}
    for(let i=W.bolts.length-1;i>=0;i--)if(W.bolts[i].from===e){W.group.remove(W.bolts[i].g);W.bolts.splice(i,1);}   // «ау-шары» в полёте гаснут
    e.g.visible=false;e.state='hide';e.hideUntil=0;e.dazeT=0;e.tgt=null;placeAuka(HL[n].x,HL[n].z,0);A.tauntT=2.5;A.leaf=null;}
  function popAuka(){const e=A.e,h=HL[A.real];placeAuka(h.mx,h.mz,0);e.g.visible=true;e.state='spawn';e.t=0;e.cd=1.2;A.outT=11;A.leafCd=3.5;h.markT=0;h.mark.visible=false;
    burst(new V3(h.mx,1.2,h.mz),0x8ab04a,14,3);foeSay('Ой! Нашли!');SFX.ok();if(!F.a14pop){F.a14pop=true;for(const p of[0,1])tip(p,'Синий «ау-шар» — щит '+K(p,'guard')+' в последний миг!',3.6);}}
  function answerCall(){if(A.ph!==1||A.e.state!=='hide')return;A.callT=G.time;const h=HL[A.real];h.markT=4;ringFx(new V3(h.x,1.3,h.z),COL.gold,2.4);floatText(new V3(h.x,3.4,h.z),'Ау!','#ffd76a');SFX.bell();
    HL.forEach((q,i)=>{if(i===A.real)return;later(0.9,()=>{if(A.ph!==1)return;floatText(new V3(q.x,3.2,q.z),'ау…','#aab4c0');ringFx(new V3(q.x,1.3,q.z),0x9aa4b0,1.4);});});
    if(!F.a14ans){F.a14ans=true;for(const p of[0,1])tip(p,'Золотом отозвался — там он! Беги к дуплу.',3.2);}}
  function tickP1(dt){const e=A.e;if(e.state==='hide'){A.tauntT-=dt;if(A.tauntT<=0){A.tauntT=6;HL.forEach((q,i)=>later(i*0.18,()=>{if(A.ph===1&&A.e.state==='hide')floatText(new V3(q.x,3.2,q.z),'Ау!','#c8d8a0');}));tone(520,0.12,'triangle',0.05,620,0);tone(520,0.12,'triangle',0.04,620,0.25);}
        HL.forEach((q,i)=>{q.cool=Math.max(0,q.cool-dt);q.markT=Math.max(0,q.markT-dt);q.mark.visible=q.markT>0;if(q.mark.visible){q.mark.rotation.z+=dt*2;q.mark.position.y=3.6+Math.sin(G.time*4)*0.12;}
          for(const h of live()){if(hd(h.pos,new V3(q.mx,0,q.mz))>2.0)continue;if(i===A.real){popAuka();return;}if(q.cool<=0){q.cool=3;burst(new V3(q.mx,1.4,q.mz),0x6a8a3a,10,2);floatText(new V3(q.x,3.0,q.z),'Пусто! ау-ау…','#aab4c0');SFX.miss();}}});
        A.help+=dt;if(A.help>12&&G.time-A.callT>12){A.help=0;for(const p of[0,1])tip(p,'Аукни '+K(p,'call')+' — настоящий отзовётся!',3.4);}
        return;}
      A.help=0;if(e.state==='broken')return;
      if(!(e.dazeT>0))A.outT-=dt;if(A.outT<=0&&e.state==='idle'&&!A.leaf){hideAuka(false);return;}
      // красный лист-бумеранг: дорожка туда и обратно
      A.leafCd-=dt;if(!A.leaf&&A.leafCd<=0&&e.state==='idle'&&!(e.dazeT>0)){const h=nearest(e.pos);if(h&&hd(h.pos,e.pos)<11){startLeaf(h);}}
      if(A.leaf)tickLeaf(dt);}
  const leafM=M(0xd8501a,{emissive:0x802010,emissiveIntensity:0.6});
  function startLeaf(h){const e=A.e,dx=h.pos.x-e.pos.x,dz=h.pos.z-e.pos.z,d=Math.hypot(dx,dz)||1,ux=dx/d,uz=dz/d,len=Math.min(12,d+2.5);
    const g=new THREE.Group();g.position.set(e.pos.x,0.08,e.pos.z);g.rotation.y=Math.atan2(ux,uz);W.group.add(g);const lm=MB(0xff3b30,{transparent:true,opacity:0.0,depthWrite:false});
    for(let i=0;i<Math.floor(len/0.7);i++){const m=new THREE.Mesh(new THREE.PlaneGeometry(0.5,0.32),lm);m.rotation.x=-Math.PI/2;m.position.set(0,0,0.6+i*0.7);m.castShadow=false;g.add(m);}
    const leaf=new THREE.Group();const lf=new THREE.Mesh(new THREE.SphereGeometry(0.32,8,6),leafM);lf.scale.set(1,0.15,0.6);leaf.add(lf);leaf.position.set(e.pos.x,1.0,e.pos.z);leaf.visible=false;W.group.add(leaf);
    const tele=Math.max(1.0,T3().lead*(easy()?1.5:1.2));A.leaf={st:'tele',t:0,tele,ux,uz,len,x0:e.pos.x,z0:e.pos.z,g,lm,leaf,u:0,hit:new Set()};e.cd=Math.max(e.cd,tele+2);e.tgt=h;SFX.red();
    if(!F.a14lf){F.a14lf=true;for(const p of[0,1])tip(p,'<i class="sg r"></i> Красная дорожка — сойди с неё! Лист вернётся.',3.6);}}
  function tickLeaf(dt){const L=A.leaf,e=A.e;L.t+=dt;
    if(L.st==='tele'){L.lm.opacity=0.25+0.45*clamp(L.t/L.tele,0,1)+0.1*Math.sin(G.time*20);e.face=Math.atan2(L.ux,L.uz);if(L.t>=L.tele){L.st='fly';L.t=0;L.leaf.visible=true;SFX.swish();}return;}
    const sp=9,out=L.len/sp;let u=L.t<out?L.t*sp:Math.max(0,L.len-(L.t-out)*sp);if(L.t>=out&&!L.back){L.back=true;L.hit.clear();}
    L.leaf.position.set(L.x0+L.ux*u,1.0,L.z0+L.uz*u);L.leaf.rotation.y+=dt*20;L.lm.opacity=0.55;
    for(const h of live()){if(L.hit.has(h))continue;if(hd(h.pos,L.leaf.position)<0.75&&h.pos.y<2){L.hit.add(h);if(h.rollT>0){floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Увернулся!','#ffe36b');continue;}
      hitHero(e,h,'<i class="sg r"></i> Красная дорожка — сойди с неё '+K(h.player,'roll')+'!');}}
    if(L.t>=out*2+0.1||!e.alive){W.group.remove(L.g);W.group.remove(L.leaf);A.leaf=null;A.leafCd=easy()?6:4.5;}}
  // ---- этап 2: подголоски и сходящиеся стены ----
  function wallsShow(on){walls.forEach(w=>{w.x=w.sd*9.6;w.firs.forEach(f=>{f.m.ax=f.m.bx=w.x;f.m.az=f.m.bz=on?f.z:-300;});});}
  function summon(n){const P=[[-2.6,-201],[2.6,-201],[0,-208.5],[-2.4,-208],[2.4,-208]];for(let i=0;i<n;i++){const p=P[(A.wave+i)%P.length];const e=makeFoe('leshonok',p[0],p[1],{leash:11,signals:i%3===2?['yellow','red']:i%2?['red']:['yellow']});A.lsh.push(e);}
    A.wave++;foeSay('Подголоски, ко мне!');SFX.horn();}
  function tickP2(dt){const e=A.e;A.lsh=A.lsh.filter(q=>q.alive);
    // стены: стоят под взглядом; не глядят — идут к середине
    const src=gazeSources();for(const w of walls){const seen=w.firs.some(f=>gazeCovers(f.m.pos,src));w.hold=seen?0.35:w.hold-dt;const fz=w.hold>0;
      if(!fz&&!(e.dazeT>0)&&e.state!=='broken'){w.x=w.sd*Math.max(2.2,Math.abs(w.x)-(easy()?0.45:0.6)*dt);}else if(e.dazeT>0||e.state==='broken'){w.x=w.sd*Math.min(9.6,Math.abs(w.x)+dt*3);}
      w.firs.forEach(f=>{f.m.ax=f.m.bx=w.x;f.m.silverLock=fz;});}
    if(Math.abs(walls[0].x)<2.7&&Math.abs(walls[1].x)<2.7){// сдвинулись: толкают всех из середины и расходятся
      for(const h of live()){if(h.pos.z>-196.5||h.pos.z<-210.5)continue;const sz=h.pos.z>mid?1:-1;h.vel.x=0;h.vel.z=sz*7;h.vel.y=5;h.grounded=false;h.knockT=0.5;SFX.knock();}
      foeSay('Сдвинулись! Хи-хи!');walls.forEach(w=>{w.x=w.sd*9.6;});if(A.lsh.length<3)summon(1);if(!F.a14wl){F.a14wl=true;for(const p of[0,1])tip(p,'Глядите на ёлки-стены — стоят, пока смотришь!',3.6);}}
    if(!(e.dazeT>0)&&e.state!=='broken'&&A.lsh.length===0&&A.wave>0&&!A.p2open){A.p2open=true;e.dazeT=easy()?8:6.5;foeSay('Ой… никто не подпевает…','#ffe08a');SFX.ok();for(const p of[0,1])tip(p,'Аука растерялся — бей '+K(p,'attack')+'!',3.4);}
    if(A.p2open&&!(e.dazeT>0)&&e.state!=='broken'){A.p2open=false;summon(3);}}
  // ---- этап 3: топот и большое «АУ» ----
  function tickP3(dt){const e=A.e;if(e.state==='broken')return;
    if(A.ring){const R=A.ring;R.r+=dt*(easy()?4:5);R.m.scale.setScalar(R.r);R.m.material.opacity=0.9*(1-R.r/12);
      for(const h of live()){if(R.hit.has(h))continue;const d=hd(h.pos,CS);if(Math.abs(d-R.r)<0.45){R.hit.add(h);if(h.pos.y>0.45||!h.grounded){continue;}hitHero(e,h,'Белое кольцо по земле — прыгай '+K(h.player,'jump')+'!');}}
      if(R.r>12){W.group.remove(R.m);A.ring=null;}}
    if(A.shout){const S=A.shout;S.r+=dt*10;S.m.scale.setScalar(S.r);S.m.material.opacity=0.45*(1-S.r/13);
      for(const h of live()){if(S.hit.has(h))continue;if(hd(h.pos,CS)>S.r)continue;S.hit.add(h);if(shielded(h)){floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'За щитом!','#9fd0ff');continue;}
        const dx=h.pos.x-CS.x,dz=h.pos.z-CS.z,d=Math.hypot(dx,dz)||1;hitHero(e,h,'Синий купол — за щит Потапа!');h.vel.x=dx/d*8;h.vel.z=dz/d*8;h.vel.y=5;h.grounded=false;h.knockT=0.55;}
      if(S.r>13){W.group.remove(S.m);A.shout=null;}}
    if(e.dazeT>0){A.windT=0;dome.visible=domeRim.visible=false;ES.forEach(s=>{s.ring.visible=false;});return;}
    A.cyc-=dt;
    if(A.stompPose>0){A.stompPose-=dt;if(A.stompPose<=0){const m=new THREE.Mesh(new THREE.TorusGeometry(1,0.045,4,48),ringM.clone());m.rotation.x=Math.PI/2;m.position.set(CS.x,0.15,CS.z);m.castShadow=false;W.group.add(m);A.ring={r:1.2,m,hit:new Set()};SFX.thud();if(FIN.bossfx)FIN.bossfx.shake(0.05,0.25);else shakeAll(0.04,0.25);}}
    if(A.windT>0){A.windT-=dt;const P=T.potap,pOk=P.active&&!players[0].downed;dome.visible=domeRim.visible=pOk;if(pOk){const dx=P.pos.x-CS.x,dz=P.pos.z-CS.z,d=Math.hypot(dx,dz)||1;dome.position.set(P.pos.x+dx/d*0.9,0,P.pos.z+dz/d*0.9);domeRim.position.set(dome.position.x,0.08,dome.position.z);}
      ES.forEach(s=>{s.ring.visible=true;s.ring.scale.setScalar(1+0.12*Math.sin(G.time*8));});
      if(A.windT<=0){dome.visible=domeRim.visible=false;ES.forEach(s=>{s.ring.visible=false;});const m=new THREE.Mesh(new THREE.SphereGeometry(1,20,10,0,Math.PI*2,0,Math.PI/2),MB(0x6ab0ff,{transparent:true,opacity:0.45,depthWrite:false,side:THREE.DoubleSide}));m.position.set(CS.x,0,CS.z);m.castShadow=false;W.group.add(m);
        A.shout={r:1,m,hit:new Set()};foeSay('АУУУУ!','#9fd0ff');tone(180,0.6,'sawtooth',0.07,120,0);tone(240,0.6,'triangle',0.06,160,0);if(FIN.bossfx)FIN.bossfx.shake(0.08,0.4);else shakeAll(0.05,0.4);A.cyc=easy()?3.5:2.6;}
      return;}
    if(A.cyc>0||A.ring||A.shout)return;
    if(A.stompN<2){A.stompN++;A.stompPose=easy()?1.2:0.9;A.cyc=A.stompPose+2.4;foeSay('Топ-топ!');SFX.yellow();
      if(!F.a14st){F.a14st=true;for(const p of[0,1])tip(p,'Белое кольцо по земле — прыгай '+K(p,'jump')+'!',3.6);}return;}
    A.stompN=0;A.windDur=easy()?3.6:genPath()==='hard'?2.6:3.1;A.windT=A.windDur;ES.forEach(s=>{s.call=-9;});foeSay('Ффф-ф-ф…','#9fd0ff');tone(300,A.windDur,'sine',0.04,600,0);
    if(!F.a14wd){F.a14wd=true;for(const p of[0,1])tip(p,'Встаньте на два пня и аукните '+K(p,'call')+' разом! Или — за щит Потапа.',4.6);}}
  function shielded(h){const P=T.potap;if(!P.active||players[0].downed||!P.guard)return false;const dx=P.pos.x-CS.x,dz=P.pos.z-CS.z,d=Math.hypot(dx,dz)||1,fx=Math.sin(P.face),fz=Math.cos(P.face);
    if((-dx*fx-dz*fz)/d<0.3)return false;if(h===P)return true;const hx=h.pos.x-P.pos.x,hz=h.pos.z-P.pos.z,hl=Math.hypot(hx,hz);return hl<2.2&&(hx*dx+hz*dz)/(hl*d||1)>0.2;}
  const keeperOn=s=>HEROES.some(q=>!q.active&&!q.following&&hd(q.pos,s)<1.6);
  function echoCall(h){if(A.ph!==3||!(A.windT>0))return;const i=ES.findIndex(s=>hd(h.pos,s)<1.6);if(i<0)return;const s=ES[i],o=ES[1-i];s.call=G.time;ringFx(new V3(s.x,0.6,s.z),COL.gold,1.6);
    const both=G.time-o.call<0.8||keeperOn(o);if(!both){floatText(new V3(s.x,2.4,s.z),'Ау! …а второй?','#ffd76a');return;}
    if(keeperOn(o)){o.call=G.time;floatText(new V3(o.x,2.4,o.z),'Ау!','#ffd76a');}
    A.windT=0;ES.forEach(q=>{q.ring.visible=false;});dome.visible=domeRim.visible=false;SFX.horn();
    // два эха летят навстречу и сталкиваются на Ауке
    for(const q of ES){const m=new THREE.Mesh(new THREE.TorusGeometry(0.45,0.08,6,20),MB(COL.gold,{transparent:true,opacity:0.9}));m.position.set(q.x,1.4,q.z);m.rotation.y=Math.PI/2;W.group.add(m);
      anim(0.6,k=>{m.position.set(lerp(q.x,CS.x,k),1.4+Math.sin(k*Math.PI)*0.8,lerp(q.z,CS.z,k));if(k>=1)W.group.remove(m);});}
    later(0.6,()=>{const e=A.e;if(!e||!e.alive)return;e.dazeT=easy()?8:6.5;foeSay('Ау-ау-ау… запутался!','#ffe08a');burst(e.pos.clone().add(new V3(0,1.6,0)),COL.gold,18,4);A.cyc=1;
      for(const p of[0,1])tip(p,'Эхо столкнулось — бей '+K(p,'attack')+'!',3.2);});}
  {const prev=W.pingCall;W.pingCall=(pi,h)=>{if(prev)prev(pi,h);if(A.ph===1)answerCall();else if(A.ph===3)echoCall(h);};}
  // ---- ролики ----
  function gather(at){for(const q of HEROES){if(q.cling)continue;const a=G.solo?active(G.soloPi):active(q.player);if(q===a)continue;if(hd(q.pos,a.pos)>8){placeOnGround(q,clamp(a.pos.x+(q.player?1.4:-1.4),-9,9),Math.min(a.pos.z+1.2,z0-1),0);q.following=true;}}}
  function introScene(){A.ph=0.5;AR.started=true;spawnAuka();hideAuka(true);const h=HL[A.real];
    play({dur:8.6,fov:46,shots:[shot(0,[0,3.4,z0-0.5],[0,1.4,mid],[0,2.6,mid+6],[0,1.4,mid],3.6),shot(3.8,[h.mx*0.4,2.0,h.mz+3.4],[h.x,1.3,h.z])],
      says:[[0.3,3.2,null,'<i>Поляна, а вокруг — дуплистые пни. Из каждого — «Ау!»</i>',true],[4.0,3.6,'auka','Ау! Кто тут? Поиграем в прятки — найдёте?']],
      events:[{t:0,fn:()=>gather()},{t:1.2,fn:()=>{HL.forEach((q,i)=>later(i*0.25,()=>floatText(new V3(q.x,3.2,q.z),'Ау!','#c8d8a0')));}},
        {t:3.9,fn:()=>{const e=A.e;placeAuka(h.mx,h.mz,0);e.g.visible=true;e.state='idle';anim(1.2,k=>{e.g.position.y=-1.2+Math.sin(k*Math.PI)*1.2;});}},{t:7.6,fn:()=>{A.e.g.visible=false;A.e.state='hide';}}],
      end:()=>{A.ph=1;hideAuka(true);banner('Аука!','#c8e070',2.6,'прячется в дуплах — аукни, и настоящее отзовётся');A.help=0;setObj();}});}
  function toPhase2(){if(A.ph!==1)return;A.ph=1.5;const e=A.e;if(A.leaf){W.group.remove(A.leaf.g);W.group.remove(A.leaf.leaf);A.leaf=null;}HL.forEach(q=>{q.mark.visible=false;});
    play({dur:6.2,fov:46,shots:[shot(0,[CS.x+3.6,2.6,CS.z+5],[CS.x,1.2,CS.z])],says:[[0.3,2.6,'auka','Ой-ой, нашли да ещё и стукнули!'],[3.1,2.8,'auka','Ах так? Подголоски, подпевай!']],
      events:[{t:0,fn:()=>{e.state='idle';e.g.visible=true;e.dazeT=0;const p0=e.pos.clone();anim(1.6,k=>{e.pos.set(lerp(p0.x,CS.x,k),0.55*k+Math.sin(k*Math.PI)*1.6,lerp(p0.z,CS.z,k));});}},
        {t:1.7,fn:()=>{placeAuka(CS.x,CS.z,0.55);SFX.thud();}},{t:3.2,fn:()=>{wallsShow(true);}}],
      end:()=>{A.ph=2;placeAuka(CS.x,CS.z,0.55);e.embers=6;e.maxEmb=6;e.state='idle';e.dazeT=0;wallsShow(true);A.wave=0;A.p2open=false;summon(3);
        banner('Подголоски!','#c8e070',2.6,'стены ёлок стоят, пока глядите — держите стену, распутывайте лешачат');setObj();}});}
  function toPhase3(){if(A.ph!==2)return;A.ph=2.5;const e=A.e;A.lsh.forEach(q=>{if(q.alive)unravel(q);});A.lsh=[];
    play({dur:6.4,fov:46,shots:[shot(0,[CS.x-3.4,2.0,CS.z+4.6],[CS.x,1.4,CS.z])],says:[[0.3,2.8,'auka','Ну, держитесь! Как гаркну — до Лукоморья долетите!'],[3.4,2.6,'zven','На два пня встаньте — и аукните разом!']],
      events:[{t:0,fn:()=>{anim(1.6,k=>{walls.forEach(w=>{w.x=w.sd*(Math.abs(w.x)+k*6);w.firs.forEach(f=>{f.m.ax=f.m.bx=w.x;});});});}},{t:1.8,fn:()=>{wallsShow(false);}},{t:3.4,fn:()=>{ES.forEach(s=>{s.ring.visible=true;});}}],
      end:()=>{A.ph=3;wallsShow(false);e.embers=6;e.maxEmb=6;e.state='idle';e.dazeT=0;A.cyc=1.5;A.stompN=0;A.windT=0;ES.forEach(s=>{s.ring.visible=false;});
        banner('Большое «АУ!»','#9fd0ff',2.6,'белое кольцо — прыгай; надул щёки — аукните с двух пней разом или за щит Потапа');setObj();}});}
  function friendScene(){if(A.ph!==3)return;A.ph=3.5;const e=A.e,at=new V3(CS.x,0,CS.z);[A.ring,A.shout].forEach(q=>{if(q)W.group.remove(q.m);});A.ring=A.shout=null;
    play({dur:15,fov:46,shots:[shot(0,[at.x+3.2,2.0,at.z+4.4],[at.x,1.0,at.z]),shot(5.2,[at.x-4,2.6,at.z+5.2],[at.x,1.2,at.z]),shot(10.4,[0,3.4,-209],[0,1.6,-216])],
      says:[[0.3,3.4,'auka','<i>(всхлипывает)</i> Никто со мной не аукался… Все только блудили да боялись.'],[4.0,1.8,'pelageya','Ау, Аука!'],[5.6,1.8,'potap','Ау-у!'],
        [7.2,3.0,'auka','Ой… ответили! Хи-хи! Ау-ау!'],[10.6,3.2,'auka','Пойдёмте, я выход покажу. Кто аукнет — того не брошу!']],
      events:[{t:0,fn:()=>{e.g.visible=true;e.state='idle';e.dazeT=0;placeAuka(at.x,at.z,0.55);const pl=[[-2.2,1.8],[2.2,1.8],[-1.2,3.0],[1.2,3.0]];HEROES.forEach((q,i)=>{placeOnGround(q,at.x+pl[i][0],at.z+pl[i][1],0);q.face=Math.atan2(at.x-q.pos.x,at.z-q.pos.z);});
          e.L.body.rotation.x=0.3;}},
        {t:4.0,fn:()=>{for(const q of HEROES)floatText(q.pos.clone().add(new V3(0,q.d.height+0.7,0)),'Ау!',PCSS[q.player]);SFX.call();}},
        {t:7.2,fn:()=>{e.L.body.rotation.x=0;anim(3,k=>{e.g.position.y=0.55+Math.abs(Math.sin(k*Math.PI*5))*0.4;});for(let i=0;i<10;i++)burst(new V3(at.x+rand(-1,1),rand(1,2.5),at.z+rand(-1,1)),i%2?COL.gold:0xc8e070,3,3);}},
        {t:10.4,fn:()=>{AR.cleared=true;AR.hold=1.6;K14.barrier.forceOpen=true;SFX.gate();}}],
      end:()=>{A.ph=4;AR.cleared=true;AR.hold=1.6;K14.barrier.forceOpen=true;e.alive=false;e.state='dying';W.group.remove(e.g);{const i=W.enemies.indexOf(e);if(i>=0)W.enemies.splice(i,1);}
        const fr=new THREE.Group();fr.position.set(-3.4,0,-213.5);W.group.add(fr);const inner=new THREE.Group();fr.add(inner);const L=FL.auka(inner);fr.traverse(c=>{c.userData.noBatch=true;});
        for(const sd of[-1,1]){addMesh(new THREE.SphereGeometry(0.11,10,8),M(0xfbf8ee),sd*0.2,0.98,0.5,inner);addMesh(new THREE.SphereGeometry(0.05,8,6),MAT.dark,sd*0.2,0.98,0.6,inner);}
        A.friend={g:fr,L,t:0};banner('Подружились!','#c8e070',2.4,'Аука выход покажет — ступайте за ним');}});}
  // ---- задачи и рамка ----
  function setObj(){for(const pi of[0,1]){const L=W.objectives[pi];const o=L.find(q=>q._k14fight)||L.find(q=>typeof q.text==='function'&&/Лешачата!/.test(q.text()));if(!o)continue;o._k14fight=true;
    o.text=()=>A.ph<1.5?'Аука прячется в дуплах. Аукни '+K(pi,'call')+' — настоящее дупло откликнется золотом.<br>Синий «ау-шар» отбей щитом '+K(pi,'guard')+' в последний миг, с красной дорожки — сойди!'
      :A.ph<2.5?'Подголоски! Стены ёлок стоят, пока на них глядишь.<br>Один держит стену взглядом, другой распутывает лешачат.'
      :'Белое кольцо — прыгай '+K(pi,'jump')+'. Надул щёки — встаньте на два пня и аукните '+K(pi,'call')+' разом!<br>Не успели — прячьтесь за Широкий щит Потапа.';
    o.targets=()=>A.ph===1?(A.e&&A.e.state!=='hide'?[A.e.g]:HL.filter(q=>q.markT>0).map(q=>q.g)):A.ph===2?A.lsh.filter(q=>q.alive).map(q=>q.g):A.ph===3?(A.windT>0?ES.map(s=>s.g):A.e?[A.e.g]:[]):[];}}
  const bb=$('bossbar');let bbOn=false;
  function bar(){const ph=A.ph;if(!G.cine&&ph>=1&&ph<4&&A.e){const st=Math.floor(ph),nm=['','где я? — аукни','подголоски','большое «АУ»'][st],n=A.e.embers;
      const h='<b>Аука</b> · этап '+st+' / 3 · '+nm+'<span class="seg"><i style="width:'+Math.round(100*n/(A.e.maxEmb||6))+'%"></i></span>';if(bb.innerHTML!==h)bb.innerHTML=h;bb.style.display='block';bbOn=true;}
    else if(bbOn){bb.style.display='none';bbOn=false;}}
  {const _ol=W.onLeave;W.onLeave=()=>{bb.style.display='none';bbOn=false;if(_ol)_ol();};}
  W.updates.push(dt=>{bar();
    if(A.ph===0&&F.krugDone&&!G.cine&&[0,1].some(pi=>active(pi).pos.z<-194))introScene();
    if(A.ph===1)tickP1(dt);else if(A.ph===2)tickP2(dt);else if(A.ph===3)tickP3(dt);
    if(A.friend){const f=A.friend;f.t+=dt;f.g.rotation.y=Math.sin(G.time*1.2)*0.5;f.L.arms[1].rotation.x=-2+Math.sin(G.time*6)*0.4;if(f.t>4){f.t=0;floatText(f.g.position.clone().add(new V3(0,2.2,0)),'Ау! Сюда!','#c8e070');}}});
  // соло: оставленный на пне-эхо — «держит» свой пень (аукнет сам); подсказка над ним
  W.tipZones.push({cond:(pi,h)=>A.ph===3&&A.windT>0&&ES.some(s=>hd(h.pos,s)<1.6),text:pi=>'Аукни '+K(pi,'call')+' — вместе со вторым пнём!'});
  A.dbg=()=>({ph:A.ph,e:A.e,HL,ES,walls,lsh:A.lsh,real:A.real,windT:A.windT,ring:A.ring,shout:A.shout,leaf:A.leaf});
  K14.auka=A;}
{const _b14=build14;build14=function(){_b14.apply(this,arguments);try{auka14Setup();}catch(err){console.error('auka14',err);}};}
// на поляне-петле и у Ауки кнопка зова — «Ау!»: над героем так и пишется (вместо «Ко мне!»)
{const _dc=doCall;doCall=function(pi){const h=active(pi);if(!(W&&W.levelId==='1-4'&&W.k14&&h&&h.pos.z<-157))return _dc.apply(this,arguments);
  const ft=floatText;floatText=function(p,t,c){return ft(p,t==='Ко мне!'||t==='Все ко мне, ко мне!'?'Ау!':t,c);};try{return _dc.apply(this,arguments);}finally{floatText=ft;}};}
