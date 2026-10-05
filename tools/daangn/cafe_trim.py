"""정보성 글 끝에 붙은 영업 꼬리만 잘라낸다. 본문과 사진은 그대로 둔다.

글마다 끝이 `<~주세요 한 줄> + 📎 네이버 블로그 + 🌐 홈페이지` 세 문단으로 끝난다.
CUT 에 적은 문구가 든 문단부터 끝까지 지운다. 지울 구간에 사진이 있으면 지우지 않는다.

  python cafe_trim.py          전부
  python cafe_trim.py 3        세 번째만
"""
import json
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

AUDIT = Path.home() / ".daangn" / "out" / "audit_posts.json"

# (글 제목, 이 문구가 든 문단부터 끝까지 지운다)
CUT = [
    ("객실 사진은 좋은데 예약 문의가 없다면", "펜션·숙박업 홈페이지 준비 중이시면"),
    ("렌트카 업체 홈페이지, 상담 흐름 위주로 만들어봤어요", "비슷한 구성 필요하시면"),
    ("렌트카 홈페이지에 필터가 있어야 하는 이유", "렌트카 홈페이지 준비 중이시면"),
    ("모바일에서 전화 버튼이 안 보이면 생기는 일", "지금 홈페이지 모바일 화면 한 번 캡처해서"),
    ("병원 홈페이지, 예약 버튼 위치보다 먼저 봐야 하는 것", "어떤 진료과인지만 알려주시면"),
    ("뷰티샵 홈페이지 제작비, 시술 메뉴 수로 갈립니다", "필요한 메뉴랑 참고하고 싶은 스타일"),
    ("에어컨 청소 홈페이지 제작, 사진보다 작업 과정이 먼저 보여야 합니다", "청소업체 홈페이지 필요하시면"),
    ("인테리어 홈페이지에 견적표만 올리면 문의가 약해지는 이유", "홈페이지 구성이 궁금하시면"),
    ("입주청소 홈페이지 제작, 고객이 견적 전에 꼭 확인하는 것들", "청소업체 홈페이지 필요하시면"),
    ("홈페이지 만들 때 사장님들이 자주 헷갈리는 것 2가지", "혹시 홈페이지 준비 중이시거나"),
    # 글 끝에 서비스 소개 블록이 통째로 붙어 있던 글
    ("소상공인 홈페이지 제작, 처음부터 쇼핑몰까지 필요할까?", "홈페이지 제작이 필요하신가요?"),
    # 기능 설명은 좋은 글이라 두고, 끝의 '구성해드립니다' 두 문단만 자른다
    ("부동산 홈페이지, 매물관리까지 한 번에 구축할 수 있습니다", "단순 홈페이지가 아니라"),
]

SELECT = """(mark)=>{
  const pm=document.querySelector('.ProseMirror');
  if(!pm) return 'no-editor';
  const kids=[...pm.children];
  const from=kids.findIndex(e=>(e.innerText||'').includes(mark));
  if(from<0) return 'no-mark';
  // 꼬리 뒤에 사진이 한 장 더 붙어 있는 글이 있다 — 그 직전까지만 지운다
  let to=kids.length-1;
  for(let i=from;i<kids.length;i++){
    if(kids[i].querySelector('img')){ to=i-1; break }
  }
  if(to<from) return 'image-at-mark';
  const r=document.createRange();
  r.setStart(kids[from],0);
  r.setEnd(kids[to], kids[to].childNodes.length);
  const s=window.getSelection(); s.removeAllRanges(); s.addRange(r);
  pm.focus();
  return 'ok:'+from+'-'+to+'/'+kids.length;
}"""

COUNTS = """()=>{const pm=document.querySelector('.ProseMirror');
  return {img: pm.querySelectorAll('img').length, text: (pm.innerText||'').trim().length}}"""


def live_page(ctx):
    for page in reversed(ctx.pages):
        if not page.is_closed():
            return page
    return ctx.new_page()


def trim(pg, url: str, title: str, mark: str) -> bool:
    pg.goto(url + "/edit", wait_until="domcontentloaded", timeout=60000)
    pg.wait_for_timeout(4000)
    ti = pg.locator("input[placeholder='제목을 입력해주세요.']").first
    if ti.input_value().strip() != title.strip():
        print("   다른 글이 열림:", ti.input_value()[:30])
        return False
    had = pg.evaluate(COUNTS)
    r = pg.evaluate(SELECT, mark)
    if not r.startswith("ok"):
        print("   못 자름:", r)
        return False
    pg.keyboard.press("Backspace")
    pg.wait_for_timeout(600)
    now = pg.evaluate(COUNTS)
    if now["img"] != had["img"] or now["text"] >= had["text"]:
        print(f"   이상함 — 사진 {had['img']}→{now['img']}, 글 {had['text']}→{now['text']}. 저장 안 함")
        return False
    pg.get_by_role("button", name="수정하기").first.click()
    pg.wait_for_timeout(4500)
    ok = "/edit" not in pg.url
    print(f"   {'저장됨' if ok else '저장 확인 필요'} · {r} · 글 {had['text']}→{now['text']}자 · 사진 {now['img']}장")
    return ok


by = {r["title"]: r["url"] for r in json.loads(AUDIT.read_text(encoding="utf-8"))}
# 게시판 목록에 안 뜨는 글은 find_hidden.py 가 따로 받아 둔다
HIDDEN = AUDIT.parent / "audit_hidden.json"
if HIDDEN.exists():
    by.update({r["title"]: r["url"] for r in json.loads(HIDDEN.read_text(encoding="utf-8"))})

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    ctx = b.contexts[0]
    picks = CUT
    if len(sys.argv) > 1:
        a, _, z = sys.argv[1].partition("-")
        picks = CUT[int(a) - 1:int(z or a)]
    done = 0
    for i, (title, mark) in enumerate(picks, 1):
        print(f"[{i}/{len(picks)}] {title[:42]}")
        if title not in by:
            print("   주소를 못 찾음")
            continue
        for attempt in (1, 2):
            try:
                done += trim(live_page(ctx), by[title], title, mark)
                break
            except Exception as e:
                print("   실패:", type(e).__name__, str(e)[:60])
                if attempt == 1 and "closed" in str(e).lower():
                    continue
                break
    print(f"\n{done}/{len(picks)} 건 잘라냄")
