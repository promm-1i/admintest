import type { CaseStudy } from "./types";

type BenefitCopy = {
  title: (subject: string) => string;
  body: (subject: string) => string;
  items: [string, string, string];
};

type PointOverride = {
  subject: string;
  title: string;
};

const POINT_OVERRIDES: Record<string, PointOverride> = {
  "홈 · 이미지 피드": { subject: "대표 작품", title: "첫 화면부터\n작품의 분위기에 몰입시킵니다" },
  "홈 · 작가 노트 발췌": { subject: "작가 이야기", title: "작품과 작가의 이야기를\n함께 전달합니다" },
  "작품 · 격자": { subject: "작품 포트폴리오", title: "다양한 작품을\n리듬감 있게 둘러봅니다" },
  "작품 · 크게 보기 창": { subject: "작품 상세 감상", title: "작품의 세부 표현까지\n깊이 감상합니다" },
  "전시 · 전시 카드": { subject: "전시 이력", title: "주요 전시 이력을\n한눈에 확인합니다" },
  "작가 노트": { subject: "작가 노트", title: "한국어와 영어로\n작가의 철학을 전합니다" },
  문의: { subject: "작품·전시 문의", title: "작품과 전시 문의를\n간편하게 받습니다" },

  "홈 · 소개 장면": { subject: "기업 소개", title: "기업의 첫인상과\n핵심 메시지를 선명하게 전합니다" },
  "홈 · 사업 장면": { subject: "주요 사업", title: "주요 사업과 경쟁력을\n직관적으로 소개합니다" },
  "홈 · 실적": { subject: "주요 실적", title: "주요 실적으로\n사업 수행 역량을 증명합니다" },
  "홈 · 품질 · 안전": { subject: "품질·안전 원칙", title: "품질과 안전에 대한\n기업의 원칙을 강조합니다" },
  "사업 개요 · 짓는 공간": { subject: "개발 분야", title: "개발 분야와 수행 범위를\n한눈에 보여줍니다" },
  "주거 개발 · 철학": { subject: "주거 개발 철학", title: "주거 개발의 기준과\n공간 철학을 전달합니다" },
  "주거 개발 · 단지": { subject: "주요 개발 단지", title: "주요 개발 단지로\n수행 경험을 보여줍니다" },
  "주요 연혁": { subject: "주요 연혁", title: "성장 과정과 주요 이력을\n쉽게 확인합니다" },
  "채용 안내": { subject: "채용 절차", title: "지원자가 채용 절차를\n미리 이해하게 합니다" },
  "회사 소식": { subject: "기업 소식", title: "사업 소식과 성과를\n꾸준히 전달합니다" },

  "홈 · 기술 슬라이더": { subject: "핵심 기술", title: "핵심 기술을\n흐름에 따라 이해합니다" },
  "홈 · 회사 소개": { subject: "브랜드 소개", title: "브랜드의 이야기와 강점을\n인상적으로 소개합니다" },
  "홈 · Casting solution": { subject: "주조 솔루션", title: "주조 솔루션별 특징을\n쉽게 비교합니다" },
  "홈 · Built with solid quality": { subject: "품질 약속", title: "품질에 대한 약속과\n운영 원칙을 전합니다" },
  "홈 · 파트너": { subject: "글로벌 파트너", title: "글로벌 협력 네트워크로\n기업 신뢰를 높입니다" },
  "홈 · 소식": { subject: "기업 소식", title: "기업 소식과 기술 정보를\n꾸준히 전달합니다" },
  "공장 · 생산공정": { subject: "생산공정", title: "생산 과정을\n단계별로 쉽게 설명합니다" },
  "공장 · 핵심기술": { subject: "핵심기술", title: "핵심 기술의 차별점을\n상세하게 보여줍니다" },
  "제품 · 일반 펌프부품": { subject: "펌프부품 제품군", title: "제품별 재질과 용도를\n쉽게 비교합니다" },
  "고객 · 견적문의": { subject: "제품 견적문의", title: "필요한 자료와 함께\n견적을 요청할 수 있습니다" },
  "회사 · 연혁": { subject: "기업 연혁", title: "주요 연혁과 성장 과정을\n한눈에 확인합니다" },

  "홈 · 산업별 솔루션": { subject: "산업별 솔루션", title: "산업에 맞는 배터리 솔루션을\n빠르게 비교합니다" },
  "홈 · 폼팩터": { subject: "배터리 형태", title: "원통형과 파우치형의 특징을\n한눈에 비교합니다" },
  "홈 · 소재": { subject: "배터리 소재", title: "주요 배터리 소재와\n적용 분야를 소개합니다" },
  "회사개요 · 사업영역": { subject: "사업영역", title: "핵심 사업영역과 성장 방향을\n체계적으로 보여줍니다" },
  "원통형 · 핵심 경쟁력": { subject: "핵심 경쟁력", title: "원통형 배터리의\n기술 경쟁력을 설명합니다" },
  "원통형 · 주요 수주 이력": { subject: "주요 수주 이력", title: "주요 수주 이력으로\n사업 성과를 증명합니다" },
  사업장: { subject: "국내외 사업장", title: "국내외 사업장과 위치를\n빠르게 확인합니다" },
  연혁: { subject: "기업 연혁", title: "기업의 성장 과정을\n시기별로 살펴봅니다" },
  "채용정보 · 채용 절차": { subject: "채용 절차", title: "지원 절차와 준비 사항을\n명확하게 안내합니다" },
  뉴스룸: { subject: "뉴스룸", title: "새로운 소식과 주요 활동을\n꾸준히 전달합니다" },

  "홈 · 사업 분야": { subject: "핵심 사업 분야", title: "핵심 사업 분야와 적용 범위를\n한눈에 보여줍니다" },
  "홈 · Merit": { subject: "핵심 강점", title: "선택받는 핵심 강점을\n근거와 함께 제시합니다" },
  "회사소개 · 연혁": { subject: "기업 연혁", title: "기술 기업의 성장 과정을\n시기별로 보여줍니다" },
  "사업 · Space": { subject: "적용 분야", title: "제품이 활용되는 주요 분야를\n한눈에 소개합니다" },
  "제품 · 목록": { subject: "제품 탐색", title: "제품을 분야별로 나눠\n빠르게 찾게 합니다" },
  "제품 · 상세": { subject: "제품 상세 정보", title: "제품 특징과 사양을\n한 화면에서 확인합니다" },
  "ESG · 사회공헌 갤러리": { subject: "사회공헌 활동", title: "사회공헌 활동과 성과를\n진정성 있게 전합니다" },
  "ESG · 윤리규범": { subject: "윤리경영 원칙", title: "윤리경영 기준과 실천 원칙을\n명확하게 안내합니다" },
  "채용 · 상시채용": { subject: "상시채용", title: "직무 정보부터 지원 요건까지\n쉽게 확인합니다" },

  "홈 · Origin 장면": { subject: "브랜드 역사", title: "브랜드의 시작과 역사를\n인상적인 흐름으로 전합니다" },
  "홈 · Line Up": { subject: "제품군", title: "주요 제품군과 특징을\n한눈에 비교합니다" },
  "개요 · VISION": { subject: "기업 비전", title: "기업의 비전과 목표를\n명확하게 전달합니다" },
  "공작기계사업 · 기술 철학": { subject: "기술 철학", title: "제품을 만드는 기술 철학과\n품질 기준을 설명합니다" },
  "제품 · 목록 · 필터": { subject: "조건별 제품 검색", title: "조건에 맞는 제품을\n빠르게 찾게 합니다" },
  "제품 · 상세 문의": { subject: "제품 문의", title: "제품을 확인한 자리에서\n바로 문의할 수 있습니다" },
  "제품 · 자동화 솔루션": { subject: "자동화 솔루션", title: "자동화 솔루션의 적용 방식과\n기대 효과를 보여줍니다" },
  "사업소 · 대리점 · 서비스센터": { subject: "서비스 네트워크", title: "가까운 사업소와 서비스센터를\n빠르게 찾게 합니다" },
  인재채용: { subject: "인재채용", title: "인재상과 채용 정보를\n체계적으로 안내합니다" },
  "미디어 · 비디오 갤러리": { subject: "영상 자료", title: "제품과 기술을 영상으로\n더 생생하게 전달합니다" },

  "홈 · About Us": { subject: "기업 소개", title: "기업의 정체성과 핵심 가치를\n인상적으로 소개합니다" },
  "홈 · R&D": { subject: "연구개발", title: "연구개발 역량과 주요 분야를\n신뢰감 있게 보여줍니다" },
  "홈 · 사회공헌": { subject: "사회공헌", title: "사회공헌 활동과 브랜드 가치를\n함께 전달합니다" },
  "홈 · 고객지원": { subject: "고객지원", title: "고객이 필요한 도움을\n빠르게 찾게 합니다" },
  "회사소개 · INNOVATION": { subject: "혁신 제품", title: "대표 혁신 제품으로\n기업 경쟁력을 보여줍니다" },
  "회사소개 · GROWTH": { subject: "성장 성과", title: "주요 성과와 수치로\n지속적인 성장을 증명합니다" },
  "브랜드 · 목록": { subject: "브랜드 구성", title: "브랜드별 제품과 특징을\n한눈에 비교합니다" },
  "브랜드 · 균형영양식": { subject: "균형영양식", title: "고객 상황에 맞는 제품을\n쉽게 선택하게 합니다" },
  "R&D 성과": { subject: "연구개발 성과", title: "특허와 연구 성과로\n기술 경쟁력을 보여줍니다" },
  "가치체계 · 행동약속": { subject: "행동약속", title: "구성원이 지키는 행동 원칙을\n명확하게 전합니다" },

  "홈 · Global Network": { subject: "글로벌 사업 역량", title: "글로벌 사업 규모와 성과를\n한눈에 보여줍니다" },
  "홈 · Sustainability": { subject: "지속가능경영", title: "지속가능경영 목표와 성과를\n구체적으로 제시합니다" },
  "홈 · Invest Relations": { subject: "투자정보", title: "주요 경영정보와 일정을\n빠르게 확인합니다" },
  "주요사업 · 헬스케어": { subject: "헬스케어 사업", title: "헬스케어 사업의 강점과\n성장 방향을 소개합니다" },
  "글로벌 네트워크": { subject: "글로벌 네트워크", title: "해외 법인과 사업 거점을\n지도에서 확인합니다" },
  "IR 개요 · 신용등급과 보고서": { subject: "신용등급·경영보고서", title: "투자 판단에 필요한 자료를\n체계적으로 제공합니다" },
  "채용가이드 · 직무 인터뷰": { subject: "직무 인터뷰", title: "실제 구성원의 이야기로\n직무 이해를 돕습니다" },
  개인정보처리방침: { subject: "개인정보 처리 기준", title: "개인정보 처리 기준을\n명확하게 안내합니다" },

  "메인 · 매물 종류와 부동산 소식": { subject: "매물 빠른 검색", title: "원하는 매물 유형부터\n빠르게 선택합니다" },
  "메인 · 기능 소개 슬라이드": { subject: "서비스 강점", title: "중개 서비스의 주요 강점을\n쉽게 이해합니다" },
  "매물 찾기 · 지도와 목록": { subject: "지도 기반 매물 검색", title: "지도와 목록을 함께 보며\n매물을 빠르게 찾습니다" },
  "매물 상세 · 사진과 조건표": { subject: "매물 상세 정보", title: "사진과 주요 조건을\n한 화면에서 비교합니다" },
  "부동산 소식 · 카드 목록": { subject: "부동산 소식", title: "유용한 부동산 정보로\n재방문을 유도합니다" },
  "소식 본문": { subject: "부동산 정보 상세", title: "핵심 내용을 정리해\n읽기 쉽게 전달합니다" },

  "메인 · 이번 주 추천 매물": { subject: "추천 매물", title: "주목할 만한 매물을\n첫 화면에서 소개합니다" },
  "메인 · 회원 안내": { subject: "회원 전용 정보", title: "회원에게 제공되는 혜택과\n이용 방식을 안내합니다" },
  "메인 · 분양 라인업": { subject: "분양 정보", title: "분양 일정과 주요 조건을\n미리 확인합니다" },
  "메인 · 담당 중개사": { subject: "담당 중개사", title: "담당자의 얼굴과 경력으로\n상담 신뢰를 높입니다" },
  "매물 찾기 · 조건 바와 카드": { subject: "조건별 매물 검색", title: "원하는 조건에 맞는 매물을\n빠르게 걸러 봅니다" },
  "매물 상세 · 갤러리와 조건표": { subject: "회원 전용 매물 상세", title: "매물 정보와 공개 범위를\n명확하게 구분합니다" },
  "의뢰하기 · 탭별 입력 칸": { subject: "매물 의뢰", title: "매물 유형에 맞춰\n간편하게 의뢰합니다" },

  "메인 · 장점 카드와 회원 혜택": { subject: "서비스 장점·회원 혜택", title: "서비스 장점과 회원 혜택을\n첫 화면에서 확인합니다" },
  "메인 · 지역과 편의 아이콘": { subject: "이용 지역·편의 서비스", title: "이용 가능 지역과 편의 서비스를\n한눈에 안내합니다" },
  "메인 · 공항과 기차역 차고지": { subject: "공항·기차역 차고지", title: "도착지에서 가까운 차고지를\n빠르게 찾게 합니다" },
  "차 빌리기 · 목록과 지도": { subject: "차량·지도 검색", title: "차량과 위치를 함께 비교해\n대여 장소를 선택합니다" },
  "차량 안내 · 사진과 예약 상자": { subject: "차량 상세·예약", title: "차량 정보를 확인하면서\n바로 예약을 시작합니다" },
  "차량 안내 · 요금표": { subject: "차량 요금표", title: "평일과 주말 요금을\n명확하게 비교합니다" },
  "메인 · 여행 추천과 활용 팁": { subject: "여행 추천·이용 팁", title: "차량 이용에 도움이 되는\n여행 정보까지 제공합니다" },
  "블로그 본문 · 코스 목록과 강조 상자": { subject: "여행 콘텐츠", title: "여행 코스와 이용 팁을\n읽기 쉽게 전달합니다" },

  "메인 · 배너 슬라이드와 예약 위젯": { subject: "차량 빠른 예약", title: "첫 화면에서 조건을 고르고\n바로 예약을 시작합니다" },
  "메인 · 서비스 바로가기": { subject: "주요 서비스", title: "자주 찾는 서비스를\n한 번에 이용합니다" },
  "메인 · 매거진": { subject: "렌터카 매거진", title: "차량 선택에 도움이 되는\n정보를 제공합니다" },
  "차량 예약 · 조건 바와 차종 거르기": { subject: "조건별 차량 검색", title: "조건과 차종에 맞는 차량을\n빠르게 찾습니다" },
  "견적 내기 · 선택과 예상 금액": { subject: "실시간 견적", title: "선택한 조건에 따른 예상 금액을\n바로 확인합니다" },
  "상품 안내 · 상품 카드": { subject: "렌터카 상품", title: "이용 목적에 맞는 상품을\n쉽게 비교합니다" },
  "상품 안내 · 포함 항목 비교표": { subject: "상품별 포함 항목", title: "상품별 포함 항목과 차이를\n명확하게 비교합니다" },
  "이용 안내 · 목차와 표": { subject: "렌터카 이용 안내", title: "예약부터 반납까지\n순서대로 안내합니다" },

  "홈 · 서비스": { subject: "웨딩 서비스", title: "필요한 웨딩 서비스를\n한눈에 비교합니다" },
  "홈 · 진행 안내 1단계": { subject: "웨딩 준비 절차", title: "웨딩 준비 과정을\n순서대로 안내합니다" },
  "홈 · 진행 안내 3단계": { subject: "단계별 진행 안내", title: "단계마다 필요한 준비 사항을\n쉽게 이해합니다" },
  "홈 · 블로그 · 후기": { subject: "블로그·고객 후기", title: "실제 후기와 유용한 정보로\n상담 신뢰를 높입니다" },
  "회사소개 · 블룸트래블": { subject: "브랜드 이야기", title: "브랜드가 시작된 배경과\n서비스 철학을 전합니다" },
  "서비스 목록 · 태그": { subject: "조건별 서비스 검색", title: "원하는 스타일의 서비스를\n빠르게 찾습니다" },
  "서비스 상세 · 소개": { subject: "서비스 상세 안내", title: "서비스 특징과 진행 방식을\n자세히 안내합니다" },
  "서비스 상세 · 포트폴리오": { subject: "웨딩 포트폴리오", title: "다양한 촬영 결과물로\n스타일을 확인합니다" },
  "서비스 상세 · 패키지": { subject: "웨딩 패키지", title: "패키지 구성과 차이를\n쉽게 비교합니다" },
  "홈 · FAQ": { subject: "자주 묻는 질문", title: "상담 전에 궁금한 내용을\n빠르게 해결합니다" },
};

