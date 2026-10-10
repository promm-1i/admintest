import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "온연피부과의원",
  headline: "리프팅 · 피부 컨디션 진료와 예약을 담은 피부과 홈페이지",
  summary:
    "큰 사진과 진료 예약 상자, 의료진 · 진료 항목 넘김으로 이어지는 메인에 리프팅 9쪽, 피부 톤 · 보습 · 볼륨 관리 7쪽, 의료진 · 진료 안내, 활동 · 공지 · 후기 게시판, 예약 · 회원, 별도 라운지까지 모두 45쪽을 담은 피부과 홈페이지입니다.",
  brandColor: "rgb(93,73,59)",
  tintColor: "rgb(246,243,237)",
  overview:
    "온연피부과의원은 피부 상태를 먼저 살피고 필요한 범위를 차분하게 설명하는 가상 피부과를 가정해 만든 디자인입니다. 실제 병원이 아니며 의료진, 주소, 연락처, 게시물은 화면 구성을 보여 드리기 위한 예시입니다.\n\n메인은 사진이 바뀌는 첫 화면과 바로 예약하는 입력 상자, 피부 고민별 진료 항목, 의료진 소개, 숫자로 보는 진료 원칙, 소식 카드가 이어집니다. 첫 화면 알림창과 전체 메뉴, 진료 항목 탭, 카드 넘김, 모바일 메뉴도 원본의 동작 흐름에 맞춰 구성했습니다.\n\n진료 항목은 장비 상표 대신 고강도 집속 초음파, 고주파, 복합 에너지처럼 일반 명칭으로 정리했습니다. 별도 라운지는 소개 · 위치 · 예약 · 소식 · 운영 방침까지 같은 브랜드 안에서 다른 분위기로 이어집니다.",
  meta: [
    { label: "업종", value: "피부과 의원 · 리프팅 · 피부 톤과 보습 · 볼륨 개선 관리" },
    { label: "페이지 구성", value: "45쪽 · 메인, 리프팅 안내 10, 피부 톤·보습·볼륨 관리 7, 진료 항목·예약·의료진·진료 안내, 활동·공지·후기, 회원·약관·검색, 라운지 8" },
    { label: "이런 곳에 맞습니다", value: "리프팅과 피부 컨디션 진료를 함께 안내하는 피부과, 의료진과 상담 과정을 앞세우는 의원, 별도 상담 라운지를 운영하는 곳" },
  ],
  mainShot: "/cases/clinic-m/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "45쪽의 대표 화면",
  pages: [
    { name: "메인", file: "index.html", img: "/cases/clinic-m/page-index.webp", desc: "큰 사진과 예약 상자 뒤로 진료 항목, 의료진, 진료 원칙, 활동 카드가 이어집니다.", items: ["사진 넘김 첫 화면", "바로 예약 입력 상자", "진료 항목 · 의료진 넘김"] },
    { name: "집속 초음파 리프팅", file: "ultrasound-lifting.html", img: "/cases/clinic-m/page-ultrasound-lifting.webp", desc: "진료 특징, 적용 부위, 과정, 주의사항을 긴 호흡으로 설명하는 대표 진료 쪽입니다.", items: ["진료 특징 · 적용 부위", "상담부터 사후 관리까지"] },
    { name: "진료 항목", file: "treatments.html", img: "/cases/clinic-m/page-treatments.webp", desc: "피부 고민과 관리 방법을 분류해 찾아볼 수 있는 진료 항목 목록입니다.", items: ["분류별 진료 카드", "상세 쪽 연결"] },
    { name: "의료진", file: "doctors.html", img: "/cases/clinic-m/page-doctors.webp", desc: "가상의 피부과 전문의 여섯 명과 진료 원칙을 소개합니다.", items: ["의료진 프로필", "진료 철학 · 약력"] },
    { name: "온연의 활동", file: "activities.html", img: "/cases/clinic-m/page-activities.webp", desc: "학술 활동과 병원 소식을 카드 목록과 상세 화면으로 보여 줍니다.", items: ["활동 목록", "게시물 상세"] },
    { name: "비급여 항목", file: "nonbenefit.html", img: "/cases/clinic-m/page-nonbenefit.webp", desc: "항목과 금액을 표로 확인하는 화면입니다.", items: ["분류별 비용 표", "모바일 가로 스크롤"] },
    { name: "온연 라운지", file: "lounge.html", img: "/cases/clinic-m/page-lounge.webp", desc: "별도 상담 라운지의 소개와 위치, 예약, 소식을 한 묶음으로 구성했습니다.", items: ["라운지 소개", "위치 · 예약 · 소식"] },
    { name: "온라인 예약", file: "reservation.html", img: "/cases/clinic-m/page-reservation.webp", desc: "필수값과 개인정보 동의를 확인하는 예약 신청 화면입니다.", items: ["의료진 · 날짜 선택", "필수값 확인"] },
  ],
  points: [
    { title: "첫 화면과 바로 예약", body: "사진이 천천히 바뀌는 첫 화면 아래에 이름, 연락처, 진료 항목을 넣는 예약 상자를 붙였습니다.", items: ["자동 넘김 사진", "예약 입력 상자"], img: "/cases/clinic-m/point-reservation.webp", caption: "메인 — 바로 예약" },
    { title: "피부 고민별 진료 항목", body: "리프팅과 피부 컨디션 관리 항목을 카드로 나눠 필요한 내용을 빠르게 찾게 했습니다.", items: ["항목 카드 넘김", "상세 쪽 연결"], img: "/cases/clinic-m/point-program.webp", caption: "메인 — 진료 항목" },
    { title: "의료진과 진료 원칙", body: "의료진 사진과 소개 뒤에 상담부터 사후 관리까지의 원칙을 큰 숫자로 보여 줍니다.", items: ["의료진 카드", "네 단계 진료 원칙"], img: "/cases/clinic-m/point-doctors.webp", caption: "메인 — 의료진" },
    { title: "별도 라운지", body: "상담 라운지는 같은 기능을 유지하면서 더 절제된 세로형 화면으로 구분했습니다.", items: ["라운지 전용 메뉴", "소개 · 예약 · 운영 방침"], img: "/cases/clinic-m/point-lounge.webp", caption: "온연 라운지" },
  ],
  detailsLabel: "자세히",
  detailsTitle: "만들 때 신경 쓴 것",
  details: [
    { title: "상표 대신 진료 원리로", body: "장비와 약품 상표를 일반적인 진료 원리와 피부 고민 중심 이름으로 바꿨습니다." },
    { title: "팝업과 메뉴의 숨은 상태", body: "첫 화면 알림창, 전체 메뉴, 하위 메뉴, 탭과 카드 넘김을 키보드와 터치에서도 사용할 수 있게 연결했습니다." },
    { title: "화면 폭마다 이어지는 배치", body: "데스크톱, 태블릿, 모바일에서 예약 폼과 카드가 겹치지 않도록 원본 반응형 규칙을 유지했습니다." },
    { title: "사진 교체를 전제로 한 자리", body: "사진마다 파일명과 크기, 밝기를 정해 두어 실제 병원 사진으로 바꿀 때 배치가 흐트러지지 않습니다." },
  ],
  mobile: {
    title: "모바일에서는 메뉴와 카드가 한 줄로 정리됩니다",
    body: "전체 메뉴는 햄버거 단추로 열고, 예약 입력은 두 열에서 한 열로 바뀌며, 진료 카드와 게시판은 손가락으로 넘겨 볼 수 있습니다.",
    shots: [
      { img: "/cases/clinic-m/m-index.webp", caption: "메인" },
      { img: "/cases/clinic-m/m-ultrasound-lifting.webp", caption: "집속 초음파 리프팅" },
      { img: "/cases/clinic-m/m-treatments.webp", caption: "진료 항목" },
      { img: "/cases/clinic-m/m-lounge.webp", caption: "온연 라운지" },
      { img: "/cases/clinic-m/m-reservation.webp", caption: "온라인 예약" },
    ],
  },
  faq: [
    { q: "우리 병원 이름과 색으로 바꿀 수 있나요?", a: "네. 로고, 색, 문구, 진료 항목을 실제 병원 정보에 맞춰 바꿔 드립니다." },
    { q: "하지 않는 진료 항목은 뺄 수 있나요?", a: "네. 같은 틀을 쓰는 진료 쪽은 필요한 항목만 남기거나 새 항목을 더할 수 있습니다." },
    { q: "예약 신청이 실제로 접수되나요?", a: "현재는 입력 확인까지만 하는 예시이며, 메일이나 관리자 화면으로 받도록 연결할 수 있습니다." },
    { q: "비급여 금액을 직접 관리할 수 있나요?", a: "관리 기능을 추가하면 항목과 금액을 직접 수정하도록 구성할 수 있습니다." },
    { q: "온연피부과의원은 실제 병원인가요?", a: "아닙니다. 디자인을 보여 드리기 위해 만든 가상 병원이며 모든 인물과 정보는 예시입니다." },
  ],
};

export default study;
