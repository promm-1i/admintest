/**
 * Sub page skeleton parity — NOVERIQ route vs the one reference page it is modelled on.
 *
 * The mapping lives in docs/renewal-editorial/subpage-spec.md. Content length differs by
 * design, so vertical positions of content-driven blocks are not compared; what is compared
 * is the skeleton: box geometry that the layout fixes (x, width, and height where the source
 * fixes it) plus typography and spacing.
 */
import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const SOURCE = (code) => `https://spot.wooribank.com/pot/Dream?withyou=${code}`;
const LOCAL = (route) => `http://127.0.0.1:4179/renewal-editorial${route}`;
const outputPath = path.resolve("docs/renewal-editorial/qa/sub-parity.json");

const viewports = [
  { name: "1440", width: 1440, height: 900 },
  { name: "768", width: 768, height: 900 },
  { name: "390", width: 390, height: 844 },
];

// route -> reference code, per docs/renewal-editorial/subpage-spec.md
const MAP = [
  { route: "/website/process", code: "BPPCT0080", kind: "hero", heroCode: "BPBKI0049" },
  { route: "/website/price", code: "BPPCT0080", kind: "plain" },
  { route: "/website/features", code: "BPPCT0080", kind: "hero", heroCode: "BPBKI0049" },
  { route: "/website/maintenance", code: "BPPCT0080", kind: "hero", heroCode: "BPBKI0049" },
  { route: "/services/custom", code: "BPPCT0080", kind: "hero", heroCode: "BPBKI0049" },
  { route: "/services/admin-system", code: "BPPCT0080", kind: "hero", heroCode: "BPBKI0049" },
  { route: "/services/inquiry-reservation", code: "BPPCT0080", kind: "hero", heroCode: "BPBKI0049" },
  { route: "/services/search-filter", code: "BPPCT0080", kind: "hero", heroCode: "BPBKI0049" },
  { route: "/services/content-management", code: "BPPCT0080", kind: "hero", heroCode: "BPBKI0049" },
  { route: "/services/database-api", code: "BPPCT0080", kind: "hero", heroCode: "BPBKI0049" },
  { route: "/services/responsive", code: "BPPCT0080", kind: "hero", heroCode: "BPBKI0049" },
  { route: "/services/seo", code: "BPPCT0080", kind: "hero", heroCode: "BPBKI0049" },
  { route: "/web-solutions", code: "BPPBC0045", kind: "cards" },
  { route: "/templates", code: "BPPBC0045", kind: "cards" },
  { route: "/samples", code: "BPPBC0045", kind: "cards" },
  { route: "/contact", code: "BPPCT0080", kind: "plain" },
  { route: "/notices", code: "BPPBC0038", kind: "board" },
  { route: "/faq", code: "BPPCT0080", kind: "plain" },
];

// key -> [source selector, local selector, fields]
// geom  = x + width (content decides the height)
// box   = x + width + height (the source fixes the height too)
const PAIRS = {
  pageInfo: [".page-info", ".re-page-info", "box"],
  pageAlign: [".page-align", ".re-page-align", "box"],
  pageCategory: [".page-category", ".re-page-category", "type"],
  pageHeading: [".page-heading", ".re-page-heading", "type"],
  hero: [".hero", ".re-hero", "box"],
  heroSticky: [".hero-sticky", ".re-hero__sticky", "box"],
  heroFrame: [".hero-frame", ".re-hero__frame", "box"],
  heroSingle: [".hero-single", ".re-hero__single", "box"],
  heroStep: [".hero-step", ".re-hero__step", "type"],
  heroTitle: [".hero-title", ".re-hero__title", "typeonly"],
  heroEdge: [".hero-edge", ".re-hero__edge", "box"],
  contents: [".contents", ".re-contents", "pad"],
  section: [".contents .section", ".re-section", "geom"],
  sectionH2: [".contents .section h2", ".re-section__h2", "type"],
  boardUtil: [".board-util", ".re-board-util", "box"],
  boardSearch: [".board-util .search, .board-util .forms", ".re-board-search", "box"],
  boardList: [".board-list", ".re-board__list", "geom"],
  boardItemLink: [".board-item a", ".re-board__item > a", "pad"],
  pagination: [".pagination", ".re-pagination", "geom"],
  pagPage: [".pagination-page", ".re-pagination__page button", "size"],
  cardHeading: [".videos > h2, .videos .d2", ".re-section__h2", "type"],
  cardItem: [".videos-list > li", ".re-cards__item", "size"],
  cardThumb: [".videos-list img", ".re-cards img", "size"],
  cardSubject: [".videos-subject", ".re-cards__subject", "typeonly"],
};

const FIELDS = {
  box: ["x", "width", "height"],
  geom: ["x", "width"],
  size: ["width", "height"],
  pad: ["x", "width", "paddingTop", "paddingBottom", "paddingLeft"],
  type: ["x", "width", "fontSize", "fontWeight", "lineHeight", "letterSpacing", "marginBottom"],
  typeonly: ["x", "width", "fontSize", "fontWeight", "lineHeight", "letterSpacing"],
};

const TOLERANCE = 2; // px — sub-pixel rounding between the two renderers

