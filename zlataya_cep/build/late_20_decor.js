/* ============================== РЕЛИЗ · ОКРУЖЕНИЕ: учёт земли для декора ============================== */
// final03: фактура «треугольники» (final01–02) выключена — грани теперь настоящие (сетка, шум и тон по вершинам в late_22_synty.js).
// Каждая плоскость земли запоминается: {minx,maxx,minz,maxz,top,mat} — по ним расставляются трава, цветы, камни и тропинка.
{const _ground=ground;ground=function(minx,maxx,minz,maxz,top,topMat,sideMat){const n0=W.group.children.length;const c=_ground(minx,maxx,minz,maxz,top,topMat,sideMat);
   const tp=W.group.children[n0+1];if(tp&&tp.isMesh)(W.finG||(W.finG=[])).push({minx,maxx,minz,maxz,top:top||0,mat:tp.material,mesh:tp});return c;};}
// вид поверхности по теме и цвету: трава, песок, камень, облако, пепел, дно
function surfKind(mat,theme){if(theme==='heaven'||theme==='skynight'||theme==='skyday')return 'cloud';if(theme==='smorodina'||theme==='forgein'||theme==='valy')return 'ash';if(theme==='kitezh')return 'sea';
  const hsl={h:0,s:0,l:0};mat.color.getHSL(hsl);if(hsl.h>0.16&&hsl.h<0.47&&hsl.s>0.18&&hsl.l<0.62)return 'grass';if(hsl.h>0.08&&hsl.h<0.17&&hsl.l>0.55)return 'sand';return 'stone';}
