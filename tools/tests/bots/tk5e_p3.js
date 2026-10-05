//@@
// @timeout=900
// Битва с Кощеем (сборка --k5epic), стадия 6 «В темнице там царевна тужит» (страница 3): мостики света твёрдые только при свете
// (без света — упал с облака, вернулся на юг); свет у птиц; фонарь высветил — свист: за облачным камнем устоял, на открытом —
// отбросило; замки разом — ночь; тень крадёт свет, удар в свете — тень лопнула; вторые замки на крутящейся клетке — Жар-птица
// свободна, рассвет; ветер сносит (за камнем — нет); кольцо на клюве разом дважды — стадия пройдена. Вдвоём и одним игроком.
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
window.GO6=solo=>{ZC.setSolo(!!solo);FULL();E5.goStage(6);ZC.G.manual=true;ZC.tick(20);const r=[WAITCUR(6),SILL(3)];window.A3=E5.ar[3];window.S=A3.S;S.whT=99;return r.join(' ');};
window.WAITPH=(ph,max)=>{let i=0;for(;i<(max||60*30)&&S.ph!==ph;i++)TK(1);return S.ph===ph;};
window.LIGHTS=()=>{PIS().forEach((pi,j)=>{const B=A3.BIRD[j];PUT(H(pi),B.x+(j?-0.8:0.8),B.z);});TK(6);return PIS().map(pi=>H(pi).k5lt).join(',');};
// удар по замку: встать у замка лицом к нему; вдвоём — в один кадр
window.LOCKS=()=>{const C=A3.CAGE;const pis=PIS();const go=(pi,i)=>{const p=A3.bot.lockPos(i),dx=p.x-C.x,dz=p.z-C.z,d=Math.hypot(dx,dz)||1;PUT(H(pi),p.x+dx/d*0.9,p.z+dz/d*0.9,0,Math.atan2(-dx,-dz));};
  if(ZC.G.solo){for(const i of[0,1]){go(pis[0],i);ZC.tick(1);ZC.press(KEY(pis[0],'a'));ZC.tick(25);}}else{go(0,H(0).k5lt);go(1,H(1).k5lt);ZC.tick(1);ZC.press(KEY(0,'a'));ZC.press(KEY(1,'a'));ZC.tick(25);}return S.ph;};
