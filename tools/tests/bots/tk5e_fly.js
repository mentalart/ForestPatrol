//@@
// @timeout=900
// Битва с Кощеем (сборка --k5epic): полёты домой. Ступа (после стадии 4): ролик — Яга сажает в ступу; урок ← →; руль двигает ступу;
// буква на пути — поймана; чёрная ель на пути — буква выпала; мышь с кольцом Игрока 2 — удар Игрока 1 мимо, Игрока 2 — сбита; туча-паутина —
// удар одного не считается, разом — метла метёт; дуб — стадия 5. Горыныч (после стадии 7): головы по игрокам; ворота — разом; Чудо-юдо:
// глаза — своими головами, пасть — разом. Одним игроком — ступа целиком.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,300));_ce.apply(console,arguments);};}
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.E5=ZC.FIN.k5e;window.K5=ZC.FIN.k5;Object.defineProperty(window,'F',{get:()=>E5.fly,configurable:true});
window.CHK=s=>{if(_errs.length)throw new Error(s+' — ошибки: '+_errs.slice(0,4).join(' / '));return s;};
window.KB=[{a:'KeyF',l:'KeyA',r:'KeyD'},{a:'Comma',l:'ArrowLeft',r:'ArrowRight'}];
window.FULL=()=>{for(const pi of[0,1])ZC.players[pi].petals=3;};
window.LOG=()=>E5.logs||[];
window.TK=n=>{for(let i=0;i<n;i++){FULL();ZC.tick(1);}};
window.SKIPC=()=>{for(let i=0;i<60*20&&(ZC.G.cine||ZC.G.ui);i++){if(i%3===0)ZC.skip();ZC.tick(1);}};
window.HOLD=(pis,k,on)=>pis.forEach(pi=>ZC.hold(KB[pi][k],on));
// стадия n пройдена → полёт; ждём ролик
window.FLYTO=(n,solo)=>{ZC.setSolo(!!solo);FULL();E5.goStage(n);ZC.G.manual=true;ZC.tick(30);SKIPC();for(let i=0;i<60*60&&!(E5.cur===n&&!ZC.G.cine&&!ZC.G.ui);i++){if(ZC.G.cine&&i%3===0)ZC.skip();ZC.tick(1);}
  E5.won(n);for(let i=0;i<60*10&&!(F.on&&ZC.G.cine);i++)ZC.tick(1);return 'полёт='+F.kind+' ролик='+!!ZC.G.cine;};