async function measure(page) {
  return page.evaluate((PAIRS) => {
    const out = {};
    for (const [key, [, , ]] of Object.entries(PAIRS)) out[key] = null;
    return out;
  }, PAIRS);
}

async function read(page, selector) {
  return page.evaluate((selector) => {
    const element = document.querySelector(selector);
    if (!element) return null;
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    const num = (value) => Math.round(parseFloat(value) * 100) / 100;
    return {
      x: Math.round(rect.x), width: Math.round(rect.width), height: Math.round(rect.height),
      fontSize: num(style.fontSize), fontWeight: Number(style.fontWeight),
      lineHeight: style.lineHeight === "normal" ? "normal" : num(style.lineHeight),
      letterSpacing: style.letterSpacing === "normal" ? 0 : num(style.letterSpacing),
      marginBottom: num(style.marginBottom),
      paddingTop: num(style.paddingTop), paddingBottom: num(style.paddingBottom), paddingLeft: num(style.paddingLeft),
    };
  }, selector);
}

function compare(key, fields, source, local) {
  const differences = [];
  if (!source && !local) return differences;
  if (!source || !local) { differences.push({ key, field: "present", source: Boolean(source), local: Boolean(local) }); return differences; }
  for (const field of fields) {
    const a = source[field], b = local[field];
    if (typeof a === "number" && typeof b === "number") { if (Math.abs(a - b) > TOLERANCE) differences.push({ key, field, source: a, local: b }); }
    else if (String(a) !== String(b)) differences.push({ key, field, source: a, local: b });
  }
  return differences;
}

async function settle(page) {
  await page.evaluate(async () => {
    const style = document.createElement("style");
    style.textContent = "*,*::before,*::after{animation:none!important;transition:none!important}";
    document.head.append(style);
    for (const node of document.querySelectorAll("[data-reveal],[data-motion]")) node.classList.add("is-visible", "active", "re-active");
    const height = document.documentElement.scrollHeight;
    for (let y = 0; y <= height; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 20)); }
    scrollTo(0, 0);
  });
  await page.waitForTimeout(250);
}

const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = [];
const sourceCache = new Map();

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height }, isMobile: viewport.width < 600, hasTouch: viewport.width < 600, deviceScaleFactor: 1 });
  for (const entry of MAP) {
    const cacheKey = `${viewport.name}:${entry.code}`;
    if (!sourceCache.has(cacheKey)) {
      const page = await context.newPage();
      await page.goto(SOURCE(entry.code), { waitUntil: "networkidle", timeout: 90000 });
      await settle(page);
      const values = {};
      for (const [key, [sourceSelector]] of Object.entries(PAIRS)) values[key] = await read(page, sourceSelector);
      sourceCache.set(cacheKey, values);
      await page.close();
    }
    let sourceValues = sourceCache.get(cacheKey);
    // No single reference page carries both the stepped hero and the 56px split section,
    // so the hero block is read from the page that has it (see subpage-spec.md).
    if (entry.heroCode) {
      const heroKey = `${viewport.name}:${entry.heroCode}`;
      if (!sourceCache.has(heroKey)) {
        const heroPage = await context.newPage();
        await heroPage.goto(SOURCE(entry.heroCode), { waitUntil: "networkidle", timeout: 90000 });
        await settle(heroPage);
        const heroValues = {};
        for (const [key, [sourceSelector]] of Object.entries(PAIRS)) heroValues[key] = await read(heroPage, sourceSelector);
        sourceCache.set(heroKey, heroValues);
        await heroPage.close();
      }
      const heroSource = sourceCache.get(heroKey);
      sourceValues = { ...sourceValues };
      for (const key of Object.keys(PAIRS)) if (key.startsWith("hero")) sourceValues[key] = heroSource[key];
    }
    const page = await context.newPage();
    await page.goto(LOCAL(entry.route), { waitUntil: "networkidle", timeout: 60000 });
    await settle(page);
    const localValues = {};
    for (const [key, [, localSelector]] of Object.entries(PAIRS)) localValues[key] = await read(page, localSelector);
    await page.close();

    const differences = [];
    for (const [key, [, , mode]] of Object.entries(PAIRS)) {
      // Only compare the skeleton parts the mapped archetype actually has.
      if (key.startsWith("hero") && entry.kind !== "hero") continue;
      if ((key.startsWith("board") || key.startsWith("pag")) && entry.kind !== "board") continue;
      if (key.startsWith("card") && entry.kind !== "cards") continue;
      if (key === "sectionH2" && entry.kind === "cards") continue;
      differences.push(...compare(key, FIELDS[mode], sourceValues[key], localValues[key]));
    }
    report.push({ viewport: viewport.name, route: entry.route, code: entry.code, kind: entry.kind, differenceCount: differences.length, differences });
  }
  await context.close();
}
await browser.close();
await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, JSON.stringify(report, null, 2), "utf8");

const failed = report.filter((row) => row.differenceCount > 0);
console.log(JSON.stringify({
  checks: report.length,
  clean: report.length - failed.length,
  withDifferences: failed.length,
  detail: failed.slice(0, 12).map(({ viewport, route, code, differences }) => ({ viewport, route, code, differences: differences.slice(0, 6) })),
}, null, 2));
