//@@
Math.random=(()=>{let q=12345;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();ZC.startFrom(ZC.LV('5-1'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(5);const W=ZC.W,H=ZC.HERO;
W.flags.hollow=true;W.flags.meadowClear=true;W.enemies.forEach(e=>{e.alive=false;e.g.visible=false;});W.flags.stage='clew';
const a=U.act(0);a.pos.set(0.4,0,-25.2);ZC.tick(5);a.face=Math.atan2(-4.4-a.pos.x,-29.8-a.pos.z);U.tap('KeyR');const r=[];
for(let i=0;i<8;i++){ZC.tick(5);const t=W.threads[0];if(t)r.push(i+':'+t.len.toFixed(1)+':'+t.grow+':'+t.string+' d='+t.dx.toFixed(2)+','+t.dz.toFixed(2)+' y='+t.y.toFixed(2));}
const t=W.threads[0];const tx=t.sx+t.dx*t.len,tz=t.sz+t.dz*t.len;r.push('tip '+tx.toFixed(1)+','+tz.toFixed(1));
r.push('boxes:'+W.boxes.filter(b=>b.on&&b.maxy>t.y+0.35&&b.miny<t.y+1&&tx>b.minx-0.5&&tx<b.maxx+0.5&&tz>b.minz-0.5&&tz<b.maxz+0.5).map(b=>[b.minx,b.maxx,b.miny,b.maxy,b.minz,b.maxz].map(v=>v.toFixed(1)).join(',')).join(' | '));
r.push('cyls:'+W.cyls.filter(c=>c.on&&Math.hypot(tx-c.x,tz-c.z)<c.r+0.5).map(c=>c.x+','+c.z+','+c.r).join(' | '));r
