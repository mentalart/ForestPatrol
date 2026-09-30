/* ============================== РЕЛИЗ final04 · ВИДИМОСТЬ ГЕРОЕВ: вырез «в горошек», силуэты за стенами, затухание у камеры ============================== */
// Обоснование и сравнение подходов — docs/07_visibility_camera.md. Коротко:
// 1) Экранный вырез с дизером. В шейдере материалов мира (LowPolyMat, пачки статики) фрагменты, которые ближе к камере, чем герой, и попадают
//    в мягкий эллипс вокруг него, выбиваются круглыми дырками крупного «игрушечного» узора — не больше ~70 % площади, так что форма препятствия
//    и его тени остаются. Вокруг дырок — тёплая кромка. Материалы остаются непрозрачными: нет сортировки, мерцания, выпадения из пачек.
//    Никогда не выбиваются: земля и опора под героем, ступени у ног, всё, что дальше героя, сами герои, враги, предметы, NPC, ворота,
//    платформы, подсказки и значки (у них материалы без выреза).
// 2) Вырез включается, только когда героя правда что-то закрывает: 3 луча (голова, грудь, ноги) от камеры к каждому герою 15 раз в секунду
//    по списку «загораживающих» (коробки-ограничители, потом точная проверка меша). Проявление 0,2 с, возврат 0,5 с, гистерезис 0,3 с.
//    Радиус эллипса — по росту героя, растёт с расстоянием и не меньше ~62 px на экране 1080p.
// 3) Силуэт-«рентген»: второй проход скелетного меша героя (depthFunc GreaterDepth, рисуется после мира и до героев) — где героя закрывает
//    стена, виден его светящийся контур; у каждого героя свой цвет, мягкая пульсация. В роликах силуэты гаснут.
// 4) То, что вплотную к камере (ближе ~2 м), растворяется тем же узором независимо от героев (пол и крыши под камерой — нет).
// 5) Старые «прозрачные стены» уровней (fadeable) больше не меняют прозрачность материала — растворяются тем же узором целиком;
//    группа шире 4 м (забор, ряд стен) — кусками: растворяется только кусок под лучом к герою и соседний, если луч прошёл у самого края;
//    и в любом случае только в круге вокруг героя (радиус ~2,7 м на глубине героя): длинная стена из одного меша не уходит в узор вся.
// Для ботов: FIN.occ (состояние, статистика), FIN.occ.frame() — отрисовать кадр (детекция идёт при отрисовке), FIN.occ.fdt — шаг времени кадра
// (в headless кадры в JS мгновенные, растеризация отложена — без фиксированного шага сглаживание шло бы сотни кадров).
const OCC={on:true,xray:true,hz:15,cand:[],colN:0,nextCol:0,nextEx:0,views:{},xa:0,near:[2.1,0.75],
  col:{proshka:0xff9a4a,potap:0xffd25a,pelageya:0xd8a8ff,yosha:0x72e6cc},stats:{rays:0,tests:0,precise:0,cand:0,ms:0,frames:0}};FIN.occ=OCC;
const OCC_FR=1.5;   // радиус круга «прозрачной стены» вокруг героя: OCC_FR + 0,8·рост, м на глубине героя
if(FIN.set.occ===undefined)FIN.set.occ=2;   // 2 — вырез и силуэт, 1 — только силуэт, 0 — выкл
const OU={H:{value:[new THREE.Vector4(),new THREE.Vector4()]},R:{value:[new THREE.Vector4(),new THREE.Vector4()]},P:{value:new THREE.Vector4(-1,-2,8,0)},Z:{value:0},
  F:{value:[new THREE.Vector4(),new THREE.Vector4(),new THREE.Vector4()]}};
