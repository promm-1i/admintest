import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const sourceUrl = "https://spot.wooribank.com/pot/Dream?withyou=bp";
const localUrl = "http://127.0.0.1:4179/renewal-editorial";
const outputPath = path.resolve("docs/renewal-editorial/qa/motion-parity.json");
const viewports = [
  { name: "1440", width: 1440, height: 900 },
  { name: "768", width: 768, height: 900 },
  { name: "390", width: 390, height: 844 },
];
const progressPoints = [0, 0.25, 0.5, 0.75, 1];
const pairs = {
  intro: [".first-intro", ".first-intro"],
  introHeading: [".first-heading", ".first-heading"],
  introAction: [".first-action", ".first-action"],
  introDocs: [".first-docs", ".first-docs"],
  story1: [".first-story:nth-child(1)", ".first-story:nth-child(1)"],
  story1Before: [".first-story:nth-child(1) .first-before", ".first-story:nth-child(1) .first-before"],
  story1After: [".first-story:nth-child(1) .first-after", ".first-story:nth-child(1) .first-after"],
  story1Fixer: [".first-story:nth-child(1) .first-fixer", ".first-story:nth-child(1) .first-fixer"],
  story2: [".first-story:nth-child(2)", ".first-story:nth-child(2)"],
  story3: [".first-story:nth-child(3)", ".first-story:nth-child(3)"],
  now: [".now", ".now"],
  nowFrame: [".now-frame", ".now-frame"],
  nowText: [".now-text", ".now-text"],
  nowDim: [".now-dim", ".now-dim"],
  nowEdgeTop: [".now-edge-top", ".now-edge-top"],
  nowValue: [".now-value", ".now-value"],
  nowValueCard1: [".now-value-card:nth-of-type(1)", ".now-value-card:nth-of-type(1)"],
  tomorrow: [".tomorrow", ".tomorrow"],
  tomorrowHeading: [".tomorrow-heading", ".tomorrow-heading"],
  tomorrowMessage: [".tomorrow-message", ".tomorrow-message"],
  tomorrowList: [".tomorrow-list", ".tomorrow-list"],
  tomorrowItem2: [".tomorrow-item:nth-child(2)", ".tomorrow-item:nth-child(2)"],
  recruit: [".recruit", ".recruit"],
};

async function sample(page, side, progress) {
  return page.evaluate(async ({ pairs, side, progress }) => {
    document.documentElement.style.scrollBehavior = "auto";
    for (let index = 0; index < 120; index += 1) {
      const currentMax = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - innerHeight;
      const target = Math.round(currentMax * progress);
      const delta = target - scrollY;
      if (Math.abs(delta) <= 1) break;
      scrollBy(0, Math.sign(delta) * Math.min(100, Math.abs(delta)));
      await new Promise((resolve) => setTimeout(resolve, 24));
    }
    await new Promise((resolve) => setTimeout(resolve, 2900));
    const maxScroll = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight) - innerHeight;
    scrollTo(0, Math.round(maxScroll * progress));
    await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const values = {};
    for (const [key, selectors] of Object.entries(pairs)) {
      const element = document.querySelector(selectors[side]);
      if (!element) {
        values[key] = null;
        continue;
      }
      const rect = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      values[key] = {
        className: element.className,
        rect: {
          x: Math.round(rect.x * 100) / 100,
          y: Math.round(rect.y * 100) / 100,
          width: Math.round(rect.width * 100) / 100,
          height: Math.round(rect.height * 100) / 100,
        },
        opacity: style.opacity,
        transform: style.transform,
        filter: style.filter,
      };
    }
    return { progress, scrollY, maxScroll, values };
  }, { pairs, side, progress });
}

function normalizedClasses(value) {
  return String(value).split(/\s+/).filter((item) => ["init", "active"].includes(item)).sort().join(" ");
}

function compare(source, local) {
  const differences = [];
  if (Math.abs(source.maxScroll - local.maxScroll) > 1) differences.push({ key: "page", field: "maxScroll", source: source.maxScroll, local: local.maxScroll });
  for (const key of Object.keys(pairs)) {
    const sourceValue = source.values[key];
    const localValue = local.values[key];
    if (!sourceValue || !localValue) {
      differences.push({ key, field: "missing", source: Boolean(sourceValue), local: Boolean(localValue) });
      continue;
    }
    const sourceClasses = normalizedClasses(sourceValue.className);
    const localClasses = normalizedClasses(localValue.className);
    if (sourceClasses !== localClasses) differences.push({ key, field: "state", source: sourceClasses, local: localClasses });
    for (const field of ["x", "y", "width", "height"]) {
      if (Math.abs(sourceValue.rect[field] - localValue.rect[field]) > 1.5) differences.push({ key, field: `rect.${field}`, source: sourceValue.rect[field], local: localValue.rect[field] });
    }
    for (const field of ["opacity", "transform", "filter"]) {
      const a = sourceValue[field], bb = localValue[field];
      // opacity and other numeric styles settle a hair apart between the two renderers
      const na = Number(a), nb = Number(bb);
      const numeric = a !== "" && bb !== "" && Number.isFinite(na) && Number.isFinite(nb);
      if (numeric ? Math.abs(na - nb) > 0.005 : a !== bb) differences.push({ key, field, source: a, local: bb });
    }
  }
  return differences;
}

const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = [];
for (const viewport of viewports) {
  const sourceContext = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const localContext = await browser.newContext({ viewport, deviceScaleFactor: 1 });
  const sourcePage = await sourceContext.newPage();
  const localPage = await localContext.newPage();
  await Promise.all([
    sourcePage.goto(sourceUrl, { waitUntil: "networkidle", timeout: 45000 }),
    localPage.goto(localUrl, { waitUntil: "networkidle", timeout: 45000 }),
  ]);
  for (const progress of progressPoints) {
    const [source, local] = await Promise.all([sample(sourcePage, 0, progress), sample(localPage, 1, progress)]);
    const differences = compare(source, local);
    report.push({ viewport: viewport.name, progress, differenceCount: differences.length, differences, source, local });
  }
  await Promise.all([sourceContext.close(), localContext.close()]);
}
await browser.close();
await fs.writeFile(outputPath, JSON.stringify(report, null, 2), "utf8");
console.log(JSON.stringify(report.map(({ viewport, progress, differenceCount, differences }) => ({ viewport, progress, differenceCount, firstDifferences: differences.slice(0, 20) })), null, 2));
