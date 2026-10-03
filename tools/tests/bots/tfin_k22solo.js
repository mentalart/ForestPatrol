//@@ wait=1500
// релиз final06: 2-2 «Чудо-юдо Рыба-кит» в одиночном режиме (клавиши Игрока 1, Q — по кругу Прошка → Потап → Пелагея → Йоша):
// хвост — Потап валит сосну через трещину; деревня — Совиный взор, прилив, Потап выпускает щуку; печка едет, когда сел тот, кем играешь;
// бока — Потап выдёргивает колья, Йоша лечит раны (рёбра ходят); губа — желуди на плугах, высокий — рогаткой; между глаз — хоровод
// одному (горят только твои камушки); дубрава — Пелагея сама смотрит Совиным взором и собирает боровики; голова — кит ныряет,
// колыбельная в три куплета: в лад с волной (оставленный держит напев, второй — в лад), звёздочки Совиным взором, четыре голоса; облако и звено.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(true);ZC.startFrom(ZC.LV('2-2'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(60);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
window.H=ZC.HERO;window.B0=['KeyA','KeyD','KeyW','KeyS'];window.rel=()=>B0.forEach(k=>ZC.hold(k,false));
window.me=()=>U.act(ZC.G.soloPi);window.toKind=k=>{for(let i=0;i<4&&me().kind!==k;i++){ZC.press('KeyQ');ZC.tick(4);}return me().kind;};
window.go=(x,z,max,extra)=>{const n=Math.round((max||8)*60);for(let i=0;i<n;i++){const h=me(),dx=x-h.pos.x,dz=z-h.pos.z;if(Math.hypot(dx,dz)<0.45){rel();ZC.tick(1);return 't='+(i/60).toFixed(2);}
    ZC.hold(B0[0],dx<-0.25);ZC.hold(B0[1],dx>0.25);ZC.hold(B0[2],dz<-0.25);ZC.hold(B0[3],dz>0.25);if(extra)extra(h,i);ZC.tick(1);}rel();ZC.tick(1);return 'TIMEOUT';};
window.callAll=(near)=>{U.tap('Digit1');for(let i=0;i<60*12;i++){ZC.tick(1);if(i>60&&['proshka','potap','pelageya','yosha'].every(k=>Math.hypot(H[k].pos.x-me().pos.x,H[k].pos.z-me().pos.z)<(near||6)))return 't='+(i/60).toFixed(1);if(i%240===239)U.tap('Digit1');}return 'TIMEOUT';};
window.SBRAWL=function(max,list){const n=Math.round((max||30)*60);const B=['KeyA','KeyD','KeyW','KeyS'];   // бой одним героем (в одиночку обе раскладки ведут одного героя — U.brawl тут мешает сам себе)
  for(let i=0;i<n;i++){const alive=(list||ZC.W.enemies).filter(e=>e.alive);if(!alive.length){B.forEach(k=>ZC.hold(k,false));return 'cleared t='+(i/60).toFixed(1);}
    const h=me();let e=null,bd=99;for(const x of alive){const d=Math.hypot(x.pos.x-h.pos.x,x.pos.z-h.pos.z);if(d<bd){bd=d;e=x;}}
    const dx=e.pos.x-h.pos.x,dz=e.pos.z-h.pos.z;const far=bd>1.9+e.r&&!(e.state==='wind'&&e.tgt===h);B.forEach(b=>ZC.hold(b,false));
    if(far){const inv=Math.abs(ZC.W.camYaw)>1;ZC.hold(B[0],inv?dx>0.3:dx<-0.3);ZC.hold(B[1],inv?dx<-0.3:dx>0.3);ZC.hold(B[2],inv?dz>0.3:dz<-0.3);ZC.hold(B[3],inv?dz<-0.3:dz>0.3);}
    const bo=ZC.W.bolts.find(b=>b.tgt===h&&!b.refl&&b.left===null&&b.eta<0.2);if(bo)ZC.press('KeyG');
    const w=alive.find(x=>x.state==='wind'&&x.tgt===h);if(w){const left=w.wdur-w.t;if(w.sig==='red'){if(left<0.2)ZC.press('ShiftLeft');}else if(left<0.16&&w.left===null)ZC.press('KeyG');}
    if(!far&&((e.state==='stagger'&&!e.openHit)||e.state==='broken'||e.open>0||e.dazeT>0||(e.shell&&(i%12===0)))){h.face=Math.atan2(dx,dz);if(i%9===0)ZC.press('KeyF');}
    ZC.tick(1);}
  B.forEach(k=>ZC.hold(k,false));return 'TIMEOUT alive='+(list||ZC.W.enemies).filter(e=>e.alive).map(e=>e.kind+':'+e.state+':'+e.embers).join(',');};
