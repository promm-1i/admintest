"""글에 달린 댓글을 훑어 광고로 걸릴 문구를 찾는다. 고치지는 않는다.

본문 점검(audit_posts.py)은 `.article-body` 중 h1 조부모 안에 든 것만 봐서 댓글을 뺀다.
그런데 '포트폴리오와 견적은 댓글에서 확인하세요' 같은 글이 있었다 — 댓글에 링크를 따로 달아 뒀다.
"""
import json
import re
from pathlib import Path

from playwright.sync_api import sync_playwright

OUT = Path.home() / ".daangn" / "out"
AUDIT = OUT / "audit_posts.json"

RULES = [
    ("문의 유도", r"문의\s*(주세요|주시면|바랍|환영|받|주시)|채팅\s*(주세요|남겨|남기)|댓글\s*(주세요|남겨|남기)|연락\s*(주세요|바랍)|남겨\s*주세요|남겨주세요"),
    ("제작 권유", r"제작해\s*드립니다|제작합니다|만들어\s*드립니다|모집합니다|제작\s*신청|맞춤\s*제작|제작\s*가능|의뢰"),
    ("가격", r"\d+\s*만\s*원|견적|비용은|요금"),
    ("연락처·주소", r"https?://|noveriq|mintcl|카톡|카카오|010[-\s]?\d{3,4}"),
]

# 댓글 영역 = h1 조부모 밖에 있는 .article-body + 댓글 목록
COMMENTS_JS = """()=>{const nl=String.fromCharCode(10);
  const h1=document.querySelector('h1');
  const sc=h1&&h1.parentElement&&h1.parentElement.parentElement;
  const out=[];
  for(const e of document.querySelectorAll('.article-body')){
    if(sc && sc.contains(e)) continue;          // 본문은 건너뛴다
    const t=(e.innerText||'').trim();
    if(t) out.push(t);
  }
  return out}"""

rows = json.loads(AUDIT.read_text(encoding="utf-8"))

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    ctx = b.contexts[0]
    pg = [x for x in ctx.pages if not x.is_closed()][-1]
    found = []
    for i, r in enumerate(rows, 1):
        try:
            pg.goto(r["url"], wait_until="domcontentloaded", timeout=60000)
            pg.wait_for_timeout(1300)
            cmts = pg.evaluate(COMMENTS_JS)
        except Exception as e:
            print(f"  [{i:2d}] 실패 {type(e).__name__}", flush=True)
            continue
        hits = []
        for c in cmts:
            for name, pat in RULES:
                for m in re.finditer(pat, c):
                    hits.append({"kind": name, "near": c[max(0, m.start() - 20):m.end() + 24].replace("\n", " ")})
        tag = f"걸림 {len(hits)}" if hits else "깨끗"
        print(f"  [{i:2d}/{len(rows)}] 댓글 {len(cmts):2d}개 {tag:9s} {r['title'][:38]}", flush=True)
        if hits:
            found.append({"url": r["url"], "title": r["title"], "comments": cmts, "hits": hits[:8]})
    (OUT / "audit_comments.json").write_text(json.dumps(found, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"\n글 {len(rows)}개 · 댓글이 걸리는 글 {len(found)}개")
