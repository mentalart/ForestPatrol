#!/usr/bin/env python3
"""Предупреждения о текстах задач в PR (план мира 1, U2): берёт вывод бота tfin_textlint из вложений CI (bots-out-*) и печатает
строки ::warning (GitHub показывает их в PR) и раздел в сводке проверки. Никогда не падает.
  python3 tools/tests/textlint_warn.py ПАПКА   — папка со скачанными вложениями (в CI: _out)"""
import glob, json, os, sys

MAX = 25   # больше предупреждений в PR не выносить — остальные в выводе бота


def main():
    d = sys.argv[1] if len(sys.argv) > 1 else '_out'
    files = sorted(glob.glob(os.path.join(d, '**', 'out_tfin_textlint.txt'), recursive=True))
    if not files:
        print('textlint: бот tfin_textlint в этом прогоне не запускался')
        return
    summ, warn = '', []
    for line in open(files[0], encoding='utf-8', errors='replace'):
        if line.startswith('> textlint:'):
            summ = line[2:].strip()
        elif line.startswith('> [') and 'WARN' in line:
            try:
                warn = [w for w in json.loads(line[2:]) if w != 'WARN нет']
            except ValueError:
                pass
    print(summ or 'textlint: итога нет')
    for w in warn[:MAX]:
        print('::warning title=Тексты задач::' + w.replace('WARN ', '', 1))
    out = os.environ.get('GITHUB_STEP_SUMMARY')
    if out:
        with open(out, 'a', encoding='utf-8') as f:
            f.write('\n### Тексты задач (tfin_textlint)\n\n' + (summ or 'итога нет') + '\n\n')
            for w in warn[:MAX]:
                f.write('- ' + w.replace('WARN ', '', 1) + '\n')
            if len(warn) > MAX:
                f.write('- … и ещё %d — в выводе бота (вложения bots-out-*)\n' % (len(warn) - MAX))


if __name__ == '__main__':
    try:
        main()
    except Exception as e:   # предупреждения — не повод ронять проверку
        print('textlint: не удалось разобрать вывод:', e)
