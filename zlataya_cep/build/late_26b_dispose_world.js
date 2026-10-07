/* ============================== РЕЛИЗ final06 · УТЕЧКА ПАМЯТИ ПРИ СМЕНЕ УРОВНЯ (аудит, бот tsec_sweep) ==============================
   newWorld() только снимал W.group со сцены, а модули (фон, наряды героев) подменяли свои объекты: геометрии и текстуры ушедших объектов оставались у WebGL
   (renderer.info.memory) и в куче JS (рендерер держит каждую геометрию, пока её не освободят). Круг «Лукоморье → уровень → Лукоморье» добавлял ≈280 геометрий
   и 2–3 текстуры на загрузку: за 10 кругов по четырём мирам — +17 тыс. геометрий, +160 текстур, +35 МБ кучи JS.
   Теперь вокруг loadLevel снимаются геометрии и текстуры всего, что есть в сцене, и всё, что после загрузки из сцены пропало, освобождается
   (геометрии; текстуры из картинки/холста/данных, в том числе костяные текстуры скелетов героев). Остальное не трогаем: материалы (шейдеры не пересобираются)
   и цели рендера. Если освобождённое ещё нужно (общий кэш, пул), три.js сам загрузит его заново при следующей отрисовке. */
{const own=t=>{const i=t.image;return !!i&&(i.data!==undefined||i instanceof HTMLCanvasElement||i instanceof HTMLImageElement||(typeof ImageBitmap!=='undefined'&&i instanceof ImageBitmap));};
  const collect=(o,S)=>{if(o.geometry)S.g.add(o.geometry);if(o.isSkinnedMesh&&o.skeleton&&o.skeleton.boneTexture)S.t.add(o.skeleton.boneTexture);const m=o.material;
    if(m)for(const x of(Array.isArray(m)?m:[m])){for(const k in x){const v=x[k];if(v&&v.isTexture)S.t.add(v);}
      if(x.uniforms)for(const k in x.uniforms){const v=x.uniforms[k]&&x.uniforms[k].value;if(v&&v.isTexture)S.t.add(v);}}
    for(const c of o.children)collect(c,S);};
  const res=()=>{const S={g:new Set(),t:new Set()};collect(scene,S);return S;};
  const _ll=loadLevel;
  loadLevel=function(i){const B=res();_ll(i);
    try{const A=res();for(const g of B.g)if(!A.g.has(g))g.dispose();for(const t of B.t)if(!A.t.has(t)&&own(t))t.dispose();}
    catch(e){console.warn('dispose_world',e);}};}
