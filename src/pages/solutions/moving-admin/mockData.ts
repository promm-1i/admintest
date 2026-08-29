import type { Case, QuoteInquiry, ServiceRegion, Staff } from "./types";

export const REGIONS = ["서울", "경기", "인천", "전국"];

export const INITIAL_CASES: Case[] = [
  { id: 1, name: "강남구 30평대 포장이사", region: "서울", price: "120만원", status: "공개", icon: "📦" },
  { id: 2, name: "분당 신축 입주청소", region: "경기", price: "45만원", status: "공개", icon: "🧹" },
  { id: 3, name: "인천 원룸 반포장이사", region: "인천", price: "55만원", status: "공개", icon: "📦" },
  { id: 4, name: "서초구 사무실 이전", region: "서울", price: "200만원", status: "비공개", icon: "📦" },
];

export const INITIAL_INQUIRIES: QuoteInquiry[] = [
  { id: 1, name: "이견적", phone: "010-****-1111", region: "서울", content: "24평 아파트 포장이사 견적 문의드립니다.", status: "접수" },
];

export const INITIAL_REGIONS: ServiceRegion[] = [
  { id: 1, name: "서울 전지역", published: true },
  { id: 2, name: "경기 남부권", published: true },
  { id: 3, name: "인천 전지역 (준비중)", published: false },
];

export const INITIAL_STAFF: Staff[] = [
  { id: 1, name: "한대표", role: "관리자", position: "대표", phone: "010-0000-0001", status: "재직" },
  { id: 2, name: "김기사", role: "직원", position: "이사팀장", phone: "010-0000-0002", status: "재직" },
];
