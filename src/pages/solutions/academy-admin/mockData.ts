import type {
  Course,
  Consult,
  Student,
  Enrollment,
  Attendance,
  Grade,
  Tuition,
  Teacher,
  Review,
  Achievement,
  Notice,
  Material,
  Staff,
} from "./types";

export const SUBJECTS = ["수학", "영어", "국어", "과학", "논술"];

export const INITIAL_COURSES: Course[] = [
  { id: 1, name: "고등 수학 심화반", subject: "수학", teacher: "박강사", schedule: "월·수·금 19:00", capacity: 20, enrolled: 18, price: "월 35만원", status: "공개", icon: "📐" },
  { id: 2, name: "중등 영어 기초반", subject: "영어", teacher: "최강사", schedule: "화·목 17:00", capacity: 15, enrolled: 12, price: "월 25만원", status: "공개", icon: "📖" },
  { id: 3, name: "고등 국어 독서논술", subject: "논술", teacher: "이강사", schedule: "토 10:00", capacity: 12, enrolled: 9, price: "월 20만원", status: "공개", icon: "✍️" },
  { id: 4, name: "중등 과학 실험반", subject: "과학", teacher: "정강사", schedule: "월·수 16:00", capacity: 15, enrolled: 10, price: "월 28만원", status: "공개", icon: "🔬" },
  { id: 5, name: "초등 영어 회화반", subject: "영어", teacher: "최강사", schedule: "화·목 15:00", capacity: 12, enrolled: 5, price: "월 22만원", status: "비공개", icon: "📖" },
  { id: 6, name: "고등 수학 기본반", subject: "수학", teacher: "박강사", schedule: "화·목 19:00", capacity: 20, enrolled: 15, price: "월 30만원", status: "공개", icon: "📐" },
  { id: 7, name: "중등 국어 문학반", subject: "국어", teacher: "이강사", schedule: "금 17:00", capacity: 15, enrolled: 11, price: "월 20만원", status: "공개", icon: "📕" },
  { id: 8, name: "고등 영어 독해반", subject: "영어", teacher: "최강사", schedule: "월·수·금 18:00", capacity: 18, enrolled: 14, price: "월 32만원", status: "공개", icon: "📖" },
  { id: 9, name: "중등 수학 심화반", subject: "수학", teacher: "박강사", schedule: "월·수 17:00", capacity: 15, enrolled: 13, price: "월 30만원", status: "공개", icon: "📐" },
  { id: 10, name: "고등 과학탐구", subject: "과학", teacher: "정강사", schedule: "토 14:00", capacity: 12, enrolled: 8, price: "월 30만원", status: "공개", icon: "🔬" },
  { id: 11, name: "초등 수학 사고력반", subject: "수학", teacher: "강강사", schedule: "화·목 16:00", capacity: 12, enrolled: 9, price: "월 24만원", status: "공개", icon: "🧮" },
  { id: 12, name: "논술 심화 첨삭반", subject: "논술", teacher: "이강사", schedule: "일 10:00", capacity: 10, enrolled: 6, price: "월 25만원", status: "비공개", icon: "✍️" },
];

export const INITIAL_CONSULTS: Consult[] = [
  { id: 1, name: "이수진", phone: "010-****-1111", studentName: "김민준", grade: "고2", channel: "온라인", content: "레벨테스트 가능한가요?", status: "완료", assignee: "김원장" },
  { id: 2, name: "최지훈", phone: "010-****-2222", studentName: "박서연", grade: "중2", channel: "전화", content: "상담 예약하고 싶습니다.", status: "완료", assignee: "박강사" },
  { id: 3, name: "정다운", phone: "010-****-2020", studentName: "정다은", grade: "초4", channel: "온라인", content: "초등 수학 사고력반 문의드립니다.", status: "상담중", assignee: "강강사" },
  { id: 4, name: "홍부모", phone: "010-****-2121", studentName: "홍길동", grade: "고1", channel: "전화", content: "고등 영어 독해반 정원이 있나요?", status: "접수", assignee: "-" },
  { id: 5, name: "김하나", phone: "010-****-3333", studentName: "이도현", grade: "고1", channel: "방문상담", content: "논술 첨삭 자료를 받아보고 싶습니다.", status: "완료", assignee: "이강사" },
  { id: 6, name: "박민수", phone: "010-****-4444", studentName: "최지우", grade: "중3", channel: "온라인", content: "중등 과학 실험반 교재 문의드립니다.", status: "완료", assignee: "정강사" },
  { id: 7, name: "서준혁", phone: "010-****-2323", studentName: "서준혁", grade: "중1", channel: "전화", content: "형제 할인 가능한가요?", status: "상담중", assignee: "김원장" },
  { id: 8, name: "정영수", phone: "010-****-2424", studentName: "정영수", grade: "고3", channel: "방문상담", content: "논술 심화 첨삭반 상담 원합니다.", status: "접수", assignee: "-" },
  { id: 9, name: "임소영", phone: "010-****-9999", studentName: "한지호", grade: "중2", channel: "온라인", content: "성적표 열람 방법이 궁금합니다.", status: "완료", assignee: "박강사" },
  { id: 10, name: "한상우", phone: "010-****-1010", studentName: "오유진", grade: "고1", channel: "전화", content: "과학탐구 보강 일정 문의드립니다.", status: "상담중", assignee: "정강사" },
];