const BENEFITS: { pattern: RegExp; copy: BenefitCopy }[] = [
  {
    pattern: /탭별 입력 칸|매물 의뢰/,
    copy: {
      title: () => "매물 의뢰\n상담 요청을 간편하게 받습니다",
      body: () =>
        "매물을 내놓거나 찾는 고객이 필요한 조건을 편리하게 남길 수 있도록 입력 항목을 구분하고, 접수 후 상담으로 이어지게 구성합니다.",
      items: ["의뢰 유형에 맞춘 입력 항목", "필수 조건을 빠짐없이 접수", "접수 내용 확인과 상담 연결"],
    },
  },
  {
    pattern: /지역.*편의|편의 아이콘/,
    copy: {
      title: () => "이용 지역과 편의 서비스\n한눈에 안내합니다",
      body: () =>
        "차량을 이용할 수 있는 지역과 제공 편의 서비스를 한곳에 정리해 고객이 예약 전에 필요한 정보를 빠르게 확인하도록 합니다.",
      items: ["이용 가능 지역을 명확하게 안내", "제공 편의 서비스를 아이콘으로 표시", "지역 선택에서 예약까지 연결"],
    },
  },
  {
    pattern: /태그/,
    copy: {
      title: () => "포트폴리오 분류\n원하는 사례를 빠르게 찾게 합니다",
      body: () =>
        "포트폴리오를 분야와 스타일에 따라 나눠 방문자가 관심 있는 사례만 빠르게 골라 보고 상세 내용을 확인하도록 합니다.",
      items: ["분야·스타일별 사례 분류", "관심 있는 결과물을 빠르게 탐색", "상세 사례와 상담 화면으로 연결"],
    },
  },
  {
    pattern: /개인정보처리방침/,
    copy: {
      title: () => "개인정보 처리 기준\n명확하게 안내합니다",
      body: () =>
        "개인정보의 수집 목적과 보관 기준, 이용자의 권리를 이해하기 쉽게 정리해 홈페이지 운영의 신뢰도를 높입니다.",
      items: ["수집 목적과 이용 항목 안내", "보관 기간과 이용자 권리 명시", "운영 정책에 맞춘 내용 변경"],
    },
  },
  {
    pattern: /\bMerit\b/,
    copy: {
      title: () => "핵심 강점\n한눈에 보여줍니다",
      body: () =>
        "브랜드가 선택받는 이유를 핵심 문장과 근거 자료로 정리해 방문자가 차별점을 빠르게 이해하도록 합니다.",
      items: ["브랜드의 핵심 강점 요약", "선택 근거를 읽기 쉽게 제시", "관련 서비스와 상세 정보로 연결"],
    },
  },
  {
    pattern: /사회공헌/,
    copy: {
      title: () => "사회공헌 활동\n진정성 있게 소개합니다",
      body: () =>
        "기업이 실천해 온 사회공헌 활동과 주요 성과를 이미지와 함께 보여 줘 책임 있는 브랜드 이미지를 전달합니다.",
      items: ["주요 활동과 성과를 체계적으로 정리", "현장 사진으로 진정성 전달", "지속가능경영 정보와 연결"],
    },
  },
  {
    pattern: /주요 단지|단지 전시|단지 카드/,
    copy: {
      title: () => "주요 개발 단지\n실제 사업 사례로 보여줍니다",
      body: () =>
        "대표 개발 단지의 이미지와 핵심 정보를 함께 보여 줘 사업 수행 경험과 공간의 특징을 직관적으로 확인하도록 합니다.",
      items: ["대표 개발 사례를 이미지로 강조", "단지별 핵심 정보 제공", "사업 소개와 문의 화면으로 연결"],
    },
  },
  {
    pattern: /\bSpace\b/,
    copy: {
      title: () => "공간과 시설\n이미지 중심으로 보여줍니다",
      body: () =>
        "주요 공간과 시설을 큰 이미지로 소개해 방문자가 규모와 분위기, 운영 환경을 직접 확인하도록 합니다.",
      items: ["주요 공간과 시설을 선명하게 소개", "사진별 핵심 정보 제공", "관련 사업과 상세 화면으로 연결"],
    },
  },
  {
    pattern: /윤리규범/,
    copy: {
      title: () => "윤리경영 원칙\n명확하게 안내합니다",
      body: () =>
        "기업이 지키는 윤리 기준과 실천 원칙을 체계적으로 정리해 책임 있는 경영 방침을 분명하게 전달합니다.",
      items: ["윤리 기준과 실천 원칙 정리", "구성원과 이해관계자에게 명확히 안내", "ESG·지속가능경영 정보와 연결"],
    },
  },
  {
    pattern: /R&D 성과/,
    copy: {
      title: () => "연구개발 성과\n기술 경쟁력을 보여줍니다",
      body: () =>
        "연구개발 과정과 주요 성과를 근거 자료와 함께 소개해 제품을 뒷받침하는 기술력과 성장 가능성을 전달합니다.",
      items: ["주요 연구 분야와 성과 소개", "제품 개발과의 연관성 안내", "기술·인증 자료로 자연스럽게 연결"],
    },
  },
  {
    pattern: /매물|분양|중개|조건표|회원 안내|의뢰하기|세대수/,
    copy: {
      title: (subject) => `${subject}\n비교하고 찾기 쉽게 구성합니다`,
      body: (subject) =>
        `${subject} 영역에 위치, 가격, 면적, 주요 조건을 보기 쉽게 정리해 방문자가 원하는 매물을 빠르게 비교하고 문의할 수 있도록 합니다.`,
      items: ["매물의 핵심 조건을 한눈에 비교", "검색·분류 기능으로 탐색 시간 단축", "관심 매물에서 문의 화면으로 연결"],
    },
  },
  {
    pattern: /차량|차종|차고지|렌터카|카셰어링|차 목록|차 빌리기|월 납입금/,
    copy: {
      title: (subject) => `${subject}에서\n차량 선택을 쉽게 합니다`,
      body: (subject) =>
        `${subject} 영역에 차종, 이용 조건, 요금, 대여 정보를 명확히 보여 줘 방문자가 원하는 차량을 빠르게 찾고 예약할 수 있도록 합니다.`,
      items: ["차종과 이용 조건을 한눈에 비교", "요금과 포함 항목을 명확하게 안내", "차량 선택에서 예약까지 연결"],
    },
  },
  {
    pattern: /글로벌|네트워크|IR|투자정보|경영지표|수주|파트너|사업장|신용등급/,
    copy: {
      title: (subject) => `${subject}\n기업 역량과 성과를 보여줍니다`,
      body: (subject) =>
        `${subject} 내용을 객관적인 수치와 근거 자료로 정리해 사업 규모, 성장성, 협력 역량을 신뢰감 있게 전달합니다.`,
      items: ["주요 성과와 사업 규모 강조", "수치와 근거 자료를 읽기 쉽게 정리", "투자자·고객·협력사에 신뢰 제공"],
    },
  },
  {
    pattern: /폼팩터|소재|라인업|Casting solution|펌프부품|NCM|LFP|균형영양식|브랜드 목록/,
    copy: {
      title: (subject) => `${subject}\n제품 특징 중심으로 소개합니다`,
      body: (subject) =>
        `${subject} 내용을 용도와 강점 중심으로 정리해 고객이 제품별 차이와 적용 분야를 쉽게 이해하도록 구성합니다.`,
      items: ["제품별 특징과 용도를 명확하게 안내", "사진과 핵심 설명으로 이해도 향상", "관련 기술·상담 화면으로 연결"],
    },
  },
  {
    pattern: /이미지 피드|작가 노트|작품|격자|크게 보기|전시/,
    copy: {
      title: (subject) => `${subject}\n작품 중심으로 보여줍니다`,
      body: (subject) =>
        `${subject} 내용을 이미지와 간결한 설명으로 구성해 작품의 분위기와 작가의 메시지에 자연스럽게 집중하도록 합니다.`,
      items: ["작품 이미지를 선명하고 크게 소개", "작가 의도와 작품 정보를 함께 제공", "전시·문의 정보로 자연스럽게 연결"],
    },
  },
  {
    pattern: /문의|예약|신청|지원서|전화|연락|상담|견적|가입|로그인|결제/,
    copy: {
      title: inquiryTitle,
      body: (subject) =>
        `${subject} 영역에 필요한 정보와 버튼을 명확히 배치해 방문자가 상담, 예약, 신청을 편리하게 남길 수 있도록 합니다. 실제 운영 절차에 맞춰 입력 항목과 접수 방식을 변경할 수 있습니다.`,
      items: ["상담·예약 경로를 명확하게 안내", "업무에 맞춘 입력 항목 구성", "이메일·문자 알림 기능 추가 가능"],
    },
  },
  {
    pattern: /질문|FAQ|자주 묻는/,
    copy: {
      title: (subject) => `${subject}\n고객의 궁금증을 해결합니다`,
      body: (subject) =>
        `${subject} 영역에 이용 전 자주 확인하는 내용을 정리해 반복 문의를 줄이고, 고객이 충분한 정보를 확인한 뒤 안심하고 연락할 수 있도록 돕습니다.`,
      items: ["자주 묻는 질문을 주제별로 정리", "답변을 펼쳐 읽는 간결한 구성", "상담 전에 필요한 정보 제공"],
    },
  },
  {
    pattern: /후기|리뷰|고객|성과|실적|수상|보증|숫자|지표|전후|신뢰/,
    copy: {
      title: (subject) => `${subject}\n브랜드 신뢰를 높입니다`,
      body: (subject) =>
        `${subject} 내용을 실제 경험과 성과 중심으로 보여 줘 처음 방문한 고객도 서비스의 품질과 운영 역량을 판단할 수 있도록 구성합니다.`,
      items: ["고객 후기와 실제 성과 강조", "신뢰를 높이는 근거 자료 제공", "실제 브랜드 자료에 맞게 변경 가능"],
    },
  },
  {
    pattern: /뉴스|소식|블로그|미디어|저널|자료|다운로드|이야기 본문|읽을거리|글과|매거진|브로슈어|카탈로그/,
    copy: {
      title: (subject) => `${subject}에서\n새 소식을 꾸준히 전달합니다`,
      body: (subject) =>
        `${subject} 콘텐츠를 한곳에 정리해 방문자가 최신 활동과 유용한 정보를 쉽게 확인하도록 합니다. 운영 방식에 따라 직접 등록하는 관리 기능도 연결할 수 있습니다.`,
      items: ["새로운 소식과 전문 정보 제공", "주제별 콘텐츠를 읽기 쉽게 정리", "관리자 등록 기능 추가 가능"],
    },
  },
  {
    pattern: /기술|특허|인증|연구|R&D|ESG|공정|설비|사양|품질|안전|기능 소개/,
    copy: {
      title: (subject) => `${subject}\n전문성과 기술력을 설명합니다`,
      body: (subject) =>
        `${subject} 내용을 핵심 설명과 이미지로 나누어 전문 지식이 없는 고객도 차별점과 적용 범위를 쉽게 이해할 수 있도록 구성합니다.`,
      items: ["핵심 기술과 장점을 간결하게 설명", "사진·도표를 활용한 이해도 향상", "인증·성과 자료와 자연스럽게 연결"],
    },
  },
  {
    pattern: /의료진|변호사|강사|트레이너|팀|직원|사람|채용|인재|구성원|조향사|담당/,
    copy: {
      title: (subject) => `${subject}에서\n전문가와 조직을 소개합니다`,
      body: (subject) =>
        `${subject} 내용을 사진과 전문 분야 중심으로 소개해 고객과 지원자가 구성원의 경험, 역할, 조직문화를 쉽게 확인하도록 합니다.`,
      items: ["전문가와 구성원의 역할 소개", "경력·전문 분야를 보기 쉽게 정리", "채용과 조직문화 정보로 연결"],
    },
  },
  {
    pattern: /오시는 길|지도|매장|지역|지점|영업시간|장소/,
    copy: {
      title: (subject) => `${subject}에서\n방문 정보를 빠르게 안내합니다`,
      body: (subject) =>
        `${subject} 영역에 위치, 운영시간, 이동 방법 등 방문 전 필요한 정보를 모아 고객이 헤매지 않고 목적지와 이용 방법을 확인하도록 합니다.`,
      items: ["주소와 운영시간을 명확하게 안내", "지도·길찾기 기능 연결 가능", "지점과 서비스 지역별 정보 제공"],
    },
  },
  {
    pattern: /과정|진행|단계|커리큘럼|이용 안내|하루|방식/,
    copy: {
      title: (subject) => `${subject}\n알기 쉽게 보여줍니다`,
      body: (subject) =>
        `${subject} 내용을 순서에 맞게 정리해 처음 이용하는 고객도 준비 사항과 진행 과정을 미리 이해할 수 있도록 구성합니다.`,
      items: ["신청부터 완료까지 단계별 안내", "고객이 준비할 내용을 미리 제공", "실제 업무 절차에 맞게 변경 가능"],
    },
  },
  {
    pattern: /가격|요금|수강권|상품|패키지|비용|메뉴판|전체 메뉴|특가|혜택|납입금/,
    copy: {
      title: (subject) => `${subject}에서\n가격과 선택 기준을 안내합니다`,
      body: (subject) =>
        `${subject} 정보를 비교하기 쉬운 형태로 정리해 고객이 자신에게 맞는 상품과 서비스를 빠르게 선택하도록 돕습니다.`,
      items: ["가격과 포함 항목을 한눈에 비교", "상품별 차이와 추천 대상 안내", "상담·예약 화면으로 바로 연결"],
    },
  },
  {
    pattern: /작업|시공|포트폴리오|갤러리|납품|프로젝트|단지|전시|결과물|사례/,
    copy: {
      title: (subject) => `${subject}\n실제 결과물을 보여줍니다`,
      body: (subject) =>
        `${subject} 콘텐츠를 큰 이미지와 핵심 설명으로 보여 줘 방문자가 작업 품질과 스타일, 수행 범위를 직접 판단할 수 있도록 합니다.`,
      items: ["대표 사례와 결과물을 시각적으로 강조", "프로젝트별 핵심 정보 제공", "상세 화면과 상담으로 자연스럽게 연결"],
    },
  },
  {
    pattern: /소개|비전|철학|연혁|약속|이유|선언문|브랜드|가치|Origin|About|VISION|이야기 문장/,
    copy: {
      title: (subject) => `${subject}\n브랜드 방향성을 전달합니다`,
      body: (subject) =>
        `${subject} 내용을 브랜드의 언어와 이미지로 풀어 방문자가 브랜드의 가치, 강점, 운영 철학을 자연스럽게 기억하도록 구성합니다.`,
      items: ["브랜드 이야기와 핵심가치 강조", "차별점을 이해하기 쉬운 흐름", "회사 소개와 주요 성과로 연결"],
    },
  },
  {
    pattern: /서비스|사업|솔루션|진료|치료|강의|메뉴|객실|제품|컬렉션|활동|업무 분야|차량|차 빌리기|클래스|과정/,
    copy: {
      title: (subject) => `${subject}\n한눈에 비교합니다`,
      body: (subject) =>
        `${subject} 영역에서 제공하는 서비스와 상품의 특징을 직관적으로 비교하고, 필요한 상세 정보까지 자연스럽게 확인하도록 구성합니다.`,
      items: ["핵심 서비스와 상품을 한눈에 확인", "특징·대상·이용 방법을 함께 안내", "상세 정보와 문의 화면으로 연결"],
    },
  },
];

