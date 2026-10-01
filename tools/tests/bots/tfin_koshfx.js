//@@
// релиз final06: 5-Б2 — правки по отзыву: цепи видны в карточке этапа 1 («Цепи и красный круг»), свечей восемь и цепей вдвое больше,
// удар в красный круг — молния, сигнал замаха Кощея — на груди (виден игровой камерой), ключ появляется над Кощеем, падает на героя
// и разворачивается в путы; скован, пока друг не собьёт замок пятью ударами (пять шариков); скованы все четверо — этап заново.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=99;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.K5=ZC.FIN.k5;window.A=pi=>ZC.players[pi].heroes[ZC.players[pi].act];window.O=ZC.FIN.occ;O.fdt=0.05;window.H=ZC.HERO;
window.gsync=()=>{const gl=O.dbg.renderer.getContext(),b=new Uint8Array(4);gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,b);};
window.skipAll=(n)=>{for(let i=0;i<(n||6);i++){if(ZC.G.cine){ZC.skip();ZC.tick(3);}else break;}};
window.untilT=t=>{let n=0;while(ZC.G.cine&&ZC.G.cine.t<t&&n<60*40){ZC.tick(1);n++;}O.frame();gsync();return ZC.G.cine?ZC.G.cine.t.toFixed(1):'end';};
window.locked=()=>Object.keys(K5.locks).join(',');window.pk={};
ZC.startFrom(ZC.LV('5-B2'));ZC.G.manual=true;ZC.G.flags.tut5b=null;ZC.tick(20);ZC.skip();ZC.tick(5);
['lvl='+ZC.W.levelId,'st='+K5.st,'cine='+!!ZC.G.cine,'candles='+K5.candles.length]
//@@ shot=fin_k5_tut_chains.png wait=300
// карточка «Цепи и красный круг»: цепи вылезли перед героями и видны
const t=untilT(30.6);const ch=ZC.W.enemies.filter(e=>e.kind==='cep'&&e.k5demo&&e.g.visible&&e.pos.y>-0.3);pk.tutChains=ch.length;['t='+t,'demo chains up='+ch.length]
//@@ shot=fin_k5_tut_bolt.png wait=300
// там же — молния в красный круг (кувырок или ожидание)
ZC.press('ShiftLeft');let n=0;while(ZC.G.cine&&n<60*3&&!(K5.zones||[]).length){ZC.tick(1);n++;}n=0;while((K5.zones||[]).length&&n<60*3){ZC.tick(1);n++;}ZC.tick(4);O.frame();gsync();'bolt'
//@@
// конец карточек: показ цепей убран; этап 1 — восемь свечей горят, цепей до четырёх
skipAll(8);ZC.tick(5);const demo=ZC.W.enemies.filter(e=>e.k5demo).length;pk.demoLeft=demo;const lit=K5.candles.filter(c=>c.lit).length;pk.lit=lit;
for(const pi of[0,1]){const p=ZC.players[pi];p.petals=99;}let n=0,mx=0;while(n<60*8){ZC.tick(1);n++;mx=Math.max(mx,ZC.W.enemies.filter(e=>e.kind==='cep'&&e.k5chain&&!e.k5demo&&e.g.visible).length);}pk.chains=mx;
['fight='+K5.fight,'st='+K5.st,'demo left='+demo,'lit='+lit+'/'+K5.candles.length,'max chains='+mx,'log='+K5.log.filter(x=>/lose/.test(x)).join(',')]
//@@ shot=fin_k5_bolt.png wait=300
// молния в красный круг (в бою этапа 1): перед героями
const h=A(0),p=h.pos.clone().add(new THREE.Vector3(1.4,0,-2.2));ZC.FIN.k5bolt(p);ZC.tick(4);O.frame();gsync();pk.bolt=ZC.W.group.children.filter(o=>o.isGroup&&o.children.some(c=>c.userData&&c.userData.seg&&c.visible)).length;'bolt groups='+pk.bolt
//@@ shot=fin_k5_s2_wind.png wait=300
// этап 2: сигнал замаха — на груди Кощея (виден игровой камерой)
K5.seen[2]=true;K5.stageStart(2);ZC.tick(3);skipAll(4);ZC.tick(5);const kb=K5.KB;let n=0;while(kb.state!=='wind'&&n<60*12){ZC.tick(1);n++;}ZC.tick(8);O.frame();gsync();
const sy=kb.S.sig.getWorldPosition(new THREE.Vector3()).y;pk.sigY=sy;['kb='+kb.state,'sig='+kb.sig,'sigY='+sy.toFixed(2)]
//@@ shot=fin_k5_key_fly.png wait=300
// ключ: появляется над Кощеем, летит поверху (не сквозь Кощея)
for(const e of ZC.W.enemies.filter(e=>e.kind==='k5key'))K5.adds.includes(e)&&(e.alive=false);K5.KB.state='k5wait';const tg=A(1);const key=K5.keyMake(tg);window.KEY=key;const y0=key.pos.y;let minY=99,n=0;
while(key.state==='k5fly'&&n<60*4){ZC.tick(1);n++;const kp=key.L.body.getWorldPosition(new THREE.Vector3());if(Math.hypot(kp.x-K5.KS.g.position.x,kp.z-K5.KS.g.position.z)<1.2)minY=Math.min(minY,kp.y);if(n===24){O.frame();gsync();}}
pk.keyOverKos=minY;['y0='+y0.toFixed(1),'minY near Koschei='+(minY===99?'-':minY.toFixed(1)),'state='+key.state]
//@@ shot=fin_k5_key_hover.png wait=300
// зависает над героем остриём вниз
let n=0;while(KEY.alive&&KEY.state!=='wind'&&n<60*3){ZC.tick(1);n++;}ZC.tick(6);O.frame();gsync();const bp=KEY.L.body.getWorldPosition(new THREE.Vector3()),h=A(1);pk.hover=bp.y-h.pos.y;
['key='+KEY.state,'above hero='+(bp.y-h.pos.y).toFixed(2),'dxz='+Math.hypot(bp.x-h.pos.x,bp.z-h.pos.z).toFixed(2)]
//@@ shot=fin_k5_bound.png wait=300
// не отбили — ключ падает и разворачивается в путы
let n=0;while(KEY.alive&&n<60*4){ZC.tick(1);n++;}ZC.tick(40);O.frame();gsync();const h=A(1);pk.boundKind=h.kind;pk.bound=!!K5.locks[h.kind];['locked='+locked(),'key alive='+KEY.alive]
//@@
// скован бессрочно: через 15 с — всё ещё; 4 удара — держит (шарики 1), 5-й — свободен
ZC.tick(60*15);const L=K5.locks[pk.boundKind];pk.after15=!!L;const r=['after 15s='+!!L];if(L){const f=A(0);for(let i=0;i<4;i++){f.pos.set(L.h.pos.x+1,L.h.pos.y,L.h.pos.z);ZC.W.onAttack(0,f);ZC.tick(3);}
  pk.hp4=L.hp;pk.pipsLit=L.pips.filter(m=>m.material.emissiveIntensity>0).length;r.push('after4 hp='+L.hp+' pipsLit='+pk.pipsLit+' still='+!!K5.locks[pk.boundKind]);ZC.W.onAttack(0,f);ZC.tick(3);pk.freed=!K5.locks[pk.boundKind];r.push('freed='+pk.freed);}r
