import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Send, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { INDUSTRY_SHOWCASES } from "@/components/site/industryShowcase";
import { cn } from "@/lib/utils";
import {
  UtensilsCrossed,
  Briefcase,
  Scissors,
  Dumbbell,
  TreePine,
  Smile,
  PawPrint,
  Camera,
  Calculator,
  Wrench,
  Flower2,
  type LucideIcon,
} from "lucide-react";

/** 업종 key → 우측 프리뷰에 띄우는 실물 캐처 (/thumbs/, 템플릿 갱신 시 자동 최신화) */
const INDUSTRY_PREVIEWS: Record<string, string> = {
  "real-estate": "/thumbs/realestate.jpg",
  rentcar: "/thumbs/rentcar.jpg",
  hospital: "/thumbs/clinic.jpg",
  academy: "/thumbs/academy.jpg",
  interior: "/thumbs/interior.jpg",
  moving: "/thumbs/moving.jpg",
};

/** 관리자 솔루션 없이 템플릿으로 시작하는 업종 — 리스트 아래쪽에 이어서 노출한다 */
type TemplateIndustry = {
  key: string;
  name: string;
  icon: LucideIcon;
  img: string;
  href: string;
  title: string;
  note: string;
  points: string[];
};

const TEMPLATE_INDUSTRIES: TemplateIndustry[] = [
  { key: "restaurant", name: "음식점 · 카페", icon: UtensilsCrossed, img: "/thumbs/restaurant.jpg", href: "/templates?industry=restaurant", title: "음식점 · 카페 홈페이지", note: "실시간 영업중 배지와 메뉴판, 예약 문의까지 메뉴판처럼 정갈하게 담습니다.", points: ["실시간 영업중 표시", "카테고리 메뉴판", "오늘의 추천", "예약 문의 문자"] },
  { key: "corporate", name: "기업 · 브랜드", icon: Briefcase, img: "/thumbs/corporate.jpg", href: "/templates?industry=corporate", title: "기업 · 브랜드 홈페이지", note: "사업영역 · 지표 · 연혁으로 과장 없이 숫자로 신뢰를 만드는 B2B 구성입니다.", points: ["사업영역 그리드", "핵심 지표", "연혁 타임라인", "견적 문의"] },
  { key: "beauty", name: "미용실 · 뷰티샵", icon: Scissors, img: "/thumbs/beauty.jpg", href: "/templates?industry=beauty", title: "미용실 · 뷰티샵 홈페이지", note: "시술 가격 메뉴판과 스타일 갤러리, 디자이너 지명 예약까지 이어집니다.", points: ["시술 가격 메뉴판", "스타일 갤러리", "디자이너 지명 예약", "이용 안내"] },
  { key: "fitness", name: "필라테스 · 헬스", icon: Dumbbell, img: "/thumbs/fitness.jpg", href: "/templates?industry=fitness", title: "필라테스 · 헬스장 홈페이지", note: "요일별 시간표와 회원권 가격표를 투명하게 열고 체험 신청으로 연결합니다.", points: ["주간 시간표", "회원권 가격표", "코치 소개", "체험 신청 문자"] },
  { key: "stay", name: "펜션 · 스테이", icon: TreePine, img: "/thumbs/stay.jpg", href: "/templates?industry=stay", title: "펜션 · 스테이 홈페이지", note: "객실별 요금과 이용 안내를 정직하게 보여주고 직접 예약 문의를 받습니다.", points: ["객실별 요금", "성수기 · 취소 규정", "이용 안내", "날짜 · 인원 예약 문자"] },
  { key: "dental", name: "치과", icon: Smile, img: "/thumbs/dental.jpg", href: "/templates?industry=dental", title: "치과 홈페이지", note: "임플란트 단계 안내와 비급여 진료비 표로 과쟉진료 걱정을 덜어줍니다.", points: ["실시간 진료중 표시", "임플란트 단계 안내", "비급여 진료비 표", "진료 예약 문자"] },
  { key: "vet", name: "동물병원", icon: PawPrint, img: "/thumbs/vet.jpg", href: "/templates?industry=vet", title: "동물병원 홈페이지", note: "진료 · 미용 · 호텔 요금과 접종 스케줄을 보호자에게 투명하게 안내합니다.", points: ["진료 · 미용 · 호텔 요금표", "접종 스케줄", "야간 응급 안내", "예약 문자"] },
  { key: "photo", name: "사진관 · 스튜디오", icon: Camera, img: "/thumbs/photo.jpg", href: "/templates?industry=photo", title: "사진관 · 스튜디오 홈페이지", note: "다크 갤러리 톤으로 작품과 촬영 상품 가격을 함께 보여줍니다.", points: ["작품 갤러리", "촬영 상품 가격표", "촬영 과정 안내", "촬영 예약 문자"] },
  { key: "tax", name: "세무사 · 회계", icon: Calculator, img: "/thumbs/tax.jpg", href: "/templates?industry=tax", title: "세무사·회계사무소 홈페이지", note: "기장료 요금표와 월별 세무 일정으로 수임 문의를 만드는 구성입니다.", points: ["기장료 요금표", "세무 일정 캘린더", "업무 안내", "상담 문자"] },
  { key: "auto", name: "자동차정비소", icon: Wrench, img: "/thumbs/auto.jpg", href: "/templates?industry=auto", title: "자동차정비소 홈페이지", note: "부품·공임 분리 공임표와 견적 승인 원칙으로 신뢰를 만드는 정비소 구성입니다.", points: ["공임표", "오일 패키지", "작업 과정", "정비 예약 문자"] },
  { key: "flower", name: "꽃집 · 플라워샵", icon: Flower2, img: "/thumbs/flower.jpg", href: "/templates?industry=flower", title: "꽃집·플라워샵 홈페이지", note: "용도별 상품 가격과 당일배달 안내로 문자 주문을 늘리는 구성입니다.", points: ["용도별 상품 가격", "당일배달 표시", "정기구독", "주문 문자"] },
];

