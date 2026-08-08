export type Sample = {
  slug: string;
  industry: string;
  title: string;
  purpose: string;
  features: string[];
  idealFor: string;
  /** public/images 안의 정적 파일 경로 (파일이 없으면 자동으로 그라데이션 placeholder로 대체됨) */
  image?: string;
};

export const SAMPLES: Sample[] = [
  {
    slug: "hospital",
    industry: "병원 홈페이지",
    title: "진료과목·의료진·예약 안내 중심 구성",
    purpose: "환자가 진료과목과 위치, 운영시간을 빠르게 확인하고 예약 문의로 이어지도록 설계합니다.",
    features: ["진료과목 안내", "의료진 소개", "오시는 길/지도", "예약·전화 문의 버튼"],
    idealFor: "신뢰감 있는 정보 전달이 우선인 병·의원, 한의원",
    image: "/images/portfolio-clinic.webp",
  },
  {
    slug: "beauty",
    industry: "뷰티샵 홈페이지",
    title: "시술 메뉴와 시술 사진 중심 구성",
    purpose: "시술 종류와 가격을 명확히 보여주고, 카카오톡·전화 예약 문의로 자연스럽게 연결합니다.",
    features: ["시술 메뉴/가격표", "시술 사진 갤러리", "카카오톡 상담 연결", "오시는 길"],
    idealFor: "네일샵, 헤어샵, 피부관리실 등 예약 기반 매장",
    image: "/images/portfolio-beauty.webp",
  },
  {
    slug: "korean-restaurant",
    industry: "한식당 홈페이지",
    title: "메뉴와 매장 분위기를 보여주는 구성",
    purpose: "대표 메뉴와 가격, 매장 사진을 통해 방문 전 신뢰를 주고 위치 안내까지 연결합니다.",
    features: ["대표 메뉴 소개", "메뉴판/가격 안내", "매장 사진", "지도/전화 연결"],
    idealFor: "단골 확보와 신규 방문객 유입이 모두 필요한 식당",
    image: "/images/portfolio-restaurant.webp",
  },
  {
    slug: "interior-construction",
    industry: "인테리어 / 건설 홈페이지",
    title: "시공 사례 중심 포트폴리오형 구성",
    purpose: "시공 전후 사진과 진행 절차를 보여주어 상담 문의로 이어지는 구조를 만듭니다.",
    features: ["시공 사례 갤러리", "작업 절차 안내", "견적 문의 폼", "회사 소개"],
    idealFor: "시공 사례를 자산으로 활용하고 싶은 인테리어·건설업체",
    image: "/images/portfolio-interior.webp",
  },
  {
    slug: "move-in-cleaning",
    industry: "입주청소 홈페이지",
    title: "서비스 범위와 청소 전후 비교 중심 구성",
    purpose: "청소 범위와 가격 기준을 명확히 안내하고, 빠른 전화·카카오톡 문의로 연결합니다.",
    features: ["서비스 범위 안내", "청소 전후 사진", "빠른 전화/카카오톡 문의", "간단 견적 안내"],
    idealFor: "문의 전화 응대 부담을 줄이고 싶은 청소 업체",
  },
  {
    slug: "corporate",
    industry: "기업 소개 홈페이지",
    title: "사업 영역과 회사 정보 중심 구성",
    purpose: "사업 영역, 연혁, 연락처를 정리해 회사에 대한 신뢰를 주는 정보 전달형 구성입니다.",
    features: ["사업 영역 소개", "회사 연혁/개요", "오시는 길", "문의 폼"],
    idealFor: "홈페이지가 없거나 정보가 오래된 중소기업, 스타트업",
  },
];

export function getSampleBySlug(slug: string): Sample | undefined {
  return SAMPLES.find((s) => s.slug === slug);
}
