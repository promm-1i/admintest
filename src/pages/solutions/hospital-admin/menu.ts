import {
  LayoutDashboard,
  Stethoscope,
  Plus,
  Users,
  UserPlus,
  CalendarCheck,
  CalendarDays,
  Contact,
  MessageSquare,
  ReceiptText,
  Star,
  Megaphone,
  Image,
  ShieldCheck,
  Lock,
  Settings,
  History,
} from "lucide-react";
import type { AdminMenuItem, AdminMenuLeaf } from "@/components/site/IndustryAdminShell";

export const MENU: AdminMenuItem[] = [
  { key: "dashboard", label: "대시보드", icon: LayoutDashboard },
  {
    key: "department",
    label: "진료과목 관리",
    icon: Stethoscope,
    children: [
      { key: "department-list", label: "진료과목 목록", icon: Stethoscope },
      { key: "department-register", label: "진료과목 등록", icon: Plus },
    ],
  },
  {
    key: "doctor",
    label: "의료진 관리",
    icon: Users,
    children: [
      { key: "doctor-list", label: "의료진 목록", icon: Users },
      { key: "doctor-register", label: "의료진 등록", icon: UserPlus },
    ],
  },
  {
    key: "reservation",
    label: "예약 관리",
    icon: CalendarCheck,
    children: [
      { key: "reservation-list", label: "예약 목록", icon: CalendarCheck },
      { key: "reservation-calendar", label: "진료 일정", icon: CalendarDays },
    ],
  },
  { key: "customer", label: "고객 관리", icon: Contact },
  { key: "consult", label: "상담 문의 관리", icon: MessageSquare },
  { key: "noncovered", label: "비급여 관리", icon: ReceiptText },
  { key: "review", label: "후기 관리", icon: Star },
  {
    key: "content",
    label: "홈페이지 관리",
    icon: Megaphone,
    children: [
      { key: "notice", label: "공지사항", icon: Megaphone },
      { key: "banner", label: "배너 관리", icon: Image },
    ],
  },
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
