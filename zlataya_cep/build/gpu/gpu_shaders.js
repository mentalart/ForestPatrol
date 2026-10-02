/* ============================== РЕЛИЗ final07 · ПЕРЕВОДЫ ShaderMaterial НА TSL ============================== */
// Модули создают ShaderMaterial с GLSL (небо, удар, щит, огонь, вода…). В final07 конструктор (gpu_compat.js) ищет здесь перевод по
// тексту шейдера: FIN.gpu.port(имя, test(текст, параметры), make(параметры, узлы uniforms)). Узлы uniforms связаны с объектами
// uniforms модуля — код, который пишет u.value, работает как раньше. Черновики переводов делает транспайлер Three
// (examples/jsm/transpiler: GLSL → TSL), дальше — руками: встроенные переменные GLSL, varyings, точки.
// Новый GLSL-шейдер в модуле — добавить перевод сюда (бот tfin_gpu проверяет, что непереведённых нет).
{const T=THREE,L=T.TSL,G=FIN.gpu;
 const has=(...k)=>s=>k.every(x=>s.includes(x));
 const f=x=>typeof x==='number'?L.float(x):x;
 // smoothstep как в GLSL и для «обратных» краёв (a>b)
 const ss=(a,b,x)=>{a=f(a);b=f(b);const t=L.clamp(f(x).sub(a).div(b.sub(a)),0,1);return t.mul(t).mul(L.float(3).sub(t.mul(2)));};
 const hash2=p=>L.fract(L.sin(L.dot(p,L.vec2(127.1,311.7))).mul(43758.5453));
 const hash3=p=>L.fract(L.sin(L.dot(p,L.vec3(12.9898,78.233,37.719))).mul(43758.5453));
 const vnoise2=p=>{const i=L.floor(p),q=L.fract(p),u=q.mul(q).mul(L.vec2(3).sub(q.mul(2)));
   return L.mix(L.mix(hash2(i),hash2(i.add(L.vec2(1,0))),u.x),L.mix(hash2(i.add(L.vec2(0,1))),hash2(i.add(L.vec2(1,1))),u.x),u.y);};
 const vnoise3=p=>{const i=L.floor(p),q=L.fract(p),u=q.mul(q).mul(L.vec3(3).sub(q.mul(2))),h=(x,y,z)=>hash3(i.add(L.vec3(x,y,z)));
   return L.mix(L.mix(L.mix(h(0,0,0),h(1,0,0),u.x),L.mix(h(0,1,0),h(1,1,0),u.x),u.y),L.mix(L.mix(h(0,0,1),h(1,0,1),u.x),L.mix(h(0,1,1),h(1,1,1),u.x),u.y),u.z);};
 const hsv=(h,s,v)=>{const k=L.clamp(L.abs(L.mod(L.vec3(h.mul(6)).add(L.vec3(0,4,2)),6).sub(3)).sub(1),0,1);return L.mix(L.vec3(1),k,s).mul(v);};
 const unlit=fn=>{const m=new T.MeshBasicNodeMaterial();m.fragmentNode=L.Fn(fn)();return m;};
 G.ss=ss;G.hash2=hash2;G.vnoise2=vnoise2;G.vnoise3=vnoise3;G.hsv=hsv;
 // переводы хранят GLSL: модули берут текст у готового материала (титул: vertexShader:skyMat.vertexShader)
 const keep=(m,p)=>{m.vertexShader=p.vertexShader;m.fragmentShader=p.fragmentShader;return m;};

 // ---------- небо (late_10, титул late_60): градиент по высоте и солнечный ореол ----------
 G.port('sky',has('uniform vec3 top,hor,bot,sunCol;uniform vec3 sunDir;'),(p,U)=>keep(unlit(()=>{const d=L.normalize(L.positionLocal),y=d.y;
   const up=L.mix(U.hor,U.top,L.pow(ss(0,0.7,y),0.75)),dn=L.mix(U.hor,U.bot,ss(0,-0.2,y));const c=L.select(y.greaterThan(0),up,dn);
   const s=L.max(L.dot(d,L.normalize(U.sunDir)),0);return L.vec4(c.add(U.sunCol.mul(L.pow(s,48).mul(0.4).add(L.pow(s,5).mul(0.12)))),1);}),p));
 // ---------- небо пролога за окном (late_96b): вспышка, тучи, зелёный отсвет ----------
 G.port('prologSky',has('uniform float flash,cover,green;'),(p,U)=>keep(unlit(()=>{const d=L.normalize(L.positionLocal),y=d.y;
   let c=L.mix(U.hor,U.top,ss(-0.15,0.65,y)).mul(U.cover.mul(0.5).oneMinus());c=L.mix(c,L.vec3(0.25,0.55,0.35),U.green.mul(0.35));
   return L.vec4(c.add(L.vec3(0.75,0.82,1).mul(U.flash)),1);}),p));
 // ---------- стекло окна пролога (late_96b): ночь из текстуры, иней по краям, блик ----------
 G.port('prologDisc',has('uniform sampler2D tex;uniform vec2 res;uniform float frost;'),(p,U)=>keep(unlit(()=>{
   const uv=L.screenUV,vUv=L.uv(),c0=U.tex.sample(uv).rgb,q=vUv.sub(0.5),r=L.length(q).mul(2);
   const sh=ss(0.07,0,L.abs(q.x.add(q.y).sub(0.2))).mul(0.12).add(ss(0.04,0,L.abs(q.x.add(q.y).sub(0.34))).mul(0.07));
   const n=vnoise2(vUv.mul(7)).mul(0.55).add(vnoise2(vUv.mul(19)).mul(0.3)).add(vnoise2(vUv.mul(47)).mul(0.15));
   const fr=U.frost.mul(ss(U.frost.oneMinus().add(0.05),U.frost.oneMinus().add(0.3),r.add(n.sub(0.5).mul(0.55))));
   const a=fr.mul(ss(0.35,0.95,r).mul(0.48).add(0.42)).mul(n.mul(0.3).add(0.85));const sp=L.step(0.985,hash2(L.floor(vUv.mul(140)))).mul(fr);
   let c=L.mix(c0,L.vec3(0.8,0.92,1),L.clamp(a,0,0.92)).add(sp.mul(0.35));c=c.add(sh.mul(fr.oneMinus()));c=c.mul(ss(0.72,1,r).mul(0.28).oneMinus());return L.vec4(c,1);}),p));
 // ---------- удар героев (late_34): лента-полумесяц ----------
 G.port('slash',has('float head=uProg,tail=uProg-uLen'),(p,U)=>keep(unlit(()=>{const uv=L.uv(),u=L.select(U.uDir.greaterThan(0),uv.x,uv.x.oneMinus());
   const head=U.uProg,tail=U.uProg.sub(U.uLen),mid=L.clamp(u.sub(tail).div(L.max(head.sub(tail),1e-3)),0,1),w=L.sin(mid.mul(3.14159)).mul(0.82).add(0.18);
   const band=ss(tail,tail.add(U.uLen.mul(0.45)),u).mul(ss(head.sub(0.01),head.add(0.03),u).oneMinus());
   const v=uv.y.div(w),body=ss(0.86,1,v).oneMinus(),a=band.mul(body).mul(U.uAlpha);L.If(a.lessThan(0.02),()=>{L.Discard();});
   let c=L.mix(U.uCore,U.uCol,ss(0.05,0.6,v));c=L.mix(c,U.uEdge,ss(0.72,0.94,v));
   const lead=ss(head.sub(0.1),head,u).mul(ss(0.55,0.9,v).oneMinus());c=L.mix(c,L.vec3(1,0.99,0.94),lead.mul(0.85));return L.vec4(c,a);}),p));
 // ---------- щит-барьер (late_35, GD): узор героя по полосе ----------
 G.port('guardBar',has('uniform float uWrap;','float bx=uWrap'),(p,U)=>keep(unlit(()=>{const uv=L.uv(),fill=L.float(0).toVar(),line=L.float(0).toVar();
   L.If(U.uKind.lessThan(0.5),()=>{const g=L.vec2(uv.x.mul(7),uv.y.mul(3.2)),id=L.floor(g),q=L.fract(g).sub(0.5),s=L.mod(id.x.add(id.y),2).mul(2).sub(1);
       const a=L.atan(q.y,q.x).add(s.mul(U.uT).mul(1.6)),r=L.length(q),tooth=ss(-0.2,0.2,L.sin(a.mul(8))).mul(0.07).add(0.34);
       fill.assign(L.step(r,tooth).mul(L.step(r,0.1).oneMinus()).mul(0.95));
       line.assign(ss(0.06,0,L.abs(r.sub(tooth))).add(ss(0.03,0,L.abs(r.sub(0.1)))).add(L.step(r,tooth).mul(ss(0.025,0,L.abs(L.sin(a.mul(3))).mul(r))).mul(0.8)));})
    .ElseIf(U.uKind.lessThan(1.5),()=>{const pp=L.vec2(uv.x.mul(11),uv.y.mul(4.4)),R=L.vec2(1,1.7320508),a=L.mod(pp,R).sub(R.mul(0.5)),b=L.mod(pp.sub(R.mul(0.5)),R).sub(R.mul(0.5));
       const gv=L.select(L.dot(a,a).lessThan(L.dot(b,b)),a,b),ap=L.abs(gv),e=L.float(0.5).sub(L.max(L.dot(ap,L.vec2(0.5,0.8660254)),ap.x)),id=pp.sub(gv),h=hash2(L.floor(id.mul(10)));
       const glow=L.step(0.82,h).mul(L.sin(U.uT.mul(3).add(h.mul(20))).mul(0.5).add(0.5));fill.assign(glow.mul(0.45).add(0.35));line.assign(ss(0.07,0,e));})
    .ElseIf(U.uKind.lessThan(2.5),()=>{const g=L.vec2(uv.x.mul(9),uv.y.mul(5)).toVar();g.x.addAssign(L.mod(L.floor(g.y),2).mul(0.5));const c=L.vec2(L.fract(g.x).sub(0.5),L.fract(g.y)),d=L.length(c.mul(L.vec2(1,0.85)));
       fill.assign(ss(0.5,0.53,d).oneMinus().mul(c.y.mul(0.5).add(0.7)));line.assign(ss(0.07,0,L.abs(d.sub(0.5))).mul(L.step(0,c.y)).add(ss(0.02,0,L.abs(c.x)).mul(L.step(0.5,d).oneMinus()).mul(0.7)));})
    .Else(()=>{const g=L.vec2(uv.x.mul(22),uv.y.mul(5)).toVar();g.x.addAssign(L.mod(L.floor(g.y),2).mul(0.5));const c=L.vec2(L.fract(g.x).sub(0.5),L.fract(g.y)),w=c.y.oneMinus().mul(0.42);
       const tri=L.step(L.abs(c.x),w);fill.assign(tri.mul(c.y.mul(0.35).add(0.45)));line.assign(ss(0.05,0,L.abs(L.abs(c.x).sub(w))).mul(L.step(0.02,c.y.oneMinus())).add(ss(0.06,0,c.y.oneMinus()).mul(L.step(L.abs(c.x),0.08))));});
   const bx=L.select(U.uWrap.greaterThan(0.5),L.float(1),L.min(uv.x,uv.x.oneMinus()).mul(14)),by=L.min(uv.y.mul(9),uv.y.oneMinus().mul(14)),b=L.min(bx,by);
   const rim=ss(0.15,0.75,b).oneMinus(),outl=ss(0,0.2,b).oneMinus();
   let c=L.mix(U.uCol,U.uCore,L.clamp(line,0,1).mul(L.select(U.uKind.greaterThan(1.5).and(U.uKind.lessThan(2.5)),L.float(0.55),L.float(1))));c=L.mix(c,U.uCore,rim.mul(0.8));c=L.mix(c,U.uEdge,outl);
   const a=L.clamp(fill.mul(0.55).add(line.mul(0.95)).add(rim.mul(0.9)),0,1).toVar();const d=L.distance(uv,L.vec2(0.5,0.45)),wave=U.uHit.mul(ss(0.1,0,L.abs(d.sub(U.uHit.oneMinus().mul(0.85)))));
   c=L.mix(c,L.vec3(1),wave.mul(0.9));a.assign(L.max(a,wave));c=L.mix(c,L.vec3(1,0.9,0.45),U.uPerf.mul(0.75));a.assign(L.max(a,U.uPerf.mul(0.8).mul(fill.add(0.5))));
   const sp=L.select(U.uSp.lessThan(0.25),L.sin(U.uT.mul(28)).mul(0.4).add(0.6),L.float(1));a.mulAssign(U.uA.mul(U.uSp.mul(0.5).add(0.5)).mul(sp));L.If(a.lessThan(0.015),()=>{L.Discard();});return L.vec4(c,a);}),p));
 // ---------- круглый щит (late_35, GR): полотно, обод, умбон, свечение ----------
 G.port('guardRound',has('uniform float uOpen;','uniform vec3 uBoss;'),(p,U)=>keep(unlit(()=>{const vP=L.positionGeometry.div(U.uR),vN=L.normalView,vV=L.positionView.negate();
   const N=L.normalize(L.select(L.frontFacing,vN,vN.negate())),pp=vP.xy,r=L.length(pp),a=L.atan(pp.x,pp.y.negate()),aa=L.abs(a).div(3.14159265);
   const op=U.uOpen.mul(1.08),vis=ss(op.sub(0.03),op,aa).oneMinus();L.If(vis.lessThan(0.01),()=>{L.Discard();});
   const sweep=ss(0,0.07,L.abs(aa.sub(op).add(0.02))).oneMinus().mul(L.step(U.uOpen,0.985));const c=L.vec3(0).toVar(),al=L.float(0).toVar();
   L.If(U.uPart.lessThan(0.5),()=>{const fill=L.float(0).toVar(),line=L.float(0).toVar();
       L.If(U.uKind.lessThan(0.5),()=>{const ra=L.atan(pp.y,pp.x),spk=ss(0.06,0,L.abs(L.sin(ra.add(U.uT.mul(0.6)).mul(3))).mul(r)).mul(L.step(0.2,r)).mul(L.step(r,0.8));
           const rr=ra.sub(U.uT.mul(1.4)),tooth=ss(-0.3,0.3,L.sin(rr.mul(10))).mul(0.05).add(0.42),ring=ss(0.035,0,L.abs(r.sub(tooth))).add(ss(0.03,0,L.abs(r.sub(0.3))));
           const inner=L.step(r,tooth).mul(L.step(r,0.3).oneMinus());fill.assign(inner.mul(0.25).add(0.55));line.assign(ring.add(spk.mul(0.9)).add(ss(0.03,0,L.abs(r.sub(0.86)))));})
        .ElseIf(U.uKind.lessThan(1.5),()=>{const q=pp.mul(4.2),R=L.vec2(1,1.7320508),h1=L.mod(q,R).sub(R.mul(0.5)),h2=L.mod(q.sub(R.mul(0.5)),R).sub(R.mul(0.5));
           const gv=L.select(L.dot(h1,h1).lessThan(L.dot(h2,h2)),h1,h2),ap=L.abs(gv),e=L.float(0.5).sub(L.max(L.dot(ap,L.vec2(0.5,0.8660254)),ap.x)),id=q.sub(gv),hh=hash2(L.floor(id.mul(10).add(0.5)));
           const glow=L.step(0.72,hh).mul(L.sin(U.uT.mul(2.6).add(hh.mul(20))).mul(0.5).add(0.5));fill.assign(hh.mul(0.2).add(0.62).add(glow.mul(0.35)));line.assign(ss(0.08,0,e));})
        .Else(()=>{const sa=a.div(6.2831853).add(0.5).mul(12),k=L.fract(sa).sub(0.5),w=L.sin(L.clamp(r,0,1).mul(3.14159*0.95).add(0.1)).mul(0.42),fe=L.step(L.abs(k),w);
           fill.assign(fe.mul(r.mul(0.45).add(0.5)));
           line.assign(ss(0.06,0,L.abs(L.abs(k).sub(w))).mul(L.step(0.18,r)).add(ss(0.035,0,L.abs(k)).mul(L.step(0.15,r)).mul(0.8)).add(ss(0.05,0,L.abs(L.fract(r.mul(7).add(L.abs(k).mul(1.5))).sub(0.5)).mul(L.abs(k)).mul(2)).mul(fe).mul(0.35)));});
       c.assign(L.mix(U.uCol2,U.uCol,L.clamp(fill.mul(0.65).add(0.35),0,1)));c.assign(L.mix(c,U.uCore,L.clamp(line,0,1).mul(0.85)));
       const lit=L.max(0,L.dot(N,L.normalize(L.vec3(-0.35,0.65,0.7)))).mul(0.3).add(0.8),fr=L.pow(L.abs(L.dot(N,L.normalize(vV))).oneMinus(),2);
       c.mulAssign(lit);c.addAssign(U.uCore.mul(fr).mul(0.25));c.assign(L.mix(c,U.uRim,ss(0.8,0.98,r).mul(0.7)));al.assign(line.mul(0.16).add(0.84));})
    .ElseIf(U.uPart.lessThan(1.5),()=>{c.assign(L.mix(U.uRim,U.uEdge,ss(0.96,1.1,r).mul(0.85)));c.mulAssign(L.max(0,L.dot(N,L.normalize(L.vec3(-0.3,0.7,0.6)))).mul(0.4).add(0.8));
       c.addAssign(U.uCore.mul(0.35).mul(L.pow(L.max(0,L.dot(N,L.normalize(vV))),8)));al.assign(1);})
    .ElseIf(U.uPart.lessThan(2.5),()=>{const n=L.normalize(vN),lit=L.max(0,L.dot(n,L.normalize(L.vec3(-0.3,0.7,0.6)))).mul(0.5).add(0.7);
       c.assign(U.uBoss.mul(lit).add(U.uCore.mul(0.5).mul(L.pow(L.max(0,L.dot(n,L.normalize(vV))),12))));c.assign(L.mix(c,L.vec3(1),L.sin(U.uT.mul(3)).mul(0.5).add(0.5).mul(0.25)));al.assign(1);})
    .Else(()=>{const g=ss(1.02,1.4,r).oneMinus().mul(ss(0.95,1.04,r));c.assign(L.mix(U.uRim,U.uCore,0.35).mul(L.sin(U.uT.mul(4).add(a.mul(3))).mul(0.2).add(0.8)));al.assign(g.mul(0.55));});
   c.assign(L.mix(c,U.uCore,sweep.mul(0.9)));c.addAssign(L.vec3(1,0.95,0.7).mul(sweep).mul(0.35));
   const wave=U.uHit.mul(ss(0.09,0,L.abs(r.sub(U.uHit.oneMinus().mul(1.05)))));c.assign(L.mix(c,L.vec3(1),wave.mul(0.85)));c.assign(L.mix(c,L.vec3(1,0.9,0.45),U.uPerf.mul(0.6)));
   const sp=L.select(U.uSp.lessThan(0.25),L.sin(U.uT.mul(28)).mul(0.4).add(0.6),L.float(1));al.mulAssign(U.uA.mul(vis).mul(U.uSp.mul(0.45).add(0.55)).mul(sp));
   L.If(al.lessThan(0.015),()=>{L.Discard();});return L.vec4(c,al);}),p));
 // ---------- огонь Потапа (late_36): пламя на кулаках и огненный серп ----------
 G.port('potapFlame',has('uniform float uK;','float pfN(vec3 p)'),(p,U)=>keep(unlit(()=>{const vP=L.positionGeometry,vN=L.normalView,vV=L.positionView.negate();
   const fr=L.abs(L.dot(L.normalize(vN),L.normalize(vV))).oneMinus();
   const n=vnoise3(vP.mul(11).add(L.vec3(0,U.uT.mul(-7),0))).mul(0.6).add(vnoise3(vP.mul(23).add(L.vec3(0,U.uT.mul(-11),0))).mul(0.4)),up=L.clamp(vP.y.mul(3).add(0.5),0,1);
   const a=n.mul(0.8).add(0.3).mul(fr.mul(0.55).oneMinus()).mul(up.mul(0.35).oneMinus()).mul(U.uK);L.If(a.lessThan(0.02),()=>{L.Discard();});
   let c=L.mix(L.vec3(0.95,0.3,0.03),L.vec3(1,0.72,0.16),n);c=L.mix(c,L.vec3(1,0.92,0.6),fr.oneMinus().mul(0.55));return L.vec4(c,L.min(0.95,a));}),p));
 G.port('potapClaw',has('uniform float uHaze;'),(p,U)=>keep(unlit(()=>{const uv=L.uv(),u=uv.x,v=uv.y,head=U.uProg,tail=U.uProg.sub(U.uLen);
   const n=vnoise3(L.vec3(u.mul(16).sub(U.uT.mul(9)),v.mul(5),U.uT.mul(2)));const out=L.vec4(0).toVar();
   L.If(U.uHaze.greaterThan(0.5),()=>{const bh=ss(tail,tail.add(U.uLen.mul(0.55)),u).mul(ss(head.sub(0.05),head.add(0.03),u).oneMinus());
       const a=bh.mul(L.pow(L.sin(v.mul(3.14159)),0.7)).mul(n.mul(0.22).add(0.24)).mul(U.uAlpha);L.If(a.lessThan(0.01),()=>{L.Discard();});out.assign(L.vec4(L.mix(L.vec3(1,0.42,0.05),L.vec3(1,0.7,0.18),n),a));})
    .Else(()=>{const mid=L.clamp(u.sub(tail).div(L.max(head.sub(tail),1e-3)),0,1),w=L.pow(L.sin(L.clamp(L.pow(mid,1.5).mul(0.92).add(0.04),0,1).mul(3.14159)),1.1).mul(0.93).add(0.07);
       const d=v.oneMinus().div(w),body=ss(n.mul(0.2).add(0.8),n.mul(0.2).add(1),d).oneMinus(),t=v.mul(2.999),k=L.floor(t),fq=L.fract(t),cf=ss(0.22,0.7,mid);
       const tine=L.select(k.greaterThan(1.5),ss(0.72,0.96,fq.oneMinus()).oneMinus(),ss(0.04,0.28,fq).mul(ss(0.72,0.96,fq).oneMinus()));
       const hk=head.sub(L.float(2).sub(k).mul(0.045)),band=ss(tail,tail.add(0.08),u).mul(ss(hk,hk.add(0.025),u).oneMinus()),a=band.mul(body).mul(L.mix(1,tine,cf)).mul(U.uAlpha);
       L.If(a.lessThan(0.015),()=>{L.Discard();});
       let c=L.mix(L.vec3(1,0.99,0.9),L.vec3(1,0.88,0.38),ss(0.05,0.4,d));c=L.mix(c,L.vec3(1,0.52,0.1),ss(0.42,0.75,d));c=L.mix(c,L.vec3(0.75,0.14,0.03),ss(0.8,1,d));
       const tc=L.abs(fq.sub(0.5)).mul(2).oneMinus();c=L.mix(c,L.mix(L.vec3(1,0.45,0.06),L.vec3(1,0.95,0.72),ss(0.25,0.85,tc)),cf.mul(0.8));
       c=L.mix(c,L.vec3(1,0.98,0.86),ss(hk.sub(0.12),hk,u).mul(0.6).mul(cf));out.assign(L.vec4(c,a));});
   return out;}),p));
 // ---------- лучи под водой (late_99c) и течение (late_99d) ----------
 G.port('seaShaft',has('uniform float uPh;uniform vec3 uC;'),(p,U)=>keep(unlit(()=>{const uv=L.uv(),x=L.abs(uv.x.sub(0.5)).mul(2),e=ss(0.25,1,x).oneMinus();
   const v=ss(0,0.05,uv.y).mul(uv.y.mul(0.6).add(0.4)),n=L.sin(uv.y.mul(7).add(U.uT.mul(0.7)).add(U.uPh)).mul(L.sin(uv.x.mul(6).sub(U.uT.mul(0.45)).add(U.uPh.mul(1.7)))).mul(0.4).add(0.6);
   return L.vec4(U.uC.mul(e).mul(v).mul(n).mul(U.uO),1);}),p));
 G.port('current',has('float s=fract(p.y-uT*0.9*uDir)'),(p,U)=>keep(unlit(()=>{const uv=L.uv(),pp=uv.mul(U.uRep),s=L.fract(pp.y.sub(U.uT.mul(0.9).mul(U.uDir)));
   const ch=ss(0,0.18,L.abs(s.sub(0.5).sub(L.abs(L.fract(pp.x).sub(0.5)).mul(0.6)))).oneMinus();
   const e=ss(0,0.12,uv.x).mul(ss(1,0.88,uv.x)).mul(ss(0,0.06,uv.y)).mul(ss(1,0.94,uv.y));return L.vec4(L.vec3(0.85,1,1).mul(ch).mul(e).mul(U.uO),1);}),p));
 // ---------- сказочная вода гуслей (late_99l): толща и гладь ----------
 const mwView=()=>({vW:L.positionWorld,vN:L.normalWorld,vV:L.cameraPosition.sub(L.positionWorld)});
 G.port('mwBox',has('uniform float uOp;uniform float uLevel;uniform float uFloor;'),(p,U)=>keep(unlit(()=>{const {vW,vN,vV}=mwView();L.If(vN.y.greaterThan(0.5),()=>{L.Discard();});
   const n=L.normalize(vN),v=L.normalize(vV),fr=L.pow(L.abs(L.dot(n,v)).oneMinus(),1.5);
   const hue=L.sin(vW.x.mul(0.31).add(U.uT.mul(0.45))).mul(0.13).add(0.5).add(L.sin(vW.z.mul(0.27).sub(U.uT.mul(0.38))).mul(0.11)).add(fr.mul(0.3)).add(vW.y.mul(0.05));
   const rb=hsv(L.fract(hue),0.45,1),sw=L.sin(vW.y.mul(2.6).sub(U.uT.mul(1.7)).add(L.sin(vW.x.mul(0.7).add(U.uT.mul(0.6))).mul(1.4)).add(L.sin(vW.z.mul(0.6).sub(U.uT.mul(0.5))).mul(1.4))).mul(0.5).add(0.5);
   const d=L.clamp(U.uLevel.sub(vW.y).div(L.max(0.3,U.uLevel.sub(U.uFloor))),0,1),base=L.mix(L.vec3(0.48,0.86,1),L.vec3(0.34,0.36,0.9),d);
   const col=L.mix(base,rb,fr.mul(0.4).add(0.42)).add(L.vec3(1,0.9,0.7).mul(L.pow(sw,3)).mul(0.18)),a=U.uOp.mul(fr.mul(0.6).add(0.55)).add(L.pow(sw,3).mul(0.07));
   return L.vec4(col,L.clamp(a,0,0.92));}),p));
 G.port('mwTop',has('uniform vec2 uMin;uniform vec2 uMax;','float net='),(p,U)=>keep(unlit(()=>{const {vW,vN,vV}=mwView();const n=L.normalize(vN),v=L.normalize(vV),fr=L.pow(L.abs(L.dot(n,v)).oneMinus(),1.4);
   const pp=vW.xz.mul(0.55),q=pp.add(L.vec2(U.uT.mul(0.25),U.uT.mul(-0.18)));
   const c=L.abs(L.sin(q.x.mul(2.1).add(L.sin(q.y.mul(1.7).add(U.uT.mul(0.8))).mul(1.3)))).add(L.abs(L.sin(q.y.mul(2.3).add(L.sin(q.x.mul(1.9).sub(U.uT.mul(0.7))).mul(1.2)))));
   const net=L.pow(L.max(0,c.mul(0.5).oneMinus()),6),hue=L.sin(pp.x.mul(0.6).add(U.uT.mul(0.5))).mul(0.16).add(0.52).add(L.sin(pp.y.mul(0.5).sub(U.uT.mul(0.4))).mul(0.13)).add(fr.mul(0.3));
   const rb=hsv(L.fract(hue),0.5,1),g=vW.xz.mul(2.6),r=hash2(L.floor(g)),tw=L.step(0.93,r).mul(L.pow(L.sin(U.uT.mul(4).add(r.mul(40))).mul(0.5).add(0.5),8));
   const sp=tw.mul(ss(0.2,0,L.length(L.fract(g).sub(0.5)))),ex=L.min(vW.x.sub(U.uMin.x),U.uMax.x.sub(vW.x)),ez=L.min(vW.z.sub(U.uMin.y),U.uMax.y.sub(vW.z)),rim=ss(0.7,0,L.min(ex,ez));
   const col=L.mix(L.vec3(0.42,0.78,0.95),rb,0.62).mul(0.92).add(L.vec3(1,0.95,0.82).mul(net).mul(0.45)).add(L.vec3(1,0.86,0.45).mul(sp).mul(1.4)).add(L.vec3(0.95,0.85,1).mul(rim).mul(0.3));
   return L.vec4(col,L.clamp(fr.mul(0.2).add(0.3).add(net.mul(0.2)).add(sp.mul(0.5)).add(rim.mul(0.2)),0,0.95));}),p));
 // ---------- точки с шейдером: спрайт с экземплярами (gpu_compat.js), атрибуты точек — по экземпляру ----------
 class PtsPort extends T.PointsNodeMaterial{
   constructor(build){super();this._build=build;this._gpCustom=true;this.sizeAttenuation=false;}
   setup(b){const g=this._gpGeo;if(g&&this._builtFor!==g){this._builtFor=g;const at=n=>g.attributes[n]?G.instAttr(g.attributes[n]):null;this._build(this,at);}return super.setup(b);}
   customProgramCacheKey(){return super.customProgramCacheKey()+'|pts'+(this._builtFor?this._builtFor.id:'');}}
 // светлячки-ореолы (late_27): размер — атрибут size, цвет — color, мягкое пятно
 G.port('glowPts',has('gl_PointSize=size*uScale/max(0.5,-mv.z)'),(p,U)=>keep(new PtsPort((m,at)=>{const pos=at('position'),col=at('color')||L.vec3(1),sz=at('size')||L.float(1);
   m.positionNode=pos;const mvz=L.modelViewMatrix.mul(L.vec4(pos,1)).z;m.sizeNode=sz.mul(U.uScale).div(L.max(0.5,mvz.negate())).div(L.screenDPR);
   const vC=L.varying(L.vec3(col));m.fragmentNode=L.Fn(()=>{const d=L.uv().sub(0.5),r=L.dot(d,d).mul(4),a=L.exp(r.mul(-3.2)).mul(r.oneMinus());L.If(a.lessThanEqual(0),()=>{L.Discard();});return L.vec4(vC.mul(a),1);})();}),p));
 // искры сказочной воды (late_99l): положение — из seed и времени, поднимаются в толще
 G.port('mwPts',has('attribute vec3 seed;','uniform float uPx;'),(p,U)=>keep(new PtsPort((m,at)=>{const seed=at('seed')||L.vec3(0.5);
   const h=L.max(0,U.uLevel.sub(U.uFloor)),s=seed.y.mul(0.35).add(0.25),y=U.uFloor.add(L.mod(seed.z.mul(7).add(U.uT.mul(s)),L.max(h,0.01)));
   const P=L.vec3(L.mix(U.uMin.x,U.uMax.x,seed.x).add(L.sin(U.uT.mul(0.8).add(seed.z.mul(30))).mul(0.3)),y,L.mix(U.uMin.y,U.uMax.y,L.fract(seed.x.mul(7.13).add(seed.y.mul(3.1)))).add(L.cos(U.uT.mul(0.7).add(seed.x.mul(20))).mul(0.3)));
   m.positionNode=P;const mvz=L.cameraViewMatrix.mul(L.vec4(P,1)).z,tw=L.sin(U.uT.mul(3).add(seed.x.mul(50))).mul(0.5).add(0.5);
   m.sizeNode=L.min(14,U.uPx.mul(seed.y.mul(0.8).add(0.6)).mul(tw.mul(0.4).add(0.6)).div(L.max(1,mvz.negate()))).div(L.screenDPR);
   const vA=L.varying(L.step(0.05,h).mul(ss(0,0.3,y.sub(U.uFloor))).mul(ss(0,0.4,U.uLevel.sub(y))).mul(tw.mul(0.55).add(0.45))),vC=L.varying(L.mix(L.vec3(1,0.88,0.5),L.vec3(0.75,1,1),seed.y));
   m.fragmentNode=L.Fn(()=>{const d=L.length(L.uv().sub(0.5)),a=ss(0.5,0,d).mul(vA);L.If(a.lessThan(0.01),()=>{L.Discard();});return L.vec4(vC.mul(ss(0.25,0,d).add(1)),a);})();}),p));
 // ---------- театр теней (late_39): вершина героя — по лучу от фонаря на стену-цилиндр или пол ----------
 G.port('epiShadow',has('uniform vec3 uL;uniform float uR;varying float vOk;'),(p,U)=>{const m=new T.MeshBasicNodeMaterial();
   const proj=()=>{const wp=L.modelWorldMatrix.mul(L.vec4(L.positionLocal,1)).xyz,D=wp.sub(U.uL),a=D.x.mul(D.x).add(D.z.mul(D.z)),b=U.uL.x.mul(D.x).add(U.uL.z.mul(D.z)).mul(2),c=U.uL.x.mul(U.uL.x).add(U.uL.z.mul(U.uL.z)).sub(U.uR.mul(U.uR));
     const tw=L.select(a.greaterThan(1e-7),b.negate().add(L.sqrt(L.max(b.mul(b).sub(a.mul(c).mul(4)),0))).div(a.mul(2)),L.float(1e5)),tf=L.select(D.y.lessThan(-1e-5),L.float(0.045).sub(U.uL.y).div(D.y),L.float(1e5));
     const floor=tf.lessThan(tw),P=L.select(floor,U.uL.add(D.mul(tf)),U.uL.add(D.mul(tw)));
     const okF=P.z.greaterThan(7.4).or(L.abs(P.x).greaterThan(7.1)),okW=P.z.greaterThan(0.05).or(P.y.greaterThan(11));
     return {P,ok:L.select(floor,L.select(okF,L.float(0),L.float(1)),L.select(okW,L.float(0),L.float(1))),fl:L.select(floor,L.float(1),L.float(0))};};
   m.vertexNode=L.Fn(()=>L.cameraProjectionMatrix.mul(L.cameraViewMatrix).mul(L.vec4(proj().P,1)))();
   const vOk=L.varying(L.Fn(()=>proj().ok)()),vF=L.varying(L.Fn(()=>proj().fl)());
   m.fragmentNode=L.Fn(()=>{L.If(vOk.lessThan(0.5),()=>{L.Discard();});return L.vec4(L.mix(L.vec3(0.12,0.074,0.058),L.vec3(0.10,0.06,0.04),vF),U.uA.mul(L.mix(0.93,0.55,vF)));})();
   return keep(m,p);});
}
