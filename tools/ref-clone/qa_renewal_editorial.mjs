import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const base = "http://127.0.0.1:4179/renewal-editorial";
const output = path.resolve("docs/renewal-editorial/qa");
await fs.mkdir(output, { recursive: true });

const routes = process.env.QA_MAIN_ONLY ? ["/"] : [
  "/", "/website/process", "/website/price", "/website/features", "/website/maintenance",
  "/services/custom", "/services/admin-system", "/services/inquiry-reservation", "/services/search-filter",
  "/services/content-management", "/services/database-api", "/services/responsive", "/services/seo",
  "/web-solutions", "/web-solutions/demos", "/templates", "/samples", "/about", "/estimate", "/privacy", "/homepage", "/homepage/rentcar", "/web-solutions/real-estate", "/web-solutions/academy", "/blog", "/samples/corporate-q-template", "/samples/corporate-r-template", "/samples/corporate-s-template", "/contact", "/notices", "/faq",
];
const viewports = [
  { name: "1440", width: 1440, height: 900 },
  { name: "768", width: 768, height: 900 },
  { name: "390", width: 390, height: 844 },
];

const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = [];
const sourceReport = [];
async function activateScrollScenes(page) {
  await page.evaluate(async () => {
    const height = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
    for (let y = 0; y <= height; y += Math.max(300, Math.floor(innerHeight * .72))) {
      scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 35));
    }
    scrollTo(0, 0);
  });
  await page.waitForTimeout(200);
}
async function captureSceneStates(page, prefix, viewportName, selectors) {
  for (const [name, selector] of Object.entries(selectors)) {
    const node = page.locator(selector).first();
    if (await node.count() === 0) continue;
    await node.evaluate((element) => {
      document.documentElement.style.scrollBehavior = "auto";
      element.scrollIntoView({ block: "center" });
    });
    await page.waitForTimeout(2400);
    await page.screenshot({ path: path.join(output, `${prefix}-${name}-${viewportName}.png`) });
  }
}
for (const viewport of viewports) {
  const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (msg) => { if (msg.type() === "error") consoleErrors.push(msg.text()); });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  for (const route of routes) {
    consoleErrors.length = 0;
    const response = await page.goto(`${base}${route === "/" ? "" : route}`, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(250);
    const metrics = await page.evaluate(() => {
      const root = document.documentElement;
      const sections = [...document.querySelectorAll(".re-home > section, .re-home > .re-tomorrow")].map((section) => {
        const rect = section.getBoundingClientRect();
        return { className: section.className, y: Math.round(rect.top + scrollY), height: Math.round(rect.height) };
      });
      const brokenImages = [...document.images].filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.currentSrc || image.src);
      const h1 = document.querySelector("h1");
      return {
        title: document.title,
        h1: h1?.textContent?.replace(/\s+/g, " ").trim() ?? "",
        h1Font: h1 ? getComputedStyle(h1).fontFamily : "",
        documentHeight: Math.max(root.scrollHeight, document.body.scrollHeight),
        horizontalOverflow: Math.max(root.scrollWidth, document.body.scrollWidth) - innerWidth,
        brokenImages,
        sections,
      };
    });
    report.push({ viewport: viewport.name, route, status: response?.status() ?? 0, consoleErrors: [...new Set(consoleErrors)], ...metrics });
    if (route === "/" || route === "/website/process" || route === "/samples/corporate-q-template") {
      await activateScrollScenes(page);
      const name = route === "/" ? "main" : route.includes("samples") ? "sample" : "subpage";
      await page.screenshot({ path: path.join(output, `${name}-${viewport.name}.png`), fullPage: true });
      if (route === "/" && process.env.QA_SCENE_CAPTURE) {
        await captureSceneStates(page, "local", viewport.name, {
          hero: ".re-greeting", intro: ".re-first-intro", story1: ".re-first-story:nth-child(1)",
          story2: ".re-first-story:nth-child(2)", now: ".re-now", values: ".re-now-value",
          latest: ".re-latest", tomorrow: ".re-tomorrow", footer: ".re-footer",
        });
      }
    }
  }
  await page.goto("https://spot.wooribank.com/pot/Dream?withyou=bp", { waitUntil: "domcontentloaded", timeout: 45000 });
  await page.waitForTimeout(1500);
  sourceReport.push(await page.evaluate((name) => {
    const box = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const rect = element.getBoundingClientRect();
      return { y: Math.round(rect.top + scrollY), height: Math.round(rect.height) };
    };
    return {
      viewport: name,
      documentHeight: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight),
      horizontalOverflow: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth) - innerWidth,
      sections: {
        header: box(".header"), greeting: box(".greeting"), first: box(".first"), now: box(".now"),
        nowValue: box(".now-value"), latest: box(".latest"), tomorrow: box(".tomorrow"), footer: box(".footer"),
      },
    };
  }, viewport.name));
  await activateScrollScenes(page);
  await page.screenshot({ path: path.join(output, `source-main-${viewport.name}.png`), fullPage: true });
  if (process.env.QA_SCENE_CAPTURE) {
    await captureSceneStates(page, "source", viewport.name, {
      hero: ".greeting", intro: ".first-intro", story1: ".first-story:nth-child(1)",
      story2: ".first-story:nth-child(2)", now: ".now", values: ".now-value",
      latest: ".latest", tomorrow: ".tomorrow", footer: ".footer",
    });
  }
  await context.close();
}
const interactionContext = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const interactionPage = await interactionContext.newPage();
await interactionPage.goto(base, { waitUntil: "networkidle" });
await interactionPage.locator(".re-nav-group").first().hover();
const desktopMegaMenu = await interactionPage.locator(".re-nav-group").first().locator(".re-mega").evaluate((element) => getComputedStyle(element).visibility === "visible");
await interactionPage.evaluate(() => scrollTo(0, 0));
await interactionPage.locator(".re-greeting__control").click();
const pauseToggle = await interactionPage.locator(".re-greeting__control").getAttribute("aria-pressed");
const track = interactionPage.locator(".re-now");
const trackBox = await track.evaluate((element) => ({ top: element.getBoundingClientRect().top + scrollY, height: element.getBoundingClientRect().height }));
await interactionPage.evaluate((y) => scrollTo(0, y), trackBox.top + (trackBox.height - 900) * .5);
await interactionPage.waitForTimeout(1100);
const nowActivates = await track.evaluate((element) => element.classList.contains("re-active"));
await interactionPage.goto(`${base}/faq`, { waitUntil: "networkidle" });
await interactionPage.locator(".re-faq details").first().locator("summary").click();
const faqOpens = await interactionPage.locator(".re-faq details").first().evaluate((element) => element.hasAttribute("open"));
await interactionContext.close();