const FALLBACK_BENEFIT: BenefitCopy = {
  title: (subject) => `${subject}\n쉽게 이해하도록 보여줍니다`,
  body: (subject) =>
    `${subject} 영역을 이미지와 핵심 문장 중심으로 구성해 방문자가 중요한 내용을 빠르게 이해하고 브랜드를 기억하도록 합니다.`,
  items: ["중요한 정보를 한눈에 확인", "브랜드 분위기에 맞춘 화면 구성", "PC·모바일에서 편리하게 이용"],
};

function cleanLabel(value: string): string {
  return value
    .replace(/\bUI\b/gi, "화면")
    .replace(/\bPDF\b/gi, "자료")
    .replace(/\bHTML\b/gi, "페이지")
    .replace(/\bJPG\b/gi, "사진")
    .replace(/\s+/g, " ")
    .trim();
}

function subjectOf(caption: string): string {
  const cleaned = cleanLabel(caption);
  return cleaned.split("·").at(-1)?.trim() || "주요 콘텐츠";
}

function pointCaption(caption: string, subject: string): string {
  const section = caption.split("·")[0]?.trim();
  return section && section !== caption ? `${section} · ${subject}` : subject;
}

function inquiryTitle(subject: string): string {
  if (/문의|상담|견적|연락/.test(subject)) return `${subject}\n상담 요청을 간편하게 받습니다`;
  if (/지원서|신청|가입/.test(subject)) return `${subject}\n신청을 간편하게 받습니다`;
  if (/예약|결제/.test(subject)) return `${subject}\n예약을 간편하게 받습니다`;
  return `${subject}\n문의·예약을 간편하게 받습니다`;
}

