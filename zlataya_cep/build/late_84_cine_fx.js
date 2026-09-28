/* ============================== РЕЛИЗ · КИНО 3: ЭФФЕКТЫ, СВЕТ, НАСТРОЕНИЕ, АКЦЕНТЫ ============================== */
// Lowpoly-частицы (тетраэдры, октаэдры, звёздочки, конфетти): пыль, звёзды, конфетти, искры, брызги, листья, лепестки.
// Акценты берутся из того, что ролики уже делают: баннер награды → конфетти, замедление, FOV-punch, радость героев;
// тряска → trauma, пыль, звёзды, hit-stop, испуг; вспышка → блеск и удивление; звуки удара/звона/брызг → свои частицы.
// Свет: контровой (rim) на героя в кадре, пульс на акцентах; настроение — тёплое/холодное тонирование и виньетка в роликах.
const FX={list:[],geo:{},mat:{}};FIN.fx=FX;
FX.geo.tetra=new THREE.TetrahedronGeometry(1,0);FX.geo.octa=new THREE.OctahedronGeometry(1,0);FX.geo.conf=new THREE.PlaneGeometry(1,0.62);
{const s=new THREE.Shape();for(let i=0;i<10;i++){const a=i/10*Math.PI*2-Math.PI/2,r=i%2?0.42:1;if(i)s.lineTo(Math.cos(a)*r,Math.sin(a)*r);else s.moveTo(Math.cos(a)*r,Math.sin(a)*r);}FX.geo.star=new THREE.ShapeGeometry(s);}
const fxMat=c=>FX.mat[c]||(FX.mat[c]=new THREE.MeshBasicMaterial({color:c,side:THREE.DoubleSide}));
const FXQ=()=>FIN.set.quality==='low'?0.45:FIN.set.quality==='mid'?0.75:1;
// частица: {m,v,spin,t,life,g (гравитация),drag,s0,kind}
function fxAdd(geo,col,pos,v,o){if(FX.list.length>260)return null;const m=new THREE.Mesh(FX.geo[geo],fxMat(col));m.position.copy(pos);m.rotation.set(rand(0,6),rand(0,6),rand(0,6));const s0=o.s||0.08;m.scale.setScalar(s0);
  m.castShadow=false;m.renderOrder=3;W.group.add(m);const p={m,v,spin:new V3(rand(-1,1),rand(-1,1),rand(-1,1)).multiplyScalar(o.spin||6),t:0,life:o.life||0.8,g:o.g==null?9:o.g,drag:o.drag||0,s0,grow:o.grow||0,flutter:o.flutter||0,ph:rand(0,6)};FX.list.push(p);return p;}
const RV=()=>new V3(rand(-1,1),rand(-1,1),rand(-1,1));
FX.dust=(pos,n,col,r)=>{n=Math.round((n||8)*FXQ());for(let i=0;i<n;i++){const a=i/n*Math.PI*2+rand(-0.3,0.3),sp=rand(1.2,2.6)*(r||1);fxAdd('tetra',col||0xe6dcc4,pos.clone().add(new V3(Math.cos(a)*0.2,0.05,Math.sin(a)*0.2)),new V3(Math.cos(a)*sp,rand(0.4,1.4),Math.sin(a)*sp),{s:rand(0.07,0.13)*(r||1),life:rand(0.5,0.85),g:1.5,drag:3.2,grow:1.6,spin:3});}};
FX.stars=(pos,n,col)=>{n=Math.round((n||7)*FXQ());for(let i=0;i<n;i++){const a=rand(0,Math.PI*2);fxAdd('star',col||(i%2?0xffe27a:0xfff4c0),pos.clone(),new V3(Math.cos(a)*rand(1.5,3.2),rand(2.2,4.4),Math.sin(a)*rand(1.5,3.2)),{s:rand(0.1,0.17),life:rand(0.7,1.1),g:6,drag:1.2,spin:9});}};
const CONF=[0xff6b6b,0xffd23a,0x6cc4b8,0xb67ccc,0xe0784a,0x7ad0ff,0xfff4e0,0x8ee07a];
FX.confetti=(pos,n,spread)=>{n=Math.round((n||36)*FXQ());for(let i=0;i<n;i++){const a=rand(0,Math.PI*2),sp=rand(2,5)*(spread||1);fxAdd('conf',CONF[i%CONF.length],pos.clone().add(RV().multiplyScalar(0.3)),new V3(Math.cos(a)*sp,rand(3,6.5),Math.sin(a)*sp),{s:rand(0.09,0.14),life:rand(1.6,2.4),g:3.2,drag:1.6,spin:10,flutter:1});}};
// конфетти перед камерой: хлопок у героя и «дождь» сверху кадра — падает через весь кадр
FX.confettiCam=(n)=>{n=Math.round((n||40)*FXQ());CT1.subVectors(shared.look,shared.pos);const d=CT1.length();CT1.normalize();CT2.set(CT1.z,0,-CT1.x).normalize();
  const c=shared.pos.clone().addScaledVector(CT1,Math.min(4.5,d*0.75)),w=Math.min(4.5,d*0.75)*0.9;
  for(let i=0;i<n;i++){const p=c.clone().addScaledVector(CT2,rand(-w,w)).add(new V3(0,rand(1.2,2.4)+w*0.25,0)).addScaledVector(CT1,rand(-0.6,0.6));
    fxAdd('conf',CONF[i%CONF.length],p,new V3(rand(-0.6,0.6),rand(-0.2,1.2),rand(-0.6,0.6)),{s:rand(0.07,0.11),life:rand(2.2,3),g:1.3,drag:1.4,spin:9,flutter:1});}};
