import koreanRestaurantImg from "@/assets/images/korean_restaurant_no_people_1786182882900.jpg";
import beautySkincareImg from "@/assets/images/beauty_skincare_1786182932542.jpg";
import hospitalImg from "@/assets/images/hospital_tjaspdlf.jpg";
import interiorConstructionImg from "@/assets/images/interior_construction.jpg";
import moveInCleaningImg from "@/assets/images/move_in_cleaning.jpg";
import corporateImg from "@/assets/images/corporate.jpg";

export type Sample = {
  slug: string;
  industry: string;
  title: string;
  type: string[];
  tag?: string;
  purpose: string;
  features: string[];
  idealFor: string;
  /** src/assets 번들 이미지 또는 public/images 정적 경로 (없으면 자동으로 그라데이션 placeholder로 대체됨) */
  image?: string;
};

export const SAMPLES: Sample[] = [
  {
    slug: "hospital",
    industry: "병원 홈페이지",
    title: "병원 홈페이지",
    type: ["business"],
    tag: "기업",
    purpose: "진료 정보, 의료진 소개, 위치 안내를 신뢰감 있게 정리한 병원 / 의원형 홈페이지 샘플입니다.",
    features: ["진료과목 안내", "의료진 소개", "오시는 길/지도", "예약·전화 문의 버튼"],
    idealFor: "신뢰감 있는 정보 전달이 우선인 병·의원, 한의원",
    image: hospitalImg,
  },
  {
    slug: "beauty",
    industry: "뷰티샵 홈페이지",
    title: "뷰티샵 홈페이지",
    type: ["small-business"],
    tag: "소상공인",
    purpose: "시술 이미지와 매장 분위기를 중심으로 구성해 예약 문의로 이어지도록 설계한 뷰티 업종 홈페이지 샘플입니다.",
    features: ["시술 메뉴/가격표", "시술 사진 갤러리", "카카오톡 상담 연결", "오시는 길"],
    idealFor: "네일샵, 헤어샵, 피부관리실 등 예약 기반 매장",
    image: beautySkincareImg,
  },
  {
    slug: "korean-restaurant",
    industry: "한식당 홈페이지",
    title: "한식당 홈페이지",
    type: ["small-business", "one-page"],
    tag: "소상공인 · 원페이지",
    purpose: "메뉴와 매장 분위기를 중심으로 구성하고 전화 / 지도 / 예약으로 자연스럽게 연결되는 외식업 홈페이지 샘플입니다.",
    features: ["대표 메뉴 소개", "메뉴판/가격 안내", "매장 사진", "지도/전화 연결"],
    idealFor: "단골 확보와 신규 방문객 유입이 모두 필요한 식당",
    image: koreanRestaurantImg,
  },
  {
    slug: "interior-construction",
    industry: "인테리어 / 건설 홈페이지",
    title: "인테리어 / 건설 홈페이지",
    type: ["business", "portfolio", "renewal"],
    tag: "기업 · 포트폴리오",
    purpose: "시공 사례와 전문성을 중심으로 보여주는 건설 / 인테리어 업종 홈페이지 샘플입니다.",
    features: ["시공 사례 갤러리", "작업 절차 안내", "견적 문의 폼", "회사 소개"],
    idealFor: "시공 사례를 자산으로 활용하고 싶은 인테리어·건설업체",
    image: interiorConstructionImg,
  },
  {
    slug: "move-in-cleaning",
    industry: "입주청소 홈페이지",
    title: "입주청소 홈페이지",
    type: ["one-page", "small-business"],
    tag: "원페이지 · 소상공인",
    purpose: "서비스 범위, 작업 전후 이미지, 문의 연결을 한 페이지 흐름으로 정리한 청소 서비스 홈페이지 샘플입니다.",
    features: ["서비스 범위 안내", "청소 전후 사진", "빠른 전화/카카오톡 문의", "간단 견적 안내"],
    idealFor: "문의 전화 응대 부담을 줄이고 싶은 청소 업체",
    image: moveInCleaningImg,
  },
  {
    slug: "corporate",
    industry: "기업 소개 홈페이지",
    title: "기업 소개 홈페이지",
    type: ["business", "renewal"],
    tag: "기업 · 리뉴얼",
    purpose: "사업 영역, 연혁, 연락처를 정리해 회사에 대한 신뢰를 주는 정보 전달형 구성입니다.",
    features: ["사업 영역 소개", "회사 연혁/개요", "오시는 길", "문의 폼"],
    idealFor: "홈페이지가 없거나 정보가 오래된 중소기업, 스타트업",
    image: corporateImg,
  },
];

export function getSampleBySlug(slug: string): Sample | undefined {
  return SAMPLES.find((s) => s.slug === slug);
}
