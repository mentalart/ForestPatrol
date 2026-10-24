// Серия 1, сцена 2 «Лесной патруль» (сценарий 49_ser01_zvenyshko.md): кран по сосне, гэг-цепочка на настиле
// (яблоко → Потап → огрызок → ковшик Йоши → цветок → лепестки → Пелагея → комок → колпак Тишки), куча-мала в двери,
// колыбельная Тишки, самокат Прошки рассыпается, все хохочут.
'use strict';
(() => {
const B0 = MD.ser01.all.length;   // первый план файла — для звуковых меток
const {seg, ease, lerp, clamp, twos} = MD, SP = MD.spr, K = MD.K, S = MD.ser01;
const {shot, D, play, A, grain, paint, KOM, NAS, ribbon, flash} = S;
const F = NAS.floor;

// =================== 2-1. Кран вверх по сосне; наверху — штаб и крошечные друзья машут ===================
shot(1, (ctx, t, lt, L) => {
  const k = ease.inOut(seg(lt, 0, L - .6));
  const cam = MD.cam(lt, [[0, {x: 560, y: 1600, z: 1.7}], [L - .6, {x: 640, y: 560, z: 1.45}], [L, {x: 650, y: 520, z: 1.5}]]);
  paint(ctx, t, cam, 'sosna_v', .95);
  MD.layer(ctx, t, cam, 1, c => {
    MD.fireflies(c, t, 21, 26, [0, 200, 1080, 1700]);
    const w = Math.sin(twos(t) * 9);   // на настиле — четверо крошечных: машут
    [['proshka', 600, .1, 'jump'], ['potap', 660, .11, 'walk'], ['yosha', 720, .1, 'cheer'], ['pelageya', 770, .1, 'happy']].forEach(([n, x, s, p], i) =>
      A(c, n, {x, y: 535 + (i % 2 ? w : -w) * 3, s, shadow: false}, {t, pose: p, sy: 1 + .04 * Math.sin(twos(t) * 9 + i)}));
  });
  grain(ctx, .12);
}, [['ser01_015', .5], ['ser01_016', .5 + D('ser01_015') + .4]], {dur: .6, type: 'page'});

// =================== 2-2a. Гэг-цепочка: катапульта Прошки → Потап ловит не глядя → огрызок → ковшик Йоши → цветок ===================
const PRO = {x: 330, s: .42}, POT = {x: 640, s: .45}, YO = {x: 870, s: .5}, POTT = {x: 1010};   // горшок с бутоном справа
const A1 = .5, FIRE = A1 + D('ser01_017') + .2, CATCH = FIRE + .85, A2 = CATCH + .15, BITE = A2 + D('ser01_018') + .2, CORE = BITE + .25,
  LAND = CORE + .7, BLOOM = LAND + .35, A3 = BLOOM + .1;
const apple = (lt) => {   // яблоко: катапульта → за спину Потапу; огрызок: через плечо → в ковшик
  if (lt < FIRE) return [178, 1150, 0, 'apple'];
  if (lt < CATCH) { const u = seg(lt, FIRE, CATCH); return [lerp(178, POT.x - 70, u), lerp(1150, 1330, u) - Math.sin(u * Math.PI) * 420, u * 14, 'apple']; }
  if (lt < BITE) return null;
  if (lt < LAND) { const u = seg(lt, CORE, LAND); return lt < CORE ? null : [lerp(POT.x + 40, YO.x - 60, u), lerp(1260, 1330, u) - Math.sin(u * Math.PI) * 300, u * 18, 'core']; }
  return null;
};
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 300, y: 1250, z: 1.55}], [FIRE, {x: 320, y: 1260, z: 1.6}], [CATCH, {x: 600, y: 1260, z: 1.6}, 'inOut'], [CORE, {x: 620, y: 1260, z: 1.6}],
    [LAND, {x: 860, y: 1270, z: 1.6}, 'inOut'], [L, {x: 880, y: 1230, z: 1.55}]], [[FIRE, .4], [CATCH, .5], [LAND, .4]]);
  paint(ctx, t, cam, 'nastil', .92);
  MD.layer(ctx, t, cam, 1, c => {
    // Прошка: крутит ключом (рука ходит), дёргает рычаг — прыжок от радости
    const crank = lt < FIRE - .2 ? Math.sin(twos(lt) * 9) * .5 : 0, joy = lt > FIRE + .1 && lt < FIRE + 1.2;
    A(c, 'proshka', {x: PRO.x, y: F, s: PRO.s}, joy ? {t, pose: 'jump', ...MD.jump(lt, FIRE + .1, .5, 60)} :
      play('proshka', t, {armL: 1.1 + crank, elbowL: .6, armR: lt > FIRE - .3 ? 1.6 : .4, look: [-1, 0], brow: lt > FIRE - .4 ? 1 : 0}));
    // Потап: спиной к катапульте, ловит не глядя (поза «ловит»), кусает, швыряет огрызок через плечо
    const pst = lt < CATCH - .1 ? {t, pose: 'walk', poseFlip: false} : lt < A2 + D('ser01_018') ? {t, pose: 'catch', sy: 1 - MD.spring(lt, CATCH, 3, 6) * .06} :
      play('potap', t, {armL: lt < BITE ? 2.6 : lerp(2.6, -.5, seg(lt, BITE, CORE)), eyes: 'shut', mouth: lt > BITE - .2 && lt < BITE + .2 ? 'D' : undefined});
    A(c, 'potap', {x: POT.x, y: F, s: POT.s}, pst);
    if (lt > A2 + D('ser01_018') && lt < CORE) SP(c, 'props/apple', POT.x - 90, F - 900 * POT.s, {w: 46, rot: .2});
    // Йоша: ковшик ловит огрызок — вода плещет на бутон — цветок
    const yst = lt < LAND ? {t, pose: 'water', poseFlip: false, sy: 1} : lt < A3 + D('ser01_019') ? play('yosha', t, {armL: 2.4, armR: 2.4, eyes: lt > A3 + .3 ? 'open' : 'shut', brow: 1, ...MD.jump(lt, BLOOM, .45, 90)}) : {t, pose: 'proud'};
    A(c, 'yosha', {x: YO.x, y: F, s: YO.s}, yst);
    if (lt < BLOOM) SP(c, 'props/bud', POTT.x, F, {w: 120, ay: 1}); else MD.pop(c, t, t - lt + BLOOM, F, () => SP(c, 'props/flower', POTT.x, F, {w: 170, ay: 1}), .45);
    for (let i = 0; i < 6; i++) { const u = seg(lt, LAND + i * .03, LAND + .45 + i * .03); if (u <= 0 || u >= 1) continue;   // брызги
      c.fillStyle = 'rgba(120,200,250,.9)'; c.beginPath(); c.ellipse(lerp(YO.x - 40, POTT.x - 20 + i * 8, u), F - 260 - Math.sin(u * Math.PI) * 160 + u * 180, 8, 12, 0, 0, 7); c.fill(); }
    MD.burst(c, lt, BLOOM, POTT.x, F - 150, '#E7C6FF', 12, 160, .5);
    const ap = apple(lt); if (ap) SP(c, 'props/apple', ap[0], ap[1], {w: ap[3] === 'core' ? 30 : 48, rot: ap[2], alpha: 1});
    // лепестки взлетают к крыше — ведут в следующий план
    for (let i = 0; i < 7; i++) { const u = seg(lt, A3 + D('ser01_019') - .4 + i * .08, L + .6); if (u <= 0) continue;
      c.save(); c.translate(POTT.x - 40 + Math.sin(u * 7 + i) * 80, F - 200 - u * 1200); c.rotate(u * 8 + i); MD.paper(c, MD.ellipse(0, 0, 14, 8), i % 2 ? '#C7A6EC' : '#A77BD8', {shadow: .3}); c.restore(); }
  });
  ribbon(ctx, lt < FIRE + .8 ? 'ПРОШКА' : lt < BITE ? 'ПОТАП' : 'ЙОША', lt < FIRE + .8 ? '#E8743B' : lt < BITE ? '#C8652F' : '#2FA79A',
    lt < FIRE + .8 ? seg(lt, .2, .6) * (1 - seg(lt, FIRE + .4, FIRE + .8)) : lt < BITE ? seg(lt, CATCH, CATCH + .4) * (1 - seg(lt, BITE - .4, BITE)) : seg(lt, BLOOM, BLOOM + .4) * (1 - seg(lt, L - .5, L)));
}, [['ser01_017', A1], ['ser01_018', A2], ['ser01_019', A3]], {dur: .4, type: 'cut'});

