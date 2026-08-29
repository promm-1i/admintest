import type { Department, Doctor, Reservation, Consult, Customer, NonCoveredItem, Review, Notice, Banner, Staff } from "./types";

export const INITIAL_DEPARTMENTS: Department[] = [
  { id: 1, name: "내과", order: 1, desc: "일반 진료, 건강검진, 만성질환 관리", status: "공개", icon: "🩺" },
  { id: 2, name: "정형외과", order: 2, desc: "관절, 척추, 스포츠 손상 진료", status: "공개", icon: "🦴" },
  { id: 3, name: "피부과", order: 3, desc: "여드름, 아토피, 피부질환 진료", status: "공개", icon: "🧴" },
  { id: 4, name: "소아청소년과", order: 4, desc: "영유아 및 청소년 진료, 예방접종", status: "공개", icon: "🧸" },
  { id: 5, name: "치과", order: 5, desc: "충치 치료, 교정, 임플란트", status: "공개", icon: "🦷" },
  { id: 6, name: "이비인후과", order: 6, desc: "귀·코·목 질환 진료", status: "공개", icon: "👂" },
  { id: 7, name: "안과", order: 7, desc: "시력 검사, 안질환 진료", status: "공개", icon: "👁️" },
  { id: 8, name: "산부인과", order: 8, desc: "여성 건강 검진 및 진료", status: "공개", icon: "🤰" },
  { id: 9, name: "정신건강의학과", order: 9, desc: "심리 상담 및 정신건강 진료", status: "비공개", icon: "🧠" },
  { id: 10, name: "재활의학과", order: 10, desc: "물리치료 및 재활 프로그램", status: "공개", icon: "🏃" },
];

export const INITIAL_DOCTORS: Doctor[] = [
  { id: 1, name: "김진료", department: "내과", position: "원장", career: "15년차 · 대한내과학회 정회원", days: "월~금", profile: "만성질환 및 건강검진 전문", public: true },
  { id: 2, name: "송소화", department: "내과", position: "전문의", career: "8년차", days: "월,화,목,금", profile: "소화기내과 세부전공", public: true },
  { id: 3, name: "박정형", department: "정형외과", position: "전문의", career: "12년차", days: "월~토", profile: "관절 및 척추 질환 전문", public: true },
  { id: 4, name: "이피부", department: "피부과", position: "전문의", career: "10년차", days: "화~토", profile: "여드름·아토피 클리닉 운영", public: true },
  { id: 5, name: "최소아", department: "소아청소년과", position: "전문의", career: "9년차", days: "월~금", profile: "영유아 검진 및 예방접종 전문", public: true },
  { id: 6, name: "정치아", department: "치과", position: "원장", career: "18년차", days: "월~금", profile: "임플란트 및 교정 전문", public: true },
  { id: 7, name: "한이비", department: "이비인후과", position: "전문의", career: "7년차", days: "월,수,금", profile: "알레르기 비염 클리닉", public: true },
  { id: 8, name: "윤안과", department: "안과", position: "전문의", career: "11년차", days: "화~토", profile: "라식·라섹 전문", public: true },
  { id: 9, name: "장산부", department: "산부인과", position: "전문의", career: "14년차", days: "월~금", profile: "여성 건강검진 전문", public: true },
  { id: 10, name: "서정신", department: "정신건강의학과", position: "전문의", career: "6년차", days: "화,목", profile: "스트레스·불안장애 상담", public: false },
  { id: 11, name: "임재활", department: "재활의학과", position: "전문의", career: "9년차", days: "월~금", profile: "도수치료 및 재활 프로그램", public: true },
  { id: 12, name: "강내과", department: "내과", position: "전문의", career: "5년차", days: "토", profile: "토요일 진료 전담", public: true },
];

