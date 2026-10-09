/* ============================== РЕЛИЗ final06 · 5-Б2 «КОЩЕЙ БЕССМЕРТНЫЙ И ЗЛАТАЯ ЦЕПЬ»: НАПАРНИК-БОТ ИДЁТ ПУТЁМ ИГРОКА 2 ============================== */
// Положения — из модулей 5-Б2 (FIN.k5e: стадия E.cur, пролог E.pro / E.proX, состояние стадии E.es; W.dbg5e). Пролог «Через леса, через моря»: правая голова Горыныча — Игрока 2.
// Курс бот берёт у человека (тянут вместе — разгон), огонь своей головы — по своим воронам и шарам, щит — на свою каплю в последние 0,8 с, «умение» на «три» вместе с человеком.
const K5B2={w:null,t:{}};
CMP.k5b2=K5B2;
const k5b2=()=>{if(K5B2.w!==W){K5B2.w=W;K5B2.t={};}return K5B2;};
const k5b2Tap=(K,k,gap,act)=>{if(!(K.t[k]>G.time-gap)){K.t[k]=G.time;cmpTap(act);return true;}return false;};
const K5B2_HAZ=[0xff4a5a,0xff4a3a,0xff3030,0xc040ff,0x9a5a2a];                                                 // цвета красных кругов Кощея на земле (k5Zone)
// красный круг на мне: заполняется — выйти (кувырок, если уже почти заполнился)
const k5b2Flee=(K,h)=>{for(const z of(FIN.k5.zones||[])){if(!z.parent||z.userData.dead||!z.children||!z.children[0])continue;
    const c=z.children[0].material.color.getHex();if(K5B2_HAZ.indexOf(c)<0)continue;const r=z.children[0].geometry.parameters.outerRadius,d=hd(h.pos,z.position);if(d>r+0.4)continue;
    const k=z.children[1]?z.children[1].scale.x:0,dx=h.pos.x-z.position.x,dz=h.pos.z-z.position.z,n=Math.hypot(dx,dz)||1,tx=z.position.x+dx/n*(r+1.6),tz=z.position.z+dz/n*(r+1.6);
    cmpGoto(h,tx,tz,0.3);if(k>0.55)k5b2Tap(K,'roll',0.7,'roll');return true;}
  return false;};
// все стадии битвы (E.cur 1…12) — одним шагом: общее (красные круги), потом своё для каждой стадии; 'follow' — дальше обычный бой и ведомый
const K5B2_ST={};
CMP.route('5-B2',[
  // пролог: погоня на Горыныче — полёт, как в 5-3
  {id:'pro',first:true,done:()=>(FIN.k5e.cur|0)>=1,run:(h,hh)=>{const K=k5b2(),E=FIN.k5e,PRO=E.pro;
    if(!PRO||!PRO.on||G.cine||G.ui||['forest','gorge','sea','sky','write','three'].indexOf(PRO.leg)<0)return 'follow';
    for(const a of['left','right','up','down']){const c=BIND[0][a];if(down.has(c)||PADS.down.has(c))cmpKey(a,true);}PADS.axes[1]=PADS.axes[0];   // курс — как у человека
    const X=E.proX();
    if(X.crows.some(c=>c.alive&&!c.leave&&(c.lead||c.pi===1))||X.orbs.some(o=>o.alive&&(o.gold||o.pi===1)))k5b2Tap(K,'fire',0.45,'attack');   // огонь по своим воронам и шарам
    const d=X.drops.find(q=>q.pi===1&&!q.refl&&q.dur-q.t<=0.8&&q.dur-q.t>0.08);if(d)k5b2Tap(K,'guard',0.4,'guard');                          // моя капля — щит в последний миг
    const C0=PRO.cnt;if(C0&&C0.press[1]===null&&C0.t>=1.5-0.04)cmpTap('skill');}},                                                              // «раз-два-ТРИ»
  // стадии 1…12: общее — красные круги; своё — K5B2_ST[n](h,hh,K) (вернуть 'follow' — обычный бой)
  {id:'epic',first:true,done:()=>false,run:(h,hh)=>{const K=k5b2(),E=FIN.k5e,n=E.cur;if(n==null||n<1||G.cine||G.ui)return 'follow';
    if(k5b2Flee(K,h))return;
    const K5=FIN.k5,lk=K5.locks||{};
    if(K5.fight){                                                                                         // Кощей сковал героя: друга освобождаем ударами по замку, сковали меня — меняю героя
      if(lk[h.kind]){const o=other(1);if(o&&!lk[o.kind]&&!o.cling)cmpWant(o.kind);return;}
      let L=null,bd=99;for(const k in lk){const q=lk[k];if(!q||q.h===h)continue;const d=hd(q.h.pos,h.pos);if(d<bd){bd=d;L=q;}}
      if(L){h.following=false;if(bd>1.6){cmpGoto(h,L.h.pos.x,L.h.pos.z+1.2,0.3);return;}h.face=Math.atan2(L.h.pos.x-h.pos.x,L.h.pos.z-h.pos.z);k5b2Tap(K,'unlock',0.45,'attack');return;}}
    const f=K5B2_ST[n];return f?f(h,hh,K,E):'follow';}}
]);
// стадия 2: Леший в цепи — стоим в зелёном круге у него (молния бьёт в того, кто рядом; красный круг — выйти), две молнии рвут два замка
K5B2_ST[2]=(h,hh,K,E)=>{if(E.free.leshy||!FIN.k5.fight)return 'follow';
  const L=E.fr.leshy.m.g.position,sp={x:L.x-2.0,z:L.z+0.2};h.following=false;
  if(hd(h.pos,sp)>0.5)cmpGoto(h,sp.x,sp.z,0.3);};
