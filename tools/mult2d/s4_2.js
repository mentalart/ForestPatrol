// Серия 1 v4, сцены 3–6: «Дежурство», титр, «Никто не слышит» (правило трёх), «Фонарь» (панели 13–29).
// Совиный слух: звук раньше картинки — пёрышки на ушах вздрагивают, потом вспышка над морем. Конец клипа 1 — вороны на луне.
'use strict';
(() => {
const {seg, ease, lerp, clamp, twos} = MD, SP = MD.spr, S = MD.s4;
const {shot, cue, D, play, listen, A, plate, at, glowAt, flash, prop, zven, trail} = S;

// =================== 13. Крыша ночью: Пелагея одна под огромным небом ===================
shot(1.8, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 900, z: 1.08}], [L, {x: 540, y: 960, z: 1}]]);
  plate(ctx, t, cam, 'v4_krysha', .9);
  MD.layer(ctx, t, cam, 1, c => {
    A(c, 'pelageya', {x: 640, y: 1600, s: .3, light: 'night'}, listen('pelageya', t, {look: [1, -1]}));
    prop(c, 'lantern', 720, 1560, {w: 60}); glowAt(c, 720, 1560, 180, .45);
  });
});

// =================== 14. Крупно: пёрышки на ушах вздрагивают — «дзынь» издалека ===================
const s14 = shot(1.4, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 760, z: 2.2}], [L, {x: 540, y: 740, z: 2.35}]]);
  plate(ctx, t, cam, 'v4_krysha', .85);
  MD.layer(ctx, t, cam, 1, c => {
    const tw = MD.spring(lt, .35, 4, 4) + MD.spring(lt, .8, 4, 4) * .7;
    A(c, 'pelageya', {x: 540, y: 1300, s: .78, light: 'night'}, {t, eyes: lt > .4 ? 'wow' : 'open', look: [1, -.4], tilt: tw * .05, mouth: 'X'});
    for (const [d, u0] of [[.35, 0], [.8, 0]]) { const u = seg(lt, d, d + .6); if (u <= 0 || u >= 1) continue;
      c.save(); c.globalAlpha = 1 - u; c.strokeStyle = '#FFE6A0'; c.lineWidth = 5; c.beginPath(); c.arc(780, 640, 40 + u * 140, -1, .3); c.stroke(); c.restore(); }
  });
});
cue(s14, .35, 'ding_far'); cue(s14, .8, 'ding_far');

// =================== 15. Гэг: голова совы поворачивается на 180° ===================
shot(1.3, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 1000, z: 1.6}], [L, {x: 540, y: 990, z: 1.65}]]);
  plate(ctx, t, cam, 'v4_krysha', .9);
  MD.layer(ctx, t, cam, 1, c => {
    const k = MD.anticip(lt, .2, .7, .15, .1);   // поворот: сжатие — переворот детали «в профиль» — анфас назад
    A(c, 'pelageya', {x: 540, y: 1620, s: .7, light: 'night', flip: k > .5}, {t, look: [k > .5 ? -1 : 1, -.3], tilt: Math.sin(k * Math.PI) * .25, sx: 1 - Math.sin(k * Math.PI) * .35, mouth: 'X'});
  });
});

// =================== 16. Далеко над морем — золотая вспышка, пять искр в пять сторон ===================
const s16 = shot(2.2, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 960, z: 1}], [L, {x: 540, y: 900, z: 1.12}]]);
  plate(ctx, t, cam, 'v4_gorizont', .9);
  MD.layer(ctx, t, cam, .5, c => {
    const [hx, hy] = at(560, 820), f = seg(lt, .25, .55), fade = 1 - seg(lt, .6, 1.6);
    if (f > 0) { MD.radial(c, hx, hy, 60 + 420 * ease.out(f), `rgba(255,214,110,${.9 * fade})`); MD.burst(c, lt, .25, hx, hy, '#FFE6A0', 18, 300, .6); }
    [[-1.2, .9], [-.6, 1.1], [0, 1.25], [.6, 1.1], [1.2, .9]].forEach(([dx, sp], i) => { const u = seg(lt, .4, L); if (u <= 0) return;
      const pts = []; for (let k = 0; k <= 10; k++) { const v = u * k / 10; pts.push([hx + dx * 520 * v, hy - sp * 620 * v + 260 * v * v]); }
      trail(c, pts, .8 * (1 - u * .5)); MD.radial(c, pts[10][0], pts[10][1], 26, 'rgba(255,230,150,.95)'); });
  });
});
cue(s16, .25, 'flash_far');

