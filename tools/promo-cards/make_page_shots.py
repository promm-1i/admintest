"""홍보 이미지 — 크몽 상위 판매자 방식 그대로: 대표 1:1 은 첫 화면 사진, 상세는 페이지 전체 캡처. 설명 문구 · 목업 없음.

  python tools/promo-cards/make_page_shots.py corporate-g            # PROMO_SERVER (기본 http://localhost:5173)

출력: <홍보카드>/<코드>_<브랜드>/{크몽,블로그,당근_카페,당근_비즈니스소식}/
- 크몽: 01-대표.jpg(1080×1080) + 상세 ≤10장 (가로 800 · 세로 ≤3000, 긴 페이지는 나눔)
- 블로그 · 당근: 페이지 캡처를 1080×1350(4:5) 조각으로 — 세로가 길면 휴대폰에서 확대해 봐야 해서 불편하다는 피드백. 문구 · 가격 장 없음
템플릿 푸터에는 실제 연락처가 있어 푸터 위에서 자른다.
"""
import json
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
    "dental-f": {
        "code": "HOSP-1002", "brand": "365서울예담치과", "slug": "dental-f-template", "accent": (0, 100, 160),
        "pages": ["index", "introduction", "doctors", "doctor-view", "tour", "location", "implant-total",
                  "implant-prosthodontics", "implant-sleep", "laminate", "orthodontics", "prosthetics",
                  "non-covered", "case", "media", "notice", "qna", "inquiry"],
        "kmong": ["index", "implant-total", "case", "orthodontics", "laminate", "non-covered", "doctors", "tour", "introduction", "inquiry"],
        "blog": ["index", "introduction", "implant-total", "implant-prosthodontics", "implant-sleep", "case",
                 "orthodontics", "laminate", "non-covered", "doctors", "doctor-view", "tour", "qna", "inquiry"],
        "hide": ".x-none",
    },
    "hospital-a": {
        "code": "HOSP-1003", "brand": "한울혈액암병원", "slug": "hospital-a-template", "accent": (0, 80, 150),
        "pages": ["index", "intro", "director", "centers", "center-leukemia", "center-cart", "clinics",
                  "clinic-anemia", "doctors", "doctor", "schedule", "reserve", "guide", "procedure",
                  "admission", "notice", "news", "faq", "thanks", "tv", "directions"],
        "kmong": ["index", "centers", "center-leukemia", "doctors", "doctor", "schedule", "reserve", "procedure", "tv", "directions"],
        "blog": ["index", "intro", "centers", "center-leukemia", "center-cart", "clinics", "clinic-anemia",
                 "doctors", "doctor", "schedule", "reserve", "guide", "procedure", "tv", "thanks"],
        "css": "html{scroll-snap-type:none!important}section[class^=ms-]{height:auto!important;min-height:100vh}",
        "hide": ".x-none",
    },
    "brew-a": {
        "code": "BREP-1001", "brand": "해담양조", "slug": "brew-a-template", "accent": (201, 154, 59),
        "pages": ["index", "brand", "taste", "history", "discover", "master", "brewery",
                  "campaign", "campaign-first", "campaign-pouring", "campaign-pairing", "campaign-premium", "campaign-done"],
        "kmong": ["index", "brand", "taste", "history", "discover", "brewery", "master", "campaign", "campaign-first", "campaign-pairing"],
        "blog": ["index", "brand", "taste", "history", "discover", "master", "brewery", "campaign",
                 "campaign-first", "campaign-pouring", "campaign-pairing", "campaign-premium"],
        "pre_js": "()=>{document.cookie='hdAge=1;path=/';const g=document.getElementById('agegate');if(g)g.remove();document.documentElement.style.overflow=''}",
        "hide": ".x-none",
    },
    "hotel-e": {
        "code": "STAP-1001", "brand": "서라호텔앤리조트", "slug": "hotel-e-template", "accent": (140, 110, 60),
        "pages": ["index", "brands", "brand-view", "hotel-search", "offers", "offer-view", "dining", "wedding",
                  "wedding-list", "membership", "rewards", "rewards-benefits", "lifestyle", "reservation-check", "faq", "signup"],
        "kmong": ["index", "brands", "brand-view", "hotel-search", "offers", "dining", "wedding", "membership", "rewards", "lifestyle"],
        "blog": ["index", "brands", "brand-view", "hotel-search", "offers", "offer-view", "dining", "wedding",
                 "wedding-list", "membership", "rewards", "rewards-benefits", "lifestyle", "reservation-check"],
        "hide": ".x-none",
    },
    "clinic-f": {
        "code": "HOSP-1001", "brand": "결온의원", "slug": "clinic-f-template", "accent": (120, 110, 100),
        "pages": ["index", "about", "wave", "contour-shot", "facilities", "fees", "location", "contact"],
        "kmong": ["index", "about", "wave", "contour-shot", "facilities", "fees", "location", "contact"],
        "blog": ["index", "about", "wave", "contour-shot", "facilities", "fees", "location", "contact"],
        "hide": ".x-none",
    },
    "rentcar-f": {
        "code": "RENP-1001", "brand": "두루카", "slug": "rentcar-f-template", "accent": (30, 120, 90),
        "pages": ["index", "car", "places", "blog", "blog-1"],
        "kmong": ["index", "car", "places", "blog", "blog-1"],
        "blog": ["index", "car", "places", "blog", "blog-1"],
        "hide": ".x-none",
    },
    "rentcar-g": {
        "code": "RENP-1002", "brand": "한길렌터카", "slug": "rentcar-g-template", "accent": (20, 70, 150),
        "pages": ["index", "products", "estimate", "reserve", "guide", "notice"],
        "kmong": ["index", "products", "estimate", "reserve", "guide", "notice"],
        "blog": ["index", "products", "estimate", "reserve", "guide", "notice"],
        "hide": ".x-none",
    },
    "artist-a": {
        "code": "ARTP-1001", "brand": "NOVERIQ", "slug": "artist-a-template", "accent": (30, 30, 30),
        "pages": ["index", "works", "exhibition", "about", "contact"],
        "kmong": ["index", "works", "exhibition", "about", "contact"],
        "blog": ["index", "works", "exhibition", "about", "contact"],
        "hide": ".x-none",
    },
}