/**
 * 좌측 업종 리스트에 마우스를 올리면(클릭 · 포커스 동일) 우측 프리뷰가
 * 해당 업종의 실제 구축 화면과 관리 항목으로 바뀐다.
 */
export function WebSolutionTeaserSection() {
  const [activeKey, setActiveKey] = useState(INDUSTRY_SHOWCASES[0]!.key);
  const activeSolution = INDUSTRY_SHOWCASES.find((s) => s.key === activeKey);
  const activeTemplate = TEMPLATE_INDUSTRIES.find((t) => t.key === activeKey);
  const active = activeSolution
    ? {
        name: activeSolution.name,
        img: INDUSTRY_PREVIEWS[activeSolution.key]!,
        href: activeSolution.solutionHref,
        title: activeSolution.heroTitle,
        note: activeSolution.connectionNote,
        points: activeSolution.manageables.slice(0, 4),
        badge: "홈페이지 + 관리자",
      }
    : {
        name: activeTemplate!.name,
        img: activeTemplate!.img,
        href: activeTemplate!.href,
        title: activeTemplate!.title,
        note: activeTemplate!.note,
        points: activeTemplate!.points,
        badge: "템플릿 · 맞춤 제작",
      };

  return (
    <section id="industry-section" className="px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-[1400px] rounded-3xl border border-border bg-secondary/30 p-5 sm:p-8">
        <SectionHeader
          label="CUSTOM BY INDUSTRY"
          title={
            <>
              업종에 맞게 바로 쓰는
              <br />
              맞춤형 웹솔루션
            </>
          }
          description={
            <>
              렌트카, 부동산처럼 고객 문의와 관리 기능이 중요한 업종에 맞춰 홈페이지와
              <br />
              관리자 시스템을 함께 구축합니다.
            </>
          }
        />

        <div className="mt-8 grid gap-5 lg:grid-cols-[235px_1fr]">
          {/* 업종 리스트 — 모바일에서는 가로 스크롤 칩, 데스크톱에서는 세로 목록 */}
          <ul className="flex gap-2 overflow-x-auto pb-1 scrollbar-none lg:max-h-[560px] lg:flex-col lg:gap-1 lg:overflow-y-auto lg:overscroll-contain lg:pb-0 lg:pr-1">
            <li className="hidden px-4 pb-1 text-[11px] font-bold tracking-wide text-muted-foreground/70 lg:block">
              홈페이지 + 관리자 시스템
            </li>
            {INDUSTRY_SHOWCASES.map((industry) => {
              const Icon = industry.icon;
              const isActive = industry.key === activeKey;
              return (
                <li key={industry.key} className="shrink-0 lg:shrink">
                  <button
                    type="button"
                    onMouseEnter={() => setActiveKey(industry.key)}
                    onFocus={() => setActiveKey(industry.key)}
                    onClick={() => setActiveKey(industry.key)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors lg:py-3.5",
                      isActive
                        ? "border-primary/40 bg-card shadow-xs"
                        : "border-transparent text-muted-foreground hover:bg-card/70",
                    )}
                  >
                    <Icon
                      className={cn("h-5 w-5 shrink-0", isActive ? "text-primary" : "text-muted-foreground/60")}
                      strokeWidth={1.5}
                    />
                    <span
                      className={cn(
                        "whitespace-nowrap text-sm font-semibold",
                        isActive ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {industry.name}
                    </span>
                    <ArrowRight
                      className={cn(
                        "ml-auto hidden h-3.5 w-3.5 transition-opacity lg:block",
                        isActive ? "text-primary opacity-100" : "opacity-0",
                      )}
                    />
                  </button>
                </li>
              );
            })}
            <li className="hidden border-t border-border/70 px-4 pb-1 pt-3 text-[11px] font-bold tracking-wide text-muted-foreground/70 lg:block">
              업종 템플릿 · 맞춤 제작
            </li>
            {TEMPLATE_INDUSTRIES.map((industry) => {
              const Icon = industry.icon;
              const isActive = industry.key === activeKey;
              return (
                <li key={industry.key} className="shrink-0 lg:shrink">
                  <button
                    type="button"
                    onMouseEnter={() => setActiveKey(industry.key)}
                    onFocus={() => setActiveKey(industry.key)}
                    onClick={() => setActiveKey(industry.key)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors lg:py-3",
                      isActive
                        ? "border-primary/40 bg-card shadow-xs"
                        : "border-transparent text-muted-foreground hover:bg-card/70",
                    )}
                  >
                    <Icon
                      className={cn("h-5 w-5 shrink-0", isActive ? "text-primary" : "text-muted-foreground/60")}
                      strokeWidth={1.5}
                    />
                    <span
                      className={cn(
                        "whitespace-nowrap text-sm font-semibold",
                        isActive ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {industry.name}
                    </span>
                    <ArrowRight
                      className={cn(
                        "ml-auto hidden h-3.5 w-3.5 transition-opacity lg:block",
                        isActive ? "text-primary opacity-100" : "opacity-0",
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* 선택된 업종의 실제 구축 화면 + 문구 */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <Link to={active.href} className="group block">
              <div className="relative overflow-hidden">
                <img
                  key={activeKey}
                  src={active.img}
                  alt={`${active.name} 구축 화면`}
                  className="aspect-[16/9] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300"
                />
                <span className="absolute left-4 top-4 rounded-full bg-black/65 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-xs">
                  {active.name} · 실제 구축 화면
                </span>
                <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground">
                  {active.badge}
                </span>
              </div>
            </Link>

            <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:justify-between sm:p-7">
              <div className="min-w-0">
                <h4 className="text-lg font-bold text-foreground">{active.title}</h4>
                <p className="mt-1.5 max-w-xl text-sm leading-relaxed text-muted-foreground break-keep">
                  {active.note}
                </p>
                <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5">
                  {active.points.map((m) => (
                    <li key={m} className="flex items-center gap-1.5 text-xs text-foreground/80">
                      <Check className="h-3 w-3 shrink-0 text-primary" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild className="shrink-0 gap-1.5 font-bold">
                <Link to={active.href}>
                  상세보기
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-wrap gap-3">
          <Button asChild className="gap-1.5 font-bold">
            <Link to="/web-solutions">
              기능 및 요금 보기
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-1.5">
            <Link to="/contact">
              <Send className="h-3.5 w-3.5" />
              구축 문의하기
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
