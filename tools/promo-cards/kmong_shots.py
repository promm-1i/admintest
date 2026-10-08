"""크몽용 캡처 — 대표 1:1 + 상세 10장.

  python kmong_shots.py <슬러그 ...>        예: kmong_shots.py vet-f-template
  python kmong_shots.py --missing           크몽에 아직 안 올린 프리미엄 전부

크몽 규격: 대표 1:1 · 가로 600 이상 / 상세 최대 10장 · 가로 600 이상 · 세로 3000 이하.
쪽 목록은 템플릿 폴더의 .html 과 메인 내비게이션 링크에서 자동으로 뽑는다(쪽이 67종마다 달라
손으로 적을 수 없다). 쪽이 많으면 여러 쪽을 고루 보여 주고, 적으면 메인을 나눠 채운다.

출력: Desktop\\개발\\크몽_업로드\\<코드>_<브랜드>\\
  00_대표_1x1.png · 01~10_상세.png
푸터에 실제 연락처가 있어 푸터 위에서 자른다.
"""
import re
import sys
import unicodedata
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

Image.MAX_IMAGE_PIXELS = None
sys.path.insert(0, str(Path(__file__).parent))
from make_page_shots import (  # noqa: E402
    FOOT_JS, REVEAL_JS, SECTION_JS, SMOOTH_CSS, band_ratio, chunks_sections,
    content_ratio, diff, squash_gaps, trim_tail,
)

SERVER = __import__("os").environ.get("TPL_SERVER", "http://127.0.0.1:8771")
REPO = Path(__file__).resolve().parents[2]
OUT_W = 1440          # 사이트가 그려지는 폭 그대로 — 줄이면 글씨가 작아져 흐려 보인다
MAX_H = 3000          # 크몽 세로 상한
MAX_CUT = 24000
N_DETAIL = 10

# 푸터가 position:fixed 인 템플릿(윤슬)은 rect 가 화면 기준이라 문서 좌표로 쓸 수 없다 → 문서 높이로.
CUT_JS = """(()=>{const f=document.querySelector('footer,#footer,.footer,#ft,.ft');
 const doc=document.documentElement.scrollHeight;
 if(!f)return doc;
 for(let p=f;p;p=p.parentElement){if(getComputedStyle(p).position==='fixed')return doc}
 const y=Math.round(f.getBoundingClientRect().top+scrollY);
 return (y<300&&doc>1200)?doc:y})()"""

# 떠 있는 푸터·퀵메뉴는 전체 캡처에서 본문을 덮는다 (머리글은 맨 위에 한 번만 그려져 그대로 둔다)
HIDE_FIXED_JS = """()=>{for(const e of document.querySelectorAll('footer,[class*=quick],[class*=gotop],[class*=float],[id*=quick],[class*=sticky-bar]')){
  if(getComputedStyle(e).position==='fixed')e.style.setProperty('display','none','important')}}"""


SKIP = re.compile(r"(privacy|terms|policy|login|signup|join|sitemap|agree|email|member|error|404)", re.I)


def out_root() -> Path:
    dev = next((p for p in (Path.home() / "Desktop").iterdir()
                if unicodedata.normalize("NFC", p.name) == "개발"), None)
    return (dev or Path.home() / "Desktop" / "개발") / "크몽_업로드"


def brand_of(code: str) -> str | None:
    """브랜드명은 블로그 캡처 폴더(<코드>_<브랜드>)에서 가져온다 — 쪽 제목은 수식어가 붙어 지저분하다."""
    cap = out_root().parent / "프리미엄_상세페이지_캡처"
    if not cap.is_dir():
        return None
    for d in cap.iterdir():
        if d.is_dir() and unicodedata.normalize("NFC", d.name).startswith(code + "_"):
            return unicodedata.normalize("NFC", d.name).split("_", 1)[1]
    return None


