//@@
// Лукоморье после финала: итоговое меню, Кощей по концовке, Застава
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('epi'));ZC.G.manual=true;ZC.tick(5);const G=ZC.G;G.flags.showFinal=true;ZC.goLevel('luko');ZC.tick(200);
const r=['lv='+ZC.W.levelId,'state='+G.state,'mode='+ZC.W.flags.mode];r.push(document.querySelector('#card h2')?document.querySelector('#card h2').textContent:'-');r
//@@ shot=hw5e.png
ZC.tick(1);
//@@
const G=ZC.G;const r=[];ZC.menu&&0;document.getElementById('menu').classList.add('hide');G.state='play';ZC.tick(30);
r.push(U.walkTo(0,-16.8,6.4,10));U.tap('KeyF');ZC.tick(10);r.push('ui='+G.ui,document.getElementById('mapui').textContent.slice(0,200));r
//@@ shot=hw5f.png
ZC.tick(1);
//@@
const G=ZC.G;const r=[];U.tap('Space');ZC.tick(120);r.push('lv='+ZC.W.levelId,'bellsSpent='+G.bellsSpent);r
