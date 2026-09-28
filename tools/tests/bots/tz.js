U.go();ZC.loadLevel(2);const Z=ZC.W.zven;const L=[];for(let i=0;i<60*30;i++){ZC.tick(1);if(i%120==0)L.push((i/60|0)+'s:'+(Z.vis?'V':'-')+Z.pos.z.toFixed(0));}L.join(' ')