def premium() -> list[dict]:
    src = (REPO / "src" / "lib" / "samples.ts").read_text(encoding="utf-8")
    rows = []
    for b in src.split("    slug: ")[1:]:
        head = b.split("\n  },")[0]
        if "premium: true" not in head:
            continue
        g = lambda k: (re.search(k + r': "([^"]+)"', head) or [None, ""])[1]
        slug = b.split('"')[1]
        live = g("liveUrl")
        folder = live.strip("/").split("/")[-1] if live else slug[:-9]
        rows.append({"slug": slug, "code": g("designCode"), "title": g("title"), "folder": folder})
    return rows


def site_dir(folder: str) -> Path:
    d = REPO / "public" / "templates" / folder
    return d if d.is_dir() else REPO / "public" / folder


# 내비 링크를 먼저, 없으면 본문 링크를 **나온 순서대로**. 알파벳순으로 떨어지면
# blog-1 · gallery-2 같은 하위 쪽만 골라서 사이트가 엉뚱하게 보인다.
NAV_JS = """()=>{const nav=[],body=[];
 for(const a of document.querySelectorAll('a[href]')){
   const h=a.getAttribute('href')||'';
   if(!h.endsWith('.html')||h.includes('://'))continue;
   const n=h.split('/').pop().replace('.html','');
   (a.closest('header,nav,.gnb,#gnb,.header,#header')?nav:body).push(n);
 }
 return [[...new Set(nav)],[...new Set(body)]]}"""


def page_list(pg, folder: str, want: int) -> list[str]:
    """메인 내비 → 본문 링크 → 나머지 순. 같은 묶음의 하위 쪽(-1, -2)은 뒤로 민다."""
    allp = {p.stem for p in site_dir(folder).glob("*.html")}
    nav, body = pg.evaluate(NAV_JS)
    keep = lambda lst: [n for n in lst if n in allp and not SKIP.search(n)]
    sub = re.compile(r"-\d+$")
    rest = sorted(n for n in allp if not SKIP.search(n))
    order, seen = [], set()
    for group in (keep(nav), keep(body), rest):
        for n in sorted(group, key=lambda x: (bool(sub.search(x)),)):
            if n not in seen:
                seen.add(n)
                order.append(n)
    if "index" in order:
        order.remove("index")
    return (["index"] + order)[:want]


