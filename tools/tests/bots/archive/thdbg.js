//@@
ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(20);ZC.goLevel('luko');ZC.tick(120);ZC.skip&&ZC.skip();ZC.tick(90);const W=ZC.W,F=W.flags;const L=[];
const r=[F.stage,'cine='+!!ZC.G.cine,'ui='+ZC.G.ui];U.walkTo(0,-12.6,3.0,8,(h,i)=>{if(i%40==0)L.push(h.pos.x.toFixed(1)+','+h.pos.z.toFixed(1)+(ZC.G.cine?'C':'')+(ZC.G.ui?'U':''));});r.push(L.join(' '));r
