//@@
// 1-2, новые участки в одиночном режиме (клавиши Игрока 1, Q — любой из четырёх, «Ко мне!» зовёт всех троих): гать — три струны Прошкой, четвёртую —
// Пелагеей (струн у каждого игрока до трёх); на каждой кочке Паутинник — бьём всех, тогда Журавль идёт; туман — Прошка щёлкает огоньки, Йоша поливает кочки;
// стрела и кувшинки; бесёнок — сам по струне через омут быстрее него; колоду — Потапом. Проверка: всё проходится одним игроком.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(true);U.go();ZC.loadLevel(3);ZC.tick(30);ZC.skip();ZC.tick(20);
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
window.me=()=>U.act(ZC.G.soloPi);window.toKind=k=>{for(let i=0;i<4&&me().kind!==k;i++){ZC.press('KeyQ');ZC.tick(4);}return me().kind;};
window.callAll=()=>{U.tap('Digit1');const L=()=>U.act(ZC.G.soloPi);for(let i=0;i<60*12;i++){ZC.tick(1);if(i>60&&['proshka','potap','pelageya','yosha'].every(k=>Math.hypot(H[k].pos.x-L().pos.x,H[k].pos.z-L().pos.z)<6))break;if(i%240===239)U.tap('Digit1');}};   // «Ко мне!»: кто не перепрыгнет, через 2,5 с подтянется — ждём всех
// в одиночке ведёт тот, кем управляем: индекс игрока — G.soloPi; ходим клавишами Игрока 1
window.go8s=(x,z,max)=>{const h=me(),B=KK[0].B,n=Math.round((max||8)*60);for(let i=0;i<n;i++){const dx=x-h.pos.x,dz=z-h.pos.z,d=Math.hypot(dx,dz);if(d<0.4){rel(0);ZC.tick(1);return 't='+(i/60).toFixed(2);}
    const ax=Math.abs(dx)/d>0.38,az=Math.abs(dz)/d>0.38;ZC.hold(B[0],ax&&dx<0);ZC.hold(B[1],ax&&dx>0);ZC.hold(B[2],az&&dz<0);ZC.hold(B[3],az&&dz>0);ZC.tick(1);if(h.pos.y<-1.2){rel(0);return 'fell';}}
  rel(0);return 'TIMEOUT';};
window.travS=pts=>{const o=[];for(const[x,z]of pts){const q=go8s(x,z,8);o.push(q);if(q==='fell')break;}return o.join(',');};
window.hopS=(a,b)=>{const h=me(),B=KK[0].B;let jumped=false;for(let i=0;i<240;i++){const dx=b.x-h.pos.x,dz=b.z-h.pos.z,d=Math.hypot(dx,dz);
    ZC.hold(B[0],dx<-0.15*d);ZC.hold(B[1],dx>0.15*d);ZC.hold(B[2],dz<-0.15*d);ZC.hold(B[3],dz>0.15*d);
    if(!jumped&&h.grounded&&(a.jw?a.jw(h):Math.hypot(h.pos.x-a.x,h.pos.z-a.z)>a.r-0.45)){ZC.press('Space');jumped=true;}
    ZC.tick(1);if(jumped&&h.grounded&&d<b.r-0.15){rel(0);ZC.tick(2);return 'ok';}if(h.pos.y<-1.2){rel(0);return 'fell';}}rel(0);return 'timeout';};
window.faceS=(x,z)=>{const h=me();h.face=Math.atan2(x-h.pos.x,z-h.pos.z);};
['proshka','potap','pelageya','yosha'].forEach((k,i)=>put(H[k],-1.2+i*0.9,-77.5));ZC.tick(60);['proshka','potap','pelageya','yosha'].forEach((k,i)=>put(H[k],-2.6+i*0.9,-87.5));ZC.tick(60);
['solo='+ZC.G.solo,'me='+me().kind,st()]
//@@
// гать: на каждой кочке Паутинник. Прошка кидает струну к кочке, переходит и бьёт его (отбив щитом, удары, пока открыт или грызёт); спутники идут следом.
// Все три побеждены — «Ко мне!», Пелагея кидает четвёртую; на берег Цапли — Цапля зовёт, Журавль сразу идёт
F().noChudo=true;   // чудо болотное (сталкивает со струн гати) проверяет t12chudo
window.beatS=(e,max)=>{const n=Math.round((max||40)*60),B=KK[0].B;let k=0;
  for(let i=0;i<n;i++){const h=me();if(!e.alive){rel(0);ZC.tick(2);return 't='+(i/60).toFixed(1);}
    const dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z,d=Math.hypot(dx,dz);const far=d>1.5+e.r&&!(e.state==='wind'&&e.tgt===h);
    rel(0);if(far){ZC.hold(B[0],dx<-0.3);ZC.hold(B[1],dx>0.3);ZC.hold(B[2],dz<-0.3);ZC.hold(B[3],dz>0.3);}
    if(e.state==='wind'&&e.tgt===h){const left=e.wdur-e.t;if(left<0.16&&e.left===null)ZC.press('KeyG');}
    if(!far&&((e.state==='stagger'&&!e.openHit)||e.state==='broken'||e.open>0||e.dazeT>0)){h.face=Math.atan2(dx,dz);if(((++k)>>1)%9===0)ZC.press('KeyF');}
    ZC.tick(1);if(h.pos.y<-1.2)break;}
  rel(0);return 'TIMEOUT '+e.state+':'+e.embers+' y='+me().pos.y.toFixed(1);};
