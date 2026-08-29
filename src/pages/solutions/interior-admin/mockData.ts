import type {
  Case,
  QuoteInquiry,
  SiteSurvey,
  Estimate,
  Contract,
  Project,
  ProcessStep,
  MaterialItem,
  Partner,
  Payment,
  AsRequest,
  Package,
  Staff,
} from "./types";

export const AREAS = ["10평대", "20평대", "30평대", "40평대 이상"];

export const INITIAL_CASES: Case[] = [
  { id: 1, name: "역삼동 24평 아파트 전체 리모델링", area: "20평대", price: "3,200만원", status: "공개", icon: "🏠" },
  { id: 2, name: "판교 34평 주방·거실 리모델링", area: "30평대", price: "2,800만원", status: "공개", icon: "🏠" },
  { id: 3, name: "홍대 원룸 셀프 인테리어", area: "10평대", price: "800만원", status: "공개", icon: "🏢" },
  { id: 4, name: "분당 45평 전체 리모델링", area: "40평대 이상", price: "5,500만원", status: "비공개", icon: "🏠" },
  { id: 5, name: "잠실 28평 화장실·주방 리모델링", area: "20평대", price: "2,600만원", status: "공개", icon: "🏠" },
  { id: 6, name: "목동 33평 전체 리모델링", area: "30평대", price: "3,900만원", status: "공개", icon: "🏠" },
  { id: 7, name: "강남 15평 오피스텔 인테리어", area: "10평대", price: "1,200만원", status: "공개", icon: "🏢" },
  { id: 8, name: "일산 26평 도배·마루 시공", area: "20평대", price: "1,800만원", status: "공개", icon: "🏠" },
];

export const INITIAL_INQUIRIES: QuoteInquiry[] = [
  { id: 1, name: "김견적", phone: "010-****-1111", area: "20평대", spaceType: "전체", budget: "3,000만원대", content: "화장실, 주방 리모델링 견적 문의드립니다.", status: "완료", assignee: "정대표" },
  { id: 2, name: "박현장", phone: "010-****-2222", area: "30평대", spaceType: "거실·주방", budget: "2,800만원대", content: "거실, 주방 위주로 리모델링 원합니다.", status: "완료", assignee: "박실장" },
  { id: 3, name: "이도급", phone: "010-****-3333", area: "10평대", spaceType: "전체", budget: "800만원대", content: "원룸 셀프 인테리어 상담 원합니다.", status: "완료", assignee: "박실장" },
  { id: 4, name: "최시공", phone: "010-****-4444", area: "40평대 이상", spaceType: "전체", budget: "5,000만원대", content: "45평 전체 리모델링 견적 부탁드립니다.", status: "완료", assignee: "정대표" },
  { id: 5, name: "정마감", phone: "010-****-5555", area: "20평대", spaceType: "화장실·주방", budget: "2,500만원대", content: "화장실, 주방 리모델링 상담 원합니다.", status: "완료", assignee: "박실장" },
  { id: 6, name: "강준공", phone: "010-****-6666", area: "30평대", spaceType: "전체", budget: "3,800만원대", content: "33평 전체 리모델링 문의드립니다.", status: "완료", assignee: "정대표" },
  { id: 7, name: "서철거", phone: "010-****-7777", area: "10평대", spaceType: "전체", budget: "1,200만원대", content: "오피스텔 인테리어 견적 원합니다.", status: "완료", assignee: "박실장" },
  { id: 8, name: "한도배", phone: "010-****-8888", area: "20평대", spaceType: "도배·마루", budget: "1,800만원대", content: "도배, 마루 시공 문의드립니다.", status: "완료", assignee: "박실장" },
  { id: 9, name: "오설비", phone: "010-****-9999", area: "30평대", spaceType: "설비", budget: "3,500만원대", content: "노후 설비 교체 포함 리모델링 원합니다.", status: "상담중", assignee: "정대표" },
  { id: 10, name: "임완공", phone: "010-****-1010", area: "40평대 이상", spaceType: "전체", budget: "6,000만원대", content: "48평 전체 리모델링 상담 원합니다.", status: "상담중", assignee: "박실장" },
  { id: 11, name: "신규문의A", phone: "010-****-2020", area: "20평대", spaceType: "주방", budget: "미정", content: "주방만 부분 리모델링 가능한가요?", status: "접수", assignee: "-" },
  { id: 12, name: "신규문의B", phone: "010-****-2121", area: "30평대", spaceType: "전체", budget: "미정", content: "34평 아파트 견적 문의드립니다.", status: "접수", assignee: "-" },
];

