"""프리미엄 디자인 홍보 카드 생성기 (블로그 · 당근 · 인스타 공용 1080x1350).

사례 페이지 데이터(src/lib/caseStudies/data/<slug>.ts)와 이미 찍어 둔 캡처(public/cases/)를
카드 틀에 끼워 디자인 1종당 7장을 뽑는다. 새로 캡처하지 않는다.

  python tools/promo-cards/make_cards.py estate-f-template [rentcar-f-template ...]
  python tools/promo-cards/make_cards.py --all
"""
import html
import json
import re
import subprocess
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / "src/lib/caseStudies/data"
PUBLIC = ROOT / "public"
OUT_ROOT = Path.home() / "Desktop" / "개발" / "홍보카드"

# 포인트 3장으로 뭘 보여줄지 — 기본은 앞에서 3개, 더 눈에 띄는 게 뒤에 있으면 여기서 고른다
POINT_PICK: dict[str, list[int]] = {
    "estate-f-template": [0, 2, 3],
}

W, H = 1080, 1350


def load_study(slug: str) -> dict:
    url = (DATA / f"{slug}.ts").as_uri()
    js = f"import('{url}').then(m=>process.stdout.write(JSON.stringify(m.default)))"
    out = subprocess.run(["node", "--no-warnings", "-e", js], capture_output=True, check=True)
    return json.loads(out.stdout.decode("utf-8"))


def design_code(slug: str) -> str:
    src = (ROOT / "src/lib/samples.ts").read_text(encoding="utf-8")
    block = src[src.index(f'slug: "{slug}"') :]
    return re.search(r'designCode: "([^"]+)"', block[:4000]).group(1)


def img(path: str) -> str:
    return (PUBLIC / path.lstrip("/")).as_uri()


def lines(text: str) -> str:
    return "<br>".join(html.escape(t) for t in text.split("\n"))


def esc(text: str) -> str:
    return html.escape(text)


LOGO_T = """<svg viewBox="0 0 100 100" width="34" height="34" aria-hidden="true">
<path d="M15 85 L15 15 L85 85 L85 45" fill="none" stroke="currentColor" stroke-width="13"/>
<path d="M85 45 L85 15" fill="none" stroke="{accent}" stroke-width="13"/></svg>"""

BASE_CSS = """
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css');
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:wght@600&family=JetBrains+Mono:wght@600&display=block');
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1080px;height:1350px;overflow:hidden}
body{font-family:'Pretendard Variable',Pretendard,sans-serif;word-break:keep-all;-webkit-font-smoothing:antialiased}
.card{position:relative;width:1080px;height:1350px;padding:80px 80px 0;display:flex;flex-direction:column}
.mono{font-family:'JetBrains Mono',monospace;letter-spacing:.14em;font-size:22px;font-weight:600}
.foot{position:absolute;left:80px;right:80px;bottom:52px;display:flex;align-items:center;justify-content:space-between;font-size:22px}
.brandmark{display:flex;align-items:center;gap:12px;font-family:'Bodoni Moda',serif;font-size:30px;letter-spacing:.06em}
.brandmark b{font-weight:600}
.browser{border-radius:16px;overflow:hidden;background:#fff;box-shadow:0 40px 80px -30px rgba(0,0,0,.45)}
.browser .bar{height:40px;display:flex;align-items:center;gap:8px;padding:0 18px;background:#f2f2f0;border-bottom:1px solid #e2e2de}
.browser .bar i{width:11px;height:11px;border-radius:50%;background:#cfcfca}
.browser .bar span{margin-left:12px;flex:1;height:24px;border-radius:6px;background:#fff;font-size:13px;color:#888;line-height:24px;padding:0 12px}
.browser img{display:block;width:100%}
.phone{border:10px solid #111;border-radius:44px;background:#111;overflow:hidden;box-shadow:0 36px 70px -28px rgba(0,0,0,.55)}
.phone img{display:block;width:100%;aspect-ratio:390/844;object-fit:cover;object-position:top;border-radius:34px}
"""


def page(body: str, extra_css: str = "") -> str:
    return f"<!doctype html><html lang='ko'><head><meta charset='utf-8'><style>{BASE_CSS}{extra_css}</style></head><body>{body}</body></html>"


def foot(code: str, n: int, total: int, color: str, accent: str = "#b3261e") -> str:
    # 브랜드 색 바탕에서는 CI 빨강이 묻히므로 accent 를 바꿔 준다
    logo = LOGO_T.replace("{accent}", accent)
    return f"""<div class="foot" style="color:{color}">
  <span class="brandmark">{logo}NOVERI<b style="color:{accent}">Q</b></span>
  <span class="mono" style="font-size:19px;opacity:.75">{code} · {n:02d}/{total:02d}</span></div>"""