// =================== 17. Журнал: «Запись сорок третья» ===================
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 960, z: 1.02}], [L, {x: 540, y: 940, z: 1.08}]]);
  MD.layer(ctx, t, cam, .9, c => { c.fillStyle = '#20284E'; c.fillRect(-300, -300, 1700, 2600); glowAt(c, 820, 400, 700, .55); });
  MD.layer(ctx, t, cam, 1, c => {
    prop(c, 'notebook', 540, 980, {w: 980, rot: .03});
    MD.s4.writing(c, t, lt, 560, 800, 400, ['Над морем — вспышка.', 'Пять искр. Дзынь.', 'Я слышала.'], D(110));
  });
}, [[110, .2]]);

// =================== 18. Титр: пять искр стягиваются в золотую нить ===================
const s18 = shot(2.8, (ctx, t, lt, L) => {
  ctx.fillStyle = '#0E0A10'; ctx.fillRect(0, 0, MD.W, MD.H);
  const k = ease.inOut(seg(lt, .1, 1.2));
  for (let i = 0; i < 5; i++) { const a0 = -Math.PI / 2 + (i - 2) * .6, r = lerp(700, 0, k);
    MD.radial(ctx, 540 + Math.cos(a0) * r, 900 + Math.sin(a0) * r * .6, 40, 'rgba(255,214,110,.9)'); }
  const p = new Path2D(); p.moveTo(140, 960); p.bezierCurveTo(300, 700, 780, 1220, 940, 960);
  MD.drawOn(ctx, p, '#F0C04A', 6, seg(lt, 1, 1.6), 1200, 18);
  const a = seg(lt, 1.3, 1.8); if (a > 0) { ctx.save(); ctx.globalAlpha = a; ctx.textAlign = 'center'; ctx.fillStyle = '#FFE9A8'; ctx.shadowColor = '#F0C04A'; ctx.shadowBlur = 24;
    ctx.font = `150px ${MD.FONT.display}`; ctx.fillText('ЗЛАТАЯ', 540, 860); ctx.fillText('ЦЕПЬ', 540, 1020);
    ctx.shadowBlur = 0; ctx.font = `500 54px ${MD.FONT.ui}`; ctx.fillText('Серия 1 · Звенышко', 540, 1140); ctx.restore(); }
});
cue(s18, .1, 'title');