export const INITIAL_SURVEYS: SiteSurvey[] = [
  { id: 1, customerName: "김견적", address: "서울 강남구 역삼동", area: "20평대", scheduledDate: "2026-08-05", surveyor: "박실장", status: "완료", memo: "배관 노후, 화장실 방수 재시공 필요" },
  { id: 2, customerName: "박현장", address: "경기 성남시 판교", area: "30평대", scheduledDate: "2026-08-07", surveyor: "박실장", status: "완료", memo: "거실 확장 가능, 베란다 샷시 교체 권장" },
  { id: 3, customerName: "이도급", address: "서울 마포구 홍대", area: "10평대", scheduledDate: "2026-08-08", surveyor: "김반장", status: "완료", memo: "누수 흔적 없음, 셀프 시공 범위 협의 완료" },
  { id: 4, customerName: "최시공", address: "경기 성남시 분당", area: "40평대 이상", scheduledDate: "2026-08-10", surveyor: "박실장", status: "완료", memo: "전체 철거 필요, 구조 변경 협의 필요" },
  { id: 5, customerName: "정마감", address: "서울 송파구 잠실", area: "20평대", scheduledDate: "2026-08-12", surveyor: "김반장", status: "완료", memo: "주방 배관 위치 이동 가능 확인" },
  { id: 6, customerName: "강준공", address: "서울 양천구 목동", area: "30평대", scheduledDate: "2026-08-14", surveyor: "박실장", status: "완료", memo: "발코니 확장 이력 있음, 구조 안전 확인 완료" },
  { id: 7, customerName: "서철거", address: "서울 강남구", area: "10평대", scheduledDate: "2026-08-16", surveyor: "김반장", status: "완료", memo: "오피스텔 관리사무소 공사 승인 필요" },
  { id: 8, customerName: "한도배", address: "경기 고양시 일산", area: "20평대", scheduledDate: "2026-08-20", surveyor: "김반장", status: "완료", memo: "도배·마루만 진행, 별도 철거 불필요" },
  { id: 9, customerName: "오설비", address: "경기 수원시", area: "30평대", scheduledDate: "2026-09-03", surveyor: "박실장", status: "예정", memo: "" },
  { id: 10, customerName: "임완공", address: "인천광역시", area: "40평대 이상", scheduledDate: "2026-09-05", surveyor: "박실장", status: "예정", memo: "" },
];

