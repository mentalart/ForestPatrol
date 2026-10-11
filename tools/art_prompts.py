#!/usr/bin/env python3
# Арт-ресёрч для 3D-игры на Unreal Engine 5: 5 стилей × каждая сущность игры отдельно (герои, жители, мороки, мини-боссы, боссы,
# локации всех уровней, предметы, геймплей) → промты для Qwen Image (1280×720) в zlataya_cep/docs/41_art_research_prompts.md.
# Документ — источник для пакетной генерации через MCP на машине пользователя; руками его не править, правки — здесь:
#   python3 tools/art_prompts.py          — пересобрать документ
# Промт = вступление стиля + ядро сущности (одно на все стили: композиция одинаковая, меняется только стиль)
#       + акцент сущности в этом стиле (свой или общий для раздела / мира) + хвост стиля для вида картинки (char / prop / scene / game).
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'zlataya_cep', 'docs', '41_art_research_prompts.md')
SAVE = r'C:\_UE_PRJs_\ZolotayCepGame\wiki\images\_ArtResearch'
BY_STYLE, BY_ENT = 'Po_stilyam', 'Po_sushchnostyam'
W, H = 1280, 720

# ---------------------------------------------------------------- стили (все — 3D-рендер в реальном времени, как в Unreal Engine 5)
STYLES = [
    dict(id='S1', dir='S1_Reznaya_skazka', ru='Резная сказка', en='Carved Folk Toy 3D',
         idea='Герои и мир — расписные деревянные игрушки богородских и семёновских мастеров, ожившие в 3D: крупные рубленые формы со '
              'следами стамески, мягкие фаски, матовая темпера по липе, городецкие цветы и точки-бусины. Мир — настольная диорама.',
         why='Прямое развитие нынешней арт-библии («вырезанная из дерева сказка», грань вместо глянца), поэтому меньше всего риска. '
             'Тёплый, «игрушечный», хорошо читается с камеры игры.',
         ue='Stylized PBR (Substrate или обычные материалы): фаски и шум формы в Nanite-мешах, волокно дерева и роспись — текстурами и '
            'декалями, Lumen и тёплое солнце, мягкие тени Virtual Shadow Maps, лёгкий tilt-shift (DOF) в роликах. Самый дешёвый в производстве.',
         palette='охра, киноварь, хвойная зелень, сливочный, золото',
         refs='богородская игрушка, городецкая и полхов-майданская роспись, Synty POLYGON, A Short Hike, Tunic',
         lead='Unreal Engine 5 real-time 3D render of a stylized game in the look of hand-carved, hand-painted Russian folk wooden toys '
              '(Bogorodskaya carving, Gorodets painting).',
         char='Game-ready stylized 3D character: chunky simplified forms with visible chisel facets and soft bevels, matte hand-painted '
              'tempera materials over warm linden wood grain, small painted folk ornaments, big expressive eyes with a white highlight. '
              'Lumen global illumination, warm golden-hour key light, soft ambient occlusion, colored shadows, never pure black. Palette: '
              'ochre, cinnabar red, pine green, cream, gold. Character showcase on a small carved wooden base, plain warm backdrop. Ultra HD, 4K.',
         prop='Game-ready 3D prop: carved linden wood with chisel facets and soft bevels, matte tempera paint, gilded details, small painted '
              'folk ornaments. Asset showcase on a plain warm neutral backdrop, soft studio light, gentle contact shadows. Palette: ochre, '
              'cinnabar red, pine green, cream, gold. Ultra HD, 4K.',
         scene='In-engine 3D environment: faceted carved-wood meshes with soft bevels, matte tempera-painted materials, painted folk '
               'ornaments on buildings and props, Lumen global illumination, warm sun, volumetric fog, soft ambient occlusion, colored '
               'shadows, subtle tilt-shift depth of field like a tabletop diorama. Palette: ochre, cinnabar red, pine green, cream, gold '
               'accents. Ultra HD, 4K.',
         game='In-engine gameplay screenshot with a carved and painted wood look: matte faceted surfaces, Lumen lighting, soft ambient '
              'occlusion, colored shadows, crisp readable silhouettes and paths. Ultra HD, 4K.',
         neg='photorealistic, realistic fur, hyper-detailed skin, glossy plastic, chrome, 2D flat illustration, sketch, anime, manga, '
             'chibi sticker, vector art, low quality, blurry, noisy, jpeg artifacts, deformed anatomy, extra limbs, fused limbs, text, '
             'letters, captions, watermark, signature, logo, gore, horror'),
    dict(id='S2', dir='S2_Valyanaya_skazka', ru='Валяная сказка', en='Felt & Embroidery 3D',
         idea='3D-мир, который выглядит как кукольная анимация: герои свалены из шерсти, глаза — стеклянные бусинки, земля и небо — '
              'вышивка гладью и крестом по льну, реки — вязаное полотно, облака — вата.',
         why='Продолжает то, что уже есть в игре: вышитая карта-рушник и льняные полотна-переходы между уровнями; мороки — нитяные '
             'клубки, которые распутываются, — в этом стиле буквально из ниток. Самый уютный и «семейный».',
         ue='Ворс — Groom или shell-fur в материале (на дальних LOD — карты нормалей ворса), стежки и вышивка — декалями и тайлами, '
            'вязаные поверхности — тайловыми материалами с displacement (Nanite), мягкий Lumen и «макро» DOF; анимация с лёгким '
            'шагом кадров (12–15 кадров в секунду на костях) даёт ощущение stop-motion.',
         palette='натуральные красители: марена, индиго, берёзовый белый, мох, шафран',
         refs='«Варежка», Yarny/Unravel, Kirby\'s Epic Yarn, Sackboy, студия Laika, русская вышивка',
         lead='Unreal Engine 5 real-time 3D render of a stylized game that looks like stop-motion animation: needle-felted wool puppets on '
              'an embroidered textile miniature set.',
         char='Game-ready stylized 3D character with felt shading: soft fuzzy wool fibers, glass-bead eyes, stitched seams, knitted and '
              'crocheted clothing, yarn accessories. Soft warm lighting like macro photography, gentle depth of field, cozy handmade '
              'feel. Palette of naturally dyed wool: madder red, indigo, birch white, moss green, saffron yellow. Character showcase on a '
              'round linen platform, plain linen backdrop. Ultra HD, 4K.',
         prop='Game-ready 3D prop made of felt, yarn, linen, embroidery thread, beads and small wood and brass pieces, visible fibers and '
              'stitches. Asset showcase on a plain linen backdrop, soft warm macro lighting. Palette of naturally dyed wool: madder red, '
              'indigo, birch white, moss green, saffron, gold thread. Ultra HD, 4K.',
         scene='In-engine 3D environment built from felt, embroidered linen ground with cross-stitch and satin-stitch textures, knitted '
               'water, crocheted foliage, cotton-wool clouds and mist, buttons and beads as small details. Lumen global illumination with '
               'soft warm light, shallow macro depth of field, volumetric haze, cozy handmade feel. Palette of naturally dyed wool: madder '
               'red, indigo, birch white, moss green, saffron yellow. Ultra HD, 4K.',
         game='In-engine gameplay screenshot that looks like a stop-motion felt and embroidery miniature set: soft wool textures, stitched '
              'details, macro-like lighting, readable paths and characters. Ultra HD, 4K.',
         neg='glossy plastic, smooth CGI surfaces, realistic animals, photo of real fur, 2D flat illustration, sketch, digital painting, '
             'anime, vector art, cartoon outlines, low quality, blurry, noisy, deformed anatomy, extra limbs, creepy doll, uncanny, text, '
             'letters, captions, watermark, signature, logo, gore, horror'),
    dict(id='S3', dir='S3_Knizhka_Bilibina', ru='Книжка Билибина', en='Bilibin Toon 3D',
         idea='Классическая иллюстрация русской сказки, переведённая в 3D cel-shading: уверенный чёрный контур, плоские ступенчатые '
              'тени, узорные одежды, шерсть и перья в рисованных текстурах, облака, волны и деревья — орнаментальными формами.',
         why='Самый узнаваемый «русский сказочный» образ и самый читаемый с камеры игры: силуэт и контур. Хорошо ложится на ролики-лубки '
             'Кота Учёного и на интерфейс (рамки, антиква, золотые бусины).',
         ue='Toon-шейдинг: пост-процесс контура (глубина и нормали) или inverted hull, ступенчатое освещение в материале, рисованные '
            'текстуры с узорами, зерно бумаги и лёгкая акварельная заливка — пост-процессом; Lumen — только для мягкого отражённого цвета.',
         palette='кирпично-красный, шалфей, охра, индиго, золото, сливочный',
         refs='Иван Билибин, русский модерн, Okami, Ni no Kuni, Genshin Impact и Hi-Fi Rush (по технике toon)',
         lead='Unreal Engine 5 real-time 3D render of a cel-shaded (toon) stylized game inspired by Ivan Bilibin\'s Russian fairy-tale '
              'illustrations and Russian Art Nouveau.',
         char='Game-ready toon-shaded 3D character: crisp ink outlines of varied weight, flat two-tone stepped shading, hand-painted '
              'textures with decorative folk patterns on clothing, fur and feathers, subtle watercolor paper grain, clear silhouette, big '
              'expressive eyes. Palette: brick red, sage green, ochre, indigo, gold, cream. Character showcase on a simple round base, '
              'plain cream backdrop. Ultra HD, 4K.',
         prop='Game-ready toon-shaded 3D prop: crisp ink outlines, flat stepped shading, hand-painted ornamental engraving-like patterns, '
              'subtle paper grain. Asset showcase on a plain cream backdrop. Palette: brick red, sage green, ochre, indigo, gold. Ultra HD, 4K.',
         scene='In-engine toon-shaded 3D environment: ink outlines on all meshes, flat stepped shading, hand-painted patterned textures, '
               'clouds, waves, trees and hills modeled in curling ornamental shapes, subtle watercolor paper grain post-process, clear '
               'readable shapes and paths. Palette: brick red, sage green, ochre, indigo, gold, cream. Ultra HD, 4K.',
         game='In-engine cel-shaded gameplay screenshot in Bilibin storybook style: ink outlines, flat stepped shading, patterned '
              'hand-painted textures, very readable silhouettes and paths. Ultra HD, 4K.',
         neg='photorealistic, realistic PBR, glossy plastic, airbrush, soft gradients, 2D flat drawing on paper, sketch, anime, manga, '
             'chibi, comic halftone, low quality, blurry, messy lines, deformed anatomy, extra limbs, text, letters, captions, watermark, '
             'signature, logo, gore, horror'),
    dict(id='S4', dir='S4_Palekhskaya_shkatulka', ru='Палехская шкатулка', en='Palekh Lacquer 3D',
         idea='Лаковая миниатюра Палеха и Федоскина в 3D: глубокий чёрный лак вокруг, фигуры светятся драгоценными цветами, '
              'сусальное золото штрихует шерсть, перья и одежду, по миру — тонкие золотые завитки.',
         why='Самый драматичный и «дорогой» стиль: ночные уровни, боссы, Кощей, ролики и Сказы. Тёмное окружение даёт идеальную '
             'контрастность — герои и всё, с чем можно взаимодействовать, светятся золотом.',
         ue='Тёмные сцены с сильным контровым светом, лаковый clear coat (Substrate) на окружении, эмиссивная золотая штриховка — '
            'маской в материале или мировым шейдером по кривизне, золотые завитки — декалями, свечение — Bloom и Lumen; яркие '
            '«драгоценные» базовые цвета героев.',
         palette='чёрный лак, киноварь, изумруд, ультрамарин, охра, сусальное золото',
         refs='палехская и федоскинская лаковая миниатюра, Гриша Голиков, Ori (по свету), Hades (по контрасту)',
         lead='Unreal Engine 5 real-time 3D render of a stylized game inspired by Palekh lacquer miniatures: jewel-tone figures and '
              'gold-leaf ornament glowing against deep black lacquer.',
         char='Game-ready stylized 3D character: smooth jewel-tone materials with a lacquer clear-coat sheen, emissive gold-leaf hatching on '
              'fur, feathers and clothing, graceful slightly elongated proportions yet kind expressive faces with large eyes, strong golden '
              'rim light. Palette: black lacquer, vermilion, emerald, ultramarine, ochre, shining gold. Character showcase on a black '
              'lacquer pedestal with gold ornamental scrolls, dark background. Ultra HD, 4K.',
         prop='Game-ready 3D prop: jewel-tone lacquered materials with clear-coat sheen, emissive gold-leaf hatching and fine engraving, '
              'soft glow. Asset showcase on a black lacquer pedestal with gold scrolls, dark background. Palette: black lacquer, vermilion, '
              'emerald, ultramarine, ochre, shining gold. Ultra HD, 4K.',
         scene='In-engine 3D environment in deep dark lacquer tones: glossy black-lacquer ground and rocks, stylized hills, trees, waves '
               'and architecture in jewel tones, emissive gold-leaf hatching and ornamental gold scroll decals, magical glowing light '
               'sources, Lumen with strong rim light, bloom, volumetric glow. Palette: black lacquer, vermilion, emerald, ultramarine, '
               'ochre, shining gold. Ultra HD, 4K.',
         game='In-engine gameplay screenshot in Palekh lacquer style: dark lacquer-black surroundings, characters and interactive objects '
              'in jewel tones outlined with glowing gold leaf, magical light, very high contrast and readability. Ultra HD, 4K.',
         neg='photorealistic, realistic PBR, matte plastic toy, 2D flat illustration, painting on canvas, sketch, anime, manga, bright '
             'white background, pastel washed-out colors, low quality, blurry, deformed anatomy, extra limbs, text, letters, captions, '
             'watermark, signature, logo, gore'),
    dict(id='S5', dir='S5_Bumazhny_teatr', ru='Бумажный театр', en='Papercraft Theater 3D',
         idea='3D-мир из бумаги: фигурки сложены и вырезаны из цветного картона, суставы — на латунных гвоздиках, деревья и рамки — '
              'кружевная вытынанка, сцена собрана из слоёв, а тёплый свет сзади просвечивает тонкую бумагу.',
         why='Продолжает театр теней эпилога и «книжность» Сказов; очень цельный и необычный для 3D-игры. Слои сцены сами подсказывают '
             'глубину и путь, марионеточные движения — понятный детям юмор.',
         ue='Тонкие меши-листы с толщиной по краю, бумага с просвечиванием (Subsurface или Two Sided Foliage), кружево — маской '
            'прозрачности, сгибы — Nanite-геометрией, мягкие контактные тени между слоями (Virtual Shadow Maps), сильный контровой свет '
            'и Lumen; герои — объёмные из согнутого картона, суставы на «гвоздиках» в анимации.',
         palette='3–4 цвета бумаги на сцену и один светящийся акцент',
         refs='вытынанка, театр теней, Tearaway, Paper Mario: The Origami King, «Сказка сказок» (по атмосфере)',
         lead='Unreal Engine 5 real-time 3D render of a stylized papercraft game inspired by Russian vytynanka paper cutting and shadow '
              'puppet theater.',
         char='Game-ready 3D papercraft character: folded and cut colored card with crisp edges and visible paper fibers, layered paper '
              'relief, lace-like cut-out ornaments, small brass-pin joints, thin paper parts glowing with subsurface backlight. Limited '
              'palette of 3-4 paper colors plus one glowing accent. Character showcase on a paper stage disc, softly backlit cream paper '
              'backdrop. Ultra HD, 4K.',
         prop='Game-ready 3D papercraft prop: folded colored card, gold foil and translucent tissue paper, crisp knife-cut edges, lace-like '
              'cut ornaments, soft contact shadows. Asset showcase on a softly backlit cream paper backdrop. Limited palette plus one '
              'glowing accent. Ultra HD, 4K.',
         scene='In-engine 3D papercraft environment: layered cut-paper planes and folded paper geometry at many depths with soft shadows '
               'between them, lace-like vytynanka ornaments in trees, waves and borders, translucent paper sky glowing with subsurface '
               'backlight, crisp cut edges, visible fibers. Limited palette of 3-4 paper colors plus one glowing accent. Ultra HD, 4K.',
         game='In-engine gameplay screenshot of a 3D papercraft world: layered cut paper with soft contact shadows, warm backlight through '
              'translucent paper, lace-cut ornaments, readable silhouettes and paths. Ultra HD, 4K.',
         neg='photorealistic, realistic PBR, glossy plastic, painted gradients, 2D flat illustration, sketch, anime, manga, pixel art, low '
             'quality, blurry, messy, deformed anatomy, extra limbs, text, letters, captions, watermark, signature, logo, gore, horror'),
]
SID = [s['id'] for s in STYLES]

