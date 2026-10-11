#!/usr/bin/env python3
# Арт-ресёрч: 5 стилей × 40 сущностей = 200 промтов для Qwen Image (1280×720) → zlataya_cep/docs/41_art_research_prompts.md.
# Документ — источник для пакетной генерации через MCP на машине пользователя; руками его не править, правки — здесь:
#   python3 tools/art_prompts.py          — пересобрать документ
# Промт = вступление стиля + ядро сущности (одно на все стили: композиция одинаковая, меняется только стиль)
#       + акцент сущности в этом стиле (материал, детали) + хвост стиля для вида картинки (char / prop / scene / game).
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'zlataya_cep', 'docs', '41_art_research_prompts.md')
SAVE = r'C:\_UE_PRJs_\ZolotayCepGame\wiki\images\_ArtResearch'
W, H = 1280, 720

# ---------------------------------------------------------------- стили
STYLES = [
    dict(id='S1', ru='Резная сказка', en='Carved Folk Toy',
         idea='Герои и мир — расписные деревянные игрушки богородских и семёновских мастеров: крупные рубленые формы со следами '
              'стамески, мягкие фаски, матовая темпера по липе, городецкие цветы и точки-бусины. Мир — настольная диорама.',
         why='Прямое развитие нынешней арт-библии («вырезанная из дерева сказка», грань вместо глянца), поэтому меньше всего риска. '
             'Тёплый, «игрушечный», хорошо читается с изометрической камеры.',
         ue='Стилизованный PBR: фаски, шум по вершинам, запечённый AO, матовые материалы с волокном дерева; дёшево в производстве.',
         palette='охра, киноварь, хвойная зелень, сливочный, золото',
         refs='богородская игрушка, городецкая и полхов-майданская роспись, Synty POLYGON, A Short Hike',
         lead='Stylized 3D game art in the style of hand-carved, hand-painted Russian folk wooden toys (Bogorodskaya carving, Gorodets painting).',
         char='Chunky simplified shapes with visible chisel facets and soft bevels, matte tempera paint over warm linden wood grain, small painted '
              'folk ornaments and dotted borders, big expressive painted eyes with a white highlight. Warm golden-hour key light, soft ambient '
              'occlusion, shadows tinted by sky and ground, never pure black. Saturated warm palette: ochre, cinnabar red, pine green, cream, '
              'gold accents. Presented like collectible toys on a plain warm neutral backdrop. Ultra HD, 4K, cinematic composition.',
         prop='Carved linden wood with visible chisel facets and soft bevels, matte tempera paint, gilded details, small painted folk ornaments. '
              'Items displayed like museum folk-craft pieces on a plain warm neutral backdrop, soft studio light, gentle shadows. '
              'Palette: ochre, cinnabar red, pine green, cream, gold. Ultra HD, 4K, clean product composition.',
         scene='The whole world is a carved and painted wooden tabletop diorama: faceted shapes with soft bevels, matte tempera paint over wood '
               'grain, painted folk ornaments on buildings and props. Warm golden-hour light, soft ambient occlusion, colored shadows (never '
               'pure black), atmospheric depth layers, gentle tilt-shift depth of field. Saturated warm palette: ochre, cinnabar red, pine '
               'green, cream, gold accents. Ultra HD, 4K, cinematic composition.',
         game='Stylized 3D game screenshot with a carved and painted wood look: matte faceted surfaces, warm light, soft ambient occlusion, '
              'colored shadows, crisp readable silhouettes and paths from the camera. Ultra HD, 4K.',
         neg='photorealistic, realistic fur, hyper-detailed skin, glossy plastic, chrome, anime, manga, chibi sticker, flat vector, low quality, '
             'blurry, noisy, jpeg artifacts, deformed anatomy, extra limbs, fused limbs, text, letters, captions, watermark, signature, logo, '
             'gore, horror'),
    dict(id='S2', ru='Валяная сказка', en='Felt & Embroidery Stop-Motion',
         idea='Мир — кукольная анимация: герои свалены из шерсти, глаза — стеклянные бусинки, земля и небо — вышивка гладью и крестом '
              'по льну, реки — вязаное полотно, облака — вата.',
         why='Продолжает то, что уже есть в игре: вышитая карта-рушник и льняные полотна-переходы между уровнями; мороки — нитяные '
             'клубки, которые распутываются, — в этом стиле буквально из ниток. Самый уютный и «семейный».',
         ue='Ворс и шерсть (shell/fur-шейдер или карты нормалей ворса), стежки — декалями, вязаные поверхности — тайлами; свет «макросъёмки» '
            'и малая глубина резкости — постобработкой.',
         palette='натуральные красители: марена, индиго, берёзовый белый, мох, шафран',
         refs='«Варежка», Yarny/Unravel, Kirby\'s Epic Yarn, студия Laika, русская вышивка',
         lead='Handcrafted stop-motion animation still: needle-felted wool puppets on an embroidered textile miniature set.',
         char='Soft fuzzy wool fibers with visible felt texture, tiny glossy glass-bead eyes, stitched seams, knitted and crocheted clothing '
              'details, yarn and thread accessories. Photographed with a macro lens, soft warm practical lighting, gentle depth of field, '
              'cozy handmade feel. Palette of naturally dyed wool: madder red, indigo, birch white, moss green, saffron yellow. Puppets on a '
              'plain linen backdrop. Ultra HD, 4K, cinematic composition.',
         prop='Handmade from felt, yarn, linen, embroidery thread, beads and small real wood and brass pieces, visible fibers and stitches. '
              'Items laid out on a plain linen backdrop, photographed with a macro lens in soft warm light. Palette of naturally dyed wool: '
              'madder red, indigo, birch white, moss green, saffron, gold thread. Ultra HD, 4K, clean product composition.',
         scene='Miniature set built from felt, cross-stitch and satin-stitch embroidery on linen, knitted water and crocheted foliage, '
               'cotton-wool clouds and mist, buttons and beads as small details. Photographed with a macro lens, soft warm practical '
               'lighting, shallow depth of field, cozy handmade feel. Palette of naturally dyed wool: madder red, indigo, birch white, moss '
               'green, saffron yellow. Ultra HD, 4K, cinematic composition.',
         game='Game screenshot that looks like a stop-motion felt and embroidery miniature set: soft wool textures, stitched details, macro '
              'photography lighting, readable paths and characters from the camera. Ultra HD, 4K.',
         neg='CGI plastic, glossy smooth surfaces, realistic animals, real fur photo, digital painting, anime, vector art, cartoon outlines, '
             'low quality, blurry, noisy, deformed anatomy, extra limbs, creepy doll, uncanny, text, letters, captions, watermark, signature, '
             'logo, gore, horror'),
    dict(id='S3', ru='Книжка Билибина', en='Bilibin Storybook',
         idea='Классическая иллюстрация русской сказки: уверенный чёрный контур разной толщины, плоская акварельная заливка по бумаге, '
              'узорные одежды, шерсть и перья, завитые облака и волны, орнаментальная рамка.',
         why='Самый узнаваемый «русский сказочный» образ и самый читаемый с изометрии: силуэт и контур. Хорошо ложится на ролики-лубки '
             'Кота Учёного и на интерфейс (рамки, антиква, золотые бусины).',
         ue='Toon-шейдер с контуром (inverted hull / пост-контур), плоские ступенчатые тени, текстуры с узорами и зерном бумаги, '
            'графичные эффекты (вода, огонь, облака — завитками).',
         palette='кирпично-красный, шалфей, охра, индиго, золото, сливочная бумага',
         refs='Иван Билибин, русский модерн, Okami, Ni no Kuni (по технике cel-shading)',
         lead='Russian fairy-tale book illustration in the style of Ivan Bilibin and Russian Art Nouveau.',
         char='Confident black ink outlines of varied weight, flat watercolor fills with subtle paper grain, decorative folk patterns on '
              'clothing, fur and feathers, clear silhouettes readable at a glance, big expressive eyes. Muted rich palette: brick red, sage '
              'green, ochre, indigo, gold, on aged cream paper with a thin ornamental border. Ultra HD, flat graphic composition.',
         prop='Confident black ink outlines, flat watercolor fills with paper grain, ornamental engraving-like patterns, each item clearly '
              'separated on aged cream paper with a thin folk-ornament border. Muted rich palette: brick red, sage green, ochre, indigo, '
              'gold. Ultra HD, clean graphic composition.',
         scene='Confident black ink outlines, flat watercolor fills with paper grain, stylized curling clouds, waves, trees and hills made '
               'of rhythmic decorative patterns, a folk-ornament frame around the image, clear readable shapes and paths. Muted rich '
               'palette: brick red, sage green, ochre, indigo, gold, cream paper. Ultra HD, cinematic graphic composition.',
         game='Cel-shaded game screenshot in Bilibin storybook style: ink outlines, flat watercolor colors with paper grain, patterned '
              'surfaces, very readable silhouettes and paths from the camera, no frame around the image. Ultra HD, 4K.',
         neg='photorealistic, 3D render, CGI, glossy, airbrush, soft gradients, anime, manga, chibi, modern comic halftone, low quality, '
             'blurry, messy lines, deformed anatomy, extra limbs, text, letters, captions, watermark, signature, logo, gore, horror'),
    dict(id='S4', ru='Палехская шкатулка', en='Palekh Lacquer',
         idea='Лаковая миниатюра Палеха и Федоскина: глубокий чёрный фон, фигуры в яичной темпере светятся драгоценными цветами, '
              'сусальное золото штрихует шерсть, перья и одежду, вокруг — тонкие золотые завитки.',
         why='Самый драматичный и «дорогой» стиль: ночные уровни, боссы, Кощей, ролики и Сказы. Чёрный фон даёт идеальную '
             'контрастность — герои и всё, с чем можно взаимодействовать, светятся золотом.',
         ue='Тёмные сцены с сильным контровым светом, эмиссивные золотые штрихи (декали / мировой шейдер штриховки), '
            'лаковый блик на окружении, яркие «драгоценные» цвета героев.',
         palette='чёрный лак, киноварь, изумруд, ультрамарин, охра, сусальное золото',
         refs='палехская и федоскинская лаковая миниатюра, Гриша Голиков, Ori (по свету), Hades (по контрасту)',
         lead='Palekh lacquer miniature painting — Russian folk art on a black lacquered papier-mache box.',
         char='Deep glossy black background, figures painted in egg tempera with luminous jewel tones, fine gold-leaf hatching on fur, '
              'feathers and clothing, delicate gold ornamental scrolls around, graceful slightly elongated proportions yet kind expressive '
              'faces with large eyes, soft glowing rim light as if lit by the gold. Palette: black lacquer, vermilion, emerald, ultramarine, '
              'ochre, shining gold leaf. Ultra HD, 4K, cinematic composition.',
         prop='Items painted in egg tempera and gold leaf on a deep glossy black lacquer ground, fine gold hatching and engraving, delicate '
              'gold scrolls between them, soft glow. Palette: black lacquer, vermilion, emerald, ultramarine, ochre, shining gold. Ultra '
              'HD, 4K, elegant product composition.',
         scene='Deep black lacquer ground, stylized hills, trees, waves and architecture painted in egg tempera with luminous jewel tones, '
               'fine gold-leaf hatching and gold ornamental border scrolls, layered fairy-tale composition, magical glowing light sources. '
               'Palette: black lacquer, vermilion, emerald, ultramarine, ochre, shining gold. Ultra HD, 4K, cinematic composition.',
         game='Game screenshot in Palekh lacquer style: dark lacquer-black surroundings, characters and interactive objects painted in jewel '
              'tones and outlined with glowing gold leaf, magical light, very high contrast and readability. Ultra HD, 4K.',
         neg='photorealistic, 3D render, CGI plastic, flat vector, anime, manga, bright white background, pastel washed-out colors, low '
             'quality, blurry, deformed anatomy, extra limbs, text, letters, captions, watermark, signature, logo, gore'),
    dict(id='S5', ru='Бумажный театр', en='Paper Cut-out Theater',
         idea='Сказку разыгрывают в бумажном театре: фигурки вырезаны из цветного картона, суставы — на латунных гвоздиках, деревья и '
              'рамки — кружевная вытынанка, сцена из нескольких слоёв, а тёплый свет сзади просвечивает тонкую бумагу.',
         why='Продолжает театр теней эпилога и «книжность» Сказов; очень цельный и необычный для 3D-игры. Сцена-слоями сама подсказывает '
             'глубину и путь, марионеточные движения — понятный детям юмор.',
         ue='2.5D-слои из плоских мешей, бумага с просвечиванием (subsurface / two-sided foliage), параллакс, кружево — маской '
            'прозрачности; герои — объёмные из согнутого картона или плоские марионетки.',
         palette='3–4 цвета бумаги на сцену и один светящийся акцент',
         refs='вытынанка, театр теней, Tearaway, Paper Mario, «Сказка сказок» (по атмосфере)',
         lead='Layered paper cut-out theater diorama, inspired by Russian vytynanka paper cutting and shadow puppet theater.',
         char='Figures cut from colored card and handmade paper with crisp knife-cut edges and visible paper fibers, puppet-like limbs '
              'jointed with small brass pins, lace-like cut-out ornament details, slight paper relief and soft drop shadows between layers, '
              'warm backlight glowing through thin paper parts. Limited palette of 3-4 paper colors plus one glowing accent, against a '
              'softly backlit cream paper screen. Ultra HD, 4K, cinematic composition.',
         prop='Items cut and folded from colored card, gold foil and translucent tissue paper, crisp knife-cut edges, lace-like cut '
              'ornaments, soft drop shadows, laid out on a softly backlit cream paper screen. Limited palette plus one glowing accent. '
              'Ultra HD, 4K, clean composition.',
         scene='Scene built from several layers of cut paper at different depths with soft shadows between them, intricate lace-like '
               'vytynanka ornaments in trees, waves and borders, translucent rice-paper sky glowing with strong warm backlight, visible '
               'paper fibers and crisp cut edges, 2.5D stage parallax. Limited palette of 3-4 paper colors plus one glowing accent. Ultra '
               'HD, 4K, cinematic composition.',
         game='Game screenshot of a 2.5D paper theater: layers of cut paper with soft drop shadows, warm backlight through translucent '
              'paper, lace-cut ornaments, readable silhouettes and paths from the camera. Ultra HD, 4K.',
         neg='photorealistic, 3D CGI render, glossy plastic, painted gradients, anime, manga, pixel art, low quality, blurry, messy, '
             'deformed anatomy, extra limbs, text, letters, captions, watermark, signature, logo, gore, horror'),
]
SID = [s['id'] for s in STYLES]

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
MOROK = ('A morok is not a living creature: it is a creature woven from tangled dark-plum thread like a living ball of yarn, with loose '
         'thread ends, glowing ember-orange eyes and three small glowing embers floating above its head; mischievous and a bit spooky, '
         'never gory.')