export const INITIAL_ESTIMATES: Estimate[] = [
  { id: 1, customerName: "김견적", projectName: "역삼동 24평 전체 리모델링", area: "20평대", items: [{ name: "철거", cost: "300만원" }, { name: "설비", cost: "500만원" }, { name: "목공·도장", cost: "1,200만원" }, { name: "마루·도배", cost: "600만원" }, { name: "주방·화장실", cost: "600만원" }], totalAmount: "3,200만원", status: "승인", createdDate: "2026-08-06" },
  { id: 2, customerName: "박현장", projectName: "판교 34평 주방·거실 리모델링", area: "30평대", items: [{ name: "철거", cost: "250만원" }, { name: "거실 확장", cost: "800만원" }, { name: "주방 시공", cost: "1,200만원" }, { name: "샷시 교체", cost: "550만원" }], totalAmount: "2,800만원", status: "승인", createdDate: "2026-08-08" },
  { id: 3, customerName: "이도급", projectName: "홍대 원룸 셀프 인테리어", area: "10평대", items: [{ name: "도배·장판", cost: "300만원" }, { name: "조명·콘센트", cost: "200만원" }, { name: "자재 지원", cost: "300만원" }], totalAmount: "800만원", status: "승인", createdDate: "2026-08-09" },
  { id: 4, customerName: "최시공", projectName: "분당 45평 전체 리모델링", area: "40평대 이상", items: [{ name: "철거", cost: "500만원" }, { name: "구조변경", cost: "800만원" }, { name: "설비", cost: "900만원" }, { name: "목공·도장", cost: "1,800만원" }, { name: "마감재", cost: "1,500만원" }], totalAmount: "5,500만원", status: "승인", createdDate: "2026-08-11" },
  { id: 5, customerName: "정마감", projectName: "잠실 28평 화장실·주방 리모델링", area: "20평대", items: [{ name: "화장실 방수", cost: "400만원" }, { name: "화장실 마감", cost: "800만원" }, { name: "주방 시공", cost: "1,400만원" }], totalAmount: "2,600만원", status: "승인", createdDate: "2026-08-13" },
  { id: 6, customerName: "강준공", projectName: "목동 33평 전체 리모델링", area: "30평대", items: [{ name: "철거", cost: "300만원" }, { name: "설비", cost: "600만원" }, { name: "목공·도장", cost: "1,600만원" }, { name: "마감재", cost: "1,400만원" }], totalAmount: "3,900만원", status: "승인", createdDate: "2026-08-15" },
  { id: 7, customerName: "서철거", projectName: "강남 15평 오피스텔 인테리어", area: "10평대", items: [{ name: "철거", cost: "150만원" }, { name: "목공·도장", cost: "550만원" }, { name: "마감재", cost: "500만원" }], totalAmount: "1,200만원", status: "승인", createdDate: "2026-08-17" },
  { id: 8, customerName: "한도배", projectName: "일산 26평 도배·마루 시공", area: "20평대", items: [{ name: "도배", cost: "700만원" }, { name: "마루", cost: "1,100만원" }], totalAmount: "1,800만원", status: "승인", createdDate: "2026-08-21" },
  { id: 9, customerName: "오설비", projectName: "수원 38평 설비 리모델링", area: "30평대", items: [{ name: "설비 교체", cost: "1,200만원" }, { name: "목공·도장", cost: "1,300만원" }, { name: "마감재", cost: "1,000만원" }], totalAmount: "3,500만원", status: "발송완료", createdDate: "2026-08-25" },
  { id: 10, customerName: "임완공", projectName: "인천 48평 전체 리모델링", area: "40평대 이상", items: [{ name: "철거", cost: "600만원" }, { name: "설비", cost: "1,000만원" }, { name: "목공·도장", cost: "2,200만원" }, { name: "마감재", cost: "2,200만원" }], totalAmount: "6,000만원", status: "작성중", createdDate: "2026-08-28" },
];

export const INITIAL_CONTRACTS: Contract[] = [
  { id: 1, customerName: "김견적", projectName: "역삼동 24평 전체 리모델링", contractAmount: "3,200만원", contractDate: "2026-08-08", status: "계약완료" },
  { id: 2, customerName: "박현장", projectName: "판교 34평 주방·거실 리모델링", contractAmount: "2,800만원", contractDate: "2026-08-10", status: "계약완료" },
  { id: 3, customerName: "이도급", projectName: "홍대 원룸 셀프 인테리어", contractAmount: "800만원", contractDate: "2026-08-11", status: "계약완료" },
  { id: 4, customerName: "최시공", projectName: "분당 45평 전체 리모델링", contractAmount: "5,500만원", contractDate: "2026-08-13", status: "계약완료" },
  { id: 5, customerName: "정마감", projectName: "잠실 28평 화장실·주방 리모델링", contractAmount: "2,600만원", contractDate: "2026-08-15", status: "계약완료" },
  { id: 6, customerName: "강준공", projectName: "목동 33평 전체 리모델링", contractAmount: "3,900만원", contractDate: "2026-08-17", status: "계약완료" },
  { id: 7, customerName: "서철거", projectName: "강남 15평 오피스텔 인테리어", contractAmount: "1,200만원", contractDate: "2026-08-19", status: "계약완료" },
  { id: 8, customerName: "한도배", projectName: "일산 26평 도배·마루 시공", contractAmount: "1,800만원", contractDate: "2026-08-22", status: "계약완료" },
];

