//@@
// релиз final06: 5-Б1 — камера боя: в кадре оба героя и кадр не прыгает (docs/34 5Б1-3); при подъёме иглы толчок не больше 0,15
window._errs=[];{const ce=console.error;console.error=(...a)=>{window._errs.push(String(a[0]&&a[0].stack||a[0]).slice(0,200));ce(...a);};}
Math.random=(()=>{let q=99;return()=>{q=(q*16807)%2147483647;return (q-1)/2147483646;};})();
const D=ZC.FIN.occ.dbg;ZC.FIN.occ.fdt=0.05;window.gs=()=>{const gl=D.renderer.getContext(),b=new Uint8Array(4);gl.readPixels(0,0,1,1,gl.RGBA,gl.UNSIGNED_BYTE,b);};
window.cam=()=>{ZC.FIN.occ.frame();gs();return D.camS;};
window.inView=()=>{const c=cam();c.updateMatrixWorld();return ZC.players.map(p=>{const h=p.heroes[p.act]||ZC.HERO.proshka,v=h.pos.clone();v.y+=1;v.project(c);return Math.abs(v.x)<0.95&&Math.abs(v.y)<0.95&&v.z<1;});};
window.SHK=0;window.stat={n:0,bad:0,jump:0};
ZC.startFrom(ZC.LV('5-B1'));ZC.G.manual=true;ZC.tick(60);ZC.skip();ZC.tick(5);
const W=ZC.W,F=W.flags;
window.sample=n=>{let prev=null;for(let i=0;i<n;i++){ZC.tick(12);const v=inView();stat.n++;if(!v.every(Boolean))stat.bad++;const c=cam().position.clone();if(prev&&c.distanceTo(prev)>2.5)stat.jump++;prev=c;}};
sample(25);
['stage='+F.stage,'n='+stat.n,'out='+stat.bad,'jumps='+stat.jump,'errs='+_errs.length]
//@@
// фаза 1 → 2 → 3: кадр держит обоих героев, в том числе в миг подъёма иглы
const W=ZC.W,F=W.flags;
sample(25);W.bossNext();sample(25);W.bossNext();ZC.tick(2);sample(25);
const ok=stat.bad===0&&stat.jump===0&&_errs.length===0;const r=['phase3='+!!F.phase3,'n='+stat.n,'out='+stat.bad,'jumps='+stat.jump,'errs='+_errs.length];if(!ok)throw new Error(r.join(' '));r
