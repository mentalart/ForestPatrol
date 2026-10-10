/* ============================== РЕЛИЗ · СМЕРТЬ МОРОКОВ: «распутывание» ============================== */
// Прототип убивает морока линейным сжатием всей группы в точку за 0,6 с (+ вращение): одинаково для всех видов. Здесь вместо этого:
//  • вдох (0,1 с): тело вытягивается, глаза зажмурены; у больших (e.big) — 0,32 с дрожи, свечение и искры «из трещин»;
//  • хлопок: меши морока нарезаются на low-poly осколки (по сетке вокруг центра, геометрия запекается в систему мира), осколки
//    разлетаются, прыгают по полу и по очереди сжимаются (масштабом с лёгким перелётом — материалы общие, прозрачность не трогаем);
//  • «семейство» по def.look: нитяные — кольца нити взлетают винтом; водные — брызги и круги; лесные — листья и щепки;
//    огненные — угольки и зола; светлые (тень, тучка, мотылёк) — рассыпаются в искры и плывут вверх;
//  • большой враг: стоп-кадр на хлопке, два кольца, тряска.
// Тело при смерти больше не копит приседание от удара (late_91b: body.scale.multiply — в dying прототип не сбрасывал body.scale,
// и на 144 Гц враг «расплющивался»): здесь масштаб тела задаётся заново каждый кадр.
// Хуки: unravel (обёртка — оригинал вызывается первым, onDeath уровней работают как раньше), updateFoe (после оригинала), step (осколки).
// Особые смерти уровней (жар-ящерка падает в огонь, ролики 2-1/3-1 удаляют врага сами) не затрагиваются: работаем только по unravel.
const DTH={on:true,sh:[],loops:[],stats:{deaths:0,pops:0,shards:0,ms:0,maxMs:0}};FIN.deathFx=DTH;
const DTH_FAM={ball:'thread',tat:'thread',vorona:'thread',pugalo:'thread',dvoynik:'thread',hameley:'thread',cep:'thread',
  pike:'water',crab:'water',tina:'water',tyagun:'water',puff:'water',vod:'water',
  kiki:'forest',leshonok:'forest',stump:'forest',hand:'forest',leshyBoss:'forest',
  bolvan:'fire',pechnik:'fire',snake:'fire',lizard:'fire',golova:'fire',
  ten:'light',tucha:'light',motylek:'light',solovei:'light'};
// out/up — скорость разлёта, g — тяжесть (минус — всплывают), fade — секунд до сжатия, life — секунд всего, swirl — закрутка, drag — вязкость
const DTH_SPEC={base:{out:3,up:4.2,g:15,bounce:0.35,life:0.95,fade:0.55,spin:9,swirl:0,drag:0},
  thread:{out:2.4,up:4.8,g:7,bounce:0.2,life:1.05,fade:0.5,spin:12,swirl:5,drag:0.5},
  water:{out:3.2,up:3.6,g:17,bounce:0.12,life:0.8,fade:0.4,spin:7,swirl:0,drag:0},
  fire:{out:2.8,up:4.4,g:12,bounce:0.3,life:1.1,fade:0.65,spin:8,swirl:0,drag:0},
  light:{out:1.6,up:2.2,g:-0.8,bounce:0,life:1.0,fade:0.35,spin:3,swirl:1.5,drag:1.4,float:true}};
const DTH_FLASH={thread:0xffffff,water:0xbfeaff,forest:0xe8ffc0,fire:0xffc070,light:0xfff4d0};
const dthQ=()=>FIN.set&&FIN.set.quality==='low'?14:FIN.set&&FIN.set.quality==='mid'?20:28;
const dthBack=k=>k*k*(2.70158*k-1.70158);
const dthOut=u=>1-(1-u)*(1-u);
const DTH_M=new THREE.Matrix4(),DTH_INV=new THREE.Matrix4(),DTH_V=new V3();

// меши, которые рассыпаются: видимые, не метки (знаки, угольки, ободки), не прозрачные; есть скин — null
function dthCollect(e){
  const skip=new Set([e.S&&e.S.sig,e.spin,e.br,e.satRim]);if(e.embersM)for(const m of e.embersM)skip.add(m.m);
  const out=[];let skinned=false;
  e.g.traverse(o=>{
    if(!o.isMesh)return;
    for(let p=o;p&&p!==W.group;p=p.parent){if(p.visible===false||skip.has(p))return;}
    if(o.isSkinnedMesh){skinned=true;return;}
    const mt=o.material,g=o.geometry;
    if(!mt||Array.isArray(mt)||mt.isMeshBasicMaterial||(mt.transparent&&mt.opacity<0.95))return;
    if(!g||!g.attributes||!g.attributes.position)return;
    out.push(o);});
  return skinned?null:out;}   // с костями (Соловей, Двойник) не рассыпаем — запасной путь

