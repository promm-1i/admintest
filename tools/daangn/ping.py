"""1분 동안 여러 번 찍어 실패율을 본다. 한 번 200 떴다고 괜찮다고 할 수 없어서."""
import time
from playwright.sync_api import sync_playwright

TARGETS = ["https://noveriq.co.kr/", "https://mintcl.netlify.app/"]
N = 12

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    pg = b.contexts[0].new_page()
    for url in TARGETS:
        codes, times, errs = [], [], 0
        for i in range(N):
            t0 = time.time()
            try:
                r = pg.request.get(url, timeout=20000)
                codes.append(r.status)
                times.append(time.time() - t0)
            except Exception as e:
                errs += 1
                codes.append(str(e)[:24])
            pg.wait_for_timeout(1500)
        ok = sum(1 for c in codes if c == 200)
        print(f"{url}")
        print(f"   200 {ok}/{N} · 실패 {errs} · 응답 {codes}")
        if times:
            print(f"   걸린 시간 평균 {sum(times) / len(times):.2f}초 · 최대 {max(times):.2f}초")
    # 진짜 페이지 로드도 한 번
    try:
        t0 = time.time()
        resp = pg.goto("https://noveriq.co.kr/", wait_until="load", timeout=45000)
        print(f"브라우저 로드: {resp.status if resp else '?'} · {time.time() - t0:.1f}초 · 제목 {pg.title()[:40]}")
    except Exception as e:
        print("브라우저 로드 실패:", str(e)[:90])
    pg.close()
