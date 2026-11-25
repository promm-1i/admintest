export type Sample = {
  slug: string;
  industry: string;
  title: string;
  type: string[];
  tag?: string;
  purpose: string;
  features: string[];
  idealFor: string;
  /** src/assets 번들 이미지 또는 public/images 정적 경로 (없으면 자동으로 그라데이션 placeholder로 대체됨) */
  image?: string;
  /** 실제 배포된 사이트 URL이 있으면 상세페이지 미리보기 탭에서 iframe으로 그 사이트를 그대로 보여준다 */
  liveUrl?: string;
  /** 있으면 카드가 /samples/:slug 대신 이 경로로 연결된다 (예: 이미 자체 소개 페이지가 있는 플랫폼형 솔루션) */
  detailHref?: string;
  /** 있으면 상세 미리보기 상단에 관리자 시스템 데모로 가는 버튼이 함께 노출된다 */
  adminDemoHref?: string;
  /** type에 "basic-template"/"landing-template"가 있는 항목만 사용 — /templates 페이지의 업종 필터 값 */
  industryKey?: string;
  /** 추가 디자인 시안(1002, 1003…)만 직접 지정. 없으면 designCode.ts에서 1001로 계산한다 */
  designCode?: string;
  /**
   * 프리미엄 디자인 진열 여부 — 헤더 "프리미엄 디자인 템플릿" 카테고리와
   * /web-solutions 프리미엄 디자인 섹션이 이 플래그 하나로 함께 갱신된다.
   * 실제 홈페이지가 완성되면 임시 항목(moto-b · beauty-g)의 플래그를 옮기면 된다.
   */
  premium?: boolean;
  /**
   * 프리미엄 목록에 쓸 짧은 이름. 없으면 industry 에서 " 홈페이지"만 떼어 쓴다.
   * 같은 업종에 시안이 둘 이상이면 industry 가 똑같아 목록에 같은 줄이 여러 번 뜬다 —
   * 그때만 여기에 서로 구분되는 이름을 적는다 (호텔 4종 · 유치원 2종 · 인테리어 2종).
   */
  premiumLabel?: string;
  /**
   * 이 디자인으로 실제 납품한 고객 사이트. 미리보기 바로 아래에 썸네일로 노출된다.
   * 고객 동의를 받은 건만 넣는다.
   */
  caseStudy?: { name: string; url: string; image: string; note?: string };
};

/**
 * 최신순 정렬: 새 포트폴리오를 추가할 때는 배열 맨 앞(위)에 넣는다.
 * 메인 슬라이더/최근 노출 영역은 이 배열의 앞쪽 항목을 그대로 사용하고,
 * /samples 페이지 페이지네이션도 이 순서를 기준으로 6개씩 나눈다.
 */
export const SAMPLES: Sample[] = [];

/**
 * 포트폴리오(=실제 제작 사례) 목록. 판매용 템플릿(industryKey 항목)은 랜딩형만 대표로
 * 포함한다(기본형은 디자인이 같아 카드가 중복돼 보이므로 /templates에서만 노출).
 * 새 템플릿을 SAMPLES에 추가하면 포트폴리오·메인 슬라이더에 자동 반영된다.
 */
/**
 * 실사이트 모델링(프리미엄) 최신순. 제작 사례 목록과 위쪽 슬라이드가 이 순서로 시작하므로
 * 새 프리미엄을 등록하면 슬러그를 맨 앞에 넣는다. 여기 없는 프리미엄은 그 뒤, 나머지는 SAMPLES 순서.
 */
const PREMIUM_RECENT_ORDER: string[] = [];

export const PORTFOLIO_SAMPLES: Sample[] = SAMPLES.filter(
  (s) => !s.industryKey || s.type?.includes("landing-template") || s.type?.includes("premium-template"),
).sort((a, b) => {
  const rank = (s: Sample) => {
    const i = PREMIUM_RECENT_ORDER.indexOf(s.slug);
    if (i >= 0) return i;
    return s.premium ? PREMIUM_RECENT_ORDER.length : PREMIUM_RECENT_ORDER.length + 1;
  };
  return rank(a) - rank(b); // 같은 순위끼리는 원래 순서 유지(안정 정렬)
});

