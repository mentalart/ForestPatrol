//@@
ZC.startFrom(ZC.LV('3-B'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(5);const W=ZC.W,F=W.flags;const r=[];const sol=W.enemies.find(e=>e.kind==='solovei');
ZC.tick(60*11);for(let i=0;i<8;i++){ZC.tick(30);r.push(sol.state+' p='+sol.pos.x.toFixed(1)+','+sol.pos.y.toFixed(1)+','+sol.pos.z.toFixed(1)+' cd='+sol.cd.toFixed(1)+' nm='+sol.noMove+' perch='+sol.perch+' home='+sol.home.z.toFixed(1));}r.push(U.st());r
