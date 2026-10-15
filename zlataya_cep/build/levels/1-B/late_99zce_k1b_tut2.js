/* ============================== РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: РОЛИК-УРОК ПЕРЕД ЭТАПОМ 2 «ИЩИ-СВИЩИ» ============================== */
// Ручная постановка (def.kino, docs/40_kino_pravila.md): 25 с, 9 планов — после ролика «Нате вам — четыре Лешего!», перед прятками. Двойники, колышки и белка — настоящие:
//   1 четыре Лешего в ряд лицом к нам — «Ну, который из нас настоящий?…»; 2 деталь у земли: за настоящим остаются мох-следы, за двойником — нет;
//   3 Пелагея крупно — Совиный взор, кран вверх: золотой обруч над настоящим; 4 Прошка бросает клубок в колышек — струна поперёк поляны;
//   5 общий низкий: двойник на струне — «Пфф!» и шишки, настоящий — плашмя, звёзды; 6 Потап и Прошка бьют упавшего — «Нашли!»;
//   7 белка на ветке замахивается; 8 общий: шишка — Потап закрывается щитом — шишка отскакивает в двойника, тот лопается; 9 настоящий встаёт — «Ай! Нашли…».
// Пояснения — голосом Сказительницы (ремарки). Двойников ведёт ролик (K1B.hideStep молчит), струна и клубок — только показ; «лопнувшие» двойники в конце на месте, упавший встаёт.
// Конец и пропуск: двойники — на свои места в хороводе, герои — где стояли, надпись «Фаза 2 · двойники» — после урока.
// Один раз за игру (G.flags.k1b[2]); «Показать урок ещё раз» в паузе — на этапе 2, пока настоящий не упал. FIN.k1b.tut2.auto=false — без урока (боты; helpers.js).
const K1T2={auto:true,on:false,runs:0,D:null};K1B.tut2=K1T2;
const k1t2R=(t,a,b)=>clamp((t-a)/(b-a),0,1);
// постановка писана в «сценарном» времени (23,6 с); ролик идёт 25 с — планы растянуты под длину озвученных реплик. F: сцена → ролик, Gi: ролик → сцена
const K1T2_MAP=[[0,0],[3,3.3],[5.8,6.7],[8.8,9.8],[11.6,13.2],[14.6,16.6],[16.8,18.2],[18.4,19.9],[20.6,22.1],[23.6,25]];
function k1t2Map(t,a,b){const M=K1T2_MAP;for(let i=1;i<M.length;i++)if(t<=M[i][a]||i===M.length-1){const p=M[i-1],q=M[i];return p[b]+(q[b]-p[b])*clamp((t-p[a])/(q[a]-p[a]),0,1);}return t;}
const k1t2F=t=>k1t2Map(t,0,1),k1t2Gi=t=>k1t2Map(t,1,0);
const K1T2_P={line:[[-4.6,-15.5],[-1.5,-15.5],[1.6,-15.5],[4.7,-15.5]],pr:new V3(-4.5,0,-3.6),pt:new V3(1.5,0,-4.2),pe:new V3(3.6,0,-4.6),yo:new V3(-1.6,0,-3.2)};
// колышки урока: два южных (их ставит этап 2 — addStakes(4)); нет — ставим точки
function k1t2Stakes(C){const want=[[C.x-7.42,C.z+7.42],[C.x+7.42,C.z+7.42]];return want.map(([x,z])=>{let b=null,bd=2.5;for(const s of W.stakes){const d=Math.hypot(s.x-x,s.z-z);if(d<bd){bd=d;b=s;}}return b?new V3(b.x,0.62,b.z):new V3(x,0.62,z);});}
// двойники в ролике: путь по времени — [t0,x0,z0,t1,x1,z1], между — шаг с easing; поворот — по ходу, стоя — лицом к камере (к югу)
function k1t2Path(seg,t){let p=null;for(const s of seg){if(t<s[0]){if(!p)p=[s[1],s[2],0];break;}const k=CINE.E.inOutSine(k1t2R(t,s[0],s[3]));p=[lerp(s[1],s[4],k),lerp(s[2],s[5],k),t<s[3]?Math.atan2(s[4]-s[1],s[5]-s[2]):null];}
  return p||[seg[seg.length-1][4],seg[seg.length-1][5],null];}
