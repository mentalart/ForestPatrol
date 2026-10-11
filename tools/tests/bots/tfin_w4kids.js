//@@
// мир 4: детские таймеры головоломок (late_99w4_kids.js) — Лёгкий (Ёжик) / Средний (Лисёнок) / Богатырский:
// корка 11/10/8 с, запруда 9/8/6, латы болвана 14/12/10, остывание горячего 30/25/20, печник 8/6,5/5.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.setPath=p=>{ZC.players[0].path=p;ZC.players[1].path=p;};
window.near=(a,b,e)=>Math.abs(a-b)<(e||0.05);
'ok'
//@@
// корка (4-2): Йоша поливает лаву у старта
const out=[];
for(const [p,want] of [['easy',11],['mid',10],['hard',8]]){setPath(p);ZC.startFrom(ZC.LV('4-2'));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.tick(5);
  const W=ZC.W,Y=ZC.HERO.yosha;U.walkTo(1,0,-1.6,3);Y.face=Math.PI;ZC.tick(2);U.tap('KeyL');let c=null;for(let i=0;i<90&&!c;i++){ZC.tick(1);c=W.crusts.find(c=>!c.gone);}
  if(!c)throw new Error('нет корки на '+p);const t0=c.t+1/60;out.push(p+':'+t0.toFixed(1));if(!near(t0,want,0.1))throw new Error('корка '+p+': '+t0.toFixed(2)+' вместо '+want);}
'crust '+out.join(' ')
//@@
// запруда (4-2): стадия dam — щеколда; сколько плита ждёт до «расплавилась»
const out=[];
for(const [p,want] of [['easy',9],['mid',8],['hard',6]]){setPath(p);ZC.startFrom(ZC.LV('4-2'));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.tick(5);
  const W=ZC.W;W.flags.stage='dam';const mk=W.marks.find(m=>m.active());if(!mk)throw new Error('нет щеколды');mk.onHit();let t=0;while(W.k42.dam()!=='hot'&&t<120){ZC.tick(1);t++;}
  t=0;while(W.k42.dam()==='hot'&&t<60*15){ZC.tick(1);t++;}out.push(p+':'+(t/60).toFixed(1));if(!near(t/60,want,0.1))throw new Error('запруда '+p+': '+(t/60).toFixed(2)+' вместо '+want);}
'dam '+out.join(' ')
//@@
// остывание горячего (4-1): слиток вне горна 6 с
const out=[];
for(const [p,cool] of [['easy',30],['mid',25],['hard',20]]){setPath(p);ZC.startFrom(ZC.LV('4-1'));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.tick(5);
  const W=ZC.W;W.abil.kleshi=true;
  const it=W.hots.find(i=>i.kind==='slitok');it.pos.set(0,0,-30);it.heat=1;ZC.tick(360);const per=(1-it.heat)/6;out.push(p+':cool='+(1/per).toFixed(1));
  if(!near(1/per,cool,0.6))throw new Error('остывание '+p+': '+(1/per).toFixed(2)+' вместо '+cool);}
'hot '+out.join(' ')
//@@
// латы болвана и печник (арена 4-4): полить болвана; уголь вплотную к печнику
const out=[];
for(const [p,arm] of [['easy',14],['mid',12],['hard',10]]){setPath(p);ZC.startFrom(ZC.LV('4-4'));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.tick(5);
  const W=ZC.W;W.flags.stage='B';W.flags.doorOpen=true;const H=ZC.HERO;H.proshka.pos.set(0,0,-60.2);ZC.tick(5);let t=0;while(!W.enemies.length&&t<600){H.proshka.pos.set(0,0,-60.4);ZC.tick(1);t++;}
  const e=W.enemies.find(x=>x.kind==='bolvan'),pc=W.enemies.find(x=>x.kind==='pechnik');if(!e||!pc)throw new Error('нет арены 4-4: '+W.enemies.map(x=>x.kind));
  ZC.tick(60);const wt=W.waterTargets.find(w=>w.pos===e.pos&&w.onWater);wt.onWater();const a=e.coolT;
  const coal=W.hots[0];coal.heat=1;coal.gone=false;coal.carrier=null;coal.socket=null;coal.flying=false;coal.pos.set(pc.pos.x+0.4,pc.pos.y,pc.pos.z);ZC.tick(2);const f=pc.fed+2/60;
  out.push(p+':armor='+a+',pech='+f.toFixed(2));
  if(!near(a,arm,0.01))throw new Error('латы '+p+': '+a+' вместо '+arm);
  const pw={easy:8,mid:6.5,hard:5}[p];if(!near(f,pw,0.06))throw new Error('печник '+p+': '+f.toFixed(2)+' вместо '+pw);}
'arena '+out.join(' ')
//@@
(_errs.length?'FAIL tfin_w4kids errs='+_errs.join(' | '):'tfin_w4kids ok')