# разделы (папки) по первой букве id сущности: (папка, название, хвост стиля)
SECT = {'H': ('01_Geroi', 'Герои', 'char'), 'N': ('02_Zhiteli', 'Жители', 'char'), 'E': ('03_Moroki', 'Мороки (враги)', 'char'),
        'M': ('04_Mini-bossy', 'Мини-боссы', 'char'), 'B': ('05_Bossy', 'Боссы', 'char'), 'L': ('06_Lokatsii', 'Локации', 'scene'),
        'I': ('07_Predmety', 'Предметы', 'prop'), 'G': ('08_Geympley', 'Геймплей', 'game')}

# ---------------------------------------------------------------- якоря героев (одинаковые во всех промтах — узнаваемость между стилями)
PROSHKA = ('Proshka, a slim, tall young fox cub inventor: ginger-orange fur with a cream chest and muzzle, dark brown fur on his paws like '
           'socks, long legs, a big bushy tail of three fluffy tufts with a white tip, large bright curious eyes, a green neckerchief, a '
           'brown leather belt with a small gold buckle and a wooden slingshot with a red band')
POTAP = ('Potap, a stout, round young brown bear cub standing upright on two legs, broad and strong but gentle: a white kosovorotka '
         'shirt with red embroidery, a red sash belt, linen leg wraps and woven bast shoes (lapti), huge soft paws, small round ears, '
         'kind sleepy eyes')
PELAGEYA = ('Pelageya, an egg-shaped little owl storyteller: soft lilac-violet plumage, a cream facial disc, huge round golden eyes, '
            'little ear tufts, wing-arms ending in finger-like feathers, a thin golden kokoshnik hoop with three red beads on her head')
YOSHA = ('Yosha, the youngest, a tiny round baby hedgehog: tufts of turquoise spines, a cream muzzle with rosy cheeks, tiny paws, a '
         'small wooden ladle (kovshik) hanging on a strap at his side')
SHORT = ('Proshka the slim ginger fox cub with a green neckerchief and slingshot, Potap the big brown bear cub in a white embroidered '
         'shirt and red sash, Pelageya the lilac egg-shaped owl with a golden kokoshnik hoop, and tiny Yosha the turquoise-spined '
         'hedgehog with a wooden ladle')
MOROK = ('It is a morok, not a living creature: woven from tangled dark-plum thread like a living ball of yarn, with loose thread ends, '
         'glowing ember-orange eyes and three small glowing embers floating above its head; mischievous and a bit spooky, never gory.')
HUD = 'Minimal HUD: small round hero portraits in two corners and a little golden chain-link counter, no readable text.'

# ---------------------------------------------------------------- общие акценты по стилям
NPC_ACC = {
    'S1': 'Carved and painted like a Bogorodskaya folk toy figure, chisel facets visible, painted folk ornament on clothing and fur.',
    'S2': 'A needle-felted wool puppet with glass-bead eyes, knitted and stitched clothing details, yarn and thread accessories.',
    'S3': 'Bold toon-shaded forms with ink outlines, clothing, fur and feathers covered with hand-painted folk patterns.',
    'S4': 'Jewel-tone lacquered materials with glowing gold-leaf hatching on clothing, fur and feathers, standing out against the dark.',
    'S5': 'Built from folded and cut colored card with lace-cut ornament details and brass-pin joints, thin parts glowing with backlight.',
}
ITEM_ACC = {
    'S1': 'Carved from linden wood, painted in tempera, gilded and ornamented like a folk souvenir.',
    'S2': 'Handmade from felt, yarn and embroidery thread with small real wood, brass and glass-bead details.',
    'S3': 'Toon-shaded with ink outlines and hand-painted ornamental patterns.',
    'S4': 'Jewel-tone lacquer and glowing gold leaf with fine engraving.',
    'S5': 'Folded and cut from colored card, gold foil and translucent tissue paper with lace-cut details.',
}
GAME_ACC = {
    'S1': 'Everything looks like a carved wooden toy world come alive.',
    'S2': 'Everything looks like a felted stop-motion set, threads and strings are real yarn.',
    'S3': 'Cel-shaded with ink outlines and flat colors, very readable shapes.',
    'S4': 'Dark lacquer surroundings, heroes and interactive objects outlined with glowing gold.',
    'S5': 'A layered papercraft stage, heroes as paper puppets with soft contact shadows.',
}
MOROK_ACC = {
    'S1': 'The morok is carved from dark stained wood wound with painted thread, ember eyes painted glowing orange.',
    'S2': 'The morok is felted from dark tangled yarn with loose fibers sticking out, ember eyes of orange glass beads.',
    'S3': 'The morok is a toon-shaded tangle with bold ink outlines and plum shading, ember eyes bright orange.',
    'S4': 'The morok is a dark plum tangle almost merging with the black lacquer, gold-hatched thread highlights, glowing ember eyes.',
    'S5': 'The morok is folded from dark paper with lace-like tangled cut-outs, ember eyes are holes glowing with orange backlight.',
}
WORLD_M = {  # подставка морока по миру
    'les': {'S1': 'Painted moss and pine cones on the base.', 'S2': 'A felted moss base.', 'S3': 'A patterned forest-floor base.',
            'S4': 'Tiny gold fireflies around.', 'S5': 'A lace-cut fir silhouette behind.'},
    'kitezh': {'S1': 'Carved seaweed and shells on the base.', 'S2': 'Glass-bead bubbles and knitted seaweed.', 'S3': 'Ornamental bubbles around.',
               'S4': 'Turquoise and gold water glints.', 'S5': 'Layered blue paper water behind.'},
    'nebo': {'S1': 'Carved lavender cloud puffs on the base.', 'S2': 'Cotton-wool clouds.', 'S3': 'Curling ornamental clouds around.',
             'S4': 'Lilac and gold sky glints.', 'S5': 'Layered lilac paper clouds behind.'},
    'ogon': {'S1': 'Painted glowing lava stripes on the base.', 'S2': 'Knitted orange lava and bead sparks.', 'S3': 'Ornamental flame curls around.',
             'S4': 'Vermilion and gold sparks.', 'S5': 'Orange tissue paper lava glowing behind.'},
    'buyan': {'S1': 'Carved sand and pebbles on the base.', 'S2': 'Embroidered sand.', 'S3': 'Patterned sand and pebbles.',
              'S4': 'Rose-gold dawn glints.', 'S5': 'Layered sand-colored paper behind.'},
    'koschei': {'S1': 'Scattered painted gold coins.', 'S2': 'Gold thread coins scattered.', 'S3': 'A dark patterned base.',
                'S4': 'Heaps of gold leaf coins.', 'S5': 'Gold foil coins scattered.'},
}
LOC_ACC = {  # материалы локации по миру
    'pine': {'S1': 'The pine and treehouse carved and painted like a giant folk toy, window frames with carved nalichniki, lanterns glowing.',
             'S2': 'The pine trunk of wrapped brown yarn and burlap, needles of green felt tufts, windows glowing through thin fabric, fireflies as tiny beads.',
             'S3': 'Ornamental bark patterns, stylized curling clouds and stars, ink outlines on every branch.',
             'S4': 'The night forest in deep greens on black lacquer, windows and lanterns in glowing gold.',
             'S5': 'The pine as layered lace-cut paper, warm light glowing through round window cut-outs.'},
    'luko': {'S1': 'A carved and painted wooden diorama, oak leaves carved, the sea as stylized carved waves.',
             'S2': 'A felted and embroidered landscape: the oak of brown yarn with felt leaves, the sea in satin-stitch embroidery, gold thread details.',
             'S3': 'A Bilibin-like ornamental oak and waves, patterned roofs and fences, ink outlines everywhere.',
             'S4': 'Jewel tones glowing on dark lacquer, the golden chain and the sunset in emissive gold leaf.',
             'S5': 'Layered cut-paper planes, the oak a lace-cut silhouette, the sunset glowing through translucent paper.'},
    'les': {'S1': 'Firs carved as stacked cone tiers, painted moss, stylized carved ripples on water.',
            'S2': 'Felted firs, moss of green felt, bog of brown knitted fabric with glass-bead bubbles, yarn strings between wooden pegs.',
            'S3': 'Tall patterned firs, ornamental roots and mist, ink outlines.',
            'S4': 'A deep blue-green forest on dark lacquer, fireflies and important objects in glowing gold.',
            'S5': 'Layers of lace-cut fir silhouettes in blue-green paper, mist of translucent tissue, fireflies as glowing pin holes.'},
    'kitezh': {'S1': 'Carved and painted underwater world, onion domes gilded, light rays as painted beams, seaweed as carved ribbons.',
               'S2': 'An embroidered underwater world: white felt walls, gold thread domes, knitted green seaweed, light rays of sheer organza.',
               'S3': 'Ornamental waves, patterned white-stone architecture, fish as decorative motifs, ink outlines.',
               'S4': 'Turquoise and gold glowing on dark lacquer: shimmering domes, gold-hatched light rays.',
               'S5': 'Layers of blue and turquoise translucent paper, architecture as lace-cut white paper with gold foil domes.'},
    'nebo': {'S1': 'Clouds carved as smooth wooden puffs painted lavender, golden painted details.',
             'S2': 'Clouds of cotton wool and white felt, light-bridges of gold ribbon, shadow-bridges of violet felt.',
             'S3': 'Curling ornamental clouds, patterned surfaces, ink outlines.',
             'S4': 'Lilac and violet lacquer, clouds outlined in gold, warm feather light as a gold radiance.',
             'S5': 'Layers of white and lilac paper clouds, gold foil bridges, warm light glowing through.'},
    'ogon': {'S1': 'Basalt carved as faceted columns, lava painted bright orange with carved flow lines.',
             'S2': 'Lava of knitted orange and red yarn with sequins, basalt of dark grey felt, sparks as tiny orange beads, smoke of grey cotton.',
             'S3': 'Lava as ornamental curls, sharp patterned peaks, ink outlines.',
             'S4': 'Fiery vermilion and gold on black lacquer, sparks as gold dots.',
             'S5': 'Layers of dark paper peaks, orange tissue paper lava glowing with strong backlight.'},
    'buyan': {'S1': 'Carved like a wooden toy set, painted sand, the sea in carved waves.',
              'S2': 'An embroidered island: oak of yarn, sea in blue satin stitch, sand of linen.',
              'S3': 'Ornamental waves and dunes, patterned oak, ink outlines.',
              'S4': 'Rose and gold dawn on dark lacquer, magic signs in glowing gold leaf.',
              'S5': 'Layered paper island, the oak a lace-cut silhouette, signs as glowing cut-out symbols.'},
    'koschei': {'S1': 'Dark stained carved wood, gilded heaps of gold, carved black chains.',
                'S2': 'Black and plum felt, gold thread and sequin treasure, crocheted black chains.',
                'S3': 'Gloomy patterned architecture with ink outlines, ornamental gold.',
                'S4': 'Almost pure black lacquer, only gold-leaf edges, candles and treasure glowing.',
                'S5': 'Black lace-cut paper silhouettes, gold foil treasure, eerie backlight.'},
    'epi': {'S1': 'A carved interior lit by one lantern, painted wooden walls.',
            'S2': 'A felted interior, the shadows cast on a linen sheet.',
            'S3': 'A toon-shaded interior with ink outlines, bold flat shadows on the wall.',
            'S4': 'A dark lacquer interior, the lantern and the shadow edges in gold.',
            'S5': 'A paper interior, the shadows cast on a glowing paper screen.'},
}

