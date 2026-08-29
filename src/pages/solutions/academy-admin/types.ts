export type Course = {
  id: number;
  name: string;
  subject: string;
  schedule: string;
  price: string;
  status: "공개" | "비공개";
  icon: string;
};

export const EMPTY_COURSE_FORM = {
  name: "",
  subject: "수학",
  schedule: "",
  price: "",
};

export type ConsultInquiry = {
  id: number;
  name: string;
  phone: string;
  course: string;
  content: string;
  status: "접수" | "상담중" | "완료";
};

export type Review = { id: number; title: string; published: boolean };

export type Staff = {
  id: number;
  name: string;
  role: "관리자" | "직원";
  position: string;
  phone: string;
  status: "재직" | "비활성";
};

export type ActivityLog = { id: number; time: string; action: string; target: string };
