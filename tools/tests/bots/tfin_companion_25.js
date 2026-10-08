//@@ wait=1500
// релиз final06: напарник-бот проходит 2-5 «Китеж звонит» за Игрока 2 (Пелагея и Йоша): колокол на островке, колодец, нижняя и двойная звонницы, мосты-призраки, Светлояр, напев Садко,
// стычка и главный колокол. Человека (Игрок 1) играет скрипт.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.P=ZC.players;window.W=ZC.W;window.F=()=>ZC.W.flags;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.H=ZC.HERO;
window.KEYS=[{up:'KeyW',down:'KeyS',left:'KeyA',right:'KeyD',jump:'Space',swap:'KeyQ',skill:'KeyE',item:'KeyR',attack:'KeyF',guard:'KeyG'},{up:'ArrowUp',down:'ArrowDown',left:'ArrowLeft',right:'ArrowRight',jump:'KeyM',swap:'KeyK',skill:'KeyL',item:'Semicolon',attack:'Comma',guard:'Period'}];
window.ACT=(pi,kind)=>{for(let i=0;i<3&&U.act(pi).kind!==kind;i++){U.tap(KEYS[pi].swap);ZC.tick(6);}return U.act(pi).kind===kind;};
window.NOCINE=()=>{for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}};
window.CINE=(max)=>{let t=0;while(!ZC.G.cine&&t<(max||300)){ZC.tick(1);t++;}const was=!!ZC.G.cine;while(ZC.G.cine&&t<4000){ZC.skip();ZC.tick(5);t+=5;}return was;};
window.REL=pi=>{const K=KEYS[pi];[K.left,K.right,K.up,K.down].forEach(k=>ZC.hold(k,false));};
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1);
window.put=(h,x,z,y)=>{h.pos.set(x,(y||0)+0.4,z);h.vel.set(0,0,0);h.following=false;};
window.other=()=>ZC.HERO[bot().kind==='yosha'?'pelageya':'yosha'];
ZC.startFrom(ZC.LV('2-5'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(60);NOCINE();ZC.tick(10);window.W=ZC.W;CO.set(true);CO.skill=1;U.nocine();ZC.tick(30);
['me='+pos(me()),'bot='+pos(bot()),'mode='+CO.mode,'voice='+F().voice]
//@@
// колокол на островке: человек стоит у входа; бот (Пелагея) плывёт к островку, «кричит»; ролик — колокол тонет
const L=[];let last='';for(let i=0;i<60*40&&F().voice!=='sinking'&&F().voice!=='sunk';i++){ZC.tick(1);const m=CO.mode+'/'+F().voice;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}
L.push('voice='+F().voice,'bot='+pos(bot()),(F().voice==='sinking'||F().voice==='sunk')?'voice ok':'FAIL voice');L
//@@
// колодец: бот сам — оба героя в воду, отлив, на дно, звено (человек стоит на площади); ролик; прилив; наверх к решётке
let t=0;while(ZC.G.cine&&t<4000){ZC.skip();ZC.tick(5);t+=5;}ZC.tick(30);
const GW=ZC.W.waters.find(z=>z.minx===-9&&z.maxx===9&&z.minz===-26&&z.maxz===-8);const L=['voice='+F().voice+' GW='+GW.state];let last='';
for(let i=0;i<60*70&&!(F().given===true&&GW.state==='high'&&H.pelageya.pos.z<-27.2&&H.yosha.pos.z<-27.2);i++){ZC.tick(1);if(ZC.G.cine){let t0=0;while(ZC.G.cine&&t0<4000){ZC.skip();ZC.tick(5);t0+=5;}}const m=CO.mode+'/'+GW.state+'/'+F().given;if(m!==last||i%450===0){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' oth='+pos(other()));last=m;}}
L.push('given='+F().given,'GW='+GW.state,'pel='+pos(H.pelageya),'yos='+pos(H.yosha),(F().given===true&&H.pelageya.pos.z<-27.2&&H.yosha.pos.z<-27.2)?'well ok':'FAIL well');L
//@@
// низкая звонница: человек — отлив слева и рогатка Прошки (F.b1); бот — прилив справа, вплавь к колоколу, удар (F.b2); ступени растут
const L1=ZC.W.waters.find(z=>z.minx===-9&&z.maxx===-1&&z.minz===-44&&z.maxz===-30),R1=ZC.W.waters.find(z=>z.minx===1&&z.maxx===9&&z.minz===-44&&z.maxz===-30);
put(me(),-6,-29);put(bot(),0,-28.5);put(other(),1,-28);ZC.tick(10);const r=[];ACT(0,'proshka');
const L=[];let last='';for(let i=0;i<60*40&&!(F().b2);i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' R1='+R1.state);last=m;}}
r.push('b2='+F().b2,'R1='+R1.state,'bot='+pos(bot())+' '+CO.mode,F().b2?'tier1 ok':'FAIL tier1');r.concat(L)
//@@
// ступени растут (F.b1 — рогатка человека); бот поднимается следом; двойная звонница: человек — отлив слева и рогатка, бот — прилив справа и удар
F().b1=true;put(me(),0,-53,3);ZC.tick(5);const r=[];const L=[];let last='';
for(let i=0;i<60*25&&!(bot().pos.y>2.6&&bot().pos.z<-53);i++){ZC.tick(1);const m=CO.mode;if(m!==last||i%300===0){L.push('up '+(i/60).toFixed(0)+'s '+m+' '+pos(bot())+' st='+bot().pos.y.toFixed(1));last=m;}}
r.push('bot='+pos(bot()));
const DL=ZC.W.waters.find(z=>z.minx===-9&&z.maxx===-1&&z.minz===-68&&z.maxz===-56),DR=ZC.W.waters.find(z=>z.minx===1&&z.maxx===9&&z.minz===-68&&z.maxz===-56);
ACT(0,'proshka');put(me(),-7.5,-55.8,3);ZC.tick(5);U.tap('KeyR');ZC.tick(120);r.push('DL='+DL.state);put(me(),-5.5,-56.4,3);me().face=Math.PI;ZC.tick(5);
for(let i=0;i<60*40&&!F().b3;i++){if(F().dbR&&!F().dbL&&i%20===0){me().face=Math.PI;ZC.press('KeyE');}ZC.tick(1);const m=CO.mode;if(m!==last||i%450===0){L.push('t2 '+(i/60).toFixed(0)+'s '+m+' '+pos(bot())+' DR='+DR.state+' dbR='+F().dbR+' dbL='+F().dbL);last=m;}}
r.push('b3='+F().b3,'bot='+pos(bot()),F().b3?'tier2 ok':'FAIL tier2');r.concat(L)
//@@
// мосты-призраки: бот двумя героями переходит сам (один звонит и уступает, второй идёт; за провалом наоборот); потом звонит, а человек идёт по левому мосту
const D=ZC.W.warp25('ghost');ZC.tick(5);CINE(200);ZC.tick(30);CO.routes['2-5'].forEach(s=>{s.fin=false;});put(me(),-6,-76.8,6);put(bot(),3,-76.8,6);put(other(),4,-76.5,6);ZC.tick(10);
const r=[];const L=[];let last='';const c=q=>q.pos.z<-98.4&&q.pos.y>5;
for(let i=0;i<60*60&&!(c(H.pelageya)&&c(H.yosha));i++){ZC.tick(1);const m=CO.mode;if(m!==last||i%300===0){L.push('B '+(i/60).toFixed(0)+'s '+m+' '+pos(bot())+' oth='+pos(other())+' brR='+D.brR.solid+' brL='+D.brL.solid);last=m;}}
r.push('pel='+pos(H.pelageya),'yos='+pos(H.yosha));
// человек идёт по левому мосту, пока бот звонит в дальний
let crossed=false;ACT(0,'proshka');
for(let i=0;i<60*40&&!crossed;i++){const h=U.act(0);if(D.brL.solid){const K=KEYS[0];const dx=-4.6-h.pos.x,dz=-99.6-h.pos.z;ZC.hold(K.left,dx<-0.3);ZC.hold(K.right,dx>0.3);ZC.hold(K.up,dz<-0.3);ZC.hold(K.down,dz>0.3);}
  if(h.pos.z<-98.4&&h.pos.y>5)crossed=true;ZC.tick(1);const m=CO.mode;if(m!==last||i%300===0){L.push('L '+(i/60).toFixed(0)+'s '+m+' '+pos(bot())+' brL='+D.brL.solid+' me='+pos(me()));last=m;}}
