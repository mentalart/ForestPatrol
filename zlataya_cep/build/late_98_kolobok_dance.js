/* ============================== РЕЛИЗ final06 · 1-3 «КОЛОБОК»: ФИНАЛЬНАЯ ПЛЯСКА ============================== */
// Последний ролик уровня (Колобок отдаёт звено) был одним статичным кадром на 7,5 с: камера стояла за спинами героев и смотрела
// на Колобка на гуслях, «живая камера» (late_82) добавляла к нему случайные наезды и врезки крупных планов, а герои стояли там,
// где их застала пляска, — кто в кадре, кто за ним.
// Теперь это сцена-пляска на 12,5 с из четырёх чётких кадров — без «живого» движения камеры, без врезок и без наездов на говорящего:
//  1) общий план спереди: герои сходятся в ряд лицом к камере, Колобок спрыгивает с гуслей в середину ряда и заводит свой сказ;
//     на «И-эх!» все пускаются в пляс на месте: Прошка — руки в боки, выбрасывает ноги; Потап — вприсядку; Пелагея кружится,
//     хлопая крыльями; Йоша подпрыгивает с ковшиком;
//  2) облёт хоровода: герои идут кругом вокруг Колобка, руки в стороны, по очереди подпрыгивают с оборотом;
//  3) средний план: ряд снова лицом к камере, хлопают в такт; Колобок подскакивает — из него вылетает звено, Прошка ловит его;
//  4) фронтальный план: общий прыжок с оборотом, поза на последний аккорд, конфетти; все смотрят прямо в камеру,
//     Прошка держит звено над головой.
// Музыка мира на время ролика молчит: звучит «Ах вы, сени» на гуслях (как в пляске уровня) с басом, притопом и прихлопом.
// Ролик прототипа не переписывается: rep_30_gameplay.py оборачивает его определение в FIN.kolDance(def,ctx);
// реплика Колобка и концовка ролика (итог «Лада», выход с уровня) остаются прежними.
// Позы — добавочный канал поверх тела (как в late_83) и кости рук и ног (как в late_15): только пока идёт ролик.
const KD_B=0.5,KD_T0=1.0,KD_FIN=11.0,KD_DUR=12.5,KD_TR=5;
const KD={on:false,def:null,ch:{},bo:{},tg:{},cur:{},st:null};
// ---------- кости: своё сглаженное значение поверх позы прототипа (иначе два сглаживания тянут кость каждое к своему) ----------
function kdBone(h,key,bone,ax,v,dt){if(!bone||v==null)return;const c=KD.cur[h.kind]||(KD.cur[h.kind]={});const o=c[key]==null?bone.rotation[ax]:c[key];
  const nv=o+(v-o)*(1-Math.exp(-18*dt));c[key]=nv;bone.rotation[ax]=nv;}
function kdApplyPose(h,dt){const P=KD.tg[h.kind];if(!P){KD.cur[h.kind]=null;return;}const B=h.rig;
  if(B)for(let i=0;i<2;i++){const n=i?'R':'L',sg=i?-1:1;
    if(P.hip)kdBone(h,'hip'+n,B['hip'+n],'x',P.hip[i],dt);if(P.knee)kdBone(h,'knee'+n,B['knee'+n],'x',P.knee[i],dt);
    if(P.sh)kdBone(h,'sh'+n,B['shoulder'+n],'z',sg*P.sh[i],dt);if(P.arm)kdBone(h,'arm'+n,B['arm'+n],'x',P.arm[i],dt);if(P.el)kdBone(h,'el'+n,B['elbow'+n],'x',P.el[i],dt);}
  if(P.wing!=null&&h.parts.wings)h.parts.wings.forEach((w,i)=>kdBone(h,'wing'+i,w,'z',w.userData.s*P.wing,dt));}
{const _hp=heroPose;heroPose=function(h,dt){_hp(h,dt);if(KD.on)try{kdApplyPose(h,dt);}catch(e){console.error(e);}};}
// ---------- тело: канал смещений; головы смотрят прямо, а не на говорящего и не по сторонам; без наездов на говорящего ----------
{const _st=step;step=function(dt){for(const k in KD.ch)aRestore(KD.ch[k]);
  if(KD.on){ACT.speaker=null;for(const h of HEROES){h._glT=9;h._yawT=0;}}
  _st(dt);
  if(KD.on){const cd=CINE.CD();if(cd&&cd.def===KD.def)cd.focus=null;
    for(const h of HEROES){const c=KD.ch[h.kind],o=KD.bo[h.kind];if(!c||!o||!h.g.visible)continue;c.np.set(0,o.py||0,0);c.nr.set(0,o.ry||0,o.rz||0);c.ns.set(1,1,1);aApply(c);}}};}
