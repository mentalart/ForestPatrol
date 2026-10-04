/* ============================== РЕЛИЗ · КИНО 1: РЕЖИССЁР И КАМЕРА РОЛИКОВ ============================== */
// Ролики прототипа (play: шоты, реплики, события) остаются мастер-планом. Поверх них камера оживает:
//  · каждый статичный шот получает мотивированное движение по крупности: общий — кран/проезд, средний — облёт/наезд, крупный — наезд на реакцию;
//  · движущиеся шоты идут по сплайну CatmullRom с дугой и easing вместо прямой;
//  · handheld-шум (градиентный шум), тряска по trauma-модели (shake = trauma²), FOV-punch, dolly-zoom, голландский угол;
//  · реплика героя или персонажа в кадре — мягкий наезд на говорящего, вне кадра или далеко — вставка крупного плана (если в этот миг нет событий);
//  · склейки: жёсткая, whip pan (смаз и «линии скорости»), затемнение через цвет, круговая шторка (iris);
//  · плавный вход в ролик из игровой камеры и плавный выход обратно (или шторка, если места далеко друг от друга).
// События для звука и эффектов: CINE.on('start'|'shot'|'cut'|'whip'|'iris'|'dip'|'blendIn'|'blendOut'|'end'|'insert'|'say'|'punch'|'dollyzoom'|'slowmo'|'hitstop'|'impact'|'accent', fn).
const CINE=FIN.cine={hooks:{},on(n,f){(this.hooks[n]=this.hooks[n]||[]).push(f);},emit(n,d){const l=this.hooks[n];if(l)for(const f of l){try{f(d||{});}catch(e){console.error(e);}}}};
CINE.E={inOutCubic:k=>k<0.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2,inOutSine:k=>-(Math.cos(Math.PI*k)-1)/2,outCubic:k=>1-Math.pow(1-k,3),inCubic:k=>k*k*k,
  outBack:k=>{const c1=1.70158,c3=c1+1;return 1+c3*Math.pow(k-1,3)+c1*Math.pow(k-1,2);},outElastic:k=>k<=0?0:k>=1?1:Math.pow(2,-10*k)*Math.sin((k*10-0.75)*2.0944)+1,
  outQuint:k=>1-Math.pow(1-k,5),inOutBack:k=>{const c2=2.5949;return k<0.5?(Math.pow(2*k,2)*((c2+1)*2*k-c2))/2:(Math.pow(2*k-2,2)*((c2+1)*(k*2-2)+c2)+2)/2;}};
const CE=CINE.E;
// градиентный шум (1D, как у Перлина) и его сумма октав
const NPERM=new Uint8Array(512);{const p=[];for(let i=0;i<256;i++)p.push(i);for(let i=255;i>0;i--){const j=Math.floor(Math.random()*(i+1));const t=p[i];p[i]=p[j];p[j]=t;}for(let i=0;i<512;i++)NPERM[i]=p[i&255];}
CINE.noise=x=>{const i=Math.floor(x),f=x-i,u=f*f*f*(f*(f*6-15)+10),g=h=>(NPERM[h&511]/127.5-1);return (g(i)*f*(1-u)+g(i+1)*(f-1)*u)*2.2;};
CINE.fbm=x=>CINE.noise(x)*0.62+CINE.noise(x*2.07+31.7)*0.28+CINE.noise(x*4.3+77.1)*0.1;
const cHash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}return h>>>0;};
const cv=()=>new V3(),CT1=cv(),CT2=cv(),CT3=cv(),CT4=cv(),CUP=new V3(0,1,0);
// ---------- оверлеи: шторка, затемнение, линии скорости (под интерфейсом, над картинкой) ----------
FIN.cineDom=(()=>{const mk=(id,css)=>{const d=document.createElement('div');d.id=id;d.style.cssText='position:fixed;inset:0;pointer-events:none;display:none;'+css;const ref=$('finGrade')||$('ui');ref.parentNode.insertBefore(d,ref.nextSibling);return d;};
  const iris=mk('finIris',''),dip=mk('finDip','background:#120a1c;opacity:0'),speed=mk('finSpeed','opacity:0;background:repeating-conic-gradient(from 0deg at 50% 50%,rgba(255,250,235,0) 0deg 4.2deg,rgba(255,250,235,.55) 4.2deg 4.9deg);-webkit-mask:radial-gradient(circle at 50% 50%,transparent 34%,#000 78%);mask:radial-gradient(circle at 50% 50%,transparent 34%,#000 78%)');
  return {iris,dip,speed,
    setIris(k,cx,cy){if(k>=0.999){if(iris.style.display!=='none')iris.style.display='none';return;}iris.style.display='block';const W0=innerWidth,H0=innerHeight,R=Math.hypot(W0,H0)*0.62*Math.max(0,k);
      iris.style.background='radial-gradient(circle at '+(cx==null?50:cx).toFixed(1)+'% '+(cy==null?50:cy).toFixed(1)+'%,rgba(0,0,0,0) '+R.toFixed(1)+'px,#1a1024 '+(R+2).toFixed(1)+'px)';},
    setDip(a,col){if(a<=0.001){if(dip.style.display!=='none')dip.style.display='none';return;}dip.style.display='block';if(col)dip.style.background=col;dip.style.opacity=a.toFixed(3);},
    setSpeed(a,rot){if(a<=0.01){if(speed.style.display!=='none')speed.style.display='none';return;}speed.style.display='block';speed.style.opacity=a.toFixed(3);speed.style.transform='rotate('+(rot||0).toFixed(1)+'deg) scale(1.2)';},
    setBlur(px){const c=renderer.domElement;const v=px>0.3&&FIN.set.quality!=='low'?'blur('+px.toFixed(1)+'px)':'';if(c.style.filter!==v)c.style.filter=v;}};})();
