// Сборка опросов тестеров: node zlataya_cep/docs/feedback/src/build.js [--pub DIR] [--zip DIR]
// Из page.html (общий шаблон) и surveys.js (содержание) собирает четыре страницы:
//  * zlataya_cep/docs/feedback/opros_*.html — самостоятельные копии (открываются из папки, картинки из assets/, ответы — файлом);
//  * DIR/opros_*.html (если задан --pub) — те же страницы без обёртки <html>/<head> для публикации артефактом, плюс DIR/assets.json —
//    какие картинки нужны каждой странице (публикуются рядом как assets/*.webp);
//  * DIR/zlataya-cep_opros_*.zip (если задан --zip) — архивы для работы без интернета: страница, её картинки, инструкция.
// Самостоятельные копии и архивы не ходят в интернет: шрифты (src/fonts, SIL OFL) встроены в страницу.
const fs = require('fs'), path = require('path');
const SRC = __dirname, OUT = path.join(SRC, '..'), ASSETS = path.join(OUT, 'assets');
const arg = (k) => { const i = process.argv.indexOf(k); return i < 0 ? null : process.argv[i + 1]; };
const PUB = arg('--pub'), ZIP = arg('--zip');
const FONTS = path.join(SRC, 'fonts');
const fontCSS = fs.readFileSync(path.join(FONTS, 'fonts.css'), 'utf8')
  .replace(/url\(([\w.-]+\.woff2)\)/g, (m, f) => `url(data:font/woff2;base64,${fs.readFileSync(path.join(FONTS, f)).toString('base64')})`);
const FONT_RE = /<!--@@FONTS-->[\s\S]*?<!--FONTS@@-->/;
const S = require('./surveys.js');
const tpl = fs.readFileSync(path.join(SRC, 'page.html'), 'utf8');

// Цвета каждой возрастной группы: свой мир игры (лес, Китеж, небо, Смородина) и свой размер шрифта.
const THEMES = {
  '7-8': {fs: 20,
    light: {accent: '#3f9b3a', 'accent-strong': '#2e7a2a', accent2: '#f2b705', sky1: '#8fd3ff', sky2: '#eaf8ff', hill1: '#86c95c', hill2: '#62ad4b', hill3: '#468f3f', sea: '#45b3d9'},
    dark: {accent: '#6fcf5f', 'accent-strong': '#2f8a2a', accent2: '#f2c43a'}},
  '9-10': {fs: 18,
    light: {accent: '#1d7fb8', 'accent-strong': '#17689a', accent2: '#ff8a5c', sky1: '#6fc8f0', sky2: '#dcf4ff', hill1: '#5cbfa4', hill2: '#3fa28f', hill3: '#2e8580', sea: '#2f8fcf', sun: '#ffe066'},
    dark: {accent: '#56b8ef', 'accent-strong': '#1f78ad', accent2: '#ff9c75', hill1: '#1f4f4a', hill2: '#1a423f', hill3: '#143533', sea: '#153f66'}},
  '11-13': {fs: 17,
    light: {accent: '#7b5cd6', 'accent-strong': '#6446c2', accent2: '#f2b705', sky1: '#a796f2', sky2: '#f1ecff', hill1: '#b7a8ef', hill2: '#9784e0', hill3: '#7a66cc', sea: '#8fb1ff', oak1: '#5e9a4a', oak2: '#4a8340'},
    dark: {accent: '#a891ff', 'accent-strong': '#6a4fcf', accent2: '#f2c43a', sky1: '#140f33', sky2: '#3a2d70', hill1: '#3b3170', hill2: '#30285e', hill3: '#261f4d', sea: '#2a3f80'}},
  '14plus': {fs: 16,
    light: {accent: '#c8412b', 'accent-strong': '#a93522', accent2: '#d9a520', sky1: '#ffb070', sky2: '#fff0dc', hill1: '#d99355', hill2: '#bb7440', hill3: '#96573a', sea: '#e0703a', sun: '#fff1a8'},
    dark: {accent: '#ff7a5c', 'accent-strong': '#b8432c', accent2: '#e8b53a', sky1: '#1c0f14', sky2: '#5a2a22', hill1: '#4a2a20', hill2: '#3d221b', hill3: '#301a15', sea: '#6a2a1a', sun: '#ffcf8a'}},
};
const vars = (o) => Object.entries(o).map(([k, v]) => `--${k}:${v};`).join('');
function themeCSS(id) {
  const t = THEMES[id], d = vars(t.dark);
  return `:root{--fs:${t.fs}px;${vars(t.light)}}` +
    `@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){${d}}}:root[data-theme="dark"]{${d}}` +
    `@media (max-width:560px){:root{--fs:${Math.max(16, t.fs - 1)}px}}`;
}
function assetsOf(sv) {
  const set = new Set(['st_kot', 'st_proshka', 'st_potap', 'st_pelageya', 'st_yosha']);
  for (const s of sv.sections) {
    [s.bg, s.who, ...(s.stk || [])].forEach(x => x && set.add(x));
    for (const q of s.q) [...(q.o || []), ...(q.rows || [])].forEach(o => o && o.img && set.add(o.img));
  }
  const miss = [...set].filter(a => !fs.existsSync(path.join(ASSETS, a + '.webp')));
  if (miss.length) throw new Error(sv.id + ': нет картинок ' + miss.join(', '));
  return [...set].sort();
}
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c').replace(/[\u2028\u2029]/g, (c) => '\\u' + c.charCodeAt(0).toString(16));

