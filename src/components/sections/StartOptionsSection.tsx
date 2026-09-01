import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Send,
  Check,
  Building2,
  Car,
  HeartPulse,
  BookOpen,
  Hammer,
  PackageSearch,
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
  Scale,
  Lamp,
  HeartHandshake,
  Blocks,
  Flag,
  Palette,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { FadeIn } from "@/components/ui/FadeIn";
import { SAMPLES } from "@/lib/samples";
import { cn } from "@/lib/utils";

/**
 * 시작하는 방법은 두 가지뿐이라 한 섹션에서 대비시킨다.
 * 업종을 고르면 실제 구축 화면이 바뀌는 선택기가 이 섹션에서 가장 강한 요소라
 * 그것을 중심에 두고, 템플릿 규모(업종 수 · 시안 수)는 숫자로만 붙인다.
 */
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
  { key: "real-estate", name: "부동산", icon: Building2, img: "/thumbs/realestate.jpg", href: "/templates?industry=real-estate", title: "부동산 중개업소 홈페이지", note: "거래유형 필터 매물 장부와 중개보수 계산기로 매물이 많아 보이게 설계했습니다.", points: ["매물 장부 · 필터", "중개보수 계산기", "거래 절차", "상담 전화 CTA"] },
  { key: "rentcar", name: "렌트카", icon: Car, img: "/thumbs/rentcar.jpg", href: "/templates?industry=rentcar", title: "렌트카 홈페이지", note: "차종 필터와 대여료 즉시 계산으로 견적 문의까지 이어지는 구성입니다.", points: ["차종 필터 라인업", "대여료 계산", "보험 안내", "예약 문의"] },
  { key: "hospital", name: "병원 · 의원", icon: HeartPulse, img: "/thumbs/clinic.jpg", href: "/templates?industry=hospital", title: "병원 · 의원 홈페이지", note: "진료중 실시간 표시와 의료진 소개로 신뢰를 만들고 예약으로 연결합니다.", points: ["실시간 진료중 표시", "진료과목 안내", "의료진 소개", "예약 문의"] },
  { key: "academy", name: "학원", icon: BookOpen, img: "/thumbs/academy.jpg", href: "/templates?industry=academy", title: "학원 홈페이지", note: "학년별 과정과 오늘 시간표로 관리 방식을 보여주고 상담 신청을 받습니다.", points: ["학년별 과정", "오늘 시간표", "강사진 소개", "상담 신청"] },
  { key: "interior", name: "인테리어 · 리모델링", icon: Hammer, img: "/thumbs/interior.jpg", href: "/templates?industry=interior", title: "인테리어 · 리모델링 홈페이지", note: "시공 전후 슬라이더와 평형별 비용 계산으로 상담 신청을 만드는 구성입니다.", points: ["전후 비교 슬라이더", "평형별 비용", "시공 사례", "상담 신청"] },
  { key: "moving", name: "이사 · 청소업체", icon: PackageSearch, img: "/thumbs/moving.jpg", href: "/templates?industry=moving", title: "이사 · 청소업체 홈페이지", note: "30초 간편 견적과 작업 전후 비교로 전화 상담까지 이어집니다.", points: ["30초 간편 견적", "전후 비교", "작업 사례", "전화 상담 CTA"] },
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
  { key: "law", name: "법률사무소", icon: Scale, img: "/thumbs/law.jpg", href: "/templates?industry=law", title: "법률사무소 홈페이지", note: "수행 분야와 수임료 원칙을 투명하게 안내해 신뢰를 만드는 구성입니다.", points: ["수행 분야 목차", "진행 절차", "수임료 원칙", "비밀 상담"] },
  { key: "study", name: "스터디카페", icon: Lamp, img: "/thumbs/study.jpg", href: "/templates?industry=study", title: "스터디카페 홈페이지", note: "실시간 잔여석 보드와 요금표로 방문 전 확신을 주는 구성입니다.", points: ["잔여석 보드", "시간권 · 기간권 요금", "좌석 안내", "무인 이용 안내"] },
  { key: "care", name: "요양원 · 주간보호", icon: HeartHandshake, img: "/thumbs/care.jpg", href: "/templates?industry=care", title: "요양원 · 주간보호 홈페이지", note: "등급별 비용과 하루 일과를 큰 글자로 안내해 보호자를 안심시키는 구성입니다.", points: ["등급별 비용", "하루 일과", "입소 절차", "전화 상담 CTA"] },
  { key: "kids", name: "어린이집 · 유치원", icon: Blocks, img: "/thumbs/kids.jpg", href: "/templates?industry=kids", title: "어린이집 · 유치원 홈페이지", note: "반별 정원과 급식, 하루 일과를 투명하게 보여주는 구성입니다.", points: ["반별 정원표", "하루 일과", "급식 안내", "입소 대기 상담"] },
  { key: "golf", name: "스크린골프", icon: Flag, img: "/thumbs/golf.jpg", href: "/templates?industry=golf", title: "스크린골프 홈페이지", note: "시간대별 요금과 레슨 · 회원권으로 예약을 만드는 다크 톤 구성입니다.", points: ["타석 요금표", "룸 · 타석 안내", "레슨 · 회원권", "예약 문자"] },
  { key: "usedcar", name: "중고차", icon: Car, img: "/thumbs/usedcar-a.jpg", href: "/templates?industry=usedcar", title: "중고차 매매 홈페이지", note: "차량별 실사진과 성능점검 기록을 함께 보여주고 시세 문의로 연결하는 구성입니다.", points: ["차량 라인업", "성능점검 · 사고이력", "매입 시세 안내", "상담 문의"] },
  { key: "craft", name: "공방 · 클래스", icon: Palette, img: "/thumbs/craft.jpg", href: "/templates?industry=craft", title: "공방 · 클래스 홈페이지", note: "원데이 가격과 주간 일정표로 수강 신청을 만드는 콜라주형 구성입니다.", points: ["원데이 가격", "주간 일정표", "작품 갤러리", "수강 신청"] },
];

