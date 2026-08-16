import { cn } from "@/lib/utils";

type SectionPhotoProps = {
  src: string;
  className?: string;
  fade?: "radial" | "left" | "right";
  opacity?: number;
  grayscale?: boolean;
};

const FADE_MASK: Record<NonNullable<SectionPhotoProps["fade"]>, string> = {
  radial: "radial-gradient(ellipse at center, black 0%, transparent 75%)",
  left: "linear-gradient(to right, black 0%, black 40%, transparent 90%)",
  right: "linear-gradient(to left, black 0%, black 40%, transparent 90%)",
};

/**
 * 화이트 배경 위에 거의 안 보일 정도로만 스며드는 장식용 사진.
 * 섹션 전체를 덮는 배경으로 깔고 opacity를 아주 낮게(기본 5%) 줘서
 * 카드/텍스트 뒤에서 텍스처로만 느껴지게 한다.
 */
export function SectionPhoto({
  src,
  className,
  fade = "radial",
  opacity = 0.05,
  grayscale = true,
}: SectionPhotoProps) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      loading="lazy"
      style={{
        opacity,
        maskImage: FADE_MASK[fade],
        WebkitMaskImage: FADE_MASK[fade],
        filter: grayscale ? "grayscale(30%)" : undefined,
      }}
      className={cn(
        "pointer-events-none absolute inset-0 hidden h-full w-full object-cover lg:block",
        className,
      )}
    />
  );
}
