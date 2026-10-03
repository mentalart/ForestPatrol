#!/usr/bin/env python3
# Сводки по результатам ботов (out/results.tsv, пишет regress.sh: бот, код, ошибок, секунд, код первой попытки).
#   python3 tools/tests/flaky.py --summary ПАПКА   — итог одного прогона CI по всем машинам (вложения bots-out-*): упавшие, прошедшие
#                                                  со второго раза, самые долгие. CI пишет это в отчёт проверки «bots».
#   python3 tools/tests/flaky.py [--days 14] [--issue]
#                                                — неустойчивые боты за последние дни: по results.tsv всех запусков «Боты» (через gh),
#                                                  сколько раз бот прошёл только со второго раза и сколько падал (отдельно — на main, где
#                                                  правок нет: там падение — неустойчивость или поломка main). --issue — обновить issue
#                                                  «Неустойчивые боты» (flaky.yml раз в неделю). Такие боты чинят отдельной задачей.
#   python3 tools/tests/flaky.py --times ПАПКА [N] — N самых долгих ботов по вложениям одного прогона (что ускорять в первую очередь).
import glob, io, json, os, subprocess, sys, time, zipfile

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
TITLE = 'Неустойчивые боты — сводка CI'


def rows_from(text):
    out = []
    for l in text.splitlines():
        p = l.split('\t')
        if len(p) >= 4 and p[0]:
            out.append(dict(bot=p[0], rc=p[1], err=p[2], secs=int(p[3] or 0), first=(p[4] if len(p) > 4 else '').strip()))
    return out


def load_dir(d):
    rows, outs = [], {}
    for f in sorted(glob.glob(os.path.join(d, '**', 'results.tsv'), recursive=True)):
        rows += rows_from(open(f, encoding='utf-8').read())
        for o in glob.glob(os.path.join(os.path.dirname(f), 'out_*.txt')):
            outs[os.path.basename(o)[4:-4]] = o
    return rows, outs


def last_line(path):
    try:
        L = [l for l in open(path, encoding='utf-8', errors='replace').read().splitlines() if l.strip()]
    except OSError:
        return ''
    r = [l for l in L if l.startswith('> ') or 'ERROR' in l or 'FAIL' in l]
    return (r or L or [''])[-1][:160].replace('|', '/')


