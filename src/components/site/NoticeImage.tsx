import { useQuery } from "@tanstack/react-query";
import { getNoticeImageUrl } from "@/lib/api/notices";
import { ImagePlaceholder } from "./ImagePlaceholder";

export function NoticeImage({ path, alt }: { path: string | null; alt: string }) {
  const { data } = useQuery({
    queryKey: ["notice-image", path],
    queryFn: () => getNoticeImageUrl(path),
    enabled: Boolean(path),
  });

  if (!path) return null;
  return <ImagePlaceholder src={data ?? null} alt={alt} ratio="video" label="이미지 불러오는 중" />;
}