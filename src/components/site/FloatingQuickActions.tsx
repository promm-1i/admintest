import { ArrowUp, Bot, HelpCircle, MessageSquareText } from "lucide-react";
import { Link } from "react-router-dom";
import { KAKAO_CHANNEL_URL } from "@/lib/contact";

function QuickCircle({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <span className="group relative flex justify-end">
      <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-foreground px-3 py-1.5 text-xs font-bold text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        {label}
      </span>
      <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-lg transition-transform hover:-translate-y-1">
        {children}
      </span>
    </span>
  );
}

export function FloatingQuickActions() {
  return (
    <div className="fixed bottom-14 right-6 z-40 hidden flex-col gap-2 md:flex lg:right-8">
      <Link to="/faq" aria-label="FAQ">
        <QuickCircle label="FAQ">
          <HelpCircle className="size-5" />
        </QuickCircle>
      </Link>
      <a href={KAKAO_CHANNEL_URL} target="_blank" rel="noopener noreferrer" aria-label="챗봇 문의">
        <QuickCircle label="챗봇 문의">
          <Bot className="size-5" />
        </QuickCircle>
      </a>
      <Link to="/contact" aria-label="1:1 문의">
        <QuickCircle label="1:1 문의">
          <MessageSquareText className="size-5" />
        </QuickCircle>
      </Link>
      <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="페이지 최상단 이동">
        <QuickCircle label="페이지 최상단 이동">
          <ArrowUp className="size-5" />
        </QuickCircle>
      </button>
    </div>
  );
}
