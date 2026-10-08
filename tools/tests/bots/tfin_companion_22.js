//@@ wait=1500
// релиз final06: напарник-бот проходит 2-2 «Рыба-кит» за Игрока 2 (Пелагея и Йоша): хвост, забор и огород (лаз и калитка Йоши), фонтан дыхания, деревня (Совиный взор, пруд, печка),
// бока (Йоша лечит раны), губа, хоровод, дубрава (Совиный взор), колыбельная. Человека (Игрок 1) играет скрипт.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.P=ZC.players;window.W=ZC.W;window.F=()=>ZC.W.flags;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.H=ZC.HERO;
window.KEYS=[{up:'KeyW',down:'KeyS',left:'KeyA',right:'KeyD',jump:'Space',attack:'KeyF',guard:'KeyG',swap:'KeyQ',skill:'KeyE',item:'KeyR'},{up:'ArrowUp',down:'ArrowDown',left:'ArrowLeft',right:'ArrowRight',jump:'KeyM',attack:'Comma',guard:'Period',swap:'KeyK',skill:'KeyL',item:'Semicolon'}];
window.ACT=(pi,kind)=>{for(let i=0;i<3&&U.act(pi).kind!==kind;i++){U.tap(KEYS[pi].swap);ZC.tick(6);}return U.act(pi).kind===kind;};
window.NOCINE=()=>{for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}};
window.REL=pi=>{const K=KEYS[pi];[K.left,K.right,K.up,K.down].forEach(k=>ZC.hold(k,false));};
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1);
window.put=(h,x,z,y)=>{h.pos.set(x,(y||0)+0.4,z);h.vel.set(0,0,0);h.following=false;};
window.other=()=>ZC.HERO[bot().kind==='yosha'?'pelageya':'yosha'];
ZC.startFrom(ZC.LV('2-2'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(60);NOCINE();ZC.tick(30);NOCINE();window.W=ZC.W;CO.set(true);CO.skill=1;U.nocine();ZC.tick(30);
['me='+pos(me()),'bot='+pos(bot()),'mode='+CO.mode]
//@@
// хвост: человек (Потап) валит сосну и переходит трещину; бот идёт следом (оба героя)
const D=ZC.W.dbg22();ACT(0,'potap');const r=[U.walkTo(0,4.2,33.8,6)];U.tap('KeyE');ZC.tick(100);r.push('log='+D.F.log);
r.push(U.walkTo(0,0,31,5),U.walkTo(0,0,23.5,6));const L=[];let last='';for(let i=0;i<60*30&&!(H.pelageya.pos.z<29&&H.yosha.pos.z<29);i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}
L.push('pel='+pos(H.pelageya),'yos='+pos(H.yosha),(H.pelageya.pos.z<29&&H.yosha.pos.z<29)?'tail ok':'FAIL tail');r.concat(L)
//@@
// забор: вода общая — человек стоит в стороне, бот сам просит прилив у ракушки и плывёт через забор (оба героя)
const D=ZC.W.warp22('yard');ZC.tick(20);NOCINE();put(me(),-3,1);put(bot(),2,2);put(other(),3,1.5);ZC.tick(10);
const Z1=ZC.W.waters.find(z=>z.minz===-22.2&&z.maxz===-7);const L=[];let last='';for(let i=0;i<60*60&&!(H.pelageya.pos.z<-24&&H.yosha.pos.z<-24);i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' Z1='+Z1.state);last=m;}if(i%300===0)L.push((i/60)+' '+pos(bot())+' '+pos(other())+' Z1='+Z1.state);}
L.push('pel='+pos(H.pelageya),'yos='+pos(H.yosha),(H.pelageya.pos.z<-24&&H.yosha.pos.z<-24)?'fence ok':'FAIL fence');L
//@@
// огород: бот (Йоша) в отлив пролезает в лаз и встаёт на плиту; человек потом плывёт к мачте (прилив), дёргает верёвку, в отлив Потап поднимает кувшин; ворота — оба
const D=ZC.W.dbg22();const Z2=ZC.W.waters.find(z=>z.minz===-50&&z.maxz===-25.5);put(me(),9,-26.5);ZC.tick(5);
const L=[];let last='';for(let i=0;i<60*60&&!F().garden;i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' Z2='+Z2.state);last=m;}}
L.push('garden='+F().garden,'bot='+pos(bot()),'Z2='+Z2.state,F().garden?'plate ok':'FAIL plate');L
//@@
// человек: прилив (просьба у ракушки), вплавь к гнезду, верёвка; потом отлив — Потап поднимает кувшин
const Z2=ZC.W.waters.find(z=>z.minz===-50&&z.maxz===-25.5);const r=[];ACT(0,'proshka');put(me(),-2,-27);ZC.tick(5);U.tap('KeyR');ZC.tick(200);r.push('Z2='+Z2.state);
r.push(U.walkTo(0,-4.5,-33,8,(h)=>{}),U.walkTo(0,-6.5,-35,6,(h)=>{if(h.grounded)ZC.press('Space');}));
r.push('mast_y='+me().pos.y.toFixed(1));ZC.HERO.proshka.face=0;for(let k=0;k<5&&!F().mast;k++){U.tap('KeyF');ZC.tick(20);}r.push('mast='+F().mast);
r.concat(['bot='+pos(bot())])
//@@
// отлив (просьба человека), Потап поднимает кувшин; ворота открываются; человек идёт к фонтану, бот (оба героя) следом
const Z2=ZC.W.waters.find(z=>z.minz===-50&&z.maxz===-25.5);const r=[];ACT(0,'proshka');U.tap('KeyR');ZC.tick(200);r.push('Z2='+Z2.state);
for(const e of ZC.W.enemies)if(e.pi===0&&e.alive){e.alive=false;e.state='dying';ZC.W.group.remove(e.g);}
ACT(0,'potap');put(ZC.HERO.potap,-2.5,-28);ZC.tick(5);r.push(U.walkTo(0,-3.2,-42,8));U.tap('KeyE');ZC.tick(60);r.push('jug='+F().jug);
r.push(U.walkTo(0,-3,-47,8),U.walkTo(0,0,-56,8));
const L=[];let last='';for(let i=0;i<60*50&&!(H.pelageya.pos.z<-51.5&&H.yosha.pos.z<-51.5);i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' Z2='+Z2.state);last=m;}if(i%300===0)L.push((i/60)+' '+pos(bot())+' '+pos(other()));}
L.push('pel='+pos(H.pelageya),'yos='+pos(H.yosha),(H.pelageya.pos.z<-51.5&&H.yosha.pos.z<-51.5)?'yard ok':'FAIL yard');r.concat(L)
//@@
// фонтан дыхания: бот сам просит прилив, оба героя поочерёдно встают на дыру на выдохе — до облаков; человек стоит в стороне
const D=ZC.W.warp22('village');ZC.tick(20);NOCINE();put(me(),8,-55);put(bot(),-2,-55);put(other(),-1,-54.5);CO.routes['2-2'].forEach(s=>{s.fin=false;});ZC.tick(10);ZC.W.flags.pikeFree=false;
const Z3=D.Z3;const L=['step='+(CO.step()&&CO.step().id),'garden='+F().garden,'mast='+F().mast,'Z3 req='+JSON.stringify(Z3.req)+' t='+Z3.t];let last='';for(let i=0;i<60*70&&!(H.pelageya.pos.z<-72&&H.yosha.pos.z<-72);i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' Z3='+Z3.state);last=m;}if(i%300===0)L.push((i/60)+' '+pos(bot())+' '+pos(other()));}
L.push('pel='+pos(H.pelageya),'yos='+pos(H.yosha),(H.pelageya.pos.z<-72&&H.yosha.pos.z<-72)?'fountain ok':'FAIL fountain');L
//@@
// деревня: человек — Потап поднимает ведра; бот просит прилив и подсвечивает щуку Совиным взором; потом печка: оба вскакивают, едем
window.BOARD=(pi,max)=>{const D=ZC.W.dbg22(),K=KEYS[pi];for(let i=0;i<(max||6)*60;i++){const h=U.act(pi);if(h.groundRef===D.STV.col){REL(pi);return 't='+(i/60).toFixed(2);}
    const dx=D.STV.x-h.pos.x,dz=D.STV.z-h.pos.z,d=Math.hypot(dx,dz);ZC.hold(K.left,dx<-0.2);ZC.hold(K.right,dx>0.2);ZC.hold(K.up,dz<-0.2);ZC.hold(K.down,dz>0.2);if(h.grounded&&d<2.3)ZC.press(K.jump);ZC.tick(1);}REL(pi);return 'TIMEOUT';};
