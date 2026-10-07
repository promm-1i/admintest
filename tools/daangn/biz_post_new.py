# -*- coding: utf-8 -*-
"""새 프리미엄 5곳을 당근 비즈니스 소식(작업 사례)으로 채운다. 올리기는 biz_publish.py.

  python biz_post_new.py <키>        한 건 채우기
사진은 카페용 캡처(Desktop\\개발\\카페_캡처_늘리기\\<코드>_<이름>\\)의 앞 10장.
옛 biz_post.py 는 프리미엄_상세페이지_캡처의 01·04·05·07 을 쓰는데, 새 템플릿은
그 폴더에 첫화면·모바일밖에 없어서 카페용 벌을 그대로 쓴다.
"""
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

CAP = Path.home() / "Desktop" / "개발" / "카페_캡처_늘리기"
NEW = "https://bizprofile.daangn.com/biz_accounts/4030544/manager/posts/new/"

POSTS = {
    "dodam": ("HOSP-1007_도담키움의원", "영유아검진은 차수별로 나눠 놓는 게 낫습니다", """소아청소년과·성장클리닉 홈페이지입니다.

강점 다섯 줄에 마우스를 올리면 옆 그림에서 그 칸이 켜지고, 원내 사진은 4초마다 저절로 넘어갑니다. 영유아검진은 차수별로 받을 항목을 나눠 뒀고 성조숙증·저신장, 아동발달센터는 쪽을 따로 뒀습니다.

위 주소에서 전체 구성을 보실 수 있습니다. 맞춤형 홈페이지 제작은 채팅으로 편하게 문의해 주세요."""),

    "baro": ("HOSP-1009_바로정형외과", "자가진단 15문항을 홈페이지에 넣어 봤습니다", """정형외과 홈페이지입니다.

자가테스트는 15문항에 답하면 결과가 나오고, 아픈 부위를 고르면 거기 맞는 치료만 보입니다. 도수·재활 클리닉과 비수술 치료는 쪽을 나눴고 의료진은 사진을 누르면 약력이 뜹니다.

위 주소에 전체 구성이 올라가 있습니다. 병원 홈페이지도 상담 가능합니다."""),

    "iro": ("HOSP-1006_이로한의원", "침·추나·한약까지 여섯 갈래로 나눈 치료 안내", """한의원 홈페이지입니다.

침·약침, 추나, 맞춤 한약, 공진단·경옥고, 부항·뜸, 한방 다이어트 여섯 가지를 치료마다 사진과 설명을 붙여 정리했습니다. 환자 후기와 예약·상담은 쪽을 따로 뒀습니다.

위 주소에서 실제 화면을 확인해 보세요. 업종에 맞춘 프리미엄 홈페이지는 150만원부터 상담해 드립니다."""),

    "bodeum": ("CARP-1001_보듬케어", "등급이랑 본인부담금을 화면에서 바로 계산하게", """방문요양·시니어케어 센터 홈페이지입니다.

요양등급 자가진단은 묻는 말에 답하면 예상 등급이 나오고, 본인부담금은 등급과 시간을 넣으면 계산됩니다. 복지용구는 품목별로 정리했고 서비스 사례와 센터 소개도 쪽으로 뒀습니다.

위 주소에서 전체 구성을 보실 수 있습니다. 요양·돌봄 쪽 홈페이지도 상담 가능합니다."""),

    "solva": ("BICP-1001_솔바", "한 화면에서 세 대까지 비교됩니다", """자전거 브랜드 홈페이지입니다.

비교하기에 세 대까지 올려 제원을 나란히 보고, 색상별 사진이 따로 있습니다. 대리점 찾기는 지도에서 지역으로 거르고 라이딩 챌린지와 하이라이트 쪽도 들어가 있습니다.

위 주소에 실제 페이지가 있습니다. 브랜드 홈페이지 제작은 채팅으로 문의해 주세요."""),

    # --- 2026-10-08 ---
    "osolgil": ("RESP-1002_오솔길피자", "눌러 보면 토핑이 하나씩 떨어집니다", """피자 프랜차이즈 본사 홈페이지입니다.

첫 화면 가게 위의 CLICK 을 누르면 반죽에 토핑이 하나씩 내려앉아 피자가 완성됩니다. 메뉴 칸은 나무판 위 피자가 5초마다 돌면서 바뀌고, 브랜드 스토리로 들어서면 화면이 잠깐 멈춘 채 배달 스쿠터가 길을 올라갑니다.

메뉴는 여섯 분류 아홉 쪽이고, 메뉴마다 영양 성분표와 알레르기 표시를 붙인 상세 쪽이 따로 있습니다. 매장 찾기는 지역 지도와 시/군/구로 66곳을 거릅니다. 가맹 안내·비용 및 절차·가맹 문의·인테리어 네 쪽까지 모두 88쪽입니다.

위 주소에서 전체 구성을 보실 수 있습니다. 맞춤형 홈페이지 제작은 채팅으로 편하게 문의해 주세요."""),

    "seon": ("CORP-1005_세온기계", "이송거리를 넣으면 맞는 기계만 남습니다", """공작기계 제조기업 시안입니다.

첫 화면은 전체 화면 영상에 썸네일 두 장을 얹어 두고, 썸네일을 누르면 영상과 자리를 바꿉니다. 그 아래 Origin 장면은 화면 다섯 개 높이를 내리는 동안 큰 글자가 옆으로 빠지고 사진 판이 작아집니다. 제품 목록은 시리즈와 이송거리로 걸러 찾고, 제품 상세는 특징·영상·사양·문의·관련 제품을 탭으로 나눠 뒀습니다. 사업소는 지역 검색과 지도로 봅니다. 회사소개 7, 제품 6, 미디어 3, 고객지원 5 쪽까지 모두 23쪽입니다.

위 주소에 실제 화면이 올라가 있습니다. 기계·설비 쪽 홈페이지는 채팅으로 문의해 주세요."""),

    "atelier": ("ARTP-1001_노베릭", "설명을 줄이고 사진만으로 끌고 간 다섯 쪽", """작가·아티스트 포트폴리오입니다.

흰 바탕에 작가 이름만 크게 두고, 그 아래로 설치 사진과 디테일 컷, 작품을 크고 작게 섞어 흘려보냅니다. 캡션은 작게 붙였고 꾸미는 요소는 넣지 않았습니다.

작품 쪽은 38점을 크기가 다른 격자에 늘어놓고, 누르면 큰 화면에서 제목·연도·크기를 보며 넘어갑니다. 전시 쪽은 개인전·콜라보레이션·아트페어·상설 설치를 사진 카드로 나눴고, 작가 노트는 국문 다음에 영문이 이어집니다.

위 주소에서 다섯 쪽을 다 보실 수 있습니다. 작가·공방 홈페이지도 상담해 드립니다."""),

    "onchae": ("ESTP-1003_온채", "금액은 회원에게만 열어 뒀습니다", """고급 주택을 다루는 중개법인 홈페이지로 만들었습니다.

매물 사진과 조건은 누구나 보고, 금액과 도면은 회원 승인 뒤에 열립니다. 첫 화면에는 저녁 무렵 집 사진이 천천히 바뀌는 배너 위에 실적 숫자 셋과 지역·형태·거래·평형 검색을 얹었습니다. 아래로 추천 매물, 금액을 가리는 이유와 가입 세 단계, 분양 라인업, 담당 중개사, 의뢰 종류가 이어집니다. 의뢰하기는 종류마다 다른 신청서를 받습니다. 매물 찾기·매물 상세까지 네 쪽입니다.

위 주소에서 네 쪽을 보실 수 있습니다. 회원제나 비공개 매물처럼 조건이 붙는 홈페이지도 만들어 드립니다."""),

    "seoheon": ("LAWP-1001_법무법인 서헌", "업무사례 160건을 분야 탭과 검색으로 찾습니다", """건설·부동산과 금융·증권범죄를 전담으로 내세운 법무법인입니다.

짙은 녹색 판이 위로 걷히며 로고 선이 한 획씩 그려지고, 그다음 첫 화면은 영상 위에 통합검색 창을 얹었습니다. 업무분야 10개는 탭을 눌러 넘깁니다.

업무사례는 160건을 분야 탭 11개와 검색, 쪽 번호로 찾습니다. 상세 쪽은 왼쪽에 사건개요·쟁점·대응 전략·결과, 오른쪽에 관련 분야·판결문·담당 변호사를 두고 판결문은 눌러서 크게 봅니다.

업무분야 10쪽은 분야마다 짜임이 다릅니다. 건설·부동산에는 업무사례 넘김과 언론보도·칼럼을, 금융·증권범죄에는 결정문 넘김과 전문 분야 증서를 넣었습니다.

통합검색은 메뉴·구성원·업무사례·언론보도·칼럼을 한 번에 찾아 구역별 건수까지 보여 줍니다. 모두 28쪽입니다.

위 주소에서 전체 구성을 확인하실 수 있습니다. 프리미엄 홈페이지는 150만원부터 상담해 드립니다."""),
}


