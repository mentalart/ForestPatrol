//@@
// @timeout=600
// Битва с Кощеем (сборка --k5epic), стадия 2 «Там леший бродит»: как победить — подсказки в мире. Пока Леший в цепи, над ближним
// героем «к Лешему»; встал в зелёный круг — «жди молнию», и Кощей бьёт молнией в него (не позже чем через 3 с); красный круг —
// «уходи», ушёл — молния рвёт застёжку; две застёжки — Леший свободен. Замах Кощея по герою — кнопка щита над ним.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,300));_ce.apply(console,arguments);};}
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.E5=ZC.FIN.k5e;window.K5=ZC.FIN.k5;
window.CHK=s=>{if(_errs.length)throw new Error(s+' — ошибки: '+_errs.slice(0,4).join(' / '));return s;};
window.TK=n=>{for(let i=0;i<n;i++){if(ZC.G.cine&&i%3===0)ZC.skip();if(ZC.G.ui&&i%10===0)ZC.press('Space');ZC.tick(1);}};
window.PUT=(h,x,z)=>{h.pos.set(x,0.05,z);h.vel.set(0,0,0);};
window.HERO0=()=>ZC.players[0].heroes[ZC.players[0].act];
// какие подсказки-кнопки сейчас видны (условие истинно): подпись или действие
window.VIS=()=>ZC.W.prompts.filter(p=>{try{return p.cond();}catch(e){return false;}}).map(p=>{const n=typeof p.note==='function'?p.note():p.note;return n||p.action;});
for(const pi of[0,1])ZC.players[pi].petals=3;E5.goStage(2);ZC.G.manual=true;ZC.tick(20);
{let i=0;for(;i<60*90&&!(E5.cur===2&&!ZC.G.cine&&!ZC.G.ui&&K5.fight);i++)TK(1);}
CHK('cur='+E5.cur+' fight='+K5.fight+' Леший свободен='+!!E5.free.leshy+' | подсказки: '+VIS().join(' / '))
//@@
// герой в зелёном круге у Лешего: молния приходит к нему
const L=E5.fr.leshy.m.g.position,A=HERO0();let t=0;for(;t<60*6;t++){PUT(A,L.x+1.2,L.z+0.6);if((K5.zones||[]).some(z=>Math.hypot(z.position.x-A.pos.x,z.position.z-A.pos.z)<1.8))break;ZC.tick(1);}
window.R=['молния через '+(t/60).toFixed(1)+' с | подсказки: '+VIS().join(' / ')];if(t>=60*6)throw new Error('молния к Лешему не пришла: '+R.join(' '));CHK(R.join(' | '))
//@@ shot=k5e_leshy_ring.png
ZC.tick(1);
//@@
// уйти из круга — застёжка рвётся; вторая — так же; Леший свободен
const L=E5.fr.leshy.m.g.position,A=HERO0();const away=()=>{for(let i=0;i<20;i++){PUT(A,L.x+4.6,L.z+3.6);ZC.tick(1);}ZC.tick(110);R.push('застёжек '+E5.es.clasp);};away();
for(let k=0;k<3&&!E5.free.leshy;k++){let t=0;for(;t<60*6;t++){PUT(A,L.x+1.2,L.z+0.6);if((K5.zones||[]).some(z=>Math.hypot(z.position.x-A.pos.x,z.position.z-A.pos.z)<1.8))break;ZC.tick(1);}R.push('молния через '+(t/60).toFixed(1)+' с');away();}
R.push('Леший свободен='+!!E5.free.leshy);if(!E5.free.leshy)throw new Error(R.join(' | '));CHK(R.join(' | '))
//@@
// Леший свободен: замах Кощея по герою — над ним кнопка щита (или кувырка на красный) со значком, без слов
const KB=ZC.W.dbg5e().KB;let seen='';for(let i=0;i<60*25&&!seen;i++){if(KB.state==='wind'){const v=ZC.W.prompts.filter(p=>{try{return p.cond()&&(p.action==='guard'||p.action==='roll');}catch(e){return false;}}).map(p=>p.action+(/<svg/.test(typeof p.note==='function'?p.note():p.note||'')?'+значок':''));if(v.length)seen=v.join(' / ');}ZC.tick(1);}
if(!seen)throw new Error('нет подсказки на замах Кощея');CHK('замах: '+seen)
