//@@
// 4-4 (docs/39, 44.1–44.5): контур будущей борозды, пока плуг в клещах; живая вода на лаву в борозде — корка;
// третья чаша — огненный узор; печник у двери в поле Б; арена — змеёныши, после стока лавы — болван и печник.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};
ZC.startFrom(ZC.LV('4-4'));ZC.G.manual=true;ZC.tick(30);U.nocine();const W=ZC.W,F=W.flags,H=ZC.HERO,K=W.k44;
const P=H.proshka;U.walkTo(0,-3,-3.2,3);P.face=0;ZC.tick(2);U.tap('KeyR');ZC.tick(3);let gh=0;for(let i=0;i<50;i++){ZC.hold('KeyW',true);ZC.tick(1);gh=Math.max(gh,K.ghosts());}ZC.hold('KeyW',false);
chk(!!W.plowBy(),'плуг не взят');chk(gh>0,'контур борозды не виден');'ghosts='+gh
//@@
// корка на лаве в борозде
const W=ZC.W,H=ZC.HERO,Y=H.yosha,K=W.k44;Y.pos.set(3,0,-12);Y.face=0;K.setLava(3.5,-10.5,true);ZC.tick(2);const wt=K.crustWT();
const act=wt.active();chk(act,'корка: нет цели для живой воды');if(act)wt.onWater();ZC.tick(2);chk(!W.lavaCell(3.5,-10.5)&&K.crusts()>0,'корка не встала');
const n=K.crusts();let t=0;while(K.crusts()>0&&t<60*15){ZC.tick(1);t++;}'crust='+n+' держала '+(t/60).toFixed(1)+' с'
//@@
// третья чаша — огненный узор на валу
const W=ZC.W,F=W.flags;const n0=W.group.children.length;W.k44.bowl('C');ZC.tick(30);chk(F.bowlC,'третья чаша не засчитана');'bowlC='+F.bowlC+' +meshes='+(W.group.children.length-n0)
//@@
// печник у двери в поле Б; уходит, когда начинается арена
const W=ZC.W,F=W.flags,H=ZC.HERO;F.stage='B';F.bowlA=true;H.proshka.pos.set(0,0,-47.5);ZC.tick(10);const p1=W.enemies.filter(e=>e.kind==='pechnik'&&e.alive).length;chk(p1===1,'нет печника у двери: '+p1);
F.doorOpen=true;H.proshka.pos.set(0,0,-60.5);ZC.tick(60);const arena=W.enemies.filter(e=>e.alive).map(e=>e.kind);
chk(!arena.includes('bolvan')&&!arena.includes('pechnik'),'первая волна — только змеёныши: '+arena.join(','));
F.drained=true;let t=0;while(!F.wave2&&t<300){ZC.tick(1);t++;}const a2=W.enemies.filter(e=>e.alive).map(e=>e.kind);
chk(F.wave2&&a2.includes('bolvan')&&a2.includes('pechnik'),'вторая волна: '+a2.join(','));'pech1='+p1+' wave1='+arena.join(',')+' wave2='+a2.filter(k=>k!=='zmeenysh').join(',')
//@@
// 44.6: Потап засыпает неверную борозду лапой (умение Потапа перед бороздой)
ZC.startFrom(ZC.LV('4-4'));ZC.G.manual=true;ZC.tick(30);U.nocine();const W=ZC.W,F=W.flags,H=ZC.HERO,P=H.proshka,Po=H.potap;
U.walkTo(0,-3,-3.2,3);P.face=0;ZC.tick(2);U.tap('KeyR');ZC.tick(3);for(let i=0;i<70;i++){ZC.hold('KeyW',true);ZC.tick(1);}ZC.hold('KeyW',false);ZC.tick(2);U.tap('KeyR');ZC.tick(10);
let cell=null;for(let z=-1;z>-14&&!cell;z-=0.5)for(let x=-6;x<2&&!cell;x+=0.5)if(W.furrowAt(x,z)===20&&W.furrowAt(x,z-1)!==-1)cell=[x,z];
chk(!!cell,'нет борозды после плуга');
if(cell){if(U.act(0)!==Po){U.tap('KeyQ');ZC.tick(10);}Po.pos.set(cell[0],0,cell[1]+1.1);Po.vel.set(0,0,0);Po.face=Math.PI;ZC.tick(2);chk(W.potapFurrow()>=0,'Потап не видит борозды перед собой');
  while(Po.skillCd>0)ZC.tick(1);U.tap('KeyE');ZC.tick(5);chk(F.pawFill>0&&W.furrowAt(cell[0],cell[1])===10,'Потап не засыпал борозду: fill='+F.pawFill+' cell='+W.furrowAt(cell[0],cell[1]));}
'paw fill='+F.pawFill+' cell='+cell
//@@
(BAD.length||_errs.length)?'FAIL tfin_w44 '+BAD.join(' || ')+' errs='+_errs.join(' | '):'tfin_w44 ok'
