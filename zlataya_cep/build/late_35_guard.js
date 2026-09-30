/* ============================== РЕЛИЗ final06 · ЩИТ (B): у каждого героя свой щит ============================== */
// Раньше щит был плоским полупрозрачным кругом цвета игрока перед героем: игровая камера смотрит сзади-сверху, и его почти целиком
// закрывало тело героя. Потом — изогнутым барьером больше героя, но он читался как «энергетическое поле», а не щит.
// Теперь у Прошки, Потапа и Пелагеи — круглый волшебный щит в лапах (выпуклый, с кромкой и умбоном посередине). По кнопке он
// РАЗВОРАЧИВАЕТСЯ: из лапы веером снизу вверх, с поворотом и «пружинкой», по краю раскрытия бегут искры; отпустил — складывается.
// Щит держат перед собой в правой лапе, чуть сбоку и развернув наружу: со спины он виден целиком, а не прячется за героем. Узор — почерк героя, как у ударов (late_34_slash):
//   Прошка — латунная шестерёнка, зубцы по кромке, спицы, внутреннее колесо крутится; Потап — медовые соты, самый большой щит;
//   Пелагея — веер перьев. Йоша — прежний купол из иголок: ёжик сворачивается клубком.
// По краю — тёмный контур и светлая кромка (читается и на ярком, и на тёмном), яркость — по запасу сил (сил мало — мерцает).
// Блок — волна по щиту от умбона, щит вздрагивает, искры; отбив в последний миг — золотая вспышка и звёзды. Механика защиты не меняется.
const GD_VS='varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}';
const GD_FS=`uniform float uT;uniform float uA;uniform float uHit;uniform float uPerf;uniform float uSp;uniform float uKind;uniform float uWrap;
uniform vec3 uCol;uniform vec3 uCore;uniform vec3 uEdge;varying vec2 vUv;
float hexD(vec2 p){p=abs(p);return max(dot(p,vec2(0.5,0.8660254)),p.x);}
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){vec2 uv=vUv;float fill=0.0,line=0.0;
  if(uKind<0.5){ // Прошка: шестерёнки
    vec2 g=vec2(uv.x*7.0,uv.y*3.2);vec2 id=floor(g);vec2 f=fract(g)-0.5;float s=mod(id.x+id.y,2.0)*2.0-1.0;
    float a=atan(f.y,f.x)+s*uT*1.6;float r=length(f);float tooth=0.34+0.07*smoothstep(-0.2,0.2,sin(a*8.0));
    fill=step(r,tooth)*(1.0-step(r,0.1))*0.95;line=smoothstep(0.06,0.0,abs(r-tooth))+smoothstep(0.03,0.0,abs(r-0.1))+step(r,tooth)*smoothstep(0.025,0.0,abs(sin(a*3.0))*r)*0.8;
  }else if(uKind<1.5){ // Потап: медовые соты
    vec2 p=vec2(uv.x*11.0,uv.y*4.4);vec2 R=vec2(1.0,1.7320508);vec2 a=mod(p,R)-R*0.5;vec2 b=mod(p-R*0.5,R)-R*0.5;vec2 gv=dot(a,a)<dot(b,b)?a:b;
    float e=0.5-hexD(gv);vec2 id=p-gv;float h=hash(floor(id*10.0));float glow=step(0.82,h)*(0.5+0.5*sin(uT*3.0+h*20.0));
    fill=0.35+0.45*glow;line=smoothstep(0.07,0.0,e);
  }else if(uKind<2.5){ // Пелагея: перья
    vec2 g=vec2(uv.x*9.0,uv.y*5.0);g.x+=mod(floor(g.y),2.0)*0.5;vec2 c=vec2(fract(g.x)-0.5,fract(g.y));float d=length(c*vec2(1.0,0.85));
    fill=(1.0-smoothstep(0.5,0.53,d))*(0.7+0.5*c.y);line=smoothstep(0.07,0.0,abs(d-0.5))*step(0.0,c.y)+smoothstep(0.02,0.0,abs(c.x))*(1.0-step(0.5,d))*0.7;
  }else{ // Йоша: иголки
    vec2 g=vec2(uv.x*22.0,uv.y*5.0);g.x+=mod(floor(g.y),2.0)*0.5;vec2 c=vec2(fract(g.x)-0.5,fract(g.y));float w=0.42*(1.0-c.y);
    float tri=step(abs(c.x),w);fill=tri*(0.45+0.35*c.y);line=smoothstep(0.05,0.0,abs(abs(c.x)-w))*step(0.02,1.0-c.y)+smoothstep(0.06,0.0,1.0-c.y)*step(abs(c.x),0.08);
  }
  // край барьера: светлая кромка и тёмный контур снаружи; у купола Йоши боковых краёв нет
  float bx=uWrap>0.5?1.0:min(uv.x,1.0-uv.x)*14.0,by=min(uv.y*9.0,(1.0-uv.y)*14.0),b=min(bx,by);
  float rim=1.0-smoothstep(0.15,0.75,b),outl=1.0-smoothstep(0.0,0.2,b);
  vec3 c=mix(uCol,uCore,clamp(line,0.0,1.0)*(uKind>1.5&&uKind<2.5?0.55:1.0));c=mix(c,uCore,rim*0.8);c=mix(c,uEdge,outl);
  float a=clamp(fill*0.55+line*0.95+rim*0.9,0.0,1.0);
  // волна при блоке и вспышка при отбиве
  float d=distance(uv,vec2(0.5,0.45));float wave=uHit*smoothstep(0.1,0.0,abs(d-(1.0-uHit)*0.85));c=mix(c,vec3(1.0),wave*0.9);a=max(a,wave);
  c=mix(c,vec3(1.0,0.9,0.45),uPerf*0.75);a=max(a,uPerf*0.8*(0.5+fill));
  float sp=uSp<0.25?0.6+0.4*sin(uT*28.0):1.0;a*=uA*(0.5+0.5*uSp)*sp;if(a<0.015)discard;gl_FragColor=vec4(c,a);}`;
