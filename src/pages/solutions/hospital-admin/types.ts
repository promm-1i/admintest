export type Department = {
  id: number;
  name: string;
  doctor: string;
  desc: string;
  status: "공개" | "비공개";
  icon: string;
};

export const EMPTY_DEPARTMENT_FORM = {
  name: "",
  doctor: "",
  desc: "",
};

export type ReservationInquiry = {
  id: number;
  name: string;
  phone: string;
  department: string;
  content: string;
  status: "접수" | "상담중" | "완료";
};

export type NonCoveredItem = { id: number; name: string; price: string; published: boolean };

export type Staff = {
  id: number;
  name: string;
  role: "관리자" | "직원";
  position: string;
  phone: string;
  status: "재직" | "비활성";
};

export type ActivityLog = { id: number; time: string; action: string; target: string };
