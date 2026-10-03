"""사용자가 직접 쓴 소식 본문을 읽어 온다. 내 글 쓰기 전에 문체를 맞추려고."""
import json
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path.home() / ".daangn" / "out"
OUT.mkdir(parents=True, exist_ok=True)
LIST = "https://bizprofile.daangn.com/biz_accounts/4030544/manager/posts/"

# 사용자가 직접 쓴 것들 (09-16 · 09-28)
WANT = ["기업 홈페이지 제작해드립니다", "상담 전 신뢰가 먼저", "헤어샵 홈페이지",
        "메뉴 사진만 나열하지", "풀빌라의 물빛과"]

BODY_JS = """()=>{const nl=String.fromCharCode(10);
  const t=document.body.innerText;
  const i=t.indexOf('소식 본문 영역');
  if(i<0) return '(본문 영역 못 찾음)';
  return t.slice(i+8, i+1400)}"""

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    pg = b.contexts[0].pages[-1]
    got = {}
    for key in WANT:
        pg.goto(LIST, wait_until="domcontentloaded")
        pg.wait_for_timeout(3000)
        try:
            pg.get_by_text(key, exact=False).first.wait_for(timeout=12000)
            pg.get_by_text(key, exact=False).first.click()
        except Exception:
            print("못 찾음:", key)
            continue
        pg.wait_for_timeout(3000)
        got[key] = pg.evaluate(BODY_JS)
        print("=" * 60)
        print("[", key, "]")
        print(got[key][:900])
    (OUT / "biz_user_posts.json").write_text(json.dumps(got, ensure_ascii=False, indent=1), encoding="utf-8")
