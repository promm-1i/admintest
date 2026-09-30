import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "누빛광학",
  headline: "정밀 광학 · 방산 부품 제조기업 홈페이지",
  summary:
    "검은 바탕에 보라 빛줄기가 흐르는 정밀 광학 기업 홈페이지입니다. 메인 한 쪽에 회사소개 8 · 사업 7 · 제품 5 · 연구개발 3 · ESG 6 · 홍보·IR 5 · 채용 4, 모두 39쪽으로 구성했습니다.",
  brandColor: "rgb(106,76,240)",
  tintColor: "rgb(22,20,44)",
  mobileDark: true,
  overview:
    "누빛광학은 우주 · 방산 · 산업 · 과학 분야에 렌즈와 광학 모듈을 납품하는 정밀 광학 제조기업을 가정하고 만든 디자인입니다. 사이트 전체가 짙은 남색 바탕이고 강조색은 보라입니다. 연혁 · 인사제도 · 복리후생 쪽만 흰 바탕입니다.\n\n메인은 첫 화면 영상 위에 영문 슬로건, 회사 소개 영상, 제목이 화면에 붙은 채 사진 카드 4장이 엇갈려 내려가는 사업 분야, 번호 · 아이콘 · 설명이 한 줄씩 놓인 강점 4가지, 연구개발 · ESG · 보도자료 · 채용으로 이어집니다. 제품은 4분류 17세부 항목을 한 데이터에서 목록 · 상세 · 검색으로 그리고, 제품 문의는 6칸 폼으로 받습니다.\n\n연혁은 시대마다 배경 사진이 바뀌고, 윤리규범은 조항을 펼쳐 읽고, 인증서는 더보기로 늘리고 눌러서 크게 봅니다. 채용은 직무 카드를 누르면 담당 업무 · 자격 요건 · 지원 메일이 창으로 뜹니다.",
  meta: [
    { label: "업종", value: "정밀 광학 · 방산 · 산업용 광학 부품 제조" },
    { label: "페이지 구성", value: "39쪽 · 메인, 회사소개 8, 사업 7, 제품 5, 연구개발 3, ESG 6, 홍보·IR 5, 채용 4" },
    { label: "이런 곳에 맞습니다", value: "광학 · 정밀기계 · 방산 협력사, 제품 종류가 많은 부품 제조기업, 연구소 · 인증을 함께 보여줄 회사" },
  ],
  mainShot: "/cases/corporate-i/main.webp",
  capabilities: {
    label: "39-PAGE OPTICS PLATFORM",
    title: "사업·제품·연구·ESG까지 39개 화면",
    body: "메인 뒤로 사업 분야 7쪽, 제품 목록 · 상세 · 검색 · 문의, 연구개발과 인증, ESG 6쪽, 홍보 · IR, 채용 쪽이 이어집니다.",
    stats: [
      { value: "39", label: "화면 수", note: "메인과 목록·상세·검색 포함" },
      { value: "7", label: "사업 분야", note: "우주·방산·산업·과학 광학" },
      { value: "17", label: "제품 세부 분류", note: "4개 대분류 안에서 탐색" },
      { value: "6", label: "ESG 화면", note: "안전·사회·윤리·인권·공정거래" },
    ],
    groups: [
      { label: "사업 7분야", title: "우주 · 방산 · 산업 · 과학 사업 일곱 쪽", body: "분야마다 대표 사진과 소개 글, 적용 제품 여섯 가지 사진 격자, 관련 제품 링크가 있습니다.", items: ["사업 분야 7개 독립 화면", "적용 제품과 산업 이미지", "사업에서 제품 목록으로 연결"], img: "/cases/corporate-i/page-space.webp", caption: "사업 분야 · 우주 광학", file: "space.html" },
      { label: "제품 탐색", title: "제품군 4개와 세부 분류 17개 탭", body: "분류 탭과 세부 탭으로 고르면 아래 격자에 제품이 페이지 번호와 함께 나옵니다.", items: ["대분류 4개·세부 분류 17개", "제품 카드와 핵심 사양", "검색·상세·문의 동선"], img: "/cases/corporate-i/page-products.webp", caption: "제품 · 분류형 목록", file: "products.html?cate=1" },
      { label: "제품 상세", title: "제품 사진 · 사양표 · 설명 · 문의 버튼", body: "제품 사진과 소개 아래로 사양 표와 설명 칸이 이어지고, 끝에 목록으로 · 문의하기 버튼이 있습니다.", items: ["제품 이미지와 핵심 소개", "상세 사양 표", "목록 복귀와 제품 문의"], img: "/cases/corporate-i/page-product-view.webp", caption: "제품 · 상세와 사양", file: "product-view.html?cate=1&cate2=001&idx=226" },
      { label: "R&D·인증", title: "연구소 · 연구개발 성과 · 인증과 특허", body: "연구소, 연구개발 성과, 인증 · 특허를 각각 쪽으로 나눴고, 인증서는 더보기로 늘리고 누르면 크게 봅니다.", items: ["연구소·R&D 성과 화면", "인증·특허 15장 더보기", "인증서 확대 보기"], img: "/cases/corporate-i/page-patents.webp", caption: "R&D · 인증 및 특허", file: "patents.html" },
      { label: "ESG 6화면", title: "ESG 전략부터 윤리규범 · 인권 · 안전까지 여섯 쪽", body: "정책 도식과 가이드라인 목록, 사회공헌 갤러리, 펼쳐 읽는 윤리규범 조항이 있습니다.", items: ["ESG 전략과 정책 자료", "사회공헌·안전보건·인권", "윤리규범 펼침 목록"], img: "/cases/corporate-i/page-esg.webp", caption: "ESG · 정책과 활동", file: "esg.html" },
      { label: "홍보·채용", title: "보도자료 · 미디어 · IR과 채용", body: "보도자료는 목록과 상세, 미디어는 누르면 영상 창, 채용은 직무 카드를 누르면 모집 요강 창이 뜹니다.", items: ["보도자료 목록·상세", "영상 팝업과 브로슈어", "직무 카드·지원 안내"], img: "/cases/corporate-i/page-press.webp", caption: "홍보 · 보도자료 아카이브", file: "press.html" },
    ],
  },
  pagesLabel: "페이지",
  pagesTitle: "39쪽이 어떻게 이어지는지",
  pages: [
    {
      name: "홈",
      file: "index.html",
      img: "/cases/corporate-i/page-index.webp",
      desc: "첫 화면 영상과 영문 슬로건 아래로 회사 소개 · 사업 분야 · 강점 · 연구개발 · ESG · 보도자료 · 채용이 차례로 내려갑니다.",
      items: ["첫 화면 영상 · 영문 슬로건 · 한 줄 소개", "회사 소개 영상 · 더보기", "사업 분야 4장 · 사진 카드 엇갈림 · 제목은 화면에 붙어 따라옴", "강점 4가지 · 번호 · 아이콘 · 설명", "연구개발 3 링크 · ESG 3장 · 보도자료 슬라이더 · 채용 배너"],
    },
    {
      name: "기업개요",
      file: "about.html",
      img: "/cases/corporate-i/page-about.webp",
      desc: "회사 소개 글과 사진, 기업정보 4칸으로 이루어진 회사소개 첫 쪽입니다. CEO 인사말 · 조직도 · 비전 · CI · 관계사 · 오시는 길이 같은 틀입니다.",
      items: ["회사 소개 · 영문 제목 · 사진", "기업정보 카드 4장 (회사명 · 대표 · 설립일)", "오시는 길은 구글 지도 삽입"],
    },
    {
      name: "연혁",
      file: "history.html",
      img: "/cases/corporate-i/page-history.webp",
      desc: "세 시대로 나눈 연혁이 내려갈 때마다 배경 사진이 바뀝니다.",
      items: ["시대 3구간 · 구간마다 배경 사진", "연도 · 월 · 사건 목록"],
    },
    {
      name: "사업 분야",
      file: "space.html",
      img: "/cases/corporate-i/page-space.webp",
      desc: "Space · Defense(항공 · 지상 · 해양) · Industrial(레이저 가공 · 비전 검사) · Scientific 7쪽이 같은 틀입니다.",
      items: ["분야 대표 사진 · 소개 글", "적용 제품 6항목 · 사진 격자", "분야 배너 · 관련 제품 링크"],
    },
    {
      name: "제품 목록",
      file: "products.html?cate=1",
      img: "/cases/corporate-i/page-products.webp",
      desc: "4분류 17세부 항목을 위쪽 탭으로 고르고, 아래 격자에 제품이 페이지 번호와 함께 나옵니다.",
      items: ["분류 탭 4 · 세부 탭 17", "제품 격자 · 제품명 · 한 줄 사양", "페이지 번호 · 현재/전체 표시"],
    },
    {
      name: "제품 상세",
      file: "product-view.html?cate=1&cate2=001&idx=226",
      img: "/cases/corporate-i/page-product-view.webp",
      desc: "제품 사진과 소개, 사양 표, 아래로 이어지는 설명 칸입니다.",
      items: ["세부 분류 탭 · 제품 사진 · 소개", "사양 표", "설명 칸 · 목록으로 · 문의하기"],
    },
    {
      name: "인증 및 특허",
      file: "patents.html",
      img: "/cases/corporate-i/page-patents.webp",
      desc: "인증서와 특허를 격자로 늘어놓고 더보기로 늘리며, 누르면 크게 봅니다.",
      items: ["인증 · 특허 격자 8장 → 더보기 15장", "누르면 크게 보기 창"],
    },
    {
      name: "ESG 경영",
      file: "esg.html",
      img: "/cases/corporate-i/page-esg.webp",
      desc: "ESG 정책 도식과 정책 · 가이드라인 목록, 안전보건 · 사회공헌 · 윤리규범 · 인권경영 · 공정거래로 이어집니다.",
      items: ["ESG 도식 · 정책 3분야", "정책 · 가이드라인 목록 · 더보기", "사회공헌 갤러리 · 윤리규범 펼침 목록"],
    },
    {
      name: "보도자료",
      file: "press.html",
      img: "/cases/corporate-i/page-press.webp",
      desc: "사진 목록형 보도자료와 상세, 영상 팝업이 뜨는 미디어, 브로슈어, IR 공고가 같은 게시판 틀입니다.",
      items: ["보도자료 목록 · 상세 · 이전/다음", "미디어 · 누르면 영상 창", "브로슈어 카드 · IR 공고 목록 · 페이지 번호"],
    },
    {
      name: "상시채용",
      file: "recruit.html",
      img: "/cases/corporate-i/page-recruit.webp",
      desc: "직무 카드 8장을 누르면 담당 업무 · 자격 요건 · 지원 메일이 창으로 뜹니다. 인재상 · 인사제도 · 복리후생이 앞에 있습니다.",
      items: ["채용 슬로건 배너", "직무 카드 8장 · 자세히 보기", "모집 요강 창 · 담당 업무 · 자격 요건 · 지원 메일"],
    },
  ],
  points: [
    {
      title: "사업 분야 4장은\n제목이 화면에 붙어 따라옵니다",
      body: "메인의 Business 구역은 왼쪽 제목이 화면에 붙어 있고, 오른쪽으로 Space · Defense · Industrial · Scientific 사진 카드 4장이 두 줄로 엇갈려 내려갑니다. 카드마다 분야 이름과 한 줄 설명이 붙고, 누르면 각 사업 쪽으로 이동합니다. 넓은 화면에서만 제목이 붙고, 태블릿 · 휴대폰에서는 위아래로 쌓입니다.",
      items: ["제목 고정 · 사진 카드 4장이 두 줄로 엇갈려 지나감", "카드마다 분야 이름 · 한 줄 설명", "누르면 해당 사업 쪽으로"],
      img: "/cases/corporate-i/point-biz.webp",
      caption: "홈 · 사업 분야",
    },
    {
      title: "제품은 4분류 17세부\n탭과 페이지 번호로",
      body: "제품 목록은 Sub-System · Optical Module · Lens Assembly · Optical Components 네 분류 탭과, 분류마다 달라지는 세부 탭(모두 17개)으로 고릅니다. 아래 격자에는 제품 사진 · 이름 · 한 줄 사양이 놓이고, 많으면 페이지 번호로 나뉩니다. 휴대폰에서는 탭을 옆으로 밀어 고르고, 고른 탭이 가운데로 옵니다.",
      items: ["분류 탭 4 · 세부 탭 17", "제품 격자 · 사진 · 이름 · 한 줄 사양", "페이지 번호 · 현재/전체 표시"],
      img: "/cases/corporate-i/point-products.webp",
      caption: "제품 · 목록",
    },
    {
      title: "제품 상세는\n사진 · 소개 · 사양 표",
      body: "제품을 누르면 세부 분류 탭 아래에 제품 사진과 이름 · 소개 글이 놓이고, 그 아래 사양 표와 설명 칸이 이어집니다. 끝에는 목록으로 · 문의하기 버튼이 있습니다. 통합검색 쪽에서 제품명을 검색해도 같은 상세로 들어갑니다.",
      items: ["세부 분류 탭 · 제품 사진 · 이름 · 소개", "사양 표 · 설명 칸", "목록으로 · 문의하기 · 통합검색"],
      img: "/cases/corporate-i/point-product-view.webp",
      caption: "제품 · 상세",
    },
    {
      title: "채용은 직무 카드,\n누르면 모집 요강 창",
      body: "상시채용 쪽은 슬로건 배너 아래에 펌웨어 설계 · 회로설계 · 기구설계 · 광학설계 · 생산기술 · 조립 · 품질 QA · 품질 QC 직무 카드 8장이 사진과 함께 놓입니다. 카드를 누르면 담당 업무 · 자격 요건이 정리된 창이 뜨고, 지원 메일 버튼을 누르면 메일 앱이 열립니다. 인재상 · 인사제도 · 복리후생까지 채용 묶음이 4쪽입니다.",
      items: ["직무 카드 8장 · 사진 · 자세히 보기", "모집 요강 창 · 담당 업무 · 자격 요건", "지원 메일 버튼 · 메일 앱 열기"],
      img: "/cases/corporate-i/point-recruit.webp",
      caption: "채용 · 상시채용",
    },
  ],
  detailsLabel: "자세히",
  detailsTitle: "만들 때 신경 쓴 것",
  details: [
    {
      title: "밝은 쪽과 어두운 쪽",
      body: "사이트 전체는 짙은 남색 바탕이고, 사진이 밝은 연혁 · 인사제도 · 복리후생 쪽만 흰 바탕입니다.",
    },
    {
      title: "제품은 한 곳에서 관리",
      body: "4분류 17세부 제품이 한 데이터에 모여 있어 목록 · 상세 · 검색이 같은 내용을 보여 줍니다. 제품을 더하거나 빼면 세 곳에 함께 반영됩니다.",
    },
    {
      title: "문의 폼과 약관 창",
      body: "제품 문의는 회사명 · 담당자 · 전화 · 이메일 · 내용 · 개인정보 동의 6칸입니다. 꼬리의 이용약관 · 이메일 무단수집 거부 · 개인정보처리방침은 쪽을 옮기지 않고 창으로 뜹니다.",
    },
    {
      title: "키보드로도 다닐 수 있게",
      body: "서른아홉 쪽 모두 맨 앞에 '본문 바로가기' 링크를 두어, 키보드로 메뉴를 건너뛰고 본문으로 바로 들어갈 수 있습니다.",
    },
  ],
  mobile: {
    title: "좁은 화면에서는 이렇게 됩니다",
    body: "어두운 화면은 그대로 두고 세로로 쌓습니다. 첫 화면 영상과 슬로건은 그대로이고, 사업 분야 4가지와 강점 4가지는 한 줄씩 내려갑니다. 제품 목록의 분류 탭은 옆으로 밀어서 고르고, 직무 카드는 한 줄씩 커지며 모집 요강 창은 화면을 채웁니다.",
    shots: [
      { img: "/cases/corporate-i/m-index.webp", caption: "홈" },
      { img: "/cases/corporate-i/m-products.webp", caption: "제품 목록 — 탭은 옆으로" },
      { img: "/cases/corporate-i/m-esg.webp", caption: "ESG 경영" },
      { img: "/cases/corporate-i/m-recruit.webp", caption: "상시채용" },
    ],
  },
  faq: [
    {
      q: "제품이 수백 개면 어떻게 올리나요?",
      a: "제작할 때 관리자 화면에서 분류 · 세부 분류 · 제품 사진 · 사양을 등록하면 목록 · 상세 · 검색에 함께 반영되게 만듭니다.",
    },
    {
      q: "39쪽이 너무 많은데 줄일 수 있나요?",
      a: "네. 회사소개 · 사업 · 제품 · 채용처럼 묶음 단위로 빼거나 합칠 수 있습니다. 사업 분야 7쪽은 같은 틀이라 분야 수만큼만 두면 됩니다.",
    },
    {
      q: "영문 사이트도 되나요?",
      a: "머리글에 EN 버튼 자리가 있습니다. 제작할 때 영문 문구를 받아 같은 틀로 영문 쪽을 만들고 버튼을 연결합니다.",
    },
    {
      q: "인증서 · 특허 이미지는 어떻게 넣나요?",
      a: "인증서 스캔본을 주시면 격자와 크게 보기 창에 넣습니다. 지금 화면의 인증서는 자리 표시이고, 실제 문서로 바뀝니다.",
    },
    {
      q: "문의 폼과 채용 지원은 어디로 오나요?",
      a: "제품 문의는 지정한 메일로 받아 보시게 연결하고, 관리자 화면에 쌓아 두는 방식도 가능합니다. 채용 지원 메일 버튼은 회사 채용 메일 주소로 바꿔 넣습니다.",
    },
    {
      q: "누빛광학은 실제 회사인가요?",
      a: "아닙니다. 디자인을 보여 드리려고 만든 가상 제조기업입니다. 제품 · 연혁 · 인증서와 사진도 새로 만든 것이며, 첫 화면 영상과 제품 사진을 주시면 그대로 바꿔 넣습니다.",
    },
  ],
};

export default study;
