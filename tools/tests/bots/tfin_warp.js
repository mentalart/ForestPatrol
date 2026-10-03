//@@
// релиз final06: единая телепортация FIN.warp (late_95b_warp.js) — на каждом уровне с колокольчиками герои встают к последнему
// колокольчику (рядом, сразу после переноса — дальше сюжет уровня может их увести); у уровней с именованными участками FIN.warpList() их называет, FIN.warp('имя') переносит.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
const out=[],bad=[],moved=[];for(const L of ZC.LEVELS){if(L.zast)continue;try{ZC.startFrom(ZC.LV(L.id));ZC.G.manual=true;ZC.tick(20);U.nocine();ZC.tick(10);
  const W=ZC.W,n=(W.bells||[]).length,info=ZC.FIN.warpList();if(!n){out.push(L.id+':0');continue;}const b=W.bells[n-1];ZC.FIN.warp(n-1);
  // сам перенос: герои рядом с колокольчиком сразу после вызова
  const h=U.act(0),d=Math.hypot(h.pos.x-b.x,h.pos.z-b.z);if(d>3)bad.push(L.id+' d='+d.toFixed(1));
  // дальше уровень может увести героев сам (ограда арены, сцена) — только для сведения
  ZC.tick(3);const d3=Math.hypot(h.pos.x-b.x,h.pos.z-b.z);if(d3>4)moved.push(L.id);ZC.tick(20);U.nocine();out.push(L.id+':'+n+(info.names.length?'['+info.names.length+']':''));}
  catch(e){bad.push(L.id+' ERR '+e.message);}}
if(bad.length)throw new Error('warp: '+bad.join(' | '));out.join(' ')+(moved.length?' · уровень сам уводит героев: '+moved.join(','):'')
//@@
// именованный участок: 2-2 — макушка кита
ZC.startFrom(ZC.LV('2-2'));ZC.G.manual=true;ZC.tick(20);U.nocine();const L=ZC.FIN.warpList();if(!L.names.includes('crown'))throw new Error('нет crown: '+L.names.join(','));
ZC.FIN.warp('crown');ZC.tick(20);U.nocine();const z=U.act(0).pos.z;if(!(z<-400))throw new Error('не на макушке: z='+z.toFixed(1));
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'named ok crown z='+z.toFixed(1)+' names='+L.names.length+' errs=0'
