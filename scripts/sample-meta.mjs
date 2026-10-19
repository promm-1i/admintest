// /samples/:slug 상세 쪽마다 제목 · 설명 · canonical 만 넣은 HTML 을 굽는다 — 브라우저 없이.
// 실행: node scripts/sample-meta.mjs   (prerender.mjs 뒤에 돈다. dist/app.html 을 틀로 쓴다)
//
// 왜: 샘플 상세는 400쪽이 넘어 prerender.mjs 로 다 돌리면 Netlify 빌드가 25분쯤 걸린다
// (기본 제한 15분, 2026-10-19 측정). 그렇다고 두면 첫 HTML 이 app.html 빈 껍데기라
// 카카오톡 · 네이버 미리보기와 네이버 검색에 어느 샘플이든 사이트 기본 제목으로만 잡힌다.
// 그래서 메타만 굽고 본문은 예전처럼 브라우저가 그린다.
//
// 값은 SampleDetail 의 usePageTitle 과 같은 규칙으로 만든다. 그 규칙을 바꾸면 여기도 바꿀 것.
// 실패해도 배포를 막지 않는다(prerender.mjs 와 같은 원칙) — 경고만 남기고 끝낸다.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const ORIGIN = "https://noveriq.co.kr";

const escapeHtml = (s) =>
  s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

/** samples.ts 항목에서 `key: "..."` 문자열 값을 꺼낸다(값이 다음 줄로 넘어가도 된다) */
function field(entry, key) {
  const m = entry.match(new RegExp(`\\n {4}${key}:\\s*("(?:[^"\\\\]|\\\\.)*")`));
  return m ? JSON.parse(m[1]) : undefined;
}

/** samples.ts 의 상세 페이지 항목 — generate-sitemap.mjs 와 같은 기준(detailHref 없는 것) */
function readSamples() {
  const src = readFileSync(join(root, "src/lib/samples.ts"), "utf8");
  const out = [];
  for (const entry of src.split(/\n {2}\{/).slice(1)) {
    const slug = entry.match(/slug: "([^"]+)"/)?.[1];
    if (!slug || entry.includes("detailHref:")) continue;
    out.push({
      slug,
      industry: field(entry, "industry"),
      title: field(entry, "title"),
      purpose: field(entry, "purpose"),
      hasIndustryKey: /\n {4}industryKey:/.test(entry),
    });
  }
  return out;
}

const META_KEYS = "description|og:title|og:description|og:url|twitter:title|twitter:description";
const OLD_META = new RegExp(`<meta[^>]*(?:name|property)="(?:${META_KEYS})"[^>]*>\\s*`, "g");
const OLD_CANONICAL = /<link[^>]*rel="canonical"[^>]*>\s*/g;

function main() {
  const shellPath = join(dist, "app.html");
  if (!existsSync(shellPath)) {
    console.warn("[sample-meta] dist/app.html 이 없다 — prerender.mjs 뒤에 실행해야 한다. 건너뛴다.");
    return;
  }
  const shell = readFileSync(shellPath, "utf8").replace(OLD_META, "").replace(OLD_CANONICAL, "");

  let done = 0;
  for (const s of readSamples()) {
    // SampleDetail: industryKey 가 있으면 "제목 — NOVERIQ", 없으면 "업종 실시간 미리보기 — NOVERIQ"
    const title = s.hasIndustryKey ? `${s.title} — NOVERIQ` : `${s.industry} 실시간 미리보기 — NOVERIQ`;
    const url = `${ORIGIN}/samples/${s.slug}/`;
    const t = escapeHtml(title);
    const d = escapeHtml(s.purpose);
    const tags = [
      `<meta name="description" content="${d}" />`,
      `<meta property="og:title" content="${t}" />`,
      `<meta property="og:description" content="${d}" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta name="twitter:title" content="${t}" />`,
      `<meta name="twitter:description" content="${d}" />`,
      `<link rel="canonical" href="${url}" />`,
    ];
    const html = shell
      .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`)
      .replace("</head>", `    ${tags.join("\n    ")}\n  </head>`);

    const outDir = join(dist, "samples", s.slug);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, "index.html"), html);
    done += 1;
  }
  console.log(`[sample-meta] 샘플 ${done}쪽 메타 저장`);
}

try {
  main();
} catch (e) {
  console.warn(`[sample-meta] 예상 못한 오류: ${e.message}`);
}
