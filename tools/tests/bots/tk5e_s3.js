//@@
// @timeout=900
// Битва с Кощеем (сборка --k5epic), стадия 3 «Там лес и дол видений полны»: туман и видения на месте; отбитая щитом капля возвращается
// в бросившего (морок лопнул или Кощей сбит); веретено Кикиморы бьётся, когда замерло золотом; свободная Кикимора — кудель между
// героями: Кощей между ними — предмет, рогатка сбивает его с пня; окно — удары; с половины спеси мороки сходят с пней; спесь сбита —
// оба удар рядом: стадия пройдена. Вдвоём и одним игроком.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,300));_ce.apply(console,arguments);};}
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.E5=ZC.FIN.k5e;window.K5=ZC.FIN.k5;window.ES=E5.es;window.S3=E5.s3;
window.CHK=s=>{if(_errs.length)throw new Error(s+' — ошибки: '+_errs.slice(0,4).join(' / '));return s;};
window.KB=[{a:'KeyF',g:'KeyG',i:'KeyR'},{a:'Comma',g:'Period',i:'Semicolon'}];
window.H=pi=>ZC.players[pi].heroes[ZC.players[pi].act];
window.PUT=(h,x,z,face)=>{h.pos.set(x,0.05,z);h.vel.set(0,0,0);if(face!=null)h.face=face;};
window.PIS=()=>ZC.G.solo?[ZC.G.soloPi]:[0,1];window.KEY=(pi,k)=>KB[ZC.G.solo?0:pi][k];
// отбивать капли, которые летят в героев (щит, когда до удара ~0,2 с)
window.PARRY=()=>{for(const b of ZC.W.bolts){if(b.refl||b._bot||b.eta>0.22)continue;const pi=b.tgt&&b.tgt.player;if(pi==null)continue;b._bot=true;ZC.press(KEY(pi,'g'));}};
window.TK=n=>{for(let i=0;i<n;i++){if(ZC.G.cine&&i%3===0)ZC.skip();if(ZC.G.ui&&i%10===0)ZC.press('Space');PARRY();ZC.tick(1);}};
window.GO3=solo=>{ZC.setSolo(!!solo);for(const pi of[0,1])ZC.players[pi].petals=3;E5.goStage(3);ZC.G.manual=true;ZC.tick(20);window.ES=E5.es;window.S3=E5.s3;let i=0;for(;i<60*90&&!(E5.cur===3&&ES.fight&&!ZC.G.cine&&!ZC.G.ui);i++)TK(1);
  window.ES=E5.es;return 'fight='+ES.fight+' через '+(i/60).toFixed(0)+' с';};
// окно: подойти к сбитому и бить, пока окно открыто (или спесь не сбита)
window.BEAT=()=>{let n=0;for(let t=0;t<60*8&&ES.down&&ES.spes>0;t++){const K=ZC.W.dbg5e().KS.g.position;PIS().forEach((pi,j)=>{PUT(H(pi),K.x+(j?1.2:-1.2),K.z+1.2,Math.atan2(-(j?1.2:-1.2),-1.2));if(t%9===j*4){ZC.press(KEY(pi,'a'));n++;}});TK(1);}return n;};
// рогатка куделью: поставить героев так, чтобы настоящий был между ними, и выстрелить
// идущие мороки: подойти и ударить (иначе рогатка попадёт в них)
window.CLEAR=()=>{let n=0;if(!ES.walk||!ES.wk)return 0;for(let i=0;i<4;i++){if(i===ES.real||ES.gone[i])continue;for(let t=0;t<60*3&&!ES.gone[i]&&!ES.down;t++){const p=S3.body(i),pi=PIS()[0];PUT(H(pi),p.x+1.2,p.z+0.2,Math.atan2(-1.2,-0.2));if(t%10===0){ZC.press(KEY(pi,'a'));n++;}TK(1);}}return n;};
window.SLING=()=>{CLEAR();const S=S3.body(ES.real),pis=PIS();   // целимся в самого Кощея (он стоит на пне не по центру)
  const C={x:0,z:-11};const dx=S.x-C.x,dz=S.z-C.z,d=Math.hypot(dx,dz)||1,ux=dx/d,uz=dz/d;
  if(ZC.G.solo){const cx=C.x-S.x,cz=C.z-S.z,cl=Math.hypot(cx,cz)||1;for(let t=0;t<150;t++){PUT(H(pis[0]),S.x+cx/cl*4.6,S.z+cz/cl*4.6);ZC.tick(1);}}   // одному: встать у пня ближе к середине — Кикимора забежит за пень
  else{PUT(H(0),S.x-ux*4.4,S.z-uz*4.4);PUT(H(1),S.x+ux*4.4,S.z+uz*4.4);}
  for(let i=0;i<10;i++){ZC.tick(1);}const t0=ES.taut;ZC.press(KEY(pis[0],'i'));for(let i=0;i<70&&!ES.down;i++)TK(1);return 'натянута='+t0+' сбит='+ES.down+' '+(E5.logs||[]).filter(x=>/^sling/.test(x)).slice(-1);};
