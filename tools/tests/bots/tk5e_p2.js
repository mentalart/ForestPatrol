//@@
// @timeout=900
// Битва с Кощеем (сборка --k5epic), стадия 5 «Там о заре прихлынут волны» (страница 2): удары Кощея — волны, золото на дне
// откликается; гусли у раковины — прилив (вода держит героя, колокола всплывают); не тот колокол — заново; верная перекличка
// настоящими ударами — цепь; со 2-й цепи — фальшивый удар и щуки (удар на подлёте — щука в Кощея, «сбился»); с 3-й — колокол
// сверху (стоит преградой) и воронка; Водяной свободен — чёрная вода ползёт, Благовест: один удар не считается, разом — да; три —
// вал, стадия пройдена. Вдвоём и одним игроком.
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
window.VIS=()=>ZC.W.prompts.filter(p=>{try{return p.cond();}catch(e){return false;}}).map(p=>{const n=typeof p.note==='function'?p.note():p.note;return n||p.action;});
window.FIGHT=()=>E5.es.step==='walk'||E5.es.fight;
window.WAITCUR=(n,max)=>{for(let i=0;i<(max||60*150);i++){if(E5.cur===n&&!ZC.G.cine&&ZC.G.ui!=='skaz'&&FIGHT())return 'cur'+n+'@'+(i/60).toFixed(0)+'s';TK(1);}
  throw new Error('WAITCUR '+n+': cur='+E5.cur+' ui='+ZC.G.ui+' es='+JSON.stringify({f:E5.es.fight,st:E5.es.step})+' log='+(E5.logs||[]).slice(-6).join(','));};
