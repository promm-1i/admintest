import { LayoutDashboard, Stethoscope, Plus, CalendarCheck, ReceiptText, ShieldCheck } from "lucide-react";
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
  { key: "reservation", label: "예약 문의 관리", icon: CalendarCheck },
  { key: "noncovered", label: "비급여 안내", icon: ReceiptText },
  { key: "staff", label: "관리자 모드", icon: ShieldCheck },
];

export const FLAT_MENU: AdminMenuLeaf[] = MENU.flatMap((item) => item.children ?? [item]);
