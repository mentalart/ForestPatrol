/* ============================== РЕЛИЗ final05 · УДАР ГЕРОЕВ: лента-полумесяц, почерк героя, «бах» при попадании ============================== */
// Раньше удар был плоским белым полупрозрачным сектором кольца у ног — на ярком (свет пера жар-птицы, снег, облака) его не было видно.
// Теперь — лента-полумесяц на высоте груди: пролетает за ~0,2 с, светлая сердцевина → цвет героя → тёмный контур (читается и на светлом,
// и на тёмном), яркая передняя кромка, хвост растворяется. Направление ударов чередуется. Почерк у каждого свой:
//   Прошка — широкая быстрая дуга и две «линии скорости»; Потап — три «когтя» наискосок, пыль; Пелагея — широкое «крыло» с искрами;
//   Йоша — круговой вихрь вокруг себя. По кромке сыплются звёздочки. Попал — «бах»-звезда цвета героя, кольцо, искры.
// Детский стиль: без крови и резкости; слой рисуется без тонмаппинга и тумана, поверх прозрачного. Хитбоксы удара не меняются.
const SL_VS='varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}';
const SL_FS=`uniform float uProg;uniform float uDir;uniform float uLen;uniform vec3 uCol;uniform vec3 uCore;uniform vec3 uEdge;uniform float uAlpha;varying vec2 vUv;
void main(){float u=uDir>0.0?vUv.x:1.0-vUv.x;float head=uProg,tail=uProg-uLen;
  float mid=clamp((u-tail)/max(head-tail,1e-3),0.0,1.0);float w=0.18+0.82*sin(mid*3.14159);
  float band=smoothstep(tail,tail+uLen*0.45,u)*(1.0-smoothstep(head-0.01,head+0.03,u));
  float v=vUv.y/w;float body=1.0-smoothstep(0.86,1.0,v);float a=band*body*uAlpha;if(a<0.02)discard;
  vec3 c=mix(uCore,uCol,smoothstep(0.05,0.6,v));c=mix(c,uEdge,smoothstep(0.72,0.94,v));
  float lead=smoothstep(head-0.1,head,u)*(1.0-smoothstep(0.55,0.9,v));c=mix(c,vec3(1.0,0.99,0.94),lead*0.85);
  gl_FragColor=vec4(c,a);}`;
// лента: сектор кольца, u — вдоль дуги, v — от внутреннего края к внешнему
function slGeo(r0,r1,a0,a1,n){const P=[],U=[],I=[];for(let i=0;i<=n;i++){const t=i/n,a=a0+(a1-a0)*t,c=Math.cos(a),s=Math.sin(a);P.push(c*r0,0,s*r0,c*r1,0,s*r1);U.push(t,0,t,1);
    if(i<n){const k=i*2;I.push(k,k+1,k+2,k+1,k+3,k+2);}}
  const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(P,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(U,2));g.setIndex(I);return g;}
function slMat(col,core,edge){return new THREE.ShaderMaterial({uniforms:{uProg:{value:0},uDir:{value:1},uLen:{value:0.6},uCol:{value:new THREE.Color(col)},uCore:{value:new THREE.Color(core)},uEdge:{value:new THREE.Color(edge)},uAlpha:{value:1}},
  vertexShader:SL_VS,fragmentShader:SL_FS,transparent:true,depthWrite:false,side:THREE.DoubleSide,fog:false,toneMapped:false});}
// почерк героя: цвет, контур, дуга, толщина, число лент, наклон, частицы
const SL_STYLE={
  proshka:{col:0xff9a3a,core:0xfff4c8,edge:0x8a3010,r0:0.32,r1:1.62,arc:2.7,n:3,lag:0.18,roll:0.42,off:0.0,rad:0.22,dur:0.28,lines:true,spark:0xffd27a},
  potap:{col:0xffc84a,core:0xfff6d8,edge:0x6a3e10,r0:0.5,r1:1.2,arc:1.9,n:3,lag:0.1,roll:1.05,off:0.22,rad:0,dur:0.28,claw:true,spark:0xffe29a,dust:true},
  pelageya:{col:0xc896ff,core:0xfff0ff,edge:0x4e267e,r0:0.34,r1:1.85,arc:3.0,n:2,lag:0.22,roll:0.38,off:0.0,rad:0.25,dur:0.28,spark:0xe8d0ff,wing:true},
  yosha:{col:0x5ee0c8,core:0xeafff8,edge:0x16625a,r0:0.35,r1:1.25,arc:6.28,n:2,lag:0.15,roll:0.12,off:0.18,rad:-0.15,dur:0.3,spin:true,spark:0xb8fff0}};
