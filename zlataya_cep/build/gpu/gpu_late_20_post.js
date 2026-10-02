/* ============================== РЕЛИЗ final07 · ПОСТОБРАБОТКА: мягкие тени в углах, свечение, сглаживание, глубина резкости ============================== */
// Сцена рисуется так же, как в final06 (тонмаппинг r128 — в материалах), но не прямо на холст, а в текстуру прохода сцены
// (по половине экрана в сплите — у каждой половины своя камера и свой проход), и поверх:
//  • сглаживание: MSAA 4× в проходе сцены, на «высоком» — SMAA (там нужна обычная глубина);
//  • мягкие тени в углах и у стыков (GTAO, полразрешения) — гранёные домики, камни и герои «садятся» на землю;
//  • свечение (bloom) только от того, что светится само: излучение материалов (фонари, огонь, золото, лава, чудеса) и
//    прибавляющие свет материалы (ореолы, искры, сказочная вода) — небо, песок и снег не «засвечиваются»;
//  • в роликах — глубина резкости с автофокусом на центр кадра (говорящий в фокусе, фон мягче);
//  • мягкая виньетка.
// Уровни: качество «низкое» — без постобработки (как final06); «среднее» — сглаживание, свечение, виньетка; «высокое» — ещё мягкие
// тени и глубина резкости. Боты по умолчанию идут на «низком» (быстрее); ?post=2 в адресе — включить «высокое» принудительно,
// ?nopost — выключить. Проходы постобработки идут через renderer.render — обёртки модулей (вырез late_88, вид под водой late_99c)
// срабатывают для своей камеры, как раньше.
{const T=THREE,L=T.TSL,FX=T.FX,GP=FIN.gpu;   // G — состояние игры (ролик: G.cine)
 const P=GP.post={panes:[],inPipe:false,frames:0,stats:{panes:0,lvl:0},
   force:(m=>m?+m[1]:null)(/[?&]post=(\d)/.exec(location.search))};
 P.level=()=>{if(/[?&]nopost/.test(location.search)||!GP.ready||FIN.titleOn)return 0;if(P.force!==null)return P.force;const q=FIN.set.quality;return q==='high'?2:q==='mid'?1:0;};
 // свечение: излучение материала + материалы, прибавляющие свет (ореолы, искры) — в отдельный канал прохода
 {const so=T.NodeMaterial.prototype.setupOutput;
  T.NodeMaterial.prototype.setupOutput=function(b,out){out=so.call(this,b,out);const M=b.renderer.getMRT(),glow=this.blending===T.AdditiveBlending||this.userData.bloom;
    if(!M||!b.renderer.getRenderTarget()){this.mrtNode=null;return out;}   // только в проходе постобработки
    if(this.fragmentNode===null){this.mrtNode=glow?L.mrt({emissive:L.vec4(out.rgb.mul(out.a),1)}):null;return out;}
    // свои шейдеры (fragmentNode, переводы GLSL): выходы прохода сами не подставляются — задаём все (иначе конвейер не создаётся)
    const o={};for(const k of Object.keys(M.outputNodes))o[k]=k==='output'?out:k==='emissive'?(glow?L.vec4(out.rgb.mul(out.a),1):L.vec4(0,0,0,1)):L.vec4(0.5,0.5,1,1);
    return L.mrt(o);};}
 P.dofK=L.uniform(0);P.aoK=L.uniform(0.7);P.bloomK=L.uniform(1.4);P.vigK=L.uniform(0.22);
 // Сцена рисуется в текстуру панели самим вызовом игры (в нём же свет перебалансирован на время кадра — late_10) — не узлом-проходом,
 // который рисовал бы сцену изнутри своего квадрата; каналы (цвет, свечение) ставит слой совместимости по rt.finMRT.
 function build(pane){const {cam,lvl}=pane,pr=renderer.getPixelRatio(),W=Math.max(1,Math.round(pane.w*pr)),H=Math.max(1,Math.round(pane.h*pr));
   // глубину (тени в углах, резкость) многовыборочной не прочесть — на «высоком» вместо MSAA сглаживание SMAA
   const rt=new T.RenderTarget(W,H,{type:T.HalfFloatType,samples:lvl>=2?0:4,count:2});rt.textures[0].name='output';rt.textures[1].name='emissive';
   if(lvl>=2)rt.depthTexture=new T.DepthTexture(W,H);
   rt.finScreen=true;rt.finMRT=L.mrt({output:L.output,emissive:L.vec4(L.emissive,1)});pane.rt=rt;   // тонмаппинг — в материалах, как на экране
   pane.near=L.uniform(cam.near);pane.far=L.uniform(cam.far);
   const uv=L.uv(),col=L.texture(rt.textures[0]),em=L.texture(rt.textures[1]);let c=lvl>=2?(pane.aa=FX.smaa(col)).getTextureNode().sample(uv).rgb:col.sample(uv).rgb;
   if(lvl>=2){const dep=L.texture(rt.depthTexture);
     // нормали GTAO восстанавливает по глубине (у гранёного мира они и так плоские)
     const a=FX.ao(dep,null,cam);a.resolutionScale=0.5;a.radius.value=0.9;a.thickness.value=1.2;a.distanceExponent.value=1.4;a.scale.value=1.15;pane.ao=a;
     c=c.mul(L.mix(L.float(1),a.getTextureNode().sample(uv).r,P.aoK));
     pane.vz=L.perspectiveDepthToViewZ(dep,pane.near,pane.far);
     pane.focus=L.perspectiveDepthToViewZ(L.texture(rt.depthTexture,L.vec2(0.5,0.5)).r,pane.near,pane.far).negate().max(0.5);}   // автофокус: центр кадра
   const bl=FX.bloom(em,0.85,0.45,0.0);pane.bloom=bl;c=c.add(bl.getTextureNode().sample(uv).rgb.mul(P.bloomK));
   if(lvl>=2){const d=FX.dof(L.vec4(c,1),pane.vz,pane.focus,L.float(3.2).mul(P.dofK).add(0.001),L.float(1.6).mul(P.dofK));pane.dof=d;c=L.mix(c,d.rgb,P.dofK);}
   const v=uv.sub(0.5).mul(L.vec2(1.0,0.82)),vig=L.float(1).sub(L.dot(v,v).mul(P.vigK).mul(1.6));
   // тонмаппинг уже в материалах сцены — квадрат вывода его не повторяет (_finNoTM)
   const pp=new T.RenderPipeline(renderer);pp.outputNode=L.vec4(L.clamp(c.mul(vig),0,1),1);pp.outputColorTransform=false;pp._quadMesh.material._finNoTM=true;pane.pp=pp;return pane;}
 const V4=new T.Vector4();
 function paneFor(cam,lvl){const vp=renderer.getViewport(V4),w=Math.round(vp.z),h=Math.round(vp.w);
   let p=P.panes.find(q=>q.cam===cam&&q.lvl===lvl);if(p&&(p.w!==w||p.h!==h)){p.pp.dispose();p.rt.dispose();P.panes.splice(P.panes.indexOf(p),1);p=null;}
   if(!p){p=build({cam,lvl,w,h});P.panes.push(p);P.stats.panes=P.panes.length;}return p;}
 {const _rr=renderer.render.bind(renderer);
  renderer.render=function(sc,cam){
    if(P.inPipe)return GP.rawRender(sc,cam);   // квадраты постобработки (тени в углах, свечение, вывод) — мимо обёрток модулей
    const lvl=sc===scene?P.level():0;if(!lvl||renderer.getRenderTarget()!==null)return _rr(sc,cam);
    const p=paneFor(cam,lvl);p.near.value=cam.near;p.far.value=cam.far;
    renderer.setRenderTarget(p.rt);try{_rr(sc,cam);}finally{renderer.setRenderTarget(null);}   // сцена — в текстуру панели, с обёртками модулей
    P.inPipe=true;try{p.pp.render();}finally{P.inPipe=false;}P.frames++;P.stats.lvl=lvl;};}
 // в роликах резкость плавно уходит на передний план; вне роликов — нет
 {const _render=render;render=function(){const want=G.cine&&!FIN.titleOn?1:0;P.dofK.value+=(want-P.dofK.value)*0.08;if(P.dofK.value<0.002)P.dofK.value=0;_render();};}
 FIN.post=P;}
