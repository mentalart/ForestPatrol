  /* ---------- Застава трёх богатырей: южный мыс с холмом в 1,5 м, ворота с доской-вывеской, башни, частокол, три богатыря, тропа ---------- */
  // Холм ходится по склону (W.surfs) и нарисован такой же сеткой из плоских граней. Ворота открыты, когда хватает самоцветов на испытание (или оно уже куплено).
  function buildZastavaHill(){
    const H=1.5,Y=H,CX=0,CZ=22.2,PA=7.4,PB=5.8,FA=12.6,FB=10.2,GZ=-1.7;   // холм: центр, плато и подножие (полуоси); GZ — линия ворот от центра
    const rr=(a,b,t)=>1/Math.hypot(Math.cos(t)/a,Math.sin(t)/b),wob=t=>1+0.05*Math.sin(t*3+0.7)+0.035*Math.sin(t*5+2.1);
    const hillH=(x,z)=>{if(z<CZ-FB*1.12||z>CZ+FB*1.12||x<CX-FA*1.12||x>CX+FA*1.12)return 0;const dx=x-CX,dz=z-CZ,d=Math.hypot(dx,dz);if(d<1e-6)return H;const t=Math.atan2(dz,dx),w=wob(t),rp=rr(PA,PB,t)*w,rf=rr(FA,FB,t)*w,k=clamp((rf-d)/(rf-rp),0,1);return H*(0.5*k+0.5*smooth(k));};   // за пределами холма — сразу 0: groundAt зовут часто
    const open=()=>gemsAvail()>=2||ZAST.some(z=>G.owned[z.id]);
    // --- земля мыса и стены по краю (южная стена хаба разрезана: мыс примыкает к лужайке)
    ground(-14,14,12,33.6);
    wall(-20.2,-14,12,12.2);wall(14,20.2,12,12.2);wall(-14.2,-14,12,33.8);wall(14,14.2,12,33.8);wall(-14.2,14.2,33.6,33.8);
    // склон: прыжок «в» склон снизу подхватывает на поверхность, а не проваливает внутрь холма
    const HILL={hill:true};
    W.surfs.push((x,z,reach,hh)=>{const y=hillH(x,z);if(y<0.002)return null;if(y<=reach+0.001)return {y,ref:HILL};return hh&&!hh.grounded&&hh.vel.y<=0.001&&y-hh.pos.y<1.7?{y,ref:HILL}:null;});
    // --- слияние кусочков в одну сетку (цвет — по вершинам): частокол, брёвна и травинки не плодят сотни мешей
    const _q=new THREE.Quaternion(),_e=new THREE.Euler(),_p=new V3(),_s=new V3();
    const mx=(x,y,z,rx,ry,rz,sx,sy,sz)=>new THREE.Matrix4().compose(_p.set(x,y,z),_q.setFromEuler(_e.set(rx||0,ry||0,rz||0)),_s.set(sx||1,sy||1,sz||1));
    const merge=items=>{const pos=[],nor=[],col=[];for(const it of items){const g=it.g.index?it.g.toNonIndexed():it.g.clone();g.applyMatrix4(it.m);const p=g.attributes.position.array,n=g.attributes.normal.array;
        for(let i=0;i<p.length;i++){pos.push(p[i]);nor.push(n[i]);}for(let i=0;i<p.length/3;i++)col.push(it.c.r,it.c.g,it.c.b);}
      const g2=new THREE.BufferGeometry();g2.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g2.setAttribute('normal',new THREE.Float32BufferAttribute(nor,3));g2.setAttribute('color',new THREE.Float32BufferAttribute(col,3));return g2;};
    const vcMat=()=>M(0xffffff,{vertexColors:true}),tone=(hex,k)=>new THREE.Color(hex).multiplyScalar(k),goldM=()=>M(COL.gold,{emissive:0x806010,emissiveIntensity:0.5});
    const gLog=new THREE.CylinderGeometry(0.2,0.22,1,7),gTip=new THREE.ConeGeometry(0.2,0.45,7),gBox=new THREE.BoxGeometry(1,1,1);
    // --- сам холм
    {const NR=16,NS=48,pos=[],col=[],gc=(W.grass&&W.grass.color)||new THREE.Color(0x7ab060);
      const vt=(k,j)=>{const t=j/NS*Math.PI*2,d=rr(FA,FB,t)*wob(t)*k/NR,x=CX+Math.cos(t)*d,z=CZ+Math.sin(t)*d,h=hillH(x,z),nz=0.5+0.5*Math.sin(x*1.7+z*0.9)*Math.cos(z*1.3-x*0.6);
        return [x,h-0.07*(1-h/H),z,new THREE.Color(gc.r,gc.g,gc.b).multiplyScalar(0.92+0.16*nz+0.07*h/H)];};
      const put=v=>{pos.push(v[0],v[1],v[2]);col.push(v[3].r,v[3].g,v[3].b);};
      for(let k=0;k<NR;k++)for(let j=0;j<NS;j++){const A=vt(k,j),B=vt(k,j+1),C=vt(k+1,j),D=vt(k+1,j+1);put(A);put(B);put(C);put(B);put(D);put(C);}
      const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));g.setAttribute('color',new THREE.Float32BufferAttribute(col,3));g.computeVertexNormals();
      const hm=new THREE.Mesh(g,vcMat());hm.receiveShadow=true;W.group.add(hm);}
    // --- тропа от лужайки к воротам: плиты по склону, наклонённые вдоль земли
    const trail=[[-1.2,7.2],[0.8,9.4],[0.3,11.6],[-0.9,13.6],[-0.4,15.2],[0,16.4]];
    {const up=new V3(0,1,0);let carry=0,i=0;
      for(let s=0;s<trail.length-1;s++){const a=trail[s],b=trail[s+1],L=Math.hypot(b[0]-a[0],b[1]-a[1]),ang=Math.atan2(b[0]-a[0],b[1]-a[1]);let d=carry;
        while(d<L){const u=d/L,x=lerp(a[0],b[0],u)+(i%2?0.1:-0.1),z=lerp(a[1],b[1],u),e=0.2,gx=(hillH(x+e,z)-hillH(x-e,z))/(2*e),gz=(hillH(x,z+e)-hillH(x,z-e))/(2*e);
          const pl=addMesh(new THREE.BoxGeometry(0.64,0.06,0.44),M([0xc8b080,0xd2bc8a,0xbca674][i%3]),x,hillH(x,z)+0.03,z);pl.castShadow=false;
          pl.quaternion.setFromUnitVectors(up,new V3(-gx,1,-gz).normalize()).multiply(new THREE.Quaternion().setFromAxisAngle(up,ang+(i%3-1)*0.12));d+=0.8;i++;}
        carry=d-L;}}
    const fadeBits=[];                                   // что становится прозрачным, когда заслоняет героев
    // --- башни: сруб «в обло», верхний ярус с бойницами, шатёр, золотой шар
    const tower=(u,v)=>{const mk=W.group.children.length,x=CX+u,z=CZ+v,g=new THREE.Group();g.position.set(x,Y,z);W.group.add(g);const it=[];
      for(let k=0;k<6;k++){const y=0.22+k*0.43,o=(k%2)*0.08;for(const sx of[-1,1]){it.push({g:gLog,m:mx(o,y,sx*0.95,0,0,Math.PI/2,1.1,2.5,1.1),c:tone(0x8a5a32,0.86+0.07*((k+sx+2)&3))});it.push({g:gLog,m:mx(sx*0.95,y+0.2,o,Math.PI/2,0,0,1.1,2.5,1.1),c:tone(0x8a5a32,0.9+0.06*((k*2+sx+2)&3))});}}
      for(let k=0;k<3;k++){const y=3.0+k*0.43;for(const sx of[-1,1]){it.push({g:gLog,m:mx(0,y,sx*1.2,0,0,Math.PI/2,1.1,3.0,1.1),c:tone(0x9a6a3c,0.88+0.06*((k+sx+2)&3))});it.push({g:gLog,m:mx(sx*1.2,y+0.2,0,Math.PI/2,0,0,1.1,3.0,1.1),c:tone(0x9a6a3c,0.92)});}}
      it.push({g:gBox,m:mx(0,2.88,0,0,0,0,2.9,0.14,2.9),c:tone(0x5a3a1a,1)});
      for(const[wx,wz,ry]of[[0,1.47,0],[0,-1.47,0],[1.47,0,Math.PI/2],[-1.47,0,Math.PI/2]])it.push({g:gBox,m:mx(wx,3.5,wz,0,ry,0,0.55,0.62,0.1),c:new THREE.Color(0x24160c)});
      const body=new THREE.Mesh(merge(it),vcMat());body.castShadow=body.receiveShadow=true;g.add(body);
      const roof=addMesh(new THREE.ConeGeometry(2.5,2.1,8),M(0x9a3a26),0,4.95,0,g);roof.rotation.y=Math.PI/8;
      addMesh(new THREE.CylinderGeometry(0.1,0.1,0.34,6),M(0x6a4326),0,6.15,0,g);addMesh(new THREE.SphereGeometry(0.17,8,6),goldM(),0,6.4,0,g);
      for(const k of[-0.6,0.6]){const sh=addMesh(new THREE.CylinderGeometry(0.42,0.42,0.07,16),M(k<0?0xb8201a:0x3a6ad0),k*1.1,1.5,-1.5,g);sh.rotation.x=Math.PI/2;sh.castShadow=false;addMesh(new THREE.SphereGeometry(0.12,8,6),goldM(),k*1.1,1.5,-1.56,g).castShadow=false;}
      colBox(x-1.4,x+1.4,Y-0.3,Y+4.6,z-1.4,z+1.4,false);fadeBits.push(since(mk));};
    tower(-4.8,GZ);tower(4.8,GZ);
    // --- частокол: дуга позади и по бокам, от башни до башни; брёвна заострены, две перекладины изнутри
    {const it=[],A=6.2,B=4.6,a0=Math.asin(GZ/B),a1=Math.PI-a0,pts=[];let prev=null,acc=0;
      for(let f=a0;f<=a1;f+=0.004){const p=[A*Math.cos(f),B*Math.sin(f)];if(!prev){pts.push(p);prev=p;continue;}acc+=Math.hypot(p[0]-prev[0],p[1]-prev[1]);prev=p;if(acc>=0.4){acc=0;pts.push(p);}}
      pts.forEach((p,i)=>{const h=2.7+0.5*Math.sin(i*2.3)+0.25*Math.sin(i*5.1),x=CX+p[0],z=CZ+p[1],tx=0.04*Math.sin(i*1.7),tz=0.04*Math.cos(i*2.9),c=tone(0x8a5a32,0.82+0.07*((i*7)%4));
        it.push({g:gLog,m:mx(x,Y-0.25+h/2,z,tx,0,tz,1,h,1),c});it.push({g:gTip,m:mx(x,Y-0.25+h+0.2,z,tx,0,tz),c:tone(0xa87a44,0.92)});if(i%2===0)W.cyls.push({x,z,r:0.46,miny:-1,maxy:Y+3,on:true});
        if(i>0){const q=pts[i-1],mxp=(p[0]+q[0])/2,mzp=(p[1]+q[1])/2,ry=Math.atan2(q[0]-p[0],q[1]-p[1])+Math.PI/2,len=Math.hypot(p[0]-q[0],p[1]-q[1])+0.08,k=1-0.2/Math.hypot(mxp,mzp);
          for(const yy of[0.8,1.95])it.push({g:gBox,m:mx(CX+mxp*k,Y+yy,CZ+mzp*k,0,ry,0,len,0.13,0.1),c:new THREE.Color(0x5a3a1a)});}});
      const pal=new THREE.Mesh(merge(it),vcMat());pal.castShadow=pal.receiveShadow=true;W.group.add(pal);fadeBits.push([pal]);}
    // --- ворота: столбы, перемычка, створки, двускатная кровелька; вывеска-доска остаётся непрозрачной
    const gmk=W.group.children.length,gx=CX,gz=CZ+GZ,wood=M(0x8a5a32),woodD=M(0x5a3a1a);
    for(const s of[-1,1]){addMesh(new THREE.CylinderGeometry(0.27,0.3,6.1,8),wood,gx+s*2.85,Y+3.05,gz);W.cyls.push({x:gx+s*2.85,z:gz,r:0.4,miny:-1,maxy:Y+6.1,on:true});colBox(gx+(s>0?2.5:-3.5),gx+(s>0?3.5:-2.5),Y-0.3,Y+3.4,gz-0.3,gz+0.3,false);}
    addMesh(new THREE.BoxGeometry(6.2,0.5,0.55),woodD,gx,Y+4.0,gz);
    const leaves=[];for(const s of[-1,1]){const pv=new THREE.Group();pv.position.set(gx+s*2.55,Y,gz);W.group.add(pv);
      addMesh(new THREE.BoxGeometry(2.5,3.7,0.2),wood,-s*1.25,1.85,0,pv);for(const y of[0.7,1.85,3.0])addMesh(new THREE.BoxGeometry(2.5,0.16,0.26),M(0x2a2a30),-s*1.25,y,0,pv);
      addMesh(new THREE.TorusGeometry(0.2,0.04,6,12),M(COL.gold),-s*2.1,1.7,-0.15,pv);leaves.push(pv);}
    leaves.forEach(pv=>pv.traverse(o=>{if(o.isMesh)o.userData.noBatch=true;}));   // створки двигаются — в «пачки статики» релиза не сливаются
    const gateCol=colBox(gx-2.55,gx+2.55,Y-0.3,Y+3.8,gz-0.25,gz+0.25,false);
    for(const s of[-1,1]){const g2=new THREE.Group();g2.position.set(gx,Y+7.0,gz);g2.rotation.z=-s*0.32;W.group.add(g2);addMesh(new THREE.BoxGeometry(3.8,0.1,1.7),M(0x6a3a22),s*1.9,-0.05,0,g2);}
    fadeBits.push(since(gmk));
    // --- вывеска-доска над воротами: состояние испытаний рисуется на холсте и обновляется, когда что-то меняется
    const bc=document.createElement('canvas');bc.width=1024;bc.height=330;const bx=bc.getContext('2d'),btex=new THREE.CanvasTexture(bc);btex.anisotropy=4;
    const frame=addMesh(new THREE.BoxGeometry(5.3,1.75,0.14),M(0x4a2a14),gx,Y+5.2,gz-0.06);frame.castShadow=false;
    const board=new THREE.Mesh(new THREE.PlaneGeometry(5.0,1.6),MB(0xffffff,{map:btex}));board.position.set(gx,Y+5.2,gz-0.15);board.rotation.y=Math.PI;W.group.add(board);fadeBits.push([frame,board]);
    const boardKey=()=>ZAST.map(z=>[G.owned[z.id]?1:0,own(z.arm)?1:0,(G.zbest||{})[z.id]||0].join()).join('|')+(open()?'o':'c');
    const drawBoard=()=>{const w=bc.width,h=bc.height,zb=G.zbest||{},gr=bx.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#a8763f');gr.addColorStop(1,'#744a28');bx.fillStyle=gr;bx.fillRect(0,0,w,h);
      bx.strokeStyle='rgba(40,22,10,.4)';bx.lineWidth=3;for(const y of[104,214]){bx.beginPath();bx.moveTo(0,y);bx.lineTo(w,y);bx.stroke();}
      bx.strokeStyle='#e0b050';bx.lineWidth=9;bx.strokeRect(9,9,w-18,h-18);bx.textAlign='center';bx.fillStyle='#fff0c8';bx.font='bold 46px Georgia,serif';bx.fillText('★  ЗАСТАВА ТРЁХ БОГАТЫРЕЙ  ★',w/2,70);
      ZAST.forEach((z,i)=>{const cx=w/6+i*w/3,has=own(z.arm),op=!!G.owned[z.id],b=zb[z.id];
        if(i>0){bx.strokeStyle='rgba(40,22,10,.5)';bx.lineWidth=4;bx.beginPath();bx.moveTo(i*w/3,100);bx.lineTo(i*w/3,h-26);bx.stroke();}
        bx.fillStyle=has?'#ffd76a':'#fff0c8';bx.font='bold 40px Georgia,serif';bx.fillText(z.b.split(' ')[0],cx,146);bx.font='italic 26px Georgia,serif';bx.fillStyle='rgba(255,240,200,.85)';bx.fillText('«'+z.t+'»',cx,184,w/3-30);
        bx.font='bold 34px Georgia,serif';const st=has?'доспех  ★':b?'лучшее  '+zfmt(b):op?'открыто':'2 самоцвета';bx.fillStyle=has?'#ffd76a':op?'#d8f0b0':'#c8b898';
        if(!op&&!has){const lx=cx-bx.measureText(st).width/2-26;bx.fillRect(lx-12,262,24,20);bx.strokeStyle='#c8b898';bx.lineWidth=5;bx.beginPath();bx.arc(lx,262,8,Math.PI,0);bx.stroke();}
        bx.fillText(st,cx+((!op&&!has)?16:0),284);});
      btex.needsUpdate=true;};
    // --- три богатыря перед воротами (в релизе — резные модели каста, в прототипе — простые)
    const BP=[[-3.4,-4.4,-0.3],[0,-4.9,0],[3.4,-4.4,0.3]];
    const bog=['d','i','a'].map((k,i)=>{const[u,v,ry]=BP[i],b=makeBogatyr(k);b.g.position.set(CX+u,Y,CZ+v);b.g.rotation.y=Math.PI+ry;W.cyls.push({x:CX+u,z:CZ+v,r:0.7,miny:-1,maxy:Y+3,on:true});return b;});
    fadeBits.push(bog.map(b=>b.g));   // фигуры тоже становятся прозрачными, если заслоняют героев
    const rings=BP.map(([u,v])=>{const r=addMesh(new THREE.RingGeometry(0.95,1.2,28),MB(0xffd76a,{transparent:true,opacity:0.85,side:THREE.DoubleSide}),CX+u,Y+0.04,CZ+v);r.rotation.x=-Math.PI/2;r.castShadow=false;return r;});
    // --- двор за воротами: костёр, бочки, стойка с копьями (ворота открыты — можно зайти)
    const fire=new THREE.Group();fire.position.set(CX,Y,CZ+1.4);W.group.add(fire);
    for(let i=0;i<8;i++){const a=i/8*Math.PI*2;addMesh(new THREE.DodecahedronGeometry(0.2,0),M(0x7a7670),Math.cos(a)*0.62,0.1,Math.sin(a)*0.62,fire);}
    for(let i=0;i<3;i++){const l=addMesh(new THREE.CylinderGeometry(0.07,0.07,0.9,6),M(0x4a2c14),0,0.22,0,fire);l.rotation.z=1.1;l.rotation.y=i*2.09;}
    const flame=addMesh(new THREE.ConeGeometry(0.3,0.8,7),MB(0xff9a30,{transparent:true,opacity:0.9}),0,0.55,0,fire),flame2=addMesh(new THREE.ConeGeometry(0.17,0.55,6),MB(0xffe070,{transparent:true,opacity:0.95}),0,0.5,0,fire);flame.castShadow=flame2.castShadow=false;
    W.cyls.push({x:CX,z:CZ+1.4,r:0.75,miny:-1,maxy:Y+0.5,on:true});
    for(const[u,v]of[[-3.8,1.6],[-3.1,2.4],[3.6,1.8]]){addMesh(new THREE.CylinderGeometry(0.4,0.36,0.85,10),M(0x7a4a28),CX+u,Y+0.42,CZ+v);addMesh(new THREE.TorusGeometry(0.39,0.03,5,14),M(0x3a3a40),CX+u,Y+0.6,CZ+v).rotation.x=Math.PI/2;W.cyls.push({x:CX+u,z:CZ+v,r:0.45,miny:-1,maxy:Y+0.9,on:true});}
    {const rk=new THREE.Group();rk.position.set(CX+3.9,Y,CZ+0.2);rk.rotation.y=-0.9;W.group.add(rk);for(const y of[0.5,1.2])addMesh(new THREE.BoxGeometry(2.0,0.1,0.16),woodD,0,y,0,rk);
      for(let i=0;i<5;i++){addMesh(new THREE.CylinderGeometry(0.035,0.035,2.2,5),M(0x6a4a2a),-0.8+i*0.4,1.05,0,rk);addMesh(new THREE.ConeGeometry(0.07,0.26,5),M(0xd8d8e0),-0.8+i*0.4,2.28,0,rk);}
      W.cyls.push({x:CX+3.9,z:CZ+0.2,r:0.9,miny:-1,maxy:Y+2,on:true});}
    const fl=new THREE.PointLight(0xffa850,0,11,2);fl.position.set(CX,Y+1.6,CZ+1.2);W.group.add(fl);
    const gl=new THREE.PointLight(0xffc860,0,12,2);gl.position.set(CX,Y+3.4,CZ+GZ-1.6);W.group.add(gl);
    // --- вымпелы на башнях и фонари у ворот и на тропе: в закрытой Заставе серые и тусклые, в открытой — красные и тёплые
    const pennants=[];for(const s of[-1,1]){const gp=new THREE.BufferGeometry();gp.setAttribute('position',new THREE.Float32BufferAttribute([0,0.26,0,0,-0.26,0,1.5,0,0],3));gp.computeVertexNormals();
      const pm=new THREE.Mesh(gp,M(0xc0302a,{side:THREE.DoubleSide}));pm.position.set(CX+s*4.8,Y+6.9,CZ+GZ);pm.userData.noBatch=true;W.group.add(pm);pennants.push(pm);addMesh(new THREE.CylinderGeometry(0.035,0.035,1.2,5),M(0x6a4326),CX+s*4.8,Y+6.8,CZ+GZ);}
    const lamps=[],lamp=(x,z,y0,h)=>{const y=y0===undefined?hillH(x,z):y0;addMesh(new THREE.CylinderGeometry(0.07,0.09,h,8),M(0xb8201a),x,y+h/2,z);addMesh(new THREE.SphereGeometry(0.12,8,6),M(COL.gold),x,y+h+0.05,z);
      lamps.push(addMesh(new THREE.SphereGeometry(0.24,12,10),MB(0xffe08a,{transparent:true,opacity:0.95}),x,y+h+0.4,z));lamps[lamps.length-1].castShadow=false;W.cyls.push({x,z,r:0.2,miny:-1,maxy:y+h,on:true});};
    lamp(-2.0,13.4,undefined,2.3);lamp(1.9,12.8,undefined,2.3);
    for(const s of[-1,1]){const lx=gx+s*2.85;addMesh(new THREE.BoxGeometry(0.08,0.08,0.7),M(0x2a2a30),lx,Y+3.8,gz-0.62);addMesh(new THREE.CylinderGeometry(0.02,0.02,0.3,4),M(0x2a2a30),lx,Y+3.65,gz-0.9);   // фонари висят на воротных столбах: проход к воротам свободен
      const o=addMesh(new THREE.SphereGeometry(0.22,12,10),MB(0xffe08a,{transparent:true,opacity:0.95}),lx,Y+3.35,gz-0.9);o.castShadow=false;lamps.push(o);}
    // --- склон: валуны, травинки и цветы (в самой заставе и на тропе не растут)
    {const rock=(a,k,s,t)=>{const x=CX+Math.cos(a)*FA*k,z=CZ+Math.sin(a)*FB*k,y=hillH(x,z),r=addMesh(new THREE.DodecahedronGeometry(s,0),M([0xb89a78,0xc8a888,0xa88a68][t%3]),x,y+s*0.3,z);r.scale.set(1,0.62+0.1*(t%2),1.2);r.rotation.set(0.3*t,t*1.7,0.1*t);if(s>=0.6)W.cyls.push({x,z,r:s*1.0,miny:-1,maxy:y+s*0.8,on:true});};
      [[0.2,0.88,1.0],[0.45,0.9,0.6],[-0.15,0.86,0.7],[2.9,0.88,1.1],[2.6,0.9,0.65],[3.3,0.86,0.6],[1.45,0.92,0.8],[1.8,0.9,0.9],[-0.7,0.78,0.55],[-2.45,0.8,0.6],[4.3,0.82,0.7],[5.2,0.84,0.6]].forEach(([a,k,s],i)=>rock(a,k,s,i));
      const it=[],R=(()=>{let s=7;return()=>(s=(s*16807)%2147483647)/2147483647;})(),gT=new THREE.ConeGeometry(0.13,0.42,4),gS=new THREE.CylinderGeometry(0.012,0.012,0.3,4),gF=new THREE.SphereGeometry(0.075,5,4);
      for(let i=0;i<300;i++){const t=R()*Math.PI*2,k=Math.sqrt(R()),x=CX+Math.cos(t)*FA*0.93*k,z=CZ+Math.sin(t)*FB*0.93*k,h=hillH(x,z);if(h<0.05||h>H-0.02||x<-13.4||x>13.4||z>33||trail.some(p=>Math.hypot(p[0]-x,p[1]-z)<1.1))continue;
        if(R()<0.78)it.push({g:gT,m:mx(x,h+0.18,z,0,R()*6,0.1*(R()-0.5),0.8+R()*0.7,0.8+R()*0.6,0.8+R()*0.7),c:tone(0x6aa04a,0.7+R()*0.5)});
        else{it.push({g:gS,m:mx(x,h+0.14,z),c:new THREE.Color(0x4f8a3a)});it.push({g:gF,m:mx(x,h+0.32,z),c:new THREE.Color([0xff9ad0,0xfff08a,0x9ad0ff,0xffffff][i%4])});}}
      const fm=new THREE.Mesh(merge(it),vcMat());fm.castShadow=false;W.group.add(fm);}
    fadeBits.forEach(b=>fadeable(b));
    // --- живое: створки, свет, вымпелы, кольца у богатырей, костёр, вывеска
    const S={k:open()?1:0,key:'',open:open()};gateCol.on=!S.open;
    W.updates.push(dt=>{const op=open();if(op!==S.open){S.open=op;gateCol.on=!op;}S.k=damp(S.k,op?1:0,3,dt);const sk=smooth(S.k);leaves[0].rotation.y=-1.75*sk;leaves[1].rotation.y=1.75*sk;
      gl.intensity=0.8*sk;fl.intensity=(0.7+0.15*Math.sin(G.time*11))*sk;
      pennants.forEach((p,i)=>{p.material.color.setHex(op?0xc0302a:0x5a6a80);p.rotation.y=Math.sin(G.time*3+i*2)*0.28;p.scale.x=1+0.06*Math.sin(G.time*7+i);});
      lamps.forEach((o,i)=>{o.material.color.setHex(op?0xffe08a:0x7d8a96);o.material.opacity=op?0.95:0.65;o.scale.setScalar(op?1+0.08*Math.sin(G.time*4+i*2):0.85);});
      flame.visible=flame2.visible=op;if(op){flame.scale.set(1,0.85+0.3*Math.sin(G.time*9),1);flame2.scale.set(1,0.8+0.35*Math.sin(G.time*13+1),1);if(Math.random()<dt*3)burst(new V3(CX+rand(-0.2,0.2),Y+0.9,CZ+1.4+rand(-0.2,0.2)),0xffb040,1,1.6);}
      ZAST.forEach((z,i)=>{const has=own(z.arm),opn=!!G.owned[z.id],r=rings[[1,0,2][i]];r.visible=has||opn;r.material.color.setHex(has?0xffd76a:0xd8f0b0);r.material.opacity=has?0.9:0.5;});   // ZAST: Илья, Добрыня, Алёша — кольца по местам
      const key=boardKey();if(key!==S.key){S.key=key;drawBoard();}});
    drawBoard();
    const P=new V3(CX,Y,CZ-6.3);
    return {P,Y,hillH,open,bog,leaves,gateCol,S,label:new V3(CX,Y+7.4,gz-0.3),near:h=>hd(h.pos,P)<3.4&&Math.abs(h.pos.y-hillH(h.pos.x,h.pos.z))<1.2};
  }
