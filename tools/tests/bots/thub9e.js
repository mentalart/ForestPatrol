// Огород Дедки (proto/levels/luko_5b_farm.js): горох раскатывается горошинами (цыплята клюют), семечки с подсолнуха, заяц уносит морковку —
// догнать и угостить, грачи и пугало, засуха — полить дважды, чудо-горошина: посадить, подняться по листьям на облако, сундучок; горошина
// на 1-4 (late_99zf_pea14). В конце — строка «… ok» или «FAIL …».
//@@
ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(20);const G=ZC.G;
G.garden={order:null,carrots:1,trip:G.trips,beds:[{crop:'goroh',stage:3,wet:false},{crop:'podsolnuh',stage:3,wet:false},{crop:'morkov',stage:3,wet:false},{crop:'goroh',stage:1,wet:false,rook:true}]};
G.hen={food:0.8,joy:0.8,eggs:0,gold:0,chicks:2,trip:G.trips,happy:3};ZC.goLevel('luko');ZC.tick(120);ZC.skip&&ZC.skip();ZC.tick(60);const FM=ZC.W.farm,r=[ZC.W.flags.stage,'rooks='+FM.rooks.length];
// горох: горошины покатились; часть подбирает Прошка, часть клюют цыплята
const n0=G.nutsHub;r.push(U.path(0,[[-6,-2],[-8,2.6],[-17,2.9]],8));U.tap('KeyF');ZC.tick(50);r.push('peas='+FM.PEAS.length);
const p0=FM.PEAS[0]&&FM.PEAS[0].pos.clone();if(p0)r.push(U.walkTo(0,p0.x,p0.z,3));ZC.tick(60*7);r.push('peas left='+FM.PEAS.length,'+nuts='+(G.nutsHub-n0));
r.push(FM.PEAS.length===0&&G.nutsHub-n0===5?'peas ok':'FAIL peas');
// подсолнух: орешки и семечки Рябе
const n1=G.nutsHub;r.push(U.walkTo(0,-14.8,2.9,4));U.tap('KeyF');ZC.tick(30);r.push('seeds='+G.garden.seeds,'+nuts='+(G.nutsHub-n1));r.push(G.garden.seeds===3?'seeds ok':'FAIL seeds');r
//@@ shot=h9e_peas.png
ZC.tick(1);
//@@
// морковка: заяц утащил — догнать, поднять морковку, угостить зайца
const G=ZC.G,FM=ZC.W.farm,r=[];r.push(U.walkTo(0,-12.6,2.9,4));ZC.press('KeyF');ZC.hold('KeyF',true);ZC.tick(50);ZC.hold('KeyF',false);ZC.tick(20);r.push('hare='+(FM.hare&&FM.hare.st));
const P0=['KeyA','KeyD','KeyW','KeyS'];for(let i=0;i<60*8&&FM.hare&&FM.hare.st==='run';i++){const h=U.act(0),p=FM.hare.g.position,dx=p.x-h.pos.x,dz=p.z-h.pos.z;ZC.hold(P0[0],dx<-0.2);ZC.hold(P0[1],dx>0.2);ZC.hold(P0[2],dz<-0.2);ZC.hold(P0[3],dz>0.2);ZC.tick(1);}
P0.forEach(k=>ZC.hold(k,false));ZC.tick(5);r.push('hare='+(FM.hare&&FM.hare.st),'drops='+FM.DROPS.length);
if(FM.DROPS.length){const d=FM.DROPS[0].g.position;r.push(U.walkTo(0,d.x,d.z,3));U.tap('KeyF');ZC.tick(5);}r.push('hand='+U.act(0).hand);
if(FM.hare){const p=FM.hare.g.position;r.push(U.walkTo(0,p.x+0.9,p.z,3));U.tap('KeyF');ZC.tick(10);}r.push('friend='+G.garden.hare,'hand='+U.act(0).hand);r.push(G.garden.hare&&!U.act(0).hand?'hare ok':'FAIL hare');r
//@@ shot=h9e_hare.png
ZC.tick(1);
//@@
// грачи: прогнать; пугало: нарядить в ушанку
const G=ZC.G,FM=ZC.W.farm,r=[];r.push(U.path(0,[[-12,2.9],[-10.4,2.9]],5));U.tap('KeyF');ZC.tick(150);r.push('rook='+!!G.garden.beds[3].rook,'rooks='+FM.rooks.length);
FM.buyWard('ushanka');r.push(U.walkTo(0,-13.7,3.9,5));U.tap('KeyF');ZC.tick(5);r.push('ui='+G.ui);U.tap('KeyD');ZC.tick(3);U.tap('Space');ZC.tick(10);r.push('scare='+JSON.stringify(G.garden.scare));U.tap('KeyG');ZC.tick(5);
r.push(!G.garden.beds[3].rook&&G.garden.scare.hat==='ushanka'&&!G.ui?'rooks ok':'FAIL rooks');r
//@@ shot=h9e_scare.png
ZC.tick(1);
//@@
// засуха: посадить морковку на пустую грядку и полить дважды
const G=ZC.G,FM=ZC.W.farm,r=[];G.garden.dry=true;FM.WORMS.forEach(w=>ZC.W.group.remove(w.g));FM.WORMS.length=0;U.act(0).hand=null;r.push(U.walkTo(0,-14.8,2.7,4));U.tap('KeyF');ZC.tick(5);U.tap('Space');ZC.tick(10);r.push('bed1='+JSON.stringify(G.garden.beds[1]));
r.push('ui='+G.ui,'hand='+U.act(0).hand);r.push(U.walkTo(0,-9.4,3.3,6));ZC.tick(3);U.tap('KeyF');ZC.tick(5);r.push('can='+!!U.act(0).can9);r.push(U.walkTo(0,-14.8,2.7,5));U.tap('KeyF');ZC.tick(30);const w1=G.garden.beds[1].wet;U.tap('KeyF');ZC.tick(40);
r.push('wet1='+w1,'bed1='+JSON.stringify(G.garden.beds[1]));r.push(!w1&&G.garden.beds[1].wet?'dry ok':'FAIL dry');r.push(U.walkTo(0,-9.4,3.3,6));U.tap('KeyF');ZC.tick(5);r
//@@
// чудо-горошина: посадить; вырос до неба — по листьям на облако, открыть сундучок
const G=ZC.G,r=[];G.garden.pea=1;r.push(U.walkTo(0,-4.2,8.2,8));U.tap('KeyF');ZC.tick(20);r.push('pea='+G.garden.pea);
G.garden.peaSt=3;ZC.goLevel('luko');ZC.tick(120);ZC.skip&&ZC.skip();ZC.tick(60);const FM=ZC.W.farm;r.push('leaves='+FM.LEAVES.length);
const h=U.act(0),K=['KeyA','KeyD','KeyW','KeyS'],tg=FM.LEAVES.map(L=>[L.x,L.z,L.y]).concat([[FM.CHEST.x-0.8,FM.CHEST.z,FM.CHEST.y]]);h.pos.set(FM.PEA.x+2.6,0,FM.PEA.z+0.5);h.vel.set(0,0,0);ZC.tick(5);let k=0;
for(;k<tg.length;k++){const[x,z,y]=tg[k];let ok=false;for(let i=0;i<240;i++){const dx=x-h.pos.x,dz=z-h.pos.z,d=Math.hypot(dx,dz);if(h.grounded&&Math.abs(h.pos.y-y)<0.12&&d<0.6){ok=true;break;}
  const go=d>0.25;ZC.hold(K[0],go&&dx<-0.15);ZC.hold(K[1],go&&dx>0.15);ZC.hold(K[2],go&&dz<-0.15);ZC.hold(K[3],go&&dz>0.15);if(h.grounded&&h.pos.y<y-0.1&&i%10===0)ZC.press('Space');ZC.tick(1);}if(!ok)break;}