# ---------------------------------------------------------------- сущности
E = []


def ent(i, slug, ru, about, core, world=None, acc=None):
    assert i[0] in SECT and not any(e['id'] == i for e in E), i
    if acc: assert set(acc) == set(SID), i
    E.append(dict(id=i, slug=slug, ru=ru, about=about, core=core, world=world, acc=acc))


# --- 01 Герои
ent('H01', 'proshka', 'Прошка', 'лисёнок-изобретатель, рогатка',
    'Full-body 3D character render of ' + PROSHKA + '. He aims his slingshot in a dynamic three-quarter pose, one eye squinted, a glowing '
    'acorn pellet ready to fly. The whole figure in frame, centered, on a small round base of mossy forest floor.',
    acc={'S1': 'His body carved in sharp triangular facets, the tail three chunky carved tufts, a painted Gorodets flower on the belt buckle, the slingshot a whittled twig.',
         'S2': 'Felted from ginger and cream wool with a fluffy roving tail, a knitted green neckerchief, the slingshot a real little twig with red yarn.',
         'S3': 'Fur painted with rhythmic ink-stroke patterns, the green neckerchief patterned with tiny folk flowers, the acorn pellet glowing gold.',
         'S4': 'Fur with fine glowing gold-leaf hatching, the green neckerchief edged with gold scrolls, a golden glow on the acorn pellet.',
         'S5': 'Folded from orange and cream card, jointed with brass pins at shoulders and knees, the tail a lace-like cut fringe, the acorn pellet backlit and glowing.'})
ent('H02', 'potap', 'Потап', 'медвежонок-силач, подкидка',
    'Full-body 3D character render of ' + POTAP + '. He crouches and lifts his huge paws, about to toss a friend high into the air (his '
    'signature toss move), cheerful and confident. The whole figure in frame, centered, on a small round base of meadow grass.',
    acc={'S1': 'Carved round and blocky like a nesting-doll figure, the shirt painted with red Gorodets patterns, the bast shoes carved as a criss-cross relief.',
         'S2': 'Felted from chocolate-brown wool, a real cross-stitched linen shirt, a woven red sash with tassels, tiny woven bast shoes.',
         'S3': 'Bold round silhouette, ornate red embroidery patterns on the white shirt, fur with dense curled ink-stroke patterns.',
         'S4': 'Brown fur glowing with gold hatching, the white shirt covered in fine vermilion and gold embroidery.',
         'S5': 'Built from rounded brown card shapes with brass-pin joints, the shirt a white paper cut with red lace embroidery, the sash a strip of red tissue paper.'})
ent('H03', 'pelageya', 'Пелагея', 'совушка-сказительница, Совиный взор',
    'Full-body 3D character render of ' + PELAGEYA + ', a small handmade notebook of fairy tales under her wing. She glides with wings '
    'spread wide, her golden eyes glowing with the Owl Sight that reveals hidden things. The whole figure in frame, centered, hovering '
    'above a small round base of evening grass.',
    acc={'S1': 'Carved as a smooth egg-shaped wooden figure, feathers painted as scale-like dabs, the kokoshnik a gilded carved hoop with red bead dots.',
         'S2': 'Felted lilac wool with stitched feather rows, big embroidered golden eyes, a tiny bead kokoshnik and a real miniature paper notebook.',
         'S3': 'Feathers as a decorative scale pattern in ink and violet, eyes ringed in gold, an ornamental kokoshnik.',
         'S4': 'Lilac plumage with glowing gold-leaf feather hatching, golden eyes casting a soft beam of light into the dark.',
         'S5': 'Folded from layered lilac and violet paper with lace-like feather cut-outs, the eyes thin golden paper glowing with backlight.'})
ent('H04', 'yosha', 'Йоша', 'ёжик-водонос, ковшик с живой водой',
    'Full-body 3D character render of ' + YOSHA + '. He pours a sparkling stream of glowing turquoise living water from his ladle onto a '
    'tiny sprouting flower, proud and a little shy. The whole figure in frame, centered, on a small round base of riverside pebbles.',
    acc={'S1': 'Carved as a round wooden ball figure with spines of carved turquoise wedges, the ladle a tiny painted kovsh with a horse-head handle.',
         'S2': 'A felted ball of turquoise wool tufts as spines, pink felt cheeks, a carved wooden ladle on a braided cord, water drops as glass beads.',
         'S3': 'Spines as a rhythmic pattern of turquoise ink-outlined spikes, the living water as curling ornamental toon streams.',
         'S4': 'Turquoise spines tipped with glowing gold, the living water a glowing turquoise ribbon with gold sparkles.',
         'S5': 'Spines of many small folded paper triangles in turquoise shades, the water a translucent blue tissue paper stream glowing in backlight.'})
ent('H05', 'patrul', 'Лесной патруль', 'все четверо у штаба-сосны',
    '3D group render of the Forest Patrol, four animal friends standing together in front of their headquarters, a huge old pine tree '
    'with a little door, round windows and lanterns in its trunk: ' + SHORT + '. Heroic yet cozy group pose, strong contrast of sizes '
    'and colors (slim ginger and stout brown, round lilac and tiny turquoise), all four full-body and clearly readable.',
    acc={'S1': 'Everything carved and painted like a set of folk wooden toys displayed together, the pine headquarters with carved ornamented window frames.',
         'S2': 'All four as felted wool puppets on a felted moss mound, the pine trunk of wrapped yarn and burlap, lanterns of glowing beads.',
         'S3': 'Toon-shaded like a living book frontispiece, the pine with ornamental bark patterns, pine cones and acorns as decorative motifs.',
         'S4': 'The four friends glowing in jewel tones against the dark, the pine with gold-hatched needles, gold scrolls around.',
         'S5': 'Staged like a paper puppet theater: the pine a lace-cut paper tree, warm light glowing through its round windows, the friends as jointed paper puppets.'})

