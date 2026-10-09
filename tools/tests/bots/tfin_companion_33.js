//@@ wait=1500
// релиз final06: напарник-бот поёт партию Игрока 2 в 3-3 «Сирин и Алконост»: прыжок в долю на вспышку, повтор эха, протяжные ноты (держит прыжок), щит в грозу, дуэт, перья, хоровод, соло Пелагеи.
// Человека (Игрок 1) играет скрипт (или стоит). Бот не промахивается ни разу, строчки не перематываются.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.F=()=>ZC.W.flags;
window.RESET33=()=>{for(let n=0;n<4&&!(ZC.W.levelId==='3-3'&&ZC.W.song&&ZC.W.song.t<-1);n++){ZC.tick(120);ZC.startFrom(ZC.LV('3-3'));ZC.G.manual=true;ZC.tick(20);ZC.skip();ZC.tick(5);U.nocine();}CO.set(true);CO.skill=1;ZC.tick(10);return ZC.W.song.state;};
// партия человека (Игрок 1): те же правила, что у t33n, только для pi 0
window.HUMAN=()=>{const S=ZC.W.song,pi=0;if(S.hold[pi])ZC.hold('Space',S.t<S.hold[pi].end);else ZC.hold('Space',false);
  if(S.typ(Math.max(0,S.lastK))==='solo')return;let k=-1;for(let q=Math.max(0,S.lastK);q<Math.min(S.NB,S.lastK+3);q++){const e=S.ev(pi,q);if(!e)continue;if(e==='guard'?S.jg[pi][q]:S.judged[pi][q])continue;k=q;break;}
  if(k<0||S.t<S.bt[k]-0.025||S.t>=S.bt[k]+0.05)return;const e=S.ev(pi,k);if(e==='guard')ZC.press('KeyG');else if(me().grounded){ZC.press('Space');if(e==='hold')ZC.hold('Space',true);}};
window.MISS=pi=>{const S=ZC.W.song,m={};for(const k in S.judged[pi])if(S.judged[pi][k]==='miss'){const t=S.typ(+k);m[t]=(m[t]||0)+1;}for(const k in S.jg[pi])if(S.jg[pi][k]==='miss')m.guard=(m.guard||0)+1;return m;};
window.PLAY=(human)=>{const S=ZC.W.song;for(let i=0;i<60*240&&S.state==='play';i++){if(human)HUMAN();ZC.tick(1);}return S;};
RESET33();
['route='+!!CO.routes['3-3'],'state='+ZC.W.song.state,'bot='+bot().kind,'beats='+ZC.W.song.NB]
//@@
// песня вдвоём: человек играет свою партию, бот — свою (в долю, эхо, протяжные ноты, щит, дуэт, перья, хоровод, соло): у бота ни одного промаха, строчки не перематываются
if(!CO.routes['3-3'])throw new Error('нет маршрута 3-3');const S=PLAY(true);const mb=MISS(1),mh=MISS(0);
if(S.state!=='stop')throw new Error('песня не доиграна: '+S.state+' t='+S.t.toFixed(1)+' k='+S.lastK);if(Object.keys(mb).length)throw new Error('промахи бота: '+JSON.stringify(mb)+' человека: '+JSON.stringify(mh));
if(Object.keys(S.rep).length)throw new Error('перемотки: '+JSON.stringify(S.rep));if(!(S.holds>=2&&S.feathers>=2&&S.shields>=2))throw new Error('не сыграно: holds='+S.holds+' feathers='+S.feathers+' shields='+S.shields+' best='+S.best.join('/'));
'duet ok best='+S.best.join('/')+' holds='+S.holds+' feath='+S.feathers+' shields='+S.shields+' merges='+S.merges
//@@
// финал: ролик, звено от птиц — уровень пройден
for(let i=0;i<60*60&&!F().out;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(1);}
if(!F().out)throw new Error('финал не сыгран: '+ZC.W.song.state+' '+(ZC.G.cine?'cine':'-'));if(window._errs.length)throw new Error('ошибки: '+window._errs.slice(0,3).join(' | '));
'finale ok out='+F().out+' links='+ZC.W.links
//@@
// человек стоит (не играет): бот один тянет свою партию без промахов, песня не перематывается (перематывает, только когда плохо у обоих)
RESET33();const S=PLAY(false);const mb=MISS(1);
if(S.state!=='stop')throw new Error('песня не доиграна: '+S.state+' t='+S.t.toFixed(1));if(Object.keys(mb).length)throw new Error('промахи бота: '+JSON.stringify(mb));if(Object.keys(S.rep).length)throw new Error('перемотки: '+JSON.stringify(S.rep));
'bot alone ok best='+S.best.join('/')+' holds='+S.holds+' shields='+S.shields