const D=ZC.W.warp22('village');ZC.tick(20);NOCINE();CO.routes['2-2'].forEach(s=>{s.fin=false;});
const wrong=D.BUCK.find(b=>!b.pike),pk=D.BUCK[D.PIKE_AT];put(ZC.HERO.potap,wrong.x+(wrong.x<0?1.3:-1.3),wrong.z+0.1,4.5);put(me(),0,-78,4.5);ZC.tick(5);ACT(0,'potap');ZC.tick(5);
const r=[];const Lg=[];let last='';
// ждём, пока бот наполнит пруд (просьба)
for(let i=0;i<60*30&&D.PZ.state!=='high';i++){ZC.tick(1);const m=CO.mode;if(m!==last){Lg.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' PZ='+D.PZ.state);last=m;}}
r.push('PZ='+D.PZ.state,'owl='+ZC.W.owlT.toFixed(1));
r.push(U.walkTo(0,wrong.x+(wrong.x<0?1.3:-1.3),wrong.z,6));U.tap('KeyE');ZC.tick(60);r.push('wrong tipped='+wrong.tipped);
r.push(U.walkTo(0,pk.x+(pk.x<0?1.3:-1.3),pk.z,8));const ow=[];for(let q=0;q<6;q++){ZC.tick(30);ow.push(W.owlT.toFixed(1)+'/'+CO.mode+'/'+bot().kind);}r.push('owl '+ow.join(' '),'glow='+pk.glow.material.opacity.toFixed(2));U.tap('KeyE');ZC.tick(10);r.push('pikeFree='+F().pikeFree);
let t=0;while(ZC.G.cine&&t<3000){ZC.skip();ZC.tick(5);t+=5;}t=0;while(D.STV.state!=='wait'&&t<900){ZC.tick(1);t++;}r.push('stove='+D.STV.state);
ACT(0,'proshka');put(me(),-1.5,-98.5,4.5);ZC.tick(5);r.push('board me='+BOARD(0,10));let rt=0;for(;rt<60*10&&D.STV.state!=='ride';rt++)ZC.tick(1);r.push('state='+D.STV.state+' bot='+pos(bot())+' '+CO.mode);
r.concat(Lg)
//@@
// езда: человек стоит на печке, на волне держит щит, раки — драка; бот — свой герой на печке
const D=ZC.W.dbg22();const L=[];let last='';
for(let i=0;i<60*130&&D.STV.state!=='done';i++){const S=D.STV;const h=U.act(0);const wv=S.wave,g=!!wv&&wv.t>-0.7&&wv.t<1.3;ZC.hold('KeyG',g);
  if(h.groundRef!==S.col){const K=KEYS[0],dx=S.x-h.pos.x,dz=S.z-h.pos.z,d=Math.hypot(dx,dz);ZC.hold(K.left,dx<-0.2);ZC.hold(K.right,dx>0.2);ZC.hold(K.up,dz<-0.2);ZC.hold(K.down,dz>0.2);if(h.grounded&&d<2.3)ZC.press(K.jump);}else REL(0);
  const crab=S.crabs.find(e=>e.alive&&Math.hypot(e.pos.x-S.x,e.pos.z-S.z)<5);if(crab&&h.groundRef===S.col&&i%12===0){h.face=Math.atan2(crab.pos.x-h.pos.x,crab.pos.z-h.pos.z);ZC.press('KeyF');}
  ZC.tick(1);const m=CO.mode+'/'+(bot().groundRef===S.col?'on':'off');if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' s='+S.s.toFixed(0));last=m;}}
