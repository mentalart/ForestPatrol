/* ============================== ФИЗИКА ГЕРОЯ ============================== */
function moveHero(h,dt,wx,wz,speed){const k=h.grounded?12:4.5;h.vel.x=damp(h.vel.x,wx*speed,k,dt);h.vel.z=damp(h.vel.z,wz*speed,k,dt);}
function integrate(h,dt){
  // струна вниз: съезжаем, повиснув на лапах; по ровной — идём, как по канату
  const gr=h.grounded&&h.groundRef&&h.groundRef.string&&!h.groundRef.sag?h.groundRef:null;
  if(gr&&Math.abs(gr.y2-gr.y)/Math.max(gr.len,0.1)>0.14){const dn=gr.y2<gr.y?1:-1;h.hang=true;h.vel.x=gr.dx*dn*7;h.vel.z=gr.dz*dn*7;h.face=Math.atan2(gr.dx*dn,gr.dz*dn);}
  else if(h.grounded)h.hang=false;
  h.vel.y-=GRAV*dt;{const gs=(W.lavas.length&&!W.noHeatSink&&overLava(h))?-5.2:-1.9;if(h.glide&&h.vel.y<gs)h.vel.y=gs;}if(h.vel.y<-30)h.vel.y=-30;
  const r=h.d.radius,hh=heroHeight(h);
  const res=collideXZ(h.pos.x+h.vel.x*dt,h.pos.z+h.vel.z*dt,r,h.pos.y,h.pos.y+hh);h.pos.x=res.x;h.pos.z=res.z;h.blocked=res.hit;
  if(h.active&&!(W.rollThrough&&h.rollT>0))for(const e of W.enemies){if(!e.alive||e.state==='hide'||(e.noKill&&e.state==='broken')||e.ghostly)continue;const dx=h.pos.x-e.pos.x,dz=h.pos.z-e.pos.z,d=Math.hypot(dx,dz),rr=r+e.r;if(d<rr&&d>1e-4&&Math.abs(h.pos.y-e.pos.y)<1.5){h.pos.x=e.pos.x+dx/d*rr;h.pos.z=e.pos.z+dz/d*rr;}}
  if(h.active)for(const t of W.hittables){if(!t.push||!t.alive())continue;const dx=h.pos.x-t.pos.x,dz=h.pos.z-t.pos.z,d=Math.hypot(dx,dz),rr=r+t.r;if(d<rr&&d>1e-4){h.pos.x=t.pos.x+dx/d*rr;h.pos.z=t.pos.z+dz/d*rr;}}
  if(W.clampR){const c=W.clampR,dx=h.pos.x-c.x,dz=h.pos.z-c.z,d=Math.hypot(dx,dz);if(d>c.r){h.pos.x=c.x+dx/d*c.r;h.pos.z=c.z+dz/d*c.r;}}
  const prevY=h.pos.y;let ny=prevY+h.vel.y*dt;const reach=h.grounded?prevY+STEP:prevY+0.02;const g=groundAt(h.pos.x,h.pos.z,reach,undefined,h);
  if(ny<=g.y&&h.vel.y<=0.001){const landed=!h.grounded;
    // паутинка: две струны крест-накрест — прыжок в перекрестье подбрасывает на три метра
    if(g.ref&&g.ref.string&&landed&&W.webs.some(w=>Math.hypot(w.x-h.pos.x,w.z-h.pos.z)<1.45&&Math.abs(w.y-g.y)<0.7)){ny=g.y+0.02;h.vel.y=14.2;h.grounded=false;h.groundRef=null;h.hang=false;SFX.toss();
      floatText(h.pos.clone().add(new V3(0,h.d.height+0.4,0)),'Паутинка!','#fff2b0');if(W.onWeb)W.onWeb(h);}
    else{if(landed&&-h.vel.y>9&&h.active){shake(h.player,0.03,0.18);SFX.land();}ny=g.y;h.vel.y=0;h.grounded=true;h.groundRef=g.ref;h.lastGroundY=g.y;h.coyote=0.12;}}
  else if(h.grounded&&h.vel.y<=0&&g.y>prevY-0.3&&g.y<=reach){ny=g.y;h.vel.y=0;h.groundRef=g.ref;}
  else{h.grounded=false;h.groundRef=null;}
  h.pos.y=ny;if(h.active&&h.grounded&&!(h.groundRef&&(h.groundRef.string||h.groundRef.water||h.groundRef.net))&&h.pos.y>(W.fallY||-9)+2){if(!h.safe)h.safe=new V3();if(!h.safeT||G.time-h.safeT>0.5){h.safeT=G.time;h.safe.copy(h.pos);}}
  if(h.pos.y<(W.fallY||-9))onFall(h);}