function k1t2Dbls(dt){const D=K1T2.D;if(!D)return;const t=D.t,C=D.C;
  for(const d of D.all){const m=d.m,P=D.path.get(d);if(!P){d.pos.set(C.x+(D.all.indexOf(d)-2)*3,0,C.z-9);continue;}   // лишние (круг 2) — у дальнего края
    const p=k1t2Path(P,t),ox=d.pos.x,oz=d.pos.z;d.pos.x=p[0];d.pos.z=p[1];const mv=Math.hypot(d.pos.x-ox,d.pos.z-oz);
    const want=p[2]!=null?p[2]:(D.lookAt&&D.lookAt.get(d)!=null?D.lookAt.get(d):0);m.g.rotation.y+=(k1tWrap(want-m.g.rotation.y))*Math.min(1,dt*8);
    if(d===D.real&&D.fell){m.body.rotation.x=-1.3*(1-k1t2R(t,20.4,21.0));m.g.position.y=0.3*(1-k1t2R(t,20.4,21.0));d.t=0;}
    else{m.body.rotation.x=0;m.g.position.y=mv>0.002?Math.abs(Math.sin(t*9+D.all.indexOf(d)))*0.08:0;}
    m.body.rotation.z=Math.sin(t*5+D.all.indexOf(d))*0.06+(t<3?Math.sin(t*7+D.all.indexOf(d)*1.7)*0.08:0);   // в первом кадре — пританцовывают
    if(d===D.real&&mv>0.002&&t>2.9&&t<6){D.acc+=mv;if(D.acc>1.15){D.acc=0;K1F.print(d.pos.x,d.pos.z);}}}   // мох-следы — только за настоящим
  // звёзды над упавшим
  if(D.stars){const on=D.fell&&t<20.5;D.stars.forEach((s,i)=>{s.visible=on;if(on){const a=G.time*4+i*2.1;s.position.set(D.real.pos.x+Math.cos(a)*1.4,1.5+Math.sin(G.time*5+i)*0.15,D.real.pos.z+Math.sin(a)*1.4);s.rotation.y=a*2;}});}
  // обруч Совиного взора
  K1M2.halo(D.real,t>6.7&&t<12?Math.min(1,(t-6.7)/0.35,(12-t)/0.4):0);}
const k1tWrap=a=>{while(a>Math.PI)a-=2*Math.PI;while(a<-Math.PI)a+=2*Math.PI;return a;};
// герои: по местам, Прошка бросает клубок, Потап и Прошка бьют упавшего, Потап закрывается щитом от шишки
function k1t2Heroes(){const D=K1T2.D;if(!D)return;const t=D.t,E=CINE.E,H=HERO,P=K1T2_P,R=D.real;
  const put=(h,p,face)=>{if(!h)return;const ox=h.pos.x,oz=h.pos.z;h.pos.set(p.x,0,p.z);h.vel.set((p.x-ox)*12,0,(p.z-oz)*12);h.knockT=0;if(face!=null)h.face=face;};
  const tw=(h,q)=>Math.atan2(q.x-h.pos.x,q.z-h.pos.z),mv=(a,b,k)=>new V3(lerp(a.x,b.x,k),0,lerp(a.z,b.z,k));
  const pr=H.proshka,pt=H.potap,pe=H.pelageya,yo=H.yosha,near=R.pos.clone(),hitPt=new V3(R.pos.x+1.5,0,R.pos.z+1.3),hitPr=new V3(R.pos.x-1.2,0,R.pos.z+1.6);
  if(pr){if(t<14.6)put(pr,P.pr,t<8.8||t>9.9?tw(pr,t<8.8?R.pos:new V3(-2,0,-9)):tw(pr,D.st[0]));
    else if(t<15.4)put(pr,mv(P.pr,hitPr,E.inOutSine(k1t2R(t,14.6,15.4))),tw(pr,near));else if(t<17.2)put(pr,hitPr,tw(pr,near));
    else put(pr,mv(hitPr,P.pr,E.inOutSine(k1t2R(t,17.2,18.2))),tw(pr,D.F2.pos));
    if(t>=9.15&&!D.thr){D.thr=1;pr.atkT=0.3;}for(const[q,n]of[[15.55,'a'],[16.05,'b']])if(t>=q&&!D['pr'+n]){D['pr'+n]=1;pr.atkT=0.28;}}
  if(pt){if(t<14.6)put(pt,P.pt,tw(pt,t<11?R.pos:new V3(0,0,-8)));
    else if(t<15.3)put(pt,mv(P.pt,hitPt,E.inOutSine(k1t2R(t,14.6,15.3))),tw(pt,near));else if(t<17.0)put(pt,hitPt,tw(pt,near));
    else put(pt,mv(hitPt,P.pt,E.inOutSine(k1t2R(t,17.0,17.9))),t<18.2?null:tw(pt,D.sq?new V3(D.sq.x,0,D.sq.z):near));
    pt.guard=t>=19.05&&t<19.75;for(const[q,n]of[[15.4,'a'],[15.9,'b']])if(t>=q&&!D['pt'+n]){D['pt'+n]=1;pt.atkT=0.28;}}
  if(pe){put(pe,P.pe,tw(pe,t<6.2?R.pos:t<12?R.pos:near));if(t>=6.35&&!D.owl){D.owl=1;pe.atkT=0.2;}}
  if(yo)put(yo,P.yo,tw(yo,t<14?R.pos:near));}