export const INITIAL_RESERVATIONS: Reservation[] = [
  { id: 1, customerName: "김민지", phone: "010-****-1111", department: "내과", doctor: "김진료", date: "2026-08-29", time: "10:00", status: "확정", memo: "건강검진 상담" },
  { id: 2, customerName: "박서준", phone: "010-****-2222", department: "정형외과", doctor: "박정형", date: "2026-08-29", time: "11:00", status: "대기", memo: "무릎 통증" },
  { id: 3, customerName: "이수아", phone: "010-****-3333", department: "피부과", doctor: "이피부", date: "2026-08-30", time: "14:00", status: "확정", memo: "여드름 상담" },
  { id: 4, customerName: "최도윤", phone: "010-****-4444", department: "소아청소년과", doctor: "최소아", date: "2026-08-30", time: "15:30", status: "완료", memo: "예방접종" },
  { id: 5, customerName: "정하은", phone: "010-****-5555", department: "치과", doctor: "정치아", date: "2026-08-31", time: "09:30", status: "대기", memo: "임플란트 상담" },
  { id: 6, customerName: "김민지", phone: "010-****-1111", department: "내과", doctor: "송소화", date: "2026-09-02", time: "10:30", status: "확정", memo: "재검진" },
  { id: 7, customerName: "한지우", phone: "010-****-6666", department: "이비인후과", doctor: "한이비", date: "2026-09-01", time: "13:00", status: "취소", memo: "비염 진료 (일정 변경 요청)" },
  { id: 8, customerName: "윤서연", phone: "010-****-7777", department: "안과", doctor: "윤안과", date: "2026-09-02", time: "16:00", status: "대기", memo: "라식 상담" },
];

export const INITIAL_CONSULTS: Consult[] = [
  { id: 1, name: "김민지", phone: "010-****-1111", channel: "온라인", content: "건강검진 예약하고 싶습니다.", status: "완료", assignee: "정간호" },
  { id: 2, name: "박서준", phone: "010-****-2222", channel: "예약문의", content: "무릎 통증 진료 문의드립니다.", status: "완료", assignee: "정간호" },
  { id: 3, name: "이수아", phone: "010-****-3333", channel: "전화", content: "여드름 치료 비용이 궁금합니다.", status: "상담중", assignee: "박접수" },
  { id: 4, name: "조은우", phone: "010-****-8888", channel: "온라인", content: "예방접종 스케줄 문의드려요.", status: "접수", assignee: "-" },
  { id: 5, name: "한지우", phone: "010-****-6666", channel: "전화", content: "비염 진료 일정을 변경하고 싶어요.", status: "상담중", assignee: "박접수" },
];

