/* ============================== РЕЛИЗ final03 · SCATTER И ТРОПИНКА: трава, цветы, камешки, грибы, кромки, «хлебные крошки» ============================== */
// Правила расстановки: плотность на м², минимальное расстояние (сетка), зоны исключения вокруг интерактивного, спавнов, воды и лавы,
// случайный поворот, масштаб и оттенок. Всё низкое (до 0,4 м): героев не прячет и не выглядит препятствием.
// Тропинка: по центру пути коридорных уровней земля светлее и теплее (ведущая линия), по её краю — камешки и цветы («хлебные крошки»).
function scatterBlockers(){const P=[],pt=o=>o&&(o.pos||(o.g&&o.g.position)||(o.x!==undefined&&o.z!==undefined?o:null)||(o.mesh&&o.mesh.position));
  for(const k of['plates','items','bells','stakes','sockets','hots','chests','stumps','signs','forges','lifts','movers','pawStones','hummocks','crusts','vents','baits','covers','enemies','hittables','grabs','likhos','marks','webs'])
    for(const o of (W[k]||[])){const p=pt(o);if(p&&isFinite(p.x)&&isFinite(p.z))P.push({x:p.x,z:p.z,r:k==='enemies'?1.6:k==='items'?0.9:1.3});}
  for(const g of W.gates||[])P.push({x:(g.minx+g.maxx)/2,z:g.z,r:Math.max(1.5,(g.maxx-g.minx)/2+0.8),gate:g});
  for(const s of (W.spawns||[]))for(const v of s)if(v)P.push({x:v.x,z:v.z,r:1.4});
  const rects=[].concat(W.waters||[],W.lavas||[]).filter(z=>z&&z.minx!==undefined);return {P,rects};}
function scatterFree(BL,x,z,top,pad){for(const p of BL.P){if(p.gate){if(Math.abs(z-p.z)<0.9&&x>p.gate.minx-0.5&&x<p.gate.maxx+0.5)return false;continue;}if(Math.hypot(x-p.x,z-p.z)<p.r+(pad||0))return false;}
  for(const r of BL.rects)if(x>r.minx-0.3&&x<r.maxx+0.3&&z>r.minz-0.3&&z<r.maxz+0.3)return false;
  for(const b of W.boxes){if(!b.on)continue;if(x>b.minx-0.12&&x<b.maxx+0.12&&z>b.minz-0.12&&z<b.maxz+0.12&&b.maxy>top+0.05&&b.miny<top+1.4)return false;}
  for(const c of W.cyls){if(!c.on)continue;if(Math.hypot(x-c.x,z-c.z)<c.r+0.15&&c.miny<top+1.4&&c.maxy>top)return false;}return true;}
// ---------- тропинка ----------
function pathLine(B){if(!B)return null;const len=B.maxz-B.minz,wid=B.maxx-B.minx;if(len<wid*1.8||len<30)return null;const pts=[];
  const sp=[];for(const s of (W.spawns||[]))for(const v of s)if(v)sp.push(v);if(sp.length)pts.push({x:sp.reduce((a,v)=>a+v.x,0)/sp.length,z:Math.max(...sp.map(v=>v.z))+1});else pts.push({x:(B.minx+B.maxx)/2,z:B.maxz-1});
  const key=[];for(const b of W.bells||[])key.push({x:b.x,z:b.z});for(const g of W.gates||[])key.push({x:(g.minx+g.maxx)/2,z:g.z});for(const p of W.plates||[])key.push({x:p.x*0.5+(B.minx+B.maxx)/4,z:p.z});
  key.sort((a,b)=>b.z-a.z);for(const k of key)if(k.z<pts[pts.length-1].z-4)pts.push({x:Math.max(B.minx+2,Math.min(B.maxx-2,k.x)),z:k.z});pts.push({x:(B.minx+B.maxx)/2,z:B.minz+2});
  let P=pts;for(let it=0;it<2;it++){const Q=[P[0]];for(let i=0;i<P.length-1;i++){const a=P[i],b=P[i+1];Q.push({x:a.x*0.75+b.x*0.25,z:a.z*0.75+b.z*0.25},{x:a.x*0.25+b.x*0.75,z:a.z*0.25+b.z*0.75});}Q.push(P[P.length-1]);P=Q;}
  return P;}
