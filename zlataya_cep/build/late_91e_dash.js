/* ============================== РЕЛИЗ · РЫВОК-УВОРОТ (LT / Shift): своя анимация и след у каждого героя ============================== */
// Раньше уворот был кувырком: всё тело делало сальто через голову и ехало с ровной скоростью. Теперь это рывок.
// Механика прежняя (0,38 с, неуязвимость 0,42 с, откат 0,7 с, тот же путь ~3,3 м с докатом — щиты, красные зубцы и боты не замечают разницы),
// но скорость с места высокая и спадает к концу, герой разворачивается по направлению рывка, а поза и эффект — свои:
//   Прошка — низкий лисий выпад-прыжок: вытянулся в струну, передняя лапа вперёд, задняя назад, руки отведены, хвост трубой;
//            рыжая лента следа с белой «линией скорости», искры и пыль из-под лап;
//   Потап  — таран плечом: развернулся боком, лапы скрещены перед грудью, голова вниз, тяжёлые частые шаги;
//            кольцо-ударная волна по земле, пыль на каждом шаге, низкая широкая медовая полоса, лёгкая тряска и отдача в геймпад;
//   Пелагея — взмах над землёй: тело горизонтально, крылья раскрыты и бьют один раз, лапки поджаты, приподнимается;
//            две сиреневые ленты с кончиков крыльев, перья;
//   Йоша   — сворачивается в колючий клубок (иглы топорщатся, мордочка и лапки внутрь) и волчком скользит на струе воды;
//            бирюзовая спираль вокруг, брызги, всплеск-кольцо в конце.
// Тексты подсказок («кувырок») и озвучка не меняются. Слой следа — без тумана и тонмаппинга, как лента удара (late_34_slash).
const DS={dur:0.38,v:7.2,n:24,trails:[],rings:[],time:0};FIN.dash=DS;
const dsS=(a,b,x)=>{const t=clamp((x-a)/(b-a),0,1);return t*t*(3-2*t);};
// скорость рывка: k(u) = 1,47 − 0,8u — с места в полтора раза быстрее, к концу медленнее; путь вместе с докатом после рывка
// (скорость гаснет за ~0,1 с) тот же, что у ровного кувырка: ~3,3 м
DS.k=u=>1.47-0.8*u;
// ---------- почерк героя: ленты следа (y — доля роста, lat — вбок, м; w — ширина; flat — лента лежит; spiral — вьётся вокруг) ----------
const DS_STY={
  proshka:{tr:[{y:0.4,lat:0,w:0.3,col:0xff8a2a,core:0xfff0c0,life:0.22},{y:0.72,lat:0,w:0.07,col:0xffd27a,core:0xffffff,life:0.15}]},
  potap:{tr:[{y:0.12,lat:0,w:0.62,col:0xc8903a,core:0xffe6b0,life:0.26,flat:true}]},
  pelageya:{tr:[{y:0.52,lat:0.62,w:0.13,col:0xb27cff,core:0xfff0ff,life:0.3},{y:0.52,lat:-0.62,w:0.13,col:0xb27cff,core:0xfff0ff,life:0.3}]},
  yosha:{tr:[{y:0.5,lat:0,w:0.27,col:0x3fd6c0,core:0xeafff8,life:0.28,spiral:0.36}]}};
const DS_VS='attribute float aA;attribute float aS;varying float vA;varying float vS;void main(){vA=aA;vS=aS;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}';
const DS_FS=`uniform vec3 uCol;uniform vec3 uCore;varying float vA;varying float vS;
void main(){float s=abs(vS);float a=vA*(1.0-smoothstep(0.55,1.0,s));if(a<0.02)discard;
  vec3 c=mix(uCore,uCol,clamp(smoothstep(0.0,0.4,s)+(1.0-vA)*0.8,0.0,1.0));gl_FragColor=vec4(c,a*0.9);}`;
