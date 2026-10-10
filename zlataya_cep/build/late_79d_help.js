/* ============================== РЕЛИЗ · ЛЕСТНИЦА ПОДСКАЗОК ПРИ ПРОМАХАХ (FIN.help) ============================== */
// docs/33 п. 4, docs/34 §6.2 «F-3». Общий счётчик промахов по приёму (ключ: 'guard' щит, 'roll' кувырок, 'parry' отбить, 'jump' прыжок…)
// у каждого игрока; уровень или босс сообщает: FIN.help.reg(ключ, …) — один раз, FIN.help.miss(pi,ключ) — промах, FIN.help.ok(pi,ключ) — успех,
// FIN.help.want(pi,ключ) — каждый кадр, пока приём сейчас нужен (идёт таймер «без успеха»).
//  1 ступень — 1-й промах: кнопка приёма над героем мигает и звякает (≈ 2,4 с);
//  2 ступень — 2-й промах или 12 с без успеха: карточка слоя подсказок (≤ 7 слов, tip) + стрелка на цель + чтение вслух (late_79b_readaloud.js);
//  3 ступень — 3-й промах или 20 с: герои показывают приём (призрак, ≤ 8 с), на 20 с враги этого игрока медленнее ×0,7 (замах дольше), окно (отбив, Пробой) ×1,3;
//  4 ступень — два падения подряд без успеха: «повтор урока» — FIN.help.onLesson({pi,key,keys,weak}) — по умолчанию FIN.lesson.again() (шаблон урока F-8, late_79e_lesson.js).
// Путь «Богатырь» — без поблажек: ступени 3–4 молчат. «Лисёнок» — вдвое слабее (×0,85 / ×1,15, показ 5 с), как ступени KIDS_W. Ёжик — полностью.
const HLP=FIN.help={on:true,keys:{},st:{},slow:[0,0],base:{},demo:[0,0],onLesson:o=>{const L=FIN.lesson;return !!(L&&L.again&&L.again());},falls:[0,0],lastKey:['',''],arrow:null,log:[]};
const HLP_T2=12,HLP_T3=20,HLP_SLOW=20,HLP_DEMO=8;
const hlpPath=pi=>players[pi]&&players[pi].path||'easy';
// 1 — Ёжик (полностью), 0,5 — Лисёнок (вдвое слабее), 0 — Богатырь (без поблажек)
const hlpK=pi=>({easy:1,mid:0.5}[hlpPath(pi)]||0);
HLP.reg=function(key,o){HLP.keys[key]=Object.assign({act:key,word:'',tail:'',target:null,demo:null},o||{});};
function hlpS(pi,key){const m=HLP.st[pi]||(HLP.st[pi]={});return m[key]||(m[key]={miss:0,t:0,arm:0,stage:0});}
HLP.stage=(pi,key)=>hlpS(pi,key).stage;
HLP.reset=function(){hlpUnslow();HLP.st={};HLP.slow=[0,0];HLP.demo=[0,0];HLP.falls=[0,0];HLP.lastKey=['',''];hlpClear();if(typeof hideGhost==='function'){hideGhost(0);hideGhost(1);}};
// за Игрока 2 играет ИИ напарник (late_73_companion.js) — его не учим: ни мигания и карточек ему, ни повтора урока для обоих из-за его падений
const hlpBot=pi=>pi===1&&!!(FIN.co&&FIN.co.live());
HLP.want=function(pi,key){if(!HLP.on||pi==null||hlpBot(pi))return;hlpS(pi,key).arm=0.35;};
HLP.ok=function(pi,key){const s=hlpS(pi,key);s.miss=0;s.t=0;s.stage=0;HLP.falls[pi]=0;
  if(HLP.demo[pi]>0){HLP.demo[pi]=0;if(typeof hideGhost==='function')hideGhost(pi);}hlpClear(pi);};
HLP.miss=function(pi,key){if(!HLP.on||hlpBot(pi))return;const s=hlpS(pi,key);s.miss++;HLP.lastKey[pi]=key;hlpUp(pi,key,s.miss>=3?3:s.miss>=2?2:1);};
HLP.fall=function(pi){if(hlpBot(pi))return;HLP.falls[pi]++;HLP.log.push('fall'+pi);
  if(HLP.falls[pi]>=2){HLP.falls[pi]=0;const k=hlpK(pi);if(!k)return;const key=HLP.lastKey[pi]||'';
    const keys=Object.keys(HLP.st[pi]||{}).filter(x=>HLP.st[pi][x].miss>0);HLP.log.push('lesson'+pi);
    if(typeof HLP.onLesson==='function'){try{HLP.onLesson({pi,key,keys,weak:k<1});}catch(e){console.error('help.lesson',e);}}}};
