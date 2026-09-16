"""프리미엄 디자인 홍보 이미지 — 크몽 10장 · 블로그 20장 · 당근 비즈니스 소식 10장 · 당근 카페 20장.

휴대폰에서 읽혀야 하므로 화면 전체를 줄여 넣지 않고, 보여 줄 부분만 잘라(2배 해상도) 크게 넣는다.
문구는 화면에 실제로 보이는 사실을 쉬운 말로. 비유 · 영어 라벨 · "~로 짓는" 같은 말투 금지.

  python tools/promo-cards/make_shot_cards.py estate-g --capture   # 장면 찍기 (PROMO_SERVER, 기본 5173)
  python tools/promo-cards/make_shot_cards.py estate-g             # 카드 만들기

크몽판은 가격 · 주소 없음(마지막 장 진행 과정), 당근판은 가격만, 블로그판은 가격 · 주소.
"""
import os
import sys
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).parent))
from make_cards import (  # noqa: E402
    KMONG_MAIN_CSS, LIGHT_BG, OUT_ROOT, W, H, esc, foot, kmong_main_square, lines, page, process_card, render,
)

SERVER = os.environ.get("PROMO_SERVER", "http://localhost:5173") + "/templates/"

# 장면 참조: "x-이름"(찍어 둔 잘린 컷) 또는 "pc-index-12" 같은 휠 프레임, 뒤에 "@x,y,w,h" 를 붙이면 그 부분만 자른다.
# 카드: (작은 제목, 큰 제목, [장면...]) — 장면은 1~2장, 원칙 판처럼 사진만 있는 건 4장까지.
SPECS: dict[str, dict] = {
    "corporate-f": {
        "code": "CORP-1001",
        "brand": "하온디앤씨",
        "industry": "건설 · 개발 회사",
        "accent": "rgb(0,122,104)",
        "slug": "corporate-f-template",
        "hook": ("스크롤할 때마다 장면이 바뀌는", "건설회사 홈페이지"),
        "kmong_hook": ("스크롤하면 장면이 바뀌는", "건설회사 홈페이지"),
        "pages": ["index", "about", "history", "business", "residential", "news", "careers"],
        "mobile_pages": ["index"],
        "extras": [{"name": "menu", "page": "index", "hover": "#gnb li:nth-child(2) a"}],
        "cover": "pc-index-00",
        "grid_title": "메인과 회사 소개 · 연혁 · 사업 · 주거 · 소식 · 채용\n모두 7개 페이지예요",
        "mobile_title": "휴대폰에서도\n같은 장면으로 넘어가요",
        "cta_line": "우리 회사 홈페이지로",
        "grid": [
            ("메인", "pc-index-00"), ("CEO 인사말", "pc-about-01"), ("주요 연혁", "pc-history-04"),
            ("사업 개요", "pc-business-02"), ("주거 개발", "pc-residential-06"), ("회사 소식", "pc-news-01"),
            ("채용 안내", "pc-careers-01"),
        ],
        "phones": [("첫 화면", "m-index-00"), ("사업 소개", "m-index-20"), ("품질 · 안전", "m-index-31")],
        "blog": [
            ("메인", "첫 화면은 건물 사진 한 장을\n화면 가득 채워요", ["pc-index-00"]),
            ("메인 메뉴", "메뉴에 마우스를 올리면\n하위 메뉴 21개가 한 번에 펼쳐져요", ["x-menu@310,20,400,212"]),
            ("회사 소개", "스크롤을 내리면\n사진과 설명이 하나씩 바뀌어요", ["pc-index-03", "pc-index-06@0,0,1440,640"]),
            ("사업 소개", "사업 세 가지가\n스크롤에 맞춰 차례로 나와요", ["pc-index-12@0,0,1440,700", "pc-index-18@0,200,1440,700"]),
            ("사업 소개", "카드를 누르면\n그 사업 설명으로 바로 넘어가요", ["pc-index-15"]),
            ("시공 실적", "완공한 건물은 사진 카드로 보여주고\n화살표로 넘겨 봐요", ["pc-index-22@20,30,700,630"]),
            ("품질 · 안전", "현장 사진 위에\n품질 · 안전 이야기를 올렸어요", ["pc-index-26"]),
            ("CEO 인사말", "대표 인사말과 서명이\n들어가는 페이지예요", ["pc-about-01@300,40,840,640"]),
            ("주요 연혁", "연도별 연혁이고,\n위쪽 탭이 스크롤을 따라 바뀌어요", ["pc-history-04@60,0,1000,720"]),
            ("사업 개요", "회사가 지키는 원칙 4가지를\n사진과 함께 한 장씩 보여줘요", ["pc-business-01", "pc-business-02", "pc-business-03", "pc-business-04"]),
            ("사업 개요", "공동주택 · 업무시설 · 물류시설 같은\n사업 분야를 사진으로 정리했어요", ["pc-business-07@40,0,1200,560"]),
            ("주거 개발", "주거 사업은 실제 생활 모습\n사진으로 설명해요", ["pc-residential-02"]),
            ("주거 개발", "대표 단지 한 곳은\n사진을 크게 보여줘요", ["pc-residential-06@0,0,1440,780"]),
            ("주거 개발", "전체 실적은 사진 목록으로 보고\n이름으로 검색할 수 있어요", ["pc-residential-08@50,40,820,470"]),
            ("회사 소식", "회사 소식도 사진 카드로 올리고\n제목으로 검색돼요", ["pc-news-01@60,170,800,430"]),
            ("채용 안내", "신입 · 경력 채용 절차와\n자주 묻는 질문을 한 페이지에 담았어요", ["pc-careers-02@60,140,1100,340", "pc-careers-03@160,50,1000,570"]),
        ],
        "kmong": [
            ("메인 메뉴", "메뉴에 마우스를 올리면\n하위 메뉴 21개가 한 번에 펼쳐져요", ["x-menu@310,20,400,212"]),
            ("사업 소개", "사업 세 가지가\n스크롤에 맞춰 차례로 나와요", ["pc-index-12@0,0,1440,700", "pc-index-18@0,200,1440,700"]),
            ("시공 실적", "완공한 건물은 사진 카드로 보여주고\n화살표로 넘겨 봐요", ["pc-index-22@20,30,700,630"]),
            ("CEO 인사말 · 연혁", "대표 인사말과\n연도별 연혁 페이지예요", ["pc-about-01@0,0,1440,700", "pc-history-04@0,0,1440,700"]),
            ("사업 개요", "회사가 지키는 원칙 4가지를\n사진과 함께 한 장씩 보여줘요", ["pc-business-01", "pc-business-02", "pc-business-03", "pc-business-04"]),
            ("주거 개발", "대표 단지는 크게,\n전체 실적은 사진 목록으로 보여줘요", ["pc-residential-06@0,0,1440,780", "pc-residential-08@50,40,1200,460"]),
        ],
    },
    "corporate-i": {"code": "CORP-1004", "brand": "누빛광학", "industry": "정밀 광학기업", "accent": "rgb(106,76,240)", "slug": "corporate-i-template", "pages": ["index"], "mobile_pages": [], "extras": []},
    "corporate-j": {"code": "CORP-1005", "brand": "세온기계", "industry": "공작기계 제조기업", "accent": "rgb(0,60,120)", "slug": "corporate-j-template", "pages": ["index", "overview", "history", "business", "lineup", "list", "detail", "software", "automation", "as", "network", "news", "recruit"], "mobile_pages": [], "extras": []},
    "corporate-k": {"code": "CORP-1006", "brand": "누리웰", "industry": "건강기능식품 기업", "accent": "rgb(0,120,80)", "slug": "corporate-k-template", "pages": ["index"], "mobile_pages": [], "extras": []},
    "wedding-a": {"code": "WEDP-1001", "brand": "서울바우", "industry": "웨딩 컨시어지", "accent": "rgb(120,90,60)", "slug": "wedding-a-template", "pages": ["index"], "mobile_pages": [], "extras": []},
    "corporate-h": {  # 메인 휠 프레임만 찍는다 (make_page_shots 의 index_frames 용)
        "code": "CORP-1003", "brand": "하이온셀", "industry": "배터리 제조기업", "accent": "rgb(0,80,180)", "slug": "corporate-h-template",
        "pages": ["index"], "mobile_pages": [], "extras": [],
    },
    "corporate-g": {
        "code": "CORP-1002",
        "brand": "한벡스금속",
        "industry": "특수강 주조 제조기업",
        "accent": "rgb(168,58,30)",
        "slug": "corporate-g-template",
        "pages": ["index", "history", "technology", "process", "certificate", "product-pump", "equipment", "news", "inquiry"],
        "mobile_pages": ["index"],
        "extras": [
            {"name": "menu", "page": "index", "hover": ".gnb > ul > li:nth-child(2) > a"},
            {"name": "mmenu", "page": "index", "mode": "m", "clicks": [".burger"]},
        ],
        # 템플릿이 어두운 공장 사진 + 녹슨 주황이라 미색 대신 따뜻한 돌색 · 숯색을 번갈아 쓴다
        "bg": "#ece6df",
        "bg_dark": "#1d1a17",
        "cover": "pc-index-00",
        "hook": ("스크롤하면 공정이 한 장씩 넘어가는", "제조기업 홈페이지"),
        "kmong_hook": ("공정이 한 장씩 넘어가는", "제조기업 홈페이지"),
        "chip_pages": "메뉴 페이지 15개",
        "grid_title": "메인과 메뉴 페이지 15개 중\n자주 보는 9개를 모았어요",
        "mobile_title": "휴대폰에서도\n공정 장면이 그대로 넘어가요",
        "cta_line": "우리 공장 홈페이지로",
        "grid": [
            ("메인", "pc-index-00"), ("공정 소개", "pc-index-15"), ("제품 소개", "pc-index-42"),
            ("회사개요", "pc-history-00"), ("핵심기술", "pc-technology-08"), ("생산공정", "pc-process-06"),
            ("인증서 현황", "pc-certificate-04"), ("일반 펌프부품", "pc-product-pump-04"), ("회사소식", "pc-news-04"),
        ],
        "phones": [("공정 소개", "m-index-04"), ("회사 숫자", "m-index-06"), ("제품", "m-index-11")],
        "blog": [
            ("메인", "쇳물 붓는 사진이\n첫 화면을 꽉 채워요", ["pc-index-00@790,120,640,800"], "overlay"),
            ("", "메뉴에 마우스를 올리면\n하위 메뉴 15개가 한 번에 펼쳐져요", ["x-menu@400,20,600,380"], "center:dark"),
            ("메인", "스크롤을 내리면 가운데 문구가\n한 줄씩 밝아져요", ["pc-index-05@160,220,1120,380", "pc-index-07@160,220,1120,380"], "bottom"),
            ("공정 소개", "해석 · 용해 · 모래 관리 · 측정 · 열처리\n다섯 공정이 스크롤에 맞춰 넘어가요", ["pc-index-12@0,120,1440,700", "pc-index-30@0,120,1440,700"], "top:dark"),
            ("용해 공정 장면", "", ["pc-index-15"], "photo:dark"),
            ("", "창립 연도 · 연간 수출 중량 · 고합금강 비중이\n화면에 들어오면 숫자가 올라가요", ["pc-index-37@0,180,1440,560"], "right:dark"),
            ("제품 소개", "펌프 · 밸브 · 기계 부품\n4가지를 사진 카드로 보여줘요", ["pc-index-42@30,110,1380,560"], "top"),
            ("", "정밀 · 파트너십 · 안전 · 도전\n회사가 지키는 가치를 사진으로 넘겨 봐요", ["pc-index-50"], "bottom:dark"),
            ("거래처", "거래처 로고 12개를\n한 판에 모았어요", ["pc-index-56@0,60,1440,560"], "bottom:dark"),
            ("회사개요", "1994년부터 2026년까지\n연혁이 연도별로 이어져요", ["pc-history-09@100,0,1000,900"], "right"),
            ("핵심기술", "핵심기술 5가지는\n사진과 설명을 엇갈려 놓았어요", ["pc-technology-08"], "center"),
            ("생산공정", "도면 검토부터 제품 검사까지 8단계,\n누르면 사진과 설명이 바뀌어요", ["pc-process-06"], "top"),
            ("인증서 현황", "", ["pc-certificate-03@0,170,1440,700"], "photo"),
            ("일반 펌프부품", "Casing · Impeller 탭으로\n제품을 골라 볼 수 있어요", ["pc-product-pump-05"], "bottom"),
            ("회사소식", "회사 소식은 NEWS · NOTICE로\n나눠서 사진 카드로 올려요", ["pc-news-05"], "right"),
            ("견적문의", "담당자 · 회사 · 연락처 · 문의 내용에\n파일까지 한 번에 받아요", ["pc-inquiry-05"], "center"),
        ],
        "kmong": [
            ("", "해석 · 용해 · 모래 관리 · 측정 · 열처리\n다섯 공정이 스크롤에 맞춰 넘어가요", ["pc-index-12@0,120,1440,700", "pc-index-30@0,120,1440,700"], "top:dark"),
            ("제품 소개", "펌프 · 밸브 · 기계 부품\n4가지를 사진 카드로 보여줘요", ["pc-index-42@30,110,1380,560"], "bottom"),
            ("", "정밀 · 파트너십 · 안전 · 도전\n회사가 지키는 가치를 사진으로 넘겨 봐요", ["pc-index-50"], "bottom:dark"),
            ("회사개요", "1994년부터 2026년까지\n연혁이 연도별로 이어져요", ["pc-history-09@100,0,1000,900"], "right"),
            ("생산공정", "도면 검토부터 제품 검사까지 8단계,\n누르면 사진과 설명이 바뀌어요", ["pc-process-06"], "center:dark"),
            ("일반 펌프부품", "Casing · Impeller 탭으로\n제품을 골라 볼 수 있어요", ["pc-product-pump-05"], "top"),
        ],
    },
    "estate-g": {
        "code": "ESTP-1003",
        "brand": "온채",
        "industry": "회원제 부동산 중개법인",
        "accent": "rgb(41,69,70)",
        "slug": "estate-g-template",
        "pages": ["index", "listings", "listing", "inquiry"],
        "mobile_pages": ["index", "listing"],
        "extras": [
            # clip = 페이지 좌표(1440 폭). 머리글은 숨기고 2배 해상도로 찍는다
            {"name": "hero", "page": "index", "clip": [0, 0, 1440, 900], "keep_header": True},
            {"name": "finder", "page": "index", "clips": [[90, 760, 640, 204], [700, 846, 650, 118]]},
            {"name": "cards", "page": "index", "clip": [90, 1261, 640, 690]},
            {"name": "membership", "page": "index", "clips": [[90, 2150, 900, 192], [90, 2377, 840, 316]]},
            {"name": "presale", "page": "index", "clip": [90, 3064, 840, 505]},
            {"name": "agents", "page": "index", "clip": [90, 5568, 840, 720]},
            {"name": "ask", "page": "index", "clips": [[90, 6476, 860, 180], [90, 6688, 850, 262]]},
            {"name": "faq", "page": "index", "clip": [270, 7140, 900, 600], "clicks": ["#faq button"]},
            {"name": "listings", "page": "listings", "clip": [60, 267, 660, 500]},
            {"name": "filter", "page": "listings", "clip": [60, 267, 660, 500],
             "js": "(()=>{const s=document.querySelector('#fbar select[data-k=type]');s.value='고급빌라';s.dispatchEvent(new Event('change',{bubbles:true}))})()"},
            {"name": "gallery", "page": "listing", "clip": [90, 150, 850, 790], "clicks": ["#thumbs button:nth-child(3)"]},
            {"name": "agentbox", "page": "listing", "clip": [950, 276, 400, 553]},
            {"name": "gate-before", "page": "listing", "clips": [[90, 1055, 650, 185], [722, 1055, 628, 185], [90, 1528, 920, 70]]},
            {"name": "gate-after", "page": "listing", "clips": [[90, 1055, 650, 185], [722, 1055, 628, 185]], "clicks": ["[data-gate]"]},
            {"name": "inq1", "page": "inquiry", "clip": [90, 330, 730, 560]},
            {"name": "inq3", "page": "inquiry", "clip": [90, 330, 730, 560], "clicks": ["#tabs button:nth-child(3)"]},
            {"name": "mmenu", "page": "index", "mode": "m", "clicks": [".burger"]},
        ],
        "cover": "x-hero",
        "hook": ("매물 가격은 회원만 보는", "부동산 중개법인 홈페이지"),
        "kmong_hook": ("매물 가격은 회원만 보는", "부동산 홈페이지"),
        "grid_title": "메인 · 매물 찾기 · 매물 상세 · 의뢰하기\n모두 4개 페이지예요",
        "mobile_title": "휴대폰에서도\n가격은 회원만 볼 수 있어요",
        "cta_line": "우리 중개법인 홈페이지로",
        "grid": [("메인", "x-hero"), ("매물 찾기", "pc-listings-00"), ("매물 상세", "pc-listing-00"), ("의뢰하기", "pc-inquiry-00")],
        "phones": [("첫 화면", "m-index-00"), ("매물 상세", "m-listing-01"), ("메뉴", "x-mmenu")],
        "blog": [
            ("메인", "첫 화면 사진은\n3장이 번갈아 나와요", ["x-hero"]),
            ("메인", "지역 · 형태 · 거래 · 평형만 고르면\n바로 매물을 찾아요", ["x-finder-0", "x-finder-1"]),
            ("추천 매물", "매물 카드 한 장에\n지역 · 평형 · 가격이 다 보여요", ["x-cards"]),
            ("회원 안내", "가격을 왜 회원에게만 보여주는지\n먼저 알려드려요", ["x-membership-0", "x-membership-1"]),
            ("분양 정보", "분양 예정 단지는\n세대수 · 입주 · 분양 시기를 적어둬요", ["x-presale"]),
            ("중개사 소개", "담당 중개사 얼굴과\n경력 · 거래 건수를 같이 보여줘요", ["x-agents"]),
            ("의뢰 안내", "사고팔기 · 임차 · 촬영 신청 중\n원하는 의뢰로 바로 가요", ["x-ask-0", "x-ask-1"]),
            ("자주 묻는 질문", "자주 묻는 질문은\n누르면 답이 열려요", ["x-faq"]),
            ("매물 찾기", "지역 · 형태 · 거래 · 평형 · 방 · 주차\n6가지 조건으로 걸러 봐요", ["x-listings"]),
            ("매물 찾기", "고급빌라를 고르면\n12건 중 3건만 남아요", ["x-filter"]),
            ("매물 상세", "작은 사진을 누르면\n큰 사진이 바뀌어요", ["x-gallery"]),
            ("매물 상세", "옆에 담당 중개사가 있어서\n바로 문의를 남길 수 있어요", ["x-agentbox"]),
            ("매물 상세", "거래 방식과 가격은\n로그인해야 보여요", ["x-gate-before-0", "x-gate-before-1", "x-gate-before-2"]),
            ("매물 상세", "로그인하면 가려졌던 가격이\n이렇게 보여요 (시연 화면)", ["x-gate-after-0", "x-gate-after-1"]),
            ("의뢰하기", "사고팔기 의뢰는\n원하는 지역과 금액을 적어요", ["x-inq1"]),
            ("의뢰하기", "매물 촬영 신청은\n주소와 촬영 날짜를 받아요", ["x-inq3"]),
        ],
        "kmong": [
            ("메인", "지역 · 형태 · 거래 · 평형만 고르면\n바로 매물을 찾아요", ["x-finder-0", "x-finder-1"]),
            ("추천 매물", "매물 카드 한 장에\n지역 · 평형 · 가격이 다 보여요", ["x-cards"]),
            ("중개사 소개", "담당 중개사 얼굴과\n경력 · 거래 건수를 같이 보여줘요", ["x-agents"]),
            ("매물 찾기", "고급빌라를 고르면\n12건 중 3건만 남아요", ["x-filter"]),
            ("매물 상세", "작은 사진을 누르면\n큰 사진이 바뀌어요", ["x-gallery"]),
            ("매물 상세", "거래 방식과 가격은\n로그인해야 보여요", ["x-gate-before-0", "x-gate-before-1", "x-gate-before-2"]),
        ],
    },
}


