/* ============================== ПОЛИГОН КОЩЕЯ · ФИНАЛ «ЖИЛ-БЫЛ МАЛЬЧИШКА»: СТРАНИЦА СКАЗКИ (шаг 6) ============================== */
// Пелагея открывает тетрадку — герои на рисованной странице (вид сбоку, линия по тетради). Мальчишка с молоточком (маленький Кощей) идёт
// по сказке; у каждой строки-отметки загорается имя друга, и друг встаёт рядом с мальчишкой. Без опасностей: только прыжки по буквам.
function k5Paper(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');draw(g,w,h);return new THREE.CanvasTexture(c);}
function k5Ink(geo,col,x,y,z,parent){const m=addMesh(geo,new THREE.MeshBasicMaterial({color:col||0xffffff}),x,y,z,parent);const e=k5noRay(new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:0x1a1a2a})));e.position.copy(m.position);(parent||W.group).add(e);k5noRay(m);return m;}
const K5PG_NAMES=[[16,'Потап','#d9774a','potap'],[31,'Йоша','#2fb3aa','yosha'],[46,'Прошка','#e8a040','proshka'],[61,'Пелагея','#b07ad8','pelageya']];
K5SB.scenes.page={goal:()=>'«Жил-был мальчишка…» Идите за мальчишкой по странице: прыжок — по буквам. Друзья встанут рядом.',
  build(){const S=this;scene.background=new THREE.Color(0xf4ecd8);scene.fog=null;try{amb.intensity=1.1;sun.intensity=0.4;}catch(e){}W.fallY=-8;
    const tex=k5Paper(2048,512,(g,w,h)=>{g.fillStyle='#f4ecd8';g.fillRect(0,0,w,h);g.strokeStyle='rgba(80,110,200,0.35)';g.lineWidth=2;for(let y=40;y<h;y+=34){g.beginPath();g.moveTo(0,y);g.lineTo(w,y);g.stroke();}
      g.strokeStyle='rgba(220,60,60,0.5)';g.beginPath();g.moveTo(120,0);g.lineTo(120,h);g.stroke();g.fillStyle='#2a2a48';g.font='italic 64px Georgia,serif';g.fillText('Жил-был мальчишка — сказки сам сложить мечтал…',180,110);
      g.strokeStyle='#2a2a48';g.lineWidth=3;for(let i=0;i<14;i++){const x=200+i*130,y=380+Math.sin(i)*20;g.beginPath();g.arc(x,y,18+i%3*6,0,Math.PI*2);g.stroke();g.beginPath();g.moveTo(x,y+20);g.lineTo(x,y+70);g.stroke();}});
    const bg=k5noRay(new THREE.Mesh(new THREE.PlaneGeometry(110,27),new THREE.MeshBasicMaterial({map:tex})));bg.position.set(36,6,-4);W.group.add(bg);
    // дорожка из «нарисованных» плит с промежутками и буквы-ступени
    const segs=[[-6,9],[11,19],[21.5,27],[30,40],[43,50],[53,60],[63,82]];for(const [a,b] of segs){k5Ink(new THREE.BoxGeometry(b-a,0.6,2.4),0xffffff,(a+b)/2,-0.3,0);colBox(a,b,-0.6,0,-1.2,1.2,false);}
    // буквы — ступеньки над промежутками (по ним перепрыгивают; вниз — мягко к началу участка)
    const LET='ЖИЛБЫЛ'.split(''),GAP=[[9,11],[19,21.5],[27,30],[40,43],[50,53],[60,63]];LET.forEach((ch,i)=>{const x=(GAP[i][0]+GAP[i][1])/2,gw=GAP[i][1]-GAP[i][0]+0.3,y=-0.7+(i%2)*0.6;const t=k5Paper(128,128,(g)=>{g.fillStyle='#fff';g.fillRect(0,0,128,128);g.fillStyle='#2a2a48';g.font='bold 96px Georgia,serif';g.textAlign='center';g.textBaseline='middle';g.fillText(ch,64,70);});
      const geo=new THREE.BoxGeometry(gw,1.4,2.4);const m=k5noRay(new THREE.Mesh(geo,new THREE.MeshBasicMaterial({map:t})));m.position.set(x,y,0);W.group.add(m);const e=k5noRay(new THREE.LineSegments(new THREE.EdgesGeometry(geo),new THREE.LineBasicMaterial({color:0x1a1a2a})));e.position.copy(m.position);W.group.add(e);
      colBox(x-gw/2,x+gw/2,y-0.7,y+0.7,-1.2,1.2,false);});
    // мальчишка с молоточком
    S.boy=makeKoschei();S.boy.g.scale.setScalar(0.3);S.boy.g.position.set(2,0,0);S.boy.g.rotation.y=Math.PI/2;const R=S.boy.rig||{};if(R.mouth)R.mouth.userData.hold=true;
    const ham=new THREE.Group();addMesh(new THREE.CylinderGeometry(0.04,0.04,0.7,5),M(0x6a4a2a),0,0,0,ham);addMesh(new THREE.BoxGeometry(0.3,0.18,0.18),M(0x8a8a94),0,0.38,0,ham);if(R.hand)R.hand.add(ham);else S.boy.g.add(ham);
    k5Label('мальчишка',2,2.2,0,'#2a2a48',2.6);S.lab=[];S.fr=[];S.next=0;S.end=false;
    for(const [x,n,c] of K5PG_NAMES){const t=k5Paper(512,128,(g)=>{g.clearRect(0,0,512,128);g.fillStyle='rgba(42,42,72,0.35)';g.font='italic 64px Georgia,serif';g.textAlign='center';g.fillText(n,256,84);});
      const sp=k5noRay(new THREE.Sprite(new THREE.SpriteMaterial({map:t,transparent:true,depthWrite:false})));sp.scale.set(4,1,1);sp.position.set(x,4.2,0);W.group.add(sp);S.lab.push({sp,x,n,c});}
    W.spawns=[[new V3(-3,0,0),new V3(-4.5,0,0)],[new V3(-1.5,0,0),new V3(-5.5,0,0)]];
    W.camFn=()=>{const a=G.solo?active(G.soloPi):active(0),b=G.solo?a:active(1);const mx=(a.pos.x+b.pos.x)/2*0.6+S.boy.g.position.x*0.4;return {pos:new V3(mx,4,18),look:new V3(mx,2.2,0),k:3};};
    const M_=FIN.music;if(M_&&M_.TR&&M_.TR.w2){if(!M_.TR.k5page){const T=JSON.parse(JSON.stringify(M_.TR.w2));T.bpm=56;T.root=(T.root||52)+7;T.sc='ion';T.v=T.v.filter(v=>!v.drum);M_.TR.k5page=T;}M_.play('k5page');}
    $('bossbar').style.display='none';k5Item(null);},
  update(dt){const S=this;for(const h of HEROES){h.pos.z=clamp(h.pos.z,-0.4,0.4);h.vel.z*=0.5;}
    // мальчишка идёт вперёд, если ближайший герой рядом
    const bx=S.boy.g.position.x;const hx=Math.max(...[0,1].filter(pi=>!(G.solo&&pi===1)).map(pi=>active(pi).pos.x));const near=Math.abs(hx-bx);
    const stop=S.next<K5PG_NAMES.length?K5PG_NAMES[S.next][0]-1.5:78;const walk=hx>bx-6&&bx<stop;if(walk)S.boy.g.position.x+=dt*2.2;
    const R=S.boy.rig||{};const ph=G.time*8;if(R.hips)R.hips.rotation.z=walk?Math.sin(ph)*0.08:0;S.boy.g.position.y=walk?Math.abs(Math.sin(ph))*0.08:0;if(R.mouth)R.mouth.scale.y=0.4+(S.fr.length*0.1);
    // строка-отметка: имя загорается, друг встаёт рядом
    if(S.next<K5PG_NAMES.length){const [x,n,c,kind]=K5PG_NAMES[S.next];if(hx>=x-3&&bx>=x-2){const L=S.lab[S.next];L.sp.material.map=k5Paper(512,128,(g)=>{g.fillStyle=c;g.font='bold italic 72px Georgia,serif';g.textAlign='center';g.fillText(n,256,88);});L.sp.material.needsUpdate=true;
        anim(0.6,k=>L.sp.scale.set(4+k*1.5,1+k*0.4,1));AUD.ready()&&[0,4,7,12].forEach((s,i)=>AUD.bell(523*Math.pow(2,s/12),{v:0.05,d:1,at:i*0.08,wet:0.6}));k5Say(new V3(x,3,0.5),n+'!','#ffd76a');
        const f=new THREE.Group();k5Ink(new THREE.CylinderGeometry(0.25,0.32,0.8,8),new THREE.Color(c).getHex(),0,0.4,0,f);k5Ink(new THREE.SphereGeometry(0.28,10,8),new THREE.Color(c).getHex(),0,1.05,0,f);W.group.add(f);f.position.set(x,0,0.3);S.fr.push(f);S.next++;}}
    S.fr.forEach((f,i)=>{const tx=S.boy.g.position.x-1-i*0.9;f.position.x+=(tx-f.position.x)*Math.min(1,dt*2);f.position.y=Math.abs(Math.sin(G.time*8+i))*0.1;});
    if(!S.end&&S.next>=K5PG_NAMES.length&&S.boy.g.position.x>=77.5){S.end=true;banner('…и стало у мальчишки четверо друзей','#ffd76a',4,'Конец сказки · N — к началу полигона');if(FIN.fx&&FIN.fx.confetti)FIN.fx.confetti(new V3(78,3,0),40,1);}}};
