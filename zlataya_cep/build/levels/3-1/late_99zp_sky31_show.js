/* ============================== РЕЛИЗ final06 · 3-1 «САД МОЛОДИЛЬНЫХ ЯБЛОК»: ПОКАЗ МОСТКОВ — ОДНО ПОНЯТИЕ ЗА РАЗ (docs/38, s1-bridges) ============================== */
// Обёртка над build31 (late_99p_sky31). Перед первыми тремя мостками светлый «призрак»-подсказка сам проходит их, пока герои смотрят:
//  1) светомосток (z −8…−20) — перо горит, золотые плитки держат; 2) тенемосток (−28…−38) — перо погасло, лиловые держат;
//  3) «три шага по золотому, три по лиловому» (−46…−66) — призрак зажигает и гасит перо на стыках.
// Призрак — отдельный свет (W.lights, радиус 2,2 м), только на время показа (≈ 4–6 с); герои при этом свободны. Показ один раз за заход.
{const _b31=build31;build31=function(){_b31();const F=W.flags;
  const g=new THREE.Group();g.visible=false;W.group.add(g);const gm=MB(0xe8f0ff,{transparent:true,opacity:0.42,depthWrite:false});
  addMesh(new THREE.CylinderGeometry(0.28,0.36,0.9,10),gm,0,0.55,0,g);addMesh(new THREE.SphereGeometry(0.3,12,10),gm,0,1.25,0,g);
  const fe=addMesh(new THREE.SphereGeometry(0.14,8,6),M(0xffd76a,{emissive:0xffa020,emissiveIntensity:1.2,transparent:true,opacity:0.9}),0.36,1.05,0,g);
  const GH={on:false,lit:false,pos:new V3(),seg:null,t:0};W.show31=GH;
  W.lights.push({pos:GH.pos,r:2.2,on:()=>GH.on&&GH.lit&&!HEROES.some(h=>hd(h.pos,GH.pos)<3.6),h:5});   // рядом герой — свет призрака не мешает его мосткам
  // показы: [порог по z, начало, конец, тип: 'light' | 'shadow' | 'mix', надпись]
  const SHOW=[[-2.5,-6.5,-21.5,'light','Перо горит — золотой мосток держит'],[-22.5,-26.5,-39.5,'shadow','Перо погасло — лиловый мосток держит'],
    [-40.5,-44.5,-67.5,'mix','Золотой — перо зажги, лиловый — погаси']];
  function start(S){GH.on=true;GH.seg=S;GH.t=0;g.visible=true;GH.lit=S[3]!=='shadow';GH.pos.set(0,0,S[1]);floatText(new V3(0,2.4,S[1]),'Смотри!','#e8f0ff');tone(1320,0.2,'sine',0.08,1760);}
  W.updates.push(dt=>{
    if(!GH.on){for(const S of SHOW){if(S.done)continue;if(!G.cine&&HEROES.some(h=>h.active&&h.pos.z<S[0]&&h.pos.z>S[0]-4)){S.done=true;start(S);}break;}return;}
    const S=GH.seg,L=S[1]-S[2],v=4.2;GH.t+=dt;const z=S[1]-Math.min(L,GH.t*v);GH.pos.set(0,0,z);
    if(S[3]==='mix'){const n=Math.floor((-46-z)/((66-46)/Math.max(1,Math.round(20/1.5))))   // номер плитки по 1,5 м
      ,want=z>-46?true:Math.floor(Math.max(0,n)/3)%2===0;if(want!==GH.lit){GH.lit=want;floatText(new V3(0,2.2,z),want?'зажгла':'погасила',want?'#ffe08a':'#c8b0ff');tone(want?1046:523,0.12,'triangle',0.07);}}
    g.position.set(0,0,z);fe.visible=GH.lit;fe.material.opacity=HEROES.some(h=>hd(h.pos,GH.pos)<3.6)?0.35:0.9;g.rotation.y=Math.PI;
    if(GH.t>0.6&&!S.told){S.told=true;floatText(new V3(0,2.6,z),S[4],GH.lit?'#ffe08a':'#c8b0ff');}
    if(GH.t*v>=L+0.4){GH.on=false;g.visible=false;}});};}
