//@@ wait=1500
// релиз final06: 1-Б «Леший-Путаник» — этап 3 «Хоровод» одним игроком (late_99zb_k1b_hoorovod.js; docs/29_leshy_proposals.md, шаг 5), клавиши Игрока 1:
// бежит выбранный герой, второй «оставленный держит» ленту — стоит на дорожке, и скакалка его не трогает; витки считаются на одну ленту, «Тяни-потяни» и мах — одним нажатием.
// Строка «//@@ shot=…» относится к шагу под ней: кадр снимается после него.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
ZC.setSolo(true);ZC.startFrom(ZC.LV('1-B'));ZC.G.manual=true;ZC.tick(10);const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}U.cine(200);ZC.tick(5);
window.W=ZC.W;window.K=ZC.FIN.k1b;K.les.auto=false;window.S=K.s3;W.bossNext();ZC.tick(60*3);ZC.skip();ZC.tick(60*3);const ph2=W.flags.phase;W.bossNext();ZC.tick(30);
window.wrap=a=>{while(a>Math.PI)a-=2*Math.PI;while(a<-Math.PI)a+=2*Math.PI;return a;};
window.relAll=()=>{for(const q of U.K[0].B)ZC.hold(q,false);};
window.runner=function(sec,until){const C=K.cur.C,pi=ZC.G.soloPi,pv={};let n=0;
  while(n<60*sec&&!(until&&until())){const h=U.me(),kk=U.K[0],ha=Math.atan2(h.pos.z-C.z,h.pos.x-C.x);
    const ta=ha+0.5,tx=C.x+Math.cos(ta)*6,tz=C.z+Math.sin(ta)*6,dx=tx-h.pos.x,dz=tz-h.pos.z;ZC.hold(kk.B[0],dx<-0.25);ZC.hold(kk.B[1],dx>0.25);ZC.hold(kk.B[2],dz<-0.25);ZC.hold(kk.B[3],dz>0.25);
    S.ropes.forEach((rp,ri)=>{const dn=wrap(-rp.th-ha),p=pv[ri];pv[ri]=dn;if(p!=null&&dn>0&&dn<1.3&&p>dn){const tc=dn/((p-dn)*60);if(tc<0.28&&tc>0.04&&h.pos.y<0.05)ZC.press(kk.j);}});
    ZC.tick(1);n++;}
  relAll();return n/60;};
window.sum=()=>'st='+S.st+' round='+S.round+' laps='+S.laps.join('/')+' ropes='+S.ropes.length+' jumps='+S.jumps+' hits='+S.hits+' fails='+S.fails+' petals='+ZC.players.map(p=>p.petals).join('/');
window.strike=function(){const C=K.cur.C,h=U.me();h.pos.set(C.x+3.2,0,C.z);h.vel.set(0,0,0);h.face=Math.atan2(-3.2,0);ZC.tick(30);ZC.press(U.K[0].a);ZC.tick(120);};
'solo='+ZC.G.solo+' phase2='+ph2+' phase='+W.flags.phase+' on='+S.on+' '+sum()+' ribbons='+S.rb.length+' me='+U.me().kind
//@@
// «оставленный держит»: второй герой стоит на дорожке, скакалка его не задевает (она метит только того, кем играешь); играющий бежит и прыгает
const C=K.cur.C,o=U.act(1-ZC.G.soloPi);o.pos.set(C.x-6,0,C.z);o.vel.set(0,0,0);const pet=ZC.players[1-ZC.G.soloPi].petals,j0=S.jumps;const t=runner(14);
'parked hero petals '+pet+'→'+ZC.players[1-ZC.G.soloPi].petals+' (unchanged: '+(pet===ZC.players[1-ZC.G.soloPi].petals)+') · runner jumps+'+(S.jumps-j0)+' '+sum()
//@@ shot=k1bs3_run.png
// бег до «Тяни-потяни»: по 2 витка одной ленте
const t=runner(80,()=>S.st!=='run');'run done after '+t.toFixed(1)+'s '+sum()
//@@
// «Тяни-потяни» — одним нажатием; мах — одним ударом
while(S.st==='pull'&&S.pt<2.28)ZC.tick(1);ZC.press(U.K[0].a);ZC.tick(3);const mid=S.st+' boss='+S.boss.state;strike();'pull one press: '+mid+' → mah one strike: round='+S.round+' st='+S.st+' bogatyr='+ZC.G.stats.bogatyr
//@@ shot=k1bs3_r2.png
// круг 2: вторая скакалка
ZC.tick(60*3);const t=runner(40,()=>S.ropes.length>=2);'round2: ropes='+S.ropes.length+' after '+t.toFixed(1)+'s '+sum()
//@@
const t=runner(80,()=>S.st!=='run');while(S.st==='pull'&&S.pt<2.28)ZC.tick(1);ZC.press(U.K[0].a);ZC.tick(3);strike();ZC.tick(60);
'round2 done after '+t.toFixed(1)+'s: won='+!!W.flags.won+' st='+S.st+' hits='+S.hits+' fails='+S.fails+' errs='+window._errs.length
//@@
ZC.tick(60*3);ZC.skip();ZC.tick(60*3);ZC.skip();ZC.tick(60*3);'end: lvl='+ZC.W.levelId+' done='+JSON.stringify(ZC.G.done)+' errs='+window._errs.length+(window._errs.length?' '+window._errs[0]:'')
