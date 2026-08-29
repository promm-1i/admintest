import { Car, Building2, HeartPulse, BookOpen, Hammer, PackageSearch, UtensilsCrossed, Briefcase, type LucideIcon } from "lucide-react";
import { NAVER_BLOG_URL } from "@/lib/contact";

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
    desc: "메뉴 안내 · 예약 · 관리자",
  },
  {
    icon: Briefcase,
    title: "기업 · 브랜드 맞춤형",
    desc: "회사소개 · 사업영역 · 브랜드 스토리",
  },
];

/**
 * Header / Mega Menu 전용 텍스트 중심 내비게이션 구조.
 * 카드·아이콘 박스·설명문 없이 항목명만 나열하는 정돈된 드롭다운을 위한 데이터다.
 */
export type NavLink = { label: string; href: string };
export type NavExternalNote = { text: string; label: string; href: string };
export type NavDropdownEntry = {
  type: "dropdown";
  key: string;
  label: string;
  items: NavLink[];
  /** 항목 리스트 아래, 구분선을 두고 붙는 외부 링크 안내 블록 (예: 고객센터의 블로그 버튼) */
  externalNote?: NavExternalNote;
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
      { label: "관리자 시스템", href: "/services/admin-system" },
      { label: "문의 · 예약 관리", href: "/services/inquiry-reservation" },
      { label: "검색 · 필터 기능", href: "/services/search-filter" },
      { label: "콘텐츠 관리", href: "/services/content-management" },
      { label: "DB · API 연동", href: "/services/database-api" },
      { label: "반응형 웹 제작", href: "/services/responsive" },
      { label: "검색엔진 최적화", href: "/services/seo" },
    ],
  },
  { type: "link", key: "templates", label: "홈페이지 템플릿", href: "/templates" },
  { type: "link", key: "portfolio", label: "포트폴리오", href: "/samples" },
  {
    type: "dropdown",
    key: "support",
    label: "고객센터",
    items: [
      { label: "문의하기", href: "/contact" },
      { label: "공지사항", href: "/notices" },
      { label: "자주 묻는 질문", href: "/faq" },
    ],
    externalNote: {
      text: "MintCL 블로그에서 홈페이지 제작 관련 정보를 확인해보세요.",
      label: "네이버 블로그 보기",
      href: NAVER_BLOG_URL,
    },
  },
];
