//@@
// @timeout=900
// Битва с Кощеем (сборка --k5epic), стадия 9 «И тридцать витязей прекрасных»: витязи выходят из моря в строй по флангам; кость-рубака
// идёт к знамени и рубит древко (красный круг), удары — рассыпалась; знамя упало — рог не ведёт строй; предмет у знамени — поднято;
// рог, оба у знамён — Богатырский мах (рубаки сметены, волна Водяного). Одним игроком — у одного знамени.
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
window.LOG=()=>E5.logs||[];
window.GO9=solo=>{ZC.setSolo(!!solo);FULL();E5.goStage(9);ZC.G.manual=true;ZC.tick(20);E5.free=E5.free||{};E5.free.vod=true;window.ES=E5.es;
  let i=0;for(;i<60*90&&!(E5.cur===9&&K5.fight&&!ZC.G.cine&&!ZC.G.ui);i++)TK(1);window.ES=E5.es;window.L9=E5.layer[9].bot;ES.hornT=99;ES.rubT=99;return 'cur='+E5.cur+' fight='+K5.fight;};
'ok'
//@@
// вдвоём: витязи вышли из моря в строй
const r=[GO9(false)];TK(240);const kn=L9.kn();const at=kn.filter(n=>n.home&&n.g.position.distanceTo(n.home)<0.6).length;r.push('витязей в строю='+at+' / '+kn.length);if(at<kn.length-1)throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@ shot=k5e_s9_ranks.png
ZC.tick(1);
//@@
// кость-рубака рубит древко; удары — рассыпалась; знамя упало — рог не ведёт; поднять — предмет
const r=[];const B=L9.banners()[0];const R=L9.rub(0);let seen='';for(let i=0;i<60*8&&B.hp===3;i++){PUT(H(0),B.g.position.x+3,B.g.position.z+2);PUT(H(1),B.g.position.x+3.5,B.g.position.z+3);if(!seen)seen=VIS().filter(v=>/руби/.test(v)).join('');TK(1);}
r.push('древко hp='+B.hp+' подсказка='+seen);if(B.hp!==2)throw new Error('рубака не рубит: '+r.join(' | '));
for(let k=0;k<6&&L9.rubs().includes(R);k++){const p=R.g.position;PUT(H(0),p.x+1,p.z,0,-Math.PI/2);ZC.tick(1);ZC.press(KEY(0,'a'));TK(28);}r.push('рассыпалась='+!L9.rubs().includes(R));if(L9.rubs().includes(R))throw new Error(r.join(' | '));
L9.fall(1);const B1=L9.banners()[1];PUT(H(0),L9.banners()[0].g.position.x,L9.banners()[0].g.position.z);PUT(H(1),B1.g.position.x,B1.g.position.z);ES.hornT=0.01;TK(10);r.push('с лежащим знаменем — мах='+LOG().includes('vitCharge'));if(LOG().includes('vitCharge'))throw new Error(r.join(' | '));
const f=ZC.W.itemSign(1);if(f)f(1);TK(50);r.push('поднято='+!B1.down);if(B1.down)throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// рог: оба у знамён — Богатырский мах, рубаки сметены, вал Водяного
const r=[];ES.hornT=99;L9.rub(0);L9.rub(1);TK(30);const n0=L9.rubs().length;const Bs=L9.banners();PUT(H(0),Bs[0].g.position.x,Bs[0].g.position.z);PUT(H(1),Bs[1].g.position.x,Bs[1].g.position.z);ES.hornT=0.01;
for(let i=0;i<150;i++){PUT(H(0),Bs[0].g.position.x,Bs[0].g.position.z);PUT(H(1),Bs[1].g.position.x,Bs[1].g.position.z);TK(1);}
r.push('мах='+LOG().includes('vitCharge')+' рубак '+n0+'→'+L9.rubs().length+' вал='+LOG().includes('vodWave'));if(!LOG().includes('vitCharge')||L9.rubs().length)throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// одним игроком: у одного знамени — мах
const r=[GO9(true)];const c0=LOG().filter(x=>x==='vitCharge').length;const pi=PIS()[0],B=L9.banners()[0];ES.hornT=0.01;for(let i=0;i<120;i++){PUT(H(pi),B.g.position.x,B.g.position.z);TK(1);}const c1=LOG().filter(x=>x==='vitCharge').length;r.push('мах='+(c1>c0));if(c1<=c0)throw new Error(r.join(' | '));CHK(r.join(' | '))
