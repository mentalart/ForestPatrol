//@@ wait=1500
// @timeout=1200
// релиз final06: 1-Б «Леший-Путаник» — руки-коряги без глаз и на земле (аудит 1-Б, пункты А1–А3, late_99zdb_k1b_fix.js):
// урок 1 (руки только что появились — показ ставит их на землю) и 40 с боя: у ладоней нет глаз (ни общих глаз мороков, ни шариков прототипа),
// самая низкая точка ладони не ниже −0,1 м в любом состоянии, верх увязшей ладони — над травой; ошибок нет.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
{const B=ZC.FIN.k1b;B.tut.auto=true;}ZC.players.forEach(p=>{p.path='mid';});
ZC.startFrom(ZC.LV('1-B'));ZC.G.manual=true;ZC.tick(2);
window.X=ZC.FIN.k1b.fix;window.P0=new THREE.Vector3();window.low={};window.topStuck=9;
window.hands=()=>ZC.W.enemies.filter(e=>e.kind==='hand'&&e.alive);
window.meas=function(){const c=ZC.G.cine;for(const e of hands()){if(e.state==='spawn')continue;const lo=X.low(e),k=(c?'урок':'бой')+':'+(e.state==='demo'?(e.k1.dp||'idle'):e.state)+(e.dazeT>0?'+окно':'');
    low[k]=Math.min(low[k]==null?9:low[k],+lo.toFixed(2));
    if(e.dazeT>0||e.k1.stuck||(e.state==='demo'&&e.k1.dp==='stuck')){e.L.arm.localToWorld(P0.set(0,0.35,0.5));topStuck=Math.min(topStuck,P0.y);}}};
window.eyes=e=>e.inner.children.filter(c=>c.isMesh&&(c.material===e.eyeMat||c.material===ZC.MAT&&false)).length+(e.ff?1:0);
let n=0;while(n<60*45&&!(ZC.W.flags.phase===1&&!ZC.G.cine&&!ZC.FIN.k1b.tut.on&&n>60*20)){ZC.tick(1);meas();n++;}
const hs=hands();if(hs.length!==2)throw new Error('рук не две: '+hs.length);
const ey=hs.map(e=>eyes(e));if(ey.some(v=>v))throw new Error('у рук глаза: '+ey.join());
'урок: '+JSON.stringify(low)+' верх увязшей='+topStuck.toFixed(2)+' глаз=0'
//@@
// мост шире у ладони (16.10): первые метры — 3,2 м, ладонь лежащего моста не отталкивает
{const e=hands().find(q=>q.side<0);e.embers=0;e.state='broken';e.t=0;e.bdur=8;ZC.tick(70);const r=ZC.FIN.k1b.cur.ramps[0];if(!r)throw new Error('мост не лёг');
  const wd=r.cols.find(c=>c.k1wide);if(!wd||wd.w<1.5)throw new Error('нет широкого начала моста');const rp=r.cols[0],h=U.act(0),nx=rp.dz,nz=-rp.dx;
  h.pos.set(rp.x0+rp.dx*1.2+nx*1.35,1.5,rp.z0+rp.dz*1.2+nz*1.35);h.vel.set(0,0,0);ZC.tick(30);if(!(r.cols.includes(h.groundRef)))throw new Error('в 1,35 м от оси моста у ладони — не на мосту (y='+h.pos.y.toFixed(2)+')');
  if(!e.ghostly)throw new Error('ладонь лежащего моста отталкивает');window.wideOk='мост у ладони: полуширина '+wd.w+' на '+wd.len.toFixed(1)+' м';e.state='idle';e.t=0;e.embers=e.maxEmb;ZC.tick(60*3);}
let m=0;while(m<60*40){U.brawl(1/60);meas();m++;}
const bad=Object.entries(low).filter(([k,v])=>v<-0.1);if(bad.length)throw new Error('ладонь под землёй: '+JSON.stringify(bad));
if(topStuck<0.15)throw new Error('увязшая ладонь ушла в землю: верх '+topStuck.toFixed(2));
if(window._errs.length)throw new Error('ошибки: '+window._errs[0]);
wideOk+' · бой и урок: '+JSON.stringify(low)+' верх увязшей='+topStuck.toFixed(2)+' head='+ZC.W.flags.head+' errs=0'
