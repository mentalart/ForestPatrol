// Курочка Ряба (proto/levels/luko_5b_farm.js): желания, ласка «держи», золотое яичко в лукошке к Дедке (друг гоняет мышек), мышка разбила —
// «снесу простое», прятки цыплят, пёрышко. В конце — строка «… ok» или «FAIL …».
//@@
ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(20);const G=ZC.G;
G.hen={food:0.5,joy:0.5,eggs:0,gold:0,chicks:2,trip:G.trips,happy:3,wish:'grain'};ZC.goLevel('luko');ZC.tick(120);ZC.skip&&ZC.skip();ZC.tick(60);
const FM=ZC.W.farm,r=[ZC.W.flags.stage,'wish='+G.hen.wish];
// зерно — желание исполнено, следом новое желание; ласка (держать удар) — второе
r.push(U.path(1,[[-5,-11],[-5.5,-1],[-5.5,5.2],[-9.4,5.6],[-9.4,7.4],[-11.1,7.4]],6));U.tap('Comma');ZC.tick(5);
const hp=FM.hen.g.position;r.push(U.walkTo(1,hp.x+0.8,hp.z,4));U.tap('Comma');ZC.tick(10);r.push('wishN='+G.hen.wishN);ZC.tick(170);r.push('wish2='+G.hen.wish);
G.hen.wish='pet';Math.random0=Math.random;Math.random=()=>0.1;r.push(U.walkTo(1,hp.x+0.8,hp.z,4));ZC.press('Comma');ZC.hold('Comma',true);ZC.tick(80);ZC.hold('Comma',false);ZC.tick(150);Math.random=Math.random0;
r.push('wishN='+G.hen.wishN,'wish='+G.hen.wish,'joy='+G.hen.joy.toFixed(2),'feathers='+FM.FEATH.length);
// пёрышко — подобрать: бусы в гардероб
if(FM.FEATH.length){const f=FM.FEATH[0].g.position;r.push(U.walkTo(1,f.x,f.z,4));ZC.tick(10);}r.push('pero='+FM.own('pero'));
// затискали: три быстрых нажатия — убегает
for(let i=0;i<3;i++){r.push(U.walkTo(1,hp.x+0.8,hp.z,3));U.tap('Comma');ZC.tick(8);}r.push('mode='+FM.HS.mode);
r.push(G.hen.wishN===2&&G.hen.wish==='done'?'wishes ok':'FAIL wishes');r
//@@ shot=h9d_hen.png
ZC.tick(1);
//@@
// золотое яичко: Пелагея несёт к Дедке, Прошка гоняет мышек
const G=ZC.G,FM=ZC.W.farm,r=[];G.hen.gold=1;G.hen.eggs=0;FM.HS.mode='walk';
r.push(U.path(0,[[-6,-2],[-6,4],[-9.4,5.5]],8));
r.push(U.walkTo(1,-11.2,10.0,5));U.tap('Comma');ZC.tick(5);r.push('hand='+U.act(1).hand,'egg='+!!FM.egg);
const P1=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'],P0=['KeyA','KeyD','KeyW','KeyS'];let shoo=0,spawned=0;
const steer=(keys,h,x,z)=>{const dx=x-h.pos.x,dz=z-h.pos.z;ZC.hold(keys[0],dx<-0.3);ZC.hold(keys[1],dx>0.3);ZC.hold(keys[2],dz<-0.3);ZC.hold(keys[3],dz>0.3);};
const path=[[-9.4,9.0],[-9.4,6.0],[-9.0,3.4]];let wp=0;
for(let i=0;i<60*25&&FM.egg;i++){const a=U.act(1),b=U.act(0),d=FM.ded.position;const t=wp<path.length?path[wp]:[d.x+0.5,d.z+1.2];if(wp<path.length&&Math.hypot(a.pos.x-t[0],a.pos.z-t[1])<0.5)wp++;steer(P1,a,t[0],t[1]);
  const live=FM.MICE.filter(m=>!m.run);spawned=Math.max(spawned,FM.MICE.length);const m=live.sort((p,q)=>Math.hypot(p.g.position.x-b.pos.x,p.g.position.z-b.pos.z)-Math.hypot(q.g.position.x-b.pos.x,q.g.position.z-b.pos.z))[0];
  if(m){const mp=m.g.position;steer(P0,b,mp.x,mp.z);if(Math.hypot(mp.x-b.pos.x,mp.z-b.pos.z)<1.6&&i%6===0){ZC.press('KeyF');shoo++;}}else steer(P0,b,a.pos.x+1,a.pos.z+0.5);ZC.tick(1);}
P1.concat(P0).forEach(k=>ZC.hold(k,false));r.push('ui='+G.ui,'shoo='+shoo,'mice='+spawned);ZC.tick(300);
r.push('golds='+G.hen.golds,'gold='+G.hen.gold,'eggs='+G.hen.eggs,'nuts='+G.nutsHub);r.push(G.hen.golds===1?'deliver ok':'FAIL deliver');r
//@@ shot=h9d_egg.png
ZC.tick(1);
//@@
// мышка добежала: яичко разбилось, «снесу простое»
const G=ZC.G,FM=ZC.W.farm,r=[];G.hen.gold=1;G.hen.eggs=0;
r.push(U.walkTo(0,-4,0,6));r.push(U.path(1,[[-9.4,5.0],[-9.4,8.5],[-11.2,10.0]],8));U.tap('Comma');ZC.tick(5);r.push('egg='+!!FM.egg);
r.push(U.until(()=>!FM.egg,15));ZC.tick(60*6);r.push('gold='+G.hen.gold,'eggs='+G.hen.eggs);r.push(G.hen.gold===0&&G.hen.eggs===1?'break ok':'FAIL break');r
//@@ shot=h9d_break.png
ZC.tick(1);
//@@
// прятки: цыплята разбежались — найти и привести во двор
const G=ZC.G;G.hen.hide=true;G.hen.chicks=3;ZC.goLevel('luko');ZC.tick(120);ZC.skip&&ZC.skip();ZC.tick(60);const FM=ZC.W.farm,r=['hide='+FM.hideOn,'st='+FM.chicks.map(c=>c.userData.st).join(',')];
const h=U.act(0),YC=[-9.4,9.1];const n0=G.nutsHub;
for(const c of FM.chicks){h.pos.set(c.position.x+0.6,0,c.position.z);h.vel.set(0,0,0);ZC.tick(10);r.push(c.userData.st);h.pos.set(YC[0],0,YC[1]);ZC.tick(330);}
r.push('st='+FM.chicks.map(c=>c.userData.st).join(','),'hide='+FM.hideOn,'joy='+G.hen.joy,'+nuts='+(G.nutsHub-n0));r.push(!FM.hideOn&&FM.chicks.every(c=>c.userData.st==='home')?'hide ok':'FAIL hide');r
//@@ shot=h9d_chicks.png
ZC.tick(1);
