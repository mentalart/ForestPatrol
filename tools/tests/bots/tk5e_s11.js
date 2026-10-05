//@@
// @timeout=900
// Битва с Кощеем (сборка --k5epic), стадия 11 «Без имён»: вычеркнутые имена плавают в воздухе; плеть из стены по красной дорожке;
// «Ко мне!» обоих — трещина, удар с двух сторон — стена пала, имена золотеют и летят к героям; четверо друзей вспомнили себя — «Все
// сказки разом» (ряды, свист, лучи) 9 с — Кощей выдохся, окно; спесь сбита — нить вдвоём: стадия пройдена.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,300));_ce.apply(console,arguments);};}
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.E5=ZC.FIN.k5e;window.K5=ZC.FIN.k5;
window.CHK=s=>{if(_errs.length)throw new Error(s+' — ошибки: '+_errs.slice(0,4).join(' / '));return s;};
window.KB=[{a:'KeyF',g:'KeyG',i:'KeyR'},{a:'Comma',g:'Period',i:'Semicolon'}];
window.H=pi=>ZC.players[pi].heroes[ZC.players[pi].act];
window.KEY=(pi,k)=>KB[ZC.G.solo?0:pi][k];
window.PUT=(h,x,z,y,face)=>{h.pos.set(x,(y||0)+0.05,z);h.vel.set(0,0,0);if(face!=null)h.face=face;};
window.FULL=()=>{for(const pi of[0,1])ZC.players[pi].petals=3;};
window.TK=n=>{for(let i=0;i<n;i++){if(ZC.G.cine&&i%3===0)ZC.skip();if(ZC.G.ui==='skaz'&&i%20===0)ZC.press('Space');FULL();ZC.tick(1);}};
window.LOG=()=>E5.logs||[];
E5.goStage(11);ZC.G.manual=true;ZC.tick(20);window.ES=E5.es;{let i=0;for(;i<60*90&&!(E5.cur===11&&ES.fight&&!ZC.G.cine&&!ZC.G.ui);i++)TK(1);}window.ES=E5.es;window.S11=E5.stage[11].bot;ES.whipT=99;ES.letT=99;'cur='+E5.cur+' fight='+ES.fight
//@@
// имена в воздухе; плеть из стены — кто на дорожке, тому больно
const r=[];const vis=S11.names().filter(N=>N.sp.visible).length;r.push('имён в воздухе='+vis);if(vis<10)throw new Error(r.join(' | '));
FULL();PUT(H(0),-4,-13);PUT(H(1),4,-13);ZC.tick(1);S11.whip();for(let i=0;i<80;i++){PUT(H(0),-4,-13);PUT(H(1),4,-13);ZC.tick(1);}const lost=6-ZC.players[0].petals-ZC.players[1].petals;r.push('плеть: потеряно лепестков='+lost);if(lost<1)throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@ shot=k5e_s11_ink.png
ZC.tick(1);
//@@
// «Ко мне!» обоих — трещина; удар с двух сторон — стена пала, имена летят к героям
const r=[];FULL();ZC.W.pingCall(0,H(0));ZC.W.pingCall(1,H(1));TK(40);const cz=ES.crackT>0?E5.stage[11].targets(0)[0]:null;r.push('трещина='+!!cz);if(!cz)throw new Error(r.join(' | '));
const c=cz.position;PUT(H(0),c.x-1,c.z,0,Math.PI/2);PUT(H(1),c.x+1,c.z,0,-Math.PI/2);ZC.tick(1);E5.stage[11].attack(H(0),0);E5.stage[11].attack(H(1),1);TK(90);
r.push('стена='+(ES.ph)+' имена ушли='+S11.names().filter(N=>N.gone).length);if(ES.ph!=='moves')throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// четверо вспомнили себя — «Все сказки разом» 9 с — выдохся; спесь — нить вдвоём
for(let t=0;t<60*8&&!(ES.mv&&!ES.mv.countered);t++)TK(1);'ход друга '+(ES.mv&&ES.mv.i)
//@@ shot=k5e_s11_guide.png
ZC.tick(1);
//@@
const r=[];for(let i=0;i<4;i++){for(let t=0;t<60*8&&!(ES.mv&&!ES.mv.countered);t++)TK(1);S11.counter(ES.mv?ES.mv.i:i);TK(60);for(let k=0;k<3;k++){S11.hit(H(0));ZC.tick(20);}for(let t=0;t<60*10&&ES.win>0&&!ES.rage;t++)TK(1);}
r.push('память='+ES.mem.join(',')+' спесь='+ES.spes);for(let t=0;t<60*6&&!ES.rage;t++)TK(1);r.push('ярость='+!!ES.rage);if(!ES.rage&&!LOG().includes('rage'))throw new Error(r.join(' | '));
for(let t=0;t<60*11&&ES.rage;t++)TK(1);r.push('выдохся='+LOG().includes('rageEnd')+' окно='+ES.win.toFixed(1));for(let k=0;k<12&&ES.spes>0;k++){S11.hit(H(0));ZC.tick(20);}r.push('спесь='+ES.spes);
S11.hit(H(0));S11.hit(H(1));TK(60*5);r.push('пройдена='+!!E5.done[11]);if(!E5.done[11])throw new Error(r.join(' | ')+' лог='+LOG().slice(-5));CHK(r.join(' | '))