function placeOnGround(h,x,z,yHint){h.pos.set(x,yHint+0.05,z);const g=groundAt(x,z,yHint+1.5,0.3);h.pos.y=g.y>-1e8?g.y:yHint;h.vel.set(0,0,0);h.grounded=true;h.groundRef=g.ref;h.lastGroundY=h.pos.y;}
function onFall(h){ // падение: без урона, назад к колокольчику своего игрока; три падения в одном месте — «Держись за меня»
  const p=players[h.player];if(W.fallHook&&W.fallHook(h))return;
  if(h.active){G.stats.falls++;const now=G.time;p.falls=p.falls.filter(f=>now-f.t<240);const near=p.falls.filter(f=>Math.hypot(f.x-h.pos.x,f.z-h.pos.z)<7).length;p.falls.push({x:h.pos.x,z:h.pos.z,t:now});
    tip(h.player,near>=2?'Тут трудно — не торопись! Ты снова у колокольчика, лепестки целы.':'Упс! Ты снова у колокольчика. Лепестки целы — будь смелым.',2.4);}
  if(h.active&&W.spring&&h.safe){W.spring=false;placeOnGround(h,h.safe.x,h.safe.z,h.safe.y);h.iT=1;floatText(h.pos.clone().add(new V3(0,h.d.height+0.7,0)),'Пружинка Колобка!','#f0c050');SFX.toss();return;}
  const k=p.heroes.indexOf(h);placeOnGround(h,p.cp.x+(k?1.2:-0.4),p.cp.z,p.cp.y);h.iT=1;h.following=false;burst(h.pos.clone().add(new V3(0,0.6,0)),0xffffff,8,3);}
function teleportBehind(o,h){const tx=h.pos.x-Math.sin(h.face)*1.2,tz=h.pos.z-Math.cos(h.face)*1.2;const g=groundAt(tx,tz,h.pos.y+0.5,0);
  if(g.y>h.pos.y-0.5)placeOnGround(o,tx,tz,h.pos.y);else placeOnGround(o,h.pos.x,h.pos.z,h.pos.y);o.stuck=0;burst(o.pos.clone().add(new V3(0,0.5,0)),COL.gold,8,2);}

