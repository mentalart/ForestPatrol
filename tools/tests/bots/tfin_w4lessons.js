//@@
// мир 4: уроки новых механик (late_99w4_lessons.js) — каждый начинается в своё время, ждёт кнопку (или показывает сам через 8 с),
// заканчивается, запоминается (второй раз не идёт) и есть в «Показать урок ещё раз».
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};
window.L4=ZC.FIN.w4l;window.LL=ZC.FIN.lesson;
window.go=(id,prep)=>{ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.G.flags.w4lessons=true;ZC.tick(30);if(prep)prep();
  for(let i=0;i<40&&ZC.G.cine&&!L4.cur;i++){ZC.skip();ZC.tick(5);}let t=0;while(!L4.cur&&t<600){ZC.tick(1);t++;}};
window.through=(id,press)=>{const cur=L4.cur;if(!chk(!!cur,id+': урок не начался, stage='+ZC.W.flags.stage))return id+':-';const a0=LL.autos;let t=0;
  while(L4.cur===cur&&t<60*60){if(press&&t%20===5)press();ZC.tick(1);t++;}
  chk(!L4.cur,id+': урок не кончился');chk(L4.done[cur],id+': не отмечен');return id+':'+cur+' '+(t/60).toFixed(1)+'s auto='+(LL.autos-a0);};
'ok'
//@@
const r=[];go('4-1',()=>{U.walkTo(0,0,-7.5,4);});r.push(through('4-1',()=>{ZC.press('KeyM');ZC.press('KeyF');ZC.press('KeyL');}));
chk(ZC.W.flags.stage==='forge','4-1: после урока ковка, stage='+ZC.W.flags.stage);chk(LL.has(),'4-1: нет повтора урока');
// второй раз сам не идёт
ZC.tick(120);chk(!L4.cur,'4-1: урок пошёл второй раз');r.join(' ')
//@@
const r=[];go('4-2');r.push(through('4-2a',()=>ZC.press('KeyL')));
const P=ZC.HERO.proshka;P.pos.set(0,0,-8);ZC.tick(5);P.pos.set(0,0,-9);let t=0;while(!L4.cur&&t<300){ZC.tick(1);t++;}
r.push(through('4-2b'));chk(ZC.W.flags.stage==='b','4-2: stage='+ZC.W.flags.stage);r.join(' ')
//@@
const r=[];go('4-3');r.push(through('4-3',()=>{ZC.press('KeyE');ZC.press('KeyL');}));chk(ZC.W.flags.stage==='pull','4-3: stage='+ZC.W.flags.stage);r.join(' ')
//@@
const r=[];go('4-4');r.push(through('4-4',()=>{ZC.press('KeyR');ZC.press('KeyL');}));chk(ZC.W.flags.stage==='A','4-4: stage='+ZC.W.flags.stage);r.join(' ')
//@@
const r=[];go('4-5',()=>{U.nocine();ZC.W.flags.stage='hold';});r.push(through('4-5',()=>{ZC.press('KeyD');ZC.press('KeyG');ZC.press('ShiftLeft');}));
// повтор из паузы
const n=L4.runs;chk(LL.again(),'4-5: повтор не запустился');chk(L4.runs===n+1&&L4.cur==='hold45','4-5: повтор не тот');let t=0;while(L4.cur&&t<60*60){ZC.tick(1);t++;}r.push('again ok');r.join(' ')
//@@
(BAD.length||_errs.length)?'FAIL tfin_w4lessons '+BAD.join(' || ')+' errs='+_errs.join(' | '):'tfin_w4lessons ok runs='+L4.runs
