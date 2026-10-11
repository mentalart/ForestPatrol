/* ============================== РЕЛИЗ final06 · 2-5: КУПОЛА ЗАЖИГАЮТСЯ, СКАЛЫ ПО КРАЮ, ОТ СИНЕГО К ЗОЛОТУ, СВОЯ МУЗЫКА, РОЛИК ПОДЪЁМА КИТЕЖА ============================== */
// По разбору мира 2 (выбранные правки c16, c17, c18, c23):
//  1) Над уровнем — силуэт Китежа: шесть храмов. С каждой зазвучавшей звонницей (низкая, на воде, двойная, Звон, напев Садко, главный «Бом»)
//     на одном из них загорается золотой купол.
//  2) Край плиты (x = ±9) — не обрыв, а скалы: высокие камни вдоль обеих стен по всей длине; за ними — крупные храмы Китежа.
//  3) Палитра: чем выше по городу забрались герои, тем теплее свет — от синей глубины колодца к золоту у главного колокола.
//  4) Музыка 2-5 собирается по голосу: бурдон с начала, перебор гуслей — после колодца, колокола — после двойной звонницы,
//     жалейка — со Звоном, напев Садко — когда его сыграли. После «Бом» — тишина, на подъёме Китежа — полный звон с напевом.
//  5) Ролик подъёма Китежа (22 с): город выходит из воды, купола золотые; в конце — рёв Водяного (завязка 2-Б).
const K25R={domes:[],sky:[],rise:false};
{const T=FIN.music&&FIN.music.TR;const f=k=>()=>!!(W&&W.flags&&W.flags[k]);
  if(T){const tune=[[67,1],[71,1],[74,2],[72,2],[null,10]];
    T.k25={bpm:64,root:52,sc:'aeo',len:16,v:[
      {i:'drone',drone:[0],oct:-12,vol:0.05},
      {i:'harp',arp:[0,5,3,4],per:4,pat:[0,4,7,9,7,4],st:0.5,oct:0,vol:0.045,on:()=>!!(W&&W.flags&&W.flags.given===true)},
      {i:'bell',oct:12,vol:0.045,on:f('b3'),seq:[[[4,3],[null,1],[2,2],[1,2],[0,4],[null,4]],[[7,2],[6,2],[4,4],[5,2],[4,2],[2,4]]]},
      {i:'flute',oct:12,vol:0.035,every:2,on:f('zvon'),seq:[[[null,8],[4,2],[3,1],[2,1],[0,4]]]},
      {i:'bell',abs:true,oct:0,vol:0.05,on:f('tune'),seq:[tune]}]};
    T.k25q={bpm:64,root:52,sc:'aeo',len:16,v:[]};   // после «Бом» — тишина
    T.k25f={bpm:72,root:55,sc:'mix',len:16,v:[
      {i:'drone',drone:[0],oct:-12,vol:0.05},
      {i:'harp',arp:[0,3,4,0],per:4,pat:[0,2,4,7,4,2],st:0.5,oct:0,vol:0.05},
      {i:'bell',abs:true,oct:0,vol:0.06,seq:[[[67,1],[71,1],[74,2],[72,2],[67,1],[71,1],[74,2],[72,2],[null,4]]]},
      {i:'bell',abs:true,oct:-12,vol:0.05,seq:[[[67,4],[62,4],[60,4],[67,4]]]},
      {i:'flute',oct:12,vol:0.045,every:2,seq:[[[4,2],[5,1],[4,1],[2,2],[0,2],[3,2],[2,1],[1,1],[0,4]]]},
      {i:'tamb',drum:'x...x...x...x...',vol:0.02}]};}}
// скалы вдоль края: высокие камни от земли участка вниз, один InstancedMesh
function k25Edge(){const q=new THREE.Object3D(),R=[];const top=z=>z>-50?0:z>-72?3:6;
  for(const sd of[-1,1])for(let z=8;z>-167;z-=rand(1.6,2.6)){const t=top(z),h=rand(3,7),s=rand(0.9,1.8);R.push([sd*rand(9.6,10.8),t+rand(-0.6,0.9)-h/2,z,s,h]);
    if(Math.random()<0.55){const h2=rand(5,10);R.push([sd*rand(11,13.5),t+rand(0.2,2.4)-h2/2,z+rand(-1,1),rand(1.4,2.4),h2]);}}
  const m=new THREE.InstancedMesh(new THREE.DodecahedronGeometry(1,0),M(0x5a6a66),R.length);
  R.forEach((r,i)=>{q.position.set(r[0],r[1],r[2]);q.rotation.set(rand(-0.3,0.3),rand(0,3),rand(-0.3,0.3));q.scale.set(r[3],r[4]/2,r[3]*rand(0.8,1.2));q.updateMatrix();m.setMatrixAt(i,q.matrix);});
  m.userData.noBatch=true;m.instanceMatrix.needsUpdate=true;W.group.add(m);}
// храм-силуэт с куполом, который зажигается
function k25Dome(x,z,y,s,mat,when){const g=k21Temple(x,z,s,mat);g.position.y=y;K25R.sky.push({g,y0:y});
  const gm=MB(0xffd76a,{transparent:true,opacity:0,fog:false,depthWrite:false});const on=new THREE.Mesh(new THREE.SphereGeometry(1.18,14,10),gm);on.scale.set(1,1.27,1);on.position.set(0,6.2,0);g.add(on);
  const D={g,gm,when,lit:0,on:false};K25R.domes.push(D);return D;}
