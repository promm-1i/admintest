"""당근 비즈니스 소식 작성 — 종류·사진·제목·본문까지 채운다. 등록은 누르지 않는다.

  python biz_post.py aurelle      한 건 채우기

사진은 폴더에서 00_전체_* 를 빼고 첫화면 → 개요 → 페이지구성 → 포인트 → 디테일 → 모바일 → FAQ 순으로 10장까지.
"""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

CAP = Path.home() / "Desktop" / "개발" / "프리미엄_상세페이지_캡처"
NEW = "https://bizprofile.daangn.com/biz_accounts/4030544/manager/posts/new/"
TAIL = "위 주소에서 전체 구성을 보실 수 있습니다.\n맞춤형 홈페이지 제작은 채팅으로 편하게 문의해 주세요."

POSTS = {
    "aurelle": ("STAP-1002_아우렐 호텔 서울", "고급 호텔처럼 보이는 예약형 홈페이지", """이번 포트폴리오는
단일 럭셔리 호텔을 콘셉트로 제작한 홈페이지입니다.

숙소는 사진이 좋아도
객실과 요금, 예약 버튼이 한 흐름으로 이어지지 않으면 이탈이 생깁니다.

첫 화면은 슬라이더로 분위기를 보여주고
예약 바는 스크롤을 내려도 화면에 붙어 있게 했습니다.

공간은 아코디언으로 접었다 펴고
다이닝은 탭으로 나눠 필요한 것만 보게 했습니다.

멤버십은 등급 비교표로 정리해서
혜택 차이가 한눈에 보이도록 했습니다."""),

    "damhwa": ("STAP-1003_담화재", "한옥 감성을 차분하게 담은 숙소 홈페이지", """이번 포트폴리오는
한옥 스테이와 독채 펜션을 콘셉트로 제작한 홈페이지입니다.

독채 숙소는 객실이 몇 개 없는 대신
방 하나를 얼마나 자세히 보여주느냐가 예약을 가릅니다.

객실은 4칸으로 놓고
마우스를 올리면 미리보기가 바뀌게 했습니다.

들어가면 전폭 갤러리와 비품 탭, 평면도 팝업까지 이어져서
사진만 보고 결정하지 않아도 됩니다.

사계절 장면이 스크롤에 맞춰 넘어가고
예약 안내 영역의 사진도 같이 바뀝니다."""),

    "kmiec": ("CORP-1015_K-모빌리티 국제교육센터", "공공기관·교육센터에 맞춘 신뢰형 홈페이지", """이번 포트폴리오는
대학 부설 센터와 공공기관을 콘셉트로 제작한 홈페이지입니다.

기관 홈페이지는 꾸미는 것보다
무슨 일을 하는 곳이고 어디서 신청하는지가 먼저 보여야 합니다.

첫 화면은 좌우로 열리는 장면으로 시작하고
숫자를 세면서 규모를 보여줍니다.

미션 구역은 가운데 사진이 흐름에 맞춰 바뀌고
사업 로드맵은 목차를 따라가며 읽을 수 있게 했습니다.

인증제도 6쪽과 위원회 명단표, 일정표, 온라인 신청 폼까지
기관에서 실제로 쓰는 화면을 갖췄습니다."""),

    "prizm": ("AGEP-1002_프리즘", "광고대행사에 어울리는 감각적인 홈페이지", """이번 포트폴리오는
종합광고대행사를 콘셉트로 제작한 홈페이지입니다.

대행사 홈페이지는 설명을 길게 쓰는 것보다
어떤 일을 해왔는지 바로 보여주는 쪽이 빠릅니다.

첫 화면은 대형 영문 제목과 회전 배경으로 잡고
문장은 줄 단위로 올라오게 했습니다.

포트폴리오는 22칸으로 놓고
마우스를 올리면 사진이 바뀌면서 수행 내역이 같이 뜹니다.

강점은 세로 스크롤로 넘기고 숫자는 올라가며 세고
진행 과정은 가로로 밀어 보게 했습니다."""),

    "orbitlab": ("AGEP-1001_오빗랩", "프로젝트가 돋보이는 에이전시 홈페이지", """이번 포트폴리오는
디지털 에이전시를 콘셉트로 제작한 홈페이지입니다.

에이전시는 프로젝트 수가 많을수록
찾아보기 쉬운 구조가 중요합니다.

프로젝트는 38건을 분류와 상태로 거를 수 있고
건마다 상세 쪽을 따로 뒀습니다.

메인은 스크롤에 고정되는 장면 8개로 이어지고
서비스 카드는 제목이 줄어들며 붙습니다.

문의 폼에서는 업무 범위와 성격, 예산, 기간을 고르게 해서
상담 전에 필요한 정보가 모입니다."""),
}


