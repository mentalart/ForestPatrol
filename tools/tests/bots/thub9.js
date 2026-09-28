//@@
ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(20);ZC.goLevel('luko');ZC.tick(120);ZC.skip&&ZC.skip();ZC.tick(90);const W=ZC.W,F=W.flags;
[W.name,F.mode,F.stage,'label='+document.querySelector('#links span').innerText,'nuts='+ZC.G.nutsHub]
//@@ shot=h9_hub.png
ZC.tick(1);
//@@
// огород: посадить, взять лейку, полить
const W=ZC.W,F=W.flags;const r=[U.path(0,[[-6,-2],[-8,2.4],[-12.6,3.0]],6)];ZC.tick(5);U.tap('KeyF');ZC.tick(5);r.push('ui='+ZC.G.ui);U.tap('KeyD');ZC.tick(3);U.tap('Space');ZC.tick(10);r.push('bed2='+JSON.stringify(ZC.G.garden.beds[2]));
r.push(U.walkTo(0,-9.4,3.3,6));ZC.tick(3);U.tap('KeyF');ZC.tick(5);r.push('can='+!!ZC.HERO.proshka.can9);r.push(U.walkTo(0,-12.6,3.0,6));U.tap('KeyF');ZC.tick(40);r.push('bed2='+JSON.stringify(ZC.G.garden.beds[2]));r
//@@ shot=h9_garden.png
ZC.tick(1);
//@@
// Ряба: зерно, покормить, погладить, яички
const H=ZC.HERO;const r=[U.path(1,[[-5,-11],[-5.5,-1],[-5.5,5.2],[-9.4,5.6],[-9.4,7.4],[-11.1,7.4]],6)];U.tap('Comma');ZC.tick(5);r.push('grain='+!!U.act(1).grain);{const hp=ZC.W.group.children.find(o=>0);}r.push(U.walkTo(1,-9.4,8.6,6));
const hen=ZC.W.group.children;r.push('hen0='+JSON.stringify({f:ZC.G.hen.food,j:ZC.G.hen.joy}));for(let i=0;i<4;i++){U.tap('Comma');ZC.tick(20);}r.push('hen='+JSON.stringify({f:ZC.G.hen.food,j:+ZC.G.hen.joy.toFixed(2)}));
r.push(U.walkTo(1,-11.2,10.6,6));U.tap('Comma');ZC.tick(40);r.push('eggs='+ZC.G.hen.eggs,'nutsHub='+ZC.G.nutsHub);r
//@@ shot=h9_hen.png
ZC.tick(1);
//@@
// лавка Векши: витрина с примеркой
const r=[U.path(0,[[-6,2.4],[0,3],[8.9,4.2]],6)];ZC.tick(5);U.tap('KeyF');ZC.tick(60);r.push('ui='+ZC.G.ui,'nuts='+document.querySelector('#dress .dnuts').innerText);r
//@@ shot=h9_shop.png
ZC.tick(1);
//@@
U.tap('KeyS');ZC.tick(3);U.tap('KeyS');ZC.tick(20);const r=['sel='+document.querySelector('#dress .dcard.sel .dnm').innerText];U.tap('Space');ZC.tick(20);r.push('owned='+JSON.stringify(ZC.W&&Object.keys(JSON.parse(localStorage.getItem('zlatayaCep.wardrobe.v1')||'{}').owned||{})));
U.tap('KeyD');ZC.tick(3);U.tap('KeyS');ZC.tick(3);U.tap('Space');ZC.tick(3);U.tap('KeyQ');ZC.tick(40);r.push('hero='+document.querySelector('#dress .dz-name').innerText.split('\n')[0]);r
//@@ shot=h9_shop2.png
ZC.tick(1);
//@@
U.tap('KeyR');ZC.tick(40);const r=['mode='+document.querySelector('#dress .dz-head h2').innerText];U.tap('KeyQ');ZC.tick(3);U.tap('KeyQ');ZC.tick(3);U.tap('KeyQ');ZC.tick(40);r.push(document.querySelector('#dress .dlist').innerText.replace(/\n/g,' | '));r
//@@ shot=h9_ward.png
ZC.tick(1);
//@@
U.tap('KeyE');ZC.tick(40);const r=[document.querySelector('#dress .dlist').innerText.replace(/\n/g,' | ')];r
//@@ shot=h9_ward2.png
ZC.tick(1);
//@@
U.tap('KeyG');ZC.tick(40);const r=['ui='+ZC.G.ui,'cam='+!!ZC.W.camFn,U.st()];
// поход: огород подрастает, Ряба несёт яички
ZC.G.trips++;ZC.goLevel('luko');ZC.tick(120);ZC.skip&&ZC.skip();ZC.tick(200);r.push('bed2='+JSON.stringify(ZC.G.garden.beds[2]),'hen='+JSON.stringify(ZC.G.hen));r
//@@ shot=h9_after.png
ZC.tick(1);
