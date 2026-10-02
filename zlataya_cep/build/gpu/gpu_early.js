/* ============================== РЕЛИЗ final07 · МАТЕРИАЛЫ НА TSL: LOW-POLY, ЭФФЕКТЫ, ВИДИМОСТЬ, КАУСТИКА, ТОНМАППИНГ ============================== */
// Подключается только в final07, сразу после fin_early.js (до поздних модулей). В final06 материалы мира — LowPolyMat (Фонг с плоским
// затенением) + вставки GLSL через onBeforeCompile: тон по вершинам (aShade), эффекты по userData.fx (ветер, свечение, волны, лава,
// трещины 4-Б, свечение пачек), вырез «в горошек» перед героями (late_88), «прозрачные стены» пачек (late_26), каустика под водой
// (late_99c), силуэт-«рентген» героя за стеной. В WebGPU GLSL не вставить — здесь то же самое на TSL, по тем же userData и тем же
// uniforms модулей (код модулей не меняется).
// Порядок как в r128: тонмаппинг (кривая late_10) — в материале, до тумана; кромка выреза — после тумана. Так цвета совпадают с final06.
FIN.ver='final07';FIN.gpu=window.FIN_GPU;
{const T=THREE,L=T.TSL,G=FIN.gpu;
 // ---------- общие узлы ----------
 const uT=()=>G._uT||(G._uT=L.uniform(0).onRenderUpdate(()=>FIN.U.time.value));
 const uGust=()=>G._uG||(G._uG=L.uniform(1).onRenderUpdate(()=>FIN.U.wind.value));
 const perMat=(get,def)=>L.uniform(def).onObjectUpdate(({material})=>{const v=get(material);return v===undefined||v===null?def:v;});
 // кривая late_10: ACES (Нарковича) по яркости, насыщенность сохраняется, блики мягко сворачиваются
 G.exposure=L.uniform(1).onRenderUpdate(()=>G.renderer?G.renderer.toneMappingExposure:1);
 G.toneMap=c0=>{const c=c0.mul(G.exposure),lum=L.max(L.dot(c,L.vec3(0.2126,0.7152,0.0722)),1e-4);
   const t=L.clamp(lum.mul(lum.mul(2.51).add(0.03)).div(lum.mul(lum.mul(2.43).add(0.59)).add(0.14)),0,1);
   const k=L.mix(L.vec3(t),c.mul(t.div(lum)),L.float(1.06).sub(L.smoothstep(0.75,1,t).mul(0.36)));return L.clamp(k,0,1);};
 G.tmInMaterial=true;   // false — тонмаппинг в конце кадра (постобработка, gpu_render.js)
 // ---------- эффекты материалов (userData.fx) ----------
 // pos(m, builder) — до скелета и экземпляров меняет positionLocal; em(m, builder) — добавка к свечению; dif(m, builder) — после цвета
 const FX=FIN.fxNode={};
 FX.wind={};
 // ветер: качание по высоте (локальная y), фаза — по положению объекта (или экземпляра)
 FX.wind.pos=(m,b)=>{const ph=b.object.isInstancedMesh?L.vec2(L.instancedBufferAttribute(b.object.instanceMatrix,'mat4').element(3).x,L.instancedBufferAttribute(b.object.instanceMatrix,'mat4').element(3).z)
     :L.vec2(L.modelWorldMatrix.element(3).x,L.modelWorldMatrix.element(3).z);
   const t=uT(),k=perMat(mm=>mm.userData.wind,0.02),g=uGust(),p=L.positionLocal,h=L.max(0,p.y);
   const s=L.sin(t.mul(1.6).add(ph.x.mul(0.31)).add(ph.y.mul(0.23))).add(L.sin(t.mul(3.1).add(ph.x.mul(0.9)).add(ph.y.mul(0.7))).mul(0.4));
   const a=s.mul(h).mul(h).mul(k).mul(g);L.positionLocal.assign(L.vec3(p.x.add(a),p.y,p.z.add(a.mul(0.55))));};
 FX.glow={em:()=>L.vertexColor().rgb.mul(perMat(mm=>mm.userData.glow,0.85)).mul(L.sin(uT().mul(2.3).add(L.positionView.x.negate().mul(0.7))).mul(0.15).add(0.85))};
 FX.glowHot={em:()=>{const c=L.vertexColor().rgb;return c.mul(L.smoothstep(0.55,0.8,c.r.sub(c.b))).mul(L.sin(uT().mul(1.7).add(L.positionView.x.negate().mul(0.3))).mul(0.2).add(0.9));}};
 FX.bemis={em:(m,b)=>b.geometry.hasAttribute('aEmis')?L.attribute('aEmis','vec3'):null};
 FX.wave={pos:()=>{const p=L.positionLocal,w=L.modelWorldMatrix.mul(L.vec4(p,1)),t=uT(),amp=perMat(mm=>mm.userData.amp,0.06);
   const dz=L.sin(w.x.mul(0.8).add(t.mul(1.5))).mul(0.5).add(L.sin(w.z.mul(1.1).sub(t.mul(1.1))).mul(0.35)).add(L.sin(w.x.add(w.z).mul(0.43).add(t.mul(0.7))).mul(0.45)).mul(amp);
   L.positionLocal.assign(L.vec3(p.x,p.y,p.z.add(dz)));}};
 const lavaB=()=>{const w=L.positionWorld,t=uT();return L.sin(w.x.mul(0.9).add(L.sin(w.z.mul(0.6).add(t.mul(0.8))).mul(1.7)).add(t.mul(1.3))).mul(0.5).add(0.5);};
 FX.lava={emMul:()=>{const b=lavaB();return b.mul(b).mul(0.55).add(0.72);},dif:()=>{L.diffuseColor.rgb.mulAssign(lavaB().mul(0.3).add(0.85));}};
 FX.g4crack={dif:(m,b)=>{if(!b.geometry.hasAttribute('aD'))return;const d=L.attribute('aD','float'),rev=G.g4rev||(G.g4rev=L.uniform(0).onRenderUpdate(()=>typeof G4U!=='undefined'?G4U.rev.value:0));
     L.If(d.greaterThan(rev),()=>{L.Discard();});},
   emMul:(m,b)=>{if(!b.geometry.hasAttribute('aD'))return null;const d=L.attribute('aD','float'),rev=G.g4rev,t=uT();
     return L.sin(d.mul(46).sub(t.mul(3.2))).mul(0.3).add(0.72).add(L.smoothstep(rev.sub(0.06),rev,d).mul(L.step(rev,0.999)).mul(1.4));}};
 FX.g4fall={emMul:()=>{const y=L.positionGeometry.y,t=uT();return L.sin(y.mul(2.4).add(t.mul(6.5))).mul(0.32).add(0.68).add(L.sin(y.mul(7.1).add(t.mul(10))).mul(0.16));}};
 // ---------- вырез «в горошек» (late_88): узлы на общих uniforms OU ----------
 const OUn=()=>G._ou||(G._ou={H:L.uniformArray(OU.H.value,'vec4'),R:L.uniformArray(OU.R.value,'vec4'),F:L.uniformArray(OU.F.value,'vec4'),P:L.uniform(OU.P.value)});
 // в стеке фрагмента: выбивает дырки, возвращает силу тёплой кромки (0…1)
 G.occFrag=function(m,extraCut){const O=OUn(),vW=L.positionWorld,vV=L.positionView,fz=vV.z.negate().toVar();
   const up=L.step(0.8,L.abs(L.normalize(L.cross(L.dFdx(vW),L.dFdy(vW))).y)).toVar();
   const whole=perMat(mm=>mm.userData._occW?mm.userData._occW.value:0,0);
   const cut=(extraCut?L.max(whole,extraCut):whole).mul(up.oneMinus()).toVar();
   L.If(cut.greaterThan(0),()=>{const wl=L.float(0).toVar();
     for(let i=0;i<3;i++){const F=O.F.element(i),fh=F.z.negate();
       L.If(F.w.greaterThan(0).and(fz.lessThanEqual(fh.add(0.5))),()=>{const q=vV.xy.mul(fh.div(L.max(fz,0.05)));wl.assign(L.max(wl,L.smoothstep(0.75,1,L.length(q.sub(F.xy)).div(F.w)).oneMinus()));});}
     cut.mulAssign(wl);});
   for(let i=0;i<2;i++){const H=O.H.element(i),R=O.R.element(i),hz=H.z.negate();
     const ok=H.w.greaterThanEqual(0.003).and(fz.lessThanEqual(hz.sub(R.w))).and(vW.y.greaterThanEqual(R.z.add(0.3))).and(up.lessThanEqual(0.5).or(vW.y.greaterThanEqual(R.z.add(1.2))));
     L.If(ok,()=>{const q=vV.xy.mul(hz.div(L.max(fz,0.05)));cut.assign(L.max(cut,L.smoothstep(0.55,1,L.length(q.sub(H.xy).div(R.xy))).oneMinus().mul(H.w)));});}
   const P=O.P;cut.assign(L.max(cut,L.smoothstep(P.y,P.x,fz).oneMinus().mul(up.oneMinus()).mul(1.4)));
   const rim=L.float(0).toVar();
   L.If(cut.greaterThan(0.004),()=>{const p=L.screenCoordinate.xy.div(P.z).toVar();p.x.addAssign(L.mod(L.floor(p.y),2).mul(0.5));
     const d=L.length(L.fract(p).sub(0.5)),hr=L.sqrt(L.min(cut,1)).mul(0.475);
     L.If(d.lessThan(hr),()=>{L.Discard();});rim.assign(L.min(cut,1).mul(L.smoothstep(hr,hr.add(L.float(1.8).div(P.z)),d).oneMinus()));});
   return rim;};
 G.occRim=(out,rim)=>L.vec4(L.mix(out.rgb,L.vec3(1,0.8,0.45),rim.mul(0.6)),out.a);
 // «прозрачные стены» пачек: сила выреза по номеру стены из текстуры FB (late_26)
 const fadeCut=()=>{const i=L.floor(L.attribute('aFadeI','float').add(0.5));
   return L.texture(FB.tex,L.vec2(L.mod(i,FB_W).add(0.5).div(FB_W),L.floor(i.div(FB_W)).add(0.5).div(FB_H))).r;};
 // ---------- каустика (late_99c): общая сила SEA.U.caus, гладь SEA.U.seaY ----------
 const causU=()=>G._cu||(G._cu={k:L.uniform(0).onRenderUpdate(()=>typeof SEA!=='undefined'&&SEA.U?SEA.U.caus.value:0),y:L.uniform(0).onRenderUpdate(()=>typeof SEA!=='undefined'&&SEA.U?SEA.U.seaY.value:0)});
 const csPat=(p,t)=>{let i=p,c=L.float(1);for(let n=0;n<3;n++){const tt=t.mul(1-3.5/(n+1));
     i=p.add(L.vec2(L.cos(tt.sub(i.x)).add(L.sin(tt.add(i.y))),L.sin(tt.sub(i.y)).add(L.cos(tt.add(i.x)))));
     c=c.add(L.float(1).div(L.length(L.vec2(p.x.div(L.sin(i.x.add(tt)).div(0.005)),p.y.div(L.cos(i.y.add(tt)).div(0.005))))));}
   c=L.float(1.17).sub(L.pow(c.div(3),1.4));return L.pow(L.abs(c),8);};
 G.caustics=(out)=>{const C=causU(),w=L.positionWorld;const n=L.normalize(L.cross(L.dFdx(w),L.dFdy(w)));const up=L.abs(n.y).mul(0.75).add(0.25);
   const dp=L.max(0,C.y.sub(w.y)),dd=L.clamp(C.y.sub(w.y).mul(2),0,1).mul(L.exp(dp.mul(-0.03)));
   const v=csPat(L.mod(w.xz.mul(0.42).add(L.vec2(w.y.mul(0.11),w.y.mul(-0.07))),6.2831853).sub(250),uT().mul(0.5).add(23));
   const add=L.diffuseColor.rgb.mul(L.vec3(0.6,1,0.92)).mul(L.min(v.mul(1.3),1.5)).mul(up).mul(dd).mul(C.k);
   return L.vec4(out.rgb.add(L.select(C.k.greaterThan(0.001),add,L.vec3(0))),out.a);};
 G.causOn=false;   // включает late_99c (мир 2)
 // ---------- общий вывод узловых материалов: каустика → тонмаппинг (как в r128 — до тумана) → туман → кромка выреза ----------
 const so=T.NodeMaterial.prototype.setupOutput;
 T.NodeMaterial.prototype.setupOutput=function(builder,out){
   if(this._finCaus)out=G.caustics(out);
   if(G.tmInMaterial&&G.toneMapping===T.CustomToneMapping&&this.toneMapped!==false&&builder.renderer.getRenderTarget()===null&&!this._finNoTM)out=L.vec4(G.toneMap(out.rgb),out.a);
   out=so.call(this,builder,out);
   if(this._finRim)out=G.occRim(out,this._finRim);
   return out;};
 // ---------- LowPolyMat на TSL ----------
 const occOn=m=>!!FIN.occHook&&!m.userData.noOcc&&!m.skinning;
 class LowPolyMat extends T.MeshPhongNodeMaterial{
   constructor(p){super(Object.assign({specular:0x000000,shininess:0,flatShading:true},p||{}));this.defaultAttributeValues={aShade:[0,0,0]};this.isLowPolyMat=true;}
   fx(){const k=this.userData.fx;return k&&FX[k]||null;}
   setupPosition(b){const f=this.fx();if(f&&f.pos)f.pos(this,b);return super.setupPosition(b);}
   setupDiffuseColor(b){super.setupDiffuseColor(b);
     if(b.geometry.hasAttribute('aShade'))L.diffuseColor.rgb.mulAssign(L.max(L.vec3(0),L.attribute('aShade','vec3').add(1)));
     const f=this.fx();if(f&&f.dif)f.dif(this,b);
     this._finRim=occOn(this)?G.occFrag(this,this.userData.fadeBatch&&b.geometry.hasAttribute('aFadeI')?fadeCut():null):null;
     this._finCaus=G.causOn&&!this.userData.noCaus;}
   setupLighting(b){const f=this.fx(),e0=this.emissiveNode;
     if(f&&(f.em||f.emMul)){let e=e0||L.materialEmissive;if(f.emMul){const k=f.emMul(this,b);if(k)e=L.vec3(e).mul(k);}if(f.em){const a=f.em(this,b);if(a)e=L.vec3(e).add(a);}this.emissiveNode=e;}
     const r=super.setupLighting(b);this.emissiveNode=e0;return r;}
   customProgramCacheKey(){const u=this.userData;return super.customProgramCacheKey()+'|lp'+(u.fx||'')+(occOn(this)?'o':'')+(u.fadeBatch?'f':'')+(G.causOn&&!u.noCaus?'c':'');}}
 T.MeshLambertMaterial=LowPolyMat;FIN.LowPolyMat=LowPolyMat;
 // ---------- неосвещённые материалы: вырез у пачек (late_88), силуэт-«рентген» героя ----------
 const bsd=T.MeshBasicNodeMaterial.prototype.setupDiffuseColor;
 T.MeshBasicNodeMaterial.prototype.setupDiffuseColor=function(b){bsd.call(this,b);const u=this.userData;
   if(u.xray){const n=L.normalize(L.normalView),v=L.normalize(L.positionView.negate()),xr=L.abs(L.dot(n,v)).oneMinus();
     L.diffuseColor.assign(L.vec4(L.diffuseColor.rgb.mul(xr.mul(0.6).add(0.8)),L.diffuseColor.a.mul(L.pow(xr,1.3).mul(0.65).add(0.35))));}
   this._finRim=u.occInit&&!u.noOcc&&FIN.occHook?G.occFrag(this,null):null;};
 // силуэт чуть ближе к камере: герой, едва коснувшийся травы, не вспыхивает
 const bmvp=T.MeshBasicNodeMaterial.prototype.setupModelViewProjection||T.NodeMaterial.prototype.setupModelViewProjection;
 T.MeshBasicNodeMaterial.prototype.setupModelViewProjection=function(b){if(this.userData.xray){const pv=L.positionView;return L.cameraProjectionMatrix.mul(L.vec4(pv.add(L.normalize(pv.negate()).mul(0.28)),1));}return bmvp.call(this,b);};
 const bck=T.MeshBasicNodeMaterial.prototype.customProgramCacheKey;
 T.MeshBasicNodeMaterial.prototype.customProgramCacheKey=function(){const u=this.userData;return bck.call(this)+(u.xray?'|x':'')+(u.occInit&&!u.noOcc?'|o':'');};
 // ---------- переводы ShaderMaterial на TSL: gpu_shaders.js (каталог G.port) ----------
}
