import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";

const sourceUrl = "https://spot.wooribank.com/pot/Dream?withyou=bp";
const localUrl = "http://127.0.0.1:4179/renewal-editorial";
const outputPath = path.resolve("docs/renewal-editorial/qa/style-parity.json");
const viewports = [
  { name: "1440", width: 1440, height: 900 },
  { name: "768", width: 768, height: 900 },
  { name: "390", width: 390, height: 844 },
];

const pairs = {
  header: [".header", ".re-header"],
  greeting: [".greeting", ".re-greeting"],
  greetingFrame: [".greeting-frame", ".re-greeting__frame"],
  greetingVideo: [".greeting-video", ".greeting-video"],
  greetingDim: [".greeting-dim", ".re-greeting__dim"],
  greetingSlogan: [".greeting-slogan", ".re-greeting__slides h1"],
  greetingMessage: [".greeting-message", ".re-greeting__slides p"],
  greetingControl: [".greeting-control", ".re-greeting__control"],
  firstIntro: [".first-intro", ".re-first-intro"],
  firstHeading: [".first-heading", ".re-first-intro h2"],
  firstAction: [".first-action", ".re-first-intro__actions"],
  firstButton: [".first-button", ".re-first-intro__actions a"],
  firstDocs: [".first-docs", ".re-first-intro > figure"],
  firstLight: [".first-light", ".re-first-light:not(.re-first-light--small)"],
  firstLightSmall: [".first-light-small", ".re-first-light--small"],
  firstStory: [".first-story", ".re-first-story"],
  firstBefore: [".first-before", ".re-first-story__before"],
  firstAfter: [".first-after", ".re-first-story__after"],
  firstYear: [".first-year", ".re-first-story__before > span"],
  firstTitle: [".first-title", ".re-first-story__before h3"],
  firstKeyword: [".first-keyword", ".first-keyword"],
  firstDesc: [".first-desc", ".re-first-story__after p"],
  firstFixer: [".first-fixer", ".re-first-story > figure"],
  now: [".now", ".re-now"],
  nowTrack: [".now-track", ".re-now__track"],
  nowHeading: [".now-heading", ".re-now__heading"],
  nowSticky: [".now-sticky", ".re-now__sticky"],
  nowFrame: [".now-frame", ".re-now__frame"],
  nowStep: [".now-step", ".re-now__frame p"],
  nowTitle: [".now-title", ".re-now__frame h2"],
  nowDim: [".now-dim", ".re-now__dim"],
  nowEdgeTop: [".now-edge-top", ".now-edge-top"],
  nowEdgeBottom: [".now-edge-bottom", ".now-edge-bottom"],
  nowValue: [".now-value", ".re-now-value"],
  nowValueFrame: [".now-value-frame", ".re-now-value__frame"],
  nowValueList: [".now-value-list", ".now-value-list"],
  nowValueItem: [".now-value-item", ".now-value-item"],
  nowValueCard: [".now-value-card", ".now-value-card"],
  nowValueText: [".now-value-text", ".now-value-text"],
  nowValueTitle: [".now-value-title", ".now-value-title"],
  nowValueDesc: [".now-value-desc", ".now-value-desc"],
  latest: [".latest", ".re-latest"],
  latestFrame: [".latest-frame", ".re-latest__frame"],
  latestHeading: [".latest-heading", ".re-latest h2"],
  latestLink: [".latest-link", ".re-latest li a"],
  latestCategory: [".latest-category", ".re-latest li a > span:first-child"],
  latestTitle: [".latest-title", ".re-latest__title"],
  latestTitleText: [".latest-title-text", ".latest-title-text"],
  latestDate: [".latest-date", ".latest-date"],
  tomorrow: [".tomorrow", ".re-tomorrow"],
  tomorrowFrame: [".tomorrow-frame", ".re-tomorrow__frame"],
  tomorrowHeading: [".tomorrow-heading", ".re-tomorrow__frame > h2"],
  tomorrowMessage: [".tomorrow-message", ".re-tomorrow__frame > p"],
  tomorrowList: [".tomorrow-list", ".re-tomorrow__frame ul"],
  tomorrowItem: [".tomorrow-item", ".re-tomorrow__frame li"],
  tomorrowLink: [".tomorrow-link", ".re-tomorrow__frame li a"],
  tomorrowTitle: [".tomorrow-title", ".tomorrow-title"],
  tomorrowDesc: [".tomorrow-desc", ".tomorrow-desc"],
  recruit: [".recruit", ".re-recruit"],
  top: [".top", ".re-footer__top"],
  footer: [".footer", ".re-footer"],
};

const properties = [
  "display", "position", "overflow", "opacity", "transform", "filter",
  "fontFamily", "fontSize", "fontWeight", "lineHeight", "letterSpacing", "textAlign",
  "marginTop", "marginRight", "marginBottom", "marginLeft",
  "paddingTop", "paddingRight", "paddingBottom", "paddingLeft",
  "gap", "borderRadius", "backgroundColor", "color",
];

async function snapshot(page, selector) {
  return page.locator(selector).first().evaluate((element, props) => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return {
      rect: {
        x: Math.round(rect.x * 100) / 100,
        y: Math.round((rect.y + scrollY) * 100) / 100,
        width: Math.round(rect.width * 100) / 100,
        height: Math.round(rect.height * 100) / 100,
      },
      style: Object.fromEntries(props.map((prop) => [prop, style[prop]])),
    };
  }, properties);
}

