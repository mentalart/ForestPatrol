// релиз: кадры широких «прозрачных стен» из одного меша (tfin_fadewide) — герой ставится за стену, печатается, какие куски растворились
window.O=ZC.FIN.occ;O.fdt=0.05;
window.WS=(id,x,z,back)=>{ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.tick(10);for(let q=0;q<40&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}ZC.tick(20);const W=ZC.W,cam=O.dbg.camS;
  const put=()=>{const d=new THREE.Vector3(x-cam.position.x,0,z-cam.position.z).normalize();for(const pi of[0,1]){const h=U.act(pi);h.pos.set(x+d.x*back+(pi?1.2:-1.2)*d.z,h.pos.y+2,z+d.z*back-(pi?1.2:-1.2)*d.x);h.vel.set(0,0,0);}};
  put();ZC.tick(90);for(let q=0;q<20&&ZC.G.cine;q++){ZC.skip();ZC.tick(5);}put();ZC.tick(90);for(let i=0;i<30;i++){ZC.tick(1);O.frame();}
  const box=new Map();for(const m of W.fadeMeshes){const f=m.userData.fadeRef;if(!f||!(f.w>0.3))continue;const b=new THREE.Box3().setFromObject(m);if(!box.has(f))box.set(f,b.clone());else box.get(f).union(b);}
  const on=[...box.values()].map(b=>(b.max.x-b.min.x).toFixed(1)+'x'+(b.max.y-b.min.y).toFixed(1)+'x'+(b.max.z-b.min.z).toFixed(1));
  return id+(ZC.G.cine?' CINE':'')+' heroes '+[0,1].map(pi=>U.act(pi).pos.toArray().map(v=>v.toFixed(1)).join(',')).join(' ')+' cam '+cam.position.toArray().map(v=>v.toFixed(0)).join(',')+' faded: '+on.join(' ');};
'ok'
//@@ shot=fw_24.png
WS('2-4',0,-48,2)
//@@ shot=fw_15.png
WS('1-5',0,-34,2)
//@@ shot=fw_41.png
WS('4-1',-6,-26,2)
//@@ shot=fw_21.png
WS('2-1',-9,-37,4)
//@@ shot=fw_51.png
WS('5-1',0,-108,5)
//@@ shot=fw_p.png
WS('p',0,-3,5)