// =================== 2-2b. Лепестки долетают до крыши: Пелагея пишет — зачёркивает — комок падает в колпак Тишке ===================
const PEL = {x: 760, y: 470, s: .42}, TISH = {x: 930, y: NAS.door[1], s: .48};
const B1 = .5, THROW = B1 + D('ser01_020') + .1, HIT = THROW + .8, B2 = HIT + .45;
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 760, y: 560, z: 1.75}], [THROW, {x: 770, y: 540, z: 1.8}], [HIT, {x: 900, y: 900, z: 1.6}, 'inOut'], [L, {x: 910, y: 880, z: 1.65}]], [[HIT, .6]]);
  paint(ctx, t, cam, 'nastil', .92);
  MD.layer(ctx, t, cam, 1, c => {
    for (let i = 0; i < 7; i++) { const u = seg(lt, 0, 1.2 + i * .1); if (u >= 1) continue;   // лепестки прилетают снизу
      c.save(); c.translate(PEL.x - 120 + i * 40 + Math.sin(u * 6 + i) * 40, lerp(1100, PEL.y - 200, u)); c.rotate(u * 8 + i); MD.paper(c, MD.ellipse(0, 0, 14, 8), i % 2 ? '#C7A6EC' : '#A77BD8', {shadow: .3}); c.restore(); }
    // Пелагея на крыше: пишет (поза), шепчет (кукла), зачёркивает и бросает комок (поза)
    const pst = lt < B1 ? {t, pose: 'write'} : lt < THROW - .3 ? play('pelageya', t, {pencil: true, eyes: 'half', wing: -.42 + .1 * Math.sin(twos(t) * 14), look: [0, .6]}) :
      {t, pose: 'throw', sy: 1 + MD.spring(lt, THROW, 4, 6) * .05};
    A(c, 'pelageya', {x: PEL.x, y: PEL.y, s: PEL.s}, pst);
    const u = seg(lt, THROW, HIT);
    if (u > 0 && u < 1) SP(c, 'pelageya/p_ball', lerp(PEL.x - 30, TISH.x, u), lerp(PEL.y - 220, TISH.y - 560 * TISH.s, ease.in(u)) - Math.sin(u * Math.PI) * 120, {w: 46, rot: u * 12});
    // Тишка в двери: зевает с подушкой — комок в колпак — подскок — «Сказку!»
    const tst = lt < HIT ? {t, pose: 'yawn', sy: MD.breath(lt, .03, .6)} : lt < B2 ? {t, pose: 'startle', ...MD.jump(lt, HIT, .4, 70)} :
      play('tishka', t, {pillow: true, eyes: 'open', brow: 1, armL: .4, armR: .4, capKick: t - lt + HIT});
    A(c, 'tishka', {x: TISH.x, y: TISH.y, s: TISH.s}, tst);
    MD.burst(c, lt, HIT, TISH.x, TISH.y - 560 * TISH.s, '#FFF1D6', 10, 120, .4);
  });
  ribbon(ctx, lt < THROW + .3 ? 'ПЕЛАГЕЯ' : 'ТИШКА', lt < THROW + .3 ? '#A77BD8' : '#E8743B', lt < THROW + .3 ? seg(lt, .2, .6) * (1 - seg(lt, THROW - .2, THROW + .3)) : seg(lt, B2, B2 + .4));
}, [['ser01_020', B1], ['ser01_021', B2]], {dur: .3, type: 'cut'});

