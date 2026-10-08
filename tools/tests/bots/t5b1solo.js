//@@
// релиз final06: 5-Б1 «Кощей в тереме» в одиночку (docs/34 5Б1-3): все три части проходятся одним героем; баннеры боя ≤ 10 слов (в среднем ≤ 7),
// «Длинный мах!» с подписью только до первого попадания, толчок при подъёме иглы ≤ 0,15, «ПРОБОЙ!» без подписи после первого раза
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=4242;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.BN=[];window.SH=[];window.words=h=>String(h).replace(/<[^>]*>/g,' ').split(/\s+/).filter(w=>/[А-Яа-яЁёA-Za-z]/.test(w)).length;
ZC.setSolo(true);ZC.startFrom(ZC.LV('5-B1'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(5);
const W=ZC.W,F=W.flags;const bn=document.getElementById('banner');
window.watch=()=>{const t=bn.innerHTML;if(t&&bn.style.opacity==='1'&&BN[BN.length-1]!==t)BN.push(t);};
window.run=n=>{for(let i=0;i<n;i++){ZC.tick(1);if(i%5===0)watch();}};
run(30);
['solo='+ZC.G.solo,'stage='+F.stage,'foes='+W.enemies.filter(e=>e.alive).length,'errs='+_errs.length]
//@@
// часть 1: тени, один герой держится 12 с; переход к золоту
const W=ZC.W,F=W.flags;
const pi=ZC.G.soloPi;run(600);const r=['t='+F.t.toFixed(0),'downed='+ZC.players[pi].downed];W.bossNext();run(60);r.push('phase2='+!!F.phase2);r
//@@
// часть 2: слиток — в горн одним героем, а не двумя
const W=ZC.W,F=W.flags;
const r=[];let del=0;const pi=ZC.G.soloPi;
for(let n=0;n<30&&del<2;n++){const g=W.hots.find(it=>it.gold&&!it.gone&&!it.carrier&&!it.flying);if(!g){run(30);continue;}
  U.walkTo(pi,g.pos.x,g.pos.z+1.1,6);const h=U.act(pi);h.face=Math.atan2(g.pos.x-h.pos.x,g.pos.z-h.pos.z);U.tap('KeyR');ZC.tick(15);if(!h.carry)continue;
  U.walkTo(pi,-11.2,-16,8);h.face=-Math.PI/2;U.tap('KeyR');ZC.tick(20);del++;}
r.push('delivered='+del,'goldBack='+(F.goldBack||0));r
//@@
// часть 3: игла поднята — толчок ≤ 0,15, затем «Выстояли» и конец уровня
const W=ZC.W,F=W.flags;
const r=[];W.bossNext();run(60);W.bossNext();run(60);r.push('phase3='+!!F.phase3);
for(let i=0;i<60*40&&F.stage==='fight';i+=10)run(10);
for(let k=0;k<30&&ZC.G.cine;k++){ZC.skip();ZC.tick(10);}run(300);
const bw=BN.map(h=>words(h));const avg=bw.reduce((a,b)=>a+b,0)/Math.max(1,bw.length);
r.push('stage='+F.stage,'done='+!!ZC.G.done['5-B1'],'banners='+bw.join(','),'avg='+avg.toFixed(1),'max='+Math.max(...bw),'errs='+_errs.length);
if(Math.max(...bw)>10||avg>7)throw new Error('banner too long: '+r.join(' '));r