const manifest = {};
for (const sv of Object.values(S)) {
  const page = tpl.replace('@@TITLE@@', esc(sv.title)).replace('@@DESC@@', esc(sv.desc))
    .replace('/*@@THEME@@*/', themeCSS(sv.id)).replace('/*@@DATA@@*/null', () => json(sv));
  if (/@@[A-Z]+@@/.test(page.replace('<!--@@BODY@@-->', ''))) throw new Error(sv.id + ': не все метки шаблона заменены');
  const [head, body] = page.split('<!--@@BODY@@-->');
  if (!FONT_RE.test(head)) throw new Error('нет метки шрифтов в page.html');
  const standalone = '<!doctype html>\n<html lang="ru">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n' +
    head.replace(FONT_RE, () => '<style>\n' + fontCSS + '</style>') + '</head>\n<body>\n' + body + '</body>\n</html>\n';
  fs.writeFileSync(path.join(OUT, sv.file + '.html'), standalone);
  const assets = assetsOf(sv);
  manifest[sv.file] = assets;
  if (PUB) { fs.mkdirSync(PUB, {recursive: true}); fs.writeFileSync(path.join(PUB, sv.file + '.html'), (head + body).replace(/<!--@@FONTS-->|<!--FONTS@@-->/g, '')); }
  if (ZIP) pack(sv, standalone, assets);
  const q = sv.sections.reduce((n, s) => n + s.q.length, 0);
  console.log(`${sv.file}.html  ${sv.sections.length} глав, ${q} вопросов, ${assets.length} картинок, ${(standalone.length / 1024).toFixed(0)} КБ`);
}
if (PUB) fs.writeFileSync(path.join(PUB, 'assets.json'), JSON.stringify(manifest, null, 1));

// Архив для работы без интернета: папка со страницей, картинками, инструкцией и лицензией шрифтов (CRLF и BOM — чтобы Блокнот Windows
// показал русский текст).
function pack(sv, html, assets) {
  const name = 'zlataya-cep_' + sv.file, dir = path.join(ZIP, name);
  fs.rmSync(dir, {recursive: true, force: true}); fs.mkdirSync(path.join(dir, 'assets'), {recursive: true});
  fs.writeFileSync(path.join(dir, sv.file + '.html'), html);
  for (const a of assets) fs.copyFileSync(path.join(ASSETS, a + '.webp'), path.join(dir, 'assets', a + '.webp'));
  const kid = sv.voice !== 'вы', who = sv.id === '7-8' || sv.id === '9-10';
  const txt = [
    `«Златая цепь» — опрос для тех, кто прошёл игру (${sv.age})`, '',
    'КАК ОТКРЫТЬ',
    '1. Распакуйте архив целиком (правой кнопкой мыши → «Извлечь всё…»). Не открывайте страницу прямо внутри архива —',
    '   рядом с ней должна лежать папка assets с картинками.',
    `2. Дважды щёлкните файл ${sv.file}.html — опрос откроется в браузере (Chrome, Edge, Яндекс Браузер, Firefox).`,
    '   Интернет не нужен.', '',
    'КАК ОТПРАВИТЬ ОТВЕТЫ',
    '• В конце опроса нажмите «Сохранить файлом» — в папке «Загрузки» появится файл',
    `  zlataya-cep_opros_${sv.id}_<дата>.json. Перешлите его организатору теста.`,
    '• Или нажмите «Скопировать ответы» и вставьте текст в письмо или сообщение.', '',
    'ПОЛЕЗНО ЗНАТЬ',
    `• Опрос займёт ${sv.time}. Любой вопрос можно пропустить.`,
    '• Если закрыть опрос на середине, ответы останутся в этом браузере — при следующем открытии можно продолжить.',
    kid ? '• Чтобы заполнить опрос за другого игрока, в конце нажмите «Заполнить для другого игрока».' : '• Чтобы заполнить опрос ещё раз (за другого игрока), в конце нажмите «Заполнить ещё раз».',
    ...(who ? ['• Кнопка с динамиком читает вопрос вслух (если в Windows установлен русский голос).',
      '• Взрослый может читать вопросы ребёнку и записывать его ответы — его словами.'] : []),
    '• Шрифты встроены в страницу; их лицензия — в файле fonts-license.txt.', ''].join('\r\n');
  fs.writeFileSync(path.join(dir, 'README.txt'), '\ufeff' + txt);
  fs.copyFileSync(path.join(FONTS, 'OFL.txt'), path.join(dir, 'fonts-license.txt'));
  const zip = path.join(path.resolve(ZIP), name + '.zip');
  fs.rmSync(zip, {force: true});
  require('child_process').execFileSync('zip', ['-r', '-X', '-9', '-q', zip, name], {cwd: path.resolve(ZIP)});
  console.log(`  → ${name}.zip  ${(fs.statSync(zip).size / 1024).toFixed(0)} КБ`);
}
