import type { Department, ReservationInquiry, NonCoveredItem, Staff } from "./types";

export const INITIAL_DEPARTMENTS: Department[] = [
  { id: 1, name: "내과", doctor: "김진료 원장", desc: "일반 진료, 건강검진, 만성질환 관리", status: "공개", icon: "🩺" },
  { id: 2, name: "정형외과", doctor: "박정형 원장", desc: "관절, 척추, 스포츠 손상 진료", status: "공개", icon: "🦴" },
  { id: 3, name: "피부과", doctor: "이피부 원장", desc: "여드름, 아토피, 피부질환 진료", status: "공개", icon: "🧴" },
  { id: 4, name: "소아청소년과", doctor: "최소아 원장", desc: "영유아 및 청소년 진료, 예방접종", status: "공개", icon: "🧸" },
  { id: 5, name: "치과", doctor: "정치아 원장", desc: "충치 치료, 교정, 임플란트", status: "비공개", icon: "🦷" },
];

export const INITIAL_INQUIRIES: ReservationInquiry[] = [
  { id: 1, name: "김민지", phone: "010-****-1111", department: "내과", content: "건강검진 예약하고 싶습니다.", status: "접수" },
  { id: 2, name: "박서준", phone: "010-****-2222", department: "정형외과", content: "무릎 통증 진료 문의드립니다.", status: "상담중" },
];

export const INITIAL_NONCOVERED: NonCoveredItem[] = [
  { id: 1, name: "건강검진 (종합)", price: "35만원", published: true },
  { id: 2, name: "예방접종 (독감)", price: "3만원", published: true },
  { id: 3, name: "미용 시술 상담", price: "무료", published: false },
];

export const INITIAL_STAFF: Staff[] = [
  { id: 1, name: "김진료", role: "관리자", position: "원장", phone: "010-0000-0001", status: "재직" },
  { id: 2, name: "정간호", role: "직원", position: "간호팀장", phone: "010-0000-0002", status: "재직" },
];
