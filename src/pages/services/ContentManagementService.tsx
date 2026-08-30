import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Send, ArrowRight, ArrowDown, FileText, ImageIcon, Check, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePageTitle } from "@/hooks/usePageTitle";
import { CUSTOM_SERVICES } from "@/components/site/customServices";
import { listPublishedNotices } from "@/lib/api/notices";
import { BrowserFrame, LoopingBeforeAfter, Reveal, RevealScale, NextStepsSection } from "@/pages/services/previewKit";

const OTHER_SERVICES = CUSTOM_SERVICES.filter((s) => s.slug !== "content-management");

const BUILDABLE_CONTENT = [
  { label: "상품 · 매물 · 차량", example: "가격, 옵션, 이미지, 공개 여부를 관리자가 직접 등록" },
  { label: "후기 · 시공사례", example: "완료된 사례를 사진과 함께 등록해 포트폴리오처럼 노출" },
  { label: "배너 · 팝업", example: "홈페이지 상단 배너나 이벤트 팝업을 기간 지정해 관리" },
  { label: "강의 · 의료진 소개", example: "강사 · 의료진 정보를 개별 페이지로 등록하고 노출 순서 조정" },
];

const INDUSTRY_USES = [
  { label: "부동산", content: "매물 카드, 단지 정보, 상담 후기" },
  { label: "병원 · 의원", content: "의료진 소개, 비급여 안내, 공지사항" },
  { label: "학원", content: "강의 소개, 합격 후기, 시간표 공지" },
  { label: "인테리어", content: "시공 사례, 평형별 패키지, 견적 공지" },
];

/**
 * NoticeManager의 실제 필드 구성을 그대로 옮긴 정적 미리보기다. react-query mutation, Supabase
 * 쓰기 호출, Select/Switch 같은 무거운 컴포넌트는 전혀 포함하지 않는다 — 조작 불가능한 화면이다.
 */
