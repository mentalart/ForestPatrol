// Лукоморье: Застава трёх богатырей на холме южного мыса — подъём по склону, прыжки «в» склон, закрытые и открытые ворота, меню у богатырей, края мыса
//@@
ZC.startFrom(ZC.LV('4-1'));ZC.G.manual=true;ZC.tick(5);ZC.G.hub=true;ZC.loadLevel(ZC.LV('luko'));ZC.tick(30);ZC.skip();ZC.tick(60);ZC.skip();ZC.tick(30);
const W=ZC.W;[W.name,W.flags.mode,W.flags.stage,U.st()].join(' | ')
//@@
// на лужайке у начала тропы → по склону к богатырям; ворота закрыты (самоцветов нет): во двор не пройти
const r=[],H=ZC.HERO,G=ZC.G,W=ZC.W;G.gems={};G.gemsSpent=0;for(const z of['z-i','z-d','z-a'])G.owned[z]=false;
for(const k of['proshka','potap','pelageya','yosha'])H[k].pos.set(0,0,6);ZC.tick(20);
r.push('к богатырям '+U.walkTo(0,0.4,15.4,10));let p=U.act(0);r.push('y='+p.pos.y.toFixed(2),'gr='+p.grounded);
if(!(p.pos.y>1.0&&p.grounded))throw new Error('не поднялся на холм: '+U.st());
const gc=W.boxes.find(b=>Math.abs(b.minx+2.55)<1e-6&&Math.abs(b.maxx-2.55)<1e-6&&b.maxy-b.miny>3);if(!gc)throw new Error('нет створок ворот');
if(!gc.on)throw new Error('ворота без самоцветов должны быть закрыты');
const wk=(...a)=>String(U.walkTo(...a)).replace('TIMEOUT','упёрся');
r.push('обход Ильи '+wk(0,1.7,16.4,4),wk(0,1.7,19.3,4),'к воротам '+wk(0,0,23.5,5));p=U.act(0);r.push('z='+p.pos.z.toFixed(1));
if(p.pos.z>20.4)throw new Error('прошёл сквозь закрытые ворота z='+p.pos.z.toFixed(2));
r.join(' | ')
//@@ shot=zhub_closed.png
ZC.tick(1);
//@@
// меню Заставы — у богатырей: кнопка «удар» рядом с ними, закрыть защитой
const G=ZC.G;U.walkTo(0,1.7,16.4,4);U.walkTo(0,0,15.6,4);const r=['ui0='+G.ui];U.tap('KeyF');ZC.tick(6);r.push('ui='+G.ui);if(G.ui!=='zast')throw new Error('меню Заставы у богатырей не открылось: '+U.st());
U.tap('KeyG');ZC.tick(6);r.push('после закрытия ui='+G.ui);if(G.ui)throw new Error('меню не закрылось');
r.join(' | ')
//@@
// два самоцвета — ворота настежь, доска и фонари; во двор пройти можно
const G=ZC.G,W=ZC.W;G.gems={a:1,b:1};ZC.tick(90);const gc=W.boxes.find(b=>Math.abs(b.minx+2.55)<1e-6&&Math.abs(b.maxx-2.55)<1e-6&&b.maxy-b.miny>3);
if(gc.on)throw new Error('ворота при двух самоцветах остались закрыты');if(Math.abs(W.zhill.leaves[0].rotation.y)<1.5)throw new Error('створки не распахнулись');
const r=['ворота открыты'];U.walkTo(0,1.7,16.4,4);U.walkTo(0,1.7,19.3,4);r.push('во двор '+U.walkTo(0,0,21.8,4),U.walkTo(0,-2.4,22.4,4));const p=U.act(0);r.push('z='+p.pos.z.toFixed(1)+' y='+p.pos.y.toFixed(2));
if(p.pos.z<21.2)throw new Error('не прошёл в открытые ворота z='+p.pos.z.toFixed(2));
r.join(' | ')
//@@ shot=zhub_open.png
ZC.tick(1);
//@@
// прыжки «в» склон снизу вверх: герой не проваливается внутрь холма
const G=ZC.G,r=[];for(const k of['proshka','potap','pelageya','yosha'])ZC.HERO[k].pos.set(2.2,0,12.4);ZC.tick(20);
ZC.hold('KeyS',true);let bad=0,top=0;for(let i=0;i<360;i++){if(i%22===0)ZC.press('Space');ZC.tick(1);const p=U.act(0);top=Math.max(top,p.pos.y);if(p.pos.z>14.8&&p.pos.y<0.5)bad++;}   // на склоне z>14,8 земля выше 1 м: внизу — внутри холма
ZC.hold('KeyS',false);r.push('высота '+top.toFixed(2));ZC.tick(30);const p=U.act(0);r.push(U.st(),'в холме='+bad);if(bad>0)throw new Error('герой провалился внутрь холма: '+U.st());r.join(' | ')
//@@
// края мыса: стены не пускают за берег
const r=[];for(const k of['proshka','potap','pelageya','yosha'])ZC.HERO[k].pos.set(-10,0,27);ZC.tick(20);const wk=(...a)=>String(U.walkTo(...a)).replace('TIMEOUT','упёрся');r.push('запад '+wk(0,-20,27,4));let p=U.act(0);r.push('x='+p.pos.x.toFixed(1));if(p.pos.x<-14.1)throw new Error('ушёл за западный берег мыса');
for(const k of['proshka','potap','pelageya','yosha'])ZC.HERO[k].pos.set(10,0,30);ZC.tick(20);r.push('юг '+wk(0,10,45,5));p=U.act(0);r.push('z='+p.pos.z.toFixed(1));if(p.pos.z>33.6)throw new Error('ушёл за южный берег мыса');
r.join(' | ')
//@@
// стык мыса и острова: по всей ширине мыса проходим, левее и правее (где мыса нет) — старая южная стена на месте
const wk=(...a)=>String(U.walkTo(...a)).replace('TIMEOUT','упёрся'),r=[];for(const k of['proshka','potap','pelageya','yosha'])ZC.HERO[k].pos.set(-3,0,14);ZC.tick(20);r.push(wk(0,-3,5,5));let p=U.act(0);r.push('z='+p.pos.z.toFixed(1));if(p.pos.z>6)throw new Error('не вернулся с мыса на лужайку');
for(const k of['proshka','potap','pelageya','yosha'])ZC.HERO[k].pos.set(-16,0,5);ZC.tick(10);r.push('у старой южной стены '+wk(0,-16,16,3));if(U.act(0).pos.z>12.3)throw new Error('прошёл за стену там, где мыса нет: z='+U.act(0).pos.z);
for(const k of['proshka','potap','pelageya','yosha'])ZC.HERO[k].pos.set(16,0,5);ZC.tick(10);r.push('и справа '+wk(0,16,16,3));if(U.act(0).pos.z>12.3)throw new Error('прошёл за стену справа: z='+U.act(0).pos.z);
r.join(' | ')
