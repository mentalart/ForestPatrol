//@@
// @timeout=1200
// Битва с Кощеем (сборка --k5epic): пролог «Через леса, через моря» — полёт на Горыныче клавишами обоих игроков, без отладочных
// побед: лес — к золотым обручам и буквам, мимо чернильных елей (стена — поверху); ущелье — обручи-ворота у скал, под мостом /
// над мостом, уйти от чернильной волны; море — вороны (огонь и щит в последний миг: отбитая капля сбивает ворона) и вожак (огонь
// обеих голов); над облаками — шары Кощея (свой цвет — свой огонь, золотой — оба разом); буквы-стены — в просвет к золотым
// кольцам (плывущая «О» — за просветом); «раз-два-три» — умение обоих на «три». Потом вступление и стадия 1: чёрные свечи видны и
// горят. Второй прогон — одним игроком (он ведёт обе головы).
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,300));_ce.apply(console,arguments);};}
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.E5=ZC.FIN.k5e;window.CHK=s=>{if(_errs.length)throw new Error(s+' — ошибки: '+_errs.slice(0,4).join(' / '));return s;};
window.KB=[{B:['KeyA','KeyD','KeyW','KeyS'],a:'KeyF',g:'KeyG',e:'KeyE'},{B:['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'],a:'Comma',g:'Period',e:'KeyL'}];
window.RUN={legs:[],last:'',i:0};
window.START=solo=>{ZC.setSolo(!!solo);E5.goStage(0);ZC.G.manual=true;ZC.tick(20);RUN.legs=[];RUN.last='';RUN.i=0;RUN.pis=solo?[0]:[0,1];return 'on='+E5.pro.on+' leg='+E5.pro.leg;};
// один кадр управления: куда рулить, когда стрелять, щит, «три»
window.CTRL=()=>{const P=E5.pro,D=P.dbg(),GP=D.GP,PIS=RUN.pis,solo=PIS.length===1;RUN.i++;if(P.leg!==RUN.last){RUN.legs.push(P.leg+'@'+(RUN.i/60).toFixed(0)+'s');RUN.last=P.leg;}
  let tx=0,ty=(D.YL[0]+D.YL[1])/2;const ahead=(z,a,b)=>GP.z-z>(a==null?-3:a)&&GP.z-z<b;
  if(P.leg==='forest'||P.leg==='gorge'||P.leg==='sea'){
    const pg=D.pages.filter(p=>p.t>1.1&&ahead(p.s.position.z,4,70)).sort((a,b)=>b.s.position.z-a.s.position.z)[0];if(pg){tx=pg.s.position.x-D.PX;ty=pg.s.position.y-D.PY;}
    const hp=D.hoops.filter(H=>!H.done&&ahead(H.z,1,90)).sort((a,b)=>b.z-a.z)[0];if(hp){tx=hp.u;ty=hp.y-D.PY;}
    const sp=D.spires.filter(s=>s.st>=1&&s.st<9&&ahead(s.z,-3,55));
    if(sp.some(s=>s.wall))ty=D.YL[1];else for(const s of sp)if(Math.abs(tx-s.u)<6||Math.abs(GP.x-s.u)<6){tx=Math.max(-13,Math.min(13,s.u+(GP.x>=s.u?8:-8)));}
    for(const R of D.rocks)if(!R.arch&&ahead(R.z,-3,40)&&Math.abs(tx-R.u)<6)tx=Math.max(-13,Math.min(13,R.u+(GP.x>=R.u?8:-8)));
    const ar=D.rocks.find(R=>R.arch&&ahead(R.z,-3,50));if(ar&&(!hp||hp.z<ar.z-3))ty=D.YL[0];}
  if(P.leg==='sea'||P.leg==='sky')for(const pi of PIS){const own=D.crows.some(c=>c.alive&&!c.leave&&(solo||c.pi===pi||c.lead))||D.orbs.some(o=>o.alive&&(o.gold||solo||o.pi===pi));if(own&&RUN.i%24===pi*12)ZC.press(KB[pi].a);
    for(const d of D.drops)if(!d.refl&&!d._bot&&(solo||d.pi===pi)&&d.dur-d.t<0.5){d._bot=true;ZC.press(KB[pi].g);}}
  if(P.leg==='write'){const L=D.letters.filter(L=>!L.passed).sort((a,b)=>b.z-a.z)[0];if(L){const S=D.GLY[L.ch],tta=(GP.z-L.z)/Math.max(D.GV.sp,1),ox=L.slide?Math.sin((L.t+tta)*1.15)*7:0,u=GP.x-ox,w=GP.y+D.PY-D.V0;
    const m=S.safe.slice().sort((a,b)=>Math.hypot(a[0]-u,a[1]-w)-Math.hypot(b[0]-u,b[1]-w))[0];tx=m[0]+ox;ty=D.V0+m[1]-D.PY;}}
  if(P.leg==='three'&&P.cnt){const B=solo?0.85:0.75;if(P.cnt.t>=2*B-0.03&&!P.cnt._bot){P.cnt._bot=true;for(const pi of PIS)ZC.press(KB[pi].e);}}
  const dx=tx-GP.x,dy=ty-GP.y;for(const pi of PIS){const B=KB[pi].B;ZC.hold(B[0],dx<-0.5);ZC.hold(B[1],dx>0.5);ZC.hold(B[2],dy>0.5);ZC.hold(B[3],dy<-0.5);}};