def summary(d):
    rows, outs = load_dir(d)
    if not rows:
        print('### Боты\n\nРезультатов нет (ботов не понадобилось или машины не дошли до запуска).')
        return
    bad = [r for r in rows if r['rc'] != '0' or r['err'] != '0']
    fl = [r for r in rows if r not in bad and r['first']]
    tot = sum(r['secs'] for r in rows)
    print('### Боты: %d, упали %d, прошли со второго раза %d · время ботов %d мин' % (len(rows), len(bad), len(fl), tot // 60))
    if bad:
        print('\n**Упали**\n\n| бот | код | ошибок | последняя строка |\n|---|---|---|---|')
        for r in bad:
            print('| `%s` | %s%s | %s | %s |' % (r['bot'], r['rc'], ' (1-й: %s)' % r['first'] if r['first'] else '', r['err'], last_line(outs.get(r['bot'], ''))))
    if fl:
        print('\n**Прошли только со второго раза** (неустойчивы — таймаут или закрытый браузер в первой попытке)\n')
        print(', '.join('`%s` (1-й: %s)' % (r['bot'], r['first']) for r in fl))
    print('\n**Самые долгие**: ' + ', '.join('`%s` %d с' % (r['bot'], r['secs']) for r in sorted(rows, key=lambda r: -r['secs'])[:12]))


def times(d, n):
    rows, _ = load_dir(d)
    for r in sorted(rows, key=lambda r: -r['secs'])[:n]:
        print('%5d  %s' % (r['secs'], r['bot']))


def gh(*a, raw=False):
    r = subprocess.run(['gh'] + list(a), cwd=ROOT, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    if r.returncode:
        sys.exit('gh %s: %s' % (' '.join(a[:3]), r.stderr.decode(errors='replace')[:300]))
    return r.stdout if raw else r.stdout.decode()


def tracker(days, issue):
    repo = json.loads(gh('repo', 'view', '--json', 'nameWithOwner'))['nameWithOwner']
    since = time.strftime('%Y-%m-%d', time.gmtime(time.time() - days * 86400))
    runs = [json.loads(l) for l in gh('api', '--paginate', 'repos/%s/actions/workflows/bots.yml/runs?created=>=%s&per_page=100' % (repo, since),
                                      '--jq', '.workflow_runs[]|{id,head_branch,event,conclusion}|tojson').splitlines() if l.strip()]
    st, nruns = {}, 0
    for run in runs:
        arts = json.loads(gh('api', 'repos/%s/actions/runs/%d/artifacts?per_page=100' % (repo, run['id']), '--jq', '[.artifacts[]|select(.name|startswith("bots-out-"))|select(.expired|not)|.id]'))
        if not arts:
            continue
        nruns += 1
        main = run['head_branch'] == 'main' and run['event'] != 'pull_request'
        for aid in arts:
            z = zipfile.ZipFile(io.BytesIO(gh('api', 'repos/%s/actions/artifacts/%d/zip' % (repo, aid), raw=True)))
            for name in z.namelist():
                if not name.endswith('results.tsv'):
                    continue
                for r in rows_from(z.read(name).decode('utf-8', 'replace')):
                    s = st.setdefault(r['bot'], dict(runs=0, retry=0, fail=0, fail_main=0, secs=0))
                    s['runs'] += 1
                    s['secs'] += r['secs']
                    failed = r['rc'] != '0' or r['err'] != '0'
                    s['fail'] += failed
                    s['fail_main'] += failed and main
                    s['retry'] += (not failed) and bool(r['first'])
    bad = sorted(((b, s) for b, s in st.items() if s['retry'] or s['fail_main'] or s['fail'] > 1), key=lambda x: -(x[1]['retry'] + 2 * x[1]['fail_main'] + x[1]['fail']))
    o = ['Сводка по запускам «Боты» за %d дн. (%d запусков с результатами, %d ботов). Пишет `tools/tests/flaky.py` (flaky.yml, раз в неделю).' % (days, nruns, len(st)), '',
         'Неустойчивый бот: прошёл только со второго раза (первая попытка — таймаут или закрытый браузер) или падал на `main`, где правок нет. '
         'Падения в PR могут быть настоящими ошибками ветки — они для сведения. Неустойчивого бота чинят отдельной задачей (больше запаса времени, '
         'ожидание по условию вместо числа кадров), а не отключают.', '']
    if bad:
        o += ['| бот | прогонов | со 2-го раза | падал на main | падал всего | среднее время, с |', '|---|---|---|---|---|---|']
        o += ['| `%s` | %d | %d | %d | %d | %d |' % (b, s['runs'], s['retry'], s['fail_main'], s['fail'], s['secs'] // max(1, s['runs'])) for b, s in bad]
    else:
        o += ['Неустойчивых ботов нет.']
    slow = sorted(st.items(), key=lambda x: -x[1]['secs'] / max(1, x[1]['runs']))[:10]
    o += ['', '**Самые долгие** (среднее): ' + ', '.join('`%s` %d с' % (b, s['secs'] // max(1, s['runs'])) for b, s in slow)]
    body = '\n'.join(o)
    print(body)
    if issue:
        num = gh('issue', 'list', '--state', 'open', '--search', 'in:title "%s"' % TITLE, '--json', 'number', '--jq', '.[0].number').strip()
        if num:
            gh('issue', 'edit', num, '--body', body)
        else:
            gh('issue', 'create', '--title', TITLE, '--body', body)


if __name__ == '__main__':
    a = sys.argv[1:]
    if a and a[0] == '--summary':
        summary(a[1])
    elif a and a[0] == '--times':
        times(a[1], int(a[2]) if len(a) > 2 else 20)
    else:
        tracker(int(a[a.index('--days') + 1]) if '--days' in a else 14, '--issue' in a)
