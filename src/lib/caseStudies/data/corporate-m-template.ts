import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "FLOVEX",
  headline: "산업설비 · 스마트 플로우 기업 홈페이지",
  summary:
    "반도체 · 이차전지 공장과 데이터센터의 유틸리티 설비를 설계 · 시공하는 산업설비 기업 홈페이지입니다. 여섯 사업을 상세 쪽으로 나누고, 인증 · 미디어 · 자료실 · 채용 · 문의까지 모두 26쪽으로 구성했습니다.",
  brandColor: "rgb(0, 112, 239)",
  tintColor: "rgb(232, 243, 255)",
  overview:
    "FLOVEX는 반도체 · 이차전지 공장과 데이터센터에 배관 · 냉각 · 환경 제어 설비를 설계하고 시공하는 산업설비 기업을 가정하고 만든 디자인입니다. 첫 화면은 설비 영상 위에 영문 슬로건을 크게 두고, 흰 바탕에 파랑 한 가지를 강조색으로 썼습니다.\n\n메인은 여섯 사업을 넘겨 보는 Solutions & Services, 검은 화면에서 다섯 가치가 차례로 바뀌는 Vision & Mission, 매출 · 생산시설 · 업력 숫자를 담은 Global Network, 고객 후기와 미디어, 고객사 이름 띠, 채용 배너로 이어집니다.\n\n서브는 회사소개 6쪽, 사업 6쪽, 채용 4쪽, 미디어 · 자료 · 고객지원 7쪽과 약관 2쪽입니다. 사업 쪽은 같은 틀에 산업별 설비 영상과 기술 설명이 들어가고, 자료실에서는 브로슈어 여섯 종을 내려받습니다.",
  meta: [
    { label: "업종", value: "산업설비 · 유틸리티 엔지니어링 · 클린룸 · 냉각 설비" },
    { label: "페이지 구성", value: "26쪽 · 메인, 회사소개 6(비전 · CEO · 연혁 · 인증 · 조직도 · CI), 사업 6, 채용 4, 미디어 · 뉴스 · 자료실 · 리포트 · 고객지원 · 문의 · 오시는 길, 약관 2" },
    { label: "이런 곳에 맞습니다", value: "설비 · 플랜트 · 엔지니어링 회사, 사업 분야가 여러 갈래인 제조 협력사, 인증과 자료를 발주처에 보여 줘야 하는 회사" },
  ],
  mainShot: "/cases/corporate-m/main.webp",
  capabilities: {
    label: "26-PAGE ENGINEERING SYSTEM",
    title: "여섯 사업과 인증·자료·문의까지 26개 화면",
    body: "메인 뒤로 사업 상세 여섯 쪽, 인증 · 연혁 등 회사소개 여섯 쪽, 미디어 · 자료실 · 문의, 채용 네 쪽이 이어집니다.",
    stats: [
      { value: "26", label: "화면 수", note: "회사·사업·홍보·지원·채용" },
      { value: "6", label: "사업 상세", note: "반도체부터 데이터센터까지" },
      { value: "4", label: "검증·자료 영역", note: "자격·카탈로그·리포트·미디어" },
      { value: "4", label: "인재 화면", note: "인재상·채용·복지·스토리" },
    ],
    groups: [
      { label: "사업 6분야", title: "사업 상세 여섯 쪽", body: "반도체 · 이차전지 · 극저온 · 불소수지 · 드라이룸 · 데이터센터 사업마다 설비 영상과 기술 설명이 같은 틀로 들어갑니다.", items: ["사업 분야 6개 독립 상세", "산업별 기술·공정 설명", "메인 솔루션에서 상세 연결"], img: "/cases/corporate-m/page-semiconductor.webp", caption: "사업 · 반도체 유틸리티", file: "business-semiconductor.html" },
      { label: "데이터센터", title: "데이터센터 쪽 기술 설명 다섯 갈래", body: "열관리 · 액체냉각 · 이중화 · 운영 데이터 최적화 · 통합 관리 다섯 갈래를 사진과 번갈아 적었습니다.", items: ["설비 영상", "기술 설명 5갈래", "사진과 글 번갈아"], img: "/cases/corporate-m/page-datacenter.webp", caption: "사업 · 데이터센터", file: "business-datacenter.html" },
      { label: "자격·인증", title: "인증 6 · 면허 4 증서 카드", body: "등록 · 인증 · 면허를 증서 모양 카드로 모았습니다. 제작할 때 실제 증서 스캔본으로 바꿔 넣습니다.", items: ["인증 6 · 면허 4", "증서 모양 카드 · 이름 · 분류", "휴대폰에서는 2열"], img: "/cases/corporate-m/page-qualification.webp", caption: "기술 · 자격 및 인증", file: "qualification.html" },
      { label: "미디어·실적", title: "소식 사진 카드와 검색", body: "현장 수행 사례와 회사 소식을 사진 카드로 모으고, 검색 칸을 두었습니다.", items: ["소식 카드 · 사진 · 제목 · 날짜", "미디어센터 · 회사 뉴스 두 쪽", "검색 칸"], img: "/cases/corporate-m/page-media.webp", caption: "홍보 · 미디어 아카이브", file: "media.html" },
      { label: "인재·복지", title: "인재상 · 채용 · 복지 · 구성원 이야기 네 쪽", body: "인재상, 채용 정보, 복리후생 항목과 사내 공간 사진, 구성원 인터뷰를 쪽마다 나눴습니다.", items: ["인재상과 채용 정보", "복리후생 항목", "구성원 인터뷰·스토리"], img: "/cases/corporate-m/page-benefits.webp", caption: "채용 · 복리후생", file: "benefits.html" },
      { label: "자료·상담", title: "자료실 · 고객지원 · 문의 폼", body: "브로슈어를 내려받는 자료실, 고객지원 · 제보 쪽, 문의 폼을 따로 두었습니다.", items: ["브로슈어 6 · 다운로드", "필수 4칸 문의 폼", "고객지원 · 제보 쪽"], img: "/cases/corporate-m/page-inquiry.webp", caption: "고객지원 · 사업 문의", file: "inquiry.html" },
    ],
  },
  pagesLabel: "페이지",
  pagesTitle: "26쪽이 어떻게 이어지는지",
  pages: [
    {
      name: "홈",
      file: "index.html",
      img: "/cases/corporate-m/page-index.webp",
      desc: "설비 영상 첫 화면 아래로 사업 카드 · 가치 소개 · 숫자 · 고객 후기 · 미디어 · 고객사 띠 · 채용 배너가 이어집니다.",
      items: ["설비 영상 · 영문 슬로건", "사업 카드 6 · 좌우 화살표", "가치 5장 · 숫자 4 · 고객 후기 3", "미디어 3 · 고객사 띠 · 채용 배너"],
    },
    {
      name: "경영 비전",
      file: "vision.html",
      img: "/cases/corporate-m/page-vision.webp",
      desc: "비전 문장과 핵심가치를 사진과 번갈아 놓았습니다.",
      items: ["비전 문장", "핵심가치", "사진과 번갈아 배치"],
    },
    {
      name: "회사 연혁",
      file: "history.html",
      img: "/cases/corporate-m/page-history.webp",
      desc: "창업부터 지금까지를 연도별로 내려가며 정리했습니다.",
      items: ["연도별 목록", "연도 · 사건"],
    },
    {
      name: "인증 · 특허",
      file: "qualification.html",
      img: "/cases/corporate-m/page-qualification.webp",
      desc: "인증 · 면허 열 가지를 증서 모양 카드로 4열에 늘어놓았습니다. 제작할 때 실제 증서 스캔본으로 바꿉니다.",
      items: ["증서 카드 10 · 이름 · 분류", "인증 6 · 면허 4", "휴대폰에서는 2열"],
    },
    {
      name: "반도체",
      file: "business-semiconductor.html",
      img: "/cases/corporate-m/page-semiconductor.webp",
      desc: "공정 유틸리티 네트워크를 설비 영상과 기술 설명으로 소개합니다.",
      items: ["설비 영상", "기술 설명 · 사진", "여섯 사업 쪽과 같은 틀"],
    },
    {
      name: "데이터센터",
      file: "business-datacenter.html",
      img: "/cases/corporate-m/page-datacenter.webp",
      desc: "열관리 · 액체냉각 · 이중화 · 최적화 · 통합 관리 다섯 갈래로 설명합니다.",
      items: ["설비 영상", "기술 설명 5갈래", "사진과 글 번갈아"],
    },
    {
      name: "미디어센터",
      file: "media.html",
      img: "/cases/corporate-m/page-media.webp",
      desc: "회사 소식과 프로젝트 소식을 사진 카드로 모으고 검색 칸을 두었습니다.",
      items: ["소식 카드 8 · 사진 · 제목 · 날짜", "검색 칸"],
    },
    {
      name: "자료실",
      file: "catalog.html",
      img: "/cases/corporate-m/page-catalog.webp",
      desc: "회사소개서와 사업별 브로슈어 여섯 종을 내려받는 쪽입니다.",
      items: ["브로슈어 6 · PDF · 다운로드 버튼", "회사소개서 미리보기"],
    },
    {
      name: "복리후생",
      file: "benefits.html",
      img: "/cases/corporate-m/page-benefits.webp",
      desc: "복리후생 항목과 사내 공간을 사진과 함께 소개합니다.",
      items: ["복리후생 항목", "사내 공간 사진"],
    },
    {
      name: "문의",
      file: "inquiry.html",
      img: "/cases/corporate-m/page-inquiry.webp",
      desc: "이름 · 이메일 · 제목 · 내용을 받는 문의 폼입니다.",
      items: ["입력 4칸 · 모두 필수", "내용 10자 이상", "확인 문구"],
    },
  ],
  points: [
    {
      title: "여섯 사업은\n사진 카드로 넘겨 봅니다",
      body: "Solutions & Services 구역은 반도체 · 이차전지 · 데이터센터 · 클린룸과 드라이룸 · 불소수지 코팅 · 극저온 이송 여섯 사업을 큰 사진 카드로 늘어놓고, 좌우 화살표로 넘겨 봅니다. 카드마다 영문 사업명 아래 한글 한 줄 제목과 설명이 붙고, 누르면 그 사업의 상세 쪽으로 이어집니다.",
      items: ["사업 카드 6 · 사진 · 영문 사업명 · 한 줄 설명", "좌우 화살표로 넘김", "누르면 사업별 상세 쪽으로"],
      img: "/cases/corporate-m/point-services.webp",
      caption: "홈 · Solutions & Services",
    },
    {
      title: "검은 화면에서\n다섯 가치가 차례로 바뀝니다",
      body: "Vision & Mission 구역은 검은 화면에 붙은 채, 스크롤을 내리는 동안 Authentic Innovations · User Centric · Precision Performance 같은 다섯 가치가 한 장씩 바뀝니다. 가치마다 두 줄 문장과 짧은 영상이 함께 바뀌고, 아래 막대 다섯 개가 지금 몇 번째인지 보여 줍니다.",
      items: ["화면 고정 · 가치 5장 차례로 전환", "가치마다 두 줄 문장 · 영상", "아래 진행 막대 5"],
      img: "/cases/corporate-m/point-vision.webp",
      caption: "홈 · Vision & Mission",
    },
    {
      title: "숫자 네 개와\n넘겨 보는 고객 후기",
      body: "Global Network 구역은 매출 · 생산시설 면적 · 협력사 평가 · 사업 업력 네 숫자를 기준 연도와 함께 크게 놓습니다. 이어지는 Client Reviews 구역은 고객사 담당 부서가 남긴 후기를 한 장씩 넘겨 보고, 아래에서는 고객사 이름이 띠로 흘러갑니다.",
      items: ["숫자 4 · 단위 · 기준 연도", "고객 후기 · 다음 버튼으로 넘김", "고객사 이름 띠"],
      img: "/cases/corporate-m/point-reach.webp",
      caption: "홈 · Global Network",
    },
    {
      title: "사업 쪽은 설비 영상과\n기술 설명 다섯 갈래",
      body: "데이터센터 쪽을 예로 들면, 맨 위에 설비 영상을 깔고 열관리 기술 · 액체냉각 인프라 · 이중화 · 운영 데이터 최적화 · 설계부터 시운전까지 통합 관리 다섯 갈래로 설명을 이어 갑니다. 여섯 사업 쪽이 같은 틀입니다.",
      items: ["사업마다 설비 영상 1", "기술 설명 5갈래 · 사진과 번갈아", "사업 6쪽 · 같은 틀"],
      img: "/cases/corporate-m/point-business.webp",
      caption: "사업영역 · 데이터센터",
    },
  ],
  detailsLabel: "자세히",
  detailsTitle: "만들 때 신경 쓴 것",
  details: [
    {
      title: "색은 파랑 하나만",
      body: "흰 바탕에 파랑 한 가지만 강조색으로 쓰고, 가치 소개 구역만 검은 화면입니다.",
    },
    {
      title: "자료는 쪽을 나눠서",
      body: "인증 · 면허와 특허를 나눠 모은 인증 쪽, 브로슈어 여섯 종을 내려받는 자료실, 검색 칸이 있는 미디어센터를 따로 두었습니다.",
    },
    {
      title: "빠진 칸을 알려 주는 문의",
      body: "문의는 이름 · 이메일 · 제목 · 내용 네 칸이고, 모두 필수입니다. 내용은 열 자 이상 적어야 넘어가며, 이 화면에서는 보내기 전 확인 문구까지 보여 줍니다.",
    },
    {
      title: "움직임을 줄이고 싶은 분께",
      body: "운영체제에서 '동작 줄이기'를 켜 두면 관성 스크롤과 떠오르는 효과를 끄고, 가치 소개 장면과 고객사 띠도 움직이지 않고 바로 보여 줍니다.",
    },
  ],
  mobile: {
    title: "좁은 화면에서는 이렇게 됩니다",
    body: "첫 화면 영상과 슬로건은 그대로 두고, 사업 카드는 한 장씩 밀어서 넘깁니다. 숫자 네 개는 두 칸씩 쌓이고, 사업 쪽의 기술 설명은 사진 아래로 한 줄씩 이어집니다. 메뉴는 오른쪽 위 버튼으로 엽니다.",
    shots: [
      { img: "/cases/corporate-m/m-index.webp", caption: "홈" },
      { img: "/cases/corporate-m/m-business.webp", caption: "데이터센터" },
      { img: "/cases/corporate-m/m-catalog.webp", caption: "자료실" },
      { img: "/cases/corporate-m/m-benefits.webp", caption: "복리후생" },
    ],
  },
  faq: [
    {
      q: "사업 분야가 여섯 개보다 적으면요?",
      a: "사업 쪽은 같은 틀이라 분야 수만큼만 둡니다. 메인의 사업 카드와 메뉴도 남은 분야에 맞춰 줄어듭니다.",
    },
    {
      q: "설비 영상이 없으면 어떻게 되나요?",
      a: "첫 화면과 사업 쪽 영상 자리는 사진으로 두어도 화면이 그대로입니다. 현장 영상이 있으면 가볍게 줄여서 넣습니다.",
    },
    {
      q: "브로슈어와 인증서는 어떻게 넣나요?",
      a: "PDF 파일과 인증서 스캔본을 주시면 자료실과 인증 쪽에 넣습니다. 지금 화면의 자료는 예시입니다.",
    },
    {
      q: "뉴스와 채용 공고는 직접 올릴 수 있나요?",
      a: "제작할 때 관리자 화면을 붙여 뉴스 · 자료 · 채용 공고를 직접 올리고 고치실 수 있게 만듭니다.",
    },
    {
      q: "문의는 어디로 오나요?",
      a: "지금 화면은 확인 문구까지만 보여 주는 데모입니다. 제작할 때 지정한 메일이나 관리자 화면으로 받도록 연결합니다.",
    },
    {
      q: "FLOVEX는 실제 회사인가요?",
      a: "아닙니다. 디자인을 보여 드리려고 만든 가상 산업설비 기업입니다. 실적 · 고객사 · 연혁 숫자와 사진도 모두 예시이며, 회사 자료를 주시면 그대로 바꿔 넣습니다.",
    },
  ],
};

export default study;