'ok'
//@@
// вдвоём: без света мостик не держит; свет у птиц — держит
const r=[GO6(false)];const T=A3.bot.tiles(),t0=T[0];r.push('мостик без света твёрд='+t0.solid);if(t0.solid)throw new Error(r.join(' | '));
PUT(H(0),t0.x,t0.z,0.2);TK(60);r.push('без света: y='+H(0).pos.y.toFixed(1)+' (лог '+E5.logs.slice(-1)+')');
r.push('свет='+LIGHTS());PUT(H(0),t0.x,t0.z,0.2);TK(20);r.push('со светом: твёрд='+t0.solid+' y='+H(0).pos.y.toFixed(2));if(!t0.solid||H(0).pos.y<-0.5)throw new Error('мостик со светом не держит: '+r.join(' | '));CHK(r.join(' | '))
//@@
// свист: за облачным камнем — устоял; на открытом — отбросило (скорость отброса)
const r=[];const St=A3.STONES[2],So=A3.SOL;const ds=Math.hypot(St.x-So.x,St.z-So.z),ux=(St.x-So.x)/ds,uz=(St.z-So.z)/ds;PUT(H(0),St.x+ux*1.8,St.z+uz*1.8);PUT(H(1),So.x+3.5,So.z-0.6);ZC.tick(2);
r.push('укрыт='+A3.bot.sheltered(H(0))+' открыт='+A3.bot.sheltered(H(1)));const p1=H(1).pos.clone();A3.bot.whistle('blue');let seen='';let vmax=0,wv=0;for(let i=0;i<150;i++){if(!seen&&S.wh&&!S.wh.blown)seen=VIS().filter(v=>/свист|щит/.test(v)).join('/');PUT(H(0),St.x+ux*1.8,St.z+uz*1.8);wv=Math.max(wv,S.waves.length);ZC.tick(1);vmax=Math.max(vmax,Math.hypot(H(1).vel.x,H(1).vel.z));}r.push('волн='+wv+' открытого отбросило со скоростью '+vmax.toFixed(1));
r.push('подсказка='+seen);if(!A3.bot.sheltered(H(0))||vmax<5)throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// замки разом — ночь
const r=['свет='+LIGHTS(),'ph='+LOCKS()];if(!WAITPH('night',60*6))throw new Error('ночь не пришла: '+r.join(' | ')+' лог='+E5.logs.slice(-4));r.push('ночь');CHK(r.join(' | '))
//@@ shot=k5e_p3_night.png
ZC.tick(1);
//@@
// тень крадёт свет; удар в свете — лопнула; вторые замки на крутящейся клетке — Жар-птица свободна, ветер
const r=[];S.shT=99;LIGHTS();const s=A3.bot.shadow();const C=A3.CAGE;PUT(H(0),C.x-4,C.z+6);PUT(H(1),C.x+4,C.z+6);s.g.position.set(C.x-4,0,C.z+1);
for(let i=0;i<240&&!E5.logs.includes('steal');i++){PUT(H(0),C.x-4,C.z+6);ZC.tick(1);}r.push('украла='+E5.logs.includes('steal')+' свет0='+H(0).k5lt);if(!E5.logs.includes('steal'))throw new Error(r.join(' | '));
PUT(H(1),s.g.position.x+1,s.g.position.z,0,-Math.PI/2);ZC.tick(2);ZC.press(KEY(1,'a'));ZC.tick(10);r.push('лопнула='+E5.logs.includes('shadowPop'));if(!E5.logs.includes('shadowPop'))throw new Error(r.join(' | '));
for(let k=0;k<5&&S.ph==='night';k++){S.whT=99;LIGHTS();r.push('ph='+LOCKS());}if(!WAITPH('wind',60*8))throw new Error('нет ветра: '+r.join(' | ')+' лог='+E5.logs.slice(-4));r.push('ветер');CHK(r.join(' | '))
//@@ shot=k5e_p3_wind.png
ZC.tick(1);
//@@
// ветер сносит открытого, за камнем — нет; кольцо на клюве разом дважды — пройдена
const r=[];const So=A3.SOL,St=A3.STONES[3];const ds=Math.hypot(St.x-So.x,St.z-So.z),ux=(St.x-So.x)/ds,uz=(St.z-So.z)/ds;PUT(H(0),St.x+ux*1.8,St.z+uz*1.8);PUT(H(1),So.x-3,So.z+6);
const a0=H(0).pos.clone(),b0=H(1).pos.clone();S.gustT=99;S.boltT=99;for(let i=0;i<60;i++)ZC.tick(1);r.push('за камнем сдвиг='+Math.hypot(H(0).pos.x-a0.x,H(0).pos.z-a0.z).toFixed(1)+' открытый='+Math.hypot(H(1).pos.x-b0.x,H(1).pos.z-b0.z).toFixed(1));
const put=()=>{PUT(H(0),So.x-0.9,So.z+1.8,0,Math.PI);PUT(H(1),So.x+0.9,So.z+1.8,0,Math.PI);};
for(let k=0;k<4&&S.ph==='wind';k++){put();ZC.tick(1);ZC.press(KEY(0,'a'));ZC.press(KEY(1,'a'));TK(80);r.push('кольцо='+S.ring);}TK(60*5);r.push('пройдена='+!!E5.done[6]);if(!E5.done[6])throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@
// одним игроком: свет, замки подряд, ночь, вторые замки, ветер, кольцо — одним ударом дважды
const r=[GO6(true)];const pi=PIS()[0];const B=A3.BIRD[0];PUT(H(pi),B.x+0.8,B.z);TK(6);r.push('свет='+H(pi).k5lt);r.push('ph='+LOCKS());if(!WAITPH('night',60*6))throw new Error('соло: нет ночи: '+r.join(' | '));
S.shT=99;for(let k=0;k<5&&S.ph==='night';k++){S.whT=99;PUT(H(pi),B.x+0.8,B.z);TK(6);r.push('ph='+LOCKS());}if(!WAITPH('wind',60*8))throw new Error('соло: нет ветра: '+r.join(' | '));const So=A3.SOL;
for(let k=0;k<4&&S.ph==='wind';k++){PUT(H(pi),So.x,So.z+1.8,0,Math.PI);ZC.tick(1);ZC.press(KEY(pi,'a'));TK(90);}r.push('кольцо='+S.ring);TK(60*5);r.push('пройдена='+!!E5.done[6]);if(!E5.done[6])throw new Error(r.join(' | '));CHK(r.join(' | '))
