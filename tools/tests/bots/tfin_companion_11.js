//@@ wait=1500
// релиз final06: напарник-бот проходит 1-1 «Избушка, повернись» за Игрока 2 (пеньки «раз-два-три», бой, мусор и корыто, грядки на нити, болото, калитка;
// за калиткой — яблоко, полено вдвоём, молочная речка по своей нити, брёвна теремка вдвоём);
// человека (Игрок 1) играет скрипт настоящими клавишами — те же приёмы, что в t11.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.CO=ZC.FIN.co;window.P=ZC.players;window.F=()=>ZC.W.flags;window.bot=()=>U.act(1);window.me=()=>U.act(0);
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1);
window.st=()=>'stage='+F().stage+' me='+pos(me())+' bot='+pos(bot())+' mode='+CO.mode+' obj='+(U.obj().split('|')[1]||'').slice(0,60);
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(30);CO.set(true);CO.skill=1;
['start '+st()]
//@@
// пеньки: человек садит Прошку и Потапа на два левых пенька, бот — Пелагею и Йошу на правые; на «ТРИ» оба жмут приём
const W=ZC.W,R=W.rzt,r=[];
r.push(U.goto(0,-6,-19,10,0.15),'seat1='+W.stumps.map(s=>s.hero?s.hero.kind[0]:'-').join(''));
U.tap('KeyQ');ZC.tick(8);r.push(U.goto(0,-2,-19,10,0.15),'seat2='+W.stumps.map(s=>s.hero?s.hero.kind[0]:'-').join(''));
r.push(U.until(()=>R.state==='count',20),'bot='+CO.mode);
r.push(U.until(()=>R.t>=2.0,4));ZC.press('KeyE');ZC.tick(2);r.push('press='+JSON.stringify(R.press),U.until(()=>R.state==='done',3),'state='+R.state);r.push(R.state==='done'?'stumps ok':'FAIL stumps');r
//@@
// избушка поворачивается, Яга ставит задачу (ролик пропускаем), кикиморки: человек и бот бьют ближайших к себе
window.hb=max=>{for(let i=0;i<max*60;i++){const al=ZC.W.enemies.filter(e=>e.alive);if(!al.length){U.rel(0);return 'cleared t='+(i/60).toFixed(1);}
  if(ZC.G.cine){ZC.skip();ZC.tick(5);continue;}
  if(!U.def(0,i)){const h=me();let e=null,bd=99;for(const x of al){const d=Math.hypot(x.pos.x-h.pos.x,x.pos.z-h.pos.z);if(d<bd){bd=d;e=x;}}if(e)U.hit(0,e,i);else U.rel(0);}ZC.tick(1);}U.rel(0);return 'TIMEOUT '+ZC.W.enemies.filter(e=>e.alive).map(e=>'pi'+e.pi+':'+e.state).join(',');};
const r=[U.until(()=>F().stage==='yaga'||F().stage==='fight'||ZC.G.cine,25),'stage='+F().stage];U.nocine();r.push(U.until(()=>ZC.W.enemies.some(e=>e.alive),12),'foes='+ZC.W.enemies.filter(e=>e.alive).map(e=>'pi'+e.pi).join(','));
const hr=hb(90);r.push(hr,'petals='+P[0].petals+','+P[1].petals,st(),/^cleared/.test(hr)&&P[1].petals===3?'fight ok':'FAIL fight');r
//@@
// уборка: человек и бот носят мусор в кучу; корыто — вдвоём (бот ждёт у корыта, потом идёт рядом с человеком)
const W=ZC.W,C=W.clean11,H=C.HEAP,B=C.TRB,r=[U.until(()=>F().stage==='clean',8)];
for(let k=0;k<14;k++){const left=C.TR.filter(t=>t.state==='ground');if(!left.length&&!me().trash)break;const h=me();
  if(h.trash){U.goto(0,H.x+1.6,H.z,10,0.4);continue;}
  let it=left.sort((a,b)=>Math.hypot(a.g.position.x-h.pos.x,a.g.position.z-h.pos.z)-Math.hypot(b.g.position.x-h.pos.x,b.g.position.z-h.pos.z))[0];if(it)U.goto(0,it.g.position.x,it.g.position.z,10,0.3);}
