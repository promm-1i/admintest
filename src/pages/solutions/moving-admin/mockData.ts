import type {
  Case,
  QuoteInquiry,
  Quote,
  Reservation,
  Team,
  Vehicle,
  WorkStatus,
  Payment,
  Service,
  ServiceRegion,
  Review,
  Claim,
  Staff,
} from "./types";

export const REGIONS = ["서울", "경기", "인천", "전국"];
export const SERVICE_TYPES = ["포장이사", "반포장이사", "일반이사", "입주청소", "사무실이전"];

export const INITIAL_CASES: Case[] = [
  { id: 1, name: "강남구 30평대 포장이사", region: "서울", price: "120만원", status: "공개", icon: "📦" },
  { id: 2, name: "분당 신축 입주청소", region: "경기", price: "45만원", status: "공개", icon: "🧹" },
  { id: 3, name: "인천 원룸 반포장이사", region: "인천", price: "55만원", status: "공개", icon: "📦" },
  { id: 4, name: "서초구 사무실 이전", region: "서울", price: "200만원", status: "비공개", icon: "📦" },
  { id: 5, name: "일산 24평 일반이사", region: "경기", price: "65만원", status: "공개", icon: "🚚" },
  { id: 6, name: "송파구 40평대 포장이사", region: "서울", price: "150만원", status: "공개", icon: "📦" },
  { id: 7, name: "수원 오피스텔 입주청소", region: "경기", price: "35만원", status: "공개", icon: "🧹" },
];

export const INITIAL_INQUIRIES: QuoteInquiry[] = [
  { id: 1, name: "이견적", phone: "010-****-1111", region: "서울", serviceType: "포장이사", fromAddress: "서울 강남구", toAddress: "서울 송파구", moveDate: "2026-09-10", content: "24평 아파트 포장이사 견적 문의드립니다.", status: "완료", assignee: "한대표" },
  { id: 2, name: "박포장", phone: "010-****-2222", region: "경기", serviceType: "포장이사", fromAddress: "경기 판교", toAddress: "경기 분당", moveDate: "2026-09-12", content: "34평 포장이사 견적 부탁드립니다.", status: "완료", assignee: "김기사" },
  { id: 3, name: "최청소", phone: "010-****-3333", region: "서울", serviceType: "입주청소", fromAddress: "-", toAddress: "서울 서초구", moveDate: "2026-09-05", content: "신축 아파트 입주청소 문의드립니다.", status: "완료", assignee: "김기사" },
  { id: 4, name: "정반포", phone: "010-****-4444", region: "인천", serviceType: "반포장이사", fromAddress: "인천 연수구", toAddress: "인천 남동구", moveDate: "2026-09-08", content: "원룸 반포장이사 견적 원합니다.", status: "완료", assignee: "이팀장" },
  { id: 5, name: "강사무", phone: "010-****-5555", region: "서울", serviceType: "사무실이전", fromAddress: "서울 서초구", toAddress: "서울 강남구", moveDate: "2026-09-15", content: "사무실 이전 견적 문의드립니다.", status: "완료", assignee: "한대표" },
  { id: 6, name: "한일반", phone: "010-****-6666", region: "경기", serviceType: "일반이사", fromAddress: "경기 일산", toAddress: "경기 일산", moveDate: "2026-09-11", content: "24평 일반이사 견적 부탁드립니다.", status: "완료", assignee: "이팀장" },
  { id: 7, name: "오입주", phone: "010-****-7777", region: "서울", serviceType: "입주청소", fromAddress: "-", toAddress: "서울 송파구", moveDate: "2026-09-14", content: "40평대 입주청소 견적 원합니다.", status: "완료", assignee: "김기사" },
  { id: 8, name: "임포장", phone: "010-****-8888", region: "서울", serviceType: "포장이사", fromAddress: "서울 마포구", toAddress: "서울 은평구", moveDate: "2026-09-18", content: "포장이사 견적 문의드립니다.", status: "상담중", assignee: "한대표" },
  { id: 9, name: "서반포", phone: "010-****-9999", region: "경기", serviceType: "반포장이사", fromAddress: "경기 수원", toAddress: "경기 화성", moveDate: "2026-09-20", content: "오피스텔 반포장이사 견적 원합니다.", status: "상담중", assignee: "이팀장" },
  { id: 10, name: "조사무", phone: "010-****-1010", region: "인천", serviceType: "사무실이전", fromAddress: "인천 남동구", toAddress: "인천 부평구", moveDate: "2026-09-22", content: "소규모 사무실 이전 문의드립니다.", status: "접수", assignee: "-" },
];