function k25Rise(){K25R.domes=[];K25R.sky=[];K25R.rise=false;const F=W.flags;
  if(typeof k21Temple!=='function')return;
  k25Edge();
  const mat=MB(0x183848,{fog:false,transparent:true,opacity:0.42,depthWrite:false});
  // крупные храмы за скалами — город больше улицы
  for(let z=0;z>-170;z-=rand(26,34))for(const sd of[-1,1]){const y=z>-50?-2:z>-72?1:4,g=k21Temple(sd*rand(17,24),z+rand(-6,6),rand(3.6,5.2),mat);g.position.y=y;K25R.sky.push({g,y0:y});}
  // шесть храмов над уровнем — по одному на звонницу
  const W6=[[-30,-36,'b1'],[30,-40,'b2'],[-30,-64,'b3'],[30,-88,'zvon'],[-30,-132,'tune'],[0,-190,'bom']];
  for(const[x,z,k]of W6)k25Dome(x,z,k==='bom'?2:4,k==='bom'?6:4.4,mat,()=>!!F[k]);
  const BG=SEA_PAL.bg.clone(),FG=SEA_PAL.fog.clone(),AM=SEA_PAL.amb.clone(),GOLD=new THREE.Color(0x6a7656),GFOG=new THREE.Color(0x7a8a60),WARM=new THREE.Color(0xffe2a8);let pk=0;
  try{FIN.music.play('k25');}catch(e){}
  {const _ol=W.onLeave;W.onLeave=()=>{try{FIN.music.play(null);}catch(e){}if(_ol)_ol();};}
  W.updates.push(dt=>{
    for(const D of K25R.domes){if(!D.on&&D.when()){D.on=true;if(!G.cine||K25R.rise){tone(660,0.9,'sine',0.08);}}D.lit=damp(D.lit,D.on?1:0,1.2,dt);D.gm.opacity=D.lit*(0.85+0.15*Math.sin(G.time*1.5+D.g.position.z));}
    // от синего к золоту: по тому, как далеко по городу забрался передний герой
    if(!W.seaOff&&scene.background){let z=8;for(const pi of[0,1]){const h=active(pi);if(h)z=Math.min(z,h.pos.z);}const k=clamp((-z-20)/130,0,1);pk=damp(pk,k,1.5,dt);
      scene.background.copy(BG).lerp(GOLD,pk*0.55);if(scene.fog)scene.fog.color.copy(FG).lerp(GFOG,pk*0.5);amb.color.copy(AM).lerp(WARM,pk*0.35);}
    // музыка: после «Бом» — тишина до подъёма
    if((F.bomWait||F.bom)&&!K25R.rise){try{FIN.music.play('k25q');}catch(e){}}});
  // ролик подъёма Китежа: город выходит из воды, купола золотые, в конце — рёв Водяного
  FIN.k25Rise=done=>{K25R.rise=true;try{FIN.music.play('k25f');}catch(e){}const pe=HERO.pelageya;
    play({dur:22.4,fov:50,camK:2.4,shots:[shot(0,[0,11,-132],[0,9,-151]),shot(5.6,[18,16,-118],[0,12,-160],[24,26,-92],[0,16,-176],8),shot(14,[3.2,8.6,-146],[pe.pos.x,pe.pos.y+0.9,pe.pos.z]),shot(17.8,[-6,9,-136],[0,6,-170])],
      says:[[0.4,3.4,null,'<i>Китеж поднимается — купол за куполом, из воды к солнцу.</i>',true],[4.4,2.6,'yosha','Пелагея! Тебя весь город услышал!'],
        [7.6,2.8,'proshka','Шёпотом — а громче всех! Я бы так не смог.'],[11.0,2.8,'pelageya','<i>(тихо, улыбаясь)</i> Бом.'],
        [14.4,2.6,null,'<i>…а в глубине отзывается рёв.</i>',true],[17.4,3,'zven','Водяной проснулся! Берегись!']],
      events:[{t:0.3,fn:()=>{for(const S of K25R.sky){const y0=S.g.position.y;anim(9,k=>{S.g.position.y=y0+7*smooth(k);});}for(const D of K25R.domes)D.on=true;SFX.grow();shakeAll(0.04,1.4);}},
        {t:0.5,fn:()=>{const c0=scene.background.clone(),c1=new THREE.Color(0xf4d890),a0=amb.color.clone();anim(8,k=>{scene.background.copy(c0).lerp(c1,k*0.7);if(scene.fog)scene.fog.color.copy(scene.background);amb.color.copy(a0).lerp(WARM,k*0.6);});}},
        {t:14.4,fn:()=>{tone(60,2.4,'sawtooth',0.2,40);tone(80,2.0,'sawtooth',0.14,50,0.3);shakeAll(0.08,1.6);}}],
      end:()=>{later(0.4,done);}});};}
FIN.k25R=K25R;
{const _b=build25;build25=function(){_b();try{k25Rise();}catch(err){console.error('k25 rise',err);}};}
