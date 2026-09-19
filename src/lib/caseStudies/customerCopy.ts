import type { CaseStudy } from "./types";

type BenefitCopy = {
  title: (subject: string) => string;
  body: (subject: string) => string;
  items: [string, string, string];
};

const BENEFITS: { pattern: RegExp; copy: BenefitCopy }[] = [
  {
    pattern: /문의|예약|신청|지원서|전화|연락|상담|견적|가입|로그인|결제/,
    copy: {
      title: (subject) => `${subject}에서\n상담 행동으로 연결합니다`,
      body: (subject) =>
        `${subject} 영역에서 방문자가 다음 행동을 고민하지 않도록 필요한 정보와 버튼을 명확하게 제공합니다. 상담, 예약, 신청 방식은 실제 운영 절차에 맞게 변경할 수 있습니다.`,
      items: ["상담·예약 경로를 명확하게 안내", "업무에 맞춘 입력 항목 구성", "이메일·문자 알림 기능 추가 가능"],
    },
  },
  {
    pattern: /질문|FAQ|자주 묻는/,
    copy: {
      title: (subject) => `${routeParticle(subject)}\n고객의 궁금증을 해결합니다`,
      body: (subject) =>
        `${subject} 영역에 이용 전 자주 확인하는 내용을 정리해 반복 문의를 줄이고, 고객이 충분한 정보를 확인한 뒤 안심하고 연락할 수 있도록 돕습니다.`,
      items: ["자주 묻는 질문을 주제별로 정리", "답변을 펼쳐 읽는 간결한 구성", "상담 전에 필요한 정보 제공"],
    },
  },
  {
    pattern: /후기|리뷰|고객|성과|실적|파트너|수상|보증|숫자|지표|전후|신뢰/,
    copy: {
      title: (subject) => `${routeParticle(subject)}\n선택에 필요한 신뢰를 높입니다`,
      body: (subject) =>
        `${subject} 내용을 실제 경험과 성과 중심으로 보여 줘 처음 방문한 고객도 서비스의 품질과 운영 역량을 판단할 수 있도록 구성합니다.`,
      items: ["고객 후기와 실제 성과 강조", "신뢰를 높이는 근거 자료 제공", "기업·매장 자료에 맞게 변경 가능"],
    },
  },
  {
    pattern: /뉴스|소식|블로그|미디어|저널|자료|다운로드|이야기 본문|읽을거리|글과/,
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
      title: (subject) => `${routeParticle(subject)}\n전문성과 기술력을 설명합니다`,
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
    pattern: /오시는 길|지도|사업장|매장|지역|차고지|네트워크|지점|영업시간|장소/,
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
      title: (subject) => `${objectParticle(subject)}\n단계별로 쉽게 안내합니다`,
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
      title: (subject) => `${routeParticle(subject)}\n실제 결과물을 보여줍니다`,
      body: (subject) =>
        `${subject} 콘텐츠를 큰 이미지와 핵심 설명으로 보여 줘 방문자가 작업 품질과 스타일, 수행 범위를 직접 판단할 수 있도록 합니다.`,
      items: ["대표 사례와 결과물을 시각적으로 강조", "프로젝트별 핵심 정보 제공", "상세 화면과 상담으로 자연스럽게 연결"],
    },
  },
  {
    pattern: /소개|비전|철학|연혁|약속|이유|선언문|브랜드|가치|Origin|About|이야기 문장/,
    copy: {
      title: (subject) => `${routeParticle(subject)}\n브랜드 방향성을 전달합니다`,
      body: (subject) =>
        `${subject} 내용을 브랜드의 언어와 이미지로 풀어 방문자가 회사와 매장의 가치, 강점, 운영 철학을 자연스럽게 기억하도록 구성합니다.`,
      items: ["브랜드 이야기와 핵심가치 강조", "차별점을 이해하기 쉬운 흐름", "회사 소개와 주요 성과로 연결"],
    },
  },
  {
    pattern: /서비스|사업|솔루션|진료|치료|강의|메뉴|객실|제품|컬렉션|활동|업무 분야|차량|차 빌리기|클래스|과정/,
    copy: {
      title: (subject) => `${subject}에서\n서비스를 한눈에 비교합니다`,
      body: (subject) =>
        `${subject} 영역에서 제공하는 서비스와 상품의 특징을 직관적으로 비교하고, 필요한 상세 정보까지 자연스럽게 확인하도록 구성합니다.`,
      items: ["핵심 서비스와 상품을 한눈에 확인", "특징·대상·이용 방법을 함께 안내", "상세 정보와 문의 화면으로 연결"],
    },
  },
];