/**
 * 메인페이지 PORTFOLIO 섹션에 고정 노출하는 업종별 대표 사례 6건.
 * 새 포트폴리오를 배열 앞에 추가해도 메인 화면 구성이 밀리지 않도록 슬러그로 고정한다.
 * (필터를 선택했을 때는 아래 고정 목록 대신 해당 분류 전체에서 보여준다.)
 */
const MAIN_PORTFOLIO_SLUGS = [
  "commercial-real-estate-platform",
  "hospital-solution",
  "academy-solution",
  "rentcar-solution",
  "interior-solution",
  "moving-solution",
];

export const MAIN_PORTFOLIO_SAMPLES: Sample[] = MAIN_PORTFOLIO_SLUGS.map(
  (slug) => PORTFOLIO_SAMPLES.find((s) => s.slug === slug),
).filter((s): s is Sample => Boolean(s));

/**
 * 메인 슬라이더: 고정 6건 뒤에 나머지 포트폴리오 전체를 자동으로 이어 붙인다.
 * SAMPLES에 항목을 추가/수정하면 별도 작업 없이 메인 슬라이더에도 반영된다.
 * roadin · objetbath는 위 솔루션 카드와 같은 사이트라 중복 노출을 피하려고 제외한다.
 */
const CAROUSEL_EXCLUDED_SLUGS = ["roadin-rentcar", "objetbath"];

/**
 * 메인 PORTFOLIO 슬라이드에 올리는 대표 12건.
 * PORTFOLIO_SAMPLES에는 판매용 랜딩 템플릿이 전부 들어 있어서, 상한을 두지 않으면
 * 홈 한 페이지에 썸네일 수백 장이 깔린다. 전체는 /samples 에서 본다.
 */
const MAIN_CAROUSEL_LIMIT = 12;

export const MAIN_PORTFOLIO_CAROUSEL: Sample[] = [
  ...MAIN_PORTFOLIO_SAMPLES,
  ...PORTFOLIO_SAMPLES.filter(
    (s) => !MAIN_PORTFOLIO_SLUGS.includes(s.slug) && !CAROUSEL_EXCLUDED_SLUGS.includes(s.slug),
  ),
].slice(0, MAIN_CAROUSEL_LIMIT);

export const PORTFOLIO_FILTERS: { label: string; value: string; highlight?: boolean }[] = [
  { label: "전체", value: "all" },
  { label: "프리미엄 디자인", value: "premium-template", highlight: true },
  { label: "플랫폼·시스템", value: "platform" },
  { label: "원페이지", value: "one-page" },
  { label: "소상공인", value: "small-business" },
  { label: "기업", value: "business" },
  { label: "쇼핑몰", value: "shopping-mall" },
  { label: "포트폴리오", value: "portfolio" },
  { label: "리뉴얼", value: "renewal" },
];

/**
 * 업종 key → 표시 라벨. 새 업종 템플릿을 추가할 때 여기에 라벨을 넣고 SAMPLES 항목에
 * industryKey를 지정하면, /templates 업종 필터에 자동으로 칩이 하나 늘어난다.
 */
export const TEMPLATE_INDUSTRY_LABELS: Record<string, string> = {
  artist: "작가·아티스트",
  "real-estate": "부동산",
  rentcar: "렌트카",
  hospital: "병원·의원",
  academy: "학원",
  interior: "인테리어·리모델링",
  moving: "이사·청소업체",
  restaurant: "음식점·카페",
  corporate: "기업·브랜드",
  beauty: "뷰티샵",
  fitness: "필라테스·헬스",
  stay: "펜션·스테이",
  dental: "치과",
  vet: "동물병원",
  photo: "사진관",
  tax: "세무·회계",
  auto: "자동차정비",
  flower: "꽃집",
  law: "법률사무소",
  study: "스터디카페",
  care: "요양원·주간보호",
  kids: "어린이집·유치원",
  golf: "스크린골프",
  craft: "공방·클래스",
  usedcar: "중고차",
  travel: "여행·트레킹",
  moto: "오토바이·스쿠터",
  agency: "디자인 에이전시",
  shop: "쇼핑몰",
  perfume: "향수·코스메틱",
  video: "영상 편집",
  brew: "주류·양조 브랜드",
};

