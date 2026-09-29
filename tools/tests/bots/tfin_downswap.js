//@@
// релиз final05: рассыпался клубком — «Смена» сразу даёт второго своего героя; клубок подшивает герой друга или он сам собирается через 10 с;
// на клубок не переключиться, урон ему не страшен; одиночный режим — к любому целому герою.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]).slice(0,160));ce(...a);};}
window.kill=pi=>{const P=ZC.players[pi],h=P.heroes[P.act];P.petals=1;h.iT=0;return ZC.FIN.dbgDamage?0:0;};
window.hitHero=(h)=>{const src={kind:'enemy',ref:{pos:h.pos.clone().add(new THREE.Vector3(1,0,0)),kind:'x'}};h.iT=0;return src;};
ZC.setSolo(false);ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(30);for(let k=0;k<3&&ZC.G.cine;k++){ZC.skip();ZC.tick(10);}ZC.tick(20);
const P=ZC.players,p0=P[0],h0=p0.heroes[p0.act],o0=p0.heroes[1-p0.act];
// смерть: лепестки до нуля (как в прототипе — через урон)
p0.petals=0;p0.downed=true;p0.downT=10;p0.revT=0;ZC.tick(5);const r=['downed='+p0.downed+' hero='+h0.kind];
ZC.press('KeyQ');ZC.tick(3);const a=p0.heroes[p0.act];
r.push('after swap: active='+a.kind+' downed='+p0.downed+' petals='+p0.petals+' yarn='+(h0._down?'on':'off')+' bodyVis='+h0.body.visible+' yarnVis='+h0.yarn.visible);
// обратно на клубок нельзя
ZC.press('KeyQ');ZC.tick(3);r.push('swap back blocked: active='+p0.heroes[p0.act].kind);
// клубок не двигается и не получает урон
const pos=h0.pos.clone();ZC.tick(60);r.push('yarn still='+(h0.pos.distanceTo(pos)<0.05));r
//@@
// подшивает герой друга
const P=ZC.players,p0=P[0],h0=p0.heroes.find(h=>h._down),f=P[1].heroes[P[1].act];f.pos.set(h0.pos.x+0.8,h0.pos.y,h0.pos.z);f.vel.set(0,0,0);ZC.tick(80);
const r=['revived by friend='+!h0._down+' bodyVis='+h0.body.visible];ZC.press('KeyQ');ZC.tick(3);r.push('swap to revived: active='+p0.heroes[p0.act].kind);r
//@@
// оба своих героя — клубки: подсказка, смены нет; через 10 с клубок сам у колокольчика
const P=ZC.players,p0=P[0];const a=p0.heroes[p0.act];ZC.press('KeyQ');ZC.tick(3);const b=p0.heroes[p0.act];
p0.petals=0;p0.downed=true;p0.downT=10;ZC.press('KeyQ');ZC.tick(3);const c=p0.heroes[p0.act];const first=p0.heroes.find(h=>h._down);
p0.petals=0;p0.downed=true;p0.downT=10;ZC.press('KeyQ');ZC.tick(3);const r=['both down: active stays '+c.kind+' → '+p0.heroes[p0.act].kind+', downed='+p0.downed];
ZC.tick(60*11);r.push('timer: yarn gone='+!first._down+' player downed='+p0.downed);r
//@@
// одиночный режим: свой второй герой, потом — герои второго игрока
ZC.setSolo(true);ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(30);for(let k=0;k<3&&ZC.G.cine;k++){ZC.skip();ZC.tick(10);}ZC.tick(20);
const P=ZC.players,pi=ZC.G.soloPi,p=P[pi];const r=['solo pi='+pi+' active='+p.heroes[p.act].kind];p.petals=0;p.downed=true;p.downT=10;ZC.press('KeyQ');ZC.tick(3);
r.push('solo swap 1: pi='+ZC.G.soloPi+' active='+P[ZC.G.soloPi].heroes[P[ZC.G.soloPi].act].kind+' downed='+p.downed);
const q=P[ZC.G.soloPi];q.petals=0;q.downed=true;q.downT=10;ZC.press('KeyQ');ZC.tick(3);r.push('solo swap 2: pi='+ZC.G.soloPi+' active='+P[ZC.G.soloPi].heroes[P[ZC.G.soloPi].act].kind);
ZC.setSolo(false);r.push('errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:''));r