// купол Йоши: радиус, дуга по горизонтали (рад), высота центра, верх и низ дуги (доли π), почерк шейдера
const GD_DOME={yosha:{kind:3,R:0.62,arc:Math.PI*2,y:0.26,th0:0.0,th1:0.64,col:0x4ad8c0,core:0xe6fff8,edge:0x0e5048,spark:0xb8fff0,wrap:true}};
// круглые щиты: R — радиус, y — высота центра, fwd — вынос вперёд, side — к правой лапе (минус — вправо от героя), yaw — разворот
// наружу (щит смотрит вперёд-вправо и со спины виден целиком, а не прячется за героем), tilt — наклон назад (смотрит чуть вверх)
const GD_ROUND={
  proshka:{kind:0,R:0.5,y:0.74,fwd:0.36,side:-0.42,yaw:-0.5,tilt:0.16,col:0xd8872c,col2:0x8a4a18,core:0xfff0c0,edge:0x4e1e06,rim:0xffc860,boss:0xff9a3a,spark:0xffd27a},
  potap:{kind:1,R:0.72,y:1.0,fwd:0.44,side:-0.62,yaw:-0.5,tilt:0.14,col:0xffb428,col2:0xc86a10,core:0xfff6c8,edge:0x5e3208,rim:0xffd86a,boss:0xffe08a,spark:0xffe29a},
  pelageya:{kind:2,R:0.52,y:0.7,fwd:0.36,side:-0.46,yaw:-0.5,tilt:0.16,col:0xa070f0,col2:0x5e3aa8,core:0xfff0ff,edge:0x2e1656,rim:0xe8d0ff,boss:0xffffff,spark:0xe8d0ff}};