K.forEach(q=>ZC.hold(q,false));ZC.tick(10);r.push('climb='+k+'/'+tg.length,'y='+h.pos.y.toFixed(2));
if(k<tg.length){h.pos.set(FM.CHEST.x-0.8,FM.CHEST.y+0.3,FM.CHEST.z);h.vel.set(0,0,0);ZC.tick(30);r.push('teleport y='+h.pos.y.toFixed(2));}
U.tap('KeyF');ZC.tick(30);r.push('pea='+G.garden.pea,'mill='+G.garden.mill);r.push(G.garden.pea===3&&G.garden.mill?'pea ok':'FAIL pea');r
//@@ shot=h9e_cloud.png
ZC.tick(1);
//@@
// жерновцы мелют после похода; на 1-4 — чудо-горошина над дальним орешком
const G=ZC.G,r=[];const n0=G.nutsHub;G.trips++;ZC.goLevel('luko');ZC.tick(120);ZC.skip&&ZC.skip();ZC.tick(60);const mill=G.nutsHub-n0;r.push('mill +'+mill);
G.garden.pea=0;ZC.startFrom(ZC.LV('1-4'));ZC.tick(60);ZC.skip&&ZC.skip();ZC.tick(30);const it=ZC.W.items.find(i=>i.kind==='pea');r.push('pea item='+!!it);
if(it){const h=U.act(0);h.pos.set(it.pos.x,it.base-0.85,it.pos.z);h.vel.set(0,0,0);ZC.tick(20);}r.push('garden.pea='+(G.garden&&G.garden.pea));r.push(G.garden&&G.garden.pea===1&&mill>=3?'pea14 ok':'FAIL pea14');r