const SL={pool:{},live:[],flip:{},stars:[]};FIN.slash=SL;
function slGet(kind,i){const k=kind+i;let o=SL.pool[k];if(o&&!o.busy)return o;const S=SL_STYLE[kind]||SL_STYLE.proshka;
  const line=S.lines&&i>0,r0=line?S.r1+S.rad*(i-1):S.r0+(S.claw?0:S.rad*i),r1=line?r0+0.16:(S.claw?S.r1:S.r1+S.rad*i*0.6);
  const m=new THREE.Mesh(slGeo(r0,r1,-S.arc/2,S.arc/2,S.spin?48:28),slMat(line?0xffffff:S.col,S.core,line?S.col:S.edge));m.renderOrder=12;m.frustumCulled=false;m.userData.noBatch=true;m.userData.occEx=true;
  const g=new THREE.Group();g.add(m);o={g,m,busy:false};SL.pool[k]=o;return o;}
// удар: ленты в системе координат героя — дуга перед героем (+X группы — вперёд), наклон вокруг оси взгляда — мах наискосок.
// Наклон пологий (кроме «когтей» Потапа): игровая камера смотрит сверху-сзади, и крутая лента видна почти с ребра — тонкой чертой.
function slashFx(h){const S=SL_STYLE[h.kind];if(!S||!W||!W.group)return;const dir=(SL.flip[h.kind]=-(SL.flip[h.kind]||1));
  for(let i=0;i<S.n;i++){const o=slGet(h.kind,i);o.busy=true;const U=o.m.material.uniforms,line=S.lines&&i>0;
    U.uDir.value=S.spin?1:dir;U.uProg.value=0;U.uLen.value=S.spin?0.6:(line?0.45:0.85);U.uAlpha.value=line?0.8:1;
    o.g.position.set(h.pos.x,h.pos.y+h.d.height*(S.spin?0.4:0.6),h.pos.z);o.g.rotation.set(0,h.face-Math.PI/2,0);
    o.m.rotation.set(S.spin?(i?-1:1)*S.roll:dir*S.roll,0,0);o.m.position.set(S.spin?0:0.12,0,0);
    if(S.off){const nrm=new V3(0,1,0).applyEuler(o.m.rotation);o.m.position.addScaledVector(nrm,(i-(S.n-1)/2)*S.off);}
    if(!o.g.parent)W.group.add(o.g);SL.live.push({o,h,t:-i*S.lag*S.dur,dur:S.dur,S,i,sp:0});}
  if(S.dust&&FX.dust)FX.dust(h.pos.clone(),8,0xe8d8b8);}
