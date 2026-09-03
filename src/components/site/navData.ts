import { Car, CarFront, Building2, HeartPulse, BookOpen, Hammer, PackageSearch, UtensilsCrossed, Briefcase, Scissors, Dumbbell, TreePine, Smile, PawPrint, Camera, Calculator, Wrench, Flower2, Scale, Lamp, HeartHandshake, Blocks, Flag, Palette, Mountain, type LucideIcon } from "lucide-react";
import { SAMPLES } from "@/lib/samples";
import { getDesignCode } from "@/lib/designCode";

/**
 * 실제 판매 중인 템플릿을 스타일별로 뽑아 **업종 → 디자인** 2단계로 묶는다.
 * 업종당 시안이 여러 개라 평면 목록으로 두면 같은 업종명이 그 수만큼 반복돼 읽기 어렵다.
 */
function templateGroups(styleKey: "basic-template" | "landing-template"): NavTemplateGroup[] {
  const byIndustry = new Map<string, NavTemplateGroup>();

  for (const s of SAMPLES) {
    if (!s.industryKey || !s.type.includes(styleKey)) continue;
    const label = s.industry.replace(" 홈페이지", "");
    let group = byIndustry.get(s.industryKey);
    if (!group) {
      group = {
        key: s.industryKey,
        label,
        href: `/templates?style=${styleKey}&industry=${s.industryKey}`,
        designs: [],
      };
      byIndustry.set(s.industryKey, group);
    }
    // 대표 시안(코드 1001)의 이미지를 업종 썸네일로 쓴다
    if (!group.image && s.image && !s.designCode) group.image = s.image;
    group.designs.push({
      label: "",
      code: getDesignCode(s),
      href: `/samples/${s.slug}`,
      ...(s.image ? { image: s.image } : {}),
    });
  }

  const groups = [...byIndustry.values()];
  for (const g of groups) {
    g.designs.sort((a, b) => a.code.localeCompare(b.code));
    // 코드 순서대로 디자인 A · B · C … 라벨을 붙인다
    g.designs.forEach((d, i) => {
      d.label = `디자인 ${String.fromCharCode(65 + i)}`;
    });
    if (!g.image) g.image = g.designs[0]?.image;
  }
  return groups.sort((a, b) => a.label.localeCompare(b.label, "ko"));
}

/** 업종 하나에 딸린 개별 디자인 시안 */
export type NavTemplateDesign = { label: string; code: string; href: string; image?: string };
/** 업종 단위 묶음 — 메뉴에서 1단계로 고르고, 그 안에서 디자인을 2단계로 고른다 */
export type NavTemplateGroup = {
  key: string;
  label: string;
  /** 전체 템플릿 목록을 이 업종으로 필터링해 여는 주소 */
  href: string;
  image?: string;
  designs: NavTemplateDesign[];
};

export type NavItem = { icon: LucideIcon; title: string; desc: string; href?: string };

// href가 없는 항목은 아직 실제 페이지가 없는 항목입니다 — 링크로 위장하지 않고
// "준비 중" 표시만 붙여둔 정적 항목으로 렌더링합니다. 나중에 페이지가 생기면
// href만 채우면 됩니다.
// WebSolutions 페이지, 홈 티저 섹션 등 카드형 레이아웃에서 사용합니다.
export const INDUSTRY_ITEMS: NavItem[] = [
  {
    icon: Car,
    title: "렌트카 맞춤형",
    desc: "차량 관리 · 조건별 검색 · 렌트 문의 · 예약접수",
    href: "/web-solutions/rentcar",
  },
  {
    icon: Building2,
    title: "부동산 맞춤형",
    desc: "매물 등록 · 검색 · 지도 · 중개보수 계산기",
    href: "/web-solutions/real-estate",
  },
  {
    icon: HeartPulse,
    title: "병원 · 의원 맞춤형",
    desc: "진료과목 · 의료진 · 예약 문의 · 비급여 안내",
    href: "/web-solutions/hospital",
  },
  {
    icon: BookOpen,
    title: "학원 맞춤형",
    desc: "강의 관리 · 시간표 · 수강 상담 · 합격/후기 관리",
    href: "/web-solutions/academy",
  },
  {
    icon: Hammer,
    title: "인테리어 · 리모델링 맞춤형",
    desc: "시공 사례 · 견적 문의 · 평형별 패키지",
    href: "/web-solutions/interior",
  },
  {
    icon: PackageSearch,
    title: "이사 · 청소업체 맞춤형",
    desc: "서비스 지역 · 견적 문의 · 작업 사례",
    href: "/web-solutions/moving",
  },
  {
    icon: UtensilsCrossed,
    title: "음식점 · 카페 맞춤형",
    desc: "메뉴 안내 · 실시간 영업중 · 예약 문의",
    href: "/templates?industry=restaurant",
  },
  {
    icon: Briefcase,
    title: "기업 · 브랜드 맞춤형",
    desc: "사업영역 · 지표 · 연혁 · 견적 문의",
    href: "/templates?industry=corporate",
  },
  {
    icon: Scissors,
    title: "미용실 · 뷰티샵 맞춤형",
    desc: "시술 가격표 · 스타일 갤러리 · 지명 예약",
    href: "/templates?industry=beauty",
  },
  {
    icon: Dumbbell,
    title: "필라테스 · 헬스 맞춤형",
    desc: "주간 시간표 · 회원권 · 체험 신청",
    href: "/templates?industry=fitness",
  },
  {
    icon: TreePine,
    title: "펜션 · 스테이 맞춤형",
    desc: "객실 요금 · 이용 안내 · 예약 문의",
    href: "/templates?industry=stay",
  },
  {
    icon: Smile,
    title: "치과 맞춤형",
    desc: "임플란트 안내 · 비급여 표 · 진료 예약",
    href: "/templates?industry=dental",
  },
  {
    icon: PawPrint,
    title: "동물병원 맞춤형",
    desc: "요금표 · 접종 스케줄 · 예약 문의",
    href: "/templates?industry=vet",
  },
  {
    icon: Camera,
    title: "사진관 · 스튜디오 맞춤형",
    desc: "갤러리 · 촬영 상품 · 촬영 예약",
    href: "/templates?industry=photo",
  },
  {
    icon: Calculator,
    title: "세무사 · 회계사무소 맞춤형",
    desc: "기장료 요금표 · 세무 일정 · 상담",
    href: "/templates?industry=tax",
  },
  {
    icon: Wrench,
    title: "자동차정비소 맞춤형",
    desc: "공임표 · 오일 패키지 · 정비 예약",
    href: "/templates?industry=auto",
  },
  {
    icon: Flower2,
    title: "꽃집 · 플라워샵 맞춤형",
    desc: "상품 가격 · 당일배달 · 주문 문의",
    href: "/templates?industry=flower",
  },
  {
    icon: Scale,
    title: "법률사무소 맞춤형",
    desc: "수행 분야 · 수임료 원칙 · 비밀 상담",
    href: "/templates?industry=law",
  },
  {
    icon: Lamp,
    title: "스터디카페 맞춤형",
    desc: "잔여석 보드 · 요금표 · 좌석 안내",
    href: "/templates?industry=study",
  },
  {
    icon: HeartHandshake,
    title: "요양원 · 주간보호 맞춤형",
    desc: "등급별 비용 · 하루 일과 · 입소 상담",
    href: "/templates?industry=care",
  },
  {
    icon: Blocks,
    title: "어린이집 · 유치원 맞춤형",
    desc: "반별 정원 · 급식 안내 · 입소 대기",
    href: "/templates?industry=kids",
  },
  {
    icon: Flag,
    title: "스크린골프 맞춤형",
    desc: "타석 요금 · 레슨 · 룸 예약",
    href: "/templates?industry=golf",
  },
  {
    icon: Palette,
    title: "공방 · 클래스 맞춤형",
    desc: "클래스 가격 · 일정표 · 수강 신청",
    href: "/templates?industry=craft",
  },
  {
    icon: CarFront,
    title: "중고차 맞춤형",
    desc: "매물 시세 · 실차 확인 · 매입 문의",
    href: "/templates?industry=usedcar",
  },
  {
    icon: Mountain,
    title: "여행 · 트레킹 맞춤형",
    desc: "코스 난이도 · 일정 요금 · 예약 문의",
    href: "/templates?industry=travel",
  },
];

