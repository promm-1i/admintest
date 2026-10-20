# 사진 탭에 묶음별로 올린다: python gal_upload.py <폴더> <묶음이름…>  (파일 이름 'NN_<묶음>_…jpg')
# 묶음마다 '전체 N' 이 그 장수만큼 늘었는지 확인하고 안 늘면 멈춘다. 사용자 웨일 새 탭, 끝나면 내 탭만 닫음
import re, sys, time
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8")
from playwright.sync_api import sync_playwright

URL = "https://bizprofile.daangn.com/biz_accounts/4030544/manager/gallery/"
D = Path(sys.argv[1])
groups = sys.argv[2:]


def total(pg):
    m = re.search(r"전체\s*(\d+)", pg.evaluate("document.body.innerText"))
    return int(m.group(1)) if m else -1


with sync_playwright() as p:
    ctx = p.chromium.connect_over_cdp("http://127.0.0.1:9222").contexts[0]
    for old in [t for t in ctx.pages if "/manager/gallery" in t.url]:   # 앞서 내가 열어 둔 사진 탭
        old.close()
    pg = ctx.new_page()
    try:
        pg.goto(URL, wait_until="domcontentloaded", timeout=60000); pg.wait_for_timeout(5000)
        for g in groups:
            files = sorted(D.glob("[0-9][0-9]_%s_*.jpg" % g))
            before = total(pg)
            with pg.expect_file_chooser(timeout=15000) as fc:
                pg.get_by_text("사진 추가").first.click()
            fc.value.set_files([str(f) for f in files])
            t0 = time.time()
            while total(pg) < before + len(files) and time.time() - t0 < 90:
                pg.wait_for_timeout(1500)
            after = total(pg)
            print("%s %d장 | 전체 %d → %d" % (g, len(files), before, after), "OK" if after == before + len(files) else "!! 장수 안 맞음")
            if after != before + len(files):
                break
            pg.wait_for_timeout(2000)
    finally:
        pg.close()
