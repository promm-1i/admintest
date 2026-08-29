import { Link } from "react-router-dom";
import { Send, MessageCircle, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { KAKAO_CHANNEL_URL } from "@/lib/contact";

const STEPS = [
  {
    num: "01",
    title: "상담",
    desc: "업종, 필요한 페이지, 기능, 예산, 참고 사이트를 확인합니다.",
  },
  {
    num: "02",
    title: "구성 및 견적",
    desc: "필요한 메뉴와 기능 범위를 정리하고 제작비를 안내합니다.",
  },
  {
    num: "03",
    title: "자료 전달",
    desc: "로고, 회사 소개, 서비스·상품 정보, 이미지, 연락처, 사업자정보 등을 전달받습니다.",
  },
  {
    num: "04",
    title: "디자인 / 개발",
    desc: "확정한 구성에 따라 PC·태블릿·모바일 반응형으로 제작합니다. 필요한 경우 관리자와 DB 기능도 함께 구축합니다.",
  },
  {
    num: "05",
    title: "검수 / 수정",
    desc: "Preview URL로 직접 확인하고, 정해진 범위에서 수정사항을 반영합니다.",
  },
  {
    num: "06",
    title: "배포 / 운영안내",
    desc: "도메인 연결, HTTPS, 기본 검색엔진 설정, 관리자 사용법과 운영방법을 안내합니다.",
  },
];

const REQUIRED_MATERIALS = [
  { title: "회사 로고", desc: "PNG · SVG · AI 등 사용 가능한 원본 파일." },
  { title: "메뉴 또는 필요한 페이지", desc: "정확하게 몰라도 괜찮습니다. 상담 과정에서 함께 구성합니다." },
  { title: "회사 기본정보", desc: "업체명, 대표번호, 주소, 이메일, 사업자정보, 영업시간." },
  { title: "서비스 / 상품 내용", desc: "소개글, 제품정보, 가격, 이미지, 포트폴리오 등." },
  { title: "참고 사이트", desc: "원하는 분위기를 설명하기 어렵다면 참고 사이트 2~3개를 전달해 주세요." },
];

const SUPPORT_ITEMS = [
  "PC / 모바일 반응형",
  "기본 SEO 구조",
  "도메인 연결 안내",
  "기본 검색엔진 등록 안내",
  "문의 연결(전화·카카오톡·폼)",
  "관리자 사용 안내",
  "배포 지원",
];

export default function ProcessLanding() {
  usePageTitle(
    "제작 방법 — MintCL",
    "홈페이지 제작 의뢰 시 상담부터 배포까지 실제로 어떻게 진행되는지 단계별로 안내합니다.",
  );

  return (
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

      <h2 className="mt-16 text-xl font-semibold">제작 방식을 먼저 선택합니다</h2>
      <div className="mt-6 grid gap-8 sm:grid-cols-2">
        <div>
          <h3 className="text-base font-semibold text-foreground">템플릿형 홈페이지 제작</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-keep">
            MintCL이 미리 제작해놓은 디자인을 기반으로 문구, 이미지, 회사정보 등을 적용해 빠르게
            제작합니다.
          </p>
          <ul className="mt-4 space-y-2">
            {["완성 형태를 미리 확인 가능", "제작기간 단축", "상대적으로 낮은 제작비", "기본적인 소개형 사이트에 적합"].map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-foreground break-keep">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {b}
              </li>
            ))}
          </ul>
          <Link to="/templates" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            템플릿 보기
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="sm:border-l sm:border-border sm:pl-8">
          <h3 className="text-base font-semibold text-foreground">맞춤형 홈페이지 제작</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground break-keep">
            고객 요구사항과 업종을 기준으로 구조부터 별도로 설계합니다.
          </p>
          <ul className="mt-4 space-y-2">
            {["메뉴 구성", "디자인", "관리자 기능", "DB", "검색/필터", "예약", "고객관리", "업종별 관리 기능", "외부 API", "AI 기능"].map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-foreground break-keep">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {b}
              </li>
            ))}
          </ul>
          <Link to="/contact" className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
            맞춤 제작 상담
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      <h2 className="mt-16 text-xl font-semibold">제작 과정</h2>
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
              <h3 className="pt-1 text-base font-semibold text-foreground">{step.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground break-keep">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="mt-4 text-xl font-semibold">홈페이지 제작 전에 준비해 주세요</h2>
      <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-card">
        {REQUIRED_MATERIALS.map((m) => (
          <div key={m.title} className="p-5">
            <h3 className="text-sm font-semibold text-foreground">{m.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground break-keep">{m.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-16 text-xl font-semibold">제작 시 지원 항목</h2>
      <ul className="mt-6 grid gap-3 sm:grid-cols-2">
        {SUPPORT_ITEMS.map((item) => (
          <li key={item} className="flex items-center gap-2.5 text-sm text-foreground break-keep">
            <Check className="h-4 w-4 shrink-0 text-primary" />
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-16 rounded-2xl border border-border bg-secondary/40 p-8 text-center">
        <p className="text-sm font-semibold text-foreground">홈페이지 제작이 처음이어도 괜찮습니다.</p>
        <p className="mt-2 text-sm text-muted-foreground break-keep">
          업종과 필요한 기능을 알려주시면 필요한 구성부터 먼저 정리해드립니다.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button asChild className="gap-2 font-bold">
            <Link to="/contact">
              <Send className="h-4 w-4" />
              제작 상담하기
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2 font-bold">
            <a href={KAKAO_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" />
              카카오톡 문의
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
