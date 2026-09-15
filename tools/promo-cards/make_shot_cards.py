"""스크롤 장면이 많은 템플릿용 홍보 카드 — 사례 데이터 없이 '장면 프레임'으로 뽑는다.

끈적 장면 · 휠 관문이 있는 템플릿은 전체 캡처가 깨지므로, 휠로 조금씩 내리며 뷰포트를 찍어 두고
그중 고른 프레임을 카드에 끼운다. 크몽 10장(대표 1080x1080) · 블로그 20장 · 당근 비즈니스 소식 10장 · 당근 카페 20장.
크몽판은 가격 · 주소 없음, 당근판은 가격만(주소 대신 문의 안내), 블로그판은 가격 · 주소.

  python tools/promo-cards/make_shot_cards.py corporate-f --capture   # 프레임 찍기 (개발 서버 5173 필요)
  python tools/promo-cards/make_shot_cards.py corporate-f             # 카드 만들기
"""
import sys
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).parent))
from make_cards import (  # noqa: E402
    KMONG_MAIN_CSS, LIGHT_BG, OUT_ROOT, W, H, esc, foot, kmong_main_square, lines, page, process_card, render,
)

SERVER = "http://localhost:5173/templates/"

# ── 템플릿별 설명서. 문구는 템플릿 코드에서 동작을 확인한 것만 ──
SPECS: dict[str, dict] = {
    "corporate-f": {
        "code": "CORP-1001",
        "brand": "하온디앤씨",
        "industry": "종합 건설 · 개발 기업",
        "accent": "rgb(0,122,104)",
        "slug": "corporate-f-template",
        "hook": ("스크롤로 신뢰를 쌓는", "건설 · 개발 기업 홈페이지"),
        "kmong_hook": ("스크롤로 신뢰를 쌓는", "기업 홈페이지"),
        "pages": ["index", "about", "history", "business", "residential", "news", "careers"],
        "mobile_pages": ["index"],
        "extras": [{"name": "menu", "page": "index", "hover": "#gnb li:nth-child(2) a"}],
        "grid_title": "7쪽으로 짓는 기업 홈페이지",
        "mobile_title": "휴대폰에서도\n같은 스크롤 장면으로",
        "cta_line": "우리 회사 홈페이지를",
        "grid": [
            ("메인", "pc-index-00"), ("CEO 인사말", "pc-about-01"), ("주요 연혁", "pc-history-04"),
            ("사업 개요", "pc-business-02"), ("주거 개발", "pc-residential-07"), ("회사 소식", "pc-news-01"),
            ("채용 안내", "pc-careers-01"),
        ],
        "phones": [("첫 화면", "m-index-00"), ("사업 무대", "m-index-20"), ("품질 · 안전", "m-index-31")],
        "blog": [
            ("MAIN", "첫 화면은\n사진 한 장으로 크게", ["pc-index-00"], "메인 · 첫 화면"),
            ("MENU", "메뉴에 올리면\n하위 메뉴가 한 판에", ["x-menu"], "메인 · 메뉴 6개 · 하위 메뉴 21개"),
            ("STORY", "스크롤하면\n사진과 글이 차례로 바뀝니다", ["pc-index-03", "pc-index-06"], "메인 · 회사 소개 무대 (세 장면)"),
            ("BUSINESS", "사업 세 가지를\n스크롤 한 번씩 펼칩니다", ["pc-index-12", "pc-index-15", "pc-index-18"], "메인 · 사업 무대 — 카드를 누르면 그 장면으로 이동"),
            ("PROJECTS", "시공 실적은\n옆으로 넘겨 봅니다", ["pc-index-22"], "메인 · 실적 슬라이드 (화살표로 한 장씩)"),
            ("QUALITY", "품질 · 안전은\n현장 사진 위에 덮어서", ["pc-index-26"], "메인 · 품질 · 안전 장면"),
            ("UPDATES", "회사 소식과 채용으로\n자연스럽게 이어집니다", ["pc-index-28@0:.78"], "메인 · 소식 · 채용 바로가기"),
            ("CEO", "대표 인사말은\n빛이 드는 사진 위에", ["pc-about-01"], "CEO 인사말 · 서명까지"),
            ("HISTORY", "연혁은 시대 탭이\n스크롤을 따라옵니다", ["pc-history-04", "pc-history-10"], "주요 연혁 · 다섯 시대"),
            ("PRINCIPLES", "원칙 네 가지를\n휠 한 번에 한 장씩", ["pc-business-01", "pc-business-02", "pc-business-03", "pc-business-04"], "사업 개요 · 원칙 판 4장"),
            ("AREAS", "짓는 공간은\n사진 카드로 한눈에", ["pc-business-06"], "사업 개요 · 사업 영역 카드"),
            ("RESIDENTIAL", "주거 개발은\n생활 장면으로 설명합니다", ["pc-residential-02"], "주거 개발 · 생활 장면"),
            ("FEATURED", "대표 단지는\n화면 가득 크게", ["pc-residential-07"], "주거 개발 · 대표 단지"),
            ("ALL PROJECTS", "전체 실적은\n사진 목록과 검색으로", ["pc-residential-09"], "주거 개발 · 전체 실적 (제목 검색 동작)"),
            ("NEWS", "회사 소식도\n사진 카드 목록으로", ["pc-news-01"], "회사 소식 · 제목 검색 동작"),
            ("CAREERS", "채용 절차와 질문을\n한 페이지에", ["pc-careers-01", "pc-careers-03"], "채용 안내 · 신입 / 경력 절차 · 질문 펼침"),
        ],
        "kmong": [
            ("MAIN", "첫 화면과\n메뉴 펼침판", ["pc-index-00", "x-menu"], "메인 · 첫 화면 · 메뉴 6개 · 하위 메뉴 21개"),
            ("BUSINESS", "사업 세 가지를\n스크롤 한 번씩 펼칩니다", ["pc-index-12", "pc-index-15", "pc-index-18"], "메인 · 사업 무대"),
            ("PROJECTS", "시공 실적과\n품질 · 안전 장면", ["pc-index-22", "pc-index-26"], "메인 · 실적 슬라이드 · 품질 · 안전"),
            ("CEO · HISTORY", "대표 인사말과\n시대별 연혁", ["pc-about-01", "pc-history-04"], "CEO 인사말 · 주요 연혁"),
            ("PRINCIPLES", "원칙 네 가지를\n휠 한 번에 한 장씩", ["pc-business-01", "pc-business-02", "pc-business-03", "pc-business-04"], "사업 개요 · 원칙 판 4장"),
            ("RESIDENTIAL", "대표 단지와\n전체 실적 목록", ["pc-residential-07", "pc-residential-09"], "주거 개발 · 대표 단지 · 전체 실적"),
        ],
    },
    "estate-g": {
        "code": "ESTP-1003",
        "brand": "온채",
        "industry": "회원제 부동산 중개법인",
        "accent": "rgb(41,69,70)",
        "slug": "estate-g-template",
        "pages": ["index", "listings", "listing", "inquiry"],
        "mobile_pages": ["index", "listing"],
        "extras": [
            {"name": "filter", "page": "listings", "scroll": "#fbar", "offset": 160,
             "js": "(()=>{const s=document.querySelector('#fbar select[data-k=type]');s.value='고급빌라';s.dispatchEvent(new Event('change',{bubbles:true}))})()"},
            {"name": "gate-before", "page": "listing", "scroll": "[data-gate]", "offset": 380},
            {"name": "gate-after", "page": "listing", "scroll": "[data-gate]", "offset": 380, "clicks": ["[data-gate]"]},
            {"name": "thumb", "page": "listing", "clicks": ["#thumbs button:nth-child(3)"]},
            {"name": "tab2", "page": "inquiry", "scroll": "#tabs", "offset": 140, "clicks": ["#tabs button:nth-child(2)"]},
            {"name": "tab3", "page": "inquiry", "scroll": "#tabs", "offset": 140, "clicks": ["#tabs button:nth-child(3)"]},
            {"name": "faq", "page": "index", "scroll": "#faq", "offset": 100, "clicks": ["#faq button"]},
            {"name": "mmenu", "page": "index", "mode": "m", "clicks": [".burger"]},
        ],
        "hook": ("금액은 회원에게만 여는", "부동산 중개법인 홈페이지"),
        "kmong_hook": ("금액은 회원에게만 여는", "부동산 홈페이지"),
        "grid_title": "4쪽으로 짓는 회원제 부동산",
        "mobile_title": "휴대폰에서도\n금액 가림은 그대로",
        "cta_line": "우리 중개법인 홈페이지를",
        "grid": [("메인", "pc-index-00"), ("매물 찾기", "pc-listings-00"), ("매물 상세", "pc-listing-00"), ("의뢰하기", "pc-inquiry-00")],
        "phones": [("첫 화면", "m-index-00"), ("매물 상세", "m-listing-01"), ("전체 화면 메뉴", "x-mmenu")],
        "blog": [
            ("HERO", "좋은 집을 먼저 찾는\n첫 화면", ["pc-index-00"], "메인 · 사진 3장 슬라이드 · 숫자 3개"),
            ("FINDER", "첫 화면에서 바로\n조건 검색", ["pc-index-01"], "메인 · 지역 · 형태 · 거래 · 평형을 고르면 매물 찾기로 이동"),
            ("FEATURED", "이번 주 추천 매물을\n사진 카드로", ["pc-index-02"], "메인 · 이번 주 추천 매물"),
            ("MEMBERSHIP", "금액을 가리는 이유를\n먼저 설명합니다", ["pc-index-04"], "메인 · 회원 가입 3단계 안내"),
            ("PRESALE", "분양은 공고 전부터\n세대수와 일정을", ["pc-index-06"], "메인 · 분양 라인업 · 세대수 · 입주 · 분양 시기"),
            ("LATEST", "최근 등록 매물도\n한눈에", ["pc-index-09"], "메인 · 최근 등록 매물"),
            ("AGENTS", "누가 맡는지\n얼굴과 경력으로", ["pc-index-11", "pc-index-12"], "메인 · 담당 중개사 · 담당 지역 · 경력 · 거래 건수"),
            ("REQUEST", "의뢰는 세 갈래로\n바로 시작", ["pc-index-14"], "메인 · 매수 · 매도 / 임차 / 매물 촬영 의뢰"),
            ("FAQ", "질문은\n눌러서 펼칩니다", ["x-faq"], "메인 · 자주 묻는 질문"),
            ("LISTINGS", "조건 여섯 가지로\n바로 걸러 봅니다", ["pc-listings-00"], "매물 찾기 · 조건 바 · 정렬 · 초기화"),
            ("FILTER", "고르는 즉시\n매물 수가 바뀝니다", ["pc-listings-00", "x-filter"], "매물 찾기 · 고급빌라를 고르면 3건만 남습니다"),
            ("DETAIL", "사진 다섯 장과\n담당 중개사 상자", ["pc-listing-00", "x-thumb"], "매물 상세 · 작은 사진을 누르면 큰 사진이 바뀝니다"),
            ("GATE", "금액은\n로그인 후 확인", ["x-gate-before@.2:.8", "x-gate-after@.2:.8"], "매물 상세 · 로그인 후 확인 → 금액 공개 (데모는 누르면 열린 모습)"),
            ("INFO", "조건표와 설명,\n이 매물로 의뢰까지", ["pc-listing-02"], "매물 상세 · 조건표 · 매물 설명"),
            ("INQUIRY", "의뢰는 종류마다\n묻는 것이 다릅니다", ["pc-inquiry-00", "x-tab2", "x-tab3"], "의뢰하기 · 탭 3개 · 탭마다 다른 입력 칸"),
            ("CONSENT", "개인정보 동의까지\n한 화면에", ["pc-inquiry-02@0:.6"], "의뢰하기 · 개인정보 수집 안내 · 동의 체크"),
        ],
        "kmong": [
            ("MAIN", "첫 화면에서\n바로 조건 검색", ["pc-index-00", "pc-index-01"], "메인 · 사진 슬라이드 · 조건 검색"),
            ("MEMBERSHIP", "금액을 가리는 이유와\n분양 라인업", ["pc-index-04", "pc-index-06"], "메인 · 회원 안내 · 분양 라인업"),
            ("AGENTS", "담당 중개사와\n의뢰 세 갈래", ["pc-index-11", "pc-index-14"], "메인 · 담당 중개사 · 의뢰 안내"),
            ("FILTER", "조건 여섯 가지로\n바로 걸러 봅니다", ["pc-listings-00", "x-filter"], "매물 찾기 · 고르는 즉시 목록이 바뀝니다"),
            ("GATE", "사진 다섯 장,\n금액은 로그인 후 확인", ["pc-listing-00", "x-gate-before", "x-gate-after"], "매물 상세 · 갤러리 · 회원 공개 금액"),
            ("INQUIRY", "의뢰는 종류마다\n묻는 것이 다릅니다", ["pc-inquiry-00", "x-tab2", "x-tab3"], "의뢰하기 · 탭 3개"),
        ],
    },
}