export const INITIAL_STUDENTS: Student[] = [
  { id: 1, name: "김민준", grade: "고2", parentName: "이수진", parentPhone: "010-****-1111", enrolledCourses: ["고등 수학 심화반", "고등 영어 독해반"], joinDate: "2026-03-02", status: "재원", activities: [
    { id: 1, type: "상담", content: "레벨테스트 온라인 문의", at: "2026-08-20 10:00" },
    { id: 2, type: "등록", content: "고등 수학 심화반 수강등록", at: "2026-08-22 14:00" },
    { id: 3, type: "출결", content: "8/29 출석", at: "2026-08-29 19:00" },
  ]},
  { id: 2, name: "박서연", grade: "중2", parentName: "최지훈", parentPhone: "010-****-2222", enrolledCourses: ["중등 영어 기초반"], joinDate: "2026-03-10", status: "재원", activities: [
    { id: 1, type: "상담", content: "전화 상담 접수", at: "2026-08-18 11:00" },
    { id: 2, type: "등록", content: "중등 영어 기초반 수강등록", at: "2026-08-20 09:00" },
  ]},
  { id: 3, name: "이도현", grade: "고1", parentName: "김하나", parentPhone: "010-****-3333", enrolledCourses: ["고등 국어 독서논술"], joinDate: "2026-04-01", status: "재원", activities: [
    { id: 1, type: "상담", content: "방문 상담 진행", at: "2026-08-25 15:00" },
  ]},
  { id: 4, name: "최지우", grade: "중3", parentName: "박민수", parentPhone: "010-****-4444", enrolledCourses: ["중등 과학 실험반", "중등 수학 심화반"], joinDate: "2026-02-15", status: "재원", activities: [
    { id: 1, type: "성적", content: "중간고사 대비 모의고사 88점", at: "2026-08-10 16:00" },
  ]},
  { id: 5, name: "정하은", grade: "초5", parentName: "이영희", parentPhone: "010-****-5555", enrolledCourses: ["초등 영어 회화반"], joinDate: "2026-05-01", status: "휴원", activities: [
    { id: 1, type: "메모", content: "가족 사정으로 8월 한 달 휴원", at: "2026-08-05 09:00" },
  ]},
  { id: 6, name: "강민서", grade: "고3", parentName: "정다운", parentPhone: "010-****-6666", enrolledCourses: ["고등 수학 기본반"], joinDate: "2026-01-10", status: "재원", activities: [
    { id: 1, type: "출결", content: "8/28 지각", at: "2026-08-28 19:10" },
  ]},
  { id: 7, name: "윤서준", grade: "중1", parentName: "강수현", parentPhone: "010-****-7777", enrolledCourses: ["중등 국어 문학반"], joinDate: "2026-03-20", status: "재원", activities: [
    { id: 1, type: "등록", content: "중등 국어 문학반 수강등록", at: "2026-03-20 10:00" },
  ]},
  { id: 8, name: "임채원", grade: "고2", parentName: "윤태호", parentPhone: "010-****-8888", enrolledCourses: ["고등 영어 독해반", "고등 수학 심화반"], joinDate: "2026-02-01", status: "재원", activities: [
    { id: 1, type: "결제", content: "8월 수강료 완납", at: "2026-08-05 10:00" },
  ]},
  { id: 9, name: "한지호", grade: "중2", parentName: "임소영", parentPhone: "010-****-9999", enrolledCourses: ["중등 수학 심화반"], joinDate: "2026-04-15", status: "재원", activities: [
    { id: 1, type: "상담", content: "성적표 열람 문의", at: "2026-08-24 13:00" },
  ]},
  { id: 10, name: "오유진", grade: "고1", parentName: "한상우", parentPhone: "010-****-1010", enrolledCourses: ["고등 과학탐구"], joinDate: "2026-05-10", status: "재원", activities: [
    { id: 1, type: "상담", content: "보강 일정 문의", at: "2026-08-27 11:00" },
  ]},
  { id: 11, name: "서준영", grade: "초6", parentName: "오미란", parentPhone: "010-****-1112", enrolledCourses: ["초등 수학 사고력반"], joinDate: "2026-03-05", status: "재원", activities: [] },
  { id: 12, name: "조은서", grade: "고3", parentName: "서정훈", parentPhone: "010-****-1213", enrolledCourses: ["논술 심화 첨삭반"], joinDate: "2026-01-20", status: "퇴원", activities: [
    { id: 1, type: "메모", content: "대입 완료로 퇴원 처리", at: "2026-08-15 10:00" },
  ]},
  { id: 13, name: "신하율", grade: "중1", parentName: "조은비", parentPhone: "010-****-1314", enrolledCourses: ["중등 영어 기초반", "중등 국어 문학반"], joinDate: "2026-04-01", status: "재원", activities: [] },
  { id: 14, name: "배준혁", grade: "고2", parentName: "신동엽", parentPhone: "010-****-1415", enrolledCourses: ["고등 수학 기본반"], joinDate: "2026-02-20", status: "재원", activities: [] },
  { id: 15, name: "문서아", grade: "중3", parentName: "배수정", parentPhone: "010-****-1516", enrolledCourses: ["중등 과학 실험반"], joinDate: "2026-03-15", status: "재원", activities: [] },
];

