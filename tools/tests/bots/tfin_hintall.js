//@@
// @timeout=2400
// релиз final06: подсказки и их управление работают на ВСЕХ уровнях игры (late_79_hints, late_73/74 — меню): на каждом уровне подсказка видна карточкой,
// LB убирает и возвращает её, «Подсказки: выкл» прячет всё, LB показывает нужную и убирает, пункт есть в паузе и в Настройках; в одиночном режиме и с ИИ напарником — то же.
// Уровень 5-Б2 сам отключает карточки (W.hintsOff: текст — только уроками), на нём проверяются меню и выключатель.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.H=ZC.FIN.hints;window.G=ZC.G;window.P=ZC.players;window.F=ZC.FIN;window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};
window.mkPad=i=>({id:'Fake pad '+i,index:i,connected:true,mapping:'standard',timestamp:0,axes:[0,0,0,0],buttons:Array.from({length:17},()=>({pressed:false,value:0}))});
window.PADSIM={list:[mkPad(0),mkPad(1)]};F.padSrc=()=>PADSIM.list.slice();
window.FR=0;{const raf=window.requestAnimationFrame.bind(window);window.requestAnimationFrame=cb=>raf(t=>{FR++;cb(t);});}
window.polled=n=>new Promise(res=>{const f0=FR,t0=performance.now();const c=()=>{if(FR-f0>=n||performance.now()-t0>30000)res();else setTimeout(c,5);};c();});
window.tapB=async(i,b)=>{const p=PADSIM.list[i];p.buttons[b].pressed=true;p.buttons[b].value=1;await polled(2);p.buttons[b].pressed=false;p.buttons[b].value=0;await polled(2);};
window.LB=4;
window.vis=()=>['hint0','hint1','hintS'].filter(id=>{const e=document.getElementById(id);return e&&e.classList.contains('on')&&getComputedStyle(e).display!=='none';});
window.has=re=>vis().some(id=>re.test((document.getElementById(id).textContent||'')));
window.TIP=/Проверка подсказки/;
window.tipAll=()=>{const sp=G.solo?G.soloPi:0;P[sp].tipHTML='Проверка подсказки: сделай что-нибудь важное прямо сейчас.';P[sp].tipT=60;};
window.load=id=>{ZC.setSolo(false);F.co.set(false);ZC.startFrom(ZC.LV(id));G.manual=true;ZC.tick(20);for(let k=0;k<4;k++){if(G.cine)ZC.skip();ZC.sim(0.5);}ZC.sim(3);};
window.level=async id=>{const W=ZC.W,off=!!(W.hintsOff&&W.hintsOff()),err=[];const c=(ok,m)=>{if(!ok)err.push(m);};
  try{load(id);tipAll();ZC.sim(1);
    if(!off){c(has(TIP),'карточка с подсказкой не показалась ('+vis().join(',')+')');
      await tapB(0,LB);ZC.sim(0.5);c(!has(TIP),'LB не убрал подсказку');
      await tapB(0,LB);ZC.sim(0.5);c(has(TIP),'LB не вернул подсказку');}
    // меню: пункт в паузе и в Настройках
    F.kids.force=true;ZC.menu('pause');const L=F.menu.items.map(i=>i.label);c(L[1]==='Подсказки','в паузе пункт не вторым: '+L.join('|'));
    const st=F.menu.items.find(i=>i.label==='Настройки');if(st){st.act();const S=F.menu.items.map(i=>i.label),k=S.indexOf('Подсказки');c(k>=0&&k<8,'в настройках пункт не на первом экране: '+k);}
    F.kids.force=false;ZC.start();ZC.sim(5);   // после меню уровень может снова показать заставку с именем (4,2 с) — карточки и LB ждут её
    // выключатель: карточки и босс/урок/табличка скрыты, включили — вернулись
    if(!off){tipAll();ZC.sim(1);}
    H.toggle();ZC.sim(1);c(vis().length===0,'при «нет» видны карточки: '+vis().join(','));c(document.body.classList.contains('fin-nohints'),'нет класса fin-nohints');
    if(!off){await tapB(0,LB);ZC.sim(0.5);c(has(TIP),'при «выкл» LB не показал подсказку');await tapB(0,LB);ZC.sim(0.5);c(!has(TIP),'при «выкл» LB не убрал подсказку');}
    H.toggle();ZC.sim(1);c(!document.body.classList.contains('fin-nohints'),'класс fin-nohints остался');
  }catch(e){err.push('исключение '+String(e).slice(0,120));}
  if(H.on()===false)H.toggle();F.kids.force=false;return err.length?id+': '+err.join('; '):null;};
window.RES=[];
PADSIM.list.length?'ready':'no pads'
//@@
(async()=>{for(const id of ['p','luko','1-1','1-2','1-3','1-4','1-5','1-B'])RES.push(await level(id));return RES.filter(Boolean).concat(['done '+RES.length]);})()
//@@
(async()=>{for(const id of ['2-1','2-2','2-3','2-4','2-5','2-B','3-1','3-2','3-3','3-4','3-5','3-B'])RES.push(await level(id));return RES.filter(Boolean).concat(['done '+RES.length]);})()
//@@
(async()=>{for(const id of ['4-1','4-2','4-3','4-4','4-5','4-B','5-1','5-2','5-3','5-4','5-B1','5-B2','epi'])RES.push(await level(id));const bad=RES.filter(Boolean);
  if(bad.length)throw new Error(bad.join(' | '));return ['all levels ok '+RES.length,'errs='+_errs.length];})()
//@@
// одиночный режим (любой джойстик убирает карточки героя, которым играешь) и с ИИ напарником (джойстик человека — все карточки)
(async()=>{BAD.length=0;ZC.setSolo(true);ZC.startFrom(ZC.LV('1-1'));G.manual=true;ZC.tick(20);for(let k=0;k<4;k++){if(G.cine)ZC.skip();ZC.sim(0.5);}ZC.sim(3);tipAll();ZC.sim(1);
  chk(has(TIP),'соло: подсказка видна');await tapB(1,LB);ZC.sim(0.5);chk(!has(TIP),'соло: LB второго джойстика убрал');await tapB(0,LB);ZC.sim(0.5);chk(has(TIP),'соло: LB первого вернул');
  ZC.setSolo(false);F.co.set(true);ZC.startFrom(ZC.LV('1-1'));G.manual=true;ZC.tick(20);for(let k=0;k<4;k++){if(G.cine)ZC.skip();ZC.sim(0.5);}ZC.sim(3);tipAll();ZC.sim(1);
  chk(has(TIP),'с ИИ напарником: подсказка видна');await tapB(0,LB);ZC.sim(0.5);chk(!has(TIP),'с ИИ напарником: LB убрал');await tapB(0,LB);ZC.sim(0.5);chk(has(TIP),'с ИИ напарником: LB вернул');
  F.co.set(false);if(BAD.length)throw new Error(BAD.join(' · '));return ['solo/co ok','errs='+_errs.length];})()
//@@
