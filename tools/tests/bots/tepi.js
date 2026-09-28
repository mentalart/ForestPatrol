//@@
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('epi'));ZC.G.manual=true;ZC.G.flags.ending=['ushel','slushat'];ZC.tick(60*12);const W=ZC.W,F=W.flags;const r=[W.name,'stage='+F.stage,'cine='+!!ZC.G.cine];r
//@@ shot=ep1.png
ZC.tick(1);
//@@
const W=ZC.W,F=W.flags;const r=[];ZC.skip();ZC.tick(10);r.push('stage='+F.stage);for(let i=0;i<5;i++){U.tap('KeyM');ZC.tick(40);}r.push('shI?');r
//@@ shot=ep2.png
ZC.tick(1);
//@@
const W=ZC.W,F=W.flags;const r=[];ZC.tick(200);r.push('stage='+F.stage,'cine='+!!ZC.G.cine);ZC.tick(60*8);r.push('e2');r
//@@ shot=ep3.png
ZC.tick(1);
//@@
const W=ZC.W,F=W.flags;const r=[];ZC.skip();ZC.tick(20);r.push('stage='+F.stage);ZC.tick(60*14);r.push('e3?',F.stage,'ui='+ZC.G.ui);ZC.skip();ZC.tick(30);r.push('ui='+ZC.G.ui,document.getElementById('mapui').textContent.slice(0,80));r
//@@ shot=ep4.png
ZC.tick(1);
//@@
const r=[];for(let i=0;i<14;i++){U.tap('Space');ZC.tick(60);r.push((ZC.G.ui||'-')+':'+document.getElementById('mapui').textContent.slice(0,40));if(ZC.W.levelId!=='epi')break;}ZC.tick(200);r.push('lv='+ZC.W.levelId,'state='+ZC.G.state);r
