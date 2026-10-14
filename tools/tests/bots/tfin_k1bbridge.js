//@@ wait=1500
// релиз final06: 1-Б «Леший-Путаник», этап 1 — пробитая рука ложится мостом на плечо: левая и правая, и обе сразу (раньше мост был один на двоих — второй убирал первый, рука «пропадала»).
// Рука не отваливается: в Пробое она остаётся на плече и сама опускается мостом к ладони на земле (раньше пропадала, а на землю ложилось отдельное бревно); «резинка» в покое достаёт до кисти и при перерастяжении.
// Пробитая ладонь сперва 0,4 с падает к тропе (late_99z_k1b_hands.js), потом ложится мост — шаги ждут по 60 кадров.
// Строка «//@@ shot=…» относится к шагу под ней: кадр снимается после него.
U.go();ZC.loadLevel(7);ZC.tick(60*2);ZC.skip();ZC.tick(60*2);window.W=ZC.W;window.K=ZC.FIN.k1b;
window.hand=s=>W.enemies.find(e=>e.kind==='hand'&&e.side===s);
window.brk=s=>{const e=hand(s);e.embers=0;e.state='broken';e.t=0;e.bdur=8;};
window.br=s=>{const e=hand(s);return !!(e.k1bridge&&e.k1bridge.g.parent);};
window.info=()=>'L:'+hand(-1).state+(br(-1)?'/мост':'')+' R:'+hand(1).state+(br(1)?'/мост':'')+' ramps='+(W.ramps||[]).length+' arms='+K.cur.arms.map(a=>a.g.visible).join('/');
window.V3=THREE.Vector3;window.ends=a=>{const f=s=>{const d=new V3(0,1,0).applyQuaternion(s.quaternion).multiplyScalar(s.scale.y/2);return [s.position.clone().sub(d),s.position.clone().add(d)];};return {top:f(a.u)[0],mid:f(a.u)[1],mid2:f(a.f)[0],end:f(a.f)[1]};};
// рука прикреплена: верх — у плеча Лешего, низ — у ладони (в мосту — у точки на земле под ней; в покое — у кисти), звенья сходятся в локте
window.attached=(s,bridge)=>{const e=hand(s),a=K.cur.arms.find(a=>a.side===s),L=K.cur.L,P=new V3(),Q=new V3();if(!a.g.visible)return 'скрыта';L.rig[s>0?'shL':'shR'].getWorldPosition(P);P.y-=0.2;const E=ends(a);
  let low;if(bridge){low=e.k1bridge.from.clone();low.y-=1.0;}else{low=new V3();e.L.wrist.getWorldPosition(low);}
  const dt=E.top.distanceTo(P),de=E.end.distanceTo(low),dm=E.mid.distanceTo(E.mid2);return (dt<0.3&&de<0.3&&dm<0.3)?true:'top='+dt.toFixed(2)+' end='+de.toFixed(2)+' mid='+dm.toFixed(2);};
window.ok=[];info()
//@@ shot=k1bb_left.png
// левая рука в Пробое — мост левой
brk(-1);ZC.tick(60);ok.push(br(-1)&&!br(1)&&W.ramps.length===2);info()
//@@ shot=k1bb_both.png
// правая тоже в Пробое, пока левая лежит мостом: обе руки — мостами (у каждой своё плечо), рук-«пустышек» нет
brk(1);ZC.tick(60);ok.push(br(-1)&&br(1)&&W.ramps.length===4&&K.cur.arms.every(a=>a.g.visible&&a.lay>0.95));ok.push(attached(-1,true)===true,attached(1,true)===true);info()+' attached='+attached(-1,true)+'/'+attached(1,true)
//@@
// по правому мосту можно взойти на плечо (площадка на плече — тоже на месте)
const h=U.act(0),r=W.ramps.filter(q=>q.x0>0&&q.y1>4),p=r[0];ok.push(!!p);
let top=0;if(p){h.pos.set(p.x0-p.dx*1.0,0,p.z0-p.dz*1.0);h.vel.set(0,0,0);ZC.tick(5);for(let i=1;i<=24&&top<4.5;i++){U.walkTo(0,p.x0+p.dx*p.len*i/24,p.z0+p.dz*p.len*i/24,2);top=Math.max(top,h.pos.y);}}
ok.push(top>4.5);'right ramp: top y='+top.toFixed(1)+' '+info()
//@@
// Пробой кончился — мосты убраны, руки вернулись
h=U.act(0);h.pos.set(0,0,-8);h.vel.set(0,0,0);ZC.tick(60*12);ok.push(!br(-1)&&!br(1)&&W.ramps.length===0&&K.cur.arms.every(a=>a.g.visible&&a.lay===0));ok.push(attached(-1)===true,attached(1)===true);info()+' ok='+ok.map(x=>x?1:0).join('')
//@@ shot=k1bb_right.png
// только правая — мост правой
brk(1);ZC.tick(60);ok.push(br(1)&&!br(-1)&&W.ramps.length===2);'ok='+ok.map(x=>x?1:0).join('')+' '+info()
//@@
// «резинка» в покое достаёт до кисти, как бы далеко ту ни утащили (дальше длины двух звеньев, 13,95 м)
brk(1);ZC.tick(1);for(const s of[-1,1]){const e=hand(s);e.state='idle';e.embers=e.maxEmb;}ZC.tick(60*12);
const far=[];for(const s of[-1,1]){const e=hand(s);e.pos.set(s*4,0,-8);e.home.set(s*4,0,-8);e.leash=40;ZC.tick(2);const P=new V3();K.cur.L.rig[s>0?'shL':'shR'].getWorldPosition(P);const w=new V3();e.L.wrist.getWorldPosition(w);far.push(s+':d='+P.distanceTo(w).toFixed(1)+' '+attached(s));}
ok.push(far.every(x=>/attached|true/.test(x)||x.endsWith('true')));'far='+far.join(' | ')+' ok='+ok.map(x=>x?1:0).join('')