# ── 장면 찍기 ──
def capture(key: str, spec: dict, fdir: Path) -> None:
    fdir.mkdir(parents=True, exist_ok=True)
    base = f"{SERVER}{key}/"
    with sync_playwright() as p:
        b = p.chromium.launch()
        for mode, (vw, vh), pages in (("pc", (1440, 900), spec["pages"]), ("m", (390, 844), spec["mobile_pages"])):
            mob = mode == "m"
            ctx = b.new_context(viewport={"width": vw, "height": vh}, device_scale_factor=2, is_mobile=mob, has_touch=mob)  # PC 도 2배 — 잘라서 키울 때 흐려지지 않게
            pg = ctx.new_page()
            for name in pages:
                pg.goto(base + name + ".html", wait_until="networkidle")
                pg.wait_for_timeout(1500)
                pg.mouse.move(vw / 2, vh / 2)
                same, last = 0, -1
                for i in range(80):
                    pg.screenshot(path=str(fdir / f"{mode}-{name}-{i:02d}.png"))
                    # 휠 관문은 scrollY 가 멈춘 채로 장면만 넘어가므로 여러 번 같아도 바로 끝내지 않는다
                    pg.evaluate("scrollBy(0,400)") if mob else pg.mouse.wheel(0, 450)
                    pg.wait_for_timeout(1300)
                    y = pg.evaluate("Math.round(scrollY)")
                    same = same + 1 if y == last else 0
                    last = y
                    if same >= 6:
                        break
                print(mode, name, "frames", i + 1)
            ctx.close()
        for ex in spec.get("extras", []):
            mob = ex.get("mode") == "m"
            vw, vh = (390, 844) if mob else (1440, 900)
            ctx = b.new_context(viewport={"width": vw, "height": vh}, device_scale_factor=2, is_mobile=mob, has_touch=mob)
            pg = ctx.new_page()
            pg.goto(base + ex["page"] + ".html", wait_until="networkidle")
            pg.add_style_tag(content="html{scroll-behavior:auto!important}")
            pg.wait_for_timeout(1200)
            if ex.get("clips"):
                ex = {**ex, "clip": ex["clips"][0]}
            if ex.get("clip"):
                # 늦게 오는 사진을 다 부르고, 등장 효과는 끝난 상태로
                h = pg.evaluate("document.documentElement.scrollHeight")
                for y in range(0, h, 700):
                    pg.evaluate(f"scrollTo(0,{y})")
                    pg.wait_for_timeout(80)
                pg.evaluate("scrollTo(0,0)")
                pg.add_style_tag(content=".rv,[class*=rv]{opacity:1!important;transform:none!important;transition:none!important}"
                                 ".hero-slide{transition:none!important}")
                pg.evaluate("document.querySelectorAll('.hero-slide').forEach((s,i)=>s.classList.toggle('live',i===0))")
                if not ex.get("keep_header"):
                    pg.add_style_tag(content="#hdr,header{visibility:hidden!important}")
                pg.wait_for_timeout(600)
            if ex.get("js"):
                pg.evaluate(ex["js"])
            for sel in ex.get("clicks", []):
                pg.click(sel)
                pg.wait_for_timeout(500)
            if ex.get("hover"):
                pg.hover(ex["hover"])
            pg.wait_for_timeout(ex.get("wait", 1200))
            out = str(fdir / f"x-{ex['name']}.png")
            if ex.get("clips"):
                pg.evaluate("scrollTo(0,0)")
                for k, (x, y, w, hh) in enumerate(ex["clips"]):
                    pg.screenshot(path=str(fdir / f"x-{ex['name']}-{k}.png"), full_page=True, clip={"x": x, "y": y, "width": w, "height": hh})
            elif ex.get("clip"):
                x, y, w, hh = ex["clip"]
                pg.evaluate("scrollTo(0,0)")
                pg.screenshot(path=out, full_page=True, clip={"x": x, "y": y, "width": w, "height": hh})
            else:
                pg.screenshot(path=out)
            print("extra", ex["name"])
            ctx.close()
        b.close()


