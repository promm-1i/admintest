// 사이트맵에 오른 정적 쪽(앱 안내 한 · 영)에 구글 애널리틱스를 넣는다 — dist 로 복사된 뒤에.
// 실행: node scripts/static-analytics.mjs   (static-canonical.mjs 뒤에 돈다)
//
// 왜: SPA 쪽은 src/lib/analytics.ts 가 모으지만, public/<앱>/ 의 정적 html 은 SPA 를 안 거쳐 접속이 안 잡힌다.
// 측정 ID 는 analytics.ts 의 GA_MEASUREMENT_ID 하나만 쓴다. 비어 있으면 아무것도 안 넣는다.
// SPA 쪽과 같게 noveriq.co.kr 에서 열렸을 때만 불러온다(미리보기 주소 · 로컬은 안 셈).
// 실패해도 배포를 막지 않는다(prerender.mjs 와 같은 원칙).
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

try {
  const id = readFileSync(join(root, "src/lib/analytics.ts"), "utf8").match(/GA_MEASUREMENT_ID = "([^"]*)"/)?.[1] ?? "";
  if (!/^G-[A-Z0-9]+$/.test(id)) {
    console.log("[static-analytics] 측정 ID 가 비어 있어 건너뜀");
  } else {
    // 함수로 감싸 전역 이름을 만들지 않는다(쪽 스크립트의 const s 같은 것과 겹치면 그 스크립트가 통째로 안 돈다)
    const snippet =
      `<script>(function(){if(location.hostname!=="noveriq.co.kr")return;var s=document.createElement("script");s.async=true;` +
      `s.src="https://www.googletagmanager.com/gtag/js?id=${id}";document.head.appendChild(s);` +
      `window.dataLayer=window.dataLayer||[];function gtag(){window.dataLayer.push(arguments);}gtag("js",new Date());gtag("config","${id}");})();</script>`;
    const xml = readFileSync(join(root, "public/sitemap.xml"), "utf8");
    let added = 0;
    for (const [, route] of xml.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)) {
      if (!existsSync(join(root, "public", route, "index.html"))) continue; // SPA 쪽은 analytics.ts 가 맡는다
      const file = join(root, "dist", route, "index.html");
      let html = readFileSync(file, "latin1"); // 바이트를 그대로 둔다(넣는 글은 ASCII 뿐)
      if (html.includes("googletagmanager.com/gtag/js")) continue;
      const at = html.search(/<\/head>/i);
      if (at < 0) continue;
      writeFileSync(file, html.slice(0, at) + snippet + html.slice(at), "latin1");
      added++;
    }
    console.log(`[static-analytics] ${id} 를 정적 쪽 ${added}곳에 넣음`);
  }
} catch (err) {
  console.warn(`[static-analytics] 실패 — 배포는 계속한다: ${err.message}`);
}
