/* ============================== РЕЛИЗ final06 · 1-4 «ЛЕШИЙ ВОДИТ»: АУКА-ПЕРЕКЛИЧКА — МИРНАЯ ИГРА «ПОВТОРИ ЗА МНОЙ» ============================== */
// В конце леса, после поляны-петли, живёт Аука — пузатый лесной дух во мху, щёки-мешки, шапка-мухомор. Не злодей: ему просто не с кем
// перекликаться. Боя нет — в конце мира и так Веретенник (1-5) и Леший (1-Б): Аука сидит на пне посреди поляны и поёт «ау» дуплами,
// а герои повторяют. У каждого из четырёх дупел свой голос, цвет и знак над ним (лист, капля, цветок, звезда — различимы и без цвета).
//   Песенка: Аука поёт — дупла по очереди светятся и звучат («Слушай!»); потом «Теперь вы!» — встань в цветной круг у дупла и аукни
//   (кнопка зова — здесь «Ау!»): дупло отвечает своим голосом. Всё по порядку — песенка спета; ошибся — Аука хихикает и поёт снова,
//   без наказания; после двух ошибок подряд следующее дупло подсказывается мерцанием круга.
//   Три песенки: на Лёгком пути 2 → 3 → 4 «ау», на Среднем 3 → 4 → 5, на Богатырском 3 → 5 → 6 (песенка растёт — к прежней добавляется новое «ау»).
//   Вдвоём аукают оба — в общую песенку; напарник-бот (late_73e) берёт каждое второе «ау». В одиночку — сам.
//   Конец: «Ой… ответили!» — подружились, ворота открыты, Аука ведёт к выходу из леса.
// W.k14 — из build14 (арена, ворота, ёлки-прятки). Реплики Ауки — voice/lines.json 1-4_a01…a08 (записи пока нет — бормотание с подписью).
WHO.auka=['Аука','#c8e070'];VOICE.auka={f:300,w:'triangle',sp:0.085};
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
// голоса дупел: цвет, нота и знак над дуплом (форма — для тех, кто цвета различает плохо)
const AUKA14_V=[{col:0x7ad070,css:'#9fe890',f:392,sign:'leaf'},{col:0x5aa8ff,css:'#9fd0ff',f:440,sign:'drop'},{col:0xff8fb0,css:'#ffb8cc',f:523,sign:'flower'},{col:0xffa64a,css:'#ffc890',f:587,sign:'star'}];
// поющее дупло: толстый пень-дуплянка, дыра смотрит на середину; цветной поясок, знак над ним и круг на земле, где встать
function auka14Hollow(x,z,face,v){const g=new THREE.Group();g.position.set(x,0,z);g.rotation.y=face;W.group.add(g);const bark=M(0x5a4028),moss=M(0x5a7a34);
  addMesh(new THREE.CylinderGeometry(0.85,1.05,3.0,12),bark,0,1.5,0,g);addMesh(new THREE.CylinderGeometry(0.9,0.9,0.3,12),moss,0,3.0,0,g);
  const hole=addMesh(new THREE.CircleGeometry(0.42,16),MB(0x140c06),0,1.25,0.87,g);hole.scale.y=1.35;
  const rim=addMesh(new THREE.TorusGeometry(0.44,0.07,6,18),M(0x3a2a18),0,1.25,0.86,g);rim.scale.y=1.35;
  for(let i=0;i<3;i++){const r=addMesh(new THREE.CylinderGeometry(0.1,0.18,1.2,5),bark,Math.cos(i*2.1)*0.95,0.2,Math.sin(i*2.1)*0.95,g);r.rotation.set(Math.sin(i*2.1)*0.7,0,-Math.cos(i*2.1)*0.7);}
  const lm=M(v.col,{emissive:v.col,emissiveIntensity:0.25});
  const band=addMesh(new THREE.CylinderGeometry(0.93,0.95,0.22,14,1,true),lm,0,2.3,0,g);band.material.side=THREE.DoubleSide;
  const sg=new THREE.Group();sg.position.set(x,4.0,z);W.group.add(sg);
  if(v.sign==='leaf'){const m=new THREE.Mesh(new THREE.SphereGeometry(0.34,10,8),lm);m.scale.set(0.55,1.1,0.18);sg.add(m);}
  else if(v.sign==='drop'){const m=new THREE.Mesh(new THREE.SphereGeometry(0.28,12,10),lm);sg.add(m);const t=new THREE.Mesh(new THREE.ConeGeometry(0.2,0.36,10),lm);t.position.y=0.3;sg.add(t);}
  else if(v.sign==='flower'){for(let i=0;i<5;i++){const a=i/5*Math.PI*2,m=new THREE.Mesh(new THREE.SphereGeometry(0.16,8,6),lm);m.position.set(Math.cos(a)*0.24,Math.sin(a)*0.24,0);sg.add(m);}sg.add(new THREE.Mesh(new THREE.SphereGeometry(0.13,8,6),M(0xfff4c0)));}
  else{const m=new THREE.Mesh(new THREE.OctahedronGeometry(0.34),lm);m.scale.set(1,1,0.4);sg.add(m);}
  sg.traverse(c=>{c.castShadow=false;c.userData.noBatch=true;});band.userData.noBatch=true;
  const mx=x+Math.sin(face)*1.8,mz=z+Math.cos(face)*1.8;   // где встать: перед дырой
  const ring=new THREE.Mesh(new THREE.RingGeometry(0.85,1.15,28),MB(v.col,{transparent:true,opacity:0.45,depthWrite:false}));ring.rotation.x=-Math.PI/2;ring.position.set(mx,0.05,mz);ring.castShadow=false;ring.userData.noBatch=true;W.group.add(ring);
  W.cyls.push({x,z,r:1.0,miny:-1,maxy:3.2,on:true});
  return {x,z,g,mx,mz,v,lm,band,sg,ring,flash:0,hint:false};}