LINEUP = 'Full bodies, readable scale, evenly spaced side by side, each one clearly separated, on a plain backdrop.'
MOROK_ACC = {
    'S1': 'The moroks are carved from dark stained wood wound with painted thread, ember eyes painted glowing orange.',
    'S2': 'The moroks are felted from dark tangled yarn with loose fibers sticking out, ember eyes of orange glass beads.',
    'S3': 'The moroks are drawn as tangled ink scribbles filled with plum wash, ember eyes in bright orange watercolor.',
    'S4': 'The moroks are dark plum tangles almost merging with the black lacquer, gold-hatched thread highlights, glowing ember eyes.',
    'S5': 'The moroks are cut from dark paper with lace-like tangled cut-outs, ember eyes are holes glowing with orange backlight.',
}

# ---------------------------------------------------------------- сущности: id, slug, вид, раздел, имя, что это (рус.), ядро (англ.), акценты по стилям
E = []


def ent(i, slug, kind, grp, ru, about, core, acc):
    assert set(acc) == set(SID), i
    E.append(dict(id=i, slug=slug, kind=kind, grp=grp, ru=ru, about=about, core=core, acc=acc))


# --- Герои
ent('H01', 'proshka', 'char', 'Герои', 'Прошка', 'лисёнок-изобретатель, рогатка',
    'Full-body character portrait of ' + PROSHKA + '. He aims his slingshot in a dynamic three-quarter pose, one eye squinted, a glowing '
    'acorn pellet ready to fly. The whole figure in frame, centered, standing on a small mossy patch of forest floor, lots of empty space.',
    {'S1': 'His body carved in sharp triangular facets, the tail three chunky carved tufts, a painted Gorodets flower on the belt buckle, the slingshot a whittled twig.',
     'S2': 'Felted from ginger and cream wool with a fluffy roving tail, a knitted green neckerchief, the slingshot a real little twig with red yarn.',
     'S3': 'Fur drawn as rhythmic ink strokes, the green neckerchief patterned with tiny folk flowers, the acorn pellet glowing gold.',
     'S4': 'Fur painted with fine gold-leaf hatching, the green neckerchief edged with gold scrolls, a golden glow on the acorn pellet.',
     'S5': 'Cut from orange and cream card, jointed with brass pins at shoulders and knees, the tail a lace-like cut fringe, the acorn pellet backlit and glowing.'})
ent('H02', 'potap', 'char', 'Герои', 'Потап', 'медвежонок-силач, подкидка',
    'Full-body character portrait of ' + POTAP + '. He crouches and lifts his huge paws, about to toss a friend high into the air (his '
    'signature toss move), cheerful and confident. The whole figure in frame, centered, standing on a small patch of meadow grass, lots of empty space.',
    {'S1': 'Carved round and blocky like a nesting-doll figure, the shirt painted with red Gorodets patterns, the bast shoes carved as a criss-cross relief.',
     'S2': 'Felted from chocolate-brown wool, a real cross-stitched linen shirt, a woven red sash with tassels, tiny woven bast shoes.',
     'S3': 'Bold round silhouette, ornate red embroidery patterns on the white shirt, fur as dense curled ink strokes.',
     'S4': 'Brown fur glowing with gold hatching, the white shirt covered in fine vermilion and gold embroidery.',
     'S5': 'Built from rounded brown card shapes with brass-pin joints, the shirt a white paper cut with red lace embroidery, the sash a strip of red tissue paper.'})
