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

Image.MAX_IMAGE_PIXELS = None  # 아주 긴 페이지 캡처 (기본 상한에 걸려 터졌다)
from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).parent))
from make_cards import OUT_ROOT  # noqa: E402

SERVER = os.environ.get("PROMO_SERVER", "http://localhost:5173") + "/templates/"
OUT_W = 800          # 크몽 가로 600 이상 — 휴대폰에서도 또렷하게 800
MAX_H = 3000         # 크몽 세로 상한
SPECS: dict[str, dict] = {
    "corporate-l": {
        "code": "CORP-1007", "brand": "한결그룹", "slug": "corporate-l-template", "accent": (0, 70, 140),
        "pages": ["index", "about", "business", "history", "network", "esg", "ethics", "ir", "finance", "hr", "recruit", "jobs", "news", "notices", "contact"],
        "shots": [{"name": "s-news-search", "page": "news", "fill": [(".search-bar__input", "ESG")]}],
        "kmong": ["index", "about", "business", "esg", "ir", "network", "hr", "recruit", "s-news-search", "contact"],
        "blog": ["index", "about", "business", "esg", "ir", "finance", "network", "history", "hr", "recruit", "s-news-search", "contact"],
        "hide": ".x-none",
    },
    "corporate-m": {
        "code": "CORP-1008", "brand": "FLOVEX", "slug": "corporate-m-template", "accent": (0, 90, 160),
        "pages": ["index", "ceo", "vision", "history", "organization", "business-semiconductor", "business-battery", "business-datacenter",
                  "business-dryroom", "business-cryogenic", "business-fluoropolymer", "qualification", "catalog", "media", "news",
                  "people", "people-stories", "jobs", "benefits", "support", "inquiry", "location"],
        "shots": [{"name": "s-media-more", "page": "media", "clicks": [".load-more"]}],
        "kmong": ["index", "business-semiconductor", "business-battery", "business-datacenter", "business-dryroom", "qualification", "catalog", "s-media-more", "people", "jobs"],
        "blog": ["index", "vision", "business-semiconductor", "business-battery", "business-datacenter", "business-dryroom", "business-cryogenic",
                 "qualification", "catalog", "s-media-more", "people-stories", "jobs", "support", "inquiry"],
        "hide": ".x-none",
    },
    "corporate-n": {
        "code": "CORP-1009", "brand": "NEXORA GROUP", "slug": "corporate-n-template", "accent": (20, 60, 120),
        "pages": ["index", "about", "business", "industry", "materials", "textile", "brand", "esg", "environment", "ethics",
                  "ir", "finance", "disclosures", "history", "milestones", "network", "news", "ci", "digital"],
        "kmong": ["index", "about", "business", "materials", "textile", "esg", "ir", "network", "history", "news"],
        "blog": ["index", "about", "business", "industry", "materials", "textile", "brand", "esg", "environment", "ir", "finance", "network", "milestones", "news"],
        "hide": ".x-none",
    },
    "corporate-o": {
        "code": "CORP-1010", "brand": "NATURIVE LAB", "slug": "corporate-o-template", "accent": (40, 110, 70),
        "pages": ["index", "company", "ceo", "technology", "efficacy", "products", "product-detail", "patents", "certifications",
                  "global", "beauty", "insight", "news", "exhibitions", "people", "jobs", "esg", "inquiry", "signup"],
        "shots": [{"name": "s-product-search", "page": "products", "fill": [("input[placeholder='검색어를 입력하세요']", "Morus")]}],
        "kmong": ["index", "company", "technology", "efficacy", "products", "product-detail", "patents", "global", "s-product-search", "inquiry"],
        "blog": ["index", "company", "technology", "efficacy", "products", "s-product-search", "product-detail", "patents", "certifications",
                 "global", "beauty", "insight", "people", "inquiry"],
        "hide": ".x-none",
    },
    "corporate-q": {
        "code": "CORP-1012", "brand": "국가에너지혁신원", "slug": "corporate-q-template", "accent": (0, 80, 150),
        "pages": ["index", "greeting", "vision", "history", "organization", "business-overview", "business-guide", "notice", "press",
                  "open-data", "information-system", "esg-report", "esg-strategy", "human-rights", "ethics-code", "recruit", "talent",
                  "employee-story", "work-life", "location", "search", "sitemap"],
        "shots": [{"name": "s-notice-search", "page": "notice", "fill": [("main input[placeholder='검색어를 입력하세요'], input[placeholder='검색어를 입력하세요']", "계약")]},
                  {"name": "s-search", "page": "search", "fill": [("input[placeholder='검색어를 입력하세요']", "에너지")]}],
        "kmong": ["index", "business-overview", "notice", "open-data", "information-system", "esg-report", "recruit", "s-search", "employee-story", "sitemap"],
        "blog": ["index", "greeting", "business-overview", "business-guide", "s-notice-search", "open-data", "information-system",
                 "esg-report", "esg-strategy", "human-rights", "recruit", "employee-story", "work-life", "s-search"],
        "hide": ".ref-quick",
    },
    "corporate-r": {
        "code": "CORP-1013", "brand": "넥스하버", "slug": "corporate-r-template", "accent": (0, 60, 110),
        "pages": ["index", "company", "ceo", "philosophy", "history", "group-terminal", "group-logistics", "business-container",
                  "business-logistics", "business-3pl", "business-grain", "business-sorting", "safety", "governance", "gallery",
                  "news", "museum", "careers", "talent", "location"],
        "shots": [{"name": "s-gallery-search", "page": "gallery", "clicks": []}],
        "kmong": ["index", "company", "business-container", "business-logistics", "business-grain", "business-sorting", "safety", "gallery", "history", "careers"],
        "blog": ["index", "company", "philosophy", "group-terminal", "business-container", "business-logistics", "business-3pl",
                 "business-grain", "business-sorting", "safety", "s-gallery-search", "museum", "careers", "location"],
        "hide": ".x-none", "per_page": 3, "stitch": True,  # ScrollSmoother 라 통짜 캡처가 빈 화면으로 나온다
    },
    "corporate-s": {
        "code": "CORP-1014", "brand": "온결산업기록관", "slug": "corporate-s-template", "accent": (120, 80, 40),
        "pages": ["index", "background", "story-origin", "story-future", "exhibitions", "facility", "visit", "news", "faq"],
        "shots": [{"name": "s-faq-open", "page": "faq", "clicks": [".faq-item:nth-child(1) button", ".faq-item:nth-child(2) button", ".faq-item:nth-child(3) button"]}],
        "kmong": ["index", "background", "story-origin", "story-future", "exhibitions", "facility", "visit", "news", "s-faq-open"],
        "blog": ["index", "background", "story-origin", "story-future", "exhibitions", "facility", "visit", "news", "s-faq-open"],
        "hide": ".quick-actions",
    },
    "corporate-i": {
        "code": "CORP-1004", "brand": "누빛광학", "slug": "corporate-i-template", "accent": (106, 76, 240),
        "pages": ["index", "about", "ceo", "history", "vision", "space", "defense-air", "industrial-laser", "scientific", "product",
                  "products", "lab", "esg", "press", "talent", "recruit", "inquiry"],
        "kmong": ["index", "about", "space", "defense-air", "industrial-laser", "product", "products", "lab", "esg", "recruit"],
        "blog": ["index", "about", "history", "space", "defense-air", "industrial-laser", "scientific", "product", "products", "lab", "esg", "press", "recruit"],
        "hide": ".x-none", "index_frames": ["pc-index-00", "pc-index-02", "pc-index-05", "pc-index-09", "pc-index-12", "pc-index-15", "pc-index-17", "pc-index-20", "pc-index-22"],
    },
    "corporate-j": {
        "code": "CORP-1005", "brand": "세온기계", "slug": "corporate-j-template", "accent": (0, 60, 120),
        "pages": ["index", "overview", "history", "business", "lineup", "list", "detail", "software", "automation", "as", "training",
                  "network", "news", "recruit", "estimate", "contact"],
        "kmong": ["index", "overview", "lineup", "list", "detail", "software", "automation", "network", "recruit"],
        "blog": ["index", "overview", "history", "business", "lineup", "list", "detail", "software", "automation", "as", "network", "news", "recruit"],
        "hide": ".quick", "index_frames": ["pc-index-00", "pc-index-04", "pc-index-09", "pc-index-26", "pc-index-33", "pc-index-38", "pc-index-46", "pc-index-48"],
    },
    "corporate-k": {
        "code": "CORP-1006", "brand": "누리웰", "slug": "corporate-k-template", "accent": (0, 120, 80),
        "pages": ["index", "overview", "values", "history", "brand", "brand-protein", "brand-balance", "solution", "supplement",
                  "rnd-center", "rnd-result", "csr", "news", "faq", "location"],
        # 브랜드 쪽은 스크롤 페이드 장면이라 캡처에 검은 조각이 섞여 뺀다
        "kmong": ["index", "overview", "values", "solution", "supplement", "rnd-center", "rnd-result", "csr", "news", "history"],
        "blog": ["index", "overview", "values", "history", "solution", "supplement", "rnd-center", "rnd-result", "csr", "news", "faq", "location"],
        "hide": ".quick_menu", "scene_pages": ["brand", "brand-protein", "brand-balance", "brand-glucose", "brand-kids"],
        # 브랜드 쪽 sticky 장면은 원본의 ≤1024 규칙을 PC 에도 적용해 보통 흐름으로 편다
        "css": ".sec_visual{height:auto}.sec_visual .sticky{height:auto;padding-top:calc(130*var(--u));position:relative;overflow:visible}.sec_visual .title_wrap{position:absolute;top:calc(130*var(--u));width:100%}.sec_visual .bg_wrap{margin-top:calc(90.5*var(--u));padding-top:calc(30*var(--u));position:relative;inset:auto;transform:none;height:calc(440*var(--u));--clip:0 20px 0 20px}.sec_visual .bg_wrap .bg{transform:translateY(0);padding-top:calc(130*var(--u));height:100%}",
        "index_frames": ["pc-index-00", "pc-index-09", "pc-index-24", "pc-index-28", "pc-index-32", "pc-index-37"],
    },
    "wedding-a": {
        "code": "WEDP-1001", "brand": "서울바우", "slug": "wedding-a-template", "accent": (120, 90, 60),
        "pages": ["index", "about", "offer", "offer-view", "blog", "blog-view", "login", "sign-up"],
        "kmong": ["index", "about", "offer", "offer-view", "blog", "blog-view", "login"],
        "blog": ["index", "about", "offer", "offer-view", "blog", "blog-view", "login", "sign-up"],
        "hide": ".x-none", "per_page": 5, "index_frames": ["pc-index-00", "pc-index-01", "pc-index-03", "pc-index-06", "pc-index-10", "pc-index-17", "pc-index-20", "pc-index-22"],
    },
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


FOOT_JS = "(()=>{const f=document.querySelector('footer,#footer,.footer,#ft,.ft');return f?Math.round(f.getBoundingClientRect().top+scrollY):document.documentElement.scrollHeight})()"
REVEAL_JS = """()=>{for(const e of document.querySelectorAll('main *, #contents *, .page *, section *')){
 if(e.closest('header,nav,.modal,[class*=menu],[class*=mega],[class*=allm],[class*=dim],[class*=popup],[class*=layer]'))continue;
 const c=getComputedStyle(e);if((c.opacity==='0'||c.visibility==='hidden')&&e.getBoundingClientRect().height>10){e.style.setProperty('opacity','1','important');e.style.setProperty('visibility','visible','important');e.style.setProperty('transform','none','important')}}}"""


MAX_CUT = 24000      # 너무 긴 페이지는 여기까지만 (60000px 짜리 문서함 페이지가 있었다)
SMOOTH_CSS = ("html,body{overflow:visible!important;height:auto!important}"
              "#smoother-wrapper,#smooth-wrapper{position:static!important;transform:none!important;height:auto!important;overflow:visible!important;will-change:auto!important}"
              "#smoother-content,#smooth-content{transform:none!important;will-change:auto!important}")


def stitch_page(pg, cut: int, vh: int = 900) -> Image.Image:
    """사람이 내려 보듯 한 화면씩 찍어 이어 붙인다 — ScrollSmoother·스크롤 고정 장면이 비어 찍히는 걸 막는다."""
    pg.evaluate("""()=>{for(const e of document.querySelectorAll('header,#header,.header,footer,#footer,.footer,#ft,.ft,[class*=quick],[class*=fab],[class*=top_btn],[class*=top-btn]')){e.style.setProperty('display','none','important')}}""")
    pg.wait_for_timeout(400)
    parts, y, tmp = {}, 0, pg.context  # noqa: F841
    import tempfile
    shot = Path(tempfile.gettempdir()) / "_promo_stitch.png"
    while y < cut:
        pg.evaluate("(y)=>{ if(window.ScrollSmoother&&ScrollSmoother.get()){ScrollSmoother.get().scrollTo(y,false)} else {window.scrollTo({top:y,behavior:'instant'})} }", y)
        pg.wait_for_timeout(650)
        real = pg.evaluate("Math.round(window.ScrollSmoother&&ScrollSmoother.get()?ScrollSmoother.get().scrollTop():scrollY)")
        pg.screenshot(path=str(shot))
        parts[real] = Image.open(str(shot)).convert("RGB")
        if real < y - 20:
            break
        y = real + vh
    k = 2  # device_scale_factor
    top = max(parts) + vh
    out = Image.new("RGB", (1440 * k, int(min(top, cut + vh) * k)), "#ffffff")
    for real, im in sorted(parts.items()):
        out.paste(im, (0, int(real * k)))
    return out


def reveal(pg) -> None:
    pg.add_style_tag(content="[data-aos],.rv,.ani,.fadeUp,.fadeLeft,.fadeRight{opacity:1!important;transform:none!important;transition:none!important}")
    pg.evaluate(REVEAL_JS)


def capture(key: str, sp: dict, fdir: Path, only_shots: bool = False) -> None:
    fdir.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
        pg = ctx.new_page()
        for name in ([] if only_shots else sp.get("scene_pages", [])):  # sticky 스크롤 장면 페이지 — 화면 높이만큼 넘기며 찍어 이어 붙인다
            pg.goto(f"{SERVER}{key}/{name}.html", wait_until="networkidle")
            pg.wait_for_timeout(1200)
            pg.add_style_tag(content=f"{sp.get('hide', '.x-none')}{{display:none!important}}")
            pg.mouse.move(720, 450)
            kept, last = [], -1
            for i in range(60):
                pg.screenshot(path=str(fdir / "_scene.png"))
                im = Image.open(fdir / "_scene.png").convert("RGB")
                if not kept or diff(kept[-1], im) >= 3:
                    kept.append(im)
                pg.mouse.wheel(0, 900)
                pg.wait_for_timeout(1000)
                y = pg.evaluate("Math.round(scrollY)")
                if y == last:
                    break
                last = y
            ft = pg.evaluate("(()=>{const f=document.querySelector('footer,#footer,.footer,#ft,.ft');return f?Math.round(f.getBoundingClientRect().top):9999})()")
            if ft < 450 and len(kept) > 1:  # 마지막 프레임이 푸터 위주면 버린다
                kept.pop()
            stack(kept).save(fdir / f"{name}-stack.png")
            print("scene", name, len(kept))
        for sh in sp.get("shots", []):  # 기능이 도는 상태 — 탭 전환 · 검색 결과 · 팝업 · 아코디언 펼침
            pg.goto(f"{SERVER}{key}/{sh['page']}.html", wait_until="networkidle")
            pg.add_style_tag(content="html{scroll-behavior:auto!important}")
            pg.wait_for_timeout(1000)
            h = pg.evaluate("document.documentElement.scrollHeight")
            for y in range(0, h, 600):
                pg.evaluate(f"scrollTo(0,{y})")
                pg.wait_for_timeout(100)
            pg.evaluate("scrollTo(0,0)")
            pg.evaluate("window.ScrollTrigger && ScrollTrigger.getAll().forEach(t=>t.kill(true))")
            pg.add_style_tag(content=f"{sp.get('hide', '.x-none')}{{display:none!important}}")
            reveal(pg)
            for sel in sh.get("clicks", []):
                try:
                    pg.locator(sel).first.click(timeout=5000)
                    pg.wait_for_timeout(600)
                except Exception as e:
                    print("  click skip", sel, str(e)[:40])
            for sel, val in sh.get("fill", []):
                try:
                    box = pg.locator(sel).first  # 같은 칸이 머리글에도 있을 수 있어 첫 번째만
                    box.fill(val, timeout=5000)
                    box.press("Enter")
                    pg.wait_for_timeout(900)
                except Exception as e:
                    print("  fill skip", sel, str(e)[:40])
            if sh.get("js"):
                pg.evaluate(sh["js"])
            pg.wait_for_timeout(sh.get("wait", 900))
            if sh.get("clip"):  # 화면 한 칸만 (팝업 등)
                x, y, w, hh = sh["clip"]
                pg.evaluate(f"scrollTo(0,{y})")
                pg.wait_for_timeout(400)
                pg.screenshot(path=str(fdir / f"{sh['name']}.png"), clip={"x": x, "y": 0, "width": w, "height": hh})
            else:
                cut = pg.evaluate(FOOT_JS)
                top = sh.get("top", 0)
                pg.evaluate("scrollTo(0,0)")
                pg.screenshot(path=str(fdir / f"{sh['name']}.png"), full_page=True,
                              clip={"x": 0, "y": top, "width": 1440, "height": max(600, cut - top)})
            print("shot", sh["name"])
        for name in ([] if only_shots else sp["pages"]):
            if name in sp.get("scene_pages", []):
                continue
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
            # 스크롤 고정 장면(GSAP pin)은 통짜 캡처에 빈 자리를 남긴다 → 트리거를 되돌려 보통 흐름으로
            pg.evaluate("window.ScrollTrigger && ScrollTrigger.getAll().forEach(t=>t.kill(true))")
            if sp.get("css"):
                pg.add_style_tag(content=sp["css"])
            pg.wait_for_timeout(300)
            pg.add_style_tag(content="[data-aos],.rv,.ani,.fadeUp,.fadeLeft,.fadeRight{opacity:1!important;transform:none!important;transition:none!important}"
                             f"{sp.get('hide', '.x-none')}{{display:none!important}}")
            # 등장 효과 클래스가 템플릿마다 달라서, 여전히 안 보이는 본문 요소는 직접 켠다 (머리글·메뉴·모달은 그대로)
            pg.evaluate("""()=>{for(const e of document.querySelectorAll('main *, #contents *, .page *, section *')){
              if(e.closest('header,nav,.modal,[class*=menu],[class*=mega],[class*=allm],[class*=dim],[class*=popup],[class*=layer]'))continue;
              const c=getComputedStyle(e);if((c.opacity==='0'||c.visibility==='hidden')&&e.getBoundingClientRect().height>10){e.style.setProperty('opacity','1','important');e.style.setProperty('visibility','visible','important');e.style.setProperty('transform','none','important')}}}""")
            pg.wait_for_timeout(800)
            cut = min(pg.evaluate(FOOT_JS), sp.get("max_cut", MAX_CUT))
            if sp.get("stitch"):
                pg.add_style_tag(content=SMOOTH_CSS)
                stitch_page(pg, cut).save(fdir / f"{name}.png")
            else:
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


def content_ratio(im: Image.Image) -> float:
    """바탕색과 다른 점의 비율 — 등장 효과가 안 돌아 비어 버린 장면을 걸러낸다."""
    g = im.convert("L").resize((120, max(40, min(400, im.height // 10))))
    px = list(g.getdata())
    bg = max(set(px), key=px.count)
    return sum(1 for v in px if abs(v - bg) > 12) / len(px)


def usable(im: Image.Image, min_ratio: float = 0.045) -> bool:  # 목록 몇 줄만 있는 허전한 장도 뺀다
    return content_ratio(im) >= min_ratio


def trim_tail(im: Image.Image) -> Image.Image:
    """페이지 끝의 빈 여백을 잘라낸다 — 마지막 조각이 흰 화면으로 나오는 걸 막는다."""
    g = im.convert("L").resize((120, max(40, im.height // 16)))
    px = g.load()
    w, h = g.size
    last = 0
    for y in range(h):
        row = [px[x, y] for x in range(w)]
        if max(row) - min(row) >= 10:
            last = y
    keep = min(im.height, int((last + 2) * im.height / h))
    return im.crop((0, 0, im.width, keep)) if keep > im.height * 0.3 else im


def page_images(fdir: Path, name: str, w: int = OUT_W, max_h: int = MAX_H, pad_to: int = 0) -> list[Image.Image]:
    if (fdir / f"{name}-stack.png").exists():
        im = Image.open(fdir / f"{name}-stack.png").convert("RGB")
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        fh = round(w * 900 / 1440)  # 이어 붙인 프레임 한 장 높이 — 프레임 경계에서만 자른다
        per = max(1, max_h // fh)
        parts = [im.crop((0, y, w, min(y + per * fh, im.height))) for y in range(0, im.height, per * fh)]
    else:
        im = trim_tail(Image.open(fdir / f"{name}.png").convert("RGB"))
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        parts = [pt for pt in split_rows(im, max_h) if not blank(pt)]
    if pad_to:  # 4:5 조각 — 여백으로 채우면 흰 장이 생기므로, 짧은 꼬리는 바로 위와 겹쳐 잘라 채운다
        out = []
        for pt in parts:
            if pt.height < pad_to:
                if im.height >= pad_to:
                    pt = im.crop((0, im.height - pad_to, w, im.height))  # 페이지 맨 아래 한 장
                else:
                    bg = pt.crop((0, pt.height - 1, w, pt.height)).resize((1, 1)).getpixel((0, 0))
                    c = Image.new("RGB", (w, pad_to), bg)
                    c.paste(pt, (0, 0))
                    pt = c
            out.append(pt)
        # 같은 그림이 두 번 들어가지 않게, 겹쳐 자른 꼬리가 앞 장과 거의 같으면 버린다
        if len(out) > 1 and diff(out[-1], out[-2]) < 3:
            out.pop()
        parts = out
    return [pt for pt in parts if usable(pt)]


def stack(fr: list[Image.Image]) -> Image.Image:
    st = Image.new("RGB", (fr[0].width, sum(f.height for f in fr)))
    y = 0
    for f in fr:
        st.paste(f, (0, y))
        y += f.height
    return st


def diff(a: Image.Image, b: Image.Image) -> float:
    from PIL import ImageChops, ImageStat
    x, y = a.convert("L").resize((96, 60)), b.convert("L").resize((96, 60))
    return ImageStat.Stat(ImageChops.difference(x, y)).mean[0]


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
    if "--shots" in sys.argv:
        capture(key, sp, fdir, only_shots=True)
    elif "--capture" in sys.argv or not (fdir / "hero.png").exists():
        capture(key, sp, fdir)
    if sp.get("index_frames"):
        stack([Image.open(root / "_frames" / f"{n}.png").convert("RGB") for n in sp["index_frames"]]).save(fdir / "index-stack.png")
    for name in sp.get("frames_pages", []):  # 고정 장면이 있는 서브 페이지 — 휠 프레임 중 앞 프레임과 다른 것만 이어 붙인다
        kept = []
        for f in sorted((root / "_frames").glob(f"pc-{name}-*.png")):
            im = Image.open(f).convert("RGB")
            if kept and diff(kept[-1], im) < 4:
                continue
            kept.append(im)
        stack(kept).save(fdir / f"{name}-stack.png")
        print("stacked", name, len(kept))

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
