"""오류 난 것만 다시, 그리고 목록 쪽 주소도 확인."""
from playwright.sync_api import sync_playwright

RETRY = ["corporate-l", "corporate-m", "corporate-n", "corporate-o"]
OTHER = ["", "samples", "portfolio", "website", "templates"]

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    pg = b.contexts[0].pages[-1]
    for s in RETRY:
        url = f"https://noveriq.co.kr/templates/{s}/"
        for attempt in range(3):
            try:
                r = pg.request.get(url, timeout=25000)
                print(f"{s:14s} {r.status}")
                break
            except Exception as e:
                if attempt == 2:
                    print(f"{s:14s} 실패 {str(e)[:40]}")
                pg.wait_for_timeout(1500)
    print("--- 목록 쪽")
    for path in OTHER:
        url = "https://noveriq.co.kr/" + path
        try:
            r = pg.request.get(url, timeout=25000)
            print(f"/{path:12s} {r.status}")
        except Exception as e:
            print(f"/{path:12s} 실패 {str(e)[:40]}")
