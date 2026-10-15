/* ============================== РЕЛИЗ final06 · 1-Б «ЛЕШИЙ-ПУТАНИК»: У КАЖДОГО ГЕРОЯ — СВОЯ РОЛЬ В БОЮ (АУДИТ 1-Б, Д1, Д3–Д8, В3) ============================== */
// 1-Б — экзамен мира 1, а мир 1 учил всем четырём приёмам. Раньше в бою нужен был только Совиный взор (и тот дублировал мох-следы).
// Д1 + В3. «Держу!» — пробитую ладонь держит герой, стоящий у неё, в том числе оставленный при смене («оставленный держит» — и в соло):
//     Потап своим весом держит до 25 с, остальные — до 8 с. Пока держат, бегущий взбирается по мосту.
// Д3. Подкидка Потапа: у пробитой руки Потап бросает друга, стоящего рядом, прямо на плечо Лешего (дугой, 1,1 с). Смахивание второй рукой грозит по-прежнему.
// Д4. Рогатка Прошки — дальний ответ: жёлудь в вскинутую жёлтую ладонь («Хлоп») — она падает раньше, мимо, и увязает (окно открыто);
//     жёлудь в белку-шишкомётку — слетает с ветки (оглушена); в сороку на подлёте — роняет блестяшки и улетает.
// Д5. Живая вода Йоши: на увязшую ладонь — корни держат её в 1,5 раза дольше; на колышек — колышек прорастает лозой на 12 с:
//     струна от него не рвётся, ложный двойник на ней лопается шишками (late_99zdc_k1b_hide2.js).
// Д6. Мёртвая вода Йоши сращивает: струну, перегрызенную белкой (10 с после обрыва, у места обрыва), и ленту хоровода, с которой сорока унесла виток
//     (10 с, у пня Лешего) — виток возвращается.
// Д7. Йоша маленький: ладонь, смахивающая с моста, проносится над ним («Пронесло!»); зато корень-подножка держит его на треть дольше.
// Д8. Пелагея планирует: спланировала на ладонь руки (с плеча Лешего или с моста) — «Сова села!»: рука замирает, окно удара открыто.
const K1HE={stakeT:[],cut:[],stolen:[],perch:{},st:{hold:0,holdPotap:0,toss:0,slingHand:0,slingSq:0,slingMag:0,waterHand:0,vine:0,mend:0,lapBack:0,yoshaDuck:0,perch:0}};K1B.heroes=K1HE;
const k1heOn=()=>W&&W.levelId==='1-B'&&!!K1B.cur;
const k1heHands=()=>W.enemies.filter(e=>e.kind==='hand'&&e.alive&&e.k1);
/* ---------- Д1 + В3: держи — беги ---------- */
k1sHold=function(){for(const r of K1B.cur.ramps){const e=r.hand;if(!e||!e.alive||e.state!=='broken'||e.k1.fall||!e.k1bridge)continue;
    const holder=HEROES.filter(h=>!(h.active&&players[h.player].downed)&&h.pos.y<1&&hd(h.pos,e.pos)<e.r+1.8).sort((a,b)=>(b.kind==='potap')-(a.kind==='potap'))[0];
    const max=holder&&holder.kind==='potap'?K1S1.holdMax:8;
    if(holder&&G.time-(r.k1t0||G.time)<max){e.t=Math.min(e.t,Math.max(0,e.bdur-0.6));r.t=Math.max(r.t,1.2);
      if(!r.k1hold){r.k1hold=true;K1HE.st.hold++;if(holder.kind==='potap')K1HE.st.holdPotap++;SFX.knock();
        floatText(holder.pos.clone().add(new V3(0,2.4,0)),holder.kind==='potap'?'Держу — не шелохнётся!':'Держу!','#ffd76a');
        const runner=[active(0),active(1)].find(q=>q&&q!==holder&&q.pos.y<1);if(runner)tip(runner.player,holder.active?'Беги по руке — держат!':'Беги по руке — '+({proshka:'Прошка',potap:'Потап',pelageya:'Пелагея',yosha:'Йоша'}[holder.kind]||'друг')+' держит!',2.4);}}
    else r.k1hold=false;}};
