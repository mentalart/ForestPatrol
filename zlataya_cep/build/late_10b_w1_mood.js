/* ============================== РЕЛИЗ · МИР 1: СВОЙ ЦВЕТ У КАЖДОГО УРОВНЯ ============================== */
// 1-1, 1-2 и 1-4 на старте выглядели одинаково (зелёная трава, те же ели, тот же свет). Теперь у каждого уровня — свой ключевой цвет
// (небо и дымка, солнце, рассеянный свет), а небо и горизонт late_10_render.js сами берут его из фона и тумана:
//   1-1 «Избушка» — тёплый жёлто-зелёный день во дворе Яги;  1-2 «Болото» — бирюзовая сырая дымка, дальше видно меньше;
//   1-4 «Леший водит» — сумерки, сине-фиолетовые, и светлячки над тропой;  1-5 «Прялка» — янтарный свет в подворье.
// 1-3 (Колобок — свой свет по частям) и 1-Б (ночь → рассвет по этапам) не трогаем.
const W1MOOD={
  '1-1':{bg:0x5a6c4c,near:20,far:70,amb:0xdcd2b0,ai:0.66,sun:0xfff0c4,si:0.9},
  '1-2':{bg:0x2e4a48,near:12,far:50,amb:0xa8c8c0,ai:0.6,sun:0xc8e4dc,si:0.62},
  '1-4':{bg:0x2a2c4c,near:14,far:54,amb:0x9c9cd4,ai:0.58,sun:0xbab2f0,si:0.56},
  '1-5':{bg:0x2c2014,near:20,far:70,amb:0xe4c49a,ai:0.62,sun:0xffc880,si:0.6}};
function w1Mood(id){const m=W1MOOD[id];if(!m)return;scene.background=new THREE.Color(m.bg);scene.fog=new THREE.Fog(m.bg,m.near,m.far);
  amb.color.set(m.amb);amb.intensity=m.ai;sun.color.set(m.sun);sun.intensity=m.si;}
// светлячки 1-4: медленно плывут над тропой у героев, мерцают (один материал — одна отрисовка на всех)
function w1Fireflies(){const n=40,geo=new THREE.BufferGeometry(),pos=new Float32Array(n*3),ph=[];for(let i=0;i<n;i++){ph.push(rand(0,6.3));pos[i*3]=rand(-9,9);pos[i*3+1]=rand(0.6,2.6);pos[i*3+2]=rand(-8,8);}
  geo.setAttribute('position',new THREE.BufferAttribute(pos,3));const mat=new THREE.PointsMaterial({color:0xfff2a0,size:0.18,transparent:true,opacity:0.85,depthWrite:false});
  const pts=new THREE.Points(geo,mat);pts.userData.noBatch=true;pts.frustumCulled=false;W.group.add(pts);let cz=0;
  W.updates.push(dt=>{const t=G.time,a=[active(0),active(1)].filter(Boolean);if(a.length)cz=damp(cz,(a[0].pos.z+(a[1]||a[0]).pos.z)/2,1.5,dt);pts.position.z=cz;
    for(let i=0;i<n;i++){pos[i*3]+=Math.sin(t*0.6+ph[i])*dt*0.4;pos[i*3+1]=1.6+Math.sin(t*0.9+ph[i]*2)*0.9;}geo.attributes.position.needsUpdate=true;mat.opacity=0.55+0.3*Math.sin(t*3);});}
{const _b11=build11;build11=function(){_b11.apply(this,arguments);w1Mood('1-1');};}
{const _b12=build12;build12=function(){_b12.apply(this,arguments);w1Mood('1-2');};}
{const _b14=build14;build14=function(){_b14.apply(this,arguments);w1Mood('1-4');try{w1Fireflies();}catch(e){}};}
{const _b15=build15;build15=function(){_b15.apply(this,arguments);w1Mood('1-5');};}