# 자를 수 있는 자리 = 실제 섹션·카드 줄의 윗변. 한 장(1900px)보다 긴 블록 안에서는 폭 기준을 낮춰
# 격자 한 줄의 윗변까지 찾되, 옆 카드 한복판에 걸리는 y(엇갈린 배치)는 버린다.
SECTION_JS = """()=>{const root=document.querySelector('main,#contents,.page,#container')||document.body;
 const out=[];
 const walk=(el,d,minw)=>{
  const ks=[...el.children].map(c=>({c,b:c.getBoundingClientRect()})).filter(o=>o.b.width>=minw&&o.b.height>=80);
  for(let i=0;i<ks.length;i++){const b=ks[i].b, y=Math.round(b.top+scrollY);
   let inside=false;
   if(minw<600){for(let j=0;j<ks.length;j++){if(j===i)continue;const o=ks[j].b;
    if(y>Math.round(o.top+scrollY)+8&&y<Math.round(o.bottom+scrollY)-8){inside=true;break}}}
   if(!inside)out.push(y);
   if(d<5&&b.height>600)walk(ks[i].c,d+1,b.height>2600?340:600)}};
 walk(root,0,600);out.push(document.documentElement.scrollHeight);
 return [...new Set(out)].sort((a,b)=>a-b)}"""
SEC_TARGET, SEC_MIN, SEC_MAX = 1350, 1150, 1900   # 4:5 를 기준 삼되 섹션이 끊기지 않게 폭을 준다


def save_sections(pg, fdir: Path, name: str) -> None:
    try:
        (fdir / f"{name}.sections.json").write_text(json.dumps(pg.evaluate(SECTION_JS)), encoding="utf-8")
    except Exception as e:
        print("  섹션 수집 실패", name, str(e)[:40])


