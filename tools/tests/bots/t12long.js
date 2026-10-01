//@@
// 1-2 «Кикиморино болото», новые участки после толстой струны (уровень в 3,2 раза длиннее) — настоящими нажатиями двух игроков:
// «Журавль и Цапля» — гать из четырёх струн, на кочках Паутинники (бьём всех — иначе Журавль не идёт), Цапля зовёт, Журавль идёт по струнам, свадьба, звено, камыши;
// огоньки-обманщики — рогатка Прошки по ложному и настоящему огоньку, тропа всплывает, засохшую кочку поливает Йоша; «Царевна-лягушка» — стрела с ольхи,
// кувшинки в лад, завядшая — живой водой; бесёнок Балды — бегом проигрыш, струна через омут и «братишка» у флажка — победа, колоду поднимает Потап; стычка, выход.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.loadLevel(3);ZC.tick(30);ZC.skip();ZC.tick(20);
window.SW=()=>ZC.W.sw12;window.F=()=>ZC.W.flags;window.H=ZC.HERO;
window.KK=[{item:'KeyR',skill:'KeyE',jump:'Space',swap:'KeyQ',call:'Digit1',B:['KeyA','KeyD','KeyW','KeyS']},{item:'Semicolon',skill:'KeyL',jump:'KeyM',swap:'KeyK',call:'Digit0',B:['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']}];
window.put=(h,x,z,y)=>{h.pos.set(x,(y||0)+0.4,z);h.vel.set(0,0,0);h.following=false;};
window.faceTo=(pi,x,z)=>{const h=U.act(pi);h.face=Math.atan2(x-h.pos.x,z-h.pos.z);};
window.rel=pi=>KK[pi].B.forEach(k=>ZC.hold(k,false));
// прыжок с площадки a {x,z,r} на площадку b: идём к краю, прыгаем, держим направление, пока не встанем на b
window.hop=(pi,a,b,wait)=>{const h=U.act(pi),B=KK[pi].B;let jumped=false;
  for(let i=0;i<240;i++){if(wait&&!wait())return 'wait';const dx=b.x-h.pos.x,dz=b.z-h.pos.z,d=Math.hypot(dx,dz);
    ZC.hold(B[0],dx<-0.15*d);ZC.hold(B[1],dx>0.15*d);ZC.hold(B[2],dz<-0.15*d);ZC.hold(B[3],dz>0.15*d);
    if(!jumped&&h.grounded&&(a.jw?a.jw(h):Math.hypot(h.pos.x-a.x,h.pos.z-a.z)>a.r-0.45)){ZC.press(KK[pi].jump);jumped=true;}
    ZC.tick(1);if(jumped&&h.grounded&&d<b.r-0.15){rel(pi);ZC.tick(2);return 'ok';}if(h.pos.y<-1.2){rel(pi);return 'fell';}}
  rel(pi);return 'timeout';};
// ходьба «ближайшим из восьми направлений», как с клавиатуры (U.walkTo жмёт обе клавиши, пока не выровняется по каждой оси)
window.go8=(pi,x,z,max)=>{const h=U.act(pi),B=KK[pi].B,n=Math.round((max||8)*60);for(let i=0;i<n;i++){const dx=x-h.pos.x,dz=z-h.pos.z,d=Math.hypot(dx,dz);if(d<0.4){rel(pi);ZC.tick(1);return 't='+(i/60).toFixed(2);}
    const ax=Math.abs(dx)/d>0.38,az=Math.abs(dz)/d>0.38;ZC.hold(B[0],ax&&dx<0);ZC.hold(B[1],ax&&dx>0);ZC.hold(B[2],az&&dz<0);ZC.hold(B[3],az&&dz>0);ZC.tick(1);if(h.pos.y<-1.2){rel(pi);return 'fell';}}
  rel(pi);return 'TIMEOUT';};
