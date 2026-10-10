//@@
// ромбик «это ты» (движок, heroMarker): цвета игрока, только над героем, которым управляет человек; горит 2,5 с в начале уровня,
// после ролика, смены героя и переноса, и после 5 с без дела; потом тает. Над запасными героями и героем помощника (соло) — ничего; в мире 1 — 4 с / 3 с.
window.ERR=[];window.addEventListener('error',e=>ERR.push(String(e.message)));{const ce=console.error;console.error=(...a)=>{ERR.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};
window.HS=()=>Object.values(ZC.HERO);window.vis=()=>HS().filter(h=>h.marker.visible).map(h=>h.kind).sort().join(',');
window.move=(n)=>{for(let i=0;i<n;i++){HS().forEach(h=>{h.mkIdle=0;});ZC.tick(1);}};   // «игрок не стоит без дела»
ZC.setSolo(false);ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(10);for(let k=0;k<4&&ZC.G.cine;k++){ZC.skip();ZC.tick(10);}ZC.tick(5);
const P=ZC.players,a0=P[0].heroes[P[0].act],a1=P[1].heroes[P[1].act],o0=P[0].heroes[1-P[0].act];
chk(ZC.W.markShow===undefined,'вне мира 1 сроки по умолчанию');
chk(a0.marker.visible&&a1.marker.visible&&!o0.marker.visible,'после ролика: ромбики над двумя активными, над запасным нет: '+vis());
chk(a0.marker.geometry.type==='ConeGeometry'&&a0.markerMat.color.getHex()===o0.markerMat.color.getHex()&&a0.markerMat.color.getHex()!==a1.markerMat.color.getHex(),'ромбик, цвет игрока');
const r=['start: '+vis()];
// в начале уровня горит, потом тает
move(60*3.5);chk(vis()==='','через 3,5 с в движении ромбиков нет: '+vis());r.push('3.5s: '+vis());
// смена героя: загорается над новым героем игрока 1
ZC.press('KeyQ');ZC.tick(3);const b0=P[0].heroes[P[0].act];chk(b0!==a0&&b0.marker.visible&&!a0.marker.visible,'смена героя: ромбик над новым героем: '+vis());r.push('swap: '+vis());
move(60*3.5);chk(vis()==='','и снова погас: '+vis());
// перенос (упал — вернули на тропу): загорается
b0.pos.x+=6;ZC.tick(2);chk(b0.marker.visible,'перенос героя — ромбик горит: '+vis());r.push('teleport: '+vis());
move(60*3.5);
// без дела 5 с — загорается и горит, пока стоят
ZC.tick(60*4.5);chk(vis()==='','4,5 с без дела — ещё нет: '+vis());ZC.tick(60*1);chk(b0.marker.visible&&a1.marker.visible,'5 с без дела — ромбики горят: '+vis());r.push('idle: '+vis());
r.concat(BAD)
//@@
// одиночная игра: ромбик только над своим героем, над героем помощника — нет
ZC.setSolo(true);ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(10);for(let k=0;k<4&&ZC.G.cine;k++){ZC.skip();ZC.tick(10);}ZC.tick(5);
const P=ZC.players,me=P[ZC.G.soloPi].heroes[P[ZC.G.soloPi].act],bot=P[1-ZC.G.soloPi].heroes[P[1-ZC.G.soloPi].act];
chk(me.marker.visible&&!bot.marker.visible,'соло: ромбик только над своим: '+vis());
['solo: '+vis()].concat(BAD)
//@@
BAD.length||ERR.length?'FAIL '+BAD.join(' ; ')+' errs='+ERR.slice(0,3).join(' | '):'marker ok'