function dsTrail(h,i,S){const k=h.kind+i;let t=DS.trails.find(o=>o.k===k);if(t)return t;const N=DS.n;
  const P=new Float32Array(N*6),A=new Float32Array(N*2),Sd=new Float32Array(N*2),I=[];
  for(let j=0;j<N;j++){Sd[j*2]=-1;Sd[j*2+1]=1;if(j<N-1){const a=j*2;I.push(a,a+1,a+2,a+1,a+3,a+2);}}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(P,3));g.setAttribute('aA',new THREE.BufferAttribute(A,1));g.setAttribute('aS',new THREE.BufferAttribute(Sd,1));g.setIndex(I);g.setDrawRange(0,0);
  const m=new THREE.Mesh(g,new THREE.ShaderMaterial({uniforms:{uCol:{value:new THREE.Color(S.col)},uCore:{value:new THREE.Color(S.core)}},vertexShader:DS_VS,fragmentShader:DS_FS,
    transparent:true,depthWrite:false,side:THREE.DoubleSide,fog:false,toneMapped:false}));
  m.renderOrder=11;m.frustumCulled=false;m.userData.noBatch=true;m.userData.occEx=true;m.visible=false;
  t={k,h,S,m,pts:[]};DS.trails.push(t);return t;}
// кольцо по земле (ударная волна Потапа, всплеск Йоши)
const DS_RING=new THREE.RingGeometry(0.82,1,36);DS_RING.rotateX(-Math.PI/2);
function dsRing(pos,col,r0,r1,life,op){let o=DS.rings.find(q=>!q.on);
  if(!o){if(DS.rings.length>=8)return;const m=new THREE.Mesh(DS_RING,new THREE.MeshBasicMaterial({color:col,transparent:true,depthWrite:false,fog:false,toneMapped:false,side:THREE.DoubleSide}));
    m.renderOrder=11;m.frustumCulled=false;m.userData.noBatch=true;m.userData.occEx=true;o={m};DS.rings.push(o);}
  Object.assign(o,{on:true,t:0,life,r0,r1,op:op||0.75});o.m.material.color.setHex(col);o.m.position.set(pos.x,pos.y+0.04,pos.z);o.m.scale.setScalar(r0);o.m.visible=true;
  if(W&&W.group&&o.m.parent!==W.group)W.group.add(o.m);}
const dsFx=()=>typeof FX!=='undefined'&&typeof fxAdd==='function'&&W&&W.group;
const DV1=new V3(),DV2=new V3(),DV3=new V3();
// ---------- старт рывка: разворот по направлению, всплеск эффекта ----------
function dashStart(h){h.face=Math.atan2(h.rollDir.x,h.rollDir.z);h._dsEm=0;h._dsStep=0;h._dsEnd=false;h._dsSpin=0;h._dsLift=0;
  for(const t of DS.trails)if(t.h===h)t.pts.length=0;
  if(!h.rig||!h.g.visible||!h.body.visible)return;
  // покой костей, которые после рывка никто не возвращает сам
  const B=h.rig,R=h._dsRest||(h._dsRest={});for(const n of['chest','neck','head','tail','tailTip','wingL','wingR'])if(B[n]){const b=B[n];R[n]={rx:b.rotation.x,ry:b.rotation.y,rz:b.rotation.z,px:b.position.x,py:b.position.y,pz:b.position.z};}
  if(!dsFx())return;const p=h.pos,back=DV1.set(-h.rollDir.x,0,-h.rollDir.z),H=h.d.height;
  if(h.kind==='proshka'){FX.dust(DV2.copy(p).addScaledVector(back,0.25),5,0xe6dcc4,0.7);FX.sparks(DV2.copy(p).addScaledVector(back,0.2).setY(p.y+0.15),6,0xffb050);}
  else if(h.kind==='potap'){FX.dust(DV2.copy(p),12,0xd8c8a8,1.3);dsRing(p,0xffd890,0.4,2.1,0.42,0.8);dsRing(p,0xc8903a,0.3,1.4,0.3,0.6);
    if(h.player!=null){shake(h.player,0.05*(FIN.shakeK?FIN.shakeK():1),0.14);}}
  else if(h.kind==='pelageya'){for(let i=0;i<Math.round(7*FXQ());i++){const a=rand(0,Math.PI*2);fxAdd('conf',i%2?0xd8c0ff:0xfff4ff,DV2.copy(p).add(DV3.set(rand(-0.4,0.4),H*rand(0.3,0.7),rand(-0.4,0.4))),
      new V3(Math.cos(a)*rand(0.6,1.6)+back.x*1.5,rand(0.6,1.8),Math.sin(a)*rand(0.6,1.6)+back.z*1.5),{s:rand(0.07,0.11),life:rand(0.9,1.3),g:1.1,drag:2,spin:6,flutter:1});}
    FX.dust(DV2.copy(p),6,0xe8dcff,0.8);}
  else if(h.kind==='yosha'){FX.drops(DV2.copy(p).setY(p.y+0.2),8);dsRing(p,0x9ae0f0,0.25,1.1,0.3,0.7);}}
