//@@
// Пролог: первая трещина (первый прыжок игры) — в 8,7 м от двери штаба, камера над кроной показывает её целиком, подсказка у края
// (дуга, кольцо, кнопка «прыжок!», совет), герой у края не соскальзывает, пока не прыгнет; после прыжка — «Молодец!», камера снова за спиной.
// Работает и на прототипе, и на релизе. Второй проход — одиночный режим: напарник перепрыгивает трещину сам.
window.A=pi=>ZC.players[pi].heroes[ZC.players[pi].act];
window.toChase=()=>{ZC.startFrom(ZC.LV('p'));ZC.G.manual=true;ZC.tick(2);A(0).pos.set(-2,0,1.4);A(1).pos.set(2.2,0,1.4);let q=0;for(;q<600&&!ZC.G.cine;q++)ZC.tick(1);for(let i=0;i<10&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}ZC.tick(30);return ZC.W.flags.stage;};
window.crackZ=()=>{const b=ZC.W.boxes.filter(b=>b.minx<=-2.3&&b.maxx>=2.3&&b.maxy===0&&b.maxz<-5&&b.minz>-19).sort((a,b)=>b.maxz-a.maxz);return b.length>=2?[b[0].minz,b[1].maxz]:null;};   // первая ветка и ветка за трещиной
const st=toChase();const cz=crackZ();['stage='+st,'crack='+(cz?cz.map(v=>v.toFixed(1)).join('..'):'-'),'fromDoor='+(cz?(-6.72-cz[0]).toFixed(1):'-'),'jump1='+JSON.stringify(ZC.W.flags.jump1)]
//@@
// по первой ветке: камера над кроной (вне ствола штаба, выше хвои) и смотрит вперёд, на трещину
const r=[U.walkTo(0,-0.9,-11.5,5),U.walkTo(1,0.9,-11.5,5)];ZC.tick(40);const c=ZC.W.camFn?ZC.W.camFn():null;
r.push('camFn='+!!c);if(c)r.push('cam pos z='+c.pos.z.toFixed(1)+' y='+c.pos.y.toFixed(1)+' look z='+c.look.z.toFixed(1),'outside trunk='+(c.pos.z<-7.3&&c.pos.y>8));r
//@@ shot=tpjump_edge.png
// оба идут прямо к трещине и дальше — у края останавливаются, не падают; совет и кнопка у края
const F=ZC.W.flags,cz=crackZ();for(let i=0;i<150;i++){ZC.hold('KeyW',true);ZC.hold('ArrowUp',true);ZC.tick(1);}ZC.hold('KeyW',false);ZC.hold('ArrowUp',false);ZC.tick(2);
['z='+A(0).pos.z.toFixed(2)+','+A(1).pos.z.toFixed(2)+' (край '+cz[0].toFixed(1)+')','falls='+ZC.G.stats.falls,'tips='+[0,1].map(pi=>/Трещина/.test(ZC.players[pi].tipHTML||'')).join(','),'told='+JSON.stringify(F.jump1.told)]
//@@
// Игрок 1 прыгает с места у края — перелетает; «Молодец!» и отметка
const F=ZC.W.flags;ZC.hold('KeyW',true);ZC.tick(2);ZC.press('Space');ZC.tick(70);ZC.hold('KeyW',false);ZC.tick(20);const r=['P1 z='+A(0).pos.z.toFixed(1)+' y='+A(0).pos.y.toFixed(2),'done='+JSON.stringify(F.jump1.done),'falls='+ZC.G.stats.falls];
// Игрок 2 — тоже; затем камера снова обычная (за спиной), подсказка спрятана
ZC.hold('ArrowUp',true);ZC.tick(2);ZC.press('KeyM');ZC.tick(70);ZC.hold('ArrowUp',false);ZC.tick(30);r.push('P2 z='+A(1).pos.z.toFixed(1),'done='+JSON.stringify(F.jump1.done),'camFn after='+!!ZC.W.camFn,'obj='+U.obj().slice(0,60));r
//@@
// одиночный режим: управляемый у края тоже тормозит, прыгает; напарник, позванный «Ко мне», перепрыгивает трещину сам
ZC.setSolo(true);const st=toChase();const r=['solo stage='+st,U.walkTo(0,-0.6,-12,5)];for(let i=0;i<120;i++){ZC.hold('KeyW',true);ZC.tick(1);}ZC.hold('KeyW',false);ZC.tick(2);r.push('solo brake z='+A(0).pos.z.toFixed(2)+' falls='+ZC.G.stats.falls);
ZC.hold('KeyW',true);ZC.tick(2);ZC.press('Space');ZC.tick(70);ZC.hold('KeyW',false);ZC.tick(10);r.push('me z='+A(0).pos.z.toFixed(1));
U.tap('Digit1');for(let i=0;i<60*10;i++){ZC.tick(1);if(A(1).pos.z<-17.5&&A(1).grounded)break;}
r.push('partner z='+A(1).pos.z.toFixed(1)+' y='+A(1).pos.y.toFixed(1),'falls='+ZC.G.stats.falls,'done='+JSON.stringify(ZC.W.flags.jump1.done));ZC.setSolo(false);r
