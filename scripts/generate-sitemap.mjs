// public/sitemap.xml 생성기.
// 실행: node scripts/generate-sitemap.mjs  (템플릿·포트폴리오를 추가/삭제했으면 다시 실행)
// - 고정 라우트만 쓴다(2026-11-25 포트폴리오 · 업종별 쪽 삭제).
// - 데모(/web-solutions/*/demo)는 색인 대상에서 뺀다.
import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = "https://noveriq.co.kr"; // www는 apex로 301되므로 apex가 정본

const CORE_ROUTES = [
  "/",
  "/about",
  "/apps",
  "/contact",
  "/faq",
  "/notices",
  "/blog",
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

// 프리렌더되는 라우트는 dist/<route>/index.html 로 저장되고, Netlify 는 /about 을
// /about/ 로 301 한다. sitemap 이 슬래시 없는 주소를 내면 canonical 도 /about 으로 구워져
// "정본은 /about → /about 은 /about/ 로 리디렉션" 고리가 되어 둘 다 색인이 안 된다
// (2026-10-18 Search Console: 리디렉션 23 · 대체 페이지 9). 그래서 슬래시를 붙인다.
const withSlash = (u) => (u.endsWith("/") ? u : `${u}/`);
const urls = CORE_ROUTES.map(withSlash);
const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((u) => `  <url><loc>${ORIGIN}${u}</loc></url>`),
  "</urlset>",
  "",
].join("\n");

writeFileSync(join(root, "public/sitemap.xml"), xml);
console.log(`sitemap.xml 생성 완료 — URL ${urls.length}개`);
