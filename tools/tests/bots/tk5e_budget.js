//@@
// @timeout=900
// B6-c · 5-Б2: бюджет отрисовки — вызовы (renderer.info.render.calls после принудительной render()+gl.finish()) p95 ≤ 450, частицы (FIN.fx.list) пик ≤ 120.
// Стадии акта I–III проходят через ZC.tick (без реального времени): вход в стадию, ролики пропускаются, замер каждые 60 тиков в течение ~14 с игровых.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,300));_ce.apply(console,arguments);};}
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.E5=ZC.FIN.k5e;window.RES={};window.ALL=[];
window.MEAS=(n,o)=>{o=o||{};const e0=_errs.length;PR.reset();PR.start({perf:false});E5.goStage(n);ZC.G.manual=true;ZC.tick(190);
  const rows=[];let skipped=0;
  for(let k=0;k<(o.chunks||10);k++){let g=0;while(ZC.G.cine&&g<20){ZC.skip();ZC.tick(5);g++;}ZC.tick(60);const l=PR.pf.length;PR.measure();
    if(PR.pf.length>l){const p=PR.pf[PR.pf.length-1];rows.push([p.calls,p.tris,p.fx]);}}
  PR.stop();const c=rows.map(r=>r[0]).sort((a,b)=>a-b),t=rows.map(r=>r[1]).sort((a,b)=>a-b),f=rows.map(r=>r[2]);
  const q=(a,p)=>a.length?a[Math.min(a.length-1,Math.ceil(a.length*p)-1)]:0;
  const r={n:rows.length,p50:q(c,.5),p95:q(c,.95),max:c.length?c[c.length-1]:0,tri:Math.round(q(t,.95)/1000),fx:Math.max(0,...f)};
  RES[n]=r;ALL.push(...rows);
  if(_errs.length>e0)throw new Error('st'+n+' ошибки: '+_errs.slice(e0,e0+3).join(' / '));
  return 'st'+n+' '+JSON.stringify(r);};
'ok'
//@@
MEAS(0)
//@@
MEAS(1)
//@@
MEAS(2)
//@@
MEAS(3)
//@@
MEAS(4)
//@@
MEAS(5)
//@@
MEAS(6)
//@@
MEAS(7)
//@@
MEAS(8)
//@@
MEAS(9)
//@@
MEAS(10)
//@@
MEAS(11)
//@@
MEAS(12)
//@@
// потолок частиц: 300 искр разом на боссовом уровне — живых не больше 120 (bossfx.MAXFX)
ZC.FIN.k5e.goStage(2);ZC.G.manual=true;ZC.tick(60);const F=ZC.FIN;for(let i=0;i<6;i++)F.fx.sparks(new ZC.W.group.position.constructor(0,1,-8),60,0xffffff);
window.FXN=F.fx.list.length;ZC.tick(1);'частицы после залпа='+FXN+' (потолок '+F.bossfx.MAXFX+')'
//@@
const q=(a,p)=>{a=a.slice().sort((x,y)=>x-y);return a.length?a[Math.min(a.length-1,Math.ceil(a.length*p)-1)]:0;};
const c=ALL.map(r=>r[0]),fx=Math.max(0,...ALL.map(r=>r[2])),p95=q(c,.95);
const line='ИТОГ замеров='+c.length+' вызовы p50/p95/max='+q(c,.5)+'/'+p95+'/'+Math.max(0,...c)+' частицы пик='+fx+' залп='+FXN+' (нормы: p95 ≤ 450, частицы ≤ 120)';
if(c.length<100)throw new Error(line+' — замеров слишком мало');
if(p95>450)throw new Error(line+' — вызовы выше нормы');
if(fx>120||FXN>120)throw new Error(line+' — частиц больше 120');
line