const GD_STYLE=Object.assign({},GD_DOME,GD_ROUND);
// шейдер круглого щита: всё — в плоскости щита (x вправо, y вверх, щит смотрит в +z); uOpen — насколько раскрыт веер
const GR_VS=`uniform float uR;varying vec3 vP;varying vec3 vN;varying vec3 vV;
void main(){vP=position/uR;vN=normalize(normalMatrix*normal);vec4 mv=modelViewMatrix*vec4(position,1.0);vV=normalize(-mv.xyz);gl_Position=projectionMatrix*mv;}`;
const GR_FS=`uniform float uT;uniform float uA;uniform float uOpen;uniform float uHit;uniform float uPerf;uniform float uSp;uniform float uKind;uniform float uPart;
uniform vec3 uCol;uniform vec3 uCol2;uniform vec3 uCore;uniform vec3 uEdge;uniform vec3 uRim;uniform vec3 uBoss;varying vec3 vP;varying vec3 vN;varying vec3 vV;
float hexD(vec2 p){p=abs(p);return max(dot(p,vec2(0.5,0.8660254)),p.x);}
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
void main(){
  vec3 N=normalize(gl_FrontFacing?vN:-vN);   // изнанка светится так же, как лицо: со спины героя видна именно она
  vec2 p=vP.xy;float r=length(p);float a=atan(p.x,-p.y);float aa=abs(a)/3.14159265;   // 0 — снизу, у лапы; 1 — сверху
  // веер: раскрывается от лапы вверх по обе стороны; кромка раскрытия светится
  float op=uOpen*1.08;float vis=1.0-smoothstep(op-0.03,op,aa);if(vis<0.01)discard;
  float sweep=(1.0-smoothstep(0.0,0.07,abs(aa-op+0.02)))*step(uOpen,0.985);
  vec3 c;float al;
  if(uPart<0.5){ // полотно щита
    float fill=0.0,line=0.0;
    if(uKind<0.5){ // Прошка: шестерёнка — спицы, внутреннее колесо крутится, зубцы у кромки
      float ra=atan(p.y,p.x);float spk=smoothstep(0.06,0.0,abs(sin((ra+uT*0.6)*3.0))*r)*step(0.2,r)*step(r,0.8);
      float rr=atan(p.y,p.x)-uT*1.4;float tooth=0.42+0.05*smoothstep(-0.3,0.3,sin(rr*10.0));float ring=smoothstep(0.035,0.0,abs(r-tooth))+smoothstep(0.03,0.0,abs(r-0.3));
      float inner=step(r,tooth)*(1.0-step(r,0.3));fill=0.55+0.25*inner;line=ring+spk*0.9+smoothstep(0.03,0.0,abs(r-0.86));
    }else if(uKind<1.5){ // Потап: медовые соты
      vec2 q=p*4.2;vec2 R=vec2(1.0,1.7320508);vec2 h1=mod(q,R)-R*0.5;vec2 h2=mod(q-R*0.5,R)-R*0.5;vec2 gv=dot(h1,h1)<dot(h2,h2)?h1:h2;
      float e=0.5-hexD(gv);vec2 id=q-gv;float hh=hash(floor(id*10.0+0.5));float glow=step(0.72,hh)*(0.5+0.5*sin(uT*2.6+hh*20.0));
      fill=0.62+0.2*hh+0.35*glow;line=smoothstep(0.08,0.0,e);
    }else{ // Пелагея: веер перьев
      float n=12.0;float sa=(a/6.2831853+0.5)*n;float k=fract(sa)-0.5;float w=0.42*sin(clamp(r,0.0,1.0)*3.14159*0.95+0.1);
      float fe=step(abs(k),w);fill=fe*(0.5+0.45*r);line=smoothstep(0.06,0.0,abs(abs(k)-w))*step(0.18,r)+smoothstep(0.035,0.0,abs(k))*step(0.15,r)*0.8
        +smoothstep(0.05,0.0,abs(fract(r*7.0+abs(k)*1.5)-0.5)*abs(k)*2.0)*fe*0.35;
    }
    c=mix(uCol2,uCol,clamp(0.35+0.65*fill,0.0,1.0));c=mix(c,uCore,clamp(line,0.0,1.0)*0.85);
    // выпуклость и блик: щит — не плоское пятно, а круглая пластина
    float lit=0.8+0.3*max(0.0,dot(N,normalize(vec3(-0.35,0.65,0.7))));float fr=pow(1.0-abs(dot(N,normalize(vV))),2.0);
    c*=lit;c+=uCore*fr*0.25;float rim=smoothstep(0.8,0.98,r);c=mix(c,uRim,rim*0.7);
    al=0.84+0.16*line;
  }else if(uPart<1.5){ // кромка: золотой обод, тёмный контур по внешнему краю
    float ou=smoothstep(0.96,1.1,r);c=mix(uRim,uEdge,ou*0.85);float lit=0.8+0.4*max(0.0,dot(N,normalize(vec3(-0.3,0.7,0.6))));c*=lit;
    c+=uCore*0.35*pow(max(0.0,dot(N,normalize(vV))),8.0);al=1.0;
  }else if(uPart<2.5){ // умбон
    float lit=0.7+0.5*max(0.0,dot(normalize(vN),normalize(vec3(-0.3,0.7,0.6))));c=uBoss*lit+uCore*0.5*pow(max(0.0,dot(normalize(vN),normalize(vV))),12.0);
    c=mix(c,vec3(1.0),0.25*(0.5+0.5*sin(uT*3.0)));al=1.0;
  }else{ // волшебное свечение вокруг обода (складывается с фоном)
    float g=(1.0-smoothstep(1.02,1.4,r))*smoothstep(0.95,1.04,r);c=mix(uRim,uCore,0.35)*(0.8+0.2*sin(uT*4.0+a*3.0));al=g*0.55;
  }
  // кромка раскрытия — светлая искрящаяся полоса
  c=mix(c,uCore,sweep*0.9);c+=vec3(1.0,0.95,0.7)*sweep*0.35;
  // волна от умбона при блоке и вспышка при отбиве
  float wave=uHit*smoothstep(0.09,0.0,abs(r-(1.0-uHit)*1.05));c=mix(c,vec3(1.0),wave*0.85);
  c=mix(c,vec3(1.0,0.9,0.45),uPerf*0.6);
  float sp=uSp<0.25?0.6+0.4*sin(uT*28.0):1.0;al*=uA*vis*(0.55+0.45*uSp)*sp;if(al<0.015)discard;gl_FragColor=vec4(c,al);}`;
