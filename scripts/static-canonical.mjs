// public/ 의 정적 템플릿 쪽(프리미엄 · 템플릿 미리보기)에 canonical 을 넣는다 — dist 로 복사된 뒤에.
// 실행: node scripts/static-canonical.mjs   (sample-meta.mjs 뒤에 돈다)
//
// 왜: Netlify 는 /bitgyeol/doctors.html 과 /bitgyeol/doctors, /soran/ 과 /soran/index.html 을
// 같은 내용으로 둘 다 200 으로 준다. ?type=buy · ?f=188 같은 쿼리 주소도 마찬가지다. 정적 쪽에는
// canonical 이 없어서 서치콘솔이 "사용자가 선택한 표준이 없는 중복 페이지"로 뺐다(2026-11-04, 62행).
// 원본 html 수천 개와 빌더를 고치는 대신 배포본에만 넣는다 — 빌더를 다시 돌려도 안 빠지고 새 템플릿에도 저절로 들어간다.
//
// 규칙: index.html → 폴더 주소(슬래시 끝), x.html → 확장자 뺀 주소(Netlify 가 내부 링크를 그렇게 고쳐 쓴다).
// 같은 이름 폴더가 있으면 확장자 뺀 주소가 그 폴더로 갈 수 있어 .html 주소를 그대로 쓴다.
// 이미 noveriq.co.kr 주소로 canonical 이 있는 쪽은 그대로 둔다. 옛 도메인(www.mintcl.com) · example.com ·
// 작업용 상대 경로(./01-about-php.html) · '#' 을 가리키는 canonical 은 자기 주소로 바꾼다(빌더가 남긴 것, 11-04 202쪽).
// noindex · meta refresh 쪽, <head> 가 없는 조각은 건드리지 않는다.
// public/ 하위 폴더의 파일만 본다 — dist/app.html(SPA 껍데기)에 들어가면 모든 SPA 주소가 한 주소를 정본으로 가리킨다.
// 실패해도 배포를 막지 않는다(prerender.mjs 와 같은 원칙) — 경고만 남기고 끝낸다.
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pub = join(root, "public");
const dist = join(root, "dist");
const ORIGIN = "https://noveriq.co.kr";

/** public/ 아래 하위 폴더의 .html 상대 경로(맨 위 파일은 빼고) */
function htmlFiles(dir, rel = "") {
  const out = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const r = rel ? `${rel}/${e.name}` : e.name;
    if (e.isDirectory()) out.push(...htmlFiles(join(dir, e.name), r));
    else if (rel && e.name.endsWith(".html")) out.push(r);
  }
  return out;
}

// 한글 · 빈칸만 인코딩하고 '=' '&' 같은 문자는 내부 링크와 같게 그대로 둔다
const encodePath = (p) => encodeURI(p).replace(/[?#]/g, encodeURIComponent);

function canonicalUrl(rel) {
  const parts = rel.split("/");
  const name = parts.pop();
  const base = encodePath(parts.join("/"));
  if (name === "index.html") return `${ORIGIN}/${base}/`;
  const stem = name.slice(0, -5);
  const dirClash = existsSync(join(pub, ...parts, stem)) && statSync(join(pub, ...parts, stem)).isDirectory();
  return `${ORIGIN}/${base}/${encodePath(dirClash ? name : stem)}`;
}

const CANONICAL = /<link[^>]+rel=["']?canonical[^>]*>/gi;

try {
  let added = 0, replaced = 0;
  const skipped = { own: 0, noindex: 0, refresh: 0, nohead: 0, missing: 0 };
  for (const rel of htmlFiles(pub)) {
    const file = join(dist, ...rel.split("/"));
    if (!existsSync(file)) { skipped.missing++; continue; }
    // latin1 로 읽고 써서 바이트를 그대로 둔다(넣는 태그는 ASCII 뿐)
    let html = readFileSync(file, "latin1");
    const tags = html.match(CANONICAL) || [];
    if (tags.some((t) => /href=["']?https:\/\/noveriq\.co\.kr\//i.test(t))) { skipped.own++; continue; }
    if (/<meta[^>]+name=["']?robots["']?[^>]+noindex/i.test(html)) { skipped.noindex++; continue; }
    if (/<meta[^>]+http-equiv=["']?refresh/i.test(html)) { skipped.refresh++; continue; }
    if (tags.length) { html = html.replace(CANONICAL, ""); replaced++; } else added++;
    const at = html.search(/<\/head>/i);
    if (at < 0) { skipped.nohead++; tags.length ? replaced-- : added--; continue; }
    const tag = `<link rel="canonical" href="${canonicalUrl(rel)}">`;
    writeFileSync(file, html.slice(0, at) + tag + html.slice(at), "latin1");
  }
  console.log(`[static-canonical] canonical 추가 ${added}쪽 · 바깥 주소에서 바꿈 ${replaced}쪽 · 건너뜀 ${JSON.stringify(skipped)}`);
} catch (err) {
  console.warn(`[static-canonical] 실패 — 배포는 계속한다: ${err.message}`);
}