# ── 카드 조각 ──
PAD = 48          # 좌우 여백 — 사진을 크게 쓰려고 줄였다
IMG_W = W - PAD * 2
FOOT_H = 130


def frame(fdir: Path, ref: str) -> tuple[str, float]:
    """(파일 주소, 세로/가로 비). '@x,y,w,h' 가 붙으면 잘라 쓴다."""
    name, _, box = ref.partition("@")
    src = fdir / f"{name}.png"
    with Image.open(src) as im:
        if not box:
            return src.as_uri(), im.size[1] / im.size[0]
        x, y, w, h = (int(v) for v in box.split(","))
        k = im.size[0] / (390 if name.startswith("m-") else 1440)  # 2배로 찍은 컷도 같은 좌표로
        crop = im.crop((round(x * k), round(y * k), round((x + w) * k), round(min(y + h, im.size[1] / k) * k)))
        out = fdir / f"_{name}_{box.replace(',', '_')}.png"
        crop.save(out)
        return out.as_uri(), crop.size[1] / crop.size[0]


def pictures(fdir: Path, refs: list[str], avail_h: int) -> str:
    fr = [frame(fdir, r) for r in refs]
    img_css = "display:block;border-radius:14px;box-shadow:0 18px 40px -22px rgba(0,0,0,.35);outline:1px solid rgba(0,0,0,.07)"
    if len(fr) == 4:  # 사진 판 4장은 2x2
        gap = 16
        w = (IMG_W - gap) // 2
        tall = sum(r for _, r in fr[:2]) / 2 * w * 2 + gap
        if tall > avail_h:
            w = int(w * (avail_h - gap) / (tall - gap))
        cells = "".join(f'<img src="{u}" style="{img_css};width:{w}px;height:{round(w * r)}px;object-fit:cover">' for u, r in fr)
        return f'<div style="display:grid;grid-template-columns:repeat(2,{w}px);gap:{gap}px;justify-content:center">{cells}</div>'
    gap = 22
    w = IMG_W
    total = sum(w * r for _, r in fr) + gap * (len(fr) - 1)
    if total > avail_h:  # 세로로 긴 컷은 폭을 줄여 한 화면에
        w = int(IMG_W * (avail_h - gap * (len(fr) - 1)) / (total - gap * (len(fr) - 1)))
    imgs = "".join(f'<img src="{u}" style="{img_css};width:{w}px;height:{round(w * r)}px">' for u, r in fr)
    return f'<div style="display:flex;flex-direction:column;align-items:center;gap:{gap}px">{imgs}</div>'