FX.sparks=(pos,n,col)=>{n=Math.round((n||10)*FXQ());for(let i=0;i<n;i++){const d=RV().normalize();d.y=Math.abs(d.y)+0.3;fxAdd('octa',col||(i%3?0xffc24a:0xfff0b0),pos.clone(),d.multiplyScalar(rand(3,7)),{s:rand(0.035,0.06),life:rand(0.3,0.55),g:14,drag:0.5,spin:12});}};
FX.drops=(pos,n)=>{n=Math.round((n||10)*FXQ());for(let i=0;i<n;i++){const a=rand(0,Math.PI*2);fxAdd('tetra',i%2?0x9ae0f0:0xd8f6ff,pos.clone(),new V3(Math.cos(a)*rand(1,2.6),rand(2.5,5),Math.sin(a)*rand(1,2.6)),{s:rand(0.05,0.09),life:rand(0.5,0.8),g:13,spin:5});}};
FX.leaves=(pos,n,col)=>{n=Math.round((n||10)*FXQ());for(let i=0;i<n;i++){const a=rand(0,Math.PI*2);fxAdd('conf',col||(i%2?0x7ac050:0xa8d870),pos.clone().add(new V3(rand(-0.6,0.6),rand(0,0.6),rand(-0.6,0.6))),new V3(Math.cos(a)*rand(0.4,1.4),rand(1.5,3),Math.sin(a)*rand(0.4,1.4)),{s:rand(0.08,0.13),life:rand(1.2,1.8),g:1.4,drag:1.2,spin:6,flutter:1});}};
FX.petals=(pos,n)=>FX.leaves(pos,n||10,0xffb0c8);
FX.sparkle=(pos,n,col)=>{n=Math.round((n||6)*FXQ());for(let i=0;i<n;i++){fxAdd('star',col||0xfff4c0,pos.clone().add(RV().multiplyScalar(0.7)),RV().multiplyScalar(0.6).add(new V3(0,0.8,0)),{s:rand(0.06,0.11),life:rand(0.6,1),g:0,drag:1,spin:4,grow:-0.2});}};
FX.speed=a=>{CX.speed=Math.max(CX.speed,a||0.8);};
function fxUpdate(dt){for(let i=FX.list.length-1;i>=0;i--){const p=FX.list[i];p.t+=dt;const k=p.t/p.life;if(k>=1||!p.m.parent){if(p.m.parent)p.m.parent.remove(p.m);FX.list.splice(i,1);continue;}
  p.v.y-=p.g*dt;if(p.drag)p.v.multiplyScalar(Math.exp(-p.drag*dt));if(p.flutter){p.v.x+=Math.sin(p.t*7+p.ph)*2.2*dt;p.v.z+=Math.cos(p.t*6+p.ph)*2.2*dt;}
  p.m.position.addScaledVector(p.v,dt);p.m.rotation.x+=p.spin.x*dt;p.m.rotation.y+=p.spin.y*dt;p.m.rotation.z+=p.spin.z*dt;
  const sc=p.s0*(1+p.grow*k)*(k<0.12?k/0.12:k>0.65?Math.max(0,1-(k-0.65)/0.35):1);p.m.scale.setScalar(Math.max(0.0001,sc));}}
