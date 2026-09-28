//@@
// релиз final02, кино: режиссёр камеры, наезды на говорящих, whip, slow-mo без удлинения ролика, выход, пропуск, постановка пролога, герои на земле
window._ev={};['start','end','cut','whip','dip','iris','blendIn','blendOut','insert','say','emote','accent','impact','slowmo','hitstop','punch','dollyzoom'].forEach(n=>ZC.FIN.cine.on(n,()=>{window._ev[n]=(window._ev[n]||0)+1;}));
window.T=t=>{for(let i=0;i<5000&&!(ZC.G.cine&&ZC.G.cine.t>=t);i++)ZC.tick(1);return ZC.G.cine?ZC.G.cine.t:-1;};
ZC.startFrom(ZC.LV('4-B'));ZC.G.manual=true;let n=0;while(!ZC.G.cine&&n<60){ZC.tick(1);n++;}const st=ZC.FIN.cine.state();['cine='+!!ZC.G.cine,'entry='+st.entry,'fovHook='+(ZC.FIN.fovNow()!==null)].join(' ')
//@@ shot=fin_cine_4b_a.png
T(5.4);const a=ZC.FIN.cine.state();T(9.4);const b=ZC.FIN.cine.state();T(13.4);const c=ZC.FIN.cine.state();['focus5='+a.focus,'focus9='+b.focus,'focus13='+c.focus,'size13='+c.size].join(' ')
//@@ shot=fin_cine_4b_b.png
// длина ролика в тиках: акценты «в долг» не должны удлинять ролик
let k=0;const t0=ZC.G.cine.t;while(ZC.G.cine&&k<3000){ZC.tick(1);k++;}const exp=(20-t0)*60;const e1=ZC.FIN.cine.state();['ticksToEnd='+k,'expected~'+Math.round(exp),'ok='+(Math.abs(k-exp)<45),'exit='+e1.exit,'whips='+(window._ev.whip||0)].join(' ')
//@@
ZC.tick(90);const H=ZC.HERO;['exitDone='+!ZC.FIN.cine.state().exit,'grounded='+[H.proshka,H.potap,H.pelageya,H.yosha].filter(h=>h.grounded&&h.pos.y>-1).length+'/4','fovAfter='+ZC.FIN.fovNow()].join(' ')
//@@
// пропуск ролика: затемнение, без выезда камеры
ZC.startFrom(ZC.LV('4-B'));ZC.G.manual=true;T(2);const d0=window._ev.dip||0;ZC.skip();ZC.tick(3);['skipped cine='+!!ZC.G.cine,'dip='+((window._ev.dip||0)>d0),'exit='+ZC.FIN.cine.state().exit].join(' ')
//@@
// пролог: колыбельная под авторской режиссурой
ZC.startFrom(ZC.LV('p'));ZC.G.manual=true;ZC.tick(20);const P=ZC.players;P[0].heroes[P[0].act].pos.set(-2,0,1.4);P[1].heroes[P[1].act].pos.set(2.2,0,1.4);ZC.tick(80);
const e0=Object.assign({},window._ev);T(21.5);const s21=ZC.FIN.cine.state();['prologue directed='+ZC.FIN.cine.CD().directed,'dollyFov='+s21.fov,'dz='+((window._ev.dollyzoom||0)>(e0.dollyzoom||0)),'impact='+((window._ev.impact||0)>(e0.impact||0)),'emotes='+((window._ev.emote||0)-(e0.emote||0))].join(' ')
//@@ shot=fin_cine_prologue.png
T(33);['confetti accent='+((window._ev.accent||0)>(0)),'slowmo='+(window._ev.slowmo||0),'focus='+ZC.FIN.cine.state().focus,'particles='+ZC.FIN.fx.list.length].join(' ')
//@@
Object.keys(window._ev).sort().map(k=>k+':'+window._ev[k]).join(' ')
