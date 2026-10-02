/* ============================== РЕЛИЗ final06 · 1-4 «ЛЕШИЙ ВОДИТ»: ШАПКИ НА ГОЛОВАХ, ЁЛКИ УТАСКИВАЮТ ПЕЛАГЕЮ ============================== */
// Было: шапка из мха висела на группе героя на высоте роста из прототипа — у новых героев (late_15) она парила над головой или
// проваливалась в неё (у Прошки «на нос» — на 0,35 м ниже) и не двигалась с головой. Пелагея в ролике «Пелагею увели» с первого кадра
// уже стояла в кольце ёлок за изгородью — непонятно, как она туда попала.
// Теперь:
//  · шапка сидит на кости головы (как шапки гардероба, посадка FIT из late_15): качается и наклоняется вместе с головой; надевается
//    сверху с пружинкой; у Прошки («на нос») — та же посадка, лишь надвинута на лоб; в ролике под «на нос съезжает» шапка съезжает
//    ему на глаза и подпрыгивает обратно. У Йоши голова на шаре — шапка, как и гардероб, на теле;
//  · ролик: Пелагея любуется светлячками на тропе у изгороди, Прошка отвернулся; ёлки за её спиной открывают глаза, на цыпочках
//    обступают её и пускаются в хоровод — всё быстрее, клонятся наружу, летят иглы и листья, светлячки разлетаются; хоровод
//    подхватывает Пелагею, вихрем перемахивает изгородь и уносит её на поляну, где ёлки с грохотом встают в кольцо, а Пелагея,
//    покачиваясь, приземляется в середине. Кадры: светлячки → Прошка отвернулся → глаза за спиной → хоровод сквозь ёлки → сверху →
//    вихрь через изгородь → приземление; дальше — прежний ролик (Пелагея в кольце, Йоша, Прошка у пня, взгляд сквозь щель).
// Ролик прототипа не переписывается: rep_30_gameplay.py оборачивает его определение в FIN.k14Kid(def,ctx); длина та же (25,5 с).
const K14={};
// ---------- шапка из мха — на голове ----------
function k14HatMount(h){const hat=h.hat;if(!hat||hat.userData.k14)return;const f=FIT[h.kind];if(!f||!h.rig)return;hat.userData.k14=true;
  if(h.kind!=='yosha'&&h.rig.head&&h.rigBind&&h.rigBind.head){const w=h.rigBind.head;h.rig.head.add(hat);hat.userData.base=new V3(-w.x,f.hat-w.y,-w.z);}
  else{h.body.add(hat);hat.userData.base=new V3(0,f.hat,0);}
  hat.userData.s=f.hs;hat.scale.setScalar(f.hs);hat.traverse(o=>{o.castShadow=false;});}
