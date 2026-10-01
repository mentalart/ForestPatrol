//@@
// релиз final06: 5-Б2 в одиночном режиме — бой целиком настоящими нажатиями одного игрока (клавиши Игрока 1), без отладочных побед:
// гасит свечи ударами, отбивает удары, ключи, капли и шары щитом в последний миг, от красного — кувырок, из красных кругов — уходит,
// в Пробое — «золотая нить», на пятом этапе переключается на Прошку и куёт в такт; скованного (путы держат до спасения) — сменить героя и сбить замок. Проверка: этот босс проходится одним героем.
ZC.setSolo(true);window.K5=ZC.FIN.k5;window.KY={u:'KeyW',d:'KeyS',l:'KeyA',r:'KeyD',j:'Space',a:'KeyF',g:'KeyG',sw:'KeyQ',ro:'ShiftLeft'};
window.me=()=>{const p=ZC.players[ZC.G.soloPi];return p.heroes[p.act];};
window.hdist=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
window.moveTo=(x,z,stop)=>{const h=me(),dx=x-h.pos.x,dz=z-h.pos.z,d=Math.hypot(dx,dz),go=d>(stop||1.2);ZC.hold(KY.l,go&&dx<-0.25);ZC.hold(KY.r,go&&dx>0.25);ZC.hold(KY.u,go&&dz<-0.25);ZC.hold(KY.d,go&&dz>0.25);return d;};
window.stopMove=()=>[KY.l,KY.r,KY.u,KY.d].forEach(k=>ZC.hold(k,false));
window.S={t:0,att:0,sw:0,land:null,wasLeap:false,log:[],deaths:0,prevDown:false};
window.hitAt=(tp)=>{const h=me();h.face=Math.atan2(tp.x-h.pos.x,tp.z-h.pos.z);if(ZC.G.time>S.att){S.att=ZC.G.time+0.42;ZC.press(KY.a);}};
// защита на этот кадр: удар в замахе, капля, шар, кольцо, волна от прыжка
window.defend=()=>{const h=me(),T=ZC.G.time;let did=false;
  for(const e of ZC.W.enemies){if(!e.alive||e.state!=='wind'||e.tgt!==h)continue;const left=e.wdur-e.t;if(e.sig==='red'){if(left<0.2&&h.rollT<=0){ZC.press(KY.ro);did=true;}}else if(left<0.13&&e.left===null){ZC.press(KY.g);did=true;}}
  for(const b of ZC.W.bolts)if(b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2){ZC.press(KY.g);did=true;}
  for(const o of K5.orbs)if(o.tgt===h&&o.st!=='up'&&o.left===null&&o.eta<0.25){ZC.press(KY.g);did=true;}
  if(K5.RG.on&&K5.RG.t>1.33&&K5.RG.press[ZC.G.soloPi]===null){ZC.press(KY.g);did=true;}
  const kb=K5.KB;if(kb.state==='k5leap')S.wasLeap=true;else if(S.wasLeap){S.wasLeap=false;S.land=T;}
  if(S.land!=null&&K5.leapTo){const d=hdist(h.pos,K5.leapTo),arr=S.land+Math.max(0,(d-0.6)/7.5*1.1);if(T>arr-0.12&&T<arr+0.1&&h.rollT<=0){ZC.press(KY.ro);did=true;}if(T>S.land+1.3)S.land=null;}
  return did;};
