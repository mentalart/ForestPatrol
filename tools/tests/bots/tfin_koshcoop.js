//@@
// релиз final06: 5-Б2 вдвоём — бой целиком настоящими нажатиями двух игроков, без отладочных побед. Проверяются кооперативные приёмы:
// свечи на своих сторонах, искорка по очереди, отпереть запертого друга, шар — другу и в небо, око: выбранный — щит, второй — со спины,
// передать иглу Прошке, заслонить его у наковальни, кольцо — щиты вместе. В конце — счётчики приёмов из журнала боя.
window.K5=ZC.FIN.k5;window.KY=[{u:'KeyW',d:'KeyS',l:'KeyA',r:'KeyD',j:'Space',a:'KeyF',g:'KeyG',sw:'KeyQ',ro:'ShiftLeft',it:'KeyR'},{u:'ArrowUp',d:'ArrowDown',l:'ArrowLeft',r:'ArrowRight',j:'KeyM',a:'Comma',g:'Period',sw:'KeyK',ro:'Slash',it:'Semicolon'}];
window.me=pi=>{const p=ZC.players[pi];return p.heroes[p.act];};window.hdist=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);
window.moveTo=(pi,x,z,stop)=>{const k=KY[pi],h=me(pi),dx=x-h.pos.x,dz=z-h.pos.z,d=Math.hypot(dx,dz),go=d>(stop||1.2);ZC.hold(k.l,go&&dx<-0.25);ZC.hold(k.r,go&&dx>0.25);ZC.hold(k.u,go&&dz<-0.25);ZC.hold(k.d,go&&dz>0.25);return d;};
window.stopMove=pi=>{const k=KY[pi];[k.l,k.r,k.u,k.d].forEach(c=>ZC.hold(c,false));};
window.S={att:[0,0],sw:[0,0],it:0,land:null,wasLeap:false,deaths:0,prevDown:false};
window.hitAt=(pi,tp)=>{const h=me(pi);h.face=Math.atan2(tp.x-h.pos.x,tp.z-h.pos.z);if(ZC.G.time>S.att[pi]){S.att[pi]=ZC.G.time+0.42;ZC.press(KY[pi].a);}};
window.defend=pi=>{const h=me(pi),T=ZC.G.time,k=KY[pi];
  for(const e of ZC.W.enemies){if(!e.alive||e.state!=='wind'||e.tgt!==h)continue;const left=e.wdur-e.t;if(e.sig==='red'){if(left<0.2&&h.rollT<=0)ZC.press(k.ro);}else if(left<0.13&&e.left===null)ZC.press(k.g);}
  for(const b of ZC.W.bolts)if(b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2)ZC.press(k.g);
  for(const o of K5.orbs)if(o.tgt===h&&o.st!=='up'&&o.left===null&&o.eta<0.25)ZC.press(k.g);
  if(K5.RG.on&&K5.RG.t>1.33&&K5.RG.press[pi]===null)ZC.press(k.g);
  if(pi===0){const kb=K5.KB;if(kb.state==='k5leap')S.wasLeap=true;else if(S.wasLeap){S.wasLeap=false;S.land=T;}}
  if(S.land!=null&&K5.leapTo){const d=hdist(h.pos,K5.leapTo),arr=S.land+Math.max(0,(d-0.6)/7.5*1.1);if(T>arr-0.12&&T<arr+0.1&&h.rollT<=0)ZC.press(k.ro);if(pi===1&&T>S.land+1.3)S.land=null;}};
