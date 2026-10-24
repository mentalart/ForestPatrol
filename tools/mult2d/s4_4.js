// Серия 1 v4, сцены 9–11 и карточка: «Тихая тревога», «Первый настоящий вызов», клиффхэнгер (панели 39–48).
// Тишина — самая сильная сцена: музыка в ноль, почти монохром (LIGHT.ice), знаки крылом вместо слов; окупание учебной тревоги.
'use strict';
(() => {
const {seg, ease, lerp, clamp, twos} = MD, SP = MD.spr, S = MD.s4;
const {shot, cue, D, play, listen, A, plate, at, glowAt, flash, prop, zven, trail} = S;
const sil = MD.s4sil;

// =================== 39. «Тре…» — Пелагея закрывает трубу Ревуна крылом: «Тсс.» ===================
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 1100, z: 1.5}], [L, {x: 560, y: 1080, z: 1.58}]]);
  plate(ctx, t, cam, 'v4_stena', .9); MD.grade(ctx, 'rgba(30,40,110,1)', .35);
  MD.layer(ctx, t, cam, 1, c => {
    const cover = MD.anticip(lt, .15, .45);
    A(c, 'proshka', {x: 780, y: 1560, s: .55, light: 'night'}, lt < .5 ? play('proshka', t, {armR: 2.2, elbowR: .4, brow: 1, look: [-1, 0]}) : {t, eyes: 'wow', mouth: 'X', armR: 2.2});
    prop(c, 'siren', 560, 1100, {w: 360});
    A(c, 'pelageya', {x: 380, y: 1560, s: .58, light: 'night'}, lt < .6 ? {t, wing: .4 + cover * 1.6, mouth: 'X', look: [1, -1], brow: 1} : {t, pose: 'hush'});
  });
}, [[132, .05], [133, .7]]);

// =================== 40. Тихая тревога по знакам: свет — вниз — бережно; колыбельная своими словами ===================
const s40 = shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 1100, z: 1.3}], [L, {x: 540, y: 1140, z: 1.4}]]);
  plate(ctx, t, cam, 'v4_razrez', .9, {y: 1300}); MD.grade(ctx, 'rgba(14,22,70,1)', .62);
  MD.layer(ctx, t, cam, 1, c => {
    A(c, 'potap', {x: 640, y: 1640, s: .58, light: 'ice'}, {t, pose: 'sneak'});
    prop(c, 'bed', 660, 1180, {w: 340});
    A(c, 'tishka', {x: 660, y: 1150, s: .28, light: 'ice', shadow: false}, {t, pose: lt < .8 ? 'startle' : 'sleep'});
    A(c, 'yosha', {x: 860, y: 1660, s: .44, light: 'ice'}, {t, pose: 'hush'});
    A(c, 'pelageya', {x: 380, y: 1660, s: .52, light: 'ice'}, play('pelageya', t, {look: [1, -1], tilt: .12, wing: .9}));
  });
}, [[134, .3]]);
cue(s40, 0, 'quiet');

// =================== 41. В корнях: Пелагея прикрывает свет Звенышка крылом; над щелью — тень и вороны ===================
const s41 = shot(3, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 800, z: 1.2}], [1.4, {x: 540, y: 820, z: 1.2}], [L, {x: 540, y: 1250, z: 1.35}, 'inOut']]);
  plate(ctx, t, cam, 'v4_korni', .9);
  MD.layer(ctx, t, cam, .6, c => {
    const pass = seg(lt, .2, 2.4); sil(c, 'koschei', lerp(-200, 1300, pass), 900, {h: 900, alpha: .85, col: '#05070F'});
    MD.crows(c, t, lerp(1200, -100, seg(lt, .6, 2.8)), 420, 4, .7, 120, 13);
  });
  MD.layer(ctx, t, cam, 1, c => {
    const H = 1560;
    A(c, 'proshka', {x: 330, y: H, s: .42, light: 'ice'}, {t, pose: 'hush'});
    A(c, 'potap', {x: 560, y: H + 10, s: .44, light: 'ice'}, {t, pose: 'hush'});
    A(c, 'yosha', {x: 760, y: H + 20, s: .38, light: 'ice'}, {t, pose: 'hush'});
    A(c, 'pelageya', {x: 520, y: H + 120, s: .5, light: 'ice'}, {t, wing: 1.4, eyes: lt > 1.2 && lt < 1.5 ? 'shut' : 'open', look: [0, -1], mouth: 'X'});
    zven(c, 470, H - 40, .14, {eyes: 'half'}); glowAt(c, 470, H - 40, 120, .35, '255,214,110');
    const melt = seg(lt, 2.2, 3); if (melt > 0) MD.radial(c, 540, 1200, 900, `rgba(255,200,120,${.12 * melt})`);
  });
});
cue(s41, .6, 'caw_far'); cue(s41, 2.2, 'drip');

