"""크몽 창을 띄워 놓고 살려 둔다. 다른 스크립트가 CDP 9223 으로 붙어서 조작한다.
로그인은 사람이 한다 — 비밀번호·인증번호는 스크립트가 넣지 않는다."""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

PROFILE = Path.home() / ".kmong" / "profile"
PROFILE.mkdir(parents=True, exist_ok=True)
url = sys.argv[1] if len(sys.argv) > 1 else "https://kmong.com/"

with sync_playwright() as p:
    ctx = p.chromium.launch_persistent_context(
        str(PROFILE), headless=False, viewport=None, no_viewport=True,
        args=["--remote-debugging-port=9223",
              "--disable-blink-features=AutomationControlled",
              "--window-size=1400,950"])
    pg = ctx.pages[0] if ctx.pages else ctx.new_page()
    pg.goto(url, wait_until="domcontentloaded")
    print("열림:", url, flush=True)
    print("로그인이 안 돼 있으면 이 창에서 직접 하세요. 세션은", PROFILE, "에 남습니다.", flush=True)
    try:
        while True:
            pg.wait_for_timeout(5000)
    except Exception as e:
        print("창 닫힘:", type(e).__name__)