// =================== 2-3. «Чур, я!» — «Я!» — «Нет, я сам!»: трое наперегонки в дверь и застревают; Пелагея: «…и я.» — дверь хлоп ===================
const JAM = 1.7, POP = 3.0, SLAM = 3.35;
shot(1, (ctx, t, lt, L) => {
  const cam = MD.cam(lt, [[0, {x: 560, y: 1150, z: 1.15}], [JAM, {x: 760, y: 1080, z: 1.35}, 'in'], [POP + .4, {x: 820, y: 1080, z: 1.45}], [L, {x: 840, y: 1070, z: 1.55}]], [[JAM, 1.2], [SLAM, .8]]);
  paint(ctx, t, cam, 'nastil', .92);
  MD.layer(ctx, t, cam, 1, c => {
    const [dx, dy] = NAS.door, run = (n, x0, s, a, b, ph) => {
      const u = seg(lt, a, b), x = lerp(x0, dx - 40, ease.in(u));
      if (lt < JAM) A(c, n, {x, y: F, s}, {t, pose: lt < a ? 'run0' : MD.cycle(lt + ph, 'run'), sy: 1});
      return x;
    };
    if (lt < POP) {
      if (lt < JAM) { run('potap', -120, .45, .2, JAM, 0); run('yosha', -260, .5, .4, JAM, .1); run('proshka', 60, .42, 0, JAM, .2); }
      else { const sq = 1 + MD.spring(lt, JAM, 4, 3) * .12, wob = Math.sin(lt * 30) * .02;   // застряли: дверь трещит
        A(c, 'proshka', {x: dx - 120, y: dy + 10, s: .42, rot: -.25 + wob}, {t, pose: 'startle', sx: 2 - sq, sy: sq});
        A(c, 'yosha', {x: dx + 110, y: dy + 20, s: .5, rot: .3 - wob}, {t, pose: 'hush', sx: 2 - sq, sy: sq});
        A(c, 'potap', {x: dx, y: dy + 30, s: .47}, {t, pose: 'stuck', sx: (2 - sq) * .9, sy: sq}); }
    } else if (lt < SLAM) { const u = seg(lt, POP, SLAM); [['proshka', -60], ['potap', 0], ['yosha', 60]].forEach(([n, o], i) =>   // чпок — все внутри
      A(c, n, {x: dx + o + u * 120, y: dy + 20, s: .45 * (1 - u * .6), alpha: 1 - u}, {t, pose: n === 'potap' ? 'flop' : n === 'yosha' ? 'ball' : 'fall'})); }
    if (lt > POP - .1 && lt < POP + .3) MD.burst(c, lt, POP, dx, dy - 200, '#FFF1D6', 14, 220, .4);
    // Пелагея подлетает сзади — дверь захлопывается у неё перед клювом
    const px = K(lt, [[0, -200], [1.4, -200], [2.6, dx - 260, 'out']]), py = K(lt, [[1.4, F - 300], [2.6, F, 'out']]);
    A(c, 'pelageya', {x: px, y: py, s: .4, shadow: lt > 2.4}, lt < 2.6 ? {t, pose: MD.cycle(lt, 'fly'), poseS: 1} : lt < SLAM + .2 ? play('pelageya', t, {eyes: 'open', wing: .5, wingR: .5, brow: 1}) :
      play('pelageya', t, {eyes: 'half', wing: .1, wingR: .1, tilt: -.1, sy: 1 - MD.spring(lt, SLAM, 3, 5) * .08}));
    if (lt > SLAM && lt < SLAM + .5) MD.dust(c, lt, SLAM, dx - 120, dy - 40, 8);
  });
}, [['ser01_022', .15], ['ser01_023', .15 + D('ser01_022') + .05], ['ser01_024', .15 + D('ser01_022') + D('ser01_023') + .15], ['ser01_025', SLAM + .45]], {dur: .4, type: 'cut'});

