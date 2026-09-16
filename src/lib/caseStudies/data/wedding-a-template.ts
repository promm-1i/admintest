import type { CaseStudy } from "../types";

const study: CaseStudy = {
  brand: "서울바우",
  headline: "웨딩 컨시어지 · 촬영 여행 홈페이지",
  summary:
    "연한 분홍 회색 바탕에 세리프 영문 제목과 필기체를 곁들인 웨딩 컨시어지 홈페이지입니다. 메인 한 쪽에 회사소개 · 서비스 목록 · 서비스 상세 · 블로그 · 블로그 상세 · 로그인 · 회원가입 · 비밀번호 찾기, 모두 9쪽입니다.",
  brandColor: "rgb(75,46,60)",
  tintColor: "rgb(238,233,232)",
  overview:
    "서울바우는 해외 커플에게 서울 · 제주 웨딩 촬영과 드레스 · 한복 · 뷰티 · K-Pop 체험을 한 사람이 처음부터 끝까지 맡아 주는 웨딩 컨시어지를 가정하고 만든 디자인입니다. 연한 분홍 회색 바탕에 자두색을 강조색으로 쓰고, 제목은 세리프 영문 대문자, 곳곳에 필기체 라벨을 두어 초대장 같은 분위기를 냈습니다.\n\n메인은 글자가 계단처럼 올라오는 인트로 뒤 5초마다 바뀌는 첫 화면, 회사 소개, 서비스 6가지 카드, 흘러가는 띠, 화면에 붙은 채 네 단계가 바뀌는 진행 안내, 블로그와 후기 3장, FAQ 7개, 상담 배너로 이어집니다. 오른쪽 아래에는 채팅 상담 아이콘이 떠 있고, 오른쪽 위 버튼으로 여는 옆 메뉴는 항목에 마우스를 올리면 필기체와 사진이 바뀝니다.\n\n서비스 목록은 한 쪽에서 6분야를 바꿔 보며 태그 8개로 거르고, 서비스 상세는 소개 · 포트폴리오 63장 · 패키지 3종으로 이루어져 화면 아래 View Packages 띠가 따라옵니다. 문의는 2단계 창으로 받고, 로그인 · 회원가입 · 비밀번호 찾기 쪽까지 갖췄습니다.",
  meta: [
    { label: "업종", value: "웨딩 컨시어지 · 웨딩 촬영 · 신혼여행 · 외국인 대상 체험" },
    { label: "페이지 구성", value: "9쪽 · 메인, 회사소개, 서비스 목록(6분야), 서비스 상세, 블로그, 블로그 상세, 로그인, 회원가입, 비밀번호 찾기 + 문의 · 약관 창" },
    { label: "이런 곳에 맞습니다", value: "웨딩 플래너 · 스튜디오 · 드레스숍, 외국인 손님을 받는 여행사, 사진이 많은 서비스업" },
  ],
  mainShot: "/cases/wedding-a/main.webp",
  pages: [
    {
      name: "홈",
      file: "index.html",
      img: "/cases/wedding-a/page-index.webp",
      desc: "인트로 뒤 첫 화면, 회사 소개, 서비스 6가지, 진행 4단계, 블로그 · 후기, FAQ, 상담 배너로 이어집니다.",
      items: ["인트로 글자 계단 · 첫 화면 5초 전환", "회사 소개 · INQUIRE · VIEW SERVICE", "서비스 카드 6 · 흘러가는 띠", "진행 4단계 · 화면 고정", "블로그 · 후기 3 · FAQ 7 · 상담 배너"],
    },
    {
      name: "회사소개",
      file: "about.html",
      img: "/cases/wedding-a/page-about.webp",
      desc: "한국 커플과 같은 스튜디오를 쓰는 이유(Access), 일대일 컨시어지, 블룸트래블 이야기, 서비스 6가지가 이어집니다.",
      items: ["Access · 항목 3", "일대일 컨시어지 · 항목 4", "블룸트래블 이야기 · 서비스 6"],
    },
    {
      name: "서비스 목록",
      file: "offer.html",
      img: "/cases/wedding-a/page-offer.webp",
      desc: "Pre-Wedding 등 6분야를 한 쪽에서 바꿔 보고, 왼쪽 태그 8개로 스튜디오 14곳을 거릅니다.",
      items: ["분야 6 · 한 쪽에서 전환", "태그 8 · ALL · Hanok · Outdoor …", "스튜디오 카드 14 · 사진 · 이름 · 태그"],
    },
    {
      name: "서비스 상세",
      file: "offer-view.html",
      img: "/cases/wedding-a/page-offer-view.webp",
      desc: "스튜디오 소개 · 포트폴리오 63장 · 패키지 3종으로 이루어진 긴 쪽입니다. 화면 아래 View Packages 띠가 따라옵니다.",
      items: ["소개 · 큰 사진 · 태그", "포트폴리오 63장 · 크게 보기", "패키지 3 · 누르면 구성 창 · View Packages 띠"],
    },
    {
      name: "블로그",
      file: "blog.html",
      img: "/cases/wedding-a/page-blog.webp",
      desc: "대표 글 하나를 크게, 아래에 글과 후기를 카드로 놓고 페이지 번호로 나눕니다.",
      items: ["대표 글 · 큰 사진", "글 · 후기 카드 · 분류 표시", "페이지 번호"],
    },
    {
      name: "블로그 상세",
      file: "blog-view.html",
      img: "/cases/wedding-a/page-blog-view.webp",
      desc: "촬영 비용 · 촬영 가이드 · 후기 세 글의 본문 쪽입니다.",
      items: ["제목 · 날짜 · 본문 · 사진", "글 2 · 후기 1"],
    },
    {
      name: "로그인",
      file: "login.html",
      img: "/cases/wedding-a/page-login.webp",
      desc: "이메일 · 비밀번호 · 이메일 저장 로그인 폼입니다. 회원가입 · 비밀번호 찾기 쪽이 같은 틀입니다.",
      items: ["로그인 폼 · 이메일 저장", "회원가입 · 약관 동의 2 · 비밀번호 찾기"],
    },
    {
      name: "회원가입",
      file: "sign-up.html",
      img: "/cases/wedding-a/page-sign-up.webp",
      desc: "이름 · 이메일 · 비밀번호와 이용약관 · 개인정보 동의 2칸을 받는 가입 폼입니다.",
      items: ["가입 폼 8칸", "이용약관 · 개인정보 보기 창"],
    },
  ],
  points: [
    {
      title: "회사 소개는 흑백 사진 옆에\n세리프 제목과 버튼 둘",
      body: "첫 화면 아래 회사 소개 구역은 왼쪽에 드레스를 매만지는 흑백 사진, 오른쪽에 필기체 'about 서울바우' 라벨과 'KOREA'S LIFESTYLE AND WEDDING EXPERIENCES' 세리프 제목, 소개 글, INQUIRE · VIEW SERVICE 버튼, 일대일 상담 · 서울 전체 일정 · 업계 30년 · 영어 · 한국어 동시 진행 네 가지 항목이 놓입니다.",
      items: ["흑백 사진 · 필기체 라벨 · 세리프 제목", "INQUIRE · VIEW SERVICE 버튼", "항목 4"],
      img: "/cases/wedding-a/point-about.webp",
      caption: "홈 · 회사 소개",
    },
    {
      title: "서비스 6가지는\n큰 사진 카드 두 줄",
      body: "OUR MAIN OFFERS 구역은 Pre-Wedding · Seoul & Jeju Photography · Dress Tour · Hanbok, Jewelry and Tailoring · K-Beauty · K-Pop 여섯 서비스를 큰 세로 사진 카드로 2열에 놓았습니다. 카드마다 세리프 영문 이름과 한 줄 설명이 붙고, 누르면 서비스 목록 쪽의 그 분야로 이동합니다. 아래로 문구가 흘러가는 띠가 이어집니다.",
      items: ["서비스 카드 6 · 2열 · 큰 사진", "영문 이름 · 한 줄 설명", "누르면 해당 분야 목록 · 흘러가는 띠"],
      img: "/cases/wedding-a/point-offer.webp",
      caption: "홈 · 서비스",
    },
    {
      title: "진행 안내는 화면에 붙은 채\n네 단계가 바뀝니다",
      body: "PERSONAL TAILOR-MADE ITINERARY 구역은 화면에 붙어 있고, 스크롤을 내리는 동안 Personal Consultation → Final Quotation and Payment → Schedule Confirmation → Begin Your Korean Journey 네 단계가 차례로 켜지며 오른쪽 사진과 설명이 그 단계로 바뀝니다. 2.4화면 높이를 0.5 간격으로 나눠 한 단계씩 넘어갑니다.",
      items: ["화면 고정 · 2.4화면 높이", "단계 4 · 켜진 단계만 진하게", "단계마다 사진 · 설명 전환"],
      img: "/cases/wedding-a/point-process.webp",
      caption: "홈 · 진행 안내 1단계",
    },
    {
      title: "단계가 바뀌면\n사진과 글이 함께 바뀝니다",
      body: "세 번째 단계 Schedule Confirmation에서는 예약 확정과 바우처 발급을 설명하는 사진과 글로 바뀝니다. 왼쪽 제목과 소개는 그대로 두고 단계 목록과 오른쪽 판만 바뀌어 읽는 흐름이 끊기지 않습니다.",
      items: ["제목 · 소개 고정", "단계 목록 · 오른쪽 판만 전환", "번호 (1)~(4)"],
      img: "/cases/wedding-a/point-process2.webp",
      caption: "홈 · 진행 안내 3단계",
    },
    {
      title: "블로그와 후기는\n필기체가 라벨로 바뀝니다",
      body: "BLOGS & REVIEWS 구역은 큰 필기체 'memories'가 배경에 깔린 채 블로그 글 2장과 후기 1장이 사진 카드로 놓입니다. 카드마다 Blog · Customer Review 분류 표시와 제목, 인용문이 붙고, 스크롤이 지나가면 필기체가 라벨로 바뀝니다. 아래 FAQ 7개는 눌러서 펼칩니다.",
      items: ["배경 필기체 memories", "블로그 2 · 후기 1 · 분류 표시 · 인용문", "FAQ 7 펼침"],
      img: "/cases/wedding-a/point-review.webp",
      caption: "홈 · 블로그 · 후기",
    },
    {
      title: "회사소개 쪽은\n블룸트래블 이야기를 길게",
      body: "회사소개 쪽 가운데의 'BLOOM TRAVEL IS THE LARGEST HONEYMOON TRAVEL AGENCY IN KOREA' 구역은 세로 사진 한 장 아래로 회사 이야기 세 문단과 홈페이지 · 유튜브 링크, reach out to us 버튼이 좁은 폭으로 이어집니다. 위쪽 Access · 일대일 컨시어지 구역과 아래 서비스 6가지가 같은 쪽에 있습니다.",
      items: ["세로 사진 · 세 문단 · 링크 2", "reach out to us 버튼", "Access 3 · 컨시어지 4 · 서비스 6"],
      img: "/cases/wedding-a/point-story.webp",
      caption: "회사소개 · 블룸트래블",
    },
    {
      title: "서비스 목록은\n태그 8개로 거릅니다",
      body: "서비스 목록 쪽은 Pre-Wedding · Seoul & Jeju Photography · Dress Tour · Hanbok · K-Beauty · K-Pop 여섯 분야를 한 파일에서 바꿔 보며, 왼쪽에 ALL · Portrait-Focused · Scenery-Focused · Hanok · Outdoor · Floral · Evening · Candid 태그가 화면에 붙어 따라옵니다. 태그를 고르면 스튜디오 카드 14장이 걸러지고, 카드마다 이름과 해시태그가 붙습니다.",
      items: ["분야 6 · 한 쪽에서 전환", "태그 8 · 화면에 붙음 · 고르면 거름", "스튜디오 카드 14 · 이름 · 해시태그"],
      img: "/cases/wedding-a/point-list.webp",
      caption: "서비스 목록 · 태그",
    },
    {
      title: "서비스 상세는\nView Packages 띠가 따라옵니다",
      body: "블룸 스튜디오 상세 쪽은 큰 사진과 'TO BLOOM ACROSS THE WHOLE GARDEN' 제목, 소개 두 문단, 해시태그로 시작합니다. 화면 아래에 자두색 View Packages 띠가 붙어 있어 어디서든 패키지 구역으로 내려갑니다.",
      items: ["큰 사진 · 세리프 제목 · 소개 · 해시태그", "View Packages 띠 고정", "누르면 패키지 구역으로"],
      img: "/cases/wedding-a/point-intro.webp",
      caption: "서비스 상세 · 소개",
    },
    {
      title: "포트폴리오 63장은\n세로 사진 3열",
      body: "'A NARRATIVE IN EVERY FRAME' 아래 포트폴리오는 세로 사진 63장을 3열로 늘어놓습니다. 사진을 누르면 화면을 덮는 창에서 크게 보고 좌우로 넘깁니다. 스튜디오마다 사진 수만 다르고 틀은 같습니다.",
      items: ["세로 사진 63장 · 3열", "누르면 크게 보기 · 좌우 넘김"],
      img: "/cases/wedding-a/point-gallery.webp",
      caption: "서비스 상세 · 포트폴리오",
    },
    {
      title: "패키지 3종은\n슬라이더로 넘기고 창에서 봅니다",
      body: "WHAT WE OFFER 구역은 TOTAL 같은 패키지 3종을 사진 슬라이더로 넘기고, 패키지를 누르면 촬영 시간 · 의상 · 보정 컷 수 같은 구성이 창으로 뜹니다. 좌우 화살표와 아래 막대로 넘깁니다.",
      items: ["패키지 슬라이더 3 · 화살표 · 막대", "누르면 구성 창", "촬영 시간 · 의상 · 보정 컷 수"],
      img: "/cases/wedding-a/point-packages.webp",
      caption: "서비스 상세 · 패키지",
    },
    {
      title: "FAQ 7개는\n눌러서 펼칩니다",
      body: "메인 아래쪽 FAQ 구역은 견적 확인 · 서비스 하나만 예약 · 영어 진행 · 상담 뒤 절차 · 시작 방법 같은 질문 7개를 줄로 놓고, 누르면 답이 펼쳐집니다. 처음에는 5개만 보이고 VIEW MORE로 나머지를 엽니다. 아래 상담 배너의 버튼을 누르면 2단계 문의 창이 뜹니다.",
      items: ["질문 7 · 5개 보임 · VIEW MORE", "누르면 답 펼침", "상담 배너 · 2단계 문의 창"],
      img: "/cases/wedding-a/point-faq.webp",
      caption: "홈 · FAQ",
    },
  ],
  details: [
    {
      title: "인트로와 첫 화면",
      body: "처음 열면 글자가 계단처럼 올라오는 인트로가 지나가고, 첫 화면 사진이 5초마다 겹치며 바뀝니다.",
    },
    {
      title: "옆 메뉴",
      body: "오른쪽 위 버튼으로 여는 메뉴는 두 단으로 나뉘고, 항목에 마우스를 올리면 필기체 이름과 사진이 그 항목으로 바뀝니다.",
    },
    {
      title: "문의 2단계 창",
      body: "관심 서비스 6개 체크와 이름 · 이메일 · 날짜 · 메시지를 받는 창이 2단계로 열리고, 필수 칸을 검사한 뒤 완료 단계로 넘어갑니다.",
    },
    {
      title: "패럴랙스와 등장",
      body: "사진은 컨테이너보다 크게 두고 스크롤 비율만큼 움직이며, 요소는 화면 80% 선에서 떠오릅니다. 띠는 260초에 한 바퀴 흐릅니다.",
    },
    {
      title: "글꼴",
      body: "제목은 Aboreto, 필기체는 Pinyon Script, 본문은 Pretendard입니다. 영문 표시 제목은 영어, 본문은 한국어로 두었습니다.",
    },
    {
      title: "사진 145칸",
      body: "메인과 서브에 사진 자리가 145칸이고 상세 포트폴리오만 63장입니다. 얼굴이 드러나지 않는 손 · 뒷모습 사진으로 골랐습니다.",
    },
  ],
  mobile: {
    title: "휴대폰에서는 카드가 한 줄씩, 태그는 위로",
    body: "서비스 카드 6장과 블로그 카드는 한 줄씩 쌓이고, 진행 4단계는 화면에 붙은 채 그대로 바뀝니다. 서비스 목록의 태그는 위로 올라가 옆으로 밀어서 고르고, 포트폴리오는 2열이 됩니다.",
    shots: [
      { img: "/cases/wedding-a/m-index.webp", caption: "홈" },
      { img: "/cases/wedding-a/m-offer.webp", caption: "서비스 목록" },
      { img: "/cases/wedding-a/m-offer-view.webp", caption: "서비스 상세" },
      { img: "/cases/wedding-a/m-blog.webp", caption: "블로그" },
    ],
  },
  faq: [
    {
      q: "스튜디오나 패키지가 늘어나면 어떻게 올리나요?",
      a: "제작할 때 관리자 화면에서 분야 · 스튜디오 · 태그 · 포트폴리오 사진 · 패키지 구성을 등록하면 목록과 상세에 함께 반영되게 만듭니다.",
    },
    {
      q: "로그인과 회원가입은 실제로 되나요?",
      a: "지금은 폼만 있고 저장은 되지 않습니다. 제작할 때 회원 저장과 마이페이지를 붙여 예약 내역을 보게 만들 수 있으며 비용은 상담 때 안내합니다.",
    },
    {
      q: "영문 사이트로도 만들 수 있나요?",
      a: "네. 제목은 이미 영문이고 본문 문구를 영어로 받으면 같은 틀로 만듭니다. 한 · 영 전환 버튼을 더할 수도 있습니다.",
    },
    {
      q: "문의는 어디로 오나요?",
      a: "문의 창에서 보낸 내용을 지정한 메일로 받아 보시게 연결하고, 채팅 상담 아이콘은 카카오톡 채널이나 WhatsApp으로 연결합니다.",
    },
    {
      q: "블로그 글은 어떻게 올리나요?",
      a: "제작할 때 관리자 화면에서 글 · 사진 · 분류(Blog · Review)를 올리면 목록 · 대표 글 · 메인 카드에 반영되게 만듭니다.",
    },
    {
      q: "사진은 어떻게 준비하나요?",
      a: "촬영 사진을 주시면 크기 · 색을 맞춰 넣습니다. 이 화면의 사진은 예시이고, 부족한 장면은 촬영 방법을 안내해 드립니다.",
    },
  ],
};

export default study;