ent('H03', 'pelageya', 'char', 'Герои', 'Пелагея', 'совушка-сказительница, Совиный взор',
    'Full-body character portrait of ' + PELAGEYA + ', a small handmade notebook of fairy tales under her wing. She glides with wings '
    'spread wide, her golden eyes glowing with the Owl Sight that reveals hidden things. The whole figure in frame, centered, '
    'hovering above a small patch of evening grass, lots of empty space.',
    {'S1': 'Carved as a smooth egg-shaped wooden figure, feathers painted as scale-like dabs, the kokoshnik a gilded carved hoop with red bead dots.',
     'S2': 'Felted lilac wool with stitched feather rows, big embroidered golden eyes, a tiny bead kokoshnik and a real miniature paper notebook.',
     'S3': 'Feathers as a decorative scale pattern of ink and violet watercolor, eyes ringed in gold, an ornamental kokoshnik.',
     'S4': 'Lilac plumage with gold-leaf feather hatching, glowing golden eyes casting a soft beam of light into the dark.',
     'S5': 'Cut from layered lilac and violet paper with lace-like feather cut-outs, the eyes thin golden paper glowing with backlight.'})
ent('H04', 'yosha', 'char', 'Герои', 'Йоша', 'ёжик-водонос, ковшик с живой водой',
    'Full-body character portrait of ' + YOSHA + '. He pours a sparkling stream of glowing turquoise living water from his ladle onto a '
    'tiny sprouting flower, proud and a little shy. The whole figure in frame, centered, on a small patch of riverside pebbles, lots of empty space.',
    {'S1': 'Carved as a round wooden ball figure with spines of carved turquoise wedges, the ladle a tiny painted kovsh with a horse-head handle.',
     'S2': 'A felted ball of turquoise wool tufts as spines, pink felt cheeks, a carved wooden ladle on a braided cord, water drops as glass beads.',
     'S3': 'Spines as a rhythmic pattern of turquoise ink spikes, the living water drawn as curling ornamental streams.',
     'S4': 'Turquoise spines tipped with gold, the living water painted as a glowing turquoise ribbon with gold sparkles.',
     'S5': 'Spines made of many small cut paper triangles in turquoise shades, the water a translucent blue tissue paper stream glowing in backlight.'})
ent('H05', 'patrul', 'char', 'Герои', 'Лесной патруль', 'все четверо у штаба-сосны',
    'Group portrait of the Forest Patrol, four animal friends standing together in front of their headquarters, a huge old pine tree '
    'with a little door, round windows and lanterns in its trunk: ' + SHORT + '. Heroic yet cozy group pose, strong contrast of sizes '
    'and colors (slim ginger and stout brown, round lilac and tiny turquoise), all four full-body and clearly readable.',
    {'S1': 'Everything carved and painted like a set of folk wooden toys displayed together, the pine headquarters with carved ornamented window frames.',
     'S2': 'All four as felted wool puppets on a felted moss mound, the pine trunk of wrapped yarn and burlap, lanterns of glowing beads.',
     'S3': 'Composed like a book frontispiece, the pine with ornamental bark patterns, a decorative folk border of pine cones and acorns.',
     'S4': 'Composed like a lacquer box lid: the four friends glowing on black ground, the pine painted with gold needles, gold scrolls around.',
     'S5': 'Staged like a paper puppet theater: the pine a lace-cut silhouette, warm light glowing through its round windows, the friends as jointed paper puppets.'})

# --- Жители
ent('N01', 'lukomorye_mastera', 'char', 'Жители', 'Хранители Лукоморья', 'Кот Учёный, кузнецы Кузьма и Демьян, белка Векша',
    'Character lineup of the keepers of Lukomorye: the Learned Cat (Kot Uchyony) — a tall wise grey tabby cat in a long scholar\'s '
    'kaftan with round spectacles, holding a scroll, a thin golden chain over his shoulder; Kuzma the blacksmith — a broad kind old man '
    'with a big grey beard, leather apron and heavy hammer; Demyan the second blacksmith — a lean younger smith with long tongs and a '
    'soot-smudged face; Veksha the squirrel merchant — a lively red squirrel in a headscarf with a tray of golden nuts. ' + LINEUP,
    {'S1': 'Each figure carved and painted like a traditional Bogorodskaya toy, the chain a gilded carved chain, the hammer a chunky wooden mallet.',
     'S2': 'Felted wool figures with a real tiny metal chain, a leather-scrap apron, a knitted kaftan, bead spectacles.',
     'S3': 'Bilibin manner with ornate patterned kaftans and aprons, the cat in a richly patterned scholar\'s robe.',
     'S4': 'Figures glowing on black lacquer with gold hatching on the cat\'s fur and the smiths\' beards, anvil sparks as gold dots.',
     'S5': 'Jointed paper puppets with lace-cut kaftans and aprons, the chain a strip of gold foil paper, sparks as tiny backlit holes.'})
ent('N02', 'lukomorye_zhiteli', 'char', 'Жители', 'Жители Лукоморья', 'Дедка с репкой, Курочка Ряба, бельчонок Тишка, Русалка, Садко',
    'Character lineup of the villagers of Lukomorye on a seaside meadow: Dedka the old gardener — a small bent old man in a straw hat and '
    'patched shirt pulling a giant turnip; Ryaba the speckled hen with three chicks and a golden egg; Tishka — a tiny baby squirrel with a '
    'huge fluffy tail hugging a honey pot; a gentle mermaid with long green hair sitting on a low willow branch; Sadko — a young '
    'musician-merchant in a blue kaftan playing a wing-shaped gusli. ' + LINEUP,
    {'S1': 'Carved folk figurines on a carved seaside base, the turnip painted with bright Gorodets flowers, the hen speckled with painted dots.',
     'S2': 'Felted villagers, a crocheted giant turnip, a speckled felt hen with felt chicks, the mermaid\'s hair of green yarn, the gusli with real thread strings.',
     'S3': 'Bilibin manner: patterned shirts and headscarves, the mermaid\'s hair in curling Art Nouveau waves, stylized willow branches.',
     'S4': 'Figures glowing on black lacquer, the golden egg and the gusli shining with gold leaf, the sea painted as gold-hatched waves.',
     'S5': 'Paper puppets with lace-cut details, the willow a lace-cut silhouette, the sea in layered blue paper waves.'})
ent('N03', 'les_zhiteli', 'char', 'Жители', 'Жители Дремучего леса', 'Баба Яга, Кикимора, Колобок, Журавль и Цапля, Бесёнок',
    'Character lineup of the Dark Forest folk: Baba Yaga — a hunched long-nosed but funny old witch in a bright patterned headscarf, '
    'standing in her wooden mortar with a pestle and a broom; Kikimora — a thin swamp spinner woman with tangled moss-green hair beside '
    'her spinning wheel; Kolobok — a round golden bread bun with a cheeky face; the Crane and the Heron — two tall elegant wading birds '
    'bowing to each other; a little imp (Besyonok) with tiny horns and a tail, playful, not scary. ' + LINEUP,
    {'S1': 'Carved like painted folk toys: the mortar with chisel marks, the spinning wheel ornamented, Kolobok a round bun with a painted smile.',
     'S2': 'Felted characters: Yaga\'s headscarf a knitted patterned shawl, Kikimora\'s hair of tangled moss-green yarn, Kolobok a felt ball, the birds of white and grey wool.',
     'S3': 'Classic Bilibin Baba Yaga manner with patterned skirts, twisting forest ornament, the birds drawn with elegant Art Nouveau lines.',
     'S4': 'Figures glowing on black lacquer, gold hatching on Yaga\'s shawl and the birds\' feathers, the imp in vermilion with gold sparks.',
     'S5': 'Jointed paper puppets, Kikimora\'s hair cut as lacy fringes, Kolobok a backlit golden paper disc, the birds as elegant white cut-outs.'})
ent('N04', 'kitezh_zhiteli', 'char', 'Жители', 'Жители Подводного Китежа', 'Морской царь, Золотая рыбка, Ёрш, Рыба-кит',
    'Character lineup of the Underwater Kitezh folk in turquoise water: the Sea King — a jolly bearded underwater tsar with a coral crown '
    'and a trident, dancing; the Golden Fish — a small shining golden fish with a tiny crown; Yorsh — a spiky little ruffe fish, a brave '
    'guide; and behind them the Fish-Whale (Ryba-Kit) — an enormous friendly whale carrying a whole wooden village with huts and a little '
    'church on its back. Full bodies, readable scale, each one clearly separated.',
    {'S1': 'Carved and painted underwater figures, the coral crown carved in red, the whale carved with a tiny painted village on its back.',
     'S2': 'Felted sea creatures, a crocheted coral crown, the golden fish of shiny gold felt with sequins, the whale knitted with a tiny felt village.',
     'S3': 'Bilibin manner: ornamental waves and fish scales as decorative patterns, the Sea King in a richly patterned robe.',
     'S4': 'Glowing on black lacquer: the golden fish and the crown shimmering with gold leaf, waves in fine gold hatching, the whale\'s village gold-ornamented.',
     'S5': 'A layered blue paper sea, characters as paper puppets with lace-cut fins and scales, the golden fish of gold foil glowing in backlight.'})
