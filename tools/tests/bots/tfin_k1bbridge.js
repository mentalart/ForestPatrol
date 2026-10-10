//@@ wait=1500
// релиз final06: 1-Б «Леший-Путаник», этап 1 — пробитая рука ложится мостом на плечо: левая и правая, и обе сразу (раньше мост был один на двоих — второй убирал первый, рука «пропадала»).
// Строка «//@@ shot=…» относится к шагу под ней: кадр снимается после него.
U.go();ZC.loadLevel(7);ZC.tick(60*2);ZC.skip();ZC.tick(60*2);window.W=ZC.W;window.K=ZC.FIN.k1b;
window.hand=s=>W.enemies.find(e=>e.kind==='hand'&&e.side===s);
window.brk=s=>{const e=hand(s);e.embers=0;e.state='broken';e.t=0;e.bdur=8;};
window.br=s=>{const e=hand(s);return !!(e.k1bridge&&e.k1bridge.g.parent);};
window.info=()=>'L:'+hand(-1).state+(br(-1)?'/мост':'')+' R:'+hand(1).state+(br(1)?'/мост':'')+' ramps='+(W.ramps||[]).length+' arms='+K.cur.arms.map(a=>a.g.visible).join('/');
window.ok=[];info()
//@@ shot=k1bb_left.png
// левая рука в Пробое — мост левой
brk(-1);ZC.tick(30);ok.push(br(-1)&&!br(1)&&W.ramps.length===2);info()
//@@ shot=k1bb_both.png
// правая тоже в Пробое, пока левая лежит мостом: обе руки — мостами (у каждой своё плечо), рук-«пустышек» нет
brk(1);ZC.tick(30);ok.push(br(-1)&&br(1)&&W.ramps.length===4&&K.cur.arms.every(a=>!a.g.visible));info()
//@@
// по правому мосту можно взойти на плечо (площадка на плече — тоже на месте)
const h=U.act(0),r=W.ramps.filter(q=>q.x0>0&&q.y1>4),p=r[0];ok.push(!!p);
let top=0;if(p){h.pos.set(p.x0-p.dx*1.0,0,p.z0-p.dz*1.0);h.vel.set(0,0,0);ZC.tick(5);for(let i=1;i<=24&&top<4.5;i++){U.walkTo(0,p.x0+p.dx*p.len*i/24,p.z0+p.dz*p.len*i/24,2);top=Math.max(top,h.pos.y);}}
ok.push(top>4.5);'right ramp: top y='+top.toFixed(1)+' '+info()
//@@
// Пробой кончился — мосты убраны, руки вернулись
h=U.act(0);h.pos.set(0,0,-8);h.vel.set(0,0,0);ZC.tick(60*12);ok.push(!br(-1)&&!br(1)&&W.ramps.length===0);info()+' ok='+ok.map(x=>x?1:0).join('')
//@@ shot=k1bb_right.png
// только правая — мост правой
brk(1);ZC.tick(30);ok.push(br(1)&&!br(-1)&&W.ramps.length===2);'ok='+ok.map(x=>x?1:0).join('')+' '+info()
