"""카페 글의 제목·본문 글자만 바꾼다. 붙어 있는 사진은 건드리지 않는다.

  python cafe_edit.py            거리에 있는 일감 전부
  python cafe_edit.py 3          세 번째 일감만 (확인용)

수정 화면은 <글주소>/edit, 저장은 '수정하기'.
본문은 ProseMirror 이고 글 문단과 사진 칸(div > img)이 형제로 나란히 있다.
전체 선택 후 지우면 사진까지 날아가므로, 사진이 없는 문단 묶음만 골라 그 범위만 선택해 덮어쓴다.
"""
import json
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

from cafe_jobs import JOBS

AUDIT = Path.home() / ".daangn" / "out" / "audit_posts.json"

# 사진이 없는 문단이 이어진 구간 중 글자가 가장 많은 묶음을 잡아 선택한다.
SELECT_TEXT = """()=>{
  const pm=document.querySelector('.ProseMirror');
  if(!pm) return -1;
  const kids=[...pm.children];
  const runs=[]; let cur=null;
  kids.forEach((e,i)=>{
    if(e.querySelector('img')){ cur=null; return }
    if(!cur){ cur={a:i,b:i,n:0}; runs.push(cur) }
    cur.b=i; cur.n+=(e.innerText||'').trim().length;
  });
  if(!runs.length) return -1;
  const best=runs.reduce((x,y)=>y.n>x.n?y:x);
  if(!best.n) return -1;
  const r=document.createRange();
  r.setStart(kids[best.a],0);
  r.setEnd(kids[best.b], kids[best.b].childNodes.length);
  const s=window.getSelection(); s.removeAllRanges(); s.addRange(r);
  pm.focus();
  return best.n;
}"""

COUNTS = """()=>{const pm=document.querySelector('.ProseMirror');
  return {img: pm.querySelectorAll('img').length, text: (pm.innerText||'').trim().length}}"""


def type_body(pg, text: str) -> None:
    """문단 사이는 Enter, 문단 안 줄바꿈은 Shift+Enter."""
    for bi, block in enumerate(text.split(chr(10) + chr(10))):
        if bi:
            pg.keyboard.press("Enter")
        for li, line in enumerate(block.split(chr(10))):
            if li:
                pg.keyboard.press("Shift+Enter")
            pg.keyboard.insert_text(line)


def url_of(title: str) -> str:
    rows = json.loads(AUDIT.read_text(encoding="utf-8"))
    hit = [r for r in rows if r["title"] == title]
    if len(hit) != 1:
        raise SystemExit(f"글을 하나로 못 찍음({len(hit)}개): {title}")
    return hit[0]["url"]


def run_one(pg, job: dict) -> bool:
    url = job.get("url") or url_of(job["old_title"])
    pg.goto(url + "/edit", wait_until="domcontentloaded", timeout=60000)
    pg.wait_for_timeout(4000)

    ti = pg.locator("input[placeholder='제목을 입력해주세요.']").first
    before = ti.input_value()
    if before.strip() != job["old_title"].strip():
        print("   다른 글이 열림:", before[:34])
        return False
    had = pg.evaluate(COUNTS)

    if job["new_title"] != job["old_title"]:
        ti.click()
        ti.fill(job["new_title"])

    n = pg.evaluate(SELECT_TEXT)
    if n <= 0:
        print("   본문 문단을 못 잡음")
        return False
    type_body(pg, job["new_body"])
    pg.wait_for_timeout(600)

    now = pg.evaluate(COUNTS)
    if now["img"] != had["img"]:
        print(f"   사진이 {had['img']}→{now['img']} 로 바뀜 — 저장하지 않음")
        return False

    pg.get_by_role("button", name="수정하기").first.click()
    pg.wait_for_timeout(4500)
    ok = "/edit" not in pg.url
    print(f"   {'저장됨' if ok else '저장 확인 필요'} · 사진 {now['img']}장 · 글 {now['text']}자")
    return ok


def live_page(ctx):
    """중간에 탭이 닫히면 배치가 통째로 죽는다 — 건마다 살아 있는 탭을 다시 잡는다."""
    for page in reversed(ctx.pages):
        if not page.is_closed():
            return page
    return ctx.new_page()


with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    ctx = b.contexts[0]
    picks = JOBS
    if len(sys.argv) > 1:                      # "3" 한 건 · "4-29" 범위
        a, _, z = sys.argv[1].partition("-")
        picks = JOBS[int(a) - 1:int(z or a)]
    done = 0
    for i, job in enumerate(picks, 1):
        print(f"[{i}/{len(picks)}] {job['old_title'][:40]}")
        if job["new_title"] != job["old_title"]:
            print("   제목 →", job["new_title"])
        for attempt in (1, 2):
            try:
                done += run_one(live_page(ctx), job)
                break
            except Exception as e:
                print("   실패:", type(e).__name__, str(e)[:70])
                if attempt == 1 and "closed" in str(e).lower():
                    continue
                break
    print(f"\n{done}/{len(picks)} 건 저장")
