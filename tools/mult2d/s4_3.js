// Серия 1 v4, сцены 7–8: «Говорящая гайка» и «Теневой театр» (панели 30–38). Слова Звенышка рассыпаются золотыми
// буквами; что случилось на Лукоморье, показывают силуэты на стене (приём Лотты Райнигер), и тень Кощея оживает сама.
'use strict';
(() => {
const {seg, ease, lerp, clamp, twos} = MD, SP = MD.spr, S = MD.s4;
const {shot, cue, D, play, listen, A, plate, at, glowAt, flash, prop, zven, letters} = S;
const sil = MD.s4sil;
const F = 1640;   // пол комнаты (картина komnata)
const room = (ctx, t, cam) => plate(ctx, t, cam, 'v4_komnata', .92);
// Фонарь на столе со Звенышком внутри: x, y — низ фонаря.
const lanternZ = (c, t, x, y, w = 300, st = {}) => { prop(c, 'lantern', x, y - w * .7, {w}); glowAt(c, x, y - w * .65, w * 1.6, .55, '255,214,110');
  const b = Math.abs(Math.sin(twos(t) * 6)) * 30; zven(c, x + Math.sin(t * 5) * 18, y - w * .65 - b, w / 900, st); };

// =================== 30. Все сбежались к фонарю: внутри пыхтит колечко, буквы сыплются ===================
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 1180, z: 1.35}], [L, {x: 540, y: 1160, z: 1.45}]]);
  room(ctx, t, cam);
  MD.layer(ctx, t, cam, 1, c => {
    A(c, 'proshka', {x: 260, y: F, s: .48, light: 'lamp'}, listen('proshka', t, {look: [1, 0], brow: 1}));
    A(c, 'potap', {x: 800, y: F + 10, s: .5, light: 'lamp'}, listen('potap', t, {look: [-1, 0]}));
    A(c, 'yosha', {x: 640, y: F + 30, s: .42, light: 'lamp'}, listen('yosha', t, {look: [-1, -1], eyes: 'wow'}));
    lanternZ(c, t, 520, F - 120, 300, {mouth: MD.mouth('zven', t), eyes: 'open'});
    letters(c, t, 520, F - 520, 3);
  });
}, [[121, .15]]);

// =================== 31. Потап: «Ко-ко? Курица, что ли?» ===================
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 700, y: 1020, z: 1.9}], [L, {x: 700, y: 1000, z: 1.95}]]);
  room(ctx, t, cam);
  MD.layer(ctx, t, cam, 1, c => A(c, 'potap', {x: 700, y: F + 60, s: .62, light: 'lamp'}, play('potap', t, {armL: 2.6, elbowL: 1.2, tilt: .12, look: [-1, -.3]})));
}, [[122, .1]]);

// =================== 30b. «Ко-щей! Порвал!» — Звенышко бьётся о стекло, удар ===================
const s30b = shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 520, y: 1160, z: 1.9}], [L, {x: 520, y: 1160, z: 2}]], [[.3, 1.2], [1.2, .8]]);
  room(ctx, t, cam);
  MD.layer(ctx, t, cam, 1, c => { lanternZ(c, t * 2.2, 520, F - 120, 320, {mouth: MD.mouth('zven', t), eyes: 'open'}); letters(c, t * 1.5, 520, F - 560, 7, 10); });
}, [[123, .1]]);
cue(s30b, .3, 'clink'); cue(s30b, 1.2, 'clink');

// =================== 32. Прошка в лупу: «Говорящая гайка» — Звенышко кусает за нос ===================
const BITE = D(124) + .45;
const s32 = shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 960, z: 1.7}], [L, {x: 540, y: 960, z: 1.75}]], [[BITE, 1.2]]);
  room(ctx, t, cam);
  MD.layer(ctx, t, cam, 1, c => {
    const ouch = lt > BITE;
    A(c, 'proshka', {x: 460, y: 1700, s: .75, light: 'lamp'}, ouch ? {t, pose: 'startle'} : play('proshka', t, {armR: 1.9, elbowR: .8, look: [1, 0], brow: 1}));
    prop(c, 'magnifier', 700, 1000, {w: 260, rot: -.3});
    const zx = ouch ? 560 : 760, zy = ouch ? 820 : 990; zven(c, zx, zy, .3, {mouth: MD.mouth('zven', t), eyes: ouch ? 'open' : 'side'});
    MD.burst(c, lt, BITE, 560, 820, '#FFE6A0', 10, 160);
  });
}, [[124, .1], [125, BITE + .2]]);
cue(s32, BITE, 'bite');

