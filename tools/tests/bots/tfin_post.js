//@@ wait=3000
// релиз final07 (WebGPU): постобработка (gpu_late_20_post.js) — «среднее» и «высокое» качество на нескольких уровнях без ошибок:
// одиночный экран (1-1), сплит (1-2 — у каждой половины своя панель), лава (4-1 — свечение по излучению), ролик (1-Б —
// глубина резкости). Проверяет: уровень постобработки, число панелей, что кадр не пуст (средняя яркость центра — как без
// постобработки, ±15%), что глубина резкости в ролике набирается (наибольшая за ролик), список FIN_GPU.missing и консоль. Кадры — tools/tests/shots/post_*.png. На final06 бот сразу падает.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,300));ce(...a);};}
if(!window.FIN_GPU||!ZC.FIN.post)throw new Error('нет постобработки — это не final07');
window.P=ZC.FIN.post;window.GOl=id=>{ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.tick(30);for(let j=0;j<6;j++){for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}ZC.tick(15);}ZC.tick(60);
  const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}document.querySelectorAll('.tip,.say,#banner,.hn-card,[id^=obj],[id^=tip]').forEach(e=>e.style.visibility='hidden');return id;};
// средняя яркость центра кадра (кадр ботов — текстура FIN_GPU.offRT)
window.LUM=async()=>{await FIN_GPU.fresh();const r=FIN_GPU.renderer,R=FIN_GPU.offRT,w=320,h=180,x0=(R.width-w)>>1,y0=(R.height-h)>>1;
  const px=await r.readRenderTargetPixelsAsync(R,x0,y0,w,h);const row=px.length/h;let s=0;for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*row+x*4;s+=0.2126*px[i]+0.7152*px[i+1]+0.0722*px[i+2];}return s/(w*h);};
window.R={};'ok'
//@@ wait=1500
P.force=0;GOl('1-1')
//@@ wait=200
LUM().then(v=>{R.base=v;return 'base='+v.toFixed(1);})
//@@ shot=post_11_mid.png wait=1500
P.force=1;'mid'
//@@ wait=200
LUM().then(v=>{R.mid=v;return 'mid='+v.toFixed(1)+' lvl='+P.stats.lvl;})
//@@ shot=post_11_high.png wait=1500
P.force=2;'high'
//@@ wait=200
LUM().then(v=>{R.high=v;const bad=[];if(P.stats.lvl!==2)bad.push('lvl='+P.stats.lvl);for(const k of['mid','high'])if(Math.abs(R[k]-R.base)>R.base*0.15)bad.push(k+'='+R[k].toFixed(1)+' base='+R.base.toFixed(1));
  if(bad.length)throw new Error('1-1: '+bad.join(' '));return 'high='+v.toFixed(1)+' 1-1 ok';})
//@@ shot=post_12_split.png wait=1500
GOl('1-2')
//@@ wait=200
(()=>{const live=P.panes.filter(p=>P.frames-p.used<30);if(live.length<2||live.some(p=>p.w>=innerWidth))throw new Error('сплит: живых панелей '+live.map(p=>p.w+'x'+p.h).join(',')+' — нужны две половины');return 'split panes ok '+live.map(p=>p.w+'x'+p.h).join(',');})()
//@@ shot=post_41_lava.png wait=1500
GOl('4-1')
//@@ wait=200
LUM().then(v=>'lava lum='+v.toFixed(1))
//@@ shot=post_1b_cine.png wait=3000
ZC.startFrom(ZC.LV('1-B'));ZC.G.manual=false;window.DMAX=0;setInterval(()=>{if(ZC.G.cine)DMAX=Math.max(DMAX,P.dofK.value);},50);'cine='+!!ZC.G.cine
//@@
(()=>{const r={lvl:P.stats.lvl,panes:P.panes.length,frames:P.frames,dof:+DMAX.toFixed(2),missing:FIN_GPU.missing,errs:_errs.slice(0,4)};
  if(FIN_GPU.missing.length||_errs.length)throw new Error('ошибки: '+JSON.stringify(r));if(!(DMAX>0.3))throw new Error('в ролике нет глубины резкости: '+JSON.stringify(r));
  return 'post ok '+JSON.stringify(r);})()