// клубок: летит от Прошки к колышку, потом струна растёт к другому колышку
function k1t2String(D){const g=new THREE.Group();k1Add(g);const ball=new THREE.Mesh(new THREE.SphereGeometry(0.22,10,8),M(COL.p1,{emissive:COL.p1,emissiveIntensity:0.4}));g.add(ball);ball.visible=false;
  const line=new THREE.Mesh(new THREE.CylinderGeometry(0.05,0.05,1,6),M(0xfff0c8,{emissive:0xffe0a0,emissiveIntensity:0.7}));line.visible=false;g.add(line);
  const glow=new THREE.Mesh(new THREE.CylinderGeometry(0.16,0.16,1,8,1,true),new THREE.MeshBasicMaterial({color:0xffe9a0,transparent:true,opacity:0.25,blending:THREE.AdditiveBlending,depthWrite:false}));line.add(glow);
  k1Dyn(g);return {g,ball,line};}
function k1t2StringTick(D){const S=D.str,t=D.t,a=D.st[0],b=D.st[1];if(!S)return;
  const k=k1t2R(t,9.2,9.8);S.ball.visible=t>=9.2&&t<9.85;if(S.ball.visible){const p0=HERO.proshka?HERO.proshka.pos.clone().setY(1.2):a.clone();S.ball.position.lerpVectors(p0,a,k);S.ball.position.y+=1.6*Math.sin(Math.PI*k);}
  const g=k1t2R(t,9.85,10.35);S.line.visible=t>=9.85&&t<22.6;if(S.line.visible){const e=CINE.E.outCubic(g),end=a.clone().lerp(b,e),len=Math.max(0.01,a.distanceTo(end));S.line.position.copy(a).lerp(end,0.5);S.line.scale.set(1,len,1);
    S.line.quaternion.setFromUnitVectors(new V3(0,1,0),end.clone().sub(a).normalize());const tw=t>12.5&&t<13.6?Math.sin(t*40)*0.06*(1-k1t2R(t,12.5,13.6)):0;S.line.position.y+=tw;}}   // дрожит, когда задели
