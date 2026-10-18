# -*- coding: utf-8 -*-
"""카페에 사진 → 본문 순서로 글을 쓴다 — 포트폴리오가 아닌 일반 글(동네 이슈 · 사장님 얘기)용 (2026-10-14).

  python cafe_text_post.py <글 폴더> [--board 그냥얘기]          채우기만 하고 화면을 찍는다(등록 안 누름)
  python cafe_text_post.py <글 폴더> [--board 그냥얘기] --post   채운 뒤 등록까지 — 사용자가 그 글을 확인한 뒤에만

<글 폴더>
  post.txt   첫 줄 제목, '===' 줄 뒤가 본문(한 줄에 한 문장, 주제 바뀔 때만 빈 줄)
  *.jpg      맨 위에 이름 순서대로 한 장씩(없어도 됨)
serve.py 로 띄운 창(CDP 9222)에 붙는다.
"""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

from cafe_video_post import NEW, OUT, read_post, type_body, count


def main():
    folder = Path(sys.argv[1])
    post = "--post" in sys.argv
    board = sys.argv[sys.argv.index("--board") + 1] if "--board" in sys.argv else "그냥얘기"
    title, body = read_post(folder)
    pics = sorted(folder.glob("*.jpg"))
    assert len(pics) <= 20, len(pics)
    OUT.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        ctx = p.chromium.connect_over_cdp("http://localhost:9222").contexts[0]
        pg = ctx.new_page()   # 2026-10-18 사용자 웨일에 붙는다 — 사용자 탭은 건드리지 않고 새 탭에서
        pg.set_viewport_size({"width": 1280, "height": 900})
        pg.goto(NEW, wait_until="domcontentloaded", timeout=90000)
        pg.wait_for_selector(".ProseMirror", timeout=30000)
        pg.wait_for_timeout(2500)

        box = pg.locator("[role=listbox]")
        if not box.is_visible():
            pg.locator("button[role=combobox][aria-haspopup=listbox]").first.click()
            box.wait_for(state="visible", timeout=10000)
        box.get_by_text(board, exact=True).first.click()
        pg.wait_for_timeout(700)

        t = pg.locator("input[placeholder='제목을 입력해주세요.']").first
        t.click()
        t.fill(title)

        # 1) 사진 — 한 장씩, 들어간 걸 확인하고 다음 장
        pg.locator(".ProseMirror").first.click()
        inp = pg.locator("input[type=file][accept*='image']").first
        for k, f in enumerate(pics, 1):
            pg.keyboard.press("Control+End")
            inp.set_input_files(str(f))
            for _ in range(60):
                pg.wait_for_timeout(500)
                if count(pg, ".ProseMirror img") >= k:
                    break
            else:
                print("%d번째 사진이 안 올라감" % k)
                return 1
        pg.wait_for_timeout(800)

        # 2) 본문 — 사진 뒤 끝으로 가서 친다
        pg.locator(".ProseMirror").first.click()
        pg.keyboard.press("Control+End")
        if pics:
            pg.keyboard.press("Enter")
        type_body(pg, body)
        pg.wait_for_timeout(400)

        order = pg.evaluate("""()=>[...document.querySelector('.ProseMirror').children]
            .filter(e=>!e.classList.contains('dropzone'))
            .map(e=>e.querySelector('img')?'IMG':(e.innerText||'').trim().slice(0,12))""")
        print("게시판:", board, "| 사진", count(pg, ".ProseMirror img"), "/", len(pics))
        print("순서:", order[:4], "…", order[-2:])
        shot = OUT / ("%s_fill.png" % folder.name)
        pg.locator(".ProseMirror").first.screenshot(path=str(shot))
        print("화면:", shot)

        if not post:
            print("채우기만 했음 — 등록 안 누름")
            return 0
        pg.evaluate("""()=>{const bs=[...document.querySelectorAll('button,a')]
            .filter(e=>(e.innerText||'').trim()==='글쓰기' && e.getBoundingClientRect().width>0);
            bs.sort((a,b)=>b.getBoundingClientRect().top-a.getBoundingClientRect().top); bs[0].click()}""")
        pg.wait_for_timeout(6000)
        print("등록 뒤 주소:", pg.url)
        return 0


if __name__ == "__main__":
    sys.exit(main())
