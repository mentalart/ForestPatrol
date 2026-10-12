//@@
// мир 4: помощь по промахам (late_99w4_help.js) и эскалация подсказок 4-Б (late_87_boss4b.js): 1 — мигает кнопка, 2 — карточка и стрелка,
// 3 — повтор урока (герои показывают); верное нажатие сбрасывает ступень.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};window.H4=ZC.FIN.w4h;
'ok'
//@@
// 4-3: «ух-нем» раньше времени — три промаха: подсказка, подсказка со стрелкой, урок
ZC.startFrom(ZC.LV('4-3'));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.G.flags.w4lessons=true;ZC.G.flags.w4l={song43:true};
const S=()=>ZC.W.song,early=()=>{for(let i=0;i<300;i++){const u=S().u;if(!S().wait&&S().k>=0&&u>0.05&&u<0.5)break;ZC.tick(1);}ZC.press('KeyE');ZC.tick(2);};
const r=[];for(let k=0;k<3;k++){early();r.push(H4.lvl+(H4.arrow?'A':'')+(ZC.FIN.w4l.cur||''));ZC.tick(60*3.3);}
chk(r[0].startsWith('1')&&!r[0].includes('A'),'4-3: ступень 1 — '+r[0]);chk(r[1].startsWith('2')&&r[1].includes('A'),'4-3: ступень 2 — '+r[1]);chk(r[2].includes('song43'),'4-3: ступень 3 — урок: '+r[2]);
let t=0;while(ZC.FIN.w4l.cur&&t<60*40){ZC.tick(1);t++;}'4-3 '+r.join(' ')+' log='+H4.log.join(',')
//@@
// 4-Б: промах (удар по герою) поднимает ступень: 1 — без текста и стрелки, 2 — со стрелкой, 3 — напоминание этапа
ZC.startFrom(ZC.LV('4-B'));ZC.G.manual=true;ZC.tick(30);for(let i=0;i<40&&(ZC.G.cine||ZC.FIN.boss4b.on);i++){ZC.skip();ZC.tick(5);}
const T4=ZC.FIN.boss4b,F=ZC.W.flags;let t=0;while(F.phase<1&&t<600){ZC.tick(1);t++;}for(let i=0;i<40&&(ZC.G.cine||T4.on);i++){ZC.skip();ZC.tick(5);}ZC.tick(60*3.5);
const st=[];for(let k=0;k<3;k++){const h=T4.h;h.cur=null;h.until=0;h.cd={};h.grace=0;const e0=h.esc||0,n0=h.escN||0;h.miss=1;for(let i=0;i<60&&(h.esc||0)===e0&&(h.escN||0)===n0;i++)ZC.tick(1);
  const txt=(T4.hint.querySelector('.fh-text')||{}).textContent||'';st.push((h.esc||0)+':'+(txt?'T':'-')+(T4.arrows.length?'A':'-')+(T4.on||ZC.G.cine?'L':''));
  for(let i=0;i<40&&(ZC.G.cine||T4.on);i++){ZC.skip();ZC.tick(5);}ZC.tick(10);if(T4.h)T4.h.grace=0;}
chk(st[0]==='1:--','4-Б: ступень 1 — '+st[0]);chk(/^2:TA/.test(st[1]),'4-Б: ступень 2 — '+st[1]);chk(/L$/.test(st[2])||T4.h.escN>=1,'4-Б: ступень 3 — напоминание: '+st[2]);
'4-B '+st.join(' ')
//@@
// УР.3: подсказка о весточке в начале уровня; «Жар крылья не держит!» над лавой без пера Жар-птицы; Сирин — окно «ух-нем» шире
ZC.startFrom(ZC.LV('4-2'));ZC.G.manual=true;ZC.tick(30);U.nocine();const W=ZC.W,R=ZC.FIN.w4rules;W.vest='sirin';W.noHeatSink=false;R.told=false;R.heat=false;
let t=0;while(!R.told&&t<600){ZC.tick(1);t++;}const tp=ZC.players[0].tipHTML||'';chk(/Сирин/.test(tp),'весточка: нет подсказки — '+tp);
const pe=ZC.HERO.pelageya;pe.pos.set(0,1.5,-2.8);pe.vel.set(0,-4,0);pe.glide=true;pe.grounded=false;ZC.tick(1);pe.glide=true;pe.vel.y=-4;ZC.tick(1);chk(R.heat,'жар: нет предупреждения');
'rules '+tp.replace(/<[^>]*>/g,'').slice(0,60)+' heat='+R.heat
//@@
// Сирин в 4-3: «ух-нем» засчитан чуть раньше окна
ZC.startFrom(ZC.LV('4-3'));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.G.flags.w4l={song43:true};const W=ZC.W;W.ladBonus=0.04;const S=W.song;
for(let i=0;i<400;i++){const u=S.u;if(!S.wait&&S.k>=0&&u>0.88&&u<0.95)break;ZC.tick(1);}const hk=W.skillHook(0,ZC.HERO.potap);const u=S.u;
const fl=W.RINGS.filter(r=>r.hero&&r.flash>0).length;chk(fl>0,'сирин: ранний «ух-нем» не засчитан u='+u.toFixed(2));'sirin u='+u.toFixed(2)+' flash='+fl
//@@
(BAD.length||_errs.length)?'FAIL tfin_w4help '+BAD.join(' || ')+' errs='+_errs.join(' | '):'tfin_w4help ok'
