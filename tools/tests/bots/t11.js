//@@
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(30);const W=ZC.W,H=ZC.HERO;
const b=W.bells.map(x=>x.x+','+x.z).join(' ');
// раз-два-три у избушки — не меняли: сразу к повороту
W.rzt.state='done';W.rzt.onDone();ZC.tick(60*3.5);const c1=!!ZC.G.cine;ZC.skip();ZC.tick(30);
['bells '+b,'cine='+c1,'stage='+W.flags.stage,'foes='+W.enemies.filter(e=>e.alive).length]
//@@
const W=ZC.W;const r=[U.brawl(90)];ZC.tick(90);r.push('stage='+W.flags.stage,'trash='+(W.clean11.TR.length),'trough='+W.clean11.TRB.state,U.obj());r
//@@ shot=t11_clean.png
ZC.tick(1);
//@@
// уборка: каждый носит своё, корыто — вдвоём
const W=ZC.W,C=W.clean11,H=C.HEAP;const L=[];
for(let k=0;k<12;k++){const left=C.TR.filter(t=>t.state==='ground');if(!left.length)break;for(const pi of[0,1]){const h=U.act(pi);if(h.trash)continue;let best=null,bd=99;for(const t of left){const d=Math.hypot(t.g.position.x-h.pos.x,t.g.position.z-h.pos.z);if(d<bd&&t.state==='ground'){bd=d;best=t;}}
  if(best){U.walkTo(pi,U.act(pi).pos.x,-24.2,4);U.walkTo(pi,best.g.position.x,-24.2,6);U.walkTo(pi,best.g.position.x,best.g.position.z,6);}if(U.act(pi).trash){U.walkTo(pi,U.act(pi).pos.x,-24.2,4);U.walkTo(pi,H.x+1.6,H.z,8);ZC.tick(40);}}L.push(C.cleanN());}
const B=C.TRB.g.position;U.walkTo(0,B.x-0.8,B.z+0.2,6);U.walkTo(1,B.x+0.8,B.z+0.2,6);ZC.tick(10);const st1=C.TRB.state;
const K2=[['KeyA','KeyD','KeyW','KeyS'],['ArrowLeft','ArrowRight','ArrowUp','ArrowDown']];
for(let i=0;i<60*16&&C.TRB.state!=='done'&&C.TRB.state!=='fly';i++){const a=[U.act(0),U.act(1)];for(const pi of[0,1]){const h=a[pi],o=a[1-pi],tx=H.x+(pi?1.9:-0.4),tz=H.z+(pi?0.6:1.9);const dx=tx-h.pos.x,dz=tz-h.pos.z;const ahead=Math.abs(h.pos.x-tx)+1.2<Math.abs(o.pos.x-(H.x+(pi?-0.4:1.9)));const go=!ahead;ZC.hold(K2[pi][0],go&&dx<-0.3);ZC.hold(K2[pi][1],go&&dx>0.3);ZC.hold(K2[pi][2],go&&dz<-0.3);ZC.hold(K2[pi][3],go&&dz>0.3);}ZC.tick(1);}
K2.flat().forEach(k=>ZC.hold(k,false));ZC.tick(90);
['clean '+L.join(','),'items='+C.TR.map(t=>t.state[0]).join(''),'troughLift='+st1,'trough='+C.TRB.state,'n='+C.cleanN(),'stage='+W.flags.stage,'cine='+!!ZC.G.cine]
//@@
const u1=U.until(()=>ZC.W.flags.stage==='gift'&&!!ZC.G.cine,6);ZC.skip();const u2=U.until(()=>ZC.W.flags.stage==='yard'&&!ZC.G.cine,16);ZC.tick(20);const W=ZC.W;
// грядка: без нити — выталкивает обратно
const r=['gift '+u1+' '+u2,'stage='+W.flags.stage,'clew='+W.abil.clew];U.walkTo(1,5.5,-36.8,6);U.walkTo(1,5.5,-42,3);ZC.tick(30);r.push('bedPush z='+U.act(1).pos.z.toFixed(1));
// по нити — проходит
const H=ZC.HERO;U.walkTo(0,-5.5,-36.8,8);H.proshka.face=Math.PI;ZC.tick(2);ZC.press('KeyR');ZC.tick(30);r.push(U.walkTo(0,-5.5,-52.3,8));
U.walkTo(1,5.5,-36.8,6);H.pelageya.face=Math.PI;ZC.tick(2);ZC.press('Semicolon');ZC.tick(30);r.push(U.walkTo(1,5.5,-52.3,8));r.push(U.st());r
//@@ shot=t11_beds.png
ZC.tick(1);
//@@
// самая широкая лужа: нить к нити
const H=ZC.HERO,W=ZC.W;const r=[U.walkTo(0,-1,-61.4,6),U.walkTo(1,1,-61.4,6)];H.proshka.face=Math.PI;ZC.tick(2);ZC.press('KeyR');ZC.tick(40);H.pelageya.face=Math.PI;ZC.tick(2);ZC.press('Semicolon');ZC.tick(40);
r.push('glued='+!!W.flags.glued,W.threads.map(t=>t.owner+':'+t.len.toFixed(1)).join(' '));r.push(U.walkTo(0,-1,-90,10),U.walkTo(1,-0.6,-90,10));r.push(U.st());r
//@@
// калитка-упрямица
const W=ZC.W,C=W.clean11,H=ZC.HERO;const r=['gate0='+C.gateOpen()];r.push(U.walkTo(0,-5.5,-102.5,8),U.walkTo(1,5.5,-102.5,8));ZC.tick(60);r.push('gate2='+C.gateOpen(),'plates='+C.PL.map(p=>p.on?1:0).join(''));
U.tap('KeyQ');ZC.tick(5);r.push('p1='+U.act(0).kind);r.push(U.path(0,[[-1.2,-104],[-1.2,-110],[-5.5,-111.5]],8));
U.tap('KeyK');ZC.tick(5);r.push('p2='+U.act(1).kind);r.push(U.path(1,[[1.2,-104],[1.2,-110],[5.5,-111.5]],8));ZC.tick(30);r.push('plates='+C.PL.map(p=>p.on?1:0).join(''),'gate='+C.gateOpen());
U.tap('KeyQ');ZC.tick(5);r.push(U.path(0,[[-1.2,-104],[-1.2,-113]],8));U.tap('KeyK');ZC.tick(5);r.push(U.path(1,[[1.2,-104],[1.2,-113]],8));ZC.tick(60);
r.push('out='+!!W.flags.out,U.st());ZC.tick(200);r.push('lvl='+ZC.W.levelId,'gem='+!!ZC.G.gems['1-1'],'got='+ZC.G.got['1-1']);r