/* ============================== ДЕЙСТВИЯ ИГРОКОВ ============================== */
function camBack(){return new V3(Math.sin(W.camYaw),0,Math.cos(W.camYaw));}
function updatePlayer(pi,dt){
  const p=players[pi],h=active(pi),o=other(pi);p.spiritLock=Math.max(0,p.spiritLock-dt);p.gusCd=Math.max(0,(p.gusCd||0)-dt);p.featCd=Math.max(0,(p.featCd||0)-dt);p.tongCd=Math.max(0,(p.tongCd||0)-dt);p.lockedTip=Math.max(0,p.lockedTip-dt);p.yarnCd=Math.max(0,p.yarnCd-dt);p.owlCd=Math.max(0,p.owlCd-dt);
  if(!h.guard)p.spirit=Math.min(1,p.spirit+dt*0.3);
  if(p.downed){h.guard=false;updateDowned(pi,dt);updateLeftBehind(p,o,dt);if(G.solo&&pi===G.soloPi&&tap(pi,'swap'))soloSwap();return;}
  if(h.cling){updateCling(pi,h);updateLeftBehind(p,o,dt);return;}
  // одиночный режим: позванный «Ко мне» герой второго игрока идёт за тем, кем управляешь (а его оставленный — за ним)
  if(G.solo&&pi!==G.soloPi&&h.following&&!W.custom){h.guard=false;updateLeftBehind(players[G.soloPi],h,dt);updateLeftBehind(p,o,dt);return;}
  const lock=!!(G.cine||G.trans||G.ui);let ix=0,iz=0;
  if(!lock&&h.knockT<=0){if(btn(pi,'right'))ix+=1;if(btn(pi,'left'))ix-=1;if(btn(pi,'up'))iz+=1;if(btn(pi,'down'))iz-=1;const pa=padAx(pi);if(pa.x||pa.y){ix+=pa.x;iz-=pa.y;}}
  if(W.custom){W.custom(pi,h,dt,{ix,iz,lock});return;}                    // особые уровни (гусельный) управляют героем сами
  const back=camBack(),right=new V3(back.z,0,-back.x);let wx=right.x*ix-back.x*iz,wz=right.z*ix-back.z*iz;const wl=Math.hypot(wx,wz);if(wl>1){wx/=wl;wz/=wl;}
  if(!lock){if(tap(pi,'swap')){if(G.solo)soloSwap();else doSwap(pi);}
    if(tap(pi,'call'))doCall(pi);if(tap(pi,'item')){if(W.itemSign&&W.itemSign(pi))W.itemSign(pi)(pi);else if(W.world===2)playGusli(pi);else if(W.world===3)playFeather(pi);else if(W.world===4)playTongs(pi);else if(W.world===5)useSign(pi);else throwYarn(pi);}}
  const hh=active(pi);if(hh!==h){updateLeftBehind(p,other(pi),dt);return;}
  // держит толстую струну и оборачивается к тем, кто на ней, — струна проседает в ряску (ловушка 1-2)
  if(!lock&&wl>0.3&&!h.hang){const str=W.threads.find(t=>t.string&&t.thick&&t.hero===h&&!t.sag&&hd(h.pos,t.anchor)<1.2);if(str&&HEROES.some(q=>q!==h&&q.groundRef===str))releaseString(str,true);}
  h.guard=!lock&&btn(pi,'guard')&&p.spiritLock<=0&&h.rollT<=0&&!h.hang;
  // момент нажатия защиты запоминается во времени морока: по нему решается щит / отбив / «Одним махом»
  if(!lock&&tap(pi,'guard')){for(const e of W.enemies)if(e.alive&&e.tgt===h&&e.state==='wind')e.left=e.wdur-e.t;for(const b of W.bolts)if(b.tgt===h&&!b.refl)b.left=b.eta;if(W.onGuardTap){W.onGuardTap(pi,h);if(G.solo)W.onGuardTap(1-pi,active(1-pi));}}
  if(!lock&&tap(pi,'roll')){if(!W.abil.roll){if(p.lockedTip<=0){p.lockedTip=4;tip(pi,'Кувыркаться выучишься позже — в уровне 1-2 «Кикиморино болото».',2.2);}}
    else if(h.rollCd<=0&&h.grounded&&!h.hang){h.rollT=0.38;h.iT=Math.max(h.iT,0.42);h.rollCd=0.7;h.lastRoll=G.time;if(wl>0.1)h.rollDir.set(wx,0,wz).normalize();else h.rollDir.set(Math.sin(h.face),0,Math.cos(h.face));SFX.roll();}}
  if(!lock&&tap(pi,'attack')&&h.atkCd<=0&&h.rollT<=0&&!h.hang){h.atkT=0.28;h.atkCd=0.36;SFX.swish();heroAttack(h,h.d.range,0.2);if(W.onAttack)W.onAttack(pi,h);}
  if(!lock&&tap(pi,'skill')&&!h.hang)doSkill(pi,h);
  if(!lock&&tap(pi,'jump')&&!h.hang){if(p.clingOffer&&h.grounded)startCling(pi,h);else doJump(h);}
  h.glide=h.kind==='pelageya'&&!lock&&!h.grounded&&btn(pi,'jump')&&h.vel.y<0&&!(W.noGlide&&W.noGlide(h));
  let sp=h.d.speed;if(h.guard)sp*=0.35;if(h.atkT>0)sp*=0.5;if(W.slowZone&&W.slowZone(h))sp*=0.4;if(h.grounded&&h.groundRef&&h.groundRef.water)sp*=0.8;if(W.wade)sp*=W.wade(h);
  if(h.hang||h.aimT>0){}else if(h.rollT>0){h.vel.x=h.rollDir.x*7.2;h.vel.z=h.rollDir.z*7.2;}else if(h.knockT<=0)moveHero(h,dt,wx,wz,sp);   // aimT — паутинка сама несёт к уступу
  if(wl>0.1&&h.rollT<=0&&!h.hang)h.face=angDamp(h.face,Math.atan2(wx,wz),h.guard?7:13,dt);
  h.moving=wl>0.1;if(!h.grounded)h.coyote-=dt;
  updateLeftBehind(p,o,dt);}