# --- 02 Жители: (имя файла, рус., о ком, кто)
N = [
    ('kot_ucheny', 'Кот Учёный', 'хранитель дуба и Златой цепи, сказочник',
     'the Learned Cat (Kot Uchyony), keeper of the oak and the Golden Chain: a tall wise grey tabby cat walking upright in a long scholar\'s '
     'kaftan with round spectacles, holding an open scroll, a thin golden chain over his shoulder, a storyteller\'s gesture'),
    ('zvenyshko', 'Звенышко', 'живое звено Златой цепи, проводник',
     'Zvenyshko, a living link of the Golden Chain and the heroes\' guide: a single golden chain link the size of a fist, floating in the '
     'air, with a warm spark-heart glowing inside it, trembling and sending soft ripples of golden light (no face, personality through '
     'motion), a trail of sparkles behind it'),
    ('kuzma', 'Кузьма', 'кузнец, куёт звенья в цепь',
     'Kuzma the blacksmith: a broad kind old man with a big grey beard tucked into a leather apron, rolled-up sleeves, a heavy hammer on '
     'his shoulder, standing by an anvil with a glowing chain link, a wise teaching look'),
    ('demyan', 'Демьян', 'второй кузнец, мастер клещей',
     'Demyan the second blacksmith: a lean, lanky younger smith with a soot-smudged face, a leather cap and apron, holding long blacksmith '
     'tongs with a red-hot piece, a cheerful grin'),
    ('veksha', 'Векша', 'белка-торговка, лавка у подиума',
     'Veksha the squirrel merchant: a lively red squirrel in a bright headscarf and apron, holding a wooden tray of golden hazelnuts and a '
     'tiny embroidered hat for sale, a bushy tail curled up'),
    ('dedka', 'Дедка', 'огородник, тянет репку',
     'Dedka the old gardener: a small bent old man with a white beard in a straw hat and patched linen shirt, pulling a giant golden '
     'turnip out of a garden bed with both hands, a watering can nearby'),
    ('kurochka_ryaba', 'Курочка Ряба', 'курочка с цыплятами, золотое яичко',
     'Ryaba the speckled hen: a plump speckled black-and-white hen with a red comb, three fluffy yellow chicks around her, a shining golden '
     'egg in a straw nest beside her'),
    ('tishka', 'Тишка', 'бельчонок-малыш из штаба',
     'Tishka, the baby squirrel from the headquarters: a tiny ginger squirrel kit with a cream belly, a huge fluffy tail and big sleepy '
     'eyes, hugging a small honey pot, wearing a little nightcap'),
    ('rusalka', 'Русалка', 'на ветле у моря, загадывает загадки',
     'a gentle mermaid (Rusalka) sitting on a low willow branch above the sea, combing her long green hair with a golden comb, a fish tail '
     'with shimmering scales hanging down, a kind mysterious smile'),
    ('sadko', 'Садко', 'гусляр, дарит гусли',
     'Sadko the gusli player: a young musician-merchant with curly hair in a blue kaftan and red boots, playing a wing-shaped gusli harp, '
     'musical notes floating in the air'),
    ('baba_yaga', 'Баба Яга', 'хозяйка избушки, летает в ступе',
     'Baba Yaga: a hunched, long-nosed but funny old witch with a bright patterned headscarf and an apron, standing in her wooden mortar '
     'with a pestle in one hand and a broom in the other, a mischievous grin'),
    ('izbushka', 'Избушка на курьих ножках', 'дом Яги, бегает и поворачивается',
     'the Hut on Chicken Legs (Izbushka): a small crooked log hut with a mossy roof, carved window frames and a smoking chimney, standing '
     'on two big scaly chicken legs, mid-turn as if dancing, a lantern swinging on the porch'),
    ('kikimora', 'Кикимора', 'хозяйка прялки на болоте',
     'Kikimora the swamp spinner: a thin, long-fingered swamp woman with tangled moss-green hair full of reeds, a patched grey dress, '
     'sitting at an old spinning wheel spinning dark tow into thread, sly but not evil'),
    ('zhuravl_tsaplya', 'Журавль и Цапля', 'сватаются через гать из струн',
     'the Crane and the Heron from the folk tale: two tall elegant wading birds standing on bog tussocks, the grey Crane in a little cap '
     'bowing with a bouquet, the white Heron turning away proudly'),
    ('besyonok', 'Бесёнок', 'из сказки о попе и работнике Балде',
     'a little imp (Besyonok) from Pushkin\'s tale of Balda: a small fluffy black imp with tiny horns, a pig snout, a long tufted tail and '
     'a rope in his paws, playful and silly, not scary'),
    ('kolobok', 'Колобок', 'убегает по тропе гусельного уровня',
     'Kolobok: a round golden-brown bread bun with a cheeky face, rosy cheeks and a crust texture, rolling along a forest path, singing '
     'with his mouth open'),
    ('morskoy_tsar', 'Морской царь', 'пляска в палатах',
     'the Sea King: a jolly fat bearded underwater tsar with a coral crown, a seaweed-green robe with pearls and a trident, dancing with '
     'one leg raised, bubbles rising'),
    ('ryba_kit', 'Рыба-кит', 'на спине деревня, внутри уровень',
     'the Fish-Whale (Ryba-Kit) from Yershov\'s tale: an enormous friendly whale lying across the sea, a whole wooden village with huts, a '
     'little church and a windmill on its back, a small oak grove in its whiskers, smoke from chimneys, tiny boats around'),
    ('zolotaya_rybka', 'Золотая рыбка', 'рыбий суд и четыре кольца',
     'the Golden Fish: a small shining golden fish with flowing veil fins and a tiny crown, floating in turquoise water inside a ring of '
     'light, wise kind eyes'),
    ('yorsh', 'Ёрш', 'ведёт к Рыбе-киту',
     'Yorsh the ruffe: a small spiky striped fish with bristling dorsal fins, a brave bossy face and a tiny sailor cap, pointing the way '
     'with a fin'),
    ('zhar_ptitsa', 'Жар-птица', 'отдаёт перья, молодеет от яблока',
     'the Firebird (Zhar-ptitsa): a magnificent bird with flame-like golden-orange feathers, a crest of glowing plumes and a long glowing '
     'peacock-like tail, perched on a branch of an apple tree with golden apples, light radiating from her feathers'),
    ('ded_sadovnik', 'Дед-Садовник', 'хранитель сада молодильных яблок',
     'Ded-Sadovnik, keeper of the orchard of rejuvenating apples: a tall thin old man with a very long white beard, a straw hat and a blue '
     'smock, holding a basket of glowing apples and big garden shears, a big key on his belt'),
    ('pushok', 'Пушок', 'ягнёнок, пружинка после живой воды',
     'Pushok the lamb: a fluffy cloud-white lamb with a round woolly body like a cloud, tiny black hooves and a little bell on a ribbon, '
     'bouncing happily on a cloud'),
    ('veter_vetrilo', 'Ветер-Ветрило', 'дует со скалы и с облаков',
     'Veter-Vetrilo, the Wind: a big puffy-cheeked bearded cloud spirit with swirling hair, blowing a strong gust of wind with leaves and '
     'little kites flying in it'),
    ('sirin_alkonost', 'Сирин и Алконост', 'птицы гусельного уровня',
     'Sirin and Alkonost: two mythical birds with gentle maiden faces and small crowns sitting on a branch side by side, Sirin with dark '
     'plum plumage, Alkonost bright and sunny with golden plumage, singing a duet'),
    ('gusi_lebedi', 'Гуси-лебеди', 'уносят героев, сторожат мостки',
     'the Geese-Swans (Gusi-lebedi): a pair of big white geese with dark wingtips and sharp orange beaks, one swooping with wings spread, '
     'one standing guard and looking around suspiciously'),
    ('tsarevna_lebed', 'Царевна-Лебедь', 'по «Сказке о царе Салтане»',
     'the Swan Princess from Pushkin\'s Tale of Tsar Saltan: a graceful white swan gliding on water with a small golden crown, a shining '
     'star on her forehead and a crescent moon glow under her wing'),
    ('golova', 'Голова', 'по «Руслану и Людмиле», дует в ущелье',
     'the Giant Head from Pushkin\'s Ruslan and Lyudmila: a huge sleepy bogatyr\'s head in a pointed iron helmet with a long mustache, '
     'half-buried in the rocks of a gorge, blowing a gust of wind, one eye half open'),
    ('zayats', 'Заяц', 'звено «заяц в сундуке»',
     'the Hare from the tale of Koschei\'s death: a quick lanky grey hare with long ears and huge hind legs, leaping out of an iron-bound '
     'chest, a tricky look'),
    ('utka', 'Утка', 'звено «утка в зайце», полёт',
     'the Duck from the tale of Koschei\'s death: a plump wild duck with a green head and brown wings, flying away fast with a glowing egg '
     'held under its belly'),
    ('ilya_muromets', 'Илья Муромец', 'богатырь Заставы',
     'Ilya Muromets the bogatyr: a huge calm bearded warrior in chainmail and a pointed helmet, a heavy mace and a big round red shield, '
     'standing firm like a mountain, friendly eyes'),
    ('dobrynya', 'Добрыня Никитич', 'богатырь Заставы',
     'Dobrynya Nikitich the bogatyr: a noble warrior in chainmail with a pointed helmet, a long sword and a red cloak, a gusli harp on his '
     'back, a confident smile'),
    ('alyosha', 'Алёша Попович', 'богатырь Заставы',
     'Alyosha Popovich the bogatyr: a young cheerful archer in light chainmail and a pointed helmet, a bow and a quiver of arrows, a sly '
     'grin and curly hair'),
    ('gorynych_drug', 'Горыныч-друг', 'ездовой змей после 4-Б',
     'Zmey Gorynych as the heroes\' friend and flying mount: the three-headed green-and-bronze dragon flying with wings spread, a carved '
     'saddle with reins on his back, the four little animal heroes riding him happily, all three heads smiling'),
    ('selchane', 'Сельчане', 'жители деревень на ките и у Водяного',
     'a group of fairy-tale villagers: a bearded peasant in a kosovorotka and a cap, a woman in a sarafan and headscarf with a basket, a '
     'girl with a long braid, an old fisherman with a net, a boy with a kite, all side by side'),
]
for k, (slug, ru, about, who) in enumerate(N, 1):
    ent('N%02d' % k, slug, ru, about, 'Full-body 3D character render of ' + who + '. Three-quarter view, the whole figure in frame, '
        'centered, on a small round base.')

# --- 03 Мороки, каждый отдельно: (имя файла, рус., где, мир, кто)
MOROKI = [
    ('kolyuchiy_klubok', 'Колючий клубок', 'Пролог: первый морок игры', 'les', 'the Prickly Ball, a small round spiky tangle rolling and hissing'),
    ('kikimorka', 'Кикиморка с ложкой', '1-1, 1-2: жёлтый сигнал', 'les', 'Kikimorka with a Spoon, a little swamp creature of tangled thread waving a big wooden spoon'),
    ('pen_vorchun', 'Пень-ворчун', '1-2: скорлупа из коры', 'les', 'the Grumbling Stump, a big angry tree stump with a cracked bark shell and root legs'),
    ('leshachonok', 'Лешачонок', '1-4: быстрый, шапка из мха', 'les', 'Leshachonok, a quick little forest imp in a cap of moss with twig fingers'),
    ('tat_pautinnik', 'Тать-Паутинник', '1-2: грызёт нить ⭐', 'les', 'Tat-Pautinnik, a spider-like thread thief gnawing on a glowing yarn string'),
    ('ruka_koryaga', 'Рука-коряга', '1-Б: рука Лешего', 'les', 'the Snag Hand, a huge gnarled root-hand of the Leshy rising from the ground with spread twig fingers'),
    ('chudo_bolotnoe', 'Чудо болотное', '1-2: пузыри и тёмный круг в трясине', 'les', 'the Bog Wonder, a dark circle of bubbles in a swamp with a big tangled thread back surfacing'),
    ('shchuka_morok', 'Щука-морок', 'Китеж: синие пузыри', 'kitezh', 'the Pike-morok, a long pike-shaped tangle blowing big blue bubbles'),
    ('rak_shchipach', 'Рак-щипач', 'Китеж: красная хватка', 'kitezh', 'Rak-Shchipach, a pinching crayfish of thread raising a big red claw'),
    ('tinnik', 'Тинник', '2-4: медленный, у горла кита', 'kitezh', 'Tinnik, a slow hulking creature of tangled waterweed dragging its arms'),
    ('puzyrnik', 'Пузырник', '2-4, 2-5: надувается', 'kitezh', 'Puzyrnik, a blob puffing itself up like a balloon, about to burst'),
    ('tyagun', 'Тягун', '2-5: прячется в иле ⭐', 'kitezh', 'Tyagun, a long eel-like dragger half-buried in silt, reaching out'),
    ('chayka', 'Чайка', '2-2: пикирует с неба', 'kitezh', 'the Gull, a diving seagull of tangled grey-white thread with spread wings'),
    ('prilipala', 'Прилипала', '2-2: цепляется к герою', 'kitezh', 'Prilipala, a small sucker fish with a big round sucker mouth, ready to cling'),
    ('zhemchuzhnitsa', 'Жемчужница', 'Китеж: стреляет жемчугом', 'kitezh', 'Zhemchuzhnitsa, a stationary pearl oyster opening its shell and spitting a glowing pearl'),
    ('ten', 'Тень', 'Небо: уязвима в свете пера', 'nebo', 'the Shadow, a flat paper-thin shadow creature standing up from the ground, with only eyes glowing'),
    ('grozovaya_tuchka', 'Грозовая тучка', 'Небо: молния-капля', 'nebo', 'the Little Storm Cloud, a grumpy small cloud dropping a lightning drop'),
    ('dvusvetny_motylyok', 'Двусветный мотылёк', '3-1: раскрыт в двух светах ⭐', 'nebo', 'the Two-Light Moth, a large moth with two glowing eye-spots on its wings'),
    ('vorona_morok', 'Ворона-морок', '3-4: хватает фонарь', 'nebo', 'the Crow-morok, a crow snatching a lantern, a black key hanging on its neck'),
    ('chugunny_bolvan', 'Чугунный болван', '4-1, 4-4: раскалённые латы', 'ogon', 'the Cast-Iron Dummy, a heavy figure in red-hot glowing armor with a breastplate'),
    ('zhar_yashcherka', 'Жар-ящерка', '4-2: плюёт огоньком', 'ogon', 'the Heat Lizard, a lizard clinging to a wooden pile, spitting a little flame'),
    ('pechnik', 'Печник', '4-4: ожившая печь ⭐', 'ogon', 'the Stove-Keeper (Pechnik), a living clay stove on stubby legs with a door for a mouth glowing with coals'),
    ('zmeyonysh', 'Змеёныш', '4-4: сильный в лаве', 'ogon', 'the Little Serpent, a young lava snake rising from a lava pool'),
    ('pugalo_strazh', 'Пугало-страж', 'Буян: машет соломой', 'buyan', 'the Scarecrow Guard, a straw scarecrow in a ragged coat waving its sleeves'),
    ('khameley', 'Хамелей', '5-1: перенимает знаки ⭐', 'buyan', 'Khameley, a chameleon-like morok shifting colors with four magic signs flickering on its back'),
    ('ten_dvoynik', 'Тень-двойник', '5-Б1: перенимает защиту', 'buyan', 'the Shadow Double, a dark thread silhouette copying a little fox cub hero'),
    ('korshun', 'Коршун', '5-1: кружит над Лебедью', 'buyan', 'the Kite, a bird of prey of dark thread circling with hooked claws'),
    ('tsep_koshcheya', 'Цепь Кощея', 'финал: растёт из земли', 'koschei', 'the Chain of Koschei, a black chain growing out of the ground like a serpent'),
    ('chyornaya_svecha', 'Чёрная свеча', 'финал: гасит свет', 'koschei', 'the Black Candle, a living black candle dripping dark wax with a cold blue flame'),
    ('klyuch', 'Ключ', 'финал: один удар', 'koschei', 'the Key, a small hopping living iron key'),
    ('voron_koshcheya', 'Ворон Кощея', '1-1, финал: пикирует', 'koschei', 'Koschei\'s Raven, a diving black raven with ragged wings'),
    ('kostyanoy_strazh', 'Костяной страж', 'финал: обычный бой', 'koschei', 'the Bone Guard, a lanky cartoonish skeleton-like guard with a spear and a rusty helmet, funny rather than scary'),
]
for k, (slug, ru, about, world, who) in enumerate(MOROKI, 1):
    ent('E%02d' % k, slug, ru, about, 'Full-body 3D enemy render of ' + who + '. ' + MOROK + ' Three-quarter view, the whole figure in '
        'frame, centered, on a small round base.', world=world)

