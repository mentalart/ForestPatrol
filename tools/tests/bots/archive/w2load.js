//@@
const out=[];for(const id of['2-1','2-2','2-3','2-4']){try{ZC.startFrom(ZC.LV(id));ZC.G.manual=true;ZC.tick(30);ZC.skip();ZC.tick(60);out.push(id+': ok obj='+U.obj().slice(0,120)+' links='+ZC.W.linkTotal+' nuts='+ZC.W.nutTotal);}catch(e){out.push(id+': ERR '+e.message+' '+(e.stack||'').split('\n').slice(0,3).join(' | '));}}out.join('\n')
//@@ shot=w21a.png
ZC.startFrom(ZC.LV('2-1'));ZC.G.manual=true;ZC.tick(20);ZC.skip();ZC.tick(20);U.st()