def head(sp: dict, label: str, title: str, dark: bool = False, align: str = "left") -> tuple[str, int]:
    """작은 제목(없어도 됨) + 큰 제목. (html, 차지하는 높이)"""
    n = title.count("\n") + 1
    lab_c = "rgba(255,255,255,.7)" if dark else sp["accent"]
    lab = f'<p style="font-size:28px;font-weight:700;color:{lab_c};margin-bottom:12px">{esc(label)}</p>' if label else ""
    html = f"""<div style="text-align:{align}">{lab}
  <h2 style="font-size:50px;font-weight:800;letter-spacing:-.035em;line-height:1.28">{lines(title)}</h2></div>"""
    return html, (46 if label else 0) + round(50 * 1.28 * n)


def colors(sp: dict, dark: bool) -> tuple[str, str]:
    return (sp.get("bg_dark", "#171513"), "#fff") if dark else (sp.get("bg", LIGHT_BG), "#1a1714")


def shell(sp: dict, inner: str, n: int, total: int, dark: bool = False, pad_top: int = 60) -> str:
    bg, fg = colors(sp, dark)
    return page(f"""
<div class="card" style="background:{bg};color:{fg};padding:{pad_top}px {PAD}px 0">
  {inner}
  <div class="foot" style="left:{PAD}px;right:{PAD}px;bottom:34px;color:{fg}">{foot(sp['code'], n, total, fg)[len('<div class="foot" style="color:' + fg + '">'):-len('</div>')]}</div>
</div>""")


