/* ============================== РЕЛИЗ final06 · МИР 3: ВНЕШНИЙ ВИД — ПУХОВЫЕ КРАЯ ОСТРОВОВ, УЗОР МОСТКОВ, ГУСИ И КОРАБЛЬ (docs/38: w-isles, w-bridges, w-models) ============================== */
//  · облачные острова (cloudIsle) в мире 3 получают пуховый край: пояс облачков по кромке на уровне пола — плита больше не читается «коробкой»;
//  · мостки различимы без цвета: на золотых — солнышко, на лиловых — месяц (рисунок на материалах TILE_M, без лишних вызовов отрисовки);
//  · гуси (makeGoose): чёрные кончики крыльев и брови — сердитые, когда гусь подозревает (late_99zm поворачивает их по «!»);
//  · Летучий корабль (makeShip): золотое перо Жар-птицы на парусе и резной гребень на носу.
// Пуховой край — только вид (облачки в общем InstancedMesh, коллизии не меняются).
{const _ci=cloudIsle;cloudIsle=function(minx,maxx,minz,maxz,top,o){const c=_ci(minx,maxx,minz,maxz,top,o);if(!(W&&(W.world===3)))return c;top=top||0;
  const Wd=maxx-minx,D=maxz-minz,per=2*(Wd+D),n=Math.max(6,Math.round(per/1.1));W.puffs=W.puffs||[];
  for(let i=0;i<n;i++){let u=(i+0.5)/n*per,x,z;if(u<Wd){x=minx+u;z=maxz;}else if((u-=Wd)<D){x=maxx;z=maxz-u;}else if((u-=D)<Wd){x=maxx-u;z=minz;}else{u-=Wd;x=minx;z=minz+u;}
    W.puffs.push({x,y:top-0.42,z,s:0.55+((i*37)%10)/40});}
  return c;};}
// узор мостков: солнышко и месяц
{const pat=(kind)=>{const cv=document.createElement('canvas');cv.width=cv.height=64;const g=cv.getContext('2d');g.fillStyle='#ffffff';g.fillRect(0,0,64,64);
    g.fillStyle=kind==='light'?'#c88a20':'#5a3aa0';g.strokeStyle=g.fillStyle;g.lineWidth=4;
    if(kind==='light'){g.beginPath();g.arc(32,32,9,0,Math.PI*2);g.fill();for(let i=0;i<8;i++){const a=i*Math.PI/4;g.beginPath();g.moveTo(32+Math.cos(a)*14,32+Math.sin(a)*14);g.lineTo(32+Math.cos(a)*21,32+Math.sin(a)*21);g.stroke();}}
    else{g.beginPath();g.arc(32,32,16,0,Math.PI*2);g.fill();g.fillStyle='#ffffff';g.beginPath();g.arc(40,27,14,0,Math.PI*2);g.fill();}
    const t=new THREE.CanvasTexture(cv);t.anisotropy=2;return t;};
  try{for(const k of['light','shadow']){const tx=pat(k);for(const m of TILE_M[k]){m.map=tx;m.needsUpdate=true;}}}catch(e){}}
// гуси: кончики крыльев и брови
{const _mg=makeGoose;makeGoose=function(s){const r=_mg(s);const dk=MAT.dark;
  r.wings.forEach(w=>{const tip=part(w.wp,new THREE.BoxGeometry(0.42,0.05,0.5),M(0x2a2a30),w.sd*1.45,0.005,-0.12);tip.rotation.y=w.sd*0.2;});
  r.brows=[-1,1].map(sd=>{const b=part(r.head,new THREE.BoxGeometry(0.1,0.025,0.03),dk,sd*0.1,0.11,0.1);b.userData.sd=sd;return b;});return r;};}
// корабль: перо Жар-птицы на парусе, гребень на носу
{const _sh=makeShip;makeShip=function(){const r=_sh();try{const cv=document.createElement('canvas');cv.width=64;cv.height=128;const g=cv.getContext('2d');
    const gr=g.createLinearGradient(0,0,0,128);gr.addColorStop(0,'#ffe9a0');gr.addColorStop(1,'#ff8a30');g.fillStyle=gr;g.beginPath();g.moveTo(32,4);g.quadraticCurveTo(60,60,32,124);g.quadraticCurveTo(4,60,32,4);g.fill();
    g.strokeStyle='#b85a10';g.lineWidth=2;g.beginPath();g.moveTo(32,10);g.lineTo(32,120);g.stroke();for(let i=0;i<7;i++){g.beginPath();g.moveTo(32,24+i*13);g.lineTo(12+i*1.5,14+i*13);g.moveTo(32,24+i*13);g.lineTo(52-i*1.5,14+i*13);g.stroke();}
    const em=new THREE.Mesh(new THREE.PlaneGeometry(1.1,2.2),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(cv),transparent:true,side:THREE.DoubleSide,depthWrite:false}));em.position.set(0,0.02,0.04);r.sail.add(em);
    const crest=new THREE.Group();crest.position.set(0,1.75,-8.5);r.hull.add(crest);for(let i=0;i<5;i++){const f=part(crest,new THREE.ConeGeometry(0.09,0.7-i*0.08,5),M(COL.gold,{emissive:0x806010,emissiveIntensity:0.4}),(i-2)*0.13,0.25,0.05*Math.abs(i-2));f.rotation.z=(i-2)*-0.25;}}catch(e){}
  return r;};}