function auka14Setup(){const K14=W.k14;if(!K14||W.levelId!=='1-4')return;const F=W.flags,AR=K14.arena,T=HERO,z0=-191,mid=-203,CS={x:0,z:-205};
  AR.custom=true;K14.hideFirs.forEach(f=>{f.g.visible=false;f.col.on=false;});
  const HL=[[-6.8,-196.5],[6.8,-196.5],[-6.8,-210],[6.8,-210]].map(([x,z],i)=>auka14Hollow(x,z,Math.atan2(CS.x-x,CS.z-z),AUKA14_V[i]));
  const pulpit=new THREE.Group();pulpit.position.set(CS.x,0,CS.z);W.group.add(pulpit);addMesh(new THREE.CylinderGeometry(1.0,1.15,0.55,16),M(0x8a5a32),0,0.27,0,pulpit);
  {const tr=addMesh(new THREE.TorusGeometry(0.7,0.04,6,24),M(0xd2a870),0,0.56,0,pulpit);tr.rotation.x=Math.PI/2;}W.cyls.push({x:CS.x,z:CS.z,r:1.1,miny:-1,maxy:0.55,on:true});
  // Аука — не морок: живая фигурка на пне (глаза — как у друга после ролика)
  const ag=new THREE.Group();ag.position.set(CS.x,0.55,CS.z);ag.visible=false;W.group.add(ag);const inner=new THREE.Group();ag.add(inner);const L=FL.auka(inner);
  for(const sd of[-1,1]){addMesh(new THREE.SphereGeometry(0.11,10,8),M(0xfbf8ee),sd*0.2,0.98,0.5,inner);addMesh(new THREE.SphereGeometry(0.05,8,6),MAT.dark,sd*0.2,0.98,0.6,inner);}
  ag.traverse(c=>{c.userData.noBatch=true;});
  const aHead=new THREE.Object3D();aHead.position.set(0,0.98,0.3);L.body.add(aHead);if(typeof regNpc==='function')regNpc({g:ag,body:L.body,head:aHead},'auka');   // для роликов: лицо Ауки
  const LEN={easy:[2,3,4],mid:[3,4,5],hard:[3,5,6]};
  const A={ph:0,st:'idle',r:0,seq:[],need:0,pos:0,miss:0,t:0,si:0,idle:0,look:null,sing:0,hop:0,g:ag,L,friend:null,score:0,auT:6};
  const path=()=>genPath(),noteT=()=>({easy:1.0,mid:0.8,hard:0.65})[path()]||0.8;
  const aSay=(t,d)=>{floatText(ag.position.clone().add(new V3(0,2.3,0)),t,'#e8f8a0');say('auka',t,d||1.8);};
  // дупло поёт: поясок и знак вспыхивают, круг мигает, своё «Ау!» своим голосом
  function sing(i,col){const q=HL[i];q.flash=0.55;tone(q.v.f,0.42,'triangle',0.08,q.v.f);tone(q.v.f*2,0.3,'sine',0.025,q.v.f*2);
    floatText(new V3(q.x,4.6,q.z),'Ау!',col||q.v.css);ringFx(new V3(q.mx,0.2,q.mz),q.v.col,1.6);A.look=q;}
  // ---- ход игры ----
  function startRound(r){A.r=r;A.need=(LEN[path()]||LEN.mid)[r];while(A.seq.length<A.need){let n;do{n=Math.floor(Math.random()*4);}while(n===A.seq[A.seq.length-1]);A.seq.push(n);}
    A.seq.length=A.need;A.miss=0;HL.forEach(q=>{q.hint=false;});later(1.0,showSeq);}
  function showSeq(){if(A.ph!==1)return;A.st='show';A.si=0;A.t=-0.5;A.pos=0;HL.forEach(q=>{q.hint=false;});
    aSay(A.miss?'Слушай ещё раз!':A.r===0?'Слушай!':A.r===2?'Последняя — самая длинная!':'Длиннее спою — не собьётесь?',1.8);}
  function toPlay(){A.st='play';A.idle=0;A.look=null;aSay('Теперь вы!',1.4);if(A.miss>=2)HL[A.seq[A.pos]].hint=true;setObj();}
  function roundDone(){A.st='ok';A.score++;A.hop=1.6;SFX.ok();burst(ag.position.clone().add(new V3(0,1.6,0)),COL.gold,18,3);aSay('Ай да голоса!',1.6);
    HL.forEach((q,i)=>later(i*0.12,()=>sing(i)));
    if(A.r>=2)later(2.2,friendScene);else later(2.4,()=>{if(A.ph===1)startRound(A.r+1);});}
  function oops(i){A.st='oops';A.miss++;SFX.miss();aSay('Хи-хи! Не так!',1.4);A.hop=0.6;burst(new V3(HL[i].mx,1.2,HL[i].mz),0x8ab04a,8,2);later(1.7,showSeq);}
  function call(pi,h){if(A.ph!==1)return;
    if(A.st==='show'){floatText(h.pos.clone().add(new V3(0,h.d.height+0.7,0)),'Тсс! Слушай!','#e8f8a0');return;}
    if(A.st!=='play')return;const i=HL.findIndex(q=>Math.hypot(h.pos.x-q.mx,h.pos.z-q.mz)<1.9);
    if(i<0){tip(pi,'Встань в цветной круг у дупла — и аукни '+K(pi,'call')+'!',2.4);return;}
    sing(i,PCSS[pi]);A.idle=0;HL.forEach(q=>{q.hint=false;});
    if(i===A.seq[A.pos]){A.pos++;if(A.pos>=A.need)roundDone();else if(A.miss>=2)HL[A.seq[A.pos]].hint=true;}else oops(i);}
  {const prev=W.pingCall;W.pingCall=(pi,h)=>{if(prev)prev(pi,h);call(pi,h);};}
  function tick(dt){A.t+=dt;
    if(A.st==='show'){const nt=noteT();if(A.t>=0&&A.si<A.need&&A.t>=A.si*nt){sing(A.seq[A.si]);A.sing=0.4;A.si++;}if(A.si>=A.need&&A.t>=A.need*nt+0.3)toPlay();}
    else if(A.st==='play'){A.idle+=dt;if(A.idle>10){A.idle=0;for(const p of[0,1])tip(p,'Встань в круг у дупла, что пело первым, — и аукни '+K(p,'call')+'!',3.4);}}}
  // ---- ролики ----
  function gather(){for(const q of HEROES){if(q.cling)continue;const a=G.solo?active(G.soloPi):active(q.player);if(q===a)continue;if(hd(q.pos,a.pos)>8){placeOnGround(q,clamp(a.pos.x+(q.player?1.4:-1.4),-9,9),Math.min(a.pos.z+1.2,z0-1),0);q.following=true;}}}
  function introScene(){A.ph=0.5;AR.started=true;ag.visible=true;
    const def={dur:10.6,fov:46,shots:[shot(0,[0,3.4,z0-0.5],[0,1.4,mid],[0,2.6,mid+6],[0,1.4,mid],3.6),shot(3.6,[CS.x+2.6,1.9,CS.z+3.6],[CS.x,1.4,CS.z])],
      says:[[0.3,3.2,null,'<i>Поляна, а вокруг — дуплистые пни. Из каждого — «Ау!» своим голосом.</i>',true],[3.6,3.4,'auka','<i>(вздыхает)</i> Никто со мной не аукается… Все только блудят да боятся.'],
        [7.2,3.2,'auka','Поаукаемся? Я спою — а вы повторите!']],
      events:[{t:0,fn:()=>gather()},{t:1.0,fn:()=>{HL.forEach((q,i)=>later(i*0.4,()=>sing(i)));}},{t:7.2,fn:()=>{A.hop=0.8;}}],
      end:()=>{A.ph=1;banner('Аука-Перекличка','#c8e070',2.8,'слушай, какие дупла поют, — и повтори: встань в круг у дупла и аукни');startRound(0);setObj();}};
    play(FIN.k14AukaIntro?FIN.k14AukaIntro(def,{A,ag,L,hd:aHead,HL,CS,z0}):def);}
  function friendScene(){if(A.ph!==1)return;A.ph=3.5;A.st='done';const at=new V3(CS.x,0,CS.z);
    const def={dur:12.6,fov:46,shots:[shot(0,[at.x+3.2,2.0,at.z+4.4],[at.x,1.0,at.z]),shot(4.6,[at.x-4,2.6,at.z+5.2],[at.x,1.2,at.z]),shot(8.4,[0,3.4,-209],[0,1.6,-216])],
      says:[[0.3,3.0,'auka','Ой… ответили! Хи-хи! Ау-ау!'],[3.4,1.6,'pelageya','Ау, Аука!'],[4.9,1.5,'potap','Ау-у!'],[6.5,4.0,'auka','Пойдёмте, я выход покажу. Кто аукнет — того не брошу!']],
      events:[{t:0,fn:()=>{const pl=[[-2.2,1.8],[2.2,1.8],[-1.2,3.0],[1.2,3.0]];HEROES.forEach((q,i)=>{placeOnGround(q,at.x+pl[i][0],at.z+pl[i][1],0);q.face=Math.atan2(at.x-q.pos.x,at.z-q.pos.z);});A.hop=3;
          for(let i=0;i<10;i++)burst(new V3(at.x+rand(-1,1),rand(1,2.5),at.z+rand(-1,1)),i%2?COL.gold:0xc8e070,3,3);}},
        {t:3.4,fn:()=>{for(const q of HEROES)floatText(q.pos.clone().add(new V3(0,q.d.height+0.7,0)),'Ау!',PCSS[q.player]);SFX.call();HL.forEach((q,i)=>later(i*0.15,()=>sing(i)));}},
        {t:8.4,fn:()=>{AR.cleared=true;AR.hold=1.6;K14.barrier.forceOpen=true;SFX.gate();}}],
      end:()=>{A.ph=4;AR.cleared=true;AR.hold=1.6;K14.barrier.forceOpen=true;ag.position.set(-3.4,0,-213.5);A.friend={t:0};banner('Подружились!','#c8e070',2.4,'Аука выход покажет — ступайте за ним');}};
    play(FIN.k14AukaFriend?FIN.k14AukaFriend(def,{A,ag,L,hd:aHead,HL,CS,z0}):def);}
  // ---- задачи и рамка ----
  function setObj(){for(const pi of[0,1]){const Lo=W.objectives[pi];const o=Lo.find(q=>q._k14fight)||Lo.find(q=>typeof q.text==='function'&&/Лешачата!/.test(q.text()));if(!o)continue;o._k14fight=true;
    o.text=()=>A.st==='show'?'Слушай, какие дупла поют «ау»… Песенка '+(A.r+1)+' / 3.'
      :(G.solo?'Повтори за Аукой: встань в цветной круг у дупла и аукни '+K(pi,'call')+'. Песенка '+(A.r+1)+' / 3.'
        :'Повторяйте вдвоём: встань в цветной круг у дупла и аукни '+K(pi,'call')+'. Песенка '+(A.r+1)+' / 3.');
    o.targets=()=>A.ph!==1?[]:A.st==='show'?[ag]:HL.some(q=>q.hint)?HL.filter(q=>q.hint).map(q=>q.g):HL.map(q=>q.g);}}
  const bb=$('bossbar');let bbOn=false;
  function bar(){if(!G.cine&&A.ph===1){const h='<b>Аука</b> · песенка '+(A.r+1)+' / 3 · '+(A.st==='show'?'слушай':'повтори')+'<span class="seg"><i style="width:'+Math.round(100*(A.st==='play'?A.pos/A.need:0))+'%"></i></span>';
      if(bb.innerHTML!==h)bb.innerHTML=h;bb.style.display='block';bbOn=true;}else if(bbOn){bb.style.display='none';bbOn=false;}}
  {const _ol=W.onLeave;W.onLeave=()=>{bb.style.display='none';bbOn=false;if(_ol)_ol();};}
  W.updates.push(dt=>{bar();
    if(A.ph===0&&F.krugDone&&!G.cine&&[0,1].some(pi=>active(pi).pos.z<-194))introScene();
    if(A.ph===1)tick(dt);
    const t=G.time;A.sing=Math.max(0,A.sing-dt);A.hop=Math.max(0,A.hop-dt);
    for(const q of HL){q.flash=Math.max(0,q.flash-dt);const hp=q.hint&&A.st==='play'?0.5+0.5*Math.sin(t*8):0;q.lm.emissiveIntensity=0.25+q.flash*2.4+hp*0.6;
      q.sg.position.y=4.0+Math.sin(t*2+q.x)*0.12+q.flash*0.5;q.sg.rotation.y+=dt*(0.6+q.flash*6);q.ring.material.opacity=0.35+q.flash+hp*0.5;q.ring.scale.setScalar(1+q.flash*0.3+hp*0.12);}
    if(ag.visible){const tg=A.look&&A.st!=='play'?A.look:null;const ty=tg?Math.atan2(tg.x-ag.position.x,tg.z-ag.position.z):A.friend?Math.sin(t*1.2)*0.5:Math.atan2(-ag.position.x,z0-ag.position.z);
      ag.rotation.y+=(ty-ag.rotation.y)*Math.min(1,dt*6);const base=A.friend?0:0.55;ag.position.y=base+(A.hop>0?Math.abs(Math.sin(A.hop*Math.PI*3))*0.45:Math.sin(t*2)*0.03);
      L.mouth.scale.set(1.2,A.sing>0||A.st==='oops'?1.3:0.5,0.4);L.cheeks.forEach(c=>{c.scale.setScalar(1+A.sing*0.6);});L.hat.rotation.z=Math.sin(t*1.5)*0.06+(A.st==='oops'?Math.sin(t*12)*0.2:0);
      L.ears.forEach((l,i)=>{l.rotation.x=Math.sin(t*3+i)*0.2;});L.arms.forEach((a,i)=>{a.rotation.x=A.hop>0||A.friend&&i===1?-2+Math.sin(t*6+i)*0.4:Math.sin(t*2+i)*0.2;});}
    if(A.friend){const f=A.friend;f.t+=dt;if(f.t>7){f.t=0;floatText(ag.position.clone().add(new V3(0,2.2,0)),'Ау! Сюда!','#c8e070');if(!F.out)say('auka','Ау! Сюда!',1.2);}}});
  W.tipZones.push({cond:(pi,h)=>A.ph===1&&A.st==='play'&&HL.some(q=>Math.hypot(h.pos.x-q.mx,h.pos.z-q.mz)<1.9),text:pi=>'Аукни '+K(pi,'call')+' — дупло запоёт!'});
  A.dbg=()=>({ph:A.ph,st:A.st,r:A.r,seq:A.seq.slice(),pos:A.pos,need:A.need,miss:A.miss,HL,ES:[],ag});
  K14.auka=A;}
{const _b14=build14;build14=function(){_b14.apply(this,arguments);try{auka14Setup();}catch(err){console.error('auka14',err);}};}
// на поляне-петле и у Ауки кнопка зова — «Ау!»: над героем так и пишется (вместо «Ко мне!»);
// зов не снимает с места героя, оставленного на пне-эхо поляны-петли (в одиночке «Все ко мне!» звал бы и его)
{const _dc=doCall;doCall=function(pi){const h=active(pi);if(!(W&&W.levelId==='1-4'&&W.k14&&h&&h.pos.z<-157))return _dc.apply(this,arguments);
  const K14=W.k14,stumps=[K14.KG.stump],keep=HEROES.filter(q=>(G.solo?q!==h:!q.active)&&!q.following&&stumps.some(s=>hd(q.pos,s)<1.6));
  const ft=floatText;floatText=function(p,t,c){return ft(p,t==='Ко мне!'||t==='Все ко мне, ко мне!'?'Ау!':t,c);};try{return _dc.apply(this,arguments);}finally{floatText=ft;keep.forEach(q=>{q.following=false;});}};}