function doJump(h){if(!(h.grounded||h.coyote>0))return;const top=h.pos.y+heroHeight(h);let v=h.d.jump;
  // стоишь на перекрестье паутинки — прыжок с неё подбрасывает на три метра
  if(h.grounded&&W.webs.some(w=>Math.hypot(w.x-h.pos.x,w.z-h.pos.z)<1.45&&Math.abs(w.y-h.pos.y)<0.7)){h.vel.y=14.2;h.grounded=false;h.groundRef=null;h.coyote=0;SFX.toss();floatText(h.pos.clone().add(new V3(0,h.d.height+0.4,0)),'Паутинка!','#fff2b0');if(W.onWeb)W.onWeb(h);return;}
  if(h.groundRef&&h.groundRef.water)v*=0.5;if(h.carry)v*=0.8;if(h.jumpK)v*=h.jumpK;   // из воды высоко не выпрыгнуть
  const c=ceilingAt(h.pos.x,h.pos.z,h.d.radius,top);if(c<1e8){const room=c-top-0.04;if(room<0.08)return;v=Math.min(v,Math.sqrt(2*GRAV*room));}
  h.vel.y=v;h.grounded=false;h.coyote=0;SFX.jump();}
function doSwap(pi){const p=players[pi],h=active(pi),o=other(pi);if(h.cling)return;if(W.noSwap&&W.noSwap(pi)){SFX.miss();tip(pi,W.noSwapTip||'Сейчас другого героя не взять — погоди.',2.4);return;}
  h.firefly=25;h.active=false;h.following=false;h.vel.x=0;h.vel.z=0;h.guard=false;h.glide=false;
  p.act=1-p.act;o.active=true;o.following=false;G.stats.swaps++;SFX.swap();ringFx(o.pos,PCOL[pi],1.6);}
function doCall(pi){const o=other(pi),h=active(pi);if(h.cling)return;
  o.following=true;o.stuck=0;if(G.solo)for(const q of players[1-pi].heroes){if(q.cling)continue;q.following=true;q.stuck=0;q.warned=false;}   // в одиночку зовёт всех троих
  SFX.call();floatText(h.pos.clone().add(new V3(0,h.d.height+0.7,0)),G.solo?'Все ко мне, ко мне!':'Ко мне!',PCSS[pi]);ringFx(h.pos,PCOL[pi],2);if(W.pingCall)W.pingCall(pi,h);}
// одиночный режим: Y по кругу Прошка → Потап → Пелагея → Йоша; свой второй герой — обычная смена, герой второго игрока — просто берёшь его
const SOLO4=['proshka','potap','pelageya','yosha'];
function soloSwap(){if(G._swT===G.time)return;G._swT=G.time;const pi0=G.soloPi,cur=active(pi0);if(cur.cling)return;const i=SOLO4.indexOf(cur.kind);
  for(let k=1;k<4;k++){const n=HERO[SOLO4[(i+k)%4]];if(!n||n.cling)continue;const q=n.player,pq=players[q];if(pq.downed)continue;
    if(q===pi0){if(W.noSwap&&W.noSwap(q))continue;doSwap(q);if(active(q)!==n)continue;return;}
    cur.vel.x=0;cur.vel.z=0;cur.guard=false;cur.glide=false;
    if(!n.active){if(active(q).cling||(W.noSwap&&W.noSwap(q)))continue;doSwap(q);if(active(q)!==n)continue;}
    else{G.stats.swaps++;SFX.swap();ringFx(n.pos,PCOL[q],1.6);}
    G.soloPi=q;n.following=false;n.stuck=0;return;}
  SFX.miss();tip(pi0,W.noSwapTip||'Сейчас другого героя не взять — погоди.',2.4);}