ent('N05', 'nebo_ptitsy', 'char', 'Жители', 'Небесные птицы', 'Жар-птица, Сирин и Алконост, Гуси-лебеди',
    'Character lineup of the magical birds of the Heavenly Kingdom: the Firebird (Zhar-ptitsa) — a magnificent bird with flame-like '
    'golden-orange feathers and a long glowing tail; Sirin and Alkonost — two mythical birds with gentle maiden faces and small crowns, '
    'one with dark plum plumage, one bright and sunny; a pair of Geese-Swans (Gusi-lebedi) — big white geese with dark wingtips, '
    'swooping. Full bodies, readable scale, each one clearly separated, on a plain lilac sky backdrop.',
    {'S1': 'Carved wooden birds like Polkhov-Maidan painted toys, the Firebird\'s tail carved as stacked flame-shaped plates painted orange and gold.',
     'S2': 'Felted birds with feathers of layered wool and silk threads, the Firebird\'s tail of orange and gold yarn and sequins, the geese of white wool.',
     'S3': 'Bilibin manner: ornamental feathers in rhythmic patterns, the maiden faces with tiny crowns, Art Nouveau curls of clouds.',
     'S4': 'The classic Palekh Firebird glowing on black lacquer with flame feathers in gold leaf, Sirin and Alkonost with gold-hatched wings.',
     'S5': 'Birds cut from paper with lace-like feather cut-outs, the Firebird\'s tail of translucent orange tissue paper glowing with backlight.'})
ent('N06', 'nebo_buyan_pomoshniki', 'char', 'Жители', 'Помощники Неба и Буяна', 'Дед-Садовник, ягнёнок Пушок, Ветер-Ветрило, Царевна-Лебедь, Голова',
    'Character lineup of fairy-tale helpers: Ded-Sadovnik — an old orchard keeper with a long white beard and a basket of glowing '
    'rejuvenating apples; Pushok — a fluffy cloud-white lamb; Veter-Vetrilo — the Wind as a puffy-cheeked bearded cloud spirit blowing; '
    'the Swan Princess — a graceful white swan with a small crown and a star on her forehead; the Giant Head from the poem Ruslan and Lyudmila — '
    'a huge sleepy bogatyr\'s head in a pointed helmet, half-buried in rocks, blowing wind. ' + LINEUP,
    {'S1': 'Carved painted figures: apples painted gold, the lamb carved in curly blobs, the Wind a carved cloud with puffed cheeks, the Head a large carved helmeted face.',
     'S2': 'Felted figures: the lamb of fluffy cream wool, the Wind a cotton-wool cloud with felt cheeks, the swan of white felt with a bead crown, the Head a big felted face in a knitted helmet.',
     'S3': 'Bilibin manner: the Wind as a classic puffy-cheeked cloud face, the swan with an ornamental crown and star, the Head framed by patterned rocks.',
     'S4': 'Glowing on black lacquer: the apples and the swan\'s crown in gold leaf, the Wind\'s breath as gold-hatched streams.',
     'S5': 'Paper cut-outs: the lamb of curled paper strips, the Wind a layered white paper cloud, the swan a delicate white cut-out with a gold foil star.'})
ent('N07', 'bogatyri', 'char', 'Жители', 'Три богатыря', 'Илья Муромец, Добрыня Никитич, Алёша Попович',
    'Character lineup of the three bogatyrs of the frontier outpost (zastava): Ilya Muromets — a huge calm bearded warrior with a heavy '
    'mace and a round shield; Dobrynya Nikitich — a noble warrior with a sword and a red cloak; Alyosha Popovich — a young cheerful '
    'archer with a bow and a sly smile. All in chainmail and pointed helmets, stylized and friendly towards children, chunky proportions. ' + LINEUP,
    {'S1': 'Carved like chunky folk toy soldiers, chainmail carved as a painted scale pattern, helmets gilded.',
     'S2': 'Felted bogatyrs with knitted chainmail, felt cloaks, a tiny wooden mace and bow.',
     'S3': 'Heroic composition in Bilibin linework, ornamented shields and armor patterns.',
     'S4': 'Glowing on black lacquer, armor and helmets hatched with gold leaf, red cloaks in vermilion.',
     'S5': 'Jointed paper puppets with lace-cut chainmail texture, shields of gold foil paper, strong backlight.'})

# --- Боссы
ent('B01', 'leshy', 'char', 'Боссы', 'Леший-Путаник', 'босс мира 1, Дремучий лес',
    'Boss character: Leshy the Tangler, the forest spirit of the Dark Forest — a giant as tall as a fir tree, a body of gnarled bark and '
    'moss, a long beard of moss, antler-like branches with leaves, a bird\'s nest with chicks on his head, glowing amber eyes, enormous '
    'snag-like root hands spreading like spiders from his shoulders; tricky and mischievous rather than evil. He looms over a dark fir '
    'clearing with a big stump and fireflies; two tiny animal heroes at his feet for scale.',
    {'S1': 'The whole giant carved from gnarled wood with deep chisel cuts, moss painted as green flocking, his snag-hands carved roots.',
     'S2': 'Felted from bark-brown and moss-green wool with real twigs and lichen, the nest of woven yarn with tiny felt chicks.',
     'S3': 'Bilibin manner: bark as dense ornamental ink patterns, the beard in flowing moss curls, firs stylized as tall patterned triangles.',
     'S4': 'Glowing on black lacquer: bark in deep green and ochre with gold hatching, eyes glowing amber, fireflies as gold dots.',
     'S5': 'Built from layered dark-green and brown paper, the beard and antlers lace-cut, his eyes and the fireflies glowing through holes in the paper.'})
ent('B02', 'vodyanoy', 'char', 'Боссы', 'Водяной', 'босс мира 2, Подводный Китеж',
    'Boss character: Grandfather Vodyanoy, the water spirit — a huge fat old man with greenish wet skin, a long beard of waterweed, a crown '
    'of river reeds and shells, webbed hands, riding a giant whiskered catfish. Behind him rises a towering wave with golden sparks and '
    'musical notes inside, a stormy lilac evening sky, water horses leaping from the foam, the golden domes of sunken Kitezh beneath the '
    'water; two tiny animal heroes on a lily pad for scale.',
    {'S1': 'Carved and painted like a giant folk toy, the wave carved as stylized scrolls, the catfish painted with patterns.',
     'S2': 'Felted from green-grey wool with a yarn waterweed beard, the wave knitted in blue with golden thread sparkles, the catfish of felt.',
     'S3': 'Bilibin manner: the wave as a great curling ornamental crest, the beard flowing in Art Nouveau lines.',
     'S4': 'Glowing on black lacquer: the great wave with gold-hatched crests and golden notes, the church domes gleaming gold.',
     'S5': 'Layered blue paper waves with lace-cut foam, Vodyanoy as a big paper puppet, lightning as cut gaps glowing in backlight.'})
ent('B03', 'solovey', 'char', 'Боссы', 'Соловей-Разбойник', 'босс мира 3, Небесное царство',
    'Boss character: Solovei the Robber (Nightingale the Robber) — a huge feathered bird-bandit with a nightingale\'s body and beak, a '
    'bushy mustache, a red sash and a crooked knife, puffing his cheeks and whistling a visible white shock wave. He perches on a giant '
    'nest built atop nine oak trees above the clouds, wind serpents swirling around; two tiny animal heroes hiding behind a stone for scale.',
    {'S1': 'Carved like a giant painted folk clay-whistle bird toy, the shock wave carved as white scrolls.',
     'S2': 'Felted feathers in brown and rust wool, a yarn mustache, the shock wave of cotton-wool swirls, the nest of real twigs.',
     'S3': 'Bilibin manner: the oak tops and the nest as ornamental patterns, the whistle shown as swirling decorative lines.',
     'S4': 'Glowing on black lacquer: plumage hatched with gold, the whistle as gold spirals, wind serpents in emerald and gold.',
     'S5': 'A paper puppet bird with lace-cut feathers, the whistle as concentric white paper rings, oaks as layered lace silhouettes.'})
