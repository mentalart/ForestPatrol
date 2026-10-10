//@@
// 1-2 «Кикиморино болото», туман: засохшая кочка заметна — тёмная, с торчащими сухими стеблями, над ней парит голубая капля («сюда — живая вода»),
// пока тропа открыта и кочку не полили; подсказки-кнопки зовут Йошу уже с островка перед тропой (а не только в 5,5 м от кочки): Пелагее — «К · Йоша польёт»,
// Йоше на островке — «на первую кочку!», Йоше на первой кочке — «полей!»; после полива капля и стебли исчезают, подсказки гаснут
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.loadLevel(3);ZC.tick(30);ZC.skip();ZC.tick(20);
window.H=ZC.HERO;window.put=(h,x,z,y)=>{h.pos.set(x,(y||0)+0.4,z);h.vel.set(0,0,0);h.following=false;};
window.SW=()=>ZC.W.sw12;window.F=()=>ZC.W.flags;
['proshka','potap'].forEach((k,i)=>put(H[k],-1.2-i*1.2,-77.5));['pelageya','yosha'].forEach((k,i)=>put(H[k],1.2+i*1.2,-77.5));ZC.tick(60);
['proshka','potap'].forEach((k,i)=>put(H[k],-2.6-i*1.2,-87.5));['pelageya','yosha'].forEach((k,i)=>put(H[k],-1.2+i*1.2,-87.0));ZC.tick(60);
F().wed.stage='done';SW().reedCol.on=false;
['proshka','potap'].forEach((k,i)=>put(H[k],-2.6-i*1.2,-145));['pelageya','yosha'].forEach((k,i)=>put(H[k],-1.2+i*1.2,-145));ZC.tick(60);
['proshka','potap'].forEach((k,i)=>put(H[k],-2.6-i*1.2,-154.6));['pelageya','yosha'].forEach((k,i)=>put(H[k],-1.2+i*1.2,-154.6));ZC.tick(60);
window.R={};const fk=SW().forks,D=fk[1];
window.pr=(pi,action,note)=>ZC.W.prompts.filter(p=>p.pi===pi&&p.action===action&&(p.note===note||(typeof p.note==='function'&&p.note()===note)));
window.on=(pi,action,note)=>pr(pi,action,note).some(p=>p.cond());
window.st=()=>U.st()+' errs='+_errs.length+(_errs[0]?' '+_errs[0]:'');
// тропы закрыты — капли нет; открыли вторую — капля парит над засохшей кочкой, стебли на месте; у полит… первой тропы засохшей нет вовсе
ZC.tick(20);R.closed=!D.drop.visible&&!fk[3].drop.visible&&!fk[0].drop;
D.open=true;ZC.tick(120);
R.drop=D.drop.visible&&Math.abs(D.drop.position.x-D.dry.col.x)<0.01&&Math.abs(D.drop.position.z-D.dry.col.z)<0.01&&D.drop.position.y>1&&!fk[3].drop.visible;
R.dead=D.dead.length===6&&D.dead.every(c=>c.visible)&&!D.dry.col.on;
// Пелагея на островке перед тропой (7,4 м от кочки): кнопка «Йоша польёт»; с другого края островка и с берега — нет
const Pe=H.pelageya,Y=H.yosha,SWAP='Йоша польёт';
put(Pe,-6,-172.5);ZC.tick(30);R.swapIsland=on(1,'swap',SWAP);
put(Pe,6.5,-172.5);ZC.tick(30);R.swapFar=!on(1,'swap',SWAP);
put(Pe,-6,-154.6);ZC.tick(30);R.swapShore=!on(1,'swap',SWAP);
put(Pe,-6,-176.75,0.3);ZC.tick(30);R.swapHummock=on(1,'swap',SWAP);
// Йоша: на островке — «на первую кочку!», без «полей!»; на первой кочке — «полей!», без «на первую кочку!»
if(U.act(1).kind!=='yosha'){ZC.press('KeyK');ZC.tick(10);}
put(Pe,-5,-171.5);put(Y,-6,-172.5);ZC.tick(30);R.yoshaAct=U.act(1)===Y;
R.jumpIsland=on(1,'jump','на первую кочку!')&&!on(1,'skill','полей!');
put(Y,-6,-176.75,0.3);ZC.tick(40);R.skillHummock=on(1,'skill','полей!')&&!on(1,'jump','на первую кочку!');
//@@ shot=t12dry_hint.png
// кадр: Йоша на первой кочке, впереди мёртвая кочка с каплей; над героем «полей!»
put(H.pelageya,-5,-171.5);ZC.tick(120);U.act(1).kind
//@@
const D=SW().forks[1],Y=H.yosha,SWAP='Йоша польёт';put(Y,-6,-176.75,0.3);ZC.tick(20);
// полив: капля и сухие стебли исчезают, кочка держит, подсказки гаснут
Y.face=Math.atan2(D.dry.col.x-Y.pos.x,D.dry.col.z-Y.pos.z);ZC.press('KeyL');U.until(()=>!D.dry.dry,2);ZC.tick(90);
R.watered=!D.dry.dry&&D.dry.col.on&&!D.drop.visible&&D.dead.every(c=>!c.visible);
R.quiet=!on(1,'skill','полей!')&&!on(1,'jump','на первую кочку!')&&!on(1,'swap',SWAP);
['closed='+R.closed,'drop='+R.drop,'dead='+R.dead,'swap island/far/shore/hummock='+[R.swapIsland,R.swapFar,R.swapShore,R.swapHummock],'yosha='+R.yoshaAct,'jump='+R.jumpIsland,'skill='+R.skillHummock,'watered='+R.watered,'quiet='+R.quiet,st()].join(' | ')
//@@
const ok=['closed','drop','dead','swapIsland','swapFar','swapShore','swapHummock','yoshaAct','jumpIsland','skillHummock','watered','quiet'].every(k=>R[k])&&_errs.length===0;[JSON.stringify(R),'errs='+_errs.length,ok?'ok':'FAIL']