# ── 프레임 찍기 ──
def capture(key: str, spec: dict, fdir: Path) -> None:
    fdir.mkdir(parents=True, exist_ok=True)
    base = f"{SERVER}{key}/"
    with sync_playwright() as p:
        b = p.chromium.launch()
        for mode, (vw, vh), pages in (("pc", (1440, 900), spec["pages"]), ("m", (390, 844), spec["mobile_pages"])):
            mob = mode == "m"
            ctx = b.new_context(viewport={"width": vw, "height": vh}, device_scale_factor=2 if mob else 1, is_mobile=mob, has_touch=mob)
            pg = ctx.new_page()
            for name in pages:
                pg.goto(base + name + ".html", wait_until="networkidle")
                pg.wait_for_timeout(1500)
                pg.mouse.move(vw / 2, vh / 2)
                same, last = 0, -1
                for i in range(80):
                    pg.screenshot(path=str(fdir / f"{mode}-{name}-{i:02d}.png"))
                    # 휠 관문은 scrollY 가 멈춘 채로 장면만 넘어가므로 여러 번 같아도 바로 끝내지 않는다
                    pg.evaluate("scrollBy(0,400)") if mob else pg.mouse.wheel(0, 450)
                    pg.wait_for_timeout(1300)
                    y = pg.evaluate("Math.round(scrollY)")
                    same = same + 1 if y == last else 0
                    last = y
                    if same >= 6:
                        break
                print(mode, name, "frames", i + 1)
            ctx.close()
        for ex in spec.get("extras", []):
            mob = ex.get("mode") == "m"
            vw, vh = (390, 844) if mob else (1440, 900)
            ctx = b.new_context(viewport={"width": vw, "height": vh}, device_scale_factor=2 if mob else 1, is_mobile=mob, has_touch=mob)
            pg = ctx.new_page()
            pg.goto(base + ex["page"] + ".html", wait_until="networkidle")
            pg.add_style_tag(content="html{scroll-behavior:auto!important}")
            pg.wait_for_timeout(1200)
            if ex.get("scroll"):
                pg.evaluate("s=>{const e=document.querySelector(s);scrollTo(0,e.getBoundingClientRect().top+scrollY-(%s))}" % ex.get("offset", 120), ex["scroll"])
                pg.wait_for_timeout(900)
            if ex.get("js"):
                pg.evaluate(ex["js"])
            for sel in ex.get("clicks", []):
                pg.click(sel)
                pg.wait_for_timeout(500)
            if ex.get("hover"):
                pg.hover(ex["hover"])
            pg.wait_for_timeout(ex.get("wait", 1200))
            pg.screenshot(path=str(fdir / f"x-{ex['name']}.png"))
            print("extra", ex["name"])
            ctx.close()
        b.close()


