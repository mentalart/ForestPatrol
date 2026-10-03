//@@
// 5-1: бюджет отрисовок по всему уровню (релиз, URLQ='&hq=1'): высадка, заводь, Голова, залив, луг, поляна, бой — общий экран ≤ 600, два экрана ≤ 900
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
const O=ZC.FIN.occ;O.fdt=0.05;window.RES=[];
window.m51=(name,fn)=>{if(fn)fn();for(let q=0;q<4&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}for(let q=0;q<10;q++){ZC.tick(30);if(ZC.G.cine){ZC.skip();ZC.tick(5);}}
  O.frame();O.frame();const s=ZC.FIN.stats(),split=ZC.G.split>0.5,lim=split?900:600;const ok=s.calls<=lim&&s.tris<=1.2e6;RES.push({name,ok});return name+(split?' [2]':' [1]')+' calls='+s.calls+' tris='+Math.round(s.tris/1000)+'k'+(ok?'':' !!');};
ZC.startFrom(ZC.LV('5-1'));ZC.G.manual=true;ZC.tick(20);[m51('start')]
//@@
const W=ZC.W;[m51('bay',()=>{U.walkTo(0,8,71,6);U.walkTo(1,9,68,6);}),m51('head',()=>W.warp51('head')),m51('lagoon',()=>W.warp51('lagoon')),m51('meadow',()=>W.warp51('meadow')),m51('glade',()=>W.warp51('glade')),m51('boss1',()=>W.warp51('boss1')),m51('boss3',()=>W.warp51('boss3'))]
//@@
[RES.filter(r=>!r.ok).map(r=>r.name).join(',')||'budget ok','errs='+window._errs.length]