// ---------- свет и настроение ----------
const RIM=new THREE.DirectionalLight(0xffe2b0,0);RIM.castShadow=false;scene.add(RIM);scene.add(RIM.target);
const MOOD={el:null,col:'#ffb36b',a:0,to:0,pulse:0,rimT:0};
{const d=document.createElement('div');d.id='finMood';d.style.cssText='position:fixed;inset:0;pointer-events:none;mix-blend-mode:soft-light;opacity:0;background:#ffb36b';
  const ref=$('finGrade')||$('ui');ref.parentNode.insertBefore(d,ref.nextSibling);MOOD.el=d;}
CINE.mood=(col,a,hold)=>{MOOD.col=col;MOOD.to=a==null?0.18:a;MOOD.hold=hold||0;};
CINE.moodFlash=(col,a,dur)=>{MOOD.tmp={col,a:a==null?0.2:a,t:dur||1.5};};   // временное тонирование на акценте, потом — назад к настроению сцены
CINE.rimPulse=(a)=>{MOOD.pulse=Math.max(MOOD.pulse,a||0.6);};
function lightUpdate(dt){const on=CINE.active();const cd=CINE.CD();let want=0,subj=shared.look;
  if(on&&cd){const s=cd.shots[Math.max(0,cd.si)];want=cd.insert?0.6:s.size==='close'?0.55:s.size==='medium'?0.36:0.2;if(cd.insert)subj=cd.insert.L.head();else if(cd.focus)subj=cd.focus.L.head();}
  MOOD.rimT=damp(MOOD.rimT,want,3,dt);MOOD.pulse=Math.max(0,MOOD.pulse-dt*1.4);RIM.intensity=MOOD.rimT+MOOD.pulse;
  if(RIM.intensity>0.01){CT1.subVectors(subj,shared.pos).setY(0);if(CT1.lengthSq()<1e-4)CT1.set(0,0,-1);CT1.normalize();RIM.target.position.copy(subj);RIM.position.copy(subj).addScaledVector(CT1,6).add(new V3(0,4,0));}
  if(MOOD.hold>0)MOOD.hold-=dt;else if(!on)MOOD.to=0;const T0=MOOD.tmp&&MOOD.tmp.t>0?MOOD.tmp:null;if(T0)T0.t-=dt;
  const col=T0?T0.col:MOOD.col,to=T0?Math.max(T0.a,MOOD.to):MOOD.to;MOOD.a=damp(MOOD.a,on||MOOD.hold>0||T0?to:0,T0?4:1.6,dt);
  if(MOOD.el){if(MOOD.lastCol!==col){MOOD.lastCol=col;MOOD.el.style.background=col;}const v=MOOD.a<0.004?'0':MOOD.a.toFixed(3);if(MOOD.el.style.opacity!==v)MOOD.el.style.opacity=v;}
  const cls=on&&FIN.set.quality!=='low';if(document.body.classList.contains('fin-cine')!==on)document.body.classList.toggle('fin-cine',on);if(document.body.classList.contains('fin-cinegrade')!==cls)document.body.classList.toggle('fin-cinegrade',cls);}
// ---------- акценты ----------
const ACC={last:{}};const accOk=(k,gap)=>{const t=G.time;if(ACC.last[k]&&t-ACC.last[k]<gap)return false;ACC.last[k]=t;return true;};
function camFront(d){CT1.subVectors(shared.look,shared.pos).normalize();return shared.pos.clone().addScaledVector(CT1,d||4);}
function fxGround(p){let y=p.y-1;for(const h of HEROES)if(h.g.visible&&hd(h.pos,p)<6){y=h.pos.y;break;}return new V3(p.x,y+0.05,p.z);}
function badColor(c){if(!c||c[0]!=='#'||c.length<7)return false;const r=parseInt(c.slice(1,3),16),g=parseInt(c.slice(3,5),16),b=parseInt(c.slice(5,7),16);return r>g*1.45&&r>b*1.45;}
CINE.reward=function(bad){if(!CINE.active()||!accOk('reward',1.2))return;const p=camFront(Math.min(5,shared.pos.distanceTo(shared.look)*0.7));p.y+=0.8;
  if(!bad){FX.confetti(p,24,0.7);FX.confettiCam(44);CINE.slowmo(0.45,0.45);CINE.punch(-5);CINE.rimPulse(0.8);CINE.moodFlash('#ffc070',0.22,2.4);}else{CINE.punch(-3);CINE.moodFlash('#7a8cff',0.18,1.6);}
  CINE.emit('accent',{type:'reward',bad});};
