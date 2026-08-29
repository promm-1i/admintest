export type Case = {
  id: number;
  name: string;
  region: string;
  price: string;
  status: "공개" | "비공개";
  icon: string;
};

export const EMPTY_CASE_FORM = {
  name: "",
  region: "서울",
  price: "",
};

export type QuoteInquiry = {
  id: number;
  name: string;
  phone: string;
  region: string;
  content: string;
  status: "접수" | "상담중" | "완료";
};

export type ServiceRegion = { id: number; name: string; published: boolean };

export type Staff = {
  id: number;
  name: string;
  role: "관리자" | "직원";
  position: string;
  phone: string;
  status: "재직" | "비활성";
};

export type ActivityLog = { id: number; time: string; action: string; target: string };
