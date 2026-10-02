//@@ wait=1500
// релиз final06: 2-3 «Невод» вдвое длиннее (late_99g_k23.js) — новые участки вдвоём настоящими нажатиями:
// рыбка дарит напев «Течение» и подсказку про язык колокола, завал раздвигается; протока: течение по взгляду, плот плывёт, оставленный
// доигрывает; водоворот держит плот, Совиный взор находит тайное течение — водоворот распадается, плот доплывает; озеро: двое на камнях
// невода, двое у раковин — течения навстречу, ёрш попадается; рыбий суд, орешки, конец уровня.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.KEYS=[{up:'KeyW',down:'KeyS',left:'KeyA',right:'KeyD',jump:'Space',swap:'KeyQ',skill:'KeyE',item:'KeyR'},{up:'ArrowUp',down:'ArrowDown',left:'ArrowLeft',right:'ArrowRight',jump:'KeyM',swap:'KeyK',skill:'KeyL',item:'Semicolon'}];
window.ACT=(pi,kind)=>{if(U.act(pi).kind!==kind){U.tap(KEYS[pi].swap);ZC.tick(4);}return U.act(pi).kind===kind;};
window.JUMPTO=(pi,x,z,max)=>U.walkTo(pi,x,z,max,(h)=>{if(h.grounded&&Math.hypot(x-h.pos.x,z-h.pos.z)<2.2)ZC.press(KEYS[pi].jump);});
ZC.startFrom(ZC.LV('2-3'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
'links='+ZC.W.linkTotal+' nuts='+ZC.W.nutTotal
//@@
// рыбка: напев «Течение» — ролик длиннее, завал раздвигается, уровень не кончается
const D=ZC.W.dbg23();D.F.task=3;D.fishEnd();const dur=ZC.G.cine?ZC.G.cine.dur:0;let t=0;while(ZC.G.cine&&t<3000){ZC.tick(1);t++;}ZC.tick(120);
if(Math.abs(dur-20.4)>0.01)throw new Error('ролик рыбки: '+dur);if(D.F.task!==5||D.passCol.on)throw new Error('завал не раздвинулся: task='+D.F.task);if(ZC.W.flags.out)throw new Error('уровень кончился на рыбке');'fish ok link3='+D.link3.taken
//@@
// протока: Пелагея на плот; Прошка у ракушки лицом на юг играет течение и остаётся доигрывать; Потап — на плот
const D=ZC.W.warp23('protoka');ZC.tick(20);ACT(0,'proshka');ACT(1,'pelageya');const r=[U.walkTo(1,0.4,-37.8,6),U.walkTo(0,-4.4,-34.4,6)];ZC.HERO.proshka.face=Math.PI;U.tap('KeyR');ZC.tick(4);
if(D.C1.dir!==-1)throw new Error('течение не на юг: '+D.C1.dir+' '+r.join());U.tap('KeyQ');ZC.tick(4);if(!ZC.HERO.proshka.kwHold)throw new Error('Прошка не доигрывает');
r.push(JUMPTO(0,-0.4,-39,6));let t=0;while(!D.WH.met&&t<900){ZC.tick(1);t++;}if(!D.WH.met)throw new Error('плот не доплыл до водоворота: z='+D.RAFT.z.toFixed(1)+' '+r.join()+' '+U.st());
'raft at whirl z='+D.RAFT.z.toFixed(1)+' '+r.join()
//@@ shot=k23_whirl.png
// Совиный взор — тайное течение на уступе; Пелагея прыгает на уступ, играет — водоворот распадается, плот плывёт дальше
const D=ZC.W.dbg23();U.tap('KeyL');ZC.tick(20);if(!D.F.hidFound)throw new Error('тайное течение не найдено');const r=[JUMPTO(1,2.5,-47.5,5)];ZC.HERO.pelageya.face=-Math.PI/2;U.tap('Semicolon');ZC.tick(20);
if(D.WH.on)throw new Error('водоворот не распался: '+r.join()+' '+U.st());r.push(JUMPTO(1,D.RAFT.x,D.RAFT.z,5));let t=0;while(D.RAFT.z>-56&&t<1200){ZC.tick(1);t++;}
if(D.RAFT.z>-56)throw new Error('плот не доплыл: '+D.RAFT.z.toFixed(1)+' '+r.join());r.push(U.walkTo(0,-1,-60,6),U.walkTo(1,1,-60,6));'protoka ok '+r.join()
//@@
// озеро: Потап — на северный камень, Йоша — на южный (по западному берегу); Прошка — к западной ракушке, Пелагея — к восточной; течения навстречу
const D=ZC.W.warp23('lake');ZC.tick(20);ACT(0,'potap');ACT(1,'yosha');const r=[U.walkTo(0,0,-62.9,6),U.walkTo(1,-11,-63,6),U.walkTo(1,-11,-83,8),U.walkTo(1,0,-83.1,6)];ZC.tick(10);
if(!D.NS.every(s=>s.hero))throw new Error('камни невода не заняты: '+r.join()+' '+U.st());ACT(0,'proshka');ACT(1,'pelageya');
r.push(U.walkTo(0,-10.2,-73,8),U.walkTo(1,10.2,-73,10));ZC.HERO.proshka.face=Math.PI/2;ZC.HERO.pelageya.face=-Math.PI/2;U.tap('KeyR');U.tap('Semicolon');ZC.tick(4);
if(D.CW.dir!==1||D.CE.dir!==-1)throw new Error('течения не навстречу: '+D.CW.dir+'/'+D.CE.dir+' '+r.join());let t=0;while(!D.YR.caught&&t<900){ZC.tick(1);t++;}
if(!D.YR.caught)throw new Error('ёрш не пойман: x='+D.YR.x.toFixed(1)+' mid='+D.YR.mid.toFixed(2));'yorsh caught t='+(t/60).toFixed(1)+' '+r.join()
//@@ shot=k23_court.png
let t=0;while(!ZC.G.cine&&t<300){ZC.tick(1);t++;}while(ZC.G.cine&&t<4000){ZC.tick(1);t++;}ZC.tick(300);'court done lvl='+ZC.W.levelId+' out='+!!ZC.W.flags.out
//@@
if(ZC.W.levelId==='2-3'&&!ZC.W.flags.out)throw new Error('уровень не пройден');if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-3 done errs=0'
