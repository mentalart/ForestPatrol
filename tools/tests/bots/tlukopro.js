//@@
// Лукоморье: карта-рушник — Пролог «Звенышко» в списке Дремучего леса первым. Открыт всегда; 1-1 по-прежнему открыт и выбран
// по умолчанию; карту тайников на пролог не вышить. Выбран — полёт с рушника и пролог; пролог пройден — снова Лукоморье, на карте ✓.
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();window.pk={};
window.rows=()=>[...document.querySelectorAll('#mapui .lv')];window.txt=e=>e?e.innerText.replace(/\n/g,' '):'';
window.openMap=()=>{const dz=ZC.W.shoreDZ||0;const w=U.walkTo(0,-2,-17.8-dz,8);U.tap('Space');ZC.tick(10);return w;};
ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(5);const G=ZC.G;G.flags.proDone=false;for(const id of['1-1','1-2','1-3','1-4','1-5','1-B'])G.done[id]=false;ZC.goLevel('luko');
ZC.tick(120);for(let i=0;i<4&&G.cine;i++){ZC.skip();ZC.tick(20);}ZC.tick(30);['lv='+ZC.W.levelId,'cine='+!!G.cine]
//@@ shot=lukopro_map.png
// карта: мир 1, пролог первым и открыт, 1-1 открыт и выбран
const G=ZC.G;const r=[openMap(),'ui='+G.ui];const R=rows();pk.world=(document.querySelector('#mapui .worlds .on')||{}).textContent||'';
pk.first=txt(R[0]);pk.second=txt(R[1]);pk.proOpen=R[0]&&!R[0].classList.contains('lock');pk.l11Open=R[1]&&!R[1].classList.contains('lock');pk.selDefault=R[1]&&R[1].classList.contains('sel');
r.push('world='+pk.world,'rows='+R.map(txt).join(' | '));r
//@@
// карту тайников на пролог не вышить; «в путь» — полёт к Дремучему лесу и пролог
const G=ZC.G;const gs=G.gemsSpent||0;U.tap('KeyW');ZC.tick(3);pk.proSel=rows()[0].classList.contains('sel');U.tap('KeyF');ZC.tick(3);pk.noSecret=!G.secrets['p']&&(G.gemsSpent||0)===gs;
U.tap('Space');let n=0;while((ZC.W.levelId!=='p'||G.trans)&&n<60*10){ZC.tick(1);n++;}ZC.tick(30);for(let i=0;i<6&&G.cine;i++){ZC.skip();ZC.tick(20);}pk.lv=ZC.W.levelId;['sel='+pk.proSel,'noSecret='+pk.noSecret,'lv='+pk.lv]
//@@ shot=lukopro_pro.png
// пролог пройден (оба у дупла) — снова Лукоморье, отметка о прологе
const G=ZC.G,F=ZC.W.flags;for(const pi of[0,1]){const h=ZC.players[pi].heroes[ZC.players[pi].act];h.pos.set(pi?0.8:-0.8,0,-102);}ZC.tick(5);for(const e of ZC.W.enemies)e.alive=false;   // поляна морока «распутана» — дупло зовёт
let n=0;while(ZC.W.levelId==='p'&&n<60*6){ZC.tick(1);n++;if(G.cine)ZC.skip();}ZC.tick(120);for(let i=0;i<4&&G.cine;i++){ZC.skip();ZC.tick(20);}ZC.tick(30);pk.back=ZC.W.levelId;pk.proDone=!!G.flags.proDone;['back='+pk.back,'proDone='+pk.proDone]
//@@
const G=ZC.G;const r=[openMap()];const R=rows();pk.firstAfter=txt(R[0]);r.push('first='+pk.firstAfter);
const ok=/Дремучий/.test(pk.world)&&/^• Пролог/.test(pk.first)&&/1-1/.test(pk.second)&&pk.proOpen&&pk.l11Open&&pk.selDefault&&pk.proSel&&pk.noSecret&&pk.lv==='p'&&pk.back==='luko'&&pk.proDone&&/^✓ Пролог/.test(pk.firstAfter);
r.concat([JSON.stringify(pk),ok?'lukopro ok':'FAIL lukopro'])
