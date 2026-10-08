//@@ wait=1500
// релиз final06: напарник-бот проходит 2-1 «Гусли Садко» за Игрока 2 (Пелагея и Йоша, правая сторона улиц): мёртвая вода для Садко, фонтан, причал и дом-колодец,
// переливная улица, шлюзы и колодец-лифт, торговые ряды, звонкая мостовая, палаты царя, сад Китежа, Рак-Отшельник, ворота. Человека (Игрок 1) играет скрипт.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.P=ZC.players;window.W=ZC.W;window.F=()=>ZC.W.flags;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.H=ZC.HERO;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1);
window.KEYS=[{up:'KeyW',down:'KeyS',left:'KeyA',right:'KeyD',jump:'Space',attack:'KeyF',swap:'KeyQ',skill:'KeyE',item:'KeyR'},{up:'ArrowUp',down:'ArrowDown',left:'ArrowLeft',right:'ArrowRight',jump:'KeyM',attack:'Comma',swap:'KeyK',skill:'KeyL',item:'Semicolon'}];
window.ACT=(pi,kind)=>{if(U.act(pi).kind!==kind){U.tap(KEYS[pi].swap);ZC.tick(4);}return U.act(pi).kind===kind;};
window.put=(h,x,z,y)=>{h.pos.set(x,(y||0)+0.4,z);h.vel.set(0,0,0);h.following=false;};
ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(30);window.W=ZC.W;CO.set(true);CO.skill=1;U.nocine();ZC.tick(30);
['me='+pos(me()),'bot='+pos(bot()),'mode='+CO.mode,'stage='+F().stage]
//@@
// Садко: человек подходит к нему — ролик; бот берёт Йошу и поливает струну мёртвой водой, получает гусли
const L=[];let last='';U.walkTo(0,-3,-11,6);for(let i=0;i<60*40&&!ZC.W.abil.gusli;i++){ZC.tick(1);const m=CO.mode+'/'+F().stage;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}
L.push('gusli='+ZC.W.abil.gusli,'bot='+pos(bot()),ZC.W.abil.gusli?'sadko ok':'FAIL sadko');L
//@@
// причал: человек стоит слева (свой участок), бот на правом: прилив, лодка, крыша дома, дальше по улице
for(let k=0;k<4;k++){let t=0;while(ZC.G.cine&&t<3000){ZC.skip();ZC.tick(5);t+=5;}ZC.tick(60);}
F().stage='walk2';F().book=true;put(me(),-3,-40);put(bot(),3,-45);const zA=W.waters.find(z=>z.minx===1.2&&z.maxx===11&&z.minz===-56&&z.maxz===-44);
const L=[];let last='';for(let i=0;i<60*40&&!(bot().pos.z<-60.3);i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' '+zA.state);last=m;}if(i%120===0)L.push((i/60).toFixed(0)+' '+pos(bot())+' lvl='+zA.level.toFixed(1));}
L.push('bot='+pos(bot()),'other='+pos(ZC.HERO[bot().kind==='yosha'?'pelageya':'yosha']),(bot().pos.z<-60.3)?'dock ok':'FAIL dock');L
//@@
// переливная улица: человек (Потап на заслонке, Прошка — прилив слева, лодка, верёвка), потом бот: прилив справа, лодка, верёвка, ворота
const D=ZC.W.warp21('perel');ZC.tick(20);for(let k=0;k<3;k++){let t=0;while(ZC.G.cine&&t<3000){ZC.skip();ZC.tick(5);t+=5;}ZC.tick(20);}
put(bot(),3,-76);if(CO.mode!=='follow')ZC.tick(5);
const r=[];ACT(0,'potap');r.push(U.walkTo(0,-10.2,-80.2,5),U.walkTo(0,-10.2,-86,6),U.walkTo(0,-2.8,-95,8));ZC.tick(20);
if(!D.SLU.held())throw new Error('Потап не встал на заслонку '+r.join()+' '+pos(me()));
ACT(0,'proshka');ZC.tick(5);r.push(U.walkTo(0,-9.8,-79.4,8));r.push('kind='+me().kind+' z='+pos(me())+' CL='+D.CL.state+' zone='+(ZC.FIN.kwTest?'':''));U.tap('KeyR');ZC.tick(160);
r.push('CL='+D.CL.state+' CR='+D.CR.state+' bot='+pos(bot())+' '+CO.mode);r
//@@
// Прошка — лодкой на левую террасу, верёвка; бот в это время ждёт
const D=ZC.W.dbg21();const r=[U.walkTo(0,-8.3,-100,8),U.walkTo(0,-8.3,-104.5,4,(h)=>{if(h.grounded&&h.groundRef&&h.groundRef.water)ZC.press('Space');})];ZC.tick(30);
r.push(U.walkTo(0,-8.3,-109.2,4,(h)=>{if(h.grounded&&h.pos.y<3.1)ZC.press('Space');}));ZC.tick(20);r.push(U.walkTo(0,-5.9,-110.4,3));ZC.tick(5);
ZC.HERO.proshka.face=Math.PI/2;U.tap('KeyF');ZC.tick(30);r.push('ropeL='+D.ropes[0].pulled,'PG1='+D.PG[1].open,'bot='+pos(bot())+' '+CO.mode,'CL='+D.CL.state+' CR='+D.CR.state);r
//@@
// бот: прилив справа, лодка, верёвка, ворота; человек ждёт на левой террасе
const D=ZC.W.dbg21();const L=[];let last='';for(let i=0;i<60*70&&!(bot().pos.z<-116);i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' CR='+D.CR.state);last=m;}if(i%300===0)L.push((i/60).toFixed(0)+' '+pos(bot())+' CR='+D.CR.level.toFixed(1)+' CL='+D.CL.level.toFixed(1));}
L.push('bot='+pos(bot()),'ropeR='+D.ropes[1].pulled,'PG0='+D.PG[0].open,'other='+pos(ZC.HERO[bot().kind==='yosha'?'pelageya':'yosha']),(bot().pos.z<-116)?'perel ok':'FAIL perel');L
//@@
// шлюзы и колодец-лифт: оба героя бота проходят одни (человек стоит у начала); потом человек повторяет за ботом
const D=ZC.W.warp21('locks');ZC.tick(20);for(let k=0;k<3;k++){let t=0;while(ZC.G.cine&&t<3000){ZC.skip();ZC.tick(5);t+=5;}ZC.tick(20);}
put(me(),-8,-114);ACT(0,'proshka');put(bot(),5,-117);put(ZC.HERO[bot().kind==='yosha'?'pelageya':'yosha'],6,-117);ZC.tick(10);
const L=[];let last='';for(let i=0;i<60*120&&!(ZC.HERO.pelageya.pos.z<-156.5&&ZC.HERO.yosha.pos.z<-156.5);i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}if(i%600===0)L.push((i/60).toFixed(0)+' '+pos(bot()));}
L.push('pel='+pos(ZC.HERO.pelageya),'yos='+pos(ZC.HERO.yosha),(ZC.HERO.pelageya.pos.z<-156.5&&ZC.HERO.yosha.pos.z<-156.5)?'locks ok':'FAIL locks');L
//@@
// торговые ряды: раки и Жемчужница — бот (оба героя поочерёдно) справляется сам; человек стоит в стороне
const D=ZC.W.warp21('market');ZC.tick(20);for(let k=0;k<3;k++){let t=0;while(ZC.G.cine&&t<3000){ZC.skip();ZC.tick(5);t+=5;}ZC.tick(20);}
put(me(),-8,-160);put(bot(),3,-159);put(ZC.HERO[bot().kind==='yosha'?'pelageya':'yosha'],4,-159);ZC.tick(10);
const L=[];let last='';for(let i=0;i<60*100&&!D.mkt.done;i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}if(i%600===0)L.push((i/60).toFixed(0)+' '+pos(bot())+' en='+ZC.W.enemies.filter(e=>e.alive).map(e=>e.kind+':'+e.state).join());}
L.push('mkt.done='+D.mkt.done,'en='+ZC.W.enemies.filter(e=>e.alive).map(e=>e.kind+':'+e.state).join(),D.mkt.done?'market ok':'FAIL market');L
//@@
// звонкая мостовая: человек — жёлтая плита (дзинь), бот — синяя (дилинь), потом человек на розовую, бот на зелёную (дон-дон вместе)
const D=ZC.W.warp21('tune');ZC.W.flags.sturg=false;ZC.tick(20);for(let k=0;k<3;k++){let t=0;while(ZC.G.cine&&t<3000){ZC.skip();ZC.tick(5);t+=5;}ZC.tick(20);}
put(me(),-2,-184);put(bot(),2,-184);put(ZC.HERO[bot().kind==='yosha'?'pelageya':'yosha'],3,-183);ZC.tick(300);
const T=D.TUNE,r=['step0='+D.TS.step+' sturg='+F().sturg+' bot='+pos(bot())+' '+CO.mode];
r.push(U.walkTo(0,T[0].x,T[0].z,6));ZC.tick(90);r.push('step1='+D.TS.step+' bot='+pos(bot())+' '+CO.mode);
ZC.tick(60);r.push('step2='+D.TS.step+' bot='+pos(bot()));r.push(U.walkTo(0,T[2].x,T[2].z,6));ZC.tick(120);
r.push('done='+D.TS.done+' fails='+D.TS.fails+' bot='+pos(bot()),D.TS.done?'tune ok':'FAIL tune');r
//@@
// палаты царя: человек играет на первом стуле и прыгает через волны, бот — на втором; наплясался — двери открыты
window.RINGJ=(pi,h)=>{const D=ZC.W.dbg21();const d=Math.hypot(h.pos.x,h.pos.z-D.TZ);for(const w of D.WAV){if(w.side&&h.pos.x*w.side<0)continue;const gap=d-w.R;if(gap>0.3&&gap<1.3&&h.grounded&&h.pos.y<0.8){ZC.press(KEYS[pi].jump);break;}}};
const D=ZC.W.warp21('dance');ZC.tick(20);for(let k=0;k<3;k++){let t=0;while(ZC.G.cine&&t<3000){ZC.skip();ZC.tick(5);t+=5;}ZC.tick(20);}
put(me(),-2,D.K0-4);put(bot(),2,D.K0-4);put(ZC.HERO[bot().kind==='yosha'?'pelageya':'yosha'],3,D.K0-3);ZC.tick(10);
let t=0;while(!D.F.kingMet&&t<600){ZC.tick(1);t++;}while(ZC.G.cine&&t<3000){ZC.skip();ZC.tick(5);t+=5;}ZC.tick(30);
const L=['met='+D.F.kingMet,'bot='+pos(bot())+' '+CO.mode];U.walkTo(0,D.seats[0].x+0.3,D.seats[0].z+0.6,8);U.tap('KeyR');ZC.tick(10);
let last='';for(let i=0;i<60*80&&!D.F.kingDone;i++){if(i%150===0){const h=U.act(0),s=D.seats[0];if(Math.hypot(h.pos.x-s.x,h.pos.z-s.z)>1.8)U.walkTo(0,s.x+0.3,s.z+0.6,3);}if(i%240===0)U.tap('KeyR');RINGJ(0,U.act(0));ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}
L.push('done='+D.F.kingDone,'meter='+D.KD.meter.toFixed(2)+' round='+D.KD.round,'bot='+pos(bot()),D.F.kingDone?'dance ok':'FAIL dance');L
//@@
// две раковины: человек играет прилив слева, бот — отлив справа; решётка поднялась
const D=ZC.W.warp21('shells');ZC.tick(20);for(let k=0;k<3;k++){let t=0;while(ZC.G.cine&&t<3000){ZC.skip();ZC.tick(5);t+=5;}ZC.tick(20);}
put(me(),-2,-253);put(bot(),2,-253);put(ZC.HERO[bot().kind==='yosha'?'pelageya':'yosha'],3,-252);ZC.tick(10);
const r=[U.walkTo(0,-6,-257,8)];U.tap('KeyR');const L=[];let last='';for(let i=0;i<60*20&&!D.F.grate;i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}
L.push('grate='+D.F.grate,'LZ='+D.LZ.state+' RZ='+D.RZ.state,D.F.grate?'shells ok':'FAIL shells');r.concat(L)
//@@
// сад Китежа: человек — Потап по дну к якорю и к ракушке (отлив), оставленный держит; бот — Йоша поливает ростки, потом оба героя бота по лесенке на террасу
const D=ZC.W.warp21('garden'),G=D.DG;ZC.tick(20);for(let k=0;k<3;k++){let t=0;while(ZC.G.cine&&t<3000){ZC.skip();ZC.tick(5);t+=5;}ZC.tick(20);}
put(me(),-2,-268);put(bot(),2,-268);put(ZC.HERO[bot().kind==='yosha'?'pelageya':'yosha'],3,-268);ZC.tick(10);
ACT(0,'potap');const r=[U.walkTo(0,8.2,-237.6+G,5),U.walkTo(0,8.2,-243+G,6),U.walkTo(0,4,-256.8+G,8)];ZC.tick(10);U.tap('KeyE');ZC.tick(60);r.push('anchor='+D.F.anchor);
r.push(U.walkTo(0,0.6,-245.6+G,6));U.tap('KeyR');ZC.tick(20);r.push('GARD='+D.GARD.state);U.tap('KeyQ');ZC.tick(5);r.push('hold='+!!ZC.HERO.potap.kwHold);
const L=[];let last='';for(let i=0;i<60*60&&!(D.KS[0].grown&&D.KS[1].grown);i++){ZC.tick(1);const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' '+D.GARD.state);last=m;}}
L.push('KS='+D.KS.map(s=>s.grown),'bot='+pos(bot()),'GARD='+D.GARD.state);r.concat(L)
//@@
// бот поднимается по лесенке (оба героя), пока сад пуст или заполнен; человек ждёт у ракушки (Потап снова играет отлив, если сад заполнился)
const D=ZC.W.dbg21();const L=[];let last='';for(let i=0;i<60*120&&!(ZC.HERO.pelageya.pos.y>4.2&&ZC.HERO.yosha.pos.y>4.2&&ZC.HERO.pelageya.pos.z<-292&&ZC.HERO.yosha.pos.z<-292);i++){ZC.tick(1);
  if(D.GARD.state==='high'&&ZC.HERO.potap.pos.y<-3&&i%300===0){ACT(0,'potap');U.walkTo(0,0.6,-245.6+D.DG,8);U.tap('KeyR');ZC.tick(20);U.tap('KeyQ');}
  const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot())+' '+D.GARD.state);last=m;}if(i%600===0)L.push((i/60).toFixed(0)+' '+pos(bot())+' '+D.GARD.state);}
L.push('pel='+pos(ZC.HERO.pelageya),'yos='+pos(ZC.HERO.yosha),(ZC.HERO.pelageya.pos.y>4.2&&ZC.HERO.yosha.pos.y>4.2)?'garden ok':'FAIL garden');L
//@@
