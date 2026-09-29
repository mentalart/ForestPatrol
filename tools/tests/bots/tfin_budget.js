//@@
// релиз final05: бюджет отрисовок. На каждом уровне после загрузки (ролики пропущены) — кадр целиком: отрисовки (draw calls, с тенями и обоими
// экранами) и треугольники; замер через 10 с игры — пачки статики (и локальные у живых) уже собраны. Бюджет — см. zlataya_cep/docs/08_final05.md: общий экран ≤ 600 отрисовок, два экрана ≤ 900, треугольников ≤ 1,2 млн.
// Запуск с URLQ='&hq=1' — замер в высоком качестве (тени включены), без него — в низком.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
const O=ZC.FIN.occ;O.fdt=0.05;
window.BUD={shared:600,split:900,tris:1.2e6};window.RES=[];
window.meas=id=>{ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.tick(20);for(let q=0;q<4&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}for(let q=0;q<20;q++){ZC.tick(30);if(ZC.G.cine){ZC.skip();ZC.tick(5);}}
  O.frame();O.frame();const s=ZC.FIN.stats(),split=ZC.G.split>0.5,lim=split?BUD.split:BUD.shared;
  const r={id,calls:s.calls,tris:s.tris,split,ok:s.calls<=lim&&s.tris<=BUD.tris};RES.push(r);return id+(split?' [2]':' [1]')+' calls='+s.calls+' tris='+Math.round(s.tris/1000)+'k'+(r.ok?'':' !!');};
'ok'
//@@
['luko','1-1','1-2','1-3','1-4','1-5','1-B'].map(meas)
//@@
['2-1','2-2','2-3','2-4','2-5','2-B'].map(meas)
//@@
['3-1','3-2','3-3','3-4','3-5','3-B'].map(meas)
//@@
['4-1','4-2','4-3','4-4','4-5','4-B'].map(meas)
//@@
['5-1','5-2','5-3','5-4','5-B1','5-B2','epi','z-i'].map(meas)
//@@
const bad=RES.filter(r=>!r.ok),mx=k=>RES.filter(r=>r.split===k).reduce((a,r)=>Math.max(a,r.calls),0);
['levels='+RES.length,'maxShared='+mx(false),'maxSplit='+mx(true),'maxTris='+Math.round(RES.reduce((a,r)=>Math.max(a,r.tris),0)/1000)+'k','over='+bad.map(r=>r.id).join(','),'errs='+window._errs.length+(window._errs[0]?' '+window._errs[0]:''),bad.length?'BUDGET FAIL':'budget ok']
