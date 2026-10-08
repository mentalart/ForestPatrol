//@@ wait=900
// F-6: детские настройки в мирах 4–5 (ступень боссов KIDS_W[4/5]): замах, красный знак, окно кувырка, tipMul — Лёгкий / Средний / Богатырь; красная голова 4-Б.
window.ERR=[];window.addEventListener('error',e=>ERR.push(String(e.message)));
window.BAD=[];window.chk=(c,m)=>{if(!c)BAD.push(m);return c;};window.KD=ZC.FIN.kids;KD.force=true;
window.kill=e=>{e.alive=false;const k=ZC.W.enemies.indexOf(e);if(k>=0)ZC.W.enemies.splice(k,1);e.g.visible=false;};
window.setup=id=>{ZC.G.manual=true;ZC.loadLevel(ZC.LV(id));ZC.tick(20);for(let q=0;q<4&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(30);};
window.windE=(sig,path,big)=>{const P=ZC.players,h=P[0].heroes[P[0].act];P[0].path=path;P[1].path=path;P[0].enc={};P[0].downed=false;P[0].petals=3;
  const e=ZC.FIN.dbgFoe('morok',h.pos.x+1.6,h.pos.z-1.2,{signals:[sig]});if(big)e.big=true;e.cd=0;for(let i=0;i<600&&e.state!=='wind';i++)ZC.tick(1);
  const w=e.state==='wind'?+e.wdur.toFixed(3):-1;kill(e);return w;};
const out=[];
for(const id of['4-1','5-1']){setup(id);const W=ZC.W;
  chk(W.kidsK===0.4&&W.tipMul>=1.5,id+': kidsK/tipMul '+W.kidsK+'/'+W.tipMul);
  const ye=windE('yellow','easy'),ym=windE('yellow','mid'),yh=windE('yellow','hard'),re=windE('red','easy'),rm=windE('red','mid'),rh=windE('red','hard'),he=windE('red','easy',true),hm=windE('red','mid',true),hy=windE('yellow','easy',true),hym=windE('yellow','mid',true);
  chk(ye>=0.9-0.01,id+' Лёгкий жёлтый ≥ 0,9: '+ye);chk(re>=1.2,id+' Лёгкий красный ≥ 1,2: '+re);chk(he>=1.2,id+' красная голова Лёгкий ≥ 1,2: '+he);
  chk(hy>=1.0,id+' голова Лёгкий жёлтая ≥ 1,0: '+hy);chk(hm>=0.8-0.01&&hym>=0.8-0.01,id+' голова Средний ≥ 0,8: '+hm+'/'+hym);
  chk(Math.abs(yh-0.35)<0.01&&Math.abs(rh-0.35)<0.01,id+' Богатырь без поблажек (0,35): '+yh+'/'+rh);
  const st=W.kidsSt;chk(st&&st.roll>=0.8,id+' окно кувырка '+(st&&st.roll));
  out.push(id+' жёлт '+[ye,ym,yh]+' красн '+[re,rm,rh]+' голова красн '+[he,hm]);}
// мир 1–3 не тронуты
setup('2-1');chk(Math.abs(windE('yellow','easy')-0.82)<0.01,'мир 2: 0,82 как прежде');
out.concat(BAD)
//@@
// 4-Б: красная голова на Лёгком — реальный замах и окно кувырка 0,8 с
ZC.startFrom(ZC.LV('4-B'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(5);
const P=ZC.players;P[0].path='easy';P[1].path='easy';P[0].enc={};P[1].enc={};
const hs=ZC.W.enemies.filter(e=>e.kind==='golova');let best=null;
for(let i=0;i<60*40&&!best;i++){ZC.tick(1);for(const e of hs)if(e.state==='wind'&&e.sig==='red')best=+e.wdur.toFixed(3);}
chk(best!==null&&best>=1.2,'4-Б: красная голова на Лёгком ≥ 1,2 с: '+best);chk(ZC.W.kidsSt&&ZC.W.kidsSt.roll>=0.8,'4-Б: окно кувырка '+(ZC.W.kidsSt&&ZC.W.kidsSt.roll));
['head red wdur='+best].concat(BAD)
//@@
window.ERR
