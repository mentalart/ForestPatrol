//@@
// @timeout=900
// Битва с Кощеем (сборка --k5epic): пролог «Через леса, через моря» — полёт на Горыныче клавишами обоих игроков, без отладочных
// побед: руль к золотым буквам, мимо чернильных елей (стена — поверху), вороны — огонь и щит в последний миг, буквы-стены Кощея —
// в просвет к золотым кольцам, «раз-два-три» — умение обоих на «три». Потом вступление и стадия 1: чёрные свечи видны и горят.
// Второй прогон — одним игроком (он ведёт обе головы).
window._errs=[];window.addEventListener('error',e=>_errs.push(String(e.message)));{const _ce=console.error;console.error=function(){_errs.push([...arguments].map(String).join(' ').slice(0,300));_ce.apply(console,arguments);};}
{const o=document.getElementById('k5eStart');if(o)o.remove();}
window.E5=ZC.FIN.k5e;window.CHK=s=>{if(_errs.length)throw new Error(s+' — ошибки: '+_errs.slice(0,4).join(' / '));return s;};
window.KB=[{B:['KeyA','KeyD','KeyW','KeyS'],a:'KeyF',g:'KeyG',e:'KeyE'},{B:['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'],a:'Comma',g:'Period',e:'KeyL'}];
window.RUN={legs:[],last:'',i:0};
window.START=solo=>{ZC.setSolo(!!solo);E5.goStage(0);ZC.G.manual=true;ZC.tick(20);RUN.legs=[];RUN.last='';RUN.i=0;RUN.pis=solo?[0]:[0,1];return 'on='+E5.pro.on+' leg='+E5.pro.leg;};
// один кадр управления: куда рулить, когда стрелять, щит, «три»
window.CTRL=()=>{const P=E5.pro,D=P.dbg(),GP=D.GP,PIS=RUN.pis;RUN.i++;if(P.leg!==RUN.last){RUN.legs.push(P.leg+'@'+(RUN.i/60).toFixed(0)+'s');RUN.last=P.leg;}
  let tx=0,ty=(D.YL[0]+D.YL[1])/2;
  if(P.leg==='forest'||P.leg==='sea'){const pg=D.pages.filter(p=>p.t>1.1&&p.s.position.z<GP.z-4&&GP.z-p.s.position.z<70).sort((a,b)=>b.s.position.z-a.s.position.z)[0];
    if(pg){tx=pg.s.position.x-D.PX;ty=pg.s.position.y-D.PY;}
    const sp=D.spires.filter(s=>s.st>=1&&s.st<9&&GP.z-s.z>-3&&GP.z-s.z<55);
    if(sp.some(s=>s.wall))ty=D.YL[1];else for(const s of sp)if(Math.abs(tx-s.u)<6||Math.abs(GP.x-s.u)<6){tx=Math.max(-13,Math.min(13,s.u+(GP.x>=s.u?8:-8)));}}
  if(P.leg==='sea'){for(const pi of PIS){const own=D.crows.some(c=>c.alive&&!c.leave&&(RUN.pis.length===1||c.pi===pi));if(own&&RUN.i%24===pi*12)ZC.press(KB[pi].a);
      for(const d of D.drops)if(!d.refl&&!d._bot&&(RUN.pis.length===1||d.pi===pi)&&d.dur-d.t<0.5){d._bot=true;ZC.press(KB[pi].g);}}}
  if(P.leg==='write'){const L=D.letters.filter(L=>!L.passed).sort((a,b)=>b.z-a.z)[0];if(L){const S=D.GLY[L.ch],u=GP.x,w=GP.y+D.PY-D.V0;const m=S.safe.slice().sort((a,b)=>Math.hypot(a[0]-u,a[1]-w)-Math.hypot(b[0]-u,b[1]-w))[0];tx=m[0];ty=D.V0+m[1]-D.PY;}}
  if(P.leg==='three'&&P.cnt){const B=RUN.pis.length===1?0.85:0.75;if(P.cnt.t>=2*B-0.03&&!P.cnt._bot){P.cnt._bot=true;for(const pi of PIS)ZC.press(KB[pi].e);}}
  const dx=tx-GP.x,dy=ty-GP.y;for(const pi of PIS){const B=KB[pi].B;ZC.hold(B[0],dx<-0.5);ZC.hold(B[1],dx>0.5);ZC.hold(B[2],dy>0.5);ZC.hold(B[3],dy<-0.5);}};