LAYOUT_CYCLE = ["top", "bottom:dark", "right", "center:dark", "bottom", "top:dark"]


def shot_card(sp: dict, fdir: Path, label: str, title: str, refs: list[str], n: int, total: int, layout: str = "") -> str:
    """장마다 배치를 바꾼다 — 제목이 늘 왼쪽 위에 있으면 AI 가 찍어 낸 티가 난다는 피드백.
    top · bottom · right(사진 위, 제목 오른쪽 아래) · center(가운데 제목) · overlay(사진이 장 전체, 제목을 사진 위에) · photo(제목 없이 사진만)"""
    layout = layout or LAYOUT_CYCLE[n % len(LAYOUT_CYCLE)]
    kind, _, tone = layout.partition(":")
    dark = tone == "dark"
    if kind == "overlay":
        u, _r = frame(fdir, refs[0])
        h, _used = head(sp, label, title, dark=True)
        return page(f"""
<div class="card" style="background:#000;color:#fff;padding:0">
  <img src="{u}" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">
  <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,0) 40%,rgba(0,0,0,.82) 88%)"></div>
  <div style="position:absolute;left:{PAD}px;right:{PAD}px;bottom:{FOOT_H + 20}px">{h}</div>
  <div class="foot" style="left:{PAD}px;right:{PAD}px;bottom:34px;color:#fff">{foot(sp['code'], n, total, '#fff')[len('<div class="foot" style="color:#fff">'):-len('</div>')]}</div>
</div>""")
    if kind == "photo":
        avail = H - 70 - FOOT_H - 70
        cap = f'<p style="margin-top:26px;text-align:right;font-size:26px;font-weight:600;opacity:.6">{esc(label)}</p>' if label else ""
        return shell(sp, f"""<div style="height:{avail}px;display:flex;flex-direction:column;justify-content:center">{pictures(fdir, refs, avail - 70)}{cap}</div>""",
                     n, total, dark, pad_top=70)
    align = {"right": "right", "center": "center"}.get(kind, "left")
    h, used = head(sp, label, title, dark, align)
    avail = H - 60 - used - 50 - FOOT_H - 20
    pics = f'<div style="height:{avail}px;display:flex;align-items:center;justify-content:center">{pictures(fdir, refs, avail)}</div>'
    if kind in ("bottom", "right"):
        return shell(sp, f"""{pics}<div style="margin-top:50px">{h}</div>""", n, total, dark, pad_top=50)
    return shell(sp, f"""{h}<div style="margin-top:50px">{pics}</div>""", n, total, dark)