// подняться на ступень (не ниже достигнутой); ступень 3 — только если путь даёт поблажки
function hlpUp(pi,key,n){const s=hlpS(pi,key),kk=hlpK(pi);if(n>2&&!kk)n=2;if(n<=s.stage)return;
  for(let g=s.stage+1;g<=n;g++){s.stage=g;HLP.log.push('s'+g+':'+pi+':'+key);if(g===1)hlpFlash(pi,key);else if(g===2)hlpCard(pi,key);else hlpShow(pi,key,kk);}}
// --- ступень 1: кнопка над героем мигает и звякает
let hlpBtn=null,hlpArr=null,hlpBtnT=[0,0],hlpBtnPi=0,hlpBtnKey='';
function hlpDom(){if(hlpBtn&&hlpBtn.isConnected)return;
  const st=document.createElement('style');st.textContent='#finHelpBtn,#finHelpArr{position:fixed;left:0;top:0;z-index:30;pointer-events:none;display:none;font:700 22px/1 system-ui,sans-serif;color:#fff}'
   +'#finHelpBtn{padding:6px 12px;border-radius:10px;background:rgba(255,213,74,.95);color:#4a2b00;border:3px solid #fff;box-shadow:0 0 18px #ffd54a;animation:finHelpBlink .5s ease-in-out infinite alternate}'
   +'#finHelpArr{font-size:44px;color:#ffd54a;text-shadow:0 2px 6px #000,0 0 14px #ff9a2a;animation:finHelpBob .55s ease-in-out infinite alternate}'
   +'@keyframes finHelpBlink{from{opacity:.35;filter:brightness(1)}to{opacity:1;filter:brightness(1.35)}}@keyframes finHelpBob{from{margin-top:0}to{margin-top:-14px}}';document.head.appendChild(st);
  hlpBtn=document.createElement('div');hlpBtn.id='finHelpBtn';document.body.appendChild(hlpBtn);
  hlpArr=document.createElement('div');hlpArr.id='finHelpArr';hlpArr.textContent='▼';document.body.appendChild(hlpArr);}
function hlpFlash(pi,key){const o=HLP.keys[key];if(!o||!document.body)return;hlpDom();hlpBtnPi=pi;hlpBtnKey=key;hlpBtn.innerHTML=K(pi,o.act);hlpBtnT[pi]=2.4;
  try{tone(1320,0.09,'sine',0.22);tone(1760,0.12,'sine',0.2,undefined,0.1);}catch(e){}}
// --- ступень 2: карточка ≤ 7 слов + стрелка на цель + голос
HLP.cardText=(pi,key)=>{const o=HLP.keys[key];return o?o.word+' — жми '+K(pi,o.act)+(o.tail?' '+o.tail:''):'';};
function hlpCard(pi,key){const o=HLP.keys[key];if(!o)return;const html=HLP.cardText(pi,key);tip(pi,html,6);HLP.arrow={pi,key,t:6};
  if(typeof RA!=='undefined'&&RA.can&&RA.can()){const d=document.createElement('div');d.innerHTML=html;d.querySelectorAll('kbd,.pb').forEach(e=>e.remove());
    const t=d.textContent.replace(/\s+/g,' ').replace(/\s+([,.!?:;])/g,'$1').trim();if(t){RA.said[RA.key(t)]=performance.now();RA.say(t,true);}}}   // пометить прочитанным — карточка слоя не прочитает вторично
function hlpTarget(pi,key){const o=HLP.keys[key];let p=null;try{p=o&&o.target?o.target(pi):null;}catch(e){}return p;}
// --- ступень 3: показ приёма и поблажка
function hlpShow(pi,key,kk){const o=HLP.keys[key];hlpSlowOn(pi,kk);if(!o)return;const h=active(pi);if(!h||typeof showGhost!=='function')return;
  const dur=kk<1?5:HLP_DEMO,from=h.pos.clone().add(new V3(1.3,0,0));HLP.demo[pi]=dur;
  showGhost(pi,Object.assign({kind:h.kind,action:'hop',from},o.demo?o.demo(pi,h):{}));
  tip(pi,'Смотри, как делают: '+HLP.cardText(pi,key),Math.min(dur,6));}
function hlpSlowOn(pi,kk){HLP.slow[pi]=HLP_SLOW;HLP.k=HLP.k||[1,1];HLP.k[pi]=kk;hlpWin();}
// окно ×1,3 (Лёгкий) / ×1,15 (Средний): отбив и Пробой по пути игрока; снимается, когда у обоих кончилась поблажка
function hlpWin(){const f=Math.max(HLP.k&&HLP.k[0]*(HLP.slow[0]>0)||0,HLP.k&&HLP.k[1]*(HLP.slow[1]>0)||0);
  for(const p of['easy','mid']){const T=TIMING[p];if(!HLP.base[p])HLP.base[p]={parry:T.parry,broken:T.broken};const b=HLP.base[p];
    const on=f>0&&players.some((q,i)=>q.path===p&&HLP.slow[i]>0);const m=on?1+0.3*(p==='easy'?1:0.5):1;T.parry=b.parry*m;T.broken=b.broken*m;}}