export const INITIAL_ENROLLMENTS: Enrollment[] = [
  { id: 1, studentName: "김민준", courseName: "고등 수학 심화반", teacher: "박강사", startDate: "2026-03-02", status: "수강중", tuitionStatus: "완납" },
  { id: 2, studentName: "김민준", courseName: "고등 영어 독해반", teacher: "최강사", startDate: "2026-03-02", status: "수강중", tuitionStatus: "완납" },
  { id: 3, studentName: "박서연", courseName: "중등 영어 기초반", teacher: "최강사", startDate: "2026-03-10", status: "수강중", tuitionStatus: "미납" },
  { id: 4, studentName: "이도현", courseName: "고등 국어 독서논술", teacher: "이강사", startDate: "2026-04-01", status: "수강중", tuitionStatus: "완납" },
  { id: 5, studentName: "최지우", courseName: "중등 과학 실험반", teacher: "정강사", startDate: "2026-02-15", status: "수강중", tuitionStatus: "완납" },
  { id: 6, studentName: "최지우", courseName: "중등 수학 심화반", teacher: "박강사", startDate: "2026-02-15", status: "수강중", tuitionStatus: "부분납부" },
  { id: 7, studentName: "정하은", courseName: "초등 영어 회화반", teacher: "최강사", startDate: "2026-05-01", status: "휴강", tuitionStatus: "미납" },
  { id: 8, studentName: "강민서", courseName: "고등 수학 기본반", teacher: "박강사", startDate: "2026-01-10", status: "수강중", tuitionStatus: "완납" },
  { id: 9, studentName: "윤서준", courseName: "중등 국어 문학반", teacher: "이강사", startDate: "2026-03-20", status: "수강중", tuitionStatus: "완납" },
  { id: 10, studentName: "임채원", courseName: "고등 영어 독해반", teacher: "최강사", startDate: "2026-02-01", status: "수강중", tuitionStatus: "완납" },
  { id: 11, studentName: "임채원", courseName: "고등 수학 심화반", teacher: "박강사", startDate: "2026-02-01", status: "수강중", tuitionStatus: "완납" },
  { id: 12, studentName: "한지호", courseName: "중등 수학 심화반", teacher: "박강사", startDate: "2026-04-15", status: "수강중", tuitionStatus: "미납" },
  { id: 13, studentName: "오유진", courseName: "고등 과학탐구", teacher: "정강사", startDate: "2026-05-10", status: "수강중", tuitionStatus: "완납" },
  { id: 14, studentName: "서준영", courseName: "초등 수학 사고력반", teacher: "강강사", startDate: "2026-03-05", status: "수강중", tuitionStatus: "완납" },
  { id: 15, studentName: "조은서", courseName: "논술 심화 첨삭반", teacher: "이강사", startDate: "2026-01-20", status: "종료", tuitionStatus: "완납" },
  { id: 16, studentName: "신하율", courseName: "중등 영어 기초반", teacher: "최강사", startDate: "2026-04-01", status: "수강중", tuitionStatus: "부분납부" },
  { id: 17, studentName: "신하율", courseName: "중등 국어 문학반", teacher: "이강사", startDate: "2026-04-01", status: "수강중", tuitionStatus: "완납" },
  { id: 18, studentName: "배준혁", courseName: "고등 수학 기본반", teacher: "박강사", startDate: "2026-02-20", status: "수강중", tuitionStatus: "미납" },
];