const GDV={list:new Map()};
function grMat(S){return new THREE.ShaderMaterial({uniforms:{uT:{value:0},uA:{value:0},uOpen:{value:0},uHit:{value:0},uPerf:{value:0},uSp:{value:1},uKind:{value:S.kind},uPart:{value:0},uR:{value:S.R},
    uCol:{value:new THREE.Color(S.col)},uCol2:{value:new THREE.Color(S.col2)},uCore:{value:new THREE.Color(S.core)},uEdge:{value:new THREE.Color(S.edge)},uRim:{value:new THREE.Color(S.rim)},uBoss:{value:new THREE.Color(S.boss)}},
  vertexShader:GR_VS,fragmentShader:GR_FS,transparent:true,depthWrite:false,side:THREE.DoubleSide,fog:false,toneMapped:false});}
// круглый щит: выпуклое полотно (шаровой сегмент), обод-тор, умбон и свечение вокруг обода; всё строится сразу в плоскости щита
function grMake(h,S){const R=S.R,th=0.5,Rs=R/Math.sin(th),bul=Rs*(1-Math.cos(th));
  const cap=new THREE.SphereGeometry(Rs,40,8,0,Math.PI*2,0,th);cap.rotateX(Math.PI/2);cap.translate(0,0,-Rs*Math.cos(th));
  const rim=new THREE.TorusGeometry(R,R*0.075,8,64);const boss=new THREE.SphereGeometry(R*0.15,16,8,0,Math.PI*2,0,Math.PI/2);boss.rotateX(Math.PI/2);boss.translate(0,0,bul*0.85);
  const g=new THREE.Group();g.visible=false;g.renderOrder=11;const U=grMat(S);const parts=[];
  const glow=new THREE.RingGeometry(R*0.96,R*1.42,64,1);glow.translate(0,0,-0.02);
  [[cap,0],[rim,1],[boss,2],[glow,3]].forEach(([geo,k])=>{const mt=k===0?U:U.clone();mt.uniforms=THREE.UniformsUtils.clone(U.uniforms);mt.uniforms.uPart.value=k;if(k===3)mt.blending=THREE.AdditiveBlending;
    const m=new THREE.Mesh(geo,mt);m.renderOrder=11+k;m.frustumCulled=false;m.userData.noBatch=true;m.userData.occEx=true;g.add(m);parts.push(m);});
  g.userData.noBatch=true;g.userData.occEx=true;h.g.add(g);return {g,parts};}
