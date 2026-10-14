#!/usr/bin/env python3
# Времена ботов для деления по машинам CI (affected.py --shard / --plan читают tools/tests/bot_times.tsv: «бот<TAB>секунды»).
#   python3 tools/tests/bot_times.py merge ФАЙЛ.tsv ПАПКА…  — собрать времена из results.tsv в папках (вложения bots-out-* одного прогона),
#                                                          боты, которых в прогоне не было, остаются со старым временем из ФАЙЛА
# CI: ночной полный регресс (bots.yml) кладёт результат во вложение bot-times; план PR берёт его из последнего ночного прогона.
import os, sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import flaky   # noqa: E402

CAP = 900   # бот с таймаутом и повтором не должен раздувать долю: потолок — один BOT_TIMEOUT


def merge(path, dirs):
    old = {}
    try:
        for l in open(path, encoding='utf-8'):
            p = l.rstrip('\n').split('\t')
            if len(p) >= 2 and p[1].isdigit():
                old[p[0]] = int(p[1])
    except OSError:
        pass
    new = {}
    for d in dirs:
        for r in flaky.load_dir(d)[0]:
            new[r['bot']] = min(max(r['secs'], 1), CAP)
    old.update(new)
    with open(path, 'w', encoding='utf-8') as f:
        for b in sorted(old):
            f.write('%s\t%d\n' % (b, old[b]))
    print('Времена ботов: %d (обновлено %d) → %s' % (len(old), len(new), path))


if __name__ == '__main__':
    if len(sys.argv) >= 4 and sys.argv[1] == 'merge':
        merge(sys.argv[2], sys.argv[3:])
    else:
        print(__doc__ if __doc__ else open(__file__, encoding='utf-8').read().split('\n\n')[0])
        sys.exit(2)