/* ---------- Д3: подкидка на плечо ---------- */
function k1heToss(pi,h){if(h.kind!=='potap'||W.flags.phase!==1||!K1B.cur.ramps.length||h.skillCd>0)return false;
  const r=K1B.cur.ramps.find(q=>q.hand&&q.hand.k1bridge&&Math.hypot(h.pos.x-q.cols[0].x0,h.pos.z-q.cols[0].z0)<5.5);if(!r)return false;
  let o=null,bd=2.6;for(const q of HEROES){if(q===h||q.cling||q.pos.y>1)continue;if(q.active&&players[q.player].downed)continue;const d=hd(q.pos,h.pos);if(d<bd){bd=d;o=q;}}if(!o)return false;
  const rp=r.cols[0],fp=r.cols[1],to=fp?new V3(fp.x0+fp.dx*fp.len*0.3,fp.y0+0.1,fp.z0+fp.dz*fp.len*0.3):new V3(rp.x0+rp.dx*rp.len,rp.y1+0.1,rp.z0+rp.dz*rp.len),from=o.pos.clone();
  h.skillCd=0.8;h.atkT=0.28;SFX.toss();K1HE.st.toss++;h.face=Math.atan2(to.x-h.pos.x,to.z-h.pos.z);o.following=false;o.tossT=1.4;ringFx(o.pos,0xc08a48,1.6);
  floatText(o.pos.clone().add(new V3(0,o.d.height+0.5,0)),'Оп — на плечо!','#ffd9a0');
  anim(1.1,k=>{const q=k<1?k*(2-k)*0.6+k*0.4:1;o.pos.set(lerp(from.x,to.x,q),lerp(from.y,to.y,q)+Math.sin(k*Math.PI)*3.2,lerp(from.z,to.z,q));o.vel.set(0,k<1?0:-1,0);o.grounded=false;});
  return true;}
/* ---------- Д4: рогатка ---------- */
const K1HE_MH=[-1,1].map(s=>{const m={pos:new V3(),e:null,active:()=>{const e=k1heHands().find(q=>q.side===s);m.e=e;return !!e&&!G.cine&&W.flags.phase===1&&e.sig==='yellow'&&e.state==='wind'&&e.t<e.wdur*0.85;},
  onHit:()=>{const e=m.e;if(!e||!e.alive||e.state!=='wind')return;const F=K1B.fx,T=F&&F.hT&&F.hT.get(e);if(T){T.o.del();F.hT.delete(e);}
    e.state='recover';e.t=0;e.tgt=null;e.k1.prev='recover';K1N.atkAt=G.time;e.k1.top=0.6;k1nSlam(e);SFX.crash();shakeAll(0.03,0.2);K1HE.st.slingHand++;
    floatText(e.pos.clone().add(new V3(0,3.2,0)),'Жёлудем по когтю!','#ffd9a0');(K1N.stuckRaw||k1nStuck)(e);}};return m;});
const K1HE_MS=[0,1].map(i=>{const m={pos:new V3(),q:null,active:()=>{const q=K1B.mn2&&K1B.mn2.sq[i];m.q=q;if(!q||G.cine||W.flags.phase!==2||q.st==='stun')return false;m.pos.set(q.x,q.y+0.6,q.z);return true;},
  onHit:()=>{const q=m.q,M2=K1B.mn2;if(!q||!M2.sq.includes(q)||q.st==='stun')return;q.st='stun';q.t=0;if(q.tele)q.tele.del();q.tele=null;q.tgt=null;M2.st.stuns++;K1HE.st.slingSq++;
    try{SFX.knock();}catch(e){}floatText(new V3(q.x,q.y+2.2,q.z),'Жёлудем — с ветки!','#ffd9a0');}};return m;});
const K1HE_MM={pos:new V3(),active:()=>{const M3=K1B.mn3,o=M3&&M3.mag;if(!o||G.cine||o.st!=='dive')return false;K1HE_MM.pos.copy(o.pos);return true;},
  onHit:()=>{const o=K1B.mn3&&K1B.mn3.mag;if(!o||o.st!=='dive')return;K1HE.st.slingMag++;k1m3Swat(o,HERO.proshka);}};
