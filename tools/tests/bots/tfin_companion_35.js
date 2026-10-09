//@@ wait=1500
// релиз final06: напарник-бот проходит 3-5 «Гуси-лебеди» за Игрока 2: Йоша (Тишка на спину, пирожок у печки, вода яблоньке), Пелагея (Совиный взор у речки); тенемостки — с погашенным пером,
// светомостки — по плану между лучами гусей (считает, где будет пятно); в укрытиях стоит внутри круга; золотые мостки через пропасть между лучами трёх гусей. Гуси не поймали ни разу.
// Человека (Игрок 1) играет скрипт: стоит; Прошка съедает яблочко у яблоньки, запруду сбивает рогатка (метка), в конце человек выходит к Яге.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.H=ZC.HERO;window.F=()=>ZC.W.flags;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1)+(h.lit?'*':'');
window.GEESE=()=>ZC.G.stats.geese||0;window.FALLS=()=>ZC.G.stats.falls||0;window.SH=()=>ZC.W.shelter35&&ZC.W.shelter35();
window.RESET35=()=>{ZC.startFrom(ZC.LV('3-5'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(5);U.nocine();CO.set(true);CO.skill=1;ZC.tick(30);window.H=ZC.HERO;window.hd1=0;window.hd2=0;window.G0=GEESE();window.F0=FALLS();return 'stage='+F().stage;};
// партия человека: съесть яблочко (Прошка у яблоньки), сбить запруду (метка), на финале — выйти к Яге
window.HUMAN=()=>{const f=F();
  if(f.treeAsk&&!f.treeEat&&!hd1){hd1=1;U.toKind('proshka',0);const P=H.proshka;P.pos.set(1.5,0.2,-102);P.vel.set(0,0,0);ZC.tick(5);ZC.press('KeyE');ZC.tick(5);}
  if(f.riverAsk&&!f.dam&&!hd2){hd2=1;const mk=ZC.W.marks.find(m=>Math.abs(m.pos.x-7.4)<0.1&&Math.abs(m.pos.z+141.9)<0.1);mk.onHit();}};
window.PLAY=(max,until)=>{const L=[];let last='';for(let i=0;i<60*max&&!until();i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}HUMAN();ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}return L;};
RESET35();
['stage='+F().stage,'bot='+pos(bot()),CO.mode,!!CO.routes['3-5']]
//@@
// старт: тенемосток без света, светомосток между лучами гуся, гнездо — Йоша берёт Тишку на спину, погоня; печка — пришла первой, берёт пирожок, прячется внутри круга; гуси не поймали
if(!CO.routes['3-5'])throw new Error('нет маршрута 3-5');const L=PLAY(90,()=>F().ate&&!SH()&&ZC.W.links>=1);
if(!F().chase)throw new Error('погоня не началась: '+pos(bot())+' '+L.join(' | '));if(!F().ate)throw new Error('пирожок не съеден: ate='+F().ate+' refused='+F().refused+' '+pos(bot()));if(GEESE()-G0)throw new Error('гуси поймали: '+(GEESE()-G0)+' '+L.join(' | '));
if(FALLS()-F0)throw new Error('падения: '+(FALLS()-F0));'start→stove ok '+pos(bot())+' links='+ZC.W.links+' geese=0 falls=0'
//@@
// светомосток к яблоньке (гусь погони), яблонька: Йоша поливает, Прошка ест; речка: светомосток, Совиный взор Пелагеи, запруда — укрытия внутри круга
const L=PLAY(150,()=>F().riverDone&&!SH());
if(!F().treeDone)throw new Error('яблонька не пройдена: ask='+F().treeAsk+' eat='+F().treeEat+' water='+F().treeWater+' '+pos(bot())+' '+L.join(' | '));if(!F().hollow)throw new Error('нет пещерки (Совиный взор)');if(!F().riverDone)throw new Error('речка не пройдена '+pos(bot())+' '+L.join(' | '));
if(GEESE()-G0)throw new Error('гуси поймали: '+(GEESE()-G0));if(FALLS()-F0)throw new Error('падения: '+(FALLS()-F0));'tree+river ok links='+ZC.W.links+' bot='+pos(bot())
//@@
// Яга и золотые мостки через пропасть: между лучами трёх гусей — до конца, ни разу не поймали
const L=PLAY(100,()=>bot().pos.z<-189.5);
if(!(bot().pos.z<-189.5))throw new Error('не дошла до Яги: '+pos(bot())+' stage='+F().stage+' '+L.join(' | '));if(GEESE()-G0)throw new Error('гуси поймали: '+(GEESE()-G0)+' '+L.join(' | '));if(FALLS()-F0)throw new Error('падения: '+(FALLS()-F0));
'abyss ok '+pos(bot())+' geese=0 falls=0'
//@@
// финал: человек выходит к Яге — ролик, звено, уровень пройден
U.toKind('proshka',0);const P=me();P.pos.set(-1.2,0.2,-192);P.vel.set(0,0,0);const L=PLAY(90,()=>F().out);
if(!F().out)throw new Error('уровень не пройден: stage='+F().stage+' '+pos(bot())+' '+pos(me()));if(window._errs.length)throw new Error('ошибки: '+window._errs.slice(0,3).join(' | '));
'finale ok out='+F().out+' links='+ZC.W.links
