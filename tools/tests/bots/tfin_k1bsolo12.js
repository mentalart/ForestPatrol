//@@ wait=1500
// @timeout=1800
// релиз final06: 1-Б «Леший-Путаник» одним игроком (аудит 1-Б, Е5): этап 1 — руки, мост, три удара по макушке; этап 2 — два круга пряток ловушкой
// «струна перед настоящим» (U.k1bTrap); этап 3 начинается. Переходы — сама игра (ролики пропускаются), ошибок нет. Этап 3 соло — tfin_k1b3solo.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(true);ZC.players.forEach(p=>{p.path='mid';});ZC.startFrom(ZC.LV('1-B'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(60*2);window.W=ZC.W;window.K=ZC.FIN.k1b;
window.skipCine=function(max){let n=0;while(ZC.G.cine&&n<60*(max||40)){if(n%30===0)ZC.skip();ZC.tick(1);n++;}ZC.tick(20);};
window.cycle=function(){let n=0;while(n<60*60&&!W.enemies.some(e=>e.state==='broken'&&e.kind==='hand')){U.brawl(1/60);n++;}
  const e=W.enemies.find(e=>e.state==='broken');if(!e)return 'no break';const sh={x:e.side*2.4,z:-22.5};const h=U.act(0);const hx=e.pos.x,hz=e.pos.z;const lp=(a,b,t)=>a+(b-a)*t;
  U.walkTo(0,hx,hz+1.2,4);for(let k=1;k<=8;k++)U.walkTo(0,lp(hx,sh.x,k/8),lp(hz,sh.z,k/8),2);h.face=Math.atan2(0-h.pos.x,-24.2-h.pos.z);ZC.tick(1);ZC.press('KeyF');ZC.tick(24);return 'head='+W.flags.head;};
let g=0;while((W.flags.head||0)<3&&W.flags.phase===1&&g<30){ZC.tick(60);cycle();g++;}skipCine(30);ZC.tick(60*3);skipCine(30);
if(W.flags.phase!==2)throw new Error('соло: этап 1 не пройден за '+g+' попыток, head='+W.flags.head);
'соло, этап 1: попыток '+g+' · solo='+ZC.G.solo
//@@
const r1=U.k1bTrap(0,150);ZC.tick(60*3);skipCine(10);const r2=U.k1bTrap(0,150);ZC.tick(60*3);skipCine(30);
if(W.flags.phase!==3)throw new Error('соло: этап 2 — '+r1+' | '+r2);
if(window._errs.length)throw new Error('ошибки: '+window._errs[0]);
'соло, этап 2: '+r1+' | '+r2+' · этап '+W.flags.phase