window.LEARN=pis=>{SKIPC();const r=['ph='+F.ph];HOLD(pis,'l',true);TK(30);HOLD(pis,'l',false);HOLD(pis,'r',true);TK(30);HOLD(pis,'r',false);TK(2);r.push('урок пройден: ph='+F.ph);return r.join(' ');};
'ok'
//@@
// ступа: ролик — сели в ступу; урок ← →
const r=[FLYTO(4)];if(F.kind!=='stupa')throw new Error(r.join(' | '));for(let i=0;i<60*5;i++)ZC.tick(1);r.push('ступа села, в ступе: '+F.hop.filter(x=>x===true).length);CHK(r.join(' | '))
//@@ shot=k5e_fly_intro.png
ZC.tick(1);
//@@
const r=[LEARN([0,1])];const h=ZC.players[0].heroes[ZC.players[0].act];r.push('герой в ступе y='+h.pos.y.toFixed(1)+' dx='+(h.pos.x+600).toFixed(1));
if(F.ph!=='fly'||Math.abs(h.pos.x+600)>2.5)throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// руль: влево — ступа влево; буква на пути — поймана; ель на пути — буква выпала
const r=[];const x0=F.x;HOLD([0,1],'l',true);TK(50);HOLD([0,1],'l',false);r.push('x '+x0.toFixed(1)+'→'+F.x.toFixed(1));if(F.x>x0-2)throw new Error('руль не ведёт: '+r.join(' | '));
F.so=99;F.sf=99;F.sg=99;TK(2);F.got=4;F.bot.gold(F.x,-20);TK(70);r.push('букв='+F.got);if(F.got<5)throw new Error('буква не поймана: '+r.join(' | '));
const g0=F.got;F.bot.tree(F.x,-30);TK(110);r.push('ель: букв '+g0+'→'+F.got+' лог='+LOG().includes('flyBump'));if(F.got>=g0||!LOG().includes('flyBump'))throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// мышь с кольцом Игрока 2: удар Игрока 1 — мимо, удар Игрока 2 — сбита
const r=[];F.learnFoe=false;const o=F.bot.foe(1,1);for(let i=0;i<60*8&&o.st==='come';i++)TK(1);r.push('мышь='+o.st);ZC.press(KB[0].a);TK(40);r.push('после Игрока 1: жива='+!o.dead);if(o.dead)throw new Error(r.join(' | '));
ZC.press(KB[1].a);TK(40);r.push('после Игрока 2: жива='+!o.dead);if(!o.dead)throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
F.bot.gold(F.x+3,-40);F.bot.tree(F.x-5,-55);F.bot.foe(0,-1);F.bot.foe(1,1);TK(160);
//@@ shot=k5e_fly_stupa.png
ZC.tick(1);
//@@
// туча-паутина: один удар — не считается; разом — метла метёт; дуб — стадия 5
const r=[];F.t=F.dur;F.obs.filter(o=>o.kind==='foe').forEach(o=>{o.dead=true;o.g.visible=false;});for(let i=0;i<60*10&&!(F.big&&F.big.ready);i++)TK(1);const B=F.big;r.push('туча='+!!B+' hp='+(B&&B.hp));if(!B)throw new Error(r.join(' | '));
ZC.press(KB[0].a);TK(60);r.push('один: hp='+B.hp);if(B.hp!==3)throw new Error(r.join(' | '));for(let k=0;k<4&&!B.dead;k++){ZC.press(KB[0].a);ZC.press(KB[1].a);TK(60);}r.push('разом: сметена='+B.dead+' ph='+F.ph);if(!B.dead)throw new Error(r.join(' | '));
for(let i=0;i<60*12&&E5.cur!==5;i++){if(ZC.G.cine&&i%3===0)ZC.skip();FULL();ZC.tick(1);}r.push('лог='+LOG().includes('flyDone')+' cur='+E5.cur+' полёт='+F.on);if(E5.cur!==5||F.on)throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// Горыныч: ролик, урок; змей Игрока 1 — бьёт левая голова; ворота — разом
const r=[FLYTO(7)];if(F.kind!=='gor')throw new Error(r.join(' | '));r.push(LEARN([0,1]));if(F.ph!=='fly')throw new Error(r.join(' | '));F.so=99;F.sf=99;F.learnFoe=false;
const o=F.bot.foe(0,-1);for(let i=0;i<60*8&&o.st==='come';i++)TK(1);ZC.press(KB[0].a);TK(40);r.push('змей сбит='+o.dead);if(!o.dead)throw new Error(r.join(' | '));
const g=F.bot.gate();for(let i=0;i<60*10&&!g.ready;i++)TK(1);r.push('ворота близко='+g.ready);ZC.press(KB[1].a);TK(30);r.push('один: целы='+!g.dead);if(g.dead)throw new Error(r.join(' | '));
ZC.press(KB[0].a);ZC.press(KB[1].a);TK(90);r.push('разом: сожжены='+g.dead);if(!g.dead)throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@ shot=k5e_fly_gor.png
F.bot.foe(0,-1);F.bot.foe(1,1);F.bot.tree(F.x+4,-50);TK(150);
//@@
// Чудо-юдо: глаза — своими головами; пасть — разом
const r=[];F.t=F.dur;for(let i=0;i<60*12&&!(F.big&&F.big.kind==='serp'&&F.big.g.position.z>-40);i++)TK(1);const S=F.big;r.push('чудо-юдо='+!!S);if(!S)throw new Error(r.join(' | '));
for(let k=0;k<6&&S.eyes.some(e=>e.open);k++){ZC.press(KB[0].a);TK(30);ZC.press(KB[1].a);TK(30);}r.push('глаза закрыты='+S.eyes.every(e=>!e.open)+' пасть='+S.ready);if(!S.ready)throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@ shot=k5e_fly_serp.png
ZC.tick(1);
//@@
const r=[];const S=F.big;ZC.press(KB[0].a);ZC.press(KB[1].a);TK(90);r.push('сожжено='+(!S||S.dead||!F.big)+' ph='+F.ph);for(let i=0;i<60*8&&!LOG().includes('flyDone');i++)TK(1);r.push('долетели='+LOG().includes('flyDone'));if(!LOG().includes('flyDone'))throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// одним игроком: ступа — урок, туча за два удара, дом
const r=[FLYTO(4,true)];const pi=ZC.G.soloPi;r.push(LEARN([0]));if(F.ph!=='fly')throw new Error(r.join(' | '));F.t=F.dur;F.so=99;F.obs.filter(o=>o.kind==='foe').forEach(o=>{o.dead=true;o.g.visible=false;});for(let i=0;i<60*10&&!(F.big&&F.big.ready);i++)TK(1);
const B=F.big;for(let k=0;k<4&&B&&!B.dead;k++){ZC.press(KB[0].a);TK(60);}r.push('сметена='+!!(B&&B.dead));for(let i=0;i<60*12&&E5.cur!==5;i++){if(ZC.G.cine&&i%3===0)ZC.skip();FULL();ZC.tick(1);}r.push('cur='+E5.cur);if(E5.cur!==5)throw new Error(r.join(' | '));CHK(r.join(' | '))