// ---------- шейдер ----------
const OCC_FP='uniform vec4 uOccH[ 2 ];\nuniform vec4 uOccR[ 2 ];\nuniform vec4 uOccF[ 3 ];\nuniform vec4 uOccP;\nuniform float uOccWhole;\nvarying vec3 vOccW;\nvarying vec3 vOccV;\nfloat occRim = 0.0;';
// F: «прозрачные стены» — центр героя (или цели лучей уровня) в координатах камеры + радиус круга в м на его глубине (0 — нет);
// H: центр героя в координатах камеры + сила выреза; R: полуоси эллипса (м на глубине героя), высота ног, запас по глубине; P: ближнее затухание (начало, полное), шаг узора в px, время
const OCC_FM=`{
	float fz = - vOccV.z;
	float up = 0.0;
	#if defined( FLAT_SHADED ) || __VERSION__ >= 300
	up = step( 0.8, abs( normalize( cross( dFdx( vOccW ), dFdy( vOccW ) ) ).y ) );
	#endif
	float cut = uOccWhole * ( 1.0 - up );
	if ( cut > 0.0 ) {
		float wl = 0.0;
		for ( int i = 0; i < 3; i ++ ) {
			vec4 F = uOccF[ i ];
			if ( F.w <= 0.0 ) continue;
			float fh = - F.z;
			if ( fz > fh + 0.5 ) continue;
			vec2 q = vOccV.xy * ( fh / max( fz, 0.05 ) );
			wl = max( wl, 1.0 - smoothstep( 0.75, 1.0, length( q - F.xy ) / F.w ) );
		}
		cut *= wl;
	}
	for ( int i = 0; i < 2; i ++ ) {
		vec4 H = uOccH[ i ]; vec4 R = uOccR[ i ];
		if ( H.w < 0.003 ) continue;
		float hz = - H.z;
		if ( fz > hz - R.w ) continue;
		if ( vOccW.y < R.z + 0.3 ) continue;
		if ( up > 0.5 && vOccW.y < R.z + 1.2 ) continue;
		vec2 q = vOccV.xy * ( hz / max( fz, 0.05 ) );
		float r = length( ( q - H.xy ) / R.xy );
		cut = max( cut, ( 1.0 - smoothstep( 0.55, 1.0, r ) ) * H.w );
	}
	cut = max( cut, ( 1.0 - smoothstep( uOccP.y, uOccP.x, fz ) ) * ( 1.0 - up ) * 1.4 );
	if ( cut > 0.004 ) {
		vec2 p = gl_FragCoord.xy / uOccP.z;
		p.x += 0.5 * mod( floor( p.y ), 2.0 );
		float d = length( fract( p ) - 0.5 );
		float hr = 0.475 * sqrt( min( cut, 1.0 ) );
		if ( d < hr ) discard;
		occRim = min( cut, 1.0 ) * ( 1.0 - smoothstep( hr, hr + 1.8 / uOccP.z, d ) );
	}
}`;
const OCC_FE='\tgl_FragColor.rgb = mix( gl_FragColor.rgb, vec3( 1.0, 0.8, 0.45 ), occRim * 0.6 );';
FIN.occHook=function(sh,mat){sh.uniforms.uOccH=OU.H;sh.uniforms.uOccR=OU.R;sh.uniforms.uOccF=OU.F;sh.uniforms.uOccP=OU.P;sh.uniforms.uOccWhole=mat.userData._occW||OU.Z;
  sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vOccW;\nvarying vec3 vOccV;')
    .replace('#include <project_vertex>','#include <project_vertex>\n\t{ vec4 ow = vec4( transformed, 1.0 );\n\t#ifdef USE_INSTANCING\n\tow = instanceMatrix * ow;\n\t#endif\n\tow = modelMatrix * ow; vOccW = ow.xyz; vOccV = mvPosition.xyz; }');
  sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\n'+OCC_FP).replace('#include <clipping_planes_fragment>','#include <clipping_planes_fragment>\n'+OCC_FM)
    .replace('#include <premultiplied_alpha_fragment>',OCC_FE+'\n\t#include <premultiplied_alpha_fragment>');};
// неосвещённые пачки статики тоже получают вырез
{const _bm=batMat;batMat=function(k){const m=_bm(k);if(m.isMeshBasicMaterial&&!m.userData.occInit){m.userData.occInit=true;
    m.onBeforeCompile=function(sh){if(!this.userData.noOcc)FIN.occHook(sh,this);};m.customProgramCacheKey=function(){return 'bb'+(this.userData.noOcc?'':'o');};}return m;};}
