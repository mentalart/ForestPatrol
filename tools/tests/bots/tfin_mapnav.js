//@@
// Карта-рушник: одно нажатие — один шаг. Миры (← →) и уровни (↑ ↓) не перескакивают через один — ни вдвоём, ни в одиночном режиме,
// ни с напарником-ботом (раньше бот повторял нажатие человека на карте, а карта слушает обоих игроков — шаг выходил двойной).
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();window.pk={};
window.rows=()=>[...document.querySelectorAll('#mapui .lv')];
window.wnum=()=>{const e=document.querySelector('#mapui .worlds .on');return e?parseInt(e.textContent,10):0;};
window.selIdx=()=>rows().findIndex(e=>e.classList.contains('sel'));
window.openMap=()=>{const dz=ZC.W.shoreDZ||0;const w=U.walkTo(0,-2,-17.8-dz,8);U.tap('Space');ZC.tick(10);return w;};
// клавиши подряд: после каждой — номер мира (W) или номер выбранной строки (U)
window.seqW=ks=>{const o=[wnum()];for(const k of ks){U.tap(k);ZC.tick(2);o.push(wnum());}return o.join(',');};
window.seqU=ks=>{const o=[selIdx()];for(const k of ks){U.tap(k);ZC.tick(2);o.push(selIdx());}return o.join(',');};
window.CO=ZC.FIN.co;
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(5);const G=ZC.G;ZC.goLevel('luko');
ZC.tick(120);for(let i=0;i<4&&G.cine;i++){ZC.skip();ZC.tick(20);}ZC.tick(30);
Object.assign(G.flags,{voiceDone:true,w2intro:true,w2done:true,w3intro:true,w3done:true,w4intro:true,w4done:true,w5intro:true});
['lv='+ZC.W.levelId,'cine='+!!G.cine]
//@@
// вдвоём: карта открывается на 5-м мире; D D D — дальше некуда, A A — два мира назад; S S S W W — по уровню за нажатие; стрелки второго игрока — так же
const G=ZC.G;const r=[openMap(),'ui='+G.ui,'solo='+!!G.solo,'bot='+CO.on];
pk.pairW=seqW(['KeyD','KeyD','KeyD','KeyA','KeyA']);pk.pairU=seqU(['KeyS','KeyS','KeyS','KeyW','KeyW']);pk.pairA=seqW(['ArrowRight','ArrowRight','ArrowLeft']);
U.tap('KeyG');ZC.tick(3);r.push('pairW='+pk.pairW,'pairU='+pk.pairU,'pairA='+pk.pairA,'closed='+(G.ui===null));r
//@@
// один: любая половина клавиатуры, шаг один
const G=ZC.G;ZC.setSolo(true);ZC.tick(2);const r=[openMap(),'solo='+!!G.solo,'ui='+G.ui];
pk.soloW=seqW(['KeyD','ArrowRight','KeyD','ArrowLeft','KeyA']);pk.soloU=seqU(['KeyS','ArrowDown','KeyW']);
U.tap('KeyG');ZC.tick(3);r.push('soloW='+pk.soloW,'soloU='+pk.soloU,'closed='+(G.ui===null));r
//@@
// с напарником: бот на карте молчит — нажатие человека даёт один шаг (миры и уровни)
const G=ZC.G;CO.set(true);ZC.tick(5);const r=[openMap(),'solo='+!!G.solo,'bot='+CO.on,'ui='+G.ui];
pk.cmpW=seqW(['KeyA','KeyA','KeyD','KeyA','KeyD','KeyD']);pk.cmpU=seqU(['KeyS','KeyS','KeyW','KeyS']);
r.push('cmpW='+pk.cmpW,'cmpU='+pk.cmpU);r
//@@
// с напарником: «в путь» на первом уровне 5-го мира — карта закрывается, полёт один, бот не мешает
const G=ZC.G;U.tap('KeyW');U.tap('KeyW');ZC.tick(2);const w=wnum();const sel=selIdx();U.tap('Space');ZC.tick(2);const r=['w='+w,'sel='+sel,'ui='+G.ui];
let n=0;while(ZC.W.levelId==='luko'&&n<60*10){ZC.tick(1);n++;if(G.cine)ZC.skip();}ZC.tick(60);r.push('lv='+ZC.W.levelId,'errs='+(window._errs||[]).length);
const ok=pk.pairW==='5,5,5,5,4,3'&&pk.pairU==='0,1,2,3,2,1'&&pk.pairA==='3,4,5,4'
  &&pk.soloW==='5,5,5,5,4,3'&&pk.soloU==='0,1,2,1'
  &&pk.cmpW==='5,4,3,4,3,4,5'&&pk.cmpU==='0,1,2,1,2'&&w===5&&sel===0&&ZC.W.levelId==='5-1'&&!window._errs.length;
r.concat([JSON.stringify(pk),ok?'tfin_mapnav ok':'FAIL tfin_mapnav'])