function setSolo(on){G.solo=!!on;G.soloPi=0;if(on)players[1].path=players[0].path;for(const h of HEROES)if(h.active)h.following=false;}
function updateLeftBehind(p,o,dt){const h=active(p.i);if(W.gaze&&o.firefly>0)o.firefly-=dt;
  if(o.following&&!h.cling){const tx=h.pos.x-Math.sin(h.face)*1.6,tz=h.pos.z-Math.cos(h.face)*1.6,dx=tx-o.pos.x,dz=tz-o.pos.z,d=Math.hypot(dx,dz);
    if(d>0.9){const ux=dx/d,uz=dz/d;o.face=angDamp(o.face,Math.atan2(dx,dz),8,dt);
      // у края: узкую щель перепрыгнет сам, у широкой остановится и подождёт (не падает)
      const gy=groundAt(o.pos.x+ux*0.75,o.pos.z+uz*0.75,o.pos.y+STEP).y,edge=o.grounded&&(gy<o.pos.y-1.2||(W.wetY!==undefined&&gy<W.wetY&&o.pos.y>=W.wetY));   // в ряску сам не лезет
      if(edge){const far=groundAt(o.pos.x+ux*2.3,o.pos.z+uz*2.3,o.pos.y+STEP).y;if(far>o.pos.y-0.6&&far<o.pos.y+0.4&&!(W.wetY!==undefined&&far<W.wetY)){o.vel.x=ux*o.d.speed;o.vel.z=uz*o.d.speed;o.vel.y=o.d.jump;o.grounded=false;}else{o.vel.x=0;o.vel.z=0;}}
      else moveHero(o,dt,ux,uz,Math.min(o.d.speed*1.08,2+d*1.6));
      if(o.blocked&&o.grounded&&d>1.4&&Math.random()<0.1){o.vel.y=o.d.jump;o.grounded=false;}}
    else moveHero(o,dt,0,0,0);
    const real=o.px===undefined?9:Math.hypot(o.pos.x-o.px,o.pos.z-o.pz)/Math.max(dt,1e-3);o.px=o.pos.x;o.pz=o.pos.z;  // реальная скорость: упёрся в стену — «застрял»
    if(d>1.6&&real<0.7)o.stuck+=dt;else o.stuck=Math.max(0,o.stuck-dt);
    if((o.stuck>2.5||d>26)&&!pathBlocked(o.pos,h.pos)&&!(W.pullMax&&d>W.pullMax)){const far=d>4;teleportBehind(o,h);if(far){G.stats.carries++;floatText(o.pos.clone().add(new V3(0,o.d.height+0.6,0)),(W.world===4||W.vestPull?'Весточка подтянула!':'Звенышко подтянуло!'),'#ffd76a');}}
    else if(o.stuck>2.5&&!o.warned){o.warned=true;tip(p.i,W.leftTip?W.leftTip(p.i,o):'Второй герой не пройдёт. Дорогу ему открой!',W.leftTip?3.6:2.2);}
    if(o.stuck<0.5)o.warned=false;}
  else{if(!(o.tossT>0))moveHero(o,dt,0,0,0);o.px=undefined;
    // отстал больше чем на 30 м и ничего не держит — подсказчик переносит его к управляемому
    if(!G.cine&&!G.trans&&!o.held&&!h.cling&&h.grounded&&!W.pullMax&&hd(o.pos,h.pos)>30&&!pathBlocked(o.pos,h.pos)){teleportBehind(o,h);G.stats.carries++;floatText(o.pos.clone().add(new V3(0,o.d.height+0.6,0)),(W.world===4||W.vestPull?'Весточка подтянула!':'Звенышко подтянуло!'),'#ffd76a');}}}
/* «Держись за меня»: герой цепляется за героя напарника до следующего колокольчика */
function startCling(pi,h){const c=active(1-pi);players[pi].clingOffer=false;if(c.cling)return;h.cling=true;h.clingBell=players[pi].cpBell;G.stats.clings++;SFX.ok();
  floatText(h.pos.clone().add(new V3(0,h.d.height+0.6,0)),'Держусь!',PCSS[pi]);tip(pi,'За друга держишься до следующего колокольчика.',2.6);tip(1-pi,'Друг за тебя держится — донеси до колокольчика!',2.6);}