function k1t2Play(then){const c=K1B.cur;if(!c){if(then)then();return;}const C=c.C,F=K1B.fx,ds=(W.doubles||[]).filter(d=>d.state!=='gone');const real=ds.find(d=>d.real),fk=ds.filter(d=>!d.real);
  if(!real||fk.length<3){if(then)then();return;}K1T2.runs++;K1T2.on=true;K1T.mute=true;
  const L=K1T2_P.line,[F1,F2,F3]=fk,path=new Map(),lookAt=new Map();
  // пути: ряд → следы → к струне → споткнулись; F2 — в стороне, под шишку; F3 — в глубине
  path.set(real,[[0,L[1][0],L[1][1],0.1,L[1][0],L[1][1]],[3.0,-5,-11.4,3.05,-5,-11.4],[3.05,-5,-11.4,5.8,1.2,-11.4],[8.8,1.2,-11.4,11.4,-2,-10.6],[12.4,-2,-10.6,13.4,-2,-6.9]]);
  path.set(F1,[[0,L[0][0],L[0][1],0.1,L[0][0],L[0][1]],[3.0,-4,-13.8,3.05,-4,-13.8],[3.05,-4,-13.8,5.8,2,-13.8],[8.8,2,-13.8,11.4,2.6,-10.6],[11.6,2.6,-10.6,12.6,2.6,-6.75]]);
  path.set(F2,[[0,L[2][0],L[2][1],0.1,L[2][0],L[2][1]],[3.0,5.5,-12,3.05,5.5,-12],[8.8,5.5,-12,11.4,4.6,-9.6]]);
  path.set(F3,[[0,L[3][0],L[3][1],0.1,L[3][0],L[3][1]],[3.0,-6,-16,3.05,-6,-16]]);
  const D=K1T2.D={t:0,C,all:ds,real,F1,F2,F3,path,lookAt,acc:0,fell:false,from:new Map(HEROES.map(h=>[h,h.pos.clone()])),face:new Map(HEROES.map(h=>[h,h.face])),st:k1t2Stakes(C),str:null,stars:k1dStars(real),hid:[],then,sq:null,tmpSq:false};
  D.str=k1t2String(D);
  // белка: та, что уже на ветке (миньоны этапа 2), или временная — на время урока
  D.sq=K1M2.sq[0]||null;if(!D.sq){D.sq=K1M2.squirrel(K1M2.A[0]);D.tmpSq=true;}D.sq.demo=true;D.sq.st='idle';D.sq.cd=99;if(D.sq.tele){D.sq.tele.del();D.sq.tele=null;}K1M2.seen.sq=true;
  W.updates.push(k1t2Upd);
  if(!ACT.npcs.some(n=>n.o===real.m))D.npc=regNpc(real.m,'leshy')&&ACT.npcs[ACT.npcs.length-1];   // говорит настоящий (все четверо — лицом к нам)
  const pop=d=>{if(!d||!d.m.g.visible)return;d.m.g.visible=false;D.hid.push(d);makeCones(d.pos,14);F.puff(d.pos.x,1.2,d.pos.z,5,0xb8d8a8);SFX.crash();floatText(d.pos.clone().add(new V3(0,3,0)),'Пфф! Шишки!','#e0c090');};
  const pt=HERO.potap,sq=D.sq;
  const def={kino:true,dur:25,fov:50,mood:['#c8f0a0',0.05],
    says:[[0.3,3.05,'leshy','Ну, который из нас настоящий? Угадаете — ваша взяла!'],   // время — уже ролика (25 с), длина — по записи
      [3.42,3.32,null,'<i>Настоящего выдают мох-следы — у двойников их нет.</i>',true],
      [6.84,3.05,null,'<i>Совиный взор зажжёт над ним золотой обруч.</i>',true],
      [9.92,3.4,null,'<i>Клубок — в колышек: струна поперёк хоровода!</i>',true],
      [13.36,3.6,null,'<i>Двойник рассыплется шишками, настоящий упадёт — бей!</i>',true],
      [18.28,3.84,null,'<i>Белка кинет шишку — щит! Отскочит в двойника.</i>',true],
      [22.12,2.88,'leshy','Ай! Нашли… Ну, это вам повезло!']],
    shots:[KS(0,[0,4.6,-5.2],[0,3.3,-15.5],{move:'push',amp:0.7}),                                                   // 1 четверо в ряд — средний
      KS(3.0,[-4.6,6.2,-4.8],[-3.4,0.2,-12.0],{p2:[1.4,6.2,-4.8],l2:[1.6,0.2,-12.0],dur:2.8,tr:'whip'}),                    // 2 сверху на тропу: следы
      KS(5.8,[3.9,1.9,-2.2],[3.6,1.3,-4.6],{p2:[4.6,7.2,2.6],l2:[1.2,6.4,-11.4],dur:3.0}),                                 // 3 Пелагея крупно → кран: обруч
      KS(8.8,[3.6,3.4,1.2],[-3.4,0.9,-6.2],{move:'truck',amp:0.6,tr:'whip'}),                                              // 4 клубок и струна
      KS(11.6,[1.5,7.2,2.6],[0,0.8,-8.6],{move:'push',amp:0.5}),                                                           // 5 общий сверху: споткнулись
      KS(14.6,[-5.6,2.7,-2.4],[-1.6,1.1,-7.2],{move:'orbit',amp:0.4,tr:'dip'}),                                             // 6 бьют упавшего
      KS(16.8,[4.6,3.8,-15.6],[9.2,3.1,-17.4],{move:'push',amp:0.5,tr:'whip'}),                                            // 7 белка на ветке
      KS(18.4,[-3.5,7,1.5],[4.5,2.2,-11],{move:'pull',amp:0.5}),                                                            // 8 общий: шишка — щит — двойник
      KS(20.6,[-2.6,4.6,-1.6],[-2,3.6,-6.9],{trk:KC.fcam(real.m,5.6,0.1,0.15,0.25),tr:'whip'})],                              // 9 настоящий крупно
    cues:[[0.15,()=>{ds.forEach((d,i)=>{later(i*0.08,()=>F.puff(d.pos.x,1.4,d.pos.z,4));K1B.emo(d.m,i%2?'laugh':'mock',2.6);});KSND.poof(0);}],[0.9,()=>KSND.creak(0)],
      [3.2,()=>KSND.steps(0,8,0.32)],[3.6,KC.emo('yosha','tilt')],
      [6.35,()=>{try{SFX.owl();}catch(e){}const p=HERO.pelageya;if(p)floatText(p.pos.clone().add(new V3(0,2.4,0)),'Совиный взор!','#e7c3ff');}],[6.5,KC.emo('pelageya','pride')],
      [6.8,()=>{try{tone(880,0.4,'sine',0.06,1320);}catch(e){}F.leaves(real.pos.clone().add(new V3(0,6,0)),10,{spd:1,up:0.4,cols:[0xffe9a0,0xfff6c0]});}],[7.6,KC.emo('potap','surprise')],
      [9.15,()=>{SFX.whoosh();}],[9.85,()=>{try{SFX.thread();}catch(e){}}],[10.3,KC.emo('proshka','pride')],
      [12.0,()=>K1B.emo(F1.m,'surprise',1)],[12.6,()=>{pop(F1);CINE.trauma(0.06);}],[12.9,KC.emo('yosha','laugh')],
      [13.4,()=>{SFX.brk();CINE.trauma(0.08);CINE.punch(-3);F.leaves(real.pos.clone().add(new V3(0,1,0)),14,{spd:1.6,up:0.8});K1B.emo(real.m,'dizzy',0);floatText(real.pos.clone().add(new V3(0,2.4,0)),'Запутался!','#ffd76a');}],
      [13.6,KC.all('cheer')],[15.4,()=>{SFX.ember();spawnSpark(real.pos.clone().add(new V3(0.6,1,0.4)),0x6ad0ff);}],[15.9,()=>{SFX.ember();spawnSpark(real.pos.clone().add(new V3(-0.4,1,0.5)),COL.gold);}],
      [16.1,()=>{SFX.finisher();CINE.punch(-4);CINE.trauma(0.1);ringFx(real.pos,COL.gold,3.5);for(let i=0;i<6;i++)spawnSpark(real.pos.clone().add(new V3(0,1.6,0)),[COL.gold,0x6ad0ff,0xff6a8a][i%3]);
          floatText(real.pos.clone().add(new V3(0,3.4,0)),'Нашли!','#ffd76a');K1B.cheer('hit');}],[16.3,KC.emo('potap','cheer')],[16.4,KC.emo('proshka','joy')],
      [17.0,()=>{try{SFX.yellow();}catch(e){}}],[17.3,()=>{try{for(let i=0;i<3;i++)tone(rand(1500,2000),0.04,'square',0.04,null,i*0.06);}catch(e){}}],
      [19.1,KC.emo('potap','effort')],[19.9,KC.emo('potap','pride')],[20.2,KC.emo('pelageya','joy')],
      [20.6,()=>{K1B.emo(real.m,'hurt',1.2);KSND.creak(0);}],[22.2,()=>{K1B.emo(real.m,'sly',0);KSND.sting(0);}]],
    events:[{t:13.4,fn:()=>{D.fell=true;}}],
    tick:(tc,dt)=>{const t=k1t2Gi(tc);D.t=t;
      // белка: замах 17,1–18,0 (поза — по состоянию), бросок в Потапа; шишка отскакивает в двойника F2
      if(sq){if(t>=17.1&&t<18.0&&sq.st!=='wind'){sq.st='wind';sq.t=0;sq.wd=0.9;sq.tgt=pt;if(pt)D.tele=K1F.teleObj(pt.pos.x,pt.pos.z,1.15,'yellow');}
        if(sq.st==='wind'){sq.t=t-17.1;if(D.tele&&pt){D.tele.g.position.x=pt.pos.x;D.tele.g.position.z=pt.pos.z;D.tele.set(0.55*sq.t/0.9);}}
        if(sq.st==='after'){sq.t=t-18.0;if(sq.t>0.7){sq.st='idle';sq.t=0;}}
        if(t>=18.0&&!D.thrown&&pt){D.thrown=1;sq.st='after';sq.t=0;const cn=K1M2.throwAt(sq,pt,{demo:true,dur:1.1,tele:D.tele,onEnd:(r,d)=>{if(r==='fake'||r==='real')pop(d);}});cn.to=D.F2;cn.forceGuard=true;D.tele=null;D.cone=cn;}}},
    end:()=>k1t2End()};
  // планы, метки и события — из сценарного времени в ролик
  def.shots.forEach(q=>{const o=q.t;q.t=k1t2F(o);if(q.dur)q.dur=k1t2F(o+q.dur)-q.t;});def.cues.forEach(c=>{c[0]=k1t2F(c[0]);});def.events.forEach(e=>{e.t=k1t2F(e.t);});
  D.def=def;play(def);}