def grab(pg, key_dir: Path, name: str, folder: str, max_cut: int = MAX_CUT) -> Image.Image | None:
    url = f"{SERVER}/{'templates/' + folder if (REPO / 'public' / 'templates' / folder).is_dir() else folder}/{name}.html"
    try:
        pg.goto(url, wait_until="networkidle", timeout=60000)
    except Exception:
        return None
    pg.add_style_tag(content="html{scroll-behavior:auto!important}")
    pg.wait_for_timeout(900)
    h = pg.evaluate("document.documentElement.scrollHeight")
    for y in range(0, min(h, max_cut), 600):
        pg.evaluate(f"scrollTo(0,{y})")
        pg.wait_for_timeout(90)
    pg.evaluate("scrollTo(0,0)")
    pg.evaluate("window.ScrollTrigger && ScrollTrigger.getAll().forEach(t=>t.kill(true))")
    pg.add_style_tag(content="[data-aos],.rv,.ani,.fadeUp,.fadeLeft,.fadeRight{opacity:1!important;transform:none!important;transition:none!important}")
    pg.evaluate(REVEAL_JS)
    # 팝업은 클래스 이름이 템플릿마다 달라 이름으로는 못 잡는다 →
    # '닫기 / 하루동안 / 오늘 하루' 단추를 품은 떠 있는 상자를 지운다.
    pg.evaluate("""()=>{
      const kill=e=>e.style.setProperty('display','none','important');
      for(const e of document.querySelectorAll('.promo-popup,.layer-popup,[class*=popup],[id*=popup],[class*=agegate],[id*=agegate],[class*=dimm],.dim')){
        const b=e.getBoundingClientRect(); if(b.width>200&&b.height>150) kill(e);
      }
      for(const e of document.querySelectorAll('div,aside,section')){
        const s=getComputedStyle(e);
        if(s.position!=='fixed'&&s.position!=='absolute')continue;
        const b=e.getBoundingClientRect();
        if(b.width<200||b.height<150||b.width>1500&&b.height>1200)continue;
        const t=(e.innerText||'');
        if(/닫기|하루ㅤ?동안|오늘 하루|다시 보지|그만 보기/.test(t)) kill(e);
      }}""")
    pg.wait_for_timeout(700)
    # body 가 스크롤 상자인 템플릿(윤슬 계열)은 전체 캡처가 한 화면만 찍히고 푸터 좌표도 틀린다 → 풀어 준다
    locked = pg.evaluate("""()=>{const s=getComputedStyle(document.body);
      return (s.overflowY==='auto'||s.overflowY==='scroll'||s.overflowY==='hidden')
             && document.body.scrollHeight > document.body.clientHeight + 50}""")
    pg.evaluate(HIDE_FIXED_JS)
    cut = min(pg.evaluate(CUT_JS), max_cut)
    if locked or cut < 400:
        pg.add_style_tag(content=SMOOTH_CSS)
        pg.wait_for_timeout(600)
        cut = min(pg.evaluate(CUT_JS), max_cut)
    if cut < 400:
        return None
    shot = key_dir / "_tmp.png"
    try:   # 아주 긴 쪽은 한 번에 못 찍는다 — 그 쪽만 건너뛰고 나머지는 계속
        pg.screenshot(path=str(shot), full_page=True, timeout=120000,
                      clip={"x": 0, "y": 0, "width": 1440, "height": cut})
    except Exception as e:
        print("   쪽 건너뜀", name, str(e)[:40])
        return None
    im = trim_tail(Image.open(shot).convert("RGB"))
    secs = pg.evaluate(SECTION_JS)
    shot.unlink(missing_ok=True)
    im = im.resize((OUT_W, round(im.height * OUT_W / im.width)), Image.LANCZOS)
    scale = OUT_W / 1440
    ys = sorted({round(y * scale) for y in secs if 0 < y * scale < im.height})
    im, ys = squash_gaps(im, ys)
    im.info["secs"] = ys
    return im


def pick(im: Image.Image, ys: list[int], n: int) -> list[Image.Image]:
    parts = chunks_sections(im, ys, 2400, 1200, MAX_H) if ys else [im.crop((0, y, im.width, min(y + 2400, im.height))) for y in range(0, im.height, 2400)]
    good = [p for p in parts if content_ratio(p) >= 0.045 and band_ratio(p) <= 0.45 and p.height <= MAX_H]
    return good[:n]


def viewport_shots(pg, n: int, step: int = 820) -> list[Image.Image]:
    """캔버스·한 장짜리 사이트는 통짜 캡처에 안 잡힌다 → 화면을 한 장씩 넘겨 가며 찍는다."""
    out, last, stuck = [], -1, 0
    # 캔버스로 그리는 장면(3D)은 내용·띠 비율로 거르면 다 버려진다 — 그대로 담는다
    canvas = pg.evaluate("""()=>[...document.querySelectorAll('canvas')].some(c=>{
      const b=c.getBoundingClientRect();return b.width>600&&b.height>400})""")
    for i in range(n * 3):
        y = i * step
        pg.evaluate(f"scrollTo(0,{y})")
        pg.wait_for_timeout(1200 if canvas else 700)
        real = pg.evaluate("Math.round(scrollY)")
        if real == last:          # 부드러운 스크롤은 한 박자 늦게 따라온다 — 한 번은 봐준다
            stuck += 1
            if stuck >= 2:
                break
        else:
            stuck = 0
        last = real
        buf = pg.screenshot()
        from io import BytesIO
        im = Image.open(BytesIO(buf)).convert("RGB")
        im = im.resize((OUT_W, round(im.height * OUT_W / im.width)), Image.LANCZOS)
        if out and diff(out[-1], im) < 3.5:
            continue
        # 3D·사진 장면은 바탕이 넓어 띠 비율이 높게 나온다 — 통짜 캡처보다 느슨하게 본다
        if not canvas and (content_ratio(im) < 0.03 or band_ratio(im) > 0.8):
            continue
        out.append(im)
        if len(out) >= n:
            break
    return out