// ---------- что никогда не прячем: герои, враги, предметы, NPC, ворота, платформы… ----------
const OCC_LISTS=['enemies','items','bells','gates','plates','movers','lifts','likhos','baits','shots','debris','fx','clouds','tiles','surfs','flocks','geese','trees','returning','sparks','flocks5','grabs'];
function occRoots(){const R=[],pick=o=>o&&(o.isObject3D?o:(o.g||o.mesh||o.m||o.group||o.box||null));
  for(const h of HEROES)if(h.g)R.push(h.g);
  for(const k of OCC_LISTS)for(const o of (W[k]||[])){const r=pick(o);if(r&&r.isObject3D)R.push(r);}
  if(W.zven&&W.zven.g)R.push(W.zven.g);if(FIN.actors)for(const n of FIN.actors.npcs)if(n.o&&n.o.g)R.push(n.o.g);
  for(const z of (W.waters||[]))for(const f of (z.floaters||[])){const r=pick(f)||f;if(r&&r.isObject3D)R.push(r);}return R;}
const OCC_CL=new Map();
// общий материал (им пользуется и статика) подменяется копией без выреза; собственный материал объекта помечается на месте
function occNo(mt){if(mt.userData.noOcc)return mt;
  if(mt.userData.shared||mt.userData.kit||mt.userData.batch){let c=OCC_CL.get(mt);if(!c){c=mt.clone();c.userData.noOcc=true;if(mt.defaultAttributeValues)c.defaultAttributeValues=Object.assign({},mt.defaultAttributeValues);OCC_CL.set(mt,c);}return c;}
  mt.userData.noOcc=true;mt.needsUpdate=true;return mt;}
function occExempt(){for(const r of occRoots())r.traverse(o=>{o.userData.occEx=true;const mt=o.material;if(!mt||Array.isArray(mt)||mt.userData.noOcc||mt.userData.xray)return;
    if(o.userData.bat||o.isSkinnedMesh||mt.skinning)return;   // заместитель пачки не рисуется (иначе выпадет из пачки); у скелетных мешей героев выреза и так нет — их материал не подменяем
    if(mt instanceof FIN.LowPolyMat||mt.userData.batch)o.material=occNo(mt);});}
{const _bb=batBuild;batBuild=function(cell){_bb(cell);if(cell.local&&cell.mesh){let o=cell.local,ex=false;while(o){if(o.userData.occEx){ex=true;break;}o=o.parent;}if(ex)cell.mesh.material=occNo(cell.mesh.material);}};}
// ---------- что может загораживать: список коробок (обновляется после сборки уровня и раз в 5 с) ----------
const OB=new THREE.Box3(),OS=new V3(),OT=new V3(),OD=new V3(),OM=new THREE.Matrix4(),OMI=new THREE.Matrix4(),OR=new THREE.Raycaster(),OHITS=[];
function occVis(o){while(o){if(!o.visible)return false;if(o===W.group)return true;o=o.parent;}return false;}
const occOkBox=b=>{const h=b.max.y-b.min.y;return h>=0.7&&isFinite(h)&&(b.max.x-b.min.x)*(b.max.z-b.min.z)<600;};
function occCollect(){const out=[];if(!W||!W.group){OCC.cand=out;return;}
  W.group.traverse(o=>{if(!o.isMesh||o.isSkinnedMesh||o.userData.batchMesh||o.userData.occEx)return;const mt=o.material;
    if(!mt||Array.isArray(mt)||mt.userData.noOcc||mt.userData.batch||!(mt instanceof FIN.LowPolyMat))return;if(!occVis(o))return;
    const g=o.geometry;if(!g||!g.attributes.position)return;if(!g.boundingBox)g.computeBoundingBox();
    if(o.isInstancedMesh){if(g.boundingBox.max.y-g.boundingBox.min.y<0.35)return;for(let i=0;i<o.count;i++){o.getMatrixAt(i,OM);OM.premultiply(o.matrixWorld);OB.copy(g.boundingBox).applyMatrix4(OM);if(occOkBox(OB))out.push({b:OB.clone(),m:null,n:0});}return;}
    OB.copy(g.boundingBox).applyMatrix4(o.matrixWorld);if(occOkBox(OB))out.push({b:OB.clone(),m:o,n:(g.index?g.index.count:g.attributes.position.count)/3});});
  OCC.cand=out;OCC.stats.cand=out.length;}
