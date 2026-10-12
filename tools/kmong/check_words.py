"""새 탭에서 등록 2단계까지만 열어 설명 칸 금지어를 검사한다. 제출은 안 한다.
인자: 코드들(설명 전체 검사) 다음에 -- 뒤로 낱말 후보."""
import io
import sys

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
sys.path.insert(0, r"C:\web-project\mintcl-netlify-spa\tools\kmong")
import fill as F  # noqa: E402
import run_all as R  # noqa: E402
from playwright.sync_api import sync_playwright  # noqa: E402

argv = sys.argv[1:]
codes = argv[:argv.index("--")] if "--" in argv else argv
words = argv[argv.index("--") + 1:] if "--" in argv else []
rows = F.premium_by_code()
with sync_playwright() as p:
    b = p.chromium.connect_over_cdp(R.CDP)
    pg = b.contexts[0].new_page()
    pg.on("dialog", R._dismiss)
    pg.goto(F.NEW, wait_until="domcontentloaded", timeout=60000)
    pg.wait_for_timeout(2500)
    F.close_dialog(pg)
    t = pg.locator("input[placeholder*='제목']").first
    t.click()
    t.fill("검사용 홈페이지")
    F.pick_option(pg, "1차 카테고리", F.CAT1)
    F.pick_option(pg, "2차 카테고리", F.CAT2)
    pg.get_by_role("button", name="다음").first.click()
    pg.wait_for_timeout(3500)
    ta = pg.locator("textarea").first

    def bad(text: str) -> bool:
        ta.fill(text)
        pg.wait_for_timeout(450)
        return "제한된 단어" in pg.evaluate("document.body.innerText")

    for c in codes:
        d = F.describe(rows[c])
        if not bad(d):
            print(c, "통과")
            continue
        hits = []
        for line in d.split("\n"):
            for w in line.replace("·", "\n").replace(",", "\n").replace(":", "\n").split("\n"):
                w = w.strip()
                if w and bad("홈페이지 시안입니다. " + w):
                    hits.append(w)
        print(c, "걸림:", hits)
    for w in words:
        print("걸림" if bad("홈페이지 시안입니다. " + w) else "통과", "|", w)
    pg.close()
