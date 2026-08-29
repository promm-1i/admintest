import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  CalendarCheck,
  Users2,
  Truck,
  ListChecks,
  Wallet,
  PackageSearch,
  Plus,
  Wrench,
  MapPinned,
  Star,
  ShieldCheck,
  Lock,
  Settings,
  History,
} from "lucide-react";
import type { AdminMenuItem, AdminMenuLeaf } from "@/components/site/IndustryAdminShell";

export const MENU: AdminMenuItem[] = [
  { key: "dashboard", label: "대시보드", icon: LayoutDashboard },
  { key: "quote", label: "견적 문의 관리", icon: MessageSquare },
  { key: "estimate", label: "견적 관리", icon: FileText },
  { key: "reservation", label: "예약 관리", icon: CalendarCheck },
  { key: "team", label: "작업팀 관리", icon: Users2 },
  { key: "vehicle", label: "차량 관리", icon: Truck },
  { key: "workstatus", label: "작업 현황", icon: ListChecks },
  { key: "payment", label: "결제 관리", icon: Wallet },
  {
    key: "content",
    label: "홈페이지 관리",
    icon: PackageSearch,
    children: [
      { key: "case-list", label: "작업 사례 목록", icon: PackageSearch },
      { key: "case-register", label: "작업 사례 등록", icon: Plus },
      { key: "service", label: "서비스 관리", icon: Wrench },
      { key: "region", label: "서비스 지역 관리", icon: MapPinned },
    ],
  },
  { key: "review", label: "후기 관리", icon: Star },
  { key: "claim", label: "클레임/A·S 관리", icon: Wrench },
  {
    key: "admin",
    label: "관리자/직원",
    icon: ShieldCheck,
    children: [
      { key: "staff", label: "직원 목록", icon: ShieldCheck },
      { key: "permission", label: "권한 설정", icon: Lock },
    ],
  },
  { key: "settings", label: "홈페이지 설정", icon: Settings },
  { key: "activitylog", label: "활동 로그", icon: History },
];

export const FLAT_MENU: AdminMenuLeaf[] = MENU.flatMap((item) => item.children ?? [item]);
