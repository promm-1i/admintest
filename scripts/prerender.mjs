// dist/ 의 SPA 를 실제 브라우저로 한 번씩 열어 라우트별 HTML 을 저장한다.
// 실행: node scripts/prerender.mjs   (vite build 뒤에 돈다)
//
// 왜: 이 사이트는 순수 SPA 라 어떤 주소를 열어도 원시 HTML 이 index.html 하나다.
// 제목·설명·og 태그를 usePageTitle 이 자바스크립트로 바꾸는데, 카카오톡 · 네이버 ·
// 당근 미리보기 봇은 자바스크립트를 돌리지 않는다. 그래서 어느 페이지를 공유해도
// "NOVERIQ — 홈페이지부터 플랫폼형 웹까지" 하나로만 떴다. 네이버 크롤러도 마찬가지다.
//
// 무엇을: sitemap.xml 의 라우트 중 /samples/:slug 를 뺀 것만 돈다. 샘플 상세는 307개라
// 다 넣으면 빌드가 10분을 넘긴다. 필요해지면 routesFromSitemap 의 filter 를 풀면 된다.
//
// main.tsx 가 createRoot(hydrateRoot 아님)라 브라우저는 저장된 DOM 을 버리고 다시 그린다.
// 그래서 프리렌더 결과와 실제 렌더가 어긋나도 사용자 화면이 깨지지 않는다.
//
// 실패해도 배포를 막지 않는다. 브라우저를 못 띄우거나 라우트 하나가 깨져도 경고만
// 남기고 exit 0 으로 끝낸다 — 프리렌더가 없으면 예전과 똑같이 동작할 뿐이다.
import { createServer } from "node:http";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const PORT = 4183;

/** 색인 대상 라우트 — sitemap.xml 에서 /samples/ 를 뺀 것 */
function routesFromSitemap() {
  const xml = readFileSync(join(root, "public/sitemap.xml"), "utf8");
  return [...xml.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)]
    .map((m) => m[1] || "/")
    .filter((p) => !p.startsWith("/samples/"));
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

/** dist 를 그대로 서빙하고, 없는 경로는 SPA 처럼 index.html 로 넘긴다 */
function serveDist() {
  const index = readFileSync(join(dist, "index.html"));
  return createServer((req, res) => {
    const url = decodeURIComponent((req.url || "/").split("?")[0]);
    const file = join(dist, url);
    if (extname(url) && existsSync(file)) {
      res.writeHead(200, { "content-type": MIME[extname(url)] ?? "application/octet-stream" });
      res.end(readFileSync(file));
      return;
    }
    res.writeHead(200, { "content-type": MIME[".html"] });
    res.end(index);
  });
}

function warn(msg) {
  console.warn(`[prerender] ${msg}`);
}

async function main() {
  if (!existsSync(join(dist, "index.html"))) {
    warn("dist/index.html 이 없다 — vite build 뒤에 실행해야 한다. 건너뛴다.");
    return;
  }

  // 프리렌더하지 않은 라우트(/samples/:slug 307개)가 쓸 빈 껍데기를 먼저 떠 둔다.
  // "/" 를 프리렌더하면 dist/index.html 이 홈 내용으로 덮이는데, netlify.toml 의
  // catch-all 이 그걸 쓰면 다른 주소로 들어온 사람에게 홈이 한 번 스친다.
  // 브라우저를 못 띄워 프리렌더를 건너뛰더라도 이 파일은 항상 있어야 catch-all 이 산다.
  writeFileSync(join(dist, "app.html"), readFileSync(join(dist, "index.html")));

  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    warn("playwright 를 불러올 수 없다. 프리렌더 없이 진행한다.");
    return;
  }

  const routes = routesFromSitemap();
  const server = serveDist();
  await new Promise((r) => server.listen(PORT, r));

  let browser;
  let done = 0;
  const failed = [];
  try {
    browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

    for (const route of routes) {
      try {
        await page.goto(`http://localhost:${PORT}${route}`, {
          waitUntil: "networkidle",
          timeout: 20_000,
        });
        // usePageTitle 의 useEffect 가 제목·og 를 채울 때까지 기다린다
        await page.waitForFunction(() => document.title && document.title.length > 0, null, {
          timeout: 5_000,
        });

        // 끝까지 훑어 FadeIn·Reveal 을 전부 노출시킨다. 스크롤하지 않으면 화면 아래
        // 요소가 opacity-0 인 채로 저장되고, 검색엔진은 CSS 로 감춰진 본문을 깎아서 본다.
        await page.evaluate(async () => {
          const step = Math.round(window.innerHeight * 0.8);
          for (let y = 0; y < document.body.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 120));
          }
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(900);

        const html = await page.content();
        if (!/<title>.+<\/title>/.test(html)) throw new Error("제목이 비어 있다");

        const outDir = route === "/" ? dist : join(dist, route);
        mkdirSync(outDir, { recursive: true });
        writeFileSync(join(outDir, "index.html"), html);
        done += 1;
      } catch (e) {
        failed.push(`${route} (${e.message})`);
      }
    }
  } catch (e) {
    warn(`브라우저를 띄우지 못했다: ${e.message}. 프리렌더 없이 진행한다.`);
  } finally {
    await browser?.close();
    server.close();
  }

  console.log(`[prerender] ${done}/${routes.length} 라우트 저장`);
  if (failed.length) warn(`실패 ${failed.length}건: ${failed.slice(0, 5).join(", ")}`);
}

main().catch((e) => warn(`예상 못한 오류: ${e.message}`));
