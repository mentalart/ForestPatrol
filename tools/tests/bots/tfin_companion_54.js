//@@ wait=1500
// релиз final06: напарник-бот проходит 5-4 «Яйцо» за Игрока 2 («Калинка» 88 → 104): прыжок на каждую золотую плитку правой дорожки ровно в долю, защита на жёлтое солнышко в припеве, клетка из чёрных ниток — Йоша (смена и «умение»).
// Человека (Игрок 1) играет скрипт: те же прыжки и защита по долям левой дорожки.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0])+' '+String(a[1]&&a[1].stack||a[1]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.H=ZC.HERO;window.F=()=>ZC.W.flags;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1);
window.RESET54=()=>{for(let t=0;t<4;t++){ZC.startFrom(ZC.LV('5-4'));ZC.G.manual=true;ZC.tick(30);if(ZC.W.levelId==='5-4')break;}for(let i=0;i<30&&ZC.G.cine;i++){ZC.skip();ZC.tick(10);}U.nocine();ZC.tick(5);CO.set(true);CO.skill=1;ZC.tick(20);window.H=ZC.HERO;return F().stage;};
// человек: прыжок / защита в долю (как t54)
window.HUM=()=>{const W=ZC.W,S=W.S54;if(!S||S.state!=='play'||ZC.G.cine)return;
  for(let k=Math.max(0,S.lastK);k<=S.lastK+1&&k<S.NB;k++){const d=S.bt[k]-S.t;if(d<0.02&&d>-0.03&&!S.judged[0][k]){ZC.press(S.act(0,k)==='guard'?'KeyG':'Space');}}};
RESET54();
['stage='+F().stage,'bot='+pos(bot()),'me='+pos(me()),CO.mode,!!CO.routes['5-4'],'song='+!!ZC.W.S54]
//@@
// вся песня: бот попадает в долю (правая дорожка), клетка освобождена Йошей; Лад по счёту ≥ 90% нужных нажатий
if(!CO.routes['5-4'])throw new Error('нет маршрута 5-4');const W=ZC.W,F2=F(),S=W.S54;const L=[];let lm='',lp=-1;
for(let i=0;i<60*170&&F2.stage!=='moyo'&&S.state==='play';i++){HUM();ZC.tick(1);if(CO.mode!==lm){L.push((i/60).toFixed(0)+'s '+CO.mode);lm=CO.mode;}}
const total=S.judged[1]?Object.keys(S.judged[1]).length:0,hits=Object.values(S.judged[1]).filter(v=>v==='hit').length;
if(!(F2.stage==='moyo'||S.state==='stop'))throw new Error('песня не доиграла: k='+S.lastK+'/'+S.NB+' '+CO.mode+' '+L.slice(-4).join(' | '));
if(hits<total*0.9)throw new Error('мало попаданий в долю: '+hits+'/'+total);if(!F2.freed)throw new Error('клетка не освобождена');
'song ok hits='+hits+'/'+total+' freed='+F2.freed+' best='+S.best.join('/')
//@@
// финал: подушка, «Моё», уровень пройден; ошибок в консоли нет
const F3=F();for(let i=0;i<60*90&&!F3.out;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(1);}
if(!F3.out)throw new Error('уровень не завершён: stage='+F3.stage+' '+CO.mode);if(window._errs.length)throw new Error('ошибки: '+window._errs.slice(0,3).join(' | '));
'end ok out='+F3.out