function pathDist(P,x,z){let d=1e9;for(let i=0;i<P.length-1;i++){const a=P[i],b=P[i+1],dx=b.x-a.x,dz=b.z-a.z,L2=dx*dx+dz*dz||1;let t=((x-a.x)*dx+(z-a.z)*dz)/L2;t=t<0?0:t>1?1:t;d=Math.min(d,Math.hypot(x-a.x-dx*t,z-a.z-dz*t));}return d;}
const PATH_COL={grass:0xd6b27a,sand:0xfaecca,stone:0xece4d4,cloud:0xfff0c2,ash:0x8e7462,sea:0xeef4e6};
function paintPath(P){const W2=1.05,T=new THREE.Color(),C0=new THREE.Color();for(const g of (W.finG||[])){const m=g.mesh;if(!m||!m.geometry.attributes.aShade)continue;const k=surfKind(g.mat,W.theme);
    T.setHex(PATH_COL[k]||PATH_COL.grass);C0.copy(g.mat.color);const off=[T.r/Math.max(0.05,C0.r)-1,T.g/Math.max(0.05,C0.g)-1,T.b/Math.max(0.05,C0.b)-1].map(v=>Math.max(-0.85,Math.min(2.5,v)));
    const pos=m.geometry.attributes.position,A=m.geometry.attributes.aShade,e=m.matrixWorld.elements;let ch=false;
    for(let i=0;i+2<pos.count;i+=3){const y0=pos.getY(i),y1=pos.getY(i+1),y2=pos.getY(i+2);if(Math.max(y0,y1,y2)-Math.min(y0,y1,y2)>0.05)continue;
      const lx=(pos.getX(i)+pos.getX(i+1)+pos.getX(i+2))/3,lz=(pos.getZ(i)+pos.getZ(i+1)+pos.getZ(i+2))/3,x=lx+e[12],z=lz+e[14];if(g.top<y0+e[13]-0.3)continue;
      const d=pathDist(P,x,z)+n3(Math.round(x*1.5),Math.round(z*1.5),3,11)*0.3;if(d>W2+0.45)continue;const f=d<W2-0.2?1:(W2+0.45-d)/0.65;
      for(let k2=0;k2<3;k2++)for(let c=0;c<3;c++){const j=(i+k2)*3+c,a=A.array[j];A.array[j]=a*(1-f)+(off[c]+a*0.5)*f;}ch=true;}
    if(ch)A.needsUpdate=true;}}