# ── 카드 조각 ──
def frame_uri(fdir: Path, ref: str) -> tuple[str, float]:
    """'이름@위:아래' 면 세로 비율로 잘라 쓴다 (푸터 연락처가 걸리는 프레임용). (주소, 세로/가로 비)"""
    name, _, cut = ref.partition("@")
    src = fdir / f"{name}.png"
    with Image.open(src) as im:
        if not cut:
            return src.as_uri(), im.size[1] / im.size[0]
        a, b = (float(x) for x in cut.split(":"))
        box = (0, round(im.size[1] * a), im.size[0], round(im.size[1] * b))
        out = fdir / f"_{name}_{a}_{b}.png"
        im.crop(box).save(out)
        return out.as_uri(), (box[3] - box[1]) / im.size[0]


def shot(uri: str, ratio: float, width: int, bar: int = 30) -> str:
    return f"""<div class="browser" style="width:{width}px"><div class="bar" style="height:{bar}px"><i></i><i></i><i></i></div>
<div style="height:{round(width * ratio)}px;overflow:hidden"><img src="{uri}"></div></div>"""


def collage(fdir: Path, refs: list[str]) -> str:
    """이미지 영역(920 x 약 820) 안에 1 · 2 · 3 · 4장을 배치."""
    fr = [frame_uri(fdir, r) for r in refs]
    n = len(fr)
    if n == 1:
        u, r = fr[0]
        return f'<div style="display:flex;justify-content:center">{shot(u, min(r, .85), 920, 34)}</div>'
    if n == 2:  # 비스듬히 겹치기
        (u1, r1), (u2, r2) = fr
        w = 840 if max(r1, r2) < .5 else 700  # 잘라 낸 납작한 컷은 더 크게
        return f"""<div style="position:relative;height:{round(w * r1) + round(w * r2) * .62 + 60:.0f}px">
<div style="position:absolute;left:0;top:0">{shot(u1, r1, w)}</div>
<div style="position:absolute;right:0;bottom:0">{shot(u2, r2, w)}</div></div>"""
    if n == 3:  # 계단식
        return '<div style="position:relative;height:750px">' + "".join(
            f'<div style="position:absolute;left:{i * 150}px;top:{i * 165}px">{shot(u, r, 620)}</div>' for i, (u, r) in enumerate(fr)
        ) + "</div>"
    return '<div style="display:grid;grid-template-columns:1fr 1fr;gap:24px">' + "".join(
        f"<div>{shot(u, r, 448, 22)}</div>" for u, r in fr
    ) + "</div>"


