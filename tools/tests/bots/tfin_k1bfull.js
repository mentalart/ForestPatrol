//@@ wait=1500
// @timeout=2400
// релиз final06: 1-Б «Леший-Путаник» от входа до победы НАСТОЯЩИМИ нажатиями вдвоём: этап 1 (руки, три трофея) → этап 2 (прятки, струна, два круга) → этап 3 «Хоровод»
// (урок: прыжок и «Тяни-потяни» на FIN.lesson ≤ 25 с, повтор «Показать ещё раз», пропуск одним игроком; два круга со скакалкой, «Тяни-потяни», Богатырский мах) → победа.
// Ни W.bossNext(), ни onDeath: переходы между этапами делает сама игра; ролики пропускаются ZC.skip() (кроме урока — он проходится нажатиями).
// Из бота взято: цикл руки/трофей (tfin_k1b), ловушка со струной (tfin_k1bhide), бег и прыжки по хороводу (tfin_k1b3). FPS и нагрузка — tools/boss_audit/run_bot.sh tfin_k1bfull.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.loadLevel(7);ZC.tick(60*2);ZC.skip();ZC.tick(60*2);window.W=ZC.W;window.K=ZC.FIN.k1b;window.S=K.s3;window.LK=ZC.FIN.lesson;window.D=K.hide;
window.skipCine=function(max){let n=0;while(ZC.G.cine&&!LK.on&&n<60*(max||40)){if(n%30===0)ZC.skip();ZC.tick(1);n++;}ZC.tick(20);};
window.need=(c,msg)=>{if(!c)throw new Error('tfin_k1bfull: ожидалось «'+msg+'» | phase='+W.flags.phase+' head='+W.flags.head+' round='+W.flags.round+' st='+S.st+' S.round='+S.round+' laps='+S.laps.join('/')+' cine='+!!ZC.G.cine+' lesson='+LK.on+' errs='+window._errs.length);};
'start: phase='+W.flags.phase+' lesson auto='+K.les.auto+' errs='+window._errs.length
//@@
// этап 1: руки-коряги — три трофея
window.cycle=function(){const W=ZC.W;let n=0;while(n<60*60&&!W.enemies.some(e=>e.state==='broken'&&e.kind==='hand')){U.brawl(1/60);n++;}
  const e=W.enemies.find(e=>e.state==='broken');if(!e)return 'no break';const sh={x:e.side*2.4,z:-22.5};const h=U.act(0);const hx=e.pos.x,hz=e.pos.z;const lp=(a,b,t)=>a+(b-a)*t;
  U.walkTo(0,hx,hz+1.2,4);for(let k=1;k<=8;k++)U.walkTo(0,lp(hx,sh.x,k/8),lp(hz,sh.z,k/8),2);h.face=Math.atan2(0-h.pos.x,-24.2-h.pos.z);ZC.tick(1);ZC.press('KeyF');ZC.tick(24);
  return 'head='+W.flags.head;};
window.toHead=function(n){const W=ZC.W,K=ZC.FIN.k1b;let g=0;while((W.flags.head||0)<n&&W.flags.phase===1&&g<25){ZC.tick(60);cycle();g++;}
  const P=K.cur.L.parts;return 'head='+W.flags.head+' tries='+g+' lost='+JSON.stringify(K.cur.L.k1.lost)+' fly='+K.fly.length+' emo='+K.cur.L.k1.emo+' beard='+P.beard.visible;};
toHead(1)
//@@ shot=k1bfull_s1.png
toHead(2)+(need(W.flags.head>=2,'второй трофей'),'')
//@@
const r=toHead(3);skipCine(30);need(W.flags.head>=3,'три трофея');ZC.tick(60*3);skipCine(30);need(W.flags.phase===2,'этап 2 после трёх трофеев');r+' phase='+W.flags.phase
//@@
// этап 2: двойники, ловушка со струной — два круга (как в tfin_k1bhide)
ZC.tick(60*3);skipCine(30);'phase='+W.flags.phase+' doubles='+W.doubles.length
//@@
window.ph2=function(){const st=W.stakes.find(s=>!s.used);const h=U.act(0);U.walkTo(0,st.x*0.25,-14+(st.z+14)*0.25,5);h.face=Math.atan2(st.x-h.pos.x,st.z-h.pos.z);ZC.tick(1);ZC.press('KeyR');ZC.tick(40);
 const th=W.threads.map(t=>t.owner+':'+(t.string?'S':'')+t.len.toFixed(1)).join(' ');U.tap('KeyQ');const r0=W.flags.round||0;
 let n=0,hits=0;while(n<60*90&&W.flags.phase===2&&(W.flags.round||0)===r0){n++;const f=W.doubles.find(d=>d.state==='fallen'&&d.real);const a=U.act(0);
   if(f){const d=Math.hypot(f.pos.x-a.pos.x,f.pos.z-a.pos.z);if(d>2.2){const B=['KeyA','KeyD','KeyW','KeyS'];const dx=f.pos.x-a.pos.x,dz=f.pos.z-a.pos.z;ZC.hold(B[0],dx<-0.3);ZC.hold(B[1],dx>0.3);ZC.hold(B[2],dz<-0.3);ZC.hold(B[3],dz>0.3);}
     else{['KeyA','KeyD','KeyW','KeyS'].forEach(k=>ZC.hold(k,false));a.face=Math.atan2(f.pos.x-a.pos.x,f.pos.z-a.pos.z);if(n%10==0){ZC.press('KeyF');hits++;}}}
   ZC.tick(1);}
 ['KeyA','KeyD','KeyW','KeyS'].forEach(k=>ZC.hold(k,false));U.tap('KeyQ');
 return 'th='+th+' '+(n/60).toFixed(1)+'s round='+W.flags.round+' hits='+hits+' left='+W.doubles.filter(d=>d.state!=='gone').length;};
