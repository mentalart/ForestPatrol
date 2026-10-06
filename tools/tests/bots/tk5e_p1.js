//@@
// @timeout=900
// Битва с Кощеем (сборка --k5epic), стадия 4 «Избушка там на курьих ножках» (страница 1): ночная поляна (туман, светлячки, дубы).
// Избушка бегает — клубок у ноги не цепляется; герои у старого дуба, разбег по красной дорожке, в последний миг — вбок: избушка
// врезалась в дуб и застряла (над ногами — «клубок на ногу!»); нити от обоих на каждую ногу — села; волки-сторожа бьются;
// двое на золотых кругах разом — повернулась, выросло крыльцо; ступени и галерея держат героя; с галереи удары по Кощею на крыше —
// Яга на свободе, стадия пройдена. Вдвоём и одним игроком.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,300));_ce.apply(console,arguments);};}
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.E5=ZC.FIN.k5e;window.K5=ZC.FIN.k5;
window.CHK=s=>{if(_errs.length)throw new Error(s+' — ошибки: '+_errs.slice(0,4).join(' / '));return s;};
window.KB=[{a:'KeyF',g:'KeyG',i:'KeyR'},{a:'Comma',g:'Period',i:'Semicolon'}];
window.H=pi=>ZC.players[pi].heroes[ZC.players[pi].act];
window.PIS=()=>ZC.G.solo?[ZC.G.soloPi]:[0,1];window.KEY=(pi,k)=>KB[ZC.G.solo?0:pi][k];
window.PUT=(h,x,z,y,face)=>{h.pos.set(x,(y||0)+0.05,z);h.vel.set(0,0,0);if(face!=null)h.face=face;};
window.FULL=()=>{for(const pi of[0,1])ZC.players[pi].petals=3;};
window.PARRY=()=>{for(const b of ZC.W.bolts){if(b.refl||b._bot||b.eta>0.22)continue;const pi=b.tgt&&b.tgt.player;if(pi==null)continue;b._bot=true;ZC.press(KEY(pi,'g'));}};
window.TK=n=>{for(let i=0;i<n;i++){if(ZC.G.cine&&i%3===0)ZC.skip();if(ZC.G.ui==='skaz'&&i%20===0)ZC.press('Space');PARRY();FULL();ZC.tick(1);}};
window.VIS=()=>ZC.W.prompts.filter(p=>{try{return p.cond();}catch(e){return false;}}).map(p=>{const n=typeof p.note==='function'?p.note():p.note;return n||p.action;});
window.FIGHT=()=>E5.es.step==='walk'||E5.es.fight;
window.WAITCUR=(n,max)=>{for(let i=0;i<(max||60*150);i++){if(E5.cur===n&&!ZC.G.cine&&ZC.G.ui!=='skaz'&&FIGHT())return 'cur'+n+'@'+(i/60).toFixed(0)+'s';TK(1);}
  throw new Error('WAITCUR '+n+': cur='+E5.cur+' ui='+ZC.G.ui+' es='+JSON.stringify({f:E5.es.fight,st:E5.es.step})+' log='+(E5.logs||[]).slice(-6).join(','));};
window.SILL=w=>{const P=E5.pages[w];for(let i=0;i<300&&E5.es.step!=='fight';i++){PIS().forEach((pi,j)=>PUT(H(pi),P.pos.x-0.5+j,P.pos.z));TK(1);}for(let i=0;i<60*40&&!(E5.es.fight&&!ZC.G.cine&&!ZC.G.ui);i++)TK(1);return 'page'+w+' fight='+E5.es.fight;};
window.GO4=solo=>{ZC.setSolo(!!solo);FULL();E5.goStage(4);ZC.G.manual=true;ZC.tick(20);const r=[WAITCUR(4),SILL(1)];window.A1=E5.ar[1];window.S=A1.S;return r.join(' ');};
// навести избушку на дуб: герои стоят перед дубом на линии «дуб → избушка»; пошёл разбег — шаг вбок
window.BAIT=()=>{const O=A1.OAKS[0];let side=0,hits=0;const p0=PIS().map(pi=>ZC.players[pi].petals);
  for(let t=0;t<60*40&&S.st!=='stuck';t++){const P=A1.hut.g.position;
    if(S.st==='walk'){side=0;const dx=P.x-O.x,dz=P.z-O.z,d=Math.hypot(dx,dz)||1,ux=dx/d,uz=dz/d;PIS().forEach((pi,j)=>{const s=j?0.6:-0.6;PUT(H(pi),O.x+ux*2.7-uz*s,O.z+uz*2.7+ux*s);});}
    if(S.st==='dash'&&!side){side=1;const nx=-S.dir.z,nz=S.dir.x;PIS().forEach((pi,j)=>{const h=H(pi);PUT(h,h.pos.x+nx*(j?-3.4:3.4),h.pos.z+nz*(j?-3.4:3.4));});}
    for(let i=0;i<1;i++){if(ZC.G.cine)ZC.skip();PARRY();ZC.tick(1);}}
  return 'st='+S.st+' застряла='+S.stuckN+' лог='+E5.logs.slice(-3).join(',');};
