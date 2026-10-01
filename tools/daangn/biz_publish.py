"""채워 둔 소식을 올린다. 다음 → 쿠폰 첨부(10만원) → 다음 → 완료.

  python biz_publish.py            쿠폰 붙여서 올림
  python biz_publish.py --nocoupon 쿠폰 없이
"""
import sys
from playwright.sync_api import sync_playwright

COUPON = "--nocoupon" not in sys.argv


HIDE_FLOATING = """()=>{let n=0;
  for(const e of document.querySelectorAll('button,div,iframe')){
    const st=getComputedStyle(e);
    if(st.position!=='fixed') continue;
    const r=e.getBoundingClientRect();
    if(r.width<30||r.width>120||r.height<30||r.height>120) continue;
    if(r.bottom < window.innerHeight-260) continue;   // 화면 아래쪽에 떠 있는 것만
    e.style.setProperty('display','none','important'); n++}
  return n}"""


def hide_floating(pg) -> None:
    """창이 좁아지면 떠 있는 채팅 버튼이 '다음'·'완료' 위에 올라앉아 클릭을 먹는다."""
    try:
        n = pg.evaluate(HIDE_FLOATING)
        if n:
            print(f"  (떠 있는 버튼 {n}개 숨김)")
    except Exception:
        pass


def dialog_text(pg) -> str:
    return pg.evaluate("""()=>{const nl=String.fromCharCode(10);
      const e=document.querySelector('[class*=seed-dialog__content]');
      return e?(e.innerText||'').split(nl).filter(s=>s.trim()).join(' | '):''}""")


def publish(pg) -> bool:
    for step in range(6):
        hide_floating(pg)
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
