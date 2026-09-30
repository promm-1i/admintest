import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "NATURIVE LAB",
  headline: "천연물 화장품 원료기업 홈페이지",
  summary:
    "원물 6,196종 · 원산지 240곳 숫자, 원료 검색 283종, 원료 상세와 샘플 문의 폼이 있는 화장품 원료기업 홈페이지입니다. 회사소개 · 연구 · 콘텐츠 · 소식 · 채용 · 회원까지 모두 23쪽입니다.",
  brandColor: "rgb(205, 73, 33)",
  tintColor: "rgb(246, 235, 228)",
  overview:
    "NATURIVE LAB은 240개 지역에서 들여온 식물 원물로 화장품 원료를 만드는 연구 중심 원료기업을 가정하고 만든 디자인입니다. 흰 바탕에 주황빛 빨강 한 가지를 강조색으로 쓰고, 연구 구역만 어두운 바탕으로 바꿨습니다.\n\n메인은 5초마다 넘어가는 첫 화면 사진 네 장, 산지 계약과 ESG 이야기 두 줄, 어두운 연구 구역과 인증 · 특허 · 논문 링크 세 칸, 제품 · 원산지 · 원물 숫자 세 개, 대표 한 문장, 베스트 제품 탭과 카드 네 장, 뷰티필름, 전시회 세 건, 회사 위치 세 곳과 제품 문의 폼으로 이어집니다.\n\n원료 검색 쪽은 283종을 카드로 놓고 제품명 검색이 되며, 유형 · 효능 · 인증 · 시리즈 체크 칸이 있습니다. 원료 상세는 Key Benefits · Application과 샘플 및 자료 문의 버튼입니다. 회사명, 제품명, 효능 데이터, 특허, 국가와 화면 이미지는 디자인 예시이며 실제 기업의 검증 자료와 표시 기준에 맞춰 바꿉니다.",
  meta: [
    { label: "적합 업종", value: "화장품 원료 · 천연물 소재 · 바이오 · 기능성 원료 연구기업" },
    { label: "주요 구성", value: "회사소개 · 원료 검색·상세 · 연구·효능·특허·인증 · 콘텐츠 · 채용 · 문의" },
    { label: "맞춤 적용", value: "제품 분류 · 효능 데이터 · 연구자료 · 글로벌 거점 · 샘플 문의 변경 가능" },
  ],
  mainShot: "/cases/corporate-o/main.webp",
  capabilities: {
    label: "23-PAGE INGREDIENT BUSINESS",
    title: "원료 검색부터 연구 자료와 샘플 문의까지 23개 화면",
    body: "메인 뒤로 원료 검색과 상세, 기술소개 · 효능평가 · 특허 · 인증, 뷰티필름 · 인사이트 · 허브북 · 뉴스레터, 회사소식 · 전시회, 채용 · 인재상, 문의 · 로그인 · 회원가입 쪽이 이어집니다.",
    stats: [
      { value: "23", label: "화면 수", note: "제품·연구·콘텐츠·회원 포함" },
      { value: "283", label: "원료 카드", note: "제품명 검색" },
      { value: "4", label: "연구 쪽", note: "기술·효능·특허·인증" },
      { value: "4", label: "콘텐츠 쪽", note: "필름·인사이트·허브북·뉴스레터" },
    ],
    groups: [
      { label: "원료 검색", title: "원료 카드 283장과 제품명 검색", body: "원료마다 원산지 표시, 이름, 태그 네 개, 영문 성분명을 적은 카드를 앨범형으로 늘어놓았습니다. 검색 칸에 이름을 넣으면 카드가 걸러지고, 왼쪽에 유형 · 효능 · 인증 · 시리즈 체크 칸이 있습니다.", items: ["원료 카드 283 · 앨범형 · 리스트형", "제품명 검색 · 선택초기화", "유형 · 효능 · 인증 · 시리즈 체크 칸"], img: "/cases/corporate-o/page-products.webp", caption: "제품 · 효능별 원료 검색", file: "products.html" },
      { label: "원료 상세", title: "Key Benefits · Application과 샘플 문의 버튼", body: "원료 이름과 한 줄 설명 아래에 장벽 강화 같은 주제 제목, 소개 글, 효능 네 가지, 적용 제형을 적고 샘플 및 자료 문의 버튼을 붙였습니다.", items: ["원료 이름 · 한 줄 설명", "Key Benefits 4 · Application", "샘플 및 자료 문의 버튼"], img: "/cases/corporate-o/page-product-detail.webp", caption: "제품 · 상세와 샘플 문의", file: "product-detail.html" },
      { label: "연구기술", title: "기술 탭 네 개와 추출 공법 카드", body: "기술소개 쪽은 추출 · 발효 · 파우더 · Order-made 탭 아래에 적외선 · 초음파 · 고주파 세 공법 카드를 놓고 한 줄씩 적었습니다.", items: ["기술 탭 4", "공법 카드 3 · 사진 · 한 줄 설명", "카드를 누르면 효능평가 쪽으로"], img: "/cases/corporate-o/page-technology.webp", caption: "R&D · 연구기술", file: "technology.html" },
      { label: "효능·검증", title: "효능평가 · 특허 · 인증 세 쪽", body: "효능평가는 세 단계 평가를, 특허 · 논문은 186건과 공동 연구 대학 9곳을, 인증서는 해마다 받는 외부 심사를 사진 카드로 적었습니다.", items: ["효능평가 세 단계", "특허 · 논문 186건", "인증 · 외부 심사"], img: "/cases/corporate-o/page-efficacy.webp", caption: "R&D · 효능평가", file: "efficacy.html" },
      { label: "콘텐츠랩", title: "뷰티필름 · 인사이트 · 허브북 · 뉴스레터", body: "뷰티필름은 산지와 연구실을 찍은 영상 열두 편, 인사이트는 연구원 칼럼, 허브북은 식물 120종 노트, 뉴스레터는 달마다 소재 한 가지를 고른 글입니다.", items: ["뷰티필름 12편", "인사이트 칼럼 · 허브북", "월간 뉴스레터"], img: "/cases/corporate-o/point-film.webp", caption: "콘텐츠랩 · 뷰티필름", file: "beauty.html" },
      { label: "글로벌·문의", title: "42개국 네트워크와 문의 · 회원", body: "글로벌 네트워크 쪽은 아시아 · 유럽과 미주 · 산지 네트워크 세 갈래로 나눴고, 문의 쪽은 회사명 · 담당자 · 이메일 · 문의 유형 · 내용 다섯 칸입니다. 로그인과 회원가입 쪽도 있습니다.", items: ["네트워크 세 갈래", "문의 폼 5칸 · 원료 제안 · 샘플 요청 · 공동 연구", "로그인 · 회원가입"], img: "/cases/corporate-o/page-global.webp", caption: "기업 · 글로벌 네트워크", file: "global.html" },
    ],
  },
  pagesLabel: "PREVIEW",
  pagesTitle: "주요 화면 미리보기",
  pages: [
    { name: "홈", file: "index.html", img: "/cases/corporate-o/page-index.webp", desc: "첫 화면 사진 네 장 아래로 산지 이야기, 연구 구역, 숫자, 베스트 제품, 뷰티필름, 전시회, 위치와 문의 폼이 이어집니다.", items: ["첫 화면 사진 4장 · 5초 전환", "산지 · ESG 이야기 2줄", "제품 · 원산지 · 원물 숫자 3", "베스트 제품 · 뷰티필름 · 전시회 · 문의 폼"] },
    { name: "회사소개", file: "company.html", img: "/cases/corporate-o/page-company.webp", desc: "회사 소개 글과 소개 영상, 자매회사 두 곳, 2004년부터 다섯 해의 연혁입니다.", items: ["소개 글 · 영상 재생 버튼", "자매회사 2 · 영국 · 미국", "연혁 5개 연도"] },
    { name: "원료 검색", file: "products.html", img: "/cases/corporate-o/page-products.webp", desc: "원료 283종을 카드로 놓고 제품명 검색과 체크 칸 네 묶음을 두었습니다.", items: ["검색 · 선택초기화", "유형 · 효능 · 인증 · 시리즈 체크 칸", "앨범형 · 리스트형"] },
    { name: "원료 상세", file: "product-detail.html", img: "/cases/corporate-o/page-product-detail.webp", desc: "원료 소개, Key Benefits, Application과 샘플 및 자료 문의 버튼입니다.", items: ["원료 이름 · 한 줄 설명", "Key Benefits · Application", "샘플 및 자료 문의"] },
    { name: "기술소개", file: "technology.html", img: "/cases/corporate-o/page-technology.webp", desc: "추출 · 발효 · 파우더 · Order-made 탭 아래에 적외선 · 초음파 · 고주파 공법 카드를 놓았습니다.", items: ["기술 탭 4", "공법 카드 3 · 한 줄 설명"] },
    { name: "효능평가", file: "efficacy.html", img: "/cases/corporate-o/page-efficacy.webp", desc: "세 단계 효능 평가를 사진 카드로 적었습니다.", items: ["세 단계 평가", "In-vitro & Ex-vivo", "Clinical & Formulation"] },
    { name: "글로벌 네트워크", file: "global.html", img: "/cases/corporate-o/page-global.webp", desc: "42개국 파트너를 아시아 · 유럽과 미주 · 산지 네트워크 세 갈래로 나눴습니다.", items: ["42개국 파트너", "권역 세 갈래", "산지 5년 계약"] },
    { name: "채용", file: "jobs.html", img: "/cases/corporate-o/page-jobs.webp", desc: "직무 · 경력 · 근무지 · 마감을 적은 채용공고 표입니다. 인재상 쪽이 따로 있습니다.", items: ["채용공고 3건", "직무 · 경력 · 근무지 · 마감", "인재상 · 복리후생 쪽"] },
  ],
  points: [
    { title: "산지 이야기 두 줄은\n사진과 좌우 번갈아", body: "‘240개 지역에서 들여온 원물 6,196종으로 원료를 만듭니다.’ 아래로 산지 계약 이야기와 ESG 이야기가 사진과 좌우 번갈아 놓입니다. 줄마다 영문 소제목과 두 문장, 더보기 링크가 붙습니다.", items: ["산지 · ESG 두 줄", "사진과 좌우 번갈아", "더보기 · 회사소개 · 네트워크 연결"], img: "/cases/corporate-o/point-story.webp", caption: "홈 · 원료 스토리" },
    { title: "흰 바탕 다음에\n어두운 연구 구역", body: "‘연구원 38명이 일하는 NATURIVE R&D’ 구역은 어두운 바탕 오른쪽에 연구실 사진을 옅게 깔았습니다. 아래에 인증 · 특허 · 논문 세 칸 링크가 붙어 각 쪽으로 갑니다.", items: ["어두운 바탕 · 연구실 사진", "연구 소개 한 단락", "인증 · 특허 · 논문 링크 3"], img: "/cases/corporate-o/point-technology.webp", caption: "홈 · 연구기술" },
    { title: "베스트 제품은\n탭 일곱 개와 카드 네 장", body: "베스트 제품 구역에는 신규 · 쿨링 · 천연 · 발효 같은 탭 일곱 개와 원료 카드 네 장이 있습니다. 카드마다 이름과 한 줄 설명이 붙고, 누르면 원료 상세로 갑니다. 탭은 지금 고른 것만 표시되고, 제작할 때 원료 목록과 연결합니다.", items: ["탭 7개", "원료 카드 4 · 이름 · 한 줄", "원료 상세 연결"], img: "/cases/corporate-o/point-products.webp", caption: "홈 · 대표 원료" },
    { title: "뷰티필름은\n큰 영상 카드 한 장", body: "뷰티필름 구역은 영상 카드 한 장을 크게 두고, 옆에 원료 이름 · 한 줄 설명 · 두 문장과 ‘더 많은 영상 보러가기’ 링크를 붙였습니다. 뷰티필름 쪽에는 영상 열두 편이 있습니다.", items: ["영상 카드 1", "원료 이름 · 설명", "뷰티필름 쪽 12편"], img: "/cases/corporate-o/point-film.webp", caption: "홈 · 뷰티필름" },
    { title: "회사 위치 세 곳과\n제품 문의 폼", body: "마지막 구역은 영국 · 한국 · 미국 세 곳의 주소를 적고, 옆에 문의분야(원료 제안 · 샘플 요청)와 개인정보 동의, 제출하기 버튼이 있는 문의 폼을 두었습니다.", items: ["위치 3곳 · 주소", "문의분야 선택 · 동의", "제출하기"], img: "/cases/corporate-o/point-contact.webp", caption: "홈 · 위치와 문의" },
  ],
  details: [
    { title: "첫 화면 사진 네 장", body: "첫 화면 사진은 5초마다 넘어가고, 아래 점을 누르면 그 장으로 바로 갑니다." },
    { title: "화면에 들어올 때 떠오르는 카드", body: "산지 이야기 줄, 연구 링크, 원료 카드, 전시회 카드, 연혁은 화면에 들어올 때 아래에서 떠오릅니다." },
    { title: "샘플·원료 문의 접수", body: "문의 폼은 지금 확인 문구까지 보여 주고, 제작할 때 담당자 메일이나 관리자 화면으로 연결합니다." },
    { title: "뉴스·전시·콘텐츠 관리", body: "관리자가 뉴스, 전시 일정과 인사이트 글을 직접 올리는 기능을 추가할 수 있습니다." },
    { title: "소식 검색", body: "회사소식 · 전시회 쪽은 검색 칸에 단어를 넣으면 목록이 걸러집니다." },
    { title: "다국어·글로벌 확장", body: "해외 고객 비중에 맞춰 영문 페이지와 국가별 문의 폼을 추가할 수 있습니다." },
  ],
  mobile: {
    title: "휴대폰에서는 한 줄씩 쌓입니다",
    body: "산지 이야기와 원료 카드는 한 줄씩 쌓이고, 메뉴는 오른쪽 위 버튼으로 열고 Esc로 닫습니다.",
    shots: [
      { img: "/cases/corporate-o/m-index.webp", caption: "메인" },
      { img: "/cases/corporate-o/m-products.webp", caption: "원료 검색" },
      { img: "/cases/corporate-o/m-product-detail.webp", caption: "원료 상세" },
      { img: "/cases/corporate-o/m-technology.webp", caption: "연구기술" },
    ],
  },
  faq: [
    { q: "제품 분류와 효능 검색 조건을 바꿀 수 있나요?", a: "네. 실제 제품 데이터와 영업 방식에 맞춰 제품군, 효능, 원산지와 적용 제형 등 검색 조건을 다시 짜고 체크 칸으로 거르게 만듭니다." },
    { q: "제품 상세에서 샘플 문의를 받을 수 있나요?", a: "제품명과 요청 수량이 자동으로 들어가는 문의 폼을 만들고 이메일이나 문자로 담당자에게 보내게 할 수 있습니다." },
    { q: "특허와 연구자료를 직접 추가할 수 있나요?", a: "관리자 기능을 추가하면 특허, 인증, 뉴스와 기술자료를 직접 등록하고 수정할 수 있습니다." },
    { q: "영문 홈페이지도 제작할 수 있나요?", a: "해외 고객용 영문 사이트를 같은 구조로 만들거나 제품·연구·문의 같은 핵심 화면만 먼저 만들 수 있습니다." },
    { q: "제작 기간과 비용은 어떻게 정해지나요?", a: "프리미엄 디자인은 부가세 별도 300만 원부터이며 제품 데이터 수, 다국어와 관리 기능 범위를 확인한 뒤 정확히 안내합니다." },
    { q: "도메인·호스팅·유지보수도 지원하나요?", a: "도메인과 호스팅 연결을 지원하고 제품과 콘텐츠 업데이트를 위한 유지보수 방식도 안내합니다." },
  ],
};

export default study;