// ---------- состояние ----------
let CD=null;                 // текущий ролик под режиссурой
const CX={exit:null,iris:1,irisTo:1,irisV:0,dip:0,dipTo:0,dipCol:'#120a1c',speed:0,blur:0,punch:{x:0,v:0},trauma:0,dutch:{a:0,to:0}};
CINE.CD=()=>CD;
function cPose(){return {pos:cv(),look:cv(),roll:0,fov:50};}
function copyPose(o,s){o.pos.copy(s.pos);o.look.copy(s.look);o.roll=s.roll;o.fov=s.fov;return o;}
FIN.fovNow=()=>{if(CD&&G.cine===CD.S)return CD.pose.fov;if(CX.exit)return CX.exit.fov;return null;};
// ---------- разметка шотов ----------
function prepShots(def,key){const src=def.shots||[],n=src.length,V=a=>new V3(a[0],a[1],a[2]);
  const shots=src.map((s,i)=>({i,t:s.t,p:V(s.p),l:V(s.l),p2:s.p2?V(s.p2):null,l2:s.p2?(s.l2?V(s.l2):V(s.l)):null,mdur:s.dur||2,cut:s.cut!==false}));
  shots.forEach((s,i)=>{s.t1=i+1<n?shots[i+1].t:def.dur;s.len=Math.max(0.05,s.t1-s.t);s.dist=s.p.distanceTo(s.l);s.size=s.dist<3.6?'close':s.dist<9?'medium':'wide';
    s.sign=(cHash(key+'|'+i)&1)?1:-1;const first=i===0,last=i===n-1&&n>1;
    s.move=first&&s.size!=='close'?'crane':last&&s.size!=='close'?'pull':s.size==='close'?'push':s.size==='medium'?(i%2?'orbit':'push'):(i%2?'truck':'crane');
    s.amp=clamp(s.len/3.5,0.3,1)*(s.p2?0.3:1);
    if(s.p2){const d=s.p.distanceTo(s.p2),mid=s.p.clone().lerp(s.p2,0.5);CT1.subVectors(s.p2,s.p).normalize();CT2.crossVectors(CT1,CUP);if(CT2.lengthSq()<1e-4)CT2.set(1,0,0);CT2.normalize();
      mid.addScaledVector(CUP,d*0.1).addScaledVector(CT2,d*0.06*s.sign);s.curve=new THREE.CatmullRomCurve3([s.p.clone(),mid,s.p2.clone()],false,'centripetal');}});
  // склейки: далеко — затемнение через цвет; близко, но с поворотом — whip pan (через одну)
  shots.forEach((s,i)=>{s.tr='cut';if(i===0||!s.cut)return;const a=shots[i-1],ap=a.p2||a.p,al=a.l2||a.l;const d=ap.distanceTo(s.p);
    CT1.subVectors(al,ap).setY(0).normalize();CT2.subVectors(s.l,s.p).setY(0).normalize();const ang=Math.acos(clamp(CT1.dot(CT2),-1,1));
    if(d>40)s.tr='dip';else if(d<16&&ang>1.05&&s.len>=1.4&&a.len>=1.2&&(cHash(key+'w'+i)%3)!==0)s.tr='whip';});
  return shots;}
