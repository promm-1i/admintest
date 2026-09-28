"""제목·본문·사진을 채운다. 등록 버튼은 누르지 않는다."""
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path.home() / '.daangn' / 'out'
OUT.mkdir(parents=True, exist_ok=True)

TITLE = "양조장 홈페이지 제작 사례입니다"
BOARD = "✨ 포트폴리오"
BODY = """수제맥주 양조장 홈페이지입니다.

들어간 것들
· 만 19세 확인 창부터 뜹니다. 주류라 이게 있어야 해서요
· 스크롤 내리면 문장이 금색으로 차오릅니다
· 세 장면이 화면에 붙은 채로 넘어갑니다
· 매장 찾기는 지도 핀을 누르면 아래 목록이 따라 움직이고, 매장 이름 검색도 됩니다
· 90년 연표 26개 항목이 좌우로 엇갈려 내려갑니다
· 참여 캠페인에서는 사진 올리는 응모 창이 열립니다
· 브랜드 이야기, 맛의 비결, 브루어리, 캠페인까지 안쪽 페이지 14장

글과 사진은 관리자 페이지에서 직접 고치게 만들어 뒀습니다.

이렇게 구현하면 이쁩니다."""

PICS = sorted((Path.home() / "Desktop" / "개발" / "2. 홍보카드" /
               "BREP-1001_해담양조" / "당근_카페").glob("*.jpg"))

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    pg = b.contexts[0].pages[-1]
    pg.goto("https://cafe.daangn.com/hompeiji-jejags/posts/new", wait_until="domcontentloaded")
    pg.wait_for_timeout(3000)

    # 1) 게시판 고르기 — 목록이 안 열려 있으면 연다
    box = pg.locator("[role=listbox]")
    if not box.is_visible():
        pg.locator("button.flex.items-center.justify-between").first.click()
        box.wait_for(state="visible", timeout=10000)
    box.get_by_text(BOARD, exact=True).first.click()
    pg.wait_for_timeout(800)
    print("게시판:", pg.locator("button.flex.items-center.justify-between").first.inner_text().strip())

    # 2) 제목
    t = pg.locator("input[placeholder='제목을 입력해주세요.']").first
    t.click()
    t.fill(TITLE)
    print("제목 넣음")

    # 3) 본문 — ProseMirror 는 줄바꿈을 Enter 로 넣어야 한다
    ed = pg.locator(".ProseMirror").first
    ed.click()
    pg.wait_for_timeout(300)
    # 문단 사이만 Enter, 문단 안 줄바꿈은 Shift+Enter — 안 그러면 빈 문단이 끼어 간격이 벌어진다
    for bi, block in enumerate(BODY.split(chr(10) + chr(10))):
        if bi:
            pg.keyboard.press("Enter")
        for li, line in enumerate(block.split(chr(10))):
            if li:
                pg.keyboard.press("Shift+Enter")
            pg.keyboard.insert_text(line)
    print("본문 넣음", len(BODY), "자")

    # 한 번에 다 던지면 업로드가 끝난 순서대로 꽂혀 순서가 뒤섞인다 → 한 장씩, 들어간 걸 보고 다음 장
    inp = pg.locator("input[type=file][accept*='image']").first
    for k, f in enumerate(PICS, 1):
        inp.set_input_files(str(f))
        for _ in range(40):
            pg.wait_for_timeout(500)
            if pg.evaluate("document.querySelectorAll('.ProseMirror img').length") >= k:
                break
        else:
            print("  안 올라감:", f.name)
    print("사진", len(PICS), "장 붙임")
    print("본문 글자 수:", pg.evaluate("document.querySelector('.ProseMirror').innerText.length"))
    print("본문 안 이미지 수:", pg.evaluate("document.querySelectorAll('.ProseMirror img').length"))
    pg.screenshot(path=str(OUT / "preview.png"))
    print("등록 버튼은 누르지 않았습니다.")