function k14Hat(h){const hat=h.hat;if(!hat)return;k14HatMount(h);const u=hat.userData;if(!u.base)return;const on=!!h.hatOn;
  if(on&&!u.was)u.t0=G.time;u.was=on;if(!on)return;const s=u.s;
  // надевает: опускается сверху с пружинкой и чуть сплющивается
  const k=Math.min(1,Math.max(0,(G.time-(u.t0==null?-9:u.t0))/0.32)),drop=(1-CE.outBack(k))*0.32;let y=u.base.y+drop,z=u.base.z,rx=0;
  if(h.hatOn==='nose'){rx=0.3;y-=0.02;z+=0.025;}   // велика: надвинута на лоб — но на голове
  // «на нос съезжает»: съезжает на глаза и подпрыгивает обратно
  const g=h._hatGag!=null?G.time-h._hatGag:9;if(g>=0&&g<1.1){const d=g<0.2?CE.outCubic(g/0.2):g<0.72?1:Math.max(0,1-CE.outBack(Math.min(1,(g-0.72)/0.3)));y-=0.12*d;z+=0.05*d;rx+=0.4*d;}
  hat.position.set(u.base.x,y,z);hat.rotation.set(rx,0,0);const sq=k<1?Math.sin(k*Math.PI)*0.16:0;hat.scale.set(s*(1+sq),s*(1-sq),s*(1+sq));}
{const _ah=animHero;animHero=function(h,dt){_ah(h,dt);try{k14Hat(h);}catch(e){console.error(e);}};}
// ---------- ролик «Пелагею увели»: ёлки кружат, окружают и утаскивают ----------
const K14_S=new V3(1.3,0,-26.2),K14_PR=new V3(-1.1,0,-22.5),K14_M=new V3(3.9,0,-28.6);
const k14Wrap=a=>{while(a>Math.PI)a-=2*Math.PI;while(a<=-Math.PI)a+=2*Math.PI;return a;};
const K14_T={whirl:6.6,lift:8.7,carry:9.5,land:12.0,plant:12.6};
// угол хоровода: разгон, вихрь, торможение — к концу ровно целое число оборотов (ёлки встают на свои места кольца)
function k14Phi(){const dt=0.01,T0=K14_T.whirl,T1=K14_T.plant,w=t=>t<T0?0:t<T0+1.1?5.2*smooth((t-T0)/1.1):t<K14_T.land?5.2:t<T1?5.2*(1-smooth((t-K14_T.land)/(T1-K14_T.land))):0;
  const tab=[0];let p=0;for(let t=T0;t<T1;t+=dt){p+=w(t+dt/2)*dt;tab.push(p);}const n=Math.max(1,Math.round(p/(2*Math.PI))),kk=n*2*Math.PI/p;
  return T=>{if(T<=T0)return 0;if(T>=T1)return n*2*Math.PI;const x=(T-T0)/dt,i=Math.min(tab.length-2,Math.floor(x)),f=x-i;return (tab[i]+(tab[i+1]-tab[i])*f)*kk;};}
const k14Bez=(a,m,b,u)=>new V3((1-u)*(1-u)*a.x+2*(1-u)*u*m.x+u*u*b.x,0,(1-u)*(1-u)*a.z+2*(1-u)*u*m.z+u*u*b.z);
function k14Center(T,RC){if(T<K14_T.carry)return K14_S.clone();if(T>=K14_T.land)return new V3(RC.x,0,RC.z);return k14Bez(K14_S,K14_M,RC,CE.inOutSine((T-K14_T.carry)/(K14_T.land-K14_T.carry)));}
function k14Hop(T){const u=(T-K14_T.carry)/(K14_T.land-K14_T.carry);return u>0&&u<1?2.3*Math.sin(Math.PI*u):0;}
function k14Flies(){const L=[],mt=new THREE.MeshBasicMaterial({color:0xfff08a});for(let i=0;i<9;i++){const m=new THREE.Mesh(new THREE.SphereGeometry(0.045,6,5),mt);m.visible=false;W.group.add(m);
    L.push({m,a:i/9*Math.PI*2,r:rand(0.55,1.25),y:rand(0.7,1.9),s:rand(0.5,1.1),v:new V3(rand(-1,1),rand(0.6,1.6),rand(-1,1)).normalize().multiplyScalar(rand(3,5))});}return L;}
// вихрь: три светлые ленты-спирали вокруг хоровода — «закружили» читается и в общем плане
function k14Vortex(){const g=new THREE.Group();g.visible=false;W.group.add(g);const L=[];
  for(let k=0;k<3;k++){const pts=[];for(let i=0;i<=40;i++){const u=i/40,a=u*Math.PI*3+k*Math.PI*2/3,r=1.7+0.9*u;pts.push(new V3(Math.cos(a)*r,0.15+u*3.1,Math.sin(a)*r));}
    const m=new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts),60,0.06+0.03*k,5,false),new THREE.MeshBasicMaterial({color:k===1?0xe8ffd8:0xffffff,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending,fog:false}));
    m.userData.dress=true;m.userData.batchNo=true;m.userData.occEx=true;m.renderOrder=8;g.add(m);L.push(m);}return {g,L};}