// отрезок камера → точка героя: сначала коробки, потом точная проверка меша (экземпляры и очень крупные меши — по коробке)
function occSeg(o,t){OD.subVectors(t,o);const L=OD.length();if(L<0.8)return false;OD.divideScalar(L);const far=L-0.45;
  const ix=Math.abs(OD.x)>1e-6?1/OD.x:1e6,iy=Math.abs(OD.y)>1e-6?1/OD.y:1e6,iz=Math.abs(OD.z)>1e-6?1/OD.z:1e6;
  const x0=Math.min(o.x,t.x),x1=Math.max(o.x,t.x),y0=Math.min(o.y,t.y),y1=Math.max(o.y,t.y),z0=Math.min(o.z,t.z),z1=Math.max(o.z,t.z);
  for(const c of OCC.cand){const b=c.b;if(b.max.x<x0||b.min.x>x1||b.max.y<y0||b.min.y>y1||b.max.z<z0||b.min.z>z1)continue;OCC.stats.tests++;
    let a=(b.min.x-o.x)*ix,e=(b.max.x-o.x)*ix;let tn=Math.min(a,e),tf=Math.max(a,e);
    a=(b.min.y-o.y)*iy;e=(b.max.y-o.y)*iy;tn=Math.max(tn,Math.min(a,e));tf=Math.min(tf,Math.max(a,e));
    a=(b.min.z-o.z)*iz;e=(b.max.z-o.z)*iz;tn=Math.max(tn,Math.min(a,e));tf=Math.min(tf,Math.max(a,e));
    if(tf<Math.max(tn,0.1)||tn>far)continue;
    if(!c.m||c.n>6000)return true;
    OR.set(o,OD);OR.near=0.1;OR.far=far;OHITS.length=0;c.m.raycast(OR,OHITS);OCC.stats.precise++;if(OHITS.length)return true;}
  return false;}
function occRays(o,h){const hh=heroHeight(h);OCC.stats.rays+=3;
  OT.set(h.pos.x,h.pos.y+hh*0.9,h.pos.z);if(occSeg(o,OT))return true;OT.set(h.pos.x,h.pos.y+hh*0.5,h.pos.z);if(occSeg(o,OT))return true;OT.set(h.pos.x,h.pos.y+0.3,h.pos.z);return occSeg(o,OT);}