function hlpUnslow(){for(const p in HLP.base){Object.assign(TIMING[p],HLP.base[p]);}HLP.base={};}
function hlpClear(pi){if(pi==null||(HLP.arrow&&HLP.arrow.pi===pi))HLP.arrow=null;if(pi==null||hlpBtnPi===pi){hlpBtnT[hlpBtnPi]=0;}}
// замах врага игрока с поблажкой: время ×0,7 (идёт медленнее, замах длиннее в 1/0,7); Средний — ×0,85
{const _fw=foeWind;foeWind=function(e){_fw(e);const h=e.tgt;if(!h||!(HLP.slow[h.player]>0))return;const kk=hlpK(h.player);if(!kk)return;e.slow*=kk<1?0.85:0.7;};}
// падение: учёт «двух падений»
{const _dh=damageHero;damageHero=function(h,src){const p=players[h.player],was=p.downed,r=_dh(h,src);if(!was&&p.downed)HLP.fall(h.player);return r;};}
// смена уровня — чистая лестница и прежние окна TIMING (до загрузки: иначе поблажка осталась бы в базе)
{const _ll=loadLevel;loadLevel=function(i){HLP.reset();_ll(i);};}
// ход: таймеры, мигание, стрелка
function hlpPos(p3){for(const pane of PANES){const pr=project(p3,pane),x=pane.x+(pr.x*0.5+0.5)*pane.w,y=(1-(pr.y*0.5+0.5))*innerHeight;
  if(!pr.behind&&(pane.poly?paneHas(pane,x,y,pane.w*0.025):Math.abs(pr.x)<0.95&&Math.abs(pr.y)<0.92))return {x,y};}return null;}
const hlpLive=()=>HLP.on&&W&&G.state==='play'&&!G.cine&&!G.trans&&!G.ui;
// таймеры — в шаге игры (идут и без отрисовки интерфейса)
function hlpSim(dt){if(!hlpLive())return;
  for(const pi of[0,1]){if(HLP.slow[pi]>0){HLP.slow[pi]-=dt;if(HLP.slow[pi]<=0){HLP.slow[pi]=0;hlpWin();}}
    if(HLP.demo[pi]>0){HLP.demo[pi]-=dt;if(HLP.demo[pi]<=0)hideGhost(pi);}
    if(hlpBtnT[pi]>0)hlpBtnT[pi]-=dt;
    const m=HLP.st[pi];if(!m||players[pi].downed)continue;
    for(const key in m){const s=m[key];if(s.arm>0){s.arm-=dt;s.t+=dt;if(s.t>=HLP_T3)hlpUp(pi,key,3);else if(s.t>=HLP_T2)hlpUp(pi,key,2);}}}
  if(HLP.arrow){HLP.arrow.t-=dt;if(HLP.arrow.t<=0)HLP.arrow=null;}}
{const _step=step;step=function(dt){_step(dt);try{hlpSim(dt);}catch(e){console.error('help',e);}};}
// отрисовка: мигающая кнопка над героем и стрелка на цель
function hlpDraw(){hlpDom();
  if(!hlpLive()){hlpBtn.style.display='none';hlpArr.style.display='none';return;}
  let shown=false;const pi=hlpBtnPi;if(hlpBtnT[pi]>0){const h=active(pi),pt=h&&hlpPos(new V3(h.pos.x,h.pos.y+h.d.height+0.9,h.pos.z));
    if(pt){hlpBtn.style.display='block';hlpBtn.style.transform='translate('+pt.x.toFixed(1)+'px,'+pt.y.toFixed(1)+'px) translate(-50%,-100%)';shown=true;}}
  if(!shown)hlpBtn.style.display='none';
  const a=HLP.arrow;let ar=false;if(a){const p=hlpTarget(a.pi,a.key),pt=p&&hlpPos(p);if(pt){hlpArr.style.display='block';hlpArr.style.transform='translate('+pt.x.toFixed(1)+'px,'+pt.y.toFixed(1)+'px) translate(-50%,-100%)';ar=true;}}
  if(!ar)hlpArr.style.display='none';}
{const _ui=updateUI;updateUI=function(dt){_ui(dt);try{hlpDraw();}catch(e){console.error('help',e);}};}
HLP.timing=()=>TIMING;   // для ботов
