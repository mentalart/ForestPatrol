//@@
// @timeout=600
// Битва с Кощеем (сборка --k5epic), стадия 1 «У лукоморья дуб зелёный»: подсказки показом, без значков и слов (p8a). Карточек нет;
// из героев выходят двойники и бегут каждый к своей свече одной пары; пока первая пара не погашена, Кощей молчит (ни капель, ни
// цепей, ни молний); у свечи — кнопка удара (без подписи), ударил — двойник вернулся в героя; пара погашена — капли и цепи;
// первая капля — «стоп-кадр» и кнопка щита, отбил — в героя; красный круг — двойник выбегает туда, где не заденет, кнопка кувырка;
// погасшая свеча растит огонёк, напарница зовёт; ни одной буквы в кнопках и всплывашках; одним игроком — свой двойник.
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,300));_ce.apply(console,arguments);};}
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.E5=ZC.FIN.k5e;window.K5=ZC.FIN.k5;
window.CHK=s=>{if(_errs.length)throw new Error(s+' — ошибки: '+_errs.slice(0,4).join(' / '));return s;};
window.CYR=s=>/[А-Яа-яЁё]/.test(s||'');window.TXT=0;window.CARDS=0;
// буквы на экране: кнопки над героями, всплывашки, карточка
window.SEE=()=>{for(const b of document.querySelectorAll('.bub'))if(b.style.display!=='none'&&(CYR(b.textContent)||/<svg/.test(b.innerHTML)))TXT++;for(const f of document.querySelectorAll('.float'))if(CYR(f.textContent))TXT++;
  const c=document.getElementById('finTut');if(c&&c.classList.contains('on'))CARDS++;};
window.TK=n=>{for(let i=0;i<n;i++){if(ZC.G.cine&&i%3===0)ZC.skip();ZC.tick(1);if(i%6===0)SEE();}};
window.PUT=(h,x,z)=>{h.pos.set(x,0.05,z);h.vel.set(0,0,0);};
window.H=pi=>ZC.players[pi].heroes[ZC.players[pi].act];
window.VIS=()=>ZC.W.prompts.filter(p=>{try{return p.cond();}catch(e){return false;}}).map(p=>{const n=typeof p.note==='function'?p.note():p.note;return p.action+(n?'+'+n:'');});
window.GO1=solo=>{ZC.setSolo(!!solo);for(const pi of[0,1])ZC.players[pi].petals=3;E5.goStage(1);ZC.G.manual=true;ZC.tick(20);let i=0;for(;i<60*90&&!(E5.cur===1&&K5.fight&&!ZC.G.cine&&!ZC.G.ui);i++){if(ZC.G.ui)CARDS++;TK(1);}
  window.S1=E5.s1;window.D=ZC.W.dbg5e();return i;};
