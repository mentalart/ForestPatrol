//@@
// релиз final06: Ctrl+Alt+B — следующая стадия босса (late_95_dev.js, W.bossNext) у всех боссов: 1-Б, 2-Б, 3-Б, 4-Б, 5-Б1, 5-Б2.
// 5-Б2: следующая из двенадцати глав — откуда ни нажми (пролог-погоня, посреди стадии, в ролике после стадии), последняя стадия засчитывается.
// Ролики пропускаются; после каждого нажатия ждём, пока уровень сам перейдёт, и сверяем фазу.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));
window.HK=()=>window.dispatchEvent(new KeyboardEvent('keydown',{code:'KeyB',key:'b',ctrlKey:true,altKey:true,bubbles:true,cancelable:true}));
window.WAIT=(cond,max)=>{for(let i=0;i<(max||60*60);i++){if(cond())return true;if(ZC.G.cine&&i%3===0)ZC.skip();ZC.tick(1);}return false;};
window.GO=id=>{ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.tick(20);};
window.FL=()=>ZC.W.flags;
window.STEPS=(id,ready,seq,fin,warp)=>{GO(id);if(warp)warp();if(!WAIT(ready))throw new Error(id+': бой не начался '+"phase="+FL().phase+" won="+FL().won+" cine="+!!ZC.G.cine);const out=[];
  for(const [pre,ok] of seq){HK();if(!WAIT(ok))throw new Error(id+': после Ctrl+Alt+B нет перехода «'+pre+'»: '+"phase="+FL().phase+" won="+FL().won+" cine="+!!ZC.G.cine);out.push(pre);}
  if(fin&&!WAIT(fin))throw new Error(id+': нет конца боя');return id+': '+out.join(' → ')+(_errs.length?' | ОШИБКИ '+_errs.slice(0,2):'');};
STEPS('1-B',()=>FL().phase===1&&!ZC.G.cine,[['фаза 2',()=>FL().phase===2&&!ZC.G.cine],['фаза 3',()=>FL().phase===3&&!ZC.G.cine],['круг 2',()=>{const s=ZC.FIN.k1b.s3;return s.round===2&&s.st==='run'&&!ZC.G.cine;}],['победа',()=>FL().won]])
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
//@@
// 5-Б2: из пролога (погоня на Горыныче) — к главе 1; посреди стадии — к следующей; в ролике после засчитанной стадии — тоже к следующей; так по всем двенадцати
{const E=ZC.FIN.k5e,GO_=n=>{E.goStage(n);ZC.G.manual=true;ZC.tick(20);};
  const READY=n=>WAIT(()=>E.cur===n&&!ZC.G.cine&&!ZC.G.trans,60*120);
  GO_(0);if(!(E.cur===0))throw new Error('5-B2: пролог не начался: cur='+E.cur);HK();if(!READY(1))throw new Error('5-B2: из пролога нет перехода к главе 1, cur='+E.cur);
  const log=['пролог → 1'];
  GO_(3);if(!READY(3))throw new Error('5-B2: стадия 3 не началась');
  E.won(3);ZC.tick(120);if(!ZC.G.cine&&E.cur===3){/* ролика ещё нет — не страшно: нажмём и так */}
  for(let n=3;n<12;n++){HK();if(!READY(n+1))throw new Error('5-B2: после Ctrl+Alt+B на стадии '+n+' нет главы '+(n+1)+', cur='+E.cur+' cine='+!!ZC.G.cine);log.push(n+' → '+(n+1));}
  HK();if(!WAIT(()=>E.done[12],60*30))throw new Error('5-B2: двенадцатая стадия не засчитана');log.push('12 → конец битвы');
  log.join(', ')+(_errs.length?' | ОШИБКИ '+_errs.slice(0,2):'')}
//@@
// 5-Б2: Ctrl+Alt+B в момент, когда бумажный лист перелистывания (после стадии 4) закрывает экран, — лист не остаётся поверх новой главы
// («уровень загрузился, но не стартует»); строка пролога стоит под полосой стадии, а не поверх неё.
{const E=ZC.FIN.k5e,$$=id=>document.getElementById(id),TK=n=>{for(let i=0;i<n;i++){if(ZC.G.cine&&i%3===0)ZC.skip();ZC.tick(1);}};
  E.goStage(4);ZC.G.manual=true;ZC.tick(20);TK(200);E.won(4);
  for(let i=0;i<60*4&&!($$('k5ePaper')&&$$('k5ePaper').style.opacity==='1');i++)TK(1);
  const pp=$$('k5ePaper');if(!pp||pp.style.opacity!=='1')throw new Error('5-B2: бумажный лист не появился после стадии 4');
  HK();TK(2);if(E.cur!==5)throw new Error('5-B2: после Ctrl+Alt+B нет главы 5, cur='+E.cur);
  if(pp.style.opacity!=='0')throw new Error('5-B2: бумажный лист остался поверх главы 5 (opacity='+pp.style.opacity+')');
  TK(60);const bar=$$('bossbar').getBoundingClientRect(),ln=$$('k5eLine').getBoundingClientRect();
  if($$('bossbar').style.display==='none'||$$('k5eLine').style.display==='none')throw new Error('5-B2: нет полосы стадии или строки пролога');
  if(ln.top<bar.bottom-0.5)throw new Error('5-B2: строка пролога наложилась на полосу стадии: полоса '+bar.top+'–'+bar.bottom+', строка с '+ln.top);
  'лист после Ctrl+Alt+B убран; полоса '+Math.round(bar.top)+'–'+Math.round(bar.bottom)+', строка с '+Math.round(ln.top)+(_errs.length?' | ОШИБКИ '+_errs.slice(0,2):'')}
