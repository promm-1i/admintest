import { LayoutDashboard, BookOpen, Plus, MessageSquare, Award, ShieldCheck } from "lucide-react";
import type { AdminMenuItem, AdminMenuLeaf } from "@/components/site/IndustryAdminShell";

export const MENU: AdminMenuItem[] = [
  { key: "dashboard", label: "대시보드", icon: LayoutDashboard },
  {
    key: "course",
    label: "강의 관리",
    icon: BookOpen,
    children: [
      { key: "course-list", label: "강의 목록", icon: BookOpen },
      { key: "course-register", label: "강의 등록", icon: Plus },
    ],
  },
  { key: "consult", label: "수강 상담 관리", icon: MessageSquare },
  { key: "review", label: "합격 · 후기 관리", icon: Award },
  { key: "staff", label: "관리자 모드", icon: ShieldCheck },
];

export const FLAT_MENU: AdminMenuLeaf[] = MENU.flatMap((item) => item.children ?? [item]);