ent('B04', 'gorynych', 'char', 'Боссы', 'Змей Горыныч', 'босс мира 4, потом друг и ездовой змей',
    'Boss character: Zmey Gorynych, the three-headed dragon of the fiery Smorodina river — a big green-and-bronze dragon with three '
    'distinct heads: the left one sleepy and yawning, the right one hungry and drooling, the middle one breathing fire; small wings, a '
    'scaly belly, a long tail. Glowing lava cracks, basalt columns and the carved Kalinov bridge behind him. Fearsome with a hint of '
    'comedy: he will later become the heroes\' friend and flying mount. Two tiny animal heroes in front for scale.',
    {'S1': 'Carved and painted like a giant folk toy dragon with Filimonovo clay-toy stripes, lava painted as glowing orange stripes.',
     'S2': 'Felted from green and bronze wool with sequin scales, the fire of orange and yellow yarn and silk, the lava of knitted orange fabric.',
     'S3': 'Bilibin manner: scales as a rhythmic ornamental pattern, flames as stylized curling tongues, patterned basalt columns.',
     'S4': 'Glowing on black lacquer: green scales hatched with gold, fire painted in vermilion and gold, sparks as gold dots.',
     'S5': 'A paper dragon puppet with necks jointed on brass pins, lace-cut scales, fire and lava of orange tissue paper glowing in backlight.'})
ent('B05', 'koschei', 'char', 'Боссы', 'Кощей Бессмертный', 'главный антагонист, финал',
    'Final boss character: Koschei the Deathless — a very tall, skeletally thin dark sorcerer-tsar with bone-pale skin, a long sharp face, '
    'hollow glowing eyes, a tall spiked golden crown, a dark purple-black robe with gold trim, long bony fingers. Black chains rise from '
    'the ground around him like snakes, black candles burn, heaps of gold glitter; behind him the great oak with the golden chain. '
    'Menacing and theatrical, yet suitable for children. Two tiny animal heroes facing him for scale.',
    {'S1': 'Carved from dark stained wood, very angular and thin, the crown gilded, the chains carved black, the gold heaps painted.',
     'S2': 'Felted from black and plum wool on a thin wire armature, a crown of gold thread and beads, black chains of crocheted yarn.',
     'S3': 'Classic Bilibin Koschei: a gaunt figure in an ornate dark robe, patterned gold, a sharp silhouette against a decorative sky.',
     'S4': 'The perfect Palekh villain: the black robe merging with the lacquer ground, only gold-hatched edges, the crown and the eyes glowing.',
     'S5': 'A tall black paper silhouette puppet with a lace-cut robe, glowing eye holes and a gold foil crown, casting a huge shadow on the backlit screen.'})

# --- Мини-боссы
ent('M01', 'miniboss_1', 'char', 'Мини-боссы', 'Мини-боссы I', 'Аука, Веретенник, Рак-Отшельник',
    'Mini-boss lineup: Auka — a small mischievous forest echo spirit, a round fluffy creature of leaves and mist with a hollow open mouth, '
    'peeking out of a tree hollow, glowing golden echo rings around it; Veretennik — the living spindle of the swamp witch wrapped in a '
    'cocoon of black tow, spinning, with thread tentacles; Rak-Otshelnik — a giant hermit crab hiding in a huge ornate sea shell, with big '
    'pincers. ' + LINEUP,
    {'S1': 'Carved and painted figures: Auka a round carved face in a hollow, the spindle a turned and painted wooden spindle, the crab shell carved with ornament.',
     'S2': 'Felted: Auka of leaf-green wool with a mist of cotton wool, the spindle wrapped in black raw wool tow, the crab of red felt in a crocheted shell.',
     'S3': 'Bilibin manner: decorative patterns on the shell and the tow, echo rings as ornamental circles.',
     'S4': 'Glowing on black lacquer with gold-hatched details, the echo rings and the spindle threads in gold.',
     'S5': 'Paper puppets with lace-cut shell and tow, the echo rings as concentric cut paper circles glowing in backlight.'})
ent('M02', 'miniboss_2', 'char', 'Мини-боссы', 'Мини-боссы II', 'Кощеев Ворон, Громовой Баран, Лихо Одноглазое',
    'Mini-boss lineup: Koshcheev Voron — a huge black raven of Koschei with glowing eyes and ragged wings; Gromovoy Baran — a thunder ram '
    'with storm-cloud fleece and curled golden horns crackling with lightning; Likho Odnoglazoe — a huge shaggy one-eyed giant, sleepy and '
    'grumpy, guarding a chain of a magic chest. ' + LINEUP,
    {'S1': 'Carved painted figures: the raven carved black with painted eyes, the ram\'s fleece carved as cloud curls, Likho carved shaggy with one big painted eye.',
     'S2': 'Felted: the raven of black wool with feather stitching, the ram of grey cloud-like wool with golden yarn horns, Likho a huge shaggy felt creature with one glass eye.',
     'S3': 'Bilibin manner: ornamental feathers and fleece, lightning as zigzag ornament, Likho\'s fur as dense ink hatching.',
     'S4': 'Glowing on black lacquer: the raven nearly merging with the black, gold-hatched feathers, the ram\'s horns and lightning in gold.',
     'S5': 'Paper puppets: the raven a black lace-cut silhouette, the ram of curled grey paper, Likho a big shaggy paper puppet with one glowing eye hole.'})

# --- Мороки (враги): ядро = определение морока + состав, акцент = общий акцент морока в стиле + мир
WORLD_ACC = {
    'les': {'S1': 'Painted moss and pine cones on the base.', 'S2': 'A felted moss ground.', 'S3': 'Small ornamental fir motifs at the edges.',
            'S4': 'Tiny gold fireflies around.', 'S5': 'Lace-cut fir silhouettes behind.'},
    'kitezh': {'S1': 'Carved seaweed and shells on the base.', 'S2': 'Bubbles of glass beads and knitted seaweed.', 'S3': 'Small ornamental waves at the edges.',
               'S4': 'Turquoise and gold water hatching.', 'S5': 'Layered blue paper water behind.'},
    'nebo': {'S1': 'Carved lavender cloud puffs on the base.', 'S2': 'Cotton-wool clouds.', 'S3': 'Small ornamental clouds at the edges.',
             'S4': 'Lilac and gold sky hatching.', 'S5': 'Layered lilac paper clouds behind.'},
    'ogon': {'S1': 'Painted glowing lava stripes on the base.', 'S2': 'Knitted orange lava and bead sparks.', 'S3': 'Small ornamental flame curls at the edges.',
             'S4': 'Vermilion and gold sparks.', 'S5': 'Orange tissue paper lava glowing behind.'},
    'buyan': {'S1': 'Carved sand and pebbles on the base.', 'S2': 'Embroidered sand and sea.', 'S3': 'Small ornamental waves at the edges.',
              'S4': 'Rose-gold dawn hatching.', 'S5': 'Layered sand and turquoise paper behind.'},
    'koschei': {'S1': 'Scattered painted gold coins.', 'S2': 'Gold thread coins scattered.', 'S3': 'A dark ornamental sky behind.',
                'S4': 'Heaps of gold leaf coins.', 'S5': 'Gold foil coins scattered.'},
}


def moroki(i, slug, ru, about, world, cast):
    core = 'Enemy lineup — moroks of ' + world[1] + '. ' + MOROK + ' From left to right: ' + cast + ' ' + LINEUP
    ent(i, slug, 'char', 'Мороки (враги)', ru, about, core, {s: MOROK_ACC[s] + ' ' + WORLD_ACC[world[0]][s] for s in SID})


moroki('E01', 'moroki_les', 'Мороки Пролога и леса', 'колючий клубок, кикиморка с ложкой, пень-ворчун, лешачонок, тать-паутинник',
       ('les', 'the Dark Forest'),
       'the Prickly Ball — a small spiky tangle; Kikimorka with a Spoon — a little swamp creature waving a wooden spoon; the Grumbling '
       'Stump — a big angry stump with a cracked bark shell; Leshachonok — a quick little forest imp in a cap of moss; Tat-Pautinnik — a '
       'spider-like thread thief gnawing on a yarn string.')
moroki('E02', 'moroki_kitezh_1', 'Мороки Китежа I', 'щука-морок, рак-щипач, жемчужница, тягун', ('kitezh', 'Underwater Kitezh'),
       'the Pike-morok — a pike-shaped tangle blowing blue bubbles; Rak-Shchipach — a pinching crayfish raising a red claw; Zhemchuzhnitsa '
       '— a stationary pearl oyster spitting pearls; Tyagun — a long eel-like dragger half-buried in silt.')
moroki('E03', 'moroki_kitezh_2', 'Мороки Китежа II', 'тинник, пузырник, чайка, прилипала', ('kitezh', 'Underwater Kitezh and the Fish-Whale'),
       'Tinnik — a slow hulking creature of tangled waterweed; Puzyrnik — a blob puffing itself up like a balloon; the Gull — a diving '
       'seagull with spread wings; Prilipala — a small sucker fish ready to cling to a hero.')
