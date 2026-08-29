import {
  LayoutDashboard,
  Inbox,
  Search,
  FileText,
  Database,
  Smartphone,
  SearchCheck,
  type LucideIcon,
} from "lucide-react";

export type CustomService = {
  slug: string;
  icon: LucideIcon;
  navLabel: string;
  title: string;
  tagline: string;
  desc: string;
  includes: string[];
  examples: { label: string; href: string }[];
};

export const CUSTOM_SERVICES: CustomService[] = [
  {
    slug: "admin-system",
    icon: LayoutDashboard,
    navLabel: "관리자 시스템",
    title: "관리자 시스템",
    tagline: "홈페이지를 직접 운영할 수 있는 관리자 시스템",
    desc: "문의 확인부터 콘텐츠 등록, 예약 · 고객 · 직원 관리까지. 필요한 업무를 하나의 관리자 화면으로 구성합니다. 매번 제작자에게 요청하지 않고 운영자가 직접 관리할 수 있습니다.",
    includes: [
      "공지 등록",
      "콘텐츠 수정",
      "상품 / 매물 / 차량 관리",
      "고객 문의 관리",
      "예약 관리",
      "일정 관리",
      "공개 / 비공개",
      "직원 관리",
      "권한 관리",
      "통계",
      "활동로그",
    ],
    examples: [
      { label: "부동산 관리자 데모 체험하기", href: "/web-solutions/real-estate/demo" },
      { label: "업종별 맞춤 제작 보기", href: "/web-solutions" },
    ],
  },
  {
    slug: "inquiry-reservation",
    icon: Inbox,
    navLabel: "문의 · 예약 관리",
    title: "문의 · 예약 관리",
    tagline: "문의와 예약을 관리자 화면에서 한 번에",
    desc: "홈페이지로 들어온 문의와 예약을 관리자 화면에서 확인하고, 처리 상태와 고객 이력을 관리할 수 있습니다.",
    includes: ["문의 접수 및 확인", "예약 · 일정 관리", "처리 상태 변경", "고객별 상담 이력 관리", "담당자 알림 연동"],
    examples: [
      { label: "렌트카 관리자 데모 체험하기", href: "/web-solutions/rentcar/demo" },
      { label: "병원 · 의원 관리자 데모 체험하기", href: "/web-solutions/hospital/demo" },
    ],
  },
  {
    slug: "search-filter",
    icon: Search,
    navLabel: "검색 · 필터 기능",
    title: "검색 · 필터 기능",
    tagline: "고객이 원하는 조건으로 빠르게 찾을 수 있게",
    desc: "매물, 차량, 상품처럼 목록이 많은 홈페이지에서 조건별 검색과 필터로 원하는 결과를 쉽게 찾을 수 있도록 구축합니다.",
    includes: ["조건별 필터링", "지도 기반 검색", "가격 · 지역별 정렬", "주소 검색 연동"],
    examples: [
      { label: "부동산 맞춤형 홈페이지 보기", href: "/web-solutions/real-estate" },
      { label: "렌트카 맞춤형 홈페이지 보기", href: "/web-solutions/rentcar" },
    ],
  },
  {
    slug: "content-management",
    icon: FileText,
    navLabel: "콘텐츠 관리",
    title: "콘텐츠 관리",
    tagline: "공지사항부터 상품 · 매물까지 직접 관리",
    desc: "홈페이지에 노출되는 콘텐츠를 관리자가 직접 등록 · 수정하고, 공개 · 비공개 상태까지 관리할 수 있습니다.",
    includes: ["공지사항 등록 · 수정", "상품 / 매물 / 차량 등록", "이미지 · 배너 관리", "공개 / 비공개 설정"],
    examples: [{ label: "기능 소개 자세히 보기", href: "/website/features" }],
  },
  {
    slug: "database-api",
    icon: Database,
    navLabel: "DB · API 연동",
    title: "DB · API 연동",
    tagline: "필요한 데이터와 외부 서비스를 연결",
    desc: "홈페이지에서 발생하는 데이터를 데이터베이스로 관리하고, 필요한 경우 결제 · 지도 · 문자 등 외부 서비스와 연동합니다.",
    includes: ["데이터베이스 구축", "외부 API 연동", "공공데이터 연동", "AI 기능"],
    examples: [{ label: "기능 소개 자세히 보기", href: "/website/features" }],
  },
  {
    slug: "responsive",
    icon: Smartphone,
    navLabel: "반응형 웹 제작",
    title: "반응형 웹 제작",
    tagline: "PC · 모바일 어디서든 자연스럽게",
    desc: "PC, 태블릿, 모바일 화면 크기에 맞게 콘텐츠가 자연스럽게 재배치되는 반응형 홈페이지를 기본으로 제작합니다.",
    includes: ["PC / 모바일 반응형", "터치 환경을 고려한 설계", "화면 크기별 자동 최적화"],
    examples: [{ label: "제작 방법 자세히 보기", href: "/website/process" }],
  },
  {
    slug: "seo",
    icon: SearchCheck,
    navLabel: "검색엔진 최적화",
    title: "검색엔진 최적화",
    tagline: "검색엔진이 홈페이지를 잘 이해하도록",
    desc: "검색엔진이 홈페이지의 내용을 이해할 수 있도록 페이지 제목, 설명, 구조 등을 기본적으로 설정합니다.",
    includes: ["페이지 제목 / 설명 설정", "검색엔진 기본 구조 설정", "네이버 · 구글 검색 등록 지원"],
    examples: [{ label: "제작 방법 자세히 보기", href: "/website/process" }],
  },
];

export function getCustomService(slug: string): CustomService | undefined {
  return CUSTOM_SERVICES.find((s) => s.slug === slug);
}
