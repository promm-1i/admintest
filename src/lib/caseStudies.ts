/**
 * 프리미엄 디자인 상세를 "사례 소개"형으로 보여줄 때 쓰는 내용.
 * 여기 슬러그가 있으면 SampleDetail 이 기존 설명서형 대신 PremiumCaseStudy 로 그린다.
 * 화면 이미지는 public/cases/<폴더>/ 에 템플릿 실물을 캡처해 둔다.
 */
export type CaseStudy = {
  /** 템플릿 속 브랜드 이름 (가상 브랜드) */
  brand: string;
  headline: string;
  summary: string;
  /** 템플릿 대표색 — 목업 띠·번호 원에만 쓴다 */
  brandColor: string;
  tintColor: string;
  overview: string;
  meta: { label: string; value: string }[];
  mainShot: string;
  points: { title: string; body: string; img: string; caption: string }[];
  mobile: { title: string; body: string; shots: { img: string; caption: string }[] };
  faq: { q: string; a: string }[];
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "rentcar-f-template": {
    brand: "두루카",
    headline: "카셰어링 홈페이지",
    summary:
      "날짜와 장소부터 고르게 하는 카셰어링 홈페이지입니다. 차고지를 찾고, 지도에서 차를 고르고, 요금을 확인해 예약하는 흐름을 다섯 쪽에 나눠 담았습니다.",
    brandColor: "rgb(13,110,104)",
    tintColor: "rgb(219,240,237)",
    overview:
      "두루카는 시간 단위로 차를 빌려 쓰는 카셰어링 서비스를 가정하고 만든 디자인입니다. 첫 화면에 긴 소개 대신 검색 바를 두어, 들어오자마자 어디서 언제 빌릴지부터 고르게 했습니다. 그 아래로 제주 차고지의 장점, 회원 혜택, 전국 지역과 공항 · 기차역 차고지, 여행 정보가 이어집니다. 색은 짙은 청록 한 가지만 쓰고 나머지는 흰색과 옅은 회색으로 비워 두어 사진과 가격이 먼저 눈에 들어옵니다.",
    meta: [
      { label: "업종", value: "렌터카 · 카셰어링" },
      { label: "페이지 구성", value: "5쪽 · 메인, 차 빌리기, 차량 안내, 블로그 목록, 블로그 본문" },
      { label: "이런 곳에 맞습니다", value: "카셰어링 업체, 렌터카 지점, 관광지 렌터카" },
    ],
    mainShot: "/cases/rentcar-f/main.jpg",
    points: [
      {
        title: "지역 16곳과 차고지를\n한 화면에 펼쳤습니다",
        body: "‘어디로 가시나요?’ 아래에 지역 16곳을 같은 크기 칸으로 나란히 두고, 칸마다 대표 차고지를 한 줄로 적었습니다. 인기 지역에는 작은 표시만 붙였습니다. 이어서 편도 반납 · 전국 차고지 · 장기 할인 · 적립금 네 가지를 아이콘 한 줄로 정리했고, 그 아래로 공항과 기차역 근처 차고지 목록이 같은 격자로 이어집니다.",
        img: "/cases/rentcar-f/point-regions.jpg",
        caption: "메인 · 지역과 차고지",
      },
      {
        title: "차 목록과 지도를\n나란히 붙였습니다",
        body: "차 빌리기 화면은 왼쪽에 차량 목록, 오른쪽에 지도를 둡니다. 지도의 숫자 핀은 차고지마다 빌릴 수 있는 차 대수입니다. 목록 위의 경차 · 중형 · SUV · 승합 · 전기차 버튼을 누르면 목록이 실제로 걸러지고, 제목 옆 차량 대수도 함께 바뀝니다. 차마다 차종 · 인승 · 연료와 4시간 요금을 한 칸에 담았습니다.",
        img: "/cases/rentcar-f/point-map.jpg",
        caption: "차 빌리기 · 목록과 지도",
      },
      {
        title: "사진 세 장, 사양 여덟 줄,\n요금표 다섯 단",
        body: "차량 안내 화면은 외관 · 실내 · 트렁크 사진을 한 번에 보여 주고, 오른쪽에 차고지와 시간을 고르는 예약 상자를 붙였습니다. 아래로 내려도 예약 상자는 화면에 따라옵니다. 사양은 차종부터 반납 방법까지 여덟 줄 표로, 요금은 4시간부터 3일 이상까지 평일과 주말을 나눠 적었습니다.",
        img: "/cases/rentcar-f/point-car.jpg",
        caption: "차량 안내 · 사진과 예약 상자",
      },
    ],
    mobile: {
      title: "휴대폰에서는 배치를 다시 짰습니다",
      body: "PC 화면을 그대로 줄이지 않았습니다. 검색 바는 세로로 쌓고, 차량 목록은 사진을 작게 줄여 한 화면에 여러 대가 보이게 했습니다. 차량 안내는 사진 아래로 사양 표가 바로 이어집니다.",
      shots: [
        { img: "/cases/rentcar-f/m-index.jpg", caption: "메인" },
        { img: "/cases/rentcar-f/m-places.jpg", caption: "차 빌리기" },
        { img: "/cases/rentcar-f/m-car.jpg", caption: "차량 안내" },
      ],
    },
    faq: [
      {
        q: "지점이 한 곳뿐인 렌터카도 쓸 수 있나요?",
        a: "네. 지역 · 공항 · 기차역 칸은 지점 수에 맞춰 줄이거나 뺍니다. 지점이 한 곳이면 메인의 차고지 칸 대신 오시는 길과 보유 차량을 보여 주는 구성으로 바꿔 제작합니다.",
      },
      {
        q: "차량과 요금은 누가 바꾸나요?",
        a: "관리자 화면에서 직접 바꾸실 수 있게 만듭니다. 차량 · 요금 · 차고지 가운데 어떤 항목을 관리하실지는 상담 때 정합니다.",
      },
      {
        q: "실제로 예약과 결제까지 되나요?",
        a: "이 화면의 예약하기 버튼은 보여 드리기용입니다. 제작할 때는 예약 신청을 받아 관리자 화면과 문자로 알려 드리는 방식이 기본이고, 카드 결제나 기존 예약 시스템 연동이 필요하면 상담 때 따로 정합니다.",
      },
      {
        q: "지도는 어떤 것을 쓰나요?",
        a: "이 화면에는 구글 지도를 넣었습니다. 국내 고객이 대부분이면 카카오맵이나 네이버 지도로 바꿔 제작합니다.",
      },
    ],
  },
};
