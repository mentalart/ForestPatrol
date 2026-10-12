/* ============================== РЕЛИЗ final06 · ЛУКОМОРЬЕ: РОЛИК ПРИБЫТИЯ ПОСЛЕ ПРОЛОГА ============================== */
// Ролик прототипа (lukoScene, 24,5 с) был невнятным: герои падают с неба неизвестно откуда, Кот говорит загадку и сам её отменяет
// («Не берите в голову»), плашка «Звено 1 — Звенышко» объявляет новое без слов, а дальше — «Погуляйте на просторе», и Звенышко,
// весь пролог водившее героев, просто висит над ними. Цель (собрать звенья, дорога — на рушнике у моря) нигде не звучала.
// Теперь — мини-история «беда → просьба → цель», ручная постановка (late_86b_kino, def.kino), 25 с:
//  · над поляной вспыхивает золотое кольцо — другой конец дупла из пролога; из него кучей падают герои, следом — Звенышко;
//  · Йоша: «Ух ты! Море! Дуб какой!»; кран по стволу — на дубе только бороздка от цепи и висит обрывок (рассказчик);
//  · Кот под дубом окаменел, как в книжке-раскладушке Пелагеи: серый, глаза закрыты; Звенышко звенит у его уха — цвет
//    возвращается, Кот открывает глаза (замедление, вспышка);
//  · Кот: Кощей порвал цепь и разметал звенья по сказкам; уцелело одно Звенышко — найдите звенья, чтобы всё срослось;
//    присказка «Звено куют руками…» остаётся (озвучена), Прошка шепчет «Это он про что?», Кот обещает: «Скуёте — поймёте!»
//    и показывает лапой на море: дорога — на рушнике; камера летит к стану у моря, туда же — Звенышко;
//  · после ролика плашка «К стану у моря!», у стана светится кольцо-маяк, Звенышко ведёт к стану (раньше — висело над героями).
// Состояние после ролика (и при пропуске) — как раньше: F.stage='free', Звенышко ведёт, G.links=1, Кот с открытыми глазами.
// Новые реплики пока без записи (озвучить — zlataya_cep/docs/09_final06.md, «Как озвучить новые реплики»).
const LA={frag:null,beacon:null,stone:null};
const LA_KOT=new V3(2.3,0,-4.6),LA_STAN=new V3(0,0,-24.4);   // Кот; стан у моря (release: сдвинут на W.shoreDZ) — точку берём от зоны «карта»
// Кот окаменел: каждому мешу — своя копия материала с холодным серым оттенком (общий CMAT персонажей не трогаем); k — 0 камень … 1 живой
function laStone(kot,k){if(!kot)return;const ms=Object.values(kot.meshes||{}).filter(m=>m&&m.isMesh);
  if(k>=1){ms.forEach(m=>{if(m.userData.laMat0){m.material=m.userData.laMat0;delete m.userData.laMat0;}});LA.stone=null;return;}
  ms.forEach(m=>{if(!m.userData.laMat0){m.userData.laMat0=m.material;m.material=m.material.clone();}m.material.color.setRGB(lerp(0.62,1,k),lerp(0.66,1,k),lerp(0.72,1,k));});LA.stone=k;}
// обрывок цепи на ветке дуба (дуб — makeOak(0,-7), ветка справа); висит до следующего прихода (в хабе его нет)
function laFrag(){if(LA.frag&&LA.frag.parent)return LA.frag;const g=new THREE.Group();g.position.set(2.38,6.42,-6.8);W.group.add(g);
  const gm=M(COL.gold,{emissive:0xb07a10,emissiveIntensity:0.45});
  for(let i=0;i<5;i++){const r=new THREE.Mesh(new THREE.TorusGeometry(0.12,0.035,6,14),gm);r.scale.set(1,1.4,1);r.position.y=-0.16-i*0.27;r.rotation.y=i%2?Math.PI/2:0;r.castShadow=true;g.add(r);}
  // последнее звено — разогнутое: здесь цепь порвалась
  g.children[4].rotation.z=0.9;g.children[4].scale.set(1,1.1,0.6);
  g.traverse(o=>{o.userData.batchNo=true;o.userData.noBatchL=true;});LA.frag=g;return g;}
// кольцо-маяк у стана: светится, пока рушник не раскатали
function laBeacon(){if(LA.beacon&&LA.beacon.parent)return LA.beacon;const g=new THREE.Group();g.position.copy(LA_STAN);W.group.add(g);
  const ring=new THREE.Mesh(new THREE.TorusGeometry(1.7,0.08,6,40),MB(0xffd76a,{transparent:true,opacity:0.85,depthWrite:false}));ring.rotation.x=Math.PI/2;ring.position.y=0.08;g.add(ring);
  const col=new THREE.Mesh(new THREE.CylinderGeometry(1.5,1.7,5,24,1,true),MB(0xffe08a,{transparent:true,opacity:0.16,depthWrite:false,side:THREE.DoubleSide}));col.position.y=2.5;g.add(col);
  g.traverse(o=>{o.userData.batchNo=true;o.userData.noBatchL=true;});g.userData.ring=ring;g.userData.col=col;LA.beacon=g;return g;}