window.st=()=>U.st()+' falls='+ZC.G.stats.falls+' errs='+_errs.length+(_errs[0]?' '+_errs[0]:'');
// к берегу у избушки Журавля (начало уровня проходят t12n, t12deep)
// у колокольчика за толстой струной (закладка: упал — сюда), потом к берегу у избушки Журавля
['proshka','potap'].forEach((k,i)=>put(H[k],-1.2-i*1.2,-77.5));['pelageya','yosha'].forEach((k,i)=>put(H[k],1.2+i*1.2,-77.5));ZC.tick(60);
['proshka','potap'].forEach((k,i)=>put(H[k],-2.6-i*1.2,-87.5));['pelageya','yosha'].forEach((k,i)=>put(H[k],-1.2+i*1.2,-87.0));ZC.tick(60);
const S=SW();['cp='+ZC.players.map(p=>p.cp.z.toFixed(0)).join(','),'stage='+F().wed.stage,'stakes='+S.GS.length,'links='+ZC.W.linkTotal+' nuts='+ZC.W.nutTotal,st()]
//@@
// гать: на каждой кочке засел Паутинник (пока хоть один там — Журавль не пойдёт). Прошка кидает струну к кочке, переходит и бьёт Паутинника:
// отбив щитом, удары, пока он открыт или грызёт. Пелагея стоит на только что пройденной струне — пустую перегрызли бы. Четвёртую струну кидает Пелагея
F().noChudo=true;   // чудо болотное (сталкивает со струн гати) проверяет t12chudo
window.KF=[{g:'KeyG',a:'KeyF',B:['KeyA','KeyD','KeyW','KeyS']},{g:'Period',a:'Comma',B:['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']}];
window.beat=(e,pis,max)=>{const n=Math.round((max||30)*60);let k=0;
  for(let i=0;i<n;i++){if(!e.alive){pis.forEach(pi=>KF[pi].B.forEach(b=>ZC.hold(b,false)));ZC.tick(2);return 't='+(i/60).toFixed(1);}
    for(const pi of pis){const h=U.act(pi),K=KF[pi],dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z,d=Math.hypot(dx,dz);const far=d>1.5+e.r&&!(e.state==='wind'&&e.tgt===h);
      K.B.forEach(b=>ZC.hold(b,false));if(far){ZC.hold(K.B[0],dx<-0.3);ZC.hold(K.B[1],dx>0.3);ZC.hold(K.B[2],dz<-0.3);ZC.hold(K.B[3],dz>0.3);}
      if(e.state==='wind'&&e.tgt===h){const left=e.wdur-e.t;if(left<0.16&&e.left===null)ZC.press(K.g);}
      if(!far&&((e.state==='stagger'&&!e.openHit)||e.state==='broken'||e.open>0||e.dazeT>0)){h.face=Math.atan2(dx,dz);if(((++k)>>1)%9===pi*4)ZC.press(K.a);}}
    ZC.tick(1);if(U.act(pis[0]).pos.y<-1.2)break;}
  pis.forEach(pi=>KF[pi].B.forEach(b=>ZC.hold(b,false)));return 'TIMEOUT '+e.state+':'+e.embers+' y='+U.act(pis[0]).pos.y.toFixed(1);};
window.at=(s,k)=>[s.sx+s.dx*s.len*k,s.sz+s.dz*s.len*k];window.trav=(pi,pts)=>{const o=[];for(const[x,z]of pts){const q=go8(pi,x,z,8);o.push(q);if(q==='fell')break;}return o.join(',');};
window.alive4=()=>SW().GS.map(g=>!!(g.used&&g.used.string&&!g.used.sag&&ZC.W.threads.includes(g.used)));
const S=SW(),G=S.GS,GT=S.GT,r=['tats='+GT.filter(e=>e.alive).length+' stage='+F().wed.stage];
r.push(U.walkTo(0,-1.6,-89.4,4));
for(let k=0;k<3;k++){const hk=[G[k].x-0.3,G[k].z+0.7];   // середина кочки (колышек — с краю)
  faceTo(0,G[k].x,G[k].z);ZC.press('KeyR');ZC.tick(40);const s=G[k].used;r.push('s'+(k+1)+'='+!!s);if(!s)break;
  r.push('P1 '+trav(0,[at(s,0.6)]),'P2 '+trav(1,[[s.sx,s.sz],at(s,0.3)]),'P1 '+trav(0,[[hk[0],hk[1]]]),'P2 '+trav(1,[at(s,0.75)]));
  r.push('beat'+(k+1)+' '+beat(GT[k],[0],40)+' left='+F().wed.left);
  r.push('P2 '+trav(1,[[hk[0]+0.5,hk[1]+0.3]]),'P1 '+trav(0,[[hk[0]-0.3,hk[1]]]));}
