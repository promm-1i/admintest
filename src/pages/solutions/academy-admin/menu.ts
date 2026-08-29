import {
  LayoutDashboard,
  MessageSquare,
  Users,
  ClipboardList,
  BookOpen,
  Plus,
  CalendarCheck,
  CalendarDays,
  GraduationCap,
  Wallet,
  UserSquare,
  UserPlus,
  Star,
  Award,
  Megaphone,
  FolderOpen,
  ShieldCheck,
  Lock,
  Settings,
  History,
} from "lucide-react";
import type { AdminMenuItem, AdminMenuLeaf } from "@/components/site/IndustryAdminShell";

export const MENU: AdminMenuItem[] = [
  { key: "dashboard", label: "대시보드", icon: LayoutDashboard },
  { key: "consult", label: "수강 상담 관리", icon: MessageSquare },
  { key: "student", label: "학생/학부모 관리", icon: Users },
  { key: "enrollment", label: "수강등록 관리", icon: ClipboardList },
  {
    key: "course",
    label: "강의 관리",
    icon: BookOpen,
    children: [
      { key: "course-list", label: "강의 목록", icon: BookOpen },
      { key: "course-register", label: "강의 등록", icon: Plus },
    ],
  },
  { key: "attendance", label: "출결 관리", icon: CalendarCheck },
  { key: "timetable", label: "시간표", icon: CalendarDays },
  { key: "grade", label: "성적 관리", icon: GraduationCap },
  { key: "tuition", label: "수강료 관리", icon: Wallet },
  {
    key: "teacher",
    label: "강사 관리",
    icon: UserSquare,
    children: [
      { key: "teacher-list", label: "강사 목록", icon: UserSquare },
      { key: "teacher-register", label: "강사 등록", icon: UserPlus },
    ],
  },
  { key: "review", label: "후기 관리", icon: Star },
  { key: "achievement", label: "합격/성과 관리", icon: Award },
  {
    key: "content",
    label: "홈페이지 관리",
    icon: Megaphone,
    children: [
      { key: "notice", label: "공지사항", icon: Megaphone },
      { key: "material", label: "자료실", icon: FolderOpen },
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
