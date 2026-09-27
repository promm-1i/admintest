import type { CaseStudy } from "../types";

const study: CaseStudy = {
  brand: "오빗랩",
  headline: "디지털 에이전시 홈페이지",
  summary:
    "프로젝트 42건을 건마다 한 쪽씩 쓴 디지털 에이전시 홈페이지입니다. 스크롤에 따라 장면이 바뀌는 긴 메인과 목록 · 상세를 합쳐 모두 48쪽으로 구성했습니다.",
  brandColor: "rgb(94,86,240)",
  tintColor: "rgb(240,240,252)",
  overview:
    "오빗랩은 금융 · 공공 · 커머스 시스템을 만드는 디지털 프로덕트 회사를 가정하고 만든 디자인입니다. 이런 회사의 홈페이지는 결국 '무엇을 만들어 봤는가'로 판가름 납니다. 그래서 프로젝트를 목록 한 줄로 끝내지 않고 42건 모두에 쪽을 하나씩 주어, 고객사 · 분류 · 오픈 시기 · 수행 기간과 화면 설계까지 담았습니다.\n\n화면은 거의 흰색입니다. 색은 보라에서 파랑으로 번지는 덩어리 하나와 붉은 점 하나뿐이고, 제목은 세리프 영문으로 크게 씁니다. 스크롤은 부드럽게 따라오며, 메인 중간의 두 구역은 화면이 멈춘 채 문장이 바뀝니다.\n\n메인은 We Are Orbitlab 첫 화면 · Beyond UX 선언 · 일하는 방식 세 문장 · 서비스 네 갈래 · 파트너 · 대표 프로젝트 3건 · Say Hello 순으로 이어집니다. 서브는 회사소개 · 프로젝트 목록 · 프로젝트 상세 42 · 문의 · 약관입니다.",
  meta: [
    { label: "업종", value: "디지털 에이전시 · SI · UI/UX 컨설팅" },
    { label: "페이지 구성", value: "48쪽 · 메인, 회사소개, 프로젝트 목록, 프로젝트 상세 42, 문의, 개인정보처리방침 · 이용약관" },
    { label: "이런 곳에 맞습니다", value: "에이전시 · SI · 개발사 · 스튜디오, 수행 실적이 많은 회사, 실적을 건별로 보여주고 싶은 곳" },
  ],
  mainShot: "/cases/orbitlab/main.webp",
  pages: [
    {
      name: "홈",
      file: "index.html",
      img: "/cases/orbitlab/page-index.webp",
      desc: "첫 화면 아래로 선언 · 일하는 방식 · 서비스 · 파트너 · 대표 프로젝트 · 문의가 이어지는 긴 한 쪽입니다.",
      items: ["We Are Orbitlab · 그러데이션 덩어리", "Beyond UX 선언 · 일하는 방식 3문장", "서비스 4갈래 · 파트너 · 대표 프로젝트 3", "Say Hello"],
    },
    {
      name: "회사소개",
      file: "about.html",
      img: "/cases/orbitlab/page-about.webp",
      desc: "Who We Are와 일하는 태도 세 가지, 분야별 경험을 담았습니다.",
      items: ["Who We Are · 한 문장", "태도 3 · 데이터 너머 · 사람을 향한 호기심 · 당연함을 의심", "Experience · 분야별 경험"],
    },
    {
      name: "프로젝트 목록",
      file: "projects.html",
      img: "/cases/orbitlab/page-projects.webp",
      desc: "42건을 All · Web · Mobile · Consulting 탭과 완료 · 진행중 표시로 걸러 봅니다.",
      items: ["분류 탭 4 · 완료 · 진행중", "카드 42 · 사진 · 이름", "누르면 상세 쪽으로"],
    },
    {
      name: "프로젝트 상세",
      file: "p-onnuri-gift.html",
      img: "/cases/orbitlab/page-p-onnuri-gift.webp",
      desc: "건마다 고객사 · 분류 · 오픈 · 수행기간과 개요 · 화면 설계를 담은 쪽이 하나씩 있습니다.",
      items: ["제목 · 한 줄 설명 · 대표 사진", "고객사 · 분류 · 오픈 · 수행기간", "Overview · 화면 · 결과"],
    },
    {
      name: "간편결제 · 금융",
      file: "p-hangyeol-campus.html",
      img: "/cases/orbitlab/page-p-hangyeol-campus.webp",
      desc: "은행 앱 · 증권 웹 · 카드 분석 같은 금융 프로젝트가 같은 틀로 이어집니다.",
      items: ["금융 프로젝트", "같은 상세 틀", "분류 Web · Mobile"],
    },
    {
      name: "생성형 AI",
      file: "p-dap-genai.html",
      img: "/cases/orbitlab/page-p-dap-genai.webp",
      desc: "생성형 AI 도입 프로젝트를 설계 관점으로 정리한 쪽입니다.",
      items: ["AI 도입 배경", "설계 · 화면", "수행 기간"],
    },
    {
      name: "헬스케어",
      file: "p-onedoctor.html",
      img: "/cases/orbitlab/page-p-onedoctor.webp",
      desc: "건강관리 시스템처럼 산업이 다른 프로젝트도 같은 틀에 들어갑니다.",
      items: ["산업별 프로젝트", "같은 상세 틀"],
    },
    {
      name: "증권 모바일",
      file: "p-sol-stock.html",
      img: "/cases/orbitlab/page-p-sol-stock.webp",
      desc: "모바일 웹 개편 프로젝트입니다.",
      items: ["개편 전후 관점", "화면 설계"],
    },
    {
      name: "주거 플랫폼",
      file: "p-myhomes.html",
      img: "/cases/orbitlab/page-p-myhomes.webp",
      desc: "플랫폼 구축 프로젝트입니다.",
      items: ["플랫폼 구조", "화면 설계"],
    },
    {
      name: "공공 포털",
      file: "p-open-api.html",
      img: "/cases/orbitlab/page-p-open-api.webp",
      desc: "공공 오픈 API 포털처럼 기관 프로젝트도 함께 담았습니다.",
      items: ["공공 프로젝트", "같은 상세 틀"],
    },
    {
      name: "문의",
      file: "contact.html",
      img: "/cases/orbitlab/page-contact.webp",
      desc: "프로젝트 문의를 받는 쪽입니다. 약관 두 쪽이 뒤에 있습니다.",
      items: ["문의 폼", "연락처 · 위치", "개인정보처리방침 · 이용약관"],
    },
  ],
  points: [
    {
      title: "첫 화면은 흰 바탕에\n덩어리 하나와 붉은 점",
      body: "첫 화면은 흰 바탕에 보라에서 파랑으로 번지는 덩어리를 하나 띄우고, 그 위에 We Are Orbitlab을 세리프로 크게 겹칩니다. 덩어리 가운데에는 붉은 점 하나만 찍혀 있습니다. 아래에 '호기심이 가득한 오늘, 무한한 가능성의 내일'과 두 줄 소개, 오른쪽 아래에 SCROLL 표시가 있습니다. 메뉴는 Let's Talk와 전체메뉴 단추뿐입니다.",
      items: ["흰 바탕 · 그러데이션 덩어리 · 붉은 점", "세리프 대문자 제목 · 두 줄 소개", "메뉴는 Let's Talk · 전체메뉴"],
      img: "/cases/orbitlab/main.webp",
      caption: "첫 화면",
    },
    {
      title: "선언 구역은 화면이 멈춘 채\n문장이 바뀝니다",
      body: "첫 화면 다음 Beyond UX The AX Creator 구역은 화면에 붙은 채 스크롤을 받습니다. 흰 판이 덮이며 문장이 바뀌고, 덩어리는 자리를 옮깁니다. 회사가 무엇을 하는 곳인지 한 문장씩 읽히도록 두 화면 반 높이를 이 구역에 썼습니다.",
      items: ["화면 고정 · 2.6화면 높이", "흰 판이 덮이며 문장 전환", "덩어리가 함께 움직임"],
      img: "/cases/orbitlab/point-beyond.webp",
      caption: "홈 · Beyond UX",
    },
    {
      title: "일하는 방식은\n세 문장으로",
      body: "이어지는 구역은 일하는 방식을 세 문장으로 못 박습니다. 고객이 선 자리에서 쓰임을 다시 본다 · 길이 여럿일수록 가장 단순한 구조를 찾는다 · 열고 나서가 진짜 시작이다. 문장마다 화면 하나를 통째로 쓰고 스크롤에 따라 넘어갑니다. 방법론을 도식으로 그리는 대신 말로 남겼습니다.",
      items: ["문장 3 · 화면 하나씩", "화면 고정 · 스크롤로 전환", "도식 없이 문장만"],
      img: "/cases/orbitlab/point-insight.webp",
      caption: "홈 · 일하는 방식",
    },
    {
      title: "서비스는 네 갈래,\n갈래마다 태그로",
      body: "Our Services 구역은 Finance-Grade Standard · Industry Crossover · SI Partnership · Design System & AX 네 갈래입니다. 갈래마다 제목 아래에 UI/UX Design · Platform Operation · Service Renewal · QA & Publishing 같은 태그를 알약 모양으로 달아, 그 갈래에서 실제로 하는 일을 한눈에 보여 줍니다. 스크롤을 내리면 갈래가 하나씩 올라옵니다.",
      items: ["갈래 4 · 큰 제목", "갈래마다 태그 4~5개", "스크롤에 따라 하나씩"],
      img: "/cases/orbitlab/point-services.webp",
      caption: "홈 · 서비스",
    },
    {
      title: "대표 프로젝트 셋만\n메인에 올립니다",
      body: "Our Projects 구역은 42건 중 셋만 뽑아 올립니다. 온누리 생활상품권 · 한결은행 영 캠퍼스 앱 · DAP 생성형 AI처럼 성격이 다른 셋을 골라, 회사가 다루는 폭을 짧게 보여 줍니다. 전체는 프로젝트 목록 쪽에서 봅니다.",
      items: ["대표 3건 · 성격이 다른 셋", "이름 · 한 줄", "전체 목록으로 이어짐"],
      img: "/cases/orbitlab/point-projects.webp",
      caption: "홈 · 대표 프로젝트",
    },
    {
      title: "프로젝트 목록은 42건,\n분류와 상태로 거릅니다",
      body: "프로젝트 목록 쪽은 '결과로 증명하는 것, 그것이 오빗랩의 방식입니다' 아래에 All · Web · Mobile · Consulting 탭과 완료 · 진행중 토글을 둡니다. 아래 격자에는 42건이 세로 사진 카드로 놓이고, 사진은 실제 쓰이는 장면(시장에서 결제하는 손, 모니터 앞 작업 화면)으로 골라 서비스 성격이 사진만으로 짐작됩니다.",
      items: ["분류 탭 4 · 완료 · 진행중 토글", "카드 42 · 세로 사진", "쓰는 장면 위주 사진"],
      img: "/cases/orbitlab/point-list.webp",
      caption: "프로젝트 목록",
    },
    {
      title: "상세는 고객사 · 분류 · 오픈 ·\n수행기간을 한 줄에",
      body: "프로젝트 상세는 왼쪽에 제목과 한 줄 설명, 오른쪽에 실제 사용 장면 사진을 두고, 그 아래 고객사 · 분류 · 오픈 시기 · 수행기간을 네 칸으로 나란히 적습니다. 이어서 Overview에서 무엇을 왜 그렇게 설계했는지 쓰고, 화면 그림으로 결과를 보여 줍니다. 42건이 모두 같은 순서라 읽는 사람이 비교하기 쉽습니다.",
      items: ["제목 · 한 줄 · 대표 사진", "고객사 · 분류 · 오픈 · 수행기간 4칸", "Overview · 화면 그림"],
      img: "/cases/orbitlab/point-detail.webp",
      caption: "프로젝트 상세",
    },
    {
      title: "회사소개는\n태도 세 가지로",
      body: "회사소개 쪽은 Who We Are 아래 '기술에 가치를 더해, 내일의 설렘을 완성합니다'를 걸고, 데이터 너머의 본질을 본다 · 사람을 향한 호기심에서 시작한다 · 당연함을 의심하며 내일을 앞당긴다 세 가지를 적습니다. 아래 Experience에서 금융 · 산업 · SI · 디자인 시스템 경험을 묶습니다.",
      items: ["Who We Are · 한 문장", "태도 3", "Experience · 분야별 경험"],
      img: "/cases/orbitlab/point-about.webp",
      caption: "회사소개",
    },
    {
      title: "마지막은 Say Hello\n한 마디",
      body: "메인 마지막은 Say Hello! 한 마디와 문의로 가는 길입니다. 긴 폼을 메인에 두지 않고 문의 쪽으로 넘겨, 15,000px 넘는 메인이 조용하게 끝나도록 했습니다. 머리글의 Let's Talk도 같은 곳으로 갑니다.",
      items: ["Say Hello! 한 마디", "문의 쪽으로", "머리글 Let's Talk와 같은 곳"],
      img: "/cases/orbitlab/point-hello.webp",
      caption: "홈 · Say Hello",
    },
  ],
  details: [
    {
      title: "부드러운 스크롤",
      body: "휠을 굴리면 천천히 따라옵니다. 고정 구역의 문장 전환이 이 속도에 맞춰 설계돼 있습니다.",
    },
    {
      title: "색은 두 가지뿐",
      body: "흰 바탕에 보라~파랑 덩어리와 붉은 점만 씁니다. 프로젝트 사진이 알아서 색을 채웁니다.",
    },
    {
      title: "세리프 영문 제목",
      body: "We Are Orbitlab · Our Services처럼 구역 제목은 세리프 영문으로 크게 씁니다. 본문 한글은 읽기 좋은 고딕입니다.",
    },
    {
      title: "프로젝트 한 건 = 한 쪽",
      body: "42건이 모두 같은 틀의 쪽을 하나씩 가집니다. 건을 더하면 목록과 메인 대표 자리에 함께 반영됩니다.",
    },
    {
      title: "분류와 상태",
      body: "Web · Mobile · Consulting 분류와 완료 · 진행중 상태가 붙어 있어, 진행 중인 일도 감추지 않고 보여 줍니다.",
    },
    {
      title: "사진 59칸",
      body: "메인과 프로젝트에 사진 자리가 59칸입니다. 대부분 서비스가 실제로 쓰이는 장면입니다.",
    },
  ],
  mobile: {
    title: "휴대폰에서는 문장이 한 화면씩 넘어갑니다",
    body: "첫 화면 덩어리와 제목은 그대로 두고, 고정 구역의 문장도 한 화면씩 바뀝니다. 서비스 태그는 줄바꿈되고, 프로젝트 카드는 한 칸씩 쌓입니다. 상세의 고객사 · 분류 · 오픈 · 수행기간 네 칸은 두 줄로 접힙니다.",
    shots: [
      { img: "/cases/orbitlab/m-index.webp", caption: "홈" },
      { img: "/cases/orbitlab/m-about.webp", caption: "회사소개" },
      { img: "/cases/orbitlab/m-projects.webp", caption: "프로젝트 목록" },
      { img: "/cases/orbitlab/m-detail.webp", caption: "프로젝트 상세" },
    ],
  },
  faq: [
    {
      q: "프로젝트가 계속 늘어나는데 관리되나요?",
      a: "제작할 때 관리자 화면에서 이름 · 고객사 · 분류 · 기간 · 사진 · 본문을 등록하면 목록 · 상세 · 메인 대표 자리에 함께 반영되게 만듭니다.",
    },
    {
      q: "고객사 이름을 밝히기 어려운 건은요?",
      a: "고객사 칸을 '금융기관 A'처럼 가리거나 아예 숨길 수 있습니다. 분류와 기간만으로도 상세 쪽이 성립하도록 짜 두었습니다.",
    },
    {
      q: "메인이 너무 길지 않나요?",
      a: "고정 구역 두 개가 길이를 차지합니다. 문장 수를 줄이거나 고정 없이 이어지게 바꾸면 절반 아래로 줄어듭니다.",
    },
    {
      q: "영문 사이트도 되나요?",
      a: "제목이 이미 영문이라 본문만 영어로 받으면 같은 틀로 만듭니다. 해외 문의가 많으면 영문 쪽을 따로 두는 편이 낫습니다.",
    },
    {
      q: "문의는 어디로 오나요?",
      a: "문의 폼을 지정한 메일로 받아 보시게 연결하고, 관리자 화면에 쌓아 두는 방식도 가능합니다.",
    },
    {
      q: "사진은 어떻게 준비하나요?",
      a: "프로젝트 화면 그림과 사용 장면 사진을 주시면 크기 · 색을 맞춰 넣습니다. 이 화면의 프로젝트와 고객사 이름은 모두 가상입니다.",
    },
  ],
};

export default study;
