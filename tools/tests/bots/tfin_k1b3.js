//@@ wait=1500
// релиз final06: 1-Б «Леший-Путаник» — этап 3 «Хоровод» вдвоём (late_99zb_k1b_hoorovod.js; docs/29_leshy_proposals.md, шаг 5), настоящими нажатиями:
// оба бегут по дорожке (удержание клавиш), прыгают за ≈ 0,25 с до встречи со скакалкой, на «ТРИ!» жмут удар, потом вместе бьют по Лешему; круг 2 — вторая скакалка; победа.
// Проверки: витки по 2 на героя, ни одного касания при честных прыжках, скакалка задевает того, кто стоит, «не вместе» — счёт снова, мах не вдвоём — снова счёт.
// Строка «//@@ shot=…» относится к шагу под ней: кадр снимается после него.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.loadLevel(7);ZC.tick(60*2);ZC.skip();ZC.tick(60*2);window.W=ZC.W;window.K=ZC.FIN.k1b;K.les.auto=false;window.S=K.s3;
W.bossNext();ZC.tick(60*3);ZC.skip();ZC.tick(60*3);const ph2=W.flags.phase;W.bossNext();ZC.tick(30);
window.wrap=a=>{while(a>Math.PI)a-=2*Math.PI;while(a<-Math.PI)a+=2*Math.PI;return a;};
window.relAll=()=>{for(const k of U.K)for(const q of k.B)ZC.hold(q,false);};
// бег по кругу радиуса 6 по стрелкам; прыжок перед скакалкой; until — условие остановки
window.runner=function(sec,until,opt){opt=opt||{};const C=K.cur.C,pis=ZC.G.solo?[ZC.G.soloPi]:[0,1],pv={};let n=0;
  while(n<60*sec&&!(until&&until())){for(const pi of pis){const h=U.act(pi),kk=U.K[U.pk(pi)],ha=Math.atan2(h.pos.z-C.z,h.pos.x-C.x);
      if(opt.still&&opt.still.includes(pi)){for(const q of kk.B)ZC.hold(q,false);continue;}
      const ta=ha+0.5,tx=C.x+Math.cos(ta)*6,tz=C.z+Math.sin(ta)*6,dx=tx-h.pos.x,dz=tz-h.pos.z;ZC.hold(kk.B[0],dx<-0.25);ZC.hold(kk.B[1],dx>0.25);ZC.hold(kk.B[2],dz<-0.25);ZC.hold(kk.B[3],dz>0.25);
      S.ropes.forEach((rp,ri)=>{const dn=wrap(-rp.th-ha),key=pi+':'+ri,p=pv[key];pv[key]=dn;if(!opt.nojump&&p!=null&&dn>0&&dn<1.3&&p>dn){const tc=dn/((p-dn)*60);if(tc<0.28&&tc>0.04&&h.pos.y<0.05)ZC.press(kk.j);}});}
    ZC.tick(1);n++;}
  relAll();return n/60;};
window.sum=()=>'st='+S.st+' round='+S.round+' laps='+S.laps.join('/')+' lapCount='+S.lapCount+' ropes='+S.ropes.length+' jumps='+S.jumps+' hits='+S.hits+' fails='+S.fails+' petals='+ZC.players.map(p=>p.petals).join('/');
'phase2='+ph2+' phase='+W.flags.phase+' on='+S.on+' '+sum()+' lane='+!!S.lane+' boss='+(S.boss?S.boss.kind+':'+S.boss.state+' vis='+S.boss.g.visible:'-')+' L='+K.cur.L.g.visible+' ribbons='+S.rb.length
//@@
// скакалка задевает того, кто стоит: Игрок 1 стоит на дорожке, Игрок 2 бежит — 14 секунд
const h0=U.act(0),C=K.cur.C;h0.pos.set(C.x+6,0,C.z);h0.vel.set(0,0,0);const p0=ZC.players[0].petals,hit0=S.hits;const t=runner(14,null,{still:[0]});
'standing: hits+'+(S.hits-hit0)+' petals '+p0+'→'+ZC.players[0].petals+' (laps unchanged: '+S.laps.join('/')+') t='+t.toFixed(1)
//@@ shot=k1bs_run.png
// честный бег и прыжки: до «Тяни-потяни» (по 2 витка на героя); лепестки вернём, чтобы мерить касания без помех
ZC.players.forEach(p=>{p.petals=3;});const j0=S.jumps,h0=S.hits;const t=runner(70,()=>S.st!=='run');
'run done after '+t.toFixed(1)+'s '+sum()+' jumps+'+(S.jumps-j0)+' hits+'+(S.hits-h0)
//@@ shot=k1bs_pull.png
// «Тяни-потяни»: сначала не вместе (только Игрок 1) — счёт снова; потом оба на «ТРИ!»
const f0=S.fails;const dtp=()=>{while(S.st==='pull'&&S.pt<2.28)ZC.tick(1);};dtp();ZC.press(U.K[0].a);ZC.tick(1);let n=0;while(S.st==='pull'&&S.fails===f0&&n<240){ZC.tick(1);n++;}
const failed=S.fails>f0;let ok='-';if(S.st==='pull'){dtp();ZC.press(U.K[0].a);ZC.press(U.K[1].a);ZC.tick(2);ok=S.st;}
'only P1 → fails+'+(S.fails-f0)+' failed='+failed+' then both → st='+ok+' boss='+S.boss.state+' pulls='+S.pulls
//@@ shot=k1bs_mah.png
// Богатырский мах не вдвоём: бьёт только Игрок 1 — Леший снова на ногах, снова «Тяни-потяни»
const C=K.cur.C,a0=U.act(0),a1=U.act(1);a0.pos.set(C.x+3.2,0,C.z);a1.pos.set(C.x-3.2,0,C.z);a0.vel.set(0,0,0);a1.vel.set(0,0,0);a0.face=Math.atan2(-3.2,0);a1.face=Math.atan2(3.2,0);ZC.tick(30);   // перезарядка удара после «ТРИ!» — пока добегут, пройдёт

