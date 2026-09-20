import { chromium } from "playwright";

const base = "http://127.0.0.1:4173";
const cases = [
  {
    slug: "corporate-g-template",
    title: "기술·공정·설비·제품·견적을 21개 제조영업 화면으로 구현했습니다",
    stats: ["21", "5", "8", "4"],
  },
  {
    slug: "corporate-h-template",
    title: "산업별 솔루션·제품·생산거점·문의까지 17개 화면으로 설계했습니다",
    stats: ["17", "5", "6", "10"],
  },
  {
    slug: "corporate-i-template",
    title: "사업·제품·연구·ESG를 39개 실제 화면으로 연결했습니다",
    stats: ["39", "7", "17", "6"],
  },
  {
    slug: "corporate-j-template",
    title: "제품 필터·사양·대리점·A/S까지 23개 제조영업 화면으로 연결했습니다",
    stats: ["23", "6", "7", "5"],
  },
  {
    slug: "corporate-k-template",
    title: "여섯 브랜드와 R&D·사회공헌·고객지원까지 22개 화면에 담았습니다",
    stats: ["22", "6", "10", "4"],
  },
  {
    slug: "corporate-l-template",
    title: "사업·글로벌·투자·ESG·채용을 19개 실제 화면으로 운영합니다",
    stats: ["19", "6", "5", "4"],
  },
  {
    slug: "corporate-m-template",
    title: "여섯 사업의 기술·인증·자료·문의 흐름을 26개 화면으로 구축했습니다",
    stats: ["26", "6", "4", "4"],
  },
  {
    slug: "corporate-n-template",
    title: "사업·글로벌 거점·ESG·IR을 22개 화면의 그룹 포털로 구성했습니다",
    stats: ["22", "5", "10", "3"],
  },
  {
    slug: "corporate-o-template",
    title: "원료 검색부터 연구 근거와 샘플 문의까지 23개 화면으로 완성했습니다",
    stats: ["23", "2", "4", "4"],
  },
  {
    slug: "corporate-q-template",
    title: "기관 홈페이지에 필요한 업무 흐름을 96개 실제 화면으로 연결했습니다",
    stats: ["96", "7", "21", "15"],
  },
  {
    slug: "corporate-r-template",
    title: "대기업·그룹사 홈페이지의 운영 범위를 290개 화면으로 구현했습니다",
    stats: ["290", "108", "103", "21"],
  },
  {
    slug: "corporate-s-template",
    title: "기록을 읽는 페이지가 아니라 전시를 탐색하는 경험으로 구성했습니다",
    stats: ["11", "3", "6", "2"],
  },
];
const viewports = [
  { width: 1440, height: 900 },
  { width: 768, height: 900 },
  { width: 390, height: 844 },
];

const browser = await chromium.launch({ headless: true });
const failures = [];

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport, reducedMotion: "reduce" });

  for (const item of cases) {
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    await page.goto(`${base}/samples/${item.slug}`, { waitUntil: "networkidle" });
    const title = page.getByRole("heading", { name: item.title });
    const section = title.locator("xpath=ancestor::section[1]");
    const buttons = section.getByRole("button");
    const actualStats = await section.locator("strong").allTextContents();
    const initialHref = await section.getByRole("link", { name: /실제 화면 새 창으로 보기/ }).getAttribute("href");

    if (viewport.width === 1440) {
      for (let i = 0; i < (await buttons.count()); i += 1) {
        await buttons.nth(i).click();
        const pressed = await buttons.nth(i).getAttribute("aria-pressed");
        const activeLink = section.getByRole("link", { name: /실제 화면 새 창으로 보기/ });
        const href = await activeLink.getAttribute("href");
        const imageReady = await activeLink.locator("img").evaluate(async (image) => {
          if (image.complete && image.naturalWidth > 0) return true;
          try {
            await image.decode();
            return image.naturalWidth > 0;
          } catch {
            return false;
          }
        });
        if (pressed !== "true" || !href || (i > 0 && href === initialHref) || !imageReady) {
          failures.push({ slug: item.slug, viewport, interactionIndex: i, pressed, href, initialHref, imageReady });
        }
      }
    }

    const images = section.locator("img");
    for (let i = 0; i < (await images.count()); i += 1) {
      await images.nth(i).scrollIntoViewIfNeeded();
    }
    await page.waitForTimeout(100);

    const result = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      broken: [...document.images]
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.src),
    }));
    const summary = {
      slug: item.slug,
      viewport: `${viewport.width}x${viewport.height}`,
      title: await title.count(),
      buttons: await buttons.count(),
      stats: actualStats,
      overflow: result.overflow,
      broken: result.broken.length,
      consoleErrors: errors.length,
    };
    console.log(JSON.stringify(summary));

    if (
      summary.title !== 1 ||
      summary.buttons !== 6 ||
      JSON.stringify(actualStats) !== JSON.stringify(item.stats) ||
      result.overflow > 1 ||
      result.broken.length > 0 ||
      errors.length > 0
    ) {
      failures.push({ ...summary, brokenSources: result.broken, errors });
    }

    await page.close();
  }

  await context.close();
}

await browser.close();

if (failures.length > 0) {
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}

console.log("CAPABILITY_SHOWCASES_OK");
