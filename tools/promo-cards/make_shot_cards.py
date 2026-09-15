"""스크롤 장면이 많은 템플릿용 홍보 카드 — 사례 데이터 없이 '장면 프레임'으로 뽑는다.

끈적 장면 · 휠 관문이 있는 템플릿은 전체 캡처가 깨지므로, 휠로 조금씩 내리며 뷰포트를 찍어 두고
그중 고른 프레임을 카드에 끼운다. 블로그 · 당근용 20장 + 크몽용 10장(대표 1080x1080 포함).

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
        pg = b.new_page(viewport={"width": 1440, "height": 900})
        pg.goto(base + "index.html", wait_until="networkidle")
        pg.wait_for_timeout(1500)
        pg.hover("#gnb li:nth-child(2) a")
        pg.wait_for_timeout(1200)
        pg.screenshot(path=str(fdir / "x-menu.png"))
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
        return f"""<div style="position:relative;height:{round(700 * r1) + round(700 * r2) * .62 + 60:.0f}px">
<div style="position:absolute;left:0;top:0">{shot(u1, r1, 700)}</div>
<div style="position:absolute;right:0;bottom:0">{shot(u2, r2, 700)}</div></div>"""
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
  <h2 style="margin-top:22px;font-size:66px;font-weight:800;letter-spacing:-.035em;line-height:1.2">{len(sp['grid'])}쪽으로 짓는 기업 홈페이지</h2>
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
  <p class="mono" style="color:{sp['accent']}">MOBILE</p>
  <h2 style="margin-top:22px;font-size:66px;font-weight:800;letter-spacing:-.035em;line-height:1.22">휴대폰에서도<br>같은 스크롤 장면으로</h2>
  <div style="margin-top:150px;display:flex;justify-content:center;gap:34px;align-items:flex-end">{ph}</div>
  {foot(sp['code'], n, total, '#fff')}
</div>""")


def cover_card(sp: dict, fdir: Path, total: int) -> str:
    h1, h2 = sp["hook"]
    u, r = frame_uri(fdir, "pc-index-00")
    return page(f"""
<div class="card" style="background:{LIGHT_BG};color:#1a1714">
  <p class="mono" style="color:{sp['accent']}">PREMIUM DESIGN · {sp['code']}</p>
  <h1 style="margin-top:30px;font-size:80px;font-weight:800;letter-spacing:-.045em;line-height:1.16"><span style="color:{sp['accent']}">{esc(h1)}</span><br>{esc(h2)}</h1>
  <p style="margin-top:22px;font-size:28px;font-weight:600;color:#6b645d">{esc(sp['brand'])} · {esc(sp['industry'])} · {len(sp['grid'])}쪽</p>
  <div style="position:absolute;left:80px;top:560px">{shot(u, r * .98, 800, 34)}</div>
  <div style="position:absolute;right:70px;top:680px;width:250px" class="phone"><img src="{frame_uri(fdir, sp['phones'][0][1])[0]}"></div>
  {foot(sp['code'], 1, total, '#1a1714')}
</div>""")


def cta_card(sp: dict, n: int, total: int) -> str:
    a = sp["accent"]
    return page(f"""
<div class="card" style="background:{LIGHT_BG};color:#1a1714">
  <p class="mono" style="color:{a}">{sp['code']} · {esc(sp['brand'])}</p>
  <h2 style="margin-top:34px;font-size:72px;font-weight:800;letter-spacing:-.035em;line-height:1.2">이 디자인으로<br>우리 회사 홈페이지를</h2>
  <p style="margin-top:64px;font-size:30px;color:#6b645d">프리미엄 제작</p>
  <p style="margin-top:6px;font-size:132px;font-weight:800;letter-spacing:-.04em;line-height:1;color:{a}">300<span style="font-size:64px;margin-left:8px">만 원부터</span></p>
  <ul style="margin-top:48px;list-style:none;font-size:30px;line-height:1.9;color:#3d3833">
    <li>· 브랜드 색 · 메뉴 · 섹션 구성을 사업에 맞춰 다시</li>
    <li>· 사진 새로 제작 · 휴대폰 화면까지</li>
    <li>· 자료를 받은 뒤 영업일 10일 이내 완성</li>
  </ul>
  <div style="margin-top:56px;padding:30px 36px;border-radius:20px;background:#fff;box-shadow:0 0 0 1px rgba(0,0,0,.07)">
    <p style="font-size:24px;color:#6b645d">실제 화면 · 상세 설명 보기</p>
    <p style="margin-top:8px;font-size:32px;font-weight:700">noveriq.co.kr/samples/{sp['slug']}</p>
  </div>
  <p style="position:absolute;left:80px;bottom:118px;font-size:19px;color:#8a837b">화면 속 브랜드명 · 사진 · 내용은 디자인 예시입니다.</p>
  {foot(sp['code'], n, total, '#1a1714')}
</div>""")


def kmong_main(sp: dict, fdir: Path) -> str:
    u, r = frame_uri(fdir, "pc-index-00")
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

    blog_total = 2 + len(sp["blog"]) + 2
    blog = [("01-표지", cover_card(sp, fdir, blog_total)), ("02-구성", grid_card(sp, fdir, 2, blog_total))]
    for i, (lab, t, refs, cap) in enumerate(sp["blog"], start=3):
        blog.append((f"{i:02d}-{lab.split()[0].lower()}", shot_card(sp, fdir, lab, t, refs, cap, i, blog_total)))
    n = len(blog) + 1
    blog += [(f"{n:02d}-mobile", phones_card(sp, fdir, n, blog_total)), (f"{n + 1:02d}-상담", cta_card(sp, n + 1, blog_total))]

    km_total = 2 + len(sp["kmong"]) + 2
    kmong = [("02-구성", grid_card(sp, fdir, 2, km_total))]
    for i, (lab, t, refs, cap) in enumerate(sp["kmong"], start=3):
        kmong.append((f"{i:02d}-{lab.split()[0].lower()}", shot_card(sp, fdir, lab, t, refs, cap, i, km_total)))
    n = len(kmong) + 2
    kmong += [(f"{n:02d}-mobile", phones_card(sp, fdir, n, km_total)), (f"{n + 1:02d}-진행과정", process_card(sp["code"], sp["accent"], n + 1, km_total))]

    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": W, "height": H})
        hi = b.new_page(viewport={"width": W, "height": H}, device_scale_factor=2)
        out = root / "블로그_당근"
        out.mkdir(parents=True, exist_ok=True)
        for name, doc in blog:
            render(pg, doc, out / f"{name}.png", W, H)
        out = root / "크몽"
        out.mkdir(parents=True, exist_ok=True)
        render(hi, kmong_main(sp, fdir), out / "01-메인.png", KMONG_MAIN_CSS, KMONG_MAIN_CSS)
        for name, doc in kmong:
            render(pg, doc, out / f"{name}.png", W, H)
        b.close()
    for f in fdir.glob("_*.png"):
        f.unlink()
    print("blog", len(blog), "kmong", len(kmong) + 1, "->", root)


if __name__ == "__main__":
    main()
