import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Package,
  CalendarCheck,
  LayoutGrid,
  CircleDollarSign,
  MessageSquare,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const CLOSE_DELAY = 150;

// href가 없는 항목은 아직 실제 페이지가 없는 솔루션 카테고리입니다 — 링크로 위장하지
// 않고 "준비 중" 표시만 붙여둔 정적 항목으로 렌더링합니다. 나중에 페이지가 생기면
// href만 채우면 됩니다.
export const WEB_SOLUTION_CATEGORIES: { icon: typeof Building2; title: string; desc: string; href?: string }[] = [
  {
    icon: Building2,
    title: "부동산 매물관리",
    desc: "매물 등록 · 검색 · 지도 · 관리자",
  },
  {
    icon: Package,
    title: "제품 / 견적관리",
    desc: "제품관리 · 카테고리 · 검색 · 자료실 · 견적문의",
  },
  {
    icon: CalendarCheck,
    title: "예약 / 고객관리",
    desc: "예약접수 · 일정관리 · 고객관리 · 관리자",
  },
  {
    icon: LayoutGrid,
    title: "플랫폼형 웹서비스",
    desc: "회원 · 권한 · 데이터베이스 · 업무관리 · API 연동",
  },
  {
    icon: CircleDollarSign,
    title: "기능 및 요금",
    desc: "웹 솔루션 구축 범위와 이용방식 안내",
    href: "/web-solutions",
  },
  {
    icon: MessageSquare,
    title: "구축 문의",
    desc: "필요한 기능에 맞춘 맞춤 상담",
    href: "/contact",
  },
];

/**
 * 데스크톱: 트리거 버튼과 패널을 한 컴포넌트 안에서 같이 관리한다. 열림/닫힘은
 * hover가 아니라 "닫기 타이머"로 제어해서, 버튼→패널 사이에 시각적인 틈이 있어도
 * (DOM상 서로 다른 위치) CLOSE_DELAY 안에 다시 진입하면 닫히지 않는다.
 * 모바일: 같은 데이터로 기존 아코디언 컴포넌트를 재사용해 별도 컴포넌트(MobileAccordion)로 렌더링.
 */
export function WebSolutionMegaMenu() {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<number | undefined>(undefined);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const cancelClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = undefined;
    }
  };

  const openNow = () => {
    cancelClose();
    setOpen(true);
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY);
  };

  const closeAndFocusTrigger = () => {
    cancelClose();
    setOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => () => cancelClose(), []);

  return (
    <div>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="web-solution-menu"
        className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        onMouseEnter={openNow}
        onMouseLeave={scheduleClose}
        onClick={() => (open ? closeAndFocusTrigger() : openNow())}
        onKeyDown={(e) => {
          if (e.key === "Escape") closeAndFocusTrigger();
        }}
      >
        웹 솔루션
        <ChevronDown className={cn("size-3.5 transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div
          id="web-solution-menu"
          role="region"
          aria-label="웹 솔루션 메뉴"
          className="absolute inset-x-0 top-full z-50 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-1 motion-safe:duration-150"
          onMouseEnter={openNow}
          onMouseLeave={scheduleClose}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeAndFocusTrigger();
          }}
        >
          <div className="border-b border-border bg-background shadow-md">
            <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1fr_320px]">
              <ul className="grid gap-1.5 sm:grid-cols-2">
                {WEB_SOLUTION_CATEGORIES.map((item) => {
                  const Icon = item.icon;
                  const isReal = Boolean(item.href);
                  const content = (
                    <>
                      <div
                        className={cn(
                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                          isReal ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground",
                        )}
                      >
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0">
                        <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                          {item.title}
                          {!isReal && (
                            <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-normal text-muted-foreground">
                              준비 중
                            </span>
                          )}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground break-keep">
                          {item.desc}
                        </p>
                      </div>
                    </>
                  );

                  return (
                    <li key={item.title}>
                      {isReal ? (
                        <Link
                          to={item.href!}
                          onClick={() => setOpen(false)}
                          className="flex items-start gap-3 rounded-xl border border-primary/20 bg-primary/5 p-3 transition-colors hover:border-primary/40 hover:bg-primary/10"
                        >
                          {content}
                        </Link>
                      ) : (
                        <div className="flex items-start gap-3 rounded-xl p-3">{content}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="rounded-2xl bg-secondary/50 p-6">
                <p className="text-base font-semibold leading-snug text-foreground break-keep">
                  홈페이지를 넘어, 실제 업무가
                  <br />
                  돌아가는 웹서비스까지
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground break-keep">
                  기업 홈페이지부터 관리자 시스템, 데이터베이스, 검색, 예약, 회원관리 등 실제 업무에
                  활용할 수 있는 웹서비스까지 구축합니다.
                </p>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                >
                  상담 문의하기 <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
