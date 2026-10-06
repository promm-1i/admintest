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

/**
 * 데모가 원래 여러 쪽인 시안 — 원페이지로 파는데 서브 페이지가 이미 들어 있다.
 * 2026-10-05 결정으로 그 쪽까지 포함해 제작하므로, 상세에서 쪽 수를 밝혀
 * "원페이지라면서요"가 나오지 않게 한다. 숫자는 폴더의 .html 수 그대로다.
 * 폴더를 늘리거나 줄이면 이 표도 같이 고칠 것.
 */
export const MULTI_PAGE_TEMPLATES: Record<string, number> = {
  "moto-a": 6, "moto-a-basic": 6,
  "moto-b": 6, "moto-b-basic": 6,
  "moto-c": 6, "moto-c-basic": 6,
  "moto-d": 6, "moto-d-basic": 6,
  "moto-e": 6, "moto-e-basic": 6,
  "agency-a": 5,
  "restaurant-k": 5,
  "restaurant-l": 5,
  "interior-b": 4, "interior-b-basic": 4,
  "restaurant-g": 3,
  "restaurant-j": 3,
  "restaurant-i": 2,
};

/** 이 시안에 서브 페이지가 몇 쪽 들어 있나 (한 쪽짜리면 undefined) */
export function templatePageCount(sample: Sample): number | undefined {
  const folder = getTemplateFolder(sample);
  return folder ? MULTI_PAGE_TEMPLATES[folder] : undefined;
}
