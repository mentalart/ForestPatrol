U.go();ZC.loadLevel(3);ZC.tick(30);const r=[U.walkTo(0,-5.5,-5.4),U.walkTo(1,5.5,-5.4)];const H=ZC.HERO;H.proshka.face=Math.PI;H.pelageya.face=Math.PI;ZC.tick(2);ZC.press('KeyR');ZC.press('Semicolon');ZC.tick(40);
const a=U.walkTo(0,-5.1,-14,8),b=U.walkTo(1,5.5,-14,8);U.walkTo(0,-5.5,-14.2,2);U.walkTo(1,5.5,-14.2,2);H.proshka.face=Math.PI;ZC.tick(2);ZC.press('KeyR');ZC.tick(40);
// P1 стоит у колышка, струна пустая — ждём паутинника
const L=[];let cut='no';for(let i=0;i<60*10;i++){ZC.tick(1);const e=ZC.W.enemies.find(x=>x.kind==='tat');if(i%30==0)L.push(e?(e.state[0]+(e.chew?'C'+e.chewT.toFixed(1):'')+'@'+e.pos.x.toFixed(1)+','+e.pos.z.toFixed(1)):'-');if(!ZC.W.threads.some(t=>t.owner===0&&t.string&&t.stake&&t.stake.z<-20)){cut='t='+(i/60).toFixed(1);break;}}
'cut='+cut+' '+L.join(' ')+' | '+U.st()+' tats='+ZC.W.enemies.filter(e=>e.kind==='tat').length+' own='+(ZC.W.enemies.find(e=>e.kind==='tat')||{}).own
//@@
// личный паутинник (own) экран не склеивает: герои на разных дорожках — экран делится; общий враг склеил бы
const G=ZC.G,e=ZC.W.enemies.find(x=>x.kind==='tat'),r=[];ZC.tick(5);r.push('own='+e.own,'sep='+Math.hypot(ZC.HERO.proshka.pos.x-ZC.HERO.pelageya.pos.x,ZC.HERO.proshka.pos.z-ZC.HERO.pelageya.pos.z).toFixed(1),'личный(ждём 1)='+G.splitTarget);
const o=e.own;e.own=undefined;ZC.tick(5);r.push('общий(ждём 0)='+G.splitTarget);e.own=o;ZC.tick(120);r.push('снова личный(ждём 1)='+G.splitTarget);r.join(' ')
//@@ shot=tat1.png
// бросить снова и сразу встать на струну: паутинник отступает
const H=ZC.HERO;H.proshka.face=Math.PI;ZC.tick(2);ZC.press('KeyR');ZC.tick(20);const e=ZC.W.enemies.find(x=>x.kind==='tat');const L=[];
const w=U.walkTo(0,-5.1,-19,6,(h,i)=>{if(i%20==0)L.push((e.chew?'C':'')+e.state[0]+(h.groundRef&&h.groundRef.string?'S':''));});
const s1=W=ZC.W.threads.filter(t=>t.owner===0&&t.string).length;w+' '+L.join(' ')+' strings0='+s1+' chew='+!!e.chew+' prov='+e.prov.toFixed(1)
//@@
// дойти до кочки и распутать паутинника
const w=U.walkTo(0,-5.1,-24.4,6);ZC.tick(10);const b=U.brawl(40);const e=ZC.W.enemies.find(x=>x.kind==='tat');w+' '+b+' tatAlive='+(e?e.alive:false)+' petals='+ZC.players[0].petals+' falls='+ZC.G.stats.falls+' '+U.st()