# --- 04 Мини-боссы
MB = [
    ('auka', 'Аука', '1-4: лесной дух-перекличка',
     'Auka, a mischievous forest echo spirit: a round fluffy creature of leaves, moss and mist with a hollow open mouth, peeking out of a '
     'tree hollow, glowing golden echo rings spreading around it, later a friend',
     {'S1': 'Carved as a round wooden face in a tree hollow, painted leaves, echo rings as carved golden hoops.',
      'S2': 'Felted from leaf-green wool with a mist of cotton wool, echo rings of gold thread.',
      'S3': 'Toon-shaded with ornamental leaf patterns, echo rings as decorative ink circles.',
      'S4': 'Deep green on dark lacquer, echo rings in glowing gold.',
      'S5': 'A folded leafy paper body, echo rings as concentric cut paper circles glowing in backlight.'}),
    ('veretennik', 'Веретенник', '1-5: веретено в чёрной кудели',
     'Veretennik, the living spindle of the swamp witch: a tall wooden spindle wrapped in a cocoon of black tow, spinning, thread tentacles '
     'lashing out, about to split into three spindles',
     {'S1': 'A turned and painted wooden spindle, the tow carved as dark shaggy wood.',
      'S2': 'A real wooden spindle wrapped in black raw wool tow, yarn tentacles.',
      'S3': 'Toon-shaded with decorative patterns on the tow, bold ink lines on the threads.',
      'S4': 'Dark tow on black lacquer, the spindle and threads in glowing gold.',
      'S5': 'A black paper cocoon with lace-cut fringe, a golden paper spindle tip glowing.'}),
    ('rak_otshelnik', 'Рак-Отшельник', '2-1: в раковине',
     'Rak-Otshelnik, a giant hermit crab hiding in a huge ornate spiral sea shell, big pincers raised, eyes on stalks peeking out',
     {'S1': 'The shell carved with folk ornament, the crab painted red.',
      'S2': 'A crab of red felt in a crocheted spiral shell.',
      'S3': 'Ornamental spiral patterns on the shell, ink outlines.',
      'S4': 'The shell in mother-of-pearl jewel tones with gold hatching.',
      'S5': 'A folded paper spiral shell with lace-cut patterns, red paper claws.'}),
    ('koshcheev_voron', 'Кощеев Ворон', '3-1: ослепить солнышками',
     'Koshcheev Voron, a huge black raven of Koschei with glowing eyes and ragged wings, perched on a withered apple tree, carrying a '
     'stolen golden apple',
     {'S1': 'Carved black with painted glowing eyes, feathers carved as plates.',
      'S2': 'Black wool with feather stitching, glass-bead eyes.',
      'S3': 'Ornamental feather patterns, a bold ink silhouette.',
      'S4': 'Nearly merging with the black lacquer, gold-hatched feathers and the golden apple shining.',
      'S5': 'A black lace-cut paper raven, eyes as glowing holes.'}),
    ('gromovoy_baran', 'Громовой Баран', '3-2: таран в стожки',
     'Gromovoy Baran, the thunder ram: a big ram with storm-cloud fleece and curled golden horns crackling with lightning, charging with '
     'head down',
     {'S1': 'Fleece carved as cloud curls, gilded horns, lightning as carved zigzags.',
      'S2': 'Grey cloud-like wool fleece, golden yarn horns, lightning of gold thread.',
      'S3': 'Ornamental fleece curls, lightning as zigzag ink ornament.',
      'S4': 'Storm-grey fleece on dark lacquer, horns and lightning in glowing gold.',
      'S5': 'Fleece of curled grey paper, lightning as glowing cut slits.'}),
    ('likho', 'Лихо Одноглазое', '5-1: его не бьют, а усыпляют',
     'Likho Odnoglazoe, a huge shaggy one-eyed giant, sleepy and grumpy, sitting by a chain of a magic chest, one enormous eye half closed, '
     'yawning',
     {'S1': 'Carved shaggy with deep chisel cuts, one big painted eye.',
      'S2': 'A huge shaggy felt creature with one big glass eye.',
      'S3': 'Fur as dense ink-hatched patterns, a bold single eye.',
      'S4': 'Dark shaggy fur with gold hatching, the single eye glowing.',
      'S5': 'A big shaggy paper puppet with fringed fur and one glowing eye hole.'}),
]
for k, (slug, ru, about, who, acc) in enumerate(MB, 1):
    ent('M%02d' % k, slug, ru, about, 'Full-body 3D mini-boss render of ' + who + '. Three-quarter view, the whole figure in frame, '
        'centered, on a round base, one tiny animal hero beside it for scale.', acc=acc)

# --- 05 Боссы
ent('B01', 'leshy', 'Леший-Путаник', 'босс мира 1, Дремучий лес',
    '3D boss render: Leshy the Tangler, the forest spirit of the Dark Forest — a giant as tall as a fir tree, a body of gnarled bark and '
    'moss, a long beard of moss, antler-like branches with leaves, a bird\'s nest with chicks on his head, glowing amber eyes, enormous '
    'snag-like root hands spreading like spiders from his shoulders; tricky and mischievous rather than evil. He looms over a dark fir '
    'clearing with a big stump and fireflies; two tiny animal heroes at his feet for scale.',
    acc={'S1': 'The whole giant carved from gnarled wood with deep chisel cuts, moss painted as green flocking, his snag-hands carved roots.',
         'S2': 'Felted from bark-brown and moss-green wool with real twigs and lichen, the nest of woven yarn with tiny felt chicks.',
         'S3': 'Bark as dense ornamental ink patterns, the beard in flowing moss curls, firs as tall patterned cones.',
         'S4': 'Bark in deep green and ochre with glowing gold hatching against the dark, eyes glowing amber, fireflies as gold dots.',
         'S5': 'Built from layered dark-green and brown paper, the beard and antlers lace-cut, his eyes and the fireflies glowing through holes.'})
ent('B02', 'vodyanoy', 'Водяной', 'босс мира 2, Подводный Китеж',
    '3D boss render: Grandfather Vodyanoy, the water spirit — a huge fat old man with greenish wet skin, a long beard of waterweed, a crown '
    'of river reeds and shells, webbed hands, riding a giant whiskered catfish. Behind him rises a towering wave with golden sparks and '
    'musical notes inside, a stormy lilac evening sky, water horses leaping from the foam, the golden domes of sunken Kitezh beneath the '
    'water; two tiny animal heroes on a lily pad for scale.',
    acc={'S1': 'Carved and painted like a giant folk toy, the wave carved as stylized scrolls, the catfish painted with patterns.',
         'S2': 'Felted from green-grey wool with a yarn waterweed beard, the wave knitted in blue with golden thread sparkles, the catfish of felt.',
         'S3': 'The wave as a great curling ornamental crest, the beard flowing in Art Nouveau toon lines.',
         'S4': 'The great wave with glowing gold-hatched crests and golden notes, the church domes gleaming gold against the dark storm.',
         'S5': 'Layered blue paper waves with lace-cut foam, Vodyanoy as a big paper puppet, lightning as cut gaps glowing in backlight.'})
ent('B03', 'solovey', 'Соловей-Разбойник', 'босс мира 3, Небесное царство',
    '3D boss render: Solovei the Robber (Nightingale the Robber) — a huge feathered bird-bandit with a nightingale\'s body and beak, a bushy '
    'mustache, a red sash and a crooked knife, puffing his cheeks and whistling a visible white shock wave. He perches on a giant nest '
    'built atop nine oak trees above the clouds, wind serpents swirling around; two tiny animal heroes hiding behind a stone for scale.',
    acc={'S1': 'Carved like a giant painted folk clay-whistle bird toy, the shock wave carved as white scrolls.',
         'S2': 'Felted feathers in brown and rust wool, a yarn mustache, the shock wave of cotton-wool swirls, the nest of real twigs.',
         'S3': 'The oak tops and the nest as ornamental patterns, the whistle as swirling toon lines.',
         'S4': 'Plumage hatched with glowing gold, the whistle as gold spirals, wind serpents in emerald and gold.',
         'S5': 'A paper puppet bird with lace-cut feathers, the whistle as concentric white paper rings, oaks as layered lace silhouettes.'})
ent('B04', 'gorynych', 'Змей Горыныч', 'босс мира 4, потом друг и ездовой змей',
    '3D boss render: Zmey Gorynych, the three-headed dragon of the fiery Smorodina river — a big green-and-bronze dragon with three '
    'distinct heads: the left one sleepy and yawning, the right one hungry and drooling, the middle one breathing fire; small wings, a '
    'scaly belly, a long tail. Glowing lava cracks, basalt columns and the carved Kalinov bridge behind him. Fearsome with a hint of '
    'comedy: he will later become the heroes\' friend and flying mount. Two tiny animal heroes in front for scale.',
    acc={'S1': 'Carved and painted like a giant folk toy dragon with Filimonovo clay-toy stripes, lava painted as glowing orange stripes.',
         'S2': 'Felted from green and bronze wool with sequin scales, the fire of orange and yellow yarn and silk, the lava of knitted orange fabric.',
         'S3': 'Scales as a rhythmic ornamental pattern, flames as stylized curling toon tongues, patterned basalt columns.',
         'S4': 'Green scales hatched with glowing gold, fire in vermilion and gold, sparks as gold dots against the dark.',
         'S5': 'A paper dragon puppet with necks jointed on brass pins, lace-cut scales, fire and lava of orange tissue paper glowing in backlight.'})
ent('B05', 'koschei', 'Кощей Бессмертный', 'главный антагонист, финал',
    '3D final boss render: Koschei the Deathless — a very tall, skeletally thin dark sorcerer-tsar with bone-pale skin, a long sharp face, '
    'hollow glowing eyes, a tall spiked golden crown, a dark purple-black robe with gold trim, long bony fingers. Black chains rise from '
    'the ground around him like snakes, black candles burn, heaps of gold glitter; behind him the great oak with the golden chain. '
    'Menacing and theatrical, yet suitable for children. Two tiny animal heroes facing him for scale.',
    acc={'S1': 'Carved from dark stained wood, very angular and thin, the crown gilded, the chains carved black, the gold heaps painted.',
         'S2': 'Felted from black and plum wool on a thin wire armature, a crown of gold thread and beads, black chains of crocheted yarn.',
         'S3': 'A gaunt Bilibin-like figure in an ornate dark robe, patterned gold, a sharp ink silhouette.',
         'S4': 'The perfect lacquer villain: the black robe merging with the darkness, only gold-hatched edges, the crown and the eyes glowing.',
         'S5': 'A tall black paper puppet with a lace-cut robe, glowing eye holes and a gold foil crown, casting a huge shadow on the backlit screen.'})

