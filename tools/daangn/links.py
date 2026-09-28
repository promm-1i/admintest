"""새 탭을 열고 프리미엄 템플릿 링크가 실제로 열리는지 확인한다."""
import importlib.util
from playwright.sync_api import sync_playwright

spec = importlib.util.spec_from_file_location("m", "tools/promo-cards/make_page_shots.py")
m = importlib.util.module_from_spec(spec)
spec.loader.exec_module(m)

BASE = "https://noveriq.co.kr/templates/"
slugs = list(m.SPECS.keys())

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    ctx = b.contexts[0]
    pg = ctx.new_page()          # 이미 열린 창에 탭 하나 더
    ok, bad = [], []
    for s in slugs:
        url = f"{BASE}{s}/"
        try:
            r = pg.request.get(url, timeout=20000)
            code = r.status
            body = r.text()[:400] if code == 200 else ""
            # SPA 폴백이면 templates 페이지가 아니라 앱 껍데기가 온다
            real = code == 200 and ("<html" in body.lower())
            (ok if real else bad).append((s, code))
            print(f"{s:14s} {code}  {m.SPECS[s]['brand']}")
        except Exception as e:
            bad.append((s, str(e)[:40]))
            print(f"{s:14s} 실패  {str(e)[:50]}")
    print("\n열림", len(ok), "/ 안 열림", len(bad))
    print("안 열린 것:", [x[0] for x in bad])
