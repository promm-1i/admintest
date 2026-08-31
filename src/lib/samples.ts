import roadinImg from "@/assets/images/roadin_thumbnail.jpg";
import carplanImg from "@/assets/images/carplan_thumbnail.jpg";
import objetbathImg from "@/assets/images/objetbath_thumbnail.jpg";
import koreanRestaurantImg from "@/assets/images/korean_restaurant_no_people_1786182882900.jpg";
import beautySkincareImg from "@/assets/images/beauty_skincare_1786182932542.jpg";
import hospitalImg from "@/assets/images/hospital_tjaspdlf.jpg";
import interiorConstructionImg from "@/assets/images/interior_construction.jpg";
import moveInCleaningImg from "@/assets/images/move_in_cleaning.jpg";
import corporateImg from "@/assets/images/corporate.jpg";
import oleaImg from "@/assets/images/olea_thumbnail.jpg";
import movingImg from "@/assets/images/moving_thumbnail.jpg";
import mujinImg from "@/assets/images/mujin_thumbnail.jpg";
import auraImg from "@/assets/images/aura_thumbnail.jpg";
import nexmotionImg from "@/assets/images/nexmotion_thumbnail.jpg";

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
  /** 실제 배포된 사이트 URL이 있으면 상세페이지 미리보기 탭에서 iframe으로 그 사이트를 그대로 보여준다 */
  liveUrl?: string;
  /** 있으면 카드가 /samples/:slug 대신 이 경로로 연결된다 (예: 이미 자체 소개 페이지가 있는 플랫폼형 솔루션) */
  detailHref?: string;
  /** 있으면 상세 미리보기 상단에 관리자 시스템 데모로 가는 버튼이 함께 노출된다 */
  adminDemoHref?: string;
  /** type에 "basic-template"/"landing-template"가 있는 항목만 사용 — /templates 페이지의 업종 필터 값 */
  industryKey?: string;
};

/**
 * 최신순 정렬: 새 포트폴리오를 추가할 때는 배열 맨 앞(위)에 넣는다.
 * 메인 슬라이더/최근 노출 영역은 이 배열의 앞쪽 항목을 그대로 사용하고,
 * /samples 페이지 페이지네이션도 이 순서를 기준으로 6개씩 나눈다.
 */