// =================== 2-4a. Колыбельная: Тишка в кроватке поёт — и забывает слова ===================
const BED = {x: 250, y: 1320, s: .62};
shot(1, (ctx, t, lt, L) => {
  const a2 = .4 + D('ser01_027') + .45;
  const cam = MD.cam(lt, [[0, {x: 300, y: 1060, z: 1.9}], [L, {x: 300, y: 1040, z: 2.05}]]);
  paint(ctx, t, cam, 'komnata', .92);
  MD.layer(ctx, t, cam, 1, c => {
    A(c, 'tishka', {x: BED.x, y: BED.y, s: BED.s, shadow: false}, {t, pose: lt < a2 - .2 ? 'bedsing' : 'bedsad', rotP: lt < a2 ? .03 * Math.sin(lt * 2) : 0, sy: MD.breath(lt, .015, .4)});
    if (lt < a2) for (let i = 0; i < 4; i++) { const u = ((lt * .45 + i * .25) % 1); c.save(); c.globalAlpha = Math.sin(u * Math.PI) * .9; c.fillStyle = '#F7D36A'; c.font = '48px serif';
      c.fillText('♪', BED.x + 60 + u * 140 + Math.sin(u * 7 + i) * 20, BED.y - 380 - u * 220); c.restore(); }
  });
  MD.grade(ctx, 'rgba(255,170,90,1)', .12, 'soft-light');
}, [['ser01_027', .4], ['ser01_028', .4 + D('ser01_027') + .45]], {dur: .5, type: 'page'});