// нарезка: все треугольники делятся по ячейкам сетки с центром в c; ячейка растёт, пока кусков не станет ≤ maxN
function dthSlice(meshes,cell0,maxN,c){
  W.group.updateMatrixWorld(true);DTH_INV.copy(W.group.matrixWorld).invert();
  const src=[];
  for(const m of meshes){
    let g=m.geometry,tmp=false;if(g.index){g=g.toNonIndexed();tmp=true;}
    const P=g.attributes.position,n=P.count,tn=(n/3)|0;
    if(tn<1||(g.attributes.color&&g.attributes.color.isInterleavedBufferAttribute)){if(tmp)g.dispose();continue;}
    DTH_M.multiplyMatrices(DTH_INV,m.matrixWorld);
    const X=new Float32Array(n*3),CX=new Float32Array(tn),CY=new Float32Array(tn),CZ=new Float32Array(tn);
    for(let i=0;i<n;i++){DTH_V.fromBufferAttribute(P,i).applyMatrix4(DTH_M);X[i*3]=DTH_V.x;X[i*3+1]=DTH_V.y;X[i*3+2]=DTH_V.z;}
    for(let t=0;t<tn;t++){const a=t*9;CX[t]=(X[a]+X[a+3]+X[a+6])/3;CY[t]=(X[a+1]+X[a+4]+X[a+7])/3;CZ[t]=(X[a+2]+X[a+5]+X[a+8])/3;}
    src.push({m,g,tmp,tn,X,CX,CY,CZ,flip:DTH_M.determinant()<0});}
  const cl=v=>Math.max(0,Math.min(1023,v+512));
  const key=(s,t,cell)=>(cl(Math.round((s.CX[t]-c.x)/cell))*1024+cl(Math.round((s.CY[t]-c.y)/cell)))*1024+cl(Math.round((s.CZ[t]-c.z)/cell));
  let cell=cell0;
  for(let a=0;a<6;a++){let total=0;for(const s of src){const set=new Set();for(let t=0;t<s.tn;t++)set.add(key(s,t,cell));total+=set.size;}if(total<=maxN)break;cell*=1.3;}
  const chunks=[],ORD=[0,1,2],FLP=[0,2,1];
  for(const s of src){
    const bins=new Map();for(let t=0;t<s.tn;t++){const k=key(s,t,cell);let b=bins.get(k);if(!b)bins.set(k,b=[]);b.push(t);}
    const C=s.g.attributes.color,UV=s.g.attributes.uv,ord=s.flip?FLP:ORD;
    for(const ids of bins.values()){
      const m=ids.length,pos=new Float32Array(m*9),nor=new Float32Array(m*9),col=C?new Float32Array(m*3*C.itemSize):null,uv=UV?new Float32Array(m*6):null;
      let sx=0,sy=0,sz=0;
      for(let j=0;j<m;j++){const t=ids[j];sx+=s.CX[t];sy+=s.CY[t];sz+=s.CZ[t];
        for(let v=0;v<3;v++){const sv=ord[v];for(let q=0;q<3;q++)pos[j*9+v*3+q]=s.X[t*9+sv*3+q];
          if(C)for(let q=0;q<C.itemSize;q++)col[(j*3+v)*C.itemSize+q]=C.array[(t*3+sv)*C.itemSize+q];
          if(UV)for(let q=0;q<2;q++)uv[(j*3+v)*2+q]=UV.array[(t*3+sv)*2+q];}}
      const cx=sx/m,cy=sy/m,cz=sz/m;let r=0;
      for(let j=0;j<m*3;j++){pos[j*3]-=cx;pos[j*3+1]-=cy;pos[j*3+2]-=cz;r=Math.max(r,Math.hypot(pos[j*3],pos[j*3+1],pos[j*3+2]));}
      for(let j=0;j<m;j++){const a=j*9,ux=pos[a+3]-pos[a],uy=pos[a+4]-pos[a+1],uz=pos[a+5]-pos[a+2],vx=pos[a+6]-pos[a],vy=pos[a+7]-pos[a+1],vz=pos[a+8]-pos[a+2];
        let nx=uy*vz-uz*vy,ny=uz*vx-ux*vz,nz=ux*vy-uy*vx;const l=Math.hypot(nx,ny,nz)||1;nx/=l;ny/=l;nz/=l;
        for(let v=0;v<3;v++){nor[a+v*3]=nx;nor[a+v*3+1]=ny;nor[a+v*3+2]=nz;}}
      chunks.push({mat:s.m.material,pos,nor,col,colSize:C?C.itemSize:0,uv,c:new V3(cx,cy,cz),tris:m,r});}}
  for(const s of src)if(s.tmp)s.g.dispose();
  if(chunks.length>maxN){chunks.sort((a,b)=>b.tris*b.r-a.tris*a.r);chunks.length=maxN;}
  return chunks;}