def grid_card(sp: dict, fdir: Path, n: int, total: int) -> str:
    h, used = head(sp, "페이지 구성", sp["grid_title"])
    cols = 2 if len(sp["grid"]) <= 4 else 3
    fs = 30 if cols == 2 else 24
    cells = "".join(
        f"""<figure><div style="aspect-ratio:16/10.5;border-radius:12px;overflow:hidden;background:#fff;box-shadow:0 14px 30px -18px rgba(0,0,0,.35)">
<img src="{frame(fdir, ref)[0]}" style="width:100%;height:100%;object-fit:cover;object-position:top"></div>
<figcaption style="margin-top:12px;font-size:{fs}px;font-weight:700">{esc(name)}</figcaption></figure>"""
        for name, ref in sp["grid"]
    )
    return shell(sp, f"""{h}
  <div style="margin-top:48px;display:grid;grid-template-columns:repeat({cols},1fr);gap:32px 22px">{cells}</div>""", n, total)


def phones_card(sp: dict, fdir: Path, n: int, total: int) -> str:
    h, used = head(sp, "휴대폰 화면", sp["mobile_title"], dark=True)
    ph = "".join(
        f"""<figure style="width:312px"><div class="phone"><img src="{frame(fdir, ref)[0]}"></div>
<figcaption style="margin-top:18px;text-align:center;font-size:28px;font-weight:700;opacity:.85">{esc(cap)}</figcaption></figure>"""
        for cap, ref in sp["phones"]
    )
    return shell(sp, f"""{h}
  <div style="margin-top:56px;display:flex;justify-content:center;gap:24px">{ph}</div>""", n, total, dark=True)


