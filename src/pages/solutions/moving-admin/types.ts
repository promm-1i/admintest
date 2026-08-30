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
  serviceType: string;
  fromAddress: string;
  toAddress: string;
  moveDate: string;
  content: string;
  status: "접수" | "상담중" | "완료";
  assignee: string;
};

export type QuoteItem = { name: string; cost: string };

export type Quote = {
  id: number;
  customerName: string;
  serviceType: string;
  fromAddress: string;
  toAddress: string;
  moveDate: string;
  items: QuoteItem[];
  totalAmount: string;
  status: "작성중" | "발송완료" | "승인" | "반려";
};

export type Reservation = {
  id: number;
  customerName: string;
  phone: string;
  serviceType: string;
  moveDate: string;
  time: string;
  team: string;
  vehicle: string;
  status: "대기" | "확정" | "완료" | "취소";
};

export type Team = {
  id: number;
  name: string;
  leader: string;
  members: number;
  phone: string;
  status: "대기" | "작업중" | "휴무";
};

export type Vehicle = {
  id: number;
  plateNumber: string;
  type: string;
  status: "대기" | "운행중" | "정비중";
  assignedTeam: string;
};

export type WorkStatus = {
  id: number;
  customerName: string;
  serviceType: string;
  date: string;
  stage: "출발전" | "이동중" | "작업중" | "완료";
  team: string;
};

export type Payment = {
  id: number;
  customerName: string;
  serviceType: string;
  amount: string;
  dueDate: string;
  status: "완납" | "부분납부" | "미납";
};

export type Service = { id: number; name: string; desc: string; basePrice: string; published: boolean };

export type ServiceRegion = { id: number; name: string; published: boolean };

export type Review = {
  id: number;
  customerName: string;
  serviceType: string;
  rating: number;
  content: string;
  published: boolean;
  date: string;
};

export type Claim = {
  id: number;
  customerName: string;
  content: string;
  requestDate: string;
  status: "접수" | "처리중" | "완료";
  assignee: string;
};

export type Staff = {
  id: number;
  name: string;
  role: "관리자" | "직원";
  position: string;
  phone: string;
  status: "재직" | "비활성";
};

export type SiteSettings = {
  companyName: string;
  tagline: string;
  phone: string;
  address: string;
  hours: string;
  showServices: boolean;
  showCases: boolean;
  showRegions: boolean;
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  companyName: "NOVERIQ 이사·청소",
  tagline: "믿고 맡기는 포장이사 · 입주청소",
  phone: "1588-0000",
  address: "서울특별시 강남구 테헤란로 123",
  hours: "연중무휴 08:00 - 20:00",
  showServices: true,
  showCases: true,
  showRegions: true,
};

export type ActivityLog = { id: number; time: string; action: string; target: string };