function slTick(dt){for(let k=SL.live.length-1;k>=0;k--){const L=SL.live[k];L.t+=dt;const U=L.o.m.material.uniforms,S=L.S;
    if(L.t<0){U.uAlpha.value=0;continue;}const q=L.t/L.dur;U.uAlpha.value=(L.i&&S.lines?0.8:1)*(1-Math.max(0,q-1)*2.5);U.uProg.value=Math.min(1+U.uLen.value,q*(1+U.uLen.value));
    if(L.h){const h=L.h;L.o.g.position.x+=(h.pos.x-L.o.g.position.x)*0.5;L.o.g.position.z+=(h.pos.z-L.o.g.position.z)*0.5;}   // лента держится за героем
    // звёздочки с передней кромки
    L.sp-=dt;if(L.i===0&&q<1&&L.sp<=0&&FX.sparkle){L.sp=0.05;const S2=L.S,a=(U.uDir.value>0?-1:1)*(S2.arc/2)+(U.uDir.value>0?1:-1)*S2.arc*Math.min(1,q),r=(S2.r0+S2.r1)/2;
      const p=new V3(Math.cos(a)*r,0,Math.sin(a)*r).applyEuler(L.o.m.rotation).add(L.o.m.position).applyEuler(L.o.g.rotation).add(L.o.g.position);FX.sparkle(p,1,S2.spark);}
    if(q>1.4){L.o.busy=false;if(L.o.g.parent)L.o.g.parent.remove(L.o.g);SL.live.splice(k,1);}}
  for(let k=SL.stars.length-1;k>=0;k--){const s=SL.stars[k];s.t+=dt;const q=s.t/0.22;s.m.scale.setScalar(s.s*(0.35+Math.min(1,q*2.2)*0.85));s.m.material.opacity=Math.max(0,1-q*q);
    s.r.scale.setScalar(s.s*(0.4+q*1.6));s.r.material.opacity=Math.max(0,0.8*(1-q));const cam=occCam();if(cam){s.m.quaternion.copy(cam.quaternion);s.r.quaternion.copy(cam.quaternion);}
    if(q>=1){s.g.parent&&s.g.parent.remove(s.g);SL.stars.splice(k,1);}}}
const occCam=()=>G.split>0.5?cams[0]:camS;
// «бах» при попадании: звезда с лучами и кольцо, лицом к камере
const SL_STAR=(()=>{const s=new THREE.Shape(),n=8;for(let i=0;i<=n*2;i++){const a=i/(n*2)*Math.PI*2+Math.PI/2,r=i%2?0.22:0.55;const x=Math.cos(a)*r,y=Math.sin(a)*r;if(i)s.lineTo(x,y);else s.moveTo(x,y);}return new THREE.ShapeGeometry(s);})();
const SL_RING=new THREE.RingGeometry(0.42,0.56,24);
function slImpact(p,col){if(!W||!W.group)return;const g=new THREE.Group();g.position.copy(p);
  const m=new THREE.Mesh(SL_STAR,new THREE.MeshBasicMaterial({color:col,transparent:true,depthWrite:false,depthTest:false,fog:false,toneMapped:false}));m.renderOrder=13;
  const core=new THREE.Mesh(SL_STAR,new THREE.MeshBasicMaterial({color:0xfffbe8,transparent:true,depthWrite:false,depthTest:false,fog:false,toneMapped:false}));core.scale.setScalar(0.55);core.position.z=0.01;core.renderOrder=14;m.add(core);
  const r=new THREE.Mesh(SL_RING,new THREE.MeshBasicMaterial({color:0xffffff,transparent:true,depthWrite:false,depthTest:false,fog:false,toneMapped:false,side:THREE.DoubleSide}));r.renderOrder=13;
  g.add(m);g.add(r);g.userData.noBatch=true;g.userData.occEx=true;W.group.add(g);SL.stars.push({g,m,r,t:0,s:0.8+Math.random()*0.3});
  core.material.opacity=1;if(FX.sparks)FX.sparks(p,8,col);if(FX.stars)FX.stars(p,4,0xfff2b0);}
// начало удара: atkT вырос; попадание: enemyHit
{const _anim=animHero;animHero=function(h,dt){const was=h._slA||0;_anim(h,dt);if(h.arc)h.arc.visible=false;   // старый плоский сектор — выключен
  if(h.atkT>was+0.05&&h.atkT>=0.18)slashFx(h);h._slA=h.atkT;};}
{const _eh=enemyHit;enemyHit=function(e,h){const r=_eh.apply(this,arguments);try{if(h&&SL_STYLE[h.kind]&&e&&e.pos){const p=e.pos.clone().lerp(h.pos,0.35);p.y=(e.pos.y+h.pos.y)/2+Math.max(0.7,(e.r||0.6)*1.1);slImpact(p,SL_STYLE[h.kind].col);}}catch(err){}return r;};}
{const _step=step;step=function(dt){_step(dt);try{slTick(dt);}catch(e){console.error('slash',e);}};}
{const _ll=loadLevel;loadLevel=function(i){for(const L of SL.live){L.o.busy=false;}SL.live.length=0;SL.stars.length=0;_ll(i);};}