window.st=()=>U.st()+' errs='+_errs.length;
window.BOARD=(max)=>{const D=ZC.W.dbg22();for(let i=0;i<(max||6)*60;i++){const h=me();if(h.groundRef===D.STV.col){rel();return 't='+(i/60).toFixed(2);}
    const dx=D.STV.x-h.pos.x,dz=D.STV.z-h.pos.z,d=Math.hypot(dx,dz);ZC.hold(B0[0],dx<-0.2);ZC.hold(B0[1],dx>0.2);ZC.hold(B0[2],dz<-0.2);ZC.hold(B0[3],dz>0.2);if(h.grounded&&d<2.8)ZC.press('Space');ZC.tick(1);}rel();return 'TIMEOUT';};
window.STEPs=(x,z,jumpIf)=>{const h=me(),dx=x-h.pos.x,dz=z-h.pos.z,far=Math.hypot(dx,dz)>0.4;ZC.hold(B0[0],far&&dx<-0.2);ZC.hold(B0[1],far&&dx>0.2);ZC.hold(B0[2],far&&dz<-0.2);ZC.hold(B0[3],far&&dz>0.2);if(jumpIf&&jumpIf(h))ZC.press('Space');return !far;};
window.HOPs=(x,z,max)=>{for(let t=0;t<(max||8)*60;t++){if(STEPs(x,z,hh=>hh.grounded&&hh.blocked)){rel();return 't='+(t/60).toFixed(1);}ZC.tick(1);}rel();return 'TIMEOUT@'+me().pos.toArray().map(v=>v.toFixed(1));};
// по рёбрам одним героем: к соседнему ребру — прыгать, когда сошлись; из складки — сразу
window.RIBTOs=(i,x,max)=>{const D=ZC.W.dbg22();for(let t=0;t<(max||14)*60;t++){const h=me(),R=D.RIB[i];if(h.groundRef===R.col&&h.grounded&&Math.abs(h.pos.x-x)<0.6){rel();return 't='+(t/60).toFixed(1);}
    const cur=D.RIB.find(q=>h.groundRef===q.col);const tz=R.z+0.6,gap=cur?Math.abs(cur.z-R.z)-3.0:1;const near=Math.abs(h.pos.z-tz)<1.3;if(h.prilip&&t%30===0)ZC.press('ShiftLeft');
    if(cur&&cur!==R&&gap>2.6){STEPs(x,h.pos.z);rel();STEPs(x,cur.z+(R.z<cur.z?-1.0:1.0));}else STEPs(x,tz,hh=>hh.grounded&&(hh.groundRef!==R.col)&&(cur?!near&&gap<2.6:true));ZC.tick(1);}
  rel();return 'TIMEOUT@'+me().pos.toArray().map(v=>v.toFixed(1));};