// покрытие: если в ролике меньше трёх крупностей — врезка крупного/среднего плана героя в середине самых длинных статичных шотов
function planCoverage(cd){const have=new Set(cd.shots.map(s=>s.size));if(have.size>=3)return [];const out=[];
  cd.shots.filter(s=>!s.p2&&s.len>=3.2).sort((a,b)=>b.len-a.len).forEach(s=>{if(have.size>=3)return;
    const want=!have.has('close')?'close':!have.has('medium')?'medium':null;if(!want)return;const dur=Math.min(2.4,s.len*0.4),t0=s.t+Math.max(0.9,(s.len-dur)*0.5);
    if(cd.evT.some(et=>et>t0-0.2&&et<t0+dur))return;out.push({t:t0,dur,want});have.add(want);});return out;}
function coverPick(){const look=CD.pose.look;const sp=ACT&&ACT.speaker&&ACT.speaker.until>G.time?CINE.locate(ACT.speaker.who):null;if(sp&&sp.head().distanceTo(look)<14)return sp;
  let best=null,bd=12;for(const h of HEROES){if(!h.g.visible)continue;const d=hd(h.pos,look);if(d<bd){bd=d;best=h.kind;}}
  for(const n of ACT.npcs){if(!n.o.g.parent||n.o.g.visible===false||n.who==='gor')continue;const d=hd(n.o.g.getWorldPosition(CT4),look);if(d<bd){bd=d;best=n.who;}}return best?CINE.locate(best):null;}
function shotAt(t){const sh=CD.shots;let i=0;for(let k=0;k<sh.length;k++)if(sh[k].t<=t)i=k;return i;}
// базовая поза шота + живое движение
function lifeMove(s,u,pose){const A=s.amp;if(!A)return;const e=CE.inOutSine(u),pos=pose.pos,look=pose.look;CT1.subVectors(look,pos);const d=CT1.length();if(d<0.01)return;CT1.multiplyScalar(1/d);
  CT2.set(CT1.z,0,-CT1.x);if(CT2.lengthSq()<1e-6)CT2.set(1,0,0);CT2.normalize();
  switch(s.move){
    case 'push':pos.addScaledVector(CT1,d*0.12*A*e);pose.fov-=2.5*A*e;break;
    case 'pull':pos.addScaledVector(CT1,-d*0.1*A*e);pos.y+=d*0.03*A*e;break;
    case 'crane':pos.y+=d*0.11*A*(e-0.35);pos.addScaledVector(CT1,d*0.05*A*e);break;
    case 'truck':{const k=(e-0.5)*2*s.sign*A;pos.addScaledVector(CT2,d*0.07*k);look.addScaledVector(CT2,d*0.035*k);break;}
    case 'orbit':{const ang=s.sign*0.14*A*(e-0.5)*2,c=Math.cos(ang),sn=Math.sin(ang);CT3.subVectors(pos,look);pos.set(look.x+CT3.x*c+CT3.z*sn,pos.y,look.z-CT3.x*sn+CT3.z*c);break;}}}
function basePose(s,t,out){const u=clamp((t-s.t)/s.len,0,1);
  if(s.p2){const k=CE.inOutCubic(clamp((t-s.t)/s.mdur,0,1));s.curve.getPoint(k,out.pos);out.look.copy(s.l).lerp(s.l2,k);}else{out.pos.copy(s.p);out.look.copy(s.l);}
  out.fov=CD.fov0+(s.size==='close'?-3:s.size==='wide'?2:0);out.roll=0;lifeMove(s,u,out);return out;}
// ---------- говорящие: наезд или вставка крупного плана ----------
function onScreen(p,pose){CT1.subVectors(pose.look,pose.pos).normalize();CT2.subVectors(p,pose.pos);const d=CT2.length();if(d<0.3)return {vis:false,d};CT2.multiplyScalar(1/d);
  const ang=Math.acos(clamp(CT1.dot(CT2),-1,1)),hf=Math.atan(Math.tan(THREE.MathUtils.degToRad(pose.fov)/2)*innerWidth/Math.max(1,innerHeight));return {vis:ang<hf*0.88,d};}
