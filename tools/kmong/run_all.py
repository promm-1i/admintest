"""포트폴리오 여러 건을 차례로 채우고 제출한다.

  python run_all.py --list                 올릴 수 있는 코드 보기
  python run_all.py CODE CODE ...          그 코드들만
  python run_all.py --all --limit 10       아직 안 올린 것 중 앞 10건

제출까지 한다. 사용자가 "포스팅해"라고 한 뒤에만 쓴다.
창(serve.py)이 떠 있어야 하고, 한 세션 안에서 돌려 CDP 재접속을 줄인다.
"""
import sys
import time
import unicodedata
from pathlib import Path

from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).parent))
import fill as F  # noqa: E402

# 사진이 자리 그림이라 아직 올리면 안 되는 것 (빛결 HOSP-1008 은 10-08 사진 설치로 풀었다)
SKIP: set[str] = set()
CDP = "http://127.0.0.1:9223"


def _dismiss(d) -> None:
    """경고창을 닫는다. 다른 연결이 먼저 닫았으면 accept 가 터지는데,
    그 예외가 Playwright 드라이버를 통째로 죽인다 — 반드시 삼킨다.
    (진행 상황을 보려고 탭을 따로 띄우면 같은 창을 둘이 닫으려 해서 이 일이 난다)"""
    try:
        d.accept()
    except Exception:
        pass


# 두 번 실패한 코드는 건너뛴다 — 같은 것만 붙들고 돌면 나머지를 못 올린다
FAILS = Path("C:/_tmp/claude/kmong_fails.json")


def bump_fail(code: str) -> int:
    import json
    d = json.loads(FAILS.read_text(encoding="utf-8")) if FAILS.exists() else {}
    d[code] = d.get(code, 0) + 1
    FAILS.write_text(json.dumps(d), encoding="utf-8")
    return d[code]


def fail_count(code: str) -> int:
    import json
    d = json.loads(FAILS.read_text(encoding="utf-8")) if FAILS.exists() else {}
    return d.get(code, 0)


def listed_codes(pg) -> set[str]:
    """이미 올라간 포트폴리오 제목으로 코드를 되짚는다."""
    pg.goto("https://kmong.com/seller/portfolios", wait_until="domcontentloaded", timeout=60000)
    pg.wait_for_timeout(4000)
    # 첫 화면은 20개만 — '총 N개' 만큼 카드(편집하기 단추)가 그려질 때까지 내린다.
    # 길이가 한 번 그대로면 멈추던 때는 로딩이 0.5초보다 느리면 끊겨 48개 중 40개만 셌다(10-12).
    total = pg.evaluate("(()=>{const m=document.body.innerText.match(/총\\s*(\\d+)개/);return m?+m[1]:0})()")
    same, last = 0, -1
    for _ in range(80):
        pg.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        pg.mouse.wheel(0, 1500)
        pg.wait_for_timeout(700)
        n = pg.get_by_role("button", name="편집하기").count()
        if total and n >= total:
            break
        same = same + 1 if n == last else 0
        if same >= 4:
            print(f"  목록이 {n}/{total} 에서 더 안 늘어남", flush=True)
            break
        last = n
    text = "".join(pg.evaluate("document.body.innerText").split())
    out = set()
    for code, r in F.premium_by_code().items():
        # 띄어쓰기가 달라도('작가 / 아티스트' ↔ '작가/아티스트') 같은 글로 본다
        if "".join(F.clean_title(r["title"]).split())[:22] in text:
            out.add(code)
    return out