export const INITIAL_ATTENDANCE: Attendance[] = [
  { id: 1, studentName: "김민준", courseName: "고등 수학 심화반", date: "2026-08-25", status: "출석" },
  { id: 2, studentName: "임채원", courseName: "고등 수학 심화반", date: "2026-08-25", status: "출석" },
  { id: 3, studentName: "강민서", courseName: "고등 수학 기본반", date: "2026-08-25", status: "지각" },
  { id: 4, studentName: "배준혁", courseName: "고등 수학 기본반", date: "2026-08-25", status: "출석" },
  { id: 5, studentName: "박서연", courseName: "중등 영어 기초반", date: "2026-08-26", status: "출석" },
  { id: 6, studentName: "신하율", courseName: "중등 영어 기초반", date: "2026-08-26", status: "결석" },
  { id: 7, studentName: "김민준", courseName: "고등 수학 심화반", date: "2026-08-27", status: "출석" },
  { id: 8, studentName: "임채원", courseName: "고등 수학 심화반", date: "2026-08-27", status: "조퇴" },
  { id: 9, studentName: "최지우", courseName: "중등 과학 실험반", date: "2026-08-27", status: "출석" },
  { id: 10, studentName: "문서아", courseName: "중등 과학 실험반", date: "2026-08-27", status: "출석" },
  { id: 11, studentName: "강민서", courseName: "고등 수학 기본반", date: "2026-08-28", status: "출석" },
  { id: 12, studentName: "배준혁", courseName: "고등 수학 기본반", date: "2026-08-28", status: "출석" },
  { id: 13, studentName: "김민준", courseName: "고등 수학 심화반", date: "2026-08-29", status: "출석" },
  { id: 14, studentName: "임채원", courseName: "고등 수학 심화반", date: "2026-08-29", status: "출석" },
];

export const INITIAL_GRADES: Grade[] = [
  { id: 1, studentName: "김민준", courseName: "고등 수학 심화반", examName: "8월 모의고사", score: 92, maxScore: 100, date: "2026-08-10" },
  { id: 2, studentName: "임채원", courseName: "고등 수학 심화반", examName: "8월 모의고사", score: 85, maxScore: 100, date: "2026-08-10" },
  { id: 3, studentName: "강민서", courseName: "고등 수학 기본반", examName: "8월 모의고사", score: 78, maxScore: 100, date: "2026-08-10" },
  { id: 4, studentName: "배준혁", courseName: "고등 수학 기본반", examName: "8월 모의고사", score: 81, maxScore: 100, date: "2026-08-10" },
  { id: 5, studentName: "최지우", courseName: "중등 과학 실험반", examName: "단원평가 3", score: 88, maxScore: 100, date: "2026-08-12" },
  { id: 6, studentName: "문서아", courseName: "중등 과학 실험반", examName: "단원평가 3", score: 74, maxScore: 100, date: "2026-08-12" },
  { id: 7, studentName: "박서연", courseName: "중등 영어 기초반", examName: "단어테스트", score: 45, maxScore: 50, date: "2026-08-15" },
  { id: 8, studentName: "신하율", courseName: "중등 영어 기초반", examName: "단어테스트", score: 38, maxScore: 50, date: "2026-08-15" },
  { id: 9, studentName: "한지호", courseName: "중등 수학 심화반", examName: "8월 모의고사", score: 90, maxScore: 100, date: "2026-08-10" },
  { id: 10, studentName: "오유진", courseName: "고등 과학탐구", examName: "8월 모의고사", score: 83, maxScore: 100, date: "2026-08-10" },
];

