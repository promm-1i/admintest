import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { usePageTitle } from "@/hooks/usePageTitle";

export default function Gallery() {
  usePageTitle(
    "갤러리 — MINTCL STUDIO",
    "MINTCL STUDIO의 공간과 관리 현장을 사진으로 소개합니다.",
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-3xl font-semibold">갤러리</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        실제 이미지는 public/images 폴더에 추가한 뒤 연결할 예정입니다.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }, (_, i) => (
          <ImagePlaceholder key={i} ratio="square" label={`갤러리 이미지 ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}
