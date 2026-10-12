//@@
// 4-2 (docs/39, 42.1–42.3): ящерки плюют по одной, перед плевком 1,2 с светятся; на Ёжике плевок не сбивает Йошу с корки;
// пока корка в клещах над лавой — контур, куда она ляжет; Йоша внизу лавопада — Потап заканчивает счёт фразой и аккордом.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
ZC.startFrom(ZC.LV('4-2'));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.tick(2);
window.W=ZC.W;window.H=ZC.HERO;window.K=W.k42;const F=W.flags,Y=H.yosha;
// Йоша на корке посреди ручья — обе ящерки берега его видят
U.walkTo(1,0,-1.6,3);Y.face=Math.PI;ZC.tick(2);U.tap('KeyL');ZC.tick(40);U.walkTo(1,0,-3.8,3);
const sp=K.spitters.filter(s=>s.cond());let both=0,ch=0,minCh=9,n0=K.SPT.n||0;
for(let i=0;i<60*9;i++){ZC.tick(1);const g=sp.filter(s=>s.mat.emissiveIntensity>1).length;both=Math.max(both,g);
  if((K.SPT.n||0)>n0){n0=K.SPT.n;ch++;minCh=Math.min(minCh,K.SPT.charge);}}
chk(sp.length===2,'ящерок у ручья не две: '+sp.length);chk(ch>=1,'ни одного плевка');chk(both<=1,'светятся сразу две ящерки');chk(minCh>=1.1,'свечение перед плевком короче 1,2 с: '+minCh.toFixed(2));
'spit ok charges='+ch+' minCharge='+minCh.toFixed(2)+' hits='+(F.spitHits||0)
//@@
// Ёжик: плевок отнимает у корки время, но Йошу не сбивает
ZC.players[0].path='easy';ZC.players[1].path='easy';const F=W.flags,Y=H.yosha;
U.walkTo(1,0,-1.6,3);Y.face=Math.PI;ZC.tick(2);U.tap('KeyL');ZC.tick(40);U.walkTo(1,0,-3.8,3);
const h0=F.spitHits||0;let knock=false;for(let i=0;i<60*12&&(F.spitHits||0)===h0;i++){ZC.tick(1);if(Y.knockT>0)knock=true;}
chk((F.spitHits||0)>h0,'Ёжик: плевок не попал (нечем проверить)');chk(!knock,'Ёжик: плевок сбил Йошу');
ZC.players[0].path='mid';ZC.players[1].path='mid';'easy ok knock='+knock
//@@
// контур корки: Прошка несёт корку из заводи к струе — рамка на лаве
const F=W.flags,Y=H.yosha,P=H.proshka;W.enemies.forEach(e=>{e.cd=1e9;});K.spitters.forEach(s=>{s.down=99;});
P.pos.set(0,0,-8.5);P.vel.set(0,0,0);Y.pos.set(1.6,0,-8.6);Y.vel.set(0,0,0);ZC.tick(3);
U.walkTo(1,2.5,-9.5,3);Y.face=Math.PI/2;ZC.tick(2);while(Y.skillCd>0)ZC.tick(1);U.tap('KeyL');ZC.tick(40);
U.walkTo(0,2.2,-10.4,3);P.face=Math.atan2(1.8,0.9);U.tap('KeyR');ZC.tick(3);
chk(P.carry&&P.carry.kind==='korka','корка не взята: P='+U.st()+' hots='+W.hots.filter(i=>i.kind==='korka'&&!i.gone).map(i=>i.pos.x.toFixed(1)+','+i.pos.z.toFixed(1)).join(' '));
U.walkTo(0,0,-12.5,3);P.face=Math.PI;P.vel.set(0,0,0);ZC.tick(3);chk(K.ghosts()>=1,'нет контура корки над лавой');
U.tap('KeyR');ZC.tick(30);chk(K.ghosts()===0,'контур остался после броска');'ghost ok'
//@@
// лавопад: Йоша внизу — Потап заканчивает счёт фразой
const F=W.flags,Y=H.yosha;F.stage='fall';F.cnt=3;F.cntT=0;Y.pos.set(2.2,-1.6,-57.4);Y.vel.set(0,0,0);ZC.tick(60*3);
chk(F.t1told,'Йоша внизу не засчитан: y='+Y.pos.y.toFixed(2)+' z='+Y.pos.z.toFixed(2));chk(F.cntEnd,'счёт Потапа без конца');
const e=ZC.FIN.vox.find('potap','Всё. Внизу. Дошёл, Йоша!');chk(e&&e.dur>0.5,'нет записи конца счёта');'count ok'
//@@
const ok=!BAD.length&&!_errs.length;(ok?'tfin_w42 ok':'FAIL tfin_w42 '+BAD.join(' | ')+' errs='+_errs.join(' | '))