// =================== 33. «Чур, я держу!» — роняет; Тишка во сне прячет блестяшку под подушку ===================
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 420, y: 1080, z: 1.55}], [D(126) + .3, {x: 420, y: 1080, z: 1.55}], [D(126) + .8, {x: 300, y: 1020, z: 1.8}, 'inOut'], [L, {x: 300, y: 1020, z: 1.85}]]);
  room(ctx, t, cam);
  MD.layer(ctx, t, cam, 1, c => {
    const [bx, by] = at(560, 1000), drop = seg(lt, D(126), D(126) + .5);
    A(c, 'yosha', {x: 520, y: F, s: .5, light: 'lamp'}, lt < D(126) ? play('yosha', t, {armL: 2.4, armR: 2.4}) : {t, pose: 'dizzy'});
    prop(c, 'bed', bx - 200, by + 40, {w: 520});
    A(c, 'tishka', {x: bx - 200, y: by - 20, s: .32, light: 'lamp', shadow: false}, play('tishka', t, {eyes: 'shut'}));
    if (lt < D(126) + .5) zven(c, lerp(520, bx - 230, drop), lerp(F - 480, by - 60, drop) - Math.sin(drop * Math.PI) * 220, .2, {eyes: 'open'});
  });
}, [[126, .1], [127, D(126) + .7]]);

// =================== 34. Пелагея с ножницами: «Не кричи. Покажи.» ===================
const s34 = shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 1080, z: 1.5}], [L, {x: 540, y: 1060, z: 1.55}]]);
  plate(ctx, t, cam, 'v4_stena', .9);
  MD.layer(ctx, t, cam, 1, c => {
    A(c, 'proshka', {x: 820, y: 1680, s: .55, light: 'amber'}, listen('proshka', t, {armR: 2.6, elbowR: 1.2, look: [-1, 0]}));
    prop(c, 'lamp', 900, 980, {w: 160}); glowAt(c, 900, 980, 420, .6);
    A(c, 'pelageya', {x: 420, y: 1700, s: .6, light: 'amber'}, play('pelageya', t, {wing: 1 + Math.sin(twos(t) * 12) * .2, look: [1, 0]}));
    prop(c, 'scissors', 300, 1260, {w: 170, rot: Math.sin(twos(t) * 12) * .25});
    zven(c, 640, 1100, .22, {eyes: 'open'});
  });
}, [[128, .2]]);
cue(s34, .4, 'scissors');