function dthMake(ch,hq){
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(ch.pos,3));geo.setAttribute('normal',new THREE.BufferAttribute(ch.nor,3));
  if(ch.col)geo.setAttribute('color',new THREE.BufferAttribute(ch.col,ch.colSize));if(ch.uv)geo.setAttribute('uv',new THREE.BufferAttribute(ch.uv,2));
  geo.computeBoundingSphere();
  const m=new THREE.Mesh(geo,ch.mat);m.position.copy(ch.c);m.castShadow=hq;m.receiveShadow=false;W.group.add(m);return {m,geo};}

// кольца нити: взлетают винтом и сжимаются
const DTH_TOR=new THREE.TorusGeometry(1,0.04,5,22),DTH_LM={};
const dthLoopMat=c=>DTH_LM[c]||(DTH_LM[c]=new THREE.MeshBasicMaterial({color:c}));
function dthLoops(c,n,cols,r0,rise){
  for(let i=0;i<n;i++){
    const pv=new THREE.Group();pv.position.copy(c);pv.scale.setScalar(0.01);W.group.add(pv);
    const ring=new THREE.Mesh(DTH_TOR,dthLoopMat(cols[i%cols.length]));ring.rotation.x=0.5+rand(0,0.7);ring.rotation.z=rand(0,6.28);ring.castShadow=false;pv.add(ring);
    DTH.loops.push({pv,grp:W.group,t:-i*0.035,life:rand(0.7,0.95),r0:r0*rand(0.8,1.25),y0:c.y-0.2+rand(0,0.4),rise:rise*rand(0.7,1.2),w:rand(4,9)*(i%2?1:-1)});}}

function dthKill(s){if(s.m.parent)s.m.parent.remove(s.m);s.geo.dispose();}
function dthTick(dt){
  const L=DTH.sh;
  for(let i=L.length-1;i>=0;i--){
    const s=L[i];
    if(s.grp!==W.group||!s.m.parent||s.t+dt>=s.life){dthKill(s);L.splice(i,1);continue;}
    s.t+=dt;const p=s.m.position;
    s.v.y-=s.g*dt;
    if(s.swirl){const dx=p.x-s.cx,dz=p.z-s.cz,dl=Math.hypot(dx,dz)||1;s.v.x+=-dz/dl*s.swirl*dt;s.v.z+=dx/dl*s.swirl*dt;}
    if(s.drag)s.v.multiplyScalar(Math.exp(-s.drag*dt));
    p.addScaledVector(s.v,dt);s.m.rotation.x+=s.w.x*dt;s.m.rotation.y+=s.w.y*dt;s.m.rotation.z+=s.w.z*dt;
    if(!s.float){const fy=s.floor+s.r*0.5;
      if(p.y<=fy){p.y=fy;if(s.v.y<0){s.v.y*=-s.bounce;if(s.v.y<0.7)s.v.y=0;}const f=Math.exp(-5*dt);s.v.x*=f;s.v.z*=f;s.w.multiplyScalar(s.v.y>0?0.6:f);}}
    const k=s.t>s.fade0?(s.t-s.fade0)/(s.life-s.fade0):0;
    s.m.scale.setScalar(k<=0?1:Math.max(0.0001,1-dthBack(Math.min(1,k))));}
  const Q=DTH.loops;
  for(let i=Q.length-1;i>=0;i--){
    const s=Q[i];
    if(s.grp!==W.group||!s.pv.parent||s.t+dt>=s.life){if(s.pv.parent)s.pv.parent.remove(s.pv);Q.splice(i,1);continue;}
    s.t+=dt;if(s.t<0)continue;
    const u=s.t/s.life,sc=s.r0*(0.35+1.15*dthOut(u))*(u>0.6?Math.max(0.0001,1-dthBack((u-0.6)/0.4)):1);
    s.pv.scale.setScalar(Math.max(0.0001,sc));s.pv.position.y=s.y0+s.rise*dthOut(u);s.pv.rotation.y+=s.w*dt;}}

