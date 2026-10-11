/* ============================== РЕЛИЗ final06 · 2-3: СХЕМА «КТО НА КАКОЙ КАМЕНЬ», ПОДСВЕТКА КАМНЕЙ, ЩУКИ В ПРОТОКЕ, ГЛАЗА ВОДЯНОГО, КИТЕЖ ВДАЛИ ============================== */
// По разбору мира 2 (выбранные правки c10, c26, c25, c33, c22):
//  1) Над камнями неводов для четверых — схема: значок героя (цвет игрока и имя), кому где встать. Камень занят — значок гаснет.
//  2) Камни текущей задачи подсвечены столбом света (пока угол не поставлен).
//  3) Лёгкая стычка на лодке: две щуки Водяного в протоке плюются пузырями — отбить щитом или отразить; лодка плывёт и без боя.
//  4) Глаза Водяного в тёмной воде озера и протоки (vodEyesTick — общий шаг из 2-1).
//  5) На вечернем горизонте — силуэты храмов Китежа (k21Temple из 2-1).
const K23L={icons:[],beams:[],eyes:[]};
// невод → кто на какой угол (порядок углов — как в makeNet): 1 — сундук, 2 — мост через течение (дальний правый — не нужен)
const K23_SCHEME={1:['proshka','pelageya','potap','yosha'],2:['proshka','potap','pelageya',null]};
function k23Icon(kind){const h=HERO[kind],pi=h.player!=null?h.player:(kind==='proshka'||kind==='potap'?0:1);
  const c=document.createElement('canvas');c.width=256;c.height=96;const x=c.getContext('2d');
  x.fillStyle='rgba(20,24,40,0.78)';x.beginPath();x.roundRect?x.roundRect(4,8,248,80,40):x.rect(4,8,248,80);x.fill();
  x.fillStyle=PCSS[pi];x.beginPath();x.arc(48,48,30,0,Math.PI*2);x.fill();x.fillStyle='#fff';x.font='bold 36px Georgia, serif';x.textAlign='center';x.textBaseline='middle';x.fillText(h.d.name[0],48,50);
  x.font='bold 30px Georgia, serif';x.textAlign='left';x.fillText(h.d.name,90,50);
  const s=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthWrite:false}));s.scale.set(2.0,0.75,1);s.renderOrder=8;s.raycast=()=>{};return s;}
function k23Lake(){K23L.icons=[];K23L.beams=[];K23L.eyes=[];const D=W.dbg23?W.dbg23():null;if(!D)return;const F=D.F;
  const byNet={};for(const S of D.stones)(byNet[S.net.id]=byNet[S.net.id]||[]).push(S);
  for(const id in K23_SCHEME){const L=byNet[id]||[];K23_SCHEME[id].forEach((kind,i)=>{const S=L[i];if(!S||!kind)return;const sp=k23Icon(kind);sp.position.set(S.x,3.3,S.z);W.group.add(sp);K23L.icons.push({S,sp});});}
  const bm=MB(0xffe08a,{transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide});
  for(const S of D.stones){const b=new THREE.Mesh(new THREE.CylinderGeometry(0.5,0.7,6,12,1,true),bm.clone());b.position.set(S.x,3.2,S.z);b.userData.noBatch=true;b.renderOrder=7;W.group.add(b);K23L.beams.push({S,b});}
  const cur=()=>F.task<=1?1:F.task===2?2:F.task===3?3:0;
  // щуки Водяного в протоке (лодка идёт по середине; щуки кружат у стенок)
  for(const[x,z]of[[-2.3,-111],[2.3,-121]])pike(x,z,D.CH3,D.CH3.floor,{leash:2.4});
  // глаза Водяного: у дальнего берега озера и в конце протоки
  const LK=D.LAKE;for(const[x,z]of[[LK.minx+1.2,LK.minz+1.5],[LK.maxx-1.4,(LK.minz+LK.maxz)/2]])K23L.eyes.push(k21Eyes(x,LK.level+0.3,z));
  K23L.eyes.push(k21Eyes(2.6,D.CH3.level+0.3,-131));
  for(const E of K23L.eyes)E.g.rotation.y=E.g.position.x>0?-Math.PI/2:Math.PI/2;
  // Китеж на вечернем горизонте
  const mat=MB(0x2a2448,{fog:false,transparent:true,opacity:0.36,depthWrite:false});
  for(let i=0;i<7;i++)k21Temple((i%2?1:-1)*rand(40,62),rand(-260,-170),rand(3,4.6),mat);
  W.updates.push(dt=>{const c=cur();
    for(const I of K23L.icons){const on=!I.S.set&&!I.S.net.formed&&I.S.net.id===c;I.sp.visible=on;if(on)I.sp.position.y=3.3+Math.sin(G.time*2+I.S.x)*0.08;}
    for(const B of K23L.beams){const on=!B.S.set&&B.S.net.id===c&&!G.cine;B.b.material.opacity=damp(B.b.material.opacity,on?0.16+0.08*Math.sin(G.time*4):0,5,dt);B.b.visible=B.b.material.opacity>0.01;}
    vodEyesTick(K23L.eyes,dt);});}
FIN.k23Lake=K23L;
{const _b=build23;build23=function(){_b();try{k23Lake();}catch(err){console.error('k23 lake',err);}};}
