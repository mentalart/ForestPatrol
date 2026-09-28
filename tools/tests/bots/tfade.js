U.go();const out=[];for(const id of['2-1','2-2','2-3','2-4','2-5','2-B','1-1']){ZC.loadLevel(ZC.LV(id));ZC.tick(3);out.push(id+':'+ZC.W.fades.length+'/'+ZC.W.fadeMeshes.length);}out.join(' ')
