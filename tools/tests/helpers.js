window.U={
 go(){ZC.start();ZC.G.manual=true;ZC.tick(2);},
 until(cond,max){const n=Math.round((max||5)*60);for(let i=0;i<n;i++){if(cond())return 't='+(i/60).toFixed(2);ZC.tick(1);}return 'TIMEOUT';},
 tap(k){ZC.press(k);ZC.tick(1);},
 act(pi){return ZC.players[pi].heroes[ZC.players[pi].act];},
 walkTo(pi,x,z,max,extra){const B=pi?['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']:['KeyA','KeyD','KeyW','KeyS'];const n=Math.round((max||6)*60);let r='TIMEOUT';
   for(let i=0;i<n;i++){const h=U.act(pi);const dx=x-h.pos.x,dz=z-h.pos.z;
     ZC.hold(B[0],dx<-0.25);ZC.hold(B[1],dx>0.25);ZC.hold(B[2],dz<-0.25);ZC.hold(B[3],dz>0.25);
     if(Math.hypot(dx,dz)<0.45){r='t='+(i/60).toFixed(2);break;}if(extra)extra(h,i);ZC.tick(1);}
   B.forEach(k=>ZC.hold(k,false));ZC.tick(1);return r;},
 st(){const H=ZC.HERO;return ['proshka','potap','pelageya','yosha'].map(k=>k+':'+H[k].pos.x.toFixed(1)+','+H[k].pos.y.toFixed(2)+','+H[k].pos.z.toFixed(1)+(H[k].active?'*':'')).join(' ');},
 obj(){return [0,1].map(pi=>{const o=ZC.W.objectives[pi][ZC.players[pi].obj];return pi+':#'+ZC.players[pi].obj+' '+(o?(typeof o.text==='function'?o.text():o.text).replace(/<[^>]*>/g,''):'-');}).join(' | ');},
 toChase(){U.go();const H=ZC.HERO;H.potap.pos.set(-2,0,1.4);H.yosha.pos.set(2.2,0,1.4);U.until(()=>ZC.G.cine,3);ZC.skip();ZC.tick(20);}
};
'helpers ok'
U.fight=function(pi,mode,max){const keys=pi?{g:'Period',a:'Comma'}:{g:'KeyG',a:'KeyF'};const n=Math.round((max||20)*60);let log=[];let enc=0,prev='';
  for(let i=0;i<n;i++){const e=ZC.W.enemies.find(x=>x.pi===pi&&x.alive);if(!e){ZC.hold(keys.g,false);return 'done t='+(i/60).toFixed(1)+' '+log.join(',');}
    if(e.state!==prev){if(prev==='wind')enc++;log.push(e.state[0]+(e.state==='wind'?'('+e.slow+')':''));prev=e.state;}
    const h=U.act(pi);const dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z,d=Math.hypot(dx,dz);
    const B=pi?['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']:['KeyA','KeyD','KeyW','KeyS'];const far=d>2.2&&(e.state==='idle'||e.state==='broken'||e.state==='stagger');
    ZC.hold(B[0],far&&dx<-0.3);ZC.hold(B[1],far&&dx>0.3);ZC.hold(B[2],far&&dz<-0.3);ZC.hold(B[3],far&&dz>0.3);
    if(e.state==='wind'){const left=e.wdur-e.t;const m=mode==='mix'?(enc===0?'shield':enc===1?'parry':'mah'):mode;
      if(m==='shield')ZC.hold(keys.g,true);else if(m==='parry'&&left<0.16&&e.left===null)ZC.press(keys.g);else if(m==='mah'&&left<0.05&&e.left===null)ZC.press(keys.g);}
    else ZC.hold(keys.g,false);
    if(!far&&((e.state==='stagger'&&!e.openHit)||e.state==='broken')){h.face=Math.atan2(dx,dz);if(i%8===0)ZC.press(keys.a);}
    ZC.tick(1);}
  ZC.hold(keys.g,false);return 'TIMEOUT '+log.join(',');};
