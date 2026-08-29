import {
  Building2,
  MapPin,
  Users,
  FileSignature,
  Settings,
  Car,
  CalendarCheck,
  MessageSquare,
  HeartPulse,
  Stethoscope,
  ReceiptText,
  BookOpen,
  Wallet,
  Hammer,
  Ruler,
  ListChecks,
  Wrench,
  PackageSearch,
  Truck,
  type LucideIcon,
} from "lucide-react";

export type IndustryFeature = { icon: LucideIcon; label: string };

export type IndustryShowcase = {
  key: string;
  icon: LucideIcon;
  name: string;
  cardTitle: string;
  cardTagline: string;
  connectionNote: string;
  heroTitle: string;
  heroDesc: string;
  manageables: string[];
  features: IndustryFeature[];
  previewStats: { label: string; value: string }[];
  solutionHref: string;
  adminHref: string;
  siteHref: string;
};

export const INDUSTRY_SHOWCASES: IndustryShowcase[] = [
  {
    key: "real-estate",
    icon: Building2,
    name: "부동산",
    cardTitle: "부동산 통합관리",
    cardTagline: "매물 · 고객 · 임장 · 계약 · 직원관리",
    connectionNote: "관리자에서 등록·공개한 매물이 고객 홈페이지에 실시간으로 반영됩니다.",
    heroTitle: "부동산 맞춤형 홈페이지",
    heroDesc:
      "매물을 등록하고 지도와 조건별 검색으로 고객이 원하는 매물을 쉽게 찾을 수 있는 부동산 업종 맞춤형 홈페이지입니다. 부동산 중개업소, 분양·임대 사무실에 적합합니다.",
    manageables: [
      "매물 등록과 공개·비공개 상태 관리",
      "고객 문의와 상담 이력 관리",
      "임장 일정과 방문 이력 관리",
      "계약과 거래 이력 관리",
      "직원별 접근 권한과 활동 로그",
      "홈페이지 노출 항목 설정",
    ],
    features: [
      { icon: Building2, label: "매물 관리" },
      { icon: Users, label: "고객 관리" },
      { icon: MapPin, label: "임장 관리" },
      { icon: FileSignature, label: "계약 관리" },
      { icon: Users, label: "직원 관리" },
      { icon: Settings, label: "홈페이지 관리" },
    ],
    previewStats: [
      { label: "전체 매물", value: "16" },
      { label: "공개 매물", value: "13" },
      { label: "신규 문의", value: "2" },
    ],
    solutionHref: "/web-solutions/real-estate",
    adminHref: "/web-solutions/real-estate/demo",
    siteHref: "/web-solutions/real-estate/demo/site",
  },
  {
    key: "rentcar",
    icon: Car,
    name: "렌트카",
    cardTitle: "렌트카 통합관리",
    cardTagline: "차량 · 예약 · 고객 · 계약 · 일정 · 홈페이지",
    connectionNote: "관리자에서 등록·공개한 차량이 고객 홈페이지에 실시간으로 반영됩니다.",
    heroTitle: "렌트카 맞춤형 홈페이지",
    heroDesc:
      "차량을 등록하고 차종·가격·기간별 검색으로 고객이 원하는 차량을 쉽게 찾을 수 있는 렌트카 업종 맞춤형 홈페이지입니다. 렌트카 업체, 카쉐어링 사업자에 적합합니다.",
    manageables: [
      "보유 차량 등록과 공개 상태 관리",
      "예약 접수와 대여·반납 일정 관리",
      "고객 문의와 상담 이력 관리",
      "대여 계약과 결제 이력 관리",
      "차량별 정비·운행 일정 관리",
      "홈페이지 노출 항목 설정",
    ],
    features: [
      { icon: Car, label: "차량 관리" },
      { icon: CalendarCheck, label: "예약 관리" },
      { icon: Users, label: "고객 관리" },
      { icon: FileSignature, label: "계약 관리" },
      { icon: CalendarCheck, label: "일정 관리" },
      { icon: Settings, label: "홈페이지 관리" },
    ],
    previewStats: [
      { label: "전체 차량", value: "12" },
      { label: "예약 중", value: "5" },
      { label: "신규 문의", value: "3" },
    ],
    solutionHref: "/web-solutions/rentcar",
    adminHref: "/web-solutions/rentcar/demo",
    siteHref: "/web-solutions/rentcar/demo/site",
  },
  {
    key: "hospital",
    icon: HeartPulse,
    name: "병원 · 의원",
    cardTitle: "병원·의원 통합관리",
    cardTagline: "예약 · 고객 · 의료진 · 비급여 · 직원 · 홈페이지",
    connectionNote: "관리자에서 공개한 진료과목·의료진 정보가 고객 홈페이지에 실시간으로 반영됩니다.",
    heroTitle: "병원·의원 맞춤형 홈페이지",
    heroDesc:
      "진료과목과 의료진을 안내하고 예약 문의를 접수할 수 있는 병원·의원 업종 맞춤형 홈페이지입니다. 병원, 의원, 한의원에 적합합니다.",
    manageables: [
      "진료과목과 의료진 정보 관리",
      "예약과 진료 일정 관리",
      "고객(환자) 상담 이력 관리",
      "비급여 진료 항목과 가격 관리",
      "직원별 접근 권한과 활동 로그",
      "홈페이지 노출 항목 설정",
    ],
    features: [
      { icon: CalendarCheck, label: "예약 관리" },
      { icon: Users, label: "고객 관리" },
      { icon: Stethoscope, label: "의료진 관리" },
      { icon: ReceiptText, label: "비급여 관리" },
      { icon: Users, label: "직원 관리" },
      { icon: Settings, label: "홈페이지 관리" },
    ],
    previewStats: [
      { label: "진료과목", value: "10" },
      { label: "의료진", value: "12" },
      { label: "오늘 예약", value: "2" },
    ],
    solutionHref: "/web-solutions/hospital",
    adminHref: "/web-solutions/hospital/demo",
    siteHref: "/web-solutions/hospital/demo/site",
  },
  {
    key: "academy",
    icon: BookOpen,
    name: "학원",
    cardTitle: "학원 통합관리",
    cardTagline: "학생 · 상담 · 강의 · 출결 · 수강료 · 홈페이지",
    connectionNote: "관리자에서 공개한 강의·강사 정보가 고객 홈페이지에 실시간으로 반영됩니다.",
    heroTitle: "학원 맞춤형 홈페이지",
    heroDesc:
      "강의를 등록하고 수강 상담을 접수할 수 있는 학원 업종 맞춤형 홈페이지입니다. 입시학원, 어학원, 예체능학원에 적합합니다.",
    manageables: [
      "학생·학부모 정보와 상담 이력 관리",
      "강의 개설과 수강등록 관리",
      "출결과 시간표 관리",
      "성적과 수강료 납부 관리",
      "강사별 담당 강의 관리",
      "홈페이지 노출 항목 설정",
    ],
    features: [
      { icon: Users, label: "학생 관리" },
      { icon: MessageSquare, label: "상담 관리" },
      { icon: BookOpen, label: "강의 관리" },
      { icon: CalendarCheck, label: "출결 관리" },
      { icon: Wallet, label: "수강료 관리" },
      { icon: Settings, label: "홈페이지 관리" },
    ],
    previewStats: [
      { label: "전체 강의", value: "12" },
      { label: "재원생", value: "13" },
      { label: "상담 대기", value: "5" },
    ],
    solutionHref: "/web-solutions/academy",
    adminHref: "/web-solutions/academy/demo",
    siteHref: "/web-solutions/academy/demo/site",
  },
  {
    key: "interior",
    icon: Hammer,
    name: "인테리어 · 리모델링",
    cardTitle: "인테리어·리모델링 통합관리",
    cardTagline: "견적 · 실측 · 계약 · 공정 · 결제 · A/S",
    connectionNote: "관리자에서 공개한 시공 사례·패키지가 고객 홈페이지에 실시간으로 반영됩니다.",
    heroTitle: "인테리어·리모델링 맞춤형 홈페이지",
    heroDesc:
      "시공 사례를 등록하고 평형별 견적 문의를 접수할 수 있는 인테리어·리모델링 업종 맞춤형 홈페이지입니다. 인테리어 업체, 리모델링 전문업체에 적합합니다.",
    manageables: [
      "견적 문의와 현장 실측 일정 관리",
      "항목별 견적서와 계약 관리",
      "프로젝트별 공정 진행 관리",
      "자재 발주와 협력업체 관리",
      "결제와 A/S 요청 관리",
      "홈페이지 노출 항목 설정",
    ],
    features: [
      { icon: MessageSquare, label: "견적 관리" },
      { icon: Ruler, label: "실측 관리" },
      { icon: FileSignature, label: "계약 관리" },
      { icon: ListChecks, label: "공정 관리" },
      { icon: Wallet, label: "결제 관리" },
      { icon: Wrench, label: "A/S 관리" },
    ],
    previewStats: [
      { label: "견적 문의", value: "12" },
      { label: "진행중 프로젝트", value: "5" },
      { label: "완료 프로젝트", value: "2" },
    ],
    solutionHref: "/web-solutions/interior",
    adminHref: "/web-solutions/interior/demo",
    siteHref: "/web-solutions/interior/demo/site",
  },
  {
    key: "moving",
    icon: PackageSearch,
    name: "이사 · 청소업체",
    cardTitle: "이사·청소 통합관리",
    cardTagline: "견적 · 예약 · 배차 · 작업 · 결제 · 고객관리",
    connectionNote: "관리자에서 공개한 작업 사례·서비스가 고객 홈페이지에 실시간으로 반영됩니다.",
    heroTitle: "이사·청소업체 맞춤형 홈페이지",
    heroDesc:
      "작업 사례를 등록하고 지역별 견적 문의를 접수할 수 있는 이사·청소업체 업종 맞춤형 홈페이지입니다. 포장이사, 입주청소 업체에 적합합니다.",
    manageables: [
      "견적 문의와 견적서 관리",
      "예약과 작업 일정 관리",
      "작업팀·차량 배차 관리",
      "당일 작업 진행 현황 관리",
      "결제와 클레임/A·S 관리",
      "홈페이지 노출 항목 설정",
    ],
    features: [
      { icon: MessageSquare, label: "견적 관리" },
      { icon: CalendarCheck, label: "예약 관리" },
      { icon: Truck, label: "배차 관리" },
      { icon: ListChecks, label: "작업 관리" },
      { icon: Wallet, label: "결제 관리" },
      { icon: Users, label: "고객 관리" },
    ],
    previewStats: [
      { label: "견적 문의", value: "10" },
      { label: "오늘 예약", value: "1" },
      { label: "작업중", value: "5" },
    ],
    solutionHref: "/web-solutions/moving",
    adminHref: "/web-solutions/moving/demo",
    siteHref: "/web-solutions/moving/demo/site",
  },
];

export function getIndustryShowcase(key: string): IndustryShowcase | undefined {
  return INDUSTRY_SHOWCASES.find((i) => i.key === key);
}