export const INITIAL_CUSTOMERS: Customer[] = [
  { id: 1, name: "김민지", phone: "010-****-1111", interestDepartment: "내과", firstContactAt: "2026-08-20", lastConsultAt: "2026-08-29", activities: [
    { id: 1, type: "문의", content: "건강검진 온라인 문의 접수", at: "2026-08-20 10:00" },
    { id: 2, type: "예약", content: "내과 김진료 원장 예약 확정", at: "2026-08-25 14:00" },
    { id: 3, type: "진료", content: "건강검진 상담 진료 완료", at: "2026-08-29 10:00" },
  ]},
  { id: 2, name: "박서준", phone: "010-****-2222", interestDepartment: "정형외과", firstContactAt: "2026-08-22", lastConsultAt: "2026-08-29", activities: [
    { id: 1, type: "문의", content: "무릎 통증 예약문의 접수", at: "2026-08-22 11:00" },
    { id: 2, type: "예약", content: "정형외과 박정형 전문의 예약", at: "2026-08-24 09:00" },
  ]},
  { id: 3, name: "이수아", phone: "010-****-3333", interestDepartment: "피부과", firstContactAt: "2026-08-18", lastConsultAt: "2026-08-27", activities: [
    { id: 1, type: "문의", content: "여드름 치료 전화 상담", at: "2026-08-27 15:00" },
  ]},
  { id: 4, name: "최도윤", phone: "010-****-4444", interestDepartment: "소아청소년과", firstContactAt: "2026-07-10", lastConsultAt: "2026-08-30", activities: [
    { id: 1, type: "예약", content: "예방접종 예약", at: "2026-08-20 09:00" },
    { id: 2, type: "진료", content: "예방접종 완료", at: "2026-08-30 15:30" },
  ]},
  { id: 5, name: "정하은", phone: "010-****-5555", interestDepartment: "치과", firstContactAt: "2026-08-26", lastConsultAt: "2026-08-26", activities: [
    { id: 1, type: "예약", content: "임플란트 상담 예약", at: "2026-08-26 11:00" },
  ]},
  { id: 6, name: "한지우", phone: "010-****-6666", interestDepartment: "이비인후과", firstContactAt: "2026-08-15", lastConsultAt: "2026-08-29", activities: [
    { id: 1, type: "예약", content: "비염 진료 예약", at: "2026-08-15 10:00" },
    { id: 2, type: "메모", content: "일정 변경 요청으로 예약 취소, 재상담 필요", at: "2026-08-29 13:00" },
  ]},
  { id: 7, name: "윤서연", phone: "010-****-7777", interestDepartment: "안과", firstContactAt: "2026-08-28", lastConsultAt: "2026-08-28", activities: [
    { id: 1, type: "예약", content: "라식 상담 예약", at: "2026-08-28 16:00" },
  ]},
  { id: 8, name: "조은우", phone: "010-****-8888", interestDepartment: "소아청소년과", firstContactAt: "2026-08-29", lastConsultAt: "2026-08-29", activities: [
    { id: 1, type: "문의", content: "예방접종 스케줄 온라인 문의", at: "2026-08-29 09:00" },
  ]},
  { id: 9, name: "오하율", phone: "010-****-9999", interestDepartment: "산부인과", firstContactAt: "2026-08-12", lastConsultAt: "2026-08-24", activities: [
    { id: 1, type: "진료", content: "여성 건강검진 완료", at: "2026-08-24 11:00" },
  ]},
  { id: 10, name: "임도현", phone: "010-****-1010", interestDepartment: "재활의학과", firstContactAt: "2026-08-05", lastConsultAt: "2026-08-19", activities: [
    { id: 1, type: "진료", content: "도수치료 3회차 진행", at: "2026-08-19 10:00" },
  ]},
  { id: 11, name: "배지호", phone: "010-****-1111", interestDepartment: "내과", firstContactAt: "2026-07-28", lastConsultAt: "2026-08-10", activities: [
    { id: 1, type: "진료", content: "만성질환 정기 진료", at: "2026-08-10 09:30" },
  ]},
  { id: 12, name: "신하윤", phone: "010-****-1212", interestDepartment: "피부과", firstContactAt: "2026-08-01", lastConsultAt: "2026-08-15", activities: [
    { id: 1, type: "진료", content: "아토피 진료 2회차", at: "2026-08-15 14:30" },
  ]},
];

export const INITIAL_NONCOVERED: NonCoveredItem[] = [
  { id: 1, category: "검진", name: "종합 건강검진", price: "35만원", desc: "혈액검사, 초음파, 심전도 포함", published: true },
  { id: 2, category: "예방접종", name: "독감 예방접종", price: "3만원", desc: "성인 4가 독감 백신", published: true },
  { id: 3, category: "예방접종", name: "대상포진 예방접종", price: "18만원", desc: "50세 이상 권장", published: true },
  { id: 4, category: "피부", name: "여드름 압출 관리", price: "5만원", desc: "1회 기준", published: true },
  { id: 5, category: "피부", name: "보톡스 (이마)", price: "12만원", desc: "부위별 상이", published: true },
  { id: 6, category: "치과", name: "스케일링 (비급여)", price: "5만원", desc: "치석 심한 경우", published: true },
  { id: 7, category: "치과", name: "임플란트 (1개)", price: "120만원", desc: "재료에 따라 상이", published: true },
  { id: 8, category: "안과", name: "라식 수술", price: "150만원", desc: "양안 기준", published: true },
  { id: 9, category: "검진", name: "위/대장 내시경 (수면)", price: "25만원", desc: "수면 마취 포함", published: true },
  { id: 10, category: "재활", name: "도수치료", price: "8만원", desc: "1회 40분 기준", published: true },
  { id: 11, category: "미용", name: "미용 시술 상담", price: "무료", desc: "상담만 진행", published: false },
  { id: 12, category: "검진", name: "여성 건강검진 패키지", price: "40만원", desc: "자궁경부암 검사 포함", published: true },
];

