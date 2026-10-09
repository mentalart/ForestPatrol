//@@ wait=1500
// релиз final06: напарник-бот проходит 4-3 «Эй, ухнем» за Игрока 2 (Пелагея и Йоша): встаёт в кольцо лямки (второй герой держит своё сам), жмёт «ух-нем» по часам песни,
// у брёвен прыгает активным и, поменявшись, оставленным; в гору активный бегает за углём (клещи) и бросает в топку баржи, пока оставленный держит лямку. Человека (Игрок 1) играет скрипт: в кольце, на «ух-нем» и прыжок у брёвен.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0])+' '+String(a[1]&&a[1].stack||a[1]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.H=ZC.HERO;window.F=()=>ZC.W.flags;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1)+(h.carry&&!h.carry.gone?'+'+h.carry.kind:'');
window.RESET43=()=>{for(let t=0;t<4;t++){ZC.startFrom(ZC.LV('4-3'));ZC.G.manual=true;ZC.tick(30);if(ZC.W.levelId==='4-3')break;}ZC.skip();ZC.tick(10);U.nocine();ZC.tick(5);CO.set(true);CO.skill=1;ZC.tick(20);window.H=ZC.HERO;window._hk=-9;return F().stage;};
// человек: на «ух-нем» жмёт умение, у брёвен прыгает активным или меняет героя (как t43)
window.HUM=()=>{const W=ZC.W,S=W.song;if(!S)return;const u=((S.t%2.6)+2.6)%2.6,k=Math.floor(S.t/2.6);
  if(u>1.05&&u<1.4&&k!==window._hk){window._hk=k;ZC.press('KeyE');
    const near=W.RINGS.filter(r=>r.hero&&r.hero.player===0&&(r.blocked||W.LOGS.some(L=>!L.gone&&r.z>L.z+0.25&&r.z<L.z+4.9)));
    if(near.some(r=>r.hero.active))ZC.press('Space');else if(near.length)ZC.press('KeyQ');}};
RESET43();
['stage='+F().stage,'bot='+pos(bot()),'me='+pos(me()),CO.mode,!!CO.routes['4-3']]
//@@
// лямка и брёвна: бот встаёт в кольцо, ухает по часам, прыгает у каждого бревна (активным и оставленным); баржа доходит до горки
if(!CO.routes['4-3'])throw new Error('нет маршрута 4-3');RESET43();const W=ZC.W,F2=F();
U.walkTo(0,W.RINGS[2].x,W.RINGS[2].z,3);const L=[];let lm='';
for(let i=0;i<60*240&&F2.stage==='pull';i++){ZC.tick(1);HUM();if(CO.mode!==lm){L.push((i/60).toFixed(0)+'s '+CO.mode+' '+pos(bot()));lm=CO.mode;}}
if(F2.stage==='pull')throw new Error('баржа не дошла до горки: B='+W.BARGE.z.toFixed(1)+' '+W.RINGS.map(r=>r.i+':'+(r.hero?r.hero.kind+(r.hero.active?'*':''):'-')+'@'+r.z.toFixed(1)+(r.blocked?'B':'')).join(' ')+' '+CO.mode);
'pull ok stage='+F2.stage+' B='+W.BARGE.z.toFixed(1)+' rings='+W.RINGS.map(r=>r.hero?r.hero.kind:'-').join(',')
//@@
// в гору: оба героя Игрока 2 — один в кольце, активный бегает за углём (клещи) и бросает в топку баржи; баржа доходит до кузни
RESET43();const W=ZC.W,F2=F();
// как будто лямка уже дотянула до горки: все в кольцах, бревна позади
W.BARGE.z=-33;W.BARGE.tz=-33;for(const L of W.LOGS){L.gone=true;L.c.on=false;}ZC.tick(5);
const Pr=H.proshka,Po=H.potap,Pe=H.pelageya,Yo=H.yosha;const R=W.RINGS;
const place=(h,r)=>{h.pos.set(r.x,r.y,r.z);h.vel.set(0,0,0);};
ZC.tick(2);[Po,Pr,Pe,Yo].forEach((h,i)=>{place(h,W.RINGS[i]);});
for(let i=0;i<60*8&&F2.stage==='pull';i++){ZC.tick(1);HUM();}
if(F2.stage!=='hill')throw new Error('нет стадии hill: '+F2.stage+' B='+W.BARGE.z.toFixed(1));
const L=[];let lm='',coal=0,lastF=0;
for(let i=0;i<60*120&&F2.stage==='hill';i++){ZC.tick(1);HUM();if(CO.mode!==lm){L.push((i/60).toFixed(0)+'s '+CO.mode+' '+pos(bot())+' fire='+W.FIRE.t.toFixed(0)+' B='+W.BARGE.z.toFixed(1));lm=CO.mode;}
  if(W.FIRE.t>lastF+5)coal++;lastF=W.FIRE.t;}
if(F2.stage==='hill')throw new Error('баржа не дошла до кузни: B='+W.BARGE.z.toFixed(1)+' fire='+W.FIRE.t.toFixed(1)+' '+pos(bot())+' '+CO.mode+' '+L.slice(-5).join(' | '));
'hill ok stage='+F2.stage+' coals='+coal+' B='+W.BARGE.z.toFixed(1)
//@@
// у кузни: ролик, уровень пройден; ошибок в консоли нет
const F3=F();for(let i=0;i<60*60&&!F3.out;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(1);HUM();}
if(!F3.out)throw new Error('уровень не завершён: stage='+F3.stage+' '+pos(bot())+' '+CO.mode);if(window._errs.length)throw new Error('ошибки: '+window._errs.slice(0,3).join(' | '));
'end ok out='+F3.out
