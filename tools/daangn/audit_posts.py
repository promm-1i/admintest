"""카페 글 전부를 열어 광고로 걸릴 문구를 찾는다. 고치지는 않는다.

본문은 h1 이 속한 영역 안의 .article-body 만 본다 — 댓글과 아래 '다른 글' 목록이 섞이면
거의 모든 글이 걸린 것처럼 나온다(1차 조사가 43개 중 42개로 나온 이유).
"""
import json
import re
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path.home() / ".daangn" / "out"
OUT.mkdir(parents=True, exist_ok=True)
CAFE = "https://cafe.daangn.com/hompeiji-jejags"

RULES = [
    ("문의 유도", r"문의\s*(주세요|주시면|바랍|환영|받|주시)|채팅\s*(주세요|남겨|남기)|댓글\s*(주세요|남겨|남기)|연락\s*(주세요|바랍)|남겨\s*주세요|남겨주세요"),
    ("제작 권유", r"제작해\s*드립니다|제작합니다|만들어\s*드립니다|모집합니다|제작\s*신청|맞춤\s*제작|제작\s*가능|의뢰"),
    ("상담 권유", r"상담|안내해\s*드리|도와\s*드리|진행해\s*드리|알려\s*드리"),
    ("가격", r"\d+\s*만\s*원|견적|비용은|요금"),
    ("연락처·주소", r"https?://|noveriq|카톡|카카오|010[-\s]?\d{3,4}"),
    ("권유형", r"필요하신\s*분|필요하시면|고민\s*중이시|감이?\s*안\s*오|한번\s*봐|보고\s*가세요|봐\s*주세요|참고해\s*보세요"),
]

LIST_JS = """()=>[...document.querySelectorAll('a[href*="/posts/"]')].map(a=>a.getAttribute('href')).filter(Boolean)"""

BOARDS_JS = """()=>[...document.querySelectorAll('a[href]')]
  .map(a=>[(a.innerText||'').trim(), a.getAttribute('href')])
  .filter(x=>x[1] && x[1].includes('/boards/'))"""

POST_JS = """()=>{const nl=String.fromCharCode(10);
 const h1=document.querySelector('h1');
 const scope=h1&&h1.parentElement&&h1.parentElement.parentElement;
 const body=[...document.querySelectorAll('.article-body')]
   .filter(e=>scope&&scope.contains(e)).map(e=>e.innerText||'').join(nl);
 let meta='';
 if(scope){const t=(scope.innerText||'').split(nl).filter(s=>/전$|전 |방금|어제/.test(s));
   meta=t.length?t[0]:''}
 let board='';
 const b=document.querySelector('a[href*="?boardId"], [class*=chip]');
 if(b)board=(b.innerText||'').trim();
 return {title:h1?h1.innerText.trim():'', body:body.trim(), meta:meta.trim(), board}}"""

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    pg = b.contexts[0].pages[-1]
    pg.goto(CAFE, wait_until="domcontentloaded")
    pg.wait_for_timeout(2500)

    # 카페 홈 피드는 43개에서 더 안 펼쳐진다(글은 91개였다).
    # 게시판마다 따로 들어가야 전부 잡힌다.
    boards = {}
    for name, href in pg.evaluate(BOARDS_JS):
        boards.setdefault(href, name)
    print("게시판", len(boards), "개", flush=True)

    hrefs = set()
    for href, name in boards.items():
        url = href if href.startswith("http") else "https://cafe.daangn.com" + href
        pg.goto(url, wait_until="domcontentloaded")
        pg.wait_for_timeout(2000)
        got, stale = set(), 0
        for _ in range(60):
            before = len(got)
            got.update(pg.evaluate(LIST_JS))
            pg.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            pg.wait_for_timeout(900)
            for i in range(pg.locator("text=더보기").count()):
                try:
                    el = pg.locator("text=더보기").nth(i)
                    if el.is_visible():
                        el.click(timeout=2500)
                        pg.wait_for_timeout(1200)
                except Exception:
                    pass
            got.update(pg.evaluate(LIST_JS))
            stale = stale + 1 if len(got) == before else 0
            if stale >= 3:
                break
        print(f"  {name[:16]:18s} {len(got):3d} 개", flush=True)
        hrefs.update(got)
    hrefs = sorted(hrefs)
    print("찾은 글", len(hrefs), "개", flush=True)

    rows = []
    for i, h in enumerate(hrefs, 1):
        url = h if h.startswith("http") else "https://cafe.daangn.com" + h
        try:
            pg.goto(url, wait_until="domcontentloaded")
            pg.wait_for_timeout(1000)
            d = pg.evaluate(POST_JS)
        except Exception as e:
            print(f"  [{i}] 실패 {str(e)[:40]}", flush=True)
            continue
        text = d["title"] + " || " + d["body"]
        hits = []
        for name, pat in RULES:
            for m in re.finditer(pat, text):
                s = max(0, m.start() - 20)
                hits.append({"kind": name, "near": text[s:m.end() + 22].replace("\n", " ")})
        rows.append({"url": url, "title": d["title"], "when": d["meta"],
                     "body": d["body"][:1200], "hits": hits[:10]})
        print(f"  [{i:2d}/{len(hrefs)}] {('걸림 ' + str(len(hits))) if hits else '깨끗   ':9s} {d['title'][:42]}", flush=True)

    (OUT / "audit_posts.json").write_text(json.dumps(rows, ensure_ascii=False, indent=1), encoding="utf-8")
    bad = [r for r in rows if r["hits"]]
    print(f"\n글 {len(rows)}개 · 걸리는 것 {len(bad)}개 · 깨끗한 것 {len(rows) - len(bad)}개")
