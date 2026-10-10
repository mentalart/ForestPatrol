//@@ wait=1500
// релиз final06: 1-4 «Леший водит», три новых участка вдвоём. «Друг за друга» — ёлки тропки замирают только под взглядом с другой тропки
// (свой взгляд их не держит); «Хоровод ёлок» — в луче стоит ближнее кольцо, встал в проход замершего кольца — кольцо встаёт насовсем, у пня
// хоровод кланяется и открывает выход; «Леший водит по кругу» — на пне-эхо «Ау!» (клавиша зова), откликается настоящий выход: туда, пока
// огонёк горит, — следующая поляна; в ложный проход — назад к пню; три поляны — круг разорван.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=4242;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.F=()=>ZC.W.flags;window.K14=()=>ZC.W.k14;window.H=ZC.HERO;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.z.toFixed(1);
ZC.startFrom(ZC.LV('1-4'));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.tick(10);ZC.FIN.warp('lanes');ZC.tick(10);
['stage='+F().stage,'ring='+!!F().ringOpen,pos(U.act(0)),pos(U.act(1)),K14()?'k14 ok':'FAIL k14']
//@@
// «Друг за друга»: свой взгляд ёлки своей тропки не держит, взгляд с другой тропки — держит
const L=K14().laneW,r=[];const P=U.act(0),Q=U.act(1);
for(const h of [ZC.HERO.potap,ZC.HERO.yosha])h.firefly=0;
P.pos.set(-5,0,-103);Q.pos.set(5,0,-103);P.face=Math.PI;Q.face=Math.PI;ZC.tick(2);
const own=L.filter(l=>l.sd<0&&l.m.pos.z>-113&&l.m.pos.z<-104);r.push('own looked: frozen='+own.filter(l=>l.m.frozen).length+'/'+own.length);
const ok1=own.every(l=>!l.m.frozen);
Q.pos.set(1.5,0,-108.5);Q.face=-Math.PI/2;ZC.tick(2);const fr=L.filter(l=>l.sd<0&&l.m.frozen).map(l=>l.m.pos.z.toFixed(0));r.push('from right: frozen L '+fr.join(','));
r.push(ok1&&fr.length>=2?'gaze ok':'FAIL gaze');r
//@@
// проход тропок «чехардой»: один стоит у изгороди лицом к другой тропке, другой бежит до следующей ёлки — и меняются
const r=[];const P=U.act(0),Q=U.act(1);const steps=[[-106],[-111],[-116],[-121],[-127.5]];let bad=0;
const hold=(h,sd)=>{h.face=sd<0?-Math.PI/2:Math.PI/2;};
function run(pi,x,z,guard,gsd){for(let i=0;i<60*10;i++){hold(guard,gsd);if(U.step(pi,x,z,0.5)){U.rel(pi);return true;}ZC.tick(1);}U.rel(pi);return false;}
P.pos.set(-5,0,-102.5);Q.pos.set(5,0,-102.5);ZC.tick(2);
for(let k=0;k<4;k++){const zl=[-108.5,-113.5,-118.5,-124.5][k],zr=[-111,-116,-121,-126.5][k];
  // Прошка бежит по левой тропке, Пелагея держит её взглядом справа
  Q.pos.set(1.3,0,Math.min(Q.pos.z,zl+2));if(!run(0,-5,zl,Q,1)){bad++;r.push('L stuck '+pos(P));}
  // Пелагея бежит по правой, Прошка держит слева
  if(!run(1,5,zr,P,-1)){bad++;r.push('R stuck '+pos(Q));}}