// ---------- перед каждой отрисовкой сцены: какая камера, кто закрыт, форма выреза ----------
const occView=cam=>cam===camS?'s':cam===cams[0]?0:cam===cams[1]?1:null;
function occPre(sc,cam){const t0=performance.now(),P=OU.P.value,hv=renderer.domElement.height||720;P.z=Math.max(5,Math.round(8*hv/1080));P.w=G.time;
  const v=OCC.on&&W&&sc===scene&&!FIN.titleOn&&!FIN.gallery?occView(cam):null;
  if(v===null){OU.H.value[0].w=0;OU.H.value[1].w=0;for(const F of OU.F.value)F.w=0;P.x=-1;P.y=-2;return;}
  P.x=OCC.near[0];P.y=OCC.near[1];
  const V=OCC.views[v]||(OCC.views[v]={t:t0,det:-1e9,h:[{occ:false,last:-1e9,s:0},{occ:false,last:-1e9,s:0}]});
  const dt=OCC.fdt||Math.min(0.1,Math.max(0,(t0-V.t)/1000));V.t=t0;const det=!!OCC.fdt||t0-V.det>=1000/OCC.hz-1;if(det)V.det=t0;
  OMI.copy(cam.matrixWorld).invert();const tanH=Math.tan(THREE.MathUtils.degToRad(cam.fov)/2),cut=FIN.set.occ>=2;
  // «прозрачные стены»: круги вокруг обоих героев и цели лучей уровня (W.fadeTargets) — стена растворяется только в них
  if(W.fades&&W.fades.length){const ex=W.fadeTargets?W.fadeTargets():[],tg=[active(0),active(1),ex[0]];
    for(let i=0;i<3;i++){const h=tg[i],F=OU.F.value[i];F.w=0;if(!h||!h.pos)continue;const hh=heroHeight(h);OS.set(h.pos.x,h.pos.y+hh*0.55,h.pos.z).applyMatrix4(OMI);if(-OS.z<0.6)continue;F.set(OS.x,OS.y,OS.z,OCC_FR+hh*0.8);}}
  else for(const F of OU.F.value)F.w=0;
  for(let i=0;i<2;i++){const h=active(i),S=V.h[i],U=OU.H.value[i],R=OU.R.value[i];let want=0;
    if(cut&&h&&h.g&&h.g.visible&&!G.cine){if(det){if(occRays(cam.position,h)){S.occ=true;S.last=t0;}else if(t0-S.last>300)S.occ=false;}want=S.occ?1:0;}else S.occ=false;
    S.s=want>S.s?Math.min(want,S.s+dt/0.2):Math.max(want,S.s-dt/0.5);
    if(S.s<=0.001||!h){U.w=0;continue;}
    const hh=heroHeight(h);OS.set(h.pos.x,h.pos.y+hh*0.55,h.pos.z).applyMatrix4(OMI);const dist=-OS.z;if(dist<0.6){U.w=0;continue;}
    let rx=0.55+hh*0.35,ry=0.5+hh*0.55;const k=1+Math.min(0.7,Math.max(0,(dist-10)*0.03));rx*=k;ry*=k;
    const px=ry/(dist*tanH)*(hv/2),minPx=62*hv/1080;if(px<minPx){const q=minPx/px;rx*=q;ry*=q;}
    U.set(OS.x,OS.y,OS.z,S.s*S.s*(3-2*S.s));R.set(rx,ry,h.pos.y,0.6);}
  OCC.stats.ms+=performance.now()-t0;}
{const _rr=renderer.render.bind(renderer);renderer.render=function(sc,cam){try{occPre(sc,cam);}catch(e){console.error('occ',e);}return _rr(sc,cam);};}
// ---------- силуэты-«рентген» ----------
function xrayMat(col,ref){const m=new THREE.MeshBasicMaterial({color:col,skinning:true,depthWrite:false,fog:false,toneMapped:false});
  // трафарет: каждый пиксель силуэта рисуется один раз (без наложений частей тела друг на друга)
  m.stencilWrite=true;m.stencilRef=ref;m.stencilFunc=THREE.NotEqualStencilFunc;m.stencilZPass=THREE.ReplaceStencilOp;m.stencilFail=THREE.KeepStencilOp;m.stencilZFail=THREE.KeepStencilOp;
  m.depthFunc=THREE.GreaterDepth;m.blending=THREE.CustomBlending;m.blendEquation=THREE.AddEquation;m.blendSrc=THREE.SrcAlphaFactor;m.blendDst=THREE.OneMinusSrcAlphaFactor;
  m.userData.noOcc=true;m.userData.xray=true;m.opacity=0;
  m.onBeforeCompile=sh=>{sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vXN;\nvarying vec3 vXV;')
      .replace('#include <skinbase_vertex>','#include <skinbase_vertex>\n\t#ifndef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif')
      // чуть ближе к камере: герой, едва коснувшийся земли или травы, силуэтом не вспыхивает
      .replace('#include <project_vertex>','#include <project_vertex>\n\tvXN = normalize( transformedNormal ); vXV = - mvPosition.xyz;\n\tgl_Position = projectionMatrix * vec4( mvPosition.xyz + normalize( - mvPosition.xyz ) * 0.28, 1.0 );');
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vXN;\nvarying vec3 vXV;')
      .replace('vec4 diffuseColor = vec4( diffuse, opacity );','float xr = 1.0 - abs( dot( normalize( vXN ), normalize( vXV ) ) );\n\tvec4 diffuseColor = vec4( diffuse * ( 0.8 + 0.6 * xr ), opacity * ( 0.35 + 0.65 * pow( xr, 1.3 ) ) );');};
  m.customProgramCacheKey=()=>'xray';return m;}