function gdMake(h){const S=GD_STYLE[h.kind];if(!S||!h.g)return null;
  if(!S.wrap){const {g,parts}=grMake(h,S);const o={h,m:g,parts,S,round:true,a:0,open:0,pop:0,hit:0,perf:0,on:false,burst:false};GDV.list.set(h,o);return o;}
  const geo=new THREE.SphereGeometry(S.R,36,14,0,S.arc,Math.PI*S.th0,Math.PI*(S.th1-S.th0));
  const mat=new THREE.ShaderMaterial({uniforms:{uT:{value:0},uA:{value:0},uHit:{value:0},uPerf:{value:0},uSp:{value:1},uKind:{value:S.kind},uWrap:{value:1},
      uCol:{value:new THREE.Color(S.col)},uCore:{value:new THREE.Color(S.core)},uEdge:{value:new THREE.Color(S.edge)}},
    vertexShader:GD_VS,fragmentShader:GD_FS,transparent:true,depthWrite:false,side:THREE.DoubleSide,fog:false,toneMapped:false});
  const m=new THREE.Mesh(geo,mat);m.position.set(0,S.y,0);m.renderOrder=11;m.visible=false;m.frustumCulled=false;m.userData.noBatch=true;m.userData.occEx=true;
  h.g.add(m);const o={h,m,S,a:0,pop:0,hit:0,perf:0,on:false};GDV.list.set(h,o);return o;}
const gdGet=h=>GDV.list.get(h)||gdMake(h);
const gdEase=q=>{const c=1.9;return 1+(c+1)*Math.pow(q-1,3)+c*Math.pow(q-1,2);};   // «пружинка» с перелётом
function grTick(o,h,want,dt){const S=o.S;if(want&&!o.on){o.burst=false;}o.on=want;
  o.a=Math.max(0,Math.min(1,o.a+(want?dt/0.06:-dt/0.16)));o.open=Math.max(0,Math.min(1,o.open+(want?dt/0.24:-dt/0.14)));
  o.hit=Math.max(0,o.hit-dt/0.35);o.perf=Math.max(0,o.perf-dt/0.45);
  const vis=o.open>0.01||o.hit>0.01;o.m.visible=vis;if(!vis)return;
  const q=o.open,e=want?gdEase(q):q*q*(3-2*q);
  // из лапы — вперёд и в сторону, с поворотом «развёртывания»; блок чуть вдавливает щит к герою
  const k=0.45+0.55*e;o.m.scale.setScalar(k*(1-o.hit*0.05)+o.perf*0.06);
  o.m.position.set(S.side*(0.5+0.5*e),S.y-(1-e)*0.2,S.fwd*(0.5+0.5*e)-o.hit*0.08);
  o.m.rotation.set(-S.tilt,S.yaw*e,(1-e)*(want?1.1:-0.6),'YXZ');
  if(want&&q>0.92&&!o.burst){o.burst=true;try{if(FX.sparks)FX.sparks(gdFront(o),6,S.spark);}catch(err){}}
  const p=players[h.player],sp=p?Math.max(0,Math.min(1,p.spirit)):1;
  for(const m of o.parts){const U=m.material.uniforms;U.uT.value=G.time;U.uA.value=Math.max(o.a,o.hit*0.8);U.uOpen.value=Math.max(o.open,o.hit>0.01?1:0);U.uHit.value=o.hit;U.uPerf.value=o.perf;U.uSp.value=sp;}}