export const INITIAL_TUITION: Tuition[] = [
  { id: 1, studentName: "김민준", courseName: "고등 수학 심화반", amount: "35만원", dueDate: "2026-09-05", status: "완납" },
  { id: 2, studentName: "김민준", courseName: "고등 영어 독해반", amount: "32만원", dueDate: "2026-09-05", status: "완납" },
  { id: 3, studentName: "박서연", courseName: "중등 영어 기초반", amount: "25만원", dueDate: "2026-09-05", status: "미납" },
  { id: 4, studentName: "이도현", courseName: "고등 국어 독서논술", amount: "20만원", dueDate: "2026-09-05", status: "완납" },
  { id: 5, studentName: "최지우", courseName: "중등 과학 실험반", amount: "28만원", dueDate: "2026-09-05", status: "완납" },
  { id: 6, studentName: "최지우", courseName: "중등 수학 심화반", amount: "30만원", dueDate: "2026-09-05", status: "부분납부" },
  { id: 7, studentName: "강민서", courseName: "고등 수학 기본반", amount: "30만원", dueDate: "2026-09-05", status: "완납" },
  { id: 8, studentName: "윤서준", courseName: "중등 국어 문학반", amount: "20만원", dueDate: "2026-09-05", status: "완납" },
  { id: 9, studentName: "임채원", courseName: "고등 영어 독해반", amount: "32만원", dueDate: "2026-09-05", status: "완납" },
  { id: 10, studentName: "한지호", courseName: "중등 수학 심화반", amount: "30만원", dueDate: "2026-09-05", status: "미납" },
  { id: 11, studentName: "오유진", courseName: "고등 과학탐구", amount: "30만원", dueDate: "2026-09-05", status: "완납" },
  { id: 12, studentName: "배준혁", courseName: "고등 수학 기본반", amount: "30만원", dueDate: "2026-09-05", status: "미납" },
];

export const INITIAL_TEACHERS: Teacher[] = [
  { id: 1, name: "김원장", subject: "수학 총괄", career: "15년차 · 원장", intro: "고등 수학 커리큘럼 총괄 설계", days: "월~금", public: true },
  { id: 2, name: "박강사", subject: "수학", career: "8년차", intro: "서울대 수학교육, 심화반 전담", days: "월~토", public: true },
  { id: 3, name: "최강사", subject: "영어", career: "10년차", intro: "TESOL 자격, 독해·회화 전담", days: "화~토", public: true },
  { id: 4, name: "이강사", subject: "국어·논술", career: "6년차", intro: "논술 첨삭 및 문학 전담", days: "월,금,토,일", public: true },
  { id: 5, name: "정강사", subject: "과학", career: "7년차", intro: "실험 중심 수업 진행", days: "월,수,토", public: true },
  { id: 6, name: "강강사", subject: "수학(초등)", career: "4년차", intro: "초등 사고력 수학 전담", days: "화,목", public: true },
  { id: 7, name: "윤강사", subject: "영어 보조", career: "3년차", intro: "보조 강사, 시간제 근무", days: "화,목", public: false },
];