// ---------- расстановка ----------
function dressScatter(){const G0=W.finG||[];if(!G0.length)return;const q=FIN.set.quality,dens=q==='low'?0.35:q==='mid'?0.7:1,BL=scatterBlockers(),R=kRng(seedOf(W.levelId)+41);
  const P=DRESS.path=pathLine(DRESS.B);const items=[];const grid=new Map(),cellOf=(x,z,c)=>Math.floor(x/c)+','+Math.floor(z/c);
  const far=(x,z,md)=>{const cx=Math.floor(x/md),cz=Math.floor(z/md);for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++){const a=grid.get(md+':'+(cx+i)+','+(cz+j));if(a)for(const p of a)if(Math.hypot(p[0]-x,p[1]-z)<md)return false;}return true;};
  const mark=(x,z,md)=>{const k=md+':'+cellOf(x,z,md);let a=grid.get(k);if(!a){a=[];grid.set(k,a);}a.push([x,z]);};
  const forest=/forest|dark|evening|swamp/.test(W.theme||'');const caps={tuft:1600,flower:260,peb:380,mush:60,fern:160,shell:80,ember:120,emberGlow:120};const cnt={};
  const put=(name,v,x,z,y,s,o)=>{cnt[name]=(cnt[name]||0)+1;if(cnt[name]>caps[name.replace(/^pebble$/,'peb').replace(/^(amanita|boletus|glowStems|glowCaps)$/,'mush').replace(/^(starfish)$/,'shell')]*dens)return;items.push(Object.assign({name,v,x,y,z,s,ry:R()*6.283},o||{}));};
  for(const g of G0){const k=surfKind(g.mat,W.theme);const w=g.maxx-g.minx,d=g.maxz-g.minz,area=w*d;if(area<1)continue;
    const spec=k==='grass'?[['tuft',0.9,0.34],['flower',0.07,0.8],['pebble',0.03,0.9],[forest?'mush':'pebble',forest?0.012:0.01,2]]:k==='sand'?[['pebble',0.07,0.7],['shell',0.03,1.2],['tuft',0.06,0.8]]:
      k==='stone'?[['pebble',0.05,0.8],['tuft',0.14,0.5]]:k==='sea'?[['tuft',0.2,0.5],['shell',0.03,1.2],['pebble',0.04,0.9]]:k==='ash'?[['pebble',0.12,0.6],['ember',0.015,2.5]]:[];
    for(const [name,per,md] of spec){const n=Math.min(2600,area*per*dens);for(let i=0;i<n;i++){const x=g.minx+0.25+R()*(w-0.5),z=g.minz+0.25+R()*(d-0.5);
        if(P&&name!=='tuft'&&pathDist(P,x,z)<1.1)continue;if(P&&name==='tuft'&&pathDist(P,x,z)<0.75&&R()<0.85)continue;
        if(!far(x,z,md)||!scatterFree(BL,x,z,g.top))continue;mark(x,z,md);const y=g.top;
        if(name==='tuft')put('tuft',k==='grass'?0:2,x,z,y,0.75+R()*0.7,{tint:k==='sea'?new THREE.Color(0.55,0.95,0.8):k==='sand'?new THREE.Color(1.1,1.05,0.7):0.85+R()*0.3});
        else if(name==='flower')put('flower',[0,1,2][Math.floor(R()*3)],x,z,y,0.85+R()*0.5);
        else if(name==='pebble')put('pebble',0,x,z,y,0.6+R()*1.1,{tint:k==='ash'?0.45:0.85+R()*0.3});
        else if(name==='mush'){put(R()<0.5?'amanita':'boletus',0,x,z,y,0.8+R()*0.6);}
        else if(name==='shell')put(R()<0.6?'shell':'starfish',0,x,z,y,0.8+R()*0.6);
        else if(name==='ember'){const v=R()<0.5?0:1,s=0.5+R()*0.4;put('ember',v,x,z,y,s);put('emberGlow',v,x,z,y,s,{ry:items[items.length-1]?items[items.length-1].ry:0,mat:'glow'});}}}
    // кромка: мелкие кусты-папоротники и камешки вдоль внешних краёв (где за краем — обрыв)
    if(k==='grass'||k==='sand'||k==='stone'){const per=2*(w+d),n=Math.floor(per/1.3*dens);for(let i=0;i<n;i++){const u=R()*per,ins=0.25+R()*0.35;let x,z,ox,oz;
        if(u<w){x=g.minx+u;z=g.maxz-ins;ox=0;oz=1;}else if(u<w+d){x=g.maxx-ins;z=g.maxz-(u-w);ox=1;oz=0;}else if(u<2*w+d){x=g.maxx-(u-w-d);z=g.minz+ins;ox=0;oz=-1;}else{x=g.minx+ins;z=g.minz+(u-2*w-d);ox=-1;oz=0;}
        if(inRects((W.finG||[]).filter(o=>o!==g&&Math.abs(o.top-g.top)<0.6),x+ox*1.2,z+oz*1.2,0))continue;if(R()<0.35||!scatterFree(BL,x,z,g.top,0.3))continue;
        const r=R();R();if(k==='grass')put(r<0.55?'fern':r<0.8?'tuft':'pebble',0,x,z,g.top,r<0.55?0.6+R()*0.4:1+R()*0.6,{tint:0.8+R()*0.3});else put('pebble',0,x,z,g.top,1+R()*1.2);}}}
  // «хлебные крошки» по краю тропинки
  if(P){let acc=0;for(let i=0;i<P.length-1;i++){const a=P[i],b=P[i+1],L=Math.hypot(b.x-a.x,b.z-a.z);if(L<1e-3)continue;const nx=-(b.z-a.z)/L,nz=(b.x-a.x)/L;
      for(let t=0;t<L;t+=1.7){acc++;for(const sd of[-1,1]){if(R()<0.35)continue;const off=1.25+R()*0.3,x=a.x+(b.x-a.x)*t/L+nx*off*sd,z=a.z+(b.z-a.z)*t/L+nz*off*sd;const g=inRects(G0,x,z,-0.2);if(!g||!scatterFree(BL,x,z,g.top))continue;
          const k=surfKind(g.mat,W.theme);if(k==='cloud'||k==='ash')continue;put(R()<0.7?'pebble':'flower',0,x,z,g.top,R()<0.7?1.1+R()*0.6:0.9,{tint:1.05});}}}
    paintPath(P);}
  instKit(items);DRESS.scatterN=items.length;}
