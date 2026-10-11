//@@
// 3-5 «Гуси-лебеди» (late_99zm_sky35, docs/40): туда — стелс с приёмами героев (колокольчик сторожу, щит Потапа, тучка Йоши, коса, спящий гусь),
// угощения печки/яблоньки/речки, двор Яги (сон Яги, мышка, горшок); обратно — волны гусей, Яга на ступе, строчка колыбельной, укрытия; вожак.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,200));_ce.apply(console,arguments);};}
ZC.startFrom(ZC.LV('3-5'));ZC.G.manual=true;ZC.tick(20);ZC.skip();ZC.tick(60);window.W=ZC.W;window.H=ZC.HERO;window.F=W.flags;window.K=W.k35;
window.lit=(h,on)=>{h.lit=on;};window.put=(h,x,z,y)=>{h.pos.set(x,y||0.05,z);h.vel.set(0,0,0);};window.gq=n=>W.geese.find(q=>q.name===n);
window.park=()=>{put(H.proshka,-6,-30);put(H.potap,-5,-30);put(H.pelageya,6,-30);put(H.yosha,5,-30);};
const names=['watch','hover1','hover2','sleep','g7','lead','yard1'];const miss=names.filter(n=>!gq(n));
const r=['nuts='+W.nutTotal,'links='+W.linkTotal,'geese='+W.geese.length,'k35='+!!K];
if(miss.length||W.nutTotal!==10||W.linkTotal!==5||!K)throw new Error('устройство уровня: '+r.join(' | ')+' нет: '+miss.join(','));r.join(' | ')
//@@
// подозрение: свет в пятне гуся 1 — «!» растёт; погасил до 1 — не поймал; держал — поймал
const q=W.geese[0],P=H.proshka,g0=ZC.G.stats.geese||0;lit(P,true);const r=[];
for(let i=0;i<20;i++){P.pos.set(q.fp.x,0.05,q.fp.z);ZC.tick(1);}r.push('sus20='+(q.sus||0).toFixed(2),'st='+q.state);
if(q.state!=='fly'||!(q.sus>0.2))throw new Error('подозрение не растёт или поймал сразу: '+r.join(' | '));
lit(P,false);ZC.tick(80);if((ZC.G.stats.geese||0)!==g0)throw new Error('поймал после того, как погасили: '+r.join(' | '));
lit(P,true);let t=0;while(q.state==='fly'&&t<240){P.pos.set(q.fp.x,0.05,q.fp.z);ZC.tick(1);t++;}r.push('grabT='+(t/60).toFixed(2));ZC.tick(120);lit(P,false);
if(t/60<0.5||t/60>1.6)throw new Error('время подозрения не то: '+r.join(' | '));r.join(' | ')
//@@
// сторож: глядит на золотой мосток; рогатка Прошки в колокольчик — отворачивается на время, потом обратно
const w=gq('watch'),P=H.proshka,r=[];park();U.toKind('proshka',0);put(P,0,-54);lit(P,true);ZC.tick(20);r.push('susOnBridge='+(w.sus||0).toFixed(2));
if(!(w.sus>0.1))throw new Error('сторож не видит мосток: '+r.join(' | '));lit(P,false);ZC.tick(90);
put(P,-1,-49);P.face=Math.atan2(-4.6,-12.2);ZC.tick(2);U.tap('KeyE');ZC.tick(40);r.push('dist='+K.watch().toFixed(1));if(!(K.watch()>1))throw new Error('колокольчик не отвлёк: '+r.join(' | '));
put(P,0,-54);lit(P,true);ZC.tick(60);r.push('susAway='+(w.sus||0).toFixed(2));if(w.sus>0.05)throw new Error('отвернувшийся сторож видит: '+r.join(' | '));lit(P,false);
ZC.tick(60*6);r.push('back='+K.watch().toFixed(1));r.join(' | ')
//@@
// печка угощает первого: съел — stoveOK
const P=H.proshka,r=[];put(P,0,-64.6);ZC.tick(10);r.push('pie='+!!F.pie);if(!F.pie)throw new Error('печка не угощает');U.tap('KeyE');ZC.tick(30);r.push('ok='+!!F.stoveOK,'off='+!!F.stoveOff);
if(!F.stoveOK)throw new Error('пирожок не съеден: '+r.join(' | '));ZC.tick(150);r.join(' | ')
//@@
// щит Потапа: свет под щитом гусю не виден; без щита — виден
const q=gq('hover1'),Pt=H.potap,r=[];park();U.toKind('potap',0);put(Pt,0,-78);lit(Pt,true);ZC.hold('KeyG',true);ZC.tick(40);r.push('guard='+Pt.guard,'sus='+(q.sus||0).toFixed(2),'tile='+!!W.tiles.find(t=>Math.abs(t.z+78)<0.9&&Math.abs(t.x)<0.5&&t.solid));
if(!Pt.guard||q.sus>0.05)throw new Error('под щитом видно: '+r.join(' | '));
put(H.yosha,0,-79.6);ZC.tick(20);r.push('yoshaZ='+H.yosha.pos.y.toFixed(2));if(H.yosha.pos.y<-0.5)throw new Error('мосток не держит друга в свете Потапа: '+r.join(' | '));
ZC.hold('KeyG',false);ZC.tick(25);r.push('noGuard='+(q.sus||0).toFixed(2));if(!(q.sus>0.1)&&q.state==='fly')throw new Error('без щита не видно: '+r.join(' | '));
lit(Pt,false);ZC.tick(150);U.toKind('proshka',0);r.join(' | ')
//@@
// яблонька: подкинутый срывает кислое яблочко, Йоша поливает — appleOK; отказ (ушли дальше) — treeRefused
const r=[];park();put(H.proshka,0.8,-101);ZC.tick(5);r.push('ask='+!!F.treeAsk1);if(!F.treeAsk1)throw new Error('яблонька не угощает');
U.toKind('potap',0);put(H.potap,1.2,-102.2);put(H.proshka,1.6,-102.9);H.potap.face=0;ZC.tick(2);U.tap('KeyE');let ok=false;for(let i=0;i<90&&!ok;i++){ZC.tick(1);ok=!!F.appleEat;}r.push('eat='+!!F.appleEat);
if(!F.appleEat){put(H.proshka,1.6,-103,2.9);H.proshka.grounded=false;H.proshka.vel.set(0,2,0);ZC.tick(2);r.push('eatPut='+!!F.appleEat);}
if(!F.appleEat)throw new Error('яблочко не сорвать: '+r.join(' | '));
put(H.yosha,0.6,-102.2);H.yosha.face=Math.PI;U.toKind('yosha',1);ZC.tick(3);U.tap('KeyL');ZC.tick(60);r.push('water='+!!F.treeWater1,'ok='+!!F.appleOK);if(!F.appleOK)throw new Error('яблонька не довольна: '+r.join(' | '));U.toKind('proshka',0);r.join(' | ')
//@@
// тучка: Йоша поливает облачко — над мостком тень, свет под ней не виден
const q=gq('hover2'),Y=H.yosha,P=H.proshka,r=[];park();put(Y,2.4,-109.4);Y.face=Math.PI;U.toKind('yosha',1);ZC.tick(3);U.tap('KeyL');ZC.tick(30);r.push('tuch='+K.tuch().toFixed(1));
if(!(K.tuch()>3))throw new Error('тучка не встала: '+r.join(' | '));put(P,0,-116);lit(P,true);ZC.tick(40);r.push('sus='+(q.sus||0).toFixed(2));if(q.sus>0.05)throw new Error('под тучкой видно: '+r.join(' | '));
lit(P,false);ZC.tick(60*12);put(P,0,-116);lit(P,true);ZC.tick(25);r.push('after='+(q.sus||0).toFixed(2));lit(P,false);ZC.tick(150);r.join(' | ')
//@@
// коса: свет в перехвате золотой нити гасит лиловую рядом; на краю — нет
const P=H.proshka,r=[];park();const lil=W.tiles.find(t=>t.type==='shadow'&&Math.abs(t.z+130)<0.8&&t.x>0.5&&t.x<2);if(!lil)throw new Error('нет лиловой нити');
put(P,-3.4,-126.6);lit(P,true);ZC.tick(3);r.push('edge='+lil.solid);put(P,-1.2,-130);ZC.tick(3);r.push('pinch='+lil.solid);lit(P,false);ZC.tick(3);
if(!r[0].endsWith('true')||lil.solid===undefined||r[1].endsWith('true'))throw new Error('коса не по правилу: '+r.join(' | '));r.join(' | ')
//@@
// речка: кисель вязкий (Йоша — поверху), отпить — riverOK
const P=H.proshka,Y=H.yosha,r=[];park();put(P,0,-142.6);ZC.tick(5);r.push('offer='+!!F.riverOffer,'slowP='+(W.slowZone(P)),'slowY='+W.slowZone(Object.assign({},Y,{pos:P.pos})));
if(!F.riverOffer||!W.slowZone(P))throw new Error('кисель не вязкий: '+r.join(' | '));U.tap('KeyE');ZC.tick(20);r.push('ok='+!!F.riverOK);if(!F.riverOK)throw new Error('не отпили: '+r.join(' | '));r.join(' | ')
//@@
// двор Яги: шум у Яги — ворочается, кто шевелится — к колокольчику; мышка, горшок, Йоша и Тишка — погоня
const P=H.proshka,Y=H.yosha,r=[];[H.potap,H.pelageya].forEach((h,i)=>put(h,-2+i*4,-191));put(Y,4,-192);put(P,-3,-197.6);ZC.tick(65);r.push('yard='+!!F.yard,F.stage);
P.face=0;U.tap('ShiftLeft');ZC.tick(1);r.push("stir="+K.yard().st,K.yard().why);if(K.yard().st!=='stir')throw new Error('Яга не заворочалась от шума: '+r.join(' | '));
ZC.tick(60*3.2);r.push('after='+K.yard().st);
put(P,1,-203.6);ZC.tick(10);r.push('ask='+!!F.mouseAsk);put(P,-6.6,-203.8);ZC.tick(5);U.tap('KeyE');ZC.tick(5);r.push('pot='+!!K.pot());if(!K.pot())throw new Error('горшок не взять: '+r.join(' | '));
put(P,1.4,-204.4);ZC.tick(10);r.push('fed='+!!F.mouseFed);if(!F.mouseFed)throw new Error('мышка не накормлена: '+r.join(' | '));ZC.tick(150);
U.toKind('yosha',1);put(Y,4.2,-201.2);ZC.tick(10);r.push('cine='+!!ZC.G.cine);ZC.skip();ZC.tick(5);U.nocine();r.push('back='+!!F.back,'yaw='+W.camYaw.toFixed(2),'tish='+(K.tish().parent===Y.g));
if(!F.back||Math.abs(W.camYaw-Math.PI)>0.01||K.tish().parent!==Y.g)throw new Error('погоня не началась: '+r.join(' | '));r.join(' | ')
//@@
// погоня: волна ловит того, кто светит; кто без света — пролетает мимо; Яга догоняет стоящего
const P=H.proshka,r=[];const g0=ZC.G.stats.geese||0;put(H.yosha,1,-190);put(H.pelageya,-1,-190);put(H.potap,-3,-190);put(P,0,-190);K.yaga().z=-240;
let t=0;while(!K.wave().on&&t<60*15){ZC.tick(1);t++;}r.push('waveIn='+(t/60).toFixed(1));if(!K.wave().on)throw new Error('волны нет: '+r.join(' | '));
lit(P,true);t=0;while(K.wave().on&&K.wave().z<P.pos.z+1&&t<60*8){ZC.tick(1);t++;}ZC.tick(2);r.push('caught='+((ZC.G.stats.geese||0)-g0),'pz='+P.pos.z.toFixed(1));if((ZC.G.stats.geese||0)-g0<1)throw new Error('волна не поймала светящего: '+r.join(' | '));
lit(P,false);put(P,0,-190);K.yaga().z=-240;t=0;while(!K.wave().on&&t<60*15){ZC.tick(1);t++;}const g1=ZC.G.stats.geese||0;t=0;while(K.wave().on&&t<60*8){ZC.tick(1);t++;}r.push('dark='+((ZC.G.stats.geese||0)-g1));
if((ZC.G.stats.geese||0)!==g1)throw new Error('волна поймала тёмного: '+r.join(' | '));
put(P,0,-195);K.yaga().z=-200;K.yaga().x=0;const g2=ZC.G.stats.geese||0;ZC.tick(60*4);r.push('yaga='+((ZC.G.stats.geese||0)-g2));if((ZC.G.stats.geese||0)-g2<1)throw new Error('Яга не догнала: '+r.join(' | '));r.join(' | ')
//@@
// речка прячет (отказ от киселя — запруда): взор + запруда → укрытие волнами → звено и строчка колыбельной; строчка гасит волну
const r=[];F.riverRefused=true;K.yaga().z=-240;['proshka','potap','pelageya','yosha'].forEach((k,i)=>put(H[k],-3+i*2,-146));ZC.tick(5);r.push('ask='+!!F.riverAsk);if(!F.riverAsk)throw new Error('речка не просит');
U.toKind('pelageya',1);ZC.tick(3);U.tap('KeyL');ZC.tick(20);r.push('hollow='+!!F.hollow,'done='+!!F.riverDone);if(F.riverDone)throw new Error('без запруды спрятали: '+r.join(' | '));
const mk=W.marks.find(m=>Math.abs(m.pos.x-7.4)<0.1&&Math.abs(m.pos.z+141.9)<0.1);mk.onHit();ZC.tick(5);r.push('dam='+!!F.dam,'sh='+(W.shelter35()&&W.shelter35().name));
['proshka','potap','pelageya','yosha'].forEach((k,i)=>put(H[k],-1.2+i*0.8,-139));const L0=ZC.W.links;ZC.tick(60*12);r.push('links+='+(ZC.W.links-L0),'lines='+F.lines,'songs='+F.songs);
if(W.shelter35()||F.lines!==1)throw new Error('речка не спрятала: '+r.join(' | '));
U.toKind('yosha',1);K.yaga().z=-240;let t=0;while(!K.wave().on&&t<60*15){ZC.tick(1);t++;}U.tap('Digit0');ZC.tick(3);r.push('waveAfterSong='+K.wave().on,'songs='+F.songs);if(K.wave().on||F.songs!==0)throw new Error('строчка не усыпила волну: '+r.join(' | '));r.join(' | ')
//@@
// яблонька прячет: Потап у ствола; печка без пирожка — полено, потом вожак
const r=[];K.yaga().z=-240;['proshka','potap','pelageya','yosha'].forEach((k,i)=>put(H[k],-1+i*0.7,-102.6));put(H.potap,0,-102.6);ZC.tick(5);r.push('ask='+!!F.treeAsk);ZC.tick(60*12);r.push('tree='+!!F.treeDone,'sh='+!!W.shelter35(),'lines='+F.lines);
if(W.shelter35()||F.lines!==2)throw new Error('яблонька не спрятала: '+r.join(' | '));
F.stoveRefused=true;K.yaga().z=-240;['proshka','potap','pelageya','yosha'].forEach((k,i)=>put(H[k],-3+i*2,-72.6));ZC.tick(5);r.push('stove='+!!F.stoveAsk);ZC.tick(60*3);const S=W.shelter35();r.push('t='+(S&&S.t.toFixed(1)));if(!S||S.t<7.9)throw new Error('без полена отсчёт пошёл: '+r.join(' | '));
U.toKind('potap',0);put(H.potap,-6,-69.6);ZC.tick(3);U.tap('KeyE');ZC.tick(40);r.push('log='+!!F.log);['proshka','potap','pelageya','yosha'].forEach((k,i)=>put(H[k],-1.2+i*0.8,-64.2));ZC.tick(60*7);
r.push('stage='+F.stage);U.nocine();ZC.tick(5);r.push('vz='+K.vz().state);if(F.stage!=='boss'||K.vz().state!=='circle')throw new Error('вожак не начался: '+r.join(' | '));r.join(' | ')
//@@
// вожак: свет у кисельной лужи — пике, отскок — увяз; взор Пелагеи — узел виден; рогатка Прошки — узел; три узла — конец
const V=K.vz(),r=[];const P=H.proshka,Pe=H.pelageya,Pt=H.potap;
const bait=(x,z)=>{U.toKind('proshka',0);put(Pt,7,-72.5);put(Pe,-7.5,-59.5);put(H.yosha,7.5,-59.5);put(P,x,z);lit(P,true);let t=0;while(V.state!=='lock'&&t<60*8){P.pos.set(x,0.05,z);ZC.tick(1);t++;}lit(P,false);put(P,x+(x<0?3.5:x>0?-3.5:2.5),z+(x===0?2.5:2));let u=0;while(V.state==='lock'||V.state==='dive'){ZC.tick(1);if(++u>120)break;}ZC.tick(2);return V.state;};
const knot=()=>{U.toKind('pelageya',1);put(Pe,V.pos.x+2,V.pos.z+3);ZC.players[1].owlCd=0;ZC.tick(2);U.tap('KeyL');ZC.tick(5);const seen=V.seen;U.toKind('proshka',0);put(P,V.pos.x,V.pos.z+6);P.face=Math.PI;ZC.tick(2);U.tap('KeyE');ZC.tick(40);return seen;};
r.push('1:'+bait(-5.2,-63.4));if(V.state!=='stuck')throw new Error('в кисель не заманить: '+r.join(' | '));r.push('seen='+knot(),'knots='+F.knots);if(F.knots!==1)throw new Error('узел не сбит: '+r.join(' | '));
let t=0;while(V.state!=='circle'&&t<300){ZC.tick(1);t++;}ZC.tick(60*1.5);
r.push('2:'+bait(0,-65.6),'lock='+V.lock.x.toFixed(1)+','+V.lock.z.toFixed(1)+' su='+V.stoveUsed+' P='+P.pos.x.toFixed(1)+','+P.pos.z.toFixed(1));if(V.state==='stove'){U.toKind('potap',0);put(Pt,0.4,-64.8);ZC.tick(2);U.tap('KeyE');ZC.tick(30);}r.push('st='+V.state);if(V.state!=='stuck')throw new Error('в печь не заманить: '+r.join(' | '));
r.push('seen='+knot(),'knots='+F.knots);t=0;while(V.state!=='circle'&&t<300){ZC.tick(1);t++;}ZC.tick(60*1.5);
r.push('3:'+bait(5.2,-63.4));r.push('seen='+knot(),'knots='+F.knots);if(F.knots!==3)throw new Error('три узла не вышло: '+r.join(' | '));
ZC.tick(60);r.push('stage='+F.stage,'cine='+!!ZC.G.cine);if(F.stage!=='end')throw new Error('конец не начался: '+r.join(' | '));r.join(' | ')
//@@ shot=sky35_end.png
ZC.tick(60*14);
//@@
ZC.skip();ZC.tick(200);const r=['done='+!!ZC.G.done['3-5'],'got='+ZC.G.got['3-5'],'errs='+_errs.length+' '+_errs.slice(0,2).join(' / ')];if(_errs.length||!ZC.G.done['3-5'])throw new Error(r.join(' | '));'3-5 sky35 ok '+r.join(' | ')
