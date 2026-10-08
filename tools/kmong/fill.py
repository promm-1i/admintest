"""크몽 포트폴리오 등록 — 제목·카테고리·이미지·설명까지 채운다. 등록 버튼은 누르지 않는다.

  python fill.py VETP-1001          코드 하나
  python fill.py --list             채울 수 있는 코드 목록

제목 규칙: 50자 이내, 특수문자는 : + - # / . ( ) 만. 가운뎃점(·)이 들어가면 '다음'이 막힌다.
"""
import re
import sys
import unicodedata
from pathlib import Path

from playwright.sync_api import sync_playwright

REPO = Path(__file__).resolve().parents[2]
CDP = "http://localhost:9223"
NEW = "https://kmong.com/seller/portfolios/new"
CAT1, CAT2 = "IT·프로그래밍", "홈페이지 신규 제작"
DESC_MAX = 500

# 대표/상세 '추가' 버튼에 표를 붙인다 — DOM 순서가 화면 순서와 달라 nth 로는 못 고른다
TAG_JS = """()=>{const out={};
 for(const h of document.querySelectorAll('h3')){
   const t=(h.textContent||'').trim();
   const key = t.startsWith('대표 이미지') ? 'cover' : t.startsWith('상세 이미지') ? 'detail' : null;
   if(!key)continue;
   for(let n=h,i=0;n&&i<8;n=n.parentElement,i++){
     const b=[...n.querySelectorAll('button')].filter(x=>(x.innerText||'').trim()==='추가');
     if(b.length===1){ b[0].setAttribute('data-pick',key); out[key]=1; break }
   }
 }
 return out}"""

COUNT_JS = """()=>{const o={};
 for(const h of document.querySelectorAll('h3')){
   const t=(h.textContent||'').trim();
   const m=t.match(/\\((\\d+)\\/(\\d+)\\)/);
   if(!m)continue;
   if(t.startsWith('대표 이미지'))o.cover=+m[1];
   if(t.startsWith('상세 이미지'))o.detail=+m[1];
 }
 return o}"""


def clean_title(t: str) -> str:
    t = t.replace("·", "/").replace("—", "-").replace("~", "-").replace(",", "")
    t = re.sub(r"[^0-9A-Za-z가-힣ㄱ-ㅎㅏ-ㅣ\s:+\-#/.()]", "", t)
    return re.sub(r"\s+", " ", t).strip()[:50]


def out_root() -> Path:
    dev = next((p for p in (Path.home() / "Desktop").iterdir()
                if unicodedata.normalize("NFC", p.name) == "개발"), None)
    return (dev or Path.home() / "Desktop" / "개발") / "크몽_업로드"


def premium_by_code() -> dict:
    src = (REPO / "src" / "lib" / "samples.ts").read_text(encoding="utf-8")
    rows = {}
    for b in src.split("    slug: ")[1:]:
        head = b.split("\n  },")[0]
        if "premium: true" not in head:
            continue
        g = lambda k: (re.search(k + r': "([^"]+)"', head) or [None, ""])[1]
        feats = re.findall(r'"([^"]{4,})"', (re.search(r"features: \[(.*?)\]", head, re.S) or ["", ""])[1])
        rows[g("designCode")] = {
            "slug": b.split('"')[1], "title": g("title"), "industry": g("industry"),
            "purpose": g("purpose"), "features": feats, "idealFor": g("idealFor"),
        }
    return rows


def describe(r: dict) -> str:
    """상세 설명 500자 — 가격·주소 없이, 화면에 있는 기능만."""
    parts = [f"{r['industry']} 시안입니다. 실제 납품 건이 아니라 업종 콘셉트로 만든 디자인입니다.", ""]
    for f in r["features"][:4]:
        parts.append(f"· {f}")
    if r["idealFor"]:
        parts += ["", f"이런 곳에 맞습니다: {r['idealFor']}"]
    out = "\n".join(parts)
    if len(out) > DESC_MAX:
        out = out[:DESC_MAX - 1].rsplit("\n", 1)[0]
    return out


def close_dialog(pg, names=("닫기", "확인", "취소", "다음에 하기")) -> None:
    for _ in range(3):
        dlg = pg.locator("[role=dialog]").first
        if not dlg.count() or not dlg.is_visible():
            return
        for nm in names:
            btn = dlg.get_by_role("button", name=nm)
            if btn.count() and btn.first.is_visible():
                btn.first.click()
                pg.wait_for_timeout(800)
                break
        else:
            pg.keyboard.press("Escape")
            pg.wait_for_timeout(800)


