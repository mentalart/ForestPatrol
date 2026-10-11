//@@ wait=1500
// @timeout=1500
// релиз final06: напарник-бот проходит 3-5 «Гуси-лебеди» (docs/40) за Игрока 2. Туда: лиловые мостки без света, золотой — между лучами гуся (план), сторож — ждёт звона
// колокольчика, щит Потапа — идёт без света за Потапом, спящий гусь — тихо, яблонька — поливает, тучка — поливает облачко и идёт под ней, коса — по лиловой нити,
// речка — отпивает, пропасть — свет по очереди; двор Яги — Йоша к Тишке. Обратно: золотые — между волнами, речка — Совиный взор, укрытия — в круге; вожак — Совиный взор.
// Человека (Игрок 1) играет скрипт: звякает колокольчиком, ведёт Потапа под щитом, срывает яблочко, носит горшок мышке; на погоне идёт следом за ботом;
// в укрытиях встаёт в круг; вожака приманивает светом и сбивает узел рогаткой. Яга на погоне спит (её проверяет tfin_sky35). Гуси бота не поймали, падений нет.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.H=ZC.HERO;window.F=()=>ZC.W.flags;window.K=()=>ZC.W.k35;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1)+(h.lit?'*':'');
window.FALLS=()=>ZC.G.stats.falls||0;window.SH=()=>ZC.W.shelter35&&ZC.W.shelter35();
window.put=(h,x,z,y)=>{h.pos.set(x,y===undefined?0.05:y,z);h.vel.set(0,0,0);};
window.RESET35=()=>{ZC.startFrom(ZC.LV('3-5'));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(5);U.nocine();CO.set(true);CO.skill=1;ZC.tick(30);window.H=ZC.HERO;window.F0=FALLS();window.hs={};return 'stage='+F().stage;};
// партия человека
window.HUMAN=()=>{const f=F(),k=K(),b=bot(),P=H.proshka,Pt=H.potap;
  if(!f.back){
    // сторож: бот ждёт у мостка — звякнуть колокольчиком
    if(b.pos.z<-47&&b.pos.z>-50.5&&k.watch()<=0){const mk=ZC.W.marks.find(m=>Math.abs(m.pos.x+4.9)<0.1&&Math.abs(m.pos.z+61.2)<0.1);if(mk&&mk.active())mk.onHit();}
    // щит: бот у мостка — Потап светит из-под щита и шагает
    if(b.pos.z<-71.5&&b.pos.z>-84&&f.stoveOff){if(!hs.pt){hs.pt=1;U.toKind('potap',0);hs.pz=-72.2;}Pt.lit=true;ZC.hold('KeyG',true);if(b.pos.z<hs.pz+2.2)hs.pz=Math.max(-84.6,hs.pz-0.035);put(Pt,0,hs.pz);}
    else if(hs.pt===1&&b.pos.z<-84){hs.pt=2;ZC.hold('KeyG',false);Pt.lit=false;put(Pt,-3,-85);}
    // яблочко: подкинутый Прошка
    if(f.treeAsk1&&!f.appleEat){put(P,1.6,-103,2.9);P.grounded=false;P.vel.set(0,2,0);}
    // двор: горшок мышке
    if(f.yard&&f.mouseAsk&&!f.mouseFed&&!hs.pot){hs.pot=1;if(me().kind!=='proshka')U.toKind('proshka',0);put(P,-6.6,-203.8);ZC.tick(2);ZC.press('KeyE');ZC.tick(3);put(P,1.4,-204.4);ZC.tick(3);put(P,-2,-192);}
    if(f.yard&&!f.mouseAsk&&!hs.ask){hs.ask=1;put(me(),1,-203.4);ZC.tick(3);put(me(),-2,-192);}
    return;}
  // погоня: Яга спит; человек — следом за ботом
  k.yaga().nap=99;const S=SH();
  if(S){const z0=S.z;[P,Pt].forEach((h,i)=>{if(Math.hypot(h.pos.x-z0.x,h.pos.z-z0.z)>z0.r-0.5)put(h,z0.x-0.8+i*0.5,z0.z+(S.name==='tree'&&h===Pt?1.6:0.3));});if(S.name==='tree')put(Pt,0,-102.4);return;}
  if(f.stage==='back'){const h=me();if(h.lit)h.lit=false;if(b.grounded&&!(b.groundRef&&b.groundRef.tile)&&Math.hypot(h.pos.x-b.pos.x,h.pos.z-(b.pos.z-1))>0.3)put(h,b.pos.x+0.9,b.pos.z,b.pos.y+0.05);return;}
  if(f.stage==='boss'){const V=k.vz();if(me().kind!=='proshka')U.toKind('proshka',0);
    if(V.state==='circle'||V.state==='mark'){const tr=k.puddles.find(p=>!p.used);const bx=tr?tr.x:0,bz=tr?tr.z:-65.6;P.lit=true;put(P,bx,bz);}
    else if(V.state==='lock'){P.lit=false;put(P,V.lock.x+(V.lock.x<0?3.5:V.lock.x>0?-3.5:2.5),V.lock.z+2.5);}
    else if(V.state==='stove'){U.toKind('potap',0);put(Pt,0.4,-64.8);ZC.tick(1);ZC.press('KeyE');}
    else if(V.state==='stuck'&&V.seen&&!hs['k'+f.knots]){hs['k'+f.knots]=1;put(P,V.pos.x*0.6,Math.min(V.pos.z+4.5,-59));P.face=Math.atan2(V.pos.x*0.4,V.pos.z-Math.min(V.pos.z+4.5,-59));ZC.tick(1);P.face=Math.PI;ZC.tick(1);ZC.press('KeyE');}}};