export const INITIAL_QUOTES: Quote[] = [
  { id: 1, customerName: "이견적", serviceType: "포장이사", fromAddress: "서울 강남구", toAddress: "서울 송파구", moveDate: "2026-09-10", items: [{ name: "기본 포장이사", cost: "90만원" }, { name: "사다리차", cost: "20만원" }, { name: "에어컨 이전설치", cost: "10만원" }], totalAmount: "120만원", status: "승인" },
  { id: 2, customerName: "박포장", serviceType: "포장이사", fromAddress: "경기 판교", toAddress: "경기 분당", moveDate: "2026-09-12", items: [{ name: "기본 포장이사", cost: "130만원" }, { name: "피아노 운반", cost: "15만원" }], totalAmount: "145만원", status: "승인" },
  { id: 3, customerName: "최청소", serviceType: "입주청소", fromAddress: "-", toAddress: "서울 서초구", moveDate: "2026-09-05", items: [{ name: "기본 입주청소", cost: "40만원" }, { name: "새시 청소", cost: "5만원" }], totalAmount: "45만원", status: "승인" },
  { id: 4, customerName: "정반포", serviceType: "반포장이사", fromAddress: "인천 연수구", toAddress: "인천 남동구", moveDate: "2026-09-08", items: [{ name: "기본 반포장이사", cost: "50만원" }, { name: "사다리차", cost: "5만원" }], totalAmount: "55만원", status: "승인" },
  { id: 5, customerName: "강사무", serviceType: "사무실이전", fromAddress: "서울 서초구", toAddress: "서울 강남구", moveDate: "2026-09-15", items: [{ name: "기본 사무실이전", cost: "160만원" }, { name: "전산장비 이전", cost: "40만원" }], totalAmount: "200만원", status: "승인" },
  { id: 6, customerName: "한일반", serviceType: "일반이사", fromAddress: "경기 일산", toAddress: "경기 일산", moveDate: "2026-09-11", items: [{ name: "기본 일반이사", cost: "60만원" }, { name: "인력 추가(1인)", cost: "5만원" }], totalAmount: "65만원", status: "승인" },
  { id: 7, customerName: "오입주", serviceType: "입주청소", fromAddress: "-", toAddress: "서울 송파구", moveDate: "2026-09-14", items: [{ name: "기본 입주청소", cost: "65만원" }, { name: "베란다 확장부 청소", cost: "10만원" }], totalAmount: "75만원", status: "승인" },
  { id: 8, customerName: "임포장", serviceType: "포장이사", fromAddress: "서울 마포구", toAddress: "서울 은평구", moveDate: "2026-09-18", items: [{ name: "기본 포장이사", cost: "95만원" }], totalAmount: "95만원", status: "발송완료" },
  { id: 9, customerName: "서반포", serviceType: "반포장이사", fromAddress: "경기 수원", toAddress: "경기 화성", moveDate: "2026-09-20", items: [{ name: "기본 반포장이사", cost: "48만원" }], totalAmount: "48만원", status: "발송완료" },
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  { id: 1, customerName: "이견적", phone: "010-****-1111", serviceType: "포장이사", moveDate: "2026-09-10", time: "08:00", team: "1팀", vehicle: "5톤 (12가1234)", status: "확정" },
  { id: 2, customerName: "박포장", phone: "010-****-2222", serviceType: "포장이사", moveDate: "2026-09-12", time: "08:00", team: "2팀", vehicle: "5톤 (34나5678)", status: "확정" },
  { id: 3, customerName: "최청소", phone: "010-****-3333", serviceType: "입주청소", moveDate: "2026-09-05", time: "09:00", team: "청소팀", vehicle: "1톤 (56다1111)", status: "완료" },
  { id: 4, customerName: "정반포", phone: "010-****-4444", serviceType: "반포장이사", moveDate: "2026-09-08", time: "13:00", team: "3팀", vehicle: "2.5톤 (78라2222)", status: "완료" },
  { id: 5, customerName: "강사무", phone: "010-****-5555", serviceType: "사무실이전", moveDate: "2026-09-15", time: "19:00", team: "1팀", vehicle: "5톤 (12가1234)", status: "확정" },
  { id: 6, customerName: "한일반", phone: "010-****-6666", serviceType: "일반이사", moveDate: "2026-09-11", time: "08:00", team: "2팀", vehicle: "2.5톤 (78라2222)", status: "대기" },
  { id: 7, customerName: "오입주", phone: "010-****-7777", serviceType: "입주청소", moveDate: "2026-09-14", time: "09:00", team: "청소팀", vehicle: "1톤 (56다1111)", status: "확정" },
];