const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mobilePage = await mobileContext.newPage();
await mobilePage.goto(base, { waitUntil: "networkidle" });
await mobilePage.locator(".re-header__toggle").click();
const mobileMenuOpens = await mobilePage.locator(".re-mobile").evaluate((element) => getComputedStyle(element).visibility === "visible");
await mobilePage.locator(".re-mobile details").first().locator("summary").click();
const mobileSubmenuOpens = await mobilePage.locator(".re-mobile details").first().evaluate((element) => element.hasAttribute("open"));
const mobileVideo = await mobilePage.locator(".re-greeting video").count() === 1;
const tomorrowStaticOnMobile = await mobilePage.locator(".re-tomorrow").evaluate((element) => !element.classList.contains("re-init") && !element.classList.contains("re-active"));
await mobileContext.close();

const interactions = { desktopMegaMenu, mobileMenuOpens, mobileSubmenuOpens, faqOpens, pauseToggle, mobileVideo, tomorrowStaticOnMobile, nowActivates };
await browser.close();
await fs.writeFile(path.join(output, "report.json"), JSON.stringify(report, null, 2), "utf8");
await fs.writeFile(path.join(output, "source-report.json"), JSON.stringify(sourceReport, null, 2), "utf8");
await fs.writeFile(path.join(output, "interactions.json"), JSON.stringify(interactions, null, 2), "utf8");
const failures = report.filter((item) => item.status !== 200 || item.horizontalOverflow > 1 || item.brokenImages.length || item.consoleErrors.length);
console.log(JSON.stringify({ pages: report.length, failures: failures.length, interactions, failureDetails: failures }, null, 2));
