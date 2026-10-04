//@@ wait=1500
// релиз final06: 3-2 Громовой Баран — обучающие карточки перед этапами и живые подсказки (late_99x_sky32_tut.js):
// после ролика каждого этапа идут карточки; кнопки на карточках срабатывают по-настоящему (стожок пухлый, дождик, радуга, перо);
// в бою появляются подсказки со стрелкой и кнопкой; при повторе этапа — одна карточка-напоминание.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(false);ZC.startFrom(ZC.LV('3-2'));ZC.G.manual=true;ZC.tick(30);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}
const W=ZC.W,H=ZC.HERO;if(!ZC.FIN.tut32)throw new Error('нет FIN.tut32 — модуль не подключён');ZC.FIN.tut32.auto=true;ZC.FIN.warp('boss');ZC.tick(10);for(const h of Object.values(H)){h.following=false;h.lit=false;}
U.toKind('proshka',0);U.toKind('yosha',1);U.goto(0,0,-307,5);ZC.tick(5);if(!ZC.G.cine)throw new Error('нет ролика Барана: '+U.st());ZC.skip();ZC.tick(3);
const B=W.ram32;if(B.phase!==1)throw new Error('этап не 1: '+B.phase);
// карточки этапа 1 — сразу после вступления
window.CARDS=(keys)=>{const seen=[];let n=0;for(let i=0;i<60*70&&ZC.G.cine;i++){const c=document.getElementById('finTut');const t=c&&c.classList.contains('on')?(c.querySelector('.ft-head')||{}).textContent:'';if(t&&seen[seen.length-1]!==t)seen.push(t);
  if(i%25===12){const k=keys[n%keys.length];n++;ZC.press(k);}ZC.tick(1);}return seen;};
if(!ZC.G.cine)throw new Error('нет карточек этапа 1: st='+ZC.G.state+' lv='+ZC.W.levelId+' last='+ZC.FIN.tut32.last+' ph='+B.phase+' on='+ZC.FIN.tut32.on+' cards='+ZC.FIN.tut32.cards);window.S1=CARDS(['KeyL','KeyR','KeyF']);
const SB=W.stogs.slice(-4);if(!SB.some(s=>s.puffy))throw new Error('карточка «полей стожок» не сработала: '+S1.join(' / '));
if(ZC.FIN.tut32.cards[1]!==1)throw new Error('карточки этапа 1: '+ZC.FIN.tut32.cards);
'stage1 cards='+S1.length+' '+S1.slice(0,3).join(' / ')
//@@ shot=sky32tut_card.png
// снимок карточки этапа 2: переходим к грозе и делаем кадр на первой карточке
const W=ZC.W,B=W.ram32,e=B.e;e.onFinisher(ZC.HERO.proshka);ZC.tick(5);ZC.skip();ZC.tick(3);if(B.phase!==2)throw new Error('не этап 2: '+B.phase);if(!ZC.G.cine)throw new Error('нет карточек этапа 2');ZC.tick(60);'stage2 card on'
//@@
// карточки этапа 2: тучка плачет, перо — радуга встаёт
const W=ZC.W,B=W.ram32,RW=W.rains.find(r=>r.name==='rw');window.S2=CARDS(['ShiftLeft','KeyL','KeyR','Space']);
if(!RW.bow.on)throw new Error('после карточек нет радуги: rain='+RW.rain.toFixed(1)+' '+S2.join(' / '));
if(ZC.FIN.tut32.cards[2]!==1)throw new Error('карточки этапа 2: '+ZC.FIN.tut32.cards);
// живая подсказка: радуга стоит, наверху никого — «По радуге — наверх!»
let hint='';for(let i=0;i<60*8&&!hint;i++){const h=document.getElementById('finBossHint');if(h&&h.classList.contains('on'))hint=(h.querySelector('.fh-title')||{}).textContent||'?';ZC.tick(1);}
if(!hint)throw new Error('нет живой подсказки на этапе 2');'stage2 cards='+S2.length+' bow=on hint='+hint
//@@ shot=sky32tut_hint.png
ZC.tick(1);
//@@
// этап 3: карточки Пушка; потом подсказка
const W=ZC.W,B=W.ram32,e=B.e;e.onFinisher(ZC.HERO.proshka);ZC.tick(5);ZC.skip();ZC.tick(3);if(B.phase!==3)throw new Error('не этап 3: '+B.phase);if(!ZC.G.cine)throw new Error('нет карточек этапа 3');
window.S3=CARDS(['KeyR']);if(ZC.FIN.tut32.cards[3]!==1)throw new Error('карточки этапа 3: '+ZC.FIN.tut32.cards);
for(const h of Object.values(ZC.HERO))h.lit=false;let hint='';for(let i=0;i<60*14&&!hint;i++){for(const h of Object.values(ZC.HERO))if(h.active)h.iT=Math.max(h.iT,0.5);const h=document.getElementById('finBossHint');if(h&&h.classList.contains('on'))hint=(h.querySelector('.fh-title')||{}).textContent||'?';ZC.tick(1);}
if(!hint)throw new Error('нет живой подсказки на этапе 3');
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'stage3 cards='+S3.length+' hint='+hint+' errs=0'