function updateCling(pi,h){const c=active(1-pi);h.pos.set(c.pos.x-Math.sin(c.face)*0.3,c.pos.y+heroHeight(c)*0.72,c.pos.z-Math.cos(c.face)*0.3);h.vel.set(0,0,0);h.face=c.face;h.grounded=true;h.groundRef=null;
  for(const b of W.bells){if(b===h.clingBell)continue;if(hd(c.pos,b)<2.6){h.cling=false;placeOnGround(h,c.pos.x+1.0,c.pos.z+0.7,c.pos.y);floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'Спасибо!',PCSS[pi]);
    const o=other(pi);if(hd(o.pos,h.pos)>12){teleportBehind(o,h);o.following=false;}   // «Держись за меня» — пропуск трудного места: второй герой пары тоже здесь
    break;}}}
function doSkill(pi,h){const p=players[pi];if(W.skillHook&&W.skillHook(pi,h))return;
  if(W.rzt&&W.rzt.state==='count'){rztPress(pi);return;}
  if(h.kind==='proshka'){if(h.skillCd>0)return;h.skillCd=0.5;shootAcorn(h,findMark(h));return;}
  if(h.kind==='yosha'){if(h.skillCd>0)return;h.skillCd=0.8;ladle(h);return;}
  if(h.kind==='potap'&&W.lifts.length){const L=W.lifts.find(l=>l.active()&&hd(l.pos,h.pos)<2.3&&Math.abs(l.pos.y-h.pos.y)<1.6);if(L){if(h.skillCd>0)return;h.skillCd=0.8;h.atkT=0.28;L.onLift(h);return;}}
  if(h.kind==='potap'&&W.abil.toss){if(h.skillCd>0)return;h.skillCd=0.8;toss(h);return;}
  if(h.kind==='pelageya'&&W.abil.owl){if(p.owlCd>0){floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'Глаза отдыхают…','#e7c3ff');return;}p.owlCd=6;owlSight(h);return;}
  if(p.lockedTip<=0){p.lockedTip=5;SFX.miss();floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'Ещё не умею, не умею!',PCSS[pi]);
    tip(pi,h.kind==='potap'?'Подкидывать друзей Потап выучится в уровне 1-1.':'Совиный взор у Пелагеи в уровне 1-4 появится.',3);}}
/* RT Потапа — подкидка: подбрасывает стоящего рядом героя */
function toss(h){let best=null,bd=2.4;for(const o of HEROES){if(o===h||o.cling)continue;if(o.active&&players[o.player].downed)continue;const d=hd(o.pos,h.pos);if(d<bd&&Math.abs(o.pos.y-h.pos.y)<0.8){bd=d;best=o;}}
  SFX.toss();h.atkT=0.28;
  if(!best){floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'Подкидка — рядом с другом встань','#e0b27a');return;}
  best.vel.y=13.6;best.vel.x=Math.sin(h.face)*2.2;best.vel.z=Math.cos(h.face)*2.2;best.grounded=false;best.following=false;best.tossT=1.2;ringFx(best.pos,0xc08a48,1.6);floatText(best.pos.clone().add(new V3(0,best.d.height+0.5,0)),'Оп!','#ffd9a0');
  if(!G.flags.tossBark){G.flags.tossBark=true;later(0.5,()=>bark(h,'potap','Как Илья Муромец… э-э… подкидывал, бывало.',2.6));}}
/* RT Пелагеи — Совиный взор: 4 секунды видно скрытое (настоящую тропу, тайники, настоящего двойника) */
function owlSight(h){W.owlT=4;SFX.owl();floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'Совиный взор!','#e7c3ff');if(W.onOwl)W.onOwl(h);}
function findMark(h){let best=null,bd=1e9;const fx=Math.sin(h.face),fz=Math.cos(h.face);
  for(const m of W.marks){if(!m.active())continue;const dx=m.pos.x-h.pos.x,dz=m.pos.z-h.pos.z,d=Math.hypot(dx,dz);if(d>14)continue;if(d>4&&(dx*fx+dz*fz)/d<-0.3)continue;if(d<bd){bd=d;best=m;}}return best;}
function shootAcorn(h,mk){SFX.thwip();if(mk)h.face=Math.atan2(mk.pos.x-h.pos.x,mk.pos.z-h.pos.z);
  const from=h.pos.clone().add(new V3(Math.sin(h.face)*0.4,h.d.height*0.8,Math.cos(h.face)*0.4));
  const to=mk?mk.pos.clone():new V3(from.x+Math.sin(h.face)*7,Math.max(h.pos.y,groundAt(from.x+Math.sin(h.face)*7,from.z+Math.cos(h.face)*7,h.pos.y+2).y)+0.12,from.z+Math.cos(h.face)*7);
  const m=acornMesh(1.2);m.position.copy(from);W.group.add(m);W.shots.push({m,from,to,t:0,dur:mk?0.42:0.6,arc:mk?0.7:1.6,mk});
  floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'Щёлк!','#ffd9a0');}