export const INITIAL_REVIEWS: Review[] = [
  { id: 1, customerName: "김**", department: "내과", rating: 5, content: "친절하게 설명해주셔서 좋았습니다.", published: true, date: "2026-08-20" },
  { id: 2, customerName: "박**", department: "정형외과", rating: 5, content: "무릎 통증이 많이 나아졌어요.", published: true, date: "2026-08-18" },
  { id: 3, customerName: "이**", department: "피부과", rating: 4, content: "대기시간이 조금 길었지만 만족합니다.", published: true, date: "2026-08-15" },
  { id: 4, customerName: "최**", department: "소아청소년과", rating: 5, content: "아이가 무서워하지 않게 잘 봐주세요.", published: true, date: "2026-08-10" },
  { id: 5, customerName: "정**", department: "치과", rating: 5, content: "임플란트 상담이 꼼꼼했습니다.", published: true, date: "2026-08-08" },
  { id: 6, customerName: "한**", department: "이비인후과", rating: 4, content: "비염 치료 효과가 좋습니다.", published: true, date: "2026-08-05" },
  { id: 7, customerName: "윤**", department: "안과", rating: 5, content: "라식 수술 결과 만족스러워요.", published: true, date: "2026-08-01" },
  { id: 8, customerName: "오**", department: "산부인과", rating: 5, content: "편안하게 검진받을 수 있었습니다.", published: true, date: "2026-07-28" },
  { id: 9, customerName: "임**", department: "재활의학과", rating: 4, content: "도수치료 후 통증이 줄었어요.", published: false, date: "2026-07-25" },
  { id: 10, customerName: "배**", department: "내과", rating: 5, content: "정기검진마다 항상 친절합니다.", published: true, date: "2026-07-20" },
];

export const INITIAL_NOTICES: Notice[] = [
  { id: 1, title: "추석 연휴 진료시간 안내", published: true },
  { id: 2, title: "이비인후과 신규 진료 개시 안내", published: true },
  { id: 3, title: "여름철 휴진 일정 안내", published: true },
  { id: 4, title: "독감 예방접종 시작 안내", published: true },
  { id: 5, title: "시스템 점검 안내 (작성중)", published: false },
];

export const INITIAL_BANNERS: Banner[] = [
  { id: 1, title: "종합 건강검진 20% 할인", icon: "🎉", active: true, order: 1 },
  { id: 2, title: "이비인후과 신규 진료 안내", icon: "📢", active: true, order: 2 },
  { id: 3, title: "온라인 예약 시 대기시간 단축", icon: "⏱️", active: true, order: 3 },
  { id: 4, title: "추석 휴진 안내 (작성중)", icon: "🎁", active: false, order: 4 },
];

export const INITIAL_STAFF: Staff[] = [
  { id: 1, name: "김진료", role: "관리자", position: "원장", phone: "010-0000-0001", status: "재직" },
  { id: 2, name: "박실장", role: "관리자", position: "실장", phone: "010-0000-0002", status: "재직" },
  { id: 3, name: "정간호", role: "직원", position: "간호팀장", phone: "010-0000-0003", status: "재직" },
  { id: 4, name: "박접수", role: "직원", position: "접수 담당", phone: "010-0000-0004", status: "재직" },
  { id: 5, name: "이간호", role: "직원", position: "간호사", phone: "010-0000-0005", status: "재직" },
  { id: 6, name: "최상담", role: "직원", position: "상담 코디네이터", phone: "010-0000-0006", status: "재직" },
  { id: 7, name: "한전산", role: "직원", position: "전산 관리", phone: "010-0000-0007", status: "비활성" },
];
