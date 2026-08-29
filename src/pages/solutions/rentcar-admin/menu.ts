import {
  LayoutDashboard,
  Car,
  Plus,
  MessageSquare,
  CalendarCheck,
  Newspaper,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type MenuLeaf = { key: string; label: string; icon: LucideIcon };
export type MenuItem = MenuLeaf & { children?: MenuLeaf[] };

export const MENU: MenuItem[] = [
  { key: "dashboard", label: "대시보드", icon: LayoutDashboard },
  {
    key: "vehicle",
    label: "차량 관리",
    icon: Car,
    children: [
      { key: "vehicle-list", label: "차량 목록", icon: Car },
      { key: "vehicle-register", label: "차량 등록", icon: Plus },
    ],
  },
  { key: "inquiry", label: "렌트 문의 관리", icon: MessageSquare },
  { key: "reservation", label: "예약 상담 접수", icon: CalendarCheck },
  { key: "notice", label: "공지사항", icon: Newspaper },
  { key: "staff", label: "관리자 모드", icon: ShieldCheck },
];

export const FLAT_MENU: MenuLeaf[] = MENU.flatMap((item) => item.children ?? [item]);
