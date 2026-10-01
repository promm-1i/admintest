import type { CaseStudy } from "../types";

const study: CaseStudy = {
  customerCopyReady: true,
  brand: "엘름우드",
  headline: "복합쇼핑몰 · 오피스 단지 홈페이지",
  summary:
    "쇼핑몰과 오피스가 한 단지에 있는 복합시설 홈페이지입니다. 천천히 당겨지며 바뀌는 첫 화면 사진 4장, 입점 매장 91곳 상세와 층별 안내 창, 이벤트 · 이야기 · 보도, 동네 지도, 오피스 임대 안내, 어메니티 예약 · 방문 등록, 자주 묻는 질문과 통합 검색까지 201쪽입니다.",
  brandColor: "rgb(31,40,35)",
  tintColor: "rgb(230,226,225)",
  overview:
    "엘름우드는 도심 업무지구에 들어선 쇼핑몰 · 오피스 복합단지를 가정하고 만든 디자인입니다. 실제로 있는 곳이 아닌 가상 단지이며, 매장 91곳 · 이벤트 · 이야기 · 보도 내용과 건물 규모 수치는 구성을 보여 드리려고 만든 예시입니다. 베이지 바탕에 짙은 숲색과 먹색을 쓰고, 영문 제목은 세리프, 본문은 고딕으로 짰습니다.\n\n메인은 천천히 당겨지며 겹쳐 바뀌는 첫 화면 사진 4장으로 시작하고, 스크롤하면 화면이 멈춘 채 로고와 문구가 위로 사라집니다. 그 아래로 What's On 카드, 입점 브랜드 넘김, 저절로 넘어가는 오피스 사진 넘김, 새 소식 소개가 이어집니다. 머리글은 내리면 숨고 올리면 다시 나타나며, 돋보기를 누르면 검색 칸이 열립니다.\n\n서브 쪽은 사진 위 큰 제목이 스크롤에 맞춰 올라가는 첫 화면 뒤로 본문이 이어집니다. Lifestyle 에는 전체와 Shop · Eat & Drink · Culture · Wellness 목록, 매장 91곳 상세(운영 시간 · 전화 · 위치 · 사진 · 관련 이벤트)가 있고, 매장 위치 단추를 누르면 그 층 평면도에 핀이 꽂힌 층별 안내 창이 열립니다. What's On 에는 이벤트 분류 단추와 남은 날 표시, 동네 지도, 이야기 29편, 보도 45건이 있습니다. Work 에는 오피스 라이프 · 게스트 서비스 · 임대 안내와 어메니티 예약 쪽이, About 에는 건물 소개 · 오시는 길 · 자주 묻는 질문 · 문의처가 있습니다. 방문 등록 · 문의 · 회원가입 양식은 입력 확인과 안내 문구까지만 하고 어디에도 보내지 않으며, 어메니티 예약 쪽은 입주사 로그인 창이 먼저 뜹니다.",
  meta: [
    { label: "업종", value: "쇼핑몰과 오피스가 함께 있는 복합단지, 입점 매장이 많은 쇼핑몰 · 아웃렛, 입주사 편의시설 예약을 함께 안내하는 오피스 빌딩" },
    {
      label: "페이지 구성",
      value:
        "201쪽 · 메인, What's On(이벤트 목록 · 이벤트 3 · 동네 지도 · 이야기 목록 3 · 이야기 29 · 보도 목록 5 · 보도 45), Lifestyle(전체 · 분류 4 · 매장 91), Work(오피스 라이프 · 게스트 서비스 · 방문 등록 · 어메니티 예약 3 · 임대 안내), About(건물 소개 · 오시는 길 · 자주 묻는 질문 · 문의처), 검색 · 사이트맵 · 회원가입 · 약관 · 개인정보처리방침 · 안내 쪽",
    },
    {
      label: "이런 곳에 맞습니다",
      value: "매장 정보를 쪽마다 따로 보여 줘야 하는 쇼핑몰, 층별 안내와 오시는 길 안내가 중요한 대형 시설, 이벤트 · 소식을 자주 올리고 입주사 편의시설까지 안내하는 복합단지",
    },
  ],
  mainShot: "/cases/real-estate-g/main.webp",
  pagesLabel: "페이지",
  pagesTitle: "201쪽이 어떻게 이어지는지",
  pages: [
    {
      name: "메인",
      file: "index.html",
      img: "/cases/real-estate-g/page-index.webp",
      desc: "천천히 당겨지며 바뀌는 첫 화면 사진 4장 뒤로 What's On · 입점 브랜드 · 오피스 사진 넘김과 새 소식 소개가 이어집니다.",
      items: ["스크롤하면 멈춘 채 로고와 문구가 올라가는 첫 화면", "What's On 카드 · 입점 브랜드 넘김", "저절로 넘어가는 오피스 사진 넘김 · 새 소식 소개"],
    },
    {
      name: "What's On",
      file: "whatson.html",
      img: "/cases/real-estate-g/page-whatson.webp",
      desc: "대표 이야기 넘김 아래로 이벤트 카드를 분류 단추로 골라 봅니다.",
      items: ["이벤트 분류 단추 9개", "남은 날(D-) 표시 · 기간", "고른 분류에 이벤트가 없으면 안내 문구"],
    },
    {
      name: "Lifestyle",
      file: "lifestyle.html",
      img: "/cases/real-estate-g/page-lifestyle.webp",
      desc: "입점 매장을 분류 단추와 이름 검색으로 찾습니다.",
      items: ["전체 · Shop · Eat & Drink · Culture · Wellness", "가나다순 매장 카드 · 이름 검색 칸", "스크롤하면 16개씩 더 불러오기"],
    },
    {
      name: "매장 상세",
      file: "shop-5.html",
      img: "/cases/real-estate-g/page-shop-5.webp",
      desc: "매장 91곳마다 소개 글과 사진, 운영 시간 · 전화 · 위치, 관련 이벤트를 보여 줍니다.",
      items: ["요일별 운영 시간 · 전화 · 홈페이지 · 동 · 층", "위치 단추 — 그 층 평면도에 핀", "매장 사진 · 관련 이벤트 카드"],
    },
    {
      name: "동네 지도",
      file: "neighborhood.html",
      img: "/cases/real-estate-g/page-neighborhood.webp",
      desc: "단지 둘레의 노선과 장소를 그린 지도 옆에 장소 목록이 있습니다.",
      items: ["지하철 노선 · 장소 핀", "장소에 마우스를 대면 지도 구역이 밝아짐", "장소를 누르면 사진과 설명 창"],
    },
    {
      name: "Life in Elmwood",
      file: "work.html",
      img: "/cases/real-estate-g/page-work.webp",
      desc: "부채처럼 펼쳐지는 오피스 라이프 카드 아래로 센트럴 가든 · 지하 보행로 · 쇼핑몰과 입주사 소개가 이어집니다.",
      items: ["화면에 들어오면 펼쳐지는 카드 6장", "공간 소개 띠 3개 · 입주사 로고"],
    },
    {
      name: "게스트 서비스",
      file: "guest.html",
      img: "/cases/real-estate-g/page-guest.webp",
      desc: "방문 등록과 어메니티 예약 카드, 라운지 · 회의실 · 휴게실 · 임원실 안내 탭이 있습니다.",
      items: ["방문 등록 · 예약 카드 4장", "어메니티 안내 탭 4개(사진 · 이용 안내)"],
    },
    {
      name: "임대 안내",
      file: "leasing.html",
      img: "/cases/real-estate-g/page-leasing.webp",
      desc: "오피스 장점 카드, 입구 · 오피스 · 주차 · 어메니티 · 야외 공간 탭, 입주사 후기와 임대 안내서 내려받기가 있습니다.",
      items: ["탭 5개 — 사진과 설명", "입주사 후기", "임대 안내서(PDF) 내려받기 · 입주 문의 띠"],
    },
    {
      name: "방문 등록",
      file: "visitor.html",
      img: "/cases/real-estate-g/page-visitor.webp",
      desc: "방문 날짜를 달력에서 고르고 시간 · 입주사 · 담당 직원 · 방문자 정보를 적습니다. 등록 조회 탭이 따로 있습니다.",
      items: ["달력 · 시간 고르기 · 인원 더하기 · 빼기", "빈칸 · 연락처 확인 문구"],
    },
    {
      name: "자주 묻는 질문",
      file: "faq.html",
      img: "/cases/real-estate-g/page-faq.webp",
      desc: "리테일 · 기타 · 주차 및 교통 · 오피스 네 묶음 질문을 누르면 답이 펼쳐지고, 아래에 문의 양식이 있습니다.",
      items: ["질문 23개 · 하나만 펼쳐짐", "문의 분야 · 유형 고르기 · 개인정보 동의 창"],
    },
  ],
  points: [
    {
      title: "층별 안내 창",
      body: "바닥글과 떠 있는 지도 단추로 여는 층별 안내 창은 지하 2층부터 지상 2층까지 층 탭으로 바꿔 보고, 평면도를 끌어서 움직입니다.",
      items: ["층 탭 4개 · 동별 매장 칸", "평면도 끌어 보기"],
      img: "/cases/real-estate-g/point-floor.webp",
      caption: "층별 안내",
    },
    {
      title: "매장에서 바로 위치로",
      body: "매장 상세의 위치 단추를 누르면 그 매장이 있는 층이 열리고 매장 칸에 핀이 꽂힙니다.",
      items: ["매장 층 자동 선택 · 위치 핀"],
      img: "/cases/real-estate-g/point-storemap.webp",
      caption: "매장 위치",
    },
    {
      title: "한 칸에서 찾는 통합 검색",
      body: "검색어를 넣으면 매장 · 이벤트 · 보도 · 이야기를 묶음별로 나눠 보여 주고, 묶음 탭과 더 보기 단추로 넓혀 봅니다.",
      items: ["묶음 4개 · 개수 표시", "묶음 탭 · 더 보기"],
      img: "/cases/real-estate-g/point-search.webp",
      caption: "검색 결과",
    },
    {
      title: "동네를 그린 지도",
      body: "지하철 노선과 장소 핀을 그린 지도 옆 목록에서 장소에 마우스를 대면 지도 구역이 밝아지고, 누르면 장소 창이 뜹니다.",
      items: ["노선 3개 · 장소 6곳", "구역 밝히기 · 장소 창"],
      img: "/cases/real-estate-g/point-nb.webp",
      caption: "동네 지도",
    },
    {
      title: "펼쳐지는 오피스 카드",
      body: "오피스 라이프 카드는 화면에 들어오면 한 장씩 부채처럼 펼쳐집니다.",
      items: ["카드 6장 · 펼침 장면"],
      img: "/cases/real-estate-g/point-cards.webp",
      caption: "Life in Elmwood",
    },
    {
      title: "분류로 거르는 이벤트",
      body: "이벤트 분류 단추를 누르면 그 분류의 카드만 남고, 끝나는 날까지 남은 날이 카드마다 붙습니다.",
      items: ["분류 단추 9개 · 남은 날 표시"],
      img: "/cases/real-estate-g/point-whatson.webp",
      caption: "What's On",
    },
    {
      title: "달력으로 고르는 방문 등록",
      body: "지난 날은 고를 수 없는 달력에서 방문 날짜를 고르고, 시간 · 인원 · 방문자 정보를 적습니다.",
      items: ["달력 · 오늘 단추", "시간 고르기 · 인원 더하기 · 빼기"],
      img: "/cases/real-estate-g/point-visit.webp",
      caption: "방문 등록",
    },
  ],
  detailsLabel: "자세히",
  detailsTitle: "만들 때 신경 쓴 것",
  details: [
    {
      title: "화면 폭마다 따로 짠 배치",
      body: "넓은 화면, 태블릿, 모바일 배치를 따로 짰습니다. 좁은 화면에서는 머리글이 전체 메뉴 단추로 바뀌고, 매장 카드는 한 줄에 두 개씩, 층별 안내 탭은 두 개씩 줄을 바꿉니다.",
    },
    {
      title: "매장 · 이벤트 · 소식을 한 틀로",
      body: "매장 91곳, 이벤트, 이야기 29편, 보도 45건은 같은 틀의 쪽이라 글과 사진만 바꾸면 늘리거나 줄일 수 있습니다. 검색은 이 쪽들을 모아 묶음별로 찾습니다.",
    },
    {
      title: "사진 자리마다 크기를 정해 두었습니다",
      body: "사진이 들어가는 자리마다 크기와 비율을 정해 두어, 단지 · 매장 사진으로 바꿔 넣어도 배치가 흐트러지지 않습니다. 층별 평면도 · 오시는 길 약도 · 동네 지도는 그림으로 그려 두었습니다.",
    },
  ],
  mobile: {
    title: "좁은 화면에서는 이렇게 됩니다",
    body: "머리글은 언어 · 지도 · 검색 · 전체 메뉴 단추만 남고, 매장 카드와 매장 사진은 한 줄에 두 개씩, 이벤트 카드는 한 줄에 하나씩 놓입니다.",
    shots: [
      { img: "/cases/real-estate-g/m-index.webp", caption: "메인" },
      { img: "/cases/real-estate-g/m-lifestyle.webp", caption: "Lifestyle" },
      { img: "/cases/real-estate-g/m-shop-5.webp", caption: "매장 상세" },
      { img: "/cases/real-estate-g/m-work.webp", caption: "Life in Elmwood" },
    ],
  },
  faq: [
    { q: "우리 단지 이름과 색으로 바꿀 수 있나요?", a: "네. 로고와 색, 문구를 모두 바꿔 드립니다. 지금 들어간 엘름우드는 디자인을 보여 드리려고 만든 가상 단지입니다." },
    { q: "매장 수가 적어도 쓸 수 있나요?", a: "네. 매장 상세는 같은 틀이라 매장 수에 맞춰 늘리거나 줄일 수 있고, 목록 · 검색 · 층별 안내도 함께 맞춥니다." },
    { q: "층별 평면도는 우리 건물 것으로 바꿀 수 있나요?", a: "네. 층별 도면을 주시면 층마다 매장 칸과 위치 핀을 그 도면에 맞춰 다시 그립니다." },
    { q: "방문 등록 · 문의 양식이 실제로 접수되나요?", a: "지금은 입력 확인과 안내 문구까지만 합니다. 실제로 접수를 받으시려면 메일 발송이나 관리 화면을 연결해 드립니다." },
    { q: "사진은 직접 준비해야 하나요?", a: "단지 전경 · 매장 · 공간 사진을 쓰시면 됩니다. 사진 자리마다 크기를 정해 두어 바꿔 넣기만 하면 됩니다." },
  ],
};

export default study;