function occXray(h){let sk=h._xrSk;if(!sk||!sk.parent){sk=null;if(h.body)h.body.traverse(o=>{if(!sk&&o.isSkinnedMesh&&!o.userData.xray)sk=o;});h._xrSk=sk;}if(!sk)return null;
  if(!h._xr||h._xr.parent!==sk){const ov=new THREE.SkinnedMesh(sk.geometry,xrayMat(OCC.col[h.kind]||0xffffff,1+HEROES.indexOf(h)));ov.bind(sk.skeleton,sk.bindMatrix);
    ov.renderOrder=1;ov.frustumCulled=false;ov.castShadow=false;ov.receiveShadow=false;ov.userData.xray=true;ov.userData.noBatch=true;ov.userData.occEx=true;sk.add(ov);sk.renderOrder=2;h._xr=ov;}
  return h._xr;}
// ---------- кадр ----------
function occFrame(){const now=performance.now();OCC.stats.frames++;if(!W||!W.group)return;
  if(now>=OCC.nextEx){OCC.nextEx=now+1000;occExempt();}
  if(now>=OCC.nextCol){OCC.nextCol=now+(OCC.colN<3?[1400,1700,5000][OCC.colN]:5000);OCC.colN++;occCollect();}
  const want=OCC.on&&OCC.xray&&FIN.set.occ>=1&&!G.cine&&!FIN.titleOn?1:0,dt=OCC.fdt||Math.min(0.1,Math.max(0,(now-(OCC.xt||now))/1000));OCC.xt=now;
  OCC.xa=want>OCC.xa?Math.min(1,OCC.xa+dt/0.3):Math.max(0,OCC.xa-dt/0.3);
  HEROES.forEach((h,i)=>{const x=occXray(h);if(x){x.material.opacity=OCC.xa*(0.6+0.14*Math.sin(G.time*3.6+i*1.7));x.visible=OCC.xa>0.01;}});}
{const _render=render;render=function(){try{occFrame();}catch(e){console.error('occ',e);}_render();};}
OCC.frame=()=>render();OCC.dbg={renderer,camS,cams,U:OU,collect:()=>occCollect(),exempt:()=>occExempt(),seg:(o,t)=>occSeg(o,t)};
// ---------- большие «прозрачные стены» — кусками ----------
// Уровень объявляет «прозрачной стеной» целую группу: забор у калитки, ряд стен, срубы. Раньше под лучом к герою растворялась вся
// группа, и забор в десятке метров от героя, никого не заслоняющий, тоже шёл узором. Теперь группа шире OCC_PART метров делится
// на куски не шире OCC_PART (по коробкам мешей, жадно): у каждого куска свои копии материалов и свой вес растворения.
// Растворяется кусок под лучом и соседние куски той же группы, до которых от точки попадания ближе OCC_NEAR м.
const OCC_PART=4,OCC_NEAR=1.2;
function occMatCopy(mt){const c=mt.clone();if(mt.defaultAttributeValues)c.defaultAttributeValues=Object.assign({},mt.defaultAttributeValues);delete c.userData._occW;return c;}
function occSplitFades(){OCC.fadeParts=0;if(!W||!W.fades||!W.fadeMeshes||!W.fadeMeshes.length)return;W.group.updateMatrixWorld(true);
  const by=new Map();for(const m of W.fadeMeshes){const f=m.userData.fadeRef;if(!f)continue;if(!by.has(f))by.set(f,[]);by.get(f).push(m);}
  const add=[];
  for(const [f,ms] of by){if(ms.length<2)continue;const bs=ms.map(m=>new THREE.Box3().setFromObject(m)),u=new THREE.Box3();bs.forEach(b=>{if(!b.isEmpty())u.union(b);});
    if(u.isEmpty()||(u.max.x-u.min.x<=OCC_PART&&u.max.z-u.min.z<=OCC_PART))continue;
    const cl=[];ms.forEach((m,i)=>{const b=bs[i];let to=null;if(!b.isEmpty())for(const c of cl){OB.copy(c.b).union(b);if(OB.max.x-OB.min.x<=OCC_PART&&OB.max.z-OB.min.z<=OCC_PART){to=c;break;}}
      if(to){to.b.union(b);to.ms.push(m);}else cl.push({b:b.isEmpty()?u.clone():b.clone(),ms:[m]});});
    if(cl.length<2)continue;
    const parts=cl.map((c,k)=>k===0?f:{mats:[],k:1,hit:false});f.mats=[];
    cl.forEach((c,k)=>{const p=parts[k],cp=new Map();p.box=c.b;p.sibs=parts;
      for(const m of c.ms){let mt=m.material;if(k>0&&mt&&!Array.isArray(mt)){let c2=cp.get(mt);if(!c2){c2=occMatCopy(mt);cp.set(mt,c2);}m.material=c2;mt=c2;}
        if(mt&&p.mats.indexOf(mt)<0)p.mats.push(mt);m.userData.fadeRef=p;}});
    for(let k=1;k<parts.length;k++)add.push(parts[k]);}
  for(const p of add)W.fades.push(p);OCC.fadeParts=add.length;}
