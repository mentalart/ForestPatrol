//@@
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('5-2'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(5);const W=ZC.W,H=ZC.HERO;
const r=[];const pe=H.pelageya;const q=U.walkTo(1,-4.95,-13.05,8);r.push(q,'pe='+pe.pos.x.toFixed(2)+','+pe.pos.z.toFixed(2));
r.push('cyls near:'+W.cyls.filter(c=>c.on&&Math.hypot(c.x-pe.pos.x,c.z-pe.pos.z)<c.r+1.2).map(c=>c.x.toFixed(1)+','+c.z.toFixed(1)+' r'+c.r.toFixed(2)).join(' | '));
r.push('boxes near:'+W.boxes.filter(b=>b.on&&pe.pos.x>b.minx-1&&pe.pos.x<b.maxx+1&&pe.pos.z>b.minz-1&&pe.pos.z<b.maxz+1&&b.maxy>0.2).map(b=>[b.minx,b.maxx,b.miny,b.maxy,b.minz,b.maxz].map(v=>v.toFixed(1)).join(',')).join(' | '));r
