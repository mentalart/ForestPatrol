// Автопилот для съёмки трейлера (выполняется в странице игры, ?debug): по шагу за игровой тик — те же приёмы, что у ботов tools/tests
// (U.brawl, T33, бот 5-4), но без собственных циклов: цикл ведёт съёмка (tools/video/trailer.js) — кадр за кадром.
window.AP={i:0,mode:null,arg:null,
  K:[{g:'KeyG',a:'KeyF',r:'ShiftLeft',j:'Space',B:['KeyA','KeyD','KeyW','KeyS']},{g:'Period',a:'Comma',r:'Slash',j:'KeyM',B:['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']}],
  act(pi){const p=ZC.players[pi];return p.heroes[p.act];},
  clear(){for(const k of AP.K){k.B.forEach(b=>ZC.hold(b,false));ZC.hold(k.g,false);ZC.hold(k.j,false);}},
  hold4(pi,dx,dz,dead){const k=AP.K[pi],d=dead||0.3;ZC.hold(k.B[0],dx<-d);ZC.hold(k.B[1],dx>d);ZC.hold(k.B[2],dz<-d);ZC.hold(k.B[3],dz>d);},
  pis(){return ZC.G.solo?[ZC.G.soloPi||0]:[0,1];},
  // бой: к ближайшему врагу, отбив на жёлтом, кувырок от красного, удары, когда открыт (как U.brawl)
  brawl(){const alive=ZC.W.enemies.filter(e=>e.alive&&e.g&&e.g.visible!==false);if(!alive.length){AP.forward();return;}
    for(const pi of AP.pis()){const h=AP.act(pi),k=AP.K[pi];let e=null,bd=99;for(const x of alive){const d=Math.hypot(x.pos.x-h.pos.x,x.pos.z-h.pos.z);if(d<bd){bd=d;e=x;}}
      const dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z,far=bd>1.9+e.r&&!(e.state==='wind'&&e.tgt===h);k.B.forEach(b=>ZC.hold(b,false));if(far)AP.hold4(pi,dx,dz);
      const bo=ZC.W.bolts&&ZC.W.bolts.find(b=>b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2);if(bo)ZC.press(k.g);
      const w=alive.find(x=>x.state==='wind'&&x.tgt===h);if(w){const left=w.wdur-w.t;if(w.sig==='red'){if(left<0.2)ZC.press(k.r);}else if(left<0.16&&w.left===null)ZC.press(k.g);}
      if(!far&&((e.state==='stagger'&&!e.openHit)||e.state==='broken'||e.open>0||e.dazeT>0||(e.shell&&(AP.i%12===0))||e.state==='idle'&&AP.i%30===pi*15)){h.face=Math.atan2(dx,dz);if(((AP.i>>1)%9)===pi*4)ZC.press(k.a);}}},
  // идти вперёд (к −z) и иногда подпрыгивать; в соло — один герой
  forward(){for(const pi of AP.pis()){const h=AP.act(pi),k=AP.K[pi];const tx=AP.arg&&AP.arg.x!=null?AP.arg.x+(pi?0.8:-0.8):h.pos.x,tz=AP.arg&&AP.arg.z!=null?AP.arg.z:h.pos.z-5;
      AP.hold4(pi,tx-h.pos.x,tz-h.pos.z,0.35);if(AP.arg&&AP.arg.jump&&(AP.i+pi*20)%70===0)ZC.press(k.j);}},
  walk(){AP.forward();},
  // песня Сирина и Алконоста (3-3): прыжок в долю, щит, удержание (как T33)
  song33(){const S=ZC.W.song;if(!S||S.state!=='play')return;const JK=['Space','KeyM'],GK=['KeyG','Period'];
    for(const pi of[0,1]){if(S.hold[pi])ZC.hold(JK[pi],S.t<S.hold[pi].end);else ZC.hold(JK[pi],false);let k=-1;
      for(let q=Math.max(0,S.lastK);q<Math.min(S.NB,S.lastK+3);q++){const e=S.ev(pi,q);if(!e)continue;if(e==='guard'?S.jg[pi][q]:S.judged[pi][q])continue;k=q;break;}
      if(k<0||S.t<S.bt[k]-0.025||S.t>=S.bt[k]+0.05)continue;const e=S.ev(pi,k);if(e==='guard')ZC.press(GK[pi]);else if(AP.act(pi).grounded){ZC.press(JK[pi]);if(e==='hold')ZC.hold(JK[pi],true);}}},
  // «Калинка» 5-4: прыжок или защита точно в долю (как бот t54)
  s54(){const W=ZC.W,S=W.S54,F=W.flags;if(!S||S.state!=='play')return;const KJ=['Space','KeyM'],KG=['KeyG','Period'];
    for(const pi of[0,1])for(let k=Math.max(0,S.lastK);k<=S.lastK+1&&k<S.NB;k++){const d=S.bt[k]-S.t;if(d<0.02&&d>-0.02&&!S.judged[pi][k])ZC.press(S.act(pi,k)==='guard'?KG[pi]:KJ[pi]);}
    if(F.cageOn&&!F.freed){if(AP.act(1).kind!=='yosha')ZC.press('KeyK');else ZC.press('KeyL');}},
  // 5-Б2 «Кощей»: оба игрока вместе — как бот tools/tests/bots/tfin_koshcoop.js (свечи на своих сторонах, отпереть друга, шар — другу и в небо,
  // око: выбранный держит щит, второй — со спины; игла — Прошке, ковка в такт, заслонить кузнеца; кольцо — щиты вместе)
  cd:[0,0],sw:0,it:0,
  kgo(pi,x,z,stop){const h=AP.act(pi),dx=x-h.pos.x,dz=z-h.pos.z,d=Math.hypot(dx,dz);if(d>(stop||1.2))AP.hold4(pi,dx,dz,0.25);else AP.hold4(pi,0,0);return d;},
  khit(pi,tp){const h=AP.act(pi);h.face=Math.atan2(tp.x-h.pos.x,tp.z-h.pos.z);if(ZC.G.time>AP.cd[pi]){AP.cd[pi]=ZC.G.time+0.42;ZC.press(AP.K[pi].a);}},
  kdef(pi){const K5=ZC.FIN.k5,h=AP.act(pi),k=AP.K[pi];
    for(const e of ZC.W.enemies){if(!e.alive||e.state!=='wind'||e.tgt!==h)continue;const left=e.wdur-e.t;if(e.sig==='red'){if(left<0.2&&h.rollT<=0)ZC.press(k.r);}else if(left<0.13&&e.left===null)ZC.press(k.g);}
    for(const b of ZC.W.bolts)if(b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2)ZC.press(k.g);
    for(const o of K5.orbs)if(o.tgt===h&&o.st!=='up'&&o.left===null&&o.eta<0.25)ZC.press(k.g);
    if(K5.RG.on&&K5.RG.t>1.33&&K5.RG.press[pi]===null)ZC.press(k.g);},
  kflee(pi){const h=AP.act(pi);for(const z of (ZC.FIN.k5.zones||[])){const d=Math.hypot(h.pos.x-z.position.x,h.pos.z-z.position.z);if(d<2.2){const dx=h.pos.x-z.position.x,dz=h.pos.z-z.position.z,l=Math.hypot(dx,dz)||1;AP.kgo(pi,h.pos.x+dx/l*3,h.pos.z+dz/l*3,0.2);return true;}}return false;},
  k5(){const K5=ZC.FIN.k5,G=ZC.G,W=ZC.W;if(!K5||!K5.fight)return;const st=K5.st,kb=K5.KB;
    for(const pi of[0,1]){const h=AP.act(pi),o=AP.act(1-pi);if(ZC.players[pi].downed){AP.hold4(pi,0,0);continue;}if(!(pi===0&&st===5&&K5.forging()))AP.kdef(pi);if(AP.kflee(pi))continue;
      const L=K5.locks[1-pi];if(L){if(AP.kgo(pi,L.h.pos.x+1,L.h.pos.z,0.6)<1.8)AP.khit(pi,L.h.pos);continue;}
      const open=kb.state==='broken'||kb.dazeT>0||(kb.state==='stagger'&&!kb.openHit);
      if(st===1){const c=K5.candles.filter(c=>c.lit&&(pi?c.pos.x>0:c.pos.x<0)).concat(K5.candles.filter(c=>c.lit)).sort((a,b)=>Math.hypot(a.pos.x-h.pos.x,a.pos.z-h.pos.z)-Math.hypot(b.pos.x-h.pos.x,b.pos.z-h.pos.z))[0];
        if(c){if(AP.kgo(pi,c.pos.x,c.pos.z,1.25)<1.8)AP.khit(pi,c.pos);}else AP.hold4(pi,0,0);continue;}
      if(st===2){if(open){if(AP.kgo(pi,kb.pos.x,kb.pos.z,1.6)<2.6)AP.khit(pi,kb.pos);continue;}AP.kgo(pi,kb.pos.x+(pi?1.8:-1.8),kb.pos.z+1.2,0.8);continue;}
      if(st===4){if(open){if(AP.kgo(pi,kb.pos.x,kb.pos.z,1.6)<2.6)AP.khit(pi,kb.pos);continue;}
        if(kb.pi===pi){AP.kgo(pi,kb.pos.x+Math.sin(kb.face)*2.2,kb.pos.z+Math.cos(kb.face)*2.2,0.8);continue;}
        if(AP.kgo(pi,kb.pos.x-Math.sin(kb.face)*1.7,kb.pos.z-Math.cos(kb.face)*1.7,0.5)<1.2)AP.khit(pi,kb.pos);continue;}
      if(st===3){if(kb.state==='broken'&&kb.pos.y<0.3){if(AP.kgo(pi,kb.pos.x,kb.pos.z,1.6)<2.6)AP.khit(pi,kb.pos);continue;}
        const rv=W.enemies.find(e=>e.kind==='k5raven'&&e.alive&&(e.dazeT>0||e.state==='broken')&&e.pos.y<1&&Math.hypot(e.pos.x-h.pos.x,e.pos.z-h.pos.z)<5);if(rv){if(AP.kgo(pi,rv.pos.x,rv.pos.z,1.1)<1.8)AP.khit(pi,rv.pos);continue;}
        AP.kgo(pi,pi?3:-3,-10,1.5);continue;}
      if(st===5){const N=K5.needle,A=K5.ANV;if(N&&N.ground){AP.kgo(pi,N.ground.x,N.ground.z,0.4);continue;}
        if(pi===0){if(h.kind!=='proshka'){AP.hold4(0,0,0);if(G.time>AP.sw){AP.sw=G.time+0.4;ZC.press('KeyQ');}continue;}AP.kgo(0,A.x,A.z+1.4,0.45);
          if(K5.forging()&&K5.forge){h.face=Math.PI;const u=K5.forge.c%0.75;if((u>0.71||u<0.03)&&G.time>AP.cd[0]){AP.cd[0]=G.time+0.35;ZC.press(AP.K[0].a);}}continue;}
        if(N&&N.holder===h){if(o.kind==='proshka'&&Math.hypot(o.pos.x-h.pos.x,o.pos.z-h.pos.z)<12&&G.time>AP.it){AP.it=G.time+0.6;ZC.press('Semicolon');}AP.kgo(1,o.pos.x+1.2,o.pos.z+0.8,1);continue;}
        const P=ZC.HERO.proshka;AP.kgo(1,P.pos.x+1.1,P.pos.z+0.6,0.5);const kw=kb.state==='wind'&&kb.tgt&&kb.tgt.kind==='proshka';ZC.hold(AP.K[1].g,!!kw&&kb.wdur-kb.t<0.35);}}},
  none(){},
  step(){AP.i++;const f=AP[AP.mode||'none'];if(f)f();}};
