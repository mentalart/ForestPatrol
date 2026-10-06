//@@ wait=1500
// релиз final06: 1-Б «Леший-Путаник» — облик и арена (late_99x_k1b_leshy.js, late_99y_k1b_fx.js; docs/29_leshy_proposals.md, шаги 1–2).
// Вдвоём: вступление, этап 1 (замах ладони с заливкой, мост-рука, три трофея с головы), этап 2 (двойники в нарядах), детали этапа 3 (дорожка, скакалка, ленты, фонарики), рассвет.
// Строка «//@@ shot=…» относится к шагу под ней: кадр снимается после него. Проверки печатаются: модули живы (K1B.cur не обнулился), руки видны, трофеи слетают по одному,
// смена света, у двойников нет теней (кроме настоящего).
U.go();ZC.loadLevel(7);ZC.tick(60*5);const K=ZC.FIN.k1b,W=ZC.W;'cine='+!!ZC.G.cine+' lvl='+W.levelId+' k1b='+!!(K&&K.cur)+' fx='+!!(K&&K.fx&&K.fx.ctx)+' crowd='+(K.crowdL?K.crowdL.length:0)+' mood='+K.fx.name
//@@ shot=k1b_arena.png
ZC.skip();ZC.tick(60*2);const W=ZC.W,K=ZC.FIN.k1b;'phase='+W.flags.phase+' hands='+W.enemies.filter(e=>e.kind==='hand').map(e=>e.state+':r'+e.r.toFixed(2)+':s'+e.s+':wrist='+!!(e.L&&e.L.wrist)).join(',')+' arms='+K.cur.arms.map(a=>a.g.visible).join('/')
//@@ shot=k1b_wind.png
// бой до замаха ладони: заливка круга растёт вместе с замахом
const W=ZC.W;let n=0;while(n<60*40&&!W.enemies.some(e=>e.kind==='hand'&&e.state==='wind')){U.brawl(1/60);n++;}ZC.tick(14);
'wind after '+(n/60).toFixed(1)+'s '+W.enemies.filter(e=>e.kind==='hand').map(e=>e.state+':'+e.sig+':'+(e.t/e.wdur).toFixed(2)).join(',')+' teles='+ZC.FIN.k1b.fx.hT.size
//@@ shot=k1b_bridge.png
// первый Пробой руки — мост-рука
const W=ZC.W;let n=0;while(n<60*60&&!W.enemies.some(e=>e.state==='broken')){U.brawl(1/60);n++;}ZC.tick(40);
'broken after '+(n/60).toFixed(1)+'s ramps='+(W.ramps||[]).length+' bridge='+W.enemies.filter(e=>e.k1bridge).length+' arms='+ZC.FIN.k1b.cur.arms.map(a=>a.g.visible).join('/')
//@@ shot=k1b_trophy1.png
// на плечо и три удара по макушке — трофеи слетают по одному (рог, гнездо с птенцами, борода); кадр — через 0,4 с после удара
window.cycle=function(){const W=ZC.W;let n=0;while(n<60*60&&!W.enemies.some(e=>e.state==='broken'&&e.kind==='hand')){U.brawl(1/60);n++;}
  const e=W.enemies.find(e=>e.state==='broken');if(!e)return 'no break';const sh={x:e.side*2.4,z:-22.5};const h=U.act(0);const hx=e.pos.x,hz=e.pos.z;const lp=(a,b,t)=>a+(b-a)*t;
  U.walkTo(0,hx,hz+1.2,4);for(let k=1;k<=8;k++)U.walkTo(0,lp(hx,sh.x,k/8),lp(hz,sh.z,k/8),2);h.face=Math.atan2(0-h.pos.x,-24.2-h.pos.z);ZC.tick(1);ZC.press('KeyF');ZC.tick(24);
  return 'head='+W.flags.head;};
window.toHead=function(n){const W=ZC.W,K=ZC.FIN.k1b;let g=0;while((W.flags.head||0)<n&&W.flags.phase===1&&g<8){ZC.tick(60);cycle();g++;}
  const P=K.cur.L.parts;return 'head='+W.flags.head+' tries='+g+' lost='+JSON.stringify(K.cur.L.k1.lost)+' fly='+K.fly.length+' emo='+K.cur.L.k1.emo+' beard='+P.beard.visible;};
toHead(1)
//@@ shot=k1b_trophy2.png
toHead(2)
//@@ shot=k1b_trophy3.png
toHead(3)+' phase='+ZC.W.flags.phase
//@@ shot=k1b_s2.png
// этап 2: двойники в нарядах, ночь со светляками
ZC.tick(60*2);ZC.skip();ZC.tick(60*4);const W=ZC.W,K=ZC.FIN.k1b;'phase='+W.flags.phase+' mood='+K.fx.name+' doubles='+W.doubles.length+' real='+W.doubles.findIndex(d=>d.real)+' shadows='+W.doubles.map(d=>d.m.meshes.b?d.m.meshes.b.castShadow:'-').join('')
//@@ shot=k1b_s3demo.png
// детали этапа 3: дорожка, скакалка, ленты, витки, фонарики (через демонстрацию)
const W=ZC.W,K=ZC.FIN.k1b;W.doubles.forEach(d=>{d.state='gone';W.group.remove(d.m.g);});W.flags.phase=3;const D=K.fx.demo(true);
ZC.HERO.proshka.pos.set(-4.5,0,-10);ZC.HERO.pelageya.pos.set(4.5,0,-12);ZC.tick(60*3);'demo='+!!D+' lamps='+K.fx.lamps.filter(l=>l.on).length
//@@ shot=k1b_dawn.png
// финал: рассвет
const W=ZC.W,K=ZC.FIN.k1b;K.fx.demo(false);W.flags.won=true;ZC.tick(60*5);'mood='+K.fx.name+' ok='+!!K.cur
