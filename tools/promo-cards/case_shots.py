"""블로그용 캡처 — 프리미엄 사례 상세(/samples/<slug>)를 섹션별로 잘라 낸다.

  python case_shots.py vet-f-template [다른슬러그 ...]
  python case_shots.py --missing          캡처 폴더가 없는 프리미엄만

출력: Desktop\\개발\\프리미엄_상세페이지_캡처\\<코드>_<브랜드>\\
  00_전체_PC.jpg(1440 폭) · 00_전체_모바일.jpg(780 폭)
  01_첫화면 · 02_개요 · 03_기능범위 · 04_페이지구성 · 05_포인트N · 06_디테일 · 07_모바일 · 08_실물화면 · 09_FAQ
  (가로 2880 = 1440 × 2배 해상도)
값·가격 섹션과 '같은 업종의 다른 디자인'은 뺀다 — 블로그 글에 금액을 쓰지 않기로 했다.
"""
import json
import re
import sys
import unicodedata
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

Image.MAX_IMAGE_PIXELS = None

BASE = "http://127.0.0.1:5191"
REPO = Path(__file__).resolve().parents[2]
PAD = 48          # 섹션 위아래로 더 담는 여백(css px)


def out_root() -> Path:
    dev = next((p for p in (Path.home() / "Desktop").iterdir()
                if unicodedata.normalize("NFC", p.name) == "개발"), None)
    return (dev or Path.home() / "Desktop" / "개발") / "프리미엄_상세페이지_캡처"


def premium() -> list[dict]:
    src = (REPO / "src" / "lib" / "samples.ts").read_text(encoding="utf-8")
    rows = []
    for b in src.split("    slug: ")[1:]:
        head = b.split("\n  },")[0]
        if "premium: true" not in head:
            continue
        g = lambda k: (re.search(k + r': "([^"]+)"', head) or [None, ""])[1]
        rows.append({"slug": b.split('"')[1], "code": g("designCode"), "title": g("title")})
    return rows


SEC_JS = """()=>{const root=document.querySelector('main')||document.body;
 const out=[];
 for(const s of root.querySelectorAll('section')){
   const b=s.getBoundingClientRect();
   if(b.height<100||b.width<600)continue;
   if(s.parentElement&&s.parentElement.closest('section'))continue;   // 섹션 안의 섹션은 뺀다
   const h=s.querySelector('h1,h2,h3');
   out.push({y:Math.round(b.top+scrollY), h:Math.round(b.height), head:(h?h.innerText:'').trim()});
 }
 return out.sort((a,b)=>a.y-b.y)}"""


def label(head: str, seen: dict) -> str | None:
    """섹션 제목으로 파일 이름을 정한다. None 이면 안 찍는다."""
    t = head.replace(" ", "")
    if "제작하면" in t or "상담신청" in t or "같은업종의다른디자인" in t:
        return None
    if t.startswith("Overview"):
        return "02_개요"
    if "제작범위" in t or "기능범위" in t:
        return "03_기능범위"
    if re.search(r"쪽이어떻게|쪽은어떻게|어떻게이어지는지|흐름", t):
        return "04_페이지구성"
    if "만들때신경쓴것" in t or t.startswith("자세히"):
        return "06_디테일"
    if "좁은화면" in t:
        return "07_모바일"
    if "실제화면" in t or "실물화면" in t:
        return "08_실물화면"
    if t.startswith("FAQ") or "자주묻는" in t:
        return "09_FAQ"
    seen["p"] = seen.get("p", 0) + 1
    return f"05_포인트{seen['p']}"


