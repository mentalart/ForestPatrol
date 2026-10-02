//@@ wait=3000
// релиз final07 (WebGPU): каждый уровень рисуется на настоящем WebGPU без ошибок устройства и без непереведённых шейдеров.
// Уровни по очереди (ролики пропускаются), по кадру с каждого — tools/tests/shots/gpu_NN.png (сверка с final06 — глазами
// или tools/tests/gpu_parity.py). В конце: FIN_GPU.backend === 'webgpu', список FIN_GPU.missing пуст, ошибок консоли нет.
// На final06 (без FIN_GPU) бот только снимает те же кадры — для сверки (tools/tests/gpu_parity.py); проверки — в final07.
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,300));ce(...a);};}
window.addEventListener('error',e=>window._errs.push('ERR '+String(e.message)));
window.FIN_GPU=window.FIN_GPU||{missing:[],none:true};
window.GOi=k=>{const L=ZC.LEVELS[k];if(!L)return 'нет уровня '+k;ZC.startFrom(k);ZC.G.manual=true;ZC.tick(30);for(let j=0;j<6;j++){for(let i=0;i<20&&ZC.G.cine;i++){ZC.skip();ZC.tick(5);}ZC.tick(15);}ZC.tick(60);
  const lv=document.getElementById('level');if(lv){lv.style.transition='none';lv.style.opacity=0;}return L.id+' errs='+_errs.length+' missing='+FIN_GPU.missing.length;};
'backend='+(FIN_GPU.backend||'webgl r128')+' levels='+ZC.LEVELS.length
//@@ shot=gpu_00.png
GOi(0)
//@@ shot=gpu_01.png
GOi(1)
//@@ shot=gpu_02.png
GOi(2)
//@@ shot=gpu_03.png
GOi(3)
//@@ shot=gpu_04.png
GOi(4)
//@@ shot=gpu_05.png
GOi(5)
//@@ shot=gpu_06.png
GOi(6)
//@@ shot=gpu_07.png
GOi(7)
//@@ shot=gpu_08.png
GOi(8)
//@@ shot=gpu_09.png
GOi(9)
//@@ shot=gpu_10.png
GOi(10)
//@@ shot=gpu_11.png
GOi(11)
//@@ shot=gpu_12.png
GOi(12)
//@@ shot=gpu_13.png
GOi(13)
//@@ shot=gpu_14.png
GOi(14)
//@@ shot=gpu_15.png
GOi(15)
//@@ shot=gpu_16.png
GOi(16)
//@@ shot=gpu_17.png
GOi(17)
//@@ shot=gpu_18.png
GOi(18)
//@@ shot=gpu_19.png
GOi(19)
//@@ shot=gpu_20.png
GOi(20)
//@@ shot=gpu_21.png
GOi(21)
//@@ shot=gpu_22.png
GOi(22)
//@@ shot=gpu_23.png
GOi(23)
//@@ shot=gpu_24.png
GOi(24)
//@@ shot=gpu_25.png
GOi(25)
//@@ shot=gpu_26.png
GOi(26)
//@@ shot=gpu_27.png
GOi(27)
//@@ shot=gpu_28.png
GOi(28)
//@@ shot=gpu_29.png
GOi(29)
//@@ shot=gpu_30.png
GOi(30)
//@@ shot=gpu_31.png
GOi(31)
//@@ shot=gpu_32.png
GOi(32)
//@@ shot=gpu_33.png
GOi(33)
//@@ shot=gpu_34.png
GOi(34)
//@@ shot=gpu_35.png
GOi(35)
//@@
(()=>{if(ZC.LEVELS.length>36)throw new Error('уровней больше 36 — допишите шаги в tfin_gpu.js');
if(FIN_GPU.none)return 'final06: кадры для сверки, errs='+_errs.length;
const r={backend:FIN_GPU.backend,missing:FIN_GPU.missing,errs:_errs.slice(0,6)};
if(FIN_GPU.backend!=='webgpu'&&!/[?&]webgl/.test(location.search))throw new Error('рисует не WebGPU: '+JSON.stringify(r));
if(FIN_GPU.missing.length||_errs.length)throw new Error('ошибки WebGPU: '+JSON.stringify(r));
return 'gpu ok backend='+FIN_GPU.backend+' levels='+ZC.LEVELS.length+' errs=0';})()