def load_sections(fdir: Path, name: str, scale: float, height: int) -> list[int]:
    """저장해 둔 섹션 경계(css px)를 조각 이미지 좌표로 바꾼다."""
    f = fdir / f"{name}.sections.json"
    if not f.exists():
        return []
    ys = [round(y * scale) for y in json.loads(f.read_text(encoding="utf-8"))]
    ys = sorted({y for y in ys if 0 < y < height})
    return ys


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


def fix_bands(key: str, sp: dict, fdir: Path, limit: float = 0.12) -> None:
    """이미 찍어 둔 페이지 중 큰 빈 띠가 있는 쪽만 이어붙이기로 다시 찍는다."""
    todo = []
    for f in sorted(fdir.glob("*.png")):
        if f.stem == "hero" or f.stem.endswith("-stack") or f.stem.startswith("_"):
            continue
        with Image.open(f) as im:
            r = band_ratio(im)
        if r > limit:
            todo.append((f.stem, r))
    if not todo:
        print(key, "빈 띠 없음")
        return
    names = {n for n, _ in todo}
    shots = {sh["name"]: sh for sh in sp.get("shots", [])}
    with sync_playwright() as p:
        b = p.chromium.launch()
        ctx = b.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
        pg = ctx.new_page()
        for name, before in todo:
            sh = shots.get(name)
            page = sh["page"] if sh else name
            pg.goto(f"{SERVER}{key}/{page}.html", wait_until="networkidle")
            pg.wait_for_timeout(1000)
            pg.add_style_tag(content=f"{sp.get('hide', '.x-none')}{{display:none!important}}" + SMOOTH_CSS)
            if sp.get("css"):
                pg.add_style_tag(content=sp["css"])
            pg.evaluate("""()=>{for(const e of document.querySelectorAll('.promo-popup,.layer-popup,[class*=popup],[class*=dim]')){
              const b=e.getBoundingClientRect();if(b.width>200&&b.height>150)e.style.setProperty('display','none','important')}}""")
            if sh:
                for sel in sh.get("clicks", []):
                    try:
                        pg.locator(sel).first.click(timeout=4000)
                        pg.wait_for_timeout(500)
                    except Exception:
                        pass
                for sel, val in sh.get("fill", []):
                    pg.evaluate("""([sel,val])=>{const i=document.querySelector(sel);if(!i)return;i.value=val;
                      i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}));
                      const f=i.closest('form');if(f){f.requestSubmit?f.requestSubmit():f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}))}}""", [sel, val])
                    pg.wait_for_timeout(700)
            cut = min(pg.evaluate(FOOT_JS), sp.get("max_cut", MAX_CUT))
            im = stitch_page(pg, cut)
            after = band_ratio(im)
            if after < before:
                im.save(fdir / f"{name}.png")
                print(f"  {name:22s} 빈 띠 {before:.0%} → {after:.0%}")
            else:
                print(f"  {name:22s} 빈 띠 {before:.0%} 유지 (이어붙이기 {after:.0%} 라 그대로)")
        ctx.close()
        b.close()


