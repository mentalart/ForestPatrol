//@@ wait=1500
// релиз final06: напарник-бот проходит 4-1 «Кузня Кузьмы и Демьяна» за Игрока 2: Пелагея прыгает на рычаг мехов (Йоша закаливает сам), чугунные болваны (Йоша поливает горячие латы, клещами срывает остывшие, бьёт открытых),
// большая заготовка (берёт свободный конец клещами и несёт на наковальню вдвоём с человеком), ковка вдвоём (плита, не занятая человеком; удар на раз-два-три, поворот на четыре; на середине — местами) и закалка кольца Йошей.
// Человека (Игрок 1) играет скрипт: Прошка бьёт в такт, берёт конец заготовки, встаёт на плиту; слиток, гвоздь и уголь (двери, большой горн) — состоянием уровня.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0])+' '+String(a[1]&&a[1].stack||a[1]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.H=ZC.HERO;window.F=()=>ZC.W.flags;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1)+(h.lit?'*':'');
window.RESET41=()=>{ZC.startFrom(ZC.LV('4-1'));ZC.G.manual=true;ZC.tick(20);U.walkTo(0,0,-7.5,4);ZC.tick(30);ZC.skip();ZC.tick(30);U.nocine();ZC.tick(5);CO.set(true);CO.skill=1;ZC.tick(30);window.H=ZC.HERO;return F().stage;};
// после ковки клещей: все четверо на нужном месте, двери открыты
window.PUT=(z,calm)=>{const W=ZC.W,f=W.flags;W.abil.kleshi=true;f.flew=true;f.g1=true;f.g2=true;if(calm){f.fight=true;f.cleared=true;}for(const k of Object.keys(H)){H[k].pos.set(k==='proshka'?-1:k==='potap'?1:k==='pelageya'?2:-2,0,z);H[k].vel.set(0,0,0);H[k].following=false;}ZC.tick(5);};
RESET41();
['stage='+F().stage,'me='+pos(me()),'bot='+pos(bot()),CO.mode,!!CO.routes['4-1']]
//@@
// ковка клещей: Прошка бьёт в такт, Пелагея качает мехи, Йоша закаливает сам — четыре клещей на стойке, у каждого свои
if(!CO.routes['4-1'])throw new Error('нет маршрута 4-1');const W=ZC.W,FG=W.FG;U.walkTo(0,0,-12.6,3);let last=-1;
for(let i=0;i<60*120&&!W.abil.kleshi;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}const u=((FG.t%FG.B)+FG.B)%FG.B/FG.B,beat=Math.floor(FG.t/FG.B);if(FG.t>0&&u<0.08&&beat!==last&&FG.made<FG.total){last=beat;ZC.press('KeyF');}ZC.tick(1);}
if(!W.abil.kleshi)throw new Error('клещи не выкованы: made='+FG.made+' done='+FG.done+' heat='+FG.heat.toFixed(2)+' '+pos(bot())+' '+CO.mode);'forge ok made='+FG.made+' rack='+FG.onRack
//@@
// чугунные болваны: бот один (человек бессмертен и стоит) — латы остужены, сорваны, болваны побеждены
RESET41();PUT(-46);const W=ZC.W,f=W.flags;let lm='';const L=[];
for(let i=0;i<60*120&&!f.cleared;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}H.proshka.iT=99;H.potap.iT=99;ZC.tick(1);if(CO.mode!==lm){L.push((i/60).toFixed(0)+'s '+CO.mode+' '+pos(bot()));lm=CO.mode;}}
if(!f.cleared)throw new Error('цех не очищен: '+W.enemies.filter(e=>e.alive).map(e=>e.armor+':'+e.state).join(',')+' '+pos(bot())+' '+L.slice(-4).join(' | '));'golems ok pet='+ZC.players[1].petals
//@@
// в четыре руки: большая заготовка — вдвоём клещами на наковальню; ковка вдвоём (бот — на плите, что не занята человеком), на середине местами
RESET41();PUT(-52,1);const W=ZC.W,F2=W.flags;const sock=W.sockets.find(s=>Math.abs(s.pos.z+57.4)<0.2);sock.onPut(W.hots.find(i=>i.kind==='ugol'));ZC.tick(120);
const ANV={x:0,z:-50.8},STR={x:1.2,z:-49.1},HOLD={x:-2.4,z:-50.8};let hrole=null,hhalf=0;const hA=()=>U.act(0);
for(let i=0;i<60*150&&!['quench','rung','end'].includes(F2.stage);i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}H.proshka.iT=99;const B=W.BIG,R=W.R4;
  if(F2.stage==='carry'&&B){const c=Math.cos(B.ang),s=Math.sin(B.ang);const E=[{x:B.pos.x-1.1*c,z:B.pos.z+1.1*s},{x:B.pos.x+1.1*c,z:B.pos.z-1.1*s}];
    if(!B.hold[0]){const e=E[B.hold[1]&&B.hold[1].end===0?1:0];if(U.step(0,e.x,e.z,0.6)&&hA().grounded&&i%30===0)ZC.press('KeyR');}
    else if(B.hold[1]){const p=B.hold[1].h;if(Math.hypot(p.pos.x-hA().pos.x,p.pos.z-hA().pos.z)<3.0)U.step(0,ANV.x-1.1,ANV.z,0.3);else U.rel(0);}else U.rel(0);}
  if(F2.stage==='r4'&&R&&R.phase==='play'){const half=R.prog>=R.need/2?1:0;if(!hrole)hrole='hold';if(half&&!hhalf){hhalf=1;hrole=hrole==='hold'?'strike':'hold';}
    const P=hrole==='strike'?STR:HOLD;if(Math.hypot(hA().pos.x-P.x,hA().pos.z-P.z)>0.6){U.step(0,P.x,P.z,0.35);}else{U.rel(0);if(R.t>-R.B*0.4){const k=Math.round(R.t/R.B),d=R.t-k*R.B,b=((k%4)+4)%4;if(Math.abs(d)<0.08&&!R.beatDone[k]){hA().face=Math.atan2(ANV.x-hA().pos.x,ANV.z-hA().pos.z);if(hrole==='strike'&&b!==3)ZC.press('KeyF');else if(hrole==='hold'&&b===3)ZC.press('KeyR');}}}}
  ZC.tick(1);}
U.rel(0);if(!['quench','rung','end'].includes(F2.stage))throw new Error('ковка не завершена: stage='+F2.stage+' prog='+(W.R4&&W.R4.prog)+' '+pos(bot())+' '+CO.mode);'ruki ok prog='+W.R4.prog
//@@
// закалка кольца: Йоша живой водой — кольцо звенит, кузнецы оживают, уровень пройден
RESET41();PUT(-47,1);const W=ZC.W,F3=W.flags;F3.stage='quench';let lm='';
for(let i=0;i<60*120&&!F3.out;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(1);}
if(!F3.out)throw new Error('уровень не пройден: stage='+F3.stage+' '+pos(bot())+' '+CO.mode);if(window._errs.length)throw new Error('ошибки: '+window._errs.slice(0,3).join(' | '));'quench ok out='+F3.out