const f0=S.fails;ZC.press(U.K[0].a);ZC.tick(60);const st1=S.st+' fails+'+(S.fails-f0)+' boss='+S.boss.state;
'one hit only: '+st1
//@@
// ... и снова «Тяни-потяни» — теперь вместе, и мах вдвоём
const C=K.cur.C;let n=0;while(S.st!=='pull'&&n<300){ZC.tick(1);n++;}while(S.st==='pull'&&S.pt<2.28)ZC.tick(1);ZC.press(U.K[0].a);ZC.press(U.K[1].a);ZC.tick(3);const mid=S.st+' boss='+S.boss.state;
const a0=U.act(0),a1=U.act(1);a0.pos.set(C.x+3.2,0,C.z);a1.pos.set(C.x-3.2,0,C.z);a0.vel.set(0,0,0);a1.vel.set(0,0,0);a0.face=Math.atan2(-3.2,0);a1.face=Math.atan2(3.2,0);ZC.tick(30);   // перезарядка удара после «ТРИ!» — пока добегут, пройдёт

ZC.press(U.K[0].a);ZC.press(U.K[1].a);ZC.tick(120);'second pull ok: '+mid+' → after both strike: round='+S.round+' st='+S.st+' bogatyr='+ZC.G.stats.bogatyr
//@@ shot=k1bs_r2.png
// круг 2: вторая скакалка выходит на втором витке
ZC.tick(60*3);const st0=S.st;const t=runner(40,()=>S.ropes.length>=2);'round2 started: '+st0+' → ropes='+S.ropes.length+' after '+t.toFixed(1)+'s '+sum()
//@@ shot=k1bs_final.png
// ... дальше до победы: бег, «Тяни-потяни», мах вдвоём
const C=K.cur.C;let t=runner(80,()=>S.st!=='run');while(S.st==='pull'&&S.pt<2.28)ZC.tick(1);ZC.press(U.K[0].a);ZC.press(U.K[1].a);ZC.tick(3);
const a0=U.act(0),a1=U.act(1);a0.pos.set(C.x+3.2,0,C.z);a1.pos.set(C.x-3.2,0,C.z);a0.vel.set(0,0,0);a1.vel.set(0,0,0);a0.face=Math.atan2(-3.2,0);a1.face=Math.atan2(3.2,0);ZC.tick(30);   // перезарядка удара после «ТРИ!» — пока добегут, пройдёт
ZC.press(U.K[0].a);ZC.press(U.K[1].a);ZC.tick(90);
'round2 done after '+t.toFixed(1)+'s: won='+!!W.flags.won+' st='+S.st+' hits='+S.hits+' fails='+S.fails+' errs='+window._errs.length
//@@
ZC.tick(60*3);ZC.skip();ZC.tick(60*3);ZC.skip();ZC.tick(60*3);'end: lvl='+ZC.W.levelId+' done='+JSON.stringify(ZC.G.done)+' errs='+window._errs.length+(window._errs.length?' '+window._errs[0]:'')
