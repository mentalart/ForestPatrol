//@@ wait=1500
// @timeout=1200
// релиз final06: 1-Б «Леший-Путаник» — миньоны этапа 3 «Хоровод» (late_99zcd_k1b_mn3.js): корни-подножки и сорока-трещотка.
// Проверки: на дорожке перед бегущим — белый круг, встаёт корень; кто не прыгнул — корень держит (стоит на месте, скакалка не ранит), напарник выручает одним ударом,
// сам — тремя; прыжок над корнем — мимо; круг 2 — сорока: пикирует под красным кругом, не кувыркнулся — уносит виток (лента на стволе короче), кувырок — мимо, удар на подлёте — блестяшки;
// на «Тяни-потяни» корни уходят, сорока кружит; ошибок нет. Строка «//@@ shot=…» относится к шагу под ней: кадр снимается после него.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=999;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.K=ZC.FIN.k1b;window.MN=K.mn3;MN.auto=true;K.les.auto=false;U.go();ZC.loadLevel(7);ZC.tick(60*2);ZC.skip();ZC.tick(60*2);window.W=ZC.W;window.S=K.s3;
W.bossNext();ZC.tick(60*3);ZC.skip();ZC.tick(60*2);W.bossNext();ZC.tick(60*2);ZC.skip();ZC.tick(60*2);W.noPetals=true;
// герои — на дорожку хоровода, как бегущие (корень ставится перед бегущим по дорожке)
{const C=K.cur.C;[0,1].forEach(pi=>{const h=U.act(pi),a=pi?0.7:2.4;h.pos.set(C.x+Math.cos(a)*6,0,C.z+Math.sin(a)*6);h.vel.set(0,0,0);});}
'phase='+W.flags.phase+' st='+S.st+' round='+S.round
//@@ shot=k1bm3_tele.png
// первый корень: белый круг на дорожке
if(S.st!=='run')throw new Error('хоровод не начался st='+S.st);let n=0;while(!MN.roots.length&&n<60*10){ZC.tick(1);n++;}if(!MN.roots.length)throw new Error('корня нет');
window.r=MN.roots[0];ZC.tick(40);'root через '+(n/60).toFixed(1)+'с у игрока '+(r.pi+1)+' st='+r.st
//@@ shot=k1bm3_held.png
// корень встал — герой на нём, не прыгнул: держит; бежать не выходит, скакалка не ранит
while(r.st==='tele')ZC.tick(1);window.h=U.act(r.pi);h.pos.set(r.x,0,r.z);h.vel.set(0,0,0);ZC.tick(3);if(h.k1root!==r)throw new Error('корень не схватил героя');
const B=U.K[U.pk(r.pi)].B;ZC.hold(B[2],true);ZC.tick(40);ZC.hold(B[2],false);const moved=Math.hypot(h.pos.x-r.x,h.pos.z-r.z);if(moved>0.05)throw new Error('держит, а герой ушёл на '+moved.toFixed(2));
'held ok, сдвиг='+moved.toFixed(3)+' iT='+h.iT.toFixed(2)
//@@
// напарник бьёт по корню — выручил
const m=U.act(1-r.pi);m.pos.set(r.x+1.0,0,r.z);m.vel.set(0,0,0);m.face=Math.atan2(r.x-m.pos.x,r.z-m.pos.z);ZC.tick(1);ZC.press(U.K[U.pk(1-r.pi)].a);ZC.tick(10);
if(h.k1root||MN.st.freedBy<1)throw new Error('напарник не выручил '+JSON.stringify(MN.st));
// прыжок над корнем — мимо
let n=0;while(!MN.roots.some(q=>q.st==='up'&&!q.held)&&n<60*14){ZC.tick(1);n++;}const r2=MN.roots.find(q=>q.st==='up'&&!q.held);if(!r2)throw new Error('второго корня нет');
window.away=r=>{const C=K.cur.C,o=U.act(1-r.pi),a=Math.atan2(r.z-C.z,r.x-C.x)+Math.PI;o.pos.set(C.x+Math.cos(a)*6,0,C.z+Math.sin(a)*6);o.vel.set(0,0,0);};away(r2);   // второго — подальше: корень держит любого, кто на нём стоит
const h2=U.act(r2.pi);ZC.press(U.K[U.pk(r2.pi)].j);ZC.tick(12);const y2=h2.pos.y;h2.pos.x=r2.x;h2.pos.z=r2.z;ZC.tick(2);if(h2.k1root||MN.st.jumps<1)throw new Error('прыжок не спас y='+y2.toFixed(2)+' '+JSON.stringify(MN.st));
// сам: три удара
let k=0;while(!MN.roots.some(q=>q.st==='up'&&!q.held)&&k<60*14){ZC.tick(1);k++;}const r3=MN.roots.find(q=>q.st==='up'&&!q.held);away(r3);const h3=U.act(r3.pi);h3.pos.set(r3.x,0,r3.z);h3.vel.set(0,0,0);ZC.tick(3);
if(h3.k1root!==r3)throw new Error('третий корень не схватил');h3.face=Math.atan2(r3.x-h3.pos.x+0.01,r3.z-h3.pos.z);for(let i=0;i<8&&h3.k1root;i++){ZC.press(U.K[U.pk(r3.pi)].a);ZC.tick(20);}   // три удара (удары подряд — с паузой связки)
if(h3.k1root||MN.st.freedSelf<1)throw new Error('сам не вырвался '+JSON.stringify(MN.st));'корни: '+JSON.stringify(MN.st)
//@@ shot=k1bm3_dive.png
// круг 2: сорока пикирует к герою с витком — красный круг
S.onMah();let n=0;while(!(S.round===2&&S.st==='run')&&n<60*6){ZC.tick(1);n++;}let k=0;while(!MN.mag&&k<60*2){ZC.tick(1);k++;}if(!MN.mag)throw new Error('сороки нет на круге 2 st='+S.st+' round='+S.round);
window.give=pi=>{const i=pi;S.prog[i]=S.base[i]+Math.PI*2+0.4;};give(0);give(1);ZC.tick(2);window.o=MN.mag;MN.magCd=0;MN.roots.slice().forEach(q=>{q.t=99;});
let j=0;while(o.st!=='dive'&&j<60*4){ZC.tick(1);j++;}if(o.st!=='dive')throw new Error('сорока не пикирует st='+o.st);ZC.tick(45);'dive к игроку '+(o.tgt.player+1)+' laps='+S.laps.join(',')
//@@
// не кувыркнулся — виток унесён
const pi=o.tgt.player,l0=S.laps[pi],ph0=S.rb[pi].phi;let n=0;while(o.st==='dive'&&n<120){ZC.tick(1);n++;}ZC.tick(2);
if(MN.st.steals<1||!(S.laps[pi]<l0||S.rb[pi].phi<ph0))throw new Error('сорока не унесла виток: laps '+l0+'→'+S.laps[pi]+' phi '+ph0.toFixed(2)+'→'+S.rb[pi].phi.toFixed(2));
'унесла: laps '+l0+'→'+S.laps[pi]+' phi '+ph0.toFixed(1)+'→'+S.rb[pi].phi.toFixed(1)
//@@
// кувырок — мимо; удар на подлёте — блестяшки
const D=()=>({easy:1.5,mid:1.25,hard:1.1})[ZC.players[0].path]||1.25;window.nextDive=()=>{give(0);give(1);let n=0;while(o.st!=='circle'&&n<60*4){ZC.tick(1);n++;}MN.magCd=0;let k=0;while(o.st!=='dive'&&k<60*4){ZC.tick(1);k++;}return o.st==='dive';};
if(!nextDive())throw new Error('нет второго пике');while(o.st==='dive'&&o.t<D()-0.2)ZC.tick(1);ZC.press(U.K[U.pk(o.tgt.player)].r);let n=0;while(o.st==='dive'&&n<60){ZC.tick(1);n++;}
if(MN.st.rolls<1)throw new Error('кувырок не спас '+JSON.stringify(MN.st));
if(!nextDive())throw new Error('нет третьего пике');while(o.st==='dive'&&o.t<0.9)ZC.tick(1);const t=o.tgt;t.pos.set(o.hit.pos.x+0.3,0,o.hit.pos.z);t.face=Math.atan2(o.hit.pos.x-t.pos.x,o.hit.pos.z-t.pos.z);ZC.press(U.K[U.pk(t.player)].a);ZC.tick(4);
if(MN.st.swats<1)throw new Error('удар по сороке не сработал '+JSON.stringify(MN.st));'сорока: '+JSON.stringify(MN.st)
//@@ shot=k1bm3_pull.png
// «Тяни-потяни»: корни ушли, сорока кружит высоко
S.prog=S.base.map(b=>b+S.need*Math.PI*2+0.05);ZC.tick(3);if(S.st!=='pull')throw new Error('нет «Тяни-потяни» st='+S.st);ZC.tick(60*1.5);
if(MN.roots.some(q=>q.st!=='down')||(MN.mag&&MN.mag.st==='dive'))throw new Error('миньоны мешают «Тяни-потяни»: корней '+MN.roots.length+' сорока '+(MN.mag&&MN.mag.st));
if(_errs.length)throw new Error('ошибки: '+_errs.join(' | '));'pull чисто · '+JSON.stringify(MN.st)
