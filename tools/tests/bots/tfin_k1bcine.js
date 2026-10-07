//@@ wait=1500
// релиз final06: 1-Б «Леший-Путаник» — музыка по этапам и ролики (late_99zc_k1b_cine.js; docs/29_leshy_proposals.md, шаг 6):
// вход (Леший спит с закрытыми глазами, встаёт, открывает глаза — тема 1), переход к пряткам (смех, дым — тема 2), выход на хоровод (пень растёт, фонарики — тема 3, с первой строкой Лешего),
// круг 2 (быстрее) и финал (Леший с одним цветущим рогом, без гнезда и бороды; листопад, лешачата хлопают — колыбельная). Строка «//@@ shot=…» относится к шагу под ней: кадр снимается после него.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
window.calls=[];{const M=ZC.FIN.music,op=M.play.bind(M);M.play=n=>{calls.push(n===null?'null':n===''?'""':n);op(n);};}
U.go();ZC.loadLevel(7);window.W=ZC.W;window.K=ZC.FIN.k1b;ZC.tick(30);window.L=K.cur.L;window.S=K.s3;
'intro: cine='+!!ZC.G.cine+' emo='+L.k1.emo+' scale='+L.g.scale.x.toFixed(2)+' calls='+calls.join(',')
//@@
// вход: к 5 с глаза открыты и тема 1 включена; в конце — рост 2,2; строка Лешего прежняя
ZC.tick(60*5);let a=L.k1.emo+' calls='+calls.join(',');ZC.skip();ZC.tick(30);a+=' · after skip: emo='+L.k1.emo+' scale='+L.g.scale.x.toFixed(2)+' phase='+W.flags.phase+' music='+K.musName+' themes='+['k1b1','k1b2','k1b3','k1b3b','k1b4'].map(k=>k+':'+(ZC.FIN.music.TR[k]?ZC.FIN.music.TR[k].bpm+'/'+ZC.FIN.music.TR[k].len:'нет')).join(' ');a
//@@
// переход: Леший хохочет, потом дым (тема 2); кадр — «четыре Лешего» над ареной
W.bossNext();ZC.tick(60*2);const e1=L.k1.emo;const mc=!!ZC.G.cine;ZC.tick(60*4.2);'mid cine='+mc+' laugh='+e1+' music='+K.musName+' calls='+calls.slice(-3).join(',')
//@@
ZC.skip();ZC.tick(60*2);'phase='+W.flags.phase+' doubles='+W.doubles.length+' music='+K.musName+' errs='+window._errs.length
//@@ shot=k1bc_s3.png
// выход на хоровод: пень растёт, Леший встаёт на него, руки-ветви вверх; кадр — когда фонарики уже горят
W.bossNext();ZC.tick(30);const ci=!!ZC.G.cine,y0=L.g.position.y;ZC.tick(60*4.6);'s3 intro cine='+ci+' Leshy y '+y0.toFixed(1)+'→'+L.g.position.y.toFixed(1)+' on='+S.on+' music='+K.musName+' lamps='+K.fx.lamps.filter(l=>l.on).length
//@@
ZC.skip();ZC.tick(30);'after: cine='+!!ZC.G.cine+' on='+S.on+' st='+S.st+' y='+L.g.position.y+' stump='+(S.stump?S.stump.scale.x:'-')+' arms='+L.rig.shL.rotation.z.toFixed(2)+' music='+K.musName+' calls='+calls.slice(-3).join(',')
//@@
// «Тяни-потяни» и мах — как в tfin_k1b3, без бега: два круга сразу; круг 2 — тема быстрее
ZC.tick(60*2);S.boss.onDeath();ZC.tick(60*4);const r1='round='+S.round+' st='+S.st+' music='+K.musName;S.boss.onDeath();ZC.tick(5);r1+' → won='+!!W.flags.won+' music='+K.musName
//@@ shot=k1bc_end.png
// финал: ролик с колыбельной; кадр — Леший с одним цветущим рогом на пне, листопад, лешачата хлопают
ZC.tick(60*1.6);const in0=!!ZC.G.cine;ZC.tick(60*2.4);'end cine='+in0+' music='+K.musName+' calls='+calls.slice(-4).join(',')
//@@ shot=k1bc_end2.png
ZC.tick(60*5);'end close-up: t='+ZC.G.cine.t.toFixed(1)
//@@
ZC.skip();ZC.tick(60*3);ZC.skip();ZC.tick(60*3);'end: lvl='+ZC.W.levelId+' done='+JSON.stringify(ZC.G.done)+' errs='+window._errs.length+(window._errs.length?' '+window._errs[0]:'')