export const SAMPLES: Sample[] = [
  {
    slug: "restaurant-basic-template",
    industry: "음식점 · 카페 홈페이지",
    title: "음식점 · 카페 홈페이지 (기본형 템플릿)",
    type: ["basic-template", "business"],
    tag: "기본형 템플릿 · 음식점 · 카페",
    purpose:
      "실시간 영업중 배지, 카테고리 메뉴판(점선 가격표), 오늘의 추천, 공간 소개, 예약 문의까지 — 메뉴판처럼 정갈하게 구성한 다이닝 템플릿입니다.",
    features: ["실시간 영업중 표시", "카테고리 메뉴판", "오늘의 추천", "전화 · 문자 예약"],
    idealFor: "메뉴와 분위기로 손님을 끌어오고 싶은 식당 · 카페 · 다이닝 바",
    image: "/thumbs/restaurant.jpg",
    liveUrl: "/templates/restaurant-basic/",
    industryKey: "restaurant",
  },
  {
    slug: "restaurant-landing-template",
    industry: "음식점 · 카페 홈페이지",
    title: "음식점 · 카페 홈페이지 (랜딩형 템플릿)",
    type: ["landing-template", "business"],
    tag: "랜딩형 템플릿 · 음식점 · 카페",
    purpose:
      "세리프 타이포와 스크롤 연출이 더해진 프리미엄 구성으로, 메뉴 감상에서 예약까지 자연스럽게 이어지는 다이닝 원페이지 템플릿입니다.",
    features: ["스크롤 애니메이션", "실시간 영업중 표시", "카테고리 메뉴판", "인원 선택 예약 문자"],
    idealFor: "브랜드 감도와 예약 전환을 함께 원하는 식당 · 카페 · 다이닝 바",
    image: "/thumbs/restaurant.jpg",
    liveUrl: "/templates/restaurant-landing/",
    industryKey: "restaurant",
  },
  {
    slug: "corporate-basic-template",
    industry: "기업 · 브랜드 홈페이지",
    title: "기업 · 브랜드 홈페이지 (기본형 템플릿)",
    type: ["basic-template", "business"],
    tag: "기본형 템플릿 · 기업 · 브랜드",
    purpose:
      "사업영역 · 핵심 지표 · 연혁 · 함께한 기업 · 뉴스룸 · 견적 문의로 구성된 B2B 기업 홈페이지 템플릿입니다. 과장 없이 숫자로 신뢰를 만듭니다.",
    features: ["사업영역 그리드", "핵심 지표 카운터", "연혁 타임라인", "견적 문의 폼"],
    idealFor: "제조 · 솔루션 · 전문 서비스 등 신뢰가 곧 영업인 B2B 기업",
    image: "/thumbs/corporate.jpg",
    liveUrl: "/templates/corporate-basic/",
    industryKey: "corporate",
  },
  {
    slug: "corporate-landing-template",
    industry: "기업 · 브랜드 홈페이지",
    title: "기업 · 브랜드 홈페이지 (랜딩형 템플릿)",
    type: ["landing-template", "business"],
    tag: "랜딩형 템플릿 · 기업 · 브랜드",
    purpose:
      "그라파이트 히어로와 그리드 연출의 스위스 스타일 구성으로, 회사 소개에서 견적 문의까지 이어지는 기업 원페이지 템플릿입니다.",
    features: ["스크롤 애니메이션", "지표 카운터", "연혁 타임라인", "다크 문의 섹션"],
    idealFor: "정제된 첫인상이 필요한 기업 · 브랜드 · 스타트업",
    image: "/thumbs/corporate.jpg",
    liveUrl: "/templates/corporate-landing/",
    industryKey: "corporate",
  },
  {
    slug: "interior-basic-template",
    industry: "인테리어 · 리모델링 홈페이지",
    title: "인테리어 · 리모델링 홈페이지 (기본형 템플릿)",
    type: ["basic-template", "business"],
    tag: "기본형 템플릿 · 인테리어",
    purpose:
      "프로젝트 갤러리 · 시공 전후 비교 · 주차별 공정 · 평형별 비용표 · 자재 기준 · FAQ까지, 도면처럼 정돈된 인테리어 업체 홈페이지 템플릿입니다.",
    features: ["시공 전후 비교 슬라이더", "평형별 비용 계산", "8주 공정 타임라인", "자재 기준 · A/S 보증"],
    idealFor: "견적 투명성과 포트폴리오로 신뢰를 쌓고 싶은 인테리어 · 리모델링 업체",
    image: "/thumbs/interior.jpg",
    liveUrl: "/templates/interior-basic/",
    industryKey: "interior",
  },
  {
    slug: "interior-landing-template",
    industry: "인테리어 · 리모델링 홈페이지",
    title: "인테리어 · 리모델링 홈페이지 (랜딩형 템플릿)",
    type: ["landing-template", "business"],
    tag: "랜딩형 템플릿 · 인테리어",
    purpose:
      "치수선 · 도면 모티프의 스크롤 연출이 더해진 프리미엄 구성으로, 프로젝트 감상에서 상담 신청까지 자연스럽게 이어지는 템플릿입니다.",
    features: ["스크롤 애니메이션", "시공 전후 비교 슬라이더", "평형별 비용 계산", "상담 신청 폼"],
    idealFor: "감각적인 첫인상과 상담 전환을 함께 원하는 인테리어 · 리모델링 업체",
    image: "/thumbs/interior.jpg",
    liveUrl: "/templates/interior-landing/",
    industryKey: "interior",
  },
  {
    slug: "rentcar-basic-template",
    industry: "렌트카 홈페이지",
    title: "렌트카 홈페이지 (기본형 템플릿)",
    type: ["basic-template", "business"],
    tag: "기본형 템플릿 · 렌트카",
    purpose:
      "차종 필터 라인업 · 대여료 계산기 · 장기렌트 요금표 · 보험 비교 · 이용 규정 · FAQ로 구성된 렌트카 업체 홈페이지 템플릿입니다.",
    features: ["차종 필터 라인업", "대여료 즉시 계산", "장기렌트 · 부가옵션", "보험 비교표"],
    idealFor: "요금을 투명하게 공개하고 전화 예약으로 연결하고 싶은 렌트카 업체",
    image: "/thumbs/rentcar.jpg",
    liveUrl: "/templates/rentcar-basic/",
    industryKey: "rentcar",
  },
  {
    slug: "rentcar-landing-template",
    industry: "렌트카 홈페이지",
    title: "렌트카 홈페이지 (랜딩형 템플릿)",
    type: ["landing-template", "business"],
    tag: "랜딩형 템플릿 · 렌트카",
    purpose:
      "번호판 · 차선 모티프의 스피드감 있는 스크롤 연출로, 차량 탐색에서 요금 계산 · 예약 전화까지 이어지는 원페이지 템플릿입니다.",
    features: ["스크롤 애니메이션", "차종 필터 라인업", "대여료 즉시 계산", "예약 전화 CTA"],
    idealFor: "젊은 감각의 브랜드 인상과 예약 전환을 원하는 렌트카 업체",
    image: "/thumbs/rentcar.jpg",
    liveUrl: "/templates/rentcar-landing/",
    industryKey: "rentcar",
  },
  {
    slug: "moving-basic-template",
    industry: "이사 · 청소업체 홈페이지",
    title: "이사 · 청소업체 홈페이지 (기본형 템플릿)",
    type: ["basic-template", "business"],
    tag: "기본형 템플릿 · 이사 · 청소",
    purpose:
      "간편 견적 계산기 · 작업 전후 비교 · 이사 준비표 · 보상 절차 · 요금 공개 · FAQ까지, 견적서처럼 투명하게 구성한 이사 · 청소업체 템플릿입니다.",
    features: ["30초 간편 견적", "작업 전후 비교 슬라이더", "이사 준비 체크리스트", "파손 보상 절차"],
    idealFor: "추가 요금 없는 투명한 견적을 강점으로 내세우는 이사 · 청소업체",
    image: "/thumbs/moving.jpg",
    liveUrl: "/templates/moving-basic/",
    industryKey: "moving",
  },
  {
    slug: "moving-landing-template",
    industry: "이사 · 청소업체 홈페이지",
    title: "이사 · 청소업체 홈페이지 (랜딩형 템플릿)",
    type: ["landing-template", "business"],
    tag: "랜딩형 템플릿 · 이사 · 청소",
    purpose:
      "견적 전표 · 테이프 · 손글씨 메모 등 현장의 물성을 살린 스크롤 연출로, 견적 계산에서 전화 상담까지 이어지는 원페이지 템플릿입니다.",
    features: ["스크롤 애니메이션", "30초 간편 견적", "작업 전후 비교 슬라이더", "전화 상담 CTA"],
    idealFor: "동네 업체다운 진정성과 견적 전환을 함께 원하는 이사 · 청소업체",
    image: "/thumbs/moving.jpg",
    liveUrl: "/templates/moving-landing/",
    industryKey: "moving",
  },
  {
    slug: "academy-basic-template",
    industry: "학원 홈페이지",
    title: "학원 홈페이지 (기본형 템플릿)",
    type: ["basic-template", "business"],
    tag: "기본형 템플릿 · 학원",
    purpose:
      "과정안내 · 커리큘럼 · 강사진 · 시간표 · 오시는 길 구성을 학년별로 정돈해 담은 학원 홈페이지 템플릿입니다.",
    features: ["학년별 과정 안내", "학습 관리 커리큘럼", "강사진 소개", "시간표 · 오시는 길"],
    idealFor: "수업 구성과 관리 방식을 신뢰감 있게 보여주고 상담 신청으로 연결하고 싶은 학원 · 교습소",
    image: "/thumbs/academy.jpg",
    liveUrl: "/templates/academy-basic/",
    industryKey: "academy",
  },
  {
    slug: "academy-landing-template",
    industry: "학원 홈페이지",
    title: "학원 홈페이지 (랜딩형 템플릿)",
    type: ["landing-template", "business"],
    tag: "랜딩형 템플릿 · 학원",
    purpose:
      "스크롤 연출이 더해진 원페이지 구성으로, 학년별 과정과 학습 관리 방식을 따라 읽다 자연스럽게 상담 신청까지 이어지는 학원 홈페이지 템플릿입니다.",
    features: ["스크롤 애니메이션", "학년별 과정 안내", "강사진 소개", "상담 신청 CTA"],
    idealFor: "학원의 관리 방식을 흐름 있게 보여주고 상담 전환율을 함께 끌어올리고 싶은 학원 · 교습소",
    image: "/thumbs/academy.jpg",
    liveUrl: "/templates/academy-landing/",
    industryKey: "academy",
  },
  {
    slug: "clinic-basic-template",
    industry: "병원 · 의원 홈페이지",
    title: "병원 · 의원 홈페이지 (기본형 템플릿)",
    type: ["basic-template", "business"],
    tag: "기본형 템플릿 · 병원 · 의원",
    purpose:
      "진료안내 · 의료진 · 둘러보기 · 진료시간 · 오시는길 구성을 차분하고 신뢰감 있게 담은 의원 홈페이지 템플릿입니다.",
    features: ["진료과목 안내", "의료진 소개", "시설 둘러보기", "진료시간 · 오시는 길"],
    idealFor: "신뢰감 있는 첫인상과 예약 문의 연결이 필요한 병 · 의원, 클리닉",
    image: "/thumbs/clinic.jpg",
    liveUrl: "/templates/clinic-basic/",
    industryKey: "hospital",
  },
  {
    slug: "clinic-landing-template",
    industry: "병원 · 의원 홈페이지",
    title: "병원 · 의원 홈페이지 (랜딩형 템플릿)",
    type: ["landing-template", "business"],
    tag: "랜딩형 템플릿 · 병원 · 의원",
    purpose:
      "스크롤 연출이 더해진 프리미엄 원페이지 구성으로, 방문자가 자연스럽게 예약 문의까지 이어지는 의원 홈페이지 템플릿입니다.",
    features: ["스크롤 애니메이션", "진료과목 안내", "의료진 소개", "온라인 예약 CTA"],
    idealFor: "브랜드 인상과 예약 전환율을 함께 끌어올리고 싶은 병 · 의원, 클리닉",
    image: "/thumbs/clinic.jpg",
    liveUrl: "/templates/clinic-landing/",
    industryKey: "hospital",
  },
  {
    slug: "real-estate-basic-template",
    industry: "부동산 중개업소 홈페이지",
    title: "부동산 홈페이지 (기본형 템플릿)",
    type: ["basic-template", "small-business"],
    tag: "기본형 템플릿 · 부동산",
    purpose:
      "거래유형 필터 매물 장부, 법정 중개보수 계산기, 거래 절차 안내, FAQ까지 — 매물이 많아 보이게 설계한 부동산 중개업소 홈페이지 템플릿입니다.",
    features: ["매물 장부 · 거래유형 필터", "중개보수 계산기", "거래 절차 안내", "FAQ · 오시는 길"],
    idealFor: "보유 매물을 전부 보여주고 방문 상담으로 연결하고 싶은 공인중개사사무소",
    image: "/thumbs/realestate.jpg",
    liveUrl: "/templates/realestate-basic/",
    industryKey: "real-estate",
  },
  {
    slug: "real-estate-landing-template",
    industry: "부동산 중개업소 홈페이지",
    title: "부동산 홈페이지 (랜딩형 템플릿)",
    type: ["landing-template", "small-business"],
    tag: "랜딩형 템플릿 · 부동산",
    purpose:
      "장부 넘기듯 매물을 훑는 스크롤 연출에 거래유형 필터, 중개보수 계산기, 도장 스탬프 디테일까지 더한 부동산 원페이지 템플릿입니다.",
    features: ["스크롤 애니메이션", "매물 장부 · 필터", "중개보수 계산기", "전화 상담 CTA"],
    idealFor: "매물 물량과 신뢰감을 동시에 보여주고 싶은 공인중개사사무소",
    image: "/thumbs/realestate.jpg",
    liveUrl: "/templates/realestate-landing/",
    industryKey: "real-estate",
  },
  {
    slug: "commercial-real-estate-platform",
    industry: "상업용 부동산 플랫폼",
    title: "상업용 부동산 플랫폼 구축",
    type: ["platform"],
    tag: "플랫폼 · 부동산",
    purpose:
      "지도 기반 매물 검색부터 상담 접수, 매물·고객·일정 관리까지 하나의 시스템으로 연결한 상업용 부동산 플랫폼 구축 사례입니다.",
    features: ["지도 기반 검색", "매물 관리", "관리자 CMS", "문의 CRM", "반응형"],
    idealFor:
      "매물 검색, 상담 접수부터 매물·고객·일정·직원 관리까지 하나의 시스템으로 운영하고 싶은 부동산 중개·분양 플랫폼",
    image: "/thumbs/realestate.jpg",
    detailHref: "/web-solutions/real-estate",
  },
  {
    slug: "hospital-solution",
    industry: "병원 · 의원 고객 + 관리자 시스템",
    title: "병원 · 의원 홈페이지 + 관리자 시스템",
    type: ["platform", "business"],
    tag: "플랫폼 · 병원 · 의원",
    purpose:
      "진료과목 · 의료진 · 공지를 관리자 페이지에서 등록하면 고객용 홈페이지에 실시간 반영되는 병원 · 의원 운영 시스템 구축 사례입니다.",
    features: ["진료과목 안내", "의료진 소개", "공지 · 이벤트 관리", "예약 문의 접수", "관리자 페이지"],
    idealFor: "홈페이지 콘텐츠를 직접 수정 · 운영하고 싶은 병 · 의원, 클리닉",
    image: "/thumbs/clinic.jpg",
    liveUrl: "/templates/clinic-landing/",
    adminDemoHref: "/web-solutions/hospital/demo",
  },
  {
    slug: "academy-solution",
    industry: "학원 고객 + 관리자 시스템",
    title: "학원 홈페이지 + 관리자 시스템",
    type: ["platform", "business"],
    tag: "플랫폼 · 학원",
    purpose:
      "개설 강의와 강사 정보를 관리자 페이지에서 등록 · 관리하고, 고객용 홈페이지에서 과목별로 탐색 · 상담 신청까지 이어지는 학원 운영 시스템 구축 사례입니다.",
    features: ["개설 강의 안내", "과목별 필터", "상담 신청 접수", "강의 · 강사 관리", "관리자 페이지"],
    idealFor: "강의 개설 · 마감을 수시로 업데이트해야 하는 학원 · 교습소",
    image: "/thumbs/academy.jpg",
    liveUrl: "/templates/academy-landing/",
    adminDemoHref: "/web-solutions/academy/demo",
  },
  {
    slug: "rentcar-solution",
    industry: "렌트카 고객 + 관리자 시스템",
    title: "렌트카 홈페이지 + 관리자 시스템",
    type: ["platform", "business"],
    tag: "플랫폼 · 렌트카",
    purpose:
      "차종 · 가격대 · 지점별 차량 검색과 상담 문의 접수, 차량 등록 · 관리까지 하나로 연결한 렌트카 운영 시스템 구축 사례입니다.",
    features: ["차량 검색 · 필터", "차량 등록 관리", "상담 문의 접수", "지점 안내", "관리자 페이지"],
    idealFor: "보유 차량을 직접 등록 · 관리하며 운영하고 싶은 렌터카 · 리스 업체",
    image: "/thumbs/rentcar.jpg",
    liveUrl: "https://roadin.netlify.app/",
    adminDemoHref: "/web-solutions/rentcar/demo",
  },
  {
    slug: "interior-solution",
    industry: "인테리어 고객 + 관리자 시스템",
    title: "인테리어 홈페이지 + 관리자 시스템",
    type: ["platform", "business"],
    tag: "플랫폼 · 인테리어",
    purpose:
      "평형대별 시공 사례를 관리자 페이지에서 등록하면 고객용 홈페이지에 바로 반영되고, 견적 문의 접수까지 이어지는 인테리어 운영 시스템 구축 사례입니다.",
    features: ["시공 사례 관리", "평형대별 필터", "견적 문의 접수", "관리자 페이지"],
    idealFor: "시공 사례를 계속 쌓아가며 영업 자산으로 쓰고 싶은 인테리어 · 리모델링 업체",
    image: "/thumbs/interior.jpg",
    liveUrl: "https://objetbath.netlify.app/",
    adminDemoHref: "/web-solutions/interior/demo",
  },
  {
    slug: "moving-solution",
    industry: "이사 · 청소 고객 + 관리자 시스템",
    title: "이사 · 청소 홈페이지 + 관리자 시스템",
    type: ["platform", "small-business"],
    tag: "플랫폼 · 이사 · 청소",
    purpose:
      "서비스 안내와 지역별 작업 사례를 관리자 페이지에서 관리하고, 견적 문의 접수로 이어지는 이사 · 청소 업체 운영 시스템 구축 사례입니다.",
    features: ["서비스 안내", "지역별 작업 사례 관리", "견적 문의 접수", "관리자 페이지"],
    idealFor: "작업 사례와 견적 문의를 체계적으로 관리하고 싶은 이사 · 청소 업체",
    image: "/thumbs/moving.jpg",
    detailHref: "/web-solutions/moving",
  },
  {
    slug: "roadin-rentcar",
    industry: "렌터카 홈페이지",
    title: "멀티브랜드 렌터카 홈페이지",
    type: ["business"],
    tag: "기업 · 렌터카",
    purpose: "국산부터 수입차까지 조건별로 차량을 비교하고 견적을 받을 수 있는 멀티브랜드 렌터카 비교 플랫폼 홈페이지 포트폴리오입니다.",
    features: ["조건별 차량 필터링", "차급별 요금 비교표", "전국 지점 안내", "실시간 견적 신청"],
    idealFor: "다양한 차량 재고를 한눈에 비교해서 보여주고 싶은 렌터카·리스 업체",
    image: roadinImg,
    liveUrl: "https://roadin.netlify.app/",
  },
  {
    slug: "carplan-rentcar",
    industry: "장기렌트카 홈페이지",
    title: "장기렌트카 상담 홈페이지",
    type: ["business"],
    tag: "기업 · 장기렌트",
    purpose: "실시간 계약 현황과 고객 후기로 신뢰감을 전달하고 장기렌트·리스 상담으로 자연스럽게 연결하는 렌터카 홈페이지 포트폴리오입니다.",
    features: ["실시간 계약 카운터", "차종별 월 렌트료 비교", "고객 후기 슬라이더", "무심사 상담 프로그램 안내"],
    idealFor: "신뢰 지표와 실시간성으로 상담 전환을 높이고 싶은 장기렌트·리스 업체",
    image: carplanImg,
    liveUrl: "https://carplanrentcar.netlify.app/",
  },
  {
    slug: "objetbath",
    industry: "욕실 리모델링 홈페이지",
    title: "욕실 리모델링 홈페이지",
    type: ["business", "portfolio"],
    tag: "기업 · 리모델링",
    purpose: "아파트 욕실 리모델링 상담부터 시공, 마감 점검까지 전문적으로 안내하는 욕실 리모델링 브랜드 홈페이지 포트폴리오입니다.",
    features: ["시공 사례 Before/After", "패키지별 견적 비교", "온라인 예산 계산기", "카카오톡 사진 상담"],
    idealFor: "시공 전후 비교와 신뢰감 있는 상담 과정을 보여주고 싶은 인테리어·리모델링 업체",
    image: objetbathImg,
    liveUrl: "https://objetbath.netlify.app/",
  },
  {
    slug: "nexmotion",
    industry: "제조/자동화 기업 홈페이지",
    title: "제조/자동화 기업 홈페이지",
    type: ["business"],
    tag: "기업 · 산업 자동화",
    purpose: "로봇 자동화, AI Vision, 스마트팩토리 솔루션을 기술 중심으로 신뢰감 있게 전달하는 제조/자동화 기업 홈페이지 포트폴리오입니다.",
    features: ["솔루션/장비 라인업 소개", "산업별 적용 사례", "공정 단계 스토리텔링", "프로젝트 문의 폼"],
    idealFor: "기술력과 전문성을 강조하고 싶은 제조·엔지니어링·B2B 기업",
    image: nexmotionImg,
    liveUrl: "https://nexmotion.netlify.app/",
  },
  {
    slug: "moving-company",
    industry: "이삿짐센터 홈페이지",
    title: "이삿짐센터 홈페이지",
    type: ["one-page", "small-business"],
    tag: "원페이지 · 소상공인",
    purpose: "서비스 종류와 신뢰 요소를 한눈에 보여주고 무료 견적 신청으로 자연스럽게 연결되는 이삿짐센터 홈페이지 포트폴리오입니다.",
    features: ["서비스 종류 안내", "무료 견적 신청 폼", "고객 후기 슬라이더", "전화/카카오 상담 연결"],
    idealFor: "견적 문의 전환이 중요한 이사·용달 서비스 업체",
    image: movingImg,
    liveUrl: "https://24com.netlify.app/design-1",
  },
  {
    slug: "mujin-shop",
    industry: "쇼핑몰 홈페이지",
    title: "쇼핑몰 홈페이지",
    type: ["business", "shopping-mall"],
    tag: "기업 · 쇼핑몰",
    purpose: "데일리 의류 브랜드의 제품 라인업과 사이즈 가이드를 감각적으로 담은 커머스형 쇼핑몰 홈페이지 포트폴리오입니다.",
    features: ["상품 상세/사이즈 가이드", "리뷰·후기 섹션", "회원 등급 혜택 안내", "뉴스레터 구독"],
    idealFor: "온라인으로 제품을 직접 판매하고 싶은 패션·리테일 브랜드",
    image: mujinImg,
    liveUrl: "https://mujinshop.netlify.app/",
  },
  {
    slug: "aura-academy",
    industry: "입시학원 홈페이지",
    title: "입시학원 홈페이지",
    type: ["business"],
    tag: "기업 · 교육",
    purpose: "1:1 학습 진단과 맞춤 커리큘럼을 신뢰감 있게 전달하는 프리미엄 입시학원 홈페이지 포트폴리오입니다.",
    features: ["학습 진단 프로그램 소개", "커리큘럼 안내", "상담 신청 폼", "레벨테스트 연결"],
    idealFor: "전문성과 신뢰감을 강조하고 싶은 입시·교육 브랜드",
    image: auraImg,
    liveUrl: "https://aura-academy.netlify.app/",
  },
  {
    slug: "olea-food-brand",
    industry: "식품 브랜드 홈페이지",
    title: "식품 브랜드 홈페이지",
    type: ["business"],
    tag: "기업 · 식품 브랜드",
    purpose: "프리미엄 올리브오일 브랜드의 제품 라인업과 브랜드 스토리를 감각적으로 담은 식품 브랜드 홈페이지 포트폴리오입니다.",
    features: ["제품 라인업 소개", "브랜드 스토리텔링", "쇼핑몰형 구매 연결", "뉴스레터 구독"],
    idealFor: "제품과 브랜드 감성을 함께 보여주고 싶은 식품·리테일 브랜드",
    image: oleaImg,
    liveUrl: "https://oleaoil.netlify.app/",
  },
  {
    slug: "hospital",
    industry: "병원 홈페이지",
    title: "병원 홈페이지",
    type: ["business"],
    tag: "기업",
    purpose: "진료 정보, 의료진 소개, 위치 안내를 신뢰감 있게 정리한 병원 / 의원형 홈페이지 포트폴리오입니다.",
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
    purpose: "시술 이미지와 매장 분위기를 중심으로 구성해 예약 문의로 이어지도록 설계한 뷰티 업종 홈페이지 포트폴리오입니다.",
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
    purpose: "메뉴와 매장 분위기를 중심으로 구성하고 전화 / 지도 / 예약으로 자연스럽게 연결되는 외식업 홈페이지 포트폴리오입니다.",
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
    purpose: "시공 사례와 전문성을 중심으로 보여주는 건설 / 인테리어 업종 홈페이지 포트폴리오입니다.",
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
    purpose: "서비스 범위, 작업 전후 이미지, 문의 연결을 한 페이지 흐름으로 정리한 청소 서비스 홈페이지 포트폴리오입니다.",
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

/**
 * 포트폴리오(=실제 제작 사례) 목록. 판매용 템플릿(industryKey 항목)은 랜딩형만 대표로
 * 포함한다(기본형은 디자인이 같아 카드가 중복돼 보이므로 /templates에서만 노출).
 * 새 템플릿을 SAMPLES에 추가하면 포트폴리오·메인 슬라이더에 자동 반영된다.
 */
export const PORTFOLIO_SAMPLES: Sample[] = SAMPLES.filter(
  (s) => !s.industryKey || s.type?.includes("landing-template"),
);

/**
 * 메인페이지 PORTFOLIO 섹션에 고정 노출하는 업종별 대표 사례 6건.
 * 새 포트폴리오를 배열 앞에 추가해도 메인 화면 구성이 밀리지 않도록 슬러그로 고정한다.
 * (필터를 선택했을 때는 아래 고정 목록 대신 해당 분류 전체에서 보여준다.)
 */
const MAIN_PORTFOLIO_SLUGS = [
  "commercial-real-estate-platform",
  "hospital-solution",
  "academy-solution",
  "rentcar-solution",
  "interior-solution",
  "moving-solution",
];

export const MAIN_PORTFOLIO_SAMPLES: Sample[] = MAIN_PORTFOLIO_SLUGS.map(
  (slug) => PORTFOLIO_SAMPLES.find((s) => s.slug === slug),
).filter((s): s is Sample => Boolean(s));

/**
 * 메인 슬라이더: 고정 6건 뒤에 나머지 포트폴리오 전체를 자동으로 이어 붙인다.
 * SAMPLES에 항목을 추가/수정하면 별도 작업 없이 메인 슬라이더에도 반영된다.
 * roadin · objetbath는 위 솔루션 카드와 같은 사이트라 중복 노출을 피하려고 제외한다.
 */
const CAROUSEL_EXCLUDED_SLUGS = ["roadin-rentcar", "objetbath"];

export const MAIN_PORTFOLIO_CAROUSEL: Sample[] = [
  ...MAIN_PORTFOLIO_SAMPLES,
  ...PORTFOLIO_SAMPLES.filter(
    (s) => !MAIN_PORTFOLIO_SLUGS.includes(s.slug) && !CAROUSEL_EXCLUDED_SLUGS.includes(s.slug),
  ),
];

export const PORTFOLIO_FILTERS = [
  { label: "전체", value: "all" },
  { label: "플랫폼·시스템", value: "platform" },
  { label: "원페이지", value: "one-page" },
  { label: "소상공인", value: "small-business" },
  { label: "기업", value: "business" },
  { label: "쇼핑몰", value: "shopping-mall" },
  { label: "포트폴리오", value: "portfolio" },
  { label: "리뉴얼", value: "renewal" },
];

/**
 * 업종 key → 표시 라벨. 새 업종 템플릿을 추가할 때 여기에 라벨을 넣고 SAMPLES 항목에
 * industryKey를 지정하면, /templates 업종 필터에 자동으로 칩이 하나 늘어난다.
 */
const TEMPLATE_INDUSTRY_LABELS: Record<string, string> = {
  "real-estate": "부동산",
  rentcar: "렌트카",
  hospital: "병원·의원",
  academy: "학원",
  interior: "인테리어·리모델링",
  moving: "이사·청소업체",
  restaurant: "음식점·카페",
  corporate: "기업·브랜드",
};

/** 실제로 템플릿이 존재하는 업종만 필터로 노출한다 (준비 안 된 업종 칩을 띄우지 않는다). */
export const TEMPLATE_INDUSTRY_FILTERS = [
  { label: "전체", value: "all" },
  ...Object.entries(TEMPLATE_INDUSTRY_LABELS)
    .filter(([key]) => SAMPLES.some((s) => s.industryKey === key))
    .map(([value, label]) => ({ label, value })),
];

export function getSampleBySlug(slug: string): Sample | undefined {
  return SAMPLES.find((s) => s.slug === slug);
}
