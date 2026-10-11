//@@ wait=1500
// релиз final06: мир 2 — мерные рейки у каждой воды гуслей (late_99zt_kw_gauges, разбор мира 2 c06) и сохранение на колокольчиках
// в 2-1 и 2-2 (late_99zu_kw_resume, c11): звон запоминает участок, при новом входе карточка «Продолжить с колокольчика?» —
// прыжок продолжает с участка (звенья и орешки на месте), щит — сначала (запись стирается).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.CARD=()=>[...document.querySelectorAll('div')].some(d=>d.style.position==='fixed'&&/Продолжить с колокольчика/.test(d.innerHTML));
window.SECZ=(id,sec)=>{const q=ZC.FIN.kwRes.table[id].secs().find(x=>x[0]===sec);return q?q[1]:NaN;};
window.RING=z=>{const b=ZC.W.bells.filter(b=>b.z<z).sort((a,c)=>c.z-a.z)[0];if(!b)throw new Error('нет колокольчика дальше z='+z);b.act[0]=true;ZC.tick(3);return b.z.toFixed(1);};
'ok'
//@@
// рейки: у каждой воды гуслей (кроме noGusli) во всех уровнях мира
const r=[];for(const[L,n]of[['2-2',5],['2-3',3],['2-4',2],['2-5',6],['2-B',1]]){ZC.startFrom(ZC.LV(L));ZC.G.manual=true;ZC.tick(5);const q=ZC.FIN.k21Gauges.list.length,need=ZC.W.waters.filter(z=>!z.noGusli&&!z.noGauge).length;
  if(q<n||q!==need)throw new Error(L+': реек '+q+', вод гуслей '+need);r.push(L+':'+q);}
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'gauges ok '+r.join(' ')
//@@
// 2-1: звон за палатами царя — запомнен участок не дальше колокольчика; новый вход — карточка, прыжок — продолжение с участка, звено при нас
ZC.G.resume={};ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(5);ZC.skip();ZC.tick(5);ZC.W.warp21('dance');ZC.tick(20);ZC.W.links=1;
const bz=RING(-182),S=ZC.G.resume['2-1'];if(!S||!(SECZ('2-1',S.sec)>=+bz-2)||SECZ('2-1',S.sec)>-150)throw new Error('участок не запомнен: '+JSON.stringify(ZC.G.resume)+' bell='+bz);
ZC.G.manual=false;ZC.loadLevel(ZC.G.levelIdx);ZC.tick(10);if(!CARD())throw new Error('нет карточки «Продолжить»');
ZC.press('Space');ZC.tick(20);const h=ZC.HERO.proshka;if(CARD())throw new Error('карточка не ушла');
if(Math.abs(h.pos.z-SECZ('2-1',S.sec))>3||ZC.W.links!==1||!ZC.W.flags.book)throw new Error('не продолжили: z='+h.pos.z.toFixed(1)+' links='+ZC.W.links);ZC.G.manual=true;
'2-1 ok bell='+bz+' sec='+S.sec+' z='+h.pos.z.toFixed(1)
//@@
// 2-2: звон за губой — участок губы или дальше; щит на карточке — сначала, запись стёрта
ZC.G.resume={};ZC.startFrom(ZC.LV('2-2'));ZC.G.manual=true;ZC.tick(5);ZC.skip();ZC.tick(5);ZC.W.warp22('lip');ZC.tick(20);
const bz=RING(-208),S=ZC.G.resume['2-2'];if(!S||!(SECZ('2-2',S.sec)>=+bz-2)||SECZ('2-2',S.sec)>-200)throw new Error('участок не запомнен: '+JSON.stringify(ZC.G.resume)+' bell='+bz);
ZC.G.manual=false;ZC.loadLevel(ZC.G.levelIdx);ZC.tick(10);if(!CARD())throw new Error('нет карточки «Продолжить»');
ZC.press('KeyG');ZC.tick(20);ZC.G.manual=true;if(CARD()||ZC.G.resume['2-2'])throw new Error('щит не стёр запись: '+JSON.stringify(ZC.G.resume));
// и прыжком — продолжить с участка
ZC.G.resume={'2-2':S};ZC.G.manual=false;ZC.loadLevel(ZC.G.levelIdx);ZC.tick(10);ZC.press('Space');ZC.tick(20);ZC.G.manual=true;const h=ZC.HERO.proshka;
if(Math.abs(h.pos.z-SECZ('2-2',S.sec))>3)throw new Error('не продолжили 2-2: z='+h.pos.z.toFixed(1));
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'2-2 ok bell='+bz+' sec='+S.sec+' z='+h.pos.z.toFixed(1)
//@@
// музыка (c21): своя тема у 2-1…2-4; в 2-1 перебор гуслей молчит, пока гусли не подарены. Нужен звук — нажатие (жест) в следующем шаге.
ZC.start();ZC.G.manual=true;ZC.tick(2);'start'
//@@ key=Space wait=1200
const r=[];for(const[L,n]of[['2-1','k21'],['2-2','k22'],['2-3','k23'],['2-4','k24']]){ZC.startFrom(ZC.LV(L));ZC.G.manual=true;ZC.tick(3);if(ZC.W.music!==n||!ZC.FIN.music.TR[n])throw new Error(L+': тема '+ZC.W.music);r.push(L+':'+n);}
window.MC={};const I=ZC.FIN.music.inst;for(const k in I){const f=I[k];I[k]=function(){MC[k]=(MC[k]||0)+1;return f.apply(this,arguments);};}
// счёт — с начала темы k21 (прежняя тема доигрывает, пока гаснет)
ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(3);ZC.W.abil.gusli=false;window.MT=setInterval(()=>{ZC.FIN.music.tick();if(ZC.FIN.music.cur==='k21'&&!window.MCR){window.MCR=1;for(const k in MC)delete MC[k];}},40);'themes '+r.join(' ')+' audio='+ZC.FIN.audioState()
//@@ wait=6000
const a=JSON.stringify(MC),cur=ZC.FIN.music.cur;if(cur!=='k21')throw new Error('играет '+cur+' '+a);if(MC.harp)throw new Error('перебор до гуслей: '+a);
window.MC0=Object.assign({},MC);ZC.W.abil.gusli=true;'k21 без гуслей '+a
//@@ wait=4000
clearInterval(MT);const d=(MC.harp||0)-(MC0.harp||0);if(d<4)throw new Error('с гуслями перебора нет: '+JSON.stringify(MC));
if(_errs.length)throw new Error('ошибки: '+_errs.slice(0,3).join(' | '));'music ok harp+'+d+' '+JSON.stringify(MC)
