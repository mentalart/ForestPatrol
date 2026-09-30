//@@ wait=1500
// релиз final06: пролог, ролик «Колыбельная» — Прошка несёт самокат Тишке, наступает на шишку, падает, самокат разваливается
// о ступеньку, все смеются (Йоша — с субтитром, Тишка, Потап и Пелагея — поверх), Прошка встаёт и смеётся над собой.
// Кадры по ходу сценки; проверки: ролик удлинён на 4,4 с и под авторской режиссурой, Прошка дошёл до шишки, самокат разбит,
// смех прозвучал, реплики по порядку, после сценки Прошка стоит, сюжет ролика после краха сдвинут (тень, звено, «Дзинь! Бежим!»).
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,160));ce(...a);};}
window.V=ZC.FIN.vox;V.audio();ZC.startFrom(ZC.LV('p'));ZC.G.manual=true;ZC.tick(20);
const P=ZC.players;P[0].heroes[P[0].act].pos.set(-2,0,1.4);P[1].heroes[P[1].act].pos.set(2.2,0,1.4);let n=0;while(!ZC.G.cine&&n<200){ZC.tick(1);n++;}
window.T=t=>{for(let i=0;i<6000&&ZC.G.cine&&ZC.G.cine.t<t;i++)ZC.tick(1);ZC.FIN.occ.frame();return ZC.G.cine?+ZC.G.cine.t.toFixed(2):-1;};
window._seq=[];window._last=null;window.TV=t=>{for(let i=0;i<6000&&ZC.G.cine&&ZC.G.cine.t<t;i++){ZC.tick(1);const c=V.cur;if(c&&c!==_last)_seq.push(c);_last=c;}ZC.FIN.occ.frame();return ZC.G.cine?+ZC.G.cine.t.toFixed(2):-1;};
const cd=ZC.FIN.cine.CD();['cine dur='+ZC.G.cine.dur,'directed='+(cd&&cd.directed)].join(' ')
//@@ shot=scooter_1.png
TV(14.6)+' — идёт к самокату, pr='+ZC.HERO.proshka.pos.x.toFixed(2)+','+ZC.HERO.proshka.pos.z.toFixed(2)
//@@ shot=scooter_2.png
TV(16.2)+' — несёт, holding='+!!ZC.HERO.proshka.held
//@@ shot=scooter_3.png
TV(17.3)+' — падает, самокат летит'
//@@ shot=scooter_4.png
TV(17.62)+' — самокат разбит: '+JSON.stringify(ZC.FIN.lulState())
//@@ shot=scooter_5.png
TV(18.3)+" — друзья смеются"
//@@ shot=scooter_6.png
TV(19.2)+" — Тишка смеётся над Прошкой"
//@@ shot=scooter_6b.png
TV(20.6)+" — Прошка встал и смеётся"
//@@
const h=ZC.HERO.proshka,st=ZC.FIN.lulState();const t=TV(22.2);
if(Math.hypot(h.pos.x+4.5,h.pos.z+2.05)>0.3)throw new Error('Прошка не дошёл до шишки: '+h.pos.x.toFixed(2)+','+h.pos.z.toFixed(2));
if(!st.broke)throw new Error('самокат не разбит');if(st.on)throw new Error('поза Прошки не снята после сценки');
if(Math.abs(h.body.rotation.x)>0.35)throw new Error('Прошка не встал: наклон '+h.body.rotation.x.toFixed(2));
['t='+t,'layers='+st.layers,'bodyRx='+h.body.rotation.x.toFixed(2)].join(' ')
//@@ shot=scooter_7.png
// дальше — прежний сюжет ролика, сдвинутый на 4,4 с: тень за окном, звено падает в тетрадку, «Дзинь! Бежим!»
TV(24.5)+' — тень за окном'
//@@
TV(99);const want=['p01_bayu','p02_zabyl','p03_malyshi','p04_samokat','p05_haha','p05d_prokatilsya','p06_bezhim'];
if(_seq.join()!==want.slice(3).join()&&_seq.join()!==want.join())throw new Error('реплики: '+_seq.join(' '));
const st=ZC.FIN.lulState();if(st.layers<3)throw new Error('смех поверх: '+st.layers+' из 3');
['cine='+!!ZC.G.cine,'stage='+ZC.W.flags.stage,'seq='+_seq.join(' '),'layers='+st.layers,'errs='+_errs.length+(_errs[0]?' '+_errs[0]:'')].join(' · ')
