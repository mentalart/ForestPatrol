/* ============================== РЕЛИЗ final07 · ПОСТОБРАБОТКА: мягкие тени в углах, свечение, сглаживание, глубина резкости ============================== */
// Сцена рисуется так же, как в final06 (тонмаппинг r128 — в материалах), но не прямо на холст, а в текстуру прохода сцены
// (по половине экрана в сплите — у каждой половины своя камера и свой проход), и поверх:
//  • сглаживание MSAA 4× в проходе сцены;
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
 // проход сцены размером с панель (половину экрана в сплите), а не с весь холст: AO и глубина резкости считают по камере панели
 class PanePass extends T.PassNode{setSize(w,h){const pr=renderer.getPixelRatio();return super.setSize(Math.max(1,Math.round(this._pw*pr)),Math.max(1,Math.round(this._ph*pr)));}}
 // свечение: излучение материала + материалы, прибавляющие свет (ореолы, искры) — в отдельный канал прохода
 {const so=T.NodeMaterial.prototype.setupOutput;
  T.NodeMaterial.prototype.setupOutput=function(b,out){out=so.call(this,b,out);
    this.mrtNode=b.renderer.getMRT()&&(this.blending===T.AdditiveBlending||this.userData.bloom)?L.mrt({emissive:L.vec4(out.rgb.mul(out.a),1)}):null;   // только в проходе постобработки
    return out;};}
 P.dofK=L.uniform(0);P.aoK=L.uniform(0.55);P.bloomK=L.uniform(1);P.vigK=L.uniform(0.22);
 function build(pane){const {cam,lvl}=pane;
   const sp=new PanePass(T.PassNode.COLOR,scene,cam,{samples:4});sp._pw=pane.w;sp._ph=pane.h;
   sp.setMRT(L.mrt({output:L.output,normal:L.directionToColor(L.normalView),emissive:L.vec4(L.emissive,1)}));
   const uv=L.uv(),col=sp.getTextureNode('output'),em=sp.getTextureNode('emissive');let c=col.sample(uv).rgb;
   if(lvl>=2){const nrm=L.sample(u=>L.colorToDirection(sp.getTextureNode('normal').sample(u)));const a=FX.ao(sp.getTextureNode('depth'),nrm,cam);a.resolutionScale=0.5;a.radius.value=0.6;a.thickness.value=1.2;a.distanceExponent.value=1.4;a.scale.value=1.15;pane.ao=a;
     c=c.mul(L.mix(L.float(1),a.getTextureNode().sample(uv).r,P.aoK));}
   const bl=FX.bloom(em,0.85,0.45,0.0);pane.bloom=bl;c=c.add(bl.getTextureNode().sample(uv).rgb.mul(P.bloomK));
   if(lvl>=2){const vz=sp.getViewZNode(),focus=L.perspectiveDepthToViewZ(sp.getTextureNode('depth').sample(L.vec2(0.5,0.5)).r,L.uniform(cam.near),L.uniform(cam.far)).negate().max(0.5);   // автофокус: центр кадра
     const d=FX.dof(L.vec4(c,1),vz,focus,L.float(3.2).mul(P.dofK).add(0.001),L.float(1.6).mul(P.dofK));pane.dof=d;c=L.mix(c,d.rgb,P.dofK);}
   const v=uv.sub(0.5).mul(L.vec2(1.0,0.82)),vig=L.float(1).sub(L.dot(v,v).mul(P.vigK).mul(1.6));
   const pp=new T.PostProcessing(renderer);pp.outputNode=L.vec4(L.clamp(c.mul(vig),0,1),1);pp.outputColorTransform=false;pane.sp=sp;pane.pp=pp;return pane;}
 const V4=new T.Vector4();
 function paneFor(cam,lvl){const vp=renderer.getViewport(V4),w=Math.round(vp.z),h=Math.round(vp.w);
   let p=P.panes.find(q=>q.cam===cam&&q.lvl===lvl);if(p&&(p.w!==w||p.h!==h)){p.pp.dispose();P.panes.splice(P.panes.indexOf(p),1);p=null;}
   if(!p){p=build({cam,lvl,w,h});P.panes.push(p);P.stats.panes=P.panes.length;}return p;}
 {const _rr=renderer.render.bind(renderer);
  renderer.render=function(sc,cam){
    if(sc!==scene)return P.inPipe||!GP.rawRender?_rr(sc,cam):GP.rawRender(sc,cam);   // свои проходы (квадраты постобработки) — мимо обёрток модулей
    const lvl=P.level();if(!lvl||P.inPipe||renderer.getRenderTarget()!==null)return _rr(sc,cam);
    const p=paneFor(cam,lvl);P.inPipe=true;try{p.pp.render();}finally{P.inPipe=false;}P.frames++;P.stats.lvl=lvl;};}
 // в роликах резкость плавно уходит на передний план; вне роликов — нет
 {const _render=render;render=function(){const want=G.cine&&!FIN.titleOn?1:0;P.dofK.value+=(want-P.dofK.value)*0.08;if(P.dofK.value<0.002)P.dofK.value=0;_render();};}
 FIN.post=P;}