window.SILL=w=>{const P=E5.pages[w];for(let i=0;i<300&&E5.es.step!=='fight';i++){PIS().forEach((pi,j)=>PUT(H(pi),P.pos.x-0.5+j,P.pos.z));TK(1);}for(let i=0;i<60*40&&!(E5.es.fight&&!ZC.G.cine&&!ZC.G.ui);i++)TK(1);return 'page'+w+' fight='+E5.es.fight;};
window.GO5=solo=>{ZC.setSolo(!!solo);FULL();E5.goStage(5);ZC.G.manual=true;ZC.tick(20);const r=[WAITCUR(5),SILL(2)];window.A2=E5.ar[2];window.S=A2.S;return r.join(' ');};
window.WAITPH=(ph,max)=>{let i=0;for(;i<(max||60*30)&&S.ph!==ph;i++)TK(1);return S.ph===ph;};
window.LV=()=>A2.bot.zone().level;
// ударить по колоколу настоящим ударом: встать рядом (на воде), лицом к нему
window.HIT=(pi,p)=>{const h=H(pi);PUT(h,p.x,p.z+1.1,LV(),Math.PI);ZC.tick(2);ZC.press(KEY(pi,'a'));ZC.tick(8);};
'ok'
//@@
// вдвоём: перекличка — волны с колокольни, золото откликается; гусли — прилив, герой на воде, колокола всплыли
const r=[GO5(false)];if(!WAITPH('show',60*10))throw new Error('нет переклички: '+S.ph);let waves=0;
for(let i=0;i<60*12&&S.ph==='show';i++){waves=Math.max(waves,ZC.FIN.k5x.owned.filter(o=>o.r!=null&&o.hit&&!o.dead).length);TK(1);}
r.push('нот='+S.notes.length+' волн одновременно='+waves+' ph='+S.ph);if(S.ph!=='answer'||!waves)throw new Error(r.join(' | '));
r.push('подсказки: '+VIS().join(' / '));PUT(H(0),A2.SHELL.x,A2.SHELL.z+0.6);ZC.tick(2);const f=ZC.W.itemSign(0);if(f)f(0);TK(150);
r.push('вода='+A2.bot.zone().state+' уровень='+LV().toFixed(2)+' герой y='+H(0).pos.y.toFixed(2)+' колокол y='+A2.bot.gold(0).y.toFixed(2));
if(A2.bot.zone().state!=='high'||H(0).pos.y<0.8||A2.bot.gold(0).y<1.5)throw new Error('прилив не поднял: '+r.join(' | '));CHK(r.join(' | '))
//@@ shot=k5e_p2_tide.png
ZC.tick(1);
//@@
// не тот колокол — заново; новая перекличка — настоящими ударами по порядку: цепь
const r=[];const wrong=[0,1,2,3].find(b=>b!==S.seq[0]);HIT(1,A2.bot.gold(wrong));r.push('после ошибки ph='+S.ph+' лог='+E5.logs.slice(-1));if(S.ph!=='wait')throw new Error(r.join(' | '));
if(!WAITPH('answer',60*20))throw new Error('нет ответа');A2.bot.tide();TK(120);let tries=0;for(const b of S.seq.slice()){const p0=S.pos;for(let k=0;k<5&&S.pos===p0&&S.chain===0;k++){HIT(1,A2.bot.gold(b));tries++;TK(20);}}TK(10);r.push('ударов='+tries);
r.push('цепей='+S.chain);if(S.chain!==1)throw new Error('цепь не лопнула: '+r.join(' | ')+' seq='+S.seq+' pos='+S.pos);CHK(r.join(' | '))
//@@
// вторая цепь: фальшивый удар; щука — удар на подлёте, летит в Кощея; верный ответ — цепь
const r=[];if(!WAITPH('show',60*10))throw new Error('нет переклички 2');r.push('фальшивых='+S.notes.filter(n=>n.fake).length);if(!S.notes.some(n=>n.fake))throw new Error('нет фальшивого удара');
if(!WAITPH('answer',60*20))throw new Error('нет ответа 2');A2.bot.tide();TK(120);S.pikeT=99;A2.bot.pike(H(0));const p=S.pikes[S.pikes.length-1];let seen='';
for(let i=0;i<120&&!p.bat&&!p.land;i++){if(p.t/p.dur>0.5&&!seen)seen=VIS().filter(v=>/щука/.test(v)).join('');if(p.t/p.dur>0.72){const h=H(0);h.face=Math.atan2(p.m.position.x-h.pos.x,p.m.position.z-h.pos.z);ZC.press(KEY(0,'a'));}ZC.tick(1);}
TK(60);r.push('подсказка='+seen+' отбита='+p.bat+' лог='+E5.logs.slice(-3).join(','));if(!p.bat||!E5.logs.includes('kHit'))throw new Error('щука не отбита в Кощея: '+r.join(' | '));
A2.bot.answer();TK(10);r.push('цепей='+S.chain);if(S.chain!==2)throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// третья цепь: воронка в прилив; колокол сверху стоит преградой; верный ответ — Водяной свободен, финал
const r=[];if(!WAITPH('answer',60*30))throw new Error('нет ответа 3');A2.bot.tide();TK(120);r.push('воронка='+A2.bot.om().swirl);
S.dropT=99;A2.bot.drop(H(1));TK(100);r.push('колокол упал='+(S.drops.length&&!!S.drops[0].col));if(!S.drops.length||!S.drops[0].col)throw new Error(r.join(' | '));
A2.bot.answer();r.push('цепей='+S.chain+' ph='+S.ph);if(!WAITPH('final',60*8))throw new Error('нет финала: '+r.join(' | '));TK(120);r.push('чёрная вода z='+A2.bot.ink().toFixed(1));CHK(r.join(' | '))
//@@ shot=k5e_p2_final.png
ZC.tick(1);
//@@
// Благовест: один удар не считается; разом — да; трижды — вал, стадия пройдена
const r=[];const B=A2.BLAG,pos=[[B.x-1.6,B.z+1.4],[B.x+1.6,B.z+1.4]];const put=()=>[0,1].forEach(pi=>PUT(H(pi),pos[pi][0],pos[pi][1],LV(),Math.atan2(B.x-pos[pi][0],B.z-pos[pi][1])));
put();ZC.tick(2);ZC.press(KEY(0,'a'));TK(70);r.push('один='+S.fin);if(S.fin!==0)throw new Error('один удар засчитан: '+r.join(' | '));
for(let k=0;k<3&&S.ph==='final';k++){put();ZC.tick(2);ZC.press(KEY(0,'a'));ZC.press(KEY(1,'a'));TK(75);r.push('разом='+S.fin);}
if(S.fin<3&&S.ph==='final')throw new Error('Благовест не засчитан: '+r.join(' | ')+' лог='+E5.logs.slice(-4).join(','));TK(60*6);r.push('пройдена='+!!E5.done[5]);if(!E5.done[5])throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// одним игроком: Садко держит воду сам; три переклички; Благовест одним ударом трижды
const r=[GO5(true)];for(let c=0;c<3;c++){if(!WAITPH('answer',60*30))throw new Error('соло: нет ответа '+c);TK(150);if(c===0)r.push('Садко: вода='+A2.bot.zone().state);A2.bot.answer();}
r.push('цепей='+S.chain);if(!WAITPH('final',60*8))throw new Error('соло: нет финала: '+r.join(' | '));TK(100);const B=A2.BLAG,pi=PIS()[0];
for(let k=0;k<3&&S.ph==='final';k++){PUT(H(pi),B.x,B.z+1.6,LV(),Math.PI);ZC.tick(2);ZC.press(KEY(pi,'a'));TK(100);}r.push('благовест='+S.fin);TK(60*6);r.push('пройдена='+!!E5.done[5]);if(!E5.done[5])throw new Error(r.join(' | '));CHK(r.join(' | '))