window.REL=()=>{for(const k of KB)k.B.forEach(b=>ZC.hold(b,false));};
// лететь, пока не выполнится cond (ролики пролога пропускаются)
window.FLY=(cond,max)=>{const P=E5.pro;for(let i=0;i<(max||60*120);i++){if(cond())return 't='+(i/60).toFixed(1);if(ZC.G.cine){if(i%3===0)ZC.skip();ZC.tick(1);continue;}if(P.on)CTRL();ZC.tick(1);}
  REL();throw new Error('FLY: не дождались; leg='+P.leg+' legs='+RUN.legs.join(',')+' z='+P.dbg().GP.z.toFixed(0)+' '+STAT()+' errs='+_errs.slice(0,3).join(' / '));};
window.STAT=()=>{const P=E5.pro;return 'букв='+P.got+' обручей='+P.hoops+' ударов='+P.hits+' волна догнала='+P.caught+' воронов='+P.crows+' шаров='+P.orbs+' сквозь букв='+P.clean+' попыток «три»='+P.tries;};
// конец: прошли все отрезки, стадия 1 началась, свечи видны
window.FINISH=(min)=>{const P=E5.pro;const r=[FLY(()=>!P.on,60*200),'legs='+RUN.legs.join(','),STAT()];REL();
  for(let i=0;i<60*60&&!(E5.cur===1&&!ZC.G.cine);i++){if(ZC.G.cine&&i%3===0)ZC.skip();ZC.tick(1);}ZC.tick(30);
  const C=ZC.W.dbg5e().candles;r.push('cur='+E5.cur,'свечи видны '+C.filter(c=>c.g.visible).length+'/'+C.length,'горят '+C.filter(c=>c.lit).length);
  const need=['forest','gorge','sea','sky','write','three','burn'].every(l=>RUN.legs.some(x=>x.startsWith(l)));
  if(!need||E5.cur!==1||C.some(c=>!c.g.visible)||P.crows<min.crows||P.orbs<min.orbs||P.clean<min.clean||P.hoops<min.hoops)throw new Error(r.join(' | '));return CHK(r.join(' | '));};
CHK(START(false))
//@@
// 1 «Через леса»: Горыныч летит, буквы и обручи ловятся
const P=E5.pro;CHK(FLY(()=>P.leg==='forest'&&P.hoops>=2)+' '+STAT())
//@@ shot=k5e_pro_forest.png
ZC.tick(1);
//@@
// 2 «Чернильная волна»: ущелье, волна за спиной
const P=E5.pro;CHK(FLY(()=>P.leg==='gorge'&&P.dbg().GP.z<-500)+' '+STAT()+' волна='+P.dbg().WV.d.toFixed(0))
//@@ shot=k5e_pro_gorge.png
ZC.tick(1);
//@@
// 3 «Через моря»: вороны прилетели, капля в полёте
const P=E5.pro;CHK(FLY(()=>P.leg==='sea'&&P.dbg().drops.some(d=>!d.refl&&d.t>0.6))+' '+STAT())
//@@ shot=k5e_pro_sea.png
ZC.tick(1);
//@@
// отбитая капля сбивает ворона (раньше «застревала»): ждём сбитого отбитой каплей
const P=E5.pro,k0=P.crows,r0=ZC.G.stats.parries;CHK(FLY(()=>P.crows>k0&&ZC.G.stats.parries>r0||P.leg!=='sea',60*40)+' '+STAT()+' отбито='+(ZC.G.stats.parries-r0))
//@@
// 4 «Над облаками»: шары Кощея
const P=E5.pro;CHK(FLY(()=>P.leg==='sky'&&P.dbg().orbs.some(o=>o.alive&&o.t>0.5))+' '+STAT())
//@@ shot=k5e_pro_sky.png
ZC.tick(1);
//@@
// 5 «Почерк Кощея»: буква написана и летит навстречу
const P=E5.pro;CHK(FLY(()=>P.leg==='write'&&P.dbg().letters.some(L=>!L.passed&&L.t>1.4))+' '+STAT())
//@@ shot=k5e_pro_write.png
ZC.tick(1);
//@@
// 6 «Раз-два-три» → туча прожжена → вступление → стадия 1; свечи видны
FINISH({crows:6,orbs:8,clean:6,hoops:12})
//@@ shot=k5e_pro_s1.png
ZC.tick(1);
//@@
// одним игроком: весь пролог и стадия 1
START(true);FINISH({crows:3,orbs:4,clean:3,hoops:5})