CINE.impact=function(amp,pos){if(!CINE.active()||!accOk('impact',0.15))return;amp=clamp(amp||0.2,0.05,1);const p=fxGround(pos||shared.look);CINE.trauma(0.25+amp*1.3);
  FX.dust(p,Math.round(6+amp*14),0xe6dcc4,0.8+amp);if(amp>=0.22)FX.stars(p.clone().add(new V3(0,0.8,0)),Math.round(4+amp*8));if(amp>=0.3){CINE.hitstop(3);CINE.punch(3);CINE.moodFlash('#8a9cff',0.14,1.2);}
  CINE.emit('impact',{amp,pos:p});};
CINE.flashAccent=function(){if(!CINE.active()||!accOk('flash',0.6))return;CINE.punch(-3);CINE.rimPulse(0.7);FX.sparkle(camFront(3),8);CINE.emit('accent',{type:'flash'});};
{const _b=banner;banner=function(text,color,dur,sub){const r=_b.apply(this,arguments);if(G.cine)CINE.reward(badColor(color));return r;};}
{const _sh=shake;shake=function(pi,amp,dur){_sh(pi,amp,dur);if(G.cine&&amp>0.02)CINE.impact(amp*1.6);};}
// вспышка: прототип выставляет прозрачность #flash напрямую — следим за стилем
try{const fl=$('flash');new MutationObserver(()=>{if(G.cine&&+fl.style.opacity>0.15)CINE.flashAccent();}).observe(fl,{attributes:true,attributeFilter:['style']});}catch(e){}
// звуки роликов → частицы и камера
const SFX_FX={hammer:()=>{FX.sparks(shared.look.clone(),14);CINE.trauma(0.28);CINE.hitstop(2);},crash:()=>{CINE.impact(0.28);},thud:()=>{CINE.impact(0.2);},
  dzin:()=>{if(W.zven&&W.zven.g&&W.zven.g.visible)FX.sparkle(W.zven.g.getWorldPosition(new V3()),7,0xffe27a);},splash:()=>{FX.drops(fxGround(shared.look),14);},water:()=>{FX.drops(fxGround(shared.look),8);},
  grow:()=>{FX.leaves(fxGround(shared.look),12);},flower:()=>{FX.petals(fxGround(shared.look),9);},link:()=>{FX.sparkle(shared.look.clone(),9,0xffd23a);CINE.rimPulse(0.5);},ok:()=>{FX.sparkle(shared.look.clone(),6);},
  knot:()=>{FX.sparkle(shared.look.clone(),6,0xfff0f8);},whoosh:()=>{FX.speed(0.55);CINE.punch(2);},horn:()=>{CINE.punch(-4);CINE.rimPulse(0.6);},rip:()=>{CINE.punch(2);},gate:()=>{FX.dust(fxGround(shared.look),6,0xd8c8a8,0.7);}};
for(const k in SFX){const f=SFX[k];SFX[k]=function(){const r=f.apply(this,arguments);if(G.cine){CINE.emit('sfx',{name:k});const e=SFX_FX[k];if(e)try{e();}catch(er){}}return r;};}
// эмоции героев — маленькие эффекты
CINE.on('emote',d=>{if(!G.cine||!d.pos)return;const p=d.pos.clone();const h=HERO[d.who];const ht=h?h.d.height:1.5;
  if(d.type==='joy'||d.type==='cheer'){later(0.3,()=>FX.stars(p.clone().add(new V3(0,ht*0.9,0)),5));}
  else if(d.type==='surprise'){floatText(p.clone().add(new V3(0,ht+0.5,0)),'!','#ffe27a');}
  else if(d.type==='fear'){FX.drops(p.clone().add(new V3(0,ht,0)),3);}
  else if(d.type==='pride'){FX.sparkle(p.clone().add(new V3(0,ht*0.8,0)),5);}});
// приземления в роликах — пыль (в игре её уже поднимает late_30)
function landUpdate(){if(!G.cine)return;for(const h of HEROES){if(h._fxG===false&&h.grounded&&(h._fxVy||0)<-4.5&&h.g.visible)FX.dust(new V3(h.pos.x,h.pos.y+0.06,h.pos.z),7,0xe6dcc4,0.8);h._fxG=h.grounded;h._fxVy=h.vel.y;}}
{const _step=step;step=function(dt){_step(dt);const sd=dt*CINE.timeScale();fxUpdate(sd);landUpdate();lightUpdate(dt);};}
{const _ll=loadLevel;loadLevel=function(i){FX.list.length=0;MOOD.to=0;MOOD.hold=0;MOOD.pulse=0;MOOD.tmp=null;_ll(i);};}