// =================== 19–24. Подушечная крепость: правило трёх ===================
const FORT = {pro: 300, pot: 560, yo: 820, pel: 940, floor: 1640};
const fort = (ctx, t, cam) => plate(ctx, t, cam, 'v4_komnata', .92);
const boys = (c, t, st = {}) => {
  A(c, 'proshka', {x: FORT.pro, y: FORT.floor, s: .5, light: 'warm'}, st.pro || listen('proshka', t, {armR: 1.6, look: [1, 0]}));
  A(c, 'potap', {x: FORT.pot, y: FORT.floor + 20, s: .52, light: 'warm'}, st.pot || listen('potap', t, {look: [-1, 0]}));
  A(c, 'yosha', {x: FORT.yo, y: FORT.floor - 60, s: .52, light: 'warm'}, st.yo || listen('yosha', t, {look: [-1, 0]}));
};
shot(1.4, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 420, y: 1100, z: 1.15}], [L, {x: 640, y: 1100, z: 1.15}]]);
  fort(ctx, t, cam); MD.layer(ctx, t, cam, 1, c => boys(c, t, {pro: {t, ...MD.laugh(t, .6), armR: 1.8}, pot: {t, ...MD.laugh(t + .3, .8)}, yo: {t, pose: 'cheer'}}));
});
const PEL = (c, t, st) => A(c, 'pelageya', {x: FORT.pel, y: FORT.floor, s: .5, light: 'warm'}, st);
// ① «Ребята… над морем вспыхнуло» — «Дежурная докладывает громко и чётко!»
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 820, y: 1120, z: 1.45}], [D(111), {x: 820, y: 1120, z: 1.5}], [D(111) + .4, {x: 520, y: 1140, z: 1.3}, 'inOut'], [L, {x: 500, y: 1140, z: 1.3}]]);
  fort(ctx, t, cam); MD.layer(ctx, t, cam, 1, c => { boys(c, t, {pro: play('proshka', t, {armR: 2.2, elbowR: .4, brow: 1, look: [1, 0]})}); PEL(c, t, play('pelageya', t, {wing: .9, look: [-1, 0]})); });
}, [[111, .15], [112, .25 + D(111)]]);
// «Ух!» — перья шаром
const s21 = shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 900, y: 1140, z: 1.7}], [L, {x: 900, y: 1140, z: 1.75}]], [[.15, 1]]);
  fort(ctx, t, cam); MD.layer(ctx, t, cam, 1, c => { const puff = MD.anticip(lt, .05, .18, .3, .25) * (1 - seg(lt, .7, .9)); PEL(c, t, {t, sx: 1 + puff * .4, sy: 1 + puff * .18, eyes: puff > .3 ? 'wow' : 'open', mouth: lt > .12 && lt < .6 ? 'D' : 'X', brow: 1, wing: .2 + puff * .8, wingR: .2 + puff * .8}); });
}, [[113, .12]]);
// «Ух! Совиная тревога!» — хохот
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 560, y: 1150, z: 1.25}], [L, {x: 560, y: 1140, z: 1.3}]]);
  fort(ctx, t, cam); MD.layer(ctx, t, cam, 1, c => { boys(c, t, {pro: {t, ...MD.laugh(t, 1)}, pot: {t, ...MD.laugh(t + .2, 1.2)}, yo: play('yosha', t, {...MD.laugh(t, .8), armR: 2.4})}); PEL(c, t, {t, eyes: 'half', mouth: 'X', tilt: .08}); });
}, [[114, .1]]);
// ② «Кто-то летит. Много.» — «Это у меня в животе летит»
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 700, y: 1140, z: 1.55}], [L, {x: 680, y: 1140, z: 1.6}]]);
  fort(ctx, t, cam); MD.layer(ctx, t, cam, 1, c => {
    A(c, 'potap', {x: 600, y: FORT.floor + 20, s: .6, light: 'warm'}, lt > D(115) ? play('potap', t, {armL: .4, eyes: 'half'}) : listen('potap', t, {eyes: 'half'}));
    prop(c, 'honey', 470, FORT.floor - 240, {w: 150});
    A(c, 'pelageya', {x: 860, y: FORT.floor, s: .55, light: 'warm'}, play('pelageya', t, {wing: 1.2, look: [-1, -.3], eyes: 'wow'}));
  });
}, [[115, .15], [116, .35 + D(115)]]);
// ③ «Помогите…» издалека — «Там кто-то плачет» — «Это Тишка храпит»
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 820, y: 1000, z: 1.4}], [L, {x: 700, y: 1060, z: 1.3}]]);
  fort(ctx, t, cam); MD.layer(ctx, t, cam, 1, c => {
    const [bx, by] = at(560, 1000);
    A(c, 'tishka', {x: bx, y: by, s: .3, light: 'warm', shadow: false}, {t, pose: 'sleep'}); MD.s4.zzz(c, t, bx + 60, by - 160);
    A(c, 'yosha', {x: 420, y: FORT.floor - 40, s: .55, light: 'warm'}, lt > D(117) + D(118) ? play('yosha', t, {armR: 1.2}) : listen('yosha', t));
    PEL(c, t, play('pelageya', t, {look: [1, -1], eyes: lt < D(117) + .3 ? 'wow' : 'open'}));
  });
}, [[117, .1], [118, .3 + D(117)], [119, .5 + D(117) + D(118)]]);
// «Запись сорок четвёртая. Значит, сама.»
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 900, y: 1100, z: 1.6}], [L, {x: 900, y: 1060, z: 1.75}]]);
  fort(ctx, t, cam); MD.layer(ctx, t, cam, 1, c => {
    const grab = MD.anticip(lt, D(120) - .6, D(120) - .2);
    PEL(c, t, {t, mouth: 'X', brow: 1, wing: .3 + grab * 1.2, look: [1, 0]});
    prop(c, 'lantern', lerp(1040, 1000, grab), lerp(FORT.floor - 40, FORT.floor - 300, grab), {w: 110}); glowAt(c, 1000, FORT.floor - 200, 240, .3);
  });
}, [[120, .2]]);