window.at=(s,k)=>[s.sx+s.dx*s.len*k,s.sz+s.dz*s.len*k];
window.alive4=()=>SW().GS.map(g=>!!(g.used&&g.used.string&&!g.used.sag&&ZC.W.threads.includes(g.used)));
const S=SW(),G=S.GS,GT=S.GT,r=[];toKind('proshka');r.push(go8s(-1.6,-89.4,4));
for(let k=0;k<3;k++){const hk=[G[k].x-0.3,G[k].z+0.7];
  faceS(G[k].x,G[k].z);ZC.press('KeyR');ZC.tick(40);const s=G[k].used;r.push('s'+(k+1)+'='+!!s);if(!s)break;
  r.push(travS([at(s,0.6),[hk[0],hk[1]]]));r.push('beat'+(k+1)+' '+beatS(GT[k],40)+' left='+F().wed.left);r.push(travS([[hk[0]-0.3,hk[1]]]));}
r.push('strings='+alive4().join(','));
callAll();r.push('pel z='+H.pelageya.pos.z.toFixed(1));toKind('pelageya');r.push('me='+me().kind+' soloPi='+ZC.G.soloPi);
r.push(travS([[G[2].x-0.3,G[2].z+0.7]]));faceS(G[3].x,G[3].z);ZC.press('KeyR');ZC.tick(40);   // из середины кочки: колышек в метре бросок «перехватил» бы
r.push('s4='+!!G[3].used,'strings='+alive4().join(','));r.push(travS([[G[3].x-0.4,G[3].z-1.2]]));U.until(()=>F().wed.stage==='walk',8);r.push('stage='+F().wed.stage+' left='+F().wed.left);r.join(' ')+' | '+st()
//@@
// гать чиста — Журавль идёт по струнам до Цапли без помех; ждём свадьбу и берём звено
const S=SW(),G=S.GS,r=[];r.push(U.until(()=>F().wed.stage==='done',70));r.push('cut='+F().wed.cut,'stage='+F().wed.stage);
r.push(travS([[S.wedLink.pos.x,S.wedLink.pos.z]]));r.push('links='+ZC.W.links);r.join(' ')+' | '+st()
//@@
// туман в одиночку: Прошка щёлкает настоящий огонёк, «Ко мне!» — все за ним; засохшую кочку — Йошей
const S=SW(),fk=S.forks,r=[];const edge=[-156,-170.7,-188.4,-206.1,-223.8];
const lane=(f,from)=>{let a=from;const o=[];for(const L of f.lane.slice(from.skip||0)){const b={x:L.col.x,z:L.col.z,r:1.25};const q=hopS(a,b);o.push(q);if(q!=='ok')return o.join(',');a=b;}o.push(hopS(a,{x:f.x,z:edge[f.k+1]-1.5,r:1.6}));return o.join(',');};
for(let k=0;k<4;k++){const f=fk[k];toKind('proshka');const real=f.wisps.find(w=>w.real);r.push(go8s(real.base.x*0.4,f.zs+1.2,8));faceS(real.base.x,real.base.z);ZC.press('KeyE');ZC.tick(80);r.push('k'+k+'='+f.open);
  if(f.dry){callAll();toKind('yosha');r.push(go8s(f.x,f.zs+1.0,8));const L0=f.lane[0];r.push('y:'+hopS({jw:h=>h.pos.z<f.zs+0.45},{x:L0.col.x,z:L0.col.z,r:1.25}));faceS(f.dry.col.x,f.dry.col.z);ZC.press('KeyE');ZC.tick(90);
    r.push('dry='+!f.dry.dry);r.push('Y:'+lane(f,{x:L0.col.x,z:L0.col.z,r:1.25,skip:1}));}
  else r.push('P:'+lane(f,{jw:h=>h.pos.z<f.zs+0.45}));
  callAll();r.push('['+['proshka','potap','pelageya','yosha'].map(q=>q[0]+H[q].pos.z.toFixed(0)).join(' ')+']');}
