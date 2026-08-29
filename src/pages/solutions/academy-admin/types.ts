export type Course = {
  id: number;
  name: string;
  subject: string;
  teacher: string;
  schedule: string;
  capacity: number;
  enrolled: number;
  price: string;
  status: "공개" | "비공개";
  icon: string;
};

export const EMPTY_COURSE_FORM = {
  name: "",
  subject: "수학",
  teacher: "",
  schedule: "",
  capacity: 15,
  price: "",
};

export type Consult = {
  id: number;
  name: string;
  phone: string;
  studentName: string;
  grade: string;
  channel: "온라인" | "전화" | "방문상담";
  content: string;
  status: "접수" | "상담중" | "완료";
  assignee: string;
};

export type StudentActivity = { id: number; type: string; content: string; at: string };

export type Student = {
  id: number;
  name: string;
  grade: string;
  parentName: string;
  parentPhone: string;
  enrolledCourses: string[];
  joinDate: string;
  status: "재원" | "휴원" | "퇴원";
  activities: StudentActivity[];
};

export type Enrollment = {
  id: number;
  studentName: string;
  courseName: string;
  teacher: string;
  startDate: string;
  status: "수강중" | "종료" | "휴강";
  tuitionStatus: "완납" | "미납" | "부분납부";
};

export type Attendance = {
  id: number;
  studentName: string;
  courseName: string;
  date: string;
  status: "출석" | "결석" | "지각" | "조퇴";
};

export type Grade = {
  id: number;
  studentName: string;
  courseName: string;
  examName: string;
  score: number;
  maxScore: number;
  date: string;
};

export type Tuition = {
  id: number;
  studentName: string;
  courseName: string;
  amount: string;
  dueDate: string;
  status: "완납" | "미납" | "부분납부";
};

export type Teacher = {
  id: number;
  name: string;
  subject: string;
  career: string;
  intro: string;
  days: string;
  public: boolean;
};

export const EMPTY_TEACHER_FORM = { name: "", subject: "수학", career: "", intro: "", days: "월~금" };

export type Review = { id: number; studentName: string; courseName: string; rating: number; content: string; published: boolean; date: string };

export type Achievement = { id: number; studentName: string; school: string; year: string; memo: string; published: boolean };

export type Notice = { id: number; title: string; published: boolean };

export type Material = { id: number; title: string; category: string; uploadedAt: string; published: boolean };

export type Staff = {
  id: number;
  name: string;
  role: "관리자" | "직원";
  position: string;
  phone: string;
  status: "재직" | "비활성";
};

export type SiteSettings = {
  academyName: string;
  tagline: string;
  phone: string;
  address: string;
  hours: string;
  showTeachers: boolean;
  showCourses: boolean;
  showAchievements: boolean;
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  academyName: "MintCL 학원",
  tagline: "결과로 증명하는 학습 관리",
  phone: "02-000-0000",
  address: "서울특별시 강남구 테헤란로 123",
  hours: "평일 14:00 - 22:00 / 토 10:00 - 18:00",
  showTeachers: true,
  showCourses: true,
  showAchievements: true,
};

export type ActivityLog = { id: number; time: string; action: string; target: string };
