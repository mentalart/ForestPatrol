//@@
// @timeout=900
// Битва с Кощеем (сборка --k5epic), стадия 10 «Там царь Кащей над златом чахнет»: груды злата; размах левой рукой по дуге — стоящий
// сбит, прыгнувший цел; цепь-аркан — захлестнуло, друг рубит цепь; кольцо монет оставляет груду; корни, заклёпки, на колене — в
// грудь вдвоём: стадия пройдена. Одним игроком — аркан рвётся ударами схваченного.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,300));_ce.apply(console,arguments);};}
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.E5=ZC.FIN.k5e;window.K5=ZC.FIN.k5;
window.CHK=s=>{if(_errs.length)throw new Error(s+' — ошибки: '+_errs.slice(0,4).join(' / '));return s;};
window.KB=[{a:'KeyF',g:'KeyG',i:'KeyR'},{a:'Comma',g:'Period',i:'Semicolon'}];
window.H=pi=>ZC.players[pi].heroes[ZC.players[pi].act];
window.PIS=()=>ZC.G.solo?[ZC.G.soloPi]:[0,1];window.KEY=(pi,k)=>KB[ZC.G.solo?0:pi][k];
window.PUT=(h,x,z,y,face)=>{h.pos.set(x,(y||0)+0.05,z);h.vel.set(0,0,0);if(face!=null)h.face=face;};
window.FULL=()=>{for(const pi of[0,1])ZC.players[pi].petals=3;};
window.TK=n=>{for(let i=0;i<n;i++){if(ZC.G.cine&&i%3===0)ZC.skip();if(ZC.G.ui==='skaz'&&i%20===0)ZC.press('Space');FULL();ZC.tick(1);}};
window.LOG=()=>E5.logs||[];
window.GO10=solo=>{ZC.setSolo(!!solo);FULL();E5.goStage(10);ZC.G.manual=true;ZC.tick(20);window.ES=E5.es;let i=0;for(;i<60*90&&!(E5.cur===10&&ES.fight&&!ZC.G.cine&&!ZC.G.ui);i++)TK(1);
  window.ES=E5.es;Object.assign(ES,{swT:99,lasT:99,coinT:99,at:99});return 'cur='+E5.cur+' fight='+ES.fight;};
window.GC={x:0,z:-19};
'ok'
//@@
// вдвоём: размах по дуге — стоящий сбит, прыгнувший цел
const r=[GO10(false)];ES.swT=0.01;TK(2);r.push('замах='+ES.sw);const sz=ES.swS>0?GC.z+3:GC.z-3;FULL();const p0=ZC.players[0].petals,p1=ZC.players[1].petals;
for(let i=0;i<60*3&&ES.sw!=='rest';i++){PUT(H(0),GC.x-6,sz);if(ES.sw==='sweep'){H(1).pos.set(GC.x+6,1.2,sz);H(1).vel.set(0,2,0);H(1).grounded=false;}else PUT(H(1),GC.x+6,sz);ZC.tick(1);}
r.push('стоял: '+p0+'→'+ZC.players[0].petals+' прыгнул: '+p1+'→'+ZC.players[1].petals);if(ZC.players[0].petals>=p0||ZC.players[1].petals<p1)throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// цепь-аркан: захлестнуло; друг рубит цепь
const r=[];FULL();ES.lasT=0.01;TK(2);const L=ES.las;r.push('аркан='+(L&&L.st));if(!L)throw new Error('нет аркана');const h=L.h;for(let i=0;i<120&&ES.las&&ES.las.st==='aim';i++){PUT(h,h.pos.x,h.pos.z);ZC.tick(1);}
r.push('захлестнуло='+(ES.las&&ES.las.st));if(!ES.las||ES.las.st!=='tied')throw new Error(r.join(' | '));const fr=H(1-h.player);
for(let k=0;k<5&&ES.las;k++){const m=ES.las.a.clone().lerp(ES.las.h.pos,0.5);PUT(fr,m.x+0.8,m.z);ZC.tick(1);ZC.press(KEY(fr.player,'a'));TK(30);}r.push('разрублена='+LOG().includes('lassoCut'));if(!LOG().includes('lassoCut'))throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@ shot=k5e_s10_hoard.png
ZC.tick(1);
//@@
// кольцо монет сходится — оставляет груду злата
const r=[];ES.coinT=0.01;TK(200);r.push('груд='+ES.piles.length);if(!ES.piles.length)throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// корни, заклёпки, на колене — в грудь вдвоём: пройдена
const r=[];for(let k=0;k<2;k++){const x=k?2.2:-2.2;for(let i=0;i<200&&ES.root!==k&&!ES.knee[k];i++){PUT(H(0),x+0.6,-17.4);TK(1);}for(let i=0;i<8&&!ES.knee[k];i++){const t=ZC.W.hittables.find(t=>t.alive()&&t.r===1.3);if(t)t.onHit(H(0));ZC.tick(3);}}
r.push('колени='+ES.knee.join(',')+' ph='+ES.ph);TK(120);PUT(H(0),1.7,-18.6,7.5);PUT(H(1),1.9,-19.2,7.5);ZC.tick(2);const t=ZC.W.hittables.find(t=>t.alive()&&t.r===1.6);if(t){t.onHit(H(0));t.onHit(H(1));}
for(let i=0;i<60*12&&!E5.done[10];i++)TK(1);r.push('пройдена='+!!E5.done[10]);if(!E5.done[10])throw new Error(r.join(' | ')+' лог='+LOG().slice(-4));CHK(r.join(' | '))
//@@
// одним игроком: аркан рвётся ударами схваченного
const r=[GO10(true)];ES.lasT=0.01;TK(2);const L=ES.las;if(!L)throw new Error('соло: нет аркана');const h=L.h;for(let i=0;i<150&&ES.las&&ES.las.st==='aim';i++){PUT(h,h.pos.x,h.pos.z);ZC.tick(1);}
for(let k=0;k<12&&ES.las;k++){ZC.press(KEY(h.player,'a'));TK(25);}r.push('вырвался='+LOG().includes('lassoCut'));if(ES.las)throw new Error(r.join(' | '));CHK(r.join(' | '))
