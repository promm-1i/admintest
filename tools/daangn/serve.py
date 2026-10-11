"""창을 띄워 놓고 살려 둔다. 다른 스크립트가 CDP 9222 로 붙어서 조작한다."""
import json
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

PROFILE = Path.home() / '.daangn' / 'profile'
PROFILE.mkdir(parents=True, exist_ok=True)

# 비즈프로필 로그인은 만료 없는 세션 쿠키라 프로필에 안 남는다(카페는 남는다).
# 창이 닫힐 때마다 사람이 다시 로그인해야 했으므로 30초마다 받아 두고 띄울 때 넣는다.
# 저장소 밖(~/.daangn)에 둔다 — 이 저장소는 공개다.
COOKIES = Path.home() / '.daangn' / 'cookies.json'


def save_cookies(ctx) -> int:
    try:
        ck = [c for c in ctx.cookies() if "daangn" in c.get("domain", "")]
    except Exception:
        return -1
    if not ck:
        return 0
    tmp = COOKIES.with_suffix(".tmp")
    tmp.write_text(json.dumps(ck, ensure_ascii=False), encoding="utf-8")
    tmp.replace(COOKIES)
    return len(ck)


def load_cookies(ctx) -> None:
    if not COOKIES.exists():
        return
    try:
        ck = json.loads(COOKIES.read_text(encoding="utf-8"))
        ctx.add_cookies(ck)
        print("쿠키 복원:", len(ck), "개", flush=True)
    except Exception as e:
        print("쿠키 복원 실패:", type(e).__name__, flush=True)
url = sys.argv[1] if len(sys.argv) > 1 else "https://cafe.daangn.com/"
with sync_playwright() as p:
    ctx = p.chromium.launch_persistent_context(
        str(PROFILE), headless=False,
        viewport=None, no_viewport=True,
        args=["--remote-debugging-port=9222", "--disable-blink-features=AutomationControlled",
              "--window-size=1400,950"])
    load_cookies(ctx)
    pg = ctx.pages[0] if ctx.pages else ctx.new_page()
    pg.goto(url, wait_until="domcontentloaded")
    print("열림:", url, flush=True)
    try:
        tick = 0
        while True:
            live = [x for x in ctx.pages if not x.is_closed()]
            if not live:
                live = [ctx.new_page()]   # 탭이 닫혀도 창은 살려 둔다(로그인 흐름이 탭을 갈아 치운다)
            try:
                live[0].wait_for_timeout(5000)
            except Exception:
                pass                      # 그 탭만 닫힌 것 — 다음 바퀴에서 다시 잡는다
            tick += 1
            if tick % 6 == 0:             # 30초마다 — 죽임을 당해도 직전 로그인은 남는다
                save_cookies(ctx)
    except Exception as e:
        print("창 닫힘:", type(e).__name__)   # 브라우저가 통째로 닫혔을 때만 끝낸다