// Пелагея — в середину кочки: колышек в метре от неё бросок «перехватил» бы (целится в ближний колышек в створе)
r.push('P1 '+trav(0,[[G[2].x-0.9,G[2].z+1.3]]),'P2 '+trav(1,[[G[2].x-0.3,G[2].z+0.7]]));faceTo(1,G[3].x,G[3].z);ZC.press('Semicolon');ZC.tick(40);r.push('s4='+!!G[3].used,'strings='+alive4().join(','),'stage='+F().wed.stage);
r.join(' ')+' | '+st()
//@@
// гать чиста — на берег Цапли: Цапля зовёт, Журавль сразу идёт по струнам
const S=SW(),G=S.GS,s4=G[3].used;const r=['P1 '+trav(0,[[s4.sx,s4.sz],at(s4,0.5),[G[3].x-0.6,G[3].z-1.2]]),'P2 '+trav(1,[[s4.sx+0.3,s4.sz],at(s4,0.6),[G[3].x+0.6,G[3].z-1.4]])];
ZC.tick(30);r.push('stage='+F().wed.stage);r.push(U.until(()=>F().wed.stage==='walk',8)+' stage='+F().wed.stage+' left='+F().wed.left);
r.join(' ')+' | seg='+F().wed.seg+' '+st()
//@@
// ждём: Журавль доходит по струнам, свадьба, звено, камыши расступаются
const S=SW(),W=ZC.W,G=S.GS;const u=U.until(()=>F().wed.stage==='done',90);const r=['until='+u,'stage='+F().wed.stage,'cut='+F().wed.cut,'reeds='+!S.reedCol.on,'link locked='+S.wedLink.locked];
r.push('P1 '+trav(0,[[S.wedLink.pos.x,S.wedLink.pos.z]]));ZC.tick(30);r.push('links='+W.links);r.join(' ')+' | '+st()
//@@ shot=t12l_fog.png
// туман: Прошка на берегу против ложного огонька — щёлк (ложный лопается), потом против настоящего — тропа всплывает
const S=SW(),fk=S.forks;const r=[];const P=U.act(0);if(P.kind!=='proshka'){ZC.press('KeyQ');ZC.tick(5);}
U.tap('Digit1');U.tap('Digit0');ZC.tick(120);r.push('called potap z='+H.potap.pos.z.toFixed(0)+' yosha z='+H.yosha.pos.z.toFixed(0));
const f0=fk[0],fake=f0.wisps.find(w=>!w.real),real=f0.wisps.find(w=>w.real);
r.push(U.walkTo(0,0,-155.0,10));faceTo(0,fake.base.x,fake.base.z);ZC.press('KeyE');ZC.tick(50);r.push('fake gone='+fake.gone+' open='+f0.open);
faceTo(0,real.base.x,real.base.z);ZC.press('KeyE');ZC.tick(80);r.push('real open='+f0.open+' lane y='+f0.lane.map(L=>L.cur.toFixed(2)).join(','));
r.join(' ')+' | '+st()
//@@
// по тропе через туман: прыжками по кочкам с островка на островок; на второй и четвёртой развилке засохшую кочку поливает Йоша (Пелагея → Йоша)
const S=SW(),fk=S.forks;const r=[];if(U.act(1).kind!=='yosha'){ZC.press('KeyK');ZC.tick(5);}
const edge=[-156,-170.7,-188.4,-206.1,-223.8];
const run=(pi,k)=>{const f=fk[k];let a={jw:h=>h.pos.z<f.zs+0.45};const out=[];
  for(const L of f.lane){const b={x:L.col.x,z:L.col.z,r:1.25};const q=hop(pi,a,b);out.push(q);if(q!=='ok')return out.join(',');a=b;}
  out.push(hop(pi,a,{x:f.x,z:edge[k+1]-1.5,r:1.6}));return out.join(',');};
