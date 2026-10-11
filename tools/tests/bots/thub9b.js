//@@
ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(20);const G=ZC.G;G.garden={order:'morkov',beds:[{crop:'repka',stage:4,wet:false},{crop:'podsolnuh',stage:3,wet:false},{crop:'morkov',stage:3,wet:false},{crop:'goroh',stage:2,wet:false}],trip:G.trips};
G.hen={food:0.8,joy:0.8,eggs:1,gold:1,chicks:3,trip:G.trips,happy:3};ZC.goLevel('luko');ZC.tick(120);ZC.skip&&ZC.skip();ZC.tick(60);
ZC.W.camFn=()=>({pos:new THREE.Vector3(-11,6.5,9.5),look:new THREE.Vector3(-12,0.6,3.5),k:50});ZC.tick(40);[ZC.W.flags.stage,'nuts='+ZC.G.nutsHub]
//@@ shot=h9_farm.png
ZC.tick(1);
//@@
ZC.W.camFn=null;ZC.tick(5);const r=[U.path(0,[[-6,-2],[-8,2.6],[-12.6,2.9]],6)];ZC.press('KeyF');ZC.hold('KeyF',true);ZC.tick(50);ZC.hold('KeyF',false);ZC.tick(5);r.push('hand='+U.act(0).hand,'bed2='+ZC.G.garden.beds[2].crop);
// морковка по заказу — Дедке: вдвое орешков да ещё три
const dd=ZC.W.farm.ded.position;r.push(U.walkTo(0,dd.x+0.9,dd.z+0.9,6));U.tap('KeyF');ZC.tick(30);r.push('order nuts='+ZC.G.nutsHub,'orders='+ZC.G.garden.orders,'hand='+U.act(0).hand);
r.push(U.path(0,[[-15,2.9],[-17,2.9]],6),U.path(1,[[-5,-11],[-5.5,-1],[-8,2.4],[-16,3.0]],8));U.tap('KeyF');ZC.tick(5);r.push('ui='+ZC.G.ui);
let pulls=0;for(let i=0;i<60*10&&ZC.G.ui==='repka';i++){ZC.tick(1);if(i%78===31&&i>60){ZC.press('KeyF');ZC.press('Comma');}}ZC.tick(100);r.push('ui='+ZC.G.ui,'nuts='+ZC.G.nutsHub,'bed0='+ZC.G.garden.beds[0].crop);r
//@@ shot=h9_repka.png
ZC.tick(1);
