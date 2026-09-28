"""당근 글쓰기 — 로그인은 사람이, 입력·사진 붙이기는 스크립트가. 올리기 버튼은 누르지 않는다.

  python post.py login  [url]     프로필 창을 띄우고 로그인할 동안 기다린다
  python post.py open   <url>     저장된 세션으로 글쓰기 화면을 연다 (구조 확인용)
"""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

PROFILE = Path.home() / '.daangn' / 'profile'
UA = ("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
      "(KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36")

mode = sys.argv[1] if len(sys.argv) > 1 else "login"
url = sys.argv[2] if len(sys.argv) > 2 else "https://www.daangn.com/"
PROFILE.mkdir(parents=True, exist_ok=True)

with sync_playwright() as p:
    ctx = p.chromium.launch_persistent_context(
        str(PROFILE), headless=False, user_agent=UA,
        viewport={"width": 1360, "height": 900},
        args=["--disable-blink-features=AutomationControlled"])
    pg = ctx.pages[0] if ctx.pages else ctx.new_page()
    pg.goto(url, wait_until="domcontentloaded")
    print("창 열림:", url)
    if mode == "login":
        print("로그인하세요. 다 되면 이 작업을 멈춰 주세요 (세션은 프로필에 남습니다).")
        pg.wait_for_timeout(1000 * 60 * 30)
    else:
        print("제목:", pg.title())
        pg.wait_for_timeout(1000 * 60 * 20)