window.flee=pi=>{const h=me(pi);for(const z of (K5.zones||[])){const d=hdist(h.pos,z.position);if(d<2.2){const dx=h.pos.x-z.position.x,dz=h.pos.z-z.position.z,l=Math.hypot(dx,dz)||1;moveTo(pi,h.pos.x+dx/l*3,h.pos.z+dz/l*3,0.2);return true;}}return false;};
window.ai=pi=>{const G=ZC.G,W=ZC.W,st=K5.st,h=me(pi),kb=K5.KB,o=me(1-pi);if(ZC.players[pi].downed){stopMove(pi);return;}if(!(pi===0&&st===5&&K5.forging()))defend(pi);if(flee(pi))return;   // Прошка у наковальни занят ковкой — его заслоняет друг
  // запертого друга — отпереть
  const L=K5.locks[me(1-pi).kind];if(L&&!K5.locks[h.kind]){const d=moveTo(pi,L.h.pos.x+1,L.h.pos.z,0.6);if(d<1.8)hitAt(pi,L.h.pos);return;}
  if(st===1){const mine=K5.candles.filter(c=>c.lit&&(pi?c.pos.x>0:c.pos.x<0));const all=K5.candles.filter(c=>c.lit);const c=(mine.length?mine:all).sort((a,b)=>hdist(a.pos,h.pos)-hdist(b.pos,h.pos))[0];if(c){const d=moveTo(pi,c.pos.x,c.pos.z,1.25);if(d<1.8)hitAt(pi,c.pos);}else stopMove(pi);return;}
  if(st===2){if(kb.state==='broken'||kb.dazeT>0||(kb.state==='stagger'&&!kb.openHit)){const d=moveTo(pi,kb.pos.x,kb.pos.z,1.6);if(d<2.6)hitAt(pi,kb.pos);return;}moveTo(pi,kb.pos.x+(pi?1.8:-1.8),kb.pos.z+1.2,0.8);return;}
  if(st===4){if(kb.state==='broken'||kb.dazeT>0||(kb.state==='stagger'&&!kb.openHit)){const d=moveTo(pi,kb.pos.x,kb.pos.z,1.6);if(d<2.6)hitAt(pi,kb.pos);return;}
    if(kb.pi===pi){moveTo(pi,kb.pos.x+Math.sin(kb.face)*2.2,kb.pos.z+Math.cos(kb.face)*2.2,0.8);return;}   // выбранный — перед ним, со щитом
    const bx=kb.pos.x-Math.sin(kb.face)*1.7,bz=kb.pos.z-Math.cos(kb.face)*1.7,d=moveTo(pi,bx,bz,0.5);if(d<1.2)hitAt(pi,kb.pos);return;}   // второй — со спины
  if(st===3){if(kb.state==='broken'&&kb.pos.y<0.3){const d=moveTo(pi,kb.pos.x,kb.pos.z,1.6);if(d<2.6)hitAt(pi,kb.pos);return;}
    const rv=W.enemies.find(e=>e.kind==='k5raven'&&e.alive&&(e.dazeT>0||e.state==='broken')&&e.pos.y<1&&hdist(e.pos,h.pos)<5);if(rv){const d=moveTo(pi,rv.pos.x,rv.pos.z,1.1);if(d<1.8)hitAt(pi,rv.pos);return;}
    moveTo(pi,pi?3:-3,-10,1.5);return;}
  if(st===5){const N=K5.needle,A=K5.ANV;if(N&&N.ground){moveTo(pi,N.ground.x,N.ground.z,0.4);return;}
    if(pi===0){if(h.kind!=='proshka'){stopMove(0);if(G.time>S.sw[0]){S.sw[0]=G.time+0.4;ZC.press(KY[0].sw);}return;}moveTo(0,A.x,A.z+1.4,0.45);
      if(K5.forging()&&K5.forge){h.face=Math.PI;const u=K5.forge.c%0.75;if((u>0.71||u<0.03)&&G.time>S.att[0]){S.att[0]=G.time+0.35;ZC.press(KY[0].a);}}return;}
    // второй: несёт иглу — передаёт Прошке; потом стоит рядом и держит щит, когда Кощей пикирует на Прошку
    if(N&&N.holder===h){if(o.kind==='proshka'&&hdist(o.pos,h.pos)<12&&G.time>S.it){S.it=G.time+0.6;ZC.press(KY[1].it);}moveTo(1,o.pos.x+1.2,o.pos.z+0.8,1);return;}
    moveTo(1,HERO_P().pos.x+1.1,HERO_P().pos.z+0.6,0.5);const kw=kb.state==='wind'&&kb.tgt&&kb.tgt.kind==='proshka';ZC.hold(KY[1].g,!!kw&&kb.wdur-kb.t<0.35);return;}};
window.HERO_P=()=>ZC.HERO.proshka;
window.run=(sec,until)=>{const n=Math.round(sec*60);for(let i=0;i<n;i++){const G=ZC.G;if(G.cine){stopMove(0);stopMove(1);ZC.skip();}else if(G.ui==='skaz'){ZC.press('Space');ZC.press('KeyM');}else if(K5.fight){ai(0);ai(1);const down=ZC.players[0].downed&&ZC.players[1].downed;if(down&&!S.prevDown)S.deaths++;S.prevDown=down;}else{stopMove(0);stopMove(1);}
    ZC.tick(1);if(until&&until())break;}stopMove(0);stopMove(1);ZC.hold(KY[1].g,false);
  const c=k=>K5.log.filter(x=>x.startsWith(k)).length;return 'st='+K5.st+' stage='+ZC.W.flags.stage+' t='+(ZC.G.time-S.t0).toFixed(0)+'s fails='+K5.fails.slice(1).join(',')+' deaths='+S.deaths+' | парир='+c('bparry')+' искорка='+c('sparkx3')+' замок='+c('lock')+'/'+c('unlock')+' шар-другу='+c('orbpass')+' в-небо='+c('orbup')+' спиной='+c('bhit')+' заслон='+c('cover')+' пас='+c('pass')+' кольцо='+c('ringok')+(K5.forge?' ковка='+K5.forge.n:'');};
ZC.startFrom(ZC.LV('5-B2'));ZC.G.manual=true;ZC.tick(10);S.t0=ZC.G.time;'coop lvl='+ZC.W.levelId
//@@ shot=koshcoop_1.png
run(200,()=>K5.st>=2&&K5.fight)
//@@ shot=koshcoop_2.png
run(240,()=>K5.st>=3&&K5.fight)
//@@ shot=koshcoop_3.png
run(240,()=>K5.st>=4&&K5.fight)
//@@ shot=koshcoop_4.png
run(240,()=>K5.st>=5&&K5.fight)
//@@ shot=koshcoop_5.png
run(300,()=>ZC.W.flags.stage==='chain'||ZC.W.levelId!=='5-B2')
//@@
const r=run(120,()=>ZC.W.levelId!=='5-B2');if(!ZC.G.done['5-B2'])throw new Error('вдвоём: финал не пройден — '+r);[r,'lvl='+ZC.W.levelId]