FIN.occSplitFades=occSplitFades;
// ---------- уровень: сброс, «прозрачные стены» уровня — вне пачек ----------
{const _ll=loadLevel;loadLevel=function(i){_ll(i);OCC.views={};OCC.cand=[];OCC.colN=0;OCC.nextCol=performance.now()+400;OCC.nextEx=0;
  try{occSplitFades();}catch(e){console.error('occ split',e);}
  for(const m of (W.fadeMeshes||[])){m.userData.noBatch=true;const mt=m.material;if(mt&&!mt.userData._occW){mt.userData._occW={value:0};mt.needsUpdate=true;}}};}
// старые «прозрачные стены»: тот же луч, что в прототипе, но стена растворяется узором целиком (большая группа — кусок под лучом), материал не становится полупрозрачным
updateFade=function(dt){if(!W.fades.length)return;for(const f of W.fades)f.hit=false;
  if(!G.cine){const ex=W.fadeTargets?W.fadeTargets():[];const views=G.split>0.5?[[rigs[0].pos,[active(0)].concat(ex)],[rigs[1].pos,[active(1)].concat(ex)]]:[[shared.pos,[active(0),active(1)].concat(ex)]];
    for(const[cp,hs]of views)for(const h of hs){const tgt=new V3(h.pos.x,h.pos.y+heroHeight(h)*0.6,h.pos.z),dir=tgt.clone().sub(cp),d=dir.length();if(d<0.6)continue;dir.divideScalar(d);
      RAY.set(cp,dir);RAY.near=0.05;RAY.far=d-0.45;for(const x of RAY.intersectObjects(W.fadeMeshes,false)){const f=x.object.userData.fadeRef;if(!f)continue;f.hit=true;
        if(f.sibs)for(const q of f.sibs)if(!q.hit&&q.box&&q.box.distanceToPoint(x.point)<OCC_NEAR)q.hit=true;}}}
  const now=G.time;for(const f of W.fades){if(f.hit)f.lastHit=now;const on=f.hit||now-(f.lastHit===undefined?-9:f.lastHit)<0.3;f.w=f.w||0;
    f.w=on?Math.min(1,f.w+dt/0.2):Math.max(0,f.w-dt/0.5);f.k=1-f.w*0.78;const k=f.w*f.w*(3-2*f.w)*0.92;
    for(const m of f.mats){if(!m.userData._occW){m.userData._occW={value:0};m.needsUpdate=true;}m.userData._occW.value=k;
      if(m.userData.baseOp!==undefined&&m.opacity!==m.userData.baseOp){m.opacity=m.userData.baseOp;m.transparent=m.opacity<0.99;m.depthWrite=true;}}}};
// ---------- настройка ----------
{const _ss=settingsScreen;settingsScreen=function(){const s=_ss(),S=FIN.set,N=['выкл','только силуэт','вырез и силуэт'];
  const at=s.items.findIndex(it=>it.label==='Джойстики местами');
  s.items.splice(at<0?s.items.length-1:at,0,{label:'Герои за препятствиями',val:()=>N[S.occ],sub:'стена перед героем — в горошек, за ней — светящийся силуэт',side:d=>{S.occ=Math.max(0,Math.min(2,(S.occ===undefined?2:S.occ)+(d<0?-1:1)));FIN.saveSettings();}});
  return s;};}
