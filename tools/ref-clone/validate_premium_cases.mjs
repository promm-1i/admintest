import { chromium } from "playwright";

const base = "http://127.0.0.1:4173";
const slugs = [
  "clinic-f-template",
  "artist-a-template",
  "rentcar-g-template",
  "rentcar-f-template",
  "estate-f-template",
  "estate-g-template",
  "wedding-a-template",
  "corporate-i-template",
  "corporate-s-template",
  "corporate-q-template",
  "corporate-r-template",
  "corporate-o-template",
  "corporate-n-template",
  "corporate-m-template",
  "corporate-l-template",
  "corporate-k-template",
  "corporate-j-template",
  "corporate-h-template",
  "corporate-g-template",
  "corporate-f-template",
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
  for (const slug of slugs) {
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text());
    });

    await page.goto(`${base}/samples/${slug}`, { waitUntil: "networkidle" });
    const premium = (await page.getByText(/PREMIUM DESIGN/).count()) > 0;
    const layout = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      documentHeight: document.documentElement.scrollHeight,
    }));

    let broken = [];
    if (viewport.width === 1440) {
      const images = page.locator("img");
      for (let i = 0; i < (await images.count()); i += 1) {
        await images.nth(i).scrollIntoViewIfNeeded();
      }
      await page.waitForTimeout(250);
      broken = await page.evaluate(() =>
        [...document.images]
          .filter((img) => img.complete && img.naturalWidth === 0)
          .map((img) => img.currentSrc || img.src),
      );
    }

    const result = {
      slug,
      viewport: `${viewport.width}x${viewport.height}`,
      premium,
      overflow: layout.overflow,
      documentHeight: layout.documentHeight,
      broken: broken.length,
      consoleErrors: errors.length,
    };
    console.log(JSON.stringify(result));
    if (!premium || layout.overflow > 1 || broken.length > 0 || errors.length > 0) {
      failures.push({ ...result, brokenSources: broken, errors });
    }
    await page.close();
  }
  await context.close();
}

const homeContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
const home = await homeContext.newPage();
const homeErrors = [];
home.on("pageerror", (error) => homeErrors.push(error.message));
home.on("console", (message) => {
  if (message.type() === "error") homeErrors.push(message.text());
});
await home.goto(base, { waitUntil: "networkidle" });
await home.getByRole("button", { name: "기술력" }).hover();
await home.waitForTimeout(500);
const menu = await home.evaluate(() => {
  const panel = document.querySelector("#site-mega-menu");
  const section = panel?.querySelectorAll("section")[1];
  const links = section?.querySelectorAll("a") ?? [];
  const last = links[links.length - 1];
  const panelRect = panel?.getBoundingClientRect();
  const lastRect = last?.getBoundingClientRect();
  return {
    duplicateHeadings: panel?.querySelectorAll("section h2").length ?? -1,
    itemFontSize: links[0] ? getComputedStyle(links[0]).fontSize : "",
    panelHeight: panelRect?.height ?? 0,
    bottomGap: panelRect && lastRect ? Math.round(panelRect.bottom - lastRect.bottom) : -1,
    brokenHeroImages: [...document.querySelectorAll("main img, section img")]
      .filter((img) => img.complete && img.naturalWidth === 0)
      .map((img) => img.currentSrc || img.src),
  };
});
console.log(JSON.stringify({ home: menu, consoleErrors: homeErrors.length }));
if (
  menu.duplicateHeadings !== 0 ||
  menu.itemFontSize !== "17px" ||
  menu.panelHeight !== 430 ||
  menu.bottomGap < 40 ||
  menu.brokenHeroImages.length > 0 ||
  homeErrors.length > 0
) {
  failures.push({ home: menu, errors: homeErrors });
}

await homeContext.close();
await browser.close();

if (failures.length > 0) {
  console.error(JSON.stringify(failures, null, 2));
  process.exit(1);
}

console.log("VALIDATION_OK");