const cRay=new THREE.Raycaster();
function clearDist(from,dir,max){try{cRay.set(from,dir);cRay.far=max;cRay.near=0.25;const hit=cRay.intersectObjects(W.group.children,true).find(h=>h.object.visible&&h.object.material&&!h.object.material.transparent);return hit?hit.distance:max;}catch(e){return max;}}
function insertPose(L,pose,side,far){const H=L.head();CT1.subVectors(pose.pos,H).setY(0);if(CT1.lengthSq()<1e-4)CT1.set(0,0,1);CT1.normalize();
  const a=side*0.42,c=Math.cos(a),s=Math.sin(a);CT2.set(CT1.x*c+CT1.z*s,0,-CT1.x*s+CT1.z*c);let dist=far?clamp(L.size*3.4+2.4,4.2,8.5):clamp(L.size*1.9+1.1,2.0,5.0);
  const dir=CT2.clone().multiplyScalar(dist).add(new V3(0,0.35+L.size*0.12,0)).normalize();const cl=clearDist(H,dir,dist+0.2);if(cl<dist){dist=cl-0.3;if(dist<1.3)return null;}
  return {pos:H.clone().addScaledVector(dir,dist),look:H.clone().add(new V3(0,far?-0.35*L.size:-0.06*L.size,0)),fov:CD.fov0-(far?1:4)};}
// реплика приходит в начале кадра, а склейка на говорящего — позже в том же кадре: решение принимается уже после склейки
CINE.onSay=function(who,text,dur){if(!CD||G.cine!==CD.S||!CINE.locate)return;(CD.sayQ=CD.sayQ||[]).push({who,text,dur:dur||2.5});};
function sayDecide(q){const pv=CD.lastSay;CD.lastSay={who:q.who,t:CD.S.t};const L=CINE.locate(q.who);if(!L)return;const S=CD.S,t=S.t,s=CD.shots[Math.max(0,CD.si)],H=L.head();
  const vis=onScreen(H,CD.pose),len=Math.min(q.dur+0.25,2.8),authored=t-s.t<0.45;                       // склейка ровно на реплике — кадр выбрал автор
  const free=!authored&&!CD.evT.some(et=>et>t-0.05&&et<t+len)&&!s.p2&&s.t1-t>=len+0.5&&t-CD.lastIns>=3;
  if(CD.inserts!==false&&free&&(!vis.vis||(vis.d>11&&s.size==='wide'))&&!CD.insert){const side=(CD.nIns++%2)?1:-1,ip=insertPose(L,CD.pose,side);
    if(ip){CD.insert={who:q.who,t0:t,t1:t+len,pose:ip,L};CD.lastIns=t;CINE.emit('insert',{who:q.who});return;}}
  // ответ на реплику другого героя в кадре — держим обоих (two-shot), а не одного говорящего
  let F=L,fw=q.who;if(vis.vis&&pv&&pv.who!==q.who&&t-pv.t<4.5){const L2=CINE.locate(pv.who);if(L2&&onScreen(L2.head(),CD.pose).vis&&L2.head().distanceTo(H)<6){F={head:()=>L.head().add(L2.head()).multiplyScalar(0.5),size:Math.max(L.size,L2.size)};fw=q.who+'+'+pv.who;}}
  if(vis.vis&&!CD.insert)CD.focus={L:F,who:fw,t0:t,t1:t+Math.min(q.dur,3.4),w:CD.focus&&CD.focus.who===fw?CD.focus.w:0};}
