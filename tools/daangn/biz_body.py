# -*- coding: utf-8 -*-
"""올라간 비즈 소식의 본문을 POSTS[키] 원고로 다시 쳐 넣는다(제목 · 사진 · 쿠폰은 그대로).

  python biz_body.py <키>          다시 치고 대조한 뒤 맞을 때만 '완료'
  python biz_body.py <키> --dry    다시 치고 대조만 하고 저장하지 않고 닫는다

2026-10-15: 문단 사이에 Enter 를 한 번만 쳐서 빈 줄이 저장되지 않았다(type_body 로 고침).
"""
import sys

from playwright.sync_api import sync_playwright

import biz_photos as P
import biz_post_new as N

EMPTY_P = "<p><br></p>"


def main() -> None:
    key = sys.argv[1]
    dry = "--dry" in sys.argv
    title, body = N.POSTS[key][1], N.POSTS[key][2]
    text = "https://noveriq.co.kr/%s/\n\n%s" % (key, body)
    want_lines = [ln for ln in text.split("\n") if ln.strip()]
    with sync_playwright() as p:
        b = p.chromium.connect_over_cdp("http://localhost:9222")
        pg = b.contexts[0].new_page()
        pg.goto(P.LIST, wait_until="domcontentloaded")
        pg.wait_for_timeout(3500)
        for page in ("2", "3"):
            if pg.get_by_text(title, exact=False).count():
                break
            btn = pg.locator(f"button[aria-label='{page}페이지']")
            if btn.count():
                btn.first.click()
                pg.wait_for_timeout(2500)
        if pg.evaluate(P.OPEN_MENU, title) != "ok":
            sys.exit("목록에서 글을 못 찾음: " + title)
        pg.wait_for_timeout(1200)
        pg.get_by_text("소식 수정", exact=True).first.click()
        pg.wait_for_timeout(5000)
        if pg.locator("input[placeholder='소식 제목']").first.input_value() != title:
            pg.close(run_before_unload=False)
            sys.exit("다른 글이 열림")
        coupon = "100,000원 할인" in pg.evaluate("document.body.innerText")

        ed = pg.locator("[contenteditable=true]").first
        ed.click()
        pg.keyboard.press("Control+a")
        pg.keyboard.press("Delete")
        pg.wait_for_timeout(500)
        N.type_body(pg, text)
        pg.wait_for_timeout(800)

        html = ed.inner_html()
        got_lines = [ln for ln in ed.inner_text().split("\n") if ln.strip()]
        gaps = html.count(EMPTY_P)
        print("글 줄 같음:", got_lines == want_lines, "· 빈 문단", gaps, "/", text.count("\n\n"), "· 쿠폰", coupon)
        if got_lines != want_lines or gaps != text.count("\n\n") or not coupon:
            pg.close(run_before_unload=False)
            sys.exit("대조 실패 — 저장 안 하고 닫음")
        if dry:
            pg.close(run_before_unload=False)
            print("--dry 라 저장 안 하고 닫음")
            return
        pg.get_by_role("button", name="완료").first.click()
        pg.wait_for_timeout(5000)
        ok = "postId=" in pg.url or pg.url.rstrip("/").endswith("/manager/posts")
        print("저장됨" if ok else "저장 확인 필요 — " + pg.url[-50:])


if __name__ == "__main__":
    main()