def shoot(pg, name: str, top: int, bot: int, full: Image.Image, k: int, outdir: Path) -> None:
    top = max(0, top)
    bot = min(full.height // k, bot)
    if bot - top < 60:
        return
    full.crop((0, top * k, full.width, bot * k)).save(outdir / f"{name}.jpg", quality=88)


def run(slugs: list[str]) -> None:
    rows = {r["slug"]: r for r in premium()}
    root = out_root()
    check_path = root / "_점검.json"
    check = json.loads(check_path.read_text(encoding="utf-8")) if check_path.exists() else {}
    with sync_playwright() as p:
        b = p.chromium.launch()
        for slug in slugs:
            r = rows.get(slug)
            if not r:
                print("프리미엄 아님:", slug)
                continue
            brand = None
            ctx = b.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
            pg = ctx.new_page()
            pg.goto(f"{BASE}/samples/{slug}", wait_until="networkidle", timeout=120000)
            pg.wait_for_timeout(2000)
            doc = pg.evaluate("document.documentElement.scrollHeight")
            for y in range(0, doc, 700):
                pg.evaluate(f"scrollTo(0,{y})")
                pg.wait_for_timeout(90)
            pg.evaluate("scrollTo(0,0)")
            pg.wait_for_timeout(800)
            secs = pg.evaluate(SEC_JS)
            brand = pg.evaluate("(document.querySelector('main h1')||{}).innerText || ''").strip()
            outdir = root / f"{r['code']}_{brand or slug}"
            outdir.mkdir(parents=True, exist_ok=True)
            shot = outdir / "00_전체_PC.jpg"
            pg.screenshot(path=str(shot), full_page=True, scale="css")
            pg.screenshot(path=str(outdir / "_full2x.png"), full_page=True)
            full = Image.open(outdir / "_full2x.png").convert("RGB")
            seen: dict = {}
            heads = []
            names = []
            for i, s in enumerate(secs):
                nm = label(s["head"], seen)
                heads.append(s["head"])
                if nm is None:
                    continue
                names.append(nm)
                shoot(pg, nm, s["y"] - PAD, s["y"] + s["h"] + PAD, full, 2, outdir)
            # 첫 화면 = 제목 섹션부터 히어로 사진 끝까지 (제목이 없는 앞 섹션 둘)
            if len(secs) >= 2:
                # 사이트 내비·빵부스러기는 빼고 "PREMIUM DESIGN" 라벨 줄부터
                lab = pg.evaluate("""()=>{for(const e of document.querySelectorAll('main *')){
                  const t=(e.textContent||'').trim();
                  if(t.startsWith('PREMIUM DESIGN')&&e.children.length===0)
                    return Math.round(e.getBoundingClientRect().top+scrollY)}
                  return null}""")
                top = (lab - 22) if lab else secs[0]["y"]
                shoot(pg, "01_첫화면", top, secs[1]["y"] + secs[1]["h"], full, 2, outdir)
                names.append("01_첫화면")
            (outdir / "_full2x.png").unlink(missing_ok=True)
            ctx.close()
            # 모바일 전체
            mc = b.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=2,
                               is_mobile=True, has_touch=True)
            mp = mc.new_page()
            mp.goto(f"{BASE}/samples/{slug}", wait_until="networkidle", timeout=120000)
            mp.wait_for_timeout(1500)
            mdoc = mp.evaluate("document.documentElement.scrollHeight")
            for y in range(0, mdoc, 600):
                mp.evaluate(f"scrollTo(0,{y})")
                mp.wait_for_timeout(80)
            mp.evaluate("scrollTo(0,0)")
            mp.wait_for_timeout(600)
            mp.screenshot(path=str(outdir / "00_전체_모바일.jpg"), full_page=True, scale="css")
            mc.close()
            check[slug] = {"code": r["code"], "slug": slug, "h1": brand, "h2": heads}
            print(f"{r['code']} {brand or slug} — {len(names)}장")
        b.close()
    check_path.write_text(json.dumps(check, ensure_ascii=False, indent=1), encoding="utf-8")


def main() -> None:
    args = sys.argv[1:]
    if not args or args[0] == "--missing":
        have = {unicodedata.normalize("NFC", d.name).split("_")[0]
                for d in out_root().iterdir() if d.is_dir()}
        targets = [r["slug"] for r in premium() if r["code"] not in have]
        print("캡처 없는 프리미엄", len(targets), "종")
    else:
        targets = args
    run(targets)


if __name__ == "__main__":
    main()
