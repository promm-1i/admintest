import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "솔샘건설",
  headline: "토목 · 건축 · 주택 시공 건설회사 홈페이지",
  summary: "토목 · 건축 · 주택 · 플랜트 · 클린룸 · 소방 사업 소개와 시공실적, 회사 소식, 공사 견적 문의를 갖춘 건설회사 홈페이지입니다.",
  brandColor: "#0460d9",
  tintColor: "#f7f9fc",
  overview:
    "솔샘건설의 메인은 건물 사진 세 장이 넘어가는 첫 화면으로 시작합니다. 아래로 내리면 사업 분야 사진이 화면 가득 커지고, 이어서 토목 · 건축 · 주택 · 플랜트 · 클린룸 · 소방 · 기타 사업 카드가 옆으로 흘러갑니다. 그 다음에 시공 사례 슬라이드, 공지 한 줄과 현장 사진이 있는 소식 구역, 채용공고 · 견적문의 바로가기가 놓입니다.\n\n회사소개 메뉴에는 회사개요, CEO 인사말, 연혁, 조직도, 찾아오시는 길이 있고, 조직도는 대표이사 아래 본부와 토목 · 건축 · 소방 · 경영지원 부서를 카드로 나눠 보여 줍니다.\n\n홍보센터의 시공실적은 사업 갈래와 검색어로 고르는 사진 카드 목록이고, 카드를 누르면 사진과 주용도 · 공사명 · 발주처 · 연면적이 담긴 상세 창이 열립니다. 커뮤니티에는 공지사항과 공사 견적문의 양식이 있습니다.",
  meta: [
    { label: "업종", value: "토목 · 건축 · 주택 · 플랜트 시공" },
    { label: "페이지 구성", value: "메인 · 회사소개 · 사업영역 · 홍보센터 · 커뮤니티" },
    { label: "이런 곳에 맞습니다", value: "사업 분야가 여러 갈래이고 시공실적을 사진과 함께 보여 줘야 하는 건설회사" },
  ],
  mainShot: "/cases/solsaem/main.webp",
  pagesLabel: "페이지 구성",
  pagesTitle: "회사 소개부터 사업 분야, 시공실적, 견적 문의까지",
  pages: [
    { name: "메인", file: "index.html", img: "/cases/solsaem/page-index.webp", desc: "건물 사진 세 장이 넘어가는 첫 화면 아래로 사업 분야 소개가 이어지고, 스크롤하면 사진이 화면 가득 커집니다.", items: ["첫 화면 슬라이드", "사업 분야 소개", "스크롤 따라 커지는 사진"] },
    { name: "회사개요", file: "company-overview.html", img: "/cases/solsaem/page-company-overview.webp", desc: "회사 소개 글과 현장 사진, 회사명 · 설립일 · 대표 · 사업 분야 · 연락처를 칸으로 나눈 회사 정보 표가 있습니다.", items: ["회사 소개 글", "회사 정보 칸", "영문 상호 띠"] },
    { name: "사업영역", file: "business.html", img: "/cases/solsaem/page-business.webp", desc: "토목 · 건축 · 주택 · 플랜트 · 클린룸 · 소방 · 기타 사업을 탭으로 나누고, 사업마다 사진과 설명, 주요 공사 목록을 붙였습니다.", items: ["사업 갈래 탭", "사업별 사진", "주요 공사 목록"] },
    { name: "시공실적", file: "projects.html", img: "/cases/solsaem/page-projects.webp", desc: "사업 갈래와 검색어로 고르는 세 줄 사진 카드 목록입니다. 카드마다 사업 갈래, 공사 이름, 주용도 · 발주처가 적혀 있습니다.", items: ["사업 갈래 고르기", "검색", "사진 카드"] },
    { name: "공지사항", file: "notices.html", img: "/cases/solsaem/page-notices.webp", desc: "전체 건수와 쪽 정보, 검색 조건 · 검색어 칸, 번호 · 제목 · 작성일 · 조회수 목록과 쪽 번호가 있는 게시판입니다.", items: ["검색 조건", "목록", "쪽 번호"] },
    { name: "공사견적문의", file: "inquiry.html", img: "/cases/solsaem/page-inquiry.webp", desc: "개인정보 수집 · 이용 안내를 읽고 동의한 뒤 회사명, 이름, 이메일, 연락처, 제목, 내용을 적어 보내는 양식입니다.", items: ["개인정보 안내", "이메일 주소 고르기", "연락처 세 칸"] },
  ],
  points: [
    { title: "메뉴에 올리면 하위 메뉴가 한꺼번에 펼쳐집니다", body: "윗 메뉴에 마우스를 올리면 머리글이 흰 판으로 바뀌고 회사소개 · 사업영역 · 홍보센터 · 커뮤니티의 하위 메뉴가 한 번에 보입니다.", items: ["흰 판 메뉴", "갈래별 하위 메뉴", "지금 메뉴 파란색"], img: "/cases/solsaem/point-menu.webp", caption: "전체 메뉴" },
    { title: "첫 화면 사진이 장마다 바뀝니다", body: "첫 화면은 업무시설 · 공동주택 · 플랜트 사진 세 장이 차례로 넘어가고, 장마다 소개 문장이 바뀝니다.", items: ["사진 세 장", "장별 소개 문장", "넘기기 단추"], img: "/cases/solsaem/point-slider.webp", caption: "첫 화면 슬라이드" },
    { title: "시공실적 카드를 누르면 상세 창이 열립니다", body: "시공실적 카드를 누르면 공사 사진과 주용도 · 공사명 · 발주처 · 연면적이 담긴 창이 뜨고, 닫기 단추나 바깥을 눌러 닫습니다.", items: ["공사 사진", "공사 정보 네 가지", "닫기"], img: "/cases/solsaem/point-project.webp", caption: "시공실적 상세" },
    { title: "견적 문의를 보내면 전화 안내가 나옵니다", body: "공사 견적문의 양식을 채우고 문의하기를 누르면 양식 아래에 전화 문의 안내 문구가 나타납니다.", items: ["필수 칸 확인", "안내 문구", "대표 전화"], img: "/cases/solsaem/point-inquiry.webp", caption: "공사 견적문의" },
  ],
  detailsLabel: "화면 안내",
  detailsTitle: "화면에서 직접 확인할 수 있는 동작",
  details: [
    { title: "옆으로 흐르는 사업 카드", body: "메인 가운데에서 아래로 내리면 토목사업부터 기타사업까지 번호가 붙은 사업 카드가 옆으로 넘어갑니다." },
    { title: "조직도 카드", body: "조직도는 대표이사 원, 개발본부 · 전략기획본부, 사업본부장 아래 부서 카드 네 장과 하위 팀 칸으로 이루어져 있습니다." },
    { title: "경로 고르기", body: "하위 쪽 제목 아래 경로 줄에서 갈래와 쪽을 펼쳐 골라 바로 옮겨 갑니다." },
    { title: "오른쪽 빠른 메뉴", body: "화면 오른쪽에 문의 · 회사소개서 · 견적문의 바로가기와 위 · 아래로 이동 단추가 늘 떠 있습니다." },
  ],
  mobile: {
    title: "휴대폰에서는 메뉴 단추와 한 줄 카드로",
    body: "390px 폭에서는 윗 메뉴가 메뉴 단추로 바뀌고, 사업 소개와 시공실적 카드, 문의 양식이 한 줄씩 놓입니다.",
    shots: [
      { img: "/cases/solsaem/m-index.webp", caption: "메인" },
      { img: "/cases/solsaem/m-business.webp", caption: "사업영역" },
      { img: "/cases/solsaem/m-projects.webp", caption: "시공실적" },
      { img: "/cases/solsaem/m-inquiry.webp", caption: "공사견적문의" },
    ],
  },
  faq: [
    { q: "시공실적은 직접 늘릴 수 있나요?", a: "네. 시공실적 카드는 같은 틀이라 사진과 공사 정보를 넣어 카드를 더하거나 뺄 수 있습니다." },
    { q: "사업 분야가 이보다 적으면 어떻게 하나요?", a: "사업영역 탭과 메인의 사업 카드는 갈래 수에 맞춰 줄일 수 있습니다." },
    { q: "견적 문의를 보내면 바로 접수되나요?", a: "지금은 문의를 보내면 전화 안내 문구가 나옵니다. 온라인 접수를 받으려면 접수 기능을 따로 연결합니다." },
  ],
};

export default study;
