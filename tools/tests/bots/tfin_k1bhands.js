//@@ wait=1500
// релиз final06: 1-Б «Леший-Путаник» — этап 1, руки-коряги: поза → удар → окно (late_99z_k1b_hands.js; docs/29_leshy_proposals.md, шаг 3).
// Вдвоём: руки на учёте (привязь 6,5 м), бьют по очереди (никогда вместе), пауза между ударами ≥ 1,2 с, а после второго трофея — «Хлоп-хлоп» (≥ 0,25 с);
// левая — «Хлоп» (жёлтая, круг), правая — «Сгреб» (красная, веер); после не достигшего героя удара ладонь увязает (окно). Кадры: хлоп, сгреб, увязла.
// Строка «//@@ shot=…» относится к шагу под ней: кадр снимается после него.
U.go();ZC.loadLevel(7);ZC.tick(60*2);ZC.skip();ZC.tick(60*2);window.W=ZC.W;window.K=ZC.FIN.k1b;window.N=K.hands;
window.stat={overlap:0,gap1:[],gap2:[],atk:[],stuck:0};
window.watch=function(){const G=ZC.G;for(const e of W.enemies){if(e.kind!=='hand'||!e.alive)continue;const w=e._w||(e._w={p:e.state,s:false});
    if(w.p!==e.state){if(e.state==='ready'){const gap=G.time-N.atkAt;(W.flags.head>=2?stat.gap2:stat.gap1).push(+gap.toFixed(2));stat.atk.push(e.side<0?'L':'R');}w.p=e.state;}
    if(e.k1.stuck&&!w.s)stat.stuck++;w.s=e.k1.stuck;}
  if(W.enemies.filter(e=>e.kind==='hand'&&e.alive&&['ready','wind','strike'].includes(e.state)).length>1)stat.overlap++;};
window.fight=function(sec,cond){let n=0;while(n<60*sec&&!(cond&&cond())){U.brawl(1/60);watch();n++;}ZC.tick(2);return n/60;};
const hs=W.enemies.filter(e=>e.kind==='hand');'hands='+hs.map(e=>'leash='+e.leash+' side='+e.side+' sig='+e.signals+' k1='+!!e.k1+' r='+e.r).join(' | ')
//@@
// очерёдность: 60 секунд боя, до трофеев; руки в Пробое отходят и возвращаются
const t=fight(60);const mn=a=>a.length?Math.min(...a):'-';'t='+t.toFixed(0)+' attacks='+stat.atk.join('')+' overlap='+stat.overlap+' gap1min='+mn(stat.gap1)+' stuck='+stat.stuck+' petals='+ZC.players.map(p=>p.petals).join('/')
//@@
// после второго трофея — «Хлоп-хлоп»: паузы короче
W.flags.head=2;stat.gap2.length=0;stat.atk.length=0;const t=fight(50);const mn=a=>a.length?Math.min(...a):'-';'head=2 t='+t.toFixed(0)+' attacks='+stat.atk.join('')+' overlap='+stat.overlap+' gap2min='+mn(stat.gap2)+' gap2='+stat.gap2.slice(0,8).join(',')
//@@ shot=k1bh_clap.png
// «Хлоп»: жёлтая ладонь над головой, круг заполняется
W.flags.head=0;const t=fight(60,()=>W.enemies.some(e=>e.kind==='hand'&&e.state==='wind'&&e.sig==='yellow'&&e.t/e.wdur>0.65));const e=W.enemies.find(e=>e.kind==='hand'&&e.state==='wind'&&e.sig==='yellow');'clap t='+t.toFixed(1)+' '+(e?'k='+(e.t/e.wdur).toFixed(2)+' side='+e.side:'-')
//@@ shot=k1bh_sweep.png
// «Сгреб»: красная рука отведена в сторону, веер заполняется и заперт
const t=fight(60,()=>W.enemies.some(e=>e.kind==='hand'&&e.state==='wind'&&e.sig==='red'&&e.t/e.wdur>0.7));const e=W.enemies.find(e=>e.kind==='hand'&&e.state==='wind'&&e.sig==='red');'sweep t='+t.toFixed(1)+' '+(e?'k='+(e.t/e.wdur).toFixed(2)+' lock='+(e.k1.lock!=null):'-')
//@@ shot=k1bh_stuck.png
// после удара мимо — ладонь увязла: окно. Автобот защищается идеально, поэтому цель жёлтой руки в конце замаха отходит за край круга (промах); всё — в одном шаге (у красной кувырок засчитывается как «увернулся» — своё окно)
stat.stuck=0;let forced=null,n=0;while(n<60*60&&!forced){U.brawl(1/60);watch();n++;const e=W.enemies.find(e=>e.kind==='hand'&&e.state==='wind'&&e.sig==='yellow'&&e.t/e.wdur>0.8&&e.tgt&&e.embers>0);if(e){forced=e;e.tgt.pos.z+=8;e.tgt.vel.set(0,0,0);}}
let win=0,dz=0;for(let i=0;i<70;i++){ZC.tick(1);watch();if(forced&&forced.k1.stuck){win++;dz=Math.max(dz,forced.dazeT);}if(win>=10)break;}
'forced t='+(n/60).toFixed(1)+' stuckWindows='+stat.stuck+' framesInWindow='+win+' maxDazeT='+dz.toFixed(2)