ZC.hold('KeyG',false);REL(0);L.push('state='+D.STV.state,'bot='+pos(bot()),D.STV.state==='done'?'stove ok':'FAIL stove');L
//@@
// идти к точке; jumpIf(h) — прыгнуть, если пора
window.STEP=(pi,x,z,jumpIf)=>{const K=KEYS[pi],h=U.act(pi),dx=x-h.pos.x,dz=z-h.pos.z,far=Math.hypot(dx,dz)>0.4;ZC.hold(K.left,far&&dx<-0.2);ZC.hold(K.right,far&&dx>0.2);ZC.hold(K.up,far&&dz<-0.2);ZC.hold(K.down,far&&dz>0.2);if(jumpIf&&jumpIf(h))ZC.press(K.jump);return !far;};
// по рёбрам: дойти до ребра i (ступать, когда сошлось с тем, где стоишь)
window.RIBTO=(pi,i,x,max)=>{const D=ZC.W.dbg22();for(let t=0;t<(max||14)*60;t++){const h=U.act(pi),R=D.RIB[i];if(h.groundRef===R.col&&h.grounded&&Math.abs(h.pos.x-x)<0.6){REL(pi);return 't='+(t/60).toFixed(1);}
    const cur=D.RIB.find(q=>h.groundRef===q.col);const tz=R.z+0.6,gap=cur?Math.abs(cur.z-R.z)-3.0:1;const near=Math.abs(h.pos.z-tz)<1.3;
    if(h.prilip&&t%30===0)ZC.press(pi?'Slash':'ShiftLeft');
    if(cur&&cur!==R&&gap>2.6){STEP(pi,x,h.pos.z);REL(pi);STEP(pi,x,cur.z+(R.z<cur.z?-1.0:1.0));}else STEP(pi,x,tz,hh=>hh.grounded&&(hh.groundRef!==R.col)&&(cur?!near&&gap<2.6:true));ZC.tick(1);}
  REL(pi);return 'TIMEOUT@'+U.act(pi).pos.toArray().map(v=>v.toFixed(1));};
