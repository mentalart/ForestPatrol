//@@
// 1-1 вдвое длиннее (docs: вики «Мир-1-Дремучий-лес»): болото с чудом и лягушками вместо пруда, честная калитка (закрывается, если сойти с лапок),
// за калиткой — вороны Кощея (круг, щит, «утащил»), яблонька, печка и дым над вороньей рощей, молочная речка, теремок (три бревна вдвоём,
// конёк — подкидкой Потапа на леса), петушок прогоняет ворон, новоселье — уровень пройден с пятью звеньями.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(30);U.nocine();
window.F=()=>ZC.W.flags;window.P2=()=>ZC.W.part11;window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push('FAIL '+m);return c;};
window.put=(h,x,z,y)=>{h.pos.set(x,y||0,z);h.vel.set(0,0,0);h.grounded=false;};
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1);
const W=ZC.W;W.rzt.state='done';
chk(W.linkTotal===5,'звеньев 5: '+W.linkTotal);
const sw=P2().SW;chk(!!sw&&sw.FROG.L.length===9,'лягушки на болоте: '+(sw&&sw.FROG.L.length));
['links='+W.linkTotal,'nuts='+W.nutTotal,'frogs='+(sw&&sw.FROG.L.length),'bogAt river='+sw.bogAt(0,-198)+' bog='+sw.bogAt(0,-75)].concat(BAD)
//@@
// болото: чудо сталкивает с нити (стоящего на нити над трясиной)
const W=ZC.W,H=ZC.HERO,sw=P2().SW;F().stage='yard';W.abil.clew=true;W.abil.toss=true;F().cleanDone=true;
put(H.proshka,0,-61.2);put(H.pelageya,1.5,-61.2);ZC.tick(20);H.proshka.face=Math.PI;ZC.tick(2);ZC.press('KeyR');ZC.tick(60);
const th=W.threads.find(t=>t.owner===0&&!t.ret);const r=['thread='+(th?th.len.toFixed(1):'none')];
let push0=sw.CHU.pushed,ups=sw.CHU.ups;
for(let i=0;i<60*14&&sw.CHU.pushed===push0;i++){if(th&&W.threads.includes(th)){const h=H.proshka;if(h.pos.z>-68)U.step(0,th.sx,-68,0.4);else U.rel(0);}ZC.tick(1);}
U.rel(0);r.push('chudo ups='+sw.CHU.ups+' pushed='+sw.CHU.pushed+' '+pos(H.proshka));chk(sw.CHU.ups>ups,'чудо вылезло у нити');put(H.proshka,-1,-58.5);put(H.pelageya,1,-58.5);H.proshka.face=Math.PI;r.concat(BAD)
//@@ shot=t11long_bog.png wait=300
ZC.tick(40);
//@@
// калитка: две наружные лапки — открыта; сошли — закрылась; четверо проходят по очереди
const W=ZC.W,C=W.clean11,H=ZC.HERO,r=[];
F().glued=true;put(H.proshka,-5.5,-102.5);put(H.potap,-3,-100);put(H.pelageya,5.5,-102.5);put(H.yosha,3,-100);ZC.tick(40);
r.push('open2='+C.gateOpen());chk(C.gateOpen(),'две лапки — открыта');
put(H.pelageya,3,-98);ZC.tick(90);r.push('off='+C.gateOpen());chk(!C.gateOpen(),'сошли с лапки — закрылась');
// снова держат: Прошка и Пелагея; Потап и Йоша проходят и встают внутри; потом наружные проходят
put(H.pelageya,5.5,-102.5);ZC.tick(40);chk(C.gateOpen(),'снова открыта');
U.tap('KeyQ');ZC.tick(6);r.push('p1='+U.act(0).kind);r.push(U.path(0,[[-1.2,-104],[-1.2,-110],[-5.5,-111.5]],8));
U.tap('KeyK');ZC.tick(6);r.push('p2='+U.act(1).kind);r.push(U.path(1,[[1.2,-104],[1.2,-110],[5.5,-111.5]],8));ZC.tick(30);
r.push('plates='+C.PL.map(p=>p.on?1:0).join(''),'gate='+C.gateOpen());chk(C.PL[2].on&&C.PL[3].on,'внутренние лапки нажаты');
U.tap('KeyQ');ZC.tick(6);r.push(U.path(0,[[-1.2,-104],[-1.2,-114]],8));U.tap('KeyK');ZC.tick(6);r.push(U.path(1,[[1.2,-104],[1.2,-114]],8));ZC.tick(60);
r.push('out='+!!F().out,'heroes='+Object.values(H).map(h=>h.kind[0]+h.pos.z.toFixed(0)).join(' '));chk(F().out,'все за калиткой');
r.push('cine='+U.cine(200),'stage='+F().stage,'rav='+P2().RV.on);chk(F().stage==='crows'&&P2().RV.on,'прилетели вороны');r.concat(BAD)
//@@ shot=t11long_crows.png
ZC.tick(1);
//@@
// вороны: стоим на открытом месте — круг, пике; с щитом устоял; без щита — утащил к колокольчику
const W=ZC.W,R=P2().RV,H=ZC.HERO,r=[];put(U.act(0),-2,-124);put(U.act(1),2,-124);
let blk=R.blocks;for(let i=0;i<60*20&&R.blocks===blk;i++){ZC.hold('KeyG',true);ZC.tick(1);}ZC.hold('KeyG',false);r.push('blocks='+R.blocks);
const gr=R.grabs;for(let i=0;i<60*25&&R.grabs===gr;i++)ZC.tick(1);r.push('grabs='+R.grabs,pos(U.act(0)),pos(U.act(1)));
chk(R.blocks>blk,'щит держит ворона');chk(R.grabs>gr,'ворон утаскивает');r.concat(BAD)
//@@
// яблонька: удар по стволу — яблоки; два съедено — ветки опустились, под ней ворон не достаёт
const W=ZC.W,Y=P2().YB,r=[];put(U.act(0),Y.x-1.2,Y.z+1.0);put(U.act(1),Y.x+1.3,Y.z+1.6);ZC.tick(20);U.act(0).face=Math.atan2(Y.x-U.act(0).pos.x,Y.z-U.act(0).pos.z);ZC.press('KeyF');ZC.tick(70);
r.push('shaken='+!!F().shaken);chk(F().shaken,'яблонька отрясена');
const ap=P2().APL.filter(a=>a.down);r.push('apples down='+ap.length);if(ap[0])r.push(U.goto(0,ap[0].x,ap[0].z,6,0.3));if(ap[1])r.push(U.goto(1,ap[1].x,ap[1].z,6,0.3));ZC.tick(60);
r.push('eaten='+F().apples,'hide='+!!F().appleHide,'nut fell='+P2().ybNut.base.toFixed(1));chk(F().appleHide,'яблонька укрыла');
put(U.act(0),Y.x-0.8,Y.z+0.8);put(U.act(1),Y.x+0.8,Y.z-0.8);const g0=P2().RV.grabs+P2().RV.blocks+P2().RV.dodges;ZC.tick(60*8);r.push('under tree hits='+(P2().RV.grabs+P2().RV.blocks+P2().RV.dodges-g0));
chk(P2().RV.grabs+P2().RV.blocks+P2().RV.dodges===g0,'под яблонькой ворон не пикирует');r.concat(BAD)
//@@
// печка: полено вдвоём — дым; роща в дыму — вороны не видят
const W=ZC.W,L=P2().LG,PF=P2().PCF,r=[];const b=L.g.position;put(U.act(0),b.x-0.9,b.z);put(U.act(1),b.x+0.9,b.z);ZC.tick(20);r.push('log='+L.state);
for(let i=0;i<60*14&&L.state==='carry';i++){U.step(0,PF.x-0.9,PF.z+0.3,0.3);U.step(1,PF.x+0.9,PF.z+0.3,0.3);ZC.tick(1);}U.rel(0);U.rel(1);ZC.tick(60);
r.push('log='+L.state,'smoke='+!!F().smoke);chk(F().smoke,'печка растопилась');
r.push(U.goto(0,PF.x,PF.z,4,0.4));ZC.tick(10);r.push('pies');
put(U.act(0),-2,-172);put(U.act(1),2,-172);const g0=P2().RV.grabs+P2().RV.blocks+P2().RV.dodges;ZC.tick(60*6);r.push('smoke hits='+(P2().RV.grabs+P2().RV.blocks+P2().RV.dodges-g0));
chk(P2().RV.grabs+P2().RV.blocks+P2().RV.dodges===g0,'в дыму ворон не пикирует');r.concat(BAD)
//@@ shot=t11long_smoke.png
ZC.tick(1);
//@@
// молочная речка: клубок с кисельного берега — по нити на ту сторону, оба игрока
const W=ZC.W,r=[];for(const pi of[0,1]){const x=pi?5:-5;   // дорожки врозь: рядом с нитью друга клубок пристегнулся бы к её кончику
put(U.act(pi),x,-190.6);ZC.tick(10);U.act(pi).face=Math.PI;ZC.tick(2);ZC.press(U.K[pi].i);ZC.tick(50);
  const th=W.threads.find(t=>t.owner===pi&&!t.ret);r.push('th'+pi+'='+(th?th.len.toFixed(1):'none'));r.push(U.goto(pi,x,-206.5,10,0.4),pos(U.act(pi)));}