window.REL=()=>{for(const k of KB)k.B.forEach(b=>ZC.hold(b,false));};
// лететь, пока не выполнится cond (ролики пролога пропускаются)
window.FLY=(cond,max)=>{const P=E5.pro;for(let i=0;i<(max||60*120);i++){if(cond())return 't='+(i/60).toFixed(1);if(ZC.G.cine){if(i%3===0)ZC.skip();ZC.tick(1);continue;}if(P.on)CTRL();ZC.tick(1);}
  REL();throw new Error('FLY: не дождались; leg='+P.leg+' legs='+RUN.legs.join(',')+' z='+P.dbg().GP.z.toFixed(0)+' errs='+_errs.slice(0,3).join(' / '));};
window.STAT=()=>{const P=E5.pro;return 'букв='+P.got+' ударов='+P.hits+' воронов='+P.crows+' сквозь букв='+P.clean+' попыток «три»='+P.tries;};
CHK(START(false))
//@@
// 1 «Через леса»: Горыныч летит, буквы ловятся
const P=E5.pro;CHK(FLY(()=>P.leg==='forest'&&P.got>=2)+' '+STAT())
//@@ shot=k5e_pro_forest.png
ZC.tick(1);
//@@
// 2 «Через моря»: вороны прилетели, капля в полёте
const P=E5.pro;CHK(FLY(()=>P.leg==='sea'&&P.dbg().drops.some(d=>!d.refl&&d.t>0.6))+' '+STAT())
//@@ shot=k5e_pro_sea.png
ZC.tick(1);
//@@
// 3 «Почерк Кощея»: буква написана и летит навстречу
const P=E5.pro;CHK(FLY(()=>P.leg==='write'&&P.dbg().letters.some(L=>!L.passed&&L.t>1.4))+' '+STAT())
//@@ shot=k5e_pro_write.png
ZC.tick(1);
//@@
// 4 «Раз-два-три» → туча прожжена → вступление → стадия 1; свечи видны
const P=E5.pro;const r=[FLY(()=>!P.on,60*90),'legs='+RUN.legs.join(','),STAT()];REL();
for(let i=0;i<60*60&&!(E5.cur===1&&!ZC.G.cine);i++){if(ZC.G.cine&&i%3===0)ZC.skip();ZC.tick(1);}ZC.tick(30);
const C=ZC.W.dbg5e().candles;r.push('cur='+E5.cur,'свечи видны '+C.filter(c=>c.g.visible).length+'/'+C.length,'горят '+C.filter(c=>c.lit).length);
const need=['forest','sea','write','three','burn'].every(l=>RUN.legs.some(x=>x.startsWith(l)));
if(!need||E5.cur!==1||C.some(c=>!c.g.visible)||P.crows<4||P.clean<3||P.got<5)throw new Error(r.join(' | '));CHK(r.join(' | '))
//@@ shot=k5e_pro_s1.png
ZC.tick(1);
//@@
// одним игроком: весь пролог и стадия 1
const r=[START(true)];const P=E5.pro;r.push(FLY(()=>!P.on,60*200),'legs='+RUN.legs.join(','),STAT());REL();
for(let i=0;i<60*60&&!(E5.cur===1&&!ZC.G.cine);i++){if(ZC.G.cine&&i%3===0)ZC.skip();ZC.tick(1);}ZC.tick(30);
const C=ZC.W.dbg5e().candles;r.push('cur='+E5.cur,'свечи видны '+C.filter(c=>c.g.visible).length+'/'+C.length);
if(E5.cur!==1||C.some(c=>!c.g.visible)||!RUN.legs.some(x=>x.startsWith('burn')))throw new Error(r.join(' | '));CHK(r.join(' | '))
