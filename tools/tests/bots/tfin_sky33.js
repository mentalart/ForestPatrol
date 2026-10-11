//@@
// 3-3 «Сирин и Алконост» (late_99zo_sky33, docs/38): завязка-спор, небо идёт за песней, подхват на пути Ёжика, перья-оценки частей.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,200));_ce.apply(console,arguments);};}
ZC.startFrom(ZC.LV('3-3'));ZC.G.manual=true;ZC.tick(20);const cineDur=ZC.G.cine&&ZC.G.cine.dur;ZC.skip();ZC.tick(5);window.S=ZC.W.song;window.F=ZC.W.flags;
ZC.players[0].path='easy';ZC.players[1].path='mid';
const r=['cine='+cineDur,'state='+S.state];if(!(cineDur>15))throw new Error('завязка не удлинилась: '+r.join(' | '));r.join(' | ')
//@@
// Игрок 1 (Ёжик) не жмёт ничего: птица подхватывает две доли за строчку; Игрок 2 (Лисёнок) поёт сам — у него подхвата нет
window.auto=(pis)=>{for(const pi of pis)for(let k=Math.max(0,S.lastK-1);k<Math.min(S.NB,S.lastK+3);k++){const e=S.ev(pi,k);if(!e)continue;const dk=S.bt[k]-S.t;if(dk>0.017||dk<-0.05)continue;
  if(e==='guard'){if(!S.jg[pi][k])ZC.press(pi?'Period':'KeyG');}else if(!S.judged[pi][k])ZC.press(pi?'KeyM':'Space');}};
const r=[];while(S.lastK<8){auto([1]);ZC.tick(1);}ZC.tick(20);const h0=S.hits[0][0]||0,t0=S.tries[0][0]||0,h1=S.hits[1][0]||0,t1=S.tries[1][0]||0;r.push('p0 hits='+h0+'/'+t0,'p1 hits='+h1+'/'+t1);
if(h0!==2)throw new Error('подхват не тот: '+r.join(' | '));r.join(' | ')
//@@
// дальше играют оба (бот жмёт в долю), до «Грозы»: небо темнеет; перья-оценки за первые части
const r=[];let n=0;while(S.phase<4&&n<60*120){auto([0,1]);ZC.tick(1);n++;}ZC.tick(60*3);
const sky=ZC.W.group.parent?ZC.W.group.parent.background:null;r.push('phase='+S.phase,'feathers='+JSON.stringify(F.feathers33),'bg='+(sky?sky.getHexString():'?'));
if(S.phase!==4||!F.feathers33||F.feathers33.length<4)throw new Error('части не оценены: '+r.join(' | '));if(sky&&sky.r>0.25)throw new Error('небо в грозу не потемнело: '+r.join(' | '));
r.push('errs='+_errs.length+' '+_errs.slice(0,2).join(' / '));if(_errs.length)throw new Error(r.join(' | '));'3-3 sky33 ok '+r.join(' | ')
