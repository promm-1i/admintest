import type { Course, ConsultInquiry, Review, Staff } from "./types";

export const SUBJECTS = ["수학", "영어", "국어", "과학", "논술"];

export const INITIAL_COURSES: Course[] = [
  { id: 1, name: "고등 수학 심화반", subject: "수학", schedule: "월·수·금 19:00", price: "월 35만원", status: "공개", icon: "📐" },
  { id: 2, name: "중등 영어 기초반", subject: "영어", schedule: "화·목 17:00", price: "월 25만원", status: "공개", icon: "📖" },
  { id: 3, name: "고등 국어 독서논술", subject: "논술", schedule: "토 10:00", price: "월 20만원", status: "공개", icon: "✍️" },
  { id: 4, name: "중등 과학 실험반", subject: "과학", schedule: "월·수 16:00", price: "월 28만원", status: "공개", icon: "🔬" },
  { id: 5, name: "초등 영어 회화반", subject: "영어", schedule: "화·목 15:00", price: "월 22만원", status: "비공개", icon: "📖" },
];

export const INITIAL_INQUIRIES: ConsultInquiry[] = [
  { id: 1, name: "이학부모", phone: "010-****-1111", course: "고등 수학 심화반", content: "레벨테스트 가능한가요?", status: "접수" },
  { id: 2, name: "박학부모", phone: "010-****-2222", course: "중등 영어 기초반", content: "상담 예약하고 싶습니다.", status: "상담중" },
];

export const INITIAL_REVIEWS: Review[] = [
  { id: 1, title: "2026학년도 대입 합격 수기 모음", published: true },
  { id: 2, title: "수강생 학부모 후기", published: true },
  { id: 3, title: "이번 학기 성적 향상 사례 (작성중)", published: false },
];

export const INITIAL_STAFF: Staff[] = [
  { id: 1, name: "김원장", role: "관리자", position: "원장", phone: "010-0000-0001", status: "재직" },
  { id: 2, name: "박강사", role: "직원", position: "수학 강사", phone: "010-0000-0002", status: "재직" },
];