moroki('E04', 'moroki_nebo', 'Мороки Небесного царства', 'тень, грозовая тучка, двусветный мотылёк, ворона-морок', ('nebo', 'the Heavenly Kingdom'),
       'the Shadow — a flat, paper-thin shadow creature; the Little Storm Cloud — a grumpy cloud dropping a lightning drop; the Two-Light '
       'Moth — a large moth with two glowing eye-spots on its wings; the Crow-morok — a crow snatching a lantern with a black key on its neck.')
moroki('E05', 'moroki_ogon', 'Мороки Огненной Смородины', 'чугунный болван, жар-ящерка, печник, змеёныш', ('ogon', 'the Fiery Smorodina'),
       'the Cast-Iron Dummy — a heavy figure in red-hot armor with a breastplate; the Heat Lizard — a lizard on a pole spitting a little '
       'flame; the Stove-Keeper (Pechnik) — a living clay stove with a door for a mouth glowing with coals; the Little Serpent — a young '
       'lava snake rising from a lava pool.')
moroki('E06', 'moroki_buyan', 'Мороки Буяна', 'пугало-страж, хамелей, тень-двойник, коршун', ('buyan', 'Buyan Island'),
       'the Scarecrow Guard — a straw scarecrow waving its sleeves; Khameley — a chameleon-like morok shifting colors and copying magic '
       'signs; the Shadow Double — a dark thread silhouette copying a little fox cub hero; the Kite — a circling bird of prey.')
moroki('E07', 'moroki_koschei', 'Кощеева рать', 'цепь Кощея, чёрная свеча, ключ, ворон Кощея, костяной страж', ('koschei', 'Koschei\'s host'),
       'the Chain of Koschei — a black chain growing out of the ground like a serpent; the Black Candle — a living black candle dripping '
       'dark wax; the Key — a small hopping iron key; Koschei\'s Raven — a diving black raven; the Bone Guard — a lanky cartoonish '
       'skeleton-like guard with a spear, funny rather than scary.')

# --- Места
ent('L01', 'shtab_sosna', 'scene', 'Окружение', 'Штаб-сосна (Пролог)', 'дом «Лесного патруля», вечер, Звенышко',
    'Wide establishing shot of the Forest Patrol headquarters: a giant ancient pine tree with a cozy treehouse built into its trunk and '
    'branches — round windows, a wooden door, rope ladders, lanterns, a lookout platform. Evening twilight, a glowing golden chain link '
    '(Zvenyshko) flies through the dark between the branches leaving a trail of light, fireflies, a winding path below. No characters.',
    {'S1': 'The pine and treehouse carved and painted like a giant folk toy, window frames with carved nalichniki, lanterns painted glowing.',
     'S2': 'The pine trunk of wrapped brown yarn and burlap, needles of green felt tufts, windows glowing through thin fabric, fireflies as tiny glowing beads.',
     'S3': 'Bilibin manner: the bark as an ornamental pattern, a night sky with curling stylized clouds and stars, a border of pine branches.',
     'S4': 'Glowing on black lacquer: the night forest in deep greens, windows and lanterns in gold, the golden link leaving a trail of gold hatching.',
     'S5': 'The pine a lace-cut paper silhouette in front of a glowing backlit paper moon, warm light through round window cut-outs.'})
ent('L02', 'lukomorye', 'scene', 'Окружение', 'Лукоморье', 'хаб: дуб со Златой цепью, кузня, огород, причал',
    'Wide establishing shot, slightly elevated view, of Lukomorye, the hub: a seaside meadow at warm sunset with a great green oak and a '
    'golden chain wound around its trunk, a cat walking along the chain, a mermaid on a branch, a blacksmith\'s forge with smoke, a small '
    'market stall, a vegetable garden with a giant turnip, a wooden pier with boats, a hut on chicken legs at the edge of the forest. '
    'Peach and gold palette, cozy and inviting.',
    {'S1': 'The whole hub as a carved and painted wooden diorama, oak leaves carved, the sea as stylized carved waves.',
     'S2': 'A felted and embroidered landscape: the oak of brown yarn with felt leaves, the sea in satin-stitch embroidery, the chain of real gold thread.',
     'S3': 'A classic Bilibin Lukomorye composition with an ornamental oak and waves, framed by a folk border.',
     'S4': 'A Palekh box-lid scene: the oak, the sea and the village glowing on black lacquer, the chain and the sunset in gold leaf.',
     'S5': 'A paper theater stage of layered cut-paper planes: the oak a lace-cut silhouette, the sunset glowing through translucent paper.'})
ent('L03', 'dremuchiy_les', 'scene', 'Окружение', 'Мир 1 · Дремучий лес', 'сумрачный ельник, болото, избушка, струны клубка',
    'Wide establishing shot of the Dark Forest (World 1): a dense blue-green twilight fir forest with moss and huge roots, a hut on chicken '
    'legs in a clearing, a misty bog with glowing yarn strings stretched between wooden pegs as bridges, yellow stone pressure plates, an '
    'old spinning wheel, fireflies. Mysterious but cozy. No characters.',
    {'S1': 'Firs carved as stacked cone tiers, the hut\'s chicken legs carved, the bog painted with stylized ripples.',
     'S2': 'Felted firs, moss of green felt, the bog of brown knitted fabric with glass-bead bubbles, yarn strings between wooden pegs.',
     'S3': 'The Bilibin dark forest: tall patterned firs, ornamental roots and mist, a folk border.',
     'S4': 'Glowing on black lacquer: a deep blue-green forest, fireflies and yellow plates as gold dots, the yarn strings golden.',
     'S5': 'Several layers of lace-cut fir silhouettes in blue-green paper, mist of translucent tissue, fireflies as glowing pin holes.'})
ent('L04', 'kitezh', 'scene', 'Окружение', 'Мир 2 · Подводный Китеж', 'затонувший град, купола, прилив и отлив',
    'Wide establishing shot of Underwater Kitezh (World 2): a sunken white-stone Russian city with golden onion domes and bell towers under '
    'turquoise water, sun rays from the surface, seaweed and shells, a big conch shell marking a tide zone with a little boat on a pole, '
    'fish swimming; on one side the water has drained away (low tide), revealing sandy streets. No characters.',
    {'S1': 'The sunken city carved and painted, onion domes gilded, light rays as painted beams, seaweed as carved ribbons.',
     'S2': 'An embroidered underwater city: white felt walls, gold thread domes, seaweed of knitted green, light rays of sheer organza.',
     'S3': 'Bilibin manner: ornamental waves above, patterned white-stone architecture, fish as decorative motifs.',
     'S4': 'Glowing on black lacquer in turquoise and gold: shimmering domes, gold-hatched light rays, fish as gold accents.',
     'S5': 'Layers of blue and turquoise translucent paper, the city a lace-cut white silhouette with gold foil domes glowing in backlight.'})
ent('L05', 'nebesnoe_tsarstvo', 'scene', 'Окружение', 'Мир 3 · Небесное царство', 'облака, сад молодильных яблок, светомостки, летучий корабль',
    'Wide establishing shot of the Heavenly Kingdom (World 3): a lilac and lavender sky realm of floating cloud islands, a garden of '
    'glowing rejuvenating apples, golden light-bridges and violet shadow-bridges between the islands, a flying wooden ship with sails, the '
    'warm light of a Firebird feather, gentle cloud pastures with lambs. No characters.',
    {'S1': 'Clouds carved as smooth wooden puffs painted lavender, the flying ship a carved toy boat, the apples painted gold.',
     'S2': 'Clouds of cotton wool and white felt, light-bridges of gold ribbon, shadow-bridges of violet felt, the ship knitted with fabric sails.',
     'S3': 'Bilibin manner: curling ornamental clouds, the ship with patterned sails, apples as golden ornament.',
     'S4': 'Lacquer painting shifted to lilac and violet: clouds outlined in gold, the feather light as a gold radiance.',
     'S5': 'Layers of white and lilac paper clouds, golden bridges of foil, the ship a delicate cut-out, warm feather light glowing through.'})
ent('L06', 'smorodina', 'scene', 'Окружение', 'Мир 4 · Огненная Смородина', 'лавовая река, базальт, Калинов мост, кузня',
    'Wide establishing shot of the Fiery Smorodina (World 4): a river of orange lava under a charcoal-red sky, sharp basalt peaks and '
    'columns, the carved Kalinov bridge spanning the fire river, a blacksmith forge built into the rock with glowing anvils, ember sparks '
    'and ash in the air. Ochre and deep red palette, heroic and hot. No characters.',
    {'S1': 'Basalt carved as faceted columns, the lava painted bright orange with carved flow lines, the bridge carved with ornament.',
     'S2': 'Lava of knitted orange and red yarn with sequins, basalt of dark grey felt, sparks as tiny orange beads, smoke of grey cotton.',
     'S3': 'Bilibin manner: lava as ornamental curls, sharp patterned peaks, the bridge decorated with folk carving patterns.',
     'S4': 'Fiery vermilion and gold on black lacquer, sparks as gold dots, glowing anvils.',
     'S5': 'Layers of dark paper peaks, orange tissue paper lava glowing with strong backlight, the bridge a lace-cut silhouette.'})
