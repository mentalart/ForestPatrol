//@@
// релиз: буфер ввода (docs/29_full_audit.md, 7.1; proto/engine/04_physics_actions.js, INBUF). Прыжок, нажатый за ≤ 0,12 с до приземления, и
// удар, нажатый за ≤ 0,15 с до конца отдачи прошлого удара, не пропадают; нажатые раньше — сгорают; один прыжок и один удар по одному нажатию.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;ZC.tick(20);U.nocine();ZC.tick(60);
window.H=U.act(0);window.KJ=U.K[0].j;window.KA=U.K[0].a;
window.BAD=[];window.RES=[];
// прыжок: нажать, потом в воздухе нажать ещё раз за tl секунд до приземления (по формуле падения, g = 25); вернуть, прыгнул ли герой второй раз
window.jumpTest=tl=>{ZC.tick(60);const gy=H.pos.y;ZC.press(KJ);ZC.tick(1);let pressed=tl==null,landedAt=-1;
  for(let n=0;n<260;n++){const vy=H.vel.y,rem=(vy+Math.sqrt(Math.max(0,vy*vy+2*25*(H.pos.y-gy))))/25;
    if(!pressed&&!H.grounded&&rem<=tl){ZC.press(KJ);pressed=true;}
    ZC.tick(1);
    if(landedAt<0&&H.grounded&&n>3)landedAt=n;
    if(landedAt>=0&&!H.grounded&&H.vel.y>5)return true;
    if(landedAt>=0&&n-landedAt>8)return false;}
  return false;};
// удар: нажать, через ta секунд нажать ещё раз; вернуть число ударов за 0,9 с (новый удар — перезарядка atkCd снова 0,36)
window.atkTest=ta=>{ZC.tick(60);let n=0,prev=H.atkCd;ZC.press(KA);const f2=ta==null?-1:Math.round(ta*60);
  for(let f=0;f<54;f++){if(f===f2)ZC.press(KA);ZC.tick(1);if(H.atkCd>prev+0.1)n++;prev=H.atkCd;}return n;};
window.chk=(name,got,want)=>{RES.push(name+'='+got);if(got!==want)BAD.push(name+': '+got+', нужно '+want);};
'ok'
//@@
// второе нажатие прыжка за 0,02 / 0,05 / 0,08 с до приземления — прыжок; за 0,16 / 0,25 с и без второго нажатия — нет
chk('прыжок за 0,02 с',jumpTest(0.02),true);chk('прыжок за 0,05 с',jumpTest(0.05),true);chk('прыжок за 0,08 с',jumpTest(0.08),true);
chk('прыжок за 0,16 с (рано)',jumpTest(0.16),false);chk('прыжок за 0,25 с (рано)',jumpTest(0.25),false);chk('один прыжок',jumpTest(null),false);
RES.join(' · ')
//@@
// второе нажатие удара через 0,25 / 0,30 / 0,34 с (отдача 0,36 с, окно 0,15 с) — второй удар сразу, как отдача кончилась; через 0,10 с — сгорает; без второго — один
chk('удар +0,25 с',atkTest(0.25),2);chk('удар +0,30 с',atkTest(0.30),2);chk('удар +0,34 с',atkTest(0.34),2);chk('удар +0,45 с',atkTest(0.45),2);
chk('удар +0,10 с (рано)',atkTest(0.10),1);chk('один удар',atkTest(null),1);
RES.join(' · ')
//@@
if(window._errs.length)BAD.push('ошибки консоли: '+window._errs.slice(0,2).join(' | '));
if(BAD.length)throw new Error('FAIL tfin_inbuf: '+BAD.join(' ; '));
'tfin_inbuf ok · '+RES.join(' · ')
