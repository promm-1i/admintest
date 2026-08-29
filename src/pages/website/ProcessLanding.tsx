import { Link } from "react-router-dom";
import {
  Send,
  MessageCircle,
  Phone,
  Mail,
  Check,
  ArrowRight,
  Smartphone,
  Search,
  MessageSquare,
  MapPin,
  LayoutDashboard,
  Database,
  SlidersHorizontal,
  Building2,
  Car,
  GraduationCap,
  FileText,
  Package,
  Home as HomeIcon,
  Calendar,
  Inbox,
  Users,
  ShieldCheck,
  CalendarClock,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { KAKAO_CHANNEL_URL, PHONE_TEL_HREF } from "@/lib/contact";

const STEPS = [
  {
    num: "01",
    title: "제작 상담",
    lede: "필요한 홈페이지와 기능을 함께 정리합니다.",
    desc: "업종, 제작 목적, 필요한 페이지, 기능, 참고사이트 등을 확인합니다. 아직 구체적인 구상이 없어도 상담하면서 정리할 수 있습니다.",
  },
  {
    num: "02",
    title: "구성 및 견적 안내",
    lede: "필요한 범위를 정리하고 제작비용을 안내합니다.",
    desc: "페이지 수와 필요한 기능을 기준으로 제작 범위와 비용, 예상 일정을 안내드립니다.",
    cta: { label: "제작 비용 보기", to: "/website/price" },
  },
  {
    num: "03",
    title: "제작 자료 전달",
    lede: "홈페이지에 사용할 자료를 전달해주세요.",
    desc: "로고, 회사소개, 서비스 내용, 이미지, 연락처 등 현재 가지고 있는 자료를 전달해주시면 됩니다. 자료가 부족한 경우 필요한 내용을 별도로 안내드립니다.",
  },
  {
    num: "04",
    title: "디자인 및 개발",
    lede: "확정된 구성에 따라 실제 홈페이지를 제작합니다.",
    desc: "PC와 모바일 화면을 함께 고려하여 디자인하고 문의, 관리자, 검색 등 필요한 기능을 개발합니다. 제작 과정에서 필요한 내용은 1:1로 확인하며 진행합니다.",
  },
  {
    num: "05",
    title: "검수 및 수정",
    lede: "완성된 홈페이지를 직접 확인합니다.",
    desc: "PC와 모바일에서 제작 결과를 확인한 뒤 문구, 이미지 등 필요한 수정사항을 반영합니다. 레이아웃 변경이나 신규 기능 추가가 필요한 경우 별도 협의 후 진행합니다.",
  },
  {
    num: "06",
    title: "홈페이지 오픈",
    lede: "최종 확인 후 실제 홈페이지를 공개합니다.",
    desc: "도메인을 연결하고 실제 운영환경에 배포합니다. 오픈 후에는 기본 사용방법과 관리자 기능이 있는 경우 관리자 이용방법을 안내드립니다.",
    cta: { label: "유지보수 안내", to: "/website/maintenance" },
  },
];

const REQUIRED_MATERIALS = [
  {
    title: "회사 로고",
    desc: "사용하고 있는 로고 파일을 보내주세요. PNG, SVG, AI 등 원본 파일이 있으면 가장 좋습니다.",
  },
  {
    title: "회사 기본정보",
    desc: "업체명, 대표 연락처, 주소, 이메일, 영업시간, 사업자 정보를 전달해주세요.",
  },
  {
    title: "홈페이지 메뉴",
    desc: '예: "회사소개 / 서비스 / 포트폴리오 / 고객센터 / 문의하기". 정해진 메뉴가 없다면 MintCL에서 기본 구성을 제안해드립니다.',
  },
  {
    title: "서비스 및 상품 자료",
    desc: "홈페이지에서 소개할 서비스, 상품, 가격, 특징, 회사 강점 등의 내용을 전달해주세요.",
  },
  {
    title: "사진 및 참고사이트",
    desc: "사용하고 싶은 사진이나 마음에 드는 홈페이지가 있다면 함께 보내주세요. 원하는 디자인 방향을 파악하는 데 도움이 됩니다.",
  },
];

const CONSIDERATION_POINTS = [
  {
    num: "01",
    icon: Smartphone,
    title: "PC · 모바일 반응형",
    desc: "PC, 태블릿, 모바일 화면에 맞게 콘텐츠가 자연스럽게 재배치되도록 제작합니다.",
  },
  {
    num: "02",
    icon: Search,
    title: "검색엔진 기본 설정",
    desc: "검색엔진이 홈페이지의 내용을 이해할 수 있도록 페이지 제목, 설명, 구조 등을 기본적으로 설정합니다.",
  },
  {
    num: "03",
    icon: MessageSquare,
    title: "문의 및 상담 연결",
    desc: "전화, 카카오톡, 문의폼 등 방문자가 바로 상담으로 이어질 수 있는 구조를 구성합니다.",
  },
  {
    num: "04",
    icon: MapPin,
    title: "지도 및 위치 안내",
    desc: "필요한 경우 사업장 위치를 확인할 수 있도록 지도 및 길찾기 기능을 연결합니다.",
  },
  {
    num: "05",
    icon: LayoutDashboard,
    title: "관리자 시스템",
    desc: "공지사항이나 콘텐츠를 직접 관리해야 한다면 관리자 페이지를 별도로 구축할 수 있습니다.",
  },
  {
    num: "06",
    icon: Database,
    title: "데이터 관리",
    desc: "문의, 예약, 고객정보 등 홈페이지에서 발생하는 데이터를 관리할 수 있도록 구축할 수 있습니다.",
  },
  {
    num: "07",
    icon: SlidersHorizontal,
    title: "맞춤 기능 개발",
    desc: "사업에 따라 필요한 검색, 필터, 예약, 견적, 고객관리, 회원, 결제 등의 기능을 추가할 수 있습니다.",
  },
  {
    num: "08",
    icon: Building2,
    title: "업종별 관리 시스템",
    desc: "단순 홈페이지가 아니라 실제 업무에 사용할 관리자 시스템까지 구축할 수 있습니다.",
    examples: [
      { icon: Building2, label: "부동산", flow: "매물 → 고객 → 임장 → 계약" },
      { icon: Car, label: "렌트카", flow: "차량 → 예약 → 고객 → 계약" },
      { icon: GraduationCap, label: "학원", flow: "상담 → 학생 → 강의 → 출결" },
    ],
  },
];

const ADMIN_EXAMPLES = [
  { icon: FileText, label: "공지사항 관리" },
  { icon: Package, label: "상품 관리" },
  { icon: HomeIcon, label: "매물 관리" },
  { icon: Car, label: "차량 관리" },
  { icon: Calendar, label: "예약 관리" },
  { icon: Inbox, label: "고객 문의" },
  { icon: Users, label: "고객 관리" },
  { icon: ShieldCheck, label: "직원 권한" },
  { icon: CalendarClock, label: "일정 관리" },
  { icon: BarChart3, label: "통계" },
];

export default function ProcessLanding() {
  usePageTitle(
    "제작 방법 — MintCL",
    "홈페이지 제작 의뢰 시 상담부터 배포까지 실제로 어떻게 진행되는지 단계별로 안내합니다.",
  );

  return (
    <div>
      <div className="mx-auto max-w-4xl px-4 py-14">
        <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">HOW WE BUILD</p>
        <h1 className="mt-3 text-3xl font-semibold">홈페이지 제작은 이렇게 진행됩니다.</h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground break-keep">
          처음 홈페이지를 제작하는 경우에도 필요한 페이지와 기능부터 함께 정리해드립니다. 상담부터
          디자인, 개발, 검수, 배포까지 단계별로 진행합니다.
        </p>
        <div className="mt-6">
          <Button asChild size="lg" className="gap-2 font-bold">
            <Link to="/contact">
              <Send className="h-4 w-4" />
              제작 상담하기
            </Link>
          </Button>
        </div>

        {/* 제작 방식 2가지 */}
        <h2 className="mt-16 text-xl font-semibold">제작 방식 2가지</h2>
        <div className="mt-6 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="text-base font-bold text-foreground">템플릿형 홈페이지 제작</h3>
            <p className="mt-2 text-sm font-medium text-foreground break-keep">
              검증된 디자인을 선택해 더 빠르고 합리적으로 시작합니다.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-keep">
              미리 제작된 홈페이지 디자인을 기반으로 업체 정보, 이미지, 문구, 메뉴 등을 변경하여
              제작합니다. 처음 홈페이지를 제작하거나 복잡한 기능이 필요하지 않은 경우 적합합니다.
            </p>
            <ul className="mt-4 space-y-2">
              {["제작기간 단축", "비용 절감", "PC / 모바일 반응형", "원하는 업종 디자인 선택"].map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-foreground break-keep">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  {b}
                </li>
              ))}
            </ul>
            <Link to="/templates" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              홈페이지 템플릿 보기
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="sm:border-l sm:border-border sm:pl-10">
            <h3 className="text-base font-bold text-foreground">맞춤형 홈페이지 제작</h3>
            <p className="mt-2 text-sm font-medium text-foreground break-keep">
              사업에 필요한 구조와 기능부터 새롭게 설계합니다.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-keep">
              기존 템플릿에 맞추는 것이 아니라 업체의 서비스, 고객 흐름, 운영방식에 맞춰 홈페이지를
              제작합니다. 필요에 따라 아래 기능도 함께 구축할 수 있습니다.
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {["관리자 페이지", "문의 / 예약", "상품·매물 관리", "검색 / 필터", "고객 관리", "DB 구축", "외부 API 연동"].map(
                (b) => (
                  <li key={b} className="flex items-start gap-2 text-sm text-foreground break-keep">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {b}
                  </li>
                ),
              )}
            </ul>
            <Link to="/contact" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
              맞춤 제작 문의하기
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* 제작 과정 */}
        <h2 className="mt-20 text-xl font-semibold">홈페이지 제작은 이렇게 진행됩니다</h2>
        <div className="mt-8 space-y-0">
          {STEPS.map((step, i) => (
            <div key={step.num} className="flex gap-5">
              <div className="flex flex-col items-center">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/40 font-mono text-xs font-bold text-primary">
                  {step.num}
                </span>
                {i < STEPS.length - 1 && <span className="mt-1 w-px flex-1 bg-border" />}
              </div>
              <div className="pb-10">
                <h3 className="pt-1 text-base font-bold text-foreground">{step.title}</h3>
                <p className="mt-1 text-sm font-medium text-foreground break-keep">{step.lede}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground break-keep">{step.desc}</p>
                {step.cta && (
                  <Link
                    to={step.cta.to}
                    className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    {step.cta.label}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 제작 전에 필요한 자료 */}
        <h2 className="mt-4 text-xl font-semibold">홈페이지 제작 전 준비해주세요</h2>
        <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
          {REQUIRED_MATERIALS.map((m) => (
            <div key={m.title} className="p-5">
              <h3 className="text-sm font-semibold text-foreground">{m.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground break-keep">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 홈페이지 제작 시 기본적으로 고려하는 항목 */}
      <div className="border-y border-border bg-secondary/30 py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-xl font-semibold">홈페이지 제작, 이런 부분까지 함께 고려합니다</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {CONSIDERATION_POINTS.map((point) => {
              const Icon = point.icon;
              return (
                <div key={point.num} className="rounded-xl border border-border bg-card p-5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary">POINT {point.num}</span>
                    <Icon className="ml-auto h-4 w-4 text-muted-foreground/50" />
                  </div>
                  <h3 className="mt-2 text-sm font-bold text-foreground">{point.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground break-keep">{point.desc}</p>
                  {point.examples && (
                    <ul className="mt-3 grid gap-2 border-t border-border/60 pt-3 sm:grid-cols-3">
                      {point.examples.map((ex) => {
                        const ExIcon = ex.icon;
                        return (
                          <li key={ex.label} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                            <ExIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/70" />
                            <span>
                              <span className="font-medium text-foreground">{ex.label}</span>
                              <br />
                              {ex.flow}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 중간 CTA */}
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-lg font-semibold text-foreground break-keep">
          어떤 홈페이지가 필요한지 아직 모르셔도 괜찮습니다.
        </p>
        <p className="mt-2 text-sm text-muted-foreground break-keep">
          업종과 필요한 내용만 알려주시면 적합한 제작 방식과 예상 비용을 안내해드립니다.
        </p>
        <div className="mt-6">
          <Button asChild size="lg" className="gap-2 font-bold">
            <Link to="/contact">
              <Send className="h-4 w-4" />
              제작 상담하기
            </Link>
          </Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
          <a
            href={KAKAO_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:text-foreground"
          >
            <MessageCircle className="h-3.5 w-3.5" />
            카카오톡 상담
          </a>
          <span className="text-border">·</span>
          <a href={PHONE_TEL_HREF} className="inline-flex items-center gap-1 hover:text-foreground">
            <Phone className="h-3.5 w-3.5" />
            전화 상담
          </a>
          <span className="text-border">·</span>
          <Link to="/contact" className="inline-flex items-center gap-1 hover:text-foreground">
            <Mail className="h-3.5 w-3.5" />
            온라인 문의
          </Link>
        </div>
      </div>

      {/* 관리자 시스템 강조 영역 */}
      <div className="bg-neutral-950 py-16 text-white sm:py-20">
        <div className="mx-auto grid max-w-5xl gap-12 px-4 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-6">
            <p className="text-sm font-bold tracking-widest text-primary uppercase">ADMIN SYSTEM</p>
            <h2 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight sm:text-3xl">
              홈페이지에서 끝나지 않습니다.
            </h2>
            <p className="mt-2 text-base font-medium text-neutral-300">
              운영에 필요한 관리자 시스템까지 직접 구축합니다.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400 break-keep">
              홈페이지를 만든 이후 매번 제작자에게 수정 요청을 할 필요 없이, 필요한 콘텐츠와 데이터를
              직접 관리할 수 있습니다.
            </p>

            <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {ADMIN_EXAMPLES.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.label}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2.5 text-xs font-medium"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 text-primary" />
                    {item.label}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="gap-1.5 font-bold">
                <Link to="/web-solutions">
                  업종별 맞춤 제작 보기
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="gap-1.5 border-white/20 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link to="/web-solutions/demos">관리자 시스템 데모 보기</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-3">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">Admin Dashboard</span>
                <div className="flex items-center gap-1.5 rounded-md bg-white/5 px-3 py-1 text-[11px] font-mono text-neutral-400 border border-white/10">
                  <ShieldCheck className="h-3 w-3 text-primary" />
                  관리자 모드
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 p-5">
                {[
                  { label: "이번 달 예약", value: "128건" },
                  { label: "신규 문의", value: "12건" },
                  { label: "등록 상품", value: "64건" },
                ].map((s) => (
                  <div key={s.label} className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <p className="text-[11px] text-neutral-400">{s.label}</p>
                    <p className="mt-1.5 text-lg font-bold">{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 px-5 pb-5">
                {[
                  { name: "홍길동 고객 예약 확정", time: "3분 전", tone: "text-emerald-400" },
                  { name: "신규 문의 1건 접수", time: "12분 전", tone: "text-amber-400" },
                  { name: "상품 정보 수정됨", time: "1시간 전", tone: "text-neutral-400" },
                ].map((row) => (
                  <div
                    key={row.name}
                    className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2.5 text-xs"
                  >
                    <span>{row.name}</span>
                    <span className={row.tone}>{row.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 마지막 상담 CTA */}
      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:py-20">
        <h2 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
          이제 홈페이지 제작을 시작해보세요.
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground break-keep">
          간단한 소개 홈페이지부터 관리자와 DB가 연결된 맞춤형 웹사이트까지 제작할 수 있습니다. 현재
          필요한 범위에 맞춰 견적을 안내드립니다.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="gap-2 font-bold shadow-md">
            <Link to="/contact">
              <Send className="h-4 w-4" />
              무료 제작 상담
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="gap-2 border-none bg-[#FEE500] font-bold text-[#191919] shadow-sm hover:bg-[#FADA00]"
          >
            <a href={KAKAO_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4 fill-[#191919]" />
              카카오톡 문의
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