def shot_card(sp: dict, fdir: Path, label: str, title: str, refs: list[str], caption: str, n: int, total: int) -> str:
    return page(f"""
<div class="card" style="background:{LIGHT_BG};color:#1a1714">
  <p class="mono" style="color:{sp['accent']}">{esc(label)}</p>
  <h2 style="margin-top:22px;font-size:66px;font-weight:800;letter-spacing:-.035em;line-height:1.22">{lines(title)}</h2>
  <figure style="margin:auto 0;padding:36px 0 150px">
    {collage(fdir, refs)}
    <figcaption style="margin-top:22px;font-size:24px;color:#6b645d">{esc(caption)}</figcaption>
  </figure>
  {foot(sp['code'], n, total, '#1a1714')}
</div>""")


def grid_card(sp: dict, fdir: Path, n: int, total: int) -> str:
    if len(sp["grid"]) <= 4:  # 4쪽 이하는 2x2 로 크게
        cells = "".join(
            f"""<figure><div style="aspect-ratio:16/11;border-radius:12px;overflow:hidden;background:#fff;box-shadow:0 16px 34px -20px rgba(0,0,0,.35)">
<img src="{frame_uri(fdir, ref)[0]}" style="width:100%;height:100%;object-fit:cover;object-position:top"></div>
<figcaption style="margin-top:14px;font-size:24px;font-weight:700">{esc(name)}</figcaption></figure>"""
            for name, ref in sp["grid"]
        )
        return page(f"""
<div class="card" style="background:{LIGHT_BG};color:#1a1714">
  <p class="mono" style="color:{sp['accent']}">PAGES</p>
  <h2 style="margin-top:22px;font-size:66px;font-weight:800;letter-spacing:-.035em;line-height:1.2">{esc(sp['grid_title'])}</h2>
  <div style="margin-top:64px;display:grid;grid-template-columns:1fr 1fr;gap:40px 30px">{cells}</div>
  {foot(sp['code'], n, total, '#1a1714')}
</div>""")
    first, rest = sp["grid"][0], sp["grid"][1:]
    big = f"""<figure style="grid-column:1/-1"><div style="aspect-ratio:16/6.4;border-radius:12px;overflow:hidden;background:#fff;box-shadow:0 16px 34px -20px rgba(0,0,0,.35)">
<img src="{frame_uri(fdir, first[1])[0]}" style="width:100%;height:100%;object-fit:cover;object-position:top"></div>
<figcaption style="margin-top:12px;font-size:22px;font-weight:700">{esc(first[0])}</figcaption></figure>"""
    cells = big + "".join(
        f"""<figure><div style="aspect-ratio:16/11;border-radius:10px;overflow:hidden;background:#fff;box-shadow:0 16px 34px -20px rgba(0,0,0,.35)">
<img src="{frame_uri(fdir, ref)[0]}" style="width:100%;height:100%;object-fit:cover;object-position:top"></div>
<figcaption style="margin-top:12px;font-size:22px;font-weight:700">{esc(name)}</figcaption></figure>"""
        for name, ref in rest
    )
    return page(f"""
<div class="card" style="background:{LIGHT_BG};color:#1a1714">
  <p class="mono" style="color:{sp['accent']}">PAGES</p>
  <h2 style="margin-top:22px;font-size:66px;font-weight:800;letter-spacing:-.035em;line-height:1.2">{esc(sp['grid_title'])}</h2>
  <div style="margin-top:48px;display:grid;grid-template-columns:repeat(3,1fr);gap:28px 26px">{cells}</div>
  {foot(sp['code'], n, total, '#1a1714')}
</div>""")


