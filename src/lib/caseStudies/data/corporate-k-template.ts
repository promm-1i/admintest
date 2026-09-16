import type { CaseStudy } from "../types";

const study: CaseStudy = {
  brand: "누리웰",
  headline: "건강기능식품 · 헬스케어 기업 홈페이지",
  summary:
    "우유빛 사진과 올리브 초록을 쓴 건강기능식품 기업 홈페이지입니다. 메인 한 쪽에 회사 5 · 브랜드 6 · 연구개발 2 · 미디어 4 · 고객지원 4 · 개인정보, 모두 22쪽으로 구성했습니다.",
  brandColor: "rgb(58,125,80)",
  tintColor: "rgb(240,243,236)",
  overview:
    "누리웰은 환자용 균형영양식과 건강기능식품을 만드는 헬스케어 기업을 가정하고 만든 디자인입니다. 대기업 식품 사이트의 틀을 따르되 쪽 수를 22쪽으로 줄였습니다. 흰 바탕에 음료 · 곡물 · 실험실 사진을 크게 쓰고, 초록과 올리브를 강조색으로 두어 부드럽고 건강한 인상을 냈습니다.\n\n메인은 첫 화면 사진 위에 '매일의 건강을 채우는 한 잔' 제목, 둥근 사진들이 모여드는 About Us 장면, R&D · 사회공헌 · 미디어 · 고객지원으로 이어집니다. 서브 쪽은 대부분 한 화면 높이의 큰 사진 배너로 시작하고, 회사소개는 INNOVATION · GROWTH 두 장으로 국내 최초 제품과 10년 연속 1위 이야기를 풀어 갑니다.\n\n브랜드 묶음은 밸런스케어 균형영양식 · 당케어 · 키즈 · 프로틴과 건강기능식품 쪽이 같은 틀이고, 연구개발은 특허 슬라이더와 소재 보유 현황 아코디언, 사회공헌은 4개 재단 탭, 연혁은 4구간 탭입니다. 고객지원은 FAQ · Wellife Solution · 사업장 위치, 미디어는 뉴스와 공지입니다.",
  meta: [
    { label: "업종", value: "건강기능식품 · 환자용 영양식 · 식품 제조 · 헬스케어" },
    { label: "페이지 구성", value: "22쪽 · 메인, 회사소개 · 가치체계 · 연혁 · CI · 사회공헌, 브랜드 소개 · 균형영양식 · 당케어 · 키즈 · 프로틴 · 건강기능식품, R&D센터 · R&D 성과, 뉴스 · 뉴스 보기 · 공지 · 공지 보기, Wellife Solution · FAQ · 사업장 위치, 개인정보" },
    { label: "이런 곳에 맞습니다", value: "식품 · 건강기능식품 · 제약 · 뷰티 제조기업, 브랜드가 여러 개인 회사, 연구 성과와 사회공헌을 함께 보여줄 회사" },
  ],
  mainShot: "/cases/corporate-k/main.webp",
  pages: [
    {
      name: "홈",
      file: "index.html",
      img: "/cases/corporate-k/page-index.webp",
      desc: "첫 화면 사진 위 제목 아래로 About Us 장면 · R&D · 사회공헌 · 미디어 · 고객지원이 이어집니다.",
      items: ["첫 화면 사진 · 제목 · SCROLL", "About Us 장면 · 둥근 사진 · 회사소개 버튼", "R&D 사진 배너 · 항목 2", "사회공헌 카드 3 · 뉴스 3", "고객지원 FAQ 카드 슬라이더 · FAQ · Wellife Solution"],
    },
    {
      name: "회사소개",
      file: "overview.html",
      img: "/cases/corporate-k/page-overview.webp",
      desc: "INNOVATION(국내 최초 제품 4) · GROWTH(10년 연속 1위 · 사업 2) 두 장과 핵심가치로 이어집니다.",
      items: ["배너 · 회사소개", "INNOVATION · 최초 제품 4", "GROWTH · NOW ~ 1995 · 사업 카드 2 · 핵심가치 4"],
    },
    {
      name: "연혁",
      file: "history.html",
      img: "/cases/corporate-k/page-history.webp",
      desc: "현재~2021 · 2020~2011 · 2010~2001 · 2000~1956 네 구간 탭이 위에 붙고 연도별 사건이 세로선을 따라 내려갑니다.",
      items: ["구간 탭 4 · 위에 붙음", "연도 · 사건 목록 · 세로선 · 점", "사건 사진"],
    },
    {
      name: "브랜드 소개",
      file: "brand.html",
      img: "/cases/corporate-k/page-brand.webp",
      desc: "밸런스케어 브랜드 이야기 장면 뒤로 균형영양식 · 당케어 · 키즈 · 프로틴 목록이 이어집니다.",
      items: ["브랜드 장면 · 큰 사진", "제품 브랜드 목록 4 · More View"],
    },
    {
      name: "밸런스케어 균형영양식",
      file: "brand-balance.html",
      img: "/cases/corporate-k/page-brand-balance.webp",
      desc: "제품 장면, 이런 때 권해요 3가지, 흘러가는 띠, 다른 브랜드 목록입니다. 당케어 · 키즈 · 프로틴이 같은 틀입니다.",
      items: ["제품 장면", "권하는 상황 3 · 아이콘", "흘러가는 띠 · 브랜드 목록"],
    },
    {
      name: "건강기능식품",
      file: "supplement.html",
      img: "/cases/corporate-k/page-supplement.webp",
      desc: "건강기능식품 제품을 슬라이더로 넘겨 보고 권하는 상황과 브랜드 목록이 이어집니다.",
      items: ["제품 슬라이더", "권하는 상황 · 브랜드 목록"],
    },
    {
      name: "R&D센터 소개",
      file: "rnd-center.html",
      img: "/cases/corporate-k/page-rnd-center.webp",
      desc: "연구소 소개와 누리웰 최초를 만든 기술력(영양조제식품 · 클로렐라 · L-아르기닌 · 식물성 DHA)입니다.",
      items: ["연구소 소개 · 사진", "최초 기술 4 · 사진 · 설명"],
    },
    {
      name: "R&D 성과",
      file: "rnd-result.html",
      img: "/cases/corporate-k/page-rnd-result.webp",
      desc: "기술력 아코디언, 특허 카드 슬라이더, 건강기능식품 소재 보유 현황 10개 아코디언, 공장별 인증 현황입니다.",
      items: ["기술력 · 임상연구기관 · 국책과제 아코디언", "특허 슬라이더 · 번호 · 이름", "소재 10 아코디언 · 공장별 인증 HACCP"],
    },
    {
      name: "사회공헌",
      file: "csr.html",
      img: "/cases/corporate-k/page-csr.webp",
      desc: "희망나눔재단 · 행복얼라이언스 · 아이웃음재단 · 소아암어린이재단 네 탭으로 기부 사업을 봅니다.",
      items: ["재단 탭 4 · 위에 붙음", "사업 소개 · 로고판 · 사진 2"],
    },
    {
      name: "News",
      file: "news.html",
      img: "/cases/corporate-k/page-news.webp",
      desc: "날짜 · 제목이 있는 뉴스 9건과 검색, 상세 쪽입니다. 공지사항 · FAQ · 사업장 위치가 같은 묶음입니다.",
      items: ["뉴스 9 · 날짜 · 제목 · 검색", "공지사항 · FAQ Top 3 · 분류 4 · 검색", "사업장 위치 · 구글 지도"],
    },
  ],
  points: [
    {
      title: "About Us는 둥근 사진들이\n가운데로 모여듭니다",
      body: "메인 첫 화면 아래 About Us 장면은 화면에 붙은 채, 흩어져 있던 둥근 사진들이 스크롤에 따라 가운데 'Total Healthcare Solution Company' 원으로 모여듭니다. 원 아래에는 '생애주기 및 라이프스타일 맞춤형 뉴트리션 솔루션을 제공하는 헬스케어 컴퍼니' 한 줄과 회사소개 버튼이 있습니다.",
      items: ["화면 고정 · 둥근 사진이 모여듦", "가운데 원 · 슬로건", "회사소개 버튼"],
      img: "/cases/corporate-k/point-about.webp",
      caption: "홈 · About Us",
    },
    {
      title: "R&D 배너는\n실험실 사진 위에 항목 둘",
      body: "R&D 구역은 실험실 사진을 전체 폭으로 깔고 '믿을 수 있는 30년 식품연구 노하우로 건강한 미래를 만들어갑니다' 제목 아래 혁신을 위한 노력 · 끊임없는 도전의 결과 두 항목을 선 아이콘과 함께 놓았습니다. 누르면 R&D센터 · R&D 성과 쪽으로 이동합니다.",
      items: ["전체 폭 사진 · 제목", "항목 2 · 선 아이콘 · 설명", "R&D센터 · 성과로 이동"],
      img: "/cases/corporate-k/point-rnd.webp",
      caption: "홈 · R&D",
    },
    {
      title: "사회공헌은\n사진 카드 3장",
      body: "CSR 구역은 '건강한 나눔으로 세상을 더욱 풍요롭게 만듭니다' 제목 아래 희망나눔재단 · 행복얼라이언스 · 아이웃음재단 기부 사업을 사진 카드 3장으로 놓았습니다. 카드에 사업 이름과 한 줄 설명이 있고 사회공헌 쪽으로 이어집니다.",
      items: ["카드 3 · 사진 · 사업 이름 · 설명", "사회공헌 쪽으로"],
      img: "/cases/corporate-k/point-csr.webp",
      caption: "홈 · 사회공헌",
    },
    {
      title: "고객지원은\nFAQ 카드가 옆으로 흐릅니다",
      body: "Support 구역은 '누리웰에 궁금한 것 있으신가요?' 제목 옆에 FAQ · Wellife Solution 아이콘 링크가 있고, 아래로 제품 · 기업 분류가 붙은 질문 카드가 높이를 엇갈려 옆으로 흐릅니다. 카드를 누르면 FAQ 쪽의 그 질문으로 갑니다.",
      items: ["FAQ · Wellife Solution 링크", "질문 카드 슬라이더 · 분류 · 화살표", "누르면 FAQ 쪽으로"],
      img: "/cases/corporate-k/point-support.webp",
      caption: "홈 · 고객지원",
    },
    {
      title: "회사소개 INNOVATION은\n국내 최초 제품 4가지",
      body: "회사소개 쪽 첫 장 INNOVATION은 캡슐 사진 위에 제목을 두고, 흰 판 안에 1995년 의과대학 · 대학병원과 임상 연구를 시작한 이야기와 암환자용 · 고혈압환자용 · 염증성 장질환자용 · 당뇨병성 신장질환자용 영양조제식품 네 가지 최초 제품을 표로 정리했습니다. 아래에 연구 · 제품 사진 2장이 붙습니다.",
      items: ["배경 사진 · INNOVATION · The first", "흰 판 · 이야기 · 최초 제품 4 표", "사진 2"],
      img: "/cases/corporate-k/point-overview.webp",
      caption: "회사소개 · INNOVATION",
    },
    {
      title: "GROWTH는 NOW와 1995 사이\n10년 연속 1위",
      body: "두 번째 장 GROWTH는 우유 사진 위에 제목을 두고, 흰 판 안에 '균형영양식 밸런스케어 10년 연속 국내 판매 1위'를 NOW와 1995 큰 글자 사이에 놓았습니다. 아래로 균형영양식 사업 · 건강식품 사업 사진 카드 2장이 있고, 카드 안 단추로 각 브랜드 쪽에 갑니다.",
      items: ["배경 사진 · GROWTH · For all people", "NOW ~ 1995 · 10년 연속 1위", "사업 카드 2 · 브랜드 단추"],
      img: "/cases/corporate-k/point-overview2.webp",
      caption: "회사소개 · GROWTH",
    },
    {
      title: "브랜드 목록은\n사진 카드 5장 슬라이더",
      body: "브랜드 소개 쪽 아래의 브랜드 목록은 밸런스케어 균형영양식 · 당케어 · 키즈 · 프로틴 · 건강기능식품 다섯 브랜드를 사진 카드로 놓고 옆으로 넘기며, 아래 막대가 위치를 보여줍니다. 각 브랜드 쪽 아래에도 같은 목록이 있어 브랜드 사이를 오갑니다. 브랜드 소개 쪽 위에는 초록 카드에 둥근 제품 사진과 More View 단추를 둔 브랜드 소개가 있습니다.",
      items: ["브랜드 카드 5 · 사진 · 이름 · 옆으로 넘김", "아래 막대 위치 표시", "브랜드 쪽마다 같은 목록"],
      img: "/cases/corporate-k/point-brandlist.webp",
      caption: "브랜드 · 목록",
    },
    {
      title: "브랜드 쪽은\n이런 때 권해요 3가지",
      body: "밸런스케어 균형영양식 쪽의 Recommend 구역은 '균형 있는 영양보충 및 식이 관리를 돕습니다' 제목 아래 질병으로 식사가 어려울 때 · 일상의 활력을 원할 때 · 바쁜 일상으로 제때 식사하기 힘들 때 세 상황을 둥근 제품 사진과 아이콘으로 놓았습니다. 사진 사이를 점선이 잇습니다.",
      items: ["상황 3 · 둥근 사진 · 아이콘", "점선으로 이어짐", "당케어 · 키즈 · 프로틴도 같은 틀"],
      img: "/cases/corporate-k/point-recommend.webp",
      caption: "브랜드 · 균형영양식",
    },
    {
      title: "특허는 슬라이더,\n소재 현황은 아코디언",
      body: "R&D 성과 쪽은 특허 번호 · 이름이 적힌 메달 카드를 옆으로 넘기는 슬라이더와, 황국 발효물 · EPA 및 DHA 함유유지 · L-아르기닌 같은 건강기능식품 소재 10개를 눌러 펼치는 아코디언으로 이루어집니다. 펼치면 인정 연도와 기능이 나옵니다. 아래에 공장별 인증 현황(HACCP)이 붙습니다.",
      items: ["특허 카드 슬라이더 · 메달 · 번호", "소재 10 아코디언 · 연도 · 기능", "공장별 인증 현황"],
      img: "/cases/corporate-k/point-patents.webp",
      caption: "R&D 성과",
    },
    {
      title: "연혁은 4구간 탭이\n위에 붙어 따라옵니다",
      body: "연혁 쪽은 현재~2021 · 2020~2011 · 2010~2001 · 2000~1956 탭이 위에 붙고, 왼쪽 큰 구간 제목 옆으로 연도와 사건이 세로선의 점을 따라 내려갑니다. 사건 아래에 사진이 붙기도 합니다.",
      items: ["구간 탭 4 · 위에 붙음", "연도 · 사건 · 세로선 · 점", "사건 사진"],
      img: "/cases/corporate-k/point-history.webp",
      caption: "연혁",
    },
    {
      title: "행동약속 CoC는\n카드 슬라이더와 영상",
      body: "가치체계 쪽의 행동약속 CoC 구역은 '우리가 만든 CoC' 카드 뒤로 구성원 육성 · 장기적 관점 · 다름 인정 같은 약속 카드가 옆으로 흐르고, 아래에 재생 표시가 붙은 영상 자리가 있습니다. 위쪽 Respect Tree 구역은 스크롤 장면입니다.",
      items: ["CoC 카드 슬라이더 · 체크 아이콘", "영상 자리 · 재생 표시", "Respect Tree 장면"],
      img: "/cases/corporate-k/point-coc.webp",
      caption: "가치체계 · 행동약속",
    },
  ],
  details: [
    {
      title: "부드러운 스크롤과 장면",
      body: "Lenis 스크롤 위에 GSAP 장면을 얹어 About Us · 브랜드 · Respect Tree 구역이 화면에 붙은 채 바뀝니다. 요소는 화면 80% 선에서 켜집니다.",
    },
    {
      title: "한 화면 배너",
      body: "서브 쪽은 대부분 한 화면 높이의 사진 배너로 시작하고, 아래 본문이 흰 판으로 겹쳐 올라옵니다.",
    },
    {
      title: "통합검색",
      body: "머리글의 돋보기를 누르면 통합검색 칸이 열립니다. 제작할 때 제품 · 뉴스 · FAQ를 함께 찾게 연결합니다.",
    },
    {
      title: "흘러가는 띠",
      body: "브랜드 쪽과 가치체계 쪽에 문구가 흘러가는 띠가 있고, 화면에 들어올 때만 움직입니다.",
    },
    {
      title: "탭과 아코디언",
      body: "사회공헌 4탭, 연혁 4탭, FAQ 분류 4, R&D 성과 아코디언 3묶음이 있어 긴 내용을 접어 둡니다.",
    },
    {
      title: "패밀리 사이트 · 공식몰",
      body: "꼬리에 패밀리 사이트 펼침 목록, 머리글에 공식몰 버튼 자리가 있어 쇼핑몰과 계열사로 잇습니다.",
    },
  ],
  mobile: {
    title: "휴대폰에서는 배너 아래로 한 줄씩 쌓입니다",
    body: "첫 화면 제목과 사진은 그대로 두고, About Us 장면은 세로로 풀립니다. 브랜드 목록 카드와 사회공헌 카드는 한 줄씩, 연혁과 사회공헌 탭은 옆으로 밀어서 고릅니다.",
    shots: [
      { img: "/cases/corporate-k/m-index.webp", caption: "홈" },
      { img: "/cases/corporate-k/m-brand.webp", caption: "브랜드 소개" },
      { img: "/cases/corporate-k/m-balance.webp", caption: "균형영양식" },
      { img: "/cases/corporate-k/m-csr.webp", caption: "사회공헌" },
    ],
  },
  faq: [
    {
      q: "브랜드나 제품이 더 많으면 어떻게 하나요?",
      a: "밸런스케어 균형영양식 쪽과 같은 틀로 브랜드 쪽을 더하고 목록 · 메뉴에 함께 넣습니다. 제작할 때 관리자 화면에서 제품을 등록하게 만들 수 있습니다.",
    },
    {
      q: "공식몰과 연결되나요?",
      a: "머리글 공식몰 버튼에 쇼핑몰 주소를 연결합니다. 제품 쪽의 More View도 쇼핑몰 상품으로 이을 수 있습니다.",
    },
    {
      q: "뉴스 · 공지 · FAQ는 어떻게 올리나요?",
      a: "제작할 때 관리자 화면에서 글과 분류를 올리면 목록 · 상세 · 메인 카드에 반영되게 만듭니다.",
    },
    {
      q: "22쪽보다 적게도 되나요?",
      a: "네. 회사 · 브랜드 · 연구개발 · 미디어 · 고객지원 묶음에서 필요한 쪽만 골라 만들 수 있습니다.",
    },
    {
      q: "특허 · 인증 자료는 어떻게 넣나요?",
      a: "특허 번호 · 이름과 인증서 파일을 주시면 슬라이더와 인증 현황에 넣습니다. 지금 화면의 것은 예시입니다.",
    },
    {
      q: "사진은 어떻게 준비하나요?",
      a: "제품 · 공장 · 연구 사진을 주시면 크기 · 색을 맞춰 넣습니다. 이 화면의 사진은 예시이고, 부족한 장면은 촬영 방법을 안내해 드립니다.",
    },
  ],
};

export default study;