// ---------- вход ----------
function startCD(S,def,old){if(old&&old.S!==S)CINE.emit('end',{key:old.key,chained:true,cd:old});const key=(W&&W.levelId||'')+'|'+def.dur+'|'+((def.says&&def.says[0]&&def.says[0][3])||'').slice(0,18);
  const cd={S,def,key,shots:null,fov0:def.fov||50,si:-1,pose:cPose(),blend:null,focus:null,insert:null,lastIns:-9,nIns:0,dz:null,evT:(def.events||[]).map(e=>e.t),
    exitChecked:false,irisOut:false,skipped:false,inserts:true,cues:null,ci:0};
  CD=cd;cd.shots=prepShots(def,key);
  cd.cover=planCoverage(cd);cd.coi=0;
  if(CINE.direct)CINE.direct(cd);                              // авторская режиссура ключевых роликов (late_86)
  const from=old&&old.S!==S?copyPose(cPose(),old.pose):cPose();if(!(old&&old.S!==S)){from.pos.copy(shared.pos);from.look.copy(shared.look);from.roll=0;from.fov=CX.exit?CX.exit.fov:55;}
  const first=basePose(cd.shots[0],0,cPose());const far=from.pos.distanceTo(first.pos);CX.exit=null;
  if(G.trans){cd.entry='snap';}
  else if(G.split>0.05||CX.iris<0.5||far>32||cd.entryIris){cd.entry='iris';CX.iris=0;CX.irisTo=1;CX.irisDur=0.55;CINE.emit('iris',{dir:'open'});}
  else{cd.entry='blend';cd.blend={from,t:0,dur:clamp(0.55+far*0.03,0.6,1.1),type:'in'};CINE.emit('blendIn',{});}
  const ow=S.skip;S.skip=function(){cd.skipped=true;return ow.apply(this,arguments);};
  CINE.emit('start',{key,def,cd});return cd;}
{const _play=play;play=function(def){const old=CD;_play(def);const S=G.cine;if(S&&def&&def.shots&&def.shots.length)startCD(S,def,old);};}
// ---------- кадр ----------
function cdUpdate(dt){const S=CD.S,t=S.t,pose=CD.pose;const i=Math.max(0,shotAt(t)),s=CD.shots[i];
  if(i!==CD.si){const prev=CD.si;CD.si=i;CD.focus=null;CD.dz=null;
    if(prev>=0){const pp=copyPose(cPose(),pose);
      if(!s.cut){CD.blend={from:pp,t:0,dur:Math.min(1.2,s.len*0.5),type:'soft'};}
      else if(s.tr==='whip'){CD.blend={from:pp,t:0,dur:0.32,type:'whip'};CX.speed=1;CINE.emit('whip',{i});}
      else if(s.tr==='dip'){CX.dip=Math.max(CX.dip,1);CX.dipTo=0;CINE.emit('dip',{i});}
      CD.insert=null;CINE.emit('cut',{i,type:s.cut?s.tr:'soft'});}
    CINE.emit('shot',{i,size:s.size,move:s.move,len:s.len});}
  // авторские метки времени (late_86)
  if(CD.cues){while(CD.ci<CD.cues.length&&CD.cues[CD.ci].t<=t){const c=CD.cues[CD.ci++];try{c.fn(CD);}catch(e){console.error(e);}}}
  // затемнение перед дальней склейкой
  const nx=CD.shots[i+1];if(nx&&nx.tr==='dip'&&t>nx.t-0.2)CX.dipTo=1;
  basePose(s,t,pose);
  if(CD.sayQ&&CD.sayQ.length){const q=CD.sayQ;CD.sayQ=[];q.forEach(sayDecide);}
  if(CD.cover&&CD.coi<CD.cover.length&&t>=CD.cover[CD.coi].t){const c=CD.cover[CD.coi++];if(!CD.insert&&CD.inserts!==false&&c.t>=s.t+0.4&&c.t+c.dur<=s.t1-0.3){const L=coverPick();
      let ip=L?insertPose(L,pose,(CD.nIns++%2)?1:-1,c.want==='medium'):null,LL=L;
      // рядом нет героя — врезка по той же оси взгляда ближе к цели (по линии взгляда ничего не мешает)
      if(!ip){const lk=pose.look.clone();CT1.subVectors(pose.pos,lk);const d=CT1.length(),want=c.want==='close'?3:6.5;if(d>want+0.5){ip={pos:lk.clone().addScaledVector(CT1.normalize(),want),look:lk,fov:CD.fov0};LL={head:()=>lk.clone(),size:1};}}
      if(ip){CD.insert={who:'cover',t0:t,t1:t+c.dur,pose:ip,L:LL};CD.lastIns=t;CINE.emit('insert',{who:'cover',size:c.want});}}}
  // вставка крупного плана говорящего
  if(CD.insert){const I=CD.insert;if(t>=I.t1||t<I.t0){CD.insert=null;}else{const k=CE.inOutSine(clamp((t-I.t0)/(I.t1-I.t0),0,1));pose.pos.copy(I.pose.pos);pose.look.copy(I.pose.look).lerp(I.L.head(),0.25);
      CT1.subVectors(pose.look,pose.pos);pose.pos.addScaledVector(CT1,0.1*k);pose.fov=I.pose.fov-2*k;}}
  // мягкий наезд на говорящего в кадре
  else if(CD.focus){const f=CD.focus;f.w=damp(f.w,t<f.t1?1:0,t<f.t1?3.2:2.2,dt);if(f.w<0.01&&t>=f.t1)CD.focus=null;else{const H=f.L.head();CT1.subVectors(pose.look,pose.pos);const d=CT1.length();
      pose.look.lerp(H,0.3*f.w);pose.pos.addScaledVector(CT1.normalize(),d*0.08*f.w);pose.fov-=1.5*f.w;}}
  // dolly-zoom (эффект Хичкока): наезд с расширением угла — фон «уезжает»
  if(CD.dz){const z=CD.dz,k=CE.inOutCubic(clamp((t-z.t0)/z.dur,0,1))*(t>z.t0+z.dur+z.hold?Math.max(0,1-(t-z.t0-z.dur-z.hold)/0.6):1);
    if(k>0){CT1.subVectors(pose.pos,pose.look);const f=z.f*k;pose.pos.copy(pose.look).addScaledVector(CT1,1-f);const tn=Math.tan(THREE.MathUtils.degToRad(pose.fov)/2)/(1-f);pose.fov=THREE.MathUtils.radToDeg(2*Math.atan(tn));}}
  // handheld: медленное «дыхание» оператора
  const dd=pose.pos.distanceTo(pose.look),ha=(0.004*dd+0.012)*(CD.calm?0.5:1),la=(0.003*dd+0.008)*(CD.calm?0.5:1),nt=t+CD.S.dur*0.37;
  pose.pos.x+=CINE.fbm(nt*0.45)*ha;pose.pos.y+=CINE.fbm(nt*0.41+11)*ha*0.7;pose.pos.z+=CINE.fbm(nt*0.43+23)*ha;
  pose.look.x+=CINE.fbm(nt*0.37+41)*la;pose.look.y+=CINE.fbm(nt*0.33+53)*la*0.8;pose.roll+=CINE.fbm(nt*0.29+67)*0.006;
  // переход из предыдущей позы (вход, мягкая склейка, whip)
  if(CD.blend){const b=CD.blend;b.t+=dt;const k=clamp(b.t/b.dur,0,1),q=CE.inOutCubic(k);
    if(b.type==='whip'){CT1.subVectors(b.from.look,b.from.pos).normalize();CT2.subVectors(pose.look,pose.pos).normalize();
      // монтажный whip: поворот на месте старого кадра, склейка на пике смаза, доворот уже с новой точки — камера не пролетает сквозь предметы
      const first=k<0.5,q=first?0.5*CE.inCubic(k/0.5):0.5+0.5*CE.outCubic((k-0.5)/0.5),P=first?b.from.pos:pose.pos,dl=first?b.from.pos.distanceTo(b.from.look):pose.pos.distanceTo(pose.look);
      CT3.copy(CT1).lerp(CT2,q);if(CT3.lengthSq()<1e-3)CT3.set(-CT1.z,0,CT1.x);CT3.normalize();CT4.copy(P);pose.pos.copy(CT4);pose.look.copy(CT4).addScaledVector(CT3,dl);if(first){pose.fov=b.from.fov;pose.roll=b.from.roll;}
      CX.blur=Math.sin(Math.PI*k)*7;}
    else{const arc=Math.min(2.2,b.from.pos.distanceTo(pose.pos)*0.12);pose.pos.lerpVectors(b.from.pos,pose.pos,q);pose.pos.y+=Math.sin(Math.PI*q)*arc*(b.type==='in'?1:0.4);
      pose.look.lerpVectors(b.from.look,pose.look,q);pose.fov=lerp(b.from.fov,pose.fov,q);pose.roll=lerp(b.from.roll,pose.roll,q);}
    if(k>=1)CD.blend=null;}
  // тряска (trauma²), punch, голландский угол
  const tr=CX.trauma*CX.trauma*FIN.shakeK();if(tr>0.0004){const f=t*23;pose.pos.x+=CINE.noise(f)*0.42*tr;pose.pos.y+=CINE.noise(f+19)*0.32*tr;pose.pos.z+=CINE.noise(f+37)*0.42*tr;pose.roll+=CINE.noise(f+57)*0.06*tr;}
  pose.fov+=CX.punch.x;CX.dutch.a=damp(CX.dutch.a,CX.dutch.to,5,dt);pose.roll+=CX.dutch.a;pose.fov=clamp(pose.fov,18,80);
  // предвыход: если игра окажется далеко — закрыть шторку заранее
  if(!CD.exitChecked&&t>=S.dur-0.34){CD.exitChecked=true;const g=gameplayTarget();if(g&&g.pos.distanceTo(pose.pos)>30&&!CD.noIrisOut){CD.irisOut=true;CX.irisTo=0;CX.irisDur=0.3;CINE.emit('iris',{dir:'close'});}}
  shared.pos.copy(pose.pos);shared.look.copy(pose.look);shared.roll=pose.roll;}