def cover_card(sp: dict, fdir: Path, total: int) -> str:
    h1, h2 = sp["hook"]
    u, r = frame(fdir, sp["cover"])
    return shell(sp, f"""<p style="font-size:28px;font-weight:700;color:{sp['accent']}">{esc(sp['brand'])} · {esc(sp['industry'])}</p>
  <h1 style="margin-top:16px;font-size:70px;font-weight:800;letter-spacing:-.045em;line-height:1.2"><span style="color:{sp['accent']}">{esc(h1)}</span><br>{esc(h2)}</h1>
  <div style="position:absolute;left:{PAD}px;top:440px;width:800px;border-radius:16px;overflow:hidden;box-shadow:0 30px 60px -28px rgba(0,0,0,.45)"><img src="{u}" style="display:block;width:100%;height:{round(800 * min(r, .7))}px;object-fit:cover;object-position:top"></div>
  <div style="position:absolute;right:{PAD}px;top:560px;width:270px" class="phone"><img src="{frame(fdir, sp['phones'][0][1])[0]}"></div>""", 1, total)


def cta_card(sp: dict, n: int, total: int, with_url: bool = True) -> str:
    a = sp["accent"]
    box = (f"""<p style="font-size:26px;color:#6b645d">실제 화면은 여기서 볼 수 있어요</p>
    <p style="margin-top:8px;font-size:34px;font-weight:700">noveriq.co.kr/samples/{sp['slug']}</p>""" if with_url else
           """<p style="font-size:26px;color:#6b645d">상담</p>
    <p style="margin-top:8px;font-size:34px;font-weight:700">궁금한 점은 편하게 물어봐 주세요</p>""")
    return shell(sp, f"""<p style="font-size:28px;font-weight:700;color:{a}">{esc(sp['brand'])} 디자인으로 제작</p>
  <h2 style="margin-top:14px;font-size:64px;font-weight:800;letter-spacing:-.035em;line-height:1.25">이 디자인으로<br>{esc(sp['cta_line'])} 만들어요</h2>
  <p style="margin-top:60px;font-size:34px;color:#6b645d">프리미엄 제작</p>
  <p style="margin-top:6px;font-size:130px;font-weight:800;letter-spacing:-.04em;line-height:1;color:{a}">300<span style="font-size:62px;margin-left:8px">만 원부터</span></p>
  <ul style="margin-top:48px;list-style:none;font-size:34px;line-height:1.8;color:#3d3833">
    <li>· 색과 메뉴를 회사에 맞게 바꿔요</li>
    <li>· 사진은 새로 만들어 넣어요</li>
    <li>· 자료를 받고 영업일 10일 안에 끝나요</li>
  </ul>
  <div style="margin-top:50px;padding:30px 36px;border-radius:20px;background:#fff;box-shadow:0 0 0 1px rgba(0,0,0,.07)">
    {box}
  </div>
  <p style="position:absolute;left:{PAD}px;bottom:118px;font-size:21px;color:#8a837b">화면 속 회사 이름 · 사진 · 내용은 예시예요.</p>""", n, total)


