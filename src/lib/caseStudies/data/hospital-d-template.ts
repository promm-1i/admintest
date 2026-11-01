import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "온새봄정신병원",
  headline: "정신건강의학과 병원 홈페이지",
  summary: "외래진료와 입원 절차, 병동 생활 정보를 메뉴별로 안내합니다. 의료진과 치료 프로그램, 병원 공간을 살펴보고 필요한 서류와 방문 경로를 찾을 수 있습니다.",
  brandColor: "#244d8e",
  tintColor: "#f0f4fa",
  overview: "온새봄정신병원의 진료와 이용 정보를 파란색 글자와 밝은 바탕 위에 정리했습니다. 첫 화면에서는 의료진과 재활 프로그램을 넘겨 보고, 병원 소식과 방문 안내로 이동합니다.\n\n외래 시간표와 입원 유형별 절차, 식사와 투약 시간, 증명서 신청 서류는 각각의 화면에서 확인합니다. 입원 방식은 탭을 눌러 비교하고, 제증명 화면에서는 동의서와 위임장을 PDF 또는 한글 파일로 내려받습니다.\n\n병원 소개에는 인사말과 연혁, 진료 공간과 오시는 길을 두었습니다. 자주 묻는 질문은 제목을 누르면 답변이 열리고, 개인정보 처리 내용은 상담창과 하단 메뉴에서 확인할 수 있습니다.",
  meta: [
    { label: "업종", value: "정신건강의학과 · 입원 진료 · 재활 프로그램" },
    { label: "페이지 구성", value: "병원 소개 · 의료진 · 외래진료 · 입퇴원 · 병동 생활 · 제증명 · 비급여 · 정신건강정보 · 소식 · 자주 묻는 질문" },
    { label: "이런 곳에 맞습니다", value: "외래와 병동을 함께 운영하는 병원, 입원 절차와 재활 활동을 안내하려는 정신건강의학과 의료기관" },
  ],
  mainShot: "/cases/onsaebom/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "진료를 알아보고 방문을 준비합니다",
  pages: [
    { name: "홈", file: "index.html", img: "/cases/onsaebom/page-index.webp", desc: "진료 소개와 의료진, 치료 프로그램, 병원 소식, 방문 안내를 차례로 보여 줍니다.", items: ["첫 화면 슬라이드", "의료진과 프로그램", "소식과 오시는 길"] },
    { name: "병원 소개", file: "about.html", img: "/cases/onsaebom/page-about.webp", desc: "병원의 진료 방향과 운영에 관한 인사말을 읽고 병원 공간을 살펴봅니다.", items: ["인사말", "병원 공간", "진료 방향"] },
    { name: "의료진", file: "doctors.html", img: "/cases/onsaebom/page-doctors.webp", desc: "진료를 맡은 의료진의 담당 역할과 교육·활동 경력을 나란히 정리했습니다.", items: ["담당 의료진", "경력과 교육", "학술 활동"] },
    { name: "외래진료", file: "medical-info.html", img: "/cases/onsaebom/page-medical-info.webp", desc: "방문할 때 필요한 서류, 요일별 진료 시간표, 접수부터 진료 후 수납까지의 순서를 안내합니다.", items: ["준비 서류", "진료 시간표", "외래 이용 순서"] },
    { name: "입퇴원", file: "discharge.html", img: "/cases/onsaebom/page-discharge.webp", desc: "입원 유형을 골라 신청과 진단, 입원과 퇴원으로 이어지는 절차를 확인합니다.", items: ["입원 유형별 탭", "단계별 절차", "퇴원 신청 안내"] },
    { name: "병원 공간", file: "interior.html", img: "/cases/onsaebom/page-interior.webp", desc: "대기실과 외래진료실, 프로그램실, 산책 공간을 좌우로 넘겨 봅니다.", items: ["공간 사진", "슬라이드 탐색", "공간별 설명"] },
  ],
  points: [
    { title: "의료진과 프로그램을\n넘겨 살펴봅니다", body: "메인에서 의료진별 안내를 좌우로 넘기고, 활동·교육·사회기술 등 회복 프로그램을 확인합니다.", items: ["의료진 안내", "재활 활동", "자동 넘김 조절"], img: "/cases/onsaebom/point-program.webp", caption: "메인 · 치료 프로그램" },
    { title: "입원 방식에 따라\n절차가 달라집니다", body: "자의입원과 동의입원, 보호입원, 행정입원, 응급입원을 각각 선택해 필요한 절차와 확인 항목을 읽습니다.", items: ["유형별 선택", "절차 도식", "퇴원과 전환 안내"], img: "/cases/onsaebom/point-discharge.webp", caption: "진료안내 · 입퇴원" },
    { title: "필요한 서류를\n미리 준비합니다", body: "신청하는 사람과 환자의 동의 가능 여부에 따라 필요한 서류를 표로 안내하고, 동의서와 위임장 다운로드를 제공합니다.", items: ["신청자별 구비 서류", "PDF 서식", "한글 서식"], img: "/cases/onsaebom/point-certificate.webp", caption: "이용안내 · 제증명" },
    { title: "궁금한 질문은\n답변을 펼쳐 읽습니다", body: "진료기록과 약 복용, 가족의 도움 등 자주 묻는 항목에서 필요한 답변만 열어 볼 수 있습니다.", items: ["질문별 펼침", "진료기록 안내", "치료에 관한 질문"], img: "/cases/onsaebom/point-faq.webp", caption: "커뮤니티 · 자주 묻는 질문" },
  ],
  detailsLabel: "이용 안내",
  detailsTitle: "방문 전에 확인할 내용을 모았습니다",
  details: [
    { title: "요일별 시간표", body: "외래진료 시간과 점심시간, 휴진 요일을 구분해 안내합니다. 작은 화면에서는 표를 좌우로 움직여 읽습니다." },
    { title: "부서 연락처와 방문 경로", body: "문의할 부서를 고르고 셔틀과 대중교통, 차량으로 방문하는 방법을 확인할 수 있습니다." },
    { title: "소식에서 상세 내용으로", body: "병원 소식과 공지, 비급여 비용은 목록과 상세 화면으로 연결합니다." },
    { title: "개인정보 처리 안내", body: "상담창의 동의 항목이나 하단 메뉴에서 개인정보 처리 내용을 열어 확인합니다." },
  ],
  mobile: {
    title: "휴대폰에서는 메뉴를 펼쳐 찾습니다",
    body: "오른쪽 위에서 전체 메뉴를 열고 진료와 이용 정보를 선택합니다. 연락처와 상담창은 화면 아래에서 확인할 수 있습니다.",
    shots: [
      { img: "/cases/onsaebom/m-index.webp", caption: "메인" },
      { img: "/cases/onsaebom/m-medical-info.webp", caption: "외래진료" },
      { img: "/cases/onsaebom/m-discharge.webp", caption: "입퇴원" },
      { img: "/cases/onsaebom/m-faq.webp", caption: "자주 묻는 질문" },
    ],
  },
  faq: [
    { q: "병원 이름과 진료 시간을 바꿀 수 있나요?", a: "로고와 병원명, 부서 연락처와 요일별 진료 시간을 운영 정보에 맞춰 변경할 수 있습니다." },
    { q: "의료진과 치료 프로그램을 추가할 수 있나요?", a: "의료진의 소개와 경력, 프로그램의 설명과 사진을 병원 운영 내용에 맞춰 구성할 수 있습니다." },
    { q: "병원 소식은 어떻게 살펴보나요?", a: "공지와 병원 소식을 날짜순 목록에서 살펴봅니다. 주요 게시글은 제목을 누르면 상세 내용과 활동 사진을 보여 줍니다." },
    { q: "입원과 서류 발급 안내도 수정할 수 있나요?", a: "입원 유형별 절차와 구비 서류, 다운로드 양식을 병원의 실제 운영 기준에 맞춰 조정할 수 있습니다." },
  ],
};

export default study;