// =================== 42. Щелчок секундомера: «Сорок секунд. Рекорд.» — «Ты ведь всё слышала?» — шлем Пелагее, журнал вслух ===================
const P42 = .2 + D(135) + .2 + D(136) + .3;   // шлем переходит к Пелагее
const s42 = shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 420, y: 1050, z: 1.5}], [.2 + D(135), {x: 420, y: 1050, z: 1.5}], [.6 + D(135), {x: 680, y: 1050, z: 1.5}, 'inOut'],
    [P42, {x: 680, y: 1050, z: 1.5}], [P42 + .6, {x: 540, y: 1000, z: 1.3}, 'inOut'], [L, {x: 540, y: 960, z: 1.42}]]);
  plate(ctx, t, cam, 'v4_komnata', .92); MD.grade(ctx, 'rgba(255,190,110,1)', .1, 'soft-light');
  MD.layer(ctx, t, cam, 1, c => {
    const F = 1660, give = MD.anticip(lt, P42 - .4, P42);
    A(c, 'proshka', {x: 300, y: F, s: .5, light: 'dawn'}, lt < .2 + D(135) ? play('proshka', t, {armR: 1.6, eyes: 'wow'}) : listen('proshka', t, {look: [1, 0], armR: .4 + give}));
    prop(c, 'stopwatch', 400, F - 470, {w: 110});
    A(c, 'potap', {x: 780, y: F + 10, s: .52, light: 'dawn'}, lt > .2 + D(135) && lt < P42 ? play('potap', t, {look: [-1, 0]}) : listen('potap', t, {look: [-1, 0]}));
    A(c, 'pelageya', {x: 540, y: F + 20, s: .5, light: 'dawn'}, lt > P42 + .3 ? play('pelageya', t, {wing: .9, look: [0, 1]}) : listen('pelageya', t, {look: [1, 0]}));
    prop(c, 'helmet', lerp(300, 540, give), lerp(F - 520, F - 430, give), {w: 230, rot: give * .25});
    if (lt > P42 + .3) prop(c, 'notebook', 560, F - 190, {w: 260});
    A(c, 'yosha', {x: 900, y: F + 30, s: .4, light: 'dawn'}, listen('yosha', t, {look: [-1, 0]}));
  });
}, [[135, .2], [136, .4 + D(135)], [137, P42 + .4], [138, P42 + .6 + D(137)]]);
cue(s42, .15, 'tick');

// =================== 43. Дверь открыта в ночь: Пелагея выходит первой — «Камень будить?» — «К морю!» ===================
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 1100, z: 1.25}], [L, {x: 540, y: 1150, z: 1.05}]]);
  plate(ctx, t, cam, 'v4_dver', .92);
  MD.layer(ctx, t, cam, 1, c => {
    const go = seg(lt, D(139) + .6, L), F = 1560;
    A(c, 'pelageya', {x: lerp(540, 600, go), y: F - go * 60, s: .5 - go * .1, light: 'lamp'}, {t, wing: .5, look: [0, -1], mouth: 'X', ...MD.walk(t * 1.6, go > 0 ? .6 : 0)});
    prop(c, 'lantern', lerp(640, 690, go), F - 260 - go * 60, {w: 90}); glowAt(c, 660, F - 260, 260, .45);
    zven(c, 720 + Math.sin(t * 3) * 20, F - 520, .18, {mouth: MD.mouth('zven', t), eyes: 'happy'});
    A(c, 'proshka', {x: 300, y: F + 40, s: .55, light: 'lamp'}, play('proshka', t, {look: [1, 0]}));
    A(c, 'potap', {x: 860, y: F + 40, s: .56, light: 'lamp'}, listen('potap', t, {look: [-1, 0]}));
  });
}, [[139, .1], [140, .3 + D(139)]]);

