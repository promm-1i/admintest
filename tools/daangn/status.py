"""노베릭 사이트와 넷리파이 상태를 같이 본다. 초안 탭은 건드리지 않는다."""
import json
from playwright.sync_api import sync_playwright

SITES = [
    "https://noveriq.co.kr/",
    "https://noveriq.co.kr/templates/corporate-i/",
    "https://mintcl.netlify.app/",
    "https://www.netlify.com/",
]

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    pg = b.contexts[0].new_page()
    for u in SITES:
        for attempt in range(2):
            try:
                r = pg.request.get(u, timeout=25000)
                print(f"{r.status}  {u}")
                if r.status >= 400:
                    print("      서버:", r.headers.get("server", "-"),
                          "| x-nf-request-id:", r.headers.get("x-nf-request-id", "-"))
                break
            except Exception as e:
                if attempt:
                    print(f"실패  {u}  {str(e)[:60]}")
                pg.wait_for_timeout(1200)
    print("--- 넷리파이 공식 상태")
    try:
        r = pg.request.get("https://www.netlifystatus.com/api/v2/summary.json", timeout=25000)
        d = json.loads(r.text())
        print("  전체:", d["status"]["description"])
        for c in d.get("components", [])[:12]:
            if c.get("status") != "operational":
                print("   ! ", c["name"], "=", c["status"])
        inc = d.get("incidents", [])
        print("  진행 중 장애:", len(inc))
        for i in inc[:3]:
            print("   -", i.get("name"), "|", i.get("status"), "|", i.get("updated_at"))
    except Exception as e:
        print("  상태 페이지 못 읽음:", str(e)[:70])
    pg.close()