def browser(src: str, url: str, height: int) -> str:
    return f"""<div class="browser"><div class="bar"><i></i><i></i><i></i><span>{esc(url)}</span></div>
<div style="height:{height}px;overflow:hidden"><img src="{img(src)}"></div></div>"""


def build_cards(slug: str, s: dict) -> list[tuple[str, str]]:
    code = design_code(slug)
    brand_c, tint = s["brandColor"], s["tintColor"]
    industry = s["meta"][0]["value"]
    url = f"noveriq.co.kr/templates/{slug.removesuffix('-template')}/"
    total = 7
    cards: list[tuple[str, str]] = []

    # 01 표지 — 브랜드 색 바탕, PC 화면 위에 휴대폰을 겹친다
    cover_phone = s["mobile"]["shots"][0]["img"]
    cards.append(("01-표지", page(f"""
<div class="card" style="background:{brand_c};color:#fff">
  <p class="mono" style="opacity:.8">PREMIUM DESIGN · {esc(code)}</p>
  <h1 style="margin-top:34px;font-size:128px;font-weight:800;letter-spacing:-.04em;line-height:1">{esc(s['brand'])}</h1>
  <p style="margin-top:26px;font-size:46px;font-weight:600;letter-spacing:-.02em;opacity:.92">{esc(s['headline'])}</p>
  <p style="margin-top:14px;font-size:26px;opacity:.72">{esc(industry)}</p>
  <div style="position:absolute;left:80px;top:560px;width:800px">{browser(s['mainShot'], url, 600)}</div>
  <div style="position:absolute;right:70px;top:700px;width:250px" class="phone"><img src="{img(cover_phone)}"></div>
  {foot(code, 1, total, '#fff', tint)}
</div>""")))

    # 02 구성 — 여러 쪽이면 페이지 썸네일 격자, 원페이지면 메인 화면과 섹션 흐름
    if s.get("pages"):
        pgs = s["pages"][:6]
        grid = "".join(
            f"""<figure><div style="aspect-ratio:4/5;border-radius:12px;overflow:hidden;background:#fff;box-shadow:0 18px 40px -22px rgba(0,0,0,.35)">
<img src="{img(p['img'])}" style="width:100%;height:100%;object-fit:cover;object-position:top"></div>
<figcaption style="margin-top:14px;font-size:24px;font-weight:700">{esc(p['name'])}</figcaption></figure>"""
            for p in pgs
        )
        cards.append(("02-구성", page(f"""
<div class="card" style="background:{tint};color:#1a1714">
  <p class="mono" style="color:{brand_c}">PAGES</p>
  <h2 style="margin-top:22px;font-size:66px;font-weight:800;letter-spacing:-.035em;line-height:1.2">{len(s['pages'])}쪽으로 짓는<br>{esc(s['headline'])}</h2>
  <div style="margin-top:56px;display:grid;grid-template-columns:repeat(3,1fr);gap:40px 28px">{grid}</div>
  {foot(code, 2, total, '#1a1714')}
</div>""")))
    else:
        steps = "".join(
            f"<li style='display:flex;gap:16px;font-size:26px;font-weight:600;padding:12px 0;border-top:1px solid rgba(0,0,0,.1)'><span class='mono' style='color:{brand_c};font-size:20px;padding-top:4px'>{i + 1:02d}</span>{esc(f['name'])}</li>"
            for i, f in enumerate(s["flow"][:8])
        )
        cards.append(("02-구성", page(f"""
<div class="card" style="background:{tint};color:#1a1714">
  <p class="mono" style="color:{brand_c}">FLOW</p>
  <h2 style="margin-top:22px;font-size:66px;font-weight:800;letter-spacing:-.035em;line-height:1.2">한 페이지에 담은<br>{len(s['flow'])}단계 흐름</h2>
  <div style="margin-top:56px;display:grid;grid-template-columns:520px 1fr;gap:40px;align-items:start">
    <div class="browser"><div class="bar"><i></i><i></i><i></i></div><div style="height:820px;overflow:hidden"><img src="{img(s['mainShot'])}"></div></div>
    <ol style="list-style:none">{steps}</ol>
  </div>
  {foot(code, 2, total, '#1a1714')}
</div>""")))

    # 03~05 포인트 — 제목 한 줄 + 캡처 한 장
    pick = POINT_PICK.get(slug, [0, 1, 2])
    for n, idx in enumerate(pick, start=3):
        pt = s["points"][idx]
        cards.append((f"{n:02d}-포인트{n - 2}", page(f"""
<div class="card" style="background:#f7f5f2;color:#1a1714">
  <p class="mono" style="color:{brand_c}">POINT {n - 2:02d}</p>
  <h2 style="margin-top:22px;font-size:68px;font-weight:800;letter-spacing:-.035em;line-height:1.22">{lines(pt['title'])}</h2>
  <figure style="margin:auto 0;padding:40px 0 130px">
    <div style="max-height:780px;overflow:hidden;border-radius:18px;background:#fff;box-shadow:0 30px 60px -30px rgba(0,0,0,.35);outline:1px solid rgba(0,0,0,.06)">
      <img src="{img(pt['img'])}" style="display:block;width:100%">
    </div>
    <figcaption style="margin-top:20px;font-size:24px;color:#6b645d">{esc(pt['caption'])}</figcaption>
  </figure>
  {foot(code, n, total, '#1a1714')}
</div>""")))

    # 06 모바일 — 휴대폰 3대, 가운데를 올린다
    shots = s["mobile"]["shots"][:3]
    phones = "".join(
        f"""<figure style="width:300px;{'transform:translateY(-60px)' if i == 1 else ''}">
<div class="phone"><img src="{img(sh['img'])}"></div>
<figcaption style="margin-top:22px;text-align:center;font-size:24px;font-weight:600;opacity:.8">{esc(sh['caption'])}</figcaption></figure>"""
        for i, sh in enumerate(shots)
    )
    cards.append(("06-모바일", page(f"""
<div class="card" style="background:#171513;color:#fff">
  <p class="mono" style="color:{tint}">MOBILE</p>
  <h2 style="margin-top:22px;font-size:68px;font-weight:800;letter-spacing:-.035em;line-height:1.22">{lines(s['mobile']['title'])}</h2>
  <div style="margin-top:170px;display:flex;justify-content:center;gap:36px;align-items:flex-end">{phones}</div>
  {foot(code, 6, total, '#fff')}
</div>""")))

    # 07 마무리 — 가격 · 포함 항목 · 보러 가는 길
    cards.append(("07-상담", page(f"""
<div class="card" style="background:{brand_c};color:#fff">
  <p class="mono" style="opacity:.8">{esc(code)} · {esc(s['brand'])}</p>
  <h2 style="margin-top:34px;font-size:72px;font-weight:800;letter-spacing:-.035em;line-height:1.2">이 디자인으로<br>우리 브랜드 홈페이지를</h2>
  <p style="margin-top:64px;font-size:30px;opacity:.85">프리미엄 제작</p>
  <p style="margin-top:6px;font-size:132px;font-weight:800;letter-spacing:-.04em;line-height:1">300<span style="font-size:64px;margin-left:8px">만 원부터</span></p>
  <ul style="margin-top:48px;list-style:none;font-size:30px;line-height:1.9;opacity:.95">
    <li>· 브랜드 색 · 메뉴 · 섹션 구성을 사업에 맞춰 다시</li>
    <li>· 사진 새로 제작 · 휴대폰 화면까지</li>
    <li>· 호스팅 1년 · 도메인 1개 포함 (부가세 별도)</li>
  </ul>
  <div style="margin-top:56px;padding:30px 36px;border-radius:20px;background:rgba(255,255,255,.14)">
    <p style="font-size:24px;opacity:.8">실제 화면 · 상세 설명 보기</p>
    <p style="margin-top:8px;font-size:32px;font-weight:700">noveriq.co.kr/samples/{esc(slug)}</p>
  </div>
  <p style="position:absolute;left:80px;bottom:118px;font-size:19px;opacity:.6">화면 속 브랜드명 · 사진 · 내용은 디자인 예시입니다.</p>
  {foot(code, 7, total, '#fff', tint)}
</div>""")))
    return cards


def main() -> None:
    args = sys.argv[1:]
    slugs = sorted(p.stem for p in DATA.glob("*.ts")) if args == ["--all"] else args
    with sync_playwright() as p:
        browser_ = p.chromium.launch()
        pg = browser_.new_page(viewport={"width": W, "height": H}, device_scale_factor=1)
        for slug in slugs:
            study = load_study(slug)
            out = OUT_ROOT / f"{design_code(slug)}_{study['brand']}"
            out.mkdir(parents=True, exist_ok=True)
            for name, doc in build_cards(slug, study):
                tmp = out / "_card.html"
                tmp.write_text(doc, encoding="utf-8")
                pg.goto(tmp.as_uri(), wait_until="networkidle")
                pg.evaluate("document.fonts.ready")
                pg.wait_for_timeout(150)
                pg.screenshot(path=str(out / f"{name}.png"))
                tmp.unlink()
            print("done", slug, "->", out)
        browser_.close()


if __name__ == "__main__":
    main()