//@@ shot=fin_k5_bound_pad.png wait=300
// кадр пут крупно: Потап скован (для просмотра)
K5.lockHero(H.potap);ZC.tick(50);const L=K5.locks.potap;O.frame();gsync();['potap locked='+!!L]
//@@
// скованы все четверо — «пали», этап заново (у колокольчика)
const r=[];for(const k of['proshka','pelageya','yosha'])K5.lockHero(H[k]);const n0=K5.log.filter(x=>x==='allLocked').length;ZC.tick(5);pk.allLocked=K5.log.filter(x=>x==='allLocked').length>n0;
r.push('allLocked='+pk.allLocked,'fight='+K5.fight);let n=0;while(!K5.fight&&n<60*10){if(ZC.G.cine){ZC.skip();}ZC.tick(3);n++;}pk.restart=K5.fight&&K5.st===2&&!Object.keys(K5.locks).length;r.push('restart st='+K5.st+' fight='+K5.fight+' locks='+locked());r
//@@
const ok=pk.bolt>=1&&pk.tutChains>=3&&pk.demoLeft===0&&pk.lit===8&&pk.chains>=3&&pk.sigY<3.6&&pk.keyOverKos>4&&pk.hover>2&&pk.bound&&pk.after15&&pk.hp4===1&&pk.pipsLit===1&&pk.freed&&pk.allLocked&&pk.restart;
[JSON.stringify(pk),'errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:''),ok&&!window._errs.length?'koshfx ok':'FAIL koshfx']
