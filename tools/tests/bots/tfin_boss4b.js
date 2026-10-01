//@@ shot=fin_b4_intro.png wait=400
// релиз final04 (final06 — карточка «Большой вдох» и «Совиный взор — слабое место»), 4-Б «Змей Горыныч»: обучающие ролики по этапам (ждут нажатия, показывают сами по таймауту), восстановление голов, живые подсказки в бою
{const st=document.createElement('style');st.textContent='#finTut,#finBossHint{transition:none!important}';document.head.appendChild(st);}   // в headless кадры редкие — CSS-переходы на снимках не успевают
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.T4=ZC.FIN.boss4b;window.card=()=>{const c=document.getElementById('finTut');return c&&c.classList.contains('on')?c:null;};
window.cardSt=()=>{const c=card();if(!c)return '-';const g=c.querySelector('.ft-go');return (c.querySelector('.ft-head')||{}).innerText.slice(0,40)+(g?' ['+g.innerText+']':'');};
window.waitGo=(sec)=>{for(let i=0;i<(sec||20)*60;i++){const c=card();if(c&&c.querySelector('.ft-key.wait')&&c.querySelector('.ft-go')&&!c.classList.contains('ok'))return true;ZC.tick(1);}return false;};
window.heads=()=>ZC.W.enemies.filter(e=>e.kind==='golova').sort((a,b)=>a.idx-b.idx);
ZC.startFrom(ZC.LV('4-B'));ZC.G.manual=true;ZC.tick(60);const r=[ZC.W.name,'intro='+!!ZC.G.cine];ZC.skip();ZC.tick(3);
r.push('phase='+ZC.W.flags.phase,'tut='+T4.on,'cine='+!!ZC.G.cine,'card='+cardSt());r
//@@ shot=fin_b4_s1_guard.png wait=400
// этап 1: карточка щита ждёт Игрока 1; ролик стоит, пока не нажали
const r=[];r.push('go='+waitGo(8),cardSt());const t0=ZC.G.cine.t;ZC.tick(120);r.push('frozen='+(Math.abs(ZC.G.cine.t-t0)<0.05),'cd='+heads().map(e=>e.cd).join('/'));r
//@@ shot=fin_b4_s1_ok.png wait=400
// пауза посреди обучения: карточка не поверх меню
const c0=document.getElementById('finTut');ZC.menu('pause');ZC.FIN.occ.frame();const vp=c0.style.visibility;ZC.start();ZC.G.manual=true;ZC.FIN.occ.frame();const vb=c0.style.visibility;
const r=['pause card='+(vp||'visible')+' → '+(vb||'visible')];ZC.press('KeyG');ZC.tick(2);r.push('afterG='+cardSt(),'ok='+card().classList.contains('ok'));ZC.tick(30);r
//@@ shot=fin_b4_s1_roll.png wait=400
// удар, кувырок Игрока 2, удар Игрока 2
const r=[];r.push(waitGo(12),cardSt());ZC.press('KeyF');ZC.tick(2);r.push('L='+heads()[0].state);
r.push(waitGo(12),cardSt());r
//@@ shot=fin_b4_s1_hit.png wait=400
const r=[];ZC.press('Slash');ZC.tick(2);r.push(cardSt());
r.push(waitGo(12),cardSt());ZC.press('Comma');ZC.tick(2);r.push('R='+heads()[2].state,cardSt());r
//@@
// дальше ролик идёт сам; после конца — головы как были, подсказки готовы
const r=[];let n=0;while(ZC.G.cine&&n<60*30){ZC.tick(1);n++;}
r.push('end sec='+(n/60).toFixed(1),'tut='+T4.on,'heads='+heads().map(e=>e.state+':'+e.cd.toFixed(1)).join(','),'seen='+JSON.stringify(ZC.G.flags.tut4b),'props='+T4.props.length,'card='+cardSt());r
//@@ shot=fin_b4_hint.png wait=400
// подсказки в бою: без успехов — стрелка и карточка; правильная кнопка — «Молодец!»
const r=[];const hint=document.getElementById('finBossHint');let n=0;while(!hint.classList.contains('on')&&n<60*20){ZC.tick(1);n++;}
r.push('hint after '+(n/60).toFixed(1)+'s',hint.classList.contains('on'),(hint.querySelector('.ft-head')||{}).innerText,'arrows='+T4.arrows.length,'key='+(T4.h.cur&&T4.h.cur.key));r
//@@
const r=[];const hint=document.getElementById('finBossHint');const ex=T4.h.cur?T4.h.cur.expect:[];
const B=[{attack:'KeyF',guard:'KeyG',roll:'ShiftLeft',skill:'KeyE',item:'KeyR',swap:'KeyQ'},{attack:'Comma',guard:'Period',roll:'Slash',skill:'KeyL',item:'Semicolon',swap:'KeyK'}];
if(ex.length){ZC.press(B[ex[0][0]][ex[0][1]]);}ZC.tick(2);r.push('expect='+JSON.stringify(ex),'ok='+hint.classList.contains('ok'),hint.innerText.includes('Молодец'));ZC.tick(90);r.push('hidden='+!hint.classList.contains('on'));r
//@@ shot=fin_b4_s2_acorn.png wait=400
// этап 2 (фаза выставлена напрямую): жёлудь — ждём и жмём; дальше никто не жмёт — ролик показывает приёмы сам и заканчивается
const W=ZC.W;W.flags.phase=2;heads().forEach(e=>{e.state='idle';e.cd=2;});ZC.tick(2);const r=['tut='+T4.on,cardSt()];r.push(waitGo(10),cardSt());r
//@@ shot=fin_b4_s2_fire.png wait=400
const r=[];ZC.press('KeyE');ZC.tick(30);r.push(cardSt(),'M='+heads()[1].state);r.push(waitGo(10),cardSt());r
//@@ shot=fin_b4_s2_inhale.png wait=400
// final06: большой вдох — оба держат щит (тянет к пасти слабее), в ролике видны струи воздуха к пастям
const r=['streaks='+(ZC.FIN.gor4.demoT>0)];ZC.press('KeyG');ZC.press('Period');ZC.tick(2);r.push(cardSt());r.push(waitGo(10),cardSt());r
//@@ shot=fin_b4_s2_water.png wait=400
const r=[];ZC.tick(560);r.push(waitGo(12),cardSt());r
//@@
const r=[];let n=0,seen=[];while(ZC.G.cine&&n<60*120){ZC.tick(1);n++;const s=cardSt();if(s!==seen[seen.length-1])seen.push(s);}
r.push('auto end sec='+(n/60).toFixed(1),'autos='+seen.filter(s=>s.includes('Смотри')).length,'heads='+heads().map(e=>e.state).join(','),'seen='+JSON.stringify(ZC.G.flags.tut4b));r
//@@ shot=fin_b4_s3_grab.png wait=400
// этап 3: узда; «раз-два-три» (late_37) — три счёта, на каждый — умение обоих (порядок и промежуток любые); узда возвращается на место
const W=ZC.W;const bp=W.grabs[0].pos().clone();window._home=[0,1].map(pi=>ZC.players[pi].heroes[ZC.players[pi].act].pos.clone());W.flags.phase=3;W.flags.stun=50;heads().forEach(e=>{e.state='broken';e.bdur=99;e._b=true;});ZC.tick(2);const r=['tut='+T4.on,cardSt()];
r.push(waitGo(10),cardSt());r
//@@ shot=fin_b4_s3_123.png wait=400
const r=[];ZC.press('KeyR');ZC.tick(1);ZC.press('Semicolon');ZC.tick(2);r.push(cardSt());
r.push(waitGo(15),cardSt());r
//@@
const r=[];for(let k=0;k<3;k++){if(k)r.push('go'+k+'='+waitGo(10));ZC.press('KeyE');ZC.tick(40);r.push('one'+(k+1)+' ok='+card().classList.contains('ok'));ZC.press('KeyL');ZC.tick(2);r.push('beat'+(k+1)+'='+cardSt()+' lamps='+(ZC.FIN.uzda?ZC.FIN.uzda.demo:'-'));ZC.tick(10);}
let n=0;while(ZC.G.cine&&n<60*20){ZC.tick(1);n++;}const W=ZC.W;r.push('tut='+T4.on,'bridle='+W.grabs[0].pos().toArray().map(v=>v.toFixed(2)).join(','),'phase='+W.flags.phase,'stun='+W.flags.stun.toFixed(1),'heroesHome='+[0,1].every(pi=>ZC.players[pi].heroes[ZC.players[pi].act].pos.distanceTo(window._home[pi])<0.3),'heads='+heads().map(e=>e.state).join(','));r
//@@
// повторная попытка: этапы уже объясняли — короткое напоминание
ZC.startFrom(ZC.LV('4-B'));ZC.G.manual=true;ZC.G.flags.tut4b={1:true,2:true,3:true};ZC.tick(60);ZC.skip();ZC.tick(3);const r=['short='+T4.on,cardSt()];let n=0;while(ZC.G.cine&&n<60*20){ZC.tick(1);n++;}r.push('sec='+(n/60).toFixed(1),'phase='+ZC.W.flags.phase);r
//@@
// пропуск обучающего ролика (как у всех роликов)
ZC.startFrom(ZC.LV('4-B'));ZC.G.manual=true;ZC.G.flags.tut4b=null;ZC.tick(60);ZC.skip();ZC.tick(3);const r=['tut='+T4.on];ZC.skip();ZC.tick(3);r.push('after skip tut='+T4.on,'cine='+!!ZC.G.cine,'card='+cardSt(),'cd='+heads().map(e=>e.cd).join('/'));r
//@@
// одиночный режим: «оба игрока» — хватает одного нажатия любой половиной клавиатуры
ZC.setSolo(true);ZC.startFrom(ZC.LV('4-B'));ZC.G.manual=true;ZC.G.flags.tut4b={1:true,2:true};ZC.tick(60);ZC.skip();ZC.tick(3);if(ZC.G.cine){ZC.skip();ZC.tick(3);}
const W=ZC.W;W.flags.phase=3;W.flags.stun=50;heads().forEach(e=>{e.state='broken';e.bdur=99;e._b=true;});ZC.tick(2);const r=['tut='+T4.on];r.push(waitGo(10),cardSt(),'who='+(document.querySelector('#finTut .ft-who')?'labels':'no labels'));
ZC.press('Semicolon');ZC.tick(3);r.push(cardSt());ZC.skip();ZC.tick(3);ZC.setSolo(false);r