function k14Tick(c,T,dt,live){const K=K14,S=K14_S,ring=c.ring,pe=c.pe,RC=c.RC,t=G.time;
  // светлячки у Пелагеи: кружат, в хороводе — разлетаются
  for(const q of K.flies){const sc=T<K14_T.whirl?1:Math.max(0,1-(T-K14_T.whirl)/0.9);q.m.visible=T<K14_T.whirl+0.9;if(!q.m.visible)continue;q.a+=dt*q.s;
    const p=new V3(S.x+Math.cos(q.a)*q.r,q.y+Math.sin(t*2+q.a)*0.2,S.z+Math.sin(q.a)*q.r);if(T>=K14_T.whirl)p.addScaledVector(q.v,T-K14_T.whirl);q.m.position.copy(p);q.m.scale.setScalar(Math.max(0.01,sc));}
  // вихрь
  {const V=K.vortex,on=T>=K14_T.whirl&&T<K14_T.plant+0.3;V.g.visible=on;if(on){const C0=k14Center(T,RC),a=Math.min(1,(T-K14_T.whirl)/0.6)*Math.min(1,Math.max(0,(K14_T.plant+0.3-T)/0.6));
    V.g.position.set(C0.x,k14Hop(T)*0.9,C0.z);V.g.rotation.y=-K.phi(T)*1.35-T*2;V.g.scale.set(1,0.8+0.25*Math.sin(T*3),1);V.L.forEach((m,i)=>{m.material.opacity=a*(0.32+0.12*Math.sin(T*7+i*2));});}}
  if(T>=K14_T.plant+0.6){if(!K.done){K.done=true;ring.forEach(f=>{f.g.position.set(RC.x+Math.cos(f.a)*c.RR,0,RC.z+Math.sin(f.a)*c.RR);f.g.rotation.set(0,-f.a-Math.PI/2,0);});}return;}
  // ёлки: притворяются лесом за спиной → обступают → хоровод → вихрь через изгородь → встают кольцом
  const ph=K.phi(T),C=k14Center(T,RC),hop=k14Hop(T),spd=T<K14_T.whirl?0:T<K14_T.land?Math.min(1,(T-K14_T.whirl)/1.1):Math.max(0,1-(T-K14_T.land)/0.6);
  ring.forEach((f,i)=>{const d=K.dis[i];let ang,r,y=0;
    if(T<5.4){ang=d.a;r=d.r;}
    else if(T<K14_T.whirl){const u=smooth((T-5.4)/(K14_T.whirl-5.4));ang=lerp(d.a,d.slot,u);r=lerp(d.r,2.3,u);y=Math.abs(Math.sin((T-5.4)*11+i))*0.22*(1-u*0.3);}
    else{ang=d.slot+ph;r=T<K14_T.carry?lerp(2.3,1.65,smooth((T-K14_T.whirl)/1.6))+0.13*Math.sin(T*9+i*1.7)*spd:T<K14_T.land?1.65+0.1*Math.sin(T*11+i):
      T<K14_T.plant?lerp(1.65,c.RR,CE.outBack(smooth((T-K14_T.land)/(K14_T.plant-K14_T.land)))):c.RR;
      y=hop*(0.9+0.12*Math.sin(i*2.1))+Math.abs(Math.sin(T*9+i*1.3))*0.25*spd;
      if(T>=K14_T.plant)y=Math.max(0,0.12*Math.sin((T-K14_T.plant)*14)*Math.exp(-(T-K14_T.plant)*7));}
    const x=C.x+Math.cos(ang)*r,z=C.z+Math.sin(ang)*r;f.g.position.set(x,y,z);
    const face=Math.atan2(C.x-x,C.z-z);
    if(T<5.4)f.g.rotation.set(0,face,0);
    else if(T<K14_T.plant){const lean=T<K14_T.whirl?0.12*Math.sin((T-5.4)*11+i):-0.28*spd;f.g.rotation.set(lean,face,0.06*Math.sin(T*13+i)*spd);}
    else{const u=smooth((T-K14_T.plant)/0.5);f.g.rotation.set(0,lerp(face,face+k14Wrap(-f.a-Math.PI/2-face),u),0);}});
  // глаза открываются по одному
  ring.forEach((f,i)=>{const on=T>=4.8+i*0.07;if(on!==f._eye){f._eye=on;f.em.color.setHex(on?0xfff3a0:0x1a2a1a);f.em.emissive.setHex(on?0xffe070:0x000000);f.em.emissiveIntensity=on?2.2:0.9;
      f.g.children.forEach(m=>{if(m.material===f.em)m.scale.setScalar(on?1.5:1);});if(on&&live)tone(rand(110,170),0.22,'sawtooth',0.05,rand(70,90));}});
  // Пелагея: любуется → оборачивается → кружится в хороводе → подхвачена → уносится → приземляется и покачивается
  const toPR=Math.atan2(K14_PR.x-S.x,K14_PR.z-S.z);
  if(T<K14_T.carry){pe.pos.x=S.x;pe.pos.z=S.z;}else if(T<K14_T.land+0.4){const P=k14Center(Math.min(T,K14_T.land),RC);pe.pos.x=P.x;pe.pos.z=P.z;}
  pe.vel.set(0,pe.vel.y,0);
  if(T<5.8)pe.face=toPR+0.45*Math.sin(T*1.1);else if(T<K14_T.whirl)pe.face=lerp(toPR,toPR+Math.PI,smooth((T-5.8)/0.6));
  else if(T<K14_T.land+0.5)pe.face=toPR+Math.PI+ph*0.55+0.3*Math.sin(T*7);
  const lift=T<K14_T.lift?0:T<K14_T.carry?0.3*smooth((T-K14_T.lift)/0.8):T<K14_T.land?0.3+hop*0.9+1.0*Math.sin(Math.PI*(T-K14_T.carry)/(K14_T.land-K14_T.carry))+0.08*Math.sin(T*9):T<K14_T.land+0.35?0.3*(1-smooth((T-K14_T.land)/0.35)):0;
  pe.extraY=lift+(T>=K14_T.land+0.35&&T<K14_T.land+0.8?Math.abs(Math.sin((T-K14_T.land-0.35)*9))*0.12*(1-(T-K14_T.land-0.35)/0.45):0);
  pe.body.rotation.z=T>=K14_T.land+0.3&&T<13.2?0.16*Math.sin((T-K14_T.land)*7)*Math.max(0,1-(T-K14_T.land-0.3)/0.9):T>=K14_T.whirl&&T<K14_T.land?0.12*Math.sin(T*8):0;
  // вихрь: иглы и листья по кругу, ветер
  if(live&&T>=K14_T.whirl&&T<K14_T.plant&&t>=(K.leafT||0)){K.leafT=t+0.11;const a=rand(0,Math.PI*2),r=rand(1.2,2.2);try{FX.leaves(new V3(C.x+Math.cos(a)*r,rand(0.4,2.0)+hop,C.z+Math.sin(a)*r),4);}catch(e){}}
  if(live){const at=(k,t0,fn)=>{if(T>=t0&&!K.snd[k]){K.snd[k]=1;try{fn();}catch(e){}}};
    at('tip',5.4,()=>{for(let i=0;i<6;i++)AUD.nz({f0:900,f1:400,d:0.08,q:1.2,v:0.05,type:'bandpass',at:i*0.19});});
    at('wind',K14_T.whirl,()=>{AUD.nz({f0:250,f1:1400,f2:300,d:6.2,q:0.8,v:0.09,a:0.6,type:'bandpass',pan0:-0.7,pan1:0.7,wet:0.4});SFX.whoosh();});
    for(let k=0;k<10;k++)at('sw'+k,K14_T.whirl+0.6+k*0.52,()=>{AUD.nz({f0:500,f1:2200,d:0.35,q:1.4,v:0.05,type:'bandpass',pan0:k%2?-0.8:0.8,pan1:k%2?0.8:-0.8});});
    at('lift',K14_T.lift,()=>{tone(523,0.18,'triangle',0.05,880);});
    at('hop',K14_T.carry,()=>{SFX.whoosh();AUD.osc({f0:300,f1:900,d:1.1,v:0.03,type:'sine',glide:1});});
    at('land',K14_T.land+0.3,()=>{SFX.thud&&SFX.thud();});
    at('plant',K14_T.plant,()=>{SFX.gate();SFX.thud&&SFX.thud();try{FX.dust&&FX.dust(new V3(RC.x,0.05,RC.z),16,0x8a7a5a);}catch(e){}});}}