for(let k=0;k<4;k++){const f=fk[k];
  if(!f.open){const real=f.wisps.find(w=>w.real);r.push(go8(0,real.base.x*0.4,f.zs+1.2,6));faceTo(0,real.base.x,real.base.z);ZC.press('KeyE');ZC.tick(80);}
  r.push('k'+k+' open='+f.open);
  if(f.dry){// Йоша прыгает на первую кочку тропы и поливает засохшую
    const L0=f.lane[0];r.push(go8(1,f.x,f.zs+1.0,6));r.push('y:'+hop(1,{jw:h=>h.pos.z<f.zs+0.45},{x:L0.col.x,z:L0.col.z,r:1.25}));faceTo(1,f.dry.col.x,f.dry.col.z);ZC.press('KeyL');ZC.tick(90);
    r.push('dry watered='+!f.dry.dry+' solid='+f.dry.col.on);r.push('Y:'+(()=>{let a={x:L0.col.x,z:L0.col.z,r:1.25};const o=[];for(const L of f.lane.slice(1)){const b={x:L.col.x,z:L.col.z,r:1.25};o.push(hop(1,a,b));a=b;}o.push(hop(1,a,{x:f.x,z:edge[k+1]-1.5,r:1.6}));return o.join(',');})());}
  else{r.push(go8(1,f.x+0.8,f.zs+1.0,6));r.push('Y:'+run(1,k));}
  r.push(go8(0,f.x-0.6,f.zs+1.0,6));r.push('P:'+run(0,k));}
r.join(' ')+' | '+st()
//@@ shot=t12l_frog.png
// «Царевна-лягушка»: Прошка сбивает стрелу с ольхи — Лягушка поёт, кувшинки в лад
const S=SW();const r=[U.walkTo(0,-5.5,-238.2,10),U.walkTo(1,0.5,-238.4,10)];faceTo(0,S.arrow.position.x,S.arrow.position.z);ZC.press('KeyE');ZC.tick(120);
r.push('sing='+F().frog.sing);ZC.tick(60);r.push('pads up='+S.PADS.filter(P=>P.cur>-0.2).length+'/'+S.PADS.length);r.join(' ')+' | '+st()
//@@
// по кувшинкам в лад: прыгаем, когда нужная кувшинка наверху и ещё побудет там; Йоша с пятой поливает завядшую шестую
const S=SW(),PD=S.PADS,r=[];const T=3.0;const ph=()=>Math.sin(F().frog.t*Math.PI*2/T);
const upFor=P=>P.i===6?F().frog.lily:(P.grp===0?ph()>0.1:ph()<-0.1);   // наверху и не на исходе
const pad=P=>({x:P.col.x,z:P.col.z,r:P.col.r});
const cross=(pi,from,i0,i1)=>{let a=from;const out=[];
  for(let i=i0;i<=i1;i++){const P=PD[i];let w=0;while(!upFor(P)&&w<400){ZC.tick(1);w++;}const res=hop(pi,a,pad(P));out.push(i+':'+res);if(res!=='ok')break;a=pad(P);}
  return out.join(',');};