// эффекты хлопка по семейству
function dthFx(e,D,c,floor){
  const fx=FIN.fx,big=D.big,k=big?1.6:1,fam=D.fam,look=e.def.look,N=n=>Math.round(n*k);
  if(typeof jxSprite==='function'&&typeof JX!=='undefined'&&JX.on){try{jxSprite('dot',DTH_FLASH[fam]||0xffffff,c.clone(),e.r*(big?5:3.4),0.14,{op:0.9,shape:'flash'});}catch(err){}}
  if(fx){
    if(fam==='thread'){const col=e.def.col?[e.def.col[1],e.def.col[2],e.def.col[3]]:[0xd8d0f0,0xb0b0c0,0xffd76a];
      dthLoops(c,Math.max(3,Math.round(N(7)*(FIN.set.quality==='low'?0.5:1))),col,e.r*1.1+0.3,1.9);fx.sparkle(c,N(10),0xffe9a0);fx.stars(c,N(5),0xffd76a);}
    else if(fam==='water'){fx.drops(c,N(look==='puff'?30:16));fx.dust(floor,6,0xcfeaf2,0.8);ringFx(floor.clone(),0x9ae0f0,(look==='puff'?3.4:2.4)*(big?1.8:1));later(0.1,()=>ringFx(floor.clone(),0xd8f6ff,(look==='puff'?4.4:3.2)*(big?1.8:1)));}
    else if(fam==='forest'){fx.leaves(c,N(12));fx.sparks(c,N(12),0x9a7a4a);fx.dust(floor,8,0xb89a68,0.9);}
    else if(fam==='fire'){fx.sparks(c,N(16),0xff9a3a);fx.sparkle(c,N(10),0xff7a1a);fx.dust(floor,8,0x7a726c,1);ringFx(floor.clone(),0xff8a3a,2.6*(big?1.8:1));}
    else if(fam==='light'){fx.sparkle(c,N(16),look==='ten'?0xb89cff:look==='tucha'?0xbfe6ff:look==='motylek'?0xffd0e8:0xfff4c0);fx.stars(c,N(4));
      if(look==='motylek')fx.petals(c,N(8));else if(look==='tucha')fx.drops(c,N(10));}
    else{fx.dust(floor,10,0xe6dcc4,0.9);fx.stars(c,N(6));}
    if(big){fx.stars(c,14,0xffd76a);}}
  else burst(c,e.def.col?e.def.col[1]:0xe6dcc4,14,5);
  if(big){ringFx(floor.clone(),COL.gold,5.2);later(0.12,()=>ringFx(floor.clone(),0xfff0c0,7));shakeAll(0.07,0.45);G.hitstop=Math.max(G.hitstop,0.16);}}