function benefitFor(text: string): BenefitCopy {
  return BENEFITS.find(({ pattern }) => pattern.test(text))?.copy ?? FALLBACK_BENEFIT;
}

function sectionCopy(name: string, source = ""): { desc: string; items: [string, string, string] } {
  const text = `${name} ${source}`;

  if (/홈|메인|첫 화면/.test(name)) {
    return {
      desc: "브랜드의 핵심 서비스와 강점을 첫 화면에서 빠르게 파악하고 주요 정보로 이동할 수 있도록 구성했습니다.",
      items: ["대표 서비스와 브랜드 강점 강조", "주요 콘텐츠로 빠르게 이동", "문의 화면으로 자연스럽게 연결"],
    };
  }
  if (/문의|예약|신청|지원서|견적/.test(text)) {
    return {
      desc: "방문자가 필요한 내용을 확인한 뒤 편리하게 상담, 예약, 신청을 남길 수 있도록 구성했습니다.",
      items: ["업무에 맞춘 문의 항목", "담당자 연락처와 이용 안내", "이메일·문자 알림 기능 추가 가능"],
    };
  }
  if (/소개|개요|비전|연혁|철학|회사/.test(text)) {
    return {
      desc: "브랜드의 이야기와 전문성, 성장 과정을 체계적으로 전달해 회사에 대한 신뢰를 높입니다.",
      items: ["브랜드 이야기와 핵심가치", "주요 성과와 성장 과정", "실제 브랜드 자료에 맞춘 내용 변경"],
    };
  }
  if (/사업|서비스|제품|진료|치료|강의|과정|객실|메뉴|상품|차량/.test(text)) {
    return {
      desc: "제공하는 서비스와 상품의 특징, 이용 대상, 선택 기준을 고객이 이해하기 쉽게 안내합니다.",
      items: ["핵심 특징과 장점 요약", "상품·서비스별 상세 정보", "문의·예약 화면으로 연결"],
    };
  }
  if (/작업|시공|포트폴리오|갤러리|사례|상세|단지|전시/.test(text)) {
    return {
      desc: "대표 결과물과 상세 정보를 함께 보여 줘 고객이 품질과 스타일을 직접 확인할 수 있습니다.",
      items: ["대표 이미지와 핵심 설명", "프로젝트·상품별 상세 정보", "관련 서비스와 상담 연결"],
    };
  }
  if (/뉴스|소식|블로그|미디어|자료|저널|보도/.test(text)) {
    return {
      desc: "새로운 소식과 전문 자료를 주제별로 정리해 방문자가 필요한 정보를 쉽게 찾을 수 있습니다.",
      items: ["최신 소식과 전문 정보 제공", "주제별 콘텐츠 분류", "관리자 등록 기능 추가 가능"],
    };
  }
  if (/채용|인재|팀|직원|강사|의료진|변호사/.test(text)) {
    return {
      desc: "구성원의 전문성과 조직문화를 소개해 고객 신뢰와 채용 브랜드를 함께 높입니다.",
      items: ["전문가와 구성원 소개", "경력·역할·조직문화 안내", "채용 정보와 지원 화면 연결"],
    };
  }
  if (/인증|특허|연구|R&D|ESG|공정|설비/.test(text)) {
    return {
      desc: "보유 기술과 인증, 연구 성과를 체계적으로 정리해 기업의 전문성과 공신력을 보여 줍니다.",
      items: ["핵심 기술과 연구 성과", "인증·특허 자료 안내", "전문 정보를 읽기 쉽게 구성"],
    };
  }

  return {
    desc: `${cleanLabel(name)}에 필요한 핵심 정보를 읽기 쉬운 흐름으로 정리해 방문자가 원하는 내용을 빠르게 확인할 수 있습니다.`,
    items: ["핵심 정보 중심의 간결한 구성", "브랜드 자료에 맞춘 내용 변경", "관련 화면과 자연스럽게 연결"],
  };
}