ent('L07', 'buyan', 'scene', 'Окружение', 'Мир 5 · Остров Буян', 'дуб с сундуком, Алатырь-камень, терем Кощея',
    'Wide establishing shot of Buyan Island (World 5): a sunny island in a turquoise sea at pink dawn, the white Alatyr stone with glowing '
    'magic signs, a huge ancient oak with an iron-bound chest hanging on chains from its branches, birches, sand and boats; on a distant '
    'cliff the dark tower (terem) of Koschei under swirling clouds. No characters.',
    {'S1': 'The island carved like a wooden toy set, the chest with painted iron bands, the stone with carved glowing signs, the sea in carved waves.',
     'S2': 'An embroidered island: the oak of yarn, the chest of felt with stitched iron bands, the sea in blue satin stitch, Koschei\'s tower of black felt.',
     'S3': 'Bilibin manner: the island framed by ornamental waves and a border, the oak patterned, the dark tower stylized.',
     'S4': 'Glowing on black lacquer: the dawn in rose and gold, the signs on the stone in gold leaf, the tower dark with gold edges.',
     'S5': 'A layered paper island, the oak a lace-cut silhouette, the stone signs as glowing cut-out symbols, the tower a black cut silhouette.'})

# --- Предметы
ent('I01', 'zlataya_tsep', 'prop', 'Предметы', 'Златая цепь и Звенышко', 'живое звено, цепь, звенья, орешки, колокольчик',
    'Prop sheet of the Golden Chain: in the center Zvenyshko — a single living golden chain link with a tiny warm spark-heart inside, '
    'trembling and sending ripples of light (no face); beside it a section of the great golden chain with ornate engraved links; below, '
    'the collectibles: a single golden chain link, a golden hazelnut, a small brass bell (checkpoint), a glowing gem. Items evenly spaced, '
    'clearly separated, no text.',
    {'S1': 'Items carved from wood and gilded, the bell carved and painted brass, the nut gilded.',
     'S2': 'Items of gold felt and gold thread, the chain of crocheted gold yarn, the bell a real tiny brass bell on a ribbon.',
     'S3': 'Items drawn in Bilibin manner with ornamental engraving patterns and gold watercolor.',
     'S4': 'Items glowing in pure gold leaf on black lacquer with fine engraving and a soft radiance.',
     'S5': 'Items cut from gold foil paper and card, lace-cut engravings, the living link glowing in backlight.'})
ent('I02', 'chudo_veshchi', 'prop', 'Предметы', 'Чудо-вещи', 'клубок, гусли Садко, перо Жар-птицы, кузнечные клещи',
    'Prop sheet of four magic wonder-items, each displayed like a precious artifact: a magic ball of yarn unrolling a glowing guiding '
    'thread; Sadko\'s gusli — a wing-shaped wooden psaltery with golden strings and floating musical notes; the Firebird\'s feather glowing '
    'with warm golden-orange light; blacksmith\'s tongs holding a red-hot glowing chain link. Evenly spaced, clearly separated, no text.',
    {'S1': 'Each item carved and painted like a folk souvenir: the gusli with carved ornaments, the feather carved as painted flame plates.',
     'S2': 'Each item handmade: a real yarn ball, gusli with thread strings, a feather of silk and gold yarn, felt tongs with a glowing bead link.',
     'S3': 'Bilibin manner, each item in its own ornamental medallion frame.',
     'S4': 'Each item glowing on black lacquer in gold leaf and jewel tones, the feather radiating golden light.',
     'S5': 'Each item cut from paper: the thread a gold paper strip, the feather of translucent orange tissue glowing, the tongs a black cut silhouette.'})
ent('I03', 'koshcheeva_smert', 'prop', 'Предметы', 'Кощеева смерть', 'сундук, заяц, утка, яйцо, игла',
    'Prop sheet showing the secret of Koschei\'s death as a fairy-tale sequence from left to right: an iron-bound chest hanging on chains, '
    'a hare leaping out of it, a duck flying out of the hare, an egg falling from the duck, and a glowing needle inside the egg. Evenly '
    'spaced, clearly separated, no text.',
    {'S1': 'Carved painted folk toys: the chest with painted iron bands, a carved hare and duck, the egg painted like a pysanka, a golden needle.',
     'S2': 'A felted hare and duck, a felt chest with stitched bands, an embroidered egg, a real needle with golden thread.',
     'S3': 'Bilibin manner, the sequence framed as a decorative strip with folk ornament.',
     'S4': 'Glowing on black lacquer, the egg painted like a Palekh treasure, the needle a line of light.',
     'S5': 'A paper cut-out sequence with lace-cut details, the needle a glowing gold foil line.'})
ent('I04', 'karta_rushnik', 'prop', 'Предметы', 'Карта-рушник', 'вышитая карта пяти миров на веретене',
    'Top-down view of the embroidered towel map (rushnik): a long linen towel unrolled from a golden spindle, embroidered with a map of '
    'five fairy-tale worlds — a dark forest, an underwater city with domes, a cloud kingdom, a fire river with a bridge and an island with '
    'a great oak — connected by a dotted golden path, red-and-white folk embroidery borders, a needle with golden thread lying on it. No '
    'readable text.',
    {'S1': 'The map painted on a long carved wooden board like a Northern Russian painted distaff, framed by carved ornament, a turned gilded spindle.',
     'S2': 'A real embroidered linen rushnik with red cross-stitch, satin-stitch landscapes, a golden thread path, a needle and a thimble.',
     'S3': 'Drawn as a Bilibin map illustration with a rich ornamental border and stylized tiny landmarks.',
     'S4': 'The map painted as a Palekh lacquer panel: five worlds in jewel tones and a gold path.',
     'S5': 'The map as layered cut paper on a long paper strip, lace-cut borders, tiny landmark cut-outs glowing.'})

# --- Геймплей
HUD = ('Minimal HUD: small round hero portraits in two corners and a little golden chain-link counter, no readable text.')
ent('G01', 'gameplay_zagadka', 'game', 'Геймплей', 'Совместная загадка', 'кооператив в лесу: плита, подкидка, струна клубка',
    'Gameplay screenshot of a cozy co-op 3D adventure game, isometric three-quarter camera from above. In a twilight fir forest clearing: '
    'Proshka the slim ginger fox cub stands on a glowing yellow pressure plate holding a wooden gate open; Potap the brown bear cub in a '
    'white shirt tosses tiny Yosha the turquoise hedgehog up onto a ledge; Pelageya the lilac owl glides over a gap along a stretched '
    'glowing yarn string. Golden chain links and hazelnuts float as collectibles, a brass bell checkpoint. ' + HUD,
    {'S1': 'Everything looks like a carved wooden toy game board come alive, with readable plates and paths.',
     'S2': 'Everything looks like a felted stop-motion set, the glowing string is real yarn, the plate is a big felt button.',
     'S3': 'Cel-shaded with ink outlines and flat colors, very readable paths, decorative clouds of mist.',
     'S4': 'A dark night look: heroes and interactive objects outlined with glowing gold, everything else in deep dark tones.',
     'S5': 'A layered paper stage seen from above, the string a gold paper strip, heroes as paper puppets with soft drop shadows.'})
ent('G02', 'gameplay_boy', 'game', 'Геймплей', 'Бой с мороками', 'сигналы жёлтый/красный/синий, щит, распутывание',
    'Gameplay screenshot of a combat moment, isometric three-quarter camera, on a street of underwater Kitezh with golden domes: Potap the '
    'brown bear cub raises a wide shield as a yellow warning sign flashes above a morok (a creature of tangled dark thread with glowing '
    'ember dots above it); Pelageya the lilac owl reflects a blue water drop back at a pike-shaped morok; another morok shows a red sign '
    'before a swipe; a defeated morok unravels into loose threads and sparkles. ' + HUD,
    {'S1': 'Moroks and heroes like carved painted toys, the warning signs as painted wooden tokens, the unraveling as wood shavings and threads.',
     'S2': 'Moroks of tangled yarn literally unraveling into loose wool threads, the signs as felt badges, water drops as glass beads.',
     'S3': 'Cel-shaded with ink outlines, the signs as bold graphic symbols, the unraveling as flying ink strokes.',
     'S4': 'Dark lacquer scene, the yellow, red and blue signs glowing like jewels, the unraveling as a burst of gold threads.',
     'S5': 'Paper puppets fighting on a layered paper stage, the signs as glowing cut-out shapes, the unraveling as flying paper strips.'})
