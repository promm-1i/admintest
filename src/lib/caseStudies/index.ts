import type { CaseStudy } from "./types";

export type { CaseStudy } from "./types";

/**
 * 사례 소개 본문은 디자인마다 파일 하나(data/<샘플 슬러그>.ts)로 두고, 그 상세페이지를 열 때만 불러온다.
 * 37종을 한 번에 묶으면 상세페이지 코드가 수백 KB 늘기 때문이다.
 * 파일이 있는 슬러그만 SampleDetail 이 사례형으로 그린다 — 새 디자인은 파일만 추가하면 된다.
 */
const loaders = import.meta.glob<{ default: CaseStudy }>("./data/*.ts");

const keyOf = (slug: string) => `./data/${slug}.ts`;

export function hasCaseStudy(slug: string): boolean {
  return keyOf(slug) in loaders;
}

export async function loadCaseStudy(slug: string): Promise<CaseStudy | undefined> {
  const load = loaders[keyOf(slug)];
  return load ? (await load()).default : undefined;
}