function listNames(study: CaseStudy): string {
  const names = (study.pages ?? study.flow ?? []).map((item) => item.name);
  if (names.length <= 7) return names.join(" · ");
  return `${names.slice(0, 7).join(" · ")} 등`;
}

function customerProfile(industry: string): {
  journey: string;
  managedContent: string;
  inquiryLabel: string;
} {
  if (/작가|아티스트/.test(industry)) {
    return {
      journey: "작품 감상부터 전시·작품 문의까지 자연스럽게 이어집니다",
      managedContent: "작품, 전시 일정, 작가 노트",
      inquiryLabel: "작품·전시 문의",
    };
  }
  if (/부동산/.test(industry)) {
    return {
      journey: "매물 검색부터 상세 확인, 상담·의뢰까지 자연스럽게 이어집니다",
      managedContent: "매물, 분양 정보, 부동산 소식",
      inquiryLabel: "매물 문의·의뢰",
    };
  }
  if (/렌터카|카셰어링/.test(industry)) {
    return {
      journey: "차량 비교부터 견적 확인과 예약까지 자연스럽게 이어집니다",
      managedContent: "차량, 요금, 예약 정보, 공지사항",
      inquiryLabel: "차량 견적·예약",
    };
  }
  if (/웨딩/.test(industry)) {
    return {
      journey: "서비스와 포트폴리오 확인부터 상담·일정 문의까지 자연스럽게 이어집니다",
      managedContent: "웨딩 서비스, 포트폴리오, 후기, 블로그",
      inquiryLabel: "웨딩 상담·일정 문의",
    };
  }
  return {
    journey: "기업과 제품을 충분히 이해한 뒤 견적·사업 문의까지 자연스럽게 이어집니다",
    managedContent: "기업 소식, 제품, 실적, 자료실 콘텐츠",
    inquiryLabel: "견적·사업 문의",
  };
}

