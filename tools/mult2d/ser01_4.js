// Серия 1, сцена 4 «Присказка» (сценарий 49_ser01_zvenyshko.md): патруль выходит в ночь за Звенышком, Тишка машет из двери;
// кран вверх по сосне — огоньки уходят в лес; клиффхэнгер: ворон с ледяным ключом садится Кощею на плечо; карточка.
'use strict';
(() => {
const B0 = MD.ser01.all.length;   // первый план файла — для звуковых меток
const {seg, ease, lerp, twos, PAL} = MD, SP = MD.spr, K = MD.K, S = MD.ser01;
const {shot, D, play, A, grain, paint, NAS, zvenFace, rock, hohloma, word} = S;
const F = NAS.floor;

// =================== 4-1. Ночь, настил: четверо выходят из штаба, Звенышко светит фонариком; Тишка машет из двери ===================
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 760, y: 1200, z: 1.3}], [L, {x: 480, y: 1220, z: 1.25}]]);
  paint(ctx, t, cam, 'nastil', .92);
  MD.grade(ctx, 'rgba(25,30,90,1)', .5);
  MD.layer(ctx, t, cam, 1, c => {
    const [dx, dy] = NAS.door;
    MD.radial(c, dx, dy - 200, 300, 'rgba(255,190,90,.45)');
    A(c, 'tishka', {x: dx, y: dy, s: .45}, {t, pose: 'wave', sy: 1 + .03 * Math.sin(twos(t) * 8)});
    const go = (n, d, s, poseBase) => { const u = seg(lt, d, d + 4.2), x = lerp(dx - 60, -200, u);
      if (u <= 0) return; const walking = u < 1;
      A(c, n, {x, y: F + (n === 'pelageya' ? -10 : 0), s, flip: true}, n === 'pelageya' ? {t, pose: MD.cycle(lt + d, 'fly')} : {t, pose: walking ? MD.cycle(lt * .7 + d, poseBase) : 'walk'}); };
    go('potap', .2, .46, 'run'); go('proshka', .7, .42, 'run'); go('yosha', 1.2, .5, 'run'); go('pelageya', 1.7, .4);
    // Звенышко впереди — фонарик на нитке, свет на досках
    const zx = lerp(dx - 200, -100, seg(lt, 0, L)), zy = F - 520 + Math.sin(lt * 4) * 20;
    MD.radial(c, zx, F - 40, 360, 'rgba(255,214,110,.28)');
    zvenFace(c, zx, zy, .22, {eyes: 'happy', mouth: MD.mouth('zven', t)});
  });
  MD.fireflies(ctx, t, 31, 14, [0, 0, 1080, 1400]);
}, [['ser01_036', .6], ['ser01_037', .6 + D('ser01_036') + .5]], {dur: .6, type: 'page'});

// =================== 4-2. Кран вверх: сосна уменьшается, золотая точка уводит четыре огонька в лес ===================
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 640, y: 560, z: 2.2}], [L, {x: 540, y: 960, z: 1.02}]]);
  paint(ctx, t, cam, 'sosna_noch', .95);
  MD.layer(ctx, t, cam, 1, c => {
    const u = seg(lt, .2, L), path = k => [lerp(660, 300, k), lerp(560, 1800, k) + Math.sin(k * 12) * 40];
    const [zx, zy] = path(u); MD.radial(c, zx, zy, 90, 'rgba(255,214,110,.9)'); zvenFace(c, zx, zy, .06, {face: false});
    for (let i = 1; i <= 4; i++) { const [x, y] = path(Math.max(0, u - i * .05)); MD.radial(c, x, y, 26, 'rgba(255,200,120,.8)'); }
    MD.fireflies(c, t, 41, 30, [0, 0, 1080, 1920]);
  });
}, [['ser01_038', .4]], {dur: .4, type: 'cut'});

// =================== 4-3. Клиффхэнгер: скала, ворон с ледяным ключом садится Кощею на плечо, глаза вспыхивают ===================
shot(1, (ctx, t, lt, L) => {
  const land = 1.0;
  const cam = MD.cam(lt, [[0, {x: 640, y: 700, z: 2.6}], [land, {x: 630, y: 560, z: 4.0}], [L, {x: 625, y: 530, z: 4.4}]], [[land, .4]]);
  rock(ctx, t, cam, {eyes: lt > land + .4 ? .6 + .4 * Math.sin(t * 6) : .15, over: c => {
    const vk = ease.out(seg(lt, 0, land));
    if (lt < land) SP(c, 'voron/fly', lerp(820, 645, vk), lerp(380, 462, vk), {w: 100, ay: 1, rot: -.2 * (1 - vk), rim: 'rgba(232,184,74,.6)', rimBlur: 6});
    else SP(c, 'voron/perch', 642, 462 + MD.spring(lt, land, 3, 6) * 3, {w: 44, ay: 1, src: [0, 0, 552, 400], rim: 'rgba(232,184,74,.6)', rimBlur: 6});
  }});
  MD.set.border(ctx);
}, [['ser01_039', 1.4]], {dur: .5, type: 'lacquer', x: 620, y: 600});

// =================== 4-4. Карточка: «Продолжение следует» · «Серия 2 · Кот, проснись!» · «Играй в «Златую цепь» вдвоём» ===================
shot(5, (ctx, t, lt) => {
  hohloma(ctx, lt);
  const txt = (s, y, font, k, col = PAL.ink) => { if (k <= 0) return; ctx.save(); ctx.globalAlpha = k; ctx.textAlign = 'center'; ctx.fillStyle = col; ctx.font = font; ctx.fillText(s, 540, y + (1 - k) * 40); ctx.restore(); };
  word(ctx, lt, 'ПРОДОЛЖЕНИЕ', 760, 120, .3); word(ctx, lt, 'СЛЕДУЕТ', 900, 130, .9);
  txt('Серия 2 · Кот, проснись!', 1080, `700 62px ${MD.FONT.ui}`, ease.out(seg(lt, 1.8, 2.3)));
  txt('Играй в «Златую цепь» вдвоём', 1200, `500 50px ${MD.FONT.ui}`, ease.out(seg(lt, 2.4, 2.9)), '#7A1A12');
  txt('ссылка в группе', 1270, `500 44px ${MD.FONT.ui}`, ease.out(seg(lt, 2.6, 3.1)), '#7A1A12');
  const hp = Math.abs(Math.sin(lt * 4)) * 22;
  zvenFace(ctx, 540, 560 - hp, .34, {glow: .5, eyes: MD.set.blinkAt(lt, [2.5]) ? 'half' : 'happy', mouth: 'D'});
  grain(ctx, .4);
}, [], {dur: .5, type: 'gold', x: 640, y: 560});
// ---------- звуковые метки (audio_ser01.py) ----------
const Q = (i, lt, n) => S.cue(S.all[B0 + i], lt, n);
Q(0, 0, 'march'); Q(1, 0, 'crane'); Q(2, 0, 'koschei_drone'); Q(2, .9, 'caw'); Q(2, 1.4, 'eyes'); Q(3, 0, 'card');
})();
