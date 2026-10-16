//@@ wait=1500
// @timeout=1200
// релиз final06: 1-Б «Леший-Путаник» — финал после победы (late_99zdg_k1b_finale.js): ручная постановка 28,5 с, 7 планов — Леший на пне, «зачем путал?»,
// ворона Кощея, сова и золотая цепочка из дупла летит Прошке, шапка, ёлки расступаются и светляки на тропе. Голос у каждой строки, ≥ 3 крупностей,
// ошибок нет; после ролика — Лукоморье (finishLevel). Кадр на каждый план (shot=…).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.V=ZC.FIN.vox;V.audio();ZC.players.forEach(p=>{p.path='mid';});ZC.startFrom(ZC.LV('1-B'));ZC.G.manual=true;ZC.tick(2);'записи'
//@@ wait=2500
window.K=ZC.FIN.k1b;ZC.tick(60);ZC.skip();ZC.tick(60);let g=0;while(!ZC.W.flags.won&&g<14){if(ZC.G.cine)ZC.skip();ZC.W.bossNext();ZC.tick(60*3);g++;}
let n=0;while(n<60*10&&!(ZC.G.cine&&K.fin.on)){ZC.tick(1);n++;}if(!K.fin.on)throw new Error('финал не начался: won='+ZC.W.flags.won);
window.C=ZC.G.cine;window.heard=[];window.lastV=null;window.toT=t=>{let k=0;while(ZC.G.cine===C&&C.t<t&&k<60*40){ZC.tick(1);const v=V.cur;if(v&&v!==lastV)heard.push(v);lastV=v;k++;}return C.t.toFixed(1);};
'финал: dur='+C.dur
//@@ shot=k1bfin_1.png
toT(1.6)
//@@ shot=k1bfin_2.png
toT(5.5)
//@@ shot=k1bfin_3.png
toT(10.0)
//@@ shot=k1bfin_4.png
toT(13.6)
//@@ shot=k1bfin_5.png
toT(17.8)
//@@ shot=k1bfin_6.png
toT(21.5)
//@@ shot=k1bfin_7.png
toT(26.5)
//@@
toT(40);const st=K.fin.st;const want=['1-B_008','1-B_015','1-B_016','1-B_017','1-B_009','1-B_018'],miss=want.filter(i=>!heard.includes(i));
if(miss.length)throw new Error('не прозвучали: '+miss.join(',')+' | слышно '+heard.join(','));
if(!(st.chain&&st.owl&&st.crow&&st.firs))throw new Error('не всё показано: '+JSON.stringify(st));
let m=0;while(m<60*8&&ZC.W.levelId==='1-B'){ZC.tick(1);m++;}if(ZC.W.levelId==='1-B')throw new Error('после финала уровень не закончился');
if(window._errs.length)throw new Error('ошибки: '+window._errs[0]);
'финал ok · голоса '+heard.filter(i=>i.startsWith('1-B')).join(' ')+' · '+JSON.stringify(st)+' · дальше '+ZC.W.levelId
