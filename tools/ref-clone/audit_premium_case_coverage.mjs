import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const samplesSource = fs.readFileSync(path.join(root, "src/lib/samples.ts"), "utf8");
const sampleBlocks = samplesSource.split(/\n  \{/);

const samples = sampleBlocks.flatMap((block) => {
  if (!/premium:\s*true/.test(block)) return [];
  const slug = block.match(/slug:\s*"([^"]+)/)?.[1];
  const liveUrl = block.match(/liveUrl:\s*"([^"]+)/)?.[1];
  if (!slug || !liveUrl) return [];
  return [{ slug, liveUrl }];
});

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}

function section(source, from, to) {
  const start = source.indexOf(from);
  if (start < 0) return "";
  const end = source.indexOf(to, start + from.length);
  return source.slice(start, end < 0 ? source.length : end);
}

const interactionPatterns = {
  slider: /swiper|splide|carousel|slider|slideTo|slideNext/i,
  tabs: /role=["']tab|data-tab|tablist|activeTab|\.tab\b/i,
  search: /type=["']search|searchInput|search-form|검색/i,
  filter: /data-filter|filter-button|filterItems|카테고리|필터/i,
  form: /<form\b|FormData|type=["']submit/i,
  faq: /accordion|faq-item|faq-question|자주\s*묻/i,
  modal: /dialog|modal|lightbox/i,
  map: /kakao\.maps|naver\.maps|google\.maps|map-container/i,
  scrollMotion: /ScrollTrigger|gsap\.|locomotive|lenis|intersectionobserver|position:\s*sticky/i,
};

const rows = samples.map(({ slug, liveUrl }) => {
  const templateName = liveUrl.split("/").filter(Boolean).at(-1);
  const templateDir = path.join(root, "public/templates", templateName);
  const files = walk(templateDir);
  const htmlFiles = files.filter((file) => file.endsWith(".html"));
  const behaviorSource = files
    .filter((file) => /\.(?:html|js|mjs|ts|tsx)$/.test(file))
    .map((file) => fs.readFileSync(file, "utf8"))
    .join("\n");

  const dataFile = path.join(root, "src/lib/caseStudies/data", `${slug}.ts`);
  const dataSource = fs.existsSync(dataFile) ? fs.readFileSync(dataFile, "utf8") : "";
  const pagesSource = section(dataSource, "pages:", "points:");
  const pointSource = section(dataSource, "points:", "features:");
  const representedPages = (pagesSource.match(/\bfile:\s*"/g) ?? []).length;
  const representedPoints = (pointSource.match(/\bimg:\s*"/g) ?? []).length;
  const captures = new Set(dataSource.match(/\/cases\/[^"']+\.webp/g) ?? []);
  const interactions = Object.entries(interactionPatterns)
    .filter(([, pattern]) => pattern.test(behaviorSource))
    .map(([name]) => name);

  return {
    slug,
    template: templateName,
    html: htmlFiles.length,
    interactions,
    representedPages,
    representedPoints,
    captures: captures.size,
    capabilityMap: /capabilities:\s*\{/.test(dataSource),
    coverage: htmlFiles.length > 0 ? Number((representedPages / htmlFiles.length).toFixed(2)) : 0,
  };
});

console.table(rows);
console.log(JSON.stringify(rows, null, 2));
