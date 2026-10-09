/* ============================== РЕЛИЗ · ЖУРНАЛ ИНТЕРФЕЙСА (только ?debug) ============================== */
// Что показано игроку и как это выглядит: подсказки, баннеры, реплики, ролики, тряска, вспышки, hit-stop, окна HUD (размер шрифта,
// перекрытия), нагрузка на отрисовку. Метод — аудит боссов (docs/34 «Как мерили»), теперь постоянным кодом; его читает бот
// tfin_bossaudit (docs/33 п. 8 — приёмка босса). Поведение игры не меняется: без ?debug модуль ничего не делает, с ?debug журнал
// выключен, пока бот не вызовет PR.start() (или в адресе есть &uilog).
// PR.start({perf}) · PR.stop() · PR.reset() · PR.report() — сводка (см. ниже) · PR.log — события {t,lv,k,…}.
// Время журнала — игровое (G.time); сэмплер HUD — каждые 6 тиков ZC.tick (перед ним updateUI(0,1): таймеры подсказок, баннера и субтитров идут вместе с игровым временем, как при кадрах); нагрузка — раз в 120 тиков после ПРИНУДИТЕЛЬНОЙ render() и
// gl.finish() (без неё renderer.info «залипает»; шаг растёт: после каждых 8 замеров вдвое реже, всего 24 замера); кадры загрузки уровня (статичная сцена, 1200+ вызовов) в нагрузку не входят.
if(/[?&]debug/.test(location.search)){
const PR=window.PR={on:false,perf:false,log:[],c:0,hud:{},ov:{},pf:[],cines:[],cur:null,_fl:false,_loadC:-9999,_pfN:0,_pfNext:0};
const HUD=['hint0','hint1','hintS','banner','subs','finBossHint','finTut','bossbar','vest','skip'];
const HINTS=['hint0','hint1','hintS','finBossHint','finTut'];   // «подсказки» для размера шрифта
const strip=h=>String(h==null?'':h).replace(/<br\s*\/?>/g,' ').replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
const words=s=>(String(s||'').match(/[A-Za-zА-Яа-яЁё0-9]+/g)||[]).length;
const TT=()=>+(+G.time||0).toFixed(2);
const push=(k,o)=>{if(!PR.on)return;PR.log.push(Object.assign({t:TT(),lv:(W&&W.levelId)||'',k},o));if(PR.log.length>20000)PR.log.splice(0,5000);};
PR.push=push;
// --- обёртки над функциями прототипа (присваиванием: имена функций прототипа не объявляем) ---
{const f=tip;tip=function(pi,html,dur){push('tip',{pi,text:strip(html),dur:dur||2});return f.apply(this,arguments);};}
{const f=banner;banner=function(text,color,dur,sub){push('banner',{text:strip(text),sub:strip(sub),dur:dur||1.5,color});return f.apply(this,arguments);};}
{const f=say;say=function(who,text,dur){push('say',{who,text:strip(text),dur});return f.apply(this,arguments);};}
if(typeof sayP==='function'){const f=sayP;sayP=function(text,dur){push('say',{who:'pelageya',text:strip(text),dur:dur||2.8});return f.apply(this,arguments);};}
{const f=floatText;floatText=function(pos,text){push('float',{text:strip(text)});return f.apply(this,arguments);};}
{const f=shake;shake=function(pi,amp,dur){push('shake',{a:amp,d:dur,pi});return f.apply(this,arguments);};}
{const f=prompt;prompt=function(pi,action,at,cond,note){push('prompt',{pi,action,note:strip(note)});return f.apply(this,arguments);};}
{const f=play;play=function(def){if(PR.on&&def)push('play',{dur:def.dur,says:(def.says||[]).map(s=>Array.isArray(s)?strip(s[3]):strip(s&&s.text)).filter(Boolean)});return f.apply(this,arguments);};}
{const f=loadLevel;loadLevel=function(){PR._loadC=PR.c;return f.apply(this,arguments);};}
if(typeof CINE!=='undefined'){const t=CINE.trauma,d=CINE.flashDip;
  if(t)CINE.trauma=function(a){push('trauma',{a});return t.apply(this,arguments);};
  if(d)CINE.flashDip=function(col,a){push('dip',{a:a==null?0.5:a,col});return d.apply(this,arguments);};}
// hit-stop: прототип сам выставляет G.hitstop (в ZC.tick он не убывает) — пишем каждое выставление
{const pd=Object.getOwnPropertyDescriptor(G,'hitstop');let hv=G.hitstop||0;   // M-4b: сеттер с потолком FIN.bossfx (late_84b) — вызываем, а не затираем
  Object.defineProperty(G,'hitstop',{get(){return pd&&pd.get?pd.get.call(G):hv;},set(v){if(pd&&pd.set)pd.set.call(G,v);else hv=v;if(v>0)push('hitstop',{d:+(+(pd&&pd.get?pd.get.call(G):v)).toFixed(3)});},configurable:true,enumerable:true});}
// --- сэмплер HUD ---
const own=el=>{let s='';for(const n of el.childNodes)if(n.nodeType===3)s+=n.nodeValue;return s.trim().length>0;};
const fontOf=el=>{let m=parseFloat(getComputedStyle(el).fontSize)||0;const q=[el];while(q.length){const e=q.pop();for(const c of e.children){const cs=getComputedStyle(c);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity<0.15)continue;
  if(own(c)){const v=parseFloat(cs.fontSize);if(v&&v<m)m=v;}q.push(c);}}return m;};