window.HOP=(pi,x,z,max)=>{for(let t=0;t<(max||8)*60;t++){if(STEP(pi,x,z,hh=>hh.grounded&&hh.blocked)){REL(pi);return 't='+(t/60).toFixed(1);}ZC.tick(1);}REL(pi);return 'TIMEOUT@'+U.act(pi).pos.toArray().map(v=>v.toFixed(1));};
window.RIBSEQ=(pi,i,x,max)=>{const D=ZC.W.dbg22();let out='';for(let j=0;j<=i;j++){if(D.RIB[j].z0>U.act(pi).pos.z+1.6)continue;out=RIBTO(pi,j,j===i?x:0,max);if(out.startsWith('TIMEOUT'))return 'r'+j+out;}return out;};
// бока: человек (Потап) идёт по рёбрам и выдёргивает колья; бот-Йоша лечит раны; прилипалы — отдельно
const D=ZC.W.warp22('ribs');ZC.tick(20);NOCINE();CO.routes['2-2'].forEach(s=>{s.fin=false;});put(me(),0,-141,4.5);put(bot(),2,-141,4.5);put(other(),-2,-141,4.5);ZC.tick(10);
ACT(0,'potap');const r=[];const L=[];let last='';
for(const P of D.PALS){const i=P.R.i;r.push('p'+i+':'+RIBSEQ(0,i,2.6,25));let k=0;for(;k<600&&!P.pulled;k++){const h=U.act(0);h.face=Math.PI;if(h.prilip&&k%30===15)ZC.press('ShiftLeft');if(k%50===0)U.tap('KeyE');if(k%200===199)r.push('re'+RIBSEQ(0,i,2.6,10));ZC.tick(1);}r.push('pulled='+P.pulled);
  let k2=0;for(;k2<60*25&&!P.healed;k2++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push(i+':'+(k2/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}
  r.push('h'+i+'='+P.healed);if(!P.pulled||!P.healed)break;}
r.push('bot='+pos(bot()),'healed='+D.RB.healed,D.RB.healed===3?'ribs heal ok':'FAIL ribs heal');r.concat(L)
//@@
// бока: человек идёт дальше по рёбрам до конца, бот (оба героя) следом
const D=ZC.W.dbg22();let t=0;while(ZC.G.cine&&t<3000){ZC.skip();ZC.tick(5);t+=5;}ZC.tick(30);
const r=[];put(me(),-1,-190,4.5);const L=[];let last='';for(let i=0;i<60*40&&!(H.pelageya.pos.z<-186&&H.yosha.pos.z<-186);i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' '+pos(other()));last=m;}if(i%300===0)L.push((i/60)+' '+pos(bot())+' '+pos(other()));}
L.push('pel='+pos(H.pelageya),'yos='+pos(H.yosha),'me='+pos(me()),(H.pelageya.pos.z<-186&&H.yosha.pos.z<-186)?'ribs ok':'FAIL ribs');r.concat(L)
//@@
// губа: человек (Прошка) бьёт первый жёлудь и сбивает высокий рогаткой; бот бьёт второй; кит зевает — бот у плуга; плетень открыт
const D=ZC.W.warp22('lip');ZC.tick(20);NOCINE();CO.routes['2-2'].forEach(s=>{s.fin=false;});put(me(),-1,-210,4.5);put(bot(),2,-210,4.5);put(other(),3,-209,4.5);ZC.tick(10);ACT(0,'proshka');
const B=D.BARN;const L=[];let last='';
for(let i=0;i<60*90&&!D.F.plough;i++){const h=U.act(0);if(!B[0].gone){const b=B[0];STEP(0,b.x+1.3,b.z+0.8);if(Math.hypot(h.pos.x-b.x,h.pos.z-b.z)<2&&i%12===0){h.face=Math.atan2(b.x-h.pos.x,b.z-h.pos.z);U.tap('KeyF');}}
  else if(B[1].gone&&!B[2].gone){STEP(0,-4,-246);if(Math.hypot(h.pos.x+4,h.pos.z+246)<1.2&&i%40===0){h.face=Math.atan2(B[2].x-h.pos.x,B[2].z-h.pos.z);U.tap('KeyE');}}else REL(0);
  ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' yw='+D.YW.ph);last=m;}}
