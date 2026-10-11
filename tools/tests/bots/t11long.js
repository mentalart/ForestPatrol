//@@
// 1-1 вдвое длиннее (docs: вики «Мир-1-Дремучий-лес»): болото с чудом и лягушками вместо пруда, честная калитка (закрывается, если сойти с лапок),
// за калиткой — вороны Кощея (красный круг: выбеги — промахнулся, стой или щит — «утащил»), стог-шалаш, ступа Яги и пыль над вороньей рощей,
// ручей под лопухами, теремок (бревно Потап несёт один, два — вдвоём; конёк — подкидкой Потапа на леса), петушок прогоняет ворон, новоселье — уровень пройден с пятью звеньями.
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
// вороны: красный круг. Стоим — утащил; со щитом — всё равно утащил (щит от ворона не спасает); выбежали из круга, пока наливается, — промахнулся
const W=ZC.W,R=P2().RV,H=ZC.HERO,r=[];put(U.act(0),-2,-124);put(U.act(1),2,-124);
const lockOn=max=>{for(let i=0;i<60*max;i++){if(R.dive&&R.dive.st==='lock')return true;ZC.tick(1);}return false;};
let gr=R.grabs;for(let i=0;i<60*25&&R.grabs===gr;i++)ZC.tick(1);r.push('grabs='+R.grabs,'locks='+R.locks);chk(R.grabs>gr,'стоял в круге — утащил');ZC.tick(60*3);
put(U.act(0),-2,-124);put(U.act(1),2,-124);gr=R.grabs;const bl=R.blocks;for(let i=0;i<60*25&&R.grabs===gr;i++){ZC.hold('KeyG',true);ZC.hold('Period',true);ZC.tick(1);}ZC.hold('KeyG',false);ZC.hold('Period',false);
r.push('shield grabs='+(R.grabs-gr),'blocks='+(R.blocks-bl));chk(R.grabs>gr&&R.blocks>bl,'щит от ворона не спасает');ZC.tick(60*3);
put(U.act(0),-2,-124);put(U.act(1),2,-124);const dg=R.dodges;let tries=0;
for(;tries<4&&R.dodges===dg;tries++){if(!lockOn(25))break;const D=R.dive,pi=D.h.player,h=D.h;r.push('lock lt='+D.lt.toFixed(2)+' '+h.kind);
  for(let i=0;i<40&&R.dive&&R.dive.st!=='up';i++){U.step(pi,h.pos.x+(pi?3:-3),h.pos.z,0.1);ZC.tick(1);}U.rel(0);U.rel(1);ZC.tick(60);}
r.push('dodges='+(R.dodges-dg));chk(R.dodges>dg,'выбежал из красного круга — промахнулся');r.concat(BAD)
//@@
// стог: удар — сено ложится шалашом; под шалашом ворон не пикирует; орешек падает со стожара
const W=ZC.W,S=P2().HS,r=[];put(U.act(0),S.x-1.9,S.z+1.2);put(U.act(1),S.x+1.9,S.z+1.6);ZC.tick(20);U.act(0).face=Math.atan2(S.x-U.act(0).pos.x,S.z-U.act(0).pos.z);ZC.press('KeyF');ZC.tick(70);
r.push('hit='+!!F().hayHit,'hide='+!!F().hayHide,'nut='+P2().hsNut.base.toFixed(1));chk(F().hayHide,'стог лёг шалашом');
put(U.act(0),S.x-0.6,S.z+0.5);put(U.act(1),S.x+0.6,S.z-0.5);ZC.tick(5);const g0=P2().RV.grabs+P2().RV.dodges;ZC.tick(60*8);r.push('under hay hits='+(P2().RV.grabs+P2().RV.dodges-g0));
chk(P2().RV.grabs+P2().RV.dodges===g0,'в шалаше ворон не пикирует');r.concat(BAD)
//@@
// ступа Яги: Прошка не поднимет — только Потап (кнопка умения у ступы); ступа взлетает, пыль над рощей — вороны не видят
const W=ZC.W,T=P2().ST,H=ZC.HERO,r=[];U.toKind('proshka',0);put(H.proshka,T.x+0.6,T.z+1.7);put(H.potap,T.x+3,T.z+3);ZC.tick(20);ZC.press('KeyE');ZC.tick(40);r.push('proshka stupa='+!!F().stupa);chk(!F().stupa,'Прошка ступу не поднимает');
U.toKind('potap',0);put(H.potap,T.x+0.6,T.z+1.7);ZC.tick(20);ZC.press('KeyE');ZC.tick(30);r.push('potap stupa='+!!F().stupa);chk(F().stupa,'Потап поднял ступу');
r.push(U.until(()=>F().dust,4),'dust='+!!F().dust);chk(F().dust,'пыль над рощей');ZC.tick(60*3);r.push('stupa fly t='+P2().STF.t.toFixed(1));
put(U.act(0),-2,-172);put(U.act(1),2,-172);const g0=P2().RV.grabs+P2().RV.dodges;ZC.tick(60*6);r.push('dust hits='+(P2().RV.grabs+P2().RV.dodges-g0));
chk(P2().RV.grabs+P2().RV.dodges===g0,'в пыли ворон не пикирует');U.toKind('proshka',0);r.concat(BAD)
//@@ shot=t11long_smoke.png
ZC.tick(1);
//@@
// ручей: клубок с топкого берега — по нити на ту сторону, оба игрока
const W=ZC.W,r=[];for(const pi of[0,1]){const x=pi?5:-5;   // дорожки врозь: рядом с нитью друга клубок пристегнулся бы к её кончику
put(U.act(pi),x,-190.6);ZC.tick(10);U.act(pi).face=Math.PI;ZC.tick(2);ZC.press(U.K[pi].i);ZC.tick(50);
  const th=W.threads.find(t=>t.owner===pi&&!t.ret);r.push('th'+pi+'='+(th?th.len.toFixed(1):'none'));r.push(U.goto(pi,x,-206.5,10,0.4),pos(U.act(pi)));}
