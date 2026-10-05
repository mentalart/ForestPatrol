//@@
// @timeout=900
// Битва с Кощеем (сборка --k5epic), стадия 7 «Там на неведомых дорожках» (страница 4): остыло — молот не считается; меха в такт —
// жар; молот в такт — узда готова; огонь по дорожке — кто на ней, обожжён, доски прогорели; глаз Лиха — кто смотрит, заснул, кто
// отвернулся — нет; клещи вдвоём, по мосту на тот берег; пока голова поднята — удар не засчитан; опустилась — разом: узда на месте,
// стадия пройдена. Вдвоём и одним игроком.
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
window.GO7=solo=>{ZC.setSolo(!!solo);FULL();E5.goStage(7);ZC.G.manual=true;ZC.tick(20);const r=[WAITCUR(7),SILL(4)];window.A4=E5.ar[4];window.S=A4.S;S.brT=99;return r.join(' ');};
window.PH=(t,per)=>(t%(per*3))/(per*3);window.WIN=p=>p>0.88||p<0.04;
// у мехов / у наковальни — удар, когда кольцо сошлось
window.PUMP=pi=>{const B=A4.BEL;PUT(H(pi),B.x-1.3,B.z,0,Math.PI/2);for(let i=0;i<120;i++){if(WIN(PH(S.bbt,0.5))){ZC.press(KEY(pi,'a'));ZC.tick(2);return true;}ZC.tick(1);}return false;};
// вдвоём сразу: один у мехов, другой у наковальни — каждый бьёт, когда его кольцо сошлось
window.FORGE=(maxT)=>{const B=A4.BEL,N=A4.ANV,pis=PIS();let hb=0,hh=0,cb=0,ch=0;
  for(let i=0;i<(maxT||60*40)&&S.ph==='forge';i++){if(!ZC.G.solo)PUT(H(1),B.x-1.3,B.z,0,Math.PI/2);PUT(H(pis[0]),N.x-1.3,N.z,0,Math.PI/2);
    if(!ZC.G.solo&&WIN(PH(S.bbt,0.5))&&S.heat<0.85&&ZC.G.time>cb){cb=ZC.G.time+0.6;ZC.press(KEY(1,'a'));hb++;}
    if(WIN(PH(S.bt,0.8))&&S.heat>=0.5&&ZC.G.time>ch){ch=ZC.G.time+1.2;ZC.press(KEY(pis[0],'a'));hh++;}FULL();ZC.tick(1);}
  return 'меха x'+hb+' молот x'+hh+' в такт='+S.good+' ph='+S.ph;};
window.HAM=pi=>{const N=A4.ANV;PUT(H(pi),N.x-1.3,N.z,0,Math.PI/2);for(let i=0;i<200;i++){if(WIN(PH(S.bt,0.8))){const g=S.good;ZC.press(KEY(pi,'a'));ZC.tick(2);return S.good>g;}ZC.tick(1);}return false;};
// перенос по мосту: дорожка без огня, при глазе Лиха — лицом от него
window.CROSS=()=>{const X=A4.X,XS=[[0.2,2.2],[-2.1,2.1],[-2.2,-0.2]],pis=PIS();let xs=ZC.G.solo?[-1.1]:[-1.1,1.1];const z0=Math.min(...pis.map(pi=>H(pi).pos.z));
  for(let z=z0,i=0;z>-15.2&&i<60*60;i++){if(S.fire&&!S.fire.hit)xs=ZC.G.solo?[[X+1,X+2,X-1][S.fire.li]-X]:XS[S.fire.li];const wait=S.eye>0.2||(S.fire&&S.fire.t<1.6);const f=S.eye>0.2?0:Math.PI;
    pis.forEach((pi,j)=>PUT(H(pi),X+xs[j],z,0,f));FULL();ZC.tick(1);if(!wait)z-=0.2;if(!S.carry)return 'уронили@'+z.toFixed(1);}return 'дошли ph='+S.ph;};