async function collect(page, side) {
  const result = {};
  for (const [key, selectors] of Object.entries(pairs)) {
    const selector = selectors[side];
    result[key] = await page.locator(selector).count() ? await snapshot(page, selector) : null;
  }
  return result;
}

async function freezeActiveState(page) {
  // Put both pages into the same real resting state: greeting slide 1 active,
  // slide 2 waiting. The source runs Swiper (fade); the local runs a data-active
  // toggle. Each side is driven through its own API instead of being painted over
  // with !important, so the comparison reads a state the page can actually reach.
  await page.evaluate(() => {
    const swiperRoot = document.querySelector(".greeting-swiper .swiper");
    const swiper = swiperRoot && swiperRoot.swiper;
    if (swiper) {
      swiper.autoplay && swiper.autoplay.stop();
      swiper.slideTo(0, 0);
    }
    const slides = [...document.querySelectorAll(".greeting-swiper .swiper-slide")];
    slides.forEach((slide, index) => {
      slide.classList.toggle("swiper-slide-active", index === 0);
      slide.classList.toggle("swiper-slide-next", index === 1);
      slide.style.opacity = index === 0 ? "1" : "0";
      slide.style.transform = index === 0 ? "translate3d(0,0,0)" : "translate3d(-100%,0,0)";
    });
    const localSlides = document.querySelectorAll(".re-greeting__slides > *");
    localSlides.forEach((node, index) => {
      if (index === 0) node.setAttribute("data-active", "");
      else node.removeAttribute("data-active");
    });
    window.__parityHold = true;
    document.documentElement.classList.add("parity-freeze");
    const style = document.createElement("style");
    style.textContent = [
      "*,*::before,*::after{animation:none!important;transition:none!important}",
      ".greeting-swiper .swiper-slide:first-child .greeting-slogan{transform:scale(1)!important;opacity:1!important}",
      ".greeting-swiper .swiper-slide:nth-child(2) .greeting-message{transform:scale(1.2)!important;opacity:.1!important}",
      ".re-greeting__slides h1{transform:scale(1)!important;opacity:1!important}",
      ".re-greeting__slides p{transform:scale(1.2)!important;opacity:.1!important}",
    ].join(" ");
    document.head.append(style);
    const greeting = document.querySelector(".greeting");
    greeting && greeting.classList.remove("pause");
    for (const selector of [".first-intro", ".first-story", ".now", ".now-value"]) {
      const node = document.querySelector(selector);
      node && node.classList.remove("init", "re-init");
      node && node.classList.add("active", "re-active");
    }
    const tomorrow = document.querySelector(".tomorrow");
    tomorrow && tomorrow.classList.remove("init", "active", "re-init", "re-active");
    if (innerWidth >= 1024 && tomorrow) tomorrow.classList.add("active", "re-active");
    scrollTo(0, 0);
  });
  // The slide swap is driven by a timer on both sides; settle before reading.
  await page.waitForFunction(() => {
    const slogan = document.querySelector(".greeting-slogan, .re-greeting__slides h1");
    if (!slogan) return true;
    const t = getComputedStyle(slogan).transform;
    return t === "none" || t === "matrix(1, 0, 0, 1, 0, 0)";
  }, undefined, { timeout: 15000 });
}

function diff(source, local) {
  const differences = [];
  for (const key of Object.keys(pairs)) {
    if (!source[key] || !local[key]) {
      differences.push({ key, field: "missing", source: Boolean(source[key]), local: Boolean(local[key]) });
      continue;
    }
    for (const field of Object.keys(source[key].rect)) {
      if (Math.abs(source[key].rect[field] - local[key].rect[field]) > 1) {
        differences.push({ key, field: `rect.${field}`, source: source[key].rect[field], local: local[key].rect[field] });
      }
    }
    for (const field of properties) {
      if (["marginTop", "marginRight", "marginBottom", "marginLeft"].includes(field)) {
        const sameRenderedBox = Object.keys(source[key].rect).every((rectField) => Math.abs(source[key].rect[rectField] - local[key].rect[rectField]) <= 1);
        if (sameRenderedBox) continue;
      }
      if (source[key].style[field] !== local[key].style[field]) {
        differences.push({ key, field: `style.${field}`, source: source[key].style[field], local: local[key].style[field] });
      }
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
  await Promise.all([sourcePage.waitForTimeout(1000), localPage.waitForTimeout(1000)]);
  await Promise.all([freezeActiveState(sourcePage), freezeActiveState(localPage)]);
  const source = await collect(sourcePage, 0);
  const local = await collect(localPage, 1);
  const differences = diff(source, local);
  report.push({ viewport: viewport.name, differenceCount: differences.length, differences, source, local });
  await Promise.all([sourceContext.close(), localContext.close()]);
}
await browser.close();
await fs.writeFile(outputPath, JSON.stringify(report, null, 2), "utf8");
console.log(JSON.stringify(report.map(({ viewport, differenceCount, differences }) => ({ viewport, differenceCount, firstDifferences: differences.slice(0, 30) })), null, 2));