r.join(' ')+' | '+st()
//@@
// пруд: Прошкой — стрела; Йошей — по кувшинкам до пятой, полить шестую, дальше на берег
const S=SW(),PD=S.PADS,r=[];toKind('proshka');r.push(go8s(-5.5,-238.2,10));faceS(S.arrow.position.x,S.arrow.position.z);ZC.press('KeyE');ZC.tick(150);r.push('sing='+F().frog.sing);
callAll();toKind('yosha');r.push(go8s(0,-238.6,8));const ph=()=>Math.sin(F().frog.t*Math.PI*2/3.0),upFor=P=>P.i===6?F().frog.lily:(P.grp===0?ph()>0.1:ph()<-0.1),pad=P=>({x:P.col.x,z:P.col.z,r:P.col.r});
let a={jw:h=>h.pos.z<-239.5};const o=[];for(let i=0;i<=10;i++){const P=PD[i];if(i===6){faceS(P.col.x,P.col.z);ZC.press('KeyE');ZC.tick(40);o.push('lily='+F().frog.lily);}
  let w=0;while(!upFor(P)&&w<400){ZC.tick(1);w++;}const q=hopS(a,pad(P));o.push(i+':'+q);if(q!=='ok')break;a=pad(P);}
o.push('b:'+hopS(a,{x:0,z:-280,r:2.5}));r.push(o.join(','));callAll();r.join(' ')+' | '+st()
//@@
// бесёнок: Йошей перекинуть струну через омут, вернуться на кружок, «ТРИ» — и по струне к флажку быстрее бесёнка
const S=SW(),RC=F().race,r=[];r.push(go8s(0,-297.6,8));faceS(S.finStake.x,S.finStake.z);ZC.press('KeyR');ZC.tick(40);r.push('string='+!!S.finStake.used);
r.push(go8s(S.raceMat.position.x,S.raceMat.position.z,8));U.until(()=>RC.st==='run',3);r.push('st='+RC.st);r.push(travS([[0,-297.6],[0,-311.0],[S.flag.position.x-0.6,S.flag.position.z]]));ZC.tick(60);
r.push('won='+RC.won+' tries='+RC.tries);r.join(' ')+' | '+st()
//@@
// колода — Потапом; потом стычка у ворот и выход
const S=SW(),RC=F().race,r=[U.until(()=>RC.lift==='try',12)];callAll();toKind('potap');r.push(go8s(0,-315.8,10));ZC.press('KeyE');ZC.tick(130);r.push('lift='+RC.lift+' col off='+!S.logCol.on);
callAll();r.push(go8s(0,-333,10));ZC.tick(120);r.push('arena='+ZC.W.camZones.some(z=>z.started));
// бой одного героя: та же тактика, что у U.brawl (отбив жёлтого в последний миг, кувырок от красного, удар по открытому)
let n=0;const k={g:'KeyG',a:'KeyF',r:'ShiftLeft',B:KK[0].B};for(;n<60*150;n++){const alive=ZC.W.enemies.filter(e=>e.alive&&e.pos.z<-325);if(!alive.length)break;const h=me();
  let e=null,bd=99;for(const x of alive){const d=Math.hypot(x.pos.x-h.pos.x,x.pos.z-h.pos.z);if(d<bd){bd=d;e=x;}}const dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z,far=bd>1.9+e.r&&!(e.state==='wind'&&e.tgt===h);
  k.B.forEach(b=>ZC.hold(b,false));if(far){ZC.hold(k.B[0],dx<-0.3);ZC.hold(k.B[1],dx>0.3);ZC.hold(k.B[2],dz<-0.3);ZC.hold(k.B[3],dz>0.3);}
  const w=alive.find(x=>x.state==='wind'&&x.tgt===h);if(w){const left=w.wdur-w.t;if(w.sig==='red'){if(left<0.2)ZC.press(k.r);}else if(left<0.16&&w.left===null)ZC.press(k.g);}
  if(!far&&((e.state==='stagger'&&!e.openHit)||e.state==='broken'||e.open>0||e.dazeT>0||(e.shell&&(n%12===0)))){h.face=Math.atan2(dx,dz);if(n%9===0)ZC.press(k.a);}ZC.tick(1);}
rel(0);ZC.hold('KeyG',false);r.push('fight '+(n/60).toFixed(0)+'s left='+ZC.W.enemies.filter(e=>e.alive&&e.pos.z<-325).length);r.push(go8s(0,-348.5,8),go8s(0,-352.6,4));ZC.tick(60);
r.push('lvl='+ZC.W.levelId+' done='+!!ZC.G.done['1-2']);ZC.setSolo(false);r.join(' ')+' | errs='+_errs.length+(_errs[0]?' '+_errs[0]:'')
