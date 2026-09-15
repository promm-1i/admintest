"""홍보 이미지 — 크몽 상위 판매자 방식 그대로: 대표 1:1 은 첫 화면 사진, 상세는 페이지 전체 캡처. 설명 문구 · 목업 없음.

  python tools/promo-cards/make_page_shots.py corporate-g            # PROMO_SERVER (기본 http://localhost:5173)

출력: <홍보카드>/<코드>_<브랜드>/{크몽,블로그,당근_카페,당근_비즈니스소식}/
- 크몽: 01-대표.jpg(1080×1080) + 상세 ≤10장 (가로 800 · 세로 ≤3000, 긴 페이지는 나눔)
- 블로그 · 당근: 페이지 캡처를 1080×1350(4:5) 조각으로 — 세로가 길면 휴대폰에서 확대해 봐야 해서 불편하다는 피드백. 문구 · 가격 장 없음
템플릿 푸터에는 실제 연락처가 있어 푸터 위에서 자른다.
"""
import os
import sys
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).parent))
from make_cards import OUT_ROOT  # noqa: E402

SERVER = os.environ.get("PROMO_SERVER", "http://localhost:5173") + "/templates/"
OUT_W = 800          # 크몽 가로 600 이상 — 휴대폰에서도 또렷하게 800
MAX_H = 3000         # 크몽 세로 상한
SPECS: dict[str, dict] = {
    "corporate-h": {
        "code": "CORP-1003", "brand": "하이온셀", "slug": "corporate-h-template", "accent": (0, 80, 180),
        "pages": ["index", "about", "vision", "history", "ci", "network", "solution", "cylindrical", "material",
                  "newsroom", "download", "faq", "inquiry", "recruit", "talent"],
        "kmong": ["index", "about", "solution", "cylindrical", "material", "network", "newsroom", "recruit"],
        "blog": ["index", "about", "solution", "cylindrical", "material", "network", "history", "newsroom", "recruit", "inquiry"],
        "hide": ".top-fab",
        "index_frames": ["pc-index-00", "pc-index-03", "pc-index-05", "pc-index-10", "pc-index-14", "pc-index-19", "pc-index-23", "pc-index-26"],
    },
    "corporate-g": {
        "code": "CORP-1002", "brand": "한벡스금속", "slug": "corporate-g-template", "accent": (168, 58, 30),
        "pages": ["index", "history", "ci", "partner", "location", "news", "process", "equipment", "technology",
                  "certificate", "product-pump", "product-hp", "product-valve", "product-machine", "inquiry", "contact"],
        "kmong": ["index", "history", "technology", "process", "certificate", "product-pump", "news", "inquiry"],
        "hide": ".top", "per_page": 4,
        # 메인은 스크롤 고정 장면이라 통짜 캡처에 빈 공간이 생긴다 → make_shot_cards --capture 로 찍은 휠 프레임을 이어 붙인다
        "index_frames": ["pc-index-00", "pc-index-09", "pc-index-12", "pc-index-16", "pc-index-20", "pc-index-24", "pc-index-30",
                         "pc-index-37", "pc-index-42", "pc-index-50", "pc-index-56", "pc-index-60"],
        "blog": ["index", "history", "technology", "process", "certificate", "product-pump", "news", "inquiry"],
    },
}


def capture(key: str, sp: dict, fdir: Path) -> None:
    fdir.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
        pg = ctx.new_page()
        for name in sp["pages"]:
            pg.goto(f"{SERVER}{key}/{name}.html", wait_until="networkidle")
            pg.add_style_tag(content="html{scroll-behavior:auto!important}")
            pg.wait_for_timeout(1000)
            if name == "index":
                pg.screenshot(path=str(fdir / "hero.png"))  # 대표 이미지용 첫 화면
            h = pg.evaluate("document.documentElement.scrollHeight")
            for y in range(0, h, 600):  # 늦게 오는 사진 · 등장 효과 전부 깨움
                pg.evaluate(f"scrollTo(0,{y})")
                pg.wait_for_timeout(120)
            pg.evaluate("scrollTo(0,0)")
            pg.add_style_tag(content="[data-aos],.rv,.ani,.fadeUp,.fadeLeft,.fadeRight{opacity:1!important;transform:none!important;transition:none!important}"
                             f"{sp.get('hide', '.x-none')}{{display:none!important}}")
            pg.wait_for_timeout(800)
            cut = pg.evaluate("(()=>{const f=document.querySelector('footer');return f?Math.round(f.getBoundingClientRect().top+scrollY):document.documentElement.scrollHeight})()")
            pg.screenshot(path=str(fdir / f"{name}.png"), full_page=True, clip={"x": 0, "y": 0, "width": 1440, "height": cut})
            print("captured", name, cut)
        ctx.close()
        b.close()


