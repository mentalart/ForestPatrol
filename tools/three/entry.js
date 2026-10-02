// Three r186 для final07: ядро с WebGPURenderer (и запасным WebGL2), TSL и постобработка — одним классическим скриптом в window.THREE.
// Сборка: cd tools/three && npm install && npm run build (см. README.md)
import * as THREE from 'three/webgpu';
import * as TSL from 'three/tsl';
import {ao} from 'three/examples/jsm/tsl/display/GTAONode.js';
import {bloom} from 'three/examples/jsm/tsl/display/BloomNode.js';
import {smaa} from 'three/examples/jsm/tsl/display/SMAANode.js';
import {fxaa} from 'three/examples/jsm/tsl/display/FXAANode.js';
import {traa} from 'three/examples/jsm/tsl/display/TRAANode.js';
import {dof} from 'three/examples/jsm/tsl/display/DepthOfFieldNode.js';
import {godrays} from 'three/examples/jsm/tsl/display/GodraysNode.js';
import {denoise} from 'three/examples/jsm/tsl/display/DenoiseNode.js';
import {film} from 'three/examples/jsm/tsl/display/FilmNode.js';
import {ssr} from 'three/examples/jsm/tsl/display/SSRNode.js';
import {gaussianBlur} from 'three/examples/jsm/tsl/display/GaussianBlurNode.js';
import {CSMShadowNode} from 'three/examples/jsm/csm/CSMShadowNode.js';
window.THREE=Object.assign({},THREE,{TSL,FX:{ao,bloom,smaa,fxaa,traa,dof,godrays,denoise,film,ssr,gaussianBlur,CSMShadowNode}});