ent('G03', 'gameplay_boss', 'game', 'Геймплей', 'Бой с боссом', 'Змей Горыныч, узда двумя клещами, лава',
    'Gameplay screenshot of a boss fight, dramatic isometric camera: the three-headed dragon Zmey Gorynych towers over a lava arena with '
    'basalt columns — one head asleep, one roaring, the middle one breathing fire; two tiny heroes, Proshka the ginger fox cub and Yosha '
    'the turquoise hedgehog, carry a glowing hot bridle together with blacksmith tongs from two sides; lava cracks and geysers. A boss bar '
    'at the top made of ornamental embers, no readable text. ' + HUD,
    {'S1': 'The dragon a giant painted folk toy, the arena a carved diorama with painted lava, warm dramatic light.',
     'S2': 'The dragon felted with sequin scales, the lava knitted orange yarn, the fire of silk threads, macro photo lighting.',
     'S3': 'Cel-shaded with ink outlines, fire and lava as ornamental curls, a very clear graphic read of the danger zones.',
     'S4': 'Dark lacquer arena, the dragon and the lava glowing in vermilion and gold, the heroes outlined in gold.',
     'S5': 'A paper dragon puppet on brass pins over glowing orange tissue lava, the heroes as small paper puppets.'})

assert len(E) == 40, len(E)
FIRST = ['H01', 'H02', 'H03', 'H04', 'H05', 'B05', 'L02', 'G01']  # волна 1: 8 сущностей × 5 стилей = 40 картинок для первого выбора
ORDER = [e for f in FIRST for e in E if e['id'] == f] + [e for e in E if e['id'] not in FIRST]


def prompt(e, s):
    return ' '.join([s['lead'], e['core'], e['acc'][s['id']], s[e['kind']]])


def fname(e, s):
    return '%s_%s_%s.png' % (s['id'], e['id'], e['slug'])


def seed(e, s):
    return int(s['id'][1]) * 1000 + E.index(e) + 1


# ---------------------------------------------------------------- документ
def build():
    o = []
    a = o.append
    a('# Арт-ресёрч: 5 стилей и 200 промтов для Qwen Image')
    a('')
    a('> Документ собирает `python3 tools/art_prompts.py` — руками не править: стили, сущности и акценты меняются в скрипте, потом пересборка.')
    a('')
    a('Цель — подобрать игре «Златая цепь» собственный визуальный стиль. Пять стилей, у каждого — одни и те же **40 сущностей** '
      '(герои, жители, все мороки, мини-боссы и боссы, места, ключевые предметы, геймплей): **5 × 40 = 200 картинок**. '
      'Композиция картинки одной сущности во всех стилях одинаковая — меняется только стиль, поэтому пять вариантов легко сравнивать рядом.')
    a('')
    a('## 1. Инструкция для агента генерации (MCP)')
    a('')
    a('| параметр | значение |')
    a('|---|---|')
    a('| модель | **Qwen Image 2.1** |')
    a('| размер | **%d × %d** (720p, 16:9) для всех 200 картинок |' % (W, H))
    a('| папка | `%s\\` |' % SAVE)
    a('| имя файла | из заголовка промта, например `S1_H01_proshka.png` (стиль · сущность · имя) |')
    a('| промт | блок `text` под заголовком — **дословно**, на английском: не переводить, не сокращать, не дописывать |')
    a('| негатив | `negative: NEG_Sx` — текст после `NEG_Sx:` в блоке негатива этого стиля (раздел 2), если инструмент принимает negative prompt |')
    a('| seed | указан у каждого промта (повторяемость); для новых вариантов того же промта — другой seed |')
    a('| шаги / CFG | по умолчанию модели; если инструмент спрашивает — 30–50 шагов, CFG ≈ 4 |')
    a('')
    a('**Порядок работы:**')
    a('1. Создать папку `%s`, если её нет.' % SAVE)
    a('2. Генерировать только промты раздела 5 (блоки раздела 2 — части стилей, не отдельные картинки), строго по номерам 001 → 200. Если файл с таким именем уже есть в папке — пропустить (так генерацию можно '
      'прервать и продолжить с того же места).')
    a('3. **Каждое изображение сохранять в папку сразу по готовности**, не дожидаясь конца пачки: инструмент вернул ссылку — '
      'скачать сразу; вернул base64 — записать файл; сохранил в свою папку — сразу скопировать в `_ArtResearch` под именем из заголовка.')
    a('4. Ошибка генерации — один повтор с тем же seed, потом с seed + 1; не вышло — записать строку в `_ArtResearch\\_errors.txt` '
      '(номер, имя файла, ошибка) и идти дальше.')
    a('5. Если инструмент не принимает 1280×720 (нужна кратность 32/64) — ближайший размер 16:9 (`1280×704`, `1344×768`) без '
      'кадрирования; имя файла то же.')
    a('6. Ничего не коммитить: `wiki/` уходит в GitHub Wiki после слияния в `main`, а 200 PNG — это сотни мегабайт. В репозиторий — '
      'только выбранные картинки, уменьшенные и в JPG.')
    a('')
    a('**Волна 1 (001–040)** — восемь главных сущностей во всех стилях: четыре героя, команда, Кощей, Лукоморье и совместная загадка. '
      'Этого хватает для первого отбора: после неё можно остановиться, отсеять 2–3 стиля и догенерировать остальное только по '
      'оставшимся. **Волна 2 (041–200)** — все остальные сущности.')
    a('')
    a('## 2. Пять стилей')
    a('')
    a('| | стиль | коротко | палитра |')
    a('|---|---|---|---|')
    for s in STYLES:
        a('| **%s** | «%s» (%s) | %s | %s |' % (s['id'], s['ru'], s['en'], s['idea'].split(':')[0].split('.')[0], s['palette']))
    a('')
    for s in STYLES:
        a('### %s · «%s» — %s' % (s['id'], s['ru'], s['en']))
        a('')
        a('- **Что это.** ' + s['idea'])
        a('- **Почему подходит игре.** ' + s['why'])
        a('- **Как это делать в Unreal.** ' + s['ue'])
        a('- **Палитра:** %s. **Ориентиры:** %s.' % (s['palette'], s['refs']))
        a('')
        a('Вступление стиля (начало каждого промта):')
        a('```text\n%s\n```' % s['lead'])
        a('Хвост стиля для персонажей (`char`):')
        a('```text\n%s\n```' % s['char'])
        a('Хвост для предметов (`prop`):')
        a('```text\n%s\n```' % s['prop'])
        a('Хвост для мест (`scene`):')
        a('```text\n%s\n```' % s['scene'])
        a('Хвост для кадров геймплея (`game`):')
        a('```text\n%s\n```' % s['game'])
        a('**NEG_%s** (негатив):' % s['id'])
        a('```text\nNEG_%s: %s\n```' % (s['id'], s['neg']))
        a('')
    a('## 3. Сущности (40)')
    a('')
    a('Промт = вступление стиля + описание сущности (одно для всех стилей) + акцент сущности в этом стиле + хвост стиля. '
      'Внешность героев описана одними и теми же словами во всех промтах, чтобы их узнавали в любом стиле. '
      'Все враги игры — **мороки**: нитяные клубки в облике существ (их не убивают, а распутывают), поэтому в каждом промте врагов есть '
      'одно и то же определение морока.')
    a('')
    a('| id | раздел | сущность | что на картинке | номера промтов |')
    a('|---|---|---|---|---|')
    for e in E:
        k = ORDER.index(e) * 5
        a('| `%s` | %s | **%s** | %s | %03d–%03d |' % (e['id'], e['grp'], e['ru'], e['about'], k + 1, k + 5))
    a('')
    a('## 4. Как выбирать')
    a('')
    a('Смотреть сначала стиль целиком (все `S1_*` подряд — цельный ли мир), потом одну сущность в пяти стилях (поиск `*_H01_*`). '
      'Оценки по пятибалльной шкале:')
    a('')
    a('| критерий | S1 | S2 | S3 | S4 | S5 |')
    a('|---|---|---|---|---|---|')
    for c in ['Узнаётся «русская сказка» с первого взгляда', 'Героев видно и понятно с изометрической камеры (силуэт, цвет)',
              'Мороки читаются как враги, но не пугают детей 7–11 лет', 'Боссы — зрелищные', 'Места разных миров не похожи друг на друга',
              'Предметы и то, с чем можно взаимодействовать, выделяются', 'Не похоже на другие игры', 'Посильно в производстве (Unreal, малая команда)',
              'Нравится самому (и детям-тестерам)']:
        a('| %s | | | | | |' % c)
    a('')
    a('Стили можно смешивать: например, герои и мороки — «Валяная сказка», ролики-Сказы — «Бумажный театр», интерфейс и карта — «Книжка '
      'Билибина». Следующий шаг после выбора — листы персонажей (вид спереди, сбоку, сзади), кадры-эталоны для каждого мира и пробный '
      'материал в Unreal.')
    a('')
    a('## 5. Промты (200)')
    a('')
    wave = None
    for k, e in enumerate(ORDER):
        w = 1 if e['id'] in FIRST else 2
        if w != wave:
            wave = w
            a('### Волна %d%s' % (w, ' — восемь главных сущностей (001–040)' if w == 1 else ' — остальные сущности (041–200)'))
            a('')
        a('#### %s · %s — %s' % (e['id'], e['ru'], e['about']))
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
    print('%s: %d промтов, %d КБ' % (os.path.relpath(OUT, ROOT), len(E) * len(STYLES), len(t.encode('utf-8')) // 1024))