export const INITIAL_REVIEWS: Review[] = [
  { id: 1, studentName: "김민준 학부모", courseName: "고등 수학 심화반", rating: 5, content: "아이 성적이 확실히 올랐어요.", published: true, date: "2026-08-20" },
  { id: 2, studentName: "박서연 학부모", courseName: "중등 영어 기초반", rating: 5, content: "선생님이 꼼꼼하게 봐주셔서 좋아요.", published: true, date: "2026-08-18" },
  { id: 3, studentName: "이도현 학부모", courseName: "고등 국어 독서논술", rating: 4, content: "첨삭이 상세해서 도움이 많이 됩니다.", published: true, date: "2026-08-15" },
  { id: 4, studentName: "최지우 학부모", courseName: "중등 과학 실험반", rating: 5, content: "실험 위주 수업이라 흥미로워해요.", published: true, date: "2026-08-10" },
  { id: 5, studentName: "강민서 학부모", courseName: "고등 수학 기본반", rating: 4, content: "기초부터 차근차근 잘 가르쳐주십니다.", published: true, date: "2026-08-05" },
  { id: 6, studentName: "임채원 학부모", courseName: "고등 영어 독해반", rating: 5, content: "독해 실력이 눈에 띄게 늘었습니다.", published: true, date: "2026-07-28" },
  { id: 7, studentName: "한지호 학부모", courseName: "중등 수학 심화반", rating: 4, content: "숙제 관리가 체계적이에요.", published: false, date: "2026-07-20" },
  { id: 8, studentName: "오유진 학부모", courseName: "고등 과학탐구", rating: 5, content: "탐구 영역 개념 정리가 확실합니다.", published: true, date: "2026-07-15" },
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  { id: 1, studentName: "김**", school: "서울대학교 수학교육과", year: "2026", memo: "고등 수학 심화반 3년 수강", published: true },
  { id: 2, studentName: "이**", school: "연세대학교 국어국문학과", year: "2026", memo: "논술 첨삭반 2년 수강", published: true },
  { id: 3, studentName: "박**", school: "고려대학교 영어영문학과", year: "2025", memo: "영어 독해반 수강", published: true },
  { id: 4, studentName: "최**", school: "성균관대학교 물리학과", year: "2025", memo: "과학탐구반 수강", published: true },
  { id: 5, studentName: "정**", school: "한양대학교 수학과", year: "2025", memo: "수학 심화반 수강", published: true },
  { id: 6, studentName: "강**", school: "서강대학교 경제학과", year: "2024", memo: "수학 기본반 수강", published: true },
  { id: 7, studentName: "윤**", school: "중앙대학교 영어교육과", year: "2024", memo: "영어 독해반 수강", published: true },
  { id: 8, studentName: "한**", school: "경희대학교 국어국문학과", year: "2024", memo: "국어 문학반 수강", published: false },
  { id: 9, studentName: "오**", school: "이화여대 수학과", year: "2023", memo: "수학 심화반 수강", published: true },
  { id: 10, studentName: "서**", school: "건국대학교 화학과", year: "2023", memo: "과학 실험반 수강", published: true },
];

export const INITIAL_NOTICES: Notice[] = [
  { id: 1, title: "2학기 시간표 변경 안내", published: true },
  { id: 2, title: "추석 연휴 휴원 안내", published: true },
  { id: 3, title: "9월 모의고사 일정 안내", published: true },
  { id: 4, title: "신규 논술 첨삭반 개강 안내", published: true },
  { id: 5, title: "학부모 상담주간 안내 (작성중)", published: false },
];

export const INITIAL_MATERIALS: Material[] = [
  { id: 1, title: "2026 고등 수학 심화반 커리큘럼", category: "커리큘럼", uploadedAt: "2026-08-01", published: true },
  { id: 2, title: "여름방학 특강 시간표", category: "시간표", uploadedAt: "2026-07-15", published: true },
  { id: 3, title: "중등 영어 단어장 (1~10과)", category: "학습자료", uploadedAt: "2026-06-20", published: true },
  { id: 4, title: "논술 첨삭 가이드", category: "학습자료", uploadedAt: "2026-05-10", published: true },
  { id: 5, title: "2026 입시설명회 자료", category: "입시정보", uploadedAt: "2026-03-01", published: true },
  { id: 6, title: "9월 모의고사 대비 자료 (작성중)", category: "학습자료", uploadedAt: "2026-08-25", published: false },
];

export const INITIAL_STAFF: Staff[] = [
  { id: 1, name: "김원장", role: "관리자", position: "원장", phone: "010-0000-0001", status: "재직" },
  { id: 2, name: "이실장", role: "관리자", position: "실장", phone: "010-0000-0002", status: "재직" },
  { id: 3, name: "박행정", role: "직원", position: "행정 담당", phone: "010-0000-0003", status: "재직" },
  { id: 4, name: "최상담", role: "직원", position: "상담 코디네이터", phone: "010-0000-0004", status: "재직" },
  { id: 5, name: "정회계", role: "직원", position: "수강료 관리", phone: "010-0000-0005", status: "재직" },
  { id: 6, name: "한교무", role: "직원", position: "교무 관리", phone: "010-0000-0006", status: "비활성" },
];
