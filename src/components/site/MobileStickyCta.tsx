import { Link, useLocation } from "react-router-dom";
import { Send } from "lucide-react";

export function MobileStickyCta() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/contact")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur px-4 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] md:hidden">
      <Link
        to="/contact"
        className="flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary text-base font-bold text-primary-foreground shadow-xs active:opacity-90"
      >
        <Send className="h-4 w-4" />
        홈페이지 제작 상담 받기
      </Link>
    </div>
  );
}
