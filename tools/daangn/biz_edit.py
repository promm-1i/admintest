"""올라간 소식의 제목과 본문을 바꾼다. 목록에서 글을 찾아 ⋮ → 소식 수정 → 교체 → 완료."""
from playwright.sync_api import sync_playwright

LIST = "https://bizprofile.daangn.com/biz_accounts/4030544/manager/posts/"

FIND = "성인 인증부터 시작하는"
NEW_TITLE = "수제맥주 브랜드 분위기를 모바일 화면까지 끌고 왔습니다"
NEW_BODY = """https://noveriq.co.kr/haedam/

수제맥주 양조장의 분위기를 그대로 옮긴 프리미엄 홈페이지 시안입니다.

금빛으로 차오르는 문장과 화면에 붙어 넘어가는 세 장면으로 브랜드 이야기를 먼저 보여주고, 매장 찾기는 지도 핀과 목록이 서로 따라 움직이게 구성했습니다. 90년 연표는 좌우로 엇갈려 내려가 긴 내용도 지루하지 않게 넘어갑니다.

위 주소에서 전체 구성을 보실 수 있습니다. 맞춤형 홈페이지 제작은 채팅으로 편하게 문의해 주세요."""

OPEN_MENU = """(title)=>{
  const el=[...document.querySelectorAll('*')].find(e=>e.children.length===0 && (e.textContent||'').includes(title));
  if(!el) return 'no-title';
  const r=el.getBoundingClientRect();
  const b=[...document.querySelectorAll("button[aria-label='더보기']")]
    .find(x=>Math.abs(x.getBoundingClientRect().y-r.y)<60);
  if(!b) return 'no-menu';
  b.click(); return 'ok';}"""

HIDE_FLOATING = """()=>{let n=0;
  for(const e of document.querySelectorAll('button,div,iframe')){
    if(getComputedStyle(e).position!=='fixed') continue;
    const r=e.getBoundingClientRect();
    if(r.width<30||r.width>120||r.height<30||r.height>120) continue;
    if(r.bottom < window.innerHeight-260) continue;
    e.style.setProperty('display','none','important'); n++}
  return n}"""

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    pg = b.contexts[0].pages[-1]
    found = False
    for page in ["1", "2", "3", "4", "5"]:
        pg.goto(LIST, wait_until="domcontentloaded")
        pg.wait_for_timeout(3000)
        if page != "1":
            btn = pg.locator(f"button[aria-label='{page}페이지']")
            if not btn.count():
                break
            btn.first.click()
            pg.wait_for_timeout(2500)
        if pg.get_by_text(FIND, exact=False).count():
            found = True
            break
    if not found:
        raise SystemExit("글을 못 찾음: " + FIND)

    if pg.evaluate(OPEN_MENU, FIND) != "ok":
        raise SystemExit("메뉴를 못 열었음")
    pg.wait_for_timeout(1200)
    pg.get_by_text("소식 수정", exact=True).first.click()
    pg.wait_for_timeout(4500)

    ti = pg.locator("input[placeholder='소식 제목']").first
    before = ti.input_value()
    if FIND not in before:
        raise SystemExit("다른 글이 열림: " + before[:30])
    ti.click()
    ti.fill(NEW_TITLE)
    print("제목:", before, "→", NEW_TITLE)

    ed = pg.locator("[contenteditable=true]").first
    ed.click()
    pg.keyboard.press("Control+a")
    pg.keyboard.press("Delete")
    pg.wait_for_timeout(400)
    for bi, block in enumerate(NEW_BODY.split(chr(10) + chr(10))):
        if bi:
            pg.keyboard.press("Enter")
        for li, line in enumerate(block.split(chr(10))):
            if li:
                pg.keyboard.press("Shift+Enter")
            pg.keyboard.insert_text(line)
    pg.wait_for_timeout(600)
    print("본문:", len(NEW_BODY), "자")

    pg.evaluate(HIDE_FLOATING)
    pg.get_by_role("button", name="완료").first.click()
    pg.wait_for_timeout(5000)
    print("저장됨" if "postId=" in pg.url else "저장 확인 필요 — " + pg.url[-40:])