// игровая камера «куда она хочет» — расчёт на копии, без побочных эффектов
let _usOrig=null;
function gameplayTarget(){if(!_usOrig)return null;const sv={p:shared.pos.clone(),l:shared.look.clone(),r:shared.roll,shT:shared.shT,shA:shared.shAmp,shK:shared.shTick,shO:shared.shOff.clone()},cine=G.cine;
  G.cine=null;let out=null;try{_usOrig(1000);out={pos:shared.pos.clone(),look:shared.look.clone(),roll:shared.roll};}catch(e){out=null;}
  G.cine=cine;shared.pos.copy(sv.p);shared.look.copy(sv.l);shared.roll=sv.r;shared.shT=sv.shT;shared.shAmp=sv.shA;shared.shTick=sv.shK;shared.shOff.copy(sv.shO);return out;}
function cdFinish(){const cd=CD;CD=null;const pose=copyPose(cPose(),cd.pose);CX.dutch.to=0;
  CINE.emit('end',{key:cd.key,skipped:cd.skipped,cd});
  if(G.cine&&G.cine.cam)return;                                   // сразу начался следующий ролик — он сам решит, как входить
  if(G.trans){CX.iris=1;CX.irisTo=1;return;}
  if(cd.skipped){CX.dip=1;CX.dipTo=0;CX.dipCol='#120a1c';CX.exit=null;CINE.emit('dip',{skip:true});return;}
  if(cd.irisOut){CX.irisTo=1;CX.irisDur=0.5;CINE.emit('iris',{dir:'open'});return;}
  CX.exit={from:pose,t:0,dur:1.1,fov:pose.fov};CINE.emit('blendOut',{});}