# --- 06 Локации: (имя файла, рус., о чём, мир, что в кадре)
LOC = [
    ('p_shtab_sosna', 'Пролог · Штаб-сосна', 'дом «Лесного патруля», вечер, погоня за Звенышком по веткам', 'pine',
     'the Forest Patrol headquarters: a giant ancient pine tree with a cozy treehouse in its trunk and branches — round windows, a wooden '
     'door, rope ladders, lanterns, a lookout platform, branch walkways with gaps to jump; evening twilight, a glowing golden chain link '
     'flying between the branches, fireflies'),
    ('luko_obshchiy', 'Лукоморье · общий вид', 'хаб: дуб со Златой цепью у моря', 'luko',
     'Lukomorye, the hub: a seaside meadow at warm sunset with a great green oak and a golden chain wound around its trunk, a forge with '
     'smoke, a market stall, a vegetable garden, a wooden pier with boats, a hut on chicken legs at the edge of the forest, a small hill '
     'with a wooden outpost'),
    ('luko_kuznya', 'Лукоморье · кузня Кузьмы', 'здесь звенья становятся цепью', 'luko',
     'the blacksmith forge of Lukomorye: an open log forge with a glowing hearth, bellows, an anvil with a golden chain link, tools on the '
     'walls, a water trough, sparks in the air'),
    ('luko_lavka', 'Лукоморье · лавка Векши и примерочная', 'подиум, прилавок, шапки и наряды', 'luko',
     'the squirrel\'s shop in Lukomorye: a carved wooden market stall with shelves of tiny hats, scarves and outfits, a round podium for '
     'trying clothes on, a mirror, garlands and a sign with a nut symbol'),
    ('luko_ogorod', 'Лукоморье · огород Дедки и курятник', 'четыре грядки, репка, Ряба', 'luko',
     'the vegetable garden of Lukomorye: four garden beds with carrots, peas, sunflowers and a giant turnip, a rain barrel with a watering '
     'can, a scarecrow, a little henhouse with a wonder pea vine climbing to the sky'),
    ('luko_prichal', 'Лукоморье · причал Садко и ветла русалки', 'рыбалка и загадки', 'luko',
     'the wooden pier of Lukomorye reaching into the sea, fishing rods and a board of caught fish, a big willow tree on the shore with a '
     'branch over the water, boats and gentle waves'),
    ('luko_izbushka', 'Лукоморье · избушка-кухня Яги', 'избушка поворачивается, кухня внутри', 'luko',
     'Baba Yaga\'s kitchen inside the hut on chicken legs: a big clay stove, hanging bunches of herbs and mushrooms, pots and jars, a '
     'cauldron, a mortar and broom in the corner, warm window light'),
    ('luko_vyshka', 'Лукоморье · вышка-дозор и скала Ветрила', 'подзорная труба и воздушный змей', 'luko',
     'a wooden watchtower with a spyglass on the coast of Lukomorye and nearby a stepped rock with a giant stone face of the Wind, a kite '
     'flying from its top'),
    ('zastava', 'Застава трёх богатырей', 'три испытания на время', 'luko',
     'the bogatyrs\' frontier outpost on a hill: log towers with tent roofs, a palisade, carved gates with lanterns and pennants, a stone '
     'path up the slope, a training yard with targets'),
    ('l1_1_izbushka', '1-1 · Избушка, повернись', 'двор Яги, пеньки, клубок', 'les',
     'level 1-1: Baba Yaga\'s yard in a forest clearing with the hut on chicken legs, stumps to jump on together, a messy yard to clean, '
     'a wattle fence and a path into the forest'),
    ('l1_2_boloto', '1-2 · Кикиморино болото', 'струны на колышках через трясину', 'les',
     'level 1-2: a misty swamp with dark water, glowing yarn strings stretched between wooden pegs as bridges over the bog, hummocks, '
     'reeds, two small huts on stilts and a high branch to slide down a string'),
    ('l1_3_kolobok', '1-3 · Колобок', 'гусельный раннер по тропе', 'les',
     'level 1-3: a rhythm-runner forest path with three lanes running into the distance, glowing strings across the path, bells, '
     'flowers along the edges, a bread bun rolling far ahead'),
    ('l1_4_leshiy_vodit', '1-4 · Леший водит', 'ходячие ёлки, хоровод ёлок', 'les',
     'level 1-4: a dense fir forest where trees walk when no one is looking, rings of firs holding hands with ribbons around a stump, '
     'hollow trees, a firefly beam of light'),
    ('l1_5_pryalka', '1-5 · Кикиморина прялка', 'подворье, мотовило, ткацкий стан', 'les',
     'level 1-5: the inside of Kikimora\'s spinning homestead: winding reels and counterweight platforms on threads, a giant loom weaving '
     'a fabric bridge, webs of thread across the rooms, black tow on the floor'),
    ('l1_b_leshiy', '1-Б · арена Лешего', 'поляна с пнём, ёлки-двойники', 'les',
     'level 1-B boss arena: a round clearing in a dark fir forest with a huge stump in the center, a ring path around it, firs at the edges '
     'with hiding spots, lanterns on poles'),
    ('l2_1_gusli', '2-1 · Гусли Садко', 'дно в пузырях воздуха, прилив и отлив', 'kitezh',
     'level 2-1: the sea floor with air bubbles to walk in, a fountain pillar, a sunken palace of the Sea King, conch shells marking tide '
     'zones, half of the area under water and half at low tide'),
    ('l2_2_ryba_kit', '2-2 · Чудо-юдо Рыба-кит', 'деревня на спине кита', 'kitezh',
     'level 2-2: the back of a giant whale as a landscape: a village with huts, a ploughed field, a forest on the tail, water channels with '
     'a sluice gate along the spine, the open sea around'),
    ('l2_3_nevod', '2-3 · Невод', 'вечернее озеро, четыре угла невода', 'kitezh',
     'level 2-3: a lake at sunset with four stones marking the corners of a fishing net, silhouettes of Kitezh churches far away, glowing '
     'eyes deep in the dark water'),
    ('l2_4_bryukho', '2-4 · В брюхе у кита', 'рёбра, планктон, корабль в желудке', 'kitezh',
     'level 2-4: inside the whale: warm and bright, arched ribs, glowing plankton and jellyfish, pulsing membranes, a stomach lake with an '
     'old swallowed ship and a bell on it'),
    ('l2_5_kitezh', '2-5 · Китеж звонит', 'колокола, затонувший город', 'kitezh',
     'level 2-5: the sunken white-stone city of Kitezh with golden onion domes and bell towers, bells hanging at different water levels, '
     'streets revealed by low tide, a ghostly boat'),
    ('l2_b_vodyanoy', '2-Б · Водяной', 'погоня с валом, деревня на сваях, омут', 'kitezh',
     'level 2-B: a village on stilts in a stormy lilac evening, a mill and an oak, a dark whirlpool pond with lily pads, a giant wave '
     'approaching with golden sparks'),
    ('l3_1_sad', '3-1 · Сад молодильных яблок', 'светомостки и тенемостки, серая яблоня', 'nebo',
     'level 3-1: a garden of rejuvenating apples on cloud islands, golden light-bridges and violet shadow-bridges, a grey withered apple '
     'tree and blooming ones, a gate in the garden wall'),
    ('l3_2_pastbishcha', '3-2 · Облачные пастбища', 'облака-лифты, барашки', 'nebo',
     'level 3-2: cloud pastures with fluffy lambs, cloud lifts rising and sinking, haystack-like clouds, small storm clouds, a stone with '
     'the face of the Wind'),
    ('l3_3_sirin', '3-3 · Сирин и Алконост', 'гусельный раннер в небе', 'nebo',
     'level 3-3: a rhythm-runner path of glowing feathers across the sky, two giant mythical birds on branches at the sides, sunset clouds '
     'and a distant birch on a cloud'),
    ('l3_4_korabl', '3-4 · Летучий корабль', 'палуба кренится, ущелье', 'nebo',
     'level 3-4: a flying wooden ship with sails and a lantern on the mast flying through a cloud gorge, barrels on a tilting deck, a low '
     'stone arch ahead, crows circling'),
    ('l3_5_gusi', '3-5 · Гуси-лебеди', 'стелс: свет выдаёт', 'nebo',
     'level 3-5: walkways between cloud islands at dusk watched by giant white geese casting light spots, guard posts, hiding places, a '
     'nest in the distance'),
    ('l3_b_solovey', '3-Б · Прямоезжая дорожка', 'подход к гнезду Соловья', 'nebo',
     'level 3-B: a straight road through the clouds with rocks and trees as cover, a log across the road, a bridge, and at the end a '
     'giant nest on top of nine oaks'),
    ('l4_1_kuznya', '4-1 · Кузня Кузьмы и Демьяна', 'ковка клещей по станциям', 'ogon',
     'level 4-1: a great blacksmith forge built into the rock, four workstations — bellows, anvil, quenching trough, finished tongs — '
     'stone smiths frozen as statues, glowing hearths and lifts'),
    ('l4_2_reka', '4-2 · Река Смородина', 'корка на лаве, сваи', 'ogon',
     'level 4-2: a wide river of orange lava with wooden piles, crust plates of cooled lava floating, basalt banks, heat haze and sparks'),
    ('l4_3_ukhnem', '4-3 · Эй, ухнем', 'тянут ладью лямками', 'ogon',
     'level 4-3: a towpath along a lava river where a heavy boat is pulled on ropes, logs across the path, basalt cliffs, the glow of fire'),
    ('l4_4_valy', '4-4 · Змиевы валы', 'плуг и борозды для лавы', 'ogon',
     'level 4-4: the Serpent Ramparts — earthen ramparts with a glowing plough, furrows where lava flows, a living stove, ash fields'),
    ('l4_5_kalinov_most', '4-5 · Калинов мост', 'цепи, калёные доски', 'ogon',
     'level 4-5: the carved Kalinov bridge over the fire river, chains hanging from hooks, red-hot planks, the far bank in smoke'),
    ('l4_b_gorynych', '4-Б · арена Горыныча', 'лавовые трещины, гейзеры', 'ogon',
     'level 4-B boss arena: a round basalt arena by the fire river with lava cracks and geyser vents, columns, a cave lair of the dragon'),
    ('l5_1_sunduk', '5-1 · Сундук на дубе', 'ярусы дуба, заводь Лебедя, ущелье', 'buyan',
     'level 5-1: a huge ancient oak on Buyan island with tiers of platforms in its branches, an iron-bound chest hanging on chains, a '
     'swan\'s lagoon, a gorge with a giant head, the white Alatyr stone with glowing signs'),
    ('l5_2_zayats', '5-2 · Заяц', 'загон зайца нитями', 'buyan',
     'level 5-2: an open meadow of the island with birches and posts, glowing threads stretched between them, grass, hare tracks'),
    ('l5_3_utka', '5-3 · Утка', 'полёт на Горыныче', 'buyan',
     'level 5-3: a flight route over the sea and islands at dawn, dark clouds of Koschei ahead, a flying duck far away, rings of light in '
     'the air'),
    ('l5_4_yaytso', '5-4 · Яйцо', 'бальный зал Кощея, «Калинка»', 'koschei',
     'level 5-4: Koschei\'s golden upside-down ballroom: colored floor tiles for a rhythm dance, shadow couples waltzing at the sides, a '
     'balcony where a dark figure appears, chandeliers hanging upward'),
    ('l5_b1_terem', '5-Б1 · Терем Кощея', 'тени-двойники, «Выстоять»', 'koschei',
     'level 5-B1: inside Koschei\'s dark tower: a hall of black carved wood and iron, tall windows with storm light, chains and candles, a '
     'throne, shadows on the walls'),
    ('l5_b2_final', '5-Б2 · Финал: Златая цепь', 'груды злата, дуб, двенадцать стадий', 'koschei',
     'level 5-B2: the final battlefield — Lukomorye under a dark sky, the great oak with a broken golden chain, black chains growing from '
     'the ground, heaps of gold, black candles, magic portal pages floating in the air'),
    ('epi_teatr', 'Эпилог · театр теней', 'штаб-сосна, фонарь, тени на стене', 'epi',
     'the epilogue: the cozy room inside the pine headquarters at evening, a lantern on the floor casting big shadows on a wall: a '
     'three-headed dragon, a firebird and a round dance'),
]
for k, (slug, ru, about, world, what) in enumerate(LOC, 1):
    ent('L%02d' % k, slug, ru, about, 'Wide in-game view from the high three-quarter gameplay camera of ' + what + '. Readable paths, '
        'platforms and landmarks, no player characters.', world=world)

