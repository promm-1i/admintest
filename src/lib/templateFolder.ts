import type { Sample } from "./samples";

/**
 * 템플릿 폴더명 — TEMPLATE_SECTIONS 키와 /thumbs/sections/ 캡처 파일이 이 이름으로 묶인다.
 * /templates/<폴더>/ 에 있으면 그 폴더명이고, 브랜드 주소(/nuriwell/ 등)로 옮긴 프리미엄은
 * 주소에 이름이 남지 않아 슬러그에서 -template 를 뗀다 (corporate-k-template → corporate-k).
 * capture_sections.mjs 도 같은 규칙으로 키를 만든다.
 * 폴더를 먼저 보는 건 real-estate-b-template(폴더 realestate-b)처럼 슬러그와 폴더가 다른 템플릿이 있어서다.
 */
export function getTemplateFolder(sample: Sample): string | undefined {
  return sample.liveUrl?.match(/\/templates\/([a-z0-9-]+)\//)?.[1] ?? sample.slug.match(/^(.+)-template$/)?.[1];
}