// =================== 2-4b. Прошка влетает на самокате, хвастает — трюк — самокат рассыпается, Прошка повисает на лампе ===================
const LAMP = [576, 330];
shot(1, (ctx, t, lt, L) => {
  const c1 = .3, c2 = c1 + D('ser01_029') + .35, TRICK = c2 + D('ser01_030') + .1, BOOM = TRICK + .45, HANG = BOOM + .55;
  const cam = MD.cam(lt, [[0, {x: 640, y: 1350, z: 1.25}], [TRICK, {x: 560, y: 1300, z: 1.2}], [BOOM, {x: 560, y: 900, z: 1.05}, 'out'], [L, {x: 570, y: 760, z: 1.15}]], [[BOOM, 1.2]]);
  paint(ctx, t, cam, 'komnata', .92);
  MD.layer(ctx, t, cam, 1, c => {
    // путь самоката: влетает справа, восьмёрка по ковру
    const ride = lt < TRICK, ph = (lt - .0) * 1.1;
    let x = K(lt, [[0, 1400], [c1 + .4, 760, 'out'], [TRICK, 520]]) + (lt > c1 + .4 && ride ? Math.sin(ph * 2) * 140 : 0), y = KOM.floor + (ride ? Math.sin(ph * 4) * 30 : 0);
    if (ride) {
      SP(c, 'props/scooter', x + 20, y + 6, {w: 330, ay: 1, flip: Math.cos(ph * 2) > 0, rot: Math.sin(ph * 4) * .05});
      A(c, 'proshka', {x, y: y - 40, s: .42, rot: Math.sin(ph * 2) * .08}, play('proshka', t, {armR: 1.2 + .4 * Math.sin(twos(t) * 6), armL: .6, brow: .5, mouthKey: MD.speaking('proshka', t) ? null : 'mouth_smile'}));
    } else if (lt < HANG) {   // трюк: прыжок вверх, самокат взрывается деталями
      const u = seg(lt, TRICK, HANG), hx = lerp(520, LAMP[0], u), hy = lerp(KOM.floor - 40, LAMP[1] + 980 * .42 + 40, ease.out(u));
      A(c, 'proshka', {x: hx, y: hy, s: .42, rot: u * 6.28, shadow: false}, {t, pose: 'jump'});
      if (lt < BOOM) SP(c, 'props/scooter', 540, KOM.floor - u * 500, {w: 330, ay: 1, rot: u * 3});
    } else { const sw = Math.sin((lt - HANG) * 3.2) * .35 * Math.exp(-(lt - HANG) * .5);   // висит на лампе и качается
      c.save(); c.translate(LAMP[0], LAMP[1]); c.rotate(sw); A(c, 'proshka', {x: 0, y: 980 * .42 + 30, s: .42, shadow: false}, {t, armL: 2.9, armR: 3.0, elbowL: 0, elbowR: 0, eyes: 'wow', legL: Math.sin(lt * 7) * .3, legR: -Math.sin(lt * 7) * .3, mouth: 'E'}); c.restore(); }
    if (lt > BOOM) { const R = MD.rng(5), b = lt - BOOM;   // детали самоката разлетаются и падают на пол
      for (const [k, w] of [['props/scooter_bar', 200], ['props/scooter_deck', 230], ['props/scooter_wheel', 90], ['props/scooter_wheel', 90], ['props/nut', 28], ['props/spring', 34], ['props/bolt', 34], ['props/nut', 28]]) {
        const vx = (R() - .5) * 1300, vy = -500 - R() * 600, x2 = 540 + vx * b, y2 = Math.min(KOM.floor, KOM.floor - 400 + vy * b + 1600 * b * b);
        SP(c, k, x2, y2, {w, rot: (R() - .5) * 10 * Math.min(b, .9), ay: .8}); } }
    MD.burst(c, lt, BOOM, 540, KOM.floor - 420, '#FFE6A0', 18, 300, .5);
  });
}, [['ser01_029', .3], ['ser01_030', .3 + D('ser01_029') + .35]]);