/** 실제로 템플릿이 존재하는 업종만 필터로 노출한다 (준비 안 된 업종 칩을 띄우지 않는다). */
export const TEMPLATE_INDUSTRY_FILTERS = [
  { label: "전체", value: "all" },
  ...Object.entries(TEMPLATE_INDUSTRY_LABELS)
    .filter(([key]) => SAMPLES.some((s) => s.industryKey === key))
    .map(([value, label]) => ({ label, value })),
];

/**
 * 최신 등록순(배열 앞이 최신)으로 업종 중복 없이 n개의 랜딩형 템플릿 디자인을 뽑는다.
 * 히어로 캐러셀과 프리미엄 디자인 목록의 단일 출처.
 */
export function getLatestTemplateDesigns(n: number) {
  const seen = new Set<string>();
  const items: { sample: Sample; label: string; href: string }[] = [];
  for (const s of SAMPLES) {
    if (!s.industryKey || !s.type.includes("landing-template") || !s.image) continue;
    if (seen.has(s.industryKey)) continue;
    seen.add(s.industryKey);
    items.push({ sample: s, label: s.industry.replace(" 홈페이지", ""), href: `/samples/${s.slug}` });
    if (items.length >= n) break;
  }
  return items;
}

/**
 * 홈 히어로 카드 n개: 프리미엄 디자인(premium: true)만 쓴다. 카드 수가 n 보다 적으면
 * 원통 캐러셀 자리가 비지 않게 같은 목록을 이어서 반복한다. 누르면 각 프리미엄 상세로 간다.
 */
export function getHeroDesigns(n: number) {
  const premium = getPremiumDesigns().map((d) => ({ ...d, label: d.sample.industry.replace(" 홈페이지", "") }));
  if (premium.length === 0) return [];
  return Array.from({ length: n }, (_, i) => premium[i % premium.length]);
}

/**
 * 프리미엄 디자인 진열 목록 (premium: true, 배열 앞이 최신).
 * 헤더 "프리미엄 디자인 템플릿" 플라이아웃과 /web-solutions 프리미엄 섹션의 단일 출처 —
 * SAMPLES에서 플래그만 바꾸면 두 곳이 함께 갱신된다.
 */
export function getPremiumDesigns() {
  return SAMPLES.filter((s) => s.premium && s.image).map((s) => ({
    sample: s,
    label: s.premiumLabel ?? s.industry.replace(" 홈페이지", ""),
    href: `/samples/${s.slug}`,
  }));
}


/**
 * 프리미엄 디자인 카테고리 — 업종을 "무엇을 하는 사이트인가"로 묶는다.
 * 맨 위 메뉴에서 펼쳐지는 칸(홈페이지 템플릿 → 프리미엄 디자인)과 /web-solutions 진열이 이 분류를 함께 쓴다.
 * 새 시안을 추가할 때 industryKey를 아래 배열에 넣으면 되고, 넣지 않으면 "기타"로 모인다.
 */