def phones_card(sp: dict, fdir: Path, n: int, total: int) -> str:
    ph = "".join(
        f"""<figure style="width:290px;{'transform:translateY(-60px)' if i == 1 else ''}">
<div class="phone"><img src="{frame_uri(fdir, ref)[0]}"></div>
<figcaption style="margin-top:22px;text-align:center;font-size:24px;font-weight:600;opacity:.8">{esc(cap)}</figcaption></figure>"""
        for i, (cap, ref) in enumerate(sp["phones"])
    )
    return page(f"""
<div class="card" style="background:#171513;color:#fff">
  <p class="mono" style="color:rgba(255,255,255,.6)">MOBILE</p>
  <h2 style="margin-top:22px;font-size:66px;font-weight:800;letter-spacing:-.035em;line-height:1.22">{lines(sp['mobile_title'])}</h2>
  <div style="margin-top:150px;display:flex;justify-content:center;gap:34px;align-items:flex-end">{ph}</div>
  {foot(sp['code'], n, total, '#fff')}
</div>""")


def cover_card(sp: dict, fdir: Path, total: int) -> str:
    h1, h2 = sp["hook"]
    u, r = frame_uri(fdir, sp.get("cover", "pc-index-00"))
    return page(f"""
<div class="card" style="background:{LIGHT_BG};color:#1a1714">
  <p class="mono" style="color:{sp['accent']}">PREMIUM DESIGN · {sp['code']}</p>
  <h1 style="margin-top:30px;font-size:80px;font-weight:800;letter-spacing:-.045em;line-height:1.16"><span style="color:{sp['accent']}">{esc(h1)}</span><br>{esc(h2)}</h1>
  <p style="margin-top:22px;font-size:28px;font-weight:600;color:#6b645d">{esc(sp['brand'])} · {esc(sp['industry'])} · {len(sp['grid'])}쪽</p>
  <div style="position:absolute;left:80px;top:560px">{shot(u, r * .98, 800, 34)}</div>
  <div style="position:absolute;right:70px;top:680px;width:250px" class="phone"><img src="{frame_uri(fdir, sp['phones'][0][1])[0]}"></div>
  {foot(sp['code'], 1, total, '#1a1714')}
</div>""")