export const INITIAL_TEAMS: Team[] = [
  { id: 1, name: "1팀", leader: "김기사", members: 4, phone: "010-3000-0001", status: "대기" },
  { id: 2, name: "2팀", leader: "이팀장", members: 4, phone: "010-3000-0002", status: "작업중" },
  { id: 3, name: "3팀", leader: "박기사", members: 3, phone: "010-3000-0003", status: "대기" },
  { id: 4, name: "청소팀", leader: "최반장", members: 2, phone: "010-3000-0004", status: "대기" },
  { id: 5, name: "4팀", leader: "정기사", members: 3, phone: "010-3000-0005", status: "휴무" },
];

export const INITIAL_VEHICLES: Vehicle[] = [
  { id: 1, plateNumber: "12가1234", type: "5톤", status: "대기", assignedTeam: "1팀" },
  { id: 2, plateNumber: "34나5678", type: "5톤", status: "운행중", assignedTeam: "2팀" },
  { id: 3, plateNumber: "56다1111", type: "1톤", status: "대기", assignedTeam: "청소팀" },
  { id: 4, plateNumber: "78라2222", type: "2.5톤", status: "대기", assignedTeam: "3팀" },
  { id: 5, plateNumber: "90마3333", type: "스카이(사다리차)", status: "정비중", assignedTeam: "-" },
];

export const INITIAL_WORK_STATUS: WorkStatus[] = [
  { id: 1, customerName: "최청소", serviceType: "입주청소", date: "2026-09-05", stage: "완료", team: "청소팀" },
  { id: 2, customerName: "정반포", serviceType: "반포장이사", date: "2026-09-08", stage: "완료", team: "3팀" },
  { id: 3, customerName: "이견적", serviceType: "포장이사", date: "2026-09-10", stage: "출발전", team: "1팀" },
  { id: 4, customerName: "한일반", serviceType: "일반이사", date: "2026-09-11", stage: "출발전", team: "2팀" },
  { id: 5, customerName: "박포장", serviceType: "포장이사", date: "2026-09-12", stage: "출발전", team: "2팀" },
  { id: 6, customerName: "오입주", serviceType: "입주청소", date: "2026-09-14", stage: "출발전", team: "청소팀" },
  { id: 7, customerName: "강사무", serviceType: "사무실이전", date: "2026-09-15", stage: "출발전", team: "1팀" },
];

export const INITIAL_PAYMENTS: Payment[] = [
  { id: 1, customerName: "이견적", serviceType: "포장이사", amount: "120만원", dueDate: "2026-09-10", status: "완납" },
  { id: 2, customerName: "박포장", serviceType: "포장이사", amount: "145만원", dueDate: "2026-09-12", status: "부분납부" },
  { id: 3, customerName: "최청소", serviceType: "입주청소", amount: "45만원", dueDate: "2026-09-05", status: "완납" },
  { id: 4, customerName: "정반포", serviceType: "반포장이사", amount: "55만원", dueDate: "2026-09-08", status: "완납" },
  { id: 5, customerName: "강사무", serviceType: "사무실이전", amount: "200만원", dueDate: "2026-09-15", status: "부분납부" },
  { id: 6, customerName: "한일반", serviceType: "일반이사", amount: "65만원", dueDate: "2026-09-11", status: "미납" },
  { id: 7, customerName: "오입주", serviceType: "입주청소", amount: "75만원", dueDate: "2026-09-14", status: "미납" },
];