REL(0);r.push('crossed='+crossed,'me='+pos(me()),(c(H.pelageya)&&c(H.yosha)&&crossed)?'bridges ok':'FAIL bridges');r.concat(L)
//@@
// Светлояр: человек встаёт на Феврониин камень (отражение), бот идёт по камням и встаёт на дальний камень; потом человек идёт по камням
const D=ZC.W.dbg25();const r=['oth='+pos(other()),'bot='+pos(bot())];const L=[];let last='';
put(me(),-6.6,-100.6,6);ZC.tick(20);r.push('look='+F().look);
for(let i=0;i<60*40&&!(bot().pos.z<-120.2&&Math.hypot(bot().pos.x-6.6,bot().pos.z+121.6)<1.2);i++){ZC.tick(1);const m=CO.mode;if(m!==last||i%300===0){L.push('B '+(i/60).toFixed(0)+'s '+m+' '+pos(bot())+' look='+F().look);last=m;}}
r.push('bot='+pos(bot()));
// человек по камням
const pts=D.STN.filter(s=>!s.side).map(s=>[s.x,s.z]).concat([[1.6,-121]]);r.push(U.walkTo(0,-1.5,-101.6,6),U.path(0,pts,4));
r.push('me='+pos(me()),(me().pos.z<-120.2&&me().pos.y>5)?'lake ok':'FAIL lake');r.concat(L)
//@@
// напев Садко: человек звонит жёлтый и розовый (слева), бот — синий и зелёный (справа), по порядку
const D=ZC.W.warp25('tune');ZC.tick(20);NOCINE();CO.routes['2-5'].forEach(s=>{s.fin=false;});put(me(),-5,-125,6);put(bot(),5,-125,6);put(other(),4,-124,6);ZC.tick(10);
const TB=D.TB,r=[];ACT(0,'proshka');r.push(U.walkTo(0,-5,-137.3+0.4,6));U.tap('KeyR');ZC.tick(10);r.push('i1='+D.TN.i);
const L=[];let last='';for(let i=0;i<60*8&&D.TN.i<2;i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}
r.push('i2='+D.TN.i);r.push(U.walkTo(0,-5,-127.3+0.4,6));U.tap('KeyR');ZC.tick(10);r.push('i3='+D.TN.i);
for(let i=0;i<60*8&&!F().tune;i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}
r.push('tune='+F().tune,'bot='+pos(bot()),F().tune?'tune ok':'FAIL tune');r.concat(L)
//@@
// главный колокол: стычка (бот и человек вместе), язык повешен (ролик), все четверо на круг, на «ТРИ» — прыжок; Китеж выходит из воды
window.FLOG=[];window.FIGHT1=(max)=>{const n=Math.round((max||30)*60);for(let i=0;i<n;i++){if(i%300===0)FLOG.push((i/60)+'s me='+pos(U.act(0))+' bot='+pos(bot())+' '+CO.mode+' en='+ZC.W.enemies.filter(e=>e.alive).map(e=>e.kind+':'+e.state+':'+(e.inf||0).toFixed(1)+'@'+e.pos.x.toFixed(0)+','+e.pos.z.toFixed(0)).join(' '));const alive=ZC.W.enemies.filter(e=>e.alive&&e.state!=='dying');if(!alive.length){REL(0);return 'cleared t='+(i/60).toFixed(1);}
  const h=U.act(0);let e=null,bd=99;for(const x of alive){const d=Math.hypot(x.pos.x-h.pos.x,x.pos.z-h.pos.z);if(d<bd){bd=d;e=x;}}const dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z,K=KEYS[0];
  const far=bd>1.6+e.r;ZC.hold(K.left,far&&dx<-0.3);ZC.hold(K.right,far&&dx>0.3);ZC.hold(K.up,far&&dz<-0.3);ZC.hold(K.down,far&&dz>0.3);
  if(ZC.W.bolts.some(b=>b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2))ZC.press('KeyG');const w=alive.find(x=>x.state==='wind'&&x.tgt===h);if(w){const left=w.wdur-w.t;if(w.sig==='red'){if(left<0.2)ZC.press('ShiftLeft');}else if(left<0.16&&w.left===null)ZC.press('KeyG');}
  if(!far&&((e.state==='stagger'&&!e.openHit)||e.state==='broken'||e.open>0||e.dazeT>0)&&i%9===0){h.face=Math.atan2(dx,dz);ZC.press('KeyF');}
  if(h.kind==='proshka'&&alive.some(x=>x.kind==='puzyr'&&x.inf>0.2)&&i%20===0)ZC.press('KeyE');ZC.tick(1);}REL(0);return 'TIMEOUT '+ZC.W.enemies.filter(e=>e.alive).map(e=>e.kind+':'+e.state).join();};
