import {
  LayoutDashboard,
  MessageSquare,
  Ruler,
  FileText,
  FileSignature,
  FolderKanban,
  ListChecks,
  Boxes,
  Users2,
  Wallet,
  Wrench,
  Hammer,
  Plus,
  Package as PackageIcon,
  ShieldCheck,
  Lock,
  Settings,
  History,
} from "lucide-react";
import type { AdminMenuItem, AdminMenuLeaf } from "@/components/site/IndustryAdminShell";

export const MENU: AdminMenuItem[] = [
  { key: "dashboard", label: "대시보드", icon: LayoutDashboard },
  { key: "quote", label: "견적 문의 관리", icon: MessageSquare },
  { key: "survey", label: "현장 실측 관리", icon: Ruler },
  { key: "estimate", label: "견적서 관리", icon: FileText },
  { key: "contract", label: "계약 관리", icon: FileSignature },
  { key: "project", label: "프로젝트 관리", icon: FolderKanban },
  { key: "process", label: "공정 관리", icon: ListChecks },
  { key: "material", label: "자재 관리", icon: Boxes },
  { key: "partner", label: "협력업체 관리", icon: Users2 },
  { key: "payment", label: "결제 관리", icon: Wallet },
  { key: "as", label: "A/S 관리", icon: Wrench },
  {
    key: "content",
    label: "홈페이지 관리",
    icon: Hammer,
    children: [
      { key: "case-list", label: "시공 사례 목록", icon: Hammer },
      { key: "case-register", label: "시공 사례 등록", icon: Plus },
      { key: "package", label: "평형별 패키지", icon: PackageIcon },
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