r.push('trash='+C.TR.map(t=>t.state[0]).join(''),'bot='+CO.mode);
r.push(U.goto(0,B.g.position.x-0.9,B.g.position.z,10,0.3));r.push(U.until(()=>B.state==='carry',10),'trough='+B.state);
for(let i=0;i<60*20&&B.state!=='done'&&B.state!=='fly';i++){U.step(0,H.x+1.0,H.z,0.4);ZC.tick(1);}U.rel(0);
r.push(U.until(()=>B.state==='done',6),'trough='+B.state,'clean='+C.cleanN(),'cleanDone='+!!F().cleanDone,F().cleanDone?'clean ok':'FAIL clean');r
//@@
// Яга раздаёт клубки (ролик пропускаем), грядки: человек переводит обоих своих героев по нити слева, бот — своих справа
window.cross=(pi,x,z0,z1)=>{const W=ZC.W,r=[U.goto(pi,x,z0,14,0.25)];ZC.tick(6);U.act(pi).face=Math.PI;for(let i=0;i<6&&!W.threads.some(t=>t.owner===pi&&!t.ret&&!t.string&&t.hero===U.act(pi));i++){ZC.press(U.K[pi].i);ZC.tick(30);}   // повторный бросок сначала сматывает прежнюю нить
  r.push(U.until(()=>{const th=W.threads.find(t=>t.owner===pi&&!t.ret&&!t.string&&t.hero===U.act(pi));return th&&th.len>=13;},4));{const th=W.threads.find(t=>t.owner===pi&&!t.ret&&!t.string);r.push(th?('th '+th.hero.kind[0]+' d='+th.dx.toFixed(2)+','+th.dz.toFixed(2)+' s='+th.sx.toFixed(1)+','+th.sz.toFixed(1)+' len='+th.len.toFixed(1)+' h='+pos(U.act(pi))):'nothread');}
  r.push(U.goto(pi,x,z1,10,0.3));return r.join(' ');};