def photo_count(pg) -> int:
    loc = pg.locator("text=/^\\d+\\/10$/")
    return int(loc.first.inner_text().split("/")[0]) if loc.count() else -1


def close_dialogs(pg) -> None:
    for _ in range(6):
        if pg.evaluate("document.querySelectorAll('[class*=seed-dialog__backdrop]').length") == 0:
            return
        done = False
        for name in ("새로 쓰기", "닫기", "확인"):
            btn = pg.get_by_role("button", name=name)
            if btn.count():
                try:
                    btn.first.click(timeout=3000)
                    done = True
                    break
                except Exception:
                    pass
        if not done:
            try:
                pg.keyboard.press("Escape")
            except Exception:
                pass
        pg.wait_for_timeout(700)


def main() -> None:
    key = sys.argv[1]
    folder, title, body = POSTS[key]
    files = sorted((CAP / folder).glob("*.jpg"))[:10]
    text = "https://noveriq.co.kr/%s/\n\n%s" % (key, body)

    with sync_playwright() as p:
        b = p.chromium.connect_over_cdp("http://localhost:9222")
        pg = b.contexts[0].pages[-1]
        pg.goto(NEW, wait_until="domcontentloaded", timeout=90000)
        pg.wait_for_timeout(3500)
        close_dialogs(pg)

        pg.get_by_text("작업 사례", exact=True).first.click()
        pg.wait_for_timeout(700)

        pg.locator("button.css-mw5fyl").first.click()
        pg.wait_for_timeout(1200)
        with pg.expect_file_chooser(timeout=15000) as fc:
            pg.get_by_text("내 앨범에서 선택", exact=True).first.click()
        fc.value.set_files([str(f) for f in files])
        for _ in range(40):
            pg.wait_for_timeout(700)
            if photo_count(pg) >= len(files):
                break
        print("사진:", photo_count(pg), "/10 —", ", ".join(f.name for f in files))

        t = pg.locator("input[placeholder='소식 제목']").first
        t.click()
        t.fill(title)
        print("제목:", title)

        ed = pg.locator("[contenteditable=true]").first
        ed.click()
        for bi, block in enumerate(text.split("\n\n")):
            if bi:
                pg.keyboard.press("Enter")
            for li, line in enumerate(block.split("\n")):
                if li:
                    pg.keyboard.press("Shift+Enter")
                pg.keyboard.insert_text(line)
        print("본문:", len(text), "자 — 등록은 biz_publish.py")


main()