window.PLAY=(max,until)=>{const L=[];let last='';for(let i=0;i<60*max&&!until();i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}HUMAN();ZC.tick(1);if(GEESE()!==window._gc){window._gc=GEESE();L.push('CAUGHT '+pos(bot())+' '+pos(me())+' '+CO.mode+' why='+K().yard().why+' kysh='+K().yard().caught);}if(F().riverAsk&&!window._ra){window._ra=1;L.push('RA '+ZC.HERO.proshka.pos.z.toFixed(1)+','+ZC.HERO.potap.pos.z.toFixed(1)+','+ZC.HERO.pelageya.pos.z.toFixed(1)+','+ZC.HERO.yosha.pos.z.toFixed(1)+' act0='+me().kind);}for(const hh of ZC.HEROES||Object.values(ZC.HERO)){if(hh.pos.y<-0.8&&!hh._dy){hh._dy=1;L.push('DROP '+pos(hh)+' '+CO.mode+' vz='+K().vz().state);}if(hh.pos.y>-0.2)hh._dy=0;}if(FALLS()!==window._fl){window._fl=FALLS();L.push('FALL '+pos(bot())+' '+pos(me()));}const m=CO.mode;if(m!==last){L.push((i/60).toFixed(0)+'s '+m+' '+pos(bot()));last=m;}}return L;};
window.GEESE=()=>ZC.G.stats.geese||0;
RESET35();window.G0=GEESE();
['stage='+F().stage,'bot='+pos(bot()),CO.mode,!!CO.routes['3-5']]
//@@
// туда: начало, сторож, печка, щит Потапа, спящий гусь — до яблоньки
if(!CO.routes['3-5'])throw new Error('нет маршрута 3-5');const L=PLAY(150,()=>bot().pos.z<-97.6);
if(!(bot().pos.z<-97.6))throw new Error('не дошла до яблоньки: '+pos(bot())+' '+L.join(' | '));if(!F().stoveOff)throw new Error('печка не угостила');
if(FALLS()-F0)throw new Error('падения: '+(FALLS()-F0)+' '+L.join(' | '));'→яблонька ok '+pos(bot())+' stoveOK='+!!F().stoveOK+' geese='+(GEESE()-G0)
//@@
// яблонька (поливает), тучка (облачко и под ней), коса (лиловая нить), речка (отпивает), пропасть — во двор Яги
const L=PLAY(160,()=>!!F().yard&&bot().pos.z<-190);
if(!(bot().pos.z<-190))throw new Error('не дошла до двора: '+pos(bot())+' falls='+(FALLS()-F0)+' geese='+(GEESE()-G0)+' appleOff='+F().appleOff+' tuch='+K().tuch().toFixed(1)+' '+L.join(' | '));
if(FALLS()-F0)throw new Error('падения: '+(FALLS()-F0)+' '+L.join(' | '));'→двор ok '+pos(bot())+' appleOK='+!!F().appleOK+' riverOK='+!!F().riverOK+' geese='+(GEESE()-G0)
//@@
// двор: горшок мышке (человек), Йоша к Тишке — погоня; обратно через пропасть между волнами, речка прячет
const L=PLAY(160,()=>!!F().riverDone&&!SH());
if(!F().back)throw new Error('погоня не началась: '+pos(bot())+' '+L.join(' | '));if(!F().riverDone)throw new Error('речка не пройдена: '+pos(bot())+' hollow='+F().hollow+' '+L.join(' | '));
if(FALLS()-F0)throw new Error('падения: '+(FALLS()-F0)+' '+L.join(' | '));'→речка ok '+pos(bot())+' lines='+F().lines+' geese='+(GEESE()-G0)
//@@
// обратно: коса, мосток тучки, яблонька прячет; спящий мосток, мосток щита, печка прячет — вожак
const L=PLAY(200,()=>F().stage==='boss');
if(F().stage!=='boss')throw new Error('до вожака не дошли: '+pos(bot())+' stage='+F().stage+' tree='+F().treeDone+' '+L.join(' | '));
if(FALLS()-F0)throw new Error('падения: '+(FALLS()-F0)+' '+L.join(' | '));'→вожак ok '+pos(bot())+' geese='+(GEESE()-G0)
//@@
// вожак: человек приманивает и сбивает узлы, бот — Совиный взор; конец уровня
const L=PLAY(150,()=>!!F().out);
if(!F().out)throw new Error('уровень не пройден: stage='+F().stage+' knots='+F().knots+' vz='+K().vz().state+' '+pos(bot())+' '+L.join(' | '));if(window._errs.length)throw new Error('ошибки: '+window._errs.slice(0,3).join(' | '));
if(GEESE()-G0)throw new Error('гуси или волны поймали: '+(GEESE()-G0)+' '+L.join(' | '));if(FALLS()-F0)throw new Error('падения: '+(FALLS()-F0)+' '+L.join(' | '));'finale ok out='+F().out+' links='+ZC.W.links+' falls='+(FALLS()-F0)
