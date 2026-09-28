//@@
// final03 · арт в духе Synty: герои-скелеты (у Потапа две ноги), лицо, стилизация уровня, одевание мира, пачки статики, вода и море
const H=ZC.HERO,out=[];for(const k of['proshka','potap','pelageya','yosha']){const h=H[k];const sk=h.body.children.filter(o=>o.isSkinnedMesh);const m=sk[0];const tris=m?m.geometry.attributes.position.count/3:0;
  const R=h.rig||{};const face=['head','eyeL','eyeR','browL','browR','lidL','lidR','mouth'].filter(n=>R[n]).length;out.push(k+':skinned='+sk.length+' bones='+(m?m.skeleton.bones.length:0)+' tris='+tris+' face='+face+'/8'+(R.elbowL?' elbows':'')+(R.kneeL?' knees':''));}
out.push('potapLegs='+H.potap.parts.legs.length+' wings='+H.pelageya.parts.wings.map(w=>w.userData.s).join(',')+' eyes='+H.proshka.eyes.length);
const bk=H.pelageya.parts.beak;bk.visible=false;const hid=bk.scale.x<0.01;bk.visible=true;out.push('beakHide='+(hid&&bk.scale.x===1));
let gh='ok';try{const g=new THREE.Group();ZC.FIN.hb('potap',g,()=>new THREE.MeshBasicMaterial({color:0xcfe9ff,transparent:true,opacity:0.4}));gh=g.children[0].isSkinnedMesh?'ok':'no';}catch(e){gh='ERR '+e.message;}out.push('ghost='+gh);out.join(' | ')
//@@
// ходьба: бёдра и руки двигаются; реплика — рот открывается
ZC.startFrom(ZC.LV('1-1'));ZC.G.manual=true;for(let i=0;i<6;i++){try{ZC.skip();}catch(e){}ZC.tick(20);}const h=ZC.HERO.proshka,R=h.rig;let mx=0,ma=0;ZC.hold('KeyW',true);for(let i=0;i<40;i++){ZC.tick(1);mx=Math.max(mx,Math.abs(R.hipL.rotation.x));ma=Math.max(ma,Math.abs(R.armL.rotation.x));}ZC.hold('KeyW',false);ZC.tick(10);
const pot=ZC.HERO.potap.rig;let pk=0;ZC.HERO.potap.walkT=0;for(let i=0;i<30;i++){ZC.HERO.potap.vel.set(0,0,-4);ZC.HERO.potap.walkT+=0.1;ZC.tick(1);pk=Math.max(pk,Math.abs(pot.kneeL.rotation.x));}ZC.HERO.potap.vel.set(0,0,0);
['walk hip='+mx.toFixed(2)+' arm='+ma.toFixed(2),'potapKnee='+pk.toFixed(2)].join(' ')
//@@
// уровень: стилизация, одевание, тропинка, scatter; пачки — после прогрева
const D=ZC.FIN.dress,W=ZC.W;const gt=(W.finG||[])[0];let inst=0,dress=0;W.group.traverse(o=>{if(o.isInstancedMesh)inst++;if(o.userData.dress&&!o.isInstancedMesh)dress++;});
ZC.tick(420);const B=ZC.FIN.batch.stats;['kind='+D.kind,'sty='+ZC.FIN.sty.n,'gtopShade='+!!(gt&&gt.mesh.geometry.attributes.aShade),'path='+(D.path?D.path.length:0),'scatter='+D.scatterN,'instanced='+inst,'dress='+dress,'cells='+B.cells,'batched='+B.batched].join(' ')
//@@ wait=600
const s=ZC.FIN.stats();'drawcalls(low)='+s.calls+' tris='+s.tris
//@@
// вода участков — волны и пена; у острова — море
ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(3);const w=ZC.W.waters[0];const a=['wave='+(w.top.material.userData.fx==='wave'),'foam='+w.top.children.length,'reef='+ZC.FIN.dress.kind];
ZC.startFrom(ZC.LV('luko'));ZC.tick(3);a.push('ocean='+!!ZC.FIN.atmo.ocean,'sea='+ZC.FIN.dress.kind);ZC.startFrom(ZC.LV('3-1'));ZC.tick(3);a.push('sky='+ZC.FIN.dress.kind);ZC.startFrom(ZC.LV('4-2'));ZC.tick(3);a.push('lava='+ZC.FIN.dress.kind+' fx='+ZC.W.lavas[0].m.material.userData.fx);a.join(' ')