// у Горыныча: ждать вне круга дыхания (лицом от Лиха, когда глаз открыт); опустилась — удар (вдвоём — в один кадр); укусы отключены
window.WAITSPOT=()=>{const X=A4.X,f=S.eye>0.2?0:Math.PI;S.biteT=99;PIS().forEach((pi,j)=>PUT(H(pi),X+(PIS().length>1?(j?1.1:-1.1):0),-12.3,0,f));FULL();};
window.CROWN=()=>{let n=0;for(let i=0;i<60*20&&S.ph==='crown';i++){WAITSPOT();if(S.hd==='low'&&S.eye<0.2&&i%20===0){PIS().forEach(pi=>ZC.press(KEY(pi,'a')));n++;}ZC.tick(1);}return 'ударов='+n+' ph='+S.ph;};
'ok'
//@@
// вдвоём: остыло — молот не считается; меха в такт — жар; молот в такт — узда
const r=[GO7(false)];for(let i=0;i<60*12&&S.heat>=0.4;i++)ZC.tick(1);r.push('жар='+S.heat.toFixed(2));HAM(0);r.push('остыло: молот='+S.good);if(S.good)throw new Error('молот засчитан без жара: '+r.join(' | '));
let p=0;while(S.heat<0.7&&p<6){PUMP(1);p++;}r.push('меха x'+p+' жар='+S.heat.toFixed(2));if(S.heat<0.45)throw new Error('меха не дают жара: '+r.join(' | '));
r.push(FORGE());if(S.ph!=='carry')throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// огонь по дорожке — обожжён, доски прогорели; глаз Лиха — смотрящий заснул, отвернувшийся — нет
const r=[];const X=A4.X;S.fireT=99;S.blobT=99;PUT(H(0),X,0,0);PUT(H(1),X+2,4,0);const pt0=ZC.players[0].petals;A4.bot.fire(1);for(let i=0;i<120;i++){PUT(H(1),X+2,4,0);ZC.tick(1);}
const burnt=A4.bot.planks().filter(P=>P.li===1&&!P.c.on).length;r.push('лепестки '+pt0+'→'+ZC.players[0].petals+' прогорело досок='+burnt);if(ZC.players[0].petals>=pt0||!burnt)throw new Error(r.join(' | '));FULL();
for(let i=0;i<60*5&&S.eye>0;i++)TK(1);S.eyeT=0.01;const L=A4.LIKHO;for(let i=0;i<60*3&&!S.gaze;i++){PUT(H(0),X-1,-2,0,Math.atan2(L.x-(X-1),L.z+2));PUT(H(1),X+1,-2,0,0);ZC.tick(1);}ZC.tick(2);
r.push('спит0='+S.sleep.has(H(0))+' спит1='+S.sleep.has(H(1)));if(!S.sleep.has(H(0))||S.sleep.has(H(1)))throw new Error('взгляд Лиха: '+r.join(' | '));TK(200);CHK(r.join(' | '))
//@@ shot=k5e_p4_bridge.png
ZC.tick(1);
//@@
// клещи вдвоём, по мосту на тот берег; поднята голова — удар не засчитан; опустилась — разом
const r=[];const bp=A4.bot.bridle().clone();PUT(H(0),bp.x-1.1,bp.z);PUT(H(1),bp.x+1.1,bp.z);for(const pi of[0,1]){const f=ZC.W.itemSign(pi);if(f)f(pi);ZC.tick(2);}r.push('несут='+!!S.carry);if(!S.carry)throw new Error(r.join(' | '));
let res='';for(let k=0;k<4&&S.ph!=='crown';k++){if(!S.carry){const b=A4.bot.bridle().clone();PUT(H(0),b.x-1.1,b.z);PUT(H(1),b.x+1.1,b.z);for(const pi of[0,1]){const f=ZC.W.itemSign(pi);if(f)f(pi);ZC.tick(2);}}res=CROSS();r.push(res);}
if(S.ph!=='crown')throw new Error('не дошли: '+r.join(' | '));for(let i=0;i<60*8&&S.hd==='low';i++){WAITSPOT();ZC.tick(1);}ZC.press(KEY(0,'a'));ZC.press(KEY(1,'a'));ZC.tick(3);r.push('поднята: ph='+S.ph);if(S.ph==='done')throw new Error('засчитан удар при поднятой голове');
r.push(CROWN());
r.push('ph='+S.ph);TK(60*4);r.push('пройдена='+!!E5.done[7]);if(!E5.done[7])throw new Error(r.join(' | ')+' лог='+E5.logs.slice(-5));CHK(r.join(' | '))
//@@
// одним игроком: меха качает Демьян; молот в такт; второй конец узды — Демьян; через мост; опустилась — удар
const r=[GO7(true)];r.push(FORGE());if(S.ph!=='carry')throw new Error(r.join(' | '));
const pi=PIS()[0];const bp=A4.bot.bridle().clone();PUT(H(pi),bp.x-1.1,bp.z);const f=ZC.W.itemSign(pi);if(f)f(pi);ZC.tick(2);r.push('несёт='+!!S.carry);
for(let k=0;k<4&&S.ph!=='crown';k++){if(!S.carry){const b=A4.bot.bridle().clone();PUT(H(pi),b.x-1.1,b.z);const f=ZC.W.itemSign(pi);if(f)f(pi);ZC.tick(2);}r.push(CROSS());}
r.push(CROWN());
TK(60*4);r.push('пройдена='+!!E5.done[7]);if(!E5.done[7])throw new Error(r.join(' | ')+' лог='+E5.logs.slice(-5));CHK(r.join(' | '))