const bankA={jw:h=>h.pos.z<-239.5};
r.push('Y:'+cross(1,bankA,0,5));faceTo(1,PD[6].col.x,PD[6].col.z);ZC.press('KeyL');ZC.tick(40);r.push('lily='+F().frog.lily);
const bank={x:0,z:-280,r:2.5};r.push('Y2:'+cross(1,pad(PD[5]),6,10),'Yb:'+hop(1,pad(PD[10]),bank));r.push('P:'+cross(0,bankA,0,10),'Pb:'+hop(0,pad(PD[10]),bank));
r.join(' ')+' | '+st()
//@@
// бесёнок: на кружок — и бегом кругом омута (проигрыш); потом Пелагея перекидывает струну через омут к флажку и ждёт там, Прошка снова на кружок — победа
const S=SW(),RC=F().race;const r=[U.walkTo(1,-3,-291,10)];
// сначала фальстарт: сорвался с кружка до «ТРИ» — забег сначала
r.push(U.walkTo(0,S.raceMat.position.x,S.raceMat.position.z,10));ZC.tick(20);r.push(U.walkTo(0,4,-296,3));ZC.tick(10);r.push('false start st='+RC.st);ZC.tick(150);
// честный забег бегом кругом омута — бесёнок быстрее
r.push(U.walkTo(0,S.raceMat.position.x,S.raceMat.position.z,10));U.until(()=>RC.st==='run',3);
const route=[[8.7,-296],[8.7,-311],[2.4,-312.4]];for(const[x,z]of route)r.push(U.walkTo(0,x,z,6));ZC.tick(30);r.push('st='+RC.st+' tries='+RC.tries+' hint='+!!F().raceHint);
ZC.tick(160);r.push(U.walkTo(1,0,-297.6,8));faceTo(1,S.finStake.x,S.finStake.z);ZC.press('Semicolon');ZC.tick(40);r.push('string='+!!S.finStake.used);
r.push(U.walkTo(1,0,-311.0,8),U.walkTo(1,S.flag.position.x-0.6,S.flag.position.z,4));
r.push(U.walkTo(0,8.7,-311,8),U.walkTo(0,8.7,-296,8),U.walkTo(0,S.raceMat.position.x,S.raceMat.position.z,8));U.until(()=>RC.st==='run'||RC.won,3);ZC.tick(150);r.push('st='+RC.st+' won='+RC.won+' tries='+RC.tries);
r.join(' ')+' | '+st()
//@@
// «подними-ка кобылу»: бесёнок не смог, Потап поднимает колоду — путь открыт, оброк орешками
const S=SW(),RC=F().race;const r=[U.until(()=>RC.lift==='try',10)];r.push(U.walkTo(0,8.7,-296,8),U.walkTo(0,8.7,-311,8),U.walkTo(0,0,-315.8,8));
if(U.act(0).kind!=='potap'){ZC.press('KeyQ');ZC.tick(10);}r.push(U.walkTo(0,0,-315.8,4));ZC.press('KeyE');ZC.tick(130);
r.push('lift='+RC.lift,'col off='+!S.logCol.on,'nuts out='+S.BN.map(n=>!n.locked).join(','));const n0=ZC.W.nuts;r.push(U.walkTo(0,S.BN[0].pos.x,S.BN[0].pos.z,6),U.walkTo(0,S.BN[1].pos.x,S.BN[1].pos.z,6));
r.push('nuts +'+(ZC.W.nuts-n0));r.join(' ')+' | '+st()
//@@
// стычка у ворот (в конце уровня) и выход
const r=[U.walkTo(0,-1,-329,8),U.walkTo(1,1,-329,10)];ZC.tick(90);const b=U.brawl(120);const r2=[U.walkTo(0,0,-348.5,8),U.walkTo(0,0,-352.5,4)];ZC.tick(60);
b+' '+r.join(',')+' '+r2.join(',')+' links='+(ZC.G.got['1-2']||0)+' lvl='+ZC.W.levelId+' done='+!!ZC.G.done['1-2']+' errs='+_errs.length+(_errs[0]?' '+_errs[0]:'')