window.RIBSEQs=(i,x,max)=>{const D=ZC.W.dbg22();let out='';for(let j=0;j<=i;j++){if(D.RIB[j].z0>me().pos.z+1.6)continue;out=RIBTOs(j,j===i?x:0,max);if(out.startsWith('TIMEOUT'))return 'r'+j+out;}return out;};
window.NOCINE=()=>{for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}};
'solo='+ZC.G.solo
//@@
// хвост: Потап валит сосну через трещину — по стволу на тот берег
ZC.tick(30);NOCINE();ZC.tick(10);NOCINE();const D=ZC.W.dbg22();toKind('potap');const r=[go(4.2,33.8,6)];U.tap('KeyE');ZC.tick(100);if(!D.F.log)throw new Error('сосна не повалена: '+r.join()+' '+st());
r.push(go(0,31,5),go(0,23.5,6));if(!(me().pos.z<25))throw new Error('не перешли трещину: '+r.join()+' '+st());'tail solo '+r.join()
//@@
// деревня: Совиный взор — ведро со щукой светится; прилив в пруду; Потап выпускает щуку — печка выезжает
const D=ZC.W.warp22('village');ZC.tick(20);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}toKind('pelageya');const r=[go(2,-88,6)];U.tap('KeyE');ZC.tick(20);
const pk=D.BUCK[D.PIKE_AT];if(!(pk.glow.material.opacity>0.2))throw new Error('ведро со щукой не светится');
toKind('potap');r.push(go(0.6,-84.2,8));U.tap('KeyR');ZC.tick(220);if(D.PZ.state!=='high')throw new Error('пруд не наполнился: '+D.PZ.state+' '+r.join()+' '+st());
r.push(go(pk.x+(pk.x<0?1.3:-1.3),pk.z,8));U.tap('KeyE');ZC.tick(10);if(!D.F.pikeFree)throw new Error('щука не выпущена: '+r.join()+' '+st());
let t=0;while(ZC.G.cine&&t<3000){ZC.tick(1);t++;}t=0;while(D.STV.state!=='wait'&&t<900){ZC.tick(1);t++;}if(D.STV.state!=='wait')throw new Error('печка не выехала');'village solo '+r.join()
//@@
// печка: сел Потап — поехали; раки — бой (только с тем, что загородил); волна — щит
const D=ZC.W.dbg22();const r=[BOARD(10)];ZC.tick(5);if(D.STV.state!=='ride')throw new Error('печка не поехала: '+r.join()+' '+st());
for(let i=0;i<60*120&&D.STV.state!=='done';i++){const crab=D.STV.crabs.find(e=>e.alive&&Math.hypot(e.pos.x-D.STV.x,e.pos.z-D.STV.z)<7);
  if(crab){ZC.hold('KeyG',false);const rb=SBRAWL(25,[crab]);r.push('crab:'+rb,'board:'+BOARD(8));continue;}
  const w=D.STV.wave;ZC.hold('KeyG',!!w&&w.t>-0.7&&w.t<1.3);const h=me();if(h.groundRef!==D.STV.col&&h.grounded){r.push('board:'+BOARD(8));continue;}ZC.tick(1);}
ZC.hold('KeyG',false);if(D.STV.state!=='done')throw new Error('не доехали: '+r.join()+' '+st());'ride solo '+r.join()
//@@ shot=k22s_ride.png
// бока: Потап выдёргивает кол, Йоша (её очередь) догоняет по рёбрам и лечит рану; так — три частокола
const D=ZC.W.warp22('ribs');ZC.tick(20);NOCINE();const r=[];
// сбросило с ребра (выдох, прилипала) — вернуться на ребро у частокола и продолжить
const BACK=(P,x)=>{const h=me();if(h.grounded&&h.groundRef!==P.R.col)r.push('back:'+RIBSEQs(P.R.i,x,12));};
for(const P of D.PALS){const i=P.R.i;toKind('potap');r.push('p'+i+':'+RIBSEQs(i,2.6,20));for(let k=0;k<300&&!P.pulled;k++){me().face=Math.PI;if(k%40===39)BACK(P,2.6);if(me().prilip&&k%30===15)ZC.press('ShiftLeft');if(k%50===0)U.tap('KeyE');ZC.tick(1);}
  toKind('yosha');r.push('y'+i+':'+RIBSEQs(i,0,25));for(let k=0;k<320&&!P.healed;k++){me().face=Math.PI;if(k%40===39)BACK(P,0);if(me().prilip&&k%30===15)ZC.press('ShiftLeft');if(k%50===0)U.tap('KeyE');ZC.tick(1);}
  if(!P.pulled||!P.healed)throw new Error('частокол '+i+': pulled='+P.pulled+' healed='+P.healed+' '+r.join()+' '+st());}