let g2=0,r0='';while(W.flags.phase===2&&g2<8){r0+=ph2()+' | ';g2++;ZC.tick(60*3);skipCine(30);}need(W.flags.phase!==2,'конец этапа 2 за '+g2+' попыток');r0+' phase='+W.flags.phase+' tries='+g2
//@@
// этап 3: выход на хоровод — ролик пень/Леший пропускаем, дальше сам урок
skipCine(30);let n=0;while(!LK.on&&n<60*20){ZC.tick(1);n++;}need(LK.on,'урок Хоровода начался');'phase='+W.flags.phase+' on='+S.on+' lesson on='+LK.on+' runs='+LK.runs+' stump='+(S.stump?'y':'n')+' errs='+window._errs.length
//@@ shot=k1bfull_lesson.png
// урок «Хоровода»: шаг 1 «Скакалка» ждёт прыжка обоих; нажимают — «Получилось!»; шаг 2 «Тяни-потяни» ждёт удара обоих; всё ≤ 25 с
window.card=()=>{const c=document.getElementById('finTut');return c&&c.classList.contains('on')?c:null;};
window.cs=()=>{const c=card();if(!c)return '-';const g=c.querySelector('.ft-go');return (c.querySelector('.ft-head')||{}).innerText.replace(/\s+/g,' ').slice(0,40)+(g?' ['+g.innerText+']':'');};
window.lt0=ZC.G.time;let n=0;while(n<60*5&&!(card()&&card().querySelector('.ft-go')))ZC.tick(1),n++;need(card()&&card().querySelector('.ft-go'),'карточка урока ждёт нажатия');const a=cs(),still0=S.on;
ZC.tick(60);const a1=cs();ZC.press(U.K[0].j);ZC.press(U.K[1].j);ZC.tick(3);const a2=cs();
'step1 '+a+' | after 1s '+a1+' | pressed → '+a2+' | game not started yet: '+(!still0)
//@@ shot=k1bfull_lesson2.png
let n=0;while(n<60*8&&!/Тяни/.test(cs()))ZC.tick(1),n++;let m=0;while(m<60*3&&!/\[/.test(cs()))ZC.tick(1),m++;const a=cs();ZC.press(U.K[0].a);ZC.tick(20);const a1=cs();ZC.press(U.K[1].a);ZC.tick(3);const a2=cs();
'step2 '+a+' | one hits '+a1+' | both → '+a2
//@@
let n=0;while(LK.on&&n<60*12)ZC.tick(1),n++;ZC.tick(30);const dur=ZC.G.time-lt0;
'lesson done: dur='+dur.toFixed(1)+'s (≤25: '+(dur<=25)+') on='+LK.on+' S.on='+S.on+' st='+S.st+' seen='+LK.seen('k1b',3)+' autos='+LK.autos+' errs='+window._errs.length
//@@
// «Показать ещё раз» (пауза / лестница подсказок): can=true в беге; пропуск ОДНИМ игроком — держит прыжок 2 с
const can=LK.has();const ok=LK.again();ZC.tick(70);const on1=LK.on;ZC.hold(U.K[0].j,true);let t=0;while(ZC.G.cine&&t<60*4)ZC.tick(1),t++;ZC.hold(U.K[0].j,false);ZC.tick(20);
'again can='+can+' started='+ok+' on='+on1+' → skipped by one after '+(t/60).toFixed(1)+'s on='+LK.on+' S.st='+S.st+' ropes visible='+S.ropes.every(r=>r.R.g.visible)
//@@
// бег по хороводу: два витка каждому, скакалка — прыжки
window.runner=function(sec,until,opt){opt=opt||{};const C=K.cur.C,pis=ZC.G.solo?[ZC.G.soloPi]:[0,1],pv={};let n=0;
  while(n<60*sec&&!(until&&until())){for(const pi of pis){const h=U.act(pi),kk=U.K[U.pk(pi)],ha=Math.atan2(h.pos.z-C.z,h.pos.x-C.x);
      if(opt.still&&opt.still.includes(pi)){for(const q of kk.B)ZC.hold(q,false);continue;}
      const ta=ha+0.5,tx=C.x+Math.cos(ta)*6,tz=C.z+Math.sin(ta)*6,dx=tx-h.pos.x,dz=tz-h.pos.z;ZC.hold(kk.B[0],dx<-0.25);ZC.hold(kk.B[1],dx>0.25);ZC.hold(kk.B[2],dz<-0.25);ZC.hold(kk.B[3],dz>0.25);
      S.ropes.forEach((rp,ri)=>{const dn=wrap(-rp.th-ha),key=pi+':'+ri,p=pv[key];pv[key]=dn;if(!opt.nojump&&p!=null&&dn>0&&dn<1.3&&p>dn){const tc=dn/((p-dn)*60);if(tc<0.28&&tc>0.04&&h.pos.y<0.05)ZC.press(kk.j);}});}
    ZC.tick(1);n++;}
  relAll();return n/60;};
window.sum=()=>'st='+S.st+' round='+S.round+' laps='+S.laps.join('/')+' lapCount='+S.lapCount+' ropes='+S.ropes.length+' jumps='+S.jumps+' hits='+S.hits+' fails='+S.fails+' petals='+ZC.players.map(p=>p.petals).join('/');
window.wrap=a=>{while(a>Math.PI)a-=2*Math.PI;while(a<-Math.PI)a+=2*Math.PI;return a;};
window.relAll=()=>{for(const k of U.K)for(const q of k.B)ZC.hold(q,false);};
window.sum=()=>'st='+S.st+' round='+S.round+' laps='+S.laps.join('/')+' lapCount='+S.lapCount+' ropes='+S.ropes.length+' jumps='+S.jumps+' hits='+S.hits+' fails='+S.fails;
// круг хоровода: бег до «Тяни-потяни» (кусками по 60 с игровых — запас на промахи), потом «Тяни-потяни» и мах вдвоём; при неудаче — повтор
window.circuit=function(label){let t=0,g=0;while(S.st==='run'&&g<8){t+=runner(60,()=>S.st!=='run');g++;ZC.players.forEach(p=>{p.petals=3;});}
  need(S.st!=='run',label+': витки (2 на героя) за '+g+' кусков бега');
  const r0=S.round,w0=!!W.flags.won;let tries=0;
  while(tries<8&&S.round===r0&&!W.flags.won){tries++;let n=0;while(S.st!=='pull'&&S.st!=='done'&&n<60*30){ZC.tick(1);n++;}if(W.flags.won)break;
    n=0;while(S.st==='pull'&&S.pt<2.28&&n<60*6){ZC.tick(1);n++;}ZC.press(U.K[0].a);ZC.press(U.K[1].a);ZC.tick(3);
    const C=K.cur.C,a0=U.act(0),a1=U.act(1);a0.pos.set(C.x+3.2,0,C.z);a1.pos.set(C.x-3.2,0,C.z);a0.vel.set(0,0,0);a1.vel.set(0,0,0);a0.face=Math.atan2(-3.2,0);a1.face=Math.atan2(3.2,0);ZC.tick(30);
    ZC.press(U.K[0].a);ZC.press(U.K[1].a);ZC.tick(120);}
  need(S.round>r0||W.flags.won,label+': «Тяни-потяни» и Богатырский мах за '+tries+' попыток');
  return label+': бег '+t.toFixed(0)+'с, попыток мaха '+tries+' · '+sum();};
ZC.players.forEach(p=>{p.petals=3;});circuit('круг 1')
//@@ shot=k1bfull_pull.png
ZC.tick(60*4);need(S.st==='run','круг 2 начался');circuit('круг 2')
//@@ shot=k1bfull_final.png
ZC.tick(60*2);need(W.flags.won,'победа (won)');'победа: won='+!!W.flags.won+' st='+S.st+' hits='+S.hits+' fails='+S.fails+' bogatyr='+ZC.G.stats.bogatyr+' errs='+window._errs.length
//@@
let g=0;while(ZC.W.levelId==='1-B'&&g<10){ZC.tick(60*3);ZC.skip();g++;}need(ZC.W.levelId!=='1-B'&&ZC.G.done['1-B'],'выход с уровня и отметка 1-Б пройденным');'end: lvl='+ZC.W.levelId+' done='+JSON.stringify(ZC.G.done)+' errs='+window._errs.length+(window._errs.length?' '+window._errs[0]:'')