export const INITIAL_PROJECTS: Project[] = [
  { id: 1, customerName: "김견적", projectName: "역삼동 24평 전체 리모델링", area: "20평대", startDate: "2026-08-12", endDate: "2026-09-10", manager: "박실장", status: "완료" },
  { id: 2, customerName: "박현장", projectName: "판교 34평 주방·거실 리모델링", area: "30평대", startDate: "2026-08-14", endDate: "2026-09-15", manager: "박실장", status: "진행중" },
  { id: 3, customerName: "이도급", projectName: "홍대 원룸 셀프 인테리어", area: "10평대", startDate: "2026-08-15", endDate: "2026-08-25", manager: "김반장", status: "완료" },
  { id: 4, customerName: "최시공", projectName: "분당 45평 전체 리모델링", area: "40평대 이상", startDate: "2026-08-18", endDate: "2026-10-05", manager: "박실장", status: "진행중" },
  { id: 5, customerName: "정마감", projectName: "잠실 28평 화장실·주방 리모델링", area: "20평대", startDate: "2026-08-20", endDate: "2026-09-08", manager: "김반장", status: "진행중" },
  { id: 6, customerName: "강준공", projectName: "목동 33평 전체 리모델링", area: "30평대", startDate: "2026-08-22", endDate: "2026-09-20", manager: "박실장", status: "진행중" },
  { id: 7, customerName: "서철거", projectName: "강남 15평 오피스텔 인테리어", area: "10평대", startDate: "2026-08-24", endDate: "2026-09-05", manager: "김반장", status: "진행중" },
  { id: 8, customerName: "한도배", projectName: "일산 26평 도배·마루 시공", area: "20평대", startDate: "2026-08-27", endDate: "2026-09-02", manager: "김반장", status: "진행전" },
];

export const INITIAL_PROCESS: ProcessStep[] = [
  { id: 1, projectName: "판교 34평 주방·거실 리모델링", stepName: "철거", scheduledDate: "2026-08-14", status: "완료", worker: "협력업체(철거)" },
  { id: 2, projectName: "판교 34평 주방·거실 리모델링", stepName: "설비", scheduledDate: "2026-08-18", status: "완료", worker: "협력업체(설비)" },
  { id: 3, projectName: "판교 34평 주방·거실 리모델링", stepName: "목공", scheduledDate: "2026-08-24", status: "진행중", worker: "협력업체(목공)" },
  { id: 4, projectName: "판교 34평 주방·거실 리모델링", stepName: "도장", scheduledDate: "2026-09-02", status: "예정", worker: "협력업체(도장)" },
  { id: 5, projectName: "분당 45평 전체 리모델링", stepName: "철거", scheduledDate: "2026-08-18", status: "완료", worker: "협력업체(철거)" },
  { id: 6, projectName: "분당 45평 전체 리모델링", stepName: "설비", scheduledDate: "2026-08-25", status: "완료", worker: "협력업체(설비)" },
  { id: 7, projectName: "분당 45평 전체 리모델링", stepName: "목공", scheduledDate: "2026-09-05", status: "진행중", worker: "협력업체(목공)" },
  { id: 8, projectName: "분당 45평 전체 리모델링", stepName: "타일", scheduledDate: "2026-09-15", status: "예정", worker: "협력업체(타일)" },
  { id: 9, projectName: "분당 45평 전체 리모델링", stepName: "마루·도배", scheduledDate: "2026-09-25", status: "예정", worker: "협력업체(마루)" },
  { id: 10, projectName: "잠실 28평 화장실·주방 리모델링", stepName: "철거", scheduledDate: "2026-08-20", status: "완료", worker: "협력업체(철거)" },
  { id: 11, projectName: "잠실 28평 화장실·주방 리모델링", stepName: "설비", scheduledDate: "2026-08-25", status: "진행중", worker: "협력업체(설비)" },
  { id: 12, projectName: "잠실 28평 화장실·주방 리모델링", stepName: "타일", scheduledDate: "2026-09-01", status: "예정", worker: "협력업체(타일)" },
  { id: 13, projectName: "목동 33평 전체 리모델링", stepName: "철거", scheduledDate: "2026-08-22", status: "완료", worker: "협력업체(철거)" },
  { id: 14, projectName: "목동 33평 전체 리모델링", stepName: "설비", scheduledDate: "2026-08-28", status: "진행중", worker: "협력업체(설비)" },
  { id: 15, projectName: "강남 15평 오피스텔 인테리어", stepName: "철거", scheduledDate: "2026-08-24", status: "진행중", worker: "협력업체(철거)" },
];