chk(U.act(0).pos.z<-205&&U.act(1).pos.z<-205,'ручей перешли по нити');ZC.tick(30);r.concat(BAD)
//@@
// теремок: первое бревно Потап несёт один, два других — вдвоём к срубу
const W=ZC.W,P=P2(),H=ZC.HERO,r=[];put(U.act(0),-2,-211);put(U.act(1),2,-211);r.push(U.until(()=>F().tmHi,3));ZC.tick(60*4);
{const L=P.LOGS[0],b=L.g.position;U.toKind('potap',0);put(H.potap,b.x-0.9,b.z);put(U.act(1),b.x+8,b.z-6);ZC.tick(20);r.push('potap '+L.state+' by='+(L.by&&L.by.kind));chk(L.state==='carry'&&L.by===H.potap,'Потап поднял бревно один');
  for(let i=0;i<60*14&&L.state==='carry';i++){U.step(0,P.TM.x,P.TM.z+3.4,0.3);ZC.tick(1);}U.rel(0);ZC.tick(50);r.push('potap log '+L.state+' logs='+F().logs);chk(F().logs===1,'бревно Потапа в срубе');U.toKind('proshka',0);}
for(const L of P.LOGS.slice(1)){const b=L.g.position;put(U.act(0),b.x-0.9,b.z);put(U.act(1),b.x+0.9,b.z);ZC.tick(20);const s0=L.state;
  for(let i=0;i<60*14&&L.state==='carry';i++){U.step(0,P.TM.x-1.0,P.TM.z+3.4,0.3);U.step(1,P.TM.x+1.0,P.TM.z+3.4,0.3);ZC.tick(1);}U.rel(0);U.rel(1);ZC.tick(50);r.push(s0+'>'+L.state);}
r.push('logs='+F().logs);chk(F().logs===3,'три бревна в срубе');r.concat(BAD)
//@@ shot=t11long_terem.png
ZC.tick(1);
//@@
// лесенка из чурбаков: с верха (4,4 м) Пелагея, планируя, долетает до лесов; Прошка (прыгает выше всех) — нет
window.fly=(pi,kind)=>{const W=ZC.W,P=W.part11,K=U.K[pi],h=ZC.HERO[kind];U.toKind(kind,pi);put(h,P.STEPS.top.x,P.STEPS.top.z,4.45);ZC.tick(20);const y0=h.pos.y;
  ZC.hold(K.B[2],true);ZC.tick(3);ZC.press(K.j);ZC.hold(K.j,true);ZC.tick(8);for(let i=0;i<180&&!h.grounded;i++)ZC.tick(1);ZC.hold(K.B[2],false);ZC.hold(K.j,false);ZC.tick(5);
  return {y0:+y0.toFixed(1),y:+h.pos.y.toFixed(1),z:+h.pos.z.toFixed(1)};};
F().logs=2;   // конёк пока не берётся (только подсказка) — подкидку Потапа проверяем следом
const r=[],pe=fly(1,'pelageya'),pr=fly(0,'proshka');F().logs=3;r.push('pelageya '+JSON.stringify(pe),'proshka '+JSON.stringify(pr),'konek='+!!F().konek);chk(!F().konek,'конёк ещё не на крыше');
chk(pe.y0>4.3&&pe.y>3.2&&pe.z<-230.4,'Пелагея долетела до лесов');chk(pr.y0>4.3&&pr.y<1,'Прошка с чурбаков до лесов не долетает');
put(ZC.HERO.pelageya,-3,-226);r.concat(BAD)
//@@
// конёк: Прошка в круг у лесов, Потап сзади — подкинул; петушок кукарекает, вороны улетают, новоселье
const W=ZC.W,P=P2(),H=ZC.HERO,r=[];U.toKind('proshka',0);put(H.proshka,P.TOSS.x,P.TOSS.z);put(H.potap,P.TOSS.x,P.TOSS.z+1.3);ZC.tick(20);U.toKind('potap',0);H.potap.face=Math.PI;ZC.tick(2);
ZC.press('KeyE');ZC.tick(90);r.push('konek='+!!F().konek,pos(H.proshka),'links='+W.links+'/'+W.linkTotal);chk(F().konek,'конёк на крыше');
r.push(U.until(()=>ZC.G.cine,8));r.push('flee='+!!P.RV.flee,'stage='+F().stage);ZC.tick(60*4);U.nocine();
r.push(U.until(()=>ZC.W.levelId!=='1-1',10),'lvl='+ZC.W.levelId,'got='+ZC.G.got['1-1'],'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''));chk(ZC.W.levelId!=='1-1','уровень пройден');chk(!_errs.length,'без ошибок');
r.concat(BAD).concat(BAD.length?[]:['t11long ok'])