const D=ZC.W.warp25('bell'),F0=D.F;ZC.tick(20);NOCINE();CO.routes['2-5'].forEach(s=>{s.fin=false;});put(me(),-1,-148,6);put(bot(),1,-148,6);put(other(),2,-147.5,6);ZC.tick(10);ACT(0,'proshka');
const r=['arena='+D.arena.started];r.push(FIGHT1(60));r.push('cleared='+D.arena.cleared,'bot='+pos(bot())+' '+CO.mode,'alive='+ZC.W.enemies.filter(e=>e.alive).map(e=>e.kind).join());r
//@@
// главный колокол: язык повешен; человек ставит Прошку и Потапа на два места круга, бот — своих на два других (смена героя); на «ТРИ» — прыжок вместе; три раската — «Бом»
const D=ZC.W.dbg25(),F0=D.F;F0.tongueIn=true;ZC.tick(60);const MZ=ZC.W.waters.find(z=>z.minx===-6&&z.maxx===6&&z.minz===-156&&z.maxz===-146);const r=['MZ='+MZ.state];
ACT(0,'proshka');const sp=D.spots;const L=[];let last='';
put(ZC.HERO.proshka,sp[0].x,sp[0].z,6.3);put(ZC.HERO.potap,sp[1].x,sp[1].z,6.3);ZC.tick(5);
for(let i=0;i<60*70&&!(F0.bomWait||F0.bom);i++){ZC.tick(1);const C=F0.cnt;if(C&&C.t>=2.05&&C.t<2.3&&C.p[0]===null){ZC.press('Space');}const m=CO.mode;if(m!==last||i%450===0){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' oth='+pos(other())+' spots='+sp.map(s=>s.hero?s.hero.kind[0]:'-').join('')+' sw='+(C?C.sw:'-'));last=m;}}
r.push('bomWait='+F0.bomWait,'sw='+(F0.cnt&&F0.cnt.sw),'bot='+pos(bot()),(F0.bomWait||F0.bom)?'bell ok':'FAIL bell');r.concat(L)
//@@
let t=0;while(ZC.G.cine&&t<4000){ZC.skip();ZC.tick(5);t+=5;}ZC.tick(120);for(let k=0;k<6;k++){let t0=0;while(ZC.G.cine&&t0<4000){ZC.skip();ZC.tick(5);t0+=5;}ZC.tick(60);}
['lvl='+ZC.W.levelId,'done25='+ZC.G.done['2-5'],'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''),(ZC.W.levelId!=='2-5'||ZC.G.done['2-5'])&&!_errs.length?'2-5 ok':'FAIL 2-5']
//@@
