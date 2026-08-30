import { Link } from "react-router-dom";
import { Send, ArrowRight, Database, Check, Info, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePageTitle } from "@/hooks/usePageTitle";
import { CUSTOM_SERVICES } from "@/components/site/customServices";
import { Reveal, NextStepsSection } from "@/pages/services/previewKit";

const OTHER_SERVICES = CUSTOM_SERVICES.filter((s) => s.slug !== "database-api");

const IN_USE = [
  { name: "notices 테이블", desc: "공지사항 제목·내용·카테고리·상단고정·공개여부를 저장합니다. 지금 이 사이트의 /notices가 여기서 읽어옵니다." },
  { name: "reservations 테이블", desc: "실제 /contact 문의 폼에서 접수되는 이름·연락처·이메일·문의내용·처리상태를 저장합니다." },
  { name: "user_roles 테이블", desc: "관리자 권한을 구분해, 로그인한 계정만 관리자 화면에 접근하도록 제한합니다." },
];

const AVAILABLE = [
  { name: "공공데이터포털 · 국토교통부 API", desc: "실거래가, 건축물대장 등. 업종에 필요할 때 서버 환경변수로 API Key를 관리해 연동합니다." },
  { name: "SMS · 알림톡 발송", desc: "문의 접수, 예약 확정 시 담당자 · 고객에게 자동 알림을 보내는 구조로 구축 가능합니다." },
  { name: "결제 시스템", desc: "예약금, 상품 결제가 필요한 경우 PG사 연동을 추가로 구축합니다." },
  { name: "지도 API", desc: "매장 위치, 매물 지도 검색이 필요한 경우 네이버 · 카카오 지도 API를 연동합니다." },
];

const NEED_CASES = [
  "문의 · 예약이 접수되는 즉시 데이터로 남아야 하는 경우",
  "고객이 입력한 정보를 관리자가 나중에도 다시 확인해야 하는 경우",
  "실거래가, 지도, 결제처럼 외부 정보와 연결해야 하는 경우",
  "데이터를 엑셀이나 통계로 뽑아 운영에 활용하고 싶은 경우",
];