let t=0;while(!ZC.G.cine&&t<240){ZC.tick(1);t++;}const eye=!!ZC.G.cine;NOCINE();r.push(RIBSEQs(5,0,14),HOPs(0,-190,10),callAll(8));
if(!(me().pos.z<-186))throw new Error('бока не пройдены: '+r.join()+' '+st());'ribs solo eye='+eye+' '+r.join()
//@@ shot=k22s_ribs.png
// губа: Прошка сбивает желуди с плугов (по три удара), высокий — рогаткой
const D=ZC.W.warp22('lip');ZC.tick(20);NOCINE();toKind('proshka');const B=D.BARN;const r=[];
for(let i=0;i<60*80&&!D.F.plough;i++){const b=B.find(q=>!q.gone&&!q.high);const h=me();if(me().prilip&&i%30===15)ZC.press('ShiftLeft');
  if(b){STEPs(b.x+1.3,b.z+0.8);if(Math.hypot(h.pos.x-b.x,h.pos.z-b.z)<2&&i%12===0){h.face=Math.atan2(b.x-h.pos.x,b.z-h.pos.z);ZC.press('KeyF');}}
  else if(!B[2].gone){STEPs(-4,-246);if(Math.hypot(h.pos.x+4,h.pos.z+246)<1.2&&i%40===0){h.face=Math.atan2(B[2].x-h.pos.x,B[2].z-h.pos.z);ZC.press('KeyE');}}ZC.tick(1);}
rel();if(!D.F.plough)throw new Error('плуги не освобождены: '+B.map(b=>b.gone)+' '+st());ZC.tick(120);r.push(go(0,-266,20),callAll(8));
if(!(me().pos.z<-264))throw new Error('плетень не пройден: '+r.join()+' '+st());'lip solo '+r.join()
//@@
// между глаз: хоровод одному — горят только твои камушки
const D=ZC.W.warp22('eyes');ZC.tick(20);NOCINE();const r=[go(-1,-277,6)];for(let i=0;i<60*40&&!D.DC.done;i++){const S=D.DC.stones.find(q=>q.lit===ZC.G.soloPi);if(S)STEPs(S.x,S.z);ZC.tick(1);}
rel();if(!D.DC.done)throw new Error('не наплясались: '+D.DC.score+' '+st());ZC.tick(60);r.push(go(0,-305,8));'dance solo score='+D.DC.score+' '+r.join()
//@@ shot=k22s_eyes.png
// дубрава: Пелагея смотрит Совиным взором и сама собирает боровики (мухоморы обходит)
const D=ZC.W.warp22('grove');ZC.tick(20);NOCINE();toKind('pelageya');window._det=0;
for(let i=0;i<60*90&&!D.GR.done;i++){const h=me();if(i%240===0)ZC.press('KeyE');if(h.prilip&&i%30===15)ZC.press('ShiftLeft');
  const m=D.MUSH.filter(q=>!q.got&&q.real&&q.seen>0).sort((a,b)=>Math.hypot(a.x-h.pos.x,a.z-h.pos.z)-Math.hypot(b.x-h.pos.x,b.z-h.pos.z))[0];if(h.blocked)window._det=40;if(m&&window._det>0){window._det--;STEPs(0,h.pos.z+(m.z<h.pos.z?-0.6:0.6));}else if(m)STEPs(m.x,m.z);else rel();ZC.tick(1);}   // упёрлась в дуб — в обход по тропке посередине