function k1t2Upd(dt){k1t2Dbls(dt);k1t2Heroes();const D=K1T2.D;if(D)k1t2StringTick(D);}
function k1t2End(){const D=K1T2.D;if(!D)return;K1T2.D=null;K1T2.on=false;const C=D.C;
  const i=W.updates.indexOf(k1t2Upd);if(i>=0)W.updates.splice(i,1);
  if(D.npc){const j=ACT.npcs.indexOf(D.npc);if(j>=0)ACT.npcs.splice(j,1);}
  if(D.str)k1Del(D.str.g);if(D.stars)D.stars.forEach(s=>W.group.remove(s));if(D.tele)D.tele.del();
  K1M2.cones.slice().forEach(c=>{if(c.demo){k1Del(c.g);if(c.tele)c.tele.del();K1M2.cones.splice(K1M2.cones.indexOf(c),1);}});
  K1M2.halo(D.real,0);
  // двойники — на места в хороводе, «лопнувшие» — снова здесь, упавший встаёт
  for(const d of D.all){d.m.g.visible=true;d.m.body.rotation.x=0;d.m.g.position.y=0;if(d.state!=='gone')d.state='walk';d.t=0;const k=d.k2;
    if(k){k.mode='ring';k.t=0;k.nextHide=rand(3,6);d.pos.set(C.x+Math.cos(k.a)*k.r,0,C.z+Math.sin(k.a)*k.r);}K1B.emo(d.m,'sly',0);}
  const sq=D.sq;if(sq){if(D.tmpSq&&!K1M2.auto)k1m2SqDel(sq,false);else{sq.demo=false;sq.st='idle';sq.t=0;sq.tgt=null;sq.cd=rand(3,4.5);}}
  for(const h of HEROES){const p=D.from.get(h);if(p){placeOnGround(h,p.x,p.z,0);h.face=D.face.get(h);}h.vel.set(0,0,0);h.guard=false;h.atkT=0;h.rollT=0;h.knockT=0;}
  snapCams();K1T.mute=false;
  banner('Фаза 2 · двойники','#b8e070',2.8,'струна на колышках — как на болоте · у настоящего тень');
  const th=D.then;if(th)th();}