export default function DatabaseApiService() {
  usePageTitle(
    "DB · API 연동 — MintCL",
    "MintCL이 실제로 사용 중인 데이터베이스 구조와, 필요 시 연동 가능한 외부 서비스를 구분해서 확인하세요.",
  );

  return (
    <div>
      {/* 히어로 */}
      <div className="mx-auto max-w-3xl px-4 pb-4 pt-14 text-center sm:pt-20">
        <p className="mx-auto flex w-fit items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
          <Database className="h-3.5 w-3.5" />
          CUSTOM SERVICE — DB · API 연동
        </p>
        <h1 className="mx-auto mt-4 max-w-xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          홈페이지의 데이터는 어디에, 어떻게 저장될까요
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground break-keep">
          문의, 예약, 공지 같은 데이터를 데이터베이스로 관리하고, 필요한 경우 결제 · 지도 · 문자 등
          외부 서비스와 연동합니다. 지금 실제로 붙어 있는 것과, 요청하시면 추가로 구축 가능한 것을
          구분해서 안내드립니다.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="gap-2 font-bold">
            <Link to="/contact">
              <Send className="h-4 w-4" />
              구축 상담하기
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="gap-1.5 text-primary hover:bg-primary/5">
            <Link to="/website/features">
              구현 가능한 기능 보기
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* 쉬운 설명 */}
      <Reveal className="border-y border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-2xl px-4">
          <p className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
            <Lightbulb className="h-3.5 w-3.5" />
            쉽게 말하면
          </p>
          <h2 className="mt-3 text-3xl font-bold text-foreground break-keep">
            DB는 "저장하는 곳", API는 "다른 서비스와 연결하는 통로"입니다
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground break-keep">
            고객이 홈페이지에 문의를 남기면 그 내용은 어딘가에 저장되어야 나중에 확인할 수 있습니다.
            그 저장 공간이 데이터베이스(DB)입니다. 그리고 지도, 결제, 실거래가처럼 우리가 직접
            만들지 않은 외부 정보를 가져오려면 API라는 연결 통로가 필요합니다.
          </p>
        </div>
      </Reveal>

      {/* 데이터 흐름 다이어그램 */}
      <div className="py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4">
          <Reveal>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">데이터 흐름</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">고객 화면과 관리자 화면이 하나의 DB를 함께 봅니다</h2>
          </Reveal>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Reveal className="w-full sm:w-48">
              <div className="rounded-lg border border-border bg-card px-5 py-4 text-center">
                <p className="text-base font-bold text-foreground">고객 화면</p>
                <p className="mt-1 text-sm text-muted-foreground">문의 · 예약 작성</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <ArrowRight className="h-5 w-5 shrink-0 rotate-90 text-primary sm:rotate-0" />
            </Reveal>
            <Reveal delay={220} className="w-full sm:w-48">
              <div className="rounded-lg border-2 border-primary/40 bg-primary/5 px-5 py-4 text-center">
                <p className="text-base font-bold text-primary">Supabase DB</p>
                <p className="mt-1 text-sm text-muted-foreground">notices · reservations</p>
              </div>
            </Reveal>
            <Reveal delay={320}>
              <ArrowRight className="h-5 w-5 shrink-0 rotate-90 text-primary sm:rotate-0" />
            </Reveal>
            <Reveal delay={440} className="w-full sm:w-48">
              <div className="rounded-lg border border-border bg-card px-5 py-4 text-center">
                <p className="text-base font-bold text-foreground">관리자 화면</p>
                <p className="mt-1 text-sm text-muted-foreground">확인 · 처리 · 응답</p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={550} className="mx-auto mt-10 max-w-xl rounded-lg border border-border bg-card p-5">
            <p className="text-xs font-mono font-semibold text-primary">실제 흐름 예시</p>
            <p className="mt-2 text-base leading-relaxed text-muted-foreground break-keep">
              방문자가 이 사이트의 <span className="font-medium text-foreground">/contact</span>에서 문의를
              남기면, 그 내용은 실시간으로 <span className="font-medium text-foreground">reservations</span>{" "}
              테이블에 저장됩니다. 운영자는{" "}
              <span className="font-medium text-foreground">/admin</span>에 로그인해 접수된 문의를 확인하고
              처리 상태를 바꿉니다.
            </p>
          </Reveal>

          <Reveal delay={650} className="mt-8 flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-6 py-5">
            <p className="text-base font-medium text-foreground break-keep">
              데이터 연동 외에 어떤 것까지 구현 가능한지 확인해보세요.
            </p>
            <Button asChild variant="outline" className="shrink-0 gap-1.5">
              <Link to="/website/features">
                전체 기능 보기
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>

      {/* 실제 사용 중 vs 연동 가능 */}
      <div className="border-y border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <p className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-widest text-emerald-600">
                <Check className="h-3.5 w-3.5" />
                현재 실제 적용 사례
              </p>
              <h2 className="mt-3 text-2xl font-bold text-foreground">지금 이 사이트에서 실제로 작동 중</h2>
              <div className="mt-6 divide-y divide-border border-t border-border">
                {IN_USE.map((item) => (
                  <div key={item.name} className="py-4">
                    <p className="font-mono text-base font-semibold text-foreground">{item.name}</p>
                    <p className="mt-1.5 text-base leading-relaxed text-muted-foreground break-keep">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={120}>
              <p className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground">
                <Info className="h-3.5 w-3.5" />
                필요 시 연동 가능한 구조
              </p>
              <h2 className="mt-3 text-2xl font-bold text-foreground">현재는 연동되어 있지 않고, 요청 시 구축</h2>
              <div className="mt-6 divide-y divide-border border-t border-border">
                {AVAILABLE.map((item) => (
                  <div key={item.name} className="py-4">
                    <p className="text-base font-semibold text-foreground">{item.name}</p>
                    <p className="mt-1.5 text-base leading-relaxed text-muted-foreground break-keep">{item.desc}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 rounded-lg border border-dashed border-border bg-secondary/30 p-4 text-xs leading-relaxed text-muted-foreground break-keep">
                업종별 관리자 데모의 공공데이터 조회 화면도 실제 API 연동 없이 구조만 보여주는
                데모입니다. 실제 구축 시에는 필요한 공공 API 승인과 서버 환경변수 설정이 별도로
                필요합니다.
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* 이런 경우 추천합니다 */}
      <Reveal className="py-14 sm:py-20">
        <div className="mx-auto max-w-2xl px-4">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">이런 경우 추천합니다</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground">이런 상황에서 특히 필요합니다</h2>
          <div className="mt-8 space-y-4">
            {NEED_CASES.map((text) => (
              <div key={text} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-base leading-relaxed text-foreground break-keep">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* 다른 맞춤형 서비스 + 마무리 CTA (하나의 이어진 section) */}
      <NextStepsSection
        otherServices={OTHER_SERVICES}
        ctaTitle="어떤 데이터를 관리하고 싶으신가요?"
        ctaDesc="필요한 데이터 구조와 연동 범위를 확인해 예상 비용과 일정을 안내드립니다."
      />
    </div>
  );
}
