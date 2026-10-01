//@@
// Лукоморье: карта-рушник — эпилог в списке Острова Буяна последним, после «5-Б2 · Кощей Бессмертный и Златая цепь».
// До победы над Кощеем — под замком (подсказка), после — открыт, выбирается и уносит в эпилог. В релизе стан дальше от дуба (W.shoreDZ).
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();window.pk={};
ZC.startFrom(ZC.LV('5-B2'));ZC.G.manual=true;ZC.tick(5);const G=ZC.G;for(const id of['5-1','5-2','5-3','5-4','5-B1'])G.done[id]=true;G.done['5-B2']=false;ZC.goLevel('luko');ZC.tick(120);
for(let i=0;i<4&&G.cine;i++){ZC.skip();ZC.tick(20);}ZC.tick(30);['lv='+ZC.W.levelId,'mode='+ZC.W.flags.mode,'stage='+ZC.W.flags.stage,'cine='+!!G.cine]
//@@ shot=lukoepi_lock.png
// до финала: эпилог в списке Буяна последним, под замком
const G=ZC.G;const r=[];const dz=ZC.W.shoreDZ||0;r.push(U.walkTo(0,-2,-17.8-dz,8));U.tap('Space');ZC.tick(10);r.push('ui='+G.ui);
const rows=[...document.querySelectorAll('#mapui .lv')].map(e=>e.innerText.replace(/\n/g,' '));pk.n=rows.length;pk.last=rows[rows.length-1]||'';pk.prev=rows[rows.length-2]||'';
pk.lockedMark=/^🔒/.test(pk.last);pk.world=(document.querySelector('#mapui .worlds .on')||{}).textContent||'';r.push('world='+pk.world,'rows='+rows.join(' | '));r
//@@
// выбрать эпилог под замком — подсказка, никуда не летим
const G=ZC.G;const rows=[...document.querySelectorAll('#mapui .lv')];for(let i=0;i<12&&!rows[rows.length-1].classList.contains('sel');i++){U.tap('ArrowDown');U.tap('KeyS');ZC.tick(2);break;}
let n=0;while(!document.querySelectorAll('#mapui .lv')[rows.length-1].classList.contains('sel')&&n<12){U.tap('KeyS');ZC.tick(2);n++;}U.tap('Space');ZC.tick(30);pk.lockStay=ZC.W.levelId==='luko'&&G.ui==='map';U.tap('KeyG');ZC.tick(5);['stay='+pk.lockStay,'ui='+G.ui]
//@@ shot=lukoepi_open.png
// после финала: открыт, выбран по умолчанию (всё остальное пройдено)
const G=ZC.G;G.done['5-B2']=true;const r=[];const dz=ZC.W.shoreDZ||0;r.push(U.walkTo(0,-2,-17.8-dz,8));U.tap('Space');ZC.tick(10);const rows=[...document.querySelectorAll('#mapui .lv')];const last=rows[rows.length-1];
pk.openLast=last.innerText.replace(/\n/g,' ');pk.selDefault=last.classList.contains('sel');pk.unlocked=!last.classList.contains('lock');r.push('ui='+G.ui,'last='+pk.openLast,'sel='+pk.selDefault);r
//@@
// в путь — полёт с рушника к Буяну и эпилог
const G=ZC.G;U.tap('Space');let n=0;while(ZC.W.levelId==='luko'&&n<60*8){ZC.tick(1);n++;}ZC.tick(30);pk.lv=ZC.W.levelId;pk.stage=ZC.W.flags.stage;
const ok=/5-Б2/.test(pk.prev)&&/Эпилог/.test(pk.last)&&pk.lockedMark&&/Буян/.test(pk.world)&&pk.lockStay&&pk.selDefault&&pk.unlocked&&/театр теней/.test(pk.openLast)&&pk.lv==='epi';
[JSON.stringify(pk),ok?'lukoepi ok':'FAIL lukoepi']
