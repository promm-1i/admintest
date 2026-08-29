import type { Case, QuoteInquiry, Package, Staff } from "./types";

export const AREAS = ["10평대", "20평대", "30평대", "40평대 이상"];

export const INITIAL_CASES: Case[] = [
  { id: 1, name: "역삼동 24평 아파트 전체 리모델링", area: "20평대", price: "3,200만원", status: "공개", icon: "🏠" },
  { id: 2, name: "판교 34평 주방·거실 리모델링", area: "30평대", price: "2,800만원", status: "공개", icon: "🏠" },
  { id: 3, name: "홍대 원룸 셀프 인테리어", area: "10평대", price: "800만원", status: "공개", icon: "🏢" },
  { id: 4, name: "분당 45평 전체 리모델링", area: "40평대 이상", price: "5,500만원", status: "비공개", icon: "🏠" },
];

export const INITIAL_INQUIRIES: QuoteInquiry[] = [
  { id: 1, name: "김견적", phone: "010-****-1111", area: "20평대", content: "화장실, 주방 리모델링 견적 문의드립니다.", status: "접수" },
];

export const INITIAL_PACKAGES: Package[] = [
  { id: 1, title: "10평대 패키지 - 800만원부터", published: true },
  { id: 2, title: "20평대 패키지 - 2,200만원부터", published: true },
  { id: 3, title: "30평대 패키지 - 3,200만원부터 (작성중)", published: false },
];

export const INITIAL_STAFF: Staff[] = [
  { id: 1, name: "정대표", role: "관리자", position: "대표", phone: "010-0000-0001", status: "재직" },
  { id: 2, name: "박실장", role: "직원", position: "시공팀장", phone: "010-0000-0002", status: "재직" },
];
