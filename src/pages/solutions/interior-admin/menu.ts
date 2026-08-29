import { LayoutDashboard, Hammer, Plus, MessageSquare, Package as PackageIcon, ShieldCheck } from "lucide-react";
import type { AdminMenuItem, AdminMenuLeaf } from "@/components/site/IndustryAdminShell";

export const MENU: AdminMenuItem[] = [
  { key: "dashboard", label: "대시보드", icon: LayoutDashboard },
  {
    key: "case",
    label: "시공 사례 관리",
    icon: Hammer,
    children: [
      { key: "case-list", label: "시공 사례 목록", icon: Hammer },
      { key: "case-register", label: "시공 사례 등록", icon: Plus },
    ],
  },
  { key: "quote", label: "견적 문의 관리", icon: MessageSquare },
  { key: "package", label: "평형별 패키지 관리", icon: PackageIcon },
  { key: "staff", label: "관리자 모드", icon: ShieldCheck },
];

export const FLAT_MENU: AdminMenuLeaf[] = MENU.flatMap((item) => item.children ?? [item]);