// красные круги: отойти от ближайшего
window.flee=()=>{const h=me();for(const z of (K5.zones||[])){const d=hdist(h.pos,z.position);if(d<2.2){const dx=h.pos.x-z.position.x,dz=h.pos.z-z.position.z,l=Math.hypot(dx,dz)||1;moveTo(h.pos.x+dx/l*3,h.pos.z+dz/l*3,0.2);return true;}}return false;};
window.stepAI=()=>{const G=ZC.G,W=ZC.W,st=K5.st,h=me(),kb=K5.KB;
  if(G.cine){stopMove();ZC.skip();return;}if(G.ui==='skaz'){ZC.press('Space');ZC.press('KeyM');return;}if(!K5.fight){stopMove();return;}
  const down=ZC.players[0].downed&&ZC.players[1].downed;if(down&&!S.prevDown)S.deaths++;S.prevDown=down;
  // скован — сам не вырвешься: смени героя (Q); скован кто-то другой — пять ударов по замку
  if(K5.k5Locked&&K5.k5Locked(h)){stopMove();if(G.time>(S.swL||0)){S.swL=G.time+0.5;ZC.press(KY.sw);S.log.push('swapL');}return;}
  defend();if(flee())return;
  const Lk=Object.values(K5.locks).find(L=>L.h!==h);if(Lk){const d=moveTo(Lk.h.pos.x,Lk.h.pos.z,1.2);if(d<2.0)hitAt(Lk.h.pos);return;}
  if(st===1){const c=K5.candles.filter(c=>c.lit).sort((a,b)=>hdist(a.pos,h.pos)-hdist(b.pos,h.pos))[0];if(c){const d=moveTo(c.pos.x,c.pos.z,1.25);if(d<1.8)hitAt(c.pos);}else stopMove();return;}
  if(st===2||st===4){if(kb.state==='broken'||kb.dazeT>0||(kb.state==='stagger'&&!kb.openHit)){const d=moveTo(kb.pos.x,kb.pos.z,1.6);if(d<2.6)hitAt(kb.pos);return;}
    const bone=W.enemies.find(e=>e.kind==='k5bone'&&e.alive&&(e.state==='broken'||e.dazeT>0)&&hdist(e.pos,h.pos)<3);if(bone){moveTo(bone.pos.x,bone.pos.z,1.2);hitAt(bone.pos);return;}
    moveTo(kb.pos.x,kb.pos.z,2.3);return;}
  if(st===3){if(kb.state==='broken'&&kb.pos.y<0.3){const d=moveTo(kb.pos.x,kb.pos.z,1.6);if(d<2.6)hitAt(kb.pos);return;}
    const rv=W.enemies.find(e=>e.kind==='k5raven'&&e.alive&&(e.dazeT>0||e.state==='broken')&&e.pos.y<1&&hdist(e.pos,h.pos)<5);if(rv){const d=moveTo(rv.pos.x,rv.pos.z,1.1);if(d<1.8)hitAt(rv.pos);return;}
    moveTo(0,-11,2.5);return;}
  if(st===5){const N=K5.needle;if(N&&N.ground){moveTo(N.ground.x,N.ground.z,0.4);return;}
    if(h.kind!=='proshka'){stopMove();if(G.time>S.sw){S.sw=G.time+0.35;ZC.press(KY.sw);}return;}
    if(kb.state==='broken'&&false)return;const A=K5.ANV;const d=moveTo(A.x,A.z+1.4,0.45);
    if(K5.forging()&&K5.forge){h.face=Math.PI;const u=K5.forge.c%0.75;if((u>0.71||u<0.03)&&G.time>S.att){S.att=G.time+0.35;ZC.press(KY.a);}}return;}};
window.run=(sec,until)=>{const n=Math.round(sec*60);for(let i=0;i<n;i++){stepAI();ZC.tick(1);if(until&&until())break;}stopMove();
  return 'st='+K5.st+' fight='+K5.fight+' stage='+ZC.W.flags.stage+' t='+(ZC.G.time-S.t0).toFixed(0)+'s fails='+K5.fails.join(',')+' deaths='+S.deaths+' emb='+K5.KB.embers+'/'+K5.KB.maxEmb+(K5.forge?' forge='+K5.forge.n:'');};
ZC.startFrom(ZC.LV('5-B2'));ZC.G.manual=true;ZC.tick(10);S.t0=ZC.G.time;'solo='+ZC.G.solo+' lvl='+ZC.W.levelId
//@@ shot=koshsolo_1.png
run(200,()=>K5.st>=2&&K5.fight)
//@@ shot=koshsolo_2.png
run(240,()=>K5.st>=3&&K5.fight)
//@@ shot=koshsolo_3.png
run(240,()=>K5.st>=4&&K5.fight)
//@@ shot=koshsolo_4.png
run(240,()=>K5.st>=5&&K5.fight)
//@@ shot=koshsolo_5.png
run(300,()=>ZC.W.flags.stage==='chain'||ZC.W.levelId!=='5-B2')
//@@
const r=run(120,()=>ZC.W.levelId!=='5-B2');const ok=ZC.G.done['5-B2'];if(!ok)throw new Error('одиночный режим: финал не пройден — '+r);[r,'done='+ok,'lvl='+ZC.W.levelId,'names='+Object.keys(ZC.G.flags.names||{}).length]
