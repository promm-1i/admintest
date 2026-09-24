# -*- coding: utf-8 -*-
"""셈루트 21쪽 접근성 전수 검사 — axe-core (WCAG 2.1 A/AA).

  python a11y.py              전 쪽 검사
  python a11y.py s-bank       한 쪽만

로컬 파일로 열어 검사한다. 위반은 쪽·규칙·요소까지 찍는다.
"""
import io, json, os, sys
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8', errors='replace')
AXE = 'C:/_tmp/claude/C--web-project/f705668a-99f9-434b-be37-ed60b1b03504/scratchpad/axe.min.js'
SRC = 'file:///C:/web-project/mintcl-netlify-spa/public/semroot/'
PAGES = ['index', 's-bank', 's-note', 's-exam', 's-textbook', 's-consulting', 's-premium',
         'seminar', 'pricing', 'reviews', 'review-1', 'review-2', 'review-3',
         'news', 'press', 'blog', 'faq', 'contact', 'terms', 'privacy', 'marketing']

RUN = """
(async () => {
  const r = await axe.run(document, {
    runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21a','wcag21aa'] },
    resultTypes: ['violations']
  });
  return r.violations.map(v => ({
    id: v.id, impact: v.impact, help: v.help,
    n: v.nodes.length,
    targets: v.nodes.slice(0, 3).map(n => n.target.join(' ')),
    msg: (v.nodes[0] && v.nodes[0].failureSummary || '').split('\\n').slice(0,2).join(' ')
  }));
})()
"""


def main():
    only = [a for a in sys.argv[1:] if not a.startswith('-')]
    pages = only or PAGES
    axe_src = io.open(AXE, encoding='utf-8').read()
    total = 0
    rows = []
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={'width': 1440, 'height': 900})
        for name in pages:
            pg.goto(SRC + name + '.html')
            pg.wait_for_timeout(1400)
            # 등장 전환(.7s)이 끝난 뒤에 재야 반투명 상태로 잘못 계산되지 않는다
            pg.evaluate("document.querySelectorAll('[data-rv]').forEach(e=>{"
                        "e.style.transition='none';e.classList.add('on')})")
            pg.wait_for_timeout(900)
            pg.add_script_tag(content=axe_src)
            vs = pg.evaluate(RUN)
            n = sum(v['n'] for v in vs)
            total += n
            mark = 'OK ' if n == 0 else '!! '
            print('%s%-14s 위반 %d건 (규칙 %d개)' % (mark, name, n, len(vs)))
            for v in vs:
                print('     [%s] %s — %d곳' % (v['impact'], v['help'], v['n']))
                for t in v['targets']:
                    print('        %s' % t[:100])
                if v['msg']:
                    print('        > %s' % v['msg'][:130])
                rows.append({'page': name, **v})
        b.close()
    print('\n합계 위반 %d건 · 검사 %d쪽' % (total, len(pages)))
    out = 'C:/_tmp/claude/C--web-project/f705668a-99f9-434b-be37-ed60b1b03504/scratchpad/a11y.json'
    io.open(out, 'w', encoding='utf-8').write(json.dumps(rows, ensure_ascii=False, indent=1))
    print('상세:', out)


if __name__ == '__main__':
    main()
