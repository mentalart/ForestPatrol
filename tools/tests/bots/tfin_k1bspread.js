//@@ wait=1500
// релиз final06: 1-Б «Леший-Путаник», этап 1 — руки-коряги не налезают друг на друга: левая ладонь держится левой половины поляны, правая — правой
// (между ними коридор у тропы), ладони не ближе 6 м, руки от плеч не перекрещиваются. И мост-рука в обычной драке: пробили ладонь — легла мостом на плечо, по ней — к макушке.
// Строка «//@@ shot=…» относится к шагу под ней: кадр снимается после него.
U.go();ZC.loadLevel(7);ZC.tick(60*2);ZC.skip();ZC.tick(60*2);window.W=ZC.W;window.K=ZC.FIN.k1b;
window.hand=s=>W.enemies.find(e=>e.kind==='hand'&&e.side===s);
window.M={n:0,minD:99,cross:0,side:0};
window.meas=()=>{const a=hand(-1),b=hand(1);if(!a||!b)return;M.n++;const d=Math.hypot(a.pos.x-b.pos.x,a.pos.z-b.pos.z);M.minD=Math.min(M.minD,d);if(a.pos.x>b.pos.x)M.cross++;if(a.pos.x>-2.4||b.pos.x<2.4)M.side++;};
window.fight=(sec,pull)=>{for(let i=0;i<sec*60;i++){if(pull&&i%60===0){for(const pi of[0,1]){const h=U.act(pi);h.pos.x+=(pull[pi]-h.pos.x)*0.5;}}U.brawl(1/60);meas();}};
window.rep=()=>'n='+M.n+' minD='+M.minD.toFixed(2)+' cross='+M.cross+' side='+M.side;
'start phase='+W.flags.phase+' hands='+W.enemies.filter(e=>e.kind==='hand').length
//@@ shot=k1bs_fight.png
// драка вдвоём у тропы: оба героя посередине — ладони не сходятся
fight(25,[0,0.5]);rep()
//@@
// оба героя на одном краю — дальняя ладонь не лезет через середину
fight(15,[-6,-5]);fight(15,[6,5]);rep()+' ok='+(M.minD>=5.8&&M.cross===0&&M.side===0)
//@@ shot=k1bs_bridge.png
// обычная драка до Пробоя — пробитая ладонь падает к тропе, на своё место, и рука ложится длинным пологим мостом (без принудительного Пробоя)
let n=0;while(n<60*90&&!W.enemies.some(e=>e.kind==='hand'&&e.state==='broken')){U.brawl(1/60);meas();n++;}
window.e=W.enemies.find(e=>e.kind==='hand'&&e.state==='broken');ZC.tick(40);
window.rp=(W.ramps||[]).find(q=>q.y1>4&&q.y0<1);
ok2=!!(e&&e.k1bridge&&e.k1bridge.g.parent&&rp&&Math.abs(e.pos.x-e.side*5)<0.3&&Math.abs(e.pos.z+12.5)<0.3&&rp.len>10);
'broken after '+(n/60).toFixed(1)+'s side='+(e&&e.side)+' at '+(e&&e.pos.x.toFixed(1)+','+e.pos.z.toFixed(1))+' bridge='+!!(e&&e.k1bridge)+' len='+(rp&&rp.len.toFixed(1))+' slope='+(rp&&(Math.atan2(rp.y1-rp.y0,rp.len)*57.3).toFixed(0))+' ok='+ok2
//@@
// по мосту — на плечо, удар по макушке: трофей (смахивание с моста здесь выключено — его проверяет tfin_k1bstage1)
K.cur.ramps.forEach(r=>{r.k1swDone=true;});const h0=W.flags.head||0,h=U.act(0),sh={x:e.side*2.4,z:-22.5};U.walkTo(0,rp.x0-rp.dx*1.2,rp.z0-rp.dz*1.2,4);let top=0;
for(let k=1;k<=10;k++){U.walkTo(0,rp.x0+rp.dx*rp.len*k/10,rp.z0+rp.dz*rp.len*k/10,2);top=Math.max(top,h.pos.y);}
U.walkTo(0,sh.x,sh.z,2);h.face=Math.atan2(0-h.pos.x,-24.2-h.pos.z);ZC.tick(1);ZC.press('KeyF');ZC.tick(24);
'top='+top.toFixed(1)+' head '+h0+'→'+W.flags.head+' ok='+(ok2&&W.flags.head>h0)
