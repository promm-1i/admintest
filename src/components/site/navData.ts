import {
  Route,
  CircleDollarSign,
  ListChecks,
  LifeBuoy,
  Building2,
  Car,
  HeartPulse,
  UtensilsCrossed,
  Briefcase,
  LayoutTemplate,
  ShieldCheck,
  FolderKanban,
  Grid3x3,
  HelpCircle,
  MessageSquare,
  Newspaper,
  type LucideIcon,
} from "lucide-react";

export type NavItem = { icon: LucideIcon; title: string; desc: string; href?: string };
export type NavGroup = {
  key: string;
  label: string;
  items: NavItem[];
  promo?: { title: string; desc: string; href: string; linkLabel: string };
};

// href가 없는 항목은 아직 실제 페이지가 없는 항목입니다 — 링크로 위장하지 않고
// "준비 중" 표시만 붙여둔 정적 항목으로 렌더링합니다. 나중에 페이지가 생기면
// href만 채우면 됩니다.
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
    title: "병원 · 학원 맞춤형",
    desc: "진료과/커리큘럼 안내 · 예약 · 관리자",
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

export const NAV_GROUPS: NavGroup[] = [
  {
    key: "build",
    label: "홈페이지 제작",
    items: [
      { icon: LayoutTemplate, title: "제작 과정", desc: "상담부터 배포까지 제작 유형과 흐름 안내", href: "/services#types" },
      { icon: CircleDollarSign, title: "제작 비용", desc: "홈페이지 유형별 가격 안내", href: "/services#pricing" },
      { icon: ListChecks, title: "기본 제공 기능", desc: "모든 홈페이지에 포함되는 기본 기능", href: "/services#features" },
      { icon: LifeBuoy, title: "유지보수", desc: "제작 이후 운영 지원 안내", href: "/services#maintenance" },
    ],
  },
  {
    key: "industry",
    label: "업종별 맞춤 제작",
    items: INDUSTRY_ITEMS,
    promo: {
      title: "렌트카 · 부동산처럼\n업종별 기능까지 갖춘 홈페이지",
      desc: "업종마다 필요한 기능이 다릅니다. 관리자 시스템, 데이터베이스, 검색, 예약 등 업종에 맞는 기능까지 갖춘 홈페이지를 구축합니다.",
      href: "/web-solutions",
      linkLabel: "업종별 맞춤 홈페이지 보기",
    },
  },
  {
    key: "demo",
    label: "데모 보기",
    items: [
      { icon: Grid3x3, title: "전체 데모", desc: "업종별 맞춤 홈페이지 한눈에 보기", href: "/web-solutions" },
      { icon: Car, title: "렌트카 데모", desc: "고객이 보는 렌트카 홈페이지 화면", href: "/web-solutions/rentcar/demo/site" },
      { icon: Building2, title: "부동산 데모", desc: "고객이 보는 부동산 홈페이지 화면", href: "/web-solutions/real-estate/demo/site" },
      { icon: ShieldCheck, title: "관리자 페이지 데모", desc: "매물·문의·직원 등을 관리하는 화면", href: "/web-solutions/real-estate/demo" },
    ],
  },
  {
    key: "portfolio",
    label: "포트폴리오",
    items: [
      { icon: FolderKanban, title: "제작 사례", desc: "지금까지 제작한 홈페이지 모아보기", href: "/samples" },
      { icon: Route, title: "업종별 사례", desc: "업종별 맞춤 제작 사례 살펴보기", href: "/web-solutions" },
    ],
  },
  {
    key: "support",
    label: "고객센터",
    items: [
      { icon: HelpCircle, title: "자주 묻는 질문", desc: "제작 기간, 비용, 절차 등 자주 묻는 내용", href: "/faq" },
      { icon: MessageSquare, title: "상담 문의", desc: "필요한 기능에 맞춘 맞춤 상담", href: "/contact" },
      { icon: Newspaper, title: "블로그", desc: "제작 후기와 운영 팁", href: "/blog" },
    ],
  },
];
