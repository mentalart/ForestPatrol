//@@
const out=[];for(const id of['2-1','2-2','2-3','2-4','2-5','2-B','luko']){try{ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(60);out.push(id+': ok obj='+U.obj().slice(0,100)+' links='+ZC.W.linkTotal+' nuts='+ZC.W.nutTotal);}catch(e){out.push(id+': ERR '+e.message+' '+(e.stack||'').split('\n').slice(0,3).join(' | '));}}out.join('\n')
