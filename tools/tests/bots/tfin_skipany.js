//@@
// релиз: пропуск ролика — прыжок держит любой из двух игроков (docs/29_full_audit.md, 2.4; proto/engine/10_levels_flow_menu.js, step).
// Раньше нужно было держать обоим: один ребёнок, уже видевший ролик, заставлял смотреть второго. Теперь хватает одного — секунду удержания
// (ролик пропускается не мгновенно), нажатия «вразнобой» не пропускают, без удержания ролик идёт.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(20);U.nocine();ZC.tick(30);
window.BAD=[];window.RES=[];
window.startCine=()=>{ZC.FIN.vox.cine({dur:40,shots:[{t:0,p:[0,4,12],l:[0,1,0]}]});ZC.tick(60);return !!ZC.G.cine;};   // секунда ролика — подпись пропуска уже показана
// держать клавишу кадров frames; вернуть, на каком кадре удержания ролик кончился (0 — не кончился)
window.holdTest=(keys,frames)=>{if(!startCine())return -1;keys.forEach(k=>ZC.hold(k,true));let at=0;for(let f=1;f<=frames;f++){ZC.tick(1);if(!ZC.G.cine){at=f;break;}}keys.forEach(k=>ZC.hold(k,false));
  if(ZC.G.cine){ZC.skip();ZC.tick(3);}ZC.tick(5);return at;};
window.chk=(name,ok,info)=>{RES.push(name+': '+info);if(!ok)BAD.push(name+': '+info);};
'ok'
//@@
const a=holdTest([U.K[0].j],150);chk('держит только Игрок 1',a>=55&&a<=80,'ролик кончился на '+a+'-м кадре удержания (≈ 1 с = 60)');
const b=holdTest([U.K[1].j],150);chk('держит только Игрок 2',b>=55&&b<=80,'ролик кончился на '+b+'-м кадре удержания');
const c=holdTest([U.K[0].j,U.K[1].j],150);chk('держат оба',c>=55&&c<=80,'ролик кончился на '+c+'-м кадре удержания');
const d=holdTest([],200);chk('никто не держит',d===0,'ролик '+(d===0?'идёт':'кончился на '+d+'-м кадре'));
RES.join(' · ')
//@@
// «вразнобой»: нажатия на один кадр через кадр (не удержание) не пропускают; короткое удержание 0,5 с — тоже
let skipped=false;if(startCine()){for(let i=0;i<120;i++){ZC.hold(U.K[0].j,i%2===0);ZC.tick(1);if(!ZC.G.cine){skipped=true;break;}}ZC.hold(U.K[0].j,false);if(ZC.G.cine){ZC.skip();ZC.tick(3);}}
chk('нажатия вразнобой',!skipped,skipped?'ролик пропущен':'ролик идёт');
let short=false;if(startCine()){ZC.hold(U.K[1].j,true);for(let i=0;i<30;i++){ZC.tick(1);if(!ZC.G.cine){short=true;break;}}ZC.hold(U.K[1].j,false);ZC.tick(90);short=short||!ZC.G.cine;if(ZC.G.cine){ZC.skip();ZC.tick(3);}}
chk('удержание 0,5 с',!short,short?'ролик пропущен':'ролик идёт (полоска спадает)');
// одиночный режим — как раньше: держит тот, кем играешь
ZC.setSolo(true);ZC.tick(5);const s1=holdTest([U.K[0].j],150);chk('одиночный режим',s1>=55&&s1<=80,'ролик кончился на '+s1+'-м кадре удержания');ZC.setSolo(false);ZC.tick(5);
if(window._errs.length)BAD.push('ошибки консоли: '+window._errs.slice(0,2).join(' | '));
if(BAD.length)throw new Error('FAIL tfin_skipany: '+BAD.join(' ; ')+' · '+RES.join(' · '));
'tfin_skipany ok · '+RES.join(' · ')