'fight ok'
U.brawl=function(max,modes){modes=modes||['parry','parry'];const n=Math.round((max||30)*60);const K2=[{g:'KeyG',a:'KeyF',r:'ShiftLeft',B:['KeyA','KeyD','KeyW','KeyS']},{g:'Period',a:'Comma',r:'Slash',B:['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']}];
  for(let i=0;i<n;i++){const alive=ZC.W.enemies.filter(e=>e.alive);if(!alive.length){[0,1].forEach(pi=>K2[pi].B.forEach(k=>ZC.hold(k,false)));return 'cleared t='+(i/60).toFixed(1);}
    for(const pi of[0,1]){const h=U.act(pi),k=K2[pi];let e=null,bd=99;for(const x of alive){const d=Math.hypot(x.pos.x-h.pos.x,x.pos.z-h.pos.z);if(d<bd){bd=d;e=x;}}
      const dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z;const far=bd>1.9+e.r&&!(e.state==='wind'&&e.tgt===h);
      k.B.forEach(b=>ZC.hold(b,false));if(far){ZC.hold(k.B[0],dx<-0.3);ZC.hold(k.B[1],dx>0.3);ZC.hold(k.B[2],dz<-0.3);ZC.hold(k.B[3],dz>0.3);}
      const bo=ZC.W.bolts.find(b=>b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2);if(bo)ZC.press(k.g);
      const w=alive.find(x=>x.state==='wind'&&x.tgt===h);
      if(w){const left=w.wdur-w.t;if(w.sig==='red'){if(left<0.2)ZC.press(k.r);}else if(left<0.16&&w.left===null)ZC.press(k.g);}
      if(!far&&((e.state==='stagger'&&!e.openHit)||e.state==='broken'||e.open>0||e.dazeT>0||(e.shell&&(i%12===0)))){h.face=Math.atan2(dx,dz);if(((U._i=(U._i||0)+1)>>1)%9===pi*4)ZC.press(k.a);}}
    ZC.tick(1);}
  [0,1].forEach(pi=>K2[pi].B.forEach(k=>ZC.hold(k,false)));return 'TIMEOUT alive='+ZC.W.enemies.filter(e=>e.alive).map(e=>e.kind+':'+e.state+':'+e.embers).join(',');};
'brawl ok'
U.path=function(pi,pts,max){let r=[];const h0=U.act(pi);let px=h0.pos.x,pz=h0.pos.z;for(const [x,z] of pts){const L=Math.hypot(x-px,z-pz),n=Math.max(1,Math.ceil(L/0.7));
  for(let i=1;i<=n;i++){const q=U.walkTo(pi,px+(x-px)*i/n,pz+(z-pz)*i/n,max||3);if(q==='TIMEOUT'){return 'TIMEOUT@'+U.act(pi).pos.x.toFixed(1)+','+U.act(pi).pos.z.toFixed(1);}}px=x;pz=z;}return 'ok';};
'path ok'
/* ---------- общие помощники ботов (раньше каждый бот писал их заново) ----------
   Клавиши: U.K[pi] — {B:[влево,вправо,вверх,вниз], j прыжок, a удар, g щит, r кувырок, i предмет (гусли/перо), s смена, e умение}.
   В одиночке (ZC.setSolo(true)) героем управляют клавиши Игрока 1; U.me() — тот, кем играешь, U.toKind('potap') — Q по кругу до нужного. */
U.K=[{B:['KeyA','KeyD','KeyW','KeyS'],j:'Space',a:'KeyF',g:'KeyG',r:'ShiftLeft',i:'KeyR',s:'KeyQ',e:'KeyE'},
     {B:['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'],j:'KeyM',a:'Comma',g:'Period',r:'Slash',i:'Semicolon',s:'KeyK',e:'KeyL'}];
U.solo=()=>!!(ZC.G&&ZC.G.solo);
U.pk=pi=>U.solo()?0:pi;                                   // чьими клавишами вести героя pi (в одиночке — всегда Игрока 1)
U.me=()=>U.act(ZC.G.soloPi);
U.hero=pi=>U.solo()?U.me():U.act(pi);
U.rel=pi=>U.K[U.pk(pi||0)].B.forEach(k=>ZC.hold(k,false));
// шаг к точке (держит клавиши один кадр — вызывать в цикле); true — уже на месте. jumpIf(h) — прыгнуть, если пора
U.step=(pi,x,z,tol,jumpIf)=>{const h=U.hero(pi),K=U.K[U.pk(pi)],dx=x-h.pos.x,dz=z-h.pos.z,far=Math.hypot(dx,dz)>(tol||0.5);
  ZC.hold(K.B[0],far&&dx<-0.25);ZC.hold(K.B[1],far&&dx>0.25);ZC.hold(K.B[2],far&&dz<-0.25);ZC.hold(K.B[3],far&&dz>0.25);if(jumpIf&&jumpIf(h))ZC.press(K.j);return !far;};
