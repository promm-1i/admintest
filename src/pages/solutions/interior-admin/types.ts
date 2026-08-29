export type Case = {
  id: number;
  name: string;
  area: string;
  price: string;
  status: "공개" | "비공개";
  icon: string;
};

export const EMPTY_CASE_FORM = {
  name: "",
  area: "20평대",
  price: "",
};

export type QuoteInquiry = {
  id: number;
  name: string;
  phone: string;
  area: string;
  content: string;
  status: "접수" | "상담중" | "완료";
};

export type Package = { id: number; title: string; published: boolean };

export type Staff = {
  id: number;
  name: string;
  role: "관리자" | "직원";
  position: string;
  phone: string;
  status: "재직" | "비활성";
};

export type ActivityLog = { id: number; time: string; action: string; target: string };
