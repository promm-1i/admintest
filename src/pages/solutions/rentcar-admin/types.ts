export type Vehicle = {
  id: number;
  name: string;
  type: string;
  category: "경형" | "소형" | "준중형" | "중형" | "대형" | "SUV" | "승합";
  dailyPrice: number;
  status: "공개" | "비공개";
  location: string;
  image: string;
};

export const EMPTY_VEHICLE_FORM = {
  name: "",
  type: "승용",
  category: "준중형" as Vehicle["category"],
  dailyPrice: 60000,
  location: "본점",
};

export type RentalInquiry = {
  id: number;
  name: string;
  phone: string;
  vehicle: string;
  content: string;
  type: "문의" | "예약";
  status: "접수" | "상담중" | "완료";
};

export type Notice = { id: number; title: string; published: boolean };

export type Staff = {
  id: number;
  name: string;
  role: "관리자" | "직원";
  position: string;
  phone: string;
  status: "재직" | "비활성";
};

export type ActivityLog = { id: number; time: string; action: string; target: string };