def collect_sections(key: str, sp: dict, fdir: Path) -> None:
    """이미 찍어 둔 쪽들의 섹션 경계만 다시 모은다 (화면은 안 찍는다)."""
    names = [(n, n) for n in sp["pages"]] + [(sh["name"], sh["page"]) for sh in sp.get("shots", [])]
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": 1440, "height": 900})
        for name, page in names:
            if not (fdir / f"{name}.png").exists():
                continue
            pg.goto(f"{SERVER}{key}/{page}.html", wait_until="networkidle")
            pg.add_style_tag(content="html{scroll-behavior:auto!important}")
            if sp.get("pre_js"):
                pg.evaluate(sp["pre_js"])
            pg.wait_for_timeout(800)
            h = pg.evaluate("document.documentElement.scrollHeight")
            for y in range(0, h, 700):
                pg.evaluate(f"scrollTo(0,{y})")
                pg.wait_for_timeout(70)
            pg.evaluate("scrollTo(0,0)")
            # 캡처와 같은 상태(고정 장면 해제 · 숨김 · 등장 효과 켜기)에서 재야 좌표가 사진과 맞는다
            pg.evaluate("window.ScrollTrigger && ScrollTrigger.getAll().forEach(t=>t.kill(true))")
            if sp.get("css"):
                pg.add_style_tag(content=sp["css"])
            pg.add_style_tag(content=f"{sp.get('hide', '.x-none')}{{display:none!important}}")
            if sp.get("stitch"):
                pg.add_style_tag(content=SMOOTH_CSS)
            reveal(pg)
            pg.wait_for_timeout(400)
            save_sections(pg, fdir, name)
        b.close()
    print(key, "섹션 수집", len(list(fdir.glob("*.sections.json"))), "쪽")


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
            if sp.get("pre_js"):
                pg.evaluate(sp["pre_js"])
            pg.wait_for_timeout(1000)
            h = pg.evaluate("document.documentElement.scrollHeight")
            for y in range(0, h, 600):
                pg.evaluate(f"scrollTo(0,{y})")
                pg.wait_for_timeout(100)
            pg.evaluate("scrollTo(0,0)")
            pg.evaluate("window.ScrollTrigger && ScrollTrigger.getAll().forEach(t=>t.kill(true))")
            pg.add_style_tag(content=f"{sp.get('hide', '.x-none')}{{display:none!important}}")
            reveal(pg)
            pg.evaluate("""()=>{for(const e of document.querySelectorAll('.promo-popup,.layer-popup,[class*=popup],[class*=dim]')){
              const b=e.getBoundingClientRect();if(b.width>200&&b.height>150)e.style.setProperty('display','none','important')}}""")
            for sel in sh.get("clicks", []):
                try:
                    pg.locator(sel).first.click(timeout=5000)
                    pg.wait_for_timeout(600)
                except Exception as e:
                    print("  click skip", sel, str(e)[:40])
            for sel, val in sh.get("fill", []):
                try:
                    box = pg.locator(sel).first  # 같은 칸이 머리글에도 있을 수 있어 첫 번째만
                    box.fill(val, timeout=4000)
                    box.press("Enter")
                except Exception:
                    # 팝업이 덮고 있으면 클릭이 막힌다 → 값을 직접 넣고 폼을 보낸다
                    ok = pg.evaluate("""([sel,val])=>{const i=document.querySelector(sel);if(!i)return false;
                      i.value=val;i.dispatchEvent(new Event('input',{bubbles:true}));i.dispatchEvent(new Event('change',{bubbles:true}));
                      const f=i.closest('form');if(f){f.requestSubmit?f.requestSubmit():f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}))}
                      else{i.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}))}return true}""", [sel, val])
                    print("  fill via js", sel, ok)
                pg.wait_for_timeout(900)
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
            if sp.get("pre_js"):
                pg.evaluate(sp["pre_js"])
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
            save_sections(pg, fdir, name)
            if sp.get("stitch"):
                pg.add_style_tag(content=SMOOTH_CSS)
                stitch_page(pg, cut).save(fdir / f"{name}.png")
                print("captured", name, cut, "(이어붙이기)")
            else:
                pg.screenshot(path=str(fdir / f"{name}.png"), full_page=True, clip={"x": 0, "y": 0, "width": 1440, "height": cut})
                with Image.open(fdir / f"{name}.png") as shot:
                    band = band_ratio(shot)
                # 스크롤로 채워지는 장면은 통짜 캡처에서 큰 빈 띠로 남는다 → 그 쪽만 이어붙이기로 다시
                if band > 0.12:
                    pg.add_style_tag(content=SMOOTH_CSS)
                    stitch_page(pg, cut).save(fdir / f"{name}.png")
                    with Image.open(fdir / f"{name}.png") as shot:
                        print("captured", name, cut, f"(빈 띠 {band:.0%} → 이어붙이기, 다시 {band_ratio(shot):.0%})")
                else:
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


def usable(im: Image.Image, min_ratio: float = 0.045) -> bool:
    """허전한 장(목록 몇 줄만) · 한쪽이 통째로 빈 장(검정·흰 띠)을 뺀다."""
    return content_ratio(im) >= min_ratio and band_ratio(im) <= 0.45


