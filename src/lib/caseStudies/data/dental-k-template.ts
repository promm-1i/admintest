import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "여문치과",
  headline: "중장년 임플란트와 수면 진료를 차례로 안내하는 치과 홈페이지",
  summary: "중장년 임플란트와 고난이도 임플란트, 수면 진료, 사랑니 · 심미 진료를 나눠 안내합니다. 메인에서 임플란트 비용과 상담 신청 칸을 바로 볼 수 있습니다.",
  brandColor: "#232176",
  tintColor: "#f3f3f8",
  mobileDark: false,
  overview: "첫 화면은 흑백 인물 사진과 화살표로 넘기는 세 장면으로 열리고, 아래로 내리면 중장년 임플란트 소개와 진료 후기, 의료진, 임플란트 비용 안내가 이어집니다.\n\n진료 페이지는 중장년층이 임플란트를 고를 때 살필 점, 수면 진료의 과정과 대상, 사랑니 발치 사례처럼 진료마다 필요한 내용을 나눠 설명합니다. 원내 둘러보기와 지점 안내, 진료시간 · 오시는 길은 병원 소개 메뉴에 모았습니다.",
  meta: [
    { label: "업종", value: "치과 · 임플란트" },
    { label: "주요 구성", value: "중장년 임플란트 · 수면 진료 · 사랑니 · 라미네이트 · 교정 · 원내 둘러보기 · 상담 예약" },
  ],
  mainShot: "/cases/yeomun/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "임플란트 상담에서 방문 안내까지",
  pages: [
    { name: "메인", file: "index.html", img: "/cases/yeomun/page-index.webp", desc: "첫 화면 세 장면에서 중장년 임플란트 소개, 진료 후기, 의료진, 임플란트 비용 안내까지 차례로 살펴봅니다.", items: ["첫 화면 세 장면", "진료 후기", "비용 안내"] },
    { name: "중장년층을 위한 여문 임플란트", file: "implant_implant_01.html", img: "/cases/yeomun/page-implant.webp", desc: "중장년층이 임플란트를 계획할 때 살필 건강 상태와 치과를 고르는 기준을 읽고 상담을 신청합니다.", items: ["살필 점", "치과 고르는 기준", "상담 신청"] },
    { name: "의식하진정요법 (수면)", file: "sleep_care_01.html", img: "/cases/yeomun/page-sleep.webp", desc: "치과 치료가 두려운 분을 위한 수면 진료의 과정과 치료 대상, 자주 묻는 질문을 확인합니다.", items: ["진료 과정", "치료 대상", "자주 묻는 질문"] },
    { name: "사랑니 발치", file: "wisdom-tooth-extraction.html", img: "/cases/yeomun/page-wisdom.webp", desc: "발치 후기와 대학병원 진료 비교를 보고, 사랑니가 썩었을 때 · 아플 때 · 교정 중일 때처럼 상황별 안내와 Q&A를 읽습니다.", items: ["발치 후기", "상황별 안내", "Q&A"] },
    { name: "원내 둘러보기", file: "about_about_04.html", img: "/cases/yeomun/page-tour.webp", desc: "접수 · 대기 공간과 상담실, 수술 · 진정 진료실, 영상 검사실을 사진과 짧은 설명으로 둘러봅니다.", items: ["상담실", "진료 공간", "영상 검사실"] },
    { name: "진료안내 / 오시는 길", file: "about_about_03.html", img: "/cases/yeomun/page-location.webp", desc: "예약 및 상담 방법과 진료시간, 오시는 길을 지점별로 확인합니다.", items: ["예약 및 상담", "진료시간", "오시는 길"] },
  ],
  points: [
    { title: "첫 화면 세 장면을\n화살표로 넘겨 봅니다", body: "부모님 세대를 위한 인사, 시니어 임플란트, 한자리에서 진료해 온 시간을 장면마다 다른 사진과 제목으로 보여 줍니다.", items: ["세 장면", "화살표 넘김"], img: "/cases/yeomun/point-hero.webp", caption: "메인 · 첫 화면" },
    { title: "임플란트 비용과 문의 창을\n메인에서 바로 엽니다", body: "임플란트 종류별 비용을 표로 보여 주고, 비용 문의 단추를 누르면 이름, 휴대폰 번호, 상담 지점, 필요한 치아 개수를 적는 창이 열립니다.", items: ["종류별 비용", "비용 문의 창"], img: "/cases/yeomun/point-cost.webp", caption: "메인 · 임플란트 비용 문의" },
    { title: "진료 공간을\n사진으로 둘러봅니다", body: "접수와 대기를 나눈 실내부터 별도 상담실, 수술 · 진정 진료실, 영상 검사실까지 공간마다 한 줄 설명을 붙였습니다.", items: ["공간 사진", "공간 설명"], img: "/cases/yeomun/point-tour.webp", caption: "원내 둘러보기" },
  ],
  detailsLabel: "상세 내용",
  detailsTitle: "진료를 고르고 상담을 준비하는 흐름",
  details: [
    { title: "진료별로 나뉜 안내", body: "중장년 임플란트, 고난이도 임플란트, 수면 진료, 사랑니, 라미네이트, 성인 교정, 충치 · 신경치료를 진료마다 다른 페이지에서 읽습니다." },
    { title: "두 지점의 방문 정보", body: "지점 안내와 진료안내 · 오시는 길에서 지점별 진료시간과 위치를 확인하고, 상담 및 예약에서 전화나 카카오톡 상담으로 이어집니다." },
  ],
  mobile: {
    title: "휴대폰에서도 같은 순서로",
    body: "작은 화면에서는 첫 화면 장면과 진료 안내가 한 열로 이어지고, 전체 메뉴를 열어 진료 페이지로 이동합니다.",
    shots: [
      { img: "/cases/yeomun/m-index.webp", caption: "모바일 메인" },
      { img: "/cases/yeomun/m-implant.webp", caption: "모바일 중장년 임플란트" },
    ],
  },
  faq: [
    { q: "어떤 진료를 안내하나요?", a: "중장년 임플란트와 고난이도 임플란트, 수면 진료, 사랑니 발치, 라미네이트, 성인 교정, 충치 · 신경치료를 진료별로 안내합니다." },
    { q: "비용은 어디에서 보나요?", a: "메인의 임플란트 비용 안내와 비급여 진료비 페이지에서 확인할 수 있습니다." },
  ],
};

export default study;
