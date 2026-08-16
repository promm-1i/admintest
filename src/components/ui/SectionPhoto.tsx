import { cn } from "@/lib/utils";

type SectionPhotoProps = {
  src: string;
  className?: string;
};

/**
 * 화이트 배경 위에 은은하게 녹아드는 장식용 사진.
 * 텍스처가 아니라 실제 사진이라 저채도 워시 대신 radial mask로
 * 가장자리를 페이드시켜 화이트 배경에 자연스럽게 스며들게 한다.
 */
export function SectionPhoto({ src, className }: SectionPhotoProps) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      loading="lazy"
      className={cn(
        "pointer-events-none absolute hidden rounded-full object-cover opacity-90 lg:block",
        "[mask-image:radial-gradient(closest-side,black_35%,transparent_100%)]",
        className,
      )}
    />
  );
}
