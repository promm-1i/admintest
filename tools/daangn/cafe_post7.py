# -*- coding: utf-8 -*-
"""카페 ✨ 포트폴리오에 새 프리미엄 7곳을 올린다.

  python cafe_post7.py            전부
  python cafe_post7.py 3          세 번째만
  python cafe_post7.py 1-3        범위
  --dry  등록(글쓰기)을 누르지 않고 채우기까지만

사진은 Desktop\\개발\\카페_캡처_늘리기\\<코드>_<이름>\\ 의 순서 그대로 **한 장씩** 올린다
(한꺼번에 던지면 업로드가 끝난 순서대로 꽂혀 뒤섞인다).
등록 단추 이름은 '글쓰기' 인데 머리글에도 같은 이름이 있어 화면에서 가장 아래 것을 누른다.
"""
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

CAP = Path.home() / "Desktop" / "개발" / "카페_캡처_늘리기"
NEW = "https://cafe.daangn.com/hompeiji-jejags/posts/new"
BOARD = "✨ 포트폴리오"
TAIL = "이렇게 구현하면 이쁩니다."

POSTS = [
    ("HOSP-1007_도담키움의원", "설명이 길어지는 업종은 이렇게 쪼갭니다",
     "소아청소년과·성장클리닉 홈페이지입니다.\n\n들어간 것들\n"
     "· 강점 다섯 줄에 마우스를 올리면 옆 그림에서 그 칸이 켜집니다\n"
     "· 원내 사진은 4초마다 저절로 넘어갑니다\n"
     "· 영유아검진은 차수별로 뭘 받는지 나눠 놨습니다\n"
     "· 성조숙증·저신장, 아동발달센터는 쪽을 따로 뒀습니다"),

    ("HOSP-1009_바로정형외과", "홈페이지에 자가진단 넣으면 이렇게 됩니다",
     "정형외과 홈페이지입니다.\n\n들어간 것들\n"
     "· 자가테스트 15문항 답하면 결과가 나옵니다\n"
     "· 아픈 데를 고르면 거기 맞는 치료만 보여 줍니다\n"
     "· 도수·재활 클리닉, 비수술 치료는 쪽을 나눴습니다\n"
     "· 의료진은 사진 누르면 약력이 뜹니다"),

    ("HOSP-1006_이로한의원", "서비스가 여러 개면 목록부터 정리해야 합니다",
     "한의원 홈페이지입니다.\n\n들어간 것들\n"
     "· 침·약침, 추나, 맞춤 한약, 공진단·경옥고, 부항·뜸, 한방 다이어트 여섯 개\n"
     "· 치료마다 사진이랑 설명이 같이 붙습니다\n"
     "· 환자 후기, 예약·상담은 쪽을 따로 뒀습니다"),

    ("CARP-1001_보듬케어", "금액을 한 줄로 못 적을 때는 어떻게 할까요",
     "방문요양·시니어케어 센터 홈페이지입니다.\n\n들어간 것들\n"
     "· 요양등급 자가진단 — 묻는 말에 답하면 예상 등급이 나옵니다\n"
     "· 본인부담금은 등급이랑 시간 넣으면 계산됩니다\n"
     "· 복지용구는 품목별로 정리해 놨습니다\n"
     "· 서비스 사례랑 센터 소개도 쪽으로 뒀습니다"),

    ("LAUP-1001_보송24", "창업 비용 적는 법, 세 가지로 갈라 봤습니다",
     "무인세탁 프랜차이즈 홈페이지입니다.\n\n들어간 것들\n"
     "· 창업 비용을 세 가지 유형으로 갈라 적었습니다\n"
     "· 전국 매장 수랑 성장 숫자를 먼저 보여 줍니다\n"
     "· 매장 찾기는 지도에서 고릅니다\n"
     "· 창업 문의 폼은 지역·일정까지 받습니다"),

    ("AUTP-1001_할로베일", "제품이 비슷비슷하면 표 하나로 갈립니다",
     "자동차 썬팅 필름 브랜드 홈페이지입니다.\n\n들어간 것들\n"
     "· 제품마다 농도별 성능표가 붙습니다\n"
     "· 시공점은 지도에서 지역 고르면 목록이 바뀝니다\n"
     "· 시공 갤러리랑 블로그도 있습니다\n"
     "· 시공 예약은 차종이랑 날짜까지 받습니다"),

    ("BICP-1001_솔바", "손님이 고르다 나가는 건 비교가 없어서입니다",
     "자전거 브랜드 홈페이지입니다.\n\n들어간 것들\n"
     "· 비교하기에 세 대까지 올려 제원을 봅니다\n"
     "· 색상별 사진이 따로 있습니다\n"
     "· 대리점 찾기는 지도에서 지역으로 거릅니다\n"
     "· 라이딩 챌린지, 하이라이트 쪽도 있습니다"),
]

