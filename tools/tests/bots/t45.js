//@@
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('4-5'));ZC.G.manual=true;ZC.tick(60);const W=ZC.W,H=ZC.HERO;const r=[W.name,!!ZC.G.cine];ZC.skip();ZC.tick(5);r.push(W.flags.stage,U.st(),'act='+U.act(0).kind+','+U.act(1).kind,'links='+W.linkTotal);r
//@@ shot=w45a.png
ZC.tick(1);
//@@
// крюки и доски
const W=ZC.W,H=ZC.HERO,F=W.flags;const r2=[];const P=H.proshka,Y=H.yosha;
r2.push(U.walkTo(0,-1.2,-5.5,3));P.face=Math.PI;ZC.tick(2);U.tap('KeyE');ZC.tick(40);P.face=Math.PI;U.tap('KeyE');ZC.tick(60);r2.push('chains='+F.chains);
const S=W.HD;// заглушка
const log=[];
for(let i=0;i<8;i++){
  U.path(0,[[0,-7],[-3.6,-2]],4);P.face=-Math.PI/2;ZC.tick(2);U.tap('KeyR');ZC.tick(3);const got=P.carry&&P.carry.kind;
  const z0=-8-2.75*i;U.path(0,[[-1.5,-5],[0,-6],[0,z0+0.45]],4);P.face=Math.PI;P.vel.set(0,0,0);ZC.tick(3);U.tap('KeyR');ZC.tick(30);
  U.path(1,[[1.2,-5],[0.8,z0-1.2]],4);Y.face=Math.PI;ZC.tick(2);while(Y.skillCd>0)ZC.tick(1);U.tap('KeyL');ZC.tick(40);
  log.push(i+':'+got+'/'+W.SLOTS.map(q=>(q.placed?'P':'-')+(q.fused?'F':'')).join('')+'/'+U.st());}
r2.push(log.join(' '),'half='+F.half,F.stage,U.st());r2
//@@ shot=w45b.png
ZC.tick(1);
//@@
// Прошка по цепи к вороту; Кикимора; Потап к лапе
const W=ZC.W,H=ZC.HERO,F=W.flags;const r3=[];const P=H.proshka;
ZC.tick(120);r3.push(U.path(0,[[0,-30.6],[1.4,-31.6],[1.4,-52.8],[2.4,-54]],4),U.st());U.tap('KeyR');ZC.tick(30);r3.push('winch='+F.winch,F.stage,!!ZC.G.cine);ZC.tick(60);ZC.skip();ZC.tick(5);
r3.push(F.stage,'act0='+U.act(0).kind,U.st(),'links='+W.links);
r3.push(U.walkTo(0,0,-31,4));U.tap('KeyE');ZC.tick(30);r3.push(F.stage,!!ZC.G.cine);ZC.tick(60);ZC.skip();ZC.tick(5);r3.push(F.stage,'act='+U.act(0).kind+','+U.act(1).kind,U.st());r3
//@@ shot=w45c.png
ZC.tick(1);
//@@
// держать мост (бот за Потапа) + переход Игрока 2
const W=ZC.W,H=ZC.HERO,F=W.flags;const r4=[];const HD=W.HD,Y=H.yosha,Pe=H.pelageya;const SEC=W.SEC;
const B2=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'];
function p1(){ZC.hold('KeyD',HD.sway>0.08);ZC.hold('KeyA',HD.sway<-0.08);ZC.hold('KeyG',HD.drops.some(d=>d.t>d.dur-0.3));if(HD.trem&&HD.trem.t>HD.trem.dur-0.45&&!HD.trem.pr){HD.trem.pr=true;ZC.press('ShiftLeft');}}
function go2(x,z,max,glide){const n=Math.round((max||6)*60);for(let i=0;i<n;i++){p1();const h=U.act(1);const dx=x-h.pos.x,dz=z-h.pos.z;ZC.hold(B2[0],dx<-0.2);ZC.hold(B2[1],dx>0.2);ZC.hold(B2[2],dz<-0.2);ZC.hold(B2[3],dz>0.2);
  if(glide){if(i===2)ZC.press('KeyM');ZC.hold('KeyM',i>2&&!h.grounded);}if(Math.hypot(dx,dz)<0.4&&(!glide||h.grounded))break;ZC.tick(1);}B2.forEach(k=>ZC.hold(k,false));ZC.hold('KeyM',false);p1();ZC.tick(1);}
function wait(t){for(let i=0;i<t*60;i++){p1();ZC.tick(1);}}
function sw(to){if(U.act(1)!==to){ZC.press('KeyK');wait(0.1);}}
function water(){for(let i=0;i<120&&Y.skillCd>0;i++){p1();ZC.tick(1);}Y.face=Math.PI;ZC.press('KeyL');wait(0.6);}
const log=[];
for(let s=0;s<6;s++){const S=SEC[s];
  if(!S.span){sw(Y);go2(0.3,S.z0+0.6,6);if(!S.ok)water();if(!S.ok)water();log.push('j'+s+':'+S.ok);}
  else{sw(Pe);go2(-0.3,S.z0+0.5,8);go2(-0.2,S.plate.z,4,true);wait(0.3);log.push('s'+s+':'+S.ok+'@'+Pe.pos.z.toFixed(1));sw(Y);go2(0.3,S.z1+0.3,8);}
  // вернуть отставшего к началу следующего участка
}
sw(Pe);go2(-0.3,-53,10);sw(Y);go2(0.5,-53.2,10);wait(1);
r4.push(log.join(' '),'t='+HD.t.toFixed(1),'spirit='+HD.spirit.toFixed(2),'good='+(HD.good||0),F.stage,U.st());r4
//@@ shot=w45d.png
ZC.tick(1);
//@@
// бег Потапа: Йоша сращивает треснувшие доски
const W=ZC.W,H=ZC.HERO,F=W.flags;const r5=[F.stage];const Y=H.yosha,Po=H.potap,SEC=W.SEC;
for(let i=0;i<60*30&&F.stage==='hold';i++){ZC.hold('KeyG',W.HD.drops.some(d=>d.t>d.dur-0.3));ZC.tick(1);}ZC.hold('KeyG',false);r5.push(F.stage,'HDt='+W.HD.t.toFixed(1));
r5.push('cracked='+SEC.map(S=>S.ok?'+':'-').join(''));
if(U.act(1)!==Y){U.tap('KeyK');ZC.tick(3);}
r5.push(U.walkTo(1,0.3,-49.2,4));Y.face=0;ZC.tick(2);U.tap('KeyL');ZC.tick(60);r5.push(U.walkTo(1,0.3,-42.5,4));Y.face=0;ZC.tick(2);U.tap('KeyL');ZC.tick(60);r5.push('fixed='+SEC.map(S=>S.ok?'+':'-').join(''));
r5.push(U.walkTo(1,0.3,-50,4),U.walkTo(1,0.3,-53.2,4));
const tr=[];r5.push(U.walkTo(0,0,-49,25,(h,i)=>{if(i%60===0)tr.push(h.pos.z.toFixed(1));}),tr.join(','),F.stage,!!ZC.G.cine);r5
//@@ shot=w45e.png
ZC.tick(600);
//@@
ZC.tick(500);ZC.skip();ZC.tick(300);[ZC.W.levelId,ZC.G.done['4-5'],ZC.G.got['4-5']]
