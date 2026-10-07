/* ============================== РЕЛИЗ final06 · УТЕЧКА ПАМЯТИ ПРИ СМЕНЕ УРОВНЯ (аудит, бот tsec_sweep) ==============================
   newWorld() только снимал W.group со сцены: геометрии и текстуры прежнего мира оставались у WebGL (renderer.info.memory) и в куче JS
   (рендерер держит каждую геометрию, пока её не освободят). Круг «Лукоморье → уровень → Лукоморье» добавлял ≈280 геометрий и 2–3 текстуры на загрузку:
   за 10 кругов по четырём мирам — +17 тыс. геометрий, +160 текстур, +35 МБ кучи. Теперь сразу после замены мира геометрии и текстуры старого освобождаются.
   Освобождаем и прежние наряды героев (loadLevel). Не трогаем: всё, что осталось в сцене (герои, свет, небо, новый мир), материалы (их шейдеры не пересобираются) и текстуры не из картинки/холста
   (цели рендера). Освобождённое, если оно ещё нужно (общий кэш), три.js загрузит заново при следующей отрисовке. */
{const own=t=>{const i=t.image;return !!i&&(i instanceof HTMLCanvasElement||i instanceof HTMLImageElement||(typeof ImageBitmap!=='undefined'&&i instanceof ImageBitmap));};
  const collect=(o,skip,S)=>{if(o===skip)return;if(o.geometry)S.g.add(o.geometry);const m=o.material;
    if(m)for(const x of(Array.isArray(m)?m:[m])){for(const k in x){const v=x[k];if(v&&v.isTexture)S.t.add(v);}
      if(x.uniforms)for(const k in x.uniforms){const v=x.uniforms[k]&&x.uniforms[k].value;if(v&&v.isTexture)S.t.add(v);}}
    for(const c of o.children)collect(c,skip,S);};
  const _nw=newWorld;
  newWorld=function(){const old=W&&W.group;_nw();if(!old)return;
    try{const keep={g:new Set(),t:new Set()},die={g:new Set(),t:new Set()};collect(scene,old,keep);collect(old,null,die);
      for(const g of die.g)if(!keep.g.has(g))g.dispose();
      for(const t of die.t)if(!keep.t.has(t)&&own(t))t.dispose();}
    catch(e){console.warn('dispose_world',e);}};
  // то же для героев: applyOutfits()/applyVest() при каждой загрузке уровня надевают на них новые наряды (холсты-текстуры, геометрии), прежние оставались у WebGL
  const heroRes=()=>{const S={g:new Set(),t:new Set()};for(const h of HEROES)if(h.g)collect(h.g,null,S);return S;};
  const _ll=loadLevel;
  loadLevel=function(i){const B=heroRes();_ll(i);
    try{const A=heroRes();for(const g of B.g)if(!A.g.has(g))g.dispose();for(const t of B.t)if(!A.t.has(t)&&own(t))t.dispose();}
    catch(e){console.warn('dispose_heroes',e);}};}