PR.sample=()=>{const Hh=innerHeight||1,vis=[];
  for(const id of HUD){const el=document.getElementById(id);if(!el)continue;const cs=getComputedStyle(el);
    if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity<=0.15)continue;
    if(id!=='vest'&&id!=='skip'&&!el.textContent.trim())continue;
    const r=el.getBoundingClientRect();if(r.width<2||r.height<2)continue;
    const px=HINTS.includes(id)||id==='bossbar'||id==='banner'||id==='subs'?fontOf(el):parseFloat(cs.fontSize)||0;
    const h=PR.hud[id]||(PR.hud[id]={n:0,pxMin:1e9,pctMin:1e9,pctOwnMin:1e9,h:Hh});
    h.n++;h.h=Hh;const pc=px/Hh*100;if(px&&px<h.pxMin)h.pxMin=px;if(px&&pc<h.pctMin)h.pctMin=pc;
    const po=parseFloat(cs.fontSize)||0;if(po&&po/Hh*100<h.pctOwnMin)h.pctOwnMin=po/Hh*100;
    vis.push({id,r});}
  for(let i=0;i<vis.length;i++)for(let j=i+1;j<vis.length;j++){const a=vis[i].r,b=vis[j].r;
    const w=Math.min(a.right,b.right)-Math.max(a.left,b.left),h=Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top);if(w<=0||h<=0)continue;
    const pct=w*h/Math.min(a.width*a.height,b.width*b.height)*100;const key=vis[i].id+'×'+vis[j].id;
    const o=PR.ov[key]||(PR.ov[key]={max:0,n:0});if(pct>o.max)o.max=pct;if(pct>=10)o.n++;}};
// --- нагрузка: принудительная отрисовка + gl.finish, потом renderer.info ---
PR.measure=()=>{try{if(G.state!=='play'||PR.c-PR._loadC<240)return;render();const gl=renderer.getContext();if(gl&&gl.finish)gl.finish();
  const i=renderer.info.render,calls=i.calls,tris=i.triangles;if(calls>1000)return;   // кадр загрузки — статичная сцена
  PR.pf.push({t:TT(),lv:(W&&W.levelId)||'',calls,tris,fx:(FIN.fx&&FIN.fx.list?FIN.fx.list.length:0)});}catch(e){}};
PR.step=()=>{PR.c++;
  const fl=document.getElementById('flash'),o=fl?parseFloat(fl.style.opacity)||0:0;   // вспышка #flash: восходящий фронт через 0,3
  if(o>0.3&&!PR._fl)push('flash',{a:+o.toFixed(2)});PR._fl=o>0.3;
  const c=G.cine;if(c&&!PR.cur){PR.cur={t0:TT(),lv:(W&&W.levelId)||'',dur:c.dur||0,c};}
  else if(!c&&PR.cur){const q=PR.cur;PR.cur=null;const d=+(TT()-q.t0).toFixed(2);PR.cines.push({lv:q.lv,t:q.t0,dur:d,def:q.dur,skipped:q.dur>0&&d<q.dur-0.5});}
  if(PR.c%6===0){try{updateUI(0.1);}catch(e){}PR.sample();}   // HUD живёт в updateUI (кадры), а бот гонит тики без кадров — продвигаем его вместе с игровым временем
  if(PR.perf&&PR.c>=PR._pfNext){PR.measure();PR._pfN++;PR._pfNext=PR.c+120*(1<<Math.min(3,PR._pfN>>3));if(PR._pfN>=24)PR.perf=false;}};   // 120 тиков; после каждых 8 замеров шаг вдвое реже (до 960; всего 24 замера), чтобы долгий сценарий не тонул в отрисовке
// --- управление и сводка ---
PR.start=function(o){PR.on=true;PR.perf=!!(o&&o.perf);PR._pfN=0;PR._pfNext=PR.c+120;
  // CSS-переходы окон HUD не идут внутри одного вызова бота (кадры не рисуются) — окно «появляется» с нулевой прозрачностью; на время замера переходы выключены
  if(!document.getElementById('uilogCss')){const st=document.createElement('style');st.id='uilogCss';
    st.textContent='.hn-card,#finTut,#finBossHint,#banner,#subs,#skip,#bossbar,#vest,#solsign{transition:none!important;animation:none!important}';document.head.appendChild(st);}};