const FALLBACK_BENEFIT: BenefitCopy = {
  title: (subject) => `${routeParticle(subject)}\n핵심 메시지를 전달합니다`,
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

function hasFinalConsonant(value: string): boolean {
  const last = value.trim().at(-1);
  if (!last) return false;
  const code = last.charCodeAt(0) - 0xac00;
  return code >= 0 && code <= 11171 && code % 28 !== 0;
}

function routeParticle(value: string): string {
  const last = value.trim().at(-1);
  if (!last || last < "가" || last > "힣") return `${value}로`;
  const finalCode = (last.charCodeAt(0) - 0xac00) % 28;
  return `${value}${finalCode !== 0 && finalCode !== 8 ? "으로" : "로"}`;
}

function objectParticle(value: string): string {
  const last = value.trim().at(-1);
  if (!last || last < "가" || last > "힣") return `${value}를`;
  return `${value}${hasFinalConsonant(value) ? "을" : "를"}`;
}

function benefitFor(text: string): BenefitCopy {
  return BENEFITS.find(({ pattern }) => pattern.test(text))?.copy ?? FALLBACK_BENEFIT;
}

function sectionCopy(name: string, source = ""): { desc: string; items: [string, string, string] } {
  const text = `${name} ${source}`;

  if (/홈|메인|첫 화면/.test(name)) {
    return {
      desc: "브랜드의 핵심 서비스와 강점을 첫 화면에서 빠르게 파악하고 주요 정보로 이동할 수 있도록 구성했습니다.",
      items: ["대표 서비스와 브랜드 강점 강조", "주요 콘텐츠로 빠르게 이동", "상담·예약 화면으로 자연스럽게 연결"],
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
      items: ["브랜드 이야기와 핵심가치", "주요 성과와 성장 과정", "기업 자료에 맞춘 내용 변경"],
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
  return `${names.slice(0, 7).join(" · ")} 외`;
}

export function toCustomerFacingCaseStudy(study: CaseStudy): CaseStudy {
  if (study.customerCopyReady) return study;

  const sections = listNames(study);
  const industry = study.headline.replace(/\s*홈페이지$/, "");
  const multiPage = Boolean(study.pages?.length);

  return {
    ...study,
    summary: `${study.headline}에 필요한 핵심 정보와 고객 행동을 한 흐름으로 연결한 프리미엄 디자인입니다. ${sections}까지 방문자가 궁금해하는 내용을 빠르게 확인하고 문의로 이어지도록 구성했습니다.`,
    overview: `${study.brand} 디자인은 ${industry} 업종의 전문성과 신뢰를 효과적으로 보여 주는 데 초점을 맞췄습니다. 방문자가 브랜드의 강점과 주요 서비스, 선택 기준을 자연스럽게 이해하도록 정보의 순서를 설계했습니다.\n\n${multiPage ? "주요 내용을 목적별 화면으로 나누어 필요한 정보를 빠르게 찾을 수 있습니다." : "한 페이지 안에서 소개부터 서비스, 신뢰 정보, 문의까지 자연스럽게 이어집니다."} 회사명, 색상, 사진, 메뉴, 문구는 실제 브랜드와 운영 방식에 맞게 변경하며 PC·태블릿·모바일에서 편리하게 이용할 수 있도록 제작합니다.\n\n${study.brand}와 화면에 표시된 인물, 상품, 가격, 실적은 디자인 구성을 보여 주기 위한 예시입니다.`,
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
      const subject = subjectOf(caption);
      const benefit = benefitFor(`${point.title} ${caption}`);
      return {
        ...point,
        title: benefit.title(subject),
        body: benefit.body(subject),
        items: [...benefit.items],
        caption,
      };
    }),
    detailsLabel: "SCOPE",
    detailsTitle: "제작 범위 및 지원 항목",
    details: [
      {
        title: multiPage ? "핵심 메뉴와 고객 여정을 갖춘 다중 페이지 구성" : "핵심 정보를 한 페이지에 연결한 구성",
        body: `${sections} 등 고객이 확인해야 할 내용을 목적과 흐름에 맞춰 구성합니다.`,
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
      body: "작은 화면에서도 핵심 내용과 가격, 위치, 이용 방법을 쉽게 확인하고 상담이나 예약까지 자연스럽게 이어지도록 구성합니다.",
      shots: study.mobile.shots.map((shot) => ({ ...shot, caption: cleanLabel(shot.caption) })),
    },
    faq: [
      {
        q: "우리 브랜드의 메뉴와 내용에 맞게 변경할 수 있나요?",
        a: "네. 회사명, 브랜드 색상, 메뉴, 문구, 사진, 서비스 내용을 실제 운영 자료와 원하는 구성에 맞춰 변경합니다.",
      },
      {
        q: "사진과 문구도 함께 제작해 주나요?",
        a: "보유한 브랜드 자료와 사진을 우선 활용하며, 필요한 경우 업종과 브랜드 방향에 맞춘 이미지와 문구를 새로 구성합니다.",
      },
      {
        q: "관리자가 소식과 자료를 직접 등록할 수 있나요?",
        a: "가능합니다. 소식, 자료, 상품, 예약 정보처럼 자주 바뀌는 내용을 직접 관리할 수 있도록 관리자 기능을 추가할 수 있으며 세부 범위는 상담 후 정합니다.",
      },
      {
        q: "문의나 예약 내용을 이메일 또는 문자로 받을 수 있나요?",
        a: "문의·예약 기능을 연결하면 담당자 이메일이나 문자로 알림을 받을 수 있습니다. 알림 방식과 수신 담당자는 업무 흐름에 맞춰 설정합니다.",
      },
      {
        q: "제작 기간과 비용은 어떻게 정해지나요?",
        a: "프리미엄 디자인은 부가세 별도 300만 원부터이며, 도메인 1개와 호스팅 1년이 포함됩니다. 정확한 기간과 비용은 페이지 구성, 관리자 기능, 제공 자료를 확인한 뒤 안내합니다.",
      },
      {
        q: "도메인·호스팅·유지보수도 지원하나요?",
        a: "네. 홈페이지 공개에 필요한 도메인과 호스팅을 지원하며, 공개 후 유지보수 범위와 운영 방법도 함께 안내합니다.",
      },
    ],
  };
}
