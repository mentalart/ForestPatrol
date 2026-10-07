//@@ wait=1500
// релиз final06: 1-Б «Леший-Путаник» — этап 2 «Ищи-свищи»: прятки двойников (late_99za_k1b_hide.js; docs/29_leshy_proposals.md, шаг 4).
// Вдвоём: двойники перебегают к ёлкам и выглядывают, меняются местами в клубах дыма, у настоящего мох-следы и золотой обруч Совиного взора, упавший настоящий лежит 6 с под звёздами,
// а прежняя ловушка со струной по-прежнему сбивает настоящего (круг засчитывается). Строка «//@@ shot=…» относится к шагу под ней: кадр снимается после него.
U.go();ZC.loadLevel(7);ZC.tick(60*2);ZC.skip();ZC.tick(60*2);window.W=ZC.W;window.K=ZC.FIN.k1b;window.D=K.hide;
W.bossNext();ZC.tick(60*3);ZC.skip();ZC.tick(60*3);
'phase='+W.flags.phase+' doubles='+W.doubles.length+' k2='+W.doubles.every(d=>!!d.k2)+' real='+W.doubles.findIndex(d=>d.real)+' rings='+W.doubles.map(d=>d.k2.ring+':'+d.k2.r).join(',')
//@@ shot=k1bd_obs.png
// прятки: за 40 секунд двойники бегут к ёлкам, приседают, выглядывают; меняются местами
window.modes={};window.maxFar=0;window.obs=function(sec){const C=K.cur.C;for(let i=0;i<60*sec;i++){ZC.tick(1);for(const d of W.doubles){if(d.state==='gone'||!d.k2)continue;modes[d.k2.mode]=(modes[d.k2.mode]||0)+1;maxFar=Math.max(maxFar,Math.hypot(d.pos.x-C.x,d.pos.z-C.z));}}};
const s0=D.swaps,h0=D.hides;obs(40);ZC.tick(1);'modes='+JSON.stringify(modes)+' hides+'+(D.hides-h0)+' swaps+'+(D.swaps-s0)+' maxFar='+maxFar.toFixed(1)+' prints='+(K.fx.prints?K.fx.prints.list.filter(q=>q.m.visible).length:0)
//@@ shot=k1bd_peek.png
// кадр: кто-то присел за ёлкой и выглядывает
let n=0;while(n<60*40&&!W.doubles.some(d=>d.k2&&d.k2.mode==='peek')){ZC.tick(1);n++;}ZC.tick(20);'peek after '+(n/60).toFixed(1)+'s'
//@@ shot=k1bd_swap.png
// кадр: два двойника присели в клубах дыма — обмен
let n=0;while(n<60*40&&!W.doubles.some(d=>d.k2&&d.k2.mode==='swap'&&d.k2.swapT>0.3)){ZC.tick(1);n++;}'swap after '+(n/60).toFixed(1)+'s'
//@@ shot=k1bd_owl.png
// кадр: мох-следы настоящего (идёт по кольцу уже давно) и обруч взора
ZC.tick(60*4);W.owlT=4;ZC.tick(25);const real=W.doubles.find(d=>d.real);const vis=W.doubles.filter(d=>d.k2&&d.k2.halo&&d.k2.halo.g.visible).map(d=>d.real);'prints='+K.fx.prints.list.filter(q=>q.m.visible).length+' halos='+JSON.stringify(vis)+' halo on real only='+(vis.length===1&&vis[0]===true)
//@@ shot=k1bd_fall.png
// упавший настоящий: звёзды над головой (state=fallen, как у уровня); кадр — через 1,2 с после падения
window.fd=W.doubles.find(d=>d.real);fd.state='fallen';fd.t=0;fd.m.body.rotation.x=-1.3;fd.m.g.position.y=0.3;ZC.tick(70);'stars='+(fd.k2.stars?fd.k2.stars.filter(s=>s.visible).length:0)
//@@
// сколько лежит: 6 с, как задумано (прежнее значение — 5)
let t=70;while(fd.state==='fallen'&&t<60*9){ZC.tick(1);t++;}'fallen lasted '+(t/60).toFixed(1)+'s state='+fd.state+' stars hidden='+(fd.k2.stars?fd.k2.stars.every(s=>!s.visible):'-')
//@@
// ловушка со струной, как в t1b: два круга; прятки её не ломают
window.ph2=function(){const st=W.stakes.find(s=>!s.used);const h=U.act(0);U.walkTo(0,st.x*0.25,-14+(st.z+14)*0.25,5);h.face=Math.atan2(st.x-h.pos.x,st.z-h.pos.z);ZC.tick(1);ZC.press('KeyR');ZC.tick(40);
 const th=W.threads.map(t=>t.owner+':'+(t.string?'S':'')+t.len.toFixed(1)).join(' ');U.tap('KeyQ');const r0=W.flags.round||0;
 let n=0,hits=0;while(n<60*90&&W.flags.phase===2&&(W.flags.round||0)===r0){n++;const f=W.doubles.find(d=>d.state==='fallen'&&d.real);const a=U.act(0);
   if(f){const d=Math.hypot(f.pos.x-a.pos.x,f.pos.z-a.pos.z);if(d>2.2){const B=['KeyA','KeyD','KeyW','KeyS'];const dx=f.pos.x-a.pos.x,dz=f.pos.z-a.pos.z;ZC.hold(B[0],dx<-0.3);ZC.hold(B[1],dx>0.3);ZC.hold(B[2],dz<-0.3);ZC.hold(B[3],dz>0.3);}
     else{['KeyA','KeyD','KeyW','KeyS'].forEach(k=>ZC.hold(k,false));a.face=Math.atan2(f.pos.x-a.pos.x,f.pos.z-a.pos.z);if(n%10==0){ZC.press('KeyF');hits++;}}}
   ZC.tick(1);}
 ['KeyA','KeyD','KeyW','KeyS'].forEach(k=>ZC.hold(k,false));U.tap('KeyQ');
 return 'th='+th+' '+(n/60).toFixed(1)+'s round='+W.flags.round+' hits='+hits+' left='+W.doubles.filter(d=>d.state!=='gone').length;};
W.doubles.forEach(d=>{if(d.state==='fallen'){d.state='walk';d.m.body.rotation.x=0;d.m.g.position.y=0;}});ph2()
//@@
ZC.tick(60*3);const rg=W.doubles.map(d=>d.k2?d.k2.ring+':'+d.k2.r:'-').join(',');const r=ph2()+' phase='+ZC.W.flags.phase+' rings2='+rg;r