// цели-«бей сюда» (W.hittables): радиус — по ним стадии отличаются (1,4 — Кощей в окне, 1,1 — веретено, 1,0 — мороки и замки…)
const k5b2Ht=r=>W.hittables.filter(t=>t.r===r&&t.alive()&&t.pos);
// подойти к цели и бить (раз в 0,4 с)
const k5b2Strike=(h,K,t,gap,reach)=>{const p=t.pos,d=hd(h.pos,p);if(d>(reach||1.5)){cmpGoto(h,p.x,p.z+Math.min(1.0,Math.max(0.3,d-0.3)),0.3);return true;}h.face=Math.atan2(p.x-h.pos.x,p.z-h.pos.z);k5b2Tap(K,'ht',gap||0.4,'attack');return true;};
// стадия 3: туман и мороки. Капли щитом — общий бой; бот: бьёт Кощея в окне (сбит каплей), веретено Кикиморы, сошедших мороков; последний удар (нить) — вместе с человеком
K5B2_ST[3]=(h,hh,K,E)=>{const ES=E.es;if(!ES.fight)return 'follow';
  const kos=k5b2Ht(1.4)[0];
  if(kos){if(ES.spes<=0){const hb=(ES.bind&&ES.bind[0])||-9;if(G.time-hb<1.4||G.time-(K.bindT||(K.bindT=G.time))>3){return k5b2Strike(h,K,kos,0.4,1.6);}     // нить сказа: оба в пределах 1,6 с
      k5b2Strike(h,K,Object.assign({},kos),99,1.6);return true;}
    return k5b2Strike(h,K,kos,0.4,1.6);}
  K.bindT=0;
  const sp=k5b2Ht(1.1)[0];if(sp&&ES.spinSt==='rest')return k5b2Strike(h,K,sp,0.35,1.5);                                                          // веретено замерло золотом — бить
  const mobs=k5b2Ht(1.0).filter(t=>hd(t.pos,h.pos)<7).sort((a,b)=>hd(a.pos,h.pos)-hd(b.pos,h.pos));if(mobs.length)return k5b2Strike(h,K,mobs[0],0.4,1.4);   // сошедшие мороки
  return 'follow';};
// стадия 1: замок на цепи Кота-часов (пока Кот не пройдёт по кругу, замок держит часы) — сбить, если рядом никто не замахивается
K5B2_ST[1]=(h,hh,K,E)=>{if(!FIN.k5.fight||!E.clock||!E.clock.live)return 'follow';
  if(W.enemies.some(e=>e.alive&&e.state==='wind'&&e.tgt===h))return 'follow';
  const lk=k5b2Ht(1.0)[0];if(!lk||hd(lk.pos,h.pos)>28)return 'follow';
  return k5b2Strike(h,K,lk,0.4,1.4);};