function updateShots(dt){for(let i=W.shots.length-1;i>=0;i--){const s=W.shots[i];s.t+=dt;const k=Math.min(1,s.t/s.dur);s.m.position.lerpVectors(s.from,s.to,k);s.m.position.y+=s.arc*4*k*(1-k);s.m.rotation.x+=dt*14;
  if(k>=1){W.group.remove(s.m);W.shots.splice(i,1);burst(s.to,0xc88a40,8,3,0.7);if(s.mk&&s.mk.active())s.mk.onHit();else SFX.knock();}}}
/* RT Йоши — ковшик: у сломанного мёртвая вода (сращивает), везде — живая (оживляет) */
function ladle(h){SFX.water();const fx=Math.sin(h.face),fz=Math.cos(h.face);let tgt=null,bd=3.0;
  for(const w of W.waterTargets){if(!w.active())continue;const d=hd(h.pos,w.pos)-(w.pri||0);if(d<bd){bd=d;tgt=w;}}
  if(!tgt)for(const e of W.enemies){if(!e.alive||!(e.sat>0))continue;const d=hd(h.pos,e.pos);if(d<3.2&&d<bd){bd=d;tgt={pos:e.pos,onWater:()=>{if(!e.alive)return;e.sat=0;emberOut(e,1,'Живая вода!');floatText(e.pos.clone().add(new V3(0,2.4,0)),'Погасил сытого!','#9fe6ff');}};}}
  if(!tgt&&W.ladleHeals){const p=players[h.player];if(p.petals<3&&G.time-(h.healT||-99)>5){h.healT=G.time;later(0.4,()=>{p.petals=Math.min(3,p.petals+1);floatText(h.pos.clone().add(new V3(0,h.d.height+0.8,0)),'+лепесток','#ff9ab8');});}}
  const at=tgt?tgt.pos.clone():h.pos.clone().add(new V3(fx*1.5,0,fz*1.5));if(tgt)h.face=Math.atan2(at.x-h.pos.x,at.z-h.pos.z);
  const f2=Math.sin(h.face),z2=Math.cos(h.face);
  for(let i=0;i<12;i++){const m=new THREE.Mesh(FXGEO,MB(0x7ad8ff,{transparent:true}));m.scale.setScalar(0.7);m.position.set(h.pos.x+f2*0.35,h.pos.y+0.55,h.pos.z+z2*0.35);W.group.add(m);
    const v=new V3(at.x-m.position.x,0,at.z-m.position.z).multiplyScalar(1.5).add(new V3(rand(-0.5,0.5),rand(3,4.4),rand(-0.5,0.5)));W.fx.push({m,v,t:0,life:0.62});}
  floatText(h.pos.clone().add(new V3(0,h.d.height+0.5,0)),'Живая вода!','#9fe6ff');
  if(tgt)later(0.35,()=>tgt.onWater(h));else later(0.45,()=>{const g=groundAt(at.x,at.z,h.pos.y+1.5);if(g.y>h.pos.y-1.5)flower(at.x,g.y,at.z);});}
function heroAttack(h,range,arcDot){ // перебирает ТОЛЬКО мороков — задеть другого героя невозможно
  const fx=Math.sin(h.face),fz=Math.cos(h.face);let any=false;
  const air=!h.grounded&&h.vel.y<0;
  for(const e of W.enemies){if(!e.alive||e.state==='hide')continue;const dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z,d=Math.hypot(dx,dz);if(d>range+e.r||Math.abs(h.pos.y-e.pos.y)>2.6)continue;if(d>0.9&&(dx*fx+dz*fz)/d<arcDot)continue;enemyHit(e,h,air&&h.pos.y>e.pos.y+0.6);any=true;}
  for(const t of W.hittables){if(!t.alive())continue;if(hd(t.pos,h.pos)>range+t.r)continue;t.onHit(h);any=true;}
  return any;}