function NoticeFormPreview() {
  return (
    <div className="pointer-events-none select-none rounded-lg border border-border bg-card p-7" inert>
      <h3 className="text-base font-semibold text-foreground">공지 작성</h3>
      <div className="mt-6 space-y-5">
        <div className="space-y-1.5">
          <Label className="text-xs">제목</Label>
          <Input readOnly value="9월 정기 휴무 안내" className="text-sm" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">카테고리</Label>
          <div className="flex gap-1.5">
            {["공지", "이벤트", "안내"].map((c) => (
              <span
                key={c}
                className={`rounded-full px-2.5 py-1 text-xs ${c === "공지" ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"}`}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs">내용</Label>
          <div className="h-24 rounded-md border border-border bg-background px-3 py-2 text-sm text-muted-foreground">
            추석 연휴 기간 중 고객센터 운영이 일시 중단됩니다...
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ImageIcon className="h-3.5 w-3.5" />
          이미지 첨부
        </div>
        <div className="flex items-center justify-between border-t border-border pt-4 text-sm">
          <span className="text-muted-foreground">상단 고정</span>
          <span className="h-5 w-9 rounded-full bg-secondary p-0.5">
            <span className="block h-4 w-4 rounded-full bg-background shadow-sm" />
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">노출</span>
          <span className="flex h-5 w-9 items-center justify-end rounded-full bg-primary p-0.5">
            <span className="block h-4 w-4 rounded-full bg-primary-foreground shadow-sm" />
          </span>
        </div>
        <div className="rounded-md bg-primary px-3 py-2.5 text-center text-sm font-bold text-primary-foreground">
          등록
        </div>
      </div>
    </div>
  );
}

/** /notices 공개 페이지와 같은 쿼리(listPublishedNotices)로 실제 공지 데이터만 읽어온다. 쓰기 로직 없음. */
function PublishedNoticesPreview() {
  const { data, isLoading } = useQuery({ queryKey: ["notices", "published"], queryFn: listPublishedNotices });
  const notices = data ?? [];

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="border-b border-border px-6 py-3.5">
        <p className="text-sm font-semibold text-foreground">/notices</p>
      </div>
      {isLoading && <p className="px-6 py-8 text-sm text-muted-foreground">불러오는 중…</p>}
      <ul className="divide-y divide-border">
        {notices.slice(0, 6).map((notice) => (
          <li key={notice.id} className="px-6 py-4">
            <div className="flex flex-wrap items-center gap-2">
              {notice.is_pinned && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  고정
                </span>
              )}
              {notice.category && (
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                  {notice.category}
                </span>
              )}
              <p className="text-base font-medium text-foreground">{notice.title}</p>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              {new Date(notice.created_at).toLocaleDateString("ko-KR")}
            </p>
          </li>
        ))}
        {!isLoading && notices.length === 0 && (
          <li className="px-6 py-10 text-center text-sm text-muted-foreground">
            등록된 공지사항이 없습니다.
          </li>
        )}
      </ul>
    </div>
  );
}

/** 공개 스위치가 꺼짐 ↔ 켜짐으로 번갈아 보이며, 상태 전환을 동작으로 보여준다. */
function PublishToggleLoop() {
  const off = (
    <div className="flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-border bg-card p-6 text-center">
      <span className="h-6 w-11 rounded-full bg-secondary p-0.5">
        <span className="block h-5 w-5 rounded-full bg-background shadow-sm" />
      </span>
      <p className="text-sm font-bold text-foreground">비공개</p>
      <p className="text-xs text-muted-foreground break-keep">아직 고객에게 보이지 않습니다.</p>
    </div>
  );
  const on = (
    <div className="flex h-full flex-col items-center justify-center gap-3 rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
      <span className="flex h-6 w-11 items-center justify-end rounded-full bg-primary p-0.5">
        <span className="block h-5 w-5 rounded-full bg-primary-foreground shadow-sm" />
      </span>
      <p className="text-sm font-bold text-primary">공개</p>
      <p className="text-xs text-muted-foreground break-keep">/notices 페이지에 즉시 노출됩니다.</p>
    </div>
  );
  return (
    <div className="h-[160px]">
      <LoopingBeforeAfter before={off} after={on} intervalMs={2200} />
    </div>
  );
}

export default function ContentManagementService() {
  usePageTitle(
    "콘텐츠 관리 — NOVERIQ",
    "공지사항, 상품, 매물 같은 홈페이지 콘텐츠를 관리자가 직접 등록·수정하는 구조를 확인하세요.",
  );

  return (
    <div>
      {/* 히어로 */}
      <div className="mx-auto max-w-5xl px-4 pb-4 pt-14 text-center sm:pt-20">
        <p className="mx-auto flex w-fit items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
          <FileText className="h-3.5 w-3.5" />
          CUSTOM SERVICE — 콘텐츠 관리
        </p>
        <h1 className="mx-auto mt-4 max-w-xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          공지 하나를 올리는 데 제작자가 필요하지 않습니다
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground break-keep">
          공지사항, 상품, 매물처럼 자주 바뀌는 콘텐츠를 관리자가 직접 작성·수정하고 공개 여부까지
          결정합니다. 아래는 실제 NOVERIQ 관리자 화면의 공지 작성 구조와, 그 결과가 반영되는 실제
          공지사항 페이지입니다.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild size="lg" className="gap-2 font-bold">
            <Link to="/contact">
              <Send className="h-4 w-4" />
              구축 상담하기
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-1.5">
            <Link to="/notices">실제 공지사항 보기</Link>
          </Button>
          <Button asChild size="lg" variant="ghost" className="gap-1.5 text-primary hover:bg-primary/5">
            <Link to="/website/features">
              구현 가능한 기능 보기
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>
      </div>

      {/* 세로 Before/After: 작성 → 반영 (확대) */}
      <div className="border-y border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <Reveal>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">관리자 → 홈페이지</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">작성한 그대로, 공지사항 페이지에 반영됩니다</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground break-keep">
              아래 작성 화면은 실제 조작 화면이 아니라 구조를 보여주는 미리보기입니다. 저장·수정·삭제는
              관리자 계정으로 로그인했을 때만 동작합니다.
            </p>
          </Reveal>

          <RevealScale delay={100} className="mt-10">
            <p className="mb-3 font-mono text-xs font-bold text-primary">01 · 관리자에서 공지 작성</p>
            <NoticeFormPreview />
          </RevealScale>

          <Reveal delay={200} className="flex items-center justify-center py-4 text-primary">
            <ArrowDown className="h-6 w-6" />
          </Reveal>

          <RevealScale delay={250}>
            <p className="mb-3 font-mono text-xs font-bold text-primary">02 · 공개 여부 결정</p>
            <PublishToggleLoop />
          </RevealScale>

          <Reveal delay={350} className="flex items-center justify-center py-4 text-primary">
            <ArrowDown className="h-6 w-6" />
          </Reveal>

          <RevealScale delay={400}>
            <p className="mb-3 font-mono text-xs font-bold text-primary">03 · 실제 /notices 페이지에 노출</p>
            <BrowserFrame label="noveriq.app/notices" heightClassName="h-auto">
              <div className="p-1">
                <PublishedNoticesPreview />
              </div>
            </BrowserFrame>
          </RevealScale>

          <Reveal delay={500} className="mt-10 flex items-center justify-between gap-4 rounded-xl border border-border bg-card px-6 py-5">
            <p className="text-base font-medium text-foreground break-keep">
              공지사항 외에 어떤 콘텐츠까지 구현 가능한지 확인해보세요.
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

      {/* 관리 가능한 콘텐츠 범위 */}
      <div className="py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal>
            <p className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
              <Layers className="h-3.5 w-3.5" />
              구축 가능한 범위
            </p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">공지사항 외에도 이렇게 확장할 수 있습니다</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground break-keep">
              지금 보여드린 공지사항은 실제로 작동 중인 화면입니다. 아래 항목들은 같은 구조를
              기반으로 업종에 맞게 구축하는 예시입니다.
            </p>
          </Reveal>
          <div className="mt-8 divide-y divide-border border-t border-border">
            {BUILDABLE_CONTENT.map((item, i) => (
              <Reveal key={item.label} delay={i * 70} className="py-5">
                <p className="text-base font-bold text-foreground">{item.label}</p>
                <p className="mt-1 text-sm text-muted-foreground break-keep">{item.example}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* 업종별 활용 */}
      <div className="border-t border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <Reveal>
            <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">업종별 활용</p>
            <h2 className="mt-3 text-3xl font-bold text-foreground">업종마다 관리하는 콘텐츠가 다릅니다</h2>
          </Reveal>
          <div className="mt-8 divide-y divide-border border-t border-border">
            {INDUSTRY_USES.map((item, i) => (
              <Reveal key={item.label} delay={i * 60} className="flex items-center justify-between gap-4 py-4">
                <p className="text-base font-bold text-foreground">{item.label}</p>
                <p className="text-sm text-muted-foreground">{item.content}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* 이런 경우 추천합니다 */}
      <Reveal className="py-14 sm:py-20">
        <div className="mx-auto max-w-4xl px-4">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">이런 경우 추천합니다</p>
          <h2 className="mt-3 text-3xl font-bold text-foreground">이런 상황에서 특히 필요합니다</h2>
          <div className="mt-8 space-y-4">
            {[
              "공지, 이벤트, 상품 정보가 자주 바뀌는 경우",
              "수정할 때마다 제작자에게 요청하고 기다려야 하는 경우",
              "아직 준비되지 않은 콘텐츠를 미리 만들어두고 싶은 경우",
              "여러 담당자가 각자 맡은 콘텐츠를 나눠 관리해야 하는 경우",
            ].map((text) => (
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
        ctaTitle="직접 관리하고 싶은 콘텐츠가 있으신가요?"
        ctaDesc="공지사항 외에도 상품, 매물, 배너 등 필요한 콘텐츠를 관리자에서 관리할 수 있게 구축합니다."
      />
    </div>
  );
}