function exitUpdate(dt){const e=CX.exit;e.t+=dt;const k=clamp(e.t/e.dur,0,1),q=CE.inOutCubic(k),g=gameplayTarget();if(!g){CX.exit=null;return;}
  const arc=Math.min(1.6,e.from.pos.distanceTo(g.pos)*0.1);shared.pos.lerpVectors(e.from.pos,g.pos,q);shared.pos.y+=Math.sin(Math.PI*q)*arc;shared.look.lerpVectors(e.from.look,g.look,q);
  shared.roll=lerp(e.from.roll,g.roll,q);e.fov=lerp(e.from.fov,55,q);if(k>=1)CX.exit=null;}
{const _us=updateShared;_usOrig=_us;updateShared=function(dt){
  if(CD&&G.cine!==CD.S)cdFinish();
  if(CD&&G.cine===CD.S&&G.cine.cam){shakeUpd(shared,dt);shared.shOff.set(0,0,0);cdUpdate(dt);return;}
  if(CX.exit&&!G.cine&&G.split<0.5){shakeUpd(shared,dt);exitUpdate(dt);return;}
  CX.exit=null;_us(dt);};}
// ---------- приёмы для эффектов и авторской режиссуры ----------
CINE.punch=(deg)=>{CX.punch.v+=deg*13;CINE.emit('punch',{deg});};                  // FOV-punch: минус — сужение (наезд), плюс — «выдох»
CINE.trauma=(a)=>{CX.trauma=Math.min(1,CX.trauma+a);};
CINE.dollyZoom=(f,dur,hold)=>{if(!CD)return;CD.dz={t0:CD.S.t,dur:dur||0.9,hold:hold==null?0.8:hold,f:clamp(f||0.3,0.05,0.45)};CINE.emit('dollyzoom',{});};
CINE.dutch=(a)=>{CX.dutch.to=a||0;};
CINE.flashDip=(col,a)=>{const fk=FIN.flashK();if(fk<1&&col!=='#120a1c')a=Math.min((a||0.5)*(fk?0.6:1),fk?0.4:0.25);CX.dipCol=col||'#fff6d8';CX.dip=Math.max(CX.dip,a||0.5);CX.dipTo=0;};
CINE.active=()=>!!(CD&&G.cine===CD.S);
CINE.state=()=>CD?{key:CD.key,shot:CD.si,size:CD.shots[Math.max(0,CD.si)].size,move:CD.shots[Math.max(0,CD.si)].move,tr:CD.shots[Math.max(0,CD.si)].tr,fov:+CD.pose.fov.toFixed(1),
  entry:CD.entry,insert:CD.insert?CD.insert.who:null,focus:CD.focus?CD.focus.who:null,blend:CD.blend?CD.blend.type:null}:{exit:!!CX.exit};
