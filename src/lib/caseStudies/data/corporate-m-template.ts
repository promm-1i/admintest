import type { CaseStudy } from "../types";

const study: CaseStudy = {
  brand: "FLOVEX",
  headline: "산업설비 · 스마트 플로우 기업 홈페이지",
  summary:
    "메인 1 · 회사소개 7 · 사업영역 6 · 미디어·고객지원 6 · 채용 4 · 정책 2, 모두 26쪽으로 구성한 산업설비 기업 홈페이지입니다. 서비스 6개, 비전 장면 5개, 글로벌 지표 4개를 메인에 배치했습니다.",
  brandColor: "rgb(0, 112, 239)",
  tintColor: "rgb(232, 243, 255)",
  overview:
    "FLOVEX는 반도체 · 이차전지 · 데이터센터 · 클린룸 · 불소수지 코팅 · 극저온 배관을 다루는 가상 산업설비 기업을 전제로 만든 홈페이지입니다. 메인 1쪽과 서브 25쪽, 총 26쪽이며 회사소개 · 사업영역 · 미디어·고객지원 · 채용 · 정책의 5개 묶음으로 나뉩니다. 화면의 회사명, 사업 실적, 고객사, 연혁과 수치는 실제 기업 자료가 아닌 템플릿용 예시입니다.\n\n메인은 첫 화면 다음에 서비스 카드 6개, 500vh 길이의 비전 장면 5개, 글로벌 지표 4개, 고객 리뷰 3개, 미디어 카드 3개, 고객사 로고 27개가 이어집니다. 고객사 로고는 서로 다른 9개 이름을 세 차례 반복해 흐르는 띠를 구성했습니다.\n\n서브 페이지는 회사소개 7쪽, 사업영역 6쪽, 미디어·고객지원 6쪽, 채용 4쪽, 정책 2쪽입니다. JPG 사진 자산 18개를 사용하며, 전체 26쪽을 1440 · 768 · 390px에서 검사해 78개 화면 조합의 가로 넘침 0건, 깨진 이미지 0건, 콘솔 오류 0건을 확인했습니다.",
  meta: [
    {
      label: "업종",
      value: "산업설비 · 반도체 · 이차전지 · 데이터센터 · 클린룸",
    },
    {
      label: "페이지 구성",
      value:
        "26쪽 · 메인 1, 회사소개 7, 사업영역 6, 미디어·고객지원 6, 채용 4, 정책 2",
    },
    {
      label: "검증 범위",
      value:
        "26쪽 × 3개 화면 폭(1440 · 768 · 390px) = 78개 조합 · 가로 넘침, 이미지, 콘솔 오류 검사",
    },
  ],
  mainShot: "/cases/corporate-m/main.webp",
  pages: [
    {
      name: "홈",
      file: "index.html",
      img: "/cases/corporate-m/page-index.webp",
      desc: "첫 화면 다음에 사업영역 · 비전 · 글로벌 지표 · 고객 리뷰 · 미디어 · 고객사 · 채용 구역이 이어집니다.",
      items: [
        "서비스 카드 6",
        "비전 장면 · 진행 막대 각 5",
        "글로벌 지표 4",
        "리뷰 3 · 미디어 3",
        "고객사 로고 27 · 고유 이름 9",
      ],
    },
    {
      name: "경영 비전",
      file: "vision.html",
      img: "/cases/corporate-m/page-vision.webp",
      desc: "비전 소개, 선언문, 핵심가치 항목을 긴 세로 흐름으로 구성했습니다.",
      items: [
        "비전 항목 5",
        "이미지 요소 8",
        "1440px 높이 8,726px",
        "390px 높이 7,241px",
      ],
    },
    {
      name: "회사 연혁",
      file: "history.html",
      img: "/cases/corporate-m/page-history.webp",
      desc: "연도와 사건을 좌우 열로 나눈 아홉 개 연혁 항목으로 구성했습니다.",
      items: ["연혁 항목 9", "1440px 높이 3,874px", "390px 높이 3,698px"],
    },
    {
      name: "인증 · 특허",
      file: "qualification.html",
      img: "/cases/corporate-m/page-qualification.webp",
      desc: "인증·면허와 특허 탭 UI 다음에 자격 카드 목록을 배치했습니다.",
      items: [
        "탭 2",
        "자격 카드 10",
        "1440px 높이 3,372px",
        "390px 높이 2,770px",
      ],
    },
    {
      name: "반도체",
      file: "business-semiconductor.html",
      img: "/cases/corporate-m/page-semiconductor.webp",
      desc: "대형 사업 비주얼과 설명 다음에 설비 사진 세 장을 서로 다른 크기로 배치했습니다.",
      items: [
        "사업 비주얼 1",
        "갤러리 이미지 3",
        "1440px 높이 5,205px",
        "390px 높이 4,864px",
      ],
    },
    {
      name: "데이터센터",
      file: "business-datacenter.html",
      img: "/cases/corporate-m/page-datacenter.webp",
      desc: "데이터센터 냉각·유틸리티 사업 소개와 다섯 장의 설비 갤러리로 구성했습니다.",
      items: [
        "사업 비주얼 1",
        "갤러리 이미지 5",
        "1440px 높이 5,643px",
        "390px 높이 4,786px",
      ],
    },
    {
      name: "미디어센터",
      file: "media.html",
      img: "/cases/corporate-m/page-media.webp",
      desc: "검색 UI와 미디어 카드 목록을 한 페이지에 배치했습니다.",
      items: [
        "미디어 카드 11",
        "이미지 요소 13",
        "1440px 높이 3,198px",
        "390px 높이 6,369px",
      ],
    },
    {
      name: "자료실",
      file: "catalog.html",
      img: "/cases/corporate-m/page-catalog.webp",
      desc: "브로슈어 내려받기 목록 다음에 40장으로 구성한 PDF 미리보기 화면이 이어집니다.",
      items: [
        "다운로드 행 6",
        "PDF 미리보기 40장",
        "1440px 높이 60,480px",
        "390px 높이 16,415px",
      ],
    },
    {
      name: "복리후생",
      file: "benefits.html",
      img: "/cases/corporate-m/page-benefits.webp",
      desc: "생애주기 원형 항목, 복지 목록, 사내 공간 사진을 순서대로 구성했습니다.",
      items: [
        "원형 항목 5",
        "복지 항목 14",
        "공간 사진 2",
        "390px 높이 5,042px",
      ],
    },
    {
      name: "문의",
      file: "inquiry.html",
      img: "/cases/corporate-m/page-inquiry.webp",
      desc: "연락 안내와 문의 입력 화면을 나란히 배치한 정적 문의 페이지입니다.",
      items: [
        "폼 1",
        "입력 3 · 여러 줄 입력 1",
        "1440px 높이 2,322px",
        "390px 높이 2,028px",
      ],
    },
  ],
  points: [
    {
      title: "사업영역은 사진 카드\n6개로 시작합니다",
      body: "메인 Solutions & Services에는 반도체 · 이차전지 · 데이터센터 · 클린룸 · 불소수지 코팅 · 극저온 배관의 여섯 카드를 배치했습니다. 1440px에서는 각 카드 폭 378px, 이미지 높이 420px이며 가로 트랙으로 이어집니다.",
      items: [
        "서비스 카드 6",
        "데스크톱 카드 폭 378px",
        "데스크톱 이미지 높이 420px",
      ],
      img: "/cases/corporate-m/point-services.webp",
      caption: "홈 · Solutions & Services",
    },
    {
      title: "비전 구간은 500vh,\n장면과 진행 막대는 각 5개입니다",
      body: "메인의 Vision & Mission 구간은 CSS 높이 500vh로 설정되어 있습니다. 한 화면 높이의 고정 영역 안에서 다섯 장면의 투명도가 0.6초 전환되고, 하단 진행 막대 다섯 개가 현재 장면을 표시합니다.",
      items: [
        "구간 높이 500vh",
        "비전 장면 5",
        "진행 막대 5",
        "투명도 전환 0.6초",
      ],
      img: "/cases/corporate-m/point-vision.webp",
      caption: "홈 · Vision & Mission",
    },
    {
      title: "글로벌 구역에는 지도와\n지표 4개가 있습니다",
      body: "파란 배경의 글로벌 구역은 거점이 표시된 지도와 네 개의 수치 항목으로 구성했습니다. 화면의 매출·면적·순위·업력 값은 가상 기업을 위한 예시이며 실제 실적이 아닙니다.",
      items: ["지도 1", "거점 표시 3", "수치 항목 4", "수치는 템플릿 예시"],
      img: "/cases/corporate-m/point-reach.webp",
      caption: "홈 · Global Reach",
    },
    {
      title: "고객 리뷰는 사진을 포함한\n카드 3개입니다",
      body: "메인 Client Reviews에는 사진, 후기 문장, 고객사 이름, 담당 조직을 묶은 카드 세 개가 있습니다. 데스크톱에서 각 카드는 트랙 너비의 100%를 사용하고, 모바일에서는 328px 카드로 가로 배치됩니다.",
      items: ["리뷰 카드 3", "데스크톱 카드 너비 100%", "모바일 카드 폭 328px"],
      img: "/cases/corporate-m/point-review.webp",
      caption: "홈 · Client Reviews",
    },
    {
      title: "인증·특허 화면은 탭 2개와\n카드 10개입니다",
      body: "자격 페이지에는 Certifications & Licenses와 Patents 두 개의 탭 UI가 있고, 아래에 인증·면허 카드 열 개를 배치했습니다. 현재 탭은 정적 화면 요소이며 별도 데이터 필터 로직은 포함하지 않습니다.",
      items: ["탭 UI 2", "자격 카드 10", "정적 화면 범위"],
      img: "/cases/corporate-m/point-qualification.webp",
      caption: "회사소개 · 인증 및 특허",
    },
    {
      title: "사업영역 6쪽의 사진 슬롯을\n화면 폭별로 대조했습니다",
      body: "여섯 사업 페이지의 주요 이미지 슬롯을 기준 화면과 비교했습니다. 1440px에서는 23개, 390px에서는 22개 슬롯의 x · y · 너비 · 높이 차이가 모두 0px로 측정됐습니다.",
      items: [
        "사업 페이지 6",
        "1440px 이미지 슬롯 23",
        "390px 이미지 슬롯 22",
        "위치·크기 차이 0px",
      ],
      img: "/cases/corporate-m/point-business.webp",
      caption: "사업영역 · 데이터센터",
    },
    {
      title: "미디어센터는 카드\n11개로 구성했습니다",
      body: "미디어센터 페이지에는 검색 줄과 열한 개의 카드가 있습니다. 문서 높이는 1440px 화면에서 3,198px, 390px 화면에서 6,369px로 측정됐습니다.",
      items: ["미디어 카드 11", "이미지 요소 13", "모바일 문서 높이 6,369px"],
      img: "/cases/corporate-m/point-media.webp",
      caption: "미디어 · Media Center",
    },
    {
      title: "자료실은 다운로드 6행과\nPDF 미리보기 40장입니다",
      body: "자료실 상단에는 여섯 개의 다운로드 행이 있고, 아래에 40개의 PDF 미리보기 시트를 세로로 배치했습니다. 이 때문에 1440px 기준 문서 높이가 60,480px로 26쪽 중 가장 깁니다.",
      items: ["다운로드 행 6", "PDF 미리보기 40", "1440px 높이 60,480px"],
      img: "/cases/corporate-m/point-catalog.webp",
      caption: "미디어 · Downloads",
    },
    {
      title: "복리후생은 원형 5개와\n항목 14개입니다",
      body: "복리후생 페이지는 결혼 · 출산 · 육아 · 학습 · 건강의 원형 항목 다섯 개로 시작합니다. 아래에는 열네 개 복지 항목과 사내 공간 사진 두 장이 이어집니다.",
      items: ["원형 항목 5", "복지 항목 14", "공간 사진 2"],
      img: "/cases/corporate-m/point-benefits.webp",
      caption: "채용 · Employee Benefits",
    },
    {
      title: "구성원 소개는 인물 카드\n12개입니다",
      body: "FLOVEX People 페이지는 아바타, 이름, 역할을 묶은 인물 카드 열두 개로 구성했습니다. 문서 높이는 1440px에서 2,804px, 390px에서 6,708px로 측정됐습니다.",
      items: ["인물 카드 12", "1440px 높이 2,804px", "390px 높이 6,708px"],
      img: "/cases/corporate-m/point-people.webp",
      caption: "채용 · FLOVEX People",
    },
  ],
  details: [
    {
      title: "총 26쪽",
      body: "메인 1쪽과 서브 25쪽입니다. 서브는 회사소개 7 · 사업영역 6 · 미디어·고객지원 6 · 채용 4 · 정책 2쪽입니다.",
    },
    {
      title: "78개 화면 조합 검사",
      body: "26쪽을 1440 · 768 · 390px에서 각각 검사했습니다. 가로 넘침, 깨진 이미지, 콘솔 오류가 모두 0건입니다.",
    },
    {
      title: "서브페이지 50회 비교",
      body: "서브 25쪽을 1440 · 390px에서 기준 화면과 비교했습니다. 전체 문서 높이 차이는 50회 모두 0px였고, 감지 가능한 푸터 Y 좌표의 최대 차이는 1px였습니다.",
    },
    {
      title: "JPG 사진 자산 18개",
      body: "메인 첫 화면 1 · 서비스 6 · 비전 5 · 리뷰 3 · 미디어 3장으로, corporate-m/assets 폴더의 JPG 18개를 실제 파일 기준으로 확인했습니다.",
    },
    {
      title: "26쪽 전체 한국어 적용",
      body: "26개 HTML 모두 lang=ko로 설정했고 모든 페이지에 한글 본문이 있습니다. 1차 대메뉴와 일부 대형 영문 타이틀은 디자인 요소로 유지하고, 하위 메뉴·설명·버튼·폼·푸터·정책 문구를 한국어로 구성했습니다.",
    },
    {
      title: "정적 샘플 범위",
      body: "현재 결과물은 정적 HTML 템플릿입니다. 문의 접수, 검색 결과 처리, 파일 다운로드, 관리자 등록은 화면 예시이며 서버 처리나 관리자 시스템은 포함하지 않습니다.",
    },
  ],
  mobile: {
    title: "390px에서도 26쪽을 모두 검사했습니다",
    body: "390px 화면에서 26쪽의 가로 넘침 0건, 깨진 이미지 0건, 콘솔 오류 0건을 확인했습니다. 메인 문서 높이는 9,230px이며, 카드·갤러리·표 형태는 화면 폭에 맞춰 한 줄 또는 세로 흐름으로 바뀝니다.",
    shots: [
      { img: "/cases/corporate-m/m-index.webp", caption: "홈" },
      { img: "/cases/corporate-m/m-business.webp", caption: "데이터센터" },
      { img: "/cases/corporate-m/m-catalog.webp", caption: "자료실" },
      { img: "/cases/corporate-m/m-benefits.webp", caption: "복리후생" },
    ],
  },
  faq: [
    {
      q: "실제 페이지는 몇 쪽인가요?",
      a: "HTML 파일 기준 26쪽입니다. 메인 1쪽과 회사소개 7 · 사업영역 6 · 미디어·고객지원 6 · 채용 4 · 정책 2쪽입니다.",
    },
    {
      q: "현재 데모는 한국어로 구성되어 있나요?",
      a: "네. 26개 HTML 모두 lang=ko이며 모든 페이지에 한글 본문이 있습니다. About Us 같은 1차 대메뉴와 일부 대형 타이틀만 디자인 요소로 영어를 유지했습니다.",
    },
    {
      q: "화면의 회사명과 사업 수치는 실제 자료인가요?",
      a: "아닙니다. FLOVEX는 가상 브랜드이며 회사명, 고객사, 실적, 연혁과 수치는 템플릿 구성을 보여주기 위한 예시입니다.",
    },
    {
      q: "반응형 검사는 어떤 크기에서 했나요?",
      a: "1440 · 768 · 390px 세 폭에서 26쪽을 각각 검사해 총 78개 화면 조합을 확인했습니다.",
    },
    {
      q: "문의와 다운로드 버튼은 실제로 동작하나요?",
      a: "현재는 입력창과 버튼의 정적 화면 예시입니다. 문의 저장·전송, 파일 제공, 관리자 등록은 서버나 외부 서비스 연동이 필요합니다.",
    },
    {
      q: "사진 자산은 몇 장인가요?",
      a: "corporate-m/assets 폴더의 JPG 기준 18장입니다. 첫 화면 1 · 서비스 6 · 비전 5 · 리뷰 3 · 미디어 3장입니다.",
    },
  ],
};

export default study;
