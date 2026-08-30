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
  spaceType: string;
  budget: string;
  content: string;
  status: "접수" | "상담중" | "완료";
  assignee: string;
};

export type SiteSurvey = {
  id: number;
  customerName: string;
  address: string;
  area: string;
  scheduledDate: string;
  surveyor: string;
  status: "예정" | "완료" | "취소";
  memo: string;
};

export type EstimateItem = { name: string; cost: string };

export type Estimate = {
  id: number;
  customerName: string;
  projectName: string;
  area: string;
  items: EstimateItem[];
  totalAmount: string;
  status: "작성중" | "발송완료" | "승인" | "반려";
  createdDate: string;
};

export type Contract = {
  id: number;
  customerName: string;
  projectName: string;
  contractAmount: string;
  contractDate: string;
  status: "계약대기" | "계약완료" | "취소";
};

export type Project = {
  id: number;
  customerName: string;
  projectName: string;
  area: string;
  startDate: string;
  endDate: string;
  manager: string;
  status: "진행전" | "진행중" | "완료" | "보류";
};

export type ProcessStep = {
  id: number;
  projectName: string;
  stepName: string;
  scheduledDate: string;
  status: "예정" | "진행중" | "완료";
  worker: string;
};

export type MaterialItem = {
  id: number;
  name: string;
  category: string;
  supplier: string;
  unitPrice: string;
  projectName: string;
  status: "주문" | "입고" | "사용완료";
};

export type Partner = {
  id: number;
  name: string;
  category: string;
  contact: string;
  phone: string;
  rating: number;
};

export type Payment = {
  id: number;
  customerName: string;
  projectName: string;
  amount: string;
  dueDate: string;
  status: "완납" | "부분납부" | "미납";
};

export type AsRequest = {
  id: number;
  customerName: string;
  projectName: string;
  content: string;
  requestDate: string;
  status: "접수" | "처리중" | "완료";
  assignee: string;
};

export type Package = { id: number; title: string; area: string; price: string; published: boolean };

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
  showCases: boolean;
  showPackages: boolean;
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  companyName: "NOVERIQ 인테리어",
  tagline: "설계부터 시공까지, 믿을 수 있는 리모델링",
  phone: "02-000-0000",
  address: "서울특별시 강남구 테헤란로 123",
  hours: "평일 09:00 - 18:00 / 토 09:00 - 15:00",
  showCases: true,
  showPackages: true,
};

export type ActivityLog = { id: number; time: string; action: string; target: string };
