//@@ wait=1500
// релиз final06: 2-3 «Невод» вдвое длиннее (late_99g_k23.js) — новые участки вдвоём настоящими нажатиями:
// рыбка дарит напев «Течение» и подсказку про язык колокола, завал раздвигается; протока: течение по взгляду, плот плывёт, оставленный
// доигрывает; водоворот держит плот, Совиный взор находит тайное течение — водоворот распадается, плот доплывает; озеро: двое на камнях
// невода, двое у раковин — течения навстречу, ёрш попадается; рыбий суд, орешки; к Рыбе-киту: завал у моря рассыпается, лодка по
// «Течению», заросли рубят с лодки, на отмели — четыре уса щекотать разом (верхние — рогаткой), кит храпит и зевает, «Глоть!» — сразу 2-4.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.KEYS=[{up:'KeyW',down:'KeyS',left:'KeyA',right:'KeyD',jump:'Space',swap:'KeyQ',skill:'KeyE',item:'KeyR',attack:'KeyF'},{up:'ArrowUp',down:'ArrowDown',left:'ArrowLeft',right:'ArrowRight',jump:'KeyM',swap:'KeyK',skill:'KeyL',item:'Semicolon',attack:'Comma'}];
window.REL0=()=>['KeyW','KeyS','KeyA','KeyD'].forEach(k=>ZC.hold(k,false));window.REL1=()=>['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].forEach(k=>ZC.hold(k,false));
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
// после суда уровень не кончается: ролик — Сом велит Ершу проводить к киту, завал у моря рассыпается
let t=0;while(!ZC.G.cine&&t<600){ZC.tick(1);t++;}while(ZC.G.cine&&t<4000){ZC.tick(1);t++;}ZC.tick(30);const D=ZC.W.dbg23();
if(ZC.W.flags.out)throw new Error('уровень кончился на суде');if(D.F.task!==9||D.southW.on)throw new Error('путь к морю не открыт: task='+D.F.task+' wall='+D.southW.on);'sea open t='+(t/60).toFixed(1)
//@@
// лодка старика: Пелагея в лодку, Прошка у ракушки на причале играет «Течение» и прыгает следом; заросли рубят с носа
const D=ZC.W.warp23('pier');ZC.tick(20);ACT(0,'proshka');ACT(1,'pelageya');const r=[JUMPTO(1,0.4,-98,6),U.walkTo(0,-4.4,-93.6,6)];ZC.HERO.proshka.face=Math.PI;U.tap('KeyR');ZC.tick(4);
if(D.C3.dir!==-1)throw new Error('течение не на юг: '+D.C3.dir+' '+r.join());r.push(JUMPTO(0,-0.4,-99.2,6));
for(let i=0;i<60*70&&D.F.task<11;i++){const kz=D.KELP.find(k=>!k.gone);
  for(const pi of[0,1]){const h=U.act(pi);if(!kz&&D.RAFT3.z<-130.5){if(i%120===pi*60)r.push('shoal'+pi+':'+JUMPTO(pi,pi?1.2:-1.2,-137,5));continue;}
    if(h.groundRef!==D.RAFT3.col){if(i%40===pi*20)r.push('reboard'+pi+':'+JUMPTO(pi,D.RAFT3.x,D.RAFT3.z,4));continue;}
    if(kz&&Math.abs(kz.z-h.pos.z)<4.6){h.face=Math.PI;if(i%14===pi*7)ZC.press(KEYS[pi].attack);}}ZC.tick(1);}
if(D.F.task<11)throw new Error('не доплыли: task='+D.F.task+' raft='+D.RAFT3.z.toFixed(1)+' kelp='+D.KELP.map(k=>k.gone?'x':k.hp).join('')+' '+r.slice(-6).join()+' '+U.st());'raft ok raft='+D.RAFT3.z.toFixed(1)+' '+r.slice(-4).join()
//@@ shot=k23_shoal.png
ZC.tick(20);'shoal: task='+ZC.W.dbg23().F.task
//@@ shot=k23_yawn.png
// усы: Пелагея щекочет нижние ударом (левый, правый), Прошка — верхние рогаткой; кит храпит — сдувает, вернуться
const D=ZC.W.dbg23();const r=[];let shots=0;
for(let i=0;i<60*60&&D.F.task<12;i++){const W=D.WHI,lo=[W[0],W[1]].find(q=>q.t<=0);
  if(lo){const h=U.act(1),tx=lo.x*0.92,tz=-145.4;if(Math.hypot(h.pos.x-tx,h.pos.z-tz)>0.6){const K=KEYS[1],dx=tx-h.pos.x,dz=tz-h.pos.z;ZC.hold(K.left,dx<-0.25);ZC.hold(K.right,dx>0.25);ZC.hold(K.up,dz<-0.25);ZC.hold(K.down,dz>0.25);}
    else{REL1();if(i%10===0)ZC.press(KEYS[1].attack);}}else REL1();
  const p=U.act(0),hx=0,hz=-139.5;if(Math.hypot(p.pos.x-hx,p.pos.z-hz)>0.6){const K=KEYS[0],dx=hx-p.pos.x,dz=hz-p.pos.z;ZC.hold(K.left,dx<-0.25);ZC.hold(K.right,dx>0.25);ZC.hold(K.up,dz<-0.25);ZC.hold(K.down,dz>0.25);}
  else{REL0();p.face=Math.PI;if(!lo&&[W[2],W[3]].some(q=>q.t<=0)&&i%24===0){ZC.press('KeyE');shots++;}}ZC.tick(1);}
REL0();REL1();if(D.F.task<12)throw new Error('кит не зевнул: усы='+D.WHI.map(q=>q.t.toFixed(1)).join('/')+' выстрелов='+shots+' '+U.st());ZC.tick(70);'yawn shots='+shots
//@@
const D=ZC.W.dbg23(),r=[];
// зевок: идти в пасть; «Глоть!» — и сразу 2-4
for(let i=0;i<60*14&&D.F.task<13;i++){for(const pi of[0,1]){const h=U.act(pi),K=KEYS[pi],dx=0-h.pos.x,dz=-149-h.pos.z;ZC.hold(K.left,dx<-0.3);ZC.hold(K.right,dx>0.3);ZC.hold(K.up,dz<-0.3);ZC.hold(K.down,dz>0.3);}ZC.tick(1);}
REL0();REL1();if(D.F.task<13)throw new Error('не проглотил: in='+D.WK.in.size+' '+U.st());let t=0;while(ZC.W.levelId!=='2-4'&&t<60*12){ZC.tick(1);t++;}
if(ZC.W.levelId!=='2-4')throw new Error('после «Глоть!» не 2-4: '+ZC.W.levelId);if(!ZC.G.done['2-3'])throw new Error('2-3 не засчитан');
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'kit ok '+r.join()+' → '+ZC.W.levelId+' errs=0'
