# -*- coding: utf-8 -*-
"""카페 게시판 목록에서 글마다 조회수를 읽는다 — 글을 열지 않아서 조회수가 안 늘어난다 (2026-10-14).

  python cafe_views.py [게시판 이름 일부 …]     (안 주면 전부)

결과: ~/.daangn/out/cafe_views_<날짜>.json  [{board, title, views}]
글 화면을 하나씩 열면 그때마다 내 조회가 1씩 붙는다(10월 글 조회 1~3 은 대부분 내 방문이었다).
목록 칸에 미리보기 줄이 붙은 글은 제목 대신 그 줄이 잡힐 수 있다(조회수는 맞음).
serve.py 로 띄운 창(CDP 9222)에 붙는다.
"""
import json
import re
import sys
import time
from pathlib import Path
from urllib.parse import unquote

from playwright.sync_api import sync_playwright

CAFE = "https://cafe.daangn.com/hompeiji-jejags"
OUT = Path.home() / ".daangn" / "out"
# 목록 한 칸: …게시판 이름 / 제목 / (미리보기) / 조회수 / 좋아요 / 댓글
ITEM = re.compile(r"\n([^\n]+)\n+(\d+)\n좋아요")


def main():
    want = sys.argv[1:]
    rows = []
    with sync_playwright() as p:
        ctx = p.chromium.connect_over_cdp("http://localhost:9222").contexts[0]
        pg = ctx.new_page()
        pg.set_viewport_size({"width": 1280, "height": 900})
        pg.goto(CAFE, wait_until="domcontentloaded")
        pg.wait_for_timeout(4000)
        boards = pg.evaluate("()=>[...new Set([...document.querySelectorAll('a[href*=\"/boards/\"]')].map(a=>a.href))]")
        for b in boards:
            name = unquote(b.rsplit("/", 1)[-1]).rsplit("-", 1)[0].replace("-", " ")
            if want and not any(w in name for w in want):
                continue
            pg.goto(b, wait_until="domcontentloaded")
            pg.wait_for_timeout(3000)
            for _ in range(40):                    # 끝까지 내려 다 펼친다
                n0 = pg.evaluate("()=>document.body.innerText.length")
                pg.mouse.wheel(0, 8000)
                pg.wait_for_timeout(900)
                more = pg.get_by_text("더보기", exact=True)
                if more.count() and more.last.is_visible():
                    try:
                        more.last.click()
                        pg.wait_for_timeout(1200)
                    except Exception:
                        pass
                if pg.evaluate("()=>document.body.innerText.length") == n0:
                    break
            t = pg.evaluate("()=>document.body.innerText")
            got = [(m.group(1).strip(), int(m.group(2))) for m in ITEM.finditer(t)]
            for title, v in got:
                rows.append({"board": name, "title": title, "views": v})
            print(name, len(got))
        pg.close()
    OUT.mkdir(parents=True, exist_ok=True)
    f = OUT / ("cafe_views_%s.json" % time.strftime("%Y%m%d_%H%M"))
    f.write_text(json.dumps(rows, ensure_ascii=False, indent=1), encoding="utf-8")
    print("저장:", f)
    return 0


if __name__ == "__main__":
    sys.exit(main())