def pick_option(pg, button_name: str, option: str) -> bool:
    b = pg.get_by_role("button", name=button_name)
    if not b.count():
        return False
    b.first.click()
    pg.wait_for_timeout(900)
    for sel in ("[role=listbox]", "[role=dialog]", "[role=menu]", "ul"):
        box = pg.locator(sel).filter(has_text=option).first
        if box.count() and box.is_visible():
            box.get_by_text(option, exact=True).first.click()
            pg.wait_for_timeout(900)
            return True
    opt = pg.get_by_text(option, exact=True)
    for i in range(opt.count()):
        if opt.nth(i).is_visible():
            opt.nth(i).click()
            pg.wait_for_timeout(900)
            return True
    return False


def upload(pg, kind: str, path: Path, crop: bool) -> bool:
    pg.evaluate(TAG_JS)
    btn = pg.locator(f"button[data-pick={kind}]").first
    if not btn.count():
        print("   '추가' 버튼 못 찾음:", kind)
        return False
    before = pg.evaluate(COUNT_JS).get(kind, 0)
    with pg.expect_file_chooser(timeout=20000) as fc:
        btn.click()
    fc.value.set_files(str(path))
    pg.wait_for_timeout(2500)
    if crop:   # 대표 이미지는 자르기 창이 뜬다
        dlg = pg.locator("[role=dialog]").first
        if dlg.count() and dlg.is_visible():
            for nm in ("추가하기", "등록", "확인", "적용", "완료", "저장"):
                b2 = dlg.get_by_role("button", name=nm)
                if b2.count() and b2.first.is_visible() and b2.first.is_enabled():
                    b2.first.click()
                    break
            pg.wait_for_timeout(2500)
    for _ in range(20):
        if pg.evaluate(COUNT_JS).get(kind, 0) > before:
            return True
        pg.wait_for_timeout(500)
    return False


def run(code: str) -> None:
    rows = premium_by_code()
    r = rows.get(code)
    if not r:
        print("모르는 코드:", code)
        return
    d = next((p for p in out_root().iterdir()
              if p.is_dir() and unicodedata.normalize("NFC", p.name).startswith(code + "_")), None)
    if d is None:
        print("이미지 폴더 없음:", code)
        return
    cover = d / "00_대표_1x1.png"
    dets = sorted(d.glob("*_상세.png"))
    title = clean_title(r["title"])
    print(f"{code} {unicodedata.normalize('NFC', d.name)}")
    print(f"  제목: {title} ({len(title)}자)")
    print(f"  사진: 대표 {cover.exists()} · 상세 {len(dets)}장")

    with sync_playwright() as p:
        b = p.chromium.connect_over_cdp(CDP)
        pg = [x for x in b.contexts[0].pages if "about:blank" not in x.url][-1]
        pg.goto(NEW, wait_until="domcontentloaded", timeout=60000)
        pg.wait_for_timeout(2500)
        close_dialog(pg)

        t = pg.locator("input[placeholder*='제목']").first
        t.click()
        t.fill(title)
        pg.wait_for_timeout(500)
        print("  1차:", pick_option(pg, "1차 카테고리", CAT1), "· 2차:", pick_option(pg, "2차 카테고리", CAT2))
        pg.get_by_role("button", name="다음").first.click()
        pg.wait_for_timeout(3500)
        if "이미지 등록" not in pg.evaluate("document.body.innerText"):
            print("  2단계로 못 넘어감 — 제목 특수문자나 카테고리를 확인하세요")
            return

        print("  대표:", upload(pg, "cover", cover, crop=True))
        ok = 0
        for f in dets:        # 한 장씩 — 한꺼번에 던지면 끝난 순서대로 꽂혀 뒤섞인다
            if upload(pg, "detail", f, crop=False):
                ok += 1
            else:
                print("   상세 실패:", f.name)
                break
        print(f"  상세: {ok}/{len(dets)}장")
        print("  남은 칸(업종·설명·고객사·키워드)은 화면 보고 이어서 채웁니다.")
        print("  등록 버튼은 누르지 않았습니다.")


if __name__ == "__main__":
    if "--list" in sys.argv:
        for p in sorted(out_root().iterdir()):
            if p.is_dir():
                print(" ", unicodedata.normalize("NFC", p.name))
    else:
        run(sys.argv[1])