DRY = '--dry' in sys.argv


def body_of(text):
    return text + "\n\n" + TAIL


def type_body(pg, text):
    ed = pg.locator(".ProseMirror").first
    ed.click()
    pg.wait_for_timeout(300)
    for bi, block in enumerate(text.split("\n\n")):
        if bi:
            pg.keyboard.press("Enter")
        for li, line in enumerate(block.split("\n")):
            if li:
                pg.keyboard.press("Shift+Enter")
            pg.keyboard.insert_text(line)


def one(pg, folder, title, text):
    pics = sorted((CAP / folder).glob("*.jpg"))
    assert 1 <= len(pics) <= 20, len(pics)
    pg.goto(NEW, wait_until="domcontentloaded", timeout=90000)
    pg.wait_for_selector(".ProseMirror", timeout=30000)
    pg.wait_for_timeout(2500)

    box = pg.locator("[role=listbox]")
    if not box.is_visible():
        pg.locator("button.flex.items-center.justify-between").first.click()
        box.wait_for(state="visible", timeout=10000)
    box.get_by_text(BOARD, exact=True).first.click()
    pg.wait_for_timeout(700)

    t = pg.locator("input[placeholder='제목을 입력해주세요.']").first
    t.click()
    t.fill(title)

    type_body(pg, body_of(text))
    pg.wait_for_timeout(400)

    inp = pg.locator("input[type=file][accept*='image']").first
    for k, f in enumerate(pics, 1):
        inp.set_input_files(str(f))
        for _ in range(60):
            pg.wait_for_timeout(500)
            if pg.evaluate("document.querySelectorAll('.ProseMirror img').length") >= k:
                break
        else:
            return False, "%d번째 사진이 안 올라감" % k
    n = pg.evaluate("document.querySelectorAll('.ProseMirror img').length")
    if n != len(pics):
        return False, "사진 %d ≠ %d" % (n, len(pics))
    if DRY:
        return True, "채우기만 (사진 %d장)" % n

    # 등록 — 머리글에도 '글쓰기' 가 있어 화면에서 가장 아래 것
    pg.evaluate("""()=>{const bs=[...document.querySelectorAll('button,a')]
        .filter(e=>(e.innerText||'').trim()==='글쓰기' && e.getBoundingClientRect().width>0);
      bs.sort((a,b)=>a.getBoundingClientRect().top-b.getBoundingClientRect().top);
      bs[bs.length-1].click()}""")
    for _ in range(60):
        pg.wait_for_timeout(500)
        if "/posts/new" not in pg.url:
            break
    else:
        return False, "등록 뒤 화면이 안 바뀜"
    return True, "올림 · 사진 %d장 · %s" % (n, pg.url[-28:])


picks = POSTS
if len(sys.argv) > 1 and sys.argv[1] != '--dry':
    a, _, z = sys.argv[1].partition('-')
    picks = POSTS[int(a) - 1:int(z or a)]

with sync_playwright() as p:
    b = p.chromium.connect_over_cdp("http://localhost:9222")
    ctx = b.contexts[0]
    done = 0
    for i, (folder, title, text) in enumerate(picks, 1):
        pg = ctx.new_page()
        t0 = time.time()
        try:
            ok, msg = one(pg, folder, title, text)
        except Exception as e:
            ok, msg = False, "오류 %s %s" % (type(e).__name__, str(e)[:110])
        finally:
            try:
                pg.close()
            except Exception:
                pass
        done += ok
        print("[%d/%d] %-26s %s %s (%.0fs)" % (i, len(picks), title[:24], "OK" if ok else "!!", msg, time.time() - t0), flush=True)
        if not ok:
            break
        time.sleep(3)
    print("끝 %d/%d" % (done, len(picks)))