/* ---------- Д5–Д6: ковшик Йоши ---------- */
function k1heStakes(){const want=W.flags.phase===2?W.stakes:[];
  for(const T of K1HE.stakeT.slice())if(!want.includes(T.s)){const i=W.waterTargets.indexOf(T);if(i>=0)W.waterTargets.splice(i,1);K1HE.stakeT.splice(K1HE.stakeT.indexOf(T),1);}
  for(const s of want)if(!K1HE.stakeT.some(T=>T.s===s)){const T={s,pos:new V3(s.x,0,s.z),pri:0.6,active:()=>W.flags.phase===2&&!G.cine&&!(s.k1vine>G.time),
      onWater:()=>{s.k1vine=G.time+12;K1HE.st.vine++;if(K1B.fx){K1B.fx.sprouts(s.x,s.z,1.2);K1B.fx.leaves(new V3(s.x,0.8,s.z),10,{spd:1.2,up:0.8,cols:[0x9acb48,0x6aa338,0xb8f0a0]});}
        floatText(new V3(s.x,1.8,s.z),'Колышек пророс — лоза!','#9fe6a0');}};W.waterTargets.push(T);K1HE.stakeT.push(T);}
  for(const t of W.threads){if(!t.string||!t.mat)continue;const v=t.stake&&t.stake.k1vine>G.time;if(v!==!!t.k1v){t.k1v=v;t.mat.color.setHex(v?0x6ad04a:COL.gold);t.mat.emissive.setHex(v?0x2a8a1a:0xffb000);}}}
const K1HE_WH=[-1,1].map(s=>{const T={pos:new V3(),pri:1.2,e:null,active:()=>{const e=k1heHands().find(q=>q.side===s);T.e=e;if(!e||G.cine||!(e.dazeT>0)||!e.k1.stuck||e.k1.watered)return false;T.pos.copy(e.pos);return true;},
  onWater:()=>{const e=T.e;if(!e||!(e.dazeT>0))return;e.k1.watered=true;e.dazeT+=(K1N.stuckBy[genPath()]||K1N.stuck)*0.5;K1HE.st.waterHand++;if(K1B.fx)K1B.fx.sprouts(e.pos.x,e.pos.z,e.r+1.6);
    floatText(e.pos.clone().add(new V3(0,3,0)),'Корни держат!','#9fe6a0');}};return T;});
function k1heString(c){const s=c.stake;if(!s||s.used)return false;const h=c.hero||active(c.owner),ang=Math.atan2(s.x-c.sx,s.z-c.sz);
  const t={owner:c.owner,hero:h,sx:c.sx,sz:c.sz,y:c.y,y2:c.y,dx:Math.sin(ang),dz:Math.cos(ang),len:0,max:15,grow:false,life:Infinity,glued:false,gluedWith:null,tied:null,parent:null,child:null,waiting:false,
    string:false,stake:null,thick:false,anchor:new V3(c.sx,c.y,c.sz),sag:0,ret:false};
  t.mat=M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.9});t.mesh=new THREE.Mesh(THREAD_GEO,t.mat);t.mesh.position.set(c.sx,c.y+0.08,c.sz);
  t.pmat=MB(0xffd76a,{transparent:true,opacity:0.38,depthWrite:false});t.path=new THREE.Mesh(PATH_GEO,t.pmat);t.path.position.set(c.sx,c.y+0.03,c.sz);
  t.ball=new THREE.Mesh(new THREE.SphereGeometry(0.17,10,8),t.mat);W.group.add(t.mesh,t.path,t.ball);W.threads.push(t);makeString(t,s);return true;}