/**
 * Header / Mega Menu 전용 텍스트 중심 내비게이션 구조.
 * 카드·아이콘 박스·설명문 없이 항목명만 나열하는 정돈된 드롭다운을 위한 데이터다.
 */
export type NavLink = {
  label: string;
  href: string;
  /** 있으면 드롭다운에서 같은 group끼리 묶여 구분선 + 소제목 아래 렌더링된다 */
  group?: string;
  /** 있으면 데스크톱에서 hover 시 우측 플라이아웃으로, 모바일에서는 들여쓰기 목록으로 펼쳐진다 */
  children?: NavTemplateGroup[];
};
export type NavDropdownEntry = {
  type: "dropdown";
  key: string;
  label: string;
  items: NavLink[];
};
export type NavLinkEntry = { type: "link"; key: string; label: string; href: string; external?: boolean };
export type NavEntry = NavDropdownEntry | NavLinkEntry;

export const HEADER_NAV: NavEntry[] = [
  {
    type: "dropdown",
    key: "build",
    label: "홈페이지 제작",
    items: [
      { label: "제작 방법", href: "/website/process" },
      { label: "제작 비용", href: "/website/price" },
      { label: "기능 소개", href: "/website/features" },
      { label: "유지보수", href: "/website/maintenance" },
    ],
  },
  {
    type: "dropdown",
    key: "custom-service",
    label: "맞춤형 서비스",
    items: [
      { label: "커스텀 개발이란?", href: "/services/custom" },
      { label: "업종별 솔루션 · 데모 체험", href: "/web-solutions" },
      { label: "관리자 시스템", href: "/services/admin-system", group: "기능별 개발" },
      { label: "문의 · 예약 관리", href: "/services/inquiry-reservation", group: "기능별 개발" },
      { label: "검색 · 필터 기능", href: "/services/search-filter", group: "기능별 개발" },
      { label: "콘텐츠 관리", href: "/services/content-management", group: "기능별 개발" },
      { label: "DB · API 연동", href: "/services/database-api", group: "기능별 개발" },
      { label: "반응형 웹 제작", href: "/services/responsive", group: "기능별 개발" },
      { label: "검색엔진 최적화", href: "/services/seo", group: "기능별 개발" },
    ],
  },
  {
    type: "dropdown",
    key: "templates",
    label: "홈페이지 템플릿",
    items: [
      {
        label: "기본형 디자인 템플릿",
        href: "/templates?style=basic-template",
        children: templateGroups("basic-template"),
      },
      {
        label: "랜딩형 디자인 템플릿",
        href: "/templates?style=landing-template",
        children: templateGroups("landing-template"),
      },
    ],
  },
  {
    type: "dropdown",
    key: "portfolio",
    label: "포트폴리오",
    items: [{ label: "제작 사례", href: "/samples" }],
  },
  {
    type: "dropdown",
    key: "support",
    label: "고객센터",
    items: [
      { label: "문의하기", href: "/contact" },
      { label: "공지사항", href: "/notices" },
      { label: "자주 묻는 질문", href: "/faq" },
    ],
  },
];
