//@@
ZC.startFrom(ZC.LV('2-3'));ZC.G.manual=true;ZC.tick(40);ZC.skip();ZC.tick(10);const F=ZC.W.flags;F.task=2;const H=ZC.HERO;
// Пелагея на утёс и планирует
H.pelageya.pos.set(0,3.05,-16.8);H.pelageya.vel.set(0,0,0);ZC.tick(10);ZC.hold('ArrowUp',true);ZC.press('KeyM');ZC.hold('KeyM',true);ZC.tick(10);
for(let i=0;i<200;i++){ZC.tick(1);if(H.pelageya.grounded&&i>20)break;}ZC.hold('ArrowUp',false);ZC.hold('KeyM',false);ZC.tick(5);
const r=[U.st()];r.push(U.walkTo(1,-3.4,-25.3,5));U.tap('Semicolon');ZC.tick(20);U.tap('KeyK');ZC.tick(5);
// Игрок 1: Потап и Прошка на ближние камни
U.tap('KeyQ');ZC.tick(3);r.push(U.walkTo(0,-3.4,-16.7,8));U.tap('KeyR');ZC.tick(20);U.tap('KeyQ');ZC.tick(3);r.push(U.walkTo(0,3.4,-16.7,8));U.tap('KeyR');ZC.tick(40);
r.push('formed='+ZC.W.flags.task,U.obj());U.tap('KeyR');ZC.tick(180);r.push('z2='+ZC.W.waters[2].level.toFixed(2));
// Йоша идёт по неводу
r.push(U.walkTo(1,0,-17,8),U.walkTo(1,0,-29,8),U.st(),'task='+F.task);r
//@@ shot=w23c.png
ZC.tick(2);
