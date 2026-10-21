import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "담묵문방박물관",
  headline: "문방 공예 · 체험 박물관 홈페이지",
  summary:
    "붓의 역사와 제작 과정, 장인 기록, 상설·기획전, 교육 신청과 대관까지 갖춘 문방 공예 박물관 홈페이지입니다.",
  brandColor: "rgb(59,55,51)",
  tintColor: "rgb(247,245,241)",
  overview:
    "담묵문방박물관은 붓과 문방 공예를 전시하고 체험 프로그램을 운영하는 박물관 브랜드 디자인입니다. 첫 화면에서는 전시와 프로그램, 관람 안내를 빠르게 살펴보고 각 상세 화면으로 이동할 수 있습니다.\n\n박물관 소개와 관장 이야기, 붓의 역사·제작·장인·종류를 깊이 있게 나누고, 상설전과 기획전, 교육 프로그램을 각각 목록과 상세로 연결했습니다. 대관과 프로그램 신청은 꼭 넣어야 하는 칸 확인과 오류 안내를 체험할 수 있지만 현재 미리보기에서는 실제로 전송하거나 저장하지 않습니다.",
  meta: [
    { label: "업종", value: "공방 · 사립박물관 · 문화 체험" },
    { label: "페이지 구성", value: "21쪽 · 소개, 붓 이야기, 전시, 교육, 대관, 공지" },
    { label: "이런 곳에 맞습니다", value: "공예 박물관, 장인 공방, 지역 문화 공간, 체험 교육관" },
  ],
  mainShot: "/cases/craft-f/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "21쪽이 어떻게 이어지는지",
  pages: [
    { name: "홈", file: "index.html", img: "/cases/craft-f/page-index.webp", desc: "대표 장면에서 관람 안내, 전시, 프로그램과 소식으로 이어집니다.", items: ["대표 슬라이드", "관람 · 빠른 메뉴", "전시 · 프로그램 · 소식"] },
    { name: "박물관", file: "museum.html", img: "/cases/craft-f/page-museum.webp", desc: "설립 취지, 공간과 연혁, 관람 규칙을 한 흐름으로 설명합니다.", items: ["박물관 소개", "공간 · 연혁", "관람시간 · 유의사항"] },
    { name: "붓 이야기", file: "history.html", img: "/cases/craft-f/page-history.webp", desc: "역사, 제작 과정, 장인과 종류를 네 갈래로 나눠 소개합니다.", items: ["붓의 역사", "15단계 제작 과정", "장인 · 재료 · 쓰임"] },
    { name: "전시", file: "exhibitions.html", img: "/cases/craft-f/page-exhibitions.webp", desc: "상설전과 기획·특별전을 목록과 대표 상세 화면으로 연결합니다.", items: ["상설전 목록 · 상세", "기획전 목록 · 상세", "전시 기간 · 장소"] },
    { name: "교육", file: "programs.html", img: "/cases/craft-f/page-programs.webp", desc: "문방 체험을 비교하고 날짜와 인원을 골라 신청하는 화면입니다.", items: ["프로그램 목록 · 상세", "달력 · 인원 선택", "신청자 정보 · 동의"] },
    { name: "대관", file: "rental.html", img: "/cases/craft-f/page-rental.webp", desc: "전시 기간과 신청자·전시 정보를 순서대로 입력하도록 구성했습니다.", items: ["기간 선택", "신청자 · 전시 정보", "파일 · 개인정보 동의"] },
    { name: "알림마당", file: "notice.html", img: "/cases/craft-f/page-notice.webp", desc: "공지와 박물관 소식을 목록과 상세로 확인합니다.", items: ["공지 목록 · 상세", "소식 카드", "신청내역 확인"] },
  ],
  points: [
    { title: "제작 과정을\n손의 순서로 보여 줍니다", body: "털을 고르는 일부터 필관 결합과 마무리까지 긴 공정을 단계별 사진 칸과 짧은 설명으로 나눴습니다.", items: ["도구와 구조", "15단계 공정", "다음 이야기 연결"], img: "/cases/craft-f/point-craft.webp", caption: "붓 제작 과정" },
    { title: "재료와 쓰임을\n한눈에 비교합니다", body: "붓촉과 필관 재료, 한글필·채색필·장봉필처럼 쓰임이 다른 붓을 같은 규칙으로 비교할 수 있습니다.", items: ["붓촉 재료", "필관 재료", "길이 · 쓰임별 종류"], img: "/cases/craft-f/point-collection.webp", caption: "붓의 종류" },
    { title: "관람에서 신청까지\n같은 흐름으로 잇습니다", body: "프로그램 소개 뒤에 날짜, 시간, 인원과 신청자 정보를 이어 배치해 다음 행동을 찾기 쉽습니다.", items: ["프로그램 비교", "달력 · 수량 조절", "꼭 넣어야 하는 칸 안내"], img: "/cases/craft-f/point-program.webp", caption: "교육 · 체험" },
  ],
  detailsLabel: "자세히",
  detailsTitle: "만들 때 신경 쓴 것",
  details: [
    { title: "긴 자료도 읽는 순서가 흐트러지지 않습니다", body: "연혁과 제작 과정은 제목, 번호, 이미지 비율을 반복해 정보가 많아도 현재 위치를 놓치지 않게 구성했습니다." },
    { title: "신청 화면은 실제 운영 상태를 고려했습니다", body: "필수 입력과 개인정보 동의, 오류 안내를 구분했습니다. 이 예시에서는 외부 전송 없이 안내 메시지만 표시합니다." },
    { title: "데스크톱과 모바일 메뉴를 각각 조작합니다", body: "넓은 화면에서는 전체 메뉴를 펼쳐 보고, 모바일에서는 화면에 맞는 탭 메뉴로 하위 항목을 열고 닫습니다." },
  ],
  mobile: {
    title: "긴 설명도 한 줄로 이어집니다",
    body: "큰 사진과 긴 설명은 한 줄로 쌓이고, 카드와 신청 항목은 옆으로 밀리는 일 없이 화면 크기에 맞춰 배치됩니다.",
    shots: [
      { img: "/cases/craft-f/m-index.webp", caption: "홈" },
      { img: "/cases/craft-f/m-museum.webp", caption: "박물관" },
      { img: "/cases/craft-f/m-process.webp", caption: "제작 과정" },
      { img: "/cases/craft-f/m-apply.webp", caption: "프로그램 신청" },
    ],
  },
  faq: [
    { q: "전시와 프로그램을 직접 바꿀 수 있나요?", a: "관리자 기능을 추가하면 전시 제목, 기간, 사진과 프로그램 일정·정원을 직접 등록하고 수정할 수 있습니다." },
    { q: "프로그램 신청을 실제 접수와 연결할 수 있나요?", a: "가능합니다. 신청 저장, 관리자 확인, 정원 마감과 알림 발송을 운영 방식에 맞춰 연결합니다." },
    { q: "현재 보이는 사진은 최종 사진인가요?", a: "네. 전시 공간, 붓 제작 과정, 재료와 체험 장면을 각 화면 역할에 맞춰 새로 제작하고 모바일까지 다시 검수했습니다." },
  ],
};

export default study;
