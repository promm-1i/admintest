import { chromium } from "playwright";

const targets = [
  ["source", "https://spot.wooribank.com/pot/Dream?withyou=bp"],
  ["local", "http://127.0.0.1:4179/renewal-editorial"],
];

const browser = await chromium.launch({ channel: "chrome", headless: true });

for (const [name, url] of targets) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(url, { waitUntil: "networkidle", timeout: 45000 });
  const samples = await page.evaluate(async () => {
    const started = performance.now();
    const wrapper = document.querySelector(".greeting-swiper .swiper-wrapper");
    const slides = [...document.querySelectorAll(".greeting-swiper .swiper-slide")];
    const read = (reason) => ({
      reason,
      time: Math.round(performance.now() - started),
      wrapperTransform: wrapper ? getComputedStyle(wrapper).transform : null,
      slides: slides.map((slide) => {
        const rect = slide.getBoundingClientRect();
        const style = getComputedStyle(slide);
        const content = slide.querySelector(".greeting-slogan,.greeting-message");
        const contentStyle = content ? getComputedStyle(content) : null;
        const contentRect = content?.getBoundingClientRect();
        return {
          active: slide.classList.contains("swiper-slide-active"),
          x: Math.round(rect.x * 100) / 100,
          width: Math.round(rect.width * 100) / 100,
          opacity: style.opacity,
          transform: style.transform,
          transitionDuration: style.transitionDuration,
          contentX: contentRect ? Math.round(contentRect.x * 100) / 100 : null,
          contentOpacity: contentStyle?.opacity ?? null,
          contentTransform: contentStyle?.transform ?? null,
          contentTransitionDuration: contentStyle?.transitionDuration ?? null,
          contentTransitionDelay: contentStyle?.transitionDelay ?? null,
        };
      }),
    });
    const output = [read("initial")];
    const observer = new MutationObserver(() => output.push(read("mutation")));
    for (const slide of slides) observer.observe(slide, { attributes: true, attributeFilter: ["class", "style"] });
    await new Promise((resolve) => setTimeout(resolve, 9200));
    observer.disconnect();
    output.push(read("final"));
    return output.filter((sample, index, all) => index === 0 || sample.slides.some((slide, slideIndex) => {
      const previous = all[index - 1].slides[slideIndex];
      return slide.active !== previous.active || slide.opacity !== previous.opacity || slide.transform !== previous.transform;
    }) || sample.reason === "final");
  });
  console.log(JSON.stringify({ name, samples }, null, 2));
  await page.close();
}

await browser.close();
