import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Send, ArrowRight, ArrowDown, FileText, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePageTitle } from "@/hooks/usePageTitle";
import { CUSTOM_SERVICES } from "@/components/site/customServices";
import { listPublishedNotices } from "@/lib/api/notices";
import { BrowserFrame } from "@/pages/services/previewKit";

const OTHER_SERVICES = CUSTOM_SERVICES.filter((s) => s.slug !== "content-management");

/**
 * NoticeManager의 실제 필드 구성을 그대로 옮긴 정적 미리보기다. react-query mutation, Supabase
 * 쓰기 호출, Select/Switch 같은 무거운 컴포넌트는 전혀 포함하지 않는다 — 조작 불가능한 화면이다.
 */
function NoticeFormPreview() {
  return (
    <div className="pointer-events-none select-none rounded-lg border border-border bg-card p-6" inert>
      <h3 className="text-sm font-semibold text-foreground">공지 작성</h3>
      <div className="mt-5 space-y-4">
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
          <div className="h-20 rounded-md border border-border bg-background px-3 py-2 text-xs text-muted-foreground">
            추석 연휴 기간 중 고객센터 운영이 일시 중단됩니다...
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ImageIcon className="h-3.5 w-3.5" />
          이미지 첨부
        </div>
        <div className="flex items-center justify-between border-t border-border pt-4 text-xs">
          <span className="text-muted-foreground">상단 고정</span>
          <span className="h-5 w-9 rounded-full bg-secondary p-0.5">
            <span className="block h-4 w-4 rounded-full bg-background shadow-sm" />
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">노출</span>
          <span className="flex h-5 w-9 items-center justify-end rounded-full bg-primary p-0.5">
            <span className="block h-4 w-4 rounded-full bg-primary-foreground shadow-sm" />
          </span>
        </div>
        <div className="rounded-md bg-primary px-3 py-2 text-center text-xs font-bold text-primary-foreground">
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
      <div className="border-b border-border px-5 py-3">
        <p className="text-xs font-semibold text-foreground">/notices</p>
      </div>
      {isLoading && <p className="px-5 py-6 text-xs text-muted-foreground">불러오는 중…</p>}
      <ul className="divide-y divide-border">
        {notices.slice(0, 6).map((notice) => (
          <li key={notice.id} className="px-5 py-3.5">
            <div className="flex flex-wrap items-center gap-2">
              {notice.is_pinned && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                  고정
                </span>
              )}
              {notice.category && (
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-secondary-foreground">
                  {notice.category}
                </span>
              )}
              <p className="text-sm font-medium text-foreground">{notice.title}</p>
            </div>
            <p className="mt-1 text-[11px] text-muted-foreground">
              {new Date(notice.created_at).toLocaleDateString("ko-KR")}
            </p>
          </li>
        ))}
        {!isLoading && notices.length === 0 && (
          <li className="px-5 py-8 text-center text-xs text-muted-foreground">
            등록된 공지사항이 없습니다.
          </li>
        )}
      </ul>
    </div>
  );
}

export default function ContentManagementService() {
  usePageTitle(
    "콘텐츠 관리 — MintCL",
    "공지사항, 상품, 매물 같은 홈페이지 콘텐츠를 관리자가 직접 등록·수정하는 구조를 확인하세요.",
  );

  return (
    <div>
      {/* 히어로 */}
      <div className="mx-auto max-w-3xl px-4 pb-4 pt-14 text-center sm:pt-20">
        <p className="mx-auto flex w-fit items-center gap-2 text-xs font-mono font-semibold uppercase tracking-widest text-primary">
          <FileText className="h-3.5 w-3.5" />
          CUSTOM SERVICE — 콘텐츠 관리
        </p>
        <h1 className="mx-auto mt-4 max-w-xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          공지 하나를 올리는 데 제작자가 필요하지 않습니다
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground break-keep">
          공지사항, 상품, 매물처럼 자주 바뀌는 콘텐츠를 관리자가 직접 작성·수정하고 공개 여부까지
          결정합니다. 아래는 실제 MintCL 관리자 화면의 공지 작성 구조와, 그 결과가 반영되는 실제
          공지사항 페이지입니다.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" className="gap-2 font-bold">
            <Link to="/contact">
              <Send className="h-4 w-4" />
              구축 상담하기
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="gap-1.5">
            <Link to="/notices">실제 공지사항 페이지 보기</Link>
          </Button>
        </div>
      </div>

      {/* 세로 Before/After: 작성 → 반영 */}
      <div className="border-y border-border bg-secondary/30 py-14 sm:py-20">
        <div className="mx-auto max-w-2xl px-4">
          <p className="text-xs font-mono font-semibold uppercase tracking-widest text-primary">관리자 → 홈페이지</p>
          <h2 className="mt-3 text-2xl font-bold text-foreground">작성한 그대로, 공지사항 페이지에 반영됩니다</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground break-keep">
            아래 작성 화면은 실제 조작 화면이 아니라 구조를 보여주는 미리보기입니다. 저장·수정·삭제는
            관리자 계정으로 로그인했을 때만 동작합니다.
          </p>

          <div className="mt-10">
            <p className="mb-3 font-mono text-xs font-bold text-primary">01 · 관리자에서 공지 작성</p>
            <NoticeFormPreview />
          </div>

          <div className="flex items-center justify-center py-4 text-muted-foreground/50">
            <ArrowDown className="h-6 w-6" />
          </div>

          <div>
            <p className="mb-3 font-mono text-xs font-bold text-primary">02 · 실제 /notices 페이지에 노출</p>
            <BrowserFrame label="mintcl.app/notices" heightClassName="h-auto">
              <div className="p-1">
                <PublishedNoticesPreview />
              </div>
            </BrowserFrame>
          </div>
        </div>
      </div>

      {/* 다른 맞춤형 서비스 */}
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70">다른 맞춤형 서비스</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {OTHER_SERVICES.map((s) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className="rounded-full border border-border px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              {s.navLabel}
            </Link>
          ))}
        </div>
      </div>

      {/* 마무리 CTA */}
      <div className="border-t border-border bg-secondary/30 py-14 text-center">
        <div className="mx-auto max-w-md px-4">
          <p className="text-base font-bold text-foreground break-keep">직접 관리하고 싶은 콘텐츠가 있으신가요?</p>
          <p className="mt-2 text-sm text-muted-foreground break-keep">
            공지사항 외에도 상품, 매물, 배너 등 필요한 콘텐츠를 관리자에서 관리할 수 있게 구축합니다.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button asChild className="gap-2 font-bold">
              <Link to="/contact">
                <Send className="h-4 w-4" />
                구축 상담하기
              </Link>
            </Button>
            <Button asChild variant="outline" className="gap-1.5">
              <Link to="/website/features">
                전체 기능 소개 보기
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
