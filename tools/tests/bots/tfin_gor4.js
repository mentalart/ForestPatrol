//@@ key=KeyX
// релиз final06, 4-Б «Змей Горыныч»: рык и лава после двух голов, большой вдох (притяжение к средней, щит — слабее, «Ам!», жёлудь обрывает),
// «Вдо-о-ох!» в 4 раза реже, Совиный взор — слабое место (удар — сразу Пробой, даже сытой; взор отдыхает), арена без квадратной земли.
// Обучающие ролики выключены (их проверяет tfin_boss4b), всё остальное — настоящими нажатиями.
Math.random=(()=>{let q=4242;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.G4=ZC.FIN.gor4;window.heads=()=>ZC.W.enemies.filter(e=>e.kind==='golova').sort((a,b)=>a.idx-b.idx);window.A=pi=>ZC.players[pi].heroes[ZC.players[pi].act];
window.hd2=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);window.mouthOf=e=>{const p=new THREE.Vector3();e.L.head.getWorldPosition(p);p.x+=Math.sin(e.face)*1.05;p.z+=Math.cos(e.face)*1.05;return p;};
window.VX=[];ZC.FIN.voxEv=(id,kind)=>{if(kind==='main')VX.push(id);};
window.put=(h,x,z)=>{h.pos.set(x,0,z);h.vel.set(0,0,0);};
window.toAct=(pi,kind)=>{const p=ZC.players[pi];if(p.heroes[p.act].kind!==kind)ZC.press(pi?'KeyK':'KeyQ');ZC.tick(2);return A(pi).kind;};
ZC.startFrom(ZC.LV('4-B'));ZC.G.manual=true;ZC.G.flags.tut4b={1:true,2:true,3:true};ZC.FIN.boss4b.auto=false;ZC.tick(60);ZC.skip();ZC.tick(30);
const W=ZC.W;[W.name,'phase='+W.flags.phase,'hid='+G4.env.hid,'vents='+G4.env.vents.length,'mids='+G4.env.mids.length,'proto ground visible='+W.group.children.some(m=>m.isMesh&&(m.userData.gtop||m.userData.gside)&&m.visible)]
//@@ shot=fin_gor4_roar.png wait=300
// рык: левая и правая — в Пробое → ролик; трещины открываются, гейзеры бьют; потом фаза 2
const W=ZC.W,F=W.flags,hs=heads();for(const e of[hs[0],hs[2]]){e.state='broken';e.t=0;e._b=false;}ZC.tick(2);
const r=['cine='+!!ZC.G.cine,'mode='+G4.mode,'phase='+F.phase];let n=0;while(ZC.G.cine&&ZC.G.cine.t<3.2&&n<400){ZC.tick(1);n++;}
r.push('t3.2 rv='+G4.rv.toFixed(2),'blobs='+(G4.env&&ZC.FIN.gor4Debug()?'ok':''),'Mi y='+hs[1].g.position.y.toFixed(2),'side y='+hs[0].g.position.y.toFixed(2));r
//@@
const W=ZC.W,F=W.flags;let n=0;while(ZC.G.cine&&n<900){ZC.tick(1);n++;}ZC.tick(2);
['after roar phase='+F.phase,'roared='+G4.roared,'rv='+G4.rv,'geyOn='+G4.geyOn,'light='+G4.env.light.intensity.toFixed(2),'heads='+heads().map(e=>e.state).join(','),'stats='+JSON.stringify(G4.stats)]
//@@
// частота «Вдо-о-ох!»: 100 с фазы 2 без ударов — вдохов много, реплика и большой вдох — только каждый четвёртый (первый — второй вдох)
const W=ZC.W,F=W.flags;W.noPetals=true;const P0=G4.stats.pulls,I0=G4.stats.inhales;VX.length=0;const log=[];let prev=0;
for(let i=0;i<100*60;i++){ZC.tick(1);if(G4.stats.inhales!==prev){prev=G4.stats.inhales;log.push((i/60).toFixed(0)+(G4.pull>0?'Б':'м'));}
  for(const pi of[0,1]){const h=A(pi);if(G4.pull<=0&&hd2(h.pos,{x:0,z:-6})>2)put(h,pi?2:-2,-1);}heads().forEach(e=>{if(e.state==='broken'){e.state='idle';e.t=0;e._b=false;}});}
W.noPetals=false;const inh=G4.stats.inhales-I0,big=G4.stats.pulls-P0,vd=VX.filter(id=>id==='4-B_019').length;
['inhales='+inh,'big='+big,'voice vdoh='+vd+' (раньше было бы '+inh+')','ratio='+(inh/Math.max(1,big)).toFixed(1),'seq='+log.join(' ')]
//@@ shot=fin_gor4_pull.png wait=300
// большой вдох: Игрок 1 держит щит, Игрок 2 — нет; оба на 9 м от пасти средней — за 1,5 с щит тянет в 2–3 раза меньше
const W=ZC.W,F=W.flags,hs=heads(),Mi=hs[1];hs.forEach(e=>{e.state='idle';e.t=0;e.cd=99;});ZC.tick(2);const M=mouthOf(Mi);
put(A(0),M.x-3.2,M.z+8.4);put(A(1),M.x+3.2,M.z+8.4);ZC.tick(1);const d0=[0,1].map(pi=>hd2(A(pi).pos,M));
ZC.players.forEach(p=>{p.petals=3;});window._pet0=ZC.players.map(p=>p.petals);G4.cyc=9;G4.big=1;F.inhale=0;F.inhT=0.001;ZC.hold('KeyG',true);let n=0;while(G4.pull<=0&&n<120){ZC.tick(1);n++;}
for(let i=0;i<90;i++)ZC.tick(1);const d1=[0,1].map(pi=>hd2(A(pi).pos,M));const mv=[d0[0]-d1[0],d0[1]-d1[1]];
window._pull={mv,pulling:G4.pull>0};['pull='+G4.pull.toFixed(2),'guard P1='+A(0).guard,'moved shield='+mv[0].toFixed(2)+' no shield='+mv[1].toFixed(2),'ratio='+(mv[1]/Math.max(0.01,mv[0])).toFixed(2)]
//@@
// без щита — дотащило до пасти: «Ам!» — лепесток и отлёт; со щитом — устоял
const W=ZC.W,F=W.flags;const pet0=window._pet0;let n=0;while(G4.pull>0&&n<300){ZC.tick(1);n++;}ZC.hold('KeyG',false);ZC.tick(30);
const Mi=heads()[1],M=mouthOf(Mi);['bites='+G4.stats.bites,'petals P1 '+pet0[0]+'→'+ZC.players[0].petals+' P2 '+pet0[1]+'→'+ZC.players[1].petals,'dist after P1='+hd2(A(0).pos,M).toFixed(1)+' P2='+hd2(A(1).pos,M).toFixed(1)]
//@@
// широкий щит Потапа: Игрок 2 стоит за ним — тянет как со щитом
const W=ZC.W,F=W.flags,Mi=heads()[1];toAct(0,'potap');ZC.tick(60);const M=mouthOf(Mi);const P=A(0),Q=A(1);put(P,M.x,M.z+8);P.face=Math.atan2(M.x-P.pos.x,M.z-P.pos.z);put(Q,M.x+0.4,M.z+9.6);
ZC.players.forEach(p=>{p.petals=3;});G4.cyc=9;F.inhale=0;F.inhT=0.001;ZC.hold('KeyG',true);let n=0;while(G4.pull<=0&&n<120){ZC.tick(1);n++;}const q0=hd2(Q.pos,M);for(let i=0;i<90;i++)ZC.tick(1);const q1=hd2(Q.pos,M);
let m=0;while(G4.pull>0&&m<300){ZC.tick(1);m++;}ZC.hold('KeyG',false);ZC.tick(20);['P2 behind Potap moved='+(q0-q1).toFixed(2)+' (без щита было '+window._pull.mv[1].toFixed(2)+')','P2 petals='+ZC.players[1].petals]
//@@
// жёлудь Прошки в пасть на большом вдохе — вдох обрывается, средняя в Пробое
const W=ZC.W,F=W.flags,hs=heads(),Mi=hs[1];toAct(0,'proshka');ZC.tick(70);hs.forEach(e=>{e.state='idle';e.t=0;e.cd=99;});const M=mouthOf(Mi);put(A(0),M.x,M.z+7);put(A(1),M.x+3,M.z+9);
G4.cyc=9;F.inhale=0;F.inhT=0.001;let n=0;while(G4.pull<=0&&n<120){ZC.tick(1);n++;}ZC.tick(30);A(0).face=Math.atan2(M.x-A(0).pos.x,M.z-A(0).pos.z);const lp=F.longInh;ZC.press('KeyE');let k=0;while(Mi.state!=='broken'&&k<90){ZC.tick(1);k++;}ZC.tick(3);
['longInh was='+lp.toFixed(2),'Mi='+Mi.state,'pull after='+G4.pull.toFixed(2),'acorn t='+(k/60).toFixed(2)]
//@@ shot=fin_gor4_weak.png wait=300
// Совиный взор: Пелагея смотрит на левую голову — на ней чешуйка; удар Прошки по ней — сразу Пробой
const W=ZC.W,F=W.flags,hs=heads(),L=hs[0];hs.forEach(e=>{e.state='idle';e.t=0;e.cd=99;e.embers=e.maxEmb=4;e.sat=0;});ZC.tick(2);toAct(1,'pelageya');ZC.tick(60);const Pe=A(1);put(Pe,L.pos.x+1.5,L.pos.z+6);Pe.face=Math.atan2(L.pos.x-Pe.pos.x,L.pos.z-Pe.pos.z);
ZC.players[1].owlCd=0;ZC.press('KeyL');ZC.tick(5);const w=G4.weak.map(q=>q.e.idx+':'+q.e._weak.toFixed(1));const r=['weak='+w.join(','),'owlCd='+ZC.players[1].owlCd.toFixed(1)];
const P=A(0);put(P,L.pos.x,L.pos.z+2.6);P.face=Math.PI;ZC.tick(2);const emb=L.embers;ZC.press('KeyF');ZC.tick(4);r.push('L embers before='+emb,'L='+L.state,'weakHits='+G4.stats.weakHits,'weak left='+G4.weak.length);r
//@@
// сытая голова (обычный удар не берёт) — по слабому месту всё равно Пробой; взор отдыхает 9 с
const W=ZC.W,F=W.flags,hs=heads(),R=hs[2];R.state='idle';R.t=0;R.sat=3;R.cd=99;ZC.tick(2);const Pe=A(1);put(Pe,R.pos.x-1.5,R.pos.z+6);Pe.face=Math.atan2(R.pos.x-Pe.pos.x,R.pos.z-Pe.pos.z);
ZC.press('KeyL');ZC.tick(3);const tired=G4.weak.length===0;ZC.players[1].owlCd=0;ZC.press('KeyL');ZC.tick(3);const r=['tired (cooldown) no weak='+tired,'weak on='+G4.weak.map(q=>q.e.idx).join(','),'R guarded='+(!!R.guardAll&&R.guardAll())];
const P=A(0);for(let i=0;i<30;i++){put(P,R.pos.x,R.pos.z+2.6);P.face=Math.PI;ZC.tick(1);}ZC.press('KeyF');ZC.tick(4);r.push('R='+R.state,'weakHits='+G4.stats.weakHits);r
//@@
// чешуйка гаснет через 6 с, если не ударили
const W=ZC.W,hs=heads(),Mi=hs[1];hs.forEach(e=>{e.state='idle';e.t=0;e.cd=99;e.sat=0;});ZC.tick(2);const Pe=A(1);put(Pe,Mi.pos.x,Mi.pos.z+6);Pe.face=Math.PI;ZC.players[1].owlCd=0;ZC.press('KeyL');ZC.tick(3);
const a=G4.weak.map(q=>q.e.idx).join(',');for(let i=0;i<6.3*60;i++)ZC.tick(1);['weak on='+a,'after 6.3 s left='+G4.weak.length,'Mi='+Mi.state,'stats='+JSON.stringify(G4.stats)]
