//@@
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('5-3'));ZC.G.manual=true;ZC.tick(60);const W=ZC.W,H=ZC.HERO;const r=[W.name,!!ZC.G.cine];ZC.skip();ZC.tick(5);r.push(W.flags.stage,U.st(),U.obj(),'lt='+W.linkTotal);r
//@@ shot=w53a.png
ZC.tick(20);
//@@
// бот: оба тянут к цели вместе, стреляют, отбивают перья, жмут RT на «три»
const W=ZC.W,H=ZC.HERO,F=W.flags;const r=[];const K=[['KeyA','KeyD','KeyW','KeyS','KeyF','KeyG','KeyE'],['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Comma','Period','KeyL']];
const gpos=()=>H.proshka.pos.clone();let log=[],lastZ=0,maxT=60*150;
for(let i=0;i<maxT;i++){if(F.stage!=='fly')break;const GP=W.GP;
  let tx=0,ty=8.4;const ahead=[[-5,12,-60],[6,8,-130],[0,16,-185],[-7,11,-310],[5,14,-420]].find(p=>p[2]<GP.z-3&&p[2]>GP.z-70);if(ahead){tx=ahead[0];ty=ahead[1]-2.6;}
  if(F.duck){tx=W.DK.pos.x;ty=W.DK.pos.y-6.5;}
  const dx=tx-GP.x,dy=ty-GP.y;for(const pi of[0,1]){const k=K[pi];ZC.hold(k[0],dx<-0.6||(F.duck&&dx<-0.1));ZC.hold(k[1],dx>0.6||(F.duck&&dx>0.1));ZC.hold(k[2],dy>0.6);ZC.hold(k[3],dy<-0.6);if(i%40===pi*20)ZC.press(k[4]);}
  if(F.duck){for(const pi of[0,1]){const k=K[pi];ZC.hold(k[0],dx<0);ZC.hold(k[1],dx>=0);ZC.hold(k[2],dy>=0);ZC.hold(k[3],dy<0);}}
  const cl=W.CLOUDS.find(c=>c.state==='count');if(cl&&Math.abs(cl.t-1.4)<0.05){ZC.press(K[0][6]);ZC.press(K[1][6]);}
  if(i%12===0){for(const pi of[0,1])ZC.press(K[pi][5]);}
  ZC.tick(1);if(i%600===0)log.push((i/60)+'s z='+GP.z.toFixed(0));}
K.flat().forEach(k=>ZC.hold(k,false));r.push(log.join(' '),'stage='+F.stage,'crows='+(F.crowsDown||0),'nuts='+W.nuts,'links='+W.links,'z='+H.proshka.pos.z.toFixed(0));r
//@@ shot=w53b.png
ZC.tick(5);
//@@
const W=ZC.W,F=W.flags;const r=['cine='+!!ZC.G.cine];ZC.skip();ZC.tick(5);r.push('links='+W.links+'/'+W.linkTotal);ZC.tick(200);r.push('lv='+ZC.W.levelId,'got='+JSON.stringify(ZC.G.got['5-3']),'nuts='+ZC.G.nutsGot['5-3']);r
