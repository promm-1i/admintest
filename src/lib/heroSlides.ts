export type HeroSlide = {
  id: string;
  video: string;
  poster: string;
  /** 모바일 밴드에서 영상의 핵심 영역이 잘리지 않도록 잡아주는 object-position */
  mobileObjectPosition: string;
  title: [string, string];
  subtitle: string;
  highlights: [string, string, string];
  ctaPrimary: { label: string; to: string };
  ctaSecondary: { label: string; to: string };
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "design",
    video: "/videos/hero-1.mp4",
    poster: "/videos/hero-1-poster.jpg",
    mobileObjectPosition: "68% center",
    title: ["기획부터 디자인", "직접 만듭니다."],
    subtitle: "레이아웃 설계부터 실제 화면 디자인까지, 만드는 과정을 한 번에 진행합니다.",
    highlights: ["요구사항에 맞춘 기획·디자인", "완성된 화면 그대로 확인", "필요한 페이지만 구성"],
    ctaPrimary: { label: "제작 상담하기", to: "/contact" },
    ctaSecondary: { label: "포트폴리오 보기", to: "/samples" },
  },
  {
    id: "admin",
    video: "/videos/hero-2.mp4",
    poster: "/videos/hero-2-poster.jpg",
    mobileObjectPosition: "68% center",
    title: ["홈페이지에서", "끝나지 않습니다."],
    subtitle: "관리자 페이지부터 문의·예약·고객관리까지, 실제 운영에 필요한 기능을 함께 구축합니다.",
    highlights: ["관리자 페이지 직접 구축", "문의·예약·고객관리 기능 연동", "업종에 맞춘 맞춤 기능 개발"],
    ctaPrimary: { label: "기능 자세히 보기", to: "/website/features" },
    ctaSecondary: { label: "구축 문의하기", to: "/contact" },
  },
  {
    id: "responsive",
    video: "/videos/hero-3.mp4",
    poster: "/videos/hero-3-poster.jpg",
    mobileObjectPosition: "75% center",
    title: ["어떤 화면에서도", "제대로 보이게."],
    subtitle: "화면 크기에 맞춰 자연스럽게 작동하는 반응형 홈페이지를 제작합니다.",
    highlights: ["PC·모바일 100% 반응형 최적화", "화면 크기별 자동 최적화", "터치 환경까지 고려한 설계"],
    ctaPrimary: { label: "제작 방식 보기", to: "/website/process" },
    ctaSecondary: { label: "상담 문의", to: "/contact" },
  },
];
