export function ExternalSitePreview({ url }: { url: string }) {
  return (
    <iframe
      src={url}
      title="실제 제작 사이트 미리보기"
      loading="lazy"
      className="h-[80vh] w-full rounded-lg border border-border bg-card"
    />
  );
}
