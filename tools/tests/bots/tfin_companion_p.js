//@@ wait=1500
// релиз final06: напарник-бот проходит пролог за Игрока 2 (пятно, трещина, овраг, лаз, ковшик, плиты, поляна, дупло); человека играет скрипт.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.CO=ZC.FIN.co;window.P=ZC.players;window.F=()=>ZC.W.flags;window.bot=()=>U.act(1);window.me=()=>U.act(0);
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1);
window.st=()=>'stage='+F().stage+' me='+pos(me())+' bot='+pos(bot())+' mode='+CO.mode+' obj='+U.obj().split('|')[1];
ZC.startFrom(ZC.LV('p'));ZC.G.manual=true;ZC.tick(2);CO.set(true);CO.skill=1;
['start '+st()]
//@@
// комната: человек встаёт на своё пятно, бот — на своё; потом ролик «Колыбельная» (пропуск прыжком), и вот — погоня
const r=[U.goto(0,-2.0,1.4,6)];r.push('spots='+JSON.stringify(F().spot));U.until(()=>ZC.G.cine,8);r.push('cine='+!!ZC.G.cine);
ZC.hold('Space',true);U.until(()=>!ZC.G.cine,30);ZC.hold('Space',false);ZC.tick(30);r.push(st());r
//@@
// погоня: человек стоит у двери, бот сам: трещина → овраг (Пелагея планирует) и лаз (Йоша) → ковшик поливает корень → мосток → плиты правых ворот
const L=[];let last='';for(let i=0;i<60*90;i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}if(m==='route:arena')break;}
const g=ZC.W.gates.find(g=>g.link==='R');L.push('rootGrown='+!!F().rootGrown,'jump1='+JSON.stringify(F().jump1.done),'gateR='+g.latched,(F().rootGrown&&F().jump1.done[1]&&g.latched&&CO.mode==='route:arena')?'route ok':'FAIL route');L
//@@
// поляна: человек (его левая тропа — не предмет проверки) выходит к поляне и бьёт своего морока; бот сам побеждает своего
ZC.tick(60);me().pos.set(-3.2,0,-81);me().vel.set(0,0,0);const L=[];
const u1=U.until(()=>F().stage==='arena',6);L.push('arena '+u1,'foes='+ZC.W.enemies.filter(e=>e.alive).map(e=>'pi'+e.pi).join(','));
L.push('human '+U.fight(0,'parry',40));const u2=U.until(()=>F().stage==='hollow',20);L.push('cleared '+u2,'petals='+P[1].petals,(u2!=='TIMEOUT'&&P[1].petals===3)?'arena ok':'FAIL arena');L
//@@
// дупло: человек встаёт к дуплу, бот уже там — уровень пройден
me().pos.set(-1.2,0,-102);ZC.tick(2);const u=U.until(()=>ZC.G.flags.proDone||ZC.W.levelId!=='p',20);
['hollow '+u,'proDone='+ZC.G.flags.proDone,'bot='+pos(bot()),'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''),(ZC.G.flags.proDone&&!_errs.length)?'prolog ok':'FAIL prolog']