// звук при съёмке: каждый вызов синтеза записывается со временем видео (при записи звука он проигрывается в тот же миг)
window.__snd=[];window.__vt=0;
if(!window.__sndHooked){window.__sndHooked=true;const _t=window.tone;window.tone=function(){__snd.push({t:__vt,k:'tone',a:[...arguments]});return _t.apply(this,arguments);};
  const A=ZC.FIN.aud;for(const k of['osc','nz']){const f=A[k];A[k]=function(o){__snd.push({t:__vt,k,a:[Object.assign({},o)]});return f.apply(this,arguments);};}}
// голоса: какая запись и когда зазвучала (FIN.voxEv — хук модуля озвучки); main — реплика (новая обрывает прежнюю), layer — поверх, stop — затихла
ZC.FIN.voxEv=(id,kind,g)=>{__snd.push({t:__vt,gt:ZC.G.time,k:'vox',id,kind,g});};
// после перемотки к шоту: звуки перемотки не нужны; реплика, начатая до шота и ещё звучащая, — с нужного места (off, секунды от начала записи)
window.__preClean=()=>{const now=ZC.G.time;let last=null;for(const e of __snd){if(e.k!=='vox')continue;if(e.kind==='main')last=e;else if(e.kind==='stop'&&last&&e.id===last.id)last=null;}
  __snd.length=0;if(last&&now-last.gt>=0)__snd.push({t:0,k:'vox',id:last.id,kind:'main',g:1,off:now-last.gt});};
try{ZC.FIN.vox.audio();}catch(e){}   // звук игры включён (контекст может стоять на паузе) — реплики звучат записями, а не «бормотанием»
// часы интерфейса: CSS-анимации и переходы идут по времени видео, а не по настоящему (кадр снимается дольше, чем длится)
window.__animStep=function(ms){for(const a of document.getAnimations()){if(!a.__vt){a.__vt=true;try{a.pause();}catch(e){}a.__t=a.currentTime||0;}else a.__t+=ms;try{a.currentTime=a.__t;}catch(e){}}};
window.__gsync=function(){const gl=ZC.FIN.occ.dbg.renderer.getContext(),b=new Uint8Array(4);gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,b);};
'autopilot ok'
