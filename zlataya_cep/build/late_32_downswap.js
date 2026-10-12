/* ============================== РЕЛИЗ final05 · РАССЫПАЛСЯ КЛУБКОМ — ИГРАЙ ВТОРЫМ ГЕРОЕМ ============================== */
// Раньше, когда у игрока кончались лепестки, его герой становился клубком ниток и игрок ждал: 10 с или пока друг «подошьёт».
// Теперь «Смена героя» сразу даёт второго своего героя (он цел — три лепестка). Клубок остаётся лежать на месте: его подошьёт
// герой друга, простояв рядом секунду, или он сам соберётся у колокольчика через те же 10 с. На клубок переключиться нельзя, урон ему не страшен.
// Одиночный режим: «Смена» ведёт к любому целому герою (свой второй — первым, дальше герои второго игрока, как раньше).
function dsOk(h){return !!h&&!h._down&&!h.cling;}
function dsEat(pi){if(G.solo){pressed.delete(BIND[0].swap);pressed.delete(BIND[1].swap);}else pressed.delete(BIND[pi].swap);}
// клубок остаётся лежать, игрок берёт второго героя
function dsSwapOut(pi){const p=players[pi],h=active(pi),o=other(pi);
  if(!dsOk(o)||(W.noSwap&&W.noSwap(pi)))return false;
  const D={t:Math.max(1,p.downT),rev:0,cp:p.cp?{x:p.cp.x,y:p.cp.y,z:p.cp.z}:null};
  p.downed=false;p.downT=0;p.revT=0;h._down=D;doSwap(pi);
  if(active(pi)!==o){h._down=null;p.downed=true;p.downT=D.t;return false;}
  p.petals=3;h.following=false;h.vel.set(0,0,0);o.iT=Math.max(o.iT||0,1.2);
  floatText(o.pos.clone().add(new V3(0,o.d.height+0.7,0)),'Теперь я!',PCSS[pi]);
  tip(pi,'Клубок друг подошьёт — постой рядом.',3);return true;}
{const _up=updatePlayer;updatePlayer=function(pi,dt){const p=players[pi];
  if(p.downed&&!G.cine&&!G.ui&&(!G.solo||pi===G.soloPi)&&tap(pi,'swap')){
    if(dsSwapOut(pi))dsEat(pi);
    else if(!G.solo){dsEat(pi);SFX.miss();tip(pi,dsOk(other(pi))?'Сейчас другого героя не взять — погоди.':'Второй герой тоже клубочек — друг подошьёт, коль рядом постоит.',2.6);}}   // в одиночку — как раньше: к героям второго игрока
  _up(pi,dt);};}
// на клубок не переключиться
{const _ds=doSwap;doSwap=function(pi){const o=other(pi);if(o&&o._down){SFX.miss();tip(pi,'Второй герой — клубочек. Подойди, постой рядом — подошьёшь, и путь открыт!',2.6);return;}_ds(pi);};}
// одиночный режим: как в прототипе, но мимо клубков (свой второй герой — тоже можно)
soloSwap=function(){if(G._swT===G.time)return;G._swT=G.time;const pi0=G.soloPi,cur=active(pi0);if(cur.cling)return;const i=SOLO4.indexOf(cur.kind);
  for(let k=1;k<4;k++){const n=HERO[SOLO4[(i+k)%4]];if(!dsOk(n))continue;const q=n.player,pq=players[q];if(pq.downed&&q!==pi0)continue;
    if(q===pi0){if(W.noSwap&&W.noSwap(q))continue;if(pq.downed){if(dsSwapOut(q))return;continue;}
      doSwap(q);if(active(q)!==n)continue;return;}
    if(!cur._down&&!players[pi0].downed){cur.vel.x=0;cur.vel.z=0;cur.guard=false;cur.glide=false;}
    if(!n.active){if(active(q).cling||(W.noSwap&&W.noSwap(q)))continue;doSwap(q);if(active(q)!==n)continue;}
    else{G.stats.swaps++;SFX.swap();ringFx(n.pos,PCOL[q],1.6);}
    G.soloPi=q;n.following=false;n.stuck=0;return;}
  SFX.miss();tip(pi0,W.noSwapTip||'Сейчас другого героя не взять — погоди.',2.4);};
// клубок не получает урон
{const _dh=damageHero;damageHero=function(h,src){if(h&&h._down)return false;return _dh(h,src);};}
// клубок лежит, крутится; подшивают герои друга; через 10 с сам собирается у колокольчика
function dsTick(dt){for(const h of HEROES){const D=h._down;if(!D)continue;h.following=false;h.vel.x=0;h.vel.z=0;h.guard=false;
    const pi=h.player,rr=W.vest==='kit'?6:1.4,op=players[1-pi];D.t-=dt;
    const near=op.heroes.some(o=>dsOk(o)&&!(o.active&&op.downed)&&hd(o.pos,h.pos)<rr&&Math.abs(o.pos.y-h.pos.y)<(W.vest==='kit'?3:1.5));
    if(near){D.rev+=dt;if(D.rev>=1){h._down=null;h.iT=2;G.stats.revives++;SFX.ok();floatText(h.pos.clone().add(new V3(0,1.6,0)),'Подшили!','#7ee08a');continue;}}
    else D.rev=Math.max(0,D.rev-dt*0.5);
    if(D.t<=0){h._down=null;if(D.cp)placeOnGround(h,D.cp.x,D.cp.z,D.cp.y);h.iT=2;tip(pi,HNAME[h.kind]+' снова в пути — вперёд!',2.2);}}}
const HNAME={proshka:'Прошка',potap:'Потап',pelageya:'Пелагея',yosha:'Йоша'};
{const _step=step;step=function(dt){_step(dt);if(W&&!G.cine)try{dsTick(dt);}catch(e){console.error('downswap',e);}};}
{const _anim=animHero;animHero=function(h,dt){_anim(h,dt);if(h._down){h.body.visible=false;h.yarn.visible=true;h.yarn.rotation.y+=dt*2;}};}
{const _ll=loadLevel;loadLevel=function(i){for(const h of HEROES)h._down=null;_ll(i);};}
// подсказка клубку: можно взять второго героя
{const _ct=contextTip;contextTip=function(pi){const p=players[pi];if(p.downed&&dsOk(other(pi))&&!(W.noSwap&&W.noSwap(pi)))return 'Рассыпался клубком! '+K(pi,'swap')+' — вторым героем играй, а клубок друг подошьёт.';
  if(p.downed&&G.solo)return 'Рассыпался клубком! '+K(pi,'swap')+' — любого целого героя бери, и вперёд.';return _ct(pi);};}
FIN.downswap={ok:dsOk,swapOut:dsSwapOut};
// для ботов: создать врага любого вида (проверка видимости всех врагов)
FIN.dbgFoe=(kind,x,z,o)=>makeFoe(kind,x,z,o);FIN.dbgFoeKinds=()=>Object.keys(FOE);
