# Three.js для final07

Релиз `final07` рисует через `WebGPURenderer` из Three.js r186; где WebGPU нет, тот же рендерер работает через WebGL2.
Страница одна и работает офлайн, поэтому Three.js встроен в неё: `zlataya_cep/build/three.r186.webgpu.min.js` — один
классический скрипт, он кладёт всё в `window.THREE`:
- ядро и `WebGPURenderer`, узловые материалы;
- `THREE.TSL` — язык шейдеров Three (функции `Fn`, `uniform`, `positionLocal`…);
- `THREE.FX` — постобработка из `examples/jsm/tsl/display` (GTAO, bloom, SMAA, FXAA, TRAA, глубина резкости, лучи, SSR) и
  каскадные тени `CSMShadowNode`.

Пересобрать (например, при обновлении версии):
```sh
cd tools/three && npm install && npm run build
```
Версии закреплены в `package.json`. `node_modules` в git не кладётся.
