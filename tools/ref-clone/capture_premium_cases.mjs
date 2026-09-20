import { mkdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { chromium } from "playwright";

const BASE = "http://127.0.0.1:8765/templates";
const OUT = join(process.cwd(), "public", "cases");

const configs = [
  {
    folder: "clinic-f",
    pages: ["index", "facilities", "wave", "contour-shot", "fees", "location"],
    points: [
      ["story", "index", "#story"],
      ["why", "index", "#why"],
      ["wave", "index", { y: 4407, height: 900 }],
      ["shot", "index", { y: 7827, height: 900 }],
      ["doctor", "index", "#doctor"],
      ["facilities", "index", "#facilities"],
    ],
    mobile: ["index", "wave", "contour-shot", "location"],
  },
  {
    folder: "corporate-n",
    pages: ["index", "about", "history", "business", "network", "esg", "finance", "news"],
    points: [
      ["business", "index", "#business"],
      ["network", "index", "#global"],
      ["milestones", "index", "#milestones"],
      ["news", "index", "#news"],
    ],
    mobile: ["index", "business", "network", "esg"],
  },
  {
    folder: "corporate-o",
    pages: ["index", "company", "products", "product-detail", "technology", "efficacy", "global", "jobs"],
    points: [
      ["story", "index", "#story"],
      ["technology", "index", "#technology"],
      ["products", "index", "#products"],
      ["film", "index", "#beauty-film"],
      ["contact", "index", "#contact"],
    ],
    mobile: ["index", "products", "product-detail", "technology"],
  },
  {
    folder: "corporate-q",
    pages: ["index", "about", "business-announcement", "information-list", "esg-strategy", "social-hub", "recruit", "search"],
    points: [
      ["services", "index", "#services"],
      ["social", "index", "#social"],
      ["quick", "index", "#quick"],
      ["promo", "index", "#promo"],
    ],
    mobile: ["index", "business-announcement", "information-list", "social-hub"],
  },
  {
    folder: "corporate-r",
    pages: [
      "index",
      "company",
      "history",
      "business-grain",
      "business-container",
      "museum",
      "ethics",
      "news",
      "careers",
      "group-logistics",
      "financial-position",
      "gallery",
      "bids",
      "en",
    ],
    points: [
      ["hero", "index", { y: 0, height: 900 }],
      ["group", "index", { y: 2400, height: 1080 }],
      ["business", "index", { y: 8500, height: 1200 }],
      ["news", "index", { y: 16080, height: 760 }],
      ["with", "index", { y: 16820, height: 760 }],
      ["recruit", "index", { y: 17560, height: 670 }],
    ],
    mobile: ["index", "company", "business-grain", "careers"],
  },
  {
    folder: "corporate-s",
    pages: ["index", "background", "facility", "exhibitions", "story-origin", "story-future", "news", "visit"],
    points: [
      ["about", "index", "#about"],
      ["exhibition", "index", "#exhibition"],
      ["news", "index", "#news"],
      ["story", "story-origin", { y: 0, height: 1500 }],
    ],
    mobile: ["index", "exhibitions", "story-origin", "visit"],
  },
];

const browser = await chromium.launch({ headless: true });

async function open(folder, file, viewport, deviceScaleFactor = 1) {
  const context = await browser.newContext({ viewport, deviceScaleFactor, reducedMotion: "reduce" });
  const page = await context.newPage();
  const url = `${BASE}/${folder}/${file === "index" ? "" : `${file}.html`}`;
  await page.goto(url, { waitUntil: "networkidle", timeout: 30_000 });
  await page.addStyleTag({
    content:
      "html{scroll-behavior:auto!important}*,*::before,*::after{animation-delay:0s!important;animation-duration:0s!important;transition-delay:0s!important;transition-duration:0s!important}",
  });
  await page.waitForTimeout(300);
  return { context, page };
}

async function viewportShot(folder, file, path, viewport, deviceScaleFactor = 1) {
  const { context, page } = await open(folder, file, viewport, deviceScaleFactor);
  try {
    await page.screenshot({ path: path.replace(/\.webp$/, ".png"), type: "png" });
  } finally {
    await context.close();
  }
}

async function pointShot(folder, file, target, path) {
  const viewportHeight = typeof target === "string" ? 900 : target.height;
  const { context, page } = await open(folder, file, { width: 1280, height: viewportHeight });
  try {
    if (typeof target === "string") {
      const locator = page.locator(target).first();
      await locator.scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
      await locator.screenshot({ path: path.replace(/\.webp$/, ".png"), type: "png" });
    } else {
      await page.evaluate((top) => window.scrollTo(0, top), target.y);
      await page.waitForTimeout(250);
      await page.screenshot({ path: path.replace(/\.webp$/, ".png"), type: "png" });
    }
  } finally {
    await context.close();
  }
}

const requested = new Set(process.argv.slice(2));
const selectedConfigs = configs.filter((item) => requested.size === 0 || requested.has(item.folder));
for (const config of selectedConfigs) {
  const dir = join(OUT, config.folder);
  mkdirSync(dir, { recursive: true });
  console.log(`[capture] ${config.folder}`);

  await viewportShot(config.folder, "index", join(dir, "main.webp"), { width: 1440, height: 900 });

  for (const file of config.pages) {
    await viewportShot(config.folder, file, join(dir, `page-${file}.webp`), { width: 960, height: 600 });
  }

  for (const [name, file, target] of config.points) {
    await pointShot(config.folder, file, target, join(dir, `point-${name}.webp`));
  }

  for (const file of config.mobile) {
    await viewportShot(config.folder, file, join(dir, `m-${file}.webp`), { width: 390, height: 844 }, 1.5);
  }
}

await browser.close();

const makeSm = String.raw`
from pathlib import Path
from PIL import Image
import sys
for root_arg in sys.argv[1:]:
    root = Path(root_arg)
    for src in root.rglob('*.png'):
        with Image.open(src) as im:
            im.convert('RGB').save(src.with_suffix('.webp'), 'WEBP', quality=84, method=6)
        src.unlink()
    for src in root.rglob('*.webp'):
        if src.name.startswith('m-') or src.name.endswith('-sm.webp'):
            continue
        with Image.open(src) as im:
            if im.width <= 800:
                out = im.copy()
            else:
                h = round(im.height * 800 / im.width)
                out = im.resize((800, h), Image.Resampling.LANCZOS)
            out.save(src.with_name(src.stem + '-sm.webp'), 'WEBP', quality=82, method=6)
`;

const resized = spawnSync("python", ["-c", makeSm, ...selectedConfigs.map((item) => join(OUT, item.folder))], {
  stdio: "inherit",
});
if (resized.status !== 0) process.exit(resized.status ?? 1);

console.log("[capture] complete");
