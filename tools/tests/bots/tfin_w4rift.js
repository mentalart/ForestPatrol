//@@
// 4-Б (docs/39, 4Б.2): после рыка у краёв арены — огненные трещины-подковы, за ними уступ с лепестком и искрами;
// в трещину не ступить (жар отталкивает), живая вода Йоши кладёт корку-мостик, с уступа выходят свободно, мостик тает.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
ZC.startFrom(ZC.LV('4-B'));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.tick(5);
window.W=ZC.W;window.H=ZC.HERO;window.RF=ZC.FIN.rift4b;const F=W.flags;
chk(!RF.open,'трещины открыты до рыка');
W.enemies.forEach(e=>{e.cd=1e9;});ZC.FIN.gor4.roared=true;F.phase=2;ZC.tick(10);U.nocine();ZC.tick(3);
chk(RF.open&&RF.sides.length===2,'после рыка трещины не открылись');
'open='+RF.open+' act='+U.act(0).kind+','+U.act(1).kind
//@@
// жар отталкивает; корка-мостик Йоши; через мостик — на уступ; назад — свободно
const S=RF.sides[0],P=U.act(0),Y=H.yosha;W.enemies.forEach(e=>{e.cd=1e9;});
P.pos.set(5.5,0,-3);P.vel.set(0,0,0);ZC.tick(3);U.walkTo(0,10.2,-3,3);ZC.tick(20);
chk(S.hits>0&&P.pos.x<8.6,'жар не оттолкнул: hits='+S.hits+' x='+P.pos.x.toFixed(2));
if(U.act(1)!==Y){U.tap('KeyK');ZC.tick(20);}Y.pos.set(6.6,0,-3);Y.vel.set(0,0,0);Y.face=Math.PI/2;ZC.tick(3);while(Y.skillCd>0)ZC.tick(1);U.tap('KeyL');ZC.tick(40);
chk(S.bridge>0,'корка-мостик не встала');
const h0=S.hits,s0=W.sparksGot||0;P.pos.set(6.6,0,-3.6);P.vel.set(0,0,0);ZC.tick(3);U.walkTo(0,10.2,-3,4);ZC.tick(30);
chk(P.pos.x>9.3,'по мостику на уступ не пройти: x='+P.pos.x.toFixed(2)+' hits='+(S.hits-h0));chk(S.gift&&(W.sparksGot||0)>s0,'подарок на уступе не взят');
const tb=S.bridge;for(let i=0;i<60*(tb+1);i++)ZC.tick(1);chk(S.bridge<=0&&!S.cr.visible,'мостик не растаял');
U.nocine();ZC.tick(3);const h1=S.hits;const wr=U.walkTo(0,5.5,-3,4);ZC.tick(10);chk(P.pos.x<7.4&&S.hits===h1,'с уступа не выйти: x='+P.pos.x.toFixed(2)+' hits='+(S.hits-h1)+' walk='+wr+' '+U.st()+' rfR='+P._rfR+' down='+ZC.players[0].downed);
'rift ok hits='+S.hits+' sparks='+(W.sparksGot||0)+' log='+RF.log.join(',')
//@@
const ok=!BAD.length&&!_errs.length;(ok?'tfin_w4rift ok':'FAIL tfin_w4rift '+BAD.join(' | ')+' errs='+_errs.join(' | '))