// ---------- скорость: рывок с места, спад к концу (путь тот же) ----------
{const _up=updatePlayer;updatePlayer=function(pi,dt){_up(pi,dt);try{const h=active(pi);if(!h||!(h.rollT>0))return;
  if(h.lastRoll!==h._dsAt){h._dsAt=h.lastRoll;dashStart(h);}
  if(Math.abs(h.vel.x-h.rollDir.x*DS.v)<1e-6&&Math.abs(h.vel.z-h.rollDir.z*DS.v)<1e-6){const k=DS.k(clamp(1-h.rollT/DS.dur,0,1));h.vel.x*=k;h.vel.z*=k;}}
  catch(e){console.error('dash',e);}};}
// ---------- поза: тело и кости ----------
// mix: значение, которое поставил прежний код (походка, heroPose), сдвигается к позе рывка на e
const dsMix=(o,prop,v,e)=>{o[prop]+=(v-o[prop])*e;};
function dsRestBone(h,n,e,f){const B=h.rig,R=h._dsRest&&h._dsRest[n],b=B&&B[n];if(!b||!R)return;
  const t=f||{};b.rotation.set(R.rx+(t.rx||0)*e,R.ry+(t.ry||0)*e,R.rz+(t.rz||0)*e);b.position.set(R.px+(t.px||0)*e,R.py+(t.py||0)*e,R.pz+(t.pz||0)*e);}
function dsLimbs(h,e,L,Rr,arms){const B=h.rig;for(const[n,q]of[['L',L],['R',Rr]]){if(!q)continue;
    if(B['hip'+n]){dsMix(B['hip'+n].rotation,'x',q.hip,e);dsMix(B['knee'+n].rotation,'x',q.knee,e);if(B['foot'+n]&&q.foot!=null)dsMix(B['foot'+n].rotation,'x',q.foot,e);}
    const a=arms&&arms[n];if(a&&B['arm'+n]){dsMix(B['arm'+n].rotation,'x',a.arm,e);dsMix(B['elbow'+n].rotation,'x',a.el,e);dsMix(B['shoulder'+n].rotation,'z',a.sh,e);}}}