export const INITIAL_MATERIALS: MaterialItem[] = [
  { id: 1, name: "강마루 (자작나무)", category: "바닥재", supplier: "동화자연마루", unitPrice: "6.5만원/평", projectName: "판교 34평 주방·거실 리모델링", status: "입고" },
  { id: 2, name: "실크벽지 (모던그레이)", category: "벽지", supplier: "LG하우시스", unitPrice: "3.2만원/평", projectName: "판교 34평 주방·거실 리모델링", status: "주문" },
  { id: 3, name: "시스템 주방가구", category: "가구", supplier: "한샘", unitPrice: "850만원", projectName: "판교 34평 주방·거실 리모델링", status: "주문" },
  { id: 4, name: "포세린 타일 600x600", category: "타일", supplier: "대동타일", unitPrice: "4.8만원/평", projectName: "분당 45평 전체 리모델링", status: "입고" },
  { id: 5, name: "발코니 샷시 (3중유리)", category: "샷시", supplier: "LX하우시스", unitPrice: "220만원", projectName: "분당 45평 전체 리모델링", status: "주문" },
  { id: 6, name: "친환경 페인트", category: "도장", supplier: "삼화페인트", unitPrice: "1.1만원/L", projectName: "분당 45평 전체 리모델링", status: "입고" },
  { id: 7, name: "방수 몰탈", category: "방수자재", supplier: "㈜케미콘", unitPrice: "3.5만원/포", projectName: "잠실 28평 화장실·주방 리모델링", status: "사용완료" },
  { id: 8, name: "위생도기 세트", category: "위생기구", supplier: "대림바스", unitPrice: "95만원", projectName: "잠실 28평 화장실·주방 리모델링", status: "입고" },
  { id: 9, name: "강화마루", category: "바닥재", supplier: "구정마루", unitPrice: "4.2만원/평", projectName: "목동 33평 전체 리모델링", status: "주문" },
  { id: 10, name: "LED 매입등", category: "조명", supplier: "필립스", unitPrice: "1.8만원/개", projectName: "강남 15평 오피스텔 인테리어", status: "입고" },
  { id: 11, name: "합지벽지", category: "벽지", supplier: "신한벽지", unitPrice: "1.5만원/평", projectName: "일산 26평 도배·마루 시공", status: "주문" },
  { id: 12, name: "강마루 (오크)", category: "바닥재", supplier: "동화자연마루", unitPrice: "6.0만원/평", projectName: "일산 26평 도배·마루 시공", status: "주문" },
];

export const INITIAL_PARTNERS: Partner[] = [
  { id: 1, name: "대한철거", category: "철거", contact: "이철거", phone: "010-2000-0001", rating: 5 },
  { id: 2, name: "미래설비", category: "설비", contact: "박설비", phone: "010-2000-0002", rating: 4 },
  { id: 3, name: "정성목공", category: "목공", contact: "정목공", phone: "010-2000-0003", rating: 5 },
  { id: 4, name: "밝은전기", category: "전기", contact: "최전기", phone: "010-2000-0004", rating: 4 },
  { id: 5, name: "명품타일", category: "타일", contact: "한타일", phone: "010-2000-0005", rating: 5 },
  { id: 6, name: "컬러도장", category: "도장", contact: "윤도장", phone: "010-2000-0006", rating: 4 },
  { id: 7, name: "구정마루시공", category: "마루", contact: "오마루", phone: "010-2000-0007", rating: 5 },
];

