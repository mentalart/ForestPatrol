//@@ wait=1500
// релиз final06: 2-1 сад Китежа — винтовые лесенки из водорослей проходимы КАЖДЫМ героем (и тяжёлым Потапом с его низким прыжком):
// дно открыто (отлив), обе лесенки выросли; герой встаёт у ростка, прыгает с листа на лист по кругу и выходит на террасу (y 4,5).
// Потом то же — в приливе (сад залит, Потап не всплывает и идёт по дну, остальные — из воды на листья).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(true);ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(60);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}
window.H=ZC.HERO;window.B0=['KeyA','KeyD','KeyW','KeyS'];window.rel=()=>B0.forEach(k=>ZC.hold(k,false));
window.me=()=>U.act(ZC.G.soloPi);window.toKind=k=>{for(let i=0;i<4&&me().kind!==k;i++){ZC.press('KeyQ');ZC.tick(4);}return me().kind;};
// с листа на лист: идти к следующему листу и прыгать, пока не встанешь на него
window.CLIMB=(S,from)=>{let n=0,jumps=0;for(const L of S.leaves.slice(from||0)){const c=L.col;let ok=false;for(let i=0;i<300;i++){const h=me(),dx=c.x-h.pos.x,dz=c.z-h.pos.z,d=Math.hypot(dx,dz);
    ZC.hold(B0[0],dx<-0.12);ZC.hold(B0[1],dx>0.12);ZC.hold(B0[2],dz<-0.12);ZC.hold(B0[3],dz>0.12);if(h.grounded&&h.groundRef===c&&d<0.4){ok=true;break;}
    if(h.grounded&&c.maxy>h.pos.y+0.2&&d<1.8){ZC.press('Space');jumps++;}ZC.tick(1);}
  rel();ZC.tick(2);if(!ok)return 'stuck@'+n+' y='+me().pos.y.toFixed(2);n++;}return 'ok jumps='+jumps;};
window.TERRACE=()=>{for(let i=0;i<120;i++){const h=me();ZC.hold(B0[2],true);ZC.tick(1);if(h.pos.z<-259.6&&h.pos.y>4.3)break;}rel();ZC.tick(5);return me().pos.y>4.3&&me().pos.z<-259.4;};
const D=ZC.W.warp21('garden');ZC.tick(20);for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}ZC.W.flags.anchor=true;D.KS.forEach(S=>ZC.FIN.kwGrowKelp(S,true));ZC.tick(5);
'leaves='+D.KS.map(S=>S.leaves.length+' top='+S.leaves[S.leaves.length-1].col.maxy.toFixed(2)).join(' | ')
//@@
// отлив: каждый герой — по левой лесенке на террасу
const D=ZC.W.dbg21();D.GARD.holdT=999;ZC.FIN.kwTest().setWater(D.GARD,'low');ZC.tick(150);if(D.GARD.state!=='low')throw new Error('сад не осушился');const r=[];
for(const k of['potap','pelageya','proshka','yosha']){toKind(k);const h=me(),p=D.KS[0].g.position;h.pos.set(p.x+0.3,-4,p.z+0.4);h.vel.set(0,0,0);ZC.tick(10);const c=CLIMB(D.KS[0]),t=TERRACE();r.push(k+':'+c+(t?' up':' NOT'));if(!t)throw new Error(k+' не вышел на террасу: '+r.join(' / '));}
'low '+r.join(' / ')
//@@ shot=k21kelp.png
ZC.tick(2);
//@@
// прилив: сад залит — Потап идёт по дну и прыгает по листьям под водой, остальные — из воды на листья; правая лесенка
const D=ZC.W.dbg21();ZC.FIN.kwTest().setWater(D.GARD,'high');ZC.tick(150);if(D.GARD.state!=='high')throw new Error('сад не залился');const r=[];
for(const k of['potap','pelageya']){toKind(k);const h=me(),p=D.KS[1].g.position;h.pos.set(p.x-0.3,k==='potap'?-4:0.8,p.z+0.4);h.vel.set(0,0,0);ZC.tick(20);const from=k==='potap'?0:D.KS[1].leaves.findIndex(L=>L.col.maxy>D.GARD.level+0.05);const c=CLIMB(D.KS[1],from),t=TERRACE();r.push(k+':from'+from+' '+c+(t?' up':' NOT'));if(!t)throw new Error(k+' не вышел на террасу в приливе: '+r.join(' / '));}
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'high '+r.join(' / ')+' errs=0'