FIN.k14Kid=function(def,c){try{const near=(a,b)=>Math.abs(a-b)<0.02,RC=c.RC,S=K14_S,PR=K14_PR;
  // Прошка остаётся, где стоит, если он рядом с Пелагеей на тропе; издалека — ставится рядом (кадры от Пелагеи — по постоянной точке)
  const keepPr=hd(c.pr.pos,S)<6.5&&c.pr.pos.z<-19,PRo=keepPr?new V3(c.pr.pos.x,0,c.pr.pos.z):PR.clone();K14.PR=PRo;
  Object.assign(K14,{c,phi:k14Phi(),flies:k14Flies(),vortex:k14Vortex(),snd:{},done:false,leafT:0});
  // где ёлки прячутся: за спиной Пелагеи (со стороны изгороди), по порядку своих мест в кольце — так они обступают её с двух сторон
  const back=Math.atan2(S.z-PR.z,S.x-PR.x);K14.dis=c.ring.map((f,i)=>{const w=k14Wrap(f.a-back);return {slot:back+w,a:back+w*0.42,r:2.9+0.5*((i*5)%3)/2};});
  const A=v=>[v.x,v.y,v.z],P=(v,x,y,z)=>[v.x+x,y,v.z+z],dir=new V3(PR.x-S.x,0,PR.z-S.z).normalize(),bk=dir.clone().negate(),side=new V3(-dir.z,0,dir.x);
  // события: прежние до кольца заменены (Йоша остаётся, где был — как в прототипе)
  const drop=[0,3.0,4.8,6.2,6.7,8.4,15.4];def.events=def.events.filter(e=>!drop.some(d=>near(e.t,d)));
  def.events.push({t:0,fn:()=>{if(players[1].act===0)doSwap(1);const pe=c.pe,pr=c.pr,yo=c.yo;placeOnGround(pe,S.x,S.z,0);pe.following=false;pe.extraY=0;
      if(!keepPr)placeOnGround(pr,PRo.x,PRo.z,0);pr.face=Math.atan2(S.x-PRo.x,S.z-PRo.z);
      c.eyes(false);c.ring.forEach((f,i)=>{f.g.visible=true;f.col.on=false;f._eye=false;});K14.snd={};K14.done=false;}},
    {t:3.0,fn:()=>{const pr=c.pr,a0=pr.face,a1=Math.atan2(-7-PRo.x,-19-PRo.z);anim(0.7,k=>{pr.face=lerp(a0,a1,smooth(k));});}},
    {t:K14_T.carry-0.1,fn:()=>{c.hedge.forEach(h=>{h.on=false;});if(c.tun)c.tun.on=false;}},   // вихрь перемахивает изгородь
    {t:10.5,fn:()=>{const pr=c.pr,a0=pr.face,a1=Math.atan2(S.x-PRo.x,S.z-PRo.z);anim(0.4,k=>{pr.face=lerp(a0,a1,smooth(k));});}},
    {t:K14_T.land,fn:()=>{c.hedgeFirs.forEach(f=>{f.g.visible=false;});}},
    {t:K14_T.plant,fn:()=>{c.hedge.forEach(h=>{h.on=true;});if(c.tun)c.tun.on=true;c.ring.forEach(f=>{f.col.on=true;});shakeAll(0.05,0.4);placeOnGround(c.pe,RC.x,RC.z,0);}},
    {t:13.2,fn:()=>{c.pe.body.rotation.z=0;c.pe.extraY=0;}},
    {t:15.4,fn:()=>{c.yo.face=Math.atan2(c.pr.pos.x-c.yo.pos.x,c.pr.pos.z-c.yo.pos.z);c.pe.body.rotation.x=0;c.hedgeFirs.forEach(f=>{f.g.visible=true;});}},
    {t:21.55,fn:()=>{c.pr._hatGag=G.time;tone(330,0.18,'triangle',0.05,220);later(0.75,()=>tone(440,0.1,'triangle',0.05,660));}});
  def.events.sort((a,b)=>a.t-b.t);
  // кадры
  // у пня — с севера, навстречу Прошке: видно лицо, когда шапка съезжает на глаза (с юга кадр закрывал идущий следом Потап)
  def.shots=def.shots.filter(s=>!(s.t<13.1||near(s.t,17.6)));
  def.shots.push(shot(0,A(S.clone().addScaledVector(dir,2.4).addScaledVector(side,0.5).setY(1.3)),P(S,0,0.95,0),A(S.clone().addScaledVector(dir,1.9).addScaledVector(side,0.35).setY(1.15)),P(S,0,1.0,0),3),
    shot(3.0,P(PRo,1.3,1.5,1.4),P(PRo,0,1.1,0),P(PRo,0.9,1.4,1.1),P(PRo,0,1.1,0),1.8),
    shot(4.8,A(S.clone().addScaledVector(dir,1.75).setY(0.55)),A(S.clone().addScaledVector(bk,2.6).setY(1.3)),A(S.clone().addScaledVector(dir,1.45).setY(0.5)),A(S.clone().addScaledVector(bk,2.6).setY(1.35)),1.5),
    shot(6.3,A(S.clone().addScaledVector(side,6.6).setY(1.5)),P(S,0,1.1,0),A(S.clone().addScaledVector(side,5.9).setY(1.75)),P(S,0,1.2,0),1.6),
    shot(7.9,P(S,0.25,6.2,0.4),P(S,0,0.3,0),P(S,0.35,9.2,0.6),P(S,0,0.3,0),1.6),
    shot(9.5,[-4.4,4.6,-23.0],[S.x+0.7,1.8,S.z-0.8],[-3.0,5.2,-28.0],[RC.x-0.7,1.4,RC.z+0.8],2.5),
    shot(12.0,P(RC,-1.6,5.6,2.2),P(RC,0,0.4,0),P(RC,-1.3,4.8,1.8),P(RC,0,0.6,0),1.2),
    shot(17.6,[2.6,2.1,-3.6],[0.4,0.9,-0.4],[2.0,1.75,-2.7],[0.5,1.05,-0.1],4));
  def.shots.sort((a,b)=>a.t-b.t);
  // кадры сквозь хоровод: вырез «в горошек» и затухание у камеры (late_88) на время ролика выключены — иначе ёлки переднего плана уходят в узор
  const O=FIN.occ,occSet=on=>{if(!O||on===!!K14.occOff)return;if(on){K14.occWas=O.on;O.on=false;}else O.on=K14.occWas!==false;K14.occOff=on;};
  const tk=def.tick;def.tick=(t,dt)=>{if(tk)tk(t,dt);occSet(t<25.4);try{k14Tick(c,t,dt||0,dt>0&&dt<0.25);}catch(e){console.error(e);}};
  const en=def.end;def.end=()=>{occSet(false);try{const pe=c.pe;placeOnGround(pe,RC.x,RC.z,0);pe.extraY=0;pe.body.rotation.z=0;c.hedge.forEach(h=>{h.on=true;});if(c.tun)c.tun.on=true;
      K14.flies.forEach(q=>{if(q.m.parent)q.m.parent.remove(q.m);});if(K14.vortex.g.parent)K14.vortex.g.parent.remove(K14.vortex.g);c.pr._hatGag=null;
      c.ring.forEach(f=>{f.em.emissiveIntensity=0.9;f.g.children.forEach(m=>{if(m.material===f.em)m.scale.setScalar(1);});});}catch(e){console.error(e);}
    if(en)en();c.ring.forEach(f=>{f.g.position.y=0;f.g.rotation.set(0,-f.a-Math.PI/2,0);});};
  return def;}catch(e){console.error(e);return def;}};
FIN.k14Dbg=()=>K14;   // для ботов
{const _ll=loadLevel;loadLevel=function(i){if(K14.occOff&&FIN.occ){FIN.occ.on=K14.occWas!==false;K14.occOff=false;}_ll(i);};}
// метки режиссуры ролика (late_86): под хоровод и вихрь
{const e=DIR.find(x=>x.lv==='1-4'&&Math.abs(x.dur-25.5)<0.01);if(e)e.cues=[[5.75,dEmo('pelageya','surprise')],[6.4,dDZ(0.28,0.8,1.2)],[6.55,dMood(COLD,0.18)],[6.8,dEmo('pelageya','fear')],
  [9.55,dDutch(-0.08,2.2)],[10.6,dEmo('proshka','surprise')],[12.62,dTrauma(0.45)],[15.8,dEmo('proshka','droop')],[22,dMood(WARM,0.08)]];}