// =================== 44. Кран вверх: крошечный патруль с огоньком уходит по тропе к морю ===================
shot(1.8, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 1300, z: 1.3}], [L, {x: 540, y: 900, z: 1}]]);
  plate(ctx, t, cam, 'v4_tropa', .9);
  MD.layer(ctx, t, cam, 1, c => { const u = seg(lt, 0, L), [x, y] = at(lerp(520, 560, u), lerp(1300, 1080, u));
    for (let i = 0; i < 5; i++) { c.fillStyle = '#0A0C1C'; c.beginPath(); c.ellipse(x - i * 22, y + i * 10, 9, 16, 0, 0, 7); c.fill(); }
    MD.radial(c, x + 12, y - 20, 70, 'rgba(255,214,110,.9)'); });
});

// =================== 45–47. Скала: Кощей держит бумажную куклу, над которой смеялись ===================
const s45 = shot(2, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 760, y: 700, z: 1.2}], [L, {x: 780, y: 640, z: 1.45}]]);
  plate(ctx, t, cam, 'v4_skala', .9);
  MD.layer(ctx, t, cam, 1, c => {
    const [kx, ky] = at(830, 690);
    if (MD.SPR['koschei4/full']) SP(c, 'koschei4/full', kx, ky, {h: 620, ay: 1, rim: 'rgba(159,246,255,.5)', rimBlur: 16});
    else SP(c, 'koschei/full', kx, ky, {w: 120, ay: 1, rim: 'rgba(159,246,255,.6)', rimBlur: 12});
    for (const ex of [-6, 6]) MD.radial(c, kx + ex, ky - 560, 10, 'rgba(159,246,255,.9)');
  });
});
cue(s45, 0, 'wind');
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 540, y: 960, z: 1}], [L, {x: 540, y: 960, z: 1.12}]]);
  MD.layer(ctx, t, cam, .3, c => { MD.set.lacquer(c, t, 41); });
  MD.layer(ctx, t, cam, 1, c => {
    if (MD.SPR['koschei4/hand']) SP(c, 'koschei4/hand', 560, 1000, {w: 760, rim: 'rgba(159,246,255,.5)', rimBlur: 20});
    else { SP(c, 'koschei/ruka', 600, 1100, {w: 700, rim: 'rgba(159,246,255,.5)', rimBlur: 20}); prop(c, 'puppet', 520, 820, {w: 240, rot: -.2}); }
    c.save(); c.globalAlpha = .9; MD.frostGrow(c, seg(lt, .2, L), 51, 520, 900, -Math.PI / 2, 260, 10); c.restore();
  });
}, [[141, .3]]);
const s47 = shot(1.6, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 760, y: 760, z: 1.3}], [L, {x: 700, y: 820, z: 1.05}]]);
  plate(ctx, t, cam, 'v4_skala', .9);
  MD.layer(ctx, t, cam, 1, c => { const [kx, ky] = at(830, 690), u = seg(lt, 0, L);
    for (let i = 0; i < 5; i++) { const a = -2.8 + i * .55; MD.crows(c, t, kx + Math.cos(a) * 900 * u, ky - 300 + Math.sin(a) * 700 * u, 1, .8, 10, 20 + i); } });
});
cue(s47, 0, 'caw');

// =================== 48. Карточка (хохлома) ===================
shot(4, (ctx, t, lt, L) => {
  MD.ser01.hohloma(ctx, lt);
  const a = seg(lt, .6, 1.1); ctx.save(); ctx.globalAlpha = a; ctx.textAlign = 'center'; ctx.fillStyle = MD.PAL.ink;
  ctx.font = `92px ${MD.FONT.display}`; ctx.fillText('ПРОДОЛЖЕНИЕ', 540, 820); ctx.fillText('СЛЕДУЕТ', 540, 930);
  ctx.font = `600 54px ${MD.FONT.ui}`; ctx.fillText('Серия 2 · Кот, проснись!', 540, 1060);
  ctx.font = `500 42px ${MD.FONT.ui}`; ctx.fillText('Играй в «Златую цепь» вдвоём', 540, 1150); ctx.fillText('ссылка в группе', 540, 1210); ctx.restore();
}, [], {dur: .6, type: 'gold'});
})();