function dashPose(h,dt){const b=h.body;if(!b)return;
  if(!(h.rollT>0)){if(h._dsOn){h._dsOn=false;h._dsLift=0;if(!h._sqOn)b.scale.set(1,1,1);
      if(h.rig&&h._dsRest)for(const n in h._dsRest)dsRestBone(h,n,0);if(h.kind==='yosha')b.rotation.y=0;}return;}
  if(h.cling||h.hang)return;h._dsOn=true;
  const u=clamp(1-h.rollT/DS.dur,0,1),e=dsS(0,0.12,u)*(1-dsS(0.62,1,u)),pk=Math.sin(Math.PI*u),B=h.rig;let lift=0;
  if(h.kind==='proshka'){lift=0.22*pk;b.rotation.set(0.55*e,0,0);b.scale.set(1-0.08*e,1-0.1*e,1+0.24*e);
    if(B){dsLimbs(h,e,{hip:-1.05,knee:0.35,foot:-0.2},{hip:0.95,knee:0.55,foot:0.45},{L:{arm:0.95,el:-0.25,sh:0.35},R:{arm:0.95,el:-0.25,sh:-0.35}});
      dsRestBone(h,'chest',e,{rx:0.12});dsRestBone(h,'head',e,{rx:-0.42});dsRestBone(h,'tail',e,{rx:-0.65});dsRestBone(h,'tailTip',e,{rx:-0.3});}}
  else if(h.kind==='potap'){const ph=u*Math.PI*3;lift=0.045*Math.abs(Math.sin(ph));b.rotation.set(0.3*e,0.5*e,-0.06*e);b.scale.set(1+0.1*e,1-0.07*e,1+0.06*e);
    if(B){const sl=Math.sin(ph),sr=Math.sin(ph+Math.PI);
      dsLimbs(h,e,{hip:sl*0.85,knee:Math.max(0,Math.sin(ph+1.4))*1.1,foot:-sl*0.3},{hip:sr*0.85,knee:Math.max(0,Math.sin(ph+Math.PI+1.4))*1.1,foot:-sr*0.3},
        {L:{arm:-1.25,el:-1.75,sh:-0.15},R:{arm:-0.95,el:-1.9,sh:0.1}});
      dsRestBone(h,'chest',e,{rx:0.1,ry:0.15});dsRestBone(h,'head',e,{rx:0.28,ry:-0.35});}
    // шаг — облачко пыли
    const st=Math.floor(ph/Math.PI);if(st!==h._dsStep){h._dsStep=st;if(dsFx()&&h.g.visible)FX.dust(DV2.copy(h.pos),4,0xd8c8a8,0.75);}}
  else if(h.kind==='pelageya'){lift=0.34*Math.pow(pk,0.8);b.rotation.set(0.85*e,0,0);b.scale.set(1,1,1+0.12*e);
    if(B){dsLimbs(h,e,{hip:0.75,knee:1.05,foot:0.6},{hip:0.75,knee:1.05,foot:0.6});dsRestBone(h,'head',e,{rx:-0.6});dsRestBone(h,'tail',e,{rx:-0.3});
      const fl=1.5-0.95*Math.sin(Math.PI*clamp((u-0.06)/0.36,0,1));
      for(const n of['L','R']){const w=B['wing'+n];if(!w)continue;const s=n==='L'?1:-1;dsMix(w.rotation,'z',s*fl,e);const k=1+0.5*e;w.scale.set(1,k,k);}}}
  else if(h.kind==='yosha'){lift=0.1*pk;const sp=Math.PI*4*(1-Math.pow(1-u,2.5));h._dsSpin=sp;b.rotation.set(0.12*e,sp,0);b.scale.setScalar(1+0.06*e);
    if(B){dsLimbs(h,e,{hip:-1.45,knee:2.0,foot:0.5},{hip:-1.45,knee:2.0,foot:0.5},{L:{arm:-1.4,el:-1.8,sh:-0.1},R:{arm:-1.4,el:-1.8,sh:0.1}});
      dsRestBone(h,'head',e,{rx:0.7,py:-0.06,pz:-0.05});if(B.ball){const k=1+0.14*e;B.ball.scale.set(k,k,k);}}}
  b.position.set(0,lift,0);h._dsLift=lift;}
{const _anim=animHero;animHero=function(h,dt){_anim(h,dt);try{dashPose(h,dt||0);}catch(e){console.error('dash pose',e);}};}
// ---------- кадр: ленты следа, частицы по пути, кольца ----------
function dsSample(h,dt){const st=DS_STY[h.kind];if(!st)return;const fx=Math.sin(h.face),fz=Math.cos(h.face),H=h.d.height,lift=h._dsLift||0;
  const side=DV1.set(fz,0,-fx);
  st.tr.forEach((S,i)=>{const t=dsTrail(h,i,S);let x=h.pos.x+side.x*S.lat,y=h.pos.y+H*S.y+lift,z=h.pos.z+side.z*S.lat,wx,wy,wz;
    if(S.spiral){const a=(h._dsSpin||0)*1.25,c=Math.cos(a),s=Math.sin(a);const ox=side.x*c*S.spiral,oy=s*S.spiral,oz=side.z*c*S.spiral;x+=ox;y+=oy;z+=oz;
      const l=Math.hypot(ox,oy,oz)||1;wx=ox/l*S.w;wy=oy/l*S.w;wz=oz/l*S.w;}
    else if(S.flat){wx=side.x*S.w;wy=0;wz=side.z*S.w;}
    else{wx=side.x*S.w*0.75;wy=S.w*0.66;wz=side.z*S.w*0.75;}
    t.pts.unshift({x,y,z,wx,wy,wz,t:DS.time});if(t.pts.length>DS.n)t.pts.length=DS.n;});
  // по пути
  if(!dsFx())return;h._dsEm=(h._dsEm||0)+dt;const back=DV2.set(-h.rollDir.x,0,-h.rollDir.z),u=1-h.rollT/DS.dur;
  if(h.kind==='pelageya'&&h._dsEm>0.07){h._dsEm=0;const s=Math.random()<0.5?1:-1;fxAdd('conf',Math.random()<0.5?0xd8c0ff:0xfff4ff,DV3.set(h.pos.x+side.x*0.55*s,h.pos.y+H*0.5+lift,h.pos.z+side.z*0.55*s),
      new V3(back.x*1.2+rand(-0.4,0.4),rand(0.2,0.9),back.z*1.2+rand(-0.4,0.4)),{s:rand(0.06,0.09),life:rand(0.8,1.1),g:1,drag:2,spin:6,flutter:1});}
  else if(h.kind==='yosha'&&h._dsEm>0.045){h._dsEm=0;const a=(h._dsSpin||0)+rand(-0.3,0.3);
    fxAdd('tetra',Math.random()<0.5?0x9ae0f0:0xd8f6ff,DV3.set(h.pos.x,h.pos.y+0.25,h.pos.z),new V3(Math.cos(a)*2.4+back.x*1.2,rand(1.5,3),Math.sin(a)*2.4+back.z*1.2),{s:rand(0.05,0.08),life:rand(0.4,0.6),g:12,spin:5});}
  else if(h.kind==='proshka'&&h._dsEm>0.06){h._dsEm=0;fxAdd('octa',Math.random()<0.6?0xffc24a:0xfff0b0,DV3.set(h.pos.x,h.pos.y+0.1,h.pos.z),new V3(back.x*2+rand(-0.8,0.8),rand(1,2.4),back.z*2+rand(-0.8,0.8)),{s:rand(0.03,0.05),life:rand(0.25,0.4),g:12,spin:10});}
  if(!h._dsEnd&&u>0.8){h._dsEnd=true;if(h.kind==='yosha'){dsRing(h.pos,0x3fd6c0,0.3,1.25,0.35,0.7);FX.drops(DV3.copy(h.pos).setY(h.pos.y+0.15),6);}
    else if(h.kind==='proshka')FX.dust(DV3.copy(h.pos),4,0xe6dcc4,0.6);}}