// ---------- камера: только авторские кадры (без живого движения, врезок, whip-склеек) ----------
CINE.on('start',d=>{if(!KD.def||d.def!==KD.def)return;const cd=d.cd;cd.inserts=false;cd.cover=[];cd.calm=true;cd.shots.forEach(s=>{s.amp=0;s.tr='cut';});});
function kdStop(){const S=KD.st;KD.on=false;KD.def=null;KD.tg={};KD.bo={};KD.cur={};
  if(S){if(S.tro&&S.tro.parent)S.tro.parent.remove(S.tro);if(S.kol&&S.kolS0)S.kol.g.scale.copy(S.kolS0);if(S.mus&&FIN.music)FIN.music.play(undefined);}KD.st=null;}
{const _ll=loadLevel;loadLevel=function(i){if(KD.st&&KD.st.mus&&FIN.music)FIN.music.play(undefined);KD.on=false;KD.def=null;KD.st=null;KD.tg={};KD.bo={};KD.cur={};_ll(i);};}
FIN.kolState=()=>KD.st?{on:KD.on,t:KD.st.t,link:!!KD.st.it,taken:!!(KD.st.it&&KD.st.it.taken),tro:!!KD.st.tro,beats:KD.st.e}:{on:KD.on};   // для ботов
FIN.kolDance=function(def,ctx){
  const kol=ctx.kol,Z=ctx.gus?ctx.gus.z:kol.g.position.z,H=HERO,pr=H.proshka,KINDS=['proshka','potap','pelageya','yosha'];
  // ---------- места: ряд лицом к камере, Колобок в середине; хоровод — круг вокруг Колобка ----------
  const MK={potap:[-2.55,Z+3.0],proshka:[-1.25,Z+3.35],pelageya:[1.25,Z+3.35],yosha:[2.55,Z+3.0]},KM=[0,Z+3.7];
  const RC=[0,Z+3.5],RR=1.6,RA={proshka:-0.8,pelageya:0.8,yosha:2.35,potap:-2.35},RW=Math.PI*2/4.4;   // за 4,4 с — ровно круг
  const ringP=a=>[RC[0]+Math.sin(a)*RR,RC[1]+Math.cos(a)*RR];
  const S={t:0,p0:{},k0:null,kolS0:null,kol,it:null,tro:null,mus:false,e:0,ci:0};
  function where(kind,t){const m=MK[kind],p0=S.p0[kind]||{x:m[0],z:m[1]},a0=RA[kind];
    if(t<0.95){const k=smooth((t-0.05)/0.85);return {x:lerp(p0.x,m[0],k),z:lerp(p0.z,m[1],k),mv:t<0.75?[m[0]-p0.x,m[1]-p0.z]:null};}
    if(t<2.4)return {x:m[0],z:m[1]};
    if(t<3.0){const k=smooth((t-2.4)/0.6),r=ringP(a0);return {x:lerp(m[0],r[0],k),z:lerp(m[1],r[1],k),mv:[r[0]-m[0],r[1]-m[1]]};}
    if(t<7.4){const a=a0+RW*(t-3.0),r=ringP(a);return {x:r[0],z:r[1],mv:[Math.cos(a),-Math.sin(a)]};}
    if(t<8.0){const k=smooth((t-7.4)/0.6),r=ringP(a0+RW*4.4);return {x:lerp(r[0],m[0],k),z:lerp(r[1],m[1],k),mv:t<7.85?[m[0]-r[0],m[1]-r[1]]:null};}
    return {x:m[0],z:m[1]};}
  function kolAt(t){const k0=S.k0||{x:KM[0],y:0,z:KM[1]},u=(t-KD_T0)/KD_B,bo=Math.abs(Math.sin(Math.PI*u));
    if(t<0.2)return {x:k0.x,y:k0.y+0.12*Math.abs(Math.sin(t*16)),z:k0.z};
    if(t<1.0){const k=(t-0.2)/0.8,e=smooth(k);return {x:lerp(k0.x,KM[0],e),y:lerp(k0.y,0,k)+1.1*Math.sin(Math.PI*k),z:lerp(k0.z,KM[1],e),roll:-Math.PI*2*e,land:-1};}
    if(t<2.4)return {x:KM[0],y:0.3*bo,z:KM[1],land:t-1.0};
    if(t<3.0){const k=smooth((t-2.4)/0.6);return {x:lerp(KM[0],RC[0],k),y:0.3*bo,z:lerp(KM[1],RC[1],k)};}
    if(t<7.4)return {x:RC[0],y:0.35*bo,z:RC[1],wob:0.55*Math.sin(Math.PI*u)};
    if(t<8.0){const k=smooth((t-7.4)/0.6);return {x:lerp(RC[0],KM[0],k),y:0.25*bo,z:lerp(RC[1],KM[1],k)};}
    if(t<8.6)return {x:KM[0],y:1.0*Math.sin(Math.PI*(t-8.0)/0.6),z:KM[1]};
    if(t<10.05)return {x:KM[0],y:0.2*bo,z:KM[1],land:t-8.6};
    if(t<KD_FIN){const k=(t-10.05)/(KD_FIN-10.05);return {x:KM[0],y:1.2*Math.sin(Math.PI*k),z:KM[1],spin:Math.PI*2*CE.inOutCubic(k)};}
    return {x:KM[0],y:0,z:KM[1],land:t-KD_FIN};}
  // ---------- позы пляски: u — доли от первого «И-эх!», нога, что выбрасывается, меняется каждую долю ----------
  function poseOf(kind,t){const u=(t-KD_T0)/KD_B,n=Math.floor(u),ph=u-n,kick=Math.sin(Math.PI*ph),i=((n%2)+2)%2,j=1-i,bo=Math.abs(Math.sin(Math.PI*u));
    const hs=H[kind].d.height/1.25,P={},O={py:0,ry:0,rz:0};
    if(t<0.95||(t>=7.4&&t<8.0)){}                                                        // идут на места — шаг ставит late_83
    else if(t<2.4){if(t<KD_T0){}
      else if(kind==='proshka'){P.hip=[0,0];P.knee=[0,0];P.hip[i]=-0.85*kick;P.knee[i]=0.15;P.hip[j]=0.1;P.knee[j]=0.25+0.2*kick;P.sh=[0.55,0.55];P.arm=[0.35,0.35];P.el=[-1.55,-1.55];O.py=0.05*hs*bo;}
      else if(kind==='potap'){P.hip=[-0.95,-0.95];P.knee=[1.7,1.7];P.hip[i]=-0.95-0.35*kick;P.knee[i]=1.7*(1-kick)+0.05;P.sh=[-0.1,-0.1];P.arm=[-1.35,-1.35];P.el=[-1.25,-1.25];O.py=-0.17*hs+0.03*hs*bo;}
      else if(kind==='pelageya'){P.hip=[0,0];P.knee=[0,0];P.hip[i]=-0.35*kick;P.knee[i]=0.5*kick;P.sh=[1.0,1.0];P.arm=[-0.4,-0.4];P.wing=0.9+0.5*Math.sin(u*Math.PI*4);
        O.ry=Math.PI*2*CE.inOutCubic(clamp((t-KD_T0)/1.0,0,1));O.py=0.06*hs*bo;}
      else{P.hip=[0,0];P.knee=[0,0];P.hip[i]=-0.55*kick;P.knee[i]=0.7*kick;P.sh=[0.9,0.25];P.arm=[-0.3+0.35*Math.sin(u*Math.PI*2),-2.6];P.el=[-0.35,-0.2];O.py=0.1*hs*bo;O.rz=0.1*(i?-1:1)*kick;}}
    else if(t<7.4){P.sh=[1.25,1.25];if(kind==='pelageya')P.wing=1.1+0.4*Math.sin(u*Math.PI*4);}                // хоровод: руки в стороны
    else if(t<10.0){P.hip=[0,0];P.knee=[0.2*bo,0.2*bo];P.sh=[0.05+0.4*bo,0.05+0.4*bo];P.arm=[-1.15,-1.15];P.el=[-0.6,-0.6];O.py=-0.03*hs*(1-bo);   // хлопают в такт
      if(kind==='pelageya')P.wing=0.6+0.3*bo;
      if(kind==='proshka'&&t>=8.45){P.knee=[0.15,0.15];O.py=0;if(t<9.05){P.sh=[0.2,0.2];P.arm=[-1.35,-1.35];P.el=[-0.3,-0.3];}else{P.sh=[0.2,0.2];P.arm=[-2.85,-2.85];P.el=[-0.15,-0.15];}}}
    else{P.hip=[0,0];P.knee=[0.1,0.1];                                                    // поза на последний аккорд
      if(kind==='proshka'){P.hip=[-0.2,0.05];P.knee=[0.25,0.1];P.sh=[0.2,0.2];P.arm=[-2.85,-2.85];P.el=[-0.15,-0.15];}
      else if(kind==='potap'){P.sh=[1.35,1.35];P.arm=[-0.45,-0.45];P.el=[-0.1,-0.1];}
      else if(kind==='pelageya'){P.sh=[1.2,1.2];P.arm=[-0.6,-0.6];P.wing=1.4;}
      else{P.sh=[0.55,0.2];P.arm=[0.3,-2.7];P.el=[-1.5,-0.15];}}
    return {P:Object.keys(P).length?P:null,O};}
  // ---------- музыка: «Ах вы, сени» на гуслях, по ноте на долю; на вторую половину доли — подголосок и прихлоп ----------
  function music(t,dt){const E=Math.round((KD_FIN-KD_T0)/(KD_B/2));
    if(dt>0.25||(!(dt>0)&&t>=KD_DUR-1e-3)){S.e=E+1;return;}                              // пропуск ролика — ничего не играть разом
    if(!(dt>0))return;                                                                   // первый вызов ролика (t=0, dt=0)
    if(S.pre==null&&t>=0.2){S.pre=1;[0,2,4,7,9,12].forEach((d,k)=>gusli(62+KD_TR+d,k*0.07,0.08));}
    while(S.e<=E){const te=KD_T0+S.e*KD_B/2;if(te>t+0.1)break;const dl=Math.max(0,te-t),q=S.e++;
      if(q===E){[0,4,7,12].forEach((d,k)=>gusli(67+KD_TR+d,dl+k*0.03,0.16));tone(mf(43+KD_TR),0.9,'sine',0.22,null,dl);tone(180,0.1,'square',0.12,null,dl);continue;}
      const b=q>>1,li=b%16,line=SONG_C[li],v=t<6.2?0.1:0.13;
      if(q%2===0){gusli(line[0]+KD_TR,dl,v);tone(mf(SONG_BASS[li]+KD_TR),0.4,'sine',0.17,null,dl);tone(110,0.07,'square',0.05,55,dl);
        if(q===0)tone(180,0.08,'square',0.12,null,dl);}
      else{if(line[1])gusli(line[1]+KD_TR,dl,v*0.7);tone(2600,0.04,'square',0.025,null,dl);}}}
  // ---------- эмоции по времени (при пропуске ролика не играются) ----------
  const em=(who,type,d)=>()=>{const h=H[who];if(h&&h.g.visible)ACT.emote(h,type,d||0);};
  const all=(type,st,but)=>()=>{let k=0;for(const w of KINDS){if(w===but)continue;em(w,type,st*k++)();}};
  const kolEm=type=>()=>{const n=npcByWho('kolobok');if(n)n.em={type,t:0,d:type==='laugh'?1.2:0.6};};
  const CUES=[[KD_T0,all('hop',0.05)],[KD_T0,kolEm('hop')],[3.5,em('proshka','joy')],[4.6,em('pelageya','joy')],[5.7,em('yosha','joy')],[6.6,em('potap','cheer')],
    [8.35,all('surprise',0.05,'proshka')],[9.05,em('proshka','pride')],[9.15,all('cheer',0.07,'proshka')],[10.05,all('joy',0.04)],[KD_FIN,kolEm('laugh')],
    [KD_FIN,()=>{try{const p=new V3(KM[0],1.6,KM[1]);FX.confetti(p,30,0.8);FX.confettiCam(36);CINE.rimPulse(0.7);}catch(e){}}]];
  // ---------- кадры ----------
  def.dur=KD_DUR;
  def.shots=[shot(0,[0,1.9,Z+10.6],[0,0.85,Z+3.1],[0,1.55,Z+9.0],[0,0.8,Z+3.2],2.4),          // общий план спереди: сходятся, пляшут на месте
    shot(2.4,[-4.8,2.7,Z+8.8],[0,0.55,Z+3.5],[4.8,2.7,Z+8.8],[0,0.55,Z+3.5],5.0),               // облёт хоровода сверху-спереди
    shot(7.4,[-0.55,1.5,Z+7.1],[-0.55,1.1,Z+3.4],[-0.55,1.4,Z+6.3],[-0.55,1.1,Z+3.4],2.5),      // спереди на Прошку и Колобка: звено
    // фронтально и снизу — герои в нижней половине кадра, над ними небо: баннер «Все звенья уровня собраны!» не ложится на лица
    shot(9.9,[0,0.62,Z+8.7],[0,1.75,Z+3.2],[0,0.6,Z+8.0],[0,1.7,Z+3.2],2.6)];
  def.says=(def.says||[]).map(y=>y[2]==='kolobok'?[0.5,5.6].concat(y.slice(2)):y);
  // ---------- события: старт, звено вылетает из Колобка, Прошка его ловит ----------
  def.events=[
    {t:0,fn:()=>{KD.on=true;KD.def=def;KD.st=S;
      for(const w of KINDS){const h=H[w];S.p0[w]={x:h.pos.x,z:h.pos.z};if(!KD.ch[w])KD.ch[w]=aChan(h.body);}
      S.k0={x:kol.g.position.x,y:kol.g.position.y,z:kol.g.position.z};S.kolS0=kol.g.scale.clone();
      if(kol.lids)kol.lids.forEach(l=>{l.rotation.x=-0.5;});
      if(FIN.music){FIN.music.play(false);S.mus=true;}}},
    {t:8.3,fn:()=>{const it=linkItem(KM[0],1.45,KM[1]);W.linkTotal--;it.locked=true;S.it=it;burst(it.pos.clone(),COL.gold,10,3);if(G.cine&&G.cine.t<8.6)SFX.dzin();}},
    {t:9.05,fn:()=>{const it=S.it;if(it&&!it.taken){it.locked=false;takeItem(it,pr);}
      const tro=new THREE.Mesh(new THREE.TorusGeometry(0.22,0.07,10,24),M(COL.gold,{emissive:0xffb000,emissiveIntensity:0.8}));tro.scale.set(1,1.45,1);W.group.add(tro);S.tro=tro;}}];
  // ---------- каждый кадр ролика ----------
  def.tick=(t,dt)=>{S.t=t;const live=dt>0&&dt<0.25,cam=shared.pos;
    // герои: места, повороты (по ходу — по ходу, иначе — в камеру; Прошка ловит звено — к Колобку), позы
    for(const w of KINDS){const h=H[w];if(!h.g.visible)continue;const p=where(w,t);h.pos.x=p.x;h.pos.z=p.z;h.vel.x=0;h.vel.z=0;
      if(p.mv&&Math.hypot(p.mv[0],p.mv[1])>1e-3)h.face=Math.atan2(p.mv[0],p.mv[1]);
      else if(w==='proshka'&&t>=8.3&&t<9.2)h.face=Math.atan2(KM[0]-h.pos.x,KM[1]-h.pos.z);
      else h.face=Math.atan2(cam.x-h.pos.x,cam.z-h.pos.z);
      const q=poseOf(w,t);KD.tg[w]=q.P;KD.bo[w]=q.O;}
    // Колобок: прыжок с гуслей, подскоки в такт, в хороводе — в середине, большой подскок со звеном, прыжок с оборотом на финал
    const k=kolAt(t);kol.g.position.set(k.x,k.y,k.z);
    const fk=t>=8.3&&t<9.1?Math.atan2(pr.pos.x-k.x,pr.pos.z-k.z):Math.atan2(cam.x-k.x,cam.z-k.z);kol.g.rotation.y=fk+(k.wob||0)+(k.spin||0);
    if(kol.ball)kol.ball.rotation.x=k.roll!=null?k.roll:0;                                // после прыжка — ровно полный оборот
    if(S.kolS0){const l=k.land,sq=l!=null&&l>=0&&l<0.3?1-0.2*Math.sin(Math.PI*l/0.3):1;kol.g.scale.set(S.kolS0.x/Math.sqrt(sq),S.kolS0.y*sq,S.kolS0.z/Math.sqrt(sq));}
    // звено: из Колобка — дугой в лапы Прошке; потом — над головой у Прошки
    const it=S.it;if(it&&!it.taken){const u=clamp((t-8.3)/0.75,0,1),B=pr.pos.clone().add(new V3(0,heroHeight(pr)+0.35,0));
      it.pos.set(lerp(KM[0],B.x,smooth(u)),lerp(1.45,B.y,smooth(u))+0.7*Math.sin(Math.PI*u),lerp(KM[1],B.z,smooth(u)));it.g.rotation.y+=dt*9;}
    if(S.tro){const s=clamp((t-9.05)/0.25,0,1);S.tro.position.set(pr.pos.x,pr.pos.y+heroHeight(pr)+0.42+0.04*Math.sin(G.time*4),pr.pos.z);S.tro.rotation.y+=dt*2.5;
      S.tro.scale.set(s,1.45*s,s);}
    // эмоции и музыка
    while(S.ci<CUES.length&&CUES[S.ci][0]<=t){const c=CUES[S.ci++];if(live)c[1]();}
    music(t,dt);};
  const end0=def.end;def.end=()=>{const it=S.it;if(it&&!it.taken){it.locked=false;takeItem(it,pr);}kdStop();if(end0)end0();};
  return def;};