export const PREMIUM_CATEGORIES: { key: string; label: string; desc: string; industryKeys: string[] }[] = [
  {
    key: "estate",
    label: "부동산",
    desc: "매물을 지도·목록으로 보여주고 상담으로 잇는 구성",
    industryKeys: ["estate", "real-estate"],
  },
  {
    key: "rentcar",
    label: "렌터카 · 카셰어링",
    desc: "차량을 보여주고 날짜·장소로 예약까지 잇는 구성",
    industryKeys: ["rentcar"],
  },
  {
    key: "food",
    label: "카페 · 음식점",
    desc: "메뉴와 매장을 보여주고 예약 · 주문으로 잇는 구성",
    industryKeys: ["restaurant"],
  },
  {
    key: "stay",
    label: "호텔 · 숙박",
    desc: "객실과 부대시설을 보여주고 예약을 받는 구성",
    industryKeys: ["stay"],
  },
  {
    key: "care",
    label: "병원 · 의원",
    desc: "진료 과목을 안내하고 상담 · 진료 예약을 받는 구성",
    industryKeys: ["hospital", "dental", "vet"],
  },
  {
    key: "beauty",
    label: "뷰티 · 피트니스",
    desc: "시술 · 프로그램을 보여주고 회원 · 예약으로 잇는 구성",
    industryKeys: ["beauty", "fitness"],
  },
  {
    key: "edu",
    label: "학원 · 교육",
    desc: "과정과 수강료를 보여주고 등록 문의를 받는 구성",
    industryKeys: ["academy", "kids", "study", "craft"],
  },
  {
    key: "build",
    label: "인테리어 · 시공",
    desc: "시공 사례와 진행 방식을 보여주고 견적 문의를 받는 구성",
    industryKeys: ["interior", "moving", "inspection"],
  },
  {
    key: "shop",
    label: "쇼핑몰 · 브랜드",
    desc: "상품을 진열하고 장바구니 · 구매로 잇는 구성",
    industryKeys: ["shop", "perfume", "brew", "lighting", "bicycle", "auto", "furniture"],
  },
  {
    key: "corporate",
    label: "기업",
    desc: "회사 소개와 사업 분야 · 실적을 보여주고 문의 · 채용으로 잇는 구성",
    industryKeys: ["corporate"],
  },
  {
    key: "wedding",
    label: "예식 · 웨딩",
    desc: "예식장과 연회 공간을 보여주고 상담 예약을 받는 구성",
    industryKeys: ["wedding"],
  },
  {
    key: "office",
    label: "법률 · 세무 사무소",
    desc: "업무 분야와 해결 사례를 보여주고 상담 예약을 받는 구성",
    industryKeys: ["law", "tax"],
  },
  {
    key: "life",
    label: "생활 서비스",
    desc: "서비스와 비용을 안내하고 가까운 센터 · 매장 찾기와 상담으로 잇는 구성",
    industryKeys: ["care", "laundry"],
  },
  {
    key: "leisure",
    label: "레저 · 관광",
    desc: "시설과 코스를 보여주고 이용 안내 · 예약으로 잇는 구성",
    industryKeys: ["golf", "travel", "garden"],
  },
  {
    key: "portfolio",
    label: "작가 · 포트폴리오",
    desc: "작업물을 보여주고 의뢰 문의를 받는 구성",
    industryKeys: ["artist", "video", "photo", "agency"],
  },
];

/** 프리미엄 디자인을 카테고리별로 묶어 돌려준다 (빈 카테고리는 제외) */
export function getPremiumCategories() {
  const items = getPremiumDesigns();
  const assigned = new Set(PREMIUM_CATEGORIES.flatMap((c) => c.industryKeys));
  // 카테고리는 가나다순 (기업 → 렌터카 → 부동산 → 작가), 안의 시안은 최신 것(디자인 코드 번호가 큰 것)이 앞
  const codeNo = (d: { sample: Sample }) => Number(d.sample.designCode?.match(/\d+$/)?.[0] ?? 0);
  const groups = PREMIUM_CATEGORIES.map((c) => ({
    key: c.key,
    label: c.label,
    desc: c.desc,
    items: items
      .filter((d) => d.sample.industryKey && c.industryKeys.includes(d.sample.industryKey))
      .sort((x, y) => codeNo(y) - codeNo(x)),
  }))
    .filter((g) => g.items.length > 0)
    .sort((x, y) => x.label.localeCompare(y.label, "ko"));

  const rest = items.filter((d) => !d.sample.industryKey || !assigned.has(d.sample.industryKey));
  if (rest.length > 0) {
    groups.push({ key: "etc", label: "기타", desc: "분류 예정인 시안", items: rest });
  }
  return groups;
}

export function getSampleBySlug(slug: string): Sample | undefined {
  return SAMPLES.find((s) => s.slug === slug);
}
