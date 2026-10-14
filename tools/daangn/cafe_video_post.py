# -*- coding: utf-8 -*-
"""카페 ✨ 포트폴리오에 동영상 글을 쓴다 — 동영상 → 본문 → 사진 순서 (2026-10-12 사용자 지시).

  python cafe_video_post.py <글 폴더>          채우기만 하고 화면을 찍는다(등록 안 누름)
  python cafe_video_post.py <글 폴더> --post   채운 뒤 등록까지 — 사용자가 그 글을 확인한 뒤에만
  --no-pics                                 사진 없이(광고 영상 글)

<글 폴더> = ref-sites/_cafe_video/<코드>_<이름>/
  post.txt   첫 줄 제목, '===' 줄 뒤가 본문(한 줄에 한 문장, 주제 바뀔 때만 빈 줄)
  video.mp4  세로 영상(noveriq-video TemplateFilm)
사진은 Desktop\\개발\\카페_캡처_늘리기\\<코드>_<이름>\\ 의 순서 그대로 한 장씩(한꺼번에 던지면 뒤섞인다).
하루에 한 글. serve.py 로 띄운 창(CDP 9222)에 붙는다.
"""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

CAP = Path.home() / "Desktop" / "개발" / "카페_캡처_늘리기"
OUT = Path.home() / ".daangn" / "out"
NEW = "https://cafe.daangn.com/hompeiji-jejags/posts/new"
BOARD = "✨ 포트폴리오"
TITLE_MAX = 30


def read_post(folder: Path):
    raw = (folder / "post.txt").read_text(encoding="utf-8")
    title, body = raw.split("\n===\n", 1)
    title, body = title.strip(), body.strip()
    assert len(title) <= TITLE_MAX, "제목이 %d자" % len(title)
    return title, body


def type_body(pg, text):
    for bi, block in enumerate(text.split("\n\n")):
        if bi:
            pg.keyboard.press("Enter")
        for li, line in enumerate(block.split("\n")):
            if li:
                pg.keyboard.press("Shift+Enter")
            pg.keyboard.insert_text(line)


def count(pg, sel):
    return pg.evaluate("(s)=>document.querySelectorAll(s).length", sel)


def main():
    folder = Path(sys.argv[1])
    post = "--post" in sys.argv
    title, body = read_post(folder)
    video = folder / "video.mp4"
    nopics = "--no-pics" in sys.argv          # 광고 영상 글은 동영상 + 본문만(10-14)
    pics = [] if nopics else sorted((CAP / folder.name).glob("*.jpg"))
    assert video.exists(), video
    assert nopics or 1 <= len(pics) <= 20, len(pics)
    OUT.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        ctx = p.chromium.connect_over_cdp("http://localhost:9222").contexts[0]
        pg = ctx.pages[0] if ctx.pages else ctx.new_page()
        pg.set_viewport_size({"width": 1280, "height": 900})
        pg.goto(NEW, wait_until="domcontentloaded", timeout=90000)
        pg.wait_for_selector(".ProseMirror", timeout=30000)
        pg.wait_for_timeout(2500)

        box = pg.locator("[role=listbox]")
        if not box.is_visible():
            # 2026-10-12 게시판 고르는 단추가 seed-select combobox 로 바뀌었다(옛 button.flex… 는 못 찾아 30초 멈춤)
            trig = pg.locator("button[role=combobox][aria-haspopup=listbox]")
            (trig if trig.count() else pg.locator("button.flex.items-center.justify-between")).first.click()
            box.wait_for(state="visible", timeout=10000)
        box.get_by_text(BOARD, exact=True).first.click()
        pg.wait_for_timeout(700)

        t = pg.locator("input[placeholder='제목을 입력해주세요.']").first
        t.click()
        t.fill(title)

        # 1) 동영상 — 빈 편집기 맨 앞에 넣는다
        pg.locator(".ProseMirror").first.click()
        pg.locator("input[type=file][accept*='video']").first.set_input_files(str(video), timeout=180000)  # 28MB 를 CDP 로 넘기니 30초를 넘겼다(10-12)
        for _ in range(600):                       # 업로드·처리 최대 5분
            pg.wait_for_timeout(500)
            # 편집기 안 동영상 칸 = .video-container, 썸네일 img 에 업로드 상태·길이가 붙는다.
            # 길이가 0 이면 브라우저가 H.264 를 못 푼 것(serve.py --chrome 으로 띄울 것)
            st = pg.evaluate("""()=>{const i=document.querySelector('.ProseMirror .video-container img.video-thumbnail');
                return i?[i.dataset.uploadStatus, +i.dataset.duration]:null}""")
            if st and st[0] == "completed":
                print("동영상 올라감, 길이", st[1])
                if not st[1]:
                    print("길이 0 — 썸네일이 검게 나온다, Chrome 으로 띄웠는지 볼 것")
                    return 1
                break
        else:
            print("동영상이 편집기에 안 들어옴")
            pg.screenshot(path=str(OUT / "video_fail.png"), full_page=True)
            return 1
        pg.wait_for_timeout(1500)

        # 2) 본문 — 동영상 뒤 끝으로 가서 친다
        pg.locator(".ProseMirror").first.click()
        pg.keyboard.press("Control+End")
        pg.keyboard.press("Enter")
        type_body(pg, body)
        pg.wait_for_timeout(400)

        # 3) 사진 — 한 장씩, 들어간 걸 확인하고 다음 장
        inp = pg.locator("input[type=file][accept*='image']").first
        for k, f in enumerate(pics, 1):
            pg.keyboard.press("Control+End")
            inp.set_input_files(str(f))
            for _ in range(60):
                pg.wait_for_timeout(500)
                if count(pg, ".ProseMirror img:not(.video-thumbnail)") >= k:
                    break
            else:
                print("%d번째 사진이 안 올라감" % k)
                return 1
        n = count(pg, ".ProseMirror img:not(.video-thumbnail)")
        order = pg.evaluate("""()=>[...document.querySelector('.ProseMirror').children]
            .filter(e=>!e.classList.contains('dropzone'))
            .map(e=>e.classList.contains('video-container')?'VIDEO':e.querySelector('img')?'IMG':(e.innerText||'').trim().slice(0,12))""")
        print("사진", n, "/", len(pics))
        print("순서:", order[:6], "…", order[-3:])

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
