//@@
// релиз final06: Лукоморье с напарником-ботом: бот идёт за человеком, пока тот идёт к стану с рушником; на карте повторяет его нажатия;
// человек выбирает 1-1 и летит — бот летит с ним, ошибок нет.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.bot=()=>U.act(1);window.me=()=>U.act(0);
ZC.startFrom(ZC.LV('luko'));ZC.G.manual=true;ZC.tick(5);CO.set(true);CO.skill=1;const G=ZC.G;
ZC.tick(120);for(let i=0;i<6&&G.cine;i++){ZC.skip();ZC.tick(20);}ZC.tick(30);['lv='+ZC.W.levelId,'cine='+!!G.cine,'mode='+CO.mode]
//@@
// к стану с рушником: человек идёт, бот следом; прыжок — рушник раскатывается (ролик, бот держит прыжок вместе с человеком) и карта; полёт в 1-1
const dz=ZC.W.shoreDZ||0;const w=U.walkTo(0,-2,-17.8-dz,10);const d0=Math.hypot(me().pos.x-bot().pos.x,me().pos.z-bot().pos.z);U.tap('Space');
const seen=new Set();for(let i=0;i<60*20&&ZC.W.levelId==='luko';i++){if(ZC.G.cine)ZC.skip();ZC.tick(1);if(i%10===0)seen.add(CO.mode);if(ZC.G.ui==='map'||ZC.G.ui)U.tap('Space');}
ZC.tick(120);for(let i=0;i<6&&ZC.G.cine;i++){ZC.skip();ZC.tick(20);}ZC.tick(40);
['walk '+w,'dist='+d0.toFixed(1),'modes='+[...seen].join('/'),'lv='+ZC.W.levelId,'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''),(ZC.W.levelId==='1-1'&&!_errs.length&&d0<8)?'luko ok':'FAIL luko']