def cta_card(sp: dict, n: int, total: int, with_url: bool = True) -> str:
    a = sp["accent"]
    box = (f'''<p style="font-size:24px;color:#6b645d">실제 화면 · 상세 설명 보기</p>
    <p style="margin-top:8px;font-size:32px;font-weight:700">noveriq.co.kr/samples/{sp['slug']}</p>''' if with_url else
           '''<p style="font-size:24px;color:#6b645d">상담 문의</p>
    <p style="margin-top:8px;font-size:32px;font-weight:700">궁금하신 점은 편하게 문의해 주세요</p>''')
    return page(f"""
<div class="card" style="background:{LIGHT_BG};color:#1a1714">
  <p class="mono" style="color:{a}">{sp['code']} · {esc(sp['brand'])}</p>
  <h2 style="margin-top:34px;font-size:72px;font-weight:800;letter-spacing:-.035em;line-height:1.2">이 디자인으로<br>{esc(sp['cta_line'])}</h2>
  <p style="margin-top:64px;font-size:30px;color:#6b645d">프리미엄 제작</p>
  <p style="margin-top:6px;font-size:132px;font-weight:800;letter-spacing:-.04em;line-height:1;color:{a}">300<span style="font-size:64px;margin-left:8px">만 원부터</span></p>
  <ul style="margin-top:48px;list-style:none;font-size:30px;line-height:1.9;color:#3d3833">
    <li>· 브랜드 색 · 메뉴 · 섹션 구성을 사업에 맞춰 다시</li>
    <li>· 사진 새로 제작 · 휴대폰 화면까지</li>
    <li>· 자료를 받은 뒤 영업일 10일 이내 완성</li>
  </ul>
  <div style="margin-top:56px;padding:30px 36px;border-radius:20px;background:#fff;box-shadow:0 0 0 1px rgba(0,0,0,.07)">
    {box}
  </div>
  <p style="position:absolute;left:80px;bottom:118px;font-size:19px;color:#8a837b">화면 속 브랜드명 · 사진 · 내용은 디자인 예시입니다.</p>
  {foot(sp['code'], n, total, '#1a1714')}
</div>""")


