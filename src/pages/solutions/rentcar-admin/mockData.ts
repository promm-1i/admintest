import type { Vehicle, RentalInquiry, Notice, Staff } from "./types";

export const VEHICLE_TYPES = ["승용", "SUV", "승합", "화물"];

export const INITIAL_VEHICLES: Vehicle[] = [
  { id: 1, name: "아반떼", type: "승용", category: "준중형", dailyPrice: 55000, status: "공개", location: "본점", image: "🚗" },
  { id: 2, name: "쏘나타", type: "승용", category: "중형", dailyPrice: 70000, status: "공개", location: "본점", image: "🚗" },
  { id: 3, name: "그랜저", type: "승용", category: "대형", dailyPrice: 110000, status: "공개", location: "강남점", image: "🚙" },
  { id: 4, name: "캐스퍼", type: "승용", category: "경형", dailyPrice: 40000, status: "공개", location: "본점", image: "🚗" },
  { id: 5, name: "쏘렌토", type: "SUV", category: "SUV", dailyPrice: 95000, status: "공개", location: "강남점", image: "🚙" },
  { id: 6, name: "팰리세이드", type: "SUV", category: "SUV", dailyPrice: 130000, status: "공개", location: "본점", image: "🚙" },
  { id: 7, name: "스타리아", type: "승합", category: "승합", dailyPrice: 150000, status: "공개", location: "본점", image: "🚐" },
  { id: 8, name: "카니발", type: "승합", category: "승합", dailyPrice: 140000, status: "공개", location: "강남점", image: "🚐" },
  { id: 9, name: "포터2", type: "화물", category: "소형", dailyPrice: 65000, status: "비공개", location: "본점", image: "🚚" },
  { id: 10, name: "모닝", type: "승용", category: "경형", dailyPrice: 38000, status: "공개", location: "본점", image: "🚗" },
  { id: 11, name: "K5", type: "승용", category: "중형", dailyPrice: 72000, status: "공개", location: "강남점", image: "🚗" },
  { id: 12, name: "투싼", type: "SUV", category: "SUV", dailyPrice: 85000, status: "비공개", location: "본점", image: "🚙" },
];

export const INITIAL_INQUIRIES: RentalInquiry[] = [
  { id: 1, name: "김철수", phone: "010-****-1111", vehicle: "쏘렌토", content: "8/30~9/1 강남점 대여 가능한가요?", type: "예약", status: "접수" },
  { id: 2, name: "이영희", phone: "010-****-2222", vehicle: "아반떼", content: "장기렌트 가능 여부 문의드립니다.", type: "문의", status: "상담중" },
  { id: 3, name: "박민수", phone: "010-****-3333", vehicle: "카니발", content: "9인승 카니발 주말 예약합니다.", type: "예약", status: "완료" },
];

export const INITIAL_NOTICES: Notice[] = [
  { id: 1, title: "추석 연휴 운영시간 안내", published: true },
  { id: 2, title: "강남점 신규 오픈 안내", published: true },
  { id: 3, title: "차량 점검 일정 안내 (작성중)", published: false },
];

export const INITIAL_STAFF: Staff[] = [
  { id: 1, name: "정대표", role: "관리자", position: "대표", phone: "010-0000-0001", status: "재직" },
  { id: 2, name: "김직원", role: "직원", position: "본점 매니저", phone: "010-0000-0002", status: "재직" },
  { id: 3, name: "이직원", role: "직원", position: "강남점 매니저", phone: "010-0000-0003", status: "재직" },
];