rel();if(!D.GR.done)throw new Error('грибы не собраны: '+D.GR.got+' '+st());ZC.tick(60);'grove solo got='+D.GR.got
//@@
// голова: кит ныряет; колыбельная одному в три куплета: в лад с волной (Прошка держит напев, Потап играет), звёздочки — Пелагея, четыре голоса — трое держат, Йоша играет
const D=ZC.W.dbg22();const r=[callAll(8),go(0,-364,12)];let t=0;while(!ZC.G.cine&&t<300){ZC.tick(1);t++;}if(!D.FN.dive)throw new Error('кит не нырнул: '+r.join()+' '+st());NOCINE();
const S=D.lulShells;toKind('proshka');const up=(x,z,max)=>{for(let i=0;i<(max||20)*60;i++){if(STEPs(x,z,hh=>hh.grounded&&hh.pos.y<8.3)&&Math.abs(me().pos.y-8.5)<0.6){rel();return 't='+(i/60).toFixed(1);}ZC.tick(1);}rel();return 'TIMEOUT@'+me().pos.toArray().map(v=>v.toFixed(1));};
const L=D.LS,SPOT=i=>[S[i].x*0.86,S[i].z+(i===2?-0.6:i===3?0.6:0)];r.push(callAll(8));
// у ракушки i: дойти (и запрыгнуть на макушку), true — на месте
const ONs=i=>{const [x,z]=SPOT(i),h=me();if(Math.hypot(h.pos.x-x,h.pos.z-z)<0.9&&Math.abs(h.pos.y-8.5)<0.6){rel();return true;}STEPs(x,z,hh=>hh.grounded&&hh.pos.y<8.3);return false;};
const PLAYQ=i=>{const who=me().kind;ZC.tick(45);   // гусли — раз в 0,7 с на игрока (Прошка и Потап — один игрок)
let k=0;for(;k<60*15&&!ONs(i);k++)ZC.tick(1);ZC.press('KeyR');ZC.tick(2);U.tap('KeyQ');ZC.tick(5);return (Object.values(ZC.HERO).some(h=>h.kwHold&&h.kwHold.ref===S[i].ref)?'':who+(k>=900?'-far':'')+'-')+Object.values(ZC.HERO).some(h=>h.kwHold&&h.kwHold.ref===S[i].ref);};
// куплет 1: Прошка играет на первой и уступает — держит напев; Потап — на второй, в лад с волной
toKind('proshka');r.push('hold='+PLAYQ(0)+' now='+me().kind);
for(let i=0;i<60*90&&L.stage<2&&!ZC.G.cine;i++){if(!Object.values(ZC.HERO).some(h=>h.kwHold&&h.kwHold.ref===S[0].ref)&&S[0].ref.hum<=0){toKind('proshka');PLAYQ(0);toKind('potap');}
  if(ONs(1)&&Math.abs(L.bt-0.7*L.per)<0.1&&ZC.G.time-S[1].ref.press>1)ZC.press('KeyR');ZC.tick(1);}rel();
if(L.stage<2)throw new Error('куплет 1 не спет: строк '+L.lines+' '+r.join()+' '+st());r.push('v1 lines='+L.lines);
// куплет 2: Пелагея — Совиным взором, звёздочки ловит прыжком сама
toKind('pelageya');for(let i=0;i<60*120&&L.stage<3&&!ZC.G.cine;i++){const vis=D.STARS.filter(q=>!q.got&&q.seen>0);if(!vis.length){rel();if(i%90===0)U.tap('KeyE');ZC.tick(1);continue;}
  const h=me(),q=vis.sort((a,b)=>Math.hypot(a.g.position.x-h.pos.x,a.g.position.z-h.pos.z)-Math.hypot(b.g.position.x-h.pos.x,b.g.position.z-h.pos.z))[0],x=q.g.position.x,z=q.g.position.z;
  STEPs(x,z,hh=>hh.grounded&&Math.hypot(x-hh.pos.x,z-hh.pos.z)<0.7);ZC.tick(1);}rel();
if(L.stage<3)throw new Error('звёздочки не пойманы: '+L.got+' '+r.join()+' '+st());r.push('v2 got='+L.got);ZC.tick(100);
// куплет 3: трое держат напев, четвёртый играет — все четыре разом
for(let n=0;n<3&&!D.FN.done;n++){toKind('proshka');r.push('h0='+PLAYQ(0));r.push('h1='+PLAYQ(1));r.push('h2='+PLAYQ(2));
  for(let k=0;k<60*12&&!D.FN.done&&!ZC.G.cine;k++){if(ONs(3)&&S[3].ref.hum<1)ZC.press('KeyR');ZC.tick(1);}rel();}
r.push('v3 lull='+D.FN.lull.toFixed(1));
if(!D.FN.done)throw new Error('колыбельная не спета: lull='+D.FN.lull.toFixed(1)+' '+r.join()+' '+st());t=0;while(ZC.G.cine&&t<3000){ZC.tick(1);t++;}ZC.tick(30);r.push(go(0,-438,6));ZC.tick(120);
'head solo '+r.join()+' link='+D.endLink.taken+' lvl='+ZC.W.levelId
//@@ shot=k22s_cloud.png
if(ZC.W.levelId==='2-2'&&!ZC.W.flags.out)throw new Error('уровень не пройден: '+st());if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-2 solo done errs=0'
