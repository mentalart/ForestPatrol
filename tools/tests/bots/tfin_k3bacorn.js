//@@
// 3-Б, этап 4 «Полный свист» без подглядывания: бот не знает S4.real — настоящий жёлудь он находит по тому, что видно на экране
// (Совиный взор Пелагеи: у настоящего золотой ореол, у мороков — лиловый и меньше). Плюс мягкий провал: оба рассыпались — этап
// продолжается, выбитые голоса Соловья не возвращаются (docs/38, w-acorn и b3-restart); волны — по словарю сигналов (b3-signals).
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,200));_ce.apply(console,arguments);};}
ZC.FIN.k3les={auto:false};
ZC.startFrom(ZC.LV('3-B'));ZC.G.manual=true;ZC.tick(10);U.nocine();ZC.tick(5);
window.D=ZC.W.warp3b('boss4');ZC.tick(5);U.nocine();ZC.tick(30);
window.H=ZC.HERO;window.IMM=()=>Object.values(H).forEach(h=>{h.iT=Math.max(h.iT,0.5);});
window.JUMP=(pi)=>{const h=U.act(pi);for(const w of D.waves){if(w.kind!=='low'&&w.kind!=='dark')continue;const d=Math.hypot(h.pos.x-w.src.x,h.pos.z-w.src.z)-w.r;if(d>0.4&&d<1.4&&h.grounded){ZC.press(U.K[pi].j);return true;}}return false;};
window.NEAR=(pi,x,z,tol)=>U.step(pi,x,z,tol||0.6);
window.BOTH=(fn,max)=>{for(let i=0;i<(max||60)*60;i++){const r=fn(i);if(r)return 't='+(i/60).toFixed(1);ZC.tick(1);}U.rel(0);U.rel(1);return 'TIMEOUT';};
// что видит игрок: золотой яркий ореол — настоящий
window.SEEN=()=>{let best=null;for(const A of D.acorns){if(!A.g.visible)continue;const c=A.halo.material.color.getHex(),o=A.halo.material.opacity;if(c===0xffc93c&&o>0.4)best=A;   /* COL.gold */}return best;};
// волны по словарю: белая — прыжок (и рык), синяя — за Потапа, жёлтая — щит вдвоём; фиолетовой и золотой опасности нет
window.WAVECOL=()=>D.waves.map(w=>w.kind+':'+(w.Wv.mat?w.Wv.mat.uniforms.uCol.value.getHexString():'?'));
[D.F.phase,D.S4.st,D.S4.voices,_errs.length].join(' ')
//@@
// вдох — Совиный взор; Прошка стреляет только в тот жёлудь, что светится золотом; выдох — за щитом Потапа
const r=[];let shots=0,owls=0,truth=0,lie=0,cols=new Set();
r.push(BOTH(i=>{IMM();const S4=D.S4;if(D.F.phase!==4||S4.voices<=2)return true;const src=D.OAKS[3].src;WAVECOL().forEach(c=>cols.add(c));
  if(S4.st==='exhale'){if(U.act(0).kind!=='potap'&&i%10===0)ZC.press('KeyQ');ZC.hold('KeyG',U.act(0).kind==='potap');const P=H.potap;
    NEAR(0,src.x*0.5,(src.z+14)*0.5-14,0.8);if(!JUMP(1)){const dx=P.pos.x-src.x,dz=P.pos.z-src.z,d=Math.hypot(dx,dz)||1;NEAR(1,P.pos.x+dx/d*1.4,P.pos.z+dz/d*1.4,0.4);}return false;}
  if(S4.st==='inhale'){ZC.hold('KeyG',false);U.rel(0);U.rel(1);if(U.act(0).kind!=='proshka'&&i%8===0)ZC.press('KeyQ');if(U.act(1).kind==='pelageya'&&ZC.W.owlT<=0&&ZC.players[1].owlCd<=0){ZC.press('KeyL');owls++;}
    const h=U.act(0),A=SEEN();if(A){if(A.i===S4.real)truth++;else lie++;}
    if(h.kind==='proshka'&&h.skillCd<=0&&A){let best=null,bd=1e9;for(const q of D.acorns){if(!q.g.visible)continue;const d=q.pos.distanceTo(h.pos);if(d<bd){bd=d;best=q;}}if(best===A){ZC.press('KeyE');shots++;}}return false;}
  return false;},200));
ZC.hold('KeyG',false);U.rel(0);U.rel(1);
r.push('shots='+shots,'owls='+owls,'truth='+truth,'lie='+lie,'voices='+D.S4.voices,'cols='+[...cols].join(','));
if(D.S4.voices>2||lie)throw new Error('жёлудь по виду не найден: '+r.join(' | '));
for(const c of cols){const[k,hx]=c.split(':');if((k==='low'||k==='dark')&&hx!=='f6fbff'||k==='high'&&hx!=='5ab4ff')throw new Error('волна не по словарю: '+c);}
r.join(' | ')
//@@
// мягкий провал: оба рассыпались — этап тот же, голоса не вернулись, угольки целы
const v0=D.S4.voices,ph0=D.F.phase;for(const pi of[0,1]){const p=ZC.players[pi];p.petals=0;p.downed=true;p.downT=10;}ZC.tick(30);
const r=['v0='+v0,'v='+D.S4.voices,'ph='+D.F.phase,'restarts='+(D.BS.restarts||0),'downT='+ZC.players.map(p=>p.downT.toFixed(1)).join('/')];
if(D.S4.voices!==v0||D.F.phase!==ph0||!D.BS.restarts)throw new Error('провал отнял прогресс: '+r.join(' | '));
ZC.tick(60*5);r.push('up='+ZC.players.map(p=>!p.downed).join('/'),'errs='+_errs.length+' '+_errs.slice(0,2).join(' / '));
if(_errs.length)throw new Error(r.join(' | '));'3-B acorn ok '+r.join(' | ')