export const INITIAL_PAYMENTS: Payment[] = [
  { id: 1, customerName: "김견적", projectName: "역삼동 24평 전체 리모델링", amount: "3,200만원", dueDate: "2026-09-10", status: "완납" },
  { id: 2, customerName: "박현장", projectName: "판교 34평 주방·거실 리모델링", amount: "2,800만원", dueDate: "2026-09-15", status: "부분납부" },
  { id: 3, customerName: "이도급", projectName: "홍대 원룸 셀프 인테리어", amount: "800만원", dueDate: "2026-08-25", status: "완납" },
  { id: 4, customerName: "최시공", projectName: "분당 45평 전체 리모델링", amount: "5,500만원", dueDate: "2026-10-05", status: "부분납부" },
  { id: 5, customerName: "정마감", projectName: "잠실 28평 화장실·주방 리모델링", amount: "2,600만원", dueDate: "2026-09-08", status: "부분납부" },
  { id: 6, customerName: "강준공", projectName: "목동 33평 전체 리모델링", amount: "3,900만원", dueDate: "2026-09-20", status: "미납" },
  { id: 7, customerName: "서철거", projectName: "강남 15평 오피스텔 인테리어", amount: "1,200만원", dueDate: "2026-09-05", status: "부분납부" },
  { id: 8, customerName: "한도배", projectName: "일산 26평 도배·마루 시공", amount: "1,800만원", dueDate: "2026-09-02", status: "미납" },
  { id: 9, customerName: "김견적", projectName: "역삼동 24평 전체 리모델링 (계약금)", amount: "640만원", dueDate: "2026-08-08", status: "완납" },
  { id: 10, customerName: "박현장", projectName: "판교 34평 주방·거실 리모델링 (계약금)", amount: "560만원", dueDate: "2026-08-10", status: "완납" },
];

export const INITIAL_AS: AsRequest[] = [
  { id: 1, customerName: "김견적", projectName: "역삼동 24평 전체 리모델링", content: "화장실 실리콘 마감 부위 곰팡이 발생", requestDate: "2026-08-25", status: "완료", assignee: "김반장" },
  { id: 2, customerName: "이도급", projectName: "홍대 원룸 셀프 인테리어", content: "콘센트 커버 파손", requestDate: "2026-08-27", status: "완료", assignee: "김반장" },
  { id: 3, customerName: "김견적", projectName: "역삼동 24평 전체 리모델링", content: "주방 상부장 경첩 소음", requestDate: "2026-08-28", status: "처리중", assignee: "박실장" },
  { id: 4, customerName: "이도급", projectName: "홍대 원룸 셀프 인테리어", content: "도배 이음새 들뜸", requestDate: "2026-08-29", status: "접수", assignee: "-" },
];

export const INITIAL_PACKAGES: Package[] = [
  { id: 1, title: "10평대 패키지", area: "10평대", price: "800만원부터", published: true },
  { id: 2, title: "20평대 패키지", area: "20평대", price: "2,200만원부터", published: true },
  { id: 3, title: "30평대 패키지", area: "30평대", price: "3,200만원부터", published: true },
  { id: 4, title: "40평대 이상 패키지", area: "40평대 이상", price: "5,000만원부터 (작성중)", published: false },
];

export const INITIAL_STAFF: Staff[] = [
  { id: 1, name: "정대표", role: "관리자", position: "대표", phone: "010-0000-0001", status: "재직" },
  { id: 2, name: "박실장", role: "관리자", position: "현장 실장", phone: "010-0000-0002", status: "재직" },
  { id: 3, name: "김반장", role: "직원", position: "시공 반장", phone: "010-0000-0003", status: "재직" },
  { id: 4, name: "이설계", role: "직원", position: "설계 담당", phone: "010-0000-0004", status: "재직" },
  { id: 5, name: "최견적", role: "직원", position: "견적 담당", phone: "010-0000-0005", status: "재직" },
  { id: 6, name: "한회계", role: "직원", position: "결제 관리", phone: "010-0000-0006", status: "비활성" },
];