K1T2.play=k1t2Play;
// пока идёт урок — двойников ведёт ролик
{const _hs=K1B.hideStep;K1B.hideStep=function(d,dt,C){if(K1T2.D)return;return _hs(d,dt,C);};}
// после ролика «Нате вам — четыре Лешего»: урок (один раз за игру), потом прятки
{const _mid=K1B.cine.mid;K1B.cine.mid=function(d){d=_mid(d);const oe=d.end;d.end=()=>{const go=K1T2.auto&&!FIN.lesson.seen('k1b',2);if(go)K1T.mute=true;oe();K1T.mute=false;
    if(go){FIN.lesson.mark('k1b',2);K1T.mute=true;later(0.05,()=>{if(K1B.cur&&W.flags.phase===2)k1t2Play();else K1T.mute=false;});}};return d;};}
// «Показать урок ещё раз» (пауза): на этапе 2, пока настоящий на ногах; на других этапах — прежние уроки
{const LK=FIN.lesson,prev=LK.reg['1-B'];const can2=()=>!!K1B.cur&&W.flags.phase===2&&!G.cine&&!K1T2.on&&(W.doubles||[]).some(d=>d.real&&d.state==='walk')&&(W.doubles||[]).filter(d=>!d.real&&d.state!=='gone').length>=3;
  LK.regLevel('1-B',()=>{if(can2())k1t2Play();else if(prev)prev.fn();},()=>can2()||(prev?prev.can():false));}
{const _ll=loadLevel;loadLevel=function(i){if(K1T2.D)K1T2.D=null;K1T2.on=false;_ll(i);};}
