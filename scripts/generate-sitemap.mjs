// public/sitemap.xml 생성기.
// 실행: node scripts/generate-sitemap.mjs  (템플릿·포트폴리오를 추가/삭제했으면 다시 실행)
// - 고정 라우트 + src/lib/samples.ts의 상세 페이지(/samples/:slug)를 합쳐서 쓴다.
// - /templates/<dir>/ 정적 템플릿 원본과 데모(/web-solutions/*/demo)는 색인 대상이 아니라 뺀다.
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://noveriq.co.kr"; // www는 apex로 301되므로 apex가 정본

const CORE_ROUTES = [
  "/",
  "/about",
  "/contact",
  "/faq",
  "/notices",
  "/blog",
  "/estimate",
  "/homepage",
  "/samples",
  "/templates",
  "/website/process",
  "/website/price",
  "/website/features",
  "/website/maintenance",
  "/services/custom",
  "/services/admin-system",
  "/services/inquiry-reservation",
  "/services/search-filter",
  "/services/content-management",
  "/services/database-api",
  "/services/responsive",
  "/services/seo",
  "/web-solutions",
  "/web-solutions/demos",
  "/web-solutions/product-quotes",
  "/web-solutions/reservations",
  "/web-solutions/platform",
  "/web-solutions/real-estate",
  "/web-solutions/rentcar",
  "/web-solutions/hospital",
  "/web-solutions/academy",
  "/web-solutions/interior",
  "/web-solutions/moving",
];

// samples.ts에서 detailHref 없는 항목만 — 그 항목들만 /samples/:slug 상세 페이지를 가진다
const samplesSrc = readFileSync(join(root, "src/lib/samples.ts"), "utf8");
const sampleRoutes = [];
for (const entry of samplesSrc.split(/\n  \{/).slice(1)) {
  const slug = entry.match(/slug: "([^"]+)"/)?.[1];
  if (slug && !entry.includes("detailHref:")) sampleRoutes.push(`/samples/${slug}`);
}

const urls = [...CORE_ROUTES, ...sampleRoutes];
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((u) => `  <url><loc>${ORIGIN}${u}</loc></url>`),
  "</urlset>",
  "",
].join("\n");

writeFileSync(join(root, "public/sitemap.xml"), xml);
console.log(`sitemap.xml 생성 완료 — URL ${urls.length}개 (고정 ${CORE_ROUTES.length} + 샘플 ${sampleRoutes.length})`);