// ---------- время ролика: slow-motion и hit-stop «в долг» — после акцента ролик догоняет своё время, длина роликов не меняется ----------
const TC={s:1,hold:0,debt:0};
CINE.slowmo=(scale,dur)=>{if(!CINE.active())return;TC.s=clamp(scale,0.05,1);TC.hold=Math.max(TC.hold,dur||0.5);CINE.emit('slowmo',{scale,dur});};
CINE.hitstop=(frames)=>{if(!CINE.active())return;TC.s=0.04;TC.hold=Math.max(TC.hold,(frames||3)/60);CINE.emit('hitstop',{frames});};
CINE.timeScale=()=>TC.hold>0?TC.s:1;
{const _step=step;step=function(dt){let k=1;
  if(G.cine){if(TC.hold>0){k=TC.s;TC.hold-=dt;TC.debt=Math.min(1.5,TC.debt+dt*(1-k));}else if(TC.debt>0){const r=Math.min(0.3*dt,TC.debt);k=1+r/dt;TC.debt-=r;}}
  else{TC.hold=0;TC.debt=0;}
  _step(dt*k);
  // пружины и оверлеи живут в реальном времени
  const P=CX.punch;P.v+=(-190*P.x-12*P.v)*dt;P.x+=P.v*dt;if(Math.abs(P.x)<0.01&&Math.abs(P.v)<0.05){P.x=0;P.v=0;}
  CX.trauma=Math.max(0,CX.trauma-dt*1.35);
  if(CX.iris!==CX.irisTo){const sp=dt/(CX.irisDur||0.5);CX.iris=CX.irisTo>CX.iris?Math.min(CX.irisTo,CX.iris+sp):Math.max(CX.irisTo,CX.iris-sp);}
  FIN.cineDom.setIris(CX.irisTo>CX.iris?CE.outBack(clamp(CX.iris,0,1)):CE.inOutCubic(clamp(CX.iris,0,1)));
  if(CX.dip!==CX.dipTo){const sp=dt/(CX.dipTo>CX.dip?0.2:0.32);CX.dip=CX.dipTo>CX.dip?Math.min(CX.dipTo,CX.dip+sp):Math.max(CX.dipTo,CX.dip-sp);}
  FIN.cineDom.setDip(CX.dip,CX.dipCol);
  CX.speed=Math.max(0,CX.speed-dt*2.6);FIN.cineDom.setSpeed(CX.speed*0.8,G.time*40%8);CX.blur=Math.max(0,CX.blur-dt*30);FIN.cineDom.setBlur(CX.blur);};}
// загрузка уровня сбрасывает шторки
{const _ll=loadLevel;loadLevel=function(i){if(CD)CINE.emit('end',{key:CD.key,chained:true,cd:CD});CD=null;CX.exit=null;CX.iris=1;CX.irisTo=1;CX.dip=0;CX.dipTo=0;TC.hold=0;TC.debt=0;CX.trauma=0;CX.dutch.to=0;CX.dutch.a=0;_ll(i);};}
CINE.dbg={coverPick,insertPose,onScreen,clearDist};   // для тестов
