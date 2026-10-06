//@@
// @timeout=600
// Битва с Кощеем (сборка --k5epic), стадия 12 «Златая цепь на дубе том»: верный удар ковки — золотое звено летит к дубу и вплетается
// в цепь на стволе; Кот учёный по цепи: направо — песнь (такт шире), налево — сказка (Кощей заслушался); «Чёрное перо» — черта по
// земле, через 1,6 с — стена: кто на черте — больно, кто в стороне — цел.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,300));_ce.apply(console,arguments);};}
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.E5=ZC.FIN.k5e;window.K5=ZC.FIN.k5;
window.CHK=s=>{if(_errs.length)throw new Error(s+' — ошибки: '+_errs.slice(0,4).join(' / '));return s;};
window.H=pi=>ZC.players[pi].heroes[ZC.players[pi].act];
window.PUT=(h,x,z)=>{h.pos.set(x,0.05,z);h.vel.set(0,0,0);};
window.FULL=()=>{for(const pi of[0,1])ZC.players[pi].petals=3;};
window.TK=n=>{for(let i=0;i<n;i++){if(ZC.G.cine&&i%3===0)ZC.skip();if(ZC.G.ui==='skaz'&&i%20===0)ZC.press('Space');FULL();ZC.tick(1);}};
window.LOG=()=>E5.logs||[];
E5.goStage(12);ZC.G.manual=true;ZC.tick(20);window.ES=E5.es;{let i=0;for(;i<60*90&&!(E5.cur===12&&K5.fight&&!ZC.G.cine&&!ZC.G.ui);i++)TK(1);}window.ES=E5.es;window.L12=E5.layer[12].bot;ES.penT=99;'cur='+E5.cur+' fight='+K5.fight+' ковка='+!!K5.forge
//@@
// верный удар ковки — звено летит к дубу
const r=[];const l0=L12.links();K5.forge.n+=1;TK(80);r.push('звеньев на дубе '+l0+'→'+L12.links());if(L12.links()<=l0)throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// Кот: направо — песнь, налево — сказка
const r=[];ES.kotRight=false;L12.turnKot(0.2);TK(2);r.push('песнь='+(L12.kot().song>0)+' такт+'+(ZC.W.ladBonus||0));if(!(L12.kot().song>0))throw new Error(r.join(' | '));
ES.kotRight=true;L12.turnKot(Math.PI+0.2);TK(2);r.push('сказка='+(L12.kot().tale>0)+' слушает='+K5.listen);if(!(L12.kot().tale>0)||!K5.listen)throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// Чёрное перо: на черте — больно, в стороне — цел
const r=[];FULL();PUT(H(0),-3,-10);PUT(H(1),3,-6);ZC.tick(1);L12.pen();const P=L12.pens()[L12.pens().length-1];const on=[H(0),H(1)].find(h=>{const v=h.pos.clone().sub(P.c);v.y=0;return Math.abs(v.x*P.d.z-v.z*P.d.x)<0.5&&Math.abs(v.dot(P.d))<7;});
const off=[H(0),H(1)].find(h=>h!==on);const pOn=ZC.players[on.player].petals,pOff=ZC.players[off.player].petals;
for(let i=0;i<150;i++){const p0=on.pos.clone();on.pos.copy(p0);on.vel.set(0,0,0);off.pos.set(P.c.x+P.d.z*4,0.05,P.c.z-P.d.x*4);off.vel.set(0,0,0);ZC.tick(1);}
r.push('на черте: '+pOn+'→'+ZC.players[on.player].petals+' в стороне: '+pOff+'→'+ZC.players[off.player].petals);if(ZC.players[on.player].petals>=pOn||ZC.players[off.player].petals<pOff)throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@ shot=k5e_s12_oak.png
ZC.tick(1);
