/* ============================== РЕЛИЗ final06 · ЩИТ (B): у каждого героя свой барьер ============================== */
// Раньше щит был плоским полупрозрачным кругом цвета игрока перед героем. Игровая камера смотрит сзади-сверху, и круг почти целиком
// закрывало тело героя — щит было не разглядеть. Теперь щит — изогнутый барьер больше героя: он обнимает героя спереди и с боков,
// и из-за спины видна его «корона». Узор — почерк героя, как у ударов (late_34_slash):
//   Прошка — латунные шестерёнки, крутятся в разные стороны; Потап — медовые соты, самый широкий щит (закрывает и тех, кто за ним);
//   Пелагея — перья, щит как сложенные вперёд крылья; Йоша — купол из иголок: ёжик сворачивается клубком.
// Появляется с «пружинкой», по краю — тёмный контур и светлая кромка (читается и на ярком, и на тёмном), яркость — по запасу сил
// (сил мало — мерцает). Блок — волна по щиту и искры; отбив в последний миг — золотая вспышка и звёзды. Механика защиты не меняется.
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
// форма и цвет: радиус, дуга по горизонтали (рад), высота центра, верх и низ дуги (доли π), почерк шейдера
const GD_STYLE={
  proshka:{kind:0,R:0.95,arc:2.4,y:0.6,th0:0.14,th1:0.72,col:0xff8a28,core:0xfff0c0,edge:0x6e2a08,spark:0xffd27a},
  potap:{kind:1,R:1.38,arc:3.35,y:0.82,th0:0.12,th1:0.72,col:0xffb428,core:0xfff6c8,edge:0x5e3208,spark:0xffe29a},
  pelageya:{kind:2,R:1.02,arc:2.9,y:0.58,th0:0.1,th1:0.74,col:0xa070f0,core:0xfff0ff,edge:0x40206e,spark:0xe8d0ff},
  yosha:{kind:3,R:0.62,arc:Math.PI*2,y:0.26,th0:0.0,th1:0.64,col:0x4ad8c0,core:0xe6fff8,edge:0x0e5048,spark:0xb8fff0,wrap:true}};
const GDV={list:new Map()};
function gdMake(h){const S=GD_STYLE[h.kind];if(!S||!h.g)return null;
  const geo=new THREE.SphereGeometry(S.R,S.wrap?36:28,14,S.wrap?0:Math.PI/2-S.arc/2,S.arc,Math.PI*S.th0,Math.PI*(S.th1-S.th0));
  const mat=new THREE.ShaderMaterial({uniforms:{uT:{value:0},uA:{value:0},uHit:{value:0},uPerf:{value:0},uSp:{value:1},uKind:{value:S.kind},uWrap:{value:S.wrap?1:0},
      uCol:{value:new THREE.Color(S.col)},uCore:{value:new THREE.Color(S.core)},uEdge:{value:new THREE.Color(S.edge)}},
    vertexShader:GD_VS,fragmentShader:GD_FS,transparent:true,depthWrite:false,side:THREE.DoubleSide,fog:false,toneMapped:false});
  const m=new THREE.Mesh(geo,mat);m.position.set(0,S.y,0);m.renderOrder=11;m.visible=false;m.frustumCulled=false;m.userData.noBatch=true;m.userData.occEx=true;
  h.g.add(m);const o={h,m,S,a:0,pop:0,hit:0,perf:0,on:false};GDV.list.set(h,o);return o;}
const gdGet=h=>GDV.list.get(h)||gdMake(h);
function gdTick(h,dt){const o=gdGet(h);if(!o)return;if(o.m.parent!==h.g&&h.g)h.g.add(o.m);
  const want=!!(h.guard&&h.active)||h._demoGuard>G.time;if(h.shield)h.shield.visible=false;   // старый плоский круг — выключен
  if(want&&!o.on){o.pop=0;}o.on=want;o.a=Math.max(0,Math.min(1,o.a+(want?dt/0.08:-dt/0.12)));o.pop=Math.min(1,o.pop+dt/0.16);
  o.hit=Math.max(0,o.hit-dt/0.35);o.perf=Math.max(0,o.perf-dt/0.45);
  const vis=o.a>0.01||o.hit>0.01;o.m.visible=vis;if(!vis)return;
  // «пружинка»: 0.55 → 1.08 → 1; удар по щиту чуть вдавливает его
  const q=o.pop,ease=q<1?1+0.08*Math.sin(q*Math.PI)-(1-q)*(1-q)*0.45:1,s=(want?ease:0.9+0.1*o.a)*(1-o.hit*0.06)+o.perf*0.08;o.m.scale.setScalar(s);
  if(o.S.wrap)o.m.rotation.y+=dt*(0.6+o.hit*6);
  const U=o.m.material.uniforms,p=players[h.player];U.uT.value=G.time;U.uA.value=o.a;U.uHit.value=o.hit;U.uPerf.value=o.perf;U.uSp.value=p?Math.max(0,Math.min(1,p.spirit)):1;}
function gdFront(o){const h=o.h;return new V3(Math.sin(h.face)*o.S.R*0.8,o.S.y+(h.pos.y||0),Math.cos(h.face)*o.S.R*0.8).add(new V3(h.pos.x,0,h.pos.z));}
function gdHit(h,perfect){const o=gdGet(h);if(!o)return;o.a=Math.max(o.a,0.9);if(perfect){o.perf=1;o.hit=1;}else o.hit=1;
  try{const p=gdFront(o);if(FX.sparks)FX.sparks(p,perfect?14:8,perfect?0xffe36b:o.S.spark);if(perfect&&FX.stars)FX.stars(p,6,0xfff2b0);}catch(e){}}
FIN.guard={visible:h=>{const o=GDV.list.get(h);return !!(o&&o.m.visible&&o.a>0.5);},hit:gdHit,hitT:h=>{const o=GDV.list.get(h);return o?o.hit:0;},list:GDV.list};
{const _anim=animHero;animHero=function(h,dt){_anim(h,dt);try{gdTick(h,dt||0);}catch(e){console.error('guard',e);}};}
{const _sb=shieldBlock;shieldBlock=function(h){const r=_sb.apply(this,arguments);gdHit(h,false);return r;};}
{const _pf=parryFoe;parryFoe=function(e,h){const r=_pf.apply(this,arguments);gdHit(h,true);return r;};}
// отбитая в последний миг капля (без отдельной функции в прототипе) — по звуку отбива: вспыхивают поднятые щиты
{const _sp=SFX.parry;SFX.parry=function(){const r=_sp.apply(this,arguments);try{for(const h of HEROES_ALL())if(h.guard&&h.active){const o=GDV.list.get(h);if(o&&o.perf<0.5)gdHit(h,true);}}catch(e){}return r;};}
function HEROES_ALL(){const r=[];for(const p of players)for(const h of p.heroes)r.push(h);return r;}
{const _ll=loadLevel;loadLevel=function(i){_ll(i);for(const o of GDV.list.values()){o.a=0;o.hit=0;o.perf=0;o.on=false;o.m.visible=false;}};}
