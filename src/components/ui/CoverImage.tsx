import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * 전체 배경을 채우는 이미지. 파일이 없거나 로드에 실패하면 아무것도 렌더링하지 않아
 * 부모 요소에 미리 준비된 그라데이션 배경이 자연스럽게 대신 보이도록 한다.
 */
export function CoverImage({ src, alt = "", className }: { src?: string; alt?: string; className?: string }) {
  const [errored, setErrored] = useState(false);
  if (!src || errored) return null;

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setErrored(true)}
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
    />
  );
}