def fill_one(pg, code: str) -> bool:
    """fill.run 과 같은 내용을 한 페이지 위에서 수행한다."""
    rows = F.premium_by_code()
    r = rows.get(code)
    d = next((p for p in F.out_root().iterdir()
              if p.is_dir() and unicodedata.normalize("NFC", p.name).startswith(code + "_")), None)
    if not r or d is None:
        print("  건너뜀 — 자료 없음")
        return False
    cover = d / "00_대표_1x1.png"
    dets = sorted(d.glob("*_상세.png"))
    if not cover.exists() or not dets:
        print("  건너뜀 — 이미지 없음")
        return False

    pg.goto(F.NEW, wait_until="domcontentloaded", timeout=60000)
    pg.wait_for_timeout(2500)
    F.close_dialog(pg)
    title = F.clean_title(r["title"])
    t = pg.locator("input[placeholder*='제목']").first
    t.click()
    t.fill(title)
    pg.wait_for_timeout(400)
    F.pick_option(pg, "1차 카테고리", F.CAT1)
    F.pick_option(pg, "2차 카테고리", F.CAT2)
    pg.get_by_role("button", name="다음").first.click()
    pg.wait_for_timeout(3500)
    if "이미지 등록" not in pg.evaluate("document.body.innerText"):
        print("  2단계 진입 실패 (제목:", title, ")")
        return False

    if not F.upload(pg, "cover", cover, crop=True):
        print("  대표 올리기 실패")
        return False
    ok = sum(1 for f in dets if F.upload(pg, "detail", f, crop=False))
    ind = F.industry_of(code)
    F.pick_select(pg, "업종을 선택해 주세요", ind)
    desc = F.describe(r)
    ta = pg.locator("textarea").first
    ta.click()
    ta.fill(desc)
    lab = pg.get_by_text("비공개", exact=True).first   # 체크박스를 직접 누르면 안 먹는다(10-12)
    lab.scroll_into_view_if_needed()
    if not pg.evaluate("""()=>{const l=[...document.querySelectorAll('label,span,p,div')]
        .find(e=>e.children.length<=2&&(e.innerText||'').trim()==='비공개');
        const c=l&&(l.closest('label')||l.parentElement).querySelector('input[type=checkbox]');
        return !!(c&&c.checked)}"""):
        lab.click()
        pg.wait_for_timeout(400)
    kw = pg.locator("input[placeholder*='키워드']").first
    for w in F.KEYWORDS:
        kw.click()
        kw.fill(w)
        kw.press("Enter")
        pg.wait_for_timeout(350)
    for lab, wants in F.MULTI.items():
        F.pick_multi(pg, lab, wants)
    fx = F.FACTS.get(code, {})
    if fx.get("start"):
        m0 = F.set_month(pg, 0, fx["start"])
        m1 = F.set_month(pg, 1, fx["end"] or fx["start"])
        if not (m0 and m1):
            print(f"  작업 기간 못 넣음 (시작 {m0} · 끝 {m1}) — 선택 칸이라 그대로 진행")
    print(f"  제목 {title[:30]} · 업종 {ind} · 상세 {ok}/{len(dets)} · 기간 {fx.get('start')}~{fx.get('end')}")
    return True


def submit(pg) -> bool:
    pg.keyboard.press("Escape")
    pg.wait_for_timeout(400)
    pg.get_by_role("button", name="다음").first.click()
    pg.wait_for_timeout(3500)
    agree = pg.locator("input[type=checkbox]").first
    if agree.count() and not agree.is_checked():
        pg.get_by_text("안내 사항을 확인했고 동의합니다", exact=False).first.click()
        pg.wait_for_timeout(500)
    # 노출할 서비스 카드(가격 '원~' 이 붙은 카드). 내 서비스는 하나 — 기존 글은 전부 '1개의 서비스에 노출중'.
    btn = pg.get_by_role("button", name="제출하기").first
    if btn.count() and not btn.is_enabled():
        card = pg.locator("text=/원~$/").first
        if card.count():
            card.click()
            pg.wait_for_timeout(700)
    btn = pg.get_by_role("button", name="제출하기").first
    if not btn.count() or not btn.is_enabled():
        print("  제출 단추가 안 열림")
        return False
    btn.click()
    pg.wait_for_timeout(6000)
    return True


def main() -> None:
    argv = sys.argv[1:]
    limit = 999
    if "--limit" in argv:
        i = argv.index("--limit")
        limit = int(argv[i + 1])
        del argv[i:i + 2]          # 숫자가 코드 필터로 잡히면 대상이 0개가 된다
    args = [a for a in argv if not a.startswith("--")]
    codes = [unicodedata.normalize("NFC", p.name).split("_")[0]
             for p in sorted(F.out_root().iterdir()) if p.is_dir()]
    codes = [c for c in codes if c not in SKIP and fail_count(c) < 2]
    if args:
        codes = [c for c in codes if c in args]
    with sync_playwright() as p:
        b = p.chromium.connect_over_cdp(CDP)
        pg = [x for x in b.contexts[0].pages if "about:blank" not in x.url][-1]
        # 경고창(confirm/alert)을 직접 받지 않으면 Playwright 드라이버가 통째로 죽는다.
        # 2026-10-08 배치가 5번째에서 이것 때문에 멈췄다.
        pg.on("dialog", _dismiss)
        done = listed_codes(pg)
        todo = [c for c in codes if c not in done][:limit]
        print(f"이미 올라간 것 {len(done)}개 · 이번에 올릴 것 {len(todo)}개")
        if "--list" in sys.argv:
            print(todo)
            return
        okc = 0
        for i, code in enumerate(todo, 1):
            print(f"\n[{i}/{len(todo)}] {code}", flush=True)
            try:
                if fill_one(pg, code) and submit(pg):
                    time.sleep(2)
                    if code in listed_codes(pg):
                        okc += 1
                        print("  올라감 확인", flush=True)
                    else:
                        n = bump_fail(code)
                        print(f"  제출은 눌렀는데 목록에 없음({n}번째)", flush=True)
            except Exception as e:
                n = bump_fail(code)
                print(f"  실패({n}번째):", str(e)[:80], flush=True)
            time.sleep(3)
        print(f"\n끝 — {okc}/{len(todo)}건 제출")


if __name__ == "__main__":
    main()