const r=[U.until(()=>F().stage==='gift',8)];for(let i=0;i<10&&F().stage!=='yard';i++){if(ZC.G.cine)ZC.skip();ZC.tick(30);}r.push('stage='+F().stage,'clew='+ZC.W.abil.clew);
r.push('P1 '+cross(0,-5.5,-36.6,-52.8),'z='+me().pos.z.toFixed(1));U.tap('KeyQ');ZC.tick(8);
r.push('P1b '+cross(0,-5.5,-36.6,-52.8),'z='+me().pos.z.toFixed(1),'bot='+CO.mode);
const todo=()=>['pelageya','yosha'].map(k=>k[0]+ZC.HERO[k].pos.z.toFixed(0)).join(' ');
r.push(U.until(()=>ZC.HERO.pelageya.pos.z<-52.3&&ZC.HERO.yosha.pos.z<-52.3,30),'bot heroes '+todo(),(ZC.HERO.pelageya.pos.z<-52.3&&ZC.HERO.yosha.pos.z<-52.3)?'beds ok':'FAIL beds');r
//@@
// лужа: человек и бот бросают нити навстречу — нить к нити; затем по мосту переходят все четверо героев (человек — обоих по очереди)
const W=ZC.W,r=[];r.push('H '+U.goto(0,-1,-61.2,15,0.3));me().face=Math.PI;
for(let i=0;i<5&&!W.threads.some(t=>t.owner===0&&!t.ret&&t.hero===me()&&t.sz<-55);i++){ZC.press('KeyR');ZC.tick(20);}
r.push(U.until(()=>F().glued,10),'glued='+!!F().glued,'bot='+CO.mode+' '+pos(bot()));
r.push(U.until(()=>W.threads.filter(t=>!t.ret&&t.sz<-55).every(t=>!t.grow||t.len>=14.9),6));   // мост дорос
const rx=()=>{const rt=W.threads.find(t=>t.sz<-55&&!t.ret&&!t.string&&!t.parent);return rt?rt.sx:-1;};   // мост лёг по дорожке того, кто бросил первым
r.push('lane='+rx().toFixed(1),U.goto(0,rx(),-61.2,6,0.25),U.goto(0,rx(),-90,12,0.5),'z='+me().pos.z.toFixed(1));U.tap('KeyQ');ZC.tick(8);r.push(U.goto(0,rx(),-61.2,15,0.25),U.goto(0,rx(),-90,12,0.5),'z='+me().pos.z.toFixed(1));
r.push(U.until(()=>ZC.HERO.pelageya.pos.z<-88.5&&ZC.HERO.yosha.pos.z<-88.5,40),'links='+W.links+'/'+W.linkTotal+' '+W.items.filter(q=>q.kind==='link').map(q=>q.pos.x.toFixed(0)+':'+(q.taken?1:0)).join(' '),'bot heroes '+['pelageya','yosha'].map(k=>k[0]+ZC.HERO[k].pos.z.toFixed(0)).join(' '),(F().glued&&ZC.HERO.pelageya.pos.z<-88.5&&ZC.HERO.yosha.pos.z<-88.5)?'puddle ok':'FAIL puddle');r
//@@
// калитка-упрямица (открыта, пока лапки нажаты): Прошка держит левую наружную, бот — Йошей правую; Потап и Пелагея проходят и встают на внутренние;
// тогда проходят Йоша и Прошка
const W=ZC.W,C=W.clean11,H=ZC.HERO,r=['human '+pos(H.proshka)+' '+pos(H.potap)];
for(const[k,x]of[['proshka',-4],['potap',-2.5]])if(H[k].pos.z>-95){H[k].pos.set(x,0,-97);H[k].vel.set(0,0,0);}   // герой человека, оставшийся за болотом (чудо столкнуло), — к калитке: здесь проверяется бот
U.toKind('proshka',0);r.push(U.goto(0,-5.5,-102.5,15,0.2));
r.push(U.until(()=>C.gateOpen(),20),'plates='+C.PL.map(p=>p.on?1:0).join(''));U.toKind('potap',0);
r.push(U.goto(0,-1.2,-104.6,12,0.3),U.goto(0,-1.2,-110,6,0.3),U.goto(0,-5.5,-111.5,6,0.2));
r.push(U.until(()=>C.PL[2].on&&C.PL[3].on,25),'inner='+C.PL.map(p=>p.on?1:0).join(''));
r.push(U.until(()=>H.yosha.pos.z<-108.4&&H.pelageya.pos.z<-108.4,30),'bot heroes '+['pelageya','yosha'].map(k=>k[0]+H[k].pos.z.toFixed(0)).join(' '));
U.toKind('proshka',0);r.push(U.goto(0,-1.2,-104.6,10,0.3),U.goto(0,-1.2,-113.6,8,0.4));
r.push(U.until(()=>F().out,10),'out='+!!F().out,'heroes='+Object.values(H).map(h=>h.kind[0]+h.pos.z.toFixed(0)).join(' '),F().out?'gate ok':'FAIL gate');r
//@@
// за калиткой: вороны прилетели (ролик пропускаем; в проверке напарника их пике выключены), яблонька — бот съедает яблоко, полено — вдвоём
const W=ZC.W,P=W.part11,H=ZC.HERO,r=[U.until(()=>ZC.G.cine,4)];U.nocine();ZC.tick(10);P.RV.cd=1e9;U.tap('Digit1');ZC.tick(5);
const Y=P.YB;r.push(U.goto(0,Y.x-1.2,Y.z+1.1,20,0.3));me().face=Math.atan2(Y.x-me().pos.x,Y.z-me().pos.z);ZC.press('KeyF');ZC.tick(60);
const ap=P.APL.filter(a=>a.down).sort((a,b)=>Math.hypot(a.x-me().pos.x,a.z-me().pos.z)-Math.hypot(b.x-me().pos.x,b.z-me().pos.z))[0];if(ap)r.push(U.goto(0,ap.x,ap.z,6,0.3));
r.push(U.until(()=>F().appleHide,15),'apples='+F().apples,F().appleHide?'apple ok':'FAIL apple');
const L=P.LG;r.push(U.goto(0,L.g.position.x-0.9,L.g.position.z,20,0.3));r.push(U.until(()=>L.state==='carry',15),'log='+L.state,'bot='+pos(bot()));
for(let i=0;i<60*20&&L.state==='carry';i++){U.step(0,P.PCF.x-0.9,P.PCF.z+0.3,0.3);ZC.tick(1);}U.rel(0);
r.push(U.until(()=>F().smoke,4),'smoke='+!!F().smoke,F().smoke?'log ok':'FAIL log');r
//@@
// воронья роща в дыму, молочная речка: человек — по своей нити слева, бот переводит обоих героев по своей справа
const W=ZC.W,P=W.part11,H=ZC.HERO,r=[];r.push(U.goto(0,-2,-153,6,0.4),U.goto(0,-2,-160,6,0.4),U.goto(0,-5,-190.6,25,0.3));   // печку — обойтиme().face=Math.PI;
for(let i=0;i<5&&!W.threads.some(t=>t.owner===0&&!t.ret&&t.sz<-185);i++){ZC.press('KeyR');ZC.tick(20);}ZC.tick(30);r.push(U.goto(0,-5,-206.6,12,0.3),'z='+me().pos.z.toFixed(1));
r.push(U.until(()=>H.pelageya.pos.z<-205&&H.yosha.pos.z<-205,45),'bot heroes '+['pelageya','yosha'].map(k=>k[0]+H[k].pos.z.toFixed(0)).join(' '),(H.pelageya.pos.z<-205&&H.yosha.pos.z<-205)?'river ok':'FAIL river');
if(H.potap.pos.z>-205){H.potap.pos.set(-4,0,-207.5);H.potap.vel.set(0,0,0);}   // Потапа человек перевёл бы сам — здесь проверяется бот
r.push(pos(H.potap));r
//@@
// теремок: три бревна вдвоём (бот встаёт с другой стороны), конёк — подкидкой Потапа, новоселье
const W=ZC.W,P=W.part11,H=ZC.HERO,r=[];r.push(U.goto(0,-2,-212,10,0.4),U.until(()=>F().tmHi,4));
for(let n=0;n<3;n++){const L=P.LOGS.find(q=>q.state==='ground');if(!L)break;r.push(U.goto(0,L.g.position.x+(L.g.position.x<0?-0.9:0.9),L.g.position.z,15,0.3));
  r.push(U.until(()=>L.state==='carry',20));for(let i=0;i<60*20&&L.state==='carry';i++){U.step(0,P.TM.x+(me().pos.x<0?-1:1),P.TM.z+3.4,0.3);ZC.tick(1);}U.rel(0);ZC.tick(60);r.push('log'+n+'='+L.state);}
r.push('logs='+F().logs,F().logs===3?'logs ok':'FAIL logs');
U.toKind('proshka',0);r.push(U.goto(0,P.TOSS.x,P.TOSS.z,10,0.2));U.toKind('potap',0);H.potap.following=false;H.potap.pos.set(P.TOSS.x,0,P.TOSS.z+1.3);H.potap.vel.set(0,0,0);ZC.tick(6);   // Потапа — за Прошку (он шёл следом по «Ко мне!»)
H.potap.face=Math.PI;ZC.tick(2);r.push('toss '+pos(H.proshka)+' '+pos(H.potap)+' bot '+pos(bot()));ZC.press('KeyE');ZC.tick(90);
const kon=!!F().konek;r.push('konek='+kon,pos(H.proshka));r.push(U.until(()=>ZC.G.cine,8));ZC.tick(60*3);U.nocine();
r.push(U.until(()=>ZC.W.levelId!=='1-1',10),'lvl='+ZC.W.levelId,'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''),(kon&&ZC.W.levelId!=='1-1'&&!_errs.length)?'1-1 ok':'FAIL 1-1');r
