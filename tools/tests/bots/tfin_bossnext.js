//@@
// релиз final06: Ctrl+Alt+B — следующая стадия босса (late_95_dev.js, W.bossNext) у всех боссов: 1-Б, 2-Б, 3-Б, 4-Б, 5-Б1, 5-Б2.
// Ролики пропускаются; после каждого нажатия ждём, пока уровень сам перейдёт, и сверяем фазу.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));
window.HK=()=>window.dispatchEvent(new KeyboardEvent('keydown',{code:'KeyB',key:'b',ctrlKey:true,altKey:true,bubbles:true,cancelable:true}));
window.WAIT=(cond,max)=>{for(let i=0;i<(max||60*60);i++){if(cond())return true;if(ZC.G.cine&&i%3===0)ZC.skip();ZC.tick(1);}return false;};
window.GO=id=>{ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.tick(20);};
window.FL=()=>ZC.W.flags;
window.STEPS=(id,ready,seq,fin,warp)=>{GO(id);if(warp)warp();if(!WAIT(ready))throw new Error(id+': бой не начался '+"phase="+FL().phase+" won="+FL().won+" cine="+!!ZC.G.cine);const out=[];
  for(const [pre,ok] of seq){HK();if(!WAIT(ok))throw new Error(id+': после Ctrl+Alt+B нет перехода «'+pre+'»: '+"phase="+FL().phase+" won="+FL().won+" cine="+!!ZC.G.cine);out.push(pre);}
  if(fin&&!WAIT(fin))throw new Error(id+': нет конца боя');return id+': '+out.join(' → ')+(_errs.length?' | ОШИБКИ '+_errs.slice(0,2):'');};
STEPS('1-B',()=>FL().phase===1&&!ZC.G.cine,[['фаза 2',()=>FL().phase===2&&!ZC.G.cine],['фаза 3',()=>FL().phase===3&&!ZC.G.cine],['победа',()=>FL().won]])
//@@
STEPS('2-B',()=>FL().phase===1&&!ZC.G.cine,[['2',()=>FL().phase===2&&!ZC.G.cine],['3',()=>FL().phase===3&&!ZC.G.cine],['4',()=>FL().phase>=4&&!ZC.G.cine],['победа',()=>FL().won]],null,()=>ZC.W.warp2b('boss'))
//@@
STEPS('3-B',()=>FL().phase===1&&!ZC.G.cine,[['2',()=>FL().phase===2&&!ZC.G.cine],['3',()=>FL().phase===3&&!ZC.G.cine],['4',()=>FL().phase>=4&&!ZC.G.cine],['победа',()=>FL().won]],null,()=>ZC.W.warp3b('boss'))
//@@
STEPS('4-B',()=>FL().phase===1&&!ZC.G.cine,[['2',()=>FL().phase===2],['3',()=>FL().phase===3],['победа',()=>FL().won]])
//@@
STEPS('5-B1',()=>FL().stage==='fight'&&!ZC.G.cine,[['золото',()=>FL().phase2],['тетрадь',()=>FL().phase3],['книга',()=>FL().stage==='book']])
//@@
{ZC.FIN.k5e.goStage(1);ZC.G.manual=true;ZC.tick(20);const E=ZC.FIN.k5e;if(!WAIT(()=>E.cur===1&&!ZC.G.cine&&ZC.FIN.k5&&ZC.FIN.k5.fight))throw new Error('5-B2: стадия 1 не началась');
  HK();if(!WAIT(()=>E.done[1]))throw new Error('5-B2: стадия 1 не засчитана');if(!WAIT(()=>E.cur===2&&!ZC.G.cine,60*90))throw new Error('5-B2: нет перехода к стадии 2, cur='+E.cur);'5-B2: стадия 1 → 2'+(_errs.length?' | ОШИБКИ '+_errs.slice(0,2):'')}
