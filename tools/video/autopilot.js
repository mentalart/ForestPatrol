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
  none(){},
  step(){AP.i++;const f=AP[AP.mode||'none'];if(f)f();}};
// звук при съёмке: каждый вызов синтеза записывается со временем видео (при записи звука он проигрывается в тот же миг)
window.__snd=[];window.__vt=0;
if(!window.__sndHooked){window.__sndHooked=true;const _t=window.tone;window.tone=function(){__snd.push({t:__vt,k:'tone',a:[...arguments]});return _t.apply(this,arguments);};
  const A=ZC.FIN.aud;for(const k of['osc','nz']){const f=A[k];A[k]=function(o){__snd.push({t:__vt,k,a:[Object.assign({},o)]});return f.apply(this,arguments);};}}
// часы интерфейса: CSS-анимации и переходы идут по времени видео, а не по настоящему (кадр снимается дольше, чем длится)
window.__animStep=function(ms){for(const a of document.getAnimations()){if(!a.__vt){a.__vt=true;try{a.pause();}catch(e){}a.__t=a.currentTime||0;}else a.__t+=ms;try{a.currentTime=a.__t;}catch(e){}}};
window.__gsync=function(){const gl=ZC.FIN.occ.dbg.renderer.getContext(),b=new Uint8Array(4);gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,b);};
'autopilot ok'
