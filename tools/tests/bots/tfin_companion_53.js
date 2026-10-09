//@@ wait=1500
// релиз final06: напарник-бот проходит 5-3 «Утка» за Игрока 2 (правая голова Горыныча): курс берёт у человека, огнём бьёт воронов, щитом отбивает синие перья своей головы, на тучах Кощея жмёт «умение» ровно на «три».
// Человека (Игрок 1) играет скрипт: левая голова — огонь по воронам, щит на свои перья, «три» на тучах.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0])+' '+String(a[1]&&a[1].stack||a[1]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.bot=()=>U.act(1);window.me=()=>U.act(0);window.H=ZC.HERO;window.F=()=>ZC.W.flags;
window.pos=h=>h.kind+'@'+h.pos.x.toFixed(1)+','+h.pos.y.toFixed(1)+','+h.pos.z.toFixed(1);
window.RESET53=()=>{for(let t=0;t<4;t++){ZC.startFrom(ZC.LV('5-3'));ZC.G.manual=true;ZC.tick(30);if(ZC.W.levelId==='5-3')break;}for(let i=0;i<30&&ZC.G.cine;i++){ZC.skip();ZC.tick(10);}U.nocine();ZC.tick(5);CO.set(true);CO.skill=1;ZC.tick(20);window.H=ZC.HERO;window.S={fire:0,g:new Set()};return F().stage;};
// человек: огонь левой головы по воронам, щит на свои перья, «три» на тучах
window.HUM=()=>{const W=ZC.W;if(ZC.G.cine||F().stage!=='fly'||!W.k53)return;
  if(W.k53.crows.some(c=>c.alive&&!c.leave)&&ZC.G.time>S.fire){S.fire=ZC.G.time+0.5;ZC.press('KeyF');}
  for(const fe of W.k53.feathers){if(fe.pi!==0||fe.refl||S.g.has(fe))continue;const left=fe.dur-fe.t;if(left<=0.55&&left>0.05){S.g.add(fe);ZC.press('KeyG');}}
  for(const cl of W.CLOUDS){if(cl.state==='count'&&cl.press[0]===null&&cl.t>=1.37&&cl.t<1.8)ZC.press('KeyE');}
  // утка: тянет в сторону утки (бот берёт курс у человека); иначе — прямо
  const F2=F(),GP=W.GP;if(F2.duck){const dx=W.DK.pos.x-GP.x,dy=W.DK.pos.y-6.5-GP.y;ZC.hold('KeyA',dx<0);ZC.hold('KeyD',dx>=0);ZC.hold('KeyW',dy>=0);ZC.hold('KeyS',dy<0);}};   // всегда куда-то тянем — вдвоём в одну сторону дольше секунды: разгон
window.HOFF=()=>['KeyA','KeyD','KeyW','KeyS'].forEach(k=>ZC.hold(k,false));
RESET53();
['stage='+F().stage,'bot='+pos(bot()),'me='+pos(me()),CO.mode,!!CO.routes['5-3']]
//@@
// полёт: вороны, тучи Кощея (три «раз-два-три»), кольца — до утки; на счёте «три» бот и человек успевают вместе
if(!CO.routes['5-3'])throw new Error('нет маршрута 5-3');const W=ZC.W,F2=F();const L=[];let lm='',burn=0;
for(let i=0;i<60*420&&F2.stage==='fly';i++){HUM();ZC.tick(1);if(CO.mode!==lm){L.push((i/60).toFixed(0)+'s '+CO.mode);lm=CO.mode;}}
HOFF();const gone=W.CLOUDS.filter(c=>c.state==='gone'||c.state==='burn').length;
if(F2.stage==='fly')throw new Error('до утки не долетели: z='+W.GP.z.toFixed(0)+' тучи='+gone+'/3 вороны сбиты='+(F2.crowsDown||0)+' '+CO.mode+' '+L.slice(-4).join(' | '));
if(gone<3)throw new Error('тучи не прожжены: '+gone+'/3');
'fly ok stage='+F2.stage+' clouds='+gone+'/3 crows='+(F2.crowsDown||0)+' pet='+ZC.players[1].petals
//@@
// финал: Горыныч ловит утку, яйцо у Пелагеи, уровень пройден; ошибок в консоли нет
const F3=F();for(let i=0;i<60*60&&!F3.out;i++){if(ZC.G.cine){ZC.skip();ZC.tick(5);}ZC.tick(1);}
if(!F3.out)throw new Error('уровень не завершён: stage='+F3.stage+' '+CO.mode);if(window._errs.length)throw new Error('ошибки: '+window._errs.slice(0,3).join(' | '));
'end ok out='+F3.out