def photo_count(pg) -> int:
    """사진 칸의 'n/10' 표시. 붙이고 나면 클래스가 바뀌어서 글자로 찾는다."""
    loc = pg.locator("text=/^\d+\/10$/")
    if not loc.count():
        return -1
    return int(loc.first.inner_text().split("/")[0])


def close_dialogs(pg) -> None:
    """열려 있는 대화창을 닫는다. 덮개(backdrop)가 남으면 클릭이 전부 막힌다."""
    for _ in range(6):
        if pg.evaluate("document.querySelectorAll('[class*=seed-dialog__backdrop]').length") == 0:
            return
        # 임시 저장된 글이 있으면 '새로 쓰기'로 비우고 시작한다
        done = False
        for name in ("새로 쓰기", "닫기", "확인"):
            btn = pg.get_by_role("button", name=name)
            if btn.count():
                try:
                    btn.first.click(timeout=3000)
                    done = True
                    break
                except Exception:
                    pass
        if not done:
            try:
                pg.keyboard.press("Escape")
            except Exception:
                pass
        pg.wait_for_timeout(700)
    n = pg.evaluate("document.querySelectorAll('[class*=seed-dialog__backdrop]').length")
    if n:
        print(f"  (덮개 {n}개가 안 닫힘 — 화면을 확인해야 함)")


def pics(folder: str, limit: int = 10) -> list[Path]:
    """00_전체_* 는 세로 2만 px 이 넘어 뺀다. 나머지를 화면 순서대로."""
    d = CAP / folder
    order = ["01_", "02_", "04_", "05_", "06_", "07_", "09_"]
    fs = [f for f in sorted(d.glob("*.jpg")) if not f.name.startswith("00_")]
    fs.sort(key=lambda f: (next((i for i, p in enumerate(order) if f.name.startswith(p)), 99), f.name))
    return fs[:limit]


def main() -> None:
    key = sys.argv[1]
    folder, title, body = POSTS[key]
    text = f"https://noveriq.co.kr/{key}/\n\n{body}\n\n{TAIL}"
    files = pics(folder)

    with sync_playwright() as p:
        b = p.chromium.connect_over_cdp("http://localhost:9222")
        pg = b.contexts[0].pages[-1]
        pg.goto(NEW, wait_until="domcontentloaded")
        pg.wait_for_timeout(3500)
        close_dialogs(pg)

        pg.get_by_text("작업 사례", exact=True).first.click()
        pg.wait_for_timeout(700)
        print("종류: 작업 사례")

        pg.locator("button.css-mw5fyl").first.click()
        pg.wait_for_timeout(1200)
        with pg.expect_file_chooser(timeout=15000) as fc:
            pg.get_by_text("내 앨범에서 선택", exact=True).first.click()
        fc.value.set_files([str(f) for f in files])
        for _ in range(40):
            pg.wait_for_timeout(700)
            if photo_count(pg) >= len(files):
                break
        print(f"사진: {photo_count(pg)}/10 —", ", ".join(f.name for f in files))

        t = pg.locator("input[placeholder='소식 제목']").first
        t.click()
        t.fill(title)
        print("제목:", title)

        ed = pg.locator("[contenteditable=true]").first
        ed.click()
        pg.wait_for_timeout(300)
        for bi, block in enumerate(text.split(chr(10) + chr(10))):
            if bi:
                pg.keyboard.press("Enter")
            for li, line in enumerate(block.split(chr(10))):
                if li:
                    pg.keyboard.press("Shift+Enter")
                pg.keyboard.insert_text(line)
        print("본문:", len(text), "자")
        print("등록 버튼은 누르지 않았습니다.")


if __name__ == "__main__":
    main()