chk(U.act(0).pos.z<-205&&U.act(1).pos.z<-205,'речку перешли по нити');ZC.tick(30);r.concat(BAD)
//@@
// теремок: три бревна вдвоём к срубу
const W=ZC.W,P=P2(),r=[];put(U.act(0),-2,-211);put(U.act(1),2,-211);r.push(U.until(()=>F().tmHi,3));ZC.tick(60*4);
for(const L of P.LOGS){const b=L.g.position;put(U.act(0),b.x-0.9,b.z);put(U.act(1),b.x+0.9,b.z);ZC.tick(20);const s0=L.state;
  for(let i=0;i<60*14&&L.state==='carry';i++){U.step(0,P.TM.x-1.0,P.TM.z+3.4,0.3);U.step(1,P.TM.x+1.0,P.TM.z+3.4,0.3);ZC.tick(1);}U.rel(0);U.rel(1);ZC.tick(50);r.push(s0+'>'+L.state);}
r.push('logs='+F().logs);chk(F().logs===3,'три бревна в срубе');r.concat(BAD)
//@@ shot=t11long_terem.png
ZC.tick(1);
//@@
// конёк: Прошка в круг у лесов, Потап сзади — подкинул; петушок кукарекает, вороны улетают, новоселье
const W=ZC.W,P=P2(),H=ZC.HERO,r=[];U.toKind('proshka',0);put(H.proshka,P.TOSS.x,P.TOSS.z);put(H.potap,P.TOSS.x,P.TOSS.z+1.3);ZC.tick(20);U.toKind('potap',0);H.potap.face=Math.PI;ZC.tick(2);
ZC.press('KeyE');ZC.tick(90);r.push('konek='+!!F().konek,pos(H.proshka),'links='+W.links+'/'+W.linkTotal);chk(F().konek,'конёк на крыше');
r.push(U.until(()=>ZC.G.cine,8));r.push('flee='+!!P.RV.flee,'stage='+F().stage);ZC.tick(60*4);U.nocine();
r.push(U.until(()=>ZC.W.levelId!=='1-1',10),'lvl='+ZC.W.levelId,'got='+ZC.G.got['1-1'],'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''));chk(ZC.W.levelId!=='1-1','уровень пройден');chk(!_errs.length,'без ошибок');
r.concat(BAD).concat(BAD.length?[]:['t11long ok'])