// золотое кольцо в воздухе — выход из дупла: раскрывается, выпускает героев и гаснет
function laPortal(p){const m=new THREE.Mesh(new THREE.TorusGeometry(1.6,0.12,8,40),MB(0xffd76a,{transparent:true,opacity:0.95,depthWrite:false}));m.position.copy(p);m.rotation.x=Math.PI/2;m.scale.setScalar(0.05);W.group.add(m);
  const disc=new THREE.Mesh(new THREE.CircleGeometry(1.55,32),MB(0xfff2b0,{transparent:true,opacity:0.55,depthWrite:false,side:THREE.DoubleSide}));m.add(disc);
  anim(0.5,k=>{m.scale.setScalar(Math.max(0.05,CINE.E.outBack?CINE.E.outBack(k):k));});
  later(2.4,()=>anim(0.6,k=>{m.scale.setScalar(Math.max(0.01,1-k));m.material.opacity=0.95*(1-k);disc.material.opacity=0.55*(1-k);if(k>=1){W.group.remove(m);}}));return m;}
lukoScene=function(){const Z=W.zven,kot=W.kot,F=W.flags,T=HERO,R=kot&&kot.rig;const dz=W.shoreDZ||0;LA_STAN.set(0,0,-18.4-dz);
  const KH=()=>kot.head.getWorldPosition(new V3()),ZP=()=>Z.pos.clone(),PORT=new V3(0,8.2,4.4);
  const ear=()=>KH().add(new V3(-0.55,0.35,0.25));
  const spots=[['potap',-3.0,4.7],['proshka',-1.3,5.3],['yosha',0.6,5.3],['pelageya',2.5,4.8]];
  let lidK=0,armK=0,headK=0;const paw=R&&(R.armR||R.armL);
  play({dur:25,fov:50,kino:true,mood:['#ffc890',0.1],
   shots:[
     KS(0,[0,3.0,16],[0,4.4,4],{move:'push',amp:0.6}),                                                            // 1 общий: кольцо над поляной, герои падают
     KS(2.3,[0.6,1.5,1.6],[0.6,1.0,5.3],{trk:KC.fcam(T.yosha,2.8,0.25,0.15,0.12)}),                              // 2 средний: Йоша — «Ух ты!»
     KS(4.3,[2.2,1.2,-1.4],[0.4,1.6,-7],{p2:[3.4,5.2,-3.2],l2:[2.2,5.6,-6.8],dur:2.3,move:'none'}),            // 3 кран по стволу: бороздка, обрывок цепи
     KS(6.7,[0.9,1.7,-1.6],[2.3,1.3,-4.6],{trk:KC.fcam(kot,3.4,0.45,0.1,0.15),fov:-2}),                         // 4 средний: Кот-камень, Звенышко летит к уху
     KS(8.3,[1.7,1.7,-3.3],[2.3,1.6,-4.6],{trk:KC.fcam(kot,1.5,0.2,0.05,0.3),tr:'cut'}),                       // 5 крупно: Кот оживает
     KS(9.8,[1.0,1.6,-2.4],[2.3,1.5,-4.6],{trk:KC.fcam(kot,2.5,-0.35,0.12,0.12)}),                              // 6 Кот: «Кощей мою цепь порвал»
     KS(13.0,[-0.2,2.0,1.6],[2.3,1.3,-4.6],{move:'push',amp:0.5}),                                                 // 7 через плечи героев: «Одно лишь Звенышко спаслось»
     KS(16.1,[1.6,1.7,-3.0],[2.3,1.6,-4.6],{trk:KC.fcam(kot,1.9,0.25,0.06,0.18)}),                              // 8 крупно: присказка
     KS(20.0,[-1.6,1.3,3.6],[-1.3,0.9,5.3],{trk:KC.fcam(T.proshka,1.7,-0.75,0.1,0.1)}),                         // 9 Прошка шепчет
     KS(21.95,[1.0,1.8,-2.2],[2.3,1.5,-4.6],{trk:KC.fcam(kot,2.6,-0.5,0.15,0.1)}),                              // 10 Кот показывает на море
     KS(23.6,[3.2,3.4,-2.6],[1.0,2.0,-14],{p2:[1.2,7.5,-9],l2:[0,0.8,-18.4-dz],dur:1.4,move:'none',tr:'whip'})], // 11 кран к стану у моря
   says:[[2.4,1.9,'yosha','Ух ты! Море! Дуб какой!'],
     [4.4,2.3,null,'<i>Дуб стоит — а цепи нет,</i><br><i>Лишь обрывок звякнул вслед.</i>',true],
     [6.8,1.5,'zven','Дзинь-дзинь! Кот, проснись!'],
     [9.9,3.0,'kot','Мур-р… Кощей мою цепь порвал,<br>Звенья по сказкам разметал!'],
     [13.1,2.9,'kot','Одно лишь Звенышко спаслось.<br>Найдите звенья — чтоб всё срослось!'],
     [16.1,3.85,'kot','Звено куют руками,<br>А держится оно словами.'],
     [20.0,1.9,'proshka','<i>(шёпотом)</i> Это он про что, скажи?'],
     [22.0,2.9,'kot','Скуёте — поймёте! А дорога — на рушнике, у моря.']],
   events:[
     {t:0,fn:()=>{laFrag();laStone(kot,0);kot.head.rotation.x=0.4;kot.lids.forEach(l=>{l.rotation.x=1.3;});
       spots.forEach(([w,x,z],i)=>{const h=T[w];if(!h)return;KC.place(h,x,z,0);h.pos.y=7.2+i*0.55;h.vel.set(0,-1,0);h.grounded=false;h.face=Math.PI;});
       Z.mode='script';Z.vis=false;Z.pos.copy(PORT);laPortal(PORT);}},
     {t:1.6,fn:()=>{Z.vis=true;Z.pos.copy(PORT);}},
     {t:2.2,fn:()=>{HEROES.forEach(h=>KC.face(h,new V3(0,0,-7)));}},
     {t:9.7,fn:()=>{laStone(kot,1);kot.head.rotation.x=-0.05;HEROES.forEach(h=>KC.face(h,LA_KOT));}},
     {t:13.6,fn:()=>{zvenRing();G.links=1;}},
     {t:20.0,fn:()=>{KC.face(T.proshka,T.potap.pos);KC.face(T.potap,T.proshka.pos);}},
     {t:21.9,fn:()=>{HEROES.forEach(h=>KC.face(h,LA_KOT));}},
     {t:23.6,fn:()=>{HEROES.forEach(h=>KC.face(h,LA_STAN));laBeacon();}}],
   cues:[[0.05,()=>{KSND.magic(0,392);CINE.rimPulse(0.6);}],[1.15,()=>{KSND.thud(0,0.14);KSND.thud(0.18,0.1);KSND.thud(0.34,0.08);CINE.trauma(0.12);
       HEROES.forEach(h=>FX.dust(new V3(h.pos.x,0.2,h.pos.z),8,0xd8c8a0,1.2));}],[1.25,KC.emo('potap','flinch')],[1.45,KC.emo('yosha','hop')],[1.6,()=>{SFX.dzin();FX.sparkle(PORT.clone(),14,0xffd76a);}],
     [2.4,KC.all('joy',0.08)],[4.4,()=>{KSND.creak(0.2);CINE.mood('#8aa0c8',0.14);}],[5.6,()=>{SFX.clink();SFX.clink&&later(0.25,SFX.clink);}],
     [6.75,KC.all('surprise',0.07)],[7.3,()=>{SFX.dzin();}],[8.0,()=>{SFX.dzin();}],
     [8.4,()=>{CINE.slowmo(0.4,0.8);CINE.flashDip('#fff2c0',0.35);CINE.punch(-4);KSND.magic(0,523);FX.sparkle(KH(),18,0xffd76a);CINE.mood('#ffc890',0.12);}],
     [9.2,()=>{KSND.puff(0);FX.dust(KH(),10,0xb8b8c0,0.8);}],[9.9,KC.all('surprise',0.06)],[11.4,KC.all('fear',0.07)],
     [13.4,KC.all('nod',0.1)],[14.5,()=>KSND.trill(0)],[16.2,()=>CINE.rimPulse(0.8)],[18.4,KC.emo('pelageya','tilt')],[20.1,KC.emo('proshka','tilt')],
     [22.1,KC.emo('kot','nod')],[23.0,()=>KSND.feather(0,0.3)],[23.65,KC.all('cheer',0.08)],[24.2,()=>KSND.fanfare(0)]],
   tick:(t,dt)=>{
     // Звенышко: из кольца — к героям; к уху Кота; на плечо Кота; круг почёта; к стану у моря
     if(t>=1.6&&t<4.3)Z.pos.lerpVectors(PORT,new V3(0.4,2.5,3.4),CINE.E.inOutCubic(Math.min(1,(t-1.6)/1.4)));
     else if(t>=4.3&&t<6.7)Z.pos.set(0.4+Math.sin(t*1.3)*0.3,2.5+Math.sin(t*2.1)*0.15,3.4);
     else if(t>=6.7&&t<8.3){const k=CINE.E.inOutCubic(Math.min(1,(t-6.7)/1.1));Z.pos.lerpVectors(new V3(0.4,2.5,3.4),ear(),k);Z.pos.y+=Math.sin(k*Math.PI)*0.8;}
     else if(t>=8.3&&t<13.4){const e=ear();Z.pos.set(e.x+Math.sin(t*1.6)*0.12,e.y+Math.sin(t*2.4)*0.06,e.z);}
     else if(t>=13.4&&t<15.2){const a=(t-13.4)/1.8*Math.PI*2,c=KH();Z.pos.set(c.x+Math.sin(a)*1.1,c.y+0.5+Math.sin(a*2)*0.2,c.z+Math.cos(a)*1.1);}
     else if(t>=15.2&&t<23.6){const e=ear();Z.pos.lerp(new V3(e.x,e.y+0.1,e.z),Math.min(1,(dt||0.016)*4));}
     else if(t>=23.6){const k=CINE.E.inOutCubic(Math.min(1,(t-23.6)/1.3));Z.pos.lerpVectors(ear(),new V3(0,2.6,LA_STAN.z+2.2),k);Z.pos.y+=Math.sin(k*Math.PI)*2.2;}
     Z.spinRate=t>=8.3&&t<9.6?7:t>=13.4&&t<15.2?5:2;
     // Кот: камень → живой (цвет, веки, голова); лапа к морю
     if(t<8.4){laStone(kot,0);lidK=0;headK=0;}
     else if(t<9.7){const k=CINE.E.inOutCubic((t-8.4)/1.3);laStone(kot,k);lidK=k;headK=k;}
     else{lidK=1;headK=1;}
     if(t>=8.4){kot.lids.forEach(l=>{l.rotation.x=lerp(1.3,-0.5,lidK);});kot.head.rotation.x=lerp(0.4,-0.05,headK);}
     armK=t<22.4?0:t<23.2?CINE.E.inOutCubic((t-22.4)/0.8):1;if(paw)paw.rotation.x=lerp(-0.12,-1.45,armK);
     if(t>=22.4)kot.head.rotation.y=lerp(0,-0.5,armK);
     if(LA.frag)LA.frag.rotation.z=Math.sin(G.time*1.4)*0.12;},
   end:()=>{F.stage='free';Z.mode='lead';Z.vis=true;Z.spinRate=1.5;laStone(kot,1);laFrag();laBeacon();G.links=Math.max(G.links||0,1);
     kot.head.rotation.x=-0.05;kot.head.rotation.y=0;kot.lids.forEach(l=>{l.rotation.x=-0.5;});if(paw)paw.rotation.x=-0.12;
     HEROES.forEach(h=>{h.extraY=0;});laLead();snapCams();
     banner('К стану у моря!','#ffd76a',2.8,'Там рушник — дорога в пять миров. Звенышко покажет путь');}});};
