"""공지사항 글 — 대표 사진 20장 + 각 사진 아래 링크. 등록 버튼은 누르지 않는다."""
from pathlib import Path
from playwright.sync_api import sync_playwright

OUT = Path.home() / '.daangn' / 'out'
OUT.mkdir(parents=True, exist_ok=True)

ROOT = Path.home() / "Desktop" / "개발" / "2. 홍보카드"
BOARD = "공지사항"
TITLE = "프리미엄 홈페이지 제작 사례 모음입니다"

HEAD = """지금까지 만든 프리미엄 디자인 대표 화면입니다.
목업이 아니라 실제로 돌아가는 홈페이지에서 그대로 캡처한 화면입니다."""

TAIL = """한 글에 사진이 20장까지만 올라가서 이만큼만 올립니다.

이렇게 구현하면 이쁩니다."""

# (슬러그, 폴더, 라벨) — 업종이 몰려 보이지 않게 섞어서 배치
ITEMS = [
    ("corporate-g", "CORP-1002_한벡스금속", "제조 · 금속 주조 기업"),
    ("dental-f", "HOSP-1002_365서울예담치과", "치과 의원"),
    ("hotel-e", "STAP-1001_서라호텔앤리조트", "호텔 · 리조트 그룹"),
    ("corporate-h", "CORP-1003_하이온셀", "제조 · 배터리 기업"),
    ("brew-a", "BREP-1001_해담양조", "주류 · 양조 브랜드"),
    ("wedding-a", "WEDP-1001_서울바우", "웨딩 · 컨시어지"),
    ("corporate-i", "CORP-1004_누빛광학", "정밀 광학 · 방산 기업"),
    ("hospital-a", "HOSP-1003_한울혈액암병원", "전문병원 · 대학병원"),
    ("rentcar-f", "RENP-1001_두루카", "렌터카 · 카셰어링"),
    ("corporate-j", "CORP-1005_세온기계", "제조 · 공작기계 기업"),
    ("clinic-f", "HOSP-1001_결온의원", "피부미용 · 바디 컨투어링 의원"),
    ("artist-a", "ARTP-1001_NOVERIQ", "작가 · 아티스트 포트폴리오"),
    ("corporate-k", "CORP-1006_누리웰", "식품 · 헬스케어 기업"),
    ("rentcar-g", "RENP-1002_한길렌터카", "렌터카 · 장기 · 법인"),
    ("corporate-l", "CORP-1007_한결그룹", "지주 · 생활기업"),
    ("corporate-m", "CORP-1008_FLOVEX", "산업설비 · 스마트 플로우 기업"),
    ("corporate-n", "CORP-1009_NEXORA GROUP", "첨단소재 · 산업인프라 그룹"),
    ("corporate-o", "CORP-1010_NATURIVE LAB", "화장품 원료 · 바이오 연구기업"),
    ("corporate-r", "CORP-1013_넥스하버", "항만 물류 · 터미널 운영 기업"),
    ("corporate-s", "CORP-1014_온결산업기록관", "산업 역사관 · 기업 기록관"),
]


def type_block(pg, text):
    """문단 사이는 Enter, 문단 안 줄바꿈은 Shift+Enter."""
    for bi, block in enumerate(text.split(chr(10) + chr(10))):
        if bi:
            pg.keyboard.press("Enter")
        for li, line in enumerate(block.split(chr(10))):
            if li:
                pg.keyboard.press("Shift+Enter")
            pg.keyboard.insert_text(line)


with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    ctx = b.contexts[0]
    pg = ctx.new_page()
    pg.goto("https://cafe.daangn.com/hompeiji-jejags/posts/new", wait_until="domcontentloaded")
    pg.wait_for_timeout(3000)

    box = pg.locator("[role=listbox]")
    if not box.is_visible():
        pg.locator("button.flex.items-center.justify-between").first.click()
        box.wait_for(state="visible", timeout=10000)
    box.get_by_text(BOARD, exact=True).first.click()
    pg.wait_for_timeout(800)
    print("게시판:", pg.locator("button.flex.items-center.justify-between").first.inner_text().strip())

    t = pg.locator("input[placeholder='제목을 입력해주세요.']").first
    t.click()
    t.fill(TITLE)
    print("제목 넣음")

    ed = pg.locator(".ProseMirror").first
    ed.click()
    pg.wait_for_timeout(300)
    type_block(pg, HEAD)

    inp = pg.locator("input[type=file][accept*='image']").first
    for k, (slug, folder, label) in enumerate(ITEMS, 1):
        f = ROOT / folder / "당근_카페" / "01-대표.jpg"
        if not f.exists():
            print("  사진 없음:", folder)
            continue
        pg.keyboard.press("Enter")
        inp.set_input_files(str(f))          # 한 장씩 — 한꺼번에 던지면 순서가 뒤섞인다
        for _ in range(40):
            pg.wait_for_timeout(500)
            if pg.evaluate("document.querySelectorAll('.ProseMirror img').length") >= k:
                break
        else:
            print("  안 올라감:", folder)
        pg.keyboard.press("Enter")
        pg.keyboard.insert_text(label)
        print(f"  {k:2d} {label}")

    pg.keyboard.press("Enter")
    type_block(pg, TAIL)

    print("사진 수:", pg.evaluate("document.querySelectorAll('.ProseMirror img').length"))
    print("글자 수:", pg.evaluate("document.querySelector('.ProseMirror').innerText.length"))
    pg.screenshot(path=str(OUT / "notice.png"))
    print("등록 버튼은 누르지 않았습니다.")