window.TIE=()=>{for(let li=0;li<2;li++)for(let k=0;k<(ZC.G.solo?2:1);k++)for(const pi of PIS()){const lp=A1.legW(li),ot=A1.legW(1-li),dx=lp.x-ot.x,dz=lp.z-ot.z,dl=Math.hypot(dx,dz)||1;
  PUT(H(pi),lp.x+dx/dl*0.9-dz/dl*(pi?0.5:-0.5),lp.z+dz/dl*0.9+dx/dl*(pi?0.5:-0.5));const f=ZC.W.itemSign(pi);if(f)f(pi);ZC.tick(2);}return 'tied='+S.tied.join(',')+' st='+S.st;};
'ok'
//@@
// вдвоём: бегает — клубок у ноги не цепляется; разбег в дуб — застряла
const r=[GO4(false)];window.ES=E5.es;r.push('тема='+(ZC.W.dbg5e?'ok':'?'));
{const lp=A1.legW(0);PUT(H(0),lp.x+0.9,lp.z);const f=ZC.W.itemSign(0);if(f)f(0);ZC.tick(2);r.push('нитей на бегу='+S.ties[0].length);if(S.ties[0].length)throw new Error('нить прицепилась к бегущей избушке: '+r.join(' | '));}
r.push(BAIT());if(S.st!=='stuck')throw new Error('избушка не застряла в дубе: '+r.join(' | '));
r.push('подсказки: '+VIS().join(' / '));if(!VIS().some(v=>/клубок на ногу/.test(v)))throw new Error('нет подсказки «клубок на ногу»: '+r.join(' | '));CHK(r.join(' | '))
//@@ shot=k5e_p1_stuck.png
ZC.tick(1);
//@@
// нити от обоих на каждую ногу — села; волки-сторожа; разом на кругах — повернулась, крыльцо
const r=[TIE()];if(S.st!=='sit')throw new Error('избушка не села: '+r.join(' | '));
TK(100);r.push('волков='+S.wolves.length);if(S.wolves.length<1)throw new Error('нет волков-сторожей: '+r.join(' | '));
{const w=S.wolves[0],n0=S.wolves.length;for(let k=0;k<3&&S.wolves.includes(w);k++){const p=w.m.g.position;PUT(H(0),p.x+1,p.z);ZC.W.onAttack(0,H(0));ZC.tick(2);}r.push('волк побит='+(S.wolves.length<n0));}
const cs=A1.targets(0);PUT(H(0),cs[0].position.x,cs[0].position.z);PUT(H(1),cs[1].position.x,cs[1].position.z);ZC.W.onAttack(0,H(0));ZC.W.onAttack(1,H(1));TK(150);
r.push('фаза='+S.phase+' st='+S.st);if(S.phase!==3)throw new Error('не повернулась: '+r.join(' | '));PUT(H(0),A1.STEPS[1][0],A1.STEPS[1][2],A1.STEPS[1][1]);PUT(H(1),A1.BALC[0],A1.BALC[2],A1.BALC[1]);TK(10);CHK(r.join(' | '))
//@@ shot=k5e_p1_roof.png
ZC.tick(1);
//@@
// ступени и галерея держат героя; с галереи — удары по Кощею на крыше (капли — щитом); Яга свободна
const r=[];const B=A1.BALC;for(const [x,y,z] of A1.STEPS.concat([B])){PUT(H(0),x,z,y);TK(20);r.push(H(0).pos.y.toFixed(1));if(H(0).pos.y<y-0.5)throw new Error('ступень не держит: '+r.join(','));}
const K=ZC.W.dbg5e().KS.g.position;let n=0;for(let t=0;t<60*20&&!S.done;t++){PIS().forEach((pi,j)=>{const h=H(pi);if(h.pos.y<B[1]-0.5||t%60===0)PUT(h,B[0]+(j?0.5:-0.5),B[2],B[1],Math.atan2(K.x-B[0],K.z-B[2]));});if(t%20===0){ZC.press(KEY(PIS()[t%40?0:PIS().length-1],'a'));n++;}TK(1);}
r.push('ударов='+n+' done='+S.done);TK(240);r.push('пройдена='+!!E5.done[4]);if(!E5.done[4])throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// одним игроком: застряла в дубе, клубок дважды на ногу, круг одним ударом, крыша
const r=[GO4(true)];r.push(BAIT());if(S.st!=='stuck')throw new Error('соло: не застряла: '+r.join(' | '));r.push(TIE());if(S.st!=='sit')throw new Error('соло: не села: '+r.join(' | '));
TK(20);const cs=A1.targets(0);PUT(H(PIS()[0]),cs[0].position.x,cs[0].position.z);ZC.W.onAttack(0,H(PIS()[0]));TK(150);r.push('фаза='+S.phase);
const B=A1.BALC,K=ZC.W.dbg5e().KS.g.position;for(let t=0;t<60*20&&!S.done;t++){const h=H(PIS()[0]);if(h.pos.y<B[1]-0.5||t%60===0)PUT(h,B[0],B[2],B[1],Math.atan2(K.x-B[0],K.z-B[2]));if(t%20===0)ZC.press(KEY(PIS()[0],'a'));TK(1);}
TK(240);r.push('пройдена='+!!E5.done[4]);if(!E5.done[4])throw new Error(r.join(' | '));CHK(r.join(' | '))
