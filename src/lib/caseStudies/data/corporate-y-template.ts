import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "우성창호",
  headline: "창호 · 현관문 · 외장 자재 기업 홈페이지",
  summary: "창호와 현관문 제품군, 외장 자재, 시공 사례, 기술 자료와 온라인 문의를 갖춘 창호 · 도어 기업 홈페이지입니다.",
  brandColor: "#cb201f",
  tintColor: "#f2f2f2",
  overview:
    "우성창호의 메인은 화면 가득한 제품 사진 위에 글자가 한 자씩 나타나는 큰 제목으로 시작하고, 창호 · 도어 · 외장 자재를 차례로 넘겨 보는 슬라이드로 바뀝니다. 아래로 내리면 제품 분류별 사진 카드와 설명, 시공 사례와 소식이 나옵니다.\n\n제품 쪽은 창호와 현관문을 제품 이름별로 나누고, 유형별 그림과 프레임 규격, 유리 구성 안내를 보여 줍니다. 제품 정보 메뉴에는 인증서류 목록, 기술 자료, 제품 관리 동영상, 시공 사례, 제품 사진, 제품 자료집이 있습니다.\n\n모든 쪽 아래에는 문의 종류와 알게 된 경로를 고르고 연락처와 문의 내용, 사진 첨부를 적는 온라인 문의 칸이 있습니다.",
  meta: [
    { label: "업종", value: "창호 · 현관문 · 건물 외장 자재" },
    { label: "페이지 구성", value: "메인 · 창호 · 도어 · 외장 자재 · 회사 소개 · 제품 정보 · 온라인 상점 · 온라인 문의" },
    { label: "이런 곳에 맞습니다", value: "제품 종류가 많고 시공 사례와 기술 자료를 함께 보여 줘야 하는 창호 · 도어 회사" },
  ],
  mainShot: "/cases/woosung/main.webp",
  pagesLabel: "페이지 구성",
  pagesTitle: "제품 안내부터 시공 사례, 문의까지",
  pages: [
    { name: "회사 소개", file: "about-intro.html", img: "/cases/woosung/page-about-intro.webp", desc: "사진 첫 화면에 큰 흰 제목을 얹고, 회사 개요 · 유지보수 · 오시는 길 · 소식을 하위 메뉴로 나눕니다.", items: ["사진 첫 화면", "하위 메뉴 줄", "회사 개요"] },
    { name: "창호 종류", file: "windows-overview.html", img: "/cases/woosung/page-windows-overview.webp", desc: "주거 공간에 맞는 창호 종류와 개폐 방식, 프레임 소재를 제품 이름별로 안내합니다.", items: ["제품별 사진", "개폐 방식", "제품 상세 연결"] },
    { name: "창호 제품 상세", file: "windows-eagle.html", img: "/cases/woosung/page-windows-eagle.webp", desc: "유형 탭을 눌러 고르는 제품 그림과 프레임 규격, 유리 구성 안내를 한 쪽에 모은 제품 상세입니다.", items: ["유형 탭", "프레임 규격", "제품 자료집"] },
    { name: "현관문 종류", file: "doors-overview.html", img: "/cases/woosung/page-doors-overview.webp", desc: "유리섬유 · 금속 현관문을 판넬 형태와 유리 장식, 손잡이 구성에 따라 나누어 보여 줍니다.", items: ["소재별 현관문", "판넬 · 유리 장식", "제품 상세 연결"] },
    { name: "시공 사례", file: "construction-gallery.html", img: "/cases/woosung/page-construction-gallery.webp", desc: "시공 현장 사진을 목록으로 모으고 제목 · 내용 · 작성자로 검색하는 게시판입니다.", items: ["사진 목록", "검색", "사례 상세"] },
    { name: "온라인 문의", file: "online-inquiry.html", img: "/cases/woosung/page-online-inquiry.webp", desc: "문의 종류와 알게 된 경로를 고르고 연락처, 문의 내용, 사진 첨부를 적는 문의 화면입니다.", items: ["문의 종류 고르기", "사진 첨부", "개인정보 동의"] },
  ],
  points: [
    { title: "전체 메뉴를 한 화면에 펼칩니다", body: "오른쪽 위 줄 단추를 누르면 창호 · 도어 · 외장 자재 · 회사 소개 · 제품 정보 메뉴와 하위 메뉴가 한 화면에 펼쳐집니다.", items: ["전체 메뉴", "하위 메뉴", "닫기 단추"], img: "/cases/woosung/point-menu.webp", caption: "전체 메뉴" },
    { title: "유지보수 안내를 탭으로 나눕니다", body: "유지보수와 수리 쪽에서 상하 개폐 · 미닫이처럼 창 종류별 탭을 누르면 창짝 분리와 청소 · 점검 방법이 바뀝니다.", items: ["창 종류 탭", "창짝 분리", "청소와 점검"], img: "/cases/woosung/point-tabs.webp", caption: "유지보수와 수리" },
    { title: "메인 슬라이드로 제품군을 넘겨 봅니다", body: "메인 첫 화면은 창호, 도어, 외장 자재 사진이 차례로 바뀌고 아래 화살표로 직접 넘길 수 있습니다.", items: ["제품군 슬라이드", "글자가 나타나는 제목", "이전 · 다음"], img: "/cases/woosung/point-slider.webp", caption: "메인 슬라이드" },
    { title: "모든 쪽 아래 온라인 문의", body: "어느 쪽에서나 아래로 내리면 어두운 바탕의 온라인 문의 칸이 있습니다. 보내기를 누르면 전화 문의 안내가 나옵니다.", items: ["문의 종류", "연락처 · 내용", "전화 안내"], img: "/cases/woosung/point-form.webp", caption: "온라인 문의" },
  ],
  detailsLabel: "화면 안내",
  detailsTitle: "화면에서 직접 확인할 수 있는 동작",
  details: [
    { title: "한 자씩 나타나는 큰 제목", body: "메인 첫 화면의 큰 제목은 글자가 한 자씩 차례로 나타납니다." },
    { title: "제품 정보 묶음", body: "인증서류 목록, 기술 자료, 제품 관리 동영상, 시공 사례, 제품 사진, 제품 자료집을 같은 하위 메뉴로 오갑니다." },
    { title: "온라인 상점 목록", body: "창호 · 도어 · 잠금 장치 · 부속품을 분류 탭으로 골라 보는 상품 목록이 있습니다." },
    { title: "사진 첨부 문의", body: "문의 칸에서 파일 추가 단추로 현장 사진을 여러 장 붙일 수 있습니다." },
  ],
  mobile: {
    title: "휴대폰에서도 제품과 문의를 바로",
    body: "390px 폭에서는 메뉴가 줄 단추 하나로 접히고, 제품 카드와 문의 칸이 화면 폭에 맞춰 세로로 놓입니다.",
    shots: [
      { img: "/cases/woosung/m-index.webp", caption: "메인" },
      { img: "/cases/woosung/m-about-intro.webp", caption: "회사 소개" },
      { img: "/cases/woosung/m-windows-overview.webp", caption: "창호 종류" },
      { img: "/cases/woosung/m-online-inquiry.webp", caption: "온라인 문의" },
    ],
  },
  faq: [
    { q: "제품 종류를 우리 회사 제품으로 바꿀 수 있나요?", a: "네. 제품 이름, 사진, 규격 표와 자료집 파일을 판매하는 제품에 맞춰 바꿉니다." },
    { q: "시공 사례를 직접 올릴 수 있나요?", a: "시공 사례는 게시판 형태라 사진과 글을 추가해 늘릴 수 있습니다. 관리 화면 연결은 제작할 때 정합니다." },
    { q: "문의를 보내면 바로 접수되나요?", a: "지금은 문의를 보내면 전화 안내 문구가 나옵니다. 온라인 접수를 받으려면 접수 기능을 따로 연결합니다." },
  ],
};

export default study;
