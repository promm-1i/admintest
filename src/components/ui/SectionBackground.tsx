import { cn } from "@/lib/utils";

type SectionBackgroundProps = {
  src: string;
  /** 배경 이미지 노출 강도. 낮을수록 은은하게 묻힘 */
  opacity?: number;
  /** 섹션 배경색에 맞춘 오버레이 그라데이션 클래스 */
  overlayClassName?: string;
};

/**
 * 단색 배경이 심심해 보이지 않도록 아주 은은하게 깔아주는 텍스처 레이어.
 * 콘텐츠 판독성을 위해 배경색 그라데이션으로 위에 다시 덮는다.
 */
export function SectionBackground({
  src,
  opacity = 0.12,
  overlayClassName = "bg-gradient-to-b from-background/70 via-background/40 to-background/80",
}: SectionBackgroundProps) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <img
        src={src}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover"
        style={{ opacity }}
      />
      <div className={cn("absolute inset-0", overlayClassName)} />
    </div>
  );
}
