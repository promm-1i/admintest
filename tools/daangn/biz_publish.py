"""채워 둔 소식을 올린다. 다음 → 쿠폰 첨부(10만원) → 다음 → 완료.

  python biz_publish.py            쿠폰 붙여서 올림
  python biz_publish.py --nocoupon 쿠폰 없이
"""
import sys
from playwright.sync_api import sync_playwright

COUPON = "--nocoupon" not in sys.argv


def dialog_text(pg) -> str:
    return pg.evaluate("""()=>{const nl=String.fromCharCode(10);
      const e=document.querySelector('[class*=seed-dialog__content]');
      return e?(e.innerText||'').split(nl).filter(s=>s.trim()).join(' | '):''}""")


def publish(pg) -> bool:
    for step in range(6):
        if pg.get_by_role("button", name="완료").count():
            pg.get_by_role("button", name="완료").first.click()
            pg.wait_for_timeout(5000)
            return "postId=" in pg.url
        if pg.get_by_role("button", name="다음").count():
            pg.get_by_role("button", name="다음").first.click()
            pg.wait_for_timeout(3000)
        t = dialog_text(pg)
        if "쿠폰" in t and "첨부할까요" in t:
            pg.get_by_role("button", name="첨부하기" if COUPON else "첨부하지 않기").first.click()
            pg.wait_for_timeout(2500)
            if COUPON:
                pg.get_by_text("100,000원 할인", exact=False).first.click()
                pg.wait_for_timeout(1000)
                pg.get_by_role("button", name="쿠폰 선택 완료").first.click()
                pg.wait_for_timeout(2500)
    return False


with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    pg = b.contexts[0].pages[-1]
    ok = publish(pg)
    print(("올림 · " + pg.url[-40:]) if ok else "못 올림 — 화면 확인 필요")