export const INITIAL_SERVICES: Service[] = [
  { id: 1, name: "포장이사", desc: "짐 포장부터 정리까지 원스톱으로 진행합니다.", basePrice: "24평 기준 90만원부터", published: true },
  { id: 2, name: "반포장이사", desc: "주요 짐만 포장, 나머지는 고객이 직접 정리합니다.", basePrice: "원룸 기준 45만원부터", published: true },
  { id: 3, name: "일반이사", desc: "운반 인력과 차량만 제공하는 기본 이사 서비스입니다.", basePrice: "24평 기준 55만원부터", published: true },
  { id: 4, name: "입주청소", desc: "신축·이사 후 입주 전 전문 청소 서비스입니다.", basePrice: "24평 기준 35만원부터", published: true },
  { id: 5, name: "사무실이전", desc: "전산장비 이전을 포함한 사무실 전용 이사 서비스입니다.", basePrice: "상담 후 견적", published: true },
];

export const INITIAL_REGIONS: ServiceRegion[] = [
  { id: 1, name: "서울 전지역", published: true },
  { id: 2, name: "경기 남부권", published: true },
  { id: 3, name: "경기 북부권", published: true },
  { id: 4, name: "인천 전지역", published: true },
  { id: 5, name: "충청권 (준비중)", published: false },
];

export const INITIAL_REVIEWS: Review[] = [
  { id: 1, customerName: "이견적", serviceType: "포장이사", rating: 5, content: "빠르고 꼼꼼하게 이사해주셨어요.", published: true, date: "2026-08-20" },
  { id: 2, customerName: "박포장", serviceType: "포장이사", rating: 5, content: "피아노도 안전하게 옮겨주셨습니다.", published: true, date: "2026-08-18" },
  { id: 3, customerName: "최청소", serviceType: "입주청소", rating: 4, content: "새시까지 꼼꼼하게 청소해주셨어요.", published: true, date: "2026-08-15" },
  { id: 4, customerName: "정반포", serviceType: "반포장이사", rating: 5, content: "가격 대비 만족스러운 서비스였습니다.", published: true, date: "2026-08-10" },
  { id: 5, customerName: "강사무", serviceType: "사무실이전", rating: 4, content: "전산장비도 안전하게 이전해주셨어요.", published: false, date: "2026-08-05" },
  { id: 6, customerName: "한일반", serviceType: "일반이사", rating: 5, content: "친절하고 신속했습니다.", published: true, date: "2026-07-28" },
];

export const INITIAL_CLAIMS: Claim[] = [
  { id: 1, customerName: "박포장", content: "이사 중 가구 모서리에 흠집이 생겼습니다.", requestDate: "2026-09-13", status: "처리중", assignee: "이팀장" },
  { id: 2, customerName: "최청소", content: "베란다 창틀 청소가 누락되었습니다.", requestDate: "2026-09-06", status: "완료", assignee: "최반장" },
  { id: 3, customerName: "정반포", content: "박스 하나가 분실된 것 같습니다.", requestDate: "2026-09-09", status: "접수", assignee: "-" },
];

export const INITIAL_STAFF: Staff[] = [
  { id: 1, name: "한대표", role: "관리자", position: "대표", phone: "010-0000-0001", status: "재직" },
  { id: 2, name: "김기사", role: "관리자", position: "운영팀장", phone: "010-0000-0002", status: "재직" },
  { id: 3, name: "이팀장", role: "직원", position: "1팀 팀장", phone: "010-0000-0003", status: "재직" },
  { id: 4, name: "박기사", role: "직원", position: "3팀 팀장", phone: "010-0000-0004", status: "재직" },
  { id: 5, name: "최반장", role: "직원", position: "청소팀 반장", phone: "010-0000-0005", status: "재직" },
  { id: 6, name: "정접수", role: "직원", position: "견적 상담", phone: "010-0000-0006", status: "비활성" },
];
