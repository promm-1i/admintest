import type { Sample } from "./samples";

/** 프리미엄 상세 캡처와 연결되는 키. */
export function getTemplateFolder(sample: Sample): string | undefined {
  return sample.slug.match(/^(.+)-template$/)?.[1];
}
