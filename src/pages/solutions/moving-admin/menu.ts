import { LayoutDashboard, PackageSearch, Plus, MessageSquare, MapPinned, ShieldCheck } from "lucide-react";
import type { AdminMenuItem, AdminMenuLeaf } from "@/components/site/IndustryAdminShell";

export const MENU: AdminMenuItem[] = [
  { key: "dashboard", label: "대시보드", icon: LayoutDashboard },
  {
    key: "case",
    label: "작업 사례 관리",
    icon: PackageSearch,
    children: [
      { key: "case-list", label: "작업 사례 목록", icon: PackageSearch },
      { key: "case-register", label: "작업 사례 등록", icon: Plus },
    ],
  },
  { key: "quote", label: "견적 문의 관리", icon: MessageSquare },
  { key: "region", label: "서비스 지역 관리", icon: MapPinned },
  { key: "staff", label: "관리자 모드", icon: ShieldCheck },
];

export const FLAT_MENU: AdminMenuLeaf[] = MENU.flatMap((item) => item.children ?? [item]);
