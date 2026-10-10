//@@ wait=1500
// релиз final06: 1-Б «Леший-Путаник», этап 3 — найденный настоящий двойник не остаётся лежать на поляне; урок «Хоровод» (герои бегут вокруг Лешего, ленты мотаются на ствол) и живые ленты-обмотки в бою.
// Строка «//@@ shot=…» относится к шагу под ней: кадр снимается после него.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
U.go();ZC.loadLevel(7);ZC.tick(60*2);ZC.skip();ZC.tick(60*2);window.W=ZC.W;window.K=ZC.FIN.k1b;window.S=K.s3;
W.bossNext();ZC.tick(60*3);ZC.skip();ZC.tick(60*3);'phase='+W.flags.phase+' doubles='+W.doubles.length
//@@
// «Нашли!»: настоящий двойник упал, бьём его (дважды — два круга); после второго — этап 3, на поляне не должно остаться ни одного двойника
window.find=()=>{const real=W.doubles.find(d=>d.real),dh=W.hittables.find(q=>q.r===20);real.state='fallen';U.act(0).pos.set(real.pos.x+1,0,real.pos.z);dh.onHit({d:{range:2},pos:U.act(0).pos,player:0});return real;};
window.alive=()=>W.doubles.filter(d=>d.m.g.parent).length;
const r1=find();ZC.tick(60*4);const n1=W.doubles.length,a1=alive();const r2=find();ZC.tick(60*4);
'round1: found parent='+!!r1.m.g.parent+' new doubles='+n1+' | round2: found parent='+!!r2.m.g.parent+' phase='+W.flags.phase+' doublesOnField='+alive()
//@@
// ролик выхода на хоровод и урок: шаг «Хоровод» — герои бегут вокруг Лешего
ZC.tick(60*5);'cine='+!!ZC.G.cine+' lesson='+ZC.FIN.lesson.on+' phase='+W.flags.phase+' les.D='+!!K.les.D
//@@ shot=k1bc_les_run.png
ZC.tick(60*4);const D=K.les.D;'t='+(D?'on':'-')+' ribbons='+K.fx.ribbons.length+' phi='+(D?D.rb.map(r=>r.phi.toFixed(2)).join('/'):'-')
//@@ shot=k1bc_les_run2.png
ZC.tick(60*3);const D=K.les.D;'phi='+(D?D.rb.map(r=>r.phi.toFixed(2)).join('/'):'-')+' step='+ZC.FIN.lesson.steps
//@@ shot=k1bc_les_pull.png
// дальше — скакалка и «Тяни-потяни» (сами, по таймауту 8 с)
ZC.tick(60*30);'lesson='+ZC.FIN.lesson.on+' on='+S.on+' st='+S.st+' ribbons='+S.rb.length+' errs='+_errs.length
//@@ shot=k1bc_run.png
// настоящий бег: ленты тянутся за героями и мотаются на ствол
window.wrap=a=>{while(a>Math.PI)a-=2*Math.PI;while(a<-Math.PI)a+=2*Math.PI;return a;};
window.runner=function(sec){const C=K.cur.C,pv={};let n=0;while(n<60*sec){for(const pi of[0,1]){const h=U.act(pi),kk=U.K[U.pk(pi)],ha=Math.atan2(h.pos.z-C.z,h.pos.x-C.x),ta=ha+0.5,tx=C.x+Math.cos(ta)*6,tz=C.z+Math.sin(ta)*6,dx=tx-h.pos.x,dz=tz-h.pos.z;
      ZC.hold(kk.B[0],dx<-0.25);ZC.hold(kk.B[1],dx>0.25);ZC.hold(kk.B[2],dz<-0.25);ZC.hold(kk.B[3],dz>0.25);
      S.ropes.forEach((rp,ri)=>{const dn=wrap(-rp.th-ha),key=pi+':'+ri,p=pv[key];pv[key]=dn;if(p!=null&&dn>0&&dn<1.3&&p>dn){const tc=dn/((p-dn)*60);if(tc<0.28&&tc>0.04&&h.pos.y<0.05)ZC.press(kk.j);}});}
    ZC.tick(1);n++;}for(const k of U.K)for(const q of k.B)ZC.hold(q,false);return n/60;};
ZC.players.forEach(p=>{p.petals=3;});const t=runner(9);'t='+t.toFixed(1)+' laps='+S.laps.join('/')+' phi='+S.rb.map(r=>r.phi.toFixed(2)).join('/')+' errs='+_errs.length+' '+(_errs[0]||'')
//@@ shot=k1bc_run2.png
ZC.players.forEach(p=>{p.petals=3;});const t=runner(8);'t='+t.toFixed(1)+' st='+S.st+' laps='+S.laps.join('/')+' phi='+S.rb.map(r=>r.phi.toFixed(2)).join('/')+' taut='+S.rb.map(r=>r.taut.toFixed(2)).join('/')+' errs='+_errs.length