def kmong_main(sp: dict, fdir: Path) -> str:
    u, r = frame_uri(fdir, sp.get("cover", "pc-index-00"))
    chips = [f"{len(sp['grid'])}쪽 구성", "PC · 휴대폰", "관리자 모드", "영업일 10일 완성"]
    return kmong_main_square(sp["code"], sp["accent"], sp["kmong_hook"], f"{sp['brand']} · {sp['industry']}", chips,
                             u, r, frame_uri(fdir, sp["phones"][0][1])[0])


def main() -> None:
    key = sys.argv[1]
    sp = SPECS[key]
    root = OUT_ROOT / f"{sp['code']}_{sp['brand']}"
    fdir = root / "_frames"
    if "--capture" in sys.argv:
        capture(key, sp, fdir)
        return

    def long_set(with_url: bool) -> list[tuple[str, str]]:
        """표지 · 구성 · 장면 16 · 모바일 · 상담 = 20장"""
        t = 2 + len(sp["blog"]) + 2
        cards = [("01-표지", cover_card(sp, fdir, t)), ("02-구성", grid_card(sp, fdir, 2, t))]
        for i, (lab, title, refs, cap) in enumerate(sp["blog"], start=3):
            cards.append((f"{i:02d}-{lab.split()[0].lower()}", shot_card(sp, fdir, lab, title, refs, cap, i, t)))
        n = len(cards) + 1
        return cards + [(f"{n:02d}-mobile", phones_card(sp, fdir, n, t)), (f"{n + 1:02d}-상담", cta_card(sp, n + 1, t, with_url))]

    def short_shots(t: int) -> list[tuple[str, str]]:
        return [(f"{i:02d}-{lab.split()[0].lower()}", shot_card(sp, fdir, lab, title, refs, cap, i, t))
                for i, (lab, title, refs, cap) in enumerate(sp["kmong"], start=3)]

    t = 2 + len(sp["kmong"]) + 2  # 10
    n = t - 1
    sets = {
        "블로그": long_set(True),
        "당근_카페": long_set(False),
        "당근_비즈니스소식": [("01-표지", cover_card(sp, fdir, t)), ("02-구성", grid_card(sp, fdir, 2, t))] + short_shots(t)
        + [(f"{n:02d}-mobile", phones_card(sp, fdir, n, t)), (f"{t:02d}-상담", cta_card(sp, t, t, False))],
        "크몽": [("02-구성", grid_card(sp, fdir, 2, t))] + short_shots(t)
        + [(f"{n:02d}-mobile", phones_card(sp, fdir, n, t)), (f"{t:02d}-진행과정", process_card(sp["code"], sp["accent"], t, t))],
    }

    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": W, "height": H})
        hi = b.new_page(viewport={"width": W, "height": H}, device_scale_factor=2)
        for folder, cards in sets.items():
            out = root / folder
            out.mkdir(parents=True, exist_ok=True)
            for old in out.glob("*.png"):
                old.unlink()
            if folder == "크몽":
                render(hi, kmong_main(sp, fdir), out / "01-메인.png", KMONG_MAIN_CSS, KMONG_MAIN_CSS)
            for name, doc in cards:
                render(pg, doc, out / f"{name}.png", W, H)
            print(folder, len(list(out.glob("*.png"))))
        b.close()
    for f in fdir.glob("_*.png"):
        f.unlink()


if __name__ == "__main__":
    main()