# --- 07 Предметы: (имя файла, рус., о чём, что)
IT = [
    ('zlataya_tsep', 'Златая цепь', 'главная цель игры, на дубе',
     'a section of the great Golden Chain: heavy ornate golden links engraved with tiny fairy-tale scenes, wound around a piece of oak bark, glowing softly'),
    ('zveno', 'Золотое звено', 'собирают на каждом уровне',
     'a single collectible golden chain link floating and spinning with a ring of sparkles and a soft glow beneath it'),
    ('oreshek', 'Золотой орешек', 'валюта лавки Векши',
     'a collectible golden hazelnut with a leafy cap, floating and shining, a small pile of golden nuts below'),
    ('kolokolchik', 'Колокольчик', 'точка возврата',
     'a checkpoint: a small brass bell hanging on a carved wooden post with a ribbon, glowing when rung, sound rings around it'),
    ('samotsvet', 'Самоцвет уровня', 'открывает карту тайников',
     'a level gem: a large faceted precious stone in a golden setting, glowing from within with colored light, on a little embroidered cushion'),
    ('klubok', 'Клубок-путеводитель', 'чудо-вещь мира 1: нить-тропка и струны',
     'the magic guiding ball of yarn: a red woolen ball rolling by itself and unrolling a glowing golden guiding thread, a wooden peg with a stretched string'),
    ('gusli', 'Гусли Садко', 'чудо-вещь мира 2: прилив и отлив',
     'Sadko\'s gusli: a wing-shaped wooden psaltery with carved decorations and golden strings, musical notes and a ripple of water rising from it'),
    ('pero', 'Перо Жар-птицы', 'чудо-вещь мира 3: свет',
     'the Firebird\'s feather: a long flame-like golden-orange feather glowing with warm light and casting a circle of light around it'),
    ('kleshchi', 'Кузнечные клещи', 'чудо-вещь мира 4: взять горячее',
     'blacksmith\'s tongs holding a red-hot glowing chain link, sparks falling, a colored ring of light above the hot piece'),
    ('alatyr', 'Алатырь-камень и знаки', 'вещь по знаку на Буяне',
     'the white Alatyr stone with four glowing magic signs drawn on the ground around it: a ball of yarn, a gusli, a feather and tongs'),
    ('rogatka', 'Рогатка Прошки', 'свой приём лисёнка',
     'Proshka\'s slingshot: a forked wooden slingshot with a red band and a leather pouch, a glowing acorn pellet, a few acorns beside it'),
    ('kovshik', 'Ковшик Йоши', 'живая и мёртвая вода',
     'Yosha\'s little wooden ladle (kovshik) with a duck-head handle, one stream of glowing turquoise living water and one of silvery dead water'),
    ('tetradka', 'Тетрадка Пелагеи', 'сказы и подсказки',
     'Pelageya\'s handmade notebook of fairy tales: a small book in a linen cover tied with a red ribbon, open pages with tiny drawings, a feather quill'),
    ('molodilnoe_yabloko', 'Молодильное яблоко', 'молодит Жар-птицу и Деда-Садовника',
     'a rejuvenating apple: a glowing golden apple with a green leaf on a branch, soft sparkles of youth around it'),
    ('kolokola_kitezha', 'Колокола Китежа', 'звонят на своей отметке воды',
     'the bells of Kitezh: three bronze church bells of different sizes hanging on a carved wooden beam under water, bubbles and a golden ring of sound'),
    ('stupa', 'Ступа и помело Яги', 'полёты в финале',
     'Baba Yaga\'s flying mortar with a pestle and a broom, wooden with iron bands, hovering with a trail of smoke'),
    ('pryalka', 'Прялка Кикиморы', 'прялка и веретено',
     'Kikimora\'s old spinning wheel with a distaff of dark tow and a spindle, threads leading off, a little moss on it'),
    ('uzda', 'Узда Горыныча', 'несут двумя клещами',
     'the dragon\'s bridle: a big glowing red-hot iron bridle with three loops for three heads, held by two pairs of tongs from both sides'),
    ('sunduk', 'Сундук Кощея', 'висит на цепях на дубе',
     'Koschei\'s chest: an iron-bound oak chest with a big padlock hanging on five chains, a dark glow seeping from the cracks'),
    ('yaytso_igla', 'Яйцо с иглой', 'смерть Кощея',
     'the egg with Koschei\'s death: a large ornate egg cracked open, a thin glowing needle floating inside it'),
    ('karta_rushnik', 'Карта-рушник', 'вышитая карта пяти миров',
     'the embroidered towel map (rushnik): a long linen towel unrolled from a golden spindle, embroidered with a map of five worlds — a '
     'forest, an underwater city, a cloud kingdom, a fire river and an island with an oak — connected by a dotted golden path, red and white '
     'folk borders, no readable text'),
    ('volshebny_stan', 'Волшебный стан', 'арка с жар-птицей, раскатывает карту',
     'the magic loom on the seashore: a carved wooden arch topped with a firebird, a golden spindle with an embroidered towel wound on it'),
    ('letuchiy_korabl', 'Летучий корабль', 'корабль мира 3',
     'the flying ship: a small wooden ship with patched sails, buckets tied as wings, a lantern on the mast, flying among clouds'),
    ('naryady', 'Наряды из лавки', 'шапки, шарфы, плащи героев',
     'a set of tiny outfits for the animal heroes: a fur hat, a kokoshnik, a knitted scarf, a hooded cloak, a straw hat and a bogatyr helmet arranged neatly'),
]
for k, (slug, ru, about, what) in enumerate(IT, 1):
    ent('I%02d' % k, slug, ru, about, 'Game-ready 3D prop render of ' + what + '. Single asset, three-quarter view, centered, no text.')

# --- 08 Геймплей
ent('G01', 'zagadka', 'Совместная загадка', 'лес: плита, подкидка, струна клубка',
    'In-engine gameplay screenshot of a cozy co-op 3D adventure game, high three-quarter camera. In a twilight fir forest clearing: '
    'Proshka the slim ginger fox cub stands on a glowing yellow pressure plate holding a wooden gate open; Potap the brown bear cub in a '
    'white shirt tosses tiny Yosha the turquoise hedgehog up onto a ledge; Pelageya the lilac owl glides over a gap along a stretched '
    'glowing yarn string. Golden chain links and hazelnuts float as collectibles, a brass bell checkpoint. ' + HUD,
    acc={'S1': 'A carved wooden toy game board come alive, readable plates and paths.',
         'S2': 'A felted stop-motion set, the glowing string is real yarn, the plate is a big felt button.',
         'S3': 'Cel-shaded with ink outlines and flat colors, very readable paths, decorative mist.',
         'S4': 'A dark night look: heroes and interactive objects outlined with glowing gold, everything else in deep dark tones.',
         'S5': 'A layered paper stage, the string a gold paper strip, heroes as paper puppets with soft contact shadows.'})
ent('G02', 'boy_moroki', 'Бой с мороками', 'сигналы, щит, распутывание',
    'In-engine gameplay screenshot of a combat moment, high three-quarter camera, on a street of underwater Kitezh with golden domes: '
    'Potap the brown bear cub raises a wide shield as a yellow warning sign flashes above a morok (a creature of tangled dark thread with '
    'glowing ember dots above it); Pelageya the lilac owl reflects a blue water drop back at a pike-shaped morok; another morok shows a red '
    'sign before a swipe; a defeated morok unravels into loose threads and sparkles. ' + HUD,
    acc={'S1': 'Moroks and heroes like carved painted toys, the warning signs as painted wooden tokens, the unraveling as wood shavings and threads.',
         'S2': 'Moroks of tangled yarn literally unraveling into loose wool threads, the signs as felt badges, water drops as glass beads.',
         'S3': 'Cel-shaded with ink outlines, the signs as bold graphic symbols, the unraveling as flying ink strokes.',
         'S4': 'Dark lacquer scene, the yellow, red and blue signs glowing like jewels, the unraveling as a burst of gold threads.',
         'S5': 'Paper puppets fighting on a layered paper stage, the signs as glowing cut-out shapes, the unraveling as flying paper strips.'})
ent('G03', 'boy_boss', 'Бой с боссом', 'Горыныч, узда двумя клещами',
    'In-engine gameplay screenshot of a boss fight, dramatic high camera: the three-headed dragon Zmey Gorynych towers over a lava arena '
    'with basalt columns, one head asleep, one roaring, the middle one breathing fire; two tiny heroes, Proshka the ginger fox cub and '
    'Yosha the turquoise hedgehog, carry a glowing hot bridle with blacksmith tongs from two sides; lava cracks and geysers. A boss bar at '
    'the top made of ornamental embers. ' + HUD,
    acc={'S1': 'The dragon a giant painted folk toy, the arena a carved diorama with painted lava, warm dramatic light.',
         'S2': 'The dragon felted with sequin scales, the lava knitted orange yarn, the fire of silk threads.',
         'S3': 'Cel-shaded with ink outlines, fire and lava as ornamental curls, a very clear read of the danger zones.',
         'S4': 'Dark lacquer arena, the dragon and the lava glowing in vermilion and gold, the heroes outlined in gold.',
         'S5': 'A paper dragon puppet on brass pins over glowing orange tissue lava, the heroes as small paper puppets.'})
ent('G04', 'priliv_otliv', 'Прилив и отлив', 'гусли Садко меняют воду на участке',
    'In-engine gameplay screenshot, high three-quarter camera, in underwater Kitezh: Pelageya the lilac owl plays a wing-shaped gusli by a '
    'big conch shell, the water level of one zone drops in a wave of golden notes revealing sandy streets and a cellar door, while Potap '
    'the brown bear cub swims in the high water of the neighboring zone next to a floating boat. ' + HUD)
ent('G05', 'svet_pera', 'Свет пера', 'светомостки и тенемостки',
    'In-engine gameplay screenshot, high three-quarter camera, in the lilac cloud kingdom at dusk: Yosha the turquoise hedgehog holds a '
    'glowing Firebird feather, its warm circle of light makes golden bridges solid, while violet shadow-bridges are solid only in the dark '
    'where Proshka the ginger fox cub walks; a flat shadow creature shrinks from the light. ' + HUD)
ent('G06', 'lava_kleshchi', 'Клещи и лава', 'корка живой воды, горячее клещами',
    'In-engine gameplay screenshot, high three-quarter camera, by the fiery Smorodina river: Yosha the turquoise hedgehog pours living '
    'water on the lava creating a cooled crust plate, Proshka the ginger fox cub jumps onto it, Potap the brown bear cub carries a red-hot '
    'ingot with blacksmith tongs; heat lizards on wooden piles spit little flames. ' + HUD)
ent('G07', 'gusli_ritm', 'Гусельный уровень', 'ритм-раннер: прыжки и щит в такт',
    'In-engine gameplay screenshot of a rhythm runner level: a forest path running away from the camera in three lanes for each of two '
    'players, Proshka the ginger fox cub and Pelageya the lilac owl running and jumping over glowing strings in time with music, bells '
    'and musical note markers on the lanes, a golden bread bun rolling ahead, a rhythm meter at the bottom without text. ' + HUD)
ent('G08', 'polyot', 'Полёт на Горыныче', 'два игрока ведут две головы',
    'In-engine gameplay screenshot from behind and above a flying three-headed dragon carrying the four animal heroes on a saddle over the '
    'sea at dawn, golden rings to fly through, black crows of Koschei ahead, dark clouds, speed lines at the edges. ' + HUD)
ent('G09', 'split_screen', 'Экран на двоих', 'каждый игрок — своя половина экрана',
    'In-engine split-screen gameplay screenshot for two players, divided by a thin ornamental golden line: on the left Potap the brown '
    'bear cub pushes a log in the Dark Forest, on the right Pelageya the lilac owl glides over a gap toward a golden chain link; each half '
    'with its own small hero portrait, no readable text.')
ent('G10', 'khab', 'Хаб Лукоморье', 'огород, курочка, рыбалка между уровнями',
    'In-engine gameplay screenshot of the cozy hub, high three-quarter camera: at Lukomorye by the sea, Yosha the turquoise hedgehog waters '
    'sprouting carrots in a garden bed, a speckled hen with chicks waits for grain, Proshka the ginger fox cub fishes from a wooden pier, '
    'the great oak with the golden chain in the background. ' + HUD)
ent('G11', 'karta_ui', 'Карта-рушник: выбор уровня', 'меню мира и уровня',
    'In-engine screenshot of the level select screen: an embroidered linen towel map unrolled across the screen, five worlds embroidered '
    'on it as small 3D landmarks, a glowing needle marking the chosen level, found chain links shown as small golden stitches, an '
    'ornamental frame with small icons, no readable text.')
ent('G12', 'stels_gusi', 'Стелс: гуси-лебеди', 'свет выдаёт, прятаться в тени',
    'In-engine gameplay screenshot, high three-quarter camera, on cloud walkways at dusk: giant white geese cast round white search-light '
    'spots on the walkways, Pelageya the lilac owl hides behind a cloud with her feather extinguished, Potap the brown bear cub waits in '
    'the shadow, a goose turns its head with a small exclamation mark above it. ' + HUD)

FIRST = ['H01', 'H02', 'H03', 'H04', 'H05', 'B05', 'L02', 'G01']  # волна 1: 8 сущностей × 5 стилей = 40 картинок для первого выбора
ORDER = [e for f in FIRST for e in E if e['id'] == f] + [e for e in E if e['id'] not in FIRST]


def accent(e, s):
    if e['acc']: return e['acc'][s]
    p = e['id'][0]
    if p == 'E': return MOROK_ACC[s] + ' ' + WORLD_M[e['world']][s]
    if p == 'L': return LOC_ACC[e['world']][s]
    return {'N': NPC_ACC, 'I': ITEM_ACC, 'G': GAME_ACC}[p][s]


def prompt(e, s): return ' '.join([s['lead'], e['core'], accent(e, s['id']), s[SECT[e['id'][0]][2]]])
def fname(e, s): return '%s_%s_%s.png' % (s['id'], e['id'], e['slug'])
def edir(e): return '%s_%s' % (e['id'], e['slug'])
def seed(e, s): return int(s['id'][1]) * 1000 + E.index(e) + 1


