//@@
ZC.startFrom(ZC.LV('3-B'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(5);const W=ZC.W,F=W.flags;const sol=W.enemies.find(e=>e.kind==='solovei');const r=[];let t=0;window.IMM=()=>ZC.HERO&&Object.values(ZC.HERO).forEach(h=>{h.iT=99;});
while(sol.perch&&t<60*14){IMM();ZC.tick(1);t++;}ZC.tick(60);
IMM();sol.embers=0;sol.state='broken';sol.t=0;sol.bdur=9;ZC.tick(2);r.push(U.walkTo(0,sol.pos.x+0.3,sol.pos.z+2.2,3));const h=U.act(0);
r.push('d='+Math.hypot(sol.pos.x-h.pos.x,sol.pos.z-h.pos.z).toFixed(2),'dy='+(h.pos.y-sol.pos.y).toFixed(2),sol.state,'atkCd='+h.atkCd,'roll='+h.rollT,'hang='+h.hang,'kind='+h.kind);
h.face=Math.atan2(sol.pos.x-h.pos.x,sol.pos.z-h.pos.z);ZC.press('KeyF');ZC.tick(1);r.push('after: atkT='+h.atkT.toFixed(2),'ph='+F.phase,sol.state,'face='+h.face.toFixed(2));ZC.tick(20);r.push('ph='+F.phase);r.join(' | ')
