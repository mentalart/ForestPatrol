U.go();ZC.loadLevel(6);ZC.tick(60*2);ZC.skip();ZC.tick(60*2);const r=[U.walkTo(0,0,-18,5),U.walkTo(1,1,-18,5)];const b=U.brawl(60);r.join(',')+' '+b+' | '+U.obj()
//@@
window.throwTo=function(pi,x,y,z,sx,sz){const r=U.walkTo(pi,x,z,6);const h=U.act(pi);h.face=Math.atan2(sx-h.pos.x,sz-h.pos.z);ZC.tick(1);ZC.press(pi?'Semicolon':'KeyR');ZC.tick(40);return r;};
window.webHop=function(pi,wx,wz){const h=U.act(pi);const r=U.walkTo(pi,wx+0.9,wz+0.9,6);ZC.press(pi?'KeyM':'Space');ZC.tick(12);
  // долететь на перекрестье: чуть подвинуться к центру, приземление на струне подкинет
  const K=pi?['ArrowLeft','ArrowUp']:['KeyA','KeyW'];ZC.hold(K[0],true);ZC.hold(K[1],true);ZC.tick(6);ZC.hold(K[0],false);ZC.hold(K[1],false);ZC.tick(90);
  if(h.pos.y<2.5||(h.pos.y>3&&h.pos.y<4&&wz<-20)){ZC.press(pi?'KeyM':'Space');ZC.tick(90);}return r+' y='+h.pos.y.toFixed(2);};
const a=throwTo(0,-1.8,0,-20.2,-5.2,-11.9),b=throwTo(1,-1.8,0,-11.8,-5.2,-20.1);
a+','+b+' th='+ZC.W.threads.map(t=>t.owner+':'+(t.string?'S':'')+t.len.toFixed(1)).join(' ')+' webs='+JSON.stringify(ZC.W.webs.map(w=>[w.x.toFixed(1),w.y.toFixed(2),w.z.toFixed(1)]))+' | '+U.obj()
//@@ wait=200 shot=o6.png
'x'
//@@
const w=ZC.W.webs[0];const L=[webHop(0,w.x,w.z)];U.tap('KeyQ');L.push(webHop(0,w.x,w.z));L.push(webHop(1,w.x,w.z));U.tap('KeyK');L.push(webHop(1,w.x,w.z));U.tap('Digit1');U.tap('Digit0');ZC.tick(240);L.join(' | ')+' | '+U.st()+' links='+ZC.W.links
//@@
const a=throwTo(0,-5.9,3.4,-25,-9.6,-29.3),b=throwTo(1,-9.6,3.4,-25,-5.9,-29.3);a+','+b+' webs='+JSON.stringify(ZC.W.webs.map(w=>[w.x.toFixed(1),w.y.toFixed(2),w.z.toFixed(1)]))+' | '+U.obj()
//@@ wait=200 shot=o7.png
'x'
//@@
const w=ZC.W.webs.find(q=>q.y>3);const h=U.act(0);const r=U.walkTo(0,w.x+0.9,w.z+0.9,6);const L=['web '+w.x.toFixed(2)+','+w.y.toFixed(2)+','+w.z.toFixed(2)+' at '+h.pos.x.toFixed(2)+','+h.pos.y.toFixed(2)+','+h.pos.z.toFixed(2)+' gr='+(h.groundRef?(h.groundRef.string?'S':'o'):'-')];
const r2=U.walkTo(0,w.x+0.3,w.z+0.3,3);L.push('near '+h.pos.x.toFixed(2)+','+h.pos.y.toFixed(2)+','+h.pos.z.toFixed(2)+' g='+h.grounded+' d='+Math.hypot(w.x-h.pos.x,w.z-h.pos.z).toFixed(2));
ZC.press('Space');for(let i=0;i<50;i++){ZC.tick(1);if(i%5==0)L.push(h.pos.y.toFixed(2)+(h.aimT>0?'a':''));}
r+' '+r2+' | '+L.join(' ')+' webs='+ZC.W.webs.length