// =================== 2-4c. Все хохочут: Йоша катается клубком, Потап держится за живот, Тишка хихикает, Прошка — с лампы ===================
shot(1, (ctx, t, lt, L) => {
  const a = [.2]; a.push(a[0] + D('ser01_031') + .15); a.push(a[1] + D('ser01_032') + .15); a.push(a[2] + D('ser01_033') + .2);
  const cam = MD.cam(lt, [[0, {x: 560, y: 1200, z: 1.05}], [a[3], {x: 560, y: 1150, z: 1.1}], [L, {x: 576, y: 700, z: 1.5}]]);
  paint(ctx, t, cam, 'komnata', .92);
  MD.layer(ctx, t, cam, 1, c => {
    A(c, 'tishka', {x: BED.x, y: BED.y, s: BED.s, shadow: false}, {t, pose: lt > a[2] - .1 && lt < a[3] + .3 ? 'giggle' : 'bedsad', sy: 1 + Math.abs(Math.sin(twos(t) * 10)) * .03});
    const roll = Math.sin(lt * 2.2) * 120;
    A(c, 'yosha', {x: 360 + roll, y: KOM.floor + 40, s: .55, rot: roll / 60}, {t, pose: 'ball'});
    A(c, 'potap', {x: 760, y: KOM.floor + 20, s: .5}, {t, pose: 'laugh', sy: 1 + Math.abs(Math.sin(twos(t) * 9)) * .05});
    const sw = Math.sin(lt * 2.4) * .18;
    c.save(); c.translate(LAMP[0], LAMP[1]); c.rotate(sw); A(c, 'proshka', {x: 0, y: 980 * .42 + 30, s: .42, shadow: false}, play('proshka', t, {armL: 2.9, armR: 3.0, eyes: 'shut', legL: .3, legR: .2, ...MD.laugh(t), gest: false})); c.restore();
    for (const [x, y] of [[300, 1500], [720, 1350], [250, 950]]) { const u = (lt * 1.3 + x) % 1; c.save(); c.globalAlpha = Math.sin(u * Math.PI); c.fillStyle = '#FFF1D6'; c.font = `bold 44px ${MD.FONT.ui}`; c.fillText('ха', x + u * 40, y - u * 120); c.restore(); }
  });
}, [['ser01_031', .2], ['ser01_032', .2 + D('ser01_031') + .15], ['ser01_033', .2 + D('ser01_031') + D('ser01_032') + .3], ['ser01_034', .2 + D('ser01_031') + D('ser01_032') + D('ser01_033') + .5]]);
// ---------- звуковые метки (audio_ser01.py) ----------
const Q = (i, lt, n) => S.cue(S.all[B0 + i], lt, n);
Q(0, 0, 'pine'); Q(1, FIRE, 'catapult'); Q(1, CATCH, 'catch'); Q(1, BITE, 'crunch'); Q(1, LAND, 'splash'); Q(1, BLOOM, 'bloom'); Q(2, THROW, 'paper'); Q(2, HIT, 'bonk');
Q(3, 0, 'run'); Q(3, JAM, 'jam'); Q(3, POP, 'pop'); Q(3, SLAM, 'slam'); Q(4, 0, 'bedtime'); Q(5, 0, 'scooter');
Q(5, .3 + D('ser01_029') + .35 + D('ser01_030') + .1 + .45, 'scooter_boom'); Q(6, 0, 'laughs');
})();