'ok'
//@@
// вдвоём: окружение, капли обратно
const r=[GO3(false)];const D=ZC.FIN.k5x;r.push('частицы='+(D.mo&&D.mo.kind),'эффектов='+D.owned.length);
let t=0;const p0=ES.popN||0;for(;t<60*25&&!((ES.popN||0)>p0||ES.down);t++)TK(1);r.push('капля вернулась через '+(t/60).toFixed(1)+' с: лопнул='+((ES.popN||0)>p0)+' сбит='+ES.down);
if(!((ES.popN||0)>p0||ES.down))throw new Error(r.join(' | '));for(let i=0;i<60*8&&ES.down;i++)TK(1);CHK(r.join(' | '))
//@@ shot=k5e_s3_fog.png
ZC.tick(1);
//@@
// веретено: ждать золото — бить; Кикимора свободна, кудель
const r=[];const sp=S3.spin;for(let k=0;k<6&&!E5.free.kiki;k++){for(let t=0;t<60*8&&ES.spinSt!=='rest';t++)TK(1);const h=H(0);PUT(h,sp.x+1.1,sp.z+0.4,Math.atan2(-1.1,-0.4));ZC.tick(2);ZC.press(KEY(0,'a'));TK(20);if(!E5.free.kiki){PUT(H(1),sp.x-1.1,sp.z+0.4,Math.atan2(1.1,-0.4));ZC.press(KEY(1,'a'));TK(30);}}
r.push('Кикимора свободна='+!!E5.free.kiki);if(!E5.free.kiki)throw new Error(r.join(' | '));TK(60);CHK(r.join(' | '))
//@@
// кудель-рогатка: настоящий между героями — сбит; окно — удары; до конца спеси (мороки сходят с пней на половине)
const r=[];let walk=false;for(let k=0;k<10&&ES.spes>0;k++){for(let t=0;t<60*6&&ES.down;t++)TK(1);r.push(SLING());r.push('ударов '+BEAT()+' спесь '+ES.spes);if(ES.walk)walk=true;TK(30);}
r.push('мороки сходили='+walk);if(ES.spes>0||!walk)throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@ shot=k5e_s3_walk.png
ZC.tick(1);
//@@
// спесь сбита — оба удар рядом: стадия пройдена
const K=ZC.W.dbg5e().KS.g.position;PUT(H(0),K.x-1.2,K.z+1.2,Math.atan2(1.2,-1.2));PUT(H(1),K.x+1.2,K.z+1.2,Math.atan2(-1.2,-1.2));ZC.tick(2);ZC.press('KeyF');ZC.press('Comma');TK(90);
if(!E5.done[3])throw new Error('стадия 3 не пройдена: spes='+ES.spes+' down='+ES.down);CHK('стадия 3 пройдена')
//@@
// одним игроком: веретено, кудель от Кикиморы, рогатка, окна, нить
const r=[GO3(true)];const sp=S3.spin,pi=ZC.G.soloPi;for(let k=0;k<8&&!E5.free.kiki;k++){for(let t=0;t<60*8&&ES.spinSt!=='rest';t++)TK(1);PUT(H(pi),sp.x+1.1,sp.z+0.4,Math.atan2(-1.1,-0.4));ZC.tick(2);ZC.press('KeyF');TK(30);}
r.push('Кикимора='+!!E5.free.kiki);for(let k=0;k<10&&ES.spes>0;k++){for(let t=0;t<60*6&&ES.down;t++)TK(1);r.push(SLING());r.push('уд '+BEAT()+' сп '+ES.spes);TK(30);}
const K=ZC.W.dbg5e().KS.g.position;PUT(H(pi),K.x-1.2,K.z+1.2,Math.atan2(1.2,-1.2));ZC.tick(2);ZC.press('KeyF');TK(90);r.push('пройдена='+!!E5.done[3]);if(!E5.done[3])throw new Error(r.join(' | '));CHK(r.join(' | '))
