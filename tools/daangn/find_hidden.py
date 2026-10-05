"""게시판 목록에 안 뜨는 글을 관리 화면 검색으로 찾아 본문까지 읽는다.

카페 관리 → 게시글 관리는 전체 79개를 쥐고 있는데, 게시판 목록은 50개까지만 펼쳐진다.
목록에서 못 찾은 글은 여기서 제목으로 검색하면 주소가 나온다.
"""
import json
import re
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

OUT = Path.home() / ".daangn" / "out"
MANAGE = "https://cafe.daangn.com/-/manage/hompeiji-jejags/posts"

TITLES = sys.argv[1:] or [
    "바로 제작가능한 템플릿",
    "부동산 홈페이지, 매물관리까지 한 번에 구축할 수 있습니다",
    "렌트카 업체 포트폴리오",
    "욕실 인테리어 업체 포트폴리오",
    "이삿짐 센터 포트폴리오",
]

RULES = [
    ("문의 유도", r"문의\s*(주세요|주시면|바랍|환영|받|주시)|채팅\s*(주세요|남겨|남기)|댓글\s*(주세요|남겨|남기)|연락\s*(주세요|바랍)|남겨\s*주세요|남겨주세요"),
    ("제작 권유", r"제작해\s*드립니다|제작합니다|만들어\s*드립니다|모집합니다|제작\s*신청|맞춤\s*제작|제작\s*가능|의뢰"),
    ("상담 권유", r"상담|안내해\s*드리|도와\s*드리|진행해\s*드리|알려\s*드리"),
    ("가격", r"\d+\s*만\s*원|견적|비용은|요금"),
    ("연락처·주소", r"https?://|noveriq|mintcl|카톡|카카오|010[-\s]?\d{3,4}"),
    ("권유형", r"필요하신\s*분|필요하시면|고민\s*중이시|감이?\s*안\s*오|한번\s*봐|보고\s*가세요|봐\s*주세요|참고해\s*보세요"),
]

BODY_JS = """()=>{const nl=String.fromCharCode(10);
 const h1=document.querySelector('h1');
 const sc=h1&&h1.parentElement&&h1.parentElement.parentElement;
 const body=[...document.querySelectorAll('.article-body')]
   .filter(e=>sc&&sc.contains(e)).map(e=>e.innerText||'').join(nl);
 return {title:h1?h1.innerText.trim():'', body:body.trim(),
         pics: sc?sc.querySelectorAll('.media-display-container').length:0}}"""

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    ctx = b.contexts[0]
    pg = [x for x in ctx.pages if not x.is_closed()][-1]
    rows = []
    for t in TITLES:
        pg.goto(MANAGE, wait_until="domcontentloaded", timeout=60000)
        pg.wait_for_timeout(2500)
        box = pg.get_by_placeholder("검색").first
        box.fill(t)
        pg.keyboard.press("Enter")
        pg.wait_for_timeout(3000)
        hrefs = pg.evaluate("""()=>[...document.querySelectorAll('a[href]')]
            .map(a=>a.getAttribute('href')).filter(h=>h&&h.includes('/posts/'))""")
        if not hrefs:
            print("주소 못 찾음:", t)
            continue
        url = "https://cafe.daangn.com" + hrefs[0] if hrefs[0].startswith("/") else hrefs[0]
        pg.goto(url, wait_until="domcontentloaded", timeout=60000)
        pg.wait_for_timeout(2000)
        d = pg.evaluate(BODY_JS)
        text = d["title"] + " || " + d["body"]
        hits = [(n, m.group(0)) for n, pat in RULES for m in re.finditer(pat, text)]
        rows.append({"url": url, "title": d["title"], "body": d["body"], "pics": d["pics"],
                     "hits": [{"kind": n, "near": w} for n, w in hits]})
        print("=" * 72)
        print(f'[{d["title"]}]  사진 {d["pics"]}장 · 걸림 {len(hits)}')
        print(d["body"][:500])
    (OUT / "audit_hidden.json").write_text(json.dumps(rows, ensure_ascii=False, indent=1), encoding="utf-8")
