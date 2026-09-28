U.go();ZC.loadLevel(6);ZC.tick(60*2);'cine='+!!ZC.G.cine+' '+U.st()
//@@
ZC.skip();ZC.tick(60*2);'foes='+ZC.W.enemies.map(e=>e.kind+':'+e.state).join(',')+' | '+U.obj()
//@@ shot=o1.png
const r=[U.walkTo(0,0,-18,5),U.walkTo(1,1,-18,5)];const b=U.brawl(60);r.join(',')+' '+b+' petals='+ZC.players.map(p=>p.petals).join('/')+' | '+U.obj()
//@@ shot=o2.png
const r=[U.walkTo(0,-1.8,-20.2,5),U.walkTo(1,-1.8,-11.8,5)];const H=ZC.HERO;const a=U.act(0),b=U.act(1);a.face=Math.atan2(-5.2-a.pos.x,-11.9-a.pos.z);b.face=Math.atan2(-5.2-b.pos.x,-20.1-b.pos.z);ZC.tick(1);
ZC.press('KeyR');ZC.tick(40);ZC.press('Semicolon');ZC.tick(40);r.join(',')+' th='+ZC.W.threads.map(t=>t.owner+':'+(t.string?'S':'')+t.len.toFixed(1)).join(' ')+' webs='+JSON.stringify(ZC.W.webs.map(w=>[w.x.toFixed(1),w.y.toFixed(2),w.z.toFixed(1)]))
//@@ shot=o3.png
U.tap('KeyQ');const w=ZC.W.webs[0];const h=U.act(0);const r=U.walkTo(0,w.x+1.5,w.z,5);ZC.press('Space');ZC.tick(8);
// прыгнуть с места на перекрестье: подойти вплотную и прыгнуть на струну
const B=['KeyA','KeyD','KeyW','KeyS'];let L=[];for(let i=0;i<120;i++){const dx=w.x-h.pos.x,dz=w.z-h.pos.z;ZC.hold('KeyA',h.pos.y<2?dx<-0.1:true);ZC.hold('KeyD',h.pos.y<2&&dx>0.1);ZC.tick(1);if(i%10==0)L.push(h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1));}
B.forEach(k=>ZC.hold(k,false));ZC.tick(30);r+' | '+L.join(' ')+' | '+U.st()+' links='+ZC.W.links
//@@
window.webJump=function(pi,dirKey,w,fromDx,fromDz){const h=U.act(pi);const r=U.walkTo(pi,w.x+fromDx,w.z+fromDz,8);ZC.press(pi?'KeyM':'Space');const L=[];
  const K=pi?{A:'ArrowLeft',D:'ArrowRight',W:'ArrowUp',S:'ArrowDown'}:{A:'KeyA',D:'KeyD',W:'KeyW',S:'KeyS'};
  for(let i=0;i<120;i++){const dx=w.x-h.pos.x,dz=w.z-h.pos.z;const low=h.pos.y<w.y+1.5&&h.vel.y<=0||i<20;
    if(dirKey==='A'){ZC.hold(K.A,low?dx<-0.1:true);ZC.hold(K.D,low&&dx>0.1);}else{ZC.hold(K.W,low?dz<-0.1:true);ZC.hold(K.S,low&&dz>0.1);}
    ZC.tick(1);if(i%12==0)L.push(h.pos.y.toFixed(1));}
  Object.values(K).forEach(k=>ZC.hold(k,false));ZC.tick(20);return r+' '+L.join(',');};
U.tap('KeyK');const w=ZC.W.webs[0];const r=webJump(1,'A',w,1.5,0);r+' | '+U.st()+' links='+ZC.W.links
//@@
U.tap('Digit1');U.tap('Digit0');ZC.tick(60*4);U.st()+' carries='+ZC.G.stats.carries+' | '+U.obj()
//@@
const F=ZC.W.flags;const pre='pullOn='+!!F.pullOn+' pullT='+F.pullT.toFixed(1);let n=0;while(!F.warn&&n<60*20){ZC.tick(1);n++;}
const warnAt=n/60;const pr=ZC.HERO.proshka;const wasAct=ZC.players[0].act;if(ZC.players[0].act!==0)U.tap('KeyQ');pr.face=Math.atan2(4-pr.pos.x,-17.5-pr.pos.z);ZC.tick(1);ZC.press('KeyE');ZC.tick(40);
const after='warn='+F.warn+' pullT='+F.pullT.toFixed(1)+' stumble='+F.stumble.toFixed(1);if(wasAct!==0)U.tap('KeyQ');
// старая нить: Совиный взор + удар у крюка
ZC.W.owlT=4;const po=U.act(0);const w=U.walkTo(0,-6.3,-9.5,5);po.face=Math.PI/2;ZC.tick(1);ZC.press('KeyF');ZC.tick(10);
pre+' warnAfter='+warnAt.toFixed(1)+'s '+after+' | cut='+!!F.cut+' '+w
//@@
const r=[U.walkTo(0,-5.9,-25,6),U.walkTo(1,-9.6,-25,6)];const a=U.act(0),b=U.act(1);a.face=Math.atan2(-9.6-a.pos.x,-29.3-a.pos.z);b.face=Math.atan2(-5.9-b.pos.x,-29.3-b.pos.z);ZC.tick(1);
ZC.press('KeyR');ZC.tick(40);ZC.press('Semicolon');ZC.tick(40);r.join(',')+' th='+ZC.W.threads.map(t=>t.owner+':'+(t.string?'S':'')+t.len.toFixed(1)).join(' ')+' webs='+JSON.stringify(ZC.W.webs.map(w=>[w.x.toFixed(1),w.y.toFixed(2),w.z.toFixed(1)]))
//@@ shot=o4.png
U.tap('KeyQ');const w=ZC.W.webs[0];const r=webJump(0,'W',w,0,1.1);let r1='';{const h=U.act(0);if(h.pos.y<5){ZC.press('Space');for(let i=0;i<60;i++){ZC.hold('KeyW',true);ZC.tick(1);}ZC.hold('KeyW',false);ZC.tick(20);r1=' again y='+h.pos.y.toFixed(1);}}U.tap('KeyK');const r2=webJump(1,'W',w,0,1.6);r+r1+' | '+r2+' | '+U.st()+' links='+ZC.W.links+' foes='+ZC.W.enemies.filter(e=>e.alive).length
//@@
U.st()+' acts='+ZC.players.map(p=>p.act).join(',')
