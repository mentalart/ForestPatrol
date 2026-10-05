//@@
// @timeout=900
// Битва с Кощеем (сборка --k5epic), стадия 10 «Там царь Кащей над златом чахнет»: груды злата; размах левой рукой по дуге — стоящий
// сбит, прыгнувший цел; цепь-аркан — захлестнуло, друг рубит цепь; кольцо монет оставляет груду; корни, заклёпки, на колене — в
// грудь вдвоём — пробой 1; оковы: кулак лёг — замки на запястье и локте — пробой 2; глаза метут лучами, оба круга у ног — корни —
// пробой 3: стадия пройдена. Одним игроком — аркан рвётся ударами схваченного; три пробоя одним героем.
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
window.HT=r=>ZC.W.hittables.filter(t=>t.alive()&&t.r===r);
// на колене: на плечо — удар в замок на груди (вдвоём — разом)
window.HEART=hs=>{for(let i=0;i<60*8&&ES.ph!=='heart';i++)TK(1);TK(120);hs.forEach((h,j)=>PUT(h,1.7+j*0.2,-18.6-j*0.6,7.5));ZC.tick(2);const t=HT(1.6)[0];if(t)hs.forEach(h=>t.onHit(h));TK(2);return 'пробой'+ES.breaks+' ph='+ES.ph;};
// оковы: кулак лёг — замок у кулака и выше, на локте
window.WRISTS=hs=>{for(let i=0;i<60*8&&ES.ph!=='wrists';i++)TK(1);for(let i=0;i<60*14&&ES.arm!=='down';i++){hs.forEach((h,j)=>PUT(h,3+j,-12));if(ES.arm==='rest'&&ES.at>0.3)ES.at=0.3;TK(1);}
  for(let k=0;k<20&&ES.ph==='wrists'&&ES.arm==='down';k++){const t=HT(1.3)[0];if(!t)break;PUT(hs[0],t.pos.x,t.pos.z,t.pos.y-1);t.onHit(hs[0]);TK(2);}return 'оковы='+ES.wHp.join(',')+' ph='+ES.ph;};
// глаза: оба круга у ног (одним — по очереди), корни держат обе — на колено
window.EYES=hs=>{for(let i=0;i<60*8&&ES.ph!=='eyes';i++)TK(1);for(let i=0;i<60*8&&ES.ph==='eyes';i++){if(hs.length>1){PUT(hs[0],GC.x-2.2,GC.z+1.2);PUT(hs[1],GC.x+2.2,GC.z+1.2);}else PUT(hs[0],GC.x+(i<90?-2.2:2.2),GC.z+1.2);TK(1);}
  return 'корни='+ES.r2.map(v=>v.toFixed(1)).join(',')+' ph='+ES.ph;};
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
// корни, заклёпки, на колене — в грудь вдвоём: пробой 1, великан встаёт — оковы
const r=[];for(let k=0;k<2;k++){const x=k?2.2:-2.2;for(let i=0;i<600&&ES.root!==k&&!ES.knee[k];i++){PUT(H(0),x+0.6,-17.4);TK(1);}for(let i=0;i<8&&!ES.knee[k];i++){const t=HT(1.3)[0];if(t)t.onHit(H(0));ZC.tick(3);}}
r.push('колени='+ES.knee.join(',')+' ph='+ES.ph);r.push(HEART([H(0),H(1)]));if(ES.breaks!==1)throw new Error(r.join(' | '));for(let i=0;i<60*4&&ES.ph!=='wrists';i++)TK(1);r.push('ph='+ES.ph);if(ES.ph!=='wrists')throw new Error(r.join(' | '));
for(let i=0;i<60*14&&ES.arm!=='down';i++){PUT(H(0),3,-12);PUT(H(1),4,-12);if(ES.arm==='rest'&&ES.at>0.3)ES.at=0.3;TK(1);}r.push('кулак='+ES.arm);if(ES.arm!=='down')throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@ shot=k5e_s10_wrists.png
ZC.tick(1);
//@@
// оковы: замки на руке — на колено, пробой 2; глаза метут лучами
const r=[];const hi=HT(1.3).length;r.push('замков='+hi);const t=HT(1.3).find(t=>t.pos.y>3);r.push('локоть y='+(t?t.pos.y.toFixed(1):'-'));if(t){PUT(H(0),t.pos.x,t.pos.z,0);const p0=ES.wHp.slice();t.onHit(H(0));r.push('с земли до локтя: '+(ES.wHp.join(',')===p0.join(',')?'не засчитан':'засчитан'));if(ES.wHp.join(',')!==p0.join(','))throw new Error(r.join(' | '));}
r.push(WRISTS([H(0),H(1)]));if(ES.ph!=='heart')throw new Error(r.join(' | '));r.push(HEART([H(0),H(1)]));if(ES.breaks!==2)throw new Error(r.join(' | '));for(let i=0;i<60*4&&ES.ph!=='eyes';i++)TK(1);r.push('ph='+ES.ph);if(ES.ph!=='eyes')throw new Error(r.join(' | '));
PUT(H(0),GC.x-2.2,GC.z+1.2);PUT(H(1),GC.x+5,GC.z+6);TK(80);r.push('одна нога: ph='+ES.ph);if(ES.ph!=='eyes')throw new Error('одна нога в корнях — уже на колене: '+r.join(' | '));CHK(r.join(' | '))
//@@ shot=k5e_s10_eyes.png
ZC.tick(1);
//@@
// обе ноги в корнях — на колено, пробой 3: пройдена
const r=[EYES([H(0),H(1)])];if(ES.ph!=='heart')throw new Error(r.join(' | '));r.push(HEART([H(0),H(1)]));if(ES.ph!=='open')throw new Error(r.join(' | '));
for(let i=0;i<60*12&&!E5.done[10];i++)TK(1);r.push('пройдена='+!!E5.done[10]);if(!E5.done[10])throw new Error(r.join(' | ')+' лог='+LOG().slice(-4));CHK(r.join(' | '))
//@@
// одним игроком: аркан рвётся ударами схваченного
const r=[GO10(true)];ES.lasT=0.01;TK(2);const L=ES.las;if(!L)throw new Error('соло: нет аркана');const h=L.h;for(let i=0;i<150&&ES.las&&ES.las.st==='aim';i++){PUT(h,h.pos.x,h.pos.z);ZC.tick(1);}
for(let k=0;k<12&&ES.las;k++){ZC.press(KEY(h.player,'a'));TK(25);}r.push('вырвался='+LOG().includes('lassoCut'));if(ES.las)throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// одним игроком: три пробоя одним героем
const r=[GO10(true)];const me=H(PIS()[0]);for(let k=0;k<2;k++){const x=k?2.2:-2.2;for(let i=0;i<300&&ES.root!==k&&!ES.knee[k];i++){PUT(me,x+0.6,-17.4);TK(1);}for(let i=0;i<8&&!ES.knee[k];i++){const t=HT(1.3)[0];if(t)t.onHit(me);ZC.tick(3);}}
r.push(HEART([me]));r.push(WRISTS([me]));r.push(HEART([me]));r.push(EYES([me]));r.push(HEART([me]));for(let i=0;i<60*12&&!E5.done[10];i++)TK(1);r.push('пройдена='+!!E5.done[10]);if(!E5.done[10])throw new Error(r.join(' | '));CHK(r.join(' | '))
