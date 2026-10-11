//@@
// «Сдвиг такта»: настройка (мс) → G.songLag (с); в 5-4 нажатие на 0,30 с позже доли (дальше полудоли) при сдвиге +200 мс засчитано, без сдвига — нет (без сдвига промах засчитан ещё до нажатия)
const S0=ZC.FIN.set;S0.lag=60;ZC.FIN.applySettings();const r=['songLag='+ZC.G.songLag];
const run=(lag)=>{S0.lag=lag;ZC.FIN.applySettings();ZC.startFrom(ZC.LV('5-4'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(5);const W=ZC.W,S=W.S54;
  // ждём первую долю-прыжок Игрока 1 и жмём через 0,30 с после неё
  let k=-1;for(let i=0;i<60*12&&k<0;i++){ZC.tick(1);const q=S.lastK;if(q>=2&&S.act(0,q)==='jump'&&S.t-S.bt[q]>=0.295&&S.t-S.bt[q]<0.315){k=q;ZC.press('Space');ZC.tick(2);}}return k>=0?S.judged[0][k]:'none';};
const a=run(200),b=run(0);r.push('lag200='+a,'lag0='+b);S0.lag=0;ZC.FIN.applySettings();r.push(Math.abs(ZC.G.songLag)<1e-9&&a==='hit'&&b!=='hit'&&b!=='none'?'ok':'FAIL lag');r
