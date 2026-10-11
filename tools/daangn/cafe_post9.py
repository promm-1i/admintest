# -*- coding: utf-8 -*-
"""카페 ✨ 포트폴리오에 10-07 뒤에 만든 프리미엄 9곳을 올린다.

  python cafe_post9.py            전부
  python cafe_post9.py 3          세 번째만
  python cafe_post9.py 1-3        범위
  --dry  등록(글쓰기)을 누르지 않고 채우기까지만

cafe_post7.py 와 다른 점(2026-10-11 사용자 지시):
  · 본문을 '들어간 것들 + 점 목록' 이 아니라 **비즈 소식 본문 틀**로 쓴다.
  · **한 줄에 한 문장**, 주제 바뀔 때만 빈 줄.
  · 마무리 '이렇게 구현하면 이쁩니다' 를 **넣지 않는다**. 설명 끝나는 자리에서 끝낸다.
  · 주소·가격 라인·문의 유도는 카페 금지라 애초에 안 쓴다.
제목은 '홈페이지' 가 들어가고 맨 앞이 업종이 아니어야 한다(조회수 · 10-08 지적).

사진은 Desktop\\개발\\카페_캡처_늘리기\\<코드>_<이름>\\ 순서 그대로 **한 장씩**.
등록 단추 이름은 '글쓰기' 인데 머리글에도 같아 화면에서 가장 아래 것을 누른다.
"""
import sys
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

CAP = Path.home() / "Desktop" / "개발" / "카페_캡처_늘리기"
NEW = "https://cafe.daangn.com/hompeiji-jejags/posts/new"
BOARD = "✨ 포트폴리오"
TITLE_MAX = 30