def run(slugs: list[str]) -> None:
    rows = {r["slug"]: r for r in premium()}
    root = out_root()
    with sync_playwright() as p:
        b = p.chromium.launch()
        for slug in slugs:
          try:
            r = rows.get(slug)
            if not r:
                print("프리미엄 아님:", slug)
                continue
            ctx = b.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
            pg = ctx.new_page()
            base = f"{SERVER}/{'templates/' + r['folder'] if (REPO / 'public' / 'templates' / r['folder']).is_dir() else r['folder']}/index.html"
            try:
                pg.goto(base, wait_until="networkidle", timeout=60000)
            except Exception as e:
                print(r["code"], "열기 실패", str(e)[:50])
                ctx.close()
                continue
            pg.wait_for_timeout(800)
            brand = brand_of(r["code"]) or re.split(r"[|—\-·]", (pg.title() or slug))[0].strip()[:24] or slug
            outdir = root / f"{r['code']}_{brand}"
            outdir.mkdir(parents=True, exist_ok=True)
            for old in outdir.glob("*.png"):
                old.unlink()
            names = page_list(pg, r["folder"], 14)
            # 쪽이 적은 템플릿은 한 쪽에서 더 잘라 10장을 채운다
            per_cap = max(2, -(-N_DETAIL // max(1, len(names))) + 2)

            # 대표 1:1 — 첫 화면 가운데를 정사각으로
            pg.evaluate("scrollTo(0,0)")
            pg.wait_for_timeout(500)
            hero = outdir / "_hero.png"
            pg.screenshot(path=str(hero))
            hi = Image.open(hero).convert("RGB")
            side = min(hi.width, hi.height)
            hi.crop(((hi.width - side) // 2, 0, (hi.width + side) // 2, side)).resize((1080, 1080), Image.LANCZOS).save(outdir / "00_대표_1x1.png")
            hero.unlink(missing_ok=True)

            # 상세 — 쪽마다 한 장씩 먼저 돌리고, 모자라면 같은 쪽의 다음 조각으로 채운다
            per: list[list[Image.Image]] = []
            for nm in names:
                im = grab(pg, outdir, nm, r["folder"])
                if im is None:
                    continue
                per.append(pick(im, im.info.get("secs", []), per_cap))
                if sum(len(x) for x in per) >= N_DETAIL * 2:
                    break
            picked: list[Image.Image] = []
            for rank in range(per_cap):
                for lst in per:
                    if rank < len(lst) and len(picked) < N_DETAIL:
                        if not any(diff(q, lst[rank]) < 8 for q in picked):
                            picked.append(lst[rank])
            if len(picked) < 4:   # 한 장짜리·캔버스 사이트 — 화면을 넘겨 가며 채운다
                pg.goto(base, wait_until="networkidle", timeout=60000)
                pg.wait_for_timeout(1200)
                pg.evaluate(HIDE_FIXED_JS)
                vs = viewport_shots(pg, N_DETAIL)
                if len(vs) > len(picked):      # 화면 넘겨 찍은 게 더 많으면 그걸 쓴다
                    picked = vs
                else:
                    for im in vs:
                        if len(picked) < N_DETAIL and not any(diff(q, im) < 5 for q in picked):
                            picked.append(im)
            for i, im in enumerate(picked, 1):
                im.save(outdir / f"{i:02d}_상세.png")
            print(f"{r['code']} {brand} — 쪽 {len(per)} · 상세 {len(picked)}장", flush=True)
            ctx.close()
          except Exception as e:
            print(r['code'], '실패', str(e)[:60], flush=True)
            try: ctx.close()
            except Exception: pass
        b.close()


def main() -> None:
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    if "--missing" in sys.argv or not args:
        have = {unicodedata.normalize("NFC", d.name).split("_")[0]
                for d in out_root().iterdir() if d.is_dir()} if out_root().is_dir() else set()
        args = [r["slug"] for r in premium() if r["code"] not in have]
        print("크몽 캡처 대상", len(args), "종")
    run(args)


if __name__ == "__main__":
    main()