U.goto=(pi,x,z,max,tol)=>{for(let i=0;i<(max||8)*60;i++){if(U.step(pi,x,z,tol)){U.rel(pi);return 't='+(i/60).toFixed(2);}ZC.tick(1);}U.rel(pi);return 'TIMEOUT';};
// смена героя: вдвоём — своя пара (Q/K), в одиночке — Q по кругу Прошка → Потап → Пелагея → Йоша
U.toKind=(kind,pi)=>{if(U.solo()){for(let i=0;i<4&&U.me().kind!==kind;i++){ZC.press('KeyQ');ZC.tick(6);}return U.me().kind;}
  for(let i=0;i<3&&U.act(pi||0).kind!==kind;i++){U.tap(U.K[pi||0].s);ZC.tick(6);}return U.act(pi||0).kind;};
// ролики: дождаться начала (до max кадров) и конца; U.nocine() — пропустить все подряд
U.cine=max=>{let t=0;while(!ZC.G.cine&&t<(max||300)){ZC.tick(1);t++;}const was=!!ZC.G.cine;while(ZC.G.cine&&t<4000){ZC.tick(1);t++;}return was;};
U.nocine=()=>{for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}};
// защита за кадр: синяя капля — щит в последний миг (отбить), замах — щит или кувырок (красный), миньон рядом — удар; true — занят защитой
U.def=(pi,i)=>{const h=U.hero(pi),K=U.K[U.pk(pi)];const bo=ZC.W.bolts.find(b=>b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2);if(bo){ZC.press(K.g);return true;}
  const w=ZC.W.enemies.find(e=>e.alive&&e.tgt===h&&e.state==='wind');if(w){const left=w.wdur-w.t;if(w.sig==='red'){if(left<0.2)ZC.press(K.r);}else if(left<0.16&&w.left===null)ZC.press(K.g);return true;}
  const m=ZC.W.enemies.find(e=>e.alive&&!e.big&&Math.hypot(e.pos.x-h.pos.x,e.pos.z-h.pos.z)<2.2);if(m&&i%10===pi*5){h.face=Math.atan2(m.pos.x-h.pos.x,m.pos.z-h.pos.z);ZC.press(K.a);}return false;};
// подойти к врагу e сбоку и бить раз в 9 кадров
U.hit=(pi,e,i)=>{const h=U.hero(pi);if(U.step(pi,e.pos.x+(pi?1.6:-1.6),e.pos.z+1.6,0.7)){h.face=Math.atan2(e.pos.x-h.pos.x,e.pos.z-h.pos.z);if(i%9===(pi?4:0))ZC.press(U.K[U.pk(pi)].a);}};
U.swim=(pi,i)=>{const h=U.hero(pi);if(h.groundRef&&h.groundRef.water&&i%30===0)ZC.press(U.K[U.pk(pi)].j);};
// мир 2: ракушка S держит напев? сыграть на ней и уступить (оставленный держит напев 15 с); пауза — гусли раз в 0,7 с на игрока
U.held=S=>Object.values(ZC.HERO).some(h=>h.kwHold&&h.kwHold.ref===S.ref);
U.playHold=(pi,S,spot,max)=>{ZC.tick(45);const [x,z]=spot||[S.x,S.z];for(let k=0;k<(max||20)*60;k++){if(U.def(pi,k))continue;if(U.step(pi,x,z,0.9))break;U.swim(pi,k);ZC.tick(1);}
  U.rel(pi);const K=U.K[U.pk(pi)];ZC.press(K.i);ZC.tick(3);ZC.press(K.s);ZC.tick(8);return U.held(S);};