function dthPop(e,D){
  const t0=performance.now();D.popped=true;DTH.stats.pops++;
  const spec=Object.assign({},DTH_SPEC.base,DTH_SPEC[D.fam]||{}),big=D.big,s=e.s||1,top=(e.L&&e.L.top||1.4)*s;
  e.g.updateMatrixWorld(true);
  const c=e.pos.clone().add(new V3(0,top*0.5,0)),floorY=e.pos.y,floor=new V3(c.x,floorY+0.08,c.z);
  let n=0;
  try{
    const meshes=dthCollect(e);
    if(meshes&&meshes.length){
      const chunks=dthSlice(meshes,Math.max(0.3,top/(big?3.6:2.8)),dthQ()+(big?8:0),c),hq=FIN.set.quality==='high',kO=big?1.35:1,kU=big?1.15:1;
      for(const ch of chunks){
        const mk=dthMake(ch,hq),dx=ch.c.x-c.x,dy=ch.c.y-c.y,dz=ch.c.z-c.z,hl=Math.hypot(dx,dz);let ox,oz;
        if(hl<0.05){const a=rand(0,6.283);ox=Math.cos(a);oz=Math.sin(a);}else{ox=dx/hl;oz=dz/hl;}
        const sp=spec.out*kO*rand(0.55,1.2),fade0=spec.fade*rand(0.85,1.2)+(big?0.18:0);
        DTH.sh.push({m:mk.m,geo:mk.geo,grp:W.group,t:0,fade0,life:fade0+(spec.life-spec.fade)*rand(0.9,1.1),r:ch.r,floor:floorY,g:spec.g,bounce:spec.bounce,swirl:spec.swirl,drag:spec.drag,float:!!spec.float,cx:c.x,cz:c.z,
          v:new V3(ox*sp+rand(-0.7,0.7),spec.up*kU*rand(0.55,1.2)+dy*1.8,oz*sp+rand(-0.7,0.7)),w:new V3(rand(-1,1),rand(-1,1),rand(-1,1)).multiplyScalar(spec.spin)});
        n++;}}}
  catch(err){console.error('dthPop',err);}
  D.shards=n;DTH.stats.shards+=n;
  if(n>0)e.g.visible=false;
  try{dthFx(e,D,c,floor);}catch(err){console.error('dthFx',err);}
  const ms=performance.now()-t0;DTH.stats.ms+=ms;DTH.stats.maxMs=Math.max(DTH.stats.maxMs,ms);}

function dthStart(e){
  e._dth={t:0,popped:false,fam:DTH_FAM[e.def.look]||'',big:!!e.big,pre:e.big?0.32:0.1,ry:e.inner.rotation.y,leak:0,shards:0};DTH.stats.deaths++;
  if(e.big&&typeof jxSprite==='function'&&typeof JX!=='undefined'&&JX.on){try{jxSprite('dot',0xfff0c0,e.pos.clone().add(new V3(0,(e.L.top||1.4)*(e.s||1)*0.5,0)),e.r*3.6,0.32,{op:0.55});}catch(err){}}}

function dthStep(e,D,dt){
  D.t+=dt;if(!e.g.parent)return;
  const b=e.body;
  if(!D.popped){
    const u=Math.min(1,D.t/D.pre);
    e.g.scale.setScalar(1);e.inner.rotation.y=D.ry+Math.sin(D.t*60)*0.1*u;   // вместо линейного сжатия и вращения прототипа
    if(D.big){const q=Math.sin(D.t*55)*0.025*u;b.scale.set(1+0.05*u+q,1+0.1*u-q,1+0.05*u+q);b.position.set(Math.sin(D.t*83)*0.05*u,0,Math.cos(D.t*71)*0.05*u);
      D.leak-=dt;if(D.leak<=0&&FIN.fx){D.leak=0.08;FIN.fx.sparkle(e.pos.clone().add(new V3(0,(e.L.top||1.4)*(e.s||1)*0.5,0)),3,0xffe9a0);}}
    else{const o=dthOut(u);b.scale.set(1-0.12*o,1+0.22*o,1-0.12*o);}
    if(D.t>=D.pre)dthPop(e,D);
    return;}
  if(D.shards>0)return;
  // запасной путь (нечего рассыпать): вдох → сжатие с перелётом
  const v=Math.min(1,(D.t-D.pre)/0.35);
  b.scale.set(1,1,1);e.g.scale.setScalar(Math.max(0.01,1-dthBack(v)));e.inner.rotation.y+=dt*14*(1-v);}

FIN.dbgUnravel=e=>unravel(e);   // для ботов (ZC.FIN.dbgUnravel(враг))
{const _un=unravel;unravel=function(e){const was=e.alive;const r=_un.apply(this,arguments);
  try{if(DTH.on&&was&&e.alive===false&&e.state==='dying'&&e.def&&e.inner&&e.body)dthStart(e);}catch(err){console.error('dthStart',err);}return r;};}
{const _uf=updateFoe;updateFoe=function(e,dt){const r=_uf.apply(this,arguments);const D=e._dth;
  if(D&&DTH.on&&e.state==='dying'){try{dthStep(e,D,dt);}catch(err){console.error('dthStep',err);e._dth=null;}}return r;};}
{const _step=step;step=function(dt){_step(dt);if(!DTH.sh.length&&!DTH.loops.length)return;
  try{dthTick(dt*(typeof CINE!=='undefined'&&CINE.timeScale?CINE.timeScale():1));}catch(err){console.error('dthTick',err);DTH.sh.length=0;DTH.loops.length=0;}};}
