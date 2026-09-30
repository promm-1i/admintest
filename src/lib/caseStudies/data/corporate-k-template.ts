import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "누리웰",
  headline: "건강기능식품 · 헬스케어 기업 홈페이지",
  summary:
    "우유빛 사진과 올리브 초록을 쓴 건강기능식품 기업 홈페이지입니다. 메인 한 쪽에 회사 5 · 브랜드 6 · 연구개발 2 · 미디어 4 · 고객지원 4 · 개인정보, 모두 22쪽으로 구성했습니다.",
  brandColor: "rgb(58,125,80)",
  tintColor: "rgb(240,243,236)",
  overview:
    "누리웰은 환자용 균형영양식과 건강기능식품을 만드는 헬스케어 기업을 가정하고 만든 디자인입니다. 흰 바탕에 음료 · 곡물 · 실험실 사진을 크게 쓰고, 초록과 올리브를 강조색으로 썼습니다.\n\n메인은 첫 화면 사진 위에 '매일의 건강을 채우는 한 잔' 제목, 둥근 사진들이 모여드는 About Us 장면, R&D · 사회공헌 · 미디어 · 고객지원으로 이어집니다. 서브 쪽은 대부분 한 화면 높이의 큰 사진 배너로 시작하고, 회사소개는 INNOVATION · GROWTH · FUTURE 세 장에 환자용 영양조제식품, 균형영양식 누적 판매 5억 팩, 해외 수출국 10곳을 차례로 적었습니다.\n\n브랜드 묶음은 밸런스케어 균형영양식 · 당케어 · 키즈 · 프로틴과 건강기능식품 쪽이 같은 틀이고, 연구개발은 특허 슬라이더와 소재 보유 현황 아코디언, 사회공헌은 4개 재단 탭, 연혁은 4구간 탭입니다. 고객지원은 FAQ · Wellife Solution · 사업장 위치, 미디어는 뉴스와 공지입니다.",
  meta: [
    { label: "업종", value: "건강기능식품 · 환자용 영양식 · 식품 제조 · 헬스케어" },
    { label: "페이지 구성", value: "22쪽 · 메인, 회사소개 · 가치체계 · 연혁 · CI · 사회공헌, 브랜드 소개 · 균형영양식 · 당케어 · 키즈 · 프로틴 · 건강기능식품, R&D센터 · R&D 성과, 뉴스 · 뉴스 보기 · 공지 · 공지 보기, Wellife Solution · FAQ · 사업장 위치, 개인정보" },
    { label: "이런 곳에 맞습니다", value: "식품 · 건강기능식품 · 제약 · 뷰티 제조기업, 브랜드가 여러 개인 회사, 연구 성과와 사회공헌을 함께 보여줄 회사" },
  ],
  mainShot: "/cases/corporate-k/main.webp",
  capabilities: {
    label: "22-PAGE HEALTHCARE BRAND SYSTEM",
    title: "브랜드 여섯 쪽과 R&D·사회공헌·고객지원까지 22개 화면",
    body: "메인 뒤로 브랜드 소개와 제품 쪽 다섯 개, R&D센터와 성과, 사회공헌 재단 네 곳, 제품 찾기 문답과 FAQ, 뉴스 · 공지 쪽이 이어집니다.",
    stats: [
      { value: "22", label: "화면 수", note: "회사·브랜드·R&D·미디어·지원" },
      { value: "6", label: "브랜드·제품 화면", note: "영양식 4종과 건강기능식품" },
      { value: "10", label: "보유 소재 항목", note: "R&D 성과 아코디언" },
      { value: "4", label: "사회공헌 탭", note: "재단별 사업과 활동" },
    ],
    groups: [
      { label: "브랜드 6화면", title: "브랜드 소개와 제품 쪽 다섯 개", body: "브랜드 소개 쪽 뒤로 균형영양식 · 당케어 · 키즈 · 프로틴이 같은 틀의 쪽으로 이어지고, 건강기능식품은 제품 슬라이더 쪽입니다.", items: ["브랜드 소개 · 제품 쪽 5", "화면에 붙어 바뀌는 브랜드 장면", "권하는 상황 3 · 브랜드 목록"], img: "/cases/corporate-k/page-brand.webp", caption: "브랜드 · 전체 브랜드", file: "brand.html" },
      { label: "제품 상세", title: "제품 장면과 권하는 상황 세 가지", body: "제품 장면 아래로 권하는 상황 세 가지, 흘러가는 문구 띠, 다른 브랜드 목록이 이어집니다.", items: ["제품 장면", "권하는 상황 3 · 아이콘", "흘러가는 띠 · 브랜드 목록"], img: "/cases/corporate-k/page-brand-balance.webp", caption: "브랜드 · 균형영양식", file: "brand-balance.html" },
      { label: "R&D·특허", title: "특허 슬라이더 · 소재 10개 펼침 목록 · 공장 인증", body: "R&D 성과 쪽에 특허 카드 슬라이더, 눌러서 펼치는 소재 10개 목록, 공장별 인증 현황이 차례로 있습니다.", items: ["R&D센터와 연구 분야", "특허 카드 슬라이더", "보유 소재 10개·공장 인증"], img: "/cases/corporate-k/page-rnd-result.webp", caption: "R&D · 연구 성과", file: "rnd-result.html" },
      { label: "맞춤 제품 추천", title: "나이 · 성별 · 고민을 고르면 제품을 추천하는 문답", body: "밸런스케어는 네 단계, 건강기능식품은 세 단계 질문에 답하면 추천 제품이 나옵니다. 단계마다 이전으로 버튼이 있습니다.", items: ["밸런스케어 4단계 · 건강기능식품 3단계", "연령 · 성별 · 섭취 대상 · 건강 고민", "추천 결과 · 처음으로"], img: "/cases/corporate-k/point-recommend.webp", caption: "고객지원 · 맞춤 제품 추천", file: "solution.html" },
      { label: "사회공헌 4탭", title: "재단 네 곳을 나눈 탭", body: "위에 붙는 재단 탭 네 개를 고르면 재단별 사업 소개, 로고판, 활동 사진 두 장이 바뀝니다.", items: ["재단 탭 4개", "사업 소개와 로고", "활동 사진 2장"], img: "/cases/corporate-k/page-csr.webp", caption: "지속가능경영 · 사회공헌", file: "csr.html" },
      { label: "미디어·FAQ", title: "뉴스 · 공지 목록과 분류형 FAQ", body: "뉴스와 공지는 목록과 상세 쪽으로 나뉘고, FAQ는 Top 3와 분류 탭 네 개, 검색으로 찾습니다.", items: ["뉴스·공지 목록과 상세", "FAQ 분류 탭", "사업장 위치와 고객지원"], img: "/cases/corporate-k/page-news.webp", caption: "미디어 · 뉴스 목록", file: "news.html" },
    ],
  },
  pagesLabel: "페이지",
  pagesTitle: "22쪽이 어떻게 이어지는지",
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
      desc: "핵심가치 아래로 INNOVATION(환자 맞춤 제품 4) · GROWTH(누적 판매 · 사업 2) · FUTURE(수출국 10) 세 장이 이어집니다.",
      items: ["배너 · 회사소개", "INNOVATION · 환자 맞춤 제품 4", "GROWTH · NOW ~ 1999 · 사업 카드 2 · 핵심가치 4"],
    },
    {
      name: "연혁",
      file: "history.html",
      img: "/cases/corporate-k/page-history.webp",
      desc: "현재~2021 · 2020~2011 · 2010~2001 · 2000~1988 네 구간 탭이 위에 붙고 연도별 사건이 세로선을 따라 내려갑니다.",
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
      desc: "늘봄동행재단 · 든든나눔연대 · 온기하우스재단 · 새싹희망재단 네 탭으로 기부 사업을 봅니다.",
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
      body: "메인 첫 화면 아래 About Us 장면은 화면에 붙은 채, 흩어져 있던 둥근 사진들이 스크롤에 따라 가운데 'Total Healthcare Solution Company' 원으로 모여듭니다. 원 아래에는 생애주기에 맞춘 영양 솔루션을 만드는 회사라는 한 줄과 회사소개 버튼이 있습니다.",
      items: ["화면 고정 · 둥근 사진이 모여듦", "가운데 원 · 슬로건", "회사소개 버튼"],
      img: "/cases/corporate-k/point-about.webp",
      caption: "홈 · About Us",
    },
    {
      title: "브랜드 쪽은\n이런 때 권해요 3가지",
      body: "밸런스케어 균형영양식 쪽의 Recommend 구역은 질병으로 식사가 어려울 때 · 일상의 활력을 원할 때 · 바쁜 일상으로 제때 식사하기 힘들 때 세 상황을 둥근 제품 사진과 아이콘으로 놓고, 사진 사이를 점선으로 이었습니다. 당케어 · 키즈 · 프로틴도 같은 틀이고, 아래 브랜드 목록 카드를 옆으로 넘겨 브랜드 사이를 오갑니다.",
      items: ["상황 3 · 둥근 사진 · 아이콘 · 점선", "브랜드 카드 5 · 옆으로 넘김 · 위치 막대", "브랜드 쪽마다 같은 틀"],
      img: "/cases/corporate-k/point-recommend.webp",
      caption: "브랜드 · 균형영양식",
    },
    {
      title: "특허는 슬라이더,\n소재 현황은 펼침 목록",
      body: "R&D 성과 쪽은 특허 번호 · 이름이 적힌 메달 카드를 옆으로 넘기는 슬라이더와, 건강기능식품 소재 10개를 눌러 펼치는 목록으로 이루어집니다. 펼치면 인정 연도와 기능이 나오고, 아래에 공장별 인증 현황이 붙습니다.",
      items: ["특허 카드 슬라이더 · 메달 · 번호", "소재 10 펼침 목록 · 연도 · 기능", "공장별 인증 현황"],
      img: "/cases/corporate-k/point-patents.webp",
      caption: "R&D 성과",
    },
    {
      title: "연혁은 4구간 탭이\n위에 붙어 따라옵니다",
      body: "연혁 쪽은 현재~2021 · 2020~2011 · 2010~2001 · 2000~1988 네 구간 탭이 위에 붙어 따라오고, 왼쪽 큰 구간 제목 옆으로 연도와 사건이 세로선의 점을 따라 내려갑니다. 사건 아래에 사진이 붙기도 합니다.",
      items: ["구간 탭 4 · 위에 붙음", "연도 · 사건 · 세로선 · 점", "사건 사진"],
      img: "/cases/corporate-k/point-history.webp",
      caption: "연혁",
    },
  ],
  detailsLabel: "자세히",
  detailsTitle: "만들 때 신경 쓴 것",
  details: [
    {
      title: "한 화면 높이의 사진 배너",
      body: "서브 쪽은 대부분 한 화면 높이의 사진 배너로 시작하고, 아래 본문이 흰 판으로 겹쳐 올라옵니다. 음료 · 곡물 · 실험실 사진을 크게 썼습니다.",
    },
    {
      title: "긴 내용은 접어 둡니다",
      body: "사회공헌 · 연혁 · FAQ는 탭으로 나누고, R&D 성과의 소재 목록은 눌러서 펼칩니다.",
    },
    {
      title: "화면에 붙어 바뀌는 장면",
      body: "휠 스크롤에 관성이 붙어 있고, About Us · 브랜드 · 가치체계의 Respect Tree 구역은 화면에 붙은 채 사진과 글이 바뀝니다. 브랜드 · 가치체계 쪽에는 문구가 흘러가는 띠가 있습니다.",
    },
    {
      title: "공식몰과 계열사로 잇는 자리",
      body: "머리글에 공식몰 버튼, 꼬리에 패밀리 사이트 펼침 목록과 스마트스토어 · B2B몰 링크 자리가 있습니다.",
    },
  ],
  mobile: {
    title: "좁은 화면에서는 이렇게 됩니다",
    body: "첫 화면 제목과 사진은 그대로 두고, About Us 장면은 세로로 풀립니다. 브랜드 목록 카드와 사회공헌 카드는 한 줄씩 쌓이고, 연혁과 사회공헌 탭은 옆으로 밀어서 고릅니다.",
    shots: [
      { img: "/cases/corporate-k/m-index.webp", caption: "홈" },
      { img: "/cases/corporate-k/m-history.webp", caption: "연혁 — 탭은 옆으로" },
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
      q: "누리웰은 실제 회사인가요?",
      a: "아닙니다. 디자인을 보여 드리려고 만든 가상 헬스케어 기업입니다. 제품 · 연혁 · 특허와 사진도 모두 예시이며, 제품 · 공장 · 연구 사진을 주시면 크기와 색을 맞춰 바꿔 넣습니다.",
    },
  ],
};

export default study;