function k1heCutWrap(){const f=W.onTatCut;if(!f||f.k1he)return;W.onTatCut=function(t,e){f(t,e);if(t&&t.string&&t.stake&&W.flags.phase===2){const c={owner:t.owner,hero:t.hero,sx:t.sx,sz:t.sz,y:t.y,stake:t.stake,until:G.time+10};
      c.T={pos:new V3((t.sx+t.stake.x)/2,0,(t.sz+t.stake.z)/2),pri:1.5,active:()=>G.time<c.until&&!G.cine&&!c.stake.used,
        onWater:()=>{if(k1heString(c)){K1HE.st.mend++;floatText(c.T.pos.clone().add(new V3(0,1.4,0)),'Мёртвая вода — срослась!','#9fe6ff');}c.until=0;}};
      W.waterTargets.push(c.T);K1HE.cut.push(c);k1heTipOnce('cut',(pi)=>'Белка перегрызла струну! Йоша — мёртвой водой '+K(pi,'skill')+' срастит.');}};W.onTatCut.k1he=1;}
{const _st=K1B.mn3&&typeof k1m3Steal==='function'?k1m3Steal:null;if(_st)k1m3Steal=function(o,h){const pi=h.player,i=k1sIdx(pi),before=(K1S.prog[i]||0),lb=K1S.laps[i];_st(o,h);
    const amt=before-(K1S.prog[i]||0);if(amt<=0)return;const c={pi,i,amt,lap:K1S.laps[i]<lb,until:G.time+10};
    c.T={pos:new V3(K1B.cur.C.x,0,K1B.cur.C.z),pri:2.6,active:()=>G.time<c.until&&!G.cine&&K1S.st==='run',
      onWater:()=>{K1S.prog[c.i]+=c.amt;if(c.lap)K1S.laps[c.i]++;const rb=K1S.rb[c.pi];if(rb)rb.phi+=c.amt;c.until=0;K1HE.st.lapBack++;
        floatText(new V3(K1B.cur.C.x,3,K1B.cur.C.z),'Мёртвая вода — лента срослась!','#9fe6ff');K1B.fx.pulse(K1B.cur.C,K1S_COL[c.pi],2.4);}};
    W.waterTargets.push(c.T);K1HE.stolen.push(c);k1heTipOnce('steal',(p)=>'Сорока унесла виток! Йоша — мёртвой водой '+K(p,'skill')+' у пня: лента срастётся.');};}
function k1heGc(){for(const L of[K1HE.cut,K1HE.stolen])for(const c of L.slice())if(G.time>=c.until){const i=W.waterTargets.indexOf(c.T);if(i>=0)W.waterTargets.splice(i,1);L.splice(L.indexOf(c),1);}}
K1HE.tips={};function k1heTipOnce(k,f){if(K1HE.tips[k])return;K1HE.tips[k]=1;for(const pi of[0,1])tip(pi,f(pi),3.4);}
/* ---------- Д7: Йоша маленький — смахивание над ним ---------- */
k1sSwHit=function(S){const r=S.r,rp=r.cols[0],F=K1B.fx,P=S.P,n=S.n;shakeAll(0.03,0.2);
  if(F)for(let i=-2;i<=2;i++){const p=P.clone().addScaledVector(n,i*1.1);F.leaves(new V3(p.x,P.y+0.6,p.z),3,{up:0.4,spd:1.6,size:0.9});}
  for(const h of [active(0),active(1)]){if(!h||players[h.player].downed)continue;const u=k1sU(rp,h),along=Math.abs(u-S.u)*rp.len,at=h.pos.clone().add(new V3(0,2.2,0));if(along>K1S_BAND)continue;
    const side=Math.abs((h.pos.x-rp.x0)*n.x+(h.pos.z-rp.z0)*n.z),surf=rp.y0+(rp.y1-rp.y0)*u;
    if(h.grounded&&h.groundRef&&r.cols.includes(h.groundRef)){if(h.pos.y<0.6)continue;
      if(h.kind==='yosha'){K1HE.st.yoshaDuck++;floatText(at,'Пронесло! Мал, да удал!','#b8e070');continue;}
      if(h.rollT>0||G.time-(h.lastRoll||-9)<0.45){floatText(at,'Ловко!','#b8e070');continue;}
      h.vel.set(n.x*5.5,4.5,n.z*5.5);h.grounded=false;h.groundRef=null;h.knockT=0.45;h.k1soft=true;SFX.knock();floatText(at,'Смахнула!','#ffb0a0');
      r.t=Math.max(r.t,5);const e=r.hand;if(e.state==='broken')e.t=Math.min(e.t,Math.max(0,e.bdur-5));}
    else if(!h.grounded&&side<1.8&&h.pos.y>surf+0.3)floatText(at,'Перепрыгнул!','#b8e070');}};