def band_ratio(im: Image.Image) -> float:
    """가장 긴 '한 가지 색으로만 채워진 띠'가 전체 높이에서 차지하는 비율.
    평균 내용 비율만 보면 위쪽 절반이 통검정이어도 통과해 버린다(사용자 지적)."""
    k = max(1, im.height // 600)
    g = im.convert("L").resize((100, max(20, im.height // k)))
    px = g.load()
    w, h = g.size
    best = run = 0
    for y in range(h):
        row = [px[x, y] for x in range(w)]
        if max(row) - min(row) < 8:
            run += 1
            best = max(best, run)
        else:
            run = 0
    return best / h


def quiet_row(im: Image.Image, lo: int, hi: int) -> int:
    """lo~hi 사이에서 가로 방향 변화가 가장 적은 줄 — 글·카드를 가르지 않는 자리."""
    lo, hi = max(0, lo), min(im.height, hi)
    if hi - lo < 8:
        return hi
    g = im.convert("L")
    px = g.load()
    step = max(1, im.width // 160)
    best, best_v = hi, None
    for y in range(hi - 1, lo, -3):
        row = [px[x, y] for x in range(0, im.width, step)]
        v = max(row) - min(row)
        if best_v is None or v < best_v:
            best, best_v = y, v
            if v < 4:
                break
    return best


def chunks_sections(im: Image.Image, secs: list[int], target: int, lo: int, hi: int) -> list[Image.Image]:
    """섹션 경계에서만 자른다. 짧은 섹션은 묶고, 한 섹션이 한 장보다 길면 겹쳐 자른다."""
    w, h = im.size
    bounds = [y for y in secs if 0 < y < h] + [h]
    out, start, i = [], 0, 0
    while start < h - 60:
        if h - start <= hi:                       # 남은 게 한 장 안에 들어가면 통째로
            out.append(im.crop((0, start, w, h)))
            break
        cand = [y for y in bounds if start + lo < y <= start + hi]
        if cand:                                  # 한 장 크기 안에 드는 경계 중 목표에 가장 먼저 닿는 것
            nxt = next((y for y in cand if y - start >= target), cand[-1])
            out.append(im.crop((0, start, w, nxt)))
            start = nxt
        else:                                     # 섹션 하나가 한 장보다 길다 → 안에서 자르되 15% 겹친다
            cut = quiet_row(im, start + int(target * 0.85), start + target)
            out.append(im.crop((0, start, w, cut)))
            start = max(start + 1, cut - int(target * 0.15))
        i += 1
        if i > 40:
            break
    return out


def chunks_45(im: Image.Image, pad_to: int) -> list[Image.Image]:
    """페이지를 4:5 장으로 나눈다. 모든 장이 같은 높이이고, 다음 장은 조용한 줄에서 시작한다."""
    w, h = im.size
    if h <= pad_to:
        bg = im.crop((0, h - 1, w, h)).resize((1, 1)).getpixel((0, 0))
        c = Image.new("RGB", (w, pad_to), bg)
        c.paste(im, (0, 0))
        return [c]
    out, y = [], 0
    while True:
        if h - y <= pad_to:                      # 마지막 장은 페이지 바닥에 붙여 자른다
            out.append(im.crop((0, h - pad_to, w, h)))
            break
        out.append(im.crop((0, y, w, y + pad_to)))
        y = quiet_row(im, y + int(pad_to * 0.82), y + pad_to)
    return out


def dedupe(parts: list[Image.Image], tol: float = 8.0) -> list[Image.Image]:
    """거의 같은 장이 잇달아 나오면 하나만 남긴다 (마지막 장을 바닥에 붙이면서 겹칠 수 있다)."""
    out: list[Image.Image] = []
    for pt in parts:
        if out and diff(out[-1], pt) < tol:
            continue
        out.append(pt)
    return out


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


def squash_gaps(im: Image.Image, secs: list[int], min_run: int = 320, keep: int = 150):
    """본문 한가운데 아주 긴 빈 줄(공지 목록 아래 절반이 비는 쪽 같은)을 줄인다.
    자르기 전에 줄여야 텅 빈 장이 안 생긴다. 섹션 경계 좌표도 같이 옮긴다."""
    g = im.convert("L").resize((60, im.height), Image.NEAREST)
    px = g.load()
    runs, run = [], 0
    for y in range(im.height):
        row = [px[x, y] for x in range(60)]
        if max(row) - min(row) < 6:
            run += 1
            continue
        if run > min_run:
            runs.append((y - run, y))
        run = 0
    if run > min_run:
        runs.append((im.height - run, im.height))
    if not runs:
        return im, secs
    ranges, prev = [], 0
    for a, b in runs:
        ranges.append((prev, min(a + keep, b)))   # 여백을 다 없애지 말고 keep 만큼은 남긴다
        prev = b
    ranges.append((prev, im.height))
    ranges = [(a, b) for a, b in ranges if b > a]
    out = Image.new("RGB", (im.width, sum(b - a for a, b in ranges)))
    y, remap = 0, []
    for a, b in ranges:
        out.paste(im.crop((0, a, im.width, b)), (0, y))
        remap.append((a, b, y - a))
        y += b - a

    def moved(v: int):
        for a, b, d in remap:
            if a <= v < b:
                return v + d
        return None

    return out, sorted({z for z in (moved(v) for v in secs) if z is not None})


def page_images(fdir: Path, name: str, w: int = OUT_W, max_h: int = MAX_H, pad_to: int = 0) -> list[Image.Image]:
    stacked = (fdir / f"{name}-stack.png").exists()
    if stacked:
        im = Image.open(fdir / f"{name}-stack.png").convert("RGB")
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        fh = round(w * 900 / 1440)  # 이어 붙인 프레임 한 장 높이 — 프레임 경계에서만 자른다
        per = max(1, max_h // fh)
        parts = [im.crop((0, y, w, min(y + per * fh, im.height))) for y in range(0, im.height, per * fh)]
    else:
        im = trim_tail(Image.open(fdir / f"{name}.png").convert("RGB"))
        im = im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        secs = load_sections(fdir, name, w / 1440, im.height)
        im, secs = squash_gaps(im, secs)
        parts = [pt for pt in split_rows(im, max_h) if not blank(pt)]
    if stacked:
        secs = []
    if pad_to:
        # 섹션 경계에서 자른다(A안). 경계 정보가 없으면 예전처럼 높이로 자른다.
        parts = chunks_sections(im, secs, SEC_TARGET, SEC_MIN, SEC_MAX) if secs else chunks_45(im, pad_to)
    elif secs:
        parts = chunks_sections(im, secs, min(max_h - 600, 2400), 1200, max_h)
    return dedupe([pt for pt in parts if usable(pt)])


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


def cover(fdir: Path, wide: bool = False) -> Image.Image:
    """크몽 대표는 1:1, 블로그·당근 표지는 그 세트의 다른 장과 같은 4:5."""
    im = Image.open(fdir / "hero.png").convert("RGB")
    if wide:
        need = im.width * 1350 / 1080
        box = im.crop((0, 0, im.width, min(im.height, round(need))))
        return box.resize((1080, 1350), Image.LANCZOS)
    s = im.height
    x0 = (im.width - s) // 2
    return im.crop((x0, 0, x0 + s, s)).resize((1080, 1080), Image.LANCZOS)


def main() -> None:
    key = sys.argv[1]
    sp = SPECS[key]
    root = OUT_ROOT / f"{sp['code']}_{sp['brand']}"
    fdir = root / "_pages"
    if "--sections" in sys.argv:
        collect_sections(key, sp, fdir)
        return                                  # 경계만 모으고 끝 (다시 뽑는 건 따로 돌린다)
    elif "--fix-bands" in sys.argv:
        fix_bands(key, sp, fdir)
    elif "--shots" in sys.argv:
        capture(key, sp, fdir, only_shots=True)
    elif "--capture" in sys.argv or not (fdir / "hero.png").exists():
        capture(key, sp, fdir)
    frames = [root / "_frames" / f"{n}.png" for n in sp.get("index_frames", [])]
    frames = [f for f in frames if f.exists()]
    if frames:
        stack([Image.open(f).convert("RGB") for f in frames]).save(fdir / "index-stack.png")
    elif sp.get("index_frames"):
        (fdir / "index-stack.png").unlink(missing_ok=True)  # 프레임이 없으면 통짜 캡처를 쓴다
        print("  (_frames 없음 → index 통짜 캡처 사용)")
    for name in sp.get("frames_pages", []):  # 고정 장면이 있는 서브 페이지 — 휠 프레임 중 앞 프레임과 다른 것만 이어 붙인다
        kept = []
        for f in sorted((root / "_frames").glob(f"pc-{name}-*.png")):
            im = Image.open(f).convert("RGB")
            if kept and diff(kept[-1], im) < 4:
                continue
            kept.append(im)
        stack(kept).save(fdir / f"{name}-stack.png")
        print("stacked", name, len(kept))

    shot_names = {sh["name"] for sh in sp.get("shots", [])}

    def prune(items: list[tuple[str, Image.Image]]) -> list[tuple[str, Image.Image]]:
        out: list[tuple[str, Image.Image]] = []
        for name, im in items:
            head, _, tail = name.rpartition("-")
            stem = head if tail.isdigit() and head else name
            hit = next((i for i, (_, prev) in enumerate(out) if diff(prev, im) < 8), None)
            if hit is None:
                out.append((name, im))
            elif stem in shot_names:
                # 검색 결과 · 탭 전환 같은 기능 화면은, 닮은 원래 쪽을 대신 빼고 이쪽을 남긴다
                out[hit] = (name, im)
        return out

    def save(folder: str, items: list[tuple[str, Image.Image]]) -> None:
        out = root / folder
        out.mkdir(parents=True, exist_ok=True)
        for old in out.glob("*.*"):
            old.unlink()
        for n, (label, im) in enumerate(items, 1):
            im.save(out / f"{n:02d}-{label}.jpg", quality=90)
        print(folder, len(items))

    # 상세 10장은 쪽을 골고루 보여 준다 — 한 쪽이 조각을 여러 개 내도 먼저 쪽마다 한 장씩 돌린다
    # (안 그러면 앞 쪽 조각이 열 칸을 다 먹어 뒤 쪽은 한 장도 못 들어간다)
    kper = {n: page_images(fdir, n) for n in sp["kmong"]}
    kmong = [("대표", cover(fdir))]
    for r in range(max((len(v) for v in kper.values()), default=0)):
        for name in sp["kmong"]:
            if r < len(kper[name]):
                kmong.append((f"{name}{'-' + str(r + 1) if r else ''}", kper[name][r]))
    kmong = prune(kmong)
    save("크몽", kmong[:11])  # 대표 1 + 상세 10

    # 섹션 경계로 자르면서 쪽마다 조각 수가 달라졌다 → 몫을 늘려 가며 대표+19 장을 채운다
    order = list(sp.get("blog", sp["pages"]))
    per = {n: page_images(fdir, name=n, w=1080, max_h=1350, pad_to=1350) for n in order}
    for n in sp["pages"]:                       # 그래도 모자라면 나머지 쪽에서 더 가져온다
        if sum(len(v) for v in per.values()) >= 22:
            break
        if n not in per:
            order.append(n)
            per[n] = page_images(fdir, name=n, w=1080, max_h=1350, pad_to=1350)
    cap = sp.get("per_page", 3)                 # 한 페이지가 너무 많이 차지하지 않게
    while sum(min(len(v), cap) for v in per.values()) < 22 and cap < max((len(v) for v in per.values()), default=0):
        cap += 1
    full = []
    for name in order:
        for k, im in enumerate(per[name][:cap]):
            full.append((f"{name}{'-' + str(k + 1) if k else ''}", im))
    # 안내(가격) 장은 빼기로 함 — 대표 + 조각 19 = 20 (2026-09-15)
    full = prune(full)
    save("블로그", [("대표", cover(fdir, wide=True))] + full[:19])
    save("당근_카페", [("대표", cover(fdir, wide=True))] + full[:19])
    save("당근_비즈니스소식", [("대표", cover(fdir, wide=True))] + full[:9])


if __name__ == "__main__":
    main()