P.pos.set(-1.5,0,P.pos.z);run(0,-3,-128.5,Q,1);run(1,3,-128.5,P,-1);
r.push(pos(P),pos(Q),'knocks? '+bad,(P.pos.z<-127&&Q.pos.z<-127&&!bad)?'lanes ok':'FAIL lanes');r
//@@
// «Хоровод ёлок»: Прошка смотрит на внешнее кольцо — внешнее стоит, внутренние кружат (заслонены)
ZC.FIN.warp('horo');ZC.tick(5);const hr=K14().horo,HC=K14().HC,r=[];const P=U.act(0),Q=U.act(1);
P.pos.set(0,0,HC.z+9.6);P.face=Math.PI;Q.pos.set(-9,0,HC.z+9.6);Q.face=0;const a0=hr.map(q=>q.a);ZC.tick(30);
const mv=hr.map((q,i)=>Math.abs(q.a-a0[i])>0.05);r.push('moving inner/mid/outer='+mv.join('/'));
r.push(!mv[2]&&mv[1]&&mv[0]?'occlude ok':'FAIL occlude');r
//@@
// сквозь ленту хоровода не пролезть никому — даже маленькому Йоше: идёт к пню прямо (не воротцами) — остаётся снаружи
const hr=K14().horo,HC=K14().HC,q=hr[2];U.toKind('yosha',1);const Y=U.act(1);const a=q.a+Math.PI;Y.pos.set(HC.x+Math.cos(a)*9.2,0,HC.z+Math.sin(a)*9.2);ZC.tick(2);
for(let i=0;i<60*4;i++){for(const h of[U.act(0)])h.face=0;U.step(1,HC.x,HC.z,0.3);ZC.tick(1);}U.rel(1);const rh=Math.hypot(Y.pos.x-HC.x,Y.pos.z-HC.z);U.toKind('pelageya',1);
['yosha rh='+rh.toFixed(2)+' (кольцо R='+q.R+')',rh>q.R?'band ok':'FAIL band']
//@@
// встать в проход кольца, пока оно замерло под взглядом друга — кольцо встаёт насовсем; так все три — и к пню
const hr=K14().horo,HC=K14().HC,r=[];const P=U.act(0),Q=U.act(1);
function lockOne(q){// Пелагея ждёт, пока проход кольца окажется против неё, и смотрит на кольцо; Прошка входит в проход
  for(let i=0;i<60*40&&!q.locked;i++){const gx=HC.x+Math.cos(q.a)*q.R,gz=HC.z+Math.sin(q.a)*q.R;
    // друг стоит снаружи кольца у прохода и смотрит на него
    const ox=HC.x+Math.cos(q.a)*(q.R+1.6),oz=HC.z+Math.sin(q.a)*(q.R+1.6);
    if(!q.moving||i%30===0){}
    Q.pos.set(ox,0,oz);Q.face=Math.atan2(gx-ox,gz-oz);P.pos.set(gx,0,gz);P.vel.set(0,0,0);ZC.tick(1);}
  return q.locked;}
for(const k of[2,1,0]){const ok=lockOne(hr[k]);r.push('ring'+k+' '+(ok?'locked':'NO'));}
{const q=hr[0],gx=HC.x+Math.cos(q.a)*(q.R+1.2),gz=HC.z+Math.sin(q.a)*(q.R+1.2);P.pos.set(gx,0,gz);ZC.tick(2);U.goto(0,HC.x+Math.cos(q.a)*0.9,HC.z+Math.sin(q.a)*0.9,4,0.3);ZC.tick(30);}   // к пню — через воротца внутреннего кольца

r.push('horoDone='+!!F().horoDone,'link='+(K14().link4.taken?1:0),F().horoDone&&K14().link4.taken?'horo ok':'FAIL horo');r
//@@
// «Леший водит по кругу»: Пелагея на пне-эхо аукает, Прошка у проходов бежит к золотому огоньку; ложный проход — назад
ZC.tick(120);ZC.FIN.warp('krug');ZC.tick(10);const KG=K14().KG,r=[];const P=U.act(0),Q=U.act(1);
Q.pos.set(KG.stump.x,0,KG.stump.z);Q.vel.set(0,0,0);ZC.tick(5);
// ложный проход без зова — назад к началу, счёт не растёт
P.pos.set(KG.gaps[(KG.tru+1)%4],0,-184);U.goto(0,P.pos.x,-188,4,0.3);ZC.tick(60);r.push('wrong: loop='+KG.loop+' '+pos(P));const okWrong=KG.loop===0&&P.pos.z>-162;
for(let n=0;n<3;n++){P.pos.set(0,0,-183.5);P.vel.set(0,0,0);Q.pos.set(KG.stump.x,0,KG.stump.z);ZC.tick(3);ZC.press('Digit0');ZC.tick(2);
  const g=KG.gaps[KG.tru];r.push('call lit='+KG.lit.toFixed(1)+' true='+KG.tru);U.goto(0,g,-184.5,3,0.3);U.goto(0,g,-188,3,0.3);ZC.tick(50);r.push('loop='+KG.loop+' '+pos(P));}
r.push('krugDone='+!!F().krugDone,(okWrong&&F().krugDone)?'krug ok':'FAIL krug');r
//@@
// одиночный режим: оставленный на пне герой аукает сам
ZC.startFrom(ZC.LV('1-4'));ZC.G.manual=true;ZC.tick(30);U.nocine();ZC.setSolo(true);ZC.tick(5);ZC.FIN.warp('krug');ZC.tick(5);
const KG=ZC.W.k14.KG,r=[];U.toKind('pelageya');ZC.tick(2);const pe=ZC.HERO.pelageya;pe.pos.set(KG.stump.x,0,KG.stump.z);pe.vel.set(0,0,0);ZC.tick(3);
U.toKind('proshka');ZC.tick(2);const P=U.me();P.pos.set(0,0,-180);ZC.tick(2);const u=U.until(()=>KG.lit>0,6);r.push('auto call '+u,'keeper='+pos(pe)+' f='+pe.following);
r.push(u!=='TIMEOUT'?'solo ok':'FAIL solo','errs='+_errs.length+(_errs[0]?' '+_errs[0]:''));r