/* ---------- Д8: сова села на руку ---------- */
function k1hePerch(){const h=HERO.pelageya;if(!h||W.flags.phase!==1||G.cine)return;if(h.pos.y>3.2&&!h.grounded)h.k1hi=G.time;
  if(h.grounded||!(h.glide||h.vel.y<0)||G.time-(h.k1hi||-9)>2.5)return;
  for(const e of k1heHands()){if(!(e.state==='idle'||e.state==='ready'||e.state==='wind')||e.dazeT>0||e.k1.sweep||G.time-(K1HE.perch[e.side]||-9)<8)continue;
    const d=Math.hypot(h.pos.x-e.pos.x,h.pos.z-e.pos.z);if(d>e.r+1.0||h.pos.y<0.6||h.pos.y>3.4)continue;
    K1HE.perch[e.side]=G.time;K1HE.st.perch++;try{SFX.owl();}catch(err){}floatText(e.pos.clone().add(new V3(0,3.4,0)),'Сова села — рука замерла!','#e7c3ff');k1heFreeze(e);h.vel.y=3;break;}}
// рука замирает: замах сорван (заливка убрана), ладонь — в «увязла» с окном удара
function k1heFreeze(e){if(e.state==='wind'||e.state==='ready'){const F=K1B.fx,T=F&&F.hT&&F.hT.get(e);if(T){T.o.del();F.hT.delete(e);}e.state='recover';e.t=0;e.tgt=null;e.k1.prev='recover';K1N.atkAt=G.time;}(K1N.stuckRaw||k1nStuck)(e);}
/* ---------- подключение ---------- */
{const _in=K1B.init;K1B.init=function(ctx){_in(ctx);K1HE.stakeT.length=0;K1HE.cut.length=0;K1HE.stolen.length=0;K1HE.perch={};K1HE.tips={};for(const k in K1HE.st)K1HE.st[k]=0;
  W.marks.push(...K1HE_MH,...K1HE_MS,K1HE_MM);W.waterTargets.push(...K1HE_WH);
  const prev=W.skillHook;W.skillHook=(pi,h)=>{try{if(k1heToss(pi,h))return true;}catch(err){console.error('k1he toss',err);}return prev?prev(pi,h):false;};
  for(const pi of[0,1]){const h=()=>active(pi);
    prompt(pi,'skill',()=>headOf(h()),()=>h().kind==='proshka'&&K1HE_MH.some(m=>m.active()&&hd(m.e.pos,h().pos)<14),'жёлудем по когтю!');
    prompt(pi,'skill',()=>headOf(h()),()=>h().kind==='potap'&&W.flags.phase===1&&K1B.cur.ramps.some(q=>q.hand&&q.hand.k1bridge&&Math.hypot(h().pos.x-q.cols[0].x0,h().pos.z-q.cols[0].z0)<5.5)&&HEROES.some(q=>q!==h()&&q.pos.y<1&&hd(q.pos,h().pos)<2.6),'на плечо!');
    prompt(pi,'skill',()=>headOf(h()),()=>h().kind==='yosha'&&W.waterTargets.some(T=>T.active()&&(K1HE_WH.includes(T)||K1HE.cut.some(c=>c.T===T)||K1HE.stolen.some(c=>c.T===T))&&hd(T.pos,h().pos)<3+(T.pri||0)),'ковшик!');}};}
{const _st=step;step=function(dt){_st(dt);if(!k1heOn())return;try{
    for(const e of k1heHands())if(!(e.dazeT>0))e.k1.watered=false;
    k1heStakes();k1heCutWrap();k1heGc();k1hePerch();
    for(const m of K1HE_MH)if(m.e)m.pos.set(m.e.pos.x+Math.sin(m.e.face)*0.8,(m.e.k1.top||2)+1.2,m.e.pos.z+Math.cos(m.e.face)*0.8);}catch(err){console.error('k1he',err);}};}
{const _ll=loadLevel;loadLevel=function(i){K1HE.stakeT.length=0;K1HE.cut.length=0;K1HE.stolen.length=0;_ll(i);};}
K1HE.marks={hand:K1HE_MH,sq:K1HE_MS,mag:K1HE_MM,water:K1HE_WH};K1HE.toss=(pi,h)=>k1heToss(pi,h);   // для ботов