def split_rows(im: Image.Image, max_h: int) -> list[Image.Image]:
    """세로 상한을 넘으면 나눈다 — 경계 근처에서 가장 '조용한' 줄(색 변화가 적은 곳)을 골라 자른다."""
    if im.height <= max_h:
        return [im]
    g = im.convert("L")
    parts, y0 = [], 0
    while im.height - y0 > max_h:
        lo, hi = y0 + int(max_h * 0.7), y0 + max_h
        best, best_v = hi, None
        for y in range(hi, lo, -4):
            row = g.crop((0, y, im.width, y + 1)).getdata()
            v = max(row) - min(row)
            if best_v is None or v < best_v:
                best, best_v = y, v
                if v < 4:
                    break
        parts.append(im.crop((0, y0, im.width, best)))
        y0 = best
    parts.append(im.crop((0, y0, im.width, im.height)))
    return parts


def blank(im: Image.Image) -> bool:
    g = im.convert("L").resize((64, 64))
    return max(g.getdata()) - min(g.getdata()) < 12


def page_images(fdir: Path, name: str, w: int = OUT_W, max_h: int = MAX_H, pad_to: int = 0) -> list[Image.Image]:
    if name == "index" and (fdir / "index-stack.png").exists():
        im = Image.open(fdir / "index-stack.png").convert("RGB")
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        fh = round(w * 900 / 1440)  # 이어 붙인 프레임 한 장 높이 — 프레임 경계에서만 자른다
        per = max(1, max_h // fh)
        parts = [im.crop((0, y, w, min(y + per * fh, im.height))) for y in range(0, im.height, per * fh)]
    else:
        im = Image.open(fdir / f"{name}.png").convert("RGB")
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        parts = [pt for pt in split_rows(im, max_h) if not blank(pt)]
    if pad_to:  # 4:5 조각 — 마지막 짧은 조각은 아래 줄 색으로 채워 같은 비율로
        out = []
        for pt in parts:
            if pt.height < pad_to:
                bg = pt.crop((0, pt.height - 1, pt.width, pt.height)).resize((1, 1)).getpixel((0, 0))
                c = Image.new("RGB", (w, pad_to), bg)
                c.paste(pt, (0, 0))
                pt = c
            out.append(pt)
        parts = out
    return parts


def cover(fdir: Path) -> Image.Image:
    im = Image.open(fdir / "hero.png").convert("RGB")
    s = im.height
    x0 = (im.width - s) // 2
    return im.crop((x0, 0, x0 + s, s)).resize((1080, 1080), Image.LANCZOS)


def main() -> None:
    key = sys.argv[1]
    sp = SPECS[key]
    root = OUT_ROOT / f"{sp['code']}_{sp['brand']}"
    fdir = root / "_pages"
    if "--capture" in sys.argv or not (fdir / "hero.png").exists():
        capture(key, sp, fdir)
    if sp.get("index_frames"):
        fr = [Image.open(root / "_frames" / f"{n}.png").convert("RGB") for n in sp["index_frames"]]
        st = Image.new("RGB", (fr[0].width, sum(f.height for f in fr)))
        y = 0
        for f in fr:
            st.paste(f, (0, y))
            y += f.height
        st.save(fdir / "index-stack.png")

    def save(folder: str, items: list[tuple[str, Image.Image]]) -> None:
        out = root / folder
        out.mkdir(parents=True, exist_ok=True)
        for old in out.glob("*.*"):
            old.unlink()
        for n, (label, im) in enumerate(items, 1):
            im.save(out / f"{n:02d}-{label}.jpg", quality=90)
        print(folder, len(items))

    kmong = [("대표", cover(fdir))]
    for name in sp["kmong"]:
        for k, im in enumerate(page_images(fdir, name)):
            kmong.append((f"{name}{'-' + str(k + 1) if k else ''}", im))
    save("크몽", kmong[:11])  # 대표 1 + 상세 10

    full = []
    for name in sp.get("blog", sp["pages"]):
        for k, im in enumerate(page_images(fdir, name, 1080, 1350, 1350)[:sp.get("per_page", 3)]):  # 한 페이지가 너무 많이 차지하지 않게
            full.append((f"{name}{'-' + str(k + 1) if k else ''}", im))
    # 안내(가격) 장은 빼기로 함 — 대표 + 조각 19 = 20 (2026-09-15)
    save("블로그", [("대표", cover(fdir))] + full[:19])
    save("당근_카페", [("대표", cover(fdir))] + full[:19])
    save("당근_비즈니스소식", [("대표", cover(fdir))] + full[:9])


if __name__ == "__main__":
    main()
