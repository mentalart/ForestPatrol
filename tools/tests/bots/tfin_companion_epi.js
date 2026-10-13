//@@
// релиз final06: напарник-бот в эпилоге — «Театр теней» (late_73zh_companion_epi.js). Человека (Игрок 1: Прошка и Потап) бот ставит
// телепортом в его половину каждой сценки; Пелагея и Йоша — сами: звезда «Великанов», два круга Змея и два огня, «ладошка» Жар-птице
// с другой стороны, два круга хоровода и прыжок на хлопок. Ни одна сценка не засчитана Тишкой по времени, ошибок нет.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=4242;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
window.CO=ZC.FIN.co;window.E=ZC.FIN.epiTh;window.H=ZC.HERO;window.pk={};window.R=()=>E.dbg.rd();
window.put=(k,u,y)=>{const p=E.dbg.ideal(k,u,y),h=H[k];h.pos.set(p.x,0,p.z);h.vel.set(0,0,0);return p;};
window.till=(f,n)=>{let i=0;while(!f()&&i<(n||600)){ZC.tick(1);i++;}return i;};
window.away=()=>{['proshka','potap'].forEach((k,i)=>{H[k].pos.set(-2.2+i*1.1,0,4.6);H[k].vel.set(0,0,0);});};
window.mine=()=>['pelageya','yosha'];
ZC.startFrom(ZC.LV('epi'));ZC.G.manual=true;ZC.G.flags.ending=['slushat'];ZC.tick(10);CO.set(true);ZC.tick(20);pk.sit=CO.mode;
['lvl='+ZC.W.levelId,'mode='+CO.mode]
//@@ wait=500
ZC.skip();ZC.tick(10);pk.sit=CO.mode;ZC.skip();ZC.tick(100);['sit='+pk.sit,'st='+E.st,'mode='+CO.mode]
//@@
// «Великаны»: человек достаёт до одной звезды, вторую — тень бота
const st=R().stars;away();put('proshka',st[0].u,st[0].y+0.25);ZC.tick(20);pk.mode=CO.mode;
pk.gT=till(()=>st.every(s=>s.lit),1500);pk.giant=st.filter(s=>s.lit).length;
const sb=mine().map(k=>E.dbg.shadow(k)).find(s=>Math.abs(s.u-st[1].u)<s.w+0.3&&s.top>st[1].y-0.2);pk.giantBot=!!sb;
['giant='+pk.giant,'ticks='+pk.gT,'by bot='+pk.giantBot,'mode='+pk.mode]
//@@ shot=fin_cmpepi_zmei.png wait=300
// «Змей»: человек — в один круг, бот ставит в два других обоих своих героев
till(()=>E.st==='zmei',600);ZC.tick(30);const sl=R().slots;put('proshka',sl[0].u,sl[0].y);
pk.zT=till(()=>R().formed,2400);pk.formed=R().formed;pk.zHeld=sl.map(s=>s.held?s.held.h.kind:'-').join(',');
ZC.press('KeyF');ZC.tick(20);ZC.press('KeyF');pk.fT=till(()=>R().fly>=0,400);pk.fire=R().fire.slice();
['formed='+pk.formed+' ticks='+pk.zT,'held='+pk.zHeld,'fire='+pk.fire,'fly='+R().fly.toFixed(2)]
//@@
till(()=>E.st==='bird',600);['st='+E.st,'rounds='+E.stats.rounds.join(',')]
//@@ shot=fin_cmpepi_bird.png wait=300
// «Жар-птица»: бот встаёт сбоку от птицы, человек подводит тень с другой стороны — хлоп
away();const cs=[];
for(let c=0;c<3&&R().n<3;c++){const B=R().B;till(()=>B.st==='perch',600);
  const pos=()=>{const s=E.dbg.shadow(U.act(1).kind);const du=s.u-B.u;return s.ok&&Math.abs(du)>s.w+0.15&&Math.abs(du)<s.w+0.9&&s.top>B.y-0.4;};
  const w=till(()=>B.st!=='perch'||pos(),400);if(B.st!=='perch'){c--;continue;}
  const bs=E.dbg.shadow(U.act(1).kind),side=Math.sign(bs.u-B.u)||1;const n0=R().n;put('proshka',B.u-side*1.0,Math.min(3.4,B.y+0.5));till(()=>R().n>n0,60);cs.push(w+':'+R().n);away();ZC.tick(4);}
pk.bird=R().n;pk.birdT=cs.join(' ');['feathers='+pk.bird,'waits='+pk.birdT]
//@@
till(()=>E.st==='horo',900);['st='+E.st,'rounds='+E.stats.rounds.join(',')]
//@@ shot=fin_cmpepi_horo.png wait=300
// «Хоровод»: человек — в два круга, бот — в два других; на хлопок прыгают оба
ZC.tick(70);const s4=R().slots;put('proshka',s4[0].u,s4[0].y);put('potap',s4[1].u,s4[1].y);
pk.hT=till(()=>R().ph==='beat',2400);pk.hHeld=s4.map(s=>s.held?s.held.h.kind:'-').join(',');
const R4=R();for(let b=0;b<6&&R4.n<3;b++){const e0=R4.n+R4.miss;till(()=>ZC.G.time>=R4.next-0.05,300);ZC.press('Space');till(()=>R4.n+R4.miss>e0,90);}
pk.beats=R4.n;pk.miss=R4.miss;['ph='+R4.ph+' ticks='+pk.hT,'held='+pk.hHeld,'beats='+pk.beats+' miss='+pk.miss]
//@@
till(()=>ZC.W.flags.stage==='e2c',1200);pk.e2=ZC.W.flags.stage;ZC.tick(30);pk.after=CO.mode;
const ok=pk.mode==='route:theatre'&&pk.giant===2&&pk.giantBot&&pk.formed&&pk.fire[1]>=2&&pk.bird===3&&pk.beats===3&&pk.miss===0&&pk.e2==='e2c'&&!E.stats.forced.length&&E.stats.rounds.length===4;
[JSON.stringify(pk),'forced='+E.stats.forced.join(','),'errs='+_errs.length+(_errs[0]?' '+_errs[0]:''),ok&&!_errs.length?'companion_epi ok':'FAIL companion_epi']