function dsTrailUpd(t){const live=t.pts.length&&W&&W.group&&t.h.g.visible;if(!live){t.m.visible=false;return;}
  const L=t.S.life;while(t.pts.length&&DS.time-t.pts[t.pts.length-1].t>L)t.pts.pop();const n=t.pts.length;if(n<2){t.m.visible=false;return;}
  const g=t.m.geometry,P=g.attributes.position.array,A=g.attributes.aA.array;
  for(let j=0;j<n;j++){const q=t.pts[j],a=clamp(1-(DS.time-q.t)/L,0,1),wf=0.3+0.7*a;
    P[j*6]=q.x-q.wx*wf;P[j*6+1]=q.y-q.wy*wf;P[j*6+2]=q.z-q.wz*wf;P[j*6+3]=q.x+q.wx*wf;P[j*6+4]=q.y+q.wy*wf;P[j*6+5]=q.z+q.wz*wf;A[j*2]=A[j*2+1]=a;}
  g.attributes.position.needsUpdate=true;g.attributes.aA.needsUpdate=true;g.setDrawRange(0,(n-1)*6);
  if(t.m.parent!==W.group)W.group.add(t.m);t.m.visible=true;}
function dashTick(dt){DS.time+=dt;
  for(const h of HEROES){if(h.rollT>0&&!h.cling&&!h.hang&&h.g.visible&&h.body.visible&&!G.cine)dsSample(h,dt);}
  for(const t of DS.trails)dsTrailUpd(t);
  for(const o of DS.rings){if(!o.on)continue;o.t+=dt;const k=o.t/o.life;if(k>=1||!o.m.parent){o.on=false;o.m.visible=false;continue;}
    const q=1-Math.pow(1-k,2.2);o.m.scale.setScalar(o.r0+(o.r1-o.r0)*q);o.m.material.opacity=o.op*(1-k);}}
{const _st=step;step=function(dt){_st(dt);try{dashTick(dt||0);}catch(e){console.error('dash tick',e);}};}
{const _ll=loadLevel;loadLevel=function(i){for(const t of DS.trails){t.pts.length=0;t.m.visible=false;}for(const o of DS.rings){o.on=false;o.m.visible=false;}_ll(i);};}