REL(0);L.push('plough='+D.F.plough,'gone='+B.map(b=>b.gone).join(),'bot='+pos(bot()),D.F.plough?'lip ok':'FAIL lip');L
//@@
// между глаз: хоровод — человек и бот становятся на камушки своего цвета, пока горят
const D=ZC.W.warp22('eyes');ZC.tick(20);NOCINE();CO.routes['2-2'].forEach(s=>{s.fin=false;});put(bot(),2,-272,4.5);put(other(),3,-271,4.5);const r=[U.walkTo(0,-1,-277,8)];
const L=[];let last='';for(let i=0;i<60*70&&!D.DC.done;i++){const S=D.DC.stones.find(q=>q.lit===0);if(S)STEP(0,S.x,S.z);ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}
REL(0);L.push('done='+D.DC.done,'score='+D.DC.score,'bot='+pos(bot()),D.DC.done?'eyes ok':'FAIL eyes');r.concat(L)
//@@
// дубрава: человек стоит у входа, бот (Пелагея) светит Совиным взором и собирает боровики сам
const D=ZC.W.warp22('grove');ZC.tick(20);NOCINE();CO.routes['2-2'].forEach(s=>{s.fin=false;});put(me(),-1,-309,4.5);put(bot(),2,-309,4.5);put(other(),3,-308,4.5);ZC.tick(10);
const L=['step='+(CO.step()&&CO.step().id),'owlT='+W.owlT,'abil='+JSON.stringify(W.abil),'seen='+D.MUSH.filter(q=>q.real).map(q=>q.seen).join()];let last='';for(let i=0;i<60*120&&!D.GR.done;i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' got='+D.GR.got);last=m;}}
L.push('done='+D.GR.done,'got='+D.GR.got,'bot='+pos(bot()),D.GR.done?'grove ok':'FAIL grove');L
//@@
// макушка: колыбельная. Человек — первая и третья ракушки, бот — вторая и четвёртая
const D=ZC.W.warp22('head');ZC.tick(20);NOCINE();CO.routes['2-2'].forEach(s=>{s.fin=false;});put(me(),-1,-360,4.5);put(bot(),2,-360,4.5);put(other(),3,-359,4.5);ZC.tick(10);ACT(0,'proshka');
const r=[U.walkTo(0,-1,-364,10)];let t=0;while(!ZC.G.cine&&t<300){ZC.tick(1);t++;}r.push('dive='+D.FN.dive);NOCINE();ZC.tick(60);
const S=D.lulShells,LS=D.LS;const SPOT=i=>[S[i].x*0.86,S[i].z+(i===2?-0.6:i===3?0.6:0)];
const ON=(pi,i)=>{const [x,z]=SPOT(i),h=U.act(pi);if(Math.hypot(h.pos.x-x,h.pos.z-z)<0.9&&Math.abs(h.pos.y-8.5)<0.6){REL(pi);return true;}STEP(pi,x,z,hh=>hh.grounded&&hh.pos.y<8.3);return false;};
r.push('stage='+LS.stage+' me='+pos(me())+' bot='+pos(bot()));
const L=[];let last='';
// куплет 1
for(let i=0;i<60*60&&LS.stage<2&&!ZC.G.cine;i++){if(ON(0,0)&&Math.abs(LS.bt-0.7*LS.per)<0.1&&ZC.G.time-S[0].ref.press>1)ZC.press(KEYS[0].item);ZC.tick(1);const m=CO.mode;if(m!==last){L.push('v1 '+(i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}
REL(0);r.push('v1 stage='+LS.stage+' lines='+LS.lines);
// куплет 2: бот светит взором; человек ловит звёздочки
for(let i=0;i<60*60&&LS.stage<3&&!ZC.G.cine;i++){const h=U.act(0),vis=D.STARS.filter(q=>!q.got&&q.seen>0).sort((a,b)=>Math.hypot(a.g.position.x-h.pos.x,a.g.position.z-h.pos.z)-Math.hypot(b.g.position.x-h.pos.x,b.g.position.z-h.pos.z))[0];
  if(vis){const x=vis.g.position.x,z=vis.g.position.z;STEP(0,x,z,hh=>hh.grounded&&Math.hypot(x-hh.pos.x,z-hh.pos.z)<0.7);}else REL(0);ZC.tick(1);const m=CO.mode;if(m!==last){L.push('v2 '+(i/60).toFixed(0)+'s '+m+' '+pos(bot())+' got='+LS.got);last=m;}}
REL(0);r.push('v2 stage='+LS.stage+' got='+LS.got);
r.concat(L)
//@@
// куплет 3: четыре голоса — человек (ракушки 0 и 2) и бот (1 и 3), каждый: сыграл, сменил героя, второй играет вторую; кит засыпает
const D=ZC.W.dbg22(),S=D.lulShells,LS=D.LS;const SPOT=i=>[S[i].x*0.86,S[i].z+(i===2?-0.6:i===3?0.6:0)];
const ON=(pi,i)=>{const [x,z]=SPOT(i),h=U.act(pi);if(Math.hypot(h.pos.x-x,h.pos.z-z)<0.9&&Math.abs(h.pos.y-8.5)<0.6){REL(pi);return true;}STEP(pi,x,z,hh=>hh.grounded&&hh.pos.y<8.3);return false;};
const st=[0,0],A=[0,1],B=[2,3];const L=[];let last='';
for(let i=0;i<60*120&&!D.FN.done&&!ZC.G.cine;i++){const pi=0;const held=Object.values(ZC.HERO).some(h=>h.kwHold&&h.kwHold.ref===S[A[pi]].ref);
  if(st[pi]===0){if(ON(pi,A[pi])){ZC.press(KEYS[pi].item);ZC.tick(2);U.tap(KEYS[pi].swap);ZC.tick(4);st[pi]=1;}}
  else{if(!held&&S[A[pi]].ref.hum<=0){U.tap(KEYS[pi].swap);ZC.tick(4);st[pi]=0;continue;}if(ON(pi,B[pi])&&S[B[pi]].ref.hum<1)ZC.press(KEYS[pi].item);}
  ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' hum='+D.LUL.map(q=>q.hum.toFixed(1)).join('/')+' lull='+D.FN.lull.toFixed(1));last=m;}}
REL(0);L.push('lull='+D.FN.lull.toFixed(1),'done='+D.FN.done,'hum='+D.LUL.map(q=>q.hum.toFixed(1)).join('/'),D.FN.done?'lullaby ok':'FAIL lullaby');L
//@@
// финал: кит заснул, фонтан и радуга — героев на облако; человек берёт звено, бот рядом; уровень пройден
const D=ZC.W.dbg22();let t=0;while(ZC.G.cine&&t<4000){ZC.skip();ZC.tick(5);t+=5;}ZC.tick(60);
const r=['me='+pos(me()),'bot='+pos(bot())+' '+CO.mode];r.push(U.walkTo(0,0,-438,10));ZC.tick(120);
r.push('link='+D.endLink.taken,'lvl='+ZC.W.levelId,'out='+!!ZC.W.flags.out,'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''),(ZC.W.levelId!=='2-2'||ZC.W.flags.out)&&!_errs.length?'2-2 ok':'FAIL 2-2');r
//@@