// =================== 35–36. Теневой театр: дуб, цепь, Кот на цепи — тень, разрыв, Кот застыл ===================
const wall = (ctx, t, cam) => { plate(ctx, t, cam, 'v4_stena', .9); MD.grade(ctx, 'rgba(255,170,70,1)', .12, 'soft-light'); };
const chain = (c, t, x0, x1, y, k = 1, broke = 0) => { for (let i = 0; i < 9; i++) { const u = i / 8, x = lerp(x0, x1, u), yy = y + Math.sin(u * Math.PI) * 50;
  if (broke && i > 3 && i < 6) continue; c.save(); c.translate(x + (broke && i >= 6 ? broke * 80 : 0) - (broke && i <= 3 ? broke * 60 : 0), yy + (broke ? broke * broke * 120 * (i % 2 ? 1 : .6) : 0));
  c.rotate(i % 2 ? .2 : -.2); c.strokeStyle = '#120C10'; c.lineWidth = 14; c.beginPath(); c.ellipse(0, 0, 34, 20, 0, 0, 7); c.stroke(); c.restore(); } };
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 900, z: 1.15}], [L, {x: 560, y: 880, z: 1.2}]]);
  wall(ctx, t, cam);
  MD.layer(ctx, t, cam, 1, c => {
    sil(c, 'oak', 330, 1300, {h: 1100});
    chain(c, t, 330, 960, 1080);
    const wx = lerp(420, 820, seg(lt, 0, L)), b = Math.abs(Math.sin(twos(t) * 6)) * 12;
    sil(c, 'cat', wx, 1080 - b, {h: 380});
  });
  MD.layer(ctx, t, cam, 1.25, c => zven(c, 900, 1500, .3, {mouth: MD.mouth('zven', t)}));
}, [[129, .2]]);
const s36 = shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 560, y: 900, z: 1.2}], [L, {x: 560, y: 900, z: 1.3}]], [[.9, 1.3]]);
  wall(ctx, t, cam);
  MD.layer(ctx, t, cam, 1, c => {
    const snap = .9, br = seg(lt, snap, snap + .8), stone = seg(lt, D(130) * .55, D(130) * .55 + .8);
    sil(c, 'oak', 330, 1300, {h: 1100});
    chain(c, t, 330, 960, 1080, 1, br);
    sil(c, lt < .6 ? 'koschei' : 'koschei_reach', lerp(1250, 1020, ease.out(seg(lt, 0, .8))), 1400, {h: 1250});
    for (let i = 0; i < 5; i++) { const u = seg(lt, snap, snap + 1.4); if (u <= 0) continue; const a = -2.6 + i * .5;
      sil(c, 'spark', 640 + Math.cos(a) * 700 * u, 1060 + Math.sin(a) * 600 * u, {h: 70}); }
    sil(c, stone > .5 ? 'cat_stone' : 'cat', 700, 1080, {h: 380, col: stone > 0 ? `rgb(${lerp(18, 120, stone)},${lerp(12, 116, stone)},${lerp(16, 112, stone)})` : null});
  });
  MD.layer(ctx, t, cam, 1.25, c => zven(c, 900, 1500, .3, {mouth: MD.mouth('zven', t), eyes: 'half'}));
}, [[130, .3]]);
cue(s36, .9, 'snap');

// =================== 37. Кукла Кощея с языком — «Кощей-жердей!» — все хохочут ===================
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 1120, z: 1.3}], [L, {x: 540, y: 1100, z: 1.35}]]);
  wall(ctx, t, cam);
  MD.layer(ctx, t, cam, 1, c => {
    const wag = Math.sin(twos(t) * 9) * .25;
    sil(c, 'koschei', 560, 1060, {h: 520, rot: wag * .4});
    A(c, 'proshka', {x: 260, y: 1700, s: .5, light: 'amber'}, play('proshka', t, {...MD.laugh(t, .8)}));
    A(c, 'potap', {x: 840, y: 1720, s: .52, light: 'amber'}, {t, ...MD.laugh(t + .3, 1)});
    A(c, 'yosha', {x: 560, y: 1720, s: .48, light: 'amber'}, {t, pose: 'laugh'});
    prop(c, 'puppet', 640, 1340, {w: 160, rot: wag});
    A(c, 'pelageya', {x: 120, y: 1720, s: .42, light: 'amber'}, {t, ...MD.laugh(t + .6, .4)});
  });
}, [[131, .1]]);

// =================== 38. Тень на стене шевелится сама и растёт; окно в инее; смех обрывается ===================
const s38 = shot(2.4, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 560, y: 1000, z: 1.15}], [L, {x: 640, y: 900, z: 1.4}]]);
  wall(ctx, t, cam);
  MD.layer(ctx, t, cam, 1, c => {
    const grow = ease.inOut(seg(lt, .3, 1.8));
    sil(c, 'koschei_reach', lerp(620, 520, grow), 1500, {h: lerp(560, 1500, grow), alpha: .95});
    const [wx, wy] = at(900, 520); c.save(); c.globalAlpha = .9; MD.frostGrow(c, seg(lt, .4, 2.2), 31, wx, wy + 200, -Math.PI / 2, 300, 9); MD.frostGrow(c, seg(lt, .6, 2.2), 32, wx - 120, wy, 0, 260, 7); c.restore();
    A(c, 'pelageya', {x: 220, y: 1720, s: .5, light: 'amber'}, {t, eyes: 'wow', look: [1, -1], wing: 1.1, mouth: 'X'});
    A(c, 'yosha', {x: 560, y: 1730, s: .48, light: 'amber'}, lt < .5 ? {t, pose: 'laugh'} : {t, pose: 'hush'});
    prop(c, 'puppet', 620, 1360, {w: 160, rot: -.4});
  });
});
cue(s38, .3, 'frost'); cue(s38, 1.6, 'tap');
})();
