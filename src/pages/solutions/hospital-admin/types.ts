export type Department = {
  id: number;
  name: string;
  order: number;
  desc: string;
  status: "공개" | "비공개";
  icon: string;
};

export const EMPTY_DEPARTMENT_FORM = { name: "", desc: "", order: 99 };

export type Doctor = {
  id: number;
  name: string;
  department: string;
  position: string;
  career: string;
  days: string;
  profile: string;
  public: boolean;
};

export const EMPTY_DOCTOR_FORM = { name: "", department: "", position: "전문의", career: "", days: "월~금", profile: "" };

export type Reservation = {
  id: number;
  customerName: string;
  phone: string;
  department: string;
  doctor: string;
  date: string;
  time: string;
  status: "대기" | "확정" | "완료" | "취소";
  memo: string;
};

export type Consult = {
  id: number;
  name: string;
  phone: string;
  channel: "온라인" | "전화" | "예약문의";
  content: string;
  status: "접수" | "상담중" | "완료";
  assignee: string;
};

export type CustomerActivity = { id: number; type: string; content: string; at: string };

export type Customer = {
  id: number;
  name: string;
  phone: string;
  interestDepartment: string;
  firstContactAt: string;
  lastConsultAt: string;
  activities: CustomerActivity[];
};

export type NonCoveredItem = { id: number; category: string; name: string; price: string; desc: string; published: boolean };

export type Review = {
  id: number;
  customerName: string;
  department: string;
  rating: number;
  content: string;
  published: boolean;
  date: string;
};

export type Notice = { id: number; title: string; published: boolean };

export type Banner = { id: number; title: string; icon: string; active: boolean; order: number };

export type Staff = {
  id: number;
  name: string;
  role: "관리자" | "직원";
  position: string;
  phone: string;
  status: "재직" | "비활성";
};

export type SiteSettings = {
  hospitalName: string;
  tagline: string;
  phone: string;
  address: string;
  hours: string;
  showDoctors: boolean;
  showDepartments: boolean;
  showReserveButton: boolean;
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  hospitalName: "NOVERIQ 의원",
  tagline: "믿을 수 있는 진료, 편안한 병원",
  phone: "02-000-0000",
  address: "서울특별시 강남구 테헤란로 123",
  hours: "평일 09:00 - 18:00 / 토 09:00 - 13:00",
  showDoctors: true,
  showDepartments: true,
  showReserveButton: true,
};

export type ActivityLog = { id: number; time: string; action: string; target: string };