def kmong_main(sp: dict, fdir: Path) -> str:
    u, r = frame(fdir, sp["cover"])
    chips = [sp.get("chip_pages", f"{len(sp['grid'])}개 페이지"), "PC · 휴대폰", "관리자 모드", "영업일 10일 완성"]
    return kmong_main_square(sp["code"], sp["accent"], sp["kmong_hook"], f"{sp['brand']} · {sp['industry']}", chips,
                             u, min(r, .625), frame(fdir, sp["phones"][0][1])[0], sp.get("bg", LIGHT_BG))


def main() -> None:
    key = sys.argv[1]
    sp = SPECS[key]
    root = OUT_ROOT / f"{sp['code']}_{sp['brand']}"
    fdir = root / "_frames"
    if "--capture" in sys.argv:
        capture(key, sp, fdir)
        return

    def long_set(with_url: bool) -> list[tuple[str, str]]:
        """표지 · 구성 · 장면 16 · 휴대폰 · 상담 = 20장"""
        t = 2 + len(sp["blog"]) + 2
        cards = [("01-표지", cover_card(sp, fdir, t)), ("02-구성", grid_card(sp, fdir, 2, t))]
        for i, (lab, title, refs, *lay) in enumerate(sp["blog"], start=3):
            cards.append((f"{i:02d}", shot_card(sp, fdir, lab, title, refs, i, t, *lay)))
        n = len(cards) + 1
        return cards + [(f"{n:02d}-휴대폰", phones_card(sp, fdir, n, t)), (f"{n + 1:02d}-상담", cta_card(sp, n + 1, t, with_url))]

    t = 2 + len(sp["kmong"]) + 2  # 10
    shots = [(f"{i:02d}", shot_card(sp, fdir, lab, title, refs, i, t, *lay)) for i, (lab, title, refs, *lay) in enumerate(sp["kmong"], start=3)]
    sets = {
        "블로그": long_set(True),
        "당근_카페": long_set(False),
        "당근_비즈니스소식": [("01-표지", cover_card(sp, fdir, t)), ("02-구성", grid_card(sp, fdir, 2, t))] + shots
        + [(f"{t - 1:02d}-휴대폰", phones_card(sp, fdir, t - 1, t)), (f"{t:02d}-상담", cta_card(sp, t, t, False))],
        "크몽": [("02-구성", grid_card(sp, fdir, 2, t))] + shots
        + [(f"{t - 1:02d}-휴대폰", phones_card(sp, fdir, t - 1, t)), (f"{t:02d}-진행과정", process_card(sp["code"], sp["accent"], t, t, sp.get("bg", LIGHT_BG)))],
    }

    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(viewport={"width": W, "height": H})
        hi = b.new_page(viewport={"width": W, "height": H}, device_scale_factor=2)
        for folder, cards in sets.items():
            out = root / folder
            out.mkdir(parents=True, exist_ok=True)
            for old in out.glob("*.png"):
                old.unlink()
            if folder == "크몽":
                render(hi, kmong_main(sp, fdir), out / "01-대표.png", KMONG_MAIN_CSS, KMONG_MAIN_CSS)
            for name, doc in cards:
                render(pg, doc, out / f"{name}.png", W, H)
            print(folder, len(list(out.glob("*.png"))))
        b.close()
    for f in fdir.glob("_*.png"):
        f.unlink()


if __name__ == "__main__":
    main()
