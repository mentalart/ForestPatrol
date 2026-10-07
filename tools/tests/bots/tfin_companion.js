//@@
// релиз final06: бот-напарник за Игрока 2 (late_73_companion): «Режим» вдвоём → один → с напарником, следование, бой, подшивание, смена героя после падения.
// Человек — Игрок 1 (клавиши WASD через U.*), бот сам жмёт клавиши Игрока 2.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.CO=ZC.FIN.co;window.P=ZC.players;
window.me=()=>U.act(0);window.bot=()=>U.act(1);
window.dist=()=>Math.hypot(me().pos.x-bot().pos.x,me().pos.z-bot().pos.z);
window.lvl=()=>{ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(20);for(let q=0;q<3&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(90);};
// режим по кругу: вдвоём (0) → один (1) → с напарником (2) → вдвоём; в «с напарником» одиночный режим выключен, в «один» напарник выключен
const m=[CO.index()];CO.cycle(1);m.push(CO.index()+':solo='+ZC.G.solo+':co='+CO.on);CO.cycle(1);m.push(CO.index()+':solo='+ZC.G.solo+':co='+CO.on);
CO.cycle(1);m.push(CO.index()+':solo='+ZC.G.solo+':co='+CO.on);CO.cycle(-1);m.push(CO.index());ZC.setSolo(false);CO.set(false);
const ok=m.join(' ')==='0 1:solo=true:co=false 2:solo=false:co=true 0:solo=false:co=false 2';
['режимы '+m.join(' | '),ok?'modes ok':'FAIL modes']
//@@
// следование: человек уходит вперёд на 14 м, напарник идёт следом (ведомый движка) и держится рядом
lvl();CO.set(true);CO.skill=1;const r=U.goto(0,me().pos.x,me().pos.z-14,12,0.6);ZC.tick(150);const d=dist();
['goto '+r,'dist='+d.toFixed(1)+' mode='+CO.mode,d<5.5?'follow ok':'FAIL follow']
//@@
// бой: морок-кикиморка в метре-другом от напарника; человек стоит. Бот отбивает замахи и бьёт, когда морок открыт; без потери лепестков при CMP.skill=1
const b=bot(),e=ZC.FIN.dbgFoe('kiki',b.pos.x+2.4,b.pos.z-1.5,{y:b.pos.y});const s0=ZC.G.stats,def0=s0.parries+s0.mahs+s0.shields;
const r=U.until(()=>!e.alive,40);const def=s0.parries+s0.mahs+s0.shields-def0;
['unravel '+r,'petals='+P[1].petals,'defended='+def,(r!=='TIMEOUT'&&P[1].petals===3&&def>0)?'fight ok':'FAIL fight']
//@@
// два морока сразу: напарник справляется и с парой
const b=bot(),e1=ZC.FIN.dbgFoe('kiki',b.pos.x+2.6,b.pos.z-1.5,{y:b.pos.y}),e2=ZC.FIN.dbgFoe('leshonok',b.pos.x-2.6,b.pos.z-2,{y:b.pos.y});
const r=U.until(()=>!e1.alive&&!e2.alive,60);
['unravel2 '+r,'petals='+P[1].petals,'downed='+P[1].downed,(r!=='TIMEOUT'&&!P[1].downed)?'pair ok':'FAIL pair']
//@@
// напарник рассыпался клубком — берёт второго героя (как человек клавишей смены)
const k0=bot().kind;P[1].petals=0;P[1].downed=true;P[1].downT=10;P[1].revT=0;
const r=U.until(()=>!P[1].downed&&bot().kind!==k0,5);
['swap '+r,k0+'→'+bot().kind,r!=='TIMEOUT'?'downswap ok':'FAIL downswap']
//@@
// упал человек — напарник подходит и подшивает
const h=me();P[0].petals=0;P[0].downed=true;P[0].downT=10;P[0].revT=0;const b=bot();b.pos.x=h.pos.x+7;b.pos.z=h.pos.z+2;b.vel.set(0,0,0);ZC.tick(2);
const rv0=ZC.G.stats.revives,r=U.until(()=>!P[0].downed,9);
['revive '+r,'revives+'+(ZC.G.stats.revives-rv0),'dist='+dist().toFixed(1),r!=='TIMEOUT'?'revive ok':'FAIL revive']
//@@
// окна и ролики: в окне («Сказ» и т. п.) бот повторяет за человеком; ролик пропускается удержанием прыжка человека (бот держит свой)
const G=ZC.G;G.ui='skaz';ZC.hold('Space',true);ZC.press('Space');ZC.tick(1);const mir=CO.mode==="mirror";ZC.hold('Space',false);G.ui=null;ZC.tick(2);
['ui mode='+(mir?'mirror':CO.mode),mir?'mirror ok':'FAIL mirror','errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:''),window._errs.length?'FAIL errs':'errs ok']
