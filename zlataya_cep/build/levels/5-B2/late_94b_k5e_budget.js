/* ============================== РЕЛИЗ final06 · 5-Б2: БЮДЖЕТ ОТРИСОВКИ (B6-c) ============================== */
// docs/33 п. 6 / docs/34 §3.6 (5Б2-6): вызовов отрисовки p95 ≤ 450. После загрузки уровня живые группы (свечи, герои, Кощей, друзья — по 50–70 мешей)
// сливаются в локальные пачки (late_26_batch: batScanLocal) только на ~6-й секунде: первое сканирование — через 2 с после «разогрева», потом ещё 2 с до
// второго, а пачка собирается лишь после 1,2 с покоя. В эти ~6 с рисуются все меши по отдельности (+150…300 вызовов). Здесь сканирование запускается
// сразу, как пачки «ожили», и повторяется ровно через 1,25 с — картинка та же (пачки собирает движок), просто раньше.
{const _st=step;let phase=0,t0=0;
  step=function(dt){_st(dt);
    if(!W||W.levelId!=='5-B2'||!FIN.batch||!FIN.batch.on)return;const B=FIN.batch;
    if(B.st!=='live'){phase=0;return;}
    if(phase===0){phase=1;t0=B.t;B.scanT=2.01;}
    else if(phase===1&&B.t-t0>=1.25){phase=2;B.scanT=2.01;}};}
// Прозрачные материалы с opacity ≈ 0 (невидимые «заготовки»: видения стадии 3, телеграфы, лучи, кольца до вспышки) рисовались как обычные меши:
// каждый — вызов отрисовки впустую. Пока opacity < 0,004 — material.visible=false (three не ставит меш в очередь, картинка та же), вернулась —
// включаем обратно в тот же кадр. Меши не трогаем (их .visible ведёт логика стадий), только материал; пачки движка прозрачное не склеивают.
{const Z=new Set();let scanT=0;
  const clear=()=>{for(const m of Z)if(m._k5z){m.visible=true;m._k5z=false;}Z.clear();scanT=0;};
  {const _ll=loadLevel;loadLevel=function(i){clear();_ll(i);};}
  const _st2=step;
  step=function(dt){_st2(dt);
    if(!W||W.levelId!=='5-B2'||!W.group)return;
    scanT-=dt;if(scanT<=0){scanT=1.5;W.group.traverse(o=>{const m=o.material;if(m&&!Array.isArray(m)&&m.transparent&&!m.userData.batch&&!Z.has(m))Z.add(m);});}
    for(const m of Z){if(m.opacity<0.004){if(m.visible){m.visible=false;m._k5z=true;}}else if(m._k5z){m.visible=true;m._k5z=false;}}};}
