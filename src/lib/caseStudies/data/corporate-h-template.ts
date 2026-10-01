import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "하이온셀",
  headline: "배터리 제조기업 홈페이지",
  summary:
    "흰 바탕에 파랑 · 보라를 쓴 배터리 제조기업 홈페이지입니다. 첫 화면 영상 위에 영문 슬로건이 놓이고, 메인 한 쪽에 회사소개 5 · 제품 3 · 인재 2 · 고객지원 4 · 뉴스룸 2, 모두 17쪽으로 구성했습니다.",
  brandColor: "rgb(79,109,245)",
  tintColor: "rgb(232,238,255)",
  overview:
    "하이온셀은 원통형 · 파우치형 셀부터 모듈 · 팩까지 직접 만드는 배터리 제조기업을 가정하고 만든 디자인입니다. 흰 바탕에 파랑과 보라를 강조색으로 쓰고, 사진은 셀 · 생산 라인 · 전기차 · ESS 위주로 골랐습니다.\n\n메인은 24초 영상 위에 영문 슬로건이 놓인 첫 화면, 전기차 · 전기 운반차 · ESS 같은 산업별 솔루션, 원통형 · 파우치형 폼팩터, 소재(NCM) 소개, 생산 거점 영상, 차세대 기술, 뉴스룸 4건으로 이어집니다. 서브 쪽은 맨 위 가로 영상 배너 아래로 본문이 내려가고, 회사개요 · 비전 · 연혁 · CI · 사업장이 소개 묶음, 산업별 솔루션 · 원통형 · 소재가 제품 묶음입니다.\n\n스크롤을 내리면 요소가 화면 90% 선을 넘는 순간부터 떠오르고, 원통형 쪽처럼 긴 제품 쪽은 왼쪽에 항목 메뉴가 붙어 따라옵니다. 문의하기는 첨부파일까지 받는 10칸 폼, 다운로드 · FAQ는 분류 탭과 검색이 있습니다.",
  meta: [
    { label: "업종", value: "배터리 · 전지 · 에너지 저장 장치 제조" },
    { label: "페이지 구성", value: "17쪽 · 메인, 회사개요 · 비전 · 연혁 · CI · 사업장, 산업별 솔루션 · 원통형 · 소재, 인재상 · 채용정보, 다운로드 · 문의 · FAQ · 개인정보, 뉴스룸 · 뉴스 상세" },
    { label: "이런 곳에 맞습니다", value: "배터리 · 전자부품 · 소재 제조기업, 생산 거점이 여러 곳인 회사, 산업별로 제품을 나눠 보여줄 회사" },
  ],
  mainShot: "/cases/corporate-h/main.webp",
  capabilities: {
    label: "17-PAGE BATTERY BUSINESS SYSTEM",
    title: "산업별 솔루션·제품·사업장·문의까지 17개 화면",
    body: "메인 뒤로 산업별 솔루션, 원통형 셀 · 소재 상세, 사업장 6곳, 자료 · FAQ · 문의 폼, 뉴스룸과 채용 쪽이 이어집니다.",
    stats: [
      { value: "17", label: "화면 수", note: "회사·제품·인재·지원·뉴스" },
      { value: "5", label: "산업 솔루션", note: "산업 탭과 폼팩터 연결" },
      { value: "6", label: "사업장", note: "본사·연구소·공장·해외법인" },
      { value: "10", label: "문의 입력 항목", note: "첨부파일 포함 사업 문의" },
    ],
    groups: [
      { label: "산업별 솔루션", title: "산업 탭 다섯 개와 셀·모듈·팩", body: "전기차 · 전기 운반차 · ESS 같은 산업을 탭으로 고르고, 아래로 폼팩터와 주요 수주 이력이 이어집니다.", items: ["산업 솔루션 탭 5개", "셀·모듈·팩 폼팩터", "산업별 주요 수주 이력"], img: "/cases/corporate-h/page-solution.webp", caption: "제품 · 산업별 솔루션", file: "solution.html" },
      { label: "원통형 상세", title: "핵심 경쟁력부터 수주 이력까지 다섯 구역", body: "긴 한 쪽에 다섯 구역이 이어지고, 왼쪽 항목 메뉴가 화면에 붙어 지금 보는 구역을 표시합니다.", items: ["고정 항목 메뉴 5개", "21~46mm 셀 규격", "산업 적용·생산지역·수주"], img: "/cases/corporate-h/page-cylindrical.webp", caption: "제품 · 원통형 셀", file: "cylindrical.html" },
      { label: "배터리 소재", title: "NCM 소재 쪽", body: "니켈 · 코발트 · 망간 세 가지 특장점과 산업별 솔루션, 생산 지역을 적었습니다.", items: ["NCM 구성 원소 3개", "소재별 특장점", "산업 적용과 생산지역"], img: "/cases/corporate-h/page-material.webp", caption: "기술 · 배터리 소재", file: "material.html" },
      { label: "글로벌 생산망", title: "지역 탭과 지도로 보는 사업장 여섯 곳", body: "본사 · 연구소 · 공장과 해외 법인을 지역 탭으로 거르고, 목록에서 고르면 주소와 전화가 펼쳐집니다.", items: ["사업장 6곳", "전체·한국·아시아·유럽 탭", "거점 목록과 지도"], img: "/cases/corporate-h/page-network.webp", caption: "기업 · 글로벌 사업장", file: "network.html" },
      { label: "자료·FAQ·문의", title: "자료 검색 · FAQ · 첨부파일 문의", body: "자료와 FAQ는 분류 탭과 검색으로 찾고, 문의는 첨부파일까지 받는 열 칸 폼으로 보냅니다.", items: ["자료 분류와 검색", "FAQ 분류 탭·펼침", "10개 항목 문의·첨부파일"], img: "/cases/corporate-h/page-inquiry.webp", caption: "고객지원 · 문의하기", file: "inquiry.html" },
      { label: "뉴스·채용", title: "뉴스룸 목록 · 상세와 채용정보", body: "뉴스는 검색이 되는 목록과 상세 쪽으로, 채용은 인재상 · 절차 4단계 · 자주 묻는 질문으로 나눴습니다.", items: ["뉴스 목록·상세와 검색", "인재상·채용 절차 4단계", "채용 FAQ 펼침"], img: "/cases/corporate-h/page-newsroom.webp", caption: "미디어 · 뉴스룸", file: "newsroom.html" },
    ],
  },
  pagesLabel: "페이지",
  pagesTitle: "17쪽이 어떻게 이어지는지",
  pages: [
    {
      name: "홈",
      file: "index.html",
      img: "/cases/corporate-h/page-index.webp",
      desc: "24초 영상 위 영문 슬로건 아래로 산업별 솔루션 · 폼팩터 · 소재 · 생산 거점 · 차세대 기술 · 뉴스룸이 내려갑니다.",
      items: ["첫 화면 영상 · POWERING EVERY TOMORROW", "Our Solution · 산업별 솔루션 · 고객지원 두 갈래", "폼팩터 · 원통형 · 파우치형", "소재 NCM · LFP · 생산 거점 영상 · 차세대 기술", "뉴스룸 4건 · 뉴스룸 바로가기"],
    },
    {
      name: "회사개요",
      file: "about.html",
      img: "/cases/corporate-h/page-about.webp",
      desc: "회사 소개와 사업영역 4가지, 폼팩터, 서비스 소개가 한 쪽에 이어집니다. 비전 · CI 쪽이 같은 틀입니다.",
      items: ["영상 배너 · 회사개요", "사업영역 4 · EV 배터리팩 · 소형 셀 · ESS 모듈 · 진단 서비스", "폼팩터 · 서비스 소개"],
    },
    {
      name: "연혁",
      file: "history.html",
      img: "/cases/corporate-h/page-history.webp",
      desc: "연도 구간 4개를 탭으로 고르면 그 시기의 사건 17건이 사진과 함께 바뀝니다.",
      items: ["구간 탭 4 · 2007~2013부터", "사건 목록 · 사진"],
    },
    {
      name: "산업별 솔루션",
      file: "solution.html",
      img: "/cases/corporate-h/page-solution.webp",
      desc: "전기차 · 전기 운반차 등 산업을 탭으로 고르고, 폼팩터와 주요 수주 이력이 이어집니다.",
      items: ["산업 탭 · 특징 5", "폼팩터 · 셀 · 모듈 · 팩", "주요 수주 이력 카드"],
    },
    {
      name: "원통형",
      file: "cylindrical.html",
      img: "/cases/corporate-h/page-cylindrical.webp",
      desc: "핵심 경쟁력 · 제품 경쟁력 · 산업별 솔루션 · 생산 지역 · 주요 수주 이력 다섯 구역이 긴 한 쪽에 있고 왼쪽 메뉴가 따라옵니다.",
      items: ["왼쪽 항목 메뉴 · 구역 5", "핵심 경쟁력 5 · 셀 규격 21~46mm", "생산 지역 · 수주 이력"],
    },
    {
      name: "소재 (NCM)",
      file: "material.html",
      img: "/cases/corporate-h/page-material.webp",
      desc: "NCM 배터리의 특장점(니켈 · 코발트 · 망간)과 산업별 솔루션, 생산 지역이 이어집니다.",
      items: ["특장점 3 · 니켈 · 코발트 · 망간", "산업별 솔루션 · 생산 지역"],
    },
    {
      name: "사업장",
      file: "network.html",
      img: "/cases/corporate-h/page-network.webp",
      desc: "본사 · 연구소 · 공장 2곳 · 해외 법인 2곳을 탭으로 고르고 구글 지도로 봅니다.",
      items: ["사업장 6곳 · 전체 · 한국 · 아시아 · 유럽 탭", "구글 지도 · 목록 · 주소 · 전화"],
    },
    {
      name: "뉴스룸",
      file: "newsroom.html",
      img: "/cases/corporate-h/page-newsroom.webp",
      desc: "사진 · 날짜 · 제목 · 요약이 한 줄씩 놓인 뉴스 목록과 검색, 상세 쪽입니다.",
      items: ["뉴스 목록 · 사진 · 날짜 · 요약", "총 건수 · 검색", "뉴스 상세 · 본문 · 목록으로"],
    },
    {
      name: "채용정보",
      file: "recruit.html",
      img: "/cases/corporate-h/page-recruit.webp",
      desc: "채용 절차 4단계를 보고 아래 자주 하는 질문을 펼쳐 봅니다. 인재상 쪽이 앞에 있습니다.",
      items: ["채용 절차 STEP 01~04 · 파란 띠", "단계별 설명 카드", "FAQ 펼침 목록"],
    },
    {
      name: "문의하기",
      file: "inquiry.html",
      img: "/cases/corporate-h/page-inquiry.webp",
      desc: "이름 · 회사 · 이메일 · 연락처 · 국가 · 제목 · 내용 · 첨부파일 · 동의 10칸 폼입니다. 다운로드 · FAQ 쪽에는 분류 탭과 검색이 있습니다.",
      items: ["문의 폼 10칸 · 첨부파일", "다운로드 · 분류 탭 4 · 검색", "FAQ · 분류 탭 6 · 검색"],
    },
  ],
  points: [
    {
      title: "Our Solution은\n사진 위로 두 갈래 카드가 떠오릅니다",
      body: "메인의 Our Solution 구역은 왼쪽에 '전동공구부터 ESS까지, 하이온셀 배터리는 곳곳에서 일합니다' 제목과 소개, 오른쪽에 셀 사진이 놓입니다. 스크롤을 내리면 사진 위로 산업별 솔루션 · 고객지원 두 갈래 카드가 떠오르고, 누르면 각 쪽으로 이어집니다. 산업별 솔루션 쪽은 산업 탭 아래로 특징 다섯 가지와 폼팩터, 수주 이력을 보여 줍니다.",
      items: ["제목 · 소개 · 셀 사진", "사진 위로 산업별 솔루션 · 고객지원 카드가 떠오름", "서브 쪽 · 산업 탭 · 특징 5 · 수주 이력"],
      img: "/cases/corporate-h/point-sol.webp",
      caption: "홈 · 산업별 솔루션",
    },
    {
      title: "폼팩터는 원통형 · 파우치형\n두 장을 나란히",
      body: "폼팩터 구역은 파랑 바탕의 원통형 배터리와 보라 바탕의 파우치형 배터리 두 장을 나란히 놓고, 각각 이름 · 한 줄 특징 · 설명 · 자세히 보기 버튼을 붙였습니다. 이어지는 소재 구역은 검은 바탕 위 빛나는 고리 그래픽 아래로 NCM · LFP 두 갈래 카드를 둡니다.",
      items: ["원통형(파랑) · 파우치형(보라) 2장", "이름 · 한 줄 특징 · 설명 · 자세히 보기", "소재 구역 · NCM · LFP 두 갈래"],
      img: "/cases/corporate-h/point-form.webp",
      caption: "홈 · 폼팩터",
    },
    {
      title: "원통형 쪽은 긴 한 쪽,\n왼쪽 메뉴가 따라옵니다",
      body: "원통형 쪽은 핵심 경쟁력 · 제품 경쟁력 · 산업별 솔루션 · 생산 지역 · 주요 수주 이력 다섯 구역이 한 쪽에 길게 이어지고, 왼쪽에 항목 메뉴가 붙어 지금 보는 구역을 표시합니다. 끝에는 카탈로그 내려받기와 문의하기 버튼이 나란히 붙습니다.",
      items: ["구역 5 · 왼쪽 항목 메뉴 고정", "핵심 경쟁력 5 · 아이콘 · 설명", "수주 이력 카드 · 카탈로그 · 문의하기"],
      img: "/cases/corporate-h/point-core.webp",
      caption: "원통형 · 핵심 경쟁력",
    },
    {
      title: "사업장 6곳은\n탭과 지도로",
      body: "사업장 쪽은 본사 · 기술연구소 · 국내 공장 두 곳 · 베트남 법인 · 유럽 법인 여섯 곳을 전체 · 한국 · 아시아 · 유럽 탭으로 나눠 봅니다. 왼쪽에 지도, 오른쪽에 사업장 목록이 있고, 목록에서 고르면 주소와 전화가 펼쳐집니다.",
      items: ["사업장 6곳 · 전체 · 한국 · 아시아 · 유럽 탭", "왼쪽 지도 · 오른쪽 목록", "고르면 주소 · 전화 펼침"],
      img: "/cases/corporate-h/point-network.webp",
      caption: "사업장",
    },
  ],
  detailsLabel: "자세히",
  detailsTitle: "만들 때 신경 쓴 것",
  details: [
    {
      title: "0.2~1.6MB로 줄인 영상",
      body: "메인 첫 화면과 생산 거점, 회사소개 · 제품 · 인재 묶음의 맨 위 배너가 영상입니다. 영상 파일은 하나에 0.2~1.6MB로 줄여 넣었습니다.",
    },
    {
      title: "연혁은 한 화면 안에서",
      body: "연혁은 네 구간 목록을 고르면 큰 연도 · 슬로건 · 둥근 사진 · 사건 설명이 함께 바뀝니다. 17년치 사건을 한 화면 높이 안에서 넘겨 봅니다.",
    },
    {
      title: "분류 탭과 검색",
      body: "자료 다운로드와 FAQ는 분류 탭과 검색 칸으로 찾고, 뉴스룸도 검색이 됩니다. 자주 하는 질문은 눌러서 펼칩니다.",
    },
    {
      title: "빠진 칸을 알려 주는 문의 폼",
      body: "문의는 이름 · 회사명 · 이메일 · 연락처 · 국가 · 제목 · 내용 · 첨부파일을 받고, 개인정보 동의는 필수 · 마케팅 동의는 선택으로 나눴습니다. 필수 칸을 비우면 보내지지 않습니다.",
    },
  ],
  mobile: {
    title: "좁은 화면에서는 이렇게 됩니다",
    body: "첫 화면 영상과 슬로건은 그대로 두고, 산업별 솔루션 항목은 옆으로 밀어서 고릅니다. 원통형 쪽의 왼쪽 메뉴는 사라지고 구역이 세로로 이어지며, 뉴스 목록은 사진 위에 제목이 놓이는 카드가 됩니다.",
    shots: [
      { img: "/cases/corporate-h/m-index.webp", caption: "홈" },
      { img: "/cases/corporate-h/m-solution.webp", caption: "산업별 솔루션 — 옆으로 밀기" },
      { img: "/cases/corporate-h/m-cylindrical.webp", caption: "원통형" },
      { img: "/cases/corporate-h/m-newsroom.webp", caption: "뉴스룸" },
    ],
  },
  faq: [
    {
      q: "제품 종류가 더 많으면 어떻게 하나요?",
      a: "원통형 쪽과 같은 틀로 파우치형 · 각형 쪽을 더하고, 메인 폼팩터 구역과 메뉴에 함께 넣습니다. 산업별 솔루션의 산업 탭도 개수만큼 늘릴 수 있습니다.",
    },
    {
      q: "뉴스룸 · 다운로드 · FAQ 글은 어떻게 올리나요?",
      a: "제작할 때 관리자 화면을 붙여 뉴스 · 자료 파일 · FAQ를 직접 올리고 분류를 고르게 만듭니다. 지금 화면의 목록은 예시입니다.",
    },
    {
      q: "영상이 없으면 어떻게 되나요?",
      a: "첫 화면과 서브 배너는 영상 대신 사진을 두어도 화면 크기가 그대로입니다. 영상은 가로 16:9 파일을 주시면 줄여서 넣습니다.",
    },
    {
      q: "17쪽보다 적게도 되나요?",
      a: "네. 소개 · 제품 · 인재 · 고객지원 · 뉴스룸 묶음에서 필요한 쪽만 골라 만들 수 있습니다. 메인 구역도 묶음에 맞춰 줄입니다.",
    },
    {
      q: "문의와 채용 지원은 어디로 오나요?",
      a: "문의 폼은 지정한 메일로 받아 보시게 연결하고, 첨부파일도 함께 옵니다. 채용은 공고마다 지원 링크나 메일을 넣습니다.",
    },
    {
      q: "하이온셀은 실제 회사인가요?",
      a: "아닙니다. 디자인을 보여 드리려고 만든 가상 제조기업입니다. 제품 · 수주 이력 · 사업장과 사진 · 영상도 모두 예시이며, 회사 자료를 주시면 그대로 바꿔 넣습니다.",
    },
  ],
};

export default study;
