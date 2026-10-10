U.go();ZC.loadLevel(6);ZC.tick(60*2);ZC.skip();ZC.tick(60*2);ZC.FIN.warp(0,1,0);ZC.tick(30);ZC.W.enemies.forEach(e=>{if(e.pos.z>20){e.alive=false;e.g.visible=false;}});const r=[U.walkTo(0,0,-18,5),U.walkTo(1,1,-18,5)];const b=U.brawl(60);r.join(',')+' '+b+' | '+U.obj()
//@@
window.throwTo=function(pi,x,y,z,sx,sz){const r=U.walkTo(pi,x,z,6);const h=U.act(pi);h.face=Math.atan2(sx-h.pos.x,sz-h.pos.z);ZC.tick(1);ZC.press(pi?'Semicolon':'KeyR');ZC.tick(40);return r;};
window.webHop=function(pi,wx,wz){const h=U.act(pi);const r=U.walkTo(pi,wx+0.3,wz+0.3,6);ZC.press(pi?'KeyM':'Space');ZC.tick(80);return r+' y='+h.pos.y.toFixed(2);};
const a=throwTo(0,-1.8,0,-20.2,-5.2,-11.9),b=throwTo(1,-1.8,0,-11.8,-5.2,-20.1);
a+','+b+' th='+ZC.W.threads.map(t=>t.owner+':'+(t.string?'S':'')+t.len.toFixed(1)).join(' ')+' webs='+JSON.stringify(ZC.W.webs.map(w=>[w.x.toFixed(1),w.y.toFixed(2),w.z.toFixed(1)]))+' | '+U.obj()
//@@ wait=200 shot=o6.png
'x'
//@@
const w=ZC.W.webs[0];const L=[webHop(0,w.x,w.z)];U.tap('KeyQ');L.push(webHop(0,w.x,w.z));L.push(webHop(1,w.x,w.z));U.tap('KeyK');L.push(webHop(1,w.x,w.z));U.tap('Digit1');U.tap('Digit0');ZC.tick(240);L.join(' | ')+' | '+U.st()+' links='+ZC.W.links
//@@
const pt=ZC.W.flags.pullT.toFixed(1);ZC.W.flags.cut=true;const a=throwTo(0,-5.9,3.4,-25,-9.6,-29.3),b=throwTo(1,-9.6,3.4,-25,-5.9,-29.3);'pullT='+pt+' '+a+','+b+' webs='+JSON.stringify(ZC.W.webs.map(w=>[w.x.toFixed(1),w.y.toFixed(2),w.z.toFixed(1)]))+' | '+U.obj()
//@@ wait=200 shot=o7.png
'x'
//@@
const w=ZC.W.webs.find(q=>q.y>3);const L=[];for(const pi of[0,1]){L.push(webHop(pi,w.x,w.z));U.tap(pi?'KeyK':'KeyQ');L.push(webHop(pi,w.x,w.z));}U.tap('Digit1');U.tap('Digit0');ZC.tick(240);ZC.tick(60);L.join(' | ')+' | '+U.st()+' links='+ZC.W.links+' arena='+ZC.W.enemies.filter(e=>e.alive).length
//@@
const b=U.brawl(120);ZC.tick(60*2);const c=!!ZC.G.cine;ZC.skip();ZC.tick(60*3);b+' cine='+c+' lvl='+ZC.W.levelId+' got='+JSON.stringify(ZC.G.got)