PR.stop=()=>{PR.on=false;};
PR.reset=()=>{PR.log.length=0;PR.hud={};PR.ov={};PR.pf=[];PR.cines=[];PR.cur=null;PR._fl=false;};
const pct=(a,p)=>{if(!a.length)return 0;const s=a.slice().sort((x,y)=>x-y);return s[Math.min(s.length-1,Math.ceil(s.length*p)-1)];};
const perSec=(ts)=>{let m=0,j=0;for(let i=0;i<ts.length;i++){while(ts[i]-ts[j]>=1)j++;m=Math.max(m,i-j+1);}return m;};
PR.report=function(){const L=PR.log,by=k=>L.filter(e=>e.k===k),r={};
  const tw=by('tip').map(e=>words(e.text));
  r.tips={n:tw.length,avg:tw.length?+(tw.reduce((a,b)=>a+b,0)/tw.length).toFixed(1):0,max:Math.max(0,...tw),over7:tw.filter(n=>n>7).length};
  const bw=by('banner').map(e=>words(e.text)+words(e.sub));r.banners={n:bw.length,max:Math.max(0,...bw)};
  const sw=by('say').map(e=>words(e.text));r.says={n:sw.length,max:Math.max(0,...sw)};
  const pw=[].concat(...by('play').map(e=>(e.says||[]).map(words)));r.cineSays={n:pw.length,max:Math.max(0,...pw)};   // субтитры роликов (F-0b)
  r.cines={n:PR.cines.length,durs:PR.cines.map(c=>c.dur),max:Math.max(0,...PR.cines.map(c=>c.dur)),total:+PR.cines.reduce((a,c)=>a+c.dur,0).toFixed(1),skipped:PR.cines.filter(c=>c.skipped).length};
  const fl=by('flash').map(e=>e.t).concat(by('dip').filter(e=>e.a>=0.3).map(e=>e.t)).sort((a,b)=>a-b);
  r.flash={n:fl.length,perSec:perSec(fl)};
  const sh=by('shake');r.shake={n:sh.length,max:+Math.max(0,...sh.map(e=>e.a)).toFixed(3),perSec:perSec(sh.map(e=>e.t)),trauma:+Math.max(0,...by('trauma').map(e=>e.a)).toFixed(2)};
  const hs=by('hitstop');r.hitstop={n:hs.length,max:Math.max(0,...hs.map(e=>e.d))};
  r.hud={};for(const id in PR.hud){const h=PR.hud[id];r.hud[id]={n:h.n,pxMin:+h.pxMin.toFixed(1),pctMin:+h.pctMin.toFixed(2),pctOwnMin:+h.pctOwnMin.toFixed(2),h:h.h};}
  let fm=1e9,fpx=1e9;for(const id of HINTS)if(PR.hud[id]){fm=Math.min(fm,PR.hud[id].pctMin);fpx=Math.min(fpx,PR.hud[id].pxMin);}
  r.hintFontPct=fm===1e9?null:+fm.toFixed(2);r.hintFontPx=fpx===1e9?null:+fpx.toFixed(1);
  r.ov={};let ovm=0;for(const k in PR.ov){if(PR.ov[k].n>0){r.ov[k]=+PR.ov[k].max.toFixed(0);ovm=Math.max(ovm,PR.ov[k].max);}}r.ovMax=Math.round(ovm);
  r.ovAny={};for(const k in PR.ov)if(PR.ov[k].max>=1)r.ovAny[k]=+PR.ov[k].max.toFixed(0);   // любое касание ≥ 1 % (для жёсткой проверки F-0b)
  const c=PR.pf.map(p=>p.calls),t=PR.pf.map(p=>p.tris/1000),f=PR.pf.map(p=>p.fx);
  r.perf={n:c.length,callsP95:pct(c,0.95),callsMax:Math.max(0,...c),trisP95:Math.round(pct(t,0.95)),trisMax:Math.round(Math.max(0,...t)),fxMax:Math.max(0,...f)};
  return r;};
// ZC (отладочный объект) создаётся после загрузки модулей — подключаем сэмплер к ZC.tick отложенно
setTimeout(()=>{if(!window.ZC||ZC._uilog)return;ZC._uilog=1;const tk=ZC.tick;
  ZC.tick=function(n){n=n||1;for(let i=0;i<n;i++){tk.call(ZC,1);if(PR.on)PR.step();}};
  if(/[&?]uilog/.test(location.search))PR.start({perf:true});},0);
}