function gdTick(h,dt){const o=gdGet(h);if(!o)return;if(o.m.parent!==h.g&&h.g)h.g.add(o.m);
  const want=!!(h.guard&&h.active)||h._demoGuard>G.time;if(h.shield)h.shield.visible=false;   // старый плоский круг — выключен
  if(o.round){grTick(o,h,want,dt);return;}
  if(want&&!o.on){o.pop=0;}o.on=want;o.a=Math.max(0,Math.min(1,o.a+(want?dt/0.08:-dt/0.12)));o.pop=Math.min(1,o.pop+dt/0.16);
  o.hit=Math.max(0,o.hit-dt/0.35);o.perf=Math.max(0,o.perf-dt/0.45);
  const vis=o.a>0.01||o.hit>0.01;o.m.visible=vis;if(!vis)return;
  // «пружинка»: 0.55 → 1.08 → 1; удар по щиту чуть вдавливает его
  const q=o.pop,ease=q<1?1+0.08*Math.sin(q*Math.PI)-(1-q)*(1-q)*0.45:1,s=(want?ease:0.9+0.1*o.a)*(1-o.hit*0.06)+o.perf*0.08;o.m.scale.setScalar(s);
  o.m.rotation.y+=dt*(0.6+o.hit*6);
  const U=o.m.material.uniforms,p=players[h.player];U.uT.value=G.time;U.uA.value=o.a;U.uHit.value=o.hit;U.uPerf.value=o.perf;U.uSp.value=p?Math.max(0,Math.min(1,p.spirit)):1;}
function gdFront(o){const h=o.h;if(o.round){o.m.updateMatrixWorld(true);return new V3(0,0,o.S.R*0.3).applyMatrix4(o.m.matrixWorld);}
  return new V3(Math.sin(h.face)*o.S.R*0.8,o.S.y+(h.pos.y||0),Math.cos(h.face)*o.S.R*0.8).add(new V3(h.pos.x,0,h.pos.z));}
function gdHit(h,perfect){const o=gdGet(h);if(!o)return;o.a=Math.max(o.a,0.9);if(o.round)o.open=Math.max(o.open,0.9);if(perfect){o.perf=1;o.hit=1;}else o.hit=1;
  try{const p=gdFront(o);if(FX.sparks)FX.sparks(p,perfect?14:8,perfect?0xffe36b:o.S.spark);if(perfect&&FX.stars)FX.stars(p,6,0xfff2b0);}catch(e){}}
FIN.guard={visible:h=>{const o=GDV.list.get(h);return !!(o&&o.m.visible&&o.a>0.5&&(!o.round||o.open>0.5));},open:h=>{const o=GDV.list.get(h);return o&&o.round?o.open:null;},hit:gdHit,hitT:h=>{const o=GDV.list.get(h);return o?o.hit:0;},list:GDV.list};
{const _anim=animHero;animHero=function(h,dt){_anim(h,dt);try{gdTick(h,dt||0);}catch(e){console.error('guard',e);}};}
{const _sb=shieldBlock;shieldBlock=function(h){const r=_sb.apply(this,arguments);gdHit(h,false);return r;};}
{const _pf=parryFoe;parryFoe=function(e,h){const r=_pf.apply(this,arguments);gdHit(h,true);return r;};}
// отбитая в последний миг капля (без отдельной функции в прототипе) — по звуку отбива: вспыхивают поднятые щиты
{const _sp=SFX.parry;SFX.parry=function(){const r=_sp.apply(this,arguments);try{for(const h of HEROES_ALL())if(h.guard&&h.active){const o=GDV.list.get(h);if(o&&o.perf<0.5)gdHit(h,true);}}catch(e){}return r;};}
function HEROES_ALL(){const r=[];for(const p of players)for(const h of p.heroes)r.push(h);return r;}
{const _ll=loadLevel;loadLevel=function(i){_ll(i);for(const o of GDV.list.values()){o.a=0;o.open=0;o.hit=0;o.perf=0;o.on=false;o.m.visible=false;}};}