// после ролика: Звенышко ведёт к стану (обходит дуб), у стана — кольцо-маяк; раскатали рушник — всё как раньше
function laLead(){const F=W.flags,g0=W.zvenGoal;if(F.laLead)return;F.laLead=true;
  W.zvenGoal=()=>{if(F.rushnik||F.mode!=='first'||!g0)return g0?g0():new V3();const a=active(0),b=active(1),m=new V3((a.pos.x+b.pos.x)/2,0,(a.pos.z+b.pos.z)/2);
    const to=new V3(LA_STAN.x,0,LA_STAN.z).sub(m),d=to.length();if(d<2.4)return new V3(LA_STAN.x,2.4,LA_STAN.z);to.multiplyScalar(Math.min(4.2,d)/d);const p=m.add(to);
    if(Math.abs(p.x)<3.2&&p.z<-3&&p.z>-11)p.x=(p.x>=0?1:-1)*3.4;   // ствол дуба и Кот — облететь сбоку
    p.y=2.5;return p;};
  W.updates.push(dt=>{const B=LA.beacon;if(!B)return;const on=F.mode==='first'&&!F.rushnik;B.visible=on;if(!on)return;
    const s=1+0.08*Math.sin(G.time*3.2);B.userData.ring.scale.setScalar(s);B.userData.col.material.opacity=0.12+0.06*Math.sin(G.time*2.1);});}
{const _ll=loadLevel;loadLevel=function(i){LA.frag=null;LA.beacon=null;LA.stone=null;_ll(i);};}
FIN.lukoArrive=()=>({frag:!!(LA.frag&&LA.frag.parent),beacon:!!(LA.beacon&&LA.beacon.visible),stone:LA.stone,lead:!!(W&&W.flags&&W.flags.laLead)});   // для ботов
