//@@ wait=1500
// релиз final06: 1-4 — Аука-Перекличка в ОДИНОЧНОМ режиме (late_99zg_auka14.js): все «ау» песенок — одним героем (Прошкой),
// без ошибок; три песенки, ролик-дружба, ворота открыты, выход.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=31337;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
ZC.startFrom(ZC.LV('1-4'));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.setSolo(true);ZC.tick(5);ZC.FIN.warp('arena');ZC.tick(10);U.toKind('proshka');
window.A=()=>ZC.W.k14.auka;window.D=()=>A().dbg();
window.NOTE=i=>{const q=D().HL[i];for(let k=0;k<60*10;k++){if(U.step(0,q.mx,q.mz,0.5))break;ZC.tick(1);}U.rel(0);ZC.tick(2);ZC.press('Digit1');ZC.tick(6);};
U.goto(0,0,-196,5);ZC.tick(5);const c=!!ZC.G.cine;U.nocine();ZC.tick(10);
['cine='+c,'ph='+A().ph,A().ph===1?'intro ok':'FAIL intro']
//@@
const r=[];for(let s=0;s<3;s++){r.push('play '+U.until(()=>D().st==='play',25),'need='+D().need);const d=D();for(let k=0;k<d.need;k++)NOTE(D().seq[k]);ZC.tick(10);r.push('st='+D().st+' miss='+D().miss);}
r.push(U.until(()=>ZC.G.cine,6));const c=!!ZC.G.cine;U.nocine();ZC.tick(20);
r.push('ph='+A().ph,'cleared='+ZC.W.k14.arena.cleared,A().ph===4&&ZC.W.k14.arena.cleared&&D().miss===0?'songs ok':'FAIL songs ph='+A().ph+' st='+D().st);r
//@@
const u=U.goto(0,0,-220,12,0.5);ZC.tick(20);['out '+u,'out='+!!ZC.W.flags.out,'lv='+ZC.W.levelId,'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''),(ZC.W.flags.out||ZC.W.levelId!=='1-4')&&!_errs.length?'auka14solo ok':'FAIL auka14solo']
