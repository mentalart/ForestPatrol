//@@
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('4-3'));ZC.G.manual=true;ZC.tick(60);const W=ZC.W,H=ZC.HERO;const r=[W.name,!!ZC.G.cine];ZC.skip();ZC.tick(5);r.push(W.flags.stage,U.st(),U.obj(),'act='+U.act(0).kind+','+U.act(1).kind);r
//@@ shot=w43a.png
ZC.tick(1);
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r2=[];const P=H.proshka,Y=H.yosha;
r2.push(U.walkTo(0,-0.5,-9.2,3),U.walkTo(1,-2.3,-11.3,3));
const log=[];let lastK=-1;
for(let i=0;i<60*30;i++){const S=W.song;if(!S)break;const u=((S.t%2.6)+2.6)%2.6,k=Math.floor(S.t/2.6);
  if(u>1.2&&u<1.5&&k!==lastK){lastK=k;ZC.press('KeyE');ZC.press('KeyL');}
  if(i%156===0)log.push(ZC.W.links+'/'+RS());
  ZC.tick(1);}
function RS(){return ['proshka','potap','pelageya','yosha'].map(n=>H[n].pos.z.toFixed(1)).join(',');}
r2.push(log.join(' '),'links='+W.links,U.obj());r2
//@@ shot=w43b.png
ZC.tick(1);
//@@
const W=ZC.W,H=ZC.HERO,F=W.flags;const r3=[];const K1={jump:['Space','KeyM'],swap:['KeyQ','KeyK'],pull:['KeyE','KeyL']};
const log=[];let lastK=-1;
for(let i=0;i<60*60;i++){const S=W.song;if(!S)break;const u=((S.t%2.6)+2.6)%2.6,k=Math.floor(S.t/2.6);
  if(u>1.05&&u<1.4&&k!==lastK){lastK=k;
    const near=W.RINGS.filter(r=>r.blocked||W.LOGS.some(L=>r.z>L.z+0.25&&r.z<L.z+0.9));const sw=[false,false],jp=[false,false];
    for(const r of near){if(!r.hero)continue;const pi=r.hero.player;if(r.hero.active)jp[pi]=true;else sw[pi]=true;}
    for(const pi of[0,1]){if(jp[pi])ZC.press(K1.jump[pi]);else if(sw[pi]){ZC.press(K1.swap[pi]);}}
    ZC.tick(1);ZC.press('KeyE');ZC.press('KeyL');log.push(H.potap.pos.z.toFixed(1)+'|'+k+':'+near.map(r=>r.i+(r.hero?r.hero.kind[0]+(r.hero.active?'*':''):'-')).join('')+(sw[0]||sw[1]?'S':'')+(jp[0]||jp[1]?'J':''));}
  ZC.tick(1);if(W.RINGS.every(r=>r.z<W.LOGS[2].z-0.6))break;}
r3.push(log.join(' '),U.st(),'B='+W.BARGE.z.toFixed(1),W.RINGS.map(r=>r.i+':'+(r.hero?r.hero.kind:'-')+'@'+r.z.toFixed(1)).join(' '),U.obj(),'links='+W.links);r3
//@@ shot=w43c.png
ZC.tick(1);
//@@
// отладка горы: только тянем, огонь 10 с один раз
const W=ZC.W,H=ZC.HERO,F=W.flags;let lastK=-1;const log=['st='+F.stage+' B='+W.BARGE.z.toFixed(1)];W.FIRE.t=10;
for(let i=0;i<60*14&&W.song;i++){const S=W.song;const u=((S.t%2.6)+2.6)%2.6,k=Math.floor(S.t/2.6);if(u>1.2&&u<1.5&&k!==lastK){lastK=k;ZC.press('KeyE');ZC.press('KeyL');}
 if(i%52===0)log.push('B='+W.BARGE.z.toFixed(2)+'/'+W.BARGE.tz.toFixed(2)+' f='+W.FIRE.t.toFixed(1)+' '+W.RINGS.map(r=>(r.hero?r.hero.kind[0]+(r.hero.active?'*':''):'-')+r.z.toFixed(1)+(r.blocked?'!':'')).join(','));ZC.tick(1);}
log.join(' | ')