GO1(false);TK(90);
const d=S1.dbg();CHK('fight='+K5.fight+' карточек='+CARDS+' шаг='+d.ph+' двойники='+d.gh.join(',')+' планы='+d.plans.join(','))
//@@
// двойники выходят и бегут к двум свечам одной пары; Кощей молчит 10 с
const r=[],d0=S1.dbg();if(CARDS)throw new Error('карточка перед стадией 1');if(d0.ph!==0)throw new Error('стадия 1 не с первого шага: '+d0.ph);
if(!d0.gh[0]||!d0.gh[1])throw new Error('двойников нет: '+d0.gh.join(','));
const i0=+d0.gh[0].slice(1),i1=+d0.gh[1].slice(1),pair=[[0,1],[2,3],[5,6],[4,7]].find(p=>p.includes(i0)&&p.includes(i1));if(!pair||i0===i1)throw new Error('двойники не у одной пары: '+d0.gh.join(','));
let adds=0,bolts=0,zones=0;for(let i=0;i<600;i++){TK(1);adds=Math.max(adds,K5.adds.filter(e=>e.k5chain&&!e.k5demo&&e.alive).length);bolts=Math.max(bolts,ZC.W.bolts.length);zones=Math.max(zones,(K5.zones||[]).length);}
r.push('пара '+pair.join('+')+' цепей '+adds+' капель '+bolts+' кругов '+zones);if(adds||bolts||zones)throw new Error('Кощей не молчит до первой пары: '+r.join(' '));
window.R=r;CHK(r.join(' | '))
//@@ shot=k5e_s1_ghosts.png
ZC.tick(1);
//@@
// герой у своей свечи — над свечой кнопка удара без подписи; ударил — двойник вернулся в героя
const t0=S1.tg[0],h=H(0),m0=S1.merges;PUT(h,t0.pos.x+(t0.pos.x>0?-1.4:1.4),t0.pos.z+0.6);h.face=Math.atan2(t0.pos.x-h.pos.x,t0.pos.z-h.pos.z);TK(3);
const v=VIS();if(v.indexOf('attack')<0)throw new Error('нет кнопки удара у свечи: '+v.join(' / '));
ZC.press('KeyF');TK(30);R.push('у свечи: '+v.join(' / ')+' | вернулся в героя: '+(S1.merges>m0));if(S1.merges<=m0)throw new Error('двойник не вернулся после удара: '+R.join(' | '));CHK(R.join(' | '))
//@@
// гасим пару: шаг 1 (капли и цепи); первая погашенная другой пары — напарница зовёт, у погасшей растёт огонёк, двойник бежит к напарнице
const hit=(c,pi)=>{for(let k=0;k<6&&c.lit;k++)c.k5hit(c,H(pi));};const P=[[0,1],[2,3],[5,6],[4,7]];
const pa=P.find(p=>p.includes(S1.tg[0].idx))||P[0];PUT(H(0),D.candles[pa[0]].pos.x+1,D.candles[pa[0]].pos.z+1);PUT(H(1),D.candles[pa[1]].pos.x-1,D.candles[pa[1]].pos.z+1);
hit(D.candles[pa[0]],0);hit(D.candles[pa[1]],1);TK(30);R.push('шаг после пары='+S1.ph);if(S1.ph!==1)throw new Error('после первой пары не шаг 1: '+R.join(' | '));
const pb=P.find(p=>p!==pa&&D.candles[p[0]].lit&&D.candles[p[1]].lit);hit(D.candles[pb[0]],0);PUT(H(1),D.candles[pb[1]].pos.x-6,D.candles[pb[1]].pos.z+6);PUT(H(0),D.candles[pb[0]].pos.x-8,D.candles[pb[0]].pos.z+8);TK(120);
const dd=S1.dbg();R.push('напарница: двойники '+dd.gh.join(','));if(!dd.gh.includes('c'+pb[1]))throw new Error('к напарнице никто не бежит: '+R.join(' | '));
// чтобы не мешала дальше — гасим и её
hit(D.candles[pb[1]],1);TK(10);CHK(R.join(' | '))
//@@
// первая капля в героя — «стоп-кадр», над героем кнопка щита; нажал — капля обратно, двойник в героя
const h=H(0),lit=D.candles.filter(c=>c.lit);const c=lit[0];PUT(h,c.pos.x+3.4,c.pos.z+1.5);PUT(H(1),c.pos.x-12,c.pos.z+12);
// не мешают: другие свечи, цепи, молнии и буквы
for(const e of lit)if(e!==c){e.cd=99;}c.cd=0.1;for(const e of K5.adds)if(e.k5chain){e.state='k5hide';e.g.visible=false;e.k5wait=99;}K5.castT=99;E5.es.lt=99;
// прежние капли и стоп-кадры (капли пары, цепи второго) не в счёт — учимся с нуля
for(const b of ZC.W.bolts.slice())if(b.g.parent)b.g.parent.remove(b.g);ZC.W.bolts.length=0;S1.frz=null;delete S1.L[0].drop;delete S1.L[1].drop;
let frz=null,keys='',i=0,par0=ZC.G.stats.parries;
for(;i<60*12&&!frz;i++){PUT(h,c.pos.x+3.4,c.pos.z+1.5);TK(1);const q=S1.dbg();if(q.frz==='drop'&&S1.frz.pi===0){frz=q.frz;keys=q.keys[0].join(',');}}
const vg=document.getElementById('k5s1v'),vig=!!vg&&vg.style.opacity==='1'&&document.body.classList.contains('k5s1f');
if(!frz)throw new Error('нет стоп-кадра на каплю, планы '+S1.dbg().plans.join(','));ZC.press('KeyG');TK(1);const f2=S1.dbg().frz;TK(90);
R.push('капля: стоп-кадр='+frz+' края темнеют='+vig+' кнопка='+keys+' после нажатия стоп='+f2+' отбил='+(ZC.G.stats.parries>par0)+' научился='+JSON.stringify(S1.L[0].drop||{}));
if(keys.indexOf('guard')<0||!vig||f2||ZC.G.stats.parries<=par0)throw new Error(R.join(' | '));CHK(R.join(' | '))
//@@
// красный круг под героем: двойник выбегает туда, где не заденет; «стоп-кадр» и кнопка кувырка
const h=H(0),p=h.pos.clone();for(const e of D.candles)e.cd=99;for(const e of K5.adds)if(e.k5chain){e.cd=99;}
S1.frz=null;delete S1.L[0].zone;delete S1.L[1].zone;D.k5Zone(p,1.6,1.35,0xff4a5a,q=>{});let pl=null,frz=null,keys='',i=0;for(;i<90;i++){TK(1);const q=S1.dbg();if(q.plans[0]==='zone')pl=q;if(q.frz==='zone'){frz=q.frz;keys=q.keys[0].join(',');break;}}
const g=S1.gh[0];R.push('круг: план='+(pl&&pl.plans[0])+' двойник от героя '+(g&&g.to?Math.hypot(g.to.x-p.x,g.to.z-p.z).toFixed(1):'-')+' м стоп-кадр='+frz+' кнопка='+keys);
if(!pl||frz!=='zone'||keys.indexOf('roll')<0)throw new Error(R.join(' | '));ZC.press('ShiftLeft');TK(60);CHK(R.join(' | '))
//@@
// погасшая свеча растит огонёк; ни одной буквы и значка в кнопках и всплывашках за стадию
const out=D.candles.filter(c=>!c.lit&&c.relT<10).length;R.push('растёт огоньков (≤10 с до свечи) '+out+' | с буквами '+TXT+' | карточек '+CARDS);if(TXT||CARDS)throw new Error(R.join(' | '));CHK(R.join(' | '))
//@@
// одним игроком: свой двойник, Кощей молчит до двух свечей
GO1(true);TK(60);const q=S1.dbg(),sp=ZC.G.soloPi;R.push('одному: шаг '+q.ph+' двойники '+q.gh.join(','));if(q.ph!==0||!q.gh[sp]||q.gh[1-sp])throw new Error(R.join(' | '));
const c=S1.tg[sp];PUT(H(sp),c.pos.x+1.3,c.pos.z+0.5);TK(3);const v=VIS();R.push('у свечи: '+v.join(' / '));if(v.indexOf('attack')<0)throw new Error(R.join(' | '));
ZC.setSolo(false);CHK(R.join(' | '))
