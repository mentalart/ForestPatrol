/* ============================== РЕЛИЗ final06 · 2-Б: ПОГОНЯ В ГРОЗОВОЙ ВЕЧЕР, КОНИ ДЕШЕВЛЕ В ОТРИСОВКЕ ============================== */
// По разбору мира 2 (выбранные правки c31, c36):
//  1) Погоня — грозовой вечер: небо и туман темнеют до сизо-лилового, свет — низкое закатное солнце; дождь идёт за героями, молнии бьют впереди.
//     У омута (погоня кончилась) свет за две секунды возвращается к дневному, дождь — по этапам, как был. Вал — из сказочной воды гуслей (late_99r, o.magic).
//  2) Водяные кони: у каждого коня ~42 меша — по одному вызову отрисовки. Неподвижные части внутри одной группы-кости (туловище, шея, голова, ноги)
//     склеиваются в один меш на материал (анимированные части — грива, пена — остаются отдельными). Кони вне этапа 2 прячутся.
const K2S={k:0,lt:0,base:null};
// склейка: в каждой группе листовые меши без своих детей, с одним материалом и не упомянутые в объекте коня — в один BufferGeometry (позиции и нормали)
function k2Merge(H){const keep=new Set();const scan=(v,d)=>{if(!v||d>2)return;if(v.isMesh){keep.add(v);return;}if(Array.isArray(v))v.forEach(x=>scan(x,d+1));else if(typeof v==='object'&&!v.isObject3D&&!v.isMaterial)for(const k in v)scan(v[k],d+1);};
  for(const k in H){if(k==='g')continue;const v=H[k];if(v&&v.isMesh)keep.add(v);else if(Array.isArray(v))v.forEach(x=>scan(x,0));}
  const groups=[];H.g.traverse(o=>{if(o.isGroup||o===H.g||o.type==='Object3D')groups.push(o);});
  for(const N of groups){const by=new Map();for(const c of N.children){if(!c.isMesh||c.children.length||keep.has(c)||c.isInstancedMesh||!c.geometry||!c.geometry.attributes.normal)continue;const m=c.material;if(Array.isArray(m))continue;(by.get(m)||by.set(m,[]).get(m)).push(c);}
    for(const[mat,list]of by){if(list.length<2)continue;const P=[],Nn=[];
      for(const c of list){c.updateMatrix();const g=(c.geometry.index?c.geometry.toNonIndexed():c.geometry.clone());g.applyMatrix4(c.matrix);P.push(g.attributes.position.array);Nn.push(g.attributes.normal.array);g.dispose();N.remove(c);}
      const len=P.reduce((a,x)=>a+x.length,0),pa=new Float32Array(len),na=new Float32Array(len);let o=0;for(let i=0;i<P.length;i++){pa.set(P[i],o);na.set(Nn[i],o);o+=P[i].length;}
      const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(pa,3));geo.setAttribute('normal',new THREE.BufferAttribute(na,3));geo.computeBoundingSphere();
      const m=new THREE.Mesh(geo,mat);m.castShadow=list[0].castShadow;m.renderOrder=list[0].renderOrder;N.add(m);}}
  return H;}
if(typeof K2V!=='undefined'&&K2V.horse){const _h=K2V.horse;K2V.horse=function(){const H=_h.apply(this,arguments);try{k2Merge(H);}catch(err){console.error('k2 merge',err);}return H;};}
FIN.k2Merge=k2Merge;
function k2Storm(){K2S.k=0;K2S.lt=rand(3,5);K2S.base={bg:scene.background.clone(),fog:scene.fog?scene.fog.color.clone():null,amb:amb.color.clone(),ai:amb.intensity,sun:sun.color.clone(),si:sun.intensity};
  const B=K2S.base,BG=new THREE.Color(0x3a3c5a),FG=new THREE.Color(0x45476a),AM=new THREE.Color(0x8a8cb4),SU=new THREE.Color(0xffa060),FX=FIN.k2fx;let rainOn=false;
  W.updates.push(dt=>{const D=W.dbg2b?W.dbg2b():null;if(!D)return;const F=D.F,on=!F.chaseDone&&!(F.phase>=1);
    K2S.k=damp(K2S.k,on?1:0,on?3:1.2,dt);const k=K2S.k;
    if(k>0.002||on){scene.background.copy(B.bg).lerp(BG,k);if(scene.fog&&B.fog)scene.fog.color.copy(B.fog).lerp(FG,k);amb.color.copy(B.amb).lerp(AM,k);amb.intensity=lerp(B.ai,B.ai*0.8,k);sun.color.copy(B.sun).lerp(SU,k);sun.intensity=lerp(B.si,B.si*0.65,k);}
    // дождь за героями и молнии впереди — пока идёт погоня
    let z=999;for(const pi of[0,1]){const h=active(pi);if(h)z=Math.min(z,h.pos.z);}
    if(on&&D.WV&&D.WV.on&&!G.cine){if(!rainOn){rainOn=true;FX.rain(true,{c:new V3(0,0,z),box:[24,16,30]});}else if(FX.rainO)FX.rainO.c.set(0,0,z-4);
      K2S.lt-=dt;if(K2S.lt<=0){K2S.lt=rand(4.5,8.5);try{FX.lightning(new V3(rand(-22,22),0,z-rand(24,42)));}catch(e){}}}
    else if(rainOn&&!on){rainOn=false;if(!(F.phase>=2))FX.rain(false);}
    // кони — только в этапе 2 (и в роликах около него)
    if(D.S2&&D.S2.horses&&F.phase>=3&&!G.cine)for(const H of D.S2.horses)if(H.g.visible)H.g.visible=false;});}
FIN.k2Storm=K2S;
{const _b=build2B;build2B=function(){_b();try{k2Storm();}catch(err){console.error('k2 storm',err);}};}