POSTS = [
    ("DENP-1002_아름결치과의원", "치료 사례를 모형 사진으로 찍어 올린 홈페이지",
     """치과 홈페이지입니다.

첫 화면은 와이드 사진 세 장이 저절로 바뀝니다.
내려가면 진료 분야 네 가지와 진료 원칙, 영상 칸이 이어집니다.
치료 사례는 교육용 치아 모형으로 찍어 올렸습니다.

전문 지식과 알아두기는 탭으로 나눴습니다.
해외 환자 안내와 진료 시간도 메인에 뒀습니다.
전체 메뉴와 빠른 메뉴는 열고 닫습니다.

서브는 치과 이야기와 공간, 의료진 약력, 심미 레진·재치료·수면치료·일반진료를 각각 긴 설명 쪽으로 짰습니다.
아티클과 공지, 치료 사례 목록, 통합 검색까지 모두 24쪽입니다."""),

    ("BEAP-1002_벨리안에스테틱", "관리 분야가 다섯이면 홈페이지를 어떻게 나눌까요",
     """에스테틱 홈페이지 시안입니다.

첫 화면은 사진 세 장이 3초마다 바뀝니다.
관리 분야 다섯 가지는 카드로 넘겨 봅니다.
넓은 화면에서는 전체 메뉴가 가로로 펼쳐지고, 모바일에서는 단추를 눌러 세로로 봅니다.

관리 상세는 추천 대상과 관리 과정을 같은 흐름으로 담았습니다.
얼굴 7쪽, 웨딩 4쪽, 산전산후 3쪽, 바디 4쪽, 릴랙스 2쪽으로 나눴습니다.

지점 네 곳 상세와 후기·사진 후기·관리 기록·아카데미 게시판, 전체 프로그램 표까지 모두 54쪽입니다."""),

    ("HOSP-1008_빛결안과", "출구부터 걸어오는 길을 홈페이지에 그렸습니다",
     """안과 홈페이지로 만들었습니다.

첫 화면은 일곱 장이 넘어가고, 아래 쪽 표시의 둘레 원이 차오르며 다음 장을 알립니다.
멈춤과 재생 단추도 있습니다.

내려가면 연혁과 수술 건수 숫자 사이로 캡슐 모양 사진이 떠오릅니다.
네 장의 카드가 한 장의 큰 사진으로 펼쳐지며 병원 소개 글이 얹힙니다.
시력교정·라섹·노안백내장·눈 종합검진 네 갈래는 배경색과 큰 영문 글자가 함께 바뀌며 흐릅니다.

약도는 지하철 출구부터 걸어오는 길을 그려 넣었습니다.
오른쪽에는 빠른 메뉴가 늘 떠 있습니다.

시력교정 15쪽, 노안·백내장 7쪽, 눈 질환 10쪽까지 모두 59쪽입니다."""),

    ("HOSP-1010_이음영상의학센터", "홈페이지 알림창을 끌어서 옮길 수 있게 했습니다",
     """영상의학센터 포트폴리오입니다.

첫 화면은 천천히 겹쳐 바뀌고 그 위에 진료 예약 상자를 얹었습니다.
알림창 두 개는 끌어서 옮기고 '오늘 열지 않기'로 닫습니다.

진료과목은 영상진단과 영상시술 두 탭으로 나눴습니다.
증상 탭을 누르면 사진이 가운데서 펼쳐집니다.
인터벤션은 케모포트·PICC·배액관·위루관 네 가지를 탭으로 바꿔 보고, 탭마다 시술 영상이 붙습니다.

비급여 항목은 네 탭의 표로 보여 줍니다.
영상진단 클리닉 5쪽, 영상시술 클리닉 8쪽까지 모두 42쪽입니다."""),

    ("HOSP-1011_온연피부과의원", "장비 상표는 홈페이지에 안 썼습니다",
     """피부과 시안입니다.

진료 항목은 장비 상표 대신 고강도 집속 초음파, 고주파, 복합 에너지처럼 일반 명칭으로 적었습니다.

첫 화면에는 큰 사진과 예약 입력 상자를 나란히 뒀습니다.
피부 고민별 진료 항목, 의료진 소개, 숫자로 보는 진료 원칙, 소식 카드가 이어집니다.
첫 화면 알림창과 전체 메뉴, 진료 항목 탭, 카드 넘김은 모바일에서도 같이 움직입니다.

리프팅 9쪽, 피부 톤·보습·볼륨 관리 7쪽으로 나눴습니다.
별도 라운지는 같은 브랜드 안에서 다른 분위기로 이어집니다.
모두 45쪽입니다."""),

    ("VETP-1002_온율담동물의료센터", "원내를 어디까지 홈페이지에 보여 줄까요",
     """24시간 동물의료센터 홈페이지입니다.

원내 안내는 대기실부터 수술실까지 여덟 탭으로 나눠 넣었습니다.

처음 열면 병원 이름을 알리는 인트로와 정사각 행사 팝업 두 장이 뜹니다.
첫 화면은 5초마다 한 장씩 바뀝니다.
특화진료는 정형외과·신경외과·치과·영상진단·심장과 신장·중환자·최소침습·재활·재생치료 아홉 분야입니다.

의료진 열 명의 약력은 창으로 열립니다.
서브는 어두운 사진 머리와 세로 빠른 메뉴를 공통으로 쓰고 본문은 과마다 다릅니다.
특화진료 상세 아홉 쪽까지 모두 19쪽입니다."""),

    ("RENP-1003_카르세나", "홈페이지에서 구독·리스·구매를 표로 비교합니다",
     """수입차 구독 서비스 홈페이지 열세 쪽입니다.

차량 상세에서 기간별 구독료를 고르고, 구독·장기리스·직접 구매를 표로 비교합니다.

첫 화면은 넓은 배너 아래에 월 구독, 차량 목록, 출시 예정, 고객센터 바로가기를 뒀습니다.
제조사별 탐색 띠와 차량 카드가 이어집니다.
입고 예정 화면은 다음에 들어올 차량과 공개 일정을 보여 줍니다.

이용 절차와 자주 묻는 질문, 공지사항, 회원 화면이 같은 체계로 묶여 있습니다."""),

    ("RESP-1004_로우멜커피", "홈페이지 메뉴 카드를 누르면 원재료가 나옵니다",
     """커피 프랜차이즈 본사 홈페이지입니다.

메뉴 카드를 누르면 원재료와 알레르기 안내가 열립니다.
메뉴는 일반 매장과 소형 매장 두 갈래로 나눴습니다.

메인은 한 화면씩 넘어갑니다.
첫 화면에는 행사 알림 세 장과 브랜드 갈래를 뒀습니다.
매장 찾기는 정적 지도와 지역 검색, 대표 매장 상세 두 쪽으로 짰습니다.

창업 쪽에는 절차와 예상 비용, 인테리어, 자주 묻는 질문을 넣었습니다.
모두 35쪽입니다."""),

    ("RESP-1005_담온각", "건물마다 쪽을 따로 둔 한옥 홈페이지입니다",
     """한옥에서 다이닝과 모임을 같이 하는 곳으로 짰습니다.

첫 화면은 한옥 전경과 문화 프로그램으로 엽니다.
건물과 마당은 사진을 크게 놓고 공간마다 쪽을 따로 뒀습니다.

다이닝은 한식당과 카페를 나누고, 룸·코스·단품 차림을 세부 쪽으로 이었습니다.
야외 웨딩, 한옥 웨딩, 전통 혼례, 연회 안내에는 행사 형태와 공간 규모, 갤러리를 담았습니다.

소식·행사·갤러리·자주 묻는 질문과 오시는 길까지 모두 39쪽입니다."""),
]

DRY = '--dry' in sys.argv


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

    type_body(pg, text)
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


for folder, title, _t in POSTS:               # 올리기 전에 기계로 보는 것
    assert len(title) <= TITLE_MAX, "제목 %d자: %s" % (len(title), title)
    assert "홈페이지" in title, "제목에 '홈페이지' 없음: " + title
    assert (CAP / folder).is_dir(), "캡처 폴더 없음: " + folder

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