const INDUSTRY_COUNT = new Set(SAMPLES.filter((s) => s.industryKey).map((s) => s.industryKey)).size;
const DESIGN_COUNT = SAMPLES.filter((s) => s.industryKey).length;

export function StartOptionsSection() {
  const [activeKey, setActiveKey] = useState(TEMPLATE_INDUSTRIES[0]!.key);
  const active = TEMPLATE_INDUSTRIES.find((t) => t.key === activeKey) ?? TEMPLATE_INDUSTRIES[0]!;

  return (
    <section id="industry-section" className="border-y border-border bg-secondary/25 px-4 py-20 sm:px-6 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            label="HOW TO START"
            title={
              <>
                시작하는 방법은
                <br />두 가지입니다
              </>
            }
            description="완성된 업종 템플릿을 골라 빠르게 열거나, 업무 방식에 맞춰 처음부터 설계하거나. 아래에서 업종을 고르면 실제 구축된 화면을 그대로 보실 수 있습니다."
          />
          <dl className="flex shrink-0 gap-10">
            <div>
              <dt className="text-xs text-muted-foreground">업종</dt>
              <dd className="mt-1 font-mono text-4xl font-bold tabular-nums text-foreground">
                {INDUSTRY_COUNT}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">디자인 시안</dt>
              <dd className="mt-1 font-mono text-4xl font-bold tabular-nums text-primary">
                {DESIGN_COUNT}
              </dd>
            </div>
          </dl>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[235px_1fr]">
          {/* 업종 선택 — 모바일은 가로 스크롤 칩, 데스크톱은 세로 목록 */}
          <ul className="flex gap-2 overflow-x-auto pb-1 scrollbar-none lg:max-h-[560px] lg:flex-col lg:gap-1 lg:overflow-y-auto lg:overscroll-contain lg:pb-0 lg:pr-1">
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
                    aria-current={isActive}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                      isActive
                        ? "border-primary/40 bg-card shadow-xs"
                        : "border-transparent text-muted-foreground hover:bg-card/70",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-5 w-5 shrink-0",
                        isActive ? "text-primary" : "text-muted-foreground/60",
                      )}
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

          {/* 선택한 업종의 실제 구축 화면 */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <Link to={active.href} className="group block">
              <div className="relative overflow-hidden">
                <img
                  key={activeKey}
                  src={active.img}
                  alt={`${active.name} 구축 화면`}
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] motion-safe:animate-in motion-safe:fade-in motion-safe:duration-300"
                />
                <span className="absolute left-4 top-4 rounded-full bg-black/65 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-xs">
                  {active.name} · 실제 구축 화면
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

        {/* 두 가지 방식 대비 — 이 섹션의 결론 */}
        <FadeIn delay={120} className="mt-10">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
            <div className="flex flex-col bg-card p-6 sm:p-8">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                Template
              </p>
              <h3 className="mt-3 text-xl font-bold text-foreground">완성된 디자인으로 빠르게</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground break-keep">
                업종마다 기본형 · 랜딩형 각 5종이 이미 만들어져 있습니다. 문구 · 사진 · 회사정보만
                바꿔 여는 방식이라 제작 기간이 짧고 비용이 낮습니다.
              </p>
              <Link
                to="/templates"
                className="mt-5 inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                템플릿 {DESIGN_COUNT}종 보기
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="flex flex-col bg-primary/[0.04] p-6 sm:p-8">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-primary">
                Custom
              </p>
              <h3 className="mt-3 text-xl font-bold text-foreground">업무 방식에 맞춰 처음부터</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground break-keep">
                템플릿에 없는 화면과 기능은 기획 단계부터 함께 설계합니다. 관리자 시스템과
                데이터베이스까지 하나로 구축합니다.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild size="sm" className="gap-1.5 font-bold">
                  <Link to="/web-solutions">
                    맞춤 제작 알아보기
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="gap-1.5">
                  <Link to="/contact">
                    <Send className="h-3.5 w-3.5" />
                    구축 문의
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