# ---------------------------------------------------------------- документ
def build():
    o = []
    a = o.append
    n_all = len(E) * len(STYLES)
    a('# Арт-ресёрч для 3D на Unreal Engine 5.8: 5 стилей × %d сущностей = %d промтов для Qwen Image' % (len(E), n_all))
    a('')
    a('> Документ собирает `python3 tools/art_prompts.py` — руками не править: стили, сущности и акценты меняются в скрипте, потом пересборка.')
    a('')
    a('Цель — подобрать собственный визуальный стиль для 3D-игры «Златая цепь» на **Unreal Engine 5.8**. Пять стилей, и в каждом — '
      '**каждая сущность игры отдельно**: %d сущностей (герои, жители, все мороки, мини-боссы, боссы, локации всех уровней и хаба, '
      'предметы, кадры геймплея) × 5 стилей = **%d картинок**. Композиция одной сущности во всех стилях одинаковая — меняется только стиль.'
      % (len(E), n_all))
    a('')
    a('**Как промты учитывают 3D и UE5.** Каждый промт начинается с «Unreal Engine 5 real-time 3D render…» (номер версии модель не '
      'различает — пишем «5», игра делается на 5.8). Персонажи — game-ready 3D-модели на подставке (как витрина ассета), предметы — '
      'отдельные 3D-ассеты, локации — вид из игровой камеры (высокий вид три четверти), геймплей — внутриигровой кадр с HUD. '
      'В хвостах стилей — материалы и свет, которые собираются в UE5 (Lumen, Nanite, Substrate, toon-пост-процесс, ворс, '
      'просвечивающая бумага); у каждого стиля в разделе 3 — абзац «Как делать в Unreal». Негативы отсекают 2D-иллюстрацию и фотореализм.')
    a('')
    a('## 1. Инструкция для агента генерации (MCP)')
    a('')
    a('| параметр | значение |')
    a('|---|---|')
    a('| модель | **Qwen Image 2.1** |')
    a('| размер | **%d × %d** (720p, 16:9) для всех картинок |' % (W, H))
    a('| корневая папка | `%s\\` |' % SAVE)
    a('| имя файла | из заголовка промта: `S1_H01_proshka.png` = стиль · id сущности · имя |')
    a('| промт | блок `text` под заголовком — **дословно**, на английском: не переводить, не сокращать, не дописывать |')
    a('| негатив | `negative: NEG_Sx` — текст после `NEG_Sx:` в блоке негатива стиля (раздел 3), если инструмент принимает negative prompt |')
    a('| seed | указан у каждого промта (повторяемость); новые варианты того же промта — другой seed |')
    a('| шаги / CFG | по умолчанию модели; если инструмент спрашивает — 30–50 шагов, CFG ≈ 4 |')
    a('')
    a('### Папки: по стилям и по сущностям')
    a('')
    a('Каждая картинка лежит в двух местах — так удобно и смотреть стиль целиком, и сравнивать одну сущность в пяти стилях:')
    a('')
    a('```text')
    a('%s\\' % SAVE)
    a('├─ %s\\                       основной файл: стиль → раздел' % BY_STYLE)
    a('│  ├─ S1_Reznaya_skazka\\')
    a('│  │  ├─ 01_Geroi\\S1_H01_proshka.png')
    a('│  │  └─ 02_Zhiteli\\ … 08_Geympley\\')
    a('│  └─ S2_Valyanaya_skazka\\ … S5_Bumazhny_teatr\\')
    a('├─ %s\\                 жёсткая ссылка на тот же файл: раздел → сущность' % BY_ENT)
    a('│  ├─ 01_Geroi\\H01_proshka\\S1_H01_proshka.png … S5_H01_proshka.png')
    a('│  └─ 03_Moroki\\E01_kolyuchiy_klubok\\ …')
    a('└─ _errors.txt')
    a('```')
    a('')
    a('- **Основной файл** — `%s\\<папка стиля>\\<папка раздела>\\<имя файла>`.' % BY_STYLE)
    a('- **Для сравнения** — `%s\\<папка раздела>\\<папка сущности>\\<имя файла>`: **жёсткая ссылка** (hard link) на основной файл, '
      'места на диске не занимает. Если жёсткие ссылки недоступны (другой диск, FAT/exFAT) — обычная копия.' % BY_ENT)
    a('- Папка стиля — по `S1…S5`, папка раздела — по первой букве id сущности (таблицы ниже), папка сущности — `<id>_<имя>` '
      '(указана у каждой сущности в разделе 6).')
    a('')
    a('| стиль | папка стиля |')
    a('|---|---|')
    for s in STYLES: a('| `%s` «%s» | `%s` |' % (s['id'], s['ru'], s['dir']))
    a('')
    a('| id | раздел | папка раздела | сущностей |')
    a('|---|---|---|---|')
    for p, (d, ru, _) in SECT.items(): a('| `%s01…` | %s | `%s` | %d |' % (p, ru, d, sum(e['id'][0] == p for e in E)))
    a('')
    a('Создать всё дерево сразу (PowerShell):')
    a('')
    a('```powershell')
    a('$root = "%s"' % SAVE)
    a('$styles = %s' % ','.join('"%s"' % s['dir'] for s in STYLES))
    a('$entities = @{')
    for p, (d, _, _) in SECT.items():
        a('  "%s" = @(%s)' % (d, ','.join('"%s"' % edir(e) for e in E if e['id'][0] == p)))
    a('}')
    a('foreach ($sec in $entities.Keys) {')
    a('  foreach ($s in $styles) { New-Item -ItemType Directory -Force -Path "$root\\%s\\$s\\$sec" | Out-Null }' % BY_STYLE)
    a('  foreach ($e in $entities[$sec]) { New-Item -ItemType Directory -Force -Path "$root\\%s\\$sec\\$e" | Out-Null }' % BY_ENT)
    a('}')
    a('```')
    a('')
    a('Положить готовую картинку (для каждого файла, сразу после генерации):')
    a('')
    a('```powershell')
    a('# пример: $file = "S1_H01_proshka.png"; $styleDir = "S1_Reznaya_skazka"; $sec = "01_Geroi"; $ent = "H01_proshka"')
    a('$main = "$root\\%s\\$styleDir\\$sec\\$file"     # сюда сохранить файл от генератора' % BY_STYLE)
    a('$link = "$root\\%s\\$sec\\$ent\\$file"' % BY_ENT)
    a('if (-not (Test-Path $link)) { try { New-Item -ItemType HardLink -Path $link -Target $main -ErrorAction Stop | Out-Null } catch { Copy-Item $main $link } }')
    a('```')
    a('')
    a('### Порядок работы')
    a('')
    a('1. Создать дерево папок (скрипт выше), если его ещё нет.')
    a('2. Генерировать только промты раздела 6 (блоки раздела 3 — части стилей, не отдельные картинки), строго по номерам 001 → %03d. '
      'Если основной файл уже есть — не генерировать, только проверить ссылку в `%s` (так работу можно прервать и продолжить с '
      'того же места).' % (n_all, BY_ENT))
    a('3. **Каждое изображение сохранять сразу по готовности**, не дожидаясь конца пачки: инструмент вернул ссылку — скачать сразу; '
      'base64 — записать файл; сохранил в свою папку — сразу перенести в основную папку под именем из заголовка; затем — ссылка в `%s`.' % BY_ENT)
    a('4. Ошибка генерации — один повтор с тем же seed, потом с seed + 1; не вышло — строка в `_errors.txt` (номер, имя файла, ошибка), дальше.')
    a('5. Если инструмент не принимает 1280×720 (нужна кратность 32/64) — ближайший размер 16:9 (`1280×704`, `1344×768`) без кадрирования; имя то же.')
    a('6. Документ большой — читать его по частям (по разделам и сущностям), а не целиком. Строка промта: '
      '`**NNN · \\`имя_файла\\`** · стиль · размер · seed N · negative: NEG_Sx`, под ней — блок `text` с промтом.')
    a('7. Ничего не коммитить: `wiki/` уходит в GitHub Wiki после слияния в `main`, а %d PNG — это гигабайты. В репозиторий — только '
      'выбранные картинки, уменьшенные и в JPG.' % n_all)
    a('')
    a('**Волны.** Волна 1 (001–040) — восемь главных сущностей во всех стилях (четыре героя, команда, Кощей, Лукоморье, совместная '
      'загадка): после неё можно отсеять 2–3 стиля и дальше генерировать только оставшиеся (промты отсеянных `Sx` пропускать). '
      'Волна 2 — все остальные сущности по разделам.')
    a('')
    a('## 2. Пять стилей')
    a('')
    a('| | стиль | коротко | палитра |')
    a('|---|---|---|---|')
    for s in STYLES:
        a('| **%s** | «%s» (%s) | %s | %s |' % (s['id'], s['ru'], s['en'], s['idea'].split(':')[0], s['palette']))
    a('')
    a('## 3. Стили подробно')
    a('')
    for s in STYLES:
        a('### %s · «%s» — %s' % (s['id'], s['ru'], s['en']))
        a('')
        a('- **Что это.** ' + s['idea'])
        a('- **Почему подходит игре.** ' + s['why'])
        a('- **Как делать в Unreal.** ' + s['ue'])
        a('- **Палитра:** %s. **Ориентиры:** %s.' % (s['palette'], s['refs']))
        a('')
        for k, t in [('lead', 'Вступление (начало каждого промта)'), ('char', 'Хвост для персонажей (`char`: герои, жители, мороки, боссы)'),
                     ('prop', 'Хвост для предметов (`prop`)'), ('scene', 'Хвост для локаций (`scene`)'), ('game', 'Хвост для геймплея (`game`)')]:
            a(t + ':')
            a('```text\n%s\n```' % s[k])
        a('**NEG_%s** (негатив):' % s['id'])
        a('```text\nNEG_%s: %s\n```' % (s['id'], s['neg']))
        a('')
    a('## 4. Сущности (%d)' % len(E))
    a('')
    a('Промт = вступление стиля + описание сущности (одно для всех стилей) + акцент в этом стиле + хвост стиля. Внешность героев '
      'описана одними и теми же словами во всех промтах, чтобы их узнавали в любом стиле. Все враги игры — **мороки**: нитяные клубки в '
      'облике существ (их не убивают, а распутывают), поэтому в каждом промте морока есть одно и то же определение.')
    a('')
    a('| id | раздел | сущность | что это | промты |')
    a('|---|---|---|---|---|')
    for e in E:
        k = ORDER.index(e) * 5
        a('| `%s` | %s | **%s** | %s | %03d–%03d |' % (e['id'], SECT[e['id'][0]][1], e['ru'], e['about'], k + 1, k + 5))
    a('')
    a('## 5. Как выбирать')
    a('')
    a('Сначала стиль целиком (`%s\\S1_…` — цельный ли мир), потом одна сущность в пяти стилях (`%s\\01_Geroi\\H01_proshka`). '
      'Оценки по пятибалльной шкале:' % (BY_STYLE, BY_ENT))
    a('')
    a('| критерий | S1 | S2 | S3 | S4 | S5 |')
    a('|---|---|---|---|---|---|')
    for c in ['Узнаётся «русская сказка» с первого взгляда', 'Героев видно и понятно с игровой камеры (силуэт, цвет)',
              'Мороки читаются как враги, но не пугают детей 7–11 лет', 'Боссы — зрелищные', 'Локации разных миров не похожи друг на друга',
              'Предметы и то, с чем можно взаимодействовать, выделяются', 'Не похоже на другие игры',
              'Посильно в Unreal Engine 5.8 малой командой (материалы, анимация, производительность)', 'Нравится самому (и детям-тестерам)']:
        a('| %s | | | | | |' % c)
    a('')
    a('Стили можно смешивать: например, герои и мороки — «Валяная сказка», ролики-Сказы — «Бумажный театр», интерфейс и карта — '
      '«Книжка Билибина». Следующий шаг после выбора — листы персонажей (спереди, сбоку, сзади), кадры-эталоны для каждого мира и '
      'пробная сцена в Unreal с материалами выбранного стиля.')
    a('')
    a('## 6. Промты (%d)' % n_all)
    a('')
    wave, sect = None, None
    for k, e in enumerate(ORDER):
        w = 1 if e['id'] in FIRST else 2
        if w != wave:
            wave, sect = w, None
            a('### Волна %d%s' % (w, ' — восемь главных сущностей (001–040)' if w == 1 else ' — все остальные сущности (041–%03d)' % n_all))
            a('')
        if w == 2 and e['id'][0] != sect:
            sect = e['id'][0]
            a('### %s · `%s`' % (SECT[sect][1], SECT[sect][0]))
            a('')
        a('#### %s · %s — %s' % (e['id'], e['ru'], e['about']))
        a('')
        a('Папка сущности: `%s\\%s\\%s\\`' % (BY_ENT, SECT[e['id'][0]][0], edir(e)))
        a('')
        for j, s in enumerate(STYLES):
            n = k * 5 + j + 1
            a('**%03d · `%s`** · %s «%s» · %d×%d · seed %d · negative: NEG_%s' % (n, fname(e, s), s['id'], s['ru'], W, H, seed(e, s), s['id']))
            a('```text\n%s\n```' % prompt(e, s))
        a('')
    return '\n'.join(o).rstrip() + '\n'


if __name__ == '__main__':
    t = build()
    open(OUT, 'w', encoding='utf-8').write(t)
    print('%s: %d сущностей, %d промтов, %d КБ' % (os.path.relpath(OUT, ROOT), len(E), len(E) * len(STYLES), len(t.encode('utf-8')) // 1024))
