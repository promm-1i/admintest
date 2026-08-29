import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import { KAKAO_CHANNEL_URL, PHONE_TEL_HREF } from "@/lib/contact";

export function FloatingQuickActions() {
  return (
    <div className="fixed bottom-8 right-6 z-40 hidden flex-col gap-3 md:flex">
      <a
        href={KAKAO_CHANNEL_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="카카오톡 상담"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FEE500] text-[#191919] shadow-lg transition-transform hover:-translate-y-1"
      >
        <MessageCircle className="size-5 fill-[#191919]" />
      </a>
      <a
        href={PHONE_TEL_HREF}
        aria-label="전화 상담"
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:-translate-y-1"
      >
        <Phone className="size-5" />
      </a>
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="맨 위로"
        className="mt-1 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-muted-foreground shadow-sm transition-colors hover:text-foreground"
      >
        <ArrowUp className="size-5" />
      </button>
    </div>
  );
}
