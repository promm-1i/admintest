import { MessageCircle, Phone, ArrowUp, Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { KAKAO_CHANNEL_URL, PHONE_TEL_HREF } from "@/lib/contact";

/** 호버 시 왼쪽으로 라벨이 펼쳐지는 플로팅 버튼 한 벌 */
function FloatingItem({
  label,
  className,
  children,
}: {
  label: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <span className="group/float relative flex justify-end">
      <span
        aria-hidden
        className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 translate-x-1 whitespace-nowrap rounded-full bg-neutral-900 px-3.5 py-2 text-xs font-bold text-white opacity-0 shadow-lg transition-all duration-200 group-hover/float:translate-x-0 group-hover/float:opacity-100"
      >
        {label}
        <span className="absolute left-full top-1/2 -translate-y-1/2 border-y-4 border-l-4 border-y-transparent border-l-neutral-900" />
      </span>
      <span className={className}>{children}</span>
    </span>
  );
}

export function FloatingQuickActions() {
  return (
    <div className="fixed bottom-8 right-6 z-40 hidden flex-col gap-3 md:flex">
      <Link to="/estimate" aria-label="1분 견적 계산기">
        <FloatingItem
          label="1분 견적 계산기"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white shadow-lg transition-transform hover:-translate-y-1"
        >
          <Calculator className="size-5" />
        </FloatingItem>
      </Link>
      <a href={KAKAO_CHANNEL_URL} target="_blank" rel="noopener noreferrer" aria-label="카카오톡 상담">
        <FloatingItem
          label="카카오톡으로 문의하기"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FEE500] text-[#191919] shadow-lg transition-transform hover:-translate-y-1"
        >
          <MessageCircle className="size-5 fill-[#191919]" />
        </FloatingItem>
      </a>
      <a href={PHONE_TEL_HREF} aria-label="전화 상담">
        <FloatingItem
          label="전화로 문의하기"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:-translate-y-1"
        >
          <Phone className="size-5" />
        </FloatingItem>
      </a>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="맨 위로"
        className="mt-1 self-end"
      >
        <FloatingItem
          label="맨 위로"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition-colors hover:text-foreground"
        >
          <ArrowUp className="size-5" />
        </FloatingItem>
      </button>
    </div>
  );
}
