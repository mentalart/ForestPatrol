//@@ wait=1500
// релиз final06: мир 2 — Жемчужница и свободно плавающая щука (late_99k_kitezh_foes.js), вдвоём настоящими нажатиями.
// Жемчужница (торговые ряды 2-1, на дне пруда): створки закрыты — удар не проходит; отлив гуслями — ахает и раскрывается (Пробой), добили.
// Вторая Жемчужница: жемчужину отбили назад — Пробой, добили. Щука плавает над дном (не лежит), сама подплывает и держит дистанцию;
// отбили каплю — оглушена, опускается к дну, добили.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.NOCINE=()=>{for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}};
// бой одного игрока с выбранными мороками: держит 3,5 м, каплю/жемчужину отбивает в последний миг, в Пробой — подходит и бьёт
window.FIGHT=(pi,list,max)=>{const K=pi?{g:'Period',a:'Comma',B:['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']}:{g:'KeyG',a:'KeyF',B:['KeyA','KeyD','KeyW','KeyS']};const n=Math.round((max||30)*60);let refl=0;
  for(let i=0;i<n;i++){const alive=list.filter(e=>e.alive&&e.state!=='dying');if(!alive.length){K.B.forEach(k=>ZC.hold(k,false));return 'cleared t='+(i/60).toFixed(1)+' refl='+refl;}
    const h=U.act(pi),e=alive[0],dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z,d=Math.hypot(dx,dz);K.B.forEach(b=>ZC.hold(b,false));
    const want=e.state==='broken'?1.1:3.4;if(d>want+0.3){ZC.hold(K.B[0],dx<-0.3);ZC.hold(K.B[1],dx>0.3);ZC.hold(K.B[2],dz<-0.3);ZC.hold(K.B[3],dz>0.3);}
    const bo=ZC.W.bolts.find(b=>b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2);if(bo){ZC.press(K.g);refl++;}
    if(e.state==='broken'&&d<2.3){h.face=Math.atan2(dx,dz);if(i%10===0)ZC.press(K.a);}ZC.tick(1);}
  K.B.forEach(k=>ZC.hold(k,false));return 'TIMEOUT '+list.map(e=>e.state+':'+e.embers).join()+' refl='+refl;};
ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(60);NOCINE();const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
'kinds='+ZC.FIN.dbgFoeKinds().slice(-3).join(',')
//@@
// торговые ряды: Жемчужница в пруду; раков — долой; удар по закрытой — не проходит; отлив — ахнула, Пробой; добили
const D=ZC.W.warp21('market');ZC.tick(20);NOCINE();const r=[U.walkTo(0,-1.5,-160,6),U.walkTo(1,1.5,-160,6)];ZC.tick(60);
const cl=D.mkt.list.find(e=>e.kind==='zhemchug'&&e.alive);if(!cl)throw new Error('нет Жемчужницы в рядах: '+D.mkt.started+' '+D.mkt.list.map(e=>e.kind).join());
D.mkt.list.filter(e=>e.kind==='rak').forEach(e=>{e.alive=false;ZC.W.group.remove(e.g);});ZC.tick(60);
const h=U.act(0);h.pos.set(cl.pos.x-1.4,cl.pos.y+0.6,cl.pos.z+0.2);h.vel.set(0,0,0);ZC.tick(5);h.face=Math.atan2(cl.pos.x-h.pos.x,cl.pos.z-h.pos.z);const e0=cl.embers;ZC.press('KeyF');ZC.tick(30);
if(cl.embers!==e0||cl.state==='broken')throw new Error('закрытую пробили: '+cl.embers+' '+cl.state);
const MP=cl.zone,set=ZC.FIN.kwTest().setWater;if(MP.state!=='high'){set(MP,'high');ZC.tick(150);}if(cl.state==='broken')throw new Error('ахнула от прилива');set(MP,'low');ZC.tick(20);if(cl.state!=='broken')throw new Error('отлив — не ахнула: '+cl.state+' '+cl.zst);
const rf=FIGHT(0,[cl],8);if(cl.alive&&cl.state!=='dying')throw new Error('не добили: '+cl.state+' '+rf);'market clam ok '+r.join()+' '+rf
//@@ shot=k21_clam_open.png
ZC.tick(2);
//@@
// щука в правом канале Переливной улицы (охотится на Игрока 2, его канал): плавает над дном, движется; подплывает к герою; отбили каплю — оглушена, добили
ZC.W.warp21('perel');ZC.tick(30);NOCINE();const p=ZC.W.enemies.find(e=>e.kind==='shchuka'&&e.alive&&e.home.z<-85&&e.home.z>-100);if(!p)throw new Error('нет щуки в канале: '+ZC.W.enemies.filter(e=>e.kind==='shchuka').map(e=>e.home.z.toFixed(0)).join());
if(!p.swim)throw new Error('щука не плавает (swim)');const p0=p.pos.clone();ZC.tick(120);const moved=p.pos.distanceTo(p0);if(moved<0.3)throw new Error('щука стоит на месте: '+moved.toFixed(2));
const h=U.act(p.pi||0);h.pos.set(4,-2.2,-84);h.vel.set(0,0,0);ZC.tick(10);const res=FIGHT(p.pi||0,[p],40);if(p.alive&&p.state!=='dying')throw new Error('щуку не одолели: '+res+' '+p.state+' y='+p.pos.y.toFixed(2)+' h='+h.pos.toArray().map(v=>v.toFixed(1)));
'pike swims moved='+moved.toFixed(2)+' '+res
//@@ shot=k21_pike.png
ZC.tick(2);
//@@
// вторая Жемчужница на ровном месте торговых рядов (прочих мороков убрали): ждём жемчужину, отбиваем — Пробой — добиваем
ZC.W.warp21('market');ZC.tick(20);NOCINE();ZC.W.enemies.slice().forEach(e=>{e.alive=false;ZC.W.group.remove(e.g);});ZC.W.enemies.length=0;const r=[U.walkTo(0,-1.5,-160,6),U.walkTo(1,1.5,-160,6)];ZC.tick(30);
const h=U.act(0);const c2=ZC.FIN.pearlClam(h.pos.x,h.pos.z-5,null,h.pos.y,{pi:0});ZC.tick(60);let sawWind=false;for(let i=0;i<400&&!sawWind;i++){ZC.tick(1);if(c2.state==='wind')sawWind=true;}
const lid=c2.L.clamLid.rotation.x;const res=FIGHT(0,[c2],30);if(c2.alive&&c2.state!=='dying')throw new Error('Жемчужницу не одолели: '+res+' '+c2.state+' emb='+c2.embers);
'clam reflect ok '+r.join()+' wind='+sawWind+' lid='+lid.toFixed(2)+' '+res
//@@
// одиночная игра: Прошка (игрок 0) заходит в правый канал Переливной улицы — щука охотится и на неё, а не только на героя игрока 2
ZC.setSolo(true);ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(60);NOCINE();ZC.W.warp21('perel');ZC.tick(30);NOCINE();
const p=ZC.W.enemies.find(e=>e.kind==='shchuka'&&e.alive&&e.home.z<-85&&e.home.z>-100);if(!p)throw new Error('нет щуки в канале');
const h=U.act(ZC.G.soloPi);if(h.kind!=='proshka')throw new Error('в одиночке не Прошка: '+h.kind);h.pos.set(5.5,-2.2,-86);h.vel.set(0,0,0);
let hunted=-1;for(let i=0;i<900&&hunted<0;i++){ZC.tick(1);if((p.state==='ready'||p.state==='wind')&&p.tgt===h)hunted=i;}
if(hunted<0)throw new Error('щука не охотится на Прошку в своём канале: '+p.state+' d='+Math.hypot(p.pos.x-h.pos.x,p.pos.z-h.pos.z).toFixed(1)+' pi='+p.pi);
'pike hunts solo hero t='+(hunted/60).toFixed(1)
//@@
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'foes errs=0'