export function toCustomerFacingCaseStudy(study: CaseStudy): CaseStudy {
  if (study.customerCopyReady) return study;

  const sections = listNames(study);
  const industry = study.headline.replace(/\s*홈페이지$/, "");
  const multiPage = Boolean(study.pages?.length);
  const profile = customerProfile(industry);

  return {
    ...study,
    summary: `${industry}의 강점과 주요 정보를 효과적으로 전달하는 프리미엄 홈페이지입니다. ${sections} 주요 화면을 갖춰 ${profile.journey}.`,
    overview: `${study.brand} 디자인은 ${industry} 분야의 전문성과 신뢰를 효과적으로 보여 주는 데 초점을 맞췄습니다. 방문자가 브랜드의 강점과 주요 내용, 선택에 필요한 정보를 자연스럽게 이해하도록 정보의 순서를 구성했습니다.\n\n${multiPage ? "주요 내용을 목적별 화면으로 나누어 필요한 정보를 빠르게 찾을 수 있습니다." : "한 페이지 안에서 소개부터 서비스, 신뢰 정보, 문의까지 자연스럽게 이어집니다."} 회사명, 색상, 사진, 메뉴, 문구는 실제 브랜드와 운영 방식에 맞게 변경하며 PC·태블릿·모바일에서 편리하게 이용할 수 있도록 제작합니다.\n\n화면에 표시된 회사명, 인물, 작품, 상품, 가격, 실적 등은 디자인 구성을 보여 주기 위한 예시입니다.`,
    meta: [
      { label: "적합 업종", value: industry },
      { label: "주요 구성", value: sections },
      { label: "맞춤 적용", value: "브랜드 색상 · 메뉴 · 사진 · 문구 · 문의 기능 변경 가능" },
    ],
    pagesLabel: multiPage ? "PREVIEW" : study.pagesLabel,
    pagesTitle: multiPage ? "주요 화면 미리보기" : study.pagesTitle,
    pages: study.pages?.map((page) => {
      const copy = sectionCopy(page.name, page.desc);
      return { ...page, desc: copy.desc, items: [...copy.items] };
    }),
    flowLabel: study.flow?.length ? "PAGE FLOW" : study.flowLabel,
    flowTitle: study.flow?.length ? "고객이 정보를 확인하는 흐름" : study.flowTitle,
    flow: study.flow?.map((section) => ({
      ...section,
      desc: sectionCopy(section.name, section.desc).desc,
    })),
    points: study.points.map((point) => {
      const caption = cleanLabel(point.caption);
      const override = POINT_OVERRIDES[caption];
      const subject = override?.subject ?? subjectOf(caption);
      const benefit = benefitFor(`${point.title} ${caption} ${subject}`);
      return {
        ...point,
        title: override?.title ?? benefit.title(subject),
        body: benefit.body(subject),
        items: [...benefit.items],
        caption: override ? pointCaption(caption, subject) : caption,
      };
    }),
    detailsLabel: "SCOPE",
    detailsTitle: "제작 범위 및 지원 항목",
    details: [
      {
        title: multiPage ? "소개부터 문의까지 이어지는 다중 페이지 구성" : "핵심 정보를 한 페이지에 연결한 구성",
        body: `${sections} 주요 화면을 고객이 정보를 확인하는 순서에 맞춰 구성합니다.`,
      },
      {
        title: "PC·태블릿·모바일 반응형 제작",
        body: "접속하는 기기의 화면 크기에 맞춰 메뉴, 이미지, 본문이 편리하게 보이도록 구성합니다.",
      },
      {
        title: "브랜드 색상·메뉴·콘텐츠 맞춤 적용",
        body: "회사명과 색상부터 메뉴, 문구, 사진, 서비스 내용까지 실제 브랜드와 자료에 맞게 변경합니다.",
      },
      {
        title: "업종에 필요한 핵심 화면과 콘텐츠 제공",
        body: "서비스 소개, 신뢰 정보, 소식, 이용 안내, 문의 등 업종과 운영 목적에 필요한 내용을 제공합니다.",
      },
      {
        title: "문의 접수와 관리자 기능 추가 가능",
        body: "문의 알림, 소식 등록, 자료 관리 등 운영에 필요한 기능은 상담을 통해 범위를 정한 뒤 연결할 수 있습니다.",
      },
      {
        title: "도메인·호스팅·유지보수 지원",
        body: "홈페이지 공개에 필요한 도메인과 호스팅을 지원하고, 운영 중 필요한 유지보수 범위도 함께 안내합니다.",
      },
    ],
    mobile: {
      ...study.mobile,
      title: "PC·태블릿·모바일에 맞춰 편리하게 보입니다",
      body: `작은 화면에서도 핵심 정보와 서비스 내용을 편하게 확인하고 ${profile.inquiryLabel}까지 자연스럽게 이어지도록 구성합니다.`,
      shots: study.mobile.shots.map((shot) => ({ ...shot, caption: cleanLabel(shot.caption) })),
    },
    faq: [
      {
        q: "우리 브랜드의 메뉴와 내용에 맞게 변경할 수 있나요?",
        a: "네. 회사명, 브랜드 색상, 메뉴, 문구, 사진, 서비스 내용을 실제 회사·브랜드 자료와 원하는 구성에 맞춰 변경합니다.",
      },
      {
        q: "사진과 문구도 함께 제작해 주나요?",
        a: "보유한 브랜드 자료와 사진을 우선 활용하며, 필요한 경우 업종과 브랜드 방향에 맞춘 이미지와 문구를 새로 구성합니다.",
      },
      {
        q: "관리자가 직접 관리할 수 있는 내용은 무엇인가요?",
        a: `가능합니다. ${profile.managedContent}처럼 자주 바뀌는 내용을 직접 관리할 수 있도록 관리자 기능을 추가할 수 있으며 세부 범위는 상담 후 정합니다.`,
      },
      {
        q: `${profile.inquiryLabel} 접수 내용을 이메일 또는 문자로 받을 수 있나요?`,
        a: `${profile.inquiryLabel} 기능을 연결하면 담당자 이메일이나 문자로 알림을 받을 수 있습니다. 알림 방식과 수신 담당자는 업무 흐름에 맞춰 설정합니다.`,
      },
      {
        q: "제작 기간과 비용은 어떻게 정해지나요?",
        a: "프리미엄 디자인은 부가세 별도 300만원부터이며, 도메인 1개가 포함됩니다. 정확한 기간과 비용은 페이지 구성, 관리자 기능, 제공 자료를 확인한 뒤 안내합니다.",
      },
      {
        q: "도메인·호스팅·유지보수도 지원하나요?",
        a: "네. 홈페이지 공개에 필요한 도메인과 호스팅을 지원하며, 공개 후 유지보수 범위와 운영 방법도 함께 안내합니다.",
      },
    ],
  };
}