// =================== 26–29. Фонарь на крыше: Звенышко летит на свет, как мотылёк ===================
shot(1.5, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 1200, z: 1.2}], [L, {x: 540, y: 1000, z: 1.25}]]);
  plate(ctx, t, cam, 'v4_krysha', .9);
  MD.layer(ctx, t, cam, 1, c => {
    const up = MD.anticip(lt, .2, .7);
    A(c, 'pelageya', {x: 560, y: 1620, s: .5, light: 'night'}, {t, wing: .4 + up * 2.2, look: [0, -1], mouth: 'X'});
    const lx = 470, ly = lerp(1500, 1180, up); prop(c, 'lantern', lx, ly, {w: 100}); glowAt(c, lx, ly, 360, .55);
  });
});
const ZP = u => [lerp(-100, 470, u) + Math.sin(u * 14) * 90 * (1 - u), lerp(1700, 1180, u) + Math.cos(u * 11) * 60 * (1 - u)];
shot(1.8, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 960, z: 1}], [L, {x: 520, y: 900, z: 1.1}]]);
  plate(ctx, t, cam, 'v4_gorizont', .9);
  MD.layer(ctx, t, cam, 1, c => { const u = seg(lt, 0, L); const pts = []; for (let k = 0; k <= 12; k++) { const v = Math.max(0, u - .25 + .25 * k / 12); pts.push(ZP(v)); }
    trail(c, pts, .9); const [x, y] = ZP(u); MD.radial(c, x, y, 50, 'rgba(255,230,150,.9)'); zven(c, x, y, .12, {face: false}); });
});
const s28 = shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 960, z: 1.6}], [L, {x: 540, y: 960, z: 1.7}]], [[.3, 1]]);
  plate(ctx, t, cam, 'v4_krysha', .85, {alpha: .6});
  MD.layer(ctx, t, cam, 1, c => {
    prop(c, 'lantern', 540, 980, {w: 520});
    const u = seg(lt, 0, .3); zven(c, lerp(200, 540, u), lerp(1500, 930, u), lerp(.3, .55, u), {eyes: lt > .3 ? 'happy' : 'open'});
    if (lt > .3) { glowAt(c, 540, 930, 600, .6 * (1 - seg(lt, .3, 1)) + .3, '255,214,110'); MD.burst(c, lt, .3, 540, 930, '#FFE6A0', 16, 380); }
  });
  flash(ctx, t, s28.a + .3, .25, '255,236,170');
});
cue(s28, .3, 'ding');
const s29 = shot(2, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 700, z: 1.6}], [L, {x: 540, y: 760, z: 1.45}]]);
  plate(ctx, t, cam, 'v4_gorizont', .9);
  MD.layer(ctx, t, cam, 1, c => { const [mx, my] = at(846, 427); MD.radial(c, mx, my, 260, 'rgba(255,246,210,.25)'); MD.crows(c, t, lerp(mx - 700, mx + 300, seg(lt, 0, L)), my, 7, 1.1, 170, 9); });
  MD.grade(ctx, 'rgba(20,24,70,1)', .25);
});
cue(s29, .1, 'caw');
})();
