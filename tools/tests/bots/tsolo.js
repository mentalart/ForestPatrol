//@@
// меню: кнопка «Одиночный режим», O переключает, одна сложность на двоих
const r=[];if(ZC.FIN){ // релизная сборка: режим в главном меню — пункт «Режим», сложность — в настройках
  ZC.setSolo(true);r.push(document.body.innerHTML.includes('Режим'),'solo='+ZC.G.solo,'final',false);ZC.players[0].path='hard';ZC.players[1].path='hard';r.push('hard/hard','final');}
else{ZC.menu('menu');r.push(document.body.innerHTML.includes('Одиночный режим'));ZC.menuKey('KeyO');r.push('solo='+ZC.G.solo,document.getElementById('solob').className,!!document.getElementById('e1'));
ZC.menuKey('KeyQ');r.push(ZC.players[0].path+'/'+ZC.players[1].path,document.getElementById('e0').textContent);}r
//@@ shot=so_menu.png
ZC.tick(1);
//@@
// Y по кругу — все четверо; обе раскладки управляют одним героем
if(ZC.FIN){ZC.players[0].path=ZC.players[1].path='mid';}else{ZC.menuKey('KeyQ');ZC.menuKey('KeyQ');}ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(30);if(ZC.G.cine)ZC.skip();ZC.tick(10);const G=ZC.G;const r=['path='+ZC.players[0].path+'/'+ZC.players[1].path,'soloPi='+G.soloPi];
const cur=()=>U.act(G.soloPi).kind;const seq=[cur()];for(let i=0;i<5;i++){ZC.press(i%2?'KeyK':'KeyQ');ZC.tick(3);seq.push(cur());}r.push(seq.join('>'));
// стрелки ведут того же героя, что и WASD
const h=U.act(G.soloPi),x0=h.pos.x;ZC.hold('ArrowRight',true);ZC.tick(30);ZC.hold('ArrowRight',false);ZC.tick(2);r.push('arrows dx='+(h.pos.x-x0).toFixed(2));
const h2=U.act(1-G.soloPi),x1=h2.pos.x;ZC.hold('KeyD',true);ZC.tick(30);ZC.hold('KeyD',false);ZC.tick(2);r.push('other idle dx='+(h2.pos.x-x1).toFixed(2),'split='+G.split.toFixed(2));r
//@@
// «Ко мне» зовёт всех троих
const G=ZC.G,H=ZC.HERO;const r=[];const me=U.act(G.soloPi);ZC.press('Digit1');ZC.tick(2);r.push(['proshka','potap','pelageya','yosha'].map(k=>k+':'+(H[k]===me?'ME':H[k].following)).join(' '));
const start=me.pos.clone();r.push(U.walkTo(G.soloPi,me.pos.x+4,me.pos.z-6,6));ZC.tick(240);r.push(['proshka','potap','pelageya','yosha'].map(k=>k+':'+Math.hypot(H[k].pos.x-me.pos.x,H[k].pos.z-me.pos.z).toFixed(1)).join(' '));
r.push(U.st());r
//@@ shot=so_call.png
ZC.tick(1);
//@@
// ролик пропускает один игрок
const G=ZC.G;const r=[];ZC.startFrom(ZC.LV('4-1'));G.manual=true;ZC.tick(20);r.push(U.walkTo(G.soloPi,0,-7.5,4),'cine='+!!G.cine);ZC.tick(60);ZC.hold('Space',true);ZC.tick(90);ZC.hold('Space',false);ZC.tick(5);r.push('after skip cine='+!!G.cine,'stage='+ZC.W.flags.stage,'soloPi='+G.soloPi,U.act(G.soloPi).kind);r
//@@
// 4-1 в одиночку: куёт только Прошка; Пелагея сама качает мехи, Йоша сам закаливает
const W=ZC.W,H=ZC.HERO,FG=W.FG,G=ZC.G;const r=[];r.push(U.walkTo(G.soloPi,0,-12.6,3));let last=-1;const hs=[];let shot=false;
for(let i=0;i<60*120&&!W.abil.kleshi;i++){const u=((FG.t%FG.B)+FG.B)%FG.B/FG.B;const beat=Math.floor(FG.t/FG.B);
  if(FG.t>0&&u<0.08&&beat!==last&&FG.made<FG.total){last=beat;ZC.press('KeyF');}
  if(i%600===0)hs.push(FG.heat.toFixed(2)+'/'+FG.made+'/'+FG.done+'/'+FG.onRack);
  if(W.flags.stage==='tongs'&&W.flags.flying&&!shot){shot=true;r.push('flying@'+(i/60).toFixed(1));break;}
  ZC.tick(1);}
r.push(hs.join(' '),'stage='+W.flags.stage);r
//@@ shot=so_rack.png
ZC.tick(58);
//@@ shot=so_fly0.png
ZC.tick(24);
//@@ shot=so_fly.png
ZC.tick(1);
//@@
const W=ZC.W;const r=[];r.push(U.until(()=>W.abil.kleshi,6),'kleshi='+W.abil.kleshi,U.obj());r
//@@ shot=so_kl.png
ZC.tick(60);
